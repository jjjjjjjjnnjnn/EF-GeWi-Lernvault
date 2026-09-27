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

<!-- Lesson v3 architecture: Schritte 1-8 fixed; Fehlvorstellung between Schritt 6 and 7 (parser skipped); embedded [Werkzeug: <id>]; gating: check/szenario failed = Weiter greyed; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Die Bewegungsgleichung $m \cdot a = m \cdot g - F_W$ aufstellen und die Widerstandskraft $F_W$ beschreiben.
2. Den Unterschied zwischen idealisiertem Fall ($v = g \cdot t$) und realem Fall mit Saettigung erklaeren.
3. Aus $s$-$t$- und $v$-$t$-Diagrammen auf Luftwiderstand schliessen (AFB II).

VORAUSSETZUNG: Gleichmaessig beschleunigte Bewegung, Newton-Axiome und Ablesen von $s$-$t$- sowie $v$-$t$-Diagrammen.

VORGAENGER-VERWEIS: Diese Lektion setzt `Physik-Kinematik-Messung-L1.md` und `Physik-Newton-Dynamik-L1.md` voraus und wiederholt sie nicht. Dort wurden idealisierte Bewegungen ohne Widerstand und Kraeftezerlegung eingefuehrt. Hier folgt der enge Ausschnitt: nur der freie Fall mit geschwindigkeitsabhaengigem Luftwiderstand und der Uebergang in die konstante Endgeschwindigkeit.

Klausur-Satz: `Der Luftwiderstand waechst mit der Geschwindigkeit und begrenzt den freien Fall auf eine konstante Endgeschwindigkeit.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe):

- Freier Fall: Fallbewegung unter Schwerkraft mit $a = g = 9{,}81 \, \mathrm{m/s^2}$ im Idealfall.
- Luftwiderstand $F_W$: Gegen die Bewegung gerichtete Kraft, naeherungsweise $F_W = k \cdot v$ oder $F_W = c \cdot v^2$.
- Bewegungsgleichung: $m \cdot a = m \cdot g - F_W(v)$.
- Endgeschwindigkeit $v_E$: Konstante Geschwindigkeit bei $m \cdot g = F_W(v_E)$.
- $v$-$t$-Diagramm: Zeigt beim realen Fall eine abflachende Kurve statt einer Geraden.

Klausur-Satz: `Bei Erreichen der Endgeschwindigkeit kompensiert der Luftwiderstand die Gewichtskraft, sodass die resultierende Kraft null ist.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Diagramm):

Zu Beginn dominiert die Gewichtskraft, der Koerper beschleunigt fast mit $g$. Mit wachsender Geschwindigkeit waechst $F_W$, die resultierende Kraft $m \cdot g - F_W$ schrumpft, die Beschleunigung sinkt. Im Grenzfall gilt $F_W = m \cdot g$, also $a = 0$: Der Koerper faellt mit konstanter Endgeschwindigkeit weiter. Im $v$-$t$-Diagramm startet die Kurve steil mit Steigung $g$ und schmiegt sich dann asymptotisch an die Horizontale $v = v_E$.

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

**Anekdote / Fun-Fact (DE)**: Fallschirmspringer erreichen in Bauchlage etwa $200 \, \mathrm{km/h}$, im senkrechten Dive sogar ueber $400 \, \mathrm{km/h}$. Der geoeffnete Schirm vergroessert die Angriffsflaeche so stark, dass die neue Endgeschwindigkeit nur noch etwa $20 \, \mathrm{km/h}$ betraegt.

**Bezug zum Konzept**: `Die Endgeschwindigkeit haengt von Masse und Widerstandsflaeche ab und ist daher steuerbar.`

## Schritt 4 — ausprobieren

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: kinematik]

AUFGABE (berechnen, AFB II): Eine Kugel der Masse $m = 0{,}50 \, \mathrm{kg}$ faellt mit linearem Widerstandsmodell $F_W = k \cdot v$ und $k = 0{,}75 \, \mathrm{Ns/m}$. Berechnen Sie die Endgeschwindigkeit und vergleichen Sie die Fallgeschwindigkeit nach $1{,}0 \, \mathrm{s}$ mit dem idealisierten Wert.

HILFE:
1. Schritt 1: Bedingung $m \cdot g = k \cdot v_E$ nach $v_E$ aufloesen.
2. Schritt 2: Idealisierten Wert $v = g \cdot t$ berechnen.
3. Schritt 3: Vergleich deuten.

MUSTERLOESUNG: Aus $m \cdot g = k \cdot v_E$ folgt $v_E = m \cdot g / k = 0{,}50 \cdot 9{,}81 / 0{,}75 = 6{,}54 \, \mathrm{m/s}$. Idealisiert gilt $v = 9{,}81 \cdot 1{,}0 = 9{,}81 \, \mathrm{m/s}$. Der reale Wert liegt darunter, weil bereits nach einer Sekunde ein erheblicher Teil der Gewichtskraft durch $F_W$ kompensiert wird. Die Kugel kann $9{,}81 \, \mathrm{m/s}$ mit diesem Widerstand nie erreichen, da $v_E = 6{,}54 \, \mathrm{m/s}$ die obere Schranke bildet.

Klausur-Satz: `Die berechnete Endgeschwindigkeit von 6,54 m/s begrenzt jede reale Fallgeschwindigkeit nach unten wie nach oben im Vergleich zum Idealwert.`

## Schritt 5 — ausprobieren

VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: Waehle erst das Verfahren — (i) Ideal-Verfahren (ohne Widerstand: $v = g \cdot t$, $s = g t^2 / 2$) oder (ii) Widerstands-Verfahren (mit $F_W$, Saettigung und $v_E$) — dann loesen.

AUFGABE A: Eine Stahlkugel faellt $2 \, \mathrm{m}$ im Vakuumrohr. Welche Formeln gelten?

AUFGABE B: Ein Tischtennisball faellt aus $10 \, \mathrm{m}$ Hoehe in Luft. Welche Deutung verlangt das $v$-$t$-Diagramm?

HILFE: A nennt Vakuum, also Verfahren (i). B nennt leichte Kugel plus grosse Hoehe in Luft, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $v = g \cdot t$ und $s = g t^2/2$ ohne Korrektur. B erfordert Verfahren (ii): Die Kurve flacht ab, die Endgeschwindigkeit ist schnell erreicht, die Fallzeit ist deutlich laenger als $t = \sqrt{2s/g}$.

Klausur-Satz: `Im Vakuum traegt das Idealmodell, in Luft bei grosser Flaeche und kleiner Masse nur das Widerstandsmodell.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die Bewegungsgleichung mit Widerstand? | ANTWORT: $m \cdot a = m \cdot g - F_W(v)$ mit $F_W$ entgegen der Geschwindigkeit.
FRAGE: Wie folgt die Endgeschwindigkeit aus dem Kraeftegleichgewicht? | ANTWORT: Aus $m \cdot g = F_W(v_E)$, beim linearen Modell $v_E = m \cdot g / k$.
FRAGE: Woran erkennt man Luftwiderstand im $v$-$t$-Diagramm? | ANTWORT: An der Abflachung der Kurve bis zur Horizontalen $v = v_E$ statt einer Geraden mit Steigung $g$.

Klausur-Satz: `Die Sattigung der v-t-Kurve ist der graphische Beleg fuer geschwindigkeitsabhaengigen Widerstand.`

## Fehlvorstellung

1. Fehlvorstellung: Schwere Koerper fallen grundsätzlich immer deutlich schneller als leichte.
   Korrektur-Satz: `Im Vakuum fallen alle Koerper gleich schnell; Unterschiede in Luft stammen aus dem Verhaeltnis von Gewicht zu Widerstandsflaeche.`

2. Fehlvorstellung: Der Luftwiderstand sei konstant und koenne einfach von $g$ abgezogen werden.
   Korrektur-Satz: `Der Luftwiderstand haengt von der Momentangeschwindigkeit ab und waechst waehrend des Falls bis zum Kraeftegleichgewicht.`

## Schritt 7 — szenario

ROLLE: Du bist Messassistentin im Physikkurs.
SITUATION: Zwei $v$-$t$-Diagramme liegen vor: Kurve A ist eine Gerade mit Steigung $g$, Kurve B flacht nach $2 \, \mathrm{s}$ deutlich ab. Entscheide in circa 150 Woertern, welche Kurve zum Fall im Vakuum und welche zum Fall mit Luftwiderstand gehoert, und bestimme graphisch die Endgeschwindigkeit von Kurve B.
RUBRIC (30 XP): Richtige Zuordnung beider Kurven (8 XP) | Begruendung mit Kraeftegleichung (10 XP) | Ablesen von $v_E$ aus der Horizontalen (6 XP) | Fachsprachliche Darstellung (6 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY:

Ohne Luft gilt $v = g \cdot t$, mit Luft gilt $m \cdot a = m \cdot g - F_W(v)$ und Sattigung bei $v_E$. Die Kurve verrät das Modell.
Takeaway-Satz: `Steile Gerade bedeutet Vakuum, abflachende Kurve bedeutet Widerstand mit konstanter Endgeschwindigkeit.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die Rechnung zu $v_E$ (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst das Medium und die Fallhoehe, weil sie ueber Ideal- oder Widerstandsmodell entscheiden.
