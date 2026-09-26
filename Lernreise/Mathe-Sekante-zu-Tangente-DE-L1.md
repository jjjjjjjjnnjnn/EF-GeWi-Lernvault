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

1. Du kannst Sekante als Gerade durch zwei Punkte und Tangente als Grenzlage fuer $h \to 0$ unterscheiden und je ein Bild skizzieren.
2. Du kannst $m = \frac{f(x_0+h)-f(x_0)}{h}$ aufstellen und beschreiben, wie $Q$ gegen $P$ wandert und die Sekante in die Tangente rotiert.
3. Du kannst $f'(3) = 6$ fuer $f(x) = x^2$ von Hand berechnen und gegen die Sekantensteigung $8$ ueber $[3, 5]$ abgrenzen (AFB II).

### Hook / Phaenomen

Ein Blitzer misst $80\,\mathrm{km/h}$ im Moment — doch jede Messung mittelt ueber eine Strecke. Der Tacho behauptet einen Punktwert, die Physik kennt nur Mittelwerte ueber Intervalle. Genau hier beginnt die Analysis: Wie wird aus zwei Punkten ein einziger — und warum liefert $[3, 5]$ mit Steigung $8$ einen anderen Wert als der Moment $6$ an $x_0 = 3$?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Analysis ist die **Ableitung an der Stelle $x_0$ der Grenzwert des Differenzenquotienten fuer $h$ gegen $0$ und beschreibt die Steigung der Tangente an dieser Stelle**. Die **mittlere Aenderungsrate ist die Sekantensteigung ueber ein Intervall**, die **lokale Aenderungsrate ist die Tangentensteigung an einer Stelle als Grenzlage**.

### Wirkungsgefuege / Modell

Der Mechanismus laesst $Q$ wandern: $P(3, 9)$ bleibt fest, $Q(3+h, (3+h)^2)$ rueckt heran. Die Sekantensteigung $m(h) = \frac{(3+h)^2-9}{h} = \frac{6h+h^2}{h} = 6+h$ sinkt mit $h$. Fuer $h \to 0$ gilt $m \to 6$, also $f'(3) = 6$. Ueber $[3, 5]$ mit $h = 2$ gilt dagegen $m = 8$ — groesser, weil die Parabel dort steiler mittelt.

Schritt A: $P$ fixieren und $Q$ mit $h$ aufstellen.
Schritt B: $m(h)$ kuerzen und $h \to 0$ betrachten.
Schritt C: Moment $6$ gegen Mittel $8$ abgrenzen und deuten.

Klausur-Satz: `Die Ableitung an einer Stelle x0 ist der Grenzwert des Differenzenquotienten fuer h gegen 0 und beschreibt die Steigung der Tangente an dieser Stelle.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Radargeraet meldet mittlere Geschwindigkeit ueber $100\,\mathrm{m}$, der Tacho meldet momentane. Beide heissen Geschwindigkeit — doch sie messen Verschiedenes. Wer beide verwechselt, versteht weder Blitzer noch Ableitung. Welche fuenf Begriffe trennen Mittel und Moment sauber?

### Fachbegriffe & Definitionen

- **Mittlere Aenderungsrate:** Differenzenquotient ueber ein Intervall; Sekantensteigung zwischen zwei Punkten.
- **Lokale Aenderungsrate:** Grenzwert an einer Stelle; Tangentensteigung $f'(x_0)$.
- **Sekante:** Gerade durch zwei verschiedene Punkte des Graphen.
- **Tangente:** Gerade durch einen Punkt als Grenzlage der Sekanten fuer $h \to 0$.
- **Differenzenquotient:** $\frac{f(x_0+h)-f(x_0)}{h}$; misst die Sekante auf $[x_0, x_0+h]$.

### Wirkungsgefuege / Modell

Die Kette rotiert um $P$: Mit schrumpfendem $h$ dreht sich die Sekante um den festen Punkt in die Tangente. Algebraisch faellt $h$ aus $m(h) = 6+h$ heraus, geometrisch schliesst sich die Schere zwischen $P$ und $Q$. Der Differentialquotient $\lim_{h \to 0} m(h)$ fixiert den Moment, waehrend jede feste $h$-Wahl einen Mittelwert liefert. Daher ist $8$ ueber $[3, 5]$ kein Fehler, sondern eine andere Frage als $6$ an $3$.

Klausur-Satz: `Der Differenzenquotient liefert die Sekantensteigung ueber ein Intervall, der Differentialquotient die Tangentensteigung an einer Stelle.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Ein Ingenieur vermisst eine Brueckenkurve: Zwei Messpunkte liefern die mittlere Steigung, doch die Statik braucht die exakte Neigung im Lagerpunkt. Die Sekante durch $P$ und $Q$ rotiert mit wanderndem $Q$ — und rastet bei $h \to 0$ in die Tangente ein. Wie wird aus Rotation ein Grenzwert — und warum zeigt das Bild mehr als jede Formel?

### Fachbegriff & Definition

Die **Sekante durch $P$ und $Q$ geht fuer $h \to 0$ in die Tangente in $P$ ueber; ihre Steigungen konvergieren gegen $f'(x_0)$**. Die **Bruecke bildet der Differenzenquotient: erst aufstellen, dann $h \to 0$ betrachten**. Die Sekante misst das mittlere Tempo auf der Strecke, die Tangente das momentane Tempo im Punkt.

### Wirkungsgefuege / Modell

Der Tiefenweg in drei Bildern: $h$ gross zu flache Schere, $h$ klein zu enge Schere, $h \to 0$ zu Tangente. Fuer $f(x) = x^2$ gilt $m(h) = 2x_0+h$, also an $x_0 = 3$ genau $6+h$ gegen $6$. Die Sekante ueber $[3, 5]$ bleibt bei $8$ stehen, weil sie zwei verschiedene Steigungen mittelt. Der Grenzprozess schaltet von Mittel auf Moment um — ein Schalter, kein Gleitregler.

Schritt A: $m(h) = 2x_0+h$ herleiten und einsetzen.
Schritt B: $h \to 0$ als Rotation um $P$ lesen.
Schritt C: Mittel $8$ und Moment $6$ je einer Frage zuordnen.

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
     Limes h > 0 > f'(x0) = 6 an x0=3, Mittel 8 auf [3;5]
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
