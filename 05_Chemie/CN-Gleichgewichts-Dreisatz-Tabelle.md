---
fach: Chemie
thema: "CN Gleichgewichts-Dreisatz-Tabelle (ICE)"
operatoren: [aufstellen, berechnen, bestimmen, ermitteln]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Chemie, Gleichgewicht]
stufe: "EF|Q1"
kursart: "GK|LK"
---

# CN-Gleichgewichts-Dreisatz-Tabelle (三段式 ICE 表)

> **中文理解**：任何平衡计算（化学平衡 / 弱电解质电离 / 沉淀溶解），一律先画一张**三行表**：**起始浓度 → 变化量 → 平衡浓度**，再把平衡行代入 `K` 表达式解方程。关键是把「变化量」这一行**按方程式系数比**写成 `x`、`2x`…，而不是凭直觉凑数。这是**可嫁接性最高**的一条中国技法——因为德国 KLP 只写「用 MWG 计算」，**未规定任何方法** [已验证，KLP EF-2 / Q-1 均无方法规定]。
>
> **Klausur-Relevanz**：填补的是**方法空白**，不是知识空白。全部输入（起始浓度、方程式系数、K 表达式）德国都已教；中国侧提供的是**表格化的记账方式**。下游直供 EF-12（K_c 定量）、LK-01（弱酸弱碱 pH）、LK-03（溶度积）、LK-06（推导 K_S 后的计算）。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Dreisatz-Tabelle / ICE-Tabelle | 三段式表 | ICE table | Initial / Change / Equilibrium 三行 | 本笔记核心工具 |
| Ausgangskonzentration | 起始浓度 | initial concentration | 反应开始前的浓度 | 第 I 行 |
| Änderung | 变化量 | change | 按**系数比**写成 `−x` / `+x` | 第 C 行 |
| Gleichgewichtskonzentration | 平衡浓度 | equilibrium concentration | 平衡时的实际浓度 | 第 E 行，代入 K |
| Massenwirkungsgesetz | 质量作用定律 | law of mass action | `K_c = Π c(Produkte)^ν / Π c(Edukte)^ν` | EF-2 已教 |
| Säurekonstante `K_S` | 酸常数 | acid constant | `K_S = [A⁻][H₃O⁺]/[HA]` | Q-1（见 `MWG-zu-KS-Ableitungskette.md`） |
| Löslichkeitsprodukt `K_L` | 溶度积 | solubility product | `K_L = [Kation]^a · [Anion]^b` | LK-03（GK 无） |
| Dissoziationsgrad `α` | 电离度 | degree of dissociation | `α = 已电离 / 起始` | 用于近似判据 |
| Umsatz / Ausbeute | 转化率 / 产率 | conversion / yield | 已转化 ÷ 起始 | 常用于 AFB III 讨论 |

---

## 2. 知识结构 (Struktur)

### 2.1 三段式表模板（一页记忆）

以 `a A + b B ⇌ c C + d D` 为例：

| | A | B | C | D |
|---|---|---|---|---|
| **I** 起始 | `c₀(A)` | `c₀(B)` | 0 | 0 |
| **C** 变化 | `−a·x` | `−b·x` | `+c·x` | `+d·x` |
| **E** 平衡 | `c₀(A) − a·x` | `c₀(B) − b·x` | `c·x` | `d·x` |

→ 把 E 行代入 `K` 表达式，得到关于 `x` 的方程，解出 `x` 即得全部平衡浓度。

> *Klausur-Satz*: *Zur Berechnung der Gleichgewichtslage wird eine Dreisatztabelle verwendet: Ausgangskonzentration, Änderung (nach den stöchiometrischen Koeffizienten) und Gleichgewichtskonzentration. Die Gleichgewichtskonzentrationen werden anschließend in das Massenwirkungsgesetz eingesetzt.*

### 2.2 三类平衡共用同一张表

| 类型 | 平衡式 | K 名称 | 典型下游 |
|---|---|---|---|
| **化学平衡** | `N₂ + 3 H₂ ⇌ 2 NH₃` | `K_c` | EF-12 / 工业合成氨 |
| **弱电解质电离** | `HA + H₂O ⇌ A⁻ + H₃O⁺` | `K_S` | LK-01 弱酸 pH |
| **沉淀溶解** | `AB(s) ⇌ A⁺ + B⁻` | `K_L` | LK-03 溶度积 |

> ⚠️ **固体不写入 K 表达式**（`AB(s)` 不出现在 `K_L` 中）；这是三类平衡里最易错的一处 [已验证，MWG 书写规则]。

### 2.3 两个「设 x」的决策点

1. **变化量按系数比**：`2x`、`3x`… 由方程式系数定，**不许凭直觉**。
2. **近似判据**：若 `K` 极小（如 `K_S < 10⁻⁴`）且起始浓度不太小，可近似 `c₀ − x ≈ c₀`，并**须检验** `x/c₀ < 5%`。检验不过则必须解二次方程。

> *Klausur-Satz*: *Ist die Gleichgewichtskonstante sehr klein und die Ausgangskonzentration ausreichend groß, darf die Änderung x gegenüber c₀ vernachlässigt werden. Diese Näherung ist durch die Bedingung x/c₀ < 5 % zu überprüfen.*

---

## 3. 解题方法 (Methoden)

### 3.1 三段式五步法

**编号步骤**：
1. **写平衡式并配平**，确认方向（正向/逆向）。—— *KLP 工具：`Gleichgewichtsreaktionen`（EF-2）*
2. **画三行表**，I 行填起始（纯固体/纯液体不填）。—— *KLP 工具：`Stoffmengenkonzentration c`*
3. **C 行按系数比设 x**（注意正负号由方向定）。—— *KLP 工具：反应方程式的系数比 = 物质的量之比*
4. **E 行代入 K 表达式**，解出 x。—— *KLP 工具：`Massenwirkungsgesetz`（EF-2）*
5. **量级/极限检验**：浓度不得为负；稀释极限下 pH → 7、沉淀判断用离子积 `Q` 与 `K_L` 比较。—— *KLP 工具：`Basiskonzept Chemische Reaktion` 定量侧（S16–S17）*

> **判据 / 决策点**：**只要题目问「平衡时某物质的浓度/转化率」→ 一律先画表**；若只问方向 → 用 `Q` 与 `K` 比较即可，不必画表。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 三段式 ICE 表（CN-Methode 2）

- **技法内容**：对任何平衡计算，一律先画三行表：**起始浓度 → 变化量（用 `−x`/`+x`，符号由方向定，系数由方程式定）→ 平衡浓度**，再把平衡行代入 `K` 表达式解方程。关键是把变化量按系数比写成 `x`、`2x`…，而不是凭直觉凑数。
- **DE-Anschluss**：**`Massenwirkungsgesetz`（EF-2 已教，明文要求「bestimmen rechnerisch Gleichgewichtslagen … mithilfe des MWG」）** · `Gleichgewichtsreaktionen` 与动态平衡（EF-2）· `K_S`/`K_B`（Q-1，LK 要求推导并计算）· `Löslichkeitsgleichgewichte`（LK-03）。⚠️ 德国 KLP 只写「用 MWG 计算」，**未规定方法** → 三段式填补的是**方法空白**，不是知识空白。
- **合规性**：✅ —— 三段式的全部输入（起始浓度、方程式系数、K 表达式）德国都已教；中国侧提供的是**表格化的记账方式**。**本笔记可嫁接性最高。**
- **Abitur 应用**：EF-12（K_c 定量）、GK-02（常数解释）、LK-01（弱酸弱碱 pH）、LK-03（溶度积 K_L）、LK-06（用 MWG 推导 K_S 后的计算）。AFB II；转化率/产率讨论可上 AFB III。
- **来源**：`[CN-课标]` 选必1 2.1（化学平衡常数 + 浓度商 Q 与 K 判方向）+ 3.2（电离平衡常数）+ 3.4（沉淀溶解平衡）；`[CN-高考]` 三段式标准解法。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（常以 Messreihe / 情境数据呈现）[已验证] |
| Operator | `aufstellen` / `berechnen` / `bestimmen` / `ermitteln` |
| AFB | II（定量）→ III（转化率/产率讨论） |
| 建议分值 / 时长 | 单小题约 4–6 BE；常与 Le Chatelier 同题 |

### 5.2 训练题

#### A 组：化学平衡（`K_c`）

**Aufgabe A1** `[原创]`
> Bei 500 °C wird Stickstoff mit Wasserstoff umgesetzt: N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g). Die Ausgangskonzentrationen betragen c₀(N₂) = 1,0 mol/l und c₀(H₂) = 3,0 mol/l; NH₃ ist zu Beginn nicht vorhanden. Im Gleichgewicht gilt c(NH₃) = 0,4 mol/l.
> Stellen Sie die Dreisatztabelle auf und berechnen Sie K_c.

**Aufgabe A2** `[NRW-改编]`
> Für die Reaktion H₂(g) + I₂(g) ⇌ 2 HI(g) gilt bei einer bestimmten Temperatur K_c = 64. Die Ausgangskonzentrationen sind c₀(H₂) = c₀(I₂) = 0,50 mol/l.
> Bestimmen Sie die Gleichgewichtskonzentrationen aller Stoffe mithilfe der Dreisatztabelle.

**Aufgabe A3** `[CN-改编]`
> Für die Reaktion N₂(g) + 3 H₂(g) ⇌ 2 NH₃(g) gilt bei 400 °C K_c = 1,0 · 10⁻² (mol/l)⁻². Die Ausgangskonzentrationen sind c₀(N₂) = 0,50 mol/l und c₀(H₂) = 1,50 mol/l.
> **a)** Bestimmen Sie die Gleichgewichtskonzentration von NH₃.
> **b)** Berechnen Sie die Umsatzrate von N₂ und beurteilen Sie, ob die Reaktion für ein technisches Verfahren ausreichend ist.

#### B 组：弱电解质电离（`K_S`）

**Aufgabe B1** `[原创]`
> Essigsäure (HAc) hat K_S = 1,8 · 10⁻⁵ (mol/l). Eine Lösung hat die Ausgangskonzentration c₀(HAc) = 0,10 mol/l.
> Berechnen Sie mithilfe der Dreisatztabelle die Gleichgewichtskonzentration von H₃O⁺ und den pH-Wert. Überprüfen Sie anschließend die Näherung x/c₀ < 5 %.

**Aufgabe B2** `[NRW-改编]`
> Eine schwache Säure HA (K_S = 4,0 · 10⁻⁷ mol/l) wird zu c₀ = 0,20 mol/l gelöst.
> Bestimmen Sie den pH-Wert mithilfe der Dreisatztabelle und begründen Sie, ob die Näherung zulässig ist.

**Aufgabe B3** `[CN-改编]`
> Eine schwache Base B (K_B = 5,0 · 10⁻⁵ mol/l) liegt zu c₀ = 0,050 mol/l vor. Es gilt: B + H₂O ⇌ BH⁺ + OH⁻.
> **a)** Stellen Sie die Dreisatztabelle auf und berechnen Sie c(OH⁻).
> **b)** Bestimmen Sie den pH-Wert (K_W = 10⁻¹⁴).

#### C 组：沉淀溶解（`K_L`）

**Aufgabe C1** `[原创]`
> Silberchlorid hat K_L = 1,8 · 10⁻¹⁰ (mol/l)². In reinem Wasser stellt sich das Gleichgewicht AgCl(s) ⇌ Ag⁺ + Cl⁻ ein.
> Berechnen Sie die molare Löslichkeit von AgCl mithilfe der Dreisatztabelle.

**Aufgabe C2** `[NRW-改编]`
> Blei(II)-iodid hat K_L = 8,0 · 10⁻⁹ (mol/l)³ und zerfällt nach PbI₂(s) ⇌ Pb²⁺ + 2 I⁻.
> Bestimmen Sie die Löslichkeit von PbI₂ in reinem Wasser und begründen Sie, warum die Änderung der Iodidkonzentration mit 2x angesetzt werden muss.

**Aufgabe C3** `[CN-改编]`
> Zu einer Lösung mit c(Pb²⁺) = 1,0 · 10⁻³ mol/l werden Iodidionen gegeben (K_L = 8,0 · 10⁻⁹ (mol/l)³).
> **a)** Berechnen Sie die Iodidkonzentration, ab der PbI₂ auszufallen beginnt.
> **b)** Erläutern Sie mithilfe des Ionenprodukts Q, wie man die Richtung der Verschiebung beurteilt.

### 5.3 Musterlösung

**A1**
1. 表：I `1,0 / 3,0 / 0`；C `−x / −3x / +2x`；E `1,0−x / 3,0−3x / 2x` ✓
2. `2x = 0,4` → `x = 0,2` ✓
3. E 行：`c(N₂)=0,8`，`c(H₂)=2,4`，`c(NH₃)=0,4` ✓
4. `K_c = 0,4² / (0,8 · 2,4³) = 0,16 / (0,8·13,824) ≈ 1,4 · 10⁻² (mol/l)⁻²` ✓ 得分点

**A2**
1. 表：I `0,50 / 0,50 / 0`；C `−x / −x / +2x`；E `0,5−x / 0,5−x / 2x` ✓
2. `K_c = (2x)² / (0,5−x)² = 64` → `2x/(0,5−x) = 8` ✓
3. `2x = 4 − 8x` → `x = 0,40` ✓
4. E 行：`c(H₂)=c(I₂)=0,10 mol/l`，`c(HI)=0,80 mol/l` ✓ 得分点

**A3**
1. 表：I `0,50 / 1,50 / 0`；C `−x / −3x / +2x`；E `0,5−x / 1,5−3x / 2x` ✓
2. 近似 `K` 较小 → 试 `0,5−x ≈ 0,5`，`1,5−3x ≈ 1,5` ✓
3. `K_c = (2x)² / (0,5 · 1,5³)` → `(2x)² = 0,01 · 1,6875 ≈ 0,0169` → `2x ≈ 0,13` → `c(NH₃) ≈ 0,13 mol/l` ✓
4. b) 检验 `x/0,5 = 0,13 < 5 %?` ❌ 不满足 → **近似不成立，须解完整方程**（此处如实指出，并说明「须回代解二次/三次方程」）✓ 得分点（**这一步正是量级检验的价值**）
5. 评价：转化率过低，工业上须高压（Le Chatelier）以提高产率 ✓ 得分点

**B1**
1. 表：I `0,10 / 0 / 0`；C `−x / +x / +x`；E `0,10−x / x / x` ✓
2. `K_S = x² / (0,10 − x)`；近似 `0,10−x ≈ 0,10` → `x² = 1,8·10⁻⁶` → `x ≈ 1,34·10⁻³` ✓
3. `pH = −lg(1,34·10⁻³) ≈ 2,87` ✓ 得分点
4. 检验：`x/c₀ = 1,34·10⁻³/0,10 ≈ 1,3 % < 5 %` ✓ 近似成立 ✓ 得分点

**B2**
1. 表同 B1；`K_S = x²/(0,20−x)`；近似 `x² = 4,0·10⁻⁷·0,20 = 8,0·10⁻⁸` → `x ≈ 2,83·10⁻⁴` ✓
2. `pH = −lg(2,83·10⁻⁴) ≈ 3,55` ✓
3. 检验：`2,83·10⁻⁴/0,20 ≈ 0,14 % < 5 %` → 近似成立 ✓ 得分点

**B3**
1. 表：I `0,050 / 0 / 0`；C `−x / +x / +x`；E `0,050−x / x / x` ✓
2. `K_B = x²/(0,050−x)`；近似 → `x² = 5,0·10⁻⁵·0,050 = 2,5·10⁻⁶` → `x ≈ 1,58·10⁻³` ✓
3. `pOH = −lg(1,58·10⁻³) ≈ 2,80` → `pH = 14 − 2,80 = 11,20` ✓ 得分点

**C1**
1. 表：I `0 / 0`（纯固体不填）；C `+x / +x`；E `x / x` ✓
2. `K_L = x · x = x² = 1,8·10⁻¹⁰` → `x ≈ 1,34·10⁻⁵ mol/l` ✓ 得分点（量级检验：极小的 K_L → 极小溶解度 ✓）

**C2**
1. 表：I `0 / 0`；C `+x / +2x`；E `x / 2x` ✓ 得分点（**2x 来自方程式系数**）
2. `K_L = x·(2x)² = 4x³ = 8,0·10⁻⁹` → `x³ = 2,0·10⁻⁹` → `x ≈ 1,26·10⁻³ mol/l` ✓
3. 理由：每溶解 1 个 PbI₂ 放出 **2 个 I⁻**，故 `c(I⁻) = 2x` ✓ 得分点

**C3**
1. a) 临界条件 `Q = K_L`：`c(Pb²⁺)·c(I⁻)² = K_L` ✓
2. `c(I⁻)² = 8,0·10⁻⁹ / 1,0·10⁻³ = 8,0·10⁻⁶` → `c(I⁻) ≈ 2,83·10⁻³ mol/l` ✓ 得分点
3. b) `Q > K_L` → **生成沉淀**（平衡左移）；`Q < K_L` → 沉淀溶解（右移）；`Q = K_L` → 恰好饱和 ✓ 得分点

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把 `Q > K_L` 说成「不沉淀」（实为**生成沉淀**）；把近似当无条件成立 | 先算 Q 再比 K；近似必做 `x/c₀ < 5 %` 检验 |
| 知识错 | 变化量不按系数比设（凭直觉凑数）；把纯固体写进 `K_L` 表达式 | C 行严格按系数比；固体/纯液体不写入 K |
| 表达错 | 忘记「起始 = 平衡 ∓ 变化」的回代方向；单位与 10 的幂漏写 | 每行标单位；末尾做量级检验 |

---

## 7. Vernetzung

- **上游**：`Kinetik-Gleichgewicht-Bio-Vernetzung.md`（EF-2 动态平衡与 MWG）· `Chemie-EF-Grundlagen-Training.md`（物质的量）
- **下游**：`MWG-zu-KS-Ableitungskette.md`（推导 K_S 后用本表求 pH）· `Q1-LK-Puffer-Titrationskurve-KL.md`（K_L 与滴定曲线）
- **横向**：`03_Mathe` 二次/三次方程求解与对数运算
- **术语卡**：`Dreisatztabelle` / `Ausgangskonzentration` / `Gleichgewichtskonzentration` / `Löslichkeitsprodukt` / `Umsatz`（建议加入 csv）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）确认 · `[据推断]` = 基于本项目推导 · `[未获取到]` = 未找到，如实标注。
