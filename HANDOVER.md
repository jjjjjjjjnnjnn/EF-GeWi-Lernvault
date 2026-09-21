# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 8科笔试提分，中德双语。Public repo: https://github.com/jjjjjjjjnnjnn/EF-GeWi-Lernvault

## 新agent阅读顺序（5分钟接手）
1. 本文件 → 2. `AGENTS.md`（规范） → 3. `00_META/INDEX.md`（导航） → 4. 目标学科 `Lehrplan.md` → 5. `00_META/Journal/` 最新一篇（当前上下文）。

## 当前状态（2026-09-21）
- ✅ 骨架：Obsidian vault + git + CC-BY-SA + link-check CI + `_Downloads/`(gitignore, 39件官方PDF已下) + `Anlagen/`。
- ✅ 10/10学科骨架：SoWi/Philo填实；Deutsch/Englisch KLP2023校准+csv各30条（等Lektüre/Topic）；MINT四科KLP校准+Formel-Spickzettel(KaTeX)；Musik/Sport口试骨架。
- ✅ 官方弹药：SoWi/Philo/Deutsch/Englisch/Mathe全套Operatoren+Konstruktion+Korrekturzeichen+Beispiele；Formelsammlung NRW 2024。
- ✅ Playwright电子书脚手架就绪（`scripts/ebook-fetch/`，等用户登录一次）。
- ✅ App需求：FEATURE-SPEC + UI-SPEC-V2（全科+KaTeX+Lernreise第7模块）可发外部AI；首个示范课程 `Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md`。

## 环境（接手必备）
- 日常开发走本地 WebUI：vault根目录跑 `. .\scripts\webui.ps1`（起1420+自动开浏览器；热更新）。
- exe 仅发版时打（`npx tauri build`，需 VS C++ workload + rust stable）。
- 新终端先跑：`. .\scripts\dt-env.ps1`（设DEEPTUTOR_HOME + UTF-8，防data污染vault/防GBK崩溃）。
- DeepTutor家目录：`C:\Users\rongj\.deeptutor-home`（vault外）。LM Studio需开着（模型llama-3-sauerkrautlm-8b-instruct）。

## 待办（按优先级）
1. 用户贴：Deutsch Lektüre + Englisch Topic/Teil-B类型 + SoWi/Philo课堂笔记 → 首篇正式笔记（INDEX/Glossar/csv三同步）。
2. 用户在自动化浏览器登录一次 → 跑SoWi全书原文（本地only）。
3. UI-SPEC-V2发外部AI做界面；P2（ts-fsrs）→ P3（LM混合组卷）→ P5（发版）。

## 铁律
- 一次只做一科一commit（前缀`[SoWi]/[Philo]/[Meta]/[Deutsch]/[Englisch]/[App]`）；`data/`、`_Downloads/`、`*.apkg`、App构建产物（`target|gen|dist|*.key|*.exe|*.msi`）永不进git；只写原创笔记（版权红线见AGENTS.md §4）。
