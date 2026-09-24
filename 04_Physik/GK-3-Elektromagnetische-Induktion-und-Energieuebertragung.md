---
fach: Physik
thema: "Elektromagnetische Induktion und Energieübertragung (GK)"
operatoren: [angeben, beschreiben, erklären, erläutern, begründen, herleiten, berechnen, auswerten, darstellen, vergleichen, bewerten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q1, Q2, Physik, Induktion]
stufe: "Q1|Q2"
kursart: "GK"
---

# Elektromagnetische Induktion und Energieübertragung (电磁感应与能量传输 · GK 路线)

> **中文理解**：这是 **GK-3 `Elektrodynamik und Energieübertragung`**——GK 的核心是「**供电的物理基础**」：电磁感应既用于**产生电压**（发电机），又用于**电能分配**（变压器）[已验证]。知识链：**磁通量 $\Phi$ → 感应定律 $U_\text{ind}=-N\,\mathrm{d}\Phi/\mathrm{d}t$ → 楞次定律 → 发电机/变压器/交流电 → 电容与充放电 → 电磁振荡（定性）**。⚠️ 本 IF 是 **GK 的 `Bewertungskompetenz` 主战场**（能量供给/储存/回收，如「电车制动能量回收」）[已验证]；⚠️ **LK-1 反而没有变压器/发电机/交流电的独立条目**——这是 GK/LK 分轨的典型 [已验证]。考试形态：材料题给一个感应实验的 $\Phi(t)$ 图或一组测量数据，要求 `herleiten`/`darstellen`（写感应定律）、`auswerten`（读图求 $U_\text{ind}$）、`berechnen`（匝数比），末问接 `bewerten`（远距离高压输电须落到经济/生态/社会，**不能只谈技术**）——**任何答案都必须挂靠材料或实验，物理禁止纯论述题** [已验证]。
>
> **Klausur-Relevanz**：`Induktionsgesetz` 是 **GK 必考**，且 **GK 也要求「平均变化率」与「微分」两种写法** [已验证]；`Generator/Transformator` 是 GK 独立重点 + Bewertung 落点 [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `magnetischer Fluss` $\Phi$ | 磁通量 | magnetic flux | $\Phi = B\,A\,\cos\theta$ | 斜置线圈须乘 $\cos$ [据推断] |
| `Induktionsgesetz` | 感应定律 | law of induction | $U_\text{ind} = -N\,\dfrac{\mathrm{d}\Phi}{\mathrm{d}t}$ | **平均式与微分式都要会** [已验证] |
| `Lenz'sche Regel` | 楞次定律 | Lenz's rule | 感应电流**阻碍**磁通变化 | 本质是能量守恒 [据推断] |
| `Leiterschaukel` | 导体摆 | conductor swing | 摆动导体棒切割磁感线 | GK 实验点 [据推断] |
| `Generator` | 发电机 | generator | 机械转动 → 正弦电压 | GK 独立重点 [已验证] |
| `Wechselspannung` | 交流电压 | AC voltage | $U(t)=U_\text{max}\sin(\omega t)$ | 由感应定律导出 [已验证] |
| `Transformator` | 变压器 | transformer | $\dfrac{U_1}{U_2}=\dfrac{N_1}{N_2}$ | 改变电压 [已验证] |
| `Kapazität` $C$ | 电容 | capacitance | $C=Q/U$；平板 $C=\varepsilon_0\varepsilon_r A/d$ | GK 要求含介电常数 [已验证] |
| `Auf-/Entladevorgang` | 充/放电 | charging/discharging | $I(t)$ 指数衰减 | GK 要求建模（未点名 DGL）[已验证] |
| `elektromagnetische Schwingung` | 电磁振荡 | electromagnetic oscillation | 电场能 ⇄ 磁场能往复 | GK 只要求定性 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 磁通量与感应定律（**两种写法都要会**）

中文理解：$\Phi = B\,A\,\cos\theta$ 是感应定律的**输入量**。改变 $\Phi$ 的三种方式：**$B$ 变 / $A$ 变 / 角度变**。感应电压正比于磁通的**变化率**——**平均变化率**形式用于分段数据，**微分形式**用于连续曲线。

$$U_\text{ind} = -N\,\frac{\Delta\Phi}{\Delta t}\quad(\text{平均}),\qquad U_\text{ind} = -N\,\frac{\mathrm{d}\Phi}{\mathrm{d}t}\quad(\text{微分})$$

> *Klausur-Satz*: „Die induzierte Spannung ist proportional zur zeitlichen Änderung des magnetischen Flusses durch die Spule: $U_\text{ind}=-N\,\mathrm{d}\Phi/\mathrm{d}t$. Das negative Vorzeichen bringt die lenzsche Regel zum Ausdruck: Die Induktionsspannung wirkt der Ursache ihrer Entstehung entgegen." [原创]

⚠️ **GK 也要求微分形式**（`S7`）——这是中国学生的薄弱环节（中国高中通常不给微分写法）[据推断]。

### 2.2 楞次定律：阻碍，不是阻止

中文理解：感应电流的方向总是**阻碍引起它的变化**。本质是**能量守恒**——若感应电流**助长**变化，能量将无中生有。

> *Klausur-Satz*: „Nach der lenzschen Regel ist der Induktionsstrom stets so gerichtet, dass er die Ursache seiner Entstehung hemmt. Wäre er umgekehrt gerichtet, würde das System Energie gewinnen, was dem Energieerhaltungssatz widerspräche." [原创]

### 2.3 发电机、变压器与高压输电（**GK 独立重点**）

中文理解：**发电机**靠线圈在磁场中旋转（$\Phi$ 周期变化）产生**正弦交流电压** $U(t)=U_\text{max}\sin(\omega t)$，其中 $U_\text{max}=N\,B\,A\,\omega$。**变压器**靠匝数比改变电压：$\dfrac{U_1}{U_2}=\dfrac{N_1}{N_2}$（理想变压器功率守恒 $\Rightarrow$ 电流反比）。**远距离输电**：$P=UI$，为保持功率不变，**升压 → 降流 → 线损 $P_\text{verlust}=I^2R$ 大幅下降**。

> *Klausur-Satz*: „Ein Transformator ändert die Spannung im Verhältnis der Windungszahlen. Beim Ferntransport wird die Spannung hochtransformiert, um bei gleicher Leistung den Strom und damit die Verlustleistung $P_\text{Verlust}=I^2R$ in den Leitungen klein zu halten." [原创]

### 2.4 电容充放电与电磁振荡（定性）

中文理解：充电时 $I(t)$ 随 $q$ 增大而**指数衰减**，与 $R$、$C$ 有关；`Q-U` 图中**图线与横轴所围面积 = 电容储能**。电磁振荡中**电场能 ⇄ 磁场能**往复转换，总能量守恒（无阻尼时）。⚠️ GK **不要求** `Thomson'sche Gleichung`、不点名 DGL [已验证]。

> *Klausur-Satz*: „Beim Aufladen eines Kondensators nimmt die Stromstärke exponentiell mit der Zeit ab; die Fläche unter der $Q$-$U$-Kennlinie entspricht der im Kondensator gespeicherten Energie. In einem Schwingkreis wandelt sich elektrische Feldenergie periodisch in magnetische Feldenergie um, wobei die Gesamtenergie erhalten bleibt." [原创]

---

## 3. 解题方法 (Methoden)

### 3.1 感应定律题四步法

**编号步骤**：
1. **写 $\Phi(t)$ 或读 $\Phi(t)$ 图**：明确是 $B$、$A$ 还是角度在变 —— *KLP 工具：`magnetischer Fluss`* [已验证]
2. **求变化率**：分段数据用 $\Delta\Phi/\Delta t$；连续曲线用**切线斜率** $\mathrm{d}\Phi/\mathrm{d}t$ —— *KLP 工具：`Induktionsgesetz`（两种写法）* [已验证]
3. **代入 $U_\text{ind}=-N\,\Delta\Phi/\Delta t$**，乘匝数 $N$ —— *KLP 工具：`berechnen` 官方定义*
4. **判方向**（楞次）+ **自检**（$\Phi$ 不变处 $U_\text{ind}=0$）—— *KLP 工具：`Lenz'sche Regel` + CN-Methode 8*

> **判据 / 决策点**：$\Phi(t)$ 图**直线段** → 平均式（$U$ 恒定）；**曲线** → 微分式（$U$ 随斜率变）。斜率最大的点 → $|U_\text{ind}|$ 最大。

### 3.2 变压器/输电三步

1. **匝数比** $U_2 = U_1\,N_2/N_1$ —— 2. **功率守恒** $I_2 = I_1\,N_1/N_2$（理想）—— 3. **线损** $P_\text{Verlust}=I^2R$，比较升压前后 —— *KLP 工具：`Transformator` + `Energieübertragung`* [据推断]

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 图像三件套（面积 / 斜率 / 截距）+ 微元法（**Q-U 面积 = 储能**）

- **技法内容**：① **图像三件套**（CN-Methode 5）：$\Phi\text{-}t$ 图**斜率 = $U_\text{ind}/N$**；**`Q-U` 图图线与横轴所围面积 = 电容储能**（德国**明文要求**，等效积分思想但**不建积分概念**）。② **微元法与极限思想**（CN-Methode 7）：处理变化的量时「**以恒代变、再求和**」——这是思维方式，不是公式。
- **DE-Anschluss**：`Induktionsgesetz` 的微分形式（**GK-3 明文要求**）· `Q-U` 面积 = 储能（**GK-3 明文要求**）· `Messwerttabelle / Diagramm / Gesetz` 三表征形式（EF-1）· Basiskonzept `Mathematisieren und Vorhersagen`（本技法的官方名分）· `Erhaltung und Gleichgewicht`（无阻尼振荡的能量守恒）。**零新增知识** [已验证]。
- **合规性**：✅ —— 只取「先微元、再求和」的两步框架，**不引入定积分运算**（德国 EF/Q 无此要求，属超纲）[已验证]。
- **Abitur 应用**：GK-3 的 `Induktionsgesetz` 读图（AFB II）· `Q-U` 面积求储能（AFB II）· RC 充放电建模（AFB II）。
- **来源**：`[CN-课标]` 必修 1.1.3「极限方法」（课标明示条目）+ 选必 2.2 电磁感应 + 必修 3.1.3 电容器；`[CN-教材]` 图像法/微元法体系 · **原创改写**。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含演示实验，如导体摆/跳环）[已验证] |
| Operator | `herleiten` / `darstellen` / `auswerten` / `berechnen` / `bewerten` |
| AFB | I（复述 $\Phi$ 定义/匝数比）→ **II（$\Phi(t)$ → $U_\text{ind}$ → 信号形状）** → III（高压输电/能量回收 Bewertung） |
| 建议分值 / 时长 | 单题约 15–20 BE；GK 平时 Klausur 90 min [已验证] |

> ⚠️ **材料挂靠说明（物理硬约束）**：本节知识点在材料题中**以「一幅 $\Phi(t)$ 图 / 一组线圈匝数与电压数据表 / 一段关于特高压输电的材料」的形态出现**；在实验题中**以「导体摆/跳环/法拉第发电机模型 + 测量数据」的形态出现**。答案必须引用题给数据，**禁止脱离材料纯论述** [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Eine Spule mit $N = 200$ Windungen und der Querschnittsfläche $A = 50\,\text{cm}^2$ liegt in einem homogenen Magnetfeld, dessen Flussdichte in $0{,}10\,\text{s}$ gleichmäßig von $0$ auf $0{,}20\,\text{T}$ ansteigt (Feld senkrecht zur Spulenfläche).
> a) Berechnen Sie den magnetischen Fluss am Anfang und am Ende.
> b) Berechnen Sie die induzierte Spannung.
> c) Begründen Sie mit der lenzschen Regel die Richtung des Induktionsstroms.

**Aufgabe 2** `[NRW-改编]`
> Ein Transformator soll die Netzspannung $U_1 = 230\,\text{V}$ auf $U_2 = 11{,}5\,\text{V}$ heruntersetzen. Die Primärspule hat $N_1 = 1000$ Windungen.
> a) Berechnen Sie die Windungszahl der Sekundärspule.
> b) Ein Elektrizitätswerk überträgt eine Leistung von $P = 10\,\text{MW}$ über eine Leitung mit dem Widerstand $R = 5{,}0\,\Omega$. Vergleichen Sie die Verlustleistung bei $U = 20\,\text{kV}$ und bei $U = 400\,\text{kV}$.
> c) Bewerten Sie die Notwendigkeit der Hochspannungsübertragung unter Einbeziehung ökologischer und wirtschaftlicher Bewertungsmaßstäbe.

**Aufgabe 3** `[原创]`
> Die Entladekurve eines Kondensators ($C = 100\,\mu\text{F}$) wird aufgenommen; aus dem $Q$-$U$-Diagramm ergibt sich eine Gerade durch den Ursprung.
> a) Beschreiben Sie den zeitlichen Verlauf der Stromstärke beim Entladen und begründen Sie dessen Form.
> b) Ermitteln Sie die im Kondensator bei $U = 12\,\text{V}$ gespeicherte Energie über die Fläche im $Q$-$U$-Diagramm.
> c) Erläutern Sie qualitativ, wie sich in einem Schwingkreis Feldenergie periodisch umwandelt.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a)** $\Phi_0 = B_0 A = 0\,\text{Wb}$；
   $\Phi_1 = B_1 A = 0{,}20\,\text{T}\cdot 5{,}0\cdot10^{-3}\,\text{m}^2 = 1{,}0\cdot10^{-3}\,\text{Wb}$ ✓ **得分点：面积换算 + 两值**
2. **b)** $U_\text{ind} = N\dfrac{\Delta\Phi}{\Delta t} = 200\cdot\dfrac{1{,}0\cdot10^{-3}}{0{,}10} = 2{,}0\,\text{V}$ ✓ **得分点：变化率 + 乘 N + 单位**
3. **c)** $\Phi$ 增大 → 感应电流产生的磁场**阻碍**原磁通增大（与原场**反向**）；由楞次定律 + 右手定则定出电流方向。✓ **得分点：阻碍原变化 + 方向判定**（AFB II）

**Aufgabe 2** `[NRW-改编]`
1. **a)** $\dfrac{U_1}{U_2}=\dfrac{N_1}{N_2} \Rightarrow N_2 = N_1\dfrac{U_2}{U_1} = 1000\cdot\dfrac{11{,}5}{230} = 50$ ✓ **得分点：匝数比 + 代入**
2. **b)** $I = P/U$；
   $U=20\,\text{kV}$：$I = \dfrac{10\cdot10^6}{20\cdot10^3}=500\,\text{A} \Rightarrow P_\text{Verlust}=I^2R = 500^2\cdot 5{,}0 = 1{,}25\cdot10^6\,\text{W}=1{,}25\,\text{MW}$；
   $U=400\,\text{kV}$：$I = 25\,\text{A} \Rightarrow P_\text{Verlust}=25^2\cdot 5{,}0 = 3{,}1\cdot10^3\,\text{W}=3{,}1\,\text{kW}$。
   后者约为前者的 **1/400**。✓ **得分点：两次电流 + 两次线损 + 对比**（AFB II）
3. **c) Bewertung（须超出学科内部）** —— 须落到**经济与生态**：线损从 1,25 MW 降至约 3 kW，**节省发电燃料与成本**（经济）、**减少 $\text{CO}_2$ 排放**（生态）；但高压线路建设成本与景观影响亦须权衡（`wägen diese gegeneinander ab`）。
   > *Klausur-Satz*: „Da die Verlustleistung quadratisch mit der Stromstärke wächst, senkt die Hochspannungsübertragung die Übertragungsverluste drastisch; dies spart Brennstoff und senkt die Emissionen, steht aber den höheren Kosten und dem Landschaftseingriff der Hochspannungsleitungen gegenüber, die gegeneinander abzuwägen sind." ✓ **得分点：数值支撑 + 经济/生态双尺度 + 权衡**（AFB III）

**Aufgabe 3** `[原创]`
1. **a)** 放电电流**指数衰减**：$q$ 减小时驱动电流的电压减小，故 $I=\mathrm{d}q/\mathrm{d}t$ 随之减小；$I(t)$ 与 $q(t)$ 同步衰减（时间常数 $\tau=RC$）。✓ **得分点：指数形式 + 因果说明**（AFB II）
2. **b)** $Q = CU = 100\cdot10^{-6}\cdot 12 = 1{,}2\cdot10^{-3}\,\text{C}$；
   `Q-U` 图为过原点直线，**面积 = $\tfrac12 QU$** $= \tfrac12\cdot 1{,}2\cdot10^{-3}\cdot 12 = 7{,}2\cdot10^{-3}\,\text{J}$ ✓ **得分点：求 Q + 三角形面积 = 储能 + 单位**
3. **c)** 无阻尼时，**电场能**（电容）与**磁场能**（线圈）周期性地相互转换；总能量恒定，能量只是**形态变化**而非消失。✓ **得分点：两种能量 + 守恒结论**（AFB II）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把「阻碍变化」说成「阻止变化」（是延缓不是取消）；把 $\Phi$ 与 $B$ 当成同一个量 | 记「阻碍 ≠ 阻止」；$\Phi = BA\cos\theta$ |
| **知识错** | 斜置线圈忘乘 $\cos$；只写平均变化率形式（**GK 也要求微分形式**）；高压输电只算匝数比不写线损 | 先判角度；两种写法并列；线损必用 $I^2R$ |
| **表达错** | `berechnen` 只给数值不给 Ansatz；`bewerten` 只谈技术效率 → 属 `rein innerfachlich`，**不得分** | 四段写；Bewertung 落到经济/生态/社会/规范 |

---

## 7. Vernetzung

- **上游**：`GK-1-Schwingungen-und-Wellen.md`（电磁振荡的波类比）· `Gleichmaessig-beschleunigte-Bewegung-Freier-Fall.md`（读图与斜率）
- **下游**：`GK-4-Strahlung-und-Materie.md`（能量-质量守恒的广义化）· `LK-1-Induktion-und-Selbstinduktion.md`（LK 侧：自感 + Lenz 双论证 + DGL）
- **横向**：`00_META/Curriculum/Deutschland/Physik-Oberstufe.md §2 IF-GK-3`（GK 边界原文）· `GK-LK-Fahrplan-Vergleich.md`（变压器/发电机 LK 无独立条目）· `Bewertungsgrenzen-Regelkarte.md`
- **术语卡**（建议入 csv）：`magnetischer Fluss` / `Induktionsgesetz` / `Lenz'sche Regel` / `Generator` / `Transformator` / `Wechselspannung` / `Kapazität`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题、不搬教材正文。
