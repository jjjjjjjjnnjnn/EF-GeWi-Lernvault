---
fach: Mathe
thema: "Rotationsvolumen und Uneigentliche Integrale"
level: 1
ziel: Klausur
xp: 100
operatoren: [herleiten, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Mathe, Analysis, Integralrechnung, Rotationskoerper, Uneigentliche-Integrale]
version: Lesson-v3
---

# Lernreise: Rotationsvolumen und Uneigentliche Integrale (L1, Ziel Klausur)

<!-- Campaign: Integralrechnung-und-Analysis | Episode 6/10 | Krise: Wie kann ein geometrischer Koerper ein endliches Volumen, aber eine unendlich grosse Oberflaeche besitzen? | Zielgroessen: Rotationskoerper, Zylinderscheiben, Uneigentliche Integrale, Konvergenz | Tool: lego -->

## Schritt 1 — entdecken: Das Paradoxon von Gabriels Horn
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能推导并熟练运用绕x轴旋转体体积积分公式（$V = \pi \cdot \int_{a}^{b} [f(x)]^2 \, dx$）。
2. 中文：能运用极限法精准判定并计算第一类反常积分（uneigentliche Integrale mit unendlichen Grenzen $\lim_{u \to \infty} \int_{a}^{u} f(x)\,dx$）的敛散性。
3. 中文：能在高考与模拟考综合题（AFB I/II/III）中利用微元切片法解决工程几何容器造型（如喷管、花瓶、酒杯容积）与极限悖论分析。

### Hook / Phaenomen

Stell dir ein maerchenhaftes Horn vor, das durch die Rotation des Funktionsgraphen von $f(x) = \frac{1}{x}$ ueber dem Intervall von $x = 1$ bis ins Unendliche entsteht: Torricellis Trompete oder auch Gabriels Horn genannt. Wenn du das Volumen dieses unendlich langen Trichters mit der Integralrechnung berechnest, erhaeltst du eine vollkommen endliche, exakte Zahl: Das Horn fasst genau $\pi$ Raumvolumeneinheiten Fluessigkeit. Du koenntest also etwa drei Liter Farbe hineinggiessen und das Horn waere bis an den Rand gefuellt. Willst du jedoch die Innenwand desselben Horns mit einem Pinsel anstreichen, stellst du mit Entsetzen fest, dass die Flaeche unendlich gross ist – du braeuchtest unendlich viel Farbe, um sie zu bedecken! Wie kann ein Koerper mit endlichem Innenvolumen eine unendlich grosse Aussenflaeche besitzen? Hinter diesem faszinierenden mathematischen Paradoxon stecken zwei maechtige Werkzeuge der gymnasialen Analysis: das Rotationsintegral und das uneigentliche Integral.

`Klausur-Satz: Das Volumen eines Rotationskoerpers entsteht durch Aufsummieren infinitesimal duenner Zylinderscheiben mit Kreisflaechen pi mal f(x) zum Quadrat.`

## Schritt 2 — entdecken: Mathematisches Rustzeug fuer rotierende Koerper
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 旋转体 — Rotationskoerper: 某一平面图形绕同一平面内的某一条直线旋转一周所形成的立体几何形体。 Ein dreidimensionaler geometrischer Koerper, der durch Rotation einerFlaeche um eine Koordinatenachse entsteht.
- 圆盘微元法 — Zylinderscheiben-Verfahren: 将旋转体沿轴向切割为无数个厚度为dx的微元圆柱体并积分求和的方法。 Zerlegung des Koerpers in duenne Kreiszylinder mit Volumen $dV = \pi \cdot [f(x)]^2 \cdot dx$.
- 反常积分 / 广义积分 — Uneigentliches Integral: 积分区间包含无穷大或者被积函数在积分区间内存在无穷间断点的定积分。 Ein Integral mit unendlichen Grenzen oder unbeschraenktem Integranden, berechnet als Grenzwert $\lim_{u \to \infty} \int_{a}^{u} f(x)\,dx$.
- 极限收敛性 — Konvergenz: 广义积分的极限过程趋近于某一个确定的有限实数。 Existiert der Grenzwert als endliche Zahl, heisst das uneigentliche Integral konvergent; andernfalls divergent.

## Schritt 3 — entdecken: Die Zylinderscheiben-Methode im Querschnitt
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Funktionsgraph f(x) rotiert um die x-Achse:

y ^
  |       *---*---*---*  f(x) = Radius r(x)
  |      /             \
  |     *               *
  +----+-----+-----+-----+----+----> x
  0    a     x    x+dx   b
             |<-dx->|
             Querschnittsscheibe:
             Radius: r = f(x)
             Dicke:  dx
             Volumen: dV = pi * [f(x)]^2 * dx
```

`Klausur-Satz: Fuer ein uneigentliches Integral muss stets zunaechst eine Hilfsvariable u gesetzt und der Grenzwert lim u->unendlich erst nach der Bildung der Stammfunktion ausgefuehrt werden.`

## Schritt 4 — ausprobieren: Der Rotationskoerper-Simulator

[Werkzeug: lego]

AUFGABE (herleiten & berechnen, AFB I/II):
Gegeben ist die Funktion $f(x) = \frac{1}{x^2}$ auf dem Intervall $[1; u]$ mit $u > 1$.
1. Leite die Formel fuer das Volumen $V(u)$ des durch Rotation um die x-Achse entstehenden Koerpers her.
2. Berechne das Grenzvolumen $V_{\infty} = \lim_{u \to \infty} V(u)$ und pruefe die Konvergenz.

MUSTERLOESUNG:
1. Herleitung:
   - Das Quadrat der Funktion lautet: $[f(x)]^2 = \left(\frac{1}{x^2}\right)^2 = \frac{1}{x^4} = x^{-4}$.
   - Das Rotationsvolumen ueber $[1; u]$ betraegt:
     $$V(u) = \pi \int_{1}^{u} x^{-4}\,dx = \pi \left[ \frac{x^{-3}}{-3} \right]_1^u = \pi \left[ -\frac{1}{3x^3} \right]_1^u = \pi \left( -\frac{1}{3u^3} - \left(-\frac{1}{3}\right) \right) = \frac{\pi}{3} \left( 1 - \frac{1}{u^3} \right)$$
2. Grenzwertberechnung:
   - Da $\lim_{u \to \infty} \frac{1}{u^3} = 0$, folgt:
     $$V_{\infty} = \lim_{u \to \infty} \frac{\pi}{3} \left( 1 - \frac{1}{u^3} \right) = \frac{\pi}{3} \cdot (1 - 0) = \frac{\pi}{3} \approx 1{,}047\,\text{VE}$$
   - Das Integral konvergiert absolut krisenfest gegen den exakten Wert $\frac{\pi}{3}$.

`Klausur-Satz: Bei Aufgaben zu Rotationsvolumen und Uneigentliche Integrale muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`

## Schritt 5 — ausprobieren: Duell der Integrale: Flaeche vs. Volumen

VERGLEICH: Flaechenintegral vs. Rotationsvolumen-Integral (选程序)

- Position A (Standard-Flaechenintegral $\int f(x)\,dx$):
  - Berechnet 2D-Flaechen.
  - Bei $f(x) = 1/x$ auf $[1; \infty)$: Stammfunktion $\ln(x) \to \infty$ (divergent!).
- Position B (Rotationsintegral $\pi \int [f(x)]^2\,dx$):
  - Berechnet 3D-Rotationsvolumen.
  - Durch das Quadrieren wird der Nenner zu $x^2$: Stammfunktion $-1/x \to 0$ (konvergent gegen $\pi$!).

Entscheidungsregel fuer die Klausur:
Wird nach `Rotationsvolumen um die x-Achse` gefragt, quadriere ZUERST den Funktionsterm $f(x)$ und multipliziere das Integral UNBEDINGT mit dem Vorfaktor $\pi$!

## Schritt 6 — check: Klausur-Transfer Sektkelch-Design und Grenzwertanalyse

PRUEFUNGSSZENARIO (KLP NRW Mathematik LK Inhaltsfeld 1: Analysis):

### AFB I: Stammfunktionsbestimmung
Gegeben ist die Funktion $g(x) = e^{-0{,}5x}$ auf dem Intervall $[0; b]$.
Bestimme die Stammfunktion des quadrierten Integranden $\pi \cdot [g(x)]^2$.

### AFB II: Grenzwertberechnung
Ermittle das Grenzvolumen fuer $b \to \infty$ und beweise, dass das unendlich langgestreckte Sektkelchrohr ein endliches Volumen von genau $\pi\,\text{VE}$ aufweist.

### AFB III: Geometrische Modellierung
Ein Designer entwirft eine Vase, deren Innenwand durch $h(x) = \sqrt{2x + 1}$ im Bereich $0 \le x \le 12$ modelliert wird ($x$ in Dezimetern).
Berechne das Fassungsvermoegen der Vase in Litern ($1\,\text{dm}^3 = 1\,\text{l}$) und beurteile die geometrische Plausibilitaet des Ergebnisses.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Was ist der typische Schuelerfehler beim Berechnen von Rotationsvolumina?
ANTWORT: Man vergisst entweder den Faktor pi vor dem Integral, oder man quadriert faelschlicherweise die Stammfunktion F(x) statt der Ausgangsfunktion f(x).

FRAGE: Wann heisst ein uneigentliches Integral divergent?
ANTWORT: Wenn der Grenzwert des endlichen Integrals fuer u gegen Unendlich nicht existiert oder gegen plus/minus Unendlich strebt.

`Klausur-Satz: Die differenzierte Reflexion erfordert eine stringente Verknuepfung von theoretischem Kriterienkatalog und konkretem Klausurmaterial.`

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du beherrschst nun die Berechnung von 3D-Rotationskoerpern und kannst Grenzwertprozesse bei uneigentlichen Integralen mathematisch souveraen begruenden.

Im naechsten Modul erweitern wir die Analysis auf Vektorfelder und Flaechenintegrale der hoeheren Ingenieurmathematik.
