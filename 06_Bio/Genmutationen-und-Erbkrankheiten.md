---
fach: Bio
thema: "Genmutationen und Erbkrankheiten (基因突变与遗传病)"
operatoren: [angeben, erklaeren, begruenden, beurteilen, bewerten, ermitteln, auswerten, Stellung nehmen]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Bio, Genetik]
stufe: "Q1"
kursart: "GK|LK"
---

# Genmutationen und Erbkrankheiten (基因突变与遗传病)

> **中文理解**：本笔记覆盖 IF5 的两块内容——`Zusammenhänge zwischen genetischem Material, Genprodukten und Merkmal`（`Genmutationen`）与 `Genetik menschlicher Erkrankungen`（`Familienstammbäume` / `Gentest und Beratung` / `Gentherapie`）。主线是**因果链**：突变 → 基因产物改变 → 表型/疾病。
> 这是本组笔记中**中国技法落地最完整**的一篇：系谱两步判定 + 遗传计算三步程序在此汇合 [据推断，Bio-DE-CN-Mapping GEN-04/05]。
>
> **Klausur-Relevanz**：突变后果推演是 AFB II 的**标准答案骨架**；遗传病题必带 **AFB III**（`Gentest` 伦理评价）——德国答题**不做纯技术分析**。

---

## 0. ⚠️ EF-Anschluss：断层定位与起桥

> EF 已含 `Karyogramm`（`Genom-` / `Chromosomenmutationen`）与 `Analyse von Familienstammbäumen`（明文方法）——这是 EF 留给 Genetik 的**两个真实接口**。本笔记把 EF 的**染色体层突变**向下接到**基因层突变**，并把 EF 的系谱方法升级为「判定 + 计算」的完整工序 [据推断]。

| EF 已有节点 | 本笔记的升级 | 桥的性质 |
|---|---|---|
| `Karyogramm` → `Genom-` / `Chromosomenmutationen` | 补第三类 **`Genmutation`**（碱基层） | 🟢 直接对照 |
| `Analyse von Familienstammbäumen`（方法） | 升级为**两步判定 + 概率尾巴** | 🟢 有机接口 |
| `Meiose` / `Rekombination` | 突变是**新等位基因的来源**（演化上游） | 🟢 直接衔接 |
| `Zellzyklus-Regulation` | 突变累积 → 细胞周期失控（→ 见 LK 肿瘤篇） | 🟡 指向 LK |

> *Klausur-Satz*: Genmutationen verändern die **Basensequenz** eines Gens; sie sind von Genom- und Chromosomenmutationen (EF) abzugrenzen, die ganze Chromosomen bzw. Chromosomenabschnitte betreffen. [据推断]

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 要点 | 备注 |
|---|---|---|---|---|
| `Genmutation` | 基因突变 | gene mutation | 碱基序列改变（点突变 / 移码） | 本笔记核心 |
| `Punktmutation` | 点突变 | point mutation | 单个碱基被替换 | [据推断] |
| `Substitution` | 替换 | substitution | 一种碱基换成另一种 | 中国对应「替换」 |
| `Insertion / Deletion` | 插入 / 缺失 | insertion / deletion | 增加 / 丢失碱基 | 可致移码 |
| `Rastermutation` | 移码突变 | frameshift mutation | 非 3 倍数插入/缺失 → 读框移位 | ⚠️ 后果通常更重 |
| `stille Mutation` | 同义突变 | silent mutation | 密码子变但氨基酸不变（简并性） | 无表型后果 |
| `Missense-Mutation` | 错义突变 | missense mutation | 氨基酸被换成另一个 | [据推断] |
| `Nonsense-Mutation` | 无义突变 | nonsense mutation | 变 `Stoppcodon` → 提前终止 | 蛋白截短 |
| `Genom- / Chromosomenmutation` | 基因组 / 染色体突变 | genomic / chromosomal mutation | 染色体数目 / 结构改变 | **EF 已学** [已验证] |
| `Erbgang` | 遗传方式 | mode of inheritance | 显/隐 × 常/X 染色体 | 判定目标 |
| `Familienstammbaum` | 系谱图 | pedigree | 家族世代遗传关系图 | **EF 方法** [已验证] |
| `Gentest` | 基因检测 | genetic test | 检测特定等位基因 | GK=LK |
| `Gentherapie` | 基因治疗 | gene therapy | 修正或补偿缺陷基因 | GK=LK（**方法细节为 LK**） |
| `Konduktorin` | 携带者（女性） | carrier | 杂合但不发病 | 伴 X 隐 |

---

## 2. 知识结构 (Struktur)

### 2.1 Genmutationen —— 三种基本类型与后果

| Typ | 变化 | 对蛋白质的影响 | 后果强度 |
|---|---|---|---|
| **Substitution** | 一个碱基被换 | 可能无影响（still）/ 换氨基酸（Missense）/ 变终止（Nonsense） | 视位置而定 |
| **Insertion**（非 3 倍） | 插入碱基 | **读框移位** → 后续全变 | **通常严重** |
| **Deletion**（非 3 倍） | 丢失碱基 | **读框移位** → 后续全变 | **通常严重** |

中文：突变后果**不只看类型，更看位置**。若替换发生在密码子第三位，常因遗传密码的**简并性**而无影响；移码突变则从突变点起使整段氨基酸序列改变，后果通常更严重。

> *Klausur-Satz*: Eine **Rastermutation** (Insertion oder Deletion, deren Länge kein Vielfaches von drei ist) verschiebt den Leseraster und verändert damit alle folgenden Aminosäuren; sie ist daher meist folgenschwerer als eine **Substitution**. [据推断]

### 2.2 Vom Gen zum Merkmal —— 因果链

中文：`Genmutation → verändertes mRNA-Codon → veränderte Aminosäuresequenz → veränderte Proteinstruktur → veränderte Funktion → Merkmal / Krankheit`。**关键**：结构决定功能（Basiskonzept `Struktur und Funktion`）。

> *Klausur-Satz*: Eine Genmutation kann über eine veränderte Aminosäuresequenz die **Proteinstruktur** und damit die **Funktion** verändern und so das Merkmal beeinflussen. [据推断]

### 2.3 Genetik menschlicher Erkrankungen —— 系谱、检测、治疗

- **`Familienstammbäume`**：用系谱反推 `Erbgang`（显/隐、常/X 染色体）——EF 已点名的方法，Q 阶段继续用 [已验证]。
- **`Gentest und Beratung`**：检测特定等位基因以评估患病风险；须配合**遗传咨询**（概率 + 心理/伦理）。
- **`Gentherapie`**：修正或补偿缺陷基因。⚠️ 具体**分子方法（载体、PCR 等）属 LK**（见 [`LK-Krebs-Humanevolution-Methoden.md`](LK-Krebs-Humanevolution-Methoden.md)）。

> *Klausur-Satz*: Ein Gentest kann das Risiko abschätzen, liefert aber nur **Wahrscheinlichkeiten** und muss daher mit einer genetischen Beratung verbunden werden. [据推断]

### 2.4 ⚠️ 分层标注：GK vs LK

| 内容 | GK | LK |
|---|---|---|
| `Genmutationen` + 后果推演 | ✅ | ✅ |
| `Familienstammbäume` / `Gentest` / `Gentherapie`（概念与评价） | ✅ | ✅ |
| `Gentherapie` 的**分子方法细节**（载体构建等） | ⛔ **不考** | ✅ |
| PCR / 电泳 / 基因工程 | ⛔ **GK 无任何 Fachliche Verfahren** | ✅ |

> *Klausur-Satz*: Im Grundkurs enthält der Bereich Genetik **keine** fachlichen Verfahren; PCR, Gelelektrophorese und Gentechnik sind dem Leistungskurs vorbehalten. [已验证]

---

## 3. 解题方法 (Methoden)

### 3.1 系谱分析两步判定 + 概率尾巴（核心方法）

**编号步骤**：
1. **编号**：给系谱标 P / F1 / F2。—— *KLP 工具：`Analyse von Familienstammbäumen`（EF 明文）*
2. **判显隐**：「无中生有」（父母正常、子患病）→ **隐性**；「有中生无」（父母患病、子正常）→ **显性**。—— *KLP 工具：`Erbgang`*
3. **判染色体**：伴 X 隐看**交叉遗传**（外祖父→女儿→外孙）与男性患者集中；伴 X 显看「父传女必患」；伴 Y 看「父传子全传」。—— *KLP 工具：`Karyogramm`（EF）*
4. **定基因型**：写出各代基因型（A_ / aa）。—— *KLP 工具：`Genotyp`*
5. **留概率尾巴**：小样本写 `weist auf … hin`，**不写 `muss`**。—— *KLP 工具：AFB III 的 `Geltungsgrenze` 要求*

> **判据 / 决策点**：**先判显隐、再判染色体、最后算概率**——顺序不可颠倒；且**先定基因型再算概率**。

### 3.2 遗传计算三步程序（分离 → 组合 → 配子）

**编号步骤**：
1. **分离**：就**每一对**相对性状单独判显隐、写基因型、得该对表型比（3:1 或 1:1）。—— *KLP 工具：`Meiose` 的分离*
2. **组合**：多对性状用**乘法原理**合并；多对时用**分枝法**列配子。—— *KLP 工具：`Rekombination` 的自由组合*
3. **配子 → 后代**：先求亲本各配子概率，再按「同时相乘、互斥相加」合成目标概率。—— *KLP 工具：数学概率规则*
4. **措辞**：写 `Die Wahrscheinlichkeit beträgt …`，**禁止** `Es wird sicher …`。

> **判据 / 决策点**：详细工序见 [`CN-Bio-Genetik-Rechenschema.md`](CN-Bio-Genetik-Rechenschema.md)（本笔记只保留与突变/遗传病的接口）。

### 3.3 突变后果推演矩阵

**编号步骤**：
1. 判断突变类型（替换 / 插入 / 缺失）。—— *KLP 工具：`Genmutationen`*
2. 判断是否**3 的倍数**（决定是否移码）。
3. 沿中心法则逐级推：碱基 → 密码子 → 氨基酸 → 结构 → 功能 → 表型。
4. 用 `Struktur und Funktion` 收尾。

> **判据 / 决策点**：题目问 `beurteilen` 时，必须写出**后果的不确定性**（是否影响功能取决于位置）。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 遗传计算三步程序 + 系谱两步判定（双卡合用）

- **技法内容**：① **三步程序**——分离（每对性状单独判）→ 组合（乘法/分枝法）→ 配子（先配子后后代，同时相乘、互斥相加）；② **两步判定**——先判显隐（无中生有 / 有中生无）→ 再判染色体（交叉遗传 / 父传女 / 父传子）；③ **概率尾巴**——小样本写 `weist auf … hin`。来源：`[CN-课标]` 必修2 3.2.3（预测子代遗传性状）+ 学业要求「运用统计与概率」+ 3.2.4（伴性遗传）+ `[CN-高考]` 系谱题。[据推断]
- **DE-Anschluss**：`Meiose` · `Rekombination` · `Karyogramm` · `Analyse von Familienstammbäumen`（**EF 全部已教**）· `Familienstammbäume` / `Gentest und Beratung`（Q 明文）。**零新增生物学工具**；乘法/加法属数学必修。
- **合规性**：✅ 完全合规 —— 德国 KLP 已有「分析系谱 + 预测子代遗传性状」的**能力目标**，本技法只是把它**程序化**。⚠️ 边界：若进入 **Hardy-Weinberg 式基因频率定量计算**，**仅 LK 合规**（对应 LK `populationsgenetischer Artbegriff`）；**GK 不得使用** [已验证，Bio-DE-CN-Mapping §0.5]。
- **Abitur 应用**：`Gentest` 后果推导（AFB II）+ 遗传病伦理评价（AFB III）。德国答题须保留**概率措辞**。
- **来源**：`[CN-课标]` + `[CN-高考]`

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I** `Materialgebundene Aufgabe`（系谱图 / 突变序列 / 检测报告）[已验证，KLP Kap. 4] |
| Operator | `ermitteln` · `auswerten` · `begruenden` · `beurteilen` · `Stellung nehmen` |
| AFB | I（读图）→ **II（推演，重心）** → **III（伦理评价）** |
| 建议分值 / 时长 | 3 题约 20–25 BE，约 25–30 min（GK 255 min / LK 300 min）[已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> In einem Stammbaum sind zwei phänotypisch gesunde Eltern (P) Träger einer Erbkrankheit. Von ihren vier Kindern (F1) sind drei gesund und eines betroffen; Mädchen und Jungen sind gleichermaßen gesund.
> a) Ermitteln Sie den wahrscheinlichsten Erbgang und begründen Sie ihn.
> b) Berechnen Sie die Wahrscheinlichkeit, dass ein weiteres Kind betroffen wäre.

**Aufgabe 2** `[原创]`
> Die DNA-Sequenz eines Gens lautet im Leseraster: `... AUG GGU AAC UGG ...`. Durch eine Mutation entsteht `... AUG GGU AAU UGG ...`.
> a) Benennen Sie den Mutationstyp.
> b) Beurteilen Sie die Folgen für das Protein im Vergleich zu einer Deletion von zwei Basen an derselben Stelle.

**Aufgabe 3** `[NRW-改编]`
> Ein Paar mit Kinderwunsch lässt sich genetisch beraten. Der Mann ist Träger eines autosomal-rezessiven Allels, das im homozygoten Zustand eine schwere Erkrankung verursacht; die Frau ist nicht betroffen.
> Nehmen Sie Stellung zu der Frage, ob ein Gentest bei der Frau sinnvoll ist, und berücksichtigen Sie dabei **medizinische, psychische und ethische** Aspekte.

**Aufgabe 4** `[CN-改编]`
> In einem Stammbaum sind ausschließlich Männer von einer Krankheit betroffen; betroffene Väter haben keine betroffenen Söhne, aber alle Töchter sind gesund und können die Krankheit auf ihre Söhne übertragen.
> Ermitteln Sie den wahrscheinlichsten Erbgang und formulieren Sie Ihr Ergebnis mit angemessener Sicherheit.

### 5.3 Musterlösung

**Aufgabe 1**
1. **判显隐**：Zwei gesunde Eltern haben ein betroffenes Kind → **«无中生有» → rezessiv**. ✓ 得分点（引用判据）
2. **判染色体**：Mädchen und Jungen sind gleichermaßen betroffen, keine Geschlechtshäufung; bei kleiner Stichprobe keine sichere Aussage. Die Daten **weisen auf** einen **autosomal-rezessiven** Erbgang **hin**. ✓ 得分点（措辞 `weisen … hin`）
3. **基因型**：Eltern beide **heterozygot** (Aa × Aa). ✓
4. **概率**：Aa × Aa → betroffenes Kind (aa) mit **1/4 = 25 %**. ✓ 得分点（写出 1/4）
5. **措辞句**：`Die Wahrscheinlichkeit beträgt 25 %; dies ist ein statistischer Erwartungswert, kein sicheres Ergebnis.` ✓

**Aufgabe 2**
1. **类型（a）**：Ein Basenpaar ist ersetzt (G→A im dritten Triplett); es liegt eine **Substitution (Punktmutation)** vor. ✓ 得分点
2. **密码子对照**：`AAC → AAU` — beide codieren **Asparagin (Asn)**. ✓
3. **判定（b）**：Wegen der **Degeneration** des genetischen Codes ändert sich die Aminosäure **nicht** → wahrscheinlich **keine** Folgen für das Protein (stille Mutation). ✓ 得分点（点名简并性）
4. **对比**：Eine **Deletion von zwei Basen** ist **kein** Vielfaches von drei → **Rastermutation**; alle folgenden Aminosäuren ändern sich → meist **schwere** Folgen. ✓ 得分点（移码对比）

**Aufgabe 3**
1. **事实层**：Der Mann ist Träger (Aa); ob die Frau ebenfalls Trägerin ist, entscheidet über das Risiko eines betroffenen Kindes. ✓ 得分点（先摆事实）
2. **医学视角**：Ein Gentest bei der Frau kann das Risiko **quantifizieren** und Handlungsoptionen eröffnen. ✓
3. **心理视角**：Ein positives Testergebnis kann **Belastung** erzeugen, auch wenn kein Kind erkrankt. ✓
4. **伦理/规范视角**：Recht auf **Nichtwissen**; Testentscheidung muss **freiwillig** bleiben; Gefahr von Diskriminierung. ✓ 得分点（多视角 + 价值/规范）
5. **权衡结论**：`Ein Gentest ist sinnvoll, sofern er freiwillig erfolgt und von einer Beratung begleitet wird.` ✓ 得分点（有条件立场）

**Aufgabe 4**
1. **观察**：Nur Männer betroffen; kein Vater-Sohn-Übertragung; alle Töchter gesund, aber Überträgerinnen. ✓
2. **判定**：Dies spricht **gegen** einen Y-chromosomalen Erbgang und **für** einen **X-chromosomal-rezessiven** Erbgang: Betroffene Söhne erhalten das defekte Allel von der **Mutter (Konduktorin)**. ✓ 得分点（交叉遗传逻辑）
3. **概率尾巴**：Die Aussage beruht auf **kleinen Fallzahlen** → `Die Befunde weisen auf einen X-chromosomal-rezessiven Erbgang hin.` ✓ 得分点（不写 `muss`）
4. **延伸**：Für Konduktorin × gesunder Mann beträgt die Wahrscheinlichkeit für einen betroffenen Sohn **1/4** (bzw. 1/2 aller Söhne). ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 一见「患病」就判显性，不看父母表型 | 先找「无中生有 / 有中生无」 |
| 辨别错 | 把 `Genmutation` 与 `Genom-/Chromosomenmutation` 混为一谈 | 记三类：碱基层 / 染色体结构 / 染色体数目 |
| 知识错 | 认为所有替换都有严重后果 | 补「简并性 + 位置」两层判断 |
| 知识错 | 一上手就列 16 格棋盘 | 强制「先分离、后组合」 |
| 表达错 | 写 `Es wird sicher …`（确定性断言） | 改 `Die Wahrscheinlichkeit beträgt …` / `weist … hin` |
| 表达错 | 遗传病题只做技术分析，不做伦理评价 | 必须补 AFB III 的**多视角 + 有条件立场** |

---

## 7. Vernetzung

- **上游**：[`Molekulargenetik-Zentraldogma.md`](Molekulargenetik-Zentraldogma.md)（突变的分子底物）· [`Genregulation-und-Epigenetik.md`](Genregulation-und-Epigenetik.md)（突变 vs 表观）· [`Meiose-und-Rekombination.md`](Meiose-und-Rekombination.md)
- **下游**：[`LK-Krebs-Humanevolution-Methoden.md`](LK-Krebs-Humanevolution-Methoden.md)（突变累积 → 肿瘤；PCR/电泳检测突变）· Q `Synthetische Evolutionstheorie`（突变 = 变异来源）
- **横向**：[`CN-Bio-Genetik-Rechenschema.md`](CN-Bio-Genetik-Rechenschema.md)（三步程序全文）· `03_Mathe/` 概率统计
- **Basiskonzept**：`Information und Kommunikation`（第 3 轴）· `Struktur und Funktion`（第 1 轴）· `individuelle und evolutive Entwicklung`（第 5 轴）
- **术语卡**：`Genmutation` · `Rastermutation` · `Substitution` · `Missense` · `Nonsense` · `Gentest` · `Konduktorin`

---

> **来源标注说明**：`[已验证]` = 已核对官方源（KLP Heft 4722 / Operatoren ab 2025）· `[据推断]` = 基于官方条目或项目推导 · `[未获取到]` = 未找到，如实标注。
> 题目来源层级：`[NRW-官方公开]` / `[NRW-改编]` / `[CN-改编]` / `[原创]`。所有解析均为原创，不搬运教辅或教材原文。
