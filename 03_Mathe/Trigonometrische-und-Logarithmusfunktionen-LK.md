---
fach: Mathe
thema: "Trigonometrische und Logarithmusfunktionen [LK]"
operatoren: [berechnen, bestimmen, zeigen, nachweisen, begruenden, beschreiben]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Mathe, Analysis, LK]
stufe: "Q2"
kursart: "LK"
---

# Trigonometrische und Logarithmusfunktionen (三角与对数函数) `[LK]`

> **中文理解**：LK 把 $f(x)=a\sin(b(x+c))+d$ 与 $\ln x$ 当作**独立函数类**，明文要求**无工具求导**，并且以 `ln x` 作为 `1/x` 的原函数 [已验证]。**GK 完全不涉及对数函数，也不求导三角函数**——这是 GK/LK 最硬的分界线之一 [已验证]。
> 三角部分：EF 已学「参数对 Sinus 的影响」，LK 升级为**求导对象**；对数部分：LK 引入 `ln x`（定义域 $x>0$）、`(ln x)'=1/x`，并在积分中反用。
> 考法双重：免工具段求导 + 积分反用。
>
> **Klausur-Relevanz**：LK 免工具段求导（AFB II）；`1/x` 的原函数与面积题（AFB II–III）[据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Sinusfunktion | 正弦函数 | sine function | $f(x)=a\sin(b(x+c))+d$ | LK 须无工具求导 [已验证] |
| Kosinusfunktion | 余弦函数 | cosine function | $f(x)=a\cos(b(x+c))+d$ | 同上 |
| Ableitung des Sinus | 正弦的导数 | derivative of sine | $(\sin x)'=\cos x$ | 无工具记住 |
| Ableitung des Kosinus | 余弦的导数 | derivative of cosine | $(\cos x)'=-\sin x$ | 负号易错 |
| natürliche Logarithmusfunktion | 自然对数函数 | natural logarithm | $f(x)=\ln x$, $D=\mathbb{R}^{>0}$ | GK 无此内容 [已验证] |
| Ableitung des Logarithmus | 对数的导数 | derivative of ln | $(\ln x)'=\dfrac{1}{x}$ | LK 必记 |
| Stammfunktion von 1/x | 1/x 的原函数 | antiderivative of 1/x | $\displaystyle\int\frac{1}{x}\,dx=\ln|x|+C$ | LK 积分反用 [已验证] |
| Kettenregel (allgemein) | 一般链式法则 | general chain rule | $f'(g(x))\cdot g'(x)$ | LK 一般化 [已验证] |
| Definitionsbereich | 定义域 | domain | $\ln$：$x>0$；$\sin$：$\mathbb{R}$ | 漏写定义域失分 |
| Periode | 周期 | period | $p=\dfrac{2\pi}{|b|}$ | 三角参数 |

> 条目来源：KLP LK 增量表「三角函数独立函数类，须无工具求导」「`natürliche Logarithmusfunktion` 独立函数类，须无工具求导」「以 `ln x` 为 `1/x` 的原函数」[已验证]；节点 `MA-A6-05`。

---

## 2. 知识结构 (Struktur)

### 2.1 四个必记导数（LK 免工具段）

| 函数 | 导数 |
|---|---|
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\ln x$ | $1/x$ |
| $e^x$ | $e^x$ |

> 中文理解：符号只需记一条——`cos` 求导带负号。其余靠链式法则组合。

> *Klausur-Satz*: Es gilt $(\sin x)'=\cos x$ und $(\cos x)'=-\sin x$; die natürliche Logarithmusfunktion hat die Ableitung $(\ln x)'=\tfrac1x$ für $x>0$.

### 2.2 复合求导（LK 一般链式法则）

对 $f(x)=a\sin(b(x+c))+d$：
$$f'(x)=a\cos(b(x+c))\cdot b$$

> *Klausur-Satz*: Bei $f(x)=a\sin(b(x+c))+d$ liefert die Kettenregel $f'(x)=ab\cos(b(x+c))$; der innere Faktor $b$ darf nicht vergessen werden.

### 2.3 对数的定义域与运算

- 定义域 $x>0$（含 $\ln$ 的函数必须首句声明）
- 运算律：$\ln(uv)=\ln u+\ln v$、$\ln\frac{u}{v}=\ln u-\ln v$、$\ln(u^n)=n\ln u$
- 求导组合：$\big(\ln(g(x))\big)'=\dfrac{g'(x)}{g(x)}$

> *Klausur-Satz*: Für $\ln(g(x))$ gilt nach der Kettenregel $\big(\ln(g(x))\big)'=\tfrac{g'(x)}{g(x)}$; dabei ist $g(x)>0$ zu fordern.

### 2.4 积分反用（LK）

$$\int \frac{1}{x}\,dx=\ln|x|+C,\qquad \int_a^b \frac{1}{x}\,dx=\ln b-\ln a\quad(0<a<b)$$

> 中文理解：GK 只能求整有理函数的原函数；LK 多了 $1/x \to \ln x$ 这一条，使有理函数与对数的面积题可解。

> *Klausur-Satz*: Die Funktion $F(x)=\ln x$ ist eine Stammfunktion von $f(x)=\tfrac1x$ auf $\mathbb{R}^{>0}$.

### 2.5 三角的积分（LK 边缘）

$$\int \sin x\,dx=-\cos x+C,\qquad \int\cos x\,dx=\sin x+C$$

> *Klausur-Satz*: Eine Stammfunktion von $\sin x$ ist $-\cos x$, eine von $\cos x$ ist $\sin x$.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：无工具求导三角复合函数

1. **辨内外层**：外层 $\sin$ 或 $\cos$，内层 $b(x+c)$ —— *KLP 工具：`Verkettung`*
2. **外层求导**（内层不变）—— *KLP 工具：`(\sin)'=cos`*
3. **乘内层导数** $b$ —— *KLP 工具：`Kettenregel`*
4. **化简**（提出常数、合并）—— *KLP 工具：`Termumformung`*

> **判据 / 决策点**：内层导数 $b$ **必须写出**，漏乘是头号错误。

### 3.2 方法 B：无工具求导对数函数

1. **声明定义域** $g(x)>0$ —— *KLP 工具：`Definitionsbereich`*
2. **套公式** $\big(\ln g\big)'=\dfrac{g'}{g}$ —— *KLP 工具：`Kettenregel`*
3. **化简**：约分或提因子 —— *KLP 工具：`Bruchrechnung`*

> **判据 / 决策点**：结果中分母保留 $g(x)$ 本身，不要展开成多项式后再约（除非能约）。

### 3.3 方法 C：对数积分面积题

1. **找原函数**：识别 $\frac{1}{x}$ 或可化为它的形式 —— *KLP 工具：`Stammfunktion`*
2. **写 $F(x)=\ln|x|$**（区间正数时可写 $\ln x$）—— *KLP 工具：`ln als Stammfunktion`*
3. **代入上下限** $F(b)-F(a)$ —— *KLP 工具：`bestimmtes Integral`*
4. **化简为对数差** $\ln b-\ln a=\ln\frac{b}{a}$ —— *KLP 工具：`Logarithmusgesetze`*

> **判据 / 决策点**：区间含 0 时不可用（$1/x$ 在 0 处无定义）。

### 3.4 方法 D：三角参数→求导联合题

1. **读参数** $a,b,c,d$ —— *KLP 工具：`Parameterwirkung`*
2. **求导**（方法 A）—— *KLP 工具：`Kettenregel`*
3. **解 $f'(x)=0$**：$\cos(\dots)=0$ ⇒ 相位 $=\frac{\pi}{2}+k\pi$ —— *KLP 工具：`Nullstellen`*
4. **判极值**：符号变化 —— *KLP 工具：`Extrempunkte`*

> **判据 / 决策点**：解三角方程时须给出**通解**并用周期限定在给定区间内。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 三角 $A/\omega/\varphi$ 参数体系 + 对数运算律

- **技法内容**：中国把三角函数做成一套 **$y=A\sin(\omega x+\varphi)$ 三参数体系**：$A$ 管振幅、$\omega$ 管周期（$T=2\pi/\omega$）、$\varphi$ 管相位（左右平移）；求导时按「外层导数 × 内层导数」处理，$\omega$ 必须乘出。对数部分则系统训练**运算律**（积、商、幂）与**换底公式**，并明确 $(\ln x)'=1/x$、定义域 $x>0$。
- **DE-Anschluss**：LK 的 `f(x)=a·sin(b(x+c))+d` 须**无工具求导** [已验证]；`natürliche Logarithmusfunktion` 为独立函数类须无工具求导 [已验证]；`ln x` 作 `1/x` 的原函数 [已验证]；EF 已学 `Parameterwirkung Sinusfunktion` [已验证]。参数体系与德国记号仅差字母（$\omega\leftrightarrow b$，$\varphi\leftrightarrow bc$），**无新知识**。
- **合规性**：⚠️ 需注意 —— **三角恒等变换（和差/倍角/半角公式）**属中国必修独立大单元，而德国 LK 只要求**求导**、不要求恒等变形体系，故本卡**不引入恒等变换**，只取「参数解读 + 求导 + 运算律」。GK 学生不得使用本卡（GK 无对数、不求导三角）[已验证]。
- **Abitur 应用**：LK 免工具段求导（AFB II）；`1/x` 的面积题与对数化简（AFB II–III）；口试解释参数含义 [据推断]。
- **来源**：`[CN-课标]` 三角函数图象与性质、对数概念与运算律 · `[CN-教材]` $A/\omega/\varphi$ 参数体系 · `[CN-高考]` 三角与对数综合（**原创改写，不搬原题**）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I（免工具求导）与 II（积分/面积）皆可 [据推断] |
| Operator | `berechnen` / `bestimmen` / `zeigen` / `nachweisen`（必须呈示过程）[已验证] |
| AFB | II（求导与化简）→ III（论证与解释）[据推断] |
| 建议分值 / 时长 | 4–8 BE / 约 6–12 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`（LK）
> Bestimmen Sie ohne Hilfsmittel die Ableitung von $f(x)=3\sin\big(2(x+\tfrac{\pi}{4})\big)-1$.

**Aufgabe 2** `[NRW-改编]`（LK）
> Bestimmen Sie ohne Hilfsmittel die Ableitung von $g(x)=\ln(3x^2+1)$ und geben Sie den Definitionsbereich an.

**Aufgabe 3** `[原创]`（LK）
> Gegeben ist $h(x)=x\cdot\ln x$ für $x>0$.
> a) Bestimmen Sie $h'(x)$.
> b) Bestimmen Sie die Koordinaten des Extrempunkts und begründen Sie die Art des Extremums.

**Aufgabe 4** `[NRW-改编]`（LK）
> a) Zeigen Sie, dass $F(x)=\ln x$ eine Stammfunktion von $f(x)=\tfrac1x$ auf $\mathbb{R}^{>0}$ ist.
> b) Berechnen Sie $\displaystyle\int_1^{e^2}\frac{1}{x}\,dx$ und vereinfachen Sie das Ergebnis.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Verkettung**: äußere Funktion $\sin$, innere Funktion $u=2(x+\tfrac{\pi}{4})=2x+\tfrac{\pi}{2}$ ✓ 得分点：标内外层
2. **Äußere Ableitung**: $\cos\big(2(x+\tfrac{\pi}{4})\big)$ ✓
3. **Innere Ableitung**: $u'=2$ ✓ 得分点：内层导数写出
4. **Kettenregel**: $f'(x)=3\cdot\cos\big(2(x+\tfrac{\pi}{4})\big)\cdot2=6\cos\big(2(x+\tfrac{\pi}{4})\big)$ ✓ 得分点：$b=2$ 不得漏乘
5. **Fazit**: $f'(x)=6\cos\big(2x+\tfrac{\pi}{2}\big)=-6\sin(2x)$, da $\cos(\theta+\tfrac{\pi}{2})=-\sin\theta$. ✓（化简为加分项）

**Aufgabe 2**
1. **Definitionsbereich**: Da $\ln$ nur für positive Argumente definiert ist, muss $3x^2+1>0$ gelten. Wegen $3x^2+1\ge1>0$ ist $D=\mathbb{R}$. ✓ 得分点：定义域讨论
2. **Formel**: $\big(\ln g(x)\big)'=\dfrac{g'(x)}{g(x)}$ mit $g(x)=3x^2+1$ ✓
3. **Innere Ableitung**: $g'(x)=6x$ ✓
4. **Ergebnis**: $g'(x)=\dfrac{6x}{3x^2+1}$ ✓ 得分点：结果完整
5. **Fazit**: Die Ableitung ist für alle $x\in\mathbb{R}$ definiert. ✓

**Aufgabe 3**
1. **a) Produktregel**: $h'(x)=1\cdot\ln x+x\cdot\dfrac{1}{x}$ ✓ 得分点：Produktregel + $(\ln x)'=\tfrac1x$
2. **a) Vereinfachung**: $h'(x)=\ln x+1$ ✓ 得分点：化简 $x\cdot\tfrac1x=1$
3. **b) Nullstelle**: $h'(x)=0\Rightarrow\ln x=-1\Rightarrow x=e^{-1}=\tfrac1e$ ✓
4. **b) Vorzeichen**: Für $x<\tfrac1e$ (also $\ln x<-1$) ist $h'<0$; für $x>\tfrac1e$ ist $h'>0$ ⇒ **Tiefpunkt** ✓ 得分点：符号表
5. **b) Wert**: $h(\tfrac1e)=\tfrac1e\cdot\ln\tfrac1e=\tfrac1e\cdot(-1)=-\tfrac1e$ ⇒ $\mathrm{TP}\left(\tfrac1e\ \middle|\ -\tfrac1e\right)$ ✓ 得分点：坐标
6. **b) Begründung**: Da $h'$ an der Stelle $x=\tfrac1e$ das Vorzeichen von $-$ nach $+$ wechselt, liegt ein lokales Minimum vor. ✓

**Aufgabe 4**
1. **a) Ableitung von F**: $F'(x)=(\ln x)'=\dfrac1x=f(x)$ für $x>0$ ✓ 得分点：直接验证定义
2. **a) Fazit**: Damit ist $F$ eine Stammfunktion von $f$ auf $\mathbb{R}^{>0}$. ✓
3. **b) Stammfunktion einsetzen**: $\displaystyle\int_1^{e^2}\frac1x\,dx=\big[\ln x\big]_1^{e^2}$ ✓
4. **b) Einsetzen der Grenzen**: $=\ln(e^2)-\ln 1=2-0=2$ ✓ 得分点：上下限代入
5. **b) Alternative**: $\ln(e^2)-\ln1=\ln\dfrac{e^2}{1}=\ln(e^2)=2$. ✓ 得分点：对数律化简

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 三角复合求导漏乘内层导数 $b$ | 方法 A 步骤 3 显式写出 $b$ |
| 辨别错 | $(\cos x)'$ 漏负号，写成 $\sin x$ | 记住唯一带负号的导数 |
| 知识错 | 含 $\ln$ 的函数不声明定义域 $x>0$ | 方法 B 步骤 1 首句声明 |
| 知识错 | 用 $\int_0^a\frac1x dx$（区间含 0）→ 无定义 | 方法 C 判据：区间不得含 0 |
| 表达错 | 求导后不化简（如 $x\cdot\tfrac1x$ 不约） | 结果一律化简 |
| 表达错 | GK 学生误用对数/三角求导（超范围）[已验证] | 牢记 GK 无对数、不求导三角 |

---

## 7. Vernetzung

- **上游**：`MA-A2-04` Parameterwirkung Sinus（[`Transformationen-Verschiebung-Symmetrie-Streckung.md`](Transformationen-Verschiebung-Symmetrie-Streckung.md)）· `MA-A3-05` Kettenregel（[`Produkt-und-Kettenregel.md`](Produkt-und-Kettenregel.md)）· `MA-A1-05` Exponentialfunktionen（[`Exponentialfunktionen-Wachstum-und-Zerfall.md`](Exponentialfunktionen-Wachstum-und-Zerfall.md)）
- **下游**：`MA-A5-06` 反常积分/旋转体（LK）· `MA-A6-04` Funktionsscharen（[`Funktionsscharen-und-Parameterdiskussion-LK.md`](Funktionsscharen-und-Parameterdiskussion-LK.md)）· `MA-A6-06` Umkehrfunktion（[`Umkehrfunktion-LK.md`](Umkehrfunktion-LK.md)，$e^x$ 与 $\ln$ 互逆）
- **横向**：物理（简谐振动、阻尼振动、声强/分贝）· 口试解释参数含义
- **术语卡**：`Sinusfunktion` / `Kosinusfunktion` / `natürliche Logarithmusfunktion` / `Stammfunktion` / `Kettenregel (allgemein)`（建议由主线程补入 Q2 LK 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
