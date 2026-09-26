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

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst das Drei-Schritt-Verfahren aufsagen und anwenden: Zielfunktion $V(x)$ aufstellen, mit der Nebenbedingung auf eine Variable reduzieren, Definitionsmenge $D = [0, 6]$ notieren.
2. Du kannst $V(x) = x(20-2x)(12-2x) = 4x^3 - 64x^2 + 240x$ ableiten, $V'(x) = 0$ loesen und mit $V''(x)$ sowie Randpruefung $V(0)$, $V(6)$ das globale Maximum sichern.
3. Du kannst begruenden, warum $f' = 0$ nur notwendig ist, und den Antwortsatz mit $x \approx 2{,}43\,\mathrm{cm}$ und $V_{\max} \approx 262{,}7\,\mathrm{cm}^3$ formulieren (AFB II/III).

### Hook / Phaenomen

Im Jahr 2010 musste ein Automobilzulieferer tausende Dosenhalter zurueckrufen — die Halterung war auf maximale Groesse statt auf maximale Stabilitaet optimiert. Der Prototyp hielt im Labor, im Auto brach er. In der Mathematik heisst dieser Fehler: lokales Maximum mit globalem Maximum verwechselt. Eine offene Kiste aus $20\,\mathrm{cm}$ mal $12\,\mathrm{cm}$ Pappe zeigt das Raetsel im Kleinen: Weder die flachste noch die tiefste Kiste fasst am meisten. Wo liegt der Gipfel — und warum reicht $f' = 0$ allein nie als Beweis?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Analysis ist ein **Extremwertproblem die Bestimmung des globalen Maximums oder Minimums einer Zielfunktion $V(x)$ auf einer sachnahen Definitionsmenge $D$ unter einer Nebenbedingung**. Die **Zielfunktion beschreibt die zu optimierende Groesse**, die **Nebenbedingung eliminiert ueberschuessige Variablen**, die **Randpruefung vergleicht innere Kandidaten mit den Randwerten von $D$**. Erst dieser Vergleich sichert das globale Extremum.

### Wirkungsgefuege / Modell

Der Mechanismus laeuft in drei Stufen: Aufstellen, Reduzieren, Pruefen. Erstens wird $V(x) = x(20-2x)(12-2x)$ aus Laenge mal Breite mal Hoehe gebildet. Zweitens wird $V'(x) = 12x^2 - 128x + 240 = 0$ geloest zu $x_1 \approx 2{,}43$ und $x_2 \approx 8{,}24$, wobei $x_2$ ausserhalb von $D = [0, 6]$ faellt. Drittens entscheidet $V''(2{,}43) \approx -69{,}7 < 0$ auf lokales Maximum und $V(2{,}43) \approx 262{,}7 > V(0) = V(6) = 0$ auf globales Maximum.

Schritt A: $V(x) = 4x^3 - 64x^2 + 240x$ auf $D = [0, 6]$ festlegen.
Schritt B: $V'(x) = 12x^2 - 128x + 240 = 0$ zu $3x^2 - 32x + 60 = 0$ kuerzen und loesen.
Schritt C: $V''$ und Raender vergleichen, dann Antwortsatz mit Einheiten schreiben.

Klausur-Satz: `Bei einem Extremwertproblem wird zuerst die Zielfunktion mit Hilfe der Nebenbedingung auf eine Variable reduziert, dann werden Kandidaten mit f'(x) = 0 bestimmt und mit Randpruefung beurteilt.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Zwei Schueler loesen dieselbe Kistenaufgabe: Beide finden $x_1 \approx 2{,}43$, nur einer erhaelt volle Punktzahl. Der Unterschied steht nicht in der Rechnung, sondern in drei Zeilen davor und danach — Definitionsmenge und Randpruefung. Ohne diese Zeilen bleibt jede Loesung ein Kandidat ohne Urteil. Welche fuenf Begriffe machen aus dem Kandidaten ein gesichertes Maximum?

### Fachbegriffe & Definitionen

- **Zielfunktion:** Zu optimierende Groesse wie $V(x) = x(20-2x)(12-2x)$ in $\mathrm{cm}^3$; sie traegt die Fragestellung.
- **Nebenbedingung:** Feste Beziehung wie Pappenmasse $20 \times 12$ in $\mathrm{cm}$; sie streicht die zweite Variable.
- **Definitionsmenge:** Sachnahes Intervall $D = [0, 6]$ in $\mathrm{cm}$; ausserhalb ist die Kiste physikalisch unmoeglich.
- **Extremstellen-Kandidat:** Stelle mit $f'(x) = 0$; erst $f''(x)$ oder Vorzeichenwechsel plus Randvergleich entscheiden.
- **Randpruefung:** Vergleich $V(x_1)$ gegen $V(0)$ und $V(6)$; nur der groesste Wert ist das globale Maximum auf $D$.

### Wirkungsgefuege / Modell

Die Begriffe bilden eine Pruefkette: Nebenbedingung reduziert die Zielfunktion auf $V(x)$, Definitionsmenge begrenzt $x$ auf $[0, 6]$, Kandidaten aus $V'(x) = 12x^2 - 128x + 240 = 0$ liefern $x_1 \approx 2{,}43$, Randpruefung $262{,}7$ gegen $0$ und $0$ kroent $x_1$ zum globalen Maximum. Wer die Kette nach $f' = 0$ abbricht, verwechselt notwendig mit hinreichend — der haeufigste Punktverlust der Klausur.

Klausur-Satz: `Die Nebenbedingung reduziert die Zielfunktion auf eine Variable, die Definitionsmenge legt das Intervall fuer die Randpruefung fest.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Eine Firma will aus Draht der Laenge $36\,\mathrm{cm}$ eine Kiste mit maximalem Volumen formen — klingt nach derselben Aufgabe, verlangt aber einen anderen Start: keine Pappe, sondern ein Drahtgeruest mit quadratischer Grundflaeche. Viele setzen sofort $V'(x) = 0$ an und scheitern, weil Zielfunktion und Definitionsmenge fehlen. Warum entscheidet der Aufstellschritt ueber alles — und wie sieht der saubere Weg von $4a + 4h = 36$ bis $V_{\max} = 108\,\mathrm{cm}^3$ aus?

### Fachbegriff & Definition

Das **globale Maximum auf $D$ ist der groesste Funktionswert auf dem gesamten Intervall — entweder an einer inneren Stelle mit $f'(x) = 0$ oder am Rand von $D$**. Die **hinreichende Bedingung $f''(x_1) < 0$ sichert nur ein lokales Maximum**; erst der Vergleich mit $V$ an den Raendern hebt es zum globalen Maximum. Ohne $D$ bleibt jede Extremwertantwort unvollstaendig.

### Wirkungsgefuege / Modell

Der Tiefenweg am Drahtbeispiel: Sei Grundkante $a$ und Hoehe $h$ mit $4a + 4h = 36$, also $h = 9 - a$ und $V(a) = a^2(9-a) = 9a^2 - a^3$ auf $D = [0, 9]$. Dann $V'(a) = 18a - 3a^2 = 3a(6-a) = 0$ zu $a = 0$ oder $a = 6$. Mit $V''(a) = 18 - 6a$ gilt $V''(6) = -18 < 0$, also lokales Maximum; $V(0) = V(9) = 0$ gegen $V(6) = 108$ sichert global $a = 6\,\mathrm{cm}$, $h = 3\,\mathrm{cm}$, $V_{\max} = 108\,\mathrm{cm}^3$.

Schritt A: Nebenbedingung nach $h$ aufloesen und in $V$ einsetzen.
Schritt B: $V'(a) = 0$ loesen und mit $V''$ qualifizieren.
Schritt C: Raender vergleichen und Antwortsatz mit $\mathrm{cm}$ und $\mathrm{cm}^3$ schreiben.

```diagram
        V ^
          |        .- Gipfel Vmax bei x ca. 2.43
          |      .  .
          |    .      .
          |  .          .
          | .              .
          |.                  .
          +----------------------------------> x
          0                   6
   V(x) = x(20-2x)(12-2x) = 4x^3 - 64x^2 + 240x
   V'(x) = 12x^2 - 128x + 240 = 0 > x1 ca. 2.43
   V''(x1) < 0 > lokal max | V(x1) > V(0),V(6) > global max
   Zielfunktion + Nebenbedingung > eine Variable
   Kandidat: f'(x)=0 | Entscheid: Randpruefung
```

Klausur-Satz: `Das globale Maximum liegt entweder an einer inneren Stelle mit f'(x) = 0 oder am Rand des Definitionsbereichs.`

## Anekdote & Fun-Fact

Ein Logistik-Unternehmen wollte Porto sparen und fragte: Welche offene Kiste aus einem Standard-Bogen hat das groesste Volumen? Die Antwort war nicht die groesste oder die kleinste Schnitttiefe, sondern ein Wert dazwischen. Genau so arbeiten Optimierer in Fabriken: Sie suchen den Gipfel einer Funktion, nicht das Extrem der Einzelteile.

Bezug zum Konzept: `Die optimale Kiste liegt am Gipfel der Zielfunktion, und erst die Randpruefung macht aus einem Kandidaten das globale Maximum.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: tangent]

AUFGABE (bestimmen, AFB II): Aus einer Pappe $20\,\mathrm{cm}$ mal $12\,\mathrm{cm}$ wird durch Ausschneiden von Quadraten der Seite $x$ eine offene Kiste gebaut. Bestimmen Sie die Schnittlaenge $x$, fuer die das Volumen maximal wird, und geben Sie das maximale Volumen an.

HILFE:
1. Schritt 1: Zielfunktion mit Nebenbedingung aufstellen und Definitionsmenge notieren: $V(x) = x(20-2x)(12-2x)$, $D = [0, 6]$.
2. Schritt 2: Ableiten und Kandidaten suchen: $V'(x) = 12x^2 - 128x + 240 = 0$ loesen, unbrauchbare Loesung ausserhalb von $D$ streichen.
3. Schritt 3: Art der Kandidaten mit $V''(x)$ klaeren und Randpruefung $V(0)$, $V(6)$ gegen $V(x_{\text{Kandidat}})$ vergleichen.

MUSTERLOESUNG: Es gilt $V(x) = x(20-2x)(12-2x) = 4x^3 - 64x^2 + 240x$ auf $D = [0, 6]$. Dann $V'(x) = 12x^2 - 128x + 240$ und $V''(x) = 24x - 128$. Aus $V'(x) = 0$ folgt $3x^2 - 32x + 60 = 0$, also $x = (32 \pm \sqrt{304})/6$, somit $x_1 \approx 2{,}43$ und $x_2 \approx 8{,}24$. Nur $x_1$ liegt in $D$. Wegen $V''(2{,}43) \approx -69{,}7 < 0$ liegt ein lokales Maximum vor. Randpruefung: $V(0) = 0$, $V(6) = 0$, $V(2{,}43) \approx 262{,}7$. Also ist $x \approx 2{,}43\,\mathrm{cm}$ optimal und $V_{\max} \approx 262{,}7\,\mathrm{cm}^3$.

Klausur-Satz: `Mit V'(x1) = 0, V''(x1) < 0 und V(x1) > V(0), V(x1) > V(6) ist x1 die globale Maximalstelle auf D.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Extremwert-Schema (Maximum oder Minimum mit Zielfunktion, Nebenbedingung, Definitionsmenge und Randpruefung) oder (ii) Nur-Ableitung-Schema (nur Stellen mit $f' = 0$ bestimmen, ohne Sachkontext und ohne Randvergleich) > dann loesen.

AUFGABE A: Ein Versandhaus formt aus $36\,\mathrm{cm}$ Draht den Rand einer offenen Kiste mit quadratischer Grundflaeche. Das Volumen soll maximal werden. Stellen Sie erst Zielfunktion, Nebenbedingung und Definitionsmenge auf, dann loesen Sie.
AUFGABE B: Gegeben ist $f(x) = x^3 - 3x^2 + 2$. Bestimmen Sie nur alle Stellen mit $f'(x) = 0$ und deren Art, ohne Sachkontext und ohne Randpruefung.

HILFE: Aufgabe A enthaelt Woerter wie $maximal$, feste Drahtlaenge und offene Kiste, daher Verfahren (i) mit Randpruefung. Aufgabe B nennt nur eine Formel ohne Kontext, daher Verfahren (ii) mit Ableitung und Vorzeichentest.

ANTWORT: A erfordert Verfahren (i): Sei Grundkante $a$ und Hoehe $h$, dann $4a + 4h = 36$, also $h = 9 - a$, $V(a) = a^2(9-a)$ auf $D = [0, 9]$; $V'(a) = 18a - 3a^2 = 0$ liefert $a = 6$ ($a = 0$ ist Rand), $V''(6) < 0$, Randwerte $0$, also $a = 6\,\mathrm{cm}$, $h = 3\,\mathrm{cm}$, $V_{\max} = 108\,\mathrm{cm}^3$. B erfordert Verfahren (ii): $f'(x) = 3x^2 - 6x = 3x(x-2) = 0$, also $x = 0$ und $x = 2$; mit $f''(x) = 6x - 6$ gilt $f''(0) = -6 < 0$ (Maximum) und $f''(2) = 6 > 0$ (Minimum), ohne Randvergleich.

Klausur-Satz: `Ein Sachkontext mit fester Ressource verlangt das volle Extremwert-Schema inklusive Randpruefung, eine reine Formel verlangt nur die Analyse von f'(x) = 0.`

## Schritt 6 — check

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

## Schritt 7 — szenario

ROLLE: Du bist Praktikant in der Logistik-Abteilung eines Online-Haendlers.
SITUATION: Aus einem Standard-Bogen $24\,\mathrm{cm}$ mal $18\,\mathrm{cm}$ sollen offene Versandkisten mit maximalem Volumen gebaut werden. Deine Chefin verlangt eine nachvollziehbare Rechnung mit Zielfunktion, Definitionsmenge, Ableitung und Randpruefung sowie eine klare Empfehlung fuer die Produktion (circa 150 Woerter, mit Einheiten $\mathrm{cm}$ und $\mathrm{cm}^3$).
AUFGABE (beurteilen, AFB III): Entscheide, welche Schnittlaenge in die Produktion geht, und beurteile, wie sensibel das Maximum auf Abweichungen von $\pm 0{,}5\,\mathrm{cm}$ reagiert.
RUBRIC (30 XP): Zielfunktion plus Definitionsmenge korrekt (5 XP) | Kandidaten mit Ableitung korrekt berechnet (10 XP) | Randpruefung mit Einheiten vollstaendig (10 XP) | Produktionsempfehlung mit Beurteilung der Sensibilitaet (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Ein Extremwertproblem verlangt stets vier Bausteine: Zielfunktion, Nebenbedingung, Definitionsmenge und Randvergleich. Zuerst wird die Sachsituation in $V(x)$ mit $D$ uebersetzt, dann werden Kandidaten mit $f'(x) = 0$ gesucht, schliesslich werden die Raender in den Vergleich einbezogen. Merksatz: aufstellen, reduzieren, festlegen, vergleichen. Denn $f' = 0$ ist nur die Eintrittskarte, der Randvergleich faellt das Urteil.

Takeaway-Satz: `Liste Zielfunktion, Nebenbedingung, Definitionsmenge und Randvergleich auf; f'(x) = 0 allein beweist kein globales Maximum.`

REFLEXION (zwei Fragen):
1. Welcher Teil fiel schwerer: das Aufstellen von Zielfunktion und Nebenbedingung (Schritt 4) oder die Entscheidung fuer das volle Schema im Vergleich (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst $D$ mit Einheiten auf und plane die Randpruefung fest ein, bevor ich ableite.
