---
fach: Physik
thema: "LK-Vorbereitung: Differentialgleichungen (Kleinwinkel + Elementarisieren)"
operatoren: [aufstellen, herleiten, begründen, berechnen, vergleichen, bewerten]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Physik, Mechanik]
stufe: "Q1"
kursart: "LK"
---

# LK-Vorbereitung: Differentialgleichungen (LK 微分方程前置包) `[LK]`

> **中文理解**：这是**台阶①**的化解包 [已验证]。EF **全文不出现「Differentialgleichung」一词**，最深数学工具只到「由图表求 $v$/$a$」；而 **LK-1** 一上来要求「用 DGL 及其给定解描述 RC 充放电」，**LK-2** 要求**自行推导**弹簧振子与小角近似单摆的 DGL 并由解求 $T$ [已验证]。本包提供**两把思维工具**——① **小角线性化**（把非线性力律化为 $F=-kx$）② **微元法**（以恒代变、再求和）——它们都是**思维方式**而非新知识块，且 `Mathematisieren und Vorhersagen` 这个 Basiskonzept 就是它们的官方名分 [据推断]。
>
> **Klausur-Relevanz**：§4 缺口清单**第一优先**（★★★）[已验证]。LK 的 `herleiten`（推导 DGL）与 `planen`（自行设计实验）密度显著高于 GK [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `Differentialgleichung` (DGL) | 微分方程 | differential equation | 含未知函数及其导数的方程，如 $\ddot x=-\dfrac{k}{m}x$ | EF **不出现** [已验证] |
| `lineare Rückstellkraft` | 线性回复力 | linear restoring force | $F=-kx$ | 线性 = 力正比位移 [据推断] |
| `harmonische Schwingung` | 简谐振动 | harmonic oscillation | $x(t)=A\sin(\omega t+\varphi_0)$ | DGL 的标准解 [据推断] |
| `Kleinwinkelnäherung` | 小角近似 | small-angle approximation | $\sin\varphi\approx\varphi$（rad），$\cos\varphi\approx1$ | 线性化关键 [据推断] |
| `Eigenfrequenz` | 本征频率 | natural frequency | $\omega=\sqrt{k/m}$ 或 $\omega=\sqrt{g/l}$ | 由 DGL 读出 [据推断] |
| `Schwingungsdauer` | 振动周期 | period | $T=\dfrac{2\pi}{\omega}$ | 由 $\omega$ 得 [据推断] |
| `Elementarisieren` / `Mikroelement-Methode` | 微元法 | elementarisation | 先微元 → 再求和取极限 | 德国 `Mathematisieren` 的落点 [据推断] |
| `Thomson'sche Gleichung` | 汤姆孙公式 | Thomson equation | $T=2\pi\sqrt{LC}$ | LK-2 由 DGL 推出 [已验证] |
| `Zeitkonstante` $\tau$ | 时间常数 | time constant | $\tau=RC$（RC 回路） | LK-1 由 DGL 解读出 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 DGL 是什么（一句话降维）

中文理解：DGL 就是「**描述变化率之间关系**的方程」。牛顿第二定律 $F=ma$ 中 $a=\ddot x$ 本身就是一个二阶 DGL 的雏形——凡力依赖于位置或速度，就得到 DGL。**它不是新物理，只是把「力 → 加速度」这一步写成方程并求解。**

> *Klausur-Satz*: „Die Bewegungsgleichung $F=ma$ mit $a=\ddot x$ ist eine Differentialgleichung: Sie verknüpft die zweite Ableitung des Ortes mit der wirkenden Kraft. Aus ihr lässt sich der zeitliche Verlauf $x(t)$ bestimmen." [原创]

### 2.2 弹簧振子：由线性力律推 DGL（LK-2 规定动作）

$F=-kx$ 且 $F=m\ddot x$ → $\ddot x=-\dfrac{k}{m}x$。该方程的解为 $x(t)=A\sin(\omega t+\varphi_0)$，代入可得 $\omega=\sqrt{k/m}$，故 $T=2\pi\sqrt{m/k}$。

中文理解：**关键是「由解的形式读出 $\omega$」这一步**（不是死背 $T$ 公式）。

> *Klausur-Satz*: „Mit $F=-kx$ folgt aus dem zweiten Newtonschen Gesetz $\ddot x=-\dfrac{k}{m}x$. Diese DGL wird durch $x(t)=A\sin(\omega t+\varphi_0)$ mit $\omega=\sqrt{k/m}$ gelöst; daraus ergibt sich $T=2\pi\sqrt{m/k}$." [原创]

### 2.3 单摆：小角线性化（**台阶①的核心**）

$F_{\text{Rück}}=-mg\sin\varphi$ 是**非线性**的。小角时 $\sin\varphi\approx\varphi=\dfrac{x}{l}$ → $F\approx-\dfrac{mg}{l}x=-kx$ → 与弹簧振子同构 → $\omega=\sqrt{g/l}$，$T=2\pi\sqrt{l/g}$。

中文理解：**顺序是「先线性化 → 再识别为谐振子 → 直接读 $\omega$ 与 $T$」**。中国学生熟此顺序，德国学生常卡在「不知道该先做近似」。**近似本身是德国 KLP 的规定动作** [已验证]。

> *Klausur-Satz*: „Für kleine Auslenkungen gilt $\sin\varphi\approx\varphi$, sodass $F\approx-\dfrac{mg}{l}x$ gilt. Damit ist die Bewegungsgleichung linear; der Fadenpendel verhält sich für kleine Winkel wie ein harmonischer Oszillator mit $T=2\pi\sqrt{l/g}$." [原创]

⚠️ **误差方向必须说对**：角度增大时实际周期**偏大**（$\sin\varphi<\varphi$）[据推断]。

### 2.4 微元法（RC 充放电与 Q-U 面积）

中文理解：把过程切成无穷小段，每段内「以恒代变」，再求和取极限。RC 充电：$U_0=RI+\dfrac{q}{C}$，用 $I=\dfrac{\mathrm dq}{\mathrm dt}$ 得 DGL $\dfrac{\mathrm dq}{\mathrm dt}=\dfrac{U_0}{R}-\dfrac{q}{RC}$，解 $q(t)=CU_0\left(1-e^{-t/RC}\right)$。

> *Klausur-Satz*: „Mit dem Maschenansatz $U_0=RI+\dfrac{q}{C}$ und $I=\dfrac{\mathrm dq}{\mathrm dt}$ erhält man die DGL $\dfrac{\mathrm dq}{\mathrm dt}=\dfrac{U_0}{R}-\dfrac{q}{RC}$; ihre Lösung ist $q(t)=CU_0\left(1-e^{-t/RC}\right)$." [原创]

### 2.5 Basiskonzept 落点

- **`Mathematisieren und Vorhersagen`**：**用 DGL 及其解可精确预测振动的时间进程**（LK-2 明文）[已验证]。
- **`Erhaltung und Gleichgewicht`**：振动系统总围绕一平衡态振荡 [已验证]。

---

## 3. 解题方法 (Methoden)

### 3.1 DGL 推导五步法

**编号步骤**：
1. **选坐标 + 找平衡位置**，把位移 $x$ 定义为**离开平衡位置**的量 —— *KLP 工具：`Kräftegleichgewicht`（EF-1）*
2. **写回复力**（弹簧 $-kx$；单摆 $-mg\sin\varphi$）—— *KLP 工具：`beschleunigende Kräfte`（EF-1）+ 几何*
3. **非线性先线性化**（$\sin\varphi\approx\varphi$），化为 $F=-k'x$ —— *KLP 工具：`Kleinwinkelnäherung`（LK-2 规定动作）* [已验证]
4. **代入 $F=m\ddot x$** 得 DGL，写出**解的形式** $x=A\sin(\omega t+\varphi_0)$ —— *KLP 工具：牛顿第二定律（EF-1）*
5. **由解读出 $\omega$，求 $T=2\pi/\omega$**；必要时讨论近似适用条件 —— *KLP 工具：`herleiten`（LK）*

> **判据 / 决策点**：力正比于位移 → 直接写 $\omega=\sqrt{k/m}$；力含 $\sin\varphi$ → 先线性化；力含电流/电荷 → 用微元法建 DGL。

### 3.2 微元法两步框架

1. **微元**：取小段 $\Delta t$（或 $\Delta q$），段内把变化率当常量 —— *KLP 工具：`Mathematisieren und Vorhersagen`*
2. **求和/取极限**：把各小段效果累加，识别为「累积量」（面积/积分思想）—— *KLP 工具：`Q-U` 面积 = 储能（GK-3 明文）* [已验证]

> ⚠️ **合规红线**：**不得据此引入定积分运算**（德国 EF/Q 无此要求，属超纲）[已验证]。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode 6: 线性化近似（小角近似）

- **技法内容**：遇非线性力律时先**判能否在小量条件下线性化**（$\sin\varphi\approx\varphi$），化为 $F=-kx$，识别为谐振子并读 $\omega$ 与 $T$；**始终记住近似适用条件与误差方向**（角度增大时周期偏大）。
- **DE-Anschluss**：**LK-2 明文要求「在小角近似下由线性力律推导单摆 DGL」**（近似是德国的规定动作）[已验证] · `Spannenergie`（EF-1）· `Federpendel`（GK-1）· `harmonische Schwingungen`（GK-1/LK-2）。
- **合规性**：✅ —— 完全落在 LK-2 要求内；中国侧提供的只是「**先线性化、再识别为谐振子**」这一思维顺序。
- **Abitur 应用**：LK-2 DGL 推导题；由解求 $T$ 与 `Thomson'sche Gleichung`。**AFB II/III** [据推断]。
- **来源**：`[CN-课标]` 选必1.2.1 + 1.2.2 · `[CN-教材]` 小角近似处理（只记方法名与逻辑）。

### CN-Methode 7: 微元法与极限思想（`Elementarisieren`）

- **技法内容**：处理**变化的量**时，切成无穷小段，段内**以恒代变**，再求和/取极限（变力做功、非匀加速位移、连续分布场）。
- **DE-Anschluss**：`Mathematisieren und Vorhersagen`（本技法的官方名分）· LK-1「用 DGL 及其给定解描述 RC 充放电」（DGL 本质是微元关系的极限形式）· GK-3 `Q-U` 面积 = 储能 [已验证]。
- **合规性**：✅ —— 「以恒代变、再求和」是思维方式，不是知识块。⚠️ **不得引入定积分运算**。
- **Abitur 应用**：GK-3 RC 建模与 `Q-U` 面积；LK-1 DGL 描述；LK-2 阻尼振动定性。**AFB II/III** [据推断]。
- **来源**：`[CN-课标]` 必修1.1.3「极限方法」+ 必修2.1.1 · `[CN-教材]` 微元法体系。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`** / **Aufgabenart II `Fachpraktische Aufgabe`**（实验测周期）[已验证] |
| Operator | `aufstellen` / `herleiten` / `begründen` / `bewerten` |
| AFB | I（识别力律）→ **II（推导 DGL + 由解求 $T$）** → III（近似局限 + 模型评判） |
| 建议分值 / 时长 | 单题约 20–30 BE；Q LK Klausur 135–180 / 225 min（实验可 +60）[已验证] |

> ⚠️ **材料挂靠说明**：本节知识点在材料题中**以「给定力律或实验力-位移图 → 推导 DGL」的形态出现**；在实验题中**以「用 Fadenpendel 测 $T$ 与 $l$ 的关系 → 验证 $T=2\pi\sqrt{l/g}$」的形态出现**。答案须挂靠材料/实验 [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Ein Federpendel ($m = 0{,}50\,\text{kg}$) hängt an einer Feder mit $k = 20\,\text{N/m}$.
> a) Leiten Sie aus dem Kräfteansatz die DGL der Bewegung her.
> b) Geben Sie die Lösung $x(t)$ an und bestimmen Sie $T$.
> c) Berechnen Sie die Geschwindigkeit im Nulldurchgang bei $A = 4{,}0\,\text{cm}$ (Energieansatz).

**Aufgabe 2** `[CN-改编]`
> Ein Fadenpendel der Länge $l = 1{,}0\,\text{m}$ wird um $\varphi_0 = 8°$ ausgelenkt.
> a) Begründen Sie, dass für kleine Winkel $\sin\varphi\approx\varphi$ verwendet werden darf.
> b) Leiten Sie die DGL her und bestimmen Sie $T$.
> c) Bewerten Sie, ob für $\varphi_0 = 30°$ die Formel $T=2\pi\sqrt{l/g}$ noch brauchbar ist.

**Aufgabe 3** `[原创]`
> Ein Kondensator ($C=2{,}0\,\text{mF}$) wird über einen Widerstand ($R=500\,\Omega$) an $U_0=12\,\text{V}$ geladen.
> a) Stellen Sie mit $I=\mathrm dq/\mathrm dt$ die DGL für $q(t)$ auf.
> b) Ermitteln Sie die Zeitkonstante $\tau$ und die Zeit bis $q=0{,}63\,CU_0$.
> c) Erläutern Sie den Zusammenhang zur Mikroelement-Methode.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a) DGL**：$F=-kx$，$F=m\ddot x$ → $\ddot x=-\dfrac{k}{m}x=-\dfrac{20}{0{,}50}x=-40x$ ✓ **得分点：力律 + 代入牛顿第二定律**
2. **b) 解与周期**：$x(t)=A\sin(\omega t+\varphi_0)$，$\omega=\sqrt{40}\approx6{,}3\,\text{rad/s}$，$T=\dfrac{2\pi}{\omega}=2\pi\sqrt{\dfrac{m}{k}}=2\pi\sqrt{0{,}025}\approx0{,}99\,\text{s}$ ✓ **得分点：解形式 + $\omega$ + $T$**
3. **c) 速度**：能量守恒 $\tfrac12 kA^2=\tfrac12mv_{\max}^2$ → $v_{\max}=A\sqrt{k/m}=0{,}040\cdot6{,}3\approx0{,}25\,\text{m/s}$ ✓ **得分点：能量式 + 数值**（AFB II）

**Aufgabe 2** `[CN-改编]`
1. **a) 理由**：$\varphi_0=8°\approx0{,}14\,\text{rad}$，$\sin\varphi_0=0{,}139$，二者相对差 $\approx0{,}5\%$，故可近似 $\sin\varphi\approx\varphi$ ✓ **得分点：rad 换算 + 数值对比**
2. **b) 推导**：$F=-mg\sin\varphi\approx-mg\dfrac{x}{l}$ → $\ddot x=-\dfrac{g}{l}x$ → $\omega=\sqrt{g/l}$，$T=2\pi\sqrt{l/g}=2\pi\sqrt{1{,}0/9{,}81}\approx2{,}0\,\text{s}$ ✓ **得分点：线性化一步 + $T$**
3. **c) Bewertung（须超出学科内部）**：$30°$ 时 $\sin\varphi$ 与 $\varphi$ 差约 $4\%$，$T$ 实际偏大约 $1{,}7\%$——**对计时精度要求不高的应用尚可，对计量/时间标准等要求则不可**。须落到**精度要求/规范**这一价值尺度，不能只说「有误差」。✓ **得分点：量化偏差 + 明确的精度/规范判据**（AFB III）

**Aufgabe 3** `[原创]`
1. **a) DGL**：$U_0=RI+\dfrac{q}{C}$，$I=\dfrac{\mathrm dq}{\mathrm dt}$ → $\dfrac{\mathrm dq}{\mathrm dt}=\dfrac{U_0}{R}-\dfrac{q}{RC}$ ✓ **得分点：回路方程 + 代入 $I$**
2. **b) 时间常数**：$\tau=RC=500\cdot2{,}0\cdot10^{-3}=1{,}0\,\text{s}$；$q=0{,}63\,CU_0$ 对应 $t\approx\tau=1{,}0\,\text{s}$（解 $q(t)=CU_0(1-e^{-t/\tau})$）✓ **得分点：$\tau$ 计算 + 解的解释**
3. **c) 阐释**：把充电视为「每一小段 $\Delta t$ 内电流近似恒定、电量累加」——正是微元法；求和取极限即得指数解。✓ **得分点：把微元法语言与 DGL 解对应**（AFB II）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 该线性化的单摆直接用 $\sin\varphi$ 不近似；该用 DGL 的却套旧公式 | 先判「力是否正比位移」再决定路径 |
| **知识错** | $\omega^2=k/m$ 记成 $\omega=k/m$；推导中漏「由解读 $\omega$」这一步；忘记近似条件 | 推导后必写「因此 $\omega=…$」 |
| **表达错** | 只写结果不给 Ansatz；用积分运算（超纲）；不讨论近似适用范围 | 按五步法逐步写；末尾加一句模型局限 |

---

## 7. Vernetzung

- **上游**：`Newtonsche-Gesetze-und-Krafte.md`（$F=ma$）· `Kreisbewegung-und-Gravitation.md`（$\omega$ 概念）
- **下游**：LK-2 `Federpendel`/`Fadenpendel` DGL、`Schwingkreis`、`Thomson'sche Gleichung`；LK-1 RC 充放电
- **横向**：**`03_Mathe` 的 Analysis**（导数与指数函数，**强烈联动**）；`LK-Feld-Mathematisierung-Coulomb-Potential.md`（同为前置包）
- **术语卡**（建议入 csv）：`Differentialgleichung` / `Kleinwinkelnäherung` / `Eigenfrequenz` / `Elementarisieren` / `Zeitkonstante`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[CN-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题。
