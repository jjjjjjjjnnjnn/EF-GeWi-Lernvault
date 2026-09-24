---
fach: Mathe
thema: "Funktionsscharen und Parameterdiskussion [LK]"
operatoren: [untersuchen, beschreiben, begruenden, bestimmen, berechnen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Mathe, Analysis, LK]
stufe: "Q2"
kursart: "LK"
---

# Funktionsscharen und Parameterdiskussion (函数族与参数讨论) `[LK]`

> **中文理解**：函数族 $f_t(x)$ 是「一族函数」，$t$ 是可变的参数。NRW KLP 把 `Funktionsscharen` 列为 **LK 独立 Schwerpunkt**，明文要求**解释参数含义并研究其对函数性质的影响**——**GK 完全没有此条目** [已验证]。
> 典型考法：先用 CAS 观察参数变化（AFB I/II），再**独立给出分类论证**（AFB III）；也是口试 `Vermuten → Begründen` 的经典载体 [据推断]。
> 与 CN「含参单调性讨论」高度同构，但**只能用 LK 轨道**。
>
> **Klausur-Relevanz**：LK 的 Aufgabenart II 高频；参数族 + CAS 作图 + 分类论证是 LK 标志性考法 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Funktionsschar | 函数族 | family of functions | $f_t(x)$，$t$ 为参数 | LK 独立 Schwerpunkt [已验证] |
| Scharparameter | 族参数 | family parameter | $t$，取值于给定区间 | 与变量 $x$ 严格区分 |
| Parameterdiskussion | 参数讨论 | parameter discussion | 研究 $t$ 如何影响性质 | 须分类 [已验证] |
| Ortskurve | 轨迹曲线 | locus curve | 极值点随 $t$ 变化所成的曲线 | 消去 $t$ 得到 |
| Fallunterscheidung | 分类讨论 | case distinction | 按判别式/零点位置分类 | AFB III 核心动作 |
| Diskriminante | 判别式 | discriminant | $f_t'(x)=0$ 的 $\Delta$ | 决定零点个数 |
| Parameterabhängiges Extremum | 依赖参数的极值 | parameter-dependent extremum | 极值坐标含 $t$ | 常接 Ortskurve |
| Gemeinsamer Punkt | 公共点 | common point | 所有 $f_t$ 都过的点 | 由「$t$ 系数为 0」求 |
| Verhalten in Abhängigkeit von $t$ | 随参数的行为 | behaviour depending on $t$ | $t\to$ 边界时的图像变化 | 须定性描述 |

> 条目来源：KLP LK 增量表「`Funktionsscharen` 独立 Schwerpunkt：须解释参数含义并研究其对性质的影响」[已验证]；节点 `MA-A6-04`。

---

## 2. 知识结构 (Struktur)

### 2.1 参数含义的「三步说明」

1. **它是常量还是变量**：$t$ 是参数（常数），每次取定后 $f_t$ 是一个普通函数
2. **它的现实/几何含义**：如斜率、截距、振幅、增长因子
3. **它的取值范围**：题目给定的 $t>0$、$t\in\mathbb{R}$ 等

> *Klausur-Satz*: Der Parameter $t$ ist eine Konstante, die die Schar beschreibt; für jeden festen Wert von $t$ ist $f_t$ eine gewöhnliche Funktion, und $t$ beeinflusst die Lage und Gestalt des Graphen.

### 2.2 参数如何影响性质（影响矩阵）

| 性质 | 参数常见作用 |
|---|---|
| 零点 | $t$ 平移零点或改变零点个数 |
| 极值 | $t$ 改变极值位置，可能使极值消失 |
| 单调性 | $t$ 决定导函数零点是否落在定义域内 |
| 图像走势 | $t$ 缩放/平移整族图像 |
| 公共点 | 与 $t$ 无关的固定点 |

> *Klausur-Satz*: Zu untersuchen ist, für welche Parameterwerte sich die Anzahl oder Lage der Nullstellen und Extrempunkte ändert.

### 2.3 分类讨论的两个维度

1. **零点个数**：由判别式 $\Delta$ 的正负零分类
2. **零点位置**：零点是否落在定义域内

> 中文理解：含参二次型导函数 $f_t'(x)$ 的讨论就是「$\Delta$ 分三档 + 位置再分档」。这是 AFB III 的核心动作。

> *Klausur-Satz*: Die Diskussion erfolgt über die Anzahl der Nullstellen der Ableitung und deren Lage innerhalb des Definitionsbereichs.

### 2.4 常见题型四类

1. **公共点**：令 $t$ 的系数为 0 解出
2. **极值随参数**：写出极值坐标 $(x(t)\mid y(t))$
3. **Ortskurve**：从 $x(t)$ 解出 $t$，代入 $y(t)$ 消参
4. **分类论证**：按 2.3 两维度分档

> *Klausur-Satz*: Die Ortskurve der Extrempunkte erhält man, indem man den Parameter aus den Koordinaten eliminiert.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：参数含义说明（答题首段模板）

1. **声明** $t$ 为参数，$x$ 为变量 —— *KLP 工具：`Parameterbegriff`*
2. **指出** $t$ 的几何/现实含义（斜率/截距/振幅…）—— *KLP 工具：`Interpretation`*
3. **给出** 取值范围 —— *KLP 工具：`Definitionsbereich`*
4. **CAS 观察**：作 $t$ 动态图（MMS 规定动作）—— *KLP 工具：`MMS 参数动态`*

> **判据 / 决策点**：答案中必须出现「参数取值 → 图像变化」的定性描述，只写「$t$ 是参数」不算解释。

### 3.2 方法 B：参数相关的曲线考察（Kurvendiskussion 含参）

1. 求 $f_t'(x)$（含参）—— *KLP 工具：`Ableitungsregeln`*
2. 解 $f_t'(x)=0$：写出解（含 $t$）—— *KLP 工具：`Nullstellen`*
3. 判极值类型：符号表（含 $t$）—— *KLP 工具：`Vorzeichentabelle`*
4. 写出极值坐标 $(x(t)\mid y(t))$ —— *KLP 工具：`Extrempunkte`*
5. 求 $f_t''$ 判凸凹（如需）—— *KLP 工具：`Krümmung`*

> **判据 / 决策点**：求导后先看 $f_t'$ 是否能因式分解，能分解则零点结构一目了然。

### 3.3 方法 C：分类讨论（AFB III）

1. 求 $f_t'$ 并化为「因子 × 二次式」形式 —— *KLP 工具：`Faktorisierung`*
2. 算判别式 $\Delta(t)$ —— *KLP 工具：`Diskriminante`*
3. **分档**：$\Delta>0$ / $\Delta=0$ / $\Delta<0$ 三档 —— *KLP 工具：`Fallunterscheidung`*
4. 每档内再查零点是否在定义域 —— *KLP 工具：`Definitionsbereich`*
5. 每档画符号表，汇总单调区间 —— *KLP 工具：`Monotonie`*

> **判据 / 决策点**：结论必须按参数区间**分段陈述**，不可只给一档。

### 3.4 方法 D：Ortskurve 四步

1. 写出极值点 $x$-坐标 $x_E(t)$ —— *KLP 工具：`Extrempunkte`*
2. 由 $x=x_E(t)$ 反解 $t=t(x)$ —— *KLP 工具：`Umformen`*
3. 代入 $y_E(t)$ 消去 $t$ —— *KLP 工具：`Einsetzen`*
4. 得 $y=g(x)$ 即轨迹曲线 —— *KLP 工具：`Ortskurve`*

> **判据 / 决策点**：$x_E(t)$ 必须可逆（单调），否则需分段。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 含参单调性讨论（按判别式与零点位置分类）

- **技法内容**：导函数含参数时，单调性可能随参数改变。做法固定为：先求导，令 $f'(x)=0$，**按判别式与零点是否落在定义域内**分类；每一类画一张符号表，得到该类下的单调区间；最后把结论按参数区间汇总。判据是「**零点个数**」与「**零点位置**」两个维度。
- **DE-Anschluss**：`Funktionsscharen` 是 **LK 独立 Schwerpunkt**（须解释参数含义并研究其对性质的影响）[已验证]；`Monotonie` 与无工具解二次方程（含 LK 的 `biquadratische Gleichungen`）[已验证]；CAS 作参数动态图是 MMS 规定动作 [已验证]。
- **合规性**：⚠️ 需注意 —— **GK 无 `Funktionsscharen`**。GK 使用时必须限定在「参数已给定具体数值」或「单调性不随参数改变」的情形；**系统化的参数分类讨论只能用于 LK** [已验证]。
- **Abitur 应用**：LK 的 Aufgabenart II 高频——先用 CAS 观察参数变化（AFB I/II），再独立给出分类论证（AFB III）；口试中「Vermuten → Begründen」的经典载体 [据推断]。
- **来源**：`[CN-课标]` 导数与单调性 · `[CN-教材]` 分类讨论规范 · `[CN-高考]` 含参函数单调性讨论（**原创改写，不搬原题**）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart II（含工具，CAS 参数动态）为主；可含免工具子问 [据推断] |
| Operator | `untersuchen` / `beschreiben` / `begruenden` / `bestimmen`（必须呈示过程）[已验证] |
| AFB | II（参数分析）→ III（分类论证、推广）[据推断] |
| 建议分值 / 时长 | 15–25 BE / 约 25–40 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`（LK）
> Gegeben ist die Funktionenschar $f_t(x)=x^3-tx$ mit $t>0$.
> a) Erläutern Sie die Bedeutung des Parameters $t$.
> b) Bestimmen Sie die Koordinaten der Extrempunkte in Abhängigkeit von $t$.
> c) Bestimmen Sie die Ortskurve der Extrempunkte.

**Aufgabe 2** `[NRW-改编]`（LK）
> Gegeben ist $f_t(x)=x^2-tx+1$ mit $t\in\mathbb{R}$.
> Untersuchen Sie in Abhängigkeit von $t$, wie viele Nullstellen $f_t$ besitzt, und begründen Sie Ihr Ergebnis.

**Aufgabe 3** `[原创]`（LK）
> Gegeben ist die Schar $f_t(x)=e^{-x}\cdot(x-t)$ mit $t\in\mathbb{R}$.
> a) Bestimmen Sie $f_t'(x)$ und zeigen Sie, dass alle Graphen genau einen Extrempunkt besitzen.
> b) Bestimmen Sie die Ortskurve der Hochpunkte.

**Aufgabe 4** `[原创]`（LK）
> Gegeben ist $f_a(x)=\tfrac{1}{3}x^3-a x^2+a^2 x$ mit $a>0$.
> Untersuchen Sie das Monotonieverhalten von $f_a$ in Abhängigkeit von $a$ und geben Sie die Extremstellen an.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Bedeutung**: $t$ ist ein Scharparameter; er verändert die Lage der Extrempunkte und die Steilheit des Graphen. Für größeres $t$ liegen die Extrempunkte weiter außen und tiefer. ✓ 得分点：参数含义说明
2. **b) Ableitung**: $f_t'(x)=3x^2-t$ ✓ 得分点：求导
3. **b) Nullstellen**: $3x^2=t\Rightarrow x=\pm\sqrt{t/3}$ ✓
4. **b) Art**: $f_t''(x)=6x$. Für $x=-\sqrt{t/3}<0$ ist $f_t''<0$ ⇒ **Hochpunkt**; für $x=+\sqrt{t/3}$ ist $f_t''>0$ ⇒ **Tiefpunkt**. ✓ 得分点：二阶导判别
5. **b) Werte**: $y=f_t(\sqrt{t/3})=\left(\sqrt{t/3}\right)^3-t\sqrt{t/3}=\dfrac{t}{3}\sqrt{t/3}-t\sqrt{t/3}=-\dfrac{2t}{3}\sqrt{t/3}$ ✓
6. **b) Punkte**: $\mathrm{HP}\left(-\sqrt{t/3}\ \middle|\ \dfrac{2t}{3}\sqrt{t/3}\right)$, $\mathrm{TP}\left(\sqrt{t/3}\ \middle|\ -\dfrac{2t}{3}\sqrt{t/3}\right)$ ✓ 得分点：含参坐标
7. **c) Ortskurve**: Für den Hochpunkt gilt $x=-\sqrt{t/3}\Rightarrow x^2=t/3\Rightarrow t=3x^2$. Einsetzen in $y=\dfrac{2t}{3}\sqrt{t/3}=\dfrac{2\cdot3x^2}{3}\cdot|x|$. Wegen $x<0$ ist $|x|=-x$ ⇒ $y=2x^2\cdot(-x)=-2x^3$. Also **Ortskurve $y=-2x^3$ (für $x<0$)**. ✓ 得分点：消参 + 定义域限制

**Aufgabe 2**
1. **Ansatz**: $f_t(x)=0\Rightarrow x^2-tx+1=0$ ✓
2. **Diskriminante**: $\Delta=(-t)^2-4\cdot1\cdot1=t^2-4$ ✓ 得分点：判别式
3. **Fall $\Delta>0$** ($|t|>2$): zwei Nullstellen $x_{1,2}=\dfrac{t\pm\sqrt{t^2-4}}{2}$ ✓
4. **Fall $\Delta=0$** ($|t|=2$): genau eine (doppelte) Nullstelle $x=\dfrac{t}{2}=\pm1$ ✓
5. **Fall $\Delta<0$** ($|t|<2$): keine Nullstelle ✓
6. **Begründung**: Die Anzahl der Nullstellen entspricht der Anzahl der Lösungen der quadratischen Gleichung, die durch die Diskriminante festgelegt ist. ✓ 得分点：结论 + 依据（AFB III）

**Aufgabe 3**
1. **a) Produktregel**: $f_t'(x)=(-e^{-x})(x-t)+e^{-x}\cdot1=e^{-x}\big(-(x-t)+1\big)=e^{-x}(t+1-x)$ ✓ 得分点：Produktregel + 提公因子
2. **a) Nullstelle**: $f_t'(x)=0\Rightarrow t+1-x=0\Rightarrow x=t+1$ (da $e^{-x}>0$) ✓
3. **a) Eindeutigkeit**: Da $e^{-x}>0$ für alle $x$, hat $f_t'$ genau die eine Nullstelle $x=t+1$; ein Vorzeichenwechsel liegt vor (Faktor $t+1-x$ wechselt von $+$ nach $-$), also genau ein Extrempunkt (Hochpunkt). ✓ 得分点：唯一性论证
4. **a) Art**: Für $x<t+1$ ist $f_t'>0$, für $x>t+1$ ist $f_t'<0$ ⇒ **Hochpunkt** ✓
5. **b) Punkt**: $y=f_t(t+1)=e^{-(t+1)}\big((t+1)-t\big)=e^{-(t+1)}$ ⇒ $\mathrm{HP}\left(t+1\ \middle|\ e^{-(t+1)}\right)$ ✓
6. **b) Ortskurve**: Aus $x=t+1\Rightarrow t=x-1$; dann $y=e^{-(t+1)}=e^{-x}$. Also **Ortskurve $y=e^{-x}$** (für alle $x$, da $t$ beliebig). ✓ 得分点：消参

**Aufgabe 4**
1. **Ableitung**: $f_a'(x)=x^2-2ax+a^2=(x-a)^2$ ✓ 得分点：求导 + 因式化
2. **Nullstelle**: $f_a'(x)=0\Rightarrow x=a$ (doppelte Nullstelle) ✓
3. **Vorzeichen**: $(x-a)^2\ge0$ für alle $x$ ⇒ $f_a'\ge0$ ⇒ $f_a$ ist **monoton wachsend** auf ganz $\mathbb{R}$ ✓ 得分点：符号论证
4. **Extremstelle**: Da $f_a'$ das Vorzeichen nicht wechselt (nur berührt), liegt bei $x=a$ **kein** Extrempunkt vor, sondern ein **Sattelpunkt** ✓ 得分点：辨别（无符号变化⇒无极值）
5. **Fazit**: Unabhängig von $a$ besitzt $f_a$ keine Extremstellen; die Monotonie ist für alle $a>0$ gleich. ✓ 得分点：结论

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把参数 $t$ 当成变量一起求导 | 方法 A 步骤 1：$t$ 是常数 |
| 辨别错 | GK 学生误做 `Funktionsscharen`（超范围） | 牢记 `Funktionsscharen` 仅 LK [已验证] |
| 知识错 | 分类讨论只给一档结论 | 方法 C：$\Delta$ 三档必须齐全 |
| 知识错 | 求 Ortskurve 时忘记 $x_E(t)$ 的定义域限制 | 方法 D：消参后标明参数范围 |
| 表达错 | 只描述图像变化，不给分类论证 → 拿不到 AFB III [据推断] | 方法 C 步骤 5 按参数区间分段陈述 |
| 表达错 | 求导后不因式化，导致零点结构看不清 | 结果一律因式化 |

---

## 7. Vernetzung

- **上游**：`MA-A4-02/03/04` Monotonie/Extrema/Krümmung（[`Ganzrationale-Funktionen-Kurvendiskussion.md`](Ganzrationale-Funktionen-Kurvendiskussion.md)）· `MA-A3-04` Produktregel（[`Produkt-und-Kettenregel.md`](Produkt-und-Kettenregel.md)）
- **下游**：`MA-A4-05` 用导数证不等式（[`Vom-Extremwert-zum-Beweis.md`](Vom-Extremwert-zum-Beweis.md)）· `MA-A6-05` 三角与 `ln` 求导（[`Trigonometrische-und-Logarithmusfunktionen-LK.md`](Trigonometrische-und-Logarithmusfunktionen-LK.md)）· `MA-A6-06` Umkehrfunktion（[`Umkehrfunktion-LK.md`](Umkehrfunktion-LK.md)）
- **横向**：CN-Methode「恒成立/存在性 → 最值转化」（参数分离）· 口试 `Vermuten → Begründen` · MMS 参数动态
- **术语卡**：`Funktionsschar` / `Scharparameter` / `Ortskurve` / `Fallunterscheidung` / `Diskriminante`（建议由主线程补入 Q2 LK 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
