---
fach: Bio
thema: "Zellatmung und ATP-Synthese"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Zellbiologie]
version: Lesson-v3
---

# Lernreise: Zellatmung und ATP-Synthese (L1, Ziel Klausur)

<!-- Lesson v3 9-Schritt-Architektur: Schritt 1 bis 8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser ueberspringt, zaehlt nicht); interaktives [Werkzeug: <id>]; Gating: check/szenario nicht bestanden = Weiter deaktiviert; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (drei messbare Ziele dieser Lektion):

1. Du kannst die Gesamtgleichung $C_6H_{12}O_6 + 6 O_2 \to 6 CO_2 + 6 H_2O + Energie$ wiedergeben und erklaeren, dass Glucose mit Sauerstoff oxidiert und Energie in $ATP$ gespeichert wird.
2. Du kannst vier Phasen mit Ort und Produkt nennen — Glykolyse im Cytoplasma, oxidative Decarboxylierung in der Matrix, Citratzyklus in der Matrix, Atmungskette mit oxidativer Phosphorylierung an der inneren Membran — und den ATP-Schwerpunkt an der inneren Membran zeigen.
3. Du kannst erklaeren, dass Sauerstoff der terminale Akzeptor ist und Cyanid an Komplex IV die $ATP$-Synthese stoppt (AFB II).

Klausur-Satz: `Die Zellatmung oxidiert Glucose mit Sauerstoff zu Kohlenstoffdioxid und Wasser und speichert die freigesetzte Energie in ATP.`

## Schritt 2 — entdecken

PRETRAINING-Box (fuenf Kernbegriffe mit Definitionen):

- Zellatmung: Abbau von Glucose mit $O_2$ im Mitochondrium mit hohem $ATP$-Ertrag; Gesamtgleichung siehe Schritt 4.
- ATP (Adenosintriphosphat): Direkt nutzbare Energieform; Aufbau aus $ADP + P_i$ unter Energiezufuhr.
- Mitochondrium: Organell mit Doppelmembran; Matrix fuer Citratzyklus, innere Membran fuer Atmungskette und $ATP$-Synthese.
- Oxidative Phosphorylierung: Protonengradient der Atmungskette treibt die $ATP$-Synthase zu $ADP + P_i \to ATP$.
- Atmungskette: Komplexe I bis IV auf der inneren Membran geben Elektronen an $O_2$ weiter; Komplex IV ist Angriffsstelle von Cyanid.

Klausur-Satz: `ATP entsteht ueberwiegend an der inneren Mitochondrienmembran durch oxidative Phosphorylierung in der Atmungskette.`

## Schritt 3 — entdecken

TIEFEN-KONZEPT (ein Konzept mit visuellem Schema):

Die Zellatmung folgt der Kette Zerlegen, Elektronen holen, $ATP$ tauschen. Glykolyse im Cytoplasma spaltet $1 \times Glucose$ zu $2 \times Pyruvat$ mit netto $2 \times ATP$ und $2 \times NADH$. Oxidative Decarboxylierung in der Matrix bildet $Acetyl$-$CoA + CO_2 + NADH$. Der Citratzyklus in der Matrix oxidiert zu $CO_2$ und liefert $NADH$, $FADH_2$ und $GTP$. Die Atmungskette an der inneren Membran uebergibt Elektronen, pumpt Protonen, die $ATP$-Synthase bildet viel $ATP$; $O_2$ faengt am Ende Elektronen mit $H^+$ zu $H_2O$ ab. Ohne $O_2$ stauen sich Elektronen; Cyanid blockiert Komplex IV und erzeugt kuenstlichen Sauerstoffmangel. Gaerung ist auf EF-Niveau nur Abgrenzung ohne $O_2$ im Cytoplasma mit wenig $ATP$.

```diagram
         Glucose (C6H12O6)
               |
               v
   [1 Glykolyse | Cytoplasma] ---> 2 Pyruvat + 2 ATP (netto) + 2 NADH
               |
               v
   [2 oxidative Decarboxylierung | Matrix] ---> Acetyl-CoA + CO2 + NADH
               |
               v
   [3 Citratzyklus | Matrix] ---> CO2 + NADH + FADH2 + GTP(=ATP)
               |
               v
   [4 Atmungskette + ATP-Synthase | innere Membran]
      NADH/FADH2 --e- --> Komplex I-III --> Komplex IV --e- + O2 + H+ --> H2O
      H+ -Gradient --> ATP-Synthase --> viel ATP (ca. 26-28)
               |
               X  Cyanid blockiert Komplex IV ==> e- -Stau ==> kein Gradient ==> kein ATP
```

Klausur-Satz: `Glucose wird in Glykolyse, oxidativer Decarboxylierung und Citratzyklus zu CO2 oxidiert, die Reduktionsaequivalente NADH und FADH2 liefern in der Atmungskette die Energie fuer die ATP-Synthese.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Cyanid ist in Krimis als schnell wirkendes Gift bekannt. Der Grund liegt in der Atmungskette: Cyanid blockiert Komplex IV, also genau die Stelle, an der Elektronen auf Sauerstoff uebertragen werden. Obwohl genug Sauerstoff im Blut vorhanden ist, kann die Zelle ihn nicht mehr nutzen. Die ATP-Produktion bricht ein, zuerst versagen Gehirn und Herzmuskel. Das Gift simuliert damit auf molekularer Ebene einen Sauerstoffmangel trotz voller Sauerstofftanks.

**Bezug zum Konzept**: `Sauerstoff ist der terminale Elektronenakzeptor; ist Komplex IV blockiert, stoppt die gesamte ATP-Synthese.`

## Schritt 4 — ausprobieren

BEISPIEL (geleitete Aufgabe mit Werkzeug):

[Werkzeug: formula]

AUFGABE (beschreiben, AFB II): Notieren Sie die Gesamtgleichung der Zellatmung und beschreiben Sie die vier Phasen mit Ort und Hauptprodukten in einer Tabelle. Grenzen Sie am Ende in einem Satz zur Gaerung ab (EF-Niveau, ohne Details).

HILFE:
1. Schritt 1: Gesamtgleichung auswendig notieren: $C_6H_{12}O_6 + 6 O_2 \to 6 CO_2 + 6 H_2O + Energie$ ($ATP$ plus Waerme).
2. Schritt 2: Tabelle mit vier Zeilen anlegen: Phase, Ort, Input zu Output, Energiegewinn.
3. Schritt 3: ATP-Schwerpunkt markieren: wenig $ATP$ in Phase 1 bis 3, viel $ATP$ in Phase 4; Gaerung nur als Satz: ohne Sauerstoff, im Cytoplasma, wenig $ATP$.

MUSTERLOESUNG: Gesamtgleichung: $C_6H_{12}O_6 + 6 O_2 \to 6 CO_2 + 6 H_2O + Energie$ ($ATP$ plus Waerme).

| Phase | Ort | Input -> Output | Energie |
|---|---|---|---|
| 1 Glykolyse | Cytoplasma | Glucose -> 2 Pyruvat + 2 NADH | netto 2 ATP |
| 2 oxidative Decarboxylierung | Mitochondrien-Matrix | Pyruvat -> Acetyl-CoA + CO2 + NADH | nur NADH |
| 3 Citratzyklus | Matrix | Acetyl-CoA -> CO2 + NADH + FADH2 + GTP | 2 GTP (ca. 2 ATP) |
| 4 Atmungskette + oxidative Phosphorylierung | innere Membran | NADH/FADH2 + O2 + ADP -> H2O + ATP | ca. 26-28 ATP, gesamt ca. 30-32 ATP |

Abgrenzung: Die Gaerung laeuft ohne Sauerstoff nur im Cytoplasma ab und liefert mit ca. 2 ATP deutlich weniger Energie als die Zellatmung.

Klausur-Satz: `Die Gesamtgleichung C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + Energie fasst vier Phasen zusammen, deren ATP-Hauptgewinn an der inneren Mitochondrienmembran liegt.`

## Schritt 5 — ausprobieren

VERGLEICH (Wahl des Verfahrens, A gegen B):

VERGLEICH: Waehle erst das Verfahren — (i) Zellatmungs-Verfahren (mit Sauerstoff, mit Mitochondrien, viel $ATP$, Produkte $CO_2 + H_2O$) oder (ii) Gaerungs-Verfahren (ohne Sauerstoff, nur Cytoplasma, wenig $ATP$, nur Abgrenzung) — dann loesen.

AUFGABE A: Eine Muskelzelle wird ausreichend mit Sauerstoff versorgt und baut Glucose vollstaendig ab; genannt sind Mitochondrien-Aktivitaet und hoher ATP-Ertrag.
AUFGABE B: Eine Hefezelle baut Glucose ohne Sauerstoff ab; genannt sind Cytoplasma als Ort und geringer ATP-Ertrag.

HILFE: A nennt Sauerstoff plus Mitochondrien plus viel $ATP$, daher Verfahren (i). B nennt keinen Sauerstoff plus Cytoplasma plus wenig $ATP$, daher Verfahren (ii).

ANTWORT: A erfordert Verfahren (i): Die Zelle nutzt die Zellatmung mit Gesamtgleichung $C_6H_{12}O_6 + 6 O_2 \to 6 CO_2 + 6 H_2O + Energie$ und erreicht ca. 30-32 ATP. B erfordert Verfahren (ii): Die Zelle nutzt die Gaerung ohne Sauerstoff im Cytoplasma mit deutlich geringerem ATP-Ertrag; Details sind auf EF-Niveau nicht gefordert.

Klausur-Satz: `Mit Sauerstoff dominiert die Zellatmung mit hohem ATP-Ertrag, ohne Sauerstoff bleibt nur die Gaerung mit geringem Ertrag.`

## Schritt 6 — check

CHECK (drei Fragen mit Antworten):

FRAGE: Wie lautet die Gesamtgleichung der Zellatmung? | ANTWORT: $C_6H_{12}O_6 + 6 O_2 \to 6 CO_2 + 6 H_2O + Energie$ ($ATP$ plus Waerme).
FRAGE: Nennen Sie die vier Phasen mit Ort. | ANTWORT: Glykolyse im Cytoplasma, oxidative Decarboxylierung in der Matrix, Citratzyklus in der Matrix, Atmungskette mit ATP-Synthese an der inneren Membran.
FRAGE: Warum stoppt Cyanid die ATP-Synthese? | ANTWORT: Cyanid blockiert Komplex IV, Elektronen erreichen Sauerstoff nicht mehr, der Protonengradient bricht zusammen und die ATP-Synthase bleibt stehen.

Klausur-Satz: `Ohne terminalen Elektronenakzeptor Sauerstoff bricht die oxidative Phosphorylierung zusammen.`

## Fehlvorstellung

(Kein Schritt; wird vom Parser uebersprungen.)

1. Fehlannahme: $ATP$ entstehe nur in der Atmungskette, die ersten Phasen seien energielos.
   Korrektur: Glykolyse und Citratzyklus liefern neben wenig $ATP$ vor allem $NADH$ und $FADH_2$ als Reduktionsaequivalente fuer die Atmungskette.
   Korrektur-Satz: `Glykolyse und Citratzyklus liefern neben wenig ATP vor allem NADH und FADH2 als Reduktionsaequivalente fuer die Atmungskette.`
2. Fehlannahme: Cyanid wirke durch Sauerstoffmangel im Blut.
   Korrektur: Cyanid blockiert Komplex IV, sodass Sauerstoff trotz Anwesenheit nicht als Elektronenakzeptor genutzt werden kann.
   Korrektur-Satz: `Cyanid blockiert Komplex IV, sodass Sauerstoff trotz Anwesenheit nicht als Elektronenakzeptor genutzt werden kann.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in der EF und erklaerst einer Mitschaelerin die Zellatmung.
SITUATION: Deine Mitschaelerin versteht nicht, warum ein Gift wie Cyanid so schnell toetet, obwohl das Opfer normal atmet.
AUFGABE (AFB II/III): Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) die Gesamtgleichung, die vier Phasen mit Orten und die Rolle von Sauerstoff sowie Komplex IV.
RUBRIC (30 XP): Korrekte Gesamtgleichung (5 XP) | Vier Phasen mit Ort und Produkt korrekt (10 XP) | Sauerstoff als terminaler Akzeptor erklaert (10 XP) | Cyanid-Blockade von Komplex IV als Fazit (5 XP).

## Schritt 8 — entdecken

TAKEAWAY (Kernbotschaft in einem Kasten):

Vier Phasen oxidieren Glucose zu $CO_2$, die Atmungskette nutzt Sauerstoff zur $ATP$-Synthese; Cyanid stoppt Komplex IV und damit die Energieversorgung. Mit Sauerstoff ins Mitochondrium mit viel $ATP$, ohne Sauerstoff nur Gaerung mit wenig $ATP$.
Takeaway-Satz: `Vier Phasen oxidieren Glucose zu CO2, die Atmungskette nutzt Sauerstoff zur ATP-Synthese; Cyanid stoppt Komplex IV und damit die Energieversorgung.`

REFLEXION (zwei Fragen):
1. Welcher Schritt fiel schwerer — die Tabelle der vier Phasen (Schritt 4) oder die Wahl zwischen Zellatmung und Gaerung (Schritt 5)?
2. Beim naechsten Mal schreibe ich zuerst die Gesamtgleichung auswendig hin und ordne danach jede Phase einem Ort zu.
