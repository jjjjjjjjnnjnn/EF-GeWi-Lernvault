---
fach: Physik
thema: "Schwingkreis und mechanisch-elektromagnetische Analogie (LK)"
operatoren: [herleiten, aufstellen, vergleichen, berechnen, begründen, beschreiben, erläutern, bewerten]
klausurrelevant: true
datum: 2026-09-25
tags: [Q2, Physik, Schwingkreis]
stufe: "Q2"
kursart: "LK"
---

# Schwingkreis und Analogie (振荡回路与机械⇄电磁类比) `[LK]`

> **中文理解**：这是 **LK-2 `Schwingende Systeme und Wellen`** 的第二支柱 [已验证]。三条链：① **`Schwingkreis`（LC 回路）** —— 电荷在电容与线圈之间来回振荡，`q`/`U`/`I` 的微分方程与弹簧振子**同构**，由 DGL 与解直接读出 **`Thomson'sche Gleichung` $T=2\pi\sqrt{LC}$** [已验证]；② **机械 ⇄ 电磁振动类比** —— KLP 明文要求「**从能量与本征量两方面**比较机械与电磁振荡」，这是**德国 LK 的招牌题型**，也是 Basiskonzept `Erhaltung und Gleichgewicht` 最漂亮的落点 [已验证]；③ **`Hertz'scher Dipol`** —— 须把赫兹偶极子描述为**（开放的）振荡电路**，并定性说明 B/E 涡旋场与电磁波传播 [已验证]。
> ⚠️ **三条硬边界**：① LK-2 **无 `Zufall und Determiniertheit` 条目**（E+G / S+K / M+V 三条，无 Z+D）[已验证]；② **`Schwingkreis` 是 LK-2 独立内容重点**，GK 只在 `Elektrodynamik und Energieübertragung` 里「定性说明电磁振荡」——**两轨不是同一层** [已验证]；③ LK-1 **没有** `Transformator`/`Generator`/`Wechselspannung` 独立条目，**不要把 GK-3 的内容搬进 LK-2** [已验证]。
>
> **Klausur-Relevanz**：§4 缺口 #17（★★）[已验证]。由类比 → DGL → 周期，**AFB II–III 连击**；口试的天然跨领域素材。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Schwingkreis` | 振荡回路 | oscillating circuit | L 与 C 组成的回路，电荷周期交换 | LK-2 独立重点 [已验证] |
| `Kondensator` / `Kapazität` $C$ | 电容器 / 电容 | capacitor / capacitance | $q=CU$；$E_{\text{el}}=\dfrac{q^2}{2C}$ | 电场储能 [据推断] |
| `Spule` / `Induktivität` $L$ | 线圈 / 电感 | coil / inductance | $U_L=L\dot I$；$E_{\text{mag}}=\dfrac12LI^2$ | 磁场储能 [据推断] |
| `Thomson'sche Gleichung` | 汤姆孙公式 | Thomson's equation | $T=2\pi\sqrt{LC}$ | 由 DGL 解读出 [已验证] |
| `Eigenfrequenz` $\omega_0$ | 本征角频率 | natural angular frequency | $\omega_0=\dfrac{1}{\sqrt{LC}}$ | 与振幅无关 [据推断] |
| `Analogie` mechanisch ⇄ elektromagnetisch | 机械⇄电磁类比 | mechanical–electromagnetic analogy | $m\!\leftrightarrow\!L$，$k\!\leftrightarrow\!\frac1C$，$x\!\leftrightarrow\!q$，$v\!\leftrightarrow\!I$ | KLP 明文要求 [已验证] |
| `Hertz'scher Dipol` | 赫兹偶极子 | Hertzian dipole | **开放化的振荡回路** | 须这样描述 [已验证] |
| `gedämpfte Schwingung` | 阻尼振动 | damped oscillation | 有 $R$ 时振幅指数衰减 | 定性层 [已验证] |
| `erzwungene Schwingung` / `Resonanz` | 受迫振动 / 共振 | forced oscillation / resonance | $\omega=\omega_0$ 时振幅最大 | LK-2 独立重点 [已验证] |

---

## 2. 知识结构 (Struktur)

### 2.1 LC 回路：能量在两种形式之间来回搬

中文理解：给电容充好电后闭合回路，**电荷开始流回线圈**——`q` 减小、`I` 增大，**电场能（$q^2/2C$）转成磁场能（$\tfrac12LI^2$）**；`q=0` 时电流最大、能量全在磁场里；随后线圈以感应电压把电荷**反方向**推回电容，如此往复 [据推断]。**总能量守恒**是整段推导的骨架——正对 Basiskonzept `Erhaltung und Gleichgewicht`。

> *Klausur-Satz*: „Im Schwingkreis wandelt sich die Energie periodisch zwischen dem elektrischen Feld des Kondensators $\left(E_{\text{el}}=\dfrac{q^2}{2C}\right)$ und dem magnetischen Feld der Spule $\left(E_{\text{mag}}=\dfrac12LI^2\right)$ um; die Summe beider Anteile bleibt konstant." [原创]

⚠️ **类比的核心不是公式像，而是「能量转换机制同构」**：`q` 相当于位移 `x`（都在「离开平衡态」的量），`I` 相当于速度 `v` [据推断]。

### 2.2 由 DGL 推 `Thomson'sche Gleichung`（LK 规定动作）

中文理解：回路方程 $U_C+U_L=0\Rightarrow\dfrac{q}{C}+L\dot I=0$；代入 $I=\dot q$ 得 $L\ddot q+\dfrac{q}{C}=0$，即 $\ddot q=-\dfrac{1}{LC}q$——**与弹簧振子 $\ddot x=-\dfrac{k}{m}x$ 完全同形** [已验证]。解 $q(t)=q_{\max}\sin(\omega_0 t+\varphi_0)$ 代入读出 $\omega_0=\dfrac{1}{\sqrt{LC}}$，故 $T=2\pi\sqrt{LC}$。

> *Klausur-Satz*: „Mit $U_C+U_L=0$, $U_C=q/C$, $U_L=L\dot I$ und $I=\dot q$ folgt $\ddot q=-\dfrac{1}{LC}q$. Aus der Lösung $q(t)=q_{\max}\sin(\omega_0 t+\varphi_0)$ liest man $\omega_0=\dfrac{1}{\sqrt{LC}}$ ab, also $T=2\pi\sqrt{LC}$." [原创]

⚠️ **这一步是「由解的形式读 $\omega$」，不是背公式**——与《LK-DGL 前置包》五步法完全一致 [已验证]。

### 2.3 机械 ⇄ 电磁类比表（**招牌题型**）

中文理解：KLP 明文要求**从能量与本征量两方面**比较 [已验证]。下表是可直接写进答卷的对照：

| 机械量 | 符号 | 电磁量 | 符号 | 依据 |
|---|---|---|---|---|
| 质量 | $m$ | 电感 | $L$ | 「惯性」角色 [据推断] |
| 弹簧劲度 | $k$ | 电容的倒数 | $1/C$ | 「回复」角色 [据推断] |
| 位移 | $x$ | 电荷 | $q$ | 「离开平衡」量 [据推断] |
| 速度 | $v$ | 电流 | $I$ | 变化率 [据推断] |
| 动能 | $\tfrac12mv^2$ | 磁场能 | $\tfrac12LI^2$ | 能量形式 1 [据推断] |
| 弹性势能 | $\tfrac12kx^2$ | 电场能 | $\dfrac{q^2}{2C}$ | 能量形式 2 [据推断] |
| 本征频率 | $\omega_0=\sqrt{k/m}$ | 本征频率 | $\omega_0=1/\sqrt{LC}$ | 本征量 [据推断] |

> *Klausur-Satz*: „Beide Systeme sind mathematisch isomorph: Die Masse $m$ entspricht der Induktivität $L$, die Federkonstante $k$ dem Kehrwert der Kapazität $1/C$, der Ort $x$ der Ladung $q$ und die Geschwindigkeit $v$ der Stromstärke $I$. Auch energetisch stimmen sie überein: $\tfrac12mv^2\leftrightarrow\tfrac12LI^2$ und $\tfrac12kx^2\leftrightarrow\dfrac{q^2}{2C}$; beide schwingen um einen Gleichgewichtszustand." [原创]

### 2.4 `Hertz'scher Dipol` = 开放的振荡回路

中文理解：把 LC 回路的电容板**拉开**、线圈**拉直**，回路就「张开了」——电荷在两端来回振荡，**E 场与 B 场的变化互相激发（涡旋场）**，场脱离导体**向外传播成电磁波** [据推断]。**它不是新装置，而是同一个振荡回路的开放形式**。

> *Klausur-Satz*: „Der Hertz'sche Dipol ist ein geöffneter Schwingkreis: Werden die Kondensatorplatten auseinandergezogen und die Spule gestreckt, so strahlt der schwingende Ladungsaustausch Energie als elektromagnetische Welle ab, da die Änderungen von E- und B-Feld sich gegenseitig als Wirbelfelder erzeugen." [原创]

⚠️ **易错**：把赫兹偶极子当成「与振荡电路无关的新器件」——它是**振荡电路的开放化** [据推断]。

### 2.5 阻尼与受迫（LK 独有的第三种情形）

中文理解：真实回路有欧姆电阻 $R$，能量按 $\tfrac12RI^2$ 耗散 → **阻尼振动**；若外部周期驱动（如信号发生器），则成**受迫振动**，$\omega_{\text{err}}=\omega_0$ 时**共振**、振幅最大 [据推断]。KLP 要求**定性说明无阻尼 / 阻尼 / 受迫三种情形**，并要求**评价避免共振灾难的措施** [已验证]。

---

## 3. 解题方法 (Methoden)

### 3.1 Schwingkreis-DGL 五步法（与前置包同构）

**编号步骤**：
1. **定平衡态**：把 $q=0$、$I$ 最大定为「平衡位置」—— *KLP 工具：`Kräftegleichgewicht`（EF-1）+ Basiskonzept `Erhaltung und Gleichgewicht`*
2. **写回路方程**：$U_C+U_L=0$，即 $\dfrac{q}{C}+L\dot I=0$ —— *KLP 工具：`Induktionsgesetz` / `Selbstinduktion`（LK-1）* [已验证]
3. **代 $I=\dot q$** 化为 $\ddot q=-\dfrac{1}{LC}q$ —— *KLP 工具：`Mathematisieren und Vorhersagen`*
4. **写出解的形式** $q(t)=q_{\max}\sin(\omega_0 t+\varphi_0)$，读出 $\omega_0=\dfrac{1}{\sqrt{LC}}$ —— *KLP 工具：`herleiten`（LK）*
5. **求 $T=2\pi\sqrt{LC}$**，并用能量式 $q_{\max}^2/(2C)=\tfrac12LI_{\max}^2$ 互推振幅 —— *KLP 工具：`berechnen`*

> **判据 / 决策点**：题目给 $L$、$C$ → 直接代 $T=2\pi\sqrt{LC}$；题目给能量或最大电流 → 先用能量守恒互推，再求周期。**凡「力/电压正比于位移/电荷」→ 一定是对称振子**。

### 3.2 类比比较三步（拿 AFB III 的写法）

1. **列「量 ↔ 量」对应表**（见 §2.3），至少 5 对 —— *KLP 工具：`vergleichen`*
2. **补能量层**：写出两种储能形式并说明「总和守恒 + 围绕平衡态振荡」—— *KLP 工具：Basiskonzept `E+G`* [已验证]
3. **补本征量层**：写出两个 $\omega_0$ 并说明「都与振幅无关」—— *KLP 工具：`Eigenfrequenz`*

> ⚠️ **只类比公式不类比能量机制 → 拿不到 AFB III** [据推断]。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode 7（续用）：微元法与极限思想 —— 为 LC 回路建 DGL

- **技法内容**：取极小时间段 $\Delta t$，段内把 $I$ 当常量处理，写出「电荷的增量 = 流入量」的**微元关系**（$\Delta q=-I\Delta t$ 型），再求和/取极限，即得 $\dot q$ 与 $q$ 的微分关系。LC 回路由此得到 $\ddot q=-\dfrac{1}{LC}q$。
- **DE-Anschluss**：**LK-2 明文要求「由 DGL 与其解求 $T$ 与 `Thomson'sche Gleichung`」** [已验证] · `Selbstinduktion`/`Induktivität`（LK-1 已教）· `Kondensator und Kapazität`（LK-1 已教）· Basiskonzept `Mathematisieren und Vorhersagen`。**零新增知识**。
- **合规性**：✅ —— 「以恒代变、再求和」是思维方式不是知识块；⚠️ **不得据此引入定积分运算**（德国 EF/Q 无此要求）[已验证]。
- **Abitur 应用**：LK-2 的 `Schwingkreis` DGL 推导与 `Thomson` 求周期。**AFB II/III** [据推断]。
- **来源**：`[CN-课标]` 必修1.1.3「极限方法」+ 选必2.3.2 电磁振荡 · `[CN-教材]` 微元法体系（只记方法名与逻辑）· **原创改写**。

### ⚠️ CN 侧的真实落差（本条须诚实标注）

- **「机械 ⇄ 电磁类比」中国无此训练**：中国课标只要求「了解电磁振荡」，**不做跨系统的量-量对照** [据推断]。本笔记的类比表是**德国侧产出**，中国侧不提供。
- **⛔ 不得把中国的「电路分析」搬进来**：串并联化简、闭合电路欧姆定律、`U-I` 图求 $E$/$r$ 等属 `CN-only`（见 `Physik-DE-CN-Mapping.md` §3 CN-Methode 9 反例）。**德国 KLP 全文无「电路分析」IF**；LC 回路在德国是**振动系统**，不是电路题。**桥接素材，非考纲内容。**

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含演示实验）/ **Aufgabenart II `Fachpraktische Aufgabe`** [已验证] |
| Operator | `herleiten` / `aufstellen` / `vergleichen` / `berechnen` / `begründen` / `bewerten` |
| AFB | I（复述本征量/装置）→ **II（推 DGL、求 $T$、类比表）** → III（阻尼/共振评价、模型局限） |
| 建议分值 / 时长 | 单题约 20–30 BE；Q LK Klausur 135–180 / 225 min（实验可 +60）[已验证] |

> ⚠️ **材料挂靠说明（物理硬约束）**：本节知识点在材料题中**以「给定 $L$ 与 $C$ 的回路图 + 示波器测得的 $q(t)$/$I(t)$ 曲线」或「弹簧振子与 LC 回路的并置图」的形态出现**；在实验题中**以「用信号发生器与示波器测共振曲线 → 求 $\omega_0$」的形态出现**。答案必须引用题给数据/图，**禁止脱离材料纯论述** [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Schwingkreis besteht aus einer Spule ($L=40\,\text{mH}$) und einem Kondensator ($C=10\,\mu\text{F}$). Der Kondensator wird auf $U_0=12\,\text{V}$ aufgeladen und dann über die Spule entladen.
> a) Leiten Sie aus dem Maschenumlauf die DGL für $q(t)$ her und geben Sie die Lösung an.
> b) Berechnen Sie die Eigenfrequenz $f_0$ und die Schwingungsdauer $T$.
> c) Ermitteln Sie die maximale Stromstärke über einen Energieansatz.

**Aufgabe 2** `[NRW-改编]`
> In einer Klausur werden ein Federpendel ($m$, $k$) und ein Schwingkreis ($L$, $C$) gegenübergestellt.
> a) Vergleichen Sie beide Systeme hinsichtlich der beteiligten Größen.
> b) Vergleichen Sie beide Systeme hinsichtlich der Energieumwandlung.
> c) Begründen Sie, warum für beide Systeme die Schwingungsdauer unabhängig von der Amplitude ist.

**Aufgabe 3** `[原创]`
> Ein Hertz'scher Dipol wird mit einem Schwingkreis verglichen, dessen Kondensatorplatten auseinandergezogen wurden.
> a) Beschreiben Sie den Aufbau und die Funktionsweise des Hertz'schen Dipols.
> b) Erläutern Sie, warum ein realer Schwingkreis mit Widerstand $R$ gedämpft schwingt.
> c) Bewerten Sie Maßnahmen zur Vermeidung von Resonanzkatastrophen bei Brücken.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) DGL**：$U_C+U_L=0\Rightarrow\dfrac{q}{C}+L\dot I=0$，$I=\dot q$ → $\ddot q=-\dfrac{1}{LC}q$；解 $q(t)=q_{\max}\sin(\omega_0 t+\varphi_0)$ ✓ **得分点：回路方程 + 代 $I$ + 解形式**（AFB II）
2. **b) 频率与周期**：$\omega_0=\dfrac{1}{\sqrt{LC}}=\dfrac{1}{\sqrt{40\cdot10^{-3}\cdot10\cdot10^{-6}}}=\dfrac{1}{\sqrt{4{,}0\cdot10^{-7}}}\approx1581\,\text{rad/s}$；
   $f_0=\dfrac{\omega_0}{2\pi}\approx252\,\text{Hz}$；$T=2\pi\sqrt{LC}=2\pi\sqrt{4{,}0\cdot10^{-7}}\approx3{,}97\cdot10^{-3}\,\text{s}\approx4{,}0\,\text{ms}$ ✓ **得分点：$\omega_0$ + $T$ + 单位**
3. **c) 最大电流**：$\dfrac{q_{\max}^2}{2C}=\dfrac12LI_{\max}^2$，$q_{\max}=CU_0=10\cdot10^{-6}\cdot12=1{,}2\cdot10^{-4}\,\text{C}$；
   $I_{\max}=q_{\max}\omega_0=1{,}2\cdot10^{-4}\cdot1581\approx0{,}19\,\text{A}$ ✓ **得分点：能量守恒式 + 数值**（AFB II）

**Aufgabe 2** `[NRW-改编]`
1. **a) 量-量对照**：$m\!\leftrightarrow\!L$（惯性）、$k\!\leftrightarrow\!1/C$（回复）、$x\!\leftrightarrow\!q$、$v\!\leftrightarrow\!I$；对应 DGL $\ddot x=-\dfrac{k}{m}x$ 与 $\ddot q=-\dfrac{1}{LC}q$ **同形** ✓ **得分点：≥4 对对应 + DGL 同形**（AFB II）
2. **b) 能量层**：机械 $\tfrac12mv^2+\tfrac12kx^2$；电磁 $\tfrac12LI^2+\dfrac{q^2}{2C}$——**两式结构相同**，且都是「动能/磁能 ↔ 势能/电能」的周期互换，总和守恒，系统围绕**平衡态**振荡 ✓ **得分点：两种能量形式 + 转换机制**（AFB II/III）
3. **c) 振幅无关性**：两系统均为**线性**（$F=-kx$ 与 $U=-q/C$），DGL 中系数不含振幅 → $\omega_0=\sqrt{k/m}$、$\omega_0=1/\sqrt{LC}$ 与振幅无关。**这正是线性振子的标志** ✓ **得分点：线性性 + 系数不含振幅**（AFB III）

**Aufgabe 3** `[原创]`
1. **a) 描述**：赫兹偶极子 = **开放化的振荡回路**——把电容板拉开、线圈拉直，电荷在两端往复；E/B 场变化互相激发为**涡旋场**，能量以电磁波形式向外辐射 ✓ **得分点：开放回路 + 涡旋场 + 辐射**（AFB II）
2. **b) 阻尼**：真实回路有 $R$，焦耳热 $\tfrac12RI^2$ 持续耗散能量 → 振幅**指数衰减**；能量账为「储能 + 耗散」而非纯守恒 ✓ **得分点：耗散机制 + 指数衰减**（AFB II）
3. **c) Bewertung（须超出学科内部）**：措施如**调谐阻尼器（Tilger）、提高结构阻尼、避开 $\omega_0$ 设计、限制人群同步步频**。须落到**安全规范与人身风险**这一价值尺度：例如对**人行桥**，须权衡「结构成本」与「公共安全责任」；对**风致振动**须权衡「维护成本」与「长期可靠性」。**只谈「模型适用范围」不得分** [已验证]。✓ **得分点：具体措施 + 价值/规范/利益权衡 + lokal/global**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 把 `Schwingkreis` 当成「电路题」去做串并联化简（把 CN-only 的电路分析搬进来）；把赫兹偶极子当成独立新器件 | 记住 LC 回路在德国是**振动系统**；偶极子是**开放化的振荡回路** |
| **知识错** | $T=2\pi\sqrt{LC}$ 里 $L$ 与 $C$ 位置写反或漏根号；$\omega_0=1/\sqrt{LC}$ 写成 $1/(LC)$；类比表里 $k\!\leftrightarrow\!C$（应为 $1/C$） | 推导一次自己写出 $T$，不背；类比表先写 DGL 再对号 |
| **表达错** | 类比只列公式不写能量机制（丢 AFB III）；$R$ 存在时仍写「总能量守恒」 | 类比必写两段：量-量 + 能量；阻尼题写「储能 + 耗散」 |

---

## 7. Vernetzung

- **上游**：`LK-Differentialgleichungen-Vorbereitung.md`（五步法与微元法，**本条的直接前置**）· `LK-1-Induktion-und-Selbstinduktion.md`（`Induktivität` 与 `Kondensator`）· `Kreisbewegung-und-Gravitation.md`（$\omega$ 概念）
- **下游**：LK-2 的 `Interferenzbedingungen` / `Michelson-Interferometer`（电磁波的干涉）· LK-3 `Quantenphysik`（光子能量 $E=hf$ 与振荡频率）
- **横向**：`Basiskonzepte-Vier-Achsen.md`（`E+G` 与 `M+V`，**本条无 Z+D**）· `GK-LK-Fahrplan-Vergleich.md`（GK-3 的电磁振荡是**定性层**，与 LK-2 不同轨）· `03_Mathe` 的 Analysis（指数与三角函数）
- **术语卡**（建议入 csv）：`Schwingkreis` / `Thomson'sche Gleichung` / `Induktivität` / `Eigenfrequenz` / `Hertz'scher Dipol` / `Analogie`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题、不搬教材正文。
