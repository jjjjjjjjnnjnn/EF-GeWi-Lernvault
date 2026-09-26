---
fach: Physik
thema: "Mechanische Energieerhaltung"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, begruenden, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Mechanik]
version: Lesson-v3
---

# Lernreise: Mechanische Energieerhaltung (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. $E_{kin} = 0{,}5 m v^2$, $E_{pot} = m g h$ und $E_{spann} = 0{,}5 D s^2$ je mit Einheit $\mathrm{J}$ nennen.
2. Reibungsfrei per $E_{vor} = E_{nach}$ zu $v = \sqrt{2 g h}$ und $s = \sqrt{2 m g h/D}$ loesen.
3. Dissipation per $E_{vor} = E_{nach}+W_R$ pruefen und ein bedingtes Urteil mit weil-Satz formulieren.

### Hook / Phaenomen

Im Jahr 2010 blieb eine Achterbahn vor dem Looping stehen — zu wenig Starthoehe, zu viel Reibung. Die Ingenieure hatten $v = \sqrt{2 g h}$ gerechnet, doch die Bahn frass Energie. Der Wagen mit $v = 4{,}0\,\mathrm{m/s}$ am Fuss und $s = 0{,}40\,\mathrm{m}$ Federweg erzaehlt dasselbe Raetsel: Woher kennt die Energie Anfang und Ende, ohne den Weg dazwischen zu kennen — und wann bricht $E_{vor} = E_{nach}$ zusammen?

### Fachbegriff & Definition

Fuer reibungsfreie Systeme gilt: **In einem System mit nur konservativen Kraeften bleibt die Summe aus kinetischer, potenzieller und Spannenergie konstant**. Es gilt **$E_{kin} = 0{,}5 m v^2$, $E_{pot} = m g h$ und $E_{spann} = 0{,}5 D s^2$ in $\mathrm{J}$**. Mit **Reibung wird die dissipierte Energie $W_R$ abgezogen: $E_{vor} = E_{nach}+W_R$**.

### Wirkungsgefuege / Modell

Der Mechanismus vergleicht nur Anfang und Ende: Oben $E_{pot} = m g h$ mit $v = 0$, unten $E_{kin} = 0{,}5 m v^2$ mit $h = 0$. Gleichsetzen $m g h = 0{,}5 m v^2$ kuerzt $m$ und liefert $v = \sqrt{2 g h}$ — Winkel und Verlauf fallen heraus. Mit Feder am Ende $m g h = 0{,}5 D s^2$ zu $s = \sqrt{2 m g h/D}$. Mit Reibung $E_{vor} = E_{nach}+W_R$ als bedingte Bilanz.

Schritt A: Nullniveau waehlen und $E_{vor}$ auflisten.
Schritt B: $E_{nach}$ auflisten und gleichsetzen.
Schritt C: Nach $v$, $h$ oder $s$ aufloesen und Bedingung nennen.

Klausur-Satz: `In einem reibungsfreien System, in dem nur konservative Kraefte wirken, bleibt die Summe aus kinetischer, potenzieller und Spannenergie zu jedem Zeitpunkt konstant.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

### Hook / Phaenomen

Ein Wagen rollt die Rampe hinab — die Stoppuhr fragt nach Zeit, die Energie fragt nur nach Hoehe. Zwei Wege, zwei Antworten: Kraft ueber $F = m a$ braucht Sekunden, Energie ueber $E$ braucht nur Meter. Welche fuenf Bausteine entscheiden, wann der kurze Energieweg erlaubt ist?

### Fachbegriffe & Definitionen

- **Kinetische Energie:** $E_{kin} = 0{,}5 m v^2$ in $\mathrm{J}$; waechst quadratisch mit $v$.
- **Lageenergie:** $E_{pot} = m g h$ in $\mathrm{J}$; proportional zu $h$ ueber Nullniveau.
- **Spannenergie:** $E_{spann} = 0{,}5 D s^2$ in $\mathrm{J}$; Federhaerte $D$ mal Dehnung $s$.
- **Energieerhaltung:** Ohne Verlust $E_{vor} = E_{nach}$; Energie wird nur umgewandelt.
- **Dissipation:** Umwandlung in innere Energie per Reibung; sie wird abgezogen.

### Wirkungsgefuege / Modell

Die Kette bilanziert vorher gegen nachher: Erst alle Formen links und rechts auflisten, dann $W_R$ abziehen oder null setzen, dann loesen. Der Arbeitssatz $W_{ges} = \Delta E_{kin}$ mit $W = F s \cos(\alpha)$ verbindet Kraft- und Energiesicht. Wer $W_R$ vergisst, ueberschaetzt $v$ — der klassische Looping-Fehler. Die Bedingung reibungsfrei steht daher vor jeder $v = \sqrt{2 g h}$-Zeile.

Klausur-Satz: `Bei der Energiebilanz werden alle Energieformen vor und nach dem Vorgang aufgefuehrt; bei Reibung wird die dissipierte Energie abgezogen.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

### Hook / Phaenomen

Ein Wagen startet in $h = 0{,}82\,\mathrm{m}$ und erreicht unten $v = 4{,}0\,\mathrm{m/s}$ — passt das zu $v = \sqrt{2 g h}$? Danach drueckt er eine Feder $s = 0{,}40\,\mathrm{m}$ ein. Zwei Messungen, eine Bilanz: $m g h$ zu $0{,}5 m v^2$ zu $0{,}5 D s^2$. Wie wird aus drei Energien eine Geschwindigkeit ohne einzige Zeitmessung — und warum beweist $v = \sqrt{2 g h}$ zugleich die Unabhaengigkeit vom Weg?

### Fachbegriff & Definition

Beim **reibungsfreien Herabgleiten wird gesamte Lageenergie in Bewegung verwandelt: $m g h = 0{,}5 m v^2$ und damit $v = \sqrt{2 g h}$**. Mit **Feder am Ende gilt $m g h = 0{,}5 D s^2$** zur maximalen Spannung. Die **Masse kuerzt sich bei $v$ heraus** — schwer und leicht fallen gleich schnell.

### Wirkungsgefuege / Modell

Der Tiefenweg kuerzt $m$: $m \cdot 9{,}81 \cdot 0{,}82 = 0{,}5 m v^2$ zu $v = \sqrt{2 \cdot 9{,}81 \cdot 0{,}82} \approx 4{,}0\,\mathrm{m/s}$. Federprobe $D = m g h / (0{,}5 s^2)$ zu $s = 0{,}40\,\mathrm{m}$ konsistent. Winkel und Rampenlaenge kommen nicht vor — genau darin liegt die Staerke: Der Energieweg ueberspringt alle Zwischenmomente. Mit Reibung $E_{vor} = E_{nach}+W_R$ als Korrektur statt Ersatz.

Schritt A: $h$ und Nullniveau festlegen und $m g h$ bilden.
Schritt B: $m$ kuerzen und $v = \sqrt{2 g h}$ ziehen.
Schritt C: Feder per $0{,}5 D s^2$ oder Reibung per $W_R$ ergaenzen.

```diagram
    oben:  v = 0,  h > 0
      E_pot = m*g*h      E_kin = 0
           |
           |  (Umwandlung, ohne Reibung)
           v
    unten: h = 0,  v > 0
      E_pot = 0          E_kin = 0.5*m*v^2

    Energiebilanz:  E_pot + E_kin = konstant
                    m*g*h = 0.5*m*v^2  =>  v = sqrt(2*g*h)

    mit Feder am Ende:  m*g*h = 0.5*D*s^2  =>  s = sqrt(2*m*g*h/D)
    mit Reibung:        E_vor = E_nach + W_Reibung
    Zahlen: v = 4.0 m/s, s = 0.40 m konsistent
```

Klausur-Satz: `Da beim reibungsfreien Herabgleiten die gesamte Lageenergie in Bewegungsenergie umgewandelt wird, gilt m*g*h = 0.5*m*v^2 und damit v = sqrt(2*g*h).`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Dass Energie weder erzeugt noch vernichtet, sondern nur umgewandelt wird, wurde nicht von einem einzigen Genie entdeckt: In den 1840er Jahren formulierten mehrere Forscher in verschiedenen Laendern diesen Satz fast gleichzeitig und unabhaengig voneinander — ein Arzt, ein Brauereibesitzer und ein Physiologe kamen auf dieselbe Idee. So entstand ein Naturgesetz, das heute zu den tragenden Saeulen der gesamten Physik gehoert.

**Bezug zum Konzept**: `Die Energieerhaltung wurde unabhaengig von mehreren Forschern gefunden, weil sie in sehr vielen Systemen gilt — genau darum ist E_vor = E_nach so universell.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: balance]

AUFGABE (berechnen, AFB II): Ein Wagen $m = 1{,}0\,\mathrm{kg}$ startet aus der Ruhe und rollt eine reibungsfreie Rampe der Hoehe $h = 0{,}80\,\mathrm{m}$ hinunter. Am Fuss trifft er auf eine horizontale Feder mit $D = 100\,\mathrm{N/m}$ ($g = 10\,\mathrm{m/s^2}$). Bestimmen Sie $v$ am Fuss und die maximale Stauchung $s$.

HILFE:
1. Bilanz fuer die Rampe: $m \cdot g \cdot h = 0{,}5 \cdot m \cdot v^2$.
2. Nach $v$ aufloesen und einsetzen.
3. Fuer die Feder gilt am Umkehrpunkt $m \cdot g \cdot h = 0{,}5 \cdot D \cdot s^2$; nach $s$ aufloesen.

MUSTERLOESUNG: Auf der Rampe gilt $m \cdot g \cdot h = 0{,}5 \cdot m \cdot v^2$; $m$ kuertzt sich, also $v = \sqrt{2 \cdot g \cdot h} = \sqrt{2 \cdot 10 \cdot 0{,}80} = \sqrt{16} = 4{,}0\,\mathrm{m/s}$. Beim Stauchen geht die Energie in Spannenergie ueber: $0{,}5 \cdot 100 \cdot s^2 = 1{,}0 \cdot 10 \cdot 0{,}80 = 8{,}0\,\mathrm{J}$, also $s^2 = 16{,}0/100 = 0{,}16\,\mathrm{m^2}$ und $s = 0{,}40\,\mathrm{m}$. Gegenprobe: $0{,}5 \cdot 1{,}0 \cdot (4{,}0)^2 = 8{,}0\,\mathrm{J}$.

Klausur-Satz: `Aus der Energieerhaltung folgt fuer den Wagen am Fuss der Rampe v = 4,0 m/s und fuer die maximale Federspannung s = 0,40 m.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Energieansatz (nur $v$, $h$ oder $s$ gesucht, Kraft veraenderlich oder mehrstufig: $E_{vor} = E_{nach}$) oder (ii) Kraftansatz ($a$, $t$, Richtung oder innere Kraft gesucht: $F_{res} = m \cdot a$ schrittweise) — dann loesen.

AUFGABE A: Ein Ball wird an einem Faden der Laenge $L = 1{,}25\,\mathrm{m}$ hochgezogen und losgelassen; gesucht ist nur $v$ am Tiefpunkt. Welches Verfahren, warum?

AUFGABE B: Fuer denselben Ball ist die Zeit bis zum Tiefpunkt gesucht. Welches Verfahren, warum?

HILFE: A fragt nur Geschwindigkeit ohne Zeit, also Verfahren (i) mit $m \cdot g \cdot L = 0{,}5 \cdot m \cdot v^2$. B fragt Zeit, die in der Energiegleichung fehlt, also Verfahren (ii) mit Beschleunigung und Kinematik. Faustregel: Tempo oder Hoehe verlangt Energie, Zeit oder Beschleunigung verlangt Kraft.

ANTWORT: A erfordert Verfahren (i): ohne Reibung genuegt $m \cdot g \cdot L = 0{,}5 \cdot m \cdot v^2$, also $v = \sqrt{2 \cdot g \cdot L} = \sqrt{2 \cdot 10 \cdot 1{,}25} = 5{,}0\,\mathrm{m/s}$; Winkel und Bahn sind irrelevant. B erfordert Verfahren (ii): die Energiegleichung enthaelt keine Zeit, daher muss ueber $a$ laengs der Bahn und Kinematik gerechnet werden.

Klausur-Satz: `Fragt die Aufgabe nur nach einer Geschwindigkeit oder Hoehe, fuehrt der Energieansatz ohne Zeit und ohne Winkel zum Ziel; ist dagegen eine Zeit gesucht, muss der Kraftansatz verwendet werden.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Unter welcher Bedingung gilt die mechanische Energieerhaltung? | ANTWORT: Wenn nur konservative Kraefte wie Gewicht oder Feder wirken, also keine Reibung Energie entzieht.
FRAGE: Wie lauten die drei Formeln der mechanischen Energie? | ANTWORT: $E_{kin} = 0{,}5 \cdot m \cdot v^2$, $E_{pot} = m \cdot g \cdot h$, $E_{spann} = 0{,}5 \cdot D \cdot s^2$.
FRAGE: Warum faellt in $v = \sqrt{2 \cdot g \cdot h}$ die Masse heraus? | ANTWORT: Weil $m$ in $m \cdot g \cdot h$ und in $0{,}5 \cdot m \cdot v^2$ als Faktor steht und beidseitig kuertzt.

Klausur-Satz: `Bei reibungsfreien Vorgaengen sind Anfangs- und Endenergie gleich, sodass die Masse oft herausfaellt und die Endgeschwindigkeit nur von der Hoehe abhaengt.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Erhaltung bedeute starre Konstanz ohne Bedingung.
   Korrektur: Ohne Verlust nur ohne Dissipation. Mit Reibung gilt $E_{vor} = E_{nach} + W_{Reibung}$; der Rest wurde innere Energie.
   Korrektur-Satz: `Die mechanische Energie bleibt nur ohne Reibung erhalten; bei Reibung wird ein Teil in innere Energie umgewandelt und muss in der Bilanz abgezogen werden.`
2. Fehlannahme: Energie liefere jede Groesse einschliesslich Zeit und Beschleunigung.
   Korrektur: Die Gleichung enthaelt keine Zeit; Momentanwerte verlangen $F_{res} = m \cdot a$ plus Kinematik.
   Korrektur-Satz: `Die Energieerhaltung enthaelt keine Zeit und liefert daher keine Zeit- oder Beschleunigungswerte; diese erfordern den Kraftansatz.`

## Schritt 7 — szenario

ROLLE: Du bist Praktikumsbetreuerin im Physikpraktikum der EF und sollst eine Halfpipe-Analyse anleiten.
SITUATION: Ein Skateboarder ($m = 60\,\mathrm{kg}$) startet aus der Ruhe am Rand einer reibungsfreien Halfpipe ($h = 1{,}8\,\mathrm{m}$ ueber Tiefpunkt) ohne weiteren Antrieb. Beurteile in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter), welche Geschwindigkeit er unten erreicht und warum Energie hier sinnvoller ist als Kraft. Nutze $g = 10\,\mathrm{m/s^2}$.
RUBRIC (30 XP): Bilanz $m \cdot g \cdot h = 0{,}5 \cdot m \cdot v^2$ mit Nullhoehe (5 XP) | Rechnung $v = \sqrt{2 \cdot g \cdot h} = 6{,}0\,\mathrm{m/s}$ mit Einheit (10 XP) | Begruendung der Massenunabhaengigkeit (10 XP) | Urteil zum Vorzug von Energie bei veraenderlicher Richtung ohne Zeitfrage (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Der Energieansatz vergleicht nur Anfang und Ende ohne Zeit und ohne Winkel, solange keine Reibung entzieht. Bilanz in vier Schritten: Nullniveau, Anfang, Ende, Gleichsetzen (mit Reibung abzueglich Verlust). Nur Tempo oder Hoehe bei veraenderlicher Kraft verlangt Energie; Zeit, Beschleunigung oder Richtung verlangen Kraft.
Takeaway-Satz: `Der Energieansatz vergleicht nur Anfangs- und Endzustand und kommt ohne Zeit und ohne Neigungswinkel aus, solange keine Reibung Energie entzieht.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Bilanz mit Feder (Schritt 4) oder die Entscheidung zwischen Energie und Kraft im Vergleich (Schritt 5)?
2. Planung: Beim naechsten Mal pruefe ich zuerst, ob nach einer Zeit gefragt wird und ob Reibung auftritt, bevor ich den Ansatz waehle.
