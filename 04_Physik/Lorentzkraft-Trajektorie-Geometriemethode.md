---
fach: Physik
thema: "Lorentzkraft und Trajektorie: Geometriemethode"
operatoren: [beschreiben, berechnen, herleiten, skizzieren, begründen, ermitteln, vergleichen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Physik, Mechanik]
stufe: "EF"
kursart: "GK|LK"
---

# Lorentzkraft und Trajektorie: Geometriemethode (洛伦兹力轨迹几何法)

> **中文理解**：带电粒子在**匀强磁场**中受洛伦兹力 $\vec F = q\vec v\times\vec B$，力**永远垂直于速度** → 只改变方向、不改变速率 → 轨迹是**匀速圆周**。德国 KLP 只把轨迹做到**定性/半定量描述**（「它是圆」），中国把它做成**四步工序**：① 定圆心 ② 找半径 ③ 算圆心角 ④ 算时间 $t=\dfrac{\theta}{2\pi}T$，再加**临界三圆**处理边界题 [据推断]。**本卡的核心主张：这套工序不需要任何 EF 之外的新知识点**——方向判定、$F_z=mv^2/r$、圆周七量、矢量分解**全部是 EF 已教内容**，它只是把「说是圆」升级为「算出圆心与半径」。
>
> **Klausur-Relevanz**：本项目第一价值点。GK-1 `Fadenstrahlrohr`（由测量值求 $m_e$）、`Zyklotron`，LK-1 `Bahnformen`、`gekreuzte Felder` 全挂在这条链上 [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Lorentzkraft` | 洛伦兹力 | Lorentz force | $\vec F = q\,\vec v\times\vec B$；垂直时 $F = qvB$ | **永远垂直速度 → 不做功** [已验证] |
| `Richtungsbestimmung` | 方向判定 | direction rule | 三指/左手规则；**负电荷再反向** | 与 `Zentripetalkraft` 指向圆心一致 [据推断] |
| `Zentripetalkraft` | 向心力 | centripetal force | $F_z = \dfrac{mv^2}{r} = m\omega^2 r$ | **EF-2 已教且要求定量** [已验证] |
| `Kreisbahnradius` | 圆轨道半径 | circular radius | $r = \dfrac{mv}{qB}$ | 由 $qvB = mv^2/r$ 一步得出 [据推断] |
| `Umlaufzeit` | 回旋周期 | period | $T = \dfrac{2\pi m}{qB}$ | **与速率无关**（回旋加速器原理） [据推断] |
| `Winkelgeschwindigkeit` | 角速度 | angular velocity | $\omega = 2\pi f = \dfrac{2\pi}{T} = \dfrac{v}{r}$ | **EF-2 圆周七量之一** [已验证] |
| `Kreiszentrum` | 圆心 | centre | 入射点处洛伦兹力方向的**垂线**上，距入射点 $r$ | 定圆心的几何关键 [据推断] |
| `Zentriwinkel` | 圆心角 | central angle | 圆心角 = 速度方向改变角 = 偏转角 | 几何转物理的桥梁 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 为什么轨迹是圆（定性一句话）

中文理解：洛伦兹力始终垂直于速度，因此**只改变速度方向、不改变速率**。匀速、力始终指向同一侧 → 匀速圆周运动。这一步**不需要新知识**：EF-2 已把「速率不变、方向变、有指向圆心的合力」定义成匀速圆周运动。

> *Klausur-Satz*: „Da die Lorentzkraft stets senkrecht zur Geschwindigkeit steht, verrichtet sie keine Arbeit und ändert den Betrag der Geschwindigkeit nicht; sie wirkt als Zentripetalkraft, sodass das Teilchen eine gleichförmige Kreisbewegung ausführt." [原创]

### 2.2 半径与周期（由 EF-2 的 $F_z$ 一步推出）

令洛伦兹力充当向心力：$qvB = \dfrac{mv^2}{r}$ → $r = \dfrac{mv}{qB}$；再由 $T = \dfrac{2\pi r}{v}$ 代入得 $T = \dfrac{2\pi m}{qB}$。

中文理解：**$r$ 与速率成正比，$T$ 与速率无关**。后者是 `Zyklotron` 能工作的前提（加速不改变回旋周期）——德国 GK 只要求借模拟理解，中国把它算出来 [据推断]。

> *Klausur-Satz*: „Setzt man die Lorentzkraft gleich der Zentripetalkraft, so folgt für den Bahnradius $r=\dfrac{mv}{qB}$ und für die Umlaufzeit $T=\dfrac{2\pi m}{qB}$. Die Umlaufzeit ist unabhängig von der Geschwindigkeit." [原创]

### 2.3 方向判定（与 EF-2 向心力方向一致）

中文理解：先由 $\vec v\times\vec B$ 定 $\vec F$ 的方向（正电荷用三指规则；**负电荷反向**），$\vec F$ 总指向圆心 → 圆心必在入射点**沿 $\vec F$ 方向**、距离 $r$ 处。

> *Klausur-Satz*: „Die Lorentzkraft wirkt bei positiver Ladung in Richtung von $\vec v\times\vec B$; bei negativer Ladung ist die Richtung umgekehrt. Sie zeigt stets zum Kreismittelpunkt." [原创]

### 2.4 Basiskonzept 落点

- **`Mathematisieren und Vorhersagen`**：由 $r=mv/(qB)$ 可**预测**粒子能否射出、打在何处 [已验证]。
- **`Superposition und Komponenten`**：速度与磁场不垂直时先分解出垂直分量 [据推断]。
- **`Erhaltung und Gleichgewicht`**：速率守恒（洛伦兹力不做功）[据推断]。

---

## 3. 解题方法 (Methoden)

### 3.1 几何化轨迹链 —— 四步工序

**编号步骤**：
1. **定圆心** —— 在入射点画速度垂线（即洛伦兹力方向），沿该方向截取 $r$ 得到圆心 $O$ —— *KLP 工具：`Lorentzkraft` 方向判定 + `Zentripetalkraft` 指向圆心*
2. **找半径** —— 用 $r=\dfrac{mv}{qB}$，或由几何关系（弦、切线、三角）反求 —— *KLP 工具：`Zentripetalkraft`（EF-2）+ `gleichförmige Kreisbewegung`*
3. **算圆心角** —— 圆心角 = 速度方向改变角 = 弦切角关系的几何结果 —— *KLP 工具：圆周运动几何 + `Komponentenzerlegung`（EF-1）*
4. **算时间** —— $t=\dfrac{\theta}{2\pi}T$，其中 $T=\dfrac{2\pi m}{qB}$ —— *KLP 工具：`Umlaufzeit` + `Winkelgeschwindigkeit`（EF-2 七量）*

> **判据 / 决策点**：题问「能否射出/打在边界何处」→ 属**临界问题**，进入 3.2；题问「转多久/偏多大角」→ 直接用四步工序。

### 3.2 临界三圆模型（把物理题变成几何题）

把「粒子能否射出磁场区域、打到边界何处」转化为「**圆与边界是否相交**」的纯几何判定：

| 模型 | 变化的量 | 几何操作 | 典型问法 |
|---|---|---|---|
| **旋转圆** | 入射**方向**变 | 圆心绕入射点转，半径不变 | 哪个方向射得最远/射不出 |
| **放缩圆** | 入射**速率**变 | 圆心在速度垂线上滑，半径随 $v$ 变 | 速率多大才恰好射出 |
| **平移圆** | 入射**位置**变 | 圆整体平移 | 边界上多宽的范围能射出 |

> *Klausur-Satz*: „Im Grenzfall berührt der Kreis die Grenzfläche gerade; die Bedingung ‚das Teilchen verlässt das Feld gerade noch' lässt sich daher als Tangentenbedingung rein geometrisch formulieren." [原创]

---

## 4. 🇨🇳 CN-Methode

### CN-Methode 1: 带电粒子偏转的「几何化轨迹链」（含临界三圆）

- **技法内容**：见 §3.1（四步工序）与 §3.2（三圆）。把「粒子能否射出/打到何处」转化为「圆与边界是否相交」。
- **DE-Anschluss（**关键：逐条确认全部工具 EF 已教**）**：
  - `Lorentzkraft` 与方向判定 —— GK-1 / LK-1 已教 [已验证]
  - `Zentripetalkraft` $F_z=mv^2/r$ 与 `gleichförmige Kreisbewegung` —— **EF-2 已教且要求定量** [已验证]
  - 圆周七量（$r,\varphi,T,f,v,\omega,a_z$）—— **EF-2 已教且要求相互关系** [已验证]
  - `Komponentenzerlegung` / `Vektoraddition` —— **EF-1 明示要求** [已验证]
  - 唯一「新」的一步：把 $qvB$ 与 $mv^2/r$ **等起来**——这只是「合力 = 向心力」这一 EF 已用过的做法换了个力，**不是新知识** [据推断]。
- **合规性**：✅ —— 全部工具落在 EF 范围内。这是**方法**（工序），不是**知识**（不引入超纲模型）。
- **Abitur 应用**：GK-1 `Fadenstrahlrohr`（求 $m_e$）、`Zyklotron`；LK-1 `Bahnformen`、`gekreuzte Felder`。**AFB II 为主**，临界三圆可上 **AFB III** [据推断]。
- **来源**：`[CN-课标]` 选必2.1.3 · `[CN-高考]` 高频题型（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（含 `Fadenstrahlrohr` 演示实验）[已验证] |
| Operator | `berechnen` / `herleiten` / `skizzieren` / `begründen` |
| AFB | I（判型）→ **II（半径/周期/时间计算）** → III（临界判定 + 模型局限） |
| 建议分值 / 时长 | 单题约 15–25 BE；EF Klausur 90 min [已验证] |

> ⚠️ **材料挂靠说明**：本节知识点在材料题中**以「给定 $B$、加速电压 $U$、粒子电荷与质量 → 求轨道半径或偏转时间」的形态出现**；在实验题中**以 `Fadenstrahlrohr`「测环形轨道直径 → 由 $r=mv/(qB)$ 与 $\frac12mv^2=eU$ 联立求 $m_e$」的形态出现**。答案须挂靠题给数据或实验读数 [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Elektron ($m_e = 9{,}1\cdot10^{-31}\,\text{kg}$, $e = 1{,}6\cdot10^{-19}\,\text{C}$) wird mit $U = 250\,\text{V}$ beschleunigt und tritt senkrecht in ein homogenes Magnetfeld $B = 1{,}0\,\text{mT}$ ein.
> a) Berechnen Sie die Eintrittsgeschwindigkeit $v$.
> b) Ermitteln Sie den Bahnradius $r$ und die Umlaufzeit $T$.
> c) Begründen Sie, warum $T$ unabhängig von $v$ ist, und erläutern Sie die Bedeutung für ein Zyklotron.

**Aufgabe 2** `[CN-改编]`
> Ein Proton tritt mit $v = 2{,}0\cdot10^{5}\,\text{m/s}$ senkrecht in ein Magnetfeld $B = 0{,}50\,\text{T}$ ein (Feldbereich als Quadrat der Seitenlänge $d = 0{,}30\,\text{m}$).
> a) Bestimmen Sie die Richtung der Lorentzkraft bei Eintritt senkrecht zur Seite (Skizze).
> b) Berechnen Sie $r$ und entscheiden Sie, ob das Proton den Feldbereich verlässt.
> c) Bestimmen Sie die Verweildauer im Feld (falls es austritt) bzw. begründen Sie, dass es eingeschlossen bleibt.

**Aufgabe 3** `[原创]`
> In einem Massenspektrometer werden einfach geladene Ionen gleicher Ladung $q$ und unterschiedlicher Masse mit derselben Geschwindigkeit $v$ in ein Magnetfeld eingeschossen.
> a) Leiten Sie her, wie der Auftreffort vom Radius $r$ abhängt.
> b) Zwei Ionensorten treffen im Abstand $\Delta x = 4{,}0\,\text{cm}$ auf. Ermitteln Sie die Massendifferenz, wenn $q=1{,}6\cdot10^{-19}\,\text{C}$, $v=1{,}0\cdot10^{5}\,\text{m/s}$, $B=0{,}20\,\text{T}$.
> c) Erläutern Sie an diesem Beispiel, wie die Geometriemethode die Messung von Massen ermöglicht.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) 加速**：$\tfrac12 m_e v^2 = eU \Rightarrow v=\sqrt{\dfrac{2eU}{m_e}} = \sqrt{\dfrac{2\cdot1{,}6\cdot10^{-19}\cdot250}{9{,}1\cdot10^{-31}}} \approx 9{,}4\cdot10^{6}\,\text{m/s}$ ✓ **得分点：能量守恒式 + 数值 + 单位**
2. **b) 半径与周期**：$r=\dfrac{m_ev}{eB} = \dfrac{9{,}1\cdot10^{-31}\cdot9{,}4\cdot10^{6}}{1{,}6\cdot10^{-19}\cdot1{,}0\cdot10^{-3}} \approx 5{,}3\cdot10^{-2}\,\text{m}=5{,}3\,\text{cm}$
   $$T=\dfrac{2\pi m_e}{eB}=\dfrac{2\pi\cdot9{,}1\cdot10^{-31}}{1{,}6\cdot10^{-19}\cdot1{,}0\cdot10^{-3}}\approx 3{,}6\cdot10^{-8}\,\text{s}$$ ✓ **得分点：$r$ 式 + $T$ 式各 1**
3. **c) 解释**：$T=\dfrac{2\pi m}{qB}$ 中不含 $v$ → 与速率无关；`Zyklotron` 中每次过间隙加速只增大 $r$（$r\propto v$）而**不改变回旋周期**，因此可用固定频率的交变电压持续同步加速。✓ **得分点：由公式说明「不含 v」+ 回旋加速器应用**（AFB II）

**Aufgabe 2** `[CN-改编]`
1. **a) 方向**：$\vec v$ 与 $\vec B$ 垂直，由 $\vec v\times\vec B$（正电荷）得 $\vec F$ 方向；画出指向圆心的力 → 圆心在力方向垂线上。✓ **得分点：规则正确 + 箭头 + 标注圆心方向**
2. **b) 半径**：$r=\dfrac{m_pv}{qB}=\dfrac{1{,}67\cdot10^{-27}\cdot2{,}0\cdot10^{5}}{1{,}6\cdot10^{-19}\cdot0{,}50}\approx 4{,}2\cdot10^{-3}\,\text{m}=4{,}2\,\text{mm}$
   因 $r \ll d=0{,}30\,\text{m}$，圆轨道远小于场区 → **不会触碰边界，始终在场内**。✓ **得分点：$r$ 计算 + 与 $d$ 比较判定**
3. **c) 判定**：粒子作完整圆周 → 一个周期后回到入射点附近并周期性重复；**若题给边界小于 $2r$ 才需判能否射出**。本题 $2r\approx8{,}4\,\text{mm}\ll d$ → 保持闭合轨道。✓ **得分点：结论 + 临界比较（$2r$ vs $d$）**（AFB III）

**Aufgabe 3** `[原创]`
1. **a) 推导**：粒子进入磁场后作半圆（$180°$）后打到探测器 → 直径 $2r=\dfrac{2mv}{qB}$ 即落点间距与质量成正比。✓ **得分点：半圆几何 + $r$ 式代入**
2. **b) 质量差**：$\Delta x = \dfrac{2v}{qB}\Delta m \Rightarrow \Delta m = \dfrac{\Delta x\cdot qB}{2v}=\dfrac{0{,}040\cdot1{,}6\cdot10^{-19}\cdot0{,}20}{2\cdot1{,}0\cdot10^{5}}\approx 6{,}4\cdot10^{-27}\,\text{kg}$ ✓ **得分点：几何关系 $2r$ + 数值**
3. **c) 阐释**：把「测质量」转化为「测几何距离」——由 $r=mv/(qB)$ 得 $m=\dfrac{qBr}{v}$，落点间距直接读质量差，这就是质谱仪原理。✓ **得分点：把几何量翻译回物理量**（AFB II）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 负电荷（电子）方向判定忘反向，导致圆心画在另一侧 | 画完 $\vec v\times\vec B$ 后**再翻一次**（$q<0$） |
| **知识错** | 把 $r=mv/(qB)$ 与电场抛物的 $y=\frac12at^2$ 混用；把 $T$ 与 $v$ 挂钩 | 分清「磁场→圆、电场→抛物线」；牢记 $T$ 与 $v$ 无关 |
| **表达错** | 只画圆不给圆心/半径；`skizzieren` 不标 $\vec v,\vec B,\vec F$ 与圆心 | 图上必须出现三矢量 + 圆心 $O$ + 半径 $r$ + 圆心角 $\theta$ |

---

## 7. Vernetzung

- **上游**：`Kreisbewegung-und-Gravitation.md`（圆周七量 + $F_z$，**本卡的直接前置**）· `Newtonsche-Gesetze-und-Krafte.md`（力与加速度）
- **下游**：GK-1 `Fadenstrahlrohr` / `Zyklotron`；LK-1 `Bahnformen` / `gekreuzte Felder`
- **横向**：`04_Physik/Klausur-Training/CN-Physik-Training.md`（CN 技法切片）；`03_Mathe` 三角函数与几何
- **术语卡**（建议入 csv）：`Lorentzkraft` / `Zentripetalkraft` / `Kreisbahnradius` / `Umlaufzeit` / `Zentriwinkel`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[CN-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题。
