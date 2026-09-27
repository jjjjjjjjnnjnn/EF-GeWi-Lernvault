---
fach: Mathe
thema: "Von der Sekante zur Tangente"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Von der Sekante zur Tangente (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 25/33 | Krise: Kran-Ausleger Biegemoment 96 kNm | Zielgroessen: f(x) = x^2, Stelle 3, Sekanten mit h gegen 0, Ziel 6 | Tool: tangent-slider -->

## Schritt 1 — entdecken: Vektoren im Nebel
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Sekante als Gerade durch zwei Punkte und Tangente als Grenzlage fuer $h \to 0$ unterscheiden und je ein Bild skizzieren.
2. Du kannst $m = \frac{f(x_0+h)-f(x_0)}{h}$ aufstellen und beschreiben, wie $Q$ gegen $P$ wandert und die Sekante in die Tangente rotiert.
3. Du kannst $f'(3) = 6$ fuer $f(x) = x^2$ von Hand berechnen und gegen die Sekantensteigung $8$ ueber $[3, 5]$ abgrenzen (AFB II).

###

### Hook / Phaenomen

Hook / Phaenomen: Zwei Messpunkte geben eine **Sekante**, ein Messpunkt gibt ein Raetsel. Laesst man den zweiten Punkt auf den ersten zulaufen, wird aus mittlerer **Aenderungsrate** lokale. Der **Differenzenquotient** schrumpft dabei zur **Tangente** zusammen.

`Klausur-Satz: Die Tangente ist der Grenzfall der Sekante: Laeuft h gegen null, wird mittlere zu lokaler Aenderung.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Mittlere Aenderungsrate:** Der Differenzenquotient ueber ein Intervall misst die Sekantensteigung zwischen zwei Punkten. Sie ist die Sekantensteigung ueber ein sichtbares Intervall. Mechanismus: Zwei Funktionswerte einsetzen, Differenz bilden und durch die Intervallbreite teilen. Klausur-Tipp: Intervall nennen, Formel aufstellen und Mittel gegen Moment abgrenzen.
- **Lokale Aenderungsrate:** Der Grenzwert an einer einzigen Stelle misst die Tangentensteigung als Moment. Sie ist die Tangentensteigung in genau einem Punkt. Mechanismus: Intervallbreite h gegen null schrumpfen lassen und den Grenzwert ablesen. Klausur-Tipp: Stelle nennen, Grenzwert bilden und als Momentanwert deuten.
- **Sekante:** Eine Gerade durch zwei verschiedene Punkte des Graphen verbindet zwei Momente zu einem Mittel. Sie schneidet den Graphen in zwei Punkten und mittelt dazwischen. Mechanismus: Punkte P und Q festlegen und die Verbindungsgerade zeichnen. Klausur-Tipp: Beide Punkte angeben und die Gerade als Mittelwert-Geometrie benennen.
- **Tangente:** Eine Gerade durch einen einzigen Punkt als Grenzlage aller Sekanten beruehrt den Graphen im Moment. Sie beruehrt den Graphen in genau einem Punkt. Mechanismus: Punkt Q auf P zuwandern lassen, bis die Sekante in die Beruehrlage rotiert. Klausur-Tipp: Beruehrpunkt nennen und Tangente als Grenzlage beschreiben.
- **Differenzenquotient:** Der Term $m=(f(x+h)-f(x))/h$ misst die Sekante auf dem Intervall der Breite h. Er ist die Rechenform beider Raten und traegt h im Nenner. Mechanismus: Funktionswerte einsetzen, Term aufstellen und h herauskuerzen. Klausur-Tipp: Term vollständig aufstellen, kuerzen und erst danach den Grenzuebergang betrachten.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

`Klausur-Satz: Der Differenzenquotient liefert die Sekantensteigung ueber ein Intervall, der Differentialquotient die Tangentensteigung an einer Stelle.`

## Schritt 3 — entdecken: Wirkungskette hinter Von der Sekante zur Tangente
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von zwei Punkten ueber die Rotation zum einzigen Moment: Zuerst fixiert man P und laesst Q mit der Breite h heranwandern, dann stellt man $m=(f(x+h)-f(x))/h$ auf und kuerzt h heraus, schliesslich betrachtet man $h \to 0$ und liest den Grenzwert als Tangentensteigung ab. Fuer $f(x)=x^2$ an $x_0=3$ gilt $m(h)=(6h+h^2)/h=6+h$, also $f'(3)=6$. Das Intervall $[3,5]$ liefert dagegen $m=8$ und beantwortet die Mittelfrage statt der Momentfrage.

```diagram
+------------------------------------------+
| P(3|9) fixiert, Q(3+h) wandert heran      |
|   Sekante m(h) = 6 + h                   |
|     \\  h = 2.0  ->  m = 8                |
|      \\ h = 0.5  ->  m = 6.5              |
|       \\ h -> 0  ->  m = 6 Tangente       |
| Mittel [3;5] = 8  vs  Moment an 3 = 6    |
+------------------------------------------+
```
Formelkern: $m=(f(x+h)-f(x))/h$

$$m_s = \frac{f(3+h)-f(3)}{h}\to m_t = 6$$
`Klausur-Satz: Laesst man h gegen 0 streben, so geht die Sekante durch P und Q in die Tangente im Punkt P ueber.`

## Anekdote & Fun-Fact
Das Wort Tangente kommt vom lateinischen $tangere$, beruehren, und Sekante von $secare$, schneiden. Eine Sekante schneidet den Graphen in zwei Punkten, eine Tangente beruehrt ihn in einem einzigen. Die Frage, wie man an eine Kurve eine Tangente legt, beschaeftigte Mathematiker lange vor der Erfindung der Ableitung: Aus genau diesem Problem entstand die Differentialrechnung.

Bezug zum Konzept: `Der Grenzuebergang von der schneidenden Sekante zur beruehrenden Tangente liefert die Ableitung.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Vektoren im Nebel
Kontinuitaet: Vorher Mathe-Rekonstruktion-Symmetrie-Bedingungen-L2.md | Nachher Mathe-Sekante-zu-Tangente-L1.md. Krise dieser Episode: Kran-Ausleger Biegemoment 96 kNm. Zielgroessen: f(x) = x^2, Stelle 3, Sekanten mit h gegen 0, Ziel 6

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: tangent-slider]

AUFGABE (Levelziel, AFB II): Knacke das Tangenten-Level: Stelle im Sandbox-Slider nacheinander $h = 2{,}0$, $h = 1{,}0$ und $h = 0{,}1$ an $x_0 = 3$ fuer $f(x) = x^2$ ein. Lies jedes Mal $m(h)$ ab, beobachte wie Punkt $Q$ auf $P$ zuwandert und wie die Sekante in die Tangente rotiert, und berechne dann exakt von Hand $f'(3)$. Vergleiche dein Sandbox-Ergebnis mit der Sekantensteigung ueber $[3, 5]$ und erklaere den Unterschied in einem Satz.

HILFE:
1. Setze $m(h) = (f(3+h)-f(3))/h$ an und lies zuerst die Sandbox-Werte fuer $h = 2{,}0$ zu $m = 8$ und $h = 0{,}1$ zu $m = 6{,}1$ ab.
2. Rechne von Hand $(3+h)^2 = 9+6h+h^2$, kuerze $h$ zu $m(h) = 6+h$ und bilde $h \to 0$ zu $f'(3) = 6$.
3. Berechne zum Vergleich $(f(5)-f(3))/2 = 8$ und ordne Mittel gegen Moment zu.

MUSTERLOESUNG: Sandbox $h = 2{,}0$ liefert $m = 8$, $h = 1{,}0$ liefert $m = 7$, $h = 0{,}1$ liefert $m = 6{,}1$, die Tendenz zeigt $6$. Rechnung $f(3+h) = 9+6h+h^2$, also $m(h) = 6+h$ fuer $h \ne 0$, mit $h \to 0$ folgt $f'(3) = 6$. Die Sekante ueber $[3, 5]$ ergibt $(25-9)/2 = 8$. Die $8$ mittelt ueber das Intervall, die $6$ misst den Moment, daher ist $8$ groesser, weil die Parabel rechts steiler wird.

`Klausur-Satz: Der Grenzwert des Differenzenquotienten ergibt f'(3) = 6, waehrend die Sekantensteigung ueber [3; 5] den groesseren Wert 8 besitzt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Vektoren im Nebel
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Triff zuerst die Wahl des Verfahrens: (i) Sekanten-Verfahren (ein Intervall, zwei Punkte, mittlere Aenderungsrate mit Differenzenquotient) oder (ii) Tangenten-Verfahren (eine Stelle oder ein Zeitpunkt, Momentanwert mit Ableitung) > dann rechnen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Ein Fahrzeug legt in 4 Stunden insgesamt $240\,\mathrm{km}$ zurueck. Gefragt ist die Durchschnittsgeschwindigkeit der gesamten Fahrt.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Ein Blitzer misst die Geschwindigkeit des Fahrzeugs genau in dem Moment, in dem es die Messstelle passiert.

HILFE: Aufgabe A nennt ein Zeitintervall mit zwei Endwerten, daher Verfahren (i) mit Sekante. Aufgabe B nennt einen einzelnen Zeitpunkt, daher Verfahren (ii) mit Tangente und Ableitung.

ANTWORT: A erfordert Verfahren (i): $v_{\text{mittel}} = 240\,\mathrm{km} / 4\,\mathrm{h} = 60\,\mathrm{km/h}$; dies ist die mittlere Aenderungsrate, also die Sekantensteigung der Weg-Zeit-Funktion. B erfordert Verfahren (ii): Der Blitzer erfasst die Momentangeschwindigkeit $v(t_0) = s'(t_0)$, also die Tangentensteigung an der Stelle $t_0$.

`Klausur-Satz: Durchschnittsgeschwindigkeiten entsprechen Sekantensteigungen, Momentangeschwindigkeiten entsprechen Tangentensteigungen.`

## Schritt 6 — check: Selbsttest zu Von der Sekante zur Tangente: Vektoren im Nebel
CHECK (drei Fragen mit Antworten):

- FRAGE: Wie lautet der Differenzenquotient einer Funktion $f$ im Intervall $[x_0, x_0 + h]$? | ANTWORT: $m = (f(x_0 + h) - f(x_0)) / h$, also die Steigung der Sekante durch die beiden Punkte.
- FRAGE: Was geschieht geometrisch mit der Sekante, wenn $h$ gegen $0$ geht? | ANTWORT: Sie dreht sich um den festen Punkt $P(x_0, f(x_0))$ und geht im Grenzfall in die Tangente ueber.
- FRAGE: Warum darf man $h$ nicht schon vor dem Kuerzen gleich $0$ setzen? | ANTWORT: Weil sonst der unbestimmte Ausdruck $0/0$ entstuende; erst nach dem Kuerzen ist der Grenzwert ablesbar.

`Klausur-Satz: Der Differentialquotient f'(x0) ist der Grenzwert des Differenzenquotienten fuer h gegen 0.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Sekantensteigung und Tangentensteigung unterscheiden sich nur in der Zeichnung, nicht im Wert.
   Korrektur-Satz: `Die Sekantensteigung ueber ein Intervall darf nicht mit der lokalen Steigung an einem seiner Raender gleichgesetzt werden.`
2. Fehlkonzept: Der Grenzuebergang $h \to 0$ setzt unerlaubt den Nenner null.
   Korrektur-Satz: `Beim Grenzuebergang wird der Differenzenquotient zuerst algebraisch gekuerzt, bevor h gegen 0 betrachtet wird.`

## Schritt 7 — szenario: Klausurtransfer: Von der Sekante zur Tangente: Vektoren im Nebel
ROLLE: Du bist Tutorin in der EF und bereitest eine Mitschuelerin auf die ZKE vor.
SITUATION: Deine Mitschuelerin hat mit dem GTR fuer $f(x) = x^3$ im Intervall $[-1, 1]$ eine Durchschnittssteigung von $1$ erhalten, ist aber verwirrt, weil die Tangente an der Stelle $x = 0$ waagerecht verlaeuft. Erklaere ihr in einer zusammenhaengenden Darstellung (circa 150 Woerter) den Unterschied zwischen Sekante und Tangente und ordne beide Ergebnisse ein.
AUFGABE (interpretieren, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit These, Sekantenrechnung, Tangentenbegruendung und Fazit.
RUBRIC (30 XP): Klare These zum Unterschied Sekante und Tangente (5 XP) | Korrekte Sekantenrechnung $(f(1) - f(-1)) / 2 = 1$ (10 XP) | Begruendung der Tangentensteigung $f'(0) = 0$ (10 XP) | Abschlussfazit mit Fachbegriffen (5 XP).

`Klausur-Satz: Wer Sekantensteigung berechnet, Grenzprozess zeigt und Tangentensteigung deutet, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Vektoren im Nebel
TAKEAWAY (Kernbotschaft in einem Kasten):

Die Sekante gehoert zum Intervall und misst den Durchschnitt, die Tangente gehoert zum Punkt und misst den Moment. Die Bruecke bildet Differenzenquotient plus Grenzwert: erst $(f(x_0 + h) - f(x_0)) / h$ aufstellen, $h$ kuerzen, dann $h \to 0$ betrachten. Die Aufgabenstellung verraet das Verfahren: Intervall oder Zeitraum bedeuten Sekante, Zeitpunkt oder Stelle bedeuten Ableitung. Die Wortherkunft bestaetigt es: $secare$ schneidet, $tangere$ beruehrt.

Takeaway-Satz: `Sekanten mitteln ueber Intervalle, Tangenten erfassen den Moment; die Ableitung ist der Grenzwert der Sekantensteigung fuer h gegen 0.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: die algebraische Umformung des Differenzenquotienten (Schritt 4) oder die Entscheidung zwischen Sekante und Tangente (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst, ob im Aufgabentext ein Intervall oder ein einzelner Zeitpunkt genannt wird, und waehle danach das Verfahren.

`Klausur-Satz: Vom Groben zum Feinen: Jeder Grenzwert verfeinert eine grobe Messung zur exakten.`
