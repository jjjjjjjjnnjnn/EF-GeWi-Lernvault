---
fach: Mathe
thema: "Umkehrfunktion [LK]"
operatoren: [entscheiden, begruenden, beschreiben, bestimmen, berechnen, nachweisen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Mathe, Analysis, LK]
stufe: "Q2"
kursart: "LK"
---

# Umkehrfunktion (反函数) `[LK]`

> **中文理解**：反函数把「输入→输出」的映射倒过来：「输出→输入」。NRW KLP 中 **GK 仅以 Wurzelfunktion 为例**，而 **LK 须判定可逆性、求反函数解析式、说明原函数与反函数图像的关系** [已验证]。
> 它属于 Inhaltsfeld A，是 LK 的 AFB II 典型提问：先判「这个函数在给定区间上可逆吗」，再求式、再谈图像。
> 判据核心：**在区间上严格单调 ⇒ 可逆**（反之不必然）。
>
> **Klausur-Relevanz**：LK 的可逆性判定（`entscheiden`/`begruenden`）+ 图像关系说明（`beschreiben`）是高频组合 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Umkehrfunktion | 反函数 | inverse function | $f^{-1}$，满足 $f^{-1}(f(x))=x$ | 记号 $f^{-1}\neq\frac1f$ |
| Umkehrbarkeit | 可逆性 | invertibility | 每个函数值只被一个 $x$ 取到 | 判定的对象 |
| Monotonie | 单调性 | monotonicity | 严格单调 ⇒（区间上）可逆 | 充分条件 [已验证] |
| Definitions-/Wertebereich | 定义域/值域 | domain/range | $D_{f^{-1}}=W_f$ | 互换 |
| Umkehrbarkeit durch Einschränkung | 通过限制定义域可逆 | invertibility via restriction | 如 $x^2$ 限在 $x\ge0$ | LK 常用手法 |
| Spiegelung an der Geraden $y=x$ | 关于直线 $y=x$ 对称 | reflection in $y=x$ | $G_{f^{-1}}$ 是 $G_f$ 的镜像 | **不是** x 轴对称 [已验证] |
| Wurzelfunktion | 根式函数 | square root function | GK 的唯一反函数例子 | GK 例 [已验证] |
| Exponential-/Logarithmusfunktion | 指数/对数函数 | exponential/logarithm | $e^x$ 与 $\ln x$ 互为反函数 | LK 标志性一对 |
| Ableitung der Umkehrfunktion | 反函数求导 | derivative of inverse | $(f^{-1})'(y_0)=\dfrac{1}{f'(x_0)}$ | $y_0=f(x_0)$，LK 可选 |

> 条目来源：KLP LK 增量表「`Umkehrfunktion`：须判定可逆性、求反函数解析式、说明原函数与反函数图像关系」；GK「仅以 Wurzelfunktion 为例」[已验证]；节点 `MA-A6-06`。

---

## 2. 知识结构 (Struktur)

### 2.1 可逆性判据（核心）

- **充分条件**：$f$ 在区间 $I$ 上**严格单调** ⇒ $f$ 在 $I$ 上可逆 [已验证]
- **必要条件**：可逆 ⇒ 每个 $y$ 至多被一个 $x$ 取到（水平线最多交一次）
- ⚠️ 单调**不是**可逆的必要条件（不单调也可在特殊情形可逆），但在高中范围内**判可逆几乎只用单调性**

> *Klausur-Satz*: Ist eine Funktion auf einem Intervall streng monoton, so ist sie dort umkehrbar; die Umkehrfunktion ist dann ebenfalls streng monoton im gleichen Sinne.

### 2.2 求反函数三步

1. 写 $y=f(x)$
2. 解出 $x$（用 $y$ 表示）
3. 交换字母 $x\leftrightarrow y$，得 $y=f^{-1}(x)$

> 中文理解：第 2 步是「反解」，第 3 步是「换名」。换名后定义域须改成原函数的值域。

> *Klausur-Satz*: Zur Bestimmung der Umkehrfunktion löst man die Gleichung $y=f(x)$ nach $x$ auf und vertauscht anschließend die Variablen.

### 2.3 图像关系

$G_{f^{-1}}$ 与 $G_f$ 关于直线 $y=x$ **对称**（镜像）。

> ⚠️ 高频错误：说成「关于 x 轴对称」或「关于 y 轴对称」——都不对 [据推断]。

> *Klausur-Satz*: Der Graph der Umkehrfunktion entsteht durch Spiegelung des Graphen von $f$ an der Geraden $y=x$.

### 2.4 定义域/值域互换

$$D_{f^{-1}}=W_f,\qquad W_{f^{-1}}=D_f$$

> *Klausur-Satz*: Definitions- und Wertebereich tauschen bei der Umkehrung ihre Rollen.

### 2.5 限制定义域使可逆

$f(x)=x^2$ 在 $\mathbb{R}$ 上不可逆，但限制到 $x\ge0$ 后可逆，$f^{-1}(x)=\sqrt x$。

> *Klausur-Satz*: Ist $f$ nicht umkehrbar, kann durch Einschränkung des Definitionsbereichs auf ein Monotonieintervall die Umkehrbarkeit hergestellt werden.

### 2.6 LK 加分项：反函数求导

$$(f^{-1})'(y_0)=\frac{1}{f'(x_0)},\quad y_0=f(x_0)$$

> *Klausur-Satz*: Für die Ableitung der Umkehrfunktion gilt $(f^{-1})'(y_0)=\tfrac{1}{f'(x_0)}$ mit $y_0=f(x_0)$.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：可逆性判定（`entscheiden` + `begruenden`）

1. **求导** $f'$ —— *KLP 工具：`Ableitungsregeln`*
2. **定符号**：$f'>0$ 或 $f'<0$ 在整个区间上 ⇒ 严格单调 —— *KLP 工具：`Monotonie`*
3. **下判定**：严格单调 ⇒ 可逆 —— *KLP 工具：`Umkehrbarkeit`*
4. **结论句**（含区间）—— *KLP 工具：`begruenden`*

> **判据 / 决策点**：若 $f'$ 在某点变号，则该区间上**不**可逆（须分段或限制区间）。

### 3.2 方法 B：求反函数（`bestimmen`）

1. **写** $y=f(x)$ —— *KLP 工具：`Funktionsterm`*
2. **反解** $x$（移项、开方、取对数等）—— *KLP 工具：`Umformen`*
3. **换名** $x\leftrightarrow y$ —— *KLP 工具：`Variablenwechsel`*
4. **定定义域** $=W_f$ —— *KLP 工具：`Wertebereich`*
5. **验证** $f^{-1}(f(x))=x$ —— *KLP 工具：`Probe`*

> **判据 / 决策点**：反解时若出现 $\pm$，须用定义域限制选一支。

### 3.3 方法 C：图像关系说明（`beschreiben`）

1. 指出对称轴是 $y=x$ —— *KLP 工具：`Spiegelung`*
2. 说明对称后关键点互换坐标 —— *KLP 工具：`Punktkoordinaten`*
3. 说明单调性同向 —— *KLP 工具：`Monotonie`*
4. 用德语完整表述 —— *KLP 工具：`beschreiben`（须术语准确）*

> **判据 / 决策点**：术语必须写 `an der Geraden y = x`，不可省略。

### 3.4 方法 D：限制定义域构造可逆（LK）

1. 找 $f'$ 的符号不变的**最大区间** —— *KLP 工具：`Monotonieintervalle`*
2. 在该区间上取 $f$ —— *KLP 工具：`Einschränkung`*
3. 按方法 B 求反函数 —— *KLP 工具：`Umkehrfunktion`*
4. 标明新的定义域/值域 —— *KLP 工具：`Definitionsbereich`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 反函数求解程序「反解—换名—定域」+ 指数↔对数互逆

- **技法内容**：中国把求反函数固定成三步：**① 反解**：由 $y=f(x)$ 解出 $x=g(y)$；**② 换名**：把 $x,y$ 互换得 $y=f^{-1}(x)$；**③ 定域**：反函数的定义域等于原函数的值域。并系统训练**指数函数与对数函数互为反函数**（$y=a^x\leftrightarrow y=\log_a x$）、图像关于 $y=x$ 对称，以及「原函数单调 ⇒ 可逆」的判定。
- **DE-Anschluss**：LK 须判定可逆性 + 求解析式 + 说明图像关系 [已验证]；`Wurzelfunktion` 为 GK 唯一例子 [已验证]；$e^x$ 与 $\ln x$ 互为反函数是 LK 独立体系 [已验证]；`Monotonie` 为 EF 已有工具 [已验证]。
- **合规性**：✅ 完全合规 —— 三步程序与德国要求同构；指数↔对数互逆恰是德国 LK 的 `natürliche Logarithmusfunktion` 体系。⚠️ 但中国「一般对数 $\log_a x$、换底公式」超出德国 LK 要求（德国只考自然对数 `ln`），本卡**只取 `ln` 与 `e^x` 这一对**，不引入一般底数体系。
- **Abitur 应用**：LK 的 AFB II 可逆性判定（`entscheiden`/`begruenden`）+ 图像关系说明（`beschreiben`）；反函数求导（`(f^{-1})'`）可作末段加分 [据推断]。
- **来源**：`[CN-课标]` 指数函数与对数函数互为反函数、反函数概念 · `[CN-教材]` 反解—换名—定域 · `[CN-高考]` 反函数与图像对称（**原创改写，不搬原题**）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I（判定与说明）与 II（求式/求导）皆可 [据推断] |
| Operator | `entscheiden` / `begruenden` / `beschreiben` / `bestimmen`（须呈示过程）[已验证] |
| AFB | II（判定 + 求式）→ III（图像论证、反函数求导）[据推断] |
| 建议分值 / 时长 | 5–9 BE / 约 8–15 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`（LK）
> Gegeben ist $f(x)=x^2$ mit $D=\mathbb{R}$.
> a) Entscheiden Sie, ob $f$ auf $\mathbb{R}$ umkehrbar ist, und begründen Sie Ihre Entscheidung.
> b) Geben Sie eine Einschränkung des Definitionsbereichs an, unter der $f$ umkehrbar ist, und bestimmen Sie die zugehörige Umkehrfunktion.

**Aufgabe 2** `[NRW-改编]`（LK）
> Gegeben ist $f(x)=e^{x}+1$.
> a) Zeigen Sie, dass $f$ auf $\mathbb{R}$ umkehrbar ist.
> b) Bestimmen Sie den Term der Umkehrfunktion $f^{-1}$ und deren Definitionsbereich.

**Aufgabe 3** `[原创]`（LK）
> Gegeben ist $f(x)=\ln(x-2)$ für $x>2$.
> a) Begründen Sie, dass $f$ umkehrbar ist, und bestimmen Sie $f^{-1}$.
> b) Beschreiben Sie, wie der Graph von $f^{-1}$ aus dem Graphen von $f$ hervorgeht.

**Aufgabe 4** `[原创]`（LK）
> Gegeben ist $f(x)=x^3+1$.
> a) Begründen Sie die Umkehrbarkeit von $f$ auf $\mathbb{R}$.
> b) Bestimmen Sie $f^{-1}(x)$.
> c) Berechnen Sie $(f^{-1})'(2)$ mit Hilfe der Ableitung von $f$.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Ableitung**: $f'(x)=2x$ ✓
2. **a) Vorzeichen**: $f'$ wechselt bei $x=0$ das Vorzeichen ($f'<0$ für $x<0$, $f'>0$ für $x>0$) ⇒ $f$ ist auf $\mathbb{R}$ **nicht** streng monoton ⇒ **nicht umkehrbar** auf $\mathbb{R}$ ✓ 得分点：符号变化论证
3. **a) Beispiel**: z. B. $f(2)=4=f(-2)$ bei $2\neq-2$ ⇒ verschiedene Argumente mit gleichem Funktionswert. ✓ 得分点：反例
4. **b) Einschränkung**: $D=[0,\infty)$ (oder $(-\infty,0]$) ⇒ dort ist $f$ streng monoton wachsend (bzw. fallend) ⇒ umkehrbar ✓ 得分点：给出区间
5. **b) Umkehrfunktion**: $y=x^2\Rightarrow x=\sqrt y$ (für $x\ge0$) ⇒ $f^{-1}(x)=\sqrt x$ mit $D_{f^{-1}}=[0,\infty)$ ✓ 得分点：换名 + 定义域

**Aufgabe 2**
1. **a) Ableitung**: $f'(x)=e^{x}>0$ für alle $x\in\mathbb{R}$ ✓ 得分点：求导
2. **a) Monotonie**: Also ist $f$ streng monoton wachsend ⇒ umkehrbar ✓ 得分点：由单调得可逆
3. **b) Ansatz**: $y=e^{x}+1$ ✓
4. **b) Auflösen**: $y-1=e^{x}\Rightarrow x=\ln(y-1)$ ✓ 得分点：取对数
5. **b) Umkehrfunktion**: $f^{-1}(x)=\ln(x-1)$ ✓
6. **b) Definitionsbereich**: $D_{f^{-1}}=W_f=(1,\infty)$ ✓ 得分点：定义域 = 原值域

**Aufgabe 3**
1. **a) Ableitung**: $f'(x)=\dfrac{1}{x-2}$ ✓ 得分点：Kettenregel
2. **a) Monotonie**: Für $x>2$ ist $x-2>0$, also $f'(x)>0$ ⇒ $f$ streng monoton wachsend ⇒ umkehrbar ✓
3. **a) Auflösen**: $y=\ln(x-2)\Rightarrow e^{y}=x-2\Rightarrow x=e^{y}+2$ ✓ 得分点：指数化
4. **a) Umkehrfunktion**: $f^{-1}(x)=e^{x}+2$ mit $D_{f^{-1}}=\mathbb{R}$ (da $W_f=\mathbb{R}$) ✓ 得分点：定义域
5. **b) Beschreibung**: Der Graph von $f^{-1}$ entsteht durch **Spiegelung des Graphen von $f$ an der Geraden $y=x$**. ✓ 得分点：术语 `an der Geraden y = x`
6. **b) Ergänzung**: Dabei vertauschen sich die Koordinaten jedes Punktes: Aus $(x\mid y)$ auf $G_f$ wird $(y\mid x)$ auf $G_{f^{-1}}$. ✓

**Aufgabe 4**
1. **a) Ableitung**: $f'(x)=3x^2\ge0$, und $f'(x)=0$ nur für $x=0$ ⇒ $f$ ist auf $\mathbb{R}$ streng monoton wachsend ⇒ umkehrbar ✓ 得分点：说明「仅一点为零」不破坏严格单调
2. **b) Auflösen**: $y=x^3+1\Rightarrow x^3=y-1\Rightarrow x=\sqrt[3]{y-1}$ ✓
3. **b) Umkehrfunktion**: $f^{-1}(x)=\sqrt[3]{x-1}$ mit $D_{f^{-1}}=\mathbb{R}$ ✓ 得分点：完整式 + 定义域
4. **c) Stelle**: $f^{-1}(2)=1$, da $f(1)=1^3+1=2$ ⇒ $x_0=1$, $y_0=2$ ✓ 得分点：找对应点
5. **c) Ableitung**: $f'(1)=3\cdot1^2=3$ ✓
6. **c) Formel**: $(f^{-1})'(2)=\dfrac{1}{f'(1)}=\dfrac13$ ✓ 得分点：反函数求导公式

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「单调」当成可逆的**必要条件**（应为区间上的充分条件） | 方法 A：只由单调**推**可逆，不用其逆 |
| 辨别错 | 把图像关系说成「关于 x 轴对称」 | 牢记：关于直线 $y=x$ [据推断] |
| 知识错 | 反函数定义域仍写原函数定义域（应写原函数值域） | 方法 B 步骤 4 |
| 知识错 | 把 $f^{-1}$ 当成 $\frac1f$ | 记号：$f^{-1}$ 是反函数，非倒数 |
| 知识错 | 反解出现 $\pm$ 时不做区间取舍 | 方法 B 判据：由定义域选支 |
| 表达错 | 判定可逆时不指明**区间** | 结论句必须含区间 |

---

## 7. Vernetzung

- **上游**：`MA-A4-02` Monotonie（[`Ganzrationale-Funktionen-Kurvendiskussion.md`](Ganzrationale-Funktionen-Kurvendiskussion.md)）· `MA-A6-05` 指数/对数函数（[`Trigonometrische-und-Logarithmusfunktionen-LK.md`](Trigonometrische-und-Logarithmusfunktionen-LK.md)，$e^x$ 与 $\ln$ 互逆）· `MA-A6-04` Funktionsscharen（[`Funktionsscharen-und-Parameterdiskussion-LK.md`](Funktionsscharen-und-Parameterdiskussion-LK.md)）
- **下游**：LK `MA-A5-06` 反常积分/旋转体（反函数与对称面积）· 口试解释「$e^x$ 与 $\ln x$ 的图像关系」
- **横向**：物理（单位换算、逆关系如 $s(t)\leftrightarrow t(s)$）· CN-Methode「指数↔对数互逆」
- **术语卡**：`Umkehrfunktion` / `Umkehrbarkeit` / `Einschränkung des Definitionsbereichs` / `Spiegelung an der Geraden y=x` / `Wertebereich`（建议由主线程补入 Q2 LK 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
