---
fach: SoWi
thema: "Lorenzkurve und Gini-Koeffizient"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, SoWi, Ungleichheit]
version: Lesson-v3
---

# Lernreise: Lorenzkurve und Gini-Koeffizient (L1, Ziel Klausur)

<!-- Lesson-v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst **Lorenzkurve** und **Gini-Koeffizient** in je einem Satz definieren und Diagonale korrekt deuten.
2. Du kannst aus Quintilen mit $B = Trapezsumme$ die Flaeche bestimmen und $Gini = 1 - 2B$ berechnen.
3. Du kannst mit dem Kriterium **Chancengerechtigkeit** ein Urteil zu Umverteilung formulieren und mit einem Klausur-Satz schliessen (AFB II/III).

### Hook / Phaenomen

Zwei Regionen, gleiche Zahl 0.34, voellig andere Armut: Wie kann eine Zahl luegen? Gini 0.4 als Warnlinie klingt nach Naturgesetz, ist aber Konvention. Was zeigt die Kurve, was verschweigt die Zahl?

### Fachbegriff & Definition

Die **Lorenzkurve** traegt kumulierte Bevoelkerung gegen kumuliertes Einkommen als Bogen unter der Diagonalen ab. Der **Gini-Koeffizient** fasst den Abstand als $Gini = A/(A + B)$ oder $Gini = 1 - 2B$ zwischen $0 = gleich$ und $1 = ungleich$. Die **Diagonale** markiert perfekte Gleichheit, die Woelbung markiert Ungleichheit. Kurz: Bogen sehen, Zahl rechnen, beide deuten.

### Wirkungsgefuege / Modell

Der Mechanismus laeuft in drei Stufen: **Sortieren, Flaechen, Deuten**. Erstens sortiert $Quintil = 8 + 13 + 17 + 23 + 39$ zu $kumuliert = 8 + 21 + 38 + 61 + 100$. Zweitens misst Trapez mit $B = SummeTrapez$ etwa $B = 0.33$ und $Gini = 1 - 2B = 0.34$. Drittens deutet $Skala = 0Bis1$ mittlere Ungleichheit bei $Warnung = 0.4$ als Konvention. Faellt Kurve aus, wird $Gini = Zahl$ blind fuer Form.

Klausur-Satz: `Die Lorenzkurve veranschaulicht die Einkommensverteilung, und der Gini-Koeffizient fasst ihren Abstand zur Gleichverteilungsgeraden zu einer Zahl zwischen 0 und 1 zusammen.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Flaeche, Bogen, Quote: Alles misst anders. Wer nur Zahl nennt, verliert Deutung. Diese fuenf Begriffe geben dir Lineal und Massstab.

### Fachbegriffe & Definitionen

- **Lorenzkurve:** Der Bogen mit $x = Bevoelkerung$ gegen $y = Einkommen$ kumuliert. Je tiefer $Bogen = durchhaengend$, desto ungleicher $Verteilung$.
- **Gini-Koeffizient:** Die Zahl mit $Gini = 1 - 2B$ aus Flaeche $B$ unter Kurve. Es gilt $0 = gleich$ und $1 = maximal$ als Skala.
- **Quintilsanteil:** Der Baustein mit $Teil = 20Prozent$ Gruppe zu Einkommen. Beispiel $8 + 13 + 17 + 23 + 39 = 100$ als Rohdaten.
- **Armutsgefaehrdung:** Die Quote mit $Schwelle = 60ProzentMedian$. Sie ergaenzt $Gini = Verteilung$ durch $Teilhabe = Minimum$.
- **Umverteilung:** Die Korrektur mit $MarktGini - StaatGini = Effekt$. Beispiel $0.50 - 0.29 = 0.21$ als Steuerwirkung.

### Wirkungsgefuege / Modell

Die Begriffe greifen ineinander: **Quintile** liefern mit $Roh = Prozent$ das Material, **Lorenzkurve** zeigt mit $Bogen = Form$ die Gestalt. **Gini** rechnet mit $Gini = 1 - 2B$ die Zahl, **Armut** und **Umverteilung** liefern $Sinn = Bewertung$. Wer in der Klausur vergleicht, muss deshalb immer fragen: Was sagt Form, was sagt Zahl, was folgt daraus?

Klausur-Satz: `Der Gini-Koeffizient ergibt sich als Verhaeltnis der Flaeche zwischen Diagonale und Lorenzkurve zur Gesamtflaeche unter der Diagonalen.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Region A ungleicher als B, doch beide brauchen Politik: Reicht Zahl fuer Urteil? Trapez zaehlt, Kriterium wertet. Genau hier trennt sich Rechnen von Entscheiden.

### Fachbegriff & Definition

Das **Trapez-Verfahren** berechnet $B$ aus fuenf Trapezen der Breite $0.2$ und $Gini = 1 - 2B$. Es startet mit $kumuliertA = 8 + 21 + 38 + 61 + 100$ gegen $kumuliertB = 11 + 26 + 45 + 69 + 100$. Es vergleicht $GiniA > GiniB$ als Rangfolge. Die Formel lautet $Ungleicher \iff KurveTiefer + GiniHoeher$.

### Wirkungsgefuege / Modell

Denke in Kausalkette: **Auftragen, Rechnen, Urteilen**. Erstens traegt $x = 20 + 40 + 60 + 80 + 100$ gegen $y = kumuliert$ zwei Boegen ab. Zweitens rechnet $B = 0.33$ zu $Gini = 0.34$ bei A und kleiner bei B. Drittens urteilt **Chancengerechtigkeit**: Zahl plus Kurve plus Kontext begruenden $Umverteilung = jaBeiStruktur$. Genau diese Stufe verlangt in der Klausur ein **kriteriengeleitetes Urteil**, keine Zahl ohne Satz.

```diagram
  Quintile [8 + 13 + 17 + 23 + 39]
  Quintile -> Kurve [kumuliert + Bogen]
  Kurve -> Zahl [B + Gini = 1 - 2B]
  Zahl -> Urteil (Vergleich + Kriterium)
```

Klausur-Satz: `Je staerker die Lorenzkurve nach unten gewoelbt ist, desto groesser ist der Gini-Koeffizient und desto ungleicher die Verteilung.`

## Anekdote & Fun-Fact

Der Gini-Koeffizient ist nach dem italienischen Statistiker Corrado Gini benannt, der das Maß um 1912 entwickelte — aufbauend auf der Lorenz-Kurve des amerikanischen Ökonomen Max O. Lorenz. Eine viel zitierte „Warnlinie" von 0,4 hat dagegen keine feste wissenschaftliche Grundlage: Sie ist eine Konvention, keine Naturgrenze. Zwei Länder mit demselben Gini-Wert können außerdem völlig unterschiedliche Verteilungen haben

Bezug zum Konzept: `Das Beispiel zeigt, wie aus Beobachtung ein pruefbares Verfahren mit $x_1$ und $x_2$ entsteht.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (AFB II): Gegeben sind die Quintilsanteile $8\%$, $21\%$, $38\%$, $61\%$, $100\%$ (kumuliert). Bestimmen Sie mit der Trapezmethode die Flaeche $B$ und berechnen Sie $Gini = 1 - 2B$. Deuten Sie den Wert auf der Skala von $0$ (Gleichheit) bis $1$ (Ungleichheit).

HILFE:
1. Schritt 1: Rekonstruiere den Fall und notiere die gegebenen Groessen $x_1$ und $x_2$.
2. Schritt 2: Wende die Leitformel an und berechne $d = x_2 - x_1$.
3. Schritt 3: Deute das Ergebnis am Kriterium und formuliere den Klausur-Satz.

MUSTERLOESUNG: Die kumulierten Anteile werden gegen $20\%$, $40\%$, $60\%$, $80\%$, $100\%$ abgetragen. Die Flaeche $B$ ergibt sich aus fuenf Trapezen der Breite $0{,}2$. Mit $B \approx 0{,}33$ folgt $Gini = 1 - 2B \approx 0{,}34$. Der Wert liegt im mittleren Bereich und zeigt eine deutliche, aber keine extreme Ungleichheit an.

Klausur-Satz: `Mit einem Gini-Koeffizienten von rund 0,29 liegt die Verteilung der verfuegbaren Einkommen deutlich unter dem Wert der Markteinkommen, was die umverteilende Wirkung von Steuern und Transfers zeigt.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens -- (i) Kurven-Verfahren (Lorenzkurve, qualitative Rangfolge) oder (ii) Koeffizienten-Verfahren (Trapezmethode, $Gini$-Wert) -- und loese dann die Aufgabe.

AUFGABE A: Ein Fall verlangt nur eine qualitative Rangfolge ohne Zahlenwert.
AUFGABE B: Ein Fall verlangt einen belegten Vergleich mit Kennzahl und Begruendung.

HILFE: Aufgabe A nennt kein Berechnungsziel, daher Verfahren (i). Aufgabe B verlangt eine Kennzahl wie $Gini$ oder $p_N(q) = p_A(q)$, daher Verfahren (ii). Die Wahl des Verfahrens steht vor jeder Rechnung.

ANTWORT: Aufgabe A erfordert Verfahren (i), weil eine Rangfolge aus der Form genuegt. Aufgabe B erfordert Verfahren (ii), weil erst die Kennzahl mit $d = x_2 - x_1$ ein begruendetes Urteil erlaubt.

Klausur-Satz: `Fuer eine reine Rangfolge genuegt der Blick auf die Lorenzkurve, fuer einen begruendeten Vergleich der Verteilung ist der Gini-Koeffizient noetig.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie ist der Gini-Koeffizient definiert und welche Werte kann er annehmen? | ANTWORT: Er ist das Verhaeltnis der Flaeche zwischen Diagonale und Lorenzkurve zur Gesamtflaeche; er liegt zwischen 0 (voellig gleich) und 1 (voellig ungleich).
FRAGE: Wie liest man aus zwei Lorenzkurven ab, welche Verteilung ungleicher ist? | ANTWORT: Die Kurve, die tiefer durchhaengt und damit weiter von der Diagonalen entfernt liegt, gehoert zur ungleicheren Verteilung.
FRAGE: Welche vier Dimensionen der Ungleichheit und je ein Indikator gehoeren zum EF-Grundwissen? | ANTWORT: Einkommen/Vermoegen (Gini, Armutsgefaehrdungsquote), Bildung (Bildungstrichter), Geschlecht (Gender Pay Gap) und Herkunft (Bildungsbeteiligung, Armutsrisiko).

Klausur-Satz: `Der Gini-Koeffizient verdichtet die gesamte Lorenzkurve zu einer Zahl zwischen 0 und 1, waehrend die vier Dimensionen die unterschiedlichen Erscheinungsformen der Ungleichheit erfassen.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Die beiden Verfahren seien austauschbar und fuehrten stets zum gleichen Ergebnis.
   Korrektur-Satz: `Verfahren (i) liefert nur eine Rangfolge, Verfahren (ii) liefert eine Kennzahl; beide duerfen nicht gleichgesetzt werden.`

2. Fehlkonzept: Ein einzelner Wert wie $Gini$ oder $p_G$ spreche bereits fuer sich und brauche kein Kriterium.
   Korrektur-Satz: `Erst die Deutung der Kennzahl am Kriterium mit $d = x_2 - x_1$ ergibt ein klausurtaugliches Urteil.`

## Schritt 7 — szenario

ROLLE: Du bist Mitarbeiter/in einer statistischen Abteilung und sollst fuer einen Ausschuss die Einkommensverteilung zweier Regionen vergleichen.
SITUATION: Fuer Region A nennt M1 die Quintilsanteile 8 / 13 / 17 / 23 / 39 %, fuer Region B die Anteile 11 / 15 / 19 / 24 / 31 %. Der Ausschuss moechte wissen, in welcher Region die Ungleichheit groesser ist und ob eine Umverteilungspolitik zu rechtfertigen sei. Beurteilen Sie die Situation in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), stuetzen Sie sich auf die Lorenz-/Gini-Logik und nennen Sie ein Kriterium.
RUBRIC (30 XP): Aufstellen der kumulierten Anteile und der Lorenz-Idee (6 XP) | Berechnung bzw. plausibler Vergleich der Gini-Werte von A und B (8 XP) | Benennung und Anwendung des Kriteriums Chancengerechtigkeit (10 XP) | Kriteriengeleitetes Urteil zur Umverteilung (6 XP)
SITUATION: Fuer Region A nennt M1 die Quintilsanteile 8 / 13 / 17 / 23 / 39 %, fuer Region B die Anteile 11 / 15 / 19 / 24 / 31 %. Der Ausschuss moechte wissen, in welcher Region die Ungleichheit groesser ist und ob eine Umverteilungspolitik zu rechtfertigen sei. Beurteilen Sie die Situation in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), stuetzen Sie sich auf die Lorenz-/Gini-Logik und nennen Sie ein Kriterium.
RUBRIC (30 XP): Aufstellen der kumulierten Anteile und der Lorenz-Idee (6 XP) | Berechnung bzw. plausibler Vergleich der Gini-Werte von A und B (8 XP) | Benennung und Anwendung des Kriteriums Chancengerechtigkeit (10 XP) | Kriteriengeleitetes Urteil zur Umverteilung (6 XP)
AUFGABE (AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Kriterium, Anwendung und Urteil.
RUBRIC (30 XP): These mit Kriterium (5 XP) | Rekonstruktion mit $x_1$, $x_2$ (10 XP) | Anwendung mit $d = x_2 - x_1$ (10 XP) | Fazit mit Fachbegriffen (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Takeaway-Satz: `Begriff schaerfen, Wahl des Verfahrens treffen, Kennzahl mit $d = x_2 - x_1$ deuten und kriteriengeleitet urteilen.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer -- die Anwendung mit $x_1$ und $x_2$ (Schritt 4) oder die Wahl des Verfahrens (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst das Aufgabenziel und waehle danach Verfahren (i) oder (ii).
