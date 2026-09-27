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

<!-- Campaign: Mars-Mission | Episode 11/28 | Krise: Sol-074 Solararray-Staub 63 Prozent Leistungsabfall | Zielgroessen: m = 0,50 kg, D = 20 N/m, Ziel T etwa 0,99 s | Tool: formula -->

## Schritt 1 — entdecken: Formel-Notfallkarte
ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst die Schwingungsgleichung $T = 2\pi\sqrt{\frac{m}{D}}$ nennen und $m$ sowie $D$ erklaeren.
2. Du kannst aus $F = -Dx$ und $F = ma$ die Differentialgleichung $\ddot{x} + \frac{D}{m}x = 0$ aufstellen.
3. Du kannst mit $\omega = \sqrt{\frac{D}{m}}$ und $f = \frac{1}{T}$ Messdaten zu Masse und Federhaerte auswerten (AFB II).

EINSTIEG: Im Jahr 1583 soll Galileo Galilei im Dom von Pisa eine pendelnde Lampe mit seinem Puls vermessen haben. Die Schwingungsdauer schien von der Auslenkung unabhaengig. Diese Isochronie steckt auch im Federpendel und macht Uhren erst moeglich.

### Hook / Phaenomen

汽车压过减速带：没减震能晃到天荒地老，有减震一秒回稳；地震区的高楼阻尼器也是同款物理，专吃共振。

Hook / Phaenomen: Ein Wagen rauscht ueber eine Bodenwelle: Ohne **Stossdaempfer** wuerde die Karosserie endlos nachschwingen. Mit Daempfer klingt die **Schwingung** in einer Sekunde ab. Dieselbe Physik schuetzt Hochhaeuser im Erdbebengebiet: Abgestimmte **Tilger** schlucken die Resonanz statt sie zu verstaerken.

`Klausur-Satz: Rueckstellung erzeugt Schwingung: Federkraft minus D mal x treibt die Masse periodisch zur Ruhelage zurueck.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
GRUNDBEGRIFFE (5 Begriffe):

- **Auslenkung**: $x(t) = A\cos(\omega t + \phi_0)$, momentaner Abstand von der Ruhelage. Der Kosinus beschreibt die Auslenkung in der Zeit; seine Amplitude bleibt konstant. Mechanismus: Kosinusansatz einsetzen und Koeffizienten vergleichen. Klausur-Tipp: Kosinus als Loesung nennen und Amplitude ablesen.
- **Federkonstante**: $D$ in $\frac{\mathrm{N}}{\mathrm{m}}$, Haerte der Feder aus $F = -Dx$. Aus D folgt die Kraft F gleich minus D mal x; D selbst ist reine Federeigenschaft. Mechanismus: Auslenkung messen und mit D multiplizieren. Klausur-Tipp: Minuszeichen als Richtung zur Ruhelage deuten.
- **Kreisfrequenz**: $\omega = \sqrt{\frac{D}{m}} = 2\pi f$, Tempo der Schwingung in $\frac{1}{\mathrm{s}}$. Sie folgt aus D und m ueber f gleich eins durch T; haertere Feder heisst hoehere Frequenz. Mechanismus: Kehrwert der Dauer bilden und in Hertz angeben. Klausur-Tipp: Amplitude als unabhaengig nennen.
- **Periodendauer**: $T = 2\pi\sqrt{\frac{m}{D}}$, Zeit einer vollen Schwingung. Sie haengt nur von m und D ab, nicht von der Amplitude. Mechanismus: Masse und Haerte einsetzen und Wurzel ziehen. Klausur-Tipp: Doppelte Masse als Faktor Wurzel zwei deuten.
- **Energieerhaltung**: $E = \frac{1}{2}Dx^2 + \frac{1}{2}mv^2 = \frac{1}{2}DA^2$, Pendeln zwischen Feder- und Bewegungsenergie. An den Umkehrpunkten steckt alles in der Feder, in der Ruhelage alles im Tempo. Mechanismus: Umkehrpunkt gegen Ruhelage als Energiesorten lesen. Klausur-Tipp: Ruhelage als schnell, Umkehr als Stillstand benennen.

`Klausur-Satz: Groessere Masse verlaengert T, haertere Feder verkuerzt T.`

## Schritt 3 — entdecken: Wirkungskette hinter Federpendel und harmonische Schwingung
KONZEPT (ein Konzept plus ein Textdiagramm):

Die Ruhelage zieht immer zurueck: $F = -Dx$. Mit Newton $F = m\ddot{x}$ folgt $\ddot{x} = -\frac{D}{m}x$. Diese Gleichung loest die Kosinusfunktion $x(t) = A\cos(\omega t)$ mit $\omega^2 = \frac{D}{m}$. Die Energie pendelt zwischen $E_{pot} = \frac{1}{2}Dx^2$ an den Umkehrpunkten und $E_{kin} = \frac{1}{2}mv^2$ beim Nulldurchgang.

```diagram
    x
    A |  *       *       *
      | * *     * *     * *
    0 |--*--*--*--*--*--*--*--> t
      |   T/4  T/2  3T/4   T
    -A|  Umkehr 0  Umkehr  0
      Ruhelage x=0: v maximal, E = m v^2 / 2
      Umkehr x=A: v=0, E = D A^2 / 2
      T = 2 pi Wurzel(m/D)
```

$$T = 2\pi\sqrt{m/D}$$
`Klausur-Satz: Minuszeichen bedeutet Rueckstellung, Kosinus loest die Bewegungsgleichung.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Formel-Notfallkarte
Kontinuitaet: Vorher Physik-Federpendel-Harmonische-Schwingung-DE-L1.md | Nachher Physik-Formeln-DE-L1.md. Krise dieser Episode: Sol-074 Solararray-Staub 63 Prozent Leistungsabfall. Zielgroessen: m = 0,50 kg, D = 20 N/m, Ziel T etwa 0,99 s

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (erklaeren, AFB II): Eine Masse $m = 0{,}25\,\mathrm{kg}$ haengt an einer Feder mit $D = 25\,\frac{\mathrm{N}}{\mathrm{m}}$. Berechnen Sie $T$ und $f$ und erklaeren Sie, wie sich $T$ bei doppelter Masse aendert.

$$T=2\pi\sqrt{m/D}$$

HILFE:
1. Schritt 1: Schreibe $T = 2\pi\sqrt{\frac{m}{D}}$ hin.
2. Schritt 2: Setze $m = 0{,}25$ und $D = 25$ ein, berechne $f = \frac{1}{T}$.
3. Schritt 3: Nutze die Wurzelabhaengigkeit $T \sim \sqrt{m}$ fuer die Prognose.

MUSTERLOESUNG: Es gilt $T = 2\pi\sqrt{\frac{0{,}25}{25}} = 2\pi \cdot 0{,}1 \approx 0{,}628\,\mathrm{s}$ und $f \approx 1{,}59\,\mathrm{Hz}$. Bei doppelter Masse waechst $T$ um $\sqrt{2} \approx 1{,}41$ auf etwa $0{,}89\,\mathrm{s}$, weil nur die Wurzel der Masse eingeht.

`Klausur-Satz: Wurzelgesetz schlaegt lineare Intuition: doppelte Masse heisst nicht doppelte Zeit.`

## Schritt 5 — ausprobieren: Duell der Verfahren Formel-Notfallkarte
VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle zuerst das Verfahren — (i) Zeitverfahren (mit $T = 2\pi\sqrt{m/D}$ rechnen) oder (ii) Energieverfahren (mit $E = \frac{1}{2}DA^2$ argumentieren) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Wie aendert sich $T$, wenn $D$ vervierfacht wird?
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Wie aendert sich die Maximalgeschwindigkeit, wenn $A$ verdoppelt wird?

HILFE: A nennt Federhaerte und Zeit, also Verfahren (i). B nennt Amplitude und Geschwindigkeit, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $T \sim \frac{1}{\sqrt{D}}$, also halbiert sich $T$. B erfordert Verfahren (ii): Aus $\frac{1}{2}mv_{max}^2 = \frac{1}{2}DA^2$ folgt $v_{max} = A\sqrt{D/m}$, also verdoppelt sich $v_{max}$.

`Klausur-Satz: Zeitfragen brauchen die Wurzelformel, Tempofragen brauchen die Energiebilanz.`

## Schritt 6 — check: Selbsttest zu Federpendel und harmonische Schwingung: Formel-Notfallkarte
CHECK (Selbsttest, 3 Fragen):

- FRAGE: Wie lautet die Periodendauer des Federpendels? | ANTWORT: $T = 2\pi\sqrt{\frac{m}{D}}$.
- FRAGE: Wie lautet die Bewegungsgleichung? | ANTWORT: $\ddot{x} + \frac{D}{m}x = 0$ aus $F = -Dx$ und $F = m\ddot{x}$.
- FRAGE: Wo ist die Geschwindigkeit maximal? | ANTWORT: In der Ruhelage $x = 0$, dort gilt $E = \frac{1}{2}mv_{max}^2$.

`Klausur-Satz: Ruhelage heisst schnell, Umkehrpunkt heisst Stillstand.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: Groessere Amplitude bedeute groessere Periodendauer.
   Korrektur: Im ungedaempften Modell ist $T$ amplitudenunabhaengig; nur $m$ und $D$ zaehlen.
   Korrektur-Satz: `Die Periodendauer haengt nicht von der Amplitude ab.`
2. Fehlvorstellung: Am Umkehrpunkt wirke keine Kraft, weil die Geschwindigkeit null sei.
   Korrektur: Dort ist $|F| = DA$ maximal, nur $v = 0$; Kraft und Geschwindigkeit sind verschiedene Groessen.
   Korrektur-Satz: `Maximale Auslenkung bedeutet maximale Rueckstellkraft bei null Geschwindigkeit.`

## Schritt 7 — szenario: Klausurtransfer: Federpendel und harmonische Schwingung: Formel-Notfallkarte
ROLLE: Du bist Laborassistent im Physikkurs.
SITUATION: Eine Gruppe meldet $T = 1{,}2\,\mathrm{s}$ fuer $m = 0{,}4\,\mathrm{kg}$ und behauptet $D = 5\,\frac{\mathrm{N}}{\mathrm{m}}$.
AUFGABE (begruenden, AFB III): Pruefen Sie die Angabe in einer zusammenhaengenden Darstellung (ca. 150 Woerter), berechnen Sie $D$ aus $T$ und beurteilen Sie Messfehlerquellen.
RUBRIC (30 XP): Umstellung $D = \frac{4\pi^2m}{T^2}$ korrekt (10 XP) | Zahlwert $D \approx 11\,\frac{\mathrm{N}}{\mathrm{m}}$ (10 XP) | Fehlerdiskussion Reibung und Zeitmessung (5 XP) | Geschlossene Darstellung (5 XP).

`Klausur-Satz: Wer Wurzelgesetz anwendet, Isochronie begruendet und Messfehler mit Reibung diskutiert, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Formel-Notfallkarte
TAKEAWAY: Merke Rueckstellung, Wurzel, Energie: $F = -Dx$ erzeugt $T = 2\pi\sqrt{m/D}$ und $E = \frac{1}{2}DA^2$. Zeit haengt an $m$ und $D$, Tempo an der Lage im Zyklus.

REFLEXION:
1. Was fiel schwerer — die Formelrechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Plane: Beim naechsten Mal schreibe ich zuerst Kraftansatz und Energieansatz nebeneinander, dann waehle ich.

Anekdote (DE): Der Uhrmacher Christiaan Huygens baute 1656 die erste Pendeluhr und mass die Sekundenstoesse mit $T = 2\,\mathrm{s}$. Seine Feder- und Pendelstudien mit $\omega = \sqrt{D/m}$ machten Zeit erstmals im Alltag praezise — ein Segen fuer Navigation und Wissenschaft.

Bezug: `Huygens Uhr zeigt: Harmonische Schwingung macht Zeit messbar.`

`Klausur-Satz: Schwingen heisst pendeln zwischen zwei Konten: Kraft bestimmt die Zeit, Energie das Tempo.`
