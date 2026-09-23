---
fach: Mathe
thema: "CN Formelhandbuch DE-CN-EN"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Mathe, CN]
---

# CN-Mathe-Formelhandbuch (中德英公式手册 DE-CN-EN)

> 中文一句话理解：中国理科背公式强调口诀加变形，我把每个公式写成中德英三语加一句双解，Klausur时直接套德语论证句。
>
> Lesson v3（9步制）导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 争议/辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。
>
> Deutsch: Dieses Handbuch vernetzt chinesische Merksprueche mit deutschen Klausur-Saetzen. Jede Formel steht auf Chinesisch, Deutsch und Englisch plus einem zweisprachigen Transfersatz.
> EN: This handbook maps Chinese mnemonics to German exam sentences. Each formula appears in CN + DE + EN with one bilingual transfer sentence.

## ZIELE: 本课学完能… (3条)

- [ ] 能用三语写出7组核心公式并说出适用条件（Operator：darstellen）
- [ ] 能把中文口诀翻译成德语Klausur论证句（Operator：erlaeutern）
- [ ] 能用公式手算EF水平的求导、向量与概率小题（Operator：berechnen）

Deutsch:

- [ ] Ich kann sieben Kernformeln dreisprachig darstellen und ihre Bedingungen nennen.
- [ ] Ich kann einen chinesischen Merkspruch in einen deutschen Klausur-Satz uebersetzen und erlaeutern.
- [ ] Ich kann Ableitungen, Vektoren und einfache Wahrscheinlichkeiten hilfsmittelfrei berechnen.

EN: Goals — represent formulas trilingually; explain CN mnemonics in German exam language; compute EF-level items by hand.

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

| Deutsch | 中文 | 一句话释义 | EN term |
|---|---|---|---|
| die Ableitung $f'(x)$ | 导数 | 切线斜率函数，用幂法则逐项求 | derivative |
| der Satz von Vieta | 韦达定理 | 根与系数的关系，和与积反推方程 | Vieta's formulas |
| die AM-GM-Ungleichung $\frac{a+b}{2} \ge \sqrt{ab}$ | 均值不等式 | 和定积最大，积定和最小，等号在相等时 | AM-GM inequality |
| der Sinussatz / Kosinussatz | 正弦定理 / 余弦定理 | 边角互化，已知两角一边或两边夹角时用 | law of sines / law of cosines |
| die Kreisgleichung $(x-a)^2+(y-b)^2=r^2$ | 圆的标准方程 | 圆心加半径确定圆 | circle equation |
| der Vektor $\vec{a}=(a_1\mid a_2\mid a_3)$ | 向量 | 有方向的量，坐标相减得向量 | vector |
| die Wahrscheinlichkeit $P(E)$ | 概率 | 有利除以可能，EF只用古典概型加树形图 | probability |

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干）：$f(x) = 2x^3 - 5x + 4$，求 $f'(x)$ 并计算 $f'(1)$。
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则 Potenzregel $(x^n)' = n\cdot x^{n-1}$）：$2x^3$ 求导得 $6x^2$。
  - Schritt 2（规则 Summenregel，常数 $4$ 导数为 $0$，$-5x$ 导数为 $-5$）：得 $f'(x) = 6x^2 - 5$。
  - Schritt 3（规则 Einsetzen）：$f'(1) = 6 - 5 = 1$。
- 新题（同类，独立做，见下方 check）：$h(x) = 3x^3 - 2x^2 + 7x - 5$，求 $h'(x)$ 与 $h'(0)$。

## 1. 中文讲一遍 (Feynman)

- 导数就是"每一处的切线斜率"。EF只考幂法则加和法则加常数倍法则，记住 $(x^n)' = n\cdot x^{n-1}$ 就能拆开逐项求。
- 韦达定理是"由根反推方程"的捷径：$x_1+x_2 = -\frac{b}{a}$，$x_1\cdot x_2 = \frac{c}{a}$。德国这边常用来验算零点，不用每次都重解。
- 均值不等式是"和定积最大"：$a,b > 0$ 时 $\frac{a+b}{2} \ge \sqrt{ab}$，等号在 $a=b$ 时成立。EF求极值时可当配方法之外的第二条路。
- 正弦定理管"边角成比例"：$\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = 2R$；余弦定理管"两边夹角求第三边"：$c^2 = a^2+b^2-2ab\cos\gamma$。
- 圆的标准方程是"到圆心距离等于半径"：$(x-a)^2+(y-b)^2 = r^2$，圆心 $(a\mid b)$ 半径 $r$。
- 向量核心三式：坐标相减 $\vec{PQ} = Q-P$，长度 $|\vec{a}| = \sqrt{a_1^2+a_2^2+a_3^2}$，共线 $\vec{a} = k\cdot\vec{b}$。
- 概率EF只用古典概型：$P(E) = \frac{\text{guenstig}}{\text{moeglich}}$，多步用树形图（Baumdiagramm）乘分支概率。
- Deutsch: Jede Formel braucht ihre Bedingung: Potenzregel nur fuer Potenzen, Vieta nur fuer quadratische Gleichungen mit $a \ne 0$, AM-GM nur fuer positive Zahlen, Sinus- und Kosinussatz nur im Dreieck, Kreisgleichung nur mit Mittelpunkt und Radius, Kollinearitaet nur mit einem gemeinsamen $k$, Laplace nur bei gleich wahrscheinlichen Ergebnissen.

## 2. 争议/辨析 (MINT填Fehlvorstellungen)

### Pro / 常见正确理解

- 中文口诀可以直接指导德国解题步骤，比如"和定积最大"对应先证 $a,b>0$ 再写等号条件。
- EN: CN mnemonics are valid heuristics if you add the condition check required in German grading.

### Contra / 典型错概念

- 以为背下公式就能得分，德国按论证链给分（Darstellungsleistung），只写答案没有过程会扣分。
- 以为韦达定理对三次方程也直接套 $-\frac{b}{a}$，EF二次与三次系数关系不同，不可混用。

### Stellungnahme-Satz (beurteilen)

- 中国方法管速度，德国论证管分数，两者要叠加：先用口诀定位，再用德语条件句写全。
- Deutsch: Ich beurteile die CN-Methoden als schnelle Heuristik, die erst mit der deutschen Bedingungspruefung klausurtauglich wird.

## 3. 德语 Klausur-Sätze (用Operatoren)

- Die Ableitung an der Stelle $x_0$ gibt die lokale Aenderungsrate (Tangentensteigung) an.
- Nach dem Satz von Vieta gilt fuer $ax^2+bx+c = 0$ mit $a \ne 0$ die Beziehung $x_1+x_2 = -\frac{b}{a}$ und $x_1\cdot x_2 = \frac{c}{a}$.
- Fuer $a,b > 0$ gilt $\frac{a+b}{2} \ge \sqrt{ab}$, Gleichheit genau fuer $a = b$.
- Im Dreieck gilt $\frac{a}{\sin\alpha} = \frac{b}{\sin\beta}$ und $c^2 = a^2+b^2-2ab\cos\gamma$.
- Der Kreis mit Mittelpunkt $M(a\mid b)$ und Radius $r$ hat die Gleichung $(x-a)^2+(y-b)^2 = r^2$.
- Die Vektoren $\vec{a}$ und $\vec{b}$ sind kollinear, da ein $k$ existiert mit $\vec{a} = k\cdot\vec{b}$.
- Bei einem Laplace-Experiment gilt $P(E) = \frac{\text{Anzahl guenstiger Ergebnisse}}{\text{Anzahl moeglicher Ergebnisse}}$.

## 七组公式对照 (DE-CN-EN + 双解一句)

### 1. Ableitung / 导数 / derivative

- Formel: $(x^n)' = n\cdot x^{n-1}$，$(f+g)' = f'+g'$，$(c\cdot f)' = c\cdot f'$。
- CN：一句话——逐项求导，常数消失。
- DE：Potenzregel plus Summenregel, Konstanten fallen weg.
- EN: Differentiate term by term; the derivative of a constant is zero.
- 双解一句：中文"幂降一次系数提前"对应德语 Ich bilde die Ableitung mit der Potenzregel $(x^n)' = n\cdot x^{n-1}$.

### 2. Vieta / 韦达定理 / Vieta's formulas

- Formel: $x_1+x_2 = -\frac{b}{a}$，$x_1\cdot x_2 = \frac{c}{a}$（$ax^2+bx+c = 0$，$a \ne 0$）。
- CN：一句话——和是负一次项系数比，积是常数项比。
- DE：Summe und Produkt der Loesungen pruefen die Nullstellen ohne Neurechnung.
- EN: Sum and product of roots check zeros without re-solving.
- 双解一句：中文"和积反推验根"对应德语 Nach Vieta pruefe ich die Nullstellen mit Summe und Produkt.

### 3. AM-GM / 均值不等式 / AM-GM inequality

- Formel: $a,b > 0 \Rightarrow \frac{a+b}{2} \ge \sqrt{ab}$，等号 $\Leftrightarrow a = b$。
- CN：一句话——正数和定积最大，取等当两数相等。
- DE：Nur fuer positive Zahlen, Gleichheit nur bei gleichen Werten.
- EN: Only for positive numbers; equality holds iff both numbers are equal.
- 双解一句：中文"先正后等"对应德语 Da $a,b > 0$ gilt, folgt die Abschaetzung mit Gleichheit fuer $a = b$.

### 4. Sinus-/Kosinussatz / 正余弦定理 / law of sines and cosines

- Formel: $\frac{a}{\sin\alpha} = \frac{b}{\sin\beta} = 2R$；$c^2 = a^2+b^2-2ab\cos\gamma$。
- CN：一句话——两角一边用正弦，两边夹角用余弦。
- DE：Zwei Winkel plus eine Seite nutzt den Sinussatz, zwei Seiten plus Zwischenwinkel den Kosinussatz.
- EN: Use sines for angle-side-angle data, cosines for side-angle-side data.
- 双解一句：中文"边角互化看已知"对应德语 Aus den gegebenen Seiten und Winkeln waehle ich den passenden Satz.

### 5. Kreis / 圆 / circle

- Formel: $(x-a)^2+(y-b)^2 = r^2$，圆心 $M(a\mid b)$，半径 $r > 0$。
- CN：一句话——圆心定位置，半径定大小。
- DE：Mittelpunkt legt die Lage fest, Radius die Groesse.
- EN: Center fixes position, radius fixes size.
- 双解一句：中文"化成标准式读圆心半径"对应德语 Ich forme zur Standardform um und lese Mittelpunkt und Radius ab.

### 6. Vektoren / 向量 / vectors

- Formel: $\vec{PQ} = Q - P$；$|\vec{a}| = \sqrt{a_1^2+a_2^2+a_3^2}$；$\vec{a} = k\cdot\vec{b}$。
- CN：一句话——终点减起点，模长勾股，平行找公共倍数。
- DE：Vektor als Differenz, Laenge per Pythagoras, parallel mit gemeinsamem Faktor.
- EN: Vector as difference, length by Pythagoras, parallel via a common factor.
- 双解一句：中文"三式一套"对应德语 Ich berechne den Vektor als Differenz und seine Laenge mit der Betragsformel.

### 7. Wahrscheinlichkeit / 概率 / probability

- Formel: $P(E) = \frac{\text{guenstig}}{\text{moeglich}}$；多步 $P = p_1\cdot p_2$ 沿树枝相乘。
- CN：一句话——古典概型数个数，多步画树乘过去。
- DE：Bei Laplace zaehlen, bei Mehrstufigkeit entlang dem Pfad multiplizieren.
- EN: Count for Laplace; multiply along the path for multi-stage experiments.
- 双解一句：中文"有利除以可能"对应德语 Ich bestimme die Wahrscheinlichkeit als Quotient aus guenstigen und moeglichen Faellen.

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| die Ableitungsregel | 求导法则 | Die Ableitungsregel $(x^n)' = n\cdot x^{n-1}$ gilt fuer Potenzen. |
| der Satz von Vieta | 韦达定理 | Nach dem Satz von Vieta pruefe ich Summe und Produkt der Nullstellen. |
| die Ungleichung | 不等式 | Die Ungleichung gilt nur fuer positive Zahlen. |

## 5. Quelle / Aufgabe

- Alle Formeln selbst aufgeschrieben, abgeglichen mit Formelsammlung NRW 2024 (nur lokal gelesen, nichts kopiert).
- Serlo-Uebungen zu Ableitung und Vektoren (siehe 03_Mathe/Ressourcen.md); keine Gaokao-Originale verwendet.
- EN-Spiegel: OpenStax Calculus Vol. 1 (CC-BY, nur als Verstaendnishilfe, siehe Ressourcen.md).

## 6. Lernreise

- `Lernreise/Mathe-CN-Formeln-L1.md`（待建：三语听写加手算5分钟）

## 7. Fehlerlog

- [ ] Jede Verwechslung (z. B. AM-GM ohne Positivitaet) in 03_Mathe/Klausur-Training/Fehlerlog.md eintragen.

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（Vieta验算）：$x^2-7x+12 = 0$ 的两根 $3$ 与 $4$ 是否正确？用和 $7$ 积 $12$ 秒验。
- B题（AM-GM极值）：$x > 0$ 时 $x+\frac{9}{x}$ 最小值？用均值不等式得 $\ge 6$。
- 二选程序（先选再做）：“这题用哪个？因为题问根是否正确不用求极值，所以选A。”
- 一句话区别（A vs B）：A prueft vorhandene Loesungen mit Summe und Produkt, B schaetzt einen Term mit einer Ungleichung ab.
- EN: Vieta verifies given roots; AM-GM bounds an expression.

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：均值不等式对负数也成立 → 纠偏：反例 $a = -1, b = -4$ 时公式失效（正确：必须先证 $a,b > 0$）。
- 误解2：$f'(x_0) = 0$ 处一定是极值 → 纠偏：只是必要条件（正确：需符号变化或二阶导定性）。
- EN: AM-GM needs positivity; $f' = 0$ is only necessary, not sufficient.

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator, selbst gestellt)：$h(x) = 3x^3 - 2x^2 + 7x - 5$. Berechne $h'(x)$ und die lokale Aenderungsrate bei $x_0 = 0$.
- Antwort (合书先写)：
- KR（对/错）：
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：

## TAKEAWAY: 1盒总结

> 七式三语加条件：求导逐项、韦达验根、均值先正后等、正余弦看已知、圆读心径、向量差模倍、概率有利除可能；中文口诀定位，德语条件句得分。
> Deutsch: Sieben Formeln mit Bedingungen lernen, CN-Heuristik mit deutschem Bedingungssatz verbinden.
> EN: Seven formulas with conditions; pair CN heuristics with German condition sentences.

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为求导必须逐项用幂法则，所以 $3x^3$ 先变成 $9x^2$。
2. 元认知：哪里最卡/最易混？因为均值与韦达都是对称式容易混，所以下次先问是验根还是求最值再选公式。
