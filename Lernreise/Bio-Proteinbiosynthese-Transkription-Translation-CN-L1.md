---
fach: Bio
thema: "Proteinbiosynthese Transkription Translation"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, erklaeren, anwenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, Genetik]
version: Lesson-v3
---

# Lernreise: Proteinbiosynthese Transkription Translation (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清中心法则两步走——细胞核内转录（DNA→mRNA），细胞质内核糖体上翻译（mRNA→蛋白质）。
2. 中文：能用密码子表把一段 mRNA 翻译成氨基酸序列，并找到起始和终止密码子。
3. 中文：能解释突变如何通过改变密码子影响蛋白质，并写出德语标准结论句（AFB II）。


Hook中文生活切入:

想象中央厨房的工作流:总菜谱锁在保险柜里不外借,每天只复印一张当日单子送到各个档口,厨师照着单子抓料装盘,做完单子就销毁。细胞制造蛋白质也是这套流程:DNA是永不外借的总菜谱,信使RNA是当日复印件,核糖体是照单抓料的厨师,做完即止,绝不浪费。

Phaenomen-Satz (DE): Das Original bleibt im Safe, nur Kopien wandern in die Kueche.

中文机制铺垫:转录在细胞核内以DNA一条链为模板合成信使RNA,剪接去掉内含子后出核;翻译时核糖体沿信使RNA每三个碱基读取一个密码子,转运RNA搬运对应氨基酸,肽链延长折叠成有功能的蛋白质。

Mechanismus-Satz (DE): Transkription kopiert die Botschaft, Translation baut nach ihrem Code das Protein.

Klausur-Satz: `Die Proteinbiosynthese folgt dem Zentraldogma: Transkription im Kern, Translation am Ribosom.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 转录 — Transkription：以 DNA 一条链为模板合成 mRNA，碱基配对 $A$-$U$、$T$-$A$、$G$-$C$。【陷阱：Transkription（DNA→RNA，在核内）不是 Replikation（DNA→DNA）也不是 Translation（RNA→Protein）。】
- 信使 RNA — mRNA：携带密码子序列的单链核酸。【陷阱：mRNA（信使，去核糖体）不是 tRNA（搬运工，运氨基酸）不是 rRNA（核糖体结构成分）。】
- 密码子 — Codon：mRNA 上三个碱基决定一个氨基酸，如 $AUG$。【陷阱：Codon（mRNA 上的三联体）不是 Anticodon（tRNA 上反向互补的三联体）。】
- 核糖体 — Ribosom：读取 mRNA 并连接氨基酸的分子机器。【陷阱：Ribosom（翻译场所）不是 Zellkern（转录场所）。】
- 简并性 — Degeneriertheit des Codes：多个密码子可编码同一氨基酸，缓冲突变。【陷阱：degeneriert（密码子冗余，保护性）不是 defekt（损坏）。】

Klausur-Satz: `Drei Basen bilden ein Codon, ein Codon steht fuer eine Aminosaeure oder ein Stoppsignal.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象中央厨房的工作单：档案室只许复印菜谱不许拿走原件，厨师拿着复印件在灶台前一个个配料下锅。细胞做蛋白也是这个流程。

Phaenomen-Satz (DE): Die Kueche kopiert das Rezept und baut danach das Gericht am Herd.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块选择模板链碱基（关键词：Matrizenstrang, Codon, Ribosom, tRNA-Anticodon），先转录出mRNA再逐个密码子翻译，看氨基酸链如何延长。

Beobachtungs-Satz (DE): Aus dem Matrizenstrang entsteht die mRNA, am Ribosom waechst die Kette Codon fuer Codon.

Aha-Moment因果链：

中文因果链：DNA双链太贵重不能出核，只能按碱基互补转录出mRNA信使；核糖体每读三个碱基即一个密码子，就抓一个对应tRNA带来氨基酸，于是mRNA上密码子顺序决定了蛋白的氨基酸顺序，起始AUG不到不开工、终止密码子一到即收工。

Gesetz-Satz (DE): Die Codonfolge der mRNA legt die Aminosaeurefolge des Proteins fest.

$DNA \to mRNA \to Protein$

$5'$-$AUG$ \Rightarrow Start$

$UAA/UAG/UGA \Rightarrow Stopp$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Kern: DNA (Matrize 3'->5') --Transkription--> mRNA 5'-AUG...UAA-3'
Ribosom: [AUG][CUU][GAA] --Translation--> Met-Leu-Glu ...
tRNA bringt Aminosaeure, Anticodon passt zu Codon
```
Klausur-Satz: `Die Reihenfolge der Codons auf der mRNA bestimmt die Reihenfolge der Aminosaeuren im Protein.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Den genetischen Code knackte Marshall Nirenberg 1961 mit einem kuenstlichen $UUU$-Experiment: Poly-U im Reagenzglas ergab nur Phenylalanin — das erste entzifferte Wort war also $UUU$ = Phe. Fuer diese Leistung erhielt er 1968 den Nobelpreis, obwohl kaum jemand seinen Namen kannte.

**中文解读**: 密码子表是"人造 RNA 试出来"的：往试管里只加 U，合成的全是苯丙氨酸，于是 $UUU$ 是第一个被破译的词。中国学生查表时记住这段历史：表格不是天上掉下来的，是一个个三联体试出来的。

**Bezug zum Konzept**: `Ein kuenstliches Experiment mit nur einer Base entzifferte das erste Wort des genetischen Codes.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

[Werkzeug: osmose-lab]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：已知一段模板链，要求写出mRNA并翻译出三个氨基酸，标出起始与终止信号。

AUFGABE (anwenden, AFB II): Leiten Sie aus dem Matrizenstrang $3'$-$TAC$-$GAA$-$CTT$-$ATT$-$5'$ die mRNA und die Aminosaeurefolge ab und kennzeichnen Sie Start und Stopp.

HILFE（中德双语步骤）：

1. 中文：第1步按配对转录出mRNA，注意方向5到3，关键词：Komplementaritaet。
   Schritt 1 (DE): Transkribieren Sie komplementaer zu $5'$-$AUG$-$CUU$-$GAA$-$UAA$-$3'$.
2. 中文：第2步三联一切分密码子查表翻译，关键词：Codon。
   Schritt 2 (DE): Teilen Sie in Tripletts und uebersetzen Sie zu Met-Leu-Glu.
3. 中文：第3步标出AUG起始与UAA终止并收尾，关键词：Stopp。
   Schritt 3 (DE): Markieren Sie Start ($AUG$) und Stopp ($UAA$).

MUSTERLOESUNG：中文：模板转录得mRNA为5-AUG-CUU-GAA-UAA-3，切成三个密码子对应蛋氨酸-亮氨酸-谷氨酸，AUG开工、UAA收工，链到此结束。

MUSTERLOESUNG (DE): Die mRNA lautet $5'$-$AUG$-$CUU$-$GAA$-$UAA$-$3'$; die Translation liefert Met-Leu-Glu. $AUG$ startet, $UAA$ stoppt die Kette.
Klausur-Satz: `Aus dem Matrizenstrang folgt die mRNA, aus den Codons folgt die Aminosaeurefolge Met-Leu-Glu.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：转录眼 vs. 翻译眼）：

VERGLEICH: Waehle erst das Konzept — 【选概念】先看场所和原料：(i) Transkriptions-Konzept（核内、DNA→RNA、RNA 聚合酶）还是 (ii) Translations-Konzept（核糖体、mRNA→蛋白质、tRNA 供氨基酸）—— dann einordnen.

AUFGABE A：Ein Vorgang nutzt RNA-Polymerase im Kern und produziert einen $U$-haltigen Strang.
AUFGABE B：Ein Vorgang nutzt Ribosomen im Zytoplasma und verknuepft Aminosaeuren.

HILFE: A nennt Polymerase plus Kern -> Konzept (i). B nennt Ribosom plus Aminosaeuren -> Konzept (ii).【选概念：题干出现 Kern / Polymerase / $U$ 选转录；出现 Ribosom / tRNA / Aminosaeure / Codon 选翻译。】

ANTWORT: A erfordert Konzept (i): Transkription, Matrize DNA, Produkt mRNA. B erfordert Konzept (ii): Translation, Vorlage mRNA, Produkt Polypeptid.

Klausur-Satz: `Transkription kopiert Information, Translation baut daraus das Protein.`

## Schritt 6 — check: Selbsttest zu Proteinbiosynthese Transkription Translation
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welche Basenpaarung gilt bei der Transkription? | ANTWORT: $A$-$U$, $T$-$A$, $G$-$C$ (Uracil statt Thymin in RNA).
FRAGE: Wie lauten Start- und Stopp-Codons? | ANTWORT: Start $AUG$, Stopp $UAA$, $UAG$, $UGA$.
FRAGE: Was schuetzt vor vielen Punktmutationen? | ANTWORT: Die Degeneriertheit des Codes, dritte Base oft ohne Effekt.

Klausur-Satz: `Ohne $AUG$ kein Beginn, ohne Stopp-Codon kein Ende der Translation.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"转录和复制是一回事，都是合成核酸"。
   中文纠偏：复制是 DNA→DNA 全分子拷贝，留在核内传代；转录是 DNA→RNA 只抄一个基因片段，产物出核去干活。模板用量、酶、产物去向全不同。
   Korrektur-Satz: `Replikation verdoppelt das Genom, Transkription kopiert einzelne Gene in RNA.`

2. 误解"密码子和反密码子写出来应该一模一样"。
   中文纠偏：两者是互补配对（$A$-$U$、$G$-$C$）且方向相反。密码子 $CUU$ 的 tRNA 反密码子是 $GAA$（反向读 $AAG$ 因方向），照抄等于认错人。
   Korrektur-Satz: `Codon und Anticodon sind komplementaer und antiparallel, nie identisch.`

## Schritt 7 — szenario: Klausurtransfer: Proteinbiosynthese Transkription Translation
ROLLE: Du bist Tutorin und erklaerst Proteinbiosynthese.
SITUATION: Eine Mitschuelerin hat die mRNA $5'$-$AUG\,CCG\,UAG$-$3'$ und weiss nicht, wo Translation beginnt und endet.
AUFGABE: Uebersetzen Sie in ca. 150 Woertern mit Codontabelle ($CCG$ = Prolin) in die Peptidfolge und erklaeren Sie Start/Stopp-Funktion.
RUBRIC (30 XP): Transkriptionslogik korrekt (5 XP) | Peptid Met-Pro korrekt (10 XP) | Stopp-Funktion $UAG$ erklaert (10 XP) | Fachbegriffe Codon/Anticodon (5 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：合成两步记：核内抄（DNA→mRNA，$T$ 变 $U$），质中做（mRNA→蛋白，查密码子表）。$AUG$ 开工，三终止收工。简并密码子是突变缓冲垫。三类 RNA 分工：m 信使、t 搬运、r 结构。
Takeaway-Satz: `Kern kopiert, Ribosom baut: Codons uebersetzen Basensprache in Proteinsprache.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Uebersetzen mit der Codontabelle (Schritt 4) oder die Konzeptwahl Transkription gegen Translation (Schritt 5)?
2. 元认知计划：Beim naechsten Mal teile ich die mRNA zuerst in Dreiergruppen und markiere Start und Stopp.
