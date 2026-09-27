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

<!-- Campaign: Optimierung | Episode 14/33 | Krise: Chemie-Reaktor Druck 6,8 bar kritisch | Target: x0 = 6, h = 0.7, Target m = 8.18 | Tool: tangent-slider -->

## Schritt 1 — entdecken: Ableitung um Mitternacht
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst $m(h) = \frac{f(x_0+h)-f(x_0)}{h}$ mit $h \ne 0$ an $x_0 = 1$ fuer $f(x) = 2x^2 - x$ aufstellen und zu $m(h) = 3 + 2h$ vereinfachen.
2. Du kannst $\lim_{h \to 0} m(h) = 3$ bilden und als $f'(1) = 3$ sowie als Tangentensteigung in $P(1, 1)$ deuten.
3. Du kannst begruenden, warum vor dem Einsetzen von $0$ gekuerzt werden muss, und den Antwortsatz im Sachkontext schreiben (AFB II).

###

### Hook / Phaenomen

Hook / Phaenomen (CAO-Log, Episode 14 von 33): Super-Engineering-Zentrale, Chemie-Reaktor Druck 6,8 bar kritisch. Der Chief Algorithm Officer ruft: x0 = 6, h = 0.7, Target m = 8.18, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Grenzwert mit der h-Methode an einer Stelle ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Grenzwert-h-Methode-Ableitung-Stelle-CN-L1.md) legte die Spur, das naechste Audit (Mathe-Grenzwert-h-Methode-Ableitung-Stelle-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Differenzenquotient:** Der Term $(f(x_0+h)-f(x_0))/h$ misst die Sekantensteigung ueber die Breite h. Mechanismus: Werte einsetzen, ausmultiplizieren und h ausklammern. Klausur-Punkt: Term vollständig hinschreiben, bevor gekuerzt wird.
- **h-Methode:** Das Verfahren berechnet $f'(x_0)$ durch Aufstellen, Kuerzen und Grenzuebergang $h \to 0$. Mechanismus: Drei Schritte strikt trennen und $h=0$ erst nach dem Kuerzen betrachten. Klausur-Punkt: Alle drei Schritte sichtbar zeigen, sonst gibt es Abzug.
- **Differentialquotient:** Der Grenzwert $\lim_{h \to 0}(f(x_0+h)-f(x_0))/h$ fixiert die Tangentensteigung. Mechanismus: Gekuerzten Term nehmen und h gegen null laufen lassen. Klausur-Punkt: Limes-Zeichen schreiben und Ergebnis als Moment deuten.
- **Kuerzen vor Grenzwert:** Die algebraische Vereinfachung beseitigt den Ausdruck $0/0$ vor dem Grenzuebergang. Mechanismus: h im Zaehler ausklammern und gegen den Nenner kuerzen. Klausur-Punkt: Kuerzung explizit zeigen, niemals $h=0$ vorher einsetzen.
- **Tangentensteigung:** Der Wert $f'(x_0)$ gibt die Steigung der Tangente im Punkt P an. Mechanismus: Grenzwert berechnen und als Steigung am Punkt deuten. Klausur-Punkt: Punkt nennen, Steigung angeben und Tangentengleichung bei Bedarf aufstellen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

Klausur-Satz: `Der Differenzenquotient beschreibt die Sekantensteigung, sein Grenzwert die Tangentensteigung an der Stelle x_0.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Grenzwert mit der h-Methode an einer Stelle
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von der Sekante ueber das Kuerzen zum Grenzwert: Zuerst stellt man den Differenzenquotienten $(f(x_0+h)-f(x_0))/h$ auf, dann multipliziert man aus und klammert h aus, schliesslich kuerzt man und betrachtet $h \to 0$. Fuer $f(x)=x^2$ an $x_0=1$ gilt $m(h)=((1+h)^2-1)/h=(2h+h^2)/h=2+h$, also $f'(1)=2$. Wer $h=0$ vor dem Kuerzen einsetzt, erhaelt $0/0$ und scheitert, wer erst kuerzt, liest den Grenzwert direkt ab.

```diagram
+------------------------------------------+
| h-Methode in drei Schritten              |
|  1. Aufstellen: (f(x0+h)-f(x0))/h       |
|  2. Kuerzen:    (2h+h^2)/h = 2+h        |
|  3. Grenzwert:  h -> 0  =>  f prime = 2  |
|  Verboten: h=0 vor Schritt 2 => 0/0     |
+------------------------------------------+
```
Formelkern: $(f(x_0+h)-f(x_0))/h$

Klausur-Satz: `Vor dem Grenzuebergang muss der Differenzenquotient algebraisch gekuerzt werden, da sonst der Ausdruck 0 durch 0 entstuende.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact
Newtons Fluxionen und Leibniz Differenzen entstanden aus demselben Problem: Wie legt man an eine krumme Kurve eine gerade Tangente? Beide loesten es durch denselben Grenzgedanken, stritten aber jahrzehntelang um die Prioritaet.

Bezug zum Konzept: `Die h-Methode vollzieht exakt diesen historischen Grenzgedanken an einer einzelnen Stelle nach.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Ableitung um Mitternacht
Kontinuitaet: Vorher Mathe-Grenzwert-h-Methode-Ableitung-Stelle-CN-L1.md | Nachher Mathe-Grenzwert-h-Methode-Ableitung-Stelle-L1.md. Krise dieser Episode: Chemie-Reaktor Druck 6,8 bar kritisch. Target: x0 = 6, h = 0.7, Target m = 8.18.

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: tangent-slider]

AUFGABE (Levelziel, AFB II): Knacke das h-Methoden-Level: Stelle im Sandbox-Slider nacheinander $h = 1{,}0$, $h = 0{,}5$ und $h = 0{,}1$ an $x_0 = 1$ fuer $f(x) = x^2$ ein. Lies jedes Mal $m(h)$ ab, beobachte die Annaeherung an den Grenzwert, und fuehre dann die h-Methode von Hand vollständig durch. Vergleiche dein Sandbox-Ergebnis mit dem exakten Wert und benenne den verbotenen Schritt.

HILFE:
1. Stelle $m(h) = (f(1+h)-f(1))/h$ auf und lies die Sandbox-Werte fuer $h = 1{,}0$ zu $m = 3$ und $h = 0{,}1$ zu $m = 2{,}1$ ab.
2. Rechne $(1+h)^2 = 1+2h+h^2$, kuerze zu $m(h) = 2+h$ und setze niemals $h = 0$ vor dem Kuerzen ein.
3. Bilde $h \to 0$ zu $f'(1) = 2$ und deute den Wert als Tangentensteigung im Punkt P(1|1).

MUSTERLOESUNG: Sandbox $h = 1{,}0$ liefert $m = 3$, $h = 0{,}5$ liefert $m = 2{,}5$, $h = 0{,}1$ liefert $m = 2{,}1$, die Tendenz zeigt $2$. Rechnung $f(1+h)-f(1) = 2h+h^2 = h(2+h)$, also $m(h) = 2+h$ fuer $h \ne 0$, mit $h \to 0$ folgt $f'(1) = 2$. Der verbotene Schritt waere $h = 0$ vor dem Kuerzen mit Ergebnis $0/0$. Die Tangente in P(1|1) besitzt die Steigung 2.

Klausur-Satz: `Mit der h-Methode folgt f'(1) = 3, also besitzt die Tangente im Punkt P die Steigung 3.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Ableitung um Mitternacht
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) h-Methode an einer Stelle (AFB II mit Grenzwert; Vorgehen: Ansatz, Kuerzen, Limes) oder (ii) Ableitungsregel direkt (AFB I, nur Ergebnis nennen) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Berechne mit der h-Methode $f'(2)$ fuer $f(x) = x^2 + 1$ und zeige alle Zwischenschritte.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Nenne ohne Rechnung die Ableitung von $g(x) = x^2 + 1$ an der Stelle $x_0 = 2$ mithilfe der Potenzregel.

HILFE: Aufgabe A verlangt den sichtbaren Grenzweg mit $h$, daher Verfahren (i). Aufgabe B verlangt nur das Ergebnis, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $m(h) = ((2+h)^2 + 1 - 5)/h = (4h + h^2)/h = 4 + h$, also $f'(2) = 4$. B erfordert Verfahren (ii): $g'(x) = 2x$, also $g'(2) = 4$. Beide Wege liefern denselben Wert, doch nur Verfahren (i) zeigt den Grenzprozess.

Klausur-Satz: `Die h-Methode und die Ableitungsregel liefern denselben Wert, doch nur die h-Methode belegt den Grenzprozess.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Grenzwert mit der h-Methode an einer Stelle: Ableitung um Mitternacht
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet der Ansatz der h-Methode an der Stelle $x_0$? | ANTWORT: $m(h) = (f(x_0+h) - f(x_0))/h$ mit $h \ne 0$.
FRAGE: Warum darf $h = 0$ nicht vor dem Kuerzen eingesetzt werden? | ANTWORT: Weil sonst der unbestimmte Ausdruck $0/0$ entstuende; erst nach dem Kuerzen ist der Grenzwert ablesbar.
FRAGE: Was bedeutet das Ergebnis $f'(x_0)$ geometrisch? | ANTWORT: Die Steigung der Tangente an den Graphen im Punkt $P(x_0, f(x_0))$.

Klausur-Satz: `Der Grenzwert des gekuerzten Differenzenquotienten ist die Ableitung an der Stelle x_0.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Man duerfe $h = 0$ sofort einsetzen, dann sei die Rechnung kuerzer.
   Korrektur-Satz: `Ohne vorheriges Kuerzen fuehrt h = 0 auf 0 durch 0 und damit auf keinen definierten Wert.`
2. Fehlkonzept: Sekantensteigung ueber ein Intervall und Ableitung an einer Stelle seien stets gleich.
   Korrektur-Satz: `Die Sekantensteigung mittelt ueber ein Intervall, die Ableitung erfasst die lokale Steigung an genau einer Stelle.`

## Schritt 7 — szenario: Klausurtransfer: Grenzwert mit der h-Methode an einer Stelle: Ableitung um Mitternacht
ROLLE: Du bist Tutorin in der EF und erklaerst einer Mitschuelerin die h-Methode.
SITUATION: Deine Mitschuelerin hat fuer $f(x) = x^2$ an der Stelle $x_0 = 3$ den Wert $6$ geraten, kann den Weg aber nicht zeigen. Stelle in einer zusammenhaengenden Darstellung (circa 150 Woerter) die vollstaendige h-Methode dar und deute das Ergebnis als Tangentensteigung.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Ansatz, Umformung, Grenzwert und Deutung.
RUBRIC (30 XP): Korrekter Ansatz mit $h$ (8 XP) | Vollstaendige Umformung mit Kuerzen (10 XP) | Grenzwert $f'(3) = 6$ (6 XP) | Geometrische Deutung als Tangentensteigung (6 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Ableitung um Mitternacht
TAKEAWAY (Kernbotschaft in einem Kasten):

Der enge Weg lautet: Ansatz mit $h$, ausmultiplizieren, $h$ kuerzen, erst dann $h \to 0$. Das Ergebnis $f'(x_0)$ ist die Tangentensteigung in $P$. Die historische Pointe bleibt: Der Grenzgedanke von Newton und Leibniz wird hier an einer einzigen Stelle vollstaendig nachvollzogen.

Takeaway-Satz: `Erst ansetzen, dann kuerzen, erst danach den Grenzwert bilden: so liefert die h-Methode die Ableitung an einer Stelle.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Ausklammern von $h$ (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst den Ansatz hin, bevor ich umforme, weil der Ansatz die Operatorleistung sichert.

`Klausur-Satz: Siehe Schritt-Inhalt.`
