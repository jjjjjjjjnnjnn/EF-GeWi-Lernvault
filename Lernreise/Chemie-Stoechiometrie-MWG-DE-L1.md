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

## Schritt 1 — entdecken
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst jede Mengenaufgabe nach der Regel loesen: erst ausgleichen, dann alles auf $n$ zurueckfuehren ($n = m/M = cV$), dann im Koeffizientenverhaeltnis umsetzen.
2. Du kannst das limitierende Reagenz bestimmen und den theoretischen Ertrag mit der Ausbeute ($Ausbeute = real/theoretisch \cdot 100\,\%$) berechnen — am NCM-Beispiel der Batteriefertigung begruenden, warum das Mischverhaeltnis exakt stimmen muss.
3. Du kannst das Massenwirkungsgesetz $K_c$ aufstellen und damit Gleichgewichte pruefen: $Q < K_c$ laeuft vorwaerts, $Q > K_c$ laeuft rueckwaerts (AFB II).

### Hook / Phaenomen

In der Batteriefabrik zaehlt jedes Prozent Nickel, Kobalt und Mangan: Kippt das Verhaeltnis der NCM-Kathode, bleibt teures Material ungenutzt und die Kapazitaet sinkt — Tonnen Ausschuss aus einem kleinen Dosierfehler. Dahinter steckt dieselbe Regel wie beim Backen: Wer das Rezept halbiert, aber das Mehl vergisst, dessen Kuchen misslingt. Wie rechnet man Gramm, Liter und Teilchen so um, dass kein Partner frueh ausgeht?

### Fachbegriff & Definition

Die **Stoffmenge** $n$ ist die **Sammeleinheit der Teilchen** und der Knoten jeder Rechnung: $n = m/M$ verbindet Masse und Mol, $n = cV$ verbindet Konzentration und Volumen, $N = n \cdot N_A$ verbindet Mol und Teilchenzahl. Erst nach dem **Ausgleichen** — Koeffizienten so waehlen, dass die Atomzahlen beidseitig stimmen — entspricht das **Koeffizientenverhaeltnis dem Molverhaeltnis**. Das **limitierende Reagenz** ist der Reaktant, der im Koeffizientenverhaeltnis zuerst verbraucht ist und den Maximalertrag festlegt; die **Ausbeute** misst realen gegen theoretischen Ertrag in Prozent.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Ausgleichen, Umrechnen, Umsetzen, Pruefen**. Alle Angaben erst auf $n$ zurueckfuehren, dann ueber die Koeffizienten auf das $n$ des Zielstoffs springen, dann in Masse oder Konzentration zurueckrechnen. Fuer jedes Reagenz $n$ durch Koeffizient teilen — der kleinste Quotient limitiert und bestimmt allein den theoretischen Ertrag. Das **Massenwirkungsgesetz** verlaengert denselben Gedanken ins Gleichgewicht: $K_c = \frac{[C]^c \cdot [D]^d}{[A]^a \cdot [B]^b}$ fixiert Produkt durch Edukt als Konstante, der Vergleich von momentanem $Q$ mit $K_c$ verraet die Richtung.

Klausur-Satz: `Erst ausgleichen, dann alles in die Stoffmenge n = m/M = cV umrechnen und schliesslich im Verhaeltnis der Koeffizienten umsetzen.`

## Schritt 2 — entdecken
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

## Schritt 3 — entdecken
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Aus $10{,}0\,\mathrm{g}$ Kalkstein werden im Ofen $5{,}60\,\mathrm{g}$ Brandkalk — theoretisch. Real sind es $4{,}50\,\mathrm{g}$. Wo bleiben $1{,}10\,\mathrm{g}$, und warum treibt Abpumpen von $CO_2$ die Reaktion weiter nach rechts? Ein Rechenweg beantwortet beides.

### Fachbegriff & Definition

Die **Zwei-Schritt-Regel** lautet: **Ausgangsgroesse zu $n$, dann $n$ zur Zielgroesse**. Fuer $CaCO_3 \to CaO + CO_2$ (1:1:1) gilt $n(CaCO_3) = 10{,}0/100{,}1 = 0{,}0999\,\mathrm{mol}$, also $n(CaO) = 0{,}0999\,\mathrm{mol}$ und $m = 0{,}0999 \cdot 56{,}1 = 5{,}60\,\mathrm{g}$. Die **Ausbeute** $4{,}50/5{,}60 \cdot 100\,\% = 80{,}4\,\%$ misst Verlust und Nebenreaktion. Fuer das Gleichgewicht gilt $K_c \propto [CO_2]$, weil Feststoffe entfallen; $CO_2$ abpumpen senkt $Q$ unter $K_c$ — das System laeuft nach rechts, bis $Q$ wieder gleich $K_c$ ist.

### Wirkungsgefuege / Modell

Denke in Kausalkette: **Menge, Verhaeltnis, Lage**. Erstens Mengen ueber $n = m/M$ vergleichbar machen. Zweitens im Koeffizientenverhaeltnis umsetzen ($n_{Ziel} = n_{Start} \cdot Koeff_{Ziel}/Koeff_{Start}$). Drittens die Lage ueber $Q$ gegen $K_c$ pruefen. Die NCM-Kathode ist die industrielle Fassung: Kippt das Nickel-Kobalt-Mangan-Verhaeltnis, bleibt teures Material ungenutzt — das knappste Reagenz begrenzt den Ertrag wie die kuerzeste Daube das Fass.

```diagram
   m --(M)--> n <--(cV)-- V,c
               |
        [Ausgleichen: Koeffizienten]
               |
     n(Ziel) = n(Start) * (Coeff_Ziel / Coeff_Start)
               |
        m = n*M  |  c = n/V  |  Ausbeute = real/theoretisch
   Beispiel: CaCO3 -> CaO + CO2  (1:1:1)
     n = 10,0/100,1 = 0,0999 mol -> m(CaO) = 5,60 g
     Ausbeute = 4,50/5,60 = 80,4 %
   MWG: aA + bB <=> cC + dD
   Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b), Q vs K entscheidet
```

Klausur-Satz: `Alle Mengenangaben werden erst in n umgerechnet, dann im Verhaeltnis der Koeffizienten umgesetzt und zuletzt ueber K_c ueberprueft.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Bei Lithium-Akkus mit NCM-Kathode zaehlt jedes Prozent Nickel, Kobalt und Mangan. Die Fabrik mischt die Metallsalze so genau, dass kein Partner frueh ausgeht, denn der knappste Stoff begrenzt die ganze Charge wie die kuerzeste Daube eines Fasses. Ein kleiner Dosierfehler erzeugt Tonnen teuren Ausschuss, daher prueft das Labor jede Lieferung erst in Mol um und vergleicht dann mit den Koeffizienten der Faellgleichung.

**Bezug zum Konzept**: `Das knappste Reagenz begrenzt den Ertrag wie die kuerzeste Daube das Fass.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Aus 10.0 g CaCO3 wird durch Brennen CaO gewonnen: CaCO3 -> CaO + CO2. M(CaCO3) = 100.1 g/mol, M(CaO) = 56.1 g/mol. Berechnen Sie die theoretische Masse an CaO und die Ausbeute, wenn real 4.50 g erhalten werden. Ueberpruefen Sie zudem mit K_c-Skizze, was ein Abpumpen von CO2 bewirkt.

HILFE:
1. Schritt 1: Gleichung pruefen (hier bereits 1:1:1), dann n = m/M fuer CaCO3 berechnen.
2. Schritt 2: Im Verhaeltnis der Koeffizienten umsetzen: n(CaO) = n(CaCO3) mal (1/1), dann m = n mal M.
3. Schritt 3: Ausbeute = real/theoretisch mal 100 Prozent; danach Q vs K deuten: CO2 senken heisst Q kleiner als K, also nach rechts.

MUSTERLOESUNG: Es gilt n(CaCO3) = 10.0 g / 100.1 g/mol = 0.0999 mol. Wegen des Verhaeltnisses 1:1 folgt n(CaO) = 0.0999 mol, also m(theoretisch) = 0.0999 mol mal 56.1 g/mol = 5.60 g. Die Ausbeute betraegt 4.50 g / 5.60 g mal 100 Prozent = 80.4 Prozent. Fuer das Gleichgewicht gilt K_c proportional zu [CO2], weil Feststoffe nicht erscheinen; pumpt man CO2 ab, so sinkt Q unter K, und das System laeuft nach rechts bis Q wieder gleich K ist.

Klausur-Satz: `Aus n = m/M und dem Koeffizientenverhaeltnis 1:1 folgt m = 5.60 g und eine Ausbeute von 80.4 Prozent; CO2-Entzug verschiebt nach rechts.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle erst das Verfahren — (i) Stoechiometrie-Verfahren ($n$-, $m$-, $c$-, Limit- und Ausbeutefragen nach der Regel erst ausgleichen, auf $n$ zurueckfuehren, im Verhaeltnis umsetzen) oder (ii) MWG-Verfahren ($K_c$ aufstellen, $Q$ berechnen, gegen $K$ vergleichen, Richtung deuten) — dann rechnen.

AUFGABE A: 5.00 g Mg plus 5.00 g O2 reagieren zu MgO (2Mg + O2 -> 2MgO). Gefragt ist die maximale Masse an MgO.
AUFGABE B: Fuer N2 + 3H2 <=> 2NH3 ist K_c = 0.50 gegeben; aktuell gilt [N2] = 1.0, [H2] = 1.0, [NH3] = 1.0 (mol/L). Gefragt ist, in welche Richtung das System laeuft.

HILFE: A nennt Gramm plus Ertragsfrage ohne K, also Verfahren (i) ueber Mol. B nennt K_c plus Momentankonzentrationen, also Verfahren (ii) ueber Q. Faustregel: Gramm, Milliliter, Mol, limitierend und Ausbeute verlangen Stoechiometrie; $K_c$, $Q$, Verschiebung und Gleichgewicht verlangen MWG.

ANTWORT: A erfordert Verfahren (i): n(Mg) = 5.00/24.3 = 0.206 mol, n(O2) = 5.00/32.0 = 0.156 mol; n/Coeff: 0.206/2 = 0.103 gegen 0.156/1 = 0.156, also Mg limitierend; n(MgO) = 0.206 mol ergibt m = 0.206 mal 40.3 = 8.30 g. B erfordert Verfahren (ii): Q = (1.0)^2 / (1.0 mal (1.0)^3) = 1.0; Q = 1.0 ist groesser als K_c = 0.50, daher laeuft das System rueckwaerts nach links.

Klausur-Satz: `Mengenfragen verlangen n und Koeffizientenvergleich, Gleichgewichtsfragen verlangen Q gegen K.`

## Schritt 6 — check

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

## Schritt 7 — szenario

ROLLE: Du bist Praktikant in der Batteriefertigung und pruefst eine NCM-Charge.
SITUATION: Geliefert wurden 10.0 mol Ni-, 10.0 mol Co- und 12.0 mol Mn-Salz fuer eine Faellgleichung mit Koeffizienten 1:1:1 zum NCM-Precursor. Die Schichtleitung fragt, welche Komponente limitiert, wie viel Precursor maximal entsteht und wie das CO2-Abziehen beim Brennen per MWG wirkt. Antworte in einer zusammenhaengenden Darstellung (ca. 150 Woerter).
AUFGABE: Schreibe eine Klausur-Antwort mit n/Coeff-Vergleich, Ertragsrechnung und Q-gegen-K-Urteil.
RUBRIC (30 XP): Korrekter Limit-Nachweis per n durch Koeffizient (10 XP) | Ertrag aus dem knappsten Partner plus Ausbeute-Deutung (10 XP) | MWG-Urteil: Q kleiner als K laeuft zum Produkt (10 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Rechenaufgaben folgen der Regel erst ausgleichen, auf $n$ zurueckfuehren, im Koeffizientenverhaeltnis umsetzen: Massen und Volumina werden $n = m/M = cV$, $n$ durch Koeffizient entscheidet das Limit, das Verhaeltnis liefert das Ziel, real durch theoretisch die Ausbeute. Gleichgewichte erhalten eine eigene Zeile $K_c$ aus Produktpotenzen durch Eduktpotenzen; $Q$ gegen $K$ entscheidet die Richtung. Feststoffe entfallen aus $K$, $K$ folgt nur der Temperatur. Die NCM-Mischung ist die industrielle Limitaufgabe: Der knappste Partner stoppt die ganze Linie.
Takeaway-Satz: `Erst ausgleichen, dann in n umrechnen, im Koeffizientenverhaeltnis umsetzen und zuletzt mit Q gegen K ueberpruefen.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Ertragsrechnung mit n und Ausbeute (Schritt 4) oder die Wahl zwischen Stoechiometrie- und MWG-Verfahren (Schritt 5)?
2. Planung: Beim naechsten Mal gleiche ich zuerst aus, rechne alles in n um und frage dann, ob nach Menge oder nach Q gegen K gefragt ist.
