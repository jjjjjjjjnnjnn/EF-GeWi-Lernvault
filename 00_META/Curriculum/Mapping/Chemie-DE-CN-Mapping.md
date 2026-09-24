---
fach: "Chemie"
thema: "DE-CN Mapping"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Q1, Q2, Meta, Curriculum, Mapping]
de_quelle: "Deutschland/Chemie-Oberstufe.md"
cn_quelle: "China/Chemie-CN-Kursstandard.md"
---

# Chemie — 中德考纲对照表（NRW ↔ 中国）

> 德国源：[`Deutschland/Chemie-Oberstufe.md`](../Deutschland/Chemie-Oberstufe.md)（NRW KLP Chemie，Heft `4723`，版本 `2022/23`，PDF `gost_klp_ch_2022_06_07.pdf`，RdErl. 31.05.2022）
> 中国源：[`China/Chemie-CN-Kursstandard.md`](../China/Chemie-CN-Kursstandard.md)（`2017年版2020年修订`；必修 5 主题 + 选择性必修 3 模块 + 选修 3 系列）
>
> ⚠️ **无任何官方中德对照文件**。本表所有对照结论**均由本项目自行推导**（双边事实分别来自上述两份已验证文件，但「对应关系」本身无官方依据）。
> ⚠️ **标注分布说明**：德国侧结构事实与中国侧条目事实在其源文件中为 `[已验证]`；本表的**对照关系**一律 `[据推断]`（符合 `00-Design.md §1.6` 所述的正确分布）。
> 🎯 **本表的取向**：以 **Abitur 应试**为唯一筛选标准 —— 每个对照条目回答的是「对 NRW Zentralabitur 有多大用」，而非「谁的课程更难」。
> 🔑 **用户已授权**：**可在「解题方法」层面使用中国教材信息**（依 `Lernbaum/00-Abi-Baum-Design.md §3.1` 三条铁律执行）。

---

## 状态码定义（固定四值）

| 状态码 | 含义 |
|---|---|
| `both-equal` | 两边都有，深度相当 |
| `both-de-deeper` | 两边都有，德国更深 |
| `both-cn-deeper` | 两边都有，**中国更深** ← 项目最关注 |
| `DE-only` | 仅德国有 |
| `CN-only` | 仅中国有 |

---

## 0. 结构前提：**读表前必须先接受的六条事实**

> 这六条若不清楚，后面所有对照都会错位。全部来自 `Deutschland/Chemie-Oberstufe.md` 的 `[已验证]` 结论。

### 0.1 ⚠️ 六个 Inhaltsfeld 的**真实学段分配**（任务简报曾错列，已由原文更正）

| 学段 | Inhaltsfeld（德语原文） | 中文 |
|---|---|---|
| **EF** | `Organische Stoffklassen` | 有机物质类别 |
| **EF** | `Reaktionsgeschwindigkeit und chemisches Gleichgewicht` | 反应速率与化学平衡 |
| **Q-Phase** | `Säuren, Basen und analytische Verfahren` | 酸碱与分析 Verfahren |
| **Q-Phase** | `Elektrochemische Prozesse und Energetik` | 电化学过程与能学 |
| **Q-Phase** | `Reaktionswege in der organischen Chemie` | 有机化学的反应路径 |
| **Q-Phase** | `Moderne Werkstoffe` | 现代材料 |

> ⚠️ **三条硬更正**（[已验证]，原文 ch.txt L780-784 / L1097-1103 / L1384-1390）：
> 1. `Reaktionsgeschwindigkeit und chemisches Gleichgewicht` 属 **EF**，**不是 Q1/Q2**。
> 2. Q 阶段（GK 与 LK **共用同名四 IF**）的真实名单为 `Säuren, Basen und analytische Verfahren` / `Elektrochemische Prozesse und Energetik` / `Reaktionswege in der organischen Chemie` / `Moderne Werkstoffe`。
> 3. **EF 不含酸碱内容** —— `Säuren, Basen und analytische Verfahren` 是 Q 阶段 IF，EF 的两个 IF 中无酸碱。
>
> 📌 **与物理对照的关键差异**：物理的 GK 与 LK 是**两套不同的 IF**（标题与切分全不同）；**化学的 GK 与 LK 共用同一套四个 IF 名**，差异只在各 IF 内部的 `inhaltliche Schwerpunkte` 增量上。→ 本表主表**按 EF / Q-GK / Q-LK / X 分域列出**，但 GK 与 LK 的行号可一一对应到同一个 IF。
>
> ⚠️ **KLP 不标 Q1/Q2**：只有 `Einführungsphase` 与 `Qualifikationsphase` 两级。本表的 Q1/Q2 拆分是**本项目据教学顺序推断的排布**，非 KLP 原文。[据推断，仅拆分方式]

### 0.2 EF 的工具天花板（**决定了哪些中国技法可以合法嫁接**）

| 项 | EF 状态 | 备注 |
|---|---|---|
| 官能团清单 | **只到 Estergruppe** | **无 Aminogruppe**（Q 阶段增量） |
| 异构 | **只到 Konstitutionsisomerie** | **无 Stereoisomerie** |
| 分子间作用力 | **只写 intermolekular** | **无 intramolekular** |
| 反应机理 | **完全没有** | GK 才要求两条（自由基取代、亲电加成） |
| 酸碱 | **完全没有**（见 0.1-3） | pH / 缓冲 / 溶度积均属 Q 阶段 |
| 分子几何模型 | 只到 **EPA-Modell** | 无杂化轨道、无 VSEPR 完整版 |
| MWG | 只作**计算工具**用（算 K_c） | Q 阶段 LK 才要求用 MWG **推导** K_S |

> 🎯 **这张表是 CN-Methode 合规性的判据来源**：任何技法若只用到「物质的量 + 配平 + 比例 + 官能团识别 + 氧化数 + MWG 算式」，即为 ✅ 可嫁接；若需要 EF/Q 之外的**知识块**（如盐类水解、杂化轨道、晶体分类），即 ⚠️ 或 ❌。

### 0.3 `Basiskonzepte` —— 德国化学的**第三维**（化学特有，数学 KLP 无）

| 德语原文 | 中文 | 在化学里的落点 |
|---|---|---|
| `Aufbau und Eigenschaften der Stoffe` | 物质的结构与性质 | 官能团系统化、分子间作用力、金属键/离子晶格 |
| `Chemische Reaktion` | 化学反应 | Donator-Akzeptor 原理、可逆性与动态平衡、机理 |
| `Energie` | 能量 | 催化剂作用机制、热力学第一/第二定律、焓与自由能 |

> ⚠️ **化学比数学多一维**：KLP 明确 Basiskonzepte「werden übergreifend auf alle Kompetenzbereiche bezogen」，并在每个 IF 末尾以「Ausgewählte Beiträge zu den Basiskonzepten」显式列出该 IF 对三大概念各贡献什么。[已验证]
> ⚠️ **各 IF 的 Basiskonzept 分布不均**：EF-1 有机**未列 Energie 贡献**；EF-2 动力学**未列 Aufbau/Eigenschaften 贡献**。[已验证]
> 📌 **对中国的落差**：中国 5 项核心素养是**能力侧**框架；德国把「结构 / 反应 / 能量」做成了**内容侧骨架**。两者不可互换 → `DE-only`（见 X-01）。

### 0.4 🎯 最高价值台阶：`Massenwirkungsgesetz` 从「算 K_c」升级为「构建 K_S」

| 层级 | 对 MWG 的要求 | 原文依据 |
|---|---|---|
| **EF** | 把 MWG **当作公式**用于算平衡位置（「bestimmen rechnerisch Gleichgewichtslagen … mithilfe des MWG」） | [已验证，ch.txt L877-879] |
| **Q-GK** | 用 MWG **解释**酸碱平衡位置；常数只「解释」 | [已验证] |
| **Q-LK** | **用 MWG 推导** `K_S` / `pK_S` / `K_B` **并计算** ← 推导等级提升 | [已验证，ch.txt L1422-1427] |

> 🔴 **这是 EF 化学知识在 Q 阶段的第一个复用点，也是最容易被低估的一跳。** Q 阶段**全部酸碱定量内容**（pH、缓冲、滴定曲线、溶度积）都建立在这条推导上。
> 📌 **现有笔记 `05_Chemie/Saeure-Base-Gleichgewichte-pH-Wert.md` 正卡在 EF 侧** —— 它覆盖到「质子理论 / 水自耦电离 / pH 计算 / 滴定中和」，但**没有走完「MWG → K_S 推导」这一跳**，因此无法支撑 LK 的 `Puffersysteme` / `Löslichkeitsgleichgewichte` / `Titrationskurve`。→ 见 CN-Methode 7。

### 0.5 另两条 EF → Q 的隐形台阶

| # | 台阶 | EF | Q 阶段 | 严重度 |
|---|---|---|---|---|
| **②** | `intermolekulare Wechselwirkungen` → `inter- und intramolekulare` | 只用分子间作用力解释**物性**（沸点/熔点/溶解性） | 要用它解释**反应性**（S：「mit dem Einfluss der jeweiligen funktionellen Gruppen unter Berücksichtigung von inter- und intramolekularen Wechselwirkungen」） | 🟠 高。**功能升级，不是内容新增** |
| **③** | 静态结构 → 电子推演（机理） | **完全无 Reaktionsmechanismen** | GK 直接要两条机理；LK 要五条 + Mesomerie + Chiralität | 🔴 最高。需 EF 补一层「电子式 / 形式电荷 / 极化 / 电负性」过渡语言，否则机理只能靠背 |

> 🔎 **一个正反馈环**（非断层，是设计亮点）：EF 的 `Prinzip von Le Chatelier` 在 Q2 的 `Estersynthese`（GK 与 LK 均列为 Schwerpunkt）中被**重新调用**用于优化产率。[已验证，ch.txt L1277, L1666-1668]

### 0.6 化学 Abitur 的**法定硬约束**（价值判断的框架）

- **Aufgabenart I** `Materialgebundene Aufgabe`（可含 Demonstrationsexperiment）· **Aufgabenart II** `Fachpraktische Aufgabe`；**Mischformen 允许**。[已验证]
- ⚠️ **「纯论文式题目被明确禁止」**：「Eine ausschließlich **aufsatzartig** zu bearbeitende Aufgabenstellung … ist **nicht zulässig**.」[已验证，ch.txt L2012-2014] → **每道题必须绑定材料或实验**。
- **AFB II 为重心**，全部 AFB 必须出现；⚠️ **GK 与 LK 的 AFB 分界线不同**（原文：「an den Kompetenzerwartungen und Inhalten der jeweiligen Kursart zu orientieren」）。[已验证]
- 时长 **GK 255 min / LK 300 min**（BASS 13-32 Nr. 6）[已验证]；口试 **20–30 min**，禁用「互不相关的孤立小问题」。

---

## 1. 总览：覆盖面对比

| 领域 | 德国 NRW | 中国 | 覆盖状态 |
|---|---|---|---|
| 有机官能团与检验 | EF-1（羟/羰/羧/酯）→ Q-3（+氨基） | 必修4.1 + 选必3 1.2（**10 类官能团** + 鉴别方法） | `both-cn-deeper` |
| 有机反应机理 | GK 2 条 / LK 5 条（含 S_N1、S_N2、芳香亲电取代） | 只讲**反应类型**（加成/取代/消去/氧化还原），**不讲机理** | 🎯 `both-de-deeper` |
| 有机推断与合成路线 | 只有 `Reaktionswege` 概念，**不构成推断题型** | 选必3 2.3「碳骨架构建 + 官能团转化」+ 逆向合成 + 官能团保护 | 🎯 `both-cn-deeper` |
| 反应速率 | EF-2：四类条件 + 平均速率作图 + **碰撞理论** | 必修3.3 + 选必1 2.2（**活化能、反应历程、变量控制**） | `both-equal`（各有独有块） |
| 化学平衡与 MWG | EF-2：Le Chatelier + K_c 定量；LK：用 MWG **推导** K_S | 选必1 2.1（**平衡常数 K + 浓度商 Q 判方向 + 转化率**） | 🎯 `both-cn-deeper`（方法层） |
| 酸碱与 pH | Q-1：GK 仅强酸强碱；LK + 弱酸碱、缓冲、溶度积、滴定曲线 | 选必1 主题3（电离平衡 / **水解平衡** / 沉淀溶解平衡 / pH 调控） | `both-cn-deeper`（LK 侧） |
| 电化学 | Q-2：GK 原电池+电解+防腐；LK + Nernst/Faraday/ΔG | 必修3.4 + 选必1 1.3（**四要素分析框架**） | 互有（`both-cn-deeper` 框架 / `both-de-deeper` 定量） |
| 热化学 | Q-2 GK：第一定律 + Hess + 量热；LK + 第二定律 + ΔG | 选必1 1.1/1.2（焓变、盖斯定律、中和热测定） | GK：`both-cn-deeper` / LK：`both-de-deeper` |
| 高分子与材料 | Q-4：塑料三类 + 聚合 + 回收；LK + 聚合机理 + 纳米化学 | 必修5.2 + 选必3 主题3（**加聚/缩聚、单体与链节**） | GK：`both-cn-deeper` / LK：`both-de-deeper` |
| 物质结构（原子/键/晶体） | 只在 EPA 模型、氧化数、金属键、离子晶格处**点状出现** | **选必2《物质结构与性质》整册 2 学分** | 🔵 `CN-only` |
| 分析 Verfahren | 三类检出反应、离子检出、滴定；LK + 电位法、**色谱 R_f** | 必修2.3 离子检验；色谱在**选修1 实验化学** | `both-de-deeper`（LK） |
| 数学工具 | MWG 计算、pH、Henderson-Hasselbalch、Nernst 对数式、ΔG、R_f | 物质的量换算网络、三段式 ICE、三大守恒、盖斯定律路径法 | 各有胜场（见 §3） |
| 评价框架 | 4 Kompetenzbereich + **Basiskonzepte 三维** + AFB I/II/III + EPA 0–15 | 5 项核心素养 + **学业质量 4 级**（高考依据**水平 4**）+ 等级分 | `both-de-deeper` |

---

## 2. 知识点级对照主表

> **编号规则**：`EF-*` = EF 两个 IF · `GK-*` = Q 阶段四 IF 的 Grundkurs 内容重点 · `LK-*` = 同四 IF 的 Leistungskurs **增量** · `X-*` = 跨域 / 能力 / 评价 / 结构。
> **「依据」列的含义**：双边事实已验证，**对照关系**为 `[据推断]`（无官方对照源）。

### EF 域（`IF-EF-1 Organische Stoffklassen` / `IF-EF-2 Reaktionsgeschwindigkeit und chemisches Gleichgewicht`）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| EF-01 | 官能团与检验：**Hydroxy- / Carbonyl- / Carboxy- / Estergruppe** 四类 | 必修4.1（以乙烯/乙醇/乙酸/乙酸乙酯认识官能团）+ 选必3 1.2（**碳碳双键、三键、羟基、氨基、碳卤键、醛基、酮羰基、羧基、酯基、酰胺基**十类 + 鉴别方法） | `both-cn-deeper` | 🔴 **EF-1 的第一考点**。中国官能团清单更长、鉴别方法更系统 → 但 ⚠️ **EF 只考这四类**，氨基属 Q 阶段（GK-13），**不得提前在 EF 引入** | [据推断] |
| EF-02 | 按官能团归类 + **系统命名法命名**；物性 **Löslichkeit / Schmelz- / Siedetemperatur** | 选必3 1.2 简单有机物命名；必修4.2 典型有机物性质与用途 | `both-equal` | 🔴 **AFB I 基本盘**，两边同构。中国笔记可直用 | [据推断] |
| EF-03 | **EPA-Modell** 分子几何；Einfach-/Mehrfachbindungen | 必修3.2 分子空间结构；选必2 2.2/2.3（σ/π 键、键角、**杂化轨道、VSEPR**） | `both-cn-deeper` | 🟠 中。⚠️ **德国只到 EPA 模型** —— 中国的杂化轨道与完整 VSEPR 属 `CN-only`（见 X-08），**禁止引入** | [据推断] |
| EF-04 | **Konstitutionsisomerie**（只到构造异构） | 必修4.1 同分异构现象；选必3 1.1 构造异构与立体异构 | `both-cn-deeper` | 🔴 高。**EF 只到构造异构**，立体异构（cis-trans）属 Q-3 GK（GK-14），手性属 LK（LK-13） | [据推断] |
| EF-05 | **intermolekulare Wechselwirkungen** → 解释物性 | 选必2 2.1 范德华力、氢键（**分子内/分子间氢键**） | `both-cn-deeper` | 🔴 高。现有笔记 `Zwischenmolekulare-Kraefte-und-Stoffeigenschaften.md` **正好卡在 EF 侧**（只解释物性）→ 台阶②未走完 | [据推断] |
| EF-06 | **Oxidationsreihe der Alkanole** + Oxidationszahlen | 必修4.2 乙醇的氧化（氧化/加成/取代/聚合反应类型）；必修2.2 化合价变化为判据 | `both-equal` | 🔴 高。**EF-1 唯一贯穿「结构→性质→氧化数」的链条**，也是 Q-2 氧化还原的前置 | [据推断] |
| EF-07 | **Estersynthese**（含从产物物性反推酯基结构的归纳式探究） | 必修4.2 乙酸乙酯；选必3 2.5 必做实验「乙酸乙酯的制备与性质」 | `both-equal` | 🔴 高。**两边都有实验**，且德国要求**归纳式反推** → 属 `Erkenntnisgewinnung`，需训练论证写法 | [据推断] |
| EF-08 | 速率影响因素：**Oberfläche / Konzentration / Temperatur / Druck**；**Reaktionskinetik** | 必修3.3 影响速率的因素（实验探究）+ **变量控制方法**；选必1 2.2 温度/浓度/压强/催化剂 | `both-cn-deeper` | 🔴 高。中国的「**变量控制方法**」是课标明示条目，德国 EF 只在实验探究中隐含 → 可作为实验设计题的作答抓手 | [据推断] |
| EF-09 | **平均速率**定义 + 从实验数据**作图求取** | 必修3.3 平均速率表示方法 | `both-equal` | 🟠 中高。**德国要求「作图求取」**（对应 `Darstellungsaufgaben` 的图表解读） | [据推断] |
| EF-10 | **Stoßtheorie**：用碰撞理论在分子层面表现反应进程（含数字工具） | 选必1 2.2 基元反应**活化能**对速率的影响；中国教材有「有效碰撞」概念 | `both-de-deeper` | 🟠 中。德国要求**用碰撞理论建模表现**（含数字化工具），中国偏「活化能」概念 → **中国学生缺的是模型表现层** | [据推断] |
| EF-11 | **Gleichgewichtsreaktionen**：动态平衡特征 + **Prinzip von Le Chatelier** | 必修3.3 可逆反应与化学平衡；选必1 2.1 浓度/压强/温度对平衡的影响；2.4 必做实验「探究影响化学平衡移动的因素」 | `both-equal` | 🔴 **EF-2 的核心**。两边完全同构，中国笔记可直用 | [据推断] |
| EF-12 | **Massenwirkungsgesetz (K_c)**：定量求平衡位置并解释结果 | 选必1 2.1 **化学平衡常数**表征限度 + **浓度商 Q 与 K 的相对大小判反应方向** + 转化率计算 | 🎯 `both-cn-deeper` | 🔴🔴 **台阶①的上游**。德国只写「用 MWG 计算」，**未规定方法**；中国有 **K 表达式书写 + Q/K 判据 + 三段式 ICE + 转化率** 的成套体系 → **CN-Methode 2** | [据推断] |
| EF-13 | **Katalyse**（EF 只列条目） | 选必1 2.2 催化剂影响；2.3 **催化剂改变反应历程**；基元反应活化能 | `both-cn-deeper` | 🟡 中。⚠️ 中国的「**反应有历程**」是**知识块**，德国 EF 未教 → **不得在 EF 引入历程概念**，只可用「催化剂降低活化能」这一句（德国教材标配） | [据推断] |
| EF-14 | **natürlicher Stoffkreislauf** + **technisches Verfahren**（如合成氨） | 必修5.3 合成氨、工业制硫酸、石油化工；5.4 环境保护（酸雨防治、废水处理） | `both-equal` | 🔴 **EF 的 `Bewertungskompetenz` 主战场**。KLP 要求「分析不同来源对干预自然物质循环后果的**立场与叙述意图**」→ **跨学科写作型任务，中国无对等训练** | [据推断] |
| EF-15 | ——（KLP 未把 `Stoffmenge` 列为 EF Schwerpunkt，属 SI 巩固层） | 必修1.1 **物质的量及其相关物理量的含义与应用**；学业要求「物质的量/摩尔质量/气体摩尔体积/物质的量浓度相互关系进行简单计算」 | 🔵 `CN-only`（课标层） | 🔴🔴 **极高**（方法层）。中国把「物质的量」做成**枢纽概念**，所有定量关系绕其旋转；德国 `Stöchiometrie` 偏**比例直觉** → **CN-Methode 1**（本项目第一价值点） | [据推断] |
| EF-16 | ——（EPA 模型与氧化数间接用到，但**无独立 IF**） | 必修3.1 原子结构与元素周期律；选必2 主题1（能级、电子排布式、电离能、电负性） | 🔵 `CN-only` | ⚫ **零 Abitur 价值**。仅作理解用，**禁止占用复习时间**（见 X-08） | [据推断] |

### Q-GK 域（Q 阶段四 IF 的 Grundkurs 内容重点）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| GK-01 | Q-1：**Protolysereaktionen**，Brønsted 酸碱概念 | 必修2.3 酸碱盐电解质电离；选必1 3.1「从**电离、离子反应、化学平衡**三角度认识电解质溶液」 | `both-cn-deeper` | 🔴🔴 **Q-1 的第一考点**。中国把电离纳入**平衡视角**（三角度），德国 GK 只要求 Brønsted 质子传递 → 中国的「三角度」是可迁移的**思维框架** | [据推断] |
| GK-02 | Q-1：**Säure-/Base-Konstanten** `K_S`/`pK_S`/`K_B`/`pK_B`（GK 只要求**解释**） | 选必1 3.2 **电离平衡常数** + 水的电离与 `K_w` | `both-cn-deeper` | 🔴 高。GK 只「解释」，LK 才要求推导（LK-06）。→ **注意符号体系差异**：德国 `K_S`/`pK_S` vs 中国 `K_a`/`pK_a`，须校准 | [据推断] |
| GK-03 | Q-1：**pH-Wert-Berechnungen** —— 仅**强酸与强碱** | 选必1 3.2 溶液酸碱性与 pH（含弱电解质） | `both-equal` | 🔴 **GK 必考**。两边在强酸强碱范围内完全同构 → 中国笔记可直用 | [据推断] |
| GK-04 | Q-1：analytische Verfahren —— **Nachweisreaktionen**（Fällung / Farbreaktion / Gasentwicklung）+ **离子检出** | 必修2.3 **离子反应及其发生条件** + 常见离子检验；必修2.7 必做实验「用化学沉淀法去除粗盐中的杂质离子」 | 🎯 `both-cn-deeper` | 🔴 高。中国有「**离子反应发生条件**」的明文判据（生成沉淀/气体/弱电解质）与「拆—删—查」书写逻辑 → **CN-Methode 4** | [据推断] |
| GK-05 | Q-1：**Säure-Base-Titrationen** von starken Säuren/Basen（**mit Umschlagspunkt**） | 选必1 3.6 必做实验「强酸与强碱的中和滴定」 | `both-equal` | 🔴 **GK 必考 + `fachpraktische Aufgabe` 高频**。两边一致，但德国**要求指示剂终点判断的实验操作论证** | [据推断] |
| GK-06 | Q-1：**Erster Hauptsatz** + **Neutralisationsenthalpie** + **Kalorimetrie** | 选必1 1.1 能量守恒定律与内能；1.2 反应热 = 焓变 | `both-cn-deeper` | 🔴 高。中国的**量热与中和热测定训练密度远高于德国**；德国强在「第一定律」的概念表述 | [据推断] |
| GK-07 | Q-1：**Ionengitter, Ionenbindung** | 必修3.2 离子键的形成；选必2 2.4 **离子晶体**（四晶体分类之一） | `both-cn-deeper` | 🟡 中。中国有完整**晶体四分类**，但属 `CN-only`（见 X-08）；德国只在离子晶格处点状出现 | [据推断] |
| GK-08 | Q-2：**Redoxreaktionen als Elektronenübertragungsreaktionen** | 必修2.2 氧化还原本质 = 电子转移；水平 1-1「能书写离子方程式和氧化还原反应化学方程式」 | `both-equal` | 🔴🔴 **Q-2 的地基**。两边同构。⚠️ 德国**不系统训练氧化数配平的显式检验** → **CN-Methode 4/5** | [据推断] |
| GK-09 | Q-2：**galvanische Zellen** —— Metallbindung / **Elektronengasmodell** / Ionenbindung / **elektrochemische Spannungsreihe** / **Berechnung der Zellspannung** | 必修3.4 以原电池为例、从氧化还原角度初步认识原理；选必1 1.3 原电池及常见化学电源工作原理 + 学业要求「**辨识简单原电池的构成要素**」 | 🎯 `both-cn-deeper` | 🔴🔴 **Q-2 第一考点**。中国课标**明文给出「原电池构成要素」** → 与德国已有的 `Spannungsreihe` 拼接即成 **Analyseraster**（**CN-Methode 3**） | [据推断] |
| GK-10 | Q-2：**Elektrolyse** | 选必1 1.3 **电解池工作原理**；电解在物质转化与储能中的应用；必做实验「简单的电镀实验」「制作简单的燃料电池」 | `both-equal` | 🔴 高。两边同构。⚠️ 德国 GK 不要求 Faraday 定量（LK-08 才要求） | [据推断] |
| GK-11 | Q-2：**Korrosion** —— Sauerstoff- und Säurekorrosion + Korrosionsschutz | 选必1 1.3 **金属电化学腐蚀本质与防护措施** | `both-equal` | 🟠 中高。**中国多做「析氢/吸氧腐蚀」分类**，德国做「氧腐蚀/酸腐蚀 + 局部电池」→ 分类轴不同，须重贴标签 | [据推断] |
| GK-12 | Q-2：**Standardreaktionsenthalpien** + **Satz von Hess** + heterogene Katalyse | 选必1 1.2 **盖斯定律及其简单应用** + 热化学方程式书写 + 键能法 | 🎯 `both-cn-deeper` | 🔴🔴 **Q-2 的第二考点**。中国把 ΔH 计算做成**成套定量题型**（键能法 / 盖斯定律路径法 / 中和热测定）→ **CN-Methode 8** | [据推断] |
| GK-13 | Q-3：官能团 + Nachweise —— **新增 Aminogruppe** | 选必3 1.2 十类官能团（含**氨基、酰胺基**）+ 鉴别方法 + 1.3 基团相互影响导致键极性改变 | `both-cn-deeper` | 🔴 高。**EF → Q-3 的官能团增量边界**（EF 只到酯基）。中国的鉴别方法体系可直接补德国的检验训练 | [据推断] |
| GK-14 | Q-3：**Alkene, Alkine, Halogenalkane**；**Stereoisomerie (cis-trans-Isomerie)** | 必修4.1（甲烷/乙烯/乙炔/苯的成键特点）；选必3 2.1 烃的性质、2.2 卤代烃；1.1 **立体异构** | `both-equal` | 🔴 高。**EF 无这些类别**，属 Q-3 纯增量。中国选必3 系统性更强 | [据推断] |
| GK-15 | Q-3：**inter- und intramolekulare Wechselwirkungen** → 解释**反应性** | 选必3 1.2「**同一分子中官能团之间存在相互影响**」+ 1.3「基团相互影响导致键的极性改变」 | 🎯 `both-cn-deeper` | 🔴🔴 **台阶②的落点**。中国课标**明文**这两条；德国只有 Schwerpunkt 条目、无展开 → **中国侧可直接填德国的展开空缺**（**合规**，因为不引入新知识，只补「为什么」） | [据推断] |
| GK-16 | Q-3：**Reaktionsmechanismen** —— Radikalische Substitution + **elektrophile Addition** | 必修4.2 取代/加成反应类型；选必3 2.3 加成、取代、消去反应 —— ⚠️ **中国只讲反应类型，不讲机理** | 🎯 `both-de-deeper` | 🔴🔴 **中国学生的明确缺口**。德国 GK 就要求**机理**（含电子层面推演），中国止于「反应类型」分类 → 须先补「电子式/极化/形式电荷」过渡层（台阶③） | [据推断] |
| GK-17 | Q-3 / Q-4：**Fette**（Naturstoffe）；**Kunststoffe**（Thermoplaste / Duroplaste / Elastomere）+ **Polymerisation** | 必修4.3 油脂；必修5.2 高分子材料；选必3 3.1 **单体、链节 + 加聚反应与缩聚反应**；3.3 塑料/合成橡胶/合成纤维 | `both-cn-deeper` | 🔴 高。中国的**加聚/缩聚分类 + 单体-链节**语言比德国 GK 的「Polymerisation」更细 → 可直接补（属方法/语言层，非新知识） | [据推断] |
| GK-18 | Q-4：**Rohstoffgewinnung und -verarbeitung** + **Recycling**；Q-3：**Estersynthese**（Homogene Katalyse + **Le Chatelier 回接 EF**） | 必修5.2/5.3 资源综合利用与材料；选必3 2.5 乙酸乙酯制备 | `both-equal` | 🟠 中高。**Le Chatelier 回接点是官方正反馈环**（EF 知识在 Q2 复用），是 Bewertung 与 AFB II 的好载体 | [据推断] |

### Q-LK 域（同四 IF 的 Leistungskurs **增量** —— GK 对以下多为零覆盖）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| LK-01 | Q-1：pH 计算扩展到**弱酸弱碱**（「von Säuren und Basen」，非完全质子化） | 选必1 3.2 **弱电解质电离平衡** + 电离平衡常数 + pH 计算 | 🎯 `both-cn-deeper` | 🔴🔴 **LK 必考**。GK 完全无此内容（KLP 明文 GK 只「starker Säuren und starker Basen」）。中国的弱电解质电离训练体系可直接前移 | [据推断] |
| LK-02 | Q-1：**Puffersysteme** + **Henderson-Hasselbalch 方程**（GK **完全未出现**） | 选必1 3.5 **溶液 pH 调控**的应用（缓冲思想）；必修/选必教材有缓冲溶液 | 🎯 `both-cn-deeper` | 🔴🔴 **GK/LK 最硬的分界线之一**。⚠️ 但中国侧把缓冲常与**盐类水解**绑定讲授（见 CN-Methode 10 反例）→ **只借「缓冲对 + HH 方程」，不借水解体系** | [据推断] |
| LK-03 | Q-1：**Löslichkeitsgleichgewichte**（`K_L` / 溶度积，GK **完全未出现**） | 选必1 3.4 **难溶电解质沉淀溶解平衡**；沉淀的生成、溶解与转化 | 🎯 `both-cn-deeper` | 🔴🔴 **LK 必考**。中国把 `K_sp` 做成成套题型（沉淀生成/溶解/转化/分步沉淀）；德国 LK 只有独立条目 → **CN-Methode 2（ICE 表）可直用** | [据推断] |
| LK-04 | Q-1：**Titrationskurve** —— 须**预测**强/弱酸碱滴定曲线，算出三特征点：**Anfangs-pH / Halbäquivalenzpunkt / Äquivalenzpunkt** | 选必1 3.6 中和滴定；中国高考有滴定曲线题型 | 🎯 `both-cn-deeper` | 🔴🔴 **LK 高频 + 中国明确优势**。三特征点法是中国成熟套路；德国 LK 明文要求但学生缺抓手 | [据推断] |
| LK-05 | Q-1：**电位法 pH 测定** + **Lösungsenthalpie** + **Entropie**（须把**自发吸热溶解归因于熵变**） | 选必1 3.2 pH 检测方法；2.1 反应方向与**焓变、熵变**有关 | `both-de-deeper` | 🔴 高。**德国更深**：中国课标只说「与焓变和熵变有关」，德国 LK 要求**用熵变解释自发吸热溶解**且 `Entropie` 是 GK 完全无的独立条目 | [据推断] |
| LK-06 | Q-1：**用 MWG 推导** `K_S`/`pK_S`/`K_B` **并计算**（GK 只要求「解释」） | 选必1 3.2 电离平衡常数 —— ⚠️ **中国只要求应用，不要求推导** | 🎯 `both-de-deeper` | 🔴🔴 **台阶①，本表最高价值条目**。而 LK 的 pH/缓冲/滴定曲线/溶度积**全部建立在这条推导上**（见 §0.4）→ **CN-Methode 7** | [据推断] |
| LK-07 | Q-2：**Konzentrationszellen** + **Nernst-Gleichung**（GK **未出现**） | **无对应**（中国高中无能斯特方程） | 🎯 `DE-only` | 🔴🔴 **LK 标志性内容 + 中国学生的硬缺口**。Nernst 对数式是德国 LK 独有 | [据推断] |
| LK-08 | Q-2：**Faraday-Gesetze**（计算物质转化量）+ **Zersetzungsspannung (Überspannung)**；须**从实验数据推导** Faraday | 选必1 1.3 电解应用 —— 中国用**电子守恒**做电量-物质量换算，但**无 Faraday 定律名称** | `both-de-deeper` | 🔴🔴 **高价值接口**。德国要求「从实验数据**推导** Faraday 定律」（推导等级提升）；中国的**电子守恒计算**恰好是同一数学关系 → **CN-Methode 5 可合法嫁接到 Faraday 计算** | [据推断] |
| LK-09 | Q-2：**Redoxtitration**（LK 独立条目） | 必修2.2 + 选必1（氧化还原滴定是中国高考常见题型） | `both-cn-deeper` | 🔴 高。中国的**氧化还原滴定训练密度**（含指示剂、终点判断、误差分析）远高于德国 | [据推断] |
| LK-10 | Q-2：**第二定律** + **freie Enthalpie** + **Gibbs-Helmholtz-Gleichung**（须**计算** ΔG）+ 电化学电源**功率计算** | **无对应**（中国课标无 ΔG、无 Gibbs-Helmholtz；功率属物理跨界） | 🎯 `DE-only` | 🔴🔴 **LK 硬缺口**。与 LK-07 同属「中国完全没有」区 → **必须在 LK 前专门补** | [据推断] |
| LK-11 | Q-3：**nucleophile Substitution erster und zweiter Ordnung**（S_N1 / S_N2）—— **LK 独有** | 选必3 2.2 卤代烃（水解与消去）—— ⚠️ **只讲产物，不讲机理与动力学级数** | 🎯 `both-de-deeper` | 🔴 高。**机理深度是德国 LK 的护城河**；中国学生须从零建立「离去基团 / 亲核试剂 / 一级二级动力学」语言 | [据推断] |
| LK-12 | Q-3：**Struktur und Reaktivität des aromatischen Systems** + **Mesomerie** + **elektrophile Erstsubstitution** | 必修4.1 苯的成键特点；选必3 2.1 芳香烃 —— ⚠️ **无 Mesomerie、无亲电取代机理** | 🎯 `both-de-deeper` | 🔴 高。**Mesomerie（中介/共振）是中国完全没有的概念工具**，且是 LK-14 染料显色的前置 | [据推断] |
| LK-13 | Q-3：**Chiralität**（不对称 C 原子） | 选必2 2.3 **手性**对性质的影响 | `both-equal` | 🟠 中。德国放在 Q-3 有机，中国放在选必2 物质结构 → **位置不同但内容相当**，可直用 | [据推断] |
| LK-14 | Q-3：**Farbstoffe** 独立大板块 —— Einteilung / Struktur / Eigenschaften / Verwendung + **Lichtabsorption** / **mesomere Grenzstrukturen** / **Delokalisation** / Donator-Akzeptor-Gruppen + **吸收光谱解读** | **无对应**（中国课标无染料显色板块） | 🎯 `DE-only` | 🔴 **LK 独立大板块 + 中国完全空白**。是 `Basiskonzept Aufbau und Eigenschaften` 最漂亮的落点 | [据推断] |
| LK-15 | Q-3：**Chromatografie** + **R_f 值（Retentionsfaktor）解读**（LK 独立 analytisches Verfahren） | 选修1《实验化学》分离与提纯（**选修，不在高考主力范围**） | `both-de-deeper` | 🟠 中。属**工具层**考点（读 R_f），不是知识层 → 单独记即可 | [据推断] |
| LK-16 | Q-3：**koordinative Bindung: Katalyse**（从配位键层面解释催化） | 选必2 2.1 **配位键与配合物**（中国是系统板块 + 必做实验「简单配合物的制备」） | 🎯 `both-cn-deeper` | 🟠 中。**反向：中国更深**。德国只在此处一笔带过。⚠️ 但配合物系统板块属 `CN-only`（见 X-09），**只可借「配位键解释催化」这一句** | [据推断] |
| LK-17 | Q-4：**Mechanismus der radikalischen Polymerisation**（含反应步骤）+ **Werkstoffkreisläufe** + **technisches Syntheseverfahren**（须考虑所用催化剂） | 选必3 3.1 加聚反应；必修5.2/5.3；选修系列2《化学与技术》 | `both-de-deeper` | 🔴 高。**德国 LK 要机理反应步骤**，中国只到「加聚/缩聚」分类 | [据推断] |
| LK-18 | Q-4：**Nanochemie** —— Nanomaterialien / Nanostrukturen / **Oberflächeneigenschaften** | 选修3 系列3「大分子及超分子与纳米化学」—— ⚠️ **选修，不在高考范围** | 🎯 `DE-only` | 🔴 **LK 独立板块 + 中国高中基本不涉及**。含「纳米材料的机遇与风险」评价（作者意图分析） | [据推断] |
| LK-19 | Q-3 泛化要求：须**从分子结构推演反应行为**（「die Reaktionsmechanismen」不再限定指定条件） | 选必3 学业要求主题2 第 4 条「能综合应用有关知识完成**推断有机化合物、检验官能团、设计有机合成路线**等任务」 | `both-cn-deeper` | 🔴🔴 **LK-11/12 的能力落点**。德国要求「从结构推演」但**无推断题型**；中国有完整推断题型训练 → **CN-Methode 6**（机理 × 推断 = 合法嫁接入口） | [据推断] |

### X 域（跨域 / 能力 / 结构 / 评价）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| X-01 | **3 个 `Basiskonzepte`**（Aufbau und Eigenschaften / Chemische Reaktion / Energie）作为**内容侧**跨 IF 骨架，每 IF 末尾显式列贡献 | 5 项核心素养（宏观辨识与微观探析 / 变化观念与平衡思想 / 证据推理与模型认知 / 科学探究与创新意识 / 科学态度与社会责任）——**能力侧**框架 | 🎯 `DE-only` | 🔴 **极高**。Basiskonzept 是德国化学作答的**「官方得分语言」**：答题时点明「这是结构与性质」「这是能量视角」直接命中 `Herstellen geeigneter Zusammenhänge`。中国无对等 → **必须单独建立** | [据推断] |
| X-02 | **4 个 Kompetenzbereich**；⚠️ **`Kommunikationskompetenz` 是唯一 `inhaltsfeldübergreifend` 的能力**（K1–K13 只需通用训练，S/E/B 须按 IF 切片） | 5 项核心素养；无此类「跨主题/按主题切片」的结构规定 | `both-de-deeper` | 🔴 高。**这解释了化学笔记的写法差异**：K 层做通用卡，S/E/B 必须按 IF 组织 | [据推断] |
| X-03 | ⚠️ **`Sachkompetenz` 被官方切成两条平行线**：`qualitativ-modellhaft erklären`（S11–S15，粒子层面的模型解释）与 `quantitativ-mathematisch beschreiben`（S16–S17） | 无等价的双轨切分 | `DE-only`（轻） | 🟠 中。**这是化学独有的「表征类型」双轨**（模型语言 vs 数学语言），与数学的「工具许可」双轨不同 → 答题时须判断题目要哪一种 | [据推断] |
| X-04 | **法定题型约束**：Aufgabenart I `Materialgebundene Aufgabe` / Aufgabenart II `Fachpraktische Aufgabe`；⚠️ **禁止纯论文式题目**（「ohne Material- oder Experimentbezug … nicht zulässig」）；含 fachpraktische Anteile 可延长且**须在题目中明示** | 高考：选择题 + 非选择题（**呈现解答过程**）；课标只给原则性要求，**未规定题型与分值** | `DE-only`（硬约束） | 🔴🔴 **极高**。化学 Abitur 的硬约束：**每道题必须绑定材料或实验**。这是与数学（免工具/带工具）完全不同的切分轴 | [据推断] |
| X-05 | **AFB I/II/III**，明文「AFB II den Schwerpunkt」；⚠️ **GK 与 LK 的 AFB 分界线不同** | 学业质量 **4 级**（水平 2 = 合格考；**水平 4 = 高考**） | `both-equal` | 🔴 高。**水平 4 与德国 AFB II/III 高度同构**（「在物质及其变化情境中依据需要选择不同方法、从不同角度进行分析和推断」）→ 中国的水平 4 训练可直接迁移 | [据推断] |
| X-06 | **EF → Q 的动词限定词消失**：EF 条目多含「angeleitet / unter Anleitung / unterstützt」，Q 阶段删除 | 学业质量**水平 2 → 水平 4** 的跃迁 | `both-equal` | 🟠 中高。**非知识点型台阶，最易被忽略** → 可做动词对照卡 | [据推断] |
| X-07 | **四类法定 Überprüfungsformen**（Sonstige Mitarbeit 必须使用）：Experimentelle/fachpraktische / Präsentations- / Darstellungs- / Bewertungsaufgaben；⚠️ **无 `Explorative Aufgaben` 与 `Innermathematische Argumentationsaufgaben`**（与数学对比） | 无等价的法定形式清单 | `DE-only` | 🟠 中。**学科性质差异（实验科学 vs 形式科学）的官方体现**；`Darstellungsaufgaben` 要求「表征形式**互相转换**」→ 中国学生的薄弱项 | [据推断] |
| X-08 | ——（只在 EPA 模型、氧化数、金属键、离子晶格处**点状出现**） | 选必2《物质结构与性质》**整册 2 学分**：能级与电子排布式、电离能/电负性、**杂化轨道 sp/sp²/sp³**、σ/π 键、**晶体四分类与晶胞** | 🔵 `CN-only` | ⚫ **零 Abitur 价值**。德国 KLP **无对应 IF**。⚠️ **这是中国最大且最系统的超出量**，**禁止占用复习时间** | [据推断] |
| X-09 | ——（**KLP 全文无水解平衡**；`Puffersysteme` 与盐类水解无绑定） | 选必1 3.3 **盐类水解**原理与影响因素 + 必做实验「盐类水解的应用」 | 🔵 `CN-only` | ⚫ 零价值，且 ⚠️ **是最危险的越界诱惑**：它紧邻 LK-02 `Puffersysteme`，看似相关 → **见 CN-Methode 10 反例** | [据推断] |
| X-10 | ——（B11「评价实验室与日常安全」进入**评价维度**；无必做实验清单） | 必修1.4 科学态度与安全意识；**18 个必做实验**（附录3 硬性清单，必修 9 + 选必 9） | 互有（`DE-only` 的安全评价维度 / `CN-only` 的清单机制） | 🟠 中。**双向缺口**：中国学生不缺「做过什么」，缺「把安全写成 `Bewertung`」；德国正好反过来 | [据推断] |
| X-11 | ——（德国 `Stöchiometrie` 偏比例直觉，KLP 未规定计算方法） | **解题技法体系**：物质的量换算网络、三段式 ICE、守恒法（质量/电荷/电子/元素）、**差量法**、极值法、盖斯定律路径法、有机双轴推断 | 🔵 `CN-only`（**方法层**） | 🔴🔴 **最高价值的一类 `CN-only`**。⚠️ 注意区分：**知识块型 `CN-only` 一律禁止**（X-08/09）；**方法型 `CN-only` 是本项目唯一允许引入的中国内容** → 见 §3 全部技法卡 | [据推断] |

---

## 3. 🇨🇳 CN-Methode 技法卡（**本文件的核心产出**）

> **三条铁律**（依 `Lernbaum/00-Abi-Baum-Design.md §3.1`，违反即打回）：
> 1. **只引入「方法」，不引入「超纲知识」**。用中国式**解题路径**是可以的；引入德国 KLP 完全没有的**知识板块**（如盐类水解、杂化轨道、晶体分类）不行。
> 2. **每条必须标注 `DE-Anschluss`** —— 该技法用到的**全部工具**，须逐一确认德国 KLP 已教。
> 3. **来源分层**：`[CN-课标]`（课标规定内容）/ `[CN-教材]`（教材的结构性方法，只记方法名与逻辑）/ `[CN-高考]`（高考题型与解题套路，**原创改写，不搬原题**）。
>
> ⚠️ 本表所有技法均为**本项目推导**，不搬运任何教材正文或原题。

### CN-Methode 1：物质的量「枢纽换算网络」（`n = m/M = V/V_m = c·V = N/N_A`）

- **技法内容**：把 `n`（物质的量）画成一个**中心节点**，四条支路向外辐射 —— ① **质量支路** `m ↔ n`（桥墩 `M`）；② **气体支路** `V ↔ n`（桥墩 `V_m`，标准状况 22,4 L/mol，其他条件走 `pV = nRT`）；③ **溶液支路** `V ↔ n`（桥墩 `c`，稀释时 `c₁V₁ = c₂V₂`，溶质不变只变 V）；④ **粒子支路** `N ↔ n`（桥墩 `N_A`）。**任何定量题的第一步都是「把已知量沿支路走到 n，再从 n 走到所求量」**，永远不在 m 与 V、m 与 c 之间直接跳。来源：`[CN-课标]` 必修1.1「物质的量及其相关物理量的含义与应用」+ 学业要求「物质的量/摩尔质量/气体摩尔体积/物质的量浓度相互关系进行简单计算」；`[CN-教材]` 三量桥记法。
- **DE-Anschluss**：`Stoffmenge` / `Mol`（**Sek I 已教，EF KLP 明确定位为「konsolidieren 与 vertiefen SI 能力」**）· `molare Masse M` · `Stoffmengenkonzentration c` · `molares Volumen V_m` · **反应方程式的系数比 = 物质的量之比**（德国 `Stöchiometrie` 的地基）。**零新增知识** —— 每一条支路德国都已教，中国侧提供的只是「**把它们接到同一个中心节点上**」这一张图。
- **合规性**：✅ —— 这是**本表合规性最干净的一条**。用到的全部概念都在德国 SI/EF 范围内，中国侧贡献的纯粹是**组织结构**（枢纽图 + 两步走法），不是任何新概念。
- **Abitur 应用**：**全题型通用入口**。EF-1 的酯化产量、EF-2 的 MWG 计算（须先把浓度换成物质的量）、GK-05 滴定计算、GK-06 量热、LK-03 溶度积、LK-08 Faraday 计算 —— **Q 阶段所有定量题都从这里出发**。AFB I/II。配合「单位全程携带 + 数量级检验」直接命中德国的给分点。
- **产出物**：`05_Chemie/CN-Stoffmenge-Umrechnungsnetz.md`（**一页枢纽图** + 四条支路的桥墩表 + 「先到 n 再到目标」两步走法 + 6 道原创改写题）。⚠️ 与现有 `CN-Chemie-Formelhandbuch.md` §1「摩尔组/浓度组/气体组」**重叠** → 见 §6，建议**升级**而非新建。

### CN-Methode 2：三段式（ICE 表）—— 起始 / 变化 / 平衡

- **技法内容**：对任何平衡计算（化学平衡 / 弱电解质电离 / 溶度积），一律先画一张三行表：**起始浓度 → 变化量（用 `-x` / `+x`，符号由方向定，系数由方程式定）→ 平衡浓度**，再把平衡行代入 `K` 表达式解方程。关键是把「变化量」这一行**按系数比**写成 `x`、`2x`、`…`，而不是凭直觉凑数。来源：`[CN-课标]` 选必1 2.1（化学平衡常数 + 浓度商 Q 与 K 的相对大小判方向）+ 3.2（电离平衡常数）+ 3.4（沉淀溶解平衡）；`[CN-高考]` 三段式标准解法。
- **DE-Anschluss**：**`Massenwirkungsgesetz`（EF-2 已教，且明文要求「bestimmen rechnerisch Gleichgewichtslagen … mithilfe des MWG」）** · `Gleichgewichtsreaktionen` 与动态平衡（EF-2）· `K_S`/`K_B`（Q-1，LK 要求用 MWG 推导并计算）· `Löslichkeitsgleichgewichte`（LK-03）。⚠️ **德国 KLP 只写「用 MWG 计算」，未规定任何方法** → 三段式填补的是**方法空白**，不是知识空白。
- **合规性**：✅ —— 三段式的全部输入（起始浓度、方程式系数、K 表达式）德国都已教；中国侧提供的是**表格化的记账方式**。这是本表**可嫁接性最高**的一条。
- **Abitur 应用**：EF-12（K_c 定量）、GK-02（常数解释）、**LK-01（弱酸弱碱 pH）**、**LK-03（溶度积 K_L）**、**LK-06（用 MWG 推导 K_S 后的计算）**。AFB II；转化率/产率讨论可上 AFB III。
- **产出物**：`05_Chemie/CN-Gleichgewichts-Dreisatz-Tabelle.md`（模板卡 + 三类平衡各 3 道原创题）。⚠️ 与现有 `CN-Chemie-Tricks.md` **无重叠**（六法中无三段式）→ **新建**。

### CN-Methode 3：电化学「四要素」分析框架（`Analyseraster`）

- **技法内容**：拿到任何电化学装置，按**固定的四格**逐一填 —— ① **电极反应**（氧化半反应 / 还原半反应，各自配平）；② **电极材料**（活泼性 / 是否参与反应 / 惰性电极）；③ **离子导体**（电解质溶液或熔融盐，承担内部电荷输运）；④ **电子导体**（外电路金属导线，承担电子输运）。填完四格后再判流向：**电子走外电路（电子导体），离子走内电路（离子导体）**，二者在电极上完成交接。五步流程：判类型（自发 = 原电池 / 被迫 = 电解池）→ 定两极 → 写半反应 → 查电子流向与离子迁移方向 → 算电量-物质的量关系。来源：`[CN-课标]` **模块1 教学提示原文明确列举「电极反应 · 电极材料 · 离子导体 · 电子导体」四要素**，用以建立对电化学过程的系统分析思路；必修3.4 学业要求「辨识简单原电池的构成要素」；`[CN-高考]` 五步流程。
- **DE-Anschluss**：`galvanische Zellen`（GK-09 已教）· `elektrochemische Spannungsreihe`（**GK-09 已教，这是判定两极的现成工具**）· `Redoxreaktionen als Elektronenübertragungsreaktionen`（GK-08 已教）· `Metallbindung / Elektronengasmodell`（GK-09 已教，正对「电子导体」）· `Ionenbindung` 与离子迁移（Q-1 GK-07 / Q-2 已教，正对「离子导体」）· `Elektrolyse`（GK-10）· `Korrosion`（GK-11）。**四要素里的每一项德国都已教，缺的只是「把它们装进同一张表」这个统一抓手。**
- **合规性**：✅ —— 这是**课标明文**的框架（不是教学归纳），且四项要素在德国 Q-2 GK 中**逐项都有对应内容**。引入的是**分析顺序**，零新增知识。
- **Abitur 应用**：**Q-2 全部题型**：GK-09 原电池与电动势计算、GK-10 电解、GK-11 腐蚀与防腐、LK-08 Faraday 定量、LK-09 Redoxtitration、LK-07 浓度电池。AFB II 为主；「为给定装置补全四要素并论证」可上 AFB III。⚠️ **Q-2 现有笔记完全零覆盖**（见 DE §8）→ 这是**填空白的第一块**。
- **产出物**：`05_Chemie/Elektrochemie-Vier-Elemente-Raster.md`（**一页四格 Raster** + 与 `Spannungsreihe` 的拼接说明 + 5 道原创题）。🟢 **优先产出**。

### CN-Methode 4：离子方程式的「写—拆—删—查—判」五步法

- **技法内容**：① **写**：先正确写出并配平化学方程式；② **拆**：强酸、强碱、可溶性盐拆成离子，**弱电解质、沉淀、气体、氧化物、水一律不拆**；③ **删**：删去两边不参加反应的旁观离子；④ **查**：**原子守恒 + 电荷守恒双重检验**（离子方程式必须两边净电荷相等，这是最强的自检）；⑤ **判**：是否符合**离子反应发生条件**（生成沉淀 / 气体 / 弱电解质，或发生氧化还原）。来源：`[CN-课标]` 必修2.3「通过实验事实认识离子反应及其发生的条件」+ 水平 1-1「能结合实例书写离子方程式和氧化还原反应化学方程式」；`[CN-教材]` 拆删查三步记法；电荷守恒双查为 `[CN-高考]` 训练项。
- **DE-Anschluss**：`Ionenreaktionen`（**Q-1 GK-04 三类检出反应与离子检出已教**）· `Protolysereaktionen`（GK-01 已教，本身就是质子传递的离子过程）· `Ionengitter / Ionenbindung`（GK-07 已教，正对「拆」的物理依据）· `Redoxreaktionen`（GK-08 已教）· `Nachweisreaktionen`（Fällung / Farbreaktion / Gasentwicklung，**GK-04 明文三类**，正对第 ⑤ 步的发生条件）。**五步用到的全部判据德国都已教。**
- **合规性**：✅ —— ⚠️ 德国 KLP 涉及离子反应但**不系统训练这套书写逻辑**，学生在配平 `Redoxgleichungen` 时**缺乏电荷守恒的显式检验习惯**。引入的是**书写与自检流程**，不是新知识。（⚠️ 注意：德国不常用「离子方程式」这一体裁，本题材主要用于**分析反应本质**与**自检配平**，作答时仍须写成德国习惯的完整反应式。）
- **Abitur 应用**：GK-04 的离子检出与三类检出反应（**直接命中**）；GK-01 的质子传递反应书写；GK-08 的氧化还原配平自检；LK-03 溶度积的沉淀生成判断。AFB I/II。对「Sicherheit im Umgang mit Fachsprache und -methoden」有正面作用。
- **产出物**：`05_Chemie/CN-Ionengleichung-5-Schritte.md`（五步卡 + 「拆不拆」判据表 + 电荷守恒自检示例）。⚠️ 与 `CN-Chemie-Tricks.md` Trick 1 守恒法**部分重叠** → 建议作为其**深化子卡**。

### CN-Methode 5：守恒法家族 + 差量法（**电子守恒是电化学的接口**）

- **技法内容**：把「守恒」拆成四条可分别调用的支线 —— ① **质量/原子守恒**（配平方程式就是它的书写形式）；② **电子守恒**（氧化剂得电子数 = 还原剂失电子数，是 redox 配平与电化学定量的核心）；③ **电荷守恒**（离子方程式与溶液体系的净电荷平衡）；④ **元素守恒**（某元素在转化过程中总量不变，用于多步反应跳过中间步骤）。**差量法**是质量守恒的近路：用反应前后**固体质量差 / 气体体积差**直接对应固定的物质的量关系（必先配平，差值与摩尔的比例来自系数比）。**极值法**是守恒的边界工具：假设混合物「全是 A」或「全是 B」，真值必在两极值之间（⚠️ 只给范围，不给精确值）。来源：`[CN-课标]` 水平 2-2「应用质量守恒定律」（**质量守恒为课标明示**）；`[CN-教材]` 守恒/差量/极值三法；`[CN-高考]` 电子守恒在电化学与 redox 滴定中的训练。
- **DE-Anschluss**：`Massenwirkungsgesetz` 与配平（EF-2 / GK）· `Redoxreaktionen als Elektronenübertragungsreaktionen`（GK-08 已教）· `elektrochemische Spannungsreihe` 与 `Berechnung der Zellspannung`（GK-09）· **`Faraday-Gesetze`（LK-08：计算物质转化量）** ← **电子守恒正是 Faraday 计算的数学内容** · `Nachweisreaktionen` 的 Gasentwicklung/Fällung（GK-04，正对差量法的气体/固体差）。**四条支线德国全部已教。**
- **合规性**：✅ —— 守恒律是**普遍原理**，不是中国特有的知识块。差量法/极值法属**计算技巧**，用到的工具（配平、系数比、摩尔质量）全在 EF 范围内。⚠️ 唯一限制：**不得用「反应历程 / 活化能」等中国知识块去解释**（见 EF-13）。
- **Abitur 应用**：**LK-08 Faraday 计算（最高价值接口）** · GK-08 redox 配平 · GK-05/GK-06 滴定与量热的质量关系 · EF-1 的产量计算 · LK-09 Redoxtitration。AFB I/II。差量法在 `fachpraktische Aufgabe` 的实验数据处理题中特别有效。
- **产出物**：`05_Chemie/CN-Erhaltungs-und-Differenzmethode.md`（四守恒支线卡 + 差量/极值各 3 道原创题 + **「电子守恒 → Faraday」的显式桥接段**）。⚠️ 与 `CN-Chemie-Tricks.md` Trick 1/2/3 **高度重叠** → 见 §6，建议**升级并补 Faraday 桥接**。

### CN-Methode 6：「碳骨架 + 官能团」双轴有机推断 + 逆向合成

- **技法内容**：把有机推断题降维成**两个正交的轴** —— **轴一（碳骨架）**：先由分子式算**不饱和度**，确定碳数、环数与不饱和键数，锁定骨架候选；**轴二（官能团）**：由**特征反应与反应条件**反推官能团（如使溴水褪色 → C=C；与 Na 放 H₂ → -OH/-COOH；发生银镜反应 → -CHO；NaOH/醇加热 → 卤代烃消去）。两轴交叉即定位分子。**逆向合成（Retrosynthese）**：从目标分子倒推，先切碳骨架（成键反应：加成/取代/缩合），再调官能团（转化 + **保护**），每步只做一件事。来源：`[CN-课标]` 选必3 2.3「**认识有机合成的关键是碳骨架的构建和官能团的转化**，了解设计有机合成路线的一般方法」；1.2 官能团转化与鉴别；学业要求主题2 第 4 条「推断有机化合物、检验官能团、设计有机合成路线」；教学提示**明示**「兼顾正向合成和逆向合成任务」「体会**官能团保护**、绿色设计等思想」。
- **DE-Anschluss**：`funktionelle Gruppen` 与 Nachweise（**EF-1 已教 4 类，Q-3 GK 加氨基**）· `Konstitutionsisomerie`（EF-4）· `Stereoisomerie`（GK-14）· **Q-3 的 `Reaktionsmechanismen`**（GK 两条，LK 五条：radikalische Substitution / elektrophile Addition / **S_N1·S_N2** / elektrophile Erstsubstitution / Kondensationsreaktion）← **机理正好给逆向合成提供「切哪里」的依据** · `reaktionswege`（Q-3 IF 名即为此意）。**两轴用到的全部识别工具德国都已教。**
- **合规性**：✅ —— **机理 × 推断 = 本表最精妙的合法嫁接入口**。德国有机理深度但**无推断题型**，中国有推断题型但**无机理深度**；两者互补，且**不引入任何德国 KLP 之外的新知识**（碳骨架/官能团/机理全是德国已教内容，中国侧提供的是**两步降维的解题顺序**）。⚠️ 限制：**不得引入中国选必3 的 10 类官能团全表**（德国只认 5 类）与**具体的中国试剂体系**。
- **Abitur 应用**：**LK-19「从分子结构推演反应行为」**（LK 泛化要求，正对双轴法）· GK-13 官能团检验 · GK-16 / LK-11 / LK-12 的机理选择（由结构推反该走哪条机理）· Q-3 的合成路线设计题。AFB II/III（逆向合成自带的「为何这样切」论证正对 AFB III）。
- **产出物**：`05_Chemie/Organische-Struktur-und-Retrosynthese.md`（双轴推断卡 + 不饱和度速算 + 逆向合成三步 + 5 道原创推断题，**全部限定在德国 5 类官能团内**）。🟢 **优先产出**（Q-3 现有笔记完全零覆盖）。

### CN-Methode 7：`MWG → K_S` 推导链（**化解台阶①**）

- **技法内容**：把「从 MWG 到酸碱常数」拆成**固定的四步推导链** —— ① 写出酸的**质子传递（Protolyse）平衡式** `HA + H₂O ⇌ A⁻ + H₃O⁺`；② 按 **MWG 写出 K 表达式**（**纯液体 H₂O 不写入**，因其浓度视为常量）；③ 把 `[H₂O]` 并入常数，定义 **`K_S = K · [H₂O] = [A⁻][H₃O⁺]/[HA]`**；④ 取负对数得 **`pK_S = -lg K_S`**，并读出**「pK_S 越小酸越强」**与**「pH = pK_S 时 [HA] = [A⁻]」**两条可直接用于滴定曲线半等当点的结论。这套链一旦建立，**缓冲（Henderson-Hasselbalch）、滴定曲线三特征点、溶度积**全部是它的下游推论。来源：`[CN-课标]` 选必1 3.2 电离平衡常数 + 水的电离与 `K_w`（中国侧提供的是「把水的浓度并入常数」这一步的熟练操作）；`[CN-高考]` 由 K_a 求 pH 与缓冲的成套训练。
- **DE-Anschluss**：**EF-2 的 `Massenwirkungsgesetz`（K_c）—— 已教且要求定量计算** · Q-1 GK-01 的 `Protolysereaktionen` 与 Brønsted 概念 · Q-1 GK-02 的 `K_S`/`pK_S`/`K_B`/`pK_B` · **LK-06 明文要求「用 MWG 推导 K_S/pK_S/K_B 并计算」** ← **推导本身是德国 LK 的规定动作**，中国侧提供的只是**四步顺序与「并入 [H₂O]」这一步的操作化**。
- **合规性**：✅ —— ⚠️ **注意这一条的方向与其他技法相反**：推导要求**来自德国 LK**（不是中国带来的），中国侧贡献的是「**先写平衡式 → 再写 K → 再并入常量 → 再取负对数**」这一**思维顺序**。德国学生常卡在不知道「为什么 H₂O 不进表达式」与「pK_S 怎么用」。
- **Abitur 应用**：🔴🔴 **本表最高价值条目**。**LK-06 直接命中**；下游覆盖 LK-01（弱酸碱 pH）、**LK-02（Puffersysteme + Henderson-Hasselbalch）**、**LK-04（Titrationskurve 三特征点，半等当点即 pH = pK_S）**、LK-03（溶度积）。AFB II/III。**这是把现有 `Saeure-Base-Gleichgewichte-pH-Wert.md` 从 EF 侧推到 LK 侧的唯一通道。**
- **产出物**：`05_Chemie/MWG-zu-KS-Ableitungskette.md`（四步推导卡 + 「pK_S ⇄ 强度 ⇄ 半等当点」三联表 + 下游四块各 2 道原创题）。🟢🟢 **最高优先级产出** —— 直接接 §0.4 的台阶诊断。

### CN-Methode 8：盖斯定律的「路径法」（反应焓的加减）

- **技法内容**：把目标反应看作**起点到终点的路径**，已知反应是可拼接的路段。操作三步 —— ① **定位目标物质**：在已知热化学方程式中找出目标反应的反应物与生成物；② **调整系数与方向**：系数乘 n 则 ΔH 乘 n，方向反转则 ΔH 变号；③ **相加并消去中间物**：把所有调整后的方程式相加，中间物质须**系数相同且在异侧**才能消去。核心是「**焓是状态函数，只与始终态有关**」这条唯一依据。来源：`[CN-课标]` 选必1 1.2「恒温恒压反应热 = 焓变」+「**盖斯定律及其简单应用**」+ 学业要求「反应焓变的简单计算、热化学方程式书写」；`[CN-教材]` 路径法与键能法。
- **DE-Anschluss**：**`Satz von Hess`（Q-2 GK 明文列出）** · `Standardreaktionsenthalpien`（GK 明文）· `Erster Hauptsatz der Thermodynamik`（Q-1 GK / Q-2 GK 已教）· `Neutralisationsenthalpie` 与 `Kalorimetrie`（GK-06）· LK 的 `Lösungsenthalpie`。**盖斯定律本身就是德国 GK 的内容重点**，中国侧提供的只是**三步操作化流程**与更高密度的训练量。
- **合规性**：✅ —— 零新增知识。⚠️ 限制：**键能法**虽在中国常用，但德国 KLP 未把键能表列为内容重点 → **只可用盖斯定律路径法**，键能法仅作验算手段，不作主方法。
- **Abitur 应用**：**GK-12（Hess 定律 + 标准反应焓）直接命中**；GK-06 量热与中和焓；LK-05 溶解焓；LK-10 的自由能计算也需先得 ΔH。AFB I/II。
- **产出物**：`05_Chemie/CN-Hess-Pfadmethode.md`（三步卡 + 「系数/方向/消去」三操作 + 5 道原创改写题）。⚠️ 与 `CN-Chemie-Tricks.md` **无重叠**（六法中无盖斯定律）→ **新建**。

### CN-Methode 9：量级检验 + 极值检验（`Größenordnungsprüfung` / `Grenzfallprobe`）

- **技法内容**：算出结果后做两项 30 秒自检 —— ① **量级检验**：把结果与日常经验对照（0,1 mol 气体约 2,2 L ≈ 大可乐瓶；0,5 mol/L 是普通糖水量级）；② **极限检验**：把某个参数推向 0 或 ∞，看结果是否退化为已知常识（如稀释时 `c → 0`、`pH → 7`；`K` 很大时平衡几乎完全右移）。两项都过，计算错误概率大幅下降。来源：`[CN-教材]` 数量级评价与特殊值法；`[CN-课标]` 学业要求中反复出现的「评价/检验」要求。
- **DE-Anschluss**：`Kalorimetrie` 与 `Neutralisationsenthalpie`（GK-06，须评估实验数据的合理性）· `Berechnung der Zellspannung`（GK-09）· `Fachpraktische Aufgabe` 的 Messreihen 处理（法定 Überprüfungsformen 明文要求「大数据量 Messreihen 处理」）· **Basiskonzept `Chemische Reaktion` 的定量侧**（S16–S17）· `Bewertungskompetenz` 的「从多视角审视结果」。**零新增知识，纯元认知检查**。
- **合规性**：✅ —— 这是**检查习惯**，与课程内容完全无关，任何学段都合法。
- **Abitur 应用**：**全题型通用**。尤其 LK-01（弱酸碱 pH，最易在数量级上出错）、LK-03（溶度积，K_sp 极小值的指数运算）、LK-04（滴定曲线三特征点）。**不占分，但防止丢分**；对「fachpraktische Aufgabe」的实验数据评估题有直接加分作用（德国明确要求对数据合理性作判断）。
- **产出物**：并入 `05_Chemie/Klausur-Training/Chemie-Selbstcheck-Checkliste.md`（**一页纸**，考前 3 分钟过一遍）。⚠️ 现有 `CN-Chemie-Formelhandbuch.md` 已有「算完验量级」的 Klausur-Satz → 可**直接复用**，只需抽出独立成卡。

### CN-Methode 10（⚠️ **反例示范**）：盐类水解（Salzhydrolyse）体系 —— **不建议引入**

- **技法内容**：弱酸强碱盐 / 强酸弱碱盐的水解平衡、水解常数 `K_h = K_w/K_a`、离子浓度大小比较（电荷守恒 + 物料守恒 + **质子守恒**三大守恒联立）、酸式盐的电离-水解竞争判断、蒸干灼烧产物判断。这套体系在中国是**选必1 主题3 的独立知识块**并有必做实验「盐类水解的应用」。来源：`[CN-课标]` 选必1 3.3「盐类水解原理与影响因素」；`[CN-高考]` 离子浓度比较是高频题型。
- **DE-Anschluss**：⚠️ **无合法接口**。逐一核对德国 KLP：
  - `Salzhydrolyse` / `Hydrolysegleichgewicht` —— **KLP 全文未出现**（Q-1 的 Schwerpunkte 只有 Protolyse、酸碱常数、检出反应、滴定、热化学、离子晶格）。
  - **质子守恒（Protonenbilanz）** —— **KLP 未出现**，且其建立依赖水解平衡概念。
  - `Puffersysteme`（LK-02）看似最近，但德国 LK 的缓冲是**「弱酸 + 其共轭碱」的直接配对 + Henderson-Hasselbalch 方程**，**不经过盐类水解这条路径**。
  - ⚠️ 唯一沾边的是 `K_w`（水的自耦电离），但德国用它服务于 pH 定义，不用于推导水解常数。
- **合规性**：⚠️ **不合规** —— 违反**铁律 1**：这是**知识板块**，不是方法。虽然它紧邻 LK-02 `Puffersysteme`（**最危险的越界诱惑**：LK 的缓冲与弱酸碱 pH 都涉及弱酸盐），且中国体系极其成熟，但**引入它需要同时引入「水解平衡」这一德国 KLP 完全没有的概念**，代价远大于收益。
- **Abitur 应用**：⛔ **无**。⚠️ 特别提醒：**不要因为在 LK 缓冲题里看到醋酸钠，就把中国的「醋酸钠水解」整套搬进去** —— 德国的正确解法是「Ac⁻/HAc 构成一个缓冲对，直接用 Henderson-Hasselbalch」，**不需要水解概念**。
- **产出物**：不做笔记；仅在 `05_Chemie/CN-Chemie-Bruecke.md` 中标注为「**桥接素材，非考纲内容**」，并**显式记录这条禁入判据**（防止后续 agent 误引入）。

---

## 4. 高价值差异清单（**行动项**）

> 排序 = **Abitur 应试性价比**（把中国的知识密度与解题技法，适配进德国框架）。

### 🎯 中国更深 / 更系统 —— 值得借鉴改写

| 优先级 | 知识点 | 中国做法 | 德国现状 | 可产出 |
|---|---|---|---|---|
| 🔴 **1** | **MWG → K_S 推导链** `LK-06` / §0.4 | 四步推导 + 「并入 [H₂O]」+ pK_S ⇄ 半等当点 | **LK 明文要求推导**，但 EF 只当计算工具，中间断层 | **《MWG-zu-KS-Ableitungskette》（CN-Methode 7）** —— 本表最高价值；同时**解锁 LK-01/02/03/04 四块** |
| 🔴 **2** | **电化学四要素分析框架** `GK-09` | 课标明文「电极反应/电极材料/离子导体/电子导体」+ 五步流程 | 四项都有，**缺统一抓手**；Q-2 笔记**完全零覆盖** | **《Elektrochemie-Vier-Elemente-Raster》（CN-Methode 3）** |
| 🔴 **3** | **物质的量枢纽换算网络** `EF-15` | `n` 为中心节点，四条支路 + 两步走法 | 偏 `Stöchiometrie` 比例直觉，KLP 未规定方法 | **升级 `CN-Chemie-Formelhandbuch.md`（CN-Methode 1）** —— 全题型入口 |
| 🔴 **4** | **三段式 ICE 表** `EF-12` / `LK-01/03` | 起始-变化-平衡三行表 + 按系数比设 x | KLP 只写「用 MWG 计算」，**未规定方法** | **《CN-Gleichgewichts-Dreisatz-Tabelle》（CN-Methode 2）** —— 可嫁接性最高 |
| 🔴 **5** | **碳骨架 + 官能团双轴推断 + 逆向合成** `LK-19` | 不饱和度定骨架 + 特征反应定官能团 + Retrosynthese | 有机理深度但**无推断题型**；Q-3 笔记**完全零覆盖** | **《Organische-Struktur-und-Retrosynthese》（CN-Methode 6）** —— 机理 × 推断 |
| 🟠 **6** | **滴定曲线三特征点** `LK-04` | 起始 pH / 半等当点 / 等当点的成套算法 | LK 明文要求预测曲线，但学生缺抓手 | 并入 CN-Methode 7 的下游子卡 |
| 🟠 **7** | **盖斯定律路径法** `GK-12` | 三步操作化 + 训练密度高 | Hess 是 GK 内容重点，但训练量低 | **《CN-Hess-Pfadmethode》（CN-Methode 8）** |
| 🟠 **8** | **离子方程式五步法** `GK-04` | 写-拆-删-查-判 + 电荷守恒双查 | 有离子反应，**不系统训练书写逻辑与自检** | **《CN-Ionengleichung-5-Schritte》（CN-Methode 4）** |
| 🟠 **9** | **守恒法 + 差量法** `LK-08` | 四守恒支线 + 差量/极值 | 守恒律都有，**电子守恒未与 Faraday 显式桥接** | **升级 `CN-Chemie-Tricks.md` + 补 Faraday 桥接（CN-Methode 5）** |
| 🟠 **10** | **基团相互影响解释反应性** `GK-15` | 课标明文两条（官能团相互影响 / 键极性改变） | 只有 Schwerpunkt 条目，**无展开** | 直接补进 Q-3 笔记（**合规**：不引入新知识，只补「为什么」） |

### ⚪ 德国独有 / 更深 —— 中国学生的**缺口清单**

| 优先级 | 知识点 | 说明 | 补法 |
|---|---|---|---|
| 🔴 **1** | **反应机理**（GK 2 条 / LK 5 条）`GK-16` / `LK-11/12` | GK 就要**机理**（自由基取代、亲电加成）；LK 加 S_N1/S_N2、芳香亲电取代、Mesomerie。**中国只讲反应类型，不讲机理** | **台阶③** → 先补「电子式 / 形式电荷 / 极化 / 电负性」过渡层，再进机理 |
| 🔴 **2** | **Nernst 方程 + 浓度电池** `LK-07` | LK 标志性内容，**中国高中完全没有** | 逐条补（对数式运算不是障碍，概念是障碍） |
| 🔴 **3** | **自由能 + Gibbs-Helmholtz + 第二定律** `LK-10` | LK 要求**计算 ΔG**，中国课标无 ΔG | 与 `03_Mathe` 联动补对数与代数；概念须从零建 |
| 🔴 **4** | **3 个 `Basiskonzepte`** `X-01` | 内容侧跨 IF 骨架，是德国化学作答的**官方得分语言** | 必做：《Basiskonzepte 三轴追踪卡》 |
| 🔴 **5** | **Farbstoffe + 光吸收 + 吸收光谱解读** `LK-14` | LK 独立大板块，中国完全空白；依赖 `Mesomerie` 前置 | 与 LK-12 的 Mesomerie 合并补 |
| 🔴 **6** | **用 MWG 推导（而非应用）** `LK-06` | 中国只要求应用常数，**不要求推导** | → **CN-Methode 7**（这是唯一的中国侧助力点，但仍须按德国要求走） |
| 🟠 **7** | **Nanochemie** `LK-18` | 纳米材料/纳米结构/**表面性质** + 机遇风险评价 | 中国选修3 有提及但**不在高考范围** → 从零补 |
| 🟠 **8** | **Entropie 与自发吸热溶解** `LK-05` | GK 完全无 `Entropie`；LK 要求用熵变解释自发吸热溶解 | 中国只说「与焓变和熵变有关」，须补**解释层** |
| 🟠 **9** | **自由基聚合机理（含步骤）** `LK-17` | 中国只到加聚/缩聚分类 | 逐条补 |
| 🟠 **10** | **禁止纯论文式题目** `X-04` | 化学硬约束：**每道题必须绑定材料或实验** | 写作习惯调整 |
| 🟠 **11** | **四类法定 Überprüfungsformen** `X-07` | 尤其 `Darstellungsaufgaben` 要求**表征形式互相转换** | 中国学生的薄弱项 → 补「图 ⇄ 表 ⇄ 方程式」转换训练 |
| 🟠 **12** | **安全进入评价维度** `X-10` | B11 要求「评价实验室与日常安全并导出行为选项」 | 中国有安全规范但**不进入评价维度** → 补 `Bewertung` 写法 |
| 🟡 **13** | **Chromatografie + R_f 解读** `LK-15` | 工具层考点 | 单独记（工具层，非知识层） |
| 🟡 **14** | **三种酸碱滴定 Verfahren 的适用性与限度评价** | LK 增量条目 | 补 `Bewertung` 论证式写法 |

### 🔵 中国独有（德国不考，仅供理解 —— **禁止占用复习时间**）

| 知识点 | 说明 | 处理 |
|---|---|---|
| **《物质结构与性质》整册** `X-08` | 能级/电子排布式/电离能/电负性/**杂化轨道**/σ-π 键/**晶体四分类与晶胞**。德国 KLP **无对应 IF**，只在 EPA 模型、氧化数、金属键、离子晶格处点状出现 | ❌ 不复习。**这是中国最大且最系统的超出量** |
| **盐类水解体系** `X-09` | 水解平衡 / 水解常数 / 三大守恒联立 / 离子浓度比较 | ❌ **不复习**，且是最危险的越界诱惑 → 见 **CN-Methode 10 反例** |
| **配合物与配位化学系统板块** `X-09` | 选必2 2.1 配位键与配合物 + 必做实验 | ⚠️ 只可借 LK-16 的「配位键解释催化」**一句** |
| **原子结构与元素周期律定量化** `EF-16` | 必修3.1 + 选必2 主题1 | ❌ 不复习（EPA 模型足够） |
| **18 个必做实验的清单机制** `X-10` | 德国**无**必做实验清单 | ⚠️ 无价值（但实验**操作熟练度**可迁移到 `fachpraktische Aufgabe`） |
| **反应历程 / 基元反应活化能** `EF-13` | 选必1 2.2 | ❌ **EF 阶段不引入**（德国 EF 只列 `Katalyse` 条目） |

---

## 5. 难度与节奏差异

| 维度 | 德国 NRW（Chemie） | 中国（化学） |
|---|---|---|
| **结构骨架** | **6 个 IF（EF 2 + Q 4）+ 4 Kompetenzbereich + 3 Basiskonzepte** 三维交叉 | **必修 5 主题 + 选必 3 模块 + 选修 3 系列** × 编号内容要求，线性递进 |
| **学段标记** | ⚠️ **只有 EF / Qualifikationsphase 两级**，KLP **不标 Q1/Q2** | 必修 → 选必 → 选修，层级清晰 |
| **GK/LK 分流** | **共用同四个 IF 名**，差异在 IF 内部的 Schwerpunkt 增量；⚠️ LK 的质变在「**推导**」（ableiten/herleiten）而非广度 | 无 GK/LK 分流；选必三模块对全体选考学生一致 |
| **广度** | 窄而聚焦：无物质结构整册、无水解、无杂化、无晶体分类；但 LK 加**染料 / 纳米化学 / 色谱** | 宽而全：含上述全部；⚠️ **中国在无机与结构侧广，德国在有机机理与材料侧广** |
| **深度** | **两极化**：EF 极浅（官能团只到酯基、无机理、无酸碱）；**LK 在机理/热力学/仪器分析上极深** | 均匀且密度高：内容量大但单点深度中等（高考依据**水平 4**） |
| **定量核心** | `Stöchiometrie` 比例式为主 + MWG 计算 | **物质的量（mol）为枢纽**，换算网络化 + 三段式 + 守恒法 |
| **数学工具** | MWG、pH、**Henderson-Hasselbalch**、**Nernst 对数式**、ΔG、R_f | 物质的量换算、三段式 ICE、三大守恒、差量/极值、盖斯定律；**无 Nernst、无 ΔG** |
| **有机化学** | 无独立 IF（散在 EF-1 与 Q-3），**比重远低于中国**；但 **LK 机理深度是中国完全没有的** | **选必3《有机化学基础》独立模块 2 学分**，含逆向合成与官能团保护 |
| **实验** | **无必做清单**，实验是方法载体；LK 大量要求**设计实验**与**处理大数据量 Messreihen** | **18 个必做实验逐条点名**（附录3 硬性清单，必修 9 + 选必 9） |
| **题型** | **法定两题型**：`Materialgebundene Aufgabe` / `Fachpraktische Aufgabe`；⚠️ **禁止纯论文式题目**；AFB II 为重心；口试 20–30 min | 选择题 + 非选择题（**呈现解答过程**）；课标只给原则性要求，**未规定题型与分值** [未获取到] |
| **评价方式** | EPA **0–15 分制** + Zentralabitur；AFB I/II/III；⚠️ **GK 与 LK 的 AFB 分界线不同** | 高考**等级分制**；学业质量 **4 级**（合格考 = 水平 2，**高考 = 水平 4**） |
| **考试时长** | **GK 255 min / LK 300 min**（BASS 13-32 Nr. 6）[已验证] | 各省自定，**课标未规定** [未获取到] |
| **跨学科轴** | **Basiskonzepte 为内容侧骨架**（结构 / 反应 / 能量） | **STSE 为独立核心素养**（科学态度与社会责任） |

---

## 6. 现有 `CN-Chemie-*` 三篇的**可复用性评估**

> 任务提示要求评估。项目已有三篇（`05_Chemie/CN-Chemie-Formelhandbuch.md` / `CN-Chemie-Tricks.md` / `Klausur-Training/CN-Chemie-Training.md`），**全部为「DE-CN-EN 桥，全自编」**，无版权风险。以下为逐篇评估结论（本项目推导，[据推断]）。

| 笔记 | 现状定位 | 可复用到哪 | 复用方式 | 判定 |
|---|---|---|---|---|
| **`CN-Chemie-Formelhandbuch.md`** | 六组公式卡（摩尔 / 浓度 / 气体 / pH / 氧化还原 / 平衡），带中德英术语盒与量级检验 | **Q-1（pH/缓冲/滴定）+ Q-2（Nernst/Faraday）+ EF-2（MWG）** | ✅ **可直接升级为 CN-Methode 1（枢纽换算网络）**。⚠️ 三项必改：① **符号校准** —— `K_S`/`pK_S`（德）vs `K_a`/`pK_a`（中），须双标；② **pH 组**目前只到强酸强碱（`pH = -lg[H⁺]`、`K_w`），**须扩到弱电解质电离**（LK-01）；③ **平衡组**须补三段式（CN-Methode 2） | 🟢 **高可复用**，改造量小 |
| **`CN-Chemie-Tricks.md`** | 六法（守恒 / 差量 / 极值 / 官能团 / 电化学 / 氧化数），每法配自编 mini 例题 + 德语 Klausur-Satz | **EF-1（官能团识别）+ GK-04（离子反应）+ GK-08（redox）+ GK-09（电化学）+ LK-08（Faraday）** | ✅ **Trick 1/2/3 直接对应 CN-Methode 5**，Trick 4 对应 CN-Methode 6 的官能团轴，Trick 5/6 对应 CN-Methode 3 的电极判定。⚠️ 三项必补：① **电子守恒 → Faraday 的显式桥接**（现无）；② **「四要素」框架**（现只有「阳氧阴还」口诀，缺离子导体/电子导体两格）；③ **盐类水解禁入标注**（防止后续误引入） | 🟢 **高可复用**，需补两块 |
| **`CN-Chemie-Training.md`** | 4 道自编题（配平 / 摩尔 / redox / 成键与周期表）+ EHZ 期望视界 + 德语 Transfer-Satz | **各 IF 的定量题训练** | ✅ **EHZ 分点写法与德语 Transfer-Satz 是优质资产**（正对德国按步给分）。⚠️ 两项问题：① **Aufgabe 4（成键与周期表）属 `CN-only`**（X-08），**应移除或标注为「仅供理解」**；② 4 题全部落在 **EF/SI 层**，**Q 阶段零覆盖** → 须按 IF 切片补 Q-1/Q-2 两套 | 🟡 **中等可复用**，需删 1 题 + 扩 Q 阶段 |

**三篇的共同缺口（必须由新增笔记补）**：

| 缺口 | 对应技法卡 | 优先级 |
|---|---|---|
| **MWG → K_S 推导链**（三篇全无，且是台阶①的唯一通道） | CN-Methode 7 | 🔴🔴 最高 |
| **三段式 ICE 表**（三篇全无） | CN-Methode 2 | 🔴 高 |
| **电化学四要素框架**（只有「阳氧阴还」口诀，不成 Raster） | CN-Methode 3 | 🔴 高 |
| **盖斯定律路径法**（三篇全无） | CN-Methode 8 | 🟠 中 |
| **有机双轴推断 + 逆向合成**（只有官能团识别，无推断与合成） | CN-Methode 6 | 🟠 中 |
| **离子方程式五步法**（只有守恒原理，无书写流程） | CN-Methode 4 | 🟠 中 |

> 🎯 **总判定**：三篇是 **Q 阶段笔记的现成原料，不是待补的空白** —— 但**全部卡在 EF/SI 层**，且**缺 Q 阶段最关键的推导链与三段式**。
> 📌 **建议动作**：**升级 2 篇（Formelhandbuch / Tricks）+ 新建 5 篇（Methode 2/3/6/7/8）+ 精简 1 篇（Training 移除 Aufgabe 4）**，而非全部重写。

---

## 7. 待核实项

- [ ] **`Operatoren-NRW-Alle-Faecher.md` 尚未创建** —— 化学的官方 Operatoren 动词表未取得，本表未列动词层对照 [未获取到]
- [ ] **`Klausur-Formate/Klausur-und-Abitur-Formate.md` 目录尚未创建** —— Abitur 时长仅从 `01-Quellen.md §A.4` 取得，未与该文件交叉核对 [未获取到]
- [ ] 化学 Operatoren 的 Fachseite 直链（`.../zentralabitur-gost/faecher/chemie-gost`）**未实测** [据推断，见 DE §7]
- [ ] **Abitur 2027 化学的 Fachliche Vorgaben** 具体内容（是否指定 IF 组合）[未获取到]
- [ ] 中国**各省等级性考试的试卷结构与分值比例** —— 课标只给原则性要求，**未规定题型与分值** [未获取到]
- [ ] **德国 GK 是否隐含涉及盐类水解** —— 本表依 KLP 原文结论（**GK 与 LK 的 Schwerpunkte 均无 Hydrolyse**）判为 `CN-only`，但未逐条排查 Kompetenzerwartungen 全文 [据推断]
- [ ] **`Löslichkeitsgleichgewichte` 在 LK 的具体符号约定**（`K_L` vs `K_sp`）与是否要求**分步沉淀**计算 [据推断]
- [ ] `Farbstoffe` 板块的**吸收光谱解读**是否要求定量（λ_max 与结构关联）还是仅定性比较 [未获取到]
- [ ] **Q 阶段四 IF 的实际教学顺序**（Q1 = IF-1+IF-2 / Q2 = IF-3+IF-4 为本项目推断，KLP 不标 Q1/Q2）[据推断]
- [ ] 选修系列3《发展中的化学科学》主题3 标题（CN 源文件标注 [未获取到]，本表未依赖该项）

---

## 变更记录

- 2026-09-24：创建（S5 中德映射阶段）。基于 `Deutschland/Chemie-Oberstufe.md`（官方 KLP `gost_klp_ch_2022_06_07.pdf`，Heft 4723，`2022/23`，逐条 [已验证]）与 `China/Chemie-CN-Kursstandard.md`（`2017年版2020年修订`，逐条 [已验证]）交叉推导。**无官方中德对照文件**，全部对照关系为本项目推导，逐条标注 [据推断]。
  - **继承并写入德国侧三条硬更正**：① `Reaktionsgeschwindigkeit und chemisches Gleichgewicht` 属 **EF 而非 Q1/Q2**；② Q 阶段真实四 IF 为 `Säuren, Basen und analytische Verfahren` / `Elektrochemische Prozesse und Energetik` / `Reaktionswege in der organischen Chemie` / `Moderne Werkstoffe`；③ **EF 不含酸碱内容**。
  - **写入化学特有第三维 `Basiskonzepte`**（Aufbau und Eigenschaften / Chemische Reaktion / Energie），并指出各 IF 贡献分布不均。
  - **写入最高价值台阶**：`Massenwirkungsgesetz` 从 EF「算 K_c」升级为 LK「用 MWG 推导 K_S/pK_S/K_B」，并诊断现有 `Saeure-Base-Gleichgewichte-pH-Wert.md` 正卡在 EF 侧（未走完这一跳，故无法支撑 LK 的 Puffer / K_L / Titrationskurve）。
  - **产出 10 条 CN-Methode 技法卡**（含 5 条指定深化项：物质的量枢纽换算网络 / 电化学四要素框架 / 碳骨架+官能团双轴推断+逆向合成 / 离子方程式五步法 / 守恒法+差量法；另补三段式 ICE、MWG→K_S 推导链、盖斯定律路径法、量级检验），全部标注 `DE-Anschluss`、合规性与来源分层。
  - ⚠️ **CN-Methode 10 为反例示范**：**盐类水解体系不引入** —— 演示「紧邻 LK 缓冲却仍不得引入」的判据（KLP 全文无 Hydrolyse，引入需同时引入新概念，违反铁律 1）。
  - 主表 65 条（EF 16 / Q-GK 18 / Q-LK 19 / X 12），全部标注 Abitur 应试价值与依据。
  - 增补 §6「现有 `CN-Chemie-*` 三篇可复用性评估」（升级 2 / 新建 5 / 精简 1）。
