---
fach: Physik
thema: "Impuls und eindimensionale Stöße"
operatoren: [beschreiben, erklären, berechnen, begründen, auswerten, bewerten, vergleichen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Physik, Mechanik]
stufe: "EF"
kursart: "GK|LK"
---

# Impuls und eindimensionale Stöße (动量与一维碰撞)

> **中文理解**：动量 $\vec p = m\vec v$ 是 EF-1「守恒定律」板块里**唯一的矢量守恒量**，也是整个 EF 里 `Erhaltung und Gleichgewicht`（守恒与平衡）这条 Basiskonzept 的**定量落点** [已验证]。核心只有一句：**系统不受外冲量时，总动量守恒**。碰撞（`Stoßvorgänge`）是它最标准的载体——一维碰撞分**弹性**（动量 + 动能都守恒）与**非弹性**（只动量守恒，动能减少；完全非弹性时碰后共速）。考试形态：材料题给一个碰撞/反冲/爆炸情境（小车、台球、火箭、子弹-木块），要求 `auswerten`（数据处理）或 `berechnen`（联立求解），末问常接 `bewerten`（如安全气囊、防撞设计）——**任何答案都必须挂靠材料或实验，物理禁止纯论述题** [已验证]。
>
> **Klausur-Relevanz**：现有 8 篇 Physik 笔记对 `Impuls` 与 `Stoßvorgänge` **零覆盖**，而它是 EF 内即可闭环、且是 Q 阶段 GK-2/LK-3「用能量与动量守恒分析光与物质相互作用」的前置 [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Impuls` | 动量 | momentum | $\vec p = m\vec v$，单位 $\mathrm{kg\cdot m/s} = \mathrm{N\cdot s}$ | **矢量**，方向即速度方向 [已验证] |
| `Impulsänderung` | 动量变化 | change of momentum | $\Delta \vec p = \vec p_2 - \vec p_1$ | 先定正方向再算 [据推断] |
| `Kraftstoß` / `Impulsübertrag` | 冲量 | impulse | $\vec F\cdot\Delta t = \Delta\vec p$（变力时 $\int \vec F\,\mathrm dt$） | EF 只用平均力形式 [据推断] |
| `Impulserhaltungssatz` | 动量守恒定律 | conservation of momentum | $\sum \vec p_{\text{vor}} = \sum \vec p_{\text{nach}}$ | 条件：**无外冲量**（内力远大于外力）[已验证] |
| `elastischer Stoß` | 弹性碰撞 | elastic collision | 动量守恒 **且** 动能守恒 | 碰后不共速（除等质量）[据推断] |
| `unelastischer Stoß` | 非弹性碰撞 | inelastic collision | 只动量守恒，$E_{\text{kin}}$ 减少 | 能量差变成热/声/形变 [据推断] |
| `vollkommen unelastischer Stoß` | 完全非弹性碰撞 | perfectly inelastic collision | 动量守恒 + **碰后共速** $v' = \dfrac{m_1v_1+m_2v_2}{m_1+m_2}$ | 动能损失最大 [据推断] |
| `Stoßpartner` | 碰撞体 | collision partner | 参与碰撞的两个（或多个）物体 | 分析前先圈出系统边界 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 动量与冲量：牛顿第二定律的另一种写法

动量的意义在于把「力」与「时间」打包：力在时间上的累积（冲量）等于动量的改变。

中文理解：$\vec F\cdot\Delta t = \Delta\vec p$ 是牛顿第二定律 $\vec F = m\vec a = \dfrac{\Delta\vec p}{\Delta t}$ 的变形。它的价值在于——**当力是变力、时间极短时**（碰撞、打击），用冲量-动量关系比用加速度方便得多。

> *Klausur-Satz*: „Nach dem Impulssatz ist der Kraftstoß $\vec F\cdot\Delta t$ gleich der Änderung des Impulses: $\vec F\cdot\Delta t = \Delta\vec p$. Bei einem Stoß wirkt eine große Kraft über eine sehr kurze Zeit; die Wirkung lässt sich daher zweckmäßig über den Impulsübertrag beschreiben." [原创]

### 2.2 动量守恒定律及其成立条件

中文理解：**系统内部**物体之间的相互作用力（内力）总是成对出现、大小相等方向相反，因此系统总动量不变——**前提是系统不受外力冲量**。碰撞时相互作用力极大、作用时间极短，外力冲量可忽略，故动量守恒成立。

> *Klausur-Satz*: „In einem abgeschlossenen System bleibt der Gesamtimpuls erhalten, da die inneren Kräfte nach dem dritten Newtonschen Gesetz stets paarweise entgegengesetzt wirken und sich gegenseitig aufheben: $\sum \vec p_{\text{vor}} = \sum \vec p_{\text{nach}}$." [原创]

⚠️ **判据（易错）**：动量守恒 ≠ 动能守恒。动量是矢量（有方向），动能是标量（无方向）。**弹性碰撞两个都守恒，非弹性碰撞只有动量守恒** [据推断]。

### 2.3 三类一维碰撞的判别

| 类型 | 动量 | 动能 | 额外条件 | 判别信号 |
|---|---|---|---|---|
| 弹性 `elastisch` | ✅ 守恒 | ✅ 守恒 | 无 | 题中给「弹性/verlustfrei」或问「碰撞后速度」 |
| 非弹性 `unelastisch` | ✅ 守恒 | ❌ 减少 | 需给出动能损失或碰后一个速度 | 题中给能量损失量 |
| 完全非弹性 `vollkommen unelastisch` | ✅ 守恒 | ❌ 损失最大 | **碰后共速** | 题中给「粘在一起/联合/ineinander verhakt」 |

> *Klausur-Satz*: „Bei einem vollkommen unelastischen Stoß bewegen sich beide Körper nach dem Stoß mit derselben Geschwindigkeit weiter; nur der Impuls, nicht aber die kinetische Energie bleibt erhalten." [原创]

### 2.4 Basiskonzept 落点

- **`Erhaltung und Gleichgewicht`**：动量守恒是 EF 力学里**可严格记账**的守恒量，与机械能守恒并列 [已验证]。
- **`Superposition und Komponenten`**：动量是矢量，二维情形要作分量分解（EF 只考一维）[据推断]。
- **`Mathematisieren und Vorhersagen`**：由守恒式**预测**碰后速度——正是「用方程预判结果」 [据推断]。

---

## 3. 解题方法 (Methoden)

### 3.1 一维碰撞五步法（标准程序）

**编号步骤**：
1. **圈定系统 + 确认无外冲量** —— *KLP 工具：`Impulserhaltungssatz` 的成立条件* [已验证]
2. **规定正方向**（通常取初速度较大者方向为正），并在图上标出碰前/碰后所有速度矢量 —— *KLP 工具：`vektorielle Größen`（EF-1 明示要求）* [已验证]
3. **写出动量守恒方程**：$m_1v_1 + m_2v_2 = m_1v_1' + m_2v_2'$ —— *KLP 工具：`Impuls` + `Impulserhaltungssatz`*
4. **判碰撞类型并补第二条方程**：
   - 弹性 → 加动能守恒 $\frac12m_1v_1^2+\frac12m_2v_2^2 = \frac12m_1v_1'^2+\frac12m_2v_2'^2$
   - 完全非弹性 → 加共速 $v_1' = v_2' = v'$
   —— *KLP 工具：`Energie`/`Energiebilanzen`（EF-1）*
5. **联立求解 + 单位/合理性检查**（方向符号、能量是否不增）—— *KLP 工具：`berechnen` 官方定义（从 Ansatz 出发呈示过程）* [已验证]

> **判据 / 决策点**：题中出现「弹性」或要求同时求两个未知速度 → 用弹性；出现「粘在一起/共速」→ 完全非弹性；只给一个未知且明确说能量损失 → 非弹性（用动量守恒 + 能量账）。

### 3.2 反冲与爆炸（同一套方法的反向应用）

爆炸/反冲时碰前总动量为零（或已知），碰后仍守恒 → $0 = m_1v_1' + m_2v_2'$。**工具完全同 3.1**，只是初态简化。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 守恒律选择策略（**第一判据是矢量性**）

- **技法内容**：把「该用动量还是动能」做成三级决策 —— ① **矢量性**：要方向/分量 → 动量（矢量式，先定正方向）；只问大小/能量 → 动能（标量式）。② **已知量/过程特征**：涉**时间** → 动量定理；涉**位移** → 动能定理；**变力做功** → 动能定理（对曲线运动也成立）；**变力冲量**（平均力、流体）→ 动量定理。③ **过程类型**：碰撞/爆炸/反冲（极短时间、内力远大于外力）→ **动量守恒**；摩擦生热/多过程 → 能量守恒。组合解：动量守恒 + 能量守恒联立解一维碰撞。
- **DE-Anschluss**：`Impuls` 与 `Stoßvorgänge`（**EF-1 已教**）· `Energie`/`Energiebilanzen`（**EF-1 已教**）· 「从受力与从能量两个角度分析运动」（**EF-1 明文要求的双视角** [已验证]）· `vektorielle Größen`（EF-1）。**零新增知识**。
- **合规性**：✅ —— 两条定理德国都有，本技法只是**选择流程**，不引入任何超纲知识块。
- **Abitur 应用**：EF-1 `Stoßvorgänge` 与 `Energiebilanzen`；GK-2/LK-3「用能量与动量守恒分析光与物质相互作用」；GK-4/LK-4 的 `Massendefekt`（守恒原理的广义化）。**AFB II**，联立解可上 **AFB III** [据推断]。
- **来源**：`[CN-课标]` 必修2.1.2 + 选必1.1.1 · `[CN-高考]` 选择策略训练（**原创改写**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含演示实验，如气垫导轨/摆球碰撞）[已验证] |
| Operator | `auswerten` / `berechnen` / `begründen`（末问可 `bewerten`） |
| AFB | I（读取数据）→ **II（守恒式转移与联立）** → III（联立解 + 评价） |
| 建议分值 / 时长 | 单题约 15–20 BE；EF 平时 Klausur 90 min（实验可 +45）[已验证] |

> ⚠️ **材料挂靠说明（物理硬约束）**：本节知识点在材料题中**以「给定两物体质量与初速度表 / 碰撞前后速度测量表 / 气垫导轨光电门数据」的形态出现**；在实验题中**以「用光电门测碰前后速度 → 验证动量守恒」的形态出现**。答案必须引用题给数据，**禁止脱离材料纯论述** [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Güterwagen der Masse $m_1 = 2{,}0\,\text{t}$ rollt mit $v_1 = 3{,}0\,\text{m/s}$ auf einen ruhenden Wagen der Masse $m_2 = 4{,}0\,\text{t}$ auf und kuppelt automatisch an (vollkommen unelastischer Stoß).
> a) Begründen Sie, dass der Gesamtimpuls der beiden Wagen erhalten bleibt.
> b) Berechnen Sie die gemeinsame Geschwindigkeit nach dem Ankuppeln.
> c) Ermitteln Sie den Anteil der kinetischen Energie, der in Verformung und Wärme umgewandelt wird.

**Aufgabe 2** `[CN-改编]`
> Auf einer reibungsarmen Bahn stößt eine Kugel 1 ($m_1 = 0{,}20\,\text{kg}$, $v_1 = 4{,}0\,\text{m/s}$) zentral auf eine ruhende Kugel 2 ($m_2 = 0{,}60\,\text{kg}$). Der Stoß sei elastisch.
> a) Stellen Sie das Gleichungssystem aus Impuls- und Energieerhaltung auf.
> b) Berechnen Sie beide Geschwindigkeiten nach dem Stoß.
> c) Vergleichen Sie mit dem Ergebnis von Aufgabe 1 und begründen Sie den Unterschied.

**Aufgabe 3** `[原创]`
> Ein Sicherheitsversuch: Ein Dummy ($m = 75\,\text{kg}$) prallt mit $v = 15\,\text{m/s}$ auf eine Prallwand. Bei Aufprall auf eine starre Wand beträgt die Abbremszeit $t_1 = 0{,}02\,\text{s}$, bei einem Knautschbereich $t_2 = 0{,}15\,\text{s}$.
> a) Berechnen Sie die jeweils wirkende mittlere Kraft über den Kraftstoß.
> b) Bewerten Sie die Schutzwirkung des Knautschbereichs unter Einbeziehung eines sicherheitsrelevanten Bewertungsmaßstabs.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) Begründung** —— 系统 = 两节车厢；碰撞时相互作用的力为内力，成对反向抵消（牛顿第三定律）；轨道水平，水平方向无外冲量 → 总动量守恒。✓ **得分点：系统定义 + 内力抵消 + 无外冲量**（AFB II）
2. **b) 动量守恒**（定向右为正）：$m_1v_1 + m_2\cdot 0 = (m_1+m_2)v'$
   $$v' = \frac{m_1v_1}{m_1+m_2} = \frac{2000\cdot 3{,}0}{6000} = 1{,}0\,\text{m/s}$$ ✓ **得分点：共速条件 + 代入 + 单位**
3. **c) 动能损失**：
   $$E_{\text{vor}} = \tfrac12\cdot 2000\cdot 3{,}0^2 = 9000\,\text{J},\quad E_{\text{nach}} = \tfrac12\cdot 6000\cdot 1{,}0^2 = 3000\,\text{J}$$
   $$\frac{\Delta E}{E_{\text{vor}}} = \frac{9000-3000}{9000} = \frac{2}{3}\approx 66{,}7\%$$ ✓ **得分点：两动能分别计算 + 相对损失率**

**Aufgabe 2** `[CN-改编]`
1. **a) 方程组**（取 $v_1$ 方向为正）：
   $$m_1v_1 = m_1v_1' + m_2v_2' \quad\text{(Impuls)}$$
   $$\tfrac12m_1v_1^2 = \tfrac12m_1v_1'^2 + \tfrac12m_2v_2'^2 \quad\text{(Energie)}$$ ✓ **得分点：两条方程各 1**
2. **b) 弹性碰撞通解**（$m_2$ 初速为零）：
   $$v_1' = \frac{m_1-m_2}{m_1+m_2}v_1 = \frac{0{,}20-0{,}60}{0{,}80}\cdot 4{,}0 = -2{,}0\,\text{m/s}$$
   $$v_2' = \frac{2m_1}{m_1+m_2}v_1 = \frac{0{,}40}{0{,}80}\cdot 4{,}0 = 2{,}0\,\text{m/s}$$
   （$v_1'<0$ 表示球 1 反弹）✓ **得分点：通解/联立 + 反弹方向说明**
3. **c) 比较** —— 题 1 完全非弹性（共速、动能损失 2/3）；题 2 弹性（动量守恒且动能守恒，两球分离）。**差异根源：弹性碰撞额外满足动能守恒，故碰后不共速**。✓ **得分点：对比 + 用「动能是否守恒」作解释**（AFB II/III）

**Aufgabe 3** `[原创]`
1. **a) 冲量-动量关系**：$\Delta p = m v = 75\cdot 15 = 1125\,\text{kg·m/s}$（末速为零）
   $$F_1 = \frac{\Delta p}{t_1} = \frac{1125}{0{,}02} = 5{,}6\cdot 10^4\,\text{N},\quad F_2 = \frac{1125}{0{,}15} = 7{,}5\cdot 10^3\,\text{N}$$ ✓ **得分点：冲量式 + 两次代入 + 单位**
2. **b) Bewertung（须超出学科内部）** —— 延长作用时间使平均力降至约 1/8，降低人体承受的减速力（对应伤害阈值/安全规范）；**必须落到安全规范或伤害阈值等价值/规范尺度**，不能只写「力变小了」。
   > *Klausur-Satz*: „Da der Kraftstoß durch die verlängerte Bremszeit bei gleicher Impulsänderung auf etwa ein Achtel reduziert wird, verringert der Knautschbereich die auf den Insassen wirkende Kraft erheblich; bezogen auf die in der Sicherheitsnorm festgelegten Belastungsgrenzen ist dies ein entscheidender Beitrag zum Insassenschutz." ✓ **得分点：数值对比 + 明确的价值/规范判据**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把非弹性碰撞当成动能也守恒来列式 | 先问「碰后是否共速/是否给了能量损失」再决定第二条方程 |
| **知识错** | 矢量式忘定正方向，反弹速度的负号丢失；把 $r$ 或质量单位 $\text{t}$ 忘换 $\text{kg}$ | 动笔前画带箭头的碰前/碰后图；统一 SI 单位 |
| **表达错** | `berechnen` 只给数值不给 Ansatz；单位漏写 → `Darstellungsleistung` 扣分 | 按「Ansatz → 代入 → 结果 + 单位 → 一句结论」四段写 |

---

## 7. Vernetzung

- **上游**：`Newtonsche-Gesetze-und-Krafte.md`（牛顿第三定律 + 机械能守恒）· `Gleichmaessig-beschleunigte-Bewegung-Freier-Fall.md`（运动学量）
- **下游**：`Kreisbewegung-und-Gravitation.md`（守恒与平衡轴）· LK/GK 量子部分（能量-动量守恒）· 核物理 `Massendefekt`
- **横向**：`03_Mathe` 联立方程组求解；`Physik-IQB-EF-Training.md`（数据图表题）
- **术语卡**（建议入 csv）：`Impuls` / `Kraftstoß` / `Impulserhaltungssatz` / `elastischer Stoß` / `unelastischer Stoß` / `vollkommen unelastischer Stoß`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[CN-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题。
