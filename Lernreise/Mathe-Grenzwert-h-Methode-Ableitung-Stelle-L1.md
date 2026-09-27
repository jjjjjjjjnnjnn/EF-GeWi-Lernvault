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

<!-- Campaign: Optimierung | Episode 15/33 | Krise: Stromnetz-Frequenz 49,82 Hz instabil | Target: x0 = 2, h = 0.8, Target m = 8.55 | Tool: tangent-slider -->

## Schritt 1 — entdecken: Skalarprodukt im Hangar
ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Den Differenzenquotienten an einer festen Stelle $x_0$ aufstellen und algebraisch vereinfachen.
2. Den Grenzwert fuer $h$ gegen $0$ bilden und als Ableitung $f'(x_0)$ deuten.
3. Das Ergebnis als Tangentensteigung im Sachkontext begruenden (AFB II).

VORAUSSETZUNG: Sicheres Umformen von Termen mit Klammern und Bruechen sowie Ablesen von Steigungen aus Graphen.

VORGAENGER-VERWEIS: Diese Lektion setzt `Mathe-Sekante-zu-Tangente-L1.md` voraus und wiederholt es nicht. Dort wurde der allgemeine Uebergang von der Sekantensteigung zur Tangentensteigung eingefuehrt. Hier folgt der enge Ausschnitt: nur die h-Methode an einer einzelnen Stelle $x_0$ mit vollstaendiger Rechnung bis zum Kuerzen von $h$.

### Hook / Phaenomen

【首席算法官·第15集/共33集】警报：Stromnetz-Frequenz 49,82 Hz instabil。首席算法官下令：“x0 = 2, h = 0.8, Target m = 8.55！”全场红灯闪烁。上一集（Mathe-Grenzwert-h-Methode-Ableitung-Stelle-DE-L1.md）的伏笔在此引爆，下一集（Mathe-Kosinussatz-Orthogonalitaet-CN-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 15 von 33): Super-Engineering-Zentrale, Stromnetz-Frequenz 49,82 Hz instabil. Der Chief Algorithm Officer ruft: x0 = 2, h = 0.8, Target m = 8.55, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Grenzwert mit der h-Methode an einer Stelle ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Grenzwert-h-Methode-Ableitung-Stelle-DE-L1.md) legte die Spur, das naechste Audit (Mathe-Kosinussatz-Orthogonalitaet-CN-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING (Kernbegriffe, erst lesen, dann abgedeckt wiederholen):

- Differenzenquotient: $m(h) = \frac{f(x_0 + h) - f(x_0)}{h}$ fuer $h \ne 0$.
- h-Methode: Verfahren, das den Differenzenquotienten erst kuerzt und dann $h \to 0$ betrachtet.
- Differentialquotient: Grenzwert $\lim_{h \to 0} m(h) = f'(x_0)$.
- Stelle $x_0$: Fester Punkt, an dem die lokale Steigung gesucht ist.
- Tangentensteigung: Geometrische Deutung von $f'(x_0)$ im Punkt $P(x_0 \mid f(x_0))$.

Klausur-Satz: `Der Differenzenquotient beschreibt die Sekantensteigung, sein Grenzwert die Tangentensteigung an der Stelle x_0.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Grenzwert mit der h-Methode an einer Stelle
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

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Newtons Fluxionen und Leibniz Differenzen entstanden aus demselben Problem: Wie legt man an eine krumme Kurve eine gerade Tangente? Beide loesten es durch denselben Grenzgedanken, stritten aber jahrzehntelang um die Prioritaet.

**Bezug zum Konzept**: `Die h-Methode vollzieht exakt diesen historischen Grenzgedanken an einer einzelnen Stelle nach.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Skalarprodukt im Hangar
Kontinuitaet: Vorher Mathe-Grenzwert-h-Methode-Ableitung-Stelle-DE-L1.md | Nachher Mathe-Kosinussatz-Orthogonalitaet-CN-L1.md. Krise dieser Episode: Stromnetz-Frequenz 49,82 Hz instabil. Target: x0 = 2, h = 0.8, Target m = 8.55.

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: tangent-slider]

AUFGABE (berechnen, AFB II): Bestimmen Sie mit der h-Methode die Ableitung von $f(x) = 2x^2 - x$ an der Stelle $x_0 = 1$.

HILFE:
1. Schritt 1: Ansatz $m(h) = (f(1+h) - f(1)) / h$ aufstellen.
2. Schritt 2: Zaehler ausrechnen und $h$ ausklammern.
3. Schritt 3: Kuerzen und $h \to 0$ betrachten.

MUSTERLOESUNG: Es gilt $f(1) = 1$ und $f(1+h) = 2(1+h)^2 - (1+h) = 2 + 4h + 2h^2 - 1 - h = 1 + 3h + 2h^2$. Damit folgt $m(h) = (3h + 2h^2)/h = 3 + 2h$ fuer $h \ne 0$. Der Grenzwert ergibt $\lim_{h \to 0} (3 + 2h) = 3$, also $f'(1) = 3$. Die Tangente im Punkt $P(1 \mid 1)$ besitzt die Steigung $3$.

Klausur-Satz: `Mit der h-Methode folgt f'(1) = 3, also besitzt die Tangente im Punkt P die Steigung 3.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Skalarprodukt im Hangar
VERGLEICH (zwei Verfahren, erst Verfahren waehlen, dann rechnen):

VERGLEICH: Waehle erst das Verfahren — (i) h-Methode an einer Stelle (AFB II mit Grenzwert, Vorgehen: Ansatz, Kuerzen, Limes) oder (ii) Ableitungsregel direkt (AFB I, nur Ergebnis nennen) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Berechne mit der h-Methode $f'(2)$ fuer $f(x) = x^2 + 1$ und zeige alle Zwischenschritte.

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Nenne ohne Rechnung die Ableitung von $g(x) = x^2 + 1$ an der Stelle $x_0 = 2$ mithilfe der Potenzregel.

HILFE: A verlangt den sichtbaren Grenzweg mit $h$, also Verfahren (i). B verlangt nur das Ergebnis, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $m(h) = ((2+h)^2 + 1 - 5)/h = (4h + h^2)/h = 4 + h$, also $f'(2) = 4$. B erfordert Verfahren (ii): $g'(x) = 2x$, also $g'(2) = 4$. Beide Wege liefern denselben Wert, doch nur Verfahren (i) zeigt den Grenzprozess.

Klausur-Satz: `Die h-Methode und die Ableitungsregel liefern denselben Wert, doch nur die h-Methode belegt den Grenzprozess.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Grenzwert mit der h-Methode an einer Stelle: Skalarprodukt im Hangar
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet der Ansatz der h-Methode an der Stelle $x_0$? | ANTWORT: $m(h) = (f(x_0+h) - f(x_0))/h$ mit $h \ne 0$.
FRAGE: Warum darf $h = 0$ nicht vor dem Kuerzen eingesetzt werden? | ANTWORT: Weil sonst der unbestimmte Ausdruck $0/0$ entstuende; erst nach dem Kuerzen ist der Grenzwert ablesbar.
FRAGE: Was bedeutet das Ergebnis $f'(x_0)$ geometrisch? | ANTWORT: Die Steigung der Tangente an den Graphen im Punkt $P(x_0 \mid f(x_0))$.

Klausur-Satz: `Der Grenzwert des gekuerzten Differenzenquotienten ist die Ableitung an der Stelle x_0.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

1. Fehlvorstellung: Man duerfe $h = 0$ sofort einsetzen, dann sei die Rechnung kuerzer.
   Korrektur-Satz: `Ohne vorheriges Kuerzen fuehrt h = 0 auf 0 durch 0 und damit auf keinen definierten Wert.`

2. Fehlvorstellung: Sekantensteigung ueber ein Intervall und Ableitung an einer Stelle seien stets gleich.
   Korrektur-Satz: `Die Sekantensteigung mittelt ueber ein Intervall, die Ableitung erfasst die lokale Steigung an genau einer Stelle.`

## Schritt 7 — szenario: Klausurtransfer: Grenzwert mit der h-Methode an einer Stelle: Skalarprodukt im Hangar
ROLLE: Du bist Tutorin in der EF und erklaerst einer Mitschuelerin die h-Methode.
SITUATION: Deine Mitschuelerin hat fuer $f(x) = x^2$ an der Stelle $x_0 = 3$ den Wert $6$ geraten, kann den Weg aber nicht zeigen. Stelle in einer zusammenhaengenden Darstellung (circa 150 Woerter) die vollstaendige h-Methode dar und deute das Ergebnis als Tangentensteigung.
RUBRIC (30 XP): Korrekter Ansatz mit $h$ (8 XP) | Vollstaendige Umformung mit Kuerzen (10 XP) | Grenzwert $f'(3) = 6$ (6 XP) | Geometrische Deutung als Tangentensteigung (6 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Skalarprodukt im Hangar
TAKEAWAY:

Der enge Weg lautet: Ansatz mit $h$, ausmultiplizieren, $h$ kuerzen, erst dann $h \to 0$. Das Ergebnis $f'(x_0)$ ist die Tangentensteigung in $P$.
Takeaway-Satz: `Erst ansetzen, dann kuerzen, erst danach den Grenzwert bilden — so liefert die h-Methode die Ableitung an einer Stelle.`

REFLEXION:
1. Welcher Schritt fiel schwerer — das Ausklammern von $h$ (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst den Ansatz hin, bevor ich umforme, weil der Ansatz die Operatorleistung sichert.

`Klausur-Satz: Siehe Schritt-Inhalt.`
