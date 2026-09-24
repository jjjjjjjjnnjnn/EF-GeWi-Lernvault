---
fach: Mathe
thema: "Skalarprodukt und Ebenen"
operatoren: [berechnen, bestimmen, nachweisen, untersuchen, begruenden]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Mathe, Geometrie]
stufe: "Q1"
---

# Skalarprodukt und Ebenen (数量积与平面)

> **中文理解**：`Skalarprodukt` 是 Q1-G 域的第一块基石，KLP 把它定位为空间**度量化（Metrisierung）的起点**——有了内积才能谈正交性、模与夹角 [已验证]。
> EF 完全**没有** `Skalarprodukt`、也**没有** `Ebenen`（长度只能用 `Satz des Pythagoras`），所以这是 EF→Q1 在 G 域上最大的隐形台阶 [已验证]。
> 平面（`Ebenen`）在 GK 只到 `Parameterform` + `Koordinatenform` + `Normalenvektor`；`Normalenform` 是 **LK 专属**的第三种独立专名形式 [已验证]。
> 后续的线面交点、`Schnittwinkel`、`Abstände` 几乎全部以法向量为工具。
>
> **Klausur-Relevanz**：Q1-G 的常规大题主干（AFB II）；`Skalarprodukt` 的几何解释是概念解释题（AFB I–II）的高频点。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Skalarprodukt | 数量积（点积） | dot product | $\vec{a}\cdot\vec{b}=a_1b_1+a_2b_2+a_3b_3$ | 结果是**数** [已验证] |
| Orthogonalität | 正交（垂直） | orthogonality | $\vec{a}\cdot\vec{b}=0 \Leftrightarrow \vec{a}\perp\vec{b}$ | 三重解释之一 |
| Betrag / Länge | 模长 | magnitude | $|\vec{a}|=\sqrt{\vec{a}\cdot\vec{a}}$ | EF 用 Pythagoras，Q1 升级 [已验证] |
| Schnittwinkel | 夹角 | angle | $\cos\varphi=\dfrac{\vec{a}\cdot\vec{b}}{|\vec{a}|\,|\vec{b}|}$ | 三类交角基础 |
| Ebene in Parameterform | 平面参数式 | parametric form | $\vec{x}=\vec{p}+s\vec{u}+t\vec{v}$ | 两个不共线方向向量 [已验证] |
| Koordinatenform | 坐标形式 | coordinate form | $ax+by+cz=d$ | GK 终点 [已验证] |
| Normalenvektor | 法向量 | normal vector | $\vec{n}=(a,b,c)$ 垂直于平面 | 系数即法向量 |
| Normalenform | 法向式（LK） | normal form | $(\vec{x}-\vec{p})\cdot\vec{n}=0$ | LK 独立专名 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 数量积的三重几何解释（先行组织者）

有了内积，向量空间才从"能加减"升级为"能测量"：

1. **正交性**：$\vec{a}\cdot\vec{b}=0$ ⇔ 两向量垂直（零向量与任意向量正交）
2. **模**：$|\vec{a}|=\sqrt{\vec{a}\cdot\vec{a}}$（EF 的 Pythagoras 法成为特例）
3. **夹角**：$\cos\varphi=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$

> *Klausur-Satz*: Das Skalarprodukt ermöglicht die Metrisierung des Raumes: Es liefert Orthogonalität, Länge und Winkel.

### 2.2 平面的三种表示（GK 两种 + LK 一种）

| 形式 | 式子 | 工具 | 学段 |
|---|---|---|---|
| Parameterform | $\vec{x}=\vec{p}+s\vec{u}+t\vec{v}$ | 支点 + 两个方向向量 | GK [已验证] |
| Koordinatenform | $ax+by+cz=d$ | 法向量 $\vec{n}=(a,b,c)$ | GK [已验证] |
| Normalenform | $(\vec{x}-\vec{p})\cdot\vec{n}=0$ | 支点 + 法向量 | **LK** [已验证] |

> *Klausur-Satz*: Eine Ebene lässt sich in Parameterform (Stützvektor + zwei Richtungsvektoren) oder in Koordinatenform (Normalenvektor) darstellen; die Normalenform ist eine eigenständige dritte Form.

### 2.3 两形式互化（核心操作）

- **Parameterform → Koordinatenform**：先由 $\vec{u}\times\vec{v}$ 或解 $\vec{n}\cdot\vec{u}=0,\ \vec{n}\cdot\vec{v}=0$ 求法向量 $\vec{n}$，再用支点代入定 $d$ —— *KLP 工具：`Orthogonalität`*
- **Koordinatenform → Parameterform**：令两个自由变量作参数，解出第三个 —— *KLP 工具：`LGS`*

> ⚠️ 项目预判的高发错误：把"法向量"与"方向向量"搞混，或 $d$ 的符号写错（应 $\vec{n}\cdot\vec{p}=d$）。

### 2.4 三类交角的统一结构

| 类型 | 取哪两个向量 | 是否需要换算 |
|---|---|---|
| Gerade–Gerade | 两个方向向量 | 不需要 |
| Gerade–Ebene | 方向向量 与 **法向量** | ⚠️ 须取**余角**（$\sin\varphi$） |
| Ebene–Ebene | 两个法向量 | 不需要 |

> *Klausur-Satz*: Beim Schnittwinkel zwischen Gerade und Ebene berechnet man zunächst den Winkel zwischen Richtungsvektor und Normalenvektor und verwendet dann den Komplementärwinkel.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：由三点定平面（Parameterform + Koordinatenform）

1. 支点 $\vec{p}=\vec{OA}$ —— *KLP 工具：`Ortsvektor`*
2. 方向向量 $\vec{u}=\vec{AB}$, $\vec{v}=\vec{AC}$；验不共线 —— *KLP 工具：`Kollinearität`*
3. Parameterform 写出 —— *KLP 工具：`Parameterform`*
4. 法向量 $\vec{n}$ 满足 $\vec{n}\cdot\vec{u}=0$, $\vec{n}\cdot\vec{v}=0$，取一组整数解 —— *KLP 工具：`Skalarprodukt`*
5. $d=\vec{n}\cdot\vec{p}$，得 Koordinatenform —— *KLP 工具：`Orthogonalität`*

> **判据 / 决策点**：三点确定平面时，务必先验两个方向向量不共线，否则"平面"退化为直线。

### 3.2 方法 B：点是否在平面上（Punktprobe）

- 有 Koordinatenform：直接代入，看等式是否成立
- 有 Parameterform：解方程组，看是否有**同一组** $(s,t)$ 满足三行

> **判据 / 决策点**：三行方程必须**全部**满足，只对两行就下结论是最常见的失分动作。

### 3.3 方法 C：夹角计算

1. 判定类型（线线 / 线面 / 面面） —— *KLP 工具：`Schnittwinkel`*
2. 取对应的两个向量（方向向量或法向量） —— *KLP 工具：`Normalenvektor`*
3. 代入 $\cos\varphi=\frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$ —— *KLP 工具：`Skalarprodukt`*
4. **线面角取余角**（$\varphi'=90^\circ-\varphi$） —— *KLP 工具：`Schnittwinkel`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 向量法统一立体几何（先直观猜想 → 后向量证明）

- **技法内容**：对空间位置关系，先用直观判断**猜出**结论（平行？垂直？距离沿哪条线最短？），再用向量给出**证明**：建系 → 写出方向向量与法向量 → 用线性关系证平行/共面、用 `Skalarprodukt = 0` 证垂直、用投影与法向量算距离与夹角。中国"必修用综合法先建立直观、选必用向量法重证"的两段设计，使每个结论都有"直观"与"代数"两种表述，互为校验。
- **DE-Anschluss**：Q1 的 `Skalarprodukt`、`Ebenen`（Parameter-/Koordinatenform）、`Normalenvektor`、`Schnittwinkel`、`LGS` [已验证]；EF 的 `Lagebeziehung von Geraden`（identisch/parallel/windschief/schneidend）[已验证]。
- **合规性**：⚠️ 需注意 —— 本项目**只取"向量证法 + 先猜后证的节奏"**；中国的综合几何公理体系（基本事实、判定/性质定理链、三视图）属 **CN-only 知识板块，明确不引入**。
- **Abitur 应用**：Q1/Q2 几何题的标准 AFB II 链条（"Begründen Sie" 的高频答法）；`Schnittwinkel` 与后续 `Abstände` 直接受益。
- **来源**：`[CN-课标]` 空间向量与立体几何（法向量、方向向量）· `[CN-教材]` 建系—设向量—列方程三段程序 · `[CN-高考]` 空间角综合题

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | 工具题（2. Prüfungsteil）为主；免工具段出小规模点积/正交判定 [据推断] |
| Operator | `berechnen` / `nachweisen` / `bestimmen` / `untersuchen`（数学不按动词分 AFB）[已验证] |
| AFB | II 为主；法向量构造与分类论证可到 III [据推断] |
| 建议分值 / 时长 | 大题 15–25 BE；免工具小问 3–5 BE [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`
> Gegeben sind $\vec{a}=\begin{pmatrix}2\\-1\\3\end{pmatrix}$ und $\vec{b}=\begin{pmatrix}1\\4\\2\end{pmatrix}$.
> a) Berechnen Sie $\vec{a}\cdot\vec{b}$ und $|\vec{a}|$.
> b) Untersuchen Sie, ob $\vec{a}$ und $\vec{b}$ orthogonal sind.
> c) Bestimmen Sie den Winkel zwischen $\vec{a}$ und $\vec{b}$.

**Aufgabe 2** `[NRW-改编]`
> Gegeben sind die Punkte $A(1|0|2)$, $B(3|2|1)$ und $C(2|3|4)$.
> a) Bestimmen Sie eine Parameterform der Ebene $E$ durch $A$, $B$ und $C$.
> b) Ermitteln Sie eine Koordinatenform von $E$.
> c) Prüfen Sie, ob der Punkt $D(0|2|3)$ in $E$ liegt.

**Aufgabe 3** `[原创]`
> Gegeben ist die Gerade $g:\vec{x}=\begin{pmatrix}1\\1\\0\end{pmatrix}+t\begin{pmatrix}1\\0\\2\end{pmatrix}$ und die Ebene $E:2x-y+2z=6$.
> Untersuchen Sie die Lage von $g$ und $E$ und berechnen Sie gegebenenfalls den Schnittpunkt.

**Aufgabe 4** `[原创]`（LK，AFB III）
> Begründen Sie, dass ein Normalenvektor $\vec{n}$ einer Ebene mit Richtungsvektoren $\vec{u},\vec{v}$ eindeutig bis auf einen skalaren Faktor bestimmt ist, und geben Sie eine Normalenform der Ebene durch $P(1|2|3)$ mit $\vec{n}=\begin{pmatrix}1\\-1\\2\end{pmatrix}$ an.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Skalarprodukt**: $\vec{a}\cdot\vec{b}=2\cdot1+(-1)\cdot4+3\cdot2=2-4+6=4$ ✓
2. **Betrag**: $|\vec{a}|=\sqrt{2^2+(-1)^2+3^2}=\sqrt{14}$ ✓ 得分点：写 $\sqrt{\vec a\cdot\vec a}$
3. **Orthogonalität**: Da $\vec{a}\cdot\vec{b}=4\neq 0$, sind $\vec{a}$ und $\vec{b}$ **nicht** orthogonal. ✓
4. **Winkel**: $\cos\varphi=\frac{4}{\sqrt{14}\cdot\sqrt{21}}=\frac{4}{\sqrt{294}}\approx 0{,}2333 \Rightarrow \varphi\approx 76{,}5^\circ$ ✓ 得分点：写出公式再算

**Aufgabe 2**
1. **Richtungsvektoren**: $\vec{AB}=\begin{pmatrix}2\\2\\-1\end{pmatrix}$, $\vec{AC}=\begin{pmatrix}1\\3\\2\end{pmatrix}$; nicht kollinear ✓
2. **Parameterform**: $E:\vec{x}=\begin{pmatrix}1\\0\\2\end{pmatrix}+s\begin{pmatrix}2\\2\\-1\end{pmatrix}+t\begin{pmatrix}1\\3\\2\end{pmatrix}$ ✓ 得分点：支点 + 两方向向量
3. **Normalenvektor**: $\vec{n}=(a,b,c)$ mit $2a+2b-c=0$ und $a+3b+2c=0$. Aus der ersten Gleichung $c=2a+2b$; eingesetzt in die zweite: $a+3b+2(2a+2b)=0\Rightarrow 5a+7b=0$. Wähle $b=-5$, dann $a=7$ und $c=4$, also $\vec{n}=\begin{pmatrix}7\\-5\\4\end{pmatrix}$ ✓ 得分点：给出满足两正交条件的 $\vec n$
4. **d**: $d=\vec{n}\cdot\vec{OA}=7\cdot1+(-5)\cdot0+4\cdot2=15$ ⇒ $E:7x-5y+4z=15$ ✓
5. **Punktprobe D**: $7\cdot0-5\cdot2+4\cdot3=-10+12=2\neq 15$ ⇒ $D\notin E$ ✓ 得分点：代入并给结论

**Aufgabe 3**
1. **Einsetzen**: $2(1+t)-1+2(2t)=6 \Rightarrow 2+2t-1+4t=6$ ✓ 得分点：直线代入平面
2. **Lösen**: $6t+1=6\Rightarrow t=\frac56$ ⇒ genau eine Lösung, also **schneidet** $g$ die Ebene $E$ ✓
3. **Schnittpunkt**: $\vec{x}=\begin{pmatrix}1\\1\\0\end{pmatrix}+\frac56\begin{pmatrix}1\\0\\2\end{pmatrix}=\begin{pmatrix}11/6\\1\\5/3\end{pmatrix}$ ✓ 得分点：回代求坐标

**Aufgabe 4**（LK）
1. **Eindeutigkeit**: Jeder Vektor, der zu $\vec{u}$ und $\vec{v}$ orthogonal ist, liegt im orthogonalen Komplement der von $\vec{u},\vec{v}$ aufgespannten Ebene. Da $\vec{u},\vec{v}$ linear unabhängig sind, ist dieses Komplement **eindimensional**, also von einem einzigen Vektor (bis auf Faktor) erzeugt. ✓ 得分点：论证维度
2. **Normalenform**: $(\vec{x}-\vec{p})\cdot\vec{n}=0$ mit $\vec{p}=\begin{pmatrix}1\\2\\3\end{pmatrix}$ ⇒ $(x-1)\cdot1+(y-2)\cdot(-1)+(z-3)\cdot2=0$ ✓
3. **Vereinfacht**: $x-y+2z=5$ ✓ 得分点：化简形式

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 线面角忘记取余角（直接用方向向量与法向量的夹角） | 记"线面用 $\sin$"口诀，方法 C 第 4 步 |
| 知识错 | 坐标分量乘错行；把 $\vec{a}\cdot\vec{b}=0$ 只当算式不当正交条件 | 逐项对齐分量 |
| 表达错 | 求法向量时不说明选取过程，只写结果 → 丢过程分 | 写出 $\vec{n}\cdot\vec u=0,\vec n\cdot\vec v=0$ 两式 |
| 表达错 | `d` 的符号写错（用 $\vec{n}\cdot\vec p=d$，注意支点选取） | 支点固定后统一代入 |

---

## 7. Vernetzung

- **上游**：`MA-G1-*` 向量基础 · `MA-G2-*` 直线参数式与位置关系 · `MA-G3-01` 数量积计算与几何解释
- **下游**：`MA-G3-02` 正交性 · `MA-G3-03` 夹角 · `MA-G4-01` 平面参数式 · `MA-G4-02` 坐标形式与法向量 · `MA-G4-03` 法向式（LK）· `MA-G5-01` 线面交点 · `MA-G5-03` 距离全组合（LK）
- **横向**：物理（力的分解、功 $W=\vec F\cdot\vec s$）· 与 `Basis-und-Linearkombination` 的"线性组合唯一性"直接相接
- **术语卡**：`Skalarprodukt` / `Orthogonalität` / `Normalenvektor` / `Koordinatenform` / `Normalenform` / `Schnittwinkel`（建议由主线程补入 Q1 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编，解析为原创。不搬运出版社教辅原文。
