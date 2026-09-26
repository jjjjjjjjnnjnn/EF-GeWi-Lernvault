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

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst sechs heuristische Verfahren mit Prinzip und Bedingung nennen: Spezialwert-Methode, Ausschlussverfahren, Skizze, Satz von Vieta, AM-GM-Ungleichung und Parametertrennung.
2. Du kannst zu jedem Verfahren eine kleine Aufgabe loesen und das Ergebnis in einem deutschen Pruefsatz mit Gueltigkeitsbereich formulieren.
3. Du kannst beurteilen, wann ein heuristisches Verfahren versagt, und wechselst dann zum vollstaendigen Standardweg, denn grosse Aufgaben verlangen die vollstaendige Darstellung (AFB II/III).

Klausur-Satz: `Heuristische Schnellverfahren dienen als Orientierung auf dem Schmierpapier, waehrend die Reinschrift den vollstaendigen Standardweg verlangt.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Spezialwert-Methode: Einsetzen gut rechenbarer Werte wie $0$, $1$ oder $-1$ zur Vermutung eines Ergebnisses mit anschliessendem Beweis.
- Ausschlussverfahren: Aussortieren unmoeglicher Faelle ueber Definitionsbereich, Vorzeichen und Grenzverhalten.
- Skizze und Veranschaulichung: Zeichnen eines Graphen, der ein algebraisches Problem in Schnittpunkte und Monotonie uebersetzt.
- Parametertrennung: Isolieren des Parameters auf einer Seite der Ungleichung und Bestimmen des Extremwerts der anderen Seite.
- Pruefsatz: Deutscher Schlusssatz, der das heuristisch gefundene Ergebnis mit seinem Gueltigkeitsbereich festhaelt.

Klausur-Satz: `Jedes Schnellverfahren ist nur eine Abkuerzung; ohne Bedingungspruefung gibt es in der Klausur keine Punkte.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Heuristische Verfahren finden eine Vermutung, sie beweisen sie nicht. Die Arbeitsteilung lautet daher: Die Heuristik liefert auf dem Schmierpapier Richtung, Vermutung und Kontrolle; der Standardweg liefert in der Reinschrift Beweis und Punkte. Jedes Verfahren besitzt eine Bedingung; ist sie verletzt, so wird sofort zum Standardweg gewechselt. Zu jedem Verfahren gehoert eine kleine Aufgabe mit deutschem Pruefsatz.

```diagram
   Verfahren          Bedingung                        Rolle
   =================  ===============================  ================
   1 Spezialwert      allgemeine Aussage trifft        Vermutung bilden
                       auch Spezialfall
   2 Ausschluss       Bereich, Zeichen oder            Faelle streichen
                       Verhalten entscheidbar
   3 Skizze           Monotonie und Schnitt            Nullstellen
                       skizzierbar                      zaehlen
   4 Vieta            nur quadratisch ax^2+bx+c=0      Wurzeln pruefen
   5 AM-GM            beide Terme positiv,             Minimum schaetzen
                       Produkt fest
   6 Parametertrenn.  Parameter isolierbar             Maximum suchen
   =================  ===============================  ================
   Heuristik = Schmierpapier (Suche); Standardweg = Reinschrift (Punkte)
```

Sechs Verfahren im Detail (Prinzip, Mini-Aufgabe, Pruefsatz):

- Spezialwert-Methode: Gilt eine allgemeine Aussage, so gilt sie auch im Spezialfall. Mini-Aufgabe: Erfuellt $f(x) = (x - 3)^2 + k$ fuer alle $x$ die Bedingung $f(x) \ge 2$, so folgt mit $x = 3$ sofort $k \ge 2$; wegen $(x-3)^2 \ge 0$ ist dies auch hinreichend. Pruefsatz: `Ich teste den Spezialwert x = 3 zur Vermutung und beweise danach allgemein.`
- Ausschlussverfahren: Unmoegliche Faelle werden zuerst gestrichen. Mini-Aufgabe: Fuer $f(x) = -3x^3 + 2x - 5$ gilt $\lim_{x \to +\infty} f(x) = -\infty$, also scheidet jede Vermutung mit Grenzwert $+\infty$ aus. Pruefsatz: `Ich schliesse unmoegliche Faelle ueber Definitionsbereich und Grenzverhalten aus.`
- Skizze: Nullstellen einer Gleichung sind Schnittpunkte von Graphen. Mini-Aufgabe: $g(x) = x^3 - 3x + 1$ besitzt $g'(x) = 3x^2 - 3 = 0$ mit $x = 1$ und $x = -1$; wegen $g(-1) = 3 > 0$ und $g(1) = -1 < 0$ folgen drei Nullstellen. Pruefsatz: `Die Skizze zeigt Monotonie und Nullstellen, der Rechenweg belegt sie.`
- Satz von Vieta: Summe und Produkt der Wurzeln folgen aus den Koeffizienten. Mini-Aufgabe: Die Behauptung, $x^2 - 9x + 20 = 0$ habe die Wurzeln $3$ und $6$, scheitert am Produkt $18 \ne 20$; korrekt sind $4$ und $5$. Pruefsatz: `Nach Vieta pruefe ich Summe x1 + x2 = -b/a und Produkt x1 * x2 = c/a.`
- AM-GM-Ungleichung: Fuer positive Terme mit festem Produkt wird die Summe minimal. Mini-Aufgabe: Fuer $x > 0$ gilt $x + 9/x \ge 2 \cdot \sqrt{9} = 6$ mit Gleichheit fuer $x = 3$. Pruefsatz: `Da x > 0 gilt, folgt mit AM-GM die Abschaetzung mit Gleichheit fuer x = 3.`
- Parametertrennung: $k \ge h(x)$ fuer alle $x$ im Intervall gilt genau fuer $k \ge \max h(x)$. Mini-Aufgabe: $k \ge 4x - x^2$ auf $[0, 4]$ verlangt das Maximum von $h(x) = -x^2 + 4x$ bei $x = 2$ mit $h(2) = 4$, also $k_{\min} = 4$. Pruefsatz: `Ich trenne den Parameter ab und bestimme das Maximum von h auf dem Intervall.`

Klausur-Satz: `Ich wende ein heuristisches Verfahren zur Orientierung an und belege das Ergebnis anschliessend mit dem Standardweg.`

## Anekdote & Fun-Fact

Das Wort Heuristik stammt vom griechischen $heuriskein$, finden oder entdecken. Denselben Wortstamm hoert man im beruehmten Heureka des Archimedes. Eine Heuristik hilft, eine Loesung zu finden, sie beweist sie aber nicht. Genau das ist die Rolle heuristischer Schnellverfahren: Sie sind Suchhilfen, kein Beweis.

Bezug zum Konzept: `Schnellverfahren sind Heuristiken: Sie finden eine Vermutung, den Beweis liefert der Standardweg.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: lego]

AUFGABE (anwenden, AFB II): Vergleichen Sie die Zahlen $a = 2^{30}$ und $b = 3^{20}$ mit der Spezialwert-Idee (gleiche Exponenten suchen) und bestaetigen Sie das Ergebnis durch eine Abschaetzung.

HILFE:
1. Schritt 1: Beide Zahlen als Potenz mit demselben Exponenten schreiben (Potenzgesetze).
2. Schritt 2: Die Basen vergleichen und die Monotonie der Potenzfunktion nutzen.
3. Schritt 3: Ergebnis als Pruefsatz formulieren.

MUSTERLOESUNG: Es gilt $a = 2^{30} = (2^3)^{10} = 8^{10}$ und $b = 3^{20} = (3^2)^{10} = 9^{10}$. Da die Funktion $x^{10}$ fuer $x > 0$ monoton waechst und $8 < 9$ gilt, folgt $8^{10} < 9^{10}$, also $a < b$. Das heuristische Verfahren liefert hier direkt das Ergebnis, weil beide Zahlen auf denselben Exponenten $10$ gebracht werden koennen; die Monotonie der Potenzfunktion begruendet den Schluss sauber.

Klausur-Satz: `Da 2^30 = 8^10 und 3^20 = 9^10 gilt und 8 < 9 ist, folgt a < b.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) heuristisches Verfahren (Vermutung, Eingrenzung und Kontrolle auf dem Schmierpapier) oder (ii) Standardweg (vollstaendiger Beweis in der Reinschrift bei $begruenden$, $beweisen$ oder $nachweisen$) > dann loesen.

AUFGABE A: Fuer $x > 0$ ist $x + 9/x$ gegeben. Vermuten Sie den minimalen Wert durch Einsetzen geeigneter Werte.
AUFGABE B: Fuer $x > 0$ ist $x + 9/x$ gegeben. Beweisen Sie, dass der Wert $6$ ein Minimum ist.

HILFE: Aufgabe A verlangt nur eine Vermutung, daher Verfahren (i) mit Spezialwert $x = 3$. Aufgabe B verlangt einen Beweis, daher Verfahren (ii) mit AM-GM und Gleichheitsbedingung.

ANTWORT: A erfordert Verfahren (i): Setzt man $x = 3$ ein, ergibt sich $3 + 9/3 = 6$; dies legt $6$ als Minimum nahe, beweist es aber nicht. B erfordert Verfahren (ii): Da $x > 0$ und $9/x > 0$ gilt, folgt mit AM-GM $x + 9/x \ge 2 \cdot \sqrt{x \cdot 9/x} = 2 \cdot 3 = 6$; Gleichheit gilt fuer $x = 9/x$, also $x = 3$. Damit ist $6$ nachweislich das Minimum.

Klausur-Satz: `Ein Spezialwert liefert nur eine Vermutung; erst die AM-GM-Abschaetzung mit Gleichheitsbedingung beweist das Minimum.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Warum beweist das Einsetzen eines Spezialwertes keine allgemeine Aussage? | ANTWORT: Weil eine Aussage, die fuer einen einzelnen Wert gilt, nicht fuer alle Werte gelten muss.
FRAGE: Wann darf man den Satz von Vieta in der Form $x_1 + x_2 = -b/a$ verwenden? | ANTWORT: Nur bei einer quadratischen Gleichung $ax^2 + bx + c = 0$ mit $a \ne 0$.
FRAGE: Was liefert die Parametertrennung bei einer Ungleichung der Form $k \ge h(x)$? | ANTWORT: Die Bedingung wird zu $k \ge \max h(x)$; der Parameter steht allein auf einer Seite.

Klausur-Satz: `Heuristische Verfahren liefern Vermutungen und Kontrollen, den Beweis uebernimmt der Standardweg.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Ein korrekt berechneter Spezialwert beweist bereits die allgemeine Aussage.
   Korrektur-Satz: `Ein einzelner Spezialwert beweist keinen allgemeinen Satz; er dient nur der Vermutung.`
2. Fehlkonzept: Beim Trennen eines Parameters darf eine Ungleichung bedenkenlos mit einem $x$-haltigen Term multipliziert werden.
   Korrektur-Satz: `Beim Multiplizieren einer Ungleichung mit einem Term muss dessen Vorzeichen geprueft werden, da sich sonst das Ungleichheitszeichen umdreht.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor in einem Mathe-Kurs und sollst eine Strategiekarte erstellen.
SITUATION: Ein Mitschueler will in der Klausur nur mit heuristischen Schnellverfahren arbeiten und keine Standardwege schreiben. Beurteile seine Strategie in einer zusammenhaengenden Darstellung (circa 150 Woerter) und erlaeutere an zwei Beispielen (Spezialwert und AM-GM), wann ein Schnellverfahren erlaubt ist und wann der Standardweg zwingend ist.
AUFGABE (beurteilen, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Problemanalyse, zwei Beispielen und Fazit.
RUBRIC (30 XP): Benennung des Grundproblems (Heuristik ersetzt keinen Beweis) (5 XP) | Beispiel Spezialwert: Vermutung gegen Beweis (10 XP) | Beispiel AM-GM: Positivitaet plus Gleichheitsbedingung (10 XP) | Fazit zur Arbeitsteilung von Schmierpapier und Reinschrift (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Die sechs Verfahren gehoeren auf das Schmierpapier: Spezialwerte raten, Ausschluss streicht, Skizzen zeigen, Vieta prueft, AM-GM schaetzt, Parametertrennung isoliert. Sie liefern Richtung, Kontrolle und Eingrenzung, ersetzen aber niemals den Standardweg in der Reinschrift. Bei $begruenden$, $beweisen$ oder $nachweisen$ wird stets der allgemeine Beweis mit Bedingungssatz verlangt.

Takeaway-Satz: `Schnellverfahren gehoeren aufs Schmierpapier, in die Reinschrift gehoeren Standardweg und Bedingungssaetze.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: die Anwendung der sechs Verfahren (Schritt 3) oder die Entscheidung zwischen Schnellverfahren und Standardweg (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst den Operator; bei $begruenden$ oder $beweisen$ schreibe ich sofort den Standardweg und nutze die Heuristik nur zur Kontrolle.
