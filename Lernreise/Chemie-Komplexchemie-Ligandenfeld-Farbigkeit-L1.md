---
fach: Chemie
thema: "Komplexchemie: Ligandenaustausch, Chelateffekt und Ligandenfeldaufspaltung"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Chemie, Komplexchemie, Koordinationsverbindungen, Ligandenfeld, Farbigkeit]
version: Lesson-v3
---

# Lernreise: Komplexchemie: Ligandenaustausch, Chelateffekt und Ligandenfeldaufspaltung (L1, Ziel Klausur)

<!-- Campaign: Anorganik-und-Materialien | Episode 4/10 | Krise: Warum verwandelt ein Tropfen Ammoniak blasses Kupferwasser in leuchtendes Koenigblau? | Zielgroessen: Zentralion, Ligand, Koordinationszahl, Ligandenfeldaufspaltung, Chelateffekt | Tool: lego -->

## Schritt 1 — entdecken: Das Chamäleon im Reagenzglas
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清配位化合物（Komplexverbindung）的核心结构：中心离子（Zentralteilchen）、配体（Liganden）与配位数（Koordinationszahl）。
2. 中文：能运用配体场理论（Ligandenfeldtheorie）精准解释过渡金属八面体场中 d 轨道能级分裂（$\Delta_o$）及互补色吸收（Komplementaerfarben）的光学本质。
3. 中文：能在现代化学大题（AFB I/II/III）中利用螯合效应（Chelateffekt）与热力学熵增（$\Delta S > 0$）定量论证配位平衡与重金属中毒解毒剂（EDTA）的临床有效性。

### Hook / Phaenomen

Du loest ein schneeweisses Pulver aus wasserfreiem Kupfersulfat in einem Becherglas mit klarem Wasser auf. Augenblicklich faerbt sich die Loesung in ein sanftes, blasses Himmelblau. Nun nimmst du eine Pipette mit konzentriertem Ammoniakwasser und tropfst vorsichtig einige Milliliter in das Glas. Was jetzt passiert, gleicht einem spektakulaeren Zaubertrick im Chemielabor: An der Eintropfstelle schlaegt die Farbe in Sekundenbruchteilen in ein extrem intensives, tief leuchtendes Tinten- und Koenigblau um, das das Licht nahezu voellig verschluckt. Es ist kein neuer Farbstoff entstanden und das Kupferatom ist dasselbe geblieben. Doch durch den blitzschnellen Austausch der Wassermolekuele gegen Ammoniakmolekuele in der Koordinationssphaere des Kupfers hat sich die energetische Aufspaltung der inneren d-Elektronenbahnen drastisch veraendert – ein phaenomenales Fenster in die Quantenwelt der Komplexchemie.

`Klausur-Satz: Der Ligandenaustausch in der Koordinationssphaere des Zentralions modifiziert die energetische Ligandenfeldaufspaltung Delta der d-Orbitale und verschiebt dadurch das Absorptionsmaximum des sichtbaren Lichts zur Komplementaerfarbe.`

## Schritt 2 — entdecken: Das Vokabular der Koordinationschemie
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 中心阳离子 — Zentralteilchen: 具有空轨道并能作为路易斯酸（Elektronenpaarakzeptor）接受孤对电子的过渡金属阳离子（如 $Cu^{2+}$, $Fe^{3+}$）。 Ein positiv geladenes Metallion, das als Lewis-Saeure fungiert und freie Elektronenpaare von Liganden anlagert.
- 配体 — Ligand: 拥有至少一对孤对电子并能作为路易斯碱与中心离子形成配位键（koordinative Bindung）的分子或阴离子。 Neutrale Molekuele ($H_2O, NH_3$) oder Anionen ($Cl^-, CN^-$), die freie Elektronenpaare zur Koordinationsbindung bereitstellen.
- 配体场分裂 — Ligandenfeldaufspaltung ($\Delta_o$): 配体孤对电子的静电排斥导致中心离子原本简并的五个 d 轨道分裂为能量不同的两组（$t_{2g}$ 与 $e_g$ 轨道）。 Energetische Differenzierung der fuenf d-Orbitale eines Uebergangsmetalls unter dem Einfluss der elektrostatischen Abstoßung der Ligandenelektronen.
- 螯合效应 — Chelateffekt: 多齿配体（如 EDTA）形成的配合物稳定性远高于单齿配体形成的配合物的热力学现象，主要驱动力为反应熵增。 Erhoehte thermodynamische Stabilitaet von Komplexen mit mehrzaehnigen Liganden gegenueber Komplexen mit eingezaehnigen Liganden infolge eines Entropiegewinns.

## Schritt 3 — entdecken: Die d-Orbital-Aufspaltung im Oktaederfeld
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Oktaedrisches Ligandenfeld (6 Liganden entlang der x-, y-, z-Achsen):

E ^
  |                                 --- ---  e_g Orbitale (d_z^2, d_x^2-y^2)
  |                                 (Zeigen direkt auf die Liganden -> Hoehere Energie!)
  |                   /\
  |                    |  Delta_o (Ligandenfeldaufspaltung)
  |                    |  Photonen-Absorption: Delta_E = h * nu
  |                   \/
  |   --- --- --- --- ---           --- --- ---  t_2g Orbitale (d_xy, d_xz, d_yz)
  |   Freies Ion (5 entartete d-O.) (Zeigen zwischen die Achsen -> Geringere Energie!)
--+---------------------------------------------------------------------------------->
```

`Klausur-Satz: Ein Komplex erscheint in derjenigen Farbe des sichtbaren Spektrums, die zur absorbierten Wellenlaenge der d-d-Elektronenanregung komplementaer ist.`

## Schritt 4 — ausprobieren: Der Chelat-Therapie-Simulator

[Werkzeug: lego]

AUFGABE (herleiten & erklaeren, AFB I/II):
Ein Patient leidet an einer akuten Blei-Vergiftung ($Pb^{2+}$ im Blutkreislauf). Dem Patienten wird das Dinatriumsalz von EDTA (Ethylendiamintetraacetat, ein sechszaehniger Chelatligand) infundiert.
Die Austauschreaktion des Hexaaqua-Blei-Komplexes mit EDTA lautet:
$[Pb(H_2O)_6]^{2+} + \text{EDTA}^{4-} \rightleftharpoons [Pb(\text{EDTA})]^{2-} + 6\,H_2O$
1. Leite thermodynamisch anhand der Gibbs-Helmholtz-Gleichung ($\Delta G = \Delta H - T \cdot \Delta S$) her, warum das Gleichgewicht dieser Reaktion extrem weit auf der rechten Seite liegt (Chelateffekt).
2. Erklaere, warum der Chelatkomplex ungiftig ueber die Nieren ausgeschieden werden kann, waehrend freies $Pb^{2+}$ lebensgefaehrlich ist.

MUSTERLOESUNG:
1. Thermodynamische Herleitung des Chelateffekts:
   - Enthalpie ($\Delta H$): Die Bindungsenergien zwischen den koordinierenden Sauerstoff-/Stickstoffatomen und dem Blei-Ion sind im Aquakomplex und im Chelatkomplex von vergleichbarer Groessenordnung ($\Delta H \approx 0$).
   - Entropie ($\Delta S$): Auf der linken Seite der Reaktionsgleichung befinden sich 2 Teilchen ($1 \times \text{Aquakomplex} + 1 \times \text{EDTA}$). Auf der rechten Seite entstehen 7 freie Teilchen ($1 \times \text{Bleichelat} + 6 \times \text{freigesetzte Wassermolekuele}$).
   - Die Anzahl der frei beweglichen Teilchen nimmt drastisch zu ($\Delta n = +5$), was zu einem massiven Gewinn an molekularer Unordnung und damit zu einer stark positiven Reaktionsentropie fuehrt ($\Delta S \gg 0$).
   - Nach der Gibbs-Helmholtz-Gleichung $\Delta G = \Delta H - T \cdot \Delta S$ wird die freie Enthalpie $\Delta G$ stark negativ. Die Reaktion verlaeuft exergonisch und die Rueckreaktion ist kinetisch und thermodynamisch extrem unwahrscheinlich.
2. Ausscheidung:
   - Durch die sechsfache koordinative Umhuellung ist das toxische $Pb^{2+}$-Kation vollstaendig im inneren Hohlraum des EDTA-Kaefigs thermodynamisch "eingesperrt" und maskiert. Es kann nicht mehr an SH-Gruppen koerpereigener Enzyme binden und wird unzersetzt ueber den Urin filtriert.

`Klausur-Satz: Bei Aufgaben zu Komplexchemie: Ligandenaustausch, Chelateffekt und Ligandenfeldaufspaltung muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`

## Schritt 5 — ausprobieren: Duell der Liganden: Wasser vs. Ammoniak

VERGLEICH: Aquakomplex vs. Tetraamminkomplex (选概念)

- Position A (Hexaaquakupfer(II) $[Cu(H_2O)_6]^{2+}$):
  - Ligand: Schwaches Ligandenfeld (Wasser steht weit links in der spektrochemischen Reihe).
  - Aufspaltung $\Delta_o$: Relativ klein.
  - Absorption: Rotes, langwelliges Licht mit geringer Energie ($h \cdot \nu$).
  - Wahrgenommene Farbe: Schwaches, blasses Cyan / Hellblau.
- Position B (Tetraammin-diaqua-kupfer(II) $[Cu(NH_3)_4(H_2O)_2]^{2+}$):
  - Ligand: Staerkeres Ligandenfeld ($NH_3$ steht weiter rechts).
  - Aufspaltung $\Delta_o$: Deutlich groesser!
  - Absorption: Gelb-oranges Licht hoeherer Energie.
  - Wahrgenommene Farbe: Tiefes, intensives Koenigsblau / Dunkelblau.

Entscheidungsregel fuer die Klausur:
Wird nach `Farbverschiebung bei Ligandenaustausch` gefragt, konsultiere die spektrochemische Reihe: Rueckt der neue Ligand weiter nach rechts ($I^- < Cl^- < H_2O < NH_3 < CN^-$), steigt $\Delta_o$, die absorbierte Wellenlaenge wird kuerzer und die transmittierte Komplementaerfarbe verschiebt sich ins Kalt-Violette!

## Schritt 6 — check: Klausur-Transfer Haemoglobin und Kohlenmonoxid-Vergiftung

PRUEFUNGSSZENARIO (KLP NRW Chemie LK Inhaltsfeld 4: Koordinationsverbindungen):

### AFB I: Begriffsklaerung
Definiere die Begriffe Spektrochemische Reihe, Koordinationszahl und Lewis-Saeure-Base-Konzept im Kontext der Komplexchemie.

### AFB II: Molekulare Wirkungsanalyse
Im roten Blutfarbstoff Haemoglobin koordiniert ein Eisen(II)-Ion vier Stickstoffatome eines Porphyrinrings sowie ein Sauerstoffmolekuel ($O_2$).
Erlaeutere anhand der spektrochemischen Reihe und der Komplexstabilitaet, warum das Einatmen von Kohlenstoffmonoxid ($CO$) bereits in geringsten Spuren toedlich wirkt.

### AFB III: Kritisches Umweltgutachten
In Waschmitteln wurden frueher Phosphate als Wasserenthaerter eingesetzt, spaeter durch NTA und Zeolithe ersetzt.
Bewerte den Einsatz biologisch schwer abbaubarer Chelatbildner (wie EDTA) in Industrieabwaessern im Hinblick auf die Remobilisierung toxischer Schwermetallsedimente in Gewaessern.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Was ist der Hauptgrund fuer die aussergewoehnliche thermodynamische Stabilitaet von Chelatkomplexen?
ANTWORT: Der Entropie-Effekt: Bei der Bildung des Chelatkomplexes werden viele kleine einzahnige Ligandenmolekuele freigesetzt, wodurch die Teilchenzahl und somit die Unordnung des Systems drastisch ansteigt.

FRAGE: Welche Eigenschaft muss ein Teilchen besitzen, um als Ligand in einem Komplex fungieren zu koennen?
ANTWORT: Es muss mindestens ein freies, nicht-bindendes Elektronenpaar besitzen, um als Lewis-Base eine koordinative (dative) kovalente Bindung mit den leeren Orbitalen des Zentralions einzugehen.

`Klausur-Satz: Die differenzierte Reflexion erfordert eine stringente Verknuepfung von theoretischem Kriterienkatalog und konkretem Klausurmaterial.`

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du hast die quantenchemischen und thermodynamischen Geheimnisse der Komplexchemie entschluesselt: von der Farbentstehung ueber d-Orbital-Aufspaltungen bis zum Chelateffekt in der Medizin.

Im kommenden Modul wechseln wir in die angewandte Materialchemie und untersuchen Polymerisation, Kunststoffe und smarte Nanomaterialien.
