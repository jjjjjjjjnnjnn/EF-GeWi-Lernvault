---
fach: Chemie
thema: "Stoßtheorie und mittlere Reaktionsgeschwindigkeit"
operatoren: [beschreiben, erklaeren, auswerten, ermitteln, begruenden]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Chemie, Kinetik]
stufe: "EF"
---

# Stoßtheorie und mittlere Reaktionsgeschwindigkeit (碰撞理论与平均反应速率)

> **中文理解**：EF-2 `Reaktionsgeschwindigkeit und chemisches Gleichgewicht` 的第一块是**动力学**。KLP 明文要求两条：① **定义平均速率并从实验数据作图求取**；② **用碰撞理论（`Stoßtheorie`）在分子层面表现反应进程**（含数字工具）[已验证，`Chemie-Oberstufe.md` §EF-2 能力要点 (E)]。碰撞理论回答的是「**为什么**温度/浓度/表面/压力会影响速率」——它把宏观速率与**分子层面的碰撞**连起来。
> **⚠️ EF 边界（重要）**：德国 EF **只列 `Katalyse` 条目**，**不引入「反应历程 / 基元反应」**这一知识块 [已验证，Mapping EF-13 判为 `CN-only`]。因此本笔记**只用「催化剂降低所需能量」这一句**，**不得**展开基元反应或反应历程。
>
> **Klausur-Relevanz**：速率影响因素是 EF-2 的第一考点（常与实验数据/图像绑定出 `auswerten` / `ermitteln` 题）；平均速率作图是 `Darstellungsaufgaben`（图⇄表互转）的典型载体。属 AFB I–II。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Reaktionsgeschwindigkeit `v` | 反应速率 | reaction rate | 单位时间浓度变化 | 正值 |
| mittlere Reaktionsgeschwindigkeit | 平均反应速率 | average reaction rate | `v̄ = Δc / Δt` | EF 明文 [已验证] |
| Stoffmengenkonzentration `c` | 物质的量浓度 | concentration | mol/L | EF 已教 |
| Stoßtheorie | 碰撞理论 | collision theory | 用粒子碰撞解释反应 | EF 明文 [已验证] |
| Zusammenstoß | 碰撞 | collision | 粒子相遇 | 前提 |
| wirksamer Stoß | 有效碰撞 | effective collision | 能量足够 + 取向合适 | 核心判据 |
| Orientierung | 取向 | orientation | 碰撞时的空间方位 | 有效碰撞条件之一 |
| Mindestenergie / Aktivierungsenergie | 最低/活化能 | activation energy | 反应所需的最低能量 | ⚠️ EF 只作「所需能量」用 |
| Katalysator | 催化剂 | catalyst | 降低所需能量、自身不变 | EF 明文条目 [已验证] |
| Einflussfaktoren | 影响因素 | influencing factors | 表面 / 浓度 / 温度 / 压力 | EF 明文 [已验证] |
| Reaktionszeitverlauf | 反应时间进程 | time course | c 随 t 的变化 | 作图对象 |
| Anfangsgeschwindigkeit | 初始速率 | initial rate | t→0 处的速率 | 曲线初始斜率 |

---

## 2. 知识结构 (Struktur)

### 2.1 平均速率的定义与作图求取

反应速率 = **单位时间内反应物浓度减少（或产物浓度增加）** [据推断，速率定义]：

```
v̄ = Δc / Δt = (c₂ − c₁) / (t₂ − t₁)        （单位 mol/(L·s)）
```

**作图求取**（KLP 明文要求）：把实验测得的 `c ~ t` 数据描点连线，则**某区间内的平均速率 = 该区间的割线斜率** [据推断]。

> ⚠️ 曲线**初始最陡**（初始速率最大），随时间**变缓**——因为反应物被消耗、浓度下降。这是 EF 图像题的固定结论。

> *Klausur-Satz*: *Die mittlere Reaktionsgeschwindigkeit ist der Quotient aus der Konzentrationsänderung und der zugehörigen Zeitspanne: v̄ = Δc/Δt. Trägt man die Konzentration gegen die Zeit auf, so entspricht sie der Steigung der Sekante im betrachteten Intervall; die Anfangsgeschwindigkeit ist am größten.*

### 2.2 碰撞理论：反应发生的两个条件

反应发生的前提是粒子**相互碰撞**；但**并非每次碰撞都有效**——只有 `wirksame Stöße`（有效碰撞）才引发反应，须同时满足 [据推断，碰撞理论]：

1. **能量足够**：碰撞能量 ≥ 所需最低能量（`Mindestenergie`）。
2. **取向合适**：粒子以合适方位相撞。

> ⚠️ 表述红线：EF **不说「基元反应 / 反应历程」**；只描述「碰撞是否有效」这一**模型层面**的图像。

> *Klausur-Satz*: *Nach der Stoßtheorie reagieren Teilchen nur dann, wenn sie zusammenstoßen und der Stoß wirksam ist. Ein Stoß ist wirksam, wenn die Teilchen mit ausreichender Energie und in geeigneter Orientierung aufeinandertreffen.*

### 2.3 四类影响因素（EF 明文）与碰撞理论的解释

| 因素 | 德语 | 对速率的影响 | 碰撞理论解释 |
|---|---|---|---|
| **表面** | `Oberfläche` | 接触面越大越快 | 接触粒子数增多 → 有效碰撞频率升高 |
| **浓度** | `Konzentration` | 浓度越大越快 | 单位体积粒子数增多 → 碰撞频率升高 |
| **温度** | `Temperatur` | 温度越高越快 | 平均动能升高 → **能量足够的碰撞比例大幅升高** |
| **压力** | `Druck` | （气体）压力越大越快 | 粒子被压缩 → 浓度升高 → 碰撞频率升高 |

> 🎯 关键：**温度的影响最剧烈**——它不只增加碰撞次数，更**显著提高「能量足够」的碰撞比例**（这是与浓度/压力不同的地方）。

> *Klausur-Satz*: *Eine Vergrößerung der Oberfläche, der Konzentration oder des Drucks erhöht die Zahl der Zusammenstöße. Eine Temperaturerhöhung erhöht zusätzlich den Anteil energiereicher, wirksamer Stöße und beschleunigt die Reaktion daher besonders stark.*

### 2.4 催化剂（EF 只到「降低所需能量」）

`Katalysator` 参与反应但**反应前后自身不变**；它**降低反应所需的最低能量** → 更多碰撞变为有效 → 速率升高 [据推断；⚠️ EF 只允许此一句表述]。

> ⚠️ 不得写「改变反应历程 / 生成中间产物」等中国「反应历程」语言 [已验证，Mapping EF-13]。

> *Klausur-Satz*: *Ein Katalysator setzt die für eine Reaktion erforderliche Mindestenergie herab. Dadurch werden mehr Zusammenstöße wirksam und die Reaktionsgeschwindigkeit steigt; der Katalysator selbst wird dabei nicht verbraucht.*

### 2.5 数据来源与作图（表征互转）

实验常测的不是浓度而是**可间接换算的量** [据推断]：

- 气体体积（气体生成）→ 由 `n = V/V_m` 或 `c = n/V` 换算浓度；
- 质量损失（逸出气体）→ 换算；
- 压力变化（气体分子数变化）；
- 颜色/吸光度变化（滴定或比色）。

→ 把测得的量**换算成 `c`**，再作 `c ~ t` 图，读割线斜率。

> *Klausur-Satz*: *Experimentell wird häufig eine leicht messbare Größe wie das entstehende Gasvolumen erfasst. Aus diesen Daten wird die Konzentration berechnet und gegen die Zeit aufgetragen, um die Reaktionsgeschwindigkeit als Steigung zu ermitteln.*

---

## 3. 解题方法 (Methoden)

### 3.1 平均速率求取标准程序（`ermitteln` / `auswerten`）

1. **读两点**：在数据表或图像上取区间两端 `(t₁, c₁)`、`(t₂, c₂)`。—— *KLP 工具：`Reaktionszeitverlauf`*
2. **算差值**：`Δc = c₂ − c₁`，`Δt = t₂ − t₁`（**取绝对值**，速率取正）。—— *KLP 工具：`mittlere Reaktionsgeschwindigkeit`*
3. **算速率**：`v̄ = Δc / Δt`，**带单位 mol/(L·s)**。—— *KLP 工具：定义式*
4. **量级检验**：速率应为正且量级合理（常 10⁻³–10⁻⁶ mol/(L·s)）。—— *KLP 工具：`Größenordnungsprüfung`*

> **判据 / 决策点**：题干问「**初始速率**」→ 取 **t=0 附近最短区间**或**曲线在 t=0 的切线斜率**；问「**某区间平均速率**」→ 取该区间**割线**。

### 3.2 碰撞理论解释题标准程序（`erklaeren` / `begruenden`）

1. **点前提**：反应需要粒子碰撞。—— *KLP 工具：`Stoßtheorie`*
2. **点条件**：只有**有效碰撞**（能量足够 + 取向合适）才反应。—— *KLP 工具：`wirksamer Stoß`*
3. **连因素**：说明该因素如何改变**碰撞频率**或**有效碰撞比例**。—— *KLP 工具：四类影响因素*
4. **下结论**：速率随之升高/降低。—— *KLP 工具：`begruenden`*

> **判据 / 决策点**：问**温度** → 必须点「**能量足够的碰撞比例升高**」（不能只说「碰撞变多」）；问**浓度/压力** → 点「**碰撞频率升高**」；问**表面** → 点「**接触粒子数增多**」。

### 3.3 实验设计程序（`planen`，变量控制）

1. **定变量**：只改变**一个**因素，其余**全部恒定**（变量控制）。—— *KLP 工具：`planen` + 变量控制*
2. **定测量量**：选易测的量（如气体体积）并定时记录。—— *KLP 工具：`untersuchen`*
3. **定换算**：把测量量换算为 `c`。—— *KLP 工具：物质的量换算*
4. **定作图**：作 `c ~ t` 图，比较初始斜率。—— *KLP 工具：`Darstellungsaufgabe`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 「变量控制法」+ 平均速率作图（**方法层直接可用**）

- **技法内容**：中国侧提供两条**方法**——① **变量控制法**（`Variable-Kontrolle`）：探究某因素影响时**只改变一个变量、其余恒定**，这是中国课标的**明示条目** [已验证，Mapping EF-08 判为 `both-cn-deeper`]；② **平均速率的图表求取**（由数据作图、读斜率），中国训练密度与德国相当（`both-equal`）[已验证，Mapping EF-09]。
- **DE-Anschluss**：`Reaktionsgeschwindigkeit` 与 `mittlere Reaktionsgeschwindigkeit`（**EF-2 明文**）· `Stoßtheorie`（EF 明文）· 四类影响因素（**EF 明文 `Oberfläche / Konzentration / Temperatur / Druck`**）· `Katalyse`（EF 明文条目）· 物质的量换算（SI 巩固层）。**变量控制用到的工具德国全部已教**。
- **合规性**：✅ **方法层合规** —— 变量控制是**实验方法论**，不是知识块，德国 EF 在实验探究中**隐含**该要求。⚠️ 硬边界：**严禁**引入中国的「**反应历程 / 基元反应 / 活化能定量**」知识块（属 `CN-only`，Mapping EF-13）——德国 EF 只允许「催化剂降低所需能量」这一句表述。
- **Abitur 应用**：EF-2 速率影响因素题（`auswerten` / `planen`）直接命中；`fachpraktische Aufgabe` 的实验设计题受益明显。AFB II（实验设计）/I–II（速率计算）。
- **来源**：`[CN-课标]` 必修3.3「影响反应速率的因素（实验探究）」+ **变量控制方法**（课标明示）；`[CN-高考]` 速率图像题与实验设计套路（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（绑定实验数据 / 图像）；可为 Aufgabenart II `Fachpraktische Aufgabe`（学生操作）[已验证] |
| Operator | `auswerten` / `ermitteln` / `erklaeren` / `begruenden` / `planen` |
| AFB | I（读数据）→ II（碰撞理论解释、实验设计） |
| 建议分值 / 时长 | 单小题约 4–7 BE；EF 阶段常与 MWG 合并成一道动力学-平衡题 |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Bei der Reaktion von Magnesium mit Salzsäure wird die entstehende Gasmenge gemessen. Die Konzentration des Magnesiums (in mol/L) beträgt nach 10 s noch 0,60 mol/L, nach 30 s noch 0,20 mol/L.
> **a)** Berechnen Sie die mittlere Reaktionsgeschwindigkeit im Intervall von 10 s bis 30 s.
> **b)** Geben Sie die Einheit an und prüfen Sie die Größenordnung des Ergebnisses.

**Aufgabe 2** `[NRW-改编]`
> Zwei Ansätze werden verglichen: Ansatz A mit Magnesiumpulver, Ansatz B mit einem gleich schweren Magnesiumstück, sonst gleiche Bedingungen.
> **a)** Erklären Sie mithilfe der Stoßtheorie, welcher Ansatz schneller reagiert.
> **b)** Geben Sie an, welcher Einflussfaktor hier variiert wird.

**Aufgabe 3** `[原创]`
> Eine Reaktion wird bei 20 °C und bei 40 °C durchgeführt; die Konzentrationen der Edukte sind identisch.
> **a)** Begründen Sie mithilfe der Stoßtheorie, warum die Reaktion bei 40 °C deutlich schneller abläuft.
> **b)** Erklären Sie, warum der Temperatureinfluss stärker ist als eine vergleichbare Erhöhung der Konzentration.

**Aufgabe 4** `[NRW-改编]`
> In einem Versuch soll der Einfluss der Konzentration auf die Reaktionsgeschwindigkeit untersucht werden.
> **a)** Planen Sie ein geeignetes Experiment und beschreiben Sie, welche Größen konstant gehalten werden müssen.
> **b)** Erläutern Sie, wie aus den Messdaten die Reaktionsgeschwindigkeit ermittelt wird.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a)** `Δc = 0,60 − 0,20 = 0,40 mol/L` ✓ 得分点
2. `Δt = 30 − 10 = 20 s` ✓ 得分点
3. `v̄ = 0,40 / 20 = 0,020 mol/(L·s)` ✓ 得分点（**取正、带单位**）
4. **b)** 单位 `mol/(L·s)` ✓；量级检验：约 10⁻² mol/(L·s)，对活泼金属与酸反应合理 ✓ 得分点

**Aufgabe 2**
1. **a)** 粉末**表面更大** → 与酸接触的粒子更多 → 单位时间**碰撞频率更高** → 有效碰撞更多 → 反应更快 → **A 更快** ✓ 得分点
2. **b)** 变量 = `Oberfläche`（表面）✓ 得分点

**Aufgabe 3**
1. **a)** 温度升高 → 粒子**平均动能升高** → 能量达到所需最低值的粒子**比例大幅升高** → **有效碰撞比例升高** → 速率显著加快 ✓ 得分点（**必须点「有效碰撞比例」**）
2. **b)** 浓度升高只增加**碰撞频率**（线性）；温度升高使**能量足够的碰撞比例**大幅增加（指数性）→ 故温度影响更强 ✓ 得分点

**Aufgabe 4**
1. **a)** 只改变**浓度**，其余**恒定**（温度、压力、表面积、体积、催化剂）→ **变量控制** ✓ 得分点
2. 测量量：如定时测**气体体积**（或质量损失）✓
3. **b)** 把测量量换算为浓度 `c` → 作 `c ~ t` 图 → 取**割线斜率** `Δc/Δt` 得平均速率；取**初始段**得初始速率 ✓ 得分点（**须写「作图取斜率」**）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「碰撞次数」与「有效碰撞比例」混用；温度题只说「碰撞变多」 | 温度必须点**能量足够的碰撞比例升高**；浓度/压力才点「碰撞频率」 |
| 知识错 | 速率算成负值；单位写成 mol/L；初始速率与平均速率混用 | 速率**取正**、单位 `mol/(L·s)`；初始速率取 t=0 切线 |
| 表达错 | 解释题不点「有效碰撞」（能量 + 取向）就下结论 | 固定三段：**碰撞 → 有效碰撞（能量/取向）→ 速率变化** |
| 越界错 | 引入「基元反应 / 反应历程 / 活化能定量」（属 `CN-only`） | EF 只用「催化剂降低所需能量」一句；不展开历程 |

---

## 7. Vernetzung

- **上游**：`Chemie-EF-Grundlagen-Training.md`（物质的量与浓度换算）· EF `Reaktionskinetik`（Schwerpunkt 1）
- **下游**：`MWG-Quantitative-Berechnungen-EF2.md`（由速率进入平衡与 MWG）· `Kinetik-Gleichgewicht-Bio-Vernetzung.md`（动力学-平衡总览与酶催化）· Q-2 `heterogene Katalyse`
- **横向**：`03_Mathe` 斜率与割线（图像读速率）；`02_Physik` 分子运动论（动能与温度）
- **术语卡**：`Reaktionsgeschwindigkeit` / `Stoßtheorie` / `wirksamer Stoß` / `Katalysator` / `Oberfläche` / `Konzentration`（建议加入 csv，DE-CN-EN 三列）
- **Basiskonzept**：`Chemische Reaktion` ✅（速率与碰撞）+ `Energie` ✅（催化剂作用机制，KLP 明示 EF-2 的 Energie 落点）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）或本项目已核文件确认 · `[据推断]` = 基于动力学通用原理或本项目推导 · `[未获取到]` = 未找到，如实标注。
> ⛔ **本笔记不涉及**：盐类水解体系 · 杂化轨道 / 晶体四分类 / 电子排布式 · 配合物系统板块 · **反应历程 / 基元反应**（属 `CN-only`，EF 不引入）。
