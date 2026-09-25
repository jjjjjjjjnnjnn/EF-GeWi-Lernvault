---
fach: Mathe
thema: "Beurteilende Statistik: Prognose- und Konfidenzintervall"
operatoren: [bestimmen, berechnen, beurteilen, deuten, interpretieren, entscheiden]
klausurrelevant: true
datum: 2026-09-25
tags: [Q2, Mathe, Stochastik]
stufe: "Q2"
kursart: "LK"
---

# Beurteilende Statistik: Prognose- und Konfidenzintervall (判断统计：预测区间与置信区间)

> **中文理解**：`Beurteilende Statistik`（判断统计）回答"由样本推断总体"的问题：已知一个**样本比例**，能否估计**总体比例**？一个**已知概率**的过程，下一次实验的结果会落在哪个范围？NRW KLP 把它列为 **LK 专属板块**——`σ-Regeln`、`Prognoseintervall`、`Konfidenzintervall`、`Stichprobenumfang`（样本量估算）[已验证]。
> ⚠️ **这是德国高中明显强于中国的一块**：中国高中对区间估计的处理相当轻量，且**几乎不训练"由区间长度反推样本量"** [据推断]。因此本块**不能用中国材料替代**，必须按德国标准练 [已验证/据推断]。
> 它位于 Inhaltsfeld S（节点 `MA-S4-01`–`03`），是 Q2 的 S 域主力（AFB II–III）。
>
> **Klausur-Relevanz**：`bestimmen`（算区间）给分稳定；末段常要求**解释置信水平的真正含义**或**评判调查设计**（AFB III）[据推断]。
> 📌 **GK/LK 提示**：按 KLP，GK 的 S 域**止于二项分布**，本板块整块属 LK [已验证]。GK 读者可只读 §2.1 的 σ-Regeln 作为直觉储备。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Beurteilende Statistik | 判断统计 | inferential statistics | 由样本推断总体的方法群 | LK 专属 [已验证] |
| σ-Regeln | 西格玛法则 | sigma rules | 以 $\mu\pm k\sigma$ 给经验区间 | 约 68/95/99% [据推断] |
| Prognoseintervall | 预测区间 | prediction interval | 由**已知** $p$ 预测**下次样本**结果范围 | 估"样本结果" |
| Konfidenzintervall | 置信区间 | confidence interval | 由**样本** $h$ 估计**未知** $p$ | 估"总体比例" |
| Sicherheitswahrscheinlichkeit | 置信水平 | confidence level | 如 95% | 方法属性 |
| Stichprobenumfang $n$ | 样本量 | sample size | 由区间长度**反解** $n$ | LK 强项 [已验证] |
| relative Häufigkeit $h$ | 相对频率 | relative frequency | $h=X/n$ | 样本观测值 |
| Erwartungswert $\mu$ | 期望 | expected value | $\mu=n\cdot p$ | 二项分布 |
| Standardabweichung $\sigma$ | 标准差 | standard deviation | $\sigma=\sqrt{n\,p\,(1-p)}$ | 二项分布 |
| halbe Intervallbreite / Fehlermarge | 半宽 / 误差界限 | margin of error | 记作 $e$ | 反解 $n$ 的关键 |
| konservative Abschätzung | 保守估计 | conservative bound | 用 $p(1-p)\le\tfrac14$ | 最坏情形 |

> 条目来源：KLP LK 增量「`Beurteilende Statistik`：`Prognoseintervall`、`Konfidenzintervall`、`Stichprobenumfang`」+ 能力条 (18)「须估算给定置信区间长度所需的样本量」[已验证]；节点 `MA-S4-01`–`03`。

---

## 2. 知识结构 (Struktur)

### 2.1 σ-Regeln（数值锚点，必须先背）

设 $X\sim B(n,p)$，$\mu=np$，$\sigma=\sqrt{np(1-p)}$（适用条件 $\sigma>3$）[据推断]：

| 区间 | 概率（约） | 常用 $z$ |
|---|---|---|
| $\mu\pm 1\sigma$ | 68,3 % | 1,00 |
| $\mu\pm 1{,}64\sigma$ | 90 % | 1,64 |
| $\mu\pm 1{,}96\sigma$ | 95 % | 1,96 |
| $\mu\pm 2{,}58\sigma$ | 99 % | 2,58 |

> *Klausur-Satz*: Für eine binomialverteilte Zufallsgröße liegen etwa 95 % der Ergebnisse im Intervall $[\mu-1{,}96\sigma;\ \mu+1{,}96\sigma]$.

### 2.2 Prognoseintervall（已知 $p$ → 预测样本结果）

给定**真实概率** $p$ 与样本量 $n$：

$$I_{\text{Prognose}}=[\,\mu-z\sigma;\ \mu+z\sigma\,],\qquad \mu=np,\ \sigma=\sqrt{np(1-p)}$$

- 对**绝对次数** $X$：用 $\mu\pm z\sigma$ [据推断]
- 对**相对频率** $h=X/n$：用 $p\pm z\cdot\frac{\sigma}{n}=p\pm z\sqrt{\frac{p(1-p)}{n}}$ [据推断]

> *Klausur-Satz*: Ein Prognoseintervall gibt an, in welchem Bereich die Anzahl bzw. der Anteil der Treffer in einer **künftigen** Stichprobe mit der gewählten Wahrscheinlichkeit liegt.

### 2.3 Konfidenzintervall（样本 $h$ → 估计未知 $p$）

$$I_{\text{Konfidenz}}=\Big[\,h-z\sqrt{\tfrac{h(1-h)}{n}};\ h+z\sqrt{\tfrac{h(1-h)}{n}}\,\Big]$$

- **保守版**（不依赖 $h$，最保险）：用 $p(1-p)\le\frac14$ 得

$$I_{\text{Konfidenz}}^{\text{konservativ}}=\Big[\,h-z\cdot\tfrac{0{,}5}{\sqrt n};\ h+z\cdot\tfrac{0{,}5}{\sqrt n}\,\Big]$$

> *Klausur-Satz*: Ein Konfidenzintervall schätzt den **unbekannten** Anteil $p$ der Gesamtheit aus der beobachteten relativen Häufigkeit $h$.

### 2.4 Stichprobenumfang（反解 $n$）

给定半宽 $e$（$=$ 区间总长 $/2$）与置信水平 $z$：

$$\text{保守：}\quad n\ge\left(\frac{z\cdot 0{,}5}{e}\right)^2 \qquad\text{已知/估计 }p\text{：}\quad n\ge\frac{z^2\,p(1-p)}{e^2}$$

> ⚠️ $n$ 必须为整数且**向上取整** [据推断]。

> *Klausur-Satz*: Soll die halbe Breite des Konfidenzintervalls höchstens $e$ betragen, so gilt für den nötigen Stichprobenumfang $n\ge\left(\frac{z\cdot 0{,}5}{e}\right)^2$.

### 2.5 对比辨别：Prognose vs Konfidenz（头号混淆点）

| 维度 | Prognoseintervall | Konfidenzintervall |
|---|---|---|
| 已知什么 | 总体比例 $p$ **已知** | $p$ **未知** |
| 估计什么 | **未来样本**的结果范围 | **总体**比例 $p$ 的范围 |
| 中心 | $\mu=np$（或 $p$） | 观测值 $h$ |
| 一句话 | 由"真值"推"样本" | 由"样本"推"真值" |

> ⚠️ 判据：题目给的是 $p$ 还是 $h$？给 $p$ ⇒ Prognose；给 $h$ ⇒ Konfidenz。

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：Prognoseintervall（`bestimmen`）

1. 读出 $p$ 与 $n$ —— *KLP 工具：`Binomialverteilung`*
2. 算 $\mu=np$、$\sigma=\sqrt{np(1-p)}$ —— *KLP 工具：`Kenngrößen`*
3. 按置信水平取 $z$（90→1,64 / 95→1,96 / 99→2,58） —— *KLP 工具：`σ-Regeln`*
4. 写 $[\mu-z\sigma;\ \mu+z\sigma]$，整数情形**向内取整** —— *KLP 工具：`Prognoseintervall`*
5. 用情境语言回译 —— *KLP 工具：`deuten`*

> **判据 / 决策点**：问的是**次数**还是**比例**？次数用 $\mu\pm z\sigma$，比例须再除以 $n$。

### 3.2 方法 B：Konfidenzintervall（`bestimmen`）

1. 算 $h=X/n$ —— *KLP 工具：`relative Häufigkeit`*
2. 取 $z$；**不确定 $p$ 时用保守版** $\frac{0{,}5}{\sqrt n}$ —— *KLP 工具：`konservative Abschätzung`*
3. 写 $[h-z\cdot s;\ h+z\cdot s]$ —— *KLP 工具：`Konfidenzintervall`*
4. 回译：以该置信水平，总体比例落在此区间 —— *KLP 工具：`interpretieren`*

> **判据 / 决策点**：若题目要求"最坏情形/不依赖 $h$"，必须用保守版。

### 3.3 方法 C：样本量估算（`bestimmen`，AFB III）

1. 明确目标**半宽** $e$（若给总长 $L$，则 $e=L/2$） —— *KLP 工具：`Intervallbreite`*
2. 代入 $n\ge\left(\frac{z\cdot0{,}5}{e}\right)^2$ —— *KLP 工具：`Ungleichung lösen`*
3. **向上取整** —— *KLP 工具：`Stichprobenumfang`*
4. 结论句：至少调查 $n$ 人 —— *KLP 工具：`beurteilen`*

> **判据 / 决策点**：$e$ 是"半宽"不是"总长"——差 2 倍会把 $n$ 算成 4 倍。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 二项分布的 μ/σ 计算 + 不等式反解（含保守界 $p(1-p)\le\frac14$）

- **技法内容**：中国在"二项分布"单元里系统训练 $E(X)=np$、$D(X)=np(1-p)$，并强调**由不等式反解参数**（"至少需要多少次"的代数化处理）；配合**最值思想**给出 $p(1-p)\le\frac14$（当 $p=\frac12$ 取等）这一保守界，把含 $p$ 的式子替换成与 $p$ 无关的上界。
- **DE-Anschluss**：德国 Q1 已教 `Binomialverteilung` 的 `Kenngrößen`（`Erwartungswert`、`Varianz`、`Standardabweichung`）[已验证]；LK 追加 `σ-Regeln` 与整个 `Beurteilende Statistik` [已验证]。本卡只重组这些工具，不含新知识板块。
- **合规性**：⚠️ 需注意 —— 中国侧**区间估计在高中明显轻量**（多在选修，非高考）[据推断]，因此中国材料**不能提供本块的题型与深度**；只可借用"$\mu/\sigma$ 计算 + 不等式反解 + 保守界"这三件**方法层工具**，题型包装必须按德国 `Prognose-/Konfidenzintervall` 的规范。
- **Abitur 应用**：`bestimmen` 型区间计算（AFB II）；`Stichprobenumfang` 反解与"调查设计是否合理"的评判（AFB III）[据推断]。
- **来源**：`[CN-课标]` 离散型随机变量的均值与方差 · `[CN-教材]` 由不等式反解参数、最值思想 · `[CN-高考]` 二项分布期望方差综合（**原创改写，不搬原题**）

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart II（工具题，计算 + 解释）；简单数值可作免工具小问 [据推断] |
| Operator | `bestimmen` / `berechnen` / `beurteilen` / `deuten`（数学不按动词分 AFB）[已验证] |
| AFB | II（区间计算）→ III（置信水平解释、样本量反解、设计评判）[据推断] |
| 建议分值 / 时长 | 单小问 5–8 BE；整题 15–20 BE / 约 20–30 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`（LK）
> Ein Zufallsgenerator erzeugt mit der Wahrscheinlichkeit $p=0{,}4$ einen Treffer. Er wird $n=500$-mal betätigt.
> Bestimmen Sie ein 95%-Prognoseintervall für die Anzahl der Treffer.

**Aufgabe 2** `[NRW-改编]`（LK）
> Bei einer Umfrage unter $n=800$ zufällig ausgewählten Personen gaben 440 Personen an, das Produkt zu kennen.
> a) Bestimmen Sie die relative Häufigkeit $h$.
> b) Bestimmen Sie ein 95%-Konfidenzintervall für den Anteil $p$ in der Gesamtheit (konservative Abschätzung).

**Aufgabe 3** `[原创]`（LK）
> Ein Meinungsforschungsinstitut möchte den Anteil $p$ mit einer Sicherheitswahrscheinlichkeit von 95 % schätzen.
> Bestimmen Sie den mindestens nötigen Stichprobenumfang, wenn die halbe Breite des Konfidenzintervalls höchstens 3 Prozentpunkte betragen soll.

**Aufgabe 4** `[原创]`（LK，AFB III）
> Eine Zeitung schreibt: „Mit 95 % Wahrscheinlichkeit liegt der wahre Anteil $p$ im Intervall $[0{,}515;\ 0{,}585]$.“
> Beurteilen Sie diese Aussage und formulieren Sie eine fachlich korrekte Deutung.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Kenngrößen**: $\mu=500\cdot0{,}4=200$ ✓ 得分点：$\mu=np$
2. **σ**: $\sigma=\sqrt{500\cdot0{,}4\cdot0{,}6}=\sqrt{120}\approx10{,}95$ ✓
3. **z-Wert**: 95 % ⇒ $z=1{,}96$ ✓ 得分点：取对 $z$
4. **Intervall**: $200\pm1{,}96\cdot10{,}95=200\pm21{,}47$ ⇒ $[178{,}53;\ 221{,}47]$ ✓ 得分点：写出 $\mu\pm z\sigma$
5. **Ergebnis**: Als Prognoseintervall für ganze Trefferzahlen: $[179;\ 221]$. ✓ 得分点：向内取整 + 结论句

**Aufgabe 2**
1. **a) Relative Häufigkeit**: $h=\dfrac{440}{800}=0{,}55$ ✓
2. **b) Konservativ**: $s=\dfrac{0{,}5}{\sqrt{800}}=\dfrac{0{,}5}{28{,}28}\approx0{,}0177$ ✓ 得分点：用 $\frac{0{,}5}{\sqrt n}$
3. **b) z-Wert**: 95 % ⇒ $z=1{,}96$ ✓
4. **b) Intervall**: $0{,}55\pm1{,}96\cdot0{,}0177=0{,}55\pm0{,}0347$ ⇒ $[0{,}515;\ 0{,}585]$ ✓ 得分点：完整区间
5. **b) Deutung**: Mit 95 % Sicherheit überdeckt dieses Verfahren den wahren Anteil $p$; geschätzt gilt $p\in[0{,}515;\ 0{,}585]$. ✓

**Aufgabe 3**
1. **Ansatz**: Gesucht $n$ mit $z\cdot\dfrac{0{,}5}{\sqrt n}\le e$ mit $e=0{,}03$, $z=1{,}96$ ✓ 得分点：列出不等式
2. **Umformen**: $\sqrt n\ge\dfrac{1{,}96\cdot0{,}5}{0{,}03}=\dfrac{0{,}98}{0{,}03}\approx32{,}67$ ✓ 得分点：代数反解
3. **Quadrieren**: $n\ge32{,}67^2\approx1067{,}1$ ✓
4. **Aufrunden**: $n\ge1068$ ⇒ Es müssen mindestens **1068** Personen befragt werden. ✓ 得分点：向上取整 + 结论句

**Aufgabe 4**
1. **Kritik**: Die 95 % beziehen sich auf das **Verfahren**, nicht auf das bereits berechnete, feste Intervall. ✓ 得分点：区分 Verfahren vs Einzelintervall
2. **Korrekte Deutung**: Bei sehr vielen Stichproben würden etwa 95 % der so konstruierten Intervalle den wahren Anteil $p$ enthalten. ✓
3. **Fachlicher Fehler der Zeitung**: Der Ausdruck „mit 95 % Wahrscheinlichkeit liegt $p$ in $[0{,}515;0{,}585]$“ ist **missverständlich**, weil $p$ eine feste (unbekannte) Zahl ist und das konkrete Intervall sie entweder überdeckt oder nicht. ✓ 得分点：`beurteilen` 必须给理由
4. **Ergänzung**: Zusätzlich fehlt der Hinweis auf die Stichprobe ($n=800$) und die Umfrageumstände. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | **Prognose- 与 Konfidenzintervall 混用**（已知 $p$ / 未知 $p$ 看反） | 方法判据：给 $p$ ⇒ Prognose，给 $h$ ⇒ Konfidenz |
| 辨别错 | 把置信水平解释成"总体比例有 95% 概率落在该区间" | 方法 B 步骤 4：置信水平是**方法属性** |
| 知识错 | 保守估计忘记用 $p(1-p)\le\frac14$，直接代入 $h$ | 方法 B 步骤 2 |
| 知识错 | 样本量反解把**总长**当半宽（差 2 倍 → $n$ 差 4 倍） | 方法 C 步骤 1 |
| 知识错 | $n$ 算出小数不向上取整 | 方法 C 步骤 3 |
| 表达错 | 区间端点不向内取整（次数题） | 方法 A 步骤 4 |
| 表达错 | 结果不回译情境、不写"以 95% 置信水平" | 结论句含情境与置信水平 |

---

## 7. Vernetzung

- **上游**：`MA-S3-01` 二项分布与 Kenngrößen（[`Stochastik-Q1-Baumdiagramm-bis-Binomialverteilung.md`](Stochastik-Q1-Baumdiagramm-bis-Binomialverteilung.md)）· `MA-S3-03` σ-Regeln
- **下游**：`MA-S5-01`/`MA-S5-03` 正态分布（连续版区间估计；[`Normalverteilung-und-Verteilungsfunktion-als-Integralfunktion.md`](Normalverteilung-und-Verteilungsfunktion-als-Integralfunktion.md)）[已验证]
- **横向**：`Modellieren` 四段闭环（抽样设计 = 现实情境题；[`Mathe-ZKE-2027-Training.md`](Mathe-ZKE-2027-Training.md)）· 政治/社科（民调解读）
- **术语卡**：`Prognoseintervall` / `Konfidenzintervall` / `Sicherheitswahrscheinlichkeit` / `Stichprobenumfang` / `konservative Abschätzung` / `relative Häufigkeit`（建议由主线程补入 Q2 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬原题），解析为原创。不搬运出版社教辅原文。
