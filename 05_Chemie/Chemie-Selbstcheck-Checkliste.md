---
fach: Chemie
thema: "Selbstcheck: Groessenordnungs- und Grenzfallpruefung"
operatoren: [berechnen, ermitteln, abschaetzen, auswerten, interpretieren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Methodik]
stufe: "EF|Q1|Q2"
kursart: "GK|LK"
---

# Chemie-Selbstcheck-Checkliste (量级检验 + 极限检验 · 一页纸)

> **中文理解**：算出结果后花 30 秒做两项自检——**量级检验**（结果和日常经验对得上吗？）与**极限检验**（把参数推向 0 或 ∞，结果退化成常识了吗？）。这套检查**不占分，但防止丢分**：德国 `berechnen` 的官方释义是「从某个 **Ansatz** 出发呈示计算过程」，只写答案不给分 [已验证]，而一个量级明显错误的结果会直接暴露 Ansatz 有问题。它是中国技法卡中**合规性最干净**的一条——纯检查习惯，与课程内容无关。
>
> **Klausur-Relevanz**：全 IF 通用。最易在数量级上出错的四块：LK 弱酸弱碱 pH、`K_L` 溶度积的指数运算、Titrationskurve 三特征点、Faraday 电量换算。对 `fachpraktische Aufgabe` 的数据合理性判断有直接加分作用。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Größenordnungsprüfung | 量级检验 | order-of-magnitude check | 结果与经验量级对照 | CN-Methode 9 |
| Grenzfallprobe | 极限检验 | limiting-case check | 参数 → 0 或 ∞ 时结果退化 | CN-Methode 9 |
| Einheitenprobe | 单位检验 | unit check | 等式两边单位一致 | 最先做 |
| Ansatz | 算式起点 | approach | `berechnen` 要求的呈示对象 | 官方释义 [已验证] |
| signifikante Stellen | 有效数字 | significant figures | 结果位数受已知量限制 | Darstellungsleistung |
| Plausibilität | 合理性 | plausibility | 结果是否符合物理/化学常识 | Messreihen 评估 |

---

## 2. 知识结构 (Struktur)

### 2.1 三步自检顺序（落笔后立即执行）

1. **Einheitenprobe**（单位检验）：等式左右单位是否一致？—— *KLP 工具：`Darstellungsleistung`*
2. **Größenordnungsprüfung**（量级检验）：结果落在常识区间吗？—— *KLP 工具：`abschätzen`*
3. **Grenzfallprobe**（极限检验）：把某参数推向 0 或 ∞，结果退化吗？—— *KLP 工具：`interpretieren`*

> *Klausur-Satz*: *Das Ergebnis wird zunächst über die Einheiten, dann über die Größenordnung und schließlich über einen Grenzfall auf Plausibilität geprüft.*

### 2.2 常用量级锚点（背下来，30 秒可比对）

| 量 | 锚点 | 用途 |
|---|---|---|
| 气体摩尔体积 V_m | 22,4 L/mol（0 °C, 101,3 kPa）· ≈24,5 L/mol（25 °C） | 气体体积换算自检 |
| 摩尔质量 M | H₂O 18 · CO₂ 44 · NaCl 58,5 · C₆H₁₂O₆ 180 g/mol | 质量换算自检 |
| 浓度 c | 0,5 mol/L ≈ 普通糖水量级 | 溶液题自检 |
| 中和热 ΔH | ≈ −57 kJ/mol | 量热结果比对 |
| 活化能 Eₐ | 约 50–200 kJ/mol | 能量图读值自检 |
| Zellspannung ΔE | 约 0,1–3 V | 电化学自检 |
| K_S 弱酸 | 约 10⁻³–10⁻¹⁰ | pH 结果自检 |
| K_L 难溶盐 | 约 10⁻¹⁰–10⁻⁵⁰（故 [离子] 极小） | 溶度积自检 |
| pH | 0–14（常温稀溶液） | 酸碱自检 |

### 2.3 常用极限判据

| 参数推向极限 | 结果应退化为 | 检验什么 |
|---|---|---|
| 稀释 c → 0 | pH → 7 | 酸碱性计算 |
| 弱酸极弱（K_S → 0） | 电离度 α → 0，pH → 7 | 弱酸 pH |
| 强酸（K_S → ∞） | α → 1，完全电离 | 强弱电解质区分 |
| 平衡常数 K → ∞ | 平衡几乎完全右移（转化率 → 100 %） | 平衡位置 |
| 反应时间 t → 0 | 曲线切线斜率 = **初速率** | 速率作图 |
| 温度 T → 很高 | 速率↑ 但平衡按 Le Chatelier 可能左移 | 「快 ≠ 多」 |

> ⚠️ 极限检验的**核心价值**：一眼看出「升温既加快又增多的说法」错在哪——`t → 0` 只说明速率，平衡要另判。

---

## 3. 解题方法 (Methoden)

### 3.1 30 秒自检流程（考前默背）

1. 单位对了吗？（mol/L ≠ g/L）—— *KLP 工具：`Einheitenprobe`*
2. 数量级落在 §2.2 区间吗？（pH = 17？ΔH = −5700 kJ/mol？立刻回查）
3. 有效数字与已知量一致吗？—— *KLP 工具：`Darstellungsleistung`*
4. 取一个极限，结果退化合理吗？—— *KLP 工具：`Grenzfallprobe`*
5. 呈示了 Ansatz 吗？（`berechnen` 明文要求）—— *KLP 工具：官方释义 [已验证]*

> **判据 / 决策点**：若量级错 → 90 % 是单位或指数（10ⁿ）出错；若极限不退化 → 多半是公式代错或漏项。

### 3.2 与材料的回扣

数据题（Messreihe）里，自检结果要写成一句**合理性判断**，回扣材料，而非心里默算。—— *KLP 工具：化学禁止无材料依托 [已验证]*

> *Klausur-Satz*: *Der berechnete Wert liegt im erwarteten Größenordnungsbereich und ist daher mit den Messdaten vereinbar.*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode 9: 量级检验 + 极限检验（`Größenordnungsprüfung` / `Grenzfallprobe`）
- **技法内容**：① 量级检验——把结果与日常经验对照（0,1 mol 气体 ≈ 2,4 L；0,5 mol/L 是普通糖水量级）；② 极限检验——把某参数推向 0 或 ∞，看结果是否退化为已知常识。
- **DE-Anschluss**：`abschätzen`（官方动词：通过有理由的考量给出量值）· `auswerten`（数据入关联得结论）· `Kalorimetrie` / `Neutralisationsenthalpie`（GK-06，须评估数据合理性）· `Berechnung der Zellspannung`（GK-09）· 法定 `fachpraktische Aufgabe` 的 Messreihen 处理。**零新增知识，纯元认知检查。**
- **合规性**：✅ 完全合规 —— 与课程内容无关的检查习惯，任何学段合法。
- **Abitur 应用**：全定量题；尤其 LK 弱酸 pH、`K_L`、Titrationskurve、Faraday。
- **来源**：`[CN-教材]`（数量级评价与特殊值法）+ `[CN-课标]`（学业要求中反复出现的「评价/检验」）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | I `Materialgebundene Aufgabe` / II `Fachpraktische Aufgabe` |
| Operator | `berechnen` / `ermitteln` / `abschätzen` / `auswerten` |
| AFB | I（计算）→ II（结果入关联）→ III（数据合理性反思） |
| 建议分值 / 时长 | 嵌入计算题末问，2–4 BE |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Eine Schülerin berechnet für eine 0,1-molare Essigsäure-Lösung einen pH-Wert von 1,0. Prüfen Sie das Ergebnis mit einer Größenordnungsprüfung und einer Grenzfallprobe.

**Aufgabe 2** `[NRW-改编]`
> Bei der Neutralisation von 1,0 mol HCl mit NaOH werden 5,7 kJ Wärme gemessen. Beurteilen Sie die Plausibilität des Messwerts mithilfe eines Ankerwerts.

**Aufgabe 3** `[原创]`
> Für ein Salz wird K_L = 1,0·10⁻⁴⁰ angegeben. Ein Schüler berechnet daraus eine Löslichkeit von 0,5 mol/L. Führen Sie einen Grenzfallcheck durch und korrigieren Sie den Fehler.

**Aufgabe 4** `[CN-改编]`
> In einer Messreihe sinkt c(H₂O₂) innerhalb von 10 s von 1,00 auf 0,90 mol/L. Ein Wert von v = 0,1 mol·L⁻¹·s⁻¹ wird notiert. Prüfen Sie Einheit, Größenordnung und Ansatz.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Grenzfallprobe**: 弱酸**不完全电离** → `c(H₃O⁺) < 0,1 mol/L` → `pH > 1` ✓ 得分点
2. **Größenordnungsprüfung**: 由 `K_S(CH₃COOH) ≈ 10⁻⁵` 估 `pH ≈ ½(pK_S − lg c) ≈ ½(4,75 + 1) ≈ 2,9` ✓
3. 结论：pH = 1,0 **不可能**（那等于强酸完全电离）；应为 ≈ 2,9 ✓ 得分点（**须给修正值**）

**Aufgabe 2**
1. **Ankerwert**: `ΔH_Neutralisation ≈ −57 kJ/mol` ✓
2. 1,0 mol → 预期 ≈ **57 kJ**；实测 5,7 kJ = **小一个数量级** ✓ 得分点
3. 结论：数据**不合理**，疑为 mol 数记录错或量热器热容未校正 ✓

**Aufgabe 3**
1. **Grenzfallprobe**: `K_L = 1,0·10⁻⁴⁰` 极小 → 溶解性应**极低**，`[Ionen] ≈ 10⁻²⁰ mol/L` 量级 ✓
2. `0,5 mol/L` 与 `K_L` 相差约 40 个数量级 → **明显错误** ✓ 得分点
3. 修正：`L = √(K_L) ≈ 10⁻²⁰ mol/L`（按 1:1 型）✓

**Aufgabe 4**
1. **Einheit**: `Δc/Δt = (0,10 mol/L)/(10 s) = 0,01 mol·L⁻¹·s⁻¹` —— 原值大 10 倍 ✓
2. **Ansatz**: 漏除时间间隔 ✓ 得分点
3. **Größenordnung**: 0,01 mol·L⁻¹·s⁻¹ 对过氧化氢分解合理 ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「量级对」当成「答案对」，忽略 Ansatz 呈示 | `berechnen` 必须写过程；自检不替代过程 |
| 知识错 | 用错锚点（如把 V_m 记成 24,5 L/mol 用在 0 °C） | §2.2 锚点须带条件记忆 |
| 表达错 | 只写「结果合理」而不给对照依据 | 写 `liegt im erwarteten Bereich, da …` + 具体锚点 |

---

## 7. Vernetzung

- **上游**：`05_Chemie/CN-Chemie-Formelhandbuch.md`（公式与量级检验句）
- **下游**：`05_Chemie/Q1-LK-Puffer-Titrationskurve-KL.md`、`05_Chemie/Thermodynamik-LK-zweiter-Hauptsatz-freie-Enthalpie.md`（ΔG 指数运算自检）
- **横向**：`05_Chemie/Darstellungsaufgaben-Diagramm-Tabelle-Gleichung.md`（单位与有效数字规范）
- **术语卡**：`Größenordnungsprüfung` / `Grenzfallprobe` / `Einheitenprobe` / `Plausibilität`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于本项目推导 · `[未获取到]` = 未找到，如实标注。
