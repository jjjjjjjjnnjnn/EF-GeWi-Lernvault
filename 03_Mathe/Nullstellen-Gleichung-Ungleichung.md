---
fach: Mathe
thema: "Nullstellen, Gleichung, Ungleichung"
operatoren: [bestimmen, berechnen, nachweisen, begruenden, untersuchen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Mathe, Analysis]
stufe: "EF"
---

# Nullstellen — Gleichung — Ungleichung (零点·方程·不等式三位一体)

> **中文理解**：对同一个代数对象，三种提问其实是**同一件事的三种说法**：$f$ 的**零点** ⇄ 方程 $f(x)=0$ 的**根** ⇄ 不等式 $f(x)\ge0$ 的**解集端点**。
> 操作顺序固定：**先因式分解求零点 → 用零点把数轴分段 → 每段取一个测试点定符号 → 写出解集**。端点取不取，由不等式**是否带等号**决定。
> 德国 EF **明文要求**无工具解「可通过简单提公因式降为线性/二次」的多项式方程 [已验证]；中国的贡献只是**把三种提问显式并列**，不含任何新知识 [已验证]。
> 因此这是 **Aufgabenart I（免工具段）的常客**，也是 `Extremwertprobleme`、`Steckbriefaufgaben` 中「先定定义域」的前置动作 [已验证]。
>
> **Klausur-Relevanz**：免工具段几乎必考（因式分解 → 零点 → 符号判定三步全在免工具能力内）；本项目建议它作为**免工具训练册的第一单元** [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Nullstelle | 零点 | zero / root | $f(x_0)=0$ 的 $x_0$ | 图像与 $x$ 轴交点 [已验证] |
| Gleichung | 方程 | equation | $f(x)=0$ | 求根 = 求零点 |
| Ungleichung | 不等式 | inequality | $f(x)\ge0$、$f(x)<0$ 等 | 解集是区间 [已验证] |
| Lösungsmenge | 解集 | solution set | $\mathbb{L}=\{x\in D\mid f(x)\ge0\}$ | 用区间或集合写 |
| Linearfaktor | 一次因式 | linear factor | $(x-x_0)$，对应零点 $x_0$ | 因式分解的产物 |
| Ausklammern | 提公因式 | factoring out | $x^3-4x=x(x^2-4)$ | EF 法定免工具动作 [已验证] |
| Satz vom Nullprodukt | 零积定理 | zero-product property | $a\cdot b=0\Leftrightarrow a=0$ 或 $b=0$ | 分解后逐因子为零 |
| Vielfachheit | 重数 | multiplicity | 因子 $(x-x_0)^k$ 中的 $k$ | $k$ 偶数时不穿轴 |
| Vorzeichentabelle | 符号表 | sign table | 按零点分段，逐段判 $f$ 的正负 | 呈示过程用 [已验证] |
| Definitionsbereich | 定义域 | domain | 使 $f$ 有意义的 $x$ 范围 | 应用题须并入现实约束 |

---

## 2. 知识结构 (Struktur)

### 2.1 三位一体：一句话打通三种问法

$$f(x_0)=0 \iff x_0 \text{ 是 } f \text{ 的零点} \iff x_0 \text{ 是方程 } f(x)=0 \text{ 的根} \iff x_0 \text{ 是不等式 } f(x)\ge0 \text{ 解集的端点}$$

**关键洞察**：零点把数轴**分成若干段**，而在每一段内 $f$ 的符号**不变**（连续函数介值性）。所以只要知道零点 + 每段一个测试点，就能写出**任意**不等式的解集 [已验证]。

> *Klausur-Satz*: Nullstellen, Lösungen der zugehörigen Gleichung und die Randpunkte der Lösungsmenge einer Ungleichung sind dasselbe: Sie trennen die Bereiche, in denen der Graph oberhalb bzw. unterhalb der $x$-Achse verläuft.

### 2.2 免工具因式分解的三种法定动作

EF 明确要求无工具解「可提公因式降次」的方程 [已验证]。三种动作：

| 动作 | 适用 | 例子 |
|---|---|---|
| **提公因式** $x$ | 各项都含 $x$ | $x^3-4x=x(x^2-4)$ |
| **提公因式** $x^k$ | 各项都含 $x^k$ | $x^4-3x^2=x^2(x^2-3)$ |
| **二次因式分解** | 二次式可十字相乘 | $x^2-4=(x-2)(x+2)$ |

> ⚠️ **分解必须彻底**：提到不能提为止，否则会漏零点。

> *Klausur-Satz*: Durch Ausklammern und anschließendes Faktorisieren wird der Term in ein Produkt zerlegt; die Nullstellen ergeben sich dann aus dem Satz vom Nullprodukt.

### 2.3 符号表（Vorzeichentabelle）：呈示过程的标准形式

以 $f(x)=x^3-4x=x(x-2)(x+2)$ 为例，零点为 $-2,\,0,\,2$：

| 区间 | $x<-2$ | $-2<x<0$ | $0<x<2$ | $x>2$ |
|---|---|---|---|---|
| $x+2$ | $-$ | $+$ | $+$ | $+$ |
| $x$ | $-$ | $-$ | $+$ | $+$ |
| $x-2$ | $-$ | $-$ | $-$ | $+$ |
| $f(x)$ | $-$ | $+$ | $-$ | $+$ |

于是 $f(x)\ge0$ 的解集为 $\mathbb{L}=[-2,0]\cup[2,\infty)$。

> ⚠️ **端点规则**：$\ge$ / $\le$ 用**闭区间**（含零点）；$>$ / $<$ 用**开区间**（不含零点）。

> *Klausur-Satz*: In der Vorzeichentabelle werden die Nullstellen als Grenzen eingetragen; das Vorzeichen des Produkts ergibt sich aus der Anzahl der negativen Faktoren. Bei „$\ge$“ bzw. „$\le$“ gehören die Nullstellen zur Lösungsmenge, bei „$>$“ bzw. „$<$“ nicht.

### 2.4 与图像的联系

$f(x)\ge0$ ⇔ 图像在 $x$ 轴**上方或轴上**；$f(x)<0$ ⇔ 在**下方**。符号表与图像互为校验。

> *Klausur-Satz*: Die Lösungsmenge einer Ungleichung entspricht den Bereichen, in denen der Graph oberhalb bzw. unterhalb der $x$-Achse liegt.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：三位一体标准四步（首选）

1. **因式分解** $f(x)$ 到乘积形式（提公因式 + 二次分解）—— *KLP 工具：`Ausklammern`、`Linearfaktor`*
2. **求零点**：令各因子为零（Satz vom Nullprodukt）—— *KLP 工具：`Nullstellen`*
3. **画符号表**：零点分段，每段取测试点（或数负因子个数）—— *KLP 工具：`Vorzeichentabelle`*
4. **写解集**：按不等号方向与是否带等号定区间开闭 —— *KLP 工具：`Lösungsmenge`*

> **判据 / 决策点**：**任何**「求零点 / 解方程 / 解不等式」的免工具题都用这一条链；先分解，后一切。

### 3.2 方法 B：直接解方程（方程题的特化）

若题目只问「解方程 $f(x)=0$」：

1. 分解 → 2. 各因子为零 → 3. 列零点集合

> **判据 / 决策点**：方程题只取第 1、2 步；不必画符号表。

### 3.3 方法 C：含参数或需注意定义域的情形

1. **先写定义域**（含分母、根号、应用题现实约束）—— *KLP 工具：`Definitionsbereich`*
2. 在定义域内做方法 A —— *KLP 工具：`Termumformung`*
3. **去掉不在定义域内的解** —— *KLP 工具：`Lösungsmenge`*

> **判据 / 决策点**：一旦出现分母或根号，**先定定义域**，否则会写出「增根」。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 函数—方程—不等式三位一体（数轴标根法）

- **技法内容**：中国把同一个代数对象的三种提问**显式并列**为同一件事：$f$ 的零点 ⇄ 方程 $f(x)=0$ 的根 ⇄ 不等式 $f(x)\ge0$ 的解集端点。操作固定为：**先因式分解求零点 → 用零点把数轴分段 → 每段取测试点（或数负因子个数）定符号 → 写出解集**；端点是否取到由不等式是否带等号决定。这就是「数轴标根法」（也叫穿根法）。
- **DE-Anschluss**：EF 已教 `Nullstellen`、`Verlauf des Graphen`、`Verhalten für x→±∞`、`Definitionsbereich`/`Wertebereich` [已验证]；EF 明文要求**无工具**解「可提公因式降为线性/二次」的多项式方程 [已验证]；德国的 `Lösungsmenge` 与区间表述完全兼容 [已验证]。本技法**全为 EF 已有工具的组合**。
- **合规性**：✅ 完全合规 —— 中国侧的表述优势只在**把三种提问显式并列**这一编排方式上，**不含新知识**。⚠️ 唯一纪律：**分解必须限制在 EF 允许的因式分解动作内**（提公因式 + 简单二次分解），不要引入高阶技巧 [已验证]。
- **Abitur 应用**：**Aufgabenart I（免工具）的常客**——因式分解 → 零点 → 符号判定三步都在免工具能力范围内（AFB I–II）；也是 `Extremwertprobleme` 与 `Steckbriefaufgaben` 中「先定定义域」的前置动作 [已验证]。
- **来源**：`[CN-课标]` 从函数观点看一元二次方程和一元二次不等式、函数零点与方程根的关系 · `[CN-教材]` 数轴标根法 · `[CN-高考]` 不等式解集与参数

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I（hilfsmittelfrei）**为主；也可作工具题的第一小问 [据推断] |
| Operator | `bestimmen` / `berechnen` / `nachweisen` / `begruenden`（数学不按动词分 AFB）[已验证] |
| AFB | I–II（分解求零点为 I，符号论证与解集为 II）[据推断] |
| 建议分值 / 时长 | 免工具段 3–5 BE / 约 5–8 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`（零点 + 符号表 + 解集，免工具）
> Gegeben ist $f(x)=x^3-4x$.
> a) Bestimmen Sie alle Nullstellen von $f$.
> b) Lösen Sie die Ungleichung $f(x)\ge0$ und geben Sie die Lösungsmenge in Intervallschreibweise an.

**Aufgabe 2** `[原创]`（免工具方程）
> Lösen Sie ohne Hilfsmittel die Gleichung $x^4-9x^2=0$.

**Aufgabe 3** `[CN-改编]`（四位一体 + 论证）
> Gegeben ist $f(x)=(x-1)(x+3)$.
> a) Bestimmen Sie die Nullstellen.
> b) Untersuchen Sie das Vorzeichen von $f$ auf den drei durch die Nullstellen entstehenden Intervallen.
> c) Begründen Sie, dass die Lösungsmenge von $f(x)\le0$ gerade $[-3,1]$ ist.

**Aufgabe 4** `[NRW-改编]`（应用 + 定义域）
> Ein Rechteck hat die Seitenlängen $(x-2)$ cm und $(x+5)$ cm. Der Flächeninhalt soll mindestens $18\ \mathrm{cm}^2$ betragen.
> a) Geben Sie die Definitionsbedingung für $x$ an.
> b) Bestimmen Sie die zulässigen Werte von $x$.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Ausklammern**: $f(x)=x\left(x^2-4\right)=x(x-2)(x+2)$ ✓ 得分点：分解彻底
2. **a) Nullstellen**: Satz vom Nullprodukt: $x=0$ oder $x-2=0$ oder $x+2=0$ ⇒ $x_1=-2,\ x_2=0,\ x_3=2$ ✓ 得分点：三个零点都写
3. **b) Vorzeichentabelle**: 区间 $(-\infty,-2),(-2,0),(0,2),(2,\infty)$ 上分别取 $x=-3,-1,1,3$：
   - $x=-3$: $f=(-)(-)(-)=-<0$
   - $x=-1$: $f=(-)(-)(+)=+>0$
   - $x=1$: $f=(+)(-)(+)=-<0$
   - $x=3$: $f=(+)(+)(+)=+>0$ ✓ 得分点：四段全判
4. **b) Lösungsmenge**: $f(x)\ge0$ gilt für $x\in[-2,0]\cup[2,\infty)$. ✓ 得分点：带等号 ⇒ 闭区间

**Aufgabe 2**
1. **Ausklammern**: $x^4-9x^2=x^2\left(x^2-9\right)$ ✓ 得分点：提 $x^2$
2. **Weiter zerlegen**: $x^2(x-3)(x+3)=0$ ✓ 得分点：二次差分解
3. **Nullprodukt**: $x^2=0\Rightarrow x=0$ (doppelte Nullstelle); $x-3=0\Rightarrow x=3$; $x+3=0\Rightarrow x=-3$ ✓
4. **Lösungsmenge**: $\mathbb{L}=\{-3,\,0,\,3\}$ ✓ 得分点：指出 $x=0$ 是二重零点

**Aufgabe 3**
1. **a)**: Satz vom Nullprodukt: $x_1=1,\ x_2=-3$ ✓
2. **b) 区间 1** $x<-3$: 取 $x=-4$: $f=(-4-1)(-4+3)=(-)(-)=+>0$ ✓
3. **b) 区间 2** $-3<x<1$: 取 $x=0$: $f=(0-1)(0+3)=(-)(+)=-<0$ ✓
4. **b) 区间 3** $x>1$: 取 $x=2$: $f=(1)(5)=+>0$ ✓ 得分点：三区间全判
5. **c) Begründung**: Da $f$ auf $(-3,1)$ negativ und außerhalb positiv ist und $f(-3)=f(1)=0$, gilt $f(x)\le0$ genau für $x\in[-3,1]$. ✓ 得分点：显式论证（AFB II）

**Aufgabe 4**
1. **a) Definition**: Seitenlängen müssen positiv sein: $x-2>0$ **und** $x+5>0$, also $x>2$. ✓ 得分点：现实约束并入定义域
2. **b) Ansatz**: $(x-2)(x+5)\ge18$ ✓ 得分点：列不等式
3. **b) Umformen**: $x^2+3x-10\ge18\Rightarrow x^2+3x-28\ge0$ ✓
4. **b) Faktorisieren**: $x^2+3x-28=(x-4)(x+7)$ ✓ 得分点：二次分解
5. **b) Nullstellen**: $x=4$ 或 $x=-7$; wegen $x>2$ entfällt $x=-7$. ✓ 得分点：用定义域筛解
6. **b) Vorzeichen**: Für $x>4$ ist $f>0$; für $2<x<4$ ist $f<0$. Also gilt die Ungleichung für $x\ge4$. ✓ 得分点：结论 + 单位/现实回译：Die Seitenlängen sind dann mindestens $2$ cm und $9$ cm.

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「解方程」与「解不等式」混同，方程题里画符号表、不等式题里只给零点 | 牢记三位一体：**不等式必须落到解集区间** |
| 知识错 | 因式分解不彻底（$x^3-4x$ 只提 $x$ 就停） | 提到不能再提为止；二次式继续分解 |
| 知识错 | 端点开闭写反（$\ge$ 写成开区间） | 带等号 ⇒ **闭**区间 [已验证] |
| 表达错 | 只写零点不给符号表 → 违反 `bestimmen`/`untersuchen` 的「必须呈示过程」[已验证] | 画一张 `Vorzeichentabelle` |
| 表达错 | 应用题忘记现实约束（边长 > 0），写出无意义的解 | 方法 C 第一步先写定义域 |

---

## 7. Vernetzung

- **上游**：`MA-A1-04` 对称性与零点（本节点）· `MA-A1-02` 整有理函数 · `MA-A1-03` 定义域/值域
- **下游**：`MA-A4-02` Monotonie · `MA-A4-03` Extrema · `MA-A6-02` Extremwertprobleme · `MA-A6-03` Steckbriefaufgaben · `MA-G6-01` LGS 算法化解法
- **横向**：与 `Vom-Extremwert-zum-Beweis.md` 共享「符号表 + 端点比较」工具链；与 `Geraden-Parameterform-und-Lagebeziehungen.md` 共享 LGS 手算能力
- **术语卡**：`Nullstelle` / `Linearfaktor` / `Satz vom Nullprodukt` / `Vorzeichentabelle` / `Lösungsmenge` / `Vielfachheit`（建议由主线程补入 `Vokabeln-Anki/Mathe-EF-Basis.csv`）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
