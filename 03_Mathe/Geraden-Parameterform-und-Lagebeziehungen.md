---
fach: Mathe
thema: "Geraden in Parameterform und Lagebeziehungen"
operatoren: [angeben, bestimmen, beschreiben, untersuchen, entscheiden, begruenden, berechnen, skizzieren]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Mathe, Geometrie]
stufe: "EF"
---

# Geraden in Parameterform und Lagebeziehungen (直线参数式与四种位置关系)

> **中文理解**：一条直线 = **一个定点（支点向量 $\vec{p}$）+ 一个方向（方向向量 $\vec{u}$）**，写成 $\vec{x}=\vec{p}+t\vec{u}$，$t\in\mathbb{R}$。这是 EF 唯一的直线表示法——**没有斜率、没有点斜式**。
> 判断点是否在直线上，就是把该点代入参数方程，看**三行能否给出同一个 $t$**。
> 两条直线的关系只有**四种**：`identisch`（重合）/ `parallel`（平行）/ `sich schneidend`（相交）/ `windschief`（异面）。判定顺序是**先看方向向量是否共线**，再决定要不要联立求交 [已验证]。
> `windschief`（异面）是空间几何里**平面几何没有**的新情况，也是 EF 必学分类项 [已验证]。
>
> **Klausur-Relevanz**：免工具段必考「两点求直线 / 点检验」；`Lagebeziehung untersuchen und begründen` 是 EF-G 的标准 AFB II 分类题，且必须与 LGS 解集**互译**（KLP 明文要求）[已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Parameterform der Gerade | 直线参数式 | parametric form of a line | $\vec{x}=\vec{p}+t\vec{u}$，$t\in\mathbb{R}$ | EF 唯一表示 [已验证] |
| Stützvektor / Aufpunkt | 支点向量 / 支点 | position vector / anchor point | $\vec{p}$，直线上一个已知点 | 也叫 Aufpunkt [已验证] |
| Richtungsvektor | 方向向量 | direction vector | $\vec{u}$，决定直线的走向 | 长度可任取，只定方向 |
| Parameter | 参数 | parameter | $t$，每个 $t$ 对应直线上一个点 | $t$ 是「走了多少个 $\vec{u}$」 |
| Punktprobe | 点检验 | point test | 代入三行，看 $t$ 是否一致 | 区分 parallel/identisch 的关键 |
| identisch | 重合 | identical / coincident | 方向共线 **且** 一支点满足对方方程 | 无穷多交点 |
| parallel | 平行 | parallel | 方向共线，但支点不满足对方方程 | 无交点 |
| sich schneidend | 相交 | intersecting | 方向不共线，联立有唯一解 | 一个交点 |
| windschief | 异面（交错） | skew | 方向不共线，联立无解 | 空间独有 [已验证] |
| Schnittpunkt | 交点 | intersection point | 联立两条参数式得到的解点 | 须回代 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 直线的三种给法，一条参数式

| 题目给什么 | 做法 |
|---|---|
| 两点 $A,B$ | 取 $\vec{p}=\vec{OA}$，$\vec{u}=\vec{AB}=\vec{OB}-\vec{OA}$ |
| 一点 $A$ + 方向 $\vec{u}$ | 直接写 $\vec{x}=\vec{OA}+t\vec{u}$ |
| 一点 $A$ + 一条平行直线 $\vec{x}=\vec{q}+s\vec{v}$ | 取 $\vec{p}=\vec{OA}$，$\vec{u}=\vec{v}$（方向相同即可） |

> *Klausur-Satz*: Eine Gerade wird durch einen Aufpunkt und einen Richtungsvektor festgelegt: $\vec{x}=\vec{p}+t\vec{u}$ mit $t\in\mathbb{R}$.

### 2.2 点检验：三行必须给同一个 $t$

把点 $P$ 的坐标代入，得到三个方程 $p_1+tu_1=x_P$、$p_2+tu_2=y_P$、$p_3+tu_3=z_P$。

- 三行解出**同一个 $t$** → $P$ 在直线上
- 出现**矛盾**（如一行 $t=2$、另一行 $t=3$）→ $P$ 不在直线上

> ⚠️ 只算两行就下结论是高频失分点；**三维必须三行全算**。

> *Klausur-Satz*: Ein Punkt liegt genau dann auf der Geraden, wenn alle drei Gleichungen denselben Parameterwert $t$ liefern.

### 2.3 四种位置关系：判定流程（本节核心）

```
两直线 g: x = p + t·u,  h: x = q + s·v
        │
        ▼
① 方向向量 u, v 是否共线？
        │
   ┌────┴────┐
  是          否
   │           │
   ▼           ▼
② 点检验：p 是否在 h 上？     ③ 联立解 LGS
   │              │
 ┌─┴─┐        ┌───┴───┐
是    否      唯一解    无解
 │     │        │        │
 ▼     ▼        ▼        ▼
identisch parallel  schneidend  windschief
```

> ⚠️ **顺序不能颠倒**：若先联立，遇到「方向共线但支点不同」时会得到「无解」，容易误判成 `windschief`。**必须先判方向**——这正是本项目预判的头号辨别错 [据推断]。

> *Klausur-Satz*: Zwei Geraden sind genau dann parallel (bzw. identisch), wenn ihre Richtungsvektoren kollinear sind; anschließend entscheidet eine Punktprobe, ob sie identisch oder echt parallel sind. Sind die Richtungsvektoren nicht kollinear, so sind die Geraden entweder schneidend (genau eine Lösung) oder windschief (keine Lösung).

### 2.4 与 LGS 解集的互译（KLP 明文要求）

| 联立后的解集 | 几何含义 |
|---|---|
| 唯一解 | 两直线**相交**（交点为该解） |
| 无解 | 两直线**平行** 或 **异面**（用方向向量区分） |
| 无穷多解 | 两直线**重合** |

> *Klausur-Satz*: Die Lösungsmenge des linearen Gleichungssystems entspricht der Lagebeziehung der Geraden: genau eine Lösung bedeutet einen Schnittpunkt, keine Lösung bedeutet parallel oder windschief, unendlich viele Lösungen bedeuten identisch.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：两点式列直线（三步）

1. **选支点** $\vec{p}=\vec{OA}$ —— *KLP 工具：`Ortsvektor`*
2. **算方向** $\vec{u}=\vec{OB}-\vec{OA}$ —— *KLP 工具：`Addition`/`Vektor`*
3. **写出参数式** $\vec{x}=\vec{p}+t\vec{u}$ —— *KLP 工具：`Parameterform`*

> **判据 / 决策点**：用 $A$ 还是 $B$ 作支点都对，但支点不同则同一个点的参数值不同；**参数字母不要与点名冲突**（点 $P$ 就别用 $p$ 当参数）。

### 3.2 方法 B：点检验（三行联立）

1. 把点的坐标代入参数式，逐行解 $t$ —— *KLP 工具：`LGS`*
2. **三行都算**，列成一张小表 —— *KLP 工具：`Punktprobe`*
3. 若三行 $t$ 一致 → 在直线上；否则 → 不在 —— *KLP 工具：`untersuchen` 必须呈示过程*

> **判据 / 决策点**：题目出现「prüfen / untersuchen, ob der Punkt auf der Geraden liegt」时用此法。

### 3.3 方法 C：位置关系判定（严格按 2.3 流程图）

1. **验共线**：是否存在 $k$ 使 $\vec{v}=k\vec{u}$ —— *KLP 工具：`Kollinearität`*
2. 若共线 → 做**点检验**（$\vec{p}$ 是否在 $h$ 上）→ `identisch` 或 `parallel` —— *KLP 工具：`Punktprobe`*
3. 若不共线 → **联立**两条参数式，解 ≤3 未知数 LGS —— *KLP 工具：`LGS`*
4. 唯一解 → `schneidend`（回代求交点坐标）；无解 → `windschief` —— *KLP 工具：`Lösungsmenge`*

> **判据 / 决策点**：**第 1 步永远先做**。三维直线联立后是无解还是无穷多解，都要回到方向向量共线性来解释。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 位置关系的「先判方向、后解方程」两步节奏

- **技法内容**：中国在空间向量里把直线位置关系固定成一套判定顺序：**① 先看方向向量是否共线 → ② 共线者再代点区分平行/重合 → ③ 不共线者联立求交，无解即异面**。整套流程做成「判定清单」，避免一上来就联立。此外中国强调「联立 → 消元」这一步的机械化，正好对应德国的 `LGS` 无工具解法。
- **DE-Anschluss**：EF 已教 `Parameterform`、`Punktprobe`、四种 `Lagebeziehung`（含 `windschief`）、`Schnittpunkte` 与 `LGS` 解集互译 [已验证]；德国 KLP 明文要求「须解线性方程组并与直线位置关系的解集**互译**」[已验证]。本技法**只是把德国已有的零散动作排成固定顺序**，不含新知识。
- **合规性**：✅ 完全合规 —— 判定顺序所用工具（`Kollinearität` + `Punktprobe` + `LGS`）全部在 EF 范围内。⚠️ 注意：中国平面几何的**斜率体系**（点斜式/一般式）属 CN-only，**不引入**，因为德国 EF 只用参数式 [已验证]。
- **Abitur 应用**：EF 的分类题（`Lagebeziehung untersuchen und begründen`，AFB II）；也是 Q1 线面位置关系（`MA-G5-01`）的直接前置 [据推断]。
- **来源**：`[CN-课标]` 空间向量与立体几何（方向向量、线线位置关系）· `[CN-教材]` 判定清单 · `[CN-高考]` 空间位置关系综合题

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I（免工具）计算小问 + Aufgabenart II 分类大题 [据推断] |
| Operator | `angeben` / `untersuchen` / `entscheiden` / `begruenden` / `berechnen`（数学不按动词分 AFB）[已验证] |
| AFB | I（列式/点检验）→ II（位置关系分类与论证）[据推断] |
| 建议分值 / 时长 | 位置关系判定子题 5–8 BE / 约 8–12 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`（两点式 + 点检验）
> Gegeben sind die Punkte $A(1\,|\,0\,|\,2)$ und $B(3\,|\,4\,|\,0)$.
> a) Geben Sie eine Gleichung der Geraden $g$ durch $A$ und $B$ in Parameterform an.
> b) Untersuchen Sie, ob der Punkt $P(5\,|\,8\,|\,-2)$ auf $g$ liegt.

**Aufgabe 2** `[原创]`（平行 vs 重合）
> Gegeben sind $g:\vec{x}=\begin{pmatrix}1\\2\\3\end{pmatrix}+t\begin{pmatrix}2\\-1\\4\end{pmatrix}$ und $h:\vec{x}=\begin{pmatrix}3\\1\\11\end{pmatrix}+s\begin{pmatrix}-4\\2\\-8\end{pmatrix}$.
> Untersuchen Sie die Lagebeziehung von $g$ und $h$.

**Aufgabe 3** `[NRW-改编]`（相交 + 求交点）
> Gegeben sind $g:\vec{x}=\begin{pmatrix}0\\1\\2\end{pmatrix}+t\begin{pmatrix}1\\1\\0\end{pmatrix}$ und $h:\vec{x}=\begin{pmatrix}2\\-1\\2\end{pmatrix}+s\begin{pmatrix}-1\\2\\0\end{pmatrix}$.
> Bestimmen Sie den Schnittpunkt der beiden Geraden.

**Aufgabe 4** `[NRW-改编]`（异面判定，AFB II）
> Gegeben sind $g:\vec{x}=\begin{pmatrix}1\\1\\1\end{pmatrix}+t\begin{pmatrix}1\\0\\0\end{pmatrix}$ und $h:\vec{x}=\begin{pmatrix}0\\2\\5\end{pmatrix}+s\begin{pmatrix}0\\1\\0\end{pmatrix}$.
> Begründen Sie, dass $g$ und $h$ windschief sind.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Richtungsvektor**: $\vec{AB}=\begin{pmatrix}3\\4\\0\end{pmatrix}-\begin{pmatrix}1\\0\\2\end{pmatrix}=\begin{pmatrix}2\\4\\-2\end{pmatrix}$ ✓ 得分点：终点减起点
2. **a) Gerade**: $g:\vec{x}=\begin{pmatrix}1\\0\\2\end{pmatrix}+t\begin{pmatrix}2\\4\\-2\end{pmatrix}$ ✓ 得分点：支点 + 方向向量
3. **b) Punktprobe**: $1+2t=5\Rightarrow t=2$; $0+4t=8\Rightarrow t=2$; $2-2t=-2\Rightarrow t=2$ ✓ 得分点：三行全算
4. **b) Fazit**: Alle drei Zeilen liefern $t=2$, also liegt $P$ auf $g$. ✓

**Aufgabe 2**
1. **Richtungsvektoren**: $\begin{pmatrix}-4\\2\\-8\end{pmatrix}=-2\begin{pmatrix}2\\-1\\4\end{pmatrix}$ ⇒ kollinear ✓ 得分点：显式给出倍数
2. **Also**: $g$ und $h$ sind parallel **oder** identisch; entscheidend ist die Punktprobe. ✓ 得分点：先判方向，再下「待定」结论
3. **Punktprobe** ($\vec{p}_g=\begin{pmatrix}1\\2\\3\end{pmatrix}$ in $h$): $3-4s=1\Rightarrow s=0{,}5$; $1+2s=2\Rightarrow s=0{,}5$; $11-8s=3\Rightarrow s=1$ ✗ 得分点：三行都算
4. **Fazit**: Da die Zeilen verschiedene $s$ liefern, liegt der Aufpunkt von $g$ nicht auf $h$ ⇒ $g$ und $h$ sind **echt parallel** (nicht identisch). ✓ 得分点：显式排除 identisch

**Aufgabe 3**
1. **Ansatz**: $\begin{pmatrix}0\\1\\2\end{pmatrix}+t\begin{pmatrix}1\\1\\0\end{pmatrix}=\begin{pmatrix}2\\-1\\2\end{pmatrix}+s\begin{pmatrix}-1\\2\\0\end{pmatrix}$ ✓ 得分点：写出联立
2. **LGS**: $t=2-s$; $1+t=-1+2s$; $2=2$ (dritte Zeile automatisch erfüllt) ✓
3. **Lösen**: Einsetzen: $1+(2-s)=-1+2s\Rightarrow 3-s=-1+2s\Rightarrow 4=3s\Rightarrow s=\tfrac43$, dann $t=2-\tfrac43=\tfrac23$ ✓
4. **Schnittpunkt**: Einsetzen in $g$: $\vec{x}=\begin{pmatrix}0\\1\\2\end{pmatrix}+\tfrac23\begin{pmatrix}1\\1\\0\end{pmatrix}=\begin{pmatrix}\tfrac23\\\tfrac53\\2\end{pmatrix}$ ⇒ $S\left(\tfrac23\,\middle|\,\tfrac53\,\middle|\,2\right)$ ✓ 得分点：回代得坐标
5. **Kontrolle**: Einsetzen in $h$ liefert dasselbe Ergebnis ⇒ die Geraden sind **schneidend**. ✓

**Aufgabe 4**
1. **Richtungsvektoren**: $\begin{pmatrix}1\\0\\0\end{pmatrix}$ und $\begin{pmatrix}0\\1\\0\end{pmatrix}$ sind **nicht kollinear** (kein $k$ erfüllt $k\cdot1=0$ und $k\cdot0=1$ gleichzeitig) ✓ 得分点：显式给矛盾
2. **Also**: nicht parallel/identisch ⇒ nur `schneidend` oder `windschief` möglich. ✓
3. **LGS**: $1+t=0$; $1=2+s$; $1=5$ (dritte Zeile) ✓
4. **Widerspruch**: Die dritte Zeile $1=5$ ist ein Widerspruch, also ist das LGS **unlösbar** — die Geraden schneiden sich nicht. ✓ 得分点：指出矛盾行
5. **Fazit**: Da die Richtungsvektoren nicht kollinear sind und es keine Lösung gibt, sind $g$ und $h$ **windschief**. ✓ 得分点：两句条件同时满足才可判异面

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 只判方向向量共线就写 `parallel`，漏掉 `identisch` 的可能 | 共线后**必做点检验**（方法 C 第 2 步） |
| 辨别错 | 联立得到无解就直接写 `windschief`，未先排除平行 | **先判方向再联立**；无解须结合方向向量解释 |
| 知识错 | 点检验只算两行就下结论；两直线求交只解两行不回代 | 三维一律**三行全算**；求交点后**回代另一条直线验算** |
| 表达错 | 只写「两直线平行」不给判定依据 → 违反 `begruenden` 的「必须呈示过程」[已验证] | 写出方向向量的倍数关系 + 点检验的 $s$ 值 |
| 表达错 | 参数字母与点名冲突（点 $P$ 用参数 $p$） | 参数统一用 $t,s$ 或 $r,s$ |

---

## 7. Vernetzung

- **上游**：`MA-G1-01`–`MA-G1-03` 向量基础（[`Vektor-Grundlagen-EF.md`](Vektor-Grundlagen-EF.md)）· `MA-G1-04` 基底与线性组合（[`Basis-und-Linearkombination.md`](Basis-und-Linearkombination.md)）
- **下游**：`MA-G6-01` LGS 算法化解法 · `MA-G6-02` 解集与位置关系互译 · `MA-G5-01` 线面交点（Q1）
- **横向**：Q1 `Skalarprodukt`（夹角与正交判定）；物理（运动轨迹相交/追及问题）
- **术语卡**：`Parameterform` / `Stützvektor` / `Richtungsvektor` / `Punktprobe` / `identisch` / `parallel` / `windschief` / `Schnittpunkt`（建议由主线程补入 `Vokabeln-Anki/Mathe-EF-Basis.csv`）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
