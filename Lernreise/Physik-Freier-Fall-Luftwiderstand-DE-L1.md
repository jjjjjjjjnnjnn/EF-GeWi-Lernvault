---
fach: Physik
thema: "Freier Fall mit Luftwiderstand"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, deuten]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, Mechanik]
version: Lesson-v3
---

# Lernreise: Freier Fall mit Luftwiderstand (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. $m a = m g - F_W(v)$ mit $F_W = k v$ oder $c v^2$ aufstellen und Richtungen benennen.
2. Ideal $v = g t$ gegen real mit Saettigung $v_E$ unterscheiden und $v_E = 6{,}54\,\mathrm{m/s}$ einordnen.
3. An $s$-$t$ Parabel gegen Linie und $v$-$t$ Gerade gegen Abflachung auf $F_W$ schliessen.

### Hook / Phaenomen

Im Jahr 2012 sprang Baumgartner aus $39\,\mathrm{km}$ — und wurde nicht immer schneller. Erst raste er, dann fiel er konstant, dann bremste die dichte Luft ihn sogar ab. Ein Fallschirmspringer ohne Schirm muesste nach $t = 10\,\mathrm{s}$ schon $v = 98\,\mathrm{m/s}$ erreichen — doch niemand faellt so schnell. Warum waechst der Widerstand mit der Geschwindigkeit — und welche einzige Bilanz stoppt den freien Fall bei $v_E$?

### Fachbegriff & Definition

Fuer den Fall mit Luft gilt: **Der Luftwiderstand waechst mit der Geschwindigkeit und begrenzt den freien Fall auf eine konstante Endgeschwindigkeit**. Es gilt die **Bewegungsgleichung $m a = m g - F_W(v)$ mit $F_W = k v$ oder $c v^2$**. Bei **$v_E$ kompensiert $F_W$ die Gewichtskraft, also $m g = F_W(v_E)$ mit $a = 0$**.

### Wirkungsgefuege / Modell

Der Mechanismus laesst $F_W$ wachsen: Start $v = 0$ zu $F_W = 0$ und $a = g = 9{,}81\,\mathrm{m/s^2}$. Mit $v$ steigt $F_W$, die Differenz $m g - F_W$ schrumpft, $a$ sinkt. Im Grenzfall $F_W = m g$ zu $a = 0$ und $v = v_E$ konstant. Fuer $F_W = k v$ folgt $v_E = m g/k$; die Messung $v_E = 6{,}54\,\mathrm{m/s}$ fixiert $k$. Ideal ohne Luft $v = g t$ als Gerade, real als abflachende Kurve gegen $v_E$.

Schritt A: Kraefte $m g$ abwaerts und $F_W$ aufwaerts ansetzen.
Schritt B: $m a = m g - F_W(v)$ schreiben und Start $a = g$ lesen.
Schritt C: $m g = F_W(v_E)$ zu $v_E$ loesen und Kurve deuten.

Klausur-Satz: `Der Luftwiderstand waechst mit der Geschwindigkeit und begrenzt den freien Fall auf eine konstante Endgeschwindigkeit.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

### Hook / Phaenomen

Zwei Kugeln — Stahl und Styropor — fallen aus gleicher Hoehe. Galilei verspricht Gleichstand, der Schulhof sieht Styropor trudeln. Der Unterschied heisst $F_W(v)$: klein bei Stahl, gross bei Styropor relativ zu $m g$. Welche fuenf Begriffe trennen Ideal und Real in einer Gleichung?

### Fachbegriffe & Definitionen

- **Freier Fall:** Ideal nur unter $F_G$ mit $a = g = 9{,}81\,\mathrm{m/s^2}$ ohne Luft.
- **Luftwiderstand $F_W$:** Gegen die Bewegung, $F_W = k v$ laminar oder $c v^2$ turbulent.
- **Bewegungsgleichung:** $m a = m g - F_W(v)$; $a$ sinkt mit wachsendem $v$.
- **Endgeschwindigkeit $v_E$:** Konstant bei $m g = F_W(v_E)$; dann $a = 0$.
- **$v$-$t$-Diagramm:** Real als abflachende Kurve gegen $v_E$ statt Gerade $v = g t$.

### Wirkungsgefuege / Modell

Die Kette vergleicht Kurven: Ideal Gerade mit Steigung $g$, real Kurve mit Startsteigung $g$ und Horizontale $v_E$. Stahl mit grossem $m$ zu spaeter Saettigung, Styropor mit kleinem $m$ zu frueher. Die $v_E$-Formel $v_E = m g/k$ zeigt: doppelte Masse bei gleichem $k$ hebt $v_E$ — schwer faellt real schneller, nicht wegen Galilei, sondern wegen $F_W$.

Klausur-Satz: `Bei Erreichen der Endgeschwindigkeit kompensiert der Luftwiderstand die Gewichtskraft, sodass die resultierende Kraft null ist.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

### Hook / Phaenomen

Ein Regentropfen faellt kilometerweit — und kommt mit wenigen Metern je Sekunde an. Ohne Luft muesste er mit $v > 100\,\mathrm{m/s}$ einschlagen. Die $v$-$t$-Kurve verrraet den Retter: steil gestartet mit $g$, dann abgeflacht gegen $6{,}54\,\mathrm{m/s}$. Wie liest man aus der Abflachung direkt das Kraeftegleichgewicht — und warum begrenzt $v_E$ jede reale Fallgeschwindigkeit nach unten wie nach oben?

### Fachbegriff & Definition

Die **Abflachung der $v$-$t$-Kurve zeigt das Anwachsen von $F_W$ bis zum Kraeftegleichgewicht $m g = F_W$**. Die **berechnete $v_E = 6{,}54\,\mathrm{m/s}$ begrenzt jede reale Kurve als Asymptote**. Ohne Luft gilt $s = 0{,}5 g t^2$ als Parabel; mit Luft knickt $s$-$t$ zur Geraden mit Steigung $v_E$.

### Wirkungsgefuege / Modell

Der Tiefenweg liest Steigung und Asymptote: Anfangssteigung $g = 9{,}81\,\mathrm{m/s^2}$ als Tangente an $t = 0$; Endsteigung $0$ als Horizontale $v_E$. Dazwischen $a(t) = g - F_W(v)/m$ fallend. Zahlenprobe $v_E = 6{,}54$ gegen Ideal $v = g \cdot 2 = 19{,}6\,\mathrm{m/s}$ nach $2\,\mathrm{s}$ — real liegt weit darunter. $s$-$t$ startet als Parabel und geht in Gerade mit $v_E$ ueber.

Schritt A: Startsteigung $g$ an $t = 0$ ablesen.
Schritt B: Horizontale $v_E$ als Asymptote bestimmen.
Schritt C: $m g = F_W(v_E)$ als Gleichgewicht formulieren.

```diagram
v ^
  |                        ............ v_E = 6.54 m/s
  |                   .....
  |               ....
  |            ...
  |          ..
  |        ..
  |      ..
  |    ..
  |  ..
  +----------------------------------> t
  Startsteigung = g = 9.81 m/s^2, dann Abflachung durch F_W(v)
  Kraefte: m*g nach unten, F_W nach oben
  Bilanz: m*a = m*g - F_W(v), bei v_E gilt a = 0
```

Klausur-Satz: `Die Abflachung der v-t-Kurve zeigt das Anwachsen des Luftwiderstands bis zum Kraeftegleichgewicht.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Fallschirmspringer erreichen in Bauchlage etwa $200\,\mathrm{km/h}$, im senkrechten Dive sogar ueber $400\,\mathrm{km/h}$. Der geoeffnete Schirm vergroessert die Angriffsflaeche so stark, dass die neue Endgeschwindigkeit nur noch etwa $20\,\mathrm{km/h}$ betraegt.

**Bezug zum Konzept**: `Die Endgeschwindigkeit haengt von Masse und Widerstandsflaeche ab und ist daher steuerbar.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: kinematik]

AUFGABE (berechnen, AFB II): Eine Kugel $m = 0{,}50\,\mathrm{kg}$ faellt mit $F_W = k \cdot v$ und $k = 0{,}75\,\mathrm{Ns/m}$. Berechnen Sie $v_E$ und vergleichen Sie $v$ nach $1{,}0\,\mathrm{s}$ mit dem Idealwert.

HILFE:
1. Bedingung $m \cdot g = k \cdot v_E$ nach $v_E$ aufloesen.
2. Idealwert $v = g \cdot t$ berechnen.
3. Vergleich deuten.

MUSTERLOESUNG: Aus $m \cdot g = k \cdot v_E$ folgt $v_E = m \cdot g / k = 0{,}50 \cdot 9{,}81 / 0{,}75 = 6{,}54\,\mathrm{m/s}$. Idealisiert gilt $v = 9{,}81 \cdot 1{,}0 = 9{,}81\,\mathrm{m/s}$. Der reale Wert liegt darunter, weil schon nach einer Sekunde ein erheblicher Teil der Gewichtskraft durch $F_W$ kompensiert wird. Mit diesem Widerstand bleibt $v_E = 6{,}54\,\mathrm{m/s}$ die obere Schranke.

Klausur-Satz: `Die berechnete Endgeschwindigkeit von 6,54 m/s begrenzt jede reale Fallgeschwindigkeit nach unten wie nach oben im Vergleich zum Idealwert.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Ideal-Verfahren (ohne Widerstand: $v = g \cdot t$, $s = g t^2 / 2$) oder (ii) Widerstands-Verfahren (mit $F_W$, Saettigung und $v_E$) — dann loesen.

AUFGABE A: Eine Stahlkugel faellt $2\,\mathrm{m}$ im Vakuumrohr. Welche Formeln gelten?

AUFGABE B: Ein Tischtennisball faellt aus $10\,\mathrm{m}$ Hoehe in Luft. Welche Deutung verlangt das $v$-$t$-Diagramm?

HILFE: A nennt Vakuum, also Verfahren (i). B nennt leichte Kugel plus grosse Hoehe in Luft, also Verfahren (ii). Faustregel: Vakuum oder schwer und kurz verlangt ideal, leicht und hoch in Luft verlangt Widerstand.

ANTWORT: A erfordert Verfahren (i): $v = g \cdot t$ und $s = g t^2/2$ ohne Korrektur. B erfordert Verfahren (ii): Die Kurve flacht ab, $v_E$ ist schnell erreicht, die Fallzeit ist deutlich laenger als $t = \sqrt{2s/g}$.

Klausur-Satz: `Im Vakuum traegt das Idealmodell, in Luft bei grosser Flaeche und kleiner Masse nur das Widerstandsmodell.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet die Bewegungsgleichung mit Widerstand? | ANTWORT: $m \cdot a = m \cdot g - F_W(v)$ mit $F_W$ entgegen der Geschwindigkeit.
FRAGE: Wie folgt $v_E$ aus dem Kraeftegleichgewicht? | ANTWORT: Aus $m \cdot g = F_W(v_E)$, linear $v_E = m \cdot g / k$.
FRAGE: Woran erkennt man Widerstand im $v$-$t$-Diagramm? | ANTWORT: An der Abflachung bis zur Horizontalen $v = v_E$ statt Gerade mit Steigung $g$.

Klausur-Satz: `Die Sattigung der v-t-Kurve ist der graphische Beleg fuer geschwindigkeitsabhaengigen Widerstand.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Schwere Koerper fallen grundsaetzlich immer deutlich schneller als leichte.
   Korrektur: Im Vakuum fallen alle gleich schnell; Unterschiede in Luft stammen aus Gewicht je Widerstandsflaeche.
   Korrektur-Satz: `Im Vakuum fallen alle Koerper gleich schnell; Unterschiede in Luft stammen aus dem Verhaeltnis von Gewicht zu Widerstandsflaeche.`
2. Fehlannahme: Widerstand sei konstant und koenne von $g$ abgezogen werden.
   Korrektur: $F_W$ haengt von der Momentangeschwindigkeit ab und waechst bis zum Gleichgewicht.
   Korrektur-Satz: `Der Luftwiderstand haengt von der Momentangeschwindigkeit ab und waechst waehrend des Falls bis zum Kraeftegleichgewicht.`

## Schritt 7 — szenario

ROLLE: Du bist Messassistentin im Physikkurs.
SITUATION: Zwei $v$-$t$-Diagramme liegen vor: Kurve A ist eine Gerade mit Steigung $g$, Kurve B flacht nach $2\,\mathrm{s}$ deutlich ab. Entscheide in circa 150 Woertern, welche Kurve zu Vakuum und welche zu Luft gehoert, und bestimme graphisch $v_E$ von Kurve B.
RUBRIC (30 XP): Richtige Zuordnung beider Kurven (8 XP) | Begruendung mit Kraeftegleichung (10 XP) | Ablesen von $v_E$ aus der Horizontalen (6 XP) | Fachsprachliche Darstellung (6 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Ohne Luft gilt $v = g \cdot t$, mit Luft $m \cdot a = m \cdot g - F_W(v)$ mit Saettigung bei $v_E$. Die Kurve verraet das Modell: steile Gerade bedeutet Vakuum, abflachende Kurve bedeutet Widerstand.
Takeaway-Satz: `Steile Gerade bedeutet Vakuum, abflachende Kurve bedeutet Widerstand mit konstanter Endgeschwindigkeit.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Rechnung zu $v_E$ (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Planung: Beim naechsten Mal pruefe ich zuerst Medium und Fallhoehe, weil sie ueber Ideal- oder Widerstandsmodell entscheiden.
