---
fach: Chemie
thema: "Chemisches Gleichgewicht und Le Chatelier"
level: 1
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, deuten, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Gleichgewicht]
version: Lesson-v3
---

# Lernreise: Chemisches Gleichgewicht und Le Chatelier (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst den MWG-Ausdruck einer reversiblen Reaktion aufstellen — mit zwei Regeln: Exponent gleich Koeffizient, reine Feststoffe und Fluessigkeiten entfallen.
2. Du kannst mit dem Reaktionsquotienten $Q$ gegen $K_c$ die Richtung der Verschiebung bestimmen ($Q < K_c$ nach rechts, $Q > K_c$ nach links).
3. Du kannst mit dem Prinzip von Le Chatelier Konzentrations-, Druck- und Temperaturaenderungen deuten und begruenden, dass allein die Temperatur $K_c$ veraendert.

### Hook / Phaenomen

Im Schullabor stehen zwei Kolben mit demselben Gasgemisch: Erwaermt man den einen, wird er dunkelbraun, kuehlt man den anderen, wird er fast farblos — obwohl nichts hineingegeben und nichts entnommen wurde. Dahinter steckt $2NO_2 \rightleftharpoons N_2O_4$: Braunes $NO_2$ und farbloses $N_2O_4$ wandeln sich staendig ineinander um. Wie kann ein System reagieren, ohne dass sich am Ende die Konzentrationen aendern? Und warum veraendert Erwaermen die Lage dauerhaft, Druckerhoehung aber nur voruebergehend? Das System reagiert wie eine Wippe mit Drehpunkt Kc: Stoert man Konzentration oder Druck, aendert sich zunaechst nur der Reaktionsquotient Q, das System laeuft nach rechts fuer Q kleiner Kc und nach links fuer Q groesser Kc, bis wieder Q gleich Kc gilt. Allein die Temperatur verschiebt die Zielmarke Kc selbst, Erwaermen bevorzugt die endotherme Richtung. Wer Stoerung, Richtung und Begruendung ueber Q gegen Kc nennt, sichert alle Deutungspunkte auf AFB-II-Niveau.

### Fachbegriff & Definition

Das **dynamische Gleichgewicht** ist der Zustand einer reversiblen Reaktion, in dem **Hin- und Rueckreaktion gleich schnell** ablaufen ($v_{hin} = v_{rueck}$) und die Konzentrationen deshalb konstant bleiben — die Reaktion steht nicht still, sie laeuft nur unsichtbar in beide Richtungen. Seine Lage beschreibt das **Massenwirkungsgesetz (MWG)**: Fuer $aA + bB \rightleftharpoons cC + dD$ gilt $K_c = \frac{[C]^c \cdot [D]^d}{[A]^a \cdot [B]^b}$. Zwei Regeln gehoeren dazu: Der **Exponent ist der stoechiometrische Koeffizient**, und **reine Feststoffe und Fluessigkeiten entfallen**, weil ihre Konzentration konstant ist — etwa gilt fuer $CaCO_3(s) \rightleftharpoons CaO(s) + CO_2(g)$ nur $K_c = [CO_2]$.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Stoerung, Vergleich, Ablauf**. Jede Aenderung von Konzentration oder Druck veraendert zunaechst nur den **Reaktionsquotienten** $Q$, also denselben Ausdruck mit Momentanwerten. Ist $Q < K_c$, fehlen Produkte und das System laeuft nach rechts; ist $Q > K_c$, liegt ein Ueberschuss vor und es laeuft nach links — bis wieder $Q = K_c$ gilt. Allein die **Temperatur veraendert $K_c$ selbst**: Erwaermen bevorzugt die endotherme Richtung, Abkuehlen die exotherme. Wer eine Verschiebung deutet, nennt deshalb immer drei Teile — Stoerung, Richtung und Begruendung ueber $Q$ gegen $K_c$.

Klausur-Satz: `Nach dem Massenwirkungsgesetz ist die Gleichgewichtskonstante K_c der Quotient der mit ihren Koeffizienten potenzierten Gleichgewichtskonzentrationen von Produkten und Edukten; reine Feststoffe und Flüssigkeiten werden nicht aufgenommen.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Zwei Buchstaben entscheiden ueber die Richtung jeder Gleichgewichtsreaktion: $Q$ und $K_c$. In der Ammoniak-Anlage wird $NH_3$ staendig abgezogen, obwohl die Reaktion $N_2 + 3H_2 \rightleftharpoons 2NH_3$ laengst laeuft — warum kommt sie nie zum Stillstand? Und warum hilft Abkuehlen der Ausbeute, aber nicht der Geschwindigkeit? Ohne fuenf praezise Begriffe bleibt jede Klausurantwort ein Ratespiel.

### Fachbegriffe & Definitionen

- **Dynamisches Gleichgewicht:** Zustand mit $v_{hin} = v_{rueck}$; die Konzentrationen bleiben konstant, obwohl Hin- und Rueckreaktion weiterlaufen — kein Stillstand, sondern unsichtbarer Ausgleich.
- **Massenwirkungsgesetz (MWG):** Vorschrift $K_c = \frac{[C]^c \cdot [D]^d}{[A]^a \cdot [B]^b}$; Exponenten sind die Koeffizienten, reine Feststoffe und Fluessigkeiten entfallen.
- **Gleichgewichtskonstante $K_c$:** Haengt allein von der Temperatur ab; $K_c \gg 1$ bevorzugt die Produkte, $K_c \ll 1$ die Edukte — sie ist die Zielmarke des Systems.
- **Reaktionsquotient $Q$:** Derselbe Ausdruck mit beliebigen Momentankonzentrationen; $Q < K_c$ treibt nach rechts, $Q > K_c$ nach links, $Q = K_c$ bedeutet Gleichgewicht.
- **Prinzip von Le Chatelier:** Nach einer Stoerung weicht das System so aus, dass es die Stoerung abschwaecht — Eduktzugabe treibt nach rechts, Druckerhoehung auf die Seite mit weniger Gasteilchen, Erwaermen in die endotherme Richtung.

### Wirkungsgefuege / Modell

Die Begriffe greifen ineinander: Das **MWG** liefert den Ausdruck, $K_c$ die temperaturabhaengige Zielmarke und $Q$ den Momentanwert. **Le Chatelier** ist die qualitative Abkuerzung derselben Logik — jede Stoerung veraendert $Q$, das System laeuft, bis $Q$ wieder gleich $K_c$ ist. In der Klausur gehoeren beide Ebenen zusammen: erst die Richtung nach Le Chatelier nennen, dann mit $Q$ gegen $K_c$ begruenden. Nur die Temperatur verschiebt die Zielmarke $K_c$ selbst; Konzentration und Druck veraendern lediglich den Abstand $Q$ zu $K_c$.

Klausur-Satz: `Ein dynamisches Gleichgewicht liegt vor, wenn die Geschwindigkeiten der Hin- und Rückreaktion gleich groß sind und die Konzentrationen konstant bleiben.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Warum wird braunes $NO_2$ beim Abkuehlen fast farblos, obwohl nichts entnommen wird, und warum arbeitet die Ammoniak-Anlage bei hohem Druck, obwohl hohe Temperatur die Ausbeute senkt? Das System reagiert wie eine Wippe: Druck auf einer Seite, Temperatur auf der anderen. Wo liegt der Drehpunkt $K_c$?

### Spiel-Aufgabe

Spiel-Aufgabe im Kopf-Labor: Erhoehe im Gedanken-Simulator den Druck von $1\,\mathrm{bar}$ auf $200\,\mathrm{bar}$ und danach die Temperatur von $400^\circ\mathrm{C}$ auf $550^\circ\mathrm{C}$. Beobachte die Verschiebungspfeile nach rechts oder links sowie $Q$ gegen $K_c$. Notiere Gasteilchenzahl $4$ gegen $2$ und Ausbeute. Erklaere in einem Satz mit weil, warum nur die Temperatur $K_c$ veraendert.

### Aha-Moment & Gesetz

Aha-Moment und Gesetz: Die Kausalkette lautet Stoerung, Vergleich, Ablauf. Jede Stoerung aendert zuerst $Q$, das System laeuft, bis $Q = K_c$ gilt. Es gilt $K_c = \frac{[C]^c \cdot [D]^d}{[A]^a \cdot [B]^b}$; ist $Q < K_c$, laeuft es nach rechts, ist $Q > K_c$, nach links. Druck bevorzugt die Seite mit weniger Gasteilchen, Waerme die endotherme Richtung. Le Chatelier ist die Wippe, $Q$ gegen $K_c$ die Waage dahinter.

```diagram
    N2 + 3H2 <==> 2NH3 (exotherm, 4 gegen 2 Teilchen)
    Druck hoch (200 bar)  --Pfeil nach rechts--> Ausbeute hoch, Kc gleich
    Temperatur hoch       --Pfeil nach links---> Ausbeute niedrig, Kc sinkt
    Edukt plus            --Pfeil nach rechts--> Q < Kc, dann Ausgleich
    Katalysator           --kein Pfeil---------> nur schneller, Lage gleich
    Regel: Q < Kc rechts, Q > Kc links, Q = Kc Gleichgewicht.
```

Klausur-Satz: `Eine Änderung der Konzentration oder des Drucks verändert K_c nicht, sondern nur den Reaktionsquotienten Q; allein eine Temperaturänderung verändert K_c selbst.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Bei der industriellen Ammoniaksynthese nach dem Haber-Bosch-Verfahren wird das Gleichgewicht N2 + 3 H2 <-> 2 NH3 gezielt beeinflusst. Da die Hinreaktion exotherm ist, verschiebt eine hohe Temperatur das Gleichgewicht nach links und senkt die Ausbeute. Trotzdem arbeitet die Industrie bei mehreren hundert Grad, weil die Reaktion sonst viel zu langsam läuft; hoher Druck und ein Katalysator lösen diesen Konflikt.

**Bezug zum Konzept**: Das Haber-Bosch-Verfahren zeigt, dass Ausbeute und Reaktionsgeschwindigkeit nach dem Prinzip von Le Chatelier gegeneinander abgewogen werden müssen.

## Schritt 4 — ausprobieren: Interaktive Praxis & Gleichgewichts-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: le-chatelier-sim]

AUFGABE (Spiel-Auftrag, AFB II, 3 Stufen): Stufe 1 Wippen: Fuer $H_2 + I_2 \rightleftharpoons 2HI$ mit $K_c = 64$ starten $0{,}50\,\mathrm{mol/L}$ je Edukt. Schaetze die Lage. Stufe 2 Rechnen: Stelle die Dreisatztabelle mit $-x$/$-x$/$+2x$ auf und loese ueber Wurzelziehen. Stufe 3 Pruefen: Kontrolliere mit $Q = K_c$ und nenne den Umsatz.

HILFE:
1. Schritt 1: $K_c = \frac{[HI]^2}{[H_2] \cdot [I_2]}$ aufstellen.
2. Schritt 2: Gleichgewicht $0{,}50 - x$/$0{,}50 - x$/$2x$ einsetzen.
3. Schritt 3: Wurzel ziehen $\frac{2x}{0{,}50 - x} = 8$, dann $x = 0{,}40$.

MUSTERLOESUNG: Mit Start $0{,}50$/$0{,}50$/$0$ und Aenderung $-x$/$-x$/$+2x$ gilt im Gleichgewicht $\frac{(2x)^2}{(0{,}50 - x)^2} = 64$. Wurzelziehen liefert $\frac{2x}{0{,}50 - x} = 8$, also $x = 0{,}40\,\mathrm{mol/L}$. Damit ist $c(HI) = 0{,}80\,\mathrm{mol/L}$ und $c(H_2) = c(I_2) = 0{,}10\,\mathrm{mol/L}$; die Kontrolle $\frac{0{,}80^2}{0{,}10 \cdot 0{,}10} = 64$ bestaetigt $Q = K_c$. Der Umsatz betraegt $80\,\%$, weil $K_c \gg 1$ die Produkte bevorzugt.

Klausur-Satz: `Zur Berechnung von Gleichgewichtskonzentrationen wird eine Dreisatztabelle verwendet, deren Änderungszeile nach den stöchiometrischen Koeffizienten angesetzt und anschließend in das Massenwirkungsgesetz eingesetzt wird.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Wähle erst das Verfahren — (i) MWG-Verfahren (Konzentrationen oder $K_c$ gegeben, Zahlenwert oder Umsatz gesucht) oder (ii) Le-Chatelier-Verfahren (eine Stoerung gegeben, Richtung gesucht) — dann loesen.

AUFGABE A: In einem Gefäß liegen bei 500 °C die Gleichgewichtskonzentrationen c(H2) = 0,20 mol/L, c(I2) = 0,20 mol/L und c(HI) = 1,60 mol/L vor. Berechnen Sie K_c und deuten Sie den Zahlenwert.

AUFGABE B: Für die exotherme Reaktion N2 + 3 H2 <-> 2 NH3 wird die Temperatur des Reaktionsgemischs erhöht. Geben Sie an, in welche Richtung sich das Gleichgewicht verschiebt, und begründen Sie dies.

HILFE: A nennt konkrete Gleichgewichtskonzentrationen und verlangt einen Zahlenwert, also Verfahren (i). B nennt nur eine Temperaturänderung und fragt nach der Richtung, also Verfahren (ii). Faustregel: Zahlenwerte verlangen das MWG-Verfahren, eine beschriebene Stoerung verlangt Le Chatelier.

ANTWORT: A erfordert Verfahren (i): Es gilt K_c = [HI]^2 / ([H2] * [I2]) = (1,60)^2 / (0,20 * 0,20) = 2,56 / 0,04 = 64. Da K_c deutlich größer als 1 ist, liegt das Gleichgewicht auf der Produktseite, die Bildung von HI wird also stark begünstigt. B erfordert Verfahren (ii): Die Hinreaktion ist exotherm. Nach dem Prinzip von Le Chatelier weicht das System der Temperaturerhöhung aus, indem es die endotherme Richtung bevorzugt, also die Rückreaktion; das Gleichgewicht verschiebt sich nach links, und K_c sinkt, weil nur die Temperatur K_c verändert.

Klausur-Satz: `Wird ein exothermes Gleichgewicht erwärmt, verschiebt es sich in Richtung der Edukte, da das System der Erwärmung durch die endotherme Rückreaktion entgegenwirkt.`

## Schritt 6 — check: Verständnisprüfung

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Welche Stoffe werden nicht in den Ausdruck für K_c aufgenommen? | ANTWORT: Reine Feststoffe und reine Flüssigkeiten, weil ihre Konzentration konstant ist.
FRAGE: Was bedeutet Q < K_c für die Reaktionsrichtung? | ANTWORT: Es liegen zu wenige Produkte vor; die Reaktion läuft bevorzugt in Richtung der Produkte (nach rechts).
FRAGE: Welche Größe verändert K_c selbst? | ANTWORT: Nur eine Temperaturänderung; Konzentration, Druck und Katalysator verändern K_c nicht.

Klausur-Satz: `Eine Änderung der Konzentration oder des Drucks verändert nur Q, während allein die Temperatur K_c verändert.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Ein Katalysator verschiebe das Gleichgewicht nach rechts und erhoehe die Ausbeute.
   Korrektur: Der Katalysator senkt nur die Aktivierungsenergie und beschleunigt Hin- und Rueckreaktion gleich stark; er erreicht das Gleichgewicht schneller, veraendert aber weder die Lage noch $K_c$. Mehr Ausbeute gelingt nur ueber Le Chatelier (Produkt entfernen, Druck oder Temperatur anpassen).
   Korrektur-Satz: `Ein Katalysator beschleunigt Hin- und Rückreaktion gleichermaßen und verändert weder die Gleichgewichtslage noch K_c.`

2. Fehlannahme: Jede Verschiebung des Gleichgewichts bedeute, dass sich $K_c$ geaendert habe.
   Korrektur: Beides ist zu trennen. Konzentration oder Druck veraendern nur $Q$; die Verschiebung stellt $Q = K_c$ wieder her, $K_c$ selbst bleibt. Allein die Temperatur veraendert $K_c$. Wer beides vermischt, verliert Begruendungspunkte.
   Korrektur-Satz: `Das Gleichgewicht verschiebt sich so lange, bis Q wieder gleich K_c ist; nur eine Temperaturänderung verändert K_c selbst.`

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist Verfahrenstechniker in einem Werk, das nach dem Haber-Bosch-Verfahren Ammoniak herstellt.
SITUATION: Für die exotherme Reaktion N2(g) + 3 H2(g) <-> 2 NH3(g) soll die Ammoniak-Ausbeute erhöht werden. Die Betriebsleitung schlägt vor, die Temperatur deutlich zu erhöhen und den Druck abzusenken. Beurteile diesen Vorschlag in einer zusammenhängenden Stellungnahme (ca. 150 Wörter) mit dem Prinzip von Le Chatelier und begründe, welche Bedingungen tatsächlich günstig sind.
RUBRIC (30 XP): Analyse der Temperaturwirkung — exotherm, Erwärmen verschiebt nach links (8 XP) | Analyse der Druckwirkung — 4 Gasteilchen links gegen 2 rechts, Druckabsenkung verschiebt nach links (8 XP) | Gegenentwurf mit korrekten Bedingungen — hoher Druck, mäßige Temperatur, Katalysator (8 XP) | Kriteriengeleitetes Urteil mit Abwägung von Ausbeute und Reaktionsgeschwindigkeit (6 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY (Kernzusammenfassung):

Gleichgewichtsaufgaben folgen zwei Verfahren: Zahlenwerte verlangen das MWG-Verfahren (Ausdruck aufstellen, Dreisatztabelle, nach $x$ loesen, Umsatz berechnen); eine Stoerung verlangt Le Chatelier (Eduktzugabe treibt zur Gegenseite, Druckerhoehung zur Seite mit weniger Gasteilchen, Erwaermen zur endothermen Seite). Die Trennlinie bleibt: Konzentration und Druck aendern nur $Q$, allein die Temperatur aendert $K_c$. Ein grosses $K_c$ bevorzugt die Produkte, ein Katalysator beschleunigt nur.
Takeaway-Satz: `Das Gleichgewicht ist dynamisch; es verschiebt sich so lange, bis Q wieder gleich K_c ist, und nur die Temperatur verändert K_c selbst.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — das Aufstellen und Lösen der Gleichgewichtstabelle (Schritt 4) oder die Wahl zwischen MWG- und Le-Chatelier-Verfahren (Schritt 5)?
2. Planung: Beim nächsten Mal prüfe ich zuerst, ob die Aufgabe einen Zahlenwert verlangt (dann MWG) oder nur eine Richtung nennt (dann Le Chatelier), und schreibe erst danach den Ansatz.
