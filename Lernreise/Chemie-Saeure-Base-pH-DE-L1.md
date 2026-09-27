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

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst mit der Broensted-Theorie Protolysegleichungen aufstellen und korrespondierende Saeure-Base-Paare benennen.
2. Du kannst mit $pH = -\lg[H_3O^+]$ und $pH + pOH = 14$ logarithmisch rechnen und begruenden, dass zehnfache Verduennung den $pH$ um $1$ hebt.
3. Du kannst schwache Saeuren ueber die Dreisatztabelle berechnen, $c(H_3O^+)$ bestimmen und die Naeherung mit $x/c_0 < 5\,\%$ pruefen.

### Hook / Phaenomen

Soerensen wollte beim Bierbrauen die Aciditaet kontrollieren — doch die Oxoniumkonzentrationen schwanken ueber viele Zehnerpotenzen, von $1$ bis $10^{-14}\,\mathrm{mol/L}$. Rohe Zahlen versagen, also waehlte er eine logarithmische Skala von $0$ bis $14$. Warum bedeutet ein Unterschied von zwei $pH$-Einheiten den Faktor $100$ — und warum schmeckt $0{,}10\,\mathrm{mol/L}$ Essigsaeure milder als $0{,}005\,\mathrm{mol/L}$ Salzsaeure? Essigsaeure schmeckt milder als Salzsaeure bei kleinerer Konzentration, weil nur starke Saeuren vollstaendig dissoziieren mit $[H_3O^+] = c_0$ und $pH = -\lg[H_3O^+]$. Schwache Saeuren folgen Ks ueber die Dreisatztabelle mit Pflichtpruefung x durch c0 kleiner 5 Prozent. Tropfenweise Titration zeigt den Sprung am Aequivalenzpunkt mit Indikatorumschlag. Wer Staerke, Weg und Pruefung mit weil und deshalb verbindet, beherrscht jede pH-Rechnung.

### Fachbegriff & Definition

Nach **Broensted** ist eine **Saeure ein Protonendonator**, eine **Base ein Protonenakzeptor**; jede **Protolyse** verlaeuft als Gleichgewicht mit **korrespondierenden Paaren** — etwa $HCl/Cl^-$ oder $CH_3COOH/CH_3COO^-$. Wasser ist **amphoter** und ionisiert sich selbst: Das **Ionenprodukt** $K_w = [H_3O^+] \cdot [OH^-] = 1{,}0 \cdot 10^{-14}\,(\mathrm{mol/L})^2$ bei $25^\circ\mathrm{C}$ erzwingt $pH + pOH = 14$. Der **$pH$-Wert** $pH = -\lg[H_3O^+]$ ist der negative dekadische Massstab: $10^{-3}$ heisst $pH$ $3$, $5 \cdot 10^{-3}$ heisst $pH$ $2{,}30$ — jede Einheit bedeutet Faktor $10$.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Staerke pruefen, Formel waehlen, Naeherung kontrollieren**. Starke Saeuren protolysieren fast vollstaendig — $[H_3O^+] = c_0$, ein $-\lg$ genuegt ($0{,}005\,\mathrm{mol/L}$ $HCl$ zu $pH$ $2{,}30$). Schwache Saeuren protolysieren nur teilweise und verlangen die Dreisatztabelle mit $K_S = \frac{[A^-][H_3O^+]}{[HA]}$ ($0{,}10\,\mathrm{mol/L}$ $HAc$ zu $x = 1{,}34 \cdot 10^{-3}$ und $pH$ $2{,}87$). Erster Schritt bleibt stets die Staerkepruefung, dann erst die Formelwahl, zuletzt $x/c_0 < 5\,\%$ — die Pruefung traegt eigene Punkte.

Klausur-Satz: `Der pH-Wert ist der negative dekadische Logarithmus der Oxoniumionenkonzentration; er ändert sich um eine Einheit, wenn sich die Konzentration um den Faktor 10 ändert.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
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

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Warum schmeckt $0{,}10\,\mathrm{mol/L}$ Essigsaeure milder als $0{,}005\,\mathrm{mol/L}$ Salzsaeure, obwohl zwanzigmal mehr Saeure enthalten ist? Die Menge taeuscht, die Staerke entscheidet. Was bedeutet $pH = -\lg[H_3O^+]$ fuer den Faktor $100$ bei zwei Einheiten, und warum braucht die schwache Saeure $K_S$?

### Spiel-Aufgabe

Spiel-Aufgabe im Kopf-Labor: Gib Tropfen fuer Tropfen $NaOH$ zu und beobachte $pH$-Pfeil und Indikatorfarbe. Verduenne zehnfach und verfolge den $pH$-Sprung um eine Einheit. Notiere $pH$-Kurve gegen Volumen und erklaere in einem Satz mit weil, warum stark und schwach verschiedene Wege verlangen.

### Aha-Moment & Gesetz

Aha-Moment und Gesetz: Die Kausalkette lautet Staerke, Weg, Pruefung. Starke Saeuren dissoziieren vollstaendig, daher gilt $pH = -\lg c_0$; schwache folgen $K_S = \frac{[A^-] \cdot [H_3O^+]}{[HA]}$ ueber die Dreisatztabelle. Es gilt $pH + pOH = 14$ bei $25^\circ\mathrm{C}$ und $K_w = [H_3O^+] \cdot [OH^-] = 1{,}0 \cdot 10^{-14}$. Zehnfache Verduennung hebt den $pH$ um $1$, weil der Logarithmus Potenzen zaehlt.

```diagram
    pH-Skala: 0 sauer |....| 7 neutral |....| 14 basisch
    stark: HCl 0,005 --> [H3O+] = c0 --> pH = 2,30 (Pfeil direkt)
    schwach: HAc 0,10 --> K_S-Tabelle --> [H3O+] = 1,34*10^-3 --> pH = 2,87
    Verduennung x10: pH-Pfeil +1 Einheit (Faktor 10)
    Regel: erst Staerke pruefen, dann Formel waehlen, dann x/c0 pruefen.
```

Klausur-Satz: `Während eine starke Säure in wässriger Lösung nahezu vollständig dissoziiert und pH = -lg(c0) gilt, stellt sich bei einer schwachen Säure ein Protolysegleichgewicht ein, das über K_S berechnet wird.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der pH-Wert wurde von dem dänischen Chemiker Sørensen eingeführt, der damit die Acidität beim Bierbrauen kontrollieren wollte. Weil die Konzentrationen der Oxoniumionen über einen sehr weiten Bereich schwanken, wählte er eine logarithmische Skala statt der rohen Zahlenwerte. Was der Buchstabe p genau bedeutet, ist bis heute umstritten; die Zahlen von 0 bis 14 sind dagegen reine Konvention.

**Bezug zum Konzept**: Die logarithmische pH-Skala wurde gewählt, weil die Oxoniumionenkonzentration über viele Zehnerpotenzen variiert.

## Schritt 4 — ausprobieren: Interaktive Praxis & Titrations-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: titration-lab]

AUFGABE (Spiel-Auftrag, AFB II, 3 Stufen): Stufe 1 Tropfen: Berechne $pH$ fuer $0{,}005\,\mathrm{mol/L}$ $HCl$ und $0{,}10\,\mathrm{mol/L}$ $HAc$ ($K_S = 1{,}8 \cdot 10^{-5}$). Stufe 2 Wippen: Erklaere den kleinen Unterschied trotz zwanzigfacher Menge. Stufe 3 Pruefen: Kontrolliere $x/c_0 < 5\,\%$ mit $pH$-Pfeil.

HILFE:
1. Schritt 1: Stark direkt $pH = -\lg c_0$, schwach ueber Tabelle.
2. Schritt 2: $K_S = \frac{x^2}{c_0 - x}$ mit $x = 1{,}34 \cdot 10^{-3}$.
3. Schritt 3: $x/c_0 = 1{,}3\,\%$ bedeutet Naeherung zulaessig.

MUSTERLOESUNG: $HCl$ dissoziiert vollstaendig, daher $[H_3O^+] = 0{,}005\,\mathrm{mol/L}$ und $pH = -\lg(5{,}0 \cdot 10^{-3}) = 2{,}30$. $HAc$ folgt $K_S = \frac{x^2}{0{,}10 - x}$ mit $x = 1{,}34 \cdot 10^{-3}\,\mathrm{mol/L}$ und $pH = 2{,}87$; die Kontrolle $1{,}3\,\% < 5\,\%$ erlaubt die Naeherung. Obwohl $HAc$ zwanzigfach konzentrierter ist, liegt der $pH$ hoeher, weil nur ca. $1{,}3\,\%$ dissoziiert sind.

Klausur-Satz: `Bei gleicher Ausgangskonzentration liefert eine starke Säure einen deutlich niedrigeren pH-Wert als eine schwache Säure, da nur die starke Säure vollständig protoniert vorliegt.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Wähle erst das Verfahren — (i) Starke-Saeure-Verfahren (sehr kleines $pK_S$, vollstaendige Dissoziation, $pH = -\lg(c_0)$) oder (ii) Schwache-Saeure-Verfahren ($K_S$ gegeben, Gleichgewicht mit Dreisatztabelle) — dann loesen.

AUFGABE A: Eine Salpetersäurelösung (HNO3) hat die Konzentration c0 = 0,010 mol/L. Berechnen Sie den pH-Wert.

AUFGABE B: Eine wässrige Lösung einer schwachen Säure HA (K_S = 4,0 * 10^-7 mol/L) hat die Konzentration c0 = 0,20 mol/L. Berechnen Sie den pH-Wert und begründen Sie, ob die Näherung zulässig ist.

HILFE: A nennt eine starke Säure ohne K_S-Wert; sie dissoziiert vollständig, also Verfahren (i). B nennt ausdrücklich einen K_S-Wert und verlangt eine Näherungsprüfung, also Verfahren (ii). Faustregel: Nur $c_0$ bei starker Saeure verlangt direktes $-\lg$; $K_S$ bei schwacher Saeure verlangt Dreisatztabelle mit Pruefung.

ANTWORT: A erfordert Verfahren (i): HNO3 dissoziiert vollständig, also gilt [H3O+] = c0 = 0,010 mol/L = 1,0 * 10^-2 mol/L und pH = -lg(1,0 * 10^-2) = 2,00. B erfordert Verfahren (ii): Mit K_S = x^2 / (0,20 - x) und der Näherung 0,20 - x ungefähr 0,20 folgt x^2 = 4,0 * 10^-7 * 0,20 = 8,0 * 10^-8, also x = 2,83 * 10^-4 mol/L. Damit ist pH = -lg(2,83 * 10^-4) = 4 - 0,45 = 3,55. Die Kontrolle ergibt x/c0 = 2,83 * 10^-4 / 0,20 = 0,0014, also 0,14 % < 5 %, die Näherung ist zulässig.

Klausur-Satz: `Nur bei vollständiger Dissoziation gilt pH = -lg(c0); bei einer schwachen Säure muss die Oxoniumionenkonzentration zuerst über das Protolysegleichgewicht bestimmt werden.`

## Schritt 6 — check: Selbsttest zu Saeure-Base-Gleichgewichte und pH-Wert
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

## Schritt 7 — szenario: Klausurtransfer: Saeure-Base-Gleichgewichte und pH-Wert
ROLLE: Du bist Praktikant im Schullabor und sollst eine Säure-Base-Titration vorbereiten und auswerten.
SITUATION: Es liegen 100 mL Salzsäure mit c0 = 0,005 mol/L vor. Diese sollen mit Natronlauge (c = 0,02 mol/L) vollständig neutralisiert werden. Berechne das benötigte Volumen der Natronlauge, erläutere die Bedingung am Äquivalenzpunkt und begründe, warum der pH-Wert am Äquivalenzpunkt bei 7 liegt. Verfasse eine zusammenhängende Auswertung (ca. 150 Wörter).
RUBRIC (30 XP): Aufstellen der Neutralisationsgleichung HCl + NaOH -> NaCl + H2O (5 XP) | Stoffmengenansatz c1 * V1 = c2 * V2 und Berechnung V2 = 25 mL (10 XP) | Bedingung am Äquivalenzpunkt n(H3O+) = n(OH-) (8 XP) | Begründung pH = 7 wegen vollständiger Neutralisation durch starke Säure und starke Base (7 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY (Kernzusammenfassung):

Saeure-Base-Aufgaben folgen drei Schritten: Erst Staerke pruefen, dann Formel waehlen, zuletzt Naeherung kontrollieren. Starke Saeuren und Basen rechnen einstufig: $pH = -\lg(c_0)$, $pOH = -\lg(c_0)$, $pH + pOH = 14$. Schwache Partner rechnen ueber das Gleichgewicht: Dreisatztabelle, $K_S = x^2/(c_0 - x)$, Pflichtpruefung $x/c_0 < 5\,\%$. Der $pH$ bleibt logarithmisch: Faktor 10 in der Konzentration heisst eine $pH$-Einheit. Neutralisation entscheidet die Stoffmengengleichheit.
Takeaway-Satz: `Die pH-Berechnung beginnt mit der Entscheidung stark oder schwach; erst danach folgt der passende Ansatz, und jede Näherung wird überprüft.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Logarithmusrechnung in Schritt 4 oder die Entscheidung starke oder schwache Säure in Schritt 5?
2. Planung: Beim nächsten Mal lese ich zuerst, ob ein K_S-Wert gegeben ist, und wähle danach zwischen Ein-Schritt-Formel und Dreisatztabelle.
