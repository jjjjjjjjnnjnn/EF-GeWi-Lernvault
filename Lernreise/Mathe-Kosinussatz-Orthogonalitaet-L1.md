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

<!-- Campaign: Optimierung | Episode 18/33 | Krise: Solarpark-Ertrag minus 17 Prozent | Zielgroessen: Dreieck mit a, b und Winkel gamma, Ziel Seite c | Tool: formula -->

## Schritt 1 — entdecken: Kurve im Windkanal
ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst in beliebigen Dreiecken mit $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ fehlende Seiten und Winkel berechnen.
2. Du kannst den Kosinussatz als Verallgemeinerung von $a^2 + b^2 = c^2$ erklaeren und den Fall $\gamma = 90^\circ$ einordnen.
3. Du kannst mit $\cos(\gamma) = \frac{a^2 + b^2 - c^2}{2ab}$ nachweisen, ob ein Dreieck rechtwinklig ist (AFB II).

EINSTIEG: Beim Tunnelbau von zwei Seiten bohrten sich im Jahr 1871 die Arbeiter am Mont-Cenis fast vorbei, weil eine Winkelmessung kippte. Dreiecksrechnung aus zwei Seiten und eingeschlossenem Winkel entscheidet ueber Treffer oder Fehlbohrung. Der Kosinussatz sichert genau diese Lage.

### Hook / Phaenomen

没有直角也要算出第三边：余弦定理就是带修正项的勾股定理，夹角越小对边越短，反过来还能检验垂直。

Hook / Phaenomen: Kein rechter Winkel weit und breit, trotzdem soll die dritte Seite exakt bestimmbar sein. Der **Kosinussatz** repariert Pythagoras mit einem **Korrekturterm**: Je spitzer der **eingeschlossene Winkel**, desto kuerzer die Gegenseite. Umgekehrt verraet die Seitenprobe, ob **Orthogonalitaet** vorliegt.

`Klausur-Satz: Ohne rechten Winkel tritt der Korrekturterm hinzu: c Quadrat folgt aus a, b und eingeschlossenem Winkel.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
GRUNDBEGRIFFE (5 Begriffe):

- **Kosinussatz**: $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$, wobei $\gamma$ der Seite $c$ gegenueberliegt. Er gilt in jedem ebenen Dreieck und verbindet drei Seiten mit einem Winkel. Mechanismus: Gegebene Seiten und Winkel dem Schema a, b, gamma zuordnen. Klausur-Tipp: Skizze mit Beschriftung vor jede Rechnung setzen.
- **Eingeschlossener Winkel**: Winkel $\gamma$ zwischen den Seiten $a$ und $b$, er bestimmt den Korrekturterm $-2ab\cos(\gamma)$. Nur der Winkel zwischen den beiden gegebenen Seiten darf in die Formel. Mechanismus: Winkel zwischen den Seiten a und b identifizieren. Klausur-Tipp: Winkellage in der Skizze markieren.
- **Satz des Pythagoras**: Spezialfall $c^2 = a^2 + b^2$ fuer $\gamma = 90^\circ$, da $\cos(90^\circ) = 0$. Seiten und Winkel muessen paarweise stimmen; Pythagoras ist der Sonderfall mit gamma gleich 90 Grad ohne Korrekturterm. Mechanismus: Korrekturterm minus 2ab Kosinus gamma anhaengen oder streichen. Klausur-Tipp: Bei 90 Grad Pythagoras nennen statt Kosinussatz.
- **Orthogonalitaet im Dreieck**: Rechter Winkel genau dann, wenn $a^2 + b^2 = c^2$ erfuellt ist. Rechter Winkel gilt genau dann, wenn a Quadrat plus b Quadrat gleich c Quadrat ist. Mechanismus: Seitenquadrate vergleichen und auf Gleichheit pruefen. Klausur-Tipp: Gegenprobe als eigenen Satz formulieren.
- **Kongruenzsatz SWS**: Zwei Seiten plus eingeschlossener Winkel legen ein Dreieck eindeutig fest. SWS legt das Dreieck eindeutig fest; der Arkuskosinus berechnet daraus den Winkel. Mechanismus: Gegebene Stuecke dem Kongruenzsatz zuordnen. Klausur-Tipp: Eindeutigkeit als Voraussetzung der Berechnung nennen.

`Klausur-Satz: Ohne rechten Winkel tritt der Korrekturterm mit Kosinus hinzu.`

## Schritt 3 — entdecken: Wirkungskette hinter Kosinussatz und Orthogonalitaet
KONZEPT (ein Konzept plus ein Textdiagramm):

Der Kosinussatz korrigiert Pythagoras um die Schiefe des Dreiecks. Ist $\gamma$ spitz, so verkuerzt der Term $-2ab\cos(\gamma)$ die Seite $c$; ist $\gamma$ stumpf, so verlaengert sie sich, weil $\cos(\gamma) < 0$ gilt. Umgekehrt prueft die umgeformte Version $\cos(\gamma) = \frac{a^2 + b^2 - c^2}{2ab}$ die Rechtwinkligkeit ohne Winkelmesser.

```diagram
        C
        /\
     b /  \ a
      /    \
     / gamma\
    A---c----B
    c^2 = a^2 + b^2 - 2ab cos(gamma)
    gamma = 90 Grad -> c^2 = a^2 + b^2
    gamma < 90 Grad -> c kuerzer
    gamma > 90 Grad -> c laenger
```

$$c^2 = a^2+b^2-2ab\cos(\gamma)$$
`Klausur-Satz: Das Vorzeichen von cos(gamma) entscheidet ueber verkuerzt oder verlaengert.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Kurve im Windkanal
Kontinuitaet: Vorher Mathe-Kosinussatz-Orthogonalitaet-DE-L1.md | Nachher Mathe-Kurvendiskussion-Kompakt-DE-L1.md. Krise dieser Episode: Solarpark-Ertrag minus 17 Prozent. Zielgroessen: Dreieck mit a, b und Winkel gamma, Ziel Seite c

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (berechnen, AFB II): Gegeben ist ein Dreieck mit $a = 5$, $b = 7$ und $\gamma = 60^\circ$. Berechnen Sie die Seite $c$ und pruefen Sie, ob das Dreieck rechtwinklig ist.

HILFE:
1. Schritt 1: Setze in $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ ein.
2. Schritt 2: Nutze $\cos(60^\circ) = 0{,}5$ und berechne $c = \sqrt{c^2}$.
3. Schritt 3: Pruefe $a^2 + b^2 = c^2$ fuer die Orthogonalitaetsfrage.

MUSTERLOESUNG: Es gilt $c^2 = 25 + 49 - 2 \cdot 5 \cdot 7 \cdot 0{,}5 = 74 - 35 = 39$, also $c = \sqrt{39} \approx 6{,}24$. Da $25 + 36{,}98 \ne 49$ in jeder Paarung und $\gamma = 60^\circ \ne 90^\circ$ ist, liegt kein rechter Winkel vor. Das Dreieck ist spitzwinklig am Winkel $\gamma$.

`Klausur-Satz: Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen.`

## Schritt 5 — ausprobieren: Duell der Verfahren Kurve im Windkanal
VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle zuerst das Verfahren — (i) Kosinussatz-Verfahren (Seite aus SWS berechnen) oder (ii) Umkehr-Verfahren (Winkel aus drei Seiten mit Kosinusformel bestimmen) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Berechnen Sie $c$ aus $a = 4$, $b = 6$, $\gamma = 120^\circ$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Pruefen Sie, ob das Dreieck mit $a = 3$, $b = 4$, $c = 5$ rechtwinklig ist.

HILFE: A nennt zwei Seiten plus Winkel, also Verfahren (i). B nennt drei Seiten ohne Winkel, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $c^2 = 16 + 36 - 48\cos(120^\circ) = 52 + 24 = 76$, also $c = \sqrt{76} \approx 8{,}72$. B erfordert Verfahren (ii): $3^2 + 4^2 = 25 = 5^2$, also rechtwinklig mit $\gamma = 90^\circ$.

`Klausur-Satz: SWS sucht eine Seite, SSS sucht einen Winkel.`

## Schritt 6 — check: Selbsttest zu Kosinussatz und Orthogonalitaet: Kurve im Windkanal
CHECK (Selbsttest, 3 Fragen):

- FRAGE: Wie lautet der Kosinussatz fuer die Seite c? | ANTWORT: $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ mit Gegenwinkel $\gamma$.
- FRAGE: Was passiert bei gamma = 90 Grad? | ANTWORT: $\cos(90^\circ) = 0$, also bleibt $c^2 = a^2 + b^2$.
- FRAGE: Wie weist man einen rechten Winkel aus drei Seiten nach? | ANTWORT: Mit $\cos(\gamma) = \frac{a^2 + b^2 - c^2}{2ab}$; gilt $\cos(\gamma) = 0$, so ist $\gamma = 90^\circ$.

`Klausur-Satz: Drei Seiten pruefen Pythagoras, zwei Seiten plus Winkel rufen den Kosinussatz.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: Der Kosinussatz gelte nur in rechtwinkligen Dreiecken.
   Korrektur: Er gilt in jedem Dreieck; Pythagoras ist nur sein Spezialfall fuer $\gamma = 90^\circ$.
   Korrektur-Satz: `Der Kosinussatz verallgemeinert Pythagoras auf beliebige Winkel.`
2. Fehlvorstellung: Man duerfe einen beliebigen Winkel statt des eingeschlossenen Winkels einsetzen.
   Korrektur: Der Winkel muss den beiden gegebenen Seiten gegenueber der gesuchten Seite entsprechen, sonst misst man ein anderes Dreieck.
   Korrektur-Satz: `Nur der eingeschlossene Winkel gehoert zur gegebenen Seitenpaarung.`

## Schritt 7 — szenario: Klausurtransfer: Kosinussatz und Orthogonalitaet: Kurve im Windkanal
ROLLE: Du bist Praktikant im Vermessungsbuero.
SITUATION: Ein Grundstueck bildet ein Dreieck mit $a = 40\,\mathrm{m}$, $b = 55\,\mathrm{m}$ und eingeschlossenem Winkel $\gamma = 75^\circ$. Der Eigentuemer bezweifelt die Frontlaenge $c$.
AUFGABE (nachweisen, AFB III): Berechnen Sie $c$ in einer zusammenhaengenden Darstellung (ca. 150 Woerter), pruefen Sie Orthogonalitaet und begruenden Sie jeden Rechenschritt mit Satzbenennung.
RUBRIC (30 XP): Ansatz $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ korrekt (10 XP) | Zahlwert $c \approx 60{,}9\,\mathrm{m}$ (10 XP) | Orthogonalitaetspruefung mit Pythagoras (5 XP) | Geschlossene Begruendung (5 XP).

`Klausur-Satz: Wer Kosinussatz ansetzt, Winkel zuordnet, Seite berechnet und Orthogonalitaet per Gegenprobe beurteilt, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Kurve im Windkanal
TAKEAWAY: Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage. Merke die Kette $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ bis $\cos(90^\circ) = 0$ bis $a^2 + b^2 = c^2$.

REFLEXION:
1. Welcher Schritt fiel schwerer — das Winkelrechnen mit Kosinus (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Plane: Beim naechsten Mal markiere ich zuerst Gegenwinkel und Gegenseite farbig, dann setze ich ein.

Anekdote (DE): Der franzoesische Mathematiker Lazare Carnot bewies den Kosinussatz in moderner Form, waehrend er gleichzeitig als Kriegsminister Armeen organisierte. Seine Formel $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ verband Feldmessung und Geometrie so eng, dass Landvermesser sie bis heute im Gepaeck tragen.

Bezug: `Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke.`

`Klausur-Satz: Pythagoras ist Spezialfall, nicht Normalfall: Der Kosinus entscheidet, wie stark korrigiert wird.`
