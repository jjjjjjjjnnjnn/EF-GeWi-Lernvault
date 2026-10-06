---
fach: Physik
thema: "Wellenoptik: Doppelspalt-Interferenz und Beugung des Lichts"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, herleiten, berechnen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Wellenoptik, Doppelspalt, Interferenz, Beugung, Kohaerenz]
version: Lesson-v3
---

# Lernreise: Wellenoptik: Doppelspalt-Interferenz und Beugung des Lichts (L1, Ziel Klausur)

<!-- Campaign: Optik-und-Quanten | Episode 3/10 | Krise: Wie koennen zwei helle Lichtstrahlen zusammen voellige Dunkelheit erzeugen? | Zielgroessen: Doppelspalt, Interferenz, Beugung, Wellenlaenge, Gangunterschied, Kohaerenz | Tool: lego -->

## Schritt 1 — entdecken: Das paradoxe Streifenmuster an der Wand
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清惠更斯-菲涅耳原理（Huygens-Fresnelsches Prinzip）、相干光（Kohaerenz）与双缝干涉（Doppelspalt-Interferenz）的波动物理本质。
2. 中文：能完整推导双缝干涉明暗条纹位置与波长公式（$s_k = k \cdot \lambda \cdot \frac{a}{d}$），理解光程差（Gangunterschied $\Delta s = d \cdot \sin(\alpha)$）的几何意义。
3. 中文：能在现代物理综合大题（AFB I/II/III）中对比单缝衍射（Einzelspalt）、双缝干涉与光栅衍射（Gitter）的强度包络线及分辨率极限。

### Hook / Phaenomen

Du verdunkelst dein Zimmer vollstaendig. An der Wand steht ein weisser Schirm. Nun nimmst du eine Rasierklinge und schneidest zwei hauchduenne, parallele Schlitze im Abstand von einem Zehntelmillimeter in eine schwarze Folie. Du richtest einen roten Laserpointer auf die beiden Spalte. Wenn Licht aus winzigen starren Teilchen – wie mikroskopischen Pistolenkugeln – bestuende, muesstest du auf dem Schirm genau zwei scharfe rote Lichtstriche sehen: einen fuer jeden Schlitz. Doch was sich deinen Augen offenbart, ist ein atemberaubendes optisches Raetsel: Auf dem Schirm erscheint kein Doppelstrich, sondern eine breite Reihe aus Dutzenden hellen roten Streifen, die durch pechschwarze Streifen voneinander getrennt sind! Noch verrueckter: Genau an den Stellen, an denen das Licht aus beiden Schlitzen gleichzeitig ankommt, loescht es sich stellenweise voellig aus – Licht plus Licht ergibt tiefste Schwaerze. Dieses Experiment von Thomas Young aus dem Jahr 1801 zertruemmerte Isaac Newtons Teilchentheorie und bewies unwiderlegbar die Wellennatur des Lichts.

`Klausur-Satz: Am Doppelspalt ueberlagern sich zwei koharente Elementarwellen; konstruktive Interferenz entsteht fuer Gangunterschiede von ganzzahligen Vielfachen der Wellenlaenge, waehrend ungeradzahlige halbe Wellenlaengen zu destruktiver Ausloeschung fuehren.`

## Schritt 2 — entdecken: Die Vokabelkiste der Wellenoptik
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 相干光 — Kohaerenz: 两束光波具有恒定的相位差和相同的频率，是产生稳定可见干涉图样的必要前提。 Die Eigenschaft von Wellenzuegen, eine feste Phasenbeziehung zueinander und identische Frequenz aufzuweisen.
- 光程差 — Gangunterschied ($\Delta s$): 从两个相干波源出发到达空间某一点的两条光线之间的几何路程差。 Der Laengenunterschied der optischen Wege zweier Wellen vom Spalt bis zum Beobachtungspunkt auf dem Schirm ($\Delta s = d \cdot \sin\alpha$).
- 衍射 — Beugung: 光波在穿过狭缝或障碍物边缘时偏离直线传播而弯入几何阴影区的现象。 Die Ausbreitung von Wellen in den geometrischen Schattenraum hinter Hindernissen nach dem Huygensschen Prinzip.
- 相长与相消干涉 — Konstruktive und destruktive Interferenz: 波峰与波峰相遇振幅叠加增大（$\Delta s = k \cdot \lambda$），或波峰与波谷相遇振幅抵消为零（$\Delta s = (k + 0{,}5) \cdot \lambda$）。 Die Verstaerkung oder Ausloeschung zweier interferierender Wellenfelder.

## Schritt 3 — entdecken: Die mathematische Geometrie am Doppelspalt
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Geometrischer Aufbau des Youngschen Doppelspalt-Experiments:

Doppelspalt (Abstand d)                        Schirm (Abstand a)
        |
   +----+  <- Spalt 1
   |    | \
 d |    |   \
   |    |    \  Gangunterschied Delta_s = d * sin(alpha)
   +----+     \
        |       \-------------------------> P (x_k, k-tes Maximum)
        |                                   |
        |<============= Abstand a =========>| (Achse)
```

Fuer kleine Winkel ($\alpha \approx 0$) gilt die Kleinwinknaeherung:
$$\sin(\alpha) \approx \tan(\alpha) = \frac{s_k}{a}$$
Bedingung fuer Maxima ($k$-ter Ordnung):
$$\Delta s = k \cdot \lambda = d \cdot \frac{s_k}{a} \implies s_k = k \cdot \frac{\lambda \cdot a}{d}$$

`Klausur-Satz: Der Abstand zwischen zwei benachbarten Interferenzstreifen waechst linear mit dem Schirmabstand a und der Wellenlaenge lambda, sinkt jedoch antiproportional zum Spaltabstand d.`

## Schritt 4 — ausprobieren: Das Laser-Labor am Doppelspalt

[Werkzeug: lego]

AUFGABE (herleiten & berechnen, AFB I/II):
Ein Helium-Neon-Laser mit unbekannter Wellenlaenge $\lambda$ trifft senkrecht auf einen Doppelspalt mit dem Spaltmittenabstand $d = 0{,}25\,\text{mm}$.
Der Schirm befindet sich im Abstand von $a = 2{,}00\,\text{m}$ hinter dem Doppelspalt.
Auf dem Schirm wird der Abstand zwischen dem zentralen Maximum 0. Ordnung und dem Maximum 3. Ordnung zu $\Delta s_3 = 15{,}2\,\text{mm}$ vermessen.
1. Leite die Berechnungsformel fuer die Wellenlaenge $\lambda$ her.
2. Berechne die Wellenlaenge $\lambda$ des Laserlichts in Nanometern und bestimme die Spektralfarbe.

MUSTERLOESUNG:
1. Herleitung:
   - Fuer das Maximum 3. Ordnung ($k = 3$) gilt die Interferenzbedingung:
     $$\Delta s = 3 \cdot \lambda = d \cdot \sin(\alpha_3)$$
   - Mit der Kleinwinkelnäherung $\sin(\alpha_3) \approx \tan(\alpha_3) = \frac{s_3}{a}$ folgt:
     $$3 \cdot \lambda = d \cdot \frac{s_3}{a} \implies \lambda = \frac{d \cdot s_3}{3 \cdot a}$$
2. Berechnung:
   - Zahlenwerte in Standard-SI-Einheiten:
     $$d = 0{,}25\,\text{mm} = 2{,}5 \times 10^{-4}\,\text{m}$$
     $$a = 2{,}00\,\text{m}$$
     $$s_3 = 15{,}2\,\text{mm} = 1{,}52 \times 10^{-2}\,\text{m}$$
   - Einsetzen:
     $$\lambda = \frac{2{,}5 \times 10^{-4}\,\text{m} \cdot 1{,}52 \times 10^{-2}\,\text{m}}{3 \cdot 2{,}00\,\text{m}} = \frac{3{,}8 \times 10^{-6}}{6{,}00} \approx 6{,}333 \times 10^{-7}\,\text{m} = 633{,}3\,\text{nm}$$
   - Das Licht liegt bei ca. $633\,\text{nm}$ und besitzt eine charakteristische leuchtend rote Spektralfarbe.

`Klausur-Satz: Bei Aufgaben zu Wellenoptik: Doppelspalt-Interferenz und Beugung des Lichts muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`

## Schritt 5 — ausprobieren: Duell der Modelle: Welle vs. Korpuskel

VERGLEICH: Wellenmodell vs. Newtonsches Teilchenmodell des Lichts (选概念)

- Position A (Wellenoptik nach Huygens & Young):
  - Erklaert: Interferenzstreifen, Beugung hinter Kanten, Polarisierbarkeit von Licht.
  - Phaenomen: Zwei Lichtstrahlen loeschen sich durch Phasenverschiebung um $\pi$ gegenseitig aus.
- Position B (Teilchenoptik nach Newton):
  - Erklaert: Geradlinige Lichtausbreitung, scharfe Schattenkanten, Reflexionsgesetz.
  - Scheitert: Kann nicht erklaeren, warum hinter zwei Spalten dunkle Streifen an Stellen entstehen, die vorher bei nur einem Spalt hell erleuchtet waren.

Entscheidungsregel fuer die Klausur:
Wird nach `Interferenz phaenomenologisch begruenden` gefragt, argumentiere immer ueber den Gangunterschied: Ein Interferenzminimum entsteht nicht, weil Licht verloren geht, sondern weil Wellenberge und Wellentaeler destruktiv interferieren und die Energie in die Maxima umverteilt wird!

## Schritt 6 — check: Klausur-Transfer Gitterspektrometer und Blu-ray-Optik

PRUEFUNGSSZENARIO (KLP NRW Physik LK Inhaltsfeld 3: Quantenphysik und Wellenoptik):

### AFB I: Begriffsklaerung
Definiere die Begriffe Kohaerenzlaenge und Beugungsgitter und erlaeutere den Vorteil eines optischen Gitters (mit 600 Spalten/mm) gegenueber einem einfachen Doppelspalt.

### AFB II: Experimentelle Modellierung
Weisslicht einer Halogenlampe wird durch ein optisches Transmissionsgitter auf einen Schirm geworfen.
Erklaere, warum das zentrale Maximum (0. Ordnung) rein weiss erscheint, waehrend in den hoeheren Ordnungen farbige Spektren entstehen, bei denen Blau innen und Rot aussen liegt.

### AFB III: Technologisches Urteil
Auf einer DVD betraegt der Spurabstand $1{,}6\,\mu\text{m}$ (roter Laser $\lambda = 650\,\text{nm}$), auf einer Blu-ray Disc nur $0{,}32\,\mu\text{m}$ (blauer Laser $\lambda = 405\,\text{nm}$).
Bewerte anhand der Beugungsgrenze nach Ernst Abbe, warum kuerzere Wellenlaengen eine hoehere Speicherdichte ermoeglichen und welche Grenzen die Quantennatur des Lichts setzt.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche Bedingung muss der Gangunterschied Delta s erfuellen, damit auf dem Schirm ein Interferenzminimum (Ausloeschung) entsteht?
ANTWORT: Der Gangunterschied muss ein ungeradzahliges Vielfaches der halben Wellenlaenge sein: Delta s = (k + 0,5) * lambda mit k = 0, 1, 2, ...

FRAGE: Was geschieht mit dem Abstand der Interferenzstreifen auf dem Schirm, wenn man das gesamte Experiment unter Wasser durchfuehrt?
ANTWORT: Da die Lichtgeschwindigkeit im Wasser geringer ist, sinkt die Wellenlaenge lambda (lambda_Wasser = lambda_Vakuum / n). Dadurch ruecken die Interferenzstreifen enger zusammen.

`Klausur-Satz: Die differenzierte Reflexion erfordert eine stringente Verknuepfung von theoretischem Kriterienkatalog und konkretem Klausurmaterial.`

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du hast das klassische Fundament der Wellenoptik verstanden. Du kannst Interferenzstreifen berechnen, Beugungsphaenomene analysieren und verstehst die geometrische Logik hinter optischen Gittern.

Im naechsten Modul machen wir den revolutionaeren Quantensprung: Wenn Licht eine Welle ist, warum verhaelt es sich beim Photoeffekt ploetzlich wie ein Hagel aus Einstein-Photonen?
