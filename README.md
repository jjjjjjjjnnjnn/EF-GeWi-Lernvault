# EF-GeWi-Lernvault

Gymnasium Klasse 11 (EF, NRW, Schloss Heessen) 学习提速库。
Obsidian Vault + Git 版本管理，中德双语混合。

## 5分钟上手（新用户/AI交接）

1. 读 `HANDOVER.md`（一页：现状+待办+铁律）。
2. Obsidian打开本文件夹；插件装 Templater + Dataview + Spaced-Repetition-Recall。
3. 新终端跑 `. .\scripts\dt-env.ps1`（DeepTutor环境）。
4. 导航：`00_META/INDEX.md`；规范：`AGENTS.md`。

## 结构

- `00_META/` — 目标、NRW-EF课标总览、学习系统、文科Operatoren、术语库、`Journal/`每日笔记
- `01_Deutsch/` `02_Englisch/` `07_Philosophie/` `08_SoWi/` — 文科社科优先（本期填实）
- `03_Mathe/` `04_Physik/` `05_Chemie/` `06_Bio/` `09_Musik-mündl/` `10_Sport-mündl/` — 本期占位，Phase 3再填
- `Templates/` — 学科模板、课后15分钟模板、考前Drill模板、Anki卡模板
- `Skills/` — 考试导向 skills（klausur-drill / vokabel-trainer / texte-analyse，SKILL.md格式）
- `App-EF-Lernvault/` — 桌面软件源码（一站式学习App，半开源自有LICENSE；用法见其 README，安装包本地打、不进git）
- 每科统一：`Lehrplan.md` / `Ressourcen.md` / `Vokabeln-Anki/` / `Klausur-Training/`（文科加 `Texte-Analyse/`）

## 检索入口

- 人读：`00_META/INDEX.md`（全库导航，优先看这个）。
- Agent：先读 `AGENTS.md`，再读 `00_META/INDEX.md`。

## 用法（Obsidian）

1. 用 Obsidian 打开本文件夹（Open folder as vault）。
2. 插件：Templater + Dataview + Spaced Repetition Recall（见 `.obsidian/community-plugins.json`，在 Obsidian 内一键安装）。
3. 新建笔记：Ctrl+T 套用 `Templates/`。
4. 每日笔记：`00_META/Journal/YYYY-MM-DD.md`。

## 学习流程

课后15分钟 → 周末Feynman（中文讲一遍+德语3句Klausur-Satz）→ 考前7天只刷 `Klausur-Training/` + Fehlerlog。详见 `00_META/Lernsystem.md`。
刷题背单词引擎：`00_META/DeepTutor.md`（本地免费，需先接LM Studio一次）。

## 版权

- 本仓库笔记为原创，采用 CC-BY-SA-4.0（见 LICENSE）。
- 只放自己写的笔记，不放老师Klausur原题全文、出版社教材扫描、同学个人信息、学校内部文件全文。`Ressourcen.md` 只放外链。
- 开源资源来源：Serlo (CC-BY-SA)、LEIFIphysik/LEIFIchemie (FWU, 免费)、OpenStax (CC BY-NC-SA·仅本地学习)、bpb.de (免费)、ZUM/teachSam (OER)。
