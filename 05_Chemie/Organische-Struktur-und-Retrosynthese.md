---
fach: Chemie
thema: "Organische Strukturaufklaerung und Retrosynthese"
operatoren: [ermitteln, analysieren, begruenden, planen, darstellen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Chemie, Organische-Chemie]
stufe: "Q2"
kursart: "GK|LK"
---

# Organische Strukturaufklärung und Retrosynthese (有机结构双轴推断与逆向合成)

> **中文理解**：德国有机化学有**机理深度**（GK 两条、LK 五条），却**没有中国式「推断题」这一题型**；中国有成熟的「碳骨架 + 官能团」双轴推断与逆向合成，却缺机理语言 [已验证，Mapping CN-Methode 6]。把两者对接——**用德国的机理给中国的推断提供「切哪里」的依据**——就是本笔记。LK-19 明文要求「从分子结构推演反应行为」，正对双轴法 [已验证，KLP LK 泛化条目]。
>
> **Klausur-Relevanz**：Q-3 现有笔记**完全零覆盖** [已验证，`Lernbaum-Chemie.md §4`]。双轴推断 + 逆向合成是 Q-3 的**综合能力落点**（AFB II→III），也是 GK/LK 结构题、检验题、合成路线题的统一抓手。
>
> ⛔ **硬边界**：全部题目**只限德国 5 类官能团**（Hydroxy- / Carbonyl- / Carboxy- / Ester- / **Aminogruppe**）[已验证，EF 只到酯基，氨基属 Q-3 GK 增量]。**不得引入中国选必3 的 10 类官能团全表与具体中国试剂体系**。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Strukturaufklärung | 结构鉴定 | structure elucidation | 由分子式 + 特征反应反推结构 | 本笔记主线 |
| Zwei-Achsen-Methode | 双轴法 | two-axis method | 轴一碳骨架 + 轴二官能团，两轴交叉定位分子 | CN 侧提供的**解题顺序** |
| Doppelbindungsäquivalent (DBE) | 不饱和度 | degree of unsaturation | `DBE = (2C + 2 + N − H − X) / 2` | 由分子式锁定骨架 |
| Konstitutionsisomerie | 构造异构 | constitutional isomerism | 分子式同、连接方式不同 | EF-1 已教，推断的候选空间 |
| Nachweisreaktion | 检出反应 | detection reaction | 特征显色 / 沉淀 / 放气反推官能团 | Q-3 GK-13 官能团检验 |
| Retrosynthese | 逆向合成 | retrosynthesis | 从目标分子倒推到原料 | 每步只做一件事 |
| Disconnection | 断键（逆推切法） | disconnection | 逆推时「切断」的键，对应正向的成键反应 | 与机理一一对应 |
| Funktionsgruppen-Interkonversion (FGI) | 官能团转化 | functional group interconversion | 只改官能团、不动碳骨架 | 逆推第二类步骤 |
| Homologe Reihe | 同系物 | homologous series | 相差 CH₂ 的系列 | 骨架扩展手段 |

---

## 2. 知识结构 (Struktur)

### 2.1 双轴模型：把推断降维

推断题之所以难，是因为「结构」这个搜索空间太大。双轴法把它拆成两个**正交**的子问题 [据推断，CN 方法层]：

- **轴一（碳骨架）**：由**分子式算 DBE**，确定碳数、环数与不饱和键数 → 锁定骨架候选。
- **轴二（官能团）**：由**特征反应与条件**反推官能团 → 锁定官能团。

两轴交叉 = 定位分子。**先走哪根轴由题干决定**：给了分子式 → 先轴一；给了反应现象 → 先轴二。

> *Klausur-Satz*: *Zur Strukturaufklärung wird die Aufgabe in zwei orthogonale Achsen zerlegt: das Kohlenstoffgerüst wird über das Doppelbindungsäquivalent festgelegt, die funktionelle Gruppe über charakteristische Nachweisreaktionen.*

### 2.2 轴一：不饱和度速算

对分子式 `C_c H_h N_n O_o X_x`（O 不参与计算）[据推断，通用公式]：

```
DBE = (2c + 2 + n − h − x) / 2
```

读法：
- `DBE = 0` → 饱和开链（烷烃、醇、醚、胺）；
- `DBE = 1` → 一个双键 **或** 一个环；
- `DBE = 2` → 两个双键 / 一个三键 / 一个双键 + 一个环；
- **每个 C=O 或 C=C 计 1**，三键计 2。

> *Klausur-Satz*: *Das Doppelbindungsäquivalent gibt die Summe aus Ringen und Mehrfachbindungen an; es lässt sich direkt aus der Summenformel berechnen und legt das Kohlenstoffgerüst fest.*

### 2.3 轴二：5 类官能团的特征反应（**德国限定**）

| 官能团 | 特征反应 / 检出 | 现象 | 备注 |
|---|---|---|---|
| Hydroxygruppe (–OH) | 与 Na 反应 | **Gasentwicklung (H₂)** | 醇的酸性极弱，只与活泼金属反应 |
| Carbonylgruppe (Aldehyd, –CHO) | **Fehling-Probe** / **Tollens-Probe** | 红棕色 Cu₂O 沉淀 / 银镜 | 酮**不反应**（区分醛酮的关键） |
| Carbonylgruppe (Keton, >C=O) | 无 Fehling/Tollens 反应 | — | 与醛的**辨别判据** |
| Carboxygruppe (–COOH) | 与 **NaHCO₃** 反应 | **CO₂ 气泡**（石灰水变浊） | 酸性强于碳酸 → 放 CO₂ |
| Estergruppe (–COO–) | 水解（酸性/碱性） | 产物为酸 + 醇 | 无明显显色，靠水解产物反推 |
| Aminogruppe (–NH₂) | 碱性反应（与酸成盐） | 溶解 / 成盐 | ⚠️ Q-3 GK 增量，EF 不得提前用 |

> ⚠️ **醛 / 酮的区分**是本轴最高频考点：只有醛能发生 Fehling 与 Tollens [据推断，德国教材标配检出]。

> *Klausur-Satz*: *Aldehyde lassen sich durch die Fehling- oder Tollens-Probe nachweisen, Ketone dagegen nicht; Carbonsäuren werden über die CO₂-Entwicklung mit Natriumhydrogencarbonat identifiziert.*

### 2.4 逆向合成三步（Retrosynthese）

从目标分子倒推，**每步只做一件事**：

1. **切骨架**（Disconnection）：找可断的 C–C / C–X 键，对应一条**成键机理**：
   - 烯烃 + HX → **elektrophile Addition**；
   - 酸 + 醇 → **Kondensation (Estersynthese)**；
   - 烷烃 + X₂ → **radikalische Substitution**。
2. **调官能团**（FGI）：用**醇的氧化序列**在骨架不动的前提下换官能团：
   - 一级醇 → 醛 → 羧酸；
   - 二级醇 → 酮。
3. **补条件**：每步标试剂、催化剂与条件（温度、UV、H₂SO₄）。

> *Klausur-Satz*: *Bei der Retrosynthese wird zunächst eine Bindung gedanklich gespalten (Disconnection), anschließend die funktionelle Gruppe angepasst; jeder Schritt verändert entweder das Gerüst oder die funktionelle Gruppe, niemals beides gleichzeitig.*

### 2.5 机理 × 推断：为什么这个嫁接合法

| 正向机理（德国已教） | 逆推时对应「切哪里」 |
|---|---|
| radikalische Substitution | 切 C–Halogen 键（烷烃卤代） |
| elektrophile Addition | 切 C=C 上的加成键（烯烃 + HX/H₂O） |
| Kondensation (Estersynthese) | 切酯的 C–O 单键（酸 + 醇） |
| Oxidation der Alkanole | 不切键，只改官能团（FGI） |

→ **零新增知识**：碳骨架、5 类官能团、机理全部是德国 KLP 已教内容；中国侧提供的只是**两步降维的解题顺序** [已验证，Mapping CN-Methode 6 合规性 ✅]。

---

## 3. 解题方法 (Methoden)

### 3.1 双轴推断五步法（`ermitteln` / `analysieren` 标准程序）

1. **抄分子式，算 DBE** → 锁定骨架候选。—— *KLP 工具：EF-1 `Konstitutionsisomerie`*
2. **读特征反应** → 定官能团（用 2.3 表）。—— *KLP 工具：Q-3 GK-13 `Nachweise`*
3. **两轴交叉** → 列出满足两轴的构造异构体。—— *KLP 工具：`Konstitutionsisomerie`*
4. **用条件消歧**（如「只与 Fehling 反应」→ 必为醛）→ 唯一化。—— *KLP 工具：Nachweisreaktionen*
5. **验算**：回代分子式，核对 C/H/O/N 与 DBE。—— *KLP 工具：物质守恒*

> **判据 / 决策点**：若题干给分子式 **且** 给反应现象 → 双轴同走；只给现象 → 先轴二再反推骨架；只给分子式 + 一条性质 → 先轴一。

### 3.2 逆向合成三步法（`planen` 标准程序）

1. **识别目标官能团** → 决定最后一步是**成键**还是**FGI**。
2. **切一步**（一次只切一根键 / 只换一个官能团），写出前体。
3. **回推至可得原料**（≤3 步为宜），每步标试剂与条件。

> **判据 / 决策点**：AFB III 的给分点在「**为何这样切**」——须回扣机理（如「此处切 C–C 是因为可用亲电加成一步成键」）。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 「碳骨架 + 官能团」双轴推断 + 逆向合成

- **技法内容**：轴一由**不饱和度**定骨架，轴二由**特征反应**定官能团，两轴交叉定位；逆向合成从目标分子倒推，**先切骨架（成键反应）再调官能团（转化）**，每步只做一件事。
- **DE-Anschluss**：`funktionelle Gruppen` 与 Nachweise（EF-1 四类 + Q-3 氨基）· `Konstitutionsisomerie`（EF-4）· Q-3 的 `Reaktionsmechanismen`（GK 两条 / LK 五条）· `Reaktionswege`（IF 名即为此意）· 氧化序列（EF-1 Schwerpunkt 6）。
- **合规性**：✅ —— **本表最精妙的合法嫁接入口**：德国有机理深度但无推断题型，中国有推断题型但无机理深度，两者互补且**不引入任何 KLP 外的新知识**。⚠️ 限制：**不得引入中国 10 类官能团全表**（德国只认 5 类）与**具体中国试剂体系**；题目一律限定在 5 类官能团内。
- **Abitur 应用**：LK-19「从分子结构推演反应行为」（正对双轴法）· GK-13 官能团检验 · 机理选择（由结构推该走哪条机理）· 合成路线设计题。AFB II/III。
- **来源**：`[CN-课标]` 选必3 2.3「有机合成的关键是碳骨架的构建和官能团的转化」+ 学业要求「推断有机化合物、检验官能团、设计有机合成路线」；`[CN-高考]` 双轴与逆向合成套路（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（结构式/实验现象表绑定）[已验证] |
| Operator | `ermitteln` / `analysieren` / `begruenden` / `planen` / `darstellen` |
| AFB | II（双轴推断）→ III（逆向合成路线论证） |
| 建议分值 / 时长 | 单题约 8–14 BE；合成路线题常作整卷压轴小问 |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Eine organische Verbindung hat die Summenformel C₃H₆O₂.
> **a)** Berechnen Sie das Doppelbindungsäquivalent.
> **b)** Geben Sie zwei Konstitutionsisomere an, die zu dieser Summenformel passen, und ordnen Sie ihnen jeweils die funktionelle Gruppe zu.

**Aufgabe 2** `[原创]`
> Eine Verbindung der Summenformel C₂H₄O gibt mit der Fehling-Probe einen rotbraunen Niederschlag, reagiert aber nicht mit NaHCO₃.
> **a)** Ermitteln Sie mithilfe beider Achsen die funktionelle Gruppe und begründen Sie, warum eine Carbonsäure ausgeschlossen ist.
> **b)** Geben Sie die Strukturformel der Verbindung an.

**Aufgabe 3** `[NRW-改编]`
> Zwei unbekannte Flüssigkeiten A und B haben beide die Summenformel C₃H₆O. A reagiert mit Fehling-Lösung, B nicht; beide reagieren nicht mit NaHCO₃.
> **a)** Ordnen Sie A und B begründet zu.
> **b)** Geben Sie jeweils die Strukturformel an.

**Aufgabe 4** `[CN-改编]`
> Zielverbindung ist Propansäureethylester (CH₃CH₂COOCH₂CH₃).
> **a)** Planen Sie einen Syntheseweg in höchstens zwei Schritten ausgehend von Ethanol und Propan-1-ol und benennen Sie die zugrunde liegende Reaktionsart.
> **b)** Begründen Sie, welchen Schritt Sie als Disconnection gewählt haben und warum.

**Aufgabe 5** `[NRW-改编]`
> Eine Verbindung C₄H₈O₂ reagiert mit NaHCO₃ unter Gasentwicklung und bildet mit Ethanol in Gegenwart von konzentrierter Schwefelsäure einen Ester.
> **a)** Bestimmen Sie die funktionelle Gruppe und berechnen Sie die DBE.
> **b)** Entscheiden Sie begründet, ob es sich um eine geradkettige oder verzweigte Carbonsäure handelt (Hinweis: die Verbindung enthält **zwei chemisch äquivalente CH₃-Gruppen**).

### 5.3 Musterlösung

**Aufgabe 1**
1. **a)** `DBE = (2·3 + 2 − 6)/2 = (6 + 2 − 6)/2 = 1` ✓ 得分点（O 不计入）
2. **b)** 两个候选：丙酸 `CH₃CH₂COOH`（Carboxygruppe，DBE=1 来自 C=O）✓；乙酸甲酯 `CH₃COOCH₃`（Estergruppe，DBE=1）✓ —— **两轴交叉**得构造异构体（得分点：必须点明官能团）

**Aufgabe 2**
1. **a) 轴一**：`DBE = (2·2 + 2 − 4)/2 = 1` → 一个双键（很可能是 C=O）✓
2. **a) 轴二**：Fehling 阳性 → **Aldehyd**；NaHCO₃ 阴性 → **无 Carboxygruppe** ✓ 得分点（**两条现象必须都引用**）
3. **b)** 结构式：**Acetaldehyd** `CH₃–CHO` ✓ 得分点

**Aufgabe 3**
1. **a)** A 与 Fehling 反应 → **Aldehyd**（Propanal）；B 不反应 → **Keton**（Propanon）；两者均不与 NaHCO₃ → 均非羧酸 ✓ 得分点
2. **b)** A：`CH₃CH₂CHO`；B：`CH₃COCH₃` ✓ 得分点

**Aufgabe 4**
1. **a) 路线**：① Propan-1-ol →（氧化，CuO 或 KMnO₄）→ Propansäure；② Propansäure + Ethanol →（konz. H₂SO₄，Kondensation）→ Propansäureethylester ✓ 得分点（**两步、试剂、条件齐全**）
2. **b) Disconnection**：切断酯的 **C–O 单键**（R–CO–OR'）→ 前体为羧酸 + 醇；对应正向 **Kondensation (Estersynthese)** ✓ 得分点（**须点明对应的机理名**）

**Aufgabe 5**
1. **a)** NaHCO₃ 放气 → **Carboxygruppe**；`DBE = (2·4 + 2 − 8)/2 = 1` → 一个 C=O ✓ 得分点
2. **b)** 若为**直链**丁酸 `CH₃CH₂CH₂COOH`：只有**一个** CH₃ 基团 → 与「两个等价 CH₃」矛盾；若为**支链** 2-甲基丙酸 `(CH₃)₂CHCOOH`：**两个 CH₃ 化学等价**（对称）→ 与提示相符 → 判定为**支链羧酸** ✓ 得分点（**用等价性消歧，而非靠猜**）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 只凭官能团特征反应猜结构，**不先算 DBE** → 碳骨架错 | 先轴一（算 DBE）再轴二；两轴必须都走 |
| 知识错 | 把 Fehling 阳性当成「有羰基」而不区分醛酮；把 NaHCO₃ 放气当成「有羟基」 | 醛酮靠 Fehling/Tollens 区分；放 CO₂ 专指羧基 |
| 表达错 | 逆推时一步同时改骨架与官能团；路线不标试剂与条件 | 每步只做一件事；每步写试剂 + 条件 + 机理名 |
| 越界错 | 引入中国 10 类官能团 / 中国试剂（如「银氨溶液」以外的自有体系） | 严格限定德国 5 类官能团与德国教材试剂 |

---

## 7. Vernetzung

- **上游**：`Reaktionsmechanismen-Uebergang-Elektronenpaar-Formalladung.md`（电子式与反应位点）· `EF1-Auffuellung-Funktionsgruppen-Nachweis-Oxidation-Ester.md`（5 类官能团检验 + 氧化序列 + 酯化）
- **下游**：`Reaktionsmechanismen-GK-radikalische-Substitution-und-elektrophile-Addition.md`（机理给「切哪里」提供依据）· LK 增量（S_N1/S_N2、芳香亲电取代）
- **横向**：`03_Mathe` 代数（解 DBE 线性方程）
- **术语卡**：`Doppelbindungsaequivalent` / `Retrosynthese` / `Disconnection` / `Funktionsgruppen-Interkonversion` / `Fehling-Probe` / `Tollens-Probe`（建议加入 csv）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）或本项目已核文件确认 · `[据推断]` = 基于本项目推导或通用化学规则 · `[未获取到]` = 未找到，如实标注。
> ⛔ **本笔记不涉及**：盐类水解体系 · 杂化轨道 / 晶体四分类 / 电子排布式（《物质结构与性质》整册）· 配合物系统板块 · 中国 10 类官能团全表。
