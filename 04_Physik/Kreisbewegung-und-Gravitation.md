---
fach: Physik
thema: "Kreisbewegung und Gravitation"
operatoren: [angeben, beschreiben, berechnen, herleiten, erklären, begründen, auswerten, vergleichen, darstellen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Physik, Mechanik]
stufe: "EF"
kursart: "GK|LK"
---

# Kreisbewegung und Gravitation (圆周运动与引力)

> **中文理解**：本笔记覆盖 EF-2 的第一个 Inhaltsfeld `Kreisbewegung, Gravitation und physikalische Weltbilder` 的前两块——**圆周运动**与**引力**。圆周运动的核心是**七量互推**（$r,\varphi,T,f,v,\omega,a_z$，KLP 明文要求「七量全上且要求相互关系」[已验证]）与**向心力**（不是新的力，而是合力指向圆心的分量）；引力则放在 **`Feldkonzept`（场概念）** 框架下讲——**`Gravitationsfeld` 是 EF 唯一的「场」，也是 LK-1 电势的概念前身** [已验证]。卫星运动 = 引力恰好提供向心力，两式联立即得轨道量与 Kepler 定律。
>
> **Klausur-Relevanz**：整个 EF-2 在本项目**零覆盖**，且它是 Q 阶段 `Fadenstrahlrohr` / `Zyklotron` 的圆周运动基础 [已验证]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| `gleichförmige Kreisbewegung` | 匀速圆周运动 | uniform circular motion | 速率不变、方向变 | 「匀速」指速率不变 [据推断] |
| `Radius` $r$ | 半径 | radius | — | 七量之一 [已验证] |
| `Drehwinkel` $\varphi$ | 转角 | angle | $\varphi = \omega t$ | 七量之一 [已验证] |
| `Umlaufzeit` $T$ | 周期 | period | $T = \dfrac{1}{f}$ | 七量之一 [已验证] |
| `Umlauffrequenz` $f$ | 频率 | frequency | $f = \dfrac{1}{T}$，单位 Hz | 七量之一 [已验证] |
| `Bahngeschwindigkeit` $v$ | 线速度 | orbital speed | $v = \dfrac{2\pi r}{T} = \omega r$ | 七量之一 [已验证] |
| `Winkelgeschwindigkeit` $\omega$ | 角速度 | angular velocity | $\omega = \dfrac{2\pi}{T} = 2\pi f$ | 七量之一；**勿漏 $2\pi$** [据推断] |
| `Zentripetalbeschleunigung` $a_z$ | 向心加速度 | centripetal accel. | $a_z = \dfrac{v^2}{r} = \omega^2 r$ | 七量之一 [已验证] |
| `Zentripetalkraft` $F_z$ | 向心力 | centripetal force | $F_z = \dfrac{mv^2}{r} = m\omega^2 r$ | **合力的径向分量** [已验证] |
| `Gravitationsgesetz` | 万有引力定律 | law of gravitation | $F_G = G\dfrac{m_1m_2}{r^2}$ | $r$ 为**到质心**距离 [据推断] |
| `Gravitationsfeldstärke` | 引力场强 | gravitational field | $g = \dfrac{F_G}{m} = \dfrac{GM}{r^2}$ | **EF 唯一的场** [已验证] |
| `Kepler'sche Gesetze` | 开普勒三定律 | Kepler's laws | 椭圆 / 面积速度恒定 / $T^2\propto a^3$ | 由引力定律可推 [据推断] |

---

## 2. 知识结构 (Struktur)

### 2.1 圆周运动七量互推

中文理解：七量由两条基本关系串起来 —— $v=\omega r$ 与 $T=1/f$。已知任意两个独立量即可推出其余。$a_z=\omega^2 r$ 表示**即使速率不变，方向在变 → 必有加速度**。

> *Klausur-Satz*: „Bei einer gleichförmigen Kreisbewegung ändert sich ständig die Richtung der Geschwindigkeit; daher wirkt trotz konstanten Betrags der Geschwindigkeit eine zum Zentrum gerichtete Beschleunigung $a_z=\dfrac{v^2}{r}=\omega^2 r$." [原创]

⚠️ **易错**：$\omega = 2\pi f$（漏 $2\pi$ 是高频错误）；$v$ 不变 ≠ 加速度为零 [据推断]。

### 2.2 向心力不是新的力

中文理解：向心力是**已知力（重力、绳张力、摩擦力、洛伦兹力……）在径向的合力**，不是独立新增的力。离心力只是惯性系里的错觉（在转动参考系才出现）。

> *Klausur-Satz*: „Die Zentripetalkraft ist keine zusätzliche Kraft, sondern die resultierende, zum Kreismittelpunkt gerichtete Komponente der wirkenden Kräfte; eine ‚Zentrifugalkraft' tritt nur im rotierenden Bezugssystem als Scheinkraft auf." [原创]

### 2.3 引力场（Feldkonzept）

中文理解：引力不是「超距作用」，而是**空间每一点都有一个场强 $g=GM/r^2$**，方向指向中心质量。地面重力 $g\approx9{,}81\,\text{m/s}^2$ 只是它的特例。场线疏密表示场强大小 [据推断]。

> *Klausur-Satz*: „Das Gravitationsfeld beschreibt an jedem Punkt die auf die Masse bezogene Kraft; die Feldstärke ist $g=\dfrac{GM}{r^2}$ und entspricht der Fallbeschleunigung an diesem Ort." [原创]

### 2.4 卫星运动与 Kepler

中文理解：卫星作圆周运动时，**引力恰好充当向心力**：$G\dfrac{mM}{r^2}=\dfrac{mv^2}{r}$ → $v=\sqrt{\dfrac{GM}{r}}$。代入 $T=\frac{2\pi r}{v}$ 得 $T^2=\dfrac{4\pi^2}{GM}r^3$ → 即 Kepler 第三定律 $T^2\propto r^3$。

> *Klausur-Satz*: „Für einen Satelliten liefert die Gravitationskraft die Zentripetalkraft; daraus folgt $v=\sqrt{\dfrac{GM}{r}}$ und die Kepler-Beziehung $T^2=\dfrac{4\pi^2}{GM}r^3$." [原创]

⚠️ **经典概念错**：卫星「不掉下来」不是「没有引力」，而是**引力全部用作向心力**（切向速度使其「绕着掉」）[据推断]。

### 2.5 Basiskonzept 落点

- **`Mathematisieren und Vorhersagen`**：由引力定律算卫星/行星轨道数据、由 Kepler 求天文量 [已验证]。
- **`Zufall und Determiniertheit`**：行星运动的规律性是「自然律决定论」的范例 [已验证]。
- ⚠️ **EF-2 无 `Erhaltung und Gleichgewicht` 条目、无 `Superposition und Komponenten` 条目** [已验证]。

---

## 3. 解题方法 (Methoden)

### 3.1 圆周运动七量互推程序

**编号步骤**：
1. **列出已知量与未知量**，判断属于「圆周运动」还是「卫星/引力」情境 —— *KLP 工具：`angeben`（罗列）*
2. **先建两条桥**：$T=1/f$ 与 $v=\omega r$ —— *KLP 工具：`gleichförmige Kreisbewegung` 七量关系* [已验证]
3. **按需取用** $v=\frac{2\pi r}{T}$、$\omega=2\pi f$、$a_z=\omega^2 r=\frac{v^2}{r}$ —— *KLP 工具：七量公式*
4. **若涉及力**，写 $F_z=\frac{mv^2}{r}$ 并说明**谁提供**向心力 —— *KLP 工具：`Zentripetalkraft`（要求定量）* [已验证]
5. **单位/合理性检查**（$f$ 用 Hz、$\omega$ 用 rad/s）—— *KLP 工具：`berechnen` 过程要求* [已验证]

> **判据 / 决策点**：题中出现「周期/转速」→ 先走 2 步桥；出现「卫星/轨道高度」→ 走 3.2。

### 3.2 卫星轨道两式联立法

**编号步骤**：
1. **设轨道半径 $r=R_{\text{Erde}}+h$**（不是高度 $h$！）—— *KLP 工具：`Gravitationsgesetz` 中 $r$ 为质心距* [据推断]
2. **列引力 = 向心力**：$G\frac{mM}{r^2}=\frac{mv^2}{r}$ → 消去 $m$ —— *KLP 工具：`Gravitationsgesetz` + `Zentripetalkraft`*
3. **求 $v$ 或 $r$**：$v=\sqrt{GM/r}$；geostationär 时令 $T=24\,\text{h}$ 反解 $h$ —— *KLP 工具：`Kepler'sche Gesetze`* [据推断]
4. **回代求 $T$ 或验证 Kepler** —— *KLP 工具：`auswerten`*

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 图像三件套 —— 面积/斜率/截距的物理量翻译

- **技法内容**：拿到任何 $y$-$x$ 图，固定问三句：**斜率是什么量？面积是什么量？截距是什么量？** 由定义式与量纲反推。在圆周/引力语境：`ω-t` 斜率 = 角加速度；`T²-r³` 图为过原点直线（斜率 $=4\pi^2/GM$），可直接由行星数据求 $M$。
- **DE-Anschluss**：`Messwerttabelle / Diagramm / Gesetz` 三表征形式（**EF-1 明文要求**）· 由测量数据求 $v$/$a$（**EF-1 的天花板工具**）· `Kepler` 数据分析（EF-2）。**德国的官方抓手比中国还显式** [据推断]。
- **合规性**：✅ —— 图像法是 EF 核心训练项，本技法只是归纳成三问清单。⚠️ 收录范围限 KLP 内出现的图像。
- **Abitur 应用**：EF-2「用行星数据检验 Kepler」（$T^2$-$r^3$ 图直线化）——**AFB II** [据推断]。
- **来源**：`[CN-课标]` 必修1.1.3 图像法 · `[CN-教材]` 图像法体系（**只记方法名与逻辑**）。

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | **Aufgabenart I `Materialgebundene Aufgabe`**（可含行星数据表 / 卫星演示）[已验证] |
| Operator | `berechnen` / `herleiten` / `auswerten` / `vergleichen` / `begründen` |
| AFB | I（读数据）→ **II（七量互推 / 卫星两式联立）** → III（Kepler 检验 + 模型局限） |
| 建议分值 / 时长 | 单题约 15–25 BE；EF Klausur 90 min [已验证] |

> ⚠️ **材料挂靠说明**：本节知识点在材料题中**以「行星轨道数据表（$r,T$）→ 检验 Kepler」或「卫星轨道高度 → 求周期」的形态出现**；在实验题中**以「用向心力装置测 $F_z$ 与 $r$ 的关系」的形态出现**。答案须挂靠数据/实验 [已验证]。

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Eine Zentrifuge rotiert mit $f = 3000\,\text{U/min}$. Ein Punkt am Rand hat den Abstand $r = 12\,\text{cm}$ von der Drehachse.
> a) Berechnen Sie $T$, $\omega$ und $v$ dieses Punktes.
> b) Berechnen Sie die Zentripetalbeschleunigung und vergleichen Sie sie mit $g$.
> c) Erklären Sie, warum beim Schleudern Flüssigkeit nach außen gedrängt wird.

**Aufgabe 2** `[NRW-改编]`
> Ein geostationärer Satellit umkreist die Erde in der Äquatorebene mit $T = 24\,\text{h}$ ($M_{\text{Erde}}=5{,}97\cdot10^{24}\,\text{kg}$, $G=6{,}67\cdot10^{-11}\,\text{m^3\,kg^{-1}\,s^{-2}}$, $R_{\text{Erde}}=6{,}37\cdot10^{6}\,\text{m}$).
> a) Leiten Sie aus dem Kräfteansatz $v=\sqrt{GM/r}$ her.
> b) Berechnen Sie die Bahnhöhe $h$.
> c) Begründen Sie, warum ein geostationärer Satellit nur über dem Äquator stehen kann.

**Aufgabe 3** `[原创]`
> Eine Datenreihe für die vier großen Jupitermonde (vereinfacht) liefert folgende Paare aus Bahnradius $r$ und Umlaufzeit $T$:
> Io $(4{,}2\cdot10^{8}\,\text{m};\ 1{,}5\cdot10^{5}\,\text{s})$, Europa $(6{,}7\cdot10^{8};\ 3{,}1\cdot10^{5})$, Ganymed $(1{,}07\cdot10^{9};\ 6{,}2\cdot10^{5})$, Kallisto $(1{,}88\cdot10^{9};\ 1{,}4\cdot10^{6})$.
> a) Zeigen Sie durch Rechnung, dass $T^2 \propto r^3$ gilt (Kepler III).
> b) Ermitteln Sie aus der Steigung des $T^2$-$r^3$-Diagramms die Masse des Jupiter.
> c) Beurteilen Sie die Aussagekraft des Modells „Kreisbahn" für diese Monde.

### 5.3 Musterlösung

**Aufgabe 1** `[NRW-改编]`
1. **a)** $f = \dfrac{3000}{60}\,\text{Hz} = 50\,\text{Hz}$ → $T = \dfrac1f = 0{,}02\,\text{s}$，$\omega = 2\pi f \approx 314\,\text{rad/s}$，$v=\omega r = 314\cdot0{,}12\approx37{,}7\,\text{m/s}$ ✓ **得分点：$f$ 换算 + 三量 + 单位**
2. **b)** $a_z = \omega^2 r = 314^2\cdot0{,}12\approx1{,}2\cdot10^4\,\text{m/s}^2 \approx 1200\,g$ ✓ **得分点：$a_z$ 式 + 与 $g$ 比较**
3. **c) 解释**：需要的向心力 $F_z=m\omega^2 r$ 随 $r$ 增大而增大；离心机提供的径向力不足以使液体作圆周运动，液体被「甩」向更大半径处（从受力/惯性角度解释）。✓ **得分点：$F_z\propto r$ + 受力归因**（AFB II）

**Aufgabe 2** `[NRW-改编]`
1. **a) 推导**：$G\dfrac{mM}{r^2}=\dfrac{mv^2}{r}$ → 约去 $m$ → $v^2=\dfrac{GM}{r}$ → $v=\sqrt{\dfrac{GM}{r}}$ ✓ **得分点：力等式 + 约去 m + 开方**
2. **b) 高度**：$v=\dfrac{2\pi r}{T}\Rightarrow \dfrac{4\pi^2r^2}{T^2}=\dfrac{GM}{r}\Rightarrow r^3=\dfrac{GMT^2}{4\pi^2}$
   $T=24\cdot3600=8{,}64\cdot10^4\,\text{s}$
   $r^3=\dfrac{6{,}67\cdot10^{-11}\cdot5{,}97\cdot10^{24}\cdot(8{,}64\cdot10^4)^2}{4\pi^2}\approx7{,}53\cdot10^{22}\,\text{m}^3 \Rightarrow r\approx4{,}22\cdot10^7\,\text{m}$
   $h = r-R_{\text{Erde}} = 4{,}22\cdot10^7-6{,}37\cdot10^6\approx3{,}58\cdot10^7\,\text{m}\approx3{,}6\cdot10^4\,\text{km}$ ✓ **得分点：$r^3$ 式 + 减去地球半径**
3. **c) 论证**：geostationär 要求卫星「相对地面静止」→ 必须与地球自转同周期**同轴同向**；只有**赤道上方**的圆轨道，其向心方向才指向地轴（否则轨道平面与赤道面不共面，无法保持在地面同一点上方）。✓ **得分点：周期同步 + 轨道面必须在赤道面**（AFB II/III）

**Aufgabe 3** `[原创]`
1. **a) 检验**：算 $T^2/r^3$：
   Io: $(1{,}5\cdot10^5)^2/(4{,}2\cdot10^8)^3 \approx 3{,}18\cdot10^{-13}$；Europa: $\approx3{,}20\cdot10^{-13}$；Ganymed: $\approx3{,}36\cdot10^{-13}$；Kallisto: $\approx5{,}5\cdot10^{-13}$。
   前三个基本恒定（≈$3{,}2\cdot10^{-13}$），**支持 $T^2\propto r^3$**；Kallisto 偏差较大（近似数据处理），可说明。✓ **得分点：比值计算 + 趋势判断**
2. **b) 求 $M$**：由 $T^2=\dfrac{4\pi^2}{GM}r^3$ → 斜率 $k=\dfrac{4\pi^2}{GM}=3{,}2\cdot10^{-13} \Rightarrow M=\dfrac{4\pi^2}{Gk}\approx1{,}9\cdot10^{27}\,\text{kg}$ ✓ **得分点：斜率→$M$ 反解**
3. **c) Beurteilung（模型局限，属 Sachkompetenz）**：真实轨道是椭圆（$e$ 小），圆轨道是一阶近似；用圆轨道 + 恒定 $T$ 得到恒定比值，与数据大体吻合，说明对近圆轨道该模型适用。**注意：此处为模型适用性判断，按 KLP 属 Sachkompetenz，不是 Bewertung** [已验证]。✓ **得分点：指出近似条件 + 与数据一致性**（AFB III）

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| **辨别错** | 受力图上凭空画「离心力」；把「卫星不掉下来」说成「没有引力」 | 向心力是已知力的径向分量；卫星引力=向心力 |
| **知识错** | $\omega$ 与 $f$ 混用（漏 $2\pi$）；把 $r$ 取成高度 $h$ 而非质心距；$v$ 不变就判 $a=0$ | 牢记 $\omega=2\pi f$；$r=R+h$；圆周运动必有 $a_z$ |
| **表达错** | `begründen` 只写结论不给理由链；单位（Hz/rad/s）漏写 | 用「因为…所以…」；单位随行标注 |

---

## 7. Vernetzung

- **上游**：`Newtonsche-Gesetze-und-Krafte.md`（受力分析 + 牛顿第二定律）· `Gleichmaessig-beschleunigte-Bewegung-Freier-Fall.md`（$g$）
- **下游**：`Lorentzkraft-Trajektorie-Geometriemethode.md`（本卡七量与 $F_z$ 是其直接前置）· LK-1 `elektrisches Potential`（`Gravitationsfeld` 是其概念前身）
- **横向**：`03_Mathe` 三角函数/幂函数拟合；EF-2 第三块「世界图景与 Zeitdilatation」
- **术语卡**（建议入 csv）：`Umlaufzeit` / `Winkelgeschwindigkeit` / `Zentripetalkraft` / `Gravitationsgesetz` / `Gravitationsfeld` / `Kepler'sche Gesetze`

---

> **来源标注说明**：`[已验证]` = 依据官方 KLP / Curriculum 源文件确认 · `[据推断]` = 基于结构与常规题型推导 · `[未获取到]` = 未找到官方源。
> **版权声明**：题干结构可引 `[NRW-官方公开]`（IQB Abituraufgabenpools / standardsicherung Beispielaufgaben）；本题组为 `[NRW-改编]` / `[原创]`，**解析全部原创**，不搬任何出版社教辅原题。
