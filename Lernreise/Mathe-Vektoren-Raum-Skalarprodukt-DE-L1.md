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

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst $\vec{a} = (1, 2, 3)$ und $\vec{b} = (4, 0, -1)$ addieren, mit $2$ skalieren und $|\vec{a}| = \sqrt{14}$ berechnen.
2. Du kannst $\vec{a} \cdot \vec{b} = 1$ und $\cos(\phi) = \frac{1}{\sqrt{14}\sqrt{17}}$ zu $\phi \approx 86{,}3^\circ$ bestimmen.
3. Du kannst mit $\vec{a} \cdot \vec{b} = 0$ Orthogonalitaet nachweisen und Gegenbeispiele mit $\ne 0$ einordnen (AFB II).

### Hook / Phaenomen

Ein Drohnenpilot steuert zwei Flugrichtungen und muss wissen, ob sie senkrecht aufeinander stehen oder in spitzem Winkel auseinanderlaufen. Das blosse Auge schaetzt Winkel im Raum notorisch falsch und ein Lineal misst keine Orthogonalitaet. Nimm zwei Vektoren im Raum und entdecke das Skalarprodukt als Winkelmaschine: Ein einziger Zahlenwert verraet Laenge, Richtung und rechten Winkel zugleich. Wer Koordinaten falsch in die Formel einsetzt, verrechnet sich um den ganzen Winkel. Wer Betrag, Produkt und Winkelformel sicher trennt und das Nullkriterium fuer Orthogonalitaet kennt, loest jede Raumgeometrie-Aufgabe und prueft rechte Winkel in einer einzigen Zeile. Der folgende Weg fuehrt vom alltaeglichen Staunen zur exakten Rechnung: erst das Phaenomen beobachten, dann die Begriffe klaeren, schliesslich das Modell pruefen und im Sandbox-Labor selbst entdecken, warum jede Regel genau so und nicht anders funktioniert.

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan gilt der untenstehende Klausur-Satz als verbindliche Definition dieser Lektion. Er fasst das Phaenomen in exakter Fachsprache und bildet die Grundlage fuer jede Deutung.

### Wirkungsgefuege / Modell

Der Mechanismus verbindet Alltag und Formel: Das Phaenomen liefert die Anschauung, die Definition liefert die Sprache und das Wirkungsmodell in Schritt 3 liefert die Kausalkette. Wer alle drei Ebenen verknuepft, beantwortet jede Klausurfrage vollständig.

Klausur-Satz: `Das Skalarprodukt verbindet Laenge und Winkel zweier Vektoren und prueft Orthogonalitaet ueber den Wert null.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Vektor:** Ein Pfeil mit Laenge und Richtung wird durch drei Koordinaten im Raum beschrieben. Mechanismus: Koordinaten als Spalte schreiben und geometrisch als Pfeil deuten. Klausur-Punkt: Schreibweise einhalten und Komponenten exakt uebertragen.
- **Betrag:** Die Laenge $|a|$ folgt per Pythagoras aus den Koordinaten des Vektors. Mechanismus: Quadrate summieren und Wurzel ziehen. Klausur-Punkt: Zwischenschritte zeigen und Einheit falls noetig nennen.
- **Skalarprodukt:** Das Produkt $a \cdot b$ verbindet Laengen und Winkel beider Vektoren. Mechanismus: Koordinatenweise multiplizieren und summieren. Klausur-Punkt: Formel nennen und komponentenweise rechnen.
- **Orthogonalitaet:** Genau bei $a \cdot b = 0$ stehen zwei Vektoren senkrecht aufeinander. Mechanismus: Produkt berechnen und null pruefen. Klausur-Punkt: Nullkriterium nennen und rechten Winkel folgern.
- **Winkelformel:** Der Winkel folgt aus $\cos(\gamma)=(a \cdot b)/(|a||b|)$ per Arkuskosinus. Mechanismus: Produkt und Betraege einsetzen und Rueckrechnung durchfuehren. Klausur-Punkt: Formel vollständig hinschreiben und Winkel in Grad angeben.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

Klausur-Satz: `Betrag und Skalarprodukt folgen direkt aus den Koordinaten der Vektoren.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von den Koordinaten ueber das Produkt zum Winkel: Zuerst berechnet man die Betraege $|a|$ und $|b|$ per Pythagoras, dann bildet man $a \cdot b$ komponentenweise, schliesslich setzt man in $\cos(\gamma)=(a \cdot b)/(|a||b|)$ ein. Gilt $a \cdot b = 0$, so liegt Orthogonalitaet vor und die Winkelformel entfaellt. Jeder Koordinatenfehler verfaelscht Produkt und Winkel zugleich, daher ist exaktes Uebertragen entscheidend.

```diagram
+------------------------------------------+
| a, b als Koordinaten-Spalten             |
|   | Betraege |a|, |b| per Pythagoras    |
|   v                                      |
| a . b = 0 ? -> rechter Winkel, fertig   |
| sonst: cos(gamma) = (a.b)/(|a||b|)      |
+------------------------------------------+
```
Formelkern: $|a|$

Klausur-Satz: `Der Winkel steckt im Skalarprodukt, die Orthogonalitaet im Spezialfall null.`

## Anekdote & Fun-Fact
Der Physiker Josiah Willard Gibbs stritt im 19. Jahrhundert mit den Anhaengern der Quaternionen, weil er Vektoren einfacher schreiben wollte. Sein Punkt siegte: Heute rechnet jede Brueckenstatik mit $|\vec{a}|$ und $\vec{a} \cdot \vec{b}$ statt mit vierdimensionalen Zahlentermen.

Bezug zum Konzept: `Gibbs Vektorformat macht Kraefte und Winkel in drei Zeilen berechenbar.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Vektor-Labor
BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: tangent-slider]

AUFGABE (Levelziel, AFB II): Knacke das Vektor-Level: Ziehe im Sandbox-Slider die Vektorspitze und beobachte, wie sich Skalarprodukt und Winkel live aendern und bei Orthogonalitaet das Produkt null wird. Stelle eine orthogonale Lage und eine spitze Lage ein, lies beide Werte ab und berechne dann exakt per Koordinaten Produkt, Betraege und Winkel. Vergleiche Sandbox und Rechnung.

HILFE:
1. Uebertrage beide Vektoren exakt als Koordinaten und lies im Sandbox-Slider Produkt und Winkel fuer zwei Lagen ab.
2. Berechne $a \cdot b$ komponentenweise und pruefe zuerst das Nullkriterium fuer Orthogonalitaet.
3. Berechne $|a|$ und $|b|$ und wende $\cos(\gamma) = (a \cdot b)/(|a||b|)$ fuer die spitze Lage an.

MUSTERLOESUNG: Sandbox zeigt in orthogonaler Lage $a \cdot b = 0$ bei $\gamma = 90$ Grad und in spitzer Lage ein positives Produkt mit kleinem Winkel. Rechnung $a \cdot b = 0$ bestaetigt Orthogonalitaet in einer Zeile. Fuer die spitze Lage liefern Betraege und Winkelformel denselben Winkel wie die Sandbox. Koordinaten einsetzen, Betraege bilden und Winkelformel anwenden fuehrt in drei Schritten zum Ziel.

Klausur-Satz: `Koordinaten einsetzen, Betraege bilden, Winkelformel anwenden.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Skalarprodukt-Verfahren (Produkt ausrechnen, Winkel oder Orthogonalitaet folgern) oder (ii) Betrags-Verfahren (nur Laengen vergleichen, keine Winkel setzen) > dann loesen.

AUFGABE A: Pruefen Sie, ob $\vec{u} = (1, 2, 2)$ und $\vec{v} = (2, -1, 0)$ orthogonal sind.
AUFGABE B: Bestimmen Sie den Einheitsvektor $\vec{a}_0 = \frac{\vec{a}}{|\vec{a}|}$ zu $\vec{a} = (0, 3, 4)$.

HILFE: Aufgabe A fragt nach senkrecht, daher Verfahren (i) mit $\vec{u} \cdot \vec{v}$. Aufgabe B fragt nur nach Laenge eins, daher Verfahren (ii) mit $|\vec{a}|$.

ANTWORT: A erfordert Verfahren (i): $\vec{u} \cdot \vec{v} = 2 - 2 + 0 = 0$, also orthogonal. B erfordert Verfahren (ii): $|\vec{a}| = 5$, also $\vec{a}_0 = (0, 0{,}6, 0{,}8)$ mit $|\vec{a}_0| = 1$.

Klausur-Satz: `Orthogonalitaet braucht das Produkt, Normierung braucht nur den Betrag.`

## Schritt 6 — check: Selbsttest zu Vektoren im Raum und Skalarprodukt
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

## Schritt 7 — szenario: Klausurtransfer: Vektoren im Raum und Skalarprodukt
ROLLE: Du bist Tutor im Mathe-Foerderkurs der EF.
SITUATION: Ein Mitschueler behauptet, die Vektoren $\vec{a} = (1, 1, 1)$ und $\vec{b} = (1, -1, 0)$ seien parallel, weil beide feste Laengen besitzen.
AUFGABE (begruenden, AFB III): Widerlege die Behauptung in einer zusammenhaengenden Darstellung (circa 150 Woerter), berechne Skalarprodukt und Winkel und erklaere den Unterschied zwischen Betragsgleichheit und Parallelitaet.
RUBRIC (30 XP): Korrektes Skalarprodukt $\vec{a} \cdot \vec{b} = 0$ (10 XP) | Winkel $\phi = 90^\circ$ mit Formel (10 XP) | Begruendung Betrag gegen Richtung (5 XP) | Sprachlich geschlossene Darstellung (5 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion
TAKEAWAY (Kernbotschaft in einem Kasten):

Rechne komponentenweise, denke geometrisch. Das Skalarprodukt uebersetzt senkrecht in null und spitz oder stumpf in das Vorzeichen von $\cos(\phi)$. Formelanker: $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$ und $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$. Gibbs Vektorformat macht Kraefte und Winkel in drei Zeilen berechenbar: erst Betraege, dann Produkt, dann Winkel.

Takeaway-Satz: `Komponentenweise rechnen, geometrisch deuten: Das Skalarprodukt uebersetzt senkrecht in null und Winkel in die Kosinusformel.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Rechnen mit drei Koordinaten (Schritt 4) oder die Verfahrenswahl in Schritt 5?
2. Beim naechsten Mal schreibe ich zuerst beide Betraege und das Produkt sauber hin, dann erst den Winkel.

