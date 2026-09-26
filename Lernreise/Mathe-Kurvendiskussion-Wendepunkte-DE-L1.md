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

1. Du kannst die geometrische Bedeutung eines Wendepunkts erklaeren: Dort wechselt die Kruemmung, etwa bei einer Epidemiekurve den Uebergang von beschleunigtem zu gebremstem Anstieg.
2. Du kannst die Pruefkette $f''(x) = 0$ plus Vorzeichenwechsel (oder $f'''(x) \ne 0$) ausfuehren und Wendepunktkoordinaten mit Wendetangente angeben.
3. Du kannst das Gegenbeispiel $g(x) = x^4$ an der Stelle $x = 0$ einordnen und eine korrekte Schlussformulierung schreiben (AFB II).

Klausur-Satz: `Ein Wendepunkt liegt genau dort, wo die zweite Ableitung null wird und ihr Vorzeichen wechselt, also die Kruemmung ihre Richtung aendert.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Kruemmung: $f''(x) > 0$ bedeutet linkskrumm (schalenfoermig), $f''(x) < 0$ bedeutet rechtsgekrummt (kappenfoermig).
- Wendepunkt: Punkt des Kruemmungswechsels; beide Koordinaten $W(x_W, f(x_W))$ werden angegeben.
- Nullstelle von $f''$: Notwendige Bedingung $f''(x_W) = 0$; allein noch nicht hinreichend.
- Vorzeichenwechsel (VZW): Unterschiedliche Vorzeichen von $f''$ links und rechts des Kandidaten; robustere hinreichende Bedingung als $f'''$ allein.
- Wendetangente: Tangente im Wendepunkt, $y = f'(x_W)(x - x_W) + f(x_W)$; sie durchquert den Graphen.

Klausur-Satz: `Aus f''(x_W) = 0 mit Vorzeichenwechsel folgt ein Wendepunkt, die Wendetangente beschreibt die Richtung an dieser Stelle.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Die kumulierte Fallzahl waechst zuerst immer schneller (linksgekrummt, $f'' > 0$) und danach immer langsamer (rechtsgekrummt, $f'' < 0$). Der Wechsel liegt am Wendepunkt. Dort gilt $f''(x_W) = 0$ mit Vorzeichenwechsel, und die Wendetangente $y = f'(x_W)(x - x_W) + f(x_W)$ kreuzt den Graphen. Eine Nullstelle von $f''$ ohne Zeichenwechsel ist kein Wendepunkt; genau darin besteht die $x^4$-Falle.

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
