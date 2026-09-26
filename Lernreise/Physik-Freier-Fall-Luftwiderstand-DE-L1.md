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

1. Die Bewegungsgleichung $m \cdot a = m \cdot g - F_W$ aufstellen und $F_W$ beschreiben.
2. Idealisierten Fall ($v = g \cdot t$) und realen Fall mit Saettigung unterscheiden.
3. Aus $s$-$t$- und $v$-$t$-Diagrammen auf Luftwiderstand schliessen.

Klausur-Satz: `Der Luftwiderstand waechst mit der Geschwindigkeit und begrenzt den freien Fall auf eine konstante Endgeschwindigkeit.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Freier Fall: Fall unter Schwerkraft mit $a = g = 9{,}81\,\mathrm{m/s^2}$ im Idealfall.
- Luftwiderstand $F_W$: Kraft gegen die Bewegung, naeherungsweise $F_W = k \cdot v$ oder $F_W = c \cdot v^2$.
- Bewegungsgleichung: $m \cdot a = m \cdot g - F_W(v)$.
- Endgeschwindigkeit $v_E$: konstantes Tempo bei $m \cdot g = F_W(v_E)$.
- $v$-$t$-Diagramm: realer Fall als abflachende Kurve statt Gerade.

Klausur-Satz: `Bei Erreichen der Endgeschwindigkeit kompensiert der Luftwiderstand die Gewichtskraft, sodass die resultierende Kraft null ist.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Zu Beginn dominiert die Gewichtskraft, der Koerper beschleunigt fast mit $g$. Mit wachsendem $v$ waechst $F_W$, die Differenz $m \cdot g - F_W$ schrumpft, $a$ sinkt. Im Grenzfall gilt $F_W = m \cdot g$, also $a = 0$: Der Koerper faellt mit konstanter Endgeschwindigkeit weiter. Im $v$-$t$-Diagramm startet die Kurve steil mit Steigung $g$ und schmiegt sich dann asymptotisch an die Horizontale $v = v_E$.

```diagram
v ^
  |                        ............ v_E (Endgeschwindigkeit)
  |                   .....
  |               ....
  |            ...
  |          ..
  |        ..
  |      ..
  |    ..
  |  ..
  +----------------------------------> t
  Startsteigung = g, dann Abflachung durch F_W(v)
  Kraefte: m*g nach unten, F_W nach oben
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
