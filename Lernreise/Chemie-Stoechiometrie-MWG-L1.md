---
fach: Chemie
thema: "Stoechiometrie und Massenwirkungsgesetz"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, ueberpruefen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Stoechiometrie]
version: Enterprise-v5
---

# Lernreise: Stoechiometrie und Massenwirkungsgesetz — Episode C21: Begrenzer am Fließband

<!-- Campaign: Imperium-Alchemie | Chemie | entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Der Airbag in 30 Millisekunden

ZIELE（本节三目标）：
1. 中文：能从系数读摩尔比。
2. 中文：能换算质量体积浓度。
3. 中文：能定限制反应物。

【危机Hook】Crash-Test 09:00 Uhr: 30 Millisekunden entscheiden ueber Leben. 九点碰撞测试：30毫秒定生死。气囊里叠氮化钠要在一眨眼间变出60升氮气——多一点炸伤人，少一点护不住。今晚必须把克算成摩尔、摩尔算成升，差一克都不行。

`Klausur-Satz: Dreissig Millisekunden Sicherheit stecken in einem Verhaeltnis: Wer wiegt, schuetzt.`

## Schritt 2 — entdecken: Die Mengen-Werkzeugkiste der Sprengmeister

PRETRAINING术语盒（5大装备，中文在上、德语在下）：

- 中文：系数比 — 德语：Koeffizientenverhaeltnis：方程系数的摩尔契约。 / Koeffizientenverhaeltnis: Koeffizienten geben Mol-Verhaeltnisse der Reaktion an. Sie sind der Vertrag jeder Umsetzung. Mechanismus: Man liest 2 zu 1 zu 2 und uebersetzt jede Menge ueber Mol in die Partner. Klausur-Tipp: Verhaeltnis als Bruch schreiben, nie im Kopf behalten.

- 中文：限制反应物 — 德语：Begrenzender Reaktand：先用完的说了算。 / Begrenzender Reaktand: Der begrenzende Reaktand verbraucht sich zuerst und stoppt die Reaktion. Er allein bestimmt die Ausbeute. Mechanismus: Man rechnet alle Edukte in Mol um und teilt durch Koeffizienten; der kleinste Quotient begrenzt. Klausur-Tipp: Quotientenvergleich als Nachweis hinschreiben.

- 中文：气体摩尔体积 — 德语：Molares Volumen：标况22.4升每摩尔。 / Molares Volumen: Das molare Volumen fasst 22,4 L pro Mol Gas bei Normbedingungen. Es verbindet Mol mit Litern. Mechanismus: Man multipliziert Mol mit 22,4; andere Bedingungen verlangen die Gasgleichung. Klausur-Tipp: 22,4 nur mit Normbedingungen nennen.

- 中文：产率 — 德语：Prozent-Ausbeute：实得除以理论。 / Prozent-Ausbeute: Die prozentuale Ausbeute teilt reale durch theoretische Menge. Sie misst Verluste und Nebenwege. Mechanismus: Man rechnet theoretisch aus dem Begrenzer und vergleicht mit der Waage. Klausur-Tipp: Theorie zuerst, Praxis danach als Ordnung.

- 中文：平衡列式 — 德语：MWG-Ansatz：幂次商定位置。 / MWG-Ansatz: Der MWG-Ansatz schreibt K aus Gleichgewichtswerten mit Exponenten. Er ergaenzt Mengen um Lage. Mechanismus: Man setzt c_eq ein; Feststoffe entfallen aus dem Bruch. Klausur-Tipp: Ansatz und Rechnung als zwei getrennte Punkte.


`Klausur-Satz: Koeffizienten sind Mol-Vertraege: Der kleinste Quotient begrenzt.`

## Schritt 3 — entdecken: Von Gramm zu Gas: Die Verhaeltniskette

ENTDECKEN因果传导机制（中文拆解在上，德语链条在下）：

中文：比例链：克经摩尔桥变摩尔，系数变伙伴摩尔，限制物定产，其余变升或毫升。

德语：Die Verhaeltniskette startet mit **Gramm**: Mol-Brücke in Mol umrechnen. Dann folgt der **Vertrag**: Koeffizienten uebersetzen Mol in Mol des Partners. Zuletzt kuerzt der **Begrenzer**: Kleinster Quotient gewinnt, Rest bleibt uebrig. Gas wird ueber **22,4 L** zu Litern, Loesung ueber c zu Millilitern.

```diagram
m -> n (M) -> Partner-n (Koeff) -> Zielgroesse
Begrenzer = min(n/Koeff)
Gas: mal 22,4 L | Loesung: durch c
```

Die Uebersetzungsformeln des Sandkastens:

$$\frac{n_A}{n_B} = \frac{a}{b} \quad ; \quad m = n \cdot M$$

中文：摩尔比等于系数比，质量等于摩尔乘摩尔质量。 / 德语：Jede Stöchiometrie laeuft ueber Mol: Gramm sind nur die Verpackung.

`Klausur-Satz: Gramm wird Mol, Mol wird Partner, Partner wird Liter: Die Kette endet im Airbag.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Backpulver treibt Kuchen mit CO2 — Stöchiometrie als Gebaeck.


**中文解读**: 泡打粉用二氧化碳发面——化学计量做点心。


**Bezug zum Konzept**: Vom Kuchen zum Airbag: Dieselbe Kette, anderes Tempo.

## Schritt 4 — ausprobieren: Sandkasten: Fuell den Airbag exakt

[Werkzeug: formula]

AUFGABE: Berechne 已知叠氮化钠分解方程与60升目标：算药量、判限制物并算产率。 德语原题：Gegeben: 2 NaN3 -> 2 Na + 3 N2; Ziel 60 L N2 bei Normbedingungen. Berechne die Azidmasse, bestimme den Begrenzer bei 200 g Azid plus Zuenderueberschuss und gib die Ausbeute bei real 55 L an. [AFB II]

HILFE:
- Fachdimension: Nutze Mol-Bruecke (n gleich m durch M) und Koeffizienten-Verhaeltnis; klaere zuerst Mol aus Masse und Koeffizientenweg vor der Zielgroesse, ohne das Ergebnis vorwegzunehmen.
- Rechenweg: Lege die Reihenfolge von Ausgangsgroesse zu Zielgroesse fest; schreibe nur die Abfolge auf, setze keine Zahlen ein.
- Pruefdimension: Plane die Kontrolle ueber Einheit und Groessenordnung, ohne das Resultat zu nennen.


COMPLETION (Lückentext):
- Lies die Aufgabe und ergaenze aus dem Gedaechtnis, ohne zurueckzublaettern:
- Fuer ___ gilt $n = \frac{m}{M}$ mit $c = \frac{n}{V}$.
- Zuerst bestimme ich ___, dann folgt ___ aus $V_m = 22{,}4\,\mathrm{L/mol}$.

ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Gleichung ausgleichen | 5 NP | Atomprobe als Alternativweg
Mol-Kette mit Einheit | 5 NP | Liter-Probe als Alternativweg
Zielgroesse rueckrechnen | 5 NP | Ueberschuss-Blick als Alternativweg
Gesamt: 15 NP

MUSTERLOESUNG：中文：需叠氮化钠约117克，限制物为叠氮化物，产率约92%。 / 德语：60 L sind 2,68 mol N2 und brauchen 1,79 mol Azid, also 117 g; Begrenzer Azid; Ausbeute 55 durch 60 gleich 92 Prozent.

`Klausur-Satz: Mit 117 g Azid fuer 60 L Stickstoff fuellt der Sandkasten statt zu raten.`

## Schritt 5 — ausprobieren: Duell der Wege: Mol-Rechnung gegen Koeffizienten-Blick

VERGLEICH: Waehle erst den Mengen-Weg, dann loesen: (i) Mol-Rechenweg oder (ii) Koeffizienten-Blickweg — dann loesen.选程序：先看信号词再选路。


Weg A (Mol-Rechenweg): Der Weg steht zur Wahl.
- [Weg A] Wenn du Weg A waehlst, arbeitest du in Schritt 7 vor allem mit Mol-Ketten und Zahlen.

Weg B (Koeffizienten-Blickweg): Der Weg steht zur Wahl.
- [Weg B] Wenn du Weg B waehlst, arbeitest du in Schritt 7 vor allem mit Begrenzungs- und Blickdeutung.


AUFGABE A: Azidmasse aus Litern exakt gesucht. Welcher Weg? 【选程序：先看信号词再选路】

AUFGABE B: Welcher Stoff begrenzt bei Überschuss? Welcher Weg? 【选程序：先看信号词再选路】


HILFE: Pruefe dimensionsgeleitet, welcher Weg passt: Zahlen- und Signalwoerter sprechen fuer Weg A, Deutungs- und Bereichswoerter fuer Weg B. Ordne selbst zu; die Zuordnung wird nicht vorweggenommen.

ANTWORT：中文：A走换算路升摩克三连；B走系数路比商。 / 德语：A folgt Weg A mit Liter-Mol-Gramm-Kette; B folgt Weg B mit min-Quotienten.

AUFLÖSUNG (nach der Wahl lesen)
Erst nach der Wahl von Weg A oder Weg B lesen; hier steht der ueberfuehrte Mechanismus vor dem Ein-Satz-Kern:
- Ueberfuehrt aus VERGLEICH (Vorwahl-Fassung): Weg A (Mol-Rechenweg): Mengen quantitativ durchrechnen bis Gramm und Liter. Dieser Weg liefert exakte Zahlen. // Weg B (Koeffizienten-Blickweg): Verhaeltnisse qualitativ lesen und Begrenzer schnell erkennen. Dieser Weg ist schnell, bleibt aber grob.
- Ueberfuehrt aus Schritt-5-HILFE (Vorwahl-Fassung): HILFE：A nennt exakt — Weg A mit Kette. B nennt Begrenzer — Weg B mit Quotient.
- Mechanismus A: ANTWORT：中文：A走换算路升摩克三连；B走系数路比商。 / 德语：A folgt Weg A mit Liter-Mol-Gramm-Kette; B folgt Weg B mit min-Quotienten.
- Ein-Satz-Kern: Mol rechnen beweist, Koeffizienten lesen lenkt — die Klausur braucht beides.

<!-- C1-Bestaetigung: Vorwahl neutral, Mechanismus in AUFLOESUNG. -->

`Klausur-Satz: Mol rechnen beweist, Koeffizienten lesen lenkt — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Stoechiometrie und MWG

- FRAGE: 系数代表什么？（Was geben Koeffizienten an） | ANTWORT: 摩尔比。 / Mol-Verhaeltnisse.

- FRAGE: 标准气体摩尔体积？（Wie gross ist das molare Volumen） | ANTWORT: 22.4升每摩尔。 / 22,4 L pro Mol bei Normbedingungen.

- FRAGE: 限制物怎么找？（Wie findest du den Begrenzer） | ANTWORT: 最小商限制。 / Der kleinste Quotient begrenzt.


`Klausur-Satz: Ohne Begrenzer bleibt jede Ausbeute geraten, mit ihm wird sie berechnet.`

## Fehlvorstellung

1. 误解：质量比等于系数比。
   中文纠偏：系数数摩尔不数克，克比必须换算。
   Korrektur-Satz: `Koeffizienten zaehlen Mol, nicht Gramm: Erst M macht Masse daraus.`

2. 误解：产率总是百分百。
   中文纠偏：实得除以理论才是诚实。
   Korrektur-Satz: `Verluste und Nebenwege kosten: Real durch Theorie heisst Ehrlichkeit.`

## Schritt 7 — szenario: Klausurtransfer: Freigabebericht zum Gasgenerator

ROLLE：中文：你是碰撞实验室装药师。 / 德语：Du bist Sprengmeisterin im Crash-Labor.
SITUATION：发生器只产55升：请用摩尔、限制物与产率解释缺口并决定放行与否（约150词）。 / 德语：Der Generator liefert 55 statt 60 L. Erklaere in ca. 150 Woertern mit Mol, Begrenzer und Ausbeute die Luecke und gib die Charge frei oder nicht.
AUFGABE: Ueberpruefe die Transferlage in ca. 150 Woertern mit Einordnung, Beleg und Schlussurteil. [AFB III]
RUBRIC (30 XP)：Mol-Kette (8 XP) | Begrenzer (8 XP) | Ausbeute (8 XP) | Urteil (6 XP).
ZEITREGEL: MAX 2 Minuten — 90秒列摩尔链与限制商，30秒写产率放行句，然后交卷；Timer stellen.


ERWARTUNGSHORIZONT
Teilleistung | Punkte | Alternativweg
Ansatz-Einordnung mit Beleg | 5 NP | Koeffizienten-Beleg als Alternativweg
Mengen-Analyse mit Bruecke | 5 NP | Einheitenbeleg als Alternativweg
Urteil mit Massstab und Schluss | 5 NP | Offenes Urteil mit Rueckbindung als Alternativweg
Gesamt: 15 NP

`Klausur-Satz: Achtung Falle: Ueberschuss reagiert nie vollstaendig — nur der Begrenzer zaehlt.`

KERNSATZ (auswendig):
- Kernsatz: `Erst die Gleichung ausgleichen, dann ueber die Mol-Bruecke in Gramm und Liter umrechnen.`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Aufschluesselung: Subjekt = Reaktionsansatz | Mechanismus = Mol-Brücke mit Koeffizienten | Urteil = Mengenaussage als Urteil
- Selbsttest: Erst die Gleichung ausgleichen, dann ueber die Mol-Bruecke in Gramm und ___ umrechnen.
## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY核心总结：

中文：称、除、比：摩尔、商、限制物三步走。
Takeaway-Satz: `Wiegen, teilen, vergleichen: Mol, Quotient, Begrenzer in dieser Reihenfolge.`

`Klausur-Satz: Stöchiometrie ist Gerechtigkeit: Kein Atom geht verloren, jedes wird verbucht.`


REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal rechne ich zuerst die Liter-Mol-Gramm-Kette mit Begrenzer-Quotient am Airbag-Beispiel (60 L, 22,4 L), weil jede Ausbeute-Entscheidung darauf aufbaut.
