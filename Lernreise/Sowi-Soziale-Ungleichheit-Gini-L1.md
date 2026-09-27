---
fach: SoWi
thema: "Lorenzkurve und Gini-Koeffizient"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, SoWi, Ungleichheit]
version: Lesson-v3
---

# Lernreise: Lorenzkurve und Gini-Koeffizient (L1, Ziel Klausur)

> Kampagne *Virtuelle Stadt-Tycoon — Von der Apfelmarkt-Fehde zum modernen Sozialstaat*: Akt III — Gini-Waage und Steuerreform — Episode 27, Cast: Statistiknarr Karl Zins. Werkzeug dieser Episode: [gini-allocator].

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: gini-allocator] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Alarm in Tycoon City: BIP-Blindflug ohne Wohlstandsradar


> EPISODE 27｜Akt III — Gini-Waage und Steuerreform｜召集人 Statistiknarr Karl Zins：BIP-Blindflug ohne Wohlstandsradar。

HOOK 市长危机（先读剧情，再进 ZIELE）：【本集战役 EP27｜Akt III — Gini-Waage und Steuerreform｜虚拟城邦 Tycoon City 告急】市长办公室深夜灯火通明，Statistiknarr Karl Zins 冲进来报告：BIP-Blindflug ohne Wohlstandsradar，而明天市议会就要投票。集市在喊、长队在排、国库在抖：苹果集市价格战一路烧到租金黑市，再烧到基尼天平与劳资谈判桌，本集正是“Lorenzkurve und Gini-Koeffizient”的现实引爆点。你的身份是市长直属经济改革规划委员：把街头危机翻译成考点，用沙盘 [gini-allocator] 拿出可验证的数值方案，再交出一份 Klausur 满分答卷稳住议会。通关线索：TARGET: Justiert Steuer- und Transferregler so, dass der Gini-Indikator nach Umverteilung in den Korridor 0,28 bis 0,32 faellt, das unterste Quintil mindestens 8 Prozent des Kuchens haelt und die Armutsrisikoquote sichtbar sinkt. 上一集的结尾就是这一集的悬念——黑市账本、税改天平、劳资天平、选票天平，四座天平有一座倒了，城邦就停摆。电台正在直播，反对派等着挑错：先读 ZIELE，再啃术语，把传导机制画成你的作战地图。DE-Briefing: Episode 27 — Statistiknarr Karl Zins meldet BIP-Blindflug ohne Wohlstandsradar; der Stadtrat entscheidet morgen. Rette Tycoon City mit Analyse, Sandkasten und Klausur-Antwort zum Thema Lorenzkurve und Gini-Koeffizient.

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能把一组分位收入份额画成 Lorenz 曲线，并用"离对角线越远越不平等"一句话读懂任意两条曲线谁更不平等。
2. 中文：能用梯形法从分位数据算出 Gini 系数（Gini = 1 - 2B），并解释为什么 0 是绝对平等、1 是绝对不平等。
3. 中文：能说出不平等的四个维度（Einkommen/Vermögen、Bildung、Geschlecht、Herkunft）各配一个指标，并按 AFB III 用指标数据做一次 beurteilen。

Klausur-Satz: `Die Lorenzkurve veranschaulicht die Einkommensverteilung, und der Gini-Koeffizient fasst ihren Abstand zur Gleichverteilungsgeraden zu einer Zahl zwischen 0 und 1 zusammen.`

## Schritt 2 — entdecken: Werkzeugkoffer von Statistiknarr Karl Zins: 5 Begriffe scharf stellen

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 洛伦兹曲线 — Lorenzkurve：横轴为累积人口、纵轴为累积收入，真实分配总在对角线下方。
- 基尼系数 — Gini-Koeffizient：对角线与洛伦兹曲线之间面积占对角线下总面积的比例，0 至 1。
- 分位份额 — Quintilsanteil：把人口五等分后，每一组所占的收入百分比。
- 累积份额 — kumulierter Anteil：把前面的份额逐段相加，画曲线就靠它。
- 性别薪酬差距 — Gender Pay Gap：男女平均时薪的百分比差，未调整口径约 16–18%。

Klausur-Satz: `Der Gini-Koeffizient ergibt sich als Verhaeltnis der Flaeche zwischen Diagonale und Lorenzkurve zur Gesamtflaeche unter der Diagonalen.`

## Schritt 3 — entdecken: Uhrwerk des Marktes: Kette von Ursache zu Wirkung

ENTDECKEN（1概念 + 1文字图解）：

中文：把全体人口从最穷到最富排队，横轴是"累积到百分之几的人"，纵轴是"这些人拿到多少累积收入"。如果收入完全平均，曲线就是那条 45 度对角线；现实中穷人先拿得少，曲线总是先平后陡，落在对角线下方。这条曲线就是 Lorenzkurve。它一弯，就有了一块"夹心面积"：对角线与曲线之间的 A，以及曲线下方的 B。Gini 系数 = A / (A+B)，化简后就是 Gini = 1 - 2B（B 用梯形法从分位数据算出）。它把整条曲线压成一个数：0 表示人人一样，1 表示一人独吞，德国可支配收入的 Gini 约 0.29。做量化题记住三步：先列累积份额、再用梯形面积求和、最后套 1 - 2B。别忘"四维不平等"的指标体系——Einkommen/Vermögen 配 Gini 与 Armutsgefährdungsquote，Bildung 配 Bildungstrichter，Geschlecht 配 Gender Pay Gap（未调整约 16–18%），Herkunft 配 Bildungsbeteiligung 与 Armutsrisiko。曲线看形状，系数看数字，四维看覆盖面。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   kum. Einkommen (%)
   100 |                /  Diagonale (Gleichverteilung)
       |              / '
       |            /  ' A  <-- Flaeche zwischen Diagonale
       |          /   '        und Lorenzkurve
       |        /   '
       |      /  ' B     <-- Flaeche unter der Lorenzkurve
       |    / '
       |  /'
     0 +--------------------> kum. Bevoelkerung (%)
       0                   100

   Gini = A / (A + B) = 1 - 2B        (0 = gleich, 1 = ungleich)
   je weiter die Kurve nach unten durchhaengt, desto groesser Gini

   Vier Dimensionen der Ungleichheit (je ein Indikator):
   [Einkommen/Vermoegen] Gini, Armutsgefaehrdungsquote
   [Bildung]             Bildungstrichter
   [Geschlecht]          Gender Pay Gap (unbereinigt ~16-18%)
   [Herkunft]            Bildungsbeteiligung, Armutsrisiko
```

Klausur-Satz: `Je staerker die Lorenzkurve nach unten gewoelbt ist, desto groesser ist der Gini-Koeffizient und desto ungleicher die Verteilung.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der Gini-Koeffizient ist nach dem italienischen Statistiker Corrado Gini benannt, der das Maß um 1912 entwickelte — aufbauend auf der Lorenz-Kurve des amerikanischen Ökonomen Max O. Lorenz. Eine viel zitierte „Warnlinie" von 0,4 hat dagegen keine feste wissenschaftliche Grundlage: Sie ist eine Konvention, keine Naturgrenze. Zwei Länder mit demselben Gini-Wert können außerdem völlig unterschiedliche Verteilungen haben.

**中文解读**: 基尼系数由意大利统计学家基尼在洛伦兹曲线的基础上提出，而常被引用的"0.4 警戒线"其实只是一条约定俗成的经验线，并非科学定律。这条冷知识提醒我们：系数只给一个数，不告诉你不平等发生在哪里——所以本课强调"曲线看形状、系数看数字、四维看覆盖面"三者并用。

**Bezug zum Konzept**: `Der Gini-Koeffizient verdichtet die Lorenzkurve zu einer Zahl; die oft zitierte 0,4-Grenze ist eine Konvention und kein Naturgesetz.`

## Schritt 4 — ausprobieren: Sandkasten-Einsatz [gini-allocator]: Rette die Stadt mit Zahlen

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: gini-allocator]

TARGET: Justiert Steuer- und Transferregler so, dass der Gini-Indikator nach Umverteilung in den Korridor 0,28 bis 0,32 faellt, das unterste Quintil mindestens 8 Prozent des Kuchens haelt und die Armutsrisikoquote sichtbar sinkt.

AUFGABE (berechnen, AFB II, 12 BE)：M1 gibt die Einkommensanteile von fuenf gleich grossen Bevoelkerungsgruppen an: Q1 = 8 %, Q2 = 13 %, Q3 = 17 %, Q4 = 23 %, Q5 = 39 %. (a) Bestimmen Sie die kumulierten Anteile und skizzieren Sie die Lorenzkurve. (b) Berechnen Sie mit der Trapezmethode die Flaeche B unter der Kurve und daraus den Gini-Koeffizienten. (c) Interpretieren Sie Ihr Ergebnis kurz.

HILFE:
1. Schritt 1: Kumuliere die Anteile — 8 %, 21 %, 38 %, 61 %, 100 %; trage sie gegen 20 %, 40 %, 60 %, 80 %, 100 % auf.
2. Schritt 2: Zerlege die Flaeche unter der Kurve in fuenf Trapeze der Breite 0,2 und summiere die mittleren Hoehen.
3. Schritt 3: Setze B in Gini = 1 - 2B ein und deute den Wert mit der Skala 0 (gleich) bis 1 (ungleich).

MUSTERLÖSUNG: Die kumulierten Anteile lauten 8 %, 21 %, 38 %, 61 % und 100 %. Damit verbindet die Lorenzkurve die Punkte (0|0), (20|8), (40|21), (60|38), (80|61) und (100|100) — sie liegt durchgehend unter der Diagonalen. Fuer die Flaeche unter der Kurve summiert man fuenf Trapeze der Breite 0,2: B = 0,2 * [(0+8)/2 + (8+21)/2 + (21+38)/2 + (38+61)/2 + (61+100)/2] / 100. In Prozent ausgedrueckt ergibt das 0,2 * (0,04 + 0,145 + 0,295 + 0,495 + 0,805) = 0,2 * 1,78 = 0,356. Der Gini-Koeffizient ist damit Gini = 1 - 2 * 0,356 = 1 - 0,712 = 0,288, also rund 0,29. Dieser Wert entspricht etwa dem Niveau der verfuegbaren Einkommen in Deutschland und zeigt eine deutliche, aber nicht extreme Ungleichheit — deutlich unter dem Wert, den man fuer Markteinkommen vor Steuern und Transfers erhaelt.

Klausur-Satz: `Mit einem Gini-Koeffizienten von rund 0,29 liegt die Verteilung der verfuegbaren Einkommen deutlich unter dem Wert der Markteinkommen, was die umverteilende Wirkung von Steuern und Transfers zeigt.`

## Schritt 5 — ausprobieren: Duell der Wege: Weg A gegen Weg B

VERGLEICH辨别实验（双向辨析：读曲线之程序 vs. 算系数之程序）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目要的是 (i) Kurven-Verfahren（只比较形状：哪条 Lorenz-Kurve 更弯、哪国/哪年更不平等，只需定性排序）还是 (ii) Koeffizienten-Verfahren（要给出数值：用梯形法算 B，再套 Gini = 1 - 2B）—— dann loesen.

AUFGABE A：M1 zeigt zwei Lorenzkurven fuer dieselbe Volkswirtschaft in den Jahren 2000 und 2024; 2024 liegt sichtbar tiefer. Bestimmen Sie, in welchem Jahr die Verteilung ungleicher war.

AUFGABE B：M2 nennt fuer drei Laender die Quintilsanteile und fragt nach einem Vergleich der Einkommensungleichheit mit Begruendung.

HILFE: A verlangt nur eine Rangfolge aus der Kurvenform → Verfahren (i). B verlangt einen belastbaren Vergleich, also Indikatoren → Verfahren (ii).【选程序：只问"谁更弯" → 读曲线；要"比较并论证" → 算系数。】

ANTWORT: A erfordert Verfahren (i): Da die Kurve von 2024 sichtbar tiefer durchhaengt, liegt sie weiter von der Diagonalen entfernt; die Flaeche zwischen Diagonale und Kurve ist groesser, also war die Verteilung 2024 ungleicher. Es genuegt die qualitative Aussage, ein Zahlenwert ist nicht verlangt. B erfordert Verfahren (ii): Fuer einen belastbaren Vergleich muessen aus den Quintilsanteilen erst die kumulierten Anteile gebildet, dann mit der Trapezmethode die Flaeche B bestimmt und schliesslich der Gini-Koeffizient berechnet werden. Erst der Vergleich der Gini-Werte liefert ein begruendetes Urteil, welche Verteilung am ungleichsten ist.

Klausur-Satz: `Fuer eine reine Rangfolge genuegt der Blick auf die Lorenzkurve, fuer einen begruendeten Vergleich der Verteilung ist der Gini-Koeffizient noetig.`

## Schritt 6 — check: Selbsttest zu Lorenzkurve und Gini-Koeffizient

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie ist der Gini-Koeffizient definiert und welche Werte kann er annehmen? | ANTWORT: Er ist das Verhaeltnis der Flaeche zwischen Diagonale und Lorenzkurve zur Gesamtflaeche; er liegt zwischen 0 (voellig gleich) und 1 (voellig ungleich).
FRAGE: Wie liest man aus zwei Lorenzkurven ab, welche Verteilung ungleicher ist? | ANTWORT: Die Kurve, die tiefer durchhaengt und damit weiter von der Diagonalen entfernt liegt, gehoert zur ungleicheren Verteilung.
FRAGE: Welche vier Dimensionen der Ungleichheit und je ein Indikator gehoeren zum EF-Grundwissen? | ANTWORT: Einkommen/Vermoegen (Gini, Armutsgefaehrdungsquote), Bildung (Bildungstrichter), Geschlecht (Gender Pay Gap) und Herkunft (Bildungsbeteiligung, Armutsrisiko).

Klausur-Satz: `Der Gini-Koeffizient verdichtet die gesamte Lorenzkurve zu einer Zahl zwischen 0 und 1, waehrend die vier Dimensionen die unterschiedlichen Erscheinungsformen der Ungleichheit erfassen.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"Gini 系数越接近 1 越平等"。
   中文纠偏：完全反了。Gini = 0 才是人人相同（对角线），Gini = 1 是一人独吞全部收入。做题时先写"0 = 平等、1 = 不平等"再代入。
   Korrektur-Satz: `Ein Gini-Koeffizient von 0 bedeutet vollkommene Gleichverteilung, ein Wert nahe 1 dagegen extreme Ungleichheit.`

2. 误解"算 Gini 就直接把份额相加除以 5"。
   中文纠偏：那是平均值，不是 Gini。正确流程是：先累积份额 → 用梯形法求曲线下面积 B → 再套 Gini = 1 - 2B。跳过曲线只做算术，必然算错。
   Korrektur-Satz: `Der Gini-Koeffizient verlangt die Flaeche unter der Lorenzkurve (Trapezmethode) und die Formel Gini = 1 - 2B, nicht einen einfachen Mittelwert der Anteile.`

## Schritt 7 — szenario: Klausurtransfer: Anhoerung und Parlamentsrede zu Lorenzkurve und Gini-Koeffizient

ROLLE: Du bist Mitarbeiter/in einer statistischen Abteilung und sollst fuer einen Ausschuss die Einkommensverteilung zweier Regionen vergleichen.
SITUATION: Fuer Region A nennt M1 die Quintilsanteile 8 / 13 / 17 / 23 / 39 %, fuer Region B die Anteile 11 / 15 / 19 / 24 / 31 %. Der Ausschuss moechte wissen, in welcher Region die Ungleichheit groesser ist und ob eine Umverteilungspolitik zu rechtfertigen sei. Beurteilen Sie die Situation in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), stuetzen Sie sich auf die Lorenz-/Gini-Logik und nennen Sie ein Kriterium.
RUBRIC (30 XP): Aufstellen der kumulierten Anteile und der Lorenz-Idee (6 XP) | Berechnung bzw. plausibler Vergleich der Gini-Werte von A und B (8 XP) | Benennung und Anwendung des Kriteriums Chancengerechtigkeit (10 XP) | Kriteriengeleitetes Urteil zur Umverteilung (6 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion: Was der Krisenstab lernt

TAKEAWAY 1盒（核心总结）：

中文：量化不平等就三招——列累积份额、画洛伦兹曲线、算 Gini（Gini = 1 - 2B，梯形法求 B）。曲线看形状（越弯越不平等），系数看数字（0 平等、1 不平等），德国可支配收入约 0.29。别忘四维覆盖：收入/财产、教育、性别、出身，各配一个指标。做题先选程序：只问谁更不平等就读曲线，要比较论证就算系数。
Takeaway-Satz: `Die Lorenzkurve zeigt die Ungleichheit als Form, der Gini-Koeffizient verdichtet sie zu einer Zahl — erst beide zusammen ergeben ein belastbares Urteil.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Aufstellen der kumulierten Anteile (Schritt 4) oder die Entscheidung zwischen Kurven- und Koeffizienten-Verfahren (Schritt 5)?
2. 元认知计划：Beim nächsten Mal pruefe ich zuerst, ob ein Zahlenwert verlangt ist, und waehle danach die Trapezmethode oder nur den Kurvenvergleich.
