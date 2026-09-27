---
fach: Physik
thema: "Gravitation und Satellitenbahnen"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, Gravitation]
version: Lesson-v3
---

# Lernreise: Gravitation und Satellitenbahnen (L1, Ziel Klausur)

<!-- Campaign: Mars-Mission | Episode 20/28 | Krise: Sol-109 Orbit-Trümmerfeld Dichte 12 Objekte pro km3 | Zielgroessen: Satellit mit Bahnradius r, Ziel Geschwindigkeit und Umlaufzeit | Tool: formula -->

## Schritt 1 — entdecken: Stoss im Dock
ZIELE (drei messbare Ziele dieser Lektion):

1. $F = G m M/r^2$ mit $G = 6{,}67 \cdot 10^{-11}$ und $r$ ab Erdmittelpunkt nennen.
2. $v = \sqrt{G M/r}$ per $m v^2/r = G m M/r^2$ herleiten und GEO gegen LEO abgrenzen.
3. $T^2 = 4\pi^2 r^3/(G M)$ deuten und $r \approx 42164\,\mathrm{km}$ zu $T = 24\,\mathrm{h}$ zuordnen.

### Hook / Phaenomen

Hook / Phaenomen: Der Mond faellt staendig zur Erde und trifft sie nie: **Gravitationskraft** liefert exakt die noetige Zentripetalkraft. Dieses **Bahn-Gleichgewicht** sortiert Satelliten nach Hoehe, **Kepler** sortiert sie nach Zeit. **GEO** steht still, erdnahe Bahnen rasen.

`Klausur-Satz: Gravitation haelt Bahnen: G m M durch r Quadrat gleich Zentripetalkraft bestimmt Geschwindigkeit aus Bahnradius.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Fuenf Begriffe trennen in dieser Lektion Alltagssprache von Klausursprache. Wer sie aktiv wiedergeben kann, liest jede Aufgabe schneller und waehlt sofort das richtige Verfahren.

### Fachbegriffe & Definitionen

- **Gravitationskraft:** Die Anziehung $F_G=GMm/r^2$ wirkt zwischen Massen mit Abstand $r$ vom Zentrum. Sie faellt mit dem Abstandsquadrat und reicht bis zum Mond. Mechanismus: Zentralmassen und Bahnradius einsetzen. Klausur-Tipp: $r$ ab Erdmittelpunkt zaehlen, nicht ab Oberflaeche.
- **Bahn-Gleichgewicht:** Die Gravitation liefert exakt die Zentripetalkraft der Kreisbahn per $GMm/r^2=mv^2/r$. Gravitation und Zentripetalkraft halten sich exakt die Waage. Mechanismus: Kraefte gleichsetzen und kuerzen. Klausur-Tipp: Gleichgewicht als Bahnbedingung nennen.
- **Bahngeschwindigkeit:** Das Tempo $v=\sqrt{GM/r}$ faellt mit wachsendem Radius immer weiter. Sie sinkt mit wachsendem Bahnradius wie eins durch Wurzel r. Mechanismus: Gleichgewicht nach $v$ aufloesen. Klausur-Tipp: Kleineres $r$ als groesseres $v$ deuten.
- **Kepler-Gesetz:** Hohe Bahnen brauchen lange Umlaufzeiten per $T^2$ proportional $r^3$. Keplers drittes Gesetz steckt in der Bahnkonstanten; die Gravitationskonstante G bestimmt ihren Zahlenwert. Mechanismus: $T=2\pi r/v$ mit Bahngeschwindigkeit verbinden. Klausur-Tipp: Verhaeltnisform fuer Bahnvergleiche nutzen.
- **Erdnaehe vs. GEO:** Tiefe Bahnen sind schnell und kurz, der GEO-Ring ist langsam und taggleich. Mechanismus: Radius einsetzen und $v$ sowie $T$ vergleichen. Klausur-Tipp: GEO mit $T=24h$ als Sonderfall nennen.

### Wirkungsgefuege / Modell

Die Kette verbindet alle fuenf Begriffe zu einem Verfahren: Erkennen, Einordnen, Aufstellen, Loesen und Deuten. Jeder Begriff traegt genau einen Schritt, gemeinsam sichern sie die volle Punktzahl.

`Klausur-Satz: Groessere Bahnhoehe bedeutet kleinere Geschwindigkeit und groessere Umlaufzeit.`

## Schritt 3 — entdecken: Wirkungskette hinter Gravitation und Satellitenbahnen
EXPERIMENTELLE ERKUNDUNG (Sandbox, erst spielen, dann deuten):

### Hook & Phaenomen

Die Sandbox macht das Unsichtbare sichtbar: Stelle Groessen ein, beobachte Kurven und lies Werte ab, bevor eine einzige Formel faellt. Erst die Anschauung, dann die Deutung, erst das Spiel, dann das Gesetz.

### Spiel-Aufgabe / Challenge

Oeffne die Sandbox aus Schritt 4, variiere die zentralen Parameter in kleinen Schritten und notiere je Stufe Kurvenform und Messwert. Formuliere aus drei Stufen eine erste Vermutung ueber den Zusammenhang.

### Aha-Moment & Gesetz

Die Kausalkette laeuft von der Anziehung ueber das Gleichgewicht zur Bahn: Zuerst setzt man $F_G=GMm/r^2$ als einzige Radialkraft an, dann gleicht man sie mit $mv^2/r$ aus, schliesslich folgen $v=\sqrt{GM/r}$ und per $T=2\pi r/v$ das Kepler-Gesetz. Groessere Hoehe bedeutet kleineres Tempo und groessere Umlaufzeit, kleineres $r$ liefert groesseres $v$ und kleineres $T$. Das Gleichgewicht der Kraefte erklaert jede Kreisbahn im All.

```diagram
+------------------------------------------+
| FG = G M m / r^2  (r ab Zentrum!)       |
|   | Gleichgewicht: FG = m v^2 / r       |
|   v                                      |
| v = Wurzel(GM/r), T = 2 pi r / v        |
| hoch -> langsam + lang | tief -> schnell|
+------------------------------------------+
```
Formelkern: $F_G=GMm/r^2$

$$F_G = G\frac{mM}{r^2},\quad \frac{T^2}{r^3} = \text{const}$$
`Klausur-Satz: Aus dem Kraeftegleichgewicht folgen Bahngeschwindigkeit und Kepler-Gesetz.`

## Anekdote & Fun-Fact
**Anekdote / Fun-Fact (DE)**: Als Newton 1687 seine Principia veroeffentlichte, rechnete er die Mondbahn mit $F \sim \frac{1}{r^2}$ nach und traf die Umlaufzeit bis auf wenige Prozent. Sein Zeitgenosse Halley nutzte dieselbe Formel und sagte die Wiederkehr seines Kometen fuer 1758 voraus — ein Triumph der Himmelsmechanik. Im Jahr 1957 piepste Sputnik ueber den Nachthimmel als erstes Zeichen des staendigen Falls um die Erde.

**Bezug zum Konzept**: `Newtons 1-durch-r-Quadrat erklaert Mond, Sputnik und TV-Satellit zugleich.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Stoss im Dock
Kontinuitaet: Vorher Physik-Gravitation-Satellitenbahnen-CN-L1.md | Nachher Physik-Gravitation-Satellitenbahnen-L1.md. Krise dieser Episode: Sol-109 Orbit-Trümmerfeld Dichte 12 Objekte pro km3. Zielgroessen: Satellit mit Bahnradius r, Ziel Geschwindigkeit und Umlaufzeit

BEISPIEL (Sandbox Level mit Werkzeug):

[Werkzeug: formula]

AUFGABE (Levelziel, AFB II): Knacke das Orbit-Level: Ziehe im Sandbox-Labor den Bahnradius $r$ von erdnah bis GEO und beobachte, wie $v$ faellt und $T$ waechst und die Bahn bei jedem $r$ stabil bleibt. Miss $v$ und $T$ an zwei Radien, berechne dann exakt per Gleichgewicht und Kepler-Gesetz und vergleiche Labor mit Rechnung.

HILFE:
1. Stelle zwei Radien ein und lies $v$ sowie $T$ im Labor ab.
2. Setze $GMm/r^2 = mv^2/r$ und loese nach $v = \sqrt{GM/r}$ auf.
3. Berechne $T = 2\pi r/v$, gleiche mit dem Labor ab und deute hoch gegen tief.

MUSTERLOESUNG: Labor zeigt kleineres $r$ mit groesserem $v$ und kleinerem $T$ bestaetigt. Rechnung $v=\sqrt{GM/r}$ und $T=2\pi r/v$ reproduziert die Laborwerte an beiden Radien. Kleineres $r$ liefert groesseres $v$ und kleineres $T$, hoehere Bahnen sind langsamer mit laengerer Umlaufzeit per Kepler-Gesetz.

`Klausur-Satz: Kleineres r liefert groesseres v und kleineres T.`

## Schritt 5 — ausprobieren: Duell der Verfahren Stoss im Dock
VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle zuerst das Verfahren — (i) Bahnverfahren (mit $v = \sqrt{GM/r}$ und $T^2 \sim r^3$ argumentieren) oder (ii) Fallverfahren (mit $F = mg$ nahe der Erdoberflaeche argumentieren) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Vergleichen Sie Umlaufzeiten auf $r_1 = 7000\,\mathrm{km}$ und $r_2 = 42000\,\mathrm{km}$.

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Schaetzen Sie die Gewichtskraft eines $80\,\mathrm{kg}$-Astronauten an der Erdoberflaeche.

HILFE: A nennt zwei Bahnen, also Verfahren (i). B nennt Oberflaeche ohne Bahn, also Verfahren (ii). Faustregel: Bahnvergleich verlangt Kepler, Oberflaeche verlangt $mg$.

ANTWORT: A erfordert Verfahren (i): Nach $T^2 \sim r^3$ gilt $\frac{T_2}{T_1} = (\frac{42000}{7000})^{1{,}5} = 6^{1{,}5} \approx 14{,}7$. B erfordert Verfahren (ii): $F = mg \approx 80 \cdot 9{,}81 = 785\,\mathrm{N}$.

`Klausur-Satz: Bahnen vergleichen heisst Kepler, Oberflaeche schaetzen heisst mg.`

## Schritt 6 — check: Selbsttest zu Gravitation und Satellitenbahnen: Stoss im Dock
CHECK (Selbsttest, 3 Fragen mit Antworten):

- FRAGE: Wie lautet das Gravitationsgesetz? | ANTWORT: $F = G\frac{mM}{r^2}$ mit Abstand $r$ vom Massenzentrum.
- FRAGE: Wie lautet die Kreisbahngeschwindigkeit? | ANTWORT: $v = \sqrt{\frac{GM}{r}}$, aus $\frac{mv^2}{r} = G\frac{mM}{r^2}$.
- FRAGE: Was kennzeichnet die geostationaere Bahn? | ANTWORT: $T = 24\,\mathrm{h}$, Aequatorebene, $r \approx 42164\,\mathrm{km}$, fest ueber dem Boden.

`Klausur-Satz: Gleichgewicht der Kraefte erklaert jede Kreisbahn.`

## Fehlvorstellung
(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Im Weltraum gebe es keine Gravitation, Satelliten floegen kraeftefrei geradeaus.
   Korrektur: Gravitation liefert gerade die Kurvenkraft; ohne sie entkaeme der Satellit tangential. Schwerelosigkeit bedeutet freier Fall, nicht Kraeftefreiheit.
   Korrektur-Satz: `Schwerelosigkeit ist staendiges Fallen um die Erde, kein Verschwinden der Gravitation.`
2. Fehlannahme: Hoehere Bahnen verlangten hoehere Geschwindigkeit wegen laengerem Weg.
   Korrektur: Es gilt $v = \sqrt{GM/r}$; weiter aussen ist die Gravitation schwaecher und verlangt weniger Zentripetalkraft.
   Korrektur-Satz: `Die Bahngeschwindigkeit faellt mit wachsendem Radius wie 1 durch Wurzel r.`

## Schritt 7 — szenario: Klausurtransfer: Gravitation und Satellitenbahnen: Stoss im Dock
ROLLE: Du bist Praktikant bei einer Raumfahrtagentur.
SITUATION: Ein Kunde will einen TV-Satelliten, der stets ueber derselben Stadt steht, plant ihn aber in $h = 800\,\mathrm{km}$. Lege in zusammenhaengender Darstellung (ca. 150 Woerter) dar, warum der Plan scheitert, schaetze die Umlaufzeit ab und nenne die korrekte Hoehe mit Begruendung.
RUBRIC (30 XP): Kraeftegleichgewicht genannt (10 XP) | $T$-Abschaetzung mit $T^2 \sim r^3$ (10 XP) | Geostationaere Bedingung $T = 24\,\mathrm{h}$ (5 XP) | Geschlossene Darstellung (5 XP).

`Klausur-Satz: Wer Gleichgewicht ansetzt, Bahngroessen berechnet und Kepler zur Kontrolle nutzt, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Stoss im Dock
TAKEAWAY (Kernzusammenfassung):

Merke die Kette Gleichgewicht, Kuerzen, Wurzel: $\frac{mv^2}{r} = G\frac{mM}{r^2}$ fuehrt zu $v = \sqrt{GM/r}$ und $T^2 = \frac{4\pi^2}{GM}r^3$. Niedrig heisst schnell, hoch heisst langsam.
Takeaway-Satz: `Gleichgewicht kuertzt Masse und liefert Wurzelgesetz: v faellt mit Wurzel r, T waechst mit r hoch drei Halbe.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Herleitung mit Kuerzen (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Planung: Beim naechsten Mal schreibe ich zuerst beide Kraefte mit Richtungspfeil, dann erst die Gleichung.

`Klausur-Satz: Fallen und Fliegen sind eins: Umlaufbahnen sind ewiges Fallen am Boden vorbei.`
