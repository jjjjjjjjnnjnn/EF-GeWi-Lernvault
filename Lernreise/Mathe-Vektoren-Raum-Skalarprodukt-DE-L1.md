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

<!-- Campaign: Optimierung | Episode 30/33 | Krise: Brueckenpfeiler-Setzung 9 mm | Target: x0 = 2, h = 0.7, Target m = 14.10 | Tool: formula -->

## Schritt 1 — entdecken: Reserve-Protokoll
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst $\vec{a} = (1, 2, 3)$ und $\vec{b} = (4, 0, -1)$ addieren, mit $2$ skalieren und $|\vec{a}| = \sqrt{14}$ berechnen.
2. Du kannst $\vec{a} \cdot \vec{b} = 1$ und $\cos(\phi) = \frac{1}{\sqrt{14}\sqrt{17}}$ zu $\phi \approx 86{,}3^\circ$ bestimmen.
3. Du kannst mit $\vec{a} \cdot \vec{b} = 0$ Orthogonalitaet nachweisen und Gegenbeispiele mit $\ne 0$ einordnen (AFB II).

###

### Hook / Phaenomen

Hook / Phaenomen (CAO-Log, Episode 30 von 33): Super-Engineering-Zentrale, Brueckenpfeiler-Setzung 9 mm. Der Chief Algorithm Officer ruft: x0 = 2, h = 0.7, Target m = 14.10, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Vektoren im Raum und Skalarprodukt ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Vektoren-Raum-Skalarprodukt-CN-L1.md) legte die Spur, das naechste Audit (Mathe-Vektoren-Raum-Skalarprodukt-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
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

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Vektoren im Raum und Skalarprodukt
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

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact
Der Physiker Josiah Willard Gibbs stritt im 19. Jahrhundert mit den Anhaengern der Quaternionen, weil er Vektoren einfacher schreiben wollte. Sein Punkt siegte: Heute rechnet jede Brueckenstatik mit $|\vec{a}|$ und $\vec{a} \cdot \vec{b}$ statt mit vierdimensionalen Zahlentermen.

Bezug zum Konzept: `Gibbs Vektorformat macht Kraefte und Winkel in drei Zeilen berechenbar.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Reserve-Protokoll
Kontinuitaet: Vorher Mathe-Vektoren-Raum-Skalarprodukt-CN-L1.md | Nachher Mathe-Vektoren-Raum-Skalarprodukt-L1.md. Krise dieser Episode: Brueckenpfeiler-Setzung 9 mm. Target: x0 = 2, h = 0.7, Target m = 14.10.

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: formula]

AUFGABE (Levelziel, AFB II): Knacke das Vektor-Level: Ziehe im Sandbox-Slider die Vektorspitze und beobachte, wie sich Skalarprodukt und Winkel live aendern und bei Orthogonalitaet das Produkt null wird. Stelle eine orthogonale Lage und eine spitze Lage ein, lies beide Werte ab und berechne dann exakt per Koordinaten Produkt, Betraege und Winkel. Vergleiche Sandbox und Rechnung.

HILFE:
1. Uebertrage beide Vektoren exakt als Koordinaten und lies im Sandbox-Slider Produkt und Winkel fuer zwei Lagen ab.
2. Berechne $a \cdot b$ komponentenweise und pruefe zuerst das Nullkriterium fuer Orthogonalitaet.
3. Berechne $|a|$ und $|b|$ und wende $\cos(\gamma) = (a \cdot b)/(|a||b|)$ fuer die spitze Lage an.

MUSTERLOESUNG: Sandbox zeigt in orthogonaler Lage $a \cdot b = 0$ bei $\gamma = 90$ Grad und in spitzer Lage ein positives Produkt mit kleinem Winkel. Rechnung $a \cdot b = 0$ bestaetigt Orthogonalitaet in einer Zeile. Fuer die spitze Lage liefern Betraege und Winkelformel denselben Winkel wie die Sandbox. Koordinaten einsetzen, Betraege bilden und Winkelformel anwenden fuehrt in drei Schritten zum Ziel.

Klausur-Satz: `Koordinaten einsetzen, Betraege bilden, Winkelformel anwenden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Reserve-Protokoll
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Skalarprodukt-Verfahren (Produkt ausrechnen, Winkel oder Orthogonalitaet folgern) oder (ii) Betrags-Verfahren (nur Laengen vergleichen, keine Winkel setzen) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Pruefen Sie, ob $\vec{u} = (1, 2, 2)$ und $\vec{v} = (2, -1, 0)$ orthogonal sind.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Bestimmen Sie den Einheitsvektor $\vec{a}_0 = \frac{\vec{a}}{|\vec{a}|}$ zu $\vec{a} = (0, 3, 4)$.

HILFE: Aufgabe A fragt nach senkrecht, daher Verfahren (i) mit $\vec{u} \cdot \vec{v}$. Aufgabe B fragt nur nach Laenge eins, daher Verfahren (ii) mit $|\vec{a}|$.

ANTWORT: A erfordert Verfahren (i): $\vec{u} \cdot \vec{v} = 2 - 2 + 0 = 0$, also orthogonal. B erfordert Verfahren (ii): $|\vec{a}| = 5$, also $\vec{a}_0 = (0, 0{,}6, 0{,}8)$ mit $|\vec{a}_0| = 1$.

Klausur-Satz: `Orthogonalitaet braucht das Produkt, Normierung braucht nur den Betrag.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Vektoren im Raum und Skalarprodukt: Reserve-Protokoll
CHECK (drei Fragen mit Antworten):

FRAGE: Wie berechnet man das Skalarprodukt zweier Raumvektoren? | ANTWORT: $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$, komponentenweise multiplizieren und addieren.
FRAGE: Wie lautet die Winkelformel? | ANTWORT: $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$ fuer $0 \le \phi \le 180^\circ$.
FRAGE: Woran erkennt man orthogonale Vektoren? | ANTWORT: Am Wert $\vec{a} \cdot \vec{b} = 0$ bei $\vec{a} \ne \vec{0}$ und $\vec{b} \ne \vec{0}$.

Klausur-Satz: `Produkt null bedeutet rechter Winkel, Produkt ungleich null fuehrt zur Winkelformel.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Das Skalarprodukt zweier Vektoren ist wieder ein Vektor.
   Korrektur-Satz: `Das Skalarprodukt ist ein Skalar, kein Vektor.`
2. Fehlkonzept: Aus $\vec{a} \cdot \vec{b} = 0$ folgt stets Orthogonalitaet, auch beim Nullvektor.
   Korrektur-Satz: `Der Test a . b = 0 gilt nur fuer Vektoren ungleich null.`

## Schritt 7 — szenario: Klausurtransfer: Vektoren im Raum und Skalarprodukt: Reserve-Protokoll
ROLLE: Du bist Tutor im Mathe-Foerderkurs der EF.
SITUATION: Ein Mitschueler behauptet, die Vektoren $\vec{a} = (1, 1, 1)$ und $\vec{b} = (1, -1, 0)$ seien parallel, weil beide feste Laengen besitzen.
AUFGABE (begruenden, AFB III): Widerlege die Behauptung in einer zusammenhaengenden Darstellung (circa 150 Woerter), berechne Skalarprodukt und Winkel und erklaere den Unterschied zwischen Betragsgleichheit und Parallelitaet.
RUBRIC (30 XP): Korrektes Skalarprodukt $\vec{a} \cdot \vec{b} = 0$ (10 XP) | Winkel $\phi = 90^\circ$ mit Formel (10 XP) | Begruendung Betrag gegen Richtung (5 XP) | Sprachlich geschlossene Darstellung (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Reserve-Protokoll
TAKEAWAY (Kernbotschaft in einem Kasten):

Rechne komponentenweise, denke geometrisch. Das Skalarprodukt uebersetzt senkrecht in null und spitz oder stumpf in das Vorzeichen von $\cos(\phi)$. Formelanker: $\vec{a} \cdot \vec{b} = a_1b_1 + a_2b_2 + a_3b_3$ und $\cos(\phi) = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| \cdot |\vec{b}|}$. Gibbs Vektorformat macht Kraefte und Winkel in drei Zeilen berechenbar: erst Betraege, dann Produkt, dann Winkel.

Takeaway-Satz: `Komponentenweise rechnen, geometrisch deuten: Das Skalarprodukt uebersetzt senkrecht in null und Winkel in die Kosinusformel.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Rechnen mit drei Koordinaten (Schritt 4) oder die Verfahrenswahl in Schritt 5?
2. Beim naechsten Mal schreibe ich zuerst beide Betraege und das Produkt sauber hin, dann erst den Winkel.

`Klausur-Satz: Siehe Schritt-Inhalt.`
