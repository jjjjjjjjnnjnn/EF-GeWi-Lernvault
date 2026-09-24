---
fach: Chemie
thema: "Hess-Pfadmethode (Reaktionsenthalpie)"
operatoren: [berechnen, begruenden, erklaeren, herleiten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Chemie, Energetik]
stufe: "Q1"
kursart: "GK|LK"
---

# Hess-Pfadmethode (盖斯定律路径法：反应焓的加减)

> **中文理解**：`Satz von Hess` 是 Q-2 GK 的**明文内容重点** [已验证，KLP Q-2 GK Schwerpunkt 6]。它的唯一依据是「**焓是状态函数**」——反应焓只与始终态有关，与路径无关，所以已知反应可以像路段一样拼起来。德国 KLP 只写「计算 ΔH」，**未规定方法**；中国侧提供的是**三步操作化流程**与更高训练密度 [据推断，Mapping CN-Methode 8]。
>
> **Klausur-Relevanz**：GK-12（Hess 定律 + 标准反应焓）**直接命中**；GK-06 量热与中和焓、LK-05 溶解焓、LK-10 自由能计算都要先得 ΔH。AFB I/II。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Reaktionsenthalpie ΔH | 反应焓 | reaction enthalpy | 恒压下反应的热效应 | **ΔH < 0 放热**，ΔH > 0 吸热 |
| Zustandsfunktion | 状态函数 | state function | 只依赖状态、不依赖路径的量 | Hess 定律的唯一依据 |
| Satz von Hess | 盖斯定律 | Hess's law | 反应焓与路径无关，可分段相加 | Q-2 GK 明文内容 |
| Standardbildungsenthalpie ΔH_f° | 标准生成焓 | standard enthalpy of formation | 由单质生成 1 mol 物质的 ΔH | 单质 ΔH_f° = 0 |
| Standardreaktionsenthalpie ΔH_R° | 标准反应焓 | standard reaction enthalpy | 标准态下反应的 ΔH | `ΔH_R° = ΣΔH_f°(P) − ΣΔH_f°(E)` |
| Erster Hauptsatz | 热力学第一定律 | first law | 能量守恒（ΔU = q + w） | Q-1 GK-06，已教 |
| Kalorimetrie | 量热 | calorimetry | `Q = c·m·ΔT` 测热效应 | 中和焓的实验来源 |
| Neutralisationsenthalpie | 中和焓 | enthalpy of neutralisation | 强酸强碱中和 ≈ −57 kJ/mol | 量级锚点 |
| exotherm / endotherm | 放热 / 吸热 | exothermic / endothermic | ΔH < 0 / ΔH > 0 | 符号约定 |

---

## 2. 知识结构 (Struktur)

### 2.1 一条依据：焓是状态函数

Hess 定律的全部力量来自一句话：**ΔH 只取决于始终态**。因此从反应物到生成物，无论走几条路、经过多少中间物，总 ΔH 相同 [据推断，热力学常识]。

> *Klausur-Satz*: *Da die Enthalpie eine Zustandsfunktion ist, hängt die Reaktionsenthalpie nur von Anfangs- und Endzustand ab, nicht vom Reaktionsweg. Deshalb dürfen bekannte Reaktionen zu einem Pfad zusammengesetzt werden.*

### 2.2 三条操作规则（本笔记的核心）

| 操作 | 规则 | 记忆 |
|---|---|---|
| **系数** | 方程式系数 ×n → ΔH ×n | 焓随物质的量线性缩放 |
| **方向** | 方程式反转 → ΔH **变号** | 正反应放热，逆反应吸热 |
| **消去** | 中间物须**系数相同**且**在异侧**才能消去 | 同侧相加、异侧相减 |

> ⚠️ **最常翻车处**：中间物在**同侧**就贸然消去。必须先调方向，使其落在**异侧**，再调系数使**数值相同**。

> *Klausur-Satz*: *Wird eine Gleichung mit einem Faktor multipliziert, so wird auch ΔH mit diesem Faktor multipliziert; wird eine Gleichung umgekehrt, so ändert sich das Vorzeichen von ΔH. Zwischenprodukte dürfen nur gestrichen werden, wenn sie auf beiden Seiten in gleicher Menge auftreten.*

### 2.3 三步路径法（操作化）

1. **定位目标物质**：在已知方程式中找出目标反应的**反应物与生成物**。
2. **调整系数与方向**：让已知式里的目标物质出现在**与目标式相同的一侧**、**相同系数**。
3. **相加并消去中间物**：所有调整后的方程式相加，中间物自动消去，ΔH 同步相加。

> *Klausur-Satz*: *Bei der Pfadmethode werden zunächst die Zielstoffe lokalisiert, dann die bekannten Gleichungen durch Multiplikation und Umkehrung angepasst und schließlich addiert, wobei sich die Zwischenprodukte herauskürzen.*

### 2.4 特例：由标准生成焓直接算

当题目直接给**标准生成焓表**时，不必逐段拼路径，用总式 [据推断，Hess 定律的直接推论]：

```
ΔH_R° = Σ ΔH_f°(Produkte) − Σ ΔH_f°(Edukte)
```

⚠️ 单质（O₂、H₂、C 等）的 `ΔH_f° = 0`，最易漏。

> *Klausur-Satz*: *Die Standardreaktionsenthalpie ergibt sich aus der Summe der Standardbildungsenthalpien der Produkte minus der Summe der Standardbildungsenthalpien der Edukte; für Elemente im Standardzustand gilt ΔH_f° = 0.*

### 2.5 与量热的接口

量热实验给出的是 `Q = c·m·ΔT`，须除以物质的量才得 ΔH [据推断]：

```
ΔH = −Q / n      (ΔT > 0 表示放热，故加负号)
```

> ⚠️ 量级检验：强酸强碱中和焓 ≈ **−57 kJ/mol**，若算出 −570 或 −5.7，说明换算或单位错了 [据推断，常识锚点]。

### 2.6 ⚠️ 键能法的定位（合规边界）

中国常用**键能法**（`ΔH ≈ Σ键能(反应物) − Σ键能(生成物)`）估算 ΔH。但德国 KLP **未把键能表列为内容重点** → **只作验算手段，不作主方法** [已验证，Mapping CN-Methode 8 限制]。

---

## 3. 解题方法 (Methoden)

### 3.1 三步路径法标准程序（`berechnen` / `herleiten`）

1. **写目标方程式**，标出要消去的中间物。—— *KLP 工具：`Satz von Hess`*
2. **逐条调整已知式**：先定方向（异侧），再定系数（相同）。—— *KLP 工具：焓的线性与反号*
3. **相加**，核对中间物全部消去、目标式两侧原子守恒。—— *KLP 工具：原子守恒*
4. **同步相加 ΔH**（含符号与系数）。—— *KLP 工具：`Standardreaktionsenthalpie`*
5. **量级检验**：结果落在合理范围（如燃烧 ≈ −10²–10³ kJ/mol）。—— *KLP 工具：Kalorimetrie 常识锚点*

> **判据 / 决策点**：题目给**多个反应方程式** → 走三步路径法；题目给**生成焓表** → 走 2.4 总式；题目给**量热数据** → 先 `Q = c·m·ΔT` 再除以 n。

### 3.2 由生成焓求反应焓（`berechnen`）

1. 写出配平的目标方程式。
2. 查表抄 `ΔH_f°`（注意单质为 0、系数要乘）。
3. 代入 `ΔH_R° = Σ(P) − Σ(E)`。
4. 量级检验 + 符号检验（放热须为负）。

> **判据 / 决策点**：出现 `herleiten` → 必须显式写出「焓是状态函数」这一依据；只写答案不给分 [已验证，`berechnen` 官方释义要求呈示 Ansatz]。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 盖斯定律的「路径法」（反应焓的加减）

- **技法内容**：把目标反应看作**起点到终点的路径**，已知反应是可拼接的路段。三步——① 定位目标物质；② 调整系数（ΔH ×n）与方向（ΔH 变号）；③ 相加并消去中间物（须系数相同且在异侧）。核心依据是「**焓是状态函数，只与始终态有关**」。
- **DE-Anschluss**：`Satz von Hess`（Q-2 GK 明文列出）· `Standardreaktionsenthalpien`（GK 明文）· `Erster Hauptsatz`（Q-1 GK-06）· `Neutralisationsenthalpie` 与 `Kalorimetrie`（GK-06）· LK 的 `Lösungsenthalpie`。
- **合规性**：✅ —— **零新增知识**：盖斯定律本身就是德国 GK 的内容重点，中国侧提供的只是**三步操作化流程**与更高训练量。⚠️ 限制：**键能法只作验算**，不作主方法。
- **Abitur 应用**：GK-12（Hess + 标准反应焓）**直接命中**；GK-06 量热与中和焓；LK-05 溶解焓；LK-10 自由能计算先得 ΔH。AFB I/II。
- **来源**：`[CN-课标]` 选必1 1.2「恒温恒压反应热 = 焓变」+「盖斯定律及其简单应用」+ 学业要求「反应焓变的简单计算、热化学方程式书写」；`[CN-高考]` 路径法套路（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（数据表/热化学方程式绑定）[已验证] |
| Operator | `berechnen` / `begruenden` / `erklaeren` / `herleiten` |
| AFB | I–II（路径计算）→ III（为何可加、符号讨论） |
| 建议分值 / 时长 | 单小题约 5–9 BE；常与电化学/量热题合并 |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Gegeben:
> (1) `C(s) + O₂(g) → CO₂(g)`，ΔH₁ = −393 kJ/mol
> (2) `CO(g) + ½ O₂(g) → CO₂(g)`，ΔH₂ = −283 kJ/mol
> **a)** Berechnen Sie die Reaktionsenthalpie für `C(s) + ½ O₂(g) → CO(g)` mithilfe der Pfadmethode.
> **b)** Erläutern Sie, warum das Addieren von Reaktionsenthalpien zulässig ist.

**Aufgabe 2** `[原创]`
> Für die Zersetzung gilt: `CaCO₃(s) → CaO(s) + CO₂(g)`，ΔH = +178 kJ/mol.
> **a)** Berechnen Sie ΔH für die Rückreaktion `CaO(s) + CO₂(g) → CaCO₃(s)`.
> **b)** Begründen Sie das Vorzeichen.

**Aufgabe 3** `[NRW-改编]`
> Gegeben: `2 H₂(g) + O₂(g) → 2 H₂O(l)`，ΔH = −572 kJ/mol.
> **a)** Berechnen Sie ΔH für `H₂(g) + ½ O₂(g) → H₂O(l)`.
> **b)** Geben Sie an, welche der drei Operatorenregeln (2.2) Sie benutzt haben.

**Aufgabe 4** `[CN-改编]`
> Gegeben:
> (1) `C(s) + O₂(g) → CO₂(g)`，ΔH₁ = −394 kJ/mol
> (2) `H₂(g) + ½ O₂(g) → H₂O(l)`，ΔH₂ = −286 kJ/mol
> (3) `CH₄(g) + 2 O₂(g) → CO₂(g) + 2 H₂O(l)`，ΔH₃ = −891 kJ/mol
> **a)** Bestimmen Sie ΔH für `C(s) + 2 H₂(g) → CH₄(g)`.
> **b)** Kennzeichnen Sie, welche Gleichung Sie umgekehrt bzw. mit welchem Faktor multipliziert haben.

**Aufgabe 5** `[NRW-改编]`
> Standardbildungsenthalpien (kJ/mol): C₂H₅OH(l) = −278；CO₂(g) = −394；H₂O(l) = −286；O₂(g) = 0.
> **a)** Berechnen Sie ΔH_R° für die vollständige Verbrennung von Ethanol: `C₂H₅OH(l) + 3 O₂(g) → 2 CO₂(g) + 3 H₂O(l)`.
> **b)** Beurteilen Sie das Ergebnis im Hinblick auf die Eignung von Ethanol als Energieträger.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a)** 目标式 = (1) − (2)：`C + O₂ − CO − ½O₂ → CO₂ − CO₂` → `C + ½ O₂ → CO` ✓ 得分点（**方向调整：把 (2) 反转**）
2. `ΔH = ΔH₁ − ΔH₂ = −393 − (−283) = −110 kJ/mol` ✓ 得分点（**符号与数值都对**）
3. **b)** 焓是**状态函数**，ΔH 只与始终态有关 → 可分段相加 ✓ 得分点（**必须点「状态函数」**）

**Aufgabe 2**
1. **a)** 逆反应 ΔH = **−178 kJ/mol** ✓ 得分点（**仅变号**）
2. **b)** 正反应吸热（+178），则逆反应放热（−178），符合「反转变号」规则 ✓ 得分点

**Aufgabe 3**
1. **a)** 系数除以 2 → `ΔH = −572 / 2 = −286 kJ/mol` ✓ 得分点
2. **b)** **系数规则**（方程式 ÷2 → ΔH ÷2）✓ 得分点

**Aufgabe 4**
1. **a)** 目标 = (1) + 2·(2) − (3)：
   `C + O₂ + 2H₂ + O₂ − CH₄ − 2O₂ → CO₂ + 2H₂O − CO₂ − 2H₂O`
   → `C + 2 H₂ → CH₄` ✓ 得分点
2. `ΔH = −394 + 2(−286) − (−891) = −394 − 572 + 891 = −75 kJ/mol` ✓ 得分点（**−75 kJ/mol 是甲烷的标准生成焓，量级合理**）
3. **b)** (2) 乘 2；(3) **反转**（ΔH 变号）✓ 得分点

**Aufgabe 5**
1. **a)** `ΔH_R° = [2(−394) + 3(−286)] − [(−278) + 3·0]`
   `= (−788 − 858) − (−278) = −1646 + 278 = −1368 kJ/mol` ✓ 得分点（**单质 O₂ 记 0；系数已乘入**）
2. **b)** 每 mol 乙醇放热约 **1368 kJ**，能量密度高、燃烧产物为 CO₂ 与 H₂O → 作为燃料效率高；但须**全链评价**（制取能耗与碳排放），不能只看使用端 ✓ 得分点（**必须落到全链视角**，只谈放热不给满分）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 中间物在**同侧**就强行消去 | 先调方向使中间物落**异侧**，再调系数 |
| 知识错 | 反转方程式**忘记变号**；系数乘了但 ΔH 没乘；生成焓计算漏「单质 = 0」 | 三步规则逐条核对；生成焓题先把 O₂ 等单质写成 0 |
| 表达错 | 只写 ΔH 数值不给路径拼接过程；量热题忘记除以 n | `berechnen` 须呈示 Ansatz；`Q → ΔH` 必除以物质的量 |
| 越界错 | 用**键能法**当主方法 | 键能法只作验算；主方法用路径法或生成焓法 |

---

## 7. Vernetzung

- **上游**：`Elektrochemie-Vier-Elemente-Raster.md`（Q-2 领域入口）· Q-1 `Erster Hauptsatz` 与 `Kalorimetrie`（已教）
- **下游**：`Elektrochemie-Q1-Grundlagen.md`（电化学与能量）· LK 增量（`freie Enthalpie` + Gibbs-Helmholtz 须先得 ΔH）
- **横向**：`03_Mathe` 线性运算（系数缩放与符号）· `02_Physik` 能量守恒
- **术语卡**：`Satz von Hess` / `Reaktionsenthalpie` / `Standardbildungsenthalpie` / `Zustandsfunktion` / `Kalorimetrie`（建议加入 csv）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）或本项目已核文件确认 · `[据推断]` = 基于本项目推导或通用化学规则 · `[未获取到]` = 未找到，如实标注。
> ⛔ **本笔记不涉及**：盐类水解体系 · 杂化轨道 / 晶体四分类 / 电子排布式 · 配合物系统板块。
