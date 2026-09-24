---
fach: Mathe
thema: "Stochastik Q1: Baumdiagramm bis Binomialverteilung"
operatoren: [berechnen, bestimmen, beschreiben, deuten, beurteilen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Mathe, Stochastik]
stufe: "Q1"
---

# Stochastik Q1: vom Baumdiagramm zur Binomialverteilung (从树图到二项分布)

> **中文理解**：S 域在 EF **完全不存在**，Q1 直接以"多阶段随机试验 + 条件概率"起步 [已验证]，所以这不是难度断层，而是**领域从零开始**。
> Q1-S 主干为：`Urnenmodelle` → `Baumdiagramm` / `Vierfeldertafel` → `bedingte Wahrscheinlichkeiten` → `Erwartungswert`/`Varianz`/`σ` → `Binomialverteilung` [已验证]。
> 德国把树图（正向）与四格表做成**固定工具**；`Binomialverteilung` 是 **GK 的 S 域顶点**（GK 清单止于此）[已验证]。
> LK 在 Q2 追加 `Binomialkoeffizient`、`σ-Regeln`、判断统计与正态分布。
>
> **Klausur-Relevanz**：S 域入门必考（AFB I–II）；条件概率与二项分布是 2. Prüfungsteil 的常规大题。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Mehrstufiges Zufallsexperiment | 多阶段随机试验 | multistage experiment | 由若干阶段依次构成 | Q1 起点 [已验证] |
| Urnenmodell | 瓮模型 | urn model | 有/无放回抽样 | 有放回→独立 |
| Baumdiagramm | 树图 | tree diagram | 正向：阶段→结果 | 德国固定工具 |
| Pfadregeln | 路径法则 | path rules | 相乘（路径）；相加（互斥） | 树图计算核心 |
| Vierfeldertafel | 四格表 | two-way table | 两步试验的表征 | 与树图可互译 |
| Bedingte Wahrscheinlichkeit | 条件概率 | conditional probability | $P(A\mid B)=\dfrac{P(A\cap B)}{P(B)}$ | 高发混淆点 |
| Erwartungswert | 期望 | expected value | $\mu=\sum x_i\cdot P(X=x_i)$ | 加权平均 |
| Varianz / Standardabweichung | 方差 / 标准差 | variance / sd | $\sigma=\sqrt{\sum (x_i-\mu)^2P(X=x_i)}$ | σ 回原单位 |
| Binomialverteilung | 二项分布 | binomial distribution | $P(X=k)=\binom{n}{k}p^k(1-p)^{n-k}$ | GK 顶点 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 树图与四格表的互译（先行组织者）

- **树图适合多步**：每一层是一个阶段，路径概率沿路**相乘**，互斥路径**相加** [已验证]
- **四格表适合两步**：行是条件、列是结果（或反之），适合"已知结果反推来源"
- 遇到"正算容易反推难"时，**先换表征**（`Darstellungswechsel`，KLP 点名的 13 条启发式策略之一）[已验证]

> *Klausur-Satz*: Baumdiagramm und Vierfeldertafel sind zwei Darstellungen desselben mehrstufigen Zufallsexperiments; die Pfadregeln liefern die rechnerische Grundlage.

### 2.2 条件概率的方向（头号辨别点）

$P(A\mid B)$ 与 $P(B\mid A)$ **完全不同**：
- $P(A\mid B)$：在 $B$ 已发生的条件下 $A$ 的概率，分母是 $P(B)$
- 反向推断（已知结果，反推来源）：先用**全概率**（各路径乘积累加）得结果概率，再用**比值**分配回各路径

> *Klausur-Satz*: Bei bedingten Wahrscheinlichkeiten ist genau zu prüfen, welche Bedingung bereits bekannt ist; $P(A\mid B)$ und $P(B\mid A)$ sind im Allgemeinen verschieden.

### 2.3 二项分布的四个前提（伯努利四条件检查清单）

1. **n 次固定**试验
2. 每次只有**两个结果**（成功/失败）
3. 各次**独立**
4. 成功概率 $p$ **恒定**

> ⚠️ 不检查这四条就套用二项分布，是本项目预判的 S 域头号"知识错"。

> *Klausur-Satz*: Die Binomialverteilung setzt $n$ unabhängige Bernoulli-Versuche mit konstanter Trefferwahrscheinlichkeit $p$ voraus.

### 2.4 GK/LK 分界

| 内容 | GK | LK |
|---|---|---|
| 树图 / 四格表 / 条件概率 | ✅ | ✅ |
| Kenngrößen（EW/Var/σ） | ✅ | ✅ |
| 二项分布（Kenngrößen + Histogramme） | ✅（顶点）[已验证] | ✅ |
| `Binomialkoeffizient`（组合意义 + 无工具计算） | ❌ | ✅ [已验证] |
| `σ-Regeln` | ❌ | ✅（Q2）[已验证] |

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：树图四步法

1. 判定阶段数，画树（**务必画在卷面上**，是过程分） —— *KLP 工具：`Baumdiagramm`*
2. 每阶段标注概率（无放回时更新分母） —— *KLP 工具：`Urnenmodell`*
3. 沿路径相乘得路径概率 —— *KLP 工具：`Pfadregeln`（乘积）*
4. 互斥路径相加得事件概率 —— *KLP 工具：`Pfadregeln`（求和）*

> **判据 / 决策点**：无放回 → 各阶段概率改变，**不能**直接用二项分布。

### 3.2 方法 B：条件概率 / 反向推断（四格表法）

1. 画四格表，填已知的**联合**与**边际**值 —— *KLP 工具：`Vierfeldertafel`*
2. 求条件概率：$P(A\mid B)=\frac{\text{Zelle}}{P(B)}$ —— *KLP 工具：`bedingte Wahrscheinlichkeit`*
3. 反向推断：先求结果的总概率（分母），再用"来源路径概率 / 总概率"分配

> **判据 / 决策点**：题目问"已知……，求……"→ 条件概率；问"某结果更可能来自哪条路径"→ 反向推断。

### 3.3 方法 C：二项分布识别与计算

1. 用**伯努利四条件**检查是否可用二项分布 —— *KLP 工具：`Binomialverteilung`*
2. 读出 $n$（试验次数）与 $p$（成功概率） —— *KLP 工具：`Binomialverteilung`*
3. 求"恰好 $k$ 次"用公式；求"至多/至少"用累加或补事件
4. 算 $\mu=n p$、$\sigma=\sqrt{n p(1-p)}$ —— *KLP 工具：`Kenngrößen`*

> **判据 / 决策点**：`genau k` vs `höchstens k` vs `mindestens k` 三种问法的累加范围必须写清。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 全概率与"反向树图"（条件概率的系统化）

- **技法内容**：德国的树图是**正向**的。补上半步：当题目问"已知结果，反推它是哪条路径来的"时，先用**全概率公式**把各路径的概率乘积累加得到结果概率，再用**比值**把概率按比例分配回各路径。四格表与树图可互相译写——四格表适合两步、树图适合多步。
- **DE-Anschluss**：GK 已教 `mehrstufige Zufallsexperimente`、`Baumdiagramm`、`Vierfeldertafel`、`bedingte Wahrscheinlichkeiten`、`Pfadregeln` [已验证]。全概率**就是路径概率的求和**，是 `Pfadregeln` 的直接推论，无需新概念。
- **合规性**：✅ 完全合规 —— 纯属既有工具的系统化编排；且"换一种表征再算"正好落在 KLP 的 `Darstellungswechsel` [已验证]。
- **Abitur 应用**：S 域 AFB II 高频情境（质量检验、故障溯源）；末段常接 AFB III 的"结果解释 / 模型评判"；Aufgabenart I 亦可用（数值设计为整除）。
- **来源**：`[CN-课标]` 条件概率、乘法公式、全概率公式 · `[CN-教材]` 树图与表格互译 · `[CN-高考]` 全概率与条件概率综合

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | 工具题（2. Prüfungsteil）为主；整除数值可入免工具段 [据推断] |
| Operator | `berechnen` / `bestimmen` / `deuten` / `beurteilen`（数学不按动词分 AFB）[已验证] |
| AFB | I–II 为主；末段"结果解释"可到 III [据推断] |
| 建议分值 / 时长 | 大题 15–25 BE [据推断] |

### 5.2 训练题

**Aufgabe 1** `[原创]`
> Eine Urne enthält 5 rote und 3 blaue Kugeln. Es werden **ohne Zurücklegen** zwei Kugeln gezogen.
> a) Zeichnen Sie ein Baumdiagramm und geben Sie alle Pfadwahrscheinlichkeiten an.
> b) Berechnen Sie die Wahrscheinlichkeit, dass beide Kugeln rot sind.
> c) Berechnen Sie die Wahrscheinlichkeit, dass mindestens eine Kugel blau ist.

**Aufgabe 2** `[NRW-改编]`
> In einer Fertigung sind erfahrungsgemäß 4 % der Bauteile fehlerhaft. Ein Prüfgerät schlägt bei einem fehlerhaften Bauteil mit 90 % Wahrscheinlichkeit Alarm, bei einem fehlerfreien Bauteil irrtümlich mit 5 %.
> a) Erstellen Sie eine Vierfeldertafel.
> b) Bestimmen Sie die Wahrscheinlichkeit, dass das Gerät Alarm schlägt.
> c) Beurteilen Sie, mit welcher Wahrscheinlichkeit ein Bauteil, bei dem Alarm ausgelöst wurde, tatsächlich fehlerhaft ist.

**Aufgabe 3** `[原创]`
> Ein Würfel wird 10-mal geworfen; "Erfolg" sei eine Sechs.
> a) Begründen Sie, dass die Anzahl der Sechsen binomialverteilt ist, und geben Sie $n$ und $p$ an.
> b) Berechnen Sie $P(X=3)$ und $P(X\geq 1)$.
> c) Bestimmen Sie Erwartungswert und Standardabweichung.

**Aufgabe 4** `[原创]`（AFB III 评判）
> Ein Schüler behauptet: "Bei 10 Würfen mit einem fairen Würfel erwarte ich genau 2 Sechsen, also ist 2 das wahrscheinlichste Ergebnis."
> Beurteilen Sie diese Aussage.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Baum**: 1. Zug $P(R)=\frac58$, $P(B)=\frac38$; 2. Zug ohne Zurücklegen: nach $R$: $P(R)=\frac47$, $P(B)=\frac37$; nach $B$: $P(R)=\frac57$, $P(B)=\frac27$ ✓ 得分点：分母更新
2. **Pfade**: $P(RR)=\frac58\cdot\frac47=\frac{20}{56}=\frac{5}{14}$; $P(RB)=\frac58\cdot\frac37=\frac{15}{56}$; $P(BR)=\frac38\cdot\frac57=\frac{15}{56}$; $P(BB)=\frac38\cdot\frac27=\frac{6}{56}=\frac{3}{28}$ ✓
3. **b) beide rot**: $P(RR)=\frac{5}{14}$ ✓
4. **c) mind. eine blau**: $1-P(RR)=1-\frac{5}{14}=\frac{9}{14}$ ✓ 得分点：补事件（比逐路径相加快）

**Aufgabe 2**
1. **Vierfeldertafel** (F = fehlerhaft, A = Alarm): $P(F)=0{,}04$, $P(\bar F)=0{,}96$; $P(A\mid F)=0{,}9$, $P(A\mid\bar F)=0{,}05$ ✓
2. **Zellen**: $P(F\cap A)=0{,}04\cdot0{,}9=0{,}036$; $P(F\cap\bar A)=0{,}004$; $P(\bar F\cap A)=0{,}96\cdot0{,}05=0{,}048$; $P(\bar F\cap\bar A)=0{,}912$ ✓ 得分点：四格齐全
3. **b) Alarm**: $P(A)=0{,}036+0{,}048=0{,}084$ ✓ 得分点：全概率（路径相加）
4. **c) Rückwärts**: $P(F\mid A)=\dfrac{P(F\cap A)}{P(A)}=\dfrac{0{,}036}{0{,}084}\approx0{,}4286\approx42{,}9\%$ ✓ 得分点：分母用全概率
5. **Beurteilung**: Obwohl das Gerät bei fehlerhaften Teilen sehr zuverlässig ist, ist ein Alarm nur in ca. 43 % der Fälle ein echter Fehler — wegen der geringen Grundwahrscheinlichkeit. ✓ 得分点：`beurteilen` 必须给理由

**Aufgabe 3**
1. **a) Begründung**: 10 unabhängige Würfe, je zwei Ergebnisse (Sechs / keine Sechs), konstante Trefferwahrscheinlichkeit $p=\frac16$ ⇒ Binomialverteilung mit $n=10$, $p=\frac16$. ✓ 得分点：四条件
2. **b)** $P(X=3)=\binom{10}{3}\left(\frac16\right)^3\left(\frac56\right)^7\approx0{,}155$ ✓
3. $P(X\geq1)=1-P(X=0)=1-\left(\frac56\right)^{10}\approx0{,}838$ ✓
4. **c)** $\mu=n p=10\cdot\frac16=\frac53\approx1{,}67$; $\sigma=\sqrt{np(1-p)}=\sqrt{10\cdot\frac16\cdot\frac56}=\sqrt{\frac{50}{36}}\approx1{,}18$ ✓ 得分点：σ 带公式

**Aufgabe 4**
1. **Prüfung**: Der Erwartungswert ist $\mu=\frac53\approx1{,}67$, also **nicht** ganzzahlig; der Erwartungswert muss kein möglicher Wert sein. ✓
2. **Vergleich**: $P(X=1)=\binom{10}{1}\left(\frac16\right)\left(\frac56\right)^9\approx0{,}323$; $P(X=2)=\binom{10}{2}\left(\frac16\right)^2\left(\frac56\right)^8\approx0{,}291$; $P(X=1)>P(X=2)$. ✓ 得分点：数值对照
3. **Fazit**: Die Aussage ist falsch: Der Erwartungswert ist keine "wahrscheinlichste Anzahl"; tatsächlich ist $X=1$ am wahrscheinlichsten. ✓ 得分点：`beurteilen` 结论

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | $P(A\mid B)$ 与 $P(B\mid A)$ 分子分母颠倒（**头号错误**） | 方法 B：先问"哪个条件已知" |
| 辨别错 | 无放回时仍按独立事件相乘 | 判据：无放回 → 分母逐阶段改变 |
| 知识错 | 不检查伯努利四条件就套二项分布 | 每次先写四条件检查清单（2.3） |
| 知识错 | 把期望当成"最可能值" | 记住反例：期望可非整数（Aufgabe 4） |
| 表达错 | 树图不画、只写算式 → 过程分丢失 | 树图务必画在卷面（方法 A 第 1 步） |

---

## 7. Vernetzung

- **上游**：EF **无 S**（领域从零开始）[已验证]；数学基础为 Q1 代数运算与 `LGS`
- **下游**：`MA-S1-05` 全概率与反向推断 · `MA-S2-*` 特征量与分布 · `MA-S3-01` 二项分布（GK 顶点）· `MA-S3-02` 二项系数（LK）· `MA-S3-03` σ-Regeln（LK）· `MA-S4-*` 判断统计（LK）· `MA-S5-02` 分布函数即积分函数（S⇄A）
- **横向**：与 A 域 `Integralfunktion` 在 Q2 相接（S⇄A 唯一显式交叉点）[已验证]；口试 ≥2 IF 的天然素材
- **术语卡**：`Baumdiagramm` / `Vierfeldertafel` / `Pfadregeln` / `bedingte Wahrscheinlichkeit` / `Binomialverteilung` / `Erwartungswert` / `Standardabweichung`（建议由主线程补入 Q1 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（情境避开医学敏感表述），解析为原创。不搬运出版社教辅原文。
