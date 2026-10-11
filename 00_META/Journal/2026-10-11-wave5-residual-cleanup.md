---
fach: ""
thema: "Wave5残留清零"
operatoren: []
klausurrelevant: false
datum: 2026-10-11
tags: [EF, Meta, App]
---

# Journal — Wave5 残留清零（Wave4 十路审计 tindak lanjut）

## 落库（含本篇，共 9 commits）
1. **[App] 2295e88** 双微世界情境化：LogicBlockBuilder 按课预设原型（modus_ponens 默认零回归，
   Philo→tollens/Deutsch→disjunktiv/谬误→affirming）+使命行；ScenarioDecisionTree 按课预设情境
   （fiskalpolitik 默认，mindestlohn/trolley 选路）；Runner/PlayableStudio 三处传参；
   GenericMicroWorlds +2 单测、Runner +1 端到端（737 项绿）。
2. **[Deutsch] af46c2c / [Englisch] d727587 / [Physik] 2632a16** 断裂课程链各改现存课；
   另发现 Englisch-Nachher `Abitur-Exam-Training` 亦悬空，一并改指 Macbeth-Romeo。
3. **[SoWi] 7a2db16** 两断裂引用改现存全名 + orderbuch→orderbuch-sim×2 篇 + Gini-DE 改名消歧。
   ⚠️ Gini 改名被首个 commit（af46c2c）顺带落库（staged mv，Wave2-Musik 同例），内容正确不改历史。
   ⚠️ [Deutsch] 607b4bd 把 Englisch 6 篇移位顺带（同因）；[Englisch] 6de1197 只剩引用同步。
4. **[Mathe] c786d2a / [Englisch] 621cd3f / [Bio] d74c6a5** Fehlerlog 修复；
   **[Meta] 3e769cd** Glossar 去重 4 行 + 消歧 3 组 + 表中断裂改 HTML 注释，
   Anki-CSV 去空行 9 处 + 10 文件补表头（csv_rows 保持 1942，门禁 header 豁免）。
5. **[Philo] bc51692** 24 篇移入 Texte-Analyse + 6 文件 56 处引用同步 + Kant 补 Mini-Klausur；
   **[Deutsch] 607b4bd / [Englisch] 6de1197** 6 篇移位 + 6 文件引用同步；
   **[Meta] e332718** 问询稿 G6/G7（Teil B 二选一 + 词典视听合并一问 + 落地表 G7 行）。
6. **[App] b8440b2** Tufte 批量 40 文件：shadow→none 106、italic 去 24、emerald→墨纸 139+3、
   success 正文→墨 74、Orderbuch 买卖对对称收归墨纸、Osmose 画布色/滑块点缀、Faust 选中 ring、
   Trilemma 边线、MoleculeShapeSim 状态色；测试断言文件不动；737 项绿。
7. **[App] baum Operatoren 归一**（本轮）：正文 ASCII→Umlaut（74 处：erklären/begründen/erläutern/
   erörtern/über/fünf/für/zurück/prüfen/würde），节点 id 保持 ASCII（回退 1 处污染）；
   engine.test.ts 同步。**审计纠错**：mathe.ts modellieren/deuten/erklären/bewerten 非违规，
   官方 Operatoren 表兜底条款允许表外动词（已验证原文），不改。
8. **[Meta] 本 commit**：考纲三过期（00-Design S8→已完成、01-Quellen 乱码行→已解决、
   SoWi Q1/Q2→QP/IF 口径）；Sport 树 GK 缺口 51 处翻 ✅（22 篇全验证存在）+ LK 行待确认启用 +
   Trainingsplan 断链修；NOTICE katex 署名 + transformers 4.3.0；HANDOVER 术语 973。

## 门禁（终验）
- vault-check PASS（420/1942/361/388）· tsc 0 报错 · vitest 94 套件 737 项全绿。

## 残留（自愿债，非正确性）
- Lernreise 正文 ASCII `->` 353 篇风格残留（规范若要 → 再批量）；
- SoWi 51 篇无 AUFLÖSUNG/Option 整科模板差（需 Didaktik 决策）；
- 9 步制 5 篇 MUSTERL* 缺失中的 4 篇（Sinus 除外：Bio×2/Physik×1/Mathe×1）；
- aiGatewayProxy 开放代理（dev-only，记 D 类收紧）；
- Journal/Archiv 历史日志旧链（有意不动，保历史原貌）。
