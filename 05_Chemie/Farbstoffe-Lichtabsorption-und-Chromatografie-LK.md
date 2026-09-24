---
fach: Chemie
thema: "Farbstoffe, Lichtabsorption und Chromatografie"
operatoren: [erlaeutern, erklaeren, auswerten, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Chemie, Farbstoffe]
stufe: "Q2"
kursart: "LK"
---

# Farbstoffe, Lichtabsorption und Chromatografie (染料、光吸收与色谱)

> **中文理解**：物质**显色**的根源是它**吸收可见光的某一部分**——我们看到的颜色是被吸收色的**补色**。LK 把「染料」做成独立大板块：`Einteilung / Struktur / Eigenschaften / Verwendung` + `Lichtabsorption` + `mesomere Grenzstrukturen`（中介结构）+ `Delokalisation`（离域）+ **Donator-Akzeptor-Gruppen** + **吸收光谱解读**；并增加 `Chromatografie`（含 **`R_f` 值**解读）[已验证，`Chemie-Oberstufe.md` §Q-3 LK 增量表]。
> **⚠️ 中国完全空白**：中国课标**无染料显色板块**，也无「吸收光谱解读」与「R_f」作为独立考点 [已验证，Mapping LK-14 判为 `DE-only`；LK-15 色谱为 `both-de-deeper`]。**必须从零建**；前置是 `Mesomerie`（LK-12）。
>
> **Klausur-Relevanz**：LK 独立大板块，是 `Basiskonzept Aufbau und Eigenschaften`（结构→性质）最漂亮的落点；`Chromatografie` 属工具层必记考点。常以「材料给吸收光谱 + 结构式 → 解释颜色 / 比较 λ_max」出 AFB II 题。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Farbstoff | 染料 | dye | 能吸收可见光而显色的物质 | LK 独立板块 |
| Lichtabsorption | 光吸收 | light absorption | 分子吸收光子、电子被激发 | 显色的根源 |
| Komplementärfarbe | 补色 | complementary colour | 吸收色 ↔ 观察色 | 显色判据 |
| Absorptionsspektrum | 吸收光谱 | absorption spectrum | 吸光度 ~ 波长曲线 | LK 明文解读 [已验证] |
| λ_max | 最大吸收波长 | absorption maximum | 吸收最强处的波长 | 结构比较用 |
| Extinktion `E` | 吸光度 | absorbance | 吸收强度（无量纲） | 峰值高低 |
| Mesomerie / Delokalisation | 中介 / 离域 | mesomerism / delocalisation | 电子在多中心分布 | LK-12 前置 [已验证] |
| mesomere Grenzstrukturen | 中介极限结构 | mesomeric structures | 同一分子的多个电子分布写法 | 解释离域 |
| Donator-Akzeptor-Gruppen | 给/吸电子基团 | donor/acceptor groups | 推/拉电子，改变离域范围 | **LK 明文** [已验证] |
| konjugiertes System | 共轭体系 | conjugated system | 交替单双键的电子离域链 | 决定 λ_max |
| Chromatografie | 色谱 | chromatography | 利用分配差异分离混合物 | LK 独立 Verfahren |
| Retentionsfaktor `R_f` | 比移值 | retention factor | `R_f = 斑点距离 / 展开剂前沿距离` | LK 明文 [已验证] |
| stationäre / mobile Phase | 固定相 / 流动相 | stationary/mobile phase | 不动的吸附相 / 移动的展开剂 | R_f 的两个决定者 |

---

## 2. 知识结构 (Struktur)

### 2.1 显色的物理基础：吸收 = 电子跃迁

可见光波长约 **400–750 nm**。分子吸收某一波段的光子，其能量恰好使**电子跃迁**到更高能级 [据推断，光吸收原理]：

```
E = h · c / λ        （h = 6,626·10⁻³⁴ J·s；c = 3,00·10⁸ m/s）
```

吸收的能量越大（λ 越短）→ 所需跃迁能级差越大。**未被吸收的（反射/透射）光进入眼睛，即为所见颜色**——它与吸收色互为 `Komplementärfarbe`。

| 吸收波长 | 吸收色 | 观察到（补色） |
|---|---|---|
| ~400–430 nm | 紫 | 黄绿 |
| ~430–480 nm | 蓝 | 橙 |
| ~480–530 nm | 绿 | 红 |
| ~530–580 nm | 黄 | 紫 |
| ~580–750 nm | 橙/红 | 蓝/绿 |

> *Klausur-Satz*: *Ein Stoff erscheint farbig, weil er Licht bestimmter Wellenlängen absorbiert; die wahrgenommene Farbe ist die Komplementärfarbe der absorbierten Strahlung. Die Absorption entspricht einem Elektronenübergang, dessen Energie durch E = h·c/λ gegeben ist.*

### 2.2 结构决定颜色：共轭体系越大，λ_max 越长

`Mesomerie` 与 `Delokalisation` 使电子分布在**整个共轭体系**上；共轭链越长，电子越离域，**能级差越小 → 吸收越红移（λ_max 变大）** [据推断，染料结构-颜色关系]：

```
共轭体系 ↑  →  ΔE（能级差）↓  →  λ_max ↑（红移 / bathochrom）
```

**Donator-Akzeptor-Gruppen** 通过推/拉电子**进一步扩大离域范围**，同样使 λ_max 红移（这也是许多染料分子两端带 `−NH₂` / `−NO₂` 的原因）[已验证，KLP LK 明文列 Donator-Akzeptor-Gruppen]。

> *Klausur-Satz*: *Je größer das konjugierte System und je stärker die Delokalisation der Elektronen, desto kleiner ist der Energieunterschied zwischen den beteiligten Zuständen und desto länger ist die Wellenlänge des absorbierten Lichts (Rotverschiebung). Donator- und Akzeptorgruppen vergrößern die Delokalisation zusätzlich.*

### 2.3 吸收光谱怎么读（`auswerten` / `interpretieren`）

1. **找 λ_max**：曲线峰值对应吸收最强的波长。
2. **由 λ_max 反推颜色**：查 2.1 表 → 得吸收色 → 补色即观察色。
3. **比较 λ_max**：λ_max 越大 → 共轭体系越大 / 离域越强 → 颜色越偏红。
4. **看峰高（Extinktion）**：与浓度、吸收强度相关（定性比较用）。

> ⚠️ **红线**：吸收光谱只给「吸收什么光」，**颜色必须换算成补色**才能说出口——直接把吸收色当观察色是最常见的失分 [据推断]。

> *Klausur-Satz*: *Aus dem Absorptionsspektrum entnimmt man die Wellenlänge des Maximums. Über die Komplementärfarbe ergibt sich daraus die sichtbare Farbe des Stoffes; ein größeres λ_max deutet auf ein ausgedehnteres konjugiertes System hin.*

### 2.4 色谱与 R_f 值（工具层考点）

`Chromatografie` 利用混合物各组分在**固定相（stationäre Phase）**与**流动相（mobile Phase）**之间**分配系数不同**而分离 [据推断，色谱原理]：

```
R_f = 斑点中心移动距离 / 流动相前沿移动距离       （0 ≤ R_f ≤ 1）
```

- `R_f` 是**物质在给定条件下的特征值** → 与**标准品对照**即可**鉴定**物质。
- 极性大 / 与固定相亲和强的组分：**移动慢 → R_f 小**；反之 R_f 大。
- ⚠️ `R_f` **依赖条件**（固定相、流动相、温度），必须**同条件**才能比较。

> *Klausur-Satz*: *Der Retentionsfaktor R_f ist das Verhältnis der Laufstrecke einer Substanz zur Laufstrecke des Laufmittels. Er ist unter identischen Bedingungen stoffspezifisch und dient daher zur Identifizierung, indem man ihn mit dem R_f-Wert einer Referenzsubstanz vergleicht.*

---

## 3. 解题方法 (Methoden)

### 3.1 颜色解释标准程序（`erlaeutern` / `erklaeren`）

1. **定位吸收波长**：由光谱或题干得 λ_max。—— *KLP 工具：`Absorptionsspektrum`*
2. **换算补色**：查 2.1 表得吸收色 → 补色为观察色。—— *KLP 工具：`Komplementärfarbe`*
3. **结构解释**：指认共轭体系 / Donator-Akzeptor-Gruppen → 说明离域范围。—— *KLP 工具：`Mesomerie` / `Delokalisation`*
4. **回扣 λ_max**：离域越大 → λ_max 越长。—— *KLP 工具：结构-性质关联（Basiskonzept Aufbau）*

> **判据 / 决策点**：题目**给结构式比较颜色** → 比「共轭体系大小 + 推拉电子基团」；**给光谱** → 先读 λ_max 再换算补色。

### 3.2 R_f 值计算与鉴定标准程序（`berechnen` / `auswerten`）

1. **量两条距离**：斑点中心距起点、流动相前沿距起点（同一把尺、同一基线）。—— *KLP 工具：`Chromatografie`*
2. **算 R_f**：`R_f = 斑点距离 / 前沿距离`（保留两位小数）。—— *KLP 工具：`Retentionsfaktor`*
3. **与标准对照**：同条件同 `R_f` → 判为同一物质。—— *KLP 工具：`interpretieren`*
4. **合理性检验**：`0 ≤ R_f ≤ 1`；若 > 1 说明量错了前沿。—— *KLP 工具：`Größenordnungsprüfung`*

> **判据 / 决策点**：题干给「多个斑点」→ 逐个算 `R_f` 并**按大小排序**（极性判断）。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 共轭/离域的「结构-颜色」判读（**中国无此板块，只作零基础脚手架**）

- **技法内容**：中国课标**无染料显色板块**，仅**选修1《实验化学》**涉及色谱分离（**不在高考主力范围**）[已验证，Mapping LK-14/15]。可借用的只有**通用直觉**：① 「**共轭体系越长颜色越深**」的定性规律（中国在有机/材料常识中出现，非课标条目）；② 「**相似相溶 / 分配**」概念用于色谱（中国化学在萃取、分离中出现）。
- **DE-Anschluss**：`Mesomerie` 与 `mesomere Grenzstrukturen`（**LK-12，德国提供**）· `Delokalisation` · `Lichtabsorption` · `Donator-Akzeptor-Gruppen` · `Chromatografie` 与 `R_f`（**LK 明文，德国提供**）。⚠️ 关键：**显色板块的框架、术语（λ_max / Komplementärfarbe / R_f）与解读要求，全部来自德国 LK**；中国侧**不提供**等价知识块。
- **合规性**：⚠️ **低可用** —— 中国侧可迁移的只有「共轭/分配」的**朴素直觉**；⚠️ **严禁**把中国**选修1 的色谱操作细节**（如具体吸附剂/展开剂配方）与**任何超出 KLP 的显色理论**（如分子轨道）带入。**本板块须以德国 LK 术语从零建立**。
- **Abitur 应用**：**LK-14（Farbstoffe + 光吸收 + 吸收光谱）** 与 **LK-15（Chromatografie + R_f）** 直接命中。AFB II（解读）/III（结构-性质评价）。依赖前置 `Mesomerie`（LK-12）。
- **来源**：`[CN-课标]` 选修1《实验化学》分离与提纯（**选修，非主力**）；`[CN-教材]` 共轭/分配常识（**只记方法名**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（给吸收光谱图 / 结构式 / 色谱图）[已验证] |
| Operator | `erlaeutern` / `erklaeren` / `auswerten` / `interpretieren` / `beurteilen` |
| AFB | II（读谱、算 R_f）→ III（结构-颜色关系论证与评价） |
| 建议分值 / 时长 | 单小题约 4–8 BE；常与 Mesomerie / 结构题合并 |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Das Absorptionsspektrum eines Farbstoffs zeigt ein Maximum bei λ_max = 450 nm.
> **a)** Erläutern Sie, welche Farbe der Farbstoff für den Betrachter hat, und begründen Sie Ihre Aussage.
> **b)** Berechnen Sie die Energie eines absorbierten Photons (h = 6,626·10⁻³⁴ J·s, c = 3,00·10⁸ m/s).

**Aufgabe 2** `[原创]`
> Zwei Farbstoffe werden verglichen: Farbstoff A besitzt ein kurzes konjugiertes System, Farbstoff B ein deutlich längeres mit zusätzlichen Donator- und Akzeptorgruppen.
> **a)** Erklären Sie, welcher Farbstoff das Licht längerer Wellenlänge absorbiert.
> **b)** Begründen Sie Ihre Entscheidung mithilfe der Delokalisation.

**Aufgabe 3** `[NRW-改编]`
> In einer Dünnschichtchromatografie wandert der Laufmittel-Front 8,0 cm. Farbstoff X zeigt einen Fleck bei 3,2 cm, Farbstoff Y bei 5,6 cm.
> **a)** Berechnen Sie die R_f-Werte beider Farbstoffe.
> **b)** Deuten Sie, welcher Farbstoff polarer ist, und begründen Sie Ihre Aussage.

**Aufgabe 4** `[NRW-改编]`
> Zur Identifizierung eines unbekannten Farbstoffs wird seine R_f-Bestimmung mit einer Referenzprobe verglichen; zusätzlich liegt ein Absorptionsspektrum vor.
> **a)** Beurteilen Sie, welche Aussagekraft der Vergleich der R_f-Werte hat.
> **b)** Geben Sie an, welche Bedingungen konstant gehalten werden müssen.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a)** λ_max = 450 nm 属蓝光区 → 吸收**蓝**光 → 观察色为**橙**（补色）✓ 得分点（**必须做补色换算**）
2. **b)** `E = h·c/λ = (6,626·10⁻³⁴ · 3,00·10⁸) / (450·10⁻⁹)` ✓ 得分点
3. `E ≈ 1,99·10⁻²⁵ / 4,5·10⁻⁷ ≈ 4,4·10⁻¹⁹ J` ✓（量级检验：可见光光子约 10⁻¹⁹ J ✓）

**Aufgabe 2**
1. **a)** **Farbstoff B** 吸收更长波长的光 ✓ 得分点
2. **b)** 更长的共轭体系 + Donator/Akzeptor 基团 → 电子**离域范围更大** → 能级差更小 → 吸收能量更小、波长更长（红移）✓ 得分点（**须点「离域越大 → 能级差越小」**）

**Aufgabe 3**
1. **a)** `R_f(X) = 3,2 / 8,0 = 0,40` ✓ 得分点
2. `R_f(Y) = 5,6 / 8,0 = 0,70` ✓ 得分点
3. **b)** X 的 `R_f` 小 → 移动慢 → 与固定相亲和更强 → **X 极性更大** ✓ 得分点（**极性大 → 移动慢 → R_f 小**）

**Aufgabe 4**
1. **a)** 同条件下 `R_f` 为**特征值**，与标准品一致可**支持同一物质**的判定；但 `R_f` **依赖条件**，单独一项不足以确证，须结合吸收光谱等其他证据 ✓ 得分点（**须点「单一证据不足」**）
2. **b)** 必须恒定：固定相、流动相、温度、展开距离（基线一致）✓ 得分点

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把**吸收色**直接说成**观察色**（吸收蓝却说「显蓝」） | 一律做**补色换算**：吸收蓝 → 显橙 |
| 知识错 | 认为共轭越长 λ_max 越短；`R_f` 算反（前沿/斑点） | 记「离域大 → 能级差小 → 波长长」；`R_f = 斑点/前沿`（分子小于分母） |
| 表达错 | `R_f` 不保留小数或写成百分数；比较颜色只说「更深」不给结构依据 | `R_f` 保留两位小数；颜色必须回到「共轭体系 / 离域」 |
| 越界错 | 引入**分子轨道**或**中国选修1 的色谱配方细节**解释显色 | 只用 `Mesomerie` / `Delokalisation`；不引 KLP 外理论 |

---

## 7. Vernetzung

- **上游**：`Reaktionsmechanismen-Uebergang-Elektronenpaar-Formalladung.md`（电子式与离域语言）· LK-12 `Mesomerie` 与芳香体系（**本笔记的硬前置**）
- **下游**：`Moderne-Werkstoffe-Kunststoffe-Recycling-Nanochemie-LK.md`（结构-性质视角的平行落点）· `Stereoisomerie-und-Chiralitaet.md`（结构-性质论证同族）
- **横向**：`02_Physik` 光的波长与能量（`E = hc/λ`）；`03_Mathe` 对数与函数图像（光谱读图）
- **术语卡**：`Absorptionsspektrum` / `λ_max` / `Komplementärfarbe` / `Delokalisation` / `Chromatografie` / `Retentionsfaktor R_f`（建议加入 csv，DE-CN-EN 三列）
- **Basiskonzept**：`Aufbau und Eigenschaften der Stoffe` ✅（本笔记为其最典型的 LK 落点）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022）或本项目已核文件确认 · `[据推断]` = 基于光学/色谱通用原理或本项目推导 · `[未获取到]` = 未找到，如实标注。⚠️ `Farbstoffe` 吸收光谱是否要求**定量**（λ_max 与结构关联）官方未明示，本笔记按**定性比较**处理 [未获取到，见 Mapping §7 待核实项]。
> ⛔ **本笔记不涉及**：盐类水解体系 · 杂化轨道 / 晶体四分类 / 电子排布式 · 配合物系统板块。
