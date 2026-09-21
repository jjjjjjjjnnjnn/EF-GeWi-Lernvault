# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 8科笔试提分，中德双语。Public repo: https://github.com/jjjjjjjjnnjnn/EF-GeWi-Lernvault

## 新agent阅读顺序（5分钟接手）
1. 本文件 → 2. `AGENTS.md`（规范） → 3. `00_META/INDEX.md`（导航） → 4. 目标学科 `Lehrplan.md` → 5. `00_META/Journal/` 最新一篇（当前上下文）。

## 当前状态（2026-09-21）
- ✅ 骨架：Obsidian vault + git + CC-BY-SA + link-check CI + `_Downloads/`(gitignore, 3份OER已下) + `Anlagen/`。
- ✅ SoWi填实（Lehrplan/Satzbausteine/Karikatur-Anleitung/9卡）；Philo填实（Menschenbild/Utilitarismus-vs-Kant/9卡+Satzbausteine）。
- ✅ Deutsch/Englisch：Lehrplan占位 + Phrasen-csv各9条 + Fehlerlog（等Lektüre/Topic填实）。
- ✅ MINT/Musik/Sport：README占位（Phase 3）。
- ✅ DeepTutor 1.6.9：workspace=本vault；LLM=本地sauerkrautlm-8b；5个skill已装；路由=记忆走本地，出题批改走musespark会话（verdict见`00_META/DeepTutor.md` §3）。
- ✅ Skills/：klausur-drill / vokabel-trainer / texte-analyse（SKILL.md格式）。
- ✅ App-EF-Lernvault：前端原型（tufte重做+交互重做：命令面板/快捷键/拖拽）+ P1接线完成（顶栏打开真实vault，笔记/背卡/面板全量切换，自测7篇36卡）；LICENSE三条式已定稿；UI-BRIEF/INTERACTION-BRIEF双规范；Rust 1.98.1已装，MSVC BuildTools待用户管理员安装。

## 环境（接手必备）
- 新终端先跑：`. .\scripts\dt-env.ps1`（设DEEPTUTOR_HOME + UTF-8，防data污染vault/防GBK崩溃）。
- DeepTutor家目录：`C:\Users\rongj\.deeptutor-home`（vault外）。LM Studio需开着（模型llama-3-sauerkrautlm-8b-instruct）。

## 待办（按优先级）
1. 用户贴第一节SoWi/Philo课堂笔记 → 按Fach-Template写首篇正式笔记（INDEX/Glossar/csv三同步）。
2. Deutsch要Lektüre名、Englisch要Topic（问用户）。
3. 用户管理员装MSVC BuildTools → 加src-tauri打首个exe（P0收尾）→ P2（ts-fsrs真实调度）。
4. Phase 3再碰MINT。

## 铁律
- 一次只做一科一commit（前缀`[SoWi]/[Philo]/[Meta]/...`）；`data/`、`_Downloads/`、`*.apkg`永不进git；只写原创笔记（版权红线见AGENTS.md §4）。
