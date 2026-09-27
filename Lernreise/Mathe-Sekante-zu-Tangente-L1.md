---
fach: Mathe
thema: "Von der Sekante zur Tangente"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Von der Sekante zur Tangente (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清割线斜率（平均变化率）与切线斜率（瞬时变化率）的几何区别——一个是跨区间的两点连线，一个是停在一点上的极限位置。
2. 中文：能写出差商 `m = (f(x0 + h) - f(x0)) / h`，并在图上指出 h 逼近 0 时割线绕定点旋转、最终定型为切线的全过程。
3. 中文：能用差商加极限手算一个具体函数在某点的导数值，并写出德语标准结论句（AFB II）。

Klausur-Satz: `Die Ableitung an einer Stelle x0 ist der Grenzwert des Differenzenquotienten fuer h gegen 0 und beschreibt die Steigung der Tangente an dieser Stelle.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 平均变化率（割线斜率） — Mittlere Aenderungsrate (Sekantensteigung)：区间两端函数值之差比自变量之差，即差商。
- 瞬时变化率（切线斜率） — Lokale Aenderungsrate (Tangentensteigung)：某一点处的极限斜率，即导数值 f'(x0)。
- 割线 — Sekante：穿过函数图像上两个不同点的直线。
- 切线 — Tangente：在一点处与图像相贴、斜率恰为该点导数的直线。
- 差商 — Differenzenquotient：`(f(x0 + h) - f(x0)) / h`，即区间 [x0; x0 + h] 上割线的斜率。

Klausur-Satz: `Der Differenzenquotient liefert die Sekantensteigung ueber ein Intervall, der Differentialquotient die Tangentensteigung an einer Stelle.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：导数的思想并不神秘——它只是把两个点越靠越近。固定一点 P(x0 | f(x0))，让第二个点 Q 沿曲线滑向 P，连接两点的割线会绕着 P 旋转；当自变量间距 h 趋向于 0 时，割线在极限位置定型成切线，切线的斜率就是 f'(x0)。因此：割线算的是"一段路平均走多快"，切线算的是"某一刻表盘指多少"。差商是两者之间的桥——先写出差商，再让 h 趋于 0，即得导数。考场关键动作只有两步：写差商、取极限。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
        y ^
          |                      Q(x0+h | f(x0+h))
          |                    .´ |
          |                  .´   |  f(x0+h) - f(x0)
          |                .´     |
          |              .´       |
          |            .´ Sekante |
          |          .´     \     |
          |        .´        \    |   h -> 0
          |      .´           \   |   =====>  Tangente
          |  P(x0 | f(x0)) ----+----------------- Tangente an P
          |                     h
          +----------------------------------------> x
                  x0           x0+h
     Steigung der Sekante = (f(x0+h) - f(x0)) / h
```

Klausur-Satz: `Laesst man h gegen 0 streben, so geht die Sekante durch P und Q in die Tangente im Punkt P ueber.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Das Wort Tangente kommt vom lateinischen tangere, "beruehren", und Sekante von secare, "schneiden". Eine Sekante schneidet den Graphen in zwei Punkten, eine Tangente beruehrt ihn in einem einzigen. Die Frage, wie man an eine Kurve eine Tangente legt, beschaeftigte Mathematiker schon lange vor der Erfindung der Ableitung — und aus genau diesem Problem entstand die Differentialrechnung.

**中文解读**: 两个术语的字面意思就概括了本课的核心区别——"割"(secare) 是两点相穿，"触"(tangere) 是一点相贴。而"如何作一条切线"这个古老的问题，最终催生了导数：让割线的两点无限靠近，切线就是它的极限位置。

**Bezug zum Konzept**: `Der Grenzuebergang von der schneidenden Sekante zur beruehrenden Tangente liefert die Ableitung.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II)：Gegeben ist f(x) = x^2. Bestimmen Sie mit dem Differenzenquotienten die Ableitung an der Stelle x0 = 3 und vergleichen Sie das Ergebnis mit der Sekantensteigung im Intervall [3; 5].

HILFE:
1. Schritt 1: Differenzenquotient ansetzen: m_sek = (f(3 + h) - f(3)) / h.
2. Schritt 2: Zaehler ausmultiplizieren und h ausklammern, damit sich h kuerzen laesst.
3. Schritt 3: Nach dem Kuerzen h gegen 0 laufen lassen; danach zum Vergleich (f(5) - f(3)) / (5 - 3) berechnen.

MUSTERLÖSUNG: Es gilt f(3 + h) = (3 + h)^2 = 9 + 6h + h^2, also f(3 + h) - f(3) = 9 + 6h + h^2 - 9 = 6h + h^2 = h(6 + h). Der Differenzenquotient lautet daher h(6 + h) / h = 6 + h (fuer h ungleich 0). Der Grenzuebergang h gegen 0 liefert f'(3) = 6. Zum Vergleich: Die Sekantensteigung ueber [3; 5] betraegt (25 - 9) / (5 - 3) = 16 / 2 = 8. Die mittlere Aenderungsrate 8 ist groesser als die lokale Aenderungsrate 6, weil die Parabel rechts von x0 = 3 im Durchschnitt steiler ansteigt.

Klausur-Satz: `Der Grenzwert des Differenzenquotienten ergibt f'(3) = 6, waehrend die Sekantensteigung ueber [3; 5] den groesseren Wert 8 besitzt.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：割线眼 vs. 切线眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目给的是 (i) Sekanten-Verfahren（一个区间、两点、平均变化率、Differenzenquotient）还是 (ii) Tangenten-Verfahren（一个 Stelle/Zeitpunkt、Momentanwert、Ableitung）—— dann rechnen.

AUFGABE A：Ein Fahrzeug legt in 4 Stunden insgesamt 240 km zurueck. Gefragt ist die Durchschnittsgeschwindigkeit der gesamten Fahrt.
AUFGABE B：Ein Blitzer misst die Geschwindigkeit des Fahrzeugs genau in dem Moment, in dem es die Messstelle passiert.

HILFE: A nennt ein Zeitintervall und zwei Endwerte -> Verfahren (i), Sekante. B nennt einen einzelnen Zeitpunkt -> Verfahren (ii), Tangente/Ableitung.【选程序：题干出现 Zeitraum / Intervall / durchschnittlich 选割线；出现 Moment / genau bei / Stelle 选切线。】

ANTWORT: A erfordert Verfahren (i): v_mittel = 240 km / 4 h = 60 km/h; dies ist die mittlere Aenderungsrate, also die Sekantensteigung der Weg-Zeit-Funktion. B erfordert Verfahren (ii): Der Blitzer erfasst die Momentangeschwindigkeit v(t0) = s'(t0), also die Tangentensteigung an der Stelle t0.

Klausur-Satz: `Durchschnittsgeschwindigkeiten entsprechen Sekantensteigungen, Momentangeschwindigkeiten entsprechen Tangentensteigungen.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet der Differenzenquotient einer Funktion f im Intervall [x0; x0 + h]? | ANTWORT: m = (f(x0 + h) - f(x0)) / h, also die Steigung der Sekante durch die beiden Punkte.
FRAGE: Was geschieht geometrisch mit der Sekante, wenn h gegen 0 geht? | ANTWORT: Sie dreht sich um den festen Punkt P(x0 | f(x0)) und geht im Grenzfall in die Tangente ueber.
FRAGE: Warum darf man h nicht schon vor dem Kuerzen gleich 0 setzen? | ANTWORT: Weil sonst der unbestimmte Ausdruck 0/0 entstuende; erst nach dem Kuerzen ist der Grenzwert ablesbar.

Klausur-Satz: `Der Differentialquotient f'(x0) ist der Grenzwert des Differenzenquotienten fuer h gegen 0.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"割线斜率和切线斜率只是画法不同，数值必然一样"。
   中文纠偏：完全不是。割线跨一段区间取平均，切线只在一个点上取瞬时值。只要图像在这段区间里是弯曲的，两者就不同——同一段上凸处割线偏大，下凹处割线偏小。
   Korrektur-Satz: `Die Sekantensteigung ueber ein Intervall darf nicht mit der lokalen Steigung an einem seiner Raender gleichgesetzt werden.`

2. 误解"h 趋近于 0 就是让分母等于 0，所以这一步不合法"。
   中文纠偏：极限过程不是代入。h 只是无限逼近 0，我们先把分子中公共的 h 约掉，得到一个在 h = 0 处有定义的表达式，再令 h 趋于 0，因此并不违反任何运算规则。
   Korrektur-Satz: `Beim Grenzuebergang wird der Differenzenquotient zuerst algebraisch gekuerzt, bevor h gegen 0 betrachtet wird.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in der EF und bereitest eine Mitschuelerin auf die ZKE vor.
SITUATION: Deine Mitschuelerin hat mit dem GTR fuer f(x) = x^3 im Intervall [-1; 1] eine Durchschnittssteigung von 1 erhalten, ist aber verwirrt, weil die Tangente an der Stelle x = 0 waagerecht verlaeuft. Erklaere ihr in einer zusammenhaengenden Darstellung (ca. 150 Woerter) den Unterschied zwischen Sekante und Tangente und ordne beide Ergebnisse ein.
RUBRIC (30 XP): Klare These zum Unterschied Sekante/Tangente (5 XP) | Korrekte Sekantenrechnung (f(1) - f(-1)) / 2 = 1 (10 XP) | Begruendung der Tangentensteigung f'(0) = 0 (10 XP) | Abschlussfazit mit Fachbegriffen (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：割线管区间、算平均；切线管一点、算瞬时。两者的桥就是差商加极限——先写 `(f(x0 + h) - f(x0)) / h`，约掉 h，再让 h 趋于 0，得到 f'(x0)。做题先看题干问的是"时间段/区间"还是"时刻/某点"：问区间选割线，问时刻选导数。记住一句话：平均是两点的连线，瞬时是一点的极限。
Takeaway-Satz: `Sekanten mitteln ueber Intervalle, Tangenten erfassen den Moment; die Ableitung ist der Grenzwert der Sekantensteigung fuer h gegen 0.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die algebraische Umformung des Differenzenquotienten (Schritt 4) oder die Entscheidung zwischen Sekante und Tangente (Schritt 5)?
2. 元认知计划：Beim naechsten Mal pruefe ich zuerst, ob im Aufgabentext ein Intervall oder ein einzelner Zeitpunkt genannt wird, und waehle danach das Verfahren.
