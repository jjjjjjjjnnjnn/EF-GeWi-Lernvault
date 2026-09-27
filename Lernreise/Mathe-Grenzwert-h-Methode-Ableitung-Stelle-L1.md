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

<!-- Lesson v3 architecture: Schritte 1-8 fixed; Fehlvorstellung between Schritt 6 and 7 (parser skipped); embedded [Werkzeug: <id>]; gating: check/szenario failed = Weiter greyed; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Den Differenzenquotienten an einer festen Stelle $x_0$ aufstellen und algebraisch vereinfachen.
2. Den Grenzwert fuer $h$ gegen $0$ bilden und als Ableitung $f'(x_0)$ deuten.
3. Das Ergebnis als Tangentensteigung im Sachkontext begruenden (AFB II).

VORAUSSETZUNG: Sicheres Umformen von Termen mit Klammern und Bruechen sowie Ablesen von Steigungen aus Graphen.

VORGAENGER-VERWEIS: Diese Lektion setzt `Mathe-Sekante-zu-Tangente-L1.md` voraus und wiederholt es nicht. Dort wurde der allgemeine Uebergang von der Sekantensteigung zur Tangentensteigung eingefuehrt. Hier folgt der enge Ausschnitt: nur die h-Methode an einer einzelnen Stelle $x_0$ mit vollstaendiger Rechnung bis zum Kuerzen von $h$.

Klausur-Satz: `Die Ableitung an der Stelle x_0 ist der Grenzwert des Differenzenquotienten fuer h gegen 0.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abgedeckt wiederholen):

- Differenzenquotient: $m(h) = \frac{f(x_0 + h) - f(x_0)}{h}$ fuer $h \ne 0$.
- h-Methode: Verfahren, das den Differenzenquotienten erst kuerzt und dann $h \to 0$ betrachtet.
- Differentialquotient: Grenzwert $\lim_{h \to 0} m(h) = f'(x_0)$.
- Stelle $x_0$: Fester Punkt, an dem die lokale Steigung gesucht ist.
- Tangentensteigung: Geometrische Deutung von $f'(x_0)$ im Punkt $P(x_0 \mid f(x_0))$.

Klausur-Satz: `Der Differenzenquotient beschreibt die Sekantensteigung, sein Grenzwert die Tangentensteigung an der Stelle x_0.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Diagramm):

Die h-Methode besteht aus drei festen Schritten: Ansatz aufstellen, Term vereinfachen und $h$ kuerzen, danach erst den Grenzuebergang $h \to 0$ vollziehen. Entscheidend ist die Reihenfolge: Wer $h = 0$ zu frueh einsetzt, erzeugt den unbestimmten Ausdruck $0/0$. Erst nach dem Kuerzen entsteht ein Term, in den $0$ eingesetzt werden darf. Das Ergebnis ist exakt $f'(x_0)$ und damit die Steigung der Tangente im Punkt $P$.

```diagram
Ansatz:  m(h) = (f(x_0+h) - f(x_0)) / h
Schritt A: Zaehler ausmultiplizieren
Schritt B: h ausklammern und kuerzen (h ungleich 0)
Schritt C: Grenzwert h -> 0 bilden => f'(x_0)
Deutung:  f'(x_0) = Steigung der Tangente in P
```

Klausur-Satz: `Vor dem Grenzuebergang muss der Differenzenquotient algebraisch gekuerzt werden, da sonst der Ausdruck 0 durch 0 entstuende.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Newtons Fluxionen und Leibniz Differenzen entstanden aus demselben Problem: Wie legt man an eine krumme Kurve eine gerade Tangente? Beide loesten es durch denselben Grenzgedanken, stritten aber jahrzehntelang um die Prioritaet.

**Bezug zum Konzept**: `Die h-Methode vollzieht exakt diesen historischen Grenzgedanken an einer einzelnen Stelle nach.`

## Schritt 4 — ausprobieren

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II): Bestimmen Sie mit der h-Methode die Ableitung von $f(x) = 2x^2 - x$ an der Stelle $x_0 = 1$.

HILFE:
1. Schritt 1: Ansatz $m(h) = (f(1+h) - f(1)) / h$ aufstellen.
2. Schritt 2: Zaehler ausrechnen und $h$ ausklammern.
3. Schritt 3: Kuerzen und $h \to 0$ betrachten.

MUSTERLOESUNG: Es gilt $f(1) = 1$ und $f(1+h) = 2(1+h)^2 - (1+h) = 2 + 4h + 2h^2 - 1 - h = 1 + 3h + 2h^2$. Damit folgt $m(h) = (3h + 2h^2)/h = 3 + 2h$ fuer $h \ne 0$. Der Grenzwert ergibt $\lim_{h \to 0} (3 + 2h) = 3$, also $f'(1) = 3$. Die Tangente im Punkt $P(1 \mid 1)$ besitzt die Steigung $3$.

Klausur-Satz: `Mit der h-Methode folgt f'(1) = 3, also besitzt die Tangente im Punkt P die Steigung 3.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren, erst Verfahren waehlen, dann rechnen):

VERGLEICH: Waehle erst das Verfahren — (i) h-Methode an einer Stelle (AFB II mit Grenzwert, Vorgehen: Ansatz, Kuerzen, Limes) oder (ii) Ableitungsregel direkt (AFB I, nur Ergebnis nennen) — dann loesen.

AUFGABE A: Berechne mit der h-Methode $f'(2)$ fuer $f(x) = x^2 + 1$ und zeige alle Zwischenschritte.

AUFGABE B: Nenne ohne Rechnung die Ableitung von $g(x) = x^2 + 1$ an der Stelle $x_0 = 2$ mithilfe der Potenzregel.

HILFE: A verlangt den sichtbaren Grenzweg mit $h$, also Verfahren (i). B verlangt nur das Ergebnis, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $m(h) = ((2+h)^2 + 1 - 5)/h = (4h + h^2)/h = 4 + h$, also $f'(2) = 4$. B erfordert Verfahren (ii): $g'(x) = 2x$, also $g'(2) = 4$. Beide Wege liefern denselben Wert, doch nur Verfahren (i) zeigt den Grenzprozess.

Klausur-Satz: `Die h-Methode und die Ableitungsregel liefern denselben Wert, doch nur die h-Methode belegt den Grenzprozess.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet der Ansatz der h-Methode an der Stelle $x_0$? | ANTWORT: $m(h) = (f(x_0+h) - f(x_0))/h$ mit $h \ne 0$.
FRAGE: Warum darf $h = 0$ nicht vor dem Kuerzen eingesetzt werden? | ANTWORT: Weil sonst der unbestimmte Ausdruck $0/0$ entstuende; erst nach dem Kuerzen ist der Grenzwert ablesbar.
FRAGE: Was bedeutet das Ergebnis $f'(x_0)$ geometrisch? | ANTWORT: Die Steigung der Tangente an den Graphen im Punkt $P(x_0 \mid f(x_0))$.

Klausur-Satz: `Der Grenzwert des gekuerzten Differenzenquotienten ist die Ableitung an der Stelle x_0.`

## Fehlvorstellung

1. Fehlvorstellung: Man duerfe $h = 0$ sofort einsetzen, dann sei die Rechnung kuerzer.
   Korrektur-Satz: `Ohne vorheriges Kuerzen fuehrt h = 0 auf 0 durch 0 und damit auf keinen definierten Wert.`

2. Fehlvorstellung: Sekantensteigung ueber ein Intervall und Ableitung an einer Stelle seien stets gleich.
   Korrektur-Satz: `Die Sekantensteigung mittelt ueber ein Intervall, die Ableitung erfasst die lokale Steigung an genau einer Stelle.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in der EF und erklaerst einer Mitschuelerin die h-Methode.
SITUATION: Deine Mitschuelerin hat fuer $f(x) = x^2$ an der Stelle $x_0 = 3$ den Wert $6$ geraten, kann den Weg aber nicht zeigen. Stelle in einer zusammenhaengenden Darstellung (circa 150 Woerter) die vollstaendige h-Methode dar und deute das Ergebnis als Tangentensteigung.
RUBRIC (30 XP): Korrekter Ansatz mit $h$ (8 XP) | Vollstaendige Umformung mit Kuerzen (10 XP) | Grenzwert $f'(3) = 6$ (6 XP) | Geometrische Deutung als Tangentensteigung (6 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY:

Der enge Weg lautet: Ansatz mit $h$, ausmultiplizieren, $h$ kuerzen, erst dann $h \to 0$. Das Ergebnis $f'(x_0)$ ist die Tangentensteigung in $P$.
Takeaway-Satz: `Erst ansetzen, dann kuerzen, erst danach den Grenzwert bilden — so liefert die h-Methode die Ableitung an einer Stelle.`

REFLEXION:
1. Welcher Schritt fiel schwerer — das Ausklammern von $h$ (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst den Ansatz hin, bevor ich umforme, weil der Ansatz die Operatorleistung sichert.
