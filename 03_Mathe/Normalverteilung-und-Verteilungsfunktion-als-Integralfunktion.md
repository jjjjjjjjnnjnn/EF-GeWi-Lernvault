---
fach: Mathe
thema: "Normalverteilung und Verteilungsfunktion als Integralfunktion"
operatoren: [erlaeutern, deuten, interpretieren, begruenden, beschreiben, berechnen, skizzieren]
klausurrelevant: true
datum: 2026-09-25
tags: [Q2, Mathe, Stochastik, Analysis]
stufe: "Q2"
kursart: "LK"
---

# Normalverteilung und Verteilungsfunktion als Integralfunktion (正态分布与「分布函数即积分函数」)

> **中文理解**：`Normalverteilung`（正态分布）是连续型随机变量，用**密度函数** $\varphi$（Gauß 钟形曲线）描述；而它的**分布函数** $\Phi(x)=\int_{-\infty}^{x}\varphi(t)\,dt$ **恰好就是 A 域的 `Integralfunktion`**——这是 NRW KLP 中 **S 与 A 两个 Inhaltsfeld 唯一的显式交叉点** [已验证]。
> 因为下限是 $-\infty$，$\Phi$ 本身还是一个**反常积分**（见同目录《Uneigentliche Integrale und Rotationsvolumen》）；由 `Hauptsatz` 立得 $\Phi'(x)=\varphi(x)$——**积分函数的导数回到被积函数**，这就是跨领域的「同一件事的两种外衣」。
> 它位于 Inhaltsfeld S（节点 `MA-S5-01`–`03`），是 **LK 专属**（GK 的 S 止于二项分布）[已验证]；同时因涉及 S⇄A 两域，是**口试（须 ≥2 个 IF）的天然素材** [已验证]。
>
> **Klausur-Relevanz**：`berechnen`（标准化求概率）是 AFB II 常规分；`erlaeutern`/`begruenden`（说明 $\Phi$ 是积分函数、$\Phi'=\varphi$）是 AFB III 的跨领域金矿 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Normalverteilung | 正态分布 | normal distribution | 连续型分布 $N(\mu;\sigma)$ | LK 专属 [已验证] |
| Dichtefunktion | 密度函数 | density function | $\varphi(x)=\frac{1}{\sigma\sqrt{2\pi}}e^{-\frac{(x-\mu)^2}{2\sigma^2}}$ | Gauß 钟形曲线 |
| Glockenkurve (Gauß'sche) | 高斯钟形曲线 | bell curve | 关于 $x=\mu$ 对称 | KLP 点名 [已验证] |
| Verteilungsfunktion | 分布函数 | cumulative distribution function | $\Phi(x)=\int_{-\infty}^{x}\varphi(t)\,dt$ | **即 Integralfunktion** [已验证] |
| Integralfunktion | 积分函数 | integral function | $I_a(x)=\int_a^x f(t)\,dt$ | A 域已有 |
| uneigentliches Integral | 反常积分 | improper integral | 下限 $-\infty$ 须取极限 | 见 A5-06 |
| Standardisierung | 标准化 | standardization | $z=\frac{x-\mu}{\sigma}$ | 化为 $N(0;1)$ |
| Standardnormalverteilung | 标准正态分布 | standard normal | $\mu=0,\ \sigma=1$，记 $\Phi_0$ | 查表/工具 |
| Erwartungswert $\mu$ | 期望 | expected value | 位置参数 | 对称中心 |
| Standardabweichung $\sigma$ | 标准差 | standard deviation | 展布参数 | 拐点在 $\mu\pm\sigma$ |
| Wendepunkt | 拐点 | inflection point | $\varphi$ 在 $x=\mu\pm\sigma$ 处 | A 域概念 [据推断] |
| stetige Zufallsgröße | 连续随机变量 | continuous random variable | $P(X=x)=0$ | 概率是**面积** |

> 条目来源：KLP LK 增量「`Normalverteilung`：`Dichtefunktion`、参数 $\mu/\sigma$、`Graph der Verteilungsfunktion`」+ 能力条 (19)「把 `Verteilungsfunktion` 解释为 `Integralfunktion`」[已验证]；节点 `MA-S5-01`–`03`。

---

## 2. 知识结构 (Struktur)

### 2.1 密度函数 $\varphi$ 的四条图像性质

- 关于 $x=\mu$ **对称**；最大值在 $x=\mu$ [据推断]
- 拐点在 $x=\mu\pm\sigma$ —— *A 域 `Wendepunkt` 的直接应用* [据推断]
- $x\to\pm\infty$ 时 $\varphi(x)\to0$（水平渐近线 $y=0$）
- **总面积为 1**：$\displaystyle\int_{-\infty}^{\infty}\varphi(t)\,dt=1$ [据推断]

> ⚠️ 高频错误：把**纵坐标** $\varphi(x)$ 当概率——**连续情形下 $P(X=x)=0$**，概率是**曲线下的面积** [据推断]。

> *Klausur-Satz*: Die Dichtefunktion $\varphi$ ist symmetrisch zur Geraden $x=\mu$; die Gesamtfläche unter dem Graphen beträgt 1.

### 2.2 核心交叉点：$\Phi$ 就是 `Integralfunktion`

$$\Phi(x)=\int_{-\infty}^{x}\varphi(t)\,dt=\lim_{a\to-\infty}\int_{a}^{x}\varphi(t)\,dt$$

- 结构上：**上限是变量 $x$、下限是常数** ⇒ 正是 A 域 `Integralfunktion` $I_a(x)$ 的定义 [已验证]
- 因为下限 $-\infty$，它同时是一个**反常积分**（`uneigentliches Integral`）[据推断]
- $P(a\le X\le b)=\Phi(b)-\Phi(a)=\displaystyle\int_a^b\varphi(t)\,dt$ —— 概率 = 面积 [据推断]

> *Klausur-Satz*: Die Verteilungsfunktion $\Phi$ der Normalverteilung ist eine Integralfunktion: $\Phi(x)=\int_{-\infty}^{x}\varphi(t)\,dt$. Damit ist sie das Bindeglied zwischen Stochastik und Analysis.

### 2.3 `Hauptsatz` 的直接后果：$\Phi'=\varphi$

由 `Hauptsatz der Differential- und Integralrechnung` 得

$$\Phi'(x)=\varphi(x)$$

- 即：**分布函数的导数 = 密度函数** [据推断]
- 这条把「A 域的微分↔积分互逆」搬进「S 域的密度↔分布」——**同一数学结构的两次出现** [已验证]

> *Klausur-Satz*: Nach dem Hauptsatz gilt $\Phi'(x)=\varphi(x)$; die Dichtefunktion ist also die Ableitung der Verteilungsfunktion.

### 2.4 标准化与对称性（计算工具）

$$P(X\le x)=\Phi_0\!\left(\frac{x-\mu}{\sigma}\right),\qquad \Phi_0(-z)=1-\Phi_0(z)$$

> *Klausur-Satz*: Durch die Standardisierung $z=\frac{x-\mu}{\sigma}$ lässt sich jede Normalverteilung auf die Standardnormalverteilung zurückführen.

### 2.5 与 σ-Regeln 的衔接

$N(\mu;\sigma)$ 下：$P(\mu-\sigma\le X\le\mu+\sigma)\approx68{,}3\%$；$\pm1{,}96\sigma\approx95\%$；$\pm2{,}58\sigma\approx99\%$ [据推断] —— 与二项分布的 `σ-Regeln` 同形，是「离散→连续」的接口。

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：标准化求概率（`berechnen`）

1. 写清 $X\sim N(\mu;\sigma)$ —— *KLP 工具：`Normalverteilung`*
2. 标准化：$z=\frac{x-\mu}{\sigma}$ —— *KLP 工具：`Standardisierung`*
3. 用工具/表求 $\Phi_0(z)$ —— *KLP 工具：`Arbeit mit Medien`（MMS）*
4. 回译到情境（含单位与解释） —— *KLP 工具：`deuten`*

> **判据 / 决策点**：求区间概率用 $\Phi(b)-\Phi(a)$，不要漏减。

### 3.2 方法 B：由概率反求分位点（`bestimmen`）

1. 由 $P(X\le x)=r$ 查 $z_r$（如 0,95 → $z=1{,}645$） —— *KLP 工具：`Quantil`*
2. 反标准化：$x=\mu+z_r\sigma$ —— *KLP 工具：`Standardisierung`（逆用）*
3. 检查单位与合理性 —— *KLP 工具：`Modellieren`*

> **判据 / 决策点**：$z$ 的符号由 $r$ 是否大于 0,5 决定。

### 3.3 方法 C：说明 $\Phi$ 是 `Integralfunktion`（`erlaeutern` + `begruenden`，AFB III）

1. 指出 $\Phi$ 的形式：上限变量、下限常数 $-\infty$ —— *KLP 工具：`Integralfunktion`*
2. 说明下限 $-\infty$ 使其成为反常积分，取极限后存在 —— *KLP 工具：`uneigentliches Integral`*
3. 引用 `Hauptsatz` 得 $\Phi'=\varphi$ —— *KLP 工具：`Hauptsatz`*
4. 指出 $P(a\le X\le b)=\Phi(b)-\Phi(a)$ 即「面积 = 概率」 —— *KLP 工具：`deuten`*
5. 点明这是 S⇄A 的**同一结构** —— *KLP 工具：`interpretieren`*

> **判据 / 决策点**：只说"面积就是概率"**拿不到 AFB III**；必须**显式**与 A 域 `Integralfunktion` 建立联系 [据推断]。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 标准化 $z=\frac{x-\mu}{\sigma}$ + 标准正态表 + 对称性 $\Phi(-z)=1-\Phi(z)$

- **技法内容**：中国把正态分布计算固定成三步——**① 标准化**：$z=\frac{x-\mu}{\sigma}$，把任意 $N(\mu;\sigma)$ 化为 $N(0;1)$；**② 查表**：用标准正态分布表读 $\Phi_0(z)$；**③ 用对称性**：$\Phi_0(-z)=1-\Phi_0(z)$ 处理左尾，区间概率用 $\Phi_0(z_2)-\Phi_0(z_1)$。
- **DE-Anschluss**：德国 LK 已教 `Standardisierung`、`Dichtefunktion`、`Verteilungsfunktion` 图象 [已验证]；A 域的 `Integralfunktion` 与 `Hauptsatz` 是 Q1 已有工具 [已验证]。本卡只重组工具，不引入新知识。
- **合规性**：⚠️ 需注意 —— 中国把正态分布列为**「了解级」**（由误差模型与频率直方图直观引入），且**不与积分建立联系** [据推断]。因此中国材料**无法提供 S⇄A 交叉**这一德国独有要求；只可借用「标准化 + 查表 + 对称性」这套**计算层**方法。
- **Abitur 应用**：`berechnen` 型区间概率（AFB II）；而 S⇄A 的 `erlaeutern` 论证（AFB III）与口试跨域报告**必须按德国标准自建** [据推断]。
- **来源**：`[CN-课标]` 正态分布（了解级）· `[CN-教材]` 标准化与标准正态表 · `[CN-高考]` 正态分布区间概率（**原创改写，不搬原题**）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart II（工具/表求概率）；概念论证可作口试或免工具小问 [据推断] |
| Operator | `berechnen` / `bestimmen` / `erlaeutern` / `begruenden` / `deuten`（数学不按动词分 AFB）[已验证] |
| AFB | II（计算）→ III（$\Phi$ = Integralfunktion 的论证；口试跨域）[据推断] |
| 建议分值 / 时长 | 计算小问 5–8 BE；论证小问 8–10 BE / 口试报告 5–8 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`（LK）
> Die Zufallsgröße $X$ sei normalverteilt mit $\mu=100$ und $\sigma=15$.
> Berechnen Sie $P(X\le120)$.

**Aufgabe 2** `[NRW-改编]`（LK）
> Für $X\sim N(100;15)$ berechnen Sie $P(85\le X\le130)$.

**Aufgabe 3** `[原创]`（LK）
> Für $X\sim N(100;15)$ bestimmen Sie den Wert $x$, für den $P(X\le x)=0{,}95$ gilt.

**Aufgabe 4** `[原创]`（LK，AFB III / 口试素材）
> Die Verteilungsfunktion der Normalverteilung sei $\Phi(x)=\displaystyle\int_{-\infty}^{x}\varphi(t)\,dt$.
> a) Erläutern Sie, inwiefern $\Phi$ eine Integralfunktion im Sinne der Analysis ist.
> b) Begründen Sie mit dem Hauptsatz, dass $\Phi'(x)=\varphi(x)$ gilt.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Standardisieren**: $z=\dfrac{120-100}{15}=\dfrac{20}{15}\approx1{,}33$ ✓ 得分点：写出 $z$
2. **Ablesen**: $P(X\le120)=\Phi_0(1{,}33)\approx0{,}9082$ ✓
3. **Ergebnis**: Die Wahrscheinlichkeit beträgt etwa **90,8 %**. ✓ 得分点：结论句含情境

**Aufgabe 2**
1. **Standardisieren**: $z_1=\dfrac{85-100}{15}=-1$; $z_2=\dfrac{130-100}{15}=2$ ✓ 得分点：两个 $z$
2. **Formel**: $P(85\le X\le130)=\Phi_0(2)-\Phi_0(-1)$ ✓ 得分点：区间用差
3. **Symmetrie**: $\Phi_0(-1)=1-\Phi_0(1)$ ✓
4. **Werte**: $\Phi_0(2)\approx0{,}9772$, $\Phi_0(1)\approx0{,}8413$ ⇒ $\Phi_0(-1)\approx0{,}1587$ ✓
5. **Ergebnis**: $\Phi_0(2)-\Phi_0(-1)\approx0{,}9772-0{,}1587=0{,}8185\approx\mathbf{81{,}9\ \%}$ ✓ 得分点：完整结果

**Aufgabe 3**
1. **z-Wert**: $P(X\le x)=0{,}95$ ⇒ $z\approx1{,}645$ ✓ 得分点：查分位点
2. **Rücksubstitution**: $x=\mu+z\sigma=100+1{,}645\cdot15$ ✓ 得分点：反标准化
3. **Ergebnis**: $x\approx100+24{,}68=124{,}68$. ✓ 得分点：结论句（约 124,7）

**Aufgabe 4**
1. **a) Form**: $\Phi(x)=\int_{-\infty}^{x}\varphi(t)\,dt$ hat die **obere Grenze als Variable** $x$ und eine **konstante untere Grenze** — genau die Bauart der Integralfunktion $I_a(x)=\int_a^x f(t)\,dt$. ✓ 得分点：指出「上限变量、下限常数」
2. **a) Uneigentlich**: Da die untere Grenze $-\infty$ ist, liegt zusätzlich ein uneigentliches Integral vor; der Grenzwert $\lim_{a\to-\infty}\int_a^x\varphi(t)dt$ existiert, da $\int_{-\infty}^{\infty}\varphi=1$. ✓ 得分点：点出反常积分
3. **b) Hauptsatz**: Nach dem Hauptsatz gilt für eine Integralfunktion $I_a'(x)=f(x)$. ✓ 得分点：引用 Hauptsatz
4. **b) Anwenden**: Mit $f=\varphi$ folgt unmittelbar $\Phi'(x)=\varphi(x)$ — die Dichtefunktion ist die Ableitung der Verteilungsfunktion. ✓ 得分点：结论句
5. **Deutung (Bonus)**: Damit ist dieselbe Struktur „Ableitung ↔ Integral" sowohl in der Analysis ($F'=f$) als auch in der Stochastik ($\Phi'=\varphi$) wirksam — der einzige explizite Berührungspunkt von S und A. ✓ 得分点：显式跨域（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把密度**纵坐标**当概率（连续情形 $P(X=x)=0$） | 方法 A 判据：概率是**面积** |
| 辨别错 | 忘记标准化直接查表 | 方法 A 步骤 2 |
| 知识错 | 区间概率忘写 $\Phi(b)-\Phi(a)$（只算一个 $\Phi$） | 方法 A 判据 |
| 知识错 | 左尾不换用 $\Phi_0(-z)=1-\Phi_0(z)$ | 方法 B 判据：符号处理 |
| 表达错 | 只写"面积就是概率"，不与 A 域 `Integralfunktion` 建立显式联系 → 拿不到 AFB III | 方法 C 步骤 5 |
| 表达错 | 论证 $\Phi'=\varphi$ 只写"显然"，不引 `Hauptsatz` | 方法 C 步骤 3 |

---

## 7. Vernetzung

- **上游**：`MA-A5-02` 存量函数与积分函数 · `MA-A5-05` Hauptsatz（[`Integralrechnung-Sechs-Konzepte.md`](Integralrechnung-Sechs-Konzepte.md)）· `MA-A5-06` 反常积分（[`Uneigentliche-Integrale-und-Rotationsvolumen-LK.md`](Uneigentliche-Integrale-und-Rotationsvolumen-LK.md)）· `MA-S3-03` σ-Regeln
- **下游**：`MA-S5-03` 正态分布应用与标准化 · `MA-S4-02` Konfidenzintervall（[`Beurteilende-Statistik-Prognose-und-Konfidenzintervall.md`](Beurteilende-Statistik-Prognose-und-Konfidenzintervall.md)）
- **横向**：**口试固定素材**——S⇄A 跨域报告（KLP 要求口试须涉及 ≥2 个 IF）[已验证]；物理（测量误差模型）；A 域 `Wendepunkt`（拐点 $\mu\pm\sigma$）
- **术语卡**：`Normalverteilung` / `Dichtefunktion` / `Verteilungsfunktion` / `Standardisierung` / `Glockenkurve` / `Integralfunktion`（建议由主线程补入 Q2 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬原题），解析为原创。不搬运出版社教辅原文。
