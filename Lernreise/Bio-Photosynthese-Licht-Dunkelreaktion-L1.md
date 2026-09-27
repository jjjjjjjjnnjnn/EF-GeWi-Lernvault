---
fach: Bio
thema: "Photosynthese Licht- und Dunkelreaktion"
level: 1
ziel: Klausur
xp: 100
operatoren: [erlaeutern, vergleichen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Pflanzenphysiologie]
version: Lesson-v3
---

# Lernreise: Photosynthese Licht- und Dunkelreaktion (L1, Ziel Klausur)

<!-- Lesson v3 8-Schritt-Architektur: Schritt 1-8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser skip, kein Schritt); [Werkzeug: <id>] interaktiv; Gating: check/szenario nicht bestanden = Weiter grau; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能默写光合作用总方程 6 CO2 + 6 H2O + Lichtenergie → C6H12O6 + 6 O2，并说清其与细胞呼吸正好方向相反、能量形式互补。
2. 中文：能对比光反应与暗反应——场所（类囊体膜 vs. 叶绿体基质）、条件（需光 vs. 不直接需光）、原料产物（水 + 光 → ATP + NADPH + O2 vs. CO2 + ATP + NADPH → 葡萄糖）。
3. 中文：能说出限制因子三件套——光强度、CO2 浓度、温度，并解释温室补光加 CO2 富集为何增产（AFB II 应用题标准逻辑）。

Klausur-Satz: `Die Photosynthese nutzt Lichtenergie, um aus Kohlenstoffdioxid und Wasser Glucose und Sauerstoff aufzubauen.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语）：

中文在上，德语在下：

- 光反应 — Lichtreaktion：发生在类囊体膜，需光，把水分解放出氧气，同时生成 ATP 与 NADPH。
- 暗反应（卡尔文循环）— Dunkelreaktion (Calvin-Zyklus)：发生在基质，不直接需光，利用 ATP 与 NADPH 把 CO2 固定为葡萄糖。
- 类囊体 — Thylakoid：叶绿体内的膜结构，叠成基粒，是光反应的场所，含叶绿素与电子传递链。
- 基质 — Stroma：类囊体周围的液态空间，是暗反应的场所，含 Calvin-Zyklus-Enzyme.
- 限制因子 — limitierender Faktor：三件套 Lichtstaerke, CO2-Konzentration, Temperatur；最短的那块板决定速率。

Klausur-Satz: `Die Lichtreaktion an der Thylakoidmembran liefert ATP und NADPH fuer die Dunkelreaktion im Stroma.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：光合作用是两段式"充电—生产"系统。光反应是充电段：在类囊体膜上，叶绿素吸收光子，水被光解产生氧气、质子与电子，电子流经传递链建立质子梯度，合成 ATP，同时生成 NADPH——所以光反应离不开光，产物是能量载体而非糖。暗反应是生产段：在基质中，CO2 先被固定，再用光反应送来的 ATP 与 NADPH 还原成糖——它本身不直接用光，但白天靠光反应供货，晚上停工。三件套限制因子正好卡住两段：弱光卡充电，低 CO2 卡原料，低温卡酶活性。温室策略就是对症下药：补光延长充电时间，CO2 富集加足原料，温度调到酶最适点。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Licht + H2O + ADP + NADP+
              |
              v
   [LICHTREAKTION | Thylakoidmembran, braucht Licht]
      Photolyse: 2 H2O --> O2 + 4 H+ + 4 e-
      e- -Transport + H+ -Gradient --> ATP + NADPH
              |
              |  ATP + NADPH (Energie-Shuttle)
              v
   [DUNKELREAKTION / Calvin-Zyklus | Stroma, kein direktes Licht]
      CO2 -Fixierung + Reduktion mit ATP/NADPH --> C6H12O6
              |
      limitierende Faktoren: Licht | CO2 | Temperatur
      Gewaechshaus: Zusatzlicht + CO2-Anreicherung + Optimum-T
```

Klausur-Satz: `Die Lichtreaktion spaltet Wasser an der Thylakoidmembran und die Dunkelreaktion fixiert CO2 im Stroma mithilfe von ATP und NADPH.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Moderne Gewaechshaeuser in den Niederlanden beleuchten Tomaten im Winter mit LED-Licht und pumpen zusaetzlich CO2 aus Industrieabgasen in die Halle. Der Ertrag steigt deutlich. Der Trick ist simple Biologie: Mehr Licht verlaengert die Lichtreaktion, mehr CO2 beschleunigt die Dunkelreaktion. Erst wenn beide Stufen satt versorgt sind, wird die Temperatur zum neuen Engpass. Bauern betreiben damit angewandte Photosynthese-Optimierung.

**中文解读**: 荷兰温室冬天给番茄"开夜灯 + 喂 CO2"：LED 补光让光反应多充电，工业回收的 CO2 让暗反应多来料，两段都吃饱后，大棚再把温度调到酶的最适点。这就是限制因子三件套的实战版——缺哪块板补哪块。

**Bezug zum Konzept**: `Licht treibt die Thylakoid-Stufe, CO2 treibt die Stroma-Stufe, die Temperatur bestimmt das Enzymtempo.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (erlaeutern, AFB II)：Erlaeutern Sie die Gesamtgleichung der Photosynthese und ordnen Sie Licht- und Dunkelreaktion nach Ort, Bedingungen und Produkten zu. Beziehen Sie die drei limitierenden Faktoren ein.

HILFE:
1. Schritt 1: Gesamtgleichung notieren: 6 CO2 + 6 H2O + Lichtenergie -> C6H12O6 + 6 O2.
2. Schritt 2: Tabelle mit zwei Zeilen anlegen: Reaktion | Ort | braucht Licht? | Edukte -> Produkte.
3. Schritt 3: Drei Faktoren je einer Stufe zuordnen: Licht -> Lichtreaktion, CO2 -> Dunkelreaktion, Temperatur -> Enzyme beider Stufen, besonders Calvin-Zyklus.

MUSTERLÖSUNG: Gesamtgleichung: 6 CO2 + 6 H2O + Lichtenergie -> C6H12O6 + 6 O2. Lichtreaktion: Ort Thylakoidmembran, nur mit Licht, 2 H2O + ADP + NADP+ -> O2 + ATP + NADPH. Dunkelreaktion: Ort Stroma, kein direktes Licht noetig, CO2 + ATP + NADPH -> C6H12O6 + ADP + NADP+. Limitierende Faktoren: Bei schwachem Licht limitiert die Lichtreaktion den ATP/NADPH-Nachschub; bei niedrigem CO2 limitiert die Fixierung im Calvin-Zyklus; bei niedriger Temperatur sinkt die Enzymaktivitaet, bei zu hoher Temperatur droht Denaturierung. Daher steigern Zusatzlicht und CO2-Anreicherung im Gewaechshaus den Ertrag, solange die Temperatur im Optimum bleibt.

Klausur-Satz: `Lichtstaerke, CO2-Konzentration und Temperatur limitieren je nach Versorgungsstatus Licht- oder Dunkelreaktion.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：类囊体眼 vs. 基质眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目问的是 (i) Lichtreaktion-Verfahren（关键词 Thylakoid / Licht / Wasser-Spaltung / O2 / ATP + NADPH 生成）还是 (ii) Dunkelreaktion-Verfahren（关键词 Stroma / Calvin / CO2-Fixierung / Glucose / ATP + NADPH 消耗）—— dann rechnen.

AUFGABE A：In einem Versuch wird isoliertes Thylakoidmaterial belichtet; gemessen wird Sauerstoff-Freisetzung bei Wasserzugabe.
AUFGABE B：In einem Versuch wird isoliertes Stroma mit CO2 plus ATP und NADPH versorgt; gemessen wird Glucose-Bildung auch im Dunkeln.

HILFE: A nennt Thylakoid plus Licht plus O2 aus Wasser -> Verfahren (i), Lichtreaktion. B nennt Stroma plus CO2 plus Glucose im Dunkeln -> Verfahren (ii), Dunkelreaktion.【选程序：题干出现 Licht / Thylakoid / O2 选光反应；出现 Stroma / CO2 / Glucose / Calvin 选暗反应。】

ANTWORT: A erfordert Verfahren (i): Die Lichtreaktion an der Thylakoidmembran spaltet Wasser zu O2 und bildet ATP sowie NADPH nur unter Licht. B erfordert Verfahren (ii): Die Dunkelreaktion im Stroma fixiert CO2 mithilfe von ATP und NADPH zu Glucose und laeuft auch ohne direktes Licht, solange Nachschub vorhanden ist.

Klausur-Satz: `O2 stammt aus der Photolyse des Wassers in der Lichtreaktion, Glucose aus der CO2-Fixierung in der Dunkelreaktion.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die Gesamtgleichung der Photosynthese? | ANTWORT: 6 CO2 + 6 H2O + Lichtenergie -> C6H12O6 + 6 O2.
FRAGE: Vergleichen Sie Ort und Lichtbedarf beider Reaktionen. | ANTWORT: Lichtreaktion an der Thylakoidmembran nur mit Licht; Dunkelreaktion im Stroma ohne direktes Licht, aber abhaengig von ATP und NADPH.
FRAGE: Nennen Sie die drei limitierenden Faktoren mit Wirkort. | ANTWORT: Lichtstaerke fuer die Lichtreaktion, CO2-Konzentration fuer die Dunkelreaktion, Temperatur fuer die Enzymaktivitaet beider Stufen.

Klausur-Satz: `ATP und NADPH verbinden als Energietraeger die Thylakoid-Stufe mit dem Calvin-Zyklus im Stroma.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"暗反应在晚上进行、光反应在白天进行，两者时间完全分开"。
   中文纠偏：暗反应叫"暗"只是因为不直接需光，白天它恰恰最忙——靠光反应实时供 ATP 与 NADPH。夜间无供货时它也停工，不是"上夜班"。
   Korrektur-Satz: `Die Dunkelreaktion braucht kein direktes Licht, ist aber ueber ATP und NADPH an die laufende Lichtreaktion gekoppelt.`

2. 误解"光合作用放出的氧气来自 CO2"。
   中文纠偏：同位素标记实验证明 O2 来自水的光解，不是 CO2。CO2 的氧最终进了葡萄糖与水，O2 的氧来自 H2O。
   Korrektur-Satz: `Der freigesetzte Sauerstoff stammt aus der Photolyse von Wasser, nicht aus Kohlenstoffdioxid.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in der EF und beraetst einen Gewaechshaus-Betrieb.
SITUATION: Der Betrieb will im Winter den Tomatenertrag steigern und ueberlegt zwischen Zusatzlicht, CO2-Anreicherung und staerkerer Heizung. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) Licht- und Dunkelreaktion mit Orten sowie die drei limitierenden Faktoren und gib eine begruendete Empfehlung.
RUBRIC (30 XP): Beide Reaktionen mit Ort korrekt (10 XP) | Drei Faktoren mit Wirkort erklaert (10 XP) | Empfehlung Zusatzlicht plus CO2 mit Temperatur-Optimum verknuepft (10 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：光合作用 = 一方程两场所三因子。一方程：6 CO2 + 6 H2O + 光能 → C6H12O6 + 6 O2；两场所：类囊体膜光反应充电（水 → O2 + ATP + NADPH），基质暗反应生产（CO2 → 糖）；三因子：光、CO2、温度。做题先看关键词定场所，再看缺什么定限制因子。记住一句话：氧气来自水，糖来自 CO2，能量桥是 ATP + NADPH。
Takeaway-Satz: `Thylakoid laedt mit Licht ATP und NADPH, Stroma baut damit aus CO2 Glucose; Licht, CO2 und Temperatur limitieren den Ertrag.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Zuordnung von Ort und Produkt (Schritt 4) oder die Wahl zwischen Licht- und Dunkelreaktion (Schritt 5)?
2. 元认知计划：Beim naechsten Mal markiere ich zuerst die Signalwoerter Thylakoid oder Stroma und entscheide danach ueber den limitierenden Faktor.
