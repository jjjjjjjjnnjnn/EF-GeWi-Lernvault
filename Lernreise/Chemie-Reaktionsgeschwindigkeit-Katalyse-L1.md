---
fach: Chemie
thema: "Reaktionsgeschwindigkeit und Katalyse"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, analysieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Kinetik]
version: Lesson-v3
---

# Lernreise: Reaktionsgeschwindigkeit und Katalyse (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用 v = Δc/Δt 说清反应速率的含义——单位时间内反应物浓度减少或产物浓度增加的快慢，并会由 c-t 数据算平均速率。
2. 中文：能说出有效碰撞三条件（足够能量、正确取向、有效接触），并解释浓度、温度、接触面积如何通过碰撞改变速率。
3. 中文：能描述催化剂的作用——提供活化能更低的新路径、反应前后自身不变，并用德语标准句分析尾气反应 2CO + 2NO（Kat）→ 2CO2 + N2（AFB II）。

Klausur-Satz: `Die Reaktionsgeschwindigkeit v = Δc/Δt beschreibt die Konzentrationsaenderung pro Zeit und wird durch die Haeufigkeit wirksamer Zusammenstoesse bestimmt.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 反应速率 — Reaktionsgeschwindigkeit v：单位时间内的浓度变化，v = Δc/Δt，单位如 mol/(L s)。
- 有效碰撞 — Wirksamer Zusammenstoss：同时满足能量足够、取向正确、接触有效的碰撞，只有它能引发反应。
- 活化能 — Aktivierungsenergie Ea：引发反应必须跨过的能量门槛，门槛越低、有效碰撞比例越高。
- 催化剂 — Katalysator：提供低活化能新路径、反应前后质量与化学性质不变的物质。
- 尾气催化 — Abgaskatalyse：铂铑表面把有毒 CO 与 NO 转化为 CO2 与 N2 的净化过程。

Klausur-Satz: `Ein Katalysator eroeffnet einen Reaktionsweg mit niedrigerer Aktivierungsenergie und bleibt dabei selbst unveraendert.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：反应速率本质是"有效碰撞的计数"。粒子每秒碰撞无数次，但只有三条件同时满足才算数：能量够高能撞开旧键、取向正确能碰到反应部位、接触充分能真正相遇。增大浓度等于增加单位体积内的粒子数，升温等于提高能量达标比例，增大固体接触面积等于增加相遇机会，三者都是提高有效碰撞频率。催化剂走的是另一条路——它不增加碰撞总数，而是另开一条活化能更低的山道，让原来能量不够的大批碰撞一下达标。能量图上表现为双峰：无催化剂是一座高峰，有催化剂是两座矮峰，起点终点（反应物与产物能量）完全不动，因此平衡位置不变、只加快到达平衡的速度。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Energie ^
           |      ____  ohne Kat (hoch)
           |     /    \
           |    /      \            __ mit Kat (Peak 1)
           |   /        \          /  \    __ (Peak 2)
           |  /          \        /    \  /  \
           +-/------------\------/------\/----\----> Reaktionsweg
            Edukte          \    Kat-Weg  \   Produkte
                             Ea(ohne) > Ea(mit)
   Legende: Ea = Huerde, Kat = neuer Weg mit Doppelpeak
   Formel: v = Δc/Δt, Beispiel: 2CO + 2NO --Kat--> 2CO2 + N2
```

Klausur-Satz: `Der Katalysator senkt die Aktivierungsenergie ueber einen neuen Weg mit Doppelpeak, ohne Anfangs- und Endenergie zu veraendern.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Ein Autoabgaskatalysator enthaelt nur wenige Gramm Platin und Rhodium, reinigt aber ueber Jahre tausende Kubikmeter Abgas. Die Edelmetalle werden dabei nicht verbraucht, sondern reichen die Schadstoffe wie auf einem Fliessband weiter: CO und NO haften an, treffen sich in guenstiger Lage und verlassen das Blech als harmloses CO2 und N2. Darum darf bleihaltiges Benzin nie in ein Kat-Auto gelangen, weil Blei die kostbare Oberflaeche dauerhaft vergiftet.

**中文解读**: 尾气催化器只用几克贵金属、却能干几年的活，秘诀就是"只搭桥、不消耗"。铂铑表面把 CO 和 NO 吸附到合适位置，让它们低门槛相遇，全程只提供场地、不进产物。铅一来就会毒化表面、堵住活性位点，这正是含铅汽油被禁的关键原因。

**Bezug zum Konzept**: `Der Katalysator stellt Haftplaetze bereit, senkt die Huerde und verlaesst die Reaktion unveraendert.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (analysieren, AFB II)：In einem Abgasversuch sinkt die CO-Konzentration in 20 s von 0.80 mol/L auf 0.40 mol/L; die Reaktion lautet 2CO + 2NO --Kat--> 2CO2 + N2. Berechnen Sie die mittlere Reaktionsgeschwindigkeit v und beschreiben Sie, wie der Katalysator wirkt, ohne die Lage des Gleichgewichts zu veraendern.

HILFE:
1. Schritt 1: Δc aus Anfangs- und Endkonzentration bilden, Δt ablesen, dann v = Δc/Δt einsetzen.
2. Schritt 2: Drei Bedingungen wirksamer Zusammenstoesse nennen und am Beispiel CO plus NO erklaeren.
3. Schritt 3: Katalysator als neuen Weg mit niedrigerer Aktivierungsenergie deuten und betonen, dass Edukt- und Produktenergie gleich bleiben.

MUSTERLOESUNG: Es gilt Δc = 0.80 mol/L minus 0.40 mol/L = 0.40 mol/L und Δt = 20 s, also v = 0.40/20 = 0.020 mol/(L s). Dieser Wert beschreibt die mittlere Abnahme von CO. Auf Teilchenebene muessen CO und NO mit genug Energie in richtiger Orientierung auf der Kat-Oberflaeche zusammentreffen; nur solche Stoesse sind wirksam. Der Katalysator bietet Haftplaetze und einen neuen Weg mit niedrigerer Aktivierungsenergie im Doppelpeak-Bild, sodass bei gleicher Temperatur mehr Stoesse die Huerde nehmen. Da Anfangs- und Endenergie unveraendert bleiben, aendert sich die Lage des Gleichgewichts nicht, nur die Zeit bis zum Erreichen wird kuerzer.

Klausur-Satz: `Mit v = Δc/Δt folgt v = 0.020 mol/(L s); der Katalysator beschleunigt ueber niedrigere Ea, ohne Edukt- und Produktenergie zu verschieben.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：浓度效应眼 vs. 催化剂眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目问的是 (i) Konzentrations-Verfahren（c-t 数据求 v = Δc/Δt、比较快慢、分析浓度温度接触面积对碰撞频率的影响）还是 (ii) Katalysator-Verfahren（问催化剂作用机理、画双峰 Ea 图、判断平衡是否移动）—— dann rechnen.

AUFGABE A：Zwei Versuche mit CO/NO laufen bei gleicher Temperatur, Versuch 2 hat doppelte Anfangskonzentration. Gefragt ist, welcher Versuch schneller startet und warum.
AUFGABE B：Versuch 3 nutzt dieselbe Mischung wie Versuch 1, aber mit Kat-Blech. Gefragt ist, wie sich Ea-Bild und Gleichgewichtslage aendern.

HILFE: A nennt nur c-Unterschied ohne neuen Stoff -> Verfahren (i), Kollision. B nennt Zusatz Kat bei gleicher Mischung -> Verfahren (ii), Weg.【选程序：题干出现 c-t / Δc / 浓度加倍 / 升温 / 粉碎 选浓度程序；出现 Kat / Ea / 能量图 / 是否消耗 / 平衡动否 选催化剂程序。】

ANTWORT: A erfordert Verfahren (i): Versuch 2 startet schneller, weil mehr Teilchen pro Volumen haeufiger wirksam zusammenstossen; v = Δc/Δt ist dort groesser. B erfordert Verfahren (ii): Mit Kat erscheint im Energiebild ein Doppelpeak mit niedrigerer Ea, die Reaktion wird schneller, doch Edukt- und Produktenergie bleiben gleich, daher bleibt die Gleichgewichtslage unveraendert.

Klausur-Satz: `Mehr Konzentration erhoeht die Stosszahl, der Katalysator senkt die Huerde; nur der erste Fall aendert v ueber die Teilchenzahl, der zweite ueber Ea.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie ist die Reaktionsgeschwindigkeit definiert und wie berechnet man sie aus c-t-Daten? | ANTWORT: v = Δc/Δt, also Konzentrationsaenderung pro Zeit; Beispiel: Δc = 0.40 mol/L in 20 s ergibt 0.020 mol/(L s).
FRAGE: Welche drei Bedingungen machen einen Zusammenstoss wirksam? | ANTWORT: Genug Energie ueber Ea, richtige Orientierung der Treffstelle und wirksamer Kontakt; erst alle drei zusammen ermoeglichen den Umsatz.
FRAGE: Was aendert ein Katalysator im Energiebild und was nicht? | ANTWORT: Er oeffnet einen neuen Weg mit niedrigerer Ea als Doppelpeak und bleibt selbst unveraendert; Edukt- und Produktenergie sowie die Gleichgewichtslage bleiben gleich.

Klausur-Satz: `Wirksame Stoesse brauchen Energie, Orientierung und Kontakt; der Katalysator senkt nur die Huerde Ea.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"催化剂参加反应被消耗，所以要不断补充"。
   中文纠偏：催化剂只提供吸附位点和新路径，反应前后质量与化学性质都不变。能量图起点终点不动就是证据——它搭完桥就撤，不进产物，因此少量贵金属能用很多年。
   Korrektur-Satz: `Der Katalysator wird nicht verbraucht, sondern verlaesst die Reaktion unveraendert und steht fuer den naechsten Umsatz bereit.`

2. 误解"加催化剂能让平衡向产物移动、提高产率"。
   中文纠偏：催化剂只降低去程和回程共同的门槛，正逆反应同等加速，因此平衡位置不动、产率不变。它改变的是"多快到达"，不是"最终停在哪"。考题凡问平衡移动，一律不选催化剂。
   Korrektur-Satz: `Der Katalysator beschleunigt Hin- und Rueckreaktion gleich und veraendert die Lage des Gleichgewichts nicht.`

## Schritt 7 — szenario

ROLLE: Du bist Praktikantin im Umweltlabor und erklaerst einer Besuchergruppe den Auto-Katalysator.
SITUATION: Die Gruppe fragt, warum ein kleines Kat-Blech die giftigen Gase CO und NO dauerhaft in CO2 und N2 verwandeln kann, ohne selbst zu verschwinden. Antworte in einer zusammenhaengenden Darstellung (ca. 150 Woerter) mit der Gleichung 2CO + 2NO --Kat--> 2CO2 + N2, der Formel v = Δc/Δt und dem Ea-Doppelpeak.
AUFGABE: Schreibe eine Klausur-Antwort mit Berechnungsskizze, Teilchendeutung und Urteil ueber Verbrauch und Gleichgewicht.
RUBRIC (30 XP): Korrekte Deutung von v = Δc/Δt und der drei Stossbedingungen (10 XP) | Beschreibung des Kat-Weges mit niedrigerer Ea als Doppelpeak (10 XP) | Urteil: Kat bleibt unveraendert, Gleichgewichtslage bleibt gleich (10 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：速率题永远两步：先用 v = Δc/Δt 算快慢，再用有效碰撞三条件（能量、取向、接触）解释快慢。浓度温度接触面积改的是碰撞频率，催化剂改的是门槛高度——双峰变矮、起点终点不动。记住尾气方程 2CO + 2NO（Kat）→ 2CO2 + N2，凡问"催化剂是否消耗、平衡动否"，答案永远是"不消耗、不移动、只加速"。
Takeaway-Satz: `Tempo folgt aus v = Δc/Δt, Deutung aus wirksamen Stoessen; der Katalysator senkt Ea im Doppelpeak und laesst Edukt, Produkt und Gleichgewicht unveraendert.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Rechnung mit v = Δc/Δt (Schritt 4) oder die Wahl zwischen Konzentrations- und Katalysator-Verfahren (Schritt 5)?
2. 元认知计划：Beim naechsten Mal pruefe ich zuerst, ob nach c-t-Rechnung oder nach Ea-Weg gefragt ist, und zeichne danach das passende Bild.
