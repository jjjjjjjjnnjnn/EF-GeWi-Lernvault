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

<!-- Campaign: Optimierung | Episode 17/33 | Krise: Flughafen-Gepaeck 480 Koffer pro Stunde | Target: x0 = 4, h = 0.2, Target m = 9.29 | Tool: formula -->

## Schritt 1 — entdecken: Kurskorrektur
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst mit $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ aus $a = 5$, $b = 7$, $\gamma = 60^\circ$ die Seite $c$ schrittweise zu $c \approx 6{,}08$ berechnen.
2. Du kannst den Kosinussatz als Pythagoras mit Korrektur erklaeren und $\gamma = 90^\circ$ mit $\cos(90^\circ) = 0$ einordnen.
3. Du kannst mit $\cos(\gamma) = \frac{a^2+b^2-c^2}{2ab}$ an $3$-$4$-$5$ nachweisen, dass $\gamma = 90^\circ$ vorliegt (AFB II).

###

### Hook / Phaenomen

Hook / Phaenomen (CAO-Log, Episode 17 von 33): Super-Engineering-Zentrale, Flughafen-Gepaeck 480 Koffer pro Stunde. Der Chief Algorithm Officer ruft: x0 = 4, h = 0.2, Target m = 9.29, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Kosinussatz und Orthogonalitaet ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Kosinussatz-Orthogonalitaet-CN-L1.md) legte die Spur, das naechste Audit (Mathe-Kosinussatz-Orthogonalitaet-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
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

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Kosinussatz und Orthogonalitaet
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

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact
Der franzoesische Mathematiker Lazare Carnot bewies den Kosinussatz in moderner Form, waehrend er gleichzeitig als Kriegsminister Armeen organisierte. Seine Formel $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ verband Feldmessung und Geometrie so eng, dass Landvermesser sie bis heute im Gepaeck tragen.

Bezug zum Konzept: `Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Kurskorrektur
Kontinuitaet: Vorher Mathe-Kosinussatz-Orthogonalitaet-CN-L1.md | Nachher Mathe-Kosinussatz-Orthogonalitaet-L1.md. Krise dieser Episode: Flughafen-Gepaeck 480 Koffer pro Stunde. Target: x0 = 4, h = 0.2, Target m = 9.29.

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: formula]

AUFGABE (Levelziel, AFB II): Knacke das Dreiecks-Level: Ziehe im Sandbox-Slider den Winkel $\gamma$ von spitz ueber recht bis stumpf und beobachte, wie die Gegenseite $c$ kuerzer oder laenger als die Pythagoras-Hypothenuse ausfaellt. Stelle $\gamma = 60$ Grad ein, lies $c$ ab und berechne dann exakt per Kosinussatz. Schliesse die Pythagoras-Probe an und deute den Korrekturterm.

HILFE:
1. Markiere SWS-Lage mit $a$, $b$ und eingeschlossenem $\gamma$ und lies im Sandbox-Slider $c$ bei $60$ Grad ab.
2. Setze in $c^2 = a^2+b^2-2ab\cos(\gamma)$ ein, ziehe die Wurzel und vergleiche mit dem Sandbox-Wert.
3. Fuehre die Pythagoras-Probe durch und deute verkuerzt oder verlaengert per Vorzeichen von $\cos(\gamma)$.

MUSTERLOESUNG: Sandbox bei $\gamma = 60$ Grad zeigt $c$ kuerzer als die Pythagoras-Hypothenuse. Rechnung per Einsetzen in $c^2=a^2+b^2-2ab\cos(60)$ und Wurzelziehen bestaetigt den Sandbox-Wert. Pythagoras-Probe $a^2+b^2 \ne c^2$ schliesst rechten Winkel aus, der positive Kosinus verkuerzt die Seite. Einsetzen, Wurzel ziehen und Pythagoras-Probe anschliessen sichern jede Dreiecksloesung.

Klausur-Satz: `Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Kurskorrektur
VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Kosinussatz-Verfahren (Seite aus SWS berechnen) oder (ii) Umkehr-Verfahren (Winkel aus drei Seiten mit Kosinusformel bestimmen) > dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Berechnen Sie $c$ aus $a = 4$, $b = 6$, $\gamma = 120^\circ$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Pruefen Sie, ob das Dreieck mit $a = 3$, $b = 4$, $c = 5$ rechtwinklig ist.

HILFE: Aufgabe A nennt zwei Seiten plus Winkel, daher Verfahren (i). Aufgabe B nennt drei Seiten ohne Winkel, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $c^2 = 16 + 36 - 48\cos(120^\circ) = 52 + 24 = 76$, also $c = \sqrt{76} \approx 8{,}72$. B erfordert Verfahren (ii): $3^2 + 4^2 = 25 = 5^2$, also rechtwinklig mit $\gamma = 90^\circ$.

Klausur-Satz: `SWS sucht eine Seite, SSS sucht einen Winkel.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Kosinussatz und Orthogonalitaet: Kurskorrektur
CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet der Kosinussatz fuer die Seite $c$? | ANTWORT: $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ mit Gegenwinkel $\gamma$.
FRAGE: Was passiert bei $\gamma = 90^\circ$? | ANTWORT: $\cos(90^\circ) = 0$, also bleibt $c^2 = a^2 + b^2$.
FRAGE: Wie weist man einen rechten Winkel aus drei Seiten nach? | ANTWORT: Mit $\cos(\gamma) = \frac{a^2 + b^2 - c^2}{2ab}$; gilt $\cos(\gamma) = 0$, so ist $\gamma = 90^\circ$.

Klausur-Satz: `Drei Seiten pruefen Pythagoras, zwei Seiten plus Winkel rufen den Kosinussatz.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung
(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlkonzept: Der Kosinussatz gilt nur in rechtwinkligen Dreiecken.
   Korrektur-Satz: `Der Kosinussatz verallgemeinert Pythagoras auf beliebige Winkel.`
2. Fehlkonzept: Man duerfe einen beliebigen Winkel statt des eingeschlossenen Winkels einsetzen.
   Korrektur-Satz: `Nur der eingeschlossene Winkel gehoert zur gegebenen Seitenpaarung.`

## Schritt 7 — szenario: Klausurtransfer: Kosinussatz und Orthogonalitaet: Kurskorrektur
ROLLE: Du bist Praktikant im Vermessungsbuero.
SITUATION: Ein Grundstueck bildet ein Dreieck mit $a = 40\,\mathrm{m}$, $b = 55\,\mathrm{m}$ und eingeschlossenem Winkel $\gamma = 75^\circ$. Der Eigentuemer bezweifelt die Frontlaenge $c$.
AUFGABE (nachweisen, AFB III): Berechnen Sie $c$ in einer zusammenhaengenden Darstellung (circa 150 Woerter), pruefen Sie Orthogonalitaet und begruenden Sie jeden Rechenschritt mit Satzbenennung.
RUBRIC (30 XP): Ansatz $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ korrekt (10 XP) | Zahlwert $c \approx 60{,}9\,\mathrm{m}$ (10 XP) | Orthogonalitaetspruefung mit Pythagoras (5 XP) | Geschlossene Begruendung (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Kurskorrektur
TAKEAWAY (Kernbotschaft in einem Kasten):

Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage. Merke die Kette $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ bis $\cos(90^\circ) = 0$ bis $a^2 + b^2 = c^2$. Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke und verbindet Feldmessung mit Geometrie.

Takeaway-Satz: `Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage ueber die Kosinusformel.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Winkelrechnen mit Kosinus (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal markiere ich zuerst Gegenwinkel und Gegenseite farbig, dann setze ich ein.

`Klausur-Satz: Siehe Schritt-Inhalt.`
