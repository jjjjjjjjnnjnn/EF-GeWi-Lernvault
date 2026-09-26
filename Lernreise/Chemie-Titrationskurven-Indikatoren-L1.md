---
fach: Chemie
thema: "Titrationskurven und Indikatoren"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Titration]
version: Lesson-v3
---

# Lernreise: Titrationskurven und Indikatoren (L1, Ziel Klausur)

<!-- Lesson v3: Schritt 1-8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser skip); [Werkzeug: <id>] interaktiv; Gating: check/szenario nicht bestanden = Weiter grau; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst die Titrationskurve $pH = f(V)$ einer starken Saeure mit starker Base in drei Abschnitten beschreiben.
2. Du kannst den Aequivalenzpunkt mit $n(H^+) = n(OH^-)$ berechnen und vom Neutralpunkt $pH = 7$ abgrenzen.
3. Du kannst einen Indikator mit $pK_{In}$ passend zum Sprungbereich auswaehlen und begruenden (AFB II).

EINSTIEG: Im Jahr 1867 vergiftete eine falsch etikettierte Lauge in einer Fabrik beinahe eine ganze Schicht, weil niemand die Konzentration pruefte. Titration rettet hier Leben: Tropfen fuer Tropfen verraten $pH$-Sprung und Gehalt. Wer den Umschlag trifft, kennt die Wahrheit in der Flasche.

Klausur-Satz: `Der pH-Sprung markiert den Aequivalenzpunkt, der Indikator macht ihn sichtbar.`

## Schritt 2 — entdecken

GRUNDBEGRIFFE (5 Begriffe):

- **Titration**: Massanalyse mit $c = \frac{n}{V}$, bei der Massloesung bis zum Umschlag zugegeben wird.
- **Aequivalenzpunkt**: Punkt mit $n(H^+) = n(OH^-)$, Stoffmengen gleich, $pH$ haengt vom Salztyp ab.
- **Neutralpunkt**: $pH = 7$ bei $25^\circ\mathrm{C}$ aus $K_w = 10^{-14}$, nur bei stark/stark gleich dem Aequivalenzpunkt.
- **Indikator**: Farbstoffpaar $HIn \rightleftharpoons H^+ + In^-$ mit Umschlag bei $pH \approx pK_{In} \pm 1$.
- **Pufferbereich**: Flacher Kurventeil mit $pH = pK_a + \log\frac{[A^-]}{[HA]}$ nach Henderson-Hasselbalch.

Klausur-Satz: `Der Indikator muss im Steilbereich der Kurve umschlagen.`

## Schritt 3 — entdecken

KONZEPT (ein Konzept plus ein Textdiagramm):

Bei stark/stark startet die Kurve tief, steigt flach, springt am Aequivalenzpunkt von etwa $pH = 4$ auf $pH = 10$ und flacht wieder ab. Der Sprung kommt daher, dass nahe $n(H^+) = n(OH^-)$ ein Tropfen das Verhaeltnis $\frac{[H^+]}{[OH^-]}$ um Groessenordnungen dreht. Bei schwach/stark liegt der Aequivalenzpunkt mit $pH > 7$, weil $CH_3COO^- + H_2O \rightleftharpoons CH_3COOH + OH^-$ basisch hydrolysiert.

```diagram
    pH
    12|                 ....------
    10|               ..
     8|              . Sprung
     6|              .
     4|  Start .....
     2|..
      +-------------------------------- V(Base)
       Start  Puffer  Aequivalenz  Ueberschuss
       stark/stark: Sprung ca. 4 -> 10
       schwach/stark: Aequivalenz bei pH > 7
```

Klausur-Satz: `Steil heisst empfindlich: Ein Tropfen aendert den pH um mehrere Einheiten.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (erklaeren, AFB II): $20{,}0\,\mathrm{mL}$ Salzsäure mit $c = 0{,}1\,\frac{\mathrm{mol}}{\mathrm{L}}$ werden mit Natronlauge $c = 0{,}1\,\frac{\mathrm{mol}}{\mathrm{L}}$ titriert. Berechnen Sie das Volumen am Aequivalenzpunkt und nennen Sie einen passenden Indikator.

HILFE:
1. Schritt 1: Nutze $n(H^+) = n(OH^-)$, also $c_aV_a = c_bV_b$.
2. Schritt 2: Loese nach $V_b = \frac{c_aV_a}{c_b}$ auf.
3. Schritt 3: Waehle einen Indikator mit $pK_{In}$ nahe 7, etwa Bromthymolblau oder Phenolphthalein im Sprungbereich.

MUSTERLOESUNG: Es gilt $V_b = \frac{0{,}1 \cdot 20{,}0}{0{,}1} = 20{,}0\,\mathrm{mL}$. Der Aequivalenzpunkt liegt bei $pH = 7$, der Sprung reicht etwa von $pH = 4$ bis $pH = 10$. Bromthymolblau mit $pK_{In} \approx 7{,}1$ schlaegt im Sprung um und ist geeignet; Methylorange mit $pK_{In} \approx 3{,}7$ laege am Rand und waere unsicherer.

Klausur-Satz: `Gleiche Konzentration heisst gleiches Volumen bis zum Aequivalenzpunkt.`

## Schritt 5 — ausprobieren

VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: Waehle zuerst das Verfahren — (i) stark/stark-Verfahren (Aequivalenz bei $pH = 7$, grosser Sprung) oder (ii) schwach/stark-Verfahren (Aequivalenz bei $pH \ne 7$, Hydrolyse beachten) — dann loesen.

AUFGABE A: Ordnen Sie Phenolphthalein ($pK_{In} \approx 9$) der Titration $HCl$ gegen $NaOH$ zu.
AUFGABE B: Ordnen Sie einen Indikator der Titration $CH_3COOH$ gegen $NaOH$ zu.

HILFE: A ist stark/stark mit Sprung $4$ bis $10$, also Verfahren (i). B ist schwach/stark mit $pH > 7$, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Phenolphthalein schlaegt im oberen Sprungteil um und ist geeignet. B erfordert Verfahren (ii): Der Aequivalenzpunkt liegt basisch bei etwa $pH = 8{,}7$, daher ist Phenolphthalein geeignet, Methylorange dagegen falsch.

Klausur-Satz: `Salztyp bestimmt die Lage des Aequivalenzpunkts und damit die Indikatorwahl.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen):

FRAGE: Was gilt am Aequivalenzpunkt? | ANTWORT: $n(H^+) = n(OH^-)$; der $pH$ folgt aus dem Salztyp.
FRAGE: Warum springt die Kurve? | ANTWORT: Nahe dem Umsatzpunkt aendert ein Tropfen $\frac{[H^+]}{[OH^-]}$ um Groessenordnungen, also springt $pH = -\log[H^+]$.
FRAGE: Wie waehlt man den Indikator? | ANTWORT: Es muss $pK_{In}$ im Sprungbereich liegen, also $pH \approx pK_{In} \pm 1$ im Steilteil.

Klausur-Satz: `Ohne Sprungtreffer kein verlaesslicher Farbumschlag.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: Aequivalenzpunkt und Neutralpunkt seien immer identisch.
   Korrektur: Nur stark/stark trifft $pH = 7$; bei schwachen Partnern hydrolysiert das Salz sauer oder basisch.
   Korrektur-Satz: `Der Aequivalenzpunkt liegt nur bei stark/stark exakt bei pH 7.`
2. Fehlvorstellung: Jeder Indikator passe zu jeder Titration, Farbe sei Geschmackssache.
   Korrektur: Nur ein Umschlag im Steilbereich ist scharf; daneben schleppt die Farbe und der Fehler waechst auf Milliliter.
   Korrektur-Satz: `Der Indikator muss zum Sprungbereich gehoeren, nicht zur Lieblingsfarbe.`

## Schritt 7 — szenario

ROLLE: Du bist Laborant in der Qualitaetskontrolle.
SITUATION: Eine Essigprobe soll auf $c(CH_3COOH)$ geprueft werden; ein Kollege will Methylorange verwenden.
AUFGABE (beurteilen, AFB III): Beurteilen Sie die Wahl in einer zusammenhaengenden Darstellung (ca. 150 Woerter), berechnen Sie die Auswertung mit $c_aV_a = c_bV_b$ im Prinzip und schlagen Sie einen korrekten Indikator mit Begruendung vor.
RUBRIC (30 XP): Einordnung schwach/stark mit $pH > 7$ (10 XP) | Ablehnung von Methylorange mit $pK_{In}$-Argument (10 XP) | Alternative Phenolphthalein plus Auswerteformel (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY: Merke Sprung, Salz, Umschlag: $n(H^+) = n(OH^-)$ markiert den Punkt, Hydrolyse legt den $pH$ fest, $pK_{In}$ im Sprung sichert die Farbe. Faustregel stark/stark grosszuegig, schwach/stark waehlerisch.

REFLEXION:
1. Was fiel schwerer — die Volumenrechnung (Schritt 4) oder die Indikatorwahl (Schritt 5)?
2. Plane: Beim naechsten Mal skizziere ich zuerst die Kurvenlage, dann waehle ich $pK_{In}$.

Anekdote (DE): Der Chemiker Robert Wilhelm Bunsen titrierte in Heidelberg so sorgfaeltig, dass seine Studenten den Umschlag auf den Tropfen genau trafen. Sein Brenner mit $CH_4 + 2O_2 \to CO_2 + 2H_2O$ lieferte die saubere Flamme dazu — Praezision in Flamme und Buerette gehoerten fuer ihn zusammen.

Bezug: `Bunsens Schule zeigt: Saubere Flamme plus scharfer Umschlag ergeben verlaessliche Werte.`
