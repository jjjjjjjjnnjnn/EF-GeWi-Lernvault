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

<!-- Campaign: Optimierung | Episode 1/33 | Krise: Radar-Alarm A9: Blitzer meldet 97 km/h in 70er Zone | Target: x0 = 3, h = 0.2, Target m = 3.37 | Tool: tangent-slider -->

## Schritt 1 — entdecken: Radar in der Nacht
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Potenzregel, Faktorregel und Summenregel je an einem Beispiel vormachen und die Bedingung nennen: Potenzregel nur fuer $x^n$, Faktorregel nur fuer konstanten Faktor, Summenregel nur gliedweise.
2. Du kannst $f(x) = 4x^3 - 5x^2 + 7x - 2$ fehlerfrei zu $f'(x) = 12x^2 - 10x + 7$ ableiten und $f'(2) = 35$ als lokale Aenderungsrate mit Einheit deuten.
3. Du kannst am Operator entscheiden: Bei $berechnen$ schreibst du nur die Regelkette, bei $nachweisen$ oder $zeigen$ den Differenzenquotienten mit $h \to 0$ (AFB II).

###

### Hook / Phaenomen

Hook / Phaenomen (CAO-Log, Episode 1 von 33): Super-Engineering-Zentrale, Radar-Alarm A9: Blitzer meldet 97 km/h in 70er Zone. Der Chief Algorithm Officer ruft: x0 = 3, h = 0.2, Target m = 3.37, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Ableitungsregeln fuer Polynome ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-ZKE-2027-L1.md) legte die Spur, das naechste Audit (Mathe-Ableitungsregeln-Polynome-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
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

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Ableitungsregeln fuer Polynome
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

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact
Die Differentialrechnung wurde im 17. Jahrhundert zweimal unabhaengig erfunden: von Isaac Newton in England und von Gottfried Wilhelm Leibniz in Deutschland. Newton dachte dabei an Bewegung und Aenderungsraten, Leibniz an unendlich kleine Differenzen; seine Schreibweise $dy/dx$ benutzen wir noch heute. Erst mit diesen Ideen wurde es moeglich, Polynome gliedweise und nach festen Regeln abzuleiten.

Bezug zum Konzept: `Die Potenz-, Faktor- und Summenregel sind die systematische Form der fruehesten Ableitungsregeln.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Radar in der Nacht
Kontinuitaet: Vorher Mathe-ZKE-2027-L1.md | Nachher Mathe-Ableitungsregeln-Polynome-L1.md. Krise dieser Episode: Radar-Alarm A9: Blitzer meldet 97 km/h in 70er Zone. Target: x0 = 3, h = 0.2, Target m = 3.37.

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: tangent-slider]

AUFGABE (Levelziel, AFB II): Knacke das Ableitungs-Level: Ziehe im Sandbox-Slider die Stelle $x_0$ von $0$ bis $3$ und beobachte, wie die Tangentensteigung an $f(x) = 4x^3-5x^2+7x-2$ waechst. Lies die Steigung bei $x_0 = 2$ ab und berechne dann exakt mit Potenz-, Faktor- und Summenregel $f'(2)$. Vergleiche Sandbox-Wert und Rechnung und benenne die drei Regeln.

HILFE:
1. Zerlege $f$ in vier Summanden und lies im Sandbox-Slider bei $x_0 = 2$ die Tangentensteigung etwa $35$ ab.
2. Leite gliedweise ab zu $f'(x) = 12x^2-10x+7$ und streiche die Konstante $-2$ mit Begruendung.
3. Setze $x_0 = 2$ ein zu $f'(2) = 48-20+7 = 35$ und gleiche mit dem Sandbox-Wert ab.

MUSTERLOESUNG: Sandbox bei $x_0 = 2$ zeigt Tangentensteigung $35$. Rechnung per Summenregel gliedweise: $(4x^3)' = 12x^2$ per Potenz- und Faktorregel, $(-5x^2)' = -10x$, $(7x)' = 7$, $(-2)' = 0$. Also $f'(x) = 12x^2-10x+7$ und $f'(2) = 48-20+7 = 35$. Sandbox und Rechnung stimmen ueberein, die drei Regeln sind Potenzregel, Faktorregel und Summenregel.

Klausur-Satz: `Mit Potenz-, Faktor- und Summenregel ergibt sich f'(x) = 12x^2 - 10x + 7 und damit f'(2) = 35.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Radar in der Nacht
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) $berechnen$ oder $bestimmen$ (Ableitungsfunktion direkt mit Potenz-, Faktor- und Summenregel bilden) oder (ii) $nachweisen$ oder $zeigen$ (Nachweis mit Differenzenquotient und Grenzuebergang) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Bestimmen Sie die Ableitung von $f(x) = 3x^4 - 2x^2 + 9$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Zeigen Sie mit Hilfe des Differenzenquotienten, dass die Funktion $g(x) = x^2$ an der Stelle $x_0$ die Ableitung $g'(x_0) = 2x_0$ besitzt.

HILFE: Aufgabe A verlangt nur das Ergebnis, daher Verfahren (i) mit gliedweiser Potenzregel. Aufgabe B enthaelt das Verb $zeigen$, daher Verfahren (ii) mit vollstaendigem Grenzprozess.

ANTWORT: A erfordert Verfahren (i): $f'(x) = 12x^3 - 4x$. B erfordert Verfahren (ii): Der Differenzenquotient lautet $\frac{(x_0 + h)^2 - x_0^2}{h} = \frac{2x_0 h + h^2}{h} = 2x_0 + h$; der Grenzuebergang $h \to 0$ liefert $g'(x_0) = 2x_0$.

Klausur-Satz: `Bei berechnen genuegt das Ergebnis der Regelanwendung, bei nachweisen muss der Grenzprozess vollstaendig dargestellt werden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Ableitungsregeln fuer Polynome: Radar in der Nacht
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die Potenzregel fuer $f(x) = x^n$? | ANTWORT: $f'(x) = n \cdot x^{n-1}$; der Exponent wird zum Faktor und um eins verringert.
FRAGE: Was ergibt die Ableitung eines konstanten Summanden wie $-2$? | ANTWORT: $0$, da der Graph einer konstanten Funktion eine waagerechte Gerade ist.
FRAGE: Warum darf die Faktorregel nicht auf ein Produkt zweier Funktionen angewandt werden? | ANTWORT: Die Faktorregel gilt nur fuer einen konstanten Faktor; fuer Produkte zweier Funktionen braucht man die Produktregel.

Klausur-Satz: `Potenz-, Faktor- und Summenregel gelten fuer ganzrationale Funktionen und werden gliedweise angewandt.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Beim Ableiten wird der Exponent als Faktor abgeschrieben, der Exponent selbst bleibt unveraendert.
   Korrektur-Satz: `Die Potenzregel lautet (x^n)' = n \cdot x^{n-1}; der Exponent wird zum Faktor und zugleich um eins verringert.`
2. Fehlkonzept: Jeder Faktor eines Produkts darf wie eine Konstante vor die Ableitung gezogen werden.
   Korrektur-Satz: `Die Faktorregel gilt nur fuer einen konstanten Faktor, nicht fuer das Produkt zweier x-abhaengiger Faktoren.`

## Schritt 7 — szenario: Klausurtransfer: Ableitungsregeln fuer Polynome: Radar in der Nacht
ROLLE: Du bist Schueler-Tutor im Mathe-Foerderkurs der EF.
SITUATION: Ein Mitschueler hat $f(x) = 4x^3 - 5x^2 + 7x - 2$ abgeleitet und als Ergebnis $12x^3 - 10x^2 + 7x$ erhalten. Erklaere ihm in einer zusammenhaengenden Darstellung (circa 150 Woerter), welcher Regelverstoss vorliegt, fuehre die korrekte Ableitung vor und erlaeutere den Unterschied zwischen $berechnen$ und $nachweisen$.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Fehlerbenennung, korrekter Rechnung und Operatorabgrenzung.
RUBRIC (30 XP): Benennung des Fehlers (Exponent nicht verringert, Konstante nicht beachtet) (5 XP) | Korrekte gliedweise Ableitung $f'(x) = 12x^2 - 10x + 7$ (10 XP) | Begruendung mit Potenz-, Faktor- und Summenregel (10 XP) | Abgrenzung $berechnen$ gegen $nachweisen$ (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Radar in der Nacht
TAKEAWAY (Kernbotschaft in einem Kasten):

Die Ableitung eines Polynoms folgt einer festen Ablauffolge: Term in Summanden zerlegen, jeden Summanden mit Koeffizient mal Exponent und Exponent minus eins ableiten, Konstanten zu $0$ setzen und alles mit der Summenregel addieren. Die Potenzregel gehoert zu $x^n$, die Faktorregel zum konstanten Koeffizienten, die Summenregel zum ganzen Term. Der Operator entscheidet ueber den Weg: $berechnen$ verlangt nur die Regelanwendung, $zeigen$ oder $nachweisen$ verlangt den Differenzenquotienten mit Grenzwert.

Takeaway-Satz: `Ganzrationale Funktionen werden gliedweise mit Potenz-, Faktor- und Summenregel differenziert; Konstanten fallen weg.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das gliedweise Differenzieren (Schritt 4) oder die Unterscheidung von $berechnen$ und $nachweisen$ (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst das Verb der Aufgabe und entscheide dann, ob ich nur die Regel anwende oder den Grenzprozess aufschreiben muss.

`Klausur-Satz: Siehe Schritt-Inhalt.`
