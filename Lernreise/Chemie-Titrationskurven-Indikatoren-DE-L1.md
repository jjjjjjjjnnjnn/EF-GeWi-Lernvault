---
fach: Chemie
thema: "Titrationskurven und Indikatoren"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Titration]
version: Lesson-v3
---

# Lernreise: Titrationskurven und Indikatoren (L1, Ziel Klausur)

<!-- Lesson v3: Schritt 1-8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser skip); [Werkzeug: <id>] interaktiv; Gating: check/szenario nicht bestanden = Weiter grau; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst die Titrationskurve $pH = f(V)$ einer starken Saeure mit starker Base in drei Abschnitten (Start, Sprung, Ueberschuss) beschreiben.
2. Du kannst den Aequivalenzpunkt mit $n(H^+) = n(OH^-)$ berechnen und vom Neutralpunkt $pH = 7$ abgrenzen.
3. Du kannst einen Indikator mit $pK_{In}$ passend zum Sprungbereich auswaehlen und begruenden (AFB II).

### Hook / Phaenomen

Im Jahr 1867 vergiftete eine falsch etikettierte Lauge in einer Fabrik beinahe eine ganze Schicht, weil niemand die Konzentration pruefte. Titration rettet hier Leben: Tropfen fuer Tropfen verraet der $pH$-Sprung den wahren Gehalt der Flasche. Doch warum aendert ein einziger Tropfen den $pH$ um mehrere Einheiten — und woher weiss der Farbstoff, wann er umschlagen muss? Die Titrationskurve zeigt den Sprung am Aequivalenzpunkt: Tropfen fuer Tropfen faellt Natronlauge in die Saeure, der pH nach $pH = -\lg[H_3O^+]$ steigt erst flach, dann steil um mehrere Einheiten pro Tropfen, weil n H3O plus gleich n OH minus gilt. Der Indikator mit passendem Umschlagsbereich markiert den Punkt per Farbumschlag. Stark gegen stark trifft pH 7, schwach gegen stark liegt basisch. Wer Staerke prueft, Formel waehlt und x durch c0 kontrolliert, rechnet fehlerfrei.

### Fachbegriff & Definition

Der **Aequivalenzpunkt** ist der Punkt mit **gleicher Stoffmenge** $n(H^+) = n(OH^-)$ — also $c_aV_a = c_bV_b$ — und haengt vom Salztyp ab: stark gegen stark trifft bei $pH = 7$, schwach gegen stark im basischen Bereich. Der **pH-Sprung** ist der steile Kurventeil um diesen Punkt: Nahe $n(H^+) = n(OH^-)$ dreht ein Tropfen das Verhaeltnis $[H^+]/[OH^-]$ um Groessenordnungen. Der **Indikator** als Farbstoffpaar $HIn \rightleftharpoons H^+ + In^-$ schlaegt bei $pH \approx pK_{In} \pm 1$ um — er muss im Steilbereich liegen, sonst verfaerbt er sich zu frueh oder zu spaet.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Zutropfen, Umschlagen, Ablesen**. Erstens Massloesung zutropfen und $pH = f(V)$ verfolgen: flacher Start, steiler Sprung, flacher Ueberschuss. Zweitens Indikator waehlen, dessen $pK_{In}$ im Sprung liegt — etwa Bromthymolblau ($pK_{In} \approx 7{,}1$) fuer stark gegen stark mit Sprung von ca. $4$ bis $10$. Drittens am Umschlag $V_b$ ablesen und ueber $c_aV_a = c_bV_b$ die unbekannte Konzentration berechnen. Bei schwach gegen stark liegt der Aequivalenzpunkt wegen $CH_3COO^- + H_2O \rightleftharpoons CH_3COOH + OH^-$ oberhalb $7$ — dann passt Phenolphthalein, nicht Methylorange.

Klausur-Satz: `Der pH-Sprung markiert den Aequivalenzpunkt, der Indikator macht ihn sichtbar.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Zwanzig Milliliter Salzsaeure, unbekannte Lauge, ein Tropfen zu viel — und die Auswertung kippt. Was unterscheidet den Punkt, an dem die Stoffmengen gleich sind, vom Punkt $pH = 7$? Und warum zeigt der Pufferbereich fast keine $pH$-Aenderung, der Sprung aber eine riesige? Fuenf Begriffe klaeren das Bild.

### Fachbegriffe & Definitionen

- **Titration:** Massanalyse mit $c = n/V$, bei der Massloesung bis zum Farbumschlag zugegeben und das verbrauchte Volumen abgelesen wird.
- **Aequivalenzpunkt:** Punkt mit $n(H^+) = n(OH^-)$; die Stoffmengen sind gleich, der $pH$ haengt vom Salztyp ab — nur stark gegen stark bei $7$.
- **Neutralpunkt:** $pH = 7$ bei $25^\circ\mathrm{C}$ aus $K_w = 10^{-14}$; nur bei stark gegen stark identisch mit dem Aequivalenzpunkt.
- **Indikator:** Farbstoffpaar $HIn \rightleftharpoons H^+ + In^-$ mit Umschlag bei $pH \approx pK_{In} \pm 1$ — er muss im Steilbereich der Kurve liegen.
- **Pufferbereich:** Flacher Kurventeil mit $pH = pK_a + \log\frac{[A^-]}{[HA]}$ nach Henderson-Hasselbalch; zugesetzte $H^+$ oder $OH^-$ werden abgefangen.

### Wirkungsgefuege / Modell

Die Begriffe greifen ineinander: Die **Titration** erzeugt die Kurve $pH = f(V)$, der **Aequivalenzpunkt** markiert $n(H^+) = n(OH^-)$, der **Indikator** macht ihn sichtbar. **Neutralpunkt** und Aequivalenzpunkt fallen nur bei stark gegen stark zusammen; bei schwach gegen stark hydrolysiert das Salz und verschiebt den Punkt. Der **Pufferbereich** daempft, der Sprung verstaerkt — steil heisst empfindlich: Ein Tropfen aendert den $pH$ um mehrere Einheiten.

Klausur-Satz: `Der Indikator muss im Steilbereich der Kurve umschlagen.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Warum aendert ein einziger Tropfen am Aequivalenzpunkt den $pH$ um mehrere Einheiten, waehrend zu Beginn zehn Milliliter kaum etwas bewegen? Die Kurve enthaelt einen steilen Sprung wie eine Klippe. Welcher Indikator schlaegt genau auf der Klippe um, und warum liegt der Sprung bei stark gegen stark bei $pH = 7$?

### Spiel-Aufgabe

Spiel-Aufgabe im Kopf-Labor: Zaehle Tropfen und verfolge den $pH$-Pfeil auf der Kurve. Stoppe bei $n(H_3O^+) = n(OH^-)$ und beobachte den Farbumschlag des Indikators. Vergleiche stark gegen stark (Sprung $4$ bis $10$) mit schwach gegen stark (Sprung basisch) und erklaere in einem Satz mit weil, warum die Wahl des Indikators vom Sprungbereich abhaengt.

### Aha-Moment & Gesetz

Aha-Moment und Gesetz: Die Kausalkette lautet Stoffmenge, Sprung, Umschlag. Am Aequivalenzpunkt gilt $n(H_3O^+) = n(OH^-)$ bzw. $c_1 \cdot V_1 = c_2 \cdot V_2$. Es gilt $pH = -\lg[H_3O^+]$ und $pH + pOH = 14$; Pufferzonen d Choices flach, der Sprung steil. Stark gegen stark trifft $pH = 7$, schwach gegen stark liegt basisch wegen der korrespondierenden Base. Der Indikator muss im Sprung umschlagen, sonst verfehlt man den Punkt.

```diagram
    pH ^
      12|              ............
       9|            .. Sprung (steile Klippe)
       7|----------.. Aequivalenz (stark/stark, 25 mL)
       3|..........
       +--------------------------------> V(NaOH) in mL
    Indikator: Phenolphthalein 8,2-10 (Pfeil im Sprung = gut)
    schwach/stark: Sprung 7-11, Aequivalenz basisch (Base-Puffer).
```

Klausur-Satz: `Steil heisst empfindlich: Ein Tropfen aendert den pH um mehrere Einheiten.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Titrations-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: titration-lab]

AUFGABE (Spiel-Auftrag, AFB II, 3 Stufen): Stufe 1 Titrieren: $100\,\mathrm{mL}$ $HCl$ ($0{,}005\,\mathrm{mol/L}$) werden mit $NaOH$ ($0{,}02\,\mathrm{mol/L}$) neutralisiert. Berechne $V_{NaOH}$. Stufe 2 Umschlagen: Waehle den Indikator im Sprung $4$ bis $10$. Stufe 3 Sichern: Begruende $pH = 7$ mit $n(H_3O^+) = n(OH^-)$.

HILFE:
1. Schritt 1: $c_1 \cdot V_1 = c_2 \cdot V_2$ nutzen.
2. Schritt 2: Sprungbereich gegen Umschlagbereich legen.
3. Schritt 3: Stark gegen stark bedeutet keine Pufferbase.

MUSTERLOESUNG: Aus $c_1 \cdot V_1 = c_2 \cdot V_2$ folgt $V_{NaOH} = \frac{0{,}005 \cdot 100}{0{,}02} = 25\,\mathrm{mL}$, weil am Aequivalenzpunkt $n(H_3O^+) = n(OH^-)$ gilt. Der $pH$-Sprung von ca. $4$ auf $10$ erlaubt Bromthymolblau oder Phenolphthalein, weil deren Umschlag im Sprung liegt. Bei stark gegen stark gilt $pH = 7$, weil weder ueberschuessige Saeure noch korrespondierende Base den Wert verschieben.

Klausur-Satz: `Gleiche Konzentration heisst gleiches Volumen bis zum Aequivalenzpunkt.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: Waehle zuerst das Verfahren — (i) stark/stark-Verfahren (Aequivalenz bei $pH = 7$, grosser Sprung) oder (ii) schwach/stark-Verfahren (Aequivalenz bei $pH \ne 7$, Hydrolyse beachten) — dann loesen.

AUFGABE A: Ordnen Sie Phenolphthalein ($pK_{In} \approx 9$) der Titration $HCl$ gegen $NaOH$ zu.
AUFGABE B: Ordnen Sie einen Indikator der Titration $CH_3COOH$ gegen $NaOH$ zu.

HILFE: A ist stark/stark mit Sprung $4$ bis $10$, also Verfahren (i). B ist schwach/stark mit $pH > 7$, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Phenolphthalein schlaegt im oberen Sprungteil um und ist geeignet. B erfordert Verfahren (ii): Der Aequivalenzpunkt liegt basisch bei etwa $pH = 8{,}7$, daher ist Phenolphthalein geeignet, Methylorange dagegen falsch.

Klausur-Satz: `Salztyp bestimmt die Lage des Aequivalenzpunkts und damit die Indikatorwahl.`

## Schritt 6 — check: Selbsttest zu Titrationskurven und Indikatoren
CHECK (Selbsttest, 3 Fragen):

FRAGE: Was gilt am Aequivalenzpunkt? | ANTWORT: $n(H^+) = n(OH^-)$; der $pH$ folgt aus dem Salztyp.
FRAGE: Warum springt die Kurve? | ANTWORT: Nahe dem Umsatzpunkt aendert ein Tropfen $\frac{[H^+]}{[OH^-]}$ um Groessenordnungen, also springt $pH = -\log[H^+]$.
FRAGE: Wie waehlt man den Indikator? | ANTWORT: Es muss $pK_{In}$ im Sprungbereich liegen, also $pH \approx pK_{In} \pm 1$ im Steilteil.

Klausur-Satz: `Ohne Sprungtreffer kein verlaesslicher Farbumschlag.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: Aequivalenzpunkt und Neutralpunkt seien immer identisch.
   Korrektur: Nur stark/stark trifft $pH = 7$; bei schwachen Partnern hydrolysiert das Salz sauer oder basisch.
   Korrektur-Satz: `Der Aequivalenzpunkt liegt nur bei stark/stark exakt bei pH 7.`
2. Fehlvorstellung: Jeder Indikator passe zu jeder Titration, Farbe sei Geschmackssache.
   Korrektur: Nur ein Umschlag im Steilbereich ist scharf; daneben schleppt die Farbe und der Fehler waechst auf Milliliter.
   Korrektur-Satz: `Der Indikator muss zum Sprungbereich gehoeren, nicht zur Lieblingsfarbe.`

## Schritt 7 — szenario: Klausurtransfer: Titrationskurven und Indikatoren
ROLLE: Du bist Laborant in der Qualitaetskontrolle.
SITUATION: Eine Essigprobe soll auf $c(CH_3COOH)$ geprueft werden; ein Kollege will Methylorange verwenden.
AUFGABE (beurteilen, AFB III): Beurteilen Sie die Wahl in einer zusammenhaengenden Darstellung (ca. 150 Woerter), berechnen Sie die Auswertung mit $c_aV_a = c_bV_b$ im Prinzip und schlagen Sie einen korrekten Indikator mit Begruendung vor.
RUBRIC (30 XP): Einordnung schwach/stark mit $pH > 7$ (10 XP) | Ablehnung von Methylorange mit $pK_{In}$-Argument (10 XP) | Alternative Phenolphthalein plus Auswerteformel (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY: Merke Sprung, Salz, Umschlag: $n(H^+) = n(OH^-)$ markiert den Punkt, Hydrolyse legt den $pH$ fest, $pK_{In}$ im Sprung sichert die Farbe. Faustregel stark/stark grosszuegig, schwach/stark waehlerisch.

REFLEXION:
1. Was fiel schwerer — die Volumenrechnung (Schritt 4) oder die Indikatorwahl (Schritt 5)?
2. Plane: Beim naechsten Mal skizziere ich zuerst die Kurvenlage, dann waehle ich $pK_{In}$.

Anekdote (DE): Der Chemiker Robert Wilhelm Bunsen titrierte in Heidelberg so sorgfaeltig, dass seine Studenten den Umschlag auf den Tropfen genau trafen. Sein Brenner mit $CH_4 + 2O_2 \to CO_2 + 2H_2O$ lieferte die saubere Flamme dazu — Praezision in Flamme und Buerette gehoerten fuer ihn zusammen.

Bezug: `Bunsens Schule zeigt: Saubere Flamme plus scharfer Umschlag ergeben verlaessliche Werte.`
