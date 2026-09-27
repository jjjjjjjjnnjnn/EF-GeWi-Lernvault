---
fach: SoWi
thema: "Soziale Ungleichheit im Ueberblick"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, SoWi, Ungleichheit]
version: Lesson-v3
---

# Lernreise: Soziale Ungleichheit im Ueberblick (L1, Ziel Klausur)

<!-- Lesson-v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst **soziale Ungleichheit** und **Chancengleichheit** in je einem Satz definieren und Dimensionen korrekt zuordnen.
2. Du kannst $Gini = 0.30$ und $c = 4$ deuten und Bildungstrichter als Herkunftseffekt erklaeren.
3. Du kannst mit dem Kriterium **Chancengerechtigkeit** ein Urteil zu Anreiz und Ausgleich formulieren und mit einem Klausur-Satz schliessen (AFB II/III).

### Hook / Phaenomen

Stell dir vor, zwei Regionen melden denselben Wert von 0,34, doch in der einen Region lebt fast jedes Kind in gesicherter Lage, waehrend in der anderen Region viele Familien trotz Arbeit kaum Miete und Lohn zusammenbringen. Wie kann eine einzige Zahl zwei voellig verschiedene Wirklichkeiten verdecken, und warum klingt die Warnlinie von 0,4 wie ein Naturgesetz, obwohl sie nur eine Konvention der Berichterstattung ist. In dieser Lektion betrachtest du zuerst die Kurve als Bogen der Verteilung, dann rechnest du die Flaeche unter der Kurve mit der Trapezmethode, und erst danach deutest du die Zahl zwischen 0 und 1 am Kriterium der Chancengerechtigkeit. Der Mechanismus aus Sortieren und Messen und Deuten schuetzt dich davor, aus einer Zahl allein ein Urteil ueber Fairness oder Umverteilung abzuleiten.


Ausgangslage aus der Vorlage: Akademikerkind studiert, Arbeiterkind bleibt draussen, obwohl Noten aehneln: Zufall oder Struktur? Bourdieu stieg selbst auf und fragte, warum so wenige folgen. Entscheidet Leistung oder Herkunft ueber Zukunft?

### Fachbegriff & Definition

**Soziale Ungleichheit** meint ungleiche Verteilung von **Einkommen, Bildung und Einfluss** mit Wirkung auf Lebenschancen. **Chancengleichheit** fordert gleiche Startbedingungen, nicht gleiche Ergebnisse. Der **Bildungstrichter** belegt Herkunftseffekt statt Meritokratie. Kurz: Ungleich starten heisst ungleich landen.

### Wirkungsgefuege / Modell

Der Mechanismus laeuft in drei Stufen: **Ressource, Chance, Folge**. Erstens praegt $Kapital = Geld + Bildung + Netz$ die Startposition. Zweitens filtert Schule mit $c = oben/unten = 4$ stark nach Herkunft. Drittens sichert $Gini = 0.30$ mittlere Einkommensspreizung bei ungleicher Bildung. Faellt Ausgleich aus, gilt $Vertrauen = sinkend$ und Demokratie verliert Glauben.

Klausur-Satz: `Soziale Ungleichheit bezeichnet die ungleiche Verteilung von Ressourcen wie Einkommen, Bildung und Einfluss, die Lebenschancen systematisch prägt.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Arm oder ungleich, fair oder verdient: Worte mischen alles. Diese fuenf Begriffe trennen Messen und Werten.

### Fachbegriffe & Definitionen

- **Einkommensdimension:** Die oekonomische Achse mit $Mass = Gini + Quote$. Sie misst $Geld = Verteilung$ zwischen Haushalten.
- **Bildungsdimension:** Die soziale Achse mit $Mass = Trichter + Abschluss$. Sie zeigt $Herkunft = staerkerAlsNote$ als Filter.
- **Armutsgefaehrdung:** Die relative Schwelle mit $Schwelle = 60ProzentMedian$. Sie definiert $Arm = StandardMinus$ als Teilhabe.
- **Meritokratie:** Das Ideal mit $Erfolg = Leistung + Anstrengung$. Es scheitert, wenn $Herkunft > Leistung$ gilt.
- **Kapitalsorten:** Bourdieus Trio mit $Kapital = Geld + Bildung + Netz$. Es erklaert $Chance = Summe$ ueber Generationen.

### Wirkungsgefuege / Modell

Die Begriffe greifen ineinander: **Einkommen** und **Bildung** liefern die Dimensionen $Geld + Wissen$. **Armutsgefaehrdung** markiert mit $60Prozent$ die Grenze relativer Armut. **Meritokratie** liefert das Versprechen $Leistung = Lohn$, **Kapitalsorten** die Kritik $Start = Erbe$. Wer in der Klausur urteilt, muss deshalb immer fragen: Misst du Ergebnis oder Chance?

Punkte-Hinweis: Nenne $Lorenzkurve$ als Bogen und $Gini$ als Zahl mit $Gini = 1 - 2B$; erst Kurvenform plus Kennzahl plus Kriterium gibt volle Punkte.

Klausur-Satz: `Chancengleichheit bedeutet gleiche Startbedingungen, nicht gleiche Ergebnisse — gemessen wird sie am Bildungstrichter und an der Armutsgefaehrdungsquote.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Akademikerkind studiert, Arbeiterkind nicht — Leistung oder Herkunft? Trichter weit oben, eng unten — fairer Wettbewerb oder vererbte Chance?

### Spiel-Aufgabe mit [Werkzeug: gini-allocator]

Oeffne [Werkzeug: gini-allocator]. Ziehe den Bildungs-Regler: Erhoehe die Studierquote der unteren Gruppe schrittweise und beobachte, wie sich Kurve und $Gini$ von $0{,}34$ Richtung $0{,}28$ bewegen. Vergleiche Bildungstrichter gegen Einkommens-$Gini$ und $60ProzentMedian$ als Armuts-Schwelle. Lies Form und Zahl parallel.

### Aha-Moment & Gesetz

Aha-Moment: Herkunft — Form — Urteil. Erstens sortieren Quintile mit $8 + 13 + 17 + 23 + 39$ das Material. Zweitens zeigt der Bogen die Gestalt, $Gini = 1 - 2B$ die Zahl. Drittens urteilt Kriterium Meritokratie: Wenn Herkunft ueber Leistung siegt, bricht Vertrauen. Gesetz: $Gerecht \iff Chance \neq Herkunft$.

```diagram
  Herkunft [Trichter + Quote + $60ProzentMedian$]
  Herkunft -> Kurve [Bogen + $Gini$ + Form]
  Kurve -> Zahl [$B$ + $Gini = 1 - 2B$ + Vergleich]
  Zahl -> Urteil [Meritokratie + Umverteilung]
```

Kausalkette: Quintile kumulieren — Trapez misst $B$ und $Gini = 1 - 2B$ — Deutung an Chancengerechtigkeit; Abgrenzung zu $p_N(q) = p_A(q)$ mit $q_A - q_N$ und zu $U = \sum(Lust - Leid)$ steht vor jedem Urteil.

Klausur-Satz: `Der Bildungstrichter zeigt, dass der Bildungserfolg in Deutschland stark von der sozialen Herkunft abhaengt: Akademikerkinder erreichen deutlich haeufiger die Hochschule als Arbeiterkinder.`

## Anekdote & Fun-Fact

Der französische Soziologe Pierre Bourdieu war selbst ein Aufsteiger: Er wuchs in einfachen Verhältnissen in Südfrankreich auf und schaffte es über das französische Elitebildungssystem bis an die Spitze der Wissenschaft. Genau dieser ungewöhnliche Weg brachte ihn zu der Frage, warum solche Aufstiege so selten sind. Seine Antwort wurde die Theorie der drei Kapitalarten — er hatte am eigenen Leib erlebt, wie stark Bildung, Sprache und Netzwerke über Chancen entscheiden

Bezug zum Konzept: `Das Beispiel zeigt, wie aus Beobachtung ein pruefbares Verfahren mit $x_1$ und $x_2$ entsteht.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Gini-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: gini-allocator]

Ziehe im Tool die Einkommens-Regler der Quintile und beobachte live, wie sich die Lorenzkurve hebt oder senkt und wie $Gini$ zwischen 0 und 1 reagiert; vergleiche zwei Verteilungen, lies $B$ per Trapezmethode ab und deute die Form der Kurve.

AUFGABE Spiel-Raetsel (AFB II): Stelle im Tool zwei Kohorten ein: oben $39$ Prozent, unten $8$ Prozent. Verschiebe drei Punkte von oben nach unten, bis der Trichter sichtbar enger wird. Belege mit $Gini$ und Schwelle $60ProzentMedian$, ob Chancengleichheit naeher rueckt.

HILFE:
1. Schritt 1: Notiere Trichterwerte und Quintile. 2. Schritt 2: Verschiebe Anteile, lies $Gini = 1 - 2B$. 3. Schritt 3: Deute an Meritokratie und formuliere den Klausur-Satz.

MUSTERLOESUNG: Der Trichter belegt Herkunftseffekt; nach Verschiebung sinkt $Gini$ von $0{,}34$ zu $0{,}30$, die Kurve hebt sich. Erst Zahl plus Form plus Schwelle $60ProzentMedian$ begruenden ein meritokratisches Urteil zu Umverteilung.

Klausur-Satz: `Wenn der Bildungserfolg staerker von der Herkunft als von der Leistung abhaengt, widerspricht dies dem meritokratischen Prinzip und untergraebt das Vertrauen in die Demokratie.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens -- (i) Struktur-Verfahren (Klassen, Schichten, Milieus) oder (ii) Chancen-Verfahren ($Gini$, $c = c_{oben} / c_{unten}$, Bildung) -- und loese dann die Aufgabe.

AUFGABE A: Ein Fall verlangt nur eine qualitative Rangfolge ohne Zahlenwert.
AUFGABE B: Ein Fall verlangt einen belegten Vergleich mit Kennzahl und Begruendung.

HILFE: Aufgabe A nennt kein Berechnungsziel, daher Verfahren (i). Aufgabe B verlangt eine Kennzahl wie $Gini$ oder $p_N(q) = p_A(q)$, daher Verfahren (ii). Die Wahl des Verfahrens steht vor jeder Rechnung.

ANTWORT: Aufgabe A erfordert Verfahren (i), weil eine Rangfolge aus der Form genuegt. Aufgabe B erfordert Verfahren (ii), weil erst die Kennzahl mit $d = x_2 - x_1$ ein begruendetes Urteil erlaubt.

Klausur-Satz: `Funktionalistische Ansaetze deuten Ungleichheit als Leistungsanreiz, konflikttheoretische Ansaetze als strukturelle Benachteiligung, die nach Ausgleich verlangt.`

## Schritt 6 — check: Verständnisprüfung

CHECK (drei Fragen mit Antworten):

FRAGE: Welche drei Dimensionen sozialer Ungleichheit unterscheidet der EF-Unterricht? | ANTWORT: Die oekonomische (Einkommen/Vermoegen), die politische (Macht/Einfluss) und die soziale Dimension (Bildung/Netzwerke/Gesundheit).
FRAGE: Wo liegt die Armutsgefaehrdungsschwelle und warum ist das wichtig? | ANTWORT: Sie liegt bei 60 Prozent des Median-Einkommens, nicht des Durchschnitts — Armut ist also relativ zum gesellschaftlichen Standard definiert.
FRAGE: Was belegt der Bildungstrichter? | ANTWORT: Er belegt, dass der Bildungserfolg in Deutschland stark von der Herkunft abhaengt und Chancengleichheit nicht eingeloest ist.

Klausur-Satz: `Die Armutsgefaehrdungsquote misst Armut relativ zum Median-Einkommen und macht sichtbar, dass Armut kein Randproblem, sondern ein strukturelles Merkmal ist.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Die beiden Verfahren seien austauschbar und fuehrten stets zum gleichen Ergebnis.
   Korrektur-Satz: `Verfahren (i) liefert nur eine Rangfolge, Verfahren (ii) liefert eine Kennzahl; beide duerfen nicht gleichgesetzt werden.`

2. Fehlkonzept: Ein einzelner Wert wie $Gini$ oder $p_G$ spreche bereits fuer sich und brauche kein Kriterium.
   Korrektur-Satz: `Erst die Deutung der Kennzahl am Kriterium mit $d = x_2 - x_1$ ergibt ein klausurtaugliches Urteil.`

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist Referent/in bei einer Jugendorganisation und sollst auf einer Podiumsdiskussion die Forderung nach mehr Chancengleichheit im Bildungssystem begruenden.
SITUATION: In deiner Region erreichen Arbeiterkinder nur halb so oft das Abitur wie Akademikerkinder. Ein Teil des Publikums haelt das fuer ein Ergebnis individueller Entscheidungen, ein anderer verlangt staatliche Gegenmassnahmen wie kostenlose Ganztagsbetreuung und ein elternunabhaengiges BAfoeG. Beurteilen Sie in einer zusammenhängenden Stellungnahme (ca. 150 Wörter) die Forderung nach mehr Chancengleichheit.
RUBRIC (30 XP): Darstellung der Ungleichheit mit den drei Dimensionen bzw. Kapitalarten (6 XP) | Analyse des Bildungstrichters — Herkunft wirkt staerker als Leistung (8 XP) | Abwaegung mit Kriterium Chancengerechtigkeit — Pro/Contra staatlicher Gegenmassnahmen (10 XP) | Kriteriengeleitetes Urteil mit konkreter Forderung (6 XP)
SITUATION: In deiner Region erreichen Arbeiterkinder nur halb so oft das Abitur wie Akademikerkinder. Ein Teil des Publikums haelt das fuer ein Ergebnis individueller Entscheidungen, ein anderer verlangt staatliche Gegenmassnahmen wie kostenlose Ganztagsbetreuung und ein elternunabhaengiges BAfoeG. Beurteilen Sie in einer zusammenhängenden Stellungnahme (ca. 150 Wörter) die Forderung nach mehr Chancengleichheit.
RUBRIC (30 XP): Darstellung der Ungleichheit mit den drei Dimensionen bzw. Kapitalarten (6 XP) | Analyse des Bildungstrichters — Herkunft wirkt staerker als Leistung (8 XP) | Abwaegung mit Kriterium Chancengerechtigkeit — Pro/Contra staatlicher Gegenmassnahmen (10 XP) | Kriteriengeleitetes Urteil mit konkreter Forderung (6 XP)
AUFGABE (AFB III): Verfasse eine zusammenhaengende Darstellung von etwa 150 Woertern mit Kriterium, Anwendung und Urteil.
RUBRIC (30 XP): These mit Kriterium (5 XP) | Rekonstruktion mit $x_1$, $x_2$ (10 XP) | Anwendung mit $d = x_2 - x_1$ (10 XP) | Fazit mit Fachbegriffen (5 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY (Kernbotschaft in einem Kasten):

Takeaway-Satz: `Begriff schaerfen, Wahl des Verfahrens treffen, Kennzahl mit $d = x_2 - x_1$ deuten und kriteriengeleitet urteilen.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer -- die Anwendung mit $x_1$ und $x_2$ (Schritt 4) oder die Wahl des Verfahrens (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst das Aufgabenziel und waehle danach Verfahren (i) oder (ii).
