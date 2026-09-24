---
fach: Mathe
thema: "Integralrechnung: Sechs Konzepte"
operatoren: [berechnen, bestimmen, begruenden, erlaeutern, deuten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Mathe, Analysis]
stufe: "Q1"
---

# Integralrechnung: Sechs Konzepte (积分六概念链)

> **中文理解**：NRW 的 KLP 用**六个逐步搭建的概念名**引入积分：`Produktsumme` → `orientierte Fläche` → `Bestandsfunktion` → `Integralfunktion` → `Stammfunktion` → `bestimmtes Integral` → `Hauptsatz` [已验证]。
> 这条链是 Q1-A 域的主干，也是"求变化率（Ableitung）↔ 由变化率重构存量（Integral）"这对**互逆问题**的后半段 [已验证]。
> 考试里它既以**免工具纯计算**（求原函数、算定积分）出现，也以**概念解释题**（"说明面积如何被逼近"）出现。
> GK 止于"定积分求面积"；LK 追加 `uneigentliche Integrale` 与绕 x 轴旋转体体积 [已验证]。
>
> **Klausur-Relevanz**：`bestimmtes Integral berechnen` 是免工具段常客（AFB I–II）；`Hauptsatz` 的论证是 LK 证明密度的标志（AFB III）。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Produktsumme | 乘积和 | Riemann sum | $\sum f(x_i)\cdot\Delta x$ | 六链起点 [已验证] |
| Orientierte Fläche | 有向面积 | signed area | 轴上方面积取正、下方取负 | 带符号 [已验证] |
| Bestandsfunktion | 存量函数 | accumulation function | 由变化率重构的"总量" | 与 Änderungsrate 互逆 |
| Integralfunktion | 积分函数 | integral function | $I_a(x)=\int_a^x f(t)\,dt$ | 上界为变量 [已验证] |
| Stammfunktion | 原函数 | antiderivative | $F'=f$ | 相差常数 $+C$ |
| Bestimmtes Integral | 定积分 | definite integral | $\int_a^b f(x)\,dx=F(b)-F(a)$ | 不带 $+C$ |
| Hauptsatz (HDI) | 微积分基本定理 | Fundamental Theorem | $\frac{d}{dx}\int_a^x f(t)\,dt=f(x)$ | 微分与积分互逆 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 六概念链的搭建逻辑

```
Produktsumme ──(取极限)──▶ orientierte Fläche ──(上界变)──▶ Integralfunktion
      ▲                                                          │
      │                                                    (Hauptsatz)
 Bestandsfunktion ◀──(重构存量)── Änderungsrate ◀──────────────┘
                                      │
                              Stammfunktion ──▶ bestimmtes Integral ──▶ 面积/旋转体
```

> *Klausur-Satz*: Die Integralrechnung baut auf sechs Konzepten auf, die schrittweise eingeführt werden: Produktsumme, orientierte Fläche, Bestandsfunktion, Integralfunktion, Stammfunktion und bestimmtes Integral.

### 2.2 三个最容易混淆的区分（对比辨别）

| 概念对 | 判别要点 |
|---|---|
| `Bestandsfunktion` vs `Integralfunktion` | 前者是**思想**（由变化率重构存量），后者是**具体的函数** $I_a(x)=\int_a^x f(t)dt$ [据推断] |
| `Stammfunktion` vs `bestimmtes Integral` | 原函数是**函数族**（含 $+C$），定积分是**一个数**（不含 $+C$） |
| `Integralfunktion` vs `bestimmtes Integral` | 前者上界是**变量** $x$，后者上下界都是**常数** |

### 2.3 Hauptsatz 的两种层要求（GK/LK 分界）

- **GK**：只需**几何直观说明**——把 $I_a(x)$ 的增量 $\Delta I$ 用一块窄条面积近似，得 $\frac{\Delta I}{\Delta x}\approx f(x)$，令 $\Delta x\to 0$ 得 $I_a'(x)=f(x)$ [已验证]
- **LK**：须**用直观连续性概念证明**，呈示完整论证过程，不能只写"因为互为逆运算" [已验证]

> *Klausur-Satz*: Nach dem Hauptsatz der Differential- und Integralrechnung gilt: Ist $f$ stetig, so ist die Integralfunktion $I_a$ eine Stammfunktion von $f$, d. h. $I_a'(x)=f(x)$.

### 2.4 免工具段的能力边界（EF→Abitur 的工具轴）

- EF/Q1 GK 要求**无辅助工具**求**整有理函数**的原函数 [已验证]
- LK 追加以 $\ln x$ 为 $1/x$ 的原函数 [已验证]
- 工具路径（WTR/CAS）用于验证与作图，**不能替代手算路径**——Abitur 要求"给出不使用工具也能理解的解法路径" [已验证]

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：求原函数（免工具）

**编号步骤**：
1. 识别被积函数的类型（整有理 / 指数 / LK 的 $1/x$） —— *KLP 工具：`Stammfunktion`*
2. 逐项用幂法则反用：$\int x^n\,dx=\frac{1}{n+1}x^{n+1}$（$n\neq -1$） —— *KLP 工具：`Potenzregel` 的逆*
3. 检查：对结果求导是否回到被积函数 —— *KLP 工具：`Ableitungsregeln`*
4. 不定积分补 $+C$；定积分不补 —— *KLP 工具：`bestimmtes Integral`*

> **判据 / 决策点**：题目写"eine Stammfunktion"时**不写 $+C$**（只求一个）；写"die allgemeine Stammfunktion"或"unbestimmtes Integral"时**必须写 $+C$**。

### 3.2 方法 B：算定积分（含符号）

1. 先求一个原函数 $F$（方法 A）
2. 代入上下限：$\int_a^b f = F(b)-F(a)$ —— *KLP 工具：`Hauptsatz`*
3. **负值检查**：结果可能为负（有向面积），不要直接取绝对值
4. 若题目问"**Flächeninhalt**（面积）"，须先找零点分段，再对各段取绝对值后相加

> **判据 / 决策点**：`berechnen Sie das Integral` ≠ `bestimmen Sie den Flächeninhalt`——前者可有向、后者必须非负。

### 3.3 方法 C：由变化率重构存量（应用题）

1. 判断题目给的是**变化率**还是**存量** —— *KLP 工具：`deuten`/`interpretieren`*
2. 若给变化率 $f$，求存量用 $B(x)=B(0)+\int_0^x f(t)dt$ —— *KLP 工具：`Bestandsfunktion`*
3. 回译到现实情境（带单位、带解释） —— *KLP 工具：`Modellieren` 的 Interpretieren 段*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: `aₙ = Sₙ − Sₙ₋₁`（存量 ⇄ 增量互化）

- **技法内容**：把"部分和 $S_n$"与"通项 $a_n$"看成一对互逆量：已知 $S_n$ 时用 $a_n=S_n-S_{n-1}$ 反求通项（**必须单独验算 $n=1$**），已知 $a_n$ 时累加求 $S_n$。它把"求通项"和"求和"统一成一次差分运算。
- **DE-Anschluss**：德国 Q1 已有**连续版本**——`Bestandsfunktion` 与 `Integralfunktion` 的关系、`Hauptsatz`（由变化率重构存量）[已验证]。离散版只是把微分/积分换成差分/求和，思想完全相同。
- **合规性**：⚠️ 需注意 —— 概念载体（数列 `Folge`）属 **CN-only**，德国 KLP 无数列板块，**禁止作为知识板块引入**；只能作为**离散类比**与 `Bestandsfunktion` 成对呈现，且必须用德国既有术语包装。
- **Abitur 应用**：AFB II 的 `Interpretieren` 子题——解释"某量的累计值与其每期增量之间的关系"（在德国包装成 `Bestandsfunktion` 的离散类比）；AFB III 可作"离散模型 vs 连续模型哪个更合适"的评判题。
- **来源**：`[CN-课标]` 通项公式与前 n 项和公式的关系 · `[CN-教材]` `aₙ=Sₙ−Sₙ₋₁` 的 $n=1$ 验算规范 · `[CN-高考]` 由 $S_n$ 求 $a_n$

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | 免工具题（求原函数/定积分）+ 工具题（应用题、面积）[据推断] |
| Operator | `berechnen` / `bestimmen` / `begruenden` / `deuten`（数学不按动词分 AFB）[已验证] |
| AFB | I–II 为主；`Hauptsatz` 论证为 III（尤其 LK）[据推断] |
| 建议分值 / 时长 | 免工具小问 4–6 BE；概念解释 6–8 BE [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`
> Gegeben ist $f(x)=3x^2-4x+1$.
> a) Bestimmen Sie eine Stammfunktion $F$ von $f$.
> b) Berechnen Sie $\displaystyle\int_1^3 f(x)\,dx$.

**Aufgabe 2** `[NRW-改编]`
> Gegeben ist $f(x)=x^3-4x$.
> Bestimmen Sie den **Flächeninhalt** der Fläche, die der Graph von $f$ und die $x$-Achse zwischen $x=-2$ und $x=2$ einschließen.

**Aufgabe 3** `[原创]`（概念解释，`erlaeutern`）
> Erläutern Sie, wie der Flächeninhalt unter einem Graphen durch Produktsummen approximiert wird, und erklären Sie, warum man von einer "orientierten Fläche" spricht.

**Aufgabe 4** `[原创]`（LK，AFB III）
> Die Funktion $I_a$ sei definiert durch $I_a(x)=\displaystyle\int_a^x f(t)\,dt$ mit stetigem $f$.
> Begründen Sie mithilfe des Differenzenquotienten, dass $I_a'(x)=f(x)$ gilt (Hauptsatz).

### 5.3 Musterlösung

**Aufgabe 1**
1. **Stammfunktion**: $F(x)=x^3-2x^2+x$ (denn $F'(x)=3x^2-4x+1=f(x)$) ✓ 得分点：回验求导
2. **Integral**: $\int_1^3 f(x)dx=F(3)-F(1)$ ✓ 得分点：写 Hauptsatz 形式
3. $F(3)=27-18+3=12$; $F(1)=1-2+1=0$ ✓
4. **Ergebnis**: $\int_1^3 f(x)dx=12-0=12$ ✓

**Aufgabe 2**
1. **Nullstellen**: $x^3-4x=x(x^2-4)=x(x-2)(x+2)=0 \Rightarrow x=-2,\,0,\,2$ ✓ 得分点：因式分解
2. **Vorzeichen**: Für $-2<x<0$ ist $f(x)>0$; für $0<x<2$ ist $f(x)<0$ ✓ 得分点：符号判定
3. **Stammfunktion**: $F(x)=\frac14x^4-2x^2$ ✓
4. **Teilintegrale**: $\int_{-2}^0 f = F(0)-F(-2)=0-(4-8)=4$; $\int_0^2 f=F(2)-F(0)=(4-8)-0=-4$ ✓
5. **Flächeninhalt**: $A=|4|+|-4|=8$ ✓ 得分点：分段取绝对值再相加（**不能**直接 $\int_{-2}^2=0$）

**Aufgabe 3**
1. **Approximation**: Man zerlegt das Intervall in $n$ gleich breite Streifen der Breite $\Delta x$, wählt je einen Funktionswert $f(x_i)$ und bildet die Produktsumme $\sum f(x_i)\Delta x$. ✓ 得分点：给出 Produktsumme
2. **Grenzübergang**: Für $n\to\infty$ (bzw. $\Delta x\to 0$) streben Ober- und Untersumme gegen denselben Wert, das Integral. ✓
3. **Orientiert**: Liegt der Graph unterhalb der $x$-Achse, ist $f(x_i)<0$, die Produktsumme wird negativ; das Integral zählt solche Flächen also **mit negativem Vorzeichen**. ✓ 得分点：`erlaeutern` 要求说明来由

**Aufgabe 4**（LK）
1. **Differenzenquotient**: $\frac{I_a(x+h)-I_a(x)}{h}=\frac{1}{h}\int_x^{x+h}f(t)\,dt$ ✓ 得分点：写出 Ansatz
2. **Abschätzung**: Für stetiges $f$ gibt es nach dem Mittelwertsatz ein $\xi\in[x,x+h]$ mit $\int_x^{x+h}f(t)dt=h\cdot f(\xi)$. ✓
3. **Grenzübergang**: Für $h\to 0$ gilt $\xi\to x$, und wegen der Stetigkeit von $f$ folgt $f(\xi)\to f(x)$. ✓
4. **Fazit**: Also $I_a'(x)=f(x)$; die Integralfunktion ist eine Stammfunktion von $f$. ✓ 得分点：结论句

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把"求积分"当成"求面积" → 有向面积直接取绝对值丢分 | 先看题目问 Integral 还是 Flächeninhalt（方法 B 判据） |
| 知识错 | 忘记 `+C`（不定积分需要，定积分不需要）；上下限代反 | 做题末尾自检一次 |
| 表达错 | 只写"因为互为逆运算"一句话说明 Hauptsatz → 未呈示论证 [已验证] | LK 必须写完整 Differenzenquotient 链 |
| 表达错 | 应用题不回译现实语言、不写单位 → 断在 `Modellieren` 末段 | 结论句带单位与情境解释 |

---

## 7. Vernetzung

- **上游**：`MA-A3-*` 导数概念与法则 · `MA-A5-01` 乘积和与有向面积 · `MA-A5-02` 存量函数与积分函数
- **下游**：`MA-A5-05` Hauptsatz · `MA-A5-06` 面积/旋转体/反常积分（LK）· `MA-S5-02` 分布函数即积分函数（S⇄A 唯一交叉点）[已验证]
- **横向**：物理（路程 ⇄ 速度、功）· 经济（边际量 ⇄ 总量）
- **术语卡**：`Produktsumme` / `orientierte Fläche` / `Bestandsfunktion` / `Integralfunktion` / `Stammfunktion` / `bestimmtes Integral` / `Hauptsatz`（建议由主线程补入 Q1 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编，解析为原创。不搬运出版社教辅原文。
