---
fach: Mathe
thema: "Integralrechnung als Flaecheninhaltsrechnung"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, darstellen, interpretieren]
klausurrelevant: true
datum: 2026-10-10
tags: [EF, Mathe, Analysis]
version: Enterprise-v5
---

# Lernreise: Integralrechnung als Flaecheninhaltsrechnung (L1, Ziel: Klausur)

> Didaktischer Archetyp D
> Werkzeug ID: [Werkzeug: tangent-slider]

## Schritt 1 — entdecken

本步为预测环节，先预测再验证，与 Sekante 范例的 POE 节奏一致，只是主题换成积分面积。

情境是鱼塘不规则岸线面积核算。承包人先用一个大矩形粗估鱼塘面积，误差很大。接着他把岸线方向等分成 4 个小矩形分别求和，发现贴合度变好。问题是：如果继续细分到 8 块、32 块乃至无穷多块，近似值会越来越准，还是分块越多越乱？

比喻：细分求和如用越来越细的砖块铺满不规则鱼塘，缝隙越来越小。

预测 [Option A]：分块越多误差越大。若选A，你在Step 2用滑块检验误差随分块数变化的方向。

预测 [Option B]：分块无穷细分逼近真值。若选B，你在Step 2用滑块检验近似值随分块数变化的方向。

AUFLÖSUNG (nach der Wahl lesen)

以下解析在选择后阅读，含原两项机制分析全文：
- Mechanismus A：每一块矩形都有高估或低估，块数越多，误差项个数越多，累积误差因此变大，细分没有意义。
- Mechanismus B：每块宽度随分块数增大而趋于零，高估与低估的缝隙被压扁，求和的极限挤掉全部缝隙，近似值收敛于不规则区域的真实面积。

本质一句话：黎曼和在分块数趋于无穷时的极限即定积分，它把不可直接计算的曲边面积转化为可计算的和式极限。

Klausur-Satz (Deutsch unten): Die Feinheit der Zerlegung entscheidet ueber die Genauigkeit, denn der Grenzwert der Riemann-Summe fuer $n$ -> unendlich ist das bestimmte Integral und damit der exakte Flaecheninhalt.

## Schritt 2 — ausprobieren

本步为动手观察环节，用滑块实验验证 Schritt 1 的预测。

[Werkzeug: tangent-slider] 把参数设为分块数 $n$，依次拖动 $n=4$ -> $n=8$ -> $n=32$。在同一函数图像下观察上和 $O_{n}$ 与下和 $U_{n}$ 的变化：$n$ 越大，矩形越窄，上和从上方下降，下和从下方上升，两者差值不断缩小并夹住同一个中间值，该收敛过程即定积分的形成过程。

AUFGABE (berechnen, AFB II)：设 $f(x)=x^2$，在区间 $[0;2]$ 上计算 $O_{4}$ 和 $U_{4}$，并用 $O_{4}$ 与 $U_{4}$ 的大小关系说明定积分的夹逼位置。全部计算过程保留分数或小数两步推导。

HILFE：从分割维度切入，用等分区间法确定块宽与分点类型；从单调性维度切入，用端点比较法判定上下和归属；从夹逼维度切入，用区间套方法定位积分值。不给出具体分点、函数值、和值与归属结论。

COMPLETION (Lückentext):
- 中文说明：根据MUSTERLÖSUNG补全两个关键数值，不回看上文。
- Ergaenze: $U_{4}=___$ und $O_{4}=___$, und es gilt $U_{4} < \int_{0}^{2} x^2 \, dx < O_{4}$.

MUSTERLÖSUNG：块宽为 $\Delta x=0.5$。下和取左端点：$U_{4}=\Delta x \cdot (f(x_{0})+f(x_{1})+f(x_{2})+f(x_{3}))=0.5 \cdot (0+0.25+1+2.25)=0.5 \cdot 3.5=1.75$。上和取右端点：$O_{4}=\Delta x \cdot (f(x_{1})+f(x_{2})+f(x_{3})+f(x_{4}))=0.5 \cdot (0.25+1+2.25+4)=0.5 \cdot 7.5=3.75$。精确值为 $\int_{0}^{2} x^2 \, dx=\left[\frac{1}{3}x^3\right]_{0}^{2}=\frac{8}{3} \approx 2.67$，满足 $U_{4} < \int_{0}^{2} x^2 \, dx < O_{4}$，即 $1.75 < 2.67 < 3.75$。当 $n=8$ -> $n=32$ 时，差 $O_{n}-U_{n}$ 持续缩小，验证了预测 B。

Klausur-Satz (Deutsch unten): Bei monoton wachsendem $f$ auf $[0;2]$ gilt $U_{4}=1.75 < \int_{0}^{2} x^2 \, dx < O_{4}=3.75$, und mit $n$ -> unendlich schliessen sich Ober- und Untersumme zum exakten Integralwert.

## Schritt 3 — entdecken

本步为概念建构环节，把实验现象提炼为可表述的定义链条。

```diagram
Zerlegung -> Riemann-Summe -> Grenzwert n->unendlich -> bestimmtes Integral
```

以上链条只用 -> 连接，表示从分割到求和再到取极限最后得到定积分的单向建构顺序。

KLP 概念一：Obersumme / Untersumme。中文理解在上：把区间等分成 $n$ 块后，每块上取最大函数值求和得到上和，取最小函数值求和得到下和，两者夹住真实曲边面积。Deutsch unten: Die Obersumme verwendet pro Teilintervall das Maximum, die Untersumme das Minimum, sodass die wahre Flaeche stets zwischen beiden Summen liegt.

KLP 概念二：Riemann-Summe。中文理解在上：在每块中任取一个代表点，函数值乘以块宽再全部相加，上和与下和都是它的特例，它是定积分之前的一般求和形式。Deutsch unten: Die Riemann-Summe ist die allgemeine Summe aus Funktionswert mal Teilbreite ueber eine Zerlegung, Ober- und Untersumme sind ihre Spezialfaelle.

KLP 概念三：bestimmtes Integral。中文理解在上：当分块数趋于无穷且最大块宽趋于零时黎曼和的极限，记为从下限到上限的积分，它的值即曲边梯形的代数面积。Deutsch unten: Das bestimmte Integral ist der Grenzwert der Riemann-Summe fuer $n$ -> unendlich und gibt den orientierten Flaecheninhalt unter dem Graphen an.

Hauptsatz 雏形一句话：中文理解在上：若已知原函数，则定积分的值等于原函数在上限的值减去在下限的值，无需再做无穷求和。Deutsch unten: Kennt man eine Stammfunktion, so ist das bestimmte Integral die Differenz der Stammfunktionswerte an Ober- und Untergrenze.

Klausur-Satz (Deutsch unten): Das bestimmte Integral ist der Grenzwert der Riemann-Summe fuer $n$ -> unendlich und wird ueber Zerlegung -> Riemann-Summe -> Grenzwert dargestellt.

## Schritt 4 — check

本步为纠错自检环节，先看典型计算陷阱，再做一问一答。

Rechenfalle 中文梳理在上：第一，忘记写 $dx$ 或把 $dx$ 写成普通乘号，导致被扣分，因为定积分必须标明积分变量。第二，把上下限倒置后仍按原顺序代入原函数，正确做法是倒置上下限会整体变号。第三，把面积与积分值混同，当函数在 $x$ 轴下方时积分值为负，而几何面积恒为非负，求面积必须分段取绝对值或先判断符号。

FRAGE | ANTWORT：中文问题在上，德语回答在下。问题：若把 $\int_{0}^{2} x^2 \, dx$ 的上下限写成 $\int_{2}^{0} x^2 \, dx$，结果如何变化？若函数全程在 $x$ 轴下方，积分值与几何面积关系如何？ANTWORT (Deutsch unten): Bei vertauschten Grenzen gilt $\int_{2}^{0} x^2 \, dx=-\int_{0}^{2} x^2 \, dx=-\frac{8}{3}$, und liegt $f$ unter der $x$-Achse, so ist der Integralwert negativ, waehrend die geometrische Flaeche der Betrag dieses Wertes ist.

Klausur-Satz (Deutsch unten): Ohne $dx$ ist das Integral unvollstaendig, vertauschte Grenzen kehren das Vorzeichen um, und unterhalb der $x$-Achse unterscheidet sich der Integralwert durch das Vorzeichen vom geometrischen Flaecheninhalt.

## Schritt 5 — szenario

本步为 Klausur 情境迁移环节，把积分面积用于真实核算任务。

SITUATION 中文在上：一块太阳能板的下边缘为直线，上边缘为曲线，宽度方向为 $4$ 米，高度曲线可用 $f(x)=-0.25x^2+4$ 描述，定义域为 $[-4;4]$ 的子区间 $[0;4]$ 段待核算。工程师先用矩形块粗估曲边面积以备料，再用定积分给出精确值并解释两者误差，以满足审计要求。

AUFGABE (berechnen, [AFB III]): Berechne erstens mit $n=4$ die Schaetzung $O_{4}$ und $U_{4}$ der Kurvenflaeche. Berechne zweitens das bestimmte Integral auf $[0;4]$ als exakten Wert. Erklaere drittens die Rechteck-Luecke und die Fehleraenderung fuer $n$ -> unendlich. 中文说明：三问分别对应估计、精确积分与误差解释。

MUSTERLÖSUNG Dreischritt 中文在上：Dreischritt 第一步为估计。取 $\Delta x=1$，分点为 $x_{0}=0$、$x_{1}=1$、$x_{2}=2$、$x_{3}=3$、$x_{4}=4$，对应 $f$ 值为 $4$、$3.75$、$3$、$1.75$、$0$。函数单调递减，故左和为上和，右和为下和，得 $O_{4}=1 \cdot (4+3.75+3+1.75)=12.5$，$U_{4}=1 \cdot (3.75+3+1.75+0)=8.5$。Dreischritt 第二步为精确积分：$\int_{0}^{4} (-0.25x^2+4) \, dx=\left[-\frac{1}{12}x^3+4x\right]_{0}^{4}=-\frac{64}{12}+16=\frac{32}{3} \approx 10.67$，落在 $8.5$ 与 $12.5$ 之间。Dreischritt 第三步为误差解释：矩形在曲边处产生三角形缝隙，$n=4$ 时缝隙大故区间宽，$n$ -> unendlich 时缝隙消失，$O_{n}-U_{n}$ 趋于零，估计值收敛于积分精确值。Deutsch unten siehe MUSTER-KLAUSURSATZ.

ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Schaetzung $O_{4}=12.5$ und $U_{4}=8.5$ mit monotoner Endpunkt-Zuordnung | 5 NP | Grobere Zerlegung $n=2$ mit Intervalldeutung als Alternativweg
Exaktes Integral $\int_{0}^{4} (-0.25x^2+4) \, dx=\frac{32}{3}$ mit Stammfunktion | 5 NP | Numerische Naeherung mit Taschenrechner als Alternativweg
Fehlerdeutung der Rechteck-Luecke und Konvergenz fuer $n$ -> unendlich | 5 NP | Geometrische Skizze der schrumpfenden Luecke als Alternativweg

> MUSTER-KLAUSURSATZ (15 NP): Die Zerlegung mit $n=4$ liefert $O_{4}=12.5$ und $U_{4}=8.5$, das bestimmte Integral $\int_{0}^{4} (-0.25x^2+4) \, dx=\frac{32}{3}$ liegt dazwischen, und fuer $n$ -> unendlich schliesst sich die Luecke zwischen Ober- und Untersumme, sodass die Riemann-Summe gegen den exakten Flaecheninhalt konvergiert.

KERNSATZ (auswendig):
- Kernsatz: `Das bestimmte Integral ist der Grenzwert der Riemann-Summe fuer $n$ -> unendlich und wird ueber Zerlegung -> Riemann-Summe -> Grenzwert dargestellt.`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Aufschluesselung: Subjekt = das bestimmte Integral | Mechanismus = Grenzwert der Riemann-Summe fuer $n$ -> unendlich | Urteil = Darstellung ueber Zerlegung -> Riemann-Summe -> Grenzwert
- Selbsttest: Das bestimmte Integral ist der ___ der Riemann-Summe fuer $n$ -> unendlich und wird ueber Zerlegung -> Riemann-Summe -> Grenzwert dargestellt.
