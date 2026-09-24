---
fach: Physik
thema: "Induktion und Selbstinduktion [LK]"
operatoren: [beschreiben, erklären, erläutern, begründen, herleiten, berechnen, darstellen, untersuchen, skizzieren, vergleichen, bewerten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Physik, Induktion]
stufe: "Q2"
kursart: "LK"
---

# Induktion und Selbstinduktion (感应与自感 · LK 路线) `[LK]`

> **中文理解**：这是 **LK-1 `Ladungen, Felder und Induktion`** 的第三支柱（`Elektromagnetische Induktion`）——**LK 专属，与 GK-3 的「发电机/变压器/交流电」是两套不同内容** [已验证]。知识链：**磁通量 $\Phi$ → 感应定律 $U_\text{ind}=-N\,\mathrm{d}\Phi/\mathrm{d}t$ → 楞次定律（**双论证**）→ 自感 $U_\text{ind}=-L\,\mathrm{d}I/\mathrm{d}t$ 与电感 $L$**。⚠️ **LK 的 `Lenz'sche Regel` 是独立内容重点，须同时用「相互作用概念」与「能量概念」两条路径论证** [已验证]；⚠️ **`Selbstinduktion`/`Induktivität` 是 LK 独有，GK 完全没有** [已验证]。考试形态：材料题给一个感应实验（导体摆、落磁体、线圈通断）的测量数据或 $I(t)$ 曲线，要求 `herleiten`（推感应定律）、`begründen`（Lenz 双论证）、`erklären`（合闸延迟/分闸电压冲击）、`berechnen`（$L$ 或 $U_\text{ind}$）——**任何答案都必须挂靠材料或实验，物理禁止纯论述题** [已验证]。
>
> **Klausur-Relevanz**：LK-1 是 **Q 阶段的独立 IF**，与 GK 路线**不重叠**；`Lenz` 双论证与 `Selbstinduktion` 都是 **LK 必考**、且是**分轨典型**（GK 无）[已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `magnetischer Fluss` $\Phi$ | 磁通量 | magnetic flux | $\Phi = B\,A\,\cos\theta$ | 感应定律输入量 [据推断] |
| `Induktionsgesetz` | 感应定律 | law of induction | $U_\text{ind} = -N\,\dfrac{\mathrm{d}\Phi}{\mathrm{d}t}$ | LK 须能**推导** [据推断] |
| `Lenz'sche Regel` | 楞次定律 | Lenz's rule | 感应电流阻碍磁通变化 | **须双论证** [已验证] |
| `Wirbelströme` | 涡流 | eddy currents | 块状导体内的感应电流 | 阻尼/制动应用 [据推断] |
| `Selbstinduktion` | 自感 | self-induction | 线圈自身电流变化生反电动势 | **LK 独有** [已验证] |
| `Induktivität` $L$ | 电感 | inductance | $U_\text{ind} = -L\,\dfrac{\mathrm{d}I}{\mathrm{d}t}$，单位 H | 元件属性 [据推断] |
| `Einschaltverzögerung` | 合闸延迟 | switch-on delay | 电流不能瞬时建立 | 自感所致 [已验证] |
| `Ausschaltspannungsspitze` | 分闸电压冲击 | switch-off voltage spike | 断电瞬间感应出高电压 | 自感所致 [已验证] |
| `Feldenergie` | 场能 | field energy | $W=\tfrac12 LI^2$（磁场） | LK 要求 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 感应定律与两种变化源

中文理解：感应电压正比于**磁通的变化率**：$U_\text{ind}=-N\,\mathrm{d}\Phi/\mathrm{d}t$。磁通变化有三种来源：**$B$ 变**（相对运动/变场）、**$A$ 变**（形变/进出磁场）、**角度变**（转动）。负号是**楞次定律**的数学表达。

> *Klausur-Satz*: „Die induzierte Spannung ist proportional zur zeitlichen Änderung des magnetischen Flusses durch die Spule, $U_\text{ind}=-N\,\mathrm{d}\Phi/\mathrm{d}t$. Sie entsteht sowohl bei Änderung der Flussdichte, der durchsetzten Fläche als auch des Winkels zwischen Fläche und Feld." [原创]

### 2.2 楞次定律的**双论证**（**LK 得分点**）

中文理解：LK 要求对**同一结论写两遍论证**，路径不同、结论一致：

**① 相互作用概念路径（`Wechselwirkung`）**：感应电流产生**自己的磁场**，该磁场**阻碍**原磁通的变化——这是**磁相互作用**的直接结果。

**② 能量概念路径（`Energie`）**：若感应电流**助长**变化，则系统能量会**自发增大**，违反能量守恒；且**阻碍**意味着必须**克服阻力做功**——机械功转化为电能，**能量守恒被满足**。

> *Klausur-Satz*: „Die lenzsche Regel lässt sich auf zwei Wegen begründen: Zum einen wirkt das Magnetfeld des Induktionsstroms der Änderung des magnetischen Flusses entgegen (Wechselwirkung); zum anderen würde ein umgekehrt gerichteter Induktionsstrom dem Energieerhaltungssatz widersprechen, da das System dann ohne äußere Arbeit Energie gewinnen würde (Energie)." [原创]

⚠️ **失分点**：**只写一种论证** → 少拿一层分；把「相互作用」与「能量」写成同一件事 → 两条论证都拿不到 [据推断]。

### 2.3 自感与电感（**LK 独有**）

中文理解：线圈**自身电流变化**时，穿过自身的磁通也变，于是**自己感应出反向电动势**：$U_\text{ind}=-L\,\dfrac{\mathrm{d}I}{\mathrm{d}t}$，其中 $L=\mu_0\mu_r\dfrac{N^2 A}{l}$（长直螺线管）。这解释了两种现象：

- **合闸延迟**：通电瞬间 $\mathrm{d}I/\mathrm{d}t$ 很大 → 反电动势**阻碍**电流建立，$I(t)$ **不能瞬时**达到终值（指数上升）。
- **分闸电压冲击**：断电瞬间 $\mathrm{d}I/\mathrm{d}t$ 很大（且负）→ 感应出**高电压尖峰**，可能击穿空气产生火花。

> *Klausur-Satz*: „Ein von Strom durchflossener Leiter erzeugt ein Magnetfeld; ändert sich die Stromstärke, so ändert sich auch der magnetische Fluss durch die Spule selbst. Die Selbstinduktionsspannung $U_\text{ind}=-L\,\mathrm{d}I/\mathrm{d}t$ hemmt die Änderung: Sie verzögert das Einschalten und erzeugt beim Ausschalten eine hohe Spannungsspitze." [原创]

---

## 3. 解题方法 (Methoden)

### 3.1 Lenz 双论证写作程序（**LK 必背**）

**编号步骤**：
1. **判磁通如何变**（增大 / 减小，方向如何）—— *KLP 工具：`magnetischer Fluss`* [据推断]
2. **写相互作用论证**：感应电流磁场**阻碍**原变化 —— *KLP 工具：`Lenz'sche Regel`（相互作用）* [已验证]
3. **写能量论证**：假设「助长」→ 违反能量守恒；「阻碍」→ 机械功 → 电能，守恒满足 —— *KLP 工具：`Erhaltung und Gleichgewicht`* [已验证]
4. **由右手定则定电流方向**并给结论 —— *KLP 工具：`Induktionsgesetz` 负号* [据推断]

> **判据 / 决策点**：题干出现 `begründen` + 「方向」 → 几乎一定考**双论证**；只写一句「阻碍变化」不足以拿满 LK 分。

### 3.2 自感题三步

1. **写 $U_\text{ind}=-L\,\mathrm{d}I/\mathrm{d}t$** —— 2. **由 $I(t)$ 曲线取切线斜率**得 $\mathrm{d}I/\mathrm{d}t$（或由 $\Delta I/\Delta t$ 求平均）—— 3. **解释物理现象**（合闸延迟 / 分闸冲击 / 火花）—— *KLP 工具：`Selbstinduktion` + `Induktivität`* [已验证]

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 图像三件套 + 「从能量观点解释」（**命中 Lenz 双论证的一半**）

- **技法内容**：① **图像三件套**（CN-Methode 5）：$I(t)$ 图**斜率 = $U_\text{ind}/(-L)$**；$\Phi\text{-}t$ 图**斜率 = $U_\text{ind}/(-N)$**。② **从能量观点解释**：中国侧训练「用能量守恒解释感应现象」，这**恰好命中** LK `Lenz` 双论证的**能量那一条**——但**只补一半**，还须自己补上**相互作用**那条 [据推断]。
- **DE-Anschluss**：`Induktionsgesetz`（LK-1 已教，须能推导）· `Lenz'sche Regel`（LK-1，**双论证**）· `Selbstinduktion` / `Induktivität`（LK-1 独有）· Basiskonzept `Erhaltung und Gleichgewicht`（LK-1 的 E+G 落点）· `Mathematisieren und Vorhersagen`。**零新增知识** [已验证]。
- **合规性**：✅ —— 图像法与能量守恒德国都有；⚠️ **注意**：中国的「能量观点解释」**只覆盖双论证的一半**，须**显式补写相互作用论证**，否则按 LK 标准少拿分 [据推断]。
- **Abitur 应用**：LK-1 的 `Lenz` 双论证（AFB II/III）· `Selbstinduktion` 现象解释（AFB II）· 感应定律读图（AFB II）。
- **来源**：`[CN-课标]` 选必 2.2 电磁感应（含「从能量角度解释」）+ 必修 1.1.3 图像法；`[CN-教材]` 图像法体系 · **原创改写**。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含演示实验）· 亦可 **Aufgabenart II `Fachpraktische Aufgabe`** [已验证] |
| Operator | `herleiten` / `begründen` / `erklären` / `berechnen` / `bewerten` |
| AFB | I（复述 $\Phi$/$L$ 定义）→ **II（双论证 + 感应定律推导 + 自感计算）** → III（涡流/能量论证 + 装置评价） |
| 建议分值 / 时长 | 单题约 20–25 BE；LK Abitur 300 min（含 Auswahlzeit，4 选 3）[已验证] |

> ⚠️ **材料挂靠说明（物理硬约束）**：本节知识点在材料题中**以「导体摆/落磁体实验的测量数据 / $I(t)$ 或 $\Phi(t)$ 曲线 / 线圈参数表（$N$, $A$, $l$, $\mu_r$）」的形态出现**；在实验题中**以「用导体摆/落磁体验证楞次定律、用线圈测自感」的形态出现**。答案必须引用题给数据，**禁止脱离材料纯论述** [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Stabmagnet fällt durch eine lange, vertikale Spule. Während des Falls zeigt ein Messgerät einen Induktionsstrom an; der fallende Magnet wird dabei gebremst.
> a) Begründen Sie die Richtung des Induktionsstroms auf zwei verschiedenen Wegen (Wechselwirkung und Energie).
> b) Erläutern Sie, warum der Magnet gebremst wird, obwohl zwischen Magnet und Spule keine mechanische Berührung besteht.

**Aufgabe 2** `[NRW-改编]`
> Eine Spule mit der Induktivität $L = 0{,}50\,\text{H}$ wird an eine Gleichspannungsquelle gelegt. Beim Einschalten steigt die Stromstärke innerhalb von $0{,}20\,\text{s}$ gleichmäßig von $0$ auf $2{,}0\,\text{A}$.
> a) Berechnen Sie die während des Einschaltens induzierte Selbstinduktionsspannung.
> b) Erklären Sie, warum die Stromstärke nicht sprunghaft ansteigt.
> c) Beim plötzlichen Ausschalten derselben Spule kann ein Funke an den Schaltkontakten entstehen. Erklären Sie diesen Vorgang.

**Aufgabe 3** `[原创]`
> Ein leitender Metallstreifen wird durch ein Magnetfeld bewegt und erfährt eine bremsende Kraft. Ein Ingenieur schlägt vor, diesen Effekt für eine berührungslose Wirbelstrombremse zu nutzen.
> a) Erklären Sie die Entstehung von Wirbelströmen in einem bewegten, massiven Leiter.
> b) Berechnen Sie die in der Spule gespeicherte Feldenergie für $L = 0{,}50\,\text{H}$ bei $I = 2{,}0\,\text{A}$ und vergleichen Sie mit der Energie eines Kondensators $C = 100\,\mu\text{F}$ bei $U = 100\,\text{V}$.
> c) Bewerten Sie den Einsatz einer Wirbelstrombremse in einem Fahrzeug unter Einbeziehung eines Bewertungsmaßstabs.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) 双论证** —— **相互作用**：磁体下落使线圈磁通增大；感应电流产生的磁场**阻碍**该增大（与磁体磁场反向），据右手定则定出电流方向。**能量**：若感应电流助长变化，则磁体将被加速而无外力做功，违反能量守恒；故必为阻碍。
   > *Klausur-Satz*: „Zum einen wirkt das Feld des Induktionsstroms der Flussänderung entgegen (Wechselwirkung); zum anderen würde eine entgegengesetzte Stromrichtung dem Energieerhaltungssatz widersprechen, da das System sonst ohne äußere Arbeit Energie gewinnen würde (Energie)." ✓ **得分点：两条论证各 1 分 + 结论**（AFB II/III）
2. **b)** 磁体与线圈通过**磁场**相互作用：感应电流的磁场对磁体施加**阻碍其运动**的力（磁斥/磁吸视位置而定），故**无需机械接触**即可制动。✓ **得分点：磁场中介 + 阻碍运动**（AFB II）

**Aufgabe 2** `[NRW-改编]`
1. **a)** $U_\text{ind} = L\dfrac{\Delta I}{\Delta t} = 0{,}50\cdot\dfrac{2{,}0}{0{,}20} = 5{,}0\,\text{V}$ ✓ **得分点：式 + 代入 + 单位**
2. **b)** 通电瞬间 $\mathrm{d}I/\mathrm{d}t$ 很大 → 自感电动势**阻碍**电流建立；随 $I$ 上升，$\mathrm{d}I/\mathrm{d}t$ 减小，反电动势减小，故 $I(t)$ **指数式**趋于终值，**不能跳变**。✓ **得分点：反电动势 + 指数上升**（AFB II）
3. **c)** 断电瞬间 $\mathrm{d}I/\mathrm{d}t$ 极大且为负 → 感应出**高电压尖峰**；该电压足以**击穿空气**，形成火花。✓ **得分点：高 dI/dt + 高电压 + 击穿**（AFB II）

**Aufgabe 3** `[原创]`
1. **a)** 金属块进入/离开磁场时，穿过其中**局部回路**的磁通变化 → 感应出**闭合的涡电流**；涡流又受磁场力作用，方向**阻碍**相对运动。✓ **得分点：局部磁通变化 + 闭合涡流 + 阻碍**（AFB II）
2. **b)** 线圈：$W_L = \tfrac12 LI^2 = \tfrac12\cdot 0{,}50\cdot 2{,}0^2 = 1{,}0\,\text{J}$；
   电容：$W_C = \tfrac12 CU^2 = \tfrac12\cdot 100\cdot10^{-6}\cdot 100^2 = 0{,}50\,\text{J}$。
   两者**量级相同**，线圈储能约为电容的 **2 倍**。✓ **得分点：两式 + 两值 + 对比**
3. **c) Bewertung（须超出学科内部）** —— 须落到**规范/价值**：无接触 → **无磨损、响应快、维护成本低**（经济/安全）；但涡流制动**低速时力矩骤降**，且能量以**热**耗散（**不能回收**），与**节能/能量回收**这一生态价值相权衡。
   > *Klausur-Satz*: „Die Wirbelstrombremse arbeitet berührungsfrei und damit verschleißarm, wandelt die Bewegungsenergie jedoch vollständig in Wärme um; im Vergleich zu einer rekuperativen Bremse, die Energie zurückgewinnt, ist sie unter dem Gesichtspunkt der Energieeffizienz nachteilig, unter dem Gesichtspunkt von Wartung und Sicherheit dagegen vorteilhaft." ✓ **得分点：无磨损优势 + 能量不可回收劣势 + 明确价值权衡**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | **Lenz 双论证只写一种**（只写能量，漏相互作用）；把「相互作用」与「能量」写成同一件事；把自感与互感混淆 | 强制写两段、两标题；自感 = 自身电流变化，互感 = 另一线圈 |
| **知识错** | 把「分闸电压冲击」说成「电流突然变大」（是**感应出高电压**）；用 GK 的「变压器/交流电」答 LK 题 | 记「断电 → 高 $|dI/dt|$ → 高压」；LK 路线无变压器独立条目 |
| **表达错** | `herleiten` 只给结论不给推导步骤；`begründen` 只给一句「阻碍变化」；`bewerten` 只谈技术 → 属 `rein innerfachlich`，**不得分** | 推导写全步；双论证两段；Bewertung 落到价值/规范 |

---

## 7. Vernetzung

- **上游**：`GK-3-…-Induktion-und-Energieuebertragung.md`（GK 侧感应基础）· `LK-Feld-Mathematisierung-Coulomb-Potential.md`（场与势）· `Kreisbewegung-und-Gravitation.md`（洛伦兹力基础）
- **下游**：`LK-Differentialgleichungen-Vorbereitung.md`（RC-DGL，台阶①）· LK-2 `Schwingende Systeme und Wellen`（`Schwingkreis` + `Thomson`）
- **横向**：`00_META/Curriculum/Deutschland/Physik-Oberstufe.md §2 IF-LK-1`（LK 增量表原文）· `GK-LK-Fahrplan-Vergleich.md`（自感 LK 独有）· `Basiskonzepte-Vier-Achsen.md`（`E+G`）
- **术语卡**（建议入 csv）：`Selbstinduktion` / `Induktivität` / `Lenz'sche Regel` / `Wirbelströme` / `Einschaltverzögerung` / `Ausschaltspannungsspitze`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题、不搬教材正文。
