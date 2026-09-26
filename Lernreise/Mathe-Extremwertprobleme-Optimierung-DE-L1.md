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

1. Du kannst das Drei-Schritt-Verfahren eines Extremwertproblems nennen: Zielfunktion aufstellen, mit der Nebenbedingung auf eine Variable reduzieren und Kandidaten mit Randpruefung beurteilen.
2. Du kannst zu einer offenen Kiste aus einer Pappe die Volumenfunktion $V(x)$ mit Definitionsmenge aufstellen und mit $f' = 0$ sowie zweiter Ableitung oder Monotonietabelle die Art der Kandidaten bestimmen.
3. Du kannst begruenden, warum $f' = 0$ nur notwendig ist, und mit Randwerten und globalem Vergleich das Maximum sichern (AFB II/III).

Klausur-Satz: `Bei einem Extremwertproblem wird zuerst die Zielfunktion mit Hilfe der Nebenbedingung auf eine Variable reduziert, dann werden Kandidaten mit f'(x) = 0 bestimmt und mit Randpruefung beurteilt.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Zielfunktion: Die zu maximierende oder minimierende Groesse, etwa Volumen $V(x)$, Flaeche $A(x)$ oder Gewinn $G(x)$.
- Nebenbedingung: Feste Beziehung zwischen den Variablen, etwa eine begrenzte Pappe oder ein fester Umfang; sie eliminiert ueberschuessige Variablen.
- Definitionsmenge: Sachnahes Intervall fuer $x$, etwa Schnittlaenge $x$ in $[0, 6]$; die Raender werden einzeln geprueft.
- Randpruefung: Vergleich der Funktionswerte innerer Kandidaten mit den Werten an den Intervallraendern; nur der groesste Wert ist das globale Maximum.
- Extremstellen-Kandidat: Stelle mit $f'(x) = 0$; erst Vorzeichenwechsel oder $f''(x)$ mit Randvergleich entscheiden ueber die Art.

Klausur-Satz: `Die Nebenbedingung reduziert die Zielfunktion auf eine Variable, die Definitionsmenge legt das Intervall fuer die Randpruefung fest.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Aus einer Pappe von $20\,\mathrm{cm}$ mal $12\,\mathrm{cm}$ werden an den vier Ecken Quadrate der Seite $x$ ausgeschnitten und zu einer offenen Kiste gefaltet. Das Volumen haengt von $x$ ab: $V(x) = x(20-2x)(12-2x)$ auf $D = [0, 6]$. Der Graph von $V$ steigt zuerst und faellt danach; der Gipfel liegt bei $f'(x) = 0$ und wird erst durch den Vergleich mit den Randwerten $V(0)$ und $V(6)$ als globales Maximum bestaetigt.

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
