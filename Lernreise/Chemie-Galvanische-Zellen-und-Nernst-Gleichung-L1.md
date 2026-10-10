---
fach: Chemie
thema: "Galvanische Zellen und Nernst-Gleichung"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Chemie, Elektrochemie, Daniell-Element, Nernst-Gleichung, Redox]
version: Enterprise-v5
---

# Lernreise: Galvanische Zellen und Nernst-Gleichung (L1, Ziel Klausur)

<!-- Campaign: Elektrochemie-und-Thermodynamik | Episode 4/10 | Krise: Warum bricht die Akkukapazitaet des Smartphones bei Frost im Winter ploetzlich zusammen? | Zielgroessen: Galvanisches Element, Daniell-Element, Nernst-Gleichung, EMK | Tool: balance-board -->

## Schritt 1 — entdecken: Das Raetsel des winterlichen Smartphone-Akkus
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清原电池（galvanisches Element）与丹尼尔电池（Daniell-Element）中氧化还原半反应及电子流动本质。
2. 中文：能熟练运用能斯特方程（Nernst-Gleichung）计算不同离子浓度与温度下的电极电势及原电池电动势（EMK）。
3. 中文：能在现代储能与化学热力学综合题（AFB I/II/III）中利用浓差电池与能斯特方程定量分析电池老化与低温性能骤降机理。

### Hook / Phaenomen

Du stehst an einem eisigen Januarmorgen mit minus zehn Grad Celsius an der Bushaltestelle. Vor zehn Minuten zeigte dein Smartphone noch beruhigende 78 Prozent Akkuladung an. Du ziehst das Geraet aus der Tasche, um deinen Fahrplan zu pruefen, tippst auf den Bildschirm – und ploetzlich friert die Anzeige ein, die Prozentanzeige sackt binnen Sekunden auf ein Prozent ab und das Smartphone schaltet sich komplett aus. Wieder zu Hause bei wohligen 22 Grad steckst du das Ladekabel ein, und nach zwei Minuten startet das Handy mit angeblichen 75 Prozent Restenergie. Wo war die Energie waehrend des Frosts gefangen? Weder haben sich die Lithium-Ionen in Luft aufgeloest, noch ist der Akku physikalisch zerbrochen. Es ist die fundamentale elektrochemische Triebkraft der Redoxreaktion, die durch Temperatur und Konzentrationsgradienten gemaess der beruehmten Nernst-Gleichung zusammengebrochen war.

`Klausur-Satz: Die elektromotorische Kraft einer galvanischen Zelle haengt ueber die Nernst-Gleichung logarithmisch vom Konzentrationsverhaeltnis der beteiligten Redoxpaare sowie linear von der absoluten Temperatur ab.`

## Schritt 2 — entdecken: Grundbegriffe der Elektrochemie
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文->德语）：

- 原电池 — Galvanisches Element: 发生自发氧化还原反应并将化学能转化为电能的装置。 Vorrichtung zur spontanen Umwandlung von chemischer Energie in elektrische Energie ueber getrennte Redox-Teilreaktionen.
- 丹尼尔电池 — Daniell-Element: 由锌电极（硫酸锌溶液）与铜电极（硫酸铜溶液）及盐桥构成的经典原电池。 Klassisches Element aus Zink-Anode und Kupfer-Kathode mit Standardspannung $U^0 = 1{,}10\,\text{V}$.
- 标准电极电势 — Standard-Elektrodenpotenzial ($E^0$): 标准状态下相对于标准氢电极测得的电极电势。 Das Redoxpotenzial einer Halbzelle bei $25\,^\circ\text{C}$, $1\,\text{mol/l}$ und $1013\,\text{hPa}$ bezogen auf die Standard-Wasserstoff-Elektrode ($0{,}00\,\text{V}$).
- 能斯特方程 — Nernst-Gleichung: 计算非标准状态下电极电势的数学方程。 $E = E^0 + \frac{R \cdot T}{z \cdot F} \cdot \ln\left(\frac{c_{\text{Ox}}}{c_{\text{Red}}}\right)$.

## Schritt 3 — entdecken: Das Daniell-Element und die Ionenwanderung
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Anode (Oxidation / Minuspol):          Kathode (Reduktion / Pluspol):
Zink-Halbzelle                         Kupfer-Halbzelle

  [ Zn-Stab ]                                [ Cu-Stab ]
       |                                          |
       +--------( Elektronenfluss e- )------------+
       |           Volt-Meter: U = 1,10 V         |
       v                                          v
+------------------+   Diaphragma /         +------------------+
| Zn^2+  (1 mol/l) |   Stromschluessel      | Cu^2+  (1 mol/l) |
| SO4^2-           | <====================> | SO4^2-           |
+------------------+   (KNO3-Salzbruecke)   +------------------+
Zn -> Zn^2+ + 2 e-                          Cu^2+ + 2 e- -> Cu
(Loest sich auf)                            (Kupfer scheidet sich ab)
```

`Klausur-Satz: An der Anode findet stets die Oxidation statt (Elektronenabgabe / Minuspol), waehrend an der Kathode die Reduktion erfolgt (Elektronenaufnahme / Pluspol).`

## Schritt 4 — ausprobieren: Das Konzentrationsketten-Labor

[Werkzeug: balance-board]

AUFGABE: Berechne beide Halbzellpotenziale und die Zellspannung des Daniell-Elements mit der Nernst-Gleichung. [AFB II]
Gegeben ist ein Daniell-Element mit $c(Zn^{2+}) = 0{,}001\,\text{mol/l}$ und $c(Cu^{2+}) = 2{,}0\,\text{mol/l}$ bei $T = 298{,}15\,\text{K}$.
Standardpotenziale: $E^0(Zn/Zn^{2+}) = -0{,}76\,\text{V}$, $E^0(Cu/Cu^{2+}) = +0{,}34\,\text{V}$.
1. Berechne die individuellen Potenziale der Zink- und der Kupferhalbzelle mit der vereinfachten Nernst-Gleichung bei Raumtemperatur ($E = E^0 + \frac{0{,}059\,\text{V}}{z} \cdot \lg(c)$).
2. Bestimme die resultierende Gesamt-Zellspannung $U = E(\text{Kathode}) - E(\text{Anode})$ und vergleiche sie mit der Standardzellspannung ($1{,}10\,\text{V}$).

HILFE:
- Fachdimension: Nutze Nernst-Gleichung und Kathode-minus-Anode-Regel; klaere zuerst Elektrodenpotenziale beider Halbzellen und Zellspannung als Differenz, ohne das Ergebnis vorwegzunehmen.
- Rechenweg: Lege die Reihenfolge von Ausgangsgroesse zu Zielgroesse fest; schreibe nur die Abfolge auf, setze keine Zahlen ein.
- Pruefdimension: Plane die Kontrolle ueber Einheit und Groessenordnung, ohne das Resultat zu nennen.

COMPLETION (Lückentext):
- Lies die Aufgabe und ergaenze aus dem Gedaechtnis, ohne zurueckzublaettern:
- Fuer ___ gilt $E = E^0 + \frac{0{,}059\,\mathrm{V}}{z} \cdot \lg c$.
- Zuerst bestimme ich ___, dann folgt ___ aus $U = E_\mathrm{Kathode} - E_\mathrm{Anode}$.

ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Halbzellpotenziale aus Nernst-Gleichung | 5 NP | Kathode-minus-Anode-Probe als Alternativweg
Zellspannung als Differenz | 5 NP | Vergleich mit Standardspannung als Alternativweg
Konzentrationseinfluss begruenden | 5 NP | Temperaturblick als Alternativweg
Gesamt: 15 NP

MUSTERLOESUNG:
1. Berechnung der Einzelpotenziale:
   - Zink-Halbzelle ($z = 2$):
     $$E(Zn/Zn^{2+}) = -0{,}76\,\text{V} + \frac{0{,}059\,\text{V}}{2} \cdot \lg(10^{-3}) = -0{,}76\,\text{V} + 0{,}0295\,\text{V} \cdot (-3) = -0{,}76\,\text{V} - 0{,}0885\,\text{V} = -0{,}8485\,\text{V}$$
   - Kupfer-Halbzelle ($z = 2$):
     $$E(Cu/Cu^{2+}) = +0{,}34\,\text{V} + \frac{0{,}059\,\text{V}}{2} \cdot \lg(2{,}0) = +0{,}34\,\text{V} + 0{,}0295\,\text{V} \cdot 0{,}3010 \approx +0{,}34\,\text{V} + 0{,}0089\,\text{V} = +0{,}3489\,\text{V}$$
2. Gesamtspannung:
   $$U = E(\text{Cu}) - E(\text{Zn}) = +0{,}3489\,\text{V} - (-0{,}8485\,\text{V}) = 1{,}1974\,\text{V} \approx 1{,}20\,\text{V}$$
   Die Zelle liefert rund $0{,}10\,\text{V}$ mehr Spannung als das Standard-Element, da das verringerte Zinkangebot die Oxidation thermodynamisch beguenstigt und das erhoehte Kupferangebot die Reduktion verstaerkt.

`Klausur-Satz: Bei Aufgaben zu Galvanische Zellen und Nernst-Gleichung muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`

## Schritt 5 — ausprobieren: Duell der Potenziale: Standard vs. Konzentration

VERGLEICH: Standardpotenzial (E0) vs. Konzentrationsabhaengiges Potenzial (E) (选概念)
- [Position A] Wenn du Position A waehlst, arbeitest du im Transfer vor allem mit Standardpotenzialen und Tabellen.
- [Position B] Wenn du Position B waehlst, arbeitest du im Transfer vor allem mit Konzentrations- und Temperaturdeutung.

- Position A (Standardpotenzial $E^0$):
- Position B (Reales Potenzial $E$ nach Nernst):

Wahlregel: Triff erst eine Wahl zwischen beiden Positionen; die Begruendung steht erst nach der Wahl in der AUFLOESUNG.

AUFLÖSUNG (nach der Wahl lesen)
Erst nach der Wahl von Position A oder Position B lesen; hier steht der ueberfuehrte Mechanismus vor dem Ein-Satz-Kern:
- Ueberfuehrt aus VERGLEICH (Vorwahl-Fassung): - Gilt ausschliesslich bei Normbedingungen ($1\,\text{mol/l}$, $25\,^\circ\text{C}$). | - Reine tabellierte Materialkonstante. | - Reagiert hochdynamisch auf jede Konzentrationsverschiebung. | - Ermoeglicht den Bau von Konzentrationsketten ganz ohne zwei verschiedene Metalle (Spannung allein aus dem Konzentrationsgefaelle!).
- Ueberfuehrt aus Entscheidungsregel (Vorwahl-Fassung): Entscheidungsregel fuer die Klausur: Wird nach `Zellspannung unter Nicht-Standardbedingungen` gefragt, setze immer die Konzentrationen der oxidierten Formen in die Nernst-Gleichung ein und ziehe Anode (niedrigeres Potenzial) von Kathode (hoeheres Potenzial) ab.
- Ein-Satz-Kern: Getrennte Halbreaktionen treiben Elektronen durch den Draht, die Konzentration steuert die Spannung.
## Schritt 6 — check: Klausur-Transfer Autobatterie und Frostempfindlichkeit

PRUEFUNGSSZENARIO (KLP NRW Chemie LK Inhaltsfeld 3: Elektrochemie):
AUFGABE: Beurteile die Transferlage in ca. 150 Woertern mit Einordnung, Beleg und Schlussurteil. [AFB III]

### AFB I: Faktenwissen
Erlaeutere die Aufgabe der Salzbruecke (Diaphragma) und gib an, welche chemischen Teilreaktionen an Anode und Kathode eines Daniell-Elements ablaufen.

### AFB II: Mathematische Modellierung
Zeige anhand der Nernst-Gleichung, warum das Potenzial einer Wasserstoffelektrode bei einer Steigerung des pH-Werts von 0 auf 7 um genau $0{,}413\,\text{V}$ absinkt.

### AFB III: Kritisches Gutachten
Ein Automobilhersteller untersucht Lithium-Ionen-Zellen bei extremen Minustemperaturen.
Beurteile unter Verknuepfung der Nernst-Gleichung, der Arrhenius-Gleichung (Reaktionskinetik) und des Innenwiderstands, warum Akkus bei Kaelte nicht dauerhaft geschaedigt sind, aber unter Hochstrombelastung sofort zusammenbrechen.

ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Salzbruecke und Teilreaktionen | 5 NP | Stromkreis-Beleg als Alternativweg
Nernst-Modellierung mit Quotient | 5 NP | pH-Beispiel als Alternativweg
Kaelte-Gutachten mit Urteil | 5 NP | Innenwiderstand-Argument als Alternativweg
Gesamt: 15 NP

KERNSATZ (auswendig):
- Kernsatz: `Getrennte Halbreaktionen treiben Elektronen durch den Draht, die Konzentration steuert die Spannung.`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Aufschluesselung: Subjekt = Galvanische Zelle | Mechanismus = Nernst-Abhaengigkeit von Konzentration und Temperatur | Urteil = EMK als Urteil ueber Triebkraft
- Selbsttest: Getrennte Halbreaktionen treiben Elektronen durch den Draht, die ___ steuert die Spannung.
## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche Aufgabe erfuellt die Salzbruecke (Diaphragma) in einer galvanischen Zelle?
ANTWORT: Sie schliesst den Stromkreis durch Ionenwanderung, verhindert aber die unkontrollierte mechanische Durchmischung der beiden Elektrolytloesungen. Dadurch wird ein Ladungsaufbau vermieden, der den Elektronenfluss sonst sofort stoppen wuerde.

FRAGE: An welcher Elektrode findet im galvanischen Element immer die Oxidation statt?
ANTWORT: An der Anode (Minuspol beim galvanischen Element). Merkregel: O-A (Oxidation an der Anode).

`Klausur-Satz: Die differenzierte Reflexion erfordert eine stringente Verknuepfung von theoretischem Kriterienkatalog und konkretem Klausurmaterial.`

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du verstehst nun die mathematische und physikochemische Kopplung zwischen chemischer Energie, Redoxpotenzialen und elektrochemischer Arbeitsfaehigkeit.

In der folgenden Chemie-Einheit kehren wir die Richtung um: Bei der Elektrolyse zwingen wir Reaktionen unter Einsatz externer Spannung gegen ihren freiwilligen thermodynamischen Willen abzulaufen.
