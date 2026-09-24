---
fach: Chemie
thema: "Elektrochemie Q1 Grundlagen"
operatoren: [beschreiben, erklaeren, berechnen, begruenden, ordnen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Chemie, Elektrochemie]
stufe: "Q1"
kursart: "GK"
---

# Elektrochemie Q1 Grundlagen (电化学 Q1 入门：原电池 + 电动势序列 + Zellspannung)

> **中文理解**：Q-2 的第一块地基。**氧化还原 = 电子转移**（Donator-Akzeptor 原理的深化），把自发的氧化还原拆成两个半电池，就得到**原电池**（`galvanische Zelle`）。判两极、判方向、算电动势，靠的是**电动势序列**（`elektrochemische Spannungsreihe`）这张现成的表。这是全新领域，不是 EF 知识的加深——EF 里没有 redox 体系化、没有电化学。
>
> **Klausur-Relevanz**：Q-2 现有笔记**完全零覆盖** [已验证，见 `Lernbaum-Chemie.md §4`]。本笔记与 `Elektrochemie-Vier-Elemente-Raster.md` 配套：Raster 管「装置有什么」，本笔记管「为什么这样、电动势怎么算」。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Redoxreaktion | 氧化还原反应 | redox reaction | 电子转移反应（Donator-Akzeptor） | Q-2 GK-08 第一考点 |
| Oxidation / Reduktion | 氧化 / 还原 | oxidation / reduction | 失电子 / 得电子 | 必同时发生 |
| Oxidationsmittel | 氧化剂 | oxidising agent | 得电子者（自身被还原） | ⚠️ 易与「被氧化的物质」混 |
| Reduktionsmittel | 还原剂 | reducing agent | 失电子者（自身被氧化） | |
| Oxidationszahl | 氧化数 | oxidation number | 形式电荷的记账 | 判电子转移的量 |
| Halbzelle / Halbreaktion | 半电池 / 半反应 | half-cell / half-reaction | 只写氧化或还原一半 | 原电池的最小单元 |
| galvanische Zelle | 原电池 | galvanic cell | 两个半电池组成，化学能→电 | |
| Diaphragma / Salzbrücke | 隔膜 / 盐桥 | diaphragm / salt bridge | 维持离子导通与电中性 | 属「离子导体」 |
| elektrochemische Spannungsreihe | 电动势序列 | electrochemical series | `E°` 排序表 | 判定工具 |
| Standardelektrodenpotential `E°` | 标准电极电势 | standard electrode potential | 以 `H₂/H₃O⁺` 为 0 V 基准 | 单位 V |
| Zellspannung `ΔE` | 电池电动势 | cell voltage | `ΔE = E°(Kathode) − E°(Anode)` | 恒为正 |

---

## 2. 知识结构 (Struktur)

### 2.1 从「电子转移」到「原电池」：为什么要拆成两半

若把 `Zn + Cu²⁺ → Zn²⁺ + Cu` 直接放在同一容器，电子转移是**无序**的，化学能变成热。把氧化与还原**分置两处**、用导线连接，电子就**定向**流动 → 电能 [据推断]。

- **阳极（Anode）**：氧化，`Zn → Zn²⁺ + 2 e⁻`，是原电池的**负极**。
- **阴极（Kathode）**：还原，`Cu²⁺ + 2 e⁻ → Cu`，是原电池的**正极**。

> *Klausur-Satz*: *Wird eine Redoxreaktion räumlich in zwei Halbzellen getrennt, so fließen die Elektronen über den äußeren Stromkreis gerichtet von der Anode zur Kathode; die freigesetzte Energie ist damit als elektrische Energie nutzbar.*

### 2.2 电动势序列的三条用法

1. **判两极**：`E°` 较高者得电子 → 阴极；较低者失电子 → 阳极。
2. **判反应方向**：自发方向是「强氧化剂 + 强还原剂 → 弱还原剂 + 弱氧化剂」。
3. **算电动势**：`ΔE = E°(Kathode) − E°(Anode)`，结果**恒为正**；`ΔE` 越大，反应驱动力越强。

> **判据 / 决策点**：算得 `ΔE < 0` → **两极判反**，回查序列，不要硬改符号。

> *Klausur-Satz*: *Das Redoxpotential wird aus der elektrochemischen Spannungsreihe abgelesen. Die Halbzelle mit dem höheren Standardpotential bildet die Kathode, die mit dem niedrigeren die Anode.*

### 2.3 常见标准电极电势（`E°`，25 °C）[据推断，常用参考值]

| Halbzelle | `E°` (V) | 相对强弱 |
|---|---|---|
| `Li⁺/Li` | −3,05 | 极强还原剂 |
| `Zn²⁺/Zn` | −0,76 | 较强还原剂 |
| `Fe²⁺/Fe` | −0,44 | |
| `H₃O⁺/H₂` | 0,00 | **基准** |
| `Cu²⁺/Cu` | +0,34 | |
| `Ag⁺/Ag` | +0,80 | 较强氧化剂 |
| `Au³⁺/Au` | +1,50 | 极强氧化剂 |

> ⚠️ 数值以官方 Formeldokument 为准；本表仅供量级对照 [据推断]。

### 2.4 原电池与电解池的分界

| | 原电池（galvanisch） | 电解池（Elektrolyse） |
|---|---|---|
| 驱动力 | 自发（`ΔE > 0`） | 被迫（外加电源） |
| 能量 | 化学 → 电 | 电 → 化学 |
| 阳极 | 负极 | 接电源**正极** |
| 阴极 | 正极 | 接电源**负极** |
| GK 定量 | `ΔE` 计算 | 产物判断（**GK 不要求 Faraday 定量**，LK 才要求）[已验证] |

---

## 3. 解题方法 (Methoden)

### 3.1 原电池三问法（`berechnen` / `begruenden` 标准程序）

**编号步骤**：
1. **写两个半反应**，各自配平（电子数相等）。—— *KLP 工具：`Redoxreaktionen als Elektronenübertragungsreaktionen`*
2. **查 `Spannungsreihe` 定两极**：`E°` 高者阴极、低者阳极。—— *KLP 工具：`elektrochemische Spannungsreihe`*
3. **算 `ΔE = E°(Kathode) − E°(Anode)`**，检查为正。—— *KLP 工具：`Berechnung der Zellspannung`*
4. **补全流向**：电子外电路 阳极→阴极；离子内电路（阳离子向阴极）。—— *KLP 工具：`Elektronengasmodell` + `Ionenbindung`*

> **判据 / 决策点**：题目只给装置图 → 先查序列；只给 `E°` 数据 → 先判两极。**`ΔE` 的符号就是自检器。**

### 3.2 配平的电子守恒自检

1. 拆半反应，各自平衡原子与电荷。
2. 乘系数使**两边电子数相等**。
3. 合并、约去电子，检查**原子守恒 + 电荷守恒**双查。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 电子守恒 + 「四要素」拼装（CN-Methode 3 / 5）

- **技法内容**：① **电子守恒**——氧化剂得电子数 = 还原剂失电子数，是 redox 配平与电化学定量的核心；② **四要素拼装**——把装置装进「电极反应 / 电极材料 / 离子导体 / 电子导体」四格，再判流向。两条合起来即原电池题的完整流程。
- **DE-Anschluss**：`Redoxreaktionen als Elektronenübertragungsreaktionen`（GK-08）· `elektrochemische Spannungsreihe` 与 `Berechnung der Zellspannung`（GK-09）· `Metallbindung / Elektronengasmodell`（正对电子导体）· `Ionenbindung` 与离子迁移（正对离子导体）。
- **合规性**：✅ —— 守恒律是**普遍原理**，不是中国特有知识块；四要素是课标明文的框架。
- **Abitur 应用**：GK-08 配平自检 · GK-09 原电池与 `ΔE` 计算 · GK-10 电解 · GK-11 腐蚀。AFB I/II。
- **来源**：`[CN-课标]` 必修2.2（氧化还原本质 = 电子转移）+ 必修3.4（原电池构成要素）；`[CN-高考]` 电子守恒配平。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（装置图/材料）[已验证] |
| Operator | `beschreiben` / `erklaeren` / `berechnen` / `begruenden` / `ordnen` |
| AFB | I–II（描述与计算）→ III（方案论证） |
| 建议分值 / 时长 | 单题约 6–10 BE；GK 整卷 255 min |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ordnen Sie folgende Halbzellen nach steigendem Standardpotential: Ag⁺/Ag (+0,80 V), Zn²⁺/Zn (−0,76 V), Cu²⁺/Cu (+0,34 V), H₃O⁺/H₂ (0,00 V).
> Geben Sie an, welche Kombination die größte Zellspannung liefert, und begründen Sie Ihre Wahl.

**Aufgabe 2** `[原创]`
> Eine galvanische Zelle besteht aus einer Silberhalbzelle (Ag⁺/Ag, E° = +0,80 V) und einer Zinkhalbzelle (Zn²⁺/Zn, E° = −0,76 V).
> **a)** Formulieren Sie beide Halbreaktionen und die Gesamtreaktion.
> **b)** Berechnen Sie die Zellspannung.
> **c)** Beschreiben Sie die Wanderungsrichtung der Elektronen und der Kationen.

**Aufgabe 3** `[CN-改编]`
> Bei einer unbekannten Zelle wird experimentell eine Zellspannung von ΔE = 1,10 V gemessen. Es wird vermutet, dass es sich um eine Kupfer-Zink-Zelle handelt.
> **a)** Prüfen Sie die Vermutung rechnerisch.
> **b)** Beurteilen Sie, ob das Vorzeichen der berechneten Spannung als Kontrolle für die richtige Zuordnung von Anode und Kathode dienen kann.

### 5.3 Musterlösung

**Aufgabe 1**
1. 排序：`Zn²⁺/Zn (−0,76) < H₃O⁺/H₂ (0,00) < Cu²⁺/Cu (+0,34) < Ag⁺/Ag (+0,80)` ✓ 得分点
2. 最大 `ΔE`：取**最低作阳极、最高作阴极** → `Zn/Ag` ✓
3. `ΔE = 0,80 − (−0,76) = 1,56 V` ✓ 得分点（差值最大即驱动力最大）

**Aufgabe 2**
1. a) Anode: `Zn → Zn²⁺ + 2 e⁻`；Kathode: `Ag⁺ + e⁻ → Ag`（×2）✓
2. Gesamt: `Zn + 2 Ag⁺ → Zn²⁺ + 2 Ag` ✓ 得分点（**电子数须相等**）
3. b) `ΔE = 0,80 − (−0,76) = 1,56 V` ✓ 得分点
4. c) Elektronen：外电路 Zn→Ag；Kationen（Ag⁺）：向**阴极（Ag 侧）**迁移 ✓ 得分点

**Aufgabe 3**
1. a) `ΔE = E°(Cu/Cu²⁺) − E°(Zn/Zn²⁺) = 0,34 − (−0,76) = 1,10 V` ✓ 得分点
2. 与实测一致 → 推测**成立** ✓
3. b) **可以**：正确的阴阳极分配必给出 `ΔE > 0`；若算得负值，说明两极判反，须交换 ✓ 得分点（对应「判据/决策点」）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「氧化剂」说成「被氧化的物质」（实为**被还原**）；把活泼金属与电势高低对应记反 | 四格表：氧化剂=得电子=被还原 |
| 知识错 | 两极减序搞反导致 `ΔE < 0`；把原电池的阴极当成负极 | `ΔE > 0` 是自检；原电池 阳极=负极、阴极=正极 |
| 表达错 | 半反应电子数不等就合并；漏写离子迁移方向 | 先配平电子数；流向必须写 |

---

## 7. Vernetzung

- **上游**：`Elektrochemie-Vier-Elemente-Raster.md`（四要素框架）· `Chemie-EF-Grundlagen-Training.md`（氧化数、配平）
- **下游**：`Elektrochemie-Vier-Elemente-Raster.md`（防腐 / 电解）· LK 增量（Nernst / Faraday / ΔG，本项目待补）
- **横向**：`02_Physik` 电路与电动势；`06_Bio` 生物电化学（神经膜电位）
- **术语卡**：`Anode` / `Kathode` / `Spannungsreihe` / `Standardelektrodenpotential` / `Zellspannung`（建议加入 csv）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）确认 · `[据推断]` = 基于本项目推导或常用数值 · `[未获取到]` = 未找到，如实标注。
