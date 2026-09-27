---
fach: Physik
thema: "Freier Fall mit und ohne Luftwiderstand"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, CN]
version: Lesson-v3
---

# Lernreise: Freier Fall mit und ohne Luftwiderstand (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能写出理想自由落体的三式 $v = g t$、$s = \frac{1}{2} g t^2$、$v^2 = 2 g s$ 并说明 $g \approx 10\,\mathrm{m/s^2}$。
2. 中文：能解释空气阻力如何使下落先加速后匀速（极限速度），并画出 $v$-$t$ 对比草图。
3. 中文：能选择理想模型还是阻力模型（选程序：真空理想 vs 空气实际）。

Voraussetzung（窄切口）：只做竖直下落、初速为零；不处理斜抛与浮力，已会 $v$-$t$ 面积求路程。


Hook中文生活切入:

想象暴雨天看雨滴砸伞:几千米高空掉下来的水珠,按理说该像子弹一样砸穿雨伞,可落在身上却温柔得很;跳伞的人更懂,自由坠落一阵后速度就不再增加,像被一只看不见的手托住。这只手就是空气阻力:速度越快它越大,直到托住全部体重。这只看不见的手的力度变化,正是本节要用图像讲清的机制。

Phaenomen-Satz (DE): Kilometer gefallen, sanft gelandet, die Luft bremst jeden Fall.

中文机制铺垫:真空只受重力,加速度恒为g,速度直线增长;有空气时阻力随速度增大,合力等于重力减阻力,加速度越掉越小,阻力追平重力时速度封顶为极限速度,之后匀速;题干见真空就定量算三式,见阻力就定性画曲线。

Mechanismus-Satz (DE): Ohne Luft Gerade mit Steigung g, mit Luft Kurve bis zur Grenzgeschwindigkeit.

Klausur-Satz: `Im idealen freien Fall faellt jeder Koerper mit a = g; mit Luftwiderstand naehert sich die Geschwindigkeit einer Grenzgeschwindigkeit.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 自由落体 — freier Fall：仅受重力、初速为零的下落，$a = g$。
- 重力加速度 — Fallbeschleunigung $g$：约 $9{,}81\,\mathrm{m/s^2}$， Klausur 常用 $10\,\mathrm{m/s^2}$。
- 空气阻力 — Luftwiderstand：随速度增大而增大，与运动方向相反。
- 极限速度 — Grenzgeschwindigkeit：阻力等于重力时的匀速，$F_L = m g$。
- $v$-$t$ 图 — $v$-$t$-Diagramm：斜率是加速度，面积是路程。

Klausur-Satz: `Ohne Luftwiderstand waechst v linear mit t; mit Luftwiderstand flacht die Kurve bis zur Grenzgeschwindigkeit ab.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象雨滴从几千米掉下来，砸到伞上却温柔得很：要没空气，它该像子弹一样。

Phaenomen-Satz (DE): Kilometer gefallen, sanft gelandet: die Luft bremst mit.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块切真空与空气、改高度 h（关键词：Erdbeschleunigung, Luftwiderstand, Grenzgeschwindigkeit, v-t-Kurve），对比速度曲线是直线还是趴窝。

Beobachtungs-Satz (DE): Ohne Luft Gerade, mit Luft Abflachung bis zur Grenze.

Aha-Moment因果链：

中文因果链：速度越大风阻越大，合力等于重力减风阻，加速度越掉越小；风阻追平重力时加速度归零，速度封顶为极限速度；真空才配用自由落体公式，有空气必须看曲线。

Gesetz-Satz (DE): Die Grenzgeschwindigkeit ist erreicht, wenn der Widerstand die Gewichtskraft ausgleicht.

$h = \frac{1}{2} g t^2$

$v = g\,t$

$F_{res} = m\,g - F_W(v)$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
v ^  ideal: Gerade v=g*t (steil)
  |  real: Kurve flacht ab ............ v_G
  +----------------------------------> t
  h=0.5*g*t^2 -> t=2.0s -> v=20m/s (Vakuum)
```
Klausur-Satz: `Mit wachsender Geschwindigkeit waechst der Luftwiderstand, sodass die resultierende Kraft sinkt und die Fallgeschwindigkeit gegen v_G strebt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Galileo Galilei soll Fallversuche vom Schiefen Turm von Pisa durchgefuehrt haben: Schwere und leichte Kugeln kamen fast gleichzeitig unten an. Erst die Luftpumpe des 17. Jahrhunderts machte den reinen Versuch moeglich — in einer evakuierten Roehre fallen Feder und Muenze exakt gleich schnell.

**中文解读**: 比萨斜塔传说的核心是"重量不影响下落快慢"，真空管实验补上了证明。记住这个对比，阻力定性题就有画面感：差别来自空气，不来自重力。

**Bezug zum Konzept**: `Der Unterschied zwischen Feder und Kugel kommt aus der Luft, nicht aus der Schwerkraft.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

[Werkzeug: kinematik-lab]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：小球从某高处真空下落2.0秒，求高度与落地速度；再判有空气时真实值偏大偏小。

AUFGABE (berechnen, AFB II): Ein Koerper faellt im Vakuum $t = 2{,}0\,\mathrm{s}$ frei. Berechnen Sie $h$ und $v$; deuten Sie die Abweichung in Luft.

HILFE（中德双语步骤）：

1. 中文：第1步列公式高度等于二分之一g乘t方，关键词：Formel。
   Schritt 1 (DE): $h = 0{,}5\,g\,t^2$.
2. 中文：第2步代入得高度约20米、速度约20米每秒，关键词：Einsetzen。
   Schritt 2 (DE): $h \approx 20\,\mathrm{m}$, $v = g\,t \approx 20\,\mathrm{m/s}$.
3. 中文：第3步判空气中两值都偏小，关键词：Vergleich。
   Schritt 3 (DE): In Luft liegen beide Werte darunter.

MUSTERLOESUNG：中文：真空下落2秒高度约20米、落地约20米每秒；有空气时风阻吃掉部分加速度，同样时间掉得更浅更慢，速度曲线趴向极限速度。

MUSTERLOESUNG (DE): Aus $h = 0{,}5\,g\,t^2$ folgt $t = 2{,}0\,\mathrm{s}$ bei ca. $20\,\mathrm{m}$ und $v = g\,t \approx 20\,\mathrm{m/s}$. Mit Luft waechst $F_W$ mit $v$, die Kurve flacht bis $v_G$ ab.
Klausur-Satz: `Aus h = 0,5 g t^2 folgt t = 2,0 s und mit v = g t eine Aufprallgeschwindigkeit von 20 m/s.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：真空理想 vs 空气实际）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看题干：(i) 真空理想（ohne Luftwiderstand / im Vakuum：用三式定量计算）oder (ii) 空气实际（mit Luftwiderstand / Fallschirm：定性画曲线、找极限速度）—— dann loesen.

AUFGABE A：Muenze und Feder fallen in einer evakuierten Roehre aus gleicher Hoehe. Wer kommt zuerst an?
AUFGABE B：Ein Fallschirmspringer oeffnet den Schirm; skizzieren Sie $v(t)$ und erklaeren Sie den weiteren Verlauf.

HILFE: A enthaelt evakuiert → Verfahren (i)，三式中时间与质量无关。B 含 Fallschirm → Verfahren (ii)，阻力突增后减速至新的极限速度。【选程序：见真空算三式；见阻力画曲线。】

ANTWORT: A erfordert Verfahren (i): Beide fallen mit $a = g$, aus $t = \sqrt{2h/g}$ folgt gleiche Fallzeit — sie kommen gleichzeitig an. B erfordert Verfahren (ii): Beim Oeffnen waechst $F_L$ sprunghaft ueber $mg$, also $F_{res}$ nach oben und der Springer wird langsamer; mit sinkendem $v$ sinkt $F_L$ wieder, bis $F_L = mg$ und eine kleinere Grenzgeschwindigkeit $v_G$ als gleichfoermige Sinkgeschwindigkeit erreicht ist.

Klausur-Satz: `Im Vakuum fallen alle Koerper gleich schnell; mit Luft strebt die Bewegung gegen eine Grenzgeschwindigkeit.`

## Schritt 6 — check: Selbsttest zu Freier Fall mit und ohne Luftwiderstand
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lauten die drei Formeln des freien Falls aus der Ruhe? | ANTWORT: $v = g t$, $s = 0{,}5 g t^2$ und $v^2 = 2 g s$.
FRAGE: Warum flacht die $v$-$t$-Kurve mit Luftwiderstand ab? | ANTWORT: Weil $F_L$ mit $v$ waechst, also $F_{res} = mg - F_L$ und damit $a$ sinken.
FRAGE: Wann ist die Grenzgeschwindigkeit erreicht? | ANTWORT: Wenn $F_L = mg$ gilt; dann ist $F_{res} = 0$ und $v$ bleibt konstant.

Klausur-Satz: `Die Grenzgeschwindigkeit ist erreicht, wenn der Luftwiderstand die Gewichtskraft gerade ausgleicht.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"重的物体下落更快"。
   中文纠偏：在理想自由落体中 $a = g$ 与质量无关，同时落地；空气中"快慢差"来自阻力与质量之比，不是重力本身。
   Korrektur-Satz: `Im freien Fall ohne Luft haengt die Fallzeit nicht von der Masse ab.`

2. 误解"有阻力时速度会一直减小到零"。
   中文纠偏：阻力随速度变化，下落只会趋向极限速度 $v_G$ 后匀速，不会停在空中。开伞后减速段之后仍是匀速下降。
   Korrektur-Satz: `Mit Luftwiderstand strebt die Geschwindigkeit gegen einen konstanten Grenzwert, nicht gegen null.`

## Schritt 7 — szenario: Klausurtransfer: Freier Fall mit und ohne Luftwiderstand
ROLLE: Du erklaerst einer 8. Klasse den Unterschied zwischen Ideal und Realitaet.
SITUATION: Die Klasse glaubt, schwere Koerper fielen immer schneller. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) mit dem Feder-Muenz-Versuch und dem Fallschirm-Beispiel, wann die Idealformeln gelten und was der Luftwiderstand qualitativ aendert.
RUBRIC (30 XP): Idealgesetze mit Formeln und Bedingung (10 XP) | Rolle des Luftwiderstands und Grenzgeschwindigkeit (10 XP) | Zwei Beispiele (Vakuumroehre, Fallschirm) (6 XP) | Adressatengerechte Sprache (4 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：无阻力用三式定量算，有阻力画曲线定性讲。阻力越大合力越小，速度趋向极限值。关键词决定程序：ohne Luftwiderstand 就算，mit Luftwiderstand 就画。记住一句话——真空算公式，空气看趋势。
Takeaway-Satz: `Ohne Luft wird gerechnet, mit Luft wird der Verlauf bis zur Grenzgeschwindigkeit gedeutet.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Rechnung mit den Fallformeln (Schritt 4) oder die Wahl zwischen Ideal und Realitaet (Schritt 5)?
2. 元认知计划：Beim naechsten Mal unterstreiche ich zuerst das Wort Luftwiderstand, bevor ich rechne.
