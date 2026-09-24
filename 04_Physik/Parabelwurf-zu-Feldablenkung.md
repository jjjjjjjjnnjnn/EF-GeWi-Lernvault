---
fach: Physik
thema: "Vom waagerechten Wurf zur Feldablenkung (Isomorphie-Übersetzung)"
operatoren: [beschreiben, erklären, berechnen, herleiten, skizzieren, begründen, ermitteln]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Q1, Physik, Mechanik]
stufe: "EF|Q1"
kursart: "GK|LK"
---

# Vom waagerechten Wurf zur Feldablenkung (平抛 → 电场偏转同构翻译表)

> **中文理解**：EF 已把**平抛**教成「水平匀速 + 竖直匀加速」的二维运动，并要求用 `Komponentenzerlegung`（分量分解）处理 [已验证]。Q 阶段带电粒子在匀强电场中的偏转，本质是**同一套运动学换到电学语境**：把「重力场」换成「匀强电场」，把 $g$ 换成 $a = \dfrac{qE}{m}$（由 $F = qE$ 与牛顿第二定律一步得出），**其余完全不动**——沿场方向匀加速、垂直场方向匀速、轨迹为抛物线、偏转角 $\tan\theta = v_\perp/v_\parallel$、侧移 $y = \tfrac12 a t^2$ [已验证]。翻译表一旦建立，平抛的**全部现成结论可直接搬用**。这是**性价比最高的前置补强**：EF 已教分解，只需补「力 → 加速度」一步 [已验证]。
>
> **Klausur-Relevanz**：§4 缺口清单第 9 项（★★，性价比最高）。它直接化解 Abitur 台阶③「二维运动的电学化」，对应 GK-1 `Bahnformen von geladenen Teilchen in homogenen Feldern` 与 LK-1 `Längs- und Querfelder`。**这个技法本身就是 AFB II 的定义**（`Übertragen auf vergleichbare neue Zusammenhänge`）[已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `waagerechter Wurf` | 平抛 | horizontal throw | 水平匀速 + 竖直匀加速 | EF-1 唯一二维运动 [已验证] |
| `Komponentenzerlegung` | 分量分解 | component decomposition | 把运动拆成两独立方向 | EF-1 明示要求 [已验证] |
| `elektrische Feldstärke` | 电场强度 | electric field strength | $E = \dfrac{F}{q}$ | GK-1 定义式 [已验证] |
| `Coulomb'sches Gesetz` | 库仑定律 | Coulomb's law | $F = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2}$ | LK-1 独立重点 [已验证] |
| `Feldbeschleunigung` | 场致加速度 | field acceleration | $a = \dfrac{qE}{m}$ | 平抛里的「$g$」 [据推断] |
| `Ablenkung` | 偏转 | deflection | 垂直于场方向的侧移 | $y=\tfrac12 at^2$ [据推断] |
| `Ablenkwinkel` | 偏转角 | deflection angle | $\tan\theta = \dfrac{v_\perp}{v_\parallel}$ | 与平抛同构 [据推断] |
| `Parabelbahn` | 抛物线轨迹 | parabolic path | 匀强场中电荷的轨迹 | 与平抛同形 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 双向翻译表（**本卡核心**）

中文理解：**逐项替换**，左边平抛的每个量，在右边都有唯一对应 [据推断]。

| 平抛（重力场） | ⇄ | 电场偏转（匀强电场） | 备注 |
|---|---|---|---|
| 重力场 $g$ | ⇄ | 场致加速度 $a=\dfrac{qE}{m}$ | 唯一的实质替换 [据推断] |
| 重力 $F_G = mg$ | ⇄ | 电场力 $F = qE$ | 力 → 加速度的一步 |
| 水平方向匀速 $v_x = v_0$ | ⇄ | 垂直场方向匀速 $v_\parallel = v_0$ | 不变 |
| 竖直方向匀加速 $a=g$ | ⇄ | 沿场方向匀加速 $a=qE/m$ | 不变（换成 $a$） |
| 轨迹：抛物线 | ⇄ | 轨迹：抛物线 | 同形 [据推断] |
| 下落位移 $y=\tfrac12 gt^2$ | ⇄ | 侧移 $y=\tfrac12 at^2$ | 同式 |
| 落地时间 $t=\sqrt{2h/g}$ | ⇄ | 穿出时间 $t=\dfrac{L}{v_0}$（由板长定） | 时间条件换源 |
| 偏转角 $\tan\theta=\dfrac{gt}{v_0}$ | ⇄ | $\tan\theta=\dfrac{at}{v_0}$ | 同式 |
| 落地速度 $v=\sqrt{v_0^2+(gt)^2}$ | ⇄ | 出射速度 $v=\sqrt{v_0^2+(at)^2}$ | 同式 |

> *Klausur-Satz*: „Die Bewegung eines geladenen Teilchens in einem homogenen elektrischen Querfeld ist strukturgleich mit dem waagerechten Wurf: In beiden Fällen überlagern sich eine gleichförmige Bewegung senkrecht zur Feldrichtung und eine gleichmäßig beschleunigte Bewegung in Feldrichtung; an die Stelle der Fallbeschleunigung $g$ tritt die Feldbeschleunigung $a=\dfrac{qE}{m}$." [原创]

### 2.2 唯一的「新」步骤：力 → 加速度

中文理解：EF 已会「已知加速度 → 分解运动」；Q 只多一步「**由力求加速度**」[据推断]。

- GK-1：由 `E = F/q` 得 $F = qE$ → $a = \dfrac{qE}{m}$ [已验证]。
- LK-1：也可由 `Coulomb'sches Gesetz` 与场强叠加先求 $E$，再同上 [已验证]。
- 在 `Plattenkondensator` 中还可由 $E = \dfrac{U}{d}$ 把电压换成场强（GK-1 用它建立 $U$ 与 $E$ 的关系）[已验证]。

> *Klausur-Satz*: „Aus der elektrischen Feldstärke $E=\dfrac{F}{q}$ folgt für die Kraft auf ein geladenes Teilchen $F=qE$; mit dem zweiten Newton'schen Gesetz ergibt sich daraus die Feldbeschleunigung $a=\dfrac{qE}{m}$." [原创]

### 2.3 与平抛的**唯一区别**（防止生搬硬套）

中文理解：结构同形，但**边界条件与初始条件常不同**，这是失分点 [据推断]。

| 项 | 平抛 | 电场偏转 |
|---|---|---|
| 初速度方向 | 水平 | 垂直场方向（入射） |
| 「落地」条件 | 由高度 $h$ 定时间 | 由板长 $L$ 或出射条件定时间 |
| 场区外 | 继续抛体运动 | 离开场区后**做匀速直线**（若为磁场则另论） |
| 电荷符号 | — | **负电荷 $a$ 方向反向**（$q<0$）[据推断] |

> *Klausur-Satz*: „Wichtig ist, dass nur die Beschleunigung ausgetauscht wird: Die Struktur der Bewegung bleibt erhalten, die Randbedingungen (Länge des Kondensators, Vorzeichen der Ladung) müssen jedoch neu geprüft werden." [原创]

### 2.4 Basiskonzept 落点

- **`Superposition und Komponenten`**：两方向独立叠加（本卡的核心轴）[据推断]。
- **`Mathematisieren und Vorhersagen`**：由 $a$ 预测侧移与偏转角 [据推断]。
- **`Erhaltung und Gleichgewicht`**：沿场方向用能量记账（$qU = \tfrac12 mv^2$ 加速段）[据推断]。

---

## 3. 解题方法 (Methoden)

### 3.1 「平抛模板」四步移植法

**编号步骤**：
1. **定初速度方向与场方向**，确认二者垂直（若平行则属 Längsfeld，另用能量法）—— *KLP 工具：`Komponentenzerlegung`（EF-1）*
2. **求场致加速度** $a = \dfrac{qE}{m}$（或先由 $E=U/d$ / Coulomb 求 $E$）—— *KLP 工具：`elektrische Feldstärke`（GK-1）/ `Coulomb'sches Gesetz`（LK-1）*
3. **两方向分列**：垂直场方向 $x = v_0 t$（匀速）；沿场方向 $y = \tfrac12 a t^2$（匀加速）—— *KLP 工具：`waagerechter Wurf` 模板（EF-1）*
4. **按边界条件求时间**，再求侧移/偏转角/出射速度 —— *KLP 工具：`gleichmäßig beschleunigte Bewegung`（EF-1）*

> **判据 / 决策点**：题问「侧移多少 / 偏转多大角」→ 直接用四步；题问「能否穿出板 / 打在何处」→ 属临界问题，先算穿出所需侧移与板间距比较 [据推断]。

### 3.2 加速段 + 偏转段（两段式）

1. **加速段**（电场与初速平行）：$qU_1 = \tfrac12 mv_0^2$ → 求入射速度 $v_0$ —— *KLP 工具：能量守恒（EF-1）*
2. **偏转段**（电场与初速垂直）：套 3.1 四步 —— *KLP 工具：本卡 §2.1 翻译表*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode 4: 平抛 → 电场中偏转的同构翻译

- **技法内容**：把电场偏转**逐项翻译**成平抛（见 §2.1 表）：`g → a = qE/m`，其余不动。类平抛处理，平抛全部结论直用。
- **DE-Anschluss**：`waagerechter Wurf`（EF-1 已教，EF 唯一二维运动）· `Komponentenzerlegung`（EF-1 已教）· `Newton'sche Gesetze`（EF-1）· `gleichmäßig beschleunigte Bewegung`（EF-1）。Q 只需补一步「Coulomb 力 → 加速度」（GK-1 有 `E = F/q`；LK-1 有 Coulomb）[已验证]。
- **合规性**：✅ —— **性价比最高的前置补强**：EF 已教平抛分解，只需补「力 → 加速度」一步，零新增知识块（对应 Curriculum §4 台阶③官方结论）[已验证]。
- **Abitur 应用**：GK-1 `Bahnformen von geladenen Teilchen in homogenen Feldern`；LK-1 `Längs- und Querfelder`。**AFB II**（`Übertragen auf vergleichbare neue Zusammenhänge`——本技法本身就是 AFB II 的定义）[已验证]。
- **来源**：`[CN-课标]` 必修3.1.5 + 必修2.2.2；`[CN-教材]` 类平抛处理（**原创改写，不搬原题**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含演示实验）[已验证] |
| Operator | `berechnen` / `herleiten` / `skizzieren` / `begründen` / `ermitteln` |
| AFB | I（判型：是平抛同构还是磁场圆周）→ **II（求 $a$、侧移、偏转角）** → III（临界判定 + 模型局限） |
| 建议分值 / 时长 | 单题约 15–25 BE；EF Klausur 90 min / Abitur GK 255 / LK 300 min [已验证] |

> ⚠️ **材料挂靠说明**：本卡知识点在材料题中**以「给定 $U$、板长 $L$、板间距 $d$ 与粒子电荷质量 → 求侧移或偏转角」的形态出现**；在实验题中**以「用示波管/电子束偏转装置测偏转量与电压的关系 → 由 $y=\tfrac12 a t^2$ 与 $a=qE/m$ 验证」的形态出现**。**物理禁止纯论述题**，答案须挂靠题给数据或实验读数 [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Elektron ($e = 1{,}6\cdot10^{-19}\,\text{C}$, $m_e = 9{,}1\cdot10^{-31}\,\text{kg}$) tritt mit $v_0 = 2{,}0\cdot10^{7}\,\text{m/s}$ senkrecht in ein homogenes Querfeld eines Plattenkondensators ein ($U = 100\,\text{V}$, Plattenabstand $d = 2{,}0\,\text{cm}$, Plattenlänge $L = 5{,}0\,\text{cm}$).
> a) Berechnen Sie die Feldbeschleunigung $a$.
> b) Ermitteln Sie die Zeit im Feld und die seitliche Ablenkung $y$ beim Austritt.
> c) Begründen Sie, warum diese Bewegung strukturgleich mit dem waagerechten Wurf ist.

**Aufgabe 2** `[CN-改编]`
> Ein Proton ($q = 1{,}6\cdot10^{-19}\,\text{C}$, $m_p = 1{,}67\cdot10^{-27}\,\text{kg}$) wird durch $U_1 = 500\,\text{V}$ beschleunigt und tritt dann in ein Querfeld ein.
> a) Berechnen Sie die Eintrittsgeschwindigkeit $v_0$ (Energieansatz).
> b) Stellen Sie die Bahngleichung $y(x)$ im Feld auf und zeigen Sie, dass sie eine Parabel beschreibt.
> c) Bestimmen Sie den Ablenkwinkel beim Austritt für $E = 2{,}0\cdot10^{4}\,\text{V/m}$ und eine Feldlänge von $4{,}0\,\text{cm}$.

**Aufgabe 3** `[原创]`
> Zwei Teilchen mit gleicher Ladung $q$, aber unterschiedlicher Masse, treten mit derselben Geschwindigkeit $v_0$ in dasselbe Querfeld ein.
> a) Leiten Sie her, wie die Ablenkung $y$ von der Masse abhängt.
> b) Begründen Sie, welches der beiden Teilchen stärker abgelenkt wird.
> c) Erläutern Sie an diesem Beispiel, welche Rolle die Strukturgleichheit zum waagerechten Wurf für die Vorhersage spielt.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) 加速度**：$E = \dfrac{U}{d} = \dfrac{100}{0{,}020} = 5{,}0\cdot10^{3}\,\text{V/m}$；$a = \dfrac{eE}{m_e} = \dfrac{1{,}6\cdot10^{-19}\cdot5{,}0\cdot10^{3}}{9{,}1\cdot10^{-31}} \approx 8{,}8\cdot10^{14}\,\text{m/s}^2$ ✓ **得分点：$E=U/d$ + $a=qE/m$ + 数值单位**
2. **b) 时间与侧移**：$t = \dfrac{L}{v_0} = \dfrac{0{,}050}{2{,}0\cdot10^{7}} = 2{,}5\cdot10^{-9}\,\text{s}$；$y = \tfrac12 a t^2 = \tfrac12\cdot8{,}8\cdot10^{14}\cdot(2{,}5\cdot10^{-9})^2 \approx 2{,}8\cdot10^{-3}\,\text{m} = 2{,}8\,\text{mm}$ ✓ **得分点：$t=L/v_0$ + $y=\tfrac12 at^2$**
3. **c) 论证**：垂直场方向匀速、沿场方向匀加速，与平抛的两分量结构一致，只是 $g$ 换成 $a=qE/m$。
   > *Klausur-Satz*: „Die Bewegung ist strukturgleich mit dem waagerechten Wurf, weil senkrecht zum Feld eine gleichförmige Bewegung und in Feldrichtung eine gleichmäßig beschleunigte Bewegung vorliegen; die Fallbeschleunigung $g$ ist lediglich durch $a=\dfrac{eE}{m_e}$ ersetzt." ✓ **得分点：两分量 + 替换关系**（AFB II）

**Aufgabe 2** `[CN-改编]`
1. **a) 入射速度**：$qU_1 = \tfrac12 m_p v_0^2 \Rightarrow v_0 = \sqrt{\dfrac{2qU_1}{m_p}} = \sqrt{\dfrac{2\cdot1{,}6\cdot10^{-19}\cdot500}{1{,}67\cdot10^{-27}}} \approx 3{,}1\cdot10^{5}\,\text{m/s}$ ✓ **得分点：能量守恒式 + 数值**
2. **b) 轨道方程**：$x = v_0 t \Rightarrow t = x/v_0$；$y = \tfrac12 a t^2 = \tfrac12 a \dfrac{x^2}{v_0^2} = \dfrac{a}{2v_0^2}x^2$ —— 形如 $y = kx^2$，即抛物线 ✓ **得分点：消去 t + 指出二次形式**
3. **c) 偏转角**：$a = \dfrac{qE}{m_p} = \dfrac{1{,}6\cdot10^{-19}\cdot2{,}0\cdot10^{4}}{1{,}67\cdot10^{-27}} \approx 1{,}9\cdot10^{12}\,\text{m/s}^2$；$t = \dfrac{L}{v_0} = \dfrac{0{,}040}{3{,}1\cdot10^{5}} \approx 1{,}3\cdot10^{-7}\,\text{s}$；$\tan\theta = \dfrac{at}{v_0} = \dfrac{1{,}9\cdot10^{12}\cdot1{,}3\cdot10^{-7}}{3{,}1\cdot10^{5}} \approx 0{,}80 \Rightarrow \theta \approx 39°$ ✓ **得分点：$\tan\theta=v_\perp/v_\parallel$ + 数值**（AFB II）

**Aufgabe 3** `[原创]`
1. **a) 依赖关系**：$y = \dfrac{a}{2v_0^2}L^2 = \dfrac{qE}{2mv_0^2}L^2 \Rightarrow y \propto \dfrac{1}{m}$ ✓ **得分点：代入 $a=qE/m$ + 得出反比**
2. **b) 判定**：$y \propto 1/m$ → **质量小的偏转大** ✓ **得分点：反比结论**
3. **c) 阐释**：因结构与平抛同构，可直接沿用「垂直方向匀速定时间、沿场方向匀加速定侧移」的结论，**无需重新建模**即可预测质量对偏转的影响（如质谱/偏转分离的思路）。
   > *Klausur-Satz*: „Weil die Bewegung strukturgleich mit dem waagerechten Wurf ist, lassen sich dessen Ergebnisse unmittelbar übertragen: Bei gleicher Geschwindigkeit und Ladung wird das leichtere Teilchen stärker abgelenkt, da die Ablenkung umgekehrt proportional zur Masse ist." ✓ **得分点：结构迁移 + 预测结论**（AFB II）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把电场偏转当磁场圆周运动处理（混用 $r=mv/(qB)$） | 记清：**电场（匀强）→ 抛物线；磁场 → 圆周** |
| **知识错** | 忘记把 $g$ 换成 $a=qE/m$；负电荷 $a$ 方向忘反向 | 先求 $a$ 并标方向；$q<0$ 时 $a$ 反向 |
| **表达错** | 直接套 $y=\tfrac12 gt^2$ 不说明替换；$t$ 的来源（板长）写错 | 显式写出 $a=qE/m$；$t=L/v_0$ 由边界条件给出 |

---

## 7. Vernetzung

- **上游**：`04_Physik/Gleichmaessig-beschleunigte-Bewegung-Freier-Fall.md`（含平抛轨迹，本卡直接前置）· `04_Physik/Vektorielle-Groessen-Methoden.md`（分量分解通用套路）
- **下游**：GK-1 `Bahnformen von geladenen Teilchen in homogenen Feldern`；LK-1 `Längs- und Querfelder` / `gekreuzte Felder`
- **横向**：`Mapping/Physik-DE-CN-Mapping.md CN-Methode 4` · `04_Physik/Kraft-und-Energie-Doppelperspektive.md`（加速段能量法）
- **术语卡**（建议入 csv）：`waagerechter Wurf` / `Feldbeschleunigung` / `Ablenkwinkel` / `Parabelbahn` / `Komponentenzerlegung`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[CN-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题或中国高考原题。
