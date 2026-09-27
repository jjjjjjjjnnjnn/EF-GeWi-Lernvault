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

<!-- Campaign: Optimierung | Episode 21/33 | Krise: Eisenbahn-Weiche stellt 0,8 s zu langsam | Zielgroessen: f mit f''(x) = 6x-12, Ziel Wendepunkt bei 2 | Tool: box-optimizer -->

## Schritt 1 — entdecken: Phantom der Symmetrie
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst Kruemmung links gegen rechts an $f'' > 0$ und $f'' < 0$ unterscheiden und am Bild benennen.
2. Du kannst $f''(x) = 0$ loesen, den Vorzeichenwechsel pruefen und $W(x_W, f(x_W))$ mit Wendetangente $y = f'(x_W)(x-x_W)+f(x_W)$ angeben.
3. Du kannst $g(x) = x^4$ an $x = 0$ als Gegenbeispiel einordnen: $g'' = 0$ ohne Wechsel, also kein Wendepunkt (AFB II).

###

### Hook / Phaenomen

Hook / Phaenomen: Erst links-, dann rechtsgekrümmt: Irgendwo dazwischen kippt die **Kruemmung**. Dieser Kippunkt heisst **Wendepunkt**, seine **Wendetangente** durchschneidet den Graphen. Die **dritte Ableitung** besiegelt, ob die Wende wirklich stattfindet.

`Klausur-Satz: Wendepunkte markieren den Kruemmungswechsel: f zwei Strich null plus Vorzeichenwechsel plus f drei Strich ungleich null.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Kruemmung:** Das Vorzeichen von $f''$ beschreibt Links- oder Rechtskruemmung des Graphen. Positive zweite Ableitung bedeutet linksgekrümmt, negative rechtsgekrümmt. Mechanismus: $f''$ auf Intervallen testen und Kruemmung zuordnen. Klausur-Tipp: Kruemmungsintervalle getrennt angeben.
- **Wendekandidat:** Die Gleichung $f''(x) = 0$ liefert alle Stellen moeglicher Wendepunkte. Jede Nullstelle von f zwei Strich ist zunaechst nur verdaechtig. Mechanismus: Zweite Ableitung bilden und null setzen. Klausur-Tipp: Kandidaten berechnen und als Kandidaten kennzeichnen.
- **Vorzeichenwechsel von f'':** Nur mit Wechsel der Kruemmungsrichtung liegt wirklich ein Wendepunkt vor. Erst der Wechsel adelt den Kandidaten zum echten Wendepunkt. Mechanismus: $f''$ links und rechts des Kandidaten testen. Klausur-Tipp: Wechsel explizit nachweisen, Gegenbeispiel $x^4$ kennen.
- **Wendetangente:** Die Tangente im Wendepunkt beschreibt die Richtung des Graphen an dieser Stelle. Sie durchschneidet den Graphen im Wendepunkt statt ihn zu beruehren. Mechanismus: $m = f'(x_W)$ und $y_W$ in die Punktsteigungsform einsetzen. Klausur-Tipp: Tangentengleichung vollständig aufstellen.
- **Dritte Ableitung:** Gilt $f'''(x_W) \ne 0$, so ist der Vorzeichenwechsel automatisch gesichert. Ist sie ungleich null, liegt sicher ein Wendepunkt vor. Mechanismus: Kandidaten in $f'''$ einsetzen und Ungleichheit pruefen. Klausur-Tipp: Kurztest nennen oder Tabelle als Alternative zeigen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

`Klausur-Satz: Aus f''(x_W) = 0 mit Vorzeichenwechsel folgt ein Wendepunkt, die Wendetangente beschreibt die Richtung an dieser Stelle.`

## Schritt 3 — entdecken: Wirkungskette hinter Kurvendiskussion und Wendepunkte
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von der Kruemmung ueber den Wechsel zum Punkt: Zuerst löst man $f''(x)=0$ fuer die Kandidaten, dann weist man den Vorzeichenwechsel von $f''$ nach, schliesslich berechnet man $y_W=f(x_W)$ und stellt die Wendetangente auf. Wechselt $f''$ das Vorzeichen, so aendert der Graph dort seine Kruemmung und besitzt einen Wendepunkt. Ohne Wechsel kein Wendepunkt, wie $g(x)=x^4$ an $x=0$ mit $g''=0$ ohne Wechsel beweist.

```diagram
+------------------------------------------+
| f prime prime(x) = 0 -> Kandidat xW      |
|   | Vorzeichen links/rechts testen      |
|   - -> + : Rechts- zu Linkskruemmung   |
|   + -> - : Links- zu Rechtskruemmung   |
| W(xW|f(xW)) + Tangente y = m x + b      |
+------------------------------------------+
```
Formelkern: $f''(x)=0$

$$f''(x_W) = 0,\quad f'''(x_W)\ne 0$$
`Klausur-Satz: Wechselt f'' an einer Nullstelle das Vorzeichen, so aendert der Graph dort seine Kruemmung und besitzt einen Wendepunkt.`

## Anekdote & Fun-Fact
In einer Epidemie starren alle auf die Tageszahlen, doch Experten schauen auf die kumulierte Kurve und suchen den Wendepunkt. Ab dort waechst die Kurve zwar weiter, aber immer langsamer. Der Moment wurde oft als Hoffnungszeichen gefeiert: Der Anstieg bricht, auch wenn die Gesamtzahl noch steigt.

Bezug zum Konzept: `Der Wendepunkt der kumulierten Kurve markiert das Maximum des Tageszuwachses und den Wechsel der Kruemmung.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Phantom der Symmetrie
Kontinuitaet: Vorher Mathe-Kurvendiskussion-Kompakt-L1.md | Nachher Mathe-Kurvendiskussion-Wendepunkte-L1.md. Krise dieser Episode: Eisenbahn-Weiche stellt 0,8 s zu langsam. Zielgroessen: f mit f''(x) = 6x-12, Ziel Wendepunkt bei 2

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: box-optimizer]

AUFGABE (Levelziel, AFB II): Knacke das Wende-Level: Ziehe im Sandbox-Slider die Stelle $x$ ueber den Graphen und beobachte, wie die Kruemmung von rechts nach links kippt und die Tangentensteigung dort minimal wird. Lies den Kandidaten ab, weise dann den Vorzeichenwechsel von $f''$ nach, berechne $W$ vollständig und stelle die Wendetangente auf.

HILFE:
1. Bilde $f''(x)$, loese $f''(x) = 0$ und lies im Sandbox-Slider Kandidat und Kruemmungskipp ab.
2. Teste $f''$ links und rechts des Kandidaten und weise den Vorzeichenwechsel explizit nach.
3. Berechne $y_W = f(x_W)$ und stelle mit $m = f'(x_W)$ die Tangentengleichung $y = mx+b$ auf.

MUSTERLOESUNG: Sandbox zeigt den Kruemmungskipp bei $x_W = 2$ mit dort minimaler Tangentensteigung. Rechnung $f''(2) = 0$ mit Wechsel von plus nach minus sichert den Wendepunkt. Mit $y_W = 3$ folgt $W(2|3)$ und per $m = f'(2) = -3$ die Wendetangente $y = -3x+9$. Nullstelle plus Wechsel plus y-Wert ergeben den vollständigen Nachweis.

`Klausur-Satz: Mit f''(2) = 0, f'''(2) ungleich 0 und W(2 | 3) besitzt f dort einen Wendepunkt mit Tangente y = -3x + 9.`

## Schritt 5 — ausprobieren: Duell der Verfahren Phantom der Symmetrie
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Triff zuerst die Wahl des Verfahrens: (i) Wende-Test ($f''(x) = 0$ plus VZW oder $f'''$, danach $y$-Wert mit Kruemmungsdeutung) oder (ii) Nur-Stationaer-Test (nur $f'(x) = 0$; er steuert Extrema, nicht die Kruemmung) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Untersuchen Sie $g(x) = x^4$ auf Wendepunkte. Pruefen Sie die Stelle $x = 0$ mit $f''$ und Vorzeichenwechsel und deuten Sie die Kruemmung.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Eine Infektionskurve wird durch $k(t) = -0{,}1t^3 + 3t^2$ modelliert ($t$ in Tagen). Bestimmen Sie den Wendepunkt und deuten Sie ihn als Moment des groessten Tageszuwachses.

HILFE: Aufgabe A nennt Wendepunkte, doch $f''(0) = 0$ allein reicht nicht; daher Verfahren (i) mit VZW-Tabelle. Aufgabe B nennt Wendepunkt plus Deutung im Kontext, daher Verfahren (i) plus Interpretation als Zuwachsmaximum.

ANTWORT: A erfordert Verfahren (i): $g'(x) = 4x^3$, $g''(x) = 12x^2$, $g''(0) = 0$, aber $g''(x) \ge 0$ links und rechts von $0$, also kein Vorzeichenwechsel und kein Wendepunkt; der Graph bleibt ueberall linksgekrummt. B erfordert Verfahren (i): $k'(t) = -0{,}3t^2 + 6t$, $k''(t) = -0{,}6t + 6 = 0$ liefert $t_W = 10$, $k'''(10) = -0{,}6 \ne 0$, also Wende bei $W(10, 2000)$; dort ist der Tageszuwachs $k'(10) = 30$ maximal, danach faellt er.

`Klausur-Satz: Ohne Vorzeichenwechsel von f'' liegt kein Wendepunkt vor, wie g(x) = x^4 an der Stelle x = 0 zeigt.`

## Schritt 6 — check: Selbsttest zu Kurvendiskussion und Wendepunkte: Phantom der Symmetrie
CHECK (drei Fragen mit Antworten):

- FRAGE: Wie lautet die notwendige und die hinreichende Bedingung fuer einen Wendepunkt? | ANTWORT: Notwendig ist $f''(x_W) = 0$, hinreichend ist ein Vorzeichenwechsel von $f''$ oder $f'''(x_W) \ne 0$.
- FRAGE: Warum ist $x = 0$ bei $g(x) = x^4$ kein Wendepunkt, obwohl $g''(0) = 0$ gilt? | ANTWORT: Weil $g''(x) = 12x^2$ links und rechts von $0$ positiv bleibt, also kein Vorzeichenwechsel und kein Wechsel der Kruemmung vorliegt.
- FRAGE: Was gehoert zur vollstaendigen Angabe von Wendepunkt und Wendetangente? | ANTWORT: Beide Koordinaten $W(x_W, f(x_W))$, Nachweis per VZW oder $f'''$, Tangentengleichung und Deutung der Kruemmung.

`Klausur-Satz: Erst f''(x_W) = 0 plus Vorzeichenwechsel plus y-Wert ergeben einen vollstaendigen Wendepunkt-Nachweis.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Aus $f'' = 0$ folgt wie bei $f' = 0$ automatisch ein besonderer Punkt.
   Korrektur-Satz: `Ohne Vorzeichenwechsel von f'' oder Nachweis mit f''' darf aus f''(x) = 0 kein Wendepunkt gefolgert werden.`
2. Fehlkonzept: Ein Wendepunkt ist mit der $x$-Koordinate vollstaendig angegeben; die Tangente ist Zusatz.
   Korrektur-Satz: `Ein Wendepunkt verlangt beide Koordinaten und bei Bedarf die Gleichung der Wendetangente.`

## Schritt 7 — szenario: Klausurtransfer: Kurvendiskussion und Wendepunkte: Phantom der Symmetrie
ROLLE: Du bist Daten-Assistent im Gesundheitsamt.
SITUATION: Die kumulierten Meldungen folgen $k(t) = -0{,}05t^3 + 2{,}4t^2 + 100$ ($t$ in Tagen seit Ausbruch, $k$ in Faellen). Der Stab fragt, wann der Tageszuwachs am groessten war und ab wann die Massnahmen sichtbar wirken. Erstelle eine Analyse (circa 150 Woerter) mit Rechnung, Wendetangente und Deutung fuer die Presse.
AUFGABE (interpretieren, AFB III): Bestimme den Wendepunkt, erklaere seine Bedeutung als Maximum des Zuwachses und beurteile Grenzen des Modells.
RUBRIC (30 XP): Ableitungen plus $x_W$ korrekt (5 XP) | Nachweis per VZW oder $f'''$ plus $y$-Wert (10 XP) | Wendetangente korrekt (10 XP) | Deutung als Maximum plus Modellkritik (5 XP).

`Klausur-Satz: Wer Wendekandidat, Vorzeichenwechsel, Punkt und Wendetangente zeigt, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Phantom der Symmetrie
TAKEAWAY (Kernbotschaft in einem Kasten):

Der Wendepunkt ist der Kruemmungswechsel. Der Weg besteht aus vier Schritten: $f'' = 0$ loesen, Zeichenwechsel pruefen (VZW oder $f'''$), $y$-Wert berechnen, Tangente aufstellen. Das Beispiel $x^4$ warnt: Ohne Zeichenwechsel kein Wendepunkt. In der Anwendung markiert die Wende das Zuwachsmaximum; die Anekdote der Epidemiekurve zeigt denselben Wechsel von beschleunigt zu gebremst.

Takeaway-Satz: `Wendepunkt heisst null, Wechsel, Punkt und Linie: f''(x) = 0, Vorzeichenwechsel, W(x | y) und Wendetangente.`

REFLEXION (zwei Fragen):
1. Welcher Teil fiel schwerer: die Rechnung der Wendetangente (Schritt 4) oder die Abwehr der $x$-hoch-vier-Falle im Vergleich (Schritt 5)?
2. Beim naechsten Mal zeichne ich zuerst die Vorzeichentabelle von $f''$ und formuliere danach erst den Antwortsatz.

`Klausur-Satz: Wende heisst Wechsel: Ohne Vorzeichenwechsel bleibt jede Nullstelle von f zwei Strich Kandidat.`
