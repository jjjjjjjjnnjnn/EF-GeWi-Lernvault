---
fach: Physik
thema: "CN Tricks Verfahren"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Physik, CN]
---

# CN-Physik-Tricks (中国方法六招·EF德语映射)

> 中文一句话理解：中国物理靠“程序化套路”拿分，本篇把六个中文套路翻译成德国 Klausur 能用的步骤，每招配一道自编小题。
>
> EN one-liner: Six Chinese procedures translated into German Klausur steps, each with one original mini-task.
>
> Lesson v3（9步制）导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 争议/辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。对齐 00_META/Lernmethoden-Evidenz.md §6–§9。

## ZIELE: 本课学完能… (3条)

- [ ] 能说出六招中文名并匹配到德语 Klausur 步骤（Operator：darstellen）
- [ ] 能用图像面积法与量纲检验独立解一题并验算（Operator：berechnen）
- [ ] 能在整体隔离与等效之间做选择并论证（Operator：begruenden）

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

| Deutsch | 中文 | 一句话释义 |
|---|---|---|
| das Kraftdiagramm | 受力图 | 把所有力画成箭头，不多不少 |
| das System | 系统 | 一次研究的对象整体 |
| die Flaeche unter der Kurve | 曲线下面积 | v-t 面积即路程 |
| die Ersatzkraft | 等效力 | 一个力顶替多个力效果不变 |
| die Einheit / Dimension | 单位/量纲 | 算前先看单位对不对 |
| die Naeherung | 近似/二级结论 | 常用小结论直接用 |

德语小结：`Erst das Bild, dann die Formel, dann die Zahl.`
EN note: Picture first, formula second, number last.

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干，自编）：木块 3,0 kg 静止在水平桌上，用 6,0 N 水平拉，摩擦系数 0,10，g 取 10。求加速度（自编数）。
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则：受力分析程序）：画重力下、支持力上、拉力右、摩擦力左。
  - Schritt 2（规则：牛顿二定律）：竖直平衡，水平 $F - \mu m g = m a$。
  - Schritt 3（规则：代入加单位）：$a = (6,0 - 0,10 \cdot 3,0 \cdot 10) / 3,0 = 1,0 \, \mathrm{m/s^2}$。
- 新题（同类，独立做，见下方 check）：拉力改为 9,0 N，重算并做量纲检验。

## 1. 中文讲一遍 (Feynman)

以下六招全部自写解释与自编 mini 例题，不抄任何高考题或教材原文。All examples original, numbers invented.

### Trick 1 — 受力分析程序 shou li fen xi (force-diagram routine)

- 原理：按“重力→弹力→摩擦力→外加力”顺序逐个画，不漏不重，画完再列式。
- 自编 mini 例题：斜面小车 2,0 kg，斜角 30 度（sin = 0,50），无摩擦。沿斜面下滑力 $F = m g \sin 30 = 2,0 \cdot 10 \cdot 0,50 = 10 \, \mathrm{N}$，$a = F/m = 5,0 \, \mathrm{m/s^2}$。
- 德语映射：`Alle Kraefte werden mit Richtung im Kraftdiagramm dargestellt, dann folgt der Ansatz mit F gleich m mal a.`
- EN: Draw gravity, normal, friction, applied — in that order — then write the equation.

### Trick 2 — 整体隔离法 zheng ti ge li fa (whole-then-parts)

- 原理：先把多物体看成一个整体求共同加速度，再隔离其中一个求内力；内外力在两步中角色互换。
- 自编 mini 例题：A 车 2,0 kg + B 车 3,0 kg 并排，水平推 A 用 10 N，无摩擦。整体 $a = 10 / 5,0 = 2,0 \, \mathrm{m/s^2}$；隔离 B，A 对 B 推力 $F = 3,0 \cdot 2,0 = 6,0 \, \mathrm{N}$。
- 德语映射：`Zuerst wird das Gesamtsystem betrachtet, dann wird ein Teil freigeschnitten und die innere Kraft berechnet.`
- EN: Whole system first for shared acceleration, then cut one part free for inner force.

### Trick 3 — 图像面积法 tu xiang mian ji fa (area method)

- 原理：v-t 图线下方格子面积即路程，s-t 图斜率即速度；先看轴再读图。
- 自编 mini 例题：v-t 图 0–4 s 速度从 0 匀增到 8 m/s（三角形），路程 $s = \frac{1}{2} \cdot 4 \cdot 8 = 16 \, \mathrm{m}$。
- 德语映射：`Die Flaeche unter der v-t-Linie gibt den zurueckgelegten Weg an und wird als Dreiecksflaeche berechnet.`
- EN: Area under v-t gives distance; slope of s-t gives velocity.

### Trick 4 — 等效法 deng xiao fa (equivalence)

- 原理：效果相同即可替换：多力合成一个合力，复杂运动分解为分运动，弹簧串并联化为一根。
- 自编 mini 例题：两根相同弹簧并联，每根 D = 20 N/m，等效 $D_{ges} = 40 \, \mathrm{N/m}$；挂 2,0 kg（20 N），伸长 $s = 20/40 = 0,50 \, \mathrm{m}$。
- 德语映射：`Mehrere Kraefte werden durch eine Ersatzkraft mit gleicher Wirkung ersetzt.`
- EN: Replace many by one with the same effect.

### Trick 5 — 量纲检验 liang gang jian yan (dimension check)

- 原理：代入数字前先把单位相乘除，看结果单位是否为题目要的单位；单位错则式子必错。
- 自编 mini 例题：某同学写 $v = m \cdot s$（质量乘路程），单位 kg m，不是 m/s，故必错；正确 $v = s/t$ 单位 m/s。
- 德语映射：`Vor dem Einsetzen wird die Einheit geprueft, weil eine falsche Einheit einen falschen Ansatz zeigt.`
- EN: Check units before numbers — wrong unit means wrong approach.

### Trick 6 — 二级结论 er ji jie lun (ready-made shortcuts)

- 原理：常用小结论记住直接用，考场省时间，但必须能说出条件：如初速为零的匀加速连续等时位移比 1:3:5。
- 自编 mini 例题：初速零、a = 2,0 m/s^2，前三秒每秒位移：1,0 m / 3,0 m / 5,0 m（用 $s_n = a(2n-1)/2$ 自算验证）。
- 德语映射：`Bekannte Kurzregeln werden nur mit genannter Bedingung benutzt und kurz begruendet.`
- EN: Use shortcuts only with their condition stated.

## 2. 争议/辨析 (MINT: Fehlvorstellungen)

### Pro / 常见正确理解

- 套路是起点不是终点：程序保证不漏力不看错图，结论仍要回题干验证。
- 中德互补：中文套路管速度，德语步骤管分数，两者都要写出来。

### Contra / 典型错概念

- 整体隔离乱切：隔离体上还留着整体的外力，内力外力混在一起。
- 二级结论无条件用：把 1:3:5 用在初速不为零的题上。

### Stellungnahme-Satz (beurteilen)

- `Obwohl Kurzregeln Zeit sparen, gelten sie nur unter engen Bedingungen, daher wird die Bedingung zuerst genannt und dann die Regel benutzt.`

## 3. 德语 Klausur-Sätze (用Operatoren)

- `Alle Kraefte werden im Kraftdiagramm mit Richtung dargestellt, dann folgt der Ansatz.`
- `Das Gesamtsystem wird zuerst als Ganzes betrachtet, danach wird die innere Kraft am freigeschnittenen Teil berechnet.`
- `Der Weg wird als Flaeche unter der v-t-Linie analysiert und mit Einheit angegeben.`
- `Die Einheit wird vor dem Zahlenwert geprueft, weil sie den Ansatz kontrolliert.`
- `Die Kurzregel wird nur mit ihrer Bedingung benutzt und kurz begruendet.`

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| das Kraftdiagramm | 受力图 | Das Kraftdiagramm enthaelt alle Kraefte mit Richtung. |
| freischneiden | 隔离取体 | Der Wagen wird freigeschnitten und einzeln betrachtet. |
| die Ersatzkraft | 等效力 | Die Ersatzkraft ersetzt zwei Kraefte mit gleicher Wirkung. |
| die Dimensionsprobe | 量纲检验 | Die Dimensionsprobe kontrolliert den Ansatz ueber die Einheit. |
| die Bedingung | 适用条件 | Jede Kurzregel gilt nur unter ihrer Bedingung. |

## 5. Quelle / Aufgabe

- Alle Aufgaben und Zahlen selbst erfunden (keine Gaokao-/Buch-Texte kopiert).
- Methoden paraphrasiert aus: https://www.leifiphysik.de/ (Grundwissen) und https://phet.colorado.edu/sims (Anschauung).
- Lehrplan-Anker: `04_Physik/Lehrplan.md` Abschnitt 2 (System/Wechselwirkung/Erhaltung).
- Abgrenzung: `04_Physik/CN-Physik-Formelhandbuch.md` (Formeln dort, Verfahren hier); `04_Physik/Physik-IQB-EF-Training.md` (Diagramm-Typen dort, keine Wiederholung).

## 6. Lernreise

- `Lernreise/Physik-CN-Tricks-L1.md`（待建，本篇为唯一课程源候选，只读消费）

## 7. Fehlerlog

- [ ] Sechs Tricks je an einem Mini-Beispiel selbst rechnen, Fehler nach Trick-Namen sortieren.

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（整体法）：问共同加速度，用整体一次算，公式 $a = F_{aussen} / m_{ges}$。
- B题（隔离法）：问物体间作用力，隔离一个算，公式 $F_{innen} = m_{teil} \cdot a$。
- 二选程序（先选再做）：“这题用哪个？因为问一起多快所以选A，因为问之间推力所以选B。”
- 一句话区别（A vs B）：A 看外面合力推总质量，B 切开看里面一个受多少。

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：受力图画得越多越保险 → 纠偏：多画即错，因为每个箭头都要有施力物体（正确：按重弹摩外四步画）。
- 误解2：量纲对则答案必对 → 纠偏：量纲只是必要条件，因为系数与条件错了单位仍可对（正确：单位过后再查条件）。

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator)：Beschreibe das Kraftdiagramm fuer den Wagen aus dem BEISPIEL, berechne a fuer 9,0 N Zugkraft mit Ansatz und Einheit, und beurteile mit Dimensionsprobe.
- Antwort (合书先写)：
- KR（对/错）：
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：重点查箭头方向与整体/隔离选择。

## TAKEAWAY: 1盒总结

> 先画图再列式，整体求加速隔离求内力，面积读路程，单位先验算，结论讲条件。`Bild vor Formel, Ganzes vor Teil, Flaeche vor Zahl.`

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为…所以…
2. 元认知：哪里最卡/最易混？因为…所以下次先…
