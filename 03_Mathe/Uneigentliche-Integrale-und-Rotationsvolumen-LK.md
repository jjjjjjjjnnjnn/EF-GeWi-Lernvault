---
fach: Mathe
thema: "Uneigentliche Integrale und Rotationsvolumen [LK]"
operatoren: [berechnen, bestimmen, untersuchen, begruenden, erlaeutern]
klausurrelevant: true
datum: 2026-09-25
tags: [Q2, Mathe, Analysis, LK]
stufe: "Q2"
kursart: "LK"
---

# Uneigentliche Integrale und Rotationsvolumen (反常积分与旋转体体积) `[LK]`

> **中文理解**：这是 Q1 积分概念链在 **LK 轨道**上的两处延伸。`uneigentliche Integrale`（反常积分）处理**区间无限长**或**被积函数无界**的情形——不能直接代入上下限，必须**先求原函数、再取极限**；`Rotationsvolumen`（旋转体体积）把「定积分求面积」升级为「圆盘堆叠求体积」，公式 $V=\pi\int_a^b [f(x)]^2\,dx$。
> 二者在 NRW KLP 中都属 **LK 相对 GK 的增量**：GK 的积分只到「定积分求面积」，LK 才追加 `uneigentliche Integrale` 与绕 $x$ 轴旋转体体积 [已验证]。
> 它们位于 Inhaltsfeld A（节点 `MA-A5-06`），是 Q2 的**边缘但稳定出现**的子题（AFB II–III）[据推断]。
>
> **Klausur-Relevanz**：`berechnen` 型小问给分稳定；`untersuchen`（判收敛/发散）是常见的 AFB II–III 追问，也是把「极限」概念用起来的最短路径 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| uneigentliches Integral | 反常积分 | improper integral | 区间无限或被积函数无界时的积分 | LK 增量 [已验证] |
| Grenzwert (Limes) | 极限 | limit | $\lim_{b\to\infty}$ 或 $\lim_{c\to a^+}$ | 判定的核心 |
| konvergent | 收敛 | convergent | 极限存在且**有限** | 结果是一个数 |
| divergent | 发散 | divergent | 极限不存在或为 $\pm\infty$ | 无有限值 |
| singuläre Stelle / Polstelle | 奇点 | singularity | 被积函数在此趋于 $\pm\infty$ | Typ 2 的成因 |
| Stammfunktion | 原函数 | antiderivative | $F'=f$ | 六概念链已有 |
| Rotationskörper | 旋转体 | solid of revolution | 平面图形绕轴旋转所得立体 | LK 增量 [已验证] |
| Rotationsvolumen | 旋转体体积 | volume of revolution | $V=\pi\displaystyle\int_a^b [f(x)]^2\,dx$ | 绕 $x$ 轴 [已验证] |
| Kreisscheibe / Zylinderscheibe | 圆盘 | disk | 半径 $f(x)$、厚 $\Delta x$ 的薄片 | 体积 $\pi f(x)^2\Delta x$ |
| orientierte Fläche | 有向面积 | signed area | 轴上正、轴下负 | Q1 已有 |

> 条目来源：KLP LK 增量表「积分：增加 `uneigentliche Integrale` + 绕 $x$ 轴旋转体体积」[已验证]；节点 `MA-A5-06`。

---

## 2. 知识结构 (Struktur)

### 2.1 反常积分的两类

- **Typ 1 — 无限区间**：$\displaystyle\int_a^{\infty} f(x)\,dx:=\lim_{b\to\infty}\int_a^b f(x)\,dx$ [已验证]
- **Typ 2 — 无界被积函数**：若 $f$ 在 $x=a$ 处趋于 $\infty$，则 $\displaystyle\int_a^b f(x)\,dx:=\lim_{c\to a^+}\int_c^b f(x)\,dx$ [据推断]

> *Klausur-Satz*: Bei einem uneigentlichen Integral ersetzt man die unendliche Grenze bzw. die singuläre Stelle durch eine Variable und bildet anschließend den Grenzwert.

### 2.2 收敛判据（必须写极限，不能直接代）

- 极限存在且有限 ⇒ **konvergent**；否则 **divergent** [已验证]
- 关键对照（$p$-积分）：$\displaystyle\int_1^{\infty}\frac{1}{x^p}\,dx$ 当 $p>1$ **收敛**（$=\frac{1}{p-1}$），当 $p\le1$ **发散** [据推断]
- 典型：$\int_1^{\infty}\frac{1}{x^2}dx=1$ 收敛；$\int_1^{\infty}\frac1x\,dx$ 发散 [据推断]

> *Klausur-Satz*: Das uneigentliche Integral $\int_1^{\infty} x^{-p}\,dx$ konvergiert genau dann, wenn $p>1$ ist.

### 2.3 旋转体体积（圆盘法）

把图形切成 $n$ 个厚 $\Delta x$ 的薄圆盘，每片体积 $\approx\pi[f(x_i)]^2\Delta x$，取极限得

$$V=\pi\int_a^b [f(x)]^2\,dx$$

> *Klausur-Satz*: Das Volumen des Körpers, der durch Rotation des Graphen von $f$ um die $x$-Achse entsteht, beträgt $V=\pi\int_a^b (f(x))^2\,dx$.

### 2.4 两种几何用途对照（避免混淆）

| 用途 | 公式 | 被积对象 |
|---|---|---|
| 面积（Q1） | $A=\int_a^b \lvert f(x)\rvert\,dx$ | $f$ 的一次 |
| 旋转体体积（LK） | $V=\pi\int_a^b [f(x)]^2\,dx$ | $f$ 的**平方** × $\pi$ |

> ⚠️ 高频混淆：体积公式里**平方**必须写，且**别忘了 $\pi$**。

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：无限区间反常积分（`berechnen` / `untersuchen`）

**编号步骤**：
1. 把 $\infty$ 换成参数 $b$ —— *KLP 工具：`Grenzwertbegriff`*
2. 求原函数 $F$（幂法则反用；LK 可用 $\ln$） —— *KLP 工具：`Stammfunktion`*
3. 算 $\int_a^b = F(b)-F(a)$ —— *KLP 工具：`Hauptsatz`*
4. 取极限 $\lim_{b\to\infty}$ —— *KLP 工具：`Grenzwert`*
5. 判断：有限 ⇒ konvergent（写出值）；否则 divergent —— *KLP 工具：`untersuchen`*

> **判据 / 决策点**：只要极限式没写出，直接代 $\infty$ 就**未呈示过程**（违反 `berechnen` 要求）[已验证]。

### 3.2 方法 B：无界被积函数（Typ 2）

1. 找奇点（分母为零、根号内为零处） —— *KLP 工具：`Definitionsbereich`*
2. 用 $c\to a^+$ 或 $c\to b^-$ 替换奇点边界 —— *KLP 工具：`Grenzwert`*
3. 求原函数并代入 —— *KLP 工具：`Stammfunktion`*
4. 取极限，判收敛 —— *KLP 工具：`untersuchen`*

> **判据 / 决策点**：若奇点在**区间内部**，须从奇点处**拆成两个反常积分**分别判（两者都收敛才收敛）。

### 3.3 方法 C：旋转体体积（`berechnen` / `bestimmen`）

1. 明确旋转轴与函数（KLP 只要求绕 $x$ 轴） —— *KLP 工具：`Rotationskörper`*
2. 写出 $[f(x)]^2$ 并化简 —— *KLP 工具：`Termumformung`*
3. 求原函数，代入上下限 —— *KLP 工具：`Hauptsatz`*
4. 乘 $\pi$，写出**带单位**的结果 —— *KLP 工具：`Modellieren` 的 Interpretieren*

> **判据 / 决策点**：先化简 $[f(x)]^2$ 再积分，可避免把平方误算到原函数里。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 「先求原函数、再取极限」的固定程序 + 圆盘法

- **技法内容**：中国把反常积分固定成两句口诀——**「无限区间先换元求原函数，再取极限」**、**「无界函数找瑕点（奇点），从瑕点取极限」**；旋转体则统一用**圆盘法**：$V=\pi\int_a^b y^2\,dx$（绕 $x$ 轴）、$V=\pi\int_c^d x^2\,dy$（绕 $y$ 轴）。核心是**把「是否收敛」降为「极限是否存在」**，与求导/积分运算分离。
- **DE-Anschluss**：德国 LK 已教 `Stammfunktion`、`bestimmtes Integral`、`Hauptsatz`、`Grenzwertbegriff`（EF 起）[已验证]；`uneigentliche Integrale` 与 `Rotationsvolumen` 正是 LK 增量 [已验证]。本卡不含任何 KLP 之外的新知识。
- **合规性**：⚠️ 需注意 —— 中国侧「定积分/微积分」位于**选修 A/B 类**（非高考范围）[据推断]，故中国材料**不能作为知识板块引入**；但本卡只取**方法层**（先原函数再取极限 + 圆盘法），工具全部在德国 LK 范围内。
- **Abitur 应用**：Aufgabenart II 的 `berechnen`（体积/反常积分值）与 `untersuchen`（判收敛）子题（AFB II–III）；「极限是否存在」可作末段 `begruenden` 追问 [据推断]。
- **来源**：`[CN-课标]` 定积分与微积分基本定理（选修） · `[CN-教材]` 反常积分「先积分后取极限」规范 · `[CN-高考]` 定积分在几何中的应用（**原创改写，不搬原题**）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart II（含工具，计算为主）；概念判断可作免工具小问 [据推断] |
| Operator | `berechnen` / `bestimmen` / `untersuchen` / `begruenden`（数学不按动词分 AFB）[已验证] |
| AFB | II（计算）→ III（收敛性论证、模型评判）[据推断] |
| 建议分值 / 时长 | 单小问 4–6 BE；整题 12–18 BE / 约 15–25 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`（LK）
> Untersuchen Sie, ob das uneigentliche Integral $\displaystyle\int_1^{\infty}\frac{1}{x^2}\,dx$ konvergiert, und berechnen Sie gegebenenfalls seinen Wert.

**Aufgabe 2** `[原创]`（LK）
> Gegeben ist $f(x)=\dfrac{1}{\sqrt{x}}$ für $x>0$.
> a) Untersuchen Sie, ob $\displaystyle\int_0^1 f(x)\,dx$ konvergiert.
> b) Begründen Sie, dass $f$ an der Stelle $x=0$ eine singuläre Stelle besitzt.

**Aufgabe 3** `[NRW-改编]`（LK）
> Der Graph von $f(x)=\sqrt{x}$ rotiert über dem Intervall $[0;4]$ um die $x$-Achse.
> Bestimmen Sie das Volumen des entstehenden Rotationskörpers.

**Aufgabe 4** `[原创]`（LK，AFB III）
> Der Graph von $f(x)=\dfrac1x$ rotiert über $[1;b]$ um die $x$-Achse.
> a) Berechnen Sie das Volumen $V(b)$ in Abhängigkeit von $b$.
> b) Bestimmen Sie $\lim_{b\to\infty}V(b)$ und deuten Sie das Ergebnis im Sachzusammenhang.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Ansatz (Grenzwert)**: $\displaystyle\int_1^{\infty}\frac{1}{x^2}\,dx=\lim_{b\to\infty}\int_1^{b}x^{-2}\,dx$ ✓ 得分点：把 $\infty$ 换成 $b$
2. **Stammfunktion**: $\displaystyle\int x^{-2}dx=-x^{-1}$ ✓
3. **Einsetzen**: $\displaystyle\int_1^{b}x^{-2}dx=\Big[-x^{-1}\Big]_1^{b}=-\frac1b+1$ ✓ 得分点：Hauptsatz 形式
4. **Grenzübergang**: $\lim_{b\to\infty}\left(1-\frac1b\right)=1$ ✓
5. **Fazit**: Der Grenzwert ist endlich ⇒ das Integral **konvergiert** und hat den Wert $1$. ✓ 得分点：结论句含「konvergent」

**Aufgabe 2**
1. **a) Singuläre Stelle**: Für $x\to 0^+$ gilt $f(x)=\frac{1}{\sqrt x}\to\infty$ ⇒ Typ 2 ✓ 得分点：指出无界
2. **a) Ansatz**: $\displaystyle\int_0^1 x^{-1/2}dx=\lim_{c\to0^+}\int_c^{1}x^{-1/2}dx$ ✓
3. **a) Stammfunktion**: $\int x^{-1/2}dx=2x^{1/2}$ ✓
4. **a) Einsetzen**: $\Big[2\sqrt x\Big]_c^{1}=2-2\sqrt c$ ✓
5. **a) Grenzwert**: $\lim_{c\to0^+}(2-2\sqrt c)=2$ ⇒ **konvergent**, Wert $2$ ✓ 得分点：有限极限
6. **b) Begründung**: $f$ ist für $x>0$ definiert, aber $\lim_{x\to0^+}f(x)=\infty$; daher ist $x=0$ eine singuläre Stelle (Polstelle des Integranden). ✓ 得分点：`begruenden` 要求给出理由

**Aufgabe 3**
1. **Formel**: $V=\pi\displaystyle\int_0^4 [f(x)]^2dx=\pi\int_0^4 x\,dx$ ✓ 得分点：写出 Rotationsvolumen-Formel（含 $\pi$ 与平方）
2. **Stammfunktion**: $\int x\,dx=\frac12x^2$ ✓
3. **Einsetzen**: $\pi\Big[\frac12x^2\Big]_0^4=\pi\left(\frac12\cdot16-0\right)=8\pi$ ✓
4. **Ergebnis**: $V=8\pi\approx25{,}13$ (Volumeneinheiten). ✓ 得分点：带单位的结果句

**Aufgabe 4**
1. **a) Formel**: $V(b)=\pi\displaystyle\int_1^b \frac{1}{x^2}\,dx$ ✓
2. **a) Stammfunktion & Einsetzen**: $V(b)=\pi\Big[-\frac1x\Big]_1^b=\pi\left(1-\frac1b\right)$ ✓ 得分点：参数 $b$ 保留
3. **b) Grenzwert**: $\lim_{b\to\infty}\pi\left(1-\frac1b\right)=\pi$ ✓ 得分点：写出极限
4. **b) Deutung**: Obwohl der Körper **unendlich lang** ist, hat er ein **endliches** Volumen ($\approx3{,}14$ VE); die Querschnittsfläche $\pi/x^2$ nimmt schnell genug ab. ✓ 得分点：`deuten` 回译现实语言

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「面积」公式套到「体积」上（漏 $\pi$、漏平方） | 方法 C 步骤 2：先写 $[f(x)]^2$ |
| 辨别错 | 把「收敛」与「算得出来」混为一谈 | 方法 A 步骤 5：判据是**极限是否有限** |
| 知识错 | 直接代入 $\infty$，不写 $\lim_{b\to\infty}$ | 方法 A 步骤 1：必须换参数 |
| 知识错 | 奇点在区间内部时不拆分 | 方法 B 判据：拆成两个反常积分 |
| 表达错 | 结论只写数值，不写 `konvergent` / `divergent` | 结论句必须含判定词 [据推断] |
| 表达错 | 体积结果不写单位（VE） | 方法 C 步骤 4 |

---

## 7. Vernetzung

- **上游**：`MA-A5-04` 原函数与定积分（[`Integralrechnung-Sechs-Konzepte.md`](Integralrechnung-Sechs-Konzepte.md)）· `MA-A5-05` Hauptsatz · `MA-A3-02` 极限概念
- **下游**：`MA-S5-02` 分布函数即积分函数（**正态分布的分布函数本身就是下限为 $-\infty$ 的反常积分**，[`Normalverteilung-und-Verteilungsfunktion-als-Integralfunktion.md`](Normalverteilung-und-Verteilungsfunktion-als-Integralfunktion.md)）[已验证]
- **横向**：`MA-A5-03` 迭代与累积（离散版「逐项累加取极限」，[`Iterationsprozesse-und-Kumulation.md`](Iterationsprozesse-und-Kumulation.md)）· 物理（变速运动路程、连续体的转动惯量）
- **术语卡**：`uneigentliches Integral` / `konvergent` / `divergent` / `singuläre Stelle` / `Rotationskörper` / `Rotationsvolumen`（建议由主线程补入 Q2 LK 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬原题），解析为原创。不搬运出版社教辅原文。
