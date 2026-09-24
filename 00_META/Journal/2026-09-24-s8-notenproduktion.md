---
fach: ""
thema: "S8 Notenproduktion Teilausbau"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta]
---

# S8 笔记生产 — 十科全量扩充（第一轮）

## 做了什么

按 `Lernbaum/00-Notenproduktion-Plan.md`（S8 施工宪法）的波次计划，用并行 subagent 产出**156 篇新笔记**，全库笔记 127 → **283 篇**。

| 学科 | 产出 | 状态 |
|---|---|---|
| Deutsch | 16/16 | ✅ 收官 |
| Englisch | 20/20 | ✅ 收官 |
| Mathe | 18/23 | 🔄 |
| Physik | 18/22 | 🔄 |
| Chemie | 18/26 | 🔄 |
| Bio | 18/34 | 🔄 |
| Philosophie | 16/22 | 🔄 |
| SoWi | 16/25 | 🔄 |
| Musik | 10/14 | 🔄 |
| Sport | 6/26 | 🔄 |
| **合计** | **156/228** | **68.4%** |

## 关键决策

1. **建立 S8 施工宪法**（`00-Notenproduktion-Plan.md`）：定义八段笔记模板、版权与真题政策（只引 NRW 官方公开题的结构，解析必原创；中国题只做原创改编）、agent 协作边界（subagent 只写笔记文件，主线程独占 INDEX/Glossar/csv 同步）。
2. **新增八段模板** `Templates/Wissensnotiz-Template.md`：中文理解 → 核心概念 → 知识结构 → 解题方法 → 🇨🇳 CN-Methode → Klausur-Training → Fehlerquellen → Vernetzung。每篇必含**知识点 + 解题方法 + 真题/训练题**三要素。
3. **建立进度索引** `00_META/S8-Noten-Index.md`（156 篇逐条链接，按学科分组）。

## 产出质量特征

- 全部笔记：六字段 frontmatter 合法、双语（中文理解在上 / 德语 Klausur-Satz 在下）、逐条 `[已验证]`/`[据推断]`/`[未获取到]` 标注、每题标来源层级、原创分步 Musterlösung。
- 理科 4 科的 CN-Methode 全部标注 **DE-Anschluss**（所用工具德国是否已教）与**合规性**，并显式登记 ⚠️ 反例与 GK/LK 分层禁止项，防超纲。
- 补齐了此前的关键 EF 缺口：Philosophie IF1/IF2、SoWi IF3 理论、Bio EF 的 Meiose/酶/ATP/信号转导、Deutsch IF1/IF4 空白。

## 执行教训（重要）

1. **单批 ≥4 个 subagent 会触发 429 限流**；限流时返回**空响应**，但**文件可能已部分写入** —— 每次必须 `git status` 核实实际产出，**空响应 ≠ 失败**。
2. **长时任务会被中断**：单批 6 篇 × 3 科时，第八波只完成 8/16 篇。对策：**降到每 agent 3–4 篇**，并要求「每篇写完立刻保存」。
3. 主线程写入大文件也可能超时，故 INDEX/Glossar 同步放在波次之后统一做。

## 待办

- **剩余 72 项**：Sport 20 · Bio 16 · SoWi 9 · Chemie 8 · Philosophie 6 · Mathe 5 · Physik 4 · Musik 4
- **同步欠账**：Glossar-DE-ZH-GeWi 与各科 `Vokabeln-Anki/*.csv` 尚未补入新术语（156 篇的术语卡）。
- **App 侧**：`src/baum/*.ts` 仍是 EF 版数据。

## 阻塞（需老师，未变）

Drama-Ganzschrift 书名 · EF young adult novel · 当届第三文化国家 · Musik Halbjahr-Thema · **Sport 2 个 Akzentuierungs-IF** · 课程类型 GK/LK。
