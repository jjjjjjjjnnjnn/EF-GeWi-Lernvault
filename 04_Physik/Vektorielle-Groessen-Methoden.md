---
fach: Physik
thema: "Vektorielle Größen: Komponentenzerlegung und Vektoraddition (allgemeine Methode)"
operatoren: [darstellen, beschreiben, berechnen, begründen, skizzieren, zeichnen, ermitteln]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Physik, Mechanik]
stufe: "EF"
kursart: "GK|LK"
---

# Vektorielle Größen: Komponentenzerlegung und Vektoraddition (矢量与分量分解一般方法)

> **中文理解**：$v$、$a$、$F$、$p$ 都是**矢量**（有大小、有方向、按平行四边形法则合成）。KLP 在 EF-1 **明示要求**「用 `Komponentenzerlegung bzw. Vektoraddition` 表示运动与平衡状态」[已验证]，这是 Basiskonzept `Superposition und Komponenten` 的**第一个落点** [已验证]。矢量分解不是某一章的小技巧，而是**贯穿 EF-1 与 EF-2 的必用工具**：平抛拆两方向、斜面拆重力、力的合成与平衡、动量与冲量的方向，全靠它。本卡把「怎么分解、怎么合成、什么时候用哪种」整理成**可复用的通用套路** [据推断]。
>
> **Klausur-Relevanz**：§4 缺口清单第 20 项。它是 EF 一切二维/多力问题的**公共工具**，也是 Q 阶段（电场/磁场/交叉场）矢量化处理的地基 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `vektorielle Größe` | 矢量 | vector quantity | 有大小 + 方向的量 | $v,a,F,p$ [已验证] |
| `skalare Größe` | 标量 | scalar quantity | 只有大小 | $m,t,W,E$ [据推断] |
| `Komponentenzerlegung` | 分量分解 | component decomposition | 把矢量拆成互相垂直的分量 | EF-1 明示要求 [已验证] |
| `Vektoraddition` | 矢量加法 | vector addition | 平行四边形/首尾相接 | EF-1 明示要求 [已验证] |
| `Kräftegleichgewicht` | 力平衡 | force equilibrium | 合力为零 | EF-1 [已验证] |
| `Betrag` | 大小 | magnitude | $|\vec F| = \sqrt{F_x^2+F_y^2}$ | 勾股 [据推断] |
| `Richtung` | 方向 | direction | $\tan\alpha = F_y/F_x$ | 与坐标轴夹角 [据推断] |
| `Superpositionsprinzip` | 叠加原理 | superposition | 多个效果可矢量叠加 | Basiskonzept [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 为什么必须分解（中文理解 → Klausur-Satz）

中文理解：一个矢量在二维平面上可用**两个互相垂直的分量**唯一表示；分解后，**两个方向可以独立处理**（互不干扰），复杂问题就变成两个一维问题 [据推断]。

> *Klausur-Satz*: „Jede vektorielle Größe lässt sich eindeutig in zwei zueinander senkrechte Komponenten zerlegen. Da sich die Komponenten unabhängig voneinander verhalten, lässt sich ein zweidimensionales Problem auf zwei eindimensionale Probleme zurückführen." [原创]

### 2.2 分解的三种典型场景（**决策表**）

中文理解：看到题先判断属哪种场景，直接套对应分解方式 [据推断]。

| 场景 | 怎么分解 | 典型例子 | KLP 落点 |
|---|---|---|---|
| **运动分解** | 沿初速度方向 + 垂直初速度方向 | 平抛：水平匀速 + 竖直匀加速 | EF-1 `waagerechter Wurf` [已验证] |
| **力的分解** | 沿运动方向 + 垂直运动方向（或沿斜面/垂直斜面） | 斜面重力拆成下滑分力 + 正压力 | EF-1 `beschleunigende Kräfte` [已验证] |
| **多矢量合成** | 先把各矢量分解到同一坐标系，再按分量相加 | 多个力求合力、多源场叠加 | EF-1 `Kräftegleichgewicht` [已验证] |

> *Klausur-Satz*: „Bei Bewegungsproblemen zerlegt man die Geschwindigkeit in eine Komponente längs und eine senkrecht zur Beschleunigung; bei Kraftproblemen zerlegt man die Kräfte in ein geeignetes Koordinatensystem und addiert die Komponenten getrennt." [原创]

### 2.3 分解公式（含角）

中文理解：若矢量 $\vec F$ 与 $x$ 轴成角 $\alpha$，则 $F_x = F\cos\alpha$，$F_y = F\sin\alpha$ [据推断]。

$$F_x = F\cos\alpha,\qquad F_y = F\sin\alpha,\qquad |\vec F| = \sqrt{F_x^2+F_y^2},\qquad \tan\alpha = \frac{F_y}{F_x}$$

> *Klausur-Satz*: „Bildet ein Vektor den Winkel $\alpha$ mit der $x$-Achse, so gilt für seine Komponenten $F_x=F\cos\alpha$ und $F_y=F\sin\alpha$." [原创]

### 2.4 平衡条件（矢量版）

中文理解：平衡 = 合力为零 = **每个方向的分量分别抵消** [据推断]。

$$\sum F_x = 0 \quad\text{und}\quad \sum F_y = 0$$

> *Klausur-Satz*: „Ein Körper befindet sich im Kräftegleichgewicht, wenn die Vektorsumme aller angreifenden Kräfte null ist; äquivalent dazu verschwindet die Summe der Komponenten in jeder Richtung." [原创]

### 2.5 Basiskonzept 落点

- **`Superposition und Komponenten`**：本卡的**主落点**，EF-1 明示 [已验证]。
- **`Erhaltung und Gleichgewicht`**：平衡条件 $\sum\vec F = 0$ [据推断]。
- **`Mathematisieren und Vorhersagen`**：由分量算合力大小与方向 [据推断]。

---

## 3. 解题方法 (Methoden)

### 3.1 通用「矢量四步法」

**编号步骤**：
1. **判类型**：是运动矢量（$v,a$）还是力矢量（$F$）还是动量（$p$）？—— *KLP 工具：`vektorielle Größen`（EF-1）*
2. **选坐标系**：让一个轴沿主要运动方向或待求方向（斜面 → 沿斜面/垂直斜面；平抛 → 水平/竖直）—— *KLP 工具：`Komponentenzerlegung`（EF-1 明示）*
3. **分解**：每个矢量写成 $(\cos\alpha,\ \sin\alpha)$ 两分量 —— *KLP 工具：三角函数*
4. **按分量运算后合成**：先分方向列式，再勾股 + 反正切求大小与方向 —— *KLP 工具：`Vektoraddition`（EF-1）*

> **判据 / 决策点**：题问「合力多大、什么方向」→ 走第 4 步的合成；题问「是否平衡 / 求某个未知力」→ 用 $\sum F_x=0,\ \sum F_y=0$ 列方程。

### 3.2 「选坐标系」的黄金规则

1. **让轴沿已知量最多的方向**（减少未知数）。
2. **让轴沿运动方向**（把加速度集中到一个轴上）。
3. **让轴沿斜面**（把重力变成两个已知角的分量）。

> *Klausur-Satz*: „Ein geschickt gewähltes Koordinatensystem reduziert die Zahl der Unbekannten: Man legt eine Achse parallel zur Bewegung oder parallel zur schiefen Ebene." [原创]

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 矢量的「正交分解」与「等效」思想

- **技法内容**：中国把「力的合成与分解」「运动的合成与分解」做成**统一的坐标系套路**：任取正交坐标轴，把所有矢量投影到两轴上，化为两列标量方程；再用勾股与反正切还原。核心是**「先分解、后合成」**与**「等效替换」**（多个力等效为一个合力）[据推断]。
- **DE-Anschluss**：`vektorielle Größen` 与 `Komponentenzerlegung bzw. Vektoraddition`（**EF-1 明示要求**）[已验证] · `Kräftegleichgewicht` / `beschleunigende Kräfte`（EF-1）· `waagerechter Wurf`（EF-1）· Basiskonzept `Superposition und Komponenten` [已验证]。
- **合规性**：✅ —— 完全落在 EF-1 明示要求内；中国侧提供的只是**更系统的坐标系选择经验**，零新增知识。
- **Abitur 应用**：EF-1 一切二维运动与多力问题；EF-2 圆周运动中的向心力方向；Q 阶段电场/磁场/交叉场的矢量处理。**AFB I/II** [据推断]。
- **来源**：`[CN-课标]` 必修1.2.2 力的合成与分解；`[CN-教材]` 正交分解法（**只记方法名与逻辑，不搬正文**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`** [已验证] |
| Operator | `darstellen` / `zeichnen` / `skizzieren` / `berechnen` / `begründen` |
| AFB | I（画分解图）→ **II（由分量求合力或未知力）** → III（论证坐标系选择） |
| 建议分值 / 时长 | 单题约 10–20 BE；EF Klausur 90 min [已验证] |

> ⚠️ **材料挂靠说明**：本卡知识点在材料题中**以「给定一个物体受多个力（附示意图）→ 求合力或判断是否平衡」的形态出现**；在实验题中**以「由力传感器测得各方向分力 → 验证矢量合成」的形态出现**。**物理禁止纯论述题**，矢量题必须画图并挂靠题给数据 [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Körper der Masse $m = 2{,}0\,\text{kg}$ liegt auf einer reibungsfreien schiefen Ebene mit Neigungswinkel $\alpha = 30°$.
> a) Zerlegen Sie die Gewichtskraft in eine Komponente parallel und eine senkrecht zur Ebene (Skizze).
> b) Berechnen Sie beide Komponenten.
> c) Begründen Sie, welche Komponente die Bewegung verursacht.

**Aufgabe 2** `[NRW-改编]`
> Zwei Kräfte greifen an einem Punkt an: $F_1 = 6{,}0\,\text{N}$ in $x$-Richtung und $F_2 = 8{,}0\,\text{N}$ senkrecht dazu.
> a) Bestimmen Sie Betrag und Richtung der resultierenden Kraft.
> b) Zeichnen Sie das Kräfteparallelogramm.
> c) Ein dritter Körper soll im Gleichgewicht sein; geben Sie die dafür nötige Gegenkraft an.

**Aufgabe 3** `[原创]`
> Ein Flugzeug fliegt mit Eigengeschwindigkeit $v_F = 200\,\text{km/h}$ nach Norden, während ein Wind mit $v_W = 60\,\text{km/h}$ nach Osten weht.
> a) Zerlegen Sie die Situation in ein geeignetes Koordinatensystem und bestimmen Sie die resultierende Geschwindigkeit.
> b) Ermitteln Sie den Winkel zwischen Flugrichtung und Nordrichtung.
> c) Erläutern Sie, welche Rolle die Wahl des Koordinatensystems für die Lösung spielt.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) 分解图**：重力 $\vec F_G = mg$ 竖直向下，分解为沿斜面的 $F_\parallel$ 与垂直斜面的 $F_\perp$（画直角三角，斜边为 $\vec F_G$）。✓ **得分点：图 + 直角关系**
2. **b) 分量**：$F_G = 2{,}0\cdot9{,}81 \approx 19{,}6\,\text{N}$；$F_\parallel = F_G\sin30° = 19{,}6\cdot0{,}5 \approx 9{,}8\,\text{N}$；$F_\perp = F_G\cos30° = 19{,}6\cdot0{,}866 \approx 17{,}0\,\text{N}$ ✓ **得分点：$\sin/\cos$ 用对 + 数值**
3. **c) 论证**：沿斜面方向的 $F_\parallel$ 未被支撑力抵消 → 产生沿斜面的加速度；$F_\perp$ 被法向力平衡 → 不产生运动。
   > *Klausur-Satz*: „Die Komponente parallel zur schiefen Ebene bewirkt die Beschleunigung, da sie nicht durch eine Gegenkraft ausgeglichen wird; die Komponente senkrecht zur Ebene wird durch die Normalkraft kompensiert und trägt nicht zur Bewegung bei." ✓ **得分点：区分两分量作用**（AFB II）

**Aufgabe 2** `[NRW-改编]`
1. **a) 合力**：$F = \sqrt{F_1^2+F_2^2} = \sqrt{6{,}0^2+8{,}0^2} = 10\,\text{N}$；$\tan\alpha = \dfrac{F_2}{F_1} = \dfrac{8}{6} \Rightarrow \alpha \approx 53°$（与 $F_1$ 方向）✓ **得分点：勾股 + 反正切**
2. **b) 平行四边形**：以 $F_1,F_2$ 为邻边作矩形，对角线即合力。✓ **得分点：图规范（箭头、标注）**
3. **c) 平衡**：需加**大小相等、方向相反**的力 $F_3 = 10\,\text{N}$，方向与合力相反（$180°$）。✓ **得分点：等大反向**（AFB II）

**Aufgabe 3** `[原创]`
1. **a) 分解**：取东为 $x$、北为 $y$。$v_x = 60\,\text{km/h}$，$v_y = 200\,\text{km/h}$；$v = \sqrt{60^2+200^2} \approx 209\,\text{km/h}$ ✓ **得分点：分方向 + 合成**
2. **b) 夹角**：$\tan\theta = \dfrac{v_x}{v_y} = \dfrac{60}{200} = 0{,}30 \Rightarrow \theta \approx 17°$（偏离正北）。✓ **得分点：反正切 + 相对哪条轴**
3. **c) 阐释**：选轴使分量为纯东/纯北后，两方向可独立相加，避免直接处理斜向合成；坐标系选择本身不改变物理结果，只改变计算复杂度。
   > *Klausur-Satz*: „Die Wahl des Koordinatensystems ändert das physikalische Ergebnis nicht, wohl aber den Rechenaufwand: Wählt man die Achsen längs der bekannten Geschwindigkeiten, lassen sich die Komponenten unmittelbar addieren." ✓ **得分点：说明坐标系的作用**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把标量当矢量（如把质量、功当矢量）；合力用算术相加不用矢量合成 | 先判「有无方向」；多矢量必须矢量合成 |
| **知识错** | $\sin$ 与 $\cos$ 用反；斜面题把 $F_\parallel$ 写成 $\cos$ | 画图先定角与斜边，再定哪条是邻/对边 |
| **表达错** | 只写大小不写方向；分解图无箭头、无角度标注 | 矢量答案必给「大小 + 方向」；图必标箭头与角 |

---

## 7. Vernetzung

- **上游**：`04_Physik/Newtonsche-Gesetze-und-Krafte.md`（力的概念）· `04_Physik/Gleichmaessig-beschleunigte-Bewegung-Freier-Fall.md`（运动学）
- **下游**：`04_Physik/Parabelwurf-zu-Feldablenkung.md`（平抛两分量）· `04_Physik/Kraft-und-Energie-Doppelperspektive.md`（受力视角）· EF-2 圆周运动（向心力方向）
- **横向**：`Mapping/Physik-DE-CN-Mapping.md EF-02` · `00_META/Curriculum/Deutschland/Physik-Oberstufe.md IF-EF-1`
- **术语卡**（建议入 csv）：`vektorielle Größe` / `Komponentenzerlegung` / `Vektoraddition` / `Kräftegleichgewicht` / `Superpositionsprinzip`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题。
