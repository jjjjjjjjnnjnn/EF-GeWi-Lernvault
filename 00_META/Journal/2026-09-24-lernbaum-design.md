---
fach: ""
thema: "Lernbaum十科学习树设计层落地"
datum: 2026-09-24
tags: [EF, Meta, Lernbaum]
---

# 2026-09-24 十科学习树设计（只设计，不挂笔记、不落地代码）

## 用户指令

学科树要思维导图式、从大往小、按大纲内容与要求推导；不要管笔记有没有；树会很大所以先设计文档；先不要落实到代码中。

## 交付物（`00_META/Lernbaum/` 新目录）

- `00-Designprinzipien.md` — 总纲：L0 学科→L1 考纲 Inhaltsfeld→L2 重点→L3 细分（上限每父 ≤6 子）；每篇固定三部分（总览 mindmap + 分 IF mindmap + 节点明细四行：中文一句话/Operatoren/Klausur-Anbindung/中德 Leitfrage）；⏳ 标记未定事项；纯原创结构。
- 十科树（四路 subagent 并行，主线程审核）：
  - Sprachen：Deutsch（IF×4：Sprache/Texte/Kommunikation/Medien，5 mindmap）· Englisch（TF×3 + 1 显式标注"非考纲"工具枝，5 mindmap）
  - MINT：Mathe（Analysis/Geo，24 L3）· Physik（Mechanik/Kreis+GRAV，22 L3）· Chemie（Organik/Gleichgewicht，25 L3）· Bio（Zellbio单IF 5 L2，20 L3）
  - GeWi：Philosophie（Anthropologie/Ethik）· SoWi（Ungleichheit/Politik/Wirtschaft）
  - 口试：Musik（Hören/Analysieren/Sprechen，29 L3，Beethoven 假设分支）· Sport（Praxis/Theorie/Reflexion，24 L3）
- INDEX：META 区加 Lernbaum 总览行（十科链接）+ Journal 行。

## 主线程审核（独立复核，非沿用 agent 自报）

- frontmatter：十科全合规（fach/thema/operatoren:[]/klausurrelevant/datum/tags 含 Lernbaum）。
- mermaid 块数 = 1 总览 + N个L1（De 5/En 5/Ch 3/Ma 3/Ph 3/Bio 2/Phil 3/So 4/Mu 4/Sp 4）✓ 与考纲 IF 数一致。
- mermaid 语法安全脚本扫：非 root 行零半角括号/方括号/花括号/引号/`#`/`&`（root 用合法 `root((…))` 语法）。
- 内容抽查 SoWi 全篇：层级清晰、德中节点、无 vault 链接、无教材原文复制。
- L1 与各科 `Lehrplan.md` §1 一一对应；⏳ 项与 Lehrplan §3 TODO 一致。

## 有意偏离（记录）

- Englisch 多一个"语言与考试工具枝"：显式标注非 KLP-Inhaltsfeld（避免与考纲混淆），因 Teil A/B 题型需要独立分支。
- Bio 只有一个 L1（考纲 EF 仅 Zellbiologie）：用 5 个 L2 撑开广度，符合上限。

## 下一步（用户确认后）

- Phase 1：每科 `Lernkarte-<Fach>.md` MOC（树→笔记挂载，缺口诚实标注）。
- Phase 2/3：`curriculumTree.ts`（现零消费者孤立数据）与本设计对齐后，接 App Lernbaum 模块 + BKT 掌握度着色。
