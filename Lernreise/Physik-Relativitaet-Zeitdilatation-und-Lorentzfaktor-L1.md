---
fach: Physik
thema: "Spezielle Relativitaetstheorie: Lichtuhr, Zeitdilatation und Lorentzfaktor"
level: 1
ziel: Klausur
xp: 100
operatoren: [herleiten, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Relativitaetstheorie, Zeitdilatation, Lichtuhr, Lorentzfaktor, Myonenzerfall]
version: Lesson-v3
---

# Lernreise: Spezielle Relativitaetstheorie: Lichtuhr, Zeitdilatation und Lorentzfaktor (L1, Ziel Klausur)

<!-- Campaign: Relativitaet-und-Raumzeit | Episode 3/10 | Krise: Warum vergeht die Zeit fuer einen rasenden Astronauten langsamer als fuer die Daheimgebliebenen auf der Erde? | Zielgroessen: Einsteins Postulate, Lichtuhr, Lorentzfaktor gamma, Zeitdilatation, Eigenzeit, Myonen-Experiment | Tool: balance-board -->

## Schritt 1 — entdecken: Das Raetsel der langlebigen Myonen
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清阿尔伯特·爱因斯坦（Albert Einstein）狭义相对论的两大公设：相对性原理（Relativitaetsprinzip）与光速不变原理（Konstanz der Lichtgeschwindigkeit im Vakuum $c \approx 300.000\,\text{km/s}$）。
2. 中文：能运用毕达哥拉斯定理在“光钟思想实验”（Gedankenexperiment der Lichtuhr）中几何推导洛伦兹因子（Lorentzfaktor $\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$）与时间膨胀公式（Zeitdilatation: $\Delta t = \gamma \cdot \Delta t_0$）。
3. 中文：能在现代物理高考综合大题（AFB I/II/III）中结合高空宇宙射线产生的 $\mu$ 子衰变（Myonenzerfall）与GPS卫星相对论钟差校正，定量计算原时（Eigenzeit）与尺缩效应（Laengenkontraktion）。

### Hook / Phaenomen

In zehn Kilometern Hoehe ueber der Erde kollidieren energiereiche kosmische Protonen mit den Atomkernen der Atmosphaere. Bei diesem gewaltigen Teilchengewitter entstehen instabile Elementarteilchen: sogenannte Myonen. Diese Myonen rasen mit 99,8 Prozent der Lichtgeschwindigkeit senkrecht auf die Erdoberflaeche zu. Doch die Teilchenphysik stellt ein unumstoessliches Urteil: Ein Myon besitzt eine extrem fluechtige Ruhelebensdauer von gerade einmal 2,2 Mikrosekunden ($2{,}2 \times 10^{-6}\,\text{Sekunden}$), bevor es unweigerlich in ein Elektron und zwei Neutrinos zerfaellt. Selbst wenn das Myon mit exakter Lichtgeschwindigkeit fliegen wuerde, koennte es in dieser winzigen Spanne maximal eine Strecke von rund 660 Metern zuruecklegen – es muesste laengst in den eisigen Hoehen der Troposphaere pulverisiert worden sein. Doch am Meeresstrand auf Meereshoehe messen Detektoren jede Sekunde Tausende dieser kosmischen Geisterteilchen! Wie kann ein Teilchen zehn Kilometer zuruecklegen, wenn seine Lebenszeit mathematisch nur fuer einen halben Kilometer reicht? Die Antwort sprengt jeden gesunden Menschenverstand: Fuer das rasende Myon vergeht die Zeit langsamer als fuer uns!

`Klausur-Satz: Da die Lichtgeschwindigkeit c in allen Inertialsystemen invariant ist, vergeht die Zeit in einem relativ zu einem Beobachter bewegten System gedehnt; fuer bewegte Uhren gilt die Zeitdilatation delta t = gamma * delta t_0.`

## Schritt 2 — entdecken: Der relativistische Grundbegriffskasten
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 相对性原理与光速不变 — Einsteins Postulate: 1. In allen Inertialsystemen gelten dieselben physikalischen Gesetze. 2. Die Vakuumlichtgeschwindigkeit $c$ ist in allen Inertialsystemen exakt gleich gross – vollkommen unabhaengig von der Bewegung der Lichtquelle oder des Beobachters.
- 光钟思想实验 — Lichtuhr: Eine hypothetische Uhr aus zwei parallelen Spiegeln im Abstand $L$, zwischen denen ein einzelner Lichtblitz auf und ab reflektiert wird; jeder Hin- und Rueckweg definiert einen Zeittakt.
- 洛伦兹因子 — Lorentzfaktor ($\gamma$): Der relativistische Korrekturfaktor $\gamma = \frac{1}{\sqrt{1 - \frac{v^2}{c^2}}}$, der angibt, um welchen Faktor Zeit und dynamische Masse anwachsen ($\gamma \ge 1$).
- 原时 — Eigenzeit ($\Delta t_0$): Die Zeitspanne zwischen zwei Ereignissen, die von einer Uhr gemessen wird, die sich am selben Ort wie die Ereignisse befindet (Uhr ruht im Bezugssystem des Prozesses).

## Schritt 3 — entdecken: Die geometrische Herleitung an der Lichtuhr
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Herleitung der Zeitdilatation ueber den Satz des Pythagoras:

Ruhendes System (Astronaut im Raumschiff):
   [ Oberer Spiegel ]
          ^
          |  Weg des Lichtblitzes: L = c * (delta t_0 / 2)
          v
   [ Unterer Spiegel ]

Bewegtes System (Beobachter auf der Erde, Raumschiff fliegt mit v):
            [ Spiegel ]                       [ Spiegel ]
                 / \                               |
                /   \                              |
               /     \  Hypothenuse:               | Hoehe:
              /       \ s = c * (delta t / 2)      | L = c * (delta t_0 / 2)
             /         \                           |
   [ Spiegel ]          [ Spiegel ]                |
        |<=== v * (delta t / 2) ===>|              |
           Katagete (Bewegungsweg)
```

Satz des Pythagoras im rechtwinkligen Dreieck:
$$\left(c \cdot \frac{\Delta t}{2}\right)^2 = \left(c \cdot \frac{\Delta t_0}{2}\right)^2 + \left(v \cdot \frac{\Delta t}{2}\right)^2$$
$$c^2 \cdot \Delta t^2 = c^2 \cdot \Delta t_0^2 + v^2 \cdot \Delta t^2 \iff (c^2 - v^2) \cdot \Delta t^2 = c^2 \cdot \Delta t_0^2$$
$$\Delta t^2 = \frac{c^2}{c^2 - v^2} \cdot \Delta t_0^2 = \frac{1}{1 - \frac{v^2}{c^2}} \cdot \Delta t_0^2 \implies \Delta t = \frac{\Delta t_0}{\sqrt{1 - \frac{v^2}{c^2}}} = \gamma \cdot \Delta t_0$$

`Klausur-Satz: Die Eigenzeit delta t_0 ist die kuerzeste messbare Zeitspanne zwischen zwei Ereignissen; fuer jeden dazu bewegten Beobachter erscheint der Vorgang zeitlich verlaengert (Zeitdilatation).`

## Schritt 4 — ausprobieren: Das Myonen-Berechnungslabor

[Werkzeug: balance-board]

AUFGABE (herleiten & berechnen, AFB I/II):
Kosmische Myonen entstehen in einer Hoehe von $h = 10{,}0\,\text{km}$ und rasen mit $v = 0{,}998\,c$ in Richtung Erdoberflaeche.
Die Eigenlebensdauer eines ruhenden Myons betraegt $\Delta t_0 = 2{,}20\,\mu\text{s} = 2{,}20 \times 10^{-6}\,\text{s}$.
Lichtgeschwindigkeit: $c = 3{,}00 \times 10^8\,\text{m/s}$.
1. Berechne den Lorentzfaktor $\gamma$ fuer diese Geschwindigkeit.
2. Ermittle die Lebensdauer $\Delta t$ des Myons aus der Sicht eines irdischen Beobachters.
3. Berechne die Strecke $s_{\text{Erde}}$, die das Myon waehrend seiner verlaengerten Lebensdauer zuruecklegt, und beweise rechnerisch, dass es die Erdoberflaeche muehelos erreicht.

MUSTERLOESUNG:
1. Berechnung des Lorentzfaktors:
   $$\frac{v}{c} = 0{,}998 \implies \left(\frac{v}{c}\right)^2 = 0{,}998^2 = 0{,}996004$$
   $$\gamma = \frac{1}{\sqrt{1 - 0{,}996004}} = \frac{1}{\sqrt{0{,}003996}} \approx \frac{1}{0{,}06321} \approx 15{,}82$$
2. Lebensdauer aus Erdsicht (Zeitdilatation):
   $$\Delta t = \gamma \cdot \Delta t_0 = 15{,}82 \cdot 2{,}20\,\mu\text{s} \approx 34{,}8\,\mu\text{s} = 3{,}48 \times 10^{-5}\,\text{s}$$
   (Die Zeit fuer das Myon laeuft aus unserer Perspektive fast sechzehnmal langsamer!).
3. Reichweite auf der Erde:
   $$s_{\text{Erde}} = v \cdot \Delta t = (0{,}998 \cdot 3{,}00 \times 10^8\,\text{m/s}) \cdot 3{,}48 \times 10^{-5}\,\text{s} \approx 2{,}994 \times 10^8 \cdot 3{,}48 \times 10^{-5} \approx 10.420\,\text{m} = 10{,}42\,\text{km}$$
   - Da die Reichweite von $10{,}42\,\text{km}$ groesser ist als die Entstehungshoehe von $10{,}0\,\text{km}$, erreichen zahlreiche Myonen vor ihrem Zerfall den Erdboden. Das Experiment bestaetigt die Zeitdilatation mit hoechster Praezision.

## Schritt 5 — ausprobieren: Duell der Weltbilder: Newtons Absolutheit vs. Einsteins Relativitaet

VERGLEICH: Absoluter Newtonscher Zeitbegriff vs. Relativistische Raumzeit (选概念)

- Position A (Klassische Physik nach Isaac Newton):
  - These: Die Zeit ist absolut, wahr und mathematisch; sie verfliesst an jedem Ort des Universums fuer jeden Beobachter vollkommen gleichmaessig ("Universelle Weltzeituhr").
  - Grenze: Scheitert voellig am Michelson-Morley-Experiment und am Myonenzerfall.
- Position B (Spezielle Relativitaetstheorie nach Albert Einstein):
  - These: Es gibt keine absolute Zeit; Zeit ist untrennbar mit dem Raum zur vierdimensionalen Raumzeit verwoben.
  - Axiom: Weil die Lichtgeschwindigkeit $c$ fuer alle Beobachter starr denselben Wert haben muss, muessen Raum ($L$) und Zeit ($t$) elastisch nachgeben.

Entscheidungsregel fuer die Klausur:
Wird nach der `Perspektive des Myons selbst` gefragt, erklaere: Aus Sicht des Myons altert es ganz normal in $2{,}2\,\mu\text{s}$ (seine eigene Uhr geht nicht langsamer!); fuer das Myon schrumpft jedoch durch die relativistische Laengenkontraktion die Atmosphaere von $10\,\text{km}$ auf nur $632\,\text{Meter}$ zusammen!

## Schritt 6 — check: Klausur-Transfer Zwillingsparadoxon und GPS-Satelliten

PRUEFUNGSSZENARIO (KLP NRW Physik LK Inhaltsfeld 5: Relativitaetstheorie):

### AFB I: Postulate wiedergeben
Formuliere Einsteins zwei Postulate der Speziellen Relativitaetstheorie in korrekter physikalischer Fachsprache.

### AFB II: Das Zwillingsparadoxon aufloesen
Ein Zwilling fliegt mit $v = 0{,}8c$ zu einem 4 Lichtjahre entfernten Stern und kehrt um. Bei seiner Rueckkehr ist sein auf der Erde gebliebener Zwillingsbruder um Jahre aelter als er.
Erklaere, warum dieses Szenario kein echter Widerspruch ist und warum die beiden Bezugssysteme aufgrund der Umkehrbeschleunigung nicht symmetrisch sind.

### AFB III: GPS-Zeitsynchronisation
Die Atomuhren an Bord von GPS-Satelliten bewegen sich mit ca. $14.000\,\text{km/h}$ relativ zur Erde, wodurch sie gemaess der speziellen Relativitaetstheorie taeglich um rund $7\,\mu\text{s}$ nachgehen.
Beurteile die fatalen Konsequenzen fuer das weltweite Navigationssystem, wenn die Ingenieure diese relativistische Zeitdilatation in den Satellitencomputern nicht taeglich mathematisch kompensieren wuerden.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Was versteht man unter dem Begriff "Eigenzeit" delta t_0?
ANTWORT: Die Zeitspanne zwischen zwei Ereignissen, die von einer Uhr gemessen wird, die sich waehrend der beiden Ereignisse in Ruhe am selben Raumpunkt befindet.

FRAGE: Warum kann kein Koerper mit Ruhemasse jemals die exakte Lichtgeschwindigkeit c im Vakuum erreichen?
ANTWORT: Weil der Lorentzfaktor gamma fuer v gegen c gegen Unendlich strebt; die relativistische Masse bzw. Energie wuerde unendlich gross werden, sodass unendlich viel Beschleunigungsarbeit erforderlich waere.

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du hast die revolutionaere Architektur von Einsteins Raumzeit gemeistert. Du kannst Zeitdilatation herleiten, Myonenexperimente berechnen und relativistische Paradoxa physikalisch sauber entzaubern.

Im kommenden Physik-Modul untersuchen wir die Allgemeine Relativitaetstheorie: Das Aequivalenzprinzip von Traegheit und Schwere, Raumzeitkruemmung und Gravitationslinsen.
