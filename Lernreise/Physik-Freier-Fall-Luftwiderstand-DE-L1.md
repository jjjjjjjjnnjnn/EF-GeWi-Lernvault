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

<!-- Campaign: Mars-Mission | Episode 15/28 | Krise: Sol-089 Andock-Radar meldet Relativtempo 3,8 m/s | Zielgroessen: Fall aus Hoehe h mit Luftwiderstand, Ziel Endgeschwindigkeit | Tool: kinematik-lab -->

## Schritt 1 — entdecken: Zentrifuge der Umlaufbahn
ZIELE (drei messbare Ziele dieser Lektion):

1. $m a = m g - F_W(v)$ mit $F_W = k v$ aufstellen und Richtungen benennen.
2. Ideal $v = g t$ gegen real mit Saettigung $v_E$ unterscheiden und $v_E = 6{,}54\,\mathrm{m/s}$ einordnen.
3. An $s$-$t$ Parabel gegen Linie und $v$-$t$ Gerade gegen Abflachung auf $F_W$ schliessen.

### Hook / Phaenomen

Hook / Phaenomen: Hammer und Feder fallen im Vakuum gleich schnell, in Luft nicht: Der **Luftwiderstand** waechst mit dem Tempo und frisst die Beschleunigung auf. Am Ende siegt das Kraeftegleichgewicht, die **Endgeschwindigkeit** bleibt konstant. Das **v-t-Diagramm** zeigt den Uebergang von Parabel zu Gerade.

`Klausur-Satz: Freier Fall heisst konstante Beschleunigung g; Luftwiderstand bremst bis zum Kraeftegleichgewicht mit konstanter Endgeschwindigkeit.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Freier Fall:** Das Ideal ohne Luft mit $a=g=9{,}81\,m/s^2$ laesst alle Koerper gleich fallen. Ohne Luft gilt konstante Beschleunigung g und parabelfoermiger Weg. Mechanismus: $v=gt$ und $s=\frac12gt^2$ anwenden. Klausur-Tipp: Vakuum nennen und Idealformeln ohne Korrektur nutzen.
- **Luftwiderstand:** Die Kraft $F_W=kv$ wirkt gegen die Bewegung und waechst mit $v$. Er waechst mit dem Tempo und wirkt stets gegen die Bewegung. Mechanismus: Widerstand in $ma=mg-F_W(v)$ einsetzen. Klausur-Tipp: Richtung gegen $v$ nennen und Wachstum mit Tempo begruenden.
- **Bewegungsgleichung:** Die Bilanz $ma=mg-F_W(v)$ steuert die Beschleunigung aus Gewicht minus Widerstand. Sie verknuepft Gewicht, Widerstand und Beschleunigung; im freien Fall bleibt nur m mal g uebrig. Mechanismus: Kraefte mit Richtungen ansetzen und $a$ ablesen. Klausur-Tipp: Gleichung aufstellen und Start mit $a=g$ deuten.
- **Endgeschwindigkeit:** Bei $mg=F_W(v_E)$ gilt $a=0$ und der Fall wird konstant mit $v_E$. Dort heben sich Gewicht und Widerstand exakt auf. Mechanismus: Gleichgewicht ansetzen und nach $v_E$ aufloesen. Klausur-Tipp: $v_E$ berechnen und als Grenze jeder realen Kurve deuten.
- **v-t-Diagramm:** Die reale Kurve flacht gegen $v_E$ ab statt als Gerade zu steigen. Die Steigung zeigt Beschleunigung, die Flaeche den Weg. Mechanismus: Abflachung als Widerstandssignatur lesen. Klausur-Tipp: Gerade gegen Kurve zuordnen und $v_E$ aus der Horizontalen ablesen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

`Klausur-Satz: Bei Erreichen der Endgeschwindigkeit kompensiert der Luftwiderstand die Gewichtskraft, sodass die resultierende Kraft null ist.`

## Schritt 3 — entdecken: Wirkungskette hinter Freier Fall mit Luftwiderstand
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft vom Gewicht ueber den Widerstand zum Gleichgewicht: Zuerst starten $v=0$ mit $F_W=0$ und $a=g$, dann waechst $F_W$ mit $v$ und die Differenz $mg-F_W$ schrumpft, schliesslich gilt $mg=F_W(v_E)$ mit $a=0$ und konstantem $v_E$. Ideal gilt $v=gt$ als Gerade, real naehert sich $v$ an $v_E=6{,}54\,m/s$ als Horizontale. Die Abflachung der v-t-Kurve beweist das Anwachsen des Widerstands bis zum Kraeftegleichgewicht.

```diagram
+------------------------------------------+
| v=0: FW=0, a=g  ->  Start steil         |
| v waechst: FW waechst, a sinkt          |
| mg = FW(vE) -> a=0, v=vE konstant       |
| ideal: Gerade v=g t | real: Kurve -> vE |
+------------------------------------------+
```
Formelkern: $v=0$

$$s = \frac{1}{2}gt^2,\quad v_E = \text{const im Kraeftegleichgewicht}$$
`Klausur-Satz: Die Abflachung der v-t-Kurve zeigt das Anwachsen des Luftwiderstands bis zum Kraeftegleichgewicht.`

## Anekdote & Fun-Fact
**Anekdote / Fun-Fact (DE)**: Fallschirmspringer erreichen in Bauchlage etwa $200\,\mathrm{km/h}$, im senkrechten Dive sogar ueber $400\,\mathrm{km/h}$. Der geoeffnete Schirm vergroessert die Angriffsflaeche so stark, dass die neue Endgeschwindigkeit nur noch etwa $20\,\mathrm{km/h}$ betraegt.

**Bezug zum Konzept**: `Die Endgeschwindigkeit haengt von Masse und Widerstandsflaeche ab und ist daher steuerbar.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Zentrifuge der Umlaufbahn
Kontinuitaet: Vorher Physik-Freier-Fall-Luftwiderstand-CN-L1.md | Nachher Physik-Freier-Fall-Luftwiderstand-L1.md. Krise dieser Episode: Sol-089 Andock-Radar meldet Relativtempo 3,8 m/s. Zielgroessen: Fall aus Hoehe h mit Luftwiderstand, Ziel Endgeschwindigkeit

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: kinematik-lab]

AUFGABE (Levelziel, AFB II): Knacke das Fall-Level: Ziehe im Sandbox-Labor die Slider Masse, Flaeche und Luftdichte durch je drei Stufen und beobachte, wie die $v$-gegen-$t$-Kurve ideal als Gerade steigt und real gegen $v_E$ abflacht. Lies $v_E$ ab, schalte Vakuum an und aus und begruende per Kraeftegleichgewicht, warum $6{,}54$ jede reale Kurve begrenzt. Vergleiche mit ideal $v=gt$.

HILFE:
1. Lies $v_E = 6{,}54$ im Luft-Modus ab und verfolge Abflachung gegen Horizontale.
2. Setze linear $F_W = k v$ und im Gleichgewicht $m g = k v_E$ an und loese nach $v_E = m g/k = 6{,}54\,\mathrm{m/s}$ auf.
3. Vergleiche ideal $v = gt$ als fruehe Grenze mit $v_E$ als spaeter Grenze.

MUSTERLOESUNG: Labor $v_E = 6{,}54\,\mathrm{m/s}$ im Luft-Modus mit Abflachung gegen die Horizontale. Linear gilt $m g - k v = 0$, also $v_E = m g/k = 6{,}54\,\mathrm{m/s}$. Ideal $v = g t$ waechst linear, real flacht durch $k v$ ab bis $v_E$. Daher begrenzt $6{,}54\,\mathrm{m/s}$ jede reale Kurve, die Abflachung beweist den linearen Widerstand bis zum Gleichgewicht.

`Klausur-Satz: Die berechnete Endgeschwindigkeit von 6,54 m/s begrenzt jede reale Fallgeschwindigkeit nach unten wie nach oben im Vergleich zum Idealwert.`

## Schritt 5 — ausprobieren: Duell der Verfahren Zentrifuge der Umlaufbahn
VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle zuerst das Verfahren — (i) Ideal-Verfahren (ohne Widerstand: $v = g \cdot t$, $s = g t^2 / 2$) oder (ii) Widerstands-Verfahren (mit $F_W$, Saettigung und $v_E$) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Eine Stahlkugel faellt $2\,\mathrm{m}$ im Vakuumrohr. Welche Formeln gelten?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Ein Tischtennisball faellt aus $10\,\mathrm{m}$ Hoehe in Luft. Welche Deutung verlangt das $v$-$t$-Diagramm?

HILFE: A nennt Vakuum, also Verfahren (i). B nennt leichte Kugel plus grosse Hoehe in Luft, also Verfahren (ii). Faustregel: Vakuum oder schwer und kurz verlangt ideal, leicht und hoch in Luft verlangt Widerstand.

ANTWORT: A erfordert Verfahren (i): $v = g \cdot t$ und $s = g t^2/2$ ohne Korrektur. B erfordert Verfahren (ii): Die Kurve flacht ab, $v_E$ ist schnell erreicht, die Fallzeit ist deutlich laenger als $t = \sqrt{2s/g}$.

`Klausur-Satz: Im Vakuum traegt das Idealmodell, in Luft bei grosser Flaeche und kleiner Masse nur das Widerstandsmodell.`

## Schritt 6 — check: Selbsttest zu Freier Fall mit Luftwiderstand: Zentrifuge der Umlaufbahn
CHECK (Selbsttest, 3 Fragen mit Antworten):

- FRAGE: Wie lautet die Bewegungsgleichung mit Widerstand? | ANTWORT: $m \cdot a = m \cdot g - F_W(v)$ mit $F_W$ entgegen der Geschwindigkeit.
- FRAGE: Wie folgt $v_E$ aus dem Kraeftegleichgewicht? | ANTWORT: Aus $m \cdot g = F_W(v_E)$, linear $v_E = m \cdot g / k$.
- FRAGE: Woran erkennt man Widerstand im $v$-$t$-Diagramm? | ANTWORT: An der Abflachung bis zur Horizontalen $v = v_E$ statt Gerade mit Steigung $g$.

`Klausur-Satz: Die Sattigung der v-t-Kurve ist der graphische Beleg fuer geschwindigkeitsabhaengigen Widerstand.`

## Fehlvorstellung
(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Schwere Koerper fallen grundsaetzlich immer deutlich schneller als leichte.
   Korrektur: Im Vakuum fallen alle gleich schnell; Unterschiede in Luft stammen aus Gewicht je Widerstandsflaeche.
   Korrektur-Satz: `Im Vakuum fallen alle Koerper gleich schnell; Unterschiede in Luft stammen aus dem Verhaeltnis von Gewicht zu Widerstandsflaeche.`
2. Fehlannahme: Widerstand sei konstant und koenne von $g$ abgezogen werden.
   Korrektur: $F_W$ haengt von der Momentangeschwindigkeit ab und waechst bis zum Gleichgewicht.
   Korrektur-Satz: `Der Luftwiderstand haengt von der Momentangeschwindigkeit ab und waechst waehrend des Falls bis zum Kraeftegleichgewicht.`

## Schritt 7 — szenario: Klausurtransfer: Freier Fall mit Luftwiderstand: Zentrifuge der Umlaufbahn
ROLLE: Du bist Messassistentin im Physikkurs.
SITUATION: Zwei $v$-$t$-Diagramme liegen vor: Kurve A ist eine Gerade mit Steigung $g$, Kurve B flacht nach $2\,\mathrm{s}$ deutlich ab. Entscheide in circa 150 Woertern, welche Kurve zu Vakuum und welche zu Luft gehoert, und bestimme graphisch $v_E$ von Kurve B.
RUBRIC (30 XP): Richtige Zuordnung beider Kurven (8 XP) | Begruendung mit Kraeftegleichung (10 XP) | Ablesen von $v_E$ aus der Horizontalen (6 XP) | Fachsprachliche Darstellung (6 XP).

`Klausur-Satz: Wer Bewegungsgleichung aufstellt, Endgeschwindigkeit aus dem Gleichgewicht bestimmt und Diagramm deutet, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Zentrifuge der Umlaufbahn
TAKEAWAY (Kernzusammenfassung):

Ohne Luft gilt $v = g \cdot t$, mit Luft $m \cdot a = m \cdot g - F_W(v)$ mit Saettigung bei $v_E$. Die Kurve verraet das Modell: steile Gerade bedeutet Vakuum, abflachende Kurve bedeutet Widerstand.
Takeaway-Satz: `Steile Gerade bedeutet Vakuum, abflachende Kurve bedeutet Widerstand mit konstanter Endgeschwindigkeit.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Rechnung zu $v_E$ (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Planung: Beim naechsten Mal pruefe ich zuerst Medium und Fallhoehe, weil sie ueber Ideal- oder Widerstandsmodell entscheiden.

`Klausur-Satz: Gleichgewicht beendet jede Beschleunigung: Konstante Kraft gegen wachsenden Widerstand endet in konstanter Geschwindigkeit.`
