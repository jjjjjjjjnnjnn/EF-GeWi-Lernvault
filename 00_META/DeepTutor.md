# DeepTutor 融合（提分引擎，非编程项目）

> 结论：**DeepTutor直接完整使用**（本地免费tutor：Quiz刷题 + Mastery Path掌握度 + flashcards背单词）。
> **awesome-rosetta-skills不整体采用**：169个skill全是大学research级（OLS回归、DID、fMRI、ERA5气候……），与Gymnasium Klausur无关；只借用它的 `SKILL.md` 文件格式，自研3个考试导向skill（见 `Skills/`）。

## 0. 铁律（防污染vault + 防Win乱码崩溃）

- 每次开新终端先跑：
  ```powershell
  $env:DEEPTUTOR_HOME="C:\Users\rongj\.deeptutor-home"
  chcp 65001 > $null; $env:PYTHONIOENCODING="utf-8"
  ```
  第二行不跑的话，德语变音符号会让Rich渲染崩溃（实测）而中途杀死回答。
- vault里绝不能出现 `data/` 目录（已被gitignore）。如误建：删文件夹 + `git rm -r --cached data/`。
- 出题/长回答一律用 `--format json` 重定向到文件再解析；rich直显在Win-GBK下不稳定。

## 0. 状态（2026-09-21已做）

- [x] `pip install deeptutor==1.6.9`（Python 3.11 ✓，Node 24 ✓）
- [x] workspace已指向本vault：`C:\Users\rongj\Desktop\学习`（Status: ready）
- [x] LLM已接本地：**llama-3-sauerkrautlm-8b-instruct**（德语特调，无思考拖沓；qwen3-8b实测90% token耗在英文思考上，已换下；qwen2.5-0.5b太小不用）。Embedding：本地nomic。
- [x] `doctor --online` 全PASS；`run deep_question` 端到端跑通（result+done事件）。
- [x] 已装5个skill：`flashcard-deck` · `quiz-generator` · `exam-blueprint` · `language-learning` · `studying`

## 1. 首次接模型（LM Studio，免费本地）

> 2026-09-21更新：已由agent直接写配置接好（LM Studio开着即可用），本节保留作重装备用。
> 实测走弯路记录：`init`交互问答挂管道会卡死（hidden密码prompt），改直写`model_catalog.json`解决。

1. 打开 LM Studio → 加载 **llama-3-sauerkrautlm-8b-instruct**（德语任务首选）→ Start Server（`http://localhost:1234/v1`）。
2. PowerShell跑（或直接 `. .\scripts\dt-env.ps1`，一样）：
   ```powershell
   $env:DEEPTUTOR_HOME="C:\Users\rongj\.deeptutor-home"
   deeptutor init --cli --home "C:\Users\rongj\.deeptutor-home"
   # 选 Custom/Other → Base URL: http://localhost:1234/v1 → API Key: 随便填 → Model: 你加载的模型名
   deeptutor doctor --online   # 看到 ready 即成功
   ```

## 2. 日常提分命令（模型接好后）

```powershell
$env:DEEPTUTOR_HOME="C:\Users\rongj\.deeptutor-home"

# 背单词：把csv笔记变成抽认卡
deeptutor run chat "用flashcard-deck把 08_SoWi/Vokabeln-Anki/SoWi-EF-Basis.csv 做成Q/A卡片，考我" -l zh

# 刷题：按SoWi出Klausur风格quiz
deeptutor run deep_question "Soziale Ungleichheit Ursachen/Folgen, EF-Niveau, 5 Fragen mit Musterlösung" -l de

# 模拟卷：考前7天整套
deeptutor run chat "用exam-blueprint按 08_SoWi/Lehrplan.md 出一套EF-Klausur (Sachtext+Karikatur, 90 Min)" -l de

# 英语单词drill
deeptutor run chat "用language-learning考我这周的Englisch-Vokabeln, EN→DE und DE→EN" -l zh

# 查掌握度
deeptutor run mastery_path "Soziale Mobilität" -l zh
```

## 3. 和vault分工（含musespark fallback verdict）

> 实测verdict（2026-09-21，SoWi-Ungleichheit quiz）：
> - 本地8B（sauerkrautlm）：单词默写/抽认卡够用；但Klausur级出题偏水（问题泛、爱反问、缺Operatoren精度）。
> - 所以路由：**机械记忆走本地DeepTutor（免费无限量），动脑的（出题精度/批改/Texte-Analyse）走 musespark（即本opencode会话）按 `Skills/` 执行**。这就是你说的fallback，已生效，不用再配。

| 事情 | 在哪做 |
|---|---|
| 长期知识沉淀（笔记/csv/Fehlerlog） | 本vault（Obsidian+git，唯一真相源） |
| 单词默写/抽认卡/学习计划 | DeepTutor本地（`flashcard-deck`/`language-learning`/`studying`，随便刷不花钱） |
| Klausur出题/批改/模拟卷/文本解读 | musespark会话（`Skills/klausur-drill`等，质量优先） |
| Agent写笔记规范 | `AGENTS.md` + `Skills/*.md` |

## 4. 评估记录：awesome-rosetta-skills（不采用）

- 地址：https://github.com/xjtulyc/awesome-rosetta-skills（MIT，34⭐，169 skills / 24学科）
- 看过目录：00-universal（literature-search…）/ 07-economics（ols/did/rdd/iv…）/ 14-philosophy（sep-literature）/ 20-education（edm-learning-analytics）——全部是科研工具链，要跑Python+调API，不产出Klausurpunkte。
- 唯一可借鉴：`SKILL.md` 标准格式（frontmatter `name/description` + 触发条件 + 步骤）。本vault `Skills/` 下3个自研skill即按此格式写，opencode/Claude/DeepTutor三方通用。
