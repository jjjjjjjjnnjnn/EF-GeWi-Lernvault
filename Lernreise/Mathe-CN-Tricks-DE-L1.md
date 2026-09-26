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

1. Du kannst sechs Heuristiken nennen: Spezialwert, Ausschluss, Skizze, Vieta, AM-GM und Parametertrennung je mit Bedingung.
2. Du kannst $2^{30}$ gegen $3^{20}$ per $8^{10}$ gegen $9^{10}$ zu $a < b$ entscheiden und per Potenzgesetzen belegen.
3. Du kannst jede Vermutung per Standardweg sichern und bei verletzter Bedingung sofort wechseln, denn Reinschrift verlangt Beweis (AFB II/III).

### Hook / Phaenomen

Im Jahr 1990 knobelte ein Ingenieur an $2^{30}$ gegen $3^{20}$ — kein Taschenrechner zur Hand, nur Potenzgesetze. Wer stumpf multipliziert, scheitert; wer $8^{10}$ gegen $9^{10}$ sieht, entscheidet in Sekunden. Heuristiken sind solche Abkuerzungen: schnell auf dem Schmierpapier, wertlos ohne Beweis in der Reinschrift. Wo hilft der Trick — und wo wird er zur Falle?

### Fachbegriff & Definition

Fuer Heuristiken gilt: **Schnellverfahren dienen als Orientierung auf dem Schmierpapier, waehrend die Reinschrift den vollstaendigen Standardweg verlangt**. Jede **Heuristik besitzt eine Bedingung; bei verletzter Bedingung wird sofort zum Standardweg gewechselt**. Der **Vergleich $2^{30} = 8^{10}$ gegen $3^{20} = 9^{10}$ mit $8 < 9$ liefert $a < b$** nur als belegte Kette, nicht als Behauptung.

### Wirkungsgefuege / Modell

Der Mechanismus trennt Suche und Beweis: Schmierpapier $2^{30} = (2^3)^{10} = 8^{10}$ und $3^{20} = (3^2)^{10} = 9^{10}$ zu Vermutung $a < b$ wegen $8 < 9$. Reinschrift mit Potenzgesetzen $(a^m)^n = a^{mn}$ und Monotonie $8^{10} < 9^{10}$ sichert Punkte. Ebenso Vieta nur bei $ax^2+bx+c = 0$ und AM-GM nur bei $a,b > 0$ — ausserhalb wird gewechselt statt geraten.

Schritt A: Heuristik auf Schmierpapier zur Vermutung nutzen.
Schritt B: Bedingung explizit pruefen und notieren.
Schritt C: Standardweg in Reinschrift mit Satz sichern.

Klausur-Satz: `Heuristische Schnellverfahren dienen als Orientierung auf dem Schmierpapier, waehrend die Reinschrift den vollstaendigen Standardweg verlangt.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Schueler setzt $x = 0$ ein und raet die Loesung — Treffer. Beim naechsten Problem versagt derselbe Griff, weil die Aussage nicht allgemein gilt. Heuristik ohne Bedingung ist Gluecksspiel. Welche fuenf Paare aus Trick und Bedingung verwandeln Raten in Suchen?

### Fachbegriffe & Definitionen

- **Spezialwert-Methode:** $0$, $1$ oder $-1$ einsetzen zur Vermutung mit anschliessendem Beweis.
- **Ausschlussverfahren:** Faelle ueber Definitionsbereich, Vorzeichen und Grenzverhalten streichen.
- **Skizze und Veranschaulichung:** Graph zeichnen und Problem in Schnittpunkte plus Monotonie uebersetzen.
- **Parametertrennung:** Parameter isolieren und Extremwert der Gegenseite bestimmen.
- **Pruefsatz:** Deutscher Schlusssatz mit Ergebnis plus Gueltigkeitsbereich.

### Wirkungsgefuege / Modell

Die Kette lautet: Trick waehlen, Bedingung pruefen, Vermutung per Standard sichern. Skizze an $f(x) = x^3-3x$ zaehlt Nullstellen als Schnittpunkte; Vieta an $x^2-5x+6$ prueft $2$ und $3$ per Summe $5$ und Produkt $6$; AM-GM an $x+\frac{4}{x}$ mit $x > 0$ schaetzt Minimum $4$. Fehlt die Bedingung — etwa $x < 0$ bei AM-GM — so wird abgebrochen und klassisch mit $f' = 0$ gerechnet.

Klausur-Satz: `Jedes Schnellverfahren ist nur eine Abkuerzung; ohne Bedingungspruefung gibt es in der Klausur keine Punkte.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Zwei Loesungen zu $a = 2^{30}$ gegen $b = 3^{20}$: eine schreibt $a < b$ ohne Weg, eine zeigt $8^{10} < 9^{10}$ mit Gesetzen. Beide nennen dasselbe Ergebnis — nur eine erhaelt Punkte. Warum zaehlt in der Klausur nicht die Vermutung, sondern die belegte Kette — und wie sieht sie in drei Zeilen aus?

### Fachbegriff & Definition

Fuer die Klausur gilt: **Eine heuristische Vermutung wird erst durch den Standardweg zur belegten Loesung; ohne Beleg bleibt sie punktlos**. Der **Potenzvergleich $8^{10} < 9^{10}$ aus $8 < 9$ sichert $a < b$ ueber $(a^m)^n = a^{mn}$**. Jede **Kurzregel wird nur mit genannter Bedingung benutzt und kurz begruendet**.

### Wirkungsgefuege / Modell

Der Tiefenweg belegt $a < b$ in drei Zeilen: $a = 2^{30} = (2^3)^{10} = 8^{10}$ per $(a^m)^n$; $b = 3^{20} = (3^2)^{10} = 9^{10}$ ebenso; aus $8 < 9$ folgt $8^{10} < 9^{10}$ per Monotonie der Potenz. Damit $a < b$ mit Gesetzen statt Behauptung. Ebenso Wege je Sekunde $1{,}0/3{,}0/5{,}0\,\mathrm{m}$ wie $1:3:5$ aus $s_n = a(2n-1)/2$ nur mit Start aus Ruhe — ohne diese Bedingung ist die Regel falsch.

Schritt A: Umformen per Gesetzen auf gleiche Exponenten.
Schritt B: Basisvergleich $8 < 9$ explizit nennen.
Schritt C: Monotonieschluss zu $a < b$ als Satz schreiben.

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
   Beleg: 2^30=8^10 < 9^10=3^20 > a<b mit (a^m)^n
   Heuristik = Schmierpapier (Suche); Standardweg = Reinschrift (Punkte)
```

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
