---
fach: Mathe
thema: "Analysis: Funktionenscharen und Bestimmung von Ortskurven"
level: 1
ziel: Klausur
xp: 100
operatoren: [untersuchen, ableiten, bestimmen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Mathe, Analysis, Funktionenscharen, Parameter, Ortskurve, Wendepunkte, Extrempunkte]
version: Lesson-v3
---

# Lernreise: Analysis: Funktionenscharen und Bestimmung von Ortskurven (L1, Ziel Klausur)

<!-- Campaign: Kurvendiskussion-und-Familien | Episode 4/10 | Krise: Welche geheimnisvolle Kurve zeichnen die Hochpunkte eines Springbrunnens in den Himmel, wenn man den Wasserdruck regelt? | Zielgroessen: Scharparameter k, Fallunterscheidungen, Extrempunkte einer Schar, Ortskurve, Parameterelimination | Tool: lego -->

## Schritt 1 — entdecken: Die tanzenden Gipfel der Wasserorgel
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清函数族（Funktionenschar $f_k(x)$）中自变量 $x$ 与形态参数（Formparameter $k$）的本质区别，以及对参数 $k$ 符号进行“分类讨论”（Fallunterscheidungen: $k > 0, k = 0, k < 0$）的判别标准。
2. 中文：能熟练运用“参数消元两步法”（Parameterelimination: $x(k) \to k(x) \to y(k(x))$）精准推导极值点或拐点的轨道曲线方程（Gleichung der Ortskurve）。
3. 中文：能在高中微积分高考大题（AFB I/II/III）中准确求解含参数多项式函数与指数衰减函数的共同交点（gemeinsame Punkte aller Scharkurven）及包络线性质。

### Hook / Phaenomen

Stell dir vor, du stehst abends vor den beruehmten tanzenden Wasserfontaenen von Dubai oder dem Schloss Bellagio in Las Vegas. Aus Hunderten im Boden versenkten Duesen schiessen gigantische Wasserboegen synchron in den Nachthimmel. Die Flugbahn der Wassertropfen laesst sich durch eine mathematische Parabel $f_k(x)$ beschreiben. An einem Steuerpult dreht der Licht- und Wasser-Ingenieur an einem silbernen Drehregler: Er veraendert den Pumpendruck kontinuierlich ueber einen Parameter $k$. Mit jedem Millimeter Drehung veraendert sich die Wurfparabel: Sie wird steiler, flacher, breiter oder hoeher. Wenn du nun mit einer Kamera eine Langzeitbelichtung machst und ausschliesslich den hoechsten Punkt (den Scheitelpunkt) jedes einzelnen Wasserbogens markierst, stellst du mit Staunen fest: Die unendlich vielen Hochpunkte fliegen nicht chaotisch durch den Raum, sondern sie tanzen wie auf einer Perlenschnur aufgereiht entlang einer voellig eigenstaendigen, wunderschoenen neuen geometrischen Kurve – der sogenannten Ortskurve der Hochpunkte!

`Klausur-Satz: Eine Ortskurve ist die Funktionskurve, auf der saemtliche charakteristischen Punkte (Hoch-, Tief- oder Wendepunkte) einer Funktionenschar fuer alle reellen Parameterwerte k liegen.`

## Schritt 2 — entdecken: Der Werkzeugkasten fuer Scharkurven
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 函数族 / 曲线族 — Funktionenschar ($f_k(x)$): 包含一个或多个自由实数参数 $k$ 的函数表达式，每一个具体的参数数值对应坐标系中一条确定的单曲线。 Eine Familie unendlich vieler Funktionsgraphen, die durch einen gemeinsamen Funktionsterm mit variablem Formparameter $k$ definiert werden.
- 形态参数 — Formparameter ($k \in \mathbb{R}$): 在求导运算中作为常数处理、但可自由取值的参数，决定了图象的拉伸、平移或开口方向。 Eine Groesse, die bei der Differentiation wie eine feste Zahl behandelt wird, aber die Gestalt der Kurve steuert.
- 参数消元法 — Parameterelimination: 求轨道方程的标准代数方法：将特征点的 x 坐标表示为 $x(k)$，解出 $k = g(x)$ 并将其代入 y 坐标表达式 $y(k)$ 中彻底消除 $k$。 Das mathematische Verfahren zur Bestimmung einer Ortskurve durch Aufloesen von $x_k$ nach $k$ und Einsetzen in $y_k$.
- 共同不变点 — Gemeinsame Punkte: 坐标平面内所有函数族成员无论参数 $k$ 取何值都必定经过的固定交点。 Punkte, deren Koordinaten von der Wahl des Scharparameters $k$ vollstaendig unabhaengig sind.

## Schritt 3 — entdecken: Der 3-Schritte-Algorithmus zur Ortskurve
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Algorithmus zur Bestimmung einer Ortskurve:

1. Extremstellen / Wendestellen in Abhaengigkeit von k berechnen:
   f'_k(x) = 0  -->  x_E(k)
   y-Koordinate bestimmen: y_E(k) = f_k(x_E(k))
   Ergebnis: P_k( x(k) | y(k) )
                       |
                       v
2. x-Koordinate nach dem Scharparameter k aufloesen:
   x = x(k)  <===>  k = g(x)
                       |
                       v
3. k = g(x) in die Gleichung der y-Koordinate einsetzen:
   y = y(k)  --->  y = y(g(x))  -->  ORTSKURVE y = h(x)!
```

`Klausur-Satz: Bei der Ableitung einer Funktionenschar f_k(x) nach x wird der Parameter k streng wie eine feste Zahl (Konstante) behandelt; nach der Summen- und Faktorregel bleibt k erhalten oder faellt als additive Konstante weg.`

## Schritt 4 — ausprobieren: Das Ortskurven-Labor

[Werkzeug: lego]

AUFGABE (untersuchen & bestimmen, AFB I/II):
Gegeben ist die Funktionenschar $f_k(x) = -\frac{1}{k} x^2 + 4x - k$ fuer $k > 0$.
1. Untersuche die Schar auf lokale Extrempunkte in Abhaengigkeit von $k$ und weise deren Art nach.
2. Bestimme die Gleichung der Ortskurve aller Hochpunkte.
3. Berechne die gemeinsamen Punkte aller Kurven der Schar (falls vorhanden).

MUSTERLOESUNG:
1. Ableitungen und Extrempunkte:
   - Erste und zweite Ableitung bilden ($k$ ist Konstante!):
     $$f_k'(x) = -\frac{2}{k} x + 4$$
     $$f_k''(x) = -\frac{2}{k}$$
   - Notwendige Bedingung: $f_k'(x) = 0$:
     $$-\frac{2}{k} x + 4 = 0 \iff \frac{2}{k} x = 4 \implies x_E = \frac{4k}{2} = 2k$$
   - Hinreichende Bedingung:
     $$f_k''(2k) = -\frac{2}{k} < 0 \quad (\text{da } k > 0) \implies \text{Es liegt fuer jedes } k \text{ ein Hochpunkt vor!}$$
   - y-Koordinate des Hochpunkts $H_k$:
     $$y_H = f_k(2k) = -\frac{1}{k}(2k)^2 + 4(2k) - k = -\frac{1}{k}(4k^2) + 8k - k = -4k + 8k - k = 3k$$
     $$H_k( 2k \mid 3k )$$
2. Ortskurve der Hochpunkte bestimmen:
   - Schritt 1: $x = 2k \implies k = \frac{x}{2}$ (fuer $x > 0$, da $k > 0$).
   - Schritt 2: $k$ in die $y$-Koordinate einsetzen:
     $$y = 3k = 3 \cdot \left(\frac{x}{2}\right) = \frac{3}{2} x = 1{,}5x$$
   - Ergebnis: Saemtliche Hochpunkte der Schar liegen auf der Ursprungsgeraden mit der Gleichung $y = 1{,}5x$ fuer $x > 0$!
3. Gemeinsame Punkte:
   - Zwei verschiedene Scharkurven $f_a(x)$ und $f_b(x)$ mit $a \neq b$ gleichsetzen:
     $$-\frac{1}{a}x^2 + 4x - a = -\frac{1}{b}x^2 + 4x - b$$
     $$\left(\frac{1}{b} - \frac{1}{a}\right)x^2 = a - b \iff \frac{a - b}{a \cdot b} x^2 = a - b$$
   - Da $a \neq b$, teilen durch $(a - b)$:
     $$\frac{1}{a \cdot b} x^2 = 1 \iff x^2 = a \cdot b$$
   - Die Schnittstellen haengen explizit von den gewaehlten Parametern $a$ und $b$ ab; folglich gibt es keinen universellen gemeinsamen Punkt fuer alle Kurven der Schar.

## Schritt 5 — ausprobieren: Duell der Rechenwege: Einzelfall vs. Scharanalyse

VERGLEICH: Einzelkurvendiskussion vs. Allgemeine Scharanalyse (选程序)

- Position A (Scharrechnung mit allgemeinem Parameter k):
  - Vorgehensweise: Einmaliges Durchrechnen der Ableitungen mit symbolischem $k$.
  - Vorteil: Liefert mit einem einzigen Rechengang das Verhalten fuer unendlich viele Kurven; ermoeglicht Ortskurven und Fallunterscheidungen.
- Position B (Einsetzen einer festen Zahl fuer k, z. B. k=1):
  - Vorgehensweise: Reine Kurvendiskussion einer Einzelkurve.
  - Schwaeche: Beantwortet keine der Scharfragen, erkennt keine Ortskurven und fuehrt in Klausuren zu null Punkten bei Aufgabenstellungen zur Schar.

Entscheidungsregel fuer die Klausur:
Lasse den Parameter $k$ bis zum Schluss als symbolische Variable stehen! Wenn durch $k$ geteilt werden muss, fuehre immer die Fallunterscheidung $k = 0$ explizit auf, um unzulaessige Divisionen durch Null zu vermeiden!

## Schritt 6 — check: Klausur-Transfer Medikamenten-Abbaukurven mit Scharparameter

PRUEFUNGSSZENARIO (KLP NRW Mathematik LK Inhaltsfeld 1: Analysis):

### AFB I: Ableitung mit Ketten- und Produktregel
Gegeben ist die Schar $g_k(t) = 10 \cdot t \cdot e^{-k \cdot t}$ fuer $t \ge 0$ und $k > 0$ (Konzentration eines Wirkstoffs im Blut).
Bestimme die erste Ableitung $g_k'(t)$ mithilfe der Produkt- und Kettenregel.

### AFB II: Maximum und Ortskurve
Berechne den Zeitpunkt $t_{\text{max}}$ der maximalen Wirkstoffkonzentration sowie die maximale Konzentration in Abhaengigkeit von $k$.
Ermittle die Gleichung der Ortskurve aller Maxima.

### AFB III: Interpretation im pharmakologischen Kontext
Der Parameter $k$ beschreibt die individuelle Stoffwechselrate eines Patienten (schneller vs. langsamer Metabolisierer).
Interpretiere die Gleichung der Ortskurve aus medizinischer Sicht: Wie haengen Spitzenkonzentration und Wirkungszeitpunkt zusammen?

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Was muss man bei der Bestimmung des Definitionsbereichs einer Ortskurve beachten?
ANTWORT: Die Ortskurve ist nur fuer diejenigen x-Werte gueltig, die sich aus dem zulaessigen Wertebereich des Scharparameters k ergeben (z. B. wenn k > 0 gilt und x = 2k ist, gilt die Ortskurve nur fuer x > 0).

FRAGE: Wie findet man rechnerisch heraus, ob eine Schar von Kurven einen gemeinsamen Schnittpunkt besitzt?
ANTWORT: Man setzt fk(x) = fm(x) fuer zwei verschiedene Parameter k ungleich m und loest nach x auf. Haengt die Loesung fuer x nicht mehr von k und m ab, existiert ein gemeinsamer Punkt.

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du beherrschst nun die anspruchsvollste Disziplin der gymnasialen Analysis. Du kannst Parameter algebraisch beherrschen, Fallunterscheidungen durchfuehren und Ortskurven fehlerfrei konstruieren.

Im kommenden Mathematik-Modul wenden wir uns den uneigentlichen Integralen bei unbeschraenkten Funktionen (Polstellen) und der Laplace-Wahrscheinlichkeitsverteilung zu.
