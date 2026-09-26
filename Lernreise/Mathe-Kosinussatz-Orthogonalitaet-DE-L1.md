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

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst mit $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ aus $a = 5$, $b = 7$, $\gamma = 60^\circ$ die Seite $c$ schrittweise zu $c \approx 6{,}08$ berechnen.
2. Du kannst den Kosinussatz als Pythagoras mit Korrektur erklaeren und $\gamma = 90^\circ$ mit $\cos(90^\circ) = 0$ einordnen.
3. Du kannst mit $\cos(\gamma) = \frac{a^2+b^2-c^2}{2ab}$ an $3$-$4$-$5$ nachweisen, dass $\gamma = 90^\circ$ vorliegt (AFB II).

EINSTIEG: Beim Tunnelbau von zwei Seiten bohrten sich im Jahr 1871 die Arbeiter am Mont-Cenis fast vorbei, weil eine Winkelmessung kippte. Dreiecksrechnung aus zwei Seiten und eingeschlossenem Winkel entscheidet ueber Treffer oder Fehlbohrung. Der Kosinussatz sichert genau diese Lage.

### Hook / Phaenomen

Im Jahr 1871 gruben sich zwei Tunnelmannschaften am Mont-Cenis fast vorbei — wenige Grad Winkelfehler, kilometerweise Umweg. Auch moderne Tunnelbohrmaschinen irren ohne Dreiecksrechnung: Aus zwei gemessenen Seiten und dem Winkel dazwischen muss die dritte Seite auf den Zentimeter stimmen. Warum versagt Pythagoras hier — und welcher Korrekturterm rettet die Bohrung?

### Fachbegriff & Definition

Nach dem NRW-Kernlehrplan Geometrie gilt der **Kosinussatz $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$, wobei $\gamma$ der Seite $c$ gegenueberliegt und zwischen $a$ und $b$ eingeschlossen ist**. Der **eingeschlossene Winkel $\gamma$ bestimmt den Korrekturterm $-2ab\cos(\gamma)$**. Der **Satz des Pythagoras $c^2 = a^2 + b^2$ ist der Spezialfall fuer $\gamma = 90^\circ$**, weil $\cos(90^\circ) = 0$ den Korrekturterm loescht.

### Wirkungsgefuege / Modell

Der Mechanismus korrigiert Pythagoras um die Schiefe: Fuer $a = 5$, $b = 7$, $\gamma = 60^\circ$ mit $\cos(60^\circ) = 0{,}5$ gilt $c^2 = 25 + 49 - 2 \cdot 5 \cdot 7 \cdot 0{,}5 = 74 - 35 = 39$, also $c = \sqrt{39} \approx 6{,}24$. Ist $\gamma$ spitz, so verkuerzt $-2ab\cos(\gamma)$ die Seite; ist $\gamma$ stumpf mit $\cos(\gamma) < 0$, so verlaengert sie sich.

Schritt A: Seiten $a$, $b$ und $\gamma$ identifizieren und $\cos(\gamma)$ bestimmen.
Schritt B: $c^2 = a^2+b^2-2ab\cos(\gamma)$ einsetzen und ausrechnen.
Schritt C: Wurzel ziehen und mit Pythagoras-Probe bei $90^\circ$ sichern.

Klausur-Satz: `Der Kosinussatz berechnet die dritte Seite aus zwei Seiten und dem eingeschlossenen Winkel.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Dreieck mit $a = 3$, $b = 4$, $c = 6$ sieht fast rechtwinklig aus — ist es aber nicht. Der Augenmass irrt um wenige Grad, die Rechnung nicht. Welche fuenf Begriffe entscheiden ohne Winkelmesser, ob der rechte Winkel wirklich vorliegt?

### Fachbegriffe & Definitionen

- **Kosinussatz:** $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ mit $\gamma$ gegenueber $c$.
- **Eingeschlossener Winkel:** Winkel $\gamma$ zwischen $a$ und $b$; er steuert $-2ab\cos(\gamma)$.
- **Satz des Pythagoras:** $c^2 = a^2 + b^2$ fuer $\gamma = 90^\circ$, da $\cos(90^\circ) = 0$.
- **Orthogonalitaet im Dreieck:** Rechter Winkel genau dann, wenn $a^2 + b^2 = c^2$ erfuellt ist.
- **Kongruenzsatz SWS:** Zwei Seiten plus eingeschlossener Winkel legen das Dreieck eindeutig fest.

### Wirkungsgefuege / Modell

Die Kette prueft ohne Messen: Umkehrform $\cos(\gamma) = \frac{a^2+b^2-c^2}{2ab}$ verwandelt Seiten in Winkelzeichen. Fuer $3$-$4$-$5$ gilt $\cos(\gamma) = \frac{9+16-25}{2 \cdot 3 \cdot 4} = 0$, also $\gamma = 90^\circ$. Fuer $3$-$4$-$6$ gilt $\cos(\gamma) = \frac{9+16-36}{24} < 0$, also stumpf und $c$ verlaengert. SWS garantiert, dass diese drei Stuecke genau ein Dreieck liefern — keine zweite Loesung, keine Willkuer.

Klausur-Satz: `Ohne rechten Winkel tritt der Korrekturterm mit Kosinus hinzu.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Ein Vermesser misst $a = 8$, $b = 6$, $c = 10$ und behauptet ohne Winkelmesser: Hier steht ein rechter Winkel. Sein Kollege misst $a = 5$, $b = 5$, $c = 9$ und warnt vor stumpfem Winkel trotz symmetrischer Figur. Beide Urteile fallen aus derselben Formel — dem umgekehrten Kosinussatz. Wie entscheidet allein das Vorzeichen von $\cos(\gamma)$ ueber verkuerzt oder verlaengert?

### Fachbegriff & Definition

Das **Vorzeichen von $\cos(\gamma)$ entscheidet ueber die Korrektur: Bei spitzem $\gamma$ mit $\cos(\gamma) > 0$ wird $c$ verkuerzt, bei stumpfem $\gamma$ mit $\cos(\gamma) < 0$ wird $c$ verlaengert**. Die **Umkehrform $\cos(\gamma) = \frac{a^2+b^2-c^2}{2ab}$ prueft Rechtwinkligkeit ohne Winkelmesser** — null bedeutet rechtwinklig, positiv spitz, negativ stumpf.

### Wirkungsgefuege / Modell

Der Tiefenweg in drei Faellen: $8$-$6$-$10$ liefert $\cos(\gamma) = \frac{64+36-100}{96} = 0$ zu $\gamma = 90^\circ$. Dagegen $5$-$5$-$7$ liefert $\cos(\gamma) = \frac{25+25-49}{50} = 0{,}02 > 0$ zu spitz und $c$ verkuerzt. Und $5$-$5$-$9$ liefert $\cos(\gamma) = \frac{25+25-81}{50} < 0$ zu stumpf und $c$ verlaengert. Der Kosinus wirkt als Schalter zwischen den drei Gestalten.

Schritt A: Zaehler $a^2+b^2-c^2$ mit Vorzeichen bestimmen.
Schritt B: Durch $2ab$ teilen und Vorzeichen lesen.
Schritt C: spitz, recht oder stumpf zuordnen und Seite deuten.

```diagram
        C
        /\
     b /  \ a
      /    \
     / gamma\
    A===c====B
    c^2 = a^2 + b^2 - 2ab cos(gamma)
    gamma = 90 Grad > c^2 = a^2 + b^2 (cos = 0)
    gamma < 90 Grad > cos > 0 > c kuerzer
    gamma > 90 Grad > cos < 0 > c laenger
    Umkehr: cos(gamma) = (a^2+b^2-c^2)/(2ab)
```

Klausur-Satz: `Das Vorzeichen von cos(gamma) entscheidet ueber verkuerzt oder verlaengert.`

## Anekdote & Fun-Fact

Der franzoesische Mathematiker Lazare Carnot bewies den Kosinussatz in moderner Form, waehrend er gleichzeitig als Kriegsminister Armeen organisierte. Seine Formel $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ verband Feldmessung und Geometrie so eng, dass Landvermesser sie bis heute im Gepaeck tragen.

Bezug zum Konzept: `Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II): Gegeben ist ein Dreieck mit $a = 5$, $b = 7$ und $\gamma = 60^\circ$. Berechnen Sie die Seite $c$ und pruefen Sie, ob das Dreieck rechtwinklig ist.

HILFE:
1. Schritt 1: Setze in $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ ein.
2. Schritt 2: Nutze $\cos(60^\circ) = 0{,}5$ und berechne $c = \sqrt{c^2}$.
3. Schritt 3: Pruefe $a^2 + b^2 = c^2$ fuer die Orthogonalitaetsfrage.

MUSTERLOESUNG: Es gilt $c^2 = 25 + 49 - 2 \cdot 5 \cdot 7 \cdot 0{,}5 = 74 - 35 = 39$, also $c = \sqrt{39} \approx 6{,}24$. Da $\gamma = 60^\circ \ne 90^\circ$ ist und keine Seitenpaarung die Gleichung $a^2 + b^2 = c^2$ erfuellt, liegt kein rechter Winkel vor. Das Dreieck ist am Winkel $\gamma$ spitzwinklig.

Klausur-Satz: `Einsetzen, Wurzel ziehen, Pythagoras-Probe anschliessen.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Triff zuerst die Wahl des Verfahrens: (i) Kosinussatz-Verfahren (Seite aus SWS berechnen) oder (ii) Umkehr-Verfahren (Winkel aus drei Seiten mit Kosinusformel bestimmen) > dann loesen.

AUFGABE A: Berechnen Sie $c$ aus $a = 4$, $b = 6$, $\gamma = 120^\circ$.
AUFGABE B: Pruefen Sie, ob das Dreieck mit $a = 3$, $b = 4$, $c = 5$ rechtwinklig ist.

HILFE: Aufgabe A nennt zwei Seiten plus Winkel, daher Verfahren (i). Aufgabe B nennt drei Seiten ohne Winkel, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $c^2 = 16 + 36 - 48\cos(120^\circ) = 52 + 24 = 76$, also $c = \sqrt{76} \approx 8{,}72$. B erfordert Verfahren (ii): $3^2 + 4^2 = 25 = 5^2$, also rechtwinklig mit $\gamma = 90^\circ$.

Klausur-Satz: `SWS sucht eine Seite, SSS sucht einen Winkel.`

## Schritt 6 — check

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

## Schritt 7 — szenario

ROLLE: Du bist Praktikant im Vermessungsbuero.
SITUATION: Ein Grundstueck bildet ein Dreieck mit $a = 40\,\mathrm{m}$, $b = 55\,\mathrm{m}$ und eingeschlossenem Winkel $\gamma = 75^\circ$. Der Eigentuemer bezweifelt die Frontlaenge $c$.
AUFGABE (nachweisen, AFB III): Berechnen Sie $c$ in einer zusammenhaengenden Darstellung (circa 150 Woerter), pruefen Sie Orthogonalitaet und begruenden Sie jeden Rechenschritt mit Satzbenennung.
RUBRIC (30 XP): Ansatz $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ korrekt (10 XP) | Zahlwert $c \approx 60{,}9\,\mathrm{m}$ (10 XP) | Orthogonalitaetspruefung mit Pythagoras (5 XP) | Geschlossene Begruendung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage. Merke die Kette $c^2 = a^2 + b^2 - 2ab\cos(\gamma)$ bis $\cos(90^\circ) = 0$ bis $a^2 + b^2 = c^2$. Carnots Formel macht aus jeder SWS-Lage eine berechenbare Strecke und verbindet Feldmessung mit Geometrie.

Takeaway-Satz: `Zwei Seiten plus Winkel bedeuten Kosinussatz, drei Seiten bedeuten Winkelrueckfrage ueber die Kosinusformel.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer: das Winkelrechnen mit Kosinus (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal markiere ich zuerst Gegenwinkel und Gegenseite farbig, dann setze ich ein.
