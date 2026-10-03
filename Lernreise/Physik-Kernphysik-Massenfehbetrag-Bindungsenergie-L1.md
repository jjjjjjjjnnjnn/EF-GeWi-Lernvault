---
fach: Physik
thema: "Kernphysik: Massendefekt, Bindungsenergie und Kernspaltung"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Kernphysik, Massendefekt, Bindungsenergie, Einsteins-Formel, Kernspaltung]
version: Lesson-v3
---

# Lernreise: Kernphysik: Massendefekt, Bindungsenergie und Kernspaltung (L1, Ziel Klausur)

<!-- Campaign: Kern-und-Teilchenphysik | Episode 5/10 | Krise: Wohin verschwindet die Masse, wenn man Atomkerne zusammenbaut? | Zielgroessen: Massendefekt, Bindungsenergie, E=mc^2, Bindungsenergie pro Nukleon, Kernspaltung | Tool: balance-board -->

## Schritt 1 — entdecken: Das Raetsel der verschwundenen Atommasse
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清质量亏损（Massendefekt $\Delta m$）与原子核结合能（Bindungsenergie $E_B = \Delta m \cdot c^2$）的物理本质。
2. 中文：能绘制并精准解读每个核子的平均结合能曲线（Bindungsenergie pro Nukleon ueber der Massenzahl $A$），解释为什么轻核聚变与重核裂变都能释放巨大能量。
3. 中文：能在现代物理综合大题（AFB I/II/III）中定量计算铀-235 裂变反应方程的能量释放（$\text{MeV}$）与质量亏损比率。

### Hook / Phaenomen

Stell dir vor, du kaufst im Supermarkt vier separate Lego-Bausteine: zwei rote und zwei blaue. Jeder einzelne Baustein wiegt auf der Praezisionswaage exakt zehn Gramm. Wenn du alle vier Steine zusammen auf die Waage legst, wiegen sie zusammen natuerlich genau vierzig Gramm. Nun drueckst du die vier Steine fest zu einem einzigen grossen Block zusammen und wiegst ihn erneut. Zu deinem voelligen Erstaunen zeigt die Waage ploetzlich nur noch 39,7 Gramm an! Drei Zehntelgramm Materie sind einfach spurlos verschwunden, nur weil die Steine jetzt fest zusammenhalten. Genau dieses scheinbar unmoegliche Wunder geschieht jedes Mal, wenn sich zwei Protonen und zwei Neutronen zu einem Helium-4-Atomkern vereinigen. Die fehlende Masse ist nicht vernichtet worden – sie hat sich nach Albert Einsteins beruehmter Gleichung $E = \Delta m \cdot c^2$ in reine, gleissende Bindungsenergie verwandelt. Derselbe Masseverlust laesst unsere Sonne seit viereinhalb Milliarden Jahren strahlen und speist die unvorstellbare Zerstoerungskraft atomaren Feuers.

`Klausur-Satz: Die Masse eines stabilen Atomkerns ist stets kleiner als die Summe der Ruhemassen seiner isolierten Nukleonen; die Massendifferenz entspricht der bei der Kernentstehung freigesetzten Bindungsenergie.`

## Schritt 2 — entdecken: Grundbegriffe der Kernphysik
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 质量亏损 — Massendefekt ($\Delta m$): 组成原子核的所有核子的静止质量之和与原子核实际测定质量之间的差值。 Die Differenz zwischen der Gesamtmasse der einzelnen freien Nukleonen und der tatsaechlichen Ruhemasse des gebundenen Kerns: $\Delta m = Z \cdot m_p + N \cdot m_n - m_{\text{Kern}}$.
- 原子核结合能 — Bindungsenergie ($E_B$): 将一个原子核完全拆散为自由质子和中子所必须提供的能量，也是核子结合成核时释放的能量。 Die Energie, die frei wird, wenn sich freie Nukleonen zu einem Atomkern verbinden ($E_B = \Delta m \cdot c^2$).
- 核子平均结合能 — Bindungsenergie pro Nukleon ($E_B / A$): 结合能除以质量数，是衡量原子核结构稳定性的绝对尺度。 Das Verhaeltnis von Bindungsenergie zur Nukleonenzahl $A$, maximal bei Eisen-56 ($^{56}\text{Fe}$ mit ca. $8{,}8\,\text{MeV}$ pro Nukleon).
- 原子质量单位 — Atomare Masseneinheit ($u$): 碳-12 原子质量的十二分之一，对应约 $931{,}49\,\text{MeV}$ 的静止能量。 Ein Zwölftel der Masse eines Kohlenstoff-12-Atoms ($1\,\text{u} \approx 1{,}6605 \times 10^{-27}\,\text{kg} \approx 931{,}49\,\text{MeV}/c^2$).

## Schritt 3 — entdecken: Die Kurve der mittleren Bindungsenergie
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Bindungsenergie pro Nukleon (E_B / A in MeV):

9 ^                     [ Fe-56 (8,8 MeV) ]  <- Maximum der Stabilitaet!
  |                          . - ~ - .
8 |                    . '             ' .   [ U-235 (7,6 MeV) ]
  |              [ He-4 ]                    ' - .
7 |               /                                  \   KERNSPALTUNG
  |              /                                    \  (schwere Kerne zerfallen)
  |             /
  |    KERNFUSION
  |    (leichte Kerne verschmelzen)
0 +----+---------+-----+-------------------------+------> Massenzahl A
  0   1 (H-1)    4     56                       235
```

`Klausur-Satz: Da Eisen-56 das energetische Minimum und damit die stabilste Kernkonfiguration darstellt, wird bei der Fusion leichterer Kerne ebenso Energie frei wie bei der Spaltung schwerer Kerne.`

## Schritt 4 — ausprobieren: Der Massendefekt-Rechner

[Werkzeug: balance-board]

AUFGABE (berechnen & erklaeren, AFB I/II):
Gegeben sind die Ruhemassen:
- Freies Proton: $m_p = 1{,}007276\,\text{u}$
- Freies Neutron: $m_n = 1{,}008665\,\text{u}$
- Helium-4-Kern ($^4_2\text{He}$): $m_{\alpha} = 4{,}001506\,\text{u}$
- Energieaequivalent: $1\,\text{u} \cdot c^2 = 931{,}49\,\text{MeV}$
1. Berechne den Massendefekt $\Delta m$ des Helium-Kerns in atomaren Masseneinheiten $u$ und in Kilogramm.
2. Ermittle die gesamte Bindungsenergie $E_B$ in $\text{MeV}$ sowie die Bindungsenergie pro Nukleon.

MUSTERLOESUNG:
1. Berechnung des Massendefekts:
   - Summe der freien Einzelbausteine ($Z = 2$ Protonen, $N = 2$ Neutronen):
     $$m_{\text{Summe}} = 2 \cdot 1{,}007276\,\text{u} + 2 \cdot 1{,}008665\,\text{u} = 2{,}014552\,\text{u} + 2{,}017330\,\text{u} = 4{,}031882\,\text{u}$$
   - Massendefekt:
     $$\Delta m = m_{\text{Summe}} - m_{\alpha} = 4{,}031882\,\text{u} - 4{,}001506\,\text{u} = 0{,}030376\,\text{u}$$
   - In Kilogramm:
     $$\Delta m = 0{,}030376 \cdot 1{,}6605 \times 10^{-27}\,\text{kg} \approx 5{,}044 \times 10^{-29}\,\text{kg}$$
2. Berechnung der Bindungsenergie:
   - Gesamtbindungsenergie:
     $$E_B = \Delta m \cdot 931{,}49\,\text{MeV/u} = 0{,}030376\,\text{u} \cdot 931{,}49\,\text{MeV/u} \approx 28{,}29\,\text{MeV}$$
   - Bindungsenergie pro Nukleon ($A = 4$):
     $$\frac{E_B}{A} = \frac{28{,}29\,\text{MeV}}{4} \approx 7{,}07\,\text{MeV/Nukleon}$$

## Schritt 5 — ausprobieren: Duell der Kernprozesse: Spaltung vs. Fusion

VERGLEICH: Kernspaltung (Schwere Kerne) vs. Kernfusion (Leichte Kerne) (选概念)

- Position A (Kernspaltung von Uran / Plutonium):
  - Ausgangskerne: Schwere Kerne rechts vom Eisen-56-Gipfel ($A \approx 235$).
  - Mechanismus: Beschuss mit thermischem Neutron fuehrt zur Schwingung und Spaltung in leichtere Spaltprodukte (z. B. Barium und Krypton).
  - Ausbeute: Ca. $0{,}8\,\text{MeV}$ pro Nukleon (ca. $200\,\text{MeV}$ pro Spaltung).
  - Problem: Langlebiger radioaktiver Muell (Spaltprodukte, Transurane).
- Position B (Kernfusion von Deuterium / Tritium):
  - Ausgangskerne: Ultraleichte Kerne links vom Eisen-Gipfel ($A \le 4$).
  - Mechanismus: Ueberwindung der Coulomb-Abstossung bei extremen Temperaturen (> 100 Mio. Kelvin) fuehrt zur Verschmelzung.
  - Ausbeute: Ca. $3{,}5\,\text{MeV}$ pro Nukleon (vierfach hoehere spezifische Energie als Spaltung!).
  - Problem: Extrem anspruchsvoller Plasmaeinschluss (Tokamak/Stellarator).

Entscheidungsregel fuer die Klausur:
Wird nach `Energieabgabe bei Kernreaktionen` gefragt, argumentiere immer ueber die Steigung der Bindungsenergiekurve: Energie wird immer dann freigesetzt, wenn die Produkte naeher am Maximum bei Eisen-56 liegen als die Ausgangsstoffe!

## Schritt 6 — check: Klausur-Transfer Energiebilanz der Uran-Spaltung

PRUEFUNGSSZENARIO (KLP NRW Physik LK Inhaltsfeld 4: Kernphysik):

### AFB I: Reaktionsgleichung
Ergaenze die vollstaendige Spaltungsgleichung fuer Uran-235 beim Einfang eines thermischen Neutrons:
$^{235}_{92}\text{U} + ^1_0\text{n} \to ^{141}_{56}\text{Ba} + ^{92}_{36}\text{Kr} + x \cdot ^1_0\text{n} + \gamma$
Bestimme die Anzahl $x$ der freigesetzten Sekundaerneutronen.

### AFB II: Quantitative Energieberechnung
Berechne die bei dieser Einzelspaltung freiwerdende Energie in Joule, wenn der Massenverlust der Gesamtreaktion $\Delta M = 0{,}215\,\text{u}$ betraegt.

### AFB III: Kritisches Gesamturteil
Diskutiere die zivilisatorische Bedeutung von Fusionskraftwerken gegenueber konventionellen Kernkraftwerken hinsichtlich Rohstoffverfuegbarkeit, inhärenter physikalischer Sicherheit (kein Tschernobyl-Super-GAU moeglich) und Endlagerproblematik.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Was versteht man unter dem Massendefekt eines Atomkerns?
ANTWORT: Die Differenz zwischen der Summe der Ruhemassen aller freien Protonen und Neutronen und der tatsaechlich gemessenen, geringeren Ruhemasse des gebundenen Kerns.

FRAGE: Welches chemische Element besitzt den Atomkern mit der hoechsten Bindungsenergie pro Nukleon?
ANTWORT: Eisen-56 (und Nickel-62) mit ca. 8,8 MeV pro Nukleon.

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du verstehst nun das fundamentale Prinzip von Einsteins Masse-Energie-Aequivalenz und kannst energetische Bilanzen in der Kernphysik souveraen berechnen.

Im kommenden Modul verlassen wir die Kernphysik und tauchen ein in das Standardmodell der Elementarteilchen: Quarks, Leptonen und die fundamentalen Kraefte der Natur.
