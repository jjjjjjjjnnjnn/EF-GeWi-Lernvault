---
fach: Physik
thema: "Federpendel und harmonische Schwingung"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, Schwingung]
version: Lesson-v3
---

# Lernreise: Federpendel und harmonische Schwingung (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清弹簧振子为什么是简谐振动——回复力与位移成正比反向（$F = -Dx$），这是简谐的唯一判据。
2. 中文：能写出周期公式 $T = 2\pi\sqrt{m/D}$ 并解释质量越大越慢、弹簧越硬越快。
3. 中文：能读懂 $x$-$t$ 正弦图像的振幅、周期、相位三要素，并写出德语标准结论句（AFB II）。


Hook中文生活切入:

想象小区门口的摇摇车和荡秋千:推一下就前后晃,幅度越来越小最后停住;把秋千换成弹簧挂重物,画面变成上下跳, timing 却意外地准,不管推多重,来回一次的时间几乎不变。这种等时性背后藏着简谐振动:回复力永远指向平衡位置,大小和偏离成正比。

Phaenomen-Satz (DE): Stoss an, und die Zeit bleibt sich treu, egal wie weit der Weg war.

中文机制铺垫:回复力与位移成正比反向是简谐的判据,弹簧振子周期只由质量与劲度系数决定;能量在动能与势能之间来回倒,图像上位移时间曲线是正弦,速度超前四分之一周期,实验题先看周期公式再看图像相位。

Mechanismus-Satz (DE): Rueckstellung proportional zur Auslenkung, Periode nur aus Masse und Haerte.

Klausur-Satz: `Eine Schwingung ist genau dann harmonisch, wenn die Rueckstellkraft proportional zur Auslenkung und entgegengesetzt gerichtet ist.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 位移 — Auslenkung / Elongation：偏离平衡位置的距离 $x$，带正负号。【陷阱：Auslenkung（瞬时位移，可变）不是 Amplitude（振幅，最大值，恒正）。】
- 回复力 — Rueckstellkraft：$F = -D\,x$，永远指向平衡位置。【陷阱：Rueckstellkraft（变力，随 $x$ 变）不是 Gewichtskraft（恒力 $mg$）。】
- 劲度系数 — Federkonstante：弹簧硬度 $D$，单位 $\mathrm{N/m}$。【陷阱：Federkonstante（弹簧属性）不是 Federkraft（弹簧力 $Dx$，随拉伸变）。】
- 振幅 — Amplitude：最大位移 $x_{max}$，决定能量。【陷阱：Amplitude（位移极值）不是 Schwingungsdauer（周期，时间量）。】
- 周期频率 — Periodendauer und Frequenz：$T = 2\pi\sqrt{m/D}$，$f = 1/T$。【陷阱：Frequenz（每秒次数 $f$）不是 Kreisfrequenz（角频率 $\omega = 2\pi f$）。】

Klausur-Satz: `Die Periodendauer haengt nur von Masse und Federkonstante ab, nicht von der Amplitude.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象弹簧门：推开多大，回弹多狠，松手后门口来回晃，幅度再大晃一次的时间却一样。

Phaenomen-Satz (DE): Weiter ausgelenkt, staerker zurueck, doch immer gleich schnell pro Runde.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块改质量 m 与劲度 D（关键词：Rueckstellkraft, Auslenkung, Periodendauer, Amplitude），看周期随哪个变、随哪个不变。

Beobachtungs-Satz (DE): Schwere Masse bremst, harte Feder treibt; die Amplitude zaehlt nicht.

Aha-Moment因果链：

中文因果链：回复力与位移成正比反向，位移越大拉回越狠，数学上恰给出正弦解；周期公式里只有质量与劲度，振幅再大也只是跑远不跑慢。

Gesetz-Satz (DE): Nur eine lineare Rueckstellkraft erzeugt eine harmonische Sinusschwingung.

$F = -D\,x$

$T = 2\pi\sqrt{m/D}$

$x(t) = \hat{x}\sin(\omega t)$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Gleichgewicht o -- Auslenkung x --> Rueckstellkraft -Dx <--
Zeitkurve: Sinus, Periode T unabhaengig von Amplitude
Regel: m hoch -> T lang | D hoch -> T kurz
```
Klausur-Satz: `Die Rueckstellkraft $-D\,x$ erzeugt eine Sinuskurve in der Zeit, deren Periode amplitudenunabhaengig ist.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Galileo Galilei soll das Prinzip der Schwingung im Dom von Pisa entdeckt haben, als er einen Kronleuchter pendeln sah und seine eigene Pulsschlaege als Stoppuhr benutzte — grosse und kleine Ausschlaege dauerten gleich lang. Genau diese Amplitudenunabhaengigkeit macht Pendeluhren moeglich.

**中文解读**: 伽利略用自己的脉搏给教堂吊灯计时，发现晃得大和晃得小用时一样。中国学生背"周期与振幅无关"时想起这个吊灯：正因为幅度不影响快慢，摆钟才走得准，弹簧振子同理。

**Bezug zum Konzept**: `Die Isochronie der Schwingung — gleiche Dauer bei jeder Amplitude — ermoeglicht praezise Uhren.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

[Werkzeug: schiefe-ebene]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：弹簧振子周期测得0.50秒，振幅加倍后周期是否变化？若换更重砝码会怎样？

AUFGABE (deuten, AFB II): Ein Federpendel schwingt mit $T = 0{,}50\,\mathrm{s}$. Aendert Verdopplung der Amplitude die Periode? Was bewirkt groessere Masse?

HILFE（中德双语步骤）：

1. 中文：第1步认条件：回复力正比反向即简谐，关键词：Bedingung。
   Schritt 1 (DE): $F = -D\,x$ pruefen.
2. 中文：第2步读公式：周期无振幅项，关键词：Formel.
   Schritt 2 (DE): $T = 2\pi\sqrt{m/D}$ ohne Amplitude.
3. 中文：第3步判：振幅无关、质量增则周期增，关键词：Folgerung。
   Schritt 3 (DE): Amplitude egal, Masse verlaengert $T$.

MUSTERLOESUNG：中文：振幅加倍只跑远不跑慢，周期仍为0.50秒；换重砝码质量增大，周期按根号关系变长，弹簧调硬则反之。

MUSTERLOESUNG (DE): Die Schwingung dauert $0{,}50\,\mathrm{s}$ pro Periode und bleibt bei jeder Amplitude gleich schnell, weil $T = 2\pi\sqrt{m/D}$ keine Amplitude enthaelt. Groessere Masse verlaengert $T$.
Klausur-Satz: `Die Schwingung dauert $0{,}50\,\mathrm{s}$ pro Periode und bleibt bei jeder Amplitude gleich schnell.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：简谐眼 vs. 非简谐眼）：

VERGLEICH: Waehle erst das Konzept — 【选概念】先判断回复力是 (i) Harmonisch-Konzept（$F \sim -x$ 线性回复，正弦图像）还是 (ii) Nicht-harmonisch-Konzept（$F$ 恒定或非线性）—— dann argumentieren.

AUFGABE A：Eine Kugel faellt mit Luftwiderstand und erreicht konstante Sinkgeschwindigkeit. Liegt eine harmonische Schwingung vor?
AUFGABE B：Eine Masse am Federpendel wird ausgelenkt und losgelassen. Liegt eine harmonische Schwingung vor?

HILFE: A hat keine Rueckstellkraft zum Ausgangspunkt, nur Daempfung -> Konzept (ii). B hat $F = -D\,x$ -> Konzept (i).【选概念：题干出现 proportional zu $-x$ / Feder / Sinus 选简谐；出现 konstant / Reibung ohne Rueckstellung / faellt 选非简谐。】

ANTWORT: A erfordert Konzept (ii): Keine ruecktreibende Kraft, keine Periodizitaet, also nicht harmonisch. B erfordert Konzept (i): Lineare Rueckstellkraft erzeugt Sinus-Schwingung mit $T = 2\pi\sqrt{m/D}$.

Klausur-Satz: `Nur eine lineare Rueckstellkraft der Form $-D\,x$ erzeugt eine harmonische Sinusschwingung.`

## Schritt 6 — check: Verständnisprüfung

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet das Kraftgesetz der harmonischen Schwingung? | ANTWORT: $F = -D\,x$, proportional zur Auslenkung, entgegengesetzt gerichtet.
FRAGE: Wie lautet die Periodenformel des Federpendels? | ANTWORT: $T = 2\pi\sqrt{m/D}$, $f = 1/T$.
FRAGE: Was liest man aus dem $x$-$t$-Diagramm ab? | ANTWORT: Amplitude als Maximalwert, Periode als Abstand zweier Maxima.

Klausur-Satz: `Masse vergroessern verlaengert die Periode, Feder verhaerten verkuerzt sie.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"拉得越大幅度越大，荡得越慢，周期变长"。
   中文纠偏：简谐振动是等时的，振幅只决定能量和最大速度，不决定快慢。拉大一倍，回复力也大一倍，正好抵消，周期纹丝不动。
   Korrektur-Satz: `Die Periodendauer der harmonischen Schwingung ist amplitudenunabhaengig.`

2. 误解"平衡位置处速度最大，所以那里的回复力也最大"。
   中文纠偏：恰好相反。平衡位置 $x = 0$ 处弹簧处于原长，回复力为零，速度最大；两端位移最大处速度为零，回复力最大。力和速度永远错峰。
   Korrektur-Satz: `Am Gleichgewicht ist die Kraft null und die Geschwindigkeit maximal, an den Umkehrpunkten umgekehrt.`

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist Tutorin und erklaerst das Federpendel vor der Klausur.
SITUATION: Ein Mitschueler behauptet, eine doppelt so weit ausgelenkte Feder schwinge doppelt so langsam.
AUFGABE: Widerlegen Sie das in ca. 150 Woertern mit Formel $T = 2\pi\sqrt{m/D}$ und Energie-Argument und erklaeren Sie, was sich bei groesserer Amplitude wirklich aendert.
RUBRIC (30 XP): Formel korrekt ohne Amplitude (10 XP) | Isochronie erklaert (10 XP) | Energie/Geschwindigkeit als wahre Aenderung genannt (10 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：弹簧振子记住"一力一式一图"：力是 $F = -Dx$（判据），式是 $T = 2\pi\sqrt{m/D}$（计算），图是正弦 $x$-$t$（读振幅周期）。周期与振幅无关，重则慢、硬则快。平衡点力零速大，两端力大速零。
Takeaway-Satz: `Lineare Rueckstellung gibt Sinus in der Zeit: Periode aus Masse und Haerte, nie aus Amplitude.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Wurzelrechnung der Periode (Schritt 4) oder die Konzeptwahl harmonisch gegen nicht-harmonisch (Schritt 5)?
2. 元认知计划：Beim naechsten Mal pruefe ich zuerst das Kraftgesetz auf die Form $-D\,x$, bevor ich eine Formel waehle.
