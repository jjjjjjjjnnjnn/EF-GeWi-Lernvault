---
fach: Mathe
thema: "CN Training Transferaufgaben"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Mathe, CN]
---

# CN-Mathe-Training (自编 Transferaufgaben 中德迁移训练)

> 中文一句话理解：四道全部自编的新题，把中国方法翻成德国论证链，每题标出期望视野 EHZ 分点。
>
> Lesson v3（9步制）导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 争议/辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。
>
> Deutsch: Vier selbst gestellte Aufgaben (alle Zahlen und Kontexte eigene Erfindung, keine Originale). Jede Aufgabe hat Loesungsweg, EHZ-Punkte und einen DE-Transfer-Satz.
> EN: Four original tasks translating Chinese methods into German reasoning chains, each with marking points and a transfer sentence.

## ZIELE: 本课学完能… (3条)

- [ ] 能完整写出求导加切线论证链（Operator：berechnen, begruenden）
- [ ] 能用向量与树形图解决几何与概率题（Operator：darstellen, bestimmen）
- [ ] 能用均值不等式求极值并写出等号条件（Operator：untersuchen）

Deutsch:

- [ ] Ich kann Ableitung plus Tangente als Kette berechnen und begruenden.
- [ ] Ich kann Vektoren und Baumdiagramme darstellen und Wahrscheinlichkeiten bestimmen.
- [ ] Ich kann ein Extremum mit AM-GM untersuchen und die Gleichheitsbedingung nennen.

EN: Compute derivative chains; use vectors and trees; find extrema with AM-GM.

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

| Deutsch | 中文 | 一句话释义 | EN term |
|---|---|---|---|
| die Tangente $t(x) = f(x_0)+f'(x_0)(x-x_0)$ | 切线 | 过某点的最佳直线近似 | tangent line |
| der Ortsvektor / Richtungsvektor | 位置向量 / 方向向量 | 点的位置与直线的方向 | position / direction vector |
| das Baumdiagramm | 树形图 | 分步概率画树相乘 | tree diagram |
| das Maximum / Minimum | 最大值 / 最小值 | 区间内最大与最小的函数值 | maximum / minimum |

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干，自编）：$f(x) = x^2-6x+11$。求 $f'(x)$。
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则 Potenzregel）：$x^2$ 得 $2x$。
  - Schritt 2（规则 Summenregel）：$-6x$ 得 $-6$，$11$ 得 $0$。
  - Schritt 3（规则 Zusammenfassen）：$f'(x) = 2x-6$。
- 新题（同类，独立做，见 Aufgabe 1）：$f(x) = x^3-5x^2+6x+2$（下面第一题）。

## 1. 中文讲一遍 (Feynman)

- 函数题先求导再翻译斜率含义；切线用点斜式一套就行。
- 向量题先终点减起点，再长度公式，最后点检验三个方程同一个 $r$。
- 概率题先画树，再沿枝乘，最后加总；古典概型先数个数。
- 极值题两条路：导数通法德国必认，均值快法要先证正数再写等号。
- Deutsch: Jeder Loesungsweg braucht Ansatz, Rechnung und Antwortsatz. Ohne Antwortsatz verliere ich Darstellungspunkte.

## 2. 争议/辨析 (MINT填Fehlvorstellungen)

### Pro / 常见正确理解

- AM-GM 与求导可以互验：均值猜出 $x = 2$，求导再证确为最小值。
- EN: AM-GM guesses the extremum; calculus confirms it.

### Contra / 典型错概念

- 有 CAS 就不用写过程 → 错，Darstellungsleistung verlangt jeden Schluss als Satz.
- 概率只写分数不写树 → 错，多步实验必须展示路径乘法。

### Stellungnahme-Satz (beurteilen)

- 中国快法与德国通法不是二选一，而是"快法侦察加通法交卷"。
- Deutsch: Ich beurteile die Kombination aus CN-Heuristik und deutschem Standardweg als sicherste Klausurstrategie.

## Aufgabe 1 Funktion/Ableitung (函数与导数，自编)

- Aufgabe (selbst gestellt, eigene Zahlen)：$f(x) = x^3-5x^2+6x+2$. a) Berechne $f'(x)$. b) Bestimme die Tangente an $f$ bei $x_0 = 1$.
- 中文思路：逐项求导得二次导函数，代入 $x_0$ 得斜率与函数值，再套切线公式。
- Loesungsweg：
  - $f'(x) = 3x^2-10x+6$ (Potenz- plus Summenregel).
  - $f(1) = 1-5+6+2 = 4$; $f'(1) = 3-10+6 = -1$.
  - $t(x) = 4 + (-1)\cdot(x-1) = -x+5$.
- EHZ-Punkte (6 BE, eigene Vergabe)：$f'$ korrekt (2 BE), $f(1)$ und $f'(1)$ korrekt (2 BE), Tangentengleichung korrekt mit Ansatz (2 BE).
- DE-Transfer-Satz：Die Tangente bei $x_0 = 1$ lautet $t(x) = -x+5$, da $f(1) = 4$ und $f'(1) = -1$ gilt.
- EN: Slope at a point gives the tangent; write point plus slope into the tangent formula.

## Aufgabe 2 Vektor/Geometrie (向量与直线，自编)

- Aufgabe (selbst gestellt, eigene Zahlen)：$A(0\mid 2\mid 1)$, $B(3\mid 6\mid 1)$. a) Gib $\vec{AB}$ an und berechne $|\vec{AB}|$. b) Gerade $g\colon \vec{x} = (0\mid 2\mid 1) + s\cdot(3\mid 4\mid 0)$. Mache die Punktprobe fuer $C(6\mid 10\mid 1)$.
- 中文思路：终点减起点得向量，勾股求长；点检验代入看三个方程是否共用同一个 $s$。
- Loesungsweg：
  - $\vec{AB} = (3-0\mid 6-2\mid 1-1) = (3\mid 4\mid 0)$.
  - $|\vec{AB}| = \sqrt{9+16+0} = \sqrt{25} = 5$.
  - Probe $C$：$6 = 0+3s \Rightarrow s = 2$; $10 = 2+4\cdot 2 = 10$ ok; $1 = 1+2\cdot 0 = 1$ ok. Also liegt $C$ auf $g$.
- EHZ-Punkte (6 BE)：Vektor korrekt (1 BE), Laenge mit Wurzel (2 BE), Punktprobe mit gemeinsamem $s$ und Schluss (3 BE).
- DE-Transfer-Satz：Der Punkt $C$ liegt auf $g$, da ein gemeinsames $s = 2$ alle drei Koordinatengleichungen erfuellt.
- EN: A point lies on a line iff one parameter fits all three coordinates.

## Aufgabe 3 Stochastik (概率树形图，自编)

- Aufgabe (selbst gestellt, eigener Kontext)：Eine Box enthaelt $5$ Kugeln: $2$ rote und $3$ blaue. Es wird zweimal ohne Zuruecklegen gezogen. Bestimme $P(\text{beide rot})$ mit Baumdiagramm.
- 中文思路：第一次红概率 $2/5$，第二次剩 $1/4$，沿枝相乘。
- Loesungsweg：
  - Pfad rot-rot：$\frac{2}{5}\cdot\frac{1}{4} = \frac{2}{20} = \frac{1}{10}$.
  - Baum mit vier Pfaden (RR, RB, BR, BB) skizzieren; Pfadwahrscheinlichkeiten multiplizieren.
  - Antwort：$P(\text{beide rot}) = 0{,}1 = 10\%$.
- EHZ-Punkte (5 BE)：Baum korrekt beschriftet (2 BE), Pfadmultiplikation (2 BE), Antwortsatz mit Deutung (1 BE).
- DE-Transfer-Satz：Entlang des Pfades multipliziere ich die Stufenwahrscheinlichkeiten, also gilt $P(\text{beide rot}) = \frac{2}{5}\cdot\frac{1}{4} = \frac{1}{10}$.
- EN: Along a tree path multiply stage probabilities; across paths add.

## Aufgabe 4 Extremwert mit AM-GM (均值极值，自编)

- Aufgabe (selbst gestellt, eigene Zahlen)：Fuer $x > 0$ sei $A(x) = x+\frac{16}{x}$. Untersuche $A$ mit AM-GM auf das Minimum und gib Stelle und Wert an. Bestaetige kurz mit $A'(x)$.
- 中文思路：先证正数用均值凑定积 $16$，等号在 $x = 4$；再求导验证确为最小。
- Loesungsweg：
  - Da $x > 0$ und $\frac{16}{x} > 0$ gilt: $A(x) \ge 2\sqrt{x\cdot\frac{16}{x}} = 2\cdot 4 = 8$, Gleichheit fuer $x = \frac{16}{x}$, also $x = 4$.
  - Probe mit Ableitung：$A'(x) = 1-\frac{16}{x^2} = 0 \Rightarrow x = 4$ (positiv); $A''(x) = \frac{32}{x^3}$, $A''(4) > 0$, also Minimum. $A(4) = 8$.
- EHZ-Punkte (7 BE)：Positivitaet genannt (1 BE), AM-GM-Abschaetzung (2 BE), Gleichheitsstelle $x = 4$ (1 BE), Ableitungs-Bestaetigung (2 BE), Minimumswert $8$ mit Satz (1 BE).
- DE-Transfer-Satz：Da beide Summanden positiv sind, folgt mit AM-GM $A(x) \ge 8$ mit Gleichheit bei $x = 4$; die Ableitung bestaetigt dort ein Minimum mit Wert $8$.
- EN: Positivity first, then AM-GM bound, equality case, calculus confirmation.

## 3. 德语 Klausur-Sätze (用Operatoren)

- Ich bilde die Ableitung mit Potenz- und Summenregel und werte sie an der Stelle $x_0$ aus.
- Der Punkt liegt auf der Geraden, da ein gemeinsamer Parameter alle Gleichungen erfuellt.
- Entlang eines Pfades multipliziere ich, ueber Pfade addiere ich Wahrscheinlichkeiten.
- Mit AM-GM schaetze ich nach unten ab und nenne Stelle und Wert des Minimums mit Gleichheitsbedingung.

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| die Tangente | 切线 | Die Tangente bei $x_0$ nutzt $f(x_0)$ und $f'(x_0)$. |
| die Punktprobe | 点检验 | Die Punktprobe braucht einen gemeinsamen Parameter. |
| das Baumdiagramm | 树形图 | Entlang dem Pfad multipliziere ich die Wahrscheinlichkeiten. |

## 5. Quelle / Aufgabe

- Alle vier Aufgaben selbst gestellt (eigene Zahlen und Kontexte), keine Gaokao-/Buch-Originale, keine ZKE-Beispiele wiederholt.
- Abgleich mit 03_Mathe/Mathe-ZKE-2027-Training.md (andere Zahlen gewaehlt) und Formelsammlung NRW 2024 (lokal gelesen).

## 6. Lernreise

- `Lernreise/Mathe-CN-Training-L1.md`（待建：4题限时60分钟加EHZ自评）

## 7. Fehlerlog

- [ ] Jeden Fehler aus Aufgabe 1-4 in 03_Mathe/Klausur-Training/Fehlerlog.md eintragen (Rechenfehler vs Konzeptfehler).

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（AM-GM极值 Aufgabe 4）：$x+\frac{16}{x}$ 问最小值，正数和式 → 先用均值。
- B题（求导极值 Aufgabe 1 变式）：$x^3-5x^2+6x+2$ 问单调与极值，三次多项式 → 必须求导列表。
- 二选程序（先选再做）：“这题用哪个？因为三次式不是正数和式而是多项式，所以选B求导。”
- 一句话区别（A vs B）：A schaetzt eine Summe positiver Terme mit fester Produktkonstante ab, B untersucht ein Polynom mit Ableitung und Vorzeichentabelle.
- EN: Fixed-product sums take AM-GM; polynomials take derivatives.

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：切线方程背 $y = mx+b$ 直接猜 $b$ → 纠偏：必须用 $t(x) = f(x_0)+f'(x_0)(x-x_0)$（正确：Punkt plus Steigung einsetzen）。
- 误解2：概率第二次还是 $2/5$（不放回当放回）→ 纠偏：总数与有利都减一（正确：$\frac{2}{5}\cdot\frac{1}{4}$）。
- EN: Tangent needs point plus slope; without replacement both counts shrink.

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator, selbst gestellt)：$p(x) = 2x^3-4x^2+3x-1$. Berechne $p'(x)$ und bestimme die Tangente bei $x_0 = 2$.
- Antwort (合书先写)：
- KR（对/错）：
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：

## TAKEAWAY: 1盒总结

> 四题迁移链：求导给斜率、向量看公共参数、概率沿枝乘、极值先正后等再求导复核；每题 Ansatz 加 Rechnung 加 Antwortsatz。
> Deutsch: Ansatz, Rechnung und Antwortsatz gehoeren zu jeder Aufgabe; AM-GM braucht Positivitaet plus Gleichheitsbedingung.
> EN: Every solution needs setup, computation, and a concluding sentence.

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为极值要用均值，所以先证两项为正再凑定积 $16$。
2. 元认知：哪里最卡/最易混？因为不放回概率第二步分母易忘减一，所以下次先写树上每枝的剩余个数再乘。
