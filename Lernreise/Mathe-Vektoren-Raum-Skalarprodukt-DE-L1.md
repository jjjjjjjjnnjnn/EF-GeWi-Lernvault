---
fach: Mathe
thema: "Vektoren im Raum und Skalarprodukt"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, begruenden, nachweisen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Vektoren]
version: Lesson-v3
---

# Lernreise: Vektoren im Raum und Skalarprodukt (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Vektoren im Raum $\vec{a} = (a_1, a_2, a_3)$ addieren, mit einem Skalar multiplizieren und ihre Laenge $|\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$ berechnen.
2. Du kannst das Skalarprodukt $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$ berechnen und damit den Winkel $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ bestimmen.
3. Du kannst mit dem Kriterium $\vec{a} \cdot \vec{b} = 0$ nachweisen, ob zwei Vektoren orthogonal sind (AFB II).

EINSTIEG: Beim Bau einer Seilbruecke riss im Jahr 1940 die Tacoma-Narrows-Bruecke, weil die Ingenieure die Kraefterichtung falsch einschaetzten. Kraefte sind Vektoren: Nur wer Betrag und Richtung gemeinsam rechnet, baut sicher. Genau das leistet das Skalarprodukt.

Klausur-Satz: `Das Skalarprodukt verbindet Laenge und Winkel zweier Vektoren und prueft Orthogonalitaet ueber den Wert null.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Vektor im Raum: Geordnetes Tripel $\vec{a} = (a_1, a_2, a_3)$, das Verschiebung mit Richtung und Laenge beschreibt.
- Betrag: Laenge eines Vektors, $|\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$, stets $|\vec{a}| \ge 0$.
- Skalarprodukt: Zahl $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$, Mass fuer gleichgerichtete Anteile.
- Winkelformel: $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ mit $0 \le \phi \le 180^\circ$.
- Orthogonalitaet: Zwei Vektoren heissen orthogonal, wenn $\vec{a} \cdot \vec{b} = 0$ gilt.

Klausur-Satz: `Betrag und Skalarprodukt folgen direkt aus den Koordinaten der Vektoren.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Das Skalarprodukt misst, wie stark zwei Vektoren in dieselbe Richtung zeigen. Sind sie parallel und gleichgerichtet, so gilt $\vec{a} \cdot \vec{b} = |\vec{a}| \cdot |\vec{b}|$. Stehen sie senkrecht, so loeschen sich die Anteile aus und das Produkt ist null. Dazwischen liefert die Winkelformel jeden Zwischenwert. Damit wird Geometrie zu Algebra: Senkrechtsein heisst Rechnen mit null.

```diagram
    b ^
      |   / a
      |  /  phi = Winkel zwischen a und b
      | /__ )
      |/____)____>
      O      a . b = |a| * |b| * cos(phi)
      phi = 90 Grad  <=>  a . b = 0
      phi = 0 Grad   <=>  a . b = |a| * |b|
```

Klausur-Satz: `Der Winkel steckt im Skalarprodukt, die Orthogonalitaet im Spezialfall null.`

## Anekdote & Fun-Fact

Der Physiker Josiah Willard Gibbs stritt im 19. Jahrhundert mit den Anhaengern der Quaternionen, weil er Vektoren einfacher schreiben wollte. Sein Punkt siegte: Heute rechnet jede Brueckenstatik mit $|\vec{a}|$ und $\vec{a} \cdot \vec{b}$ statt mit vierdimensionalen Zahlentermen.

Bezug zum Konzept: `Gibbs Vektorformat macht Kraefte und Winkel in drei Zeilen berechenbar.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Gegeben sind $\vec{a} = (2, 1, 2)$ und $\vec{b} = (1, -2, 1)$. Berechnen Sie $|\vec{a}|$, das Skalarprodukt $\vec{a} \cdot \vec{b}$ und den Winkel $\phi$ zwischen beiden Vektoren.

HILFE:
1. Schritt 1: Berechne $|\vec{a}| = \sqrt{2^2 + 1^2 + 2^2}$ und $|\vec{b}| = \sqrt{1^2 + (-2)^2 + 1^2}$.
2. Schritt 2: Berechne $\vec{a} \cdot \vec{b} = 2 \cdot 1 + 1 \cdot (-2) + 2 \cdot 1$.
3. Schritt 3: Setze in $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ ein und bestimme $\phi$.

MUSTERLOESUNG: Es gilt $|\vec{a}| = \sqrt{4 + 1 + 4} = 3$ und $|\vec{b}| = \sqrt{1 + 4 + 1} = \sqrt{6}$. Das Skalarprodukt ist $\vec{a} \cdot \vec{b} = 2 - 2 + 2 = 2$. Damit folgt $\cos(\phi) = \frac{2}{3\sqrt{6}} \approx 0{,}272$, also $\phi \approx 74{,}2^\circ$. Die Vektoren sind weder parallel noch orthogonal.

Klausur-Satz: `Koordinaten einsetzen, Betraege bilden, Winkelformel anwenden.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Skalarprodukt-Verfahren (Produkt ausrechnen, Winkel oder Orthogonalitaet folgern) oder (ii) Betrags-Verfahren (nur Laengen vergleichen, keine Winkel setzen) > dann loesen.

AUFGABE A: Pruefen Sie, ob $\vec{u} = (1, 2, 2)$ und $\vec{v} = (2, -1, 0)$ orthogonal sind.
AUFGABE B: Bestimmen Sie den Einheitsvektor $\vec{a}_0 = \frac{\vec{a}}{|\vec{a}|}$ zu $\vec{a} = (0, 3, 4)$.

HILFE: Aufgabe A fragt nach senkrecht, daher Verfahren (i) mit $\vec{u} \cdot \vec{v}$. Aufgabe B fragt nur nach Laenge eins, daher Verfahren (ii) mit $|\vec{a}|$.

ANTWORT: A erfordert Verfahren (i): $\vec{u} \cdot \vec{v} = 2 - 2 + 0 = 0$, also orthogonal. B erfordert Verfahren (ii): $|\vec{a}| = 5$, also $\vec{a}_0 = (0, 0{,}6, 0{,}8)$ mit $|\vec{a}_0| = 1$.

Klausur-Satz: `Orthogonalitaet braucht das Produkt, Normierung braucht nur den Betrag.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie berechnet man das Skalarprodukt zweier Raumvektoren? | ANTWORT: $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$, komponentenweise multiplizieren und addieren.
FRAGE: Wie lautet die Winkelformel? | ANTWORT: $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ fuer $0 \le \phi \le 180^\circ$.
FRAGE: Woran erkennt man orthogonale Vektoren? | ANTWORT: Am Wert $\vec{a} \cdot \vec{b} = 0$ bei $\vec{a} \ne \vec{0}$ und $\vec{b} \ne \vec{0}$.

Klausur-Satz: `Produkt null bedeutet rechter Winkel, Produkt ungleich null fuehrt zur Winkelformel.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Das Skalarprodukt zweier Vektoren ist wieder ein Vektor.
   Korrektur-Satz: `Das Skalarprodukt ist ein Skalar, kein Vektor.`
2. Fehlkonzept: Aus $\vec{a} \cdot \vec{b} = 0$ folgt stets Orthogonalitaet, auch beim Nullvektor.
   Korrektur-Satz: `Der Test a . b = 0 gilt nur fuer Vektoren ungleich null.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor im Mathe-Foerderkurs der EF.
SITUATION: Ein Mitschueler behauptet, die Vektoren $\vec{a} = (1, 1, 1)$ und $\vec{b} = (1, -1, 0)$ seien parallel, weil beide feste Laengen besitzen.
AUFGABE (begruenden, AFB III): Widerlege die Behauptung in einer zusammenhaengenden Darstellung (circa 150 Woerter), berechne Skalarprodukt und Winkel und erklaere den Unterschied zwischen Betragsgleichheit und Parallelitaet.
RUBRIC (30 XP): Korrektes Skalarprodukt $\vec{a} \cdot \vec{b} = 0$ (10 XP) | Winkel $\phi = 90^\circ$ mit Formel (10 XP) | Begruendung Betrag gegen Richtung (5 XP) | Sprachlich geschlossene Darstellung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Rechne komponentenweise, denke geometrisch. Das Skalarprodukt uebersetzt senkrecht in null und spitz oder stumpf in das Vorzeichen von $\cos(\phi)$. Formelanker: $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$ und $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$. Gibbs Vektorformat macht Kraefte und Winkel in drei Zeilen berechenbar: erst Betraege, dann Produkt, dann Winkel.

Takeaway-Satz: `Komponentenweise rechnen, geometrisch deuten: Das Skalarprodukt uebersetzt senkrecht in null und Winkel in die Kosinusformel.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Rechnen mit drei Koordinaten (Schritt 4) oder die Verfahrenswahl in Schritt 5?
2. Beim naechsten Mal schreibe ich zuerst beide Betraege und das Produkt sauber hin, dann erst den Winkel.
