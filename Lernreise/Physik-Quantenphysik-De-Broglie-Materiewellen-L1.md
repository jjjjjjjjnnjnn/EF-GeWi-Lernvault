---
fach: Physik
thema: "Quantenphysik: De-Broglie-Hypothese, Materiewellen und Elektronenbeugung"
level: 1
ziel: Klausur
xp: 100
operatoren: [herleiten, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Quantenphysik, De-Broglie, Materiewellen, Elektronenbeugung, Welle-Teilchen-Dualismus]
version: Lesson-v3
---

# Lernreise: Quantenphysik: De-Broglie-Hypothese, Materiewellen und Elektronenbeugung (L1, Ziel Klausur)

<!-- Campaign: Quanten-und-Materie | Episode 4/10 | Krise: Wenn Lichtteilchen Wellen sind, koennen dann massive Materieteilchen wie Elektronen auch gebeugt werden? | Zielgroessen: De-Broglie-Wellenlaenge, Elektronenbeugungsroehre, Bragg-Gleichung, Debye-Scherrer-Ringe, TEM | Tool: lego -->

## Schritt 1 — entdecken: Die geheimnisvollen Kreise der Elektronenkanone
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能完整阐述路易·德布罗意（Louis de Broglie）关于微观粒子“波粒二象性”（Welle-Teilchen-Dualismus）的假说，推导实物粒子的德布罗意波长公式（$\lambda = \frac{h}{p} = \frac{h}{\sqrt{2m \cdot e \cdot U}}$）。
2. 中文：能运用布拉格反射条件（Bragg-Bedingung: $2d \cdot \sin\theta = n \cdot \lambda$）精准计算电子衍射管（Elektronenbeugungsroehre）在多晶石墨薄膜上形成的德拜-谢乐环（Debye-Scherrer-Ringe）同心干涉半径。
3. 中文：能在现代物理综合大题（AFB I/II/III）中对比光学显微镜与透射电子显微镜（TEM）的分辨率极限，论述物质波的统计诠释（Wahrscheinlichkeitsinterpretation nach Max Born）。

### Hook / Phaenomen

Stell dir vor, du feuerst mit einem Maschinengewehr Tausende winzige Stahlkugeln auf ein metallisches Lueftungsgitter. Jede Kugel, die durch das Gitter fliegt, prallt an einer festen Wand dahinter ab und hinterlaesst eine scharfe Delle. Niemand wuerde jemals erwarten, dass die Stahlkugeln ploetzlich wie Wasserwellen ineinanderfliessen und auf der Wand ein filigranes Interferenzmuster aus konzentrischen Ringen erzeugen! Doch genau dieses physikalische Wunder geschieht im Jahr 1927 in den Bell Laboratories: Die Physiker Clinton Davisson und Lester Germer schiessen einen hochenergetischen Strahl aus massiven, handfesten Elektronen – unbestreitbaren Materieteilchen mit Masse und elektrischer Ladung – auf einen Nickelkristall. Als die Elektronen auf dem Detektorschirm aufschlagen, zeigt sich kein einfacher Fleck, sondern eine wunderschoene Folge strahlender Interferenzringe! Feste Materieteilchen verhalten sich im Flug wie Schwingungen. Der franzoesische Adlige Louis de Broglie hatte recht: Das gesamte Universum – jedes Elektron, jedes Atom, ja selbst dein eigener Koerper – besitzt eine fundamentale Wellenlaenge!

`Klausur-Satz: Jedem bewegten Materieteilchen mit dem Impuls p ist gemaess der De-Broglie-Gleichung lambda = h / p eine Materiewelle zugeordnet, deren Interferenzfaehigkeit durch Beugungsexperimente an Kristallgittern nachgewiesen wird.`

## Schritt 2 — entdecken: Der quantenmechanische Werkzeugkasten
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 德布罗意波长 — De-Broglie-Wellenlaenge ($\lambda$): 具有动量 $p = m \cdot v$ 的运动实物粒子所对应的等效物质波波长：$\lambda = \frac{h}{p}$。 Die Wellenlaenge einer quantenmechanischen Materiewelle, umgekehrt proportional zum Impuls des Teilchens.
- 电子衍射管 — Elektronenbeugungsroehre: 利用数千伏高压加速电子枪射出的电子束穿过多晶石墨靶，从而在荧光屏上观察干涉同心圆环的实验装置。 Eine evakuierte Roehre zur Demonstration von Welleneigenschaften beschleunigter Elektronen an einer duennen polykristallinen Graphitfolie.
- 布拉格反射条件 — Bragg-Bedingung ($2d \cdot \sin\theta = n \cdot \lambda$): X射线或物质波在晶格原子面发生相长干涉的几何极值判据。 Die Interferenzbedingung fuer konstruktive Reflexion an parallelen Netzebenen eines Raumgitters mit dem Netzebenenabstand $d$.
- 概率波诠释 — Wahrscheinlichkeitswelle (nach Max Born): 物质波振幅的绝对值平方 $|\psi|^2$ 表示在空间某一位置找到该实物粒子的概率密度。 Die Deutung der Materiewelle als Feld von Wahrscheinlichkeitsdichten, das den Aufenthaltsort des Teilchens bestimmt.

## Schritt 3 — entdecken: Die Herleitung der Materiewellenlaenge
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Elektronenbeugungsroehre mit Graphitkristall:

[ Elektronenkanone ] ---> Beschleunigungsspannung U_B (ca. 3 bis 5 kV)
       |
       v (Kinetische Energie: E_kin = e * U_B)
[ Graphitfolie ] (Zwei dominante Netzebenenabstaende d1 = 123 pm, d2 = 213 pm)
       |
       |  Beugung nach Bragg: 2*d*sin(theta) = k*lambda
       v
[ Leuchtschirm ] -> ZWEI KONZENTRISCHE RINGE (Debye-Scherrer-Ringe r1 und r2)!
```

Herleitung der Wellenlaenge aus der Beschleunigungsspannung $U_B$:
$$E_{\text{kin}} = e \cdot U_B = \frac{1}{2} m_e v^2 = \frac{p^2}{2m_e} \implies p = \sqrt{2 m_e \cdot e \cdot U_B}$$
$$\lambda = \frac{h}{p} = \frac{h}{\sqrt{2 m_e \cdot e \cdot U_B}}$$

`Klausur-Satz: Je hoeher die Beschleunigungsspannung U_B gewaehlt wird, desto groesser ist der Impuls p der Elektronen und desto kleiner wird ihre De-Broglie-Wellenlaenge lambda, was die Interferenzringe auf dem Schirm enger zusammenruecken laesst.`

## Schritt 4 — ausprobieren: Das Quanten-Labor der Elektronenbeugung

[Werkzeug: lego]

AUFGABE (herleiten & berechnen, AFB I/II):
In einer Elektronenbeugungsroehre werden ruhende Elektronen mit einer Hochspannung von $U_B = 4000\,\text{V}$ ($4{,}0\,\text{kV}$) beschleunigt.
Naturkonstanten:
- Plancksches Wirkungsquantum: $h = 6{,}626 \times 10^{-34}\,\text{J}\cdot\text{s}$
- Elektronenmasse: $m_e = 9{,}109 \times 10^{-31}\,\text{kg}$
- Elementarladung: $e = 1{,}602 \times 10^{-19}\,\text{C}$
- Netzebenenabstand Graphit: $d_1 = 2{,}13 \times 10^{-10}\,\text{m}$ ($213\,\text{pm}$)
1. Berechne die Geschwindigkeit $v$ der Elektronen und pruefe, ob eine relativistische Rechnung notwendig ist ($v < 0{,}1c$).
2. Berechne die De-Broglie-Wellenlaenge $\lambda$ der Elektronen.
3. Bestimme den Beugungswinkel $\theta_1$ fuer das Maximum 1. Ordnung ($n = 1$).

MUSTERLOESUNG:
1. Geschwindigkeit:
   $$v = \sqrt{\frac{2 \cdot e \cdot U_B}{m_e}} = \sqrt{\frac{2 \cdot 1{,}602 \times 10^{-19}\,\text{C} \cdot 4000\,\text{V}}{9{,}109 \times 10^{-31}\,\text{kg}}} = \sqrt{\frac{1{,}2816 \times 10^{-15}}{9{,}109 \times 10^{-31}}} \approx 3{,}75 \times 10^7\,\text{m/s}$$
   - Lichtgeschwindigkeit: $c \approx 3{,}0 \times 10^8\,\text{m/s}$.
   - Verhaeltnis: $\frac{v}{c} = \frac{3{,}75 \times 10^7}{3{,}0 \times 10^8} = 0{,}125$ (ca. 12,5 % der Lichtgeschwindigkeit; die nicht-relativistische Naeherung ist fuer Schulphysik hinreichend genau).
2. De-Broglie-Wellenlaenge:
   $$\lambda = \frac{h}{m_e \cdot v} = \frac{6{,}626 \times 10^{-34}\,\text{J}\cdot\text{s}}{9{,}109 \times 10^{-31}\,\text{kg} \cdot 3{,}75 \times 10^7\,\text{m/s}} \approx 1{,}94 \times 10^{-11}\,\text{m} = 0{,}0194\,\text{nm} = 19{,}4\,\text{pm}$$
3. Bragg-Winkel:
   $$2d_1 \cdot \sin(\theta_1) = 1 \cdot \lambda \implies \sin(\theta_1) = \frac{\lambda}{2d_1} = \frac{1{,}94 \times 10^{-11}\,\text{m}}{2 \cdot 2{,}13 \times 10^{-10}\,\text{m}} = \frac{1{,}94}{4{,}26} \approx 0{,}0455$$
   $$\theta_1 = \arcsin(0{,}0455) \approx 2{,}61^\circ$$

## Schritt 5 — ausprobieren: Duell der Naturauffassungen: Partikel vs. Welle

VERGLEICH: Klassisches Punktteilchen vs. Quantenmechanische Materiewelle (选概念)

- Position A (Klassische Mechanik nach Newton):
  - Modell: Jedes Teilchen hat zu jedem Zeitpunkt einen exakten Ort $x(t)$ und eine exakte Geschwindigkeit $v(t)$ (strikte Bahnkurve).
  - Grenze: Kann das Auftreten von Interferenzstreifen oder Beugungsringen beim Durchgang einzelner Teilchen fundamental nicht erklaeren.
- Position B (Quantenmechanik nach De Broglie, Born & Heisenberg):
  - Modell: Das Teilchen breitet sich als Welle von Moeglichkeiten im Raum aus; erst der Messprozess auf dem Schirm zwingt die Welle zur Lokalisation an einem diskreten Leuchtpunkt.
  - Grenze: Heisenbergsche Unschaerferelation verbietet die gleichzeitige exakte Bestimmung von Ort und Impuls ($\Delta x \cdot \Delta p \ge \frac{h}{4\pi}$).

Entscheidungsregel fuer die Klausur:
Wird nach `Welle-Teilchen-Dualismus bei Elektronen` gefragt, formuliere praezise: "Elektronen bewegen und beugen sich wie Wellen (Interferenzmuster), wechselwirken und deponieren ihre Energie beim Auftreffen jedoch immer als unteilbare, lokalisierte Teilchen!"

## Schritt 6 — check: Klausur-Transfer Transmissionselektronenmikroskop (TEM)

PRUEFUNGSSZENARIO (KLP NRW Physik LK Inhaltsfeld 3: Quantenphysik):

### AFB I: Faktenwissen
Erläutere die Formel $\lambda = \frac{h}{p}$ und begruende, warum wir im menschlichen Alltag an Makro-Objekten (z. B. einem rollenden Fussball) niemals Materiewellen-Interferenzen beobachten koennen.

### AFB II: Technologischer Vergleich
Lichtmikroskope nutzen sichtbares Licht ($\lambda \approx 500\,\text{nm}$) und koennen Strukturen unterhalb von ca. $250\,\text{nm}$ (Abbe-Limit) nicht mehr aufloesen.
Zeige rechnerisch anhand deiner Ergebnisse aus Schritt 4, um welchen Faktor das Aufloesungsvermoegen eines TEM mit $U_B = 4\,\text{kV}$ theoretisch hoeher ist als das eines Lichtmikroskops.

### AFB III: Philosophisch-Wissenschaftliches Urteil
Bewerte das "Doppelspalt-Experiment mit einzelnen Elektronen" von Joensson (1961) und Tonomura (1989): Wenn zu jedem Zeitpunkt immer nur ein einziges Elektron das Experiment durchquert und trotzdem nach tausend Durchgaengen ein Interferenzmuster entsteht – mit wem oder was interferiert das Elektron dann?

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Wie veraendert sich der Durchmesser der Debye-Scherrer-Ringe auf dem Schirm, wenn man die Beschleunigungsspannung UB erhoeht?
ANTWORT: Der Ringdurchmesser wird kleiner! Hoehere Spannung bedeutet hoehere Geschwindigkeit und hoeheren Impuls, was zu einer kleineren De-Broglie-Wellenlaenge fuehrt (lambda sinkt). Kleinere Wellenlaenge fuehrt nach Bragg zu kleineren Beugungswinkeln.

FRAGE: Warum verwendet man fuer Elektronenbeugung Kristallgitter (wie Graphit) und keine kuenstlich geritzten optischen Gitter?
ANTWORT: Weil die De-Broglie-Wellenlaengen von schnellen Elektronen im Pikometer-Bereich (ca. 10 bis 50 pm) liegen. Kuenstliche Gitter haben Spaltabstaende im Mikrometerbereich; nur die winzigen Atomabstaende in Kristallen sind klein genug, um messbare Beugungswinkel zu erzeugen.

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du hast das Herzstueck der Quantenmechanik durchdrungen. Du kannst De-Broglie-Wellenlaengen berechnen, Kristallbeugungen geometrisch konstruieren und die radikale Natur des Welle-Teilchen-Dualismus begruenden.

Im kommenden Physik-Modul untersuchen wir die Heisenbergsche Unschaerferelation und den Uebergang zum quantenmechanischen Atommodell der Orbitale nach Erwin Schroedinger.
