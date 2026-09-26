---
fach: Bio
thema: "Proteinbiosynthese Transkription und Translation"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, vergleichen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Protein]
version: Lesson-v3
---

# Lernreise: Proteinbiosynthese Transkription und Translation (L1, Ziel Klausur)

<!-- Lesson v3: Schritt 1-8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser skip); [Werkzeug: <id>] interaktiv; Gating: check/szenario nicht bestanden = Weiter grau; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3 Ziele, nach 15 Minuten erreichbar):

1. Du kannst den Weg $DNA \to mRNA \to Protein$ mit Orten Nukleus und Ribosom beschreiben.
2. Du kannst Transkription mit $RNA$-$Polymerase$ und Translation mit $Codon$-$Anticodon$ erklaeren.
3. Du kannst aus einer $mRNA$-Sequenz wie $5'-AUG-GCU-UAA-3'$ die Aminosäeuresequenz ableiten (AFB II).

EINSTIEG: Im Jahr 1961 froren Nirenberg und Matthaei im Labor und fuetterten ein Reagenzglas nur mit $Poly$-$U$. Heraus kam nur Phenylalanin aus $UUU$. Der Code war geknackt: Drei Buchstaben bedeuten eine Aminosaeure. Wer Tripletts liest, liest das Leben.

Klausur-Satz: `Drei Basen codieren eine Aminosaeure, Start und Stopp rahmen das Protein.`

## Schritt 2 — entdecken

GRUNDBEGRIFFE (5 Begriffe):

- **Transkription**: $DNA \to mRNA$ durch $RNA$-$Polymerase$ in $5' \to 3'$, Start am $Promotor$.
- **Codon**: Triplett wie $AUG$ oder $UUU$, $4^3 = 64$ Kombinationen fuer $20$ Aminosaeuren.
- **Translation**: $mRNA \to Protein$ am $Ribosom$ aus $30S + 50S$ (Prokaryot) bzw. $40S + 60S$ (Eukaryot).
- **tRNA**: Kleeblatt mit $Anticodon$ $3'$-$XXX$-$5'$ und beladener Aminosaeure $tRNA$-$AA$.
- **Stoppcodon**: $UAA$, $UAG$ oder $UGA$, beendet die Kette mit $Release$-$Faktor$.

Klausur-Satz: `Die Polymerase schreibt um, das Ribosom uebersetzt.`

## Schritt 3 — entdecken

KONZEPT (ein Konzept plus ein Textdiagramm):

Die $RNA$-$Polymerase$ oeffnet den $Promotor$, liest $3' \to 5'$ und baut $5'-AUG$-$3'$ auf. Nach $5'$-$Cap$, $Spleissen$ und $Poly$-$A$ wandert die $mRNA$ ins Cytoplasma. Dort paart $Codon$ $5'$-$GCU$-$3'$ mit $Anticodon$ $3'$-$CGA$-$5'$, die $Peptidyltransferase$ knuepft $AA_1 + AA_2 \to Dipeptid + H_2O$ und das Ribosom wandert um ein Triplett weiter bis $UAA$.

```diagram
    DNA:     --TAC--CGA--ATT--
    mRNA:    5'-AUG-GCU-UAA-3'
    tRNA:    UAC - CGA - (Release)
    Protein: Met - Ala - Stopp
    Orte: Nukleus (Transkription) -> Ribosom (Translation)
    Energie: ATP + GTP -> AMP + GDP + PP_i
```

Klausur-Satz: `Antiparallel lesen, komplementaer paaren, Peptidbindung knuepfen.`

## Schritt 4 — ausprobieren

BEISPIEL (Musteraufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (erklaeren, AFB II): Leiten Sie aus $5'-AUG-GCU-UAA-3'$ die Peptidfolge ab und erklaeren Sie Beginn und Ende.

HILFE:
1. Schritt 1: Teile in Tripletts $AUG$ | $GCU$ | $UAA$.
2. Schritt 2: Nutze $AUG = Met$ (Start), $GCU = Ala$, $UAA = Stopp$.
3. Schritt 3: Erklaere $Initiation$ mit $fMet$-$tRNA$ und $Termination$ mit $Release$-$Faktor$.

MUSTERLOESUNG: Die Sequenz liefert $Met$-$Ala$-$Stopp$, also ein Dipeptid. $AUG$ rekrutiert die Starter-$tRNA$ mit $Anticodon$ $3'$-$UAC$-$5'$; $GCU$ paart $3'$-$CGA$-$5'$ und liefert $Ala$ ueber $Peptidbindung$; $UAA$ bindet keinen $tRNA$-Traeger, sondern den $Release$-$Faktor$, der die Kette mit $H_2O$ freisetzt.

Klausur-Satz: `Start heisst AUG, Stopp heisst UAA, UAG oder UGA.`

## Schritt 5 — ausprobieren

VERGLEICH (Verfahren A gegen Verfahren B):

VERGLEICH: Waehle zuerst das Verfahren — (i) Transkriptionsverfahren (mit $Promotor$, $Polymerase$, $5' \to 3'$ argumentieren) oder (ii) Translationsverfahren (mit $Codon$, $Anticodon$, $Ribosom$ argumentieren) — dann loesen.

AUFGABE A: Erklaeren Sie, warum ein Promotordefekt kein Protein liefert.
AUFGABE B: Erklaeren Sie, warum ein verfruehtes $UAG$ ein kurzes Protein liefert.

HILFE: A nennt $DNA$-Start ohne $mRNA$, also Verfahren (i). B nennt $mRNA$-Mitte mit Stopp, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Ohne $Promotor$ bindet keine $RNA$-$Polymerase$, also gilt $mRNA = 0$ und $Protein = 0$. B erfordert Verfahren (ii): $UAG$ rekrutiert $Release$ statt $tRNA$-$AA$, also bricht $AA_1 + ... + AA_n$ frueh ab.

Klausur-Satz: `Fehlt der Start, fehlt alles; kommt Stopp frueh, bleibt der Rest aus.`

## Schritt 6 — check

CHECK (Selbsttest, 3 Fragen):

FRAGE: Wo laufen Transkription und Translation ab? | ANTWORT: Transkription im $Nukleus$ als $DNA \to mRNA$, Translation am $Ribosom$ als $mRNA \to Protein$.
FRAGE: Was paart mit 5'-GCU-3'? | ANTWORT: $3'$-$CGA$-$5'$ als $Anticodon$ mit $Ala$ als Fracht.
FRAGE: Was bewirkt UAA? | ANTWORT: $UAA$ bindet $Release$-$Faktor$ und beendet die Kette.

Klausur-Satz: `Komplementaer paaren heisst A-U und G-C beachten.`

## Fehlvorstellung

(kein Schritt, Parser skippt diesen Abschnitt)

1. Fehlvorstellung: $mRNA$ und $DNA$-Codestrang seien identisch.
   Korrektur: Sie unterscheiden $U$ gegen $T$ und Richtung; $5'$-$AUG$-$3'$ paart $3'$-$UAC$-$5'$ auf der Matrize.
   Korrektur-Satz: `Uracil ersetzt Thymin, Matrize bleibt komplementaer.`
2. Fehlvorstellung: Jedes $Codon$ codiere genau eine exklusive Aminosaeure ohne Redundanz.
   Korrektur: Der Code ist degeneriert: $GCU$, $GCC$, $GCA$ und $GCG$ bedeuten alle $Ala$.
   Korrektur-Satz: `Der Code ist redundant, aber eindeutig in Leserichtung.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor im Biokurs.
SITUATION: Ein Mitschueler uebersetzt $3'-AUG$-$5'$ direkt als $Met$ und ignoriert die Richtung.
AUFGABE (vergleichen, AFB III): Korrigieren Sie die Leserichtung in einer zusammenhaengenden Darstellung (ca. 150 Woerter) mit $5' \to 3'$-Regel, $Codon$-$Anticodon$-Paarung und Auswirkung auf das Protein.
RUBRIC (30 XP): Richtungsregel $5' \to 3'$ korrekt (10 XP) | Beispiel $AUG$ gegen $GUA$ ($Val$) (10 XP) | $Ribosom$-$tRNA$-Mechanismus genannt (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY: Merke Schreiben, Reifen, Uebersetzen: $DNA \to pre$-$mRNA \to mRNA \to Protein$. Anker $AUG$ startet, $UAA$/$UAG$/$UGA$ stoppen, $4^3 = 64$ codieren $20$.

REFLEXION:
1. Was fiel schwerer — das Triplett-Teilen (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Plane: Beim naechsten Mal markiere ich zuerst $5'$ und $3'$, dann teile ich Tripletts.

Anekdote (DE): Als Marshall Nirenberg 1961 sein $Poly$-$U$-Experiment mit $UUU \to Phe$ vortrug, blieb der Saal erst still, dann brandete Applaus auf. Sein Zettel mit $AUG = Met$ wurde beruehmt — drei Buchstaben hatten die Biologie fuer immer veraendert.

Bezug: `Nirenbergs Reagenzglas zeigte: Triplett plus Ribosom ergibt Protein.`
