---
fach: Mathe
thema: "Ableitungsregeln fuer Polynome"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, begruenden, nachweisen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Ableitungsregeln fuer Polynome (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Potenzregel, Faktorregel und Summenregel je an einem Beispiel vormachen und die Bedingung nennen: Potenzregel nur fuer $x^n$, Faktorregel nur fuer konstanten Faktor, Summenregel nur gliedweise.
2. Du kannst $f(x) = 4x^3 - 5x^2 + 7x - 2$ fehlerfrei zu $f'(x) = 12x^2 - 10x + 7$ ableiten und $f'(2) = 35$ als lokale Aenderungsrate mit Einheit deuten.
3. Du kannst am Operator entscheiden: Bei $berechnen$ schreibst du nur die Regelkette, bei $nachweisen$ oder $zeigen$ den Differenzenquotienten mit $h \to 0$ (AFB II).

### Hook / Phaenomen

Ein Kuchenrezept mit fuenf Zutaten wuerde niemand in einem einzigen Schritt backen, man arbeitet Zutat fuer Zutat nach festen Regeln. Genauso zerlegt die Analysis ein Polynom in seine Summanden und leitet jeden Term nach einer einzigen simplen Regel ab. Nimm $f(x)=4x^3-5x^2+7x-2$ und staune: Aus dem bedrohlich wirkenden Term wird nach drei kleinen Regeln die harmlose Ableitung $f'(x)=12x^2-10x+7$. Wer stattdessen jedes Mal die muehsame h-Methode startet, verschwendet in der Klausur kostbare Minuten und riskiert Rechenfehler. Wer Potenzregel, Faktorregel und Summenregel sicher beherrscht, differenziert jedes Polynom in Sekunden und erkennt sofort, dass Konstanten beim Ableiten spurlos verschwinden. Der folgende Weg fuehrt vom alltaeglichen Staunen zur exakten Rechnung: erst das Phaenomen beobachten, dann die Begriffe klaeren, schliesslich das Modell pruefen und im Sandbox-Labor selbst entdecken, warum jede Regel genau so und nicht anders funktioniert.

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan gilt der untenstehende Klausur-Satz als verbindliche Definition dieser Lektion. Er fasst das Phaenomen in exakter Fachsprache und bildet die Grundlage fuer jede Deutung.

### Wirkungsgefuege / Modell

Der Mechanismus verbindet Alltag und Formel: Das Phaenomen liefert die Anschauung, die Definition liefert die Sprache und das Wirkungsmodell in Schritt 3 liefert die Kausalkette. Wer alle drei Ebenen verknuepft, beantwortet jede Klausurfrage vollständig.

Klausur-Satz: `Ganzrationale Funktionen werden mit der Potenzregel, der Faktorregel und der Summenregel gliedweise differenziert.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Potenzregel:** Fuer $(x^n)$ gilt $(x^n)' = n \cdot x^{n-1}$ durch Absenken des Exponenten. Mechanismus: Exponent als Faktor nach vorn holen und Exponent um eins senken. Klausur-Punkt: Regel nennen und auf jeden Summanden einzeln anwenden.
- **Faktorregel:** Ein konstanter Faktor bleibt beim Ableiten erhalten, also $(c \cdot g)' = c \cdot g'$. Mechanismus: Zahl vor dem x unangetastet lassen und nur den x-Teil ableiten. Klausur-Punkt: Faktor herausschreiben und erst danach ableiten.
- **Summenregel:** Summen duerfen gliedweise differenziert werden, also $(u+v)' = u'+v'$. Mechanismus: Funktion in Summanden zerlegen und jeden Term einzeln ableiten. Klausur-Punkt: Zerlegung sichtbar machen und Term fuer Term vorgehen.
- **Konstante faellt weg:** Die Ableitung einer reinen Zahl ist null, weil horizontale Graphen keine Steigung besitzen. Mechanismus: Alle Summanden ohne x ersatzlos streichen. Klausur-Punkt: Wegfall begruenden statt nur unterschlagen.
- **Ableitungswert:** Der Wert $f'(x_0)$ misst die Tangentensteigung an einer konkreten Stelle. Mechanismus: Stelle in die abgeleitete Funktion einsetzen und ausrechnen. Klausur-Punkt: Ableitung und Einsetzen als zwei getrennte Schritte zeigen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

Klausur-Satz: `Fuer eine Potenz gilt die Potenzregel (x^n)' = n \cdot x^{n-1}; Konstanten fallen beim Differenzieren weg.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von der Zerlegung ueber die Regeln zum Wert: Zuerst zerlegt man $f$ per Summenregel in Summanden, dann wendet man auf jeden Summanden Potenzregel und Faktorregel an, schliesslich setzt man die Stelle ein. Fuer $f(x)=4x^3-5x^2+7x-2$ gilt $f'(x)=12x^2-10x+7$, also $f'(2)=48-20+7=35$. Die Konstante $-2$ faellt weg, weil ihr Graph horizontal verlaeuft und die Steigung null besitzt.

```diagram
+------------------------------------------+
| f(x) = 4x^3 - 5x^2 + 7x - 2              |
|   | Potenz+Faktor je Summand             |
|   v                                      |
| f prime(x) = 12x^2 - 10x + 7             |
|   | x0 = 2 einsetzen                     |
|   v                                      |
| f prime(2) = 48 - 20 + 7 = 35            |
+------------------------------------------+
```
Formelkern: $f$

Klausur-Satz: `Da die Summenregel das gliedweise Differenzieren erlaubt, wird jeder Summand einzeln mit der Potenzregel abgeleitet.`

## Anekdote & Fun-Fact
Die Differentialrechnung wurde im 17. Jahrhundert zweimal unabhaengig erfunden: von Isaac Newton in England und von Gottfried Wilhelm Leibniz in Deutschland. Newton dachte dabei an Bewegung und Aenderungsraten, Leibniz an unendlich kleine Differenzen; seine Schreibweise $dy/dx$ benutzen wir noch heute. Erst mit diesen Ideen wurde es moeglich, Polynome gliedweise und nach festen Regeln abzuleiten.

Bezug zum Konzept: `Die Potenz-, Faktor- und Summenregel sind die systematische Form der fruehesten Ableitungsregeln.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Ableitungs-Labor
BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: tangent-slider]

AUFGABE (Levelziel, AFB II): Knacke das Ableitungs-Level: Ziehe im Sandbox-Slider die Stelle $x_0$ von $0$ bis $3$ und beobachte, wie die Tangentensteigung an $f(x) = 4x^3-5x^2+7x-2$ waechst. Lies die Steigung bei $x_0 = 2$ ab und berechne dann exakt mit Potenz-, Faktor- und Summenregel $f'(2)$. Vergleiche Sandbox-Wert und Rechnung und benenne die drei Regeln.

HILFE:
1. Zerlege $f$ in vier Summanden und lies im Sandbox-Slider bei $x_0 = 2$ die Tangentensteigung etwa $35$ ab.
2. Leite gliedweise ab zu $f'(x) = 12x^2-10x+7$ und streiche die Konstante $-2$ mit Begruendung.
3. Setze $x_0 = 2$ ein zu $f'(2) = 48-20+7 = 35$ und gleiche mit dem Sandbox-Wert ab.

MUSTERLOESUNG: Sandbox bei $x_0 = 2$ zeigt Tangentensteigung $35$. Rechnung per Summenregel gliedweise: $(4x^3)' = 12x^2$ per Potenz- und Faktorregel, $(-5x^2)' = -10x$, $(7x)' = 7$, $(-2)' = 0$. Also $f'(x) = 12x^2-10x+7$ und $f'(2) = 48-20+7 = 35$. Sandbox und Rechnung stimmen ueberein, die drei Regeln sind Potenzregel, Faktorregel und Summenregel.

Klausur-Satz: `Mit Potenz-, Faktor- und Summenregel ergibt sich f'(x) = 12x^2 - 10x + 7 und damit f'(2) = 35.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) $berechnen$ oder $bestimmen$ (Ableitungsfunktion direkt mit Potenz-, Faktor- und Summenregel bilden) oder (ii) $nachweisen$ oder $zeigen$ (Nachweis mit Differenzenquotient und Grenzuebergang) > dann loesen.

AUFGABE A: Bestimmen Sie die Ableitung von $f(x) = 3x^4 - 2x^2 + 9$.
AUFGABE B: Zeigen Sie mit Hilfe des Differenzenquotienten, dass die Funktion $g(x) = x^2$ an der Stelle $x_0$ die Ableitung $g'(x_0) = 2x_0$ besitzt.

HILFE: Aufgabe A verlangt nur das Ergebnis, daher Verfahren (i) mit gliedweiser Potenzregel. Aufgabe B enthaelt das Verb $zeigen$, daher Verfahren (ii) mit vollstaendigem Grenzprozess.

ANTWORT: A erfordert Verfahren (i): $f'(x) = 12x^3 - 4x$. B erfordert Verfahren (ii): Der Differenzenquotient lautet $\frac{(x_0 + h)^2 - x_0^2}{h} = \frac{2x_0 h + h^2}{h} = 2x_0 + h$; der Grenzuebergang $h \to 0$ liefert $g'(x_0) = 2x_0$.

Klausur-Satz: `Bei berechnen genuegt das Ergebnis der Regelanwendung, bei nachweisen muss der Grenzprozess vollstaendig dargestellt werden.`

## Schritt 6 — check: Verständnisprüfung
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die Potenzregel fuer $f(x) = x^n$? | ANTWORT: $f'(x) = n \cdot x^{n-1}$; der Exponent wird zum Faktor und um eins verringert.
FRAGE: Was ergibt die Ableitung eines konstanten Summanden wie $-2$? | ANTWORT: $0$, da der Graph einer konstanten Funktion eine waagerechte Gerade ist.
FRAGE: Warum darf die Faktorregel nicht auf ein Produkt zweier Funktionen angewandt werden? | ANTWORT: Die Faktorregel gilt nur fuer einen konstanten Faktor; fuer Produkte zweier Funktionen braucht man die Produktregel.

Klausur-Satz: `Potenz-, Faktor- und Summenregel gelten fuer ganzrationale Funktionen und werden gliedweise angewandt.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Beim Ableiten wird der Exponent als Faktor abgeschrieben, der Exponent selbst bleibt unveraendert.
   Korrektur-Satz: `Die Potenzregel lautet (x^n)' = n \cdot x^{n-1}; der Exponent wird zum Faktor und zugleich um eins verringert.`
2. Fehlkonzept: Jeder Faktor eines Produkts darf wie eine Konstante vor die Ableitung gezogen werden.
   Korrektur-Satz: `Die Faktorregel gilt nur fuer einen konstanten Faktor, nicht fuer das Produkt zweier x-abhaengiger Faktoren.`

## Schritt 7 — szenario: Klausurtransfer & Rubric
ROLLE: Du bist Schueler-Tutor im Mathe-Foerderkurs der EF.
SITUATION: Ein Mitschueler hat $f(x) = 4x^3 - 5x^2 + 7x - 2$ abgeleitet und als Ergebnis $12x^3 - 10x^2 + 7x$ erhalten. Erklaere ihm in einer zusammenhaengenden Darstellung (circa 150 Woerter), welcher Regelverstoss vorliegt, fuehre die korrekte Ableitung vor und erlaeutere den Unterschied zwischen $berechnen$ und $nachweisen$.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Fehlerbenennung, korrekter Rechnung und Operatorabgrenzung.
RUBRIC (30 XP): Benennung des Fehlers (Exponent nicht verringert, Konstante nicht beachtet) (5 XP) | Korrekte gliedweise Ableitung $f'(x) = 12x^2 - 10x + 7$ (10 XP) | Begruendung mit Potenz-, Faktor- und Summenregel (10 XP) | Abgrenzung $berechnen$ gegen $nachweisen$ (5 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion
TAKEAWAY (Kernbotschaft in einem Kasten):

Die Ableitung eines Polynoms folgt einer festen Ablauffolge: Term in Summanden zerlegen, jeden Summanden mit Koeffizient mal Exponent und Exponent minus eins ableiten, Konstanten zu $0$ setzen und alles mit der Summenregel addieren. Die Potenzregel gehoert zu $x^n$, die Faktorregel zum konstanten Koeffizienten, die Summenregel zum ganzen Term. Der Operator entscheidet ueber den Weg: $berechnen$ verlangt nur die Regelanwendung, $zeigen$ oder $nachweisen$ verlangt den Differenzenquotienten mit Grenzwert.

Takeaway-Satz: `Ganzrationale Funktionen werden gliedweise mit Potenz-, Faktor- und Summenregel differenziert; Konstanten fallen weg.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das gliedweise Differenzieren (Schritt 4) oder die Unterscheidung von $berechnen$ und $nachweisen$ (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst das Verb der Aufgabe und entscheide dann, ob ich nur die Regel anwende oder den Grenzprozess aufschreiben muss.

