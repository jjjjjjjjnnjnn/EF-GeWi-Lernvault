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

<!-- Lesson v3: Schritt 1-8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser skip); [Werkzeug: <id>] interaktiv; Gating: check/szenario nicht bestanden = Weiter grau; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst die Replikation als $DNA \to 2 \times DNA$ mit den Phasen Entwindung, Priming, Elongation und Korrektur beschreiben.
2. Du kannst Leitstrang mit $5' \to 3'$ und Folgestrang mit Okazaki-Fragmenten unterscheiden.
3. Du kannst das Meselson-Stahl-Experiment mit $^{15}N$ und $^{14}N$ als Beleg fuer semikonservative Replikation deuten (AFB II).

EINSTIEG: Im Jahr 1953 bestaunten Watson und Crick ihr Drahtmodell und fragten, wie sich die Leiter kopieren koennte. Fuenf Jahre spaeter zentrifugierten Meselson und Stahl markierte DNA und sahen die Antwort als Bande. Wer schwere und leichte Banden liest, versteht Vererbung.

Klausur-Satz: `Jede Tochter-DNA behaelt einen Elternstrang und erhaelt einen neuen Strang.`

## Schritt 2 — entdecken

GRUNDBEGRIFFE (5 Begriffe):

- **Replikationsgabel**: Y-foermige Oeffnung mit $Helikase + Topoisomerase$, Entwindung in $5' \to 3'$-Richtung der Synthese.
- **DNA-Polymerase**: Enzym fuer $dNTP \to DNA + PP_i$, baut nur $5' \to 3'$ und braucht ein $3'$-OH.
- **Primer**: Kurzes RNA-Stueck $5'-ACGU-3'$, Startpunkt der Polymerase, spaeter entfernt.
- **Okazaki-Fragment**: Kurzer Abschnitt $1000$-$2000$ Nukleotide auf dem Folgestrang, durch $Ligase$ verknuepft.
- **Semikonservativ**: Modell $1\,alt + 1\,neu$ pro Doppelhelix, Gegenmodelle konservativ und dispersiv.

Klausur-Satz: `Die Polymerase kennt nur eine Richtung, daher arbeitet ein Strang stueckweise.`

## Schritt 3 — entdecken

KONZEPT (ein Konzept plus ein Textdiagramm):

Die Helikase oeffnet $A=T$ und $G \equiv C$, die Primase legt Primer, die Polymerase verlaengert $5' \to 3'$. Am Leitstrang laeuft sie durch, am Folgestrang baut sie rueckwaerts Fragmente, die Ligase mit $ATP \to AMP + PP_i$ verbindet. Meselson und Stahl zuechteten $^{15}N$-DNA, wechselten auf $^{14}N$ und fanden nach einer Teilung nur Hybridbanden $^{15}N$/$^{14}N$ — das schliesst konservativ aus; nach zwei Teilungen halb Hybrid, halb leicht — das schliesst dispersiv aus.

```diagram
    Eltern:  15N-15N (schwer, unten)
    nach 1x: 15N-14N + 15N-14N (hybrid, Mitte)
    nach 2x: 2x hybrid + 2x 14N-14N (Mitte + oben)
    Leitstrang:  ----5'->3'----  kontinuierlich
    Folgestrang: <-3' 5'--  Fragmente + Ligase
    A=T (2 H-Bindungen), G=C (3 H-Bindungen)
```

Klausur-Satz: `Bandemuster beweisen den Mechanismus ohne ein Enzym zu sehen.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (erklaeren, AFB II): Erklaeren Sie, warum nach einer Replikationsrunde im $^{14}N$-Medium nur eine Hybridbande auftritt, und sagen Sie das Muster nach zwei Runden voraus.

HILFE:
1. Schritt 1: Starte mit $2 \times (^{15}N$-$^{15}N)$.
2. Schritt 2: Trenne Straenge und ergaenze jeweils $^{14}N$ nach $1\,alt + 1\,neu$.
3. Schritt 3: Wiederhole die Teilung und zaehle $hybrid$ gegen $leicht$.

MUSTERLOESUNG: Nach Trennung traegt jeder $^{15}N$-Elternstrang einen neuen $^{14}N$-Strang, also $2 \times (^{15}N$-$^{14}N)$ als eine mittlere Bande. Nach zweiter Runde liefern die zwei $^{15}N$-Straenge wieder Hybrid und die zwei $^{14}N$-Straenge je $^{14}N$-$^{14}N$, also $50\,\%$ hybrid und $50\,\%$ leicht. Konservativ haette $50\,\%$ schwer plus $50\,\%$ leicht nach Runde eins verlangt und ist widerlegt.

Klausur-Satz: `Eine Bande nach eins, zwei Banden nach zwei beweist semikonservativ.`

## Schritt 5 — ausprobieren

VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: Waehle zuerst das Verfahren — (i) Strangverfahren (Leit- gegen Folgestrang mit Richtung und Enzymen vergleichen) oder (ii) Modellverfahren (konservativ, semikonservativ, dispersiv an Banden unterscheiden) — dann loesen.

AUFGABE A: Erklaeren Sie die Rolle von Primer und Ligase am Folgestrang.
AUFGABE B: Welche Banden widerlegen das dispersive Modell nach zwei Runden?

HILFE: A nennt Enzyme und Richtung, also Verfahren (i). B nennt Modelle und Banden, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Primer liefert $3'$-OH fuer $5' \to 3'$, Ligase schliesst $Okazaki$-Luecken. B erfordert Verfahren (ii): Dispersiv sagte nur Hybrid in jeder Runde voraus; beobachtet werden aber Hybrid plus leicht im Verhaeltnis $1:1$, also widerlegt.

Klausur-Satz: `Enzyme erklaeren den Strang, Banden entscheiden das Modell.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen):

FRAGE: Was bedeutet semikonservativ als Formel? | ANTWORT: $Tochter = 1 \times alt + 1 \times neu$ pro Doppelhelix.
FRAGE: Warum braucht die Polymerase einen Primer? | ANTWORT: Sie braucht ein freies $3'$-OH und synthetisiert nur $5' \to 3'$.
FRAGE: Was zeigte Runde eins bei Meselson-Stahl? | ANTWORT: Nur $^{15}N$-$^{14}N$ hybrid, also kein $^{15}N$-$^{15}N$ und kein $^{14}N$-$^{14}N$.

Klausur-Satz: `Richtung plus Bande ergeben den vollen Beweis.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: Beide Tochterstraenge seien komplett neu, die Eltern-DNA werde vernichtet.
   Korrektur: Jeder Elternstrang bleibt als Matrize erhalten; es gilt $alt + neu$, nicht $neu + neu$.
   Korrektur-Satz: `Die Elterninformation bleibt zur Haelfte in jeder Tochter erhalten.`
2. Fehlvorstellung: Beide Straenge wuerden kontinuierlich in Gabelrichtung synthetisiert.
   Korrektur: Antiparallelitaet erzwingt $5' \to 3'$; der Folgestrang entsteht aus $Okazaki$-Fragmenten rueckwaerts.
   Korrektur-Satz: `Antiparallel plus Einbahn-Enzym erzwingt einen diskontinuierlichen Strang.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor im Biokurs.
SITUATION: Ein Mitschueler behauptet, Meselson-Stahl habe konservative Replikation bewiesen, weil nach Runde zwei leichte DNA auftrete.
AUFGABE (vergleichen, AFB III): Widerlegen Sie die Deutung in einer zusammenhaengenden Darstellung (ca. 150 Woerter) mit Bandenprognose aller drei Modelle und Enzymbegruendung.
RUBRIC (30 XP): Banden Runde eins und zwei korrekt (10 XP) | Alle drei Modelle verglichen (10 XP) | Leit- und Folgestrang mit $5' \to 3'$ genannt (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY: Merke Oeffnen, Starten, Bauen, Verbinden: $Helikase + Primase + Polymerase + Ligase$ erzeugen $2 \times (alt + neu)$. Bandenregel: $1 \times hybrid$ nach eins, $hybrid + leicht$ nach zwei.

REFLEXION:
1. Was fiel schwerer — die Strangrichtungen (Schritt 4) oder der Modellvergleich (Schritt 5)?
2. Plane: Beim naechsten Mal zeichne ich zuerst beide $5'$- und $3'$-Enden, dann erst die Enzyme.

Anekdote (DE): Als Meselson und Stahl 1958 ihre Zentrifuge stoppten, sahen sie nach einer Nacht $^{14}N$ nur eine einzige mittlere Bande aus $^{15}N$-$^{14}N$. Stahl soll gerufen haben, das Ergebnis sei so klar wie ein Sonnenaufgang — ein Gluecksfall, der das Lehrbuchkapitel $DNA \to 2 \times DNA$ fuer immer festlegte.

Bezug: `Eine Ultrazentrifuge entschied den Streit der drei Modelle an einem Abend.`
