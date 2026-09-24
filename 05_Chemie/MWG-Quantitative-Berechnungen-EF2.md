---
fach: Chemie
thema: "MWG: quantitative Berechnungen"
operatoren: [berechnen, aufstellen, deuten, auswerten, begruenden]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Chemie, Gleichgewicht]
stufe: "EF"
---

# MWG: quantitative Berechnungen (质量作用定律的定量计算)

> **中文理解**：EF-2 的 `Massenwirkungsgesetz`（MWG）是德国化学**最重要的计算工具**：KLP 明文要求「**用 MWG 定量求平衡位置并解释结果**」[已验证，`Chemie-Oberstufe.md` §EF-2 能力要点 (S)]。EF 阶段它只是**计算工具**（算 `K_c`、算浓度、判方向）；到 **LK 才升级为「用 MWG 推导 `K_S`」**（台阶①）[已验证，Mapping §0.4]。因此**把 EF 的 MWG 定量算熟，是台阶①的上游准备**——上游不牢，LK 的酸碱四块（pH / 缓冲 / 滴定曲线 / 溶度积）全部塌方。
> **⚠️ EF 边界**：EF 的 MWG **只用于通用平衡（气体/酯化等）**，**不涉及酸碱**（酸碱属 Q 阶段）[已验证]。
>
> **Klausur-Relevanz**：EF-2 的第二核心（第一是速率）；`berechnen` 的官方释义要求「**从某个 Ansatz 出发呈示计算过程**」——只写答案不给分 [已验证，Chemie Operatoren ab Abitur 2025]。常与 Le Chatelier 图像题合并出题。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Massenwirkungsgesetz (MWG) | 质量作用定律 | law of mass action | 平衡常数表达式 | EF 明文 [已验证] |
| Gleichgewichtskonstante `K_c` | 平衡常数 | equilibrium constant | `K_c = Π[Produkte]^ν / Π[Edukte]^ν` | 与温度有关 |
| Gleichgewichtslage | 平衡位置 | position of equilibrium | 平衡时两侧浓度关系 | `K_c` 定量刻画 |
| Reaktionsquotient `Q` | 反应商 | reaction quotient | 与 `K_c` 同式，但用**任意时刻**浓度 | 判方向工具 |
| reversibel | 可逆 | reversible | 正逆反应同时进行 | 用 ⇌ 表示 |
| dynamisches Gleichgewicht | 动态平衡 | dynamic equilibrium | 正逆速率相等、浓度不变 | EF 明文 |
| Umsatz / Umsetzungsgrad | 转化率 | conversion | 已反应量 / 初始量 | 常以 % 表示 |
| Edukt / Produkt | 反应物 / 生成物 | reactant / product | 左侧 / 右侧物质 | — |
| Prinzip von Le Chatelier | 勒夏特列原理 | Le Chatelier's principle | 平衡对扰动的响应 | EF 明文 [已验证] |
| reine Feststoffe/Flüssigkeiten | 纯固/液体 | pure solids/liquids | **不写入** `K_c` 表达式 | 高频易错点 |

---

## 2. 知识结构 (Struktur)

### 2.1 MWG 的写法（第一步永远是写对式子）

对一般可逆反应 `a A + b B ⇌ c C + d D` [据推断，MWG 定义]：

```
K_c = ([C]^c · [D]^d) / ([A]^a · [B]^b)
```

三条铁律：
1. **指数 = 方程式系数**（不是电荷、不是原子数）。
2. **纯固体与纯液体不写入**（如 `CaCO₃(s)`、`H₂O(l)` 的浓度视为常量）。
3. **`K_c` 只随温度变化**（浓度、压力、催化剂都不改变 `K_c`）。

> ⚠️ 最常错：把 `CaCO₃(s) ⇌ CaO(s) + CO₂(g)` 的 `K_c` 写成含固体的式子。正解：**`K_c = [CO₂]`**（固体不写）。

> *Klausur-Satz*: *Nach dem Massenwirkungsgesetz ist die Gleichgewichtskonstante K_c der Quotient aus den mit ihren Koeffizienten potenzierten Gleichgewichtskonzentrationen der Produkte und der Edukte. Reine Feststoffe und Flüssigkeiten werden nicht in den Ausdruck aufgenommen, da ihre Konzentration konstant ist. K_c hängt nur von der Temperatur ab.*

### 2.2 三类定量任务（EF 全部题型）

| 任务 | 已知 → 求 | 方法 |
|---|---|---|
| **求 `K_c`** | 平衡浓度 → `K_c` | 直接代入 2.1 式 |
| **求平衡浓度** | `K_c` + 初始浓度 → 平衡浓度 | **三段式表（Gleichgewichtstabelle）** |
| **判方向** | `K_c` + 任意时刻浓度 → 方向 | 比较 `Q` 与 `K_c` |

> *Klausur-Satz*: *Mit dem MWG lassen sich drei Aufgabentypen lösen: die Berechnung von K_c aus Gleichgewichtskonzentrationen, die Berechnung von Gleichgewichtskonzentrationen aus K_c sowie die Vorhersage der Reaktionsrichtung durch Vergleich des Reaktionsquotienten Q mit K_c.*

### 2.3 三段式表（Gleichgewichtstabelle）—— 求平衡浓度的唯一稳妥法

对 `H₂ + I₂ ⇌ 2 HI`，起始 `c₀(H₂) = c₀(I₂) = 0,50 mol/L`、无 HI [据推断，本项目据 EF 要求整理]：

| | H₂ | I₂ | 2 HI |
|---|---|---|---|
| **Start (Anfang)** | 0,50 | 0,50 | 0 |
| **Änderung (变化)** | −x | −x | +2x |
| **Gleichgewicht** | 0,50 − x | 0,50 − x | 2x |

把**平衡行**代入 `K_c` 解方程。⚠️ 变化行必须**按系数比**写（`−x / −x / +2x`），不能凭直觉凑。

> *Klausur-Satz*: *Zur Berechnung von Gleichgewichtskonzentrationen stellt man eine Tabelle mit Start-, Änderungs- und Gleichgewichtskonzentrationen auf. Die Änderungen werden nach den Koeffizienten der Reaktionsgleichung angesetzt und anschließend in den Ausdruck für K_c eingesetzt.*

### 2.4 反应商 `Q` 与方向判据

用**当前（非平衡）浓度**代入同一表达式得 `Q` [据推断，方向判据]：

| 比较 | 含义 | 平衡移动方向 |
|---|---|---|
| `Q < K_c` | 产物太少 | **正反应**方向（向右） |
| `Q = K_c` | 已达平衡 | 不移动 |
| `Q > K_c` | 产物太多 | **逆反应**方向（向左） |

> *Klausur-Satz*: *Setzt man die momentanen Konzentrationen in den Ausdruck des MWG ein, erhält man den Reaktionsquotienten Q. Ist Q kleiner als K_c, läuft die Reaktion bevorzugt in Richtung der Produkte; ist Q größer als K_c, in Richtung der Edukte.*

### 2.5 转化率（`Umsetzungsgrad`）

```
Umsetzungsgrad = (umgesetzte Stoffmenge / Ausgangsstoffmenge) · 100 %
```

由三段式解出的 `x` 直接给出：`Umsatz = x / c₀`。⚠️ 常与 `K_c` 联动：「求 `K_c` → 求 `x` → 求转化率」。

> *Klausur-Satz*: *Der Umsetzungsgrad gibt an, welcher Anteil der Ausgangsstoffe tatsächlich umgesetzt wird; er ergibt sich aus dem über die Gleichgewichtstabelle bestimmten Umsatz x im Verhältnis zur Ausgangskonzentration.*

### 2.6 与 Le Chatelier 的接口（图像/条件题）

`K_c` 是**温度的函数**；改变浓度/压力**不改变 `K_c`**，只使 `Q ≠ K_c` → 平衡**移动**直到 `Q` 重新等于 `K_c` [据推断]。→ 「平衡移动」本质是「**`Q` 重新趋近 `K_c`**」。

> *Klausur-Satz*: *Eine Änderung der Konzentration oder des Drucks verändert K_c nicht, wohl aber den Reaktionsquotienten Q. Das Gleichgewicht verschiebt sich so lange, bis Q wieder gleich K_c ist; nur eine Temperaturänderung verändert K_c selbst.*

---

## 3. 解题方法 (Methoden)

### 3.1 求 `K_c` 标准程序（`berechnen` / `aufstellen`）

1. **写平衡方程式**（配平，用 ⇌）。—— *KLP 工具：`Gleichgewichtsreaktionen`*
2. **写 `K_c` 表达式**（指数 = 系数；**删纯固/液体**）。—— *KLP 工具：`Massenwirkungsgesetz`*
3. **代入平衡浓度**（注意单位一致）。—— *KLP 工具：`Stoffmengenkonzentration`*
4. **算值 + 量级检验**：`K_c` 大小反映平衡偏向（≫1 偏产物）。—— *KLP 工具：`Größenordnungsprüfung`*

> **判据 / 决策点**：题干给**平衡浓度** → 直接代入；给**初始浓度 + `K_c`** → 走 3.2 三段式。

### 3.2 求平衡浓度 / 转化率标准程序（`berechnen`）

1. **写方程式 + `K_c` 表达式**。—— *KLP 工具：`Massenwirkungsgesetz`*
2. **列三段式表**：Start / Änderung（按系数比设 `x`）/ Gleichgewicht。—— *KLP 工具：`Gleichgewichtstabelle`（CN-Methode 2）*
3. **平衡行代入 `K_c`**，解出 `x`（本阶段多为**可开方**的对称式，避免二次方程）。—— *KLP 工具：代数运算*
4. **回代求各浓度**，必要时算**转化率**。—— *KLP 工具：`Umsetzungsgrad`*
5. **合理性检验**：`x` 不得超过初始浓度；浓度非负。—— *KLP 工具：`Grenzfallprobe`*

> **判据 / 决策点**：若方程式两侧浓度差**平方对称**（如 `H₂+I₂⇌2HI`）→ 可直接**开方**求解；否则用近似或解二次方程。

### 3.3 判方向标准程序（`deuten`）

1. **算 `Q`**（用当前浓度）。—— *KLP 工具：`Reaktionsquotient`*
2. **比较 `Q` 与 `K_c`**。—— *KLP 工具：方向判据*
3. **下结论**（向右/向左/平衡）+ **说明理由**。—— *KLP 工具：`deuten`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 三段式 ICE 表 + 浓度商 `Q` 判据（**可嫁接性最高**）

- **技法内容**：中国选必1 2.1 把平衡计算做成**成套体系**——① **三段式（ICE / 起始-变化-平衡）表**：变化行**按系数比设 `x`**；② **浓度商 `Q` 与 `K` 比较判方向**；③ **转化率计算**。中国训练密度远高于德国，方法完全步骤化 [已验证，Mapping EF-12 判为 `both-cn-deeper`，CN-Methode 2]。
- **DE-Anschluss**：**`Massenwirkungsgesetz`（EF-2 明文，且要求「定量求平衡位置」）** · `Gleichgewichtsreaktionen` 与动态平衡（EF-2）· `Prinzip von Le Chatelier`（EF-2）· 物质的量/浓度换算（SI 巩固层）。⚠️ **德国 KLP 只写「用 MWG 计算」，未规定任何方法** → 三段式填补的是**方法空白**，不是知识空白。
- **合规性**：✅ **本表可嫁接性最高的一条** —— 三段式的全部输入（初始浓度、方程式系数、`K` 表达式）德国都已教；中国侧提供的是**表格化的记账方式**。⚠️ 边界：EF 阶段**不得**把三段式用于**酸碱/水解**（酸碱属 Q 阶段；水解属 `CN-only` 禁入）——EF 只用于**通用平衡**。
- **Abitur 应用**：**EF-12（K_c 定量）直接命中**；是**台阶①（LK 用 MWG 推导 K_S）的上游准备**；下游解锁 LK-01 弱酸碱 pH、LK-03 溶度积。AFB II；转化率讨论可上 AFB III。
- **来源**：`[CN-课标]` 选必1 2.1「化学平衡常数表征限度 + 浓度商 Q 与 K 的相对大小判反应方向 + 转化率计算」；`[CN-高考]` 三段式标准解法（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（绑定浓度数据表 / 图像）[已验证] |
| Operator | `berechnen` / `aufstellen` / `deuten` / `auswerten` / `begruenden` |
| AFB | I–II（写式、代入）→ II–III（转化率与 Le Chatelier 联动讨论） |
| 建议分值 / 时长 | 单小题约 4–8 BE；常与速率题合并成一道动力学-平衡大题 |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Für die Reaktion `H₂(g) + I₂(g) ⇌ 2 HI(g)` wurden im Gleichgewicht folgende Konzentrationen gemessen: c(H₂) = 0,20 mol/L, c(I₂) = 0,20 mol/L, c(HI) = 1,60 mol/L.
> **a)** Stellen Sie den Ausdruck für die Gleichgewichtskonstante K_c auf.
> **b)** Berechnen Sie K_c und deuten Sie die Größe des Wertes.

**Aufgabe 2** `[NRW-改编]`
> Für dieselbe Reaktion gilt bei der Versuchstemperatur K_c = 64. Es werden H₂ und I₂ mit c₀ = 0,50 mol/L eingesetzt; HI ist zu Beginn nicht vorhanden.
> **a)** Erstellen Sie eine Gleichgewichtstabelle.
> **b)** Berechnen Sie die Gleichgewichtskonzentration von HI.

**Aufgabe 3** `[原创]`
> In einem Reaktionsgefäß liegen bei der Temperatur aus Aufgabe 2 vor: c(H₂) = 0,10 mol/L, c(I₂) = 0,10 mol/L, c(HI) = 0,40 mol/L (K_c = 64).
> **a)** Berechnen Sie den Reaktionsquotienten Q.
> **b)** Deuten Sie, in welche Richtung sich das Gleichgewicht verschiebt, und begründen Sie Ihre Aussage.

**Aufgabe 4** `[NRW-改编]`
> Bei der Zersetzung von Calciumcarbonat gilt: `CaCO₃(s) ⇌ CaO(s) + CO₂(g)`.
> **a)** Stellen Sie den Ausdruck für K_c auf und begründen Sie, welche Stoffe nicht aufgenommen werden.
> **b)** Berechnen Sie den Umsetzungsgrad aus Aufgabe 2 (H₂/I₂-System), wenn c₀(H₂) = 0,50 mol/L und die umgesetzte Menge x = 0,40 mol/L beträgt.

**Aufgabe 5** `[CN-改编]`
> Bei der Veresterung `Essigsäure + Ethanol ⇌ Ester + Wasser` soll die Ausbeute an Ester erhöht werden.
> **a)** Erläutern Sie mithilfe des Prinzips von Le Chatelier zwei Maßnahmen zur Ausbeutesteigerung.
> **b)** Geben Sie an, ob eine dieser Maßnahmen K_c verändert.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a)** `K_c = [HI]² / ([H₂]·[I₂])` ✓ 得分点（**指数 = 系数**）
2. **b)** `K_c = (1,60)² / (0,20 · 0,20) = 2,56 / 0,04 = 64` ✓ 得分点
3. **deuten**：`K_c ≫ 1` → 平衡**明显偏产物**（HI）✓ 得分点

**Aufgabe 2**
1. **a)** 三段式：

| | H₂ | I₂ | 2 HI |
|---|---|---|---|
| Start | 0,50 | 0,50 | 0 |
| Änderung | −x | −x | +2x |
| Gleichgewicht | 0,50 − x | 0,50 − x | 2x |

✓ 得分点（**变化行按系数比**）
2. **b)** 代入：`(2x)² / (0,50 − x)² = 64` ✓ 得分点
3. **开方**：`2x / (0,50 − x) = 8` → `2x = 4 − 8x` → `10x = 4` → `x = 0,40` ✓ 得分点
4. `[HI] = 2x = 0,80 mol/L` ✓ 得分点（检验：`0,64 / (0,10·0,10) = 64` ✓）

**Aufgabe 3**
1. **a)** `Q = (0,40)² / (0,10 · 0,10) = 0,16 / 0,01 = 16` ✓ 得分点
2. **b)** `Q = 16 < K_c = 64` → 反应**向产物方向（向右）**移动 ✓ 得分点
3. **begruenden**：产物（HI）相对不足，正反应速率占优，直至 `Q = K_c` ✓ 得分点

**Aufgabe 4**
1. **a)** `K_c = [CO₂]` ✓ 得分点；`CaCO₃(s)` 与 `CaO(s)` 为**纯固体**，浓度恒定 → **不写入** ✓ 得分点
2. **b)** `Umsetzungsgrad = x / c₀ = 0,40 / 0,50 = 0,80 = 80 %` ✓ 得分点

**Aufgabe 5**
1. **a)** 措施一：**增加一种反应物**（如过量乙醇）→ 平衡右移，提高酯的产率 ✓ 得分点
2. 措施二：**移出产物**（如蒸出酯或吸水移走水）→ 平衡右移 ✓ 得分点
3. **b)** 二者**都不改变 `K_c`**（`K_c` 只随温度变化）；平衡移动是 `Q` 重新等于 `K_c` 的结果 ✓ 得分点（**高频考点：区分「平衡移动」与「K_c 变化」**）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「平衡移动」说成「`K_c` 变化」 | 只有**温度**改变 `K_c`；浓度/压力只改变 `Q` |
| 知识错 | `K_c` 表达式中写入纯固体/纯液体；指数用错（用原子数而非系数） | 删纯固/液体；指数 = **方程式系数** |
| 表达错 | `berechnen` 题只给答案不给 Ansatz；三段式变化行不按系数比 | 写「平衡式 → K_c → 代入」全过程；变化行严格按系数 |
| 越界错 | 在 EF 用三段式处理**酸碱/水解**（属 Q 阶段 / `CN-only`） | EF 的 MWG 只用于**通用平衡**；酸碱留待 Q-1 |

---

## 7. Vernetzung

- **上游**：`Stosstheorie-und-mittlere-Reaktionsgeschwindigkeit.md`（速率与动态平衡）· `Kinetik-Gleichgewicht-Bio-Vernetzung.md`（EF-2 总览）· EF `Chemie-EF-Grundlagen-Training.md`（物质的量换算）
- **下游**：`MWG-zu-KS-Ableitungskette.md`（**台阶①：把 MWG 从计算工具升级为推导工具**）· `CN-Gleichgewichts-Dreisatz-Tabelle.md`（三段式扩展版）· Q-1 弱酸碱 pH / 缓冲 / 溶度积
- **横向**：`03_Mathe` 代数式变形与开方（对称式求解）
- **术语卡**：`Massenwirkungsgesetz` / `Gleichgewichtskonstante K_c` / `Reaktionsquotient Q` / `Gleichgewichtslage` / `Umsetzungsgrad` / `dynamisches Gleichgewicht`（建议加入 csv，DE-CN-EN 三列）
- **Basiskonzept**：`Chemische Reaktion` ✅（可逆性与动态平衡的定量化）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022 / Chemie Operatoren ab Abitur 2025）或本项目已核文件确认 · `[据推断]` = 基于平衡化学通用规则或本项目推导 · `[未获取到]` = 未找到，如实标注。
> ⛔ **本笔记不涉及**：盐类水解体系 · 杂化轨道 / 晶体四分类 / 电子排布式 · 配合物系统板块 · **酸碱定量**（属 Q-1）。
