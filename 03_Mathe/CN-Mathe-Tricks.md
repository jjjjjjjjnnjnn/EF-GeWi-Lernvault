---
fach: Mathe
thema: "CN Tricks Schnellverfahren"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Mathe, CN]
---

# CN-Mathe-Tricks (中国 Schnellverfahren 速解六法)

> 中文一句话理解：中国选择填空常用快法秒杀，我把每法改写成"原理一句加自编小题加德语映射"，大题只当检验不能代替过程。
>
> Lesson v3（9步制）导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 争议/辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。
>
> Deutsch: Sechs chinesische Schnellverfahren als Heuristik. Jedes Verfahren hat Prinzip, selbst gestellte Mini-Aufgabe und deutsche Abbildung. Im Heft zaehlt nur der vollstaendige Weg.
> EN: Six Chinese quick methods as heuristics. Each has a one-sentence principle, an original mini-task, and a German mapping. Full reasoning is required for credit.

## ZIELE: 本课学完能… (3条)

- [ ] 能说出六法的适用条件并各做一道自编小题（Operator：anwenden）
- [ ] 能把快法结果翻译成德语检验句（Operator：begruenden）
- [ ] 能判断何时快法无效并切换回通法（Operator：beurteilen）

Deutsch:

- [ ] Ich kann sechs Verfahren mit Bedingungen anwenden.
- [ ] Ich kann jedes Schnell-Ergebnis mit einem deutschen Pruefsatz begruenden.
- [ ] Ich kann beurteilen, wann das Verfahren versagt, und zum Standardweg wechseln.

EN: Apply six tricks with conditions; justify each quick result in German; judge when to fall back to standard methods.

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

| Deutsch | 中文 | 一句话释义 | EN term |
|---|---|---|---|
| der Spezialwert $x = 0, 1, -1$ | 特殊值 | 代入好算的数先看规律 | special value |
| das Ausschlussverfahren | 排除法 | 先划掉不可能的选项 | elimination |
| die Skizze / Veranschaulichung | 数形结合 | 画图把代数变几何 | sketch / graphic reasoning |
| der Satz von Vieta | 韦达定理 | 根与系数秒验算 | Vieta's formulas |
| die AM-GM-Ungleichung | 均值不等式 | 和定积最大秒极值 | AM-GM inequality |
| die Parametertrennung | 分离参数 | 把参数单独放一边 | parameter separation |

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干，自编）：比较 $a = 2^{30}$ 与 $b = 3^{20}$ 的大小（Spezialwert-Idee: gleiche Exponenten suchen）。
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则 Potenzgesetze）：$a = 2^{30} = (2^3)^{10} = 8^{10}$，$b = 3^{20} = (3^2)^{10} = 9^{10}$。
  - Schritt 2（规则 Monotonie von $x^{10}$ fuer $x > 0$）：$8 < 9 \Rightarrow 8^{10} < 9^{10}$。
  - Schritt 3（规则 Rueckschluss）：also $a < b$。
- 新题（同类，独立做，见下方 check）：比较 $c = 4^{15}$ 与 $d = 8^{10}$（提示：都化成 $2$-Potenz）。

## 1. 中文讲一遍 (Feynman)

- 特殊值法：原理是"一般成立则特殊必成立"。取 $x = 0, 1, -1$ 代入，先猜答案再回头证明。
- 排除法：原理是"错的比对的更好认"。定义域、无穷趋势、符号三刀先砍掉不可能项。
- 数形结合：原理是"一代数卡住就画图"。单调、交点、零点个数画草图一眼看穿。
- 韦达定理：原理是"和积关系秒验"。二次方程先看和与积，不用每次都套公式。
- 均值不等式：原理是"和定积最大"。正数求最小值时凑出定积，和相等时取等。
- 分离参数：原理是"动静分离"。含参不等式恒成立时把参数单独放一边，另一边求最值。
- Deutsch: Jedes Verfahren ist nur eine Abkuerzung. Ohne Bedingungspruefung gibt es in der Klausur keine Punkte.

## 2. 争议/辨析 (MINT填Fehlvorstellungen)

### Pro / 常见正确理解

- 快法适合A卷手算自查：特殊值验算、排除法缩小范围、画图防符号错。
- EN: Tricks are legitimate for self-checking in the no-calculator part.

### Contra / 典型错概念

- 快法可以直接当大题过程交卷 → 错，Operatoren wie begruenden verlangen den allgemeinen Weg.
- 特殊值算对一个就等于证明了 → 错，Ein Beispiel beweist keinen allgemeinen Satz.

### Stellungnahme-Satz (beurteilen)

- 快法管定位加验算，通法管得分；考场先快后全，两步都要写吗？大题只写通法，快法只在草稿纸用。
- Deutsch: Ich beurteile Schnellverfahren als Kontrolle auf Schmierpapier, waehrend die Reinschrift den Standardweg braucht.

## 六法详解 (CN-Name + 原理一句 + 自编mini例题 + 德语映射)

### Trick 1 特殊值法 te-shu-zhi-fa / Spezialwert-Methode / special values

- 原理一句话：一般结论对一切成立，则对 $0, 1, -1$ 也成立，可先代入猜结果。
- 自编mini例题（ORIGINAL）：若 $f(x) = (x-2)^2 + k$ 对一切 $x$ 满足 $f(x) \ge 1$，猜 $k$ 的范围。代 $x = 2$ 得 $k \ge 1$，再证 $(x-2)^2 \ge 0$ 故充分。
- 德语映射：Ich teste Spezialwerte $x = 0, 1, -1$ zur Vermutung und beweise danach allgemein.

### Trick 2 排除法 pai-chu-fa / Ausschlussverfahren / elimination

- 原理一句话：用定义域、符号、无穷趋势先排除不可能的选项或结论。
- 自编mini例题（ORIGINAL）：$f(x) = -2x^3+5x-1$ 当 $x \to +\infty$ 时趋势？首项 $-2x^3 \to -\infty$，故"趋向 $+\infty$"的猜测直接排除。
- 德语映射：Ich schliesse unmoegliche Faelle ueber Definitionsbereich, Vorzeichen und Grenzverhalten aus.

### Trick 3 数形结合 shu-xing-jie-he / Skizze / graphic reasoning

- 原理一句话：方程根即图像交点，画出单调与走势可数出零点个数。
- 自编mini例题（ORIGINAL）：$g(x) = x^3-6x+2$ 有几个零点？$g'(x) = 3x^2-6 = 0$ 得 $x = \pm\sqrt{2}$，$g(-\sqrt{2}) > 0$，$g(\sqrt{2}) < 0$，加两端无穷趋势，故三个零点（草图验证）。
- 德语映射：Ich skizziere Monotonie und Grenzverhalten und zaehle die Nullstellen am Graphen ab.

### Trick 4 韦达定理 wei-da-ding-li / Satz von Vieta / Vieta

- 原理一句话：二次方程两根之和与积直接由系数读出，可秒验答案。
- 自编mini例题（ORIGINAL）：断言 $x^2-7x+12 = 0$ 的根为 $2$ 与 $5$？和为 $7$ 对了但积 $10 \ne 12$，故错误，真根为 $3$ 与 $4$。
- 德语映射：Nach Vieta pruefe ich Summe $x_1+x_2 = -\frac{b}{a}$ und Produkt $x_1\cdot x_2 = \frac{c}{a}$.

### Trick 5 均值不等式 jun-zhi-bu-deng-shi / AM-GM / AM-GM inequality

- 原理一句话：正数和固定时乘积最大，乘积固定时和最小，等号在相等处。
- 自编mini例题（ORIGINAL）：$x > 0$，求 $x+\frac{4}{x}$ 最小值。由 AM-GM 得 $\ge 2\sqrt{4} = 4$，等号在 $x = 2$ 处成立。
- 德语映射：Da $x > 0$ gilt, folgt mit AM-GM die Abschaetzung und die Gleichheitsbedingung $x = 2$.

### Trick 6 分离参数 fen-li-can-shu / Parametertrennung / parameter separation

- 原理一句话：$k \ge h(x)$ 恒成立等价于 $k \ge \max h(x)$，把参数与变量分到不等式两边。
- 自编mini例题（ORIGINAL）：$k \ge 3x-x^2$ 对 $x \in [0,2]$ 恒成立，求最小 $k$。$h(x) = -x^2+3x$ 顶点 $x = 1.5$，$h(1.5) = 2.25$，故 $k_{\min} = 2.25$。
- 德语映射：Ich trenne den Parameter ab und bestimme das Maximum von $h$ auf dem Intervall.

## 3. 德语 Klausur-Sätze (用Operatoren)

- Ich teste zuerst Spezialwerte und begruende danach den allgemeinen Fall.
- Unmoegliche Faelle schliesse ich ueber Definitionsbereich und Grenzverhalten aus.
- Die Skizze zeigt Monotonie und Nullstellen, der Rechenweg belegt sie.
- Nach dem Satz von Vieta pruefe ich Summe und Produkt der Loesungen.
- Fuer positive Zahlen schaetze ich mit AM-GM ab und nenne die Gleichheitsbedingung.
- Ich trenne den Parameter ab und bestimme das Extremum der restlichen Funktion.

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| das Ausschlussverfahren | 排除法 | Mit dem Ausschlussverfahren streiche ich unmoegliche Faelle. |
| die Skizze | 草图 | Die Skizze zeigt drei Nullstellen, die Rechnung belegt sie. |
| die Parametertrennung | 分离参数 | Mit Parametertrennung steht $k$ allein auf einer Seite. |

## 5. Quelle / Aufgabe

- Alle sechs Mini-Beispiele selbst gestellt mit eigenen Zahlen, keine Gaokao- oder Buch-Texte kopiert.
- Abgleich der deutschen Saetze mit Formelsammlung NRW 2024 (lokal gelesen) und Serlo-Grundbegriffen.

## 6. Lernreise

- `Lernreise/Mathe-CN-Tricks-L1.md`（待建：每法1道自编题加德语检验句）

## 7. Fehlerlog

- [ ] Jeden Trick-Fehler (z. B. Spezialwert als Beweis verkauft) in 03_Mathe/Klausur-Training/Fehlerlog.md eintragen.

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（Spezialwert猜）：$x+\frac{9}{x}\ (x>0)$ 代 $x = 3$ 得 $6$，猜最小值 $6$。
- B题（AM-GM证）：同样式子用均值不等式证 $\ge 6$，等号 $x = 3$。
- 二选程序（先选再做）：“这题用哪个？因为猜不算证明而Klausur要begruenden，所以选B。”
- 一句话区别（A vs B）：A raet den Wert durch Einsetzen, B beweist das Minimum mit einer Ungleichung plus Gleichheitsbedingung.
- EN: Guessing finds the value; AM-GM proves it.

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：特殊值算对了就是证明 → 纠偏：只对一个点成立不代表全体（正确：Spezialwert nur zur Vermutung, Beweis allgemein）。
- 误解2：分离参数时不看分母符号直接乘过去 → 纠偏：负数要变号（正确：Vorzeichen von $h(x)$ pruefen, ggf. Ungleichung drehen）。
- EN: One value proves nothing; watch the sign when separating parameters.

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator, selbst gestellt)：Vergleiche $c = 4^{15}$ mit $d = 8^{10}$. Entscheide begruendet, welche Zahl groesser ist.
- Antwort (合书先写)：
- KR（对/错）：
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：

## TAKEAWAY: 1盒总结

> 六法只做草稿纸侦察：特值猜、排除砍、画图看、韦达验、均值凑、参分求最；正卷只写通法加条件句。
> Deutsch: Tricks gehoeren aufs Schmierpapier, in die Reinschrift gehoeren Standardweg und Bedingungssaetze.
> EN: Tricks scout on scrap paper; standard reasoning with conditions earns credit.

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为比较大指数要化同指数，所以先用幂法则把 $2^{30}$ 写成 $8^{10}$。
2. 元认知：哪里最卡/最易混？因为特值猜与证明长得很像，所以下次先问 Operator 是 entscheiden 还是 begruenden 再选写法。
