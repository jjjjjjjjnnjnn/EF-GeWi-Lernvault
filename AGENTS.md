# AGENTS.md — EF-GeWi-Lernvault Agent规范

> 任何AI agent（opencode / Claude Code / 其他）在本仓库工作前必读。目标：可维护、检索快、不侵权。

## 1. 结构（固定，不许自创新顶层目录）

```
00_META/          # Ziele, Lehrplan总览, Lernsystem, Operatoren, Glossar, INDEX, Journal/
01_Deutsch/ 02_Englisch/ 07_Philosophie/ 08_SoWi/   # 文科（本期）
03_Mathe/ 04_Physik/ 05_Chemie/ 06_Bio/ 09_Musik-mündl/ 10_Sport-mündl/  # 占位（Phase 3）
Templates/        # 唯一模板来源，新建笔记必须套模板
Skills/           # 考试导向skills (SKILL.md格式)：klausur-drill / vokabel-trainer / texte-analyse
scripts/          # dt-env.ps1（新终端先 `. .\scripts\dt-env.ps1`）
HANDOVER.md       # 一页交接，新agent第一个读
App-EF-Lernvault/ # 唯一例外：桌面软件源码（半开源自有LICENSE）；vault内容只读，App不写回vault
Lernreise/        # 第二例外：互动课程脚本（App第7模块唯一课程源，只读消费）；格式见 App UI-SPEC-V2 §3.1
```

每科固定子集：`Lehrplan.md` / `Ressourcen.md` / `Vokabeln-Anki/` / `Klausur-Training/`，文科加 `Texte-Analyse/`。

**新知识笔记落位（固定规则，2026-09-25 规范化）**：
- **文科/社科**（Deutsch · Englisch · Philosophie · SoWi · Musik · Sport）→ 学科下 **`Texte-Analyse/`**
- **理科**（Mathe · Physik · Chemie · Bio）→ 学科**根目录**
- **考试训练 / 错题 / 话术库** → **`Klausur-Training/`**

文件名 `Thema-DE-kebab-case.md`（如 `Soziale-Mobilitaet.md`）；**禁用变音符号**（ae/oe/ue 代替 ä/ö/ü）与空格 —— `scripts/vault-check.py` 已强制校验（`badnames`）。
新笔记必须套 **`Templates/Wissensnotiz-Template.md`**（八段：中文理解→核心概念→知识结构→解题方法→🇨🇳CN-Methode→Klausur-Training→Fehlerquellen→Vernetzung），且必含**知识点 + 解题方法 + 真题/训练题**三要素；产出规范见 `00_META/Lernbaum/00-Notenproduktion-Plan.md`（S8 施工宪法），进度索引见 `00_META/S8-Noten-Index.md`。

## 2. Frontmatter（Wissensnotizen强制，固定文件豁免）

`Lehrplan.md / Ressourcen.md / Satzbausteine.md / Fehlerlog.md / README.md` 豁免（`Templates/` 下的脚手架模板亦豁免——它们是填空骨架不是笔记），其余每个 `.md` 笔记头必须：

```yaml
---
fach: SoWi            # 固定词：Deutsch|Englisch|Mathe|Physik|Chemie|Bio|Philosophie|SoWi|Musik|Sport
thema: "…"            # 短标题，德语优先
operatoren: []        # 如 [darstellen, analysieren, beurteilen]，无则 []
klausurrelevant: true # bool
datum: YYYY-MM-DD
tags: [EF, SoWi]      # 首标签=EF，次标签=学科
---
```

正文规范：中文理解在上、德语Klausur-Satz在下；新术语必须同步到 `00_META/Glossar-DE-ZH-GeWi.md` 加一行；错题只记 `Klausur-Training/Fehlerlog.md`。

## 3. Anki规范

- 来源唯一：各科 `Vokabeln-Anki/*.csv`，格式 `Deutsch;Chinesisch;Beispielsatz;Fach;Thema`，分号+UTF-8。
- Obsidian内背诵用 `Begriff::Definition / 中文` 单行写法（SR插件）。
- 不提交 `*.apkg / *.colpkg`（见 .gitignore）。

## 4. 版权红线（Public仓库！）

- 只写原创笔记/总结。绝不提交：老师Klausur原题全文、出版社教材扫描、同学个人信息、学校内部文件全文。
- `Ressourcen.md` 只放外链+许可注明（Serlo CC-BY-SA / OpenStax CC BY-NC-SA·仅本地学习 / bpb免费 / LEIFI免费）。
- 对外引用第三方段落必须注明来源链接。
- 批量下载只进本地 `_Downloads/`（gitignore，不推送），每文件配同名 `.quelle.txt`（来源+许可+日期）。`Anlagen/` 只放自制小图。清单唯一真相源：`00_META/Download-Quellen.md`。

## 5. Agent工作流

1. 先读 `HANDOVER.md`（一页交接），再读 `00_META/INDEX.md` 定位，再读目标学科 `Lehrplan.md`，确认EF范围后再写。最后看 `00_META/Journal/` 最新一篇接上下文。
2. 用户要刷题/背单词/改卷时，优先加载 `Skills/` 对应skill（klausur-drill / vokabel-trainer / texte-analyse）；DeepTutor可用时用它执行出题背诵，vault只做沉淀。
3. 写完笔记后：更新 `00_META/INDEX.md` 的对应链接行（如新增主题），Glossar加术语行，csv加卡片行——三处同步，一次commit。
4. 每次会话结束（或上下文交接前）在 `00_META/Journal/YYYY-MM-DD-<thema>.md` 留一条（做了什么/待办/阻塞），frontmatter见INDEX的Journal约定。
5. Commit信息前缀：`[SoWi] / [Philo] / [Meta] / [Deutsch] / [Englisch] / [App]` + 动词短句。一次只做一科，不跨科混commit。
6. 不装新Obsidian插件、不改 `.obsidian/*.json`（除非用户明确要求）；`workspace.json / cache / data.json` 永不提交。
7. 跑任何 `deeptutor` 命令前先 `. .\scripts\dt-env.ps1`；`data/` 目录永不进vault（见 `00_META/DeepTutor.md` §0）。
8. `scripts/*.ps1` 注释必须纯ASCII（PS 5.1读无BOM-UTF8中文注释会误解析，实测丢env；路径里的中文除外）。
9. **未定事项**用 `⏳ 待确认：` 标记并**继续按考纲常规分支展开**（不停摆），同时在 `00_META/Blocker-Register.md` 登记一条（含「阻断范围 / 脱敏状态 / 答案到达后的动作」）；需问老师的统一走 `00_META/Lehrkraft-Anfragen.md` 的德语问询稿，**不要分次打扰**。涉及 web/App 的阻塞（C/D 类）登记后暂缓。
10. **模块化研发与交付铁律（四步闭环：独立制作 ➔ 独立测试 ➔ 接入集成 ➔ 集成验证）**：
    - 后续无论重构、扩展或新增任何板块（仿真实验、学科工坊、研习组件、答题判分台等），**全部统一采用模块化推进**；
    - **① 独立制作（Isolate & Build）**：在独立组件或沙盒环境内构建。严禁出现“空壳页面、只有滑块没有画布、没有直观动画、纯文本占位、大片空白”等未设计半成品；
    - **② 独立测试（Standalone Test）**：在独立沙盒内做透交互测试，重点排查：参数联动是否驱动图表图形变化、SVG 缩放中心是否严格绑定几何中心（严禁偏心放大，必须绑定 `transformOrigin: ${cx}px ${cy}px` 与 `transformBox: "view-box"`）、字体对比度是否达到 AAA 标准、是否完全符合 Tufte 纯黑白学术纸墨风；
    - **③ 接入集成（Integrate）**：独立验证通过后，方可将其注册进路由与总工作台，确保无跨学科串味与无默认降级污染；
    - **④ 集成回归测试（E2E Regression Test）**：执行 `npx tsc -b` 零报错、`vault-check.py` PASS 并完成端到端模拟交互后，单科独立 commit。

## 6. 检索入口

- 人读：`README.md` → `00_META/INDEX.md`。
- 机器查：按 `fach:` + `tags:` + 文件名kebab-case；Dataview示例见 `00_META/INDEX.md` 底部。

## 7. App-EF-Lernvault 约定（桌面软件，半开源自有LICENSE）

- 只读 vault（内容源），不写回；Fehlerlog/csv 增量只生成文本补丁，由用户回 Obsidian 确认提交。
- 前端改完必须 `npm run build`（或 `cmd /c "npx tsc -b"`）通过；不新增 npm 依赖（Tauri 官方包由主 Agent 加）；图标手写内联 SVG，禁 emoji；动效只走 `index.css` token。
- **视觉排版与交互红线（Tufte 黑白纸墨宪法）**：
  - **禁用绿色/杂色排版**：严禁出现绿色字体、绿色/彩色背景卡片、低对比度浅色文字。全量统一使用高对比度 `--ink` 墨色文字、`--paper-subtle` 纸面底色与 `--line` 极简细线；
  - **SVG 交互必须保中心**：任何 SVG 图形悬停放大（hover scale）必须显式注入元素中心坐标 `style={{ transformOrigin: \`${cx}px ${cy}px\`, transformBox: "view-box" }}`，杜绝向右下方偏心漂移；
  - **全景可视原则**：所有子 Tab（如画像漫游、因果推演、会考评分等）必须具备完整的可视化主画布或结构化演绎链条，绝不允许切换 Tab 后卸载主画布导致大片空白。
- 设计双规范：`UI-BRIEF.md`（tufte）+ `INTERACTION-BRIEF.md`（交互，新键先登记 `src/keys.ts`）。
- 打包：`npx tauri build`（需 VS2022+ C++ workload + rust stable）；`src-tauri/target|gen`、签名 `.key`、安装包永不进 git；第三方署名变动同步 `NOTICE.md`。
