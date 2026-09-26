---
fach: Bio
thema: "DNA-Replikation und Meselson-Stahl"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, erklaeren, auswerten]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Genetik]
version: Lesson-v3
---

# Lernreise: DNA-Replikation und Meselson-Stahl (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清半保留复制的含义——子代双链各保留母链一条，碱基互补配对保证精确。
2. 中文：能画出复制叉上前导链连续、后随链冈崎片段的基本图景。
3. 中文：能用梅塞尔森-斯塔尔实验的氮同位素条带推断复制方式，并写出德语标准结论句（AFB II）。

Klausur-Satz: `Die DNA-Replikation verlaeuft semikonservativ: Jedes Tochtermolekuel behaelt einen elterlichen Strang.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 半保留复制 — Semikonservative Replikation：每条子代 DNA 含一条旧链一条新链。【陷阱：semikonservativ（一半保留）不是 konservativ（整条旧双链保留）也不是 dispersiv（碎片混合）。】
- 复制叉 — Replikationsgabel：解旋酶打开双链的 Y 形前端。【陷阱：Gabel（复制进行的前线）不是 Startpunkt（起点 ori，复制源）。】
- 前导链后随链 — Leitstrang und Folgestrang：前导链 $5' \to 3'$ 连续合成，后随链分段合成。【陷阱：Leitstrang（连续）不是 Folgestrang（冈崎片段，需连接酶缝合）。】
- 冈崎片段 — Okazaki-Fragment：后随链上约 $1000$–$2000$ 碱基的短片段。【陷阱：Fragment（临时短链）不是 Gen（功能单位）。】
- 氮同位素标记 — Stickstoffmarkierung：$^{15}N$ 重氮与 $^{14}N$ 轻氮在氯化铯梯度中分层。【陷阱：$^{15}N$（重，下沉）不是 Radioaktivitaet（本实验用密度而非放射性）。】

Klausur-Satz: `Komplementaere Basenpaarung ($A$-$T$, $G$-$C$) sichert die identische Verdopplung der Erbinformation.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：复制的核心矛盾是"聚合酶只会单向开车"。DNA 聚合酶只能沿 $5' \to 3'$ 方向添加核苷酸，而双链是反向平行的，所以复制叉两条链待遇不同：和叉前进同向的那条（前导链）一路绿灯连续合成；反向的那条（后随链）只能等叉走过去一段再回头补一小段，形成冈崎片段，最后由连接酶缝起来。梅塞尔森和斯塔尔用重氮养细菌再换轻氮，第一代只有一条中间带、第二代一条中间加一条轻带——这正是半保留的指纹：保守复制第一代就该是"一重一轻"两条，全分散则永远只有一条中间带。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Replikationsgabel -->
   5' -----> 3'  Leitstrang (kontinuierlich) ========>
   3' <----- 5'  Folgestrang (Okazaki: <=== <=== <===)
   Helikase oeffnet, Polymerase baut 5'->3', Ligase naeht
   Meselson-Stahl (CsCl-Gradient, unten schwer):
   Gen 0:  [######]  nur schwer (^15N)
   Gen 1:     [######]  nur mittel (hybrid)
   Gen 2:     [######]  mittel + [######] leicht (^14N)
```

Klausur-Satz: `Die Okazaki-Fragmente beweisen die einzige Syntheserichtung der Polymerase von $5'$ nach $3'$.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Meselson und Stahl nannten ihr Experiment von 1958 spaeter "the most beautiful experiment in biology". Sie zuechteten E. coli erst in schwerem Stickstoff und stellten dann auf leichten um — die DNA-Banden in der Zentrifuge wanderten wie von Geisterhand nach oben. Watson und Crick hatten die semikonservative Idee nur vermutet, Meselson und Stahl machten sie sichtbar.

**中文解读**: 这是生物学史上"最美实验"：不用看 DNA，只看离心管里条带上浮，就能断定复制方式。中国学生记住三代条带口诀"重—杂—杂加轻"，考场上先画管子再下结论，绝不凭空猜。

**Bezug zum Konzept**: `Dichtegradienten machen unsichtbare Molekuelgeschichte als sichtbare Bande lesbar.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: replikation]

AUFGABE中文导读：细菌经两代培养后离心出现两条带，判断复制方式并画出条带解释，练习"条带反推机制"。

AUFGABE (auswerten, AFB II)：E. coli wird in $^{15}N$-Medium angezogen und dann in $^{14}N$-Medium ueberfuehrt. Nach zwei Generationen zeigt die CsCl-Zentrifugation zwei Banden (mittel und leicht, je ca. $50\%$). Werten Sie aus, welches Replikationsmodell bestaetigt ist.

HILFE:
1. Schritt 1: Drei Modelle vorhersagen: konservativ erwartet nach Gen 1 schwer + leicht; dispersiv erwartet immer nur mittel; semikonservativ erwartet Gen 1 nur mittel.
2. Schritt 2: Gen-2-Befund pruefen: mittel + leicht je $50\%$ passt nur zu semikonservativ.
3. Schritt 3: Banden mit Strangherkunft erklaeren: mittel = $^{15}N$/$^{14}N$-Hybrid, leicht = $^{14}N$/$^{14}N$.

MUSTERLÖSUNG: Konservativ scheidet aus, weil Generation 1 keine schwere Bande mehr zeigt. Dispersiv scheidet aus, weil Generation 2 eine reine leichte Bande zeigt statt nur mittel. Bestaetigt ist semikonservativ: Generation 1 besteht zu $100\%$ aus Hybrid ($^{15}N$/$^{14}N$), Generation 2 zu $50\%$ Hybrid und $50\%$ leicht ($^{14}N$/$^{14}N$).

Klausur-Satz: `Zwei Banden in Generation 2 bei einer Bande in Generation 1 beweisen die semikonservative Replikation.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：三种复制模型眼）：

VERGLEICH: Waehle erst das Konzept — 【选概念】先看第一代条带：(i) Semikonservativ-Konzept（一代全杂、二代杂加轻）还是 (ii) Konservativ-Konzept（一代就重加轻）还是 (iii) Dispersiv-Konzept（永远只有杂）—— dann zuordnen.

AUFGABE A：Generation 1 zeigt nur eine mittlere Bande, Generation 2 zeigt mittel + leicht. Welches Modell?
AUFGABE B：Generation 1 zeigt bereits eine schwere und eine leichte Bande. Welches Modell?

HILFE: A folgt dem Muster hybrid dann hybrid+leicht -> Konzept (i). B zeigt alte Doppelhelix intakt daneben -> Konzept (ii).【选概念：题干出现 Gen1 nur mittel + Gen2 mittel/leicht 选半保留；出现 Gen1 schwer+leicht 选保守；出现 immer nur mittel 选分散。】

ANTWORT: A erfordert Konzept (i): semikonservativ, jeder Tochterstrang halb alt. B erfordert Konzept (ii): konservativ, elterliche Helix bleibt intakt.

Klausur-Satz: `Nur das Bandenmuster mittel, dann mittel plus leicht, entspricht der Semikonservativ-Hypothese.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Warum ist der Folgestrang fragmentiert? | ANTWORT: Weil die Polymerase nur $5' \to 3'$ synthetisiert und der Folgestrang rueckwaerts aufgefuellt wird.
FRAGE: Was verbindet die Okazaki-Fragmente? | ANTWORT: Die Ligase verknuepft sie zum geschlossenen Strang.
FRAGE: Warum schliesst Generation 2 mit leichter Bande dispersiv aus? | ANTWORT: Weil dispersiv nie reine $^{14}N$-Helices, sondern nur Hybrid-DNA erlaubte.

Klausur-Satz: `Helikase oeffnet, Polymerase baut, Ligase naeht: Die drei Enzyme der Replikation.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"半保留就是每条新链一半旧一半新、拼接而成"。
   中文纠偏：半保留的单位是整条链：子代双螺旋由"一整条旧链 + 一整条新链"组成，不是单链内部拼接。拼接碎片的是后随链合成过程，最终仍形成完整新链。
   Korrektur-Satz: `Semikonservativ bedeutet ein ganzer elterlicher Strang je Tochterhelix, kein Stueckwerk im Einzelstrang.`

2. 误解"后随链因为不重要所以才分段、对付一下"。
   中文纠偏：分段不是敷衍，而是聚合酶单向性的数学必然。方向反了就只能分段回补，连接酶最后会完整缝好，两条子链质量完全等价。
   Korrektur-Satz: `Leit- und Folgestrang liefern gleichwertige Tochterstraenge trotz verschiedener Syntheseweise.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin und erklaerst Meselson-Stahl im Biokurs.
SITUATION: Ein Mitschueler verwechselt konservativ und semikonservativ und kann die Gen-1-Bande nicht deuten.
AUFGABE: Erklaeren Sie in ca. 150 Woertern mit Bandenzeichnung in Worten, warum genau eine mittlere Bande in Generation 1 nur semikonservativ (und dispersiv) erlaubt und wie Generation 2 entscheidet.
RUBRIC (30 XP): Gen-1-Vorhersagen aller Modelle (10 XP) | Gen-2-Entscheidung mittel+leicht (10 XP) | Strangherkunft mit $^{15}N$/$^{14}N$ (10 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：复制记住"一向两链三带"：聚合酶只认 $5' \to 3'$，前导连续后随分段（连接酶缝合）。实验记住"重—杂—杂加轻"：一代全杂、二代杂加轻即半保留。保守一代就分家，分散永远一锅粥。
Takeaway-Satz: `Eine Syntheserichtung erzwingt zwei Strangstrategien; zwei Bandenmuster entlarven ein Modell.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Bandenauswertung (Schritt 4) oder die Modellwahl aus drei Konzepten (Schritt 5)?
2. 元认知计划：Beim naechsten Mal zeichne ich zuerst die drei erwarteten Bandenmuster, bevor ich den Befund lese.
