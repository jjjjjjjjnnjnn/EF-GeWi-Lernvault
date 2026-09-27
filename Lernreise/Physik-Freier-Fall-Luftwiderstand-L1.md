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

<!-- Campaign: Mars-Mission | Episode 16/28 | Krise: Sol-093 Treibstoff-Rest nur 22 kg Hydrazin | Zielgroessen: Fall aus Hoehe h mit Luftwiderstand, Ziel Endgeschwindigkeit | Tool: kinematik-lab -->

## Schritt 1 — entdecken: Karussell im Orbit
ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Die Bewegungsgleichung $m \cdot a = m \cdot g - F_W$ aufstellen und die Widerstandskraft $F_W$ beschreiben.
2. Den Unterschied zwischen idealisiertem Fall ($v = g \cdot t$) und realem Fall mit Saettigung erklaeren.
3. Aus $s$-$t$- und $v$-$t$-Diagrammen auf Luftwiderstand schliessen (AFB II).

VORAUSSETZUNG: Gleichmaessig beschleunigte Bewegung, Newton-Axiome und Ablesen von $s$-$t$- sowie $v$-$t$-Diagrammen.

VORGAENGER-VERWEIS: Diese Lektion setzt `Physik-Kinematik-Messung-L1.md` und `Physik-Newton-Dynamik-L1.md` voraus und wiederholt sie nicht. Dort wurden idealisierte Bewegungen ohne Widerstand und Kraeftezerlegung eingefuehrt. Hier folgt der enge Ausschnitt: nur der freie Fall mit geschwindigkeitsabhaengigem Luftwiderstand und der Uebergang in die konstante Endgeschwindigkeit.

### Hook / Phaenomen

真空里锤子羽毛齐落地，空气里却分先后：阻力随速度长大，吃掉加速度，最后匀速收尾，v-t图从抛物线变成直线。

Hook / Phaenomen: Hammer und Feder fallen im Vakuum gleich schnell, in Luft nicht: Der **Luftwiderstand** waechst mit dem Tempo und frisst die Beschleunigung auf. Am Ende siegt das Kraeftegleichgewicht, die **Endgeschwindigkeit** bleibt konstant. Das **v-t-Diagramm** zeigt den Uebergang von Parabel zu Gerade.

`Klausur-Satz: Freier Fall heisst konstante Beschleunigung g; Luftwiderstand bremst bis zum Kraeftegleichgewicht mit konstanter Endgeschwindigkeit.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING (Kernbegriffe):

- Freier Fall: Fallbewegung unter Schwerkraft mit $a = g = 9{,}81 \, \mathrm{m/s^2}$ im Idealfall. Ohne Luft gilt konstante Beschleunigung g und parabelfoermiger Weg. Mechanismus: Weg und Tempo mit g und Zeit berechnen. Klausur-Tipp: Vakuum als Voraussetzung nennen.
- Luftwiderstand $F_W$: Gegen die Bewegung gerichtete Kraft, naeherungsweise $F_W = k \cdot v$ oder $F_W = c \cdot v^2$. Er waechst mit dem Tempo und wirkt stets gegen die Bewegung. Mechanismus: Widerstandskraft gegen Gewichtskraft bilanzieren. Klausur-Tipp: Richtung des Widerstands begruenden.
- Bewegungsgleichung: $m \cdot a = m \cdot g - F_W(v)$. Sie verknuepft Gewicht, Widerstand und Beschleunigung; im freien Fall bleibt nur m mal g uebrig. Mechanismus: Newton mit allen Kraeften aufstellen. Klausur-Tipp: Alle Kraefte mit Vorzeichen fuehren.
- Endgeschwindigkeit $v_E$: Konstante Geschwindigkeit bei $m \cdot g = F_W(v_E)$. Dort heben sich Gewicht und Widerstand exakt auf. Mechanismus: Kraeftegleichgewicht null setzen und nach v aufloesen. Klausur-Tipp: Gleichgewichtsbedingung ausdruecklich nennen.
- $v$-$t$-Diagramm: Zeigt beim realen Fall eine abflachende Kurve statt einer Geraden. Die Steigung zeigt Beschleunigung, die Flaeche den Weg. Mechanismus: Kurve in Anlaufphase und Gleichgewicht teilen. Klausur-Tipp: Achsen mit Einheiten beschriften.

`Klausur-Satz: Bei Erreichen der Endgeschwindigkeit kompensiert der Luftwiderstand die Gewichtskraft, sodass die resultierende Kraft null ist.`

## Schritt 3 — entdecken: Wirkungskette hinter Freier Fall mit Luftwiderstand
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

$$s = \frac{1}{2}gt^2,\quad v_E = \text{const im Kraeftegleichgewicht}$$
`Klausur-Satz: Die Abflachung der v-t-Kurve zeigt das Anwachsen des Luftwiderstands bis zum Kraeftegleichgewicht.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Fallschirmspringer erreichen in Bauchlage etwa $200 \, \mathrm{km/h}$, im senkrechten Dive sogar ueber $400 \, \mathrm{km/h}$. Der geoeffnete Schirm vergroessert die Angriffsflaeche so stark, dass die neue Endgeschwindigkeit nur noch etwa $20 \, \mathrm{km/h}$ betraegt.

**Bezug zum Konzept**: `Die Endgeschwindigkeit haengt von Masse und Widerstandsflaeche ab und ist daher steuerbar.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Karussell im Orbit
Kontinuitaet: Vorher Physik-Freier-Fall-Luftwiderstand-DE-L1.md | Nachher Physik-Gleichfoermige-Kreisbewegung-DE-L1.md. Krise dieser Episode: Sol-093 Treibstoff-Rest nur 22 kg Hydrazin. Zielgroessen: Fall aus Hoehe h mit Luftwiderstand, Ziel Endgeschwindigkeit

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: kinematik-lab]

AUFGABE (berechnen, AFB II): Eine Kugel der Masse $m = 0{,}50 \, \mathrm{kg}$ faellt mit linearem Widerstandsmodell $F_W = k \cdot v$ und $k = 0{,}75 \, \mathrm{Ns/m}$. Berechnen Sie die Endgeschwindigkeit und vergleichen Sie die Fallgeschwindigkeit nach $1{,}0 \, \mathrm{s}$ mit dem idealisierten Wert.

HILFE:
1. Schritt 1: Bedingung $m \cdot g = k \cdot v_E$ nach $v_E$ aufloesen.
2. Schritt 2: Idealisierten Wert $v = g \cdot t$ berechnen.
3. Schritt 3: Vergleich deuten.

MUSTERLOESUNG: Aus $m \cdot g = k \cdot v_E$ folgt $v_E = m \cdot g / k = 0{,}50 \cdot 9{,}81 / 0{,}75 = 6{,}54 \, \mathrm{m/s}$. Idealisiert gilt $v = 9{,}81 \cdot 1{,}0 = 9{,}81 \, \mathrm{m/s}$. Der reale Wert liegt darunter, weil bereits nach einer Sekunde ein erheblicher Teil der Gewichtskraft durch $F_W$ kompensiert wird. Die Kugel kann $9{,}81 \, \mathrm{m/s}$ mit diesem Widerstand nie erreichen, da $v_E = 6{,}54 \, \mathrm{m/s}$ die obere Schranke bildet.

`Klausur-Satz: Die berechnete Endgeschwindigkeit von 6,54 m/s begrenzt jede reale Fallgeschwindigkeit nach unten wie nach oben im Vergleich zum Idealwert.`

## Schritt 5 — ausprobieren: Duell der Verfahren Karussell im Orbit
VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle erst das Verfahren — (i) Ideal-Verfahren (ohne Widerstand: $v = g \cdot t$, $s = g t^2 / 2$) oder (ii) Widerstands-Verfahren (mit $F_W$, Saettigung und $v_E$) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Eine Stahlkugel faellt $2 \, \mathrm{m}$ im Vakuumrohr. Welche Formeln gelten?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Ein Tischtennisball faellt aus $10 \, \mathrm{m}$ Hoehe in Luft. Welche Deutung verlangt das $v$-$t$-Diagramm?

HILFE: A nennt Vakuum, also Verfahren (i). B nennt leichte Kugel plus grosse Hoehe in Luft, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $v = g \cdot t$ und $s = g t^2/2$ ohne Korrektur. B erfordert Verfahren (ii): Die Kurve flacht ab, die Endgeschwindigkeit ist schnell erreicht, die Fallzeit ist deutlich laenger als $t = \sqrt{2s/g}$.

`Klausur-Satz: Im Vakuum traegt das Idealmodell, in Luft bei grosser Flaeche und kleiner Masse nur das Widerstandsmodell.`

## Schritt 6 — check: Selbsttest zu Freier Fall mit Luftwiderstand: Karussell im Orbit
CHECK (drei Fragen mit Antworten):

- FRAGE: Wie lautet die Bewegungsgleichung mit Widerstand? | ANTWORT: $m \cdot a = m \cdot g - F_W(v)$ mit $F_W$ entgegen der Geschwindigkeit.
- FRAGE: Wie folgt die Endgeschwindigkeit aus dem Kraeftegleichgewicht? | ANTWORT: Aus $m \cdot g = F_W(v_E)$, beim linearen Modell $v_E = m \cdot g / k$.
- FRAGE: Woran erkennt man Luftwiderstand im $v$-$t$-Diagramm? | ANTWORT: An der Abflachung der Kurve bis zur Horizontalen $v = v_E$ statt einer Geraden mit Steigung $g$.

`Klausur-Satz: Die Sattigung der v-t-Kurve ist der graphische Beleg fuer geschwindigkeitsabhaengigen Widerstand.`

## Fehlvorstellung

1. Fehlvorstellung: Schwere Koerper fallen grundsätzlich immer deutlich schneller als leichte.
   Korrektur-Satz: `Im Vakuum fallen alle Koerper gleich schnell; Unterschiede in Luft stammen aus dem Verhaeltnis von Gewicht zu Widerstandsflaeche.`

2. Fehlvorstellung: Der Luftwiderstand sei konstant und koenne einfach von $g$ abgezogen werden.
   Korrektur-Satz: `Der Luftwiderstand haengt von der Momentangeschwindigkeit ab und waechst waehrend des Falls bis zum Kraeftegleichgewicht.`

## Schritt 7 — szenario: Klausurtransfer: Freier Fall mit Luftwiderstand: Karussell im Orbit
ROLLE: Du bist Messassistentin im Physikkurs.
SITUATION: Zwei $v$-$t$-Diagramme liegen vor: Kurve A ist eine Gerade mit Steigung $g$, Kurve B flacht nach $2 \, \mathrm{s}$ deutlich ab. Entscheide in circa 150 Woertern, welche Kurve zum Fall im Vakuum und welche zum Fall mit Luftwiderstand gehoert, und bestimme graphisch die Endgeschwindigkeit von Kurve B.
RUBRIC (30 XP): Richtige Zuordnung beider Kurven (8 XP) | Begruendung mit Kraeftegleichung (10 XP) | Ablesen von $v_E$ aus der Horizontalen (6 XP) | Fachsprachliche Darstellung (6 XP).

`Klausur-Satz: Wer Bewegungsgleichung aufstellt, Endgeschwindigkeit aus dem Gleichgewicht bestimmt und Diagramm deutet, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Karussell im Orbit
TAKEAWAY:

Ohne Luft gilt $v = g \cdot t$, mit Luft gilt $m \cdot a = m \cdot g - F_W(v)$ und Sattigung bei $v_E$. Die Kurve verrät das Modell.
Takeaway-Satz: `Steile Gerade bedeutet Vakuum, abflachende Kurve bedeutet Widerstand mit konstanter Endgeschwindigkeit.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die Rechnung zu $v_E$ (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal pruefe ich zuerst das Medium und die Fallhoehe, weil sie ueber Ideal- oder Widerstandsmodell entscheiden.

`Klausur-Satz: Gleichgewicht beendet jede Beschleunigung: Konstante Kraft gegen wachsenden Widerstand endet in konstanter Geschwindigkeit.`
