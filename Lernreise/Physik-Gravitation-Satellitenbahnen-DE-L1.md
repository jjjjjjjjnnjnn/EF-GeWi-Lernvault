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

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktive [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (diese Lektion in 15 Minuten: danach kannst du):

1. Das Gravitationsgesetz $F = G\frac{mM}{r^2}$ nennen und jede Groesse erklaeren.
2. Die Bahngeschwindigkeit $v = \sqrt{\frac{GM}{r}}$ herleiten und geostationaere von niedrigen Bahnen unterscheiden.
3. Mit $\frac{mv^2}{r} = G\frac{mM}{r^2}$ Hoehe und Umlaufzeit begruenden.

Klausur-Satz: `Die Gravitation liefert die Zentripetalkraft der Kreisbahn.`

## Schritt 2 — entdecken

PRETRAINING (Kernbegriffe, erst lesen, dann abdecken und aktiv wiedergeben):

- Gravitationskraft: $F = G\frac{mM}{r^2}$, Anziehung zwischen $m$ und $M$ im Abstand $r$.
- Gravitationskonstante: $G = 6{,}67 \cdot 10^{-11}\,\frac{\mathrm{Nm}^2}{\mathrm{kg}^2}$, universelle Naturkonstante.
- Zentripetalkraft: $F_z = \frac{mv^2}{r}$, Kraft zum Bahnzentrum auf der Kreisbahn.
- Bahngeschwindigkeit: $v = \sqrt{\frac{GM}{r}}$, sinkt mit wachsendem $r$.
- Geostationaere Bahn: Aequatorkreisbahn mit $T = 24\,\mathrm{h}$ und $r \approx 42164\,\mathrm{km}$, scheinbar fest ueber dem Boden.

Klausur-Satz: `Groessere Bahnhoehe bedeutet kleinere Geschwindigkeit und groessere Umlaufzeit.`

## Schritt 3 — entdecken

ENTDECKEN (ein Konzept plus Textdiagramm):

Ein Satellit faellt staendig zur Erde, verfehlt sie aber durch seine Seitengeschwindigkeit. Formal heisst das: Gravitation gleich Zentripetalkraft, also $\frac{mv^2}{r} = G\frac{mM}{r^2}$. Kuerzen von $m$ und ein $r$ liefert $v^2 = \frac{GM}{r}$. Mit $v = \frac{2\pi r}{T}$ folgt Keplers drittes Gesetz $T^2 = \frac{4\pi^2}{GM}r^3$.

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

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Als Newton 1687 seine Principia veroeffentlichte, rechnete er die Mondbahn mit $F \sim \frac{1}{r^2}$ nach und traf die Umlaufzeit bis auf wenige Prozent. Sein Zeitgenosse Halley nutzte dieselbe Formel und sagte die Wiederkehr seines Kometen fuer 1758 voraus — ein Triumph der Himmelsmechanik. Im Jahr 1957 piepste Sputnik ueber den Nachthimmel als erstes Zeichen des staendigen Falls um die Erde.

**Bezug zum Konzept**: `Newtons 1-durch-r-Quadrat erklaert Mond, Sputnik und TV-Satellit zugleich.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Loesungsweg):

[Werkzeug: kinematik]

AUFGABE (erklaeren, AFB II): Erklaeren Sie, warum ein Satellit in $h = 400\,\mathrm{km}$ Hoehe schneller kreist als ein geostationaerer Satellit, und berechnen Sie $v$ fuer $r = 6771\,\mathrm{km}$ mit $GM = 3{,}986 \cdot 10^{14}\,\frac{\mathrm{m}^3}{\mathrm{s}^2}$.

HILFE:
1. Gleichgewicht $\frac{mv^2}{r} = G\frac{mM}{r^2}$ notieren.
2. Nach $v = \sqrt{\frac{GM}{r}}$ aufloesen und $r$-Abhaengigkeit deuten.
3. Wert $r = 6{,}771 \cdot 10^6\,\mathrm{m}$ einsetzen und deuten.

MUSTERLOESUNG: Aus dem Gleichgewicht folgt $v = \sqrt{\frac{GM}{r}}$; $v$ sinkt mit $\frac{1}{\sqrt{r}}$. Mit Zahlen gilt $v = \sqrt{\frac{3{,}986 \cdot 10^{14}}{6{,}771 \cdot 10^6}} \approx 7670\,\frac{\mathrm{m}}{\mathrm{s}}$. Der niedrige Satellit braucht nur etwa $T = \frac{2\pi r}{v} \approx 92\,\mathrm{min}$, der geostationaere dagegen $24\,\mathrm{h}$, weil sein $r$ etwa sechsmal groesser ist.

Klausur-Satz: `Kleineres r liefert groesseres v und kleineres T.`

## Schritt 5 — ausprobieren

VERGLEICH (zwei Verfahren unterscheiden):

VERGLEICH: Waehle zuerst das Verfahren — (i) Bahnverfahren (mit $v = \sqrt{GM/r}$ und $T^2 \sim r^3$ argumentieren) oder (ii) Fallverfahren (mit $F = mg$ nahe der Erdoberflaeche argumentieren) — dann loesen.

AUFGABE A: Vergleichen Sie Umlaufzeiten auf $r_1 = 7000\,\mathrm{km}$ und $r_2 = 42000\,\mathrm{km}$.

AUFGABE B: Schaetzen Sie die Gewichtskraft eines $80\,\mathrm{kg}$-Astronauten an der Erdoberflaeche.

HILFE: A nennt zwei Bahnen, also Verfahren (i). B nennt Oberflaeche ohne Bahn, also Verfahren (ii). Faustregel: Bahnvergleich verlangt Kepler, Oberflaeche verlangt $mg$.

ANTWORT: A erfordert Verfahren (i): Nach $T^2 \sim r^3$ gilt $\frac{T_2}{T_1} = (\frac{42000}{7000})^{1{,}5} = 6^{1{,}5} \approx 14{,}7$. B erfordert Verfahren (ii): $F = mg \approx 80 \cdot 9{,}81 = 785\,\mathrm{N}$.

Klausur-Satz: `Bahnen vergleichen heisst Kepler, Oberflaeche schaetzen heisst mg.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen mit Antworten):

FRAGE: Wie lautet das Gravitationsgesetz? | ANTWORT: $F = G\frac{mM}{r^2}$ mit Abstand $r$ vom Massenzentrum.
FRAGE: Wie lautet die Kreisbahngeschwindigkeit? | ANTWORT: $v = \sqrt{\frac{GM}{r}}$, aus $\frac{mv^2}{r} = G\frac{mM}{r^2}$.
FRAGE: Was kennzeichnet die geostationaere Bahn? | ANTWORT: $T = 24\,\mathrm{h}$, Aequatorebene, $r \approx 42164\,\mathrm{km}$, fest ueber dem Boden.

Klausur-Satz: `Gleichgewicht der Kraefte erklaert jede Kreisbahn.`

## Fehlvorstellung

(kein Schritt; wird vom Parser automatisch erkannt und nicht mitgezaehlt)

1. Fehlannahme: Im Weltraum gebe es keine Gravitation, Satelliten floegen kraeftefrei geradeaus.
   Korrektur: Gravitation liefert gerade die Kurvenkraft; ohne sie entkaeme der Satellit tangential. Schwerelosigkeit bedeutet freier Fall, nicht Kraeftefreiheit.
   Korrektur-Satz: `Schwerelosigkeit ist staendiges Fallen um die Erde, kein Verschwinden der Gravitation.`
2. Fehlannahme: Hoehere Bahnen verlangten hoehere Geschwindigkeit wegen laengerem Weg.
   Korrektur: Es gilt $v = \sqrt{GM/r}$; weiter aussen ist die Gravitation schwaecher und verlangt weniger Zentripetalkraft.
   Korrektur-Satz: `Die Bahngeschwindigkeit faellt mit wachsendem Radius wie 1 durch Wurzel r.`

## Schritt 7 — szenario

ROLLE: Du bist Praktikant bei einer Raumfahrtagentur.
SITUATION: Ein Kunde will einen TV-Satelliten, der stets ueber derselben Stadt steht, plant ihn aber in $h = 800\,\mathrm{km}$. Lege in zusammenhaengender Darstellung (ca. 150 Woerter) dar, warum der Plan scheitert, schaetze die Umlaufzeit ab und nenne die korrekte Hoehe mit Begruendung.
RUBRIC (30 XP): Kraeftegleichgewicht genannt (10 XP) | $T$-Abschaetzung mit $T^2 \sim r^3$ (10 XP) | Geostationaere Bedingung $T = 24\,\mathrm{h}$ (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernzusammenfassung):

Merke die Kette Gleichgewicht, Kuerzen, Wurzel: $\frac{mv^2}{r} = G\frac{mM}{r^2}$ fuehrt zu $v = \sqrt{GM/r}$ und $T^2 = \frac{4\pi^2}{GM}r^3$. Niedrig heisst schnell, hoch heisst langsam.
Takeaway-Satz: `Gleichgewicht kuertzt Masse und liefert Wurzelgesetz: v faellt mit Wurzel r, T waechst mit r hoch drei Halbe.`

REFLEXION (2 Fragen):
1. Selbstbeobachtung: Welcher Schritt fiel schwerer — die Herleitung mit Kuerzen (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Planung: Beim naechsten Mal schreibe ich zuerst beide Kraefte mit Richtungspfeil, dann erst die Gleichung.
