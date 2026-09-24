---
fach: Chemie
thema: "MWG zu KS Ableitungskette"
operatoren: [herleiten, ableiten, begruenden, berechnen, deuten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Chemie, Gleichgewicht, Saeure-Base]
stufe: "Q1|Q2"
kursart: "LK"
---

# MWG → K_S Ableitungskette (用质量作用定律推导酸碱常数)

> **中文理解**：EF 里 `Massenwirkungsgesetz`（MWG，质量作用定律）只是一个**计算工具**——套公式求 `K_c`，用来算平衡位置。到了 Q 阶段 LK，KLP 明文要求**用 MWG 推导** `K_S`/`pK_S`/`K_B` 并计算（`herleiten`）[已验证，KLP 2022 `ch.txt` L1422-1427]。这一步是 EF 化学知识在 Q 阶段的**第一个复用点**，也是最容易被低估的一跳：Q 阶段**全部酸碱定量**（弱酸 pH、缓冲、滴定曲线、溶度积）都建在这条推导上。
>
> **Klausur-Relevanz**：这是 LK 的法定规定动作（`herleiten` 属 AFB III），且 `berechnen` 的官方释义要求「从某个 Ansatz 出发**呈示计算过程**」——只写答案不给分 [已验证，Chemie Operatoren ab Abitur 2025]。不背这条链，等于放弃 LK 酸碱四块大题。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Massenwirkungsgesetz (MWG) | 质量作用定律 | law of mass action | `K_c = Π c(Produkte)^ν / Π c(Edukte)^ν` | EF-2 已教，可逆反应平衡常数的通用写法 |
| Protolysegleichung | 质子传递平衡式 | protolysis equilibrium | `HA + H₂O ⇌ A⁻ + H₃O⁺` | 推导链第①步；必须是**平衡箭头** ⇌ |
| Säurekonstante `K_S` | 酸常数 | acid constant | `K_S = [A⁻]·[H₃O⁺] / [HA]` | ⚠️ 德 `K_S` = 中 `K_a`；须双标校准 |
| `pK_S` | 酸常数负对数 | pKa | `pK_S = −lg K_S` | **越小酸越强** |
| Basenkonstante `K_B` | 碱常数 | base constant | `K_B = [BH⁺]·[OH⁻] / [B]` | 共轭碱的常数 |
| Ionenprodukt `K_W` | 水的离子积 | ion product of water | `K_W = [H₃O⁺]·[OH⁻] = 10⁻¹⁴ (mol/l)²` | 25 °C [据推断，常用值] |
| konjugiertes Säure-Base-Paar | 共轭酸碱对 | conjugate pair | `HA / A⁻` | Brønsted 概念（Q-1 GK 已教） |
| Halbäquivalenzpunkt | 半等当点 | half-equivalence point | `[HA] = [A⁻]` 处 | 此处 **pH = pK_S** ← 推导链的直接产出 |
| Henderson-Hasselbalch-Gleichung | 亨德森-哈塞尔巴赫方程 | Henderson–Hasselbalch | `pH = pK_S + lg([A⁻]/[HA])` | 推导链的**第一个下游推论**（LK） |

---

## 2. 知识结构 (Struktur)

### 2.1 先立一句「先行组织者」：EF 是计算工具，LK 是推导工具

同一部 MWG，两个学段要求不同 [已验证]：

| 学段 | 对 MWG 的要求 | 原文依据 |
|---|---|---|
| **EF** | 把 MWG **当作公式**用于算平衡位置 | 「bestimmen rechnerisch Gleichgewichtslagen … mithilfe des MWG」 |
| **Q-GK** | 用 MWG **解释**酸碱平衡位置；常数只「解释」 | KLP GK Schwerpunkt 1 |
| **Q-LK** | **用 MWG 推导** `K_S`/`pK_S`/`K_B` **并计算** | KLP LK 增量条目 |

> *Klausur-Satz*: *Das Massenwirkungsgesetz dient in der Einführungsphase der Berechnung von Gleichgewichtslagen; im Leistungskurs wird es darüber hinaus zur **Herleitung** der Säure- und Basenkonstanten genutzt.*

### 2.2 四步推导链（本笔记的核心）

以弱酸 `HA` 为例，四步固定顺序 [据推断，为本项目据 KLP 要求整理的方法链]：

1. **写质子传递平衡式**：`HA + H₂O ⇌ A⁻ + H₃O⁺`
2. **按 MWG 写 K 表达式**：`K_c = [A⁻]·[H₃O⁺] / ([HA]·[H₂O])`（**纯液体 H₂O 仍写出，但下一步并入常数**）
3. **把 [H₂O] 并入常数**，定义：`K_S = K_c · [H₂O] = [A⁻]·[H₃O⁺] / [HA]`
4. **取负对数**：`pK_S = −lg K_S`，并读出两条结论（见 2.4）

> *Klausur-Satz*: *Da die Konzentration des Wassers in verdünnten wässrigen Lösungen praktisch konstant ist, wird sie in die Gleichgewichtskonstante einbezogen. Man definiert daher die Säurekonstante K_S = K_c · c(H₂O) = c(A⁻)·c(H₃O⁺)/c(HA).*

### 2.3 ⚠️ 最常卡住的一步：为什么 H₂O 不进 K_S 表达式？

纯液体（`H₂O`）与纯固体在 MWG 表达式中**不出现**，因为它们的「浓度」在给定温度下是常量，已被并入常数 [已验证，MWG 书写规则]。LK 的推导恰恰要把这一步**显式写出来**：先写含 `[H₂O]` 的 `K_c`，再说明「并入」——**不写这一步，`herleiten` 的分数拿不到**。

> *Klausur-Satz*: *Reines Wasser liegt als Flüssigkeit vor; seine Stoffmengenkonzentration ist bei konstanter Temperatur konstant und wird deshalb in die Konstante eingerechnet. Aus diesem Grund erscheint c(H₂O) nicht im Ausdruck für K_S.*

### 2.4 pK_S 的两条「可直接用于答题」的结论

推导完成后必须会**用**（这是 LK 的高频给分点）[据推断]：

- **结论 A（强度判据）**：`pK_S` 越小 → `K_S` 越大 → 酸越强。
- **结论 B（半等当点）**：当 `[HA] = [A⁻]` 时，`pH = pK_S`。这正是滴定曲线**半等当点**的算法依据。

> *Klausur-Satz*: *Je kleiner der pK_S-Wert, desto stärker ist die Säure. Am Halbäquivalenzpunkt gilt c(HA) = c(A⁻); hieraus folgt pH = pK_S.*

### 2.5 共轭碱的 `K_B` 与 `K_S · K_B = K_W`

对共轭碱 `A⁻`：`A⁻ + H₂O ⇌ HA + OH⁻`，按同一四步链得 `K_B = [HA]·[OH⁻] / [A⁻]`。

两者相乘即得 [据推断]：

`K_S · K_B = ([A⁻][H₃O⁺]/[HA]) · ([HA][OH⁻]/[A⁻]) = [H₃O⁺][OH⁻] = K_W`

→ **`pK_S + pK_B = pK_W = 14`**（25 °C）。共轭碱的强度由酸的 pK_S 直接决定。

> *Klausur-Satz*: *Für ein konjugiertes Säure-Base-Paar gilt K_S · K_B = K_W, da sich die Konzentrationen von HA und A⁻ herauskürzen. Folglich ist pK_S + pK_B = 14.*

### 2.6 这条链解锁的四个下游块（LK 全景）

| 下游块 | 用到的链上产物 | 一句话 |
|---|---|---|
| 弱酸弱碱 pH（LK-01） | `K_S` + 三段式 | 由 `K_S` 解 `[H₃O⁺]` |
| 缓冲体系（LK-02） | `pH = pK_S + lg([A⁻]/[HA])` | 推导链第①个推论 |
| 滴定曲线三特征点（LK-04） | 半等当点 `pH = pK_S` | 推导链第②个推论 |
| 溶度积 `K_L`（LK-03） | 同一 MWG 记账法 | 同构迁移，非新知识 |

---

## 3. 解题方法 (Methoden)

### 3.1 四步推导法（`herleiten` 标准程序）

**编号步骤**：
1. **写平衡式**：写下质子传递平衡式，用 ⇌，标出酸/碱与其共轭对。—— *KLP 工具：Q-1 GK-01 `Protolysereaktionen`（Brønsted 概念）*
2. **写含 H₂O 的 K_c**：按 MWG 写出**完整**表达式（此时 `[H₂O]` 仍在分母）。—— *KLP 工具：EF-2 `Massenwirkungsgesetz`*
3. **并入常量并定义 K_S**：说明 `[H₂O]` 恒定，把它并入常数，得到 `K_S = [A⁻][H₃O⁺]/[HA]`。—— *KLP 工具：Q-1 GK-02 `Säurekonstanten`*
4. **取负对数并读出结论**：`pK_S = −lg K_S`；给出「越小越强」与「半等当点 pH = pK_S」。—— *KLP 工具：LK-06 明文要求 + LK-04 滴定曲线*

> **判据 / 决策点**：题目出现 `herleiten` / `ableiten` → 必须**呈示四步**（尤其第②→③步的「并入」）；若只出现 `berechnen` → 可从 `K_S` 直接起步，但仍须写 Ansatz。

### 3.2 由 `K_S` 求 `pK_S` 与反向求值（`berechnen`）

1. 抄 `K_S`（注意单位与 10 的幂）。
2. `pK_S = −lg K_S`；反向 `K_S = 10^(−pK_S)`。
3. **量级检验**：`pK_S` 在 0–14 之间；强酸 `pK_S < 0`。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: `MWG → K_S` 推导链（CN-Methode 7）

- **技法内容**：把「从 MWG 到酸碱常数」拆成**固定四步**——① 写质子传递平衡式 → ② 按 MWG 写 K 表达式 → ③ 把 `[H₂O]` 并入常数、定义 `K_S` → ④ 取负对数得 `pK_S`，读出「越小越强」与「pH = pK_S 时 [HA] = [A⁻]」。中国侧提供的是**思维顺序**与「并入 `[H₂O]`」这一步的操作化熟练度（中国教材由 `K_a` 求 pH、缓冲的成套训练密度高）。
- **DE-Anschluss**：EF-2 `Massenwirkungsgesetz`（已教且要求定量）· Q-1 GK-01 `Protolysereaktionen` · Q-1 GK-02 `K_S`/`pK_S`/`K_B` · **LK-06 明文要求「用 MWG 推导」**（推导要求来自德国，不是中国带来的）。
- **合规性**：✅ —— 用到的全部工具德国都已教；⚠️ 唯一禁入：**不得用「盐类水解」路径替代**（KLP 全文无 `Hydrolyse`，见 §6 与 `Q1-LK-Puffer-Titrationskurve-KL.md` 的禁入判据）。
- **Abitur 应用**：LK-06 直接命中；下游解锁 LK-01 弱酸碱 pH、LK-02 缓冲、LK-04 滴定曲线、LK-03 溶度积。AFB II/III。
- **来源**：`[CN-课标]` 选必1 3.2 电离平衡常数 + 水的电离；`[CN-高考]` 由 `K_a` 求 pH 与缓冲的成套训练。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（可含 Demonstrationsexperiment）[已验证] |
| Operator | `herleiten` / `ableiten` / `berechnen` / `begruenden` / `deuten` |
| AFB | II（计算与解释）→ III（推导与结论迁移） |
| 建议分值 / 时长 | 单小题约 4–8 BE；整卷 LK 300 min（含 Auswahlzeit），一套 4 题选 3 [已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> In einer wässrigen Lösung liegt die schwache Säure HA vor. Es gilt das Protolysegleichgewicht HA + H₂O ⇌ A⁻ + H₃O⁺.
> **a)** Leiten Sie aus dem Massenwirkungsgesetz die Säurekonstante K_S und den pK_S-Wert her. Erläutern Sie dabei, warum c(H₂O) nicht im Ausdruck für K_S auftritt.
> **b)** Begründen Sie anhand der Herleitung, welche Aussage über die Säurestärke aus einem kleinen pK_S-Wert folgt.

**Aufgabe 2** `[原创]`
> Für eine schwache Säure HA ist K_S = 1,8 · 10⁻⁵ (mol/l) bekannt.
> **a)** Berechnen Sie pK_S.
> **b)** Bestimmen Sie den pH-Wert an dem Punkt, an dem genau die Hälfte der Säure deprotoniert ist, und begründen Sie Ihr Vorgehen mit der Herleitung aus Aufgabe 1.

**Aufgabe 3** `[CN-改编]`
> Eine schwache Base A⁻ (konjugierte Base der Säure HA, K_S = 1,8 · 10⁻⁵) reagiert mit Wasser: A⁻ + H₂O ⇌ HA + OH⁻.
> **a)** Leiten Sie mit dem MWG den Ausdruck für K_B her.
> **b)** Zeigen Sie, dass K_S · K_B = K_W gilt, und berechnen Sie pK_B.

**Aufgabe 4** `[NRW-改编]`
> Ein Puffer aus der Säure HA (pK_S = 4,75) und ihrer konjugierten Base A⁻ wird untersucht. Das Verhältnis beträgt c(A⁻) : c(HA) = 1 : 1.
> **a)** Leiten Sie aus dem MWG die Henderson-Hasselbalch-Gleichung her.
> **b)** Berechnen Sie den pH-Wert des Puffers und deuten Sie das Ergebnis im Vergleich zum Halbäquivalenzpunkt.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Ansatz (平衡式)**：`HA + H₂O ⇌ A⁻ + H₃O⁺` ✓ 得分点
2. **MWG**：`K_c = c(A⁻)·c(H₃O⁺) / (c(HA)·c(H₂O))` ✓ 得分点
3. **并入 H₂O**：`c(H₂O)` 在恒温稀溶液中恒定 → `K_S = K_c·c(H₂O) = c(A⁻)·c(H₃O⁺)/c(HA)` ✓ 得分点（**此步是 `herleiten` 的核心**）
4. **取负对数**：`pK_S = −lg K_S` ✓ 得分点
5. **b) 结论**：`pK_S` 越小 → `K_S` 越大 → 平衡更偏右 → 酸越强 ✓ 得分点

**Aufgabe 2**
1. `pK_S = −lg(1,8·10⁻⁵) = 5 − lg 1,8 ≈ 5 − 0,26 = 4,74` ✓ 得分点（量级检验：落在 0–14 内 ✓）
2. **半等当点判据**：此处 `c(HA) = c(A⁻)` → 由 `K_S = c(A⁻)c(H₃O⁺)/c(HA)` 得 `c(H₃O⁺) = K_S` ✓ 得分点
3. `pH = pK_S ≈ 4,74` ✓ 得分点

**Aufgabe 3**
1. `K_B = c(HA)·c(OH⁻)/c(A⁻)`（同法四步）✓ 得分点
2. **相乘**：`K_S·K_B = [A⁻][H₃O⁺]/[HA] · [HA][OH⁻]/[A⁻] = [H₃O⁺][OH⁻] = K_W` ✓ 得分点（**约去 HA 与 A⁻ 是关键**）
3. `pK_B = 14 − pK_S = 14 − 4,74 = 9,26` ✓ 得分点

**Aufgabe 4**
1. 由 `K_S = c(A⁻)c(H₃O⁺)/c(HA)` 解出 `c(H₃O⁺) = K_S · c(HA)/c(A⁻)` ✓
2. 取负对数：`pH = pK_S − lg(c(HA)/c(A⁻)) = pK_S + lg(c(A⁻)/c(HA))` ✓ 得分点（HH 方程）
3. `c(A⁻)/c(HA) = 1` → `lg 1 = 0` → `pH = 4,75` ✓
4. **deuten**：与半等当点重合，说明「1:1 缓冲对」即半等当点状态，缓冲能力在此处最强 ✓ 得分点

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把 `herleiten` 当成 `berechnen`，直接套 `K_S` 公式不给过程 | 见到 `herleiten/ableiten` 必写四步，尤其「并入 [H₂O]」那一步 |
| 知识错 | 认为 `[H₂O]` 因「水是溶剂」而不写；或把 `K_S·K_B = K_W` 记成 `K_S + K_B = K_W` | 记住「并入常数」而非「删掉」；乘积关系用约分自行验证 |
| 表达错 | 平衡式写单箭头 →；漏标共轭对；符号串台（德 `K_S` vs 中 `K_a`） | 统一用 ⇌；术语表双标 `K_S (K_a)` |

---

## 7. Vernetzung

- **上游**：`Kinetik-Gleichgewicht-Bio-Vernetzung.md`（EF-2 MWG 与动态平衡）· `Chemie-EF-Grundlagen-Training.md`（物质的量与浓度）
- **下游**：`Q1-LK-Puffer-Titrationskurve-KL.md`（缓冲 / HH / 滴定曲线三特征点 / K_L）· `CN-Gleichgewichts-Dreisatz-Tabelle.md`（ICE 三段式）
- **横向**：`03_Mathe` 对数函数（`pH = −lg c` 的单调性与变换）
- **术语卡**：`K_S` / `pK_S` / `K_B` / `pK_B` / `Halbäquivalenzpunkt` / `Henderson-Hasselbalch`（建议加入 csv，DE-CN-EN 三列）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022 `gost_klp_ch_2022_06_07.pdf` / Chemie Operatoren ab Abitur 2025）确认 · `[据推断]` = 基于本项目推导或常用数值 · `[未获取到]` = 未找到，如实标注。
