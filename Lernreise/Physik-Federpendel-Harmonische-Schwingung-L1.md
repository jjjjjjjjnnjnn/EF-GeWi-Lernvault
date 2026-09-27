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

<!-- Campaign: Mars-Mission | Episode 11/28 | Krise: Sol-074 Solararray-Staub 63 Prozent Leistungsabfall | Target: v0 = 317 m/s, a = 3.4 m/s2, Ziel s = 1207 m | Tool: schiefe-ebene -->

## Schritt 1 — entdecken: Formel-Notfallkarte
ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst die Schwingungsgleichung $T = 2\pi\sqrt{\frac{m}{D}}$ nennen und $m$ sowie $D$ erklaeren.
2. Du kannst aus $F = -Dx$ und $F = ma$ die Differentialgleichung $\ddot{x} + \frac{D}{m}x = 0$ aufstellen.
3. Du kannst mit $\omega = \sqrt{\frac{D}{m}}$ und $f = \frac{1}{T}$ Messdaten zu Masse und Federhaerte auswerten (AFB II).

EINSTIEG: Im Jahr 1583 soll Galileo Galilei im Dom von Pisa eine pendelnde Lampe mit seinem Puls vermessen haben. Die Schwingungsdauer schien von der Auslenkung unabhaengig. Diese Isochronie steckt auch im Federpendel und macht Uhren erst moeglich.

### Hook / Phaenomen

【火星拓荒者·第11集/共28集】警报：Sol-074 Solararray-Staub 63 Prozent Leistungsabfall。领航员 Lena 大喊：“v0 = 317 m/s, a = 3.4 m/s2, Ziel s = 1207 m！”机械师 Tom 回应：“稳住曲线！”上一集（Physik-Federpendel-Harmonische-Schwingung-DE-L1.md）埋下的隐患在此爆发，下一集（Physik-Formeln-DE-L1.md）的大门只为算对的人打开。本集你要在沙盘里亲手把飞船从超速边缘救回来：先看现象、再点装备、最后算出让考官点头的 Bilanz。记住：读图先看轴、计算必带单位、做完必用另一张图验算——这就是火星人生存法则，也是 Klausur 拿分法则。

Hook / Phaenomen (Sol-Logbuch, Episode 11 von 28): Mars-Anflug, Sol-074 Solararray-Staub 63 Prozent Leistungsabfall. Navigatorin Lena meldet: v0 = 317 m/s, a = 3.4 m/s2, Ziel s = 1207 m, Mechaniker Tom ruft: Halte die Kurve! Der Bordcomputer geht auf Rot, das Funkgeraet rauscht, die Crew haelt den Atem an. Genau hier entscheidet Federpendel und harmonische Schwingung ueber Landung oder Absturz, ueber Festfahren oder Weiterfahrt, ueber Andocken oder Abprall. Das Logbuch des vorherigen Sols (Physik-Federpendel-Harmonische-Schwingung-DE-L1.md) warnte bereits vor diesem Moment, und das naechste Fenster (Physik-Formeln-DE-L1.md) oeffnet sich nur, wenn diese Aufgabe geloest wird. Die Sensoren streuen, die Diagramme zittern, doch die Physik bleibt unbestechlich: Wer Steigung und Flaeche, Kraft und Gegenkraft, Schwung und Stoss richtig liest, rettet die Mission. In dieser Episode stellst du im Sandbox-Labor die Brems- und Gleitzahlen so ein, dass die Kapsel sicher durchkommt. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Groessen mit exakten Einheiten, pruefe schliesslich die Bilanz mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
GRUNDBEGRIFFE (5 Begriffe):

- **Auslenkung**: $x(t) = A\cos(\omega t + \phi_0)$, momentaner Abstand von der Ruhelage.
- **Federkonstante**: $D$ in $\frac{\mathrm{N}}{\mathrm{m}}$, Haerte der Feder aus $F = -Dx$.
- **Kreisfrequenz**: $\omega = \sqrt{\frac{D}{m}} = 2\pi f$, Tempo der Schwingung in $\frac{1}{\mathrm{s}}$.
- **Periodendauer**: $T = 2\pi\sqrt{\frac{m}{D}}$, Zeit einer vollen Schwingung.
- **Energieerhaltung**: $E = \frac{1}{2}Dx^2 + \frac{1}{2}mv^2 = \frac{1}{2}DA^2$, Pendeln zwischen Feder- und Bewegungsenergie.

Klausur-Satz: `Groessere Masse verlaengert T, haertere Feder verkuerzt T.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

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

Klausur-Satz: `Minuszeichen bedeutet Rueckstellung, Kosinus loest die Bewegungsgleichung.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Formel-Notfallkarte
Kontinuitaet: Vorher Physik-Federpendel-Harmonische-Schwingung-DE-L1.md | Nachher Physik-Formeln-DE-L1.md. Krise dieser Episode: Sol-074 Solararray-Staub 63 Prozent Leistungsabfall. Target: v0 = 317 m/s, a = 3.4 m/s2, Ziel s = 1207 m.

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: schiefe-ebene]

AUFGABE (erklaeren, AFB II): Eine Masse $m = 0{,}25\,\mathrm{kg}$ haengt an einer Feder mit $D = 25\,\frac{\mathrm{N}}{\mathrm{m}}$. Berechnen Sie $T$ und $f$ und erklaeren Sie, wie sich $T$ bei doppelter Masse aendert.

HILFE:
1. Schritt 1: Schreibe $T = 2\pi\sqrt{\frac{m}{D}}$ hin.
2. Schritt 2: Setze $m = 0{,}25$ und $D = 25$ ein, berechne $f = \frac{1}{T}$.
3. Schritt 3: Nutze die Wurzelabhaengigkeit $T \sim \sqrt{m}$ fuer die Prognose.

MUSTERLOESUNG: Es gilt $T = 2\pi\sqrt{\frac{0{,}25}{25}} = 2\pi \cdot 0{,}1 \approx 0{,}628\,\mathrm{s}$ und $f \approx 1{,}59\,\mathrm{Hz}$. Bei doppelter Masse waechst $T$ um $\sqrt{2} \approx 1{,}41$ auf etwa $0{,}89\,\mathrm{s}$, weil nur die Wurzel der Masse eingeht.

Klausur-Satz: `Wurzelgesetz schlaegt lineare Intuition: doppelte Masse heisst nicht doppelte Zeit.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Formel-Notfallkarte
VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: Waehle zuerst das Verfahren — (i) Zeitverfahren (mit $T = 2\pi\sqrt{m/D}$ rechnen) oder (ii) Energieverfahren (mit $E = \frac{1}{2}DA^2$ argumentieren) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Wie aendert sich $T$, wenn $D$ vervierfacht wird?
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Wie aendert sich die Maximalgeschwindigkeit, wenn $A$ verdoppelt wird?

HILFE: A nennt Federhaerte und Zeit, also Verfahren (i). B nennt Amplitude und Geschwindigkeit, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): $T \sim \frac{1}{\sqrt{D}}$, also halbiert sich $T$. B erfordert Verfahren (ii): Aus $\frac{1}{2}mv_{max}^2 = \frac{1}{2}DA^2$ folgt $v_{max} = A\sqrt{D/m}$, also verdoppelt sich $v_{max}$.

Klausur-Satz: `Zeitfragen brauchen die Wurzelformel, Tempofragen brauchen die Energiebilanz.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Federpendel und harmonische Schwingung: Formel-Notfallkarte
CHECK (Selbsttest, 3 Fragen):

FRAGE: Wie lautet die Periodendauer des Federpendels? | ANTWORT: $T = 2\pi\sqrt{\frac{m}{D}}$.
FRAGE: Wie lautet die Bewegungsgleichung? | ANTWORT: $\ddot{x} + \frac{D}{m}x = 0$ aus $F = -Dx$ und $F = m\ddot{x}$.
FRAGE: Wo ist die Geschwindigkeit maximal? | ANTWORT: In der Ruhelage $x = 0$, dort gilt $E = \frac{1}{2}mv_{max}^2$.

Klausur-Satz: `Ruhelage heisst schnell, Umkehrpunkt heisst Stillstand.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

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

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Formel-Notfallkarte
TAKEAWAY: Merke Rueckstellung, Wurzel, Energie: $F = -Dx$ erzeugt $T = 2\pi\sqrt{m/D}$ und $E = \frac{1}{2}DA^2$. Zeit haengt an $m$ und $D$, Tempo an der Lage im Zyklus.

REFLEXION:
1. Was fiel schwerer — die Formelrechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Plane: Beim naechsten Mal schreibe ich zuerst Kraftansatz und Energieansatz nebeneinander, dann waehle ich.

Anekdote (DE): Der Uhrmacher Christiaan Huygens baute 1656 die erste Pendeluhr und mass die Sekundenstoesse mit $T = 2\,\mathrm{s}$. Seine Feder- und Pendelstudien mit $\omega = \sqrt{D/m}$ machten Zeit erstmals im Alltag praezise — ein Segen fuer Navigation und Wissenschaft.

Bezug: `Huygens Uhr zeigt: Harmonische Schwingung macht Zeit messbar.`

`Klausur-Satz: Siehe Schritt-Inhalt.`
