---
fach: Chemie
thema: "Q1 LK Puffer Titrationskurve K_L Entropie"
operatoren: [berechnen, herleiten, erklaeren, skizzieren, beurteilen, bewerten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Chemie, Saeure-Base]
stufe: "Q1"
kursart: "LK"
---

# Q1 LK: Puffer · Titrationskurve · K_L · Entropie [LK] (缓冲 · 滴定曲线 · 溶度积 · 熵)

> **中文理解**：本笔记覆盖 Q-1 的**四块 LK 专属增量**——`Puffersysteme` + Henderson-Hasselbalch、`Titrationskurve` 三特征点、`Löslichkeitsgleichgewichte`（`K_L`）、`Entropie`（自发吸热溶解）。这四项在 **GK 章节中完全不存在** [已验证，KLP GK/LK 对比]。全部建立在 `MWG → K_S` 推导链上（见 `MWG-zu-KS-Ableitungskette.md`）。
>
> **Klausur-Relevanz**：**GK/LK 最硬的分界线之一**。LK 明文要求「预测强/弱酸碱滴定曲线并算出三特征点」、用熵变解释自发吸热溶解——中国学生的抓手不足，须专项训练。
>
> ⛔ **明确不做（禁入判据）**：**盐类水解体系（Salzhydrolyse）**。KLP 全文无 `Hydrolyse`；**质子守恒（Protonenbilanz）** KLP 未出现且依赖水解概念。看到「醋酸钠」时，德国解法是「Ac⁻/HAc 构成缓冲对，直接用 Henderson-Hasselbalch」，**不经过水解**。紧邻 LK 缓冲是最危险的越界诱惑，违反铁律 1（只引方法，不引知识块）。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Puffersystem | 缓冲体系 | buffer system | 弱酸 + 其共轭碱构成缓冲对 | GK 无 |
| Henderson-Hasselbalch-Gleichung | 亨德森-哈塞尔巴赫方程 | Henderson–Hasselbalch | `pH = pK_S + lg([A⁻]/[HA])` | 推导链第一推论 |
| Pufferkapazität | 缓冲容量 | buffer capacity | 抵抗 pH 变化的能力 | 1:1 时最大 |
| Titrationskurve | 滴定曲线 | titration curve | `pH` 对加入体积的曲线 | LK 须预测 |
| Anfangs-pH | 起始 pH | initial pH | 滴定开始时的 pH | 特征点 ① |
| Halbäquivalenzpunkt | 半等当点 | half-equivalence point | `[HA] = [A⁻]` 处 | 特征点 ②，`pH = pK_S` |
| Äquivalenzpunkt | 等当点 | equivalence point | 物质的量恰好相等处 | 特征点 ③ |
| Löslichkeitsprodukt `K_L` | 溶度积 | solubility product | `K_L = [Kation]^a·[Anion]^b` | GK 无 |
| Ionenprodukt `Q` | 离子积 | ion product | 实际浓度的同型乘积 | 与 `K_L` 比较判方向 |
| Entropie `S` | 熵 | entropy | 微观状态数的度量 | GK 无 |
| Lösungsenthalpie | 溶解焓 | enthalpy of solution | 溶解过程热效应 | LK 增量 |

---

## 2. 知识结构 (Struktur)

### 2.1 缓冲：从推导链到 Henderson-Hasselbalch

由 `K_S = [A⁻][H₃O⁺]/[HA]`（推导链产出）解出 `[H₃O⁺] = K_S·[HA]/[A⁻]`，取负对数即得 [据推断]：

`pH = pK_S + lg([A⁻]/[HA])`

三条可直接用于答题的结论：
- **1:1 时 `pH = pK_S`**（缓冲能力最强）。
- **稀释时**比值不变 → pH 基本不变（缓冲的特征）。
- **加少量强酸/强碱**：`[A⁻]/[HA]` 比值变化小 → pH 变化小。

> *Klausur-Satz*: *Ein Puffer besteht aus einer schwachen Säure und ihrer konjugierten Base. Nach der Henderson-Hasselbalch-Gleichung gilt pH = pK_S + lg(c(A⁻)/c(HA)); die größte Pufferkapazität liegt bei einem Verhältnis von 1:1 vor.*

### 2.2 滴定曲线三特征点（LK 必考）

| 特征点 | 算法 | 强酸-强碱 | 弱酸-强碱 |
|---|---|---|---|
| ① **Anfangs-pH** | 由起始浓度算 | `pH = −lg c₀`（强酸） | `pH` 由 `K_S` + 三段式（弱酸） |
| ② **Halbäquivalenzpunkt** | `[HA] = [A⁻]` → `pH = pK_S` | 无意义（无 pK_S） | `pH = pK_S` |
| ③ **Äquivalenzpunkt** | 按物质的量守恒判断 | `pH = 7` | **`pH > 7`**（弱酸强碱滴定） |

> ⚠️ **最易错**：等当点 pH **一律写 7** —— 只有强酸强碱滴定才是 7；弱酸强碱滴定等当点 **> 7** [据推断，经典结论]。

> *Klausur-Satz*: *Am Halbäquivalenzpunkt gilt c(HA) = c(A⁻), daher ist pH = pK_S. Am Äquivalenzpunkt einer schwachen Säure mit einer starken Base liegt der pH-Wert oberhalb von 7.*

### 2.3 溶度积 `K_L`：与三段式同构

`AB(s) ⇌ A⁺ + B⁻` → `K_L = [A⁺][B⁻]`（**纯固体不写入**）。判方向用离子积 `Q`：

- `Q > K_L` → 生成沉淀（左移）
- `Q = K_L` → 恰好饱和
- `Q < K_L` → 沉淀溶解（右移）

> *Klausur-Satz*: *Übersteigt das Ionenprodukt Q das Löslichkeitsprodukt K_L, so fällt ein Niederschlag aus; ist Q kleiner als K_L, löst sich der Niederschlag auf.*

### 2.4 熵与自发吸热溶解（LK 独有）

⚠️ **德国更深**：LK 要求把**自发吸热溶解归因于熵变**（`Entropie` 是 GK 完全无的独立条目）[已验证]。溶解时有序晶格被拆散、粒子排列方式增多 → `ΔS > 0`，可补偿 `ΔH > 0`，使过程自发。

> ⚠️ 唯一判据是**自由能** `ΔG = ΔH − TΔS`（属 Q-2 LK）；`ΔS > 0` 本身**不是**自发的充分条件 [据推断]。

> *Klausur-Satz*: *Manche Salze lösen sich trotz endothermer Lösungsenthalpie spontan, weil beim Auflösen des Ionengitters die Zahl der möglichen Anordnungen und damit die Entropie zunimmt. Die Triebkraft ist hier die Entropiezunahme.*

---

## 3. 解题方法 (Methoden)

### 3.1 缓冲题三问法

1. **认缓冲对**：找出弱酸 `HA` 与其共轭碱 `A⁻`（**不用水解概念**）。—— *KLP 工具：`Puffersysteme`（LK）*
2. **套 HH 方程**：`pH = pK_S + lg([A⁻]/[HA])`。—— *KLP 工具：推导链产出*
3. **判容量/稀释**：1:1 最强；稀释时比值不变 → pH 不变。—— *KLP 工具：`Pufferkapazität`*

### 3.2 滴定曲线三特征点五步法

1. **判滴定类型**（强-强 / 弱-强 / 强-弱）。—— *KLP 工具：`Titrationskurve`（LK）*
2. **算起始 pH**（强酸直算；弱酸走三段式）。—— *KLP 工具：`K_S` + 三段式*
3. **算半等当点**：`pH = pK_S`。—— *KLP 工具：推导链*
4. **算等当点**：按物质的量守恒，判产物酸碱性与 `pH` 相对 7 的位置。—— *KLP 工具：`Neutralisation`*
5. **画曲线并标突跃范围**，评价指示剂选择。—— *KLP 工具：`skizzieren`（官方动词）*

> **判据 / 决策点**：曲线中「半等当点」处 pH 是否等于 pK_S，是**自检曲线是否画对**的最快方法。

### 3.3 `K_L` 三问法

1. 写平衡式与 `K_L` 表达式（固体不写）。
2. 算 `Q`，与 `K_L` 比较判方向。
3. 若求溶解度，走三段式（见 `CN-Gleichgewichts-Dreisatz-Tabelle.md` C 组）。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 三段式 + 量级检验 + 滴定曲线三特征点

- **技法内容**：① **三段式 ICE 表**迁移到缓冲、`K_L` 计算；② **量级检验**（`K_L` 极小 → 溶解度极小；稀释极限 `pH → 7`）；③ **滴定曲线三特征点成套算法**（起始 pH / 半等当点 `pH = pK_S` / 等当点按产物判定）。中国侧提供的是**方法熟练度与训练密度**。
- **DE-Anschluss**：`Massenwirkungsgesetz`（EF-2）· `K_S`/`pK_S`（Q-1，LK 要求推导）· `Puffersysteme` + Henderson-Hasselbalch（LK-02）· `Löslichkeitsgleichgewichte`（LK-03）· `Titrationskurve`（LK-04）。
- **合规性**：✅ —— 用到的工具德国都已教。⚠️ **唯一禁入**：**不得用盐类水解（Salzhydrolyse）路径解释缓冲**（见页首禁入判据）。
- **Abitur 应用**：LK-02 缓冲计算与容量讨论 · LK-04 滴定曲线三特征点 · LK-03 溶度积判断 · LK-05 熵与自发吸热溶解。AFB II–III。
- **来源**：`[CN-课标]` 选必1 3.5（溶液 pH 调控的应用）+ 3.4（沉淀溶解平衡）+ 3.6（中和滴定）；`[CN-高考]` 滴定曲线题型与三段式。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（可含 Demonstrationsexperiment / Messreihe）[已验证] |
| Operator | `berechnen` / `herleiten` / `erklaeren` / `skizzieren` / `beurteilen` / `bewerten` |
| AFB | II（计算与作图）→ III（指示剂选择评价、缓冲容量讨论、熵解释） |
| 建议分值 / 时长 | LK 单题约 10–15 BE；整卷 LK 300 min，4 题选 3 [已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Puffer besteht aus Essigsäure (pK_S = 4,75) und Natriumacetat. In 1,0 l Lösung liegen c(HAc) = 0,10 mol/l und c(Ac⁻) = 0,10 mol/l vor.
> **a)** Berechnen Sie den pH-Wert mithilfe der Henderson-Hasselbalch-Gleichung.
> **b)** Es werden 0,01 mol HCl zugegeben. Berechnen Sie den neuen pH-Wert näherungsweise und begründen Sie, warum sich der pH-Wert nur gering ändert.

**Aufgabe 2** `[原创]`
> Eine schwache Säure HA (pK_S = 5,0) wird mit einer starken Base titriert.
> **a)** Berechnen Sie den pH-Wert am Halbäquivalenzpunkt.
> **b)** Skizzieren Sie den prinzipiellen Verlauf der Titrationskurve und markieren Sie die drei Kennpunkte (Anfangs-pH, Halbäquivalenzpunkt, Äquivalenzpunkt).
> **c)** Beurteilen Sie, welcher Indikator für diese Titration geeignet ist, und begründen Sie Ihre Wahl.

**Aufgabe 3** `[CN-改编]`
> Silberchlorid hat K_L = 1,8 · 10⁻¹⁰ (mol/l)². Zu 1,0 l einer Lösung mit c(Ag⁺) = 1,0 · 10⁻⁴ mol/l werden Chloridionen gegeben.
> **a)** Berechnen Sie die Chloridkonzentration, ab der AgCl auszufallen beginnt.
> **b)** Erläutern Sie mithilfe des Ionenprodukts Q, wie man die Verschiebungsrichtung des Gleichgewichts beurteilt.

**Aufgabe 4** `[NRW-改编]`
> Beim Lösen von Ammoniumnitrat in Wasser sinkt die Temperatur der Lösung deutlich ab, obwohl der Vorgang endotherm ist.
> **a)** Erklären Sie den spontanen Ablauf dieses endothermen Vorgangs mithilfe des Begriffs der Entropie.
> **b)** Bewerten Sie, ob die Aussage „endotherme Vorgänge laufen nicht freiwillig ab" mit diesem Befund vereinbar ist.

### 5.3 Musterlösung

**Aufgabe 1**
1. a) `pH = pK_S + lg(c(Ac⁻)/c(HAc)) = 4,75 + lg(1) = 4,75` ✓ 得分点
2. b) HCl 与 Ac⁻ 反应：`Ac⁻ + H₃O⁺ → HAc + H₂O`；新 `c(Ac⁻) = 0,09`，`c(HAc) = 0,11` ✓ 得分点
3. `pH = 4,75 + lg(0,09/0,11) = 4,75 − 0,087 ≈ 4,66` ✓ 得分点
4. 理由：比值 `[A⁻]/[HA]` 仅小幅变化，对数后 pH 变化极小 → 缓冲作用 ✓ 得分点

**Aufgabe 2**
1. a) 半等当点：`c(HA) = c(A⁻)` → `pH = pK_S = 5,0` ✓ 得分点
2. b) 曲线：起始（弱酸，pH 略高）→ 平缓段（缓冲区，中点即 5,0）→ 突跃 → 等当点 **pH > 7** ✓ 得分点（**三特征点须标出**）
3. c) 指示剂选择：须在**突跃范围内**变色；弱酸强碱滴定突跃偏碱性 → 选变色范围在碱性区者（如 Phenolphthalein），**不选**甲基橙 ✓ 得分点（须说明理由）

**Aufgabe 3**
1. a) 临界条件 `Q = K_L`：`c(Ag⁺)·c(Cl⁻) = K_L` ✓
2. `c(Cl⁻) = 1,8·10⁻¹⁰ / 1,0·10⁻⁴ = 1,8·10⁻⁶ mol/l` ✓ 得分点（量级检验：极小值合理 ✓）
3. b) `Q > K_L` → 生成沉淀（左移）；`Q < K_L` → 溶解；`Q = K_L` → 饱和 ✓ 得分点

**Aufgabe 4**
1. a) 晶格被拆散，离子由有序进入溶液 → 粒子排列方式增多、微观状态数增大 → `ΔS > 0` ✓ 得分点
2. 熵增可补偿吸热（`ΔH > 0`），使过程自发；驱动因素为熵 ✓ 得分点
3. b) 该说法**不成立**：判据是 `ΔG = ΔH − TΔS`，只要 `TΔS` 足够大，`ΔH > 0` 的过程也可自发 ✓ 得分点（**必须提到 ΔG，不能只说熵**）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 等当点 pH 一律写 7（弱酸强碱应 > 7）；看到醋酸钠就搬「盐类水解」 | 先判滴定类型；缓冲只用「弱酸+共轭碱」配对 |
| 知识错 | 半等当点漏用 `pH = pK_S`；`Q > K_L` 说成「不沉淀」 | 背三特征点算法；Q 与 K_L 比较方向固定 |
| 表达错 | 曲线不标突跃范围与三特征点；熵解释只写「混乱度」不落到粒子排列 | 作图必须标点；熵须写「微观状态数/排列方式」 |

---

## 7. Vernetzung

- **上游**：`MWG-zu-KS-Ableitungskette.md`（推导链，本笔记全部内容的基础）· `CN-Gleichgewichts-Dreisatz-Tabelle.md`（ICE 表）
- **下游**：`Basiskonzepte-Drei-Achsen.md`（Energie 轴：熵与自由能）· Q-2 LK（ΔG = ΔH − TΔS）
- **横向**：`06_Bio` 血液碳酸氢盐缓冲（`Kinetik-Gleichgewicht-Bio-Vernetzung.md §2`）
- **术语卡**：`Puffersystem` / `Halbäquivalenzpunkt` / `Äquivalenzpunkt` / `Löslichkeitsprodukt` / `Entropie`（建议加入 csv）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）确认 · `[据推断]` = 基于本项目推导或常用结论 · `[未获取到]` = 未找到，如实标注。
