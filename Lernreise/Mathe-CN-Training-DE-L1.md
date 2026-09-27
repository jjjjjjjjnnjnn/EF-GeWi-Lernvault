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

<!-- Campaign: Optimierung | Episode 5/33 | Krise: Tunnel-Bohrprofil weicht 42 cm ab | Target: x0 = 2, h = 0.6, Target m = 4.85 | Tool: formula -->

## Schritt 1 — entdecken: Nachtschicht im Rechenzentrum
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst in $60$ Minuten vier Aufgaben takten: Tangente mit $t(x) = f(x_0)+f'(x_0)(x-x_0)$, Gerade mit $\vec{x} = \vec{a}+s\vec{u}$, Baum mit Pfadprodukt, Extremum mit AM-GM.
2. Du kannst per EHZ bepunktet selbst korrigieren: $t(x) = x+1$ an $x_0 = 2$ aus $f(2) = 3$, $f'(2) = 1$ pruefen und Rechen- gegen Konzeptfehler trennen.
3. Du kannst jeden Weg in Ansatz, Rechnung und Antwortsatz schreiben und so Darstellungspunkte sichern (AFB II/III).

###

### Hook / Phaenomen

【首席算法官·第5集/共33集】警报：Tunnel-Bohrprofil weicht 42 cm ab。首席算法官下令：“x0 = 2, h = 0.6, Target m = 4.85！”全场红灯闪烁。上一集（Mathe-CN-Formeln-L1.md）的伏笔在此引爆，下一集（Mathe-CN-Training-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 5 von 33): Super-Engineering-Zentrale, Tunnel-Bohrprofil weicht 42 cm ab. Der Chief Algorithm Officer ruft: x0 = 2, h = 0.6, Target m = 4.85, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet CN-Training: vier Aufgaben unter Zeitdruck ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-CN-Formeln-L1.md) legte die Spur, das naechste Audit (Mathe-CN-Training-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Vier Aufgaben, vier Sprachen: Ableitung, Vektor, Baum, Extremum. Wer sie mit einer Methode angeht, scheitert dreimal. Welche fuenf Werkzeuge schalten in Sekunden auf die richtige Sprache um?

### Fachbegriffe & Definitionen

- **Tangente: (切线)** $t(x) = f(x_0)+f'(x_0)(x-x_0)$; Gerade durch $(x_0, f(x_0))$ mit $f'(x_0)$.
- **Richtungsvektor: (方向向量)** $\vec{u}$ in $\vec{x} = \vec{a}+s\vec{u}$; er legt die Richtung der Geraden fest.
- **Punktprobe: (点检验)** Einsetzen in die Gerade; genau ein $s$ fuer alle drei Zeilen bedeutet Treffer.
- **Baumdiagramm: (树图)** Mehrstufiges Experiment; entlang Pfad multiplizieren, ueber Pfade addieren.
- **Erwartungshorizont (EHZ): (评分标准)** Offizieller Massstab; jede Teilleistung traegt feste Punkte.

### Wirkungsgefuege / Modell

Die Kette ordnet Aufgabe und Werkzeug: $f$ und $f'$ zu Tangente $t(x) = x+1$; $\vec{a}$ und $\vec{u}$ zu Gerade plus Probe; Stufen zu Baum mit $P =$ Pfadprodukt; Positivitaet zu AM-GM $\frac{a+b}{2} \ge \sqrt{ab}$. Der EHZ bepunktet jeden Schritt einzeln — ein falsches Endergebnis mit richtigem Ansatz rettet Teilpunkte, ein richtiges Ergebnis ohne Ansatz verliert sie.

Klausur-Satz: `Die Tangente bei x0 ergibt sich aus dem Punkt (x0 | f(x0)) und der Steigung f'(x0).`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter CN-Training: vier Aufgaben unter Zeitdruck
EXPERIMENTELLE ERKUNDUNG (PhET Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Vier Aufgaben in zwanzig Minuten wirken unmoeglich, doch jede prueft nur eine Kernidee. Intuitiv bleibt man an der schwersten haengen, doch die Punkte liegen in der Reihenfolge. Warum sichern Differenzieren, Vektoren, Wahrscheinlichkeit und Extremwert zusammen die EF?

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox und starte den Timer $20$ Minuten fuer vier Stationen. Ziehe den Slider Fokus von Station zu Station und beobachte die Tangente $t(x) = x+1$ bei $x_0 = 2$ mit $f(2) = 3$ und $f'(2) = 1$. Sammle pro Station die Anzeige korrekt und notiere die Zeit.

### Aha-Moment & Gesetz

Die Kette lautet Ableitung gegen Geometrie gegen Zufall gegen Optimum: $t(x) = f(x_0)+f'(x_0)(x-x_0)$ plus Betrag plus Pfadregel plus $f' = 0$ mit Rand. Handschriftlich gilt $t(x) = 3+1(x-2) = x+1$ aus $f(2) = 3$ und $f'(2) = 1$. Jede Station nutzt dieselbe Ordnung Achsen plus Bedingung plus Ansatz plus Einheit plus Urteil. Wer die Ordnung haelt, haelt die Zeit.

```diagram
  Station 1 2 3 4 > 20 Minuten
  +--------------------------> Zeit
  t(x)=x+1 bei x0=2 f=3 f prime =1
  Vektor Betrag | Pfad mal | Max Rand
  Ordnung Achsen Ansatz Einheit Urteil
```

Klausur-Satz: `Die vier Aufgaben pruefen die Kernkompetenzen der EF: Differenzieren, Vektorrechnung, Wahrscheinlichkeit und Extremwertbestimmung.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

Das Wort Klausur kommt vom lateinischen $claustrum$, abgeschlossener Raum. Frueher bezeichnete es einen abgetrennten Bereich im Kloster, spaeter die abgeschlossene Pruefung unter Aufsicht. Auch heute bedeutet Klausur: begrenzte Zeit, keine fremde Hilfe, nur das eigene Wissen. Genau diese Bedingungen simuliert das 60-Minuten-Training.

Bezug zum Konzept: `Eine Klausur ist eine abgeschlossene, zeitlich begrenzte Pruefung; der Zeitmodus trainiert genau diese Situation.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Nachtschicht im Rechenzentrum
Kontinuitaet: Vorher Mathe-CN-Formeln-L1.md | Nachher Mathe-CN-Training-L1.md. Krise dieser Episode: Tunnel-Bohrprofil weicht 42 cm ab. Target: x0 = 2, h = 0.6, Target m = 4.85.

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: formula]

AUFGABE (Levelziel, AFB II): Schaffe alle vier Stationen: Stelle in der Sandbox (tangent-slider) $x_0 = 2$ ein, ziehe den Slider h von 1,0 bis 0,1 und bestaetige $t(x) = x+1$ bei $x_0 = 2$, und berechne dann die Tangente aus $f(2) = 3$ und $f'(2) = 1$ schriftlich. Skizziere den Zeitplan fuer die anderen drei Stationen.

HILFE:
1. Lies in der Sandbox $f(2) = 3$ und $f'(2) = 1$ ab und notiere die Tangentenformel $t(x) = f(x_0)+f'(x_0)(x-x_0)$.
2. Setze ein zu $t(x) = 3+1(x-2) = x+1$.
3. Verteile $20$ Minuten auf vier Stationen mit je Ansatz plus Einheit plus Urteil.

MUSTERLOESUNG: Sandbox $t(x) = x+1$ bestaetigt. Rechnung $t(x) = f(2)+f'(2)(x-2) = 3+1(x-2) = x+1$ mit $f(2) = 3$ und $f'(2) = 1$. Zeitplan $5$ Minuten je Station Differenzieren, Vektorrechnung, Wahrscheinlichkeit und Extremwert mit derselben Ordnung Achsen plus Bedingung plus Ansatz plus Einheit plus Urteil. Alle vier Kernkompetenzen sind damit unter Zeitdruck abgedeckt.

Klausur-Satz: `Die Tangente bei x0 = 2 lautet t(x) = x + 1, da f(2) = 3 und f'(2) = 1 gilt.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Nachtschicht im Rechenzentrum
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) AM-GM-Verfahren (Summe positiver Terme mit festem Produkt, Minimum gesucht) oder (ii) Ableitungs-Verfahren (Polynom, Monotonie und Extrema ueber Ableitung mit Vorzeichentabelle) > dann rechnen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Fuer $x > 0$ ist $A(x) = x + 25/x$ gegeben. Bestimmen Sie den minimalen Wert.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Gegeben ist $g(x) = x^3 - 4x^2 + 5x + 1$. Bestimmen Sie die lokalen Extremstellen.

HILFE: Aufgabe A ist eine Summe zweier positiver Terme mit festem Produkt, daher Verfahren (i) mit AM-GM. Aufgabe B ist ein Polynom, daher Verfahren (ii) mit Ableitung und Vorzeichentabelle.

ANTWORT: A erfordert Verfahren (i): $A(x) \ge 2 \cdot \sqrt{25} = 10$, Gleichheit fuer $x = 5$, also Minimum $10$ an der Stelle $x = 5$. B erfordert Verfahren (ii): $g'(x) = 3x^2 - 8x + 5 = 0$ ergibt $x = 1$ und $x = 5/3$; mit $g''(x) = 6x - 8$ folgt $g''(1) = -2 < 0$ (Hochpunkt) und $g''(5/3) = 2 > 0$ (Tiefpunkt).

Klausur-Satz: `Fuer Summen positiver Terme mit festem Produkt nutzt man AM-GM, fuer Polynome das Ableitungsverfahren mit Vorzeichentabelle.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu CN-Training: vier Aufgaben unter Zeitdruck: Nachtschicht im Rechenzentrum
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die Punkt-Steigungs-Form der Tangente an der Stelle $x_0$? | ANTWORT: $t(x) = f(x_0) + f'(x_0) \cdot (x - x_0)$.
FRAGE: Woran erkennt man bei einer Punktprobe, dass ein Punkt auf einer Geraden liegt? | ANTWORT: Daran, dass ein einziger Parameter $s$ alle drei Koordinatengleichungen erfuellt.
FRAGE: Welche zwei Bedingungen braucht AM-GM, um ein Minimum zu bestimmen? | ANTWORT: Positivitaet beider Terme und ein festes Produkt; der Wert liegt an der Gleichheitsstelle.

Klausur-Satz: `Ansatz, Rechnung und Antwortsatz gehoeren zu jeder Aufgabe; AM-GM verlangt Positivitaet und die Gleichheitsbedingung.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Die Tangentengleichung laesst sich aus $y = mx + b$ durch Raten des Achsenabschnitts bestimmen.
   Korrektur-Satz: `Die Tangente wird mit der Punkt-Steigungs-Form aus f(x0) und f'(x0) bestimmt, nicht durch Raten des Achsenabschnitts.`
2. Fehlkonzept: Beim Ziehen ohne Zuruecklegen bleiben die Wahrscheinlichkeiten der zweiten Stufe unveraendert.
   Korrektur-Satz: `Beim Ziehen ohne Zuruecklegen verringern sich Zaehler und Nenner jeweils um eins.`

## Schritt 7 — szenario: Klausurtransfer: CN-Training: vier Aufgaben unter Zeitdruck: Nachtschicht im Rechenzentrum
ROLLE: Du bist Lerncoach und wertest die Ergebnisse des 60-Minuten-Trainings aus.
SITUATION: Ein Schueler hat alle vier Aufgaben bearbeitet, aber bei Aufgabe 2 nur den Vektor angegeben, bei Aufgabe 3 die zweite Wahrscheinlichkeit als $4/7$ geschrieben und bei Aufgabe 4 das Ergebnis ohne Gleichheitsbedingung gelassen. Beurteile seine Leistung in einer zusammenhaengenden Darstellung (circa 150 Woerter), ordne die Fehler nach EHZ-Punkten ein und unterscheide Rechenfehler von Konzeptfehlern.
AUFGABE (begruenden, AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Fehlerzuordnung, Analyse und Lernempfehlung.
RUBRIC (30 XP): Zuordnung der Fehler zu den EHZ-Punkten (5 XP) | Analyse Aufgabe 2: fehlender Nachweis der Laenge und Punktprobe (10 XP) | Analyse Aufgabe 3 und 4: Konzeptfehler ohne Zuruecklegen beziehungsweise fehlende Gleichheitsbedingung (10 XP) | Fazit mit Lernempfehlung (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Nachtschicht im Rechenzentrum
TAKEAWAY (Kernbotschaft in einem Kasten):

Die vier Aufgaben bilden eine Transferkette: Ableitung liefert die Steigung, der Vektor verlangt einen gemeinsamen Parameter, die Wahrscheinlichkeit multipliziert entlang des Pfades, der Extremwert verlangt zuerst den Positivitaetsnachweis und dann AM-GM mit Ableitungsprobe. Jede Aufgabe folgt dem Dreischritt Ansatz, Rechnung und Antwortsatz; die EHZ-Selbstbewertung trennt Rechenfehler von Konzeptfehlern.

Takeaway-Satz: `Ansatz, Rechnung und Antwortsatz gehoeren zu jeder Aufgabe; die EHZ-Selbstbewertung trennt Rechenfehler von Konzeptfehlern.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: die Tangente in Aufgabe 1 (Schritt 4) oder die Wahl zwischen AM-GM und Ableitung in Aufgabe 4 (Schritt 5)?
2. Beim naechsten Mal pruefe ich bei jeder Aufgabe zuerst die Bedingung der Methode (Positivitaet, kein Zuruecklegen, gemeinsames $s$) und erst danach rechne ich.

`Klausur-Satz: Siehe Schritt-Inhalt.`
