---
fach: Mathe
thema: "Skalarprodukt im Raum"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Vektoren]
version: Lesson-v3
---

# Lernreise: Skalarprodukt im Raum (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 29/33 | Krise: Schleusen-Fuellstand 2,40 m kritisch | Zielgroessen: Vektoren im Raum, Ziel Winkel und Orthogonalitaetsprobe | Tool: formula -->

## Schritt 1 — entdecken: ZKE-Generalprobe II
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清空间向量点积的双重含义——代数上是坐标分量对应相乘再相加，几何上是模长乘积再乘夹角余弦。
2. 中文：能用坐标公式和几何公式双向计算点积，并由点积符号判断夹角是锐角、直角还是钝角。
3. 中文：能用点积等于零判定两向量垂直，并写出德语标准结论句（AFB II）。

### Hook / Phaenomen

空间里两个箭头：是同向发力还是互相拆台？点积用一个数说清配合程度，为零就是垂直，模长归一化后夹角现形。

Hook / Phaenomen: Zwei Pfeile im Raum: Zeigen sie gemeinsam voran oder blockieren sie sich? Das **Skalarprodukt** misst die Zusammenarbeit in einer einzigen Zahl. Null bedeutet **Orthogonalitaet**, der **Betrag** normiert, die **Winkelformel** enthuellt den Rest.

`Klausur-Satz: Das Skalarprodukt entscheidet Zusammenarbeit: Positiv spitz, null orthogonal, negativ stumpf.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 空间向量 — Vektor im Raum：用三个坐标 $(x_1, x_2, x_3)$ 描述的有向线段。【陷阱：Vektor（向量）不是 Punkt（点），书写必须带箭头 $\vec{a}$。】 Er besitzt Richtung und Laenge, aber keinen festen Ort. Er besitzt Richtung und Laenge, aber keinen festen Ort. Mechanismus: Pfeil durch Koordinatentripel darstellen. Klausur-Tipp: Koordinaten als Spalte oder Zeile schreiben.
- 点积（数量积） — Skalarprodukt：结果是标量（数字）而非向量，记作 $\vec{a} \cdot \vec{b}$。【陷阱：Skalarprodukt（点积，结果是数）不是 Vektorprodukt（叉积，结果是向量）。】 Es verdichtet zwei Vektoren zu einer einzigen Kooperationszahl. Es verdichtet zwei Vektoren zu einer einzigen Kooperationszahl. Mechanismus: Koordinatenweise multiplizieren und summieren. Klausur-Tipp: Summenformel vor dem Einsetzen hinschreiben.
- 模长 — Betrag：向量长度 $|\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$。【陷阱：Betrag（长度恒非负）不是 Koordinate（坐标可为负）。】 Er misst die Laenge des Pfeils im Raum. Er misst die Laenge des Pfeils im Raum. Mechanismus: Koordinaten quadrieren, addieren und Wurzel ziehen. Klausur-Tipp: Wurzel erst am Ende numerisch auswerten
- 夹角 — Winkel zwischen Vektoren：两向量起点重合时张开的角，范围 $0^\circ$ 至 $180^\circ$。【陷阱：Winkel（几何夹角恒取小角）不是 Richtung（方向角）。】 Sie loest den eingeschlossenen Winkel aus Skalarprodukt und Betraegen. Sie loest den eingeschlossenen Winkel aus Skalarprodukt und Betraegen. Mechanismus: Skalarprodukt durch Betragsprodukt teilen und arccos nehmen. Klausur-Tipp: Gradmass und Bogenmass sauber trennen.
- 正交（垂直） — Orthogonalitaet：夹角为 $90^\circ$，等价于点积为零。【陷阱：orthogonal（垂直相交）与 parallel（平行）互斥，不可混用。】 Orthogonal heisst Skalarprodukt null bei Vektoren ungleich null. Orthogonal heisst Skalarprodukt null bei Vektoren ungleich null. Mechanismus: Skalarprodukt null setzen und pruefen. Klausur-Tipp: Nullvektor als Sonderfall ausschliessen.

`Klausur-Satz: Das Skalarprodukt verbindet die Koordinatenform mit der geometrischen Form ueber den Kosinus des eingeschlossenen Winkels.`

## Schritt 3 — entdecken: Wirkungskette hinter Skalarprodukt im Raum
ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象无人机悬停时判断两根天线是否垂直：眼睛看不准，点乘算得准。符号即答案。

Phaenomen-Satz (DE): Das Vorzeichen verraet den Winkel.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块改向量坐标（关键词：Skalarprodukt, Koordinatenform, Betrag, Kosinus），看点乘由正变零变负时夹角如何从锐角走到直角再到钝角。

Beobachtungs-Satz (DE): Positiv heisst spitz, null heisst recht, negativ heisst stumpf.

Aha-Moment因果链：

中文因果链：坐标式把分量两两相乘再相加，几何式是模长乘积再乘夹角余弦，两式相等即得夹角公式；点乘为零当且仅当余弦为零即垂直，符号直接定性 Other cases 不用算角。

Gesetz-Satz (DE): Null genau bei orthogonal, Vorzeichen bei spitz oder stumpf.

$\vec{a}\cdot\vec{b} = a_1b_1+a_2b_2+a_3b_3$

$\vec{a}\cdot\vec{b} = |\vec{a}||\vec{b}|\cos\varphi$

$\vec{a}\cdot\vec{b} = 0 \Leftrightarrow orthogonal$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Vektor a und b schliessen phi ein
skalar > 0: phi spitz | = 0: phi = 90 | < 0: phi stumpf
Winkel: phi = arccos( skalar / (|a||b|) )
```

$$\vec{a}\cdot\vec{b} = |\vec{a}||\vec{b}|\cos(\varphi)$$
`Klausur-Satz: Das Vorzeichen des Skalarprodukts entscheidet, ob der eingeschlossene Winkel spitz, recht oder stumpf ist.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Das Skalarprodukt wurde im 19. Jahrhundert von Hermann Grassmann und Josiah Gibbs entwickelt, weil Physiker eine Rechenart brauchten, die aus zwei Vektoren (zum Beispiel Kraft und Weg) eine einzige Zahl (die Arbeit) macht. Die physikalische Arbeit $W = \vec{F} \cdot \vec{s}$ ist also das aelteste Anwendungsbeispiel des Skalarprodukts.

**中文解读**: 点积最早是为物理学打工的：力乘以路程只有沿力方向的分量才算数，正好就是投影思想。中国学生熟悉的"功 = 力 × 距离 × cos夹角"就是点积的几何公式，数学和物理在这里是同一件事。

**Bezug zum Konzept**: `Die Arbeit als Skalarprodukt zeigt, dass nur die Projektion einer Kraft entlang des Weges zaehlt.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag ZKE-Generalprobe II
Kontinuitaet: Vorher Mathe-Steckbriefaufgaben-Verfahren-L1.md | Nachher Mathe-Vektoren-Raum-Skalarprodukt-DE-L1.md. Krise dieser Episode: Schleusen-Fuellstand 2,40 m kritisch. Zielgroessen: Vektoren im Raum, Ziel Winkel und Orthogonalitaetsprobe

[Werkzeug: formula]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：给出两空间向量，先判是否垂直，再求其夹角并精确到度。

AUFGABE (anwenden, AFB II): Pruefen Sie zwei Raumvektoren auf Orthogonalitaet und berechnen Sie den eingeschlossenen Winkel.

HILFE（中德双语步骤）：

1. 中文：第1步坐标式求点乘，是零即垂直，关键词：Koordinaten。
   Schritt 1 (DE): $\vec{a}\cdot\vec{b}$ komponentenweise bilden.
2. 中文：第2步求模长并代入夹角公式，关键词：Betrag。
   Schritt 2 (DE): $\cos\varphi$ aus Skalar und Betraegen bilden.
3. 中文：第3步反余弦得角并回判形状，关键词：Winkel。
   Schritt 3 (DE): $\varphi = \arccos(\dots)$ deuten.

MUSTERLOESUNG：中文：点乘为零则垂直，无需再算；非零则继续求模、求余弦、反余弦得角，符号提前告诉你答案是锐还是钝。

MUSTERLOESUNG (DE): Wegen $\vec{a}\cdot\vec{b} = 0$ sind die Vektoren orthogonal ($\varphi = 90^\circ$). Allgemein folgt $\varphi = \arccos\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$; das Vorzeichen entscheidet vorab ueber spitz oder stumpf.
`Klausur-Satz: Wegen $\vec{a} \cdot \vec{b} = 0$ schliessen die Vektoren einen rechten Winkel ein und sind orthogonal.`

## Schritt 5 — ausprobieren: Duell der Verfahren ZKE-Generalprobe II
VERGLEICH辨别实验（双向辨析：点积眼 vs. 叉积眼）：

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle erst das Verfahren — 【选程序】先判断题目要的是 (i) Skalar-Verfahren（求角度、投影、垂直判定，结果是数字）还是 (ii) Vektor-Verfahren（求法向量、面积，结果仍是向量）—— dann rechnen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Pruefen Sie, ob die Vektoren $\vec{u} = (1, 0, 1)$ und $\vec{v} = (-1, 2, 1)$ senkrecht aufeinander stehen.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Bestimmen Sie einen Vektor, der gleichzeitig senkrecht auf $\vec{u}$ und $\vec{v}$ steht.

HILFE: A fragt nach einer Ja-Nein-Aussage ueber einen Winkel -> Verfahren (i), Skalarprodukt, Ergebnis Zahl. B verlangt einen neuen Vektor als Ergebnis -> Verfahren (ii), Vektorprodukt.【选程序：题干问 Winkel / orthogonal / Projektion 选点积；题干要 Normalenvektor / Flaecheninhalt 选叉积。】

ANTWORT: A erfordert Verfahren (i): $\vec{u} \cdot \vec{v} = -1 + 0 + 1 = 0$, also orthogonal. B erfordert Verfahren (ii): Das Vektorprodukt $\vec{u} \times \vec{v}$ liefert einen Normalenvektor, das Skalarprodukt koennte das nie leisten.

`Klausur-Satz: Fuer Winkel- und Orthogonalitaetsfragen ist das Skalarprodukt das richtige Verfahren, fuer Normalenvektoren das Vektorprodukt.`

## Schritt 6 — check: Selbsttest zu Skalarprodukt im Raum: ZKE-Generalprobe II
CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Wie lautet die Koordinatenform des Skalarprodukts im Raum? | ANTWORT: $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$.
- FRAGE: Wie haengt das Skalarprodukt mit dem eingeschlossenen Winkel zusammen? | ANTWORT: $\vec{a} \cdot \vec{b} = |\vec{a}|\,|\vec{b}|\cos\varphi$, also $\cos\varphi = (\vec{a} \cdot \vec{b}) / (|\vec{a}|\,|\vec{b}|)$.
- FRAGE: Welches Vorzeichen hat das Skalarprodukt bei stumpfem Winkel? | ANTWORT: Negativ, weil $\cos\varphi < 0$ fuer $90^\circ < \varphi \le 180^\circ$.

`Klausur-Satz: Aus Koordinatenform und Betraegen folgt der Winkel ueber den Arkuskosinus des normierten Skalarprodukts.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"点积的结果还是向量，所以可以继续画箭头"。
   中文纠偏：点积把两个向量压成一个数字（标量），没有方向、画不出箭头。凡是结果带箭头的都是叉积。中文里"数量积"这个别名就是提醒：结果是数量。
   Korrektur-Satz: `Das Skalarprodukt zweier Vektoren ist ein Skalar und besitzt keine Richtung.`

2. 误解"点积为零时两向量一定垂直，零向量也不例外"。
   中文纠偏：零向量与任何向量点积都为零，但它没有方向，谈垂直没有意义。垂直判定默认两个向量都是非零向量，考场上要先排除零向量。
   Korrektur-Satz: `Die Orthogonalitaetsregel $\vec{a} \cdot \vec{b} = 0$ gilt nur fuer vom Nullvektor verschiedene Vektoren.`

## Schritt 7 — szenario: Klausurtransfer: Skalarprodukt im Raum: ZKE-Generalprobe II
ROLLE: Du bist Tutorin in der EF und hilfst einer Mitschuelerin bei der Klausurvorbereitung Vektoren.
SITUATION: Sie hat $\vec{a} = (2, 1, -2)$ und $\vec{b} = (1, -2, 0)$ gegeben und weiss nicht, ob sie senkrecht stehen und welchen Winkel sie einschliessen.
AUFGABE: Erklaere in ca. 150 Woertern mit Rechnung, wie Skalarprodukt, Betraege und Winkelformel zusammenhaengen, und gib eine klare Ja-Nein-Antwort zur Orthogonalitaet.
RUBRIC (30 XP): Korrektes Skalarprodukt (10 XP) | Korrekte Betraege (10 XP) | Winkelberechnung plus Orthogonalitaetsurteil mit Fachbegriffen (10 XP).

`Klausur-Satz: Wer Skalarprodukt berechnet, Winkel bestimmt und Orthogonalitaet begruendet, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: ZKE-Generalprobe II
TAKEAWAY 1盒（核心总结）：

中文：点积一式两形：坐标式负责算，几何式负责看角。符号定方向（正锐、零直、负钝），为零即垂直（非零向量前提）。求角三步走：点积除以模长乘积再取反余弦。选题先看结果要数字还是向量：要数字用点积，要新向量用叉积。
Takeaway-Satz: `Koordinatenform rechnen, geometrische Form deuten: Das Skalarprodukt misst Winkel ueber Projektion.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Betragsrechnung mit Wurzeln (Schritt 4) oder die Verfahrenswahl Skalar gegen Vektor (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst beide Formeln des Skalarprodukts hin und markiere, welche Groesse gesucht ist.

`Klausur-Satz: Vektoren sind Anweisungen mit Richtung: Erst Betrag, dann Winkel, dann Urteil.`
