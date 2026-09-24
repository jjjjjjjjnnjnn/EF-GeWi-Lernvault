---
fach: ""
thema: "Curriculum-Framework und Pilot"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Meta]
---

# 2026-09-24 考纲体系工程：框架建立与试点（`[Meta]`）

## 做了什么

用户决策启动「跨国考纲对照工程」：EF+Q1+Q2 完整 Oberstufe，文科以德国 NRW 为基准、理科德中双基准。四项决策：范围全覆盖 / 对照三合一（映射+双轨笔记+中国真题素材）/ 版权严格红线 / 节奏先框架后铺开。

- **S0 框架**：`00_META/Curriculum/` 建立设计总纲（`00-Design.md`，唯一真相源）、官方源清单（`01-Quellen.md`）、4 套模板（文科/理科/中国/映射）、目录结构（Deutschland / China / Mapping / Klausur-Formate）。
- **S1 试点**（2 个 subagent 并行，文件所有权零重叠）：
  - `Deutschland/SoWi-Oberstufe.md`（299 行，7 IF × 双 Abschnitt）
  - `Deutschland/Mathe-Oberstufe.md`（391 行，55 条 [已验证]）
  - `Mapping/Mathe-DE-CN-Mapping.md`（228 行，50 条 [据推断]）

## 关键调研结论（[已验证]）

- **NRW 三个并行 KLP 世代**，本项目采用当前在校生版本：Deutsch/Englisch/Mathe/Physik/Chemie/Bio → 2022/23 版；Philosophie/SoWi/Musik/Sport → 2013 版。**不许混用**。
- **Operatoren 不在 KLP 内**；**Klausur 时长在 BASS 13-32 Nr. 6**。
- **Englisch KLP 无 Inhaltsfelder**（纯能力导向）。
- **中国课标水平数因科而异**：数学 3 / 物理 5 / 化学 4 / 生物 4。
- ⚠️ 中国数学课标仅 2017 年版（非 2020 修订），结构可信、版本需标注。

## 试点纠错（上游简报有误，已用官方原文纠正）

1. Mathe Kompetenzbereich **五维**（非六维，Reflektieren 是子维度）
2. Mathe **EF 已含 A+G**（Stochastik 在 Q 阶段）
3. SoWi KLP **只有 EF / Qualifikationsphase 两级**
4. SoWi PDF 乱码**不存在**，IF 标题全部已验证

> 教训：「不许盲信上游简报，官方原文优先」已写入 `00-Design.md §1.6`。

## 最高价值发现（Mathe 中德对照）

- **数列**——德国无此主题；嫁接入口是 `Iteration`/`Kumulation`
- **用导数证明不等式**——不需新知识点，补强德国 AFB III，**性价比最高**
- **平面向量基本定理**——填 EF→Q1 断层上游

**德国更深**：LK 判断统计学；`Normalverteilung` 的 `Verteilungsfunktion` = `Integralfunktion`（S⇄A 唯一显式交叉点）。

## 待办

- S2 用户验收 → S3 德国 10 科全量 → S4 中国理科 4 科 → S5 映射 4 科 → S6 Operatoren/Formate → S7 对接 Lernbaum
- SoWi 缺口：IF5 欧盟、IF7 全球空白；IF4 经济政策无正式笔记（Abitur 2027 聚焦 IF4+IF6，优先）；QP 层笔记为零

## 阻塞

- 无。等待用户验收试点后全面铺开。
