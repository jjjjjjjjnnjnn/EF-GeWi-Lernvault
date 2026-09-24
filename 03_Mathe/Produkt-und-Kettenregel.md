---
fach: Mathe
thema: "Produkt- und Kettenregel"
operatoren: [berechnen, bestimmen, zeigen, begruenden, nachweisen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Mathe, Analysis]
stufe: "Q1"
---

# Produkt- und Kettenregel (乘积法则与链式法则 · GK/LK 分层)

> **中文理解**：EF 只会「幂 / 和 / 因子」三条规则，一进 Q1 就要用**乘积法则** $(uv)'=u'v+uv'$——这是 EF→Q1 的**第一个断层** [已验证]。
> **链式法则** $(f\circ g)'(x)=f'(g(x))\cdot g'(x)$ 是 GK/LK 的**关键分界线**：**GK 仅限「$e^x$ ∘ 线性函数」**（如 $e^{2x+1}$），**LK 才一般化**（如 $e^{-x^2}$、$\sin(3x^2)$）[已验证]。
> 两条法则都会考「**先辨别、后求导**」：拿到一个函数，先问「这是**乘积**还是**复合**？」——选错规则是 Q1 的高频辨别错 [据推断]。
> 求导必须**呈示过程**（`berechnen` 要求从 Ansatz 出发），只写结果不给分 [已验证]。
>
> **Klausur-Relevanz**：2. Prüfungsteil 的常规步骤；与 `e^x` 复合出现频率最高；免工具段也要求手算简单复合 [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Produktregel | 乘积法则 | product rule | $(u\cdot v)'=u'v+uv'$ | Q1 必用 [已验证] |
| Kettenregel | 链式法则 | chain rule | $(f\circ g)'(x)=f'(g(x))\cdot g'(x)$ | 外层导数 × 内层导数 |
| innere Funktion | 内层函数 | inner function | $g(x)$，链式法则里的「里面」 | 内层导数**必须**乘 [已验证] |
| äußere Funktion | 外层函数 | outer function | $f(u)$，链式法则里的「外面」 | 先对外层求导 |
| Verkettung | 复合 | composition | $f(g(x))$ | 与乘积 $u\cdot v$ 区分 |
| Faktorregel | 因子法则 | constant factor rule | $(c\cdot f)'=c\cdot f'$ | EF 已教，仍常用 |
| Summenregel | 和法则 | sum rule | $(f+g)'=f'+g'$ | EF 已教 |
| Potenzregel | 幂法则 | power rule | $(x^n)'=n\,x^{n-1}$ | EF 已教 |

---

## 2. 知识结构 (Struktur)

### 2.1 乘积法则：三项动作，缺一不可

$$(u\cdot v)'=\underbrace{u'\,v}_{\text{先导前}}+\underbrace{u\,v'}_{\text{前导后}}$$

**记忆口诀**：**「先导前 + 前导后」**。

- $u$、$v$ 是**两个函数相乘**，如 $x^2\cdot e^x$、$x\cdot\ln x$
- **只写 $u'v$ 是漏项**，是最常见的失分点 [据推断]
- 三项以上的乘积需要逐次使用（或推广公式），GK/LK 一般不超两项

> *Klausur-Satz*: Für zwei differenzierbare Funktionen $u$ und $v$ gilt die Produktregel $(u\cdot v)'=u'v+uv'$; beide Summanden müssen angegeben werden.

### 2.2 链式法则：外层导数 × 内层导数

$$(f(g(x)))'=f'(g(x))\cdot g'(x)$$

**记忆口诀**：**「外导（内不变）× 内导」**。

- **内层导数漏乘**是头号错误 [据推断]
- 复合的识别标志：括号里不是单纯的 $x$，而是一个**含 $x$ 的表达式**

> *Klausur-Satz*: Für eine Verkettung $f(g(x))$ lautet die Kettenregel $f'(g(x))\cdot g'(x)$; der Faktor $g'(x)$ (Ableitung der inneren Funktion) darf nicht vergessen werden.

### 2.3 GK / LK 分界线（本节核心）

| 情形 | 函数例 | GK | LK |
|---|---|---|---|
| $e^x$ 复合**线性**函数 | $e^{2x+1}$, $e^{-3x}$ | ✅ 考 | ✅ 考 |
| $e^x$ 复合**一般**函数 | $e^{-x^2}$, $e^{\sin x}$ | ❌ **超范围** | ✅ 考 |
| 三角复合 | $\sin(3x+1)$ | ❌ 不求导 | ✅ 考 |
| 对数复合 | $\ln(2x)$ | ❌ 无对数 | ✅ 考 |
| 幂函数复合 | $(2x+1)^5$ | ⚠️ 按 GK 口径仅在整有理范围内讨论 | ✅ 一般化 |

> ⚠️ **GK 学生按 LK 的一般链式做**会浪费时间且可能被判超范围；**LK 学生只按 GK 的线性链式练**则会在 $e^{-x^2}$ 处卡死。分层记忆是必须的 [已验证]。

> *Klausur-Satz*: Im Grundkurs ist die Kettenregel nur auf Verkettungen der natürlichen Exponentialfunktion mit linearen Funktionen anzuwenden; im Leistungskurs gilt sie allgemein.

### 2.4 两条法则的组合

当函数**既是乘积又是复合**时（如 $x^2\cdot e^{-x}$），**先拆乘积、再对每一因子用链式**：

$$\left(x^2\cdot e^{-x}\right)'=2x\cdot e^{-x}+x^2\cdot\left(-e^{-x}\right)=e^{-x}\left(2x-x^2\right)$$

**策略**：**先看最外层运算**——最外层是乘法就用乘积法则；是「函数套函数」就用链式法则。

> *Klausur-Satz*: Bei zusammengesetzten Funktionen entscheidet die äußerste Operation: Liegt ein Produkt vor, verwendet man die Produktregel; liegt eine Verkettung vor, die Kettenregel.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：辨别「乘积 / 复合」（先做，再算）

1. **看最外层**：是 $\times$ 还是「套」？ —— *KLP 工具：`Termstruktur`*
2. **是乘积** → 标出 $u,v$，套乘积法则 —— *KLP 工具：`Produktregel`*
3. **是复合** → 标出内层 $g$、外层 $f$，套链式法则 —— *KLP 工具：`Kettenregel`*
4. **既乘又套** → 先乘积、每个因子内部再链式 —— *KLP 工具：两法则组合*

> **判据 / 决策点**：写不下手时，先在草稿上**用不同下划线标出 $u,v$ 或 $f,g$**，再落笔。错则记「辨别错」。

### 3.2 方法 B：乘积法则三步

1. **设** $u=$ 第一因子，$v=$ 第二因子 —— *KLP 工具：`Termzerlegung`*
2. **分别求导** $u'$、$v'$ —— *KLP 工具：`Potenzregel`/`Summenregel`/`Kettenregel`*
3. **套公式** $u'v+uv'$ 并**整理因式** —— *KLP 工具：`Produktregel` + `Ausklammern`*

> **判据 / 决策点**：结果常可提出公因子（如 $e^{-x}$），**提公因子**能让后续找零点容易得多。

### 3.3 方法 C：链式法则三步

1. **设内层** $g(x)=$ 括号里的表达式 —— *KLP 工具：`Verkettung`*
2. **求内层导数** $g'(x)$ —— *KLP 工具：`Potenzregel`*
3. **求外层导数**（内层保持不变），再乘 $g'(x)$ —— *KLP 工具：`Kettenregel`*

> **判据 / 决策点**：**写出来**：$f'(g(x))\cdot g'(x)$，两个因子都显式落笔，防止漏乘。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 复合函数求导的「由外向内、逐层剥皮」程序

- **技法内容**：中国把复合函数求导固定成一条**由外向内**的程序：**先辨认最外层函数 → 对外层求导（内层原样保留）→ 再乘内层的导数；若内层仍是复合，继续向内剥一层**。配套两条纪律：① 每剥一层就**写出这一层的导数因子**，② 求导后**回代展开**到最简。乘积法则则与链式法则组合：**「乘积外层用乘积法则，每个因子内部各用链式」**。
- **DE-Anschluss**：Q1 的 `Produktregel` 是 GK/LK 共同要求 [已验证]；`Kettenregel` 在 **LK 一般化**、**GK 仅限 `e^x ∘ 线性`** [已验证]。本技法不含新知识，只是把德国已有的两条法则**排成固定剥层顺序**并强制显式书写，正好针对「漏乘内层导数」这一德国侧高频失分点。
- **合规性**：⚠️ 需注意 —— 剥层程序本身完全合规，但**剥层深度必须受 GK/LK 分层约束**：GK 只剥到「线性内层」为止，超过一层复合（如 $e^{-x^2}$）属 LK 内容 [已验证]。
- **Abitur 应用**：2. Prüfungsteil 求导常规步骤（AFB II）；免工具段手算简单复合（AFB I）；也是 `Extremwertprobleme`、`Kurvendiskussion` 的前置动作 [据推断]。
- **来源**：`[CN-课标]` 基本初等函数的导数公式、导数的四则运算法则、复合函数求导（限 $f(ax+b)$）· `[CN-教材]` 由外向内剥层 · `[CN-高考]` 复合函数与乘积求导综合

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I（免工具，简单复合）与 Aufgabenart II（工具，复杂组合）皆可 [据推断] |
| Operator | `berechnen` / `bestimmen` / `zeigen` / `nachweisen`（数学不按动词分 AFB）[已验证] |
| AFB | I（直接求导）→ II（组合与整理）[据推断] |
| 建议分值 / 时长 | 求导子题 3–6 BE / 约 4–8 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`（Produktregel 基础）
> Bestimmen Sie die Ableitung von $f(x)=x^2\cdot e^{x}$.

**Aufgabe 2** `[原创]`（Kettenregel，GK 层）
> Bestimmen Sie die Ableitung von $g(x)=e^{3x-1}$.

**Aufgabe 3** `[NRW-改编]`（组合：乘积 + 链式）
> Gegeben ist $f(x)=x\cdot e^{-x}$ für $x\in\mathbb{R}$.
> a) Bestimmen Sie $f'(x)$ und vereinfachen Sie so weit wie möglich.
> b) Bestimmen Sie die Nullstelle von $f'$ und begründen Sie, dass dort ein Extrempunkt vorliegt.

**Aufgabe 4** `[原创]`（LK，一般 Kettenregel + 论证）
> Gegeben ist $h(x)=e^{-x^2}$.
> a) Bestimmen Sie $h'(x)$.
> b) Zeigen Sie, dass $h$ an der Stelle $x=0$ ein globales Maximum besitzt.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Zerlegung**: $u=x^2$, $v=e^{x}$ ✓ 得分点：显式设 $u,v$
2. **Ableitungen**: $u'=2x$, $v'=e^{x}$ ✓
3. **Produktregel**: $f'(x)=2x\cdot e^{x}+x^2\cdot e^{x}$ ✓ 得分点：两项都写
4. **Vereinfachung**: $f'(x)=e^{x}\left(2x+x^2\right)$ ✓ 得分点：提公因子

**Aufgabe 2**（GK）
1. **Verkettung**: äußere Funktion $f(u)=e^{u}$, innere Funktion $g(x)=3x-1$ ✓ 得分点：显式标内外层
2. **Äußere Ableitung**: $f'(u)=e^{u}$, also $f'(g(x))=e^{3x-1}$ ✓
3. **Innere Ableitung**: $g'(x)=3$ ✓ 得分点：内层导数写出
4. **Ergebnis**: $g'(x)=3\cdot e^{3x-1}$ ✓ 得分点：两因子相乘（不得漏 $3$）

**Aufgabe 3**
1. **a) Zerlegung**: $u=x$, $v=e^{-x}$ ✓
2. **a) Ableitungen**: $u'=1$; $v'=-e^{-x}$ (Kettenregel mit innerer Ableitung $-1$) ✓ 得分点：内层 $-1$ 写出
3. **a) Produktregel**: $f'(x)=1\cdot e^{-x}+x\cdot\left(-e^{-x}\right)=e^{-x}-x\,e^{-x}$ ✓ 得分点：两项都写
4. **a) Vereinfachung**: $f'(x)=e^{-x}(1-x)$ ✓ 得分点：提公因子
5. **b) Nullstelle**: $f'(x)=0\Rightarrow 1-x=0\Rightarrow x=1$ (da $e^{-x}>0$) ✓ 得分点：说明 $e^{-x}\neq0$
6. **b) Art**: Für $x<1$ ist $1-x>0$, also $f'(x)>0$; für $x>1$ ist $f'(x)<0$. Da $f'$ bei $x=1$ das Vorzeichen von $+$ nach $-$ wechselt, liegt ein **Hochpunkt** vor. ✓ 得分点：符号变化论证（AFB II）

**Aufgabe 4**（LK）
1. **a) Verkettung**: äußere Funktion $f(u)=e^{u}$, innere Funktion $g(x)=-x^2$ ✓
2. **a) Ableitungen**: $f'(u)=e^{u}$; $g'(x)=-2x$ ✓ 得分点：一般内层导数
3. **a) Kettenregel**: $h'(x)=e^{-x^2}\cdot(-2x)=-2x\,e^{-x^2}$ ✓ 得分点：内层导数不得漏
4. **b) Nullstelle**: $h'(x)=0\Rightarrow -2x=0\Rightarrow x=0$ (da $e^{-x^2}>0$) ✓
5. **b) Vorzeichen**: Für $x<0$ ist $-2x>0$, also $h'(x)>0$ (steigend); für $x>0$ ist $h'(x)<0$ (fallend). Also liegt bei $x=0$ ein Maximum. ✓ 得分点：符号表
6. **b) Global**: $h(0)=e^{0}=1$; außerdem ist $e^{-x^2}\le1$ für alle $x$, da $-x^2\le0$ und $e^{u}$ monoton wachsend ist. Damit ist $h(0)=1$ das globale Maximum. ✓ 得分点：用单调性给出全局性（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把乘积当复合（或反之），如把 $x\cdot e^x$ 用链式求导 | 方法 A：**先看最外层运算**再落笔 |
| 知识错 | 乘积法则**漏项**（只写 $u'v$）；链式法则**漏乘内层导数** | 每次显式写出两项 / 两个因子 |
| 知识错 | GK 学生按 LK 一般链式处理 $e^{-x^2}$（超范围） | 牢记 GK 仅限 `e^x ∘ 线性` [已验证] |
| 表达错 | 只写结果不呈示 Ansatz → 违反 `berechnen` 的「必须呈示过程」[已验证] | 写出 $u,v$ 或 $f,g$ 的设定行 |
| 表达错 | 求导后不整理、不提公因子，导致后续找零点困难 | 结果一律**因式化** |

---

## 7. Vernetzung

- **上游**：`MA-A3-03` 幂/和/因子规则（[`Ganzrationale-Funktionen-Kurvendiskussion.md`](Ganzrationale-Funktionen-Kurvendiskussion.md)）· `MA-A1-05` 指数函数（[`Exponentialfunktionen-Wachstum-und-Zerfall.md`](Exponentialfunktionen-Wachstum-und-Zerfall.md)）
- **下游**：`MA-A4-02`–`MA-A4-04` Monotonie/Extrema/Krümmung · `MA-A4-05` 用导数证不等式（[`Vom-Extremwert-zum-Beweis.md`](Vom-Extremwert-zum-Beweis.md)）· `MA-A6-02` Extremwertprobleme · LK `MA-A6-05` 三角与 `ln` 求导
- **横向**：物理（变加速运动、指数衰减律求导）；`Analysis-Physik-Kinetik-Vernetzung.md`
- **术语卡**：`Produktregel` / `Kettenregel` / `Verkettung` / `innere Funktion` / `äußere Funktion`（建议由主线程补入 Q1 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
