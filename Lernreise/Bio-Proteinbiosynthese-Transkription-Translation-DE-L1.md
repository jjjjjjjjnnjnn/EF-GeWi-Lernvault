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

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken
ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst den Weg $DNA \to mRNA \to Protein$ mit den Orten Nukleus und Ribosom beschreiben.
2. Du kannst Transkription mit $RNA$-Polymerase und Translation mit $Codon$-$Anticodon$-Paarung erklaeren.
3. Du kannst aus einer $mRNA$-Sequenz wie $5'$-$AUG$-$GCU$-$UAA$-$3'$ die Aminosaeuresequenz ableiten (AFB II).

### Hook / Phaenomen

Als Nirenberg 1961 sein Poly-$U$-Experiment vortrug — $UUU$ zu Phenylalanin — blieb der Saal erst still, dann brandete Applaus auf. Drei Buchstaben hatten die Biologie veraendert: Aus $AUG$ wird Methionin, aus $UAA$ ein Stopp. Wie liest die Zelle einen vierbuchstabigen Code als zwanzig Aminosaeuren — und woher weiss das Ribosom, wo Anfang und Ende stehen?

### Fachbegriff & Definition

Die **Proteinbiosynthese** folgt dem **zentralen Dogma** $DNA \to mRNA \to Protein$ an zwei Orten: **Transkription** im **Nukleus**, **Translation** am **Ribosom** im Cytoplasma. Die **Transkription** schreibt mit **$RNA$-Polymerase** vom Promotor aus $5'$-$AUG$-$3'$ auf (Leserichtung $3' \to 5'$); nach $5'$-Cap, Spleissen und Poly-$A$ wandert die $mRNA$ aus. Die **Translation** uebersetzt am Ribosom: Jedes **Codon** (Triplett wie $AUG$, $4^3 = 64$ Kombinationen fuer $20$ Aminosaeuren) paart ein **Anticodon** ($3'$-$XXX$-$5'$) der beladenen **$tRNA$**; **Start** heisst $AUG$, **Stopp** heisst $UAA$, $UAG$ oder $UGA$ mit Release-Faktor.

### Wirkungsgefuege / Modell

Die Kausalkette lautet: **Oeffnen, Schreiben, Uebersetzen, Knuepfen**. Polymerase oeffnet den Promotor und baut $mRNA$ $5' \to 3'$ — etwa $DNA$-$TAC$ zu $mRNA$-$AUG$. Nach Reifung paart Codon $5'$-$GCU$-$3'$ mit Anticodon $3'$-$CGA$-$5'$, die **Peptidyltransferase** knuepft $AA_1 + AA_2 \to Dipeptid + H_2O$, das Ribosom wandert ein Triplett weiter bis $UAA$. Aus $5'$-$AUG$-$GCU$-$UAA$-$3'$ wird $Met$-$Ala$-Stopp — ein Dipeptid: $AUG$ rekrutiert die Starter-$tRNA$, $GCU$ liefert Alanin, $UAA$ bindet den Release-Faktor statt $tRNA$. Antiparallel lesen, komplementaer paaren, Peptidbindung knuepfen.

Klausur-Satz: `Drei Basen codieren eine Aminosaeure, Start und Stopp rahmen das Protein.`

## Schritt 2 — entdecken
PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

### Hook / Phaenomen

Vier Buchstaben, $64$ Woerter, $20$ Bedeutungen — der genetische Code ist redundant, aber eindeutig lesbar. Welche $tRNA$ passt auf $GCU$, und warum endet die Kette an $UAA$, obwohl dort ebenfalls drei Buchstaben stehen? Fuenf Begriffe entziffern den Code.

### Fachbegriffe & Definitionen

- **Transkription:** $DNA \to mRNA$ durch $RNA$-Polymerase in $5' \to 3'$, Start am Promotor — Umschreiben im Nukleus mit Cap, Spleissen und Poly-$A$.
- **Codon:** Triplett wie $AUG$ oder $UUU$; $4^3 = 64$ Kombinationen fuer $20$ Aminosaeuren — drei Basen codieren eine Aminosaeure.
- **Translation:** $mRNA \to Protein$ am Ribosom aus $30S + 50S$ (Prokaryot) bzw. $40S + 60S$ (Eukaryot) — Uebersetzen im Cytoplasma.
- **tRNA:** Kleeblatt mit Anticodon $3'$-$XXX$-$5'$ und beladener Aminosaeure ($tRNA$-$AA$) — Adapter zwischen Code und Baustein.
- **Stoppcodon:** $UAA$, $UAG$ oder $UGA$; beendet die Kette mit Release-Faktor — bindet keine $tRNA$, sondern setzt die Kette mit $H_2O$ frei.

### Wirkungsgefuege / Modell

Die Begriffe bilden die Uebersetzungskette: **Polymerase schreibt um, Ribosom uebersetzt**. $AUG$ oeffnet mit Starter-$tRNA$ ($3'$-$UAC$-$5'$), mittlere Codons liefern Aminosaeuren per Peptidbindung, $UAA$ schliesst mit Release-Faktor. Energie fliegt mit: $ATP + GTP \to AMP + GDP + PP_i$ treibt Aufbau und Wanderung. Wer Tripletts teilt ($AUG$|$GCU$|$UAA$), Tabelle liest ($Met$|$Ala$|Stopp) und Beginn mit Initiation sowie Ende mit Termination erklaert, loest jede Ableitungsaufgabe.

Klausur-Satz: `Die Polymerase schreibt um, das Ribosom uebersetzt.`

## Schritt 3 — entdecken
TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

### Hook / Phaenomen

Nirenbergs Reagenzglas zeigte: Triplett plus Ribosom ergibt Protein — $Poly$-$U$ band nur Phenylalanin. Ein kuenstlicher $mRNA$-Faden decodierte den ersten Codebuchstaben der Biologie. Wie baut die Zelle aus diesem Prinzip jede Sequenz zwischen Start und Stopp?

### Fachbegriff & Definition

Die **Codon-Anticodon-Paarung** ist antiparallel und komplementaer: Codon $5'$-$GCU$-$3'$ bindet Anticodon $3'$-$CGA$-$5'$. Die **Peptidyltransferase** knuepft jede Bindung ($AA_1 + AA_2 \to Dipeptid + H_2O$), das Ribosom rückt Triplett fuer Triplett vor. **Initiation** startet mit $fMet$-$tRNA$ an $AUG$, **Elongation** verlaengert Kette um Kette, **Termination** endet an $UAA$/$UAG$/$UGA$ mit Release-Faktor. Start und Stopp rahmen das Protein — drei Basen codieren eine Aminosaeure.

### Wirkungsgefuege / Modell

Denke in Kausalkette: **Teilen, Paaren, Knuepfen**. Erstens $mRNA$ in Tripletts teilen. Zweitens jedes Codon per Tabelle und $tRNA$ paaren. Drittens Peptidbindungen knuepfen bis zum Stopp. Orte beachten: Nukleus schreibt, Ribosom uebersetzt — bei Eukaryoten wandert die reife $mRNA$ erst aus. Fehler an $UAA$ gelesen als Aminosaeure statt Stopp verlaengert die Kette — ein klassischer Mutationsmechanismus.

```diagram
    DNA:     --TAC--CGA--ATT--   (Template 3'->5' gelesen)
    mRNA:    5'-AUG-GCU-UAA-3'   (gebaut 5'->3')
    tRNA:    UAC - CGA - (Release statt tRNA)
    Protein: Met - Ala - Stopp   (Dipeptid + Freisetzung)
    Orte: Nukleus (Transkription) -> Ribosom (Translation)
    Energie: ATP + GTP -> AMP + GDP + PP_i
    Regel: antiparallel lesen, komplementaer paaren, Peptidbindung knuepfen
```

Klausur-Satz: `Antiparallel lesen, komplementaer paaren, Peptidbindung knuepfen.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Als Marshall Nirenberg 1961 sein $Poly$-$U$-Experiment mit $UUU \to Phe$ vortrug, blieb der Saal erst still, dann brandete Applaus auf. Sein Zettel mit $AUG = Met$ wurde beruehmt — drei Buchstaben hatten die Biologie fuer immer veraendert.

**Bezug zum Konzept**: `Nirenbergs Reagenzglas zeigte: Triplett plus Ribosom ergibt Protein.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (erklaeren, AFB II): Leiten Sie aus $5'-AUG-GCU-UAA-3'$ die Peptidfolge ab und erklaeren Sie Beginn und Ende.

HILFE:
1. Schritt 1: Teile in Tripletts $AUG$ | $GCU$ | $UAA$.
2. Schritt 2: Nutze $AUG = Met$ (Start), $GCU = Ala$, $UAA = Stopp$.
3. Schritt 3: Erklaere $Initiation$ mit $fMet$-$tRNA$ und $Termination$ mit $Release$-$Faktor$.

MUSTERLOESUNG: Die Sequenz liefert $Met$-$Ala$-$Stopp$, also ein Dipeptid. $AUG$ rekrutiert die Starter-$tRNA$ mit $Anticodon$ $3'$-$UAC$-$5'$; $GCU$ paart $3'$-$CGA$-$5'$ und liefert $Ala$ ueber $Peptidbindung$; $UAA$ bindet keinen $tRNA$-Traeger, sondern den $Release$-$Faktor$, der die Kette mit $H_2O$ freisetzt.

Klausur-Satz: `Start heisst AUG, Stopp heisst UAA, UAG oder UGA.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Waehle zuerst das Verfahren — (i) Transkriptionsverfahren (mit $Promotor$, $Polymerase$, $5' \to 3'$ argumentieren) oder (ii) Translationsverfahren (mit $Codon$, $Anticodon$, $Ribosom$ argumentieren) — dann loesen.

AUFGABE A: Erklaeren Sie, warum ein Promotordefekt kein Protein liefert.
AUFGABE B: Erklaeren Sie, warum ein verfruehtes $UAG$ ein kurzes Protein liefert.

HILFE: A nennt $DNA$-Start ohne $mRNA$, also Verfahren (i). B nennt $mRNA$-Mitte mit Stopp, also Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Ohne $Promotor$ bindet keine $RNA$-$Polymerase$, also gilt $mRNA = 0$ und $Protein = 0$. B erfordert Verfahren (ii): $UAG$ rekrutiert $Release$ statt $tRNA$-$AA$, also bricht $AA_1 + ... + AA_n$ frueh ab.

Klausur-Satz: `Fehlt der Start, fehlt alles; kommt Stopp frueh, bleibt der Rest aus.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wo laufen Transkription und Translation ab? | ANTWORT: Transkription im $Nukleus$ als $DNA \to mRNA$, Translation am $Ribosom$ als $mRNA \to Protein$.
FRAGE: Was paart mit 5'-GCU-3'? | ANTWORT: $3'$-$CGA$-$5'$ als $Anticodon$ mit $Ala$ als Fracht.
FRAGE: Was bewirkt UAA? | ANTWORT: $UAA$ bindet $Release$-$Faktor$ und beendet die Kette.

Klausur-Satz: `Komplementaer paaren heisst A-U und G-C beachten.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlannahme: $mRNA$ und $DNA$-Codestrang seien identisch.
   Korrektur: Sie unterscheiden $U$ gegen $T$ und Richtung; $5'$-$AUG$-$3'$ paart $3'$-$UAC$-$5'$ auf der Matrize.
   Korrektur-Satz: `Uracil ersetzt Thymin, Matrize bleibt komplementaer.`
2. Fehlannahme: Jedes $Codon$ codiere genau eine exklusive Aminosaeure ohne Redundanz.
   Korrektur: Der Code ist degeneriert: $GCU$, $GCC$, $GCA$ und $GCG$ bedeuten alle $Ala$.
   Korrektur-Satz: `Der Code ist redundant, aber eindeutig in Leserichtung.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor im Biokurs.
SITUATION: Ein Mitschueler uebersetzt $3'-AUG$-$5'$ direkt als $Met$ und ignoriert die Richtung.
AUFGABE (vergleichen, AFB III): Korrigieren Sie die Leserichtung in einer zusammenhaengenden Darstellung (ca. 150 Woerter) mit $5' \to 3'$-Regel, $Codon$-$Anticodon$-Paarung und Auswirkung auf das Protein.
RUBRIC (30 XP): Richtungsregel $5' \to 3'$ korrekt (10 XP) | Beispiel $AUG$ gegen $GUA$ ($Val$) (10 XP) | $Ribosom$-$tRNA$-Mechanismus genannt (5 XP) | Geschlossene Darstellung (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Merke Schreiben, Reifen, Uebersetzen: $DNA \to pre$-$mRNA \to mRNA \to Protein$. Anker $AUG$ startet, $UAA$/$UAG$/$UGA$ stoppen, $4^3 = 64$ codieren $20$.
Takeaway-Satz: `Schreiben, Reifen und Uebersetzen verbinden DNA mit Protein; Start und Stopp rahmen jede Kette.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer — das Triplett-Teilen (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. Beim naechsten Mal markiere ich zuerst $5'$ und $3'$, dann teile ich Tripletts.
