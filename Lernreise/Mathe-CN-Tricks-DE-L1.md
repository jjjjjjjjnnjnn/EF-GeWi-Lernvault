---
fach: Mathe
thema: "CN-Tricks: sechs Schnellverfahren"
level: 1
ziel: Klausur
xp: 100
operatoren: [anwenden, begruenden, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: CN-Tricks: sechs Schnellverfahren (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 7/33 | Krise: Flugkorridor-Konflikt: 2 Jets 4,8 km Abstand | Zielgroessen: f(x) = x^3-3x, Skizze mit Schnittpunkten, Vieta-Probe 2 und 3 | Tool: formula -->

## Schritt 1 — entdecken: Tricks im Serverraum
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst sechs Heuristiken nennen: Spezialwert, Ausschluss, Skizze, Vieta, AM-GM und Parametertrennung je mit Bedingung.
2. Du kannst $2^{30}$ gegen $3^{20}$ per $8^{10}$ gegen $9^{10}$ zu $a < b$ entscheiden und per Potenzgesetzen belegen.
3. Du kannst jede Vermutung per Standardweg sichern und bei verletzter Bedingung sofort wechseln, denn Reinschrift verlangt Beweis (AFB II/III).

###

### Hook / Phaenomen

Hook / Phaenomen: Wer null oder eins einsetzt, trifft manchmal ins Schwarze und manchmal daneben. Der Unterschied zwischen Glueck und Methode heisst **Bedingung**. **Spezialwert**, **Ausschluss** und **Skizze** sind nur Abkuerzungen mit Gueltigkeitsbereich.

`Klausur-Satz: Jeder Trick braucht seine Bedingung: Ohne Gueltigkeitspruefung bleibt Heuristik Gluecksspiel.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Schueler setzt $x = 0$ ein und raet die Loesung — Treffer. Beim naechsten Problem versagt derselbe Griff, weil die Aussage nicht allgemein gilt. Heuristik ohne Bedingung ist Gluecksspiel. Welche fuenf Paare aus Trick und Bedingung verwandeln Raten in Suchen?

### Fachbegriffe & Definitionen

- **Spezialwert-Methode:** $0$, $1$ oder $-1$ einsetzen zur Vermutung mit anschliessendem Beweis. Der Wert liefert nur eine Vermutung, niemals einen Beweis. Mechanismus: Null, eins oder minus eins einsetzen und Muster ablesen. Klausur-Tipp: Vermutung danach stets klassisch sichern.
- **Ausschlussverfahren:** Faelle ueber Definitionsbereich, Vorzeichen und Grenzverhalten streichen. Jeder gestrichene Fall braucht ein hartes Kriterium wie Definitionsbereich oder Vorzeichen. Mechanismus: Faelle ueber Definitionsbereich, Vorzeichen und Grenzverhalten streichen. Klausur-Tipp: Streichgrund pro Fall in einem Halbsatz nennen.
- **Skizze und Veranschaulichung:** Graph zeichnen und Problem in Schnittpunkte plus Monotonie uebersetzen. Sie uebersetzt das Problem in Schnittpunkte plus Monotonie. Mechanismus: Graph zeichnen und Problem in Schnittpunkte plus Monotonie uebersetzen. Klausur-Tipp: Achsen beschriften, sonst zaehlt die Skizze nicht.
- **Parametertrennung:** Parameter isolieren und Extremwert der Gegenseite bestimmen. Der Parameter steht danach allein auf einer Seite der Gleichung. Mechanismus: Parameter isolieren und Extremwert der Gegenseite bestimmen. Klausur-Tipp: Isolierungsschritt ausfuehrlich zeigen.
- **Pruefsatz:** Deutscher Schlusssatz mit Ergebnis plus Gueltigkeitsbereich. Er nennt Ergebnis plus Gueltigkeitsbereich in einem deutschen Satz. Mechanismus: Deutschen Schlusssatz mit Ergebnis plus Gueltigkeitsbereich formulieren. Klausur-Tipp: Gueltigkeitsbereich nie unterschlagen.

### Wirkungsgefuege / Modell

Die Kette lautet: Trick waehlen, Bedingung pruefen, Vermutung per Standard sichern. Skizze an $f(x) = x^3-3x$ zaehlt Nullstellen als Schnittpunkte; Vieta an $x^2-5x+6$ prueft $2$ und $3$ per Summe $5$ und Produkt $6$; AM-GM an $x+\frac{4}{x}$ mit $x > 0$ schaetzt Minimum $4$. Fehlt die Bedingung — etwa $x < 0$ bei AM-GM — so wird abgebrochen und klassisch mit $f' = 0$ gerechnet.

`Klausur-Satz: Jedes Schnellverfahren ist nur eine Abkuerzung; ohne Bedingungspruefung gibt es in der Klausur keine Punkte.`

## Schritt 3 — entdecken: Wirkungskette hinter CN-Tricks: sechs Schnellverfahren
EXPERIMENTELLE ERKUNDUNG (PhET Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Welche Zahl ist groesser, $2^{30}$ oder $3^{20}$, ganz ohne Rechner. Intuitiv wirkt die groessere Basis $3$ staerker, doch der groessere Exponent $30$ zieht dagegen. Warum entscheidet die gemeinsame Potenz $10$ sofort ueber $a < b$?

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox und ziehe den Slider Exponent von $1$ bis $10$ fuer die Basen $8$ und $9$. Beobachte die Kurven $8^n$ und $9^n$ sowie die Anzeige $2^{30} = 8^{10}$ und $3^{20} = 9^{10}$. Lies das Wachstum ab und erkenne, ab wann $9^n$ dauerhaft vorne liegt.

### Aha-Moment & Gesetz

Die Kette lautet Potenzgesetz gegen Vergleich: $(a^m)^n = a^{mn}$ plus Monotonie. Handschriftlich gilt $2^{30} = (2^3)^{10} = 8^{10}$ und $3^{20} = (3^2)^{10} = 9^{10}$. Mit $8 < 9$ folgt $8^{10} < 9^{10}$, also $a < b$.

Der Trick hebt beide Zahlen auf denselben Exponenten $10$ und macht den Vergleich trivial. Danach sichert der Standardweg mit Logarithmus das Ergebnis.

```diagram
  8n gegen 9n > n=1 bis 10
  +--------------------------> n
  230=810 | 320=910
  8<9 > 810<910 > a<b
  gleicher Exponent > direkter Vergleich
```

$$(a^m)^n = a^{mn},\quad \frac{a+b}{2}\ge\sqrt{ab}\ (a,b>0)$$
`Klausur-Satz: Ich wende ein heuristisches Verfahren zur Orientierung an und belege das Ergebnis anschliessend mit dem Standardweg.`

## Anekdote & Fun-Fact

Das Wort Heuristik stammt vom griechischen $heuriskein$, finden oder entdecken. Denselben Wortstamm hoert man im beruehmten Heureka des Archimedes. Eine Heuristik hilft, eine Loesung zu finden, sie beweist sie aber nicht. Genau das ist die Rolle heuristischer Schnellverfahren: Sie sind Suchhilfen, kein Beweis.

Bezug zum Konzept: `Schnellverfahren sind Heuristiken: Sie finden eine Vermutung, den Beweis liefert der Standardweg.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Tricks im Serverraum
Kontinuitaet: Vorher Mathe-CN-Training-L1.md | Nachher Mathe-CN-Tricks-L1.md. Krise dieser Episode: Flugkorridor-Konflikt: 2 Jets 4,8 km Abstand. Zielgroessen: f(x) = x^3-3x, Skizze mit Schnittpunkten, Vieta-Probe 2 und 3

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: formula]

AUFGABE (Levelziel, AFB II): Knacke den Vergleich: Stelle in der Sandbox (formula) die Basen 8 und 9 ein, ziehe den Slider Exponent von 1 bis 10 und bestaetige $8^{10}$ gegen $9^{10}$, und beweise dann ohne Rechner, dass $2^{30} < 3^{20}$ gilt. Ergaenze die Probe mit Logarithmus.

HILFE:
1. Forme mit $(a^m)^n = a^{mn}$ um zu $2^{30} = 8^{10}$ und $3^{20} = 9^{10}$.
2. Vergleiche $8 < 9$ zu $8^{10} < 9^{10}$, also $a < b$.
3. Bestaetige mit $30 \ln 2 \approx 20{,}79$ gegen $20 \ln 3 \approx 21{,}97$.

MUSTERLOESUNG: Sandbox $8^{10} = 1073741824$ gegen $9^{10} = 3486784401$ zeigt $a < b$. Rechnung $2^{30} = (2^3)^{10} = 8^{10}$ und $3^{20} = (3^2)^{10} = 9^{10}$. Wegen $8 < 9$ und Monotonie folgt $8^{10} < 9^{10}$, also $a < b$. Probe $30 \ln 2 \approx 20{,}79 < 21{,}97 \approx 20 \ln 3$ bestaetigt mit dem Standardweg, der Trick diente nur der Orientierung.

`Klausur-Satz: Da 2^30 = 8^10 und 3^20 = 9^10 gilt und 8 < 9 ist, folgt a < b.`

## Schritt 5 — ausprobieren: Duell der Verfahren Tricks im Serverraum
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Triff zuerst die Wahl des Verfahrens: (i) heuristisches Verfahren (Vermutung, Eingrenzung und Kontrolle auf dem Schmierpapier) oder (ii) Standardweg (vollstaendiger Beweis in der Reinschrift bei $begruenden$, $beweisen$ oder $nachweisen$) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Fuer $x > 0$ ist $x + 9/x$ gegeben. Vermuten Sie den minimalen Wert durch Einsetzen geeigneter Werte.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Fuer $x > 0$ ist $x + 9/x$ gegeben. Beweisen Sie, dass der Wert $6$ ein Minimum ist.

HILFE: Aufgabe A verlangt nur eine Vermutung, daher Verfahren (i) mit Spezialwert $x = 3$. Aufgabe B verlangt einen Beweis, daher Verfahren (ii) mit AM-GM und Gleichheitsbedingung.

ANTWORT: A erfordert Verfahren (i): Setzt man $x = 3$ ein, ergibt sich $3 + 9/3 = 6$; dies legt $6$ als Minimum nahe, beweist es aber nicht. B erfordert Verfahren (ii): Da $x > 0$ und $9/x > 0$ gilt, folgt mit AM-GM $x + 9/x \ge 2 \cdot \sqrt{x \cdot 9/x} = 2 \cdot 3 = 6$; Gleichheit gilt fuer $x = 9/x$, also $x = 3$. Damit ist $6$ nachweislich das Minimum.

`Klausur-Satz: Ein Spezialwert liefert nur eine Vermutung; erst die AM-GM-Abschaetzung mit Gleichheitsbedingung beweist das Minimum.`

## Schritt 6 — check: Selbsttest zu CN-Tricks: sechs Schnellverfahren: Tricks im Serverraum
CHECK (drei Fragen mit Antworten):

- FRAGE: Warum beweist das Einsetzen eines Spezialwertes keine allgemeine Aussage? | ANTWORT: Weil eine Aussage, die fuer einen einzelnen Wert gilt, nicht fuer alle Werte gelten muss.
- FRAGE: Wann darf man den Satz von Vieta in der Form $x_1 + x_2 = -b/a$ verwenden? | ANTWORT: Nur bei einer quadratischen Gleichung $ax^2 + bx + c = 0$ mit $a \ne 0$.
- FRAGE: Was liefert die Parametertrennung bei einer Ungleichung der Form $k \ge h(x)$? | ANTWORT: Die Bedingung wird zu $k \ge \max h(x)$; der Parameter steht allein auf einer Seite.

`Klausur-Satz: Heuristische Verfahren liefern Vermutungen und Kontrollen, den Beweis uebernimmt der Standardweg.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Ein korrekt berechneter Spezialwert beweist bereits die allgemeine Aussage.
   Korrektur-Satz: `Ein einzelner Spezialwert beweist keinen allgemeinen Satz; er dient nur der Vermutung.`
2. Fehlkonzept: Beim Trennen eines Parameters darf eine Ungleichung bedenkenlos mit einem $x$-haltigen Term multipliziert werden.
   Korrektur-Satz: `Beim Multiplizieren einer Ungleichung mit einem Term muss dessen Vorzeichen geprueft werden, da sich sonst das Ungleichheitszeichen umdreht.`

## Schritt 7 — szenario: Klausurtransfer: CN-Tricks: sechs Schnellverfahren: Tricks im Serverraum
ROLLE: Du bist Tutor in einem Mathe-Kurs und sollst eine Strategiekarte erstellen.
SITUATION: Ein Mitschueler will in der Klausur nur mit heuristischen Schnellverfahren arbeiten und keine Standardwege schreiben. Beurteile seine Strategie in einer zusammenhaengenden Darstellung (circa 150 Woerter) und erlaeutere an zwei Beispielen (Spezialwert und AM-GM), wann ein Schnellverfahren erlaubt ist und wann der Standardweg zwingend ist.
AUFGABE (beurteilen, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Problemanalyse, zwei Beispielen und Fazit.
RUBRIC (30 XP): Benennung des Grundproblems (Heuristik ersetzt keinen Beweis) (5 XP) | Beispiel Spezialwert: Vermutung gegen Beweis (10 XP) | Beispiel AM-GM: Positivitaet plus Gleichheitsbedingung (10 XP) | Fazit zur Arbeitsteilung von Schmierpapier und Reinschrift (5 XP).

`Klausur-Satz: Wer Trick, Bedingung und klassische Sicherung in einer Darstellung verbindet, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Tricks im Serverraum
TAKEAWAY (Kernbotschaft in einem Kasten):

Die sechs Verfahren gehoeren auf das Schmierpapier: Spezialwerte raten, Ausschluss streicht, Skizzen zeigen, Vieta prueft, AM-GM schaetzt, Parametertrennung isoliert. Sie liefern Richtung, Kontrolle und Eingrenzung, ersetzen aber niemals den Standardweg in der Reinschrift. Bei $begruenden$, $beweisen$ oder $nachweisen$ wird stets der allgemeine Beweis mit Bedingungssatz verlangt.

Takeaway-Satz: `Schnellverfahren gehoeren aufs Schmierpapier, in die Reinschrift gehoeren Standardweg und Bedingungssaetze.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: die Anwendung der sechs Verfahren (Schritt 3) oder die Entscheidung zwischen Schnellverfahren und Standardweg (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst den Operator; bei $begruenden$ oder $beweisen$ schreibe ich sofort den Standardweg und nutze die Heuristik nur zur Kontrolle.

`Klausur-Satz: Schnellverfahren sind Abkuerzungen, keine Beweise: Die Bedingung entscheidet, ob sie tragen.`
