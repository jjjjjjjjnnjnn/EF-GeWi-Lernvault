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

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst den pH starker Saeuren direkt aus $pH = -\lg c_0$ berechnen, weil $[H_3O^+] = c_0$ gilt.
2. Du kannst fuer schwache Saeuren die Naeherung $[H_3O^+] = \sqrt{K_s \cdot c_0}$ aus dem MWG herleiten und anwenden.
3. Du kannst anhand von $K_s$ entscheiden, welche Formel zulaessig ist, und die Naeherung mit $x/c_0 < 5\,\%$ pruefen (AFB II).

### Hook / Phaenomen

Reiner Zitronensaft und Magensalzsaeure schmecken beide sauer — doch ihre $pH$-Werte entstehen voellig anders: Die eine Saeure gibt fast jedes Proton ab, die andere nur einen Bruchteil. Der Geschmack taeuscht ueber die Chemie hinweg. Warum liefert $0{,}10\,\mathrm{mol/L}$ Essigsaeure nur $pH = 2{,}87$, waehrend $0{,}10\,\mathrm{mol/L}$ Salzsaeure $pH = 1{,}00$ zeigt — bei gleicher Konzentration fast zwei Einheiten Unterschied? Essigsaeure schmeckt milder als Salzsaeure bei kleinerer Konzentration, weil nur starke Saeuren vollstaendig dissoziieren mit $[H_3O^+] = c_0$ und $pH = -\lg[H_3O^+]$. Schwache Saeuren folgen Ks ueber die Dreisatztabelle mit Pflichtpruefung x durch c0 kleiner 5 Prozent. Tropfenweise Titration zeigt den Sprung am Aequivalenzpunkt mit Indikatorumschlag. Wer Staerke, Weg und Pruefung mit weil und deshalb verbindet, beherrscht jede pH-Rechnung.

### Fachbegriff & Definition

Eine **starke Saeure** protolysiert **praktisch vollstaendig**, also gilt $[H_3O^+] = c_0$ und $pH = -\lg c_0$ — ein Schritt genuegt. Eine **schwache Saeure** steht im **Protolysegleichgewicht** $HA + H_2O \rightleftharpoons H_3O^+ + A^-$ mit $K_s = \frac{[H_3O^+][A^-]}{[HA]}$; nur der Bruchteil $x$ liegt als Ionen vor. Der **$pK_s$-Wert** ($pK_s = -\lg K_s$) ordnet die Staerke: je kleiner, desto staerker die Saeure. Die logarithmische Form der Naeherung heisst **Ostwald-Formel**: $pH = 0{,}5 \cdot (pK_s - \lg c_0)$.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Staerke pruefen, Ansatz waehlen, Naeherung kontrollieren**. Mit $[H_3O^+] = [A^-] = x$ und $[HA] = c_0 - x$ folgt $K_s = x^2/(c_0 - x)$. Die Naeherung $x \ll c_0$ kuerzt den Nenner zu $c_0$, also $x = \sqrt{K_s \cdot c_0}$ und $pH = -\lg x$. Sie ist nur tragfaehig, wenn $x$ unter etwa $5\,\%$ von $c_0$ bleibt — etwa $x/c_0 = 1{,}34 \cdot 10^{-3}/0{,}10 = 1{,}3\,\%$ bei Essigsaeure. Sonst muss die quadratische Gleichung geloest werden; $K_s$ relativ zu $c_0$ entscheidet.

Klausur-Satz: `Starke Saeuren protolysieren vollstaendig, schwache nur teilweise gemaess ihrer Saeurekonstante K_s.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Gleicher $pH$ aus hoher Konzentration einer schwachen oder niedriger Konzentration einer starken Saeure — der $pH$ allein verraet die Staerke nicht. Woran erkennt man in Sekunden, ob die Wurzelformel erlaubt ist oder die quadratische Gleichung droht? Fuenf Begriffe sind das Fruehwarnsystem.

### Fachbegriffe & Definitionen

- **Starke Saeure:** Protolysiert praktisch vollstaendig, also $[H_3O^+] = c_0$; Beispiele $HCl$ ($pK_s \approx -6$) und $HNO_3$ — direkt $pH = -\lg c_0$.
- **Schwache Saeure:** Gleichgewicht $HA + H_2O \rightleftharpoons H_3O^+ + A^-$ mit $K_s = \frac{[H_3O^+][A^-]}{[HA]}$; Beispiel Essigsaeure mit $K_s = 1{,}8 \cdot 10^{-5}\,\mathrm{mol/L}$.
- **Naeherung:** Bei $K_s \ll c_0$ gilt $[H_3O^+] = \sqrt{K_s \cdot c_0}$; der Nenner $c_0 - x$ wird zu $c_0$ gekuerzt.
- **$pK_s$-Wert:** $pK_s = -\lg K_s$; je kleiner, desto staerker die Saeure — er ordnet $HCl$, $HAc$ und $H_2O$ auf einer Skala.
- **Ostwald-Formel:** $pH = 0{,}5 \cdot (pK_s - \lg c_0)$ als logarithmische Form der Naeherung — ein Rechenschritt statt Wurzel plus Logarithmus.

### Wirkungsgefuege / Modell

Die Begriffe bilden die Entscheidungsstrasse: **$K_s$ lesen, Verfahren waehlen, $x/c_0$ pruefen**. Nur $c_0$ bei starker Saeure verlangt direktes $-\lg$; $K_s$ bei schwacher Saeure verlangt Dreisatztabelle mit Pruefung. Die Faustregel schuetzt vor dem klassischen Fehler — direktes Einsetzen bei schwachen Saeuren unterschaetzt den $pH$ um mehrere Einheiten. Nach jeder Rechnung folgt die Kontrolle $x/c_0 < 5\,\%$; ohne sie kostet selbst das richtige Ergebnis Abzug.

Klausur-Satz: `Die Naeherung gilt nur fuer schwache Saeuren mit kleinem K_s relativ zur Ausgangskonzentration.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Warum liefert die Wurzelformel $x = \sqrt{K_S \cdot c_0}$ fast denselben $pH$ wie die volle quadratische Loesung, obwohl ein Term gestrichen wurde? Die Naeherung versteckt sich in $c_0 - x$. Wann darf man kuerzen, und wann bricht die Wippe zwischen Bequemlichkeit und Genauigkeit?

### Spiel-Aufgabe

Spiel-Aufgabe im Kopf-Labor: Tropfe $NaOH$ in die schwache Saeure und beobachte $pH$-Pfeil und Sprung am Aequivalenzpunkt. Verschiebe den $c_0$-Regler von $0{,}01$ bis $0{,}50\,\mathrm{mol/L}$ und notiere $x/c_0$ in Prozent. Erklaere in einem Satz mit weil, warum $x/c_0 < 5\,\%$ die Naeherung erlaubt.

### Aha-Moment & Gesetz

Aha-Moment und Gesetz: Die Kausalkette lautet Ansatz, Kuerzung, Kontrolle. Aus $K_S = \frac{x^2}{c_0 - x}$ wird mit $c_0 - x \approx c_0$ die Wurzel $x = \sqrt{K_S \cdot c_0}$ und $pH = -\lg x$. Es gilt $pH + pOH = 14$ und $K_w = [H_3O^+] \cdot [OH^-]$. Die Kontrolle $\frac{x}{c_0} < 5\,\%$ entscheidet ueber Zulassung; starke Saeuren brauchen keine Tabelle, weil $[H_3O^+] = c_0$ gilt.

```diagram
    K_S = x^2/(c0 - x) --Naeherung x<<c0--> x = Wurzel(K_S*c0)
    Beispiel: c0 = 0,10, K_S = 1,8*10^-5 --> x = 1,34*10^-3 --> pH = 2,87
    Kontrolle: x/c0 = 1,3 % < 5 % --> Pfeil gruen (zulaessig)
    stark gleicher Konz.: pH = 1,00 (Pfeil weit links, viel saurer)
    Titration: Sprung am Aequivalenzpunkt, Indikator schlaegt um.
```

Klausur-Satz: `Die Wurzelformel folgt aus dem MWG unter der Annahme geringer Protolyse.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Reiner Zitronensaft und Magensalzsaeure schmecken beide sauer, doch ihre $pH$-Werte entstehen voellig anders: Die eine Saeure gibt fast jedes Proton ab, die andere nur einen Bruchteil. Der Geschmack taeuscht ueber die Chemie hinweg.

**Bezug zum Konzept**: `Gleicher pH kann aus hoher Konzentration einer schwachen oder niedriger Konzentration einer starken Saeure stammen.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Titrations-Labor

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: titration-lab]

AUFGABE (Spiel-Auftrag, AFB II, 3 Stufen): Stufe 1 Wurzelziehen: Berechne $pH$ fuer $0{,}10\,\mathrm{mol/L}$ $HAc$ mit $x = \sqrt{K_S \cdot c_0}$. Stufe 2 Vergleichen: Stelle $pH = 2{,}87$ gegen $pH = 1{,}00$ bei starker Saeure gleicher Konzentration. Stufe 3 Pruefen: Entscheide per $x/c_0$-Ampel ueber die Naeherung. Gib im Titrations-Labor Tropfen fuer Tropfen NaOH zu und verstelle den pH-Regler schrittweise und verfolge pH-Sprung und Indikatorfarbe bis zum Aequivalenzpunkt.

HILFE:
1. Schritt 1: $K_S = 1{,}8 \cdot 10^{-5}$ einsetzen.
2. Schritt 2: $x = 1{,}34 \cdot 10^{-3}$, $pH = -\lg x$.
3. Schritt 3: $1{,}3\,\% < 5\,\%$ bedeutet gruen.

MUSTERLOESUNG: Mit $x = \sqrt{1{,}8 \cdot 10^{-5} \cdot 0{,}10} = 1{,}34 \cdot 10^{-3}\,\mathrm{mol/L}$ folgt $pH = -\lg(1{,}34 \cdot 10^{-3}) = 2{,}87$. Eine starke Saeure gleicher Konzentration gaebe $pH = 1{,}00$, weil dort $[H_3O^+] = c_0$ gilt. Die Kontrolle $x/c_0 = 1{,}3\,\% < 5\,\%$ bestaetigt die Wurzelformel, weil der Protolysegrad klein ist.

Klausur-Satz: `Mit zulaessiger Naeherung folgt pH = 2,87 statt pH = 1,00 bei starker Saeure gleicher Konzentration.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH (erst Verfahren waehlen, dann loesen):

VERGLEICH: Waehle erst das Verfahren — (i) Stark-Verfahren ($[H_3O^+] = c_0$) oder (ii) Schwach-Verfahren ($x = \sqrt{K_s \cdot c_0}$ mit Gueltigkeitstest) — dann loesen.

AUFGABE A: Salzsaeure $c_0 = 0{,}010 \, \mathrm{mol/L}$, vollstaendige Protolyse. Welches Verfahren passt?

AUFGABE B: Fluorwasserstoff $c_0 = 0{,}010 \, \mathrm{mol/L}$, $K_s = 6{,}6 \cdot 10^{-4}$. Welches Verfahren passt?

HILFE: A nennt vollstaendige Protolyse, also Verfahren (i). B nennt $K_s$, also Verfahren (ii) mit Test.

ANTWORT: A erfordert Verfahren (i): $pH = -\log 0{,}010 = 2{,}00$. B erfordert Verfahren (ii): $x = \sqrt{6{,}6 \cdot 10^{-4} \cdot 0{,}010} = 2{,}57 \cdot 10^{-3}$, $pH = 2{,}59$; Test $x/c_0 = 0{,}26$ ueberschreitet $0{,}05$, daher ist die Naeherung hier grenzwertig und die quadratische Loesung sicherer.

Klausur-Satz: `Ohne K_s traegt das Stark-Verfahren, mit kleinem K_s das Schwach-Verfahren inklusive Gueltigkeitstest.`

## Schritt 6 — check: Verständnisprüfung

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

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist Laborassistentin und pruefst zwei Flaschen.
SITUATION: Flasche A enthaelt $0{,}10 \, \mathrm{mol/L}$ Salzsaeure, Flasche B $0{,}10 \, \mathrm{mol/L}$ Essigsaeure. Erklaere in circa 150 Woertern mit beiden Verfahren, welche pH-Werte zu erwarten sind und warum ein pH-Streifen allein die Saeuren nicht sicher unterscheidet.
RUBRIC (30 XP): Stark-Verfahren korrekt (8 XP) | Schwach-Verfahren mit Test (10 XP) | Vergleich und Deutung (8 XP) | Fachsprachliche Darstellung (4 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY:

Stark bedeutet direkt, schwach bedeutet Wurzel plus Test. Erst $K_s$ lesen, dann Verfahren waehlen.
Takeaway-Satz: `Starke Saeuren rechnen mit c_0, schwache mit Wurzel aus K_s mal c_0 — stets mit Gueltigkeitstest.`

REFLEXION:
1. Welcher Schritt fiel schwerer — die Wurzelrechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal lese ich zuerst $K_s$ und $c_0$, weil ihr Verhaeltnis das Verfahren festlegt.
