---
fach: Mathe
thema: "Oberstufe Curriculum"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Q1, Q2, Meta, Curriculum]
klp_version: "2022/23"
klp_heft: "4720"
stufe: "EF|Q1|Q2"
cn_mapping: "Mapping/Mathe-DE-CN-Mapping.md"
---

# Mathe — Gymnasiale Oberstufe 大纲（NRW，理科含中德对照）

> 来源：[KLP 官方 PDF](https://lehrplannavigator.nrw.de/system/files/media/document/file/gost_klp_m_2023_06_07.pdf) · 版本：`2022/23` · Heft `4720`
> 中文一句话：NRW 高中数学 Oberstufe 由 **三个 Inhaltsfeld（A 函数与分析 / G 解析几何与线性代数 / S 随机）** 与 **五个过程能力维度** 交叉构成，EF 只承载 A+G，Q1/Q2 三领域全开并在 GK/LK 上分叉。
> 中国对照：[`Mapping/Mathe-DE-CN-Mapping.md`](../Mapping/Mathe-DE-CN-Mapping.md)
>
> **时效说明**：本 KLP 由 RdErl. v. 24.05.2023 设定，**2023-08-01 起从 EF 逐级生效**；法源 BASS 15-31。上一版（Heft 4720 / 04.09.2013）已于 **2023-07-31 auslaufend außer Kraft**。[已验证]
> ⚠️ Heft 编号 **4720 被新旧两版沿用**（4320 → 4720 不变），归档时须以 PDF 文件名 `gost_klp_m_2023_06_07.pdf` 而非 Heft 号区分。[已验证]

---

## 0. 结构层级（先读这个）

KLP 第 2 章的**三层架构**（`00-Design.md §3.2` 未强调，但本文件必须体现）：

```
Ziele des Faches / Übergreifende fachliche Kompetenz   ← 第 1 章
        ↓
Kompetenzbereiche (Prozesse)  ×  Inhaltsfelder (Gegenstände)
        第 2.1.1 章                    第 2.1.2 章
        ↓  （两者交叉）
Kompetenzerwartungen  +  inhaltliche Schwerpunkte
        第 2.2（Q-Phase 通用）/ 2.3（EF）/ 2.4（Q-Phase, GK/LK 分列）
```

**关键点**：`Inhaltsfeld` 是**内容侧**（Gegenstände），`Kompetenzbereich` 是**过程侧**（Prozesse），二者不是同一维度、不能互换。`Kompetenzerwartungen` 才是交叉后的产物，也是唯一可被 Klausur 直接检验的层级。[已验证，m.txt L381-396]

三个 Inhaltsfeld **不是并列孤立**，KLP 明确要求「konzeptionell vernetzt」，点名五个跨领域概念：`funktionaler Zusammenhang`、`Mittelwert`、`Kumulation`、`Iteration`、`Grenzwert`。[已验证，m.txt L534-539]

---

## 1. Inhaltsfelder（内容领域）总览

| 学段 | Inhaltsfeld | 中文 | 中国对应 |
|---|---|---|---|
| **EF** | Funktionen und Analysis (A) | 函数与分析 | 必修「函数」主题（幂指对、三角函数） |
| **EF** | Analytische Geometrie und Lineare Algebra (G) | 解析几何与线性代数 | 必修「平面向量」+ 选择性必修「空间向量与立体几何」 |
| **EF** | — ~~Stochastik (S)~~ | ⚠️ **EF 不设 S** | — |
| **Q1/Q2 GK** | A + G + S（三领域全开） | — | 选择性必修四主题 |
| **Q1/Q2 LK** | A + G + S（同三领域，深度扩展） | — | 同上 + 选修 A 类部分内容 |

> ⚠️ **重要更正**：任务简报称「EF 承载 Analysis 基础」——更精确的说法是 **EF 承载 A + G**（G 在 EF 已含空间坐标、向量运算、直线与平面参数形式、直线位置关系）。**Stochastik 在 EF 完全缺席**，是 Q 阶段才引入的新领域。[已验证，m.txt L757-854]

---

## 2. 各 Inhaltsfeld 的内容重点

### IF-A：Funktionen und Analysis (A)

**KLP 定位原文摘要**：以「两个量相互依赖」为核心，分析学处理**两对互逆问题**——求变化率（Ableitung）↔ 由变化率重构存量（Integral）；求切线 ↔ 求面积。[已验证，m.txt L498-507]

#### EF
- 函数类型：`Potenzfunktionen mit ganzzahligen Exponenten`（整数指数幂函数）、`ganzrationale Funktionen`（整有理函数）[已验证]
- 函数性质：`Verlauf des Graphen`、`Definitionsbereich`、`Wertebereich`、`Nullstellen`、`Symmetrie`、`Verhalten für x→±∞` [已验证]
- 变换：`Spiegelung an den Koordinatenachsen`、`Verschiebung`、`Streckung` [已验证]
- 导数**基础理解**：`mittlere Änderungsrate`（平均变化率）、`lokale Änderungsrate`（局部变化率）、`graphisches Ableiten`、`Sekante und Tangente` [已验证]
- 微分学：`Ableitungsregeln`（Potenz- / Summen- / Faktorregel）、`Monotonie`、`Extrempunkte`、`lokale und globale Extrema`、`Krümmungsverhalten`、`Wendepunkte` [已验证]

**EF 独有能力的语言点**（对写 Klausur 重要）：
- (7) 要求以 **propädeutischer Grenzwertbegriff**（前形式化极限概念）定性说明「平均→局部变化率」的过渡，并使用 `lim` 记号。[已验证]
- (14) 要求**证明其中一条求导法则**（Summen- 或 Faktorregel）——EF 已含小证明。[已验证]
- (2) 要求**无辅助工具**解「可通过简单提公因式降为线性/二次」的多项式方程。[已验证]

#### Q1/Q2 — GK
- 函数类型：`ganzrationale Funktionen`、`Exponentialfunktionen`（仅此二类为主）[已验证]
- 性质：同上六项 [已验证]
- 微分学续：`Produktregel`、`Extremwertprobleme`、`Rekonstruktion von Funktionstermen`（即 **Steckbriefaufgaben**）[已验证]
- 积分学（**KLP 用六个概念名逐步搭建**）：`Produktsumme` → `orientierte Fläche` → `Bestandsfunktion` → `Integralfunktion` → `Stammfunktion` → `bestimmtes Integral` → `Hauptsatz der Differential- und Integralrechnung` [已验证]

**GK 的 A 领域能力要点**：
- (1) `Extremwertprobleme` 须**通过 Nebenbedingung 化为一元函数**再解 [已验证]
- (6) `Kettenregel` **仅限**「自然指数函数 ∘ 线性函数」的复合 [已验证] ← GK/LK 关键分界
- (4) `Umkehrfunktion` **仅以 Wurzelfunktion 为例** [已验证] ← GK/LK 关键分界
- (16) 无辅助工具求**整有理函数**的原函数 [已验证]
- (9) 须说明 `a^x` 的性质并解释 `e^x` 的特殊性（`f'=f`）[已验证]

#### Q1/Q2 — LK（相对 GK 的**增量**，逐条）

| 增量项 | GK | LK |
|---|---|---|
| 三角函数的地位 | 仅在性质条目中出现 `Sinusfunktion`；不作为求导对象 | 独立函数类：`f(x)=a·sin(b(x+c))+d` 及对应 Kosinus，**须无工具求导** |
| 对数函数 | 未出现；`Umkehrfunktion` 仅 Wurzelfunktion | `natürliche Logarithmusfunktion` 独立函数类，**须无工具求导** |
| 幂函数 | 仅 `x^n` 与 `1/x` | 扩展至 **`Potenzfunktionen mit rationalem Exponenten`** |
| `Kettenregel` | 仅限 `e^x ∘ 线性` | **一般化**（与 Produktregel 并列为必用工具） |
| `Funktionsscharen` | 未列入 Schwerpunkte | **独立 Schwerpunkt**：须解释参数含义并研究其对性质的影响 |
| 导数解释 | 局部变化率 / 切线斜率 | 增加 **`Approximation durch lineare Funktionen`**（线性化视角） |
| `biquadratische Gleichungen` | 未提及 | **须无工具求解** |
| `Umkehrfunktion` | 仅 Wurzelfunktion | 须**判定可逆性**、求反函数解析式、说明原函数与反函数图像关系 |
| 积分 | 定积分求面积 | 增加 **`uneigentliche Integrale`**（反常积分）+ **绕 x 轴旋转体体积** |
| `Stammfunktion` | 整有理函数 | 增加 **以 `ln x` 为 `1/x` 的原函数** |

> 全部 [已验证，m.txt L996-1067]

---

### IF-G：Analytische Geometrie und Lineare Algebra (G)

**KLP 定位原文摘要**：几何含平面/空间结构的定量与定性处理；`Koordinatisierung` 使代数方法可用；向量描述使 `Lineare Algebra` 的通用工具可用；`Parametrisierung` 给出几何对象与空间直线运动的描述；用 `Skalarprodukt` 对空间**度量化（Metrisierung）** 后，才能做角度、长度、距离测量。[已验证，m.txt L510-520]

#### EF
- `Koordinatisierungen des Raumes`：`Punkte`、`Ortsvektoren`、`Vektoren` [已验证]
- 向量运算：`Addition`、`Multiplikation mit einem Skalar` [已验证]
- 向量性质：`Länge`、`Kollinearität` [已验证]
- `Geraden und Strecken`：`Parameterform` [已验证]
- `Lagebeziehung von Geraden`：`identisch` / `parallel` / `windschief` / `sich schneidend` [已验证]
- `Schnittpunkte`：`Geraden` [已验证]

**EF 的 G 领域能力要点**：
- (4) 向量长度与点距**须用 `Satz des Pythagoras`** 求（尚未引入 Skalarprodukt）[已验证]
- (3) 向量须能几何解释为**位移**，在情境中解释为**速度** [已验证]
- (12) 须解线性方程组并与直线位置关系的解集**互译** [已验证]

> ⚠️ EF 的 G **不含 Ebenen、不含 Skalarprodukt**。这两项是 Q 阶段的起点。[已验证]

#### Q1/Q2 — GK
- 向量运算：`Skalarprodukt` [已验证]
- `Ebenen`：`Parameterform`、`Koordinatenform`、`Normalenvektor` [已验证] ← GK 只到 **Koordinatenform**
- `Schnittwinkel`：Geraden / Gerade-Ebene / Ebenen [已验证]
- `Schnittpunkte`：`Geraden und Ebenen` [已验证]
- `Lineare Gleichungssysteme` [已验证]

**GK 的 G 领域能力要点**：
- (1) `Skalarprodukt` 须**几何解释**：正交性、模、向量夹角 [已验证]
- (7)(8) 须说明线性方程组的**算法化解法**，并**无数字工具**求解「最多三个未知数、计算量小」的方程组 [已验证]
- (6) 须利用几何对象的**对称性**，并在简单情形下作 **Punkt an Ebene spiegeln** [已验证]

#### Q1/Q2 — LK（相对 GK 的**增量**）

| 增量项 | GK | LK |
|---|---|---|
| 平面表示 | `Parameterform` + `Koordinatenform`（`Normalenvektor`） | 增加 **`Normalenform`**（独立 Schwerpunkt 名） |
| 平面用途 | 空间定向：Punktprobe、与坐标轴交点、法向量 | 同 + 平面间位置关系须**系统研究** |
| 平面之外的对象 | 只提 Ebenen | 增加 **`Parallelogramme und Dreiecke` 的参数形式表示** |
| 位置关系 | 仅 Geraden untereinander（EF）+ Gerade-Ebene（Q） | **`Lagebeziehungen`：平面间、直线与平面（全部组合）** |
| **距离** | 未列入 Schwerpunkte | **`Abstände`：Punkte / Geraden / Ebenen（所有组合）** ← 中国「距离公式体系」的直接对应位 |
| 解集解释 | 只要求解法算法 | 增加 **`Interpretation der Lösungsmenge`**（解集的几何含义） |
| 反射 | 简单情形点关于平面镜像 | **一般化 `Spiegelungen an Ebenen`** |

> 全部 [已验证，m.txt L1069-1098]

---

### IF-S：Stochastik (S)

**KLP 定位原文摘要**：随机性是「数据与偶然的数学」，由样本评估与随机过程模拟相连；使日常问题可定量处理并在不确定下作决策与预测；随机现象可用概率分布建模；参数估计使基于样本的建模成为可能。[已验证，m.txt L523-530]

> ⚠️ **S 在 EF 不出现**，是 Q 阶段新引入的第三方领域。

#### Q1/Q2 — GK
- `Mehrstufige Zufallsexperimente`：`Urnenmodelle`、`Baumdiagramme`、`Vierfeldertafeln`、`bedingte Wahrscheinlichkeiten`、`Pfadregeln` [已验证]
- `Kenngrößen`：`Erwartungswert`、`Varianz`、`Standardabweichung` [已验证]
- `Diskrete Zufallsgrößen`：`Wahrscheinlichkeitsverteilungen`、`Kenngrößen` [已验证]
- `Binomialverteilung`：`Kenngrößen`、`Histogramme` [已验证]

#### Q1/Q2 — LK（相对 GK 的**增量**）
- `Binomialverteilung` 增加 **`Binomialkoeffizient`**（组合意义 + 简单情形无工具计算）[已验证]
- 增加 **`σ-Regeln`** [已验证]
- 增加 **`Beurteilende Statistik`（推断统计）**：`Prognoseintervall`、`Konfidenzintervall`、`Stichprobenumfang` [已验证] ← **整个 GK 完全没有此板块**
- 增加 **`Normalverteilung`**：`Dichtefunktion`（"Gauß'sche Glockenkurve"）、参数 `μ` 与 `σ`、`Graph der Verteilungsfunktion` [已验证]
- (19) 须区分离散/连续随机变量，并把 `Verteilungsfunktion` 解释为 **`Integralfunktion`** [已验证] ← S 与 A 的官方交叉点
- (18) 须估算「给定置信区间长度」所需的**样本量** [已验证]

> 全部 [已验证，m.txt L1100-1158]

---

## 3. Kompetenzbereiche（能力领域）

⚠️ **重要更正**：任务简报列出「prozessbezogen 六维」并含 `Reflektieren`。**核对官方原文后确认：数学是五个 Kompetenzbereich**：

> 「Im Fach Mathematik werden die **fünf Kompetenzbereiche** Operieren, Modellieren, Problemlösen, Argumentieren und Kommunizieren unterschieden.」[已验证，m.txt L420-421]

`Reflektieren` 不是第六个 Kompetenzbereich，而是 **`Problemlösen` 下的第三个子维度**（`Erkunden` / `Lösen` / `Reflektieren`）。[已验证，m.txt L645-679]

| # | 能力领域 | 德语原文 | 中文 |
|---|---|---|---|
| 1 | 操作 | Operieren | 符号/形式/技术操作与表征转换 |
| 2 | 建模 | Modellieren | 现实情境数学化 |
| 3 | 问题解决 | Problemlösen | 探索—求解—反思 |
| 4 | 论证 | Argumentieren | 猜想—证明—评判 |
| 5 | 表达交流 | Kommunizieren | 接收—产出—讨论 |

**各维度的子结构与内部要点**（KLP 2.2，逐条摘要）[已验证，m.txt L556-753]：

| 能力领域 | 子维度 | 条目数 | 关键看点 |
|---|---|---|---|
| Operieren | `Hilfsmittelfreies Operieren` | 1–9 | 与 `Arbeit mit Medien und Werkzeugen` 并列；MMS 有 10 项规定动作 |
| Operieren | `Arbeit mit Medien und Werkzeugen` | 10–14 | 明确列举 MMS 模块（CAS / 绘图 / 动态几何 / 概率分布 / 表格） |
| Modellieren | `Strukturieren` | 1–2 | 假设与简化 |
| Modellieren | `Mathematisieren` | 3–5 | 双向：现实→模型、模型→现实 |
| Modellieren | `Interpretieren und Validieren` | 6–9 | 含「指出模型边界」「改进模型」 |
| Problemlösen | `Erkunden` | 1–4 | 启发式工具（草图/图表/实验） |
| Problemlösen | `Lösen` | 5–9 | **KLP 在此点名 13 条 heuristische Strategien** |
| Problemlösen | `Reflektieren` | 10–14 | 含「分析错误原因」「迁移启发式策略」 |
| Argumentieren | `Vermuten` | 1–3 | |
| Argumentieren | `Begründen` | 4–9 | 含 4 种论证策略、8 类逻辑结构 |
| Argumentieren | `Beurteilen` | 10–13 | 检验完整性与适用范围 |
| Kommunizieren | `Rezipieren` | 1–4 | |
| Kommunizieren | `Produzieren` | 5–10 | 4 种表征形式：图形-视觉 / 代数-形式 / 数值-表格 / 语言 |
| Kommunizieren | `Diskutieren` | 11–15 | |

**🎯 高价值结构发现 —— `Operieren` 被官方切分为两条平行线**：
- `Hilfsmittelfreies Operieren`（无工具操作）
- `Arbeit mit Medien und Werkzeugen`（含工具操作）

这与 Abitur 的 **Aufgabenart I（hilfsmittelfrei）/ Aufgabenart II（mit Hilfsmitteln）** 完全同构（见 §6）。**德国的「无工具能力」是一条被写进 KLP 能力和 Abitur 题型的独立评价轴**，对应本项目笔记 `Mathe-ZKE-2027-Training.md` 中「Teil A 免工具 + Teil B WTR/CAS」的做法。[已验证，m.txt L421-443, L1407-1409]

**KLP 点名的 13 条 heuristische Strategien** [已验证，m.txt L656-661]（可直接做成方法卡）：
`Analogiebetrachtungen` · `Schätzen und Überschlagen` · `systematisches Probieren oder Ausschließen` · `Darstellungswechsel` · `Zerlegen und Ergänzen` · `Symmetrien verwenden` · `Invarianten finden` · `Zurückführen auf Bekanntes` · `Zerlegen in Teilprobleme` · `Fallunterscheidungen` · `Vorwärts- und Rückwärtsarbeiten` · `Spezialisieren und Verallgemeinern`

---

## 4. Progression EF → Q1 → Q2（**理科核心维度**）

```
EF  (A + G，无 S)
 ├─ A: 幂函数(整数指数) / 整有理函数 → 变换 → 平均/局部变化率 → 导数规则(幂/和/因子)
 │      → 单调性 / 极值 / 拐点 / 曲率        ← 「会做 Kurvendiskussion」
 └─ G: 空间坐标 / 向量加减与数乘 / 长度 / 共线 → 直线与线段参数形式 → 直线位置关系
        ← 无 Ebenen、无 Skalarprodukt
                    ↓
Q1  (A + G + S 三领域全开，GK/LK 分叉)
 ├─ A: 整有理函数 + 指数函数(Ein-/Ausklammern) → Produktregel → Extremwertprobleme
 │      → Steckbriefaufgaben → 积分学六概念链 → Hauptsatz → 定积分求面积
 │      [LK 增量] Funktionsscharen / 三角函数求导 / ln 函数 / 一般 Kettenregel
 │                / 可逆性判定 / uneigentliche Integrale / 旋转体体积
 ├─ G: Skalarprodukt → Ebenen(Parameter-/Koordinatenform) → 线面交点 → 交角
 │      [LK 增量] Normalenform / Parallelogramm u. Dreieck 参数形式 / 平面间位置关系
 │                / Abstände(Punkt-Gerade-Ebene 全组合) / 解集解释 / 一般镜像
 └─ S: 多阶段试验 / Urnenmodell / Baumdiagramm / Vierfeldertafel / 条件概率
        → Kenngrößen(EW, Var, σ) → 离散随机变量 → 二项分布
        [LK 增量] Binomialkoeffizient / σ-Regeln / Prognoseintervall
                  / Konfidenzintervall / Stichprobenumfang / Normalverteilung
                    ↓
Q2  (深化 + 交叉 + Abitur 综合)
 ├─ A ⇄ S 交叉：Verteilungsfunktion als Integralfunktion（LK 独有交叉点）[已验证]
 ├─ A ⇄ G 交叉：无直接规定，靠 gemeinsame Konzepte 连接
 ├─ 三领域联合出题：笔试卷**必须覆盖全部三个 Inhaltsfeld** [已验证，m.txt L1419]
 ├─ 口试：任务须涉及**至少两个** Inhaltsfeld [已验证，m.txt L1458-1460]
 └─ 综合性：Aufgabenart I(免工具) + II(工具) 的固定配比
```

**⚠️ EF → Q1 的两个「隐形台阶」**（值得单独做过渡笔记）：
1. **A**：EF 的导数只到「幂/和/因子规则 + 整有理函数」；Q1 一上来就要 `Produktregel`，LK 还要一般 `Kettenregel`。**复合函数求导是 EF→Q1 最大断层。** [已验证]
2. **G**：EF 完全没有 `Skalarprodukt` 和 `Ebenen`；Q1 的 G 几乎全部建立在这两者之上。**从「向量=位移」跳到「向量=可度量的内积空间」是第二个断层。** [已验证]

### GK / LK 差异总表

| 维度 | GK | LK |
|---|---|---|
| **内容广度** | A：整有理 + 指数 | A：+ 三角函数 + ln + 有理指数幂函数 |
| | G：Skalarprodukt、Ebenen(坐标形式)、交角、交点、LGS | G：+ Normalenform、**Abstände 全组合**、平面位置关系、解的几何解释 |
| | S：至二项分布 | S：+ 判断统计（Prognose-/Konfidenzintervall、样本量）+ **正态分布** |
| **深度** | 公式应用为主，`Umkehrfunktion` 仅 Wurzelfunktion | 须做**可逆性判定**、参数族分析、模型质量评价 |
| **数学工具** | `Kettenregel` 仅限 `e^x ∘ 线性`；积分只到定积分求面积 | 一般 `Kettenregel`；`uneigentliche Integrale`；旋转体体积；`e^x` 与 `ln` 互为反函数体系 |
| **证明要求** | EF 已要求证明一条求导法则；(GK) 积分只要求「几何直观说明」Hauptsatz | **须用直观连续性概念证明 Hauptsatz**；导数须作线性化解释 |
| **独立特征** | 无 `Funktionsscharen` | **`Funktionsscharen` 是 LK 标志性内容** |

---

## 5. CN-Anschluss（中国对应位 — 仅占位）

> 具体对照写在 [`Mapping/Mathe-DE-CN-Mapping.md`](../Mapping/Mathe-DE-CN-Mapping.md)。本节只标高价值差异点。

- 🎯 **中国更深/更系统**：
  - **导数应用体系**：中国在「一元函数导数及其应用」中把 `单调性 / 极值 / 最值 / 生活优化 / 不等式证明` 做成**成套解题程序**；德国把对应内容散在 EF 的 Kurvendiskussion 与 Q1 的 Extremwertprobleme，**缺「用导数证明不等式」这一整类**。
  - **数列板块**：中国有**独立的数列主题**（等差/等比/递推/求和）；德国 KLP **无数列**，只在 `Verhalten für x→±∞` 与 `Kumulation` 上间接触及。
  - **解析几何的距离公式体系**：中国在平面解析几何中系统训练 `点到直线距离`、`弦长`、`轨迹`；德国 LK 的 `Abstände` 只在**空间向量**语境下出现，**平面解析几何（圆、椭圆、双曲线、抛物线）德国完全不考**。
  - **平面向量与解三角形的计算化**：中国必修中向量与三角恒等变换、正余弦定理配合，形成强大的**几何计算工具链**。
- ⚪ **德国独有**：
  - `Modellieren` 的**完整四段闭环**（Strukturieren → Mathematisieren → Interpretieren → Validieren）作为**可评分的能力维度**，并要求「指出模型边界、改进模型」——中国课标中的「数学建模活动」在评价颗粒度上明显更粗。
  - `Stochastik` 中的 **`Beurteilende Statistik`（Prognose-/Konfidenzintervall、样本量估算）为 LK 必学**；中国在高中阶段对区间估计的处理远为轻量。
  - **MMS / 数字工具的 10 项规定动作**（CAS 解含参方程组、参数动态变化等）写进 KLP 能力条目。
  - `Normalenform` 作为**独立平面表示形式**被专名列出。
- 🔵 **中国独有（德国不考，仅供理解）**：
  - **复数**（必修「几何与代数」含平面向量/复数）——德国 NRW KLP 全文**无复数**。
  - **计数原理**（加法/乘法原理、排列组合）作为独立主题——德国只在 LK 的二项系数处触及；GK **完全不涉及组合计数**。
  - **立体几何初步**中纯几何（非向量）的空间推理与证明。
  - **平面解析几何**（圆、椭圆、双曲线、抛物线）。
  - **数学归纳法**。
  - **三视图 / 空间几何体的表面积与体积**（纯几何计算）。
  - `选修 A 类` 的数理方向内容。

---

## 6. Klausur / Abitur 形式

- 详见 [`Klausur-Formate/Klausur-und-Abitur-Formate.md`](../Klausur-Formate/Klausur-und-Abitur-Formate.md)（该目录 **尚未创建** [未获取到]）
- **Abitur 时长**（Abitur 2027，来自 `01-Quellen.md §A.4`，BASS 13-32 Nr. 6）：**GK 255 min / LK 300 min** [已验证]

### 数学 Abitur 的**法定题型**（KLP 第 4 章直接规定，非推断）[已验证，m.txt L1407-1420]

| 题型 | 德语原文 | 说明 |
|---|---|---|
| **Aufgabenart I** | hilfsmittelfrei zu bearbeitende Aufgabe | **免工具**题 |
| **Aufgabenart II** | Aufgabe, die mit Hilfsmitteln bearbeitet wird | **可用工具**题 |

**结构规则**：
- 笔试由**多个互相独立的题目**构成，每题可分若干 Teilaufgaben；Teilaufgaben 之间**不应彼此无关**（免工具题除外）
- Teilaufgaben 的独立性要求：**一处失误（尤其开头）不应严重妨碍该题后续作答**；必要时可在题干中**给出中间结果** [已验证]
- ⚠️ **「innermathematisch : realitätsnah」须保持均衡配比**（gleichberechtigtes Verhältnis）[已验证]
- ⚠️ **试卷必须覆盖全部三个 Inhaltsfeld** [已验证]
- **评估准则**：法定 `kriterielles Bewertungsraster`（全州统一）；`Randkorrekturen` + 评分表 [已验证]

### 口试（mündliche Abiturprüfung）[已验证，m.txt L1422-1463]
- 时长 **20–30 min**；分两部分：连贯报告 + 问答讨论
- **任务须涉及至少 2 个 Inhaltsfeld**；**不允许**与考生约定考哪些 Inhaltsfeld
- 使用与笔试相同的工具规定；材料量更少、任务复杂度更低（因准备时间短）
- 禁止「无关的孤立小问题堆砌」（zusammenhanglose Einzelfragen 不许）

### AFB（Anforderungsbereiche）[已验证，m.txt L1339-1356]
- **AFB I** = Wiedergeben / Verständnissicherung / geübte Verfahren
- **AFB II** = selbstständiges Auswählen, Anordnen, Verarbeiten, Erklären, Darstellen + Transfer ← **全部科目笔试重点**
- **AFB III** = komplexe Sachverhalte → 独立解法、推广、论证、评价
- 规定：**所有 AFB 都必须出现，但 AFB II 构成重心**

### 三类法定 Überprüfungsformen（Sonstige Mitarbeit 必须使用）[已验证，m.txt L1285-1311]
| 形式 | 说明 |
|---|---|
| `Hilfsmittelfrei zu bearbeitende Aufgaben` | 定义/基本规则/算法的最小计算量直接应用 |
| `Explorative Aufgaben` | 借模拟、参数变化、图像发现规律并论证 |
| `Aufgaben mit realitätsnahem Kontext` | 现实情境题 |
| `Innermathematische Argumentationsaufgaben` | 选取概念/定理/算法、解释或补全证明、分析错误 |
| `Präsentationsaufgaben` | 从简短汇报到 Referat 到媒体作品 |

> 第 4 章还规定 **Verstöße gegen die sprachliche Richtigkeit 不得重复扣分**（若已在 Darstellungsleistung 中考虑）。[已验证，m.txt L1230-1233]

---

## 7. Operatoren

详见 [`Operatoren-NRW-Alle-Faecher.md`](Operatoren-NRW-Alle-Faecher.md)（**尚未创建** [未获取到]）

- KLP 第 4 章**不含** Operatoren 表，只指向外部 `Operatorenübersicht` [已验证，m.txt L1362-1363]
- 已知直链：`https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/m_operatoren_ab_2023_1.pdf` [已验证，见 `01-Quellen.md §A.3`]
- ⚠️ 旧域名 `standardsicherung.schulministerium.nrw.de` 部分已 301 至 QUA-LiS，**须用新域名**。[据推断]

---

## 8. 与现有笔记的对应（对接层）

> 依据 `00_META/INDEX.md` 的 Mathe 小节（L96–101）与 `03_Mathe/` 实际文件清单核对。

| Inhaltsfeld | 已有笔记 | 缺口 |
|---|---|---|
| **A — Analysis** | [`Ganzrationale-Funktionen-Kurvendiskussion.md`](../../../03_Mathe/Ganzrationale-Funktionen-Kurvendiskussion.md)（多项式性质/极值拐点/实际极值建模） | — |
| | [`Steckbriefaufgaben-und-Funktionsanpassung.md`](../../../03_Mathe/Steckbriefaufgaben-und-Funktionsanpassung.md)（几何条件翻译/方程组/四步设解） | — |
| | [`Analysis-Physik-Kinetik-Vernetzung.md`](../../../03_Mathe/Analysis-Physik-Kinetik-Vernetzung.md)（导数与运动学瞬时速度） | 对应 EF (6) 速度-路程关系 |
| | [`Formel-Spickzettel.md`](../../../03_Mathe/Formel-Spickzettel.md) | — |
| **A（跨科衔接）** | [`Mathe-ZKE-2027-Training.md`](../../../03_Mathe/Mathe-ZKE-2027-Training.md)（Teil A 免工具 + Teil B WTR/CAS） | **直接对应 Aufgabenart I/II 结构** ✅ 已有 |
| **G — 解析几何** | — | 🔴 **完全空白**：EF 的向量/直线参数式，Q1 的 Skalarprodukt/Ebenen，LK 的 Abstände 全无笔记 |
| **S — 随机** | — | 🔴 **完全空白**：EF 不设 S 但 Q1/Q2 全开，二项分布/正态分布/置信区间全无笔记 |
| **跨领域** | [`CN-Mathe-Formelhandbuch.md`](../../../03_Mathe/CN-Mathe-Formelhandbuch.md) · [`CN-Mathe-Tricks.md`](../../../03_Mathe/CN-Mathe-Tricks.md) · [`Klausur-Training/CN-Mathe-Training.md`](../../../03_Mathe/Klausur-Training/CN-Mathe-Training.md) | 需按 IF 重新切片 |
| **过程能力** | [`Klausur-Training/Fehlerlog.md`](../../../03_Mathe/Klausur-Training/Fehlerlog.md) | 可对接 Problemlösen→Reflektieren (11)「分析错误原因」 |
| **训练** | [`Klausur-Training/Mathe-Abitur-Aufgabentraining.md`](../../../03_Mathe/Klausur-Training/Mathe-Abitur-Aufgabentraining.md) | — |
| **EF 基础词表** | [`Vokabeln-Anki/Mathe-EF-Basis.csv`](../../../03_Mathe/Vokabeln-Anki/Mathe-EF-Basis.csv) | 需补 Q1/Q2 的 DE-CN-EN 术语（尤其 G 和 S 领域） |
| **其他** | [`Lehrplan.md`](../../../03_Mathe/Lehrplan.md) · [`Ressourcen.md`](../../../03_Mathe/Ressourcen.md) · [`README.md`](../../../03_Mathe/README.md) | — |

### EF → Q2 缺口清单（按学段）

| 学段 | 领域 | 状态 | 缺口 |
|---|---|---|---|
| EF | A | 🟢 基本覆盖 | 缺 `Transformationen`（对称/平移/伸缩）独立笔记；缺「证明一条求导法则」的证明训练 |
| EF | G | 🔴 **零覆盖** | 向量基础、长度与共线、直线参数式、**四种直线位置关系**（identisch/parallel/windschief/schneidend）全无 |
| Q1 | A | 🟡 部分覆盖 | 缺 `Exponentialfunktionen`（wachstum/zerfall 建模）、`Produktregel`、`Kettenregel`、**积分学六概念链**、`Hauptsatz` |
| Q1 | G | 🔴 **零覆盖** | `Skalarprodukt`、`Ebenen`（参数/坐标形式）、线面交点、交角、LGS 算法 |
| Q1 | S | 🔴 **零覆盖** | 多阶段试验、Baumdiagramm/Vierfeldertafel、条件概率、期望/方差/σ、二项分布 |
| Q2 LK | A | 🔴 零覆盖 | `Funktionsscharen`、三角函数求导、`ln`、可逆性与反函数、反常积分、旋转体体积 |
| Q2 LK | G | 🔴 零覆盖 | `Normalenform`、**`Abstände` 全组合**、平面位置关系、解的几何解释 |
| Q2 LK | S | 🔴 零覆盖 | `Binomialkoeffizient`、`σ-Regeln`、正态分布、Prognose-/Konfidenzintervall、样本量 |

> **结论**：现有 Mathe 笔记**几乎全部集中于 IF-A 且集中于 EF 层**。G 与 S 两个领域、以及 Q1/Q2 的深化层，是**最大的笔记缺口**。优先补：**① EF-G 向量入门（承接断层 1）→ ② Q1-A 积分学 → ③ Q1-G Skalarprodukt/Ebenen → ④ Q1-S 二项分布**。

---

## 变更记录

- 2026-09-24：创建（S1 试点阶段）。基于官方 KLP `gost_klp_m_2023_06_07.pdf`（sha256 `211bad80…`，HTTP 200，PDF 实体已核）结构化提取；**更正任务简报中「六维能力」为官方五维**，并明确 EF 承载 A+G（非仅 A）。
