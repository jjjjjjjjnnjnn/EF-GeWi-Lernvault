---
fach: Chemie
thema: "Chemische Grundlagen: Atombau, Bindung, Gleichungen, Mol"
level: 1
ziel: Klausur
xp: 100
operatoren: [nennen, begruenden, darstellen, berechnen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Grundlagen]
version: Lesson-v3
---

# Lernreise: Chemische Grundlagen (Atombau, Bindung, Gleichungen, Mol) (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能从质子数与电子排布推断周期与主族，并解释同族性质的相似与递变。
2. 中文：能根据成键伙伴判断离子键/共价键/金属键，并把方程式配平（只调系数）。
3. 中文：能用 n = m/M、N = n * N_A、c = n/V 在质量、粒子数、浓度间换算，且结果带单位并做量级检查。

Klausur-Satz: `Die Stellung im Periodensystem folgt aus der Elektronenkonfiguration: Die Periode gibt die Schalenanzahl, die Hauptgruppe die Anzahl der Valenzelektronen an.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 质子/中子/电子 — Proton / Neutron / Elektron：质子数决定元素种类，价电子决定化学行为。
- 周期/族 — Periode / Gruppe：周期 = 电子层数，主族 = 价电子数。
- 离子键/共价键/金属键 — Ionenbindung / Elektronenpaarbindung / Metallbindung：金属+非金属多为离子键，非金属之间为共价键，金属之间为金属键。
- 化学方程式/化学计量数 — Reaktionsgleichung / Koeffizient：配平只改系数，绝不改下标。
- 物质的量/摩尔/摩尔质量 — Stoffmenge n / Mol / molare Masse M：n 单位 mol，是计数单位，不是质量。

Klausur-Satz: `Die Bindungsart folgt aus den Bindungspartnern: Metall und Nichtmetall bilden Ionen, zwei Nichtmetalle teilen Elektronenpaare.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：化学的地基只有四块砖，顺序不能乱：原子结构 → 周期表位置 → 成键方式 → 方程式与计算。第一块，质子数（= 核电荷数 = 元素序号）决定"这是什么元素"，中子数只区分同位素；电子层数等于周期数，价电子数等于主族序数。第二块，位置决定行为：同族价电子相同所以性质相似，同周期从左到右原子半径减小、金属性减弱（口诀：层同看核，核大吸得紧）。第三块，成键只看"谁和谁"：金属+非金属 → 离子键（得失电子），非金属+非金属 → 共价键（共用电子对），金属+金属 → 金属键（电子海）。第四块，配平只调系数（大数字），检查标准是"两边每种原子的个数相等"；配平完成后，系数比才等于摩尔比，n = m/M 才能安全地往下算。这四块砖串起来，就是 EF 全部定量题的起点。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Na-23  (Z = 11, A = 23)
   Protonen  = 11   (bestimmt das Element)
   Elektronen = 11  (neutrales Atom)
   Neutronen = 23 - 11 = 12

   Schalen:  K:2  L:8  M:1   -> 3. Periode, 1. Hauptgruppe
   Valenzelektronen = 1  ->  Alkalimetall, bildet Na+

Bindung aus den Partnern:
   Metall + Nichtmetall  -> Ionenbindung      (z.B. MgO: Mg2+ / O2-)
   Nichtmetall + Nichtmetall -> Elektronenpaarbindung (z.B. Cl2)
   Metall + Metall       -> Metallbindung

Ausgleichen (nur Koeffizienten!):
   C3H8 + 5 O2 -> 3 CO2 + 4 H2O
   C 3:3   H 8:8   O 10:10   ->  Massenerhaltung erfuellt
```

配平四步口诀（金 → 非金属 → H → O）：先配金属原子，再配除 O、H 外的非金属，接着配 H，最后配 O；每步只动系数。检查标准永远是"两边每种原子个数相等"，这就是质量守恒的书写形式。

摩尔三把钥匙 + 四步流程：n = m/M（质量↔摩尔）、N = n * N_A（粒子数↔摩尔）、c = n/V（浓度↔摩尔）。计算四步：写公式 → 代入带单位 → 结果带单位 → 数量级检查（量级：H 1, C 12, O 16, Na 23, Cl 35,5）。

周期表趋势一句话：同族从上到下原子半径增大、金属性增强（Na < K < Rb）；同周期从左到右原子半径减小、金属性减弱、非金属性增强。口诀"层同看核，核大吸得紧"——同周期电子层相同，核电荷越大对电子吸引越紧，半径越小。

Klausur-Tipp：定量题必须"公式 → 代入 → 单位 → 检验"四件套齐全；只写答案不给 Ansatz，按 berechnen 的官方释义是不给分的。养成每步都带单位、结尾都做量级检查的习惯，就能拿到全部过程分。

Klausur-Satz: `Eine Reaktionsgleichung ist richtig ausgeglichen, wenn die Anzahl der Atome jedes Elements auf beiden Seiten gleich ist.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der russische Chemiker Mendelejew ordnete die damals bekannten Elemente nach ihrer Masse und erkannte dabei ein Muster. Weil einige Plätze in seinem System leer blieben, ließ er Lücken und sagte die Eigenschaften der noch unbekannten Elemente voraus. Als diese später tatsächlich entdeckt wurden, stimmten ihre Eigenschaften überraschend gut mit seinen Vorhersagen überein.

**中文解读**: 门捷列夫敢"留空位"，是因为他相信位置决定性质——这正是本节第一、二块砖：质子数定身份，价电子定行为，同族性质相似。一个能预测未知元素的表格，才配叫"周期表"。

**Bezug zum Konzept**: Die Stellung im Periodensystem bestimmt die Eigenschaften eines Elements, sodass unbekannte Elemente vorhergesagt werden können.

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: lego]

AUFGABE (darstellen & berechnen, AFB II)：8,0 g Methan (CH4, M = 16 g/mol) werden vollständig verbrannt. Stellen Sie die Reaktionsgleichung auf, gleichen Sie sie aus und berechnen Sie die Stoffmenge des entstehenden Kohlendioxids sowie das Volumen dieses Gases im Standardzustand (V_m = 22,4 L/mol).

HILFE:
1. Schritt 1: Schreibe die Wortgleichung in Formeln: CH4 + O2 -> CO2 + H2O.
2. Schritt 2: Gleiche nur mit Koeffizienten aus (C, dann H, dann O).
3. Schritt 3: Berechne n(CH4) = m/M.
4. Schritt 4: Nutze das Koeffizientenverhältnis (1:1 für CO2) und dann V = n * V_m.

MUSTERLÖSUNG: Die ungeglichene Gleichung lautet CH4 + O2 -> CO2 + H2O. Ausgleichen ergibt CH4 + 2 O2 -> CO2 + 2 H2O; Kontrolle: C 1:1, H 4:4, O 4:4, die Massenerhaltung ist erfüllt. Für die Stoffmenge gilt n(CH4) = m/M = 8,0 g / 16 g/mol = 0,50 mol. Da die Koeffizienten von CH4 und CO2 beide 1 sind, folgt n(CO2) = 0,50 mol. Das Volumen im Standardzustand ist V(CO2) = n * V_m = 0,50 mol * 22,4 L/mol = 11,2 L. Die Größenordnung ist plausibel: Aus einer kleinen Portion Methan entsteht ein Gasvolumen von etwa 11 L, was dem Volumen eines größeren Ballons entspricht.

Klausur-Satz: `Nach dem Ausgleichen gibt das Koeffizientenverhältnis das Stoffmengenverhältnis an, sodass aus n(CH4) direkt n(CO2) folgt.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：结构眼 vs. 计量眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目问的是 (i) Struktur-Verfahren（原子结构、周期表位置、成键类型，用 nennen / begruenden）还是 (ii) Stoffmengen-Verfahren（质量、摩尔、粒子数、浓度，用 berechnen）—— dann lösen.

AUFGABE A：Das Nuklid Na-23 ist gegeben. Nennen Sie Protonen-, Elektronen- und Neutronenzahl eines neutralen Atoms und ordnen Sie Natrium in Periode und Hauptgruppe ein.

AUFGABE B：6,5 g Zink (Zn, M = 65 g/mol) reagieren vollständig nach Zn + 2 HCl -> ZnCl2 + H2. Berechnen Sie die Stoffmenge des entstehenden Wasserstoffs.

HILFE: A fragt nach Kernbausteinen und Stellung im Periodensystem ohne Rechnung → Verfahren (i). B gibt eine Masse und verlangt eine Stoffmenge → Verfahren (ii).【选程序：题目问"是什么/在哪/什么键" = 结构程序（定性，nennen/begruenden）；题目给质量或体积要算摩尔 = 计量程序（定量，berechnen）。】

ANTWORT: A erfordert Verfahren (i): Natrium hat 11 Protonen und im neutralen Atom 11 Elektronen; die Neutronenzahl ist 23 - 11 = 12. Mit der Schalenbesetzung 2 / 8 / 1 liegt es in der 3. Periode und der 1. Hauptgruppe und ist damit ein Alkalimetall. B erfordert Verfahren (ii): Zuerst gilt n(Zn) = m/M = 6,5 g / 65 g/mol = 0,10 mol. Da Zn und H2 im Verhältnis 1:1 stehen, folgt n(H2) = 0,10 mol.

Klausur-Satz: `Die Kernbausteine und die Stellung im Periodensystem werden aus der Nuklidangabe abgeleitet, während Stoffmengen aus der Masse über n = m/M berechnet werden.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Was bestimmt die Ordnungszahl eines Elements? | ANTWORT: Die Anzahl der Protonen im Atomkern, die zugleich die Ordnungszahl und damit das Element festlegt.
FRAGE: Warum darf man beim Ausgleichen nur Koeffizienten ändern? | ANTWORT: Eine Änderung der Indizes würde eine andere Verbindung erzeugen; nur Koeffizienten erhalten die Stoffidentität.
FRAGE: Wie lautet die Beziehung zwischen Masse und Stoffmenge? | ANTWORT: n = m/M, wobei M die molare Masse in g/mol ist.

Klausur-Satz: `Die Massenerhaltung fordert gleiche Atomanzahlen auf beiden Seiten, und die Stoffmenge verbindet Masse und Teilchenzahl über die molare Masse.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"1 mol 就是 1 g"。
   中文纠偏：mol 是计数单位（1 mol = 6,022 * 10^23 个粒子），g 是质量单位，两者维度不同，桥梁是摩尔质量 M。例如 1 mol Na 的质量是 23 g，不是 1 g；换算前必须先查 M。
   Korrektur-Satz: `Das Mol zählt Teilchen, während das Gramm die Masse angibt; verbunden werden beide über die molare Masse M.`

2. 误解"配平时可以顺手改下标把原子数凑齐"。
   中文纠偏：绝对不行。下标属于物质本身，改下标等于换了物质（H2O 改成 H2O2 就是过氧化氢）。配平只能改系数（大数字），改完后用"两边每种原子个数相等"来检查。
   Korrektur-Satz: `Beim Ausgleichen werden ausschließlich die Koeffizienten verändert, niemals die Indizes, da sonst eine andere Verbindung entsteht.`

## Schritt 7 — szenario

ROLLE: Du bist EF-Tutor und erklärst einer Mitschülerin den Zusammenhang zwischen Atombau, Bindung und Rechnung.
SITUATION: Die Mitschülerin hat drei Aufgaben verwechselt: (1) Sie soll Natrium im Periodensystem einordnen, (2) sie soll begründen, warum MgO eine Ionenbindung ist, und (3) sie soll aus 4,0 g NaOH (M = 40 g/mol) die Stoffmenge berechnen. Erkläre ihr in einer zusammenhängenden Antwort (ca. 150 Wörter), welches Verfahren zu welcher Aufgabe gehört und führe die Rechnung zu (3) vollständig durch.
RUBRIC (30 XP): Zuordnung der drei Aufgaben zu Struktur- bzw. Stoffmengen-Verfahren (8 XP) | Korrekte Einordnung von Na (3. Periode, 1. Hauptgruppe) (6 XP) | Begründung der Ionenbindung in MgO aus den Bindungspartnern (8 XP) | Vollständige Rechnung n = 4,0/40 = 0,10 mol mit Einheit (8 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：四块地基砖按顺序排：质子定身份、价电子定行为、伙伴定键型、系数定摩尔。做题先选程序——问"是什么、在哪、什么键"走结构程序（定性，用 nennen/begruenden）；给质量或体积要算量走计量程序（定量，用 n = m/M、N = n * N_A、c = n/V）。永远记住：配平只改系数不改下标，算出结果必须带单位并做量级检查。
Takeaway-Satz: `Die Atomanzahl bleibt erhalten, und die Stoffmenge verbindet Teilchenzahl und Masse über die molare Masse.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Ausgleichen der Gleichung (Schritt 4) oder die Wahl zwischen Struktur- und Stoffmengen-Verfahren (Schritt 5)?
2. 元认知计划：Beim nächsten Mal prüfe ich zuerst, ob die Aufgabe eine Rechnung verlangt oder eine Begründung, und schreibe vor dem Rechnen immer die Einheiten auf.
