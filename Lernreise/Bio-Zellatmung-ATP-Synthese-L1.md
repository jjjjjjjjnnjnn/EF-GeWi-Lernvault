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

<!-- Lesson v3 8-Schritt-Architektur: Schritt 1-8 feste Struktur; Fehlvorstellung zwischen Schritt 6 und 7 (Parser skip, kein Schritt); [Werkzeug: <id>] interaktiv; Gating: check/szenario nicht bestanden = Weiter grau; XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能默写有氧呼吸总方程 C6H12O6 + 6 O2 → 6 CO2 + 6 H2O + Energie，并说清其含义——葡萄糖被氧气氧化，释放的能量存进 ATP，EF 只要求有氧呼吸，发酵只做分界不展开。
2. 中文：能按顺序说出四个阶段的名称、场所与核心产出——糖酵解（细胞质基质）、氧化脱羧（线粒体基质）、柠檬酸循环（基质）、呼吸链 + 氧化磷酸化（线粒体内膜），并指出 ATP 主要在线粒体内膜生成。
3. 中文：能解释氧气是电子最终受体、氰化物锁死复合体 IV 会导致 ATP 合成停止并致死（AFB II 解释题标准逻辑）。

Klausur-Satz: `Die Zellatmung oxidiert Glucose mit Sauerstoff zu Kohlenstoffdioxid und Wasser und speichert die freigesetzte Energie in ATP.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语）：

中文在上，德语在下：

- 有氧呼吸 — Zellatmung：在线粒体中利用氧气分解葡萄糖、大量生成 ATP 的过程，总方程见 Schritt 4。
- 三磷酸腺苷（能量货币）— ATP (Adenosintriphosphat)：细胞直接可用的能量形式，由 ADP + Phosphat unter Energiezufuhr aufgebaut。
- 线粒体 — Mitochondrium：双层膜的细胞器，基质进行柠檬酸循环，内膜进行呼吸链与 ATP-Synthese。
- 氧化磷酸化 — oxidative Phosphorylierung：呼吸链建立质子梯度、ATP-Synthase 利用梯度合成 ATP 的过程。
- 电子传递链 / 呼吸链 — Atmungskette：内膜上的复合体 I-IV 传递电子，最终把电子交给 Sauerstoff；Komplex IV ist die Angriffsstelle von Cyanid。

Klausur-Satz: `ATP entsteht ueberwiegend an der inneren Mitochondrienmembran durch oxidative Phosphorylierung in der Atmungskette.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：有氧呼吸的逻辑是一条"拆糖—取电子—换 ATP"的流水线。第一步糖酵解在细胞质基质把 1 葡萄糖拆成 2 丙酮酸，净得 2 ATP 与 2 NADH；第二步氧化脱羧在线粒体基质把丙酮酸变成乙酰辅酶 A，放出 CO2 并产生 NADH；第三步柠檬酸循环在基质中彻底氧化乙酰基，大量产出 NADH、FADH2 与 CO2；第四步呼吸链在线粒体内膜让 NADH/FADH2 交出电子，电子流驱动质子泵，质子回流经 ATP 合酶合成大量 ATP，氧气在末端接住电子并与质子结合生成水。所以没有氧气，电子就"堵车"，整个链条停转——这正是氰化物致死的原因：它锁死复合体 IV，等于人工制造"无氧"状态。EF 定位：只掌握这条需氧主线，发酵仅记住"无氧时的替代出路"，不展开细节。

文字图解（ASCII 结构图，App支持解析渲染）：

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
      NADH/FADH2 --e- Troy--> Komplex I-III --> Komplex IV --e- + O2 + H+ --> H2O
      H+ -Gradient --> ATP-Synthase --> viel ATP (ca. 26-28)
               |
               X  Cyanid blockiert Komplex IV ==> e- -Stau ==> kein Gradient ==> kein ATP
```

Klausur-Satz: `Glucose wird in Glykolyse, oxidativer Decarboxylierung und Citratzyklus zu CO2 oxidiert, die Reduktionsaequivalente NADH und FADH2 liefern in der Atmungskette die Energie fuer die ATP-Synthese.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Cyanid ist in Krimis als schnell wirkendes Gift bekannt. Der Grund liegt in der Atmungskette: Cyanid blockiert Komplex IV, also genau die Stelle, an der Elektronen auf Sauerstoff uebertragen werden. Obwohl genug Sauerstoff im Blut vorhanden ist, kann die Zelle ihn nicht mehr nutzen. Die ATP-Produktion bricht ein, zuerst versagen Gehirn und Herzmuskel. Das Gift simuliert damit auf molekularer Ebene einen Sauerstoffmangel trotz voller Sauerstofftanks.

**中文解读**: 氰化物之所以致命，不是因为血液缺氧，而是因为细胞"用不了氧"——它锁死呼吸链复合体 IV，电子无法交给氧气，质子梯度建不起来，ATP 合酶停工。大脑与心肌最耗 ATP，所以最先衰竭。记住这个 Hook：氰化物 = 分子层面的"假窒息"。

**Bezug zum Konzept**: `Sauerstoff ist der terminale Elektronenakzeptor; ist Komplex IV blockiert, stoppt die gesamte ATP-Synthese.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (beschreiben, AFB II)：Notieren Sie die Gesamtgleichung der Zellatmung und beschreiben Sie die vier Phasen mit Ort und Hauptprodukten in einer Tabelle. Grenzen Sie am Ende in einem Satz zur Gaerung ab (EF-Niveau, ohne Details).

HILFE:
1. Schritt 1: Gesamtgleichung auswendig notieren: C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + Energie (ATP + Waerme).
2. Schritt 2: Tabelle mit vier Zeilen anlegen: Phase | Ort | Input -> Output | Energiegewinn.
3. Schritt 3: ATP-Schwerpunkt markieren: wenig ATP in Phase 1-3, viel ATP in Phase 4; Gaerung nur als Satz: ohne Sauerstoff, im Cytoplasma, wenig ATP.

MUSTERLÖSUNG: Gesamtgleichung: C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + Energie (ATP + Waerme).

| Phase | Ort | Input -> Output | Energie |
|---|---|---|---|
| 1 Glykolyse | Cytoplasma | Glucose -> 2 Pyruvat + 2 NADH | netto 2 ATP |
| 2 oxidative Decarboxylierung | Mitochondrien-Matrix | Pyruvat -> Acetyl-CoA + CO2 + NADH | nur NADH |
| 3 Citratzyklus | Matrix | Acetyl-CoA -> CO2 + NADH + FADH2 + GTP | 2 GTP (ca. 2 ATP) |
| 4 Atmungskette + oxidative Phosphorylierung | innere Membran | NADH/FADH2 + O2 + ADP -> H2O + ATP | ca. 26-28 ATP, gesamt ca. 30-32 ATP |

Abgrenzung: Die Gaerung laeuft ohne Sauerstoff nur im Cytoplasma ab und liefert mit ca. 2 ATP deutlich weniger Energie als die Zellatmung.

Klausur-Satz: `Die Gesamtgleichung C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + Energie fasst vier Phasen zusammen, deren ATP-Hauptgewinn an der inneren Mitochondrienmembran liegt.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：需氧眼 vs. 缺氧眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目给的是 (i) Zellatmung-Verfahren（有 Sauerstoff、有 Mitochondrien-Beteiligung、viel ATP、CO2 + H2O 为产物）还是 (ii) Gaerung-Verfahren（无 Sauerstoff、只在 Cytoplasma、wenig ATP，仅做分界识别不展开）—— dann rechnen.

AUFGABE A：Eine Muskelzelle wird ausreichend mit Sauerstoff versorgt und baut Glucose vollstaendig ab; genannt sind Mitochondrien-Aktivitaet und hoher ATP-Ertrag.
AUFGABE B：Eine Hefezelle baut Glucose ohne Sauerstoff ab; genannt sind Cytoplasma als Ort und geringer ATP-Ertrag.

HILFE: A nennt Sauerstoff plus Mitochondrien plus viel ATP -> Verfahren (i), Zellatmung. B nennt keinen Sauerstoff plus Cytoplasma plus wenig ATP -> Verfahren (ii), Gaerung.【选程序：题干出现 mit Sauerstoff / Mitochondrien / viel ATP 选有氧呼吸；出现 ohne Sauerstoff / nur Cytoplasma / wenig ATP 选发酵，只定性不定量。】

ANTWORT: A erfordert Verfahren (i): Die Zelle nutzt die Zellatmung mit Gesamtgleichung C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + Energie und erreicht ca. 30-32 ATP. B erfordert Verfahren (ii): Die Zelle nutzt die Gaerung ohne Sauerstoff im Cytoplasma mit deutlich geringerem ATP-Ertrag; Details sind auf EF-Niveau nicht gefordert.

Klausur-Satz: `Mit Sauerstoff dominiert die Zellatmung mit hohem ATP-Ertrag, ohne Sauerstoff bleibt nur die Gaerung mit geringem Ertrag.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die Gesamtgleichung der Zellatmung? | ANTWORT: C6H12O6 + 6 O2 -> 6 CO2 + 6 H2O + Energie (ATP + Waerme).
FRAGE: Nennen Sie die vier Phasen mit Ort. | ANTWORT: Glykolyse im Cytoplasma, oxidative Decarboxylierung in der Matrix, Citratzyklus in der Matrix, Atmungskette mit ATP-Synthese an der inneren Membran.
FRAGE: Warum stoppt Cyanid die ATP-Synthese? | ANTWORT: Cyanid blockiert Komplex IV, Elektronen erreichen Sauerstoff nicht mehr, der Protonengradient bricht zusammen und die ATP-Synthase bleibt stehen.

Klausur-Satz: `Ohne terminalen Elektronenakzeptor Sauerstoff bricht die oxidative Phosphorylierung zusammen.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"ATP 只在呼吸链产生，前三步与能量无关"。
   中文纠偏：前三步也产少量 ATP/GTP，更重要的是产出 NADH 与 FADH2——它们是呼吸链的"燃料"。没有前三步供电子，第四步就是无米之炊。
   Korrektur-Satz: `Glykolyse und Citratzyklus liefern neben wenig ATP vor allem NADH und FADH2 als Reduktionsaequivalente fuer die Atmungskette.`

2. 误解"氰化物中毒是因为血液里没有氧气了"。
   中文纠偏：恰恰相反，血氧可能正常，问题是细胞用不了氧。氰化物锁死复合体 IV，电子到不了氧气那一步，等于氧气"在场却接不到货"。
   Korrektur-Satz: `Cyanid blockiert Komplex IV, sodass Sauerstoff trotz Anwesenheit nicht als Elektronenakzeptor genutzt werden kann.`

## Schritt 7 — szenario

ROLLE: Du bist Tutorin in der EF und erklaerst einer Mitschuelerin die Zellatmung.
SITUATION: Deine Mitschuelerin versteht nicht, warum ein Gift wie Cyanid so schnell toetet, obwohl das Opfer normal atmet. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) die Gesamtgleichung, die vier Phasen mit Orten und die Rolle von Sauerstoff sowie Komplex IV.
RUBRIC (30 XP): Korrekte Gesamtgleichung (5 XP) | Vier Phasen mit Ort und Produkt korrekt (10 XP) | Sauerstoff als terminaler Akzeptor erklaert (10 XP) | Cyanid-Blockade von Komplex IV als Fazit (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：有氧呼吸 = 一方程四阶段一 locked 位点。一方程：C6H12O6 + 6 O2 → 6 CO2 + 6 H2O + 能量；四阶段：细胞质基质拆糖、基质脱羧与循环取电子、内膜呼吸链换 ATP；一锁点：氰化物锁复合体 IV。做题先看有无氧气：有氧走线粒体高产 ATP，无氧只认发酵低产（不展开）。记住一句话：前三步产 CO2 与电子载体，第四步用氧气换 ATP。
Takeaway-Satz: `Vier Phasen oxidieren Glucose zu CO2, die Atmungskette nutzt Sauerstoff zur ATP-Synthese; Cyanid stoppt Komplex IV und damit die Energieversorgung.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Tabelle der vier Phasen (Schritt 4) oder die Wahl zwischen Zellatmung und Gaerung (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst die Gesamtgleichung auswendig hin und ordne danach jede Phase einem Ort zu.
