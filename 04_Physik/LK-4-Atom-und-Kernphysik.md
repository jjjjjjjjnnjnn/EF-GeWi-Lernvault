---
fach: Physik
thema: "Atom- und Kernphysik (LK): Atommodelle, Potentialtopf, Zerfallsgesetz, Bindungsenergie"
operatoren: [darstellen, begründen, bewerten, erklären, vergleichen, herleiten, aufstellen, berechnen, ordnen, untersuchen, planen, diskutieren]
klausurrelevant: true
datum: 2026-09-25
tags: [Q2, Physik, Atomphysik]
stufe: "Q2"
kursart: "LK"
---

# Atom- und Kernphysik (原子与核物理 · LK 路线) `[LK]`

> **中文理解**：这是 **LK-4 `Atom- und Kernphysik`**，一个**独立 Inhaltsfeld**（GK 把「辐射 + 原子 + 核」合在 `Strahlung und Materie` 里，LK 拆出来并**大幅加深**）[已验证]。五条主线：① **原子模型史**（Dalton → Thomson → Rutherford，须复述到**首个核-壳模型**，且说明「每个模型被哪个实验推翻」）；② **`eindimensionaler Potentialtopf`**（须说明模型及**局限**，并经 `Pauli-Prinzip` 推广到多电子体系）；③ **由 `Aktivität` 的定义推导 `Zerfallsgesetz`（含半衰期项）** —— GK 只要求**应用**，LK 要求**推导**；④ **`Altersbestimmung` / C-14 定年**；⑤ **`Bindungsenergien` 定量 + `Massendefekt` + `Kettenreaktion`** [已验证]。
> ⚠️ **Basiskonzept 落点**：`Erhaltung und Gleichgewicht`（质量亏损 → 推广能量守恒原理）· `Mathematisieren und Vorhersagen`（定量原子模型可算能级）· `Zufall und Determiniertheit`（**单核衰变随机 vs 大量核按衰变律确定**）；**无 `Superposition und Komponenten` 条目** [已验证]。
> ⚠️ **中国侧落差**：中国有半衰期与核反应方程，但**「由活度推导衰变律」只要求应用不要求推导**；`eindimensionaler Potentialtopf` + `Pauli` 推广、C-14 定年、短寿命半衰期实验设计**中国高中完全没有** [据推断]。
>
> **Klausur-Relevanz**：§4 缺口 #19（★★）[已验证]。本 IF 同时承载 **`herleiten`（推导）** 与 **`planen`（自行设计实验）**，是 LK 的 AFB II–III 密集区；末段的核能/废物评价是 **Bewertung 压轴区**。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Atommodell` | 原子模型 | atomic model | 从 Dalton 到核-壳模型的演进 | 须说明推翻依据 [已验证] |
| `eindimensionaler Potentialtopf` | 一维势箱 | one-dimensional potential well | $E_n=\dfrac{n^2h^2}{8mL^2}$ | **须说明局限** [已验证] |
| `Pauli-Prinzip` | 泡利原理 | Pauli exclusion principle | 每个态最多 2 个电子（自旋相反） | 推广到多电子 [已验证] |
| `Energieniveauschema` | 能级图 | energy level diagram | 离散能级 + 跃迁 | M+V 落点 [据推断] |
| `Aktivität` $A$ | 活度 | activity | $A=-\dfrac{\mathrm dN}{\mathrm dt}=\lambda N$ | 单位 Bq [据推断] |
| `Zerfallskonstante` $\lambda$ | 衰变常数 | decay constant | 单位时间单个核的衰变概率 | [据推断] |
| `Zerfallsgesetz` | 衰变定律 | decay law | $N(t)=N_0e^{-\lambda t}$ | **须由 $A$ 推导** [已验证] |
| `Halbwertszeit` $T_{1/2}$ | 半衰期 | half-life | $T_{1/2}=\dfrac{\ln 2}{\lambda}$ | 推导的副产品 [据推断] |
| `Zerfallsreihe` | 放射系 | decay series | 母核经 α/β 衰变到稳定核的链 | 用 `Nuklidkarte` 追踪 [已验证] |
| `Massendefekt` $\Delta m$ | 质量亏损 | mass defect | $\Delta m=Zm_p+Nm_n-m_{\text{Kern}}$ | 定量 [已验证] |
| `Bindungsenergie` $E_B$ | 结合能 | binding energy | $E_B=\Delta m\,c^2$ | 比结合能曲线 [已验证] |
| `Kettenreaktion` | 链式反应 | chain reaction | 每次裂变放出 2–3 个中子 | LK 独立重点 [已验证] |
| `kritische Masse` | 临界质量 | critical mass | 中子增殖因子 $k=1$ 对应的质量 | 自持 ≠ 停止 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 原子模型史：模型 → 关键实验 → 被推翻的原因

中文理解：KLP 要求**复述原子模型历史发展到首个核-壳模型的重要贡献**，且**点名 Dalton / Thomson / Rutherford** [已验证]。**不是年代罗列，而是论证链**：

| 模型 | 提出者 | 核心主张 | 关键实验 | 被推翻 / 修正的原因 |
|---|---|---|---|---|
| 不可分球 | **Dalton** | 原子是不可分的实心球 | — | 阴极射线、放射性表明原子**有内部结构** [据推断] |
| 葡萄干布丁 | **Thomson** | 正电荷均匀分布，电子嵌在其中 | 阴极射线偏转（测出电子） | **Rutherford 散射**：大角度散射无法解释 [据推断] |
| 核式模型 | **Rutherford** | 正电荷与质量集中在极小**核**内 | α 粒子金箔散射 | **稳定性 + 线状光谱**无法解释 [据推断] |
| 核-壳模型 | **Bohr** 等 | 电子在**离散能级**的壳层上 | `Franck-Hertz`、线状光谱 | 仍是半经典，后由量子力学取代 [据推断] |

> *Klausur-Satz*: „Dalton beschrieb Atome als unteilbare Kugeln, Thomson nahm eine gleichmäßig verteilte positive Ladung mit eingebetteten Elektronen an. Rutherfords Streuversuch zeigte, dass die positive Ladung und fast die gesamte Masse in einem sehr kleinen Kern konzentriert sind; die beobachtete Stabilität und die Linienspektren erforderten schließlich ein Kern-Hülle-Modell mit diskreten Energieniveaus." [原创]

⚠️ **易错**：只列人名与年份而**不写「被什么实验推翻」**；不标注出处（`K10`） [据推断]。

### 2.2 一维势箱：离散能级的最简模型

中文理解：把电子看作**宽 $L$ 的一维箱**中的**驻波**：$n\dfrac{\lambda}{2}=L\Rightarrow\lambda=\dfrac{2L}{n}$；由 $p=\dfrac{h}{\lambda}$ 与 $E=\dfrac{p^2}{2m}$ 得 **$E_n=\dfrac{n^2h^2}{8mL^2}$**——**能级离散**且 $\propto n^2$ [据推断]。这解释了「**为什么能级是分立的**」。

> *Klausur-Satz*: „Im eindimensionalen Potentialtopf der Breite $L$ bilden sich stehende Wellen aus: $n\dfrac{\lambda}{2}=L$. Mit $p=h/\lambda$ folgt $E_n=\dfrac{n^2h^2}{8mL^2}$, d. h. die Energie ist quantisiert und wächst quadratisch mit der Quantenzahl $n$." [原创]

⚠️ **模型局限（KLP 明文要求说明）**：① 真实原子是**三维**、势不是无限高方墙；② **忽略电子间相互作用**；③ 只给能级**量级**，不给出精确谱线 [据推断]。

### 2.3 由势箱经 `Pauli-Prinzip` 推广到多电子体系

中文理解：单电子势箱每能级只有一组 $n$；`Pauli-Prinzip` 规定**每个量子态最多容纳 2 个电子（自旋相反）** [已验证]。于是电子从低到高**逐级填充**，形成**壳层结构** → 周期性化学性质与线状光谱的离散性由此得到解释 [据推断]。

> *Klausur-Satz*: „Nach dem Pauli-Prinzip kann jeder Quantenzustand höchstens mit zwei Elektronen (entgegengesetzter Spin) besetzt werden. Die Besetzung der Potentialtopf-Niveaus von unten nach oben liefert damit die Schalenstruktur der Elektronenhülle." [原创]

### 2.4 辐射种类、探测与吸收

中文理解：KLP 要求**用性质（磁/电偏转、穿透力、电离能力）解释**现象，并**在 `Geiger-Müller-Zählrohr` 与能量灵敏探测器之间为目标实验作出选择** [已验证]。**这是 `Erkenntnisgewinnung` 设计题——须说明理由，不是复述**。

| 探测器 | 优点 | 适用目标 |
|---|---|---|
| `Geiger-Müller-Zählrohr` | 灵敏、计数快、便宜 | **只数粒子**（活度、半衰期、计数率）[据推断] |
| 能量灵敏探测器（如 Szintillator/Halbleiter） | 可测**每条射线的能量** | **测能谱**（γ 谱、区分核素）[据推断] |

> *Klausur-Satz*: „Soll nur die Anzahl der Zerfälle pro Zeit bestimmt werden, ist das Geiger-Müller-Zählrohr geeignet; soll dagegen die Energie der Strahlung aufgelöst werden, ist ein energiesensibler Detektor zu wählen. Die Wahl ist mit dem jeweiligen Messziel zu begründen." [原创]

### 2.5 由 `Aktivität` 推导 `Zerfallsgesetz`（**LK 核心推导**）

中文理解：`Aktivität` 定义 $A=-\dfrac{\mathrm dN}{\mathrm dt}$（单位时间减少的核数）；实验规律 $A=\lambda N$。两式合并 → $\dfrac{\mathrm dN}{\mathrm dt}=-\lambda N$。用**微元法**理解：在 $\Delta t$ 内把 $N$ 当常量，减少量 $\Delta N=-\lambda N\Delta t$；求和/取极限得**指数律** $N(t)=N_0e^{-\lambda t}$。半衰期：令 $N=N_0/2$ → $e^{-\lambda T_{1/2}}=\dfrac12$ → **$T_{1/2}=\dfrac{\ln 2}{\lambda}$** [已验证]。

> *Klausur-Satz*: „Mit der Definition der Aktivität $A=-\dfrac{\mathrm dN}{\mathrm dt}$ und der experimentellen Beziehung $A=\lambda N$ folgt $\dfrac{\mathrm dN}{\mathrm dt}=-\lambda N$ und daraus das Zerfallsgesetz $N(t)=N_0e^{-\lambda t}$. Aus $N(T_{1/2})=N_0/2$ ergibt sich $T_{1/2}=\dfrac{\ln 2}{\lambda}$." [原创]

⚠️ **易错**：$\lambda$ 与 $T_{1/2}$ 关系写反（应是 $T_{1/2}=\ln 2/\lambda$，$\lambda$ 越大半衰期**越短**） [据推断]。

### 2.6 C-14 定年与放射系

中文理解：C-14 定年**假设**「样品活着时 C-14 含量与大气**平衡**」，死亡后按 $N(t)=N_0e^{-\lambda t}$ 衰减；**测出剩余活度比** $A/A_0=N/N_0$ → 反解 $t=\dfrac{1}{\lambda}\ln\dfrac{N_0}{N}$ [据推断]。`Zerfallsreihen`（放射系）用 **`Nuklidkarte`** 逐级追踪（α：$Z\!-\!2$、$A\!-\!4$；β⁻：$Z\!+\!1$、$A$ 不变） [已验证]。

> *Klausur-Satz*: „Bei der C-14-Methode wird vorausgesetzt, dass das Verhältnis von C-14 zu C-12 in lebenden Organismen dem der Atmosphäre entspricht. Nach dem Absterben folgt die Aktivität dem Zerfallsgesetz, sodass sich aus dem gemessenen Aktivitätsverhältnis das Alter $t=\dfrac{1}{\lambda}\ln\dfrac{A_0}{A}$ ergibt." [原创]

### 2.7 结合能、质量亏损与链式反应

中文理解：核的质量**小于**组成它的核子质量之和，差 $\Delta m$ 即**质量亏损**，对应**结合能** $E_B=\Delta m\,c^2$（**能量守恒的广义化**） [已验证]。**比结合能 $E_B/A$ 曲线**在 **Fe-56 附近最大**（**最稳定**）；**裂变（重核 → 中等核）与聚变（轻核 → 中等核）都朝「比结合能更大」方向进行，因此放能** [据推断]。**`Kettenreaktion`**：每次裂变放出 2–3 个中子，若平均**恰好 1 个**中子引发下一次裂变（增殖因子 $k=1$）即为**临界、自持**；控制棒吸收中子调 $k$ [据推断]。

> *Klausur-Satz*: „Die Differenz zwischen der Summe der Nukleonenmassen und der Kernmasse ist der Massendefekt $\Delta m$; die Bindungsenergie beträgt $E_B=\Delta m\,c^2$. Da die spezifische Bindungsenergie bei Eisen maximal ist, setzen sowohl Kernspaltung schwerer Kerne als auch Kernfusion leichter Kerne Energie frei. Bei der Kettenreaktion wird jeweils mindestens ein Neutron für die nächste Spaltung genutzt." [原创]

⚠️ **易错**：把「比结合能最大处」说成「最不稳定」（是**最稳定**，铁峰）；把「临界」说成「停止」（是**自持**） [据推断]。

---

## 3. 解题方法 (Methoden)

### 3.1 由 `Aktivität` 推 `Zerfallsgesetz` 四步法

1. **写定义式**：$A=-\dfrac{\mathrm dN}{\mathrm dt}$ 与 $A=\lambda N$ —— *KLP 工具：`Aktivität` / `Zerfallskonstante`* [据推断]
2. **合并得 DGL**：$\dfrac{\mathrm dN}{\mathrm dt}=-\lambda N$（**微元法**：$\Delta t$ 内 $N$ 近似常量）—— *KLP 工具：CN-Methode 7 微元法 + `Mathematisieren und Vorhersagen`*
3. **写解并检验**：$N(t)=N_0e^{-\lambda t}$，代回 DGL 验证 —— *KLP 工具：`herleiten`* [已验证]
4. **导出半衰期**：$N(T_{1/2})=N_0/2\Rightarrow T_{1/2}=\dfrac{\ln 2}{\lambda}$ —— *KLP 工具：`berechnen`*

> **判据 / 决策点**：题目给「活度比」→ 用 $A/A_0=N/N_0$；给「核数比」→ 直接代；求年代 → $t=\dfrac{T_{1/2}}{\ln 2}\ln\dfrac{N_0}{N}$。

### 3.2 势箱能级计算三步法

1. **驻波条件**：$n\dfrac{\lambda}{2}=L$ —— *KLP 工具：`eindimensionaler Potentialtopf` + 驻波（LK-2）*
2. **换动量与能量**：$p=h/\lambda$、$E=p^2/(2m)$ —— *KLP 工具：`De-Broglie`（GK-2 前置）*
3. **写通式并代入**：$E_n=\dfrac{n^2h^2}{8mL^2}$，**末尾加一句模型局限** —— *KLP 工具：`bewerten`（模型适用性属 Sachkompetenz）* [已验证]

### 3.3 结合能与链式反应定量三问

1. **算质量亏损**：$\Delta m=Zm_p+Nm_n-m_{\text{Kern}}$ —— *KLP 工具：`Massendefekt`*
2. **换能量**：$E_B=\Delta m\,c^2$（注意单位：$1\,\text{u}=931{,}5\,\text{MeV}/c^2$）—— *KLP 工具：`berechnen` + `E=Δmc²`*
3. **判放能方向**：比较**比结合能**前后大小 —— *KLP 工具：`Erhaltung und Gleichgewicht`（守恒的广义化）* [已验证]

> ⚠️ **实验设计题写法（`planen`，归 `Erkenntnisgewinnung`）**：目标 → 变量控制 → 测量方案（探测器选择 + 理由）→ 数据处理（半对数图）→ 预期结果 → 误差来源。**只描述仪器不作选择 = 不得分** [已验证]。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode 7（续用）：微元法与极限思想 —— 由活度推导衰变律

- **技法内容**：把「衰变」切成极小时间段 $\Delta t$，段内把 $N$ 当常量 → 减少量 $\Delta N=-\lambda N\Delta t$；求和/取极限得 $\dfrac{\mathrm dN}{\mathrm dt}=-\lambda N$，解为指数律。
- **DE-Anschluss**：**LK-4 明文要求「由 `Aktivität` 的定义推导衰变定律（含半衰期项）」**（微分关系是本技法的天然落点）[已验证] · Basiskonzept `Mathematisieren und Vorhersagen` · EF 的 `Gesetz` 表征形式。**零新增知识**。
- **合规性**：✅ —— 只取「先微元、再求和」的框架，**不引入定积分运算**（德国 EF/Q 无此要求）[已验证]。
- **Abitur 应用**：LK-4 的 `Zerfallsgesetz` 推导、C-14 定年、短寿命半衰期实验的数据处理。**AFB II/III** [据推断]。
- **来源**：`[CN-课标]` 必修1.1.3「极限方法」+ 选必3.3.3 半衰期 · `[CN-教材]` 微元法体系 · **原创改写**。

### ⚠️ CN 侧的真实落差（本条须诚实标注）

- **中国只要求「应用」衰变律，不要求「推导」** [据推断] → 本笔记的推导步骤**必须从德国侧原文学习**。
- **`eindimensionaler Potentialtopf` + `Pauli` 推广、C-14 定年、探测器选择、短寿命半衰期实验设计 —— 中国高中均无对应** [据推断]。
- **⛔ 不得把中国「原子核」的计算套路（核反应方程配平 + 质能方程）直接搬为答案模板**：德国**必须用 `Nuklidkarte`** 追踪放射系 [已验证]，且结合能要求**定量**。**桥接素材，非考纲内容。**

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含演示实验）/ **Aufgabenart II `Fachpraktische Aufgabe`** [已验证] |
| Operator | `darstellen` / `herleiten` / `begründen` / `berechnen` / `planen` / `bewerten` |
| AFB | I（复述模型/公式/核素图读值）→ **II（推衰变律、算结合能、C-14 定年）** → III（模型局限、探测器选择理由、核能/废物评价） |
| 建议分值 / 时长 | 单题约 25–35 BE；Q LK Klausur 135–180 / 225 min [已验证] |

> ⚠️ **材料挂靠说明（物理硬约束）**：本节知识点在材料题中**以「α 散射实验示意图」「衰变曲线（$N$–$t$ 或 $A$–$t$）」「核素图片段」「比结合能曲线」「裂变产物质量分布图」的形态出现**；在实验题中**以「用 GM 计数管测短寿命核素衰变曲线 → 求半衰期」的形态出现**。**任何答案必须挂靠题给材料，禁止纯论述** [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> In einem Materialband werden vier Atommodelle (Dalton, Thomson, Rutherford, Kern-Hülle-Modell) mit den zugehörigen Schlüsselexperimenten gegenübergestellt.
> a) Stellen Sie die Entwicklung der Atommodelle bis zum ersten Kern-Hülle-Modell dar.
> b) Begründen Sie, welches Experiment das Thomson'sche Modell widerlegt.
> c) Erläutern Sie, warum die Linienspektren ein Kern-Hülle-Modell mit diskreten Energieniveaus nahelegen.

**Aufgabe 2** `[原创]`
> Ein Elektron wird in einem eindimensionalen Potentialtopf der Breite $L=0{,}20\,\text{nm}$ betrachtet.
> a) Leiten Sie den Ausdruck $E_n=\dfrac{n^2h^2}{8mL^2}$ her.
> b) Berechnen Sie $E_1$ und $E_2$.
> c) Bewerten Sie die Eignung des Modells zur Beschreibung eines Heliumatoms.

**Aufgabe 3** `[NRW-改编]`
> Die Aktivität einer Probe folgt dem Zusammenhang $A=\lambda N$; die Definition der Aktivität lautet $A=-\dfrac{\mathrm dN}{\mathrm dt}$.
> a) Leiten Sie daraus das Zerfallsgesetz $N(t)=N_0e^{-\lambda t}$ und die Beziehung $T_{1/2}=\dfrac{\ln 2}{\lambda}$ her.
> b) In einem Holzfund wird nur noch $25\%$ der ursprünglichen C-14-Aktivität gemessen ($T_{1/2}=5730\,\text{a}$). Berechnen Sie das Alter.
> c) Beurteilen Sie die Zuverlässigkeit der Methode für Proben mit einem Alter von $2\cdot10^5$ Jahren.

**Aufgabe 4** `[原创]`
> Bei der Spaltung von U-235 werden pro Ereignis etwa $200\,\text{MeV}$ frei; dabei entstehen im Mittel $2{,}5$ Neutronen.
> a) Erklären Sie mit der spezifischen Bindungsenergie, warum sowohl Spaltung als auch Fusion Energie liefern.
> b) Erläutern Sie die Entstehung einer Kettenreaktion und die Bedeutung des Begriffs „kritische Masse".
> c) Bewerten Sie die Endlagerung hochradioaktiver Abfälle unter Abwägung mindestens dreier Perspektiven.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) 呈示**：Dalton（不可分球）→ Thomson（正电荷均匀 + 电子嵌入，阴极射线测出电子）→ Rutherford（核式，α 金箔散射）→ 核-壳模型（离散能级 + 壳层）✓ **得分点：四模型 + 各自关键实验**（AFB II）
2. **b) 论证**：**Rutherford 的 α 散射**——若正电荷均匀分布，α 粒子**不应**出现大角度（甚至反弹）散射；观察到的**大角度散射**要求正电荷与质量集中于极小核 ✓ **得分点：实验 + 大角度散射 + 归因**（AFB II）
3. **c) 阐释**：线状谱表明能量只能取**离散值** → 电子只能处于**离散能级**的壳层（若连续可取则应是连续谱）✓ **得分点：离散谱 ↔ 离散能级**（AFB II）

**Aufgabe 2** `[原创]`
1. **a) 推导**：驻波 $n\dfrac{\lambda}{2}=L\Rightarrow\lambda=\dfrac{2L}{n}$；$p=\dfrac{h}{\lambda}=\dfrac{nh}{2L}$；$E=\dfrac{p^2}{2m}=\dfrac{n^2h^2}{8mL^2}$ ✓ **得分点：驻波条件 + De-Broglie + 动能式**（AFB II）
2. **b) 计算**：$E_1=\dfrac{h^2}{8mL^2}=\dfrac{(6{,}63\cdot10^{-34})^2}{8\cdot9{,}11\cdot10^{-31}\cdot(2{,}0\cdot10^{-10})^2}\approx1{,}5\cdot10^{-18}\,\text{J}\approx9{,}4\,\text{eV}$；
   $E_2=4E_1\approx6{,}0\cdot10^{-18}\,\text{J}\approx38\,\text{eV}$ ✓ **得分点：$E_1$ + $n^2$ 关系 + 单位**
3. **c) Bewertung（模型局限 → 属 Sachkompetenz，须落到判据）**：该模型**忽略电子间库仑排斥**、假设**无限高势墙与一维**，故**不能**定量描述 He 的两电子体系（须经 `Pauli` 推广并考虑相互作用）；**只能给出能级的量级**。须明确说出**适用边界**，而非泛泛说「有误差」 ✓ **得分点：至少两条局限 + 结论**（AFB II/III）

**Aufgabe 3** `[NRW-改编]`
1. **a) 推导**：$A=-\dfrac{\mathrm dN}{\mathrm dt}$ 与 $A=\lambda N$ → $\dfrac{\mathrm dN}{\mathrm dt}=-\lambda N$；解得 $N(t)=N_0e^{-\lambda t}$；令 $N=N_0/2$ → $T_{1/2}=\dfrac{\ln 2}{\lambda}$ ✓ **得分点：合并两式 + 指数解 + 半衰期**（AFB II）
2. **b) 计算**：$A/A_0=0{,}25=\left(\tfrac12\right)^2$ → $t=2\,T_{1/2}=2\cdot5730\,\text{a}=11\,460\,\text{a}$ ✓ **得分点：活度比 = 核数比 + 用 $T_{1/2}$ 计数**
3. **c) Beurteilung**：$2\cdot10^5\,\text{a}\approx35$ 个半衰期 → 剩余比例 $\approx2^{-35}\approx3\cdot10^{-11}$，**活度远低于可测下限**；故该法**不适用**（须改用长半衰期核素，如 U 系/ K-Ar 法）✓ **得分点：量化剩余比例 + 明确判据 + 替代方法**（AFB III）

**Aufgabe 4** `[原创]`
1. **a) 解释**：比结合能曲线在 **Fe-56 附近最大**；重核（U）比结合能**较小** → 裂变到中等核时**比结合能增大** → 放能；轻核（H）更小 → 聚变到中等核同样增大 → 放能 ✓ **得分点：曲线峰值 + 两个方向 + 放能判据**（AFB II）
2. **b) 阐释**：每次裂变放出 $2{,}5$ 个中子 → 若平均**恰好 1 个**继续引发裂变（$k=1$）则**自持**，即**临界**；$k<1$ 熄灭、$k>1$ 超临界；控制棒吸中子调 $k$ ✓ **得分点：中子链 + $k=1$ 临界 + 自持 ≠ 停止**（AFB II）
3. **c) Bewertung（须超出学科内部）**：至少三视角并**互相权衡** —— **技术/安全**（地质长期稳定性、临界事故风险）、**经济**（处置成本 vs 核电成本）、**生态**（地下水污染风险）、**社会/政治**（选址的公平性、代际责任 `lokal und global`）。须给出**有理由的立场**并说明权衡依据。⚠️ **只谈「半衰期很长所以危险」这类纯事实陈述不得分** [已验证] ✓ **得分点：≥3 视角 + 权衡 + 明确立场**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把比结合能最大处说成「最不稳定」；把「临界」说成「停止」；α 与 β 衰变在核素图上的移动方向搞混 | 记「铁峰最稳定」；「临界 = 自持」；α：$Z\!-\!2,A\!-\!4$；β⁻：$Z\!+\!1,A$ 不变 |
| **知识错** | $T_{1/2}=\ln2/\lambda$ 与 $\lambda=\ln2\cdot T_{1/2}$ 写反；势箱题忘 $n^2$ 关系；结合能计算忘 $c^2$ 或单位换算（u → MeV） | 推导一次自己写出半衰期式；势箱先写 $E_n$ 通式再代；用 $1\,\text{u}=931{,}5\,\text{MeV}/c^2$ |
| **表达错** | 探测器题只描述仪器**不作选择**；模型题不写局限；评价题只谈技术/事实层面（**违反 Bewerten 边界规则**）；概念题不引材料（**违反禁止纯论述**） | 探测器题写「选择 + 理由」两段式；模型题末尾加局限句；评价题至少三视角 + 价值/规范/利益 |

---

## 7. Vernetzung

- **上游**：`LK-3-Moderne-Quantenphysik.md`（`Röntgenstrahlung`、光子、概率解释）· `GK-4-Strahlung-und-Materie.md`（GK 侧的 `Franck-Hertz`、`Nuklidkarte` 基础）· `LK-Differentialgleichungen-Vorbereitung.md`（微元法与 DGL）
- **下游**：Abitur 压轴 Bewertung（核能与废物处置）；口试的跨领域素材（原子模型史 + 科学哲学）
- **横向**：`Basiskonzepte-Vier-Achsen.md`（`E+G` / `M+V` / `Z+D`，**本条无 S+K**）· `Bewertungsgrenzen-Regelkarte.md`（Bewerten 边界规则）· `Erkenntnisgewinnung-Experimentdesign.md`（探测器选择与实验设计写法）· `GK-LK-Fahrplan-Vergleich.md`（GK 只要求**应用**衰变律）
- **术语卡**（建议入 csv）：`Massendefekt` / `Bindungsenergie` / `Aktivität` / `Zerfallskonstante` / `Zerfallsgesetz` / `Halbwertszeit` / `Zerfallsreihe` / `Nuklidkarte` / `Potentialtopf` / `Pauli-Prinzip` / `Kettenreaktion` / `kritische Masse`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题、不搬教材正文。
