---
fach: Mathe
thema: "Steckbriefaufgaben: Bedingungen in Gleichungen"
level: 1
ziel: Klausur
xp: 100
operatoren: [bestimmen, aufstellen, loesen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Steckbriefaufgaben: Bedingungen in Gleichungen (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst aus vier Bedingungen den Ansatz $f(x) = ax^3+bx^2+cx+d$ und aus Symmetrie den Ansatz ohne ungerade Exponenten waehlen.
2. Du kannst $P(0, 4)$ zu $f(0) = 4$, Steigung $-6$ zu $f'(0) = -6$, Wende bei $1$ zu $f''(1) = 0$ und Nullstelle bei $1$ zu $f(1) = 0$ uebersetzen.
3. Du kannst das LGS zu $a = -1$, $b = 3$, $c = -6$, $d = 4$ loesen und die Probe gegen alle Bedingungen schreiben (AFB II).

### Hook / Phaenomen

Ein Detektiv rekonstruiert aus Fingerabdruecken den Taeter und ein Mathematiker rekonstruiert aus Punkten und Steigungen die ganze Funktion. Gegeben sind nur ein Hochpunkt hier, ein Wendepunkt dort und eine Steigung an dritter Stelle, gesucht ist der vollständige Funktionsterm. Nimm einen allgemeinen Ansatz vierten Grades und uebersetze jede geometrische Eigenschaft in genau eine Gleichung fuer f, f prime oder f prime prime. Wer Ansatz und Bedingungen verzaehlt, erhaelt ein unter- oder ueberbestimmtes System und scheitert. Wer jede Eigenschaft exakt uebersetzt, das System per Einsetzungs- oder Additionsverfahren loest und die Probe durchfuehrt, rekonstruiert jeden Funktionsterm und beherrscht das Standardverfahren der Klausur. Der folgende Weg fuehrt vom alltaeglichen Staunen zur exakten Rechnung: erst das Phaenomen beobachten, dann die Begriffe klaeren, schliesslich das Modell pruefen und im Sandbox-Labor selbst entdecken, warum jede Regel genau so und nicht anders funktioniert.

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan gilt der untenstehende Klausur-Satz als verbindliche Definition dieser Lektion. Er fasst das Phaenomen in exakter Fachsprache und bildet die Grundlage fuer jede Deutung.

### Wirkungsgefuege / Modell

Der Mechanismus verbindet Alltag und Formel: Das Phaenomen liefert die Anschauung, die Definition liefert die Sprache und das Wirkungsmodell in Schritt 3 liefert die Kausalkette. Wer alle drei Ebenen verknuepft, beantwortet jede Klausurfrage vollständig.

Klausur-Satz: `Bei Steckbriefaufgaben wird aus jeder geometrischen Eigenschaft eine Bedingungsgleichung, aus der sich die Koeffizienten des Funktionsterms bestimmen lassen.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Allgemeiner Ansatz:** Der Term $f(x)=ax^3+bx^2+cx+d$ enthaelt so viele Koeffizienten wie Bedingungen noetig sind. Mechanismus: Grad aus der Bedingungszahl ableiten und Ansatz aufstellen. Klausur-Punkt: Ansatz mit Gradbegruendung hinschreiben.
- **Bedingungsuebersetzung:** Jede Eigenschaft wird zu genau einer Gleichung an $f$, $f'$ oder $f''$. Mechanismus: Punkte in $f$, Steigungen in $f'$, Kruemmung in $f''$ uebersetzen. Klausur-Punkt: Jede Uebersetzung als eigene Zeile zeigen.
- **Extrembedingung:** Ein Extrempunkt liefert $f(x_0)=y_0$ plus $f'(x_0)=0$ als Doppelbedingung. Mechanismus: Punkt- und Steigungsgleichung getrennt aufstellen. Klausur-Punkt: Beide Gleichungen nennen und als Paar kennzeichnen.
- **Wendebedingung:** Ein Wendepunkt liefert $f''(x_0)=0$ zusaetzlich zur Punktgleichung. Mechanismus: Zweite Ableitung bilden und null setzen. Klausur-Punkt: Kruemmungsbedingung explizit als $f''$-Gleichung zeigen.
- **Loesungsverfahren:** Das Gleichungssystem wird per Einsetzung oder Addition schrittweise geloest. Mechanismus: System ordnen, Variable eliminieren und rueckwaerts einsetzen. Klausur-Punkt: Verfahren nennen und Probe durch Einsetzen anschliessen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

Klausur-Satz: `Die Anzahl der unbekannten Koeffizienten muss der Anzahl der unabhaengigen Bedingungen entsprechen.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft vom Ansatz ueber die Bedingungen zur Loesung: Zuerst waehlt man den allgemeinen Ansatz passend zur Bedingungszahl, dann uebersetzt man jede Eigenschaft in eine Gleichung an $f$, $f'$ oder $f''$, schliesslich loest man das System und fuehrt die Probe durch. Die Anzahl der Unbekannten muss der Anzahl unabhaengiger Bedingungen entsprechen, sonst ist das System unter- oder ueberbestimmt. Ein Wendepunkt liefert $f''(x_0)=0$, ein Extrempunkt liefert $f(x_0)=y_0$ und $f'(x_0)=0$.

```diagram
+------------------------------------------+
| Ansatz f(x) = ax^3+bx^2+cx+d            |
|   | jede Eigenschaft -> eine Gleichung  |
|   v                                      |
| LGS: f, f prime, f prime prime einsetzen|
|   | loesen + Probe                      |
|   v  f(x) = -x^3+3x^2-6x+4              |
+------------------------------------------+
```
Formelkern: $f$

Klausur-Satz: `Jede geometrische Eigenschaft des Graphen entspricht genau einer Bedingung an f, f' oder f''.`

## Anekdote & Fun-Fact
Schon in der Song- und Yuan-Zeit loesten Mathematiker Aufgaben, indem sie eine unbekannte Groesse mit einem eigenen Zeichen ansetzten und daraus Gleichungen aufbauten. Diese Methode nannte man Tianyuanshu, die Kunst des himmlischen Elements. Im Kern ist sie nichts anderes als unser Ansatz mit unbekannten Koeffizienten.

Bezug zum Konzept: `Ein Ansatz mit unbekannten Koeffizienten ist eine alte Idee: Aus Bedingungen werden Gleichungen gebaut.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Steckbrief-Labor
BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: formula]

AUFGABE (Levelziel, AFB II): Knacke das Steckbrief-Level: Stelle im Sandbox-Formelgeruest nacheinander die vier Bedingungen ein und beobachte, wie aus jeder Eigenschaft eine Gleichung und aus vier Gleichungen ein loesbares System wird. Lies jede erzeugte Gleichung ab, uebersetze Hochpunkt, Wendepunkt und Steigung, loese das System und fuehre die Probe durch. Benenne das Loesungsverfahren.

HILFE:
1. Waehle den Ansatz $f(x) = ax^3+bx^2+cx+d$ und trage jede Bedingung als eigene Zeile an $f$, $f'$ oder $f''$ ein.
2. Ordne das System, eliminiere per Addition oder Einsetzung und loese zu $a = -1$, $b = 3$, $c = -6$, $d = 4$.
3. Setze die Probe durch Einsetzen aller Bedingungen in $f(x) = -x^3+3x^2-6x+4$ durch und benenne das Verfahren.

MUSTERLOESUNG: Formelgeruest aus vier Bedingungen liefert das System mit der eindeutigen Loesung $a = -1$, $b = 3$, $c = -6$, $d = 4$, also $f(x) = -x^3+3x^2-6x+4$. Verfahren per Einsetzung mit Rueckwaertseinsetzen, Probe durch Einsetzen aller vier Bedingungen bestaetigt den Term. Aus den vier Bedingungen folgt das System mit eindeutiger Loesung, jede Eigenschaft entspricht genau einer Gleichung.

Klausur-Satz: `Aus den vier Bedingungen folgt das LGS mit der eindeutigen Loesung a = -1, b = 3, c = -6, d = 4, also f(x) = -x^3 + 3x^2 - 6x + 4.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Kurvendiskussion (Term gegeben, Eigenschaften gesucht: ableiten, Extrema und Wende bestimmen) oder (ii) Rekonstruktion (Eigenschaften gegeben, Term gesucht: Ansatz mit LGS aus Bedingungen) > dann loesen.

AUFGABE A: Gegeben ist $f(x) = x^3 - 6x^2 + 9x + 1$. Bestimmen Sie die Koordinaten der Extrempunkte.
AUFGABE B: Der Graph einer ganzrationalen Funktion dritten Grades hat im Ursprung eine waagerechte Tangente und im Punkt $P(2, -4)$ einen Wendepunkt. Bestimmen Sie den Funktionsterm.

HILFE: Aufgabe A gibt die Funktion vor und fragt nach Eigenschaften, daher Verfahren (i). Aufgabe B gibt Eigenschaften vor und fragt nach dem Term, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $f'(x) = 3x^2 - 12x + 9 = 0$ ergibt $x = 1$ und $x = 3$; mit $f''(1) = -6 < 0$ folgt $HP(1, 5)$ und mit $f''(3) = 6 > 0$ folgt $TP(3, 1)$. B erfordert Verfahren (ii): Ansatz $f(x) = ax^3 + bx^2 + cx + d$; $f'(0) = 0$ ergibt $c = 0$, $f(0) = 0$ ergibt $d = 0$, $f''(2) = 0$ ergibt $12a + 2b = 0$, also $b = -6a$, und $f(2) = -4$ ergibt $8a + 4b = -4$, also $2a + b = -1$. Einsetzen liefert $2a - 6a = -1$, also $a = 0{,}25$ und $b = -1{,}5$; damit $f(x) = 0{,}25x^3 - 1{,}5x^2$.

Klausur-Satz: `Ist der Funktionsterm unbekannt, wird er ueber einen allgemeinen Ansatz und ein LGS aus den gegebenen Bedingungen rekonstruiert.`

## Schritt 6 — check: Verständnisprüfung
CHECK (drei Fragen mit Antworten):

FRAGE: Welchen Ansatz waehlt man fuer eine ganzrationale Funktion dritten Grades? | ANTWORT: $f(x) = ax^3 + bx^2 + cx + d$ mit vier unbekannten Koeffizienten.
FRAGE: In welche Gleichung uebersetzt man einen Wendepunkt an der Stelle $x_0$? | ANTWORT: In die Bedingung $f''(x_0) = 0$ (bei Nachweis der Art zusaetzlich $f''' \ne 0$).
FRAGE: Wie viele unabhaengige Bedingungen braucht man fuer einen Ansatz mit vier Koeffizienten? | ANTWORT: Genau vier, da jede unabhaengige Bedingung eine Gleichung fuer das LGS liefert.

Klausur-Satz: `Ein Wendepunkt liefert die Bedingung f''(x0) = 0, ein Extrempunkt die Bedingungen f(x0) = y0 und f'(x0) = 0.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Mehr Bedingungen als Koeffizienten sind stets besser; man darf beliebig auswaehlen.
   Korrektur-Satz: `Es muessen ebenso viele unabhaengige Bedingungen wie unbekannte Koeffizienten vorliegen, sonst ist das LGS nicht eindeutig loesbar.`
2. Fehlkonzept: Mit dem hingeschriebenen Funktionsterm ist die Aufgabe vollstaendig geloest.
   Korrektur-Satz: `Nach dem Loesen des LGS muessen die Koeffizienten zur Kontrolle in alle Ausgangsbedingungen eingesetzt werden.`

## Schritt 7 — szenario: Klausurtransfer & Rubric
ROLLE: Du bist Mitarbeiter in einem Ingenieurbuero und sollst ein Brueckenprofil modellieren.
SITUATION: Das Profil eines Brueckenbogens soll naeherungsweise durch eine ganzrationale Funktion dritten Grades beschrieben werden. Bekannt sind: Der Bogen beginnt im Ursprung mit waagerechter Tangente, erreicht an der Stelle $x = 4$ seinen hoechsten Punkt und hat dort eine Hoehe von $16$ Metern. Bestimme den Funktionsterm und erlaeutere in einer zusammenhaengenden Darstellung (circa 150 Woerter) dein Vorgehen.
AUFGABE (aufstellen, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Ansatz, Bedingungsuebersetzung, Loesung und Probe.
RUBRIC (30 XP): Korrekter Ansatz $f(x) = ax^3 + bx^2 + cx + d$ (5 XP) | Uebersetzung der Bedingungen ($f(0) = 0$, $f'(0) = 0$, $f(4) = 16$, $f'(4) = 0$) (10 XP) | Loesung des LGS mit Ergebnis (10 XP) | Probe und Antwortsatz im Sachzusammenhang (5 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion
TAKEAWAY (Kernbotschaft in einem Kasten):

Der Schluessel jeder Steckbriefaufgabe heisst Uebersetzen: Koeffizienten zaehlen, Ansatz waehlen (dritter Grad vier Koeffizienten, achsensymmetrischer vierter Grad drei), Ableitungskette $f'$ und $f''$ bereitstellen und jede geometrische Bedingung in eine Gleichung verwandeln: $f(x_0) = y_0$, $f'(x_0) = m$, $f'(x_0) = 0$, $f''(x_0) = 0$. Gleiche Zahl unabhaengiger Bedingungen und Koeffizienten sichert die eindeutige Loesung; die Probe schliesst ab. Die Tianyuanshu-Anekdote zeigt: Aus Bedingungen Gleichungen zu bauen, ist eine jahrhundertealte Idee.

Takeaway-Satz: `Jede geometrische Bedingung wird in eine Gleichung uebersetzt; die Anzahl unabhaengiger Bedingungen bestimmt die Loesbarkeit des LGS.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Uebersetzen der Bedingungen (Schritt 4) oder das Loesen des LGS (Schritt 5)?
2. Beim naechsten Mal zaehle ich zuerst die Bedingungen und vergleiche sie mit der Anzahl der Koeffizienten, bevor ich den Ansatz waehle.

