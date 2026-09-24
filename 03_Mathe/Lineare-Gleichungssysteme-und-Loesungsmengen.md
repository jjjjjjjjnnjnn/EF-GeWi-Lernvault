---
fach: Mathe
thema: "Lineare Gleichungssysteme und Lösungsmengen"
operatoren: [berechnen, bestimmen, beschreiben, untersuchen, begruenden, deuten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Mathe, Geometrie]
stufe: "Q1"
---

# Lineare Gleichungssysteme und Lösungsmengen (线性方程组与解集几何)

> **中文理解**：LGS 是「用代数工具处理几何位置关系」的枢纽。NRW KLP 在 **Inhaltsfeld G** 里明文要求两件事：① 说明线性方程组的**算法化解法**，并**无数字工具**解「最多三个未知数、计算量小」的方程组；② 把解集与直线/平面的位置关系**互译** [已验证]。
> LK 再追加 `Interpretation der Lösungsmenge`：须解释解集的**几何含义**（一点 / 一条直线 / 一张平面 / 空集）[已验证]。
> 它是 Q1-G 的收口节点，也是 Abitur 免工具段的常客。
>
> **Klausur-Relevanz**：Aufgabenart I 手算 ≤3 未知数（AFB I–II）；Aufgabenart II 的「代数解 ⇄ 几何结论」双向翻译（AFB II–III）[据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Lineares Gleichungssystem (LGS) | 线性方程组 | system of linear equations | $a_1x+b_1y+c_1z=d_1$ 等若干条 | 每条是一个平面/直线方程 |
| Lösungsmenge $\mathbb{L}$ | 解集 | solution set | 所有满足全部方程的 $(x,y,z)$ | 可能是点/线/面/空集 [已验证] |
| Gauß-Algorithmus | 高斯消元 | Gaussian elimination | 行变换化为阶梯形 | 算法化解法核心 |
| Stufenform | 阶梯形 | row echelon form | 逐列消元后的三角结构 | 便于回代 |
| Äquivalenzumformung | 等价变换 | equivalent transformation | 交换/数乘/相加行 | 不改变解集 |
| Eindeutige Lösung | 唯一解 | unique solution | 阶梯形每列主元齐备 | ⇄ 对象相交于一点 |
| Keine Lösung | 无解 | no solution | 出现 $0=1$ 型矛盾行 | ⇄ 平行/异面 |
| Unendlich viele Lösungen | 无穷多解 | infinitely many solutions | 出现 $0=0$ 行，有自由参数 | ⇄ 重合/落在平面内 |
| Parameterform der Lösungsmenge | 解集的参数式 | parametric form of solution set | 用自由参数写出全部解 | LK 解释几何含义用 |

> 条目来源：KLP G 能力点 (7)(8)(12)（算法化解法、无工具 ≤3 未知数、解集互译）[已验证]；LK `Interpretation der Lösungsmenge` [已验证]；节点 `MA-G6-01/02/03`。

---

## 2. 知识结构 (Struktur)

### 2.1 三类解集 ⇄ 三类几何位置（九宫格核心）

| 解集类型 | 代数特征 | 几何含义（直线语境） | 几何含义（平面语境） |
|---|---|---|---|
| 唯一解 | 每列主元齐备 | 两直线**相交**于一点 | 三平面交于一点 |
| 无解 | 出现 $0=1$ 矛盾行 | **平行**或**异面** | 平行或构成棱柱状 |
| 无穷多解 | 出现 $0=0$，有自由参数 | **重合**（同一直线） | 交于一条直线/整张平面 |

> 中文理解：代数上「解的情况」与几何上「位置关系」是同一件事的两种说法。答题时必须**两边都说**。

> *Klausur-Satz*: Ein LGS hat genau dann keine Lösung, wenn bei der Umformung eine widersprüchliche Zeile $0=1$ entsteht; dann sind die zugehörigen Geraden parallel oder windschief.

### 2.2 算法化解法（Gauß）的规范动作

1. 写成增广形式（系数 + 右端常数）
2. 选主元列，用行变换把该列下方元素消为 0
3. 逐列推进，得到阶梯形
4. 判断：主元数 = 未知数数 ⇒ 唯一解；出现矛盾行 ⇒ 无解；主元数 < 未知数数 ⇒ 无穷多解
5. 回代（或引入自由参数）写出解集

> *Klausur-Satz*: Beim Gauß-Algorithmus formt man das System durch Zeilenumformungen in Stufenform um und liest daran die Anzahl der Lösungen ab.

### 2.3 免工具段的边界

- **最多三个未知数**、**系数与常数保持小整数**是官方设定 [已验证]
- 手算目标：2–3 步消元内得到阶梯形
- 免工具段**不允许**依赖 CAS 解方程

> *Klausur-Satz*: Lineare Gleichungssysteme mit höchstens drei Unbekannten sind ohne digitale Hilfsmittel zu lösen.

### 2.4 LK：解集的几何解释（`MA-G6-03`）

求出解后**必须再走一步**：把解集写成参数式，并说明它代表**一点 / 一条直线 / 一张平面 / 空集**。

> *Klausur-Satz*: Die Lösungsmenge ist als Punkt, Gerade, Ebene oder leere Menge zu interpretieren und in Parameterform anzugeben.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：Gauß 消元标准流程（手算）

1. **写增广矩阵**，标记每列对应变量 —— *KLP 工具：`LGS-Darstellung`*
2. **选主元**（取系数最简单的行做基准）—— *KLP 工具：`Äquivalenzumformung`*
3. **消元**：把主元列下方化为 0 —— *KLP 工具：`Zeilenumformung`*
4. **得阶梯形**，逐行判断 —— *KLP 工具：`Stufenform`*
5. **回代**求全部未知数 —— *KLP 工具：`Einsetzverfahren`*

> **判据 / 决策点**：为避免分数，优先选系数为 1 或 −1 的行作主元行。

### 3.2 方法 B：解集分类判定（三步）

1. 化为阶梯形 —— *KLP 工具：`Gauß-Algorithmus`*
2. 数**主元个数** $r$ 与**未知数个数** $n$ —— *KLP 工具：`Rang`（概念层）*
3. 判：$r=n$ 唯一解；矛盾行 ⇒ 无解；$r<n$ ⇒ 无穷多解，令 $n-r$ 个自由参数 —— *KLP 工具：`Fallunterscheidung`*

> **判据 / 决策点**：先看有没有矛盾行（最优先），再比主元数与未知数数。

### 3.3 方法 C：解集 ⇄ 几何位置关系互译

1. 把几何对象（直线/平面）写成方程组 —— *KLP 工具：`Parameterform`*
2. 联立求解 —— *KLP 工具：`LGS`*
3. 由解的情况反推位置关系（用 2.1 表）—— *KLP 工具：`Lagebeziehung`*
4. **用几何语言写出结论句** —— *KLP 工具：`begruenden`*

> **判据 / 决策点**：几何结论必须与代数结果**同时出现**，只说「无穷多解」不说明几何含义会丢分 [据推断]。

### 3.4 方法 D：解集参数式（LK）

1. 把自由变量设为参数 $t$（或 $s,t$）—— *KLP 工具：`Parameter`*
2. 其余变量用参数表示 —— *KLP 工具：`Einsetzen`*
3. 整理成「定点 + 参数 × 方向向量」形式 —— *KLP 工具：`Parameterform`*
4. 读出几何对象类型 —— *KLP 工具：`Interpretation der Lösungsmenge`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 高斯消元 + 解的情况分类讨论

- **技法内容**：中国把线性方程组固定为「**消元—回代**」程序，并配套一套**解的情况分类讨论**：化为阶梯形后，比较「有效方程个数」与「未知数个数」——相等则唯一解，方程多于有效个数且出现 $0=\text{非零}$ 则无解，有效方程少于未知数则无穷多解（引入自由参数）。同时强调**每一步行变换必须写出**，禁止跳步心算。
- **DE-Anschluss**：KLP G 明文要求 `algorithmisches Lösen` 与**无工具解 ≤3 未知数** [已验证]；解集与位置关系互译也是 KLP 明文要求 [已验证]；LK 的 `Interpretation der Lösungsmenge` 与中国的「几何意义讨论」高度对应 [已验证]。
- **合规性**：✅ 完全合规 —— 中国侧的三元高斯消元主要在选修 A 类（非高考），但**方法本身**与德国要求完全一致；本卡**只取消元程序与解的分类逻辑**，不引入行列式/克拉默法则等德国 KLP 未列的算法。
- **Abitur 应用**：免工具段手算（AFB I–II）；几何题的「代数解 ⇄ 几何结论」翻译（AFB II）；LK 末段解集几何解释（AFB III）[据推断]。
- **来源**：`[CN-课标]` 从函数观点看方程与不等式、二元一次方程组 · `[CN-教材]` 加减消元与代入消元 · `[CN-高考]`（本卡为方法层，未取具体题）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I（无工具 ≤3 未知数）与 II（位置关系互译）皆可 [据推断] |
| Operator | `berechnen` / `bestimmen` / `untersuchen` / `begruenden` / `deuten` [已验证] |
| AFB | I–II（算法与分类）→ III（解集几何解释，LK）[据推断] |
| 建议分值 / 时长 | 6–10 BE / 约 8–15 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Lösen Sie das folgende lineare Gleichungssystem ohne Hilfsmittel und geben Sie die Lösungsmenge an:
> $$\begin{aligned} x+y+z&=6\\ 2x-y+z&=3\\ x+2y-z&=2 \end{aligned}$$

**Aufgabe 2** `[原创]`
> Untersuchen Sie, für welche Werte von $a\in\mathbb{R}$ das System
> $$\begin{aligned} x+y&=3\\ 2x+2y&=a \end{aligned}$$
> keine Lösung, genau eine Lösung bzw. unendlich viele Lösungen besitzt. Interpretieren Sie die Ergebnisse geometrisch.

**Aufgabe 3** `[NRW-改编]`
> Gegeben sind die Geraden $g:\vec{x}=\begin{pmatrix}1\\2\\3\end{pmatrix}+t\begin{pmatrix}1\\1\\1\end{pmatrix}$ und $h:\vec{x}=\begin{pmatrix}0\\1\\2\end{pmatrix}+s\begin{pmatrix}2\\2\\2\end{pmatrix}$.
> Untersuchen Sie die Lagebeziehung von $g$ und $h$ mit Hilfe eines linearen Gleichungssystems.

**Aufgabe 4** `[原创]`（LK）
> Das LGS
> $$\begin{aligned} x+y+z&=4\\ 2x+2y+2z&=8\\ x-y+z&=0 \end{aligned}$$
> besitzt unendlich viele Lösungen. Geben Sie die Lösungsmenge in Parameterform an und interpretieren Sie sie geometrisch.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Elimination von $x$**: $II-2I$: $(2x-y+z)-2(x+y+z)=3-12\Rightarrow -3y-z=-9$; $III-I$: $(x+2y-z)-(x+y+z)=2-6\Rightarrow y-2z=-4$ ✓ 得分点：写出消元步骤
2. **Zwischensystem**: $\begin{cases}-3y-z=-9\\ y-2z=-4\end{cases}$ ✓
3. **Elimination von $y$**: 由第二式 $y=2z-4$ 代入第一式: $-3(2z-4)-z=-9\Rightarrow -7z+12=-9\Rightarrow z=3$ ✓
4. **Rücksubstitution**: $y=2\cdot3-4=2$; $x=6-y-z=6-2-3=1$ ✓ 得分点：回代
5. **Lösungsmenge**: $\mathbb{L}=\{(1\mid2\mid3)\}$ — genau eine Lösung, also schneiden sich die drei Ebenen in einem Punkt. ✓ 得分点：解集 + 几何含义

**Aufgabe 2**
1. **Umformung**: $II-2I$: $0=a-6$ ✓ 得分点：消元
2. **Fall 1**: Ist $a\neq6$, so entsteht die widersprüchliche Zeile $0=a-6\neq0$ ⇒ **keine Lösung** ⇒ die beiden Geraden sind **parallel und verschieden**. ✓
3. **Fall 2**: Ist $a=6$, so lautet die zweite Zeile $0=0$ ⇒ nur eine wirksame Gleichung für zwei Unbekannte ⇒ **unendlich viele Lösungen**: $y=3-x$, also $\mathbb{L}=\{(x\mid3-x)\mid x\in\mathbb{R}\}$ ⇒ die Geraden sind **identisch**. ✓ 得分点：分类 + 几何
4. **Fazit**: Genau eine Lösung tritt **nie** auf, da beide Gleichungen dieselbe linke Seite haben. ✓ 得分点：结论

**Aufgabe 3**
1. **Ansatz (Punktprobe)**: Gleichsetzen: $\begin{pmatrix}1\\2\\3\end{pmatrix}+t\begin{pmatrix}1\\1\\1\end{pmatrix}=\begin{pmatrix}0\\1\\2\end{pmatrix}+s\begin{pmatrix}2\\2\\2\end{pmatrix}$ ✓
2. **Komponenten**: $1+t=2s$, $2+t=1+2s$, $3+t=2+2s$ ✓ 得分点：三行方程
3. **Aus I und II**: $(2+t)-(1+t)=(1+2s)-2s\Rightarrow1=1$ (immer wahr) ⇒ die ersten beiden Zeilen liefern keine Einschränkung ✓
4. **Richtungen**: $\begin{pmatrix}1\\1\\1\end{pmatrix}$ und $\begin{pmatrix}2\\2\\2\end{pmatrix}$ sind **kollinear** (Faktor 2) ⇒ $g$ und $h$ sind parallel oder identisch. ✓ 得分点：共线判定
5. **Punktprobe**: Setze $t=0$ in $g$: Punkt $(1\mid2\mid3)$; prüfe in $h$: $3+t=2+2s$ mit $t=0$ liefert $s=0{,}5$, dann $2+t=1+2s\Rightarrow2=2$ ✓, aber $1+t=2s\Rightarrow1=1$ ✓. Also liegt $(1\mid2\mid3)$ auf $h$ ⇒ **identisch**. ✓ 得分点：区分平行/重合
6. **Fazit**: $g$ und $h$ sind identisch; $\mathbb{L}$ ist die gesamte Gerade. ✓

**Aufgabe 4**（LK）
1. **Umformung**: $II-2I$: $0=0$ ⇒ nur zwei unabhängige Gleichungen ✓
2. **Reduziertes System**: $x+y+z=4$ und $x-y+z=0$ ✓
3. **Subtraktion**: $(x+y+z)-(x-y+z)=4-0\Rightarrow2y=4\Rightarrow y=2$ ✓ 得分点：消元
4. **Freier Parameter**: $x+z=2$, setze $z=t$ ⇒ $x=2-t$ ✓
5. **Lösungsmenge**: $\mathbb{L}=\left\{\begin{pmatrix}2\\2\\0\end{pmatrix}+t\begin{pmatrix}-1\\0\\1\end{pmatrix}\ \middle|\ t\in\mathbb{R}\right\}$ ✓ 得分点：参数式
6. **Interpretation**: Die Lösungsmenge ist eine **Gerade** im Raum (Schnittgerade der beiden Ebenen), nicht ein einzelner Punkt. ✓ 得分点：几何解释（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「无解」一律说成「异面」 | 先判方向向量是否共线：共线→平行/重合，不共线且无解→异面 |
| 知识错 | 消元时行变换符号错，导致后续全错 | 每步写出完整行变换式 |
| 知识错 | 出现 $0=0$ 后仍强行求唯一解 | 方法 B 步骤 3：判自由参数个数 |
| 表达错 | 只给数值解，不写解集 $\mathbb{L}$ 与几何含义 | 方法 3.3：代数 + 几何两句都要写 |
| 表达错 | LK 解集不写参数式 → 拿不到 AFB III | 方法 D 四步 |

---

## 7. Vernetzung

- **上游**：`MA-G2-04/05` 直线位置关系与交点（[`Geraden-Parameterform-und-Lagebeziehungen.md`](Geraden-Parameterform-und-Lagebeziehungen.md)）· `MA-G4` Ebenen（[`Skalarprodukt-und-Ebenen.md`](Skalarprodukt-und-Ebenen.md)）
- **下游**：`MA-G5-01` 线面交点 · `MA-G5-02` 位置关系系统研究（LK）· `MA-G5-03` Abstände（[`Vektor-Methode-Raumlagebeziehungen.md`](Vektor-Methode-Raumlagebeziehungen.md)）
- **横向**：`MA-A6-03` Steckbriefaufgaben（[`Steckbriefaufgaben-und-Funktionsanpassung.md`](Steckbriefaufgaben-und-Funktionsanpassung.md)）——由条件列方程组同源 · 线性代数视角（LK 参数族）
- **术语卡**：`Lösungsmenge` / `Gauß-Algorithmus` / `Stufenform` / `Lagebeziehung` / `Interpretation der Lösungsmenge`（建议由主线程补入 Q1 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
