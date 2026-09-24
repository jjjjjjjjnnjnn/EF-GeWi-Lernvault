---
fach: Physik
thema: "LK-Vorbereitung: Feldmathematisierung (Coulomb und Potential)"
operatoren: [berechnen, herleiten, begründen, vergleichen, erklären, darstellen, abschätzen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Physik, Mechanik]
stufe: "Q1"
kursart: "LK"
---

# LK-Vorbereitung: Feldmathematisierung — Coulomb und Potential (场数学化前置包) `[LK]`

> **中文理解**：这是**台阶②**的化解包 [已验证]。EF 只有 `Gravitationsfeld`（**场线图视角**），**完全没有静电学**——无 `Coulomb'sches Gesetz`、无电势 [已验证]。而 **LK-1 一上来就要求**：点电荷间作用力计算 + 场强矢量叠加 + 电势/电势差概念，并须**区分 `Feldstärke` / `Spannung` / `Energie` 三个量** [已验证]。本包把中国必修3.1（库仑 + 电势）**直接前移**——这是中国学生的**优势**（反向补）[据推断]。
>
> **Klausur-Relevanz**：§4 缺口清单**第二优先**（★★★）[已验证]。⚠️ **概念辨析题是中国学生的头号失分点**——中国只给公式 $U=Ed$，德国要求论证三者的区别 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Coulomb'sches Gesetz` | 库仑定律 | Coulomb's law | $F=\dfrac{1}{4\pi\varepsilon_0}\dfrac{|q_1q_2|}{r^2}=k\dfrac{q_1q_2}{r^2}$ | **矢量**，须算方向 [已验证] |
| `elektrische Feldstärke` $\vec E$ | 电场强度 | electric field | $\vec E=\dfrac{\vec F}{q}$，单位 N/C = V/m | **矢量**，可用叠加 [据推断] |
| `Feldlinienbild` | 场线图 | field-line diagram | 匀强 / 径向 / 偶极 | 疏密表示强弱 [据推断] |
| `Superposition` | 叠加原理 | superposition | $\vec E_{\text{ges}}=\vec E_1+\vec E_2+\dots$ | **矢量叠加** [据推断] |
| `elektrisches Potential` $\varphi$ | 电势 | electric potential | $\varphi=\dfrac{W}{q}$，单位 V | **标量**（可代数相加）[据推断] |
| `Potentialdifferenz` / `Spannung` $U$ | 电势差 / 电压 | potential difference | $U=\varphi_1-\varphi_2$ | 标量 [据推断] |
| `Energie im Feld` $W$ | 电场中的能量 | energy | $W=qU=qEd$（匀强场） | 与 $U$ 不同 [据推断] |
| `Plattenkondensator` | 平板电容器 | plate capacitor | $E=\dfrac{U}{d}$（匀强场） | $U$ 与 $E$ 的桥梁 [据推断] |
| `elektrische Feldkonstante` $\varepsilon_0$ | 真空介电常数 | vacuum permittivity | $\varepsilon_0=8{,}85\cdot10^{-12}\,\text{As/(Vm)}$ | 或 $k=\frac{1}{4\pi\varepsilon_0}\approx9\cdot10^9$ [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 从「场线图」跃迁到「可计算的场」

中文理解：EF 的场只是「图上箭头」。LK 要求场是一个**可用 $1/r^2$ 计算的量**。$\vec E$ 是**矢量**（有方向、可叠加），$\varphi$ 是**标量**（只比高低）。这个「一矢一标」的区别是全部辨析题的根。

> *Klausur-Satz*: „Die elektrische Feldstärke $\vec E$ ist eine vektorielle Größe und beschreibt die Kraft pro Ladung; das elektrische Potential $\varphi$ ist dagegen eine skalare Größe und beschreibt die Energie pro Ladung." [原创]

### 2.2 Coulomb 定律与场强叠加

$\vec F=k\dfrac{q_1q_2}{r^2}\hat r$（同号相斥）。由 $\vec E=\vec F/q$ 得点电荷场强 $E=k\dfrac{|Q|}{r^2}$。**多电荷叠加**：$\vec E$ 用矢量合成（先分解再合成），$\varphi$ 用代数相加。

中文理解：**「$E$ 矢量叠加 vs $\varphi$ 标量叠加」是对比辨别的核心**——中国学生最易在方向与符号上失分。

> *Klausur-Satz*: „Das Feld mehrerer Ladungen ergibt sich durch Superposition: Die Feldstärken werden vektoriell addiert, die Potentiale dagegen als Skalare algebraisch summiert." [原创]

### 2.3 电势、电势差与能量

$\varphi=\dfrac{W}{q}$；$U=\varphi_1-\varphi_2$ 是两点的势差；电荷从高电势移向低电势时电场做功 $W=qU$。

中文理解：**能量 $W$ 与电压 $U$ 差一个电荷因子 $q$**——这是辨析题必考。

> *Klausur-Satz*: „Die Potentialdifferenz $U$ zwischen zwei Punkten ist die Differenz der Potentiale; bewegt sich eine Ladung $q$ in diesem Feld, so verrichtet das Feld die Arbeit $W=qU$." [原创]

### 2.4 匀强场中的三个量（**辨析核心**）

平板电容器内匀强场：$E=\dfrac{U}{d}$。三量关系链：$\vec E$（矢量，N/C）→ $U=\varphi_1-\varphi_2$（标量，V）→ $W=qU$（标量，J）。

中文理解：$E$ 描述「场的强弱」，$U$ 描述「两点间的势差」，$W$ 描述「电荷移动获得/失去的能量」。**$U=Ed$ 只在匀强场成立**。

> *Klausur-Satz*: „Im homogenen Feld des Plattenkondensators gilt $E=\dfrac{U}{d}$; dabei ist $U$ die Spannung zwischen den Platten, $E$ die Feldstärke und $W=qU$ die an einer Ladung verrichtete Arbeit. Die drei Größen sind daher sorgfältig zu unterscheiden." [原创]

### 2.5 与 EF 的引力场类比（概念前身）

中文理解：`Gravitationsfeld` $g=GM/r^2$ 与 `elektrisches Feld` $E=kQ/r^2$ **完全同构**——EF 的场是 LK 电势的概念前身 [已验证]。差别：引力只有吸引、电荷有正负。

> *Klausur-Satz*: „Das elektrische Feld eines Punktladung ist strukturell analog zum Gravitationsfeld einer Masse: Beide Feldstärken sind proportional zu $1/r^2$; im elektrischen Fall sind jedoch auch abstoßende Kräfte möglich." [原创]

### 2.6 Basiskonzept 落点

- **`Superposition und Komponenten`**：两个径向电场叠加成偶极场 [已验证]。
- **`Mathematisieren und Vorhersagen`**：由 $1/r^2$ 与标量势可计算并预测场 [已验证]。
- **`Erhaltung und Gleichgewicht`**：正交场中电/磁作用相互补偿 = 力平衡范例（LK-1）[已验证]。

---

## 3. 解题方法 (Methoden)

### 3.1 多电荷场强/势的计算程序

**编号步骤**：
1. **画受力方向图**（同号斥、异号吸），标出每个源电荷在目标点产生的 $\vec E_i$ 方向 —— *KLP 工具：`Coulomb'sches Gesetz` 方向判定*
2. **算各分量大小** $E_i=k\dfrac{|Q_i|}{r_i^2}$ —— *KLP 工具：`elektrische Feldstärke` 定义*
3. **矢量叠加**：分解到坐标轴、分别求和、再合成（求大小 + 方向）—— *KLP 工具：`Superposition und Komponenten`*
4. **若求势**：$\varphi_i=k\dfrac{Q_i}{r_i}$，**代数相加**（带符号）—— *KLP 工具：`elektrisches Potential`（标量）*
5. **检查**：用 `Grenzfallprobe`（$r\to\infty$ 时 $E\to0$）与量纲自检 —— *KLP 工具：`Mathematisieren und Vorhersagen`*

> **判据 / 决策点**：题求「力/场强」→ 走 1–3（矢量）；题求「电势/能量」→ 走 4（标量）。

### 3.2 三量辨析答题模板（`Feldstärke` / `Spannung` / `Energie`）

1. **定义式**：$E=F/q$、$U=\varphi_1-\varphi_2$、$W=qU$ —— *KLP 工具：定义式*
2. **性质**：$E$ 矢量、$U$ 标量、$W$ 标量 —— *KLP 工具：矢量/标量辨别*
3. **单位**：N/C（=V/m）、V、J —— *KLP 工具：量纲*
4. **关系**：$U=Ed$（仅匀强场）、$W=qU$ —— *KLP 工具：`Plattenkondensator`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 极端值 / 特殊值检验法 + 量纲自检（`Grenzfallprobe`）

- **技法内容**：解完结果做两项 30 秒自检 —— ① **极端值检验**：把某参数推向 $0$ 或 $\infty$，看是否退化为常识（如 $r\to\infty$ 时 $E\to0$）；② **量纲自检**：单位是否与所求物理量一致。
- **DE-Anschluss**：`vektorielle Größen` 与公式应用（EF-1）· **Basiskonzept `Mathematisieren und Vorhersagen`**（官方要求「预测」，自检正是预测的验证）· EF 的 `Gesetz` 表征形式。**零新增知识，纯元认知检查**。
- **合规性**：✅ —— 检查习惯，与课程内容无关，任何学段合法。
- **Abitur 应用**：全题型通用，尤其 LK-1 的 Coulomb/电势定量计算（**中国学生最易在方向与符号上失分**）。**不占分但防丢分**，对 `Sicherheit im Umgang mit Fachsprache und -methoden` 有正面作用 [据推断]。
- **来源**：`[CN-教材]` 特殊值法/极限法 · `[CN-课标]` 必修1.2.4 国际单位制。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（含场线图 / 测量数据）[已验证] |
| Operator | `berechnen` / `herleiten` / `vergleichen` / `begründen` |
| AFB | I（定义复述）→ **II（叠加计算 + 概念辨析）** → III（模型/场结构论证） |
| 建议分值 / 时长 | 单题约 20–30 BE；Q LK Klausur 135–180 / 225 min [已验证] |

> ⚠️ **材料挂靠说明**：本节知识点在材料题中**以「给定若干点电荷的电荷量与位置 → 求某点的场强或电势」或「场线图 → 判断强弱与方向」的形态出现**；在实验题中**以「平行板电容器测 $U$-$d$ 关系 → 由斜率求 $E$」的形态出现**。答案须挂靠材料/实验 [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Zwei Punktladungen $Q_1=+4{,}0\,\text{nC}$ und $Q_2=+4{,}0\,\text{nC}$ liegen im Abstand $d=20\,\text{cm}$ voneinander. Betrachtet wird der Mittelpunkt $M$ der Verbindungsstrecke.
> a) Bestimmen Sie Richtung und Betrag der Feldstärke in $M$.
> b) Berechnen Sie das Potential in $M$.
> c) Erläutern Sie den Unterschied zwischen $E$ und $\varphi$ an diesem Beispiel.

**Aufgabe 2** `[CN-改编]`
> Ein Plattenkondensator hat Plattenabstand $d=2{,}0\,\text{mm}$ und liegt an $U=300\,\text{V}$.
> a) Berechnen Sie die Feldstärke $E$ im Inneren.
> b) Ein Elektron ($e=1{,}6\cdot10^{-19}\,\text{C}$) durchläuft die ganze Strecke. Ermitteln Sie die Arbeit $W$ und die Endgeschwindigkeit (Start aus Ruhe, $m_e=9{,}1\cdot10^{-31}\,\text{kg}$).
> c) Vergleichen Sie $E$, $U$ und $W$ hinsichtlich Definition, Einheit und Charakter (vektoriell/skalar).

**Aufgabe 3** `[原创]`
> Im Feld einer einzelnen Punktladung $Q=+2{,}0\,\text{nC}$ wird ein Testpunkt in $r_1=10\,\text{cm}$ und ein zweiter in $r_2=30\,\text{cm}$ betrachtet.
> a) Berechnen Sie $E$ und $\varphi$ an beiden Orten.
> b) Ermitteln Sie die Spannung $U$ zwischen den beiden Punkten.
> c) Beurteilen Sie, ob die Feldstärke oder das Potential für die Beschreibung dieses Feldes jeweils geeigneter ist.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) 场强**：两同号电荷在中点产生的场强**大小相等、方向相反** → 矢量和为零：$E_M=0$。
   （若为异号电荷则为 $2k\dfrac{Q}{(d/2)^2}=2\cdot9\cdot10^9\cdot\dfrac{4\cdot10^{-9}}{0{,}10^2}=7{,}2\cdot10^3\,\text{N/C}$，方向指向负电荷。）✓ **得分点：方向分析 + 结论 $E=0$**
2. **b) 电势**（标量相加）：$\varphi_M=2\cdot k\dfrac{Q}{d/2}=2\cdot9\cdot10^9\cdot\dfrac{4\cdot10^{-9}}{0{,}10}=720\,\text{V}$ ✓ **得分点：标量相加 + 数值**
3. **c) 辨析**：$E$ 是矢量、$U$/$W$ 是标量；本例 $E=0$ 但 $\varphi\ne0$ ——**证明「场强为零不代表电势为零」**，因为 $E$ 关心「力的平衡」，$\varphi$ 关心「势的叠加」。✓ **得分点：用本例反证 + 定义区分**（AFB II/III）

**Aufgabe 2** `[CN-改编]`
1. **a)** $E=\dfrac{U}{d}=\dfrac{300}{2{,}0\cdot10^{-3}}=1{,}5\cdot10^5\,\text{V/m}$ ✓ **得分点：公式 + 单位**
2. **b) 功与速度**：$W=qU=1{,}6\cdot10^{-19}\cdot300=4{,}8\cdot10^{-17}\,\text{J}$
   $\tfrac12m_ev^2=W\Rightarrow v=\sqrt{\dfrac{2W}{m_e}}=\sqrt{\dfrac{2\cdot4{,}8\cdot10^{-17}}{9{,}1\cdot10^{-31}}}\approx1{,}0\cdot10^{7}\,\text{m/s}$ ✓ **得分点：$W=qU$ + 能量守恒求 $v$**
3. **c) 辨析**：$E$：定义 $F/q$，单位 N/C（=V/m），**矢量**；$U$：定义 $\varphi_1-\varphi_2$，单位 V，**标量**；$W$：定义 $qU$，单位 J，**标量**。三者关系 $W=qU$、$U=Ed$。✓ **得分点：三量三项对照 + 关系式**（AFB II）

**Aufgabe 3** `[原创]`
1. **a)** $E_1=k\dfrac{Q}{r_1^2}=9\cdot10^9\cdot\dfrac{2\cdot10^{-9}}{0{,}10^2}=1{,}8\cdot10^3\,\text{N/C}$；$E_2=k\dfrac{Q}{r_2^2}=9\cdot10^9\cdot\dfrac{2\cdot10^{-9}}{0{,}30^2}=200\,\text{N/C}$
   $\varphi_1=k\dfrac{Q}{r_1}=9\cdot10^9\cdot\dfrac{2\cdot10^{-9}}{0{,}10}=180\,\text{V}$；$\varphi_2=k\dfrac{Q}{r_2}=60\,\text{V}$ ✓ **得分点：四个量分别计算**
2. **b)** $U=\varphi_1-\varphi_2=180-60=120\,\text{V}$ ✓ **得分点：势差定义**
3. **c) Beurteilung（模型/描述适宜性，属 Sachkompetenz）**：$E$ 反映**局部**力的作用（矢量，随 $1/r^2$ 快变），$\varphi$ 反映**整体**能量高低（标量，随 $1/r$ 缓变）；计算多电荷问题时用标量 $\varphi$ 更简便，判断带电粒子受力时用 $\vec E$ 更直接。**注意：此处为描述工具适宜性判断，按 KLP 属 Sachkompetenz，不是 Bewertung** [已验证]。✓ **得分点：两量各自适用场景 + 理由**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把 $E$ 当力；把 $\varphi$ 当矢量叠加；$E=0$ 就判 $\varphi=0$ | 牢记 $E=F/q$、$\varphi$ 标量；$E$ 与 $\varphi$ 独立 |
| **知识错** | $r^2$ 忘平方；矢量叠加只算大小不合成方向；单位换算错 | 画方向图；先分解再合成；统一 SI |
| **表达错** | 混淆 $U$ 与 $W$（差一个 $q$）；只给数值不给 Ansatz；符号（正负）漏标 | 三量对照表逐项写；带符号运算 |

---

## 7. Vernetzung

- **上游**：`Kreisbewegung-und-Gravitation.md`（`Gravitationsfeld` 是概念前身）· `Newtonsche-Gesetze-und-Krafte.md`（矢量分解）
- **下游**：LK-1 `Längs-/Querfelder`（平抛同构翻译）· `Kondensator/Kapazität` · `gekreuzte Felder`
- **横向**：`LK-Differentialgleichungen-Vorbereitung.md`（同为 LK 前置包）；`03_Mathe` 矢量运算
- **术语卡**（建议入 csv）：`Coulomb'sches Gesetz` / `elektrische Feldstärke` / `elektrisches Potential` / `Potentialdifferenz` / `Superposition` / `Plattenkondensator`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[CN-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题。
