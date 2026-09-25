---
fach: Mathe
thema: "Iterationsprozesse und Kumulation"
operatoren: [beschreiben, berechnen, beurteilen, begruenden, deuten]
klausurrelevant: false
datum: 2026-09-25
tags: [Q2, Mathe, Analysis]
stufe: "Q2"
kursart: "GK|LK"
---

# Iterationsprozesse und Kumulation (迭代过程与累积)

> ⚠️ **非必考（nicht prüfungsrelevant im engeren Sinne）**：NRW KLP 把 `Iteration` 与 `Kumulation` 列为五个**跨领域概念**（konzeptionell vernetzende Konzepte）之一 [已验证]，但**没有把"迭代/累积"设为独立的必考内容板块**。本笔记因此标 `klausurrelevant: false` [据推断]。
> 它的价值是**方法层**：为 Aufgabenart II 的 `Modellieren` 子题（复利、药物残留、分期偿还）提供一套可算的框架，并作为「离散 ⇄ 连续」的对照卡 [据推断]。
>
> **中文理解**：`Iterationsprozess`（迭代过程）指"**后一项由前一项决定**"的关系 $a_{n+1}=f(a_n)$；`Kumulation`（累积）指"**逐项累加**" $S_n=\sum a_k$。两者在德国都以**函数/图像**语言出现，而非"数列板块"。
> 它们位于 Inhaltsfeld A（节点 `MA-A5-03`），是 Q2 的**拓展单元**：与 `Exponentialfunktionen`（连续版增长）和积分概念链（连续版累积）互为对照。
>
> **Klausur-Relevanz**：**非笔试必考**；但作为 `Modellieren` 的现实情境题载体与口试 `Vermuten → Begründen` 素材，仍有提分价值 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Iteration | 迭代 | iteration | 反复代入同一运算 | KLP 点名概念 [已验证] |
| Iterationsprozess | 迭代过程 | iterative process | $a_{n+1}=f(a_n)$ | 本笔记主对象 |
| Rekursion | 递推 | recursion | 用前项定义后项 | 德国术语 |
| rekursive Darstellung | 递推式 | recursive form | $a_{n+1}=p\,a_n+q$ | 一阶线性型 |
| geschlossene Form | 闭式 / 通项 | closed form | $a_n=\dots$（只含 $n$） | 目标产物 |
| Kumulation | 累积 | cumulation | $S_n=\sum_{k} a_k$ | KLP 点名概念 [已验证] |
| Kumulationsprozess | 累积过程 | cumulative process | 逐期累加的量 | 与积分对照 |
| Fixpunkt | 不动点 | fixed point | 解 $c=f(c)$ | 平衡态 |
| Gleichgewichtszustand | 平衡态 | equilibrium | $a_n\to c$（$|p|<1$） | 长期极限 |
| Wachstumsfaktor | 增长因子 | growth factor | 每期乘数 $p$ | 如 1,03 |
| Zinseszins | 复利 | compound interest | $K_n=K_0(1+i)^n$ | 经典载体 |
| Tilgung | 分期偿还 | amortization | $K_{n+1}=qK_n-R$ | 现实情境 |

> 条目来源：KLP 点名五个跨领域概念含 `Iteration`、`Kumulation` [已验证]；「非必考」为本项目对 KLP 结构与真题的保守判断 [据推断]；节点 `MA-A5-03`。

---

## 2. 知识结构 (Struktur)

### 2.1 迭代过程的两种写法

- **递推式**（rekursiv）：$a_{n+1}=f(a_n)$，给起点 $a_0$ 即可逐项算出 [据推断]
- **闭式**（geschlossen）：$a_n$ 只含 $n$，可直接算第 $n$ 项 [据推断]

> *Klausur-Satz*: Ein Iterationsprozess wird rekursiv durch $a_{n+1}=f(a_n)$ beschrieben; gesucht ist oft eine geschlossene Form für $a_n$.

### 2.2 一阶线性迭代 $a_{n+1}=p\,a_n+q$（最重要的一类）

设不动点 $c$ 满足 $c=pc+q$，则

$$c=\frac{q}{1-p}\quad\Longrightarrow\quad a_n=c+(a_0-c)\,p^{\,n}$$

- $|p|<1$ ⇒ $a_n\to c$（**收敛到平衡态**）[据推断]
- $|p|>1$ ⇒ 一般**发散**（远离不动点）[据推断]
- $q=0$ 时退化为几何增长 $a_n=a_0p^n$（纯复利）[据推断]

> *Klausur-Satz*: Für $a_{n+1}=p\,a_n+q$ mit $p\neq1$ gilt $a_n=c+(a_0-c)p^n$ mit dem Fixpunkt $c=\frac{q}{1-p}$.

### 2.3 不动点的意义（现实解读）

- $c$ 是**长期水平**：如药物的稳态血药浓度、贷款长期走势的分界 [据推断]
- 单调性与 $p$ 的符号有关；**逼近或远离**由 $|p|$ 决定

> *Klausur-Satz*: Der Fixpunkt $c$ beschreibt den langfristigen Gleichgewichtszustand des Prozesses.

### 2.4 Kumulation（累积）

$$S_n=\sum_{k=1}^{n}a_k,\qquad \text{几何型：} S_n=a_1\frac{1-q^{\,n}}{1-q},\qquad \lim_{n\to\infty}S_n=\frac{a_1}{1-q}\ (|q|<1)$$

- 现实意义：**总排放量、总收益、体内累积摄入量** [据推断]
- 与 A 域对照：$S_n$ 的**离散版** ⇄ `Bestandsfunktion` / `Integralfunktion` 的**连续版** [已验证]

> *Klausur-Satz*: Die Kumulation summiert die Einzelbeiträge $a_k$ auf; bei geometrischem Abfall der Beiträge strebt die Gesamtsumme einem endlichen Grenzwert zu.

### 2.5 离散 ⇄ 连续（跨领域对照）

| 维度 | 离散（Iteration/Kumulation） | 连续（A 域） |
|---|---|---|
| 增长 | $a_{n+1}=p\,a_n$ | $f(t)=a_0e^{kt}$ |
| 累积 | $S_n=\sum a_k$ | $\int_a^b f(t)\,dt$ |
| 总极限 | $\sum_{k=0}^{\infty} q^k=\frac{1}{1-q}$ | $\int_1^{\infty}x^{-p}dx$（$p>1$） |

> ⚠️ 换算：年增长因子 $p$ 与连续增长率 $k$ 满足 $p=e^{k}$，即 $k=\ln p$ [据推断]。

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：由迭代求闭式（`berechnen`）

1. 写出递推式与初值 $a_0$ —— *KLP 工具：`Rekursion`*
2. 判断类型：纯几何（$q=0$）或一阶线性（$q\neq0$） —— *KLP 工具：`Struktur erkennen`*
3. 线性型求不动点 $c=\frac{q}{1-p}$ —— *KLP 工具：`Gleichung lösen`*
4. 套 $a_n=c+(a_0-c)p^n$ —— *KLP 工具：`geschlossene Form`*
5. 回译情境（含单位） —— *KLP 工具：`deuten`*

> **判据 / 决策点**：$q=0$ ⇒ 直接 $a_n=a_0p^n$，不必求不动点。

### 3.2 方法 B：算累积量（`berechnen`）

1. 写出单期量 $a_k$（几何型先求公比 $q$） —— *KLP 工具：`Kumulation`*
2. 套 $S_n=a_1\frac{1-q^n}{1-q}$ —— *KLP 工具：`Summenformel`*
3. 需要时取极限 $\lim_{n\to\infty}$ —— *KLP 工具：`Grenzwert`*
4. 回译：总量、长期上限 —— *KLP 工具：`interpretieren`*

> **判据 / 决策点**：问"总量"用 $S_n$；问"长期总上限"用极限。

### 3.3 方法 C：平衡态与稳定性（`untersuchen`）

1. 解 $c=f(c)$ 得不动点 —— *KLP 工具：`Fixpunkt`*
2. 看 $|p|$：$<1$ 收敛、$>1$ 远离 —— *KLP 工具：`Grenzverhalten`*
3. 结合初值 $a_0$ 说明走向 —— *KLP 工具：`Monotonie`*
4. 用情境语言说明意义 —— *KLP 工具：`deuten`*

### 3.4 方法 D：模型评判（`beurteilen`，AFB III）

1. 指出离散模型适用条件（按年/按日**计数**的量） —— *KLP 工具：`Modellieren`*
2. 指出连续模型适用条件（**连续变化**的量） —— *KLP 工具：`Modellieren`*
3. 比较二者换算关系 $p=e^k$ —— *KLP 工具：`Exponentialfunktion`*
4. 给出有理由的判断（含模型边界） —— *KLP 工具：`beurteilen`*

> **判据 / 决策点**：`beurteilen` 必须给出理由 [已验证]。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 递推构造（由 $a_{n+1}=p\,a_n+q$ 化为等比）

- **技法内容**：面对"后一项由前一项决定"的迭代关系，先判断类型——只差一个常数（$+q$）就**凑成等比**：令 $c=\frac{q}{1-p}$，则 $a_{n+1}-c=p(a_n-c)$，即新量 $b_n=a_n-c$ 是公比 $p$ 的等比数列，从而直接读出通项 $a_n=c+(a_0-c)p^n$。若系数随 $n$ 变化，则改用累加或取倒数/取对数换元。
- **DE-Anschluss**：`Iteration` 与 `Kumulation` 是 KLP 点名的跨领域概念 [已验证]；递推只用到 EF 已教的 `funktionale Zusammenhang`、解一元一次方程、`Multiplikation mit einem Skalar`；情境载体（复利/药物残留）与 Q1 的 `Exponentialfunktionen` 增长模型同源 [已验证]。
- **合规性**：⚠️ 需注意 —— **「数列（Folge）」作为独立知识板块在德国 KLP 中不存在（CN-only）**，故**不能作为考纲内容引入**；只能以「迭代过程建模（`Iterationsprozess`）」的方法层出现，且题目包装必须用德国既有术语（`Rekursion` / `Iteration` / `Kumulation`）。
- **Abitur 应用**：Aufgabenart II 的 `Modellieren` 子题（AFB II）——长期趋势、逐期衰减、分期偿还；末段常接"模型边界评判"（AFB III）。口试可作"先算前几项 → 猜想闭式 → 论证"的 `Vermuten → Begründen` 素材。**非笔试必考** [据推断]。
- **来源**：`[CN-课标]` 等差数列与等比数列概念、通项公式 · `[CN-教材]` 待定系数构造 · `[CN-高考]` 递推数列求通项（**原创改写，不搬原题**）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart II（`Modellieren` 子题）[据推断] |
| Operator | `beschreiben` / `berechnen` / `beurteilen`（数学不按动词分 AFB）[已验证] |
| AFB | II（求闭式/累积）→ III（模型评判）[据推断] |
| 建议分值 / 时长 | 单小问 4–7 BE；整题 12–18 BE / 约 20–30 min [据推断] |
| ⚠️ 频率提示 | **非必考**：KLP 点名概念但未设独立板块 [已验证/据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Sparguthaben von 1000 € wird jährlich mit 3 % verzinst (Zinseszins).
> a) Geben Sie eine rekursive Beschreibung an.
> b) Bestimmen Sie eine geschlossene Form und berechnen Sie das Guthaben nach 10 Jahren.

**Aufgabe 2** `[原创]`
> Ein Patient nimmt täglich 20 mg eines Medikaments ein. Pro Tag werden 20 % des im Körper befindlichen Wirkstoffs abgebaut. Mit $a_n$ werde die Wirkstoffmenge (in mg) **unmittelbar nach** der $n$-ten Einnahme bezeichnet; vor der ersten Einnahme sei $a_0=0$.
> a) Stellen Sie eine Rekursion für $a_n$ auf.
> b) Bestimmen Sie die geschlossene Form und $a_{10}$.
> c) Untersuchen Sie das langfristige Verhalten und deuten Sie es im Sachzusammenhang.

**Aufgabe 3** `[原创]`
> Ein Betrieb emittiert im ersten Jahr 100 t eines Stoffes; in jedem folgenden Jahr beträgt die Emission 60 % des Vorjahres. $a_k$ sei die Emission im Jahr $k$.
> a) Berechnen Sie die Gesamtemission $S_n$ der ersten $n$ Jahre.
> b) Bestimmen Sie $\lim_{n\to\infty}S_n$ und deuten Sie das Ergebnis.

**Aufgabe 4** `[原创]`（AFB III）
> Ein Modell beschreibt eine Population entweder diskret durch $a_{n+1}=1{,}05\,a_n$ (jährliche Zählung) oder kontinuierlich durch $f(t)=a_0e^{kt}$.
> a) Bestimmen Sie $k$ so, dass beide Modelle dieselbe jährliche Zunahme beschreiben.
> b) Beurteilen Sie, welches Modell für eine einmal jährlich gezählte Population angemessener ist.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Rekursion**: $K_{n+1}=1{,}03\,K_n$ mit $K_0=1000$ ✓ 得分点：写出递推式
2. **b) Geschlossene Form**: $K_n=1000\cdot1{,}03^{\,n}$ ✓
3. **b) Wert**: $K_{10}=1000\cdot1{,}03^{10}\approx1000\cdot1{,}3439=1343{,}92$ ✓ 得分点：代入 $n=10$
4. **b) Ergebnis**: Nach 10 Jahren beträgt das Guthaben etwa **1343,92 €**. ✓ 得分点：带单位结论句

**Aufgabe 2**
1. **a) Rekursion**: $a_{n+1}=0{,}8\,a_n+20$, $a_0=0$ ✓ 得分点：正确取 $p=0{,}8$, $q=20$
2. **b) Fixpunkt**: $c=\dfrac{20}{1-0{,}8}=100$ ✓ 得分点：求不动点
3. **b) Geschlossene Form**: $a_n=100+(0-100)\cdot0{,}8^{\,n}=100\,(1-0{,}8^{\,n})$ ✓
4. **b) Wert**: $a_{10}=100(1-0{,}8^{10})\approx100(1-0{,}1074)=89{,}26$ mg ✓ 得分点：数值
5. **c) Grenzwert**: Da $|0{,}8|<1$, gilt $a_n\to100$ mg. ✓ 得分点：用 $|p|<1$ 判收敛
6. **c) Deutung**: Der Wirkstoffgehalt strebt einem **Gleichgewicht (Sättigungswert) von 100 mg** zu — Zufuhr und Abbau halten sich dann die Waage. ✓ 得分点：情境解释

**Aufgabe 3**
1. **a) Geometrische Folge**: $a_k=100\cdot0{,}6^{\,k-1}$ ✓ 得分点：写出单期量
2. **a) Summe**: $S_n=100\cdot\dfrac{1-0{,}6^{\,n}}{1-0{,}6}=250\,(1-0{,}6^{\,n})$ ✓ 得分点：Summenformel
3. **b) Grenzwert**: $\lim_{n\to\infty}S_n=250$ (t), da $0{,}6^n\to0$. ✓ 得分点：取极限
4. **b) Deutung**: Auch langfristig werden **höchstens 250 t** emittiert, obwohl über unbegrenzt viele Jahre emittiert wird — die Beiträge nehmen schnell genug ab. ✓ 得分点：`deuten` 回译

**Aufgabe 4**
1. **a) Ansatz**: Es muss $e^{k}=1{,}05$ gelten. ✓ 得分点：建立换算关系
2. **a) Ergebnis**: $k=\ln(1{,}05)\approx0{,}0488$ ✓
3. **b) Beurteilung**: Für eine **einmal jährlich gezählte** Population ist das **diskrete** Modell $a_{n+1}=1{,}05a_n$ angemessener, da die Zählung nur zu diskreten Zeitpunkten erfolgt und Zwischenwerte nicht beobachtet werden. ✓ 得分点：给出理由
4. **b) Ergänzung**: Das kontinuierliche Modell ist vorteilhaft, wenn Wachstum **ständig** abläuft (z. B. große Populationen ohne festen Fortpflanzungszeitpunkt); beide Modelle sind bei kleinen Zeitschritten nahezu gleichwertig. ✓ 得分点：模型边界（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把迭代过程当**独立知识板块**（数列）来学 → 超出德国考纲 | 记住：只以 `Iterationsprozess` 的方法层出现 |
| 辨别错 | 混淆"单期量 $a_k$"与"累积量 $S_n$" | 方法 B 判据：问总量用 $S_n$ |
| 知识错 | 一阶线性型不求不动点，硬套几何公式 | 方法 A 步骤 3 |
| 知识错 | 用 $|p|<1$ 判收敛却把 $p$ 取成 $q$ | 方法 C 步骤 2：看**乘数** $p$ |
| 表达错 | 忘记说明"离散 vs 连续哪个更合适" | 方法 D 步骤 4 |
| 表达错 | 结果不回译情境、不写单位 | 结论句带单位与解释 |

---

## 7. Vernetzung

- **上游**：`MA-A1-05` 指数函数（[`Exponentialfunktionen-Wachstum-und-Zerfall.md`](Exponentialfunktionen-Wachstum-und-Zerfall.md)）· `MA-A5-02` 存量函数与积分函数
- **下游**：`MA-A5-06` 反常积分（**离散总和的极限 ⇄ 反常积分的收敛**，[`Uneigentliche-Integrale-und-Rotationsvolumen-LK.md`](Uneigentliche-Integrale-und-Rotationsvolumen-LK.md)）[据推断]· `MA-A6-01` Modellieren 四段闭环
- **横向**：`MA-A5-01` 乘积和（**离散累加 → 连续积分**的概念桥）[已验证]· 生物（种群/药物动力学）· 经济（复利、分期偿还）
- **术语卡**：`Iteration` / `Iterationsprozess` / `Rekursion` / `geschlossene Form` / `Kumulation` / `Fixpunkt` / `Gleichgewichtszustand`（建议由主线程补入 Q2 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬原题），解析为原创。不搬运出版社教辅原文。
