---
fach: Mathe
thema: "Nachweis einer Ableitungsregel (h-Methode)"
operatoren: [nachweisen, zeigen, begruenden, berechnen, erlaeutern]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Mathe, Analysis]
stufe: "EF"
---

# Nachweis einer Ableitungsregel (证明一条求导法则 · h-Methode)

> **中文理解**：NRW KLP 在 EF 学段**法定要求**学生「证明其中一条求导法则」——`Summenregel` 或 `Faktorregel` [已验证]。证明工具只有两件：**差商（Differenzenquotient）** 与 **前形式化极限概念（`propädeutischer Grenzwertbegriff`）**，配合 `lim` 记号 [已验证]。
> 它属于 Inhaltsfeld A，是德国**唯一把「证明」写进 EF 明文**的微分学条目，也是 Q2 论证能力（AFB III）的第一块训练场 [据推断]。
> 标准路径：写出差商 $\frac{f(x_0+h)-f(x_0)}{h}$ → 代数化简 → 让 $h\to0$ → 读出 $f'(x_0)$。
>
> **Klausur-Relevanz**：免工具段的 `nachweisen`/`zeigen` 子题；只写结果不给分，**必须呈示完整极限过程** [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Differenzenquotient | 差商 | difference quotient | $\dfrac{f(x_0+h)-f(x_0)}{h}$ | 割线斜率 [已验证] |
| h-Methode | h 方法 | h-method | 用差商 + 极限求导数 | EF 唯一法定证明工具 |
| Grenzwert | 极限 | limit | $\lim_{h\to0}\dfrac{f(x_0+h)-f(x_0)}{h}$ | 前形式化概念 [已验证] |
| propädeutischer Grenzwertbegriff | 前形式化极限概念 | propaedeutic limit concept | 定性说明「平均→局部」的过渡 | EF 不要求 ε-δ |
| Sekante / Tangente | 割线 / 切线 | secant / tangent | 割线极限位置 = 切线 | 几何直观 [已验证] |
| Summenregel | 和法则 | sum rule | $(f+g)'=f'+g'$ | EF 法定证明对象之一 |
| Faktorregel | 因子法则 | constant factor rule | $(c\,f)'=c\,f'$ | EF 法定证明对象之一 |
| Potenzregel | 幂法则 | power rule | $(x^n)'=n\,x^{n-1}$ | 可对具体 $n$ 用 h-Methode 证 |
| Ableitungsfunktion | 导函数 | derivative function | $f'$，把每点的极限值作为函数 | 与切线斜率互译 |

> 条目来源：KLP EF 能力点 (7) 极限概念、(14) 证明一条求导法则 [已验证]；节点 `MA-A3-02`、`MA-A3-03` [已验证]。

---

## 2. 知识结构 (Struktur)

### 2.1 为什么 EF 的证明「够用就行」

德国 EF 用 **propädeutischer Grenzwertbegriff**：不引入 ε-δ 定义，只要求**定性说明** $h\to0$ 时差商趋于一个确定值，并**规范使用 `lim` 记号** [已验证]。

> 中文理解：考试不考形式化极限理论，但考「你是否能用差商 + 极限把一条法则推出来」。漏写 `lim` 记号或直接写「显然」都算过程缺失。

> *Klausur-Satz*: Der Grenzwert des Differenzenquotienten $\lim_{h\to0}\frac{f(x_0+h)-f(x_0)}{h}$ beschreibt die lokale Änderungsrate von $f$ an der Stelle $x_0$ und ist der Anschauung nach die Steigung der Tangente.

### 2.2 两条法定可证法则

| 法则 | 命题 | 证明关键 |
|---|---|---|
| Summenregel | $(f+g)'(x_0)=f'(x_0)+g'(x_0)$ | 拆开差商 → 分组 → 用极限的加法性质 |
| Faktorregel | $(c\,f)'(x_0)=c\cdot f'(x_0)$ | 提出常数因子 $c$ → 用极限的常数倍性质 |

> *Klausur-Satz*: Für zwei differenzierbare Funktionen $f$ und $g$ gilt $(f+g)'=f'+g'$; für eine Konstante $c$ gilt $(c\,f)'=c\,f'$.

### 2.3 差商化简的三个常用动作

1. **通分/展开**（多项式）：展开 $f(x_0+h)$ 后约去 $h$
2. **提公因式**：把分子中公共的 $h$ 提到分母约掉
3. **有理化**（根式，LK 预备）：乘共轭式消去 $h$

> ⚠️ 化简目标永远只有一个：**让 $h$ 从分母消失**，否则 $h\to0$ 无法取极限。

### 2.4 用 h-Methode 证具体幂法则（$n\in\mathbb{N}$）

对 $f(x)=x^2$：$\frac{(x_0+h)^2-x_0^2}{h}=\frac{2x_0h+h^2}{h}=2x_0+h\xrightarrow{h\to0}2x_0$。

> *Klausur-Satz*: Man setzt den Differenzenquotienten an, formt ihn so um, dass der Faktor $h$ gekürzt werden kann, und führt anschließend den Grenzübergang $h\to0$ durch.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：h-Methode 标准五步（证明法则或求导函数）

1. **写差商**：$\dfrac{f(x_0+h)-f(x_0)}{h}$，声明 $h\neq0$ —— *KLP 工具：`Differenzenquotient`*
2. **展开/通分**：把分子整理成含 $h$ 因子的形式 —— *KLP 工具：`Termumformung`*
3. **约去 $h$**：分子分母同除 $h$ —— *KLP 工具：`Bruchrechnung`*
4. **取极限**：$h\to0$，写出 `lim` 记号并给出结果 —— *KLP 工具：`propädeutischer Grenzwertbegriff`*
5. **结论句**：说明所得即 $f'(x_0)$ —— *KLP 工具：`nachweisen`（须呈示过程）*

> **判据 / 决策点**：若分子无法提出 $h$，说明函数在该点可能不可导，或需换有理化等技巧。

### 3.2 方法 B：证 Summenregel（法定证明模板）

1. **设** $F=f+g$，写 $F$ 的差商 —— *KLP 工具：`Differenzenquotient`*
2. **拆项**：$\frac{[f(x_0+h)+g(x_0+h)]-[f(x_0)+g(x_0)]}{h}$ —— *KLP 工具：`Termumformung`*
3. **重组**：$\frac{f(x_0+h)-f(x_0)}{h}+\frac{g(x_0+h)-g(x_0)}{h}$ —— *KLP 工具：`Addition von Brüchen`*
4. **取极限**：极限的加法性质 ⇒ $f'(x_0)+g'(x_0)$ —— *KLP 工具：`Grenzwertsätze`*
5. **结论**：$(f+g)'(x_0)=f'(x_0)+g'(x_0)$ ✓

> **判据 / 决策点**：前提是 $f$、$g$ 在 $x_0$ 处**可导**，答题首句须声明。

### 3.3 方法 C：证 Faktorregel（法定证明模板）

1. **设** $F=c\,f$，写差商 $\frac{c\,f(x_0+h)-c\,f(x_0)}{h}$ —— *KLP 工具：`Differenzenquotient`*
2. **提常数**：$c\cdot\frac{f(x_0+h)-f(x_0)}{h}$ —— *KLP 工具：`Ausklammern`*
3. **取极限**：常数倍性质 ⇒ $c\cdot f'(x_0)$ —— *KLP 工具：`Grenzwertsätze`*
4. **结论**：$(c\,f)'(x_0)=c\,f'(x_0)$ ✓

> **判据 / 决策点**：只需 $f$ 可导；$c$ 为常数，不随 $h$ 变。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 定义法求导「三步走」（取值 → 作差商 → 取极限）

- **技法内容**：中国把用定义求导固定成三步：① **取值**：给自变量增量 $\Delta x$，算 $\Delta y=f(x_0+\Delta x)-f(x_0)$；② **作差商**：$\frac{\Delta y}{\Delta x}$，代数化简到能约去 $\Delta x$；③ **取极限**：$\lim_{\Delta x\to0}\frac{\Delta y}{\Delta x}$，得 $f'(x_0)$。并强调**先化简后取极限**，不可先令 $\Delta x=0$（会产生 $\frac00$）。
- **DE-Anschluss**：EF 的 `Differenzenquotient` 与 `propädeutischer Grenzwertbegriff` [已验证]；`lim` 记号 EF 已引入 [已验证]。本技法与德国 h-Methode **本质同构**，只是把变量名从 $h$ 换成 $\Delta x$、把步骤显式编号。
- **合规性**：✅ 完全合规 —— 无新知识，纯属对 EF 已有工具的程序化编排。⚠️ 但中国「导数定义求导」常配合「左右导数」「可导必连续」等，本卡**只取三步主体**，不引入 ε-δ 或连续性的形式化讨论（德国 EF 不要求）。
- **Abitur 应用**：免工具 `nachweisen`/`zeigen` 子题（AFB II）；也是 LK 阶段证明 `Hauptsatz` 的差商思想前身 [据推断]。
- **来源**：`[CN-课标]` 导数的概念及其几何意义 · `[CN-教材]` 定义法求导三步 · `[CN-高考]` 用定义证明可导/求导函数

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I（免工具证明题）[据推断] |
| Operator | `nachweisen` / `zeigen` / `begruenden`（必须呈示过程）[已验证] |
| AFB | II（重组与呈示）为主，可含 III（独立论证）[据推断] |
| 建议分值 / 时长 | 4–7 BE / 约 6–10 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Zeigen Sie mit Hilfe des Differenzenquotienten, dass die Funktion $f(x)=x^2$ an der Stelle $x_0$ die Ableitung $f'(x_0)=2x_0$ besitzt.

**Aufgabe 2** `[NRW-改编]`
> Beweisen Sie die **Summenregel**: Für zwei an der Stelle $x_0$ differenzierbare Funktionen $f$ und $g$ gilt $(f+g)'(x_0)=f'(x_0)+g'(x_0)$.

**Aufgabe 3** `[原创]`
> Beweisen Sie die **Faktorregel**: Für eine Konstante $c\in\mathbb{R}$ und eine an $x_0$ differenzierbare Funktion $f$ gilt $(c\cdot f)'(x_0)=c\cdot f'(x_0)$.

**Aufgabe 4** `[原创]`
> a) Zeigen Sie mit der h-Methode, dass für $f(x)=x^3$ gilt: $f'(x_0)=3x_0^2$.
> b) Erläutern Sie, warum der Grenzübergang $h\to0$ erst **nach** dem Kürzen des Faktors $h$ durchgeführt werden darf.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Differenzenquotient**: $\dfrac{f(x_0+h)-f(x_0)}{h}=\dfrac{(x_0+h)^2-x_0^2}{h}$ ✓ 得分点：Ansatz 写出
2. **Ausmultiplizieren**: $=\dfrac{x_0^2+2x_0h+h^2-x_0^2}{h}=\dfrac{2x_0h+h^2}{h}$ ✓
3. **Kürzen**: $=\dfrac{h(2x_0+h)}{h}=2x_0+h$ (für $h\neq0$) ✓ 得分点：约去 $h$
4. **Grenzübergang**: $\lim_{h\to0}(2x_0+h)=2x_0$ ✓ 得分点：`lim` 记号 + 结果
5. **Fazit**: Also ist $f'(x_0)=2x_0$. ✓ 得分点：结论句

**Aufgabe 2**
1. **Ansatz**: Sei $F=f+g$; der Differenzenquotient lautet $\dfrac{F(x_0+h)-F(x_0)}{h}$ ✓
2. **Einsetzen**: $=\dfrac{\big[f(x_0+h)+g(x_0+h)\big]-\big[f(x_0)+g(x_0)\big]}{h}$ ✓ 得分点：定义展开
3. **Umsortieren**: $=\dfrac{f(x_0+h)-f(x_0)}{h}+\dfrac{g(x_0+h)-g(x_0)}{h}$ ✓ 得分点：拆成两个差商
4. **Grenzwertsatz**: Da $f$ und $g$ an $x_0$ differenzierbar sind, existieren beide Grenzwerte; die Grenzwertsätze liefern $\lim_{h\to0}(\dots)=f'(x_0)+g'(x_0)$ ✓ 得分点：引用极限加法性质
5. **Fazit**: $(f+g)'(x_0)=f'(x_0)+g'(x_0)$. ✓

**Aufgabe 3**
1. **Ansatz**: Sei $F=c\,f$; $\dfrac{F(x_0+h)-F(x_0)}{h}=\dfrac{c\,f(x_0+h)-c\,f(x_0)}{h}$ ✓
2. **Ausklammern**: $=c\cdot\dfrac{f(x_0+h)-f(x_0)}{h}$ ✓ 得分点：常数提出
3. **Grenzübergang**: $\lim_{h\to0}c\cdot\dfrac{f(x_0+h)-f(x_0)}{h}=c\cdot f'(x_0)$ ✓ 得分点：极限常数倍性质
4. **Fazit**: $(c\,f)'(x_0)=c\,f'(x_0)$. ✓ 得分点：结论

**Aufgabe 4**
1. **a) Differenzenquotient**: $\dfrac{(x_0+h)^3-x_0^3}{h}$ ✓
2. **a) Ausmultiplizieren**: $(x_0+h)^3=x_0^3+3x_0^2h+3x_0h^2+h^3$ ⇒ 分子 $=3x_0^2h+3x_0h^2+h^3$ ✓ 得分点：展开正确
3. **a) Kürzen**: $=\dfrac{h(3x_0^2+3x_0h+h^2)}{h}=3x_0^2+3x_0h+h^2$ ✓
4. **a) Grenzübergang**: $\lim_{h\to0}(3x_0^2+3x_0h+h^2)=3x_0^2$ ⇒ $f'(x_0)=3x_0^2$ ✓ 得分点：结论
5. **b) Begründung**: Vor dem Kürzen steht $h$ im Nenner; setzte man direkt $h=0$, entstünde der unbestimmte Ausdruck $\frac00$. Erst nach dem Kürzen ist der Term für $h\to0$ stetig fortsetzbar und der Grenzwert ablesbar. ✓ 得分点：说明「未定式」理由（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「求导」当成「证明」——直接套幂法则不给差商过程 | 题目出现 `zeigen/nachweisen` 一律走方法 A |
| 知识错 | 未约去 $h$ 就令 $h=0$，得到 $\frac00$ | 方法 A 步骤 3 是硬性步骤 |
| 知识错 | 证明 Summenregel 时未声明 $f,g$ 可导 | 首句声明前提 |
| 表达错 | 漏写 `lim` 记号或省略结论句 → 过程不完整 [已验证] | 步骤 4、5 各设一次自检 |
| 表达错 | 用「显然」「易见」代替代数化简 | 每步写出代数式 |

---

## 7. Vernetzung

- **上游**：`MA-A3-01` 平均变化率（[`Analysis-Physik-Kinetik-Vernetzung.md`](Analysis-Physik-Kinetik-Vernetzung.md)）· `MA-A3-02` 局部变化率与极限
- **下游**：`MA-A3-03` 三条求导法则（[`Ganzrationale-Funktionen-Kurvendiskussion.md`](Ganzrationale-Funktionen-Kurvendiskussion.md)）· Q1 `MA-A3-04/05` 乘积与链式法则（[`Produkt-und-Kettenregel.md`](Produkt-und-Kettenregel.md)）· Q2 LK `Hauptsatz` 证明
- **横向**：物理（瞬时速度的定义式 $v=\lim_{\Delta t\to0}\frac{\Delta s}{\Delta t}$）
- **术语卡**：`Differenzenquotient` / `h-Methode` / `Grenzwert` / `Summenregel` / `Faktorregel`（建议由主线程补入 EF 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
