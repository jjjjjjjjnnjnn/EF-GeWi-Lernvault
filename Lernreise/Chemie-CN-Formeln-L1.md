---
fach: Chemie
thema: "CN-Formelhandbuch: sechs Formelkarten"
level: 1
ziel: Klausur
xp: 100
operatoren: [nennen, berechnen, auswerten]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, CN]
version: Lesson-v3
---

# Lernreise: CN-Formelhandbuch und Klausurtransfer (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用六组公式卡（摩尔 / 浓度 / 气体 / pH / 氧化还原 / 平衡）在质量、体积、粒子数之间换算，且每一步带单位。
2. 中文：能把中文公式名准确译成德语 Klausur-Begriff（三语听写：中文 → 德语 → English）。
3. 中文：能给每个计算结果补一句数量级检查，并用德语评价其合理性。

Klausur-Satz: `Jede Rechnung beginnt mit der Formel, führt die Einheiten durch alle Schritte und endet mit einer Größenordnungsprüfung.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下（括号内为 English）：

- 物质的量 n — die Stoffmenge n（amount of substance）：计数单位，1 mol = 6,022 * 10^23 个粒子。
- 浓度 c — die Konzentration c（concentration）：单位体积溶液中的摩尔数，c = n/V。
- 气体定律 — das Gasgesetz（gas law）：pV = nRT，连接压强、体积、温度与摩尔。
- pH 值 — der pH-Wert（pH value）：pH = -lg[H3O+]，酸碱的对数标尺。
- 质量作用定律 — das Massenwirkungsgesetz (MWG)（law of mass action）：K_c 表达式，判断平衡位置。

Klausur-Satz: `Mit dem Ansatz c = n/V folgt die Konzentration einschließlich Einheit; die Größenordnung wird durch Vergleich mit Alltagswerten geprüft.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：中国化学把定量计算压缩成六张公式卡，德国 Klausur 考的是"同一公式 + 单位 + 数量级评价"。六张卡不是并列的，而是围着一个中心桥墩 n（物质的量）转：质量走 n = m/M，粒子数走 N = n * N_A，气体体积走 V = n * V_m（标况）或 pV = nRT，溶液走 c = n/V；再由 n 发散到 pH = -lg[H3O+]、氧化还原的电子守恒、以及平衡的 K_c。做题永远"两步走"：第一步把已知量归集到 n，第二步用化学计量比（系数比）跳到目标物质的 n，再走支路换成目标量。最忌讳的是"两端非 n 量硬算"——比如拿克数直接乘浓度，量纲立刻就错。每算完一步，问自己一句：这个数字的量级合理吗？

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
                 Masse m (g)
                     |  n = m/M
                     v
 Teilchenzahl N <--> n (mol) <--> V (Gas, L)
   N = n * N_A        |            V = n * V_m
                      |  c = n/V
                      v
              Konzentration c (mol/L)
                      |
        +-------------+-------------+
        v             v             v
   pH = -lg[H3O+]   Redox      K_c (MWG)
                    (e- Erhaltung)

  Zwei-Schritt-Regel:  Ausgangsgroesse -> n1 -> (Koeffizienten) -> n2 -> Zielgroesse
```

三张常用卡的细节（易错点）：
1. 气体卡：标况用 V_m = 22,4 L/mol；非标况一律走 pV = nRT（R = 8,314 J/(mol*K)，温度用 K）。
2. pH 卡：pH = -lg[H3O+]，pOH = -lg[OH-]，pH + pOH = 14（仅 25 °C）；稀释 10 倍 pH 升 1。
3. 平衡卡：K_c = 产物浓度^系数 / 反应物浓度^系数；纯固体与纯液体不写入（如 CaCO3(s) <-> CaO(s) + CO2(g) 的 K_c = [CO2]）。
4. 氧化还原卡：电子守恒 Σ n(e- 失) = Σ n(e- 得)；氧化数升高的是还原剂，降低的是氧化剂。

量级标尺（做完顺手一比）：1 mol 气体标况约 22,4 L；0,5 mol/L 是普通糖水量级；pH 差 1 = 浓度差 10 倍。养成"算完先看量级"的习惯，很多单位与指数错误会在这一步被自动抓出。

Klausur-Satz: `Alle quantitativen Aufgaben führen über die Stoffmenge n als zentralen Knoten, von dem aus die Zielgröße über die passende Formel bestimmt wird.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der italienische Forscher Avogadro erkannte schon früh, dass gleiche Gasvolumina bei gleichem Druck und gleicher Temperatur die gleiche Anzahl von Teilchen enthalten. Die berühmte Zahl 6,022 * 10^23, die heute seinen Namen trägt, hat er selbst jedoch nie gekannt: Sie wurde erst lange nach seinem Tod bestimmt und dann nach ihm benannt. Bis heute ist das Mol damit vor allem eines – eine reine Zähleinheit, die Masse und Teilchenzahl verbindet.

**中文解读**: 阿伏伽德罗提出了"同温同压同体积气体含等数粒子"的猜想，却从未见过以他命名的那个常数——这恰好印证本节的中心思想：n 是一个计数单位，本身既不是质量也不是体积，而是把 m、N、V、c 全部串起来的中心桥墩。

**Bezug zum Konzept**: Das Mol ist die zentrale Zähleinheit, über die Masse, Teilchenzahl und Volumen erst vergleichbar werden.

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen & auswerten, AFB II)：Bearbeiten Sie drei Teilaufgaben.
(a) 0,40 mol eines Stoffes werden in 0,80 L Wasser gelöst. Berechnen Sie die Konzentration c.
(b) Eine Lösung hat c(H3O+) = 1,0 * 10^-4 mol/L. Berechnen Sie den pH-Wert und die Hydroxidionenkonzentration (Kw = 1,0 * 10^-14 (mol/L)^2).
(c) Geben Sie für N2(g) + 3 H2(g) <-> 2 NH3(g) den Ausdruck für die Gleichgewichtskonstante K_c an.

HILFE:
1. Schritt 1: (a) Formel c = n/V aufschreiben, dann einsetzen, Einheit mol/L.
2. Schritt 2: (b) pH = -lg[H3O+] direkt lesen; danach [OH-] = Kw / [H3O+].
3. Schritt 3: (c) K_c = Produkte^Koeffizient / Edukte^Koeffizient; Gase werden aufgenommen.

MUSTERLÖSUNG: (a) Es gilt c = n/V = 0,40 mol / 0,80 L = 0,50 mol/L. Dies ist die Größenordnung einer normalen Zuckerlösung, also plausibel. (b) Der pH-Wert folgt direkt aus dem Exponenten: pH = -lg(1,0 * 10^-4) = 4,00. Für die Hydroxidionenkonzentration gilt [OH-] = Kw / [H3O+] = 1,0 * 10^-14 / 1,0 * 10^-4 = 1,0 * 10^-10 mol/L. Kontrolle über pH + pOH = 14: pOH = 14 - 4 = 10, also [OH-] = 10^-10 mol/L, was übereinstimmt. (c) Der Ausdruck lautet K_c = [NH3]^2 / ([N2] * [H2]^3); die Exponenten sind die Koeffizienten, und alle beteiligten Stoffe sind Gase, werden also aufgenommen.

Klausur-Satz: `Der pH-Wert folgt aus dem Exponenten der Oxoniumionenkonzentration, und die Hydroxidionenkonzentration ergibt sich aus dem Ionenprodukt des Wassers.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：浓度眼 vs. 质量分数眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目给的是 (i) Konzentrations-Verfahren（给了体积 V in L，问"溶液多浓"用 c = n/V）还是 (ii) Massenanteil-Verfahren（给了总质量 m in g，问"溶液多稠"用 w = m_Stoff / m_Lösung）—— dann lösen.

AUFGABE A：In 0,50 L einer wässrigen Lösung sind 0,20 mol Natriumchlorid gelöst. Berechnen Sie die Konzentration c.

AUFGABE B：In 25 g einer Salzlösung sind 5,0 g Salz enthalten. Berechnen Sie den Massenanteil w.

HILFE: A nennt ein Volumen in Liter und verlangt eine Konzentration → Verfahren (i). B nennt Massen in Gramm und verlangt einen Anteil → Verfahren (ii).【选程序：题干出现"L / 体积" = 浓度程序 c = n/V；题干出现"g / 总质量" = 质量分数程序 w = m/m。】

ANTWORT: A erfordert Verfahren (i): c = n/V = 0,20 mol / 0,50 L = 0,40 mol/L; dies ist die Größenordnung einer verdünnten Salzlösung und damit plausibel. B erfordert Verfahren (ii): w = m_Stoff / m_Lösung = 5,0 g / 25 g = 0,20, das heißt ein Massenanteil von 20 %; eine solche Lösung ist deutlich konzentrierter als die in Teilaufgabe A. Die beiden Verfahren unterscheiden sich grundlegend: c rechnet über das Volumen (mol/L), w über die Masse (ohne Einheit bzw. Prozent).

Klausur-Satz: `Die Konzentration wird über das Volumen berechnet, während der Massenanteil das Verhältnis zweier Massen angibt.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welche Formel verbindet Stoffmenge und Konzentration? | ANTWORT: c = n/V, wobei V das Volumen der Lösung in Litern ist.
FRAGE: Wie lautet die Definition des pH-Wertes in Formelschreibweise? | ANTWORT: pH = -lg[H3O+], also der negative dekadische Logarithmus der Oxoniumionenkonzentration.
FRAGE: Warum wird beim Aufstellen von K_c ein reiner Feststoff nicht berücksichtigt? | ANTWORT: Weil seine Konzentration konstant ist und deshalb nicht in den Ausdruck aufgenommen wird.

Klausur-Satz: `Die sechs Formelkarten greifen über die Stoffmenge ineinander; Einheiten und Größenordnungsprüfung machen sie klausurtauglich.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"pH 3 比 pH 5 只酸一点"。
   中文纠偏：pH 是对数标尺，差 2 个单位等于氢离子浓度差 100 倍。换算要用 [H3O+] = 10^-pH：pH 3 是 10^-3 mol/L，pH 5 是 10^-5 mol/L，相差百倍，绝不是"一点"。
   Korrektur-Satz: `Da der pH-Wert logarithmisch definiert ist, entspricht ein Unterschied von zwei Einheiten dem Faktor 100 in der Oxoniumionenkonzentration.`

2. 误解"V_m = 22,4 L/mol 在任何条件下都能用"。
   中文纠偏：22,4 L/mol 只在标准状况（0 °C, 101,3 kPa）成立。温度或压强一变，必须改用 pV = nRT。直接把室温数据代 22,4 是高频知识性错误。
   Korrektur-Satz: `Das molare Volumen V_m = 22,4 L/mol gilt nur im Standardzustand; bei anderen Bedingungen wird das Gasgesetz pV = nRT verwendet.`

## Schritt 7 — szenario

ROLLE: Du hilfst als Tutor beim "Formeldiktat" für eine EF-Klausurvorbereitung.
SITUATION: Eine Mitschülerin soll drei Aufgaben unter Zeitdruck lösen: (1) Sie soll die deutsche Bezeichnung der chinesischen Größe "摩尔浓度" nennen, (2) aus 0,30 mol in 0,60 L die Konzentration berechnen und (3) aus [H3O+] = 10^-5 mol/L den pH-Wert ableiten. Erkläre ihr in einer zusammenhängenden Antwort (ca. 150 Wörter) die drei Formelkarten, führe die Rechnungen vollständig mit Einheiten durch und schließe mit einer Größenordnungsprüfung.
RUBRIC (30 XP): Korrekte Übersetzung 摩尔浓度 -> die Konzentration c (6 XP) | Rechnung c = 0,30/0,60 = 0,50 mol/L mit Einheit (8 XP) | pH = -lg(10^-5) = 5,00 (8 XP) | Größenordnungsprüfung und deutsche Fachsprache (8 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：六卡口诀——摩、浓、气、pH、氧、衡。所有计算都围着一个中心桥墩 n 转，两步走：先把已知量归集到 n，再用系数比跳到目标物质的 n，最后走支路换成目标量。三件事缺一不可：公式先写出、单位全程带、算完做量级检查。选程序看单位：给 L 选浓度程序，给 g 选质量分数程序；酸碱题先判强弱；平衡题记住纯固体不写入 K_c。
Takeaway-Satz: `Die Formel trägt Einheiten, und das Ergebnis trägt eine Prüfung; alle Größen laufen über die Stoffmenge n.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Umrechnung über die Stoffmenge (Schritt 4) oder die Wahl zwischen Konzentration und Massenanteil (Schritt 5)?
2. 元认知计划：Beim nächsten Mal lese ich zuerst die Einheit im Aufgabentext (L oder g), wähle danach die Formelkarte und schreibe die Einheit sofort hinter das Ergebnis.
