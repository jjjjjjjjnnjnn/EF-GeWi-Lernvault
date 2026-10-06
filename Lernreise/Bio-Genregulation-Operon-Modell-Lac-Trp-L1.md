---
fach: Bio
thema: "Genregulation bei Prokaryoten: Das Operon-Modell"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, vergleichen, analysieren]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Bio, Genetik, Molekularbiologie, Operon, Lac-Operon, Genregulation]
version: Lesson-v3
---

# Lernreise: Genregulation bei Prokaryoten: Das Operon-Modell (L1, Ziel Klausur)

<!-- Campaign: Molekulargenetik-und-Steuerung | Episode 4/10 | Krise: Wie schaltet ein Einzeller ohne Nervensystem Gene punktgenau an und aus? | Zielgroessen: Operon, Promotor, Operator, Repressor, Substrat-Induktion, Endprodukt-Repression | Tool: balance-board -->

## Schritt 1 — entdecken: Der mikroskopische Energiesparmeister
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清原核生物操纵子（Operon）的核心结构（Promotor, Operator, Strukturgene, Regulatorgen）及分子运作机理。
2. 中文：能精准对比底物诱导（Substrat-Induktion, z.B. Lac-Operon）与终产物阻遏（Endprodukt-Repression, z.B. Trp-Operon）的调节闭环。
3. 中文：能在现代分子生物学综合题（AFB I/II/III）中结合双峰生长曲线（Diauxie）与突变实验分析基因调控网络的自适应进化优势。

### Hook / Phaenomen

Ein winziges Bakterium der Spezies Escherichia coli in deinem Darm besitzt kein Gehirn, keine Augen und keine Nervenzellen. Dennoch trifft dieser mikroskopische Organismus minuetlich oekonomische Entscheidungen, die jedes menschliche Logistikunternehmen vor Neid erblassen liessen. Wenn in deinem Darm reichlich Traubenzucker (Glukose) vorhanden ist, ignoriert die Bakterienzelle andere Zuckerquellen voellig. Befindet sich jedoch ausschliesslich Milchzucker (Laktose) im Speisebrei, schaltet das Bakterium binnen weniger Minuten eine Batterie hochspezialisierter Enzyme an, um die Laktose zu spalten. Sobald die Laktose aufgebraucht ist, wird die Proteinproduktion sofort wieder gestoppt. Wuerde das Bakterium diese Enzyme dauerhaft synthetisieren, wuerde es wertvolle Aminosaeuren und ATP vergeuden und im gnadenlosen evolutionaeren Selektionskampf untergehen. Wie schaltet eine Zelle Gene an und aus, ohne darueber nachzudenken?

`Klausur-Satz: Das Operon-Modell nach Jacob und Monod reguliert die Transkription prokaryotischer Strukturgene durch reversible Bindung eines allosterischen Repressors an die Operator-DNA.`

## Schritt 2 — entdecken: Die Bausteine des bakteriellen Schaltkreises
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 操纵子 — Operon: 原核生物中由启动子、操纵基因及一组功能相关的结构基因组成的协同转录功能单位。 Funktionseinheit aus Promotor, Operator und funktionell verknuepften Strukturgenen.
- 调节基因 — Regulatorgen: 编码阻遏蛋白或激活蛋白的基因，通常位于操纵子外部并自主转录。 Gen, das die Information fuer das allosterische Repressorprotein traegt.
- 操纵基因 — Operator: 启动子与结构基因之间能够特异性结合阻遏蛋白的DNA识别区段。 DNA-Abschnitt zwischen Promotor und Strukturgenen, an den der Repressor bindet und so die RNA-Polymerase mechanisch blockiert.
- 底物诱导 — Substrat-Induktion: 底物的存在使本来具有活性的阻遏蛋白变性失活，从而启动相关分解酶基因表达的调节方式。 Mechanismus des Abbaus (Katabolismus), bei dem das abzubauende Molekuel (z. B. Allolaktose) den Repressor inaktiviert und die Transkription freischaltet.

## Schritt 3 — entdecken: Das Schaltwerk des Lac-Operons
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Aufbau des Lac-Operons:
[ Regulatorgen ] ... [ Promotor ] [ Operator ] [ Strukturgene: lacZ | lacY | lacA ]
       |                   |           |                      |
       v                   |           |                      v
 (Repressor-Protein)       |           |              (Enzyme zum Laktose-Abbau)
                           |           |
Fall A: Ohne Laktose       v           |
Repressor ist AKTIV ======> Blockiert den Operator!
                            RNA-Polymerase kann NICHT ablesen -> KEINE Transkription!

Fall B: Mit Laktose (Allolaktose)
Laktose bindet an Repressor -> Konformationsaenderung -> Repressor wird INAKTIV!
Operator wird FREI -> RNA-Polymerase transkribiert Strukturgen-Batterie!
```

`Klausur-Satz: Bei der Substrat-Induktion verhindert die Inaktivierung des Repressors die Verschwendung von Biosynthese-Energie, solange kein Substrat vorhanden ist.`

## Schritt 4 — ausprobieren: Das mikrobielle Genregulations-Experiment

[Werkzeug: balance-board]

AUFGABE (beschreiben & analysieren, AFB I/II):
In einem molekularbiologischen Experiment werden drei verschiedene Mutantenstamme von Escherichia coli auf einem Naehrmedium untersucht, das ausschliesslich Laktose enthaelt:
- Stamm A: Deletionsmutation im Operator ($O^-$), sodass der Repressor nicht mehr binden kann.
- Stamm B: Nonsense-Mutation im Regulatorgen ($I^-$), sodass kein funktionsfaehiges Repressorprotein gebildet wird.
- Stamm C: Punktmutation im Regulatorgen ($I^s$, Super-Repressor), bei der die Allolaktose-Bindestelle zerstoert ist, die DNA-Bindedomäne aber intakt bleibt.
1. Beschreibe fuer alle drei Staemme, ob die Strukturgene (lacZ, lacY, lacA) in Anwesenheit bzw. Abwesenheit von Laktose synthetisiert werden.
2. Analysiere, welcher der drei Staemme auf dem reinen Laktose-Naehrmedium sterben wird.

MUSTERLOESUNG:
1. Syntheseverhalten:
   - Stamm A ($O^-$): Da der Operator defekt ist, kann kein Repressor binden. Die Transkription laeuft konstitutiv (dauerhaft) ab – sowohl mit als auch ohne Laktose.
   - Stamm B ($I^-$): Mangels Repressorprotein ist der Operator permanent frei. Die Enzyme werden ebenfalls konstitutiv produziert.
   - Stamm C ($I^s$): Der Super-Repressor sitzt fest auf dem Operator und kann durch Laktose nicht mehr geloest werden. Die Transkription bleibt permanent blockiert.
2. Ueberlebensfaehigkeit:
   - Stamm C stirbt auf dem reinen Laktosemedium, da er mangels Spaltungsenzymen (Beta-Galaktosidase) die Laktose nicht verwerten kann und verhungert. Staemme A und B ueberleben, verschwenden allerdings unnoetig ATP.

`Klausur-Satz: Bei Aufgaben zu Genregulation bei Prokaryoten: Das Operon-Modell muss die theoriegeleitete Begruendung stets durch exakte Fachtermini und empirische Belege abgesichert werden.`

## Schritt 5 — ausprobieren: Duell der Regulationsmodelle: Abbau vs. Aufbau

VERGLEICH: Substrat-Induktion (Lac-Operon) vs. Endprodukt-Repression (Trp-Operon) (选概念)

- Position A (Substrat-Induktion / Katabolismus):
  - Repressor von Natur aus: AKTIV (Schranke standardmaessig geschlossen).
  - Signalmolekuels: Substrat (Laktose) bindet an Repressor -> inaktiviert ihn -> schaltet Gen AN.
  - Ziel: Spart Energie, indem Enzyme nur bei vorhandener Nahrung produziert werden.
- Position B (Endprodukt-Repression / Anabolismus):
  - Repressor von Natur aus: INAKTIV (Schranke standardmaessig offen).
  - Signalmolekuel: Endprodukt (Tryptophan) fungiert als Co-Repressor -> aktiviert Repressor -> schaltet Gen AUS.
  - Ziel: Verhindert Ueberproduktion und Vergiftung durch Stoffwechselendprodukte.

Entscheidungsregel fuer die Klausur:
Geht es um einen `abbauenden Stoffwechselweg` (zuckerverwertend), handelt es sich um Substrat-Induktion. Geht es um die `Synthese lebenswichtiger Aminosaeuren`, handelt es sich um Endprodukt-Repression!

## Schritt 6 — check: Klausur-Transfer Diauxie-Kurve und Katabolit-Repression

PRUEFUNGSSZENARIO (KLP NRW Biologie LK Inhaltsfeld 3: Genetik):

### AFB I: Basiskonzept
Definiere die Begriffe Polyzystronische mRNA, Promotor und Allosterisches Protein.

### AFB II: Analyse einer Wachstumskurve
Wird E. coli in einer Naehrmedienmischung aus Glukose und Laktose kultiviert, beobachtet man ein typisches zwei-phasiges Wachstum (Diauxie-Kurve) mit einer Zwischenpause (Lag-Phase).
Erklaere dieses Phaenomen auf molekularer Ebene unter Einbezug von cAMP und dem Katabolit-Aktivator-Protein (CAP).

### AFB III: Evolutionaere Bewertung
Bakterien organisieren funktionell gekoppelte Enzyme in gemeinsamen Operons auf einem einzigen Transkript, waehrend menschliche Zellen fast ausnahmslos monozystronische Gene mit komplexen Intron-Exon-Strukturen und Enhancern aufweisen.
Beurteile die evolutionaeren Vor- und Nachteile dieses prokaryotischen Prinzips hinsichtlich Teilungsrate und Genomkompaktheit.

## Schritt 7 — check: Format-Check & Scoring

30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Was ist der fundamentale Unterschied zwischen einer allosterischen Enzymhemmung und der Genregulation ueber ein Operon?
ANTWORT: Die Enzymhemmung schaltet bereits existierende Proteine in Sekundenbruchteilen aus. Das Operon reguliert die Neusynthese von Enzymen auf Genebene, was thermodynamisch viel ressourcenschonender ist.

FRAGE: Welche Rolle spielt cAMP bei der prokaryotischen Genexpression?
ANTWORT: cAMP signalisiert Glukosemangel. Es bindet an das CAP-Protein, aktiviert es und unterstuetzt die RNA-Polymerase dabei, effizient an den Promotor alternativer Operons (wie Lac) zu binden.

`Klausur-Satz: Die differenzierte Reflexion erfordert eine stringente Verknuepfung von theoretischem Kriterienkatalog und konkretem Klausurmaterial.`

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission

REFLEXION:
Du beherrschst nun das klassische Meisterstueck der molekularen Genetik nach Francois Jacob und Jacques Monod.

In der naechsten Biologie-Episode untersuchen wir die ungleich komplexere eukaryotische Genregulation: Transkriptionsfaktoren, Histonacetylierung und die Mechanismen der modernen Epigenetik.
