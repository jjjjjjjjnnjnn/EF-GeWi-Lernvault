---
fach: Mathe
thema: "Von der Sekante zur Tangente"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Von der Sekante zur Tangente (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst den geometrischen Unterschied zwischen Sekantensteigung (mittlere Aenderungsrate) und Tangentensteigung (lokale Aenderungsrate) erklaeren: zwei Punkte ueber ein Intervall gegen einen Punkt als Grenzlage.
2. Du kannst den Differenzenquotienten $m = (f(x_0 + h) - f(x_0)) / h$ aufstellen und beschreiben, wie die Sekante fuer $h \to 0$ um den festen Punkt rotiert und in die Tangente uebergeht.
3. Du kannst mit Differenzenquotient und Grenzwert die Ableitung einer Funktion an einer Stelle von Hand berechnen und als Klausursatz formulieren (AFB II).

Klausur-Satz: `Die Ableitung an einer Stelle x0 ist der Grenzwert des Differenzenquotienten fuer h gegen 0 und beschreibt die Steigung der Tangente an dieser Stelle.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Mittlere Aenderungsrate (Sekantensteigung): Differenz der Funktionswerte durch Differenz der Stellen, also der Differenzenquotient ueber ein Intervall.
- Lokale Aenderungsrate (Tangentensteigung): Grenzlage der Sekantensteigung an einer Stelle, also der Wert $f'(x_0)$.
- Sekante: Gerade durch zwei verschiedene Punkte des Funktionsgraphen.
- Tangente: Gerade, die den Graphen in einem Punkt beruehrt und dort die Steigung $f'(x_0)$ besitzt.
- Differenzenquotient: $(f(x_0 + h) - f(x_0)) / h$; misst die Sekantensteigung auf $[x_0, x_0 + h]$.

Klausur-Satz: `Der Differenzenquotient liefert die Sekantensteigung ueber ein Intervall, der Differentialquotient die Tangentensteigung an einer Stelle.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Die Ableitung entsteht aus Annaeherung: Ein Punkt $P(x_0, f(x_0))$ bleibt fest, ein zweiter Punkt $Q$ wandert auf der Kurve gegen $P$. Die Sekante durch beide rotiert um $P$; fuer $h \to 0$ nimmt sie die Grenzlage der Tangente ein, deren Steigung $f'(x_0)$ ist. Die Sekante misst daher das mittlere Tempo auf einer Strecke, die Tangente das momentane Tempo in einem Punkt. Die Bruecke bildet der Differenzenquotient: erst aufstellen, dann $h \to 0$ betrachten.

```diagram
        y ^
          |                      Q(x0+h | f(x0+h))
          |                    . |
          |                  .   |  f(x0+h) - f(x0)
          |                .     |
          |              . Sekante
          |            .     \   |
          |          .        \  |   h > 0
          |        .           \ |   =====>  Tangente
          |  P(x0 | f(x0)) ----+----------------- Tangente an P
          |                     h
          +----------------------------------------> x
                  x0           x0+h
     Steigung der Sekante = (f(x0+h) - f(x0)) / h
```

Klausur-Satz: `Laesst man h gegen 0 streben, so geht die Sekante durch P und Q in die Tangente im Punkt P ueber.`

## Anekdote & Fun-Fact

Das Wort Tangente kommt vom lateinischen $tangere$, beruehren, und Sekante von $secare$, schneiden. Eine Sekante schneidet den Graphen in zwei Punkten, eine Tangente beruehrt ihn in einem einzigen. Die Frage, wie man an eine Kurve eine Tangente legt, beschaeftigte Mathematiker lange vor der Erfindung der Ableitung: Aus genau diesem Problem entstand die Differentialrechnung.

Bezug zum Konzept: `Der Grenzuebergang von der schneidenden Sekante zur beruehrenden Tangente liefert die Ableitung.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II): Gegeben ist $f(x) = x^2$. Bestimmen Sie mit dem Differenzenquotienten die Ableitung an der Stelle $x_0 = 3$ und vergleichen Sie das Ergebnis mit der Sekantensteigung im Intervall $[3, 5]$.

HILFE:
1. Schritt 1: Differenzenquotient ansetzen: $m_{\text{sek}} = (f(3 + h) - f(3)) / h$.
2. Schritt 2: Zaehler ausmultiplizieren und $h$ ausklammern, damit sich $h$ kuerzen laesst.
3. Schritt 3: Nach dem Kuerzen $h$ gegen $0$ laufen lassen; danach zum Vergleich $(f(5) - f(3)) / (5 - 3)$ berechnen.

MUSTERLOESUNG: Es gilt $f(3 + h) = (3 + h)^2 = 9 + 6h + h^2$, also $f(3 + h) - f(3) = 9 + 6h + h^2 - 9 = 6h + h^2 = h(6 + h)$. Der Differenzenquotient lautet daher $h(6 + h) / h = 6 + h$ (fuer $h \ne 0$). Der Grenzuebergang $h \to 0$ liefert $f'(3) = 6$. Zum Vergleich: Die Sekantensteigung ueber $[3, 5]$ betraegt $(25 - 9) / (5 - 3) = 16 / 2 = 8$. Die mittlere Aenderungsrate $8$ ist groesser als die lokale Aenderungsrate $6$, weil die Parabel rechts von $x_0 = 3$ im Durchschnitt steiler ansteigt.

Klausur-Satz: `Der Grenzwert des Differenzenquotienten ergibt f'(3) = 6, waehrend die Sekantensteigung ueber [3; 5] den groesseren Wert 8 besitzt.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Sekanten-Verfahren (ein Intervall, zwei Punkte, mittlere Aenderungsrate mit Differenzenquotient) oder (ii) Tangenten-Verfahren (eine Stelle oder ein Zeitpunkt, Momentanwert mit Ableitung) > dann rechnen.

AUFGABE A: Ein Fahrzeug legt in 4 Stunden insgesamt $240\,\mathrm{km}$ zurueck. Gefragt ist die Durchschnittsgeschwindigkeit der gesamten Fahrt.
AUFGABE B: Ein Blitzer misst die Geschwindigkeit des Fahrzeugs genau in dem Moment, in dem es die Messstelle passiert.

HILFE: Aufgabe A nennt ein Zeitintervall mit zwei Endwerten, daher Verfahren (i) mit Sekante. Aufgabe B nennt einen einzelnen Zeitpunkt, daher Verfahren (ii) mit Tangente und Ableitung.

ANTWORT: A erfordert Verfahren (i): $v_{\text{mittel}} = 240\,\mathrm{km} / 4\,\mathrm{h} = 60\,\mathrm{km/h}$; dies ist die mittlere Aenderungsrate, also die Sekantensteigung der Weg-Zeit-Funktion. B erfordert Verfahren (ii): Der Blitzer erfasst die Momentangeschwindigkeit $v(t_0) = s'(t_0)$, also die Tangentensteigung an der Stelle $t_0$.

Klausur-Satz: `Durchschnittsgeschwindigkeiten entsprechen Sekantensteigungen, Momentangeschwindigkeiten entsprechen Tangentensteigungen.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet der Differenzenquotient einer Funktion $f$ im Intervall $[x_0, x_0 + h]$? | ANTWORT: $m = (f(x_0 + h) - f(x_0)) / h$, also die Steigung der Sekante durch die beiden Punkte.
FRAGE: Was geschieht geometrisch mit der Sekante, wenn $h$ gegen $0$ geht? | ANTWORT: Sie dreht sich um den festen Punkt $P(x_0, f(x_0))$ und geht im Grenzfall in die Tangente ueber.
FRAGE: Warum darf man $h$ nicht schon vor dem Kuerzen gleich $0$ setzen? | ANTWORT: Weil sonst der unbestimmte Ausdruck $0/0$ entstuende; erst nach dem Kuerzen ist der Grenzwert ablesbar.

Klausur-Satz: `Der Differentialquotient f'(x0) ist der Grenzwert des Differenzenquotienten fuer h gegen 0.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Sekantensteigung und Tangentensteigung unterscheiden sich nur in der Zeichnung, nicht im Wert.
   Korrektur-Satz: `Die Sekantensteigung ueber ein Intervall darf nicht mit der lokalen Steigung an einem seiner Raender gleichgesetzt werden.`
2. Fehlkonzept: Der Grenzuebergang $h \to 0$ setzt unerlaubt den Nenner null.
   Korrektur-Satz: `Beim Grenzuebergang wird der Differenzenquotient zuerst algebraisch gekuerzt, bevor h gegen 0 betrachtet wird.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in der EF und bereitest eine Mitschuelerin auf die ZKE vor.
SITUATION: Deine Mitschuelerin hat mit dem GTR fuer $f(x) = x^3$ im Intervall $[-1, 1]$ eine Durchschnittssteigung von $1$ erhalten, ist aber verwirrt, weil die Tangente an der Stelle $x = 0$ waagerecht verlaeuft. Erklaere ihr in einer zusammenhaengenden Darstellung (circa 150 Woerter) den Unterschied zwischen Sekante und Tangente und ordne beide Ergebnisse ein.
AUFGABE (interpretieren, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit These, Sekantenrechnung, Tangentenbegruendung und Fazit.
RUBRIC (30 XP): Klare These zum Unterschied Sekante und Tangente (5 XP) | Korrekte Sekantenrechnung $(f(1) - f(-1)) / 2 = 1$ (10 XP) | Begruendung der Tangentensteigung $f'(0) = 0$ (10 XP) | Abschlussfazit mit Fachbegriffen (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Die Sekante gehoert zum Intervall und misst den Durchschnitt, die Tangente gehoert zum Punkt und misst den Moment. Die Bruecke bildet Differenzenquotient plus Grenzwert: erst $(f(x_0 + h) - f(x_0)) / h$ aufstellen, $h$ kuerzen, dann $h \to 0$ betrachten. Die Aufgabenstellung verraet das Verfahren: Intervall oder Zeitraum bedeuten Sekante, Zeitpunkt oder Stelle bedeuten Ableitung. Die Wortherkunft bestaetigt es: $secare$ schneidet, $tangere$ beruehrt.

Takeaway-Satz: `Sekanten mitteln ueber Intervalle, Tangenten erfassen den Moment; die Ableitung ist der Grenzwert der Sekantensteigung fuer h gegen 0.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: die algebraische Umformung des Differenzenquotienten (Schritt 4) oder die Entscheidung zwischen Sekante und Tangente (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst, ob im Aufgabentext ein Intervall oder ein einzelner Zeitpunkt genannt wird, und waehle danach das Verfahren.
