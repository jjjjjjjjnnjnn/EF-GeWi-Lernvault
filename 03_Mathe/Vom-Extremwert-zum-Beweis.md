---
fach: Mathe
thema: "Vom Extremwert zum Beweis"
operatoren: [begruenden, nachweisen, zeigen, untersuchen, bestimmen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Mathe, Analysis]
stufe: "Q1|Q2"
---

# Vom Extremwert zum Beweis (用导数证明不等式)

> **中文理解**：要证 $f(x)\ge g(x)$，作辅助函数 $F(x)=f(x)-g(x)$，把"证不等式"翻译成"证 $F$ 的最小值 $\ge 0$"。
> 步骤固定为：**移项构造 → 求导 → 由 $F'$ 符号定单调区间 → 算候选极值点与端点 → 比较得最小值 → 下结论**。
> **德国 KLP 没有这一整类题型**，但工具 100% 已在德国教过（EF 的 `Monotonie`、`Extrempunkte`、`lokale und globale Extrema`、`Krümmungsverhalten`；Q1 的 `Produktregel`；LK 的 `Kettenregel` 与 `ln`）[已验证]。
> 因此它是把"求极值"**重组**为"证不等式"的纯方法层升级，是把德国偏弱的 AFB III `Argumentieren` 变成得分点的**最短路径**。
>
> **Klausur-Relevanz**：① `Extremwertprobleme` 末段"证明这是全局最大"（AFB III）；② 免工具论证题（整有理函数类，GK 亦可）；③ 口试 `Begründen` 环节 [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Hilfsfunktion | 辅助函数 | auxiliary function | $F(x)=f(x)-g(x)$ | 构造的核心 |
| Ungleichung | 不等式 | inequality | $f(x)\ge g(x)$ | 目标命题 |
| Monotonie | 单调性 | monotonicity | $F'\ge 0\Rightarrow F$ 单调增 | EF 已教 [已验证] |
| Notwendige Bedingung | 必要条件 | necessary condition | $F'(x_0)=0$ | 候选点 |
| Hinreichende Bedingung | 充分条件 | sufficient condition | 符号变化 / $F''\ne 0$ | 判极值 [已验证] |
| Globales Minimum | 全局最小值 | global minimum | 区间上 $F$ 的最小值 | 端点必须比 [已验证] |
| Krümmungsverhalten | 凹凸性 | curvature | $F''$ 定号 | $F'$ 符号难判时用 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 为什么这个技法在德国完全合规

它不是新知识，而是**已知工具的重新组合**：

| 本技法用到的步骤 | 德国对应条目 | 学段 |
|---|---|---|
| 构造 $F=f-g$ | `Termumformung` | EF |
| 求 $F'$ | `Ableitungsregeln`（幂/和/因子）、Q1 `Produktregel`、LK `Kettenregel` | EF→Q1/LK [已验证] |
| 由 $F'$ 符号定单调 | `Monotonie` | EF [已验证] |
| 找极值与全局最值 | `lokale und globale Extrema` + 端点比较 | EF [已验证] |
| $F'$ 符号难判时再求导 | `Krümmungsverhalten` / `Wendepunkte` | EF [已验证] |

> *Klausur-Satz*: Um $f(x)\ge g(x)$ zu beweisen, betrachtet man die Hilfsfunktion $F(x)=f(x)-g(x)$ und zeigt, dass ihr globales Minimum auf dem betrachteten Intervall nichtnegativ ist.

### 2.2 五步链（合书默写目标）

```
① 移项构造 F = f − g      ② 求导 F'
        ▲                          │
        │                          ▼
⑤ 下结论（F_min ≥ 0） ◀── ④ 比较驻点与端点 ◀── ③ 由 F' 符号定单调
```

> ⚠️ 常见断裂点：③ 之后**直接**说"所以 $F\ge0$"，**漏掉 ④ 的端点比较**——尤其当区间是闭区间时，最小值可能出现在端点。

### 2.3 三条常用结构识别

1. **指数型**（`e^x` 与多项式比大小）：$F'$ 常可因式分解，符号一目了然
2. **对数型**（LK，`ln` 与线性比大小）：注意 $F$ 的**定义域**（$x>-1$ 等）
3. **乘积型**（如 $x e^{-x}$）：须用 `Produktregel`，且通常要求"全局"最大而非局部

> *Klausur-Satz*: Bei der Beweisstruktur ist stets der Definitionsbereich der Hilfsfunktion anzugeben und eine Randwertprüfung durchzuführen.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：标准五步链（首选）

1. **移项构造**：令 $F(x)=f(x)-g(x)$，明确定义域 $D$ —— *KLP 工具：`Termumformung`、`Definitionsbereich`*
2. **求导**：算 $F'$（按函数类型选幂/和/因子、乘积、链式法则） —— *KLP 工具：`Ableitungsregeln`*
3. **定单调**：解 $F'(x)=0$，画**符号表**（Vorzeichentabelle） —— *KLP 工具：`Monotonie`*
4. **比端点与驻点**：求各候选点的 $F$ 值，取最小 —— *KLP 工具：`globale Extrema` + 端点比较*
5. **下结论**：$F_{\min}\ge0$ ⇔ $f(x)\ge g(x)$ 对所有 $x\in D$ 成立 —— *KLP 工具：`begruenden` 要求呈示过程*

> **判据 / 决策点**：区间**闭**必须比端点；区间**开**则看两端极限行为。

### 3.2 方法 B：二阶导辅助定号（当 $F'$ 符号不易判时）

1. 先求 $F'$，发现 $F'$ 的符号无法直接读出
2. 对 $F'$ 再求导得 $F''$，用 $F''$ 的符号定 $F'$ 的单调性 —— *KLP 工具：`Krümmungsverhalten`*
3. 由 $F'$ 的单调性与某个已知点（如 $F'(x_0)=0$）确定 $F'$ 的整体符号
4. 回到方法 A 的步骤 3–5

> **判据 / 决策点**：题目里的 $F'$ 含 $e^x$ 或 $\ln$ 时，常需要这一步。

### 3.3 方法 C：分区间论证（当定义域需拆分时）

若 $F'$ 的符号在定义域内分段变化，或定义域本身由两段组成，则**分区间分别**论证，每段各用方法 A。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 用导数证明不等式（构造辅助函数）🎯 最高性价比

- **技法内容**：要证 $f(x)\ge g(x)$，作辅助函数 $F(x)=f(x)-g(x)$，把"证不等式"翻译成"证 $F$ 的最小值 $\ge0$"。步骤固定为：**移项构造 → 求导 → 由 $F'$ 符号定单调区间 → 算候选极值点与端点 → 比较得最小值 → 下结论**。若一阶导数符号不易判定，则对 $F'$ 再求导（借 `Krümmungsverhalten` 定位 $F'$ 的极值）；若区间需拆分，则分区间分别论证。
- **DE-Anschluss**：**全部工具已在德国教过**——EF 的 `Monotonie`、`Extrempunkte`、`lokale und globale Extrema`、`Krümmungsverhalten`、`Wendepunkte` [已验证]；Q1 的 `Produktregel` [已验证]；LK 的 `allgemeine Kettenregel` 与 `ln x` [已验证]。**不需要任何一个 KLP 之外的知识点。**
- **合规性**：✅ 完全合规 —— 不是新知识，而是把德国已有的"**求**极值"重组为"**证**不等式"，属 `Argumentieren`（AFB III）的方法层升级。载体须限制在 KLP 允许的函数类内（GK：整有理函数 + `e^x`；LK：可加三角与 `ln`）[已验证]。
- **Abitur 应用**：① `Extremwertprobleme` 的后置论证——题目问"求最大收益"，末段常追加"证明这就是全局最大值"，本技法直接作答（AFB III）；② Aufgabenart I 的免工具论证题（整有理函数类，GK 亦可）；③ 口试的 `Begründen` 环节。
- **来源**：`[CN-课标]` 导数在研究函数中的应用（单调性、极值、最值）· `[CN-教材]` 构造辅助函数 · `[CN-高考]` 导数与不等式证明（压轴题型）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | 免工具论证题（Aufgabenart I）+ 工具题末段"全局最优"论证 [据推断] |
| Operator | `begruenden` / `nachweisen` / `zeigen` / `untersuchen`（数学不按动词分 AFB）[已验证] |
| AFB | III（独立论证、推广、评价）为主；构造与求导部分含 I–II [据推断] |
| 建议分值 / 时长 | 论证子题 5–8 BE / 约 8–12 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`（GK，负整数幂）
> Zeigen Sie, dass für alle $x>0$ gilt: $\;x+\dfrac{1}{x}\ge 2$.

**Aufgabe 2** `[原创]`（GK，`e^x`）
> Zeigen Sie, dass für alle $x\in\mathbb{R}$ gilt: $\;e^{x}\ge 1+x$.
> Geben Sie außerdem an, für welchen Wert von $x$ Gleichheit gilt.

**Aufgabe 3** `[NRW-改编]`（Produktregel + 全局最优）
> Gegeben ist $f(x)=x\cdot e^{-x}$ für $x\ge 0$.
> a) Bestimmen Sie die Koordinaten des lokalen Extrempunkts.
> b) Zeigen Sie, dass es sich um ein **globales** Maximum handelt, und folgern Sie, dass für alle $x\ge 0$ gilt: $\;x\cdot e^{-x}\le\dfrac{1}{e}$.

**Aufgabe 4** `[原创]`（LK，`ln` 与三角）
> a) Zeigen Sie für alle $x>-1$ mit $x\neq 0$: $\;\ln(1+x)<x$.
> b) Zeigen Sie für alle $x\ge 0$: $\;x-\sin x\ge 0$.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Hilfsfunktion**: $F(x)=x+\frac1x-2$, $D=\mathbb{R}^{>0}$ ✓ 得分点：定义域
2. **Ableitung**: $F'(x)=1-\frac{1}{x^2}$ ✓
3. **Nullstelle**: $1-\frac1{x^2}=0\Rightarrow x^2=1\Rightarrow x=1$ (da $x>0$) ✓
4. **Vorzeichen**: Für $0<x<1$ ist $x^2<1$, also $\frac{1}{x^2}>1$ und $F'(x)<0$; für $x>1$ ist $F'(x)>0$. Also liegt bei $x=1$ ein **globales Minimum**. ✓ 得分点：符号表
5. **Wert**: $F(1)=1+1-2=0$ ⇒ $F(x)\ge F(1)=0$ ⇒ $x+\frac1x\ge2$. ✓ 得分点：结论句

**Aufgabe 2**
1. **Hilfsfunktion**: $F(x)=e^{x}-(1+x)=e^x-1-x$, $D=\mathbb{R}$ ✓
2. **Ableitung**: $F'(x)=e^{x}-1$ ✓
3. **Nullstelle**: $F'(x)=0\Rightarrow e^x=1\Rightarrow x=0$ ✓
4. **Vorzeichen**: Für $x<0$ ist $e^x<1$, also $F'(x)<0$; für $x>0$ ist $F'(x)>0$. Also **globales Minimum** bei $x=0$. ✓
5. **Wert**: $F(0)=1-1-0=0$ ⇒ $F(x)\ge0$ für alle $x\in\mathbb{R}$, d. h. $e^x\ge1+x$. **Gleichheit gilt genau für $x=0$.** ✓ 得分点：指出等号条件

**Aufgabe 3**
1. **a) Ableitung**: $f'(x)=e^{-x}+x\cdot(-e^{-x})=e^{-x}(1-x)$ ✓ 得分点：Produktregel 呈示
2. **Nullstelle**: $f'(x)=0\Rightarrow 1-x=0\Rightarrow x=1$ (da $e^{-x}>0$) ✓
3. **Art**: $f'(x)>0$ für $x<1$, $f'(x)<0$ für $x>1$ ⇒ lokales (und hier globales) Maximum bei $x=1$ ✓
4. **Punkt**: $f(1)=1\cdot e^{-1}=\frac1e$ ⇒ $\mathrm{HP}\left(1\mid\frac1e\right)$ ✓
5. **b) Global**: Da $f$ für $x\to\infty$ gegen $0$ strebt und $f(0)=0$, und der einzige Kandidat $x=1$ den größeren Wert $\frac1e$ liefert, ist $\frac1e$ das globale Maximum auf $[0,\infty)$. ✓ 得分点：端点/极限比较
6. **Folgerung**: Damit gilt $f(x)\le\frac1e$, also $x\cdot e^{-x}\le\frac1e$ für alle $x\ge0$. ✓

**Aufgabe 4**（LK）
1. **a) Hilfsfunktion**: $F(x)=x-\ln(1+x)$, $D=(-1,\infty)$ ✓
2. **Ableitung**: $F'(x)=1-\frac{1}{1+x}=\frac{x}{1+x}$ ✓ 得分点：Kettenregel
3. **Vorzeichen**: Für $x>0$ ist $\frac{x}{1+x}>0$ (F steigt); für $-1<x<0$ ist $\frac{x}{1+x}<0$ (F fällt). Also **globales Minimum** bei $x=0$. ✓
4. **Wert**: $F(0)=0-\ln1=0$ ⇒ $F(x)>0$ für $x\neq0$ ⇒ $\ln(1+x)<x$. ✓
5. **b) Hilfsfunktion**: $G(x)=x-\sin x$, $D=[0,\infty)$ ✓
6. **Ableitung**: $G'(x)=1-\cos x\ge0$ für alle $x$ ⇒ $G$ ist monoton steigend. ✓ 得分点：直接由符号得单调（无需解方程）
7. **Wert am Rand**: $G(0)=0-\sin0=0$ ⇒ $G(x)\ge G(0)=0$ für alle $x\ge0$ ⇒ $x\ge\sin x$. ✓ 得分点：端点比较

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把"求局部极值"当成"证不等式"，末段不写结论句 | 牢记五步链第 ⑤ 步必须落回原不等式 |
| 知识错 | 构造完 $F$ 不说明定义域；闭区间只比驻点不比端点 | 方法 A 步骤 1 与 4 各设一次自检 |
| 知识错 | $F'$ 符号难判时硬判 → 结论不成立 | 转用方法 B（二阶导辅助） |
| 表达错 | 只写"显然 $F\ge0$"，不呈示符号表与端点比较 → 违反 `begruenden`/`zeigen` 的"必须呈示过程" [已验证] | 每次画 Vorzeichentabelle |

---

## 7. Vernetzung

- **上游**：`MA-A4-02` Monotonie · `MA-A4-03` Extrema（局部/全局）· `MA-A4-04` Krümmung und Wendepunkte · `MA-A4-05`（本节点）
- **下游**：`MA-A6-02` Extremwertprobleme 的后置论证 · `MA-A6-04` Funktionsscharen（LK）· Q2 综合论证
- **横向**：与 CN-Methode "恒成立 / 存在性 → 最值转化"（`Parameterbereiche`）同链 · 口试 `Begruenden` 环节
- **术语卡**：`Hilfsfunktion` / `Vorzeichentabelle` / `globales Extremum` / `Ungleichung` / `Randwertprüfung`（建议由主线程补入 Q1 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
