---
fach: Mathe
thema: "Extremwertprobleme: Die optimale Dose"
level: 1
ziel: Klausur
xp: 100
operatoren: [modellieren, berechnen, bestimmen, interpretieren]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Mathe, Analysis, Extremwert]
version: Lesson-v3
---

# Lernreise: Extremwertprobleme: Die optimale Dose (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 27/33 | Krise: Materialverbrauch bei 330 ml Dosen minimieren | Zielgroessen: V = 330, A(r) minimal, h = 2r, Zylinder | Tool: box-optimizer -->

## Schritt 1 — entdecken: Das Geheimnis der Getraenkedose
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能清晰熟练掌握最值应用题的标准四步法（Hauptbedingung 目标函数 $\to$ Nebenbedingung 约束条件 $\to$ Zielfunktion 单变量函数 $\to$ 导数极值判定与定义域端点检验）。
2. 中文：能为固定容积 $V$ 的圆柱体饮料罐建立表面积函数 $A(r)$，并手算出材料最小化的惊人结论：高度必等于直径（$h = 2r$）。
3. 中文：能用二阶导数符号判定（Hinreichende Bedingung）和实际现实考量解释理论最优值与市售商品外观的差异（AFB II/III）。

### Hook / Phaenomen

每年全球要消耗 3000 亿个铝制饮料罐。如果每个罐子所用的铝箔面积能减少哪怕 2%，就能少排放几百万吨二氧化碳！但什么样的圆柱体，才能在装满 330 毫升汽水的同时，用最少最薄的材料包住它？

Hook / Phaenomen: Coca-Cola, Red Bull und Co. verkaufen jaehrlich Milliarden Getraenkedosen. Wuerde man die Oberflaeche einer Standarddose um nur 2 Millimeter reduzieren, sparte die Industrie hunderte Tonnen Aluminium pro Jahr. Doch wie findet man die mathematisch sparsamste Form fuer genau 330 Milliliter Inhalt? Ein Extremwertproblem par excellence, das uns direkt in den Maschinenraum der Differentialrechnung fuehrt!

`Klausur-Satz: Extremwertprobleme mit Nebenbedingungen werden geloest, indem die Nebenbedingung nach einer Variablen aufgeloest und in die Hauptbedingung zur Zielfunktion substituiert wird.`

## Schritt 2 — entdecken: Ausruestungskiste der Optimierung
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 目标函数（主条件） — Hauptbedingung：描述待求极值物理量（如面积、体积、成本）的几何或代数公式，通常含有多个自变量。 Die Formel fuer die zu optimierende Zielgroesse (z.B. Oberflaeche A = 2*pi*r^2 + 2*pi*r*h). Mechanismus: Enthaelt zunaechst zwei Unbekannte (r und h). Klausur-Tipp: Groesse mit Einheiten klar am Anfang deklarieren.
- 约束条件（副条件） — Nebenbedingung：现实情境给定的固定常数约束（如容积固定 $V = 330\text{ cm}^3$），用于在自变量间建立等式。 Die feste Vorgabe oder Einschraenkung des Sachverhalts (z.B. Volumen V = pi*r^2*h = 330). Mechanismus: Liefert den mathematischen Schluessel zur Elimination einer Variablen. Klausur-Tipp: Nach der einfacheren Variablen aufloesen (meist h = V / (pi*r^2)).
- 单变量目标函数 — Zielfunktion：将约束条件代入主条件后得到的仅含唯一自变量的目标函数 $A(r)$。 Die auf eine einzige Variable reduzierte Funktion, die abgeleitet werden kann. Mechanismus: Ersetzt h vollstaendig, sodass Standard-Kurvendiskussion anwendbar wird. Klausur-Tipp: Den oekonomisch/physikalisch sinnvollen Definitionsbereich D stets angeben (r > 0).
- 极值必要条件与驻点 — Notwendige Bedingung (Stationaere Stelle)：极值点处函数图像的切线斜率必为零，即一阶导数等于零 $A'(r) = 0$。 Das Kriterium erster Ordnung fuer ein lokales Extremum. Mechanismus: Bestimmt moegliche Kandidatenstellen durch Nullsetzen der ersten Ableitung. Klausur-Tipp: Exakt nach r aufloesen (dritte Wurzel!).
- 极值充分条件 — Hinreichende Bedingung：用于确证驻点是极大值还是极小值的判别准则（如二阶导数 $A''(r) > 0$ 为极小值，或一阶导变号法则 VZW）。 Das Kriterium zweiter Ordnung zur Bestimmung der Extremwertart. Mechanismus: Pruefung der Kruemmung an der stationaeren Stelle. Klausur-Tipp: Ausrechnen und explizit "A''(r) > 0 => Minimum" notieren.

`Klausur-Satz: Ein Minimum der Oberflaeche liegt vor, wenn die erste Ableitung der Zielfunktion verschwindet (A'(r) = 0) und die zweite Ableitung strikt positiv ist (A''(r) > 0).`

## Schritt 3 — entdecken: Der mathematische Rechenpfad
ENTDECKEN（1概念 + 1文字图解）：

中文：饮料罐是一个底面半径为 $r$、高度为 $h$ 的圆柱体。
1. 主条件（表面积，两个圆底面 + 侧面矩形）：
   $$A = 2\pi r^2 + 2\pi r h$$
2. 副条件（容积固定为 $V$）：
   $$V = \pi r^2 h \implies h = \frac{V}{\pi r^2}$$
3. 目标函数（将 $h$ 代入 $A$）：
   $$A(r) = 2\pi r^2 + 2\pi r \cdot \frac{V}{\pi r^2} = 2\pi r^2 + \frac{2V}{r}$$
4. 求导与驻点（令 $A'(r) = 0$）：
   $$A'(r) = 4\pi r - \frac{2V}{r^2} = 0 \implies 4\pi r = \frac{2V}{r^2} \implies r^3 = \frac{V}{2\pi} \implies r = \sqrt[3]{\frac{V}{2\pi}}$$
5. 高度与半径的关系：
   $$h = \frac{V}{\pi r^2} = \frac{2\pi r^3}{\pi r^2} = 2r = d$$
表面积最小的圆柱体，它的高度 $h$ 必须恰好等于它的底面直径 $2r$！

文字图解（ASCII 圆柱展开模型，App支持解析渲染）：

```diagram
         ---  Deckel: A_deckel = pi * r^2
       /     \
       \ --- /
          |
   +------+------+  <- Mantelflaeche:
   |             |     Breite = Umfang = 2 * pi * r
 h |             |     Hoehe = h
   |             |     A_mantel = 2 * pi * r * h
   +------+------+
          |
         ---  Boden:  A_boden = pi * r^2
       /     \
       \ --- /

 Gesamt-Oberflaeche A = 2 * pi * r^2 + 2 * pi * r * h
 Ziel: Minimum von A(r) unter der Bedingung V = pi * r^2 * h
 Resultat: h = 2r (Hoehe = Durchmesser!)
```

$$A(r) = 2\pi r^2 + \frac{2V}{r} \implies A'(r) = 4\pi r - \frac{2V}{r^2} = 0 \iff h = 2r$$
`Klausur-Satz: Fuer jeden zylindrischen Koerper mit vorgegebenem Volumen ist das Verhaeltnis von Hoehe zu Durchmesser genau dann 1 (h = 2r), wenn der Materialverbrauch minimal ist.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wenn die ideale Dose $h = 2r$ erfordert — warum sind Red-Bull-Dosen dann so extrem schlank und hoch, waehrend Thunfischdosen flach wie Untertassen sind? Ganz einfach: Marketing und Ergonomie schlagen die reine Mathematik! Schlanke Dosen wirken auf Menschen psychologisch "sportlicher", "hochwertiger" und passen besser in die Hand. Zudem stapeln sich flache Dosen im Supermarktregal besser. Mathematische Optimierung liefert die Baseline — die reale Welt fuegt Design-Nebenbedingungen hinzu!

**中文解读**: 既然 $h = 2r$ 最省材料，为什么红牛饮料罐这么苗条修长，而金枪鱼罐头却像个扁平飞碟？因为在现实货架上，心理学和握持感打败了纯数学：修长苗条的罐身让消费者感觉“优雅、充满活力、热量低”。数学告诉我们理论最低成本，而工业设计决定最终产品。

**Bezug zum Konzept**: `In realen Optimierungsproblemen existieren oft qualitative Nebenbedingungen (Handling, Stapelbarkeit), die die rein geometrische Loesung modifizieren.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Die 330-ml-Dose
Kontinuitaet: Vorher Mathe-Sekante-zu-Tangente-L1.md | Nachher Mathe-Steckbriefaufgaben-Verfahren-DE-L1.md. Krise dieser Episode: Materialverbrauch bei 330 ml Dosen minimieren. Zielgroessen: V = 330, A(r) minimal, h = 2r, Zylinder

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: box-optimizer]

AUFGABE (modellieren & berechnen, AFB II)：Ein Getraenkehersteller moechte eine zylinderfoermige Dose mit einem Fassungsvermoegen von $V = 330\text{ cm}^3$ herstellen. Bestimmen Sie den Radius $r$ und die Hoehe $h$ so, dass der Blechverbrauch minimal wird. Berechnen Sie die minimale Oberflaeche.

HILFE:
1. Schritt 1: Zielfunktion $A(r) = 2\pi r^2 + 660 / r$ mit $D = (0; \infty)$ aufstellen.
2. Schritt 2: Ableitung $A'(r) = 4\pi r - 660 / r^2 = 0$ nach $r$ aufloesen.
3. Schritt 3: Hinreichende Bedingung ueber $A''(r)$ pruefen und $h$ sowie $A_{\min}$ berechnen.

MUSTERLÖSUNG:
1. Zielfunktion: Aus $V = \pi r^2 h = 330$ folgt $h = 330 / (\pi r^2)$. Eingesetzt in die Oberflaechenformel:
$$A(r) = 2\pi r^2 + 2\pi r \cdot \frac{330}{\pi r^2} = 2\pi r^2 + \frac{660}{r} \quad \text{fuer } r > 0$$
2. Notwendige Bedingung $A'(r) = 0$:
$$A'(r) = 4\pi r - \frac{660}{r^2} = 0 \implies 4\pi r^3 = 660 \implies r^3 = \frac{660}{4\pi} = \frac{165}{\pi} \approx 52{,}52$$
$$r = \sqrt[3]{\frac{165}{\pi}} \approx 3{,}745\text{ cm} \approx 3{,}75\text{ cm}$$
3. Hinreichende Bedingung:
$$A''(r) = 4\pi + \frac{1320}{r^3}$$
Da $r > 0$, ist $A''(3{,}75) = 4\pi + 1320 / 52{,}52 \approx 12{,}57 + 25{,}13 = 37{,}7 > 0$. Es liegt ein lokales und globales Minimum vor.
4. Hoehe und Oberflaeche:
$$h = \frac{330}{\pi \cdot (3{,}745)^2} \approx 7{,}49\text{ cm} \approx 2 \cdot 3{,}745\text{ cm} = 2r$$
$$A_{\min} = 2\pi (3{,}745)^2 + \frac{660}{3{,}745} \approx 88{,}1 + 176{,}2 = 264{,}3\text{ cm}^2$$
Die optimale Dose besitzt einen Radius von ca. $3{,}75\text{ cm}$, eine Hoehe von ca. $7{,}49\text{ cm}$ und eine minimale Oberflaeche von ca. $264{,}3\text{ cm}^2$.

`Klausur-Satz: Bei einem Volumen von 330 cm³ wird die Oberflaeche fuer r ≈ 3,75 cm und h ≈ 7,49 cm mit rund 264,3 cm² minimal.`

## Schritt 5 — ausprobieren: Duell der Nachweisverfahren

VERGLEICH: Zweite Ableitung ($f''$) vs. Vorzeichenwechselkriterium (VZW)

- Methode A (Zweite Ableitung $f''(x_0)$):
  - Vorteil: Bei gebrochenrationalen Zielfunktionen oft sehr schnell berechenbar, da Potenzen im Nenner positiv bleiben ($r > 0$).
  - Klausur-Tipp: Wenn $A''(r) = 4\pi + 1320/r^3$, muss man nicht einmal die Dezimalzahl ausrechnen; der Satz "Da $r > 0$, ist $A''(r) > 0$" genuegt fuer volle Punktzahl!
- Methode B (Vorzeichenwechselkriterium VZW an $f'(x)$):
  - Vorteil: Funktioniert auch, wenn die zweite Ableitung extrem kompliziert wird oder an der Stelle $x_0$ verschwindet ($f''(x_0) = 0$).
  - Nachweis: Zeigen, dass $A'(r)$ fuer $r < r_0$ negativ ist (Graph faellt) und fuer $r > r_0$ positiv wird (Graph steigt) $\implies$ VZW von $-$ nach $+$ beweist Minimum.

Entscheidungsregel fuer die Klausur:
Bei Potenzen wie $1/r$ immer Methode A (zweite Ableitung) waehlen, da $1/r^3$ fuer alle $r>0$ positiv bleibt und die Rechnung in 5 Sekunden erledigt ist!

## Schritt 6 — check: Klausur-Transfer Extremwertaufgabe
PRÜFUNGSSZENARIO (KLP NRW Mathe EF / Abitur Analysis):

Ein Quader mit quadratischer Grundflaeche (Seitenlaenge $x$) und Hoehe $y$ soll als oben offene Paket-Schachtel aus Pappe gefaltet werden. Das Volumen der Schachtel muss genau $V = 4000\text{ cm}^3$ betragen.
AUFGABE (bestimmen & interpretieren, AFB II/III):
1. Bestimmen Sie die Abmessungen $x$ und $y$, fuer die der Pappenverbrauch minimal wird. (16 BE)
2. Vergleichen Sie das Verhaeltnis von Grundseite zu Hoehe ($x : y$) mit dem Ergebnis des geschlossenen Zylinders. (14 BE)

ERWARTUNGSHORIZONT:
- AFB II:
  - Hauptbedingung (oben offen!): $A(x, y) = x^2 + 4xy$.
  - Nebenbedingung: $V = x^2 \cdot y = 4000 \implies y = 4000 / x^2$.
  - Zielfunktion: $A(x) = x^2 + 4x(4000/x^2) = x^2 + 16000 / x$ mit $x > 0$.
  - Ableitungen: $A'(x) = 2x - 16000 / x^2 = 0 \implies 2x^3 = 16000 \implies x^3 = 8000 \implies x = 20\text{ cm}$.
  - Hinreichende Bedingung: $A''(x) = 2 + 32000 / x^3$; $A''(20) = 2 + 32000 / 8000 = 6 > 0 \implies$ Minimum.
  - Hoehe: $y = 4000 / 20^2 = 4000 / 400 = 10\text{ cm}$.
- AFB III:
  - Verhaeltnis: $x = 2y$ bzw. $y = 0{,}5x$. Die Hoehe ist genau halb so gross wie die Grundseite.
  - Vergleich: Waehrend beim geschlossenen Zylinder $h = d$ gilt (Hoehe gleich Breite), fuehrt das Fehlen des Deckels dazu, dass der Boden ($x^2$) gegenueber den vier Seitenwaenden relativ teurer wird; die Schachtel wird flacher.

## Schritt 7 — check: Format-Check & Scoring
30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welches Verhaeltnis von Hoehe $h$ zu Radius $r$ minimiert die Oberflaeche einer geschlossenen zylindrischen Dose?
ANTWORT: $h = 2r$ (die Hoehe muss genau gleich dem Durchmesser sein).

FRAGE: Welcher Schritt folgt bei Extremwertaufgaben unmittelbar nach dem Aufstellen der Haupt- und Nebenbedingung?
ANTWORT: Das Aufloesen der Nebenbedingung nach einer Variablen und Einsetzen in die Hauptbedingung, um die Zielfunktion mit nur noch einer freien Variablen zu erhalten.

FRAGE: Warum muss bei Extremwertaufgaben in der Klausur zwingend der Definitionsbereich (z.B. $r > 0$) angegeben und geprueft werden?
ANTWORT: Um Randextrema (z.B. Verhalten fuer $r \to 0$ oder $r \to \infty$) auszuschliessen und die physikalische Sinnhaftigkeit sicherzustellen.

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission
REFLEXION:
Du beherrschst nun das Kronjuwel der Analysis in der Einfuehrungsphase: Extremwertprobleme mit Nebenbedingungen. Du hast gelernt, abstrakte Geometrie und Differentialrechnung zu verbinden, um reale industrielle Optimierungsprobleme zu knacken.

<!-- reflexion: mathe-extremwert-dosenoptimierung -->
In der naechsten Episode untersuchen wir Funktionen nicht auf Minima, sondern rekonstruieren Funktionsgleichungen aus gegebenen Eigenschaften: Weiter geht es mit [Mathe-Steckbriefaufgaben-Verfahren-DE-L1](Mathe-Steckbriefaufgaben-Verfahren-DE-L1.md).
