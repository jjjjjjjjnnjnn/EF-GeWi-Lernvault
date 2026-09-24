---
fach: Bio
thema: "Ruhe- und Aktionspotenzial (静息电位与动作电位)"
operatoren: [erklaeren, darstellen, begruenden, auswerten, ermitteln, beschreiben]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Bio, Neurobiologie]
stufe: "Q1|Q2"
kursart: "GK|LK"
---

# Ruhe- und Aktionspotenzial (静息电位与动作电位)

> **中文理解**：这是 Q 阶段 IF2「Neurobiologie」下 `Bau und Funktionen von Nervenzellen` 的核心条目，KLP 原文列出 `Ruhepotenzial`、`Aktionspotenzial`、`Erregungsleitung` [已验证，Bio-Oberstufe.md §2 IF2]。核心是一条主线：**离子浓度差 + 选择性通透 → 静息电位（≈ −70 mV）**；**阈值刺激 → Na⁺ 内流 → K⁺ 外流 → 动作电位（全或无）**。考试里它以「解释静息电位的产生」「分析电位曲线各相」「说明全或无原则」三类形态出现，主战场 **AFB II**（`erklaeren` / `auswerten` / `ermitteln`）。
>
> **Klausur-Relevanz**：它是 Q 神经生物学的**第一块基石**（[`Synapse-und-neuromuskulaere-Synapse.md`](Synapse-und-neuromuskulaere-Synapse.md) 的直接上游），也是 **EF→Q 最平滑的接口之一**——EF 的 `Biomembranen: Transport` + `Signaltransduktion` 已提供全部概念工具，**无需新知识作桥** [据推断，Bio-DE-CN-Mapping §0.4]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `Nervenzelle / Neuron` | 神经元 | neuron | 神经系统的信息处理与传导单元 | 结构见 2.1 |
| `Dendrit` | 树突 | dendrite | 接收信号的分支突起 | 输入 |
| `Soma / Zellkörper` | 胞体 | cell body | 含核，整合信号 | 处理 |
| `Axon` | 轴突 | axon | 传导动作电位的长突起 | 输出 |
| `Axonhügel` | 轴丘 | axon hillock | 轴突起始段，**动作电位产生处** | 整合点 [据推断] |
| `Myelinscheide` | 髓鞘 | myelin sheath | 包裹轴突的绝缘层 | 见 Erregungsleitung |
| `Ranvierscher Schnürring` | 郎飞氏结 | node of Ranvier | 髓鞘间断处，离子交换点 | 跳跃传导 |
| `Ruhepotenzial` | 静息电位 | resting potential | 未受刺激时膜内外电位差 ≈ **−70 mV** | KLP 明文 [已验证] |
| `Aktionspotenzial` | 动作电位 | action potential | 短暂、可传导的电位反转 | KLP 明文 [已验证] |
| `Na⁺/K⁺-ATPase` | 钠钾泵 | sodium-potassium pump | 主动运输 3 Na⁺ 出、2 K⁺ 入，耗 ATP | 维持梯度 [据推断] |
| `Kalium-Leckkanal` | 钾漏通道 | potassium leak channel | 静息时开放的 K⁺ 通道 | 静息电位主因 [据推断] |
| `Depolarisation` | 去极化 | depolarisation | 膜电位向正值方向变化（Na⁺ 内流） | 上升相 |
| `Repolarisation` | 复极化 | repolarisation | 膜电位回到静息值（K⁺ 外流） | 下降相 |
| `Hyperpolarisation` | 超极化 | hyperpolarisation | 电位**低于**静息值 | 后电位 |
| `Schwellenwert` | 阈值 | threshold | 触发动作电位的最小去极化（≈ −55 mV） | 全或无开关 [据推断] |
| `Alles-oder-Nichts-Prinzip` | 全或无原则 | all-or-nothing | 达阈即全幅发放，幅度不随刺激强度变 | 核心原则 |
| `Refraktärzeit` | 不应期 | refractory period | 发放后一段时间不能再兴奋 | 限频率 [据推断] |
| `Potenzialmessung` | 电位测量 | potential measurement | 用微电极记录膜电位 | KLP 明文方法 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 神经元结构 —— 输入 → 整合 → 输出

中文：神经元按信息流向分三段 —— **Dendrit + Soma（输入与整合）→ Axonhügel（决策点）→ Axon + Axonterminale（输出）**。**动作电位在轴丘起始**（此处电压门控 Na⁺ 通道密度最高），沿轴突传导到末梢 [据推断]。

> *Klausur-Satz*: Ein Neuron gliedert sich in **Dendriten und Soma** (Aufnahme und Verrechnung), den **Axonhügel** (Entstehungsort des Aktionspotenzials) und das **Axon mit Endknöpfchen** (Weiterleitung). [据推断]

### 2.2 Ruhepotenzial —— 三步因果链

中文：静息电位（≈ −70 mV，**内负外正**）由三个因素共同造成：

1. **离子分布不均**：胞外 **Na⁺ 高**、胞内 **K⁺ 高**；胞内还有大量**带负电的大分子（Proteine/Anionen）**。
2. **Na⁺/K⁺-ATPase 主动泵**：每消耗 1 个 ATP，泵出 **3 Na⁺**、泵入 **2 K⁺**——既维持浓度梯度，又**净移出正电荷**（电致性，electrogen）[据推断]。
3. **选择性通透（K⁺ 漏通道）**：静息时膜对 **K⁺ 通透性远高于 Na⁺**，K⁺ 顺梯度**外流**，带走正电荷 → 膜内变负；外流的 K⁺ 被胞内负电荷拉回，形成**动态平衡**（约 −70 mV）。

⚠️ **失分点**：只说「离子浓度差」，漏掉 **Na⁺/K⁺-ATPase 的主动泵角色** [据推断，Lernbaum-Bio §2 Fehlerquelle]。

> *Klausur-Satz*: Das Ruhepotenzial entsteht durch die **ungleiche Ionenverteilung**, die **Na⁺/K⁺-ATPase** (3 Na⁺ hinaus, 2 K⁺ hinein) und die **hohe K⁺-Permeabilität** im Ruhezustand; durch den **K⁺-Ausstrom** wird das Zellinnere **negativ** gegenüber dem Außenraum. [据推断]

### 2.3 Aktionspotenzial —— 五相曲线

| 相 | 膜电位变化 | 离子机制 | 通道状态 |
|---|---|---|---|
| **Ruhe** | −70 mV | K⁺ 外流为主 | K⁺-Leckkanäle offen |
| **Depolarisation** | −70 → +30 mV | **Na⁺ 内流** | spannungsgesteuerte Na⁺-Kanäle **offen** |
| **Repolarisation** | +30 → −70 mV | **K⁺ 外流** | Na⁺-Kanäle **inaktiviert**, K⁺-Kanäle offen |
| **Hyperpolarisation** | −70 → −80 mV | K⁺ 外流**持续** | K⁺-Kanäle noch offen |
| **Erholung** | −80 → −70 mV | Na⁺/K⁺-ATPase 恢复梯度 | 泵活跃（耗 ATP） |

中文：**关键判据**——**去极化靠 Na⁺ 内流、复极化靠 K⁺ 外流**，两者方向相反，不可说反。**阈值（≈ −55 mV）** 是开关：未达阈值只有局部电位，达阈值则触发**全幅**动作电位。

> *Klausur-Satz*: Bei der **Depolarisation** strömen **Na⁺-Ionen ein** (spannungsgesteuerte Na⁺-Kanäle öffnen), bei der **Repolarisation** strömen **K⁺-Ionen aus**; anschließend stellt die **Na⁺/K⁺-ATPase** die Ionenverteilung wieder her. [据推断]

### 2.4 Alles-oder-Nichts-Prinzip —— 全或无

中文：动作电位的**幅度不随刺激强度变化**——只要达到阈值，就产生**相同幅度**的电位；刺激越强，只增加**发放频率**，不增加幅度。因此刺激强度被**编码为频率**（Frequenzcodierung）。

> *Klausur-Satz*: Nach dem **Alles-oder-Nichts-Prinzip** wird bei Erreichen des Schwellenwerts immer ein **gleich großes** Aktionspotenzial ausgelöst; eine stärkere Reizung erhöht nur die **Frequenz**, nicht die Amplitude. [据推断]

### 2.5 Refraktärzeit —— 为什么信号只朝一个方向走

中文：动作电位后有一段**不应期**：**绝对不应期**内 Na⁺ 通道处于**失活态**，任何刺激都不能再触发；**相对不应期**内需更强刺激。不应期**限制了最高发放频率**，并保证信号**单向传导**（后方膜尚在不应期，不能反向再兴奋）。

> *Klausur-Satz*: Während der **Refraktärzeit** sind die Na⁺-Kanäle inaktiviert, sodass kein weiteres Aktionspotenzial ausgelöst werden kann; dadurch wird die maximale Frequenz begrenzt und die **Weiterleitung in eine Richtung** gesichert. [据推断]

### 2.6 Potenzialmessungen —— 官方方法

中文：KLP 明文列出 `Potenzialmessungen` 作为神经生物学的方法 [已验证]。答题要点：**描述装置**（参考电极在胞外、测量电极刺入胞内）、**读出曲线**（各相与数值）、**说明局限**（单一测量点、细胞损伤、时间分辨率）。

> *Klausur-Satz*: Mit einer **intrazellulären Mikroelektrode** (Messelektrode innen, Referenzelektrode außen) wird die Potenzialdifferenz über der Membran gemessen und als **Zeit-Ort-Kurve** dargestellt. [据推断]

### ⛔ 分层差异（GK vs LK）

- **GK 要求**：`Ruhepotenzial`、`Aktionspotenzial`、`Erregungsleitung` + `Potenzialmessungen` [已验证]。
- **LK 增量**：`primäre und sekundäre Sinneszelle`、`Rezeptorpotenzial`（**感受器电位不遵循全或无，是分级电位**）、`Hormone`、`Neuronale Plastizität`（Summation / hemmende Synapse / Lernen）[已验证，Bio-Oberstufe.md §2 IF2]。
- ⚠️ **GK 不得引入**：感受器电位、激素交织、神经元可塑性（分层禁止清单）[已验证，Lernbaum-Bio §4 ⛔]。

---

## 3. 解题方法 (Methoden)

### 3.1 「静息电位三步因果法」

**编号步骤**：
1. **写分布**：胞外 Na⁺ 高、胞内 K⁺ 高 + 胞内负性大分子。—— *KLP 工具：`Ionenverteilung`*
2. **写泵**：Na⁺/K⁺-ATPase 3:2 主动运输，耗 ATP。—— *KLP 工具：`Membrantransport`（EF 已教）*
3. **写通透**：K⁺ 漏通道 → K⁺ 外流 → 内负外正。—— *KLP 工具：`selektive Permeabilität`（EF 已教）*

> **判据 / 决策点**：三步缺一不可；只写「浓度差」不得满分。

### 3.2 「电位曲线四问法」——分析任何电位图

**编号步骤**：
1. **定坐标**：横轴时间、纵轴膜电位（mV）；标出 −70 mV 静息线。
2. **分段**：Depolarisation → Repolarisation → Hyperpolarisation → Erholung。
3. **配离子**：每段写「哪个离子、往哪个方向、通道什么状态」。—— *KLP 工具：`auswerten`*
4. **读数值**：阈值、峰值、静息值、后电位最小值。—— *KLP 工具：`ermitteln`*

> **判据 / 决策点**：**上升 = Na⁺ 内流；下降 = K⁺ 外流**。方向说反是最高频失分点。

### 3.3 「全或无辨析法」——刺激强度 vs 电位幅度

**编号步骤**：
1. 判断刺激是否达阈值。
2. 达阈 → 幅度恒定，**频率**随强度变；未达阈 → 无动作电位。
—— *KLP 工具：`Alles-oder-Nichts-Prinzip`*

> **判据 / 决策点**：题目画「刺激强度 vs 电位幅度」图时，答案是**阶跃曲线**（阈值前为 0，阈值后为常数），不是线性上升。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 曲线三看法（走向 / 极值 / 因果）

- **技法内容**：任何 `y-x` 生物曲线固定三步 —— ① **看走向**：分段描述（陡升 / 平台 / 下降），引用具体区间数值；② **看极值/转折点**：峰值即最适点或最大值，平台即饱和；③ **看因果**：**转折点必对应机制切换**（如电位曲线由升转降 = Na⁺ 通道失活 + K⁺ 通道开放）。中国必修1 与选必1 对曲线读法训练密集。[据推断，Bio-DE-CN-Mapping CN-Methode 6]
- **DE-Anschluss**：`Potenzialmessungen`（**KLP 明文方法** [已验证]）· EF 的 `Enzyme: Kinetik` 曲线（已教）· 法定 Überprüfungsform `Darstellungsaufgaben`（明列「图表解释」）[据推断]。**曲线读法是德国的官方训练项。**
- **合规性**：✅ —— 两边都要求读曲线，本技法只是把顺序固化。中国的增量是「**转折点 = 机制切换**」这一句纠偏。
- **Abitur 应用**：**电位曲线分析题**（AFB II 主力）· LK 的 `Rezeptorpotenzial` 分级电位题 · Q 的 `Abhängigkeit der Fotosyntheserate`（GK 明文）。**AFB I（描述）+ II（解释）**。
- **来源**：`[CN-课标]` 必修1 2.2.1 + 选必1 1.3.2（静息电位→动作电位）+ `[CN-教材]` 曲线分析法

> **本课接口**：动作电位曲线是「三看法」的最佳载体——**走向**（上升/下降/后超极化）、**极值**（峰值 +30 mV、后电位 −80 mV）、**因果**（每段对应不同离子通道的开关）。⚠️ 注意区分：**感受器电位（LK）是分级电位，不遵循全或无**，不能用同一套判据。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（配电位曲线 / 膜剖面图）[已验证，KLP Kap. 4] |
| Operator | `auswerten` · `erklaeren` · `ermitteln` · `begruenden` · `darstellen` |
| AFB | I（读曲线/标注）→ **II（机制解释，重心）** |
| 建议分值 / 时长 | 3 题共约 22–28 BE，约 25–30 min（GK 255 min / LK 300 min）[已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Die Abbildung zeigt den zeitlichen Verlauf des Membranpotenzials einer Nervenzelle nach einem Reiz. Der Ruhewert liegt bei −70 mV, der Scheitelwert bei +30 mV; nach der Repolarisation fällt das Potenzial kurzzeitig auf −80 mV.
> a) Benennen Sie die Abschnitte A (Anstieg), B (Abfall) und C (Wert unter −70 mV).
> b) Erklären Sie die Ionenbewegungen in Abschnitt A und B.

**Aufgabe 2** `[原创]`
> Ein Forscher reizt ein Axon mit Reizen unterschiedlicher Stärke (S1 < S2 < S3, alle oberhalb des Schwellenwerts) und misst die Amplitude der Aktionspotenziale.
> Ermitteln Sie die zu erwartenden Amplituden und begründen Sie Ihr Ergebnis mit dem Alles-oder-Nichts-Prinzip.

**Aufgabe 3** `[NRW-改编]`
> Eine Substanz blockiert die Na⁺/K⁺-ATPase einer Nervenzelle vollständig.
> Erklären Sie, welche Folgen dies **langfristig** für das Ruhepotenzial hat, und begründen Sie, warum ein einzelnes Aktionspotenzial zunächst noch möglich ist.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) 命名**：A = **Depolarisation**, B = **Repolarisation**, C = **Hyperpolarisation** (Nachpotenzial). ✓ 得分点（三相对应正确）
2. **b) A 段**：Spannungsgesteuerte **Na⁺-Kanäle öffnen**; Na⁺ strömt **in die Zelle ein** (entlang des elektrochemischen Gradienten) → das Membranpotenzial wird **positiver**. ✓ 得分点（Na⁺ 内流）
3. **b) B 段**：Die Na⁺-Kanäle **inaktivieren**, gleichzeitig öffnen **K⁺-Kanäle**; K⁺ strömt **aus** → das Potenzial wird wieder **negativer**. ✓ 得分点（K⁺ 外流）
4. **收尾**：Nach der Hyperpolarisation stellt die **Na⁺/K⁺-ATPase** die ursprüngliche Ionenverteilung wieder her. ✓

**Aufgabe 2**
1. **预期幅度**：Alle drei Reize liegen **oberhalb des Schwellenwerts**; daher wird jeweils ein Aktionspotenzial **gleicher Amplitude** ausgelöst. ✓ 得分点（幅度相同）
2. **依据**：Das folgt aus dem **Alles-oder-Nichts-Prinzip**: Bei Erreichen des Schwellenwerts wird stets ein gleich großes Aktionspotenzial ausgelöst. ✓ 得分点（术语）
3. **强度编码**：Eine stärkere Reizung (S3) erhöht nicht die Amplitude, sondern die **Frequenz** der Aktionspotenziale. ✓ 得分点（频率编码）
4. **收尾**：Die Amplitude bleibt also konstant, die Frequenz steigt mit der Reizstärke. ✓

**Aufgabe 3**
1. **泵的作用**：Die **Na⁺/K⁺-ATPase** hält langfristig die **Ionenkonzentrationen** aufrecht (3 Na⁺ hinaus, 2 K⁺ hinein). ✓ 得分点（泵功能）
2. **长期后果**：Ohne die Pumpe laufen die Konzentrationsgradienten **allmählich aus**; das **Ruhepotenzial kann nicht mehr aufrechterhalten** werden und sinkt ab (Depolarisation des Ruhepotenzials). ✓ 得分点（梯度流失 → 静息电位崩溃）
3. **为何单个 AP 仍可能**：Ein einzelnes Aktionspotenzial benötigt nur den **bestehenden** Na⁺- und K⁺-Gradienten über der Membran; dieser ist **unmittelbar** nach Blockade noch vorhanden. ✓ 得分点（梯度是「存量」，非瞬时依赖泵）
4. **收尾**：Daher ist ein einzelnes AP zunächst möglich, während die **langfristige** Erhaltung des Ruhepotenzials an die Pumpe gebunden ist. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把「去极化」与「超极化」方向搞反 | 去极化 = 向**正**；超极化 = 低于**静息值** |
| 辨别错 | 说复极化靠「Na⁺ 外流」 | 复极化靠 **K⁺ 外流**；Na⁺ 是内流 |
| 知识错 | 解释静息电位只说「浓度差」 | 必写 **Na⁺/K⁺-ATPase** 主动泵 + K⁺ 漏通道 |
| 知识错 | 认为「刺激越强，动作电位幅度越大」 | **全或无**：幅度恒定，**频率**变 |
| 知识错 | 忽略 Refraktärzeit 对单向传导的意义 | 补「后方膜处于不应期」 |
| 表达错 | 说 Na⁺/K⁺-ATPase「泵 2 Na⁺ 出、3 K⁺ 入」 | 记牢 **3 Na⁺ 出、2 K⁺ 入** |
| 表达错 | 电位单位写错 | 一律 **mV**，静息 ≈ −70 mV |

---

## 7. Vernetzung

- **上游**：[`Biomembran-Transportmechanismen-und-Osmose.md`](Biomembran-Transportmechanismen-und-Osmose.md)（主动运输/离子通道，**EF 唯一已就位的 Q 接口**）· [`Signaltransduktion.md`](Signaltransduktion.md)（EF）
- **下游**：[`Synapse-und-neuromuskulaere-Synapse.md`](Synapse-und-neuromuskulaere-Synapse.md)（★ 直接下游）· `Erregungsleitung.md`（⚠️ 缺口，跳跃传导）· LK 的 `Sinneszellen-und-Rezeptorpotenzial.md` / `Neuronale-Plastizitaet.md`（⚠️ 缺口）
- **横向**：[`ATP-ADP-und-Redoxreaktionen.md`](ATP-ADP-und-Redoxreaktionen.md)（泵耗 ATP）· [`Zelldifferenzierung-und-Kompartimentierung.md`](Zelldifferenzierung-und-Kompartimentierung.md)（膜与区室）
- **Basiskonzept**：`Information und Kommunikation`（第 3 轴）· `Steuerung und Regelung`（第 4 轴）
- **术语卡**：`Ruhepotenzial` · `Aktionspotenzial` · `Na⁺/K⁺-ATPase` · `Depolarisation` · `Schwellenwert` · `Alles-oder-Nichts-Prinzip`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于官方条目/项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
