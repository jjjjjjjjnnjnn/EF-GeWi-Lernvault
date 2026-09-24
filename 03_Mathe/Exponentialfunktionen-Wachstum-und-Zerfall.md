---
fach: Mathe
thema: "Exponentialfunktionen: Wachstum und Zerfall"
operatoren: [beschreiben, erlaeutern, berechnen, bestimmen, deuten, beurteilen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Mathe, Analysis]
stufe: "Q1"
---

# Exponentialfunktionen: Wachstum und Zerfall (指数函数：生长与衰减建模)

> **中文理解**：指数函数 $f(x)=a^x$（$a>0,\ a\neq1$）描述**「每单位时间乘以同一个因子」**的过程——这正是生长与衰减的共同数学结构。
> 底数 $a>1$ 时单调增（Wachstum），$0<a<1$ 时单调减（Zerfall）；所有指数函数都过 $(0\,|\,1)$，且 $x\to-\infty$ 时趋近 $x$ 轴 [已验证]。
> $e^x$ 特殊在于 **$f'=f$**：它的变化率等于自身，因此是连续生长/衰减模型的唯一自然载体 [已验证]。
> Q1 的 A 域函数类只有**整有理函数 + 指数函数**两类；生长/衰减是 2. Prüfungsteil 现实情境题（`realitätsnah`）的标准形态，AFB II 高频 [已验证]。
>
> **Klausur-Relevanz**：Q1-A 的**最大单点缺口之一**；题目常要求 ①说明 $a^x$ 的性质 ②解释 $e^x$ 的特殊性 ③由数据定参数 ④回译现实结论（AFB II → III）[已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Exponentialfunktion | 指数函数 | exponential function | $f(x)=a^x$，$a>0,\ a\neq1$ | $x$ 在指数上 [已验证] |
| Wachstum | 生长 | growth | $a>1$，单调递增 | 倍增 |
| Zerfall | 衰减 | decay | $0<a<1$，单调递减 | 半衰 |
| Wachstumsfaktor | 增长因子 | growth factor | 每期乘以的常数 $a$ | $a=1+p$ |
| Wachstumsrate | 增长率 | growth rate | $p=a-1$，常写作百分数 | $p>0$ 生长、$p<0$ 衰减 |
| Anfangswert | 初值 | initial value | $f(0)=c$（在 $f(x)=c\cdot a^x$ 中） | 与纵轴交点 |
| Natürliche Exponentialfunktion | 自然指数函数 | natural exponential function | $f(x)=e^x$，$e\approx2{,}718$ | $f'=f$ [已验证] |
| Verdopplungszeit | 倍增时间 | doubling time | 解 $a^T=2$ 得 $T$ | 生长模型 |
| Halbwertszeit | 半衰期 | half-life | 解 $a^T=\tfrac12$ 得 $T$ | 衰减模型 |
| e-Funktion mit Parameter | 含参 e 函数 | — | $f(t)=c\cdot e^{kt}$，$k>0$ 生长、$k<0$ 衰减 | 连续模型 |

---

## 2. 知识结构 (Struktur)

### 2.1 指数函数的性质（Q1 必背）

| 性质 | 内容 |
|---|---|
| 定义域 | $\mathbb{R}$（全体实数） |
| 值域 | $(0,\infty)$——**永远取不到 $0$ 或负数** |
| 必过点 | $(0\,|\,1)$（因 $a^0=1$） |
| 单调性 | $a>1$ 严格递增；$0<a<1$ 严格递减 |
| 两端行为 | $a>1$：$x\to-\infty$ 时 $\to0$（$x$ 轴为渐近线）；$x\to+\infty$ 时 $\to\infty$ |
| 无零点 | 指数函数**没有零点** |

> *Klausur-Satz*: Die Exponentialfunktion $f(x)=a^x$ hat den Definitionsbereich $\mathbb{R}$ und den Wertebereich $(0,\infty)$; für $a>1$ ist sie streng monoton wachsend, für $0<a<1$ streng monoton fallend. Der Graph verläuft durch $(0\,|\,1)$ und nähert sich der $x$-Achse asymptotisch an.

### 2.2 为什么 $e^x$ 特殊（KLP 明文要求「解释」）

在所有指数函数中，只有 $e^x$ 满足 $f'(x)=f(x)$：**变化率等于当前值**。这意味着「增长越快、增长得越快」——增长率与存量成正比，正是连续生长/衰减过程的数学刻画 [已验证]。

- 因此任何连续生长/衰减都可写成 $f(t)=c\cdot e^{kt}$
- $k>0$：生长；$k<0$：衰减；$|k|$ 越大，变化越快
- 离散分期模型 $c\cdot a^t$ 与连续模型 $c\cdot e^{kt}$ 通过 $a=e^k$ 互相换算

> *Klausur-Satz*: Die natürliche Exponentialfunktion $e^x$ ist dadurch ausgezeichnet, dass sie mit ihrer eigenen Ableitung übereinstimmt: $(e^x)'=e^x$. Daher beschreibt $f(t)=c\cdot e^{kt}$ einen stetigen Wachstums- bzw. Zerfallsprozess, bei dem die Änderungsrate proportional zum aktuellen Bestand ist.

### 2.3 生长/衰减建模：三参数结构

一般形式 $f(t)=c\cdot a^{t}$ 或 $f(t)=c\cdot e^{k t}$：

| 参数 | 含义 | 求法 |
|---|---|---|
| $c$ | 初值 $f(0)$ | 直接读「开始时」的数据 |
| $a$ | 每期因子 | 两个相邻等距数据点相除 |
| $k$ | 连续变化率 | 由两点数据解方程 $c\,e^{kt_1}=y_1$ 等 |

- **增长率 $p$**：$a=1+p$（$p=0{,}05$ ⇒ 每期增长 5%）
- **倍增/半衰时间**：$a^T=2$ 或 $a^T=\tfrac12$，取对数（**LK**）或数值试探（GK）[据推断]

> *Klausur-Satz*: Ein exponentieller Wachstums- oder Zerfallsprozess lässt sich in der Form $f(t)=c\cdot a^{t}$ darstellen, wobei $c$ der Anfangswert und $a$ der Wachstumsfaktor pro Zeiteinheit ist. Es gilt $a=1+p$ mit der Wachstumsrate $p$.

### 2.4 建模四段闭环（Modellieren，法定能力）

`Strukturieren → Mathematisieren → Interpretieren → Validieren`

> ⚠️ 最常见失分：算出数学答案就停，**不回译现实语言、不评模型边界**（AFB III 直接丢分）[已验证]。

> *Klausur-Satz*: Bei realitätsnahen Aufgaben ist das Ergebnis stets im Sachkontext zu interpretieren und das Modell kritisch zu beurteilen (z. B. Gültigkeitsgrenzen des exponentiellen Ansatzes).

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：由两点数据定模型（标准四步）

1. **定初值** $c=f(0)$ —— *KLP 工具：`Anfangswert`*
2. **求因子** $a=\dfrac{f(t_2)}{f(t_1)}$（等距两点）—— *KLP 工具：`Wachstumsfaktor`*
3. **写函数** $f(t)=c\cdot a^{t}$ —— *KLP 工具：`Exponentialfunktion`*
4. **回译** 用现实语言回答（单位、含义）—— *KLP 工具：`Modellieren`（Interpretieren）*

> **判据 / 决策点**：若给出的是「每年增长 5%」，直接用 $a=1{,}05$，不必算两点比值。

### 3.2 方法 B：求特定时刻的值 / 求何时达到某值

1. **求值**：把 $t$ 代入 —— *KLP 工具：`berechnen`*
2. **求时刻**：解 $c\,a^{t}=y$，即 $a^{t}=\dfrac{y}{c}$ —— *KLP 工具：`LGS`/指数方程*
3. GK 阶段：**数值试探**（试几个 $t$ 逼近）；LK：取对数 $t=\dfrac{\ln(y/c)}{\ln a}$ —— *KLP 工具：LK `ln`*

> **判据 / 决策点**：GK **无对数函数**，只能数值逼近或由题干给出中间值；**LK 才能用 `ln`** [已验证]。

### 3.3 方法 C：连续模型 $c\,e^{kt}$ 的参数确定

1. 由初值定 $c$ —— *KLP 工具：`Anfangswert`*
2. 由另一点数据列 $c\,e^{kt_1}=y_1$ —— *KLP 工具：`Exponentialgleichung`*
3. 解出 $k$（LK 用 $\ln$；GK 若给 $e^k$ 形式则直接读）—— *KLP 工具：LK `ln`*
4. 用 $k$ 的符号解释生长/衰减 —— *KLP 工具：`deuten`*

> **判据 / 决策点**：题目出现「stetig / kontinuierlich」时用 $e^{kt}$；出现「jährlich / pro Periode」时用 $a^t$。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 指数型增长的「两参数定式」与增长率换算

- **技法内容**：中国把指数增长/衰减统一成 $y=c\cdot a^{x}$ 的**两参数定式**，并用一条固定链求参数：**先读初值 $c$ → 再用两个数据点相除求 $a$ → 由 $a=1+p$ 换算增长率 $p$**。求「何时达到某值」时，把方程化为 $a^x=\text{常数}$，再作数值估计或（选必）取对数。
- **DE-Anschluss**：Q1 的 A 域函数类正是**整有理函数 + 指数函数** [已验证]；德国 KLP 明文要求「说明 $a^x$ 的性质并解释 $e^x$ 的特殊性」[已验证]；`Modellieren` 四段闭环是德国更细的评价维度 [已验证]。本技法只把德国已有的参数确定步骤**固定成一条链**。
- **合规性**：✅ 完全合规 —— 全部落在 Q1 允许的函数类内。⚠️ 注意：**对数是 LK 内容**，GK 无对数函数，故「取对数求时间」这一步**只能在 LK 使用**；GK 用数值试探 [已验证]。
- **Abitur 应用**：2. Prüfungsteil 现实情境题（人口增长、放射性衰变、药物浓度、复利），AFB II 主力；末段常接模型边界评判（AFB III）[据推断]。
- **来源**：`[CN-课标]` 指数函数（运算性质、单调性、特殊点）、指数函数与对数函数互为反函数 · `[CN-教材]` 两参数定式 · `[CN-高考]` 指数型增长/衰减建模

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | 2. Prüfungsteil（工具）现实情境建模题为主；免工具段可考性质复述 [据推断] |
| Operator | `beschreiben` / `erlaeutern` / `berechnen` / `bestimmen` / `deuten` / `beurteilen`（数学不按动词分 AFB）[已验证] |
| AFB | I–II（性质复述 + 参数确定）为主，末段 AFB III（模型评判）[据推断] |
| 建议分值 / 时长 | 建模子题 8–15 BE / 约 12–20 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`（Wachstum，两参数定式）
> Eine Bakterienkultur wächst exponentiell. Zu Beginn ($t=0$) sind $500$ Bakterien vorhanden, nach $3$ Stunden sind es $4000$.
> a) Bestimmen Sie eine Funktionsgleichung $f(t)=c\cdot a^{t}$.
> b) Berechnen Sie die Anzahl der Bakterien nach $6$ Stunden.
> c) Erläutern Sie, was der Faktor $a$ in diesem Sachzusammenhang bedeutet.

**Aufgabe 2** `[NRW-改编]`（Zerfall，半衰期）
> Die Masse eines radioaktiven Stoffes nimmt exponentiell ab. Nach $t$ Jahren gilt $m(t)=80\cdot0{,}5^{\,t/10}$ (Masse in Gramm).
> a) Geben Sie die Anfangsmasse an.
> b) Berechnen Sie die Masse nach $25$ Jahren.
> c) Bestimmen Sie die Halbwertszeit und deuten Sie sie im Sachzusammenhang.

**Aufgabe 3** `[原创]`（$e^x$ 的特殊性，概念题 AFB II）
> Gegeben ist $f(t)=100\cdot e^{0{,}05\,t}$ für $t\ge0$.
> a) Begründen Sie, dass $f$ ein Wachstumsprozess beschreibt.
> b) Erläutern Sie den Vorteil der Schreibweise mit der natürlichen Exponentialfunktion $e^{kt}$ gegenüber $a^{t}$.

**Aufgabe 4** `[原创]`（Modellkritik，AFB III）
> Ein Modell beschreibt die Einwohnerzahl einer Stadt mit $E(t)=50000\cdot1{,}03^{t}$ ($t$ in Jahren ab 2025).
> a) Berechnen Sie die Einwohnerzahl im Jahr 2035.
> b) Beurteilen Sie, ob dieses Modell für einen sehr langen Zeitraum geeignet ist.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Anfangswert**: $c=f(0)=500$ ✓ 得分点：读初值
2. **a) Faktor**: $a^3=\dfrac{4000}{500}=8\Rightarrow a=\sqrt[3]{8}=2$ ✓ 得分点：用两点比值
3. **a) Funktion**: $f(t)=500\cdot2^{t}$ ✓
4. **b) Wert**: $f(6)=500\cdot2^{6}=500\cdot64=32000$ ✓ 得分点：代入计算
5. **c) Deutung**: Der Faktor $a=2$ bedeutet, dass sich die Anzahl der Bakterien **pro Stunde verdoppelt**. ✓ 得分点：`erlaeutern` 要求建立情境关联

**Aufgabe 2**
1. **a)**: $m(0)=80\cdot0{,}5^{0}=80$ g ✓ 得分点：$t=0$ 代入
2. **b)**: $m(25)=80\cdot0{,}5^{2{,}5}=80\cdot\dfrac{1}{2^{2{,}5}}\approx80\cdot0{,}1768\approx14{,}14$ g ✓ 得分点：指数运算
3. **c) Ansatz**: Die Halbwertszeit ist der Wert $T$ mit $m(T)=\tfrac12 m(0)$; hier steht im Exponenten $t/10$, also halbiert sich die Masse alle $10$ Jahre. ✓ 得分点：从指数结构读出
4. **c) Deutung**: Nach jeweils $10$ Jahren ist nur noch die Hälfte der Masse vorhanden, d. h. $T=10$ Jahre. ✓ 得分点：`deuten` 用现实语言

**Aufgabe 3**
1. **a) Begründung**: Wegen $k=0{,}05>0$ ist $f$ streng monoton wachsend; außerdem gilt $f(0)=100>0$. Also beschreibt $f$ einen Wachstumsprozess. ✓ 得分点：给出 $k>0$ 与初值
2. **b) Vorteil**: Bei der Schreibweise $c\cdot e^{kt}$ ist der Parameter $k$ **direkt die momentane Änderungsrate** (Wachstumskonstante); zudem gilt $(e^{kt})'=k\,e^{kt}$, sodass das Ableiten besonders einfach ist. ✓ 得分点：点出 $f'=f$ 的推广
3. **b) Zusatz**: Die Form $c\cdot a^{t}$ beschreibt dagegen diskrete Perioden mit festem Faktor $a$ pro Zeiteinheit. ✓ 得分点：区分连续/离散

**Aufgabe 4**
1. **a)**: $t=10$ (2025 + 10 = 2035): $E(10)=50000\cdot1{,}03^{10}\approx50000\cdot1{,}3439\approx67196$ Einwohner. ✓ 得分点：年份转 $t$
2. **b) Kriterium**: Ein exponentielles Wachstum mit $a>1$ wächst unbeschränkt, während die reale Einwohnerzahl durch Platz, Ressourcen usw. begrenzt ist. ✓ 得分点：指出模型边界
3. **b) Beurteilung**: Für einen sehr langen Zeitraum ist das Modell **nicht geeignet**, da es zu unrealistisch großen Werten führt; besser wäre z. B. ein begrenztes Wachstumsmodell (logistisch). ✓ 得分点：`beurteilen` 必须给出理由（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把 `e^x` 与 `x^n` 的求导规则混用（写 $(e^x)'=x e^{x-1}$） | 牢记 $(e^x)'=e^x$，幂函数才降次 [已验证] |
| 辨别错 | 连续模型 $e^{kt}$ 与离散模型 $a^t$ 混用（单位对不上） | 看题干关键词「stetig/kontinuierlich」vs「pro Jahr」 |
| 知识错 | 求时间时 GK 阶段直接用 `ln`（未教） | GK 用数值试探；`ln` 只限 LK [已验证] |
| 知识错 | 认为指数函数有零点；或把值域写成 $\mathbb{R}$ | 值域是 $(0,\infty)$，图像只在 $x$ 轴上方 |
| 表达错 | 算出数学答案就停，不写现实结论与单位 → 违反 `Modellieren` 末段要求 [已验证] | 每题末段必写一句 `Interpretation` |

---

## 7. Vernetzung

- **上游**：`MA-A1-01` 幂函数 · `MA-A1-02` 整有理函数 · `MA-A2-01`–`MA-A2-02` 图像变换（[`Ganzrationale-Funktionen-Kurvendiskussion.md`](Ganzrationale-Funktionen-Kurvendiskussion.md)）
- **下游**：`MA-A3-05` 链式法则（$e^{kx}$ 求导，[`Produkt-und-Kettenregel.md`](Produkt-und-Kettenregel.md)）· `MA-A5-03` Iterations- und Kumulationsprozesse · `MA-A6-01` 建模四段闭环 · LK `MA-A6-05` `ln` 与三角
- **横向**：物理（放射性衰变、RC 电路）；生物（种群增长）；SoWi（复利、经济增长）
- **术语卡**：`Wachstumsfaktor` / `Wachstumsrate` / `Halbwertszeit` / `Verdopplungszeit` / `Anfangswert` / `natürliche Exponentialfunktion`（建议由主线程补入 Q1 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
