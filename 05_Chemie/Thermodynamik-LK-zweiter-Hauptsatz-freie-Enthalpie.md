---
fach: Chemie
thema: "Zweiter Hauptsatz und freie Enthalpie"
operatoren: [herleiten, berechnen, begruenden, erlaeutern, deuten]
klausurrelevant: true
datum: 2026-09-24
tags: [Q2, Chemie, Thermodynamik]
stufe: "Q2"
kursart: "LK"
---

# Zweiter Hauptsatz und freie Enthalpie (热力学第二定律与自由焓)

> **中文理解**：第一定律（`Erster Hauptsatz`）只回答「能量守恒」，它**不判断反应能不能自发**。第二定律引入 `Entropie`（熵）：**孤立体系的熵只增不减**，于是「能量转化有方向」才被量化。为了把「体系」与「环境」的熵变合成一个可直接判定的量，德国 LK 引入 `freie Enthalpie`（自由焓）`ΔG = ΔH − T·ΔS`（`Gibbs-Helmholtz-Gleichung`），并以 **ΔG 的符号**判自发。
> **⚠️ 中国课标完全无 ΔG、无 Gibbs-Helmholtz** [已验证，`Chemie-DE-CN-Mapping.md` LK-10 判为 `DE-only`]——这是 LK 的**硬缺口**，必须**从零建**，不能用中国「反应方向与焓变、熵变有关」那一句顶替。
>
> **Klausur-Relevanz**：KLP 明文把「第二定律 + freie Enthalpie + Gibbs-Helmholtz」列为 **LK 增量**，并要求「**从实验数据推导**」该式 [已验证，`Chemie-Oberstufe.md` §Q-2 LK 增量表]。属 AFB III 规定动作；不掌握它，电化学 LK 的电动势-自由能联动题直接失分。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Erster Hauptsatz | 热力学第一定律 | first law | 能量守恒（`ΔU = q + w`） | Q-1 GK-06 已教 [已验证] |
| Zweiter Hauptsatz | 热力学第二定律 | second law | 自发过程的**总熵增加** | LK 增量 [已验证] |
| Entropie `S` | 熵 | entropy | 无序度 / 微观状态数的量度 | 单位 J/(mol·K) |
| Entropieänderung `ΔS` | 熵变 | entropy change | `ΔS = ΔS(System) + ΔS(Umgebung)` | 判定自发性的核心 |
| Gibbs-Helmholtz-Gleichung | 吉布斯-亥姆霍兹方程 | Gibbs–Helmholtz | `ΔG = ΔH − T·ΔS` | LK 明文要求推导并计算 [已验证] |
| freie Enthalpie `ΔG` | 自由焓（吉布斯自由能） | Gibbs free energy | 恒温恒压下可做最大非体积功的能量 | **LK 独有，中国无** |
| exergon / endergon | 放能 / 吸能（自发/非自发） | exergonic / endergonic | `ΔG < 0` / `ΔG > 0` | 与 exotherm 区分 |
| spontan / freiwillig | 自发 | spontaneous | `ΔG < 0`（恒温恒压） | 判据 |
| Gleichgewicht | 平衡 | equilibrium | `ΔG = 0` | 电化学 `E°` 与 ΔG 联动点 |
| Triebkraft | 驱动力 | driving force | `−ΔG` | 越大反应趋势越强 |

---

## 2. 知识结构 (Struktur)

### 2.1 为什么第一定律不够用

第一定律只说「能量总量不变」，因此**无法区分**「水自动往下流」与「水自动往上流」（后者也满足能量守恒）。要判断方向，必须引入第二定律 [据推断，热力学常识]。

> *Klausur-Satz*: *Der Erste Hauptsatz fordert nur die Erhaltung der Energie und erlaubt daher keine Aussage über die Richtung eines Prozesses. Erst der Zweite Hauptsatz liefert ein Kriterium dafür, ob ein Prozess freiwillig abläuft.*

### 2.2 第二定律：总熵判据

**孤立体系**中，自发过程使**总熵增大**；达到平衡时总熵最大 [据推断，第二定律的经典表述]：

```
ΔS(gesamt) = ΔS(System) + ΔS(Umgebung) > 0   （自发）
```

⚠️ 关键：**体系自身熵减也可以自发**，只要**环境熵增更大**。这就是「水结冰」（体系熵减）仍然自发的原因——放热使环境熵增超过体系熵减 [据推断]。

> *Klausur-Satz*: *Nach dem Zweiten Hauptsatz läuft ein Prozess in einem abgeschlossenen System freiwillig ab, wenn die Gesamtentropie zunimmt. Ein Absinken der Systementropie ist möglich, sofern die Entropie der Umgebung stärker zunimmt.*

### 2.3 Gibbs-Helmholtz 的推导（LK 规定动作）

把环境的熵变用**反应焓**表示：环境吸收的热为 `−ΔH`，故 `ΔS(Umgebung) = −ΔH / T`。代入总熵判据 [据推断，本项目据 KLP 要求整理]：

```
ΔS(gesamt) = ΔS(System) − ΔH / T
```

两边乘 `−T`（乘负数使不等号反向，并把「熵增」改写成「自由焓减小」）：

```
−T·ΔS(gesamt) = ΔH − T·ΔS(System)  ≡  ΔG
```

即 **`ΔG = ΔH − T·ΔS`**（`Gibbs-Helmholtz-Gleichung`）。

> *Klausur-Satz*: *Aus dem Zweiten Hauptsatz folgt mit ΔS(Umgebung) = −ΔH/T die Beziehung ΔG = ΔH − T·ΔS. Da bei konstanter Temperatur und konstantem Druck ΔG < 0 für einen freiwilligen Prozess gilt, dient ΔG als Kriterium für die Spontaneität.*

### 2.4 ΔG 判据与温度的角色

| ΔH | ΔS | ΔG | 自发性 |
|---|---|---|---|
| < 0（放热） | > 0（增熵） | **恒 < 0** | 任何温度都自发 |
| > 0（吸热） | < 0（减熵） | **恒 > 0** | 任何温度都非自发 |
| < 0 | < 0 | 低温 < 0，高温 > 0 | **低温自发**（`T < ΔH/ΔS`） |
| > 0 | > 0 | 低温 > 0，高温 < 0 | **高温自发**（`T > ΔH/ΔS`） |

> ⚠️ 后两行是 **LK 的经典考点**：由 `ΔG = 0` 解出**临界温度** `T = ΔH/ΔS`（注意用 K，用 J 而非 kJ）。

> *Klausur-Satz*: *Haben ΔH und ΔS gleiche Vorzeichen, entscheidet die Temperatur: Aus ΔG = 0 folgt die Umschlagtemperatur T = ΔH/ΔS.*

### 2.5 与电化学的联动（LK 高频接口）

自由焓与电池电动势由下式相连 [据推断，电化学标准关系；德国 LK 含 Nernst 与 ΔG]：

```
ΔG = − n · F · E        （n 电子数，F = 96485 C/mol）
```

→ **`E > 0` 的电池 ⇔ `ΔG < 0` 的自发反应**。这条把「第二定律」与「原电池」两块 LK 内容焊在一起。

> *Klausur-Satz*: *Zwischen der freien Enthalpie und der Zellspannung gilt ΔG = −n·F·E. Eine positive Zellspannung entspricht daher einem freiwillig ablaufenden Redoxprozess.*

### 2.6 ⚠️ 熵的微观图像（用于解释题，不作计算）

熵可理解为**微观状态数** `W` 的量度（`S = k_B·ln W`）[据推断，玻尔兹曼关系]：粒子排列方式越多 → `W` 越大 → `S` 越大。三条定性规则 [据推断]：

- 固态 → 液态 → 气态：`S` 递增（自由度递增）。
- 温度升高：`S` 递增。
- 溶解（尤其离子从晶格进入溶液）：`S` 通常递增 → 可解释**自发吸热溶解**（`ΔH > 0` 但 `TΔS` 更大）。

> *Klausur-Satz*: *Die Entropie ist ein Maß für die Zahl der möglichen Mikrozustände. Beim Übergang von fest nach flüssig nach gasförmig sowie bei Temperaturerhöhung nimmt sie zu; dies kann eine endotherme, aber freiwillige Auflösung erklären.*

---

## 3. 解题方法 (Methoden)

### 3.1 自发性判定标准程序（`begruenden` / `berechnen`）

1. **定 ΔH**：由 Hess 定律或标准生成焓表求 `ΔH`（Q-2 GK-12 已教）。—— *KLP 工具：`Standardreaktionsenthalpien` / `Satz von Hess`*
2. **定 ΔS**：由方程式两侧**物质的量**与聚集态定性判断，或由给定数据求。—— *KLP 工具：`Entropie` 定性规则（2.6）*
3. **代 Gibbs-Helmholtz**：`ΔG = ΔH − T·ΔS`（**T 用 K；ΔH、ΔS 单位统一为 J**）。—— *KLP 工具：`Gibbs-Helmholtz-Gleichung`*
4. **读判据**：`ΔG < 0` 自发 / `= 0` 平衡 / `> 0` 非自发。—— *KLP 工具：`freie Enthalpie` 判据*
5. **量级检验**：`ΔG` 与 `ΔH` 应同数量级（`TΔS` 常为几到几十 kJ/mol）。—— *KLP 工具：`Größenordnungsprüfung`*

> **判据 / 决策点**：题目出现 `herleiten` → 必须**显式写出**「ΔS(Umgebung) = −ΔH/T → 乘 −T」这一步；只写 `ΔG = ΔH − TΔS` 不给推导分 [已验证，`herleiten` 释义：借助已知规律性建立关联]。

### 3.2 临界温度求取（`berechnen`）

1. 令 `ΔG = 0` → `T = ΔH / ΔS`。
2. 判方向：同号时，若 `ΔH > 0, ΔS > 0` 则 `T > ΔH/ΔS` 才自发；若 `ΔH < 0, ΔS < 0` 则 `T < ΔH/ΔS` 才自发。
3. **单位校验**：`ΔH` 用 J/mol、`ΔS` 用 J/(mol·K) → `T` 得 K，再换 °C。

> **判据 / 决策点**：`ΔH`、`ΔS` **异号** → 无需算临界温度，直接由 2.4 表判定。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 「焓变 + 熵变 → 反应方向」的定性判据（**只作脚手架，不作主方法**）

- **技法内容**：中国选必1 主题1 只要求「**反应方向与焓变、熵变有关**」——`ΔH − TΔS < 0` 时反应自发（中国写 `ΔH − TΔS`，符号约定与德国 `ΔG` 完全一致，但**不给 `ΔG` 这一命名与符号体系**）。中国侧提供的仅是「**放热 + 增熵 → 自发**」的**定性直觉**。
- **DE-Anschluss**：`Erster Hauptsatz`（Q-1 GK-06 已教）· `Entropie`（Q-1 LK-05 独立条目）· `Satz von Hess` 与 `Standardreaktionsenthalpien`（Q-2 GK-12 已教）· `freie Enthalpie` 与 `Gibbs-Helmholtz`（**LK 明文要求，德国提供**）。⚠️ 关键区别：**ΔG 与 Gibbs-Helmholtz 的命名、符号与「从实验数据推导」要求，全部来自德国 LK**，中国侧**不提供**——中国只有「焓熵判据」的定性表述。
- **合规性**：⚠️ **部分合规** —— 可借「焓熵同号时由温度决定」的**定性直觉**作入门脚手架；但**严禁**把「只定性说与焓变熵变有关」当作 LK 答案，**必须**写出 `ΔG = ΔH − T·ΔS` 并**计算 ΔG**（LK 明文要求 `berechnen`）。
- **Abitur 应用**：LK-10 直接命中（第二定律 + freie Enthalpie + Gibbs-Helmholtz）。AFB II/III。下游联动 LK-07 Nernst（`ΔG = −nFE`）与 Q-1 LK-05 熵变解释自发吸热溶解。
- **来源**：`[CN-课标]` 选必1 2.1「反应方向与焓变、熵变有关」（**仅定性，无 ΔG**）；`[CN-高考]` 无对应定量题型（**中国不考 ΔG**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I `Materialgebundene Aufgabe`（绑定 ΔH/ΔS 数据表或量热实验）[已验证] |
| Operator | `herleiten` / `berechnen` / `begruenden` / `erlaeutern` / `deuten` |
| AFB | II（代入计算）→ III（从数据推导 Gibbs-Helmholtz、判临界温度） |
| 建议分值 / 时长 | 单小题约 5–9 BE；LK 整卷 300 min，一套 4 题选 3 [已验证] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Für die Zersetzung von Calciumcarbonat gilt: `CaCO₃(s) → CaO(s) + CO₂(g)` mit ΔH = +178 kJ/mol und ΔS = +160 J/(mol·K).
> **a)** Leiten Sie ausgehend vom Zweiten Hauptsatz die Gibbs-Helmholtz-Gleichung ΔG = ΔH − T·ΔS her.
> **b)** Berechnen Sie ΔG bei 298 K und bei 1200 K. Beurteilen Sie, bei welcher Temperatur die Zersetzung freiwillig abläuft.

**Aufgabe 2** `[原创]`
> Für die Synthese von Ammoniak gilt: `N₂(g) + 3 H₂(g) → 2 NH₃(g)` mit ΔH = −92 kJ/mol und ΔS = −199 J/(mol·K).
> **a)** Begründen Sie das Vorzeichen von ΔS mithilfe der Teilchenzahl.
> **b)** Berechnen Sie die Temperatur, bei der ΔG = 0 gilt, und erläutern Sie die Bedeutung dieses Wertes für das Haber-Bosch-Verfahren.

**Aufgabe 3** `[NRW-改编]`
> Eine galvanische Zelle hat die Zellspannung E = 1,10 V; die Reaktion überträgt n = 2 Elektronen.
> **a)** Berechnen Sie ΔG mit ΔG = −n·F·E (F = 96485 C/mol).
> **b)** Deuten Sie das Ergebnis im Hinblick auf die Freiwilligkeit und stellen Sie den Zusammenhang zur Zellspannung her.

**Aufgabe 4** `[CN-改编]`
> Beim Lösen von Ammoniumnitrat in Wasser sinkt die Temperatur der Lösung, obwohl der Vorgang freiwillig abläuft.
> **a)** Erklären Sie diesen Befund mithilfe der freien Enthalpie.
> **b)** Geben Sie an, welcher Term in ΔG = ΔH − T·ΔS den Ausschlag gibt.

### 5.3 Musterlösung

**Aufgabe 1**
1. **a)** 环境熵变：`ΔS(Umgebung) = −ΔH/T` ✓ 得分点
2. 总熵判据：`ΔS(gesamt) = ΔS(System) − ΔH/T` ✓ 得分点
3. 两边乘 `−T`（不等号反向）→ `−T·ΔS(gesamt) = ΔH − T·ΔS(System) ≡ ΔG` ✓ 得分点（**「乘 −T」这一步是 `herleiten` 的核心**）
4. **b)** `T = 298 K`：`ΔG = 178000 − 298·160 = 178000 − 47680 ≈ +130 kJ/mol` ✓（`> 0` 非自发）
5. `T = 1200 K`：`ΔG = 178000 − 1200·160 = 178000 − 192000 = −14 kJ/mol` ✓（`< 0` 自发）
6. **判据**：`ΔH > 0, ΔS > 0` → 高温自发；`T > ΔH/ΔS = 178000/160 ≈ 1113 K` ✓ 得分点

**Aufgabe 2**
1. **a)** 4 mol 气体 → 2 mol 气体，粒子数减少 → 无序度下降 → `ΔS < 0` ✓ 得分点
2. **b)** `T = ΔH/ΔS = −92000 / (−199) ≈ 462 K` ✓ 得分点（**注意用 J，两负相除得正温度**）
3. **erlaeutern**：低于 462 K 时 `ΔG < 0`，合成氨热力学上有利 → 工业上选 **约 400–500 °C 折中**：温度过低动力学太慢，过高则平衡左移（Le Chatelier）✓ 得分点（**须点「热力学 vs 动力学折中」**）

**Aufgabe 3**
1. **a)** `ΔG = −2 · 96485 C/mol · 1,10 V = −212267 J/mol ≈ −212 kJ/mol` ✓ 得分点（**单位 C·V = J**）
2. **b)** `ΔG < 0` → 反应自发（电池放电方向）✓ 得分点
3. 关系：`E > 0` 与 `ΔG < 0` 一一对应；电动势即反应的「自由焓驱动力」`−ΔG/nF` ✓ 得分点

**Aufgabe 4**
1. **a)** 溶解吸热 → `ΔH > 0`；但过程自发 → 必有 `ΔG < 0` → 由 `ΔG = ΔH − TΔS` 得 `TΔS > ΔH`，即 `ΔS > 0` 且足够大 ✓ 得分点
2. **b)** 决定项是 **`−TΔS`**（熵项）✓ 得分点
3. **解释**：离子由有序晶格进入溶液，微观状态数大增 → `ΔS > 0` 主导，压过吸热项 ✓

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把 `exergon`（ΔG<0）与 `exotherm`（ΔH<0）混为一谈 | 记忆：`exergon` 管**自发性**、`exotherm` 管**热效应**；吸热也可自发（如溶解） |
| 知识错 | 单位不统一（ΔH 用 kJ、ΔS 用 J）→ 结果差 1000 倍；`T` 用 °C | 计算前统一为 J 与 K；`T = ΔH/ΔS` 后换 °C |
| 表达错 | `herleiten` 题只写结论式不给「ΔS(Umgebung) = −ΔH/T」步骤；`ΔG < 0` 写成「放热」 | 四步推导逐条写；判据只说「自发/freiwillig」 |
| 越界错 | 用中国「只与焓变熵变有关」一句代替 ΔG 计算 | LK 必须**计算 ΔG**；中国定性表述只作脚手架 |

---

## 7. Vernetzung

- **上游**：`CN-Hess-Pfadmethode.md`（ΔH 的来源）· Q-1 GK-06 `Erster Hauptsatz` 与 `Kalorimetrie`（已教）· Q-1 LK-05 `Entropie`（LK 增量）
- **下游**：`Elektrochemie-Q1-Grundlagen.md` 与 LK 的 Nernst（`ΔG = −nFE`）· LK-07 浓度电池
- **横向**：`03_Mathe` 一次函数与不等式（`ΔG = ΔH − TΔS` 关于 T 的线性）；`02_Physik` 热力学第二定律
- **术语卡**：`Entropie` / `freie Enthalpie` / `Gibbs-Helmholtz` / `exergon` / `Triebkraft`（建议加入 csv，DE-CN-EN 三列）
- **Basiskonzept**：`Energie` ✅（本笔记为该 Basiskonzept 的 LK 顶点）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源（NRW KLP 2022 `gost_klp_ch_2022_06_07.pdf` / Chemie Operatoren ab Abitur 2025）或本项目已核文件确认 · `[据推断]` = 基于热力学通用规则或本项目推导 · `[未获取到]` = 未找到，如实标注。
> ⛔ **本笔记不涉及**：盐类水解体系 · 杂化轨道 / 晶体四分类 / 电子排布式 · 配合物系统板块。
