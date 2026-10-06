---
fach: Mathe
thema: "Analysis: Extremwertprobleme mit Nebenbedingungen"
level: 1
ziel: Klausur
xp: 100
operatoren: [modellieren, ableiten, optimieren]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Mathe, Analysis, Extremwertaufgaben, Optimierung, Zielfunktion, Nebenbedingung]
version: Lesson-v3
---

# Lernreise: Analysis: Extremwertprobleme mit Nebenbedingungen (L1, Ziel Klausur)

<!-- Campaign: Differentialrechnung-und-Optimierung | Episode 4/10 | Krise: Wie baut ein Getraenkekonzern eine Coladose mit maximalem Inhalt bei minimalem Blechverbrauch? | Zielgroessen: Zielfunktion, Nebenbedingung, Zielfunktion einer Variablen, Extremstellen, Randwerte | Tool: lego -->

## Schritt 1 — entdecken: Das Einsparpotenzial der Milliardendose
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能清晰拆解工程与经济极值问题的标准化“四步建模法”（Hauptbedingung / Zielfunktion 目标函数、Nebenbedingung 约束条件、Zielfunktion in einer Variablen 降维单变量目标函数、Randwertpruefung 边界检验）。
2. 中文：能熟练运用导数一阶导为零（$f'(x) = 0$）与二阶导符号判定极大值与极小值。
3. 中文：能在高考微积分应用大题（AFB I/II/III）中为圆柱体包装、几何图形内接矩形及成本最优化建立精准的数学函数模型并进行敏感度分析。

### Hook / Phaenomen

Stell dir vor, du bist Chef-Ingenieur bei einem der groessten Getraenkehersteller der Welt. Dein Konzern produziert pro Jahr mehr als vierzig Milliarden Getraenkedosen aus Aluminium. Jede einzelne Dose muss ein praezises Innenvolumen von exakt 330 Millilitern Fluessigkeit fassen. Dein Auftrag: Du sollst den Radius und die Hoehe des zylindrischen Koerpers so dimensionieren, dass die dafuer benoetigte Blechoberflaeche auf den Bruchteil eines Quadratmillimeters minimiert wird. Machst du die Dose zu duenn und extrem hoch, verbrauchst du viel zu viel Material fuer die Mantelflaeche. Machst du sie flach wie eine Untertasse, fressen Boden und Deckel riesige Blechmengen. Gelingt es dir jedoch, das mathematisch perfekte Verhaeltnis ueber die Differentialrechnung zu berechnen, spart dein Unternehmen pro Dose nur zwei Centimeter Blech – was sich weltweit auf Hunderte Millionen Euro Materialeinsparung und gigantische CO2-Reduktionen summiert.

`Klausur-Satz: Ein Extremwertproblem mit Nebenbedingungen wird geloest, indem die Nebenbedingung nach einer Unbekannten aufgeloest und in die Hauptbedingung eingesetzt wird, sodass eine differenzierbare Zielfunktion in einer einzigen Variablen entsteht.`

## Schritt 2 — entdecken: Der mathematische Baukasten fuer Optimierungen
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 目标函数 / 主条件 — Hauptbedingung / Zielfunktion: 描述待优化物理量（如最大面积、最小表面积、最大利润）的数学表达式，起初往往含有多个自变量。 Die Funktion der zu maximierenden oder minimierenden Zielgroesse in Abhaengigkeit von mehreren Dimensionen.
- 约束条件 / 副条件 — Nebenbedingung: 几何、物理或经济上必须严格满足的固定限制等式（如给定体积 $V = 330\,\text{ml}$ 或周长 $U = 100\,\text{m}$）。 Eine feste geometrische oder oekonomische Randbedingung, die die Variablen miteinander verknuepft.
- 目标定义域与降维 — Zielfunktion in einer Variablen: 将约束条件代入主条件消元后得到的关于单一变量的可导函数，附带实际几何意义允许的定义域（Definitionsbereich $D$）。 Die durch Substitution auf eine einzige Variable reduzierte Funktionsgleichung samt oekonomischem Definitionsbereich.
- 边界值检验 — Randwertpruefung: 检验极值是否可能出现在定义域的边界端点，确保求得的局部极值确实是全局最优解。 Der rechnerische Vergleich des lokalen Extremwerts mit den Funktionswerten an den Intervallgrenzen des Definitionsbereichs.

## Schritt 3 — entdecken: Die vier Stufen des Optimierungs-Algorithmus
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Der 4-Schritte-Optimierungsalgorithmus:

1. Hauptbedingung (HB) aufstellen:
   Zielgroesse = f(x, y)  [z. B. Oberflaeche A = 2*pi*r^2 + 2*pi*r*h]
                    |
2. Nebenbedingung (NB) formulieren & umstellen:
   g(x, y) = const        [z. B. Volumen V = pi*r^2*h  -->  h = V / (pi*r^2)]
                    |
3. NB in HB einsetzen -> Zielfunktion A(r) in nur EINER Variablen:
   A(r) = 2*pi*r^2 + 2*V / r
                    |
4. Differentialrechnung anwenden:
   - Notwendige Bedingung: A'(r) = 0  --> Kandidaten r_0 berechnen
   - Hinreichende Bedingung: A''(r_0) > 0 (Minimum) bzw. < 0 (Maximum)
   - Randwertpruefung im Intervall D
```

`Klausur-Satz: Bei jeder Extremwertaufgabe ist die hinreichende Bedingung ueber die zweite Ableitung sowie die explizite Pruefung der Intervallgrenzen zwingend erforderlich fuer die volle Punktzahl.`

## Schritt 4 — ausprobieren: Das Werkstatt-Labor fuer Dosen-Design

[Werkzeug: lego]

AUFGABE (modellieren & optimieren, AFB I/II):
Ein zylindrischer Behaelter soll das feste Volumen $V_0 = 1000\,\text{cm}^3$ (1 Liter) fassen.
Ermittle den Radius $r$ und die Hoehe $h$ so, dass der gesamte Oberflaecheninhalt $A$ des Zylinders minimal wird.
1. Stelle Hauptbedingung und Nebenbedingung auf.
2. Leite die Zielfunktion $A(r)$ her und bestimme den optimalen Radius sowie die optimale Hoehe.
3. Berechne das Verhaeltnis von Hoehe zu Durchmesser ($h / (2r)$).

MUSTERLOESUNG:
1. Bedingungen:
   - Hauptbedingung (Oberflaeche):
     $$A(r, h) = 2\pi r^2 + 2\pi r h$$ (Boden + Deckel + Mantelflaeche).
   - Nebenbedingung (Volumen):
     $$V(r, h) = \pi r^2 h = 1000 \implies h = \frac{1000}{\pi r^2}$$ (fuer $r > 0$).
2. Zielfunktion und Ableitungen:
   - Einsetzen von $h$ in $A$:
     $$A(r) = 2\pi r^2 + 2\pi r \cdot \frac{1000}{\pi r^2} = 2\pi r^2 + \frac{2000}{r} = 2\pi r^2 + 2000 r^{-1}$$
   - Erste Ableitung bilden:
     $$A'(r) = 4\pi r - 2000 r^{-2} = 4\pi r - \frac{2000}{r^2}$$
   - Notwendige Bedingung: $A'(r) = 0$:
     $$4\pi r = \frac{2000}{r^2} \iff r^3 = \frac{2000}{4\pi} = \frac{500}{\pi} \implies r = \sqrt[3]{\frac{500}{\pi}} \approx 5{,}42\,\text{cm}$$
   - Hinreichende Bedingung:
     $$A''(r) = 4\pi + \frac{4000}{r^3} \implies A''(5{,}42) = 4\pi + \frac{4000}{500/\pi} = 4\pi + 8\pi = 12\pi > 0 \implies \text{lokales Minimum!}$$
   - Optimale Hoehe:
     $$h = \frac{1000}{\pi r^2} = \frac{1000}{\pi \cdot (500/\pi)^{2/3}} = 2 \cdot \sqrt[3]{\frac{500}{\pi}} = 2r \approx 10{,}84\,\text{cm}$$
3. Verhaeltnis:
   $$h = 2r \implies \frac{h}{2r} = 1$$
   Der materialoptimale Zylinder besitzt eine Hoehe, die exakt gleich seinem Durchmesser ist!

`Klausur-Satz: Bei Aufgaben zu Analysis: Extremwertprobleme mit Nebenbedingungen muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`

## Schritt 5 — ausprobieren: Duell der Ansaetze: Einsetzen vs. Lagrange

VERGLEICH: Einsetzungsverfahren vs. Geometrische Schaetzung (选程序)

- Position A (Analytisches Einsetzungsverfahren):
  - Methode: Exakte algebraische Aufloesung der Nebenbedingung nach einer Variablen und Ableitung.
  - Vorteil: Garantiert die mathematisch exakte Loesung bis auf beliebig viele Nachkommastellen; liefert sofort den Beweis des globalen Minimums/Maximums.
- Position B (Reines Probieren / Wertetabelle):
  - Methode: Tabellieren von Zahlenwerten in einer Tabellenkalkulation.
  - Nachteil: Findet niemals den exakten Wert, liefert keine algebraische Begruendung und fuehrt in Abiturklausuren zu massivem Punktabzug.

Entscheidungsregel fuer die Klausur:
Folge immer dem festen 4-Schritte-Schema: Hauptbedingung notieren -> Nebenbedingung umstellen -> Einsetzen zur Zielfunktion $f(x)$ -> $f'(x) = 0$ und $f''(x) \neq 0$!

## Schritt 6 — check: Klausur-Transfer Fensterkonstruktion mit Maximalem Lichteinfall

PRUEFUNGSSZENARIO (KLP NRW Mathematik GK/LK Inhaltsfeld 1: Analysis):

### AFB I: Zielfunktionsbildung
Ein normiertes Rundbogenfenster besteht aus einem unteren Rechteck mit Breite $2r$ und Hoehe $h$, auf dem ein Halbkreis mit Radius $r$ aufsitzt.
Der gesamte aeussere Rahmenumfang betraegt fest $U = 8\,\text{Meter}$.
Stelle die Zielfunktion fuer die gesamte Glasflaeche $A(r)$ in Abhaengigkeit vom Radius $r$ auf.

### AFB II: Extremwertbestimmung
Berechne den Radius $r$ und die Hoehe $h$ so, dass die Flaeche fuer maximalen Lichteinfall optimiert wird. Weise die Art des Extremums rechnerisch nach.

### AFB III: Oekonomische Beurteilung
In der Realitaet weichen Getraenkedosen im Supermarkt haeufig vom theoretischen Idealverhaeltnis $h = 2r$ ab (sie sind schlanker und hoeher).
Diskutiere marketingtechnische, ergonomische (Griffigkeit) und logistische Gruende fuer diese bewusste Abweichung vom mathematischen Optimum.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Was muss man tun, wenn die erste Ableitung der Zielfunktion gleich null gesetzt wird und zwei Loesungen liefert?
ANTWORT: Beide Werte muessen in die zweite Ableitung eingesetzt werden, um zu pruefen, welcher ein Maximum und welcher ein Minimum darstellt, und es muss geprueft werden, ob beide Werte im zulaessigen Definitionsbereich liegen.

FRAGE: Warum ist die Randwertpruefung bei geometrischen Extremwertaufgaben unverzichtbar?
ANTWORT: Weil der berechnete Hoch- oder Tiefpunkt nur ein lokales Extremum ist; an den Raendern des Definitionsbereichs (z. B. extrem flache oder extrem schmale Formen) koennte der Funktionswert theoretisch noch groesser oder kleiner sein.

`Klausur-Satz: Die differenzierte Reflexion erfordert eine stringente Verknuepfung von theoretischem Kriterienkatalog und konkretem Klausurmaterial.`

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du beherrschst nun das maechtigste praktische Anwendungswerkzeug der gymnasialen Differentialrechnung. Du kannst reale Problemstellungen in mathematische Gleichungen uebersetzen und exakte Optima berechnen.

Im folgenden Mathematik-Modul wenden wir uns den Kurvenscharen und Ortskurven zu: Wie verhalten sich Extrempunkte, wenn sich ein zusaetzlicher Parameter $k$ dynamisch veraendert?
