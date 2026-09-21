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
3. 用户作答后批改只抓三类错：Operator verfehlt / Fachbegriff falsch / Beleg fehlt，并给Klausur-Satz替换句。
4. 错题写入该科 `Klausur-Training/Fehlerlog.md` 一行（Datum/Aufgabe/Fehler/Korrektur）。
5. 如DeepTutor可用，优先调 `quiz-generator` / `exam-blueprint` 出题，本skill只做判分与Fehlerlog。

## 禁止
- 不出超纲题（以Lehrplan.md为准）；不一次跨多科。
