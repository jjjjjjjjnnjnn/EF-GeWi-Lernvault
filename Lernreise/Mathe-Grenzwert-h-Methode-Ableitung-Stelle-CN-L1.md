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

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用 h-方法求多项式函数在一点的导数值，完整写出差商、化简、令 h 趋于 0 三步。
2. 中文：能说出导数的两种含义——切线斜率与瞬时变化率，并各配一句德语论证句。
3. 中文：能判断何时必须用 h-方法、何时可以直接用求导法则（选程序：定义求导 vs 法则求导）。

Voraussetzung（窄切口）：只需会多项式展开与约分，本节只做一个点 $x_0$ 的导数，不讨论全区间导函数。


Hook中文生活切入:

想象给气球打气时估算某瞬间的膨胀速度:前后一秒的气量差除以时间能得个平均数,可时间隔越短这个平均数就越接近那一刹那的真速度,把间隔压到无穷小,平均就变成了瞬时。h方法做的正是这件事:用割线斜率一步步逼近切线斜率,极限就是导数。

Phaenomen-Satz (DE): Der Schnitt wird immer kuerzer, bis er den Augenblick trifft.

中文机制铺垫:写出差商并代入函数表达式,化简约去h再令h趋于零,极限值即该点导数;几何意义是割线转切线,物理意义是平均速度转瞬时速度,三类题鼻祖都是先化简后取极限,切忌未化简就代入。

Mechanismus-Satz (DE): Der Differenzenquotient misst den Schnitt, sein Grenzwert die Tangente im Punkt.

Klausur-Satz: `Die Ableitung an der Stelle x_0 ist der Grenzwert des Differenzenquotienten fuer h gegen 0.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 差商 — Differenzenquotient：$m(h) = \frac{f(x_0+h)-f(x_0)}{h}$，割线斜率。
- h-方法 — h-Methode：先约去分母中的 $h$，再令 $h \to 0$。
- 导数在一点 — Ableitung an einer Stelle：记作 $f'(x_0)$，是差商的极限。
- 切线斜率 — Tangentensteigung：$f'(x_0)$ 即图像在该点的切线斜率。
- 瞬时变化率 — momentane Aenderungsrate：导数的应用含义，如瞬时速度。

Klausur-Satz: `Der Differenzenquotient beschreibt die Sekantensteigung; sein Grenzwert fuer h gegen 0 ergibt die Tangentensteigung f'(x_0).`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

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
Klausur-Satz: `Nach Kuerzen von h geht der Differenzenquotient fuer h gegen 0 in die Ableitung f'(x_0) ueber.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Newton und Leibniz stritten im 17. Jahrhundert um die Erfindung der Ableitung. Newton nannte sie Fluxion und dachte an fliessende Groessen, Leibniz schrieb $dy/dx$ und dachte an unendlich kleine Differenzen. Die h-Methode folgt der Idee von Leibniz: Man laesst eine kleine Differenz $h$ gegen null gehen.

**中文解读**: 牛顿从运动想导数，莱布尼茨从差商想导数，h-方法走的是莱布尼茨路线。记住 $h \to 0$ 不是"等于 0"，而是"无限接近"，这是极限思想第一次落地。

**Bezug zum Konzept**: `Die h-Methode macht die Leibniz-Idee rechenbar: erst kuerzen, dann den Grenzuebergang h gegen 0 vollziehen.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

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
Klausur-Satz: `Mit der h-Methode folgt m(h) = 5 + h und damit f'(2) = 5 als Tangentensteigung im Punkt (2|6).`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：定义求导 vs 法则求导）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看题干动词：(i) 定义求导（题目写 mit der h-Methode / ueber den Grenzwert，必须展开约分取极限）oder (ii) 法则求导（题目只写 bestimmen Sie f'，可直接用 Potenzregel）—— dann loesen.

AUFGABE A：Bestimmen Sie mit der h-Methode $f'(1)$ fuer $f(x) = 3x^2$.
AUFGABE B：Bestimmen Sie $f'(1)$ fuer $f(x) = 3x^2$.

HILFE: A enthaelt die Aufforderung mit der h-Methode → Verfahren (i)，必须写差商全过程。B 无此限定 → Verfahren (ii)，可直接 $f'(x) = 6x$。【选程序：见 h-方法写差商；不见直接求导。】

ANTWORT: A erfordert Verfahren (i): $m(h) = \frac{3(1+h)^2-3}{h} = \frac{6h+3h^2}{h} = 6+3h \to 6$, also $f'(1) = 6$. B erfordert Verfahren (ii): Mit der Potenzregel gilt $f'(x) = 6x$, also $f'(1) = 6$. Beide Wege liefern $6$, doch nur Verfahren (i) zeigt den Grenzprozess und erhaelt dort die volle Punktzahl.

Klausur-Satz: `Wird die h-Methode verlangt, muss der Grenzprozess ausgeschrieben werden; sonst genuegt die Ableitungsregel.`

## Schritt 6 — check: Verständnisprüfung

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet der Differenzenquotient an der Stelle $x_0$? | ANTWORT: $m(h) = \frac{f(x_0+h)-f(x_0)}{h}$.
FRAGE: Warum darf man $h = 0$ nicht direkt einsetzen? | ANTWORT: Weil dann $0/0$ entsteht; zuerst muss $h$ gekuerzt werden, erst danach folgt $h \to 0$.
FRAGE: Was bedeutet $f'(x_0) = 5$ geometrisch und als Rate? | ANTWORT: Die Tangente hat dort die Steigung $5$; die Funktion waechst momentan mit der Rate $5$.

Klausur-Satz: `Die Ableitung f'(x_0) ist der Grenzwert des Differenzenquotienten fuer h gegen 0.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"h-方法就是把 h=0 代进去"。
   中文纠偏：直接代入得到 $0/0$ 无意义。必须先展开分子、约去分母的 $h$，把差商化成不含分母 $h$ 的式子，再取极限。
   Korrektur-Satz: `Vor dem Grenzuebergang h gegen 0 muss h im Differenzenquotienten gekuerzt werden.`

2. 误解"导数是割线斜率"。
   中文纠偏：差商才是割线斜率，导数是割线在 $h \to 0$ 时的极限，即切线斜率。答题写几何解释时必须写 Tangente，不能写 Sekante。
   Korrektur-Satz: `Der Differenzenquotient gibt die Sekantensteigung, seine Grenze die Tangentensteigung an.`

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist Tutor und erklaerst einer Lerngruppe die h-Methode.
SITUATION: Die Gruppe kann die Potenzregel, versteht aber nicht, woher die Ableitung kommt, und verwechselt Sekante mit Tangente. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) am Beispiel $f(x) = x^2$ an einer Stelle, wie man vom Differenzenquotienten ueber Kuerzen zum Grenzwert gelangt und was das Ergebnis geometrisch bedeutet.
RUBRIC (30 XP): Korrekter Dreischritt Aufstellen-Kuerzen-Grenzuebergang (12 XP) | Rechnung am Beispiel mit Ergebnis (8 XP) | Deutung als Tangentensteigung und Abgrenzung zur Sekante (6 XP) | Fachsprachlich korrekte Darstellung (4 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：h-方法三步——列差商、约 h、令 h 趋于 0。几何看是割线变切线，应用看是平均变瞬时。考试先看动词：出现 mit der h-Methode 就必须写全过程，否则直接用法则更快。记住一句话——先约分、后代入，极限才是导数。
Takeaway-Satz: `Die Ableitung an einer Stelle entsteht aus dem Differenzenquotienten durch Kuerzen und den Grenzuebergang h gegen 0.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Ausmultiplizieren und Kuerzen (Schritt 4) oder die Wahl zwischen Definition und Regel (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst den Differenzenquotienten hin, bevor ich umforme.
