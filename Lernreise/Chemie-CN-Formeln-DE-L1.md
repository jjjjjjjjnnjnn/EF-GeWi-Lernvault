---
fach: Chemie
thema: "CN-Formelhandbuch: sechs Formelkarten"
level: 1
ziel: Klausur
xp: 100
operatoren: [nennen, berechnen, auswerten]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, CN]
version: Lesson-v3
---

# Lernreise: CN-Formelhandbuch und Klausurtransfer (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Mit sechs Formelkarten (Mol, Konzentration, Gas, $pH$, Redox, Gleichgewicht) zwischen Masse, Volumen und Teilchenzahl umrechnen und jede Stufe mit Einheit schreiben.
2. Jeden Kartennamen sicher als deutschen Klausur-Begriff nennen und die Formel zuordnen.
3. Jedes Ergebnis mit einer Groessenordnungspruefung auf Deutsch als plausibel bewerten.

Klausur-Satz: `Jede Rechnung beginnt mit der Formel, führt die Einheiten durch alle Schritte und endet mit einer Größenordnungsprüfung.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Stoffmenge $n$ (amount of substance): Zaehleinheit; $1\,\mathrm{mol} = 6{,}022 \cdot 10^{23}$ Teilchen.
- Konzentration $c$ (concentration): Mol pro Volumen Loesung, $c = n/V$.
- Gasgesetz (gas law): $pV = nRT$ verbindet Druck, Volumen, Temperatur und Molzahl.
- $pH$-Wert (pH value): $pH = -\lg[H_3O^+]$, die logarithmische Skala fuer Saeuren und Basen.
- Massenwirkungsgesetz MWG (law of mass action): Der $K_c$-Ausdruck beschreibt die Lage des Gleichgewichts.

Klausur-Satz: `Mit dem Ansatz c = n/V folgt die Konzentration einschließlich Einheit; die Größenordnung wird durch Vergleich mit Alltagswerten geprüft.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Sechs Formelkarten drehen sich um einen Knoten: die Stoffmenge $n$. Masse erreicht $n$ ueber $n = m/M$, Teilchenzahl ueber $N = n \cdot N_A$, Gasvolumen ueber $V = n \cdot V_m$ im Normzustand oder $pV = nRT$ sonst, Loesungen ueber $c = n/V$; von $n$ strahlen $pH = -\lg[H_3O^+]$, die Elektronenerhaltung der Redoxchemie und das $K_c$ des Gleichgewichts ab. Jede Aufgabe folgt zwei Schritten: Erst alle Angaben auf $n$ zurueckfuehren, dann ueber das Koeffizientenverhaeltnis auf das $n$ des Zielstoffs springen und in die Zielgroesse umrechnen. Der haeufigste Fehler ist das direkte Verrechnen zweier Nicht-$n$-Groessen, etwa Gramm mal Konzentration — die Einheit verrät den Fehler sofort. Nach jeder Rechnung folgt die Frage nach der Groessenordnung.

```diagram
                 Masse m (g)
                     |  n = m/M
                     v
 Teilchenzahl N <--> n (mol) <--> V (Gas, L)
   N = n * N_A        |            V = n * V_m
                      |  c = n/V
                      v
              Konzentration c (mol/L)
                      |
        +-------------+-------------+
        v             v             v
   pH = -lg[H3O+]   Redox      K_c (MWG)
                    (e- Erhaltung)

  Zwei-Schritt-Regel:  Ausgangsgroesse -> n1 -> (Koeffizienten) -> n2 -> Zielgroesse
```

Drei Karten im Detail:

1. Gaskarte: Im Normzustand gilt $V_m = 22{,}4\,\mathrm{L/mol}$; sonst gilt $pV = nRT$ mit $R = 8{,}314\,\mathrm{J/(mol \cdot K)}$ und $T$ in Kelvin.
2. $pH$-Karte: $pH = -\lg[H_3O^+]$, $pOH = -\lg[OH^-]$, $pH + pOH = 14$ (nur bei $25^\circ\mathrm{C}$); zehnfache Verduennung hebt den $pH$ um 1.
3. Gleichgewichtskarte: $K_c$ ist Produktkonzentration hoch Koeffizient durch Eduktkonzentration hoch Koeffizient; reine Feststoffe und Fluessigkeiten entfallen (z. B. gilt fuer $CaCO_3(s) \rightleftharpoons CaO(s) + CO_2(g)$ nur $K_c = [CO_2]$).
4. Redoxkarte: Elektronenerhaltung $\sum n(e^-\text{ abgegeben}) = \sum n(e^-\text{ aufgenommen})$; steigende Oxidationszahl markiert das Reduktionsmittel, fallende das Oxidationsmittel.

Groessenmassstab zum Mitpruefen: $1\,\mathrm{mol}$ Gas misst im Normzustand etwa $22{,}4\,\mathrm{L}$; $0{,}5\,\mathrm{mol/L}$ entspricht einer normalen Zuckerloesung; ein $pH$-Unterschied von 1 bedeutet Faktor 10 in der Konzentration. Wer nach jeder Rechnung die Groessenordnung prueft, faengt Einheiten- und Zehnerpotenzfehler automatisch ab.

Klausur-Satz: `Alle quantitativen Aufgaben führen über die Stoffmenge n als zentralen Knoten, von dem aus die Zielgröße über die passende Formel bestimmt wird.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der italienische Forscher Avogadro erkannte schon früh, dass gleiche Gasvolumina bei gleichem Druck und gleicher Temperatur die gleiche Anzahl von Teilchen enthalten. Die berühmte Zahl 6,022 * 10^23, die heute seinen Namen trägt, hat er selbst jedoch nie gekannt: Sie wurde erst lange nach seinem Tod bestimmt und dann nach ihm benannt. Bis heute ist das Mol damit vor allem eines – eine reine Zähleinheit, die Masse und Teilchenzahl verbindet.

**Bezug zum Konzept**: Das Mol ist die zentrale Zähleinheit, über die Masse, Teilchenzahl und Volumen erst vergleichbar werden.

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: formula]

AUFGABE (berechnen & auswerten, AFB II): Bearbeiten Sie drei Teilaufgaben.
(a) 0,40 mol eines Stoffes werden in 0,80 L Wasser gelöst. Berechnen Sie die Konzentration c.
(b) Eine Lösung hat c(H3O+) = 1,0 * 10^-4 mol/L. Berechnen Sie den pH-Wert und die Hydroxidionenkonzentration (Kw = 1,0 * 10^-14 (mol/L)^2).
(c) Geben Sie für N2(g) + 3 H2(g) <-> 2 NH3(g) den Ausdruck für die Gleichgewichtskonstante K_c an.

HILFE:
1. Schritt 1: (a) Formel c = n/V aufschreiben, dann einsetzen, Einheit mol/L.
2. Schritt 2: (b) pH = -lg[H3O+] direkt lesen; danach [OH-] = Kw / [H3O+].
3. Schritt 3: (c) K_c = Produkte^Koeffizient / Edukte^Koeffizient; Gase werden aufgenommen.

MUSTERLOESUNG: (a) Es gilt c = n/V = 0,40 mol / 0,80 L = 0,50 mol/L. Dies ist die Größenordnung einer normalen Zuckerlösung, also plausibel. (b) Der pH-Wert folgt direkt aus dem Exponenten: pH = -lg(1,0 * 10^-4) = 4,00. Für die Hydroxidionenkonzentration gilt [OH-] = Kw / [H3O+] = 1,0 * 10^-14 / 1,0 * 10^-4 = 1,0 * 10^-10 mol/L. Kontrolle über pH + pOH = 14: pOH = 14 - 4 = 10, also [OH-] = 10^-10 mol/L, was übereinstimmt. (c) Der Ausdruck lautet K_c = [NH3]^2 / ([N2] * [H2]^3); die Exponenten sind die Koeffizienten, und alle beteiligten Stoffe sind Gase, werden also aufgenommen.

Klausur-Satz: `Der pH-Wert folgt aus dem Exponenten der Oxoniumionenkonzentration, und die Hydroxidionenkonzentration ergibt sich aus dem Ionenprodukt des Wassers.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Wähle erst das Verfahren — (i) Konzentrations-Verfahren (Volumen $V$ in Liter gegeben, Loesungskonzentration mit $c = n/V$ gesucht) oder (ii) Massenanteil-Verfahren (Gesamtmasse $m$ in Gramm gegeben, Anteil mit $w = m_\text{Stoff} / m_\text{Loesung}$ gesucht) — dann loesen.

AUFGABE A: In 0,50 L einer wässrigen Lösung sind 0,20 mol Natriumchlorid gelöst. Berechnen Sie die Konzentration c.

AUFGABE B: In 25 g einer Salzlösung sind 5,0 g Salz enthalten. Berechnen Sie den Massenanteil w.

HILFE: A nennt ein Volumen in Liter und verlangt eine Konzentration, also Verfahren (i). B nennt Massen in Gramm und verlangt einen Anteil, also Verfahren (ii). Faustregel: Liter und Volumen verlangen Konzentration, Gramm und Gesamtmasse verlangen Massenanteil.

ANTWORT: A erfordert Verfahren (i): c = n/V = 0,20 mol / 0,50 L = 0,40 mol/L; dies ist die Größenordnung einer verdünnten Salzlösung und damit plausibel. B erfordert Verfahren (ii): w = m_Stoff / m_Lösung = 5,0 g / 25 g = 0,20, das heißt ein Massenanteil von 20 %; eine solche Lösung ist deutlich konzentrierter als die in Teilaufgabe A. Die beiden Verfahren unterscheiden sich grundlegend: c rechnet über das Volumen (mol/L), w über die Masse (ohne Einheit bzw. Prozent).

Klausur-Satz: `Die Konzentration wird über das Volumen berechnet, während der Massenanteil das Verhältnis zweier Massen angibt.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Welche Formel verbindet Stoffmenge und Konzentration? | ANTWORT: c = n/V, wobei V das Volumen der Lösung in Litern ist.
FRAGE: Wie lautet die Definition des pH-Wertes in Formelschreibweise? | ANTWORT: pH = -lg[H3O+], also der negative dekadische Logarithmus der Oxoniumionenkonzentration.
FRAGE: Warum wird beim Aufstellen von K_c ein reiner Feststoff nicht berücksichtigt? | ANTWORT: Weil seine Konzentration konstant ist und deshalb nicht in den Ausdruck aufgenommen wird.

Klausur-Satz: `Die sechs Formelkarten greifen über die Stoffmenge ineinander; Einheiten und Größenordnungsprüfung machen sie klausurtauglich.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: $pH$ 3 sei nur wenig saurer als $pH$ 5.
   Korrektur: Der $pH$ ist logarithmisch definiert; zwei Einheiten Unterschied bedeuten Faktor 100 in $[H_3O^+]$. Mit $[H_3O^+] = 10^{-pH}$ folgt $10^{-3}$ gegen $10^{-5}\,\mathrm{mol/L}$ — ein Unterschied von zwei Zehnerpotenzen, kein kleiner Schritt.
   Korrektur-Satz: `Da der pH-Wert logarithmisch definiert ist, entspricht ein Unterschied von zwei Einheiten dem Faktor 100 in der Oxoniumionenkonzentration.`

2. Fehlannahme: $V_m = 22{,}4\,\mathrm{L/mol}$ gelte unter allen Bedingungen.
   Korrektur: Der Wert gilt nur im Normzustand ($0^\circ\mathrm{C}$, $101{,}3\,\mathrm{kPa}$). Bei anderer Temperatur oder anderem Druck gilt $pV = nRT$. Raumtemperaturwerte direkt mit $22{,}4$ zu verrechnen ist ein klassischer Fehler.
   Korrektur-Satz: `Das molare Volumen V_m = 22,4 L/mol gilt nur im Standardzustand; bei anderen Bedingungen wird das Gasgesetz pV = nRT verwendet.`

## Schritt 7 — szenario

ROLLE: Du hilfst als Tutor beim "Formeldiktat" für eine EF-Klausurvorbereitung.
SITUATION: Eine Mitschülerin soll drei Aufgaben unter Zeitdruck lösen: (1) Sie soll die deutsche Bezeichnung einer Konzentrationsgroesse nennen, (2) aus 0,30 mol in 0,60 L die Konzentration berechnen und (3) aus [H3O+] = 10^-5 mol/L den pH-Wert ableiten. Erkläre ihr in einer zusammenhängenden Antwort (ca. 150 Wörter) die drei Formelkarten, führe die Rechnungen vollständig mit Einheiten durch und schließe mit einer Größenordnungsprüfung.
RUBRIC (30 XP): Korrekte Benennung der Konzentration $c$ (6 XP) | Rechnung c = 0,30/0,60 = 0,50 mol/L mit Einheit (8 XP) | pH = -lg(10^-5) = 5,00 (8 XP) | Größenordnungsprüfung und deutsche Fachsprache (8 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Sechs Karten — Mol, Konzentration, Gas, $pH$, Redox, Gleichgewicht — alle ueber den Knoten $n$ verbunden. Zwei Schritte: Erst alle Angaben auf $n$ zurueckfuehren, dann ueber das Koeffizientenverhaeltnis auf das Ziel-$n$ springen und umrechnen. Drei Pflichten: Formel zuerst hinschreiben, Einheiten durchgehend mitfuehren, Groessenordnung am Ende pruefen. Verfahrenswahl nach Einheit: Liter verlangt Konzentration, Gramm verlangt Massenanteil; Saeure-Base-Aufgaben pruefen erst stark oder schwach; Gleichgewichte lassen reine Feststoffe aus $K_c$ heraus.
Takeaway-Satz: `Die Formel trägt Einheiten, und das Ergebnis trägt eine Prüfung; alle Größen laufen über die Stoffmenge n.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Umrechnung über die Stoffmenge (Schritt 4) oder die Wahl zwischen Konzentration und Massenanteil (Schritt 5)?
2. Planung: Beim nächsten Mal lese ich zuerst die Einheit im Aufgabentext (L oder g), wähle danach die Formelkarte und schreibe die Einheit sofort hinter das Ergebnis.
