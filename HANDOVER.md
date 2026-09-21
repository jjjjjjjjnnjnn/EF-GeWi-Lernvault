# HANDOVER — 一页交接（新agent/用户先读我）

> 目标：Gymnasium EF (NRW, Schloss Heessen) 8科笔试提分，中德双语。Public repo: https://github.com/jjjjjjjjnnjnn/EF-GeWi-Lernvault

## 新agent阅读顺序（5分钟接手）
1. 本文件 → 2. `AGENTS.md`（规范） → 3. `00_META/INDEX.md`（导航） → 4. 目标学科 `Lehrplan.md` → 5. `00_META/Journal/` 最新一篇（当前上下文）。

## 当前状态（2026-09-21）
- ✅ 骨架：Obsidian vault + git + CC-BY-SA + link-check CI + `_Downloads/`(gitignore, 3份OER已下) + `Anlagen/`。
- ✅ SoWi填实（Lehrplan/Satzbausteine/Karikatur-Anleitung/8卡）；Philo填实（Menschenbild/Utilitarismus-vs-Kant/8卡+Satzbausteine）。
- ✅ Deutsch/Englisch：Lehrplan占位 + Phrasen-csv各8条 + Fehlerlog（等Lektüre/Topic填实）。
- ✅ MINT/Musik/Sport：README占位（Phase 3）。
- ✅ DeepTutor 1.6.9：workspace=本vault；LLM=本地sauerkrautlm-8b；5个skill已装；路由=记忆走本地，出题批改走musespark会话（verdict见`00_META/DeepTutor.md` §3）。
- ✅ Skills/：klausur-drill / vokabel-trainer / texte-analyse（SKILL.md格式）。
- ✅ App-EF-Lernvault v0.1.0-prototype：Tauri规划 + React前端原型（6模块mock），`npm run dev` 可预览；LICENSE三条式已定稿；UI-BRIEF已写（tufte简洁风，等其他AI重做UI）；Rust 1.98.1已装，MSVC BuildTools待用户管理员安装。

## 环境（接手必备）
- 新终端先跑：`. .\scripts\dt-env.ps1`（设DEEPTUTOR_HOME + UTF-8，防data污染vault/防GBK崩溃）。
- DeepTutor家目录：`C:\Users\rongj\.deeptutor-home`（vault外）。LM Studio需开着（模型llama-3-sauerkrautlm-8b-instruct）。

## 待办（按优先级）
1. 用户贴第一节SoWi/Philo课堂笔记 → 按Fach-Template写首篇正式笔记（INDEX/Glossar/csv三同步）。
2. Deutsch要Lektüre名、Englisch要Topic（问用户）。
3. Phase 3再碰MINT。

## 铁律
- 一次只做一科一commit（前缀`[SoWi]/[Philo]/[Meta]/...`）；`data/`、`_Downloads/`、`*.apkg`永不进git；只写原创笔记（版权红线见AGENTS.md §4）。
