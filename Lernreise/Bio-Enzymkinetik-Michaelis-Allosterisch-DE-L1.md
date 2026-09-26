---
fach: Bio
thema: "Enzymkinetik nach Michaelis sowie allosterische Regulation"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, deuten]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Stoffwechsel]
version: Lesson-v3
---

# Lernreise: Enzymkinetik nach Michaelis sowie allosterische Regulation (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst die Michaelis-Menten-Kurve $v = v_{max} \cdot [S]/(K_m + [S])$ lesen und $K_m$ sowie $v_{max}$ aus Messwerten bestimmen.
2. Du kannst kompetitive und nicht-kompetitive Hemmung anhand der Kurvenveraenderung unterscheiden und die Ueberwindbarkeit begruenden.
3. Du kannst allosterische Regulation mit Effektor und Konformationsaenderung erklaeren (AFB II).

### Hook / Phaenomen

Michaelis und Menten rekonstruierten 1913 aus wenigen Messpunkten zwei Konstanten — und gruendeten damit die quantitative Biochemie. Ihre Kurve steigt erst steil, dann immer flacher, und erreicht nie ganz das Plateau. Warum saettigt sich ein Enzym wie ein Schwamm — und warum hilft bei einer Hemmung manchmal mehr Substrat, bei der anderen nie?

### Fachbegriff & Definition

Die **Michaelis-Menten-Gleichung** $v = v_{max} \cdot \frac{[S]}{K_m + [S]}$ beschreibt die **Saettigungskinetik**: Bei wenig Substrat steigt $v$ fast linear, bei viel naehert sich $v$ asymptotisch **$v_{max}$** — alle aktiven Zentren sind besetzt. Die **Michaelis-Konstante $K_m$** ist die **Substratkonzentration bei halber Maximalgeschwindigkeit** ($[S] = K_m$ zu $v = v_{max}/2$); kleines $K_m$ bedeutet hohe **Affinitaet**. **Allosterische Enzyme** besitzen zusaetzlich ein **Regulatorzentrum**: Ein **Effektor** bindet dort und veraendert per **Konformationsaenderung** die Gestalt — Aktivatoren stabilisieren die aktive Form, Inhibitoren die inaktive.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Besetzen, Saettigen, Regeln**. Mehr $[S]$ besetzt mehr Zentren — $v$ steigt. Alle Zentren besetzt — $v$ plaettiert bei $v_{max}$. **Kompetitive Hemmung** konkurriert um das aktive Zentrum: $v_{max}$ bleibt, $K_m$ steigt (Kurve nach rechts) — Substratueberschuss verdraengt den Hemmer. **Nicht-kompetitive Hemmung** bindet ausserhalb: $v_{max}$ sinkt, $K_m$ bleibt (Plateau tiefer) — kein Ueberschuss hilft. **Allosterie** steuert ohne Neubau: Der Effektor schaltet die Gestalt um und damit ganze Stoffwechselwege.

Klausur-Satz: `Die Michaelis-Konstante K_m gibt die Substratkonzentration bei halber Maximalgeschwindigkeit an.`

## Schritt 2 — entdecken
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Ein Enzym mit $v_{max} = 80\,\mathrm{\mu mol/min}$ und $K_m = 2{,}0\,\mathrm{mmol/L}$: Bei $[S] = 2{,}0$ liefert es $40$, bei $[S] = 20$ fast $73$ — warum nicht $80$? Und woran erkennt man im Diagramm, ob ein Hemmer verdraengbar ist? Fuenf Begriffe lesen jede Kinetikkurve.

### Fachbegriffe & Definitionen

- **$v_{max}$:** Maximale Reaktionsgeschwindigkeit bei Substratsaettigung — das Plateau, das $v$ asymptotisch erreicht, etwa $80\,\mathrm{\mu mol/min}$.
- **$K_m$:** Substratkonzentration bei $v = v_{max}/2$; Mass fuer die Affinitaet — kleines $K_m$ heisst hohe Affinitaet, etwa $2{,}0\,\mathrm{mmol/L}$.
- **Kompetitive Hemmung:** Hemmstoff konkurriert um das aktive Zentrum; $v_{max}$ bleibt, $K_m$ steigt — durch Substratueberschuss ueberwindbar.
- **Nicht-kompetitive Hemmung:** Hemmstoff bindet ausserhalb des Zentrums; $v_{max}$ sinkt, $K_m$ bleibt — kein Ueberschuss hilft.
- **Allosterisch:** Effektor bindet am allosterischen Zentrum und veraendert die Enzymgestalt per Konformationsaenderung — Schalter ohne Neubau.

### Wirkungsgefuege / Modell

Die Begriffe bilden das Leseverfahren: **Lage von $K_m$** auf der $[S]$-Achse verraet die Affinitaet, **Hoehe des Plateaus** verraet $v_{max}$. Rechtsverschiebung heisst kompetitiv (verdreangbar), Tiefersetzung heisst nicht-kompetitiv (nicht verdraengbar). Allosterische Regulatoren verschieben das Gleichgewicht zwischen aktiver und inaktiver Form — so steuert die Zelle Stoffwechselwege, ohne neue Enzyme zu bauen. Zwei Konstanten ersetzen eine ganze Messreihe — genau darin liegt der Klausurwert der Kinetik.

Klausur-Satz: `Kompetitive Hemmung laesst sich durch Substratueberschuss ueberwinden, nicht-kompetitive nicht.`

## Schritt 3 — entdecken
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Bei $[S] = K_m$ exakt halbes Tempo, bei zehnfachem $K_m$ fast volles Tempo — die Kurve gehorcht einer einzigen Formel. Rechenprobe: $v = 80 \cdot 20/(2 + 20) = 72{,}7\,\mathrm{\mu mol/min}$. Warum naehert sich $v$ dem Plateau nur asymptotisch — und welche Kurvenverschiebung verrät welchen Hemmtyp?

### Fachbegriff & Definition

Die **Saettigungslogik** besagt: Jedes aktive Zentrum fasst ein Substrat — bei wenig $[S]$ warten Zentren, bei viel $[S]$ warten Substrate. Daher steigt $v$ erst linear, dann immer flacher gegen $v_{max}$. **Kompetitiv** verschiebt die Kurve nach rechts ($K_m$ groesser, $v_{max}$ gleich), weil der Hemmer Plaetze blockiert, die Ueberschuss zurueckerobert. **Nicht-kompetitiv** senkt das Plateau ($v_{max}$ kleiner, $K_m$ gleich), weil blockierte Enzyme ganz ausfallen. **Allosterisch** schaltet die Gestalt: Aktivator stabilisiert $R$-Form, Inhibitor $T$-Form.

### Wirkungsgefuege / Modell

Denke in Kausalkette: **Messen, Einordnen, Schalten**. Erstens $v_{max}$ und $K_m$ aus der Kurve lesen ($v = v_{max}/2$ bei $[S] = K_m$). Zweitens Hemmtyp an der Verschiebung erkennen — rechts oder tiefer. Drittens Regulation deuten: Effektor bindet fern, Gestalt kippt, Weg wird gedrosselt oder geoeffnet. Formel plus Kurve plus Schalter — das ist die vollstaendige Kinetikantwort.

```diagram
  v ^
    |                              ...... v_max (= 80)
    |                        ......
    |                   .....
    |              .....
    |          ....
    |       ...  *
    |     ..     * bei [S] = K_m (= 2,0): v = v_max/2 (= 40)
    |   ..
    +----------------------------------> [S] (mmol/L)
    kompetitiv:       Kurve nach rechts (K_m groesser, v_max gleich)
    nicht-kompetitiv: Plateau tiefer    (v_max kleiner, K_m gleich)
    allosterisch:     R-Form <-> T-Form per Effektor (Schalter)
    Probe: [S]=20 -> v = 80*20/22 = 72,7 (nahe Plateau, nie ganz)
```

Klausur-Satz: `Die Lage von K_m auf der [S]-Achse verraet die Affinitaet, die Hoehe des Plateaus verraet v_max.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Leonor Michaelis und Maud Menten verbanden 1913 Enzym und Mathematik: Aus wenigen Messpunkten rekonstruierten sie zwei Konstanten, die bis heute jede Enzymcharakterisierung eroeffnen. Ihre Gleichung gilt als Geburtsstunde der quantitativen Biochemie.

**Bezug zum Konzept**: `Zwei Konstanten ersetzen eine ganze Messreihe — genau darin liegt der Klausurwert der Kinetik.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (deuten, AFB II): Fuer ein Enzym gilt $v_{max} = 80 \, \mathrm{\mu mol/min}$ und $K_m = 2{,}0 \, \mathrm{mmol/L}$. Bestimmen Sie $v$ bei $[S] = 2{,}0 \, \mathrm{mmol/L}$ und bei $[S] = 20 \, \mathrm{mmol/L}$ und deuten Sie beide Werte.

HILFE:
1. Schritt 1: Formel $v = v_{max} [S]/(K_m + [S])$ notieren.
2. Schritt 2: Beide Werte einsetzen.
3. Schritt 3: Mit Saettigung deuten.

MUSTERLOESUNG: Bei $[S] = K_m = 2{,}0 \, \mathrm{mmol/L}$ gilt $v = 80 \cdot 2{,}0/4{,}0 = 40 \, \mathrm{\mu mol/min}$, also exakt $v_{max}/2$. Bei $[S] = 20 \, \mathrm{mmol/L}$ gilt $v = 80 \cdot 20/22 = 72{,}7 \, \mathrm{\mu mol/min}$, also nahe $v_{max}$. Der erste Wert belegt die Definition von $K_m$, der zweite die Saettigung: Fast alle aktiven Zentren sind besetzt, weiteres Substrat steigert $v$ kaum noch.

Klausur-Satz: `Bei [S] = K_m ist v halbmaximal, bei [S] weit ueber K_m naehern sich die Werte v_max asymptotisch.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Waehle erst das Verfahren — (i) Hemmungs-Verfahren (Kurvenvergleich: $K_m$ oder $v_{max}$ veraendert?) oder (ii) Regulations-Verfahren (allosterischer Effektor mit Gestaltwandel) — dann loesen.

AUFGABE A: Nach Zugabe eines Stoffes steigt $K_m$, $v_{max}$ bleibt gleich. Welcher Typ liegt vor?

AUFGABE B: ATP hemmt ein Schluesselenzym der Glykolyse durch Bindung ausserhalb des aktiven Zentrums. Welcher Typ liegt vor?

HILFE: A beschreibt Kurvenverschiebung am aktiven Zentrum, also Verfahren (i). B nennt Bindung ausserhalb mit Gestaltwandel, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Kompetitive Hemmung, da nur $K_m$ steigt und Substratueberschuss den Effekt aufhebt. B erfordert Verfahren (ii): Allosterische Inhibition, da ATP als Effektor die inaktive Konformation stabilisiert und den Stoffwechselweg drosselt.

Klausur-Satz: `Veraendertes K_m verraet Konkurrenz am aktiven Zentrum, veraenderte Gestalt verraet allosterische Regulation.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Was bedeuten $K_m$ und $v_{max}$? | ANTWORT: $K_m$ ist $[S]$ bei $v_{max}/2$ und misst die Affinitaet; $v_{max}$ ist die Saettigungsgeschwindigkeit.
FRAGE: Wie unterscheiden sich kompetitive und nicht-kompetitive Hemmung in der Kurve? | ANTWORT: Kompetitiv erhoeht $K_m$ bei gleichem $v_{max}$; nicht-kompetitiv senkt $v_{max}$ bei gleichem $K_m$.
FRAGE: Was geschieht bei allosterischer Regulation? | ANTWORT: Ein Effektor bindet am Regulatorzentrum und stabilisiert die aktive oder inaktive Konformation des Enzyms.

Klausur-Satz: `K_m steht auf der [S]-Achse, v_max auf der v-Achse — beide Achsen zusammen identifizieren jeden Hemmtyp.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlannahme: Mehr Substrat steigere $v$ unbegrenzt linear.
   Korrektur: Oberhalb der Saettigung sind alle aktiven Zentren besetzt, sodass $v$ gegen $v_{max}$ strebt und nicht weiter linear steigt.
   Korrektur-Satz: `Oberhalb der Saettigung sind alle aktiven Zentren besetzt, sodass v gegen v_max strebt und nicht weiter linear steigt.`
2. Fehlannahme: Kompetitive Hemmung zerstoere das Enzym dauerhaft.
   Korrektur: Kompetitive Hemmung ist reversibel und laesst sich durch Substratueberschuss verdraengen, da kein Enzym zerstoert wird.
   Korrektur-Satz: `Kompetitive Hemmung ist reversibel und laesst sich durch Substratueberschuss verdraengen, da kein Enzym zerstoert wird.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin im Bio-Grundkurs.
SITUATION: Eine Mitschuelerin legt zwei Messreihen vor: Reihe A erreicht dasselbe Plateau langsamer, Reihe B ein niedrigeres Plateau.
AUFGABE (AFB II/III): Erklaere in einer zusammenhaengenden Stellungnahme (ca. 150 Woerter) mit $K_m$ und $v_{max}$, welcher Hemmtyp jeweils vorliegt und wie eine allosterische Regulation davon zu unterscheiden waere.
RUBRIC (30 XP): Bestimmen von $K_m$ und $v_{max}$ (8 XP) | Zuordnung beider Hemmtypen (10 XP) | Abgrenzung zur Allosterie (6 XP) | Fachsprachliche Darstellung (6 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Kurve lesen heisst Achsen lesen: $K_m$ auf der $[S]$-Achse, $v_{max}$ auf der $v$-Achse. Gestaltwandel ausserhalb gehoert zur Allosterie.
Takeaway-Satz: `K_m misst Affinitaet, v_max misst Kapazitaet — Hemmung verschiebt die Kurve, Regulation verformt das Enzym.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer — die Rechnung zu $v$ (Schritt 4) oder die Typwahl (Schritt 5)?
2. Beim naechsten Mal markiere ich zuerst $K_m$ und $v_{max}$ in der Kurve, weil beide den Hemmtyp verraten.
