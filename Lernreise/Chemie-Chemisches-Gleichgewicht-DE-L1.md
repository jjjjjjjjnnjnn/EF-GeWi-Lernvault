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

## Schritt 1 — entdecken
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst den MWG-Ausdruck einer reversiblen Reaktion aufstellen — mit zwei Regeln: Exponent gleich Koeffizient, reine Feststoffe und Fluessigkeiten entfallen.
2. Du kannst mit dem Reaktionsquotienten $Q$ gegen $K_c$ die Richtung der Verschiebung bestimmen ($Q < K_c$ nach rechts, $Q > K_c$ nach links).
3. Du kannst mit dem Prinzip von Le Chatelier Konzentrations-, Druck- und Temperaturaenderungen deuten und begruenden, dass allein die Temperatur $K_c$ veraendert.

### Hook / Phaenomen

Im Schullabor stehen zwei Kolben mit demselben Gasgemisch: Erwaermt man den einen, wird er dunkelbraun, kuehlt man den anderen, wird er fast farblos — obwohl nichts hineingegeben und nichts entnommen wurde. Dahinter steckt $2NO_2 \rightleftharpoons N_2O_4$: Braunes $NO_2$ und farbloses $N_2O_4$ wandeln sich staendig ineinander um. Wie kann ein System reagieren, ohne dass sich am Ende die Konzentrationen aendern? Und warum veraendert Erwaermen die Lage dauerhaft, Druckerhoehung aber nur voruebergehend?

### Fachbegriff & Definition

Das **dynamische Gleichgewicht** ist der Zustand einer reversiblen Reaktion, in dem **Hin- und Rueckreaktion gleich schnell** ablaufen ($v_{hin} = v_{rueck}$) und die Konzentrationen deshalb konstant bleiben — die Reaktion steht nicht still, sie laeuft nur unsichtbar in beide Richtungen. Seine Lage beschreibt das **Massenwirkungsgesetz (MWG)**: Fuer $aA + bB \rightleftharpoons cC + dD$ gilt $K_c = \frac{[C]^c \cdot [D]^d}{[A]^a \cdot [B]^b}$. Zwei Regeln gehoeren dazu: Der **Exponent ist der stoechiometrische Koeffizient**, und **reine Feststoffe und Fluessigkeiten entfallen**, weil ihre Konzentration konstant ist — etwa gilt fuer $CaCO_3(s) \rightleftharpoons CaO(s) + CO_2(g)$ nur $K_c = [CO_2]$.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Stoerung, Vergleich, Ablauf**. Jede Aenderung von Konzentration oder Druck veraendert zunaechst nur den **Reaktionsquotienten** $Q$, also denselben Ausdruck mit Momentanwerten. Ist $Q < K_c$, fehlen Produkte und das System laeuft nach rechts; ist $Q > K_c$, liegt ein Ueberschuss vor und es laeuft nach links — bis wieder $Q = K_c$ gilt. Allein die **Temperatur veraendert $K_c$ selbst**: Erwaermen bevorzugt die endotherme Richtung, Abkuehlen die exotherme. Wer eine Verschiebung deutet, nennt deshalb immer drei Teile — Stoerung, Richtung und Begruendung ueber $Q$ gegen $K_c$.

Klausur-Satz: `Nach dem Massenwirkungsgesetz ist die Gleichgewichtskonstante K_c der Quotient der mit ihren Koeffizienten potenzierten Gleichgewichtskonzentrationen von Produkten und Edukten; reine Feststoffe und Flüssigkeiten werden nicht aufgenommen.`

## Schritt 2 — entdecken
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

## Schritt 3 — entdecken
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Die Haber-Bosch-Anlage arbeitet bei ueber 400 Grad Celsius, obwohl hohe Temperatur die Ammoniak-Ausbeute senkt — ein scheinbarer Widerspruch, der ueber Millionen Tonnen Duenger entscheidet. Er loest sich nur, wenn man Ausbeute und Geschwindigkeit getrennt denkt und jede Stoerung sauber durch den $Q$-$K_c$-Vergleich hindurchdenkt.

### Fachbegriff & Definition

Der **Zielkonflikt der Ammoniaksynthese** lautet: Die Hinreaktion $N_2 + 3H_2 \rightleftharpoons 2NH_3$ ist **exotherm** ($\Delta H < 0$), daher verschiebt Erwaermen das Gleichgewicht nach links und **senkt $K_c$** — die Ausbeute sinkt. Gleichzeitig verlangt die **Reaktionsgeschwindigkeit** hohe Temperatur, weil sonst kaum wirksame Zusammenstoesse stattfinden. Die Industrie waehlt deshalb einen Kompromiss: mittlerer Temperaturbereich plus **hoher Druck** (4 gegen 2 Gasteilchen, Verschiebung nach rechts) plus **Katalysator**, der nur die Zeit bis $Q = K_c$ verkuerzt, ohne die Lage zu veraendern.

### Wirkungsgefuege / Modell

Denke in Kausalkette: **Stoerung, Mengenreaktion, Kennzahl**. Edukt zugeben oder Produkt entziehen senkt $Q$ unter $K_c$ — Ablauf nach rechts bei unveraendertem $K_c$. Druck erhoehen bevorzugt die Seite mit weniger Gasteilchen — $Q$ passt sich an, $K_c$ bleibt. Temperatur erhoehen veraendert $K_c$ selbst — bei exothermer Hinreaktion sinkt $K_c$, das System laeuft nach links. Der **Katalysator** aendert weder $Q$ noch $K_c$, sondern nur die Geschwindigkeit, mit der $Q$ wieder gleich $K_c$ wird.

```diagram
  N2 + 3 H2  <==>  2 NH3      (Hinreaktion exotherm, dH < 0)
   Edukte: 4 Gasteilchen       Produkt: 2 Gasteilchen

   Stoerung (Stress)           Antwort des Systems      K_c?
   -------------------------------------------------  ------
   c(N2) oder c(H2) erhoehen   -> nach rechts            unveraendert
   c(NH3) entziehen            -> nach rechts            unveraendert
   Druck erhoehen              -> nach rechts (weniger   unveraendert
                                  Gasteilchen)
   Temperatur erhoehen         -> nach links (endotherme sinkt
                                  Richtung bevorzugt)
   Katalysator zugeben         -> nur schneller, Lage    unveraendert
                                  unveraendert

   Regel: Q < K_c nach rechts, Q > K_c nach links, Q = K_c Gleichgewicht
```

Klausur-Satz: `Eine Änderung der Konzentration oder des Drucks verändert K_c nicht, sondern nur den Reaktionsquotienten Q; allein eine Temperaturänderung verändert K_c selbst.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Bei der industriellen Ammoniaksynthese nach dem Haber-Bosch-Verfahren wird das Gleichgewicht N2 + 3 H2 <-> 2 NH3 gezielt beeinflusst. Da die Hinreaktion exotherm ist, verschiebt eine hohe Temperatur das Gleichgewicht nach links und senkt die Ausbeute. Trotzdem arbeitet die Industrie bei mehreren hundert Grad, weil die Reaktion sonst viel zu langsam läuft; hoher Druck und ein Katalysator lösen diesen Konflikt.

**Bezug zum Konzept**: Das Haber-Bosch-Verfahren zeigt, dass Ausbeute und Reaktionsgeschwindigkeit nach dem Prinzip von Le Chatelier gegeneinander abgewogen werden müssen.

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: gleichgewicht]

AUFGABE (berechnen, AFB II): Für die Reaktion H2(g) + I2(g) <-> 2 HI(g) gilt bei einer bestimmten Temperatur K_c = 64. Es werden H2 und I2 mit c0 = 0,50 mol/L eingesetzt, HI ist zu Beginn nicht vorhanden. Bestimmen Sie mithilfe einer Gleichgewichtstabelle die Gleichgewichtskonzentration von HI und den Umsetzungsgrad von H2.

HILFE:
1. Schritt 1: Schreibe die Reaktionsgleichung und den Ausdruck für K_c = [HI]^2 / ([H2] * [I2]).
2. Schritt 2: Erstelle die Dreisatztabelle (Start / Änderung / Gleichgewicht); die Änderungszeile folgt den Koeffizienten: -x / -x / +2x.
3. Schritt 3: Setze die Gleichgewichtskonzentrationen in K_c ein und löse durch Wurzelziehen.
4. Schritt 4: Berechne den Umsetzungsgrad als x / c0.

MUSTERLOESUNG: Die Dreisatztabelle lautet: Start 0,50 / 0,50 / 0; Änderung -x / -x / +2x; Gleichgewicht 0,50 - x / 0,50 - x / 2x. Einsetzen ergibt (2x)^2 / (0,50 - x)^2 = 64. Da beide Seiten quadratisch sind, darf man die Wurzel ziehen: 2x / (0,50 - x) = 8, also 2x = 4 - 8x, woraus 10x = 4 und damit x = 0,40 mol/L folgt. Die Gleichgewichtskonzentration beträgt c(HI) = 2x = 0,80 mol/L, und für H2 bzw. I2 gilt c = 0,50 - 0,40 = 0,10 mol/L. Kontrolle: 0,80^2 / (0,10 * 0,10) = 0,64 / 0,01 = 64, also gleich K_c. Der Umsetzungsgrad von H2 ist x / c0 = 0,40 / 0,50 = 0,80, das heißt 80 %.

Klausur-Satz: `Zur Berechnung von Gleichgewichtskonzentrationen wird eine Dreisatztabelle verwendet, deren Änderungszeile nach den stöchiometrischen Koeffizienten angesetzt und anschließend in das Massenwirkungsgesetz eingesetzt wird.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Wähle erst das Verfahren — (i) MWG-Verfahren (Konzentrationen oder $K_c$ gegeben, Zahlenwert oder Umsatz gesucht) oder (ii) Le-Chatelier-Verfahren (eine Stoerung gegeben, Richtung gesucht) — dann loesen.

AUFGABE A: In einem Gefäß liegen bei 500 °C die Gleichgewichtskonzentrationen c(H2) = 0,20 mol/L, c(I2) = 0,20 mol/L und c(HI) = 1,60 mol/L vor. Berechnen Sie K_c und deuten Sie den Zahlenwert.

AUFGABE B: Für die exotherme Reaktion N2 + 3 H2 <-> 2 NH3 wird die Temperatur des Reaktionsgemischs erhöht. Geben Sie an, in welche Richtung sich das Gleichgewicht verschiebt, und begründen Sie dies.

HILFE: A nennt konkrete Gleichgewichtskonzentrationen und verlangt einen Zahlenwert, also Verfahren (i). B nennt nur eine Temperaturänderung und fragt nach der Richtung, also Verfahren (ii). Faustregel: Zahlenwerte verlangen das MWG-Verfahren, eine beschriebene Stoerung verlangt Le Chatelier.

ANTWORT: A erfordert Verfahren (i): Es gilt K_c = [HI]^2 / ([H2] * [I2]) = (1,60)^2 / (0,20 * 0,20) = 2,56 / 0,04 = 64. Da K_c deutlich größer als 1 ist, liegt das Gleichgewicht auf der Produktseite, die Bildung von HI wird also stark begünstigt. B erfordert Verfahren (ii): Die Hinreaktion ist exotherm. Nach dem Prinzip von Le Chatelier weicht das System der Temperaturerhöhung aus, indem es die endotherme Richtung bevorzugt, also die Rückreaktion; das Gleichgewicht verschiebt sich nach links, und K_c sinkt, weil nur die Temperatur K_c verändert.

Klausur-Satz: `Wird ein exothermes Gleichgewicht erwärmt, verschiebt es sich in Richtung der Edukte, da das System der Erwärmung durch die endotherme Rückreaktion entgegenwirkt.`

## Schritt 6 — check

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

## Schritt 7 — szenario

ROLLE: Du bist Verfahrenstechniker in einem Werk, das nach dem Haber-Bosch-Verfahren Ammoniak herstellt.
SITUATION: Für die exotherme Reaktion N2(g) + 3 H2(g) <-> 2 NH3(g) soll die Ammoniak-Ausbeute erhöht werden. Die Betriebsleitung schlägt vor, die Temperatur deutlich zu erhöhen und den Druck abzusenken. Beurteile diesen Vorschlag in einer zusammenhängenden Stellungnahme (ca. 150 Wörter) mit dem Prinzip von Le Chatelier und begründe, welche Bedingungen tatsächlich günstig sind.
RUBRIC (30 XP): Analyse der Temperaturwirkung — exotherm, Erwärmen verschiebt nach links (8 XP) | Analyse der Druckwirkung — 4 Gasteilchen links gegen 2 rechts, Druckabsenkung verschiebt nach links (8 XP) | Gegenentwurf mit korrekten Bedingungen — hoher Druck, mäßige Temperatur, Katalysator (8 XP) | Kriteriengeleitetes Urteil mit Abwägung von Ausbeute und Reaktionsgeschwindigkeit (6 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Gleichgewichtsaufgaben folgen zwei Verfahren: Zahlenwerte verlangen das MWG-Verfahren (Ausdruck aufstellen, Dreisatztabelle, nach $x$ loesen, Umsatz berechnen); eine Stoerung verlangt Le Chatelier (Eduktzugabe treibt zur Gegenseite, Druckerhoehung zur Seite mit weniger Gasteilchen, Erwaermen zur endothermen Seite). Die Trennlinie bleibt: Konzentration und Druck aendern nur $Q$, allein die Temperatur aendert $K_c$. Ein grosses $K_c$ bevorzugt die Produkte, ein Katalysator beschleunigt nur.
Takeaway-Satz: `Das Gleichgewicht ist dynamisch; es verschiebt sich so lange, bis Q wieder gleich K_c ist, und nur die Temperatur verändert K_c selbst.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — das Aufstellen und Lösen der Gleichgewichtstabelle (Schritt 4) oder die Wahl zwischen MWG- und Le-Chatelier-Verfahren (Schritt 5)?
2. Planung: Beim nächsten Mal prüfe ich zuerst, ob die Aufgabe einen Zahlenwert verlangt (dann MWG) oder nur eine Richtung nennt (dann Le Chatelier), und schreibe erst danach den Ansatz.
