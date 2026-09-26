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

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst aus vier Bedingungen den Ansatz $f(x) = ax^3+bx^2+cx+d$ und aus Symmetrie den Ansatz ohne ungerade Exponenten waehlen.
2. Du kannst $P(0, 4)$ zu $f(0) = 4$, Steigung $-6$ zu $f'(0) = -6$, Wende bei $1$ zu $f''(1) = 0$ und Nullstelle bei $1$ zu $f(1) = 0$ uebersetzen.
3. Du kannst das LGS zu $a = -1$, $b = 3$, $c = -6$, $d = 4$ loesen und die Probe gegen alle Bedingungen schreiben (AFB II).

### Hook / Phaenomen

Im Jahr 1999 suchten Forensiker aus Bremsspuren die Geschwindigkeit — aus Spuren wurde eine Funktion rekonstruiert. Auch Brueckenbauer lesen aus Pfeilerlage und Durchbiegung die Kurve zurueck. Steckbriefaufgaben kehren die Kurvendiskussion um: Nicht Eigenschaften aus dem Term folgern, sondern den Term aus Eigenschaften bauen. Wie werden aus vier geometrischen Hinweisen vier Gleichungen — und warum entscheidet die Bedingungszahl ueber alles?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Analysis gilt: **Bei Steckbriefaufgaben wird aus jeder geometrischen Eigenschaft eine Bedingungsgleichung, aus der sich die Koeffizienten des Funktionsterms bestimmen lassen**. Der **allgemeine Ansatz enthaelt alle noch unbekannten Koeffizienten, etwa $f(x) = ax^3+bx^2+cx+d$**. Die **Ableitungskette $f'$ und $f''$ liefert Steigungs- und Kruemmungsbedingungen**.

### Wirkungsgefuege / Modell

Der Mechanismus uebersetzt Geometrie in Algebra: $f(x) = ax^3+bx^2+cx+d$ mit $f'(x) = 3ax^2+2bx+c$ und $f''(x) = 6ax+2b$. Dann $f(0) = 4$ zu $d = 4$, $f'(0) = -6$ zu $c = -6$, $f''(1) = 0$ zu $6a+2b = 0$, $f(1) = 0$ zu $a+b+c+d = 0$. Einsetzen von $c$ und $d$ liefert $a+b = 2$ mit $3a+b = 0$, also $a = -1$ und $b = 3$. Die Probe $f(1) = -1+3-6+4 = 0$ schliesst ab.

Schritt A: Ansatz nach Koeffizientenzahl waehlen und $f'$, $f''$ bereitstellen.
Schritt B: Jede Bedingung in eine Gleichung verwandeln.
Schritt C: LGS loesen und Probe gegen alle Bedingungen fahren.

Klausur-Satz: `Bei Steckbriefaufgaben wird aus jeder geometrischen Eigenschaft eine Bedingungsgleichung, aus der sich die Koeffizienten des Funktionsterms bestimmen lassen.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Schueler zaehlt drei Bedingungen und waehlt vier Koeffizienten — das LGS bleibt unterbestimmt, die Aufgabe unloesbar. Seine Nachbarin nutzt Symmetrie und halbiert die Unbekannten. Der Unterschied liegt nicht im Rechnen, sondern im Zaehlen davor. Welche fuenf Begriffe sichern den Ansatz vor dem ersten Strich?

### Fachbegriffe & Definitionen

- **Allgemeiner Ansatz:** Polynom mit Unbekannten, etwa $f(x) = ax^3+bx^2+cx+d$ fuer dritten Grad.
- **Koeffizienten:** Unbestimmte Konstanten $a$, $b$, $c$, $d$; sie werden aus den Bedingungen geloest.
- **Uebersetzung der Bedingungen:** Punkt zu $f(x_0) = y_0$, Steigung zu $f'(x_0) = m$, Extremum zu $f'(x_0) = 0$, Wendepunkt zu $f''(x_0) = 0$.
- **Lineares Gleichungssystem (LGS):** Kopplung aller Bedingungsgleichungen zur Bestimmung der Koeffizienten.
- **Probe:** Einsetzen der Loesung in alle Ausgangsbedingungen zur Kontrolle.

### Wirkungsgefuege / Modell

Die Kette zaehlt vor dem Rechnen: Zahl der Unbekannten gegen Zahl unabhaengiger Bedingungen. Stimmen beide ueberein, so ist das LGS in der Regel eindeutig loesbar; bei Achsensymmetrie entfallen ungerade Exponenten und halbieren die Arbeit. Die Probe $a = -1$, $b = 3$, $c = -6$, $d = 4$ in allen vier Gleichungen sichert gegen Uebersetzungsfehler — der haeufigste Punktverlust liegt nicht im Loesen, sondern im Uebersetzen.

Klausur-Satz: `Die Anzahl der unbekannten Koeffizienten muss der Anzahl der unabhaengigen Bedingungen entsprechen.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Ein Brueckenbogen soll durch $P(0, 4)$ mit Steigung $-6$, Wendepunkt bei $x = 1$ und Nullstelle bei $x = 1$ — vier Hinweise, ein Term. Viele schreiben sofort ein LGS und verrechnen sich, weil $f$, $f'$ und $f''$ vermischt werden. Wie sortiert man Punkt, Steigung und Kruemmung in drei Zeilen — und warum liefert $f''(1) = 0$ genau $6a+2b = 0$?

### Fachbegriff & Definition

**Jede geometrische Eigenschaft des Graphen entspricht genau einer Bedingung an $f$, $f'$ oder $f''$: Punkt an $f$, Steigung an $f'$, Kruemmung an $f''$**. Ein **Extremum verlangt $f'(x_0) = 0$ plus Artpruefung**, ein **Wendepunkt verlangt $f''(x_0) = 0$ plus Wechsel**. Die Bedingungszahl steuert die Ansatzwahl.

### Wirkungsgefuege / Modell

Der Tiefenweg trennt die Ebenen: $f(0) = 4$ greift auf $d$, $f'(0) = -6$ auf $c$, $f''(1) = 0$ auf $6a+2b$, $f(1) = 0$ auf die Summe. Aufgeloest: $d = 4$, $c = -6$, $6a+2b = 0$ zu $b = -3a$, $a+b+2 = 0$ zu $a = -1$ und $b = 3$. Ergebnis $f(x) = -x^3+3x^2-6x+4$ mit Probe in allen vier Zeilen. Wer $f'$ und $f''$ vor dem Uebersetzen bereitstellt, halbiert die Fehlerquote.

Schritt A: $f'$ und $f''$ allgemein aufschreiben.
Schritt B: Zeile fuer Zeile uebersetzen und nummerieren.
Schritt C: LGS loesen und Probe fahren.

```diagram
   Geometrische Bedingung           Algebraische Gleichung
   ================================ ======================
   Graph durch P(0 | 4)             f(0) = 4        >  d = 4
   Tangentensteigung bei 0 ist -6   f'(0) = -6      >  c = -6
   Wendepunkt bei x = 1             f''(1) = 0      >  6a + 2b = 0
   Nullstelle bei x = 1             f(1) = 0        >  a + b + c + d = 0
   ================================ ======================
   4 Bedingungen  >  4 Gleichungen  >  LGS loesen  >  f(x)
   Loesung: a=-1, b=3, c=-6, d=4 > Probe in allen Zeilen
```

Klausur-Satz: `Jede geometrische Eigenschaft des Graphen entspricht genau einer Bedingung an f, f' oder f''.`

## Anekdote & Fun-Fact

Schon in der Song- und Yuan-Zeit loesten Mathematiker Aufgaben, indem sie eine unbekannte Groesse mit einem eigenen Zeichen ansetzten und daraus Gleichungen aufbauten. Diese Methode nannte man Tianyuanshu, die Kunst des himmlischen Elements. Im Kern ist sie nichts anderes als unser Ansatz mit unbekannten Koeffizienten.

Bezug zum Konzept: `Ein Ansatz mit unbekannten Koeffizienten ist eine alte Idee: Aus Bedingungen werden Gleichungen gebaut.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: balance]

AUFGABE (bestimmen, AFB II): Gesucht ist der Funktionsterm einer ganzrationalen Funktion dritten Grades, deren Graph die $y$-Achse bei $y = 4$ schneidet, an der Stelle $x = 0$ die Tangentensteigung $-6$ besitzt, an der Stelle $x = 1$ einen Wendepunkt hat und an der Stelle $x = 1$ eine Nullstelle besitzt.

HILFE:
1. Schritt 1: Ansatz $f(x) = ax^3 + bx^2 + cx + d$ aufstellen sowie $f'$ und $f''$ berechnen.
2. Schritt 2: Aus jeder der vier Eigenschaften eine Gleichung ableiten.
3. Schritt 3: Das LGS loesen und den Funktionsterm mit einer Probe kontrollieren.

MUSTERLOESUNG: Ansatz: $f(x) = ax^3 + bx^2 + cx + d$, $f'(x) = 3ax^2 + 2bx + c$, $f''(x) = 6ax + 2b$. Bedingungen: (I) $y$-Achsenabschnitt $f(0) = 4$ ergibt $d = 4$. (II) Tangentensteigung $f'(0) = -6$ ergibt $c = -6$. (III) Wendepunkt $f''(1) = 0$ ergibt $6a + 2b = 0$, also $b = -3a$. (IV) Nullstelle $f(1) = 0$ ergibt $a + b + c + d = 0$. Mit $c = -6$ und $d = 4$ folgt aus (IV) $a + b - 2 = 0$, also $a + b = 2$. Einsetzen von $b = -3a$ liefert $a - 3a = 2$, also $-2a = 2$ und damit $a = -1$ sowie $b = 3$. Ergebnis: $f(x) = -x^3 + 3x^2 - 6x + 4$. Probe: $f(0) = 4$, $f'(x) = -3x^2 + 6x - 6$ mit $f'(0) = -6$, $f''(x) = -6x + 6$ mit $f''(1) = 0$ und $f(1) = -1 + 3 - 6 + 4 = 0$. Alle Bedingungen sind erfuellt.

Klausur-Satz: `Aus den vier Bedingungen folgt das LGS mit der eindeutigen Loesung a = -1, b = 3, c = -6, d = 4, also f(x) = -x^3 + 3x^2 - 6x + 4.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Kurvendiskussion (Term gegeben, Eigenschaften gesucht: ableiten, Extrema und Wende bestimmen) oder (ii) Rekonstruktion (Eigenschaften gegeben, Term gesucht: Ansatz mit LGS aus Bedingungen) > dann loesen.

AUFGABE A: Gegeben ist $f(x) = x^3 - 6x^2 + 9x + 1$. Bestimmen Sie die Koordinaten der Extrempunkte.
AUFGABE B: Der Graph einer ganzrationalen Funktion dritten Grades hat im Ursprung eine waagerechte Tangente und im Punkt $P(2, -4)$ einen Wendepunkt. Bestimmen Sie den Funktionsterm.

HILFE: Aufgabe A gibt die Funktion vor und fragt nach Eigenschaften, daher Verfahren (i). Aufgabe B gibt Eigenschaften vor und fragt nach dem Term, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $f'(x) = 3x^2 - 12x + 9 = 0$ ergibt $x = 1$ und $x = 3$; mit $f''(1) = -6 < 0$ folgt $HP(1, 5)$ und mit $f''(3) = 6 > 0$ folgt $TP(3, 1)$. B erfordert Verfahren (ii): Ansatz $f(x) = ax^3 + bx^2 + cx + d$; $f'(0) = 0$ ergibt $c = 0$, $f(0) = 0$ ergibt $d = 0$, $f''(2) = 0$ ergibt $12a + 2b = 0$, also $b = -6a$, und $f(2) = -4$ ergibt $8a + 4b = -4$, also $2a + b = -1$. Einsetzen liefert $2a - 6a = -1$, also $a = 0{,}25$ und $b = -1{,}5$; damit $f(x) = 0{,}25x^3 - 1{,}5x^2$.

Klausur-Satz: `Ist der Funktionsterm unbekannt, wird er ueber einen allgemeinen Ansatz und ein LGS aus den gegebenen Bedingungen rekonstruiert.`

## Schritt 6 — check

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

## Schritt 7 — szenario

ROLLE: Du bist Mitarbeiter in einem Ingenieurbuero und sollst ein Brueckenprofil modellieren.
SITUATION: Das Profil eines Brueckenbogens soll naeherungsweise durch eine ganzrationale Funktion dritten Grades beschrieben werden. Bekannt sind: Der Bogen beginnt im Ursprung mit waagerechter Tangente, erreicht an der Stelle $x = 4$ seinen hoechsten Punkt und hat dort eine Hoehe von $16$ Metern. Bestimme den Funktionsterm und erlaeutere in einer zusammenhaengenden Darstellung (circa 150 Woerter) dein Vorgehen.
AUFGABE (aufstellen, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Ansatz, Bedingungsuebersetzung, Loesung und Probe.
RUBRIC (30 XP): Korrekter Ansatz $f(x) = ax^3 + bx^2 + cx + d$ (5 XP) | Uebersetzung der Bedingungen ($f(0) = 0$, $f'(0) = 0$, $f(4) = 16$, $f'(4) = 0$) (10 XP) | Loesung des LGS mit Ergebnis (10 XP) | Probe und Antwortsatz im Sachzusammenhang (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Der Schluessel jeder Steckbriefaufgabe heisst Uebersetzen: Koeffizienten zaehlen, Ansatz waehlen (dritter Grad vier Koeffizienten, achsensymmetrischer vierter Grad drei), Ableitungskette $f'$ und $f''$ bereitstellen und jede geometrische Bedingung in eine Gleichung verwandeln: $f(x_0) = y_0$, $f'(x_0) = m$, $f'(x_0) = 0$, $f''(x_0) = 0$. Gleiche Zahl unabhaengiger Bedingungen und Koeffizienten sichert die eindeutige Loesung; die Probe schliesst ab. Die Tianyuanshu-Anekdote zeigt: Aus Bedingungen Gleichungen zu bauen, ist eine jahrhundertealte Idee.

Takeaway-Satz: `Jede geometrische Bedingung wird in eine Gleichung uebersetzt; die Anzahl unabhaengiger Bedingungen bestimmt die Loesbarkeit des LGS.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Uebersetzen der Bedingungen (Schritt 4) oder das Loesen des LGS (Schritt 5)?
2. Beim naechsten Mal zaehle ich zuerst die Bedingungen und vergleiche sie mit der Anzahl der Koeffizienten, bevor ich den Ansatz waehle.
