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

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Die Regel erst ausgleichen, dann auf $n$ zurueckfuehren, dann im Koeffizientenverhaeltnis umsetzen: Alle Massen und Volumina werden erst $n = m/M = cV$, dann ueber die ausgeglichene Gleichung verrechnet.
2. Das limitierende Reagenz bestimmen und theoretischen Ertrag mit Ausbeute ($Ausbeute = real/theoretisch \cdot 100\,\%$) berechnen; am NCM-Beispiel der Batteriefertigung begruenden, warum das Mischverhaeltnis exakt stimmen muss.
3. Das Massenwirkungsgesetz $K_c$ aufstellen und damit Gleichgewichte pruefen und Verschiebungen vorhersagen: $Q < K$ laeuft vorwaerts, $Q > K$ laeuft rueckwaerts (AFB II).

Klausur-Satz: `Erst ausgleichen, dann alles in die Stoffmenge n = m/M = cV umrechnen und schliesslich im Verhaeltnis der Koeffizienten umsetzen.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Stoffmenge $n$: Die Sammeleinheit der Teilchen; $n = m/M = cV$ verbindet Masse, Volumen und Gleichung.
- Ausgleichen: Koeffizienten so waehlen, dass die Atomzahlen beidseitig stimmen; ihr Verhaeltnis ist Teilchen- und Molverhaeltnis.
- Limitierendes Reagenz: Der Reaktant, der im Koeffizientenverhaeltnis zuerst verbraucht ist und den Maximalertrag festlegt.
- Ausbeute: Realer Ertrag durch theoretischen Ertrag mal hundert Prozent; sie spiegelt Verluste und Nebenreaktionen.
- Massenwirkungsgesetz: $K_c$ ist Produktkonzentration hoch Koeffizient durch Eduktkonzentration hoch Koeffizient; die Exponenten sind die Ausgleichskoeffizienten.

Klausur-Satz: `Die Koeffizienten der ausgeglichenen Gleichung geben das Stoffmengenverhaeltnis vor, K_c prueft die Lage des Gleichgewichts.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Stöchiometrie kennt nur eine Schnellstrasse: Alle Angaben erst auf $n$ zurueckfuehren, dann ueber Koeffizienten bruecken. Massen steigen mit $n = m/M$ ein, Loesungen mit $n = cV$, Gase in EF ebenfalls erst als $n$; auf der $n$-Strecke geben die Ausgleichskoeffizienten die Spurverhaeltnisse vor — etwa 2 mol zu 1 mol — danach faehrt das Ziel-$n$ als Masse oder Konzentration wieder ab. Das limitierende Reagenz ist die zuerst beendete Spur: Fuer jeden Reaktanten $n$ durch Koeffizient teilen, der kleinste Quotient limitiert und allein er bestimmt den theoretischen Ertrag. Das Massenwirkungsgesetz verlaengert denselben Gedanken ins Gleichgewicht: $K_c$ fixiert Produkt durch Edukt als Konstante, der Vergleich von momentanem $Q$ mit $K$ verrät die Richtung. Die NCM-Kathode der Lithiumbatterie ist die industrielle Fassung: Kippt das Nickel-Kobalt-Mangan-Verhaeltnis, bleibt teures Material ungenutzt und die Kapazitaet sinkt.

```diagram
   m --(M)--> n <--(cV)-- V,c
               |
        [Ausgleichen: Koeffizienten]
               |
     n(Ziel) = n(Start) * (Coeff_Ziel / Coeff_Start)
               |
        m = n*M  |  c = n/V  |  Ausbeute = real/theoretisch
   Beispiel MWG: aA + bB <=> cC + dD
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
