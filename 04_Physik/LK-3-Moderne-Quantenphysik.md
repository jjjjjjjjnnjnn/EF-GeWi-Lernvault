---
fach: Physik
thema: "Moderne Quantenphysik (LK): Bremsstrahlung, Bragg, Wellenfunktion, Delayed Choice, Heisenberg"
operatoren: [herleiten, erklären, beschreiben, deuten, interpretieren, berechnen, begründen, diskutieren, bewerten, ermitteln]
klausurrelevant: true
datum: 2026-09-25
tags: [Q2, Physik, Quantenphysik]
stufe: "Q1|Q2"
kursart: "LK"
---

# Moderne Quantenphysik (当代量子物理 · LK 路线) `[LK]`

> **中文理解**：这是 **LK-3 `Quantenphysik`**，也是**中德差距最大的一块** [已验证]。GK 的 `Quantenobjekte` 只到「光电效应 + De-Broglie + 电子双缝 + Welcher-Weg」；**LK 在此之上再叠五项**：① `Bremsstrahlung`（须解释**短波极限**的出现）+ `Röntgenröhre` 结构与工作方式；② **`Bragg-Reflexion`（须自行推导 $2d\sin\theta=n\lambda$）** + `Elektronenbeugung`；③ **由光电效应实验数据确定 $h$**；④ **波函数平方 = 电子探测概率密度**；⑤ **`Delayed-Choice-Experiment` + `Koinzidenzmethode`**，须用 `Komplementarität` 解释干涉花样的出现与消失；⑥ **`Heisenberg'sche Unbestimmtheitsrelation`，且限定用「不可能性表述」版本** [已验证]。
> ⚠️ **Basiskonzept 落点与 GK 不同**：LK-3 命中 `Superposition und Komponenten` · `Mathematisieren und Vorhersagen`（**波函数平方作为存在概率的数学表达是量子物理数学化的范例**）· `Zufall und Determiniertheit`；**无 `Erhaltung und Gleichgewicht` 条目**（GK 的 `Quantenobjekte` 反而有 E+G）[已验证]。
> ⚠️ **中国侧落差**：中国止于「波粒二象性」的了解层；**不确定原理在中国属选修3、不在高考范围** [据推断]。Bragg 推导、由实验数据定 $h$、Delayed-Choice 三项中国高中**完全不做**。
>
> **Klausur-Relevanz**：§4 缺口 #18（★★）[已验证]。`herleiten`（推导）密度显著高于 GK，是 **AFB II–III 的高发区**。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Bremsstrahlung` | 轫致辐射 | bremsstrahlung | 电子在靶中减速产生的连续 X 谱 | LK 独立重点 [已验证] |
| `kurzwellige Grenze` $\lambda_{\min}$ | 短波极限 | short-wavelength limit | $eU=\dfrac{hc}{\lambda_{\min}}$ | 全部动能给一个光子 [已验证] |
| `charakteristische Röntgenstrahlung` | 特征 X 射线 | characteristic X-rays | 内层电子跃迁产生的离散谱线 | 与轫致辐射**须区分** [已验证] |
| `Bragg'sche Reflexionsbedingung` | 布拉格反射条件 | Bragg condition | $2d\sin\theta=n\lambda$ | **须推导** [已验证] |
| `Elektronenbeugung` | 电子衍射 | electron diffraction | 电子被晶体衍射成圆环 | 由环半径反推 $\lambda$ [已验证] |
| `Wellenfunktion` $\psi$ | 波函数 | wave function | $\lvert\psi\rvert^2$ = 探测概率密度 | 定性解释即可 [已验证] |
| `Wahrscheinlichkeitsdichte` | 概率密度 | probability density | 单位体积内探测到电子的概率 | 不等于「概率」 [据推断] |
| `Delayed-Choice-Experiment` | 延迟选择实验 | delayed-choice experiment | 通过缝**之后**才决定是否测路径 | LK 独立重点 [已验证] |
| `Koinzidenzmethode` | 符合法 | coincidence method | 两探测器**同时**计数才记一个事件 | 判定「哪条路径」的工具 [据推断] |
| `Komplementarität` | 互补性 | complementarity | 波性/粒性不能同时显现 | 解释花样消失 [已验证] |
| `Heisenberg'sche Unbestimmtheitsrelation` | 海森伯不确定关系 | Heisenberg uncertainty relation | $\Delta x\cdot\Delta p\ge\dfrac{\hbar}{2}$ | **只要求定性/不可能性表述** [已验证] |
| `Kopenhagener Deutung` | 哥本哈根诠释 | Copenhagen interpretation | 量子态用概率陈述描述 | 实在性论争 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 轫致辐射：短波极限是「一次性兑换」的证明

中文理解：X 射线管里电子经 $U$ 加速后打到靶上，**大部分电子分多次小步减速**（产生**连续谱**），少数电子**一次把全部动能 $eU$ 交给一个光子**——这些光子能量最大、波长最短，构成**短波极限** $\lambda_{\min}$ [据推断]。**加速电压越高，极限波长越短**，而**与靶材料无关**（材料只影响特征谱）。

> *Klausur-Satz*: „Wird die gesamte kinetische Energie $eU$ eines Elektrons in einem einzigen Bremsstrahlungsprozess in ein Photon umgewandelt, so erhält man die maximale Photonenenergie und damit die kurzwellige Grenze: $eU=hf_{\max}=\dfrac{hc}{\lambda_{\min}}$, also $\lambda_{\min}=\dfrac{hc}{eU}$." [原创]

⚠️ **易错**：把短波极限说成「最小能量」——它是**最大**光子能量 / **最小**波长 [据推断]。

### 2.2 X 射线管（`Röntgenröhre`）的结构与工作方式

中文理解：**阴极（`Glühkathode`）** 通电加热 → 热发射电子 → **阳极高压 $U$ 加速** → 电子打在**金属靶**上 → 同时产生**连续轫致谱 + 特征谱**；管子抽真空，阳极需**水冷**（大部分能量变成热） [据推断]。KLP 要求**描述结构与工作方式** [已验证]。

### 2.3 Bragg 反射条件的推导（**LK 高频推导题**）

中文理解：X 射线斜射到晶体上，**相邻两层晶面**各反射一束。设晶面间距 $d$、**掠射角** $\theta$（射线与**晶面**的夹角），则第二束比第一束多走的**光程差**为 $2d\sin\theta$；相长干涉要求光程差等于波长的整数倍 → **$2d\sin\theta=n\lambda$** [已验证]。

> *Klausur-Satz*: „Treffen Röntgenstrahlen unter dem Glanzwinkel $\theta$ auf parallele Netzebenen im Abstand $d$, so beträgt der Gangunterschied benachbarter Teilstrahlen $2d\sin\theta$. Konstruktive Interferenz tritt auf, wenn $2d\sin\theta=n\lambda$ mit $n\in\mathbb N$ gilt (Bragg-Bedingung)." [原创]

⚠️ **约定必须写明**：$\theta$ 取「与晶面的夹角（掠射角）」。若题目用「与晶面**法线**的夹角」，公式改成 $2d\cos\alpha=n\lambda$——**答案里先声明自己用哪个约定** [据推断]。

### 2.4 电子衍射：De-Broglie 的独立验证

中文理解：电子束经 $U$ 加速（$\lambda=h/\sqrt{2meU}$）射到**多晶/石墨薄膜**上，出射方向满足 Bragg 条件的方向形成**圆锥**，屏上得**同心圆环**；由环半径与几何关系反推 $\lambda$，与 De-Broglie 值吻合 → 电子确有波动性 [据推断]。**衍射是波动性最直接的证据**（干涉也可以，但衍射用晶体作「天然光栅」）。

### 2.5 波函数平方 = 探测概率密度

中文理解：量子客体不用「轨迹」描述，而用**波函数 $\psi$** 描述；**$\lvert\psi\rvert^2$ 在某点的值 = 在该点探测到电子的概率密度**——电子**不是被抹散**，而是**没有确定的轨迹**，只有探测概率的空间分布 [已验证]。这是 Basiskonzept `Mathematisieren und Vorhersagen` 的范例 [已验证]。

> *Klausur-Satz*: „Das Betragsquadrat der Wellenfunktion $\lvert\psi(\vec r)\rvert^2$ gibt die Wahrscheinlichkeitsdichte dafür an, das Elektron am Ort $\vec r$ nachzuweisen. Die Wellenfunktion beschreibt daher keine verschmierte Materie, sondern eine Wahrscheinlichkeitsverteilung möglicher Messergebnisse." [原创]

### 2.6 Delayed-Choice + 符合法 + 互补性

中文理解：**延迟选择实验**把「是否测定路径」的决定**推迟到电子已经通过缝之后**才作出 [已验证]。结果：**测路径 → 干涉消失（粒子性）；不测 → 干涉出现（波性）**。这不是「电子知道后改变过去」，而是**整个实验安排决定了现象以哪种面貌呈现**——即 `Komplementarität` [已验证]。`Koinzidenzmethode` 是判定「哪条路径」的技术手段。

> *Klausur-Satz*: „Beim Delayed-Choice-Experiment wird erst nach dem Durchtritt des Quantenobjekts entschieden, ob der Weg bestimmt wird. Wird der Weg mit der Koinzidenzmethode nachgewiesen, verschwindet die Interferenz; wird er nicht bestimmt, tritt sie auf. Der Ausgang hängt also von der gesamten Versuchsanordnung ab – ein Ausdruck der Komplementarität, nicht eine Rückwirkung auf die Vergangenheit." [原创]

⚠️ **易错**：说成「粒子知道被观测后改变过去」——**错**；应说「实验安排决定现象呈现方式」 [据推断]。

### 2.7 Heisenberg：**不可能性表述**（KLP 限定）

中文理解：KLP 明确限定用 **`Unmöglichkeits-Formulierung`**：**「不可能」同时以任意精度确定位置与动量**，$\Delta x\cdot\Delta p\ge\dfrac{\hbar}{2}$ [已验证]。**这是原理性限制，不是仪器精度不够**。

> *Klausur-Satz*: „Es ist grundsätzlich unmöglich, Ort und Impuls eines Quantenobjekts gleichzeitig mit beliebiger Genauigkeit zu bestimmen; für die Unschärfen gilt $\Delta x\cdot\Delta p\ge\dfrac{\hbar}{2}$. Diese Grenze ist prinzipieller Natur und nicht auf unvollkommene Messgeräte zurückzuführen." [原创]

⚠️ **易错**：写成「仪器误差导致的测量不准」；或**去做定量计算**（KLP 只要定性/不可能性表述） [据推断]。

---

## 3. 解题方法 (Methoden)

### 3.1 轫致辐射短波极限两步法

1. **能量守恒一步**：$eU=hf_{\max}$ —— *KLP 工具：`Erhaltung und Gleichgewicht` 的思想（虽 LK-3 无 E+G 条目）+ `Energiequantelung`（GK-2 前置）*
2. **换波长并求值**：$\lambda_{\min}=\dfrac{hc}{eU}$，或用便捷组合 $\lambda_{\min}/\text{nm}\approx\dfrac{1240}{U/\text{V}}$ —— *KLP 工具：`herleiten` + `berechnen`*

> **判据 / 决策点**：给 $U$ → 求 $\lambda_{\min}$；给 $\lambda_{\min}$ → 反求所需 $U$；问「为什么与靶材料无关」→ 答「只依赖 $eU$，材料只决定特征谱」。

### 3.2 Bragg 推导四步法

1. **画几何图**：两层晶面 + 入射线 + 反射线，标 $d$ 与 $\theta$ —— *KLP 工具：`skizzieren`*
2. **求光程差**：由垂线作图得 $\Delta s=2d\sin\theta$ —— *KLP 工具：`herleiten` + 三角函数（`03_Mathe`）*
3. **写相长条件**：$\Delta s=n\lambda$ → $2d\sin\theta=n\lambda$ —— *KLP 工具：`Interferenz` 相长条件（LK-2）* [已验证]
4. **解目标量**：求 $d$ 或 $\theta$，并**声明角度约定** —— *KLP 工具：`berechnen`*

> **判据 / 决策点**：题目给「晶面间距」用掠射角形式；给「法线夹角」改用 $\cos$ 形式。**先声明约定再代公式。**

### 3.3 由光电效应数据求 $h$（LK 独有）

1. **作 $U_g$–$f$ 图**（遏止电压对频率）—— *KLP 工具：`Diagramm` 表征形式（EF-1）+ CN-Methode 5 图像三件套* [据推断]
2. **读斜率**：$eU_g=hf-W\Rightarrow U_g=\dfrac{h}{e}f-\dfrac{W}{e}$ → **斜率 $=\dfrac{h}{e}$**，**纵截距 $=-\dfrac{W}{e}$** —— *KLP 工具：`ermitteln` / `auswerten`*
3. **由斜率求 $h=(\text{斜率})\cdot e$**，并与文献值比较 —— *KLP 工具：`begründen`*

### 3.4 量子概念题的三段式写法（拿 AFB III）

1. **现象**：引用题给实验/数据（**物理禁止纯论述**）—— *KLP 工具：`beschreiben`*
2. **机制**：归因到 `Komplementarität` / $\lvert\psi\rvert^2$ / 不确定关系 —— *KLP 工具：`erklären` / `deuten`*
3. **边界**：说明「哪一表述在此实验中**不可能**同时成立」—— *KLP 工具：`diskutieren` + Basiskonzept `Z+D`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode 5（续用）：图像三件套 —— 由数据定 $h$

- **技法内容**：拿到 $U_g$–$f$ 图，固定问三句：**斜率是什么？截距是什么？** 由量纲与定义式反推 → 斜率 $=\dfrac{h}{e}$、纵截距 $=-\dfrac{W}{e}$、横截距 $=f_G$。
- **DE-Anschluss**：`Messwerttabelle / Diagramm / Gesetz` 三表征形式（**EF-1 明文要求**）· `Photoeffekt`（GK-2）· `Energiequantelung`（GK-2）· Basiskonzept `Mathematisieren und Vorhersagen`。**零新增知识**。
- **合规性**：✅ —— 图像法是 EF 的核心训练项；本技法只是把它归纳成可复用清单。
- **Abitur 应用**：**LK-3 的「由实验数据确定 $h$」**（明文考点，直接命中）；一切材料题的数据表/图。**AFB I/II** [据推断]。
- **来源**：`[CN-课标]` 必修1.1.3「公式法、图像法」+ 选必3.4 光电效应 · `[CN-教材]` 图像法体系 · **原创改写**。

### ⚠️ CN 侧的真实落差（本条须诚实标注）

- **`Bragg` 推导、`Delayed-Choice`、`Koinzidenzmethode`、$\lvert\psi\rvert^2$、`Heisenberg` —— 中国侧均无对应训练** [据推断]。中国不确定原理在**选修3、不在高考范围**；本笔记对应内容**必须从德国侧原文学习**，不能靠中国迁移。
- **⛔ 中国「原子核」里的质能方程计算**不可直接搬入本节（属 LK-4 议题，且德国要求结合能定量与推导）。**桥接素材，非考纲内容。**

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含演示实验）/ **Aufgabenart II `Fachpraktische Aufgabe`** [已验证] |
| Operator | `herleiten` / `erklären` / `deuten` / `berechnen` / `ermitteln` / `diskutieren` |
| AFB | I（复述装置/公式）→ **II（推 $\lambda_{\min}$、推 Bragg、由数据求 $h$）** → III（互补性/不确定关系的概念论证） |
| 建议分值 / 时长 | 单题约 20–30 BE；Q LK Klausur 135–180 / 225 min [已验证] |

> ⚠️ **材料挂靠说明（物理硬约束）**：本节知识点在材料题中**以「X 射线谱图（连续谱 + 特征峰）」「晶体衍射角-强度表」「$U_g$–$f$ 测量数据表」「延迟选择实验的两种光路示意图」的形态出现**；在实验题中**以「用电子衍射管观察圆环并反推 $\lambda$」的形态出现**。**任何答案必须挂靠题给材料，禁止纯论述** [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> In einer Röntgenröhre werden Elektronen mit $U=40\,\text{kV}$ beschleunigt und auf eine Molybdän-Anode geschlagen. Das aufgenommene Spektrum zeigt ein Kontinuum mit einer scharfen Grenze sowie zwei diskrete Linien.
> a) Beschreiben Sie den Aufbau und die Funktionsweise der Röntgenröhre.
> b) Leiten Sie einen Ausdruck für die kurzwellige Grenze $\lambda_{\min}$ her und berechnen Sie ihren Wert.
> c) Begründen Sie, warum $\lambda_{\min}$ unabhängig vom Anodenmaterial ist, die diskreten Linien aber nicht.

**Aufgabe 2** `[NRW-改编]`
> Röntgenstrahlen der Wellenlänge $\lambda=0{,}154\,\text{nm}$ treffen unter veränderlichem Glanzwinkel auf einen NaCl-Kristall ($d=0{,}282\,\text{nm}$).
> a) Leiten Sie die Bragg'sche Reflexionsbedingung her.
> b) Berechnen Sie den kleinsten Glanzwinkel $\theta_1$ für konstruktive Interferenz.
> c) Erläutern Sie, warum sich mit diesem Verfahren auch die de-Broglie-Wellenlänge von Elektronen bestimmen lässt.

**Aufgabe 3** `[原创]`
> Ein Doppelspaltexperiment mit einzelnen Photonen wird in zwei Varianten betrieben. In Variante A wird erst **nach** dem Passieren des Doppelspalts entschieden, ob hinter den Spalten Detektoren (Koinzidenzmethode) zugeschaltet werden. Variante B verzichtet auf jede Weginformation.
> a) Beschreiben Sie die jeweils beobachtete Intensitätsverteilung auf dem Schirm.
> b) Erklären Sie die Ergebnisse mit dem Begriff der Komplementarität.
> c) Beurteilen Sie die Aussage: „Das Photon weiß nachträglich, ob es beobachtet wurde, und ändert seine Vergangenheit."

**Aufgabe 4** `[原创]`
> Ein Elektron ist in einem Bereich der Breite $\Delta x\approx1{,}0\cdot10^{-10}\,\text{m}$ lokalisiert.
> a) Erläutern Sie mit der Heisenberg'schen Unbestimmtheitsrelation, warum sein Impuls nicht exakt angegeben werden kann.
> b) Begründen Sie, dass dies keine Folge unvollkommener Messgeräte ist.
> c) Deuten Sie den Begriff „Wellenfunktion" im Sinne der Wahrscheinlichkeitsinterpretation.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) 描述**：抽真空管；`Glühkathode` 热发射电子；阳极高压 $U$ 加速；电子轰击金属靶 → **连续轫致谱 + 特征谱**；阳极水冷 ✓ **得分点：阴极/加速/靶/两种谱**（AFB I/II）
2. **b) 推导与计算**：全部动能给一个光子 → $eU=hf_{\max}=\dfrac{hc}{\lambda_{\min}}$ → $\lambda_{\min}=\dfrac{hc}{eU}$；
   $\lambda_{\min}=\dfrac{1240\,\text{eV·nm}}{40\,000\,\text{eV}}\approx0{,}031\,\text{nm}$ ✓ **得分点：能量守恒式 + 单位换算 + 数值**（AFB II）
3. **c) 论证**：$\lambda_{\min}$ 只由 $eU$ 决定（电子动能），**与靶材料无关**；特征谱来自靶原子**内层能级跃迁**，其能级间距是**元素特征**，故随材料变化 ✓ **得分点：极限只依赖 $U$ + 特征谱来自内层能级**（AFB II/III）

**Aufgabe 2** `[NRW-改编]`
1. **a) 推导**：相邻晶面反射光程差 $\Delta s=2d\sin\theta$；相长要求 $\Delta s=n\lambda$ → $2d\sin\theta=n\lambda$ ✓ **得分点：光程差 + 相长条件 + 几何图**（AFB II）
2. **b) 计算**：$n=1$：$\sin\theta_1=\dfrac{\lambda}{2d}=\dfrac{0{,}154}{2\cdot0{,}282}\approx0{,}273$ → $\theta_1\approx15{,}9°$ ✓ **得分点：$n=1$ 取最小角 + 反三角**
3. **c) 阐释**：电子束加速后 $\lambda=h/\sqrt{2meU}$，落在同一量级（~0.1 nm），可被晶体作「天然光栅」衍射；由衍射环几何反推 $\lambda$ 即验证 De-Broglie ✓ **得分点：波长量级匹配 + 同一 Bragg 条件**（AFB II）

**Aufgabe 3** `[原创]`
1. **a) 描述**：Variante A（测路径）→ **干涉花样消失**，屏上为两缝各自的**单峰**分布；Variante B（不测路径）→ 出现**干涉花样**（明暗条纹）✓ **得分点：两种分布 + 延迟决定的位置**（AFB II）
2. **b) 解释**：一旦路径信息**原则上可获得**（Koinzidenz 计数），粒子性显现，波性**不可能同时**显现 → 干涉消失；不测路径则波性显现 → 干涉出现。**实验安排决定现象呈现方式** ✓ **得分点：互补性 + 不可同时**（AFB III）
3. **c) Beurteilung**：**该说法错误**。延迟选择**不改变过去**；正确表述是「**整个实验装置决定了哪一互补方面被显现**」，即量子客体**没有**独立于测量安排的「确定轨迹」。须指出该表述把「现象对装置的依赖」误读为「对过去的反作用」 ✓ **得分点：判定错误 + 正确机制 + 指出误读根源**（AFB III）

**Aufgabe 4** `[原创]`
1. **a) 阐释**：$\Delta x\cdot\Delta p\ge\dfrac{\hbar}{2}$；$\Delta x$ 小 → $\Delta p$ 必然大 → 动量**不可能**精确给定 ✓ **得分点：关系式 + 反比关系**（AFB II）
2. **b) 论证**：这是**原理性**限制（波函数本身的性质），**与仪器精度无关**；即使理想仪器也不能同时把两者压到任意小 ✓ **得分点：原理性 vs 仪器误差**（AFB II/III）
3. **c) 解读**：$\lvert\psi\rvert^2$ 为**探测概率密度**；电子**未被抹散**，只是**无确定轨迹**，只有概率分布 ✓ **得分点：概率密度 ≠ 物质弥散**（AFB II）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把短波极限说成「最小能量」；把 $\lvert\psi\rvert^2$ 说成「电子被抹散」；把延迟选择说成「改变过去」 | 记：短波极限 = **最大**能量/最小波长；$\lvert\psi\rvert^2$ = **概率密度**；延迟选择 = **实验安排决定现象** |
| **知识错** | Bragg 公式写成 $2d\cos\theta$ 却不声明约定；用 $2d\sin\theta=\lambda$ 忘了 $n$ 的一般性；把不确定关系当成「仪器误差」 | 先声明角度约定；写 $n\in\mathbb N$；强调**原理性限制** |
| **表达错** | 概念题不引用题给实验/数据（**违反物理禁止纯论述的硬约束**）；Bragg 推导不画几何图直接给结论；单位不换算（keV/eV） | 三段式：现象（引材料）→ 机制 → 边界；推导必配图；统一 SI 或 eV·nm 便捷式 |

---

## 7. Vernetzung

- **上游**：`GK-2-Quantenobjekte.md`（光电效应、De-Broglie、Welcher-Weg，**LK-3 的直接前置**）· `LK-Differentialgleichungen-Vorbereitung.md`（数学化思维）
- **下游**：LK-4 `Atom- und Kernphysik`（`Röntgenstrahlung`、能级、势箱）· 口试的跨领域素材（互补性、实在性论争）
- **横向**：`Basiskonzepte-Vier-Achsen.md`（`S+K` / `M+V` / `Z+D`，**本条无 E+G**）· `GK-LK-Fahrplan-Vergleich.md`（GK 只到 Welcher-Weg，**无 Bragg/Delayed-Choice/Heisenberg**）· `03_Mathe`（三角函数、指数）
- **术语卡**（建议入 csv）：`Bremsstrahlung` / `kurzwellige Grenze` / `Bragg-Bedingung` / `Elektronenbeugung` / `Wellenfunktion` / `Wahrscheinlichkeitsdichte` / `Delayed-Choice` / `Koinzidenzmethode` / `Komplementarität` / `Unbestimmtheitsrelation`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题、不搬教材正文。
