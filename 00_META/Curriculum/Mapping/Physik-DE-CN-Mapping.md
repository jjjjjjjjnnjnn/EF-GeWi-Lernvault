---
fach: "Physik"
thema: "DE-CN Mapping"
operatoren: []
klausurrelevant: false
datum: 2026-09-24
tags: [EF, Q1, Q2, Meta, Curriculum, Mapping]
de_quelle: "Deutschland/Physik-Oberstufe.md"
cn_quelle: "China/Physik-CN-Kursstandard.md"
---

# Physik — 中德考纲对照表（NRW ↔ 中国）

> 德国源：[`Deutschland/Physik-Oberstufe.md`](../Deutschland/Physik-Oberstufe.md)（NRW KLP Physik，Heft `4721`，版本 `2022/23`，PDF `gost_klp_ph_2022_06_07.pdf`）
> 中国源：[`China/Physik-CN-Kursstandard.md`](../China/Physik-CN-Kursstandard.md)（`2017年版2020年修订`；必修1-3 + 选择性必修1-3 + 选修1-3）
>
> ⚠️ **无任何官方中德对照文件**。本表所有对照结论**均由本项目自行推导**（双边事实分别来自上述两份已验证文件，但「对应关系」本身无官方依据）。
> ⚠️ **标注分布说明**：德国侧结构事实与中国侧条目事实在其源文件中为 `[已验证]`；本表的**对照关系**一律 `[据推断]`（符合 `00-Design.md §1.6` 所述的正确分布）。
> 🎯 **本表的取向**：以 **Abitur 应试**为唯一筛选标准 —— 每个对照条目的价值判断回答的是「对 NRW Zentralabitur 有多大用」，而非「谁的课程更难」。
> 🔑 **用户已授权**：**可在「解题方法」层面使用中国教材信息**（依 `Lernbaum/00-Abi-Baum-Design.md §3.1` 三条铁律执行）。

---

## 状态码定义（固定四值）

| 状态码 | 含义 |
|---|---|
| `both-equal` | 两边都有，深度相当 |
| `both-de-deeper` | 两边都有，德国更深 |
| `both-cn-deeper` | 两边都有，**中国更深** ← 项目最关注 |
| `DE-only` | 仅德国有 |
| `CN-only` | 仅中国有 |

---

## 0. 结构前提：**读表前必须先接受的五条事实**

> 这五条若不清楚，后面所有对照都会错位。全部来自 `Deutschland/Physik-Oberstufe.md` 的 `[已验证]` 结论。

### 0.1 ⚠️ GK 与 LK 是**两套不同的 Inhaltsfeld**，不是「LK = GK + 加料」

| 学段 | Inhaltsfeld（德语原文） | 中文 |
|---|---|---|
| **EF**（GK/LK 共同前置） | `Grundlagen der Mechanik` | 力学基础 |
| **EF** | `Kreisbewegung, Gravitation und physikalische Weltbilder` | 圆周运动、引力与物理世界图景 |
| **Q GK** | `Klassische Wellen und geladene Teilchen in Feldern` | 经典波与场中的带电粒子 |
| **Q GK** | `Quantenobjekte` | 量子客体 |
| **Q GK** | `Elektrodynamik und Energieübertragung` | 电动力学与能量传输 |
| **Q GK** | `Strahlung und Materie` | 辐射与物质 |
| **Q LK** | `Ladungen, Felder und Induktion` | 电荷、场与感应 |
| **Q LK** | `Schwingende Systeme und Wellen` | 振动系统与波 |
| **Q LK** | `Quantenphysik` | 量子物理 |
| **Q LK** | `Atom- und Kernphysik` | 原子与核物理 |

> 两边各 4 个 IF，**标题与切分方式完全不同**，是「两种不同的课程架构」。[已验证]
> 📌 **结论**：本表主表 **GK 域与 LK 域分开列**，**禁止**用 GK 的 IF 名去规划 LK 内容。
> 📌 **做题时的实用结论**：**GK 的「发电机/变压器/交流电」与 LK 的「自感/DGL/交叉场」是两套互不覆盖的内容**（LK-1 无 `Transformator`/`Generator`/`Wechselspannung` 的独立条目）。

### 0.2 EF 的工具天花板（**决定了哪些中国技法可以合法嫁接**）

| 项 | EF 状态 | [已验证] |
|---|---|---|
| `Differentialgleichung` | **全文不出现该词** | ✅ |
| 最深数学工具 | **由测量数据（图表/表格）求 v 与 a**；表征三形式 `Messwerttabelle / Diagramm / Gesetz` | ✅ |
| `Coulomb'sches Gesetz` | **无** | ✅ |
| `elektrisches Potential` / `Potentialdifferenz` | **无** | ✅ |
| 静电学 | **完全无**（EF 从力学直接跳到 Q 阶段） | ✅ |
| `Reibungskräfte` | 仅 **qualitativ** | ✅ |
| 振动 | **无**（`Spannenergie` 在 EF 列出但无落点） | ✅ |
| 唯一的「场」 | `Gravitationsfeld`（在 Feldkonzept 下讲） | ✅ |
| 唯一的「非经典物理」 | `Zeitdilatation`（`Lichtuhr` 思想实验，定性+定量） | ✅ |

> 🎯 **这张表是 CN-Methode 合规性的判据来源**：任何技法若只用到「一维运动学 + 矢量分解 + Newton 定律 + 图像」，即为 ✅ 可嫁接；若需要 EF 之外的知识块（如电路、电势），即 ⚠️ 或 ❌。

### 0.3 `Basiskonzepte` —— 德国物理的**第四条轴**（KMK 规定，4 个）

| 德语原文 | 中文 | 贯穿链 |
|---|---|---|
| `Erhaltung und Gleichgewicht` | 守恒与平衡 | **EF 力学 → GK/LK 电动力学 → 量子 → 核物理**（全科最长的一条链） |
| `Superposition und Komponenten` | 叠加与分量 | EF 矢量分解 → 波的叠加 → 场的叠加 → 量子态叠加 |
| `Mathematisieren und Vorhersagen` | 数学化与预测 | EF 三表征 → LK-1 场的可计算化 → LK-2 DGL |
| `Zufall und Determiniertheit` | 随机与确定性 | EF 测量不确定度 → 量子随机性 → 核衰变统计 |

> ⚠️ **各 IF 的 Basiskonzept 分布不均**（GK `Elektrodynamik…` 与 LK `Ladungen…`/`Schwingende…`/`Quantenphysik` 无 Z+D 条目；GK `Elektrodynamik…` 与 LK `Quantenphysik` 无 E+G 条目）。[已验证]
> 📌 **对中国的落差**：中国 4 项核心素养（物理观念/科学思维/科学探究/科学态度与责任）是**能力侧**框架；德国把「守恒/叠加/数学化/随机」做成了**内容侧骨架**。**两者不可互换** → `DE-only`（见 X-01）。

### 0.4 两条最高价值台阶（**EF→Q 的隐形断层，无 EF 前置**）

| # | 台阶 | EF | Q | 严重度 |
|---|---|---|---|---|
| **①** | 🎯🎯 **DGL 语言** | 完全不出现 | **LK-1**：用 DGL + 给定解描述 RC 充放电；**LK-2**：由线性力律**自行推导**弹簧振子与小角近似单摆的 DGL，并由解求 `T` 与 `Thomson'sche Gleichung` | 🔴 最高 |
| **②** | 🎯🎯 **场的数学化**（Coulomb / Potential） | 只有 `Gravitationsfeld`，**无 Coulomb 定律、无电势** | **LK-1 独立内容重点**：点电荷力计算 + 场强叠加 + 电势/电势差。学生须从「场 = 场线图」跃迁到「场 = 可用 1/r² 与标量势计算的量」 | 🔴 最高 |

> 次高价值：**③ 二维运动的电学化**（EF 有 `waagerechter Wurf`，Q 直接进入带电粒子在匀强场中的轨道）。本质是**同一套运动学换到电学语境** → 见 CN-Methode 4。

### 0.5 物理 Abitur 的**法定硬约束**（价值判断的框架）

- **Aufgabenart I** `Materialgebundene Aufgabe`（可含演示实验）· **Aufgabenart II** `Fachpraktische Aufgabe`。[已验证]
- ⚠️ **「纯论述型（无材料、无实验关联）的任务是不允许的」** —— 物理独有的硬约束。[已验证]
- **AFB II 为重心**，全部 AFB 必须出现；时长 **GK 255 min / LK 300 min**。[已验证]
- **十条跨学科评分准则**（可直接做 Checklist）。[已验证]

---

## 1. 总览：覆盖面对比

| 领域 | 德国 NRW | 中国 | 覆盖状态 |
|---|---|---|---|
| 运动学（一维 + 平抛） | EF-1：`gleichförmig` / `gleichmäßig beschleunigt` / `freier Fall` / `waagerechter Wurf` | 必修1.1.3 + 1.1.4 + 必修2.2.2（公式法 + 图像法） | `both-equal` |
| 动力学与受力分析 | EF-1：Newton 三定律 + 力平衡 + 摩擦（**仅定性**） | 必修1.2.1–1.2.3（含量化摩擦、超重失重） | `both-cn-deeper` |
| 守恒律（动量 / 能量） | EF-1：`Impuls`、`Energie`、`Energiebilanzen`、一维 `Stoßvorgänge` | 必修2.1（功和功率/动能定理/势能/机械能守恒）+ 选必1.1（动量定理/动量守恒/一维碰撞定量） | `both-cn-deeper` |
| 圆周运动与引力 | EF-2：七量定量 + `Zentripetalkraft` + `Gravitationsgesetz` + `Kepler` + `Gravitationsfeld` | 必修2.2.3–2.2.5（含第一/二/三宇宙速度） | `both-equal` |
| 相对论与世界图景 | EF-2：世界图景变迁 + `Zeitdilatation`（**定性 + 定量**）+ 科学史论证链 | 必修2.3（牛顿力学局限性、相对论时空观，**偏定性**） | `both-de-deeper` |
| 机械振动 | GK-1 仅 `Federpendel`（**无 Fadenpendel、无 DGL**）；LK-2 加 `Fadenpendel` + DGL + `Resonanz` | 选必1.2.1–1.2.3（简谐运动公式与图像、单摆、受迫振动与共振） | GK：`both-cn-deeper` / LK：`both-de-deeper` |
| 机械波与光学 | GK-1：Huygens（`Wellenwanne` 定性）+ 反射/折射/衍射/叠加/偏振；**唯一光学定量点** = 双缝/光栅求 λ | 选必1.2.4–1.2.6 + 选必1.3（折射定律、全反射与光纤、干涉衍射偏振、双缝测 λ、激光） | `both-cn-deeper`（中国多普勒/几何光学独立成块） |
| 静电场 | **EF 无**；GK-1 仅 `E` 与 `U` 定义式 + 场线图；**LK-1 才有 Coulomb + Potential** | 必修3.1（库仑定律、电场强度、电势能/电势/电势差、带电粒子在电场中的运动、电容器） | `both-cn-deeper`（中国**必修**即完成，德国要到 LK） |
| **恒定电流 / 电路分析** | **KLP 全文无「电路分析」Inhaltsfeld** | 必修3.2（串并联、闭合电路欧姆定律、测 E 与 r、电功电功率焦耳定律） | 🔵 `CN-only` |
| 磁场与带电粒子 | GK-1：场线图 + `B` 定义式 + 洛伦兹力 + `Fadenstrahlrohr`（求 `m_e`）+ `Zyklotron`（定性）；LK-1 加 `gekreuzte Felder` + `Hall-Effekt` | 必修3.3.2 + 选必2.1（安培力、洛伦兹力、**匀强磁场中圆周运动**、质谱仪、回旋加速器） | `both-cn-deeper`（中国做成**几何化轨迹链**） |
| 电磁感应 | GK-3：磁通 + 感应定律（**平均变化率 + 微分形式**）；LK-1 加 `Lenz`（双论证）+ `Selbstinduktion` + `Induktivität` | 必修3.3.3 + 选必2.2.1–2.2.3（楞次定律、法拉第定律、自感与涡流） | `both-equal` |
| 交流电与能量传输 | **GK-3 独立 IF**：`Wechselspannung` + `Generator` + `Transformator` + 特高压模型 + 能量回收（**Bewertung 主战场**）；**LK-1 无这些独立条目** | 选必2.2.4–2.2.6（正弦交流电峰值/有效值、变压器匝数比、远距离输电） | GK：`both-de-deeper` / 交流计算：`both-cn-deeper` |
| 电容与 RC / 振荡电路 | GK-3：`Kapazität`（含 `Dielektrizitätszahl`）+ RC 充放电建模 + `Q-U` 面积 = 储能；LK-1 **用 DGL 及给定解** | 必修3.1.6（电容器与电容、充放电现象）；选必2.3.2（电磁振荡） | GK：`both-de-deeper` / LK：`DE-only`（DGL 部分） |
| 量子物理 | GK-2 `Quantenobjekte`：光电效应 + De-Broglie + 电子双缝 + `Welcher-Weg`；**LK-3** 加 `Bremsstrahlung` + `Bragg`（**须推导**）+ 由实验定 `h` + `Delayed-Choice` + 波函数平方 + `Heisenberg` | 选必3.4（光电效应方程、波粒二象性、电子衍射）；选修3 有不确定原理（**不在高考范围**） | 🎯 `both-de-deeper`（LK 显著更深） |
| 原子与核物理 | GK-4 `Strahlung und Materie`（辐射+原子+核**合为一 IF**）：Franck-Hertz、能级图、轨道概率、衰变律**应用**、`E=Δmc²`；**LK-4 独立 IF** + 势箱 + `Pauli` + `Zerfallsreihen` + **由 `Aktivität` 推导衰变律** + `C-14` + 结合能定量 + `Kettenreaktion` | 选必3.3（原子结构史、核式模型、核反应方程、半衰期、结合能、裂变聚变） | 🎯 `both-de-deeper`（LK 显著更深） |
| **热学** | **KLP 全文无热学 IF** | 选必3.1（分子动理论、气体实验定律、理想气体）+ 3.2（热力学第一/第二定律） | 🔵 `CN-only` |
| **传感器 / 激光 / 光纤** | 无 | 选必2.4、选必1.3.2、1.3.4 | 🔵 `CN-only` |
| 数学工具 | 公式 + 图表 + **（仅 LK）DGL 推导与求解** + 一维波方程 + 小角近似 | 矢量运算、图像法、**几何法（轨迹）**、微元/极限方法**明示**，**无 DGL** | 互有胜负（见主表 LK-08/09） |
| 评价框架 | 4 Kompetenzbereich + **明文能力边界规则** + AFB I/II/III + EPA 0–15 | 4 项核心素养 + **学业质量 5 级**（高考依据**水平 4**）+ 等级分制 | `both-de-deeper`（德国判分颗粒度更细） |

---

## 2. 知识点级对照主表

> **编号规则**：`EF-*` = EF 段（GK/LK 共同前置）· `GK-*` = Grundkurs 四个 IF · `LK-*` = Leistungskurs 四个 IF · `X-*` = 跨域/能力/评价。
> **「依据」列的含义**：双边事实已验证，**对照关系**为 `[据推断]`（无官方对照源）。

### EF 域（EF-1 `Grundlagen der Mechanik` / EF-2 `Kreisbewegung, Gravitation und physikalische Weltbilder`）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| EF-01 | `gleichförmige` / `gleichmäßig beschleunigte Bewegung`、`freier Fall`、`waagerechter Wurf` | 必修1.1.3 位移/速度/加速度 + 匀变速直线运动（**公式法与图像法**）；1.1.4 自由落体；必修2.2.2 平抛运动（运动的合成与分解） | `both-equal` | 🔴 **AFB I/II 基本盘**：一切 `materialgebundene Aufgabe` 的入口；平抛是 EF 唯一的二维运动，也是台阶③的载体 | [据推断] |
| EF-02 | `vektorielle Größen`；`Komponentenzerlegung bzw. Vektoraddition`（明示要求） | 必修1.2.2 力的合成与分解、矢量与标量 | `both-equal` | 🔴 **Basiskonzept `Superposition und Komponenten` 的第一个落点**；**现有笔记缺口**（DE 文件 §8 点名缺「矢量作为独立概念」） | [据推断] |
| EF-03 | `Newton'sche Gesetze`；`beschleunigende Kräfte`；`Kräftegleichgewicht` | 必修1.2.3 牛顿运动定律；1.2.2 共点力的平衡条件；1.2.3 超重与失重 | `both-cn-deeper` | 🔴 **AFB II 主力**。中国把连接体/板块/临界做成成套程序 → **CN-Methode 2** | [据推断] |
| EF-04 | `Reibungskräfte` —— KLP 明文**仅 qualitativ** | 必修1.2.1 滑动摩擦与静摩擦、**动摩擦因数计算滑动摩擦力** | `both-cn-deeper` | 🟠 中。德国只需「说明其对真实运动的影响」；**不要**在这块引入定量摩擦计算（超出 KLP，浪费时间） | [据推断] |
| EF-05 | `Impuls`、`Stoßvorgänge`（一维碰撞） | 选必1.1.1 冲量与动量、**动量定理与动量守恒定律**（理论推导 + 实验）；1.1.2 **定量分析一维碰撞**（弹性/非弹性） | `both-cn-deeper` | 🔴 **EF 唯一的 `Erhaltung und Gleichgewicht` 定量落点**，且是 GK-2/LK-3 量子部分「能量-动量守恒」的前置。**现有笔记零覆盖** → 最高补缺优先级 | [据推断] |
| EF-06 | `Energie`（`Lage-`/`Bewegungs-`/`Spannenergie`）、`Energiebilanzen` | 必修2.1.1 功和功率；2.1.2 **动能定理**（课标明示「可由牛顿第二定律推导」）；2.1.3 重力势能/弹性势能；2.1.4 机械能守恒 | `both-cn-deeper` | 🔴 **「受力视角 ⇄ 能量视角」双视角是 EF 核心方法论**；中国的「动能定理 vs 动量定理选择策略」是显式训练 → **CN-Methode 3** | [据推断] |
| EF-07 | 用**数学方法 + 数字工具**由测量数据求 v 与 a；表征三形式 `Messwerttabelle / Diagramm / Gesetz` | 必修1 必做实验「测量瞬时速度」；图像法 | `both-equal` | 🔴 **materialgebundene Aufgabe 的标准入口**（给数据表 → 求 v/a → 建模）。**这是 EF 数学工具的天花板** | [据推断] |
| EF-08 | `gleichförmige Kreisbewegung`：`Radius`/`Drehwinkel`/`Umlaufzeit`/`Umlauffrequenz`/`Bahngeschwindigkeit`/`Winkelgeschwindigkeit`/`Zentripetalbeschleunigung` **七量全上且要求相互关系**；`Zentripetalkraft` 定量 | 必修2.2.3 线速度、角速度、周期、**向心加速度**（大小与方向）、**向心力**（与半径/角速度/质量的关系）、离心现象 | `both-equal` | 🔴 **两边高度同构**，是**性价比最高的一块**（中国笔记几乎可直用）。且是 Q 阶段 `Fadenstrahlrohr` / `Zyklotron` 的圆周运动基础 | [据推断] |
| EF-09 | `Schwerkraft`、`Newton'sches Gravitationsgesetz`、`Kepler'sche Gesetze`、**`Gravitationsfeld`**（在 `Feldkonzept` 框架下讲） | 必修2.2.4 万有引力定律（发现过程与意义）；2.2.5 **人造卫星环绕速度、第一/二/三宇宙速度** | `both-equal` | 🟠 高。**各有胜场**：中国胜在宇宙速度定量计算；德国胜在 `Gravitationsfeld` 的**场概念**（是 LK-1 `Potential` 的概念前身） | [据推断] |
| EF-10 | `geo- und heliozentrische Weltbilder`；`Grundprinzipien der speziellen Relativitätstheorie`；**`Zeitdilatation`（`Lichtuhr`，要求 qualitativ **und** quantitativ）**；`Bezugssysteme` | 必修2.3.1 牛顿力学的局限性；2.3.2 **相对论时空观**（长度收缩、时间延缓、时空弯曲） | `both-de-deeper` | 🟠 高，但**是中国学生的失分盲区**：德国要求**定量**算时间膨胀，且要求**「天文观测结果 → 世界图景变迁」的论证链**（K1/K3/K10 = 检索/引述/标注出处）→ 这是**跨学科写作型任务**，中国无对等训练 | [据推断] |
| EF-11 | ——（**KLP 全文无热学 IF**） | 选必3.1 分子动理论、气体实验定律、理想气体；3.2 热力学第一/第二定律 | 🔵 `CN-only` | ⚫ **零 Abitur 价值**。仅作理解用，**禁止占用复习时间** | [据推断] |

### GK 域（Grundkurs 四个 IF）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| GK-01 | GK-1：`Federpendel`；**机械谐振**及其能量转换。**无 `Fadenpendel`、无 DGL** | 选必1.2.1 简谐运动（**公式与图像描述**）；1.2.2 单摆周期与摆长/重力加速度的定量关系 + **用单摆测 g** | `both-cn-deeper` | 🔴 **GK 高频题**。中国有 `x = A·sin(ωt+φ)` 的完整公式-图像语言与单摆定量；德国 GK 停在弹簧振子且无单摆 | [据推断] |
| GK-02 | GK-1：`Huygens'sches Prinzip`（**`Wellenwanne` 定性**）、`Reflexion`、`Brechung`、`Beugung`、`Superposition und Polarisation` | 选必1.2.4 波的特征、横波与纵波、`v=λf`；1.2.5 反射折射、干涉与衍射（实验）；**1.2.6 多普勒效应** | `both-cn-deeper` | 🟠 高。德国**不要求定量波前作图**（只做水波槽定性）；中国多了多普勒效应。⚠️ 但**不要把中国定量波前作图当成 Abitur 要求** | [据推断] |
| GK-03 | GK-1 光学：**唯一定量点** —— 由双缝/光栅干涉花样证明光的波动性**并求波长**（含 `mono- und polychromatisches Licht`） | 选必1.3.3 光的干涉/衍射/偏振、光是横波、**双缝干涉测量光的波长**（21 个必做实验之一） | `both-equal` | 🔴 **GK 唯一的光学定量点，必考级**。两边完全一致 → **中国笔记可直接用，零改造** | [据推断] |
| GK-04 | GK-1：`elektrische Feldstärke` 与 `magnetische Flussdichte` 的**定义式** + 场线图（匀强/径向/偶极）；要求用 `Superpositionsprinzip` **自行构造**场线图 | 必修3.1.3 电场强度（**用物理量之比定义新物理量的方法**）+ 电场线；3.3.2 磁感应强度、磁感线 | `both-cn-deeper` | 🔴 **GK 高频**。内容几乎相同，但**中国必修3 就完成，德国 EF 完全无静电 → 中国学生有巨大先发优势**。注意德国多了「**自行构造场线图**」这一探究型任务 | [据推断] |
| GK-05 | GK-1：`Bahnformen von geladenen Teilchen in homogenen Feldern`；核心实验 **`Fadenstrahlrohr`**（辉光发射 + 电场加速 + 磁场偏转 + **由测量值求电子质量**） | 必修3.1.5 **带电粒子在电场中的运动**；选必2.1.2 洛伦兹力（方向判断与大小计算）；2.1.3 **带电粒子在匀强磁场中的圆周运动与偏转** + **质谱仪 / 回旋加速器** | 🎯 `both-cn-deeper` | 🔴🔴 **本项目第一价值点**。德国只做定性/半定量轨迹描述，中国做成**「定圆心→找半径→算圆心角→t=(θ/2π)T」几何化套路** → **CN-Methode 1** | [据推断] |
| GK-06 | GK-1：`Millikan-Versuch` —— **仅「简化版本的统计评价」推断最小电荷存在** | 必修3.1.1 静电现象、电荷守恒；元电荷 | `both-equal` | 🟡 中。德国偏**统计评价 + 推断**；中国不把 Millikan 作为实验要求。**差异在「怎么考」不在「考什么」** | [据推断] |
| GK-07 | GK-1：`Zyklotron` —— **借助模拟理解其功能**（定性层） | 选必2.1.3 **回旋加速器**（课标点名；原理根基是 `T = 2πm/(qB)` 与速度无关） | 🎯 `both-cn-deeper` | 🔴 **GK 可考**，且**中国的定量原理可直接补德国的定性缺口**（用到的工具 EF 全有） | [据推断] |
| GK-08 | GK-2：`Energiequantelung von Licht`、`Photoeffekt` | 选必3.4.1 **光电效应现象 + 爱因斯坦光电效应方程**及其意义、光的波粒二象性 | `both-equal` | 🔴 **GK 必考**。中国有 `hν = W + E_k` 的定量方程训练；德国偏「能量量子化」的概念论证。**两边互补，可拼接** | [据推断] |
| GK-09 | GK-2：`De-Broglie-Wellenlänge`；须**定量解释**电子双缝的衍射花样 | 选必3.4.2 实物粒子具有波动性、量子化特征（**电子衍射实验**） | `both-equal` | 🔴 **GK 必考**。德国要求定量解释花样，中国要求了解电子衍射实验 | [据推断] |
| GK-10 | GK-2：`Wellen- und Teilchenmodell`、`Kopenhagener Deutung`、**`„Welcher-Weg"-Information` 作为干涉花样出现/消失的条件** | 选必3.4 波粒二象性；选修3 才有不确定原理（**不在高考范围**） | `both-de-deeper` | 🟠 高。**GK 唯一深入「量子随机性」的地方**；德国还有 `Determiniertheit der Zufallsverteilung`（随机分布的决定性）—— **Basiskonzept `Zufall und Determiniertheit` 的核心考点**，中国无对等 | [据推断] |
| GK-11 | GK-3：`magnetischer Fluss`、`elektromagnetische Induktion`、`Induktionsgesetz`（**「平均变化率」与「微分」两种写法**） | 必修3.3.3 磁通量、电磁感应现象与产生感应电流的条件；选必2.2.2 **法拉第电磁感应定律**（实验） | `both-equal` | 🔴 **GK 必考**。⚠️ 德国 GK **也要求微分表述**，这是中国学生的薄弱环节（中国高中不给微分写法） | [据推断] |
| GK-12 | GK-3：内容重点里**只有 `Induktionsgesetz`**，`Lenz'sche Regel` 未独立点名（LK-1 才独立，且须**相互作用 + 能量双论证**） | 选必2.2.1 **楞次定律**（课标明示「**从能量观点解释**」） | `both-equal` | 🟠 高。**中国的「从能量观点解释楞次定律」恰好命中德国 LK 的双论证要求** → 可直用 | [据推断] |
| GK-13 | GK-3：`Generator`、`Transformator`、`Freileitungen` 特高压模型实验、**能量供给/储存/回收**（`Energiebereitstellung`/`-speicherung`/`-rückgewinnung`） | 选必2.2.5 变压器原副线圈电压与匝数的关系、**远距离高压输电的原因**；2.2.6 发电机与电动机的能量转化 | 🎯 `both-de-deeper` | 🔴🔴 **GK 的 `Bewertungskompetenz` 主战场**（如「电车制动能量回收」）。德国是**独立 IF + 技术/社会导向**，中国只有原理计算 → **中国学生必须专门补「评价类写法」** | [据推断] |
| GK-14 | GK-3：`Wechselspannung` —— 正弦交流电的产生须**由感应定律解释**（定性—半定量） | 选必2.2.4 **正弦交变电流**（**公式与图像、峰值与有效值**） | `both-cn-deeper` | 🟠 高。**中国有完整计算体系（有效值/相位/功率）**；德国只需「由感应定律解释产生」。⚠️ 中国的交流电计算属**超出项**，可作保险，**不是得分重点** | [据推断] |
| GK-15 | GK-3：`Kapazität`（**含 `Dielektrizitätszahl` 定量公式**）、`Auf- und Entladevorgang`（**建模电流随时间变化**）、**`Q-U` 图中图线与横轴所围 = 储能** | 必修3.1.6 **电容器与电容**、充放电现象 | `both-de-deeper` | 🔴 **GK 高频**。德国要求**介电常数定量公式 + 面积积分思想 + 建模 I(t)**；中国只到「了解充放电现象」。⚠️ **这是中国学生的明确缺口** | [据推断] |
| GK-16 | GK-3：`Thomson'scher Ringversuch`（跳环实验）；电磁振荡（**定性**） | 选必2.2.3 涡流现象；2.3.2 电磁振荡（实验） | `both-equal` | 🟡 中。跳环实验是**德国 GK 独有实验点**，须单独记 | [据推断] |
| GK-17 | GK-4：`Spektrum der elektromagnetischen Strahlung`、`ionisierende Strahlung`、`Geiger-Müller-Zählrohr`、`biologische Wirkungen`、**`effektive Dosis` 须量化并据此评价防护措施** | 选必3.3.3 放射性、**半衰期及其统计意义**、放射性同位素应用、射线危害与防护 | `both-equal` | 🔴 **GK 的 Bewertung 交叉点**：德国要求「量化有效剂量 → 评价防护措施」。注意 §3.1 规则：**纯学科内的模型评判不算 Bewerten** | [据推断] |
| GK-18 | GK-4：`Linienspektrum`、**`Franck-Hertz-Versuch`**（核心实验）、`Energieniveauschema`、`Kern-Hülle-Modell`；H 原子轨道**解释为电子探测概率的可视化** | 选必3.3.1 探索原子及其结构的历史、**原子的核式结构模型**、**氢原子光谱与能级结构** | `both-equal` | 🔴 **GK 必考**。Franck-Hertz 是德国 GK 核心实验，中国课标无此点名实验 → **须单独补** | [据推断] |
| GK-19 | GK-4：`Röntgenstrahlung` —— 须**区分 `Bremsstrahlung` 与 `charakteristische Röntgenstrahlung`** | 选必3.3（X 射线在原子/核主题内，未区分两种机制） | `both-de-deeper` | 🟡 中。德国 GK 就要区分两种机制（GK/LK 均有），中国较轻 | [据推断] |
| GK-20 | GK-4：`Nukleonen`、`Zerfallsprozesse und Kernumwandlungen`、`Zerfallsgesetz`（**只要求应用，不要求推导**）、`Kernspaltung und -fusion`、**`E = Δm c²` 与 `Massendefekt`**；`Nuklidkarte` 为明确工具 | 选必3.3.2 原子核的组成与核力、四种基本相互作用、**核反应方程**（质量数守恒 + 电荷守恒）；3.3.3 半衰期；3.3.4 **结合能、核裂变与核聚变** | `both-equal` | 🔴 **GK 必考**。⚠️ 德国**必须使用 `Nuklidkarte`（核素图）**；中国用核反应方程配平。**工具不同，须专门练** | [据推断] |
| GK-21 | GK-4：质点-夸克-强相互作用定性说明；**β⁻ 衰变中微子由弱相互作用及其交换粒子产生** | 选必3.3.2 原子核的组成与核力、**四种基本相互作用** | `both-equal` | 🟡 中（多为 AFB I/II 定性说明） | [据推断] |

### LK 域（Leistungskurs 四个 IF —— **与 GK 不是同一套**）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| LK-01 | LK-1：**`Coulomb'sches Gesetz`** —— 须**计算点电荷间作用力**与叠加后场强的量值/方向 | 必修3.1.2 **点电荷模型 + 库仑定律**（与质点模型类比）；3.1.3 电场强度 | 🎯 `both-cn-deeper` | 🔴🔴 **台阶②之一**。中国**必修**就完成，德国 **EF 完全无静电、LK 一上来就要求** → 中国学生可**直接前移**，这是最划算的前置补强 | [据推断] |
| LK-02 | LK-1：**`elektrisches Potential` / `Potentialdifferenz`** —— 须区分 `Feldstärke`/`Spannung`/`Energie`，用**电势与电势差**统一处理平板电容器（定量）与径向场（定性） | 必修3.1.5 **电势能、电势、电势差**；匀强电场中**电势差与电场强度的关系**（`U = Ed`） | 🎯 `both-cn-deeper` | 🔴🔴 **台阶②之二**。同 LK-01。⚠️ 德国要求「**区分 E / U / W 三个量**」的论证（AFB II/III），中国只给公式 → **概念辨析题是中国学生的失分点** | [据推断] |
| LK-03 | LK-1：`geladene Teilchen in elektrischen Längs- und Querfeldern`；**`gekreuzte Felder`**（正交电磁场，速度选择器原理）；`relativistische Massenzunahme im Zyklotron`（须提出假设） | 必修3.1.5 带电粒子在电场中的运动；选必2.1 磁场（复合场分类讨论在高考是标准题型） | 🎯 `both-cn-deeper` | 🔴🔴 **台阶③**。德国的 `gekreuzte Felder` 只有条目、更依赖建模；中国有**完整的复合场分类讨论体系** → **CN-Methode 1 + 4** | [据推断] |
| LK-04 | LK-1：`Lorentzkraft`；**`Hall-Effekt`**（须用霍尔效应研究磁通密度）；须**设计实验**测定长直载流线圈的 `B` 对其影响量的依赖；`Helmholtzspule` | 选必2.1.1 安培力、**安培力的应用（磁电式电表）**；2.1.2 洛伦兹力 | `both-de-deeper` | 🟠 高。⚠️ **德国 LK 要求「自行设计实验」** —— 属 `Erkenntnisgewinnungskompetenz`（不是 Sachkompetenz！见 DE §3.1 规则 1）。中国学生**必须补实验设计写法** | [据推断] |
| LK-05 | LK-1：**`Lenz'sche Regel` 独立内容重点**，须**同时用相互作用概念与能量概念**论证；**`Selbstinduktion` / `Induktivität`**（解释合闸延迟与分闸电压冲击） | 选必2.2.1 楞次定律（**从能量观点解释**）；2.2.3 **自感现象与涡流现象**及其应用 | `both-de-deeper` | 🔴 **LK 必考**。中国的「从能量观点解释楞次定律」命中一半；**自感/电感在德国是独立内容重点，中国只作了解** → 缺口 | [据推断] |
| LK-06 | LK-1：**用微分方程及其给定解**描述电容器充放电的 `q`/`U`/`I` 关系（含 `C` 与 `R`）；**匀强电/磁场的储能**与电学量及元件特征量的关系 | **无对应**（中国高中不用 DGL） | 🎯 `DE-only` | 🔴🔴 **台阶①之一，LK 最高价值的中国缺口**。中国学生**必须在 LK 前补 DGL 语言**（可与 `03_Mathe` 的 Analysis 联动） | [据推断] |
| LK-07 | LK-2：**由线性力律为 `Federpendel` 与 `Fadenpendel`（小角近似）自行推导 DGL**；由 DGL 与其解求**周期 `T`** 与 **`Thomson'sche Gleichung`** | 选必1.2.1 简谐运动（公式与图像）；1.2.2 单摆周期与摆长/g 的**定量关系** + 用单摆测 g | 🎯 `both-de-deeper` | 🔴🔴 **台阶①之二**。中国**只给结果公式，不要求推导**；德国要求**自行推导 DGL 并求 T** → 中国学生的第二大连锁缺口 | [据推断] |
| LK-08 | LK-2：**`Resonanz`** —— 须**实验研究**（含日常生活联系）并**评价避免共振灾难的措施** | 选必1.2.3 受迫振动、**共振的条件与应用** | `both-de-deeper` | 🔴 高。**德国加了 Bewertung 层（共振灾难防范）**；中国只到「条件与应用」 | [据推断] |
| LK-09 | LK-2：**`Schwingkreis` / `Hertz'scher Dipol`**（须把赫兹偶极子描述为**开放的振荡电路**）；**机械 ⇄ 电磁振动类比**（从能量与本征量两方面比较） | 选必2.3.1 麦克斯韦电磁场理论；2.3.2 电磁振荡（实验）；2.3.3 赫兹实验 | `both-de-deeper` | 🔴 高。**「机械 ⇄ 电磁类比」是德国 LK 的招牌题型**（`Basiskonzept Erhaltung und Gleichgewicht` 的漂亮落点），中国无此训练 | [据推断] |
| LK-10 | LK-2：**一维波方程**（须数学描述一维谐振波的**空间与时间演化**）；定性说明**无阻尼/阻尼/受迫**三种情形 | 选必1.2.4 波的特征、波速/波长/频率的关系 | `both-de-deeper` | 🟠 高。中国无波方程 | [据推断] |
| LK-11 | LK-2：**为单缝、双缝、光栅给出相长/相消干涉条件**并作实验定量验证（单色与多色光）；**`Michelson-Interferometer`**（须说明结构与工作方式）；须**区分演绎法与归纳法**（方法论） | 选必1.3.1 **光的折射定律 + 测量材料的折射率**；1.3.2 **全反射与光纤**；1.3.3 光的干涉/衍射/偏振 + **双缝干涉测光的波长**；1.3.4 激光 | `both-equal` | 🔴 高。**各有独有块**：德国有 Michelson + 演绎/归纳方法论；中国有折射率测量、全反射/光纤、激光 | [据推断] |
| LK-12 | LK-3：**`Bremsstrahlung`**（须解释**短波极限**的出现）+ **`Röntgenröhre` 的结构与工作方式** | 选必3.3（X 射线，未点名管结构与短波极限） | `both-de-deeper` | 🟠 高。**「短波极限 = 全部动能转为单个光子能量」是典型 AFB II 推导题** | [据推断] |
| LK-13 | LK-3：**`Bragg-Reflexion` —— 须推导 `Bragg'sche Reflexionsbedingung`**；`Elektronenbeugung`（须解释电子衍射管的实验观察）；**由光电效应实验数据确定 `h`** | 选必3.4.1 爱因斯坦光电效应方程；3.4.2 实物粒子的波动性（**电子衍射实验**） | 🎯 `both-de-deeper` | 🔴🔴 **LK 高频 + 中国明确缺口**。Bragg 推导、由实验数据求 h 两项中国高中均不做 | [据推断] |
| LK-14 | LK-3：**`Delayed-Choice-Experiment` + `Koinzidenzmethode`**，须用 **`Komplementarität`** 解释干涉花样的出现与消失；**波函数平方 = 电子探测概率密度**；**`Heisenberg` 不确定关系（限定「不可能性表述」版本）** | 选必3.4 波粒二象性；选修3 有海森伯不确定性原理 —— ⚠️ **选修1-3 不在高考范围** | 🎯🎯 `both-de-deeper` | 🔴🔴 **中德差距最大的一块**。德国 LK 把当代量子概念做成常规考点；中国止于「波粒二象性」的了解层 | [据推断] |
| LK-15 | LK-4：**`Atommodelle` 史（须复述到首个核-壳模型）**、**`eindimensionaler Potentialtopf`**（须说明模型及局限，并由 **`Pauli-Prinzip`** 推广到多电子体系） | 选必3.3.1 探索原子及其结构的历史、**原子的核式结构模型**、氢原子光谱与能级结构 | 🎯 `both-de-deeper` | 🔴 高。**一维势箱 + Pauli 推广是中国完全没有的模型** | [据推断] |
| LK-16 | LK-4：**由 `Aktivität` 的定义推导 `Zerfallsgesetz`（含半衰期项）**；`Zerfallsreihen` + 人工核转变（裂变/聚变/中子俘获）；**`Altersbestimmung` / `C-14-Methode`**；须**设计测定短寿命核素半衰期的实验** | 选必3.3.3 半衰期及其统计意义；3.3.2 核反应方程 | 🎯 `both-de-deeper` | 🔴 高。**德国要求「推导」而中国只要求「应用」**；C-14 定年与短寿命半衰期实验设计是中国缺口 | [据推断] |
| LK-17 | LK-4：**`Bindungsenergien` 定量**（在定量考虑结合能的前提下用强相互作用描述裂变与聚变）；**`Massendefekt`**；**`Kettenreaktion`**（独立内容重点）；须**在 GM 计数管与能量灵敏探测器之间为目标实验作出选择** | 选必3.3.2 原子核的组成与核力；3.3.4 **原子核的结合能**、核裂变与核聚变；3.3.5 加速器与粒子探测器 | `both-de-deeper` | 🔴 高。**「探测器选择」是典型的 `Erkenntnisgewinnung` 设计题**（须说明理由，不是复述） | [据推断] |
| LK-18 | LK-4 Bewertung：**核裂变/聚变对全球能源供应的利弊** + **讨论放射性废物最终处置（多源资料）** | 选必3.4 能源与可持续发展（必修3.4 有能源主题）；科学态度与责任（STSE） | `both-de-deeper` | 🔴 **LK 的 Bewertung 压轴区**。⚠️ 依 §3.1 规则 4：**只谈模型适用性不得分**，必须落到价值/规范/利益（经济、生态、社会、政治、伦理） | [据推断] |

### X 域（跨域 / 能力 / 评价 / 结构）

| # | 德国（NRW） | 中国 | 状态 | Abitur 应试价值 | 依据 |
|---|---|---|---|---|---|
| X-01 | **4 个 `Basiskonzepte`** 作为**内容侧**跨 IF 骨架；`Erhaltung und Gleichgewicht` 贯穿 EF 力学 → 电动力学 → 量子 → 核物理 | 4 项核心素养（物理观念 / 科学思维 / 科学探究 / 科学态度与责任）——**能力侧**框架 | 🎯 `DE-only` | 🔴 **极高**。Basiskonzept 是德国物理作答的**「官方得分语言」**：答题时点明「这是守恒与平衡」「这是叠加与分量」直接命中评分准则 `Herstellen geeigneter Zusammenhänge`。中国无对等概念 → **必须单独建立** | [据推断] |
| X-02 | **4 个 Kompetenzbereich + 四条明文能力边界规则**：① 实验**设计**归 `Erkenntnisgewinnung`、**按指导做**归 `Sachkompetenz`；② 不嵌入认识过程的方法执行归 S；③ **数学表述不归 `Kommunikation`**；④ **`rein innerfachliche Bewertungen` 不归 `Bewertung`** | 4 项核心素养；无此类归属边界规则 | 🎯 `both-de-deeper` | 🔴🔴 **成本最低、判分收益最高**。这是**可直接批改的判分边界**。规则 ③④ 与直觉相反（写公式不算沟通能力；「模型适用范围」不算 Bewerten）→ **必做知识卡** | [据推断] |
| X-03 | **EF→Q 的动词等级整体上移**：`beschreiben`/`untersuchen`/`nachvollziehen` → **`erklären`/`beurteilen`/`reflektieren`**；`E11` 增加 5 条科学判据（`Reproduzierbarkeit`/`Falsifizierbarkeit`/`Intersubjektivität`/`logische Konsistenz`/`Vorläufigkeit`） | 学业质量**水平 2 → 水平 4**（水平 2 = 熟悉情境单点应用；水平 4 = 真实情境建模 + 多规律综合） | `both-equal` | 🔴 **非知识点型台阶，最易被忽略**。水平 4 与德国 AFB II（`Reorganisation und Transfer`）**高度同构** → 中国的水平 4 训练可直接迁移 | [据推断] |
| X-04 | **法定题型约束**：Aufgabenart I `Materialgebundene Aufgabe` / Aufgabenart II `Fachpraktische Aufgabe`；**禁止纯论述型任务**；若含 fachpraktische Anteile 可延长且**须在题目中列明** | 高考：选择题（覆盖面与信度）+ 非选择题（**呈现解答过程**）；课标只给原则性要求，**未规定具体分值** | `both-equal` | 🔴 高。⚠️ 「**禁止纯论述题**」是物理独有的硬约束 —— 意味着**任何答案都必须挂靠材料或实验** | [据推断] |
| X-05 | ——（**KLP 全文无「电路分析」IF**；电路只在 GK-3 的充放电视角与 LK-1 的 RC-DGL 视角被触及） | 必修3.2：**串并联电阻特点**、**闭合电路欧姆定律**、**测电源电动势与内阻**、**电功/电功率/焦耳定律**、多用电表 | 🔵 `CN-only` | ⚫ **零 Abitur 价值**，但 ⚠️ 是**中国最大且最系统的超出量**。只可作「图像法」的练习素材（见 CN-Methode 5），**不得作为知识块引入** | [据推断] |
| X-06 | —— | 选必3.1 分子动理论、固体/液体/气体、气体实验定律；3.2 热力学第一/第二定律 | 🔵 `CN-only` | ⚫ 零价值。德国物理 KLP **全文无热学** | [据推断] |
| X-07 | —— | 选必2.4 **传感器**（热敏电阻、光敏传感器、自动控制装置）；选必1.3.2 全反射与**光纤**；1.3.4 **激光** | 🔵 `CN-only` | ⚫ 零价值（但可作 GK-3「能量传输技术」Bewertung 的**背景知识**，不计入复习） | [据推断] |
| X-08 | **无必做实验清单**；但 LK 大量要求**自行设计实验**（长直线圈 B、短寿命半衰期、Resonanz、Dielektrikum 假设检验、探测器选择） | **21 个必做实验逐条点名**（12 必修 + 9 选必） | 互有（`DE-only` 的设计要求 / `CN-only` 的清单机制） | 🔴 **双向缺口**：中国学生**不缺「做过什么」，缺「如何论证实验设计」**；德国正好反过来 | [据推断] |
| X-09 | 强调情境与模型，**不强调量纲** | 必修1.2.4 **国际单位制中的力学单位**；单位制意义 | `CN-only`（轻） | 🟡 低。但可作为**答案自检工具**（见 CN-Methode 8） | [据推断] |
| X-10 | `Bewertungskompetenz`：必须**含价值/规范/利益**，须**多视角**、须**互相权衡**、须 `lokal und global` | 核心素养「科学态度与责任」（含 **STSE**）——**显式独立素养** | `both-equal` | 🔴 高。**STSE 是中国学生的优势**，可直接迁移到德国 Bewertung；⚠️ 但必须改掉「只谈技术层面」的习惯 | [据推断] |

---

## 3. 🇨🇳 CN-Methode 技法卡（**本文件的核心产出**）

> **三条铁律**（依 `Lernbaum/00-Abi-Baum-Design.md §3.1`，违反即打回）：
> 1. **只引入「方法」，不引入「超纲知识」**。用中国式**解题路径**是可以的；引入德国 KLP 完全没有的**知识板块**（如恒定电流、热学）不行。
> 2. **每条必须标注 `DE-Anschluss`** —— 该技法用到的**全部工具**，须逐一确认德国 KLP 已教。
> 3. **来源分层**：`[CN-课标]`（课标规定内容）/ `[CN-教材]`（教材的结构性方法，只记方法名与逻辑）/ `[CN-高考]`（高考题型与解题套路，**原创改写，不搬原题**）。
>
> ⚠️ **本表所有技法均为本项目推导**，不搬运任何教材正文或原题。

### CN-Methode 1：带电粒子偏转的「几何化轨迹链」（含临界三圆模型）

- **技法内容**：把磁场中的圆周运动拆成固定的四步工序 —— ① **定圆心**（入射点与出射点两处洛伦兹力方向的垂线交点）；② **找半径**（`r = mv/(qB)`，或由几何关系/三角函数求出）；③ **算圆心角**（圆心角 = 偏转角 = 速度方向改变角）；④ **算时间**（`t = (θ/2π)·T`，而 `T = 2πm/(qB)` **与速度无关**）。临界问题再套三种几何模型：**旋转圆**（速度方向变）、**放缩圆**（速度大小变）、**平移圆**（入射点变），把「粒子能否射出/打到何处」转化为「圆与边界是否相交」的纯几何判定。来源：`[CN-课标]` 选必2.1.3 + `[CN-高考]` 高频题型。
- **DE-Anschluss**：`Lorentzkraft`（GK-1 / LK-1 已教，含方向判定）· `Zentripetalkraft` 与 `gleichförmige Kreisbewegung`（**EF-2 已教且要求定量**，`F_z = mv²/r`）· `Komponentenzerlegung` 与 `Vektoraddition`（**EF-1 已教，明示要求**）· 圆周七量（EF-2）。**不需要任何新知识**。
- **合规性**：✅ —— 全部工具落在 EF 范围内，只是把「定性说轨迹是圆的」升级为「定量算出圆心/半径/圆心角/时间」。这是**方法**不是**知识**。
- **Abitur 应用**：GK-1 的 `Fadenstrahlrohr`（由测量值求 `m_e`）与 `Zyklotron`；LK-1 的 `gekreuzte Felder` 与 `Bahnformen`。**AFB II 为主**（把已知工具转移到新的电学语境），临界三圆可上 AFB III。
- **产出物**：`04_Physik/Lorentzkraft-Bahngeometrie.md`（配套：`CN-Methode 1` 的「定圆心-找半径-算圆心角-算时间」四步 + 三圆模型图示 + 5 道原创改写题）

### CN-Methode 2：整体法 / 隔离法的**显式判据**（以「系统内加速度是否相同」为分流准则）

- **技法内容**：不再凭感觉选整体还是隔离，而是先判一个二值条件 —— **系统内各物体加速度相同 → 用整体法**（只列外力，`F_外 = M_总·a`）；**加速度不同 → 必须隔离**（逐体列牛顿第二定律）。混合用法固定为「**整体求系统外力 → 隔离求内力**」两步。配套「等效」思想：把多个力等效为合力、把非共点力系等效为共点（三力汇交）。来源：`[CN-课标]` 必修1.2.2 + 1.2.3，课标教学建议**明示**「分解—综合」与「等效」的物理思想；`[CN-教材]` 层次链。
- **DE-Anschluss**：`Newton'sche Gesetze`（EF-1 已教）· `Kräftegleichgewicht` 与 `beschleunigende Kräfte`（EF-1 已教）· `Komponentenzerlegung`（EF-1 已教）· **`Spannenergie`**（EF-1 已列，是弹簧/绳索内力的能量侧对应）。德国**有 Kraft 概念但缺此判据**。
- **合规性**：✅ —— 判据本身是纯逻辑（加速度是否相同），用到的方程全是 EF 已教的牛顿第二定律。
- **Abitur 应用**：EF-1 `Dynamik` 的一切连接体/叠放体/斜面-滑块题；`materialgebundene Aufgabe` 中「把真实装置抽象为受力系统」的建模步骤。**AFB II**（AFB III 当要求论证所选方法的适用性时，正对 `E3 beurteilen`）。
- **产出物**：`04_Physik/Gesamt-vs-Einzelkoerper-Methode.md`（做成**决策树卡片**：第一步只问一句「系统内加速度是否相同」）

### CN-Methode 3：守恒律选择策略（动量定理 vs 动能定理 —— **第一判据是矢量性**）

- **技法内容**：把「该用哪条定理」做成三级决策 —— **第一判据（矢量性）**：需要**方向/分量**的用**动量定理**（矢量式，须先定正方向）；只问**大小/能量多少**的用**动能定理**（标量式，无方向）。**第二判据（已知量/过程特征）**：涉**时间** → 动量定理；涉**位移/路程** → 动能定理；**变力**做功 → 动能定理（对变力与曲线运动都成立，是最大优势）；**变力**冲量（流体碰撞、平均力）→ 动量定理。**第三判据（过程类型）**：碰撞/爆炸/反冲（极短时间、内力远大于外力）→ **动量守恒**；摩擦生热/多过程能量转化 → 能量守恒/动能定理。**组合解**：动量守恒 + 能量守恒联立解一维碰撞；动量定理 + 动能定理分列解同一过程。来源：`[CN-课标]` 必修2.1.2（动能定理，课标明示「可由牛顿第二定律推导」）+ 选必1.1.1（动量定理，明示「通过理论推导和实验理解」）+ `[CN-高考]` 选择策略训练。
- **DE-Anschluss**：`Impuls` 与 `Stoßvorgänge`（**EF-1 已教**）· `Energie`（`Lage-`/`Bewegungs-`/`Spannenergie`）与 `Energiebilanzen`（**EF-1 已教**）· 「**从受力与从能量两个角度**分析运动」（**EF-1 明文要求的双视角**）· `vektorielle Größen`（EF-1）。**两边共同点高，中国多的是「选择策略」被显式训练**。
- **合规性**：✅ —— 两条定理德国都有，本技法只是**选择流程**，零新增知识。
- **Abitur 应用**：EF-1 的 `Stoßvorgänge` 与 `Energiebilanzen`；GK-2/LK-3 的「光与物质相互作用」用能量与动量守恒分析（DE 文件 §GK-2 明示要求）；GK-4/LK-4 的 `Massendefekt`（守恒原理的**广义化**）。**AFB II**，联立解可到 AFB III。
- **产出物**：`04_Physik/Impuls-vs-Energie-Entscheidungsbaum.md`（**一页决策树**；正面写三判据，背面写 4 道「同一情境两条路径」的对照题）

### CN-Methode 4：平抛 → 电场中偏转的**同构翻译**

- **技法内容**：把电场中的带电粒子偏转**逐项翻译**成平抛 —— 「重力场」换成「匀强电场」，`g` 换成 `a = qE/m`（由 `F = qE` 与牛顿第二定律一步得出），`m` 换成带电粒子的质量，其余**完全不动**：沿场方向匀加速、垂直场方向匀速、轨迹为抛物线、偏转角 `tanθ = v⊥/v∥`、侧移 `y = ½at²`。翻译表一旦建立，平抛的**全部现成结论**都可直用。来源：`[CN-课标]` 必修3.1.5「能分析带电粒子在电场中的运动」+ 必修2.2.2 平抛（运动的合成与分解方法）；`[CN-教材]` 类平抛处理。
- **DE-Anschluss**：**`waagerechter Wurf`（EF-1 已教，且是 EF 唯一的二维运动）** · `Komponentenzerlegung`（EF-1 已教）· `Newton'sche Gesetze`（EF-1）· `gleichmäßig beschleunigte Bewegung`（EF-1）。**Q 阶段只需补一步：Coulomb 力 → 加速度**（GK-1 有 `elektrische Feldstärke` 定义式 `E = F/Q`；LK-1 有 `Coulomb'sches Gesetz`）。
- **合规性**：✅ —— 这是**性价比最高的前置补强**：EF 已教平抛分解，只需补「力 → 加速度」一步，不需要任何新知识。（对应 DE 文件 §4 台阶③的官方结论）
- **Abitur 应用**：GK-1 的 `Bahnformen von geladenen Teilchen in homogenen Feldern`；LK-1 的 `Längs- und Querfelder`。**AFB II**（`Übertragen auf vergleichbare neue Zusammenhänge` —— 这个技法本身就是 AFB II 的定义）。
- **产出物**：`04_Physik/Isomorphie-Wurf-zu-Feldablenkung.md`（**一张双向翻译表**：平抛 ↔ 电场偏转；配 EF 已会的 3 道平抛题 → 改写为电场版）

### CN-Methode 5：图像三件套 —— **面积 / 斜率 / 截距的物理量翻译**

- **技法内容**：拿到任何 `y-x` 图像，固定问三个问题：**斜率是什么物理量？面积（图线与横轴所围）是什么物理量？截距是什么物理量？** 由量纲与定义式反推（例：`v-t` 斜率 = `a`、面积 = `s`；`F-s` 面积 = `W`；`Q-U` 面积 = 电容器储能；`U-I` 斜率 = `-r`、纵截距 = `E`）。这是**一套跨主题通用的图像读法**，不是某一章的技巧。来源：`[CN-课标]` 必修1.1.3「公式法、图像法」与必修3.2.4「体会图像法在研究物理问题中的作用」；`[CN-教材]` 图像法体系。
- **DE-Anschluss**：**`Messwerttabelle / Diagramm / Gesetz` 三种表征形式（EF-1 明文要求，且 KLP 说这是「递增的数学化」）** · 由测量数据求 `v`/`a`（**EF-1 的天花板工具**）· **`Q-U` 图中面积 = 储能（GK-3 明文要求）**。**德国的官方抓手比中国还显式**。
- **合规性**：✅ —— 图像法是 EF 的核心训练项，本技法只是把它归纳成可复用的三问清单。
- **Abitur 应用**：**GK-3 的 `Q-U` 面积 = 电容储能**（明文考点，直接命中）；EF-1 的一切数据图表题；`materialgebundene Aufgabe` 的「解读给定图表」标准动作（`Darstellungsaufgaben` 里的「表、图、Diagramm 的解读」）。**AFB I/II**。
- **产出物**：`04_Physik/Diagramm-Flaeche-Steigung-Achsenabschnitt.md`（做成**可背诵的三问清单**；只收录德国 KLP 范围内出现的图像，⚠️ **不收录 `U-I` 求 `E`/`r`** —— 那属 X-05 的 `CN-only`）

### CN-Methode 6：线性化近似（**小角近似**）—— 为 LK-2 的 DGL 推导铺路

- **技法内容**：遇到非线性力律（如单摆 `F = -mg·sinφ`）时，先**判能否在小量条件下线性化**（`sinφ ≈ φ`，`cosφ ≈ 1`），把非线性问题化为 `F = -kx` 的线性形式，从而识别为谐振子并直接读出 `ω` 与 `T`。关键是**始终记住近似的适用条件与误差方向**（角度增大时周期实际偏大）。来源：`[CN-课标]` 选必1.2.1 简谐运动特征 + 1.2.2 单摆周期与摆长/g 的定量关系；`[CN-教材]` 小角近似处理。
- **DE-Anschluss**：**LK-2 明文要求「在小角近似下由线性力律推导单摆的 DGL」** —— 近似本身是德国 KLP 的**规定动作**，不是中国带来的。`Spannenergie`（EF-1）· `Federpendel`（GK-1）· `harmonische Schwingungen`（GK-1 / LK-2）。
- **合规性**：✅ —— 完全落在 LK-2 的要求内；中国侧提供的只是「**先线性化、再识别为谐振子**」这一**思维顺序**（中国用得极熟），德国学生常卡在不知道该先做近似。
- **Abitur 应用**：**LK-2 的 DGL 推导题（台阶①的核心）**，以及由 DGL 与解求 `T` 与 `Thomson'sche Gleichung`。**AFB II/III**（AFB III 当要求说明模型的局限时，正对 LK-4 的「须说明模型及局限」）。
- **产出物**：`04_Physik/Linearisierung-und-Kleinwinkel-Naeherung.md`（与 `03_Mathe` 的 Analysis 联动；**化解台阶①的入口笔记**）

### CN-Methode 7：微元法与极限思想（`Elementarisieren`）—— 累积量的通用处理

- **技法内容**：处理**变化的量**时，把过程切成无穷多个小段，在每一小段内**把变量当常量**处理（「以恒代变」），再把所有小段**求和/取极限**。典型用途：变力做功、非匀加速的位移、连续分布的电荷/质量的场。其核心是**「先微元、再求和」的两步框架**，而不是任何具体公式。来源：`[CN-课标]` 必修1.1.3「**极限方法**」为课标明示条目 + 必修2.1.1「力的方向与位移方向不共线时的功」；`[CN-教材]` 微元法体系。
- **DE-Anschluss**：**课标侧「极限方法」是中国明示条目，德国 EF 未明示** —— ⚠️ 注意这一条的方向与其他技法相反。德国侧的接收口是：**LK-1 要求「用 DGL 及其给定解描述 RC 充放电」**（DGL 的本质就是微元关系的极限形式）· **GK-3 的 `Q-U` 面积 = 储能**（积分思想但不建积分概念）· **Basiskonzept `Mathematisieren und Vorhersagen`**（官方跨 IF 轴，是本技法的合法落点）· EF 的 `Gesetz` 表征形式。
- **合规性**：✅ —— 「以恒代变、再求和」是**思维方式**，不是知识块；且德国 `Mathematisieren und Vorhersagen` 这个 Basiskonzept 就是它的官方名分。⚠️ 但**不得据此引入定积分运算**（德国 EF/Q 无此要求，属超纲）。
- **Abitur 应用**：GK-3 的 RC 充放电建模与 `Q-U` 面积；**LK-1 的 DGL 描述（台阶①）**；LK-2 的阻尼振动定性说明。**AFB II/III**。
- **产出物**：`04_Physik/Elementarisieren-Methode.md`（**与 CN-Methode 6 合并为「LK-DGL 前置包」**；明确标注「本卡不引入积分运算」）

### CN-Methode 8：极端值 / 特殊值检验法 + 量纲自检（`Grenzfallprobe`）

- **技法内容**：解出结果后不直接交卷，做两项 30 秒自检 —— ① **极端值检验**：把某个参数推向 `0` 或 `∞`，看结果是否退化为已知常识（例：`r = mv/(qB)` 中 `B→∞` 时 `r→0` 合理）；② **量纲自检**：结果的单位是否与所求物理量一致。若两项都过，计算错误概率大幅下降。来源：`[CN-教材]` 特殊值法/极限法；`[CN-课标]` 必修1.2.4 国际单位制。
- **DE-Anschluss**：`vektorielle Größen` 与公式应用（EF-1）· **Basiskonzept `Mathematisieren und Vorhersagen`**（官方要求「预测」—— 自检正是预测的验证）· EF 的 `Gesetz` 表征形式。**零新增知识，纯元认知检查**。
- **合规性**：✅ —— 这是**检查习惯**，与课程内容完全无关，任何学段都合法。
- **Abitur 应用**：**全题型通用**，尤其 LK-1 的 `Coulomb`/`Potential` 定量计算（中国学生最易在方向与符号上失分）与 LK-2 的 DGL 求 `T`。**不占分，但防止丢分**；对 `Sicherheit im Umgang mit Fachsprache und -methoden`（十条评分准则之一）有正面作用。
- **产出物**：并入 `04_Physik/Klausur-Training/Physik-Selbstcheck-Checkliste.md`（**一页纸**，考前三分钟过一遍）

### CN-Methode 9（⚠️ 反例示范）：等效电源与动态电路分析 —— **不建议引入**

- **技法内容**：串并联化简、`(E,r)` 打包为等效电源、动态分析的「程序法」（局部 R 变 → 总 R 变 → 总 I 变 → 路端电压 → 局部）与「串反并同」口诀、极限法/特殊值法拉变阻器、`U-I` 图像斜率 = `-r`、电源总功率/输出功率/内耗功率三值区分。来源：`[CN-课标]` 必修3.2.3 + 3.2.4 + 3.2.5；`[CN-高考]` 高频题型。
- **DE-Anschluss**：**德国 KLP 全文无「电路分析」Inhaltsfeld**。电路只在 **GK-3 的充放电视角**与 **LK-1 的 RC-DGL 视角**被触及；`Ohmsches Gesetz` 与 `Reihen-/Parallelschaltung` 属**工具性常识**而非内容重点。**无合法接口**。
- **合规性**：⚠️ **不合规** —— 违反铁律 1（这是**知识板块**，不是方法）。**本卡的作用是提供反例**：说明为什么「看起来很像物理」的中国内容也不能搬。
- **Abitur 应用**：⛔ **无**。仅可作为 CN-Methode 5（图像三件套）的**练习素材**（借 `U-I` 图练「斜率/截距翻译」），**但不得把「测 E 与 r」当作德国考点复习**。
- **产出物**：不做笔记；仅在 `04_Physik/CN-Physik-Brueecke.md` 中标注为「**桥接素材，非考纲内容**」

---

## 4. 高价值差异清单（**行动项**）

> 本工程的产出目的：把中国的知识密度与解题技法，适配进德国框架。**排序 = Abitur 应试性价比**。

### 🎯 中国更深 / 更系统 —— 值得借鉴改写

| 优先级 | 知识点 | 中国做法 | 德国现状 | 可产出 |
|---|---|---|---|---|
| 🔴 **1** | 带电粒子偏转的几何化轨迹链 `GK-05` / `LK-03` | 定圆心→找半径→算圆心角→`t=(θ/2π)T` 四步工序 + 临界三圆模型 | 只做定性/半定量轨迹描述 | **《Lorentzkraft 轨迹几何法》（CN-Methode 1）** —— **不需新知识点即可嫁接** |
| 🔴 **2** | 整体法/隔离法的显式判据 `EF-03` | 以「系统内加速度是否相同」为二值分流准则 | 有 `Kraft` 概念，**缺此判据** | **《整体法与隔离法决策卡》（CN-Methode 2）** |
| 🔴 **3** | 守恒律选择策略 `EF-05/06` | 第一判据矢量性 → 第二判据已知量/变力 → 第三判据过程特征 | 两条定理都有，**不训练「选择策略」** | **《Impuls vs. Energie 决策树》（CN-Methode 3）** |
| 🔴 **4** | 平抛 → 电场偏转的同构翻译 `LK-03` / 台阶③ | 类平抛分解，`g → qE/m` 一步替换 | EF 已教平抛，Q 阶段直接跳到带电粒子轨道 | **《同构翻译表》（CN-Methode 4）** —— 性价比最高的前置补强 |
| 🔴 **5** | 静电场定量化（库仑 + 电势）`LK-01/02` | **必修**即完成库仑定律、电场强度、电势/电势差、`U=Ed` | **EF 完全无静电，LK-1 一上来就要求** | **《场的数学化前置包》** —— 化解台阶②，中国学生可直接前移 |
| 🟠 **6** | 简谐运动与单摆定量 `GK-01` | 公式与图像描述 + 单摆周期定量 + 用单摆测 g | GK 只有 `Federpendel`，**无 `Fadenpendel`** | **《GK 振动补全：从 Federpendel 到 Fadenpendel》** |
| 🟠 **7** | 一维碰撞定量 `EF-05` | 弹性/非弹性碰撞定量分析 + 21 必做实验之一 | EF 有一维 `Stoßvorgänge` 但颗粒度粗 | **《Impuls + 一维碰撞》（EF 内即可闭环）** —— 现有笔记**零覆盖** |
| 🟠 **8** | 交流电计算体系 `GK-14` | 峰值/有效值/相位/功率完整计算 | GK 只需「由感应定律解释产生」（定性—半定量） | **仅作保险**，不作主攻 |
| 🟠 **9** | 楞次定律的能量论证 `LK-05` | 课标明示「**从能量观点解释**」 | LK-1 要求「**相互作用 + 能量**双论证」 | **《Lenz 双论证》** —— 中国侧恰好命中德国要求的一半 |

### ⚪ 德国独有 / 更深 —— 中国学生的**缺口清单**

| 优先级 | 知识点 | 说明 | 补法 |
|---|---|---|---|
| 🔴 **1** | **DGL 语言（`DE-only`）** `LK-06/07` | LK-1 用 DGL + 给定解描述 RC 充放电；LK-2 **自行推导**弹簧振子与小角单摆的 DGL 并求 `T` 与 `Thomson'sche Gleichung`。**EF 完全无前置** | **台阶①** → CN-Methode 6 + 7 组成「LK-DGL 前置包」，与 `03_Mathe` 联动 |
| 🔴 **2** | **场的数学化** `LK-01/02` | Coulomb + Potential + 场强叠加。**EF 无 Coulomb、无电势** | **台阶②** → 用中国必修3.1 直接前移（这是中国**优势**，反向补） |
| 🔴 **3** | **4 个 `Basiskonzepte`** `X-01` | 内容侧跨 IF 骨架，是德国作答的**官方得分语言** | 必做：《Basiskonzepte 四轴追踪卡》（`Erhaltung und Gleichgewicht` 是最长的一条链） |
| 🔴 **4** | **四条能力边界规则** `X-02` | 实验**设计**归 E / **按指导做**归 S / **数学表述不归 K** / **纯学科内评判不归 B** | 必做：**《判分边界规则卡》** —— 成本最低、收益最直接 |
| 🔴 **5** | **自行设计实验** `LK-04/17` | 长直线圈 B、短寿命半衰期、Resonanz、Dielektrikum 假设检验、探测器选择 | 中国有 21 个必做实验但**不训练「论证设计」** → 补 `Erkenntnisgewinnung` 写法 |
| 🔴 **6** | **当代量子深度** `LK-13/14` | Bremsstrahlung 短波极限、Röntgenröhre、**Bragg 须推导**、由实验数据定 `h`、**Delayed-Choice + Koinzidenz**、**波函数平方 = 概率密度**、**Heisenberg（不可能性表述）** | 中国止于波粒二象性了解层（不确定原理在**选修3，不在高考范围**）→ **LK 最大缺口** |
| 🟠 **7** | **核物理的推导与实验设计** `LK-16/17` | **由 `Aktivität` 推导衰变律**（中国只要求应用）、`Zerfallsreihen`、`C-14` 定年、结合能定量、`Kettenreaktion`、探测器选择 | 逐条补 |
| 🟠 **8** | **GK-3 的技术/社会导向** `GK-13` | `Generator`/`Transformator`/特高压/能量回收是**独立 IF + Bewertung 主战场** | 中国只有原理计算 → 补**评价类写法** |
| 🟠 **9** | **`Zufall und Determiniertheit`** `GK-10` / `X-01` | GK-2 要求解释「随机分布的决定性」；贯穿 EF 测量不确定度 → 量子随机性 → 核衰变统计 | 中国无对等的内容侧统摄概念 |
| 🟠 **10** | **世界图景变迁 + `Zeitdilatation` 定量** `EF-10` | 要求**定量**算时间膨胀 + **「天文观测 → 世界图景变迁」的论证链**（K1/K3/K10） | 中国必修2.3 偏定性，且无「标注出处」的写作训练 |
| 🟠 **11** | **`Feldkonzept` 讲引力** `EF-09` | 引力放在**场概念框架**下讲，是 LK-1 `Potential` 的概念前身 | 中国用「两质点互相吸引」，补场的表述 |
| 🟠 **12** | **EF→Q 动词上移** `X-03` | `beschreiben` → `erklären`/`beurteilen`/`reflektieren`；`E11` 五条科学判据 | **非知识点型台阶，最易被忽略**；可直接做成动词对照卡 |
| 🟡 **13** | **禁止纯论述题** `X-04` | 物理独有硬约束：**任何答案必须挂靠材料或实验** | 写作习惯调整 |
| 🟡 **14** | **`Nuklidkarte` / `Franck-Hertz` / `Thomson'scher Ringversuch`** `GK-18/20/16` | 德国 GK 明确要求的**工具与实验**，中国课标无点名 | 单独记（属工具层，非知识层） |

### 🔵 中国独有（德国不考，仅供理解 —— **禁止占用复习时间**）

| 知识点 | 说明 | 处理 |
|---|---|---|
| **恒定电流 / 电路分析** `X-05` | 闭合电路欧姆定律、测 E 与 r、电表改装、功率三值、动态分析。**KLP 全文无此 IF** | ❌ 不复习（见 CN-Methode 9 反例）。**这是中国最大且最系统的超出量** |
| **热学** `X-06` | 分子动理论、气体实验定律、理想气体、热力学第一/第二定律。**KLP 全文无热学** | ❌ 不复习 |
| **传感器 / 激光 / 光纤** `X-07` | 选必2.4、选必1.3.2/1.3.4 | ❌ 不复习（可作 GK-3 Bewertung 的背景知识） |
| **第一/二/三宇宙速度** `EF-09` | 中国必修2.2.5 有完整计算 | ⚠️ 可作保险；德国只要求由引力定律与开普勒定律求轨道数据 |
| **21 个必做实验的清单机制** `X-08` | 德国**无**必做实验清单 | ⚠️ 无价值（但实验**操作熟练度**可迁移到 `fachpraktische Aufgabe`） |
| **选修3（不确定性原理、质能方程计算、宇宙学）** | 中国**选修1-3 不在高考范围** | ❌ 无价值；且德国 LK 的对应内容**更深**（见 LK-14） |

---

## 5. 难度与节奏差异

| 维度 | 德国 NRW（Physik） | 中国（物理） |
|---|---|---|
| **结构骨架** | **6 个 IF（EF 2 / GK 4 / LK 4）+ 4 Kompetenzbereich + 4 Basiskonzepte** 三维交叉 | **9 模块（必修3 + 选必3 + 选修3）× 主题 × 编号条目**，线性递进 |
| **广度** | 窄而聚焦：**明确排除**电路分析、热学、传感器、激光/光纤 | 宽而全：含上述全部 |
| **深度** | **两极化**：EF 极浅（摩擦仅定性、无静电、无 DGL）；**LK 在量子/核物理/DGL 上极深** | 均匀且密度高：内容量大但单点深度中等（高考依据**水平 4**） |
| **数学工具** | EF：公式 + 图表 + 求 v/a（**天花板**）；GK：+ 微分形式感应定律、`Q-U` 面积思想；**LK：DGL 推导与求解 + 一维波方程 + 小角近似** | 矢量运算、图像法、**几何法（轨迹）**、微元/极限方法**明示**；**无 DGL** |
| **GK/LK 分流** | ⚠️ **两套完全不同的 IF**，选课不同则缺的知识块完全不同 | 无 GK/LK 分流；选必三模块对全体选考学生一致 |
| **题型侧重** | **法定两题型**：`Materialgebundene Aufgabe` / `Fachpraktische Aufgabe`；**禁止纯论述题**；AFB II 为重心；**十条跨学科评分准则** | 选择题（覆盖面/信度）+ 非选择题（**呈现解答过程**）；课标只给原则性要求，**未规定具体分值** [未获取到] |
| **实验** | **无必做清单**，但 LK 大量要求**自行设计实验并论证**（属 `Erkenntnisgewinnung`） | **21 个必做实验逐条点名**（12 必修 + 9 选必）；重操作与数据处理，**轻设计论证** |
| **评价方式** | EPA **0–15 分制** + Zentralabitur + `kriterielles Bewertungsraster`；AFB I/II/III | 高考**等级分制**；学业质量 **5 级**（合格考 = 水平 2，**高考 = 水平 4**） |
| **考试时长** | **GK 255 min / LK 300 min**（BASS 13-32 Nr. 6）[已验证] | 各省自定，**课标未规定** [未获取到] |
| **跨学科轴** | **Basiskonzepte 为内容侧骨架**（守恒 / 叠加 / 数学化 / 随机-确定） | **STSE 为独立核心素养**（科学态度与责任） |

---

## 6. 待核实项

- [ ] **`Operatoren-NRW-Alle-Faecher.md` 尚未创建** —— 物理的官方 Operatoren 动词表未取得，本表未列动词层对照 [未获取到]
- [ ] **`Klausur-Formate/Klausur-und-Abitur-Formate.md` 目录尚未创建** —— Abitur 时长仅从 `01-Quellen.md §A.4` 取得，未与该文件交叉核对 [未获取到]
- [ ] 物理 Operatoren 的 Fachseite 直链（`.../zentralabitur-gost/faecher/physik-gost`）**未实测** [据推断，见 DE §7]
- [ ] **Abitur 2027 物理的 Fachliche Vorgaben** 具体内容（是否指定 IF 组合）[未获取到]
- [ ] 中国**各省等级性考试的试卷结构与分值比例** —— 课标只给原则性要求，**未规定具体分值** [未获取到]
- [ ] 中国**选修1-3 是否在某些省份进入选考范围**（本表按课标的「不在高考范围」结论处理）[据推断]
- [ ] 德国 GK 的 `Induktionsgesetz` 说「微分形式」—— 需确认其**具体表述形式**（是 `dΦ/dt` 还是 `ΔΦ/Δt` 的极限写法）[据推断]
- [ ] `Millikan-Versuch` 在 GK 与 LK 的分级表述（「简化版本的统计评价」vs「简单版本说明思路与结果」）**语义微妙**，需看 Kompetenzerwartung 原文确认 [未获取到]
- [ ] 德国 EF 是否要求**定量**摩擦 —— 本表依 DE 文件结论（**仅 qualitativ**）处理 [已验证，来自 DE 源文件]

---

## 变更记录

- 2026-09-24：创建（S5 中德映射阶段）。基于 `Deutschland/Physik-Oberstufe.md`（官方 KLP `gost_klp_ph_2022_06_07.pdf`，Heft 4721，`2022/23`，逐条 [已验证]）与 `China/Physik-CN-Kursstandard.md`（`2017年版2020年修订`，逐条 [已验证]）交叉推导。**无官方中德对照文件**，全部对照关系为本项目推导，逐条标注 [据推断]。
  - **关键结构结论**：① **GK 与 LK 是两套不同的 Inhaltsfeld**（各 4 个，标题与切分不同），主表已**分域列出**；② **EF 全文无 `Differentialgleichung`、无 `Coulomb'sches Gesetz`、无 `elektrisches Potential`**，最深工具仅为「由测量数据求 v/a」—— 这是 CN-Methode 合规性的判据来源；③ **两条最高价值台阶**为 DGL 语言与场的数学化，二者**均无 EF 前置**且集中在 LK 路线。
  - **产出 9 条 CN-Methode 技法卡**（含 4 条指定深化项：几何化轨迹链 / 整体隔离判据 / 守恒律选择策略 / 平抛→电场同构翻译），全部标注 `DE-Anschluss` 与合规性，其中 **CN-Methode 9 为 ⚠️ 反例示范**（演示铁律 1 为何禁止引入电路分析知识块）。
