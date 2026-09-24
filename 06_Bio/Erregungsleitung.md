---
fach: Bio
thema: "Erregungsleitung (兴奋传导：连续式与跳跃式)"
operatoren: [vergleichen, erklaeren, begruenden, beschreiben, auswerten, ermitteln]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Bio, Neurobiologie]
stufe: "Q1|Q2"
kursart: "GK|LK"
---

# Erregungsleitung (兴奋传导：连续式与跳跃式)

> **中文理解**：这是 Q 阶段 IF2「Neurobiologie」下 `Bau und Funktionen von Nervenzellen` 的第三条目，KLP 原文与 `Ruhepotenzial`、`Aktionspotenzial` 并列，**GK 与 LK 同一条目、同深度** [已验证，Bio-Oberstufe.md §2 IF2]。核心问题是：动作电位产生后，**如何沿轴突向前传播，以及髓鞘为什么能加速**。答案分两种机制——**无髓鞘的连续传导（kontinuierliche Erregungsleitung）** 与 **有髓鞘的跳跃式传导（saltatorische Erregungsleitung）**。
>
> **Klausur-Relevanz**：它是 [`Ruhe-und-Aktionspotenzial.md`](Ruhe-und-Aktionspotenzial.md) 的直接下游，也是「髓鞘病变为什么致病」这类评价题（AFB III）的机制底座。主战场 **AFB II**（`vergleichen` / `erklaeren` / `begruenden`）。

> **⚠️ EF→Q 接口（本项目显式写出）**：本条目**不需要任何新知识作桥**。EF 的 `Biomembranen: Transport`（离子通道、选择性通透、电化学梯度）与 `Signaltransduktion`（膜电位变化如何被「读出」并传递）已提供全部概念工具 [据推断，Bio-DE-CN-Mapping §0.4；Bio-Oberstufe.md §4 台阶 1]。复习时先把 EF 的 [`Biomembran-Transportmechanismen-und-Osmose.md`](Biomembran-Transportmechanismen-und-Osmose.md) 的「离子通道 / 电化学梯度」两栏调出来，再进本笔记。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `Erregungsleitung` | 兴奋传导 | impulse conduction | 动作电位沿轴突向前传播的过程 | KLP 明文条目 [已验证] |
| `kontinuierliche Erregungsleitung` | 连续传导 | continuous conduction | 无髓鞘纤维上逐段去极化，**每一段膜都产生 AP** | 慢、耗能 [据推断] |
| `saltatorische Erregungsleitung` | 跳跃式传导 | saltatory conduction | AP **只在郎飞氏结**发生，逐结「跳跃」传播 | 快、省能 [据推断] |
| `Myelinscheide / Markscheide` | 髓鞘 | myelin sheath | 施万细胞/少突胶质细胞包卷形成的绝缘层 | 高电阻、低电容 [据推断] |
| `Ranvierscher Schnürring` | 郎飞氏结 | node of Ranvier | 髓鞘间断处，**离子通道密集、离子交换点** | 跳跃传导的落脚点 [据推断] |
| `Schwann-Zelle` | 施万细胞 | Schwann cell | 外周神经的髓鞘形成细胞 | 与少突胶质细胞对应 [据推断] |
| `Oligodendrozyt` | 少突胶质细胞 | oligodendrocyte | 中枢神经的髓鞘形成细胞 | 一个细胞包多段 [据推断] |
| `Lokalstrom / lokaler Stromkreis` | 局部电流 | local circuit current | 兴奋区与静息区之间的离子流动，使前方膜去极化 | 两种传导共有的驱动 [据推断] |
| `Leitungsgeschwindigkeit` | 传导速度 | conduction velocity | 单位时间 AP 前进的距离（m/s） | 与髓鞘、轴突直径相关 [据推断] |
| `Membrankapazität` | 膜电容 | membrane capacitance | 髓鞘使电容降低 → 充放电更快 | 加速的物理解释 [据推断] |
| `Axondurchmesser` | 轴突直径 | axon diameter | 直径越大，传导越快 | 无髓鞘也适用 [据推断] |
| `Demyelinisierung` | 脱髓鞘 | demyelination | 髓鞘破坏 → 传导变慢或失败 | 见 2.6 [据推断] |
| `Multiple Sklerose` | 多发性硬化症 | multiple sclerosis | 自身免疫性脱髓鞘疾病 | 病理落点 [据推断] |
| `Refraktärzeit` | 不应期 | refractory period | 保证单向传导（后方膜尚不能兴奋） | 与上游笔记共用 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 共同起点：局部电流 (Lokalstrom)

中文：无论有无髓鞘，AP 前向传播的**驱动力都是局部电流**——兴奋区（膜外负、膜内正）与相邻静息区（膜外正、膜内负）之间产生电位差，离子沿轴突内外流动，使**前方膜去极化**；当前方膜达到阈值（≈ −55 mV），就触发一个新的 AP。因此 AP 不是「同一个电位跑完全程」，而是**在每一处重新产生**。

> *Klausur-Satz*: Das Aktionspotenzial breitet sich nicht als einzelnes Signal über die Membran aus, sondern **wird an jeder Stelle neu ausgelöst**: Der **Lokalstrom** zwischen erregtem und ruhendem Bereich depolarisiert die vorausliegende Membran bis zum **Schwellenwert**. [据推断]

### 2.2 连续式传导 (kontinuierliche Erregungsleitung)

中文：**无髓鞘**轴突上，离子通道沿膜均匀分布，局部电流使**相邻膜段逐段**去极化，AP 像「波浪」一样连续推进。特点：**速度慢**（约 0,5–2 m/s）、**每一段膜都要开通道 + 重建离子梯度，耗能高**、**所需轴突直径大**。

> *Klausur-Satz*: Bei der **kontinuierlichen Erregungsleitung** (unmyelinisierte Faser) werden **alle Membranabschnitte** nacheinander depolarisiert; das ist langsam und energieaufwendig. [据推断]

### 2.3 跳跃式传导 (saltatorische Erregungsleitung)

中文：**有髓鞘**轴突上，髓鞘是绝缘层（**高电阻、低电容**），离子**几乎无法在髓鞘段交换**；离子通道集中在**郎飞氏结**。于是局部电流**穿过轴突内部**，从上一个结流向下一个结，只在**结处**触发 AP——AP 就这样**从一个结「跳」到下一个结**。特点：**速度快**（有髓纤维可达约 100–120 m/s）、**省能**（只有结处需泵重建梯度）。

> *Klausur-Satz*: Bei der **saltatorischen Erregungsleitung** (myelinisierte Faser) ist die Myelinscheide elektrisch isolierend; das Aktionspotenzial entsteht nur an den **Ranvierschen Schnürringen**, sodass die Erregung **von Schnürring zu Schnürring springt**. Das ist deutlich **schneller und energiesparender**. [据推断]

### 2.4 髓鞘为什么能加速 —— 三条物理解释

| 机制 | 说明 |
|---|---|
| **绝缘 + 高电阻** | 局部电流不能从髓鞘段「漏出」，被迫沿轴突内部流向下一结，传播距离更远 [据推断] |
| **低电容** | 髓鞘使膜电容降低 → 膜充放电更快 → 到达阈值更迅速 [据推断] |
| **通道集中于结** | 只需在少数结处开通道、重建梯度，减少时间与 ATP 消耗 [据推断] |

### 2.5 影响传导速度的四因素

1. **髓鞘有无**：有髓 ≫ 无髓（最关键）。
2. **轴突直径**：直径越大，内部电阻越小 → 局部电流传播越远越快（无髓纤维也遵循此规律）。
3. **温度**：一定范围内温度升高加快，过高则通道蛋白变性而失效 [据推断]。
4. **郎飞氏结间距**：间距适中时最快；过密或过疏都会减慢 [据推断]。

### 2.6 病理落点：脱髓鞘 (Demyelinisierung)

中文：髓鞘被破坏后（如 **Multiple Sklerose**），局部电流从髓鞘段大量漏失，**前方结可能达不到阈值** → 传导**变慢、不同步，甚至中断**。这解释了脱髓鞘疾病为何表现为感觉异常与运动障碍。

> *Klausur-Satz*: Bei einer **Demyelinisierung** geht die isolierende Wirkung der Myelinscheide verloren; der **Lokalstrom** reicht oft nicht mehr aus, um den nächsten Schnürring zu erreichen. Dadurch wird die Erregungsleitung **langsamer, unsynchron oder ganz unterbrochen**. [据推断]

### ⛔ 分层差异（GK vs LK）

- **GK 要求**：`Erregungsleitung` 的**两种机制对比 + 髓鞘作用**——本笔记 2.1–2.6 全部为 GK 内容 [已验证，Bio-Oberstufe.md §2 IF2「共同（GK = LK）」]。
- **LK 增量**（**GK 不得引入**）：`primäre und sekundäre Sinneszelle`、`Rezeptorpotenzial`（→ 见 [`Sinneszellen-und-Rezeptorpotenzial.md`](Sinneszellen-und-Rezeptorpotenzial.md)）、`Hormone`、`Neuronale Plastizität`（Summation / 学习机制）[已验证，Lernbaum-Bio §4 ⛔ 分层禁止清单]。
- ⚠️ **本笔记的「传导速度」只做定性比较**：速度与直径的定量公式在 NRW KLP 中**未列为考点** [据推断]，答题写「größerer Durchmesser → höhere Geschwindigkeit」即可，不必套公式。

---

## 3. 解题方法 (Methoden)

### 3.1 「两种传导方式对比四栏法」（vergleichen 题必用）

**编号步骤**：
1. **列维度**：① 髓鞘有无 ② AP 发生部位 ③ 速度 ④ 能量消耗。—— *KLP 工具：`vergleichen` 要求「成对给出共同点与差异」*
2. **逐维写差异**：有髓 = 髓鞘 + 只在结处 + 快 + 省能；无髓 = 无髓鞘 + 全膜段 + 慢 + 耗能。—— *KLP 工具：`kontinuierlich` vs `saltatorisch`*
3. **写共同点**：两者都靠**局部电流**驱动、都遵循**全或无**与**不应期**。—— *KLP 工具：`Lokalstrom` + `Alles-oder-Nichts-Prinzip`（上游笔记）*
4. **收尾回扣**：一句德语总结髓鞘的功能意义。—— *KLP 工具：Basiskonzept `Struktur und Funktion`*

> **判据 / 决策点**：题目出现 `vergleichen` 时**必须成对**（「有髓…，而无髓…」），只描述一种方式不得满分。

### 3.2 曲线三看法 —— 读「传导速度 vs 轴突直径」图

**编号步骤**：
1. **看走向**：分段描述——小直径段近似线性上升，大直径段可能变缓（趋于饱和）。引用具体坐标值。—— *KLP 工具：`auswerten`*
2. **看极值 / 转折点**：找曲线斜率变化的点；若有平台，说明其他因素成为限制。—— *KLP 工具：`ermitteln`*
3. **看因果**：**上升段机制 = 直径↑ → 轴突内部电阻↓ → 局部电流衰减↓ → 到达下一结更快**；**有髓曲线整体高于无髓曲线 = 髓鞘的额外加速**。—— *KLP 工具：`erklaeren`（归因到规律性）*

> **判据 / 决策点**：图中若同时画「有髓」与「无髓」两条曲线，**比较两条曲线的垂直间距**即为髓鞘的贡献；不要只读单条。

### 3.3 「跳跃式传导机制三步法」（erklaeren 题）

1. **结构前提**：髓鞘绝缘（高电阻、低电容），离子通道集中于郎飞氏结。—— *KLP 工具：`Myelinscheide`*
2. **机制**：局部电流沿轴突内部从结流向结，在**下一个结**使膜达阈值 → 新 AP。—— *KLP 工具：`Lokalstrom`*
3. **结果**：速度↑（跳跃距离大）、耗能↓（结少）。—— *KLP 工具：`begruenden`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 曲线三看法（走向 / 极值 / 因果）

- **技法内容**：任何 `y-x` 生物曲线固定三步——① **看走向**：分段描述（陡升 / 缓升 / 平台），引用区间数值；② **看极值 / 转折点**：峰值即最适点或最大值，平台即饱和；③ **看因果**：**转折点必对应机制切换**（如斜率由陡变缓 = 从「髓鞘主导」转为「直径主导」）。中国必修1、选必1 对曲线读法训练密集。[据推断，Bio-DE-CN-Mapping CN-Methode 6]
- **DE-Anschluss**：`Potenzialmessungen`（**KLP 明文方法** [已验证]）· EF 的 `Enzyme: Kinetik` 曲线（EF 已教）· 法定 Überprüfungsform `Darstellungsaufgaben`（明列「图表解释」）[据推断]。**曲线读法是德国的官方训练项。**
- **合规性**：✅ —— 两边都要求读曲线，本技法只是把顺序固化。中国的增量是「**转折点 = 机制切换**」这一句纠偏。
- **Abitur 应用**：`Erregungsleitung` 速度—直径曲线（AFB I 描述 + AFB II 解释）· 上游的电位曲线 · LK 的 `Rezeptorpotenzial` 分级曲线。
- **来源**：`[CN-课标]` 必修1 2.2.1 + 选必1 1.3.2 + `[CN-教材]` 曲线分析法

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（配髓鞘轴突剖面图 / 传导速度曲线）[已验证，KLP Kap. 4] |
| Operator | `vergleichen` · `erklaeren` · `begruenden` · `auswerten` · `ermitteln` |
| AFB | I（标注结构/读图）→ **II（机制解释与对比，重心）** → III（脱髓鞘病例评价） |
| 建议分值 / 时长 | 3 题共约 20–26 BE，约 25–30 min（Abitur 生物 GK 255 min / LK 300 min，4 选 3）[已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Die Abbildung zeigt zwei Axone im Querschnitt: Axon A ist von einer Myelinscheide umgeben, Axon B nicht. Beide haben den gleichen Durchmesser.
> a) Beschreiben Sie den Aufbau der beiden Axone und benennen Sie die Strukturen an den Unterbrechungen der Myelinscheide bei Axon A.
> b) Vergleichen Sie die Erregungsleitung in Axon A und Axon B in Bezug auf (1) den Ort der Aktionspotenzial-Entstehung, (2) die Geschwindigkeit und (3) den Energieaufwand.

**Aufgabe 2** `[NRW-改编]`
> Ein Patient leidet an einer Erkrankung, bei der die Myelinscheide der motorischen Nerven zunehmend zerstört wird.
> Erklären Sie, warum es dadurch zu einer verzögerten oder unterbrochenen Weiterleitung der Erregung kommt. Begründen Sie dabei mit dem Begriff des Lokalstroms.

**Aufgabe 3** `[原创]`
> Die Tabelle zeigt die Leitungsgeschwindigkeit von Nervenfasern unterschiedlichen Durchmessers (mit und ohne Myelinscheide).
> | Durchmesser (µm) | ohne Myelinscheide (m/s) | mit Myelinscheide (m/s) |
> |---|---|---|
> | 5 | 2 | 20 |
> | 10 | 5 | 50 |
> | 20 | 10 | 100 |
> Werten Sie die Daten aus und erklären Sie den Einfluss von (1) Myelinscheide und (2) Durchmesser auf die Leitungsgeschwindigkeit.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Aufbau**：Axon A besitzt eine **Myelinscheide** (von Schwann-Zellen gebildet), Axon B ist **unmyelinisiert**. ✓ 得分点（两轴突区分）
2. **a) 命名**：Die Unterbrechungen der Myelinscheide sind die **Ranvierschen Schnürringe**; hier sind die spannungsgesteuerten Ionenkanäle dicht konzentriert. ✓ 得分点（郎飞氏结）
3. **b) ① 发生部位**：Bei Axon A entsteht das AP nur an den **Ranvierschen Schnürringen** (saltatorisch), bei Axon B an **jedem Membranabschnitt** (kontinuierlich). ✓ 得分点（部位差异）
4. **b) ② 速度**：Axon A leitet **schneller** (Sprünge überspringen lange Strecken), Axon B **langsamer**. ✓
5. **b) ③ 耗能**：Axon A ist **energiesparender**, da nur an den Schnürringen Ionen ausgetauscht und die Gradienten mit der Na⁺/K⁺-ATPase wiederhergestellt werden müssen; Axon B muss dies an der gesamten Membran leisten. ✓ 得分点（耗能对比 + 提到泵）

**Aufgabe 2**
1. **机制起点**：Die **Myelinscheide** wirkt als Isolator mit **hohem Widerstand und niedriger Kapazität**. ✓ 得分点（髓鞘电学性质）
2. **Lokalstrom**：Der **Lokalstrom** zwischen erregtem und ruhendem Bereich fließt durch den Achsenzylinder zum nächsten Schnürring und depolarisiert dort die Membran. ✓ 得分点（局部电流）
3. **后果**：Bei **Demyelinisierung** entweicht der Lokalstrom durch die geschädigte Membran; er erreicht den nächsten Schnürring **nicht mehr mit ausreichender Stärke**, sodass der **Schwellenwert** nicht erreicht wird. ✓ 得分点（阈值未达）
4. **收尾**：Daher wird die Leitung **langsamer, unsynchron oder unterbrochen**. ✓

**Aufgabe 3**
1. **看走向**：Bei jedem Durchmesser ist die Geschwindigkeit **mit Myelinscheide deutlich höher** als ohne (z. B. bei 10 µm: 50 m/s gegenüber 5 m/s); außerdem steigt die Geschwindigkeit **bei beiden Gruppen mit dem Durchmesser**. ✓ 得分点（两条规律）
2. **看极值 / 比例**：Der Faktor zwischen den beiden Gruppen bleibt in den Daten **etwa konstant (≈ 10-fach)**. ✓（读比例）
3. **看因果 ①髓鞘**：Die **saltatorische Erregungsleitung** erklärt die höhere Geschwindigkeit: Das AP springt von Schnürring zu Schnürring. ✓
4. **看因果 ②直径**：Ein **größerer Durchmesser** senkt den inneren Widerstand, der Lokalstrom breitet sich weiter aus und erreicht den nächsten Schnürring schneller. ✓ 得分点（电阻—局部电流—速度 因果链）
5. **收尾**：Beide Faktoren erhöhen die Leitungsgeschwindigkeit, wobei die **Myelinscheide den größeren Effekt** hat. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「跳跃式」说成「AP 跳过整条轴突」 | 跳跃的是**触发位点**（结→结），局部电流仍连续流动 |
| 辨别错 | 认为有髓纤维「不需要离子通道」 | 通道**集中在郎飞氏结**，并未消失 |
| 知识错 | 只说「髓鞘加快传导」，不解释机制 | 必写**绝缘 + 局部电流 + 结处触发**三步 |
| 知识错 | 忽略轴突直径的作用 | 补「直径↑ → 内部电阻↓ → 速度↑」 |
| 知识错 | 把脱髓鞘后果只说成「变慢」 | 还有**不同步、中断**（因阈值可能达不到） |
| 表达错 | 速度单位写错 | 一律 **m/s**；对比时给具体数量级 |
| 表达错 | 说「AP 沿轴突跑」 | 德语应写 **„das AP wird an jeder Stelle neu ausgelöst“** |

---

## 7. Vernetzung

- **上游**：[`Ruhe-und-Aktionspotenzial.md`](Ruhe-und-Aktionspotenzial.md)（★ 直接上游：AP 的产生与全或无）· [`Biomembran-Transportmechanismen-und-Osmose.md`](Biomembran-Transportmechanismen-und-Osmose.md)（**EF 唯一已就位的 Q 接口**：离子通道与电化学梯度）· [`Signaltransduktion.md`](Signaltransduktion.md)（EF）
- **下游**：[`Synapse-und-neuromuskulaere-Synapse.md`](Synapse-und-neuromuskulaere-Synapse.md)（AP 到达末梢 → 突触传递）· [`Sinneszellen-und-Rezeptorpotenzial.md`](Sinneszellen-und-Rezeptorpotenzial.md)（`[LK]`，感受器电位 → AP）
- **横向**：[`ATP-ADP-und-Redoxreaktionen.md`](ATP-ADP-und-Redoxreaktionen.md)（Na⁺/K⁺-ATPase 耗 ATP）· `03_Mathe/` 线性与饱和函数（读速度—直径曲线）
- **Basiskonzept**：`Struktur und Funktion`（第 1 轴，髓鞘结构→传导功能）· `Information und Kommunikation`（第 3 轴）
- **术语卡**：`kontinuierliche Erregungsleitung` · `saltatorische Erregungsleitung` · `Myelinscheide` · `Ranvierscher Schnürring` · `Lokalstrom` · `Demyelinisierung`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于官方条目/项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
