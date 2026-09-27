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

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst **Lorenzkurve** und **Gini-Koeffizient** in je einem Satz definieren und Diagonale korrekt deuten.
2. Du kannst aus Quintilen mit $B = Trapezsumme$ die Flaeche bestimmen und $Gini = 1 - 2B$ berechnen.
3. Du kannst mit dem Kriterium **Chancengerechtigkeit** ein Urteil zu Umverteilung formulieren und mit einem Klausur-Satz schliessen (AFB II/III).

### Hook / Phaenomen

Stell dir vor, zwei Regionen melden denselben Wert von 0,34, doch in der einen Region lebt fast jedes Kind in gesicherter Lage, waehrend in der anderen Region viele Familien trotz Arbeit kaum Miete und Lohn zusammenbringen. Wie kann eine einzige Zahl zwei voellig verschiedene Wirklichkeiten verdecken, und warum klingt die Warnlinie von 0,4 wie ein Naturgesetz, obwohl sie nur eine Konvention der Berichterstattung ist. In dieser Lektion betrachtest du zuerst die Kurve als Bogen der Verteilung, dann rechnest du die Flaeche unter der Kurve mit der Trapezmethode, und erst danach deutest du die Zahl zwischen 0 und 1 am Kriterium der Chancengerechtigkeit. Der Mechanismus aus Sortieren und Messen und Deuten schuetzt dich davor, aus einer Zahl allein ein Urteil ueber Fairness oder Umverteilung abzuleiten.


Ausgangslage aus der Vorlage: Zwei Regionen, gleiche Zahl 0.34, voellig andere Armut: Wie kann eine Zahl luegen? Gini 0.4 als Warnlinie klingt nach Naturgesetz, ist aber Konvention. Was zeigt die Kurve, was verschweigt die Zahl?

### Fachbegriff & Definition

Die **Lorenzkurve** traegt kumulierte Bevoelkerung gegen kumuliertes Einkommen als Bogen unter der Diagonalen ab. Der **Gini-Koeffizient** fasst den Abstand als $Gini = A/(A + B)$ oder $Gini = 1 - 2B$ zwischen $0 = gleich$ und $1 = ungleich$. Die **Diagonale** markiert perfekte Gleichheit, die Woelbung markiert Ungleichheit. Kurz: Bogen sehen, Zahl rechnen, beide deuten.

### Wirkungsgefuege / Modell

Der Mechanismus laeuft in drei Stufen: **Sortieren, Flaechen, Deuten**. Erstens sortiert $Quintil = 8 + 13 + 17 + 23 + 39$ zu $kumuliert = 8 + 21 + 38 + 61 + 100$. Zweitens misst Trapez mit $B = SummeTrapez$ etwa $B = 0.33$ und $Gini = 1 - 2B = 0.34$. Drittens deutet $Skala = 0Bis1$ mittlere Ungleichheit bei $Warnung = 0.4$ als Konvention. Faellt Kurve aus, wird $Gini = Zahl$ blind fuer Form.

Klausur-Satz: `Die Lorenzkurve veranschaulicht die Einkommensverteilung, und der Gini-Koeffizient fasst ihren Abstand zur Gleichverteilungsgeraden zu einer Zahl zwischen 0 und 1 zusammen.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

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

Punkte-Hinweis: Nenne $Lorenzkurve$ als Bogen und $Gini$ als Zahl mit $Gini = 1 - 2B$; erst Kurvenform plus Kennzahl plus Kriterium gibt volle Punkte.

Klausur-Satz: `Der Gini-Koeffizient ergibt sich als Verhaeltnis der Flaeche zwischen Diagonale und Lorenzkurve zur Gesamtflaeche unter der Diagonalen.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Gleiche Zahl $Gini = 0{,}34$, voellig andere Armut — kann eine Zahl luegen? Warnlinie $0{,}4$ — Naturgesetz oder Konvention? Was zeigt die Kurve, was verschweigt der Wert?

### Spiel-Aufgabe mit [Werkzeug: gini-allocator]

Oeffne [Werkzeug: gini-allocator]. Ziehe den Einkommens-Regler der untersten Gruppe von 8 auf 11 Prozent und beobachte live, wie sich die Lorenzkurve hebt und $Gini = 1 - 2B$ sinkt. Vergleiche Region A mit $8 + 13 + 17 + 23 + 39$ gegen Region B mit $11 + 15 + 19 + 24 + 31$. Lies $B$ und $Gini$ ab.

### Aha-Moment & Gesetz

Aha-Moment: Auftragen — Rechnen — Urteilen. Erstens kumulieren $x = 20 + 40 + 60 + 80 + 100$ gegen $y = kumuliert$ zwei Boegen. Zweitens misst Trapez mit Breite $0{,}2$ die Flaeche $B \approx 0{,}33$ und $Gini = 1 - 2B \approx 0{,}34$. Drittens urteilt Kriterium Chancengerechtigkeit: Zahl plus Form plus Kontext. Gesetz: $Ungleicher \iff KurveTiefer + GiniHoeher$.

```diagram
  Quintile [8 + 13 + 17 + 23 + 39 = 100]
  Quintile -> Kurve [kumuliert $8 + 21 + 38 + 61 + 100$ + Bogen]
  Kurve -> Zahl [$B \approx 0{,}33$ + $Gini = 1 - 2B \approx 0{,}34$]
  Zahl -> Urteil [Vergleich + Chancengerechtigkeit]
```

Kausalkette: Quintile kumulieren — Trapez misst $B$ und $Gini = 1 - 2B$ — Deutung an Chancengerechtigkeit; Abgrenzung zu $p_N(q) = p_A(q)$ mit $q_A - q_N$ und zu $U = \sum(Lust - Leid)$ steht vor jedem Urteil.

Klausur-Satz: `Je staerker die Lorenzkurve nach unten gewoelbt ist, desto groesser ist der Gini-Koeffizient und desto ungleicher die Verteilung.`

## Anekdote & Fun-Fact

Der Gini-Koeffizient ist nach dem italienischen Statistiker Corrado Gini benannt, der das Maß um 1912 entwickelte — aufbauend auf der Lorenz-Kurve des amerikanischen Ökonomen Max O. Lorenz. Eine viel zitierte „Warnlinie" von 0,4 hat dagegen keine feste wissenschaftliche Grundlage: Sie ist eine Konvention, keine Naturgrenze. Zwei Länder mit demselben Gini-Wert können außerdem völlig unterschiedliche Verteilungen haben

Bezug zum Konzept: `Das Beispiel zeigt, wie aus Beobachtung ein pruefbares Verfahren mit $x_1$ und $x_2$ entsteht.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Gini-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: gini-allocator]

Ziehe im Tool die Einkommens-Regler der Quintile und beobachte live, wie sich die Lorenzkurve hebt oder senkt und wie $Gini$ zwischen 0 und 1 reagiert; vergleiche zwei Verteilungen, lies $B$ per Trapezmethode ab und deute die Form der Kurve.

AUFGABE Spiel-Raetsel (AFB II): Stelle im Tool Region A ein. Verschiebe Einkommen von oben nach unten, bis $Gini$ von $0{,}34$ auf $0{,}29$ faellt. Berechne $B$ per Trapezmethode mit Breite $0{,}2$ und deute den Wert auf $0$ bis $1$.

HILFE:
1. Schritt 1: Trage $20$, $40$, $60$, $80$, $100$ gegen kumulierte Anteile ab. 2. Schritt 2: Summiere Trapeze zu $B$, rechne $Gini = 1 - 2B$. 3. Schritt 3: Deute an Skala $0 = gleich$ bis $1 = ungleich$ plus Kriterium und formuliere den Klausur-Satz.

MUSTERLOESUNG: Mit $B \approx 0{,}33$ folgt $Gini = 1 - 2B \approx 0{,}34$ — mittlere Ungleichheit. Nach Umverteilung mit $0{,}50 - 0{,}29 = 0{,}21$ als Effekt sinkt der Wert auf $0{,}29$; die Kurve hebt sich, die Form bleibt deutbar nur mit Kriterium.

Klausur-Satz: `Mit einem Gini-Koeffizienten von rund 0,29 liegt die Verteilung der verfuegbaren Einkommen deutlich unter dem Wert der Markteinkommen, was die umverteilende Wirkung von Steuern und Transfers zeigt.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens -- (i) Kurven-Verfahren (Lorenzkurve, qualitative Rangfolge) oder (ii) Koeffizienten-Verfahren (Trapezmethode, $Gini$-Wert) -- und loese dann die Aufgabe.

AUFGABE A: Ein Fall verlangt nur eine qualitative Rangfolge ohne Zahlenwert.
AUFGABE B: Ein Fall verlangt einen belegten Vergleich mit Kennzahl und Begruendung.

HILFE: Aufgabe A nennt kein Berechnungsziel, daher Verfahren (i). Aufgabe B verlangt eine Kennzahl wie $Gini$ oder $p_N(q) = p_A(q)$, daher Verfahren (ii). Die Wahl des Verfahrens steht vor jeder Rechnung.

ANTWORT: Aufgabe A erfordert Verfahren (i), weil eine Rangfolge aus der Form genuegt. Aufgabe B erfordert Verfahren (ii), weil erst die Kennzahl mit $d = x_2 - x_1$ ein begruendetes Urteil erlaubt.

Klausur-Satz: `Fuer eine reine Rangfolge genuegt der Blick auf die Lorenzkurve, fuer einen begruendeten Vergleich der Verteilung ist der Gini-Koeffizient noetig.`

## Schritt 6 — check: Verständnisprüfung

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

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist Mitarbeiter/in einer statistischen Abteilung und sollst fuer einen Ausschuss die Einkommensverteilung zweier Regionen vergleichen.
SITUATION: Fuer Region A nennt M1 die Quintilsanteile 8 / 13 / 17 / 23 / 39 %, fuer Region B die Anteile 11 / 15 / 19 / 24 / 31 %. Der Ausschuss moechte wissen, in welcher Region die Ungleichheit groesser ist und ob eine Umverteilungspolitik zu rechtfertigen sei. Beurteilen Sie die Situation in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), stuetzen Sie sich auf die Lorenz-/Gini-Logik und nennen Sie ein Kriterium.
RUBRIC (30 XP): Aufstellen der kumulierten Anteile und der Lorenz-Idee (6 XP) | Berechnung bzw. plausibler Vergleich der Gini-Werte von A und B (8 XP) | Benennung und Anwendung des Kriteriums Chancengerechtigkeit (10 XP) | Kriteriengeleitetes Urteil zur Umverteilung (6 XP)
SITUATION: Fuer Region A nennt M1 die Quintilsanteile 8 / 13 / 17 / 23 / 39 %, fuer Region B die Anteile 11 / 15 / 19 / 24 / 31 %. Der Ausschuss moechte wissen, in welcher Region die Ungleichheit groesser ist und ob eine Umverteilungspolitik zu rechtfertigen sei. Beurteilen Sie die Situation in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), stuetzen Sie sich auf die Lorenz-/Gini-Logik und nennen Sie ein Kriterium.
RUBRIC (30 XP): Aufstellen der kumulierten Anteile und der Lorenz-Idee (6 XP) | Berechnung bzw. plausibler Vergleich der Gini-Werte von A und B (8 XP) | Benennung und Anwendung des Kriteriums Chancengerechtigkeit (10 XP) | Kriteriengeleitetes Urteil zur Umverteilung (6 XP)
AUFGABE (AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Kriterium, Anwendung und Urteil.
RUBRIC (30 XP): These mit Kriterium (5 XP) | Rekonstruktion mit $x_1$, $x_2$ (10 XP) | Anwendung mit $d = x_2 - x_1$ (10 XP) | Fazit mit Fachbegriffen (5 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY (Kernbotschaft in einem Kasten):

Takeaway-Satz: `Begriff schaerfen, Wahl des Verfahrens treffen, Kennzahl mit $d = x_2 - x_1$ deuten und kriteriengeleitet urteilen.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer -- die Anwendung mit $x_1$ und $x_2$ (Schritt 4) oder die Wahl des Verfahrens (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst das Aufgabenziel und waehle danach Verfahren (i) oder (ii).
