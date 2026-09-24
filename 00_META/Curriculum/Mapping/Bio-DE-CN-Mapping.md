---
fach: "Bio"
thema: "DE-CN Mapping"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Q1, Q2, Meta, Curriculum, Mapping]
de_quelle: "Deutschland/Bio-Oberstufe.md"
cn_quelle: "China/Bio-CN-Kursstandard.md"
---

# Bio — 中德考纲对照表（NRW ↔ 中国）

> 德国源：[`Deutschland/Bio-Oberstufe.md`](../Deutschland/Bio-Oberstufe.md)（NRW KLP Biologie，Heft `4722`，版本 `2022/23`，PDF `gost_klp_bi_2022_06_07_0.pdf`，62 页）
> 中国源：[`China/Bio-CN-Kursstandard.md`](../China/Bio-CN-Kursstandard.md)（`2017年版2020年修订`；必修 2 模块 + 选择性必修 3 模块 + 选修三方向 22 模块）
>
> ⚠️ **无任何官方中德对照文件**。本表所有「对应关系」**均由本项目自行推导**（双边事实分别来自上述两份已验证文件，但对应关系本身无官方依据）。
> ⚠️ **标注分布说明**：德国侧结构事实与中国侧条目事实在其源文件中为 `[已验证]`；本表的**对照关系一律 `[据推断]`**（符合 `00-Design.md §1.6` 所述的正确分布）。**例外**：X 域中标 `[已验证]` 的行是**纯德国侧结构事实**（直接引自 DE 源文件的已验证段落），其与中国侧的对照部分仍为本项目推导。
> 🎯 **本表的取向**：以 **Abitur 应试**为唯一筛选标准 —— 每个条目的价值判断回答的是「对 NRW Zentralabitur 有多大用」，而非「谁的课程更难」。
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

> 这六条若不清楚，后面所有对照都会错位。全部来自 `Deutschland/Bio-Oberstufe.md`。
> 编号规则：`EF-*` = EF 唯一 IF（Zellbiologie）· `NEU-*` / `STW-*` / `OEK-*` / `GEN-*` = Q 阶段四 IF · `X-*` = 跨域/能力/评价/结构。

### 0.1 ⚠️ EF 只有 `Zellbiologie` 一个 IF（obligatorisch）

```
EF   —— 1 个 IF：Zellbiologie
        （Aufbau / Genetik der Zelle / Biochemie / Physiologie 四个 Schwerpunkt）
                    ↓  ← ⚠️ 最大跳跃点（不是「加深」，是「单点 → 四元并列」）
Q    —— 4 个 IF：Neurobiologie / Stoffwechselphysiologie / Ökologie / Genetik und Evolution
```

[已验证] KLP **只分两级学段**（`Einführungsphase` / `Qualifikationsphase`），**无 Q1/Q2 标记**。本文件的 `EF-*`/`NEU-*` 编号是本项目为便于索引所加。

### 0.2 ⚠️ GK 与 LK 的 **IF 列表完全相同** —— 与物理恰好相反

| 维度 | GK | LK |
|---|---|---|
| IF 数量与名称 | **同样 4 个 IF**，一字不差 | 同样 4 个 |
| 差异所在 | — | **只有深度差**：每 IF 增 1–6 个 Schwerpunkt + 1–3 项 Fachliche Verfahren + 1–2 条 Bewertung |

> 📌 **与 Physik 的关键区别**：物理的 GK/LK 是**两套不同的 IF**（各 4 个，标题不同）；生物是**同一套 IF、两个深度**。
> 📌 **对本表的后果**：**不存在「GK 专属 / LK 专属的对照行」**，只有「LK 增量行」（本表以 `[LK]` 前缀标出）。
> 📌 **做题时的实用结论**：本表所有**非 `[LK]` 行对 GK 与 LK 同样有效**；`[LK]` 行 GK 考生**不得复习**。

### 0.3 四维能力 + **第三维 `Basiskonzepte`**；`Kommunikation` 是唯一纯跨 IF 维度

| 轴 | 内容 |
|---|---|
| Kompetenzbereiche（4） | `Sachkompetenz` · `Erkenntnisgewinnungskompetenz` · `Kommunikationskompetenz` · `Bewertungskompetenz` |
| **Basiskonzepte（5）** | `Struktur und Funktion` · `Stoff- und Energieumwandlung` · `Information und Kommunikation` · `Steuerung und Regelung` · `individuelle und evolutive Entwicklung` |
| 编码 | EF：`S1–S7 / E1–E17 / K1–K14 / B1–B12`；QP：`S1–S8 / E1–E17 / K1–K14 / B1–B12`（**多出的 `S8` = Biodiversität**） |

[已验证] KLP 原文：「Der Kompetenzbereich **Kommunikation** [ist] **ausschließlich inhaltsfeldübergreifend** angelegt」—— 其余三维在每个 IF 下各有一套具体条目。

### 0.4 🎯🎯 **最高价值台阶：EF 单点 → Q 四元并列（接口严重不对称）**

> EF 学生形成的心理模型是「生物 = 细胞及其内部机制」；Q 阶段却要求在**神经 / 代谢 / 生态 / 遗传演化**四个尺度差异极大的层面上切换（KLP 用 `Systemebenen` 概括：Molekularebene → Biosphäre）。[已验证]

| Q 阶段 IF | EF 侧接口 | 性质 |
|---|---|---|
| **Neurobiologie** | `Signaltransduktion` + `Biomembranen: Transport`（含 Exozytose）→ 突触传递与膜电位 | 🟢 **有机接口，无需新知识作桥** |
| **Stoffwechselphysiologie** | `ATP-ADP-System` + `Redoxreaktionen` + `Enzyme (Kinetik/Regulation)` + `Anabolismus/Katabolismus` → 化学渗透 | 🟢 **有机接口，无需新知识作桥** |
| **Ökologie** | **几乎无**（EF 只有细胞层的 `Homöostase`/渗透调节） | 🔴 **真断层，须从零起桥** |
| **Genetik und Evolution** | **极弱**（EF 的 `Meiose`/`Rekombination`/`Karyogramm` 只到**细胞层**，未上升到群体遗传与演化） | 🔴 **实质断层，须从零起桥** |

> 📌 **这是本表最重要的结论**：EF 已为 Q 四 IF 中的**两个**埋了有机接口，另**两个**完全没有。
> 📌 **补缺排序的直接依据**：① Neurobiologie（桥最短）→ ② Stoffwechselphysiologie（桥短但内容量大）→ ③ Genetik und Evolution（断层，但中国的知识存量最大）→ ④ Ökologie（断层，且德国工具与中国不重叠）。

### 0.5 ⚠️ **GK 的 Genetik und Evolution 段落无任何 `Fachliche Verfahren`**

[已验证] `PCR` / `Gelelektrophorese` / `Gentechnik (Veränderung und Einbau von DNA)` / `gentherapeutische Verfahren` **全部为 LK 独有**。
> 📌 **后果**：这是**决定若干中国技法对 GK 合规与否的判据**（见 CN-Methode 9 反例）。中国的基因工程操作程序再完整，GK 考生也不得复习其方法层。

### 0.6 Abitur 硬约束（价值判断的框架）

| 项 | 内容 |
|---|---|
| 法定题型 | **Aufgabenart I** `Materialgebundene Aufgabe`（可含演示实验）· **Aufgabenart II** `Fachpraktische Aufgabe` · Mischformen 允许 |
| ⛔ 禁止 | **「ausschließlich aufsatzartig」—— 纯论述题（无材料、无实验关联）不允许** |
| AFB | 全部 AFB 必须出现，**AFB II 为重心** |
| 时长 | **GK 255 min / LK 300 min**（BASS 13-32 Nr. 6）；含 fachpraktische Anteile 可延长，**须在题目中明示** |
| 口试 | 20–30 min；**任务不得只覆盖一个 Kurshalbjahr** |
| 评分 | `kriterielles Bewertungsraster`（全州统一）+ 9 条跨科准则 —— ⚠️ **其中两条把「德语语言规范性」写成评价标准**（非母语学生的明确扣分风险点） |

---

## 1. 总览：覆盖面对比

| 领域 | 德国 NRW | 中国 | 覆盖状态 |
|---|---|---|---|
| 细胞构造与生化（膜/物质组/酶/ATP） | EF 唯一 IF 的 4 个 Schwerpunkt | 必修1 概念 1 + 2（分子与细胞） | `both-equal` |
| 细胞分裂与染色体（Mitose/Meiose/Karyogramm） | EF `Genetik der Zelle` | 必修1 2.3.1 + 必修2 3.2.1 / 3.3.4–3.3.5 | `both-cn-deeper` |
| 神经生物学（电位/突触/传导） | Q-IF2（GK=LK 骨架 + LK 加激素与可塑性） | 选必1 概念 1.3（+ 1.4 体液调节） | `both-equal`（LK 增量：`both-cn-deeper`） |
| 代谢生理（光合/呼吸/化学渗透） | Q-IF3 | 必修1 2.2.2–2.2.4（只到总方程与类型） | 🎯 `both-de-deeper` |
| 生态学（结构/循环/人类影响） | Q-IF4 | 选必2 概念 2（种群-群落-生态系统-环保） | `both-cn-deeper`（GK 层）/ 互有（LK 层） |
| 分子遗传（DNA/表达/调控/突变） | Q-IF5 | 必修2 概念 3.1 + 3.3 | `both-equal`（调控机制层 `both-de-deeper`） |
| 经典遗传与概率计算 | Q-IF5 只要求「分析 Stammbäume」 | 必修2 3.2.3 + 学业要求「运用统计与概率」 | 🎯🎯 `both-cn-deeper` |
| 演化与系统树方法学 | Q-IF5（含 Gendrift/Kosten-Nutzen/populationsgenetischer Artbegriff） | 必修2 概念 4 | 🎯 `both-de-deeper` |
| 分子生物学方法（PCR/电泳/基因工程） | **仅 LK** | 选必3 概念 5（含 PCR 与电泳实验） | GK：`DE-only`（空白）/ LK：`both-cn-deeper` |
| 种群数量数学模型 | **仅 LK**（指数/逻辑斯谛 + r/K） | 选必2 2.1.2（J 型/S 型 + K 值） | GK：`CN-only`（禁引入）/ LK：`both-cn-deeper` |
| **免疫调节** | **KLP 全文无免疫学 IF** | 选必1 概念 1.5（完整体系） | 🔵 `CN-only` |
| **植物激素调节** | 无 | 选必1 概念 1.6 | 🔵 `CN-only` |
| **发酵工程与微生物培养** | 无（LK 只有 Gärung 的**代谢侧**） | 选必3 概念 3 | 🔵 `CN-only`（工程侧） |
| 评价/伦理 | Bewertungskompetenz B1–B12（4 维之一） | 选必3 概念 6 + 素养「社会责任」 | `both-equal`（德国颗粒度更细） |

---

## 2. 知识点级对照主表

> **「依据」列的含义**：双边事实已验证，**对照关系**为 `[据推断]`（无官方对照源）。X 域标 `[已验证]` 的行为纯德国侧结构事实。

### EF 域（唯一 IF：`Zellbiologie`）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| EF-01 | `prokaryotische` vs `eukaryotische Zelle`、`Zusammenwirken von Zellbestandteilen`、`Kompartimentierung`、`Endosymbiontentheorie` | 必修1 概念1.3.2（原核 vs 真核，**最大区别 = 无核膜包被的细胞核**）；1.2.2（多个相对独立结构分工）；1.2.4（协调一致） | `both-equal` | 🔴 EF 基本盘（AFB I/II）。**Basiskonzept `Struktur und Funktion` 的第一个落点**；内共生是 Aufgabe「细胞对比表」的常规收尾句 | [据推断] |
| EF-02 | `Vielzeller`：`Zelldifferenzierung und Arbeitsteilung` | 必修1 2.3.2（形态/结构/功能的特异性分化）；必修2 3.1.4（**分化本质 = 基因选择性表达**） | `both-cn-deeper` | 🟠 中。⚠️ 德国 EF **只到细胞层的分工**，「基因选择性表达」属 Q-Genetik → **不得在 EF 引入** | [据推断] |
| EF-03 | `Mitose`（`Chromosomen`、`Cytoskelett`）+ `Zellzyklus: Regulation` | 必修1 2.3.1（有丝分裂保证遗传信息一致）+ 实验「制作和观察根尖细胞有丝分裂简易装片」 | `both-cn-deeper` | 🔴 高。中国有**分期化的染色体行为描述 + 装片实验**；德国 EF 只列条目，重机制轻记忆。⚠️ 分期名称不必过度展开 → **现有笔记缺口**（DE 文件 §8 点名缺 Mitose/Meiose 独立笔记） | [据推断] |
| EF-04 | `Meiose` + `Rekombination` | 必修2 3.2.1（减数分裂染色体减半）；3.3.4（**自由组合与交叉互换**导致基因重组） | 🎯 `both-cn-deeper` | 🔴🔴 **EF 的「隐性超前」点**，是 Q-Genetik 的**唯一前置**。中国的「减半 + 两个重组来源」是现成因果链 | [据推断] |
| EF-05 | `Karyogramm`：`Genommutationen`、`Chromosomenmutationen` | 必修2 3.3.5（染色体**结构与数量**变异）；3.3.6（人类遗传病可检测预防） | `both-cn-deeper` | 🟠 高。中国的「缺失/重复/倒位/易位」命名体系可作记忆钩；⚠️ 但德国要求**从 Karyogramm 读出**变异并推断后果（AFB II） | [据推断] |
| EF-06 | `Stoffgruppen`：`Kohlenhydrate`、`Lipide`、`Proteine` | 必修1 1.1.4（糖类，主要能源物质）、1.1.5（脂质）、1.1.6（蛋白质，**20 种氨基酸**，功能取决于序列与空间结构） | `both-cn-deeper` | 🔴 EF 必考基础。中国的「序列→空间结构→功能」链更完整；⚠️ 德国淡化分子细节 → **20 种氨基酸名称不必背**（属 CN-only 细节） | [据推断] |
| EF-07 | `Biomembranen`：`Transport`（+ `Untersuchung von osmotischen Vorgängen`） | 必修1 2.1.1（选择透过性）、2.1.2（顺梯度不需能量 / **逆梯度需能量和载体**）、2.1.3（胞吞胞吐）+ 实验「质壁分离与复原」 | `both-equal` | 🔴🔴 **全库唯一已就位的 Q 阶段接口笔记**（`06_Bio/Biomembran-Transportmechanismen-und-Osmose.md`）。→ Neuro 的突触/电位 + Stoffwechsel 的化学渗透**双向可用** | [据推断] |
| EF-08 | `Prinzip der Signaltransduktion` + `Zell-Zell-Erkennung` | 无独立条目；分散在选必1 1.4（激素-受体）与 1.3.3（突触化学传递） | 🎯 `both-de-deeper`（近 `DE-only`） | 🔴🔴 **EF→Q 的两个有机接口之一**。德国在 EF 就把「信号转导**原则**」列为膜功能；中国要到选必1 才出现 → **中国学生必须新建**，且这是 Neuro/GEN-03 的概念底座 | [据推断] |
| EF-09 | `Energieumwandlung`：`ATP-ADP-System`、`Redoxreaktionen`；`Anabolismus und Katabolismus` | 必修1 2.2.2（ATP 是**直接能源物质**）；2.2.3（光合固能）/ 2.2.4（呼吸释能） | `both-cn-deeper` | 🔴🔴 **EF→Q 的第二个有机接口**（→ `chemiosmotische ATP-Bildung`）。⚠️ 德国 EF 只到「ATP-ADP 循环 + Redox 作为能量转化机制」，**不要求 ATP 分子结构细节** | [据推断] |
| EF-10 | `Enzyme`：`Kinetik`、`Regulation`（+ `Untersuchung von Enzymaktivitäten`） | 必修1 2.2.1（绝大多数酶是蛋白质，活性受 pH/温度影响）+ 实验「探究酶的专一性、高效性及影响因素」 | 🎯 `both-cn-deeper` | 🔴🔴 **EF 最高性价比**。德国点名 `Kinetik` 但训练密度低；中国的**曲线三段读法 + 可逆抑制 vs 不可逆变性辨析**是现成方法 → **CN-Methode 6** | [据推断] |
| EF-11 | `physiologische Anpassungen`：`Homöostase` | 选必1 概念1.1/1.2（**内环境**＝血浆/组织液/淋巴；血糖、体温、pH、渗透压的调节；呼吸/消化/循环/泌尿参与） | `both-cn-deeper` | 🟠 中。⚠️ 德国 EF 的 Homöostase **只到细胞层渗透调节**；中国的**器官-系统层内环境稳态属 Q 内容**，不得在 EF 引入（见 CN-Methode 9 反例） | [据推断] |
| EF-12 | `Fachliche Verfahren`：`Mikroskopie` / `Analyse von Familienstammbäumen` / `osmotische Vorgänge` / `Enzymaktivitäten`；`Bewertung`：`Zytostatika` + `embryonale Stammzellen` | 必修1 教学提示约 11 项实验（色素提取分离、质壁分离、酶三探、有丝分裂装片…）+ 必修2 模拟减数分裂/性状分离杂交；选必3 4.2.5 干细胞、概念6 伦理 | `both-equal`（方法）/ `both-cn-deeper`（CN 实验清单更细） | 🔴 **Aufgabenart II 的直接训练场**；EF 的 Zytostatika/Stammzellen 是**EF 唯一的 AFB III 落点**，也是非母语学生练 Bewertung 写法的最佳起点（材料简单、价值维度明确） | [据推断] |

### NEU 域（Q-IF2：`Neurobiologie`）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| NEU-01 | `Bau und Funktionen von Nervenzellen`：`Ruhepotenzial`、`Aktionspotenzial`、`Erregungsleitung` | 选必1 1.3.2（静息电位→动作电位，沿神经纤维传导）；1.3.1（反射与反射弧） | `both-cn-deeper`（机制描述）/ 反射弧为 `CN-only` | 🔴🔴 **Q 阶段第一优先补缺（零笔记）**。与 EF 的 `Signaltransduktion` + `Membrantransport` 有机衔接，**无需新桥**。⚠️ 反射弧是中国核心但**德国 KLP 未列为 Schwerpunkt** → 只作理解，不作考点 | [据推断] |
| NEU-02 | `Synapse`：`Funktion der erregenden chemischen Synapse`、`neuromuskuläre Synapse` | 选必1 1.3.3（突触传递通常通过**化学传递**完成） | `both-equal` | 🔴🔴 **最平滑的 EF→Q 桥**（膜受体 + 胞吐 + 信号转导，EF 全部已教）。神经肌肉接头是德国点名条目，中国课标未点名 → 轻补 | [据推断] |
| NEU-03 | `Stoffeinwirkung an Synapsen`（+ GK `Bewertung`：外源物质镇痛） | 无系统条目（药物/毒品作用在中国属教材层） | `DE-only` | 🔴 **GK 的 Bewertung 落点**。⚠️ 中国学生须补「作用位点 → 效应 → 风险」的论证链写法 | [据推断] |
| NEU-04 | `Fachliche Verfahren`：`Potenzialmessungen` | 中国课标无电位测量实验 | `DE-only`（方法层） | 🔴 **Aufgabenart II 考点**：须会**描述装置、读出曲线、说明局限**（属 `Erkenntnisgewinnung`，不是 `Sachkompetenz`） | [据推断] |
| NEU-05 | `[LK]` `primäre und sekundäre Sinneszelle`、`Rezeptorpotenzial` | 无独立条目（感受器在中国属教材层） | `DE-only` | 🟡 中（仅 LK） | [据推断] |
| NEU-06 | `[LK]` `Hormone`：`Hormonwirkung`、`Verschränkung hormoneller und neuronaler Steuerung`（`Stressreaktion`） | 选必1 1.4.1（内分泌腺）、**1.4.2 分级调节与反馈调节**、**1.4.3 神经调节与体液调节相互协调**（体温/水盐） | 🎯🎯 `both-cn-deeper` | 🔴🔴 **LK 最高价值对照点**。中国的「分级 + 反馈 + 神经-体液协调」三件套**内容完全覆盖且深于**德国 LK 要求 → 罕见的「中国更深且德国正好要考」组合，**中国笔记改造即用** | [据推断] |
| NEU-07 | `[LK]` `Neuronale Plastizität`：`Verrechnung`（`hemmende Synapse`、`räumliche und zeitliche Summation`）· `Zelluläre Prozesse des Lernens` · `Störungen des neuronalen Systems`；+ `Neurophysiologische Verfahren` | 选必1 1.3.6（语言活动与条件反射为大脑皮层高级神经活动，**仅定性**） | 🎯 `DE-only` | 🔴 **LK 独立内容块，中国无对等** → 必须新建。是 `Steuerung und Regelung` 与 `Information und Kommunikation` 两个 Basiskonzept 的最佳落点 | [据推断] |

### STW 域（Q-IF3：`Stoffwechselphysiologie`）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| STW-01 | `Zusammenhang von aufbauendem und abbauendem Stoffwechsel`、`Stoffwechselregulation auf Enzymebene`、`Stofftransport zwischen Kompartimenten` | 必修1 2.2.3（光合合成）/ 2.2.4（呼吸分解）+ 2.2.1（酶）；1.2.2（结构分工） | `both-equal` | 🔴 EF-09/EF-10 的直接延伸；「酶层面的代谢调控」是 EF 酶动力学的升级版 | [据推断] |
| STW-02 | `Chemiosmotische ATP-Bildung`（+ `[LK]` 须**比较线粒体与叶绿体**的膜基能量转化机制） | 必修1 2.2.2（ATP 是直接能源物质，**课标不讲化学渗透机制**） | 🎯🎯 `DE-only`（机制层） | 🔴🔴 **Q-Stoffwechsel 的核心概念，中国高中完全不讲** → 中国学生**必须新建**。这是「德国更深且必考」的典型；LK 还要求跨细胞器比较（AFB II/III） | [据推断] |
| STW-03 | `Funktionale Angepasstheiten`：`Blattaufbau`、`Feinbau Chloroplast`、**`Absorptionsspektrum`** vs **`Wirkungsspektrum`** | 必修1 2.2.3（叶绿体捕获光能）+ 实验「提取和分离叶绿体色素」「观察叶绿体与细胞质流动」 | `both-cn-deeper`（CN 有色素实验） | 🔴 高。⚠️ **Absorptionsspektrum 与 Wirkungsspektrum 的区分是德国点名条目**，中国教材常混用 → **必做辨析卡** | [据推断] |
| STW-04 | `Abhängigkeit der Fotosyntheserate von abiotischen Faktoren` | 必修1 实验「探究不同环境因素对光合作用的影响」；限制因子思想（教材层） | 🎯 `both-cn-deeper` | 🔴🔴 **中国最可直接迁移的一块**（曲线读法 + 限制因子切换），且**德国 GK 明文要求** → 命中率最高 → **CN-Methode 6** | [据推断] |
| STW-05 | `Calvin-Zyklus`（`Fixierung`/`Reduktion`/`Regeneration`）+ `Zusammenhang von Primär- und Sekundärreaktionen` | 必修1 2.2.3（课标**只到总方程**，无 Calvin 三步；教材层有光反应/暗反应） | 🎯 `both-de-deeper` | 🔴 **GK 即要求**。中国止于总方程 → 缺口（三步名易补，但「Primär-/Sekundärreaktion」**术语须换**） | [据推断] |
| STW-06 | `Feinbau Mitochondrium`；`Stoff- und Energiebilanz von Glykolyse, oxidativer Decarboxylierung, Tricarbonsäurezyklus und Atmungskette` | 必修1 2.2.4（细胞呼吸将有机分子能量转为可利用能量）+ 实验「探究酵母菌的呼吸方式」 | 🎯 `both-de-deeper` | 🔴🔴 **中国学生的明确缺口**：德国要求**四个阶段的名称、定位与物质/能量平衡**；中国只到有氧/无氧类型 → 逐条补（AFB I/II 基本盘） | [据推断] |
| STW-07 | `Fachliche Verfahren`：`Chromatografie`（+ `[LK]` `Tracer-Methode`） | 必修1 实验「提取和分离叶绿体色素」（纸层析） | `both-equal` / Tracer 为 `DE-only` | 🔴 **GK 唯一方法条目 → Aufgabenart II 高频**。Tracer 法（LK）常考「说明原理与局限」 | [据推断] |
| STW-08 | `[LK]` `Energetisches Modell der Lichtreaktionen` + `Lichtsammelkomplex` + `Energetisches Modell der Atmungskette` | 无（中国不建模能量水平） | `DE-only` | 🔴（LK）德国把能量**模型化**是中国完全没有的一步 | [据推断] |
| STW-09 | `[LK]` `C4-Pflanzen` + 须**比较 C3/C4 的 Sekundärvorgänge** | 无 | `DE-only` | 🟠（LK） | [据推断] |
| STW-10 | `[LK]` `Alkoholische Gärung und Milchsäuregärung`（含能量平衡） | 必修1 实验「探究酵母菌的呼吸方式」（无氧产酒精）；选必3 概念3 发酵工程（**规模化工程视角**） | 互有，不可互换 | 🟠（LK）⚠️ **中国的发酵工程是「工程流程」，德国 LK 的 Gärung 是「代谢途径与能量平衡」** —— 两者**不在同一层**（见 CN-Methode 9 反例） | [据推断] |
| STW-11 | `Bewertung`：`Nahrungsergänzungsmittel`（GK）/ 生物技术优化光合作用的多视角评价（LK） | 无直接对应（选必3 概念6 是另一个方向） | `DE-only`（评价位） | 🟠 中。德国把「营养补充剂」做成 Bewertung 落点 → 练多视角写法的低成本素材 | [据推断] |

### OEK 域（Q-IF4：`Ökologie`）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| OEK-01 | `Biotop und Biozönose`（`biotische und abiotische Faktoren`） | 选必2 2.1.3（非生物因素与种间相互作用）；2.2.1（生态系统组成：生产者/消费者/分解者 + 非生物因素） | `both-equal` | 🟠 中（AFB I/II 描述层） | [据推断] |
| OEK-02 | `Einfluss ökologischer Faktoren`：**`Toleranzkurven`**、**`ökologische Potenz`** | 选必2 2.1.6（分析不同群落中生物与环境的适应性）；耐受曲线属教材层 | 🎯 `both-de-deeper` | 🔴 **德国点名的两个工具，中国无对应术语** → 须新建（概念简单，易补；常与「气候变化 → 分布迁移」结合考） | [据推断] |
| OEK-03 | `Stoffkreislauf und Energiefluss`：`Kohlenstoffkreislauf`、`Nahrungsnetz` | 选必2 2.2.2（食物链食物网）、2.2.3（**物质不断循环、能量单向流动并逐级递减**）、2.2.5（**生态金字塔**）、2.2.6（**生物富集**） | 🎯 `both-cn-deeper` | 🔴🔴 **中国更系统**（金字塔 + 单向递减 + 富集）。德国 GK 只到 Kohlenstoffkreislauf + Nahrungsnetz → 中国笔记可直用，⚠️ 但**须去掉 10%–20% 传递效率的定量计算**（GK 不要求） | [据推断] |
| OEK-04 | `Intra- und interspezifische Beziehungen`：`Konkurrenz`、`Parasitismus`、`Symbiose`、`Räuber-Beute-Beziehungen` | 选必2 2.1.3（种间相互作用）；2.1.4（群落的垂直/水平结构）；2.1.5（初生/次生演替） | `both-equal`（演替为 `CN-only`） | 🟠 中。⚠️ 群落演替是中国独立条目，德国 KLP 未点名 → 只作理解 | [据推断] |
| OEK-05 | `Ökologische Nische` | 选必2 教学提示「分析当地自然群落中某种生物的**生态位**」；教材层生态位分化三轴 | `both-equal` | 🔴 高（**两边都点名**）→ 现有 `CN-Bio-Tricks` Trick 6 **可直接复用并升级为 Q 正式内容** | [据推断] |
| OEK-06 | `Folgen des anthropogenen Treibhauseffekts`；`Ökosystemmanagement`（`Ursache-Wirkungszusammenhänge`、Erhaltungs-/Renaturierungsmaßnahmen、`nachhaltige Nutzung`、**Bedeutung und Erhalt der Biodiversität**） | 选必2 2.3.3（**抵抗力稳定性 / 恢复力稳定性**）；2.4.2（全球性环境问题）；2.4.3（生物多样性意义）；2.4.4（**系统工程**方法） | 🎯 `both-cn-deeper` | 🔴 高。**对应 QP 新增的 `S8`**（Biodiversität 保护与可持续利用的理由）。⚠️ 德国用**能力条目**表达，中国用**内容条目**表达 → 内容可迁移，**写法必须换** | [据推断] |
| OEK-07 | `Fachliche Verfahren`：`Erfassung ökologischer Faktoren und qualitative Erfassung von Arten`（GK **仅定性**；LK **定性 + 定量**） | 选必2 教学提示「研究土壤中动物类群的**丰富度**」「探究培养液中酵母种群数量的**动态变化**」（含计数方法） | 🎯 `both-cn-deeper`（LK 层） | 🔴 **LK 的定量物种记录是中国优势**（两套调查方法成体系）；GK 只要求定性 → **GK 考生不得引入定量方法** | [据推断] |
| OEK-08 | `[LK]` `Fortpflanzungsstrategien: r- und K-Strategien` + `idealisierte Populationsentwicklung: exponentielles und logistisches Wachstum` | 选必2 2.1.2（**尝试建立数学模型解释种群的数量变动**；J 型/S 型 + K 值） | 🎯 `both-cn-deeper`（相对 LK）/ **相对 GK 为 `CN-only`** | 🔴🔴 **德国 GK 完全不含，LK 才有；中国选必2 即完成** → 对 **LK 考生是送分块**，对 **GK 考生是禁止引入**（见 CN-Methode 9 反例）。可与 `03_Mathe/` 的指数函数笔记跨科连接 | [据推断] |
| OEK-09 | `[LK]` `Stickstoffkreislauf` · `hormonartig wirkende Substanzen in der Umwelt` · `Ökologischer Fußabdruck` | 无（中国只讲物质循环的一般规律；2.4.1 人口增长压力 ≠ 生态足迹） | `DE-only` | 🟡 中（均为 LK 的 Bewertung 落点，尤其内分泌干扰物的「风险评估困难」） | [据推断] |

### GEN 域（Q-IF5：`Genetik und Evolution`）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| GEN-01 | `Bau der DNA`（+ `semikonservative Replikation`） | 必修2 3.1.2（四种脱氧核苷酸、反向平行双螺旋、**碱基排列顺序编码遗传信息**）；3.1.3（**半保留复制**） | `both-equal` | 🔴🔴 **高度同构 → 中国笔记零改造可用**（AFB I/II 基本盘） | [据推断] |
| GEN-02 | `Transkription` + `Translation` | 必修2 3.1.4（遗传信息通过 **RNA** 指导蛋白质合成；性状主要通过蛋白质表现） | `both-equal` | 🔴 高。⚠️ **方向不同**：德国要求**描述过程机制**（含场所与酶），中国常考碱基配对的计算/推导 → 须按德国问法重写 | [据推断] |
| GEN-03 | `Regulation der Genaktivität bei Eukaryoten`：`Transkriptionsfaktoren`、`DNA-Methylierung`（+ `[LK]` `Histonmodifikation`、`RNA-Interferenz`） | 必修2 3.1.5（**表观遗传现象**：碱基序列不变而表型改变） | 🎯 `both-de-deeper` | 🔴🔴 **中国学生的明确缺口**：课标只到**现象层**，德国 GK 就要求**机制名**（Transkriptionsfaktoren / DNA-Methylierung）。LK 再加两种 → 逐条补 | [据推断] |
| GEN-04 | `Zusammenhänge zwischen genetischem Material, Genprodukten und Merkmal`：`Genmutationen` | 必修2 3.3.1（碱基**替换/插入/缺失**）、3.3.2（导致蛋白质与功能变化甚至致命）、3.3.3（诱变因素、癌变） | `both-cn-deeper` | 🔴 高。中国的「突变类型 → 移码 → 蛋白质 → 性状」因果链更细 → 可作 AFB II 的标准答案骨架 | [据推断] |
| GEN-05 | `Genetik menschlicher Erkrankungen`：`Familienstammbäume`、`Gentest und Beratung`、`Gentherapie` | 必修2 3.3.6（人类遗传病可检测预防）、3.2.3（**预测子代遗传性状**）、3.2.4（**伴性遗传**）；选必3 概念5（基因治疗方向） | 🎯🎯 `both-cn-deeper` | 🔴🔴 **CN-Methode 1/2 的落点**。德国只要求「分析系谱 + 推导 Gentest 后果」，**无显式概率计算训练**；中国的概率体系是**方法论增量而非超纲知识** → 合规 | [据推断] |
| GEN-06 | `Synthetische Evolutionstheorie`：`Mutation`、`Rekombination`、`Selektion`、`Variation`、**`Gendrift`** | 必修2 4.2.1–4.2.4（可遗传变异 → 优势个体比例增加 → 自然选择 → 现代生物进化理论以自然选择为核心） | 🎯 `both-de-deeper` | 🔴🔴 **`Gendrift`（遗传漂变）是中国课标的空白** → 必补（德国常与「小种群/奠基者效应」结合考，且是 `Zufall` 类论证的入口） | [据推断] |
| GEN-07 | `adaptiver Wert von Verhalten`、**`Kosten-Nutzen-Analyse`**、`reproduktive Fitness`、`Koevolution` | 无（行为生态在中国课标层仅隐含于「适应性」；教材层有共同进化） | 🎯🎯 `DE-only` | 🔴🔴 **德国把「成本-收益分析」与「繁殖适合度」写进演化论**，是跨学科（行为 + 定量）题型 → **中国学生全新题型**，与 GEN-11 联动 | [据推断] |
| GEN-08 | `Abgrenzung von nicht-naturwissenschaftlichen Vorstellungen` | 无 | 🎯 `DE-only` | 🔴 **德国特色考点**（科学哲学层），与 Bewertung 直接挂钩；KLP 同时警告避免使用**目的论（final）论证** → 与 X-06 联动 | [据推断] |
| GEN-09 | `Stammbäume und Verwandtschaft`：`Artbildung`、`Biodiversität`、**`populationsgenetischer Artbegriff`**、`Isolation`、`molekularbiologische Homologien`、**`ursprüngliche und abgeleitete Merkmale`** | 必修2 4.1.1（化石/比较解剖/胚胎学 → 共同祖先）、4.1.2（细胞与分子生物学的共同特征）、4.2.5（**变异、选择和隔离**导致新种形成） | 🎯🎯 `both-de-deeper` | 🔴🔴 **德国的系统树方法学（ursprünglich vs abgeleitet、populationsgenetischer Artbegriff）是中国完全没有的工具** → 必修。这是 `individuelle und evolutive Entwicklung` 这一 Basiskonzept 的核心落点 | [据推断] |
| GEN-10 | `[LK]` `Krebs`：`Krebszellen`、`Onkogene und Anti-Onkogene`、`personalisierte Medizin` | 必修2 3.3.3（某些突变致细胞分裂失控甚至癌变，**一句话**） | 🎯 `DE-only`（LK 独立块） | 🔴（LK）从一句话扩成独立内容块 → 须新建；与 EF 的 `Zellzyklus-Regulation` + `Zytostatika` 可纵向串联 | [据推断] |
| GEN-11 | `[LK]` `Sozialverhalten bei Primaten`：`exogene und endogene Ursachen`、`Fortpflanzungsverhalten` | 无 | `DE-only` | 🟠（LK，与 GEN-07 行为生态联动） | [据推断] |
| GEN-12 | `[LK]` `Evolution des Menschen und kulturelle Evolution`：`Ursprung`、`Fossilgeschichte`、`Stammbäume`、`Werkzeuggebrauch`、`Sprachentwicklung` | 无（中国高中基本不涉及人类演化专题） | 🎯 `DE-only` | 🔴（LK 大块，中国零基础）→ 须从零建 | [据推断] |
| GEN-13 | `[LK]` `Fachliche Verfahren`：**`PCR`** · **`Gelelektrophorese`** · **`Gentechnik`（Veränderung und Einbau von DNA）· gentherapeutische Verfahren** | 选必3 5.1.2（三种基本工具：限制酶/DNA 连接酶/载体）、5.1.3（**四步操作程序**：获取 → 构建 → 导入 → 检测鉴定）+ 教学提示「**利用 PCR 扩增 DNA 片段并完成电泳鉴定**」 | 🎯🎯 `both-cn-deeper` | 🔴🔴 **GK 无方法条目，LK 才有；而中国选必3 已有完整操作程序 + PCR/电泳实验** → 对 **LK 考生是最划算的直用块**（两边几乎一一对应）。⚠️ 对 **GK 考生不合规** | [据推断] |

### X 域（跨域 / 能力 / 评价 / 结构）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| X-01 | **EF 只有 `Zellbiologie` 一个 IF（obligatorisch）；Q 阶段四 IF 全开** | 无对应切分（必修/选必按模块线性推进，无「内容领域」单位） | 结构差异 | 🔴🔴 **最高价值台阶**：EF 单点 → Q 四元并列。**不是加深，是结构突变** | [已验证] |
| X-02 | **EF→Q 接口不对称**：Neuro 与 Stoffwechsel 有 EF 有机接口；**Ökologie 与 Genetik/Evolution 在 EF 几乎无接口** | — | 结构推导 | 🔴🔴 **补缺排序的唯一依据**（见 §0.4 表） | [据推断] |
| X-03 | **GK 与 LK 的 IF 列表完全相同**（只有深度差）；**GK 的 Genetik 段落无任何 `Fachliche Verfahren`** | — | 结构事实 | 🔴 **决定哪些中国技法对 GK 不合规**（PCR/电泳/基因工程 = LK 独有） | [已验证] |
| X-04 | **5 个 `Basiskonzepte`** 作为第三维贯穿全部 IF × 全部能力维度（源自 KMK Bildungsstandards） | 四大核心素养（生命观念/科学思维/科学探究/社会责任）+ 大概念（概念 1–6） | 🎯 `DE-only` | 🔴🔴 **德国作答的「官方得分语言」**：答题时点明「这是 Struktur und Funktion / Steuerung und Regelung」，直接命中评分准则 `Herstellen geeigneter Zusammenhänge`。⚠️ 中国的**大概念是内容骨架（纵向），Basiskonzept 是思维透镜（横向）**，**不在同一层级，不可互换** | [已验证] |
| X-05 | **`Kommunikation` 是唯一的纯跨 IF 能力领域**（`K1–K14`，含**来源可信度与作者意图分析**） | 「社会责任」素养含参与讨论，但无「来源可信度」训练 | 🎯 `DE-only` | 🔴 高。K1–K4 要求对数字媒体来源作可信度判断 → 属**跨学科写作型任务**，中国无对等训练 | [已验证] |
| X-06 | **`proximate` vs `ultimate`** 与 **`funktional` vs `kausal`** 的显式区分（`K7`/`K8`）；KLP 明文警告避免**目的论（final）论证** | 无 | 🎯🎯 `DE-only` | 🔴🔴 **中国学生最高频的隐性失分点**：德式答题要求明确「你给的是近因还是终极解释」，中国生物教学**几乎不训练此区分** → 必做辨析卡 | [已验证] |
| X-07 | `Bewertungskompetenz` `B1–B12`：识别规范性陈述背后的价值 / 判断来源的利益立场 / **反思评价过程本身** | 核心素养「社会责任」（含 STSE）+ 选必3 概念6（转基因安全 / 生殖性克隆 / 生物武器） | `both-equal`（内容相当，德国颗粒度更细） | 🔴 高。中国的概念 6 是**极好的素材库**；⚠️ 但必须**换成德国的写法框架**（事实/价值/规范三分 + 多视角 + 权衡 + lokal/global）→ **CN-Methode 8** | [据推断] |
| X-08 | 法定题型：Aufgabenart I `Materialgebundene Aufgabe` / II `Fachpraktische Aufgabe`；**⛔ 禁止纯论述题**；含 fachpraktische Anteile 可延长且须在题目中明示 | 高考：选择题 + 非选择题（呈现解答过程）；课标只给命题原则，未规定题型 | 结构差异 | 🔴🔴 **硬约束**：任何答案都必须**挂靠材料或实验**。⚠️ 与数学的 Aufgabenart I/II（按工具分）性质不同，**不可套用** | [已验证] |
| X-09 | 时长 **GK 255 / LK 300 min**；口试 **20–30 min** 且**任务不得只覆盖一个 Kurshalbjahr**；**9 条跨科评分准则**（末两条为语言规范性） | 各省自定，课标未规定 [未获取到] | 结构事实 | 🔴 **非母语学生的明确扣分风险点**（语言规范性进评分准则） | [已验证] |
| X-10 | **KLP 全文无免疫学 IF** | 选必1 概念1.5：**免疫细胞/器官/活性物质**、非特异性 vs 特异性、**体液免疫与细胞免疫**、过敏/自身免疫病/艾滋病/先天性免疫缺陷 | 🔵 `CN-only` | ⚫ **零 Abitur 价值**。这是中国**最大的单块超出量** → **禁止占用复习时间**（见 CN-Methode 9 反例） | [据推断] |
| X-11 | 无植物激素；无发酵工程 | 选必1 概念1.6（生长素两重性、五大激素协同拮抗、光/重力/温度）；选必3 概念3（灭菌/无菌技术/培养基/平板划线/稀释涂布/显微计数） | 🔵 `CN-only` | ⚫ 零价值。⚠️ 德国 LK 只有 Gärung 的**代谢侧**，与中国的**工程侧**不同层 | [据推断] |
| X-12 | **行为动词分级即认知层级标尺**：`说出 → 举例说明 → 概述 → 阐明/分析`，**内嵌于每条内容要求（N.M.K）** | 德国：AFB I/II/III + Operatoren（**独立于内容**） | `both-equal`（功能等价，载体不同） | 🔴 **CN-Methode 3 的落点**。中国的动词分级是**现成的难度刻度**，可直接映射为 AFB → 用于自编题与自查 | [据推断] |
| X-13 | **概率与统计显式写入生物课标**：3.2.3「预测子代的遗传性状」+ 学业要求「**运用统计与概率**解释并预测种群内某一遗传性状的分布及变化」+ 教学提示「**用数学方法讨论自然选择使种群的基因频率发生变化**」 | 德国：Genetik 无显式概率训练；LK 只有 `populationsgenetischer Artbegriff` 略触及 | 🎯🎯 `both-cn-deeper` | 🔴🔴 **CN-Methode 1/4 的合法性依据**。中国形成「生物 × 数学必修概率统计」的**跨学科闭环**；德国需另建 AFB 才能表达同一信息 | [据推断] |
| X-14 | 学业质量 **4 级**（合格考 = 水平二且仅必修；**高考 = 水平四**，必修 + 选必） | 德国：EPA 0–15 分制 + AFB；**无「水平级」概念** | 结构差异 | 🟠。**水平四 ≈ AFB II**（Reorganisation und Transfer）→ 中国的水平四训练可迁移 | [据推断] |
| X-15 | 实验：**无必做清单**，但要求**自行设计与论证**（`E1–E17`；QP 新增 `E15–E17` = 方法边界/证据基础/知识生产条件；新增 `S8` = Biodiversität） | **约 30 项指定实验/探究** + 工程学实践（选必模块3） | 互有（`DE-only` 的设计论证 / `CN-only` 的清单机制） | 🔴 **双向缺口**：中国学生**不缺「做过什么」，缺「如何论证实验设计」**（属 `Erkenntnisgewinnung`，非 `Sachkompetenz`）→ **CN-Methode 5** | [据推断] |

---

## 3. 🇨🇳 CN-Methode 技法卡（**本文件的核心产出**）

> **三条铁律**（依 `Lernbaum/00-Abi-Baum-Design.md §3.1`，违反即打回）：
> 1. **只引入「方法」，不引入「超纲知识」**。
> 2. **每条必须标注 `DE-Anschluss`** —— 该技法用到的**全部工具**，须逐一确认德国 KLP 已教。
> 3. **来源分层**：`[CN-课标]` / `[CN-教材]` / `[CN-高考]`。
>
> ⚠️ 本表所有技法均为本项目推导，**不搬运任何教材正文或原题**。

### CN-Methode 1：遗传图解与概率计算的**三步程序**（分离 → 组合 → 配子）

- **技法内容**：把任何杂交/遗传概率题拆成固定三工序 —— ① **分离**：先就**每一对**相对性状单独判显隐、写基因型、得该对的表型比（3:1 或 1:1）；② **组合**：多对性状用**乘法原理**把各对比相乘（两对 → 9:3:3:1 及其变形），或用**分枝法/棋盘法**列出配子组合，先算**配子种类与比例**再合并；③ **配子 → 后代**：先求亲本产生各配子的概率，再用「**同时发生相乘、互斥情形相加**」两条规则合成目标事件概率。关键顺序是**「先分离、后组合」**——绝不一上手就列 16 格棋盘。来源：`[CN-课标]` 必修2 3.2.3（阐明分离与自由组合使子代基因型和表型有多种可能，并可由此**预测子代的遗传性状**）+ 必修2 学业要求「运用统计与概率的相关知识，解释并预测种群内某一遗传性状的分布及变化」；`[CN-高考]` 高频题型。
- **DE-Anschluss**：`Meiose` 与 `Rekombination`（**EF 的 Zellbiologie 已教**）· `Analyse von Familienstammbäumen`（**EF 的 Fachliche Verfahren 明文点名**）· `Karyogramm` + `Genom-/Chromosomenmutationen`（EF）· Q-Genetik 的 `Familienstammbäume` / `Gentest und Beratung` / `Genmutationen`。**概率的乘法与加法属数学必修，非生物新知识**。
- **合规性**：✅ —— 德国 KLP **已有**「分析系谱 + 预测子代遗传性状」这一**能力目标**，本技法只是把它**程序化**。引入的是**计算流程**，不是新的遗传学知识块。⚠️ 边界：若题目进入 **Hardy-Weinberg 的基因频率定量计算**，则仅 LK 可触及（见 CN-Methode 4 的 ⚠️ 子项）。
- **Abitur 应用**：GEN-05（人类遗传病：系谱 → 基因型 → Gentest 后果推导）；GEN-04（突变 → 性状）。**AFB II 为主**（把已知遗传规律转移到新情境）；要求「说明结论的不确定性」时升 **AFB III**。⚠️ 德国答题须保留**概率措辞**（`wahrscheinlich` / `das Risiko beträgt`），**不得写成确定性断言**。
- **产出物**：`06_Bio/CN-Bio-Genetik-Rechenschema.md`（三步工序卡 + 乘法/加法规则 + 5 道**自编改写**题；与 `CN-Bio-Tricks` Trick 1 合并升级）

### CN-Methode 2：系谱分析的**两步判定 + 概率尾巴**

- **技法内容**：拿到 `Familienstammbaum` 固定走两步 —— ① **判显隐**：「无中生有」→ 隐性；「有中生无」→ 显性；② **判伴性**：伴 X 隐看**交叉遗传**（外祖父 → 女儿 → 外孙）与男性患者集中；伴 X 显看「父传女必患」；伴 Y 看「父传子全传」。第三步永远是**留概率尾巴**：小样本下写「**weist auf … hin**」，不写「muss」。判定完成后再进入概率计算（CN-Methode 1），且**先定基因型再算概率**。来源：`[CN-课标]` 必修2 3.2.4（性染色体上的基因传递与性别相关联）+ 3.3.6；`[CN-高考]` 系谱题型。
- **DE-Anschluss**：`Analyse von Familienstammbäumen`（**EF 的 Fachliche Verfahren 已明文点名**）· EF 的 `Rekombination` / `Karyogramm` · Q-Genetik 的 `Familienstammbäume` / `Gentest und Beratung`。**零新增工具**。
- **合规性**：✅ —— 系谱分析在德国**从 EF 就是官方方法**，本技法只补「判定顺序 + 措辞边界」。⚠️ 且「留概率尾巴」这一条**恰好命中德国 Bewertung 与 AFB III 对「Geltungsgrenze」的要求**。
- **Abitur 应用**：EF 的 `Familienstammbäume` 分析题 + Q-Genetik 的人类遗传病题；常与 `Gentest und Beratung` 的**伦理评价**合考（AFB III）。现有 `CN-Bio-Training` Aufgabe 2 已是合格雏形 → **直接升级为 Q 正式题**。
- **产出物**：`06_Bio/Genetik-Stammbaumanalyse.md`（两步判定决策树 + 「wahrscheinlich 措辞清单」+ 与 Gentest-Bewertung 的合考模板）

### CN-Methode 3：**行为动词分级 → AFB 映射标尺**（难度控制的现成刻度）

- **技法内容**：中国课标每条内容要求（N.M.K）前都带一个行为动词，其本身即认知层级指令：**说出 / 举例说出**（识别与复现）→ **概述 / 描述**（组织与表征）→ **说明 / 阐明 / 分析**（解释与迁移）→ **评价 / 探讨**（反思与论证）。把这个序列当作**现成的难度刻度尺**：① 自编练习时，用动词直接定 AFB 档；② 检查答案时，用动词核对「我是否答超或答浅」；③ 复习时按动词筛掉「只要求说出」的知识点，**不做无谓深化**。来源：`[CN-课标]` 各模块内容要求的动词体系（如 1.1.1「说出」vs 1.2.1「阐明」）+ 学业质量水平一至四的动词递进（「根据…进行」→「制订」→「基于给定条件设计」→「查阅资料、设计并实施」）。
- **DE-Anschluss**：德国以 **AFB I/II/III + Operatoren** 承载同一信息，但**独立于内容条目**——即德国**没有**把难度刻度写进每一条内容要求。本技法的作用是**给德国侧补一把外挂标尺**，不需要德国 KLP 提供任何东西。
- **合规性**：✅ —— **纯元认知工具，零知识内容**，任何学段、任何 IF 都合法。这是本文件中**唯一一条「反向」技法**（中国课标的组织结构优势 → 补德国的表达缺口）。
- **Abitur 应用**：**全题型通用**。① 自编 `materialgebundene Aufgabe` 时确保 AFB 全覆盖（**AFB II 为重心**）；② 口试准备时按动词分层组织答案；③ 直接对上评分准则中的 `Komplexität der Gegenstände` 与 `Differenziertheit des Verstehens` 两条。
- **产出物**：`06_Bio/Bio-AFB-Operatoren-Skala.md`（一张**动词 ↔ AFB ↔ Operatoren** 三列对照表；⚠️ 待 `Operatoren-NRW-Alle-Faecher.md` 建成后回填官方动词列）

### CN-Methode 4：概率与统计的**跨学科闭环**（含 ⚠️ 基因频率子项）

- **技法内容**：核心是三条可迁移的统计规则 —— ① **乘法规则**（独立事件同时发生）与**加法规则**（互斥情形）；② **概率树/分枝法**处理多步事件（尤其「已知某一个子代表型，反推亲本基因型」的条件概率）；③ **大数预期**：把比例理解为**期望值**而非**确定结果**，用「样本量小 → 偏离正常」解释实测与理论的差距。⚠️ **子项（条件合规）**：由「用数学方法讨论自然选择使种群基因频率发生变化」派生的**基因频率定量计算**（p/q 与基因型频率关系），属**更高一级**的数学化。来源：`[CN-课标]` 必修2 学业要求「运用统计与概率」+ 教学提示「用数学方法讨论自然选择使种群的基因频率发生变化」；`[CN-高考]` 遗传概率题。
- **DE-Anschluss**：EF 的 `Meiose`/`Rekombination`/`Familienstammbäume` + Q-Genetik 的 `Familienstammbäume`/`Gentest`；LK 的 `populationsgenetischer Artbegriff` 与 `Gendrift`（**这是基因频率子项的唯一合法接口**）；乘法/加法规则属**数学必修概率统计**，德国 Mathe KLP 已覆盖。
- **合规性**：✅（主技法）—— 规则本身是数学常识，德国 KLP 已有「预测子代遗传性状」的能力目标。⚠️ **基因频率定量子项仅对 LK 合规**：德国 GK 的 Genetik 无种群遗传的定量要求，且 GK 段落**无任何 Fachliche Verfahren**；LK 也只列到 `populationsgenetischer Artbegriff` 的概念层。**GK 考生不得复习定量基因频率计算**。
- **Abitur 应用**：GEN-05（遗传概率）+ GEN-06（`Gendrift` 的小种群论证，AFB II/III）。⚠️ 德国侧最看重的是第 ③ 条 —— 「**为什么实测偏离 3:1**」是典型的 `Erkenntnisgewinnung` 反思题（E15–E17 的证据基础）。
- **产出物**：`06_Bio/Genetik-Wahrscheinlichkeitsregeln.md`（三规则卡 + 「期望值 vs 确定结果」辨析；基因频率部分**单独标注 `[LK]`**）

### CN-Methode 5：实验设计的**四问法**（变量 / 对照 / 预测 / 局限性）

- **技法内容**：面对任何「设计或评价一个实验」的任务，按固定四问作答 —— ① **变量**：自变量是什么（**只改一个**）、因变量如何测量、无关变量如何恒定；② **对照**：对照组是「除自变量外**全部相同**」的那一组（≠「什么都不做」），需要时设**双对照**（如「酶有无」+「温度」两个维度各一对照）；③ **预测**：先写「若假设成立，则预期 X 组 > Y 组」，**再**看数据是否支持；④ **局限性**：**重复**（Wiederholung）+ **样本量** + 结论的适用范围（不得超出所操控的变量）。来源：`[CN-课标]` 学业质量水平二→四的实验能力递进（依令执行 → 制订 → 基于给定条件设计 → 查阅资料并设计实施）+ 必修1 约 11 项 / 全学段约 30 项指定实验；`[CN-教材]` 变量控制与对照原则的形式化训练。
- **DE-Anschluss**：`Erkenntnisgewinnungskompetenz` `E1–E17`（**四个 Kompetenzbereich 之一，德国的显式强项**）· KLP 明示的四种工作方式 `Beobachten / Vergleichen / Experimentieren / Modellieren`，统一置于 **hypothetisch-deduktiv** 框架（Fragestellung → Hypothese → Planung/Durchführung → Auswertung/Interpretation/methodische Reflexion）· EF 的 `Untersuchung von osmotischen Vorgängen` / `Untersuchung von Enzymaktivitäten` · QP 新增 `E15–E17`（方法边界与证据基础）。
- **合规性**：✅ —— 「变量/对照/重复」是**科学方法通用语**，德国 KLP 不但已教，而且**要求得比中国更显式**（德国把它做成独立能力维度；中国课标全文**未出现**「变量控制」「对照实验」两个术语，只有隐式的水平分级）。**本技法是补德国「写法」、借中国「训练密度」，方向是双向互补。**
- **Abitur 应用**：**Aufgabenart II `Fachpraktische Aufgabe` 的主战场**，以及 Aufgabenart I 中「评价给定实验方案」的标准动作。⚠️ 关键：**实验设计归 `Erkenntnisgewinnung`，不是 `Sachkompetenz`**；而「按指导执行已给方法」才归 S。中国学生**不缺操作，缺「论证设计」**（X-15）。
- **产出物**：`06_Bio/Bio-Experimentdesign-Vier-Fragen.md`（四问清单 + 「对照组最常见的两种误解」辨析 + 3 道自编方案评价题；复用 `CN-Bio-Tricks` Trick 3 与 `CN-Bio-Training` Aufgabe 3 并升级为 Q 层）

### CN-Methode 6：曲线**三看法**（走向 / 极值 / 因果）—— 限制因子切换

- **技法内容**：任何 `y-x` 生物曲线固定三步 —— ① **看走向**：分段描述（陡升 / 缓升 / 平台 / 下降），**引用具体区间数值**；② **看极值/转折点**：峰值即最适点，平台即饱和；③ **看因果**：**转折点必对应机制切换**——升段 = 该因子为限制因子；平台 = **限制因子切换或饱和，而不是反应停止**；降段（酶）= 变性（不可逆）。来源：`[CN-课标]` 必修1 2.2.1（酶活性受 pH、温度影响）+ 实验「探究影响酶活性的因素」「探究不同环境因素对光合作用的影响」；`[CN-教材]` 曲线分析法。
- **DE-Anschluss**：EF 的 `Enzyme: Kinetik, Regulation` 与 `Untersuchung von Enzymaktivitäten` · **GK Stoffwechsel 的 `Abhängigkeit der Fotosyntheserate von abiotischen Faktoren`（明文要求）** · LK/GK `Toleranzkurven` 与 `ökologische Potenz` · `Darstellungsaufgaben`（法定 Überprüfungsformen 之一，明列「图表解释」）。**曲线读法是德国的官方训练项**。
- **合规性**：✅ —— 两边都要求读曲线，本技法只是把顺序固化。中国的增量是**「平台 = 因子切换，非停止」这一句纠偏**（德国学生与中国学生犯同样的错）。
- **Abitur 应用**：**STW-04（GK 明文考点，命中率最高）** + EF-10 酶动力学 + OEK-02 耐受曲线 + LK 的种群增长曲线。**AFB I（描述）+ AFB II（解释）** 的组合，正对「AFB II 为重心」的要求。
- **产出物**：`06_Bio/Bio-Kurvenauswertung-Dreischritt.md`（**已有 `CN-Bio-Tricks` Trick 2 可直接迁移**，本卡只补「德国侧出现的四类曲线」清单：酶活性 / 光合速率 / 耐受曲线 / 种群增长）

### CN-Methode 7：物质与能量的**收支表法**（Bilanz）—— 含 ⚠️ 定量边界

- **技法内容**：把光合/呼吸/生态系统三类问题统一处理为**收支表** —— ① 列出**输入项**与**输出项**（气体：O₂/CO₂；能量：光能/化学能/热能）；② 用**总方程**做量的换算（光合与呼吸方向相反）；③ 由**净变化**判断哪个过程占优（如密闭容器中 O₂ 上升 → 光合 > 呼吸；交点为**补偿点**）；④ 生态系统层：物质**循环**、能量**单向递减**，两个方向**不可说反**。⚠️ **边界**：中国的「**10%–20% 传递效率**」定量推算属教材/考试层细化，**德国 GK 不做定量要求**。来源：`[CN-课标]` 必修1 2.2.3/2.2.4 + 实验「探究酵母菌的呼吸方式」；选必2 2.2.3（物质循环 vs 能量单向递减）、2.2.5（生态金字塔）、2.2.6（生物富集）。
- **DE-Anschluss**：**GK/LK 的 `Stoff- und Energiebilanz von Glykolyse … Atmungskette`（明文要求）** · `Zusammenhang von Primär- und Sekundärreaktionen` · `Redoxreaktionen, Energieumwandlung, Energieentwertung, ATP-ADP-System` · EF 的 `Anabolismus und Katabolismus` · OEK-03 的 `Stoffkreislauf und Energiefluss`。
- **合规性**：✅ —— 「收支」正是德国 `Bilanz` 一词的字面要求。⚠️ **10%–20% 的定量计算对 GK 属超出项**（GK 只要求定性的「单向递减」），**可理解、不复习**。
- **Abitur 应用**：STW-01 / STW-06（呼吸四阶段的物质能量平衡，**GK 明文**）· STW-05（Primär ⇄ Sekundär 的耦合）· OEK-03（碳循环与能量流）。**AFB II**；LK 加上能量模型后可到 AFB III。
- **产出物**：`06_Bio/Bio-Stoff-Energiebilanz.md`（收支表模板 + 两个总方程 + 补偿点辨析；⚠️ 定量传递效率部分标注「GK 不作要求」）

### CN-Methode 8：Bewertung 的**多视角清单**（价值 / 规范 / 事实三分）

- **技法内容**：把 Bewertung 类任务做成固定清单 —— ① **先分三层**：事实陈述（是什么）/ 价值判断（好不好的依据）/ 规范陈述（应不应该）；② **列利益相关方**（患者/家庭、产业、科研、社会、生态）并逐一给其立场；③ **时间尺度**（短期 vs 长期）与**空间尺度**（`lokal` vs `global`）；④ **权衡**：明确写出「两方理由各自的权重与让步」，最后给出**有条件的立场**（`unter der Bedingung, dass …`）。来源：`[CN-课标]` 选必3 概念6（转基因产品安全性 / **禁止生殖性克隆人** / **全面禁止生物武器**）+ 核心素养「社会责任」；`[CN-高考]` 开放性论述题。
- **DE-Anschluss**：`Bewertungskompetenz` `B1–B12`（**四个 Kompetenzbereich 之一**）· EF 的 `Zytostatika` 与 `embryonale Stammzellen` 两个落点 · Q 各 IF 的 2–4 条 Bewertung（Stoffwechsel 的 Nahrungsergänzungsmittel、Ökologie 的 Renaturierung/nachhaltige Nutzung、Genetik 的 Gentest/Gentherapie/重组 DNA）· QP 新增 `S8`（Biodiversität 保护的理由）。
- **合规性**：✅ —— 德国 Bewertung 是**官方能力维度**，本技法只是把它的评分点做成可执行清单。⚠️ 硬性规则：**只谈技术/模型层面不得分**，必须落到**价值、规范、利益**；且必须**多视角 + 互相权衡**。
- **Abitur 应用**：**AFB III 的主战场**，也是非母语学生最易失分处。中国的选必3 概念 6（转基因/克隆/生物武器）是**现成的素材库**，可直接改写成德语 Bewertung 题（EF 即可开练，Q 阶段深化）。⚠️ 忌把中文口号式表态直接翻译进去。
- **产出物**：`06_Bio/Bio-Bewertung-Multiperspektive.md`（三分清单 + 利益相关方矩阵 + 「Die Aussage ist normativ, weil …」等 8 个句型模板）

### CN-Methode 9（⚠️ **反例示范**）：发酵工程 / 免疫调节 / GK 种群曲线 —— **分层禁止引入**

- **技法内容（不推荐引入的部分）**：
  - **(a) 发酵工程的完整工程流程**：灭菌 → 无菌技术 → 培养基配方调整 → 平板划线法/稀释涂布平板法分离纯化 → 显微计数法测定数量 → 工业化发酵生产。来源：`[CN-课标]` 选必3 概念3.1–3.2。
  - **(b) 免疫调节体系**：免疫细胞/器官/活性物质、非特异性 vs 特异性、**体液免疫与细胞免疫两条通路**、过敏/自身免疫病/艾滋病。来源：`[CN-课标]` 选必1 概念1.5。
  - **(c) 种群数量模型的定量推演**：`N_t = N₀λᵗ`、逻辑斯谛方程、K 值与 K/2 的应用（如渔业捕捞量）。来源：`[CN-课标]` 选必2 2.1.2 + `[CN-高考]`。
- **DE-Anschluss**：
  - **(a) 无合法接口** —— 德国 KLP **无发酵工程模块**；LK 只在 Stoffwechsel 下有 `Alkoholische Gärung und Milchsäuregärung` 的**代谢途径与能量平衡**（机制层，非工程层）；GK 连 Gärung 都没有。
  - **(b) 完全无接口** —— **KLP 全文无免疫学 IF**（唯一的近邻是 EF 的 `Zell-Zell-Erkennung`，只到细胞识别的原则层）。
  - **(c) 分层** —— **LK 有接口**（`exponentielles und logistisches Wachstum` + `r-/K-Strategien` 是明文 Schwerpunkt）；**GK 完全无接口**（GK 的 Ökologie 无种群动力学条目）。
- **合规性**：⚠️ **不合规（分层）** ——
  - **(a) 全学段不合规**：违反铁律 1（这是**知识板块 + 工程流程**，不是方法）。
  - **(b) 全学段不合规**：德国考纲根本没有该领域，引入即浪费复习时间，且会诱导学生在 Bewertung 中误用。
  - **(c) 对 GK 不合规、对 LK 合规** —— 这是本文件最值得记住的一条：**同一个中国技法在不同课程轨道上合规性不同**。判断依据是 §0.2（GK/LK 同 IF、只有深度差）与 §0.5（GK 的 Genetik 无方法条目）。
  - **附带说明**：本卡的作用是提供**反例**，说明为什么「看起来很像生物、中国也考得很重」的内容仍不能搬。**唯一例外**：(a) 中的「**无菌操作**」思想可作为 LK `Gentechnik` 实验题的常识性背景，但不作考点复习。
- **Abitur 应用**：⛔ **(a)(b) 无任何应用**；**(c) 仅 LK 可考**（OEK-08）。⚠️ 三者的共同陷阱是：学生会因为「我很熟」而**在 Bewertung 题里写超纲内容**——这不但不得分，还会挤占有限的答题时间（GK 255 min / LK 300 min）。
- **产出物**：**不做笔记**。仅在 `06_Bio/CN-Bio-Bridge.md` 中列为「**桥接素材，非考纲内容**」三条，并注明 (c) 的 `[LK]` 例外。

---

## 4. 高价值差异清单（**行动项**）

> 排序 = Abitur 应试性价比。

### 🎯 中国更深 / 更系统 —— 值得借鉴改写

| 优先级 | 知识点 | 中国做法 | 德国现状 | 可产出 |
|---|---|---|---|---|
| 🔴 **1** | 遗传概率计算与系谱判定 `GEN-05` / `X-13` | 三步程序（先分离后组合）+ 乘法/加法规则 + 两步判定 + 概率尾巴 | 只要求「分析 Stammbäume、推导后果」，**无显式概率训练** | **《遗传计算三步程序》《系谱两步判定》**（CN-Methode 1/2）—— **DE-Anschluss 在 EF 就已具备** |
| 🔴 **2** | 神经-体液调节三件套 `NEU-06` | 分级调节 + 反馈调节 + 神经-体液协调（体温/水盐） | LK 才要求 `Hormone` 与 `Verschränkung`；GK 未列 | **《Hormonwirkung 与神经-体液交织》** —— 罕见的「中国更深且德国正好要考」，改造即用 |
| 🔴 **3** | 限制因子与曲线读法 `STW-04` | 曲线三看法 + 限制因子切换 | **GK 明文要求** `Abhängigkeit … von abiotischen Faktoren` | **《曲线三看法》**（CN-Methode 6）—— 现有 Trick 2 可直接迁移 |
| 🔴 **4** | 生态系统能量流动与生态金字塔 `OEK-03` | 单向递减 + 金字塔 + 生物富集 | GK 只到 `Kohlenstoffkreislauf` + `Nahrungsnetz` | **《物质循环与能量流》** —— ⚠️ 去掉 10%–20% 定量 |
| 🔴 **5** | Bewertung 素材库 `X-07` | 选必3 概念6（转基因/克隆/生物武器）+ 社会责任素养 | Bewertung 是 AFB III 主战场，但**缺中国式的现成情境** | **《Bewertung 多视角清单》**（CN-Methode 8） |
| 🟠 **6** | 基因工程操作程序 + PCR/电泳 `GEN-13` | 三种工具 + 四步程序 + PCR/电泳实验 | **GK 无方法条目；LK 才有** | **《Gentechnik 操作程序》** —— ⚠️ **仅 LK 可用** |
| 🟠 **7** | 种群数量模型 `OEK-08` | J 型/S 型 + K 值 + 数学模型 | **GK 无；LK 明文** | **《Populationsdynamik》** —— ⚠️ **仅 LK**（见反例 (c)） |
| 🟠 **8** | 突变 → 蛋白质 → 性状的因果链 `GEN-04` | 替换/插入/缺失 → 移码 → 功能改变 | 只列 `Genmutationen` | **《Genmutation → Merkmal 因果链》**（AFB II 标准答案骨架） |
| 🟠 **9** | 实验变量控制与对照的训练密度 `X-15` | 约 30 项指定实验 + 水平二→四的能力递进 | 实验设计归 `Erkenntnisgewinnung`，**中国学生不缺操作缺论证** | **《实验设计四问法》**（CN-Methode 5） |
| 🟡 **10** | 行为动词分级 `X-12` | 内嵌于每条内容要求的四级动词 | AFB 独立于内容条目 | **《动词 ↔ AFB 标尺》**（CN-Methode 3）—— 元认知工具，零知识成本 |

### ⚪ 德国独有 / 更深 —— 中国学生的**缺口清单**

| 优先级 | 知识点 | 说明 | 补法 |
|---|---|---|---|
| 🔴 **1** | `proximate` / `ultimate` 与 `funktional` / `kausal` `X-06` | 要求显式说明「你给的是哪一类解释」；明文禁止目的论论证 | **必做辨析卡**，写进每道 erklären 题的检查项 |
| 🔴 **2** | **5 个 `Basiskonzepte`** `X-04` | 跨 IF × 跨能力维度的第三维，是德国作答的**官方得分语言** | **必做《Basiskonzepte 五轴追踪卡》**（每条笔记标所属轴） |
| 🔴 **3** | `Chemiosmotische ATP-Bildung` `STW-02` | 膜基能量转化机制，中国高中完全不讲 | 从零新建；LK 还要**比较线粒体与叶绿体** |
| 🔴 **4** | `Gendrift` + `Kosten-Nutzen-Analyse` + `reproduktive Fitness` `GEN-06/07` | 漂变是中国课标空白；成本-收益分析是全新题型 | 逐条补；与 GEN-11 联动 |
| 🔴 **5** | 系统树方法学 `GEN-09` | `ursprüngliche vs abgeleitete Merkmale`、`populationsgenetischer Artbegriff`、`molekularbiologische Homologien` | 必修；这是 `individuelle und evolutive Entwicklung` 的核心落点 |
| 🔴 **6** | `Calvin-Zyklus` 三步 + 呼吸四阶段 `STW-05/06` | 中国止于总方程与有氧/无氧类型 | 术语须换（Primär-/Sekundärreaktion）+ 四阶段逐条补 |
| 🔴 **7** | EF→Q 的**两个断层** `X-02` | Ökologie 与 Genetik/Evolution 在 EF 无接口 | 按 §0.4 排序起桥；优先用中国的知识存量填 Genetik |
| 🟠 **8** | `Abgrenzung nicht-naturwissenschaftlicher Vorstellungen` `GEN-08` | 科学划界 + 反目的论 | 与 X-06 合并成一张卡 |
| 🟠 **9** | QP 新增 `E15–E17` + `S8` `X-15` | 方法边界 / 证据基础 / 知识生产条件的**元认知层** | 中国「科学探究」素养覆盖不到此颗粒度 |
| 🟠 **10** | `[LK]` `Neuronale Plastizität` / `Humanevolution` / `Krebs` / C4 / 能量模型 | LK 五大独立块，中国零基础或仅一句话 | 逐块新建（当前笔记**零覆盖**） |
| 🟡 **11** | `Toleranzkurven` + `ökologische Potenz` `OEK-02` | 德国点名的两个生态工具 | 新建（概念简单） |
| 🟡 **12** | **语言规范性进评分准则** `X-09` | 9 条准则末两条为 `Fachsprache` 与 `standardsprachliche Normen` | 非母语学生的结构性扣分风险 |

### 🔵 中国独有（德国不考 —— **禁止占用复习时间**）

| 知识点 | 说明 | 处理 |
|---|---|---|
| **免疫调节** `X-10` | 体液免疫/细胞免疫/疫苗/免疫失调。**KLP 全文无免疫学 IF** | ❌ 不复习（反例 (b)）。**中国最大的单块超出量** |
| **发酵工程与微生物培养** `X-11` | 灭菌/无菌/培养基/划线/涂布/显微计数 | ❌ 不复习（反例 (a)）；德国 LK 只有 Gärung 的**代谢侧** |
| **植物激素调节** `X-11` | 生长素两重性、五大激素协同拮抗 | ❌ 不复习 |
| **内环境的器官-系统层** `EF-11` | 血浆/组织液/淋巴、四大系统参与、血糖体温 pH 调节 | ❌ **不在 EF 引入**（德国 EF 的 Homöostase 只到细胞层） |
| **反射弧** `NEU-01` | 中国神经调节的核心 | ⚠️ 只作理解，德国未列为 Schwerpunkt |
| **群落演替** `OEK-04` | 初生/次生演替 | ⚠️ 只作理解 |
| **10%–20% 传递效率定量** `OEK-03` | 能量金字塔的定量推算 | ⚠️ GK 不要求（CN-Methode 7 边界） |
| **20 种氨基酸名称 / 蛋白质分子细节** `EF-06` | 分子细节 | ⚠️ 德国淡化；只保留「序列 → 空间结构 → 功能」一句 |
| **种群曲线定量（GK 考生）** `OEK-08` | J/S 型公式与 K 值应用 | ❌ GK 不复习（反例 (c)） |

---

## 5. 难度与节奏差异

| 维度 | 德国 NRW（Biologie） | 中国（生物） |
|---|---|---|
| **结构骨架** | **5 个 IF（EF 1 / Q 4）+ 4 Kompetenzbereich + 5 Basiskonzepte**（三维交叉） | **大概念（概念 1–6）× 模块 × N.M.K 三级条目**；必修 2 + 选必 3 + 选修 22 模块 |
| **学段切分** | KLP **只有 EF / QP 两级**（无 Q1/Q2 标记） | 必修建议高一，选必在其后；**与 EF/Q 无学年对应关系** |
| **GK/LK 分流** | **IF 列表完全相同，只有深度差**（与物理相反）；LK 增 Schnitte：感觉细胞/激素、能量模型/C4/发酵、种群动力学、表观遗传/肿瘤/人类演化/PCR | 无 GK/LK 分流；选必三模块对全体选考学生一致 |
| **广度** | 明确排除**免疫学、植物激素、发酵工程**；但在**遗传演化的方法学与系统学**上更细 | 宽而全（含上述全部），但演化部分的**方法学工具**弱于德国 |
| **深度** | 两极：**EF 内容颗粒度粗**（只列 Schwerpunkt 条目），**Q 阶段的方法学与元认知层极细**（E15–E17、K7/K8、B1–B12） | 均匀且密度高：内容规定细至三级条目，行为动词即难度指令 |
| **数学工具** | EF：定性（曲线/显微/渗透）；Q：定量（Stoff- und Energiebilanz、chemiosmotische ATP-Bildung）；LK：种群增长的指数/逻辑斯谛建模 | **概率与统计显式写入**（学业要求 + 基因频率的数学讨论）；生态金字塔与种群模型定量 |
| **认知层级标尺** | **AFB I/II/III + Operatoren**（独立于内容条目） | **行为动词分级**（内嵌于内容条目）+ 学业质量 4 级（高考 = 水平四） |
| **题型** | **法定两题型**（材料绑定 / 学科实践）；**⛔ 禁止纯论述题**；AFB II 为重心；**9 条跨科评分准则** | 选择题 + 非选择题（呈现解答过程）；课标只给命题原则，**未规定题型与分值** [未获取到] |
| **实验** | **无必做清单**，但要求**自行设计并论证**（属 `Erkenntnisgewinnung`） | **约 30 项指定实验/探究** + 工程学实践；重操作与数据处理，**轻设计论证** |
| **评价方式** | EPA **0–15 分制** + Zentralabitur + 全州统一 `Bewertungsraster`；口试 20–30 min | 高考**等级分制**；学业质量 4 级（合格考 = 水平二仅必修，**高考 = 水平四**） |
| **考试时长** | **GK 255 min / LK 300 min**（BASS 13-32 Nr. 6）[已验证] | 各省自定，**课标未规定** [未获取到] |
| **跨学科轴** | **Basiskonzepte**（内容侧横向透镜）+ `Kommunikation`（跨 IF 能力维度） | **STEM 显式写入**（水平三/四）+ 数学概率统计 + 数学模型 |

---

## 6. 现有 `CN-Bio-*` 笔记的**可复用性评估**

> 依据 `06_Bio/CN-Bio-Begriffshandbuch.md`（167 行）· `06_Bio/CN-Bio-Tricks.md`（158 行）· `06_Bio/Klausur-Training/CN-Bio-Training.md`（153 行）逐篇比对。**三篇合计约 480 行。**

| 笔记 | 可复用性 | 直接可用部分 | 须改造部分 | 对应本表条目 |
|---|---|---|---|---|
| **`CN-Bio-Begriffshandbuch.md`** | 🟢 **高（术语与句型层）** | 6 概念的三语术语盒、`Klausur-Sätze`、`Fehlvorstellung` 结构（纠偏句已写成德语 Fachsatz） | ① 只覆盖 EF Zellbiologie 四个 Schwerpunkt 中的**两个**（Aufbau + Biochemie 的膜部分）—— **`Zellzyklus/Mitose/Meiose`、`Enzyme-Kinetik`、`ATP/Redox`、`Stoffgruppen` 全缺**；② **Genetik / Ökologie / Evolution 三节自标为「Ausblick / 非 EF」**，而它们在 Q 阶段**是正式 IF** → 该标注须**整体上移为 Q 正式内容** | EF-01/06/07 + GEN / OEK 的术语桥 |
| **`CN-Bio-Tricks.md`** | 🟢🟢 **最高（方法层）** | Trick 2 曲线三看法 → **CN-Methode 6**；Trick 3 对照原则 → **CN-Methode 5**；Trick 4 方程互推 → **CN-Methode 7**；Trick 5 酶口诀（EF，✅ 直用）；Trick 1 系谱判定 → **CN-Methode 2**；Trick 6 生态位分化 → OEK-05 | ① **Trick 1（系谱）与 Trick 6（生态位）现标 `Ausblick` → 须改写为 Q 正式方法**；② 全篇缺 Q 四个 IF 的方法（电位测量、色谱、种群定量、Stammbaum 系统学） | EF-10 / NEU / STW / GEN / OEK |
| **`CN-Bio-Training.md`** | 🟢 **高（格式层最值钱）** | **五段式题模板**：`Material（自编 Eigenbeschreibung）→ Teilaufgaben (AFB I/II/III) → Lösungsskizze → EHZ 踩分点 → DE-Transfer-Satz` —— **正对 Aufgabenart I `Materialgebundene Aufgabe`**，是本库最可复制的资产 | ① Aufgabe 2（系谱）与 Aufgabe 4 的进化一句标 `Ausblick` → **直接升为 Q 正式题**；② 缺 Q 四个 IF 的材料题；③ `Kontra/Fehlfalle` 中的「小样本判死伴 Y」等纠偏可直接并进 CN-Methode 2 | X-08 + 全 IF |

**综合结论**：

1. **方法层与格式层可直接复用（约 70%）** —— 三篇的方法论与题模板不需要重写，只需**换 IF 标签**。
2. **内容层必须按 Q 四 IF 重新切片** —— 现有内容**全部集中在 EF 的 Zellbiologie**，Q 阶段**实质零覆盖**（与 DE 文件 §8 的缺口清单一致）。
3. ⚠️ **最需要处理的一处标注错误**：三篇反复写「EF 不考遗传/生态/进化」—— 这在 **EF 层是对的**，但会让读者误以为它们**不重要**。实际在 Q 阶段它们是**四个 IF 中的两个**。→ 建议统一改为「**EF-Ausblick → Q-pflichtig**」双标注。
4. **优先改写顺序**：① `CN-Bio-Tricks` Trick 1（系谱 → GEN-05，CN-Methode 2）→ ② Trick 6（生态位 → OEK-05）→ ③ `CN-Bio-Training` 五段式模板**复制到 Neurobiologie 与 Genetik 两个 IF**（补缺优先级最高且断层最大）→ ④ 新建 `Chemiosmose` 与 `Basiskonzepte` 两张卡（德国独有、中国零基础）。

---

## 7. 待核实项

- [ ] **`Operatoren-NRW-Alle-Faecher.md` 尚未创建** —— 生物官方 Operatoren 动词表未取得，CN-Methode 3 的「动词 ↔ AFB」表**缺官方动词列** [未获取到]
- [ ] **`Klausur-Formate/Klausur-und-Abitur-Formate.md` 目录尚未创建** —— Abitur 时长仅从 `01-Quellen.md §A.4` 取得，未交叉核对 [未获取到]
- [ ] 生物 Operatoren 的 Fachseite 直链（`.../zentralabitur-gost/faecher/biologie-gost`）**未实测** [据推断，见 DE §7]
- [ ] **Basiskonzepte 的名称不一致**：DE 文件给出 5 个（`Struktur und Funktion` / `Stoff- und Energieumwandlung` / `Information und Kommunikation` / `Steuerung und Regelung` / `individuelle und evolutive Entwicklung`），而 CN 文件 §5.4 对照表中写作「Struktur und Funktion、System、Entwicklung、Reproduktion」→ **本表以 DE 文件的 5 个为准**，CN 侧表述须回填修正 [据推断]
- [ ] **Abitur 2027 生物的 Fachliche Vorgaben** 具体内容（是否指定 IF 组合）[未获取到]
- [ ] 中国**各省等级性考试的试卷结构与分值比例** —— 课标只给命题原则，**未规定题型与分值** [未获取到]
- [ ] 德国 QP 的四个 IF 是否在实际教学中**按 Kurshalbjahr 分配**（KLP 无 Q1/Q2 标记，但口试规则「任务不得只覆盖一个 Kurshalbjahr」暗示存在半年制分配）[据推断]
- [ ] `Stoffwechselphysiologie` 的 `Stoff- und Energiebilanz` 在 GK 的**具体定量程度**（是否要求摩尔级配平，抑或只要求「阶段定位 + 收支方向」）[据推断]
- [ ] 中国课标**全文无「变量控制」「对照实验」术语** —— CN-Methode 5 的中国侧依据来自**学业质量水平的隐式分级 + 教材层训练**，须在产出笔记时明确标注该分工 [已验证：CN 源文件术语检索]
- [ ] `CN-Bio-*` 三篇笔记中「EF 不考遗传/生态/进化」的标注是否需在改写作废 —— 需用户确认后再动该文件 [未获取到]

---

## 变更记录

- 2026-09-24：创建（S5 中德映射阶段）。基于 `Deutschland/Bio-Oberstufe.md`（官方 KLP `gost_klp_bi_2022_06_07_0.pdf`，Heft 4722，`2022/23`，逐条 [已验证]）与 `China/Bio-CN-Kursstandard.md`（`2017年版2020年修订`，97 页官方 PDF，逐条 [已验证]）交叉推导。**无官方中德对照文件**，全部对照关系为本项目推导，逐条标注 [据推断]。
  - **主表 67 行**（EF 12 / NEU 7 / STW 11 / OEK 9 / GEN 13 / X 15）。
  - **关键结构结论**：① **EF 只有 `Zellbiologie` 一个 IF**，Q 阶段四 IF 全开 —— 最高价值台阶是「单点 → 四元并列」；② **GK 与 LK 的 IF 列表完全相同**（与物理相反），只有深度差；③ **GK 的 Genetik 段落无 `Fachliche Verfahren`**（PCR/电泳/基因工程为 LK 独有）；④ **EF→Q 接口不对称** —— Neuro 与 Stoffwechsel 有 EF 有机接口（`Signaltransduktion`+`Membrantransport` / `ATP-ADP`+`Enzymkinetik`），**Ökologie 与 Genetik/Evolution 是真正的断层**；⑤ 新增第三维 **5 个 `Basiskonzepte`**，且 `Kommunikation` 是唯一纯跨 IF 能力维度。
  - **产出 9 条 CN-Methode 技法卡**（含 5 条指定深化项：遗传计算 / 系谱概率 / 行为动词分级→AFB / 概率统计跨学科闭环 / 实验设计逻辑），全部标注 `DE-Anschluss` 与合规性；**CN-Methode 9 为 ⚠️ 反例示范**，用「发酵工程 / 免疫调节 / GK 种群曲线」三例演示**分层禁止**（同一技法对 GK 不合规、对 LK 合规）。
  - **已关联现有资产**：§6 评估 `CN-Bio-Begriffshandbuch` / `CN-Bio-Tricks` / `CN-Bio-Training` 三篇（约 480 行），结论为「方法层与格式层可复用约 70%，内容层须按 Q 四 IF 重新切片」，并指出其「EF 不考遗传/生态/进化」标注须改为「EF-Ausblick → Q-pflichtig」。
