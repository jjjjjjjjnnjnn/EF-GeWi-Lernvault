---
fach: Physik
thema: "Formelhandbuch Mechanik: dreisprachig und handgerechnet"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Formeln]
version: Lesson-v3
---

# Lernreise: Formelhandbuch Mechanik: dreisprachig und handgerechnet (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Die sechs Kerngruppen der EF-Mechanik mit Buchstaben, Bedeutung und Einheit wiedergeben.
2. Nach der Regel Bedingung waehlt Ansatz, Buchstabenform zuerst, Einheiten bis zum Ende vorgehen und handschriftlich rechnen.
3. Das Ergebnis mit Groessenordnung und Alltagserfahrung auf Plausibilitaet pruefen.

Klausur-Satz: `Ohne Ansatz mit Formel und Einheit gibt es keine volle Punktzahl, denn bewertet wird der Weg, nicht nur die Zahl.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Geschwindigkeit $v$ in $\mathrm{m/s}$: Weg je Zeit; gleichfoermig $v = s/t$.
- Beschleunigung $a$ in $\mathrm{m/s^2}$: Tempo der Geschwindigkeitsaenderung; $a = \Delta v / \Delta t$.
- Kraft $F$ in $\mathrm{N}$: Ursache der Bewegungsaenderung; $1\,\mathrm{N} = 1\,\mathrm{kg \cdot m/s^2}$; $F = m \cdot a$.
- Energie $E$ in $\mathrm{J}$: gespeicherte Arbeit; $1\,\mathrm{J} = 1\,\mathrm{N \cdot m}$; $E_{kin} = 0{,}5 \cdot m \cdot v^2$, $E_{pot} = m \cdot g \cdot h$.
- Impuls $p = m \cdot v$ in $\mathrm{kg \cdot m/s}$: bei fehlenden aeusseren Stoessen erhalten.

Klausur-Satz: `Jede Formel gilt nur unter ihrer Bedingung, daher wird zuerst die Bedingung geprueft und dann der Ansatz gewaehlt.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Das Handbuch ist ein Entscheidungsbaum: Bedingung waehlt Formel, Formel liefert Ansatz. Kinematik: gleichfoermig $s = v \cdot t$; beschleunigt $v = v_0 + a \cdot t$, $s = v_0 \cdot t + 0{,}5 \cdot a \cdot t^2$; ohne Zeit $v^2 - v_0^2 = 2 \cdot a \cdot s$. Kraft: $F = m \cdot a$ als Kern, dazu $F_G = m \cdot g$, $F_R = \mu \cdot F_N$, $F = D \cdot s$. Energie: $0{,}5 \cdot m \cdot v^2$, $m \cdot g \cdot h$, $0{,}5 \cdot D \cdot s^2$; ohne Reibung Summe konstant. Impuls $p = m \cdot v$ mit $p_{vor} = p_{nach}$ bei Stoss. Kreis: $v = \omega \cdot r$, $F_z = m \cdot v^2/r$ aus realer Radialkraft. Einheiten: $1\,\mathrm{N} = 1\,\mathrm{kg \cdot m/s^2}$; $1\,\mathrm{J} = 1\,\mathrm{kg \cdot m^2/s^2}$; $\mathrm{km/h}$ durch $3{,}6$ ergibt $\mathrm{m/s}$. Erst alles in SI umrechnen, dann einsetzen, dann bei Bedarf zurueckrechnen. Reihenfolge im Heft: Ansatz, Einsetzen mit Einheiten, Ergebnis mit Einheit und Urteil.

```diagram
   Frage an die Aufgabe
        |
        +-- nach Zeit / Richtung gefragt?  --> Kraftansatz  F = m*a
        |
        +-- reibungsfrei, nur v oder h?    --> Energie     E_pot + E_kin = const
        |
        +-- Stoss / Explosion?             --> Impuls      p_vor = p_nach
        |
        +-- Kreisbahn?                     --> Zentripetal F_z = m*v^2/r
        |
        +-- kein t bekannt?                 --> v^2 - v0^2 = 2*a*s

   Reihenfolge im Heft:
     1. Ansatz (Buchstabenformel)
     2. Einsetzen (Zahlen mit Einheiten)
     3. Ergebnis + Einheit + Urteil
```

Klausur-Satz: `Die Bedingung waehlt den Ansatz: reibungsfrei und ohne Zeitangabe fuehrt zur Energieerhaltung, eine Zeitfrage dagegen zum Kraftansatz F = m*a.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Ein teurer Fehler mit Einheiten ereignete sich 1999 bei der NASA: Zwei Teams rechneten mit unterschiedlichen Einheitensystemen — die einen in metrischen Einheiten, die anderen in angelsaechsischen — und die Werte wurden nicht umgerechnet. Dadurch ging die Sonde Mars Climate Orbiter verloren. Eine einzige fehlende Umrechnung kostete ein ganzes Raumfahrtprojekt.

**Bezug zum Konzept**: `Fehlende Einheitenumrechnung macht selbst eine korrekte Formel wertlos — die Einheitenpruefung ist daher kein Zusatz, sondern Pflicht.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Ein Pkw $m = 1500\,\mathrm{kg}$ beschleunigt aus der Ruhe gleichmaessig und erreicht nach $t = 10\,\mathrm{s}$ die Geschwindigkeit $v = 20\,\mathrm{m/s}$. Berechnen Sie $a$, $F$, $s$ und vergleichen Sie Arbeit $W$ mit $E_{kin}$. Pruefen Sie die Einheiten.

HILFE:
1. Ansatz Beschleunigung: $a = \Delta v / \Delta t = v/t$.
2. Ansatz Kraft $F = m \cdot a$ und Weg $s = 0{,}5 \cdot a \cdot t^2$.
3. Ansatz Arbeit $W = F \cdot s$ und $E_{kin} = 0{,}5 \cdot m \cdot v^2$, dann vergleichen und Einheiten pruefen.

MUSTERLOESUNG: Es gilt $a = v/t = 20/10 = 2{,}0\,\mathrm{m/s^2}$. Damit $F = m \cdot a = 1500 \cdot 2{,}0 = 3000\,\mathrm{N}$. Der Weg ist $s = 0{,}5 \cdot a \cdot t^2 = 0{,}5 \cdot 2{,}0 \cdot 100 = 100\,\mathrm{m}$. Die Arbeit $W = F \cdot s = 3000 \cdot 100 = 300000\,\mathrm{J} = 300\,\mathrm{kJ}$. Kontrolle: $E_{kin} = 0{,}5 \cdot m \cdot v^2 = 0{,}5 \cdot 1500 \cdot 400 = 300000\,\mathrm{J}$. Beide stimmen nach $W = \Delta E_{kin}$ ueberein. Einheiten: $[a] = \mathrm{m/s^2}$, $[F] = \mathrm{kg \cdot m/s^2} = \mathrm{N}$, $[W] = \mathrm{N \cdot m} = \mathrm{J}$; Groessenordnung plausibel.

Klausur-Satz: `Mit a = 2,0 m/s^2 und F = 3000 N ergibt sich fuer den Pkw ein Weg von 100 m, und die Arbeit W = 300 kJ entspricht genau der kinetischen Energie.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Energieverfahren (Signalwoerter reibungsfrei, hinab, empor; ein Koerper an Orten; gesucht $v$ oder $h$: $E_{pot} + E_{kin} = const$) oder (ii) Impulsverfahren (Signalwoerter Stoss, Explosion, Rueckstoss; mehrere Koerper vor und nach Wirkung; gesucht $v'$: $p_{vor} = p_{nach}$) — dann loesen.

AUFGABE A: Ein Wagen rollt reibungsfrei eine Rampe hinunter; gesucht ist $v$ am Fuss. Welches Verfahren, warum?

AUFGABE B: Zwei Wagen stossen reibungsfrei zusammen und bleiben vereint; gesucht ist die gemeinsame Geschwindigkeit. Welches Verfahren, warum?

HILFE: A nennt reibungsfrei plus Hoehe plus Geschwindigkeit, also Verfahren (i). B nennt Zusammenstoss plus gemeinsame Geschwindigkeit, also Verfahren (ii). Faustregel: ein Koerper an Orten verlangt Energie, mehrere Koerper vor und nach Stoss verlangen Impuls.

ANTWORT: A erfordert Verfahren (i): ohne Reibung gilt $m \cdot g \cdot h = 0{,}5 \cdot m \cdot v^2$, also $v = \sqrt{2 \cdot g \cdot h}$ fuer den einen Wagen. B erfordert Verfahren (ii): nur innere Kraefte, daher $m_1 \cdot v_1 + m_2 \cdot v_2 = (m_1 + m_2) \cdot v'$ mit Aufloesung nach $v'$.

Klausur-Satz: `Die Energieerhaltung verfolgt einen Koerper ueber verschiedene Positionen, waehrend die Impulserhaltung den Gesamtimpuls mehrerer Koerper vor und nach einem Stoss vergleicht.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet die zeitfreie Gleichung der beschleunigten Bewegung? | ANTWORT: $v^2 - v_0^2 = 2 \cdot a \cdot s$ ohne Zeit.
FRAGE: Welche drei Formeln beschreiben mechanische Energie? | ANTWORT: $E_{kin} = 0{,}5 \cdot m \cdot v^2$, $E_{pot} = m \cdot g \cdot h$, $E_{spann} = 0{,}5 \cdot D \cdot s^2$.
FRAGE: Wann gilt Impulserhaltung beim Stoss? | ANTWORT: Ohne aeussere Kraefte bleibt der Gesamtimpuls vor und nach Stoss gleich.

Klausur-Satz: `Jede Formel wird zuerst in Buchstabenform angeschrieben, dann mit Einheiten gefuellt und erst zuletzt als Zahl notiert.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Viele Formeln auswendig sichern Punkte durch Einsetzen.
   Korrektur: Nur die bedingungsgerechte Formel gilt. Energie ohne Reibungsterm auf reibungsbehafteter Bahn ueberschaetzt das Ergebnis; erst Daten und Bedingung, dann Ansatz.
   Korrektur-Satz: `Eine Formel gilt nur unter ihrer Bedingung; wird die Reibung ignoriert, fehlt in der Energiebilanz ein Term und das Ergebnis wird falsch.`
2. Fehlannahme: Richtige Einheit garantiere richtiges Ergebnis.
   Korrektur: Einheit ist nur notwendig. Falscher Faktor wie $a \cdot t^2$ statt $0{,}5 \cdot a \cdot t^2$ traegt dieselbe Einheit $\mathrm{m}$ bei doppeltem Wert; Bedingung und Groessenordnung muessen folgen.
   Korrektur-Satz: `Die Dimensionsprobe ist nur eine notwendige Bedingung; erst der Vergleich mit Bedingung und Groessenordnung sichert das Ergebnis.`

## Schritt 7 — szenario

ROLLE: Du bist Lerncoach und bereitest eine Mitschuelerin auf die Formelaufgaben der Physik-Klausur vor.
SITUATION: Die Mitschuelerin kennt viele Formeln, verwechselt aber die Einsatzmomente und schreibt oft nur Ergebnisse ohne Ansatz. Erklaere in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter), wie eine Entscheidungshilfe die Formel waehlt und wie ein vollstaendiger Loesungsweg die Schrittpunkte sichert.
RUBRIC (30 XP): Entscheidungsregel Bedingung waehlt Ansatz mit zwei Beispielen (10 XP) | Dreischritt Ansatz-Einsetzen-Ergebnis (10 XP) | Einheiten und Groessenordnung als Kontrolle (5 XP) | Nachvollziehbare adressatengerechte Fachsprache (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Bedingung waehlt Ansatz, Buchstabenform vor Zahlen, Einheit und Groessenordnung als Kontrolle — so wird aus einer Formel volle Punktzahl. Ausloeser merken: $s = v \cdot t$ fuer gleichfoermig, Quadratterme fuer beschleunigt, $F = m \cdot a$ fuer Zeit und Richtung, Energie bei reibungsfrei, Impuls bei Stoss, $F_z = m \cdot v^2/r$ fuer Kreisbahn.
Takeaway-Satz: `Bedingung waehlt den Ansatz, Buchstabenform vor Zahlen, Einheit und Groessenordnung als Kontrolle — so wird aus einer Formel eine volle Punktzahl.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — das Wiedergeben der sechs Gruppen (Schritt 2) oder die Formelauswahl im Vergleich (Schritt 5)?
2. Planung: Beim naechsten Mal notiere ich zuerst die Bedingung (Reibung, Zeitfrage) und waehle erst danach die Formel.
