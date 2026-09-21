# DeepTutor 融合（提分引擎，非编程项目）

> 结论：**DeepTutor直接完整使用**（本地免费tutor：Quiz刷题 + Mastery Path掌握度 + flashcards背单词）。
> **awesome-rosetta-skills不整体采用**：169个skill全是大学research级（OLS回归、DID、fMRI、ERA5气候……），与Gymnasium Klausur无关；只借用它的 `SKILL.md` 文件格式，自研3个考试导向skill（见 `Skills/`）。

## 0. 铁律（防污染vault）

- 每次开新终端先跑 `$env:DEEPTUTOR_HOME="C:\Users\rongj\.deeptutor-home"`，再跑任何 `deeptutor` 命令。
- vault里绝不能出现 `data/` 目录（已被gitignore）。如误建：删文件夹 + `git rm -r --cached data/`。

## 0. 状态（2026-09-21已做）

- [x] `pip install deeptutor==1.6.9`（Python 3.11 ✓，Node 24 ✓）
- [x] workspace已指向本vault：`C:\Users\rongj\Desktop\学习`（Status: ready）
- [x] 已装5个skill：`flashcard-deck`（笔记→抽认卡）· `quiz-generator`（出题）· `exam-blueprint`（按 syllabus出模拟卷）· `language-learning`（单词/语法drill）· `studying`（学习计划+retrieval practice）
- [ ] **待你做（5分钟）**：见下 §1。原因是当时LM Studio没开，模型必须你亲手选。

## 1. 首次接模型（LM Studio，免费本地）

1. 打开 LM Studio → 加载一个模型（8GB显存：选Qwen3 4B左右的GGUF即可做题背单词）。
2. Start Server（默认 `http://localhost:1234/v1`）。
3. PowerShell跑（runtime家目录在vault外，不污染git）：
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

## 3. 和vault分工

| 事情 | 在哪做 |
|---|---|
| 长期知识沉淀（笔记/csv/Fehlerlog） | 本vault（Obsidian+git，唯一真相源） |
| 出题/背单词/模拟考/学习计划 | DeepTutor（读vault文件，用完结果写回vault对应 `Klausur-Training/`） |
| Agent写笔记规范 | `AGENTS.md` + `Skills/*.md` |

## 4. 评估记录：awesome-rosetta-skills（不采用）

- 地址：https://github.com/xjtulyc/awesome-rosetta-skills（MIT，34⭐，169 skills / 24学科）
- 看过目录：00-universal（literature-search…）/ 07-economics（ols/did/rdd/iv…）/ 14-philosophy（sep-literature）/ 20-education（edm-learning-analytics）——全部是科研工具链，要跑Python+调API，不产出Klausurpunkte。
- 唯一可借鉴：`SKILL.md` 标准格式（frontmatter `name/description` + 触发条件 + 步骤）。本vault `Skills/` 下3个自研skill即按此格式写，opencode/Claude/DeepTutor三方通用。
