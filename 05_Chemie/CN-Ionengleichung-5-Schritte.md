---
fach: Chemie
thema: "Ionengleichung in fuenf Schritten"
operatoren: [aufstellen, formulieren, untersuchen, begruenden, angeben]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Chemie, Ionenreaktionen]
stufe: "Q1"
kursart: "GK|LK"
---

# Ionengleichung in fünf Schritten (离子方程式五步法：写—拆—删—查—判)

> **中文理解**：Q-1 GK-04 要求掌握三类检出反应（Fällung / Farbreaktion / Gasentwicklung）与离子检出 [已验证]。德国**涉及离子反应但不系统训练书写流程**，学生在配平 `Redoxgleichungen` 时也缺「电荷守恒」的显式检验习惯 [据推断，Mapping CN-Methode 4]。本笔记把中国的「写—拆—删—查—判」五步法接进来，核心自检是**电荷守恒**。
>
> **Klausur-Relevanz**：GK-04 直接命中（离子检出与三类检出反应）；同时为 GK-08 氧化还原配平、LK-03 溶度积的沉淀判断提供**自检手段**。AFB I/II。
>
> ⚠️ **体裁提醒**：德国**不常用「离子方程式」这一体裁**。本五步法主要用于**分析反应本质**与**自检配平**；正式作答仍须写成德国习惯的**完整反应式**（含系数与状态符号）[据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Ionengleichung | 离子方程式 | net ionic equation | 只保留实际参加反应的离子的方程式 | 本笔记的主角 |
| Dissoziation | 电离 | dissociation | 电解质在水中解离为离子 | 「拆」的物理依据 |
| Ionenbindung / Ionengitter | 离子键 / 离子晶格 | ionic bond / lattice | 离子化合物由静电作用构成 | Q-1 GK-07，已教 |
| Fällungsreaktion | 沉淀反应 | precipitation | 生成难溶物（↓）的离子反应 | 三类检出之一 |
| Farbreaktion | 显色反应 | colour reaction | 生成特征颜色物质的离子反应 | 三类检出之一 |
| Gasentwicklung | 气体生成 | gas evolution | 生成气体（↑）的离子反应 | 三类检出之一 |
| Protolysereaktion | 质子传递反应 | protolysis | 酸碱间的质子转移 | GK-01，已教 |
| Zuschauerion (Spectator-Ion) | 旁观离子 | spectator ion | 两边都不变化、可删去的离子 | 「删」的对象 |
| Ladungsbilanz | 电荷守恒 | charge balance | **两边净电荷必须相等** | 最强自检 |
| Redoxreaktion | 氧化还原反应 | redox reaction | 电子转移反应 | 第⑤步的另一判据 |

---

## 2. 知识结构 (Struktur)

### 2.1 五步总览（本笔记的核心）

| 步 | 德语动作 | 中文 | 做什么 |
|---|---|---|---|
| ① | **Schreiben** | 写 | 先写出并**配平**完整的（分子）方程式 |
| ② | **Aufspalten** | 拆 | 强电解质拆成离子；**弱电解质 / 沉淀 / 气体 / 氧化物 / 水不拆** |
| ③ | **Streichen** | 删 | 删去两边都出现的**旁观离子** |
| ④ | **Prüfen** | 查 | **原子守恒 + 电荷守恒**双查 |
| ⑤ | **Beurteilen** | 判 | 是否符合**离子反应发生条件**（沉淀 / 气体 / 弱电解质 / 氧化还原） |

> *Klausur-Satz*: *Bei der Aufstellung einer Ionengleichung wird zunächst die vollständige Reaktionsgleichung formuliert und ausgeglichen, anschließend werden die starken Elektrolyte in Ionen zerlegt, die Zuschauerionen gestrichen und das Ergebnis über Atom- und Ladungsbilanz überprüft.*

### 2.2 第②步最关键：拆不拆判据表

| 物质类型 | 举例 | 拆？ | 理由 |
|---|---|---|---|
| 强酸 | HCl, HNO₃, H₂SO₄ | ✅ 拆 | 完全电离 |
| 强碱 | NaOH, KOH, Ba(OH)₂ | ✅ 拆 | 完全电离 |
| 可溶性盐 | NaCl, AgNO₃, CuSO₄ | ✅ 拆 | 完全电离 |
| **弱酸** | CH₃COOH, H₂CO₃, HF | ❌ **不拆** | 部分电离，以分子为主 |
| **弱碱** | NH₃（NH₃·H₂O） | ❌ **不拆** | 部分电离 |
| **水** | H₂O | ❌ **不拆** | 弱电解质 |
| **沉淀** | AgCl, BaSO₄, CaCO₃ | ❌ **不拆** | 难溶，以固体存在 |
| **气体** | CO₂, H₂, NH₃ | ❌ **不拆** | 以分子形式逸出 |
| **氧化物** | CuO, Fe₂O₃ | ❌ **不拆** | 非离子型存在 |

> ⚠️ **最高频错误**：把弱酸 / 沉淀 / 气体也拆开。判据只有一句——**看它在该条件下是否主要以离子形式存在** [据推断]。

> *Klausur-Satz*: *Starke Elektrolyte werden in ihre Ionen zerlegt, schwache Elektrolyte, schwerlösliche Salze, Gase, Oxide und Wasser dagegen nicht.*

### 2.3 第④步：电荷守恒自检（最强工具）

**规则**：离子方程式两边**净电荷必须相等**（原子守恒之外的第二查）。

验算示例：

| 离子方程式 | 左边净电荷 | 右边净电荷 | 通过？ |
|---|---|---|---|
| `Ag⁺ + Cl⁻ → AgCl` | `+1 − 1 = 0` | `0`（AgCl 中性） | ✅ |
| `Zn + Cu²⁺ → Zn²⁺ + Cu` | `0 + 2 = +2` | `+2 + 0 = +2` | ✅ |
| `CO₃²⁻ + 2 H₃O⁺ → CO₂↑ + 3 H₂O` | `−2 + 2 = 0` | `0` | ✅ |

> *Klausur-Satz*: *Eine Ionengleichung ist nur dann korrekt, wenn neben der Atombilanz auch die Ladungsbilanz stimmt, das heißt die Summe der Ladungen auf beiden Seiten gleich ist.*

### 2.4 第⑤步：离子反应发生条件（四判据）

一个离子反应能发生，必满足以下之一 [据推断，德国三类检出 + redox]：
1. 生成**沉淀**（Fällung）；
2. 生成**气体**（Gasentwicklung）；
3. 生成**弱电解质**（如水、弱酸、弱碱）；
4. 发生**氧化还原**（Redoxreaktion）。

> *Klausur-Satz*: *Eine Ionenreaktion läuft ab, wenn ein schwerlöslicher Stoff, ein Gas, ein schwacher Elektrolyt oder ein Redoxprodukt entsteht.*

### 2.5 三类检出反应的离子本质

| 类型 | 德语 | 离子本质 | 例 |
|---|---|---|---|
| 沉淀 | Fällung | 生成难溶盐 | `Ag⁺ + Cl⁻ → AgCl↓` |
| 显色 | Farbreaktion | 生成有色物种 | 铁离子与硫氰酸根的显色 |
| 气体 | Gasentwicklung | 生成挥发物 | `CO₃²⁻ + 2 H₃O⁺ → CO₂↑ + 3 H₂O` |

---

## 3. 解题方法 (Methoden)

### 3.1 五步法标准程序（`aufstellen` / `formulieren`）

1. **写并配平完整方程式**（分子式，系数最简）。—— *KLP 工具：GK-08 `Redoxreaktionen` / 配平*
2. **按 2.2 表拆分强电解质**（弱电解质 / 沉淀 / 气体 / 氧化物 / 水不拆）。—— *KLP 工具：Q-1 GK-07 `Ionenbindung`*
3. **删旁观离子**（两边都出现的、系数相同的离子）。—— *KLP 工具：无新工具，纯化简*
4. **双查**：原子守恒 + **电荷守恒**；不通过则回到第①步。—— *KLP 工具：物质守恒 + 电荷守恒*
5. **判发生条件**（2.4 四判据），并在答案中**点明生成物类型**。—— *KLP 工具：GK-04 三类 `Nachweisreaktionen`*

> **判据 / 决策点**：题目出现 `formulieren`（方程式）→ 走五步；题目出现 `begruenden`（为何发生）→ 必答第⑤步四判据之一；题目出现 `untersuchen`（实验）→ 结合现象 → 反推离子。

### 3.2 反向用法：由现象写离子方程式（`untersuchen`）

1. 读现象 → 判类型（沉淀 / 显色 / 气体）。
2. 反推涉及的离子（结合 5 类常见检出）。
3. 写出离子方程式并双查。

> **判据 / 决策点**：`Beobachtung`（现象）与 `Deutung`（解释）必须**分栏写**——这是德国化学失分点之一 [已验证，Lernbaum §0]。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 离子方程式「写—拆—删—查—判」五步法

- **技法内容**：① 写并配平完整方程式；② 拆强电解质（弱电解质 / 沉淀 / 气体 / 氧化物 / 水不拆）；③ 删旁观离子；④ **原子守恒 + 电荷守恒双查**；⑤ 判是否满足离子反应发生条件（沉淀 / 气体 / 弱电解质 / 氧化还原）。
- **DE-Anschluss**：`Ionenreaktionen`（Q-1 GK-04 三类检出反应与离子检出已教）· `Protolysereaktionen`（GK-01）· `Ionengitter / Ionenbindung`（GK-07，「拆」的物理依据）· `Redoxreaktionen`（GK-08）· `Nachweisreaktionen`（Fällung / Farbreaktion / Gasentwicklung，GK-04 明文三类，正对第⑤步）。
- **合规性**：✅ —— 五步用到的全部判据德国都已教；引入的是**书写与自检流程**，不是新知识。⚠️ 唯一提醒：德国不常用离子方程式体裁，正式作答仍须写完整反应式。
- **Abitur 应用**：GK-04 离子检出与三类检出反应（**直接命中**）· GK-01 质子传递书写 · GK-08 redox 配平自检 · LK-03 沉淀生成判断。AFB I/II。
- **来源**：`[CN-课标]` 必修2.3「通过实验事实认识离子反应及其发生的条件」+ 学业要求「能书写离子方程式」；`[CN-教材]` 拆删查记法；电荷守恒双查为 `[CN-高考]` 训练项（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（实验现象表/材料绑定）[已验证] |
| Operator | `aufstellen` / `formulieren` / `untersuchen` / `begruenden` |
| AFB | I（写方程式）→ II（由现象推离子并论证） |
| 建议分值 / 时长 | 单小题约 4–8 BE；常与离子检出实验题同卷 |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Zwei Lösungen werden zusammengegeben: Silbernitrat-Lösung und Natriumchlorid-Lösung. Es bildet sich ein weißer Niederschlag.
> **a)** Formulieren Sie die vollständige Reaktionsgleichung und anschließend die Ionengleichung.
> **b)** Weisen Sie die Korrektheit Ihrer Ionengleichung über die Ladungsbilanz nach.

**Aufgabe 2** `[原创]`
> Eine Natriumcarbonat-Lösung wird mit Salzsäure versetzt; es entsteht ein farbloses Gas, das Kalkwasser trübt.
> **a)** Formulieren Sie die Ionengleichung.
> **b)** Begründen Sie, warum Hydrogencarbonat-Ionen (HCO₃⁻) im Überschuss an Säure nicht als Endprodukt auftreten.

**Aufgabe 3** `[NRW-改编]`
> Essigsäure (CH₃COOH) wird mit Natronlauge (NaOH) neutralisiert.
> **a)** Formulieren Sie die Ionengleichung und begründen Sie, warum CH₃COOH **nicht** in Ionen zerlegt wird.
> **b)** Geben Sie an, welcher der vier Bedingungen (2.4) die Reaktion zugeordnet wird.

**Aufgabe 4** `[CN-改编]`
> Eine unbekannte Lösung enthält entweder Cl⁻ oder SO₄²⁻ oder CO₃²⁻. Zugabe von BaCl₂-Lösung ergibt einen weißen Niederschlag, der sich nach Zugabe von verdünnter Salzsäure vollständig auflöst und dabei ein Gas entwickelt.
> **a)** Bestimmen Sie das vorliegende Ion begründet.
> **b)** Formulieren Sie die zugehörige Ionengleichung für die Auflösung des Niederschlags und prüfen Sie die Ladungsbilanz.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) 完整式**：`AgNO₃ + NaCl → AgCl↓ + NaNO₃` ✓ 得分点（配平）
2. **a) 拆 + 删**：`Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ → AgCl↓ + Na⁺ + NO₃⁻`；删 `Na⁺`、`NO₃⁻` → **`Ag⁺ + Cl⁻ → AgCl↓`** ✓ 得分点
3. **b) 电荷守恒**：左 `+1 − 1 = 0`；右 `0` → 相等 ✓ 得分点（**必须写出两边的净电荷值**）

**Aufgabe 2**
1. **a)** `CO₃²⁻ + 2 H₃O⁺ → CO₂↑ + 3 H₂O` ✓ 得分点（CO₂ 不拆、水不拆）
2. **b)** 过量酸下 `HCO₃⁻` 会继续被质子化：`HCO₃⁻ + H₃O⁺ → CO₂↑ + 2 H₂O`，故终产物为 CO₂ 而非 HCO₃⁻ ✓ 得分点
3. **电荷守恒自检**：左 `−2 + 2 = 0`；右 `0` ✓

**Aufgabe 3**
1. **a)** `CH₃COOH + OH⁻ → CH₃COO⁻ + H₂O` ✓ 得分点
2. **a) 为何不拆 CH₃COOH**：醋酸是**弱电解质**，在水中只部分电离，主要以分子形式存在 → 不拆 ✓ 得分点（**须说「部分电离」，只说「弱酸」不够**）
3. **b)** 生成**弱电解质**（H₂O）→ 归入第 3 条判据 ✓ 得分点

**Aufgabe 4**
1. **a) 判定**：BaCl₂ 与 Cl⁻ 不生成沉淀；与 SO₄²⁻ 生成 **BaSO₄**（不溶于酸）；与 CO₃²⁻ 生成 **BaCO₃**（溶于酸并放气）。现象为「白色沉淀**溶于盐酸并放气**」→ 只能是 BaCO₃ → 原离子为 **CO₃²⁻** ✓ 得分点（**用「溶于酸 + 放气」排除 SO₄²⁻、用「生成沉淀」排除 Cl⁻**）
2. **b) 离子方程式**：`BaCO₃ + 2 H₃O⁺ → Ba²⁺ + CO₂↑ + 3 H₂O`；**电荷守恒**：左 `0 + 2 = +2`；右 `+2 + 0 = +2` ✓ 得分点（BaCO₃ 为固体不拆、CO₂ 为气体不拆、水不拆）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把弱酸 / 沉淀 / 气体 / 氧化物也拆成离子 | 背 2.2 判据表：只有强酸强碱可溶性盐拆 |
| 知识错 | **只查原子不查电荷**；把「离子方程式两边电荷不必相等」误记 | 双查固定动作：先原子、后电荷；电荷不等必回第①步 |
| 表达错 | 把「现象」直接写成「结论」（如直接写「有 Cl⁻」而不写「白色沉淀」） | 用 `Beobachtung / Deutung` 分栏：现象一栏、解释一栏 |
| 体裁错 | 在需要完整反应式的答案里只写离子式 | 分析用离子式，**作答写完整式**（德国习惯） |

---

## 7. Vernetzung

- **上游**：`Chemie-EF-Grundlagen-Training.md`（离子、配平、物质的量）· `Saeure-Base-Gleichgewichte-pH-Wert.md`（质子传递）
- **下游**：`CN-Chemie-Tricks.md`（守恒法，**本笔记为其深化子卡**）· `Elektrochemie-Vier-Elemente-Raster.md`（半反应配平）· LK 增量（溶度积 K_L 的沉淀判断）
- **横向**：`02_Physik` 电荷守恒（宏观守恒律类比）
- **术语卡**：`Ionengleichung` / `Zuschauerion` / `Ladungsbilanz` / `Faellungsreaktion` / `Gasentwicklung`（建议加入 csv）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）或本项目已核文件确认 · `[据推断]` = 基于本项目推导或通用化学规则 · `[未获取到]` = 未找到，如实标注。
> ⛔ **本笔记不涉及**：盐类水解体系（KLP 全文无 `Hydrolyse`）· 杂化轨道 / 晶体四分类 / 电子排布式 · 配合物系统板块。
