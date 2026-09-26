---
fach: Chemie
thema: "pH starker und schwacher Saeuren mit Ks-Naeherung"
level: 1
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, CN]
version: Lesson-v3
---

# Lernreise: pH starker und schwacher Saeuren mit Ks-Naeherung (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能对强酸直接写 $[H_3O^+] = c_0$ 求 pH，对弱酸用近似 $[H_3O^+] = \sqrt{K_s \cdot c_0}$。
2. 中文：能由 $K_s$ 与 $pK_s$ 判断酸的强弱，并写出 $pH = -\lg [H_3O^+]$。
3. 中文：能选择强酸直算还是弱酸近似（选程序：完全电离 vs 部分电离）。

Voraussetzung（窄切口）：只做一元酸、$25^\circ\mathrm{C}$、$c_0$ 已知；不处理缓冲与多元酸，已会 $\lg$ 运算。

Klausur-Satz: `Starke Saeuren dissoziieren vollstaendig, schwache nur teilweise; danach richtet sich der pH-Ansatz.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- pH 值 — pH-Wert：$pH = -\lg [H_3O^+]$, $[H_3O^+]$ 以 $\mathrm{mol/L}$ 计。
- 强酸 — starke Saeure：完全电离，如 $HCl$、$HNO_3$，$[H_3O^+] = c_0$。
- 弱酸 — schwache Saeure：部分电离，如 $CH_3COOH$，需用 $K_s$。
- 酸常数 — Saeurekonstante $K_s$：$K_s = \frac{[H_3O^+][A^-]}{[HA]}$，越大酸越强。
- 近似条件 — Naeherungsbedingung：弱酸且 $c_0 / K_s > 100$ 时可用 $\sqrt{K_s c_0}$。

Klausur-Satz: `Der pH folgt aus der Oxoniumkonzentration; starke Saeuren liefern sie direkt, schwache ueber K_s.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：强酸 pH 一步到位：$0{,}01\,\mathrm{mol/L}$ 的 $HCl$ 就是 $[H_3O^+] = 0{,}01$，$pH = 2$。弱酸多一步平衡：设电离出 $x$，则 $K_s \approx x^2/c_0$，得 $x = \sqrt{K_s c_0}$。例如 $c_0 = 0{,}1$、$K_s = 1{,}8 \times 10^{-5}$ 的醋酸，$x = \sqrt{1{,}8 \times 10^{-6}} \approx 1{,}34 \times 10^{-3}$，$pH \approx 2{,}87$。判断钥匙：题给 $K_s$ 或 $pK_s$ 就是弱酸信号；写 stark / vollstaendig 就是强酸信号。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
  stark:  c0 ──voll──> [H3O+] = c0 ── -lg ──> pH
  schwach: c0 ──Ks──> x = Wurzel(Ks*c0) ── -lg ──> pH
  stark: pH faellt 1 pro Zehnerpotenz; schwach: nur ~0,5
```

Klausur-Satz: `Fuer schwache Saeuren gilt genaehert [H_3O^+] = Wurzel(K_s mal c_0), woraus der pH ueber den negativen dekadischen Logarithmus folgt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Sören Sörensen fuehrte 1909 den pH-Begriff in einer Brauerei ein, um die Saeure der Wuerze zu kontrollieren. Das kleine p steht fuer Potenz, das H fuer Wasserstoff — eine Skala aus der Praxis der Bierherstellung.

**中文解读**: pH 本是啤酒厂的品控工具，$pH = -\lg [H]$ 把相差十倍的浓度压缩成 1 个单位。记住"差 1 就是十倍"，稀释题就有数感。

**Bezug zum Konzept**: `Eine pH-Einheit bedeutet zehnfache Konzentration — daher die logarithmische Rechnung.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: ph]

AUFGABE (berechnen, AFB II)：Berechnen Sie den pH einer Essigsaeureloesung mit $c_0 = 0{,}10\,\mathrm{mol/L}$ ($K_s = 1{,}8 \times 10^{-5}$).

HILFE:
1. Schritt 1: Pruefen, ob $K_s$ gegeben ist → schwache Saeure, Naeherung waehlen.
2. Schritt 2: $[H_3O^+] = \sqrt{K_s c_0}$ berechnen.
3. Schritt 3: $pH = -\lg [H_3O^+]$ bilden.

MUSTERLÖSUNG: Da $K_s$ gegeben ist, liegt eine schwache Saeure vor und $c_0/K_s \approx 5500 > 100$, die Naeherung ist zulaessig. Es gilt $[H_3O^+] = \sqrt{1{,}8 \times 10^{-5} \cdot 0{,}10} = \sqrt{1{,}8 \times 10^{-6}} \approx 1{,}34 \times 10^{-3}\,\mathrm{mol/L}$. Damit folgt $pH = -\lg(1{,}34 \times 10^{-3}) \approx 2{,}87$. Zum Vergleich haette eine starke Saeure gleicher Konzentration $pH = 1{,}00$.

Klausur-Satz: `Mit der Naeherung folgt [H_3O^+] = 1,34 mal 10 hoch -3 mol/L und damit pH = 2,87.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：完全电离 vs 部分电离）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看题给什么：(i) 完全电离（stark / vollstaendig / 无 $K_s$：$[H]=c_0$ 直接取负对数）oder (ii) 部分电离（schwach / $K_s$ / $pK_s$：先 $\sqrt{K_s c_0}$ 再取负对数）—— dann loesen.

AUFGABE A：$HCl$, $c_0 = 0{,}01\,\mathrm{mol/L}$. pH?
AUFGABE B：$CH_3COOH$, $c_0 = 0{,}01\,\mathrm{mol/L}$, $K_s = 1{,}8 \times 10^{-5}$. pH?

HILFE: A 无 $K_s$ 且为 $HCl$ → Verfahren (i)。B 给 $K_s$ → Verfahren (ii)。【选程序：见 Ks 走近似；不见走直算。】

ANTWORT: A erfordert Verfahren (i): $[H_3O^+] = 0{,}01$, $pH = 2{,}00$. B erfordert Verfahren (ii): $[H_3O^+] = \sqrt{1{,}8 \times 10^{-5} \cdot 0{,}01} \approx 4{,}24 \times 10^{-4}$, $pH \approx 3{,}37$. Gleiche Konzentration, aber deutlich verschiedener pH — das ist der experimentelle Fingerabdruck von stark gegen schwach.

Klausur-Satz: `Bei gleicher Konzentration liegt der pH der schwachen Saeure deutlich hoeher als der der starken.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie berechnet man den pH einer starken einprotonigen Saeure? | ANTWORT: $[H_3O^+] = c_0$, dann $pH = -\lg c_0$.
FRAGE: Wie lautet die Naeherung fuer schwache Saeuren? | ANTWORT: $[H_3O^+] = \sqrt{K_s \cdot c_0}$, dann $pH = -\lg [H_3O^+]$.
FRAGE: Wann ist die Naeherung zulaessig? | ANTWORT: Wenn die Saeure schwach ist und $c_0/K_s > 100$ gilt.

Klausur-Satz: `Stark heisst direkt, schwach heisst ueber die Wurzel aus K_s mal c_0.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"所有酸都用 $[H]=c_0$"。
   中文纠偏：只有强酸完全电离才能直算；弱酸电离度常不足百分之几，直算会把 pH 算得过低（偏酸）。
   Korrektur-Satz: `[H_3O^+] = c_0 gilt nur fuer vollstaendig dissoziierte starke Saeuren.`

2. 误解"pH 加一倍就是浓度加一倍"。
   中文纠偏：pH 是对数标，差 1 表示十倍。$pH$ 从 2 到 3 是稀释十倍，不是两倍。
   Korrektur-Satz: `Eine pH-Einheit entspricht einer Zehnerpotenz der Konzentration.`

## Schritt 7 — szenario

ROLLE: Du bist Laborhelfer und erklaerst zwei Flaschen mit je $0{,}1\,\mathrm{mol/L}$.
SITUATION: Ein Praktikant erwartet gleichen pH, misst aber $1{,}0$ und $2{,}9$. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter), warum $HCl$ und Essigsaeure trotz gleicher Konzentration verschiedene pH-Werte haben und wie man jeweils rechnet.
RUBRIC (30 XP): Erklaerung stark gegen schwach (10 XP) | Rechnung stark mit Ergebnis (6 XP) | Rechnung schwach mit Naeherung (10 XP) | Fachsprachliche Korrektheit (4 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：先看有无 $K_s$ 选程序：无 $K_s$ 直算 $pH = -\lg c_0$，有 $K_s$ 先开方再取对数。弱酸 pH 随稀释变化慢，强酸十倍稀释 pH 加 1。记住一句话——见 Ks 开平方，不见直接取对数。
Takeaway-Satz: `Ohne K_s direkt, mit K_s erst die Wurzel, dann der Logarithmus.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Wurzel-Naeherung (Schritt 4) oder die Wahl des Verfahrens (Schritt 5)?
2. 元认知计划：Beim naechsten Mal suche ich zuerst nach K_s im Aufgabentext.
