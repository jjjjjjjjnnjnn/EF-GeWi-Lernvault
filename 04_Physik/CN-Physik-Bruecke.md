---
fach: Physik
thema: "CN-Physik-Bruecke: Methoden, Grenzen und Q1/Q2-Terminologie"
operatoren: [vergleichen, begründen, berechnen, auswerten, deuten, bewerten, planen]
klausurrelevant: true
datum: 2026-09-25
tags: [Q2, Physik, Bruecke]
stufe: "Q1|Q2"
kursart: "GK|LK"
---

# CN-Physik-Brücke (中德物理桥接笔记 · 含反例标注) `[GK/LK]`

> **中文理解**：本篇是**跨 IF 的方法桥**，不是知识点笔记。它回答一个问题：**中国学到的方法，哪些能直接搬进 NRW 物理答卷，哪些绝对不能？** 依据 `Physik-DE-CN-Mapping.md` §3 的**三条铁律**：① 只引入「**方法**」，不引入「**超纲知识**」；② 每条技法必须标注 `DE-Anschluss`（所用工具德国 KLP **已教**）；③ 来源分层 `[CN-课标]`/`[CN-教材]`/`[CN-高考]`，**原创改写、不搬原题** [据推断]。
> ⚠️ **本篇最重要的判断力**：**不是所有中国技法都该引入**。**CN-Methode 9（等效电源与动态电路分析）是明确的反例** —— 它看起来「很像物理」，但它引入的是**知识板块**（电路分析），而**德国 KLP 全文没有「电路分析」Inhaltsfeld** [已验证]。同理，**中国的「恒定电流」属纯 `CN-only`**，须显式标注为「**桥接素材，非考纲内容**」。
> ⚠️ **两条结构事实先记住**：① **GK 与 LK 是两套不同的 Inhaltsfeld**（不是「LK = GK + 加料」）[已验证]；② **物理禁止纯论述题** —— 任何答案必须挂靠材料或实验 [已验证]。
>
> **Klausur-Relevanz**：方法层投入产出比最高——`X-02` 判分边界与 `X-03` 动词升级是「成本最低、判分收益最高」的两条 [据推断]。

---

## 1. 核心概念 (Kernbegriffe) —— Q1/Q2 术语卡

> 本表是**要求交付的 Q1/Q2 术语卡**（DE / CN / EN 三语）。建议同步入 `Vokabeln-Anki/` 的 csv。

| 术语 (DE) | 中文 | English | 所属 IF | 备注 |
|---|---|---|---|---|
| `Inhaltsfeld` | 内容领域 | content field | 全树 | **GK/LK 两套不同** [已验证] |
| `Basiskonzept` | 基础概念 | basic concept | 全树 | 四条跨 IF 轴 [已验证] |
| `Differentialgleichung` | 微分方程 | differential equation | LK-1/LK-2 | EF 不出现 [已验证] |
| `Schwingkreis` | 振荡回路 | oscillating circuit | LK-2 | LK 独立重点 [已验证] |
| `Induktivität` | 电感 | inductance | LK-1 | GK 无 [已验证] |
| `Selbstinduktion` | 自感 | self-induction | LK-1 | GK 无 [已验证] |
| `Thomson'sche Gleichung` | 汤姆孙公式 | Thomson's equation | LK-2 | $T=2\pi\sqrt{LC}$ [已验证] |
| `Hertz'scher Dipol` | 赫兹偶极子 | Hertzian dipole | LK-2 | = 开放振荡回路 [已验证] |
| `Resonanz` | 共振 | resonance | LK-2 | GK 无 [已验证] |
| `Fadenpendel` | 单摆 | pendulum | LK-2 | GK 只有 Federpendel [已验证] |
| `Kleinwinkelnäherung` | 小角近似 | small-angle approximation | LK-2 | 德国规定动作 [已验证] |
| `Michelson-Interferometer` | 迈克耳孙干涉仪 | Michelson interferometer | LK-2 | LK 独立重点 [已验证] |
| `Coulomb'sches Gesetz` | 库仑定律 | Coulomb's law | LK-1 | EF 无静电 [已验证] |
| `elektrisches Potential` | 电势 | electric potential | LK-1 | EF 无 [已验证] |
| `gekreuzte Felder` | 正交交叉场 | crossed fields | LK-1 | 速度选择器 [已验证] |
| `Hall-Effekt` | 霍尔效应 | Hall effect | LK-1 | LK 独有 [已验证] |
| `Bremsstrahlung` | 轫致辐射 | bremsstrahlung | LK-3 | GK 无 [已验证] |
| `Bragg-Reflexion` | 布拉格反射 | Bragg reflection | LK-3 | 须推导 [已验证] |
| `Wellenfunktion` / `Wahrscheinlichkeitsdichte` | 波函数 / 概率密度 | wave function / probability density | LK-3 | GK 无 [已验证] |
| `Delayed-Choice-Experiment` | 延迟选择实验 | delayed-choice experiment | LK-3 | LK 独立重点 [已验证] |
| `Heisenberg'sche Unbestimmtheitsrelation` | 海森伯不确定关系 | uncertainty relation | LK-3 | **不可能性表述** [已验证] |
| `Komplementarität` | 互补性 | complementarity | GK-2/LK-3 | 两轨共有 [已验证] |
| `eindimensionaler Potentialtopf` | 一维势箱 | 1D potential well | LK-4 | LK 独有 [已验证] |
| `Pauli-Prinzip` | 泡利原理 | Pauli exclusion principle | LK-4 | LK 独有 [已验证] |
| `Aktivität` / `Zerfallsgesetz` | 活度 / 衰变定律 | activity / decay law | LK-4 | **LK 须推导** [已验证] |
| `Zerfallsreihe` / `Nuklidkarte` | 放射系 / 核素图 | decay series / nuclide chart | LK-4 | GK 无 [已验证] |
| `Massendefekt` / `Bindungsenergie` | 质量亏损 / 结合能 | mass defect / binding energy | LK-4 | LK 定量 [已验证] |
| `Kettenreaktion` | 链式反应 | chain reaction | LK-4 | LK 独立重点 [已验证] |
| `Kompetenzbereich` | 能力领域 | competence area | 全树 | 物理 4 个 [已验证] |
| `Bewertungskompetenz` | 评价能力 | evaluation competence | 全树 | **须超出学科内部** [已验证] |

---

## 2. 知识结构 (Struktur) —— 桥接的判据从哪来

### 2.1 EF 的工具天花板 = 合规性的判据来源

中文理解：**任何技法若只用到「一维运动学 + 矢量分解 + Newton 定律 + 图像」，即 ✅ 可嫁接；若需要 EF 之外的知识块（如电路、电势），即 ⚠️ 或 ❌** [已验证]。

| 项 | EF 状态 | 结论 |
|---|---|---|
| `Differentialgleichung` | **全文不出现** [已验证] | 涉及 DGL 的技法须标 ⚠️（LK 专属） |
| `Coulomb'sches Gesetz` / `elektrisches Potential` | **无** [已验证] | 涉及静电定量的技法须标 ⚠️（LK 前置） |
| 静电学 | **完全无** [已验证] | 中国必修3.1 是**中国优势**，可前移 |
| 唯一的「场」 | `Gravitationsfeld` [已验证] | 场的数学化须专门补 |
| 电路分析 | **KLP 全文无此 IF** [已验证] | ⛔ **禁止引入**（CN-Methode 9） |

### 2.2 状态码（固定五值，来自 Mapping 文件）

| 状态码 | 含义 | 处理 |
|---|---|---|
| `both-equal` | 两边深度相当 | 中国笔记可直用 |
| `both-cn-deeper` | 中国更深 | **可嫁接**（如几何化轨迹链） |
| `both-de-deeper` | 德国更深 | 中国有缺口，须补德国侧 |
| `DE-only` | 仅德国有 | 必须从德国原文学习 |
| `CN-only` | 仅中国有 | ⛔ **不复习**（可作桥接素材） |

### 2.3 四条「判分边界规则」（成本最低、收益最直接）

中文理解：KLP 明文划定能力归属，**可直接用于批改** [已验证]：① **实验的规划/构思**归 `Erkenntnisgewinnung`，**按指导做实验**归 `Sachkompetenz`；② 不嵌入认识过程的方法执行归 S；③ **数学与公式表述不归 `Kommunikation`**（写推导**不算**「沟通能力」）；④ **`rein innerfachliche Bewertungen`（模型适用性等）不归 `Bewertung`** —— 写评价题只谈「模型适用范围」**不得分**。

> *Klausur-Satz*: „Die Planung und Konzeption von Experimenten gehört zur Erkenntnisgewinnungskompetenz, das Durchführen nach Anleitung zur Sachkompetenz. Mathematische Darstellungen zählen nicht zur Kommunikationskompetenz, und rein innerfachliche Bewertungen fallen nicht unter die Bewertungskompetenz." [原创]

---

## 3. 解题方法 (Methoden) —— 选哪条 CN-Methode

### 3.1 决策流程（先问三句，再动笔）

1. **这道题的题型是哪一类？** 材料题（Aufgabenart I）/ 实验题（Aufgabenart II）—— **物理禁止纯论述题** [已验证]
2. **题目要的动词是什么？** `berechnen`/`herleiten` → 走定量技法（CN 1/3/4/5）；`planen`/`bewerten` → 走设计/评价写法
3. **技法用到的工具德国教过吗？** 逐一核对 `DE-Anschluss`；**任一工具未教 → 该技法标 ⚠️ 或放弃**

> **判据 / 决策点**：只要技法引入的是**知识板块**（如电路、热学）→ 直接放弃；只引入**解题路径/顺序** → 可用。

### 3.2 三条最常用的嫁接路径

1. **带电粒子在磁场中偏转** → 几何化轨迹链（定圆心 → 找半径 → 算圆心角 → 算时间）—— 全部工具落在 EF [据推断]
2. **平抛 → 电场偏转** → 同构翻译（$g\to qE/m$ 一步替换）—— **性价比最高的前置补强** [据推断]
3. **图像数据题** → 图像三件套（斜率 / 面积 / 截距分别是什么物理量）—— 德国 `Diagramm` 表征形式更显式 [据推断]

---

## 4. 🇨🇳 CN-Methode

### ✅ 可嫁接（CN-Methode 1–8 摘要）

| # | 技法 | DE-Anschluss（德国已教） | 合规 | Abitur 落点 |
|---|---|---|---|---|
| **1** | 带电粒子偏转的**几何化轨迹链**（定圆心-找半径-算圆心角-算时间 + 临界三圆） | `Lorentzkraft`（GK-1/LK-1）· `Zentripetalkraft` 与圆周七量（**EF-2 已教**）· 矢量分解（EF-1） | ✅ | GK-1 `Fadenstrahlrohr`/`Zyklotron`；LK-1 `gekreuzte Felder` |
| **2** | **整体法/隔离法**的显式判据（系统内加速度是否相同） | Newton 三定律 · `Kräftegleichgewicht`（EF-1） | ✅ | EF-1 连接体/叠放体题 |
| **3** | **守恒律选择策略**（第一判据矢量性 → 已知量/变力 → 过程特征） | `Impuls` 与 `Stoßvorgänge` · `Energie`/`Energiebilanzen`（EF-1）· 双视角（EF-1 明文） | ✅ | EF-1 碰撞；GK-2/LK-3 光与物质；LK-4 `Massendefekt` |
| **4** | **平抛 → 电场偏转**同构翻译（$g\to qE/m$） | `waagerechter Wurf`（**EF-1 已教**）· 矢量分解 · Newton 定律 | ✅ | GK-1 `Bahnformen`；LK-1 `Längs-/Querfelder` |
| **5** | **图像三件套**（斜率 / 面积 / 截距的物理量翻译） | `Messwerttabelle/Diagramm/Gesetz`（EF-1）· `Q-U` 面积 = 储能（GK-3 明文） | ✅ | GK-3 电容储能；LK-3 由数据定 $h$ |
| **6** | **线性化近似**（小角近似 → 识别为谐振子） | **LK-2 明文要求小角近似** · `Federpendel`（GK-1） | ✅ | LK-2 DGL 推导 |
| **7** | **微元法与极限思想**（以恒代变、再求和） | LK-1 RC-DGL · GK-3 `Q-U` 面积 · Basiskonzept `Mathematisieren` | ✅ | LK-1/LK-2 DGL；**LK-4 由 `Aktivität` 推衰变律** |
| **8** | **极端值/特殊值检验 + 量纲自检**（`Grenzfallprobe`） | 公式应用（EF-1）· Basiskonzept `Mathematisieren und Vorhersagen` | ✅ | 全题型自检，不占分但防丢分 |

> ⚠️ **CN-Methode 6 与 7 的方向与其他相反**：德国 KLP **明文要求**小角近似与「由活律推衰变律」，中国提供的只是**思维顺序**（先近似、先微元） [已验证]。

### ⛔ CN-Methode 9（**反例示范**）：等效电源与动态电路分析 —— **不建议引入**

- **技法内容**：串并联化简、把电源打包为 $(E,r)$ 等效电源、动态分析「程序法」（局部 $R$ 变 → 总 $R$ 变 → 总 $I$ 变 → 路端电压 → 局部）与「串反并同」口诀、`U-I` 图斜率 $=-r$、电源总功率/输出功率/内耗功率三值区分。来源：`[CN-课标]` 必修3.2 + `[CN-高考]` 高频题型。
- **DE-Anschluss**：**德国 KLP 全文无「电路分析」Inhaltsfeld**。电路只在 **GK-3 的充放电视角**与 **LK-1 的 RC-DGL 视角**被触及；`Ohmsches Gesetz` 与串并联属**工具性常识**而非内容重点。**无合法接口** [已验证]。
- **合规性**：⚠️ **不合规** —— 违反铁律 1：这是**知识板块**，不是**方法**。**本卡的作用是提供反例**：说明为什么「看起来很像物理」的中国内容**也不能搬**。
- **Abitur 应用**：⛔ **无**。仅可作为 CN-Methode 5（图像三件套）的**练习素材**（借 `U-I` 图练「斜率/截距翻译」），**但不得把「测 $E$ 与 $r$」当作德国考点复习** [据推断]。

### 🔵 纯 `CN-only` 清单（**桥接素材，非考纲内容**）

> ⚠️ **以下全部标注为「桥接素材，非考纲内容」，禁止占用复习时间** [已验证]。

| 中国内容 | 德国状态 | 处理 |
|---|---|---|
| **恒定电流 / 电路分析**（闭合电路欧姆定律、测 $E$ 与 $r$、电表改装、功率三值、动态分析） | **KLP 全文无此 IF** [已验证] | ⛔ **不复习**。**这是中国最大且最系统的超出量**；仅作图像法练习素材 |
| **热学**（分子动理论、气体定律、理想气体、热力学第一/第二定律） | **KLP 全文无热学 IF** [已验证] | ⛔ 不复习 |
| **传感器 / 激光 / 光纤** | 无 [已验证] | ⛔ 不复习（可作 GK-3 Bewertung 背景知识） |
| **第一/二/三宇宙速度** | 德国只要求由引力定律与开普勒定律求轨道数据 [据推断] | ⚠️ 可作保险，非主攻 |
| **21 个必做实验清单机制** | 德国**无**必做清单，但 LK 大量要求**自行设计实验** [已验证] | ⚠️ 操作熟练度可迁移到 `fachpraktische Aufgabe` |
| **选修3（不确定原理、质能方程计算、宇宙学）** | 中国**不在高考范围**；德国 LK 对应内容**更深** [据推断] | ⛔ 不复习 |

> 🎯 **判断力总结**：**「两边都有」≠「可以直接搬」**。判据只有一条 —— **技法用的是不是 EF/Q 已教的工具**。凡引入**知识板块**（电路、热学、传感器）者，一律标为桥接素材；凡只是**解题路径/顺序**者，方可嫁接。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`** / **Aufgabenart II `Fachpraktische Aufgabe`** [已验证] |
| Operator | `vergleichen` / `begründen` / `berechnen` / `auswerten` / `planen` / `bewerten` |
| AFB | I（识别技法与工具）→ **II（迁移到新情境）** → III（判断技法适用性/边界） |
| 建议分值 / 时长 | 方法层不单独成题，嵌在各 IF 题内；Abitur **GK 255 min / LK 300 min**，4 题选 3 [已验证] |

> ⚠️ **材料挂靠说明（物理硬约束）**：本节方法在材料题中**以「给定轨迹图 / 数据表 / 装置图，要求迁移中国式解题路径」的形态出现**；在实验题中**以「按方案处理数据并论证」的形态出现**。**任何答案必须挂靠题给材料，禁止纯论述** [已验证]。

### 5.2 训练题

**Aufgabe 1** `[CN-改编]`
> Ein Elektron tritt mit der Geschwindigkeit $v=2{,}0\cdot10^6\,\text{m/s}$ senkrecht in ein homogenes Magnetfeld ($B=5{,}0\,\text{mT}$) ein.
> a) Bestimmen Sie Bahnradius und Umlaufdauer.
> b) Begründen Sie, dass die Umlaufdauer unabhängig von der Geschwindigkeit ist.
> c) Das Elektron trete nun zusätzlich in ein elektrisches Feld ein, das die Lorentzkraft gerade kompensiert. Bestimmen Sie die erforderliche Feldstärke $E$.

**Aufgabe 2** `[CN-改编]`
> Ein Wagen ($m_1=0{,}50\,\text{kg}$) stößt mit $v_1=2{,}0\,\text{m/s}$ auf einen ruhenden zweiten Wagen ($m_2=1{,}5\,\text{kg}$) und koppelt vollständig.
> a) Begründen Sie, welche Erhaltungssätze hier herangezogen werden dürfen.
> b) Berechnen Sie die gemeinsame Geschwindigkeit.
> c) Beurteilen Sie, ob die kinetische Energie erhalten bleibt, und quantifizieren Sie den „Verlust".

**Aufgabe 3** `[原创]`（**判断力题**）
> In einer Aufgabensammlung finden sich zwei Aufgaben:
> (A) „Ein Plattenkondensator ($C$, $R$) wird über einen Widerstand geladen; bestimmen Sie $q(t)$."
> (B) „Eine Batterie mit Innenwiderstand $r$ treibt einen veränderlichen Außenwiderstand; bestimmen Sie die maximale Ausgangsleistung."
> a) Entscheiden Sie für beide Aufgaben, ob sie zum NRW-Inhaltskanon gehören, und begründen Sie Ihre Entscheidung.
> b) Geben Sie für Aufgabe (A) den Ansatz an, mit dem im LK gearbeitet wird.
> c) Bewerten Sie, ob Aufgabe (B) dennoch als Übungsmaterial dienen kann.

### 5.3 Musterlösung

**Aufgabe 1** `[CN-改编]`
1. **a) 半径与周期**：$r=\dfrac{mv}{qB}=\dfrac{9{,}11\cdot10^{-31}\cdot2{,}0\cdot10^6}{1{,}60\cdot10^{-19}\cdot5{,}0\cdot10^{-3}}\approx2{,}3\cdot10^{-3}\,\text{m}$；
   $T=\dfrac{2\pi m}{qB}\approx7{,}2\cdot10^{-9}\,\text{s}$ ✓ **得分点：$r$ 公式 + $T$ 公式 + 单位**（AFB II）
2. **b) 论证**：$T=\dfrac{2\pi m}{qB}$ **不含 $v$** —— 速度增大则半径增大，**圆周周长同比增大**，故周期不变 ✓ **得分点：$T$ 式不含 $v$ + 物理解释**（AFB II）
3. **c) 交叉场**：$qE=qvB$ → $E=vB=2{,}0\cdot10^6\cdot5{,}0\cdot10^{-3}=1{,}0\cdot10^4\,\text{V/m}$ ✓ **得分点：力平衡条件 + 数值**（AFB II，CN-Methode 1/4）

**Aufgabe 2** `[CN-改编]`
1. **a) 判据**：碰撞**极短时间、内力远大于外力** → 可用**动量守恒**（矢量式，须定正方向）；能量**不一定**守恒（完全非弹性）→ 不能用机械能守恒 ✓ **得分点：矢量性判据 + 过程特征**（AFB II，CN-Methode 3）
2. **b) 计算**：$m_1v_1=(m_1+m_2)v'$ → $v'=\dfrac{0{,}50\cdot2{,}0}{2{,}0}=0{,}50\,\text{m/s}$ ✓ **得分点：守恒式 + 数值 + 方向说明**
3. **c) Beurteilung**：$E_{\text{kin,vor}}=\tfrac12\cdot0{,}50\cdot2{,}0^2=1{,}0\,\text{J}$；$E_{\text{kin,nach}}=\tfrac12\cdot2{,}0\cdot0{,}50^2=0{,}25\,\text{J}$ → **损失 $0{,}75\,\text{J}$（75%）**，转为内能/形变 ✓ **得分点：前后动能 + 定量损失 + 去向**（AFB II/III）

**Aufgabe 3** `[原创]`（判断力题）
1. **a) 判定**：(A) **属于** —— 电容器充放电是 **LK-1 内容重点**（用 DGL 及给定解描述 $q$/$U$/$I$）[已验证]。(B) **不属于** —— 求最大输出功率属**电路分析**，德国 KLP **无此 IF**；仅 `Ohmsches Gesetz` 作为工具性常识 ✓ **得分点：两题分别判定 + 依据 KLP 结构**（AFB III）
2. **b) Ansatz**：$U_0=RI+\dfrac{q}{C}$，$I=\dfrac{\mathrm dq}{\mathrm dt}$ → $\dfrac{\mathrm dq}{\mathrm dt}=\dfrac{U_0}{R}-\dfrac{q}{RC}$；解 $q(t)=CU_0\left(1-e^{-t/RC}\right)$，$\tau=RC$ ✓ **得分点：回路方程 + 代 $I$ + 解与 $\tau$**（AFB II，CN-Methode 7）
3. **c) Bewertung**：**可作练习素材但不可当考点**——借 `U-I` 图练「斜率 $=-r$、截距 $=E$」的图像三件套（CN-Methode 5），**但不得把「测 $E$ 与 $r$」写入复习清单**；须明确区分「练方法」与「背考点」。**桥接素材，非考纲内容** ✓ **得分点：限定用途 + 显式区分 + 结论**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把 `both-cn-deeper` 当成「可直搬」；把 `CN-only`（恒定电流、热学）当考点复习；按 GK 的 IF 名去规划 LK 内容 | 每题先查**状态码**；`CN-only` 一律标「桥接素材，非考纲内容」；GK/LK **分轨** |
| **知识错** | 用积分运算写微元法（**超纲**）；在 GK 卷里写 `Bragg`/`Delayed-Choice`/`DGL`；把 `bewerten` 写成「模型适用范围」 | 微元法止于「以恒代变、再求和」；按 `kursart` 选层级；Bewerten 须落**价值/规范/利益** |
| **表达错** | 只给数值不给 Ansatz（`berechnen` 官方定义要求**呈示计算过程**）；矢量量不写方向；概念题不引材料（**违反禁止纯论述**） | 按「Ansatz → 代入 → 结果 → 单位」四段写；矢量先定正方向；**任何答案挂靠材料或实验** |

---

## 7. Vernetzung

- **上游**：`CN-Physik-Formelhandbuch.md` · `CN-Physik-Tricks.md` · `Klausur-Training/CN-Physik-Training.md`（**现有 CN 三篇，本篇按 IF 重新切片**）· `00_META/Curriculum/Mapping/Physik-DE-CN-Mapping.md` §3（技法卡原文源）
- **下游**：`Lorentzkraft-Trajektorie-Geometriemethode.md`（CN 1）· `Parabelwurf-zu-Feldablenkung.md`（CN 4）· `Impuls-und-eindimensionale-Stoesse.md`（CN 3）· `LK-Differentialgleichungen-Vorbereitung.md`（CN 6+7）· `LK-Feld-Mathematisierung-Coulomb-Potential.md`
- **横向**：`Basiskonzepte-Vier-Achsen.md`（官方得分语言）· `Bewertungsgrenzen-Regelkarte.md`（四条判分边界）· `Erkenntnisgewinnung-Experimentdesign.md`（`planen` 写法）· `GK-LK-Fahrplan-Vergleich.md`（分轨对照）
- **术语卡**（建议入 csv）：本篇 §1 全表（Q1/Q2 术语卡），重点补 `Schwingkreis` / `Induktivität` / `Wahrscheinlichkeitsdichte` / `Zerfallsreihe` / `Kompetenzbereich` / `Bewertungskompetenz`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[CN-改编]` / `[原创]`，**解析全部原创**，不搬中国高考真题原题、不搬出版社教辅原题、不搬教材正文。
