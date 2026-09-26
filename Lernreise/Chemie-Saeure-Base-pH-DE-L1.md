---
fach: Chemie
thema: "Saeure-Base-Gleichgewichte und pH-Wert"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Saeure-Base]
version: Lesson-v3
---

# Lernreise: Saeure-Base-Gleichgewichte und pH-Wert (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst mit der Broensted-Theorie Protolysegleichungen aufstellen und korrespondierende Saeure-Base-Paare benennen.
2. Du kannst mit $pH = -\lg[H_3O^+]$ und $pH + pOH = 14$ logarithmisch rechnen und begruenden, dass zehnfache Verduennung den $pH$ um $1$ hebt.
3. Du kannst schwache Saeuren ueber die Dreisatztabelle berechnen, $c(H_3O^+)$ bestimmen und die Naeherung mit $x/c_0 < 5\,\%$ pruefen.

### Hook / Phaenomen

Soerensen wollte beim Bierbrauen die Aciditaet kontrollieren — doch die Oxoniumkonzentrationen schwanken ueber viele Zehnerpotenzen, von $1$ bis $10^{-14}\,\mathrm{mol/L}$. Rohe Zahlen versagen, also waehlte er eine logarithmische Skala von $0$ bis $14$. Warum bedeutet ein Unterschied von zwei $pH$-Einheiten den Faktor $100$ — und warum schmeckt $0{,}10\,\mathrm{mol/L}$ Essigsaeure milder als $0{,}005\,\mathrm{mol/L}$ Salzsaeure?

### Fachbegriff & Definition

Nach **Broensted** ist eine **Saeure ein Protonendonator**, eine **Base ein Protonenakzeptor**; jede **Protolyse** verlaeuft als Gleichgewicht mit **korrespondierenden Paaren** — etwa $HCl/Cl^-$ oder $CH_3COOH/CH_3COO^-$. Wasser ist **amphoter** und ionisiert sich selbst: Das **Ionenprodukt** $K_w = [H_3O^+] \cdot [OH^-] = 1{,}0 \cdot 10^{-14}\,(\mathrm{mol/L})^2$ bei $25^\circ\mathrm{C}$ erzwingt $pH + pOH = 14$. Der **$pH$-Wert** $pH = -\lg[H_3O^+]$ ist der negative dekadische Massstab: $10^{-3}$ heisst $pH$ $3$, $5 \cdot 10^{-3}$ heisst $pH$ $2{,}30$ — jede Einheit bedeutet Faktor $10$.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Staerke pruefen, Formel waehlen, Naeherung kontrollieren**. Starke Saeuren protolysieren fast vollstaendig — $[H_3O^+] = c_0$, ein $-\lg$ genuegt ($0{,}005\,\mathrm{mol/L}$ $HCl$ zu $pH$ $2{,}30$). Schwache Saeuren protolysieren nur teilweise und verlangen die Dreisatztabelle mit $K_S = \frac{[A^-][H_3O^+]}{[HA]}$ ($0{,}10\,\mathrm{mol/L}$ $HAc$ zu $x = 1{,}34 \cdot 10^{-3}$ und $pH$ $2{,}87$). Erster Schritt bleibt stets die Staerkepruefung, dann erst die Formelwahl, zuletzt $x/c_0 < 5\,\%$ — die Pruefung traegt eigene Punkte.

Klausur-Satz: `Der pH-Wert ist der negative dekadische Logarithmus der Oxoniumionenkonzentration; er ändert sich um eine Einheit, wenn sich die Konzentration um den Faktor 10 ändert.`

## Schritt 2 — entdecken
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Salzsaeure mit $pH$ $4$ wird zehnfach verduennt — neuer $pH$? Wer logarithmisch denkt, antwortet in Sekunden: $5$. Wer linear denkt, scheitert an jeder Kurzfrage. Fuenf Begriffe liefern das logarithmische Gefuehl plus die Gleichgewichtsrechnung.

### Fachbegriffe & Definitionen

- **Protolyse:** Eine Saeure gibt ein Proton ($H^+$) an eine Base ab und bildet korrespondierende Paare — etwa $HCl + H_2O \to H_3O^+ + Cl^-$.
- **Korrespondierendes Saeure-Base-Paar:** Die Saeure wird nach Protonenabgabe zu ihrer Base (z. B. $HCl$/$Cl^-$); jede Protolyse verlaeuft als Gleichgewicht.
- **Ionenprodukt des Wassers $K_w$:** $K_w = [H_3O^+] \cdot [OH^-] = 1{,}0 \cdot 10^{-14}\,(\mathrm{mol/L})^2$ bei $25^\circ\mathrm{C}$; in neutraler Loesung beidseitig $10^{-7}\,\mathrm{mol/L}$.
- **$pH$-Wert:** $pH = -\lg[H_3O^+]$ als negativer dekadischer Massstab; eine Einheit entspricht Faktor $10$ — Abkuerzung $-\lg(a \cdot 10^{-n}) = n - \lg(a)$ mit $\lg 2 = 0{,}30$, $\lg 5 = 0{,}70$.
- **Saeurekonstante $K_S$:** $K_S = \frac{[A^-][H_3O^+]}{[HA]}$; groesseres $K_S$ bedeutet staerkere Saeure — schwache Saeuren rechnen ueber $K_S = x^2/(c_0 - x)$.

### Wirkungsgefuege / Modell

Die Begriffe greifen ineinander: **Broensted** liefert die Gleichung, $K_w$ die Wasserbasis, $pH$ den Massstab, $K_S$ die Staerke. Starke Saeuren rechnen einstufig ($pH = -\lg c_0$), starke Basen ueber $pOH$, schwache Partner ueber das Gleichgewicht mit Pflichtpruefung $x/c_0 < 5\,\%$. Neutralisation entscheidet die Stoffmengengleichheit $n(H_3O^+) = n(OH^-)$: stark gegen stark trifft am Aequivalenzpunkt $pH = 7$, schwach gegen stark liegt wegen der korrespondierenden Base im basischen Bereich.

Klausur-Satz: `Eine Säure ist nach Brønsted ein Protonendonator, eine Base ein Protonenakzeptor; jede Protolyse verläuft als Gleichgewicht.`

## Schritt 3 — entdecken
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Salzsaeure $0{,}005\,\mathrm{mol/L}$ zu $pH$ $2{,}30$, Essigsaeure $0{,}10\,\mathrm{mol/L}$ zu $pH$ $2{,}87$ — zwanzigfache Konzentration, fast gleicher $pH$. Der Unterschied liegt nicht in der Menge, sondern im Dissoziationsgrad: $100\,\%$ gegen $1{,}3\,\%$. Ein Diagramm mit vier Formelkarten macht den Mechanismus rechenbar.

### Fachbegriff & Definition

Der **Protonenumzug** besagt: Die Saeure gibt das Proton, die Base nimmt es; nach der Abgabe wird die Saeure zu ihrer korrespondierenden Base. Die **Trennlinie stark oder schwach** entscheidet die Rechnung: Starke Saeuren protolysieren fast vollstaendig ($[H_3O^+] = c_0$), schwache nur teilweise (Dreisatztabelle mit $K_S$). Vier Formelkarten tragen die Klausur: starke Saeure $pH = -\lg c_0$; starke Base $pOH = -\lg c_0$, $pH = 14 - pOH$; Ionenprodukt $pH + pOH = 14$; schwache Saeure $K_S = x^2/(c_0 - x)$, dann $pH = -\lg x$.

### Wirkungsgefuege / Modell

Denke in Kausalkette: **Gleichung, Staerke, Tabelle, Pruefung**. Erstens Protolysegleichung mit Paaren aufstellen. Zweitens Staerke feststellen — $K_S$ gegeben heisst Tabelle. Drittens Dreisatztabelle (Start $c_0/0/0$, Aenderung $-x/+x/+x$) und $K_S$ einsetzen. Viertens $pH$ bilden und $x/c_0 < 5\,\%$ pruefen. Schwache Saeuren punkten nur in dieser Reihenfolge — Richtung ohne Begruendung verliert Punkte.

```diagram
  pH-Skala (25 C)         c(H3O+) in mol/L
    0  |#####| sauer        1,0 * 10^0
    1  |#### |              1,0 * 10^-1     <-- jede Einheit = Faktor 10
    2  |###  |              1,0 * 10^-2
    2,30|## |   HCl 0,005    5,0 * 10^-3   <-- pH = -lg(5*10^-3)
    2,87|## |   HAc 0,10     1,34 * 10^-3  <-- schwach, aus K_S
    7  |----| neutral        1,0 * 10^-7
   14  |     | basisch        1,0 * 10^-14

    Merke:  pH + pOH = 14  (nur bei 25 C)
    stark:  pH = -lg(c0)          schwach: K_S = x^2/(c0 - x)
    Abkuerzung: -lg(a*10^-n) = n - lg(a), lg2 = 0,30, lg5 = 0,70
```

Klausur-Satz: `Während eine starke Säure in wässriger Lösung nahezu vollständig dissoziiert und pH = -lg(c0) gilt, stellt sich bei einer schwachen Säure ein Protolysegleichgewicht ein, das über K_S berechnet wird.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der pH-Wert wurde von dem dänischen Chemiker Sørensen eingeführt, der damit die Acidität beim Bierbrauen kontrollieren wollte. Weil die Konzentrationen der Oxoniumionen über einen sehr weiten Bereich schwanken, wählte er eine logarithmische Skala statt der rohen Zahlenwerte. Was der Buchstabe p genau bedeutet, ist bis heute umstritten; die Zahlen von 0 bis 14 sind dagegen reine Konvention.

**Bezug zum Konzept**: Die logarithmische pH-Skala wurde gewählt, weil die Oxoniumionenkonzentration über viele Zehnerpotenzen variiert.

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Berechnen Sie den pH-Wert einer Salzsäurelösung mit c0 = 0,005 mol/L sowie einer Essigsäurelösung mit c0 = 0,10 mol/L (K_S = 1,8 * 10^-5 mol/L). Begründen Sie, warum für beide Säuren unterschiedliche Ansätze nötig sind, und prüfen Sie bei der Essigsäure die Näherung x/c0 < 5 %.

HILFE:
1. Schritt 1: Entscheide zuerst, ob die Säure stark oder schwach ist (pK_S-Wert bzw. K_S).
2. Schritt 2: Bei der starken Säure gilt [H3O+] = c0; setze direkt in pH = -lg[H3O+] ein.
3. Schritt 3: Bei der schwachen Säure stelle die Dreisatztabelle auf: Start c0 / 0 / 0; Änderung -x / +x / +x; Gleichgewicht c0 - x / x / x.
4. Schritt 4: Setze in K_S = x^2 / (c0 - x) ein, nutze die Näherung c0 - x ungefähr c0, und prüfe x/c0 < 5 %.

MUSTERLOESUNG: Salzsäure ist eine sehr starke Säure (pK_S etwa -6) und dissoziiert vollständig, daher gilt [H3O+] = c0 = 0,005 mol/L = 5,0 * 10^-3 mol/L. Es folgt pH = -lg(5,0 * 10^-3) = -(0,70 - 3) = 2,30. Essigsäure ist dagegen eine schwache Säure; mit der Dreisatztabelle gilt K_S = x^2 / (0,10 - x). Mit der Näherung 0,10 - x ungefähr 0,10 folgt x^2 = 1,8 * 10^-5 * 0,10 = 1,8 * 10^-6, also x = 1,34 * 10^-3 mol/L. Damit ist pH = -lg(1,34 * 10^-3) = 3 - 0,13 = 2,87. Die Kontrolle ergibt x/c0 = 1,34 * 10^-3 / 0,10 = 0,013, also 1,3 % < 5 %, die Näherung ist zulässig. Obwohl Essigsäure die zehnfache Ausgangskonzentration hat, ist ihr pH nur wenig niedriger als der der Salzsäure, weil sie nur zu etwa 1,3 % dissoziiert.

Klausur-Satz: `Bei gleicher Ausgangskonzentration liefert eine starke Säure einen deutlich niedrigeren pH-Wert als eine schwache Säure, da nur die starke Säure vollständig protoniert vorliegt.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Wähle erst das Verfahren — (i) Starke-Saeure-Verfahren (sehr kleines $pK_S$, vollstaendige Dissoziation, $pH = -\lg(c_0)$) oder (ii) Schwache-Saeure-Verfahren ($K_S$ gegeben, Gleichgewicht mit Dreisatztabelle) — dann loesen.

AUFGABE A: Eine Salpetersäurelösung (HNO3) hat die Konzentration c0 = 0,010 mol/L. Berechnen Sie den pH-Wert.

AUFGABE B: Eine wässrige Lösung einer schwachen Säure HA (K_S = 4,0 * 10^-7 mol/L) hat die Konzentration c0 = 0,20 mol/L. Berechnen Sie den pH-Wert und begründen Sie, ob die Näherung zulässig ist.

HILFE: A nennt eine starke Säure ohne K_S-Wert; sie dissoziiert vollständig, also Verfahren (i). B nennt ausdrücklich einen K_S-Wert und verlangt eine Näherungsprüfung, also Verfahren (ii). Faustregel: Nur $c_0$ bei starker Saeure verlangt direktes $-\lg$; $K_S$ bei schwacher Saeure verlangt Dreisatztabelle mit Pruefung.

ANTWORT: A erfordert Verfahren (i): HNO3 dissoziiert vollständig, also gilt [H3O+] = c0 = 0,010 mol/L = 1,0 * 10^-2 mol/L und pH = -lg(1,0 * 10^-2) = 2,00. B erfordert Verfahren (ii): Mit K_S = x^2 / (0,20 - x) und der Näherung 0,20 - x ungefähr 0,20 folgt x^2 = 4,0 * 10^-7 * 0,20 = 8,0 * 10^-8, also x = 2,83 * 10^-4 mol/L. Damit ist pH = -lg(2,83 * 10^-4) = 4 - 0,45 = 3,55. Die Kontrolle ergibt x/c0 = 2,83 * 10^-4 / 0,20 = 0,0014, also 0,14 % < 5 %, die Näherung ist zulässig.

Klausur-Satz: `Nur bei vollständiger Dissoziation gilt pH = -lg(c0); bei einer schwachen Säure muss die Oxoniumionenkonzentration zuerst über das Protolysegleichgewicht bestimmt werden.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet die Definition des pH-Wertes? | ANTWORT: pH = -lg[H3O+], also der negative dekadische Logarithmus der Oxoniumionenkonzentration.
FRAGE: Warum gilt für eine starke Säure [H3O+] = c0? | ANTWORT: Weil sie in wässriger Lösung nahezu vollständig dissoziiert (Dissoziationsgrad etwa 100 %).
FRAGE: Welche Bedingung muss eine Näherung c0 - x ungefähr c0 erfüllen? | ANTWORT: Der Umsatz x muss klein gegen c0 sein, geprüft durch x/c0 < 5 %.

Klausur-Satz: `Der pH-Wert folgt aus der Oxoniumionenkonzentration über den negativen dekadischen Logarithmus.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: $pH$ 3 sei nur wenig saurer als $pH$ 5.
   Korrektur: Der $pH$ ist logarithmisch; eine Einheit bedeutet Faktor 10, zwei Einheiten Faktor 100. $[H_3O^+]$ bei $pH$ 3 ist hundertmal groesser als bei $pH$ 5 — lineares Gefuehl taeuscht hier immer.
   Korrektur-Satz: `Da der pH-Wert logarithmisch definiert ist, entspricht ein Unterschied von zwei pH-Einheiten dem Faktor 100 in der Oxoniumionenkonzentration.`

2. Fehlannahme: Schwache Saeuren rechneten ebenfalls mit $pH = -\lg(c_0)$.
   Korrektur: Niemals. Schwache Saeuren protolysieren nur teilweise; $[H_3O^+]$ liegt weit unter $c_0$ und folgt erst aus $K_S$ ueber die Dreisatztabelle. Direktes Einsetzen unterschaetzt den $pH$ um mehrere Einheiten — der klassische Fehler bei schwachen Saeuren.
   Korrektur-Satz: `Bei einer schwachen Säure ist [H3O+] deutlich kleiner als c0; die Konzentration muss deshalb über K_S aus dem Protolysegleichgewicht bestimmt werden.`

## Schritt 7 — szenario

ROLLE: Du bist Praktikant im Schullabor und sollst eine Säure-Base-Titration vorbereiten und auswerten.
SITUATION: Es liegen 100 mL Salzsäure mit c0 = 0,005 mol/L vor. Diese sollen mit Natronlauge (c = 0,02 mol/L) vollständig neutralisiert werden. Berechne das benötigte Volumen der Natronlauge, erläutere die Bedingung am Äquivalenzpunkt und begründe, warum der pH-Wert am Äquivalenzpunkt bei 7 liegt. Verfasse eine zusammenhängende Auswertung (ca. 150 Wörter).
RUBRIC (30 XP): Aufstellen der Neutralisationsgleichung HCl + NaOH -> NaCl + H2O (5 XP) | Stoffmengenansatz c1 * V1 = c2 * V2 und Berechnung V2 = 25 mL (10 XP) | Bedingung am Äquivalenzpunkt n(H3O+) = n(OH-) (8 XP) | Begründung pH = 7 wegen vollständiger Neutralisation durch starke Säure und starke Base (7 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Saeure-Base-Aufgaben folgen drei Schritten: Erst Staerke pruefen, dann Formel waehlen, zuletzt Naeherung kontrollieren. Starke Saeuren und Basen rechnen einstufig: $pH = -\lg(c_0)$, $pOH = -\lg(c_0)$, $pH + pOH = 14$. Schwache Partner rechnen ueber das Gleichgewicht: Dreisatztabelle, $K_S = x^2/(c_0 - x)$, Pflichtpruefung $x/c_0 < 5\,\%$. Der $pH$ bleibt logarithmisch: Faktor 10 in der Konzentration heisst eine $pH$-Einheit. Neutralisation entscheidet die Stoffmengengleichheit.
Takeaway-Satz: `Die pH-Berechnung beginnt mit der Entscheidung stark oder schwach; erst danach folgt der passende Ansatz, und jede Näherung wird überprüft.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Logarithmusrechnung in Schritt 4 oder die Entscheidung starke oder schwache Säure in Schritt 5?
2. Planung: Beim nächsten Mal lese ich zuerst, ob ein K_S-Wert gegeben ist, und wähle danach zwischen Ein-Schritt-Formel und Dreisatztabelle.
