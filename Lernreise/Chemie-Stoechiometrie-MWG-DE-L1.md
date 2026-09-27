---
fach: Chemie
thema: "Stoechiometrie und Massenwirkungsgesetz"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, ueberpruefen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Stoechiometrie]
version: Lesson-v3
---

# Lernreise: Stoechiometrie und Massenwirkungsgesetz (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst jede Mengenaufgabe nach der Regel loesen: erst ausgleichen, dann alles auf $n$ zurueckfuehren ($n = m/M = cV$), dann im Koeffizientenverhaeltnis umsetzen.
2. Du kannst das limitierende Reagenz bestimmen und den theoretischen Ertrag mit der Ausbeute ($Ausbeute = real/theoretisch \cdot 100\,\%$) berechnen — am NCM-Beispiel der Batteriefertigung begruenden, warum das Mischverhaeltnis exakt stimmen muss.
3. Du kannst das Massenwirkungsgesetz $K_c$ aufstellen und damit Gleichgewichte pruefen: $Q < K_c$ laeuft vorwaerts, $Q > K_c$ laeuft rueckwaerts (AFB II).

### Hook / Phaenomen

In der Batteriefabrik zaehlt jedes Prozent Nickel, Kobalt und Mangan: Kippt das Verhaeltnis der NCM-Kathode, bleibt teures Material ungenutzt und die Kapazitaet sinkt — Tonnen Ausschuss aus einem kleinen Dosierfehler. Dahinter steckt dieselbe Regel wie beim Backen: Wer das Rezept halbiert, aber das Mehl vergisst, dessen Kuchen misslingt. Wie rechnet man Gramm, Liter und Teilchen so um, dass kein Partner frueh ausgeht? In der Batteriefabrik zaehlt jedes Prozent: Erst die Gleichung ausgleichen nur ueber Koeffizienten, dann das Verhaeltnis als Stoffmengenverhaeltnis mit n gleich m durch M lesen und mit Einheit kontrollieren. Das MWG mit Q gegen Kc bildet die Wippe dahinter wie bei Le Chatelier mit Drehpunkt Kc. Wer Zaehlen, Umrechnen und Pruefen mit weil und deshalb verbindet, sichert alle Verfahrenspunkte.

### Fachbegriff & Definition

Die **Stoffmenge** $n$ ist die **Sammeleinheit der Teilchen** und der Knoten jeder Rechnung: $n = m/M$ verbindet Masse und Mol, $n = cV$ verbindet Konzentration und Volumen, $N = n \cdot N_A$ verbindet Mol und Teilchenzahl. Erst nach dem **Ausgleichen** — Koeffizienten so waehlen, dass die Atomzahlen beidseitig stimmen — entspricht das **Koeffizientenverhaeltnis dem Molverhaeltnis**. Das **limitierende Reagenz** ist der Reaktant, der im Koeffizientenverhaeltnis zuerst verbraucht ist und den Maximalertrag festlegt; die **Ausbeute** misst realen gegen theoretischen Ertrag in Prozent.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Ausgleichen, Umrechnen, Umsetzen, Pruefen**. Alle Angaben erst auf $n$ zurueckfuehren, dann ueber die Koeffizienten auf das $n$ des Zielstoffs springen, dann in Masse oder Konzentration zurueckrechnen. Fuer jedes Reagenz $n$ durch Koeffizient teilen — der kleinste Quotient limitiert und bestimmt allein den theoretischen Ertrag. Das **Massenwirkungsgesetz** verlaengert denselben Gedanken ins Gleichgewicht: $K_c = \frac{[C]^c \cdot [D]^d}{[A]^a \cdot [B]^b}$ fixiert Produkt durch Edukt als Konstante, der Vergleich von momentanem $Q$ mit $K_c$ verraet die Richtung.

Klausur-Satz: `Erst ausgleichen, dann alles in die Stoffmenge n = m/M = cV umrechnen und schliesslich im Verhaeltnis der Koeffizienten umsetzen.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Zehn Gramm Kalk, ein Ofen, eine Frage: Wie viel Brandkalk entsteht — und was passiert mit dem Gleichgewicht, wenn man das $CO_2$ abpumpt? Zwei Aufgabentypen, ein Knoten: $n$. Diese fuenf Begriffe sichern den Weg von der Waage bis $K_c$.

### Fachbegriffe & Definitionen

- **Stoffmenge $n$:** Sammeleinheit der Teilchen; $n = m/M = cV$ verbindet Masse, Volumen und Gleichung — der zentrale Knoten jeder Rechnung.
- **Ausgleichen:** Koeffizienten so waehlen, dass die Atomzahlen beidseitig stimmen; nur Koeffizienten aendern, niemals Indizes — ihr Verhaeltnis ist Teilchen- und Molverhaeltnis.
- **Limitierendes Reagenz:** Der Reaktant, der im Koeffizientenverhaeltnis zuerst verbraucht ist; man findet ihn ueber $n$ durch Koeffizient — der kleinste Quotient limitiert.
- **Ausbeute:** Realer Ertrag durch theoretischen Ertrag mal hundert Prozent; sie spiegelt Verluste und Nebenreaktionen — etwa $4{,}50/5{,}60 \cdot 100\,\% = 80{,}4\,\%$.
- **Massenwirkungsgesetz:** $K_c$ ist Produktkonzentration hoch Koeffizient durch Eduktkonzentration hoch Koeffizient; Exponenten sind die Ausgleichskoeffizienten, Feststoffe entfallen.

### Wirkungsgefuege / Modell

Die Begriffe bilden eine Rechenstrasse: **Ausgleichen** legt die Spurverhaeltnisse, $n$ ist die Fahrbahn, das **limitierende Reagenz** die kuerzeste Spur, die **Ausbeute** die Abrechnung am Ziel. Wer zwei Nicht-$n$-Groessen direkt verrechnet — etwa Gramm mal Konzentration — verlaesst die Strasse; die Einheit verraet den Fehler sofort. Das MWG prueft danach die Lage: $Q$ gegen $K_c$ entscheidet, ob das System noch laeuft und wohin.

Klausur-Satz: `Die Koeffizienten der ausgeglichenen Gleichung geben das Stoffmengenverhaeltnis vor, K_c prueft die Lage des Gleichgewichts.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Warum liefern $10{,}0\,\mathrm{g}$ Calciumcarbonat nicht beliebig viel $CO_2$, sondern hoechstens $4{,}40\,\mathrm{g}$? Die Koeffizienten sind das Rezept. Wie fuehrt der Dreisatz von $m$ ueber $n$ zum Ziel, und wann greift $Q$ gegen $K_c$ in die Ausbeute ein?

### Spiel-Aufgabe

Spiel-Aufgabe im Kopf-Labor: Erhoehe im Simulator den Druck und die $CO_2$-Abfuhr und beobachte die Verschiebungspfeile nach rechts. Rechne live mit $n = \frac{m}{M}$ und $c = \frac{n}{V}$, notiere $Q$ gegen $K_c$ und Ausbeute in Prozent. Erklaere in einem Satz mit weil, warum Entzug des Produkts die Ausbeute hebt.

### Aha-Moment & Gesetz

Aha-Moment und Gesetz: Die Kausalkette lautet wiegen, umrechnen, vergleichen. Alle Mengen werden erst in $n$ umgerechnet ($n = \frac{m}{M}$, $n = c \cdot V$), dann im Verhaeltnis der Koeffizienten umgesetzt, dann ueber $K_c = \frac{[C]^c \cdot [D]^d}{[A]^a \cdot [B]^b}$ geprueft. Ist $Q < K_c$, laeuft das System nach rechts und erhoeht die Ausbeute. Wer direkt mit Gramm rechnet, verwechselt Masse mit Teilchenzahl.

```diagram
    Beispiel: CaCO3 --> CaO + CO2 (1:1:1)
    m = 10,0 g, M = 100,1 g/mol --> n = 0,100 mol
    Koeffizient 1:1 --> n(CO2) = 0,100 mol --> m = 4,40 g
    CO2-Entzug: Q < Kc --Pfeil rechts--> mehr Umsatz
    Druck hoch bei Gas: Pfeil zur Seite mit weniger Teilchen
    Regel: erst n, dann Verhaeltnis, dann Q gegen Kc.
```

Klausur-Satz: `Alle Mengenangaben werden erst in n umgerechnet, dann im Verhaeltnis der Koeffizienten umgesetzt und zuletzt ueber K_c ueberprueft.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Bei Lithium-Akkus mit NCM-Kathode zaehlt jedes Prozent Nickel, Kobalt und Mangan. Die Fabrik mischt die Metallsalze so genau, dass kein Partner frueh ausgeht, denn der knappste Stoff begrenzt die ganze Charge wie die kuerzeste Daube eines Fasses. Ein kleiner Dosierfehler erzeugt Tonnen teuren Ausschuss, daher prueft das Labor jede Lieferung erst in Mol um und vergleicht dann mit den Koeffizienten der Faellgleichung.

**Bezug zum Konzept**: `Das knappste Reagenz begrenzt den Ertrag wie die kuerzeste Daube das Fass.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Gleichgewichts-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: le-chatelier-sim]

AUFGABE (Spiel-Auftrag, AFB II, 3 Stufen): Stufe 1 Wiegen: $5{,}60\,\mathrm{g}$ $CaO$ entstehen aus $CaCO_3$. Berechne $n$ und $m(CaCO_3)$. Stufe 2 Verschieben: $CO_2$ wird abgepumpt. Sage die Pfeilrichtung mit $Q$ gegen $K_c$ voraus. Stufe 3 Sichern: Nenne die Ausbeute bei $7{,}00\,\mathrm{g}$ Einsatz. Stelle im Gleichgewichts-Labor den Mol-Regler schrittweise hoch und gleichen Druck-Regler an und verfolge Umsatz und Q gegen Kc bis zum Ausgleich.

HILFE:
1. Schritt 1: $n = \frac{m}{M}$ fuer $CaO$ mit $M = 56{,}1$.
2. Schritt 2: Verhaeltnis $1$:$1$ uebertragen.
3. Schritt 3: $Q < K_c$ bedeutet Pfeil rechts.

MUSTERLOESUNG: Aus $n = \frac{m}{M}$ folgt $n(CaO) = \frac{5{,}60}{56{,}1} = 0{,}100\,\mathrm{mol}$; im Verhaeltnis $1$:$1$ gilt $n(CaCO_3) = 0{,}100\,\mathrm{mol}$ und $m = 10{,}0\,\mathrm{g}$. Wird $CO_2$ entzogen, sinkt $Q$ unter $K_c$ und das System laeuft nach rechts, weil es den Mangel ausgleicht. Bei $7{,}00\,\mathrm{g}$ Einsatz und $80{,}4\,\%$ Ausbeute bleiben $5{,}60\,\mathrm{g}$ Produkt.

Klausur-Satz: `Aus n = m/M und dem Koeffizientenverhaeltnis 1:1 folgt m = 5.60 g und eine Ausbeute von 80.4 Prozent; CO2-Entzug verschiebt nach rechts.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle erst das Verfahren — (i) Stoechiometrie-Verfahren ($n$-, $m$-, $c$-, Limit- und Ausbeutefragen nach der Regel erst ausgleichen, auf $n$ zurueckfuehren, im Verhaeltnis umsetzen) oder (ii) MWG-Verfahren ($K_c$ aufstellen, $Q$ berechnen, gegen $K$ vergleichen, Richtung deuten) — dann rechnen.

AUFGABE A: 5.00 g Mg plus 5.00 g O2 reagieren zu MgO (2Mg + O2 -> 2MgO). Gefragt ist die maximale Masse an MgO.
AUFGABE B: Fuer N2 + 3H2 <=> 2NH3 ist K_c = 0.50 gegeben; aktuell gilt [N2] = 1.0, [H2] = 1.0, [NH3] = 1.0 (mol/L). Gefragt ist, in welche Richtung das System laeuft.

HILFE: A nennt Gramm plus Ertragsfrage ohne K, also Verfahren (i) ueber Mol. B nennt K_c plus Momentankonzentrationen, also Verfahren (ii) ueber Q. Faustregel: Gramm, Milliliter, Mol, limitierend und Ausbeute verlangen Stoechiometrie; $K_c$, $Q$, Verschiebung und Gleichgewicht verlangen MWG.

ANTWORT: A erfordert Verfahren (i): n(Mg) = 5.00/24.3 = 0.206 mol, n(O2) = 5.00/32.0 = 0.156 mol; n/Coeff: 0.206/2 = 0.103 gegen 0.156/1 = 0.156, also Mg limitierend; n(MgO) = 0.206 mol ergibt m = 0.206 mal 40.3 = 8.30 g. B erfordert Verfahren (ii): Q = (1.0)^2 / (1.0 mal (1.0)^3) = 1.0; Q = 1.0 ist groesser als K_c = 0.50, daher laeuft das System rueckwaerts nach links.

Klausur-Satz: `Mengenfragen verlangen n und Koeffizientenvergleich, Gleichgewichtsfragen verlangen Q gegen K.`

## Schritt 6 — check: Selbsttest zu Stoechiometrie und Massenwirkungsgesetz
CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet die Merkhilfe der Stoechiometrie und was ist die Drehscheibe n? | ANTWORT: Erst ausgleichen, dann alles in n = m/M = cV umrechnen und im Verhaeltnis der Koeffizienten umsetzen; n verbindet Masse, Volumen und Gleichung.
FRAGE: Wie findet man das limitierende Reagenz und die Ausbeute? | ANTWORT: Fuer jedes Reagenz n durch Koeffizient teilen, der kleinste Wert ist limitierend; Ausbeute = reale Masse durch theoretische Masse mal 100 Prozent.
FRAGE: Wie lautet das MWG und wie deutet man Q gegen K? | ANTWORT: K_c = Produkt hoch Koeffizient durch Edukt hoch Koeffizient; Q kleiner als K laeuft vorwaerts, Q groesser als K laeuft rueckwaerts, Q gleich K ist im Gleichgewicht.

Klausur-Satz: `Mit n als Drehscheibe, Koeffizienten als Verhaeltnis und Q gegen K ist jede EF-Rechnung geschlossen.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Massen liessen sich direkt im Koeffizientenverhaeltnis umrechnen; wer mehr einsetze, erhalte mehr Produkt.
   Korrektur: Koeffizienten gelten nur fuer Stoffmengen, nicht fuer Massen, weil jede Art ihre eigene molare Masse traegt. Erst alle Massen auf $n$ zurueckfuehren, im Verhaeltnis umsetzen, dann in Masse zurueckrechnen; Gramm direkt gegen Koeffizienten zu halten verdreht stets die Limitentscheidung.
   Korrektur-Satz: `Das Koeffizientenverhaeltnis gilt nur fuer Stoffmengen, daher muss jede Masse erst in n umgerechnet werden.`

2. Fehlannahme: Reine Feststoffe gehoerten in den $K_c$-Ausdruck; mehr Konzentration bedeute groesseres $K$.
   Korrektur: Reine Feststoffe und Fluessigkeiten zaehlen als konstant und sind bereits in $K$ eingerechnet; sie entfallen. $K$ haengt nur von der Temperatur ab, nie von Konzentrationen. Geaenderte Konzentrationen aendern nur $Q$, das System stellt $Q = K$ durch Verschiebung wieder her.
   Korrektur-Satz: `Reine Feststoffe erscheinen nicht in K_c, und K_c haengt nur von der Temperatur ab, nicht von den Konzentrationen.`

## Schritt 7 — szenario: Klausurtransfer: Stoechiometrie und Massenwirkungsgesetz
ROLLE: Du bist Praktikant in der Batteriefertigung und pruefst eine NCM-Charge.
SITUATION: Geliefert wurden 10.0 mol Ni-, 10.0 mol Co- und 12.0 mol Mn-Salz fuer eine Faellgleichung mit Koeffizienten 1:1:1 zum NCM-Precursor. Die Schichtleitung fragt, welche Komponente limitiert, wie viel Precursor maximal entsteht und wie das CO2-Abziehen beim Brennen per MWG wirkt. Antworte in einer zusammenhaengenden Darstellung (ca. 150 Woerter).
AUFGABE: Schreibe eine Klausur-Antwort mit n/Coeff-Vergleich, Ertragsrechnung und Q-gegen-K-Urteil.
RUBRIC (30 XP): Korrekter Limit-Nachweis per n durch Koeffizient (10 XP) | Ertrag aus dem knappsten Partner plus Ausbeute-Deutung (10 XP) | MWG-Urteil: Q kleiner als K laeuft zum Produkt (10 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY (Kernzusammenfassung):

Rechenaufgaben folgen der Regel erst ausgleichen, auf $n$ zurueckfuehren, im Koeffizientenverhaeltnis umsetzen: Massen und Volumina werden $n = m/M = cV$, $n$ durch Koeffizient entscheidet das Limit, das Verhaeltnis liefert das Ziel, real durch theoretisch die Ausbeute. Gleichgewichte erhalten eine eigene Zeile $K_c$ aus Produktpotenzen durch Eduktpotenzen; $Q$ gegen $K$ entscheidet die Richtung. Feststoffe entfallen aus $K$, $K$ folgt nur der Temperatur. Die NCM-Mischung ist die industrielle Limitaufgabe: Der knappste Partner stoppt die ganze Linie.
Takeaway-Satz: `Erst ausgleichen, dann in n umrechnen, im Koeffizientenverhaeltnis umsetzen und zuletzt mit Q gegen K ueberpruefen.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Ertragsrechnung mit n und Ausbeute (Schritt 4) oder die Wahl zwischen Stoechiometrie- und MWG-Verfahren (Schritt 5)?
2. Planung: Beim naechsten Mal gleiche ich zuerst aus, rechne alles in n um und frage dann, ob nach Menge oder nach Q gegen K gefragt ist.
