---
fach: Bio
thema: "Molekulargenetik und Zentraldogma (分子遗传与中心法则)"
operatoren: [beschreiben, darstellen, erklaeren, begruenden, vergleichen, skizzieren, ermitteln]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Bio, Genetik]
stufe: "Q1"
kursart: "GK|LK"
---

# Molekulargenetik und Zentraldogma (分子遗传与中心法则)

> **中文理解**：本笔记对应 Q 阶段 IF5 `Genetik und Evolution` 的第一块 `Molekulargenetische Grundlagen`——DNA 结构、半保留复制（`semikonservative Replikation`）、转录（`Transkription`）、翻译（`Translation`）。这是德国 Q 阶段四个 IF 中 **Genetik/Evolution 断层**的入口笔记：EF 只把遗传学到「细胞层」（Meiose/Rekombination/Karyogramm），分子层机制是**从零起桥**。考试里它以「描述过程 + 解释机制 + 序列推演」三类形态出现，主战场是 **AFB II**（`erklaeren` / `begruenden` / `darstellen`）。
>
> **Klausur-Relevanz**：中心法则是一切下游（基因调控、突变、遗传病、演化）的公共底座；DNA 序列推演题是 GK/LK **共同必考**的基本盘 [已验证，Bio-Oberstufe.md §2 IF5]。

---

## 0. ⚠️ EF-Anschluss：断层定位与起桥（本笔记的核心任务）

> **断层判定**：EF 唯一 IF `Zellbiologie` 已含 `Meiose` / `Rekombination` / `Karyogramm`，但这些只到**细胞层（染色体行为）**；Q 的分子遗传要求**分子层（碱基与信息流）**。二者**不是同一条连续台阶**，须显式搭桥 [据推断，Bio-DE-CN-Mapping §0.4]。

| EF 已有节点（细胞层） | 分子层对应（本笔记） | 桥的性质 |
|---|---|---|
| `Meiose`：同源染色体分离、姐妹染色单体分离 | 分离的**分子底物**是 DNA 双链的精确复制与分配 | 🔴 需补「复制如何保证准确」 |
| `Rekombination`：自由组合 + 交叉互换 | 交叉互换的**分子本质**是 DNA 链断裂与重接 | 🟡 概念可迁移 |
| `Karyogramm` / `Genommutationen` | 染色体的**组成物质**是 DNA + 蛋白质 | 🟢 直接衔接 |
| `Analyse von Familienstammbäumen`（EF 方法） | 系谱→基因型→**基因产物（蛋白质）**的因果链 | 🟢 下游直接使用 |

> *Klausur-Satz*: Die Meiose (EF) beschreibt die Verteilung der Chromosomen auf zellulärer Ebene; die Molekulargenetik erklärt, **wie** diese Chromosomen auf molekularer Ebene kopiert und in Information umgesetzt werden. [据推断]

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `Desoxyribonukleinsäure (DNA)` | 脱氧核糖核酸 | DNA | 双螺旋，两条**反向平行**的核苷酸链 | Q 阶段公共底座 [已验证] |
| `Nukleotid` | 核苷酸 | nucleotide | 磷酸 + 脱氧核糖 + 碱基（A/T/G/C） | 单体单位 [据推断] |
| `Basenpaarung` | 碱基配对 | base pairing | A=T（2 氢键）、G≡C（3 氢键） | 复制准确性的分子基础 [已验证] |
| `semikonservative Replikation` | 半保留复制 | semiconservative replication | 每条子链含一条旧链 + 一条新链 | KLP 明文 [已验证] |
| `Replikationsgabel` | 复制叉 | replication fork | 双链解开形成 Y 形区域 | [据推断] |
| `Helicase` | 解旋酶 | helicase | 打开双链、断开氢键 | [据推断] |
| `DNA-Polymerase` | DNA 聚合酶 | DNA polymerase | 沿模板合成新链（5'→3'） | 方向性是失分点 [据推断] |
| `Leitstrang / Folgestrang` | 前导链 / 后随链 | leading / lagging strand | 连续合成 / 分段合成 | [据推断] |
| `Okazaki-Fragmente` | 冈崎片段 | Okazaki fragments | 后随链上的短片段 | [据推断] |
| `Transkription` | 转录 | transcription | DNA → mRNA，RNA 聚合酶催化 | KLP 明文 [已验证] |
| `Matrizenstrang` | 模板链 | template strand | 被读取、与 mRNA 互补的那条链 | ⚠️ 易与编码链混淆 |
| `codogener Strang` | 编码链 | coding strand | 与 mRNA 序列相同（T→U） | [据推断] |
| `Spleißen` | 剪接 | splicing | 切除内含子、连接外显子 | 真核特有 [据推断] |
| `Translation` | 翻译 | translation | mRNA → 多肽，核糖体完成 | KLP 明文 [已验证] |
| `Codon / Anticodon` | 密码子 / 反密码子 | codon / anticodon | mRNA 三联体 / tRNA 三联体，互补配对 | [据推断] |
| `genetischer Code` | 遗传密码 | genetic code | 简并性、通用性、无重叠 | 64 密码子编码 20 氨基酸 |
| `Meselson-Stahl-Experiment` | 梅塞尔森-斯塔尔实验 | Meselson–Stahl experiment | 用 ¹⁵N 密度梯度证明半保留复制 | 证据链经典 |

---

## 2. 知识结构 (Struktur)

### 2.1 Bau der DNA —— 结构决定功能

中文：DNA 由两条**反向平行**的核苷酸链构成双螺旋；碱基**互补配对**（A=T、G=C）使一条链可作另一条的模板，这是「复制准确」与「信息存储」的结构前提（Basiskonzept `Struktur und Funktion`）。

> *Klausur-Satz*: Die komplementäre Basenpaarung (A=T, G≡C) und der antiparallele Aufbau der Doppelhelix sind die strukturelle Voraussetzung für die **fehlerarme Verdopplung** und die **Speicherung der Erbinformation**. [据推断]

### 2.2 Semikonservative Replikation —— 半保留复制

中文：复制时双链在 `Helicase` 作用下解开，各自作模板；`DNA-Polymerase` 沿 5'→3' 方向合成新链。前导链连续合成，后随链分段合成（冈崎片段）再由连接酶接合。结果：每个子代 DNA 含**一条旧链 + 一条新链**——即「半保留」。

> *Klausur-Satz*: Bei der semikonservativen Replikation dient jeder der beiden Stränge als Matrize; jede Tochter-DNA enthält daher **einen alten und einen neuen Strang**. [已验证]

**证据链（Meselson-Stahl）**：¹⁵N 标记的细菌转入 ¹⁴N 培养基 → 第一代全部为「中间密度」带，第二代出现「中间 + 轻」两条带 → 排除全保留与弥散复制 [据推断]。

### 2.3 Transkription —— 转录（DNA → mRNA）

中文：`RNA-Polymerase` 结合 `Promotor`，解开局部双链；以 `Matrizenstrang` 为模板，按互补规则合成 mRNA（A→U、T→A、G→C、C→G）。真核中前体 mRNA 需经 `Spleißen`（去内含子）等加工后出核。

> *Klausur-Satz*: Bei der Transkription wird der **Matrizenstrang** der DNA komplementär in mRNA umgeschrieben; anstelle von Thymin tritt **Uracil**. [据推断]

### 2.4 Translation —— 翻译（mRNA → 多肽）

中文：核糖体结合 mRNA，`tRNA` 以其 `Anticodon` 与 `Codon` 互补配对，逐个带入氨基酸并形成肽键；从 `Startcodon`（AUG）开始，到 `Stoppcodon` 结束。遗传密码具**简并性**（多个密码子对应同一氨基酸）。

> *Klausur-Satz*: Die Translation erfolgt am Ribosom: Die **Anticodon** der tRNA paart sich mit dem **Codon** der mRNA; die Aminosäuren werden durch Peptidbindungen verknüpft. [据推断]

### 2.5 Zentraldogma —— 中心法则

中文：信息流 `DNA → RNA → Protein`。DNA 通过复制自我保存，通过转录—翻译表达为蛋白质；蛋白质（及 RNA）决定表型。

> *Klausur-Satz*: Nach dem **Zentraldogma** fließt die genetische Information von der DNA über die RNA zum Protein (DNA → mRNA → Protein). [据推断]

---

## 3. 解题方法 (Methoden)

### 3.1 「信息流三栏法」——DNA 序列推演（GK/LK 共同必考）

**编号步骤**：
1. **判链向与配对**：确认给出的链是 `Matrizenstrang` 还是 `codogener Strang`。—— *KLP 工具：`Basenpaarung`*
2. **写 mRNA**：若给模板链 → 互补（A→U、T→A、G→C、C→G）；若给编码链 → 仅把 T 换成 U。—— *KLP 工具：`Transkription`*
3. **查表译码**：从 `Startcodon` AUG 起，按**三联体**分组，查密码子表得氨基酸序列，遇 `Stoppcodon` 停止。—— *KLP 工具：`Translation` + `genetischer Code`*
4. **写结论句**：说明方向（5'→3'）与终止位置。—— *KLP 工具：`darstellen` 的结构化要求*

> **判据 / 决策点**：题面若未说明给的是哪条链，**先假设为模板链并写出依据**；若结果不含起始密码子，则改用编码链口径，并在答案中明示假设。

### 3.2 「机制解释四问」——解释复制/转录/翻译

**编号步骤**：
1. **场所**：细胞核 / 细胞质 / 核糖体。—— *KLP 工具：`Kompartimentierung`（EF 已教）*
2. **模板与酶**：以什么为模板、由什么酶催化。—— *KLP 工具：`DNA-Polymerase` / `RNA-Polymerase`*
3. **配对规则**：逐条写出碱基互补关系。—— *KLP 工具：`Basenpaarung`*
4. **产物与方向**：写出产物、链向与起点终点。—— *KLP 工具：`darstellen`*

> **判据 / 决策点**：题目出现 `begruenden` 时，必须**把机制回扣到结构**（如「因为碱基互补，所以复制能准确」），不可只复述过程。

### 3.3 与遗传计算的接口

若题目由序列推演转向「基因型 → 表型概率」，改用 [`CN-Bio-Genetik-Rechenschema.md`](CN-Bio-Genetik-Rechenschema.md) 的**三步程序（分离 → 组合 → 配子）**：先分离每对等位基因，再组合，最后算配子概率。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 中心法则链条推演 + 碱基配对定量

- **技法内容**：把中心法则做成**固定链条**（DNA 双链 → 模板链 → mRNA → 密码子 → tRNA 反密码子 → 氨基酸），每一环只做**一种运算**（互补 or 三联体分组）；配套「碱基配对计算」——已知某链碱基数求互补链/mRNA 的碱基比例（A+G = T+C 类关系）。来源：`[CN-课标]` 必修2 3.1.2–3.1.4 + `[CN-高考]` 高频题型。[据推断]
- **DE-Anschluss**：`Bau der DNA` · `semikonservative Replikation` · `Transkription` · `Translation`（**均为 Q-Genetik 明文条目**，GK/LK 共同）[已验证]。链条推演用到的「碱基互补」与「三联体」都是德国官方术语，**零新增知识**。
- **合规性**：✅ 完全合规 —— 引入的是**推演工序**，不是新知识块；且德国本身要求「描述过程 + 序列推演」。
- **⚠️ 分层差异**：若题目涉及**分子生物学方法**（PCR / 电泳 / 基因工程）来获得或验证序列，则**仅 LK 合规**——GK 的 Genetik 段落**无任何 `Fachliche Verfahren`** [已验证，Bio-Oberstufe.md §2 IF5]。**GK 考生不得复习方法层**。
- **Abitur 应用**：Aufgabenart I 材料题（给一段 DNA 序列要求推导 mRNA 与多肽）；AFB I（写序列）+ AFB II（解释机制）。
- **来源**：`[CN-课标]` + `[CN-高考]`

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（配 DNA 序列 / 复制示意图 / 实验数据）[已验证，KLP Kap. 4] |
| Operator | `beschreiben` · `darstellen` · `erklaeren` · `begruenden` · `ermitteln` |
| AFB | I（序列/结构复述）→ **II（机制解释与推演，重心）** |
| 建议分值 / 时长 | 3 题约 20–25 BE，约 25–30 min（GK 255 min / LK 300 min，4 选 3）[已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Abschnitt des **Matrizenstrangs** der DNA lautet: `3'-T A C G G A T C C A T T-5'`.
> a) Ermitteln Sie die Basensequenz der zugehörigen mRNA und geben Sie die Leserichtung an.
> b) Beschreiben Sie, welche Rolle die komplementäre Basenpaarung für die Genauigkeit der Transkription spielt.

**Aufgabe 2** `[NRW-改编]`
> Das Meselson-Stahl-Experiment zeigte nach einer Generation in ¹⁴N-Medium eine einzige Bande mittlerer Dichte, nach zwei Generationen zwei Banden (mittlere und leichte Dichte).
> Erklären Sie, warum diese Befunde die **semikonservative** Replikation belegen und die **konservative** ausschließen.

**Aufgabe 3** `[原创]`
> Vergleichen Sie Replikation und Transkription hinsichtlich (1) der verwendeten Matrize, (2) des Produkts und (3) des verwendeten Enzyms. Begründen Sie anschließend, warum die Translation erst am Ribosom und nicht im Zellkern erfolgt.

**Aufgabe 4** `[CN-改编]`
> Ein DNA-Doppelstrang enthält in einem Abschnitt 30 % Adenin.
> a) Berechnen Sie den Anteil der Base Guanin in diesem Abschnitt.
> b) Begründen Sie Ihr Ergebnis mit der Basenpaarungsregel.

### 5.3 Musterlösung

**Aufgabe 1**
1. **判断链**：题干明示为 `Matrizenstrang` → 直接互补配对。✓ 得分点
2. **写 mRNA**：A→U、T→A、G→C、C→G，得 `5'-A U G C C U A G G U A A-3'`。✓ 得分点（U 取代 T；写出 5'→3'）
3. **读向**：mRNA 由 5' 向 3' 阅读。✓
4. **互补配对的作用**：Da die Basenpaarung eindeutig ist (A–U, G–C), wird jede Matrizenbase eindeutig in eine mRNA-Base übersetzt; dadurch ist die Sequenz **reproduzierbar und fehlerarm**. ✓ 得分点（回扣「准确性」）

**Aufgabe 2**
1. **第一代**：Alle DNA-Moleküle enthalten nach **einer** Replikation je **einen alten (¹⁵N-) und einen neuen (¹⁴N-)Strang** → einheitliche **mittlere** Dichte. ✓ 得分点
2. **第二/三代**：Da sich die neuen Stränge erneut als Matrize verdoppeln, entstehen zusätzlich Moleküle aus **zwei neuen** Strängen → **leichte** Bande. ✓ 得分点
3. **排除全保留**：Bei konservativer Replikation müsste sofort eine **schwere** und eine **leichte** Bande nebeneinander auftreten — das wurde **nicht** beobachtet. ✓ 得分点（对反例的否定）
4. **收尾**：Damit ist nur die **semikonservative** Replikation mit den Daten vereinbar. ✓

**Aufgabe 3**
1. **Matrize**：Replikation nutzt **beide** Stränge als Matrize; Transkription nutzt nur den **Matrizenstrang**. ✓
2. **Produkt**：Replikation → DNA-Doppelstrang; Transkription → **mRNA** (Einzelstrang). ✓
3. **Enzym**：Replikation → **DNA-Polymerase**; Transkription → **RNA-Polymerase**. ✓ 得分点（三栏成对给差异）
4. **Ribosom**：Die Translation erfolgt am Ribosom im **Zytoplasma**, weil die mRNA den Zellkern verlässt und die Ribosomen dort lokalisiert sind; im Zellkern fehlt die Translationsmaschinerie. ✓ 得分点（回扣 `Kompartimentierung`）

**Aufgabe 4**
1. **分离**：Nach der Basenpaarung gilt A = T, also T = 30 %. ✓
2. **组合**：A + T = 60 %, daher G + C = 40 %. ✓ 得分点（用 100 % 减）
3. **结果**：Da G = C, ist **G = 20 %**. ✓
4. **依据句**：Die Rechnung beruht auf der komplementären Basenpaarung (A=T, G≡C) im Doppelstrang. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 混淆 `Matrizenstrang` 与 `codogener Strang` | 先判链名再动笔；模板链与 mRNA **互补**，编码链与 mRNA **相同（T→U）** |
| 知识错 | 转录时仍写 T 而不写 U | 牢记 mRNA 用 **Uracil** 取代 Thymin |
| 知识错 | 忽略 `DNA-Polymerase` 的 5'→3' 方向，导致后随链写错 | 明写方向；后随链是**分段**合成（Okazaki） |
| 表达错 | 把「半保留」写成「全保留」或「弥散」 | 一句话锚定：**一条旧链 + 一条新链** |
| 表达错 | 只复述过程，不写「为什么」（`begruenden` 失分） | 每个机制句末尾回扣**结构**（碱基互补 → 准确） |

---

## 7. Vernetzung

- **上游**：[`Meiose-und-Rekombination.md`](Meiose-und-Rekombination.md)（EF 细胞层起点）· [`Zellbiologie-Grundlagen.md`](Zellbiologie-Grundlagen.md)
- **下游**：[`Genregulation-und-Epigenetik.md`](Genregulation-und-Epigenetik.md) · [`Genmutationen-und-Erbkrankheiten.md`](Genmutationen-und-Erbkrankheiten.md) · [`LK-Krebs-Humanevolution-Methoden.md`](LK-Krebs-Humanevolution-Methoden.md)
- **横向**：[`CN-Bio-Genetik-Rechenschema.md`](CN-Bio-Genetik-Rechenschema.md)（序列推演 → 概率推演）· `03_Mathe/` 概率统计
- **Basiskonzept**：`Information und Kommunikation`（第 3 轴）· `Struktur und Funktion`（第 1 轴）
- **术语卡**：`semikonservative Replikation` · `Transkription` · `Translation` · `Matrizenstrang` · `Codon` · `Zentraldogma`

---

> **来源标注说明**：`[已验证]` = 已核对官方源（KLP Heft 4722 / Operatoren ab 2025）· `[据推断]` = 基于官方条目或项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
