---
fach: Physik
thema: "Strahlung und Materie (GK)"
operatoren: [angeben, nennen, ordnen, beschreiben, erklären, erläutern, begründen, berechnen, auswerten, interpretieren, vergleichen, bewerten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Physik, Strahlung, Kernphysik]
stufe: "Q2"
kursart: "GK"
---

# Strahlung und Materie (辐射与物质 · GK 路线)

> **中文理解**：这是 **GK-4 `Strahlung und Materie`**——GK 把**辐射 + 原子物理 + 核物理合为一个 IF**（LK 则拆成独立 IF `Atom- und Kernphysik`）[已验证]。知识链：**电磁频谱 → 线状谱与 Franck-Hertz 实验（支持离散能态）→ 能级图 → 核-壳模型 → X 射线（轫致 + 特征）→ 核素图与衰变过程 → 衰变定律（**应用**，不要求推导）→ 裂变/聚变 + 质量亏损 $E=\Delta m c^2$ → 有效剂量**。⚠️ **GK 只要求应用**带半衰期项的衰变律，**不要求由 `Aktivität` 推导**它（LK 才要求推导）[已验证]；`Nuklidkarte`（核素图）是 **KLP 明确要求使用的工具** [已验证]。考试形态：材料题给一张 Franck-Hertz 曲线、一张能级图或一条衰变曲线，要求 `auswerten`（读台阶间距/半衰期）、`interpretieren`（论证离散能态）、`berechnen`（能级跃迁/衰变），末问接 `bewerten`（辐射防护/核能，须落到价值/规范）——**任何答案都必须挂靠材料或实验，物理禁止纯论述题** [已验证]。
>
> **Klausur-Relevanz**：`Franck-Hertz` 是 **GK 核心实验**（中国课标无此点名实验 → **须单独补**）[已验证]；`Nuklidkarte` 是 KLP 点名的工具，且中德工具不同（中国用配平、德国用核素图）→ **须专门练** [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Linienspektrum` | 线状谱 | line spectrum | 气态发光体只发离散谱线 | 支持离散能级 [已验证] |
| `Franck-Hertz-Versuch` | 夫兰克-赫兹实验 | Franck–Hertz experiment | 电流随加速电压呈**台阶状** | 证明离散能态 [已验证] |
| `Energieniveauschema` | 能级图 | energy level diagram | 原子能量取离散值 | $E_n=-13{,}6\,\text{eV}/n^2$（H）[据推断] |
| `Energiequantelung` | 能量量子化 | energy quantization | 能级差 $\Delta E = hf$ | 谱线来源 [据推断] |
| `Kern-Hülle-Modell` | 核-壳模型 | nuclear-shell model | 核 + 电子壳层 | GK 要求 [已验证] |
| `Röntgenstrahlung` | X 射线 | X-rays | 轫致（连续）+ 特征（离散峰） | GK 也要求区分 [已验证] |
| `Nuklidkarte` | 核素图 | chart of nuclides | 以 $Z$、$N$ 为坐标的核素图 | **KLP 点名工具** [已验证] |
| `Zerfallsgesetz` | 衰变定律 | decay law | $N(t)=N_0\left(\tfrac12\right)^{t/T_{1/2}}$ | GK 只要求**应用** [已验证] |
| `Halbwertszeit` $T_{1/2}$ | 半衰期 | half-life | 半数核衰变所需时间 | $\lambda=\ln2/T_{1/2}$ [据推断] |
| `Massendefekt` | 质量亏损 | mass defect | $\Delta m$ → $E=\Delta m c^2$ | 守恒原理广义化 [已验证] |
| `Kernspaltung/-fusion` | 裂变/聚变 | fission/fusion | 大核裂开 / 小核结合 | 均释能 [据推断] |
| `effektive Dosis` | 有效剂量 | effective dose | 衡量辐射生物效应 | GK 要求**量化** [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 Franck-Hertz：离散能态的实验证据

中文理解：电子被加速后与气体原子碰撞，只有当动能达到某**阈值**才能把原子**激发**到离散能级，从而失去能量、无法再克服反向电压 → 电流**周期性下降**。曲线上的**台阶间距**对应原子的**能级差**。**这一台阶结构支持「壳层中能量取离散值」的模型**。

> *Klausur-Satz*: „Der Franck-Hertz-Versuch zeigt einen periodischen Rückgang der Auffängerstromstärke: Elektronen können Energie nur in diskreten Beträgen auf die Atome übertragen. Die Abstände der Minima entsprechen der Anregungsenergie und belegen damit diskrete Energieniveaus der Atomhülle." [原创]

### 2.2 能级图与谱线

中文理解：原子能量取**离散值**；跃迁时发出/吸收能量为**能级差**的光子：$\Delta E = hf = hc/\lambda$。**线状谱**正是离散能级的直接结果。

> *Klausur-Satz*: „Geht ein Atom von einem höheren in ein tieferes Energieniveau über, so wird ein Photon der Energie $\Delta E = hf = hc/\lambda$ emittiert. Da die Energieniveaus diskret sind, entsteht ein Linienspektrum." [原创]

### 2.3 核素图与衰变过程

中文理解：`Nuklidkarte` 以**质子数 $Z$（纵轴）与中子数 $N$（横轴）**为坐标。衰变在图上表现为**方向确定的位移**：
- **α 衰变**：$Z\downarrow 2$，$N\downarrow 2$（向左下对角线）；
- **β⁻ 衰变**：$Z\uparrow 1$，$N\downarrow 1$（向右上对角线），并放出**反中微子**；
- **β⁺ / EC**：$Z\downarrow 1$（向左上对角线）。

> *Klausur-Satz*: „In der Nuklidkarte verschiebt der $\alpha$-Zerfall den Kern um zwei Protonen und zwei Neutronen nach links unten, der $\beta^-$-Zerfall um ein Proton nach rechts oben. Für jede Kernumwandlung gelten Erhaltung der Nukleonenzahl und Erhaltung der Ladungszahl." [原创]

### 2.4 衰变定律（**GK 只要求应用**）

中文理解：衰变是**指数衰减**，$N(t)=N_0(1/2)^{t/T_{1/2}}$。**单个核**何时衰变是**随机**的；**大量核**的时间进程却**严格确定**——这是 `Zufall und Determiniertheit` 的核物理落点。

> *Klausur-Satz*: „Der radioaktive Zerfall folgt dem Zerfallsgesetz $N(t)=N_0\left(\tfrac12\right)^{t/T_{1/2}}$. Der Zerfall eines einzelnen Kerns ist nicht vorhersagbar, die Abnahme einer großen Anzahl von Kernen dagegen ist durch die Halbwertszeit eindeutig bestimmt." [原创]

### 2.5 质量亏损与核能

中文理解：核反应中**质量亏损** $\Delta m$ 以能量形式释放：$E=\Delta m c^2$（$1\,\text{u}\approx 931{,}5\,\text{MeV}/c^2$）。这是 `Erhaltung und Gleichgewicht` 被**广义化**到含质量-能量转换的系统 [已验证]。

> *Klausur-Satz*: „Bei Kernspaltung und Kernfusion ist die Masse der Produkte kleiner als die der Ausgangskerne; der Massendefekt wird nach $E=\Delta m\,c^2$ als Energie frei. Der Energieerhaltungssatz wird damit auf Prozesse mit Umwandlung von Masse in Energie erweitert." [原创]

---

## 3. 解题方法 (Methoden)

### 3.1 Franck-Hertz 与能级图题三步

1. **读台阶间距** $\Delta U$ → 激发能 $E=\Delta U\cdot e$（单位 eV）—— *KLP 工具：`Franck-Hertz-Versuch` + `auswerten`* [已验证]
2. **在能级图上标跃迁**：由 $\Delta E = E_m - E_n$ 求光子能量 —— *KLP 工具：`Energieniveauschema`* [据推断]
3. **求波长**：$\lambda = hc/\Delta E$（便捷式 $\lambda/\text{nm} = 1240/(\Delta E/\text{eV})$）—— *KLP 工具：`berechnen` 官方定义* [据推断]

### 3.2 衰变题三给法

1. **给 $T_{1/2}$ 与 $t$** → 数半衰期个数 $t/T_{1/2}$，用 $N=N_0(1/2)^{n}$ —— 2. **给 $\lambda$** → $N=N_0e^{-\lambda t}$（或 $T_{1/2}=\ln2/\lambda$）—— 3. **给曲线** → 从图读 $T_{1/2}$ 后同上 —— *KLP 工具：`Zerfallsgesetz` + `auswerten`* [据推断]

> **判据 / 决策点**：题给「经过 3 个半衰期」→ 直接 $1/2^3=1/8$，**不要**写「3 个半衰期后全没了」。

### 3.3 核反应配平（**中德工具差**）

1. **列两条守恒**：核子数 $A$ 守恒 + 电荷数 $Z$ 守恒 —— 2. **在核素图上定位**：α 左下、β⁻ 右上 —— 3. **补中微子/反中微子**（β 衰变）—— *KLP 工具：`Nuklidkarte` + 守恒律* [已验证]

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 图像三件套 + 「核反应配平双守恒」对照核素图

- **技法内容**：① **图像三件套**（CN-Methode 5）：Franck-Hertz 图看**横轴台阶间距**（= 激发能）；衰变曲线看**纵轴减半的时间**（= 半衰期）。② **核反应配平双守恒**：中国用「质量数守恒 + 电荷数守恒」配平方程；德国用 `Nuklidkarte` 定位——**两套工具可互补**：先用双守恒列方程，再用核素图**验证位移方向**。
- **DE-Anschluss**：`Linienspektrum` / `Energieniveauschema`（GK-4 已教）· `Zerfallsgesetz`（GK-4，应用层）· `Nuklidkarte`（GK-4，KLP 点名工具）· `Massendefekt` 与 $E=\Delta m c^2$（GK-4）· Basiskonzept `Erhaltung und Gleichgewicht`（守恒律）· `Zufall und Determiniertheit`（单核 vs 群体）。**零新增知识** [已验证]。
- **合规性**：✅ —— 守恒律与图像法德国都有；⚠️ 但**须补德国特有的 `Nuklidkarte` 读法**（中国只用配平），两者**叠加使用** [据推断]。
- **Abitur 应用**：GK-4 的 Franck-Hertz 数据（AFB II）· 能级跃迁求 λ（AFB II）· 衰变计算（AFB II）· 核反应配平 + 核素图（AFB I/II）。
- **来源**：`[CN-课标]` 选必 3.3 原子核 + 必修 1.1.3 图像法；`[CN-教材]` 双守恒配平 · **原创改写**。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含演示实验，如 Franck-Hertz）[已验证] |
| Operator | `auswerten` / `interpretieren` / `berechnen` / `begründen` / `bewerten` |
| AFB | I（读台阶/读半衰期/配平）→ **II（论证离散能态 → 求 λ / 衰变计算）** → III（辐射防护/核能 Bewertung） |
| 建议分值 / 时长 | 单题约 15–20 BE；GK 平时 Klausur 90 min [已验证] |

> ⚠️ **材料挂靠说明（物理硬约束）**：本节知识点在材料题中**以「一幅 Franck-Hertz 曲线 / 一张能级图 / 一条衰变曲线 / 一段核素图截取 / 一段关于辐射防护的材料」的形态出现**；在实验题中**以「Franck-Hertz 实验测台阶间距、用 GM 计数管测衰变曲线」的形态出现**。答案必须引用题给数据，**禁止脱离材料纯论述** [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Im Franck-Hertz-Versuch mit Quecksilberdampf haben die Minima der Auffängerstromstärke den konstanten Abstand $\Delta U = 4{,}9\,\text{V}$.
> a) Begründen Sie, warum der konstante Abstand auf diskrete Energieniveaus hinweist.
> b) Berechnen Sie die Anregungsenergie der Quecksilberatome in eV und in Joule.
> c) Ermitteln Sie die Wellenlänge des Lichts, das die angeregten Quecksilberatome beim Zurückfallen aussenden.

**Aufgabe 2** `[NRW-改编]`
> Ein Wasserstoffatom befindet sich im Zustand $n=3$ und geht in den Zustand $n=2$ über ($E_n=-13{,}6\,\text{eV}/n^2$).
> a) Berechnen Sie die Energiedifferenz zwischen den beiden Niveaus.
> b) Ermitteln Sie die Wellenlänge des emittierten Photons.
> c) Ordnen Sie die Spektrallinie in das elektromagnetische Spektrum ein und begründen Sie Ihre Zuordnung.

**Aufgabe 3** `[原创]`
> Ein radioaktives Präparat enthält anfangs $N_0 = 8{,}0\cdot10^{20}$ Atomkerne. Nach $t = 15$ Tagen sind noch $1{,}0\cdot10^{20}$ Kerne vorhanden.
> a) Ermitteln Sie die Halbwertszeit aus den Daten.
> b) Berechnen Sie die Anzahl der Kerne nach weiteren 5 Tagen.
> c) In einer Anwendung wird ein $\alpha$-Strahler und ein $\beta^-$-Strahler eingesetzt. Beschreiben Sie mit der Nuklidkarte die jeweilige Verschiebung und bewerten Sie unter Einbeziehung eines Bewertungsmaßstabs, welcher Strahler sich für eine Bestrahlung von außen weniger eignet.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a)** 恒定间距说明电子**每次只能失去相同的一份能量**；若能量可连续交换，电流应平滑下降而非周期性下降 → 原子能量**离散**。✓ **得分点：恒定间距 + 离散结论**（AFB II）
2. **b)** $E_\text{Anregung} = \Delta U\cdot e = 4{,}9\,\text{eV}$；
   $E = 4{,}9\cdot 1{,}60\cdot10^{-19}\,\text{J} = 7{,}8\cdot10^{-19}\,\text{J}$ ✓ **得分点：eV + 换算 J**
3. **c)** $\lambda = \dfrac{1240}{\Delta E/\text{eV}}\,\text{nm} = \dfrac{1240}{4{,}9}\,\text{nm} \approx 253\,\text{nm}$（紫外）✓ **得分点：式 + 代入 + 单位**

**Aufgabe 2** `[NRW-改编]`
1. **a)** $E_3 = -13{,}6/9 = -1{,}51\,\text{eV}$；$E_2 = -13{,}6/4 = -3{,}40\,\text{eV}$；
   $\Delta E = E_3 - E_2 = -1{,}51-(-3{,}40) = 1{,}89\,\text{eV}$ ✓ **得分点：两能级 + 差值**
2. **b)** $\lambda = \dfrac{1240}{1{,}89}\,\text{nm} \approx 656\,\text{nm}$ ✓ **得分点：式 + 单位**
3. **c)** 656 nm 落在**可见光红端**（380–780 nm）→ 属可见光；对应 H 的 H-α 线。✓ **得分点：量级判断 + 归类**（AFB II）

**Aufgabe 3** `[原创]`
1. **a)** $N/N_0 = 1{,}0\cdot10^{20}/8{,}0\cdot10^{20} = 1/8 = (1/2)^3 \Rightarrow 3$ 个半衰期；
   $T_{1/2} = 15\,\text{d}/3 = 5{,}0\,\text{d}$ ✓ **得分点：比值得半衰期个数 + 求 T½**
2. **b)** 再经 $5{,}0\,\text{d} = 1$ 个半衰期：$N = 1{,}0\cdot10^{20}\cdot\tfrac12 = 5{,}0\cdot10^{19}$ ✓ **得分点：再减半 + 数量级**
3. **c)** 核素图位移：α → $Z\downarrow2$、$N\downarrow2$（左下对角线）；β⁻ → $Z\uparrow1$、$N\downarrow1$（右上对角线）。**Bewertung**：α 粒子电离能力强但**穿透力弱**（几张纸即可阻挡），故**不适合体外照射**（无法到达体内靶区）；β⁻ 穿透较强，更适体外照射。须落到**辐射防护规范 / 患者安全**这一规范尺度。
   > *Klausur-Satz*: „Der $\alpha$-Strahler verschiebt den Kern in der Nuklidkarte um zwei Protonen und zwei Neutronen nach links unten, der $\beta^-$-Strahler um ein Proton nach rechts oben. Für eine Bestrahlung von außen ist der $\beta^-$-Strahler geeigneter, da $\alpha$-Strahlung bereits in der Haut absorbiert wird; unter dem Gesichtspunkt des Strahlenschutzes und der Patientensicherheit ist dies entscheidend." ✓ **得分点：两次位移 + 穿透力对比 + 规范判据**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把线状谱说成「连续谱中的亮线」；把特征辐射说成「由减速产生」（那才是轫致辐射）；把「穿透力强」与「电离能力强」当正相关（实为相反） | 记「线状谱 = 离散能级」；轫致 = 连续、特征 = 离散峰；穿透与电离**反相关** |
| **知识错** | β⁻ 衰变忘中微子；核素图上走错方向；把「3 个半衰期后剩 1/8」说成「全没了」；$\Delta m$ 停留在 u 不换算 | 补中微子；α 左下、β⁻ 右上；半衰期是**永远减半**；$1\,\text{u}=931{,}5\,\text{MeV}/c^2$ |
| **表达错** | 忘说明「离散 → 能级量子化」这一步推论；`bewerten` 只谈技术（如「α 穿透力弱」）→ 属 `rein innerfachlich`，**不得分** | 论证链写到「→ 离散能级」；Bewertung 落到防护规范/患者安全 |

---

## 7. Vernetzung

- **上游**：`GK-2-Quantenobjekte.md`（光子、能量量子化）· `GK-3-…-Induktion-und-Energieuebertragung.md`（能量守恒）
- **下游**：`LK-1-Induktion-und-Selbstinduktion.md`（LK 侧加深）· LK-4 `Atom- und Kernphysik`（+ 势箱 / 由 Aktivität 推导衰变律 / C-14 / 结合能定量 / 链式反应）
- **横向**：`00_META/Curriculum/Deutschland/Physik-Oberstufe.md §2 IF-GK-4`（GK 边界原文）· `Basiskonzepte-Vier-Achsen.md`（`Z+D` 与 `E+G` 的核物理落点）· `GK-LK-Fahrplan-Vergleich.md`
- **术语卡**（建议入 csv）：`Linienspektrum` / `Franck-Hertz-Versuch` / `Energieniveauschema` / `Nuklidkarte` / `Zerfallsgesetz` / `Halbwertszeit` / `Massendefekt`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题、不搬教材正文。
