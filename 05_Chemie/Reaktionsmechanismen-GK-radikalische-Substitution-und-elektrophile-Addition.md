---
fach: Chemie
thema: "GK-Mechanismen: radikalische Substitution und elektrophile Addition"
operatoren: [darstellen, beschreiben, erklaeren, aufstellen, begruenden]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Chemie, Reaktionsmechanismen]
stufe: "Q2"
kursart: "GK"
---

# GK-Reaktionsmechanismen: radikalische Substitution und elektrophile Addition (GK 两条机理)

> **中文理解**：Q-3 GK **直接要求两条机理**（Radikalische Substitution / Elektrophile Addition），并要求用**弯箭头表示电子走向** [已验证，KLP Q-3 GK Schwerpunkt 7]。中国只讲「反应类型」（取代 / 加成），**不讲机理** → 这是中国学生最明确的缺口 [据推断，Mapping GK-16]。本笔记承接 `Reaktionsmechanismen-Uebergang-Elektronenpaar-Formalladung.md` 的过渡层语言。
>
> **Klausur-Relevanz**：GK-16 是 Q-3 的**必考机理**（AFB II，须写出各步并标电子走向）。LK 在此之上再加 S_N1/S_N2、芳香亲电取代（LK 独有）。AFB II→III。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Reaktionsmechanismus | 反应机理 | reaction mechanism | 从反应物到产物的**分步**电子过程 | 与「反应类型」不同 |
| homolytische Spaltung | 均裂 | homolytic cleavage | 共价键**平均**断裂，各得 1 个电子 | 生成自由基 |
| heterolytische Spaltung | 异裂 | heterolytic cleavage | 共价键**不均**断裂，电子对归一侧 | 生成离子 |
| Radikal | 自由基 | radical | 带**单电子**的物种（记作 ·） | 活性高、寿命短 |
| Kettenreaktion | 链式反应 | chain reaction | Start → Fortpflanzung → Abbruch | 自由基取代的核心 |
| Kettenstart / -fortpflanzung / -abbruch | 链引发 / 链增长 / 链终止 | initiation / propagation / termination | 三阶段 | 必须分三步写 |
| Elektrophil | 亲电体 | electrophile | 缺电子、爱电子的物种 | 进攻 π 键 |
| Carbokation (Carbeniumion) | 碳正离子 | carbocation | 带正电的碳中间体 | 加成机理的关键中间体 |
| Nucleophil | 亲核体 | nucleophile | 富电子、爱正电的物种 | 进攻碳正离子 |
| Markovnikov-Regel | 马氏规则 | Markovnikov's rule | H 加到含 H 较多的碳上 | ⚠️ 考机理不考口诀 |
| Elektronenpaarverschiebung | 电子对移动 | electron pair shift | 弯箭头：从电子富处指向缺处 | 机理图的必备符号 |
| π-Bindung | π 键 | pi bond | 双键中的侧向键，电子富集 | 亲电加成的进攻位点 |

---

## 2. 知识结构 (Struktur)

### 2.1 机理 ≠ 反应类型（先立这句）

「取代」「加成」只是**产物层面的分类**；机理是**电子层面的分步过程**。德国 GK 考的是后者 [已验证]。写作时必须给出：**每一步断/成哪根键、电子怎么走、中间体是什么**。

> *Klausur-Satz*: *Ein Reaktionsmechanismus beschreibt den Reaktionsverlauf schrittweise auf der Ebene der Elektronen; die bloße Angabe des Reaktionstyps (Substitution, Addition) genügt nicht.*

### 2.2 机理一：Radikalische Substitution（以 CH₄ + Cl₂ 为例）

**总反应**：`CH₄ + Cl₂ →(hν) CH₃Cl + HCl`

**① Kettenstart（链引发）**：`Cl₂ →(UV-Licht, hν) 2 Cl·`
- 键**均裂**，各得 1 个电子 → 两个氯自由基。

**② Kettenfortpflanzung（链增长，两步循环）**：
- `Cl· + CH₄ → CH₃· + HCl`（Cl· 夺走一个 H，生成甲基自由基）
- `CH₃· + Cl₂ → CH₃Cl + Cl·`（甲基自由基夺 Cl，**再生 Cl·** → 链可延续）

**③ Kettenabbruch（链终止，自由基相消）**：
- `Cl· + Cl· → Cl₂`
- `CH₃· + Cl· → CH₃Cl`
- `CH₃· + CH₃· → C₂H₆`

> *Klausur-Satz*: *Die radikalische Substitution verläuft als Kettenreaktion: Im Kettenstart wird das Halogenmolekül durch UV-Licht homolytisch in Radikale gespalten, in der Kettenfortpflanzung werden nacheinander ein Wasserstoffatom und ein Halogenatom übertragen, und im Kettenabbruch rekombinieren zwei Radikale.*

**三条判据**：
- 必须有**光照（UV）** 或高温 → 提供均裂能量；
- 生成的是**混合物**（一氯/二氯/三氯…）→ 因为 CH₃Cl 还可继续被取代；
- **单电子**必须标出（`·`）。

### 2.3 机理二：Elektrophile Addition（以 Ethen + HBr 为例）

**总反应**：`CH₂=CH₂ + HBr → CH₃–CH₂Br`

**① 进攻与极化（heterolytisch）**：
- H–Br 键本身已极性化（H δ⁺）；π 键电子富集，进攻 H δ⁺。
- π 电子对形成新的 C–H σ 键，**电子对整体移到 Br 上** → `Br⁻` 生成，另一碳变成**碳正离子**。

**② 亲核进攻**：
- `Br⁻`（Nucleophil）进攻碳正离子 → 形成 C–Br 键。

> *Klausur-Satz*: *Bei der elektrophilen Addition greift das π-Elektronenpaar des Alkens das positiv polarisierte Wasserstoffatom des HBr an; dabei entsteht ein Carbokation, an das anschließend das Bromid-Ion nucleophil addiert.*

**区域选择性（Markovnikov，机理版）**：
- H 加到**含 H 较多的碳**上，因为这样生成的是**更稳定的碳正离子**（烷基越多越稳定，+I 效应分散正电荷）。
- 碳正离子稳定性：**tertiär > sekundär > primär**。

> ⚠️ 德国考的是**碳正离子稳定性依据**，只写「马氏规则」口诀不给分 [已验证，Lernbaum 节点 Fehlerquelle]。

### 2.4 两条机理的对照（对比辨别）

| 维度 | Radikalische Substitution | Elektrophile Addition |
|---|---|---|
| 底物 | 饱和烃（Alkan） | 不饱和烃（Alken） |
| 进攻方 | 自由基（单电子） | 亲电体（缺电子） |
| 断键方式 | **均裂** | **异裂** |
| 中间体 | **Radikal** | **Carbokation** |
| 条件 | UV / 高温 | 常温即可 |
| 产物特点 | 混合物（多取代） | 主要单一产物（区域选择性） |

> *Klausur-Satz*: *Die radikalische Substitution verläuft über homolytische Spaltung und Radikale, die elektrophile Addition über heterolytische Spaltung und ein Carbokation.*

### 2.5 烯烃检出的接口

`CH₂=CH₂` 使**溴水褪色**（Br₂ 加成）→ C=C 的经典检出 [据推断，德国教材标配]。这是机理与检出反应的交汇点。

---

## 3. 解题方法 (Methoden)

### 3.1 机理书写五步（`darstellen` / `aufstellen` 标准程序）

1. **判底物类型**：饱和（→ 自由基取代）还是不饱和（→ 亲电加成）。—— *KLP 工具：Q-3 GK-14 `Alkene / Halogenalkane`*
2. **标键极性 / 电子富集处**（π 键、δ⁺ 碳）。—— *KLP 工具：过渡层笔记的极性语言*
3. **写第一步断键**：均裂（radikalisch）还是异裂（elektrophil）。—— *KLP 工具：Q-3 GK-16*
4. **标中间体**（Radikal 单电子 / Carbokation 正电荷）与**弯箭头**。—— *KLP 工具：`Elektronenpaarverschiebung`*
5. **写后续步并收尾**（链终止 / 亲核加成），核对原子守恒。—— *KLP 工具：配平*

> **判据 / 决策点**：题目出现「为什么主要生成某产物」→ 必须用**中间体稳定性**（Radikal / Carbokation）论证；出现「为什么需要 UV」→ 答「提供均裂所需能量」。

### 3.2 区域选择性三步（`begruenden`）

1. 写出两种可能的碳正离子。
2. 比较烷基数目（tertiär > sekundär > primär）。
3. 选更稳定者 → 对应 H 的落位（马氏产物）。

> **判据 / 决策点**：口诀只是**结论**；答案必须给**稳定性依据**。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 由「反应类型」升级到「电子推演」（过渡层语言）

- **技法内容**：中国只讲取代/加成的**产物分类**，本笔记把中国的「反应类型」框架**升级**为德国的「电子推演」：先判底物（饱和/不饱和）→ 再判断键方式（均裂/异裂）→ 再标中间体与电子对移动。中国侧贡献的是「**先分类再深入**」的解题顺序。
- **DE-Anschluss**：Q-3 GK Schwerpunkt 7 `Reaktionsmechanismen: Radikalische Substitution, elektrophile Addition`（**德国明文要求，非中国带来**）· Q-3 GK-14 `Alkene, Halogenalkane` · Q-3 Schwerpunkt 5 `inter- und intramolekulare Wechselwirkungen` · EF-1 的取代/加成/消去**反应类型**。
- **合规性**：✅ —— ⚠️ **注意方向**：机理要求**来自德国 GK**，中国侧提供的是「先判类型再写机理」的组织顺序。⚠️ **不得引入**中国教材的「反应历程 / 基元反应活化能」知识块（德国 EF/GK 未教）[据推断]。
- **Abitur 应用**：GK-16 直接命中；LK-11（S_N1/S_N2）、LK-12（芳香亲电取代）在其上加深；LK-19「从分子结构推演反应行为」。AFB II/III。
- **来源**：`[CN-教材]` 反应类型分类（方法层）；`[CN-高考]` 加成产物判断（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（结构式/机理图绑定）[已验证] |
| Operator | `darstellen` / `aufstellen` / `beschreiben` / `begruenden` / `erklaeren` |
| AFB | II（写机理）→ III（由结构推演产物并论证） |
| 建议分值 / 时长 | 单题约 8–14 BE；机理题常为 Q-3 大题主体 |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Methan reagiert mit Chlor unter UV-Licht.
> **a)** Stellen Sie den vollständigen Reaktionsmechanismus in den drei Schritten Kettenstart, Kettenfortpflanzung und Kettenabbruch dar.
> **b)** Begründen Sie, warum die Reaktion Licht benötigt.

**Aufgabe 2** `[原创]`
> Bei der Chlorierung von Methan entsteht nicht nur CH₃Cl, sondern auch ein Gemisch aus CH₂Cl₂, CHCl₃ und CCl₄.
> **a)** Erklären Sie diesen Befund mithilfe des Mechanismus.
> **b)** Geben Sie eine Reaktionsgleichung für die Bildung von CH₂Cl₂ aus CH₃Cl an.

**Aufgabe 3** `[NRW-改编]`
> Propen (CH₃–CH=CH₂) reagiert mit Bromwasserstoff (HBr).
> **a)** Stellen Sie den Mechanismus der elektrophilen Addition dar und kennzeichnen Sie das Carbokation.
> **b)** Begründen Sie mithilfe der Carbokation-Stabilität, welches Produkt überwiegend entsteht.

**Aufgabe 4** `[CN-改编]`
> Ethen (CH₂=CH₂) wird in Bromwasser eingeleitet; die orangebraune Farbe verschwindet.
> **a)** Formulieren Sie die Reaktionsgleichung der ablaufenden Addition.
> **b)** Ordnen Sie die Reaktion dem Reaktionstyp und dem Mechanismus zu und begründen Sie, warum kein UV-Licht erforderlich ist.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Kettenstart**：`Cl₂ →(hν) 2 Cl·` ✓ 得分点（**标单电子 ·，说明均裂**）
2. **Kettenfortpflanzung**：`Cl· + CH₄ → CH₃· + HCl`；`CH₃· + Cl₂ → CH₃Cl + Cl·` ✓ 得分点（**两步、Cl· 再生**）
3. **Kettenabbruch**（任写两条）：`Cl· + Cl· → Cl₂`；`CH₃· + Cl· → CH₃Cl` ✓ 得分点
4. **b)** 光提供能量使 Cl–Cl 键**均裂**成自由基；无光则无法引发链反应 ✓ 得分点

**Aufgabe 2**
1. **a)** 生成的 CH₃Cl 仍含 C–H 键，可**继续被 Cl· 取代** → 依次得到 CH₂Cl₂、CHCl₃、CCl₄ → 产物为混合物 ✓ 得分点
2. **b)** `CH₃Cl + Cl₂ →(hν) CH₂Cl₂ + HCl` ✓ 得分点（配平 + 条件）

**Aufgabe 3**
1. **a)** 第一步：π 键进攻 H δ⁺ → 生成碳正离子 `CH₃–C⁺H–CH₃`（sec.）或 `CH₃–CH₂–C⁺H₂`（prim.）；第二步：`Br⁻` 进攻碳正离子 ✓ 得分点（**标出中间体正电荷**）
2. **b)** **sekundäres Carbokation**（两个烷基）比 **primäres**（一个烷基）更稳定（+I 效应分散正电荷）→ 主要生成 **2-Brompropan** ✓ 得分点（**必须写稳定性依据，不能只写马氏规则**）

**Aufgabe 4**
1. **a)** `CH₂=CH₂ + Br₂ → CH₂Br–CH₂Br` ✓ 得分点
2. **b)** 类型：**Addition**；机理：**elektrophile Addition**；不需要 UV，因为 π 键电子富集，可直接进攻极化的 Br–Br，经**异裂**生成碳正离子/溴离子，常温即可 ✓ 得分点（**对照自由基取代需要光**）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把机理写成反应类型（「这是取代反应」）；把自由基取代与亲电加成混淆 | 先判底物：饱和 → 自由基取代；不饱和 → 亲电加成 |
| 知识错 | 自由基不标单电子（·）；链终止步漏写；碳正离子不标正电荷 | 三阶段齐全；所有中间体必须标电荷/单电子 |
| 表达错 | 只背「马氏规则」口诀不给碳正离子稳定性依据；弯箭头方向画反 | 弯箭头从**电子富处**指向**电子缺处**；产物论证回扣中间体稳定性 |
| 越界错 | 引入「反应历程 / 基元反应」等中国知识块 | 只写德国 GK 要求的两条机理 |

---

## 7. Vernetzung

- **上游**：`Reaktionsmechanismen-Uebergang-Elektronenpaar-Formalladung.md`（电子式 / 极化 / 亲电亲核语言，**必读前置**）· `EF1-Auffuellung-Funktionsgruppen-Nachweis-Oxidation-Ester.md`（反应类型与酯化）
- **下游**：`Organische-Struktur-und-Retrosynthese.md`（机理给「切哪里」提供依据）· LK 增量（S_N1/S_N2、芳香亲电取代、Mesomerie）
- **横向**：`02_Physik` 能量与光（UV 引发均裂）
- **术语卡**：`Radikal` / `homolytische Spaltung` / `Kettenreaktion` / `elektrophile Addition` / `Carbokation` / `Markovnikov-Regel`（建议加入 csv）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）或本项目已核文件确认 · `[据推断]` = 基于本项目推导或通用化学规则 · `[未获取到]` = 未找到，如实标注。
> ⛔ **本笔记不涉及**：盐类水解体系 · 杂化轨道 / 晶体四分类 / 电子排布式 · 配合物系统板块 · S_N1/S_N2 与芳香亲电取代（属 LK 增量）。
