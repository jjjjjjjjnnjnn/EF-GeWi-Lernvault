---
fach: Bio
thema: "Populationsdynamik und Wachstumsmodelle (种群动力学与增长模型)"
operatoren: [berechnen, auswerten, interpretieren, erklaeren, vergleichen, begruenden, beurteilen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Bio, Oekologie]
stufe: "Q1"
kursart: "LK"
---

# Populationsdynamik und Wachstumsmodelle (种群动力学与增长模型) · `[LK]`

> **中文理解**：这是 Q 阶段 **IF4 Ökologie** 的 **LK 增量块**，KLP 明文列出 `Idealisierte Populationsentwicklung: exponentielles und logistisches Wachstum` 与 `Fortpflanzungsstrategien: r- und K-Strategien` [已验证，Bio-Oberstufe.md §2 IF4 LK 增量 / bi.txt L1783-1805]。一句话：**无限制时指数增长（J 型），有环境容量时逻辑斯谛增长（S 型）**。考试形态是**数学模型 + 曲线分析 + 计算**（`berechnen` / `auswerten` / `interpretieren`），AFB II 为主。
>
> **Klausur-Relevanz**：这是 **LK 的 Ökologie 增量中最大的单块扩张**——`Populationsdynamik`、`r/K-Strategien` 在 GK **完全不存在** [已验证，Bio-Oberstufe.md §2 IF4 注 / Lernbaum-Bio §4 ⛔]。对 LK 考生，中国选必2 2.1.2（J 型/S 型 + K 值 + 数学模型）已完整覆盖，是**送分块** [据推断，Bio-DE-CN-Mapping OEK-08]。**与数学 Q1 指数函数天然交叉**，须与 [`03_Mathe/Exponentialfunktionen-Wachstum-und-Zerfall.md`](../03_Mathe/Exponentialfunktionen-Wachstum-und-Zerfall.md) 联动。
>
> ⛔ **分层禁止**：`exponentielles und logistisches Wachstum`、`r/K-Strategien` **GK 完全不含** [已验证，Bio-Oberstufe.md IF4 LK 增量]。**GK 考生严禁使用本篇任何内容**（含 J/S 型曲线、K 值、增长公式）[据推断，Bio-DE-CN-Mapping CN-Methode 9 反例 (c)]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Population` | 种群 | population | 同一区域、同一物种、可互交的个体群 | 基本单位 [据推断] |
| `Populationsdynamik` | 种群动力学 | population dynamics | 种群数量随时间的变动 | LK 块名 [已验证] |
| `exponentielles Wachstum` | 指数增长 | exponential growth | 增长率恒定 → **J 型曲线** | LK 独有 [已验证] |
| `logistisches Wachstum` | 逻辑斯谛增长 | logistic growth | 增长率随密度下降 → **S 型曲线** | LK 独有 [已验证] |
| `Umweltkapazität K` | 环境容量 K | carrying capacity | 环境长期能承载的最大种群数 | S 型渐近线 [据推断] |
| `Wachstumsrate r` | 增长率 r | growth rate | 单位时间增长比例 | 指数增长恒定 [据推断] |
| `dN/dt` | 增长速率 | rate of change | 单位时间**数量变化量** | ≠ 增长率 [据推断] |
| `N₀ / N_t` | 初始/时刻 t 数量 | initial/population size | 公式中的起点与结果 | 与 Mathe 联动 [据推断] |
| `Kapazitätsgrenze` | 容量上限 | capacity limit | 种群不能长期超越 K | S 型平台 [据推断] |
| `dichteabhängige Faktoren` | 密度制约因子 | density-dependent factors | 食物/空间/疾病等，随密度增强 | 逻辑斯谛的机制 [据推断] |
| `r-Strategie` | r 策略 | r-strategy | 多子少养、寿命短、种群波动大 | LK 独有 [已验证] |
| `K-Strategie` | K 策略 | K-strategy | 少子精养、寿命长、种群稳定 | LK 独有 [已验证] |
| `Fortpflanzungsstrategie` | 繁殖策略 | reproductive strategy | r/K 是**连续谱**两端 | 非二分 [据推断] |
| `Populationsgleichgewicht` | 种群平衡 | population equilibrium | 出生率 ≈ 死亡率时的稳定点 | 常见于 K 附近 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 指数增长（J 型）——理想条件

中文：当**资源无限、无天敌、无密度制约**时，种群以**恒定增长率**增长，数量按指数规律爆炸式上升。数学表达：**N_t = N₀ · e^(r·t)**（连续型）或 **N_t = N₀ · (1 + r)^t**（离散型）。曲线呈 **J 型**。**现实意义**：只在**入侵初期**、**实验室理想培养**或**短暂**条件下成立，不能长期持续。

> *Klausur-Satz*: Unter idealen Bedingungen wächst eine Population **exponentiell**: Die Wachstumsrate ist konstant, die Kurve hat **J-Form** (N_t = N₀ · e^(r·t)). [据推断]

### 2.2 逻辑斯谛增长（S 型）——现实条件

中文：现实中资源有限，随着密度上升，**密度制约因子**（食物、空间、疾病）增强，增长率**下降**，种群最终趋于 **Umweltkapazität K**。数学表达：**dN/dt = r · N · (K − N) / K**。**读法**：N 小时近似指数增长；N → K 时增长速率 → 0；N = K/2 时 **dN/dt 最大**（增长最快）。曲线呈 **S 型**。

> *Klausur-Satz*: Bei begrenzten Ressourcen folgt das Wachstum der **logistischen Kurve**: Die Wachstumsrate nimmt mit steigender Dichte ab, die Population nähert sich asymptotisch der **Umweltkapazität K**. [据推断]

### 2.3 增长率 vs 增长速率——最易混淆的一点

中文：**增长率（r）= 单位时间内数量的相对变化比例**（指数增长时恒定）；**增长速率（dN/dt）= 单位时间数量变化的绝对量**（S 型下随 N 变化，在 K/2 处最大）。**考试陷阱**：题目问「增长最快的时刻」→ 答 **N = K/2**，不是 K。

> *Klausur-Satz*: Die **Wachstumsrate** (r) ist die relative Zunahme pro Zeit, die **Wachstumsgeschwindigkeit** (dN/dt) die absolute Zunahme; bei logistischem Wachstum ist dN/dt **bei N = K/2 maximal**. [据推断]

### 2.4 r 策略与 K 策略——连续谱的两端

| 维度 | r-Strategie | K-Strategie |
|---|---|---|
| 后代数量 | **多** | **少** |
| 亲代投入 | **少**（无抚育） | **多**（抚育） |
| 寿命 / 体型 | 短 / 小 | 长 / 大 |
| 成熟速度 | 快 | 慢 |
| 环境 | **不稳定**、不可预测 | **稳定**、可预测 |
| 种群动态 | 波动大，常低于 K | 稳定，常在 K 附近 |
| 典型例子 | 昆虫、鼠、杂草、细菌 | 大象、鲸、大型乔木 |

中文：**关键提醒**：r/K 是**连续谱**，不是非黑即白——多数物种介于两者之间（如麻雀、鹿）。

> *Klausur-Satz*: r-Strategen setzen auf **viele Nachkommen mit geringer Fürsorge** in unbeständigen Lebensräumen, K-Strategen auf **wenige Nachkommen mit hoher Fürsorge** in stabilen Lebensräumen; beide sind nur **Extreme eines Kontinuums**. [据推断]

### 2.5 与 Mathe 的联动——同一套指数函数

中文：**生物学里的 N_t = N₀ · e^(r·t) 就是数学里的指数函数**——生物学的「增长率 r」对应数学的「增长常数 k」，生物学的「K 值」在数学里对应逻辑斯谛函数的**上渐近线**。**考试提示**：数学的指数函数笔记提供**计算方法**（求 r、求 t、半衰/倍增时间），生物学笔记提供**情境与解释**。**跨科连接是 LK 明确的加分点** [据推断，Bio-DE-CN-Mapping OEK-08]。

> *Klausur-Satz*: Das exponentielle Populationswachstum entspricht der **Exponentialfunktion** aus der Mathematik; die biologische **Umweltkapazität K** ist die **obere Asymptote** der logistischen Funktion. [据推断]

### ⛔ 分层差异（GK vs LK）

- **GK**：Ökologie 只有 `Biotop/Biozönose`、`Toleranzkurven`、`Stoffkreislauf/Energiefluss`、`Beziehungen`、`Nische`、`Treibhauseffekt`、`Ökosystemmanagement`；**无任何种群动力学条目** [已验证，Bio-Oberstufe.md IF4 共同条目]。
- **LK**：+ `r/K-Strategien` + `exponentielles/logistisches Wachstum` + `Stickstoffkreislauf` + `hormonartig wirkende Substanzen` + `Ökologischer Fußabdruck` + **定量**物种记录 [已验证，Bio-Oberstufe.md IF4 LK 增量]。
- ⚠️ **答题纪律**：GK 卷面出现「J 型 / S 型 / K 值 / 增长公式」= **严重超纲**；LK 卷面**只定性描述「种群波动」而不给模型** = 未答到 LK 深度。

---

## 3. 解题方法 (Methoden)

### 3.1 曲线三看法（种群版）——走向 / 极值 / 因果

**编号步骤**：
1. **看走向**：是 **J 型**（持续陡升）还是 **S 型**（先陡后缓、趋平台）。—— *KLP 工具：`auswerten`*
2. **看极值/转折**：J 型无平台；S 型读出 **K**（渐近线）与 **K/2**（增长速率最大点）。—— *KLP 工具：`ermitteln`*
3. **看因果**：J 型 = 理想条件；S 型平台 = **密度制约因子**生效（不是「停止繁殖」）。—— *KLP 工具：`erklaeren` 的归因要求*
4. **回扣材料**：指出物种、时间区间、K 的数值。—— *KLP 工具：德国「Deutung 回扣材料」硬要求* [据推断]

> **判据 / 决策点**：**必须报出 K 值**；出现平台时须给**机制**（密度制约），不能只说「不长了」。

### 3.2 增长计算法——用指数/逻辑斯谛公式

**编号步骤**：
1. **判模型**：题目有无「资源有限 / 趋于稳定」→ 有则逻辑斯谛，无则指数。—— *KLP 工具：`berechnen`*
2. **套公式**：指数 **N_t = N₀ · e^(r·t)**；逻辑斯谛 **dN/dt = r·N·(K−N)/K**。—— *KLP 工具：`exponentielles/logistisches Wachstum`*
3. **代数据、给单位**：结果必须标**单位**（个体数、时间）。—— *KLP 工具：`berechnen` 的规范要求*
4. **检查合理性**：结果是否超过 K？超过则模型选择有误。—— *KLP 工具：`prüfen`*

> **判据 / 决策点**：**增长率 r 与增长速率 dN/dt 不可混用**；题目问「最快」→ 用 K/2。

### 3.3 模型批判法——处理 AFB III 题

**编号步骤**：
1. **说清模型假设**（理想条件 / 恒定 K）。—— *KLP 工具：`E15–E17` 方法边界* [据推断]
2. **指出模型边界**：真实种群受季节、迁移、随机事件（Gendrift）影响，J/S 型只是**简化**。—— *KLP 工具：`beurteilen`*
3. **给应用建议**：模型能预测**趋势**，不能给**精确值**。—— *KLP 工具：`beurteilen`*

> **判据 / 决策点**：**只算不评不得分**；必须落到「模型的适用条件与局限」。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 概率与统计的跨学科闭环（含 ⚠️ 基因频率子项）—— 种群增长版

- **技法内容**：把种群增长题处理为**数学模型 + 统计推断** —— ① 用**指数/逻辑斯谛公式**做定量预测；② 用**期望值 vs 实测值**解释偏离（小种群偏离大）；③ 把「增长率」「K 值」当作**可估计的参数**，从数据中反推。中国选必2 2.1.2 把「尝试建立数学模型解释种群数量变动（J 型/S 型 + K 值）」训练成体系，并显式写入「运用统计与概率」[据推断，Bio-DE-CN-Mapping OEK-08 / X-13]。
- **DE-Anschluss**：`exponentielles und logistisches Wachstum`（**LK 明文**）· `r/K-Strategien`（LK）· `Kosten-Nutzen-Analyse` / `reproduktive Fitness`（LK，行为生态）· **数学 Q1 指数函数**（`03_Mathe/Exponentialfunktionen-Wachstum-und-Zerfall.md`，**须跨科确认已学** [据推断]）。
- **合规性**：⚠️ **仅 LK 合规** —— 德国 **LK 有接口**（种群动力学是明文 Schwerpunkt）；**GK 完全无接口**（GK 的 Ökologie 无种群动力学条目），**GK 考生禁止使用** [据推断，Bio-DE-CN-Mapping CN-Methode 9 反例 (c)]。⚠️ **子项边界**：由「用数学方法讨论自然选择使种群基因频率变化」派生的**基因频率定量计算**，仅 LK 可触及（`populationsgenetischer Artbegriff`）。
- **Abitur 应用**：OEK-08（`Wachstumsmodelle berechnen und interpretieren`，AFB II）· 与 `Ökologischer Fußabdruck` / 渔业捕捞的 K/2 应用结合（AFB III）。
- **来源**：`[CN-课标]` 选必2 2.1.2 + 学业要求「运用统计与概率」+ 教学提示「用数学方法讨论自然选择使种群基因频率发生变化」

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（配种群增长曲线 / 实验数据表）[已验证，KLP Kap. 4] |
| Operator | `berechnen` · `auswerten` · `interpretieren` · `erklaeren` · `vergleichen` · `beurteilen` |
| AFB | II（模型计算与解释，重心）→ III（模型边界与渔业管理评价，**LK**）[据推断，AFB II≈50%] |
| 建议分值 / 时长 | 3 题共约 18–22 BE，约 20–25 min（**LK 300 min**，4 选 3）[已验证，Abitur 时长] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Eine Population wächst in einem Experiment zunächst exponentiell: Von 200 Individuen ausgehend verdoppelt sie sich alle 3 Tage.
> a) Berechnen Sie die Populationsgröße nach 15 Tagen unter der Annahme exponentiellen Wachstums.
> b) Erklären Sie, warum dieses Wachstum im Experiment nicht dauerhaft anhalten kann.

**Aufgabe 2** `[NRW-改编]`
> Die Abbildung zeigt zwei Wachstumskurven: Kurve A steigt zunächst langsam, dann immer schneller (J-Form); Kurve B steigt zunächst ebenfalls steil an, flacht aber mit der Zeit ab und nähert sich einem Wert von 1200 Individuen.
> a) Ordnen Sie beide Kurven den Wachstumsmodellen zu.
> b) Bestimmen Sie für Kurve B die Umweltkapazität und die Populationsgröße mit der höchsten Wachstumsgeschwindigkeit.

**Aufgabe 3** `[CN-改编]`
> In einem See wurden Fische lange Zeit unbeschränkt gefangen. Ein Gutachten schlägt vor, den Fang erst dann zu erhöhen, wenn die Population die Hälfte der Umweltkapazität erreicht hat.
> a) Begründen Sie diesen Vorschlag mithilfe der logistischen Wachstumskurve.
> b) Beurteilen Sie die Grenzen dieses Modells für die praktische Fischerei.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) 模型选择**：Bei konstanter Verdopplungszeit liegt **exponentielles Wachstum** vor. ✓ 得分点
2. **a) 计算**：N_t = N₀ · 2^(t/3) = 200 · 2^(15/3) = 200 · 2⁵ = **6400 Individuen**. ✓ 得分点（结果+单位）
3. **b) 机制**：Dauerhaftes Wachstum setzt **unbegrenzte Ressourcen** voraus; real sind Nahrung, Raum und Abfallprodukte begrenzt. ✓ 得分点
4. **b) 后果**：Mit steigender Dichte greifen **dichteabhängige Faktoren** → die Wachstumsrate sinkt → Übergang zur **logistischen Kurve**. ✓ 得分点（模型切换）

**Aufgabe 2**
1. **a) 归类 A**：Kurve A (J-Form) = **exponentielles Wachstum**. ✓ 得分点
2. **a) 归类 B**：Kurve B (Abflachung, Asymptote) = **logistisches Wachstum**. ✓ 得分点
3. **b) K 值**：Die Asymptote liegt bei **K ≈ 1200 Individuen**. ✓ 得分点（读数）
4. **b) 最大增长速率**：Bei logistischem Wachstum ist dN/dt **bei N = K/2 ≈ 600 Individuen** maximal. ✓ 得分点（K/2 关键点）

**Aufgabe 3**
1. **a) 依据**：Bei N = K/2 ist die **Wachstumsgeschwindigkeit dN/dt am größten**; ein Eingriff (Entnahme) wird hier am schnellsten kompensiert. ✓ 得分点
2. **a) 机制**：Eine Entnahme unterhalb von K/2 würde die Population stärker schädigen, weil die Nachwuchsrate geringer ist. ✓
3. **b) Sachurteil**：Das Modell liefert nur die **Tendenz**; reale Bestände schwanken durch **Umweltfaktoren, Wanderung und zufällige Ereignisse**. ✓ 得分点（模型边界）
4. **b) Geltungsgrenze**：Zudem ist K für wildlebende Bestände **nicht exakt messbar** und kann sich mit der Umwelt ändern. ✓ 得分点（AFB III 边界）
5. **b) 有条件立场**：Der Vorschlag ist sinnvoll, **sofern** K verlässlich geschätzt werden kann und die Entnahme den Bestand nicht unter K/2 drückt. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 混淆「增长率 r」与「增长速率 dN/dt」 | r 恒定（指数）；dN/dt 随 N 变（逻辑斯谛） |
| 辨别错 | 把 r/K 当非黑即白二分 | 是**连续谱**，多数物种居中 |
| 知识错 | 说「增长最快在 N = K」 | 在 **N = K/2**（dN/dt 最大） |
| 知识错 | 说 S 型平台 = 种群「停止繁殖」 | 是**出生率 ≈ 死亡率**（密度制约） |
| 表达错 | 计算结果不给单位 | `berechnen` 要求**带单位** |
| 表达错 | GK 卷面出现 J/S 型或 K 值 | 属 **LK** ⛔ |

---

## 7. Vernetzung

- **上游**：[`Toleranzkurven-und-oekologische-Potenz.md`](Toleranzkurven-und-oekologische-Potenz.md)（★ 同 IF4，生态因子基础）· [`Bio-Kurvenauswertung-Dreischritt.md`](Bio-Kurvenauswertung-Dreischritt.md)（曲线三看法总卡）
- **下游**：[`Stoffkreislauf-und-Energiefluss.md`](Stoffkreislauf-und-Energiefluss.md)（#22）· [`Oekologische-Nische-und-Beziehungen.md`](Oekologische-Nische-und-Beziehungen.md)（#23，竞争与捕食影响种群）· `LK-Krebs-Humanevolution-Methoden.md`（⚠️ 缺口，种群遗传学接口）
- **横向（★ 跨科）**：[`03_Mathe/Exponentialfunktionen-Wachstum-und-Zerfall.md`](../03_Mathe/Exponentialfunktionen-Wachstum-und-Zerfall.md)（**同一套指数函数：求 r / 求 t / 倍增时间**）· `10_SoWi/`（渔业与资源管理的政策评价）
- **Basiskonzept**：`Steuerung und Regelung`（第 4 轴，种群调节）· `individuelle und evolutive Entwicklung`（第 5 轴，r/K 与适应）
- **术语卡**：`exponentielles/logistisches Wachstum` · `Umweltkapazität K` · `dN/dt` · `r/K-Strategie` · `dichteabhängige Faktoren`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于官方条目/项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
> ⛔ 本篇为 **LK 专属**内容（`Populationsdynamik` / `r/K-Strategien` 为 LK 增量）；**GK 考生严禁复习**（含 J/S 型曲线与 K 值）。
