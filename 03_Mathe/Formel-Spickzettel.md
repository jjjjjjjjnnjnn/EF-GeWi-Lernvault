---
fach: Mathe
thema: "Formel-Spickzettel EF"
operatoren: []
klausurrelevant: true
datum: 2026-09-21
tags: [EF, Mathe]
---

# Mathe Formel-Spickzettel (EF)

> KaTeX-ready（App渲染用`$$...$$`）；纸考对照官方Formelsammlung。

## Lineare Funktionen

- 中文：一般式里 m 是斜率（Steigung），b 是 y 轴截距（y-Achsenabschnitt，即 x=0 处的函数值）。
- Allgemeinform: $$f(x) = m \cdot x + b$$
- 中文：m 符号决定走向：m=0 水平（平行 x 轴），m>0 上升，m<0 下降。
- Vorzeichen: $$m = 0 \Rightarrow \text{parallel zur x-Achse}, \quad m > 0 \Rightarrow \text{steigend}, \quad m < 0 \Rightarrow \text{fallend}$$
- 中文：两点求斜率用 Zwei-Punkte-Formel，注意分子分母对应点顺序一致，负号先加括号再算。
- Zwei-Punkte-Formel: $$m = \frac{y_2-y_1}{x_2-x_1}$$
- 中文：求 b 把已知点代入解方程；检验点是否在直线上用 Punktprobe（左右两边是否相等）。
- Punktprobe / b bestimmen: $$b = y_1 - m \cdot x_1, \quad \text{Probe: } f(x_P) \stackrel{?}{=} y_P$$

## Quadratische Funktionen

- 中文：三种形式互化是重点——一般式看 c（y 截距），顶点式直接读顶点，分解式直接读零点。
- Normalform: $$f(x) = a \cdot x^2 + b \cdot x + c$$
- Scheitelpunktform: $$f(x) = a \cdot (x-d)^2 + e, \quad S(d \mid e)$$
- Faktorisierte Form: $$f(x) = a \cdot (x-x_1) \cdot (x-x_2), \quad N_1(x_1 \mid 0), \; N_2(x_2 \mid 0)$$
- 中文：a 决定开口与宽窄：a>0 开口向上，a<0 开口向下并关于 x 轴翻转；|a|>1 拉长（gestreckt），|a|<1 压扁（gestaucht），|a|=1 标准抛物线。
- Oeffnung / Streckung: $$a > 0 \Rightarrow \text{nach oben geoeffnet}, \quad a < 0 \Rightarrow \text{nach unten geoeffnet}$$
- $$|a| > 1 \Rightarrow \text{gestreckt}, \quad |a| < 1 \Rightarrow \text{gestaucht}, \quad |a| = 1 \Rightarrow \text{Normalparabel}$$
- 中文：d 管左右平移（x 方向，注意符号反着看），e 管上下平移（y 方向）；零点把一般式化成 x²+px+q=0 后套 pq-Formel（见 Analysis）。
- Verschiebung: $$d \Rightarrow \text{x-Richtung}, \quad e \Rightarrow \text{y-Richtung}$$

## Analysis

- Potenzregel: $$(x^n)' = n \cdot x^{n-1}$$
- Summen-/Faktorregel: $$(f+g)' = f'+g', \quad (c \cdot f)' = c \cdot f'$$
- Mittlere Änderungsrate: $$m = \frac{f(x_2)-f(x_1)}{x_2-x_1}$$
- Tangente in $x_0$: $$t(x) = f(x_0) + f'(x_0)\cdot(x-x_0)$$
- pq-Formel: $$x_{1,2} = -\frac{p}{2} \pm \sqrt{\left(\frac{p}{2}\right)^2 - q}$$

## Vektoren / Geraden

- Betrag: $$|\vec{a}| = \sqrt{a_1^2+a_2^2+a_3^2}$$
- Gerade (Parameterform): $$g: \vec{x} = \vec{p} + r\cdot\vec{u}$$
- Kollinear: $$\vec{a} = k\cdot\vec{b}$$

## Klausur-Satz

- `Die Ableitung an der Stelle $x_0$ gibt die lokale Änderungsrate (Tangentensteigung) an.`
- `Die Punktprobe zeigt durch Einsetzen, ob ein Punkt auf dem Graphen liegt.`
- `Der Scheitel $S(d \mid e)$ gibt den tiefsten bzw. hoechsten Punkt der Parabel an.`
