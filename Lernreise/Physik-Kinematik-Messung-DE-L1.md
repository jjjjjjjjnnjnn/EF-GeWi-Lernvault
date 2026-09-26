---
fach: Physik
thema: "Kinematik: Messung und Diagramme"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Kinematik]
version: Lesson-v3
---

# Lernreise: Kinematik: Messung und Diagramme (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Aus einer Messreihe die Bewegungsart bestimmen: Gerade im $s$-$t$-Diagramm bedeutet gleichfoermig, Parabel im $s$-$t$ plus Gerade im $v$-$t$ bedeutet gleichmaessig beschleunigt.
2. Die Auswertungsteilung nennen: Tangentensteigung im $s$-$t$-Diagramm liefert $v$, Flaeche unter der $v$-$t$-Linie liefert $s$, Steigung im $v$-$t$-Diagramm liefert $a$.
3. Eine Aufgabe in vier Schritten loesen: Tabelle, Diagramm, Steigung oder Flaeche, Einheit — mit Ansatz und Ergebnissatz.

Klausur-Satz: `Im s-t-Diagramm liefert die Tangentensteigung die Momentangeschwindigkeit, waehrend im v-t-Diagramm die Flaeche unter der Linie den zurueckgelegten Weg angibt.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Strecke $s$ in $\mathrm{m}$: zurueckgelegte Laenge, Achsengroesse des $s$-$t$-Diagramms.
- Beschleunigung $a$ in $\mathrm{m/s^2}$: Aenderung der Geschwindigkeit, bei gleichmaessig beschleunigter Bewegung konstant.
- Steigung: Neigung einer Linie; im $s$-$t$-Diagramm gleich $v$, im $v$-$t$-Diagramm gleich $a$.
- Flaeche unter der Linie: Gebiet unter der $v$-$t$-Kurve; ihr Zahlenwert ist der Weg $s$.
- Momentangeschwindigkeit $v$ in $\mathrm{m/s}$: Geschwindigkeit zu einem Zeitpunkt, gleich der Tangentensteigung im $s$-$t$-Diagramm.

Klausur-Satz: `Die Beschleunigung ist im v-t-Diagramm die Steigung der Geraden, im a-t-Diagramm dagegen die Hoehe der waagerechten Linie.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Alle Information steckt in zwei Kurven. Gleichfoermige Bewegung waechst linear, daher ist $s$-$t$ eine Gerade. Gleichmaessig beschleunigte Bewegung enthaelt $t^2$, daher ist $s$-$t$ eine Parabel mit $s = 0{,}5 \cdot a \cdot t^2$ und $v$-$t$ eine Gerade mit $v = a \cdot t + v_0$. Zwei Merksaetze: $s$-$t$ verlangt Steigung ($v = \Delta s / \Delta t$), $v$-$t$ verlangt Flaeche ($s$ als Dreieck oder Rechteck). Im $a$-$t$-Diagramm ist die horizontale Hoehe gleich $a$, die Flaeche darunter gleich dem Geschwindigkeitszuwachs. Die Zuordnung folgt aus der Punktform: liegen $s$-Punkte auf einer Geraden, so ist die Bewegung gleichfoermig; liegen sie auf einer Parabel, so ist sie beschleunigt. Umrechnung: $\mathrm{km/h}$ dividiert durch $3{,}6$ ergibt $\mathrm{m/s}$; erst in SI-Einheiten rechnen, dann bei Bedarf zurueckrechnen.

```diagram
   s ^                         v ^
     |        .                |            /
     |      .                  |          /
     |    .    (Parabel)       |        /  (Gerade, Steigung = a)
     |  .                      |      /
     |.                        |    /
     +------------------> t    +--------------> t
      s-t: Steigung -> v        v-t: Flaeche -> s

   v-t-Flaeche (Trapez) = Weg:
     v ^
       |      ___________
       |     /           \
       |    /             \
       +------------------------> t
        |__A1__|___A2___|_A3_|   s = A1 + A2 + A3
```

Klausur-Satz: `Eine gleichmaessig beschleunigte Bewegung erkennt man daran, dass die Messpunkte im s-t-Diagramm auf einer Parabel und im v-t-Diagramm auf einer steigenden Geraden liegen.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Die Einheit Meter wurde Ende des 18. Jahrhunderts ueber die Vermessung der Erde festgelegt: Sie sollte ein Zehnmillionstel der Strecke vom Nordpol zum Aequator sein. Spaeter definierte man sie ueber eine Metallstange, heute ueber die Lichtgeschwindigkeit. Das zeigt: Selbst eine grundlegende Groesse wie ein Meter ist eine menschliche Vereinbarung mit wachsender Genauigkeit.

**Bezug zum Konzept**: `Einheiten wie Meter und km/h sind Vereinbarungen; die Umrechnung von km/h in m/s ist daher nur eine Frage der Definition, nicht der Physik.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II): Auf der Luftkissenbahn werden zu $t = 0, 1, 2, 3, 4\,\mathrm{s}$ die Strecken $s = 0; 0{,}50; 2{,}00; 4{,}50; 8{,}00\,\mathrm{m}$ gemessen. Pruefen Sie, ob eine gleichmaessig beschleunigte Bewegung vorliegt, und bestimmen Sie $a$ sowie $v$ bei $t = 4\,\mathrm{s}$.

HILFE:
1. Pruefe mit $s = 0{,}5 \cdot a \cdot t^2$, ob $a = 2s/t^2$ fuer alle Punkte gleich ist.
2. Setze $t = 4\,\mathrm{s}$ und $s = 8{,}00\,\mathrm{m}$ ein.
3. Berechne $v = a \cdot t$ oder die Tangentensteigung im $s$-$t$-Diagramm.

MUSTERLOESUNG: Es gilt $a = 2s/t^2$: $2 \cdot 0{,}50/1^2 = 1{,}0$; $2 \cdot 2{,}00/2^2 = 1{,}0$; $2 \cdot 4{,}50/3^2 = 1{,}0$; $2 \cdot 8{,}00/4^2 = 1{,}0$ in $\mathrm{m/s^2}$. Der Quotient ist konstant, die Punkte liegen auf einer Parabel, also gleichmaessig beschleunigt mit $a = 1{,}0\,\mathrm{m/s^2}$. Bei $t = 4\,\mathrm{s}$ folgt $v = a \cdot t = 1{,}0 \cdot 4 = 4{,}0\,\mathrm{m/s}$. Gegenprobe im $v$-$t$-Diagramm: Dreiecksflaeche $0{,}5 \cdot 4 \cdot 4{,}0 = 8{,}0\,\mathrm{m}$, passend zur Messung.

Klausur-Satz: `Da der Quotient 2s/t^2 fuer alle Messpunkte konstant ist, liegt eine gleichmaessig beschleunigte Bewegung mit a = 1,0 m/s^2 vor, und die Endgeschwindigkeit betraegt v = 4,0 m/s.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) $s$-$t$-Verfahren (Achse traegt $s$, gesucht ist $v$: Steigung $v = \Delta s / \Delta t$ lesen) oder (ii) $v$-$t$-Verfahren (Achse traegt $v$, gesucht ist $s$: Flaeche $s$ berechnen) — dann loesen.

AUFGABE A: Im $s$-$t$-Diagramm steigt die Gerade von $s = 0\,\mathrm{m}$ bei $t = 0\,\mathrm{s}$ auf $s = 6{,}0\,\mathrm{m}$ bei $t = 4{,}0\,\mathrm{s}$. Welches Verfahren, wie gross ist $v$?

AUFGABE B: Im $v$-$t$-Diagramm steigt $v$ von $0$ auf $8{,}0\,\mathrm{m/s}$ in $4{,}0\,\mathrm{s}$. Welches Verfahren, welcher Weg?

HILFE: A traegt $s$, fragt $v$, also Verfahren (i) mit Steigung. B traegt $v$, fragt $s$, also Verfahren (ii) mit Dreiecksflaeche. Faustregel: Achse $s$ verlangt Steigung, Achse $v$ verlangt Flaeche.

ANTWORT: A erfordert Verfahren (i): $v = \Delta s / \Delta t = (6{,}0 - 0)/(4{,}0 - 0) = 1{,}5\,\mathrm{m/s}$. B erfordert Verfahren (ii): $s = 0{,}5 \cdot 4{,}0 \cdot 8{,}0 = 16\,\mathrm{m}$. Die mittlere Geschwindigkeit $s/t = 4{,}0\,\mathrm{m/s}$ ist die Haelfte der Endgeschwindigkeit, wie bei Start aus der Ruhe erwartet.

Klausur-Satz: `Bei einer s-t-Geraden wird die Geschwindigkeit als Steigung gelesen, bei einer v-t-Geraden dagegen der Weg als Flaeche unter der Linie berechnet.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Woran erkennt man im $s$-$t$-Diagramm eine gleichmaessig beschleunigte Bewegung? | ANTWORT: Die Punkte liegen auf einer Parabel, weil der Weg mit dem Quadrat der Zeit waechst.
FRAGE: Welche Groesse liefert die Flaeche unter der $v$-$t$-Linie? | ANTWORT: Den Weg $s$, beim Dreieck $s = 0{,}5 \cdot t \cdot v$.
FRAGE: Wie berechnet man die Momentangeschwindigkeit aus einer Messreihe? | ANTWORT: Als Tangentensteigung im $s$-$t$-Diagramm, naeherungsweise $v = \Delta s / \Delta t$ mit zwei engen Nachbarpunkten.

Klausur-Satz: `Die Steigung im s-t-Diagramm und die Flaeche im v-t-Diagramm sind die beiden zentralen Auswerteschritte der Kinematik.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Eine steilere $s$-$t$-Linie bedeute langsamere Bewegung.
   Korrektur: Die Steigung ist gerade $v$; steiler bedeutet schneller. Zuerst die Achsenbeschriftung pruefen, dann urteilen.
   Korrektur-Satz: `Im s-t-Diagramm bedeutet eine groessere Steigung eine groessere Geschwindigkeit, weil die Steigung gerade die Geschwindigkeit angibt.`
2. Fehlannahme: Im $v$-$t$-Diagramm sei die Linienhoehe bereits der Weg.
   Korrektur: Die Hoehe ist $v$ in $\mathrm{m/s}$, erst die Flaeche liefert $s$ in $\mathrm{m}$.
   Korrektur-Satz: `Im v-t-Diagramm gibt die Hoehe der Linie die Geschwindigkeit an, waehrend erst die Flaeche unter der Linie den Weg liefert.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin fuer Physik in der EF und leitest eine Kleingruppe bei der Auswertung eines Fahrbahnexperiments.
SITUATION: Eine Mitschuelerin hat eine Messreihe ($t$ in $\mathrm{s}$, $s$ in $\mathrm{m}$) aufgenommen; die Punkte streuen leicht um eine Kurve. Erklaere in einer zusammenhaengenden Antwort (ca. 150 Woerter), wie sie zwischen gleichfoermiger und gleichmaessig beschleunigter Bewegung entscheidet und daraus $a$ und $v$ bestimmt. Nutze $s$-$t$- und $v$-$t$-Diagramm.
RUBRIC (30 XP): Pruefkriterium Gerade gegen Parabel (5 XP) | Test mit $s = 0{,}5 \cdot a \cdot t^2$ und konstantem Wert (10 XP) | Bestimmung von $v$ als Tangentensteigung oder $v = a \cdot t$ (10 XP) | Sauberes Ergebnis mit Einheit und Gegenprobe ueber die $v$-$t$-Flaeche (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Steigung im $s$-$t$-Diagramm liefert $v$, Flaeche im $v$-$t$-Diagramm liefert $s$, Steigung im $v$-$t$ liefert $a$. Die Punktform entscheidet: Gerade bedeutet gleichfoermig, Parabel bedeutet beschleunigt. Das Viererschritt-Verfahren lautet: Daten notieren, Ansatz schreiben, mit Einheiten rechnen, mit dem zweiten Diagramm gegenpruefen.
Takeaway-Satz: `Die Steigung im s-t-Diagramm liefert v, die Flaeche im v-t-Diagramm liefert s — wer zuerst die Achsen liest, verwechselt die beiden Diagramme nie.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — das Pruefen der Messreihe mit $a = 2s/t^2$ (Schritt 4) oder die Wahl zwischen Steigung und Flaeche im Vergleich (Schritt 5)?
2. Planung: Beim naechsten Mal lese ich zuerst die Achsenbeschriftung mit Einheit und entscheide danach, ob ich eine Steigung oder eine Flaeche auswerte.
