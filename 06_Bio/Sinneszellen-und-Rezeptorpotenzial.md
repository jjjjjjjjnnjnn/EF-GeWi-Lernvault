---
fach: Bio
thema: "Sinneszellen und Rezeptorpotenzial (感觉细胞与感受器电位)"
operatoren: [vergleichen, erklaeren, begruenden, auswerten, ermitteln, darstellen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Bio, Neurobiologie]
stufe: "Q1|Q2"
kursart: "LK"
---

# Sinneszellen und Rezeptorpotenzial (感觉细胞与感受器电位) `[LK]`

> **中文理解**：这是 Q 阶段 IF2「Neurobiologie」的 **LK 专属增量块**，KLP 原文在 LK 栏新增 `primäre und sekundäre Sinneszelle` 与 `Rezeptorpotenzial`，**GK 栏未列** [已验证，Bio-Oberstufe.md §2 IF2 LK 增量表]。核心问题是：**外界刺激（光、声、化学物质）如何被转换成神经信号**？答案是感觉细胞先把刺激转成**分级式的感受器电位（Rezeptorpotenzial）**，再把它编码成**动作电位的频率**。
>
> **Klausur-Relevanz**：它是 [`Erregungsleitung.md`](Erregungsleitung.md) 的 LK 延伸，也是「刺激强度如何被编码」（Reizstärkecodierung）这一核心问题的答案。主战场 **AFB II**（`vergleichen` / `erklaeren` / `auswerten`）。

> **⚠️ 分层警示（GK 不得引入）**：本笔记整体为 `[LK]`。`Rezeptorpotenzial`、原发/继发感觉细胞、适应（Adaptation）**均不在 GK 范围内** [已验证，Lernbaum-Bio §4 ⛔ 分层禁止清单；Bio-Oberstufe.md §2 IF2]。GK 考生复习神经生物学时，读到本页应**只作理解、不作考点**；GK 的核心是 `Ruhepotenzial` / `Aktionspotenzial` / `Erregungsleitung` / `Synapse` 四项。

> **⚠️ EF→Q 接口（本项目显式写出）**：本条目**无需新知识作桥**。EF 的 `Signaltransduktion`（信号分子 → 受体 → 级联 → 细胞响应）正是感受器把刺激转成电位变化的**同一原理**；EF 的 `Biomembranen: Transport`（离子通道的开放/关闭如何改变膜电位）提供了电位变化的机制工具 [据推断，Bio-DE-CN-Mapping §0.4；EF-08]。复习时先把 EF 的 [`Signaltransduktion.md`](Signaltransduktion.md) 的「受体—级联—响应」四段图调出来。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `Sinneszelle` | 感觉细胞 | sensory cell | 把特定刺激转换为电信号的特化细胞 | KLP LK 条目 [已验证] |
| `primäre Sinneszelle` | 原发感觉细胞 | primary sensory cell | **本身即神经元**，刺激直接产生感受器电位并触发 AP | 如嗅细胞 [据推断] |
| `sekundäre Sinneszelle` | 继发感觉细胞 | secondary sensory cell | **非神经元**，先产生感受器电位 → 释放递质 → 突触给下一级神经元 | 如毛细胞、视杆/视锥 [据推断] |
| `Rezeptorpotenzial` | 感受器电位 | receptor potential | 刺激引起的**分级**膜电位变化（非全或无） | KLP LK 明文 [已验证] |
| `Generatorpotenzial` | 发生器电位 | generator potential | 继发感觉细胞中通往突触的感受器电位 | 与上者常混用 [据推断] |
| `adäquater Reiz` | 适宜刺激 | adequate stimulus | 某感觉细胞最敏感、阈值最低的刺激类型 | 感受器专一性 [据推断] |
| `Transduktion` | 换能 | transduction | 刺激能量 → 电信号（膜电位变化）的转换 | 与 EF 的 Signaltransduktion 同源 [据推断] |
| `graduiertes Potenzial` | 分级电位 | graded potential | 幅度随刺激强度变化、可叠加、可衰减 | 与 AP 的根本区别 [据推断] |
| `Summation` | 总和 / 叠加 | summation | 分级电位可空间/时间叠加，累加到达阈值 | 编码强度的关键 [据推断] |
| `Reizstärkecodierung` | 刺激强度编码 | stimulus-intensity coding | 强度 → 感受器电位幅度 → AP **频率** | 核心考点 [据推断] |
| `Adaptation` | 适应 | adaptation | 持续刺激下反应逐渐减弱 | 区分 phasisch/tonisch [据推断] |
| `Photorezeptor` | 光感受器 | photoreceptor | 对光敏感的感觉细胞（视杆 Stäbchen / 视锥 Zapfen） | 继发型实例 [据推断] |
| `Mechanorezeptor` | 机械感受器 | mechanoreceptor | 对机械变形敏感（如内耳毛细胞 Haarzelle） | 继发型实例 [据推断] |
| `Chemorezeptor` | 化学感受器 | chemoreceptor | 对化学物质敏感（如嗅细胞） | 原发型实例 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 从刺激到信号 —— 换能三步

中文：感觉细胞的通用工作流程是——① **接收刺激**：适宜刺激作用于感受器（光/机械/化学）；② **换能**：刺激改变膜上离子通道的开放概率 → 膜电位发生**分级变化**（即感受器电位）；③ **编码**：感受器电位叠加后，若在轴丘处达到阈值，就触发**动作电位**，其**频率**反映刺激强度。这与 EF 的 `Signaltransduktion`（信号 → 受体 → 响应）是同一逻辑 [据推断]。

> *Klausur-Satz*: Eine Sinneszelle wandelt einen **adäquaten Reiz** in ein **Rezeptorpotenzial** um (Transduktion); erreicht dieses am Axonhügel den Schwellenwert, entsteht ein Aktionspotenzial, dessen **Frequenz** die Reizstärke kodiert. [据推断]

### 2.2 原发感觉细胞 (primäre Sinneszelle)

中文：**细胞本身就是神经元**（如嗅细胞）。刺激直接作用于其感受器膜 → 产生感受器电位 → **同一细胞**的轴突在达到阈值时直接发放 AP。因此**无需突触换乘**，信号路径更短。

> *Klausur-Satz*: Bei einer **primären Sinneszelle** ist die Sinneszelle selbst ein Neuron: Der Reiz erzeugt direkt ein Rezeptorpotenzial, und dieselbe Zelle leitet bei Erreichen des Schwellenwerts ein Aktionspotenzial weiter. [据推断]

### 2.3 继发感觉细胞 (sekundäre Sinneszelle)

中文：**细胞本身不是神经元**（如内耳毛细胞、视杆/视锥）。刺激产生感受器电位后，细胞通过**突触**（释放递质）把信号传给下一级神经元，由**后者**产生 AP。因此**多一次突触换乘**，信号可在此被调制。

> *Klausur-Satz*: Bei einer **sekundären Sinneszelle** ist die Sinneszelle kein Neuron: Das Rezeptorpotenzial führt zur Freisetzung von Transmittern an einer Synapse, und erst die **nachgeschaltete Nervenzelle** bildet das Aktionspotenzial. [据推断]

### 2.4 感受器电位 vs 动作电位 —— 对比表（Klausur 高频）

| Merkmal | Rezeptorpotenzial | Aktionspotenzial |
|---|---|---|
| 类型 | **分级电位**（graduiert） | **全或无**（Alles-oder-Nichts） |
| 幅度与刺激强度 | **成正比**（强度↑幅度↑） | 与强度**无关**（恒定） |
| 是否可叠加 | **可**（空间/时间总和） | **不可**（不应期内不能再发） |
| 传播 | **局部、可衰减**（decrement） | **长距离、不衰减**（沿轴突） |
| 产生部位 | 感受器膜 | 轴丘 / 轴突 |
| 离子基础 | 多为**非电压门控**通道 | **电压门控** Na⁺/K⁺ 通道 |

中文：**最易失分点**——感受器电位**不遵循全或无**，它是「模拟量」；动作电位才是「数字量」。强度信息在「感受器电位幅度 → AP 频率」这一步被**转换**。

> *Klausur-Satz*: Das **Rezeptorpotenzial** ist ein **graduiertes** Potenzial, dessen Amplitude mit der Reizstärke zunimmt, während das **Aktionspotenzial** dem **Alles-oder-Nichts-Prinzip** folgt; die Reizstärke wird daher über die **Frequenz** der Aktionspotenziale kodiert. [据推断]

### 2.5 刺激强度编码 (Reizstärkecodierung)

中文：编码链条是——**刺激强度 ↑ → 感受器电位幅度 ↑ → 到达轴丘的去极化 ↑ → AP 发放频率 ↑**。因此强度不是由「AP 有多大」表示，而是由「单位时间发多少个 AP」表示。这与上游 [`Ruhe-und-Aktionspotenzial.md`](Ruhe-und-Aktionspotenzial.md) 的「频率编码」完全一致。

> *Klausur-Satz*: Eine stärkere Reizung erhöht die Amplitude des Rezeptorpotenzials; dadurch wird der Axonhügel stärker depolarisiert und es werden **mehr Aktionspotenziale pro Zeiteinheit** ausgelöst. Die Reizstärke ist also in der **Frequenz** der Aktionspotenziale codiert. [据推断]

### 2.6 适应 (Adaptation)

中文：持续不变的刺激下，许多感受器的反应**逐渐减弱**——这叫适应。**相位型（phasisch）**感受器只在刺激**变化时**强烈反应（如触觉），**紧张型（tonisch）**感受器持续报告刺激（如肌梭）[据推断]。适应让神经系统**优先处理变化**，而不是被恒定的背景淹没。

> *Klausur-Satz*: Unter einem **konstanten Reiz** nimmt die Antwort vieler Sinneszellen ab (**Adaptation**); dadurch reagiert das Nervensystem vor allem auf **Veränderungen** der Umwelt. [据推断]

### ⛔ 分层差异（GK vs LK）

- **GK**：**不含**本笔记任何条目。GK 神经生物学的 Sachkompetenz 只有 `Ruhepotenzial` / `Aktionspotenzial` / `Erregungsleitung` / `Synapse` [已验证，Bio-Oberstufe.md §2 IF2]。
- **LK**：本笔记全部内容为 LK 明文要求（`primäre und sekundäre Sinneszelle`、`Rezeptorpotenzial`）[已验证]。
- ⚠️ **GK 考生注意**：在 `beurteilen` / `bewerten` 题中若写「感受器电位」属于**超纲内容**，不额外得分，反而挤占时间 [据推断，Bio-DE-CN-Mapping CN-Methode 9]。

---

## 3. 解题方法 (Methoden)

### 3.1 曲线三看法 —— 读「刺激强度 vs 电位」图

**编号步骤**：
1. **看走向**：感受器电位曲线随刺激强度**单调上升**（近似线性或对数型）；AP 频率曲线同样上升。—— *KLP 工具：`auswerten`*
2. **看极值 / 转折点**：感受器电位到达**阈值**处，AP 开始出现（频率从 0 变为 >0）；强度继续增大时频率上升但可能**趋于饱和**（不应期限制）。—— *KLP 工具：`ermitteln`*
3. **看因果**：**上升段 = 更多离子通道开放 → 感受器电位更大 → 轴丘去极化更强**；**饱和 = 不应期限制了最高频率**。—— *KLP 工具：`erklaeren`*

> **判据 / 决策点**：题目若画「刺激强度 vs AP 幅度」图，答案是**阶跃/常数曲线**（因为全或无）；若画「刺激强度 vs AP 频率」图，才是**上升曲线**。两者不可混读。

### 3.2 「两类感觉细胞对比法」（vergleichen 题必用）

1. **列维度**：① 细胞性质（是否神经元）② 是否直接产生 AP ③ 是否需要突触 ④ 实例。—— *KLP 工具：`vergleichen` 成对要求*
2. **逐维写差异**：原发 = 是神经元 + 直接产生 AP + 无突触 + 嗅细胞；继发 = 非神经元 + 需下一级神经元 + 有突触 + 毛细胞/视细胞。—— *KLP 工具：`primär` vs `sekundär`*
3. **写共同点**：两者**都先产生分级感受器电位**，再经阈值触发 AP 编码。—— *KLP 工具：`Rezeptorpotenzial`*
4. **收尾**：一句德语点出结构差异的功能意义。—— *KLP 工具：Basiskonzept `Struktur und Funktion`*

### 3.3 「分级 vs 全或无辨析法」

1. 判断所给电位是**感受器电位**还是**动作电位**（看部位 + 是否可叠加）。
2. 感受器电位 → 写「graduiert, Amplitude ∝ Reizstärke, Summation möglich」。
3. 动作电位 → 写「Alles-oder-Nichts, Amplitude konstant, Frequenz kodiert」。
—— *KLP 工具：`graduiertes Potenzial` vs `Alles-oder-Nichts-Prinzip`*

> **判据 / 决策点**：只要题目出现「Rezeptorpotenzial」，**必须先声明它是分级电位**，这是 LK 的得分关键词。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 曲线三看法（走向 / 极值 / 因果）

- **技法内容**：任何 `y-x` 生物曲线固定三步——① **看走向**：分段描述，引用区间数值；② **看极值 / 转折点**：阈值处是「从无到有」的转折，平台即饱和；③ **看因果**：**转折点必对应机制切换**（阈值 = 通道开放累加至阈值；饱和 = 不应期限制）。中国选必1 对电位曲线读法训练密集。[据推断，Bio-DE-CN-Mapping CN-Methode 6]
- **DE-Anschluss**：`Potenzialmessungen`（**KLP 明文方法** [已验证]）· EF 的 `Enzyme: Kinetik` 曲线（已教）· LK 的 `Neurophysiologische Verfahren`（LK 方法增量）· 法定 `Darstellungsaufgaben`（图表解释）[据推断]。
- **合规性**：✅ —— 曲线读法是两边共同要求；本技法只固化顺序。⚠️ **分层提示**：感受器电位曲线属 **LK**，GK 考生不要用。
- **Abitur 应用**：LK 的 `Rezeptorpotenzial` 分级曲线 + `Reizstärkecodierung` 频率曲线（AFB I 描述 + AFB II 解释）。**AFB II 为主**。
- **来源**：`[CN-课标]` 选必1 1.3.2 + `[CN-教材]` 曲线分析法

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（配感受器电位曲线 / 感觉细胞示意图）[已验证，KLP Kap. 4] |
| Operator | `vergleichen` · `erklaeren` · `auswerten` · `ermitteln` · `begruenden` |
| AFB | I（读图/标注）→ **II（机制解释与对比，重心）** |
| 建议分值 / 时长 | 3 题共约 20–24 BE，约 25–30 min（**LK 300 min**，4 选 3）[已验证] |
| ⚠️ 适用范围 | **仅 LK**；GK 不得使用本组题 |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]` `[LK]`
> Die Abbildung zeigt zwei Sinneszellen: Zelle A ist selbst ein Neuron, Zelle B ist keine Nervenzelle und steht über eine Synapse mit einer nachgeschalteten Nervenzelle in Kontakt.
> a) Ordnen Sie beide Zellen dem primären bzw. sekundären Typ zu und begründen Sie Ihre Zuordnung.
> b) Vergleichen Sie beide Zelltypen hinsichtlich der Entstehung des Aktionspotenzials.

**Aufgabe 2** `[NRW-改编]` `[LK]`
> Ein Forscher reizt eine Sinneszelle mit Reizen zunehmender Stärke (R1 < R2 < R3) und misst gleichzeitig (1) die Amplitude des Rezeptorpotenzials und (2) die Frequenz der ausgelösten Aktionspotenziale.
> Beschreiben Sie die zu erwartenden Kurvenverläufe und erklären Sie den Zusammenhang zwischen Reizstärke, Rezeptorpotenzial und Aktionspotenzial-Frequenz.

**Aufgabe 3** `[原创]` `[LK]`
> Eine Schülerin behauptet: „Das Rezeptorpotenzial folgt dem Alles-oder-Nichts-Prinzip, genau wie das Aktionspotenzial."
> Beurteilen Sie diese Aussage fachlich und korrigieren Sie sie mit Fachbegriffen.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) 归类**：Zelle A = **primäre Sinneszelle**, Zelle B = **sekundäre Sinneszelle**. ✓ 得分点（归类正确）
2. **a) 依据**：Bei A ist die Sinneszelle **selbst ein Neuron**, bei B ist sie **kein Neuron**, sondern über eine **Synapse** mit einer Nervenzelle verbunden. ✓ 得分点（判据）
3. **b) 差异**：Bei A entsteht das Aktionspotenzial **in derselben Zelle** (nach Erreichen des Schwellenwerts); bei B entsteht nur ein **Rezeptorpotenzial**, und das Aktionspotenzial wird erst in der **nachgeschalteten Nervenzelle** gebildet. ✓ 得分点（AP 产生部位差异）
4. **收尾**：Beide Typen wandeln den Reiz zunächst in ein Rezeptorpotenzial um; der Unterschied liegt im **Ort der Aktionspotenzial-Entstehung**. ✓

**Aufgabe 2**
1. **曲线 1（感受器电位幅度）**：Die Amplitude des **Rezeptorpotenzials steigt** mit der Reizstärke (graduiertes Potenzial). ✓ 得分点（分级）
2. **曲线 2（AP 频率）**：Die Frequenz der Aktionspotenziale **steigt ebenfalls** mit der Reizstärke, sobald der Schwellenwert überschritten ist. ✓ 得分点（频率上升）
3. **机制因果**：Ein stärkerer Reiz öffnet **mehr Ionenkanäle** → größeres Rezeptorpotenzial → stärkere Depolarisation am **Axonhügel** → **mehr Aktionspotenziale pro Zeiteinheit**. ✓ 得分点（三步因果链）
4. **收尾**：Die Reizstärke wird also nicht über die **Amplitude**, sondern über die **Frequenz** der Aktionspotenziale codiert. ✓ 得分点（频率编码结论）

**Aufgabe 3**
1. **定性**：Die Aussage ist **fachlich falsch**. ✓
2. **纠错 1**：Das **Rezeptorpotenzial** ist ein **graduiertes Potenzial**: Seine Amplitude ist **proportional zur Reizstärke** und kann durch **Summation** verstärkt werden. ✓ 得分点（分级 + 幅度正比）
3. **纠错 2**：Nur das **Aktionspotenzial** folgt dem **Alles-oder-Nichts-Prinzip**; seine Amplitude ist konstant. ✓ 得分点（区分两者）
4. **标准句**：Das Rezeptorpotenzial ist die **graduierte Eingangsgröße**, das Aktionspotenzial die **frequenzcodierte Ausgangsgröße** der Sinneszelle. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 认为感受器电位也遵循「全或无」 | 感受器电位是**分级**的；只有 AP 是全或无 |
| 辨别错 | 把原发/继发感觉细胞说反 | 原发 = **本身是神经元**；继发 = **非神经元 + 需突触** |
| 知识错 | 说「刺激越强，AP 幅度越大」 | 幅度恒定；**频率**随强度变 |
| 知识错 | 漏掉「阈值」这一步 | 感受器电位必须**叠加达阈**才触发 AP |
| 知识错 | 混淆「适应」与「疲劳」 | 适应是感受器的正常特性，不是损伤 |
| 表达错 | 把 `Rezeptorpotenzial` 写成 `Aktionspotenzial` | 两者是**输入 vs 输出**，不可互换 |
| 表达错 | 德语漏写 `graduiert` / `Frequenz` 关键词 | LK 得分点必须出现这两个词 |

---

## 7. Vernetzung

- **上游**：[`Erregungsleitung.md`](Erregungsleitung.md)（AP 的传播）· [`Ruhe-und-Aktionspotenzial.md`](Ruhe-und-Aktionspotenzial.md)（AP 与全或无）· [`Signaltransduktion.md`](Signaltransduktion.md)（**EF 接口**：受体—级联—响应）· [`Biomembran-Transportmechanismen-und-Osmose.md`](Biomembran-Transportmechanismen-und-Osmose.md)（离子通道）
- **下游**：[`Synapse-und-neuromuskulaere-Synapse.md`](Synapse-und-neuromuskulaere-Synapse.md)（继发感觉细胞的突触传递）· LK 的 `Hormone-und-Stressreaktion.md`（⚠️ 缺口，神经-激素交织）· `Neuronale-Plastizitaet.md`（⚠️ 缺口）
- **横向**：[`ATP-ADP-und-Redoxreaktionen.md`](ATP-ADP-und-Redoxreaktionen.md)（离子泵耗能）· `03_Mathe/` 对数与饱和函数
- **Basiskonzept**：`Information und Kommunikation`（第 3 轴）· `Struktur und Funktion`（第 1 轴，原发/继发结构差异→信号路径差异）
- **术语卡**：`primäre Sinneszelle` · `sekundäre Sinneszelle` · `Rezeptorpotenzial` · `graduiertes Potenzial` · `Reizstärkecodierung` · `Adaptation`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于官方条目/项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
