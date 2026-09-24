---
fach: Mathe
thema: "Basis und Linearkombination"
operatoren: [bestimmen, begruenden, berechnen, untersuchen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Mathe, Geometrie]
stufe: "EF|Q1"
---

# Basis und Linearkombination (基底分解与线性组合)

> **中文理解**：取两个**不共线**向量作基底，平面上任一向量都可以**唯一**写成它们的线性组合 `v = r·a + s·b`，系数 `r, s` 由方程组或几何条件读出。
> 这条思想在 NRW 的 KLP 里**没有独立条目**，但 EF 的直线参数式（`Stützvektor + t·Richtungsvektor`）本身就是一次线性组合 [已验证]。
> 到了 Q1，`Ebenen`-Parameterform、LK 的 `Parallelogramme und Dreiecke` 参数形式、`LGS` 解集的几何解释**几乎全部建立在"线性组合唯一性"上** [已验证]。
> 因此它是 EF→Q1 在 G 域上最大隐形台阶（"EF 无 Skalarprodukt、无 Ebenen"）的**上游补丁**。
>
> **Klausur-Relevanz**：全部运算只用 `Addition` + `Multiplikation mit einem Skalar`，在 EF 就完全合规，是**免工具段**的常规小问，也是 Q1-G 的语法基础。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Vektor | 向量 | vector | 有向线段，记 $\vec{v}=\begin{pmatrix}v_1\\v_2\\v_3\end{pmatrix}$ | EF 已教 [已验证] |
| Linearkombination | 线性组合 | linear combination | $r\vec{a}+s\vec{b}$（$r,s\in\mathbb{R}$） | 只用加法与数乘 |
| Basis (einer Ebene) | （平面）基底 | basis | 两个**不共线**向量 $\vec{a},\vec{b}$ | 三维需三个不共面向量 |
| Kollinearität | 共线 | collinearity | $\vec{a}=k\vec{b}$，$k\in\mathbb{R}$ | 判定基底是否合法 |
| Lineare Unabhängigkeit | 线性无关 | linear independence | 只有 $r=s=0$ 才使 $r\vec{a}+s\vec{b}=\vec{0}$ | 基底的核心性质 |
| Eindeutigkeit der Darstellung | 表示的唯一性 | uniqueness | 系数 $r,s$ 唯一 | 与"任意表示"区分 |
| Stützvektor / Richtungsvektor | 支点向量 / 方向向量 | position / direction vector | 直线 $\vec{x}=\vec{p}+t\vec{u}$ | 已是线性组合 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 线性组合就是"两个已知方向的合成"

任给两个向量 $\vec{a},\vec{b}$，把所有可能的 $r\vec{a}+s\vec{b}$ 收在一起，得到的是它们**张成**的集合。若 $\vec{a},\vec{b}$ 不共线，这个集合就是**整张平面**；若共线，只得到一条直线。

> *Klausur-Satz*: Zwei nicht kollineare Vektoren spannen eine Ebene auf; jeder Vektor dieser Ebene lässt sich als Linearkombination dieser beiden Vektoren darstellen.

### 2.2 基底表示的**唯一性**（本节核心）

**定理（平面向量基本定理）**：设 $\vec{a},\vec{b}$ 不共线，则任一与它们共面的向量 $\vec{v}$ 存在**唯一**的 $r,s$ 使 $\vec{v}=r\vec{a}+s\vec{b}$。

- 为什么唯一？假设 $\vec{v}=r\vec{a}+s\vec{b}=r'\vec{a}+s'\vec{b}$，相减得 $(r-r')\vec{a}+(s-s')\vec{b}=\vec{0}$。若 $r\neq r'$，则 $\vec{a}$ 与 $\vec{b}$ 共线，矛盾；故 $r=r'$，同理 $s=s'$。[已验证：推论正确]
- **考试意义**：唯一性才允许我们"比较系数"列方程组。若基底共线，方程组要么无解要么无穷多解——题目里出现"不唯一"通常就是选错基底的信号。

> *Klausur-Satz*: Da $\vec{a}$ und $\vec{b}$ nicht kollinear sind, ist die Darstellung $\vec{v}=r\vec{a}+s\vec{b}$ eindeutig; die Koeffizienten $r$ und $s$ sind daher eindeutig bestimmt.

### 2.3 与德国已有工具的接口

| 德国已有条目 | 与本笔记的关系 |
|---|---|
| `Addition` / `Multiplikation mit einem Skalar` (EF) | 线性组合的两个构件 [已验证] |
| `Kollinearität` (EF) | 判定基底是否合法 [已验证] |
| `Parameterform der Gerade` (EF) | `p + t·u` 本身就是一次线性组合 [已验证] |
| `Ebenen in Parameterform` (Q1) | `p + s·u + t·v` = 三维基底分解 [已验证] |
| `Parallelogramme und Dreiecke` 参数形式 (LK) | 线性组合 + 参数范围约束 [已验证] |

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：待定系数法（列方程组求系数）

**编号步骤**：
1. 设 $\vec{v}=r\vec{a}+s\vec{b}$ —— *KLP 工具：`Linearkombination` 的定义*
2. 按分量写成方程组（二维两行、三维三行） —— *KLP 工具：`Addition`/`Skalarmultiplikation` 的分量运算*
3. 解方程组（EF：手算消元） —— *KLP 工具：`LGS`（EF 已要求解 ≤3 未知数）*
4. 回代验算，写出结论句 —— *KLP 工具：`bestimmen` 要求呈示过程*

> **判据 / 决策点**：题目问"是否可用 $\vec{a},\vec{b}$ 表示"或"求系数"时用此法。若方程组无解，说明 $\vec{v}$ 不在 $\vec{a},\vec{b}$ 张成的集合内。

### 3.2 方法 B：几何条件法（分点、共线直接读系数）

在三角形/平行四边形中，若已知分点比例（如中点、三等分点），系数可直接写出：
- $M$ 为 $AB$ 中点 $\Rightarrow \vec{OM}=\frac12\vec{OA}+\frac12\vec{OB}$
- $P$ 在 $AB$ 上且 $AP:PB=1:2$ $\Rightarrow \vec{OP}=\frac23\vec{OA}+\frac13\vec{OB}$

> **判据 / 决策点**：题目给的是"几何比例"而非"具体坐标"时，先选基底（通常是两条边向量），再用分点公式。

### 3.3 方法 C：判定基底合法性（先做再算）

1. 检验 $\vec{a},\vec{b}$ 是否共线：存在 $k$ 使 $\vec{a}=k\vec{b}$？
2. 若共线 → **不能**作基底，停止；若严格按题目算会得到无解/多解。
3. 若不共线 → 继续方法 A。

> **判据 / 决策点**：拿到任何"用 a、b 表示"的题，**第一步先验共线性**，这是本项目点名的"辨别错"高发点。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 平面向量基本定理（基底分解）

- **技法内容**：任取两个不共线向量作基底，任一向量可**唯一**表示为线性组合；求系数用"待定系数 + 比较系数"列方程组，或利用共线/分点的几何条件直接读出。**基底选得好（正交基底、沿已知方向取基底），运算量小一个量级**。
- **DE-Anschluss**：只用加法与数乘即可成立——EF 已教 `Addition`、`Multiplikation mit einem Skalar`、`Kollinearität` [已验证]；EF 的 `Parameterform der Gerade`（起点 + 方向向量）本身就是一次线性组合，是现成的具身经验 [已验证]。
- **合规性**：✅ 完全合规 —— 全部运算在 EF 范围内，**无需 `Skalarprodukt`**。⚠️ 但"正交分解 + 用坐标算夹角"这部分要等 Q1 的 `Skalarprodukt`，标为 Q1 增量，**不可在 EF 提前** [已验证]。
- **Abitur 应用**：EF→Q1 衔接期直接化解 G 域断层；Q1 的 `Ebenen`-Parameterform、LK 的 `Parallelogramme und Dreiecke`、`LGS` 解集解释全部建立在"线性组合唯一性"上（AFB I–II）[已验证]。
- **来源**：`[CN-课标]` 平面向量基本定理及其意义、正交分解及坐标表示 · `[CN-教材]` 基底选取与待定系数 · `[CN-高考]` 向量线性表示与共线条件

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | 免工具题（1. Prüfungsteil）小问；Q1 的 Ebenen 大题前置步 [据推断] |
| Operator | `bestimmen` / `begruenden` / `untersuchen`（官方词表，数学不按动词分 AFB）[已验证] |
| AFB | I–II（复述运算 + 迁移到几何情境）[据推断] |
| 建议分值 / 时长 | 免工具段 3–5 BE / 约 4–6 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`
> Gegeben sind die Vektoren $\vec{a}=\begin{pmatrix}2\\1\end{pmatrix}$, $\vec{b}=\begin{pmatrix}-1\\3\end{pmatrix}$ und $\vec{v}=\begin{pmatrix}7\\1\end{pmatrix}$.
> a) Begründen Sie, dass $\vec{a}$ und $\vec{b}$ eine Basis der Ebene bilden.
> b) Bestimmen Sie die Koeffizienten $r,s$ mit $\vec{v}=r\vec{a}+s\vec{b}$.

**Aufgabe 2** `[CN-改编]`
> Im Dreieck $ABC$ teilt der Punkt $P$ die Seite $AB$ und der Punkt $Q$ die Seite $AC$, jeweils im Verhältnis $2:1$ von $A$ aus (also $AP:PB=AQ:QC=2:1$).
> a) Stellen Sie $\vec{AP}$ und $\vec{AQ}$ als Linearkombination von $\vec{AB}$ und $\vec{AC}$ dar.
> b) Zeigen Sie durch Vergleich der Koeffizienten, dass $\vec{PQ}$ parallel zu $\vec{BC}$ ist.

**Aufgabe 3** `[NRW-改编]`
> Eine Gerade ist gegeben durch $\vec{x}=\begin{pmatrix}1\\2\\3\end{pmatrix}+t\begin{pmatrix}2\\-1\\4\end{pmatrix}$.
> Untersuchen Sie, ob der Punkt $P(5\,|\,0\,|\,11)$ auf der Geraden liegt, und deuten Sie die Parameterform als Linearkombination.

**Aufgabe 4** `[原创]`（AFB II–III 论证）
> Gegeben sind drei Vektoren $\vec{a},\vec{b},\vec{c}$ mit $\vec{c}=2\vec{a}-3\vec{b}$.
> Beurteilen Sie, ob $\vec{a},\vec{b},\vec{c}$ eine Basis des Raumes bilden können, und begründen Sie Ihre Entscheidung.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Basisnachweis**: $\vec{a}$ und $\vec{b}$ sind nicht kollinear, da kein $k$ mit $\vec{a}=k\vec{b}$ existiert (aus $2=k\cdot(-1)$ folgt $k=-2$, aber $1\neq -2\cdot 3$) ✓ 得分点：显式给出矛盾
2. **Ansatz**: $\begin{pmatrix}7\\1\end{pmatrix}=r\begin{pmatrix}2\\1\end{pmatrix}+s\begin{pmatrix}-1\\3\end{pmatrix}$ ✓ 得分点：写出 Ansatz
3. **Gleichungssystem**: $\;2r-s=7$ und $\;r+3s=1$ ✓ 得分点：两行都写
4. **Lösen**: Aus der zweiten Zeile $r=1-3s$; eingesetzt: $2(1-3s)-s=7 \Rightarrow -7s=5 \Rightarrow s=-\tfrac57$, dann $r=1-3(-\tfrac57)=\tfrac{22}{7}$ ✓
5. **Ergebnis**: $\vec{v}=\tfrac{22}{7}\vec{a}-\tfrac57\vec{b}$ ✓ 得分点：带系数结论句

**Aufgabe 2**
1. **AP**: $\vec{AP}=\frac{2}{3}\vec{AB}$ ✓ 得分点：比例转系数
2. **AQ**: $\vec{AQ}=\frac{2}{3}\vec{AC}$ ✓
3. **PQ**: $\vec{PQ}=\vec{AQ}-\vec{AP}=\frac23\vec{AC}-\frac23\vec{AB}=\frac23\left(\vec{AC}-\vec{AB}\right)=\frac23\vec{BC}$ ✓ 得分点：换基底并提取公因子
4. **Parallelität**: Da $\vec{PQ}=\frac23\vec{BC}$, sind die beiden Vektoren kollinear, also ist $PQ$ parallel zu $BC$. ✓ 得分点：用共线判据下结论

**Aufgabe 3**
1. **Punktprobe**: Aus der ersten Zeile $1+2t=5\Rightarrow t=2$; aus der zweiten $2-t=0\Rightarrow t=2$; aus der dritten $3+4t=11\Rightarrow t=2$ ✓ 得分点：三行都算
2. **Fazit**: Da alle drei Zeilen $t=2$ liefern, liegt $P$ auf der Geraden. ✓
3. **Deutung**: $\begin{pmatrix}1\\2\\3\end{pmatrix}+2\begin{pmatrix}2\\-1\\4\end{pmatrix}$ ist die Linearkombination aus dem Stützvektor und dem zweifachen Richtungsvektor; der Parameter $t$ gibt an, wie oft der Richtungsvektor aneinandergereiht wird. ✓ 得分点：`deuten` 要求建立关联

**Aufgabe 4**
1. **Analyse**: Da $\vec{c}=2\vec{a}-3\vec{b}$, liegt $\vec{c}$ in der von $\vec{a},\vec{b}$ aufgespannten Ebene. ✓
2. **Beurteilung**: Drei Vektoren bilden nur dann eine Basis des Raumes, wenn sie **linear unabhängig** sind; hier ist $\vec{c}$ linear abhängig von $\vec{a},\vec{b}$, also existiert eine nichttriviale Kombination $2\vec{a}-3\vec{b}-\vec{c}=\vec{0}$. ✓ 得分点：写出零组合
3. **Fazit**: $\vec{a},\vec{b},\vec{c}$ bilden **keine** Basis des Raumes. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 基底选了共线向量还继续算 → 得到无解/多解却不知为何 | 每题第一步先验共线性（方法 C） |
| 知识错 | 把"唯一表示"当成"任意表示"；以为系数可以随便取 | 记住唯一性的证明逻辑（2.2） |
| 表达错 | 只写结果系数，不写 Ansatz 与方程组 → 违反 `bestimmen` 的"必须呈示过程" [已验证] | 每次写出 $\vec{v}=r\vec{a}+s\vec{b}$ 这一行 |
| 超范围错 | EF 阶段套用 $\sqrt{\vec a\cdot\vec a}$ 求长度（EF 未教 Skalarprodukt） | EF 用 `Satz des Pythagoras` [已验证] |

---

## 7. Vernetzung

- **上游**：`MA-G1-01` 点与定位向量 · `MA-G1-02` 加法与数乘 · `MA-G1-03` 模长与共线 · `MA-G2-01` 直线参数式
- **下游**：`MA-G4-01` 平面参数式 · `MA-G4-05` 平行四边形与三角形参数形式（LK）· `MA-G6-02` 解集与位置关系互译
- **横向**：Q1 `Skalarprodukt`（正交分解的增量）· 物理（向量合成、力的分解）
- **术语卡**：`Linearkombination` / `Basis` / `lineare Unabhängigkeit` / `Kollinearität` / `Eindeutigkeit`（建议补入 `Vokabeln-Anki/Mathe-EF-Basis.csv`，由主线程同步）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编，解析为原创。不搬运出版社教辅原文。
