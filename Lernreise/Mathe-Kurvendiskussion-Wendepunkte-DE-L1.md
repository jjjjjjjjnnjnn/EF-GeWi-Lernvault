---
fach: Mathe
thema: "Kurvendiskussion und Wendepunkte"
level: 1
ziel: Klausur
xp: 100
operatoren: [analysieren, interpretieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Kurvendiskussion und Wendepunkte (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Kruemmung links gegen rechts an $f'' > 0$ und $f'' < 0$ unterscheiden und am Bild benennen.
2. Du kannst $f''(x) = 0$ loesen, den Vorzeichenwechsel pruefen und $W(x_W, f(x_W))$ mit Wendetangente $y = f'(x_W)(x-x_W)+f(x_W)$ angeben.
3. Du kannst $g(x) = x^4$ an $x = 0$ als Gegenbeispiel einordnen: $g'' = 0$ ohne Wechsel, also kein Wendepunkt (AFB II).

### Hook / Phaenomen

Im Jahr 2020 stieg die Fallkurve erst immer schneller, dann immer langsamer — der Wendepunkt markierte den Moment, in dem das Wachstum kippte. Manager, die nur die Hoehe lasen, reagierten zu spaet; wer die Kruemmung las, handelte frueh. Eine Epidemiekurve und eine Kostenkurve stellen dasselbe Raetsel: Wo endet beschleunigter Anstieg und beginnt gebremster — und warum reicht $f'' = 0$ allein nie als Beweis?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Analysis liegt ein **Wendepunkt genau dort, wo die zweite Ableitung null wird und ihr Vorzeichen wechselt, also die Kruemmung ihre Richtung aendert**. Dabei bedeutet **$f''(x) > 0$ linksgekrummt und $f''(x) < 0$ rechtsgekrummt**. Die **Wendetangente $y = f'(x_W)(x-x_W)+f(x_W)$ durchquert den Graphen im Wendepunkt**.

### Wirkungsgefuege / Modell

Der Mechanismus folgt drei Schritten: $f''(x) = 0$ liefert Kandidaten, Vorzeichenwechsel links gegen rechts entscheidet, Einsetzen liefert $W$. Am Muster mit $f''(2) = 0$ und Wechsel von $+$ nach $-$ sowie $W(2, 3)$ und Tangente $y = -3x+9$ kreuzt die Tangente den Graphen. Das Gegenbeispiel $g(x) = x^4$ mit $g''(0) = 0$ ohne Wechsel bleibt linksgekrummt beiderseits — kein Wechsel, kein Wendepunkt.

Schritt A: $f''$ bilden und $f'' = 0$ loesen.
Schritt B: Vorzeichen links und rechts vergleichen oder $f''' \ne 0$ pruefen.
Schritt C: $W$ einsetzen und Tangente aufstellen.

Klausur-Satz: `Ein Wendepunkt liegt genau dort, wo die zweite Ableitung null wird und ihr Vorzeichen wechselt, also die Kruemmung ihre Richtung aendert.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Zwei Stellen zeigen $f'' = 0$ — eine mit Kruemmungswechsel, eine ohne. Der Rechner meldet beide Male null, doch nur einmal liegt ein Wendepunkt vor. Die $x^4$-Falle schnappt bei jeder Klausur zu. Welche fuenf Begriffe sichern das Urteil in einer Zeile?

### Fachbegriffe & Definitionen

- **Kruemmung:** $f''(x) > 0$ zu linksgekrummt, $f''(x) < 0$ zu rechtsgekrummt.
- **Wendepunkt:** Punkt $W(x_W, f(x_W))$ mit Kruemmungswechsel; beide Koordinaten werden angegeben.
- **Nullstelle von $f''$:** Notwendige Bedingung $f''(x_W) = 0$; allein noch nicht hinreichend.
- **Vorzeichenwechsel (VZW):** Verschiedene Vorzeichen von $f''$ links und rechts; robuste hinreichende Bedingung.
- **Wendetangente:** $y = f'(x_W)(x-x_W)+f(x_W)$; sie kreuzt den Graphen in $W$.

### Wirkungsgefuege / Modell

Die Kette lautet: $f'' = 0$ liefert Verdacht, VZW faellt Urteil, $W$ plus Tangente schliesst ab. Fuer $g(x) = x^4$ gilt $g'' = 12x^2$ mit $g''(0) = 0$, doch $g'' > 0$ beiderseits — kein Wechsel, also kein Wendepunkt, sondern Tiefpunkt. Fuer $f(x) = x^3$ gilt $f'' = 6x$ mit Wechsel an $0$ — echter Wendepunkt. Der Unterschied steht nicht in der Nullstelle, sondern im Wechsel.

Klausur-Satz: `Aus f''(x_W) = 0 mit Vorzeichenwechsel folgt ein Wendepunkt, die Wendetangente beschreibt die Richtung an dieser Stelle.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Ein Logistikchef sieht kumulierte Auslieferungen: erst immer schneller, dann immer langsamer. Er fragt nach dem staerksten Moment — dem Wendepunkt mit steilster Tangente. Sein Assistent liefert $f'' = 0$ ohne Wechsel und trifft daneben. Wie findet man den echten Wechsel — und warum kreuzt dort die Tangente den Graphen?

### Fachbegriff & Definition

Der **Kruemmungswechsel an einer Nullstelle von $f''$ mit Vorzeichenwechsel belegt den Wendepunkt; dort aendert der Graph seine Kruemmung**. Die **steilste Stelle des Anstiegs faellt mit der Wende zusammen, weil $f'$ dort extremal wird**. Ohne Wechsel bleibt $f'' = 0$ ein blinder Kandidat wie bei $x^4$.

### Wirkungsgefuege / Modell

Der Tiefenweg an der Fallkurve: Links $f'' > 0$ zu beschleunigt, rechts $f'' < 0$ zu gebremst, dazwischen $W$ mit $f''(x_W) = 0$ plus Wechsel. Die Tangente $y = f'(x_W)(x-x_W)+f(x_W)$ schneidet dort, weil links die Kurve unter und rechts ueber der Tangente liegt — oder umgekehrt. Pruefung in drei Griffen: $f'' = 0$ loesen, Zeichen links und rechts einsetzen, $W$ und Tangente schreiben.

Schritt A: $f'' = 0$ loesen und Kandidaten listen.
Schritt B: Zeichenwechsel per Einsetzen links und rechts sichern.
Schritt C: $W$ und Tangente angeben und Kreuzung deuten.

```diagram
        f ^
          |                         ___---
          |                     ___        <- rechtsgekrummt f''<0
          |        W *---------   W = Wendepunkt
          |       .  .
          |     .      .          <- Wendetangente kreuzt hier
          |   .          .
          |.               .
          +----------------------------------> x
       linksgekrummt   |   rechtsgekrummt
       f'' > 0         |   f'' < 0
       Test: f''(x)=0 + VZW + f''' oder Kruemmung
       Falle: x^4 mit f''(0)=0 ohne VZW > kein Wendepunkt
```

Klausur-Satz: `Wechselt f'' an einer Nullstelle das Vorzeichen, so aendert der Graph dort seine Kruemmung und besitzt einen Wendepunkt.`

## Anekdote & Fun-Fact

In einer Epidemie starren alle auf die Tageszahlen, doch Experten schauen auf die kumulierte Kurve und suchen den Wendepunkt. Ab dort waechst die Kurve zwar weiter, aber immer langsamer. Der Moment wurde oft als Hoffnungszeichen gefeiert: Der Anstieg bricht, auch wenn die Gesamtzahl noch steigt.

Bezug zum Konzept: `Der Wendepunkt der kumulierten Kurve markiert das Maximum des Tageszuwachses und den Wechsel der Kruemmung.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: tangent]

AUFGABE (analysieren, AFB II): Gegeben ist $f(x) = x^3 - 6x^2 + 9x + 1$. Bestimmen Sie alle Wendepunkte und die Gleichung der Wendetangente.

HILFE:
1. Schritt 1: Zweimal ableiten und Kandidaten suchen: $f''(x) = 0$ loesen.
2. Schritt 2: Art mit Vorzeichenwechsel oder $f'''(x)$ sichern: Tabelle links und rechts von $x_W$ oder $f'''(x_W) \ne 0$.
3. Schritt 3: $y$-Wert berechnen und Wendetangente mit $y = f'(x_W)(x - x_W) + f(x_W)$ aufstellen.

MUSTERLOESUNG: Es gilt $f'(x) = 3x^2 - 12x + 9$, $f''(x) = 6x - 12$, $f'''(x) = 6$. Aus $f''(x) = 0$ folgt $6x - 12 = 0$, also $x_W = 2$. Wegen $f'''(2) = 6 \ne 0$, alternativ VZW von minus nach plus, liegt ein Wendepunkt vor. Mit $f(2) = 8 - 24 + 18 + 1 = 3$ folgt $W(2, 3)$. Mit $f'(2) = 12 - 24 + 9 = -3$ lautet die Wendetangente $y = -3(x - 2) + 3 = -3x + 9$. Der Graph wechselt dort von rechtsgekrummt zu linksgekrummt.

Klausur-Satz: `Mit f''(2) = 0, f'''(2) ungleich 0 und W(2 | 3) besitzt f dort einen Wendepunkt mit Tangente y = -3x + 9.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Wende-Test ($f''(x) = 0$ plus VZW oder $f'''$, danach $y$-Wert mit Kruemmungsdeutung) oder (ii) Nur-Stationaer-Test (nur $f'(x) = 0$; er steuert Extrema, nicht die Kruemmung) > dann loesen.

AUFGABE A: Untersuchen Sie $g(x) = x^4$ auf Wendepunkte. Pruefen Sie die Stelle $x = 0$ mit $f''$ und Vorzeichenwechsel und deuten Sie die Kruemmung.
AUFGABE B: Eine Infektionskurve wird durch $k(t) = -0{,}1t^3 + 3t^2$ modelliert ($t$ in Tagen). Bestimmen Sie den Wendepunkt und deuten Sie ihn als Moment des groessten Tageszuwachses.

HILFE: Aufgabe A nennt Wendepunkte, doch $f''(0) = 0$ allein reicht nicht; daher Verfahren (i) mit VZW-Tabelle. Aufgabe B nennt Wendepunkt plus Deutung im Kontext, daher Verfahren (i) plus Interpretation als Zuwachsmaximum.

ANTWORT: A erfordert Verfahren (i): $g'(x) = 4x^3$, $g''(x) = 12x^2$, $g''(0) = 0$, aber $g''(x) \ge 0$ links und rechts von $0$, also kein Vorzeichenwechsel und kein Wendepunkt; der Graph bleibt ueberall linksgekrummt. B erfordert Verfahren (i): $k'(t) = -0{,}3t^2 + 6t$, $k''(t) = -0{,}6t + 6 = 0$ liefert $t_W = 10$, $k'''(10) = -0{,}6 \ne 0$, also Wende bei $W(10, 2000)$; dort ist der Tageszuwachs $k'(10) = 30$ maximal, danach faellt er.

Klausur-Satz: `Ohne Vorzeichenwechsel von f'' liegt kein Wendepunkt vor, wie g(x) = x^4 an der Stelle x = 0 zeigt.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die notwendige und die hinreichende Bedingung fuer einen Wendepunkt? | ANTWORT: Notwendig ist $f''(x_W) = 0$, hinreichend ist ein Vorzeichenwechsel von $f''$ oder $f'''(x_W) \ne 0$.
FRAGE: Warum ist $x = 0$ bei $g(x) = x^4$ kein Wendepunkt, obwohl $g''(0) = 0$ gilt? | ANTWORT: Weil $g''(x) = 12x^2$ links und rechts von $0$ positiv bleibt, also kein Vorzeichenwechsel und kein Wechsel der Kruemmung vorliegt.
FRAGE: Was gehoert zur vollstaendigen Angabe von Wendepunkt und Wendetangente? | ANTWORT: Beide Koordinaten $W(x_W, f(x_W))$, Nachweis per VZW oder $f'''$, Tangentengleichung und Deutung der Kruemmung.

Klausur-Satz: `Erst f''(x_W) = 0 plus Vorzeichenwechsel plus y-Wert ergeben einen vollstaendigen Wendepunkt-Nachweis.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Aus $f'' = 0$ folgt wie bei $f' = 0$ automatisch ein besonderer Punkt.
   Korrektur-Satz: `Ohne Vorzeichenwechsel von f'' oder Nachweis mit f''' darf aus f''(x) = 0 kein Wendepunkt gefolgert werden.`
2. Fehlkonzept: Ein Wendepunkt ist mit der $x$-Koordinate vollstaendig angegeben; die Tangente ist Zusatz.
   Korrektur-Satz: `Ein Wendepunkt verlangt beide Koordinaten und bei Bedarf die Gleichung der Wendetangente.`

## Schritt 7 — szenario

ROLLE: Du bist Daten-Assistent im Gesundheitsamt.
SITUATION: Die kumulierten Meldungen folgen $k(t) = -0{,}05t^3 + 2{,}4t^2 + 100$ ($t$ in Tagen seit Ausbruch, $k$ in Faellen). Der Stab fragt, wann der Tageszuwachs am groessten war und ab wann die Massnahmen sichtbar wirken. Erstelle eine Analyse (circa 150 Woerter) mit Rechnung, Wendetangente und Deutung fuer die Presse.
AUFGABE (interpretieren, AFB III): Bestimme den Wendepunkt, erklaere seine Bedeutung als Maximum des Zuwachses und beurteile Grenzen des Modells.
RUBRIC (30 XP): Ableitungen plus $x_W$ korrekt (5 XP) | Nachweis per VZW oder $f'''$ plus $y$-Wert (10 XP) | Wendetangente korrekt (10 XP) | Deutung als Maximum plus Modellkritik (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Der Wendepunkt ist der Kruemmungswechsel. Der Weg besteht aus vier Schritten: $f'' = 0$ loesen, Zeichenwechsel pruefen (VZW oder $f'''$), $y$-Wert berechnen, Tangente aufstellen. Das Beispiel $x^4$ warnt: Ohne Zeichenwechsel kein Wendepunkt. In der Anwendung markiert die Wende das Zuwachsmaximum; die Anekdote der Epidemiekurve zeigt denselben Wechsel von beschleunigt zu gebremst.

Takeaway-Satz: `Wendepunkt heisst null, Wechsel, Punkt und Linie: f''(x) = 0, Vorzeichenwechsel, W(x | y) und Wendetangente.`

REFLEXION (zwei Fragen):
1. Welcher Teil fiel schwerer: die Rechnung der Wendetangente (Schritt 4) oder die Abwehr der $x$-hoch-vier-Falle im Vergleich (Schritt 5)?
2. Beim naechsten Mal zeichne ich zuerst die Vorzeichentabelle von $f''$ und formuliere danach erst den Antwortsatz.
