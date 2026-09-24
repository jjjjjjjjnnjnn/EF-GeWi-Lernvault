---
fach: Bio
thema: "Stammbäume und Artbildung (系统树与物种形成)"
operatoren: [interpretieren, analysieren, begruenden, vergleichen, erklaeren, beurteilen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Bio, Genetik und Evolution]
stufe: "Q1|Q2"
kursart: "GK|LK"
---

# Stammbäume und Artbildung (系统树与物种形成)

> **中文理解**：这是 Q 阶段 IF5「Genetik und Evolution」下 `Stammbäume und Verwandtschaft` 的核心条目，KLP 原文列出 `Artbildung`、`Biodiversität`、`populationsgenetischer Artbegriff`、`Isolation`、`molekularbiologische Homologien`、`ursprüngliche und abgeleitete Merkmale` [已验证，Bio-Oberstufe.md §2 IF5]。它包含两条主线：**① 用共有衍征读系统树、重建亲缘关系**；**② 通过隔离 → 分化 → 生殖隔离形成新物种**。
>
> **Klausur-Relevanz**：`ursprüngliche vs abgeleitete Merkmale` 与 `populationsgenetischer Artbegriff` 是**中国课标完全没有的工具**（中国只有化石/比较解剖的证据罗列），属德国系统学方法学的必修项 [据推断，Bio-DE-CN-Mapping GEN-09]。主战场 **AFB II**（`interpretieren` / `analysieren` / `begruenden`）。

> **⚠️ EF→Q 断层（本项目显式命名）**：**Genetik und Evolution 在 EF 几乎无接口**，本条目尤其明显——EF 的 `Karyogramm` / `Meiose` 只到**细胞层**，未涉及**系统学与物种概念** [已验证，Bio-DE-CN-Mapping §0.4]。唯一可用锚点是 [`Meiose-und-Rekombination.md`](Meiose-und-Rekombination.md)（重组 → 种群内变异）与 EF 明文的 `Analyse von Familienstammbäumen`（**系谱分析**，与本条目的系统树同词不同义，须先辨析）。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `phylogenetischer Stammbaum` | 系统树（演化树） | phylogenetic tree | 用共有衍征表示物种间**亲缘关系**的分支图 | ≠ 家系系谱 [据推断] |
| `Familienstammbaum` | 家系系谱 | pedigree | 表示个体间遗传传递的图 | EF 已教，**不同义** [已验证] |
| `ursprüngliches Merkmal` | 原始特征 | plesiomorphic character | 从共同祖先**继承而来、未改变**的特征 | 不能定义 clade [据推断] |
| `abgeleitetes Merkmal` | 衍生特征 | apomorphic character | 相对祖先**新出现**的特征 | 划分依据 [据推断] |
| `Synapomorphie` | 共有衍征 | synapomorphy | 一个演化支内**共有**的衍生特征 | 定义 monophyletisch 的判据 [据推断] |
| `Homologie` | 同源 | homology | 结构/分子上**来源相同**（无论功能是否相同） | 亲缘证据 [据推断] |
| `Analogie / Konvergenz` | 同功 / 趋同 | analogy / convergence | 功能相似但**来源不同** | **不可**作亲缘证据 [据推断] |
| `molekularbiologische Homologien` | 分子同源性 | molecular homologies | DNA/蛋白质序列的相似性 | KLP 明文 [已验证] |
| `biologischer Artbegriff` | 生物学物种概念 | biological species concept | 以**生殖隔离**为核心（Mayr） | 经典定义 [据推断] |
| `populationsgenetischer Artbegriff` | 群体遗传学物种概念 | population-genetic species concept | 以**独立演化的基因库/等位基因频率**为核心 | 德国工具 [据推断] |
| `Isolation` | 隔离 | isolation | 阻断基因交流的机制 | KLP 明文 [已验证] |
| `reproduktive Isolation` | 生殖隔离 | reproductive isolation | 不再能产生可育后代 | 物种形成终点 [据推断] |
| `allopatrische / sympatrische Artbildung` | 异域 / 同域物种形成 | allopatric / sympatric speciation | 有无地理隔离的两种路径 | 分类判据 [据推断] |
| `adaptive Radiation` | 适应辐射 | adaptive radiation | 一个祖先快速分化出多物种 | 多样化模式 [据推断] |
| `Biodiversität` | 生物多样性 | biodiversity | 基因/物种/生态系统三层次 | QP `S8` [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 系统树 ≠ 家系系谱（先辨析，再读图）

中文：德语 `Stammbaum` 有两义，**必须区分**——**`Familienstammbaum`（家系系谱）** 表示**个体间**的遗传传递（EF 已教，用于遗传推断）；**`phylogenetischer Stammbaum`（系统树）** 表示**物种/类群间**的亲缘关系（本笔记主题）。系统树**不是**「进化时间序列」，而是**亲缘关系图**。

> *Klausur-Satz*: Ein **phylogenetischer Stammbaum** stellt die **Verwandtschaftsbeziehungen** zwischen Arten dar und ist **kein** zeitlicher Ablauf der Evolution; er ist vom **Familienstammbaum** (Vererbung zwischen Individuen) zu unterscheiden. [据推断]

### 2.2 读系统树四要素

1. **节点（Knoten）**：代表**共同祖先**（多为假设祖先，未必有化石）。
2. **分叉（Verzweigung）**：表示**谱系分离**，**越晚分叉 = 亲缘越近**。
3. **末端（rezente Arten）**：现存物种；**两条末端之间的亲缘由最近的共同节点决定**。
4. **分支长度**：可表示时间或遗传距离——**须先看图的图例**，不可默认是时间。

> *Klausur-Satz*: Je **später** zwei Arten sich in einem Stammbaum **verzweigen**, desto **näher** sind sie verwandt; die **Länge der Äste** gibt nur dann die Zeit an, wenn dies in der Legende ausdrücklich angegeben ist. [据推断]

### 2.3 原始特征 vs 衍生特征 —— 划分演化支的唯一依据

中文：**原始特征**是从祖先继承、**未改变**的（如哺乳动物的脊柱）——**不能**用来定义某个 clade；**衍生特征**是相对祖先**新出现**的（如哺乳动物的乳腺）——**共有衍征（Synapomorphie）** 才是划分依据。判断某特征是原始还是衍生，靠 **外群比较（Außengruppenvergleich）**：若外群也有 → 原始；若只有内群有 → 衍生 [据推断]。

> *Klausur-Satz*: Eine **Monophylie** wird nur durch **gemeinsame abgeleitete Merkmale (Synapomorphien)** begründet, nicht durch ursprüngliche Merkmale; die Zuordnung erfolgt über den **Vergleich mit der Außengruppe**. [据推断]

### 2.4 同源 vs 同功 (Homologie vs Analogie)

| 判据 | Homologie | Analogie (Konvergenz) |
|---|---|---|
| 来源 | **相同**（共同祖先） | **不同**（独立演化） |
| 功能 | 可同可不同 | 通常相同 |
| 例 | 人手 / 蝙蝠翼 / 鲸鳍（前肢骨骼同源） | 鸟翼 / 昆虫翅 |
| 亲缘价值 | **可用** | **不可用** |

中文：**关键判据**——判断亲缘只能靠**同源**；功能相似（同功）是**趋同演化**的结果，反而是**误导**。

> *Klausur-Satz*: Nur **Homologien** (gleicher Ursprung) belegen Verwandtschaft; **Analogien** beruhen auf **Konvergenz** und sind als Verwandtschaftsbeweis **unbrauchbar**. [据推断]

### 2.5 分子同源性 (molekularbiologische Homologien)

中文：比较 **DNA 序列或蛋白质氨基酸序列**的相似度可量化亲缘——**差异越小，亲缘越近**。常用 **rRNA / 细胞色素 c / 线粒体 DNA** 等分子钟。这为形态学证据提供**独立验证** [据推断]。⚠️ **方法层（PCR / 电泳）属 LK**，GK 只要求「比较序列差异」这一结论层 [已验证，Bio-Oberstufe.md §2 IF5]。

> *Klausur-Satz*: **Molekularbiologische Homologien** beruhen auf dem Vergleich von DNA- oder Proteinsequenzen: Je **geringer** die Unterschiede, desto **näher** sind die Arten verwandt. [据推断]

### 2.6 物种概念 (Artbegriff)

| 概念 | 核心判据 | 局限 |
|---|---|---|
| **biologischer Artbegriff** | 个体间可交配并产生**可育后代** | 不适用无性繁殖生物、化石 |
| **populationsgenetischer Artbegriff** | 具有**独立演化**的基因库（等位基因频率独立变化） | 需群体数据 [据推断] |

中文：德国要求**两个概念都会用**——形态相似的物种用**生殖隔离**判，化石/无性生物用**群体遗传**判。`populationsgenetischer Artbegriff` 是**中国课标完全没有的工具** [据推断，Bio-DE-CN-Mapping GEN-09]。

> *Klausur-Satz*: Der **biologische Artbegriff** definiert Arten über **reproduktive Isolation**, der **populationsgenetische Artbegriff** über **unabhängig evolvierende Genpools**. [据推断]

### 2.7 物种形成 (Artbildung) —— 顺序不可颠倒

中文：**正确顺序是「隔离 → 分化 → 生殖隔离」**：
1. **隔离（Isolation）**：地理隔离（allopatrisch）或同域隔离（sympatrisch）阻断基因流。
2. **分化（Divergenz）**：被隔离的种群在**突变 + 重组 + 选择 + 漂变**下**独立积累差异**（引 [`Synthetische-Evolutionstheorie.md`](Synthetische-Evolutionstheorie.md)）。
3. **生殖隔离（reproduktive Isolation）**：差异积累到**无法再产生可育后代** → 新物种形成。

⚠️ **最易失分点**：**地理隔离 ≠ 生殖隔离**。地理隔离是**起点**，生殖隔离是**终点**，中间必须写「分化」。

> *Klausur-Satz*: Artbildung verläuft in der Reihenfolge **Isolation → Divergenz → reproduktive Isolation**: Zuerst wird der **Genfluss** unterbrochen, dann entwickeln sich die Teilpopulationen durch Mutation, Selektion und Gendrift **unabhängig**, bis schließlich eine **reproduktive Isolation** entsteht. [据推断]

### 2.8 适应辐射 (adaptive Radiation)

中文：一个祖先进入多样化的生态位（岛屿/湖泊）后**快速分化**出多物种（达尔文雀、丽鱼），前提是**生态位空缺 + 隔离** [据推断]。*Klausur-Satz*: Bei einer **adaptiven Radiation** differenziert ein Ausgangsstamm schnell in **viele Arten**, wenn **verschiedene ökologische Nischen** verfügbar und die Populationen **isoliert** sind. [据推断]

### 2.9 Biodiversität（QP `S8` 落点）

中文：生物多样性含**三个层次**——**基因多样性、物种多样性、生态系统多样性**；保护理由（`S8`）：生态功能（稳定性/服务）、经济价值、伦理与审美价值、未来潜力，评价题（AFB III）须**多视角权衡** [已验证，Bio-Oberstufe.md §3 S8]。*Klausur-Satz*: **Biodiversität** umfasst die **genetische**, die **Arten-** und die **Ökosystemvielfalt**; ihre Erhaltung lässt sich ökologisch, ökonomisch und ethisch begründen. [据推断]

### ⛔ 分层差异（GK vs LK）

- **GK 要求**：本笔记 2.1–2.9 的**概念与解释层**全部为 GK 内容 [已验证，Bio-Oberstufe.md §2 IF5]。
- **LK 增量**（**GK 不得引入**）：`Evolution des Menschen und kulturelle Evolution`（人类演化）· `Sozialverhalten bei Primaten` · `Krebs` / `Onkogene` · `PCR` / `Gelelektrophorese` / `Gentechnik` [已验证，Lernbaum-Bio §4 ⛔]。
- ⚠️ **GK 的 Genetik 段落无任何 Fachliche Verfahren**——分子序列比对**在方法层（PCR/电泳）属 LK**；GK 只要求结论层（序列差异 → 亲缘）[已验证，Bio-Oberstufe.md §2 IF5]。
- ⚠️ **定量基因频率计算**（p/q）仅 LK 合规 [据推断，Bio-DE-CN-Mapping §0.5]。

---

## 3. 解题方法 (Methoden)

### 3.1 系统树读图法（interpretieren 题四步）

**编号步骤**：
1. **定外群**：找图中标注的 **Außengruppe**，用来判断哪些特征是原始/衍生。—— *KLP 工具：`Außengruppenvergleich`*
2. **标衍生特征**：在每个分支上标出**新出现**的特征（Synapomorphie）。—— *KLP 工具：`abgeleitetes Merkmal`*
3. **定 clade**：只有**共有衍征**支持的支才是 **monophyletisch**；含原始特征的不算。—— *KLP 工具：`Kladistik`*
4. **判亲缘**：**最近共同节点越靠后 = 亲缘越近**；回答「哪两个最亲」时找**最深的共同分叉**。—— *KLP 工具：`interpretieren`*

> **判据 / 决策点**：**绝不把系统树读成「从左到右的进化序列」**——末端物种**都**是现存的，没有「更高级」之分。

### 3.2 系谱分析两步判定 + 概率尾巴（复用 EF 方法，注意与系统树区别）

**编号步骤**：
1. **判显隐**：「无中生有」→ 隐性；「有中生无」→ 显性。—— *KLP 工具：`Familienstammbaum`（EF 已教）*
2. **判伴性**：伴 X 隐看**交叉遗传**（外祖父 → 女儿 → 外孙）与男性患者集中；伴 X 显看「父传女必患」；伴 Y 看「父传子全传」。—— *KLP 工具：`Karyogramm` / 性染色体（EF 已教）*
3. **留概率尾巴**：小样本写「**weist auf … hin**」，不写「muss」；再进入概率计算（见 [`CN-Bio-Genetik-Rechenschema.md`](CN-Bio-Genetik-Rechenschema.md)）。—— *KLP 工具：`begruenden`*

> **判据 / 决策点**：**先辨图类型**——画的是**个体**（Familienstammbaum）还是**物种**（phylogenetischer Stammbaum）？前者用本方法，后者用 3.1。两者术语相同、方法完全不同。

### 3.3 「物种形成顺序法」（Artbildung 题）

1. **写起点**：先有**一个**种群与**基因流**。
2. **写隔离**：地理隔离（allopatrisch）或同域（sympatrisch）→ **基因流中断**。
3. **写分化**：被隔离种群在 Mutation/Selektion/Gendrift 下**独立积累差异**。
4. **写终点**：差异 → **reproduktive Isolation** → 新物种。
—— *KLP 工具：`Isolation` + `reproduktive Isolation`*

> **判据 / 决策点**：**顺序说反是最高频失分**——必须是「先隔离、后生殖隔离」。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 系谱分析两步判定 + 概率尾巴（复用，含与系统树的辨析）

- **技法内容**：拿到 `Familienstammbaum` 固定走两步——① **判显隐**（无中生有 → 隐性；有中生无 → 显性）；② **判伴性**（交叉遗传 / 男性集中 / 父传女必患 / 父传子全传）。第三步永远**留概率尾巴**（小样本写「weist auf … hin」），判定完成后再进入概率计算。[据推断，Bio-DE-CN-Mapping CN-Methode 2]
- **DE-Anschluss**：`Analyse von Familienstammbäumen`（**EF 的 Fachliche Verfahren 明文点名** [已验证]）· EF 的 `Rekombination` / `Karyogramm` · Q 的 `Familienstammbäume` / `Gentest und Beratung`。**零新增工具**。
- **合规性**：✅ —— 系谱分析在德国**从 EF 就是官方方法**，本技法只补「判定顺序 + 措辞边界」。⚠️ **辨析提示**：本技法用于 **Familienstammbaum（个体系谱）**；**系统树（物种亲缘）必须换用 3.1 的系统树读图法**，二者**不可互套**。
- **Abitur 应用**：EF 的 `Familienstammbäume` 分析题 + Q 的人类遗传病题；常与 `Gentest und Beratung` 的**伦理评价**合考（AFB III）。⚠️ 德国答题须保留**概率措辞**，不得写成确定性断言。
- **来源**：`[CN-课标]` 必修2 3.2.4 + 3.3.6 + `[CN-高考]` 系谱题型

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（配系统树 / 系谱图 / 序列比对表）[已验证，KLP Kap. 4] |
| Operator | `interpretieren` · `analysieren` · `begruenden` · `vergleichen` · `beurteilen` |
| AFB | I（读图/标注）→ **II（亲缘推断与物种形成解释，重心）** → III（多样性保护评价） |
| 建议分值 / 时长 | 3 题共约 22–28 BE，约 25–30 min（GK 255 min / LK 300 min，4 选 3）[已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Die Abbildung zeigt einen phylogenetischen Stammbaum mit den Arten A, B, C und D. Das Merkmal „Wirbelsäule" tritt bei allen vier Arten auf, das Merkmal „Federkleid" nur bei A und B.
> a) Entscheiden Sie, ob es sich bei diesen Merkmalen um ursprüngliche oder abgeleitete Merkmale handelt, und begründen Sie Ihre Entscheidung.
> b) Bestimmen Sie, welche zwei Arten am nächsten verwandt sind, und begründen Sie Ihre Antwort mit dem Stammbaum.

**Aufgabe 2** `[NRW-改编]`
> Zwei Populationen einer Insektenart leben auf zwei durch einen Fluss getrennten Wiesen. Nach mehreren tausend Jahren können Individuen der beiden Populationen keine fruchtbaren Nachkommen mehr miteinander erzeugen.
> Erklären Sie die Entstehung dieser neuen Art in der richtigen Reihenfolge der Ereignisse.

**Aufgabe 3** `[原创]`
> Die Tabelle zeigt die Anzahl unterschiedlicher Basen in einem bestimmten DNA-Abschnitt im Vergleich zu Art X.
> | Art | Anzahl unterschiedlicher Basen (gegenüber X) |
> |---|---|
> | Y | 4 |
> | Z | 15 |
> | W | 22 |
> Werten Sie die Daten aus und leiten Sie ab, welche Art mit X am nächsten verwandt ist. Begründen Sie, warum molekulare Homologien als Verwandtschaftsbeweis geeignet sind.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a) Wirbelsäule**：Die Wirbelsäule tritt bei **allen** Arten auf und ist damit ein **ursprüngliches Merkmal** (von einem gemeinsamen Vorfahren übernommen); sie kann keine Monophylie begründen. ✓ 得分点（原始特征判定 + 理由）
2. **a) Federkleid**：Das Federkleid tritt nur bei **A und B** auf und ist daher ein **abgeleitetes Merkmal (Synapomorphie)** für die Gruppe A + B. ✓ 得分点（衍生特征判定）
3. **b) 亲缘判断**：Am nächsten verwandt sind die Arten, die sich am **spätesten** verzweigen — hier **A und B**, da sie die **jüngste gemeinsame Stammform** besitzen. ✓ 得分点（最晚分叉 = 最近亲缘）
4. **收尾**：Gemeinsame abgeleitete Merkmale (hier das Federkleid) begründen die **Monophylie** von A und B. ✓

**Aufgabe 2**
1. **起点**：Ursprünglich bildeten beide Wiesen **eine Population** mit **Genfluss**. ✓
2. **隔离**：Durch den **Fluss** entstand eine **geografische Isolation** (allopatrische Artbildung); der **Genfluss** zwischen den Teilpopulationen wurde unterbrochen. ✓ 得分点（地理隔离 → 基因流中断）
3. **分化**：Die getrennten Populationen entwickelten sich durch **Mutation, Selektion und Gendrift** unabhängig; die **Allelfrequenzen** divergierten. ✓ 得分点（分化 + 三因子）
4. **终点**：Schließlich entstand eine **reproduktive Isolation** — die Individuen können keine **fruchtbaren Nachkommen** mehr bilden. ✓ 得分点（生殖隔离 = 物种形成）
5. **收尾**：Die Reihenfolge lautet also **Isolation → Divergenz → reproduktive Isolation**. ✓ 得分点（顺序正确）

**Aufgabe 3**
1. **看数据**：Art **Y** weist mit **4** die **wenigsten** unterschiedlichen Basen gegenüber X auf, Art W mit 22 die meisten. ✓ 得分点（读最小值）
2. **推断**：Da die Unterschiede bei Y am geringsten sind, ist **Y am nächsten mit X verwandt**. ✓ 得分点（差异越小 → 亲缘越近）
3. **依据（为何可用）**：**Molekularbiologische Homologien** beruhen auf **gemeinsamem Ursprung** (gleiche DNA-Abschnitte); je **geringer** die Unterschiede, desto **jünger** die gemeinsame Stammform. ✓ 得分点（同源性论证）
4. **收尾**：Der Vergleich der Sequenzen liefert damit ein **unabhängiges** Maß für die Verwandtschaft, das die morphologischen Befunde **ergänzt**. ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把系统树读成「从左到右的进化序列」 | 末端**都是现存**物种；读**共同节点**判亲缘 |
| 辨别错 | 混淆 `Familienstammbaum` 与 `phylogenetischer Stammbaum` | 先看对象是**个体**还是**物种**，再选方法 |
| 知识错 | 用原始特征（如脊柱）划分 clade | 只能用**共有衍征（Synapomorphie）** |
| 知识错 | 把同功（如鸟翼/昆虫翅）当亲缘证据 | 同功是**趋同**，不可用 |
| 知识错 | 把「地理隔离」直接说成「生殖隔离」 | 顺序：**地理隔离 → 分化 → 生殖隔离** |
| 表达错 | 说某物种「更高级/更进化」 | 系统树无「高级」之分；改写「亲缘更近」 |
| 表达错 | 混淆两套 `Artbegriff` 的判据 | 生殖隔离 vs 独立基因库，分别对应两概念 |

---

## 7. Vernetzung

- **上游**：[`Synthetische-Evolutionstheorie.md`](Synthetische-Evolutionstheorie.md)（★ 直接上游：五因子 → 分化）· [`Meiose-und-Rekombination.md`](Meiose-und-Rekombination.md)（**EF 锚点**：变异来源）· [`Karyogramm-und-Mutationstypen.md`](Karyogramm-und-Mutationstypen.md)（EF，染色体层面）
- **下游**：LK 的 [`LK-Krebs-Humanevolution-Methoden.md`](LK-Krebs-Humanevolution-Methoden.md)（⚠️ 人类演化/PCR，`[LK]`）· [`CN-Bio-Genetik-Rechenschema.md`](CN-Bio-Genetik-Rechenschema.md)（系谱概率）
- **横向**：`07_Oekologie/` 的 `Toleranzkurven-und-oekologische-Potenz.md`（生态位 → 适应辐射）· `03_Mathe/` 距离与相似度（序列比对）
- **Basiskonzept**：`individuelle und evolutive Entwicklung`（第 5 轴）· `Struktur und Funktion`（第 1 轴，同源结构）
- **术语卡**：`phylogenetischer Stammbaum` · `Synapomorphie` · `ursprüngliches / abgeleitetes Merkmal` · `Homologie` · `populationsgenetischer Artbegriff` · `reproduktive Isolation`

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于官方条目/项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
