---
fach: Mathe
thema: "Grenzwert mit der h-Methode an einer Stelle"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Grenzwert mit der h-Methode an einer Stelle (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst $m(h) = \frac{f(x_0+h)-f(x_0)}{h}$ mit $h \ne 0$ an $x_0 = 1$ fuer $f(x) = 2x^2 - x$ aufstellen und zu $m(h) = 3 + 2h$ vereinfachen.
2. Du kannst $\lim_{h \to 0} m(h) = 3$ bilden und als $f'(1) = 3$ sowie als Tangentensteigung in $P(1, 1)$ deuten.
3. Du kannst begruenden, warum vor dem Einsetzen von $0$ gekuerzt werden muss, und den Antwortsatz im Sachkontext schreiben (AFB II).

VORAUSSETZUNG: Sicheres Umformen von Termen mit Klammern und Bruechen sowie Ablesen von Steigungen aus Graphen.

VORGAENGER-VERWEIS: Diese Lektion setzt `Mathe-Sekante-zu-Tangente-L1.md` voraus und wiederholt es nicht. Dort wurde der allgemeine Uebergang von der Sekantensteigung zur Tangentensteigung eingefuehrt. Hier folgt der enge Ausschnitt: nur die h-Methode an einer einzelnen Stelle $x_0$ mit vollstaendiger Rechnung bis zum Kuerzen von $h$.

### Hook / Phaenomen

Ein Tachometer zeigt $50\,\mathrm{km/h}$ — doch niemand hat die Strecke dieser Sekunde vermessen. Die Anzeige behauptet ein momentanes Tempo, gemessen wird stets ein Mittel ueber ein Intervall. Genau dieses Raetsel loest die h-Methode: Wie schrumpft ein Intervall zu einem Punkt, ohne dass die Rechnung in $0/0$ explodiert? Und warum darf $h = 0$ erst nach dem Kuerzen eingesetzt werden?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Analysis ist die **Ableitung an der Stelle $x_0$ der Grenzwert des Differenzenquotienten fuer $h$ gegen $0$, also $f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}$**. Der **Differenzenquotient misst die Sekantensteigung ueber $[x_0, x_0+h]$**, sein Grenzwert heisst **Differentialquotient und misst die Tangentensteigung in $P(x_0, f(x_0))$**.

### Wirkungsgefuege / Modell

Das Verfahren folgt drei Schritten: Ansatz, Kuerzen, Grenzwert. Am Beispiel $f(x) = 2x^2 - x$ an $x_0 = 1$ gilt $f(1) = 1$ und $f(1+h) = 2(1+h)^2-(1+h) = 1+3h+2h^2$. Damit $m(h) = \frac{3h+2h^2}{h} = 3+2h$ fuer $h \ne 0$. Erst jetzt darf $h \to 0$ gehen: $\lim_{h \to 0}(3+2h) = 3$, also $f'(1) = 3$.

Schritt A: Zaehler ausmultiplizieren und zusammenfassen.
Schritt B: $h$ ausklammern und mit $h \ne 0$ kuerzen.
Schritt C: $h \to 0$ bilden und als Tangentensteigung deuten.

Klausur-Satz: `Die Ableitung an der Stelle x_0 ist der Grenzwert des Differenzenquotienten fuer h gegen 0.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Zwei Schueler liefern $f'(2) = 4$ fuer $f(x) = x^2 + 1$ — einer mit drei Zeilen Grenzwert, einer mit einem Wort Potenzregel. Beide Zahlen stimmen, nur eine Loesung erhaelt bei $Zeigen Sie mit der h-Methode$ volle Punktzahl. Woran erkennt man, wann die Abkuerzung reicht und wann der volle Grenzweg verlangt ist?

### Fachbegriffe & Definitionen

- **Differenzenquotient:** $m(h) = \frac{f(x_0+h)-f(x_0)}{h}$ fuer $h \ne 0$; Sekantensteigung ueber das Intervall.
- **h-Methode:** Ansatz aufstellen, ausmultiplizieren, $h$ kuerzen, dann erst $h \to 0$ betrachten.
- **Differentialquotient:** $\lim_{h \to 0} m(h) = f'(x_0)$; Tangentensteigung an genau einer Stelle.
- **Stelle $x_0$:** Fester Punkt wie $x_0 = 1$; dort wird die lokale Steigung gesucht.
- **Tangentensteigung:** Geometrische Deutung von $f'(x_0)$ als Steigung der Tangente in $P(x_0, f(x_0))$.

### Wirkungsgefuege / Modell

Die Kette trennt Mittel und Moment: $m(h) = \frac{(2+h)^2+1-5}{h} = \frac{4h+h^2}{h} = 4+h$ mittelt ueber $[2, 2+h]$, erst $\lim_{h \to 0}(4+h) = 4$ fixiert den Moment $f'(2) = 4$. Die Potenzregel $g'(x) = 2x$ liefert denselben Wert ohne Grenzweg — erlaubt bei $berechnen$, unzulaessig allein bei $nachweisen$. Der Operator entscheidet daher vor jeder Rechnung ueber das Verfahren.

Klausur-Satz: `Der Differenzenquotient beschreibt die Sekantensteigung, sein Grenzwert die Tangentensteigung an der Stelle x_0.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Newton und Leibniz stritten jahrzehntelang um die Prioritaet — doch beide standen vor derselben Klippe: $h = 0$ zu frueh eingesetzt ergibt $0/0$, also Nichts durch Nichts. Erst Kuerzen vor Einsetzen verwandelt den unbestimmten Ausdruck in eine ablesbare Zahl. Warum ist genau diese Reihenfolge der ganze Beweis — und wie entlarvt sie den Kurzschluss $h = 0$ sofort?

### Fachbegriff & Definition

Der **Grenzuebergang $h \to 0$ darf erst nach dem algebraischen Kuerzen vollzogen werden, weil vorher der unbestimmte Ausdruck $0/0$ vorliegt**. Erst die gekuerzte Form $m(h) = 3 + 2h$ erlaubt das Einsetzen von $0$. Das Ergebnis ist exakt $f'(x_0)$ und damit die Steigung der Tangente in $P$.

### Wirkungsgefuege / Modell

Der Tiefenmechanismus am Muster $f(x) = 2x^2 - x$: Ansatz $m(h) = \frac{f(1+h)-f(1)}{h}$, Zaehler $1+3h+2h^2-1 = 3h+2h^2$, Kuerzung $\frac{h(3+2h)}{h} = 3+2h$ mit $h \ne 0$, Limes $3$. Wer $h = 0$ vor dem Kuerzen setzt, erhaelt $\frac{0}{0}$ und bleibt stecken — genau darin besteht die $0/0$-Falle. Die Probe per Potenzregel $f'(x) = 4x-1$ zu $f'(1) = 3$ bestaetigt das Ergebnis unabhaengig.

Schritt A: Ansatz mit $h \ne 0$ hinschreiben.
Schritt B: Ausklammern, kuerzen, dann erst Limes bilden.
Schritt C: Per Potenzregel gegenpruefen und geometrisch deuten.

```diagram
Ansatz:  m(h) = (f(x_0+h) - f(x_0)) / h   mit h ungleich 0
Schritt A: Zaehler ausmultiplizieren > 3h + 2h^2
Schritt B: h ausklammern und kuerzen (h ungleich 0) > 3 + 2h
Schritt C: Grenzwert h > 0 bilden, Ergebnis f'(1) = 3
Deutung:  f'(x_0) = Steigung der Tangente in P(1 | 1)
Probe: f'(x) = 4x - 1 > f'(1) = 3 stimmt ueberein
```

Klausur-Satz: `Vor dem Grenzuebergang muss der Differenzenquotient algebraisch gekuerzt werden, da sonst der Ausdruck 0 durch 0 entstuende.`

## Anekdote & Fun-Fact

Newtons Fluxionen und Leibniz Differenzen entstanden aus demselben Problem: Wie legt man an eine krumme Kurve eine gerade Tangente? Beide loesten es durch denselben Grenzgedanken, stritten aber jahrzehntelang um die Prioritaet.

Bezug zum Konzept: `Die h-Methode vollzieht exakt diesen historischen Grenzgedanken an einer einzelnen Stelle nach.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II): Bestimmen Sie mit der h-Methode die Ableitung von $f(x) = 2x^2 - x$ an der Stelle $x_0 = 1$.

HILFE:
1. Schritt 1: Ansatz $m(h) = (f(1+h) - f(1)) / h$ aufstellen.
2. Schritt 2: Zaehler ausrechnen und $h$ ausklammern.
3. Schritt 3: Kuerzen und $h \to 0$ betrachten.

MUSTERLOESUNG: Es gilt $f(1) = 1$ und $f(1+h) = 2(1+h)^2 - (1+h) = 2 + 4h + 2h^2 - 1 - h = 1 + 3h + 2h^2$. Damit folgt $m(h) = (3h + 2h^2)/h = 3 + 2h$ fuer $h \ne 0$. Der Grenzwert ergibt $\lim_{h \to 0} (3 + 2h) = 3$, also $f'(1) = 3$. Die Tangente im Punkt $P(1, 1)$ besitzt die Steigung $3$.

Klausur-Satz: `Mit der h-Methode folgt f'(1) = 3, also besitzt die Tangente im Punkt P die Steigung 3.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) h-Methode an einer Stelle (AFB II mit Grenzwert; Vorgehen: Ansatz, Kuerzen, Limes) oder (ii) Ableitungsregel direkt (AFB I, nur Ergebnis nennen) > dann loesen.

AUFGABE A: Berechne mit der h-Methode $f'(2)$ fuer $f(x) = x^2 + 1$ und zeige alle Zwischenschritte.
AUFGABE B: Nenne ohne Rechnung die Ableitung von $g(x) = x^2 + 1$ an der Stelle $x_0 = 2$ mithilfe der Potenzregel.

HILFE: Aufgabe A verlangt den sichtbaren Grenzweg mit $h$, daher Verfahren (i). Aufgabe B verlangt nur das Ergebnis, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $m(h) = ((2+h)^2 + 1 - 5)/h = (4h + h^2)/h = 4 + h$, also $f'(2) = 4$. B erfordert Verfahren (ii): $g'(x) = 2x$, also $g'(2) = 4$. Beide Wege liefern denselben Wert, doch nur Verfahren (i) zeigt den Grenzprozess.

Klausur-Satz: `Die h-Methode und die Ableitungsregel liefern denselben Wert, doch nur die h-Methode belegt den Grenzprozess.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet der Ansatz der h-Methode an der Stelle $x_0$? | ANTWORT: $m(h) = (f(x_0+h) - f(x_0))/h$ mit $h \ne 0$.
FRAGE: Warum darf $h = 0$ nicht vor dem Kuerzen eingesetzt werden? | ANTWORT: Weil sonst der unbestimmte Ausdruck $0/0$ entstuende; erst nach dem Kuerzen ist der Grenzwert ablesbar.
FRAGE: Was bedeutet das Ergebnis $f'(x_0)$ geometrisch? | ANTWORT: Die Steigung der Tangente an den Graphen im Punkt $P(x_0, f(x_0))$.

Klausur-Satz: `Der Grenzwert des gekuerzten Differenzenquotienten ist die Ableitung an der Stelle x_0.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Man duerfe $h = 0$ sofort einsetzen, dann sei die Rechnung kuerzer.
   Korrektur-Satz: `Ohne vorheriges Kuerzen fuehrt h = 0 auf 0 durch 0 und damit auf keinen definierten Wert.`
2. Fehlkonzept: Sekantensteigung ueber ein Intervall und Ableitung an einer Stelle seien stets gleich.
   Korrektur-Satz: `Die Sekantensteigung mittelt ueber ein Intervall, die Ableitung erfasst die lokale Steigung an genau einer Stelle.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in der EF und erklaerst einer Mitschuelerin die h-Methode.
SITUATION: Deine Mitschuelerin hat fuer $f(x) = x^2$ an der Stelle $x_0 = 3$ den Wert $6$ geraten, kann den Weg aber nicht zeigen. Stelle in einer zusammenhaengenden Darstellung (circa 150 Woerter) die vollstaendige h-Methode dar und deute das Ergebnis als Tangentensteigung.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Ansatz, Umformung, Grenzwert und Deutung.
RUBRIC (30 XP): Korrekter Ansatz mit $h$ (8 XP) | Vollstaendige Umformung mit Kuerzen (10 XP) | Grenzwert $f'(3) = 6$ (6 XP) | Geometrische Deutung als Tangentensteigung (6 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Der enge Weg lautet: Ansatz mit $h$, ausmultiplizieren, $h$ kuerzen, erst dann $h \to 0$. Das Ergebnis $f'(x_0)$ ist die Tangentensteigung in $P$. Die historische Pointe bleibt: Der Grenzgedanke von Newton und Leibniz wird hier an einer einzigen Stelle vollstaendig nachvollzogen.

Takeaway-Satz: `Erst ansetzen, dann kuerzen, erst danach den Grenzwert bilden: so liefert die h-Methode die Ableitung an einer Stelle.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Ausklammern von $h$ (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst den Ansatz hin, bevor ich umforme, weil der Ansatz die Operatorleistung sichert.
