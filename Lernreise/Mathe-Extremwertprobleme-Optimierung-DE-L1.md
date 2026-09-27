---
fach: Mathe
thema: "Extremwertprobleme und Optimierung"
level: 1
ziel: Klausur
xp: 100
operatoren: [bestimmen, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Extremwertprobleme und Optimierung (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst das Drei-Schritt-Verfahren aufsagen und anwenden: Zielfunktion $V(x)$ aufstellen, mit der Nebenbedingung auf eine Variable reduzieren, Definitionsmenge $D = [0, 6]$ notieren.
2. Du kannst $V(x) = x(20-2x)(12-2x) = 4x^3 - 64x^2 + 240x$ ableiten, $V'(x) = 0$ loesen und mit $V''(x)$ sowie Randpruefung $V(0)$, $V(6)$ das globale Maximum sichern.
3. Du kannst begruenden, warum $f' = 0$ nur notwendig ist, und den Antwortsatz mit $x \approx 2{,}43\,\mathrm{cm}$ und $V_{\max} \approx 262{,}7\,\mathrm{cm}^3$ formulieren (AFB II/III).

### Hook / Phaenomen

Aus einem flachen Pappbogen soll die groesste offene Schachtel entstehen, doch wer an den Ecken winzige Quadrate herausschneidet, erhaelt flache Bloeden, und wer riesige Ecken opfert, behält kaum Boden uebrig. Irgendwo dazwischen versteckt sich das groesste Volumen und die Intuition allein findet es nicht. Nimm einen Bogen der Laenge L und Breite B und schneide Quadrate der Kantenlaenge a heraus: Das Volumen folgt $V(a)=(L-2a)(B-2a)a$ und besitzt genau ein inneres Maximum. Wer nur die Nullstelle der Ableitung sucht und den Rand vergisst, verliert die Haelfte der Punkte. Wer Zielfunktion, Nebenbedingung, Definitionsmenge und Randpruefung sauber trennt, loest jedes Extremwertproblem nach demselben sicheren Schema. Der folgende Weg fuehrt vom alltaeglichen Staunen zur exakten Rechnung: erst das Phaenomen beobachten, dann die Begriffe klaeren, schliesslich das Modell pruefen und im Sandbox-Labor selbst entdecken, warum jede Regel genau so und nicht anders funktioniert.

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan gilt der untenstehende Klausur-Satz als verbindliche Definition dieser Lektion. Er fasst das Phaenomen in exakter Fachsprache und bildet die Grundlage fuer jede Deutung.

### Wirkungsgefuege / Modell

Der Mechanismus verbindet Alltag und Formel: Das Phaenomen liefert die Anschauung, die Definition liefert die Sprache und das Wirkungsmodell in Schritt 3 liefert die Kausalkette. Wer alle drei Ebenen verknuepft, beantwortet jede Klausurfrage vollständig.

Klausur-Satz: `Bei einem Extremwertproblem wird zuerst die Zielfunktion mit Hilfe der Nebenbedingung auf eine Variable reduziert, dann werden Kandidaten mit f'(x) = 0 bestimmt und mit Randpruefung beurteilt.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Zielfunktion:** Die zu optimierende Groesse als Funktion einer Variablen, etwa $V(a)=(L-2a)(B-2a)a$. Mechanismus: Volumenformel aufstellen und alles durch eine Variable ausdruecken. Klausur-Punkt: Zielfunktion mit Definitionsmenge explizit angeben.
- **Nebenbedingung:** Die feste Ressource koppelt die Variablen, etwa Umfang oder Materialverbrauch. Mechanismus: Bedingungsgleichung aufstellen und nach einer Variablen aufloesen. Klausur-Punkt: Nebenbedingung nennen und Einsetzen sichtbar zeigen.
- **Extremalbedingung:** Die Gleichung $f'(x) = 0$ liefert die Kandidaten fuer innere Extrema. Mechanismus: Ableiten, null setzen und Loesungen bestimmen. Klausur-Punkt: Kandidaten vollständig berechnen und als Kandidaten benennen.
- **Definitionsmenge:** Das sachlich sinnvolle Intervall begrenzt die Suche, etwa $0 < a < B/2$. Mechanismus: Aus der Geometrie sinnvolle Grenzen ableiten. Klausur-Punkt: Intervall angeben und Randwerte spaeter pruefen.
- **Randpruefung:** Der Vergleich von Kandidaten mit den Randwerten sichert das globale Extremum. Mechanismus: Funktionswerte an allen Kandidaten und Raendern berechnen und vergleichen. Klausur-Punkt: Alle Werte tabellarisch vergleichen und Maximum begruenden.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

Klausur-Satz: `Die Nebenbedingung reduziert die Zielfunktion auf eine Variable, die Definitionsmenge legt das Intervall fuer die Randpruefung fest.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von der Schachtel ueber die Funktion zum globalen Maximum: Zuerst baut man $V(a)=(L-2a)(B-2a)a$ mit $D=(0,B/2)$ aus Geometrie und Nebenbedingung, dann löst man $V'(a)=0$ fuer die inneren Kandidaten und prueft $V''(a)$, schliesslich vergleicht man Kandidaten mit den Raendern $V \to 0$. Das globale Maximum liegt entweder an einer inneren Stelle mit $V'=0$ oder am Rand, daher ist die Randpruefung unverzichtbar und kein Zusatz.

```diagram
+------------------------------------------+
| V(a) = (L-2a)(B-2a) a, D = (0, B/2)     |
|   | ableiten -> V prime(a) = 0           |
|   v                                      |
| Kandidat a1 + V prime prime(a1) < 0      |
|   | vergleichen mit Rand V -> 0          |
|   v                                      |
| globales Maximum bei a1 gesichert        |
+------------------------------------------+
```
Formelkern: $V(a)=(L-2a)(B-2a)a$

Klausur-Satz: `Das globale Maximum liegt entweder an einer inneren Stelle mit f'(x) = 0 oder am Rand des Definitionsbereichs.`

## Anekdote & Fun-Fact
Ein Logistik-Unternehmen wollte Porto sparen und fragte: Welche offene Kiste aus einem Standard-Bogen hat das groesste Volumen? Die Antwort war nicht die groesste oder die kleinste Schnitttiefe, sondern ein Wert dazwischen. Genau so arbeiten Optimierer in Fabriken: Sie suchen den Gipfel einer Funktion, nicht das Extrem der Einzelteile.

Bezug zum Konzept: `Die optimale Kiste liegt am Gipfel der Zielfunktion, und erst die Randpruefung macht aus einem Kandidaten das globale Maximum.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Box-Optimierung
BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: box-optimizer]

AUFGABE (Levelziel, AFB II): Knacke das Box-Level: Ziehe im Sandbox-Slider die Schnittkante $a$ von $0$ bis $B/2$ und beobachte, wie das Volumen $V(a)$ erst waechst und dann faellt. Lies das Maximum ab, bestimme dann exakt per $V'(a) = 0$ den Kandidaten und sichere ihn mit Randpruefung als globales Maximum. Erklaere in einem Satz, warum die Randpruefung noetig ist.

HILFE:
1. Stelle $V(a) = (L-2a)(B-2a)a$ auf $D = (0, B/2)$ auf und lies im Sandbox-Slider Stelle und Wert des Maximums ab.
2. Bilde $V'(a)$, loese $V'(a) = 0$ und pruefe $V''(a_1) < 0$ fuer den Kandidaten $a_1$.
3. Vergleiche $V(a_1)$ mit den Randwerten $V \to 0$ und benenne $a_1$ als globale Maximalstelle.

MUSTERLOESUNG: Sandbox zeigt das Maximum bei $a = a_1$ mit $V(a_1)$ als hoechstem Wert. Rechnung $V'(a_1) = 0$ mit $V''(a_1) < 0$ bestaetigt den inneren Hochpunkt. Randvergleich $V(a_1) > V(0)$ und $V(a_1) > V(B/2)$ sichert das globale Maximum auf $D$. Die Randpruefung ist noetig, weil das globale Maximum auch am Rand liegen koennte und $V'=0$ nur innere Kandidaten liefert.

Klausur-Satz: `Mit V'(x1) = 0, V''(x1) < 0 und V(x1) > V(0), V(x1) > V(6) ist x1 die globale Maximalstelle auf D.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Extremwert-Schema (Maximum oder Minimum mit Zielfunktion, Nebenbedingung, Definitionsmenge und Randpruefung) oder (ii) Nur-Ableitung-Schema (nur Stellen mit $f' = 0$ bestimmen, ohne Sachkontext und ohne Randvergleich) > dann loesen.

AUFGABE A: Ein Versandhaus formt aus $36\,\mathrm{cm}$ Draht den Rand einer offenen Kiste mit quadratischer Grundflaeche. Das Volumen soll maximal werden. Stellen Sie erst Zielfunktion, Nebenbedingung und Definitionsmenge auf, dann loesen Sie.
AUFGABE B: Gegeben ist $f(x) = x^3 - 3x^2 + 2$. Bestimmen Sie nur alle Stellen mit $f'(x) = 0$ und deren Art, ohne Sachkontext und ohne Randpruefung.

HILFE: Aufgabe A enthaelt Woerter wie $maximal$, feste Drahtlaenge und offene Kiste, daher Verfahren (i) mit Randpruefung. Aufgabe B nennt nur eine Formel ohne Kontext, daher Verfahren (ii) mit Ableitung und Vorzeichentest.

ANTWORT: A erfordert Verfahren (i): Sei Grundkante $a$ und Hoehe $h$, dann $4a + 4h = 36$, also $h = 9 - a$, $V(a) = a^2(9-a)$ auf $D = [0, 9]$; $V'(a) = 18a - 3a^2 = 0$ liefert $a = 6$ ($a = 0$ ist Rand), $V''(6) < 0$, Randwerte $0$, also $a = 6\,\mathrm{cm}$, $h = 3\,\mathrm{cm}$, $V_{\max} = 108\,\mathrm{cm}^3$. B erfordert Verfahren (ii): $f'(x) = 3x^2 - 6x = 3x(x-2) = 0$, also $x = 0$ und $x = 2$; mit $f''(x) = 6x - 6$ gilt $f''(0) = -6 < 0$ (Maximum) und $f''(2) = 6 > 0$ (Minimum), ohne Randvergleich.

Klausur-Satz: `Ein Sachkontext mit fester Ressource verlangt das volle Extremwert-Schema inklusive Randpruefung, eine reine Formel verlangt nur die Analyse von f'(x) = 0.`

## Schritt 6 — check: Selbsttest zu Extremwertprobleme und Optimierung
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet das Drei-Schritt-Schema eines Extremwertproblems? | ANTWORT: Zielfunktion aufstellen, mit Nebenbedingung auf eine Variable reduzieren, Kandidaten mit $f'(x) = 0$ suchen und mit Randpruefung beurteilen.
FRAGE: Warum reicht $f'(x) = 0$ allein nicht fuer ein globales Maximum? | ANTWORT: Weil $f'(x) = 0$ nur lokale Kandidaten liefert; erst der Vergleich mit den Randwerten zeigt, ob ein Kandidat global maximal ist.
FRAGE: Was gehoert zur vollstaendigen Angabe der Loesung im Sachkontext? | ANTWORT: Definitionsmenge mit Einheiten, optimale Stelle mit Einheit, maximaler Wert mit Einheit und ein Antwortsatz im Kontext.

Klausur-Satz: `Erst Zielfunktion plus Nebenbedingung plus Definitionsmenge plus Randpruefung ergeben eine vollstaendige Extremwert-Loesung.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Jede Stelle mit $f' = 0$ ist bereits ein Maximum; die Rechnung endet dort.
   Korrektur-Satz: `Aus f'(x) = 0 folgt nur ein Kandidat; erst f''(x) oder Vorzeichenwechsel plus Randvergleich entscheiden ueber das globale Maximum.`
2. Fehlkonzept: Definitionsmenge, Einheiten und Randwerte sind Formsache und duerfen entfallen.
   Korrektur-Satz: `Ohne Definitionsmenge mit Einheiten und ohne explizite Randwerte gilt eine Extremwert-Loesung als unvollstaendig.`

## Schritt 7 — szenario: Klausurtransfer: Extremwertprobleme und Optimierung
ROLLE: Du bist Praktikant in der Logistik-Abteilung eines Online-Haendlers.
SITUATION: Aus einem Standard-Bogen $24\,\mathrm{cm}$ mal $18\,\mathrm{cm}$ sollen offene Versandkisten mit maximalem Volumen gebaut werden. Deine Chefin verlangt eine nachvollziehbare Rechnung mit Zielfunktion, Definitionsmenge, Ableitung und Randpruefung sowie eine klare Empfehlung fuer die Produktion (circa 150 Woerter, mit Einheiten $\mathrm{cm}$ und $\mathrm{cm}^3$).
AUFGABE (beurteilen, AFB III): Entscheide, welche Schnittlaenge in die Produktion geht, und beurteile, wie sensibel das Maximum auf Abweichungen von $\pm 0{,}5\,\mathrm{cm}$ reagiert.
RUBRIC (30 XP): Zielfunktion plus Definitionsmenge korrekt (5 XP) | Kandidaten mit Ableitung korrekt berechnet (10 XP) | Randpruefung mit Einheiten vollstaendig (10 XP) | Produktionsempfehlung mit Beurteilung der Sensibilitaet (5 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion
TAKEAWAY (Kernbotschaft in einem Kasten):

Ein Extremwertproblem verlangt stets vier Bausteine: Zielfunktion, Nebenbedingung, Definitionsmenge und Randvergleich. Zuerst wird die Sachsituation in $V(x)$ mit $D$ uebersetzt, dann werden Kandidaten mit $f'(x) = 0$ gesucht, schliesslich werden die Raender in den Vergleich einbezogen. Merksatz: aufstellen, reduzieren, festlegen, vergleichen. Denn $f' = 0$ ist nur die Eintrittskarte, der Randvergleich faellt das Urteil.

Takeaway-Satz: `Liste Zielfunktion, Nebenbedingung, Definitionsmenge und Randvergleich auf; f'(x) = 0 allein beweist kein globales Maximum.`

REFLEXION (zwei Fragen):
1. Welcher Teil fiel schwerer: das Aufstellen von Zielfunktion und Nebenbedingung (Schritt 4) oder die Entscheidung fuer das volle Schema im Vergleich (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst $D$ mit Einheiten auf und plane die Randpruefung fest ein, bevor ich ableite.

