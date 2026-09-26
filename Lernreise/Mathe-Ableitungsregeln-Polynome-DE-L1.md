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

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Potenzregel, Faktorregel und Summenregel je an einem Beispiel vormachen und die Bedingung nennen: Potenzregel nur fuer $x^n$, Faktorregel nur fuer konstanten Faktor, Summenregel nur gliedweise.
2. Du kannst $f(x) = 4x^3 - 5x^2 + 7x - 2$ fehlerfrei zu $f'(x) = 12x^2 - 10x + 7$ ableiten und $f'(2) = 35$ als lokale Aenderungsrate mit Einheit deuten.
3. Du kannst am Operator entscheiden: Bei $berechnen$ schreibst du nur die Regelkette, bei $nachweisen$ oder $zeigen$ den Differenzenquotienten mit $h \to 0$ (AFB II).

### Hook / Phaenomen

Im Jahr 1999 vergluehte der Mars Climate Orbiter in der Marsatmosphaere — ein Einheitenfehler, keine Raketenpanne. Die Software rechnete mit falschen Faktoren, die Flugbahn driftete ab, 125 Millionen Dollar vergluehten. In der Analysis passiert der gleiche Fehlertyp im Kleinen: Wer beim Ableiten den Exponenten nicht verringert oder eine Konstante mitschleppt, erzeugt eine falsche Steigung — und jede weitere Rechnung mit Tangente oder Extrempunkt kippt. Wie schuetzt ein festes Regelschema vor genau diesem Faktorfehler? Und warum muss die Konstante $-2$ zu $0$ werden, obwohl sie im Term steht?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Analysis ist die **Ableitung $f'(x)$ die lokale Aenderungsrate, also die Steigung der Tangente im Punkt $P(x, f(x))$**. Fuer ganzrationale Funktionen gilt die **Potenzregel $(x^n)' = n \cdot x^{n-1}$**, die **Faktorregel $(c \cdot f)' = c \cdot f'$ fuer konstantes $c$** und die **Summenregel $(f+g)' = f' + g'$**. Eine **konstante Funktion $f(x) = c$ besitzt die Ableitung $f'(x) = 0**, weil ihr Graph eine waagerechte Gerade mit Steigung null ist.

### Wirkungsgefuege / Modell

Das Verfahren laeuft in drei Schritten: Zerlegen, Einzelableiten, Addieren. Erstens wird $f$ als Summe von Monomen $c_k x^k$ gelesen. Zweitens wird jedes Monom mit $c_k \cdot k \cdot x^{k-1}$ abgeleitet — Koeffizient mal Exponent, Exponent minus eins. Drittens addiert die Summenregel alle Teile, Konstanten fallen als $0$ weg.

Schritt A: $f(x) = 4x^3 - 5x^2 + 7x - 2$ in vier Summanden teilen.
Schritt B: $4x^3 \to 4 \cdot 3x^2 = 12x^2$, $-5x^2 \to -5 \cdot 2x = -10x$, $7x \to 7$, $-2 \to 0$.
Schritt C: Addieren zu $f'(x) = 12x^2 - 10x + 7$, dann $f'(2) = 12 \cdot 4 - 20 + 7 = 35$.

Klausur-Satz: `Ganzrationale Funktionen werden mit der Potenzregel, der Faktorregel und der Summenregel gliedweise differenziert.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Schueler schreibt $f(x) = 3x^4 - 2x^2 + 9$ ab und liefert $f'(x) = 12x^3 - 4x + 9$. Ein Term stimmt, einer nicht — doch welcher? Ohne scharfe Begriffe bleibt jede Korrektur ein Ratespiel. Diese fuenf Werkzeuge entscheiden in Sekunden, ob ein Schritt erlaubt ist oder nicht.

### Fachbegriffe & Definitionen

- **Potenzregel:** $(x^n)' = n \cdot x^{n-1}$ fuer $n \in \mathbb{N}$. Der Exponent wird Faktor und zugleich um eins verringert.
- **Faktorregel:** $(c \cdot f)' = c \cdot f'$ nur fuer konstantes $c$. Ein $x$-abhaengiger Faktor verlangt die Produktregel.
- **Summenregel:** $(f + g)' = f' + g'$ sowie $(f - g)' = f' - g'$. Sie erlaubt das gliedweise Vorgehen bei Polynomen.
- **Konstante Funktion:** $f(x) = c$ mit $f'(x) = 0$. Der Graph ist waagerecht, die lokale Aenderung ist null.
- **Ableitungsfunktion:** $f'$ ordnet jeder Stelle $x$ die Tangentensteigung von $f$ zu, also $x \mapsto f'(x)$ mit $f'(x_0)$ als Wert an $x_0$.

### Wirkungsgefuege / Modell

Die Begriffe greifen als Kette: Die Summenregel oeffnet den Term in Summanden, Potenz- und Faktorregel bearbeiten jeden Summanden, die Konstante schliesst mit $0$ ab. Wer $x^2 \cdot x^3$ mit der Faktorregel zieht, verwechselt konstant mit variabel — der Fehler faellt sofort auf, weil beide Faktoren $x$ enthalten. Der Test lautet daher stets: Ist der Faktor konstant — ja oder nein — und erst dann wird gezogen oder Produktregel gewaehlt.

Kette: $f = \sum c_k x^k \to f' = \sum c_k \cdot k x^{k-1}$ mit $c_0' = 0$. Beispiel: $3x^4 \to 12x^3$, $-2x^2 \to -4x$, $9 \to 0$.

Klausur-Satz: `Fuer eine Potenz gilt die Potenzregel (x^n)' = n \cdot x^{n-1}; Konstanten fallen beim Differenzieren weg.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Zwei Aufgaben sehen gleich aus, verlangen aber verschiedene Beweise: $Bestimmen Sie f'$ gegen $Zeigen Sie mit dem Differenzenquotienten$. Wer beide mit derselben Regelkette beantwortet, verliert beim zweiten alle Darstellungspunkte — obwohl das Ergebnis stimmt. Woran erkennt man in drei Sekunden, welcher Weg verlangt ist? Und warum rettet die Regelkette allein den Nachweis nicht?

### Fachbegriff & Definition

Der **Differenzenquotient $\frac{f(x_0+h)-f(x_0)}{h}$ mit $h \ne 0$ misst die Sekantensteigung**, sein Grenzwert $f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}$ die Tangentensteigung. Die **Regelkette aus Potenz-, Faktor- und Summenregel ist die Abkuerzung dieses Grenzwerts fuer Polynome** — schnell bei $berechnen$, unzulaessig allein bei $nachweisen$ oder $zeigen$.

### Wirkungsgefuege / Modell

Der Tiefenmechanismus verbindet Abkuerzung und Nachweis: Fuer $g(x) = x^2$ gilt $\frac{(x_0+h)^2-x_0^2}{h} = \frac{2x_0h+h^2}{h} = 2x_0+h$, also $\lim_{h \to 0}(2x_0+h) = 2x_0$. Genau dieses $2x_0$ liefert die Potenzregel direkt als $g'(x_0) = 2x_0$. Die Regel ist daher kein Zauber, sondern der gekuerzte Grenzwert.

Schritt A: Differenzenquotienten aufstellen und ausmultiplizieren.
Schritt B: $h$ ausklammern und kuerzen mit $h \ne 0$.
Schritt C: $h \to 0$ gehen lassen und mit der Regelkette gegenpruefen.

```diagram
   f(x)  =   4x^3    -    5x^2    +    7x    -    2
               |            |           |         |
               v            v           v         v
   Regel:    4*3x^2       -5*2x         7         0
               |            |           |         |
               v            v           v         v
   f'(x) =   12x^2   -    10x     +     7    +    0
               === gliedweise addieren (Summenregel) ===
   Nachweis: (f(x0+h)-f(x0))/h kuerzen, dann h > 0
   Exponent minus eins, Koeffizient mal Exponent; Konstante wird 0
```

Klausur-Satz: `Da die Summenregel das gliedweise Differenzieren erlaubt, wird jeder Summand einzeln mit der Potenzregel abgeleitet.`

## Anekdote & Fun-Fact

Die Differentialrechnung wurde im 17. Jahrhundert zweimal unabhaengig erfunden: von Isaac Newton in England und von Gottfried Wilhelm Leibniz in Deutschland. Newton dachte dabei an Bewegung und Aenderungsraten, Leibniz an unendlich kleine Differenzen; seine Schreibweise $dy/dx$ benutzen wir noch heute. Erst mit diesen Ideen wurde es moeglich, Polynome gliedweise und nach festen Regeln abzuleiten.

Bezug zum Konzept: `Die Potenz-, Faktor- und Summenregel sind die systematische Form der fruehesten Ableitungsregeln.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Gegeben ist die ganzrationale Funktion $f(x) = 4x^3 - 5x^2 + 7x - 2$. Bestimmen Sie $f'(x)$ sowie die lokale Aenderungsrate an der Stelle $x_0 = 2$.

HILFE:
1. Schritt 1: Jeden Summanden einzeln nach der Potenzregel ableiten (Exponent nach vorne, Exponent minus eins).
2. Schritt 2: Den konstanten Summanden $-2$ zu $0$ setzen und alle Ergebnisse mit der Summenregel addieren.
3. Schritt 3: $x_0 = 2$ in $f'(x)$ einsetzen und den Wert als lokale Aenderungsrate deuten.

MUSTERLOESUNG: Gliedweise ergibt sich: $4x^3 \to 4 \cdot 3x^2 = 12x^2$; $-5x^2 \to -5 \cdot 2x = -10x$; $7x \to 7$; $-2 \to 0$. Mit der Summenregel folgt $f'(x) = 12x^2 - 10x + 7$. An der Stelle $x_0 = 2$ gilt $f'(2) = 12 \cdot 2^2 - 10 \cdot 2 + 7 = 48 - 20 + 7 = 35$. Die lokale Aenderungsrate betraegt also $35$; der Graph steigt an dieser Stelle steil an.

Klausur-Satz: `Mit Potenz-, Faktor- und Summenregel ergibt sich f'(x) = 12x^2 - 10x + 7 und damit f'(2) = 35.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) $berechnen$ oder $bestimmen$ (Ableitungsfunktion direkt mit Potenz-, Faktor- und Summenregel bilden) oder (ii) $nachweisen$ oder $zeigen$ (Nachweis mit Differenzenquotient und Grenzuebergang) > dann loesen.

AUFGABE A: Bestimmen Sie die Ableitung von $f(x) = 3x^4 - 2x^2 + 9$.
AUFGABE B: Zeigen Sie mit Hilfe des Differenzenquotienten, dass die Funktion $g(x) = x^2$ an der Stelle $x_0$ die Ableitung $g'(x_0) = 2x_0$ besitzt.

HILFE: Aufgabe A verlangt nur das Ergebnis, daher Verfahren (i) mit gliedweiser Potenzregel. Aufgabe B enthaelt das Verb $zeigen$, daher Verfahren (ii) mit vollstaendigem Grenzprozess.

ANTWORT: A erfordert Verfahren (i): $f'(x) = 12x^3 - 4x$. B erfordert Verfahren (ii): Der Differenzenquotient lautet $\frac{(x_0 + h)^2 - x_0^2}{h} = \frac{2x_0 h + h^2}{h} = 2x_0 + h$; der Grenzuebergang $h \to 0$ liefert $g'(x_0) = 2x_0$.

Klausur-Satz: `Bei berechnen genuegt das Ergebnis der Regelanwendung, bei nachweisen muss der Grenzprozess vollstaendig dargestellt werden.`

## Schritt 6 — check

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

## Schritt 7 — szenario

ROLLE: Du bist Schueler-Tutor im Mathe-Foerderkurs der EF.
SITUATION: Ein Mitschueler hat $f(x) = 4x^3 - 5x^2 + 7x - 2$ abgeleitet und als Ergebnis $12x^3 - 10x^2 + 7x$ erhalten. Erklaere ihm in einer zusammenhaengenden Darstellung (circa 150 Woerter), welcher Regelverstoss vorliegt, fuehre die korrekte Ableitung vor und erlaeutere den Unterschied zwischen $berechnen$ und $nachweisen$.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Fehlerbenennung, korrekter Rechnung und Operatorabgrenzung.
RUBRIC (30 XP): Benennung des Fehlers (Exponent nicht verringert, Konstante nicht beachtet) (5 XP) | Korrekte gliedweise Ableitung $f'(x) = 12x^2 - 10x + 7$ (10 XP) | Begruendung mit Potenz-, Faktor- und Summenregel (10 XP) | Abgrenzung $berechnen$ gegen $nachweisen$ (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Die Ableitung eines Polynoms folgt einer festen Ablauffolge: Term in Summanden zerlegen, jeden Summanden mit Koeffizient mal Exponent und Exponent minus eins ableiten, Konstanten zu $0$ setzen und alles mit der Summenregel addieren. Die Potenzregel gehoert zu $x^n$, die Faktorregel zum konstanten Koeffizienten, die Summenregel zum ganzen Term. Der Operator entscheidet ueber den Weg: $berechnen$ verlangt nur die Regelanwendung, $zeigen$ oder $nachweisen$ verlangt den Differenzenquotienten mit Grenzwert.

Takeaway-Satz: `Ganzrationale Funktionen werden gliedweise mit Potenz-, Faktor- und Summenregel differenziert; Konstanten fallen weg.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das gliedweise Differenzieren (Schritt 4) oder die Unterscheidung von $berechnen$ und $nachweisen$ (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst das Verb der Aufgabe und entscheide dann, ob ich nur die Regel anwende oder den Grenzprozess aufschreiben muss.
