---
fach: Chemie
thema: "pH starker und schwacher Saeuren mit Ks-Naeherung"
level: 1
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Saeuren]
version: Lesson-v3
---

# Lernreise: pH starker und schwacher Saeuren mit Ks-Naeherung (L1, Ziel Klausur)

<!-- Lesson v3 architecture: Schritte 1-8 fixed; Fehlvorstellung between Schritt 6 and 7 (parser skipped); embedded [Werkzeug: <id>]; gating: check/szenario failed = Weiter greyed; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Den pH starker Saeuren direkt aus $pH = -\log c_0$ berechnen.
2. Fuer schwache Saeuren die Naeherung $[H_3O^+] = \sqrt{K_s \cdot c_0}$ herleiten und anwenden.
3. Anhand von $K_s$ entscheiden, welche Formel zulaessig ist (AFB II).

VORAUSSETZUNG: Logarithmus, MWG-Ausdruck und Protolysegleichungen.

VORGAENGER-VERWEIS: Diese Lektion setzt `Chemie-Saeure-Base-pH-L1.md` voraus und wiederholt sie nicht. Dort wurden pH-Definition, starke Saeuren und das Ablesen aus Skalen eingefuehrt. Hier folgt der enge Ausschnitt: nur die Unterscheidung stark/schwach mit $K_s$-Naeherung; Puffer und Titration gehoeren nicht hierher.

Klausur-Satz: `Starke Saeuren protolysieren vollstaendig, schwache nur teilweise gemaess ihrer Saeurekonstante K_s.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe):

- Starke Saeure: Protolysiert praktisch vollstaendig, also $[H_3O^+] = c_0$.
- Schwache Saeure: Gleichgewicht $HA + H_2O \rightleftharpoons H_3O^+ + A^-$ mit $K_s = [H_3O^+][A^-]/[HA]$.
- Naeherung: Bei $K_s \ll c_0$ gilt $[H_3O^+] = \sqrt{K_s \cdot c_0}$.
- $pK_s$-Wert: $pK_s = -\log K_s$; je kleiner, desto staerker die Saeure.
- Ostwald-Formel: $pH = 0{,}5 \cdot (pK_s - \log c_0)$ als logarithmische Form der Naeherung.

Klausur-Satz: `Die Naeherung gilt nur fuer schwache Saeuren mit kleinem K_s relativ zur Ausgangskonzentration.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Diagramm):

Bei starken Saeuren ist die Rechnung trivial, bei schwachen entscheidet das Gleichgewicht. Mit $[H_3O^+] = [A^-] = x$ und $[HA] = c_0 - x$ folgt $K_s = x^2/(c_0 - x)$. Die Naeherung $x \ll c_0$ kuerzt den Nenner zu $c_0$, also $x = \sqrt{K_s \cdot c_0}$. Sie ist nur tragfaehig, wenn $x$ unter etwa $5$ Prozent von $c_0$ bleibt; sonst muss die quadratische Gleichung geloest werden.

```diagram
stark:   HA -> H3O+ + A-        [H3O+] = c_0        pH = -log c_0
schwach: HA <-> H3O+ + A-       K_s = x^2/(c_0-x)   x = sqrt(K_s*c_0)
Test:    x/c_0 < 0,05? Naeherung ok : quadratisch loesen
pH-Skala: sauer <- 7 -> basisch, je Einheit Faktor 10
```

Klausur-Satz: `Die Wurzelformel folgt aus dem MWG unter der Annahme geringer Protolyse.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Reiner Zitronensaft und Magensalzsaeure schmecken beide sauer, doch ihre $pH$-Werte entstehen voellig anders: Die eine Saeure gibt fast jedes Proton ab, die andere nur einen Bruchteil. Der Geschmack taeuscht ueber die Chemie hinweg.

**Bezug zum Konzept**: `Gleicher pH kann aus hoher Konzentration einer schwachen oder niedriger Konzentration einer starken Saeure stammen.`

## Schritt 4 — ausprobieren

BEISPIEL (vollstaendige Musterloesung):

[Werkzeug: balance]

AUFGABE (berechnen, AFB II): Berechnen Sie den pH von Essigsaeure mit $c_0 = 0{,}10 \, \mathrm{mol/L}$ und $K_s = 1{,}8 \cdot 10^{-5}$. Pruefen Sie die Naeherung.

HILFE:
1. Schritt 1: $x = \sqrt{K_s \cdot c_0}$ berechnen.
2. Schritt 2: $pH = -\log x$ bilden.
3. Schritt 3: $x/c_0$ pruefen.

MUSTERLOESUNG: Es gilt $x = \sqrt{1{,}8 \cdot 10^{-5} \cdot 0{,}10} = \sqrt{1{,}8 \cdot 10^{-6}} = 1{,}34 \cdot 10^{-3} \, \mathrm{mol/L}$. Damit folgt $pH = -\log(1{,}34 \cdot 10^{-3}) = 2{,}87$. Die Pruefung ergibt $x/c_0 = 0{,}0134$, also $1{,}3$ Prozent; die Naeherung ist zulaessig. Zum Vergleich: Eine starke Saeure derselben Konzentration haette $pH = 1{,}00$.

Klausur-Satz: `Mit zulaessiger Naeherung folgt pH = 2,87 statt pH = 1,00 bei starker Saeure gleicher Konzentration.`

## Schritt 5 — ausprobieren

VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: Waehle erst das Verfahren — (i) Stark-Verfahren ($[H_3O^+] = c_0$) oder (ii) Schwach-Verfahren ($x = \sqrt{K_s \cdot c_0}$ mit Gueltigkeitstest) — dann loesen.

AUFGABE A: Salzsaeure $c_0 = 0{,}010 \, \mathrm{mol/L}$, vollstaendige Protolyse. Welches Verfahren passt?

AUFGABE B: Fluorwasserstoff $c_0 = 0{,}010 \, \mathrm{mol/L}$, $K_s = 6{,}6 \cdot 10^{-4}$. Welches Verfahren passt?

HILFE: A nennt vollstaendige Protolyse, also Verfahren (i). B nennt $K_s$, also Verfahren (ii) mit Test.

ANTWORT: A erfordert Verfahren (i): $pH = -\log 0{,}010 = 2{,}00$. B erfordert Verfahren (ii): $x = \sqrt{6{,}6 \cdot 10^{-4} \cdot 0{,}010} = 2{,}57 \cdot 10^{-3}$, $pH = 2{,}59$; Test $x/c_0 = 0{,}26$ ueberschreitet $0{,}05$, daher ist die Naeherung hier grenzwertig und die quadratische Loesung sicherer.

Klausur-Satz: `Ohne K_s traegt das Stark-Verfahren, mit kleinem K_s das Schwach-Verfahren inklusive Gueltigkeitstest.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie berechnet man den pH einer starken Saeure? | ANTWORT: Mit $[H_3O^+] = c_0$ und $pH = -\log c_0$.
FRAGE: Wie lautet die Naeherung fuer schwache Saeuren? | ANTWORT: $[H_3O^+] = \sqrt{K_s \cdot c_0}$ beziehungsweise $pH = 0{,}5 \cdot (pK_s - \log c_0)$.
FRAGE: Wann ist die Naeherung unzulaessig? | ANTWORT: Wenn $x/c_0$ groesser als etwa $0{,}05$ ist; dann muss $K_s = x^2/(c_0 - x)$ exakt geloest werden.

Klausur-Satz: `Jede Wurzelrechnung ohne Gueltigkeitstest ist klausurtechnisch unvollstaendig.`

## Fehlvorstellung

1. Fehlvorstellung: Der pH haenge nur von $c_0$ ab, $K_s$ sei Dekoration.
   Korrektur-Satz: `Bei schwachen Saeuren bestimmt K_s den Protolysengrad und damit den pH bei gleicher Ausgangskonzentration.`

2. Fehlvorstellung: Die Wurzelformel gelte fuer jede Saeure mit bekanntem $K_s$.
   Korrektur-Satz: `Die Wurzelformel gilt nur bei geringer Protolyse; sonst ist die quadratische Gleichung zu loesen.`

## Schritt 7 — szenario

ROLLE: Du bist Laborassistentin und pruefst zwei Flaschen.
SITUATION: Flasche A enthaelt $0{,}10 \, \mathrm{mol/L}$ Salzsaeure, Flasche B $0{,}10 \, \mathrm{mol/L}$ Essigsaeure. Erklaere in circa 150 Woertern mit beiden Verfahren, welche pH-Werte zu erwarten sind und warum ein pH-Streifen allein die Saeuren nicht sicher unterscheidet.
RUBRIC (30 XP): Stark-Verfahren korrekt (8 XP) | Schwach-Verfahren mit Test (10 XP) | Vergleich und Deutung (8 XP) | Fachsprachliche Darstellung (4 XP).

## Schritt 8 — entdecken

TAKEAWAY:

Stark bedeutet direkt, schwach bedeutet Wurzel plus Test. Erst $K_s$ lesen, dann Verfahren waehlen.
Takeaway-Satz: `Starke Saeuren rechnen mit c_0, schwache mit Wurzel aus K_s mal c_0 — stets mit Gueltigkeitstest.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die Wurzelrechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst $K_s$ und $c_0$, weil ihr Verhaeltnis das Verfahren festlegt.
