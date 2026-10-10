---
fach: Meta
thema: "教会人全量重构交付（361篇v5+引擎A1-A3）"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: false
datum: 2026-10-10
tags: [EF, Meta]
---

# 2026-10-10 会话日记：教会人全量重构交付（361 篇 v5 + 引擎 A1–A3）

> 用户指令"继续进行，大量 agent 合作"。11 个 agent 并行：1 引擎 + 10 学科，主线程独立验收。

## 1. B2：十科回填 v5（360/361，1 例外披露）

- SoWi 50+1v5 / Philo 30 / Deutsch 31 / Mathe 43 / Physik 38 / Chemie 37 / Bio 38 / Englisch 34 / Musik 27 / Sport 28。
- 唯一例外：`SoWi-Sozialstruktur-Sinus-Milieus-und-Ungleichheit-L1.md` 保持 Lesson-v3（Schritt 4 纯对比表无 AUFGABE 结构，C2 无法落地；C1/C4/C5 已落地）。
- 全库：零 emoji、Schritt 标题外零 unicode 箭头、KERNSATZ 361/361、ERWARTUNGSHORIZONT 361/361。
- 口径差异注记：SoWi 批 51 篇 Step1 无剧透故未加 AUFLÖSUNG（310/361 有该段）；A2 门控依赖引擎自生成 A/B 按钮，不依赖 markdown，故无阻塞。

## 2. 引擎 A1–A3（主线程 A1 + 单 agent A2/A3）

- A1（Reise.tsx）：ausprobieren 标准解析折叠显影，离线可用。
- A2（InteractiveLessonRunner.tsx:162/969/881）：lecture 未站队时推进守卫 + 按钮置灰 + 引导文案（温和门控，不扣 XP）。
- A3（同文件 15-18/282-304 行）：markt-sim/kinematik/magisches-viereck/formula 映射到已有领域仿真，无新依赖。
- 旧测试 1 项按新行为修复（先选 A 再推进 + 断言置灰）。

## 3. 门禁

- `npx tsc -b` 0 报错；全量 vitest 90 套件 692/692；`vault-check.py` PASS（reisen=361）。
- 未 commit：建议拆 11 个 commit（10 科 + 1 引擎），一科一 commit。
