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

<!-- Campaign: Mars-Mission | Episode 21/28 | Krise: Sol-113 Kuehlkreislauf Ueberdruck 4,1 bar | Target: v0 = 387 m/s, a = 4.7 m/s2, Ziel s = 1577 m | Tool: formula -->

## Schritt 1 — entdecken: Kollision der Module
ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst das Gravitationsgesetz $F = G\frac{mM}{r^2}$ nennen und jede Groesse erklaeren.
2. Du kannst die Kreisbahngeschwindigkeit $v = \sqrt{\frac{GM}{r}}$ herleiten und geostationaere von niedrigen Bahnen unterscheiden.
3. Du kannst mit dem Kraeftegleichgewicht $\frac{mv^2}{r} = G\frac{mM}{r^2}$ Begruendungen zu Bahnhoehe und Umlaufzeit formulieren (AFB II).

EINSTIEG: Im Jahr 1957 piepste Sputnik ueber den Nachthimmel und niemand verstand, warum der kleine Ball nicht herunterfiel. Die Antwort ist ein staendiges Fallen um die Erde herum. Wer Gravitation und Zentripetalkraft gleichsetzt, versteht jeden Satelliten.

### Hook / Phaenomen

【火星拓荒者·第21集/共28集】警报：Sol-113 Kuehlkreislauf Ueberdruck 4,1 bar。领航员 Lena 大喊：“v0 = 387 m/s, a = 4.7 m/s2, Ziel s = 1577 m！”机械师 Tom 回应：“稳住曲线！”上一集（Physik-Gravitation-Satellitenbahnen-DE-L1.md）埋下的隐患在此爆发，下一集（Physik-Impulserhaltung-Stoesse-CN-L1.md）的大门只为算对的人打开。本集你要在沙盘里亲手把飞船从超速边缘救回来：先看现象、再点装备、最后算出让考官点头的 Bilanz。记住：读图先看轴、计算必带单位、做完必用另一张图验算——这就是火星人生存法则，也是 Klausur 拿分法则。

Hook / Phaenomen (Sol-Logbuch, Episode 21 von 28): Mars-Anflug, Sol-113 Kuehlkreislauf Ueberdruck 4,1 bar. Navigatorin Lena meldet: v0 = 387 m/s, a = 4.7 m/s2, Ziel s = 1577 m, Mechaniker Tom ruft: Halte die Kurve! Der Bordcomputer geht auf Rot, das Funkgeraet rauscht, die Crew haelt den Atem an. Genau hier entscheidet Gravitation und Satellitenbahnen ueber Landung oder Absturz, ueber Festfahren oder Weiterfahrt, ueber Andocken oder Abprall. Das Logbuch des vorherigen Sols (Physik-Gravitation-Satellitenbahnen-DE-L1.md) warnte bereits vor diesem Moment, und das naechste Fenster (Physik-Impulserhaltung-Stoesse-CN-L1.md) oeffnet sich nur, wenn diese Aufgabe geloest wird. Die Sensoren streuen, die Diagramme zittern, doch die Physik bleibt unbestechlich: Wer Steigung und Flaeche, Kraft und Gegenkraft, Schwung und Stoss richtig liest, rettet die Mission. In dieser Episode stellst du im Sandbox-Labor die Brems- und Gleitzahlen so ein, dass die Kapsel sicher durchkommt. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Groessen mit exakten Einheiten, pruefe schliesslich die Bilanz mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
GRUNDBEGRIFFE (5 Begriffe):

- **Gravitationskraft**: $F = G\frac{mM}{r^2}$, anziehende Kraft zwischen Massen $m$ und $M$ im Abstand $r$.
- **Gravitationskonstante**: $G = 6{,}67 \cdot 10^{-11}\,\frac{\mathrm{Nm}^2}{\mathrm{kg}^2}$, universelle Naturkonstante.
- **Zentripetalkraft**: $F_z = \frac{mv^2}{r}$, zum Bahnzentrum gerichtete Kraft auf der Kreisbahn.
- **Bahngeschwindigkeit**: $v = \sqrt{\frac{GM}{r}}$, faellt mit wachsendem Bahnradius $r$.
- **Geostationaere Bahn**: Aequatoriale Kreisbahn mit $T = 24\,\mathrm{h}$ und $r \approx 42164\,\mathrm{km}$, der Satellit scheint stillzustehen.

Klausur-Satz: `Groessere Bahnhoehe bedeutet kleinere Geschwindigkeit und groessere Umlaufzeit.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Gravitation und Satellitenbahnen
KONZEPT (ein Konzept plus ein Textdiagramm):

Ein Satellit faellt staendig zur Erde, verfehlt sie aber wegen seiner Seitwaertsgeschwindigkeit. Mathematisch heisst das: Gravitation gleich Zentripetalkraft, also $\frac{mv^2}{r} = G\frac{mM}{r^2}$. Kuerzen von $m$ und ein $r$ liefert $v^2 = \frac{GM}{r}$. Mit $v = \frac{2\pi r}{T}$ folgt Keplers drittes Gesetz $T^2 = \frac{4\pi^2}{GM}r^3$.

```diagram
              v (tangential)
              ---->
         . - ~ - .
      .'     O     '.   O = Erdmittelpunkt
     /    r |        \  r = Bahnradius
    |       |         |
    |   Erde|Satellit |
     \      |        /
      '.    |     .'
         ' - ~ - '
      F_grav zeigt zu O, F_z = m v^2 / r
      Gleichgewicht: m v^2 / r = G m M / r^2
```

Klausur-Satz: `Aus dem Kraeftegleichgewicht folgen Bahngeschwindigkeit und Kepler-Gesetz.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Kollision der Module
Kontinuitaet: Vorher Physik-Gravitation-Satellitenbahnen-DE-L1.md | Nachher Physik-Impulserhaltung-Stoesse-CN-L1.md. Krise dieser Episode: Sol-113 Kuehlkreislauf Ueberdruck 4,1 bar. Target: v0 = 387 m/s, a = 4.7 m/s2, Ziel s = 1577 m.

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (erklaeren, AFB II): Erklaeren Sie, warum ein Satellit in $h = 400\,\mathrm{km}$ Hoehe schneller kreist als ein geostationaerer Satellit, und berechnen Sie $v$ fuer $r = 6771\,\mathrm{km}$ mit $GM = 3{,}986 \cdot 10^{14}\,\frac{\mathrm{m}^3}{\mathrm{s}^2}$.

HILFE:
1. Schritt 1: Schreibe das Kraeftegleichgewicht $\frac{mv^2}{r} = G\frac{mM}{r^2}$ hin.
2. Schritt 2: Loese nach $v = \sqrt{\frac{GM}{r}}$ auf und diskutiere die Abhaengigkeit von $r$.
3. Schritt 3: Setze $r = 6{,}771 \cdot 10^6\,\mathrm{m}$ ein und deute das Ergebnis.

MUSTERLOESUNG: Aus dem Gleichgewicht folgt $v = \sqrt{\frac{GM}{r}}$; $v$ sinkt mit $\frac{1}{\sqrt{r}}$. Mit den Zahlen gilt $v = \sqrt{\frac{3{,}986 \cdot 10^{14}}{6{,}771 \cdot 10^6}} \approx 7670\,\frac{\mathrm{m}}{\mathrm{s}}$. Der niedrige Satellit braucht nur etwa $T = \frac{2\pi r}{v} \approx 92\,\mathrm{min}$, der geostationaere dagegen $24\,\mathrm{h}$, weil sein $r$ etwa sechsmal groesser ist.

Klausur-Satz: `Kleineres r liefert groesseres v und kleineres T.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Kollision der Module
VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: Waehle zuerst das Verfahren — (i) Bahnverfahren (mit $v = \sqrt{GM/r}$ und $T^2 \sim r^3$ argumentieren) oder (ii) Fallverfahren (mit $F = mg$ nahe der Erdoberflaeche argumentieren) — dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A: Vergleichen Sie Umlaufzeiten auf $r_1 = 7000\,\mathrm{km}$ und $r_2 = 42000\,\mathrm{km}$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B: Schaetzen Sie die Gewichtskraft eines $80\,\mathrm{kg}$-Astronauten an der Erdoberflaeche.

HILFE: A nennt zwei Bahnen, also Verfahren (i). B nennt Oberflaeche ohne Bahn, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Nach $T^2 \sim r^3$ gilt $\frac{T_2}{T_1} = (\frac{42000}{7000})^{1{,}5} = 6^{1{,}5} \approx 14{,}7$. B erfordert Verfahren (ii): $F = mg \approx 80 \cdot 9{,}81 = 785\,\mathrm{N}$.

Klausur-Satz: `Bahnen vergleichen heisst Kepler, Oberflaeche schaetzen heisst mg.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Gravitation und Satellitenbahnen: Kollision der Module
CHECK (Selbsttest, 3 Fragen):

FRAGE: Wie lautet das Gravitationsgesetz? | ANTWORT: $F = G\frac{mM}{r^2}$ mit Abstand $r$ vom Massenzentrum.
FRAGE: Wie lautet die Kreisbahngeschwindigkeit? | ANTWORT: $v = \sqrt{\frac{GM}{r}}$, hergeleitet aus $\frac{mv^2}{r} = G\frac{mM}{r^2}$.
FRAGE: Was kennzeichnet die geostationaere Bahn? | ANTWORT: $T = 24\,\mathrm{h}$, Aequatorebene, $r \approx 42164\,\mathrm{km}$, feste Position ueber dem Boden.

Klausur-Satz: `Gleichgewicht der Kraefte erklaert jede Kreisbahn.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: Im Weltraum gebe es keine Gravitation, Satelliten floegen kraeftefrei geradeaus.
   Korrektur: Die Gravitation liefert gerade die Kurvenkraft; ohne sie entkaeme der Satellit tangential. Schwerelosigkeit bedeutet freier Fall, nicht Kraeftefreiheit.
   Korrektur-Satz: `Schwerelosigkeit ist staendiges Fallen um die Erde, kein Verschwinden der Gravitation.`
2. Fehlvorstellung: Hoehere Bahnen erforderten hoehere Geschwindigkeit, weil der Weg laenger sei.
   Korrektur: Es gilt $v = \sqrt{GM/r}$; weiter aussen ist die Gravitation schwaecher und verlangt weniger Zentripetalkraft.
   Korrektur-Satz: `Die Bahngeschwindigkeit faellt mit wachsendem Radius wie 1 durch Wurzel r.`

## Schritt 7 — szenario: Klausurtransfer: Gravitation und Satellitenbahnen: Kollision der Module
ROLLE: Du bist Praktikant bei einer Raumfahrtagentur.
SITUATION: Ein Kunde will einen TV-Satelliten, der immer ueber derselben Stadt steht, plant ihn aber in $h = 800\,\mathrm{km}$.
AUFGABE (begruenden, AFB III): Lege in einer zusammenhaengenden Darstellung (ca. 150 Woerter) dar, warum dieser Plan scheitert, berechne Umlaufzeit-Groessenordnung und nenne die korrekte Bahnhoehe mit Begruendung.
RUBRIC (30 XP): Kraeftegleichgewicht genannt (10 XP) | $T$-Abschaetzung mit $T^2 \sim r^3$ (10 XP) | Geostationaere Bedingung $T = 24\,\mathrm{h}$ (5 XP) | Geschlossene Darstellung (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Kollision der Module
TAKEAWAY: Merke die Kette Gleichgewicht, Kuerzen, Wurzel: $\frac{mv^2}{r} = G\frac{mM}{r^2}$ fuehrt zu $v = \sqrt{GM/r}$ und $T^2 = \frac{4\pi^2}{GM}r^3$. Niedrig heisst schnell, hoch heisst langsam.

REFLEXION:
1. Was fiel schwerer — die Herleitung mit Kuerzen (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Plane: Beim naechsten Mal schreibe ich zuerst beide Kraefte mit Richtungspfeil, dann erst die Gleichung.

Anekdote (DE): Als Newton 1687 seine Principia veroeffentlichte, rechnete er die Mondbahn mit $F \sim \frac{1}{r^2}$ nach und traf die Umlaufzeit bis auf wenige Prozent. Sein Zeitgenosse Halley nutzte dieselbe Formel und sagte die Wiederkehr seines Kometen fuer 1758 voraus — ein Triumph der Himmelsmechanik.

Bezug: `Newtons 1-durch-r-Quadrat erklaert Mond, Sputnik und TV-Satellit zugleich.`

`Klausur-Satz: Siehe Schritt-Inhalt.`
