---
fach: Mathe
thema: "Ganzrationale Funktionen im Sachkontext"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, eroertern]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Ganzrationale Funktionen im Sachkontext (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst $E(x) = 12x$, $K(x) = 0{,}5x^3 - 6x^2 + 26x + 8$ und $G(x) = E(x) - K(x) = -0{,}5x^3 + 6x^2 - 14x - 8$ auf $D = [0, 12]$ mit $x$ in ME und Werten in GE aufstellen.
2. Du kannst Break-even als $G(x) = 0$ zu $x = 4$ und $x \approx 8{,}49$, Maximalgewinn als Hochpunkt bei $x \approx 6{,}58$ mit $G \approx 17{,}24$ GE und staerksten Anstieg als Wendepunkt bei $x = 4$ bestimmen.
3. Du kannst die Gewinnzone $4$ bis $8{,}49$ ME eroertern und jeden Wert mit $D$, ME und GE im Antwortsatz deuten (AFB II/III).

### Hook / Phaenomen

Ein Start-up meldet Rekordumsatz — und schreibt trotzdem rote Zahlen. Die Erloeskurve $E(x)$ steigt steil, die Kontokurve faellt. Der Widerspruch loest sich in einem Bild: $E(x)$ als Gerade gegen $K(x)$ als S-Kurve, zwei Schnittpunkte, dazwischen Gewinn, ausserhalb Verlust. Warum zeigt erst die Differenz $G(x) = E(x) - K(x)$, ob sich Produktion lohnt — und warum liegt der staerkste Anstieg genau dort, wo der Gewinn null ist?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Analysis wird im **Sachkontext die Gewinnfunktion als $G(x) = E(x) - K(x)$ auf einer sachnahen Definitionsmenge $D$ analysiert und oekonomisch gedeutet**. Dabei misst **$x$ in ME die Menge und $f(x)$ in GE den Geldwert**. Die **Nullstellen von $G$ heissen Break-even-Punkte**, der **Hochpunkt von $G$ heisst Maximalgewinn**, der **Wendepunkt von $G$ markiert den staerksten Anstieg**.

### Wirkungsgefuege / Modell

Der Mechanismus verbindet Oekonomie und Kurve: $E(x) = 12x$ waechst linear, $K(x) = 0{,}5x^3 - 6x^2 + 26x + 8$ folgt der S-Kurve aus Fixkostenverteilung und spaeteren Ueberstunden. Die Differenz $G(x) = -0{,}5x^3 + 6x^2 - 14x - 8$ bleibt ganzrational. Ihre Ableitung $G'(x) = -1{,}5x^2 + 12x - 14 = 0$ liefert $x \approx 1{,}42$ und $x \approx 6{,}58$; $G''(x) = -3x + 12$ sortiert Tief gegen Hoch. Die Nullstellen $4$ und $8{,}49$ begrenzen $G > 0$.

Schritt A: $G = E - K$ bilden und $D = [0, 12]$ ME notieren.
Schritt B: $G = 0$ fuer Break-even, $G' = 0$ mit $G''$ fuer Maximum loesen.
Schritt C: Jede Stelle mit ME und GE im Antwortsatz deuten.

Klausur-Satz: `Im Sachkontext wird die Gewinnfunktion als G(x) = E(x) - K(x) auf einer sachnahen Definitionsmenge analysiert und oekonomisch gedeutet.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Zwei Kennzahlen, zwei Geschichten: Der Umsatz pro Stueck ist konstant, der Gewinn pro Stueck nicht. Wer nur $E(x)$ liest, sieht Wachstum; wer $G(x)$ liest, sieht zwei Nullstellen und einen Berg dazwischen. Ohne Einheiten ME und GE bleibt jede Aussage punktlos. Welche fuenf Bausteine tragen jede Sachkontextloesung?

### Fachbegriffe & Definitionen

- **Mengeneinheit (ME):** Einheit von $x$; jede $x$-Angabe wie $x = 6{,}58$ ME braucht sie.
- **Geldeinheit (GE):** Einheit von $f(x)$; jeder Geldwert wie $17{,}24$ GE braucht sie.
- **Erloesfunktion $E(x)$:** Verkaufserloes je Menge, hier $E(x) = 12x$ in GE als Gerade durch den Ursprung.
- **Kostenfunktion $K(x)$:** Gesamtkosten aus fix und variabel, hier $K(x) = 0{,}5x^3 - 6x^2 + 26x + 8$ in GE als S-Kurve.
- **Gewinnfunktion $G(x)$:** $G(x) = E(x) - K(x)$; $G > 0$ ist Gewinnzone, $G = 0$ ist Break-even, Hochpunkt ist Maximalgewinn.

### Wirkungsgefuege / Modell

Die Kette lautet: $E$ minus $K$ ergibt $G$, $D = [0, 12]$ ME begrenzt die Gueltigkeit, $G' = -1{,}5x^2 + 12x - 14$ und $G'' = -3x + 12$ sortieren die Stellen. Ausserhalb von $D$ sind selbst korrekte Nullstellen oekonomisch sinnlos — etwa $x < 0$ als negative Produktion. Der Kapazitaetsrand $12$ ME schliesst die Deutung ab: $G(12) = -128$ GE warnt vor Ueberproduktion jenseits von $8{,}49$ ME.

Klausur-Satz: `Die Nullstellen von G(x) = E(x) - K(x) liefern die Break-even-Punkte, der Hochpunkt liefert den maximalen Gewinn.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Die Chefin fragt: Lohnt eine Ausweitung ueber $12$ ME hinaus? Der Graph antwortet ohne Rechnung: Rechts von $8{,}49$ ME verlaeuft $K$ ueber $E$, die Gewinnzone ist geschlossen. Doch erst Ableitung und Einheiten machen daraus eine klausurfeste Eroerterung. Wie wird aus dem Bild ein Urteil mit Break-even, Maximum und Wende — und warum gehoert zu jedem Wert ein Satz mit ME und GE?

### Fachbegriff & Definition

Die **Gewinnzone ist das Intervall mit $G(x) > 0$ zwischen den beiden Break-even-Punkten — hier zwischen $x = 4$ ME und $x \approx 8{,}49$ ME**. Ausserhalb gilt $G(x) < 0$ als Verlustzone auf $D$. Der **Wendepunkt bei $x_W = 4$ ME mit $W(4, 0)$ markiert den staerksten Gewinnanstieg**, weil dort $G'' = 0$ mit Vorzeichenwechsel gilt und $G'$ maximal wird.

### Wirkungsgefuege / Modell

Der Tiefenweg in Zahlen: $G(4) = -32 + 96 - 56 - 8 = 0$ bestaetigt BE1 exakt. Aus $G'(x) = -1{,}5x^2 + 12x - 14 = 0$ folgt $x^2 - 8x + 28/3 = 0$ zu $x \approx 1{,}42$ und $6{,}58$. Mit $G''(1{,}42) > 0$ als Tiefpunkt und $G''(6{,}58) < 0$ als Hochpunkt sowie $G(6{,}58) \approx 17{,}24$ GE gegen $G(0) = -8$ GE und $G(12) = -128$ GE steht das Maximum. Die Wende $x_W = 4$ aus $G'' = -3x + 12 = 0$ faellt hier mit BE1 zusammen — staerkster Anstieg am Eintritt in die Gewinnzone.

Schritt A: $G$ bilden und $G = 0$ per GTR loesen.
Schritt B: $G' = 0$ mit $G''$ zu Hoch und Tief sortieren.
Schritt C: Raender $0$ und $12$ vergleichen und Gewinnzone im Satz deuten.

```diagram
       GE ^
          |      E(x)=12x  /
          |              /      ___ G(x) Gewinnberg
          |            /    .--     --.
          |          /   .               .
          |  K(x) .   .   Gewinnzone     .
          |   .--  .  (G>0 zwischen        .
          | .    .    Break-even 1 und 2)    .
          +----------------------------------------> x in ME
          0   BE1=4  Wende=4  Hmax ca.6.58  BE2 ca.8.49   12
       G(x) = E(x) - K(x) | D = [0; 12] ME
       G'(x) = -1.5x^2+12x-14 = 0 > x ca.1.42 / 6.58
       Nullstelle = Break-even | Hochpunkt = Maximalgewinn
```

Klausur-Satz: `Zwischen den beiden Break-even-Punkten gilt G(x) > 0, ausserhalb gilt G(x) < 0 auf der sachnahen Definitionsmenge.`

## Anekdote & Fun-Fact

Ein Gruender prahlte mit steigendem Umsatz, doch sein Konto blieb leer. Ein Berater zeichnete $E(x)$ und $K(x)$ in ein Bild und zeigte: Die Kurven schneiden sich zweimal, und nur dazwischen liegt die Gewinnzone. Ausserhalb frisst $K$ das $E$ auf. Seitdem plant die Firma jede Menge mit $G(x) = E(x) - K(x)$.

Bezug zum Konzept: `Erst die Differenz G(x) = E(x) - K(x) zeigt, in welchem Mengenintervall Produktion lohnt.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II): Gegeben sind $E(x) = 12x$ und $K(x) = 0{,}5x^3 - 6x^2 + 26x + 8$ auf $D = [0, 12]$ ($x$ in ME, Werte in GE). Bestimmen Sie die Gewinnfunktion $G(x)$, die Break-even-Punkte und die gewinnmaximale Menge.

HILFE:
1. Schritt 1: Gewinnfunktion bilden: $G(x) = E(x) - K(x)$ ausrechnen und Definitionsmenge mit Einheiten notieren.
2. Schritt 2: Break-even als Nullstellen von $G$ suchen: $G(x) = 0$ mit GTR oder Naeherung loesen.
3. Schritt 3: Maximum als Hochpunkt von $G$ suchen: $G'(x) = 0$ plus $G''(x)$ und Randwerte auf $D$ pruefen.

MUSTERLOESUNG: Es gilt $G(x) = 12x - (0{,}5x^3 - 6x^2 + 26x + 8) = -0{,}5x^3 + 6x^2 - 14x - 8$ auf $D = [0, 12]$ ME. Aus $G(x) = 0$ folgt mit GTR $x_{BE1} = 4$ ME und $x_{BE2} \approx 8{,}49$ ME; Probe: $G(4) = -32 + 96 - 56 - 8 = 0$. Weiter gilt $G'(x) = -1{,}5x^2 + 12x - 14 = 0$, also $x^2 - 8x + 28/3 = 0$, somit $x \approx 1{,}42$ oder $x \approx 6{,}58$. Mit $G''(x) = -3x + 12$ gilt $G''(1{,}42) > 0$ (Tiefpunkt) und $G''(6{,}58) < 0$ (Hochpunkt). Mit $G(6{,}58) \approx 17{,}24$ GE, $G(0) = -8$ GE und $G(12) = -128$ GE ist $x \approx 6{,}58$ ME die gewinnmaximale Menge, die Gewinnzone liegt zwischen $4$ ME und $8{,}49$ ME. Der Wendepunkt liegt bei $x_W = 4$ ME mit $W(4, 0)$.

Klausur-Satz: `Auf D = [0; 12] ME liegt die Gewinnzone zwischen x = 4 ME und x ca. 8.49 ME, die gewinnmaximale Menge liegt bei x ca. 6.58 ME.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) graphische Deutung (Schnittpunkte, Gewinnzone und Trend an den Schnittpunkten von $E$ und $K$ ablesen) oder (ii) rechnerische Bestimmung (Nullstellen, Hochpunkt und Wende von $G$ mit Ableitung berechnen) > dann loesen.

AUFGABE A: Skizzieren Sie $E(x) = 10x$ und $K(x) = 0{,}25x^3 - 4x^2 + 20x + 8$ auf $D = [0, 14]$ in einem Bild. Lesen Sie die Break-even-Bereiche ab und beschreiben Sie, wo sich $E$ und $K$ schneiden.
AUFGABE B: Fuer $G(x) = -0{,}25x^3 + 4x^2 - 10x - 8$ auf $D = [0, 14]$ berechnen Sie exakt Break-even-Punkte, Hochpunkt und Wendepunkt und deuten Sie jede Stelle oekonomisch.

HILFE: Aufgabe A nennt $skizzieren$, $ablesen$ und $beschreiben$, daher Verfahren (i) ohne Ableitung. Aufgabe B nennt $berechnen$ plus Hochpunkt und Wendepunkt, daher Verfahren (ii) mit Ableitung und Nachweis.

ANTWORT: A erfordert Verfahren (i): $E$ als Gerade, $K$ als S-Kurve; zwei Schnittpunkte begrenzen die Gewinnzone, links von BE1 und rechts von BE2 liegt Verlustzone, weil $K$ ueber $E$ verlaeuft. B erfordert Verfahren (ii): $G(x) = 0$ liefert BE-Punkte per GTR, $G'(x) = -0{,}75x^2 + 8x - 10 = 0$ liefert Kandidaten, $G''$ entscheidet Hoch gegen Tief, $G'' = 0$ plus Vorzeichenwechsel liefert die Wende als staerksten Anstieg; jede Stelle erhaelt Einheiten ME und GE plus Satz im Kontext.

Klausur-Satz: `Die graphische Deutung liest Gewinnzonen an Schnittpunkten ab, die rechnerische Bestimmung sichert sie mit Ableitung und Einheiten.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie haengen $E(x)$, $K(x)$ und $G(x)$ zusammen und welche Einheiten tragen sie? | ANTWORT: Es gilt $G(x) = E(x) - K(x)$, $x$ in ME, alle Funktionswerte in GE, auf sachnaher Definitionsmenge $D$.
FRAGE: Was bedeuten Nullstelle, Hochpunkt und Wendepunkt von $G$ oekonomisch? | ANTWORT: Nullstelle ist Break-even, Hochpunkt ist Maximalgewinn, Wendepunkt ist staerkster Gewinnanstieg.
FRAGE: Warum darf $D$ nicht ignoriert werden? | ANTWORT: Weil Kapazitaet und negative Mengen unrealistisch sind; Aussagen ausserhalb von $D$ sind oekonomisch ungueltig.

Klausur-Satz: `Jede Aussage im Sachkontext braucht Definitionsmenge D plus Einheiten ME und GE.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Steigt der Erloes $E$, so steigt automatisch auch der Gewinn; die Analyse von $E$ genuegt.
   Korrektur-Satz: `Nicht der Anstieg von E, sondern Verlauf und Extrema von G(x) = E(x) - K(x) entscheiden ueber Gewinn.`
2. Fehlkonzept: Nullstellen und Extrema ohne Einheiten und Definitionsmenge ergeben bereits die volle Punktzahl.
   Korrektur-Satz: `Ohne Definitionsmenge, Einheiten ME und GE sowie Antwortsatz gilt eine Sachkontext-Loesung als unvollstaendig.`

## Schritt 7 — szenario

ROLLE: Du bist Junior-Controller in einem Startup.
SITUATION: $E(x) = 15x$, $K(x) = 0{,}4x^3 - 5x^2 + 28x + 15$, $D = [0, 15]$ ME, Werte in GE. Die Chefin will wissen, ab wann sich Produktion lohnt, wo der Gewinn maximal ist und ob eine Ausweitung ueber $12$ ME hinaus sinnvoll bleibt. Schreibe eine Stellungnahme (circa 150 Woerter) mit Rechnung und oekonomischer Deutung.
AUFGABE (eroertern, AFB III): Eroertere auf Basis von Break-even, Hochpunkt und Grenze von $D$, welche Mengenintervalle zu empfehlen sind.
RUBRIC (30 XP): $G(x)$ plus $D$ mit Einheiten korrekt (5 XP) | Break-even korrekt berechnet (10 XP) | Hochpunkt plus Wende korrekt (10 XP) | Eroerterung mit Empfehlung fuer Intervalle (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Der Sachkontext folgt drei Schritten: Modellieren von $G = E - K$ mit $D$ in ME und GE, Berechnen von Nullstellen, Extrema und Wende, Deuten jedes Ergebnisses im Intervall. Die Nullstelle steuert Break-even, der Hochpunkt den Maximalgewinn, die Wende den staerksten Anstieg. Die Graphik zeigt die Gerade $E$ gegen die S-Kurve $K$, die Algebra sichert jede Aussage mit Ableitung, Einheit und Antwortsatz.

Takeaway-Satz: `Modelliere G(x) = E(x) - K(x) auf D, berechne Nullstellen, Extrema und Wende und deute jedes Ergebnis mit ME und GE.`

REFLEXION (zwei Fragen):
1. Welcher Teil fiel schwerer: das Aufstellen von $G(x)$ mit Einheiten (Schritt 4) oder die Wahl zwischen Deutung und Rechnung im Vergleich (Schritt 5)?
2. Beim naechsten Mal notiere ich zuerst $D$, ME und GE und formuliere zu jedem Rechenergebnis sofort einen Antwortsatz.
