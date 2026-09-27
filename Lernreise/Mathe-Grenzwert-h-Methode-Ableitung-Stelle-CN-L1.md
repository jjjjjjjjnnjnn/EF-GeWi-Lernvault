---
fach: Mathe
thema: "Grenzwert mit h-Methode und Ableitung an einer Stelle"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, deuten, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: Grenzwert mit h-Methode und Ableitung an einer Stelle (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 13/33 | Krise: Satelliten-Bahn Versatz 340 m | Zielgroessen: f(x) = x^2, Stelle x0 = 3, h-Methode mit Ziel 6 | Tool: tangent-slider -->

## Schritt 1 — entdecken: h schrumpft
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用 h-方法求多项式函数在一点的导数值，完整写出差商、化简、令 h 趋于 0 三步。
2. 中文：能说出导数的两种含义——切线斜率与瞬时变化率，并各配一句德语论证句。
3. 中文：能判断何时必须用 h-方法、何时可以直接用求导法则（选程序：定义求导 vs 法则求导）。

Voraussetzung（窄切口）：只需会多项式展开与约分，本节只做一个点 $x_0$ 的导数，不讨论全区间导函数。

### Hook / Phaenomen

割线一点点滑向切线，h一点点压向0：平均变化率取极限，就变成了瞬时变化率，关键一步是先约分再取极限。

Hook / Phaenomen: Die Sekante rutscht an die Kurve heran, h schrumpft gegen null: Was uebrig bleibt, ist die exakte **Tangentensteigung**. Der **Differenzenquotient** misst noch den Durchschnitt, der **Differentialquotient** misst den Moment. Dazwischen liegt ein einziger Rechenschritt: **Kuerzen vor Grenzwert**.

`Klausur-Satz: Die h-Methode verwandelt mittlere in lokale Aenderung: Differenzenquotient kuerzen, dann h gegen null schicken.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 差商 — Differenzenquotient：$m(h) = \frac{f(x_0+h)-f(x_0)}{h}$，割线斜率。 Er misst die mittlere Aenderungsrate ueber ein Intervall der Breite h. Mechanismus: Funktionswerte an x0 plus h und x0 bilden und durch h teilen. Klausur-Tipp: Bruch vollständig hinschreiben, nie vorzeitig kuerzen.
- h-方法 — h-Methode：先约去分母中的 $h$，再令 $h \to 0$。 Sie ist das Standardverfahren, wenn der Operator nachweisen oder zeigen verlangt. Mechanismus: Differenzenquotient aufstellen, kuerzen und h gegen null schicken. Klausur-Tipp: Drei Schritte als getrennte Zeilen zeigen.
- 导数在一点 — Ableitung an einer Stelle：记作 $f'(x_0)$，是差商的极限。 Er ist der Grenzwert des Differenzenquotienten und misst die lokale Rate. Mechanismus: Grenzuebergang h gegen null nach dem Kuerzen vollziehen. Klausur-Tipp: Limeszeichen bis zum letzten Schritt mitschleppen.
- 切线斜率 — Tangentensteigung：$f'(x_0)$ 即图像在该点的切线斜率。 Ohne Kuerzen stuende null durch null da, der Grenzwert bliebe unlesbar. Mechanismus: h ausklammern und vor dem Grenzuebergang wegkuerzen. Klausur-Tipp: Kuerzungsschritt farbig oder mit Pfeil markieren.
- 瞬时变化率 — momentane Aenderungsrate：导数的应用含义，如瞬时速度。 Sie ist das Endergebnis der h-Methode und gleichzeitig f Strich an der Stelle. Mechanismus: Grenzwert als Steigung der Tangente deuten. Klausur-Tipp: Zahl plus Deutung als vollstaendige Antwort geben.

`Klausur-Satz: Der Differenzenquotient beschreibt die Sekantensteigung; sein Grenzwert fuer h gegen 0 ergibt die Tangentensteigung f'(x_0).`

## Schritt 3 — entdecken: Wirkungskette hinter Grenzwert mit h-Methode und Ableitung an einer Stelle
ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象手机看照片双指放大：放得越大越看清那一点的纹理。h方法就是对函数做双指放大，看割线如何逼近切线。

Phaenomen-Satz (DE): Je kleiner h, desto naeher liegt die Sekante an der Tangente.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块 h 从 1 缩到 0.001（关键词：Sekante, Tangente, Differenzenquotient, Grenzwert），盯着割线斜率 m(h) 如何逼近一个固定数。

Beobachtungs-Satz (DE): Nach Kuerzen von h strebt m(h) gegen eine feste Zahl.

Aha-Moment因果链：

中文因果链：割线斜率是平均变化率，h越小区间越窄；约掉h后再让h趋于0，剩下的就是该点切线斜率即导数；题目点名h方法就必须写出极限过程，直接套公式零分。

Gesetz-Satz (DE): Die Ableitung ist der Grenzwert des Differenzenquotienten.

$f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}$

$m(h) = 5 + h \Rightarrow f'(2) = 5$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Sekante durch (2|6) und (2+h|f): m(h) = 5+h
h=1 -> m=6 | h=0.1 -> m=5.1 | h->0 -> m=5
Punkt (2|6): Tangente mit Steigung 5
```

$$f'(x_0) = \lim_{h\to 0}\frac{f(x_0+h)-f(x_0)}{h}$$
`Klausur-Satz: Nach Kuerzen von h geht der Differenzenquotient fuer h gegen 0 in die Ableitung f'(x_0) ueber.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Newton und Leibniz stritten im 17. Jahrhundert um die Erfindung der Ableitung. Newton nannte sie Fluxion und dachte an fliessende Groessen, Leibniz schrieb $dy/dx$ und dachte an unendlich kleine Differenzen. Die h-Methode folgt der Idee von Leibniz: Man laesst eine kleine Differenz $h$ gegen null gehen.

**中文解读**: 牛顿从运动想导数，莱布尼茨从差商想导数，h-方法走的是莱布尼茨路线。记住 $h \to 0$ 不是"等于 0"，而是"无限接近"，这是极限思想第一次落地。

**Bezug zum Konzept**: `Die h-Methode macht die Leibniz-Idee rechenbar: erst kuerzen, dann den Grenzuebergang h gegen 0 vollziehen.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag h schrumpft
Kontinuitaet: Vorher Mathe-Ganzrationale-Funktionen-Sachkontext-L1.md | Nachher Mathe-Grenzwert-h-Methode-Ableitung-Stelle-DE-L1.md. Krise dieser Episode: Satelliten-Bahn Versatz 340 m. Zielgroessen: f(x) = x^2, Stelle x0 = 3, h-Methode mit Ziel 6

[Werkzeug: tangent-slider]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：函数在x为2处值为6，差商化简得m(h)等于5加h。请用h方法求该点导数并写出切线斜率。

AUFGABE (anwenden, AFB II): Fuer $f$ mit $f(2) = 6$ liefert die $h$-Methode $m(h) = 5 + h$. Bestimmen Sie $f'(2)$ als Grenzwert und nennen Sie die Tangentensteigung in $(2|6)$.

HILFE（中德双语步骤）：

1. 中文：第1步写出差商并约掉h，关键词：kuerzen。
   Schritt 1 (DE): Schreiben Sie $m(h) = 5 + h$ nach Kuerzen hin.
2. 中文：第2步令h趋于0取极限得5，关键词：Grenzwert。
   Schritt 2 (DE): $\lim_{h \to 0} m(h) = 5$.
3. 中文：第3步点出切线斜率为5并落点，关键词：Tangente。
   Schritt 3 (DE): $f'(2) = 5$ als Steigung in $(2|6)$.

MUSTERLOESUNG：中文：差商已化简为5加h，h趋于0时极限为5，故该点导数为5，切线在点(2|6)处斜率为5，极限过程必须写全。

MUSTERLOESUNG (DE): Mit $m(h) = 5 + h$ folgt $f'(2) = \lim_{h \to 0}(5+h) = 5$; die Tangente in $(2|6)$ hat Steigung $5$.
`Klausur-Satz: Mit der h-Methode folgt m(h) = 5 + h und damit f'(2) = 5 als Tangentensteigung im Punkt (2|6).`

## Schritt 5 — ausprobieren: Duell der Verfahren h schrumpft
VERGLEICH辨别实验（双向辨析：定义求导 vs 法则求导）：

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle erst das Verfahren — 【选程序】先看题干动词：(i) 定义求导（题目写 mit der h-Methode / ueber den Grenzwert，必须展开约分取极限）oder (ii) 法则求导（题目只写 bestimmen Sie f'，可直接用 Potenzregel）—— dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Bestimmen Sie mit der h-Methode $f'(1)$ fuer $f(x) = 3x^2$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Bestimmen Sie $f'(1)$ fuer $f(x) = 3x^2$.

HILFE: A enthaelt die Aufforderung mit der h-Methode → Verfahren (i)，必须写差商全过程。B 无此限定 → Verfahren (ii)，可直接 $f'(x) = 6x$。【选程序：见 h-方法写差商；不见直接求导。】

ANTWORT: A erfordert Verfahren (i): $m(h) = \frac{3(1+h)^2-3}{h} = \frac{6h+3h^2}{h} = 6+3h \to 6$, also $f'(1) = 6$. B erfordert Verfahren (ii): Mit der Potenzregel gilt $f'(x) = 6x$, also $f'(1) = 6$. Beide Wege liefern $6$, doch nur Verfahren (i) zeigt den Grenzprozess und erhaelt dort die volle Punktzahl.

`Klausur-Satz: Wird die h-Methode verlangt, muss der Grenzprozess ausgeschrieben werden; sonst genuegt die Ableitungsregel.`

## Schritt 6 — check: Selbsttest zu Grenzwert mit h-Methode und Ableitung an einer Stelle: h schrumpft
CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Wie lautet der Differenzenquotient an der Stelle $x_0$? | ANTWORT: $m(h) = \frac{f(x_0+h)-f(x_0)}{h}$.
- FRAGE: Warum darf man $h = 0$ nicht direkt einsetzen? | ANTWORT: Weil dann $0/0$ entsteht; zuerst muss $h$ gekuerzt werden, erst danach folgt $h \to 0$.
- FRAGE: Was bedeutet $f'(x_0) = 5$ geometrisch und als Rate? | ANTWORT: Die Tangente hat dort die Steigung $5$; die Funktion waechst momentan mit der Rate $5$.

`Klausur-Satz: Die Ableitung f'(x_0) ist der Grenzwert des Differenzenquotienten fuer h gegen 0.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"h-方法就是把 h=0 代进去"。
   中文纠偏：直接代入得到 $0/0$ 无意义。必须先展开分子、约去分母的 $h$，把差商化成不含分母 $h$ 的式子，再取极限。
   Korrektur-Satz: `Vor dem Grenzuebergang h gegen 0 muss h im Differenzenquotienten gekuerzt werden.`

2. 误解"导数是割线斜率"。
   中文纠偏：差商才是割线斜率，导数是割线在 $h \to 0$ 时的极限，即切线斜率。答题写几何解释时必须写 Tangente，不能写 Sekante。
   Korrektur-Satz: `Der Differenzenquotient gibt die Sekantensteigung, seine Grenze die Tangentensteigung an.`

## Schritt 7 — szenario: Klausurtransfer: Grenzwert mit h-Methode und Ableitung an einer Stelle: h schrumpft
ROLLE: Du bist Tutor und erklaerst einer Lerngruppe die h-Methode.
SITUATION: Die Gruppe kann die Potenzregel, versteht aber nicht, woher die Ableitung kommt, und verwechselt Sekante mit Tangente. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) am Beispiel $f(x) = x^2$ an einer Stelle, wie man vom Differenzenquotienten ueber Kuerzen zum Grenzwert gelangt und was das Ergebnis geometrisch bedeutet.
RUBRIC (30 XP): Korrekter Dreischritt Aufstellen-Kuerzen-Grenzuebergang (12 XP) | Rechnung am Beispiel mit Ergebnis (8 XP) | Deutung als Tangentensteigung und Abgrenzung zur Sekante (6 XP) | Fachsprachlich korrekte Darstellung (4 XP).

`Klausur-Satz: Wer Differenzenquotient aufstellt, kuerzt, Grenzuebergang vollzieht und als Tangentensteigung deutet, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: h schrumpft
TAKEAWAY 1盒（核心总结）：

中文：h-方法三步——列差商、约 h、令 h 趋于 0。几何看是割线变切线，应用看是平均变瞬时。考试先看动词：出现 mit der h-Methode 就必须写全过程，否则直接用法则更快。记住一句话——先约分、后代入，极限才是导数。
Takeaway-Satz: `Die Ableitung an einer Stelle entsteht aus dem Differenzenquotienten durch Kuerzen und den Grenzuebergang h gegen 0.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Ausmultiplizieren und Kuerzen (Schritt 4) oder die Wahl zwischen Definition und Regel (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst den Differenzenquotienten hin, bevor ich umforme.

`Klausur-Satz: Ableiten ist Grenzwertbildung: Erst algebraisch kuerzen, dann erst null einsetzen.`
