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

<!-- Campaign: Optimierung | Episode 31/33 | Krise: Endabnahme: 3 Systeme muessen kollisionsfrei syncen | Zielgroessen: Vektoren im Raum, Ziel Winkel und Orthogonalitaetsprobe | Tool: formula -->

## Schritt 1 — entdecken: Endabnahme I
ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst Vektoren im Raum $\vec{a} = (a_1, a_2, a_3)$ addieren, mit einem Skalar multiplizieren und ihre Laenge $|\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$ berechnen.
2. Du kannst das Skalarprodukt $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$ berechnen und damit den Winkel $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ bestimmen.
3. Du kannst mit dem Kriterium $\vec{a} \cdot \vec{b} = 0$ nachweisen, ob zwei Vektoren orthogonal sind (AFB II).

EINSTIEG: Beim Bau einer Seilbruecke riss im Jahr 1940 die Tacoma-Narrows-Bruecke, weil die Ingenieure die Kraefterichtung falsch einschaetzten. Kraefte sind Vektoren: Nur wer Betrag und Richtung gemeinsam rechnet, baut sicher. Genau das leistet das Skalarprodukt.

### Hook / Phaenomen

空间里两个箭头：是同向发力还是互相拆台？点积用一个数说清配合程度，为零就是垂直，模长归一化后夹角现形。

Hook / Phaenomen: Zwei Pfeile im Raum: Zeigen sie gemeinsam voran oder blockieren sie sich? Das **Skalarprodukt** misst die Zusammenarbeit in einer einzigen Zahl. Null bedeutet **Orthogonalitaet**, der **Betrag** normiert, die **Winkelformel** enthuellt den Rest.

`Klausur-Satz: Das Skalarprodukt entscheidet Zusammenarbeit: Positiv spitz, null orthogonal, negativ stumpf.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
GRUNDBEGRIFFE (5 Begriffe, zuerst laut lesen, dann aus dem Kopf definieren):

- **Vektor im Raum**: Geordnetes Tripel $\vec{a} = (a_1, a_2, a_3)$, das Verschiebung mit Richtung und Laenge beschreibt. Er besitzt Richtung und Laenge, aber keinen festen Ort. Mechanismus: Pfeil durch Koordinatentripel darstellen. Klausur-Tipp: Koordinaten als Spalte oder Zeile schreiben.
- **Betrag**: Laenge eines Vektors, $|\vec{a}| = \sqrt{a_1^2 + a_2^2 + a_3^2}$, stets $|\vec{a}| \ge 0$. Er misst die Laenge des Pfeils im Raum. Mechanismus: Koordinaten quadrieren, addieren und Wurzel ziehen. Klausur-Tipp: Wurzel erst am Ende numerisch auswerten
- **Skalarprodukt**: Zahl $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$, Mass fuer gleichgerichtete Anteile. Es verdichtet zwei Vektoren zu einer einzigen Kooperationszahl. Mechanismus: Koordinatenweise multiplizieren und summieren. Klausur-Tipp: Summenformel vor dem Einsetzen hinschreiben.
- **Winkelformel**: $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ mit $0 \le \phi \le 180^\circ$. Sie loest den eingeschlossenen Winkel aus Skalarprodukt und Betraegen. Mechanismus: Skalarprodukt durch Betragsprodukt teilen und arccos nehmen. Klausur-Tipp: Gradmass und Bogenmass sauber trennen
- **Orthogonalitaet**: Zwei Vektoren heissen orthogonal, wenn $\vec{a} \cdot \vec{b} = 0$ gilt. Orthogonal heisst Skalarprodukt null bei Vektoren ungleich null. Mechanismus: Skalarprodukt null setzen und pruefen. Klausur-Tipp: Nullvektor als Sonderfall ausschliessen.

`Klausur-Satz: Betrag und Skalarprodukt folgen direkt aus den Koordinaten der Vektoren.`

## Schritt 3 — entdecken: Wirkungskette hinter Vektoren im Raum und Skalarprodukt
KONZEPT (ein Konzept plus ein Textdiagramm):

Das Skalarprodukt misst, wie stark zwei Vektoren in dieselbe Richtung zeigen. Sind sie parallel und gleichgerichtet, so gilt $\vec{a} \cdot \vec{b} = |\vec{a}| \cdot |\vec{b}|$. Stehen sie senkrecht, so loeschen sich die Anteile aus und das Produkt ist null.

Dazwischen liefert die Winkelformel jeden Zwischenwert. Damit wird Geometrie zu Algebra: Senkrechtsein heisst Rechnen mit null.

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

$$\vec{a}\cdot\vec{b} = |\vec{a}||\vec{b}|\cos(\varphi)$$
`Klausur-Satz: Der Winkel steckt im Skalarprodukt, die Orthogonalitaet im Spezialfall null.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Endabnahme I
Kontinuitaet: Vorher Mathe-Vektoren-Raum-Skalarprodukt-DE-L1.md | Nachher Mathe-ZKE-2027-DE-L1.md. Krise dieser Episode: Endabnahme: 3 Systeme muessen kollisionsfrei syncen. Zielgroessen: Vektoren im Raum, Ziel Winkel und Orthogonalitaetsprobe

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Gegeben sind $\vec{a} = (2, 1, 2)$ und $\vec{b} = (1, -2, 1)$. Berechnen Sie $|\vec{a}|$, das Skalarprodukt $\vec{a} \cdot \vec{b}$ und den Winkel $\phi$ zwischen beiden Vektoren.

HILFE:
1. Schritt 1: Berechne $|\vec{a}| = \sqrt{2^2 + 1^2 + 2^2}$ und $|\vec{b}| = \sqrt{1^2 + (-2)^2 + 1^2}$.
2. Schritt 2: Berechne $\vec{a} \cdot \vec{b} = 2 \cdot 1 + 1 \cdot (-2) + 2 \cdot 1$.
3. Schritt 3: Setze in $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ ein und bestimme $\phi$.

MUSTERLOESUNG: Es gilt $|\vec{a}| = \sqrt{4 + 1 + 4} = 3$ und $|\vec{b}| = \sqrt{1 + 4 + 1} = \sqrt{6}$. Das Skalarprodukt ist $\vec{a} \cdot \vec{b} = 2 - 2 + 2 = 2$. Damit folgt $\cos(\phi) = \frac{2}{3\sqrt{6}} \approx 0{,}272$, also $\phi \approx 74{,}2^\circ$. Die Vektoren sind weder parallel noch orthogonal.

`Klausur-Satz: Koordinaten einsetzen, Betraege bilden, Winkelformel anwenden.`

## Schritt 5 — ausprobieren: Duell der Verfahren Endabnahme I
VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle zuerst das Verfahren — (i) Skalarprodukt-Verfahren (Produkt ausrechnen, Winkel oder Orthogonalitaet folgern) oder (ii) Betrags-Verfahren (nur Laengen vergleichen, keine Winkel setzen) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Pruefen Sie, ob $\vec{u} = (1, 2, 2)$ und $\vec{v} = (2, -1, 0)$ orthogonal sind.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Bestimmen Sie den Einheitsvektor $\vec{a}_0 = \frac{\vec{a}}{|\vec{a}|}$ zu $\vec{a} = (0, 3, 4)$.

HILFE: A fragt nach senkrecht, also Verfahren (i) mit $\vec{u} \cdot \vec{v}$. B fragt nur nach Laenge eins, also Verfahren (ii) mit $|\vec{a}|$.

ANTWORT: A erfordert Verfahren (i): $\vec{u} \cdot \vec{v} = 2 - 2 + 0 = 0$, also orthogonal. B erfordert Verfahren (ii): $|\vec{a}| = 5$, also $\vec{a}_0 = (0, 0{,}6, 0{,}8)$ mit $|\vec{a}_0| = 1$.

`Klausur-Satz: Orthogonalitaet braucht das Produkt, Normierung braucht nur den Betrag.`

## Schritt 6 — check: Selbsttest zu Vektoren im Raum und Skalarprodukt: Endabnahme I
CHECK (Selbsttest, 3 Fragen):

- FRAGE: Wie berechnet man das Skalarprodukt zweier Raumvektoren? | ANTWORT: $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$, komponentenweise multiplizieren und addieren.
- FRAGE: Wie lautet die Winkelformel? | ANTWORT: $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ fuer $0 \le \phi \le 180^\circ$.
- FRAGE: Woran erkennt man orthogonale Vektoren? | ANTWORT: Am Wert $\vec{a} \cdot \vec{b} = 0$ bei $\vec{a} \ne \vec{0}$ und $\vec{b} \ne \vec{0}$.

`Klausur-Satz: Produkt null bedeutet rechter Winkel, Produkt ungleich null fuehrt zur Winkelformel.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: Das Skalarprodukt zweier Vektoren sei wieder ein Vektor.
   Korrektur: Das Skalarprodukt ist eine Zahl. Nur das Kreuzprodukt liefert einen Vektor.
   Korrektur-Satz: `Das Skalarprodukt ist ein Skalar, kein Vektor.`
2. Fehlvorstellung: Aus $\vec{a} \cdot \vec{b} = 0$ folge immer Orthogonalitaet, auch beim Nullvektor.
   Korrektur: Der Nullvektor $\vec{0} = (0,0,0)$ erfuellt die Gleichung trivial, definiert aber keinen Winkel; daher beide Vektoren ungleich null voraussetzen.
   Korrektur-Satz: `Der Test a . b = 0 gilt nur fuer Vektoren ungleich null.`

## Schritt 7 — szenario: Klausurtransfer: Vektoren im Raum und Skalarprodukt: Endabnahme I
ROLLE: Du bist Tutor im Mathe-Foerderkurs der EF.
SITUATION: Ein Mitschueler behauptet, die Vektoren $\vec{a} = (1, 1, 1)$ und $\vec{b} = (1, -1, 0)$ seien parallel, weil beide die Laenge $\sqrt{3}$ bzw. $\sqrt{2}$ haetten.
AUFGABE (begruenden, AFB III): Widerlege die Behauptung in einer zusammenhaengenden Darstellung (ca. 150 Woerter), berechne Skalarprodukt und Winkel und erklaere den Unterschied zwischen Betragsgleichheit und Parallelitaet.
RUBRIC (30 XP): Korrektes Skalarprodukt $\vec{a} \cdot \vec{b} = 0$ (10 XP) | Winkel $\phi = 90^\circ$ mit Formel (10 XP) | Begruendung Betrag gegen Richtung (5 XP) | Sprachlich geschlossene Darstellung (5 XP).

`Klausur-Satz: Wer Skalarprodukt berechnet, Winkel bestimmt und Orthogonalitaet begruendet, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Endabnahme I
TAKEAWAY: Rechne komponentenweise, denke geometrisch. Das Skalarprodukt uebersetzt senkrecht in null und spitz oder stumpf in das Vorzeichen von $\cos(\phi)$. Formelanker: $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$ und $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$.

REFLEXION:
1. Welcher Schritt fiel schwerer — das Rechnen mit drei Koordinaten (Schritt 4) oder die Verfahrenswahl in Schritt 5?
2. Plane: Beim naechsten Mal schreibe ich zuerst beide Betraege und das Produkt sauber hin, dann erst den Winkel.

Anekdote (DE): Der Physiker Josiah Willard Gibbs stritt im 19. Jahrhundert mit den Anhaengern der Quaternionen, weil er Vektoren einfacher schreiben wollte. Sein Punkt siegte: Heute rechnet jede Brueckenstatik mit $|\vec{a}|$ und $\vec{a} \cdot \vec{b}$, statt mit vierdimensionalen Zahlentermen.

Bezug: `Gibbs Vektorformat macht Kraefte und Winkel in drei Zeilen berechenbar.`

`Klausur-Satz: Vektoren sind Anweisungen mit Richtung: Erst Betrag, dann Winkel, dann Urteil.`
