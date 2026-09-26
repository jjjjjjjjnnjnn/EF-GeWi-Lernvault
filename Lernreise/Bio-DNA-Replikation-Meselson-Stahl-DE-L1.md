---
fach: Bio
thema: "DNA-Replikation und Meselson-Stahl"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, vergleichen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Genetik]
version: Lesson-v3
---

# Lernreise: DNA-Replikation und Meselson-Stahl (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst die Replikation als $DNA \to 2 \times DNA$ mit den Phasen Entwindung, Priming, Elongation und Korrektur beschreiben.
2. Du kannst Leitstrang mit $5' \to 3'$ und Folgestrang mit Okazaki-Fragmenten unterscheiden und die Stueckelung begruenden.
3. Du kannst das Meselson-Stahl-Experiment mit $^{15}N$ und $^{14}N$ als Beleg fuer semikonservative Replikation deuten (AFB II).

### Hook / Phaenomen

Als Meselson und Stahl 1958 ihre Zentrifuge stoppten, sahen sie nach einer Nacht in $^{14}N$ nur eine einzige mittlere Bande — Stahl soll gerufen haben, das Ergebnis sei so klar wie ein Sonnenaufgang. Eine Ultrazentrifuge entschied an einem Abend den Streit dreier Modelle, ohne dass jemand je ein Enzym arbeiten sah. Wie beweist ein Bandenmuster einen Mechanismus?

### Fachbegriff & Definition

Die **Replikation** ($DNA \to 2 \times DNA$) verlaeuft **semikonservativ**: Jede **Tochter-DNA behaelt einen Elternstrang und erhaelt einen neuen Strang** ($1\,alt + 1\,neu$); die Gegenmodelle heissen **konservativ** (alt bleibt beisammen) und **dispersiv** (alt zerbrueselt verteilt). Die **Replikationsgabel** oeffnet mit **Helikase und Topoisomerase** ($A{=}T$ mit $2$, $G{\equiv}C$ mit $3$ Wasserstoffbruecken), die **DNA-Polymerase** baut aus $dNTP$ nur in $5' \to 3'$ und braucht ein freies $3'$-$OH$ — daher liefert ein **Primer** ($5'$-$ACGU$-$3'$) den Start.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Oeffnen, Starten, Bauen, Verbinden**. Helikase entwindet, Primase legt Primer, Polymerase verlaengert $5' \to 3'$: Am **Leitstrang** laeuft sie kontinuierlich durch, am **Folgestrang** baut sie rueckwaerts **Okazaki-Fragmente** ($1000$–$2000$ Nukleotide), die **Ligase** mit Energie verbindet. Weil die Polymerase nur eine Richtung kennt, arbeitet ein Strang stueckweise — die Asymmetrie der Gabel erzwingt die Fragmente. Meselson und Stahl nutzten $^{15}N$ (schwer) gegen $^{14}N$ (leicht): Nach einer Teilung nur Hybrid ($^{15}N$/$^{14}N$) schliesst konservativ aus, nach zwei Teilungen halb Hybrid halb leicht schliesst dispersiv aus.

Klausur-Satz: `Jede Tochter-DNA behaelt einen Elternstrang und erhaelt einen neuen Strang.`

## Schritt 2 — entdecken
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Leitstrang durchgehend, Folgestrang stueckweise — warum baut dieselbe Polymerase zwei so verschiedene Straenge? Und warum braucht sie ueberhaupt einen Primer aus RNA, den sie spaeter wieder entfernt? Fuenf Begriffe loesen das Raetsel der Gabel.

### Fachbegriffe & Definitionen

- **Replikationsgabel:** Y-foermige Oeffnung mit Helikase und Topoisomerase; Entwindung vor der Synthese, Leserrichtung $3' \to 5'$, Baureichtung $5' \to 3'$.
- **DNA-Polymerase:** Enzym fuer $dNTP \to DNA + PP_i$; baut nur $5' \to 3'$ und braucht ein freies $3'$-$OH$ als Ansatzpunkt.
- **Primer:** Kurzes RNA-Stueck ($5'$-$ACGU$-$3'$), Startpunkt der Polymerase, wird spaeter entfernt und durch DNA ersetzt.
- **Okazaki-Fragment:** Kurzer Abschnitt von $1000$–$2000$ Nukleotiden auf dem Folgestrang, durch Ligase mit Energieaufwand verknuepft.
- **Semikonservativ:** Modell $1\,alt + 1\,neu$ pro Doppelhelix; Gegenmodelle sind konservativ (alt/alt plus neu/neu) und dispersiv (gemischt).

### Wirkungsgefuege / Modell

Die Begriffe bilden die Gabel: **Oeffnen** (Helikase), **Starten** (Primer), **Bauen** (Polymerase $5' \to 3'$), **Verbinden** (Ligase). Weil Oeffnen und Bauen entgegengesetzt laufen koennen, entsteht die Asymmetrie: Leitstrang kontinuierlich, Folgestrang in Fragmenten. Die Polymerase kennt nur eine Richtung, daher arbeitet ein Strang stueckweise — dieser Satz traegt jede Erklaerung der Stueckelung.

Klausur-Satz: `Die Polymerase kennt nur eine Richtung, daher arbeitet ein Strang stueckweise.`

## Schritt 3 — entdecken
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Zwei $^{15}N$-Helices starten in $^{14}N$-Medium: Nach einer Runde duerfte konservativ schwer plus leicht zeigen — doch es erscheint nur Hybrid. Nach zwei Runden duerfte dispersiv nur Hybrid zeigen — doch halb leicht erscheint. Zwei Bandenmuster widerlegen zwei Modelle; uebrig bleibt semikonservativ.

### Fachbegriff & Definition

Der **Bandenbeweis** lautet: Nach Trennung traegt jeder $^{15}N$-Elternstrang einen neuen $^{14}N$-Strang, also $2 \times (^{15}N$-$^{14}N)$ als eine mittlere Bande — konservativ haette $50\,\%$ schwer plus $50\,\%$ leicht verlangt und ist widerlegt. Nach zweiter Runde liefern die zwei $^{15}N$-Straenge wieder Hybrid und die zwei $^{14}N$-Straenge je $^{14}N$-$^{14}N$, also $50\,\%$ hybrid und $50\,\%$ leicht — dispersiv waere bei Hybrid geblieben und ist widerlegt. Bandenmuster beweisen den Mechanismus, ohne ein Enzym zu sehen.

### Wirkungsgefuege / Modell

Denke in Kausalkette: **Markieren, Teilen, Zaehlen**. Erstens Eltern mit $^{15}N$ markieren (schwer, unten). Zweitens in $^{14}N$ teilen und Straenge ergaenzen ($1\,alt + 1\,neu$). Drittens Banden zaehlen: eine Bande nach eins, zwei Banden nach zwei beweist semikonservativ. Die Basenpaarung sichert die Treue: $A{=}T$ mit zwei, $G{\equiv}C$ mit drei Wasserstoffbruecken — komplementaer paaren heisst fehlerarm kopieren.

```diagram
    Eltern:  15N-15N (schwer, unten)
    nach 1x: 15N-14N + 15N-14N (hybrid, Mitte)
             -> konservativ widerlegt (haette schwer + leicht verlangt)
    nach 2x: 2x hybrid + 2x 14N-14N (Mitte + oben)
             -> dispersiv widerlegt (waere bei hybrid geblieben)
    Leitstrang:  ----5'->3'----  kontinuierlich
    Folgestrang: <-3' 5'--  Fragmente (1000-2000) + Ligase
    A=T (2 H-Bindungen), G=C (3 H-Bindungen)
```

Klausur-Satz: `Bandemuster beweisen den Mechanismus ohne ein Enzym zu sehen.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Als Meselson und Stahl 1958 ihre Zentrifuge stoppten, sahen sie nach einer Nacht in $^{14}N$ nur eine einzige mittlere Bande aus $^{15}N$-$^{14}N$. Stahl soll gerufen haben, das Ergebnis sei so klar wie ein Sonnenaufgang — ein Gluecksfall, der das Lehrbuchkapitel $DNA \to 2 \times DNA$ fuer immer festlegte.

**Bezug zum Konzept**: `Eine Ultrazentrifuge entschied den Streit der drei Modelle an einem Abend.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (erklaeren, AFB II): Erklaeren Sie, warum nach einer Replikationsrunde im $^{14}N$-Medium nur eine Hybridbande auftritt, und sagen Sie das Muster nach zwei Runden voraus.

HILFE:
1. Schritt 1: Starte mit $2 \times (^{15}N$-$^{15}N)$.
2. Schritt 2: Trenne Straenge und ergaenze jeweils $^{14}N$ nach $1\,alt + 1\,neu$.
3. Schritt 3: Wiederhole die Teilung und zaehle $hybrid$ gegen $leicht$.

MUSTERLOESUNG: Nach Trennung traegt jeder $^{15}N$-Elternstrang einen neuen $^{14}N$-Strang, also $2 \times (^{15}N$-$^{14}N)$ als eine mittlere Bande. Nach zweiter Runde liefern die zwei $^{15}N$-Straenge wieder Hybrid und die zwei $^{14}N$-Straenge je $^{14}N$-$^{14}N$, also $50\,\%$ hybrid und $50\,\%$ leicht. Konservativ haette $50\,\%$ schwer plus $50\,\%$ leicht nach Runde eins verlangt und ist widerlegt.

Klausur-Satz: `Eine Bande nach eins, zwei Banden nach zwei beweist semikonservativ.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Waehle zuerst das Verfahren — (i) Strangverfahren (Leit- gegen Folgestrang mit Richtung und Enzymen vergleichen) oder (ii) Modellverfahren (konservativ, semikonservativ, dispersiv an Banden unterscheiden) — dann loesen.

AUFGABE A: Erklaeren Sie die Rolle von Primer und Ligase am Folgestrang.
AUFGABE B: Welche Banden widerlegen das dispersive Modell nach zwei Runden?

HILFE: A nennt Enzyme und Richtung, also Verfahren (i). B nennt Modelle und Banden, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Primer liefert $3'$-OH fuer $5' \to 3'$, Ligase schliesst $Okazaki$-Luecken. B erfordert Verfahren (ii): Dispersiv sagte nur Hybrid in jeder Runde voraus; beobachtet werden aber Hybrid plus leicht im Verhaeltnis $1:1$, also widerlegt.

Klausur-Satz: `Enzyme erklaeren den Strang, Banden entscheiden das Modell.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Was bedeutet semikonservativ als Formel? | ANTWORT: $Tochter = 1 \times alt + 1 \times neu$ pro Doppelhelix.
FRAGE: Warum braucht die Polymerase einen Primer? | ANTWORT: Sie braucht ein freies $3'$-OH und synthetisiert nur $5' \to 3'$.
FRAGE: Was zeigte Runde eins bei Meselson-Stahl? | ANTWORT: Nur $^{15}N$-$^{14}N$ hybrid, also kein $^{15}N$-$^{15}N$ und kein $^{14}N$-$^{14}N$.

Klausur-Satz: `Richtung plus Bande ergeben den vollen Beweis.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlannahme: Beide Tochterstraenge seien vollstaendig neu, die Eltern-DNA werde vernichtet.
   Korrektur: Jeder Elternstrang bleibt als Matrize erhalten; es gilt $alt + neu$, nicht $neu + neu$.
   Korrektur-Satz: `Die Elterninformation bleibt zur Haelfte in jeder Tochter erhalten.`
2. Fehlannahme: Beide Straenge wuerden kontinuierlich in Gabelrichtung synthetisiert.
   Korrektur: Antiparallelitaet erzwingt $5' \to 3'$; der Folgestrang entsteht aus $Okazaki$-Fragmenten rueckwaerts.
   Korrektur-Satz: `Antiparallel plus Einbahn-Enzym erzwingt einen diskontinuierlichen Strang.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor im Biokurs.
SITUATION: Ein Mitschueler behauptet, Meselson-Stahl habe konservative Replikation bewiesen, weil nach Runde zwei leichte DNA auftrete.
AUFGABE (vergleichen, AFB III): Widerlegen Sie die Deutung in einer zusammenhaengenden Darstellung (ca. 150 Woerter) mit Bandenprognose aller drei Modelle und Enzymbegruendung.
RUBRIC (30 XP): Banden Runde eins und zwei korrekt (10 XP) | Alle drei Modelle verglichen (10 XP) | Leit- und Folgestrang mit $5' \to 3'$ genannt (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Merke Oeffnen, Starten, Bauen, Verbinden: $Helikase + Primase + Polymerase + Ligase$ erzeugen $2 \times (alt + neu)$. Bandenregel: $1 \times hybrid$ nach eins, $hybrid + leicht$ nach zwei.
Takeaway-Satz: `Oeffnen, Starten, Bauen und Verbinden erzeugen zwei Tochterhelices aus je einem alten und einem neuen Strang.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer — die Strangrichtungen (Schritt 4) oder der Modellvergleich (Schritt 5)?
2. Beim naechsten Mal zeichne ich zuerst beide $5'$- und $3'$-Enden, dann erst die Enzyme.
