---
fach: Mathe
thema: "CN-Training: vier Aufgaben unter Zeitdruck"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, bestimmen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: CN-Training: vier Aufgaben unter Zeitdruck (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst in 60 Minuten vier Aufgaben bearbeiten: Ableitung mit Tangente, Vektor mit Gerade, Baumdiagramm zur Wahrscheinlichkeit und Extremwert mit AM-GM.
2. Du kannst deine Loesung anhand des Erwartungshorizonts (EHZ) bepunkten und Rechenfehler von Konzeptfehlern trennen.
3. Du kannst jede Loesung im Dreischritt Ansatz, Rechnung und Antwortsatz aufschreiben und so die Darstellungspunkte sichern (AFB II/III).

Klausur-Satz: `Jeder Loesungsweg braucht Ansatz, Rechnung und Antwortsatz; ohne Antwortsatz verliert man Darstellungspunkte.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Tangente: $t(x) = f(x_0) + f'(x_0) \cdot (x - x_0)$. Die Gerade durch den Punkt $(x_0, f(x_0))$ mit der Steigung $f'(x_0)$.
- Richtungsvektor: Der Vektor $\vec{u}$ in der Geradengleichung $\vec{x} = \vec{a} + s \cdot \vec{u}$; er legt die Richtung der Geraden fest.
- Punktprobe: Einsetzen eines Punktes in die Geradengleichung; der Punkt liegt genau dann auf der Geraden, wenn ein einziges $s$ alle drei Koordinatengleichungen erfuellt.
- Baumdiagramm: Darstellung eines mehrstufigen Zufallsexperiments; entlang eines Pfades wird multipliziert, ueber Pfade wird addiert.
- Erwartungshorizont (EHZ): Offizieller Bewertungsmassstab; jede Teilleistung erhaelt fest zugeordnete Punkte.

Klausur-Satz: `Die Tangente bei x0 ergibt sich aus dem Punkt (x0 | f(x0)) und der Steigung f'(x0).`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Diese Lektion ist ein Zeit- und Transfertraining. Vier Aufgaben decken die Kernkompetenzen der EF ab: Differenzieren mit Tangente, Vektorrechnung mit Gerade, Wahrscheinlichkeit mit Baumdiagramm und Extremwert mit AM-GM. Die Regel lautet: 60 Minuten Bearbeitung, danach Selbstbewertung nach EHZ-Punkten. Fehler werden sortiert: Ein Rechenfehler laesst sich durch Kontrolle beheben, ein Konzeptfehler verlangt ein erneutes Methodenstudium. Jede Aufgabe folgt dem Dreischritt Ansatz, Rechnung und Antwortsatz.

```diagram
   Aufgabe 1  Funktion: f' > f(x0), f'(x0) > Tangente t(x)
   Aufgabe 2  Vektor: PQ = Q - P > Betrag > Punktprobe (ein s)
   Aufgabe 3  Stochastik: Baum > Pfadprodukt > Summe > Antwortsatz
   Aufgabe 4  Extremum: Positivitaet > AM-GM > Gleichheit > Ableitung
   ===============================================================
   Zeit: 60 min | Struktur je Aufgabe: Ansatz + Rechnung + Antwortsatz
   EHZ-Selbstbewertung: Rechenfehler gegen Konzeptfehler trennen
```

Klausur-Satz: `Die vier Aufgaben pruefen die Kernkompetenzen der EF: Differenzieren, Vektorrechnung, Wahrscheinlichkeit und Extremwertbestimmung.`

## Anekdote & Fun-Fact

Das Wort Klausur kommt vom lateinischen $claustrum$, abgeschlossener Raum. Frueher bezeichnete es einen abgetrennten Bereich im Kloster, spaeter die abgeschlossene Pruefung unter Aufsicht. Auch heute bedeutet Klausur: begrenzte Zeit, keine fremde Hilfe, nur das eigene Wissen. Genau diese Bedingungen simuliert das 60-Minuten-Training.

Bezug zum Konzept: `Eine Klausur ist eine abgeschlossene, zeitlich begrenzte Pruefung; der Zeitmodus trainiert genau diese Situation.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II): Aufgabe 1 (6 BE). Gegeben ist $f(x) = x^3 - 4x^2 + 5x + 1$. a) Berechnen Sie $f'(x)$. b) Bestimmen Sie die Tangente an $f$ bei $x_0 = 2$.

HILFE:
1. Schritt 1: $f'(x)$ gliedweise mit der Potenzregel bilden.
2. Schritt 2: $f(2)$ und $f'(2)$ auswerten (Punkt und Steigung).
3. Schritt 3: Beides in die Punkt-Steigungs-Form $t(x) = f(x_0) + f'(x_0) \cdot (x - x_0)$ einsetzen.

MUSTERLOESUNG: a) Mit der Potenzregel gilt $f'(x) = 3x^2 - 8x + 5$. b) Es ist $f(2) = 8 - 16 + 10 + 1 = 3$ und $f'(2) = 12 - 16 + 5 = 1$. Damit lautet die Tangente $t(x) = 3 + 1 \cdot (x - 2) = x + 1$. Die Tangente beruehrt den Graphen im Punkt $(2, 3)$ mit der Steigung $1$.

EHZ-Punkte (6 BE): $f'(x)$ korrekt (2 BE) | $f(2)$ und $f'(2)$ korrekt (2 BE) | Tangentengleichung mit Ansatz (2 BE).

Klausur-Satz: `Die Tangente bei x0 = 2 lautet t(x) = x + 1, da f(2) = 3 und f'(2) = 1 gilt.`

TRAININGSPACK (drei weitere Aufgaben im Zeitmodus, danach Selbstbewertung nach EHZ):

Aufgabe 2 (Vektor und Geometrie, 6 BE): Gegeben sind $A(1, 0, 0)$ und $B(3, 3, 6)$. a) Geben Sie den Vektor $\overrightarrow{AB}$ an und berechnen Sie $|\overrightarrow{AB}|$. b) Die Gerade $g$ lautet $\vec{x} = (1, 0, 0) + s \cdot (2, 3, 6)$. Pruefen Sie durch eine Punktprobe, ob $C(5, 6, 12)$ auf $g$ liegt.
Loesungsweg: $\overrightarrow{AB} = (3-1, 3-0, 6-0) = (2, 3, 6)$; $|\overrightarrow{AB}| = \sqrt{4 + 9 + 36} = \sqrt{49} = 7$. Probe fuer $C$: $5 = 1 + 2s$ ergibt $s = 2$; $6 = 0 + 3 \cdot 2 = 6$ stimmt; $12 = 0 + 6 \cdot 2 = 12$ stimmt. Also liegt $C$ auf $g$.
EHZ-Punkte: Vektor korrekt (1 BE) | Laenge mit Wurzel (2 BE) | Punktprobe mit gemeinsamem $s$ und Schluss (3 BE).
Transfer-Satz: `Der Punkt C liegt auf g, da ein gemeinsames s = 2 alle drei Koordinatengleichungen erfuellt.`

Aufgabe 3 (Stochastik, 5 BE): Eine Box enthaelt 7 Kugeln: 4 rote und 3 blaue. Es wird zweimal ohne Zuruecklegen gezogen. Bestimmen Sie mit einem Baumdiagramm die Wahrscheinlichkeit, dass beide Kugeln rot sind.
Loesungsweg: Pfad rot-rot: $(4/7) \cdot (3/6) = 12/42 = 2/7$. Den Baum mit vier Pfaden ($RR$, $RB$, $BR$, $BB$) skizzieren und die Stufenwahrscheinlichkeiten entlang des Pfades multiplizieren. Antwort: $P(\text{beide rot}) = 2/7 \approx 0{,}286 = 28{,}6\,\%$.
EHZ-Punkte: Baum korrekt beschriftet (2 BE) | Pfadmultiplikation (2 BE) | Antwortsatz mit Deutung (1 BE).
Transfer-Satz: `Entlang des Pfades multipliziere ich die Stufenwahrscheinlichkeiten, also gilt P(beide rot) = (4/7) * (3/6) = 2/7.`

Aufgabe 4 (Extremwert mit AM-GM, 7 BE): Fuer $x > 0$ sei $A(x) = x + 25/x$. Untersuchen Sie $A$ mit AM-GM auf das Minimum und geben Sie Stelle und Wert an. Bestaetigen Sie das Ergebnis kurz mit $A'(x)$.
Loesungsweg: Da $x > 0$ und $25/x > 0$ gilt: $A(x) \ge 2 \cdot \sqrt{x \cdot 25/x} = 2 \cdot 5 = 10$, Gleichheit fuer $x = 25/x$, also $x = 5$. Probe mit der Ableitung: $A'(x) = 1 - 25/x^2 = 0$ ergibt $x = 5$ (positiv); $A''(x) = 50/x^3 > 0$, also ein Minimum. Es gilt $A(5) = 10$.
EHZ-Punkte: Positivitaet genannt (1 BE) | AM-GM-Abschaetzung (2 BE) | Gleichheitsstelle $x = 5$ (1 BE) | Ableitungs-Bestaetigung (2 BE) | Minimumswert $10$ mit Satz (1 BE).
Transfer-Satz: `Da beide Summanden positiv sind, folgt mit AM-GM A(x) >= 10 mit Gleichheit bei x = 5; die Ableitung bestaetigt dort ein Minimum mit Wert 10.`

Klausur-Satz: `Die vier Aufgaben folgen dem Muster Ansatz, Rechnung und Antwortsatz, wobei jede Aufgabe ihre eigene Kernmethode besitzt.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) AM-GM-Verfahren (Summe positiver Terme mit festem Produkt, Minimum gesucht) oder (ii) Ableitungs-Verfahren (Polynom, Monotonie und Extrema ueber Ableitung mit Vorzeichentabelle) > dann rechnen.

AUFGABE A: Fuer $x > 0$ ist $A(x) = x + 25/x$ gegeben. Bestimmen Sie den minimalen Wert.
AUFGABE B: Gegeben ist $g(x) = x^3 - 4x^2 + 5x + 1$. Bestimmen Sie die lokalen Extremstellen.

HILFE: Aufgabe A ist eine Summe zweier positiver Terme mit festem Produkt, daher Verfahren (i) mit AM-GM. Aufgabe B ist ein Polynom, daher Verfahren (ii) mit Ableitung und Vorzeichentabelle.

ANTWORT: A erfordert Verfahren (i): $A(x) \ge 2 \cdot \sqrt{25} = 10$, Gleichheit fuer $x = 5$, also Minimum $10$ an der Stelle $x = 5$. B erfordert Verfahren (ii): $g'(x) = 3x^2 - 8x + 5 = 0$ ergibt $x = 1$ und $x = 5/3$; mit $g''(x) = 6x - 8$ folgt $g''(1) = -2 < 0$ (Hochpunkt) und $g''(5/3) = 2 > 0$ (Tiefpunkt).

Klausur-Satz: `Fuer Summen positiver Terme mit festem Produkt nutzt man AM-GM, fuer Polynome das Ableitungsverfahren mit Vorzeichentabelle.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die Punkt-Steigungs-Form der Tangente an der Stelle $x_0$? | ANTWORT: $t(x) = f(x_0) + f'(x_0) \cdot (x - x_0)$.
FRAGE: Woran erkennt man bei einer Punktprobe, dass ein Punkt auf einer Geraden liegt? | ANTWORT: Daran, dass ein einziger Parameter $s$ alle drei Koordinatengleichungen erfuellt.
FRAGE: Welche zwei Bedingungen braucht AM-GM, um ein Minimum zu bestimmen? | ANTWORT: Positivitaet beider Terme und ein festes Produkt; der Wert liegt an der Gleichheitsstelle.

Klausur-Satz: `Ansatz, Rechnung und Antwortsatz gehoeren zu jeder Aufgabe; AM-GM verlangt Positivitaet und die Gleichheitsbedingung.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Die Tangentengleichung laesst sich aus $y = mx + b$ durch Raten des Achsenabschnitts bestimmen.
   Korrektur-Satz: `Die Tangente wird mit der Punkt-Steigungs-Form aus f(x0) und f'(x0) bestimmt, nicht durch Raten des Achsenabschnitts.`
2. Fehlkonzept: Beim Ziehen ohne Zuruecklegen bleiben die Wahrscheinlichkeiten der zweiten Stufe unveraendert.
   Korrektur-Satz: `Beim Ziehen ohne Zuruecklegen verringern sich Zaehler und Nenner jeweils um eins.`

## Schritt 7 — szenario

ROLLE: Du bist Lerncoach und wertest die Ergebnisse des 60-Minuten-Trainings aus.
SITUATION: Ein Schueler hat alle vier Aufgaben bearbeitet, aber bei Aufgabe 2 nur den Vektor angegeben, bei Aufgabe 3 die zweite Wahrscheinlichkeit als $4/7$ geschrieben und bei Aufgabe 4 das Ergebnis ohne Gleichheitsbedingung gelassen. Beurteile seine Leistung in einer zusammenhaengenden Darstellung (circa 150 Woerter), ordne die Fehler nach EHZ-Punkten ein und unterscheide Rechenfehler von Konzeptfehlern.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Fehlerzuordnung, Analyse und Lernempfehlung.
RUBRIC (30 XP): Zuordnung der Fehler zu den EHZ-Punkten (5 XP) | Analyse Aufgabe 2: fehlender Nachweis der Laenge und Punktprobe (10 XP) | Analyse Aufgabe 3 und 4: Konzeptfehler ohne Zuruecklegen beziehungsweise fehlende Gleichheitsbedingung (10 XP) | Fazit mit Lernempfehlung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Die vier Aufgaben bilden eine Transferkette: Ableitung liefert die Steigung, der Vektor verlangt einen gemeinsamen Parameter, die Wahrscheinlichkeit multipliziert entlang des Pfades, der Extremwert verlangt zuerst den Positivitaetsnachweis und dann AM-GM mit Ableitungsprobe. Jede Aufgabe folgt dem Dreischritt Ansatz, Rechnung und Antwortsatz; die EHZ-Selbstbewertung trennt Rechenfehler von Konzeptfehlern.

Takeaway-Satz: `Ansatz, Rechnung und Antwortsatz gehoeren zu jeder Aufgabe; die EHZ-Selbstbewertung trennt Rechenfehler von Konzeptfehlern.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: die Tangente in Aufgabe 1 (Schritt 4) oder die Wahl zwischen AM-GM und Ableitung in Aufgabe 4 (Schritt 5)?
2. Beim naechsten Mal pruefe ich bei jeder Aufgabe zuerst die Bedingung der Methode (Positivitaet, kein Zuruecklegen, gemeinsames $s$) und erst danach rechne ich.
