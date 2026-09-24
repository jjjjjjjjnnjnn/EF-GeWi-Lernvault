---
fach: Bio
thema: "CN-Methode: Genetik-Rechenschema (遗传计算三步程序)"
operatoren: [ermitteln, begruenden, berechnen, auswerten, erklaeren, beurteilen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Bio, Genetik]
stufe: "EF"
kursart: "GK|LK"
---

# CN-Methode: Genetik-Rechenschema (遗传计算三步程序)

> **中文理解**：这是**中国技法专项**笔记（Lernbaum §4 #32，★★★）。它把中国必修2 高密度的**遗传概率计算**训练压缩成一条固定工序：**分离 → 组合 → 配子**。核心不是「新遗传学知识」，而是把德国 EF **已经教过的** `Meiose` / `Rekombination` / `Familienstammbäume` **程序化**为可复用的解题流程。
>
> **Klausur-Relevanz**：德国 KLP 只要求「分析系谱 + 推导 Gentest 后果」，**无显式概率计算训练** [据推断，Bio-DE-CN-Mapping §5]；中国训练密度远超德国。因此这是**零新知识、高提分**的纯技法嫁接——**EF 就已齐备全部前置**。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `Erbgang` | 遗传方式 | mode of inheritance | 显/隐 + 常/性染色体的组合 | 判定目标 |
| `dominant / rezessiv` | 显性 / 隐性 | dominant / recessive | 显性杂合即表现，隐性需纯合 | 第一步判据 |
| `Allel` | 等位基因 | allele | 同一基因的不同形式（A / a） | 记法 A/a |
| `Genotyp / Phänotyp` | 基因型 / 表型 | genotype / phenotype | 基因组合 / 可见性状 | 两步转换 |
| `homozygot / heterozygot` | 纯合 / 杂合 | homozygous / heterozygous | AA/aa vs Aa | 概率计算关键 |
| `Produktregel` | 乘法原理 | product rule | 独立事件同时发生 → 概率相乘 | 数学工具 |
| `Summenregel` | 加法原理 | sum rule | 互斥情形 → 概率相加 | 数学工具 |
| `Stammbaum` | 系谱图 | pedigree | 家族世代遗传关系图 | EF 明文方法 |
| `X-chromosomal` | 伴 X 染色体 | X-linked | 基因位于 X 染色体 | 判定第二层 |
| `Konfidenz` / `Wahrscheinlichkeit` | 概率措辞 | probability wording | 德国答题须写 `wahrscheinlich` | ⚠️ 德国硬要求 |

---

## 2. 知识结构 (Struktur)

### 2.1 三步工序总览（分离 → 组合 → 配子）

| 工序 | 做什么 | 输出 | 对应德国 EF 知识 |
|---|---|---|---|
| **① 分离** | 就**每一对**相对性状单独判显隐、写基因型、得该对的表型比（3:1 或 1:1） | 每对性状的单独结论 | `Meiose` 中同源染色体分离 |
| **② 组合** | 多对性状用**乘法原理**合并；或用**分枝法/棋盘法**列出配子种类与比例 | 配子种类与比例 | `Rekombination`（自由组合） |
| **③ 配子 → 后代** | 先求亲本各配子概率，再按「同时相乘、互斥相加」合成目标概率 | 目标事件概率 | 概率学（数学必修） |

中文：**关键顺序是「先分离、后组合」**——绝不一上手就列 16 格棋盘。这是中国必修2 3.2.3 的核心操作纪律。

### 2.2 两条概率规则（全篇只靠这两条）

- **Produktregel（乘法）**：独立事件**同时**发生 → `P(A und B) = P(A) × P(B)`。
- **Summenregel（加法）**：**互斥**情形 → `P(A oder B) = P(A) + P(B)`。

> *Klausur-Satz*: Für die Wahrscheinlichkeit mehrerer **unabhängiger** Merkmale gilt die Produktregel, für sich **gegenseitig ausschließende** Fälle die Summenregel. [据推断]

### 2.3 系谱分析两步判定 + 概率尾巴

| 步 | 判据 | 结论 |
|---|---|---|
| **① 判显隐** | 「无中生有」（父母正常、子女患病） | → **隐性** |
| | 「有中生无」（父母患病、子女正常） | → **显性** |
| **② 判染色体** | 伴 X 隐：**交叉遗传**（外祖父→女儿→外孙）、男性患者集中 | → X-chromosomal rezessiv |
| | 伴 X 显：「父传女必患」 | → X-chromosomal dominant |
| | 伴 Y：「父传子全传」 | → Y-chromosomal |
| **③ 概率尾巴** | 样本小时写 `weist auf … hin`，**不写 `muss`** | 措辞纪律 |

> *Klausur-Satz*: Da aus der Verbindung zweier phänotypisch gesunder Eltern ein betroffenes Kind hervorgeht, weist dies auf einen **rezessiven** Erbgang hin; die Wahrscheinlichkeit für ein weiteres betroffenes Kind beträgt … [据推断]

---

## 3. 解题方法 (Methoden)

### 3.1 三步工序的标准操作

**编号步骤**：
1. **标号 + 判显隐**：给系谱世代编号（P / F1 / F2），先找「无中生有」或「有中生无」。—— *KLP 工具：`Analyse von Familienstammbäumen`（EF 明文）*
2. **分离**：对**每一对**性状分别写基因型（A_ / aa），得单独表型比。—— *KLP 工具：`Meiose` 的分离*
3. **组合**：用乘法原理把各对比相乘；多对时用分枝法列配子。—— *KLP 工具：`Rekombination` 的自由组合*
4. **配子 → 后代**：先算亲本配子概率，再乘法/加法合成目标概率。—— *KLP 工具：数学概率规则*
5. **措辞**：结论写 `Die Wahrscheinlichkeit beträgt …`，**禁止**写 `Es wird sicher …`。—— *KLP 工具：德国 AFB III 的 Geltungsgrenze 要求*

> **判据 / 决策点**：题目给「已知某子代表型，反推亲本基因型」时，用**条件概率**（先锁定已知，再算剩余）——不要漏掉这一层。

### 3.2 何时用分枝法、何时用棋盘法

| 场景 | 推荐方法 |
|---|---|
| 1 对性状 | 直接写 3:1 或 1:1 |
| 2 对性状、需求配子 | **分枝法**（快） |
| 2 对性状、需全部后代 | 棋盘法（16 格，稳） |
| ≥3 对性状 | **必用乘法原理**（棋盘法不可行） |

> **判据 / 决策点**：**先算配子，再合成后代**，永远比直接列棋盘快。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 遗传图解与概率计算三步程序（分离 → 组合 → 配子）

- **技法内容**：见 §2.1 与 §3.1。核心纪律是「**先分离、后组合**」+ 「**先配子、后后代**」；两条规则（乘法/加法）是全部计算的支点。[CN-课标] 必修2 3.2.3（阐明分离与自由组合使子代有多种可能，可**预测子代遗传性状**）+ 学业要求「运用统计与概率解释并预测种群内某一遗传性状的分布及变化」。[据推断]
- **DE-Anschluss**：`Meiose`（EF）· `Rekombination`（EF）· `Analyse von Familienstammbäumen`（**EF 的 Fachliche Verfahren 明文点名** [已验证]）· `Karyogramm`（EF）。**概率的乘法与加法属数学必修，非生物新知识。**
- **合规性**：✅ 完全合规 —— 德国 KLP **已有**「分析系谱 + 预测子代遗传性状」这一**能力目标**，本技法只是把它**程序化**。引入的是**计算流程**，不是新的遗传学知识块。
- **⚠️ 分层差异**：若题目进入 **Hardy-Weinberg 式基因频率定量计算**（p/q 与基因型频率），则**仅 LK 合规**（对应 LK 的 `populationsgenetischer Artbegriff`）；**GK 不得复习**——GK 的 Genetik 段落**无任何 Fachliche Verfahren**，也无种群遗传定量要求 [已验证，Bio-DE-CN-Mapping §0.5]。
- **Abitur 应用**：EF 系谱题 + Q-Genetik 的 `Gentest und Beratung` 后果推导（AFB II→III）。德国答题须保留**概率措辞**。
- **来源**：`[CN-课标]` + `[CN-高考]`

### 4.1 ✅ 为什么这是「EF 已齐备、零新知识」——逐工具核验

> **命题**：本技法所使用的**每一个工具**，在德国 EF 的 KLP 中**都已明文教授**；它**没有引入任何新的生物学知识块**，只引入了一条**计算工序**。因此对 EF 学生**当天可用**，不违反三条铁律之铁律 1（只引入方法、不引入超纲知识）。

| # | 技法用到的工具 | 德国是否已教 | 出处（EF 明文条目） |
|---|---|---|---|
| 1 | 同源染色体分离 → 等位基因分离（分离定律的**生物学基础**） | ✅ 已教 | `Meiose`（EF `Genetik der Zelle`）[已验证] |
| 2 | 非同源染色体自由组合（自由组合定律的**生物学基础**） | ✅ 已教 | `Rekombination`（EF）[已验证] |
| 3 | 交叉互换产生新组合 | ✅ 已教 | `Rekombination`（EF）[已验证] |
| 4 | 显性/隐性、基因型/表型、纯合/杂合 | ✅ 已教 | `Analyse von Familienstammbäumen`（EF 明文 `Fachliche Verfahren`）[已验证] |
| 5 | 性染色体与伴性遗传 | ✅ 已教 | `Karyogramm`（EF `Genetik der Zelle`）[已验证] |
| 6 | 乘法原理 / 加法原理 | ✅ 已教 | **Mathematik 必修（Stochastik）**，非生物知识 [据推断] |
| 7 | A/a 符号、P/F1/F2 世代记法 | ✅ 非知识 | 仅**记法约定**，不构成知识增量 [原创] |

**结论（三段式论证）**：
1. **知识层零新增**：上表 1–5 是德国 EF 已教的生物学事实；第 6 条是数学必修；第 7 条只是符号。**没有任何一条需要德国 Q 阶段的新知识。**
2. **方法层是纯增量**：德国缺的不是「知识」而是「**工序**」——KLP 只写到「分析系谱」，未把判定与计算**流程化**。本技法补的正是这一层。
3. **合规性依据**：Bio-DE-CN-Mapping 的 CN-Methode 1 与 CN-Methode 2 均标 `✅`，且明确「DE-Anschluss 在 **EF 就已具备**」（§4 高价值差异清单第 1 行）[已验证]。唯一的 ⚠️ 边界是**基因频率定量子项**（仅 LK），已在 §4 显式标注。

> **一句话**：**三步程序 = EF 已教的 Meiose/Rekombination/系谱分析 × 数学已教的概率规则**，二者相乘不产生新的生物学知识，只产生一条**可复用的解题工序**。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（系谱图 / 杂交数据）[已验证] |
| Operator | `ermitteln` · `begruenden` · `auswerten` · `erklaeren` |
| AFB | I（读图）→ **II（推演，重心）** → III（不确定性/伦理评价） |
| 建议分值 / 时长 | 3 题约 20–25 BE，约 25–30 min [已验证，GK 255 min] |

### 5.2 训练题

**Aufgabe 1** `[CN-改编]`
> Bei einer Erbkrankheit sind zwei phänotypisch gesunde Eltern (P) Träger. Von ihren vier Kindern (F1) sind drei gesund und eines betroffen.
> a) Ermitteln Sie den Erbgang und begründen Sie ihn.
> b) Berechnen Sie die Wahrscheinlichkeit, dass ein weiteres Kind betroffen wäre.

**Aufgabe 2** `[原创]`
> Ein Merkmal wird durch zwei unabhängige Gene (A/a und B/b) bestimmt. Beide Eltern sind für beide Gene heterozygot (AaBb).
> Berechnen Sie den Anteil der Nachkommen, die für **beide** Merkmale den dominanten Phänotyp zeigen.

**Aufgabe 3** `[NRW-改编]`
> In einem Stammbaum sind ausschließlich Männer von einer Krankheit betroffen; betroffene Väter haben keine betroffenen Söhne, aber alle Töchter sind Konduktorinnen.
> Ermitteln Sie den wahrscheinlichsten Erbgang und formulieren Sie Ihr Ergebnis mit angemessener Sicherheit.

### 5.3 Musterlösung

**Aufgabe 1**
1. **判显隐**：Zwei gesunde Eltern haben ein betroffenes Kind → **«无中生有» → rezessiv**. ✓ 得分点（引用判据）
2. **判染色体**：Keine Geschlechtshäufung erkennbar; bei so kleiner Stichprobe ist keine sichere Aussage möglich. Die Daten **weisen auf** einen **autosomal-rezessiven** Erbgang **hin**. ✓ 得分点（措辞 `weisen … hin`）
3. **分离（基因型）**：Eltern beide **heterozygot** (Aa × Aa). ✓
4. **计算**：Die Wahrscheinlichkeit für ein betroffenes Kind beträgt **1/4 = 25 %** (aa). ✓ 得分点（写出 1/4）
5. **措辞**：`Die Wahrscheinlichkeit beträgt 25 %; dies ist ein statistischer Erwartungswert, kein sicheres Ergebnis.` ✓

**Aufgabe 2**
1. **分离**：Für **jedes** Gen einzeln: Aa × Aa → dominanter Phänotyp mit **3/4**. ✓ 得分点（先分离）
2. **组合（乘法）**：Da die Gene **unabhängig** sind, gilt die **Produktregel**: `P(A_ und B_) = 3/4 × 3/4 = 9/16`. ✓ 得分点（乘积 9/16）
3. **结果**：**9/16 ≈ 56,25 %** der Nachkommen zeigen beide dominanten Merkmale. ✓
4. **说明**：Dies entspricht dem Verhältnis 9:3:3:1 aus der Unabhängigkeitsregel. ✓

**Aufgabe 3**
1. **观察**：Nur Männer betroffen; kein Vater-Sohn-Übertragung; alle Töchter Konduktorinnen. ✓
2. **判定**：Dies spricht **gegen** einen Y-chromosomalen (Vater→Sohn) und **für** einen **X-chromosomal-rezessiven** Erbgang: Die betroffenen Söhne erhalten das defekte Allel von der **Mutter** (Konduktorin). ✓ 得分点（交叉遗传逻辑）
3. **概率尾巴**：Die Aussage beruht auf **kleinen Fallzahlen**; daher lautet die Formulierung: `Die Befunde weisen auf einen X-chromosomal-rezessiven Erbgang hin.` ✓ 得分点（不写 `muss`）
4. **延伸**：Für eine Konduktorin × gesunden Mann beträgt die Wahrscheinlichkeit für einen betroffenen Sohn **1/4** (bzw. 1/2 aller Söhne). ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 一见「患病」就判显性，不看父母表型 | 先找「无中生有/有中生无」，再下结论 |
| 辨别错 | 把 `X-chromosomal` 与 `autosomal` 判反 | 看性别分布 + 交叉遗传模式 |
| 知识错 | 一上手就列 16 格棋盘 | 强制「先分离、后组合」 |
| 知识错 | 用乘法原理处理**互斥**情形 | 互斥用**加法**（A 或 B） |
| 表达错 | 写 `Es wird sicher …`（确定性断言） | 改 `Die Wahrscheinlichkeit beträgt …` / `weist … hin` |
| 表达错 | 不写推理依据直接给结论 | 德国 `begruenden` 要求**逐条给依据** |

---

## 7. Vernetzung

- **上游**：[`Meiose-und-Rekombination.md`](Meiose-und-Rekombination.md)（生物学基础）· [`Zellbiologie-Grundlagen.md`](Zellbiologie-Grundlagen.md)
- **下游**：Q-Genetik 的 `Genmutationen-und-Erbkrankheiten.md`（⚠️ 缺口，`Gentest und Beratung`）· `Genetik-Stammbaumanalyse.md`（Mapping 规划）
- **横向**：`03_Mathe/` 概率统计（乘法/加法规则）· [`CN-Bio-Tricks.md`](CN-Bio-Tricks.md)（Trick 1 系谱判定，本笔记为其升级版）
- **Basiskonzept**：`individuelle und evolutive Entwicklung`（第 5 轴）· `Information und Kommunikation`（第 3 轴）
- **术语卡**：`Erbgang` · `Produktregel` · `Summenregel` · `X-chromosomal-rezessiv` · `Konduktorin` · `Stammbaum`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于官方条目/项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
