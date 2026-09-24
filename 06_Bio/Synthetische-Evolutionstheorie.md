---
fach: Bio
thema: "Synthetische Evolutionstheorie (综合进化论)"
operatoren: [erklaeren, begruenden, beurteilen, analysieren, darstellen, vergleichen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Bio, Genetik und Evolution]
stufe: "Q1|Q2"
kursart: "GK|LK"
---

# Synthetische Evolutionstheorie (综合进化论)

> **中文理解**：这是 Q 阶段 IF5「Genetik und Evolution」下 `Entstehung und Entwicklung des Lebens` 的核心条目，KLP 原文列出 `Mutation`、`Rekombination`、`Selektion`、`Variation`、`Gendrift`、`adaptiver Wert von Verhalten`、`Kosten-Nutzen-Analyse`、`reproduktive Fitness`、`Koevolution` [已验证，Bio-Oberstufe.md §2 IF5]。它的本质是：**演化 = 种群的等位基因频率发生变化**；驱动力是**变异（突变 + 重组）+ 选择 + 漂变 + 基因流 + 隔离**五个因子。
>
> **Klausur-Relevanz**：它把 EF 的「重组」上升到**群体层面**，是「抗生素耐药为什么出现」「利他行为如何演化」等材料题的通用解释框架。主战场 **AFB II**（`erklaeren` / `begruenden` / `analysieren`），评价题可升 **AFB III**。

> **⚠️ EF→Q 断层（本项目显式命名）**：**Genetik und Evolution 在 EF 几乎没有接口**——EF 唯一 IF 是 `Zellbiologie`，其 `Meiose` / `Rekombination` / `Karyogramm` **只到细胞层**，未上升到**群体遗传与演化** [已验证，Bio-DE-CN-Mapping §0.4]。因此本条目必须**从零起桥**：唯一可用的 EF 锚点是 [`Meiose-und-Rekombination.md`](Meiose-und-Rekombination.md)（变异来源 = 自由组合 + 交叉互换）。复习时先回顾该笔记的「重组两来源」，再进本页。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `Synthetische Evolutionstheorie` | 综合进化论 | modern synthesis | 综合达尔文选择论与孟德尔遗传学的现代演化框架 | KLP 明文条目 [已验证] |
| `Mutation` | 突变 | mutation | 基因序列的随机改变，变异的**根本来源** | 随机、无方向 [据推断] |
| `Rekombination` | 重组 | recombination | 自由组合 + 交叉互换产生新等位基因组合 | EF 已教 [已验证] |
| `Variation` | 变异 | variation | 种群内个体间的遗传差异（选择的原料） | KLP 明文 [已验证] |
| `Selektion` | 选择 | selection | 环境对表型的差异性筛选，改变等位基因频率 | 有方向 [据推断] |
| `Gendrift` | 遗传漂变 | genetic drift | **随机**导致的等位基因频率变化，小种群尤显著 | 中国课标空白 [据推断] |
| `Genfluss` | 基因流 | gene flow | 个体迁移带来的等位基因交流 | 减小种群间差异 [据推断] |
| `Isolation` | 隔离 | isolation | 阻断基因交流，使种群独立演化 | 物种形成前提 [据推断] |
| `Allelfrequenz` | 等位基因频率 | allele frequency | 某等位基因在种群中的占比 | **演化的量化指标** [据推断] |
| `Genpool` | 基因库 | gene pool | 一个种群全部个体基因的总和 | 群体遗传单位 [据推断] |
| `reproduktive Fitness` | 繁殖适应度 | reproductive fitness | 个体把基因传给下一代的相对成功率 | ≠ 个体强壮 [据推断] |
| `adaptiver Wert von Verhalten` | 行为的适应值 | adaptive value of behaviour | 行为对繁殖成功的贡献 | KLP 明文 [已验证] |
| `Kosten-Nutzen-Analyse` | 成本收益分析 | cost-benefit analysis | 用「收益 − 成本」评估行为的适应值 | KLP 明文 [已验证] |
| `Koevolution` | 协同演化 | coevolution | 两物种互为选择压力、共同演化 | KLP 明文 [已验证] |
| `Flaschenhalseffekt / Gründereffekt` | 瓶颈效应 / 奠基者效应 | bottleneck / founder effect | 小种群抽样导致频率剧变的两种典型漂变 | 漂变实例 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 综合进化论的核心命题

中文：演化**不是个体变化**，而是**种群层面等位基因频率的变化**。五个因子共同驱动：① **变异来源**（Mutation + Rekombination，随机、无方向）；② **Selektion**（有方向，筛选表型）；③ **Gendrift**（随机，小种群尤显）；④ **Genfluss**（迁移交流）；⑤ **Isolation**（阻断交流 → 分化）。

> *Klausur-Satz*: Nach der **Synthetischen Evolutionstheorie** ist Evolution die **Veränderung der Allelfrequenzen in einer Population**; sie wird durch **Mutation und Rekombination** (Variation), **Selektion**, **Gendrift**, **Genfluss** und **Isolation** bewirkt. [据推断]

### 2.2 变异的两个来源（EF 接口在此）

| 来源 | 机制 | 性质 |
|---|---|---|
| **Mutation** | 碱基替换/插入/缺失 → 新等位基因 | 随机、**无方向**（不因「需要」而产生） |
| **Rekombination** | 自由组合 + 交叉互换 → 新组合 | 随机，**EF 已教** [已验证] |

中文：**关键判据**——变异**先于**选择存在，且**方向随机**；选择只做「筛选」，不「创造」变异。这是反目的论论证的核心。

> *Klausur-Satz*: Mutation und Rekombination erzeugen Variation **zufällig und ungerichtet**; die Selektion **schafft keine** neuen Merkmale, sondern verändert nur deren Häufigkeit. [据推断]

### 2.3 选择的三种类型 (Selektionstypen)

| 类型 | 效果 | 图示特征 |
|---|---|---|
| **stabilisierende Selektion** | 淘汰两端极端，保持中间型 | 分布曲线**变窄**，峰值不变 |
| **gerichtete Selektion** | 偏向一个极端 | 分布曲线**整体平移** |
| **disruptive Selektion** | 淘汰中间型，两端保留 | 分布曲线**出现双峰** |

中文：三种类型可用「表型分布曲线怎么变」来判断——**变窄 / 平移 / 双峰**。这与本笔记 §3.1 的曲线三看法直接配合。

> *Klausur-Satz*: Bei der **stabilisierenden Selektion** bleibt der Mittelwert erhalten, die Streuung nimmt ab; bei der **gerichteten Selektion** verschiebt sich der Mittelwert; bei der **disruptiven Selektion** entstehen **zwei Gipfel**. [据推断]

### 2.4 遗传漂变 (Gendrift) —— 中国课标空白，德国重点

中文：漂变是**随机抽样**造成的等位基因频率变化，与「适应好坏」无关，在**小种群**中影响最大。两个典型：**瓶颈效应**（种群骤减后幸存者基因被放大）、**奠基者效应**（少数个体开拓新栖息地，其基因成为新种群起点）。漂变常与选择**同时作用**，是 `Zufall`（随机）类论证的入口。

> *Klausur-Satz*: Unter **Gendrift** versteht man die **zufällige** Veränderung von Allelfrequenzen, die besonders in **kleinen Populationen** wirkt (z. B. **Flaschenhals- oder Gründereffekt**); sie ist **unabhängig vom adaptiven Wert** der Merkmale. [据推断]

### 2.5 基因流与隔离 (Genfluss und Isolation)

中文：**基因流**（个体迁移）把等位基因带入/带出种群，**减小**种群间差异；**隔离**（地理或生殖）**阻断**基因流，使两个种群在漂变 + 选择下**独立分化** → 最终形成新物种（详见 [`Stammbaeume-und-Artbildung.md`](Stammbaeume-und-Artbildung.md)）。

> *Klausur-Satz*: **Genfluss** verringert die Unterschiede zwischen Populationen, während **Isolation** den Genaustausch unterbindet und so eine **unabhängige Weiterentwicklung** ermöglicht. [据推断]

### 2.6 适应值、成本收益与繁殖适应度

中文：`reproduktive Fitness` 是**个体把基因传给下一代的相对成功率**——**不是**「个体多强壮」。行为的 `adaptiver Wert` 可用 **Kosten-Nutzen-Analyse** 评估：**适应值 ≈ 收益 − 成本**。这解释了利他行为、求偶炫耀等看似「不利」的行为为何能演化 [据推断]。

> *Klausur-Satz*: Der **adaptive Wert** eines Verhaltens lässt sich über eine **Kosten-Nutzen-Analyse** abschätzen; entscheidend ist dabei nicht die Überlebens-, sondern die **reproduktive Fitness**. [据推断]

### 2.7 Koevolution 与反目的论

中文：**Koevolution** 是两物种互为选择压力（如花与传粉者、捕食者与被捕食者）。**反目的论警示**（KLP K7/K8）：演化**没有目标**，不能写「为了适应而产生了…」；同时要区分 **proximate**（近因，机制）与 **ultimate**（终极，适应值）解释 [已验证，Bio-Oberstufe.md §3]。另需与 `Abgrenzung von nicht-naturwissenschaftlichen Vorstellungen`（划界）配合。

> *Klausur-Satz*: Bei **Koevolution** üben zwei Arten **gegenseitig** Selektionsdruck aus; Aussagen wie „damit sich die Art anpasst" sind **teleologisch** und fachlich unzulässig. [据推断]

### ⛔ 分层差异（GK vs LK）

- **GK 要求**：本笔记 2.1–2.7 全部为 GK 内容（`Synthetische Evolutionstheorie` 为 GK = LK 共同条目）[已验证，Bio-Oberstufe.md §2 IF5]。
- **LK 增量**（**GK 不得引入**）：`Sozialverhalten bei Primaten`（灵长类社会行为）· `Evolution des Menschen und kulturelle Evolution`（人类演化与文化演化）· `Krebs` / `Onkogene`（肿瘤生物学）· `Histonmodifikation` / `RNA-Interferenz`（表观遗传全套）· `PCR` / `Gelelektrophorese` / `Gentechnik` [已验证，Lernbaum-Bio §4 ⛔；Bio-Oberstufe.md §2 IF5 LK 增量表]。
- ⚠️ **GK 的 Genetik 段落无任何 Fachliche Verfahren**——分子方法（PCR/电泳）**属 LK 独有** [已验证，Bio-Oberstufe.md §2 IF5]。
- ⚠️ **种群遗传的定量计算**（Hardy-Weinberg 式 p/q 与基因型频率）**仅 LK 可触及**（对应 LK 的 `populationsgenetischer Artbegriff`）；GK 不得使用 [据推断，Bio-DE-CN-Mapping §0.5]。

---

## 3. 解题方法 (Methoden)

### 3.1 曲线三看法 —— 读「表型分布曲线」图（判断选择类型）

**编号步骤**：
1. **看走向**：比较**处理前后**两条分布曲线——峰值是否移动？宽度是否变化？是否出现双峰？—— *KLP 工具：`auswerten`*
2. **看极值 / 转折点**：峰值位置（均值）= 被偏好的表型；单峰 vs 双峰是分类判据。—— *KLP 工具：`ermitteln`*
3. **看因果**：**变窄 = stabilisierend**（两端被淘汰）；**平移 = gerichtet**（一个极端被偏好）；**双峰 = disruptiv**（中间型被淘汰）。—— *KLP 工具：`erklaeren`*

> **判据 / 决策点**：先看「峰值动没动」再决定类型——**动了是 gerichtet，没动但变窄是 stabilisierend，变两个是 disruptiv**。

### 3.2 「演化因子归因法」（任何演化解释题通用）

**编号步骤**：
1. **起点**：先写「种群内**已存在**变异（Mutation + Rekombination，随机）」。—— *KLP 工具：`Variation`*
2. **选择压力**：写环境施加了什么**具体**选择压力（抗生素、捕食者、气候…）。—— *KLP 工具：`Selektion`*
3. **筛选**：写「具某表型的个体**繁殖更成功**（Fitness 更高）→ 该等位基因频率上升」。—— *KLP 工具：`reproduktive Fitness` + `Allelfrequenz`*
4. **补充因子**：视情境补 `Gendrift`（小种群）或 `Genfluss`（迁移）或 `Isolation`（分化）。—— *KLP 工具：五因子清单*
5. **收尾**：回到「因此种群演化 = 等位基因频率变化」。—— *KLP 工具：Basiskonzept `individuelle und evolutive Entwicklung`*

> **判据 / 决策点**：**绝不写「为了…而产生了…」**（目的论）。必须写成「先有随机变异 → 再被筛选」。

### 3.3 「Kosten-Nutzen 三步推演」（行为适应值题）

1. **列收益**：该行为提高什么繁殖成功率（更多配偶/更好后代/更少风险）？
2. **列成本**：消耗什么（能量、时间、受伤/被捕食风险）？
3. **比较**：适应值 = 收益 − 成本；收益 > 成本时该行为被选择保留。
—— *KLP 工具：`Kosten-Nutzen-Analyse` + `adaptiver Wert`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 概率与统计的跨学科闭环（含 ⚠️ 基因频率子项）

- **技法内容**：三条可迁移的统计规则——① **乘法规则**（独立事件同时发生）与**加法规则**（互斥情形）；② **概率树 / 分枝法**处理多步事件；③ **大数预期**：把比例理解为**期望值**而非确定结果，用「样本量小 → 偏离正常」解释实测与理论的差距。⚠️ **子项（分层合规）**：由「用数学方法讨论自然选择使种群基因频率发生变化」派生的**基因频率定量计算**，属更高一级的数学化。[据推断，Bio-DE-CN-Mapping CN-Methode 4]
- **DE-Anschluss**：EF 的 `Meiose` / `Rekombination` / `Familienstammbäume` + Q 的 `Gendrift`（**这是基因频率子项的唯一合法接口**）；乘法/加法规则属**数学必修概率统计**，德国 Mathe KLP 已覆盖 [据推断]。
- **合规性**：✅（主技法）—— 规则本身是数学常识，德国 KLP 已有「预测子代遗传性状」的能力目标。⚠️ **基因频率定量子项仅对 LK 合规**：GK 的 Genetik 无种群遗传定量要求 [据推断，Bio-DE-CN-Mapping §0.5]。
- **Abitur 应用**：`Gendrift` 的小种群论证（AFB II/III）；「**为什么实测偏离预期比例**」是典型的 `Erkenntnisgewinnung` 反思题（E15–E17 的证据基础）。
- **来源**：`[CN-课标]` 必修2 学业要求「运用统计与概率」+ 教学提示「用数学方法讨论自然选择使种群的基因频率发生变化」

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（配分布曲线 / 种群数据 / 情境文本）[已验证，KLP Kap. 4] |
| Operator | `erklaeren` · `begruenden` · `analysieren` · `darstellen` · `beurteilen` |
| AFB | I（术语复述）→ **II（机制解释，重心）** → III（评价/反目的论论证） |
| 建议分值 / 时长 | 3 题共约 22–28 BE，约 25–30 min（GK 255 min / LK 300 min，4 选 3）[已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> In einem Krankenhaus werden über mehrere Jahre Bakterien mit einem Antibiotikum behandelt. Zu Beginn sterben fast alle Bakterien; nach einigen Jahren überleben immer mehr Bakterien, und die Population ist gegen das Antibiotikum resistent.
> Erklären Sie die Entstehung der Resistenz mit der Synthetischen Evolutionstheorie. Verwenden Sie dabei die Begriffe Mutation, Selektion und reproduktive Fitness.

**Aufgabe 2** `[NRW-改编]`
> Die Abbildung zeigt drei Verteilungen eines Merkmals (z. B. Körpergröße) in einer Population: Verteilung A ist schmaler als die Ausgangsverteilung, Verteilung B ist gegenüber der Ausgangsverteilung nach rechts verschoben, Verteilung C zeigt zwei Gipfel.
> Ordnen Sie A, B und C den drei Selektionstypen zu und begründen Sie Ihre Zuordnung.

**Aufgabe 3** `[原创]`
> Zwei Inseln werden von einer Vogelart besiedelt. Auf der ersten Insel landen nur fünf Individuen, auf der zweiten eine große Population. Nach vielen Generationen unterscheiden sich die Allelfrequenzen der kleinen Inselpopulation deutlich stärker von der Ausgangspopulation als die der großen.
> Erklären Sie diesen Unterschied mit dem Begriff Gendrift und grenzen Sie Gendrift von Selektion ab.

### 5.3 Musterlösung

**Aufgabe 1**
1. **变异起点**：In der Bakterienpopulation existieren **zufällige Mutationen** (ungerichtet); einige Bakterien besitzen zufällig eine **Resistenz**. ✓ 得分点（变异随机、先于选择）
2. **选择压力**：Das Antibiotikum wirkt als **Selektionsfaktor**: Nicht-resistente Bakterien sterben, resistente **überleben**. ✓ 得分点（选择压力具体化）
3. **适应度**：Die resistenten Bakterien haben eine höhere **reproduktive Fitness** und geben ihr Resistenz-Allel häufiger weiter. ✓ 得分点（Fitness 术语）
4. **频率变化**：Dadurch steigt die **Allelfrequenz** des Resistenz-Allels über die Generationen. ✓ 得分点（等位基因频率）
5. **收尾**：Die Resistenz entsteht also **nicht durch den Wirkstoff**, sondern durch **Selektion bereits vorhandener Varianten**. ✓ 得分点（反目的论）

**Aufgabe 2**
1. **A**：Verteilung A ist **schmaler** bei gleichem Mittelwert → **stabilisierende Selektion** (beide Extreme werden benachteiligt). ✓ 得分点（变窄 = stabilisierend）
2. **B**：Verteilung B ist **nach rechts verschoben** → **gerichtete Selektion** (ein Extrem wird bevorzugt). ✓ 得分点（平移 = gerichtet）
3. **C**：Verteilung C zeigt **zwei Gipfel** → **disruptive Selektion** (die Mitte wird benachteiligt). ✓ 得分点（双峰 = disruptiv）
4. **收尾**：Die drei Typen unterscheiden sich also darin, **wie sich die Verteilung verändert**. ✓

**Aufgabe 3**
1. **机制**：**Gendrift** ist eine **zufällige** Veränderung der Allelfrequenzen; ihr Effekt ist umso stärker, je **kleiner** die Population ist. ✓ 得分点（随机 + 小种群）
2. **应用**：Auf der kleinen Insel (Gründereffekt, nur fünf Individuen) entspricht die Stichprobe der Allele **nicht** dem Genpool der Ausgangspopulation; so können sich Allelfrequenzen stark **zufällig** verschieben. ✓ 得分点（奠基者效应）
3. **对照**：In der großen Population mitteln sich Zufallseffekte aus, daher bleiben die Allelfrequenzen näher an der Ausgangspopulation. ✓ 得分点（大种群稀释随机性）
4. **区分**：**Selektion** verändert Allelfrequenzen **gerichtet** nach dem adaptiven Wert, **Gendrift** dagegen **zufällig und unabhängig** vom adaptiven Wert. ✓ 得分点（有方向 vs 随机）
5. **收尾**：Die starke Abweichung auf der kleinen Insel ist daher vor allem auf **Gendrift** zurückzuführen. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把 `Gendrift` 与 `Selektion` 混为一谈 | 漂变**随机**、无方向；选择**有方向**、依适应值 |
| 辨别错 | 说「适应度 = 个体强壮/长寿」 | 适应度是**繁殖成功率**，不是个体素质 |
| 知识错 | 只谈自然选择，漏掉漂变/基因流 | 五因子清单逐一核对 |
| 知识错 | 写「为了适应环境，细菌产生了抗性」 | **目的论错误**；改为「先有随机突变 → 再被选择」 |
| 知识错 | 把「演化」说成个体变化 | 演化是**种群**等位基因频率变化 |
| 表达错 | 写 `Fitness` 却不加限定 | 一律写 **reproduktive Fitness** |
| 表达错 | 混用 proximate / ultimate 解释 | 明确「这是近因还是终极解释」 |

---

## 7. Vernetzung

- **上游**：[`Meiose-und-Rekombination.md`](Meiose-und-Rekombination.md)（**EF 唯一可用锚点**：变异来源）· [`Molekulargenetik-Zentraldogma.md`](Molekulargenetik-Zentraldogma.md)（突变 → 蛋白质 → 性状）· [`Genmutationen-und-Erbkrankheiten.md`](Genmutationen-und-Erbkrankheiten.md)（突变类型）
- **下游**：[`Stammbaeume-und-Artbildung.md`](Stammbaeume-und-Artbildung.md)（★ 直接下游：隔离 → 物种形成）· LK 的 [`LK-Krebs-Humanevolution-Methoden.md`](LK-Krebs-Humanevolution-Methoden.md)（⚠️ 人类演化/肿瘤，`[LK]`）
- **横向**：[`CN-Bio-Genetik-Rechenschema.md`](CN-Bio-Genetik-Rechenschema.md)（概率与频率计算）· `03_Mathe/` 概率统计与分布函数
- **Basiskonzept**：`individuelle und evolutive Entwicklung`（第 5 轴）· `Steuerung und Regelung`（第 4 轴，选择压力）
- **术语卡**：`Synthetische Evolutionstheorie` · `Gendrift` · `reproduktive Fitness` · `Kosten-Nutzen-Analyse` · `Koevolution` · `Allelfrequenz`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于官方条目/项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
