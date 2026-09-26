---
fach: Physik
thema: "Federpendel und harmonische Schwingung"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, Schwingung]
version: Lesson-v3
---

# Lernreise: Federpendel und harmonische Schwingung (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. $T = 2\pi\sqrt{m/D}$ mit $m$ und $D$ nennen und $m = 0{,}50\,\mathrm{kg}$, $D = 20\,\mathrm{N/m}$ zu $T \approx 0{,}99\,\mathrm{s}$ rechnen.
2. Aus $F = -D x$ und $F = m a$ zu $\ddot{x}+Dx/m = 0$ formen und Minus als Rueckstellung deuten.
3. Per $\omega = \sqrt{D/m}$ und $f = 1/T$ aus $T$ auf $D$ oder $m$ schliessen.

### Hook / Phaenomen

Im Jahr 1656 baute Huygens die erste Pendeluhr — und machte Zeit erstmals alltagstauglich praezise. Galilei mass $1583$ die Domlampe mit seinem Puls und fand: Die Dauer haengt nicht von der Weite ab. Ein Federpendel stellt dasselbe Raetsel im Kleinen: Doppelte Masse heisst nicht doppelte Zeit. Warum folgt $T$ der Wurzel statt der Linie — und welche einzige Gleichung beweist den Kosinus?

### Fachbegriff & Definition

Fuer Schwingungen gilt: **Rueckstellkraft proportional zur Auslenkung erzeugt eine harmonische Schwingung, also $F = -D x$**. Es gilt **$T = 2\pi\sqrt{m/D}$ mit Masse $m$ und Federhaerte $D$**. Dabei misst **$\omega = \sqrt{D/m} = 2\pi f$ das Tempo in $1/\mathrm{s}$** und $x(t) = A\cos(\omega t+\phi_0)$ die Lage.

### Wirkungsgefuege / Modell

Der Mechanismus setzt Newton gegen Feder: $m\ddot{x} = -D x$ zu $\ddot{x}+Dx/m = 0$. Ansatz $x = A\cos(\omega t)$ liefert $\ddot{x} = -\omega^2 x$, also $\omega^2 = D/m$ und $\omega = \sqrt{D/m}$. Damit $T = 2\pi/\omega = 2\pi\sqrt{m/D}$. Zahlen $m = 0{,}50$, $D = 20$ zu $T = 2\pi\sqrt{0{,}025} \approx 0{,}99\,\mathrm{s}$. Energie $E = 0{,}5 D x^2+0{,}5 m v^2 = 0{,}5 D A^2$ pendelt zwischen Feder und Bewegung.

Schritt A: $F = -D x$ mit $F = m\ddot{x}$ gleichsetzen.
Schritt B: Kosinus einsetzen und $\omega^2 = D/m$ lesen.
Schritt C: $T$ bilden und Energie als Probe nutzen.

Klausur-Satz: `Rueckstellkraft proportional zur Auslenkung erzeugt eine harmonische Schwingung.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

### Hook / Phaenomen

Zwei Federn — weich und hart — tragen gleiche Masse. Die weiche schwingt traege, die harte zappelt. Gleiche Masse, doppeltes Tempo: Der Unterschied steckt in $D$, nicht in $A$. Welche fuenf Groessen stimmen das Pendel wie ein Instrument?

### Fachbegriffe & Definitionen

- **Auslenkung:** $x(t) = A\cos(\omega t+\phi_0)$; Abstand von der Ruhelage mit Amplitude $A$.
- **Federkonstante:** $D$ in $\mathrm{N/m}$; Haerte aus $F = -D x$.
- **Kreisfrequenz:** $\omega = \sqrt{D/m} = 2\pi f$ in $1/\mathrm{s}$; Tempo der Schwingung.
- **Periodendauer:** $T = 2\pi\sqrt{m/D}$; Zeit einer vollen Schwingung.
- **Energieerhaltung:** $E = 0{,}5 D x^2+0{,}5 m v^2 = 0{,}5 D A^2$; Wechsel zwischen Feder und Bewegung.

### Wirkungsgefuege / Modell

Die Kette stimmt $T$: $m$ hoch zu $T$ lang per Wurzel, $D$ hoch zu $T$ kurz per Wurzel. Doppelte Masse zu $\sqrt{2}$-facher Zeit — nicht doppelt. Die Energieprobe sichert: Umkehr $x = A$ zu $E = 0{,}5 D A^2$ mit $v = 0$; Nulldurchgang $x = 0$ zu $E = 0{,}5 m v_{max}^2$. Wer linear statt Wurzel denkt, halbiert oder verdoppelt falsch.

Klausur-Satz: `Groessere Masse verlaengert T, haertere Feder verkuerzt T.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

### Hook / Phaenomen

Ein Schueler verdoppelt $m$ und erwartet doppeltes $T$ — die Stoppuhr zeigt $\sqrt{2}$-fach. Seine Nachbarin verdoppelt $D$ und erwartet halbes $T$ — die Uhr zeigt $1/\sqrt{2}$. Beide irren linear in einer Wurzelwelt. Wie beweist das Minus in $F = -D x$ die Rueckstellung — und warum loest nur der Kosinus die Bewegungsgleichung?

### Fachbegriff & Definition

Das **Minus bedeutet Rueckstellung zur Ruhelage, der Kosinus $x(t) = A\cos(\omega t)$ loest $\ddot{x}+Dx/m = 0$ mit $\omega^2 = D/m$**. An der **Umkehr gilt $E = 0{,}5 D A^2$ mit $v = 0$, am Nulldurchgang $E = 0{,}5 m v_{max}^2$**. Das **Wurzelgesetz schlaegt lineare Intuition**: doppelte Masse heisst $\sqrt{2}$-fache Zeit.

### Wirkungsgefuege / Modell

Der Tiefenweg differenziert zweimal: $x = A\cos(\omega t)$ zu $\dot{x} = -A\omega\sin(\omega t)$ zu $\ddot{x} = -A\omega^2\cos(\omega t) = -\omega^2 x$. Einsetzen in $\ddot{x}+Dx/m = 0$ zu $(-\omega^2+D/m)x = 0$ erzwingt $\omega^2 = D/m$. Probe $m = 1{,}0$, $D = 10$ zu $\omega \approx 3{,}16$ und $T \approx 1{,}99\,\mathrm{s}$. Das Minus treibt zurueck, der Kosinus passt exakt.

Schritt A: Kosinus zweimal ableiten und $-\omega^2 x$ lesen.
Schritt B: In $\ddot{x}+Dx/m = 0$ einsetzen und $\omega$ bestimmen.
Schritt C: $T$ und Energie an Umkehr und Nulldurchgang pruefen.

```diagram
    x
    A |  *       *       *
      | * *     * *     * *
    0 |--*--*--*--*--*--*--*--> t
      |   T/4  T/2  3T/4   T
    -A|  Umkehr 0  Umkehr  0
      Ruhelage x=0: v maximal, E = m v^2 / 2
      Umkehr x=A: v=0, E = D A^2 / 2
      T = 2 pi Wurzel(m/D), w^2 = D/m per Kosinusprobe
```

Klausur-Satz: `Minuszeichen bedeutet Rueckstellung, Kosinus loest die Bewegungsgleichung.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der Uhrmacher Christiaan Huygens baute 1656 die erste Pendeluhr und mass die Sekundenstoesse mit $T = 2\,\mathrm{s}$. Seine Feder- und Pendelstudien mit $\omega = \sqrt{D/m}$ machten Zeit erstmals im Alltag praezise — ein Segen fuer Navigation und Wissenschaft. Schon 1583 soll Galileo Galilei im Dom von Pisa eine pendelnde Lampe mit seinem Puls vermessen und die Unabhaengigkeit von der Auslenkung bemerkt haben.

**Bezug zum Konzept**: `Huygens Uhr zeigt: Harmonische Schwingung macht Zeit messbar.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: kinematik]

AUFGABE (erklaeren, AFB II): Eine Masse $m = 0{,}25\,\mathrm{kg}$ haengt an einer Feder mit $D = 25\,\frac{\mathrm{N}}{\mathrm{m}}$. Berechnen Sie $T$ und $f$ und erklaeren Sie, wie sich $T$ bei doppelter Masse aendert.

HILFE:
1. Ansatz $T = 2\pi\sqrt{\frac{m}{D}}$ notieren.
2. Werte $m = 0{,}25$ und $D = 25$ einsetzen, dann $f = \frac{1}{T}$ berechnen.
3. Wurzelabhaengigkeit $T \sim \sqrt{m}$ fuer die Prognose nutzen.

MUSTERLOESUNG: Es gilt $T = 2\pi\sqrt{\frac{0{,}25}{25}} = 2\pi \cdot 0{,}1 \approx 0{,}628\,\mathrm{s}$ und $f \approx 1{,}59\,\mathrm{Hz}$. Bei doppelter Masse waechst $T$ um $\sqrt{2} \approx 1{,}41$ auf etwa $0{,}89\,\mathrm{s}$, weil nur die Wurzel der Masse eingeht.

Klausur-Satz: `Wurzelgesetz schlaegt lineare Intuition: doppelte Masse heisst nicht doppelte Zeit.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Zeitverfahren (mit $T = 2\pi\sqrt{m/D}$ rechnen) oder (ii) Energieverfahren (mit $E = \frac{1}{2}DA^2$ argumentieren) — dann loesen.

AUFGABE A: Wie aendert sich $T$, wenn $D$ vervierfacht wird?

AUFGABE B: Wie aendert sich die Maximalgeschwindigkeit, wenn $A$ verdoppelt wird?

HILFE: A nennt Federhaerte und Zeit, also Verfahren (i). B nennt Amplitude und Geschwindigkeit, also Verfahren (ii). Faustregel: Zeitfragen verlangen die Wurzelformel, Tempofragen die Energiebilanz.

ANTWORT: A erfordert Verfahren (i): $T \sim \frac{1}{\sqrt{D}}$, also halbiert sich $T$. B erfordert Verfahren (ii): Aus $\frac{1}{2}mv_{max}^2 = \frac{1}{2}DA^2$ folgt $v_{max} = A\sqrt{D/m}$, also verdoppelt sich $v_{max}$.

Klausur-Satz: `Zeitfragen brauchen die Wurzelformel, Tempofragen brauchen die Energiebilanz.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet die Periodendauer des Federpendels? | ANTWORT: $T = 2\pi\sqrt{\frac{m}{D}}$.
FRAGE: Wie lautet die Bewegungsgleichung? | ANTWORT: $\ddot{x} + \frac{D}{m}x = 0$ aus $F = -Dx$ und $F = m\ddot{x}$.
FRAGE: Wo ist die Geschwindigkeit maximal? | ANTWORT: In der Ruhelage $x = 0$, dort gilt $E = \frac{1}{2}mv_{max}^2$.

Klausur-Satz: `Ruhelage heisst schnell, Umkehrpunkt heisst Stillstand.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Groessere Amplitude bedeute groessere Periodendauer.
   Korrektur: Im ungedaempften Modell ist $T$ amplitudenunabhaengig; nur $m$ und $D$ zaehlen.
   Korrektur-Satz: `Die Periodendauer haengt nicht von der Amplitude ab.`
2. Fehlannahme: Am Umkehrpunkt wirke keine Kraft, weil die Geschwindigkeit null sei.
   Korrektur: Dort ist $|F| = DA$ maximal, nur $v = 0$; Kraft und Geschwindigkeit sind verschiedene Groessen.
   Korrektur-Satz: `Maximale Auslenkung bedeutet maximale Rueckstellkraft bei null Geschwindigkeit.`

## Schritt 7 — szenario

ROLLE: Du bist Laborassistent im Physikkurs.
SITUATION: Eine Gruppe meldet $T = 1{,}2\,\mathrm{s}$ fuer $m = 0{,}4\,\mathrm{kg}$ und behauptet $D = 5\,\frac{\mathrm{N}}{\mathrm{m}}$. Pruefen Sie die Angabe in einer zusammenhaengenden Darstellung (ca. 150 Woerter), berechnen Sie $D$ aus $T$ und beurteilen Sie Messfehlerquellen.
RUBRIC (30 XP): Umstellung $D = \frac{4\pi^2m}{T^2}$ korrekt (10 XP) | Zahlwert $D \approx 11\,\frac{\mathrm{N}}{\mathrm{m}}$ (10 XP) | Fehlerdiskussion Reibung und Zeitmessung (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Merke Rueckstellung, Wurzel, Energie: $F = -Dx$ erzeugt $T = 2\pi\sqrt{m/D}$ und $E = \frac{1}{2}DA^2$. Zeit haengt an $m$ und $D$, Tempo an der Lage im Zyklus.
Takeaway-Satz: `Rueckstellung erzeugt Wurzelgesetz und Energiependel: F = -Dx fuehrt zu T mit Wurzel aus m durch D.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Formelrechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Planung: Beim naechsten Mal schreibe ich zuerst Kraftansatz und Energieansatz nebeneinander, dann waehle ich.
