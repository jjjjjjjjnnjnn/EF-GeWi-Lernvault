---
fach: Chemie
thema: "Zwischenmolekulare Kraefte und Stoffeigenschaften"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, vergleichen, erklaeren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Bindungslehre]
version: Lesson-v3
---

# Lernreise: Zwischenmolekulare Kraefte und Stoffeigenschaften (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能一句话分清分子内的共价键与分子之间的作用力，并说明沸腾、熔化时断的只是后者。
2. 中文：能把 Van-der-Waals-Kraefte / Dipol-Dipol / Wasserstoffbruecken 按强度排序，并用它解释沸点差异。
3. 中文：能用"相似相溶"判断溶解性，并写出 AFB II 水平的德语解释句。

Klausur-Satz: `Beim Sieden werden nur die zwischenmolekularen Kräfte überwunden, während die kovalenten Atombindungen innerhalb der Moleküle unverändert erhalten bleiben.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 分子间作用力 — Zwischenmolekulare Kräfte (ZMK)：分子与分子之间的吸引力，决定沸点、熔点与溶解度。
- 范德华力 — Van-der-Waals-Kräfte (Dispersionskräfte)：瞬时偶极诱导相邻分子，存在于所有分子之间；接触面积越大越强。
- 偶极-偶极相互作用 — Dipol-Dipol-Wechselwirkung：永久偶极分子正负两端之间的静电吸引。
- 氢键 — Wasserstoffbrückenbindung：H 与电负性大、半径小的 F/O/N 相连时形成的强分子间作用力。
- 相似相溶 — Gleiches löst sich in Gleichem：极性物质溶于极性溶剂，非极性物质溶于非极性溶剂。

Klausur-Satz: `Mit zunehmender Kettenlänge und Moleküloberfläche wachsen die Van-der-Waals-Kräfte, während polare O-H-Gruppen zusätzlich Wasserstoffbrücken ausbilden.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：分子间作用力（ZMK）是一把"看不见的胶水"，它把一个个已经成型的分子黏在一起。这里有一条铁律：沸腾时断裂的只是分子之间的吸引力，分子内部的 C-C、C-H、O-H 共价键完好无损。三种 ZMK 的强度是阶梯式的：范德华力最弱（0,1 - 10 kJ/mol），偶极-偶极居中（5 - 25 kJ/mol），氢键最强（10 - 40 kJ/mol），而共价键高达 200 - 500 kJ/mol——差了一个数量级，所以加热到沸腾根本动不了共价键。判断顺序永远是两步：先看有没有 O-H 或 N-H（有 → 上氢键），再看是不是永久偶极（有 → 加偶极-偶极），剩下的就是纯范德华力；同系列里再比分子链长（链越长，接触面积越大，范德华力越强）。这就是"结构决定性质"在 EF 考卷里的全部内核。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Energie pro Teilchen (kJ/mol)      beim Sieden?
  kovalente Bindung  [#########] 200-500    NEIN  (bleibt erhalten)
  Wasserstoffbruecke [##]         10-40     JA    (wird ueberwunden)
  Dipol-Dipol        [#]           5-25     JA
  Van-der-Waals      [.]         0,1-10     JA
  ---------------------------------------------
  Siedetemperatur bei M ~ 58-60 g/mol:
   -0,5 C  Butan        CH3-CH2-CH2-CH3   nur VdW      |#
  +49  C  Propanal      CH3-CH2-CHO       VdW + Dipol  |###
  +97  C  Propan-1-ol   CH3-CH2-CH2-OH    VdW + H-Bruecke |#######
```

速判三步（考场上 10 秒定位）：
1. Schritt A：找 O-H / N-H / F-H —— 有，就上氢键（最强），直接定主调。
2. Schritt B：看是否永久偶极（极性键 + 不对称构型，如 C=O、C-Cl）—— 有，就在范德华力之上加偶极-偶极。
3. Schritt C：都不满足，就是纯范德华力；此时再比分子链长（接触面积），链越长越强。

Zahlenanker（背下来当标尺）：范德华力 0,1 - 10 kJ/mol，偶极-偶极 5 - 25 kJ/mol，氢键 10 - 40 kJ/mol，共价键 200 - 500 kJ/mol。任何解释题只要把"作用力类型 → 强度 → 沸点高低"串成一条链，就不会丢分。

溶解度同理：极性分子（含 O-H 的醇、羧酸）溶于水，非极性分子（烷烃）溶于正己烷，这就是"相似相溶"（Gleiches löst sich in Gleichem）。判断溶解性时，先看分子的极性，再套这条规则即可。

Klausur-Tipp：比较题的固定句式是"Obwohl ... , unterscheiden sich ... , weil ..."。先用 obwohl 引出"看似相同"（如摩尔质量相近），再用 weil 给出真正原因（作用力类型不同），最后落到宏观性质（沸点/溶解度）。这三段式能直接套进任何一道比较解释题。

常见追问："为什么水比同族 H2S 沸点高得多？"答：水分子间形成氢键，H2S 分子间只有偶极-偶极和范德华力，因此水的沸点异常高。这一对比几乎是每年必考的经典例证。

Klausur-Satz: `Da Wasserstoffbrücken deutlich stärker sind als Van-der-Waals-Kräfte, benötigen Moleküle mit O-H-Gruppen eine wesentlich höhere thermische Energie zum Sieden.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wasser hat eine erstaunliche Eigenschaft: Eis ist leichter als flüssiges Wasser und schwimmt deshalb oben. Der Grund liegt in den Wasserstoffbrücken: Beim Gefrieren ordnen sich die Moleküle in einem offenen Gitter an, in dem mehr leerer Raum bleibt als in der flüssigen Phase. Ohne diese Anomalie würde Eis auf den Grund von Seen sinken, und viele Lebewesen könnten den Winter kaum überleben.

**中文解读**: 冰的密度反常是氢键"看得见"的后果——氢键把水分子撑成一个松散的空架，比液态还占地方。它同时解释了水的异常高沸点：同样是氢键，让水到 100 °C 才沸腾，而不是像同族的 H2S 那样早已气化。

**Bezug zum Konzept**: Die Dichteanomalie des Eises entsteht durch das offene Wasserstoffbrücken-Gitter und zeigt, wie stark diese zwischenmolekulare Kraft ist.

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (vergleichen & erklaeren, AFB II)：Die drei Stoffe Butan (C4H10, M = 58 g/mol, Sdp. -0,5 °C), Propanal (C3H6O, M = 58 g/mol, Sdp. +49 °C) und Propan-1-ol (C3H8O, M = 60 g/mol, Sdp. +97 °C) besitzen nahezu gleiche molare Massen. Vergleichen Sie die Siedetemperaturen und erklären Sie den Unterschied mit den wirkenden zwischenmolekularen Kräften.

HILFE:
1. Schritt 1: Bestimme für jedes Molekül die Polarität und suche nach O-H- oder N-H-Gruppen.
2. Schritt 2: Ordne jedem Stoff die stärkste wirkende zwischenmolekulare Kraft zu.
3. Schritt 3: Verbinde die Kraftstärke mit dem Energieaufwand beim Sieden und nenne die Siedetemperatur.

MUSTERLÖSUNG: Butan ist ein unpolares Kohlenwasserstoffmolekül; zwischen seinen Molekülen wirken ausschließlich schwache Van-der-Waals-Kräfte, daher siedet es bereits bei -0,5 °C. Propanal (CH3-CH2-CHO) besitzt wegen der polaren Carbonylgruppe ein permanentes Dipolmoment, sodass neben den Van-der-Waals-Kräften zusätzliche Dipol-Dipol-Wechselwirkungen auftreten; das erklärt den höheren Siedepunkt von +49 °C. Propan-1-ol (CH3-CH2-CH2-OH) enthält eine polare O-H-Gruppe und kann zwischen den Molekülen Wasserstoffbrücken ausbilden. Da deren Überwindung deutlich mehr Energie erfordert, steigt der Siedepunkt auf +97 °C. Obwohl alle drei Stoffe eine nahezu gleiche molare Masse haben, wächst die Siedetemperatur in der Reihenfolge Van-der-Waals < Dipol-Dipol < Wasserstoffbrücke.

Klausur-Satz: `Bei vergleichbarer molarer Masse steigt die Siedetemperatur in der Reihenfolge Van-der-Waals-Kräfte, Dipol-Dipol-Wechselwirkungen, Wasserstoffbrückenbindungen.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：链长眼 vs. 氢键眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目问的是 (i) Van-der-Waals-Verfahren（非极性分子，比较链长与接触面积）还是 (ii) Wasserstoffbrücken-Verfahren（存在 O-H / N-H / F-H，比较氢键强弱）—— dann lösen.

AUFGABE A：Pentan (C5H12) siedet bei +36 °C, Ethan (C2H6) bei -89 °C. Erklären Sie den Unterschied.

AUFGABE B：Ethanol (CH3-CH2-OH) siedet bei +78 °C, Dimethylether (CH3-O-CH3) bei -24 °C, obwohl beide die molare Masse 46 g/mol besitzen. Erklären Sie den Unterschied.

HILFE: A nennt zwei unpolare Alkane ohne O-H-Gruppe → Verfahren (i). B nennt zwei Stoffe gleicher Masse, von denen nur einer eine O-H-Gruppe trägt → Verfahren (ii).【选程序：无 O-H / N-H = 范德华程序（比链长）；有 O-H / N-H = 氢键程序（比氢键）。】

ANTWORT: A erfordert Verfahren (i): Beide Moleküle sind unpolar, sodass nur Van-der-Waals-Kräfte wirken. Pentan besitzt jedoch eine längere Kohlenstoffkette und damit eine größere Moleküloberfläche, wodurch die Van-der-Waals-Kräfte stärker sind und zum Sieden mehr Energie nötig ist; deshalb liegt der Siedepunkt von Pentan um 125 °C höher. B erfordert Verfahren (ii): Dimethylether hat nur einen permanenten Dipol, sodass lediglich Dipol-Dipol-Wechselwirkungen wirken. Ethanol besitzt dagegen eine O-H-Gruppe und bildet zwischen den Molekülen Wasserstoffbrücken, deren Überwindung viel Energie kostet; daher siedet Ethanol trotz gleicher molarer Masse um 102 °C höher.

Klausur-Satz: `Bei gleicher molarer Masse entscheidet das Vorhandensein einer O-H-Gruppe über die Siedetemperatur, weil Wasserstoffbrücken stärker als Dipol-Dipol-Wechselwirkungen sind.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welche Kräfte werden beim Verdampfen einer Flüssigkeit überwunden? | ANTWORT: Es werden nur die zwischenmolekularen Kräfte überwunden; die kovalenten Atombindungen innerhalb der Moleküle bleiben erhalten.
FRAGE: Unter welcher Bedingung kann ein Molekül Wasserstoffbrücken ausbilden? | ANTWORT: Wenn ein Wasserstoffatom kovalent an ein kleines, stark elektronegatives Atom wie F, O oder N gebunden ist.
FRAGE: Warum steigt der Siedepunkt innerhalb der Alkane mit wachsender Kettenlänge? | ANTWORT: Mit der Kettenlänge wächst die Moleküloberfläche, wodurch die Van-der-Waals-Kräfte stärker werden und mehr Energie zum Sieden nötig ist.

Klausur-Satz: `Je stärker die zwischenmolekularen Kräfte, desto mehr Energie ist erforderlich, um den Siedezustand zu erreichen.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"液体沸腾时分子内的共价键被热打断"。
   中文纠偏：完全不对。沸腾只跨越分子之间的吸引力，分子内部的 C-C、O-H 共价键强度高出两个数量级，根本不会被普通加热打断。若共价键真的断裂，那就是化学分解（如糖焦化），不是物理沸腾。
   Korrektur-Satz: `Beim Sieden werden ausschließlich zwischenmolekulare Kräfte überwunden, nicht die kovalenten Bindungen innerhalb der Moleküle.`

2. 误解"摩尔质量越大，沸点一定越高"。
   中文纠偏：这条规律只在同类物质内部成立，一旦出现氢键就会失效。例如甲醇 CH3-OH（M = 32 g/mol）沸点 +65 °C，反而高于丙烷 C3H8（M = 44 g/mol）的 -42 °C——正是氢键把甲醇的沸点抬了上去。比较沸点必须先看作用力类型，再看摩尔质量。
   Korrektur-Satz: `Die molare Masse bestimmt den Siedepunkt nur innerhalb einer Stoffklasse; Wasserstoffbrücken können diesen Zusammenhang überlagern.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor in der EF-Chemie und erklärst einer Mitschülerin den Stoff "zwischenmolekulare Kräfte".
SITUATION: Auf dem Tisch stehen drei Gefäße mit Ethan (C2H6), Methanol (CH3-OH) und Wasser (H2O). Die Mitschülerin wundert sich, dass Ethan schon bei -89 °C gasförmig ist, Methanol erst bei +65 °C siedet und Wasser sogar erst bei +100 °C. Verfasse eine zusammenhängende Erklärung (ca. 150 Wörter), die die drei Siedetemperaturen mit den jeweils wirkenden zwischenmolekularen Kräften begründet.
RUBRIC (30 XP): Nennung der drei Krafttypen (Van-der-Waals, Dipol-Dipol, Wasserstoffbrücken) (6 XP) | Zuordnung jeder Kraft zum jeweiligen Stoff mit Begründung aus der Struktur (10 XP) | Verknüpfung von Kraftstärke und Energieaufwand beim Sieden (8 XP) | Korrekte Fachsprache und klarer Vergleichssatz (6 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：沸点、熔点、溶解度的幕后推手不是共价键，而是分子之间的"黏力"。判断顺序固定两步：先看有没有 O-H / N-H / F-H（有 → 氢键程序），再看是不是永久偶极（有 → 偶极-偶极程序），否则就是范德华程序；同系列里再比链长。记住能量阶梯——范德华 0,1-10，偶极 5-25，氢键 10-40，共价键 200-500 kJ/mol——这串数字就是解释题的骨架。
Takeaway-Satz: `Die Stoffeigenschaften folgen aus der Stärke der zwischenmolekularen Kräfte; beim Sieden werden nur diese überwunden, nicht die kovalenten Bindungen.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Zuordnung der Krafttypen in Schritt 4 oder die Wahl des richtigen Verfahrens im Vergleich (Schritt 5)?
2. 元认知计划：Beim nächsten Mal prüfe ich zuerst, ob ein Molekül eine O-H- oder N-H-Gruppe besitzt, und entscheide danach, ob das Wasserstoffbrücken- oder das Van-der-Waals-Verfahren anzuwenden ist.
