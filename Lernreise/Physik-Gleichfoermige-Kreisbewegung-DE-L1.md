---
fach: Physik
thema: "Gleichfoermige Kreisbewegung"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, erklaeren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, Mechanik]
version: Lesson-v3
---

# Lernreise: Gleichfoermige Kreisbewegung (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Den Kernwiderspruch nennen: Betrag von $v$ konstant, Richtung staendig wechselnd, daher Zentripetalbeschleunigung zum Mittelpunkt.
2. Die Formeln $v = 2\pi r/T$, $\omega = 2\pi f$, $F_Z = m v^2/r$ auf Kurve und Scheibe anwenden.
3. Kurvenrutschen mit radialer Kraft deuten und die Fliehkraftaussage korrekt einordnen.

Klausur-Satz: `Bei der gleichfoermigen Kreisbewegung bleibt der Betrag der Geschwindigkeit konstant, die Richtung aendert sich jedoch staendig, sodass eine zum Mittelpunkt gerichtete Zentripetalkraft erforderlich ist.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Gleichfoermige Kreisbewegung: Betrag konstant, Richtung kreisend und staendig wechselnd.
- Umlaufdauer $T$ in $\mathrm{s}$: Zeit je Runde; Frequenz $f = 1/T$.
- Winkelgeschwindigkeit $\omega = 2\pi f$ in $\mathrm{1/s}$: Drehwinkel je Zeit.
- Bahngeschwindigkeit $v = 2\pi r/T = \omega r$ in $\mathrm{m/s}$: tangentiale Momentangeschwindigkeit.
- Zentripetalkraft $F_Z = m v^2/r = m \omega^2 r$ in $\mathrm{N}$: radiale Resultierende zum Mittelpunkt aus realen Kraeften.

Klausur-Satz: `Die Bahngeschwindigkeit zeigt tangential zur Kreisbahn, die Zentripetalkraft zeigt radial zum Mittelpunkt.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Gleichfoermig sichert nur die Tachonadel, nicht die Richtung. Richtungswechsel verlangt Kraft, und dauerndes Abbiegen verlangt Kraft zum Zentrum: $F_Z$. Sie ist keine neue Kraft, sondern die radiale Summe aus Reibung, Seilkraft oder Gewichtskomponente. Der Betrag folgt aus Umfang je Zeit $v = 2\pi r/T$, das Drehtempo aus $\omega = 2\pi f$, der Bedarf aus $F_Z = m v^2/r$. Doppelte Kurvengeschwindigkeit verlangt vierfache Seitenreibung; reicht die Haftung nicht, so folgt der Wagen der Traegheit tangential und rutscht nach aussen.

```diagram
              ^ v (tangential)
              |
         -----+------>
        /     |      \
       /      |       \
      /       |r       \   <-- Kreisbahn von oben (Draufsicht)
     |        o-------->|
     |     Mittelpunkt  \
      \      ^          /
       \     | F_Z      /
        \    | radial  /
         \---+---/
              v
   Legende: r = Radius, v = tangential, F_Z = radial zum Zentrum
   Formeln: v = 2πr/T, ω = 2πf, F_Z = m v^2/r
```

Klausur-Satz: `Die Zentripetalkraft F_Z = m v^2/r wirkt radial zum Mittelpunkt und wird durch die reale Radialkomponente der Kraefte aufgebracht.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Rennfahrer sprechen in Kurven vom Sehen des Scheitelpunkts und vom Kampf mit der Fliehkraft, doch in der Physik existiert diese Fliehkraft im Inertialsystem gar nicht. Was man im Auto nach aussen spuert, ist die eigene Traegheit: Der Koerper will geradeaus weiterfahren, waehrend das Auto durch Reibung nach innen gezwungen wird. Darum kippt ein zu schneller LKW in der Kurve nicht wegen einer geheimnisvollen Kraft nach aussen, sondern weil die noetige Zentripetalkraft fehlt.

**Bezug zum Konzept**: `Was als Fliehkraft nach aussen gefuehlt wird, ist Traegheit; physikalisch real ist nur die Zentripetalkraft nach innen.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Ein Auto $m = 1200\,\mathrm{kg}$ durchfaehrt eine flache Kurve mit $r = 50\,\mathrm{m}$ und $T = 12\,\mathrm{s}$ je Vollkreis. Berechnen Sie $v$, $\omega$ und $F_Z$ und erklaeren Sie die Folge doppelter Geschwindigkeit.

HILFE:
1. Umfang $U = 2\pi r$, dann $v = U/T$.
2. Frequenz $f = 1/T$, dann $\omega = 2\pi f$ oder $\omega = v/r$.
3. Ansatz $F_Z = m v^2/r$; danach $v$ verdoppeln und Vervierfachung zeigen.

MUSTERLOESUNG: Es gilt $U = 2\pi \cdot 50 = 314\,\mathrm{m}$, also $v = 314/12 = 26{,}2\,\mathrm{m/s}$. Mit $f = 1/12 = 0{,}0833\,\mathrm{1/s}$ folgt $\omega = 2\pi f = 0{,}524\,\mathrm{1/s}$; Kontrolle $\omega = v/r = 26{,}2/50 = 0{,}524\,\mathrm{1/s}$. Damit $F_Z = m v^2/r = 1200 \cdot (26{,}2)^2/50 = 1200 \cdot 686/50 = 16470\,\mathrm{N}$. Bei $2v$ gilt $F_{Z,neu} = m(2v)^2/r = 4 m v^2/r$, also das Vierfache. Die Haftreibung muss diese Radialkraft liefern; reicht sie nicht, so folgt das Auto tangential der Traegheit.

Klausur-Satz: `Mit v = 2πr/T und F_Z = m v^2/r folgt, dass eine Verdopplung von v die vierfache Zentripetalkraft erfordert.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Bahn-Verfahren (Tempo, $T$, $f$ gesucht: $v = 2\pi r/T$, $\omega = 2\pi f$) oder (ii) Kraft-Verfahren (Halten, Rutschen, Reissen gefragt: $F_Z = m v^2/r$ als Radialbilanz) — dann rechnen.

AUFGABE A: Scheibe $r = 0{,}30\,\mathrm{m}$, $f = 2{,}0\,\mathrm{1/s}$; gesucht $v$ am Rand.

AUFGABE B: Muenze $10\,\mathrm{g}$ auf derselben Scheibe bei Haftkoeffizient $0{,}40$; bleibt sie haften?

HILFE: A nennt Geometrie plus Drehzahl und fragt Tempo, also Verfahren (i). B nennt Masse plus Reibung und fragt Halten, also Verfahren (ii). Faustregel: $T$, $f$, $r$ nach $v$ verlangt Bahn; $m$, Reibung und Halten verlangen Kraft.

ANTWORT: A erfordert Verfahren (i): $v = 2\pi r f = 2\pi \cdot 0{,}30 \cdot 2{,}0 = 3{,}77\,\mathrm{m/s}$ tangential. B erfordert Verfahren (ii): Bedarf $F_Z = m v^2/r = 0{,}010 \cdot (3{,}77)^2/0{,}30 = 0{,}474\,\mathrm{N}$; Angebot $0{,}40 \cdot 0{,}010 \cdot 9{,}81 = 0{,}039\,\mathrm{N}$. Der Bedarf uebersteigt das Angebot, die Muenze rutscht weg.

Klausur-Satz: `Kinematische Fragen nach v und ω verlangen das Bahn-Verfahren, Fragen nach Halten oder Reissen verlangen das Kraft-Verfahren mit F_Z.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie folgen $v$ und $\omega$ aus $r$, $T$ und $f$? | ANTWORT: $v = 2\pi r/T = \omega r$ und $\omega = 2\pi f = 2\pi/T$; $v$ tangential, $\omega$ als Drehtempo.
FRAGE: Wie lautet $F_Z$ und wohin zeigt sie? | ANTWORT: $F_Z = m v^2/r = m \omega^2 r$ radial zum Mittelpunkt als Radialanteil realer Kraefte.
FRAGE: Warum vervierfacht doppeltes $v$ die Kraft? | ANTWORT: Weil $v$ quadratisch eingeht: $(2v)^2 = 4v^2$.

Klausur-Satz: `Die Formeln v = 2πr/T, ω = 2πf und F_Z = m v^2/r bilden das geschlossene Verfahren der Kreisbewegung.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Gleichfoermige Kreisbahn bedeute keine Beschleunigung wegen konstantem Betrag.
   Korrektur: Die Richtung dreht staendig, der Geschwindigkeitsvektor aendert sich, daher Zentripetalbeschleunigung zum Zentrum; sonst gerader Tangentenflug.
   Korrektur-Satz: `Trotz konstantem Betrag der Geschwindigkeit liegt eine Zentripetalbeschleunigung zum Mittelpunkt vor, weil sich die Richtung staendig aendert.`
2. Fehlannahme: Zentrifugalkraft sei reale Gegenkraft zur Zentripetalkraft.
   Korrektur: Im Inertialsystem existiert keine Kraft nach aussen; real ist nur die Resultierende nach innen. Aussen wirkt nur im mitrotierenden System als Hilfsgroesse und gehoert nicht ins Kraeftebild.
   Korrektur-Satz: `Im Inertialsystem existiert keine reale Zentrifugalkraft nach aussen; die einzige reale Radialkraft ist die Zentripetalkraft nach innen.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor in der EF und erklaerst einer Mitschuelerin die Kurvenphysik.
SITUATION: Nach Regen ist ein Auto in flacher Kurve ($r = 60\,\mathrm{m}$) gerutscht. Die Mitschuelerin sagt: Die Fliehkraft zog das Auto hinaus. Nimm in zusammenhaengender Darstellung (ca. 150 Woerter) Stellung, rechne mit $v = 20\,\mathrm{m/s}$, $m = 1000\,\mathrm{kg}$ die noetige $F_Z$ aus und beurteile die Aussage. Schreibe Antwort mit Formeln, Rechnung, Kraftdeutung und Urteil.
RUBRIC (30 XP): Rechnung mit $F_Z = m v^2/r$ (10 XP) | Deutung Haftreibung als Lieferant (10 XP) | Urteil: keine reale Kraft nach aussen, sondern Traegheit bei fehlender $F_Z$ (10 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Bahn tangential mit $v = 2\pi r/T$, Kraft radial mit $F_Z = m v^2/r$; doppelte Geschwindigkeit verlangt vierfache Haftung. Das Bild zeigt nur reale Kraefte nach innen, niemals Fliehkraft; Rutschen heisst fehlende Zentripetalkraft bei gerader Traegheit.
Takeaway-Satz: `Bahn tangential mit v = 2πr/T, Kraft radial mit F_Z = m v^2/r; doppelte Geschwindigkeit verlangt vierfache Haftreibung.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Rechnung mit $v$ und $F_Z$ (Schritt 4) oder die Wahl zwischen Bahn- und Kraftverfahren (Schritt 5)?
2. Planung: Beim naechsten Mal zeichne ich zuerst die Draufsicht mit Radius, Tangente und Radialpfeil und frage dann, ob nach Tempo oder nach Halten gefragt ist.
