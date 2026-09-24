---
fach: ""
thema: "Lernbaum设计总纲"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta, Lernbaum]
---

# Lernbaum 设计总纲（十科学习树 · 只设计不落地）

> 本目录是十科学习树的**设计层**：从 NRW 大纲自顶向下推导（L0 学科 → L1 内容领域 → L2 重点 → L3 细分主题），思维导图式呈现。
> **当前阶段铁律**：只写树结构，不挂 vault 笔记链接（不管笔记有没有），不写任何代码。

## 1. 文件与位置

- 目录：`00_META/Lernbaum/`（00_META 子目录，不新增顶层目录）。
- 文件：`Lernbaum-<Fach>.md`，Fach 取 `Deutsch/Englisch/Mathe/Physik/Chemie/Bio/Philosophie/SoWi/Musik/Sport`（无变音符号，kebab 风格同仓库笔记规范）。
- 每篇头必须带 frontmatter：`fach`（学科固定词，Musik/Sport 用 `Musik`/`Sport`）、`thema`（"Lernbaum <Fach>"）、`operatoren: []`、`klausurrelevant: true`、`datum`、`tags: [EF, <Fach>, Lernbaum]`。

## 2. 层级定义（L0–L3，L4 仅在考纲强制处）

| 层级 | 名称 | 来源 | 每父节点子节点上限 |
|---|---|---|---|
| L0 | 学科根 | 本文件头：KLP 依据 + Klausur-Fokus（一句话） | — |
| L1 | Inhaltsfeld 内容领域 | **KLP 官方编号与名称**（如 `IF 1 Funktionen und Analysis`），与各科 `Lehrplan.md` §1 一一对应，不自创、不合并 | 按考纲原文（一般 2–4 个） |
| L2 | Schwerpunkt 重点 | 考纲条目下的自然分组（如"导数概念"归入 Analysis），每个 L1 下 2–6 个 | ≤ 6 |
| L3 | Feinthema 细分主题 | 最小可考单元：一个概念/一种题型/一部作品/一个模型；每个 L2 下 2–6 个 | ≤ 6 |

## 3. 呈现形式（思维导图式，双层）

每篇文档固定三部分：

1. **总览 mindmap**（L0→L1→L2）：单个 ````mermaid mindmap```` 块，根为学科，一级分支为 IF，二级为 Schwerpunkt。mermaid mindmap 语法只允许“词/短语”节点，节点文字用`德语（中文）`格式。
2. **分 IF mindmap**：每个 L1 一个 ````mermaid mindmap```` 块，展开到 L3。
3. **节点明细**：按 L1 分节，`### L2` + 条列 L3，每个 L3 节点固定四行：
   - `中文一句话`（理解在上）
   - `Operatoren: [...]`（只用该科官方 Operatoren 表里的动词）
   - `Klausur-Anbindung:`（该细分在考试中的位置：题型/任务类型/AFB；口试科写口试环节）
   - `Leitfrage DE / ZH:`（各一句）

## 4. 语言与标记规范

- 中文理解在上、德语在下（仓库正文规范）。
- 未定事项（老师未答复的 Lektüre/Halbjahr-Thema/考轨等）用 `⏳ 待确认：` 标记并继续按考纲常规分支展开，不停摆。
- 纯原创结构；KLP 官方结构属公共考纲可直接引用；不复制教材/教辅原文段落（版权红线）。

## 5. 审核清单（主线程验收用）

- [ ] L1 与该科 `Lehrplan.md` §1 的 IF 逐一对应（无遗漏、无自创 IF）
- [ ] 每个 L3 都有 Operatoren + Klausur-Anbindung + 中德 Leitfrage
- - [ ] mermaid 块语法正确（mindmap 关键字、缩进一致）
- [ ] 子节点数在上限内；超限必须拆 L2 而不是堆 L3
- [ ] ⏳ 项与 `Lehrplan.md` §3 TODO 一致
