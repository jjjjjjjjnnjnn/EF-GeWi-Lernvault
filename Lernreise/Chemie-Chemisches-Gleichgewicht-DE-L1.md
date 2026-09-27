---
fach: Chemie
thema: "Chemisches Gleichgewicht und Le Chatelier"
level: 1
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, deuten, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Gleichgewicht]
version: Lesson-v3
---

# Lernreise: Chemisches Gleichgewicht und Le Chatelier — Episode C7: Hochdruck im Haber-Turm

<!-- Campaign: Imperium-Alchemie | Chemie | entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Der Haber-Turm vor der Explosion: Druck gegen Hitze

ZIELE:
1. Ich kann das **MWG** aufstellen und reine Feststoffe ausschliessen.
2. Ich kann mit **Q gegen K** die Richtung bestimmen.
3. Ich kann Stoerungen mit **Le Chatelier** deuten und das K-Verhalten nennen.

Um Mitternacht heult im Imperium-Alchemie der Druckalarm: Der Haber-Autoklav steht bei 300 bar, das Manometer zittert im roten Bereich. Direktorin Dr. Vera Haber starrt auf drei Regler — Konzentration, Druck, Temperatur. Mehr Druck steigert die **Ammoniak**-Ausbeute, treibt aber den Kessel an die Berstgrenze.

Heizen sichert den Stahl, tötet aber die Ausbeute bei dieser **exothermen** Reaktion. Schichtleiter Jonas weiss nicht, welchen Regler er zuerst anfassen soll.
Praktikantin Mia Puffer fluestert die goldene Regel: Das System weicht jeder Stoerung aus. Doch nur eine Groesse aendert die Konstante selbst.
Wer heute versteht, warum Hochdruck plus maessige Temperatur den Turm retten und warum ein **Katalysator** niemals die Lage verschiebt, verhindert Stillstand — oder Schlimmeres.

`Klausur-Satz: Hochdruck rettet die Ausbeute, bedroht den Kessel: Das Gleichgewicht ist ein Balanceakt auf 300 bar.`

## Schritt 2 — entdecken: Die Stellhebel-Kiste der Turmwache

AUSRUESTUNG (5 Begriffe der Werkzeugkiste):

- **Dynamisches Gleichgewicht**: Dynamisches Gleichgewicht bedeutet: Hin- und Rueckreaktion laufen gleich schnell, alle Konzentrationen bleiben konstant.
  Stillstand ist Schein, auf Teilchenebene herrscht Hochbetrieb.
  Mechanismus: Pro Sekunde zerfallen so viele Molekuele, wie neu entstehen; makroskopisch ruht das System, mikroskopisch rast es.
  Klausur-Tipp: Gleich schnell plus konstant als Doppelmerkmal hinschreiben.

- **Massenwirkungsgesetz**: Das Massenwirkungsgesetz stellt K als Quotient potenzierter Gleichgewichtskonzentrationen auf. Produkte stehen oben, Edukte unten, Koeffizienten werden Exponenten.
  Mechanismus: Man setzt die gemessenen Gleichgewichtswerte ein; reine Feststoffe und Fluessigkeiten fallen heraus, weil ihre Konzentration konstant bleibt.
  Klausur-Tipp: K-Bruch plus Feststoffe raus als Standardansatz.

- **Gleichgewichtskonstante**: Die Gleichgewichtskonstante K haengt nur von der Temperatur ab und zeigt die Lage. Grosses K heisst Produktseite, kleines K heisst Eduktseite.
  Mechanismus: Erhitzen bei exotherm senkt K, bei endotherm hebt es K; Druck und Konzentration aendern K nie.
  Klausur-Tipp: Nur Temperatur aendert K ist der Satz mit Garantiepunkten.

- **Reaktionsquotient**: Der Reaktionsquotient Q nutzt dieselbe Formel wie K, aber zu beliebigem Zeitpunkt. Der Vergleich Q gegen K verrät die Laufrichtung.
  Mechanismus: Q kleiner K heisst Nachschub rechts, Q groesser K heisst Abbau links, gleich heisst Ruhe.
  Klausur-Tipp: Q-K-Vergleich als Richtungspfeil immer ausrechnen.

- **Le Chatelier**: Le Chateliers Prinzip besagt: Das System weicht einem Zwang aus und mindert seine Wirkung. Es laeuft dorthin, wo der Zwang verbraucht wird.
  Mechanismus: Druckerhoehung flieht zur Seite mit weniger Teilchen, Heizen bei exotherm flieht zur endothermen Seite.
  Klausur-Tipp: Zwang benennen plus Fluchtrichtung als Antwortpaar.


`Klausur-Satz: Reine Feststoffe gehoeren nicht in den K-Ausdruck.`

## Schritt 3 — entdecken: Die Le-Chatelier-Weiche: Wer weicht wohin

WIRKUNGSGEFUEGE (Ursache zu Wirkung):

Die Kette: **K** beschreibt die Lage, **Q** den Moment. Q kleiner als K heisst zu wenig Produkt — rechts nachfuellen; Q groesser als K heisst zu viel — links abbauen; gleich heisst Ruhe.

Konzentration und Druck aendern nur Q, das System laeuft, bis Q wieder gleich K ist. Nur **Temperatur** aendert K selbst: Heizen bei exotherm schiebt links und senkt K. **Katalysator** macht nur schneller.

```diagram
Q < K -> rechts | Q = K -> Ruhe | Q > K -> links
c/p aendern nur Q | T aendert K
Exotherm + Heizen -> links, K sinkt
```

Das Massenwirkungsgesetz am Haber-Beispiel:

$$K_c = \frac{[NH_3]^2}{[N_2]\,[H_2]^3}$$

Vier Teilchen links gegen zwei rechts: Darum hilft Hochdruck der Produktseite.

`Klausur-Satz: Q kleiner als K heisst rechts nachfuellen, groesser heisst links abbauen, gleich heisst Ruhe.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Haber und Bosch stritten mit der Temperatur: Heiss laeuft schnell, kuehl liegt gut — der Turm lebt vom Kompromiss aus Druck und Katalysator.


**Bezug zum Konzept**: Der Turm zeigt: Lage und Tempo sind zwei Gegner mit einem Kompromiss.

## Schritt 4 — ausprobieren: Simulations-Sandkasten: Zaehme den Haber-Turm

[Werkzeug: le-chatelier-sim]

AUFGABE (Target Challenge): Haber-Bosch, exotherm, T = 480 Grad C, p = 250 bar. Stelle im Simulator so, dass die Ausbeute ueber 15 Prozent steigt, und begruende, warum Heizen schadet und Druck hilft. Konkret: N2 + 3 H2 <-> 2 NH3, exotherm. Druck hoch, Temperatur hoch: Wohin laeuft es?

HILFE:
1. Teilchen zaehlen: 4 gegen 2.
2. Exotherm plus Heizen heisst links.
3. Katalysator nur schneller, nie Lage.

MUSTERLOESUNG: Mehr Druck schiebt rechts zu weniger Teilchen, Heizen schiebt links zur endothermen Seite; netto braucht der Turm Hochdruck, maessige Temperatur und Katalysator.

`Klausur-Satz: Hochdruck plus Mass-Temperatur plus Katalysator: Der Turm laeuft ueber 15 Prozent Ausbeute.`

## Schritt 5 — ausprobieren: Duell der Augen: Rechenauge gegen Stoerungsauge

VERGLEICH: Waehle erst das Auge, dann loesen: (i) MWG-Rechenauge oder (ii) Stoerungsauge — dann loesen.


Weg A (MWG-Rechenauge): Konzentrationen einsetzen, K oder Q quantitativ berechnen und Richtung aus Zahlen ableiten. Dieser Weg liefert Belege mit Einheit mol/L und ist pruefungssicher.

Weg B (Stoerungsauge): Stoerung benennen und Richtung qualitativ mit Le Chatelier deuten. Dieser Weg ist schnell und anschaulich, bleibt aber ohne Zahl angreifbar.


AUFGABE A: c-Werte gegeben, K berechnen. Welches Auge?

AUFGABE B: Nur Erhitzen genannt, Richtung gesucht. Welches Auge?


HILFE: A nennt Zahlen — Weg A mit MWG. B nennt Stoerung — Weg B mit Le Chatelier.

ANTWORT: A folgt Weg A mit MWG-Ausdruck und Dreisatztabelle; B folgt Weg B mit Le-Chatelier-Begruendung.

`Klausur-Satz: Zahlen verlangen das MWG-Rechenauge, Stoerungen verlangen das Le-Chatelier-Stoerungsauge.`

## Schritt 6 — check: Selbsttest zu Chemisches Gleichgewicht

- FRAGE: Was gehört nicht in K? | ANTWORT: Reine Feststoffe und Fluessigkeiten.

- FRAGE: Was heisst Q kleiner als K? | ANTWORT: Zu wenig Produkt, also rechts.

- FRAGE: Was aendert K selbst? | ANTWORT: Nur die Temperatur.


`Klausur-Satz: Ohne Q bleibt Richtung geraten, mit Q wird sie gerechnet.`

## Fehlvorstellung

1. Fehlvorstellung: Katalysator verschiebe die Lage.
   Korrektur-Satz: `Er beschleunigt beide Richtungen gleich und aendert weder Lage noch K.`

2. Fehlvorstellung: Jede Verschiebung aendere K.
   Korrektur-Satz: `Nur Temperatur aendert K; sonst laeuft Q zurueck zu K.`

## Schritt 7 — szenario: Klausurtransfer: Schichtprotokoll am Haber-Turm

ROLLE: Du bist Verfahrenstechniker am Haber-Turm.
SITUATION: Die Leitung will stark heizen und Druck senken. Beurteile in ca. 150 Woertern mit Le Chatelier, welche Bedingungen wirklich helfen, und warne vor der Berstgrenze.
RUBRIC (30 XP): Temperaturlogik (8 XP) | Drucklogik (8 XP) | Gegenentwurf (8 XP) | Abwaegung (6 XP).
ZEITREGEL: MAX 2 Minuten — 90 Sekunden Druck-/Temperaturlogik entscheiden, 30 Sekunden Warnsatz zur Berstgrenze, dann abgeben; Timer stellen.


`Klausur-Satz: Achtung Falle: Der Katalysator beschleunigt beide Wege gleich und aendert weder Lage noch K.`

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY:

Takeaway-Satz: `Lage halten heisst Q zu K zurueckfuehren: Nur Temperatur schreibt K neu.`

`Klausur-Satz: Gleichgewicht ist verhandelte Ruhe: Jede Stoerung bekommt eine Antwort, nur Hitze schreibt den Vertrag neu.`


REFLEXION:
1. Welcher Schritt fiel schwerer — die Sandkasten-Challenge (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst den Q-K-Vergleich am Haber-Beispiel (250 bar, 480 Grad), weil jede Lage-Entscheidung darauf aufbaut.
