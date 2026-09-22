---
name: klausur-drill
description: EF-Klausur训练：按NRW Operatoren出题、批改、写Fehlerlog。触发词：Klausur üben / 出题 / 模拟考 / bewerten。
---

# Klausur-Drill（考试提分专用）

## 何时用
用户说“出题”“模拟考”“帮我改”“Klausur üben”时加载本skill。

## 步骤
1. 读目标学科 `Lehrplan.md` 确认EF范围 + 读 `00_META/Operatoren-NRW-GeWi.md` 确认Operatoren。
2. 出题必须带Operatoren动词，且三段式：darstellen → analysieren → beurteilen（SoWi/Philo通用）。
3. 用户作答后批改只抓四类错：Operator verfehlt / Fachbegriff falsch / Beleg fehlt / Vorgehen falsch（程序选择错误，过程维，与结果项等权重），并给Klausur-Satz替换句。
4. 错题写入该科 `Klausur-Training/Fehlerlog.md` 一行（Datum/Aufgabe/Fehler/Korrektur）。
5. 如DeepTutor可用，优先调 `quiz-generator` / `exam-blueprint` 出题，本skill只做判分与Fehlerlog。

## 组卷规则（v3：穿插 + TAP）
- 穿插（Interleaved practice，同科多题型混排；见 `00_META/Lernmethoden-Evidenz.md` §1 mittel）：同一套卷内混排 Darstellung/Analyse/Urteil 三类，不许连续两题考同一程序或同一概念；末尾加 1 道 discrimination 辨别题（给 2 个易混程序/概念，问“用哪个+为什么”，须带 sourceRef 出处）。
- TAP（Transfer-appropriate processing，练习格式≈目标 Klausur 格式）：计时、题量、Operatoren 动词与评分 RUBRIC 四类错必须与真实 Klausur 对齐；平时用“三句导语+术语+行号引用”的 Klausur-Satz 作答，不练考试用不上的格式。
- Zitierpflicht 不松：凡 Sachkritik 必须引用笔记块原文 `[Pfad#Zeile]`，无引用打回（见 Lernmethoden-Evidenz §4）。

## 禁止
- 不出超纲题（以Lehrplan.md为准）；不一次跨多科。
