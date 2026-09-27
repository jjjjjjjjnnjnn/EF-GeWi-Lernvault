---
fach: Mathe
thema: "Kosinussatz und Orthogonalitaet"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, begruenden, nachweisen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Geometrie]
version: Lesson-v3
---

# Lernreise: Kosinussatz und Orthogonalitaet (L1, Ziel Klausur)

<!-- Lesson v3: 8 Schritte plus Anekdote und Fehlvorstellung; Fehlvorstellung zwischen Schritt 6 und 7 (Parser-Skip); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter gesperrt; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst mit $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ aus $a = 5$, $b = 7$, $\gamma = 60^\circ$ die Seite $c$ schrittweise zu $c \approx 6{,}08$ berechnen.
2. Du kannst den Kosinussatz als Pythagoras mit Korrektur erklaeren und $\gamma = 90^\circ$ mit $\cos(90^\circ) = 0$ einordnen.
3. Du kannst mit $\cos(\gamma) = \frac{a^2+b^2-c^2}{2ab}$ an $3$-$4$-$5$ nachweisen, dass $\gamma = 90^\circ$ vorliegt (AFB II).

### Hook / Phaenomen

Ein Vermesser steht vor einem dreieckigen Grundstueck und kennt zwei Seiten plus den Winkel dazwischen, doch die dritte Seite liegt hinter einem Zaun und laesst sich nicht messen. Der Schul-Pythagoras versagt, weil kein rechter Winkel existiert und jede Schaetzung teure Folgen haette. Nimm zwei Seiten a und b mit eingeschlossenem Winkel gamma und entdecke den Kosinussatz als Pythagoras mit Korrekturterm. Wer den Kosinusanteil vergisst, rechnet stillschweigend mit rechtem Winkel und liegt immer daneben. Wer $c^2=a^2+b^2-2ab\cos(\gamma)$ sicher anwendet, zwischen SWS und SSS unterscheidet und per Pythagoras-Probe absichert, vermisst jedes Dreieck und prueft rechte Winkel per Skalarprodukt. Der folgende Weg fuehrt vom alltaeglichen Staunen zur exakten Rechnung: erst das Phaenomen beobachten, dann die Begriffe klaeren, schliesslich das Modell pruefen und im Sandbox-Labor selbst entdecken, warum jede Regel genau so und nicht anders funktioniert.

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan gilt der untenstehende Klausur-Satz als verbindliche Definition dieser Lektion. Er fasst das Phaenomen in exakter Fachsprache und bildet die Grundlage fuer jede Deutung.

### Wirkungsgefuege / Modell

Der Mechanismus verbindet Alltag und Formel: Das Phaenomen liefert die Anschauung, die Definition liefert die Sprache und das Wirkungsmodell in Schritt 3 liefert die Kausalkette. Wer alle drei Ebenen verknuepft, beantwortet jede Klausurfrage vollständig.

Klausur-Satz: `Der Kosinussatz berechnet die dritte Seite aus zwei Seiten und dem eingeschlossenen Winkel.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Kosinussatz:** Die Formel $c^2=a^2+b^2-2ab\cos(\gamma)$ liefert die dritte Seite aus SWS. Mechanismus: Seiten und Winkel einsetzen und Wurzel ziehen. Klausur-Punkt: Formel nennen, gegebenen Winkel als eingeschlossenen identifizieren.
- **SWS-Lage:** Zwei Seiten plus eingeschlossener Winkel suchen eindeutig die Gegenseite. Mechanismus: Gegebene Stuecke markieren und dem Winkel die Seite zuordnen. Klausur-Punkt: Lage benennen und Kosinussatz als Verfahren waehlen.
- **SSS-Lage:** Drei bekannte Seiten suchen einen Winkel per umgestelltem Kosinussatz. Mechanismus: Formel nach $\cos(\gamma)$ aufloesen und Arkuskosinus bilden. Klausur-Punkt: Umstellung zeigen und Winkel in Grad angeben.
- **Korrekturterm:** Der Anteil $-2ab\cos(\gamma)$ verkuerzt oder verlaengert gegenueber Pythagoras. Mechanismus: Vorzeichen von $\cos(\gamma)$ deuten und Effekt benennen. Klausur-Punkt: Bei spitz verkuerzt, bei stumpf verlaengert als Deutung.
- **Orthogonalitaet:** Rechte Winkel folgen per Pythagoras-Probe oder Skalarprodukt null. Mechanismus: Seiten quadrieren und Gleichheit pruefen. Klausur-Punkt: Probe anschliessen und rechten Winkel explizit bestaetigen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

Klausur-Satz: `Ohne rechten Winkel tritt der Korrekturterm mit Kosinus hinzu.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von der Lage ueber die Formel zur Probe: Zuerst identifiziert man SWS oder SSS aus den gegebenen Stuecken, dann wendet man $c^2=a^2+b^2-2ab\cos(\gamma)$ an oder stellt nach dem Winkel um, schliesslich sichert man per Pythagoras-Probe ab. Das Vorzeichen von $\cos(\gamma)$ entscheidet ueber verkuerzt bei spitzem oder verlaengert bei stumpfem Winkel. Ohne Korrekturterm rechnet man fälschlich mit rechtem Winkel und verfehlt jede nicht-rechtwinklige Loesung.

```diagram
+------------------------------------------+
| gegeben: a, b, gamma (SWS)               |
|   | c^2 = a^2+b^2-2ab cos(gamma)        |
|   v                                      |
| c = Wurzel(...)  + Pythagoras-Probe     |
| SSS: nach cos(gamma) umstellen, Winkel  |
+------------------------------------------+
```
Formelkern: $c^2=a^2+b^2-2ab\cos(\gamma)$

Klausur-Satz: `Das Vorzeichen von cos(gamma) entscheidet ueber verkuerzt oder verlaengert.`

## Anekdote & Fun-Fact
Der franzoesische Mathematiker Lazare Carnot bewies den Kosinussatz in moderner Form, waehrend er gleichzeitig als Kriegsminister Armeen organisierte. Seine Formel $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ verband Feldmessung und Geometrie so eng, dass Landvermesser sie bis heute im Gepaeck tragen.

Bezug zum Konzept: `Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Dreiecks-Labor
BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: tangent-slider]

AUFGABE (Levelziel, AFB II): Knacke das Dreiecks-Level: Ziehe im Sandbox-Slider den Winkel $\gamma$ von spitz ueber recht bis stumpf und beobachte, wie die Gegenseite $c$ kuerzer oder laenger als die Pythagoras-Hypothenuse ausfaellt. Stelle $\gamma = 60$ Grad ein, lies $c$ ab und berechne dann exakt per Kosinussatz. Schliesse die Pythagoras-Probe an und deute den Korrekturterm.

HILFE:
1. Markiere SWS-Lage mit $a$, $b$ und eingeschlossenem $\gamma$ und lies im Sandbox-Slider $c$ bei $60$ Grad ab.
2. Setze in $c^2 = a^2+b^2-2ab\cos(\gamma)$ ein, ziehe die Wurzel und vergleiche mit dem Sandbox-Wert.
3. Fuehre die Pythagoras-Probe durch und deute verkuerzt oder verlaengert per Vorzeichen von $\cos(\gamma)$.

MUSTERLOESUNG: Sandbox bei $\gamma = 60$ Grad zeigt $c$ kuerzer als die Pythagoras-Hypothenuse. Rechnung per Einsetzen in $c^2=a^2+b^2-2ab\cos(60)$ und Wurzelziehen bestaetigt den Sandbox-Wert. Pythagoras-Probe $a^2+b^2 \ne c^2$ schliesst rechten Winkel aus, der positive Kosinus verkuerzt die Seite. Einsetzen, Wurzel ziehen und Pythagoras-Probe anschliessen sichern jede Dreiecksloesung.

Klausur-Satz: `Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Kosinussatz-Verfahren (Seite aus SWS berechnen) oder (ii) Umkehr-Verfahren (Winkel aus drei Seiten mit Kosinusformel bestimmen) > dann loesen.

AUFGABE A: Berechnen Sie $c$ aus $a = 4$, $b = 6$, $\gamma = 120^\circ$.
AUFGABE B: Pruefen Sie, ob das Dreieck mit $a = 3$, $b = 4$, $c = 5$ rechtwinklig ist.

HILFE: Aufgabe A nennt zwei Seiten plus Winkel, daher Verfahren (i). Aufgabe B nennt drei Seiten ohne Winkel, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $c^2 = 16 + 36 - 48\cos(120^\circ) = 52 + 24 = 76$, also $c = \sqrt{76} \approx 8{,}72$. B erfordert Verfahren (ii): $3^2 + 4^2 = 25 = 5^2$, also rechtwinklig mit $\gamma = 90^\circ$.

Klausur-Satz: `SWS sucht eine Seite, SSS sucht einen Winkel.`

## Schritt 6 — check: Selbsttest zu Kosinussatz und Orthogonalitaet
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet der Kosinussatz fuer die Seite $c$? | ANTWORT: $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ mit Gegenwinkel $\gamma$.
FRAGE: Was passiert bei $\gamma = 90^\circ$? | ANTWORT: $\cos(90^\circ) = 0$, also bleibt $c^2 = a^2 + b^2$.
FRAGE: Wie weist man einen rechten Winkel aus drei Seiten nach? | ANTWORT: Mit $\cos(\gamma) = \frac{a^2 + b^2 - c^2}{2ab}$; gilt $\cos(\gamma) = 0$, so ist $\gamma = 90^\circ$.

Klausur-Satz: `Drei Seiten pruefen Pythagoras, zwei Seiten plus Winkel rufen den Kosinussatz.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Der Kosinussatz gilt nur in rechtwinkligen Dreiecken.
   Korrektur-Satz: `Der Kosinussatz verallgemeinert Pythagoras auf beliebige Winkel.`
2. Fehlkonzept: Man duerfe einen beliebigen Winkel statt des eingeschlossenen Winkels einsetzen.
   Korrektur-Satz: `Nur der eingeschlossene Winkel gehoert zur gegebenen Seitenpaarung.`

## Schritt 7 — szenario: Klausurtransfer: Kosinussatz und Orthogonalitaet
ROLLE: Du bist Praktikant im Vermessungsbuero.
SITUATION: Ein Grundstueck bildet ein Dreieck mit $a = 40\,\mathrm{m}$, $b = 55\,\mathrm{m}$ und eingeschlossenem Winkel $\gamma = 75^\circ$. Der Eigentuemer bezweifelt die Frontlaenge $c$.
AUFGABE (nachweisen, AFB III): Berechnen Sie $c$ in einer zusammenhaengenden Darstellung (circa 150 Woerter), pruefen Sie Orthogonalitaet und begruenden Sie jeden Rechenschritt mit Satzbenennung.
RUBRIC (30 XP): Ansatz $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ korrekt (10 XP) | Zahlwert $c \approx 60{,}9\,\mathrm{m}$ (10 XP) | Orthogonalitaetspruefung mit Pythagoras (5 XP) | Geschlossene Begruendung (5 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion
TAKEAWAY (Kernbotschaft in einem Kasten):

Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage. Merke die Kette $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ bis $\cos(90^\circ) = 0$ bis $a^2 + b^2 = c^2$. Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke und verbindet Feldmessung mit Geometrie.

Takeaway-Satz: `Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage ueber die Kosinusformel.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Winkelrechnen mit Kosinus (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal markiere ich zuerst Gegenwinkel und Gegenseite farbig, dann setze ich ein.

