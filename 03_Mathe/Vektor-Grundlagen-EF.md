---
fach: Mathe
thema: "Vektor-Grundlagen EF"
operatoren: [angeben, beschreiben, berechnen, nachweisen, untersuchen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Mathe, Geometrie]
stufe: "EF"
---

# Vektor-Grundlagen EF (向量基础：点·向量·加减数乘·模长·共线)

> **中文理解**：**点**是位置，**向量**是位移。把一个点从原点连出一条箭头，就得到它的**定位向量（Ortsvektor）**；两点相减就得到从一点指向另一点的**位移向量**。
> 向量的全部 EF 运算只有两件：**加法**（首尾相接）与**数乘**（改长度、可能反向）。坐标层面二者都是**逐分量**操作 [已验证]。
> **模长**在 EF 阶段必须用 `Satz des Pythagoras` 的推广来算——因为 EF **尚未引入 `Skalarprodukt`**，`|a| = √(a·a)` 这种写法在 EF 属于超范围 [已验证]。
> **共线（Kollinearität）** 即一个向量是另一个的数乘倍，是后面「基底是否合法」「两直线是否平行」的唯一判据。
>
> **Klausur-Relevanz**：EF 的 G 域**全部**建在这三条运算上；ZKE Teil A 与 Abitur 1. Prüfungsteil（免工具段）几乎必有一道「给点求向量 / 求模长 / 判共线」的基础小问 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Punkt | 点 | point | $P(p_1\,|\,p_2\,|\,p_3)$，书写用**圆括号 + 竖线** | 点是位置 [已验证] |
| Vektor | 向量 | vector | $\vec{v}=\begin{pmatrix}v_1\\v_2\\v_3\end{pmatrix}$，书写用**圆括号竖排** | 向量是位移 [已验证] |
| Ortsvektor | 定位向量 | position vector | $\vec{OP}=\begin{pmatrix}p_1\\p_2\\p_3\end{pmatrix}$ | 从原点指向 $P$ [已验证] |
| Verbindungsvektor | 两点向量 | connecting vector | $\vec{AB}=\vec{OB}-\vec{OA}$（**终点减起点**） | 方向极易写反 |
| Addition | 加法 | addition | $\vec{a}+\vec{b}=\begin{pmatrix}a_1+b_1\\a_2+b_2\\a_3+b_3\end{pmatrix}$ | 逐分量 [已验证] |
| Multiplikation mit einem Skalar | 数乘 | scalar multiplication | $r\vec{a}=\begin{pmatrix}ra_1\\ra_2\\ra_3\end{pmatrix}$ | $r<0$ 反向 [已验证] |
| Gegenvektor | 反向量 | opposite vector | $-\vec{a}$，方向相反、长度相等 | $\vec{BA}=-\vec{AB}$ |
| Länge / Betrag | 模长 | length / magnitude | $|\vec{a}|=\sqrt{a_1^2+a_2^2+a_3^2}$ | **EF 用 Pythagoras 推出** [已验证] |
| Kollinearität | 共线 | collinearity | 存在 $k\in\mathbb{R}$ 使 $\vec{a}=k\vec{b}$ | 也叫 linear abhängig |
| Nullvektor | 零向量 | zero vector | $\vec{0}=\begin{pmatrix}0\\0\\0\end{pmatrix}$，长度 $0$，方向不定 | 与任何向量共线 |

---

## 2. 知识结构 (Struktur)

### 2.1 点 ⇄ 向量：一次坐标翻译

**点**只回答「在哪里」，**向量**回答「怎么走」。把一个点的坐标竖起来加上箭头，就是它的定位向量；反之把定位向量的分量横过来加竖线，就回到点。

$\vec{AB}=\vec{OB}-\vec{OA}$ 是**唯一**的求两点向量公式，口诀「**终点减起点**」。

> *Klausur-Satz*: Der Verbindungsvektor zweier Punkte ergibt sich als Differenz der zugehörigen Ortsvektoren: $\vec{AB}=\vec{OB}-\vec{OA}$.

### 2.2 加法与数乘：只有两条运算

| 运算 | 几何意义 | 坐标操作 |
|---|---|---|
| $\vec{a}+\vec{b}$ | 首尾相接（平行四边形法则） | 逐分量相加 |
| $r\vec{a}$ | 长度变为 $|r|$ 倍；$r<0$ 时反向 | 每个分量乘 $r$ |

由此得到**线性组合** $r\vec{a}+s\vec{b}$——它只是「先数乘、再相加」两步的组合，不含任何新运算 [已验证]。

> *Klausur-Satz*: Die Addition von Vektoren erfolgt komponentenweise; die Multiplikation mit einem Skalar streckt (bzw. staucht) den Vektor und kehrt bei negativem Skalar seine Richtung um.

### 2.3 模长：EF 只能用 Pythagoras

平面上 $|\vec{a}|=\sqrt{a_1^2+a_2^2}$ 就是直角三角形的斜边；空间里再套一层，得到 $|\vec{a}|=\sqrt{a_1^2+a_2^2+a_3^2}$。这个公式本身可以由**两次 Pythagoras** 推出，所以它不依赖 `Skalarprodukt` [已验证]。

> ⚠️ 写出 $|\vec{a}|=\sqrt{\vec{a}\cdot\vec{a}}$ 在 EF 阶段属**超范围**（内积是 Q1 内容）；用 Pythagoras 表述才合规 [已验证]。

> *Klausur-Satz*: Die Länge eines Vektors wird im EF mithilfe des Satzes von Pythagoras berechnet: $|\vec{a}|=\sqrt{a_1^2+a_2^2+a_3^2}$.

### 2.4 共线：一个数乘就够

$\vec{a}$ 与 $\vec{b}$（$\vec{b}\neq\vec{0}$）共线 $\iff$ 存在 $k$ 使 $\vec{a}=k\vec{b}$ $\iff$ 对应分量成**同一比例**。

- 二维：$\dfrac{a_1}{b_1}=\dfrac{a_2}{b_2}$（分母不为零时）
- 三维：三个比例必须**全部相等**；只要有一个比例不同，就不共线。

> ⚠️ 共线 ≠ 相等 ≠ 平行。共线说的是「方向相同或相反」；相等还要求长度相同；平行是共线在直线层面的说法 [已验证]。

> *Klausur-Satz*: Zwei Vektoren sind genau dann kollinear, wenn der eine ein skalares Vielfaches des anderen ist, d. h. wenn alle Komponentenverhältnisse übereinstimmen.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：两点向量与模长（标准三步）

1. **列两点定位向量** $\vec{OA},\vec{OB}$ —— *KLP 工具：`Ortsvektor`*
2. **终点减起点** $\vec{AB}=\vec{OB}-\vec{OA}$ —— *KLP 工具：`Addition`（含反向量）*
3. **逐分量平方求和开方** $|\vec{AB}|=\sqrt{(\Delta x)^2+(\Delta y)^2+(\Delta z)^2}$ —— *KLP 工具：`Satz des Pythagoras`*

> **判据 / 决策点**：题目问「两点距离」时，先写 $\vec{AB}$ 再取模长；直接背距离公式容易在符号上出错。

### 3.2 方法 B：共线判定（先设比例，后验全部）

1. 先看哪个向量分量**全非零**，用它作分母设 $k=\dfrac{a_1}{b_1}$ —— *KLP 工具：`Kollinearität`*
2. 用这个 $k$ 检验**其余所有分量**是否也成立 —— *KLP 工具：`Multiplikation mit einem Skalar`*
3. 全部成立 → 共线；只要有一条不成立 → **不共线**，立刻下结论

> **判据 / 决策点**：若某向量有分量为 $0$，先单看那一行（例如 $b_2=0$ 时必须有 $a_2=0$），再对其余行设比例。

### 3.3 方法 C：线性组合求系数（待定系数）

1. 设 $\vec{v}=r\vec{a}+s\vec{b}$ —— *KLP 工具：`Linearkombination`*
2. 按分量写方程组（二维两行、三维三行） —— *KLP 工具：`Addition`/`Skalarmultiplikation`*
3. 手算消元求解 —— *KLP 工具：`LGS`（EF 要求无工具解 ≤3 未知数）*
4. 回代验算，写结论句 —— *KLP 工具：`bestimmen` 必须呈示过程*

> **判据 / 决策点**：先验 $\vec{a},\vec{b}$ 是否共线；共线则不能作基底，方程组会出现无解或无穷多解。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 向量的坐标化运算与「共线 ⇄ 比例」判据

- **技法内容**：中国在必修一上来就把向量**坐标化**：加法、数乘、模长、共线全部落成**分量算式**，并把「共线 $\iff$ 存在 $\lambda$ 使 $\vec{a}=\lambda\vec{b}$」显式作为判据题型化。求两点距离时固定「终点减起点 → 平方和开方」一条链，练到机械化。
- **DE-Anschluss**：EF 已教 `Koordinatisierung des Raumes`、`Ortsvektoren`、`Addition`、`Multiplikation mit einem Skalar`、`Länge`、`Kollinearität` [已验证]；德国 KLP 甚至**明文要求**向量须能几何解释为**位移**、情境中解释为**速度**，与坐标化视角完全兼容 [已验证]。
- **合规性**：✅ 完全合规 —— 全部运算在 EF 范围内。⚠️ 唯一红线：**模长必须用 `Satz des Pythagoras` 表述**，不可写成 $\sqrt{\vec{a}\cdot\vec{a}}$（`Skalarprodukt` 是 Q1 内容，EF 提前使用属超范围）[已验证]。
- **Abitur 应用**：EF 免工具段的基础小问（给点求向量、求模长、判共线），以及后续直线参数式、位置关系判定的**第一步**（AFB I–II）[据推断]。
- **来源**：`[CN-课标]` 平面向量线性运算及几何意义、共线条件 · `[CN-教材]` 坐标化运算与两点距离 · `[CN-高考]` 向量共线与模长基础题

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I（免工具）基础小问；也可作 Q1 几何大题的第一小问 [据推断] |
| Operator | `angeben` / `berechnen` / `nachweisen` / `untersuchen`（数学不按动词分 AFB）[已验证] |
| AFB | I（复述运算）为主，含少量 II（迁移到情境）[据推断] |
| 建议分值 / 时长 | 免工具段 3–6 BE / 约 5–8 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`（两点向量 + 模长）
> Gegeben sind die Punkte $A(1\,|\,2\,|\,3)$ und $B(4\,|\,6\,|\,3)$.
> a) Geben Sie den Verbindungsvektor $\vec{AB}$ an.
> b) Berechnen Sie die Länge $|\vec{AB}|$.

**Aufgabe 2** `[原创]`（共线判定）
> Gegeben sind $\vec{a}=\begin{pmatrix}2\\-3\\1\end{pmatrix}$, $\vec{b}=\begin{pmatrix}-4\\6\\-2\end{pmatrix}$ und $\vec{c}=\begin{pmatrix}1\\0\\2\end{pmatrix}$.
> Untersuchen Sie, welche der Vektorenpaare $(\vec{a},\vec{b})$ und $(\vec{a},\vec{c})$ kollinear sind, und begründen Sie Ihre Entscheidung.

**Aufgabe 3** `[CN-改编]`（线性组合求系数）
> Gegeben sind $\vec{u}=\begin{pmatrix}1\\2\end{pmatrix}$, $\vec{v}=\begin{pmatrix}3\\-1\end{pmatrix}$ und $\vec{w}=\begin{pmatrix}5\\3\end{pmatrix}$.
> Bestimmen Sie die Koeffizienten $r,s$ mit $\vec{w}=r\vec{u}+s\vec{v}$.

**Aufgabe 4** `[NRW-改编]`（情境：位移解释，AFB II）
> Ein Flugzeug bewegt sich vom Punkt $P(10\,|\,20\,|\,3)$ aus geradlinig mit dem Richtungsvektor $\vec{d}=\begin{pmatrix}4\\-2\\0\end{pmatrix}$ (Angaben in km, pro Zeiteinheit).
> a) Geben Sie den Ortsvektor von $P$ an.
> b) Bestimmen Sie den Punkt, den das Flugzeug nach zwei Zeiteinheiten erreicht.
> c) Erläutern Sie, was der Vektor $\vec{d}$ in diesem Sachzusammenhang bedeutet.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Ansatz**: $\vec{AB}=\vec{OB}-\vec{OA}$ ✓ 得分点：写出公式
2. **Rechnung**: $\vec{AB}=\begin{pmatrix}4\\6\\3\end{pmatrix}-\begin{pmatrix}1\\2\\3\end{pmatrix}=\begin{pmatrix}3\\4\\0\end{pmatrix}$ ✓ 得分点：逐分量相减
3. **b) Pythagoras**: $|\vec{AB}|=\sqrt{3^2+4^2+0^2}=\sqrt{9+16}=\sqrt{25}=5$ ✓ 得分点：显式写出平方和开方
4. **Antwort**: Die Länge beträgt $5$ Längeneinheiten. ✓

**Aufgabe 2**
1. **Paar (a,b)**: Setze $k=\frac{-4}{2}=-2$; prüfe die zweite Komponente: $-2\cdot(-3)=6$ ✓; dritte: $-2\cdot1=-2$ ✓ 得分点：三行全验
2. **Fazit (a,b)**: Da alle Komponenten übereinstimmen, gilt $\vec{b}=-2\vec{a}$, also sind $\vec{a}$ und $\vec{b}$ **kollinear**. ✓
3. **Paar (a,c)**: Zweite Komponente von $\vec{c}$ ist $0$, also müsste bei $\vec{a}=k\vec{c}$ auch die zweite Komponente von $\vec{a}$ gleich $0$ sein. Wegen $a_2=-3\neq0$ ist das unmöglich. ✓ 得分点：用零分量做矛盾
4. **Fazit (a,c)**: $\vec{a}$ und $\vec{c}$ sind **nicht kollinear**. ✓

**Aufgabe 3**
1. **Ansatz**: $\begin{pmatrix}5\\3\end{pmatrix}=r\begin{pmatrix}1\\2\end{pmatrix}+s\begin{pmatrix}3\\-1\end{pmatrix}$ ✓ 得分点：写出 Ansatz
2. **LGS**: $r+3s=5$ und $2r-s=3$ ✓ 得分点：两行都写
3. **Lösen**: Aus der zweiten Zeile $s=2r-3$; eingesetzt: $r+3(2r-3)=5\Rightarrow 7r=14\Rightarrow r=2$, dann $s=2\cdot2-3=1$ ✓
4. **Ergebnis**: $\vec{w}=2\vec{u}+1\vec{v}$ ✓ 得分点：带系数结论句
5. **Probe**: $2\begin{pmatrix}1\\2\end{pmatrix}+1\begin{pmatrix}3\\-1\end{pmatrix}=\begin{pmatrix}5\\3\end{pmatrix}$ ✓ 得分点：回代验算

**Aufgabe 4**
1. **a)**: $\vec{OP}=\begin{pmatrix}10\\20\\3\end{pmatrix}$ ✓ 得分点：点 → 竖排向量
2. **b) Ansatz**: $\vec{OP_2}=\vec{OP}+2\vec{d}$ ✓ 得分点：用数乘表示「两次位移」
3. **b) Rechnung**: $\vec{OP_2}=\begin{pmatrix}10\\20\\3\end{pmatrix}+2\begin{pmatrix}4\\-2\\0\end{pmatrix}=\begin{pmatrix}18\\16\\3\end{pmatrix}$ ⇒ $P_2(18\,|\,16\,|\,3)$ ✓
4. **c) Deutung**: $\vec{d}$ beschreibt die Verschiebung (Richtung und Geschwindigkeit) des Flugzeugs **pro Zeiteinheit**; die Länge $|\vec{d}|=\sqrt{4^2+(-2)^2+0^2}=\sqrt{20}\approx4{,}47$ km ist der pro Zeiteinheit zurückgelegte Weg. ✓ 得分点：`erläutern` 要求建立情境关联（位移/速度 + 单位）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把**点**写成竖排、把**向量**写成横排加竖线，或 $\vec{AB}$ 与 $\vec{BA}$ 混用 | 牢记「终点减起点」，并在卷面区分书写（点用圆括号竖线，向量用竖排） |
| 知识错 | 共线判定只验一行就下结论；模长漏掉某个分量 | 方法 B 要求**逐行全验**；模长三行都写出来 |
| 表达错 | 只写 $|\vec{AB}|=5$ 不给过程 → 违反 `berechnen` 的「必须呈示过程」[已验证] | 每次写出 $\sqrt{(\Delta x)^2+\dots}$ 这一行 |
| 超范围错 | EF 阶段写 $|\vec{a}|=\sqrt{\vec{a}\cdot\vec{a}}$（`Skalarprodukt` 未教） | EF 统一用 `Satz des Pythagoras` [已验证] |

---

## 7. Vernetzung

- **上游**：`MA-G1-01` 点与定位向量 · `MA-G1-02` 加法与数乘 · `MA-G1-03` 模长与共线（本节点）
- **下游**：`MA-G1-04` 基底与线性组合（[`Basis-und-Linearkombination.md`](Basis-und-Linearkombination.md)）· `MA-G2-01` 直线参数式（[`Geraden-Parameterform-und-Lagebeziehungen.md`](Geraden-Parameterform-und-Lagebeziehungen.md)）· Q1 `MA-G3-01` `Skalarprodukt`
- **横向**：物理（位移、速度、力的合成与分解）；`Analysis-Physik-Kinetik-Vernetzung.md`
- **术语卡**：`Ortsvektor` / `Verbindungsvektor` / `Kollinearität` / `Gegenvektor` / `Betrag eines Vektors`（建议由主线程补入 `Vokabeln-Anki/Mathe-EF-Basis.csv`）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
