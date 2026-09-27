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

## Schritt 1 — entdecken: Ziele und Phaenomen-Einstieg

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst **Lorenzkurve** und **Gini-Wert** in je einem Satz definieren und Diagonale korrekt deuten.
2. Du kannst am Werkzeug zeigen, wie sich Bogen hebt oder senkt und wie der Wert zwischen null und eins reagiert.
3. Du kannst mit dem Kriterium **Chancengerechtigkeit** ein Urteil zu Umverteilung formulieren und mit einem Klausur-Satz schliessen (AFB II/III).

### Hook / Phaenomen

Stell dir vor, zwei Regionen melden denselben Wert von null Komma drei vier, doch in der einen Region lebt fast jedes Kind in gesicherter Lage, waehrend in der anderen Region viele Familien trotz Arbeit kaum Miete und Lohn zusammenbringen. Wie kann eine einzige Zahl zwei voellig verschiedene Wirklichkeiten verdecken, und warum klingt die Warnlinie von null Komma vier wie ein Naturgesetz, obwohl sie nur eine Konvention der Berichterstattung ist. In dieser Lektion betrachtest du zuerst die Kurve als Bogen der Verteilung, dann liest du am Werkzeug Form und Wert parallel, und erst danach deutest du die Zahl am Kriterium der Chancengerechtigkeit.

Klausur-Satz: `Die Lorenzkurve veranschaulicht die Einkommensverteilung, und der Gini-Koeffizient fasst ihren Abstand zur Gleichverteilungsgeraden zu einer Zahl zwischen 0 und 1 zusammen.`

## Schritt 2 — entdecken: Fachbegriffe und Pre-Training

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Flaeche, Bogen, Quote: Alles misst anders. Wer nur Zahl nennt, verliert Deutung. Diese fuenf Begriffe geben dir Lineal und Massstab.

### Fachbegriffe und Definitionen

- **Lorenzkurve:** Der Bogen aus kumulierter Bevoelkerung gegen kumuliertes Einkommen unter der Diagonalen. Je tiefer der Bogen durchhaengt, desto ungleicher die Verteilung.
- **Gini-Wert:** Der Wert aus dem Abstand zwischen Diagonale und Bogen auf einer Skala von null bis eins. Null steht fuer voellige Gleichheit, eins fuer groesste Ungleichheit.
- **Quintilsanteil:** Der Baustein aus fuenf Gruppen zu je zwanzig Prozent mit ihrem Einkommensanteil. Beispiel Region A mit breiter Spreizung gegen Region B mit engerer Staffelung.
- **Armutsgefaehrdung:** Die Quote mit Schwelle bei sechzig Prozent des mittleren Einkommens. Sie ergaenzt den Verteilungswert durch den Blick auf Teilhabe am Minimum.
- **Umverteilung:** Die Korrektur vom Marktergebnis zum verfuegbaren Einkommen ueber progressive Steuern und Transfers. Sie hebt die Kurve und senkt den Wert.

### Wirkungsgefuege / Modell

Die Begriffe greifen ineinander: **Quintile** liefern das Material, **Lorenzkurve** zeigt die Gestalt als Bogen. **Gini-Wert** verdichtet den Abstand zur Diagonalen zu einem Wert, **Armut** und **Umverteilung** liefern die Bewertung. Wer in der Klausur vergleicht, muss deshalb immer fragen: Was sagt Form, was sagt Wert, was folgt daraus.

Klausur-Satz: `Der Gini-Koeffizient ergibt sich als Verhaeltnis der Flaeche zwischen Diagonale und Lorenzkurve zur Gesamtflaeche unter der Diagonalen.`

## Schritt 3 — entdecken: Kernkonzept und Wirkungsmodell

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Gleicher Wert, voellig andere Armut: Kann eine Zahl luegen. Warnlinie null Komma vier: Naturgesetz oder Konvention. Was zeigt die Kurve, was verschweigt der Wert.

### Spiel-Aufgabe mit [Werkzeug: gini-allocator]

Oeffne [Werkzeug: gini-allocator]. Ziehe den Einkommens-Regler der untersten Gruppe nach oben und beobachte live, wie sich die Lorenzkurve hebt und der Wert sinkt. Vergleiche Region A mit breiter Spreizung gegen Region B mit engerer Staffelung. Lies Bogenform und Wert parallel ab.

### Aha-Moment und Gesetz

Aha-Moment: Auftragen, Ablesen, Urteilen. Erstens tragen kumulierte Anteile zwei Boegen unter der Diagonalen ab. Zweitens zeigt das Werkzeug Flaeche und Wert: tieferer Bogen gehoert zu hoeherem Wert. Drittens urteilt das Kriterium Chancengerechtigkeit: Wert plus Form plus Kontext. Gesetz: Je tiefer die Kurve durchhaengt, desto hoeher der Wert und desto ungleicher die Verteilung.

```diagram
  Quintile [fuenf Gruppen mit Anteilen als Rohdaten]
  Quintile -> Kurve [kumulierte Anteile plus Bogen unter Diagonale]
  Kurve -> Wert [Abstand zur Diagonale plus Skala null bis eins]
  Wert -> Urteil [Vergleich plus Chancengerechtigkeit]
```

Kausalkette: Quintile kumulieren, Bogen zeigt Form und Abstand, Deutung an Chancengerechtigkeit mit Blick auf Armut und Umverteilung.

Klausur-Satz: `Je staerker die Lorenzkurve nach unten gewoelbt ist, desto groesser ist der Gini-Koeffizient und desto ungleicher die Verteilung.`

## Anekdote und Fun-Fact

Der Gini-Wert ist nach dem italienischen Statistiker Corrado Gini benannt, der das Mass um neunzehnhundertzwölf entwickelte, aufbauend auf der Lorenz-Kurve des amerikanischen Oekonomen Max O. Lorenz. Eine viel zitierte Warnlinie von null Komma vier hat dagegen keine feste wissenschaftliche Grundlage: Sie ist eine Konvention, keine Naturgrenze. Zwei Laender mit demselben Wert koennen ausserdem voellig unterschiedliche Verteilungen haben.

Bezug zum Konzept: Das Beispiel zeigt, warum Form und Wert stets gemeinsam mit Kriterium gedeutet werden muessen und ein Wert allein kein Fairness-Urteil traegt.

## Schritt 4 — ausprobieren: Interaktive Praxis und Gini-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: gini-allocator]

Ziehe im Tool die Einkommens-Regler der Quintile und beobachte live, wie sich die Lorenzkurve hebt oder senkt und wie der Wert zwischen null und eins reagiert; vergleiche zwei Verteilungen und deute die Form der Kurve parallel zum Wert.

AUFGABE Spiel-Raetsel (AFB II): Stelle im Tool Region A ein. Verschiebe Einkommen von oben nach unten, bis der Wert sichtbar faellt und die Kurve sich hebt. Beschreibe in Worten, wo der Bogen flacher wird und warum erst Form plus Wert plus Kriterium ein Urteil erlauben.

HILFE:
1. Schritt 1: Trage kumulierte Anteile als Bogen unter der Diagonalen ab.
2. Schritt 2: Verschiebe Anteile, lies Form und Wert am Werkzeug ab.
3. Schritt 3: Deute an Skala von null gleich bis eins ungleich plus Kriterium und formuliere den Klausur-Satz.

MUSTERLOESUNG: Region A zeigt tiefen Bogen mit hoeherem Wert als mittlere Ungleichheit. Nach Verschiebung von oben nach unten hebt sich die Kurve und der Wert sinkt; erst Zahl plus Form plus Armutsschwelle begruenden ein Urteil zu Umverteilung am Kriterium.

Klausur-Satz: `Mit einem Gini-Koeffizienten von rund 0,29 liegt die Verteilung der verfuegbaren Einkommen deutlich unter dem Wert der Markteinkommen, was die umverteilende Wirkung von Steuern und Transfers zeigt.`

## Schritt 5 — ausprobieren: Weg-Vergleich und Abgrenzung

VERGLEICH: Zwei Wege nutzen dieselbe Verteilung unterschiedlich. Weg A beschreibt die Primaerverteilung mit Leistungsanreizen und Marktloehnen. Weg B korrigiert zur Sekundaerverteilung mit progressiven Steuern und Transfers. Pruefe zuerst die Aufgabe, waehle dann den passenden Weg.

Weg A: Primaerverteilung mit Anreiz. Marktloehne nach Leistung, Bildung und Verantwortung spornen an und lenken Kraefte dorthin, wo sie knapp sind. Staerke ist Motivation und Effizienz, Schwaeche sind Startnachteile und wachsende Spreizung ohne Ausgleich.

Weg B: Sekundaerverteilung mit Ausgleich. Progressive Steuern plus Transfers plus oeffentiche Bildung heben den Bogen und sichern Teilhabe. Staerke sind Fairness und Frieden, Schwaeche sind hohe Lasten und moegliche Anreizverluste.

AUFGABE A: Region A zeigt tiefen Bogen und hohen Wert, Region B zeigt flacheren Bogen und niedrigeren Wert. Stelle im Vergleich dar, welche Kurve weiter von der Diagonalen entfernt liegt und welche Verteilung ungleicher ist. Begruende aus Sicht von Weg A, welche Anreize hinter der Spreizung stehen, ohne bereits ueber Ausgleich zu urteilen.

AUFGABE B: Der Ausschuss fragt, ob Umverteilung zu rechtfertigen sei. Stelle aus Sicht von Weg B dar, wie progressive Steuern und Transfers Kurve und Wert veraendern und wie Armutsquote und Chancengerechtigkeit das Urteil stuetzen. Waeg danach mit Weg A ab, wo Anreize erhalten bleiben muessen. Schliesse mit einem kriteriengeleiteten Urteil zu Ausgleich gegen Anreiz.

HILFE: Aufgabe A verlangt Rangfolge aus Form und Wert ohne Ausgleichsurteil. Aufgabe B verlangt belegten Vergleich mit Werkzeug-Ablesung plus Begruendung am Kriterium. Beide Male erst Weg benennen, dann Bogen und Wert beschreiben, dann Anreiz gegen Ausgleich, dann Urteil.

ANTWORT: Aufgabe A folgt Weg A mit Rangfolge aus Bogenform: tiefere Kurve gehoert zu ungleicherer Verteilung, Anreize erklaeren die Spreizung. Aufgabe B folgt Weg B mit Korrektur: Steuern und Transfers heben die Kurve und senken den Wert, Armut und Chancen stuetzten das Ausgleichsurteil unter Wahrung noetiger Anreize.

Klausur-Satz: `Fuer eine reine Rangfolge genuegt der Blick auf die Lorenzkurve, fuer einen begruendeten Vergleich der Verteilung ist der Gini-Koeffizient noetig.`

## Schritt 6 — check: Selbsttest zu Lorenzkurve und Gini

CHECK (drei Fragen mit Antworten):

FRAGE: Wie ist der Gini-Wert definiert und welche Werte kann er annehmen. | ANTWORT: Er fasst den Abstand zwischen Diagonale und Lorenzkurve zu einem Wert zwischen null voellig gleich und eins voellig ungleich.
FRAGE: Wie liest man aus zwei Lorenzkurven ab, welche Verteilung ungleicher ist. | ANTWORT: Die Kurve, die tiefer durchhaengt und damit weiter von der Diagonalen entfernt liegt, gehoert zur ungleicheren Verteilung.
FRAGE: Welche vier Dimensionen der Ungleichheit und je ein Beispiel gehoeren zum EF-Grundwissen. | ANTWORT: Einkommen und Vermoegen mit Verteilungswert und Armutsquote, Bildung mit Trichter, Geschlecht mit Lohnluecke und Herkunft mit Bildungsbeteiligung und Armutsrisiko.

Klausur-Satz: `Der Gini-Koeffizient verdichtet die gesamte Lorenzkurve zu einer Zahl zwischen 0 und 1, waehrend die vier Dimensionen die unterschiedlichen Erscheinungsformen der Ungleichheit erfassen.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Gleicher Wert heisse gleiche Wirklichkeit, zwei Regionen mit demselben Wert haetten dieselbe Armut und dieselbe Fairness.
   Korrektur-Satz: `Gleiche Werte koennen voellig verschiedene Boegen verdecken; erst Kurvenform plus Armutsquote plus Kontext zeigen, wer wirklich abgehaengt ist.`

2. Fehlkonzept: Die Warnlinie null Komma vier sei ein Naturgesetz, ab dem Gesellschaften automatisch kippten.
   Korrektur-Satz: `Die Warnlinie ist eine Konvention der Berichterstattung ohne feste Schwelle; ob Umverteilung noetig ist, entscheidet das Kriterium der Chancengerechtigkeit, nicht die Zahl allein.`

## Schritt 7 — szenario: Statistikamt und Regionalvergleich-Debatte

ROLLE: Du bist Mitarbeiterin einer statistischen Abteilung und sollst fuer einen Ausschuss die Einkommensverteilung zweier Regionen vergleichen.
SITUATION: Fuer Region A nennt das Material breiter gestreute Quintilsanteile, fuer Region B enger gestaffelte Anteile. Der Ausschuss moechte wissen, in welcher Region die Ungleichheit groesser ist und ob eine Umverteilungspolitik zu rechtfertigen sei. Beurteile die Lage in einer zusammenhaengenden Stellungnahme mit etwa 150 Woertern, stuetze dich auf die Lorenz- und Gini-Logik und nenne ein Kriterium.
AUFGABE (AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Kriterium, Anwendung und Urteil.
RUBRIC (30 XP): Aufstellen der kumulierten Anteile und der Lorenz-Idee (6 XP) | Vergleich der Boegen und Werte von A und B am Werkzeug (8 XP) | Benennung und Anwendung des Kriteriums Chancengerechtigkeit (10 XP) | Kriteriengeleitetes Urteil zur Umverteilung (6 XP)

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY (Kernbotschaft in einem Kasten):

Takeaway-Satz: `Eine Zahl misst Spreizung, erst das Kriterium misst Fairness: Wer Bogen und Wert gemeinsam deutet, urteilt oekonomisch statt aus dem Bauch.`

REFLEXION (zwei Fragen):
1. Wo hast du zuletzt Weg A gegen Weg B abgewogen: Hat dich Anreiz mit Leistung oder Ausgleich mit Steuern und Transfers staerker ueberzeugt, und an welcher Kurvenform hast du das festgemacht.
2. Welchen Fehlschluss willst du kuenftig vermeiden: Wert mit Wirklichkeit zu verwechseln oder Konvention mit Naturgesetz, und mit welcher Prueffrage zu Form plus Armut sicherst du kuenftig dein Urteil.
