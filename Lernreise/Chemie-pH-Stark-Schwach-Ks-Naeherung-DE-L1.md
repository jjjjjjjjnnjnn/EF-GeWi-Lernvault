---
fach: Chemie
thema: "pH starker und schwacher Saeuren mit Ks-Naeherung"
level: 1
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Saeuren]
version: Lesson-v3
---

# Lernreise: pH starker und schwacher Saeuren mit Ks-Naeherung — Episode C28: Der zischende Fleck

<!-- Campaign: Imperium-Alchemie | Chemie | entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Der Pool kippt: Eine Kelle zu viel Saeure

ZIELE:
1. Ich kann **starke und schwache Saeuren** am Ks-Wert trennen.
2. Ich kann den **pH starker Saeuren** direkt berechnen.
3. Ich kann den **pH schwacher Saeuren** mit Naeherung begruenden.

Pool-pH 3,2: Kinder reiben sich die Augen, Bademeister Jonas greift zur Chemiekelle. Eine Kelle Saeure klaert das Wasser, eine zu viel treibt den **pH** in den Keller. Starke Saeure protolysiert vollstaendig, schwache nur zum Teil.

Der Unterschied steckt in **Ks**: gross heisst stark, klein heisst schwach. Wer direkt rechnet oder sauber naehert, dosiert die Rettung statt die naechste Reizung.

`Klausur-Satz: Der Pool lehrt: Stark trifft voll, schwach trifft zum Teil — Ks entscheidet die Dosis.`

## Schritt 2 — entdecken: Die Saeure-Werkzeugkiste der Bademeister

AUSRUESTUNG (5 Begriffe der Werkzeugkiste):

- **Saeurekonstante**: Die Saeurekonstante Ks misst die Protolysestaerke als Gleichgewichtswert. Grosses Ks heisst starke, kleines heisst schwache Saeure. Mechanismus: Man schreibt das MWG der Protolyse; pKs als negativer Log macht kleine Zahlen handlich. Klausur-Tipp: pKs klein heisst stark als Merksatzpaar.

- **Starke Saeure**: Starke Saeuren protolysieren praktisch vollstaendig. Die Oxoniumkonzentration gleicht der Anfangskonzentration. Mechanismus: Man setzt c0 direkt in die pH-Formel ein; keine Naeherung, keine Wurzel. Klausur-Tipp: Stark heisst pH gleich minus Log c0 als Sofortsatz.

- **Schwache Saeure**: Schwache Saeuren protolysieren nur zu Bruchteilen. Das MWG mit Ks bestimmt den Rest. Mechanismus: Man naehert mit Wurzel aus Ks mal c0 und prueft die 5-Prozent-Regel. Klausur-Tipp: Wurzel plus Check als Pflichtduo.

- **Naeherungsbedingung**: Die Naeherung gilt nur bei kleinem Umsatz relativ zu c0. Sie streicht x gegen c0 aus dem Nenner. Mechanismus: Man rechnet genähert und teilt x durch c0: Unter 5 Prozent gilt, darueber nicht. Klausur-Tipp: Check hinschreiben, sonst kein Punkt fuer die Wurzel.

- **Pufferspur**: Schwache Saeuren bilden mit ihrer korrespondierenden Base Puffersysteme. Das Paar faengt Saeure- und Basenstoesse ab. Mechanismus: Henderson-Hasselbalch verbindet pH mit dem Verhaeltnis der Partner. Klausur-Tipp: Paar benennen als Bruecke zum Pufferkapitel.


`Klausur-Satz: Stark heisst pH gleich minus Log c0, schwach heisst Wurzel aus Ks mal c0.`

## Schritt 3 — entdecken: Von der Staerke zum pH: Die Dissoziationskette

WIRKUNGSGEFUEGE (Ursache zu Wirkung):

Die Dissoziationskette startet bei **Ks**: gross heisst vollstaendig, klein heisst bruchteilig. Starke Saeure setzt **c0** direkt in Oxonium um.

Schwache Saeure folgt dem **MWG**: Wurzel aus Ks mal c0 naehert, der **5-Prozent-Check** bestaetigt. Der **Log** quetscht das Ergebnis in die pH-Skala.

```diagram
Ks gross -> vollstaendig -> pH = -log c0
Ks klein -> MWG -> Wurzel(Ks*c0) -> Check
Log quetscht Zehnerpotenzen in pH
```

Die beiden pH-Wege des Sandkastens:

$$pH = -\log c_0 \quad \text{(stark)} \quad ; \quad pH = \tfrac{1}{2}(pK_S - \log c_0) \quad \text{(schwach)}$$

Jede Wurzel ohne Check ist in der Klausur wertlos.

`Klausur-Satz: Dissoziation bestimmt Oxonium, Oxonium bestimmt pH: Die Kette endet im Log.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Magen mit pH 2 verdaut Steak und schont sich selbst mit Schleim — Staerke plus Schutz als Paket.


**Bezug zum Konzept**: Scharf plus Hülle: Der Magen dosiert Staerke mit Schleim.

## Schritt 4 — ausprobieren: Sandkasten: Rechne stark exakt und schwach genaehert

[Werkzeug: formula]

AUFGABE (Target Challenge): Gegeben: 0,01 mol/L HCl und 0,10 mol/L Essigsaeure mit Ks = 1,8 mal 10 hoch minus 5. Berechne beide pH-Werte, pruefe die Naeherung und sage die pH-Aenderung bei zehnfacher Verduennung voraus.

HILFE:
1. Stark oder schwach an Ks entscheiden.
2. Stark direkt, schwach mit Wurzel rechnen.
3. 5-Prozent-Check plus Verduennungsregel anfuegen.

MUSTERLOESUNG: HCl stark: pH 2; Essig: pH halb mal (4,74 plus 1) gleich 2,87, Check 1,3 Prozent gilt; Verduennung hebt stark um 1, schwach um 0,5.

`Klausur-Satz: Mit pH 2 aus 0,01 mol/L HCl und pH 3 aus Essig-Naeherung misst der Sandkasten statt zu raten.`

## Schritt 5 — ausprobieren: Duell der Wege: Direktrechnung gegen Ks-Naeherung

VERGLEICH: Waehle erst den Saeure-Weg, dann loesen: (i) Direkt-Rechenweg oder (ii) Ks-Naeherweg — dann loesen.


Weg A (Direkt-Rechenweg): Starke Saeuren quantitativ direkt aus c0 berechnen. Dieser Weg ist exakt und schnell.

Weg B (Ks-Naeherweg): Schwache Saeuren qualitativ einordnen und mit Wurzel plus Check naehern. Dieser Weg braucht den Check als Siegel.


AUFGABE A: pH aus 0,01 mol/L HCl exakt gesucht. Welcher Weg?

AUFGABE B: Essig-pH mit Gueltigkeitsnachweis gesucht. Welcher Weg?


HILFE: A nennt stark — Weg A direkt. B nennt Nachweis — Weg B mit Check.

ANTWORT: A folgt Weg A mit minus-Log-Rechnung; B folgt Weg B mit Wurzel-plus-Check-Protokoll.

`Klausur-Satz: Direkt rechnen beweist, naehern mit Check sichert — die Klausur braucht beides.`

## Schritt 6 — check: Selbsttest zu Starke und schwache Saeuren

- FRAGE: Wie rechnest du starke Säuren? | ANTWORT: Direkt minus Log c0.

- FRAGE: Wie rechnest du schwache Säuren? | ANTWORT: Wurzel plus 5-Prozent-Check.

- FRAGE: Wann gilt die Näherung? | ANTWORT: Wenn x unter 5 Prozent von c0 liegt.


`Klausur-Satz: Ohne 5-Prozent-Check bleibt jede Wurzel geraten, mit ihm wird sie gerechnet.`

## Fehlvorstellung

1. Fehlvorstellung: pH 3 sei doppelt so sauer wie pH 6.
   Korrektur-Satz: `Die Skala ist logarithmisch: pH 3 ist tausendmal saurer als pH 6.`

2. Fehlvorstellung: Alle Saeuren rechneten sich gleich.
   Korrektur-Satz: `Stark direkt, schwach mit Wurzel: Wer tauscht, rechnet daneben.`

## Schritt 7 — szenario: Klausurtransfer: Protokoll zur Pool-Rettung

ROLLE: Du bist Bademeister mit Kelle.
SITUATION: Der Pool zeigt pH 3,2. Erklaere in ca. 150 Woertern mit stark, schwach und Ks, was geschah, und berechne die Korrektur.
RUBRIC (30 XP): Diagnose (8 XP) | Rechnung (8 XP) | Korrektur (8 XP) | Sicherheit (6 XP).


`Klausur-Satz: Achtung Falle: Verduennen hebt pH starker Saeuren um eins pro Faktor zehn, schwacher nur um halb.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY:

Takeaway-Satz: `Stark direkt, schwach mit Wurzel und Check: Ks zuerst, Log danach.`

`Klausur-Satz: Staerke ist relativ: Dieselbe Saeure wirkt in Wasser anders als die Skala verspricht.`


REFLEXION:
1. Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal sichere ich zuerst die Werkzeugkiste, weil jeder Handgriff darauf aufbaut.
