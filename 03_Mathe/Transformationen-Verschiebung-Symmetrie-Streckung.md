---
fach: Mathe
thema: "Transformationen: Verschiebung, Symmetrie, Streckung"
operatoren: [angeben, beschreiben, skizzieren, bestimmen, begruenden]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Mathe, Analysis]
stufe: "EF"
---

# Transformationen: Verschiebung, Symmetrie, Streckung (图像变换：平移、对称、伸缩)

> **中文理解**：图像变换研究「把已知函数 $f$ 的图像怎么挪、怎么翻、怎么压」，从而快速得到新函数 $g$ 的图像，或反过来从图像读出解析式。它属于 NRW KLP 的 **Inhaltsfeld A（Funktionen und Analysis）**，EF 学段的 `Spiegelung an den Koordinatenachsen`、`Verschiebung`、`Streckung` 三条明文条目 [已验证]。
> 考试里以**免工具小问**出现：给图写式、给式画图（`skizzieren`/`beschreiben`/`angeben`），也是 Q1 建模题「由 Skizze 定 Term」的入口 [据推断]。
> 核心口诀只有一句：**括号内管左右、括号外管上下；负号管翻转、系数管伸缩，且横向系数是「反着来」的**。
>
> **Klausur-Relevanz**：ZKE Teil A / Abitur 1. Prüfungsteil 的免工具常客；图式互推是 `Modellieren` 的第一步 [据推断]。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| Verschiebung | 平移 | translation | $g(x)=f(x-c)+d$：向右 $c$、向上 $d$ | 括号内→左右、括号外→上下 |
| Spiegelung an der x-Achse | 关于 x 轴镜像 | reflection in x-axis | $g(x)=-f(x)$ | 纵坐标变号 |
| Spiegelung an der y-Achse | 关于 y 轴镜像 | reflection in y-axis | $g(x)=f(-x)$ | 横坐标变号 |
| Punktspiegelung am Ursprung | 关于原点对称 | reflection in origin | $g(x)=-f(-x)$ | 奇函数特征 |
| Streckung in y-Richtung | 沿 y 方向伸缩 | vertical scaling | $g(x)=a\cdot f(x)$ | $\|a\|>1$ 拉长，$<1$ 压缩 |
| Streckung in x-Richtung | 沿 x 方向伸缩 | horizontal scaling | $g(x)=f(bx)$ | $\|b\|>1$ **压缩**，$<1$ 拉长 |
| Parameterform der Sinusfunktion | 正弦函数参数式 | parameter form of sine | $g(x)=a\sin(b(x+c))+d$ | 四参数各管一件事 [已验证] |
| Scheitelpunktform | 顶点式 | vertex form | $g(x)=a(x-d)^2+e$ | 抛物线最常用的变换写法 |

> 术语全部取自 KLP EF 条目与 `Lernbaum-Mathe.md` 节点 `MA-A2-01/02/03/04` [已验证/据推断]。

---

## 2. 知识结构 (Struktur)

### 2.1 平移：方向为什么「反着记」

把 $f(x)$ 换成 $f(x-c)$，图像**向右**移 $c$；换成 $f(x)+d$，图像**向上**移 $d$。

> 中文理解：横向是「新图像在某点的值 = 老图像在左 $c$ 处的值」，所以整个图像被推向右。纵向直接加在函数值上，直觉即方向。

> *Klausur-Satz*: Der Graph von $g(x)=f(x-c)+d$ entsteht aus dem Graphen von $f$ durch Verschiebung um $c$ in positive $x$-Richtung und um $d$ in positive $y$-Richtung.

### 2.2 对称：三个负号位置，三种镜像

| 变换 | 解析式 | 几何动作 |
|---|---|---|
| $g(x)=-f(x)$ | 函数值变号 | 关于 **x 轴** 翻折 |
| $g(x)=f(-x)$ | 自变量变号 | 关于 **y 轴** 翻折 |
| $g(x)=-f(-x)$ | 两者都变号 | 关于 **原点** 中心对称 |

> *Klausur-Satz*: Der Graph von $-f(x)$ ist das Spiegelbild von $f$ bezüglich der $x$-Achse, der von $f(-x)$ bezüglich der $y$-Achse.

### 2.3 伸缩：横向系数「反着来」

- 纵向：$a\cdot f(x)$ —— $|a|>1$ 拉长，$0<|a|<1$ 压扁。
- 横向：$f(bx)$ —— $|b|>1$ **压缩**（横坐标乘 $1/b$），$0<|b|<1$ 拉长。

> 中文理解：$f(2x)$ 表示「在 $x$ 处的新值 = 老图像在 $2x$ 处的值」，即图像被压向 y 轴。这是最高频的辨别错。

> *Klausur-Satz*: Bei $f(bx)$ wird der Graph in $x$-Richtung mit dem Faktor $\tfrac1b$ gestreckt; für $|b|>1$ bedeutet das eine Stauchung.

### 2.4 组合顺序

对 $g(x)=a\,f\big(b(x-c)\big)+d$，**先横向（b 与 c）、再纵向（a 与 d）**；横向内部**先伸缩后平移**（先 $b$ 后 $c$）。

> *Klausur-Satz*: Bei zusammengesetzten Transformationen führt man zuerst die $x$-Richtung (Streckung mit $b$, dann Verschiebung mit $c$) und danach die $y$-Richtung (Streckung mit $a$, dann Verschiebung mit $d$) durch.

---

## 3. 解题方法 (Methoden)

### 3.1 方法 A：由式画图（给 Term → 画 Skizze）

1. **识别基准函数**（$x^2$、$x^3$、$|x|$、$\sin x$、$e^x$…）—— *KLP 工具：`Funktionstypen`*
2. **拆参数**：写成 $a\,f(b(x-c))+d$ 的标准形 —— *KLP 工具：`Termumformung`*
3. **横向变换**：先 $b$ 伸缩、再 $c$ 平移 —— *KLP 工具：`Streckung`/`Verschiebung`*
4. **纵向变换**：先 $a$ 伸缩（负号则翻转）、再 $d$ 平移 —— *KLP 工具：`Spiegelung`/`Streckung`*
5. **标关键点**：零点、极值点、与 y 轴交点、两端走势 —— *KLP 工具：`skizzieren`（须画出本质）*

> **判据 / 决策点**：草图上必须标出至少一个**具体坐标**（如顶点），否则「未描述本质」丢分 [据推断]。

### 3.2 方法 B：由图画式（给 Skizze → 写 Term）

1. **找基准形状**，写出 $f$ —— *KLP 工具：`Funktionstypen`*
2. **读平移量**：顶点/对称中心相对原点的位移 $(c,d)$ —— *KLP 工具：`Verschiebung`*
3. **读伸缩量**：取一个易读点，比对新旧函数值定 $a$；由零点间距定 $b$ —— *KLP 工具：`Streckung`*
4. **定符号**：开口/朝向定 $a$ 的正负 —— *KLP 工具：`Spiegelung`*
5. **回代验证**：把另一个关键点代入检验 —— *KLP 工具：`Punktprobe`*

> **判据 / 决策点**：先定 $(c,d)$（平移最易读），再定 $a,b$（伸缩），顺序颠倒会互相干扰。

### 3.3 方法 C：正弦四参数解读（`MA-A2-04`）

1. **振幅** $|a|$ =（最大值 − 最小值）/2 —— *KLP 工具：`Parameterwirkung`*
2. **周期** $p=2\pi/|b|$ —— *KLP 工具：`Sinusfunktion`*
3. **相位/左右移** $c$（注意 $b(x+c)$ 里是 $+c$ 则左移）—— *KLP 工具：`Verschiebung`*
4. **中轴** $y=d$ —— *KLP 工具：`Verschiebung`*

> *Klausur-Satz*: Für $g(x)=a\sin(b(x+c))+d$ beschreibt $|a|$ die Amplitude, $\tfrac{2\pi}{|b|}$ die Periode, $-c$ die Verschiebung in $x$-Richtung und $d$ die Verschiebung in $y$-Richtung.

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 图像变换口诀「左加右减、上加下减；横缩反读、纵缩正读」

- **技法内容**：中国把图像变换固定成一套**口诀化、双向可逆**的操作：① 左右平移看自变量：$f(x+h)$ 左移、$f(x-h)$ 右移（**左加右减**）；② 上下平移看函数值：$f(x)+k$ 上移、$-k$ 下移（**上加下减**）；③ 横向伸缩「反读」系数：$f(\omega x)$ 横坐标缩为 $1/\omega$；④ 纵向伸缩「正读」系数：$A f(x)$ 纵坐标乘 $A$。并配 $A/\omega/\varphi$ 三参数体系处理三角函数 $y=A\sin(\omega x+\varphi)$。
- **DE-Anschluss**：EF 已教 `Verschiebung`、`Spiegelung an den Koordinatenachsen`、`Streckung` [已验证]；正弦参数作用在 `MA-A2-04` 有对应条目 [已验证]。口诀只是把德国已有的三条变换**排成固定顺序 + 强制双向读写**，不含新知识。
- **合规性**：✅ 完全合规 —— 变换本身是 EF 明文内容；口诀仅为记忆辅助。⚠️ 但**三角恒等变换（和差/倍角公式）**属中国必修而德国 EF 不列，本卡**不引入**，仅用参数解读。
- **Abitur 应用**：免工具段图式互推（AFB I–II）；LK 阶段 $a\sin(b(x+c))+d$ 的**无工具求导**直接依赖本卡的参数拆解 [据推断]。
- **来源**：`[CN-课标]` 函数图象变换、$y=A\sin(\omega x+\varphi)$ 的图象与参数 · `[CN-教材]` 左右/上下平移口诀 · `[CN-高考]` 图象变换与解析式互推

---

## 5. Klausur-Training

### 5.1 官方题型定位

| 项 | 内容 |
|---|---|
| Aufgabenart | Aufgabenart I（免工具，图式互推）为主 [据推断] |
| Operator | `angeben` / `beschreiben` / `skizzieren` / `bestimmen`（数学不按动词分 AFB）[已验证] |
| AFB | I（直接指认）→ II（组合变换与互推）[据推断] |
| 建议分值 / 时长 | 3–6 BE / 约 4–8 min [据推断] |

### 5.2 训练题

**Aufgabe 1** `[NRW-改编]`
> Gegeben ist $f(x)=x^2$. Beschreiben Sie, wie der Graph von $g(x)=(x-3)^2+1$ aus dem Graphen von $f$ entsteht, und geben Sie die Koordinaten des Scheitelpunkts an.

**Aufgabe 2** `[原创]`
> Der Graph von $f$ wird zuerst an der $y$-Achse gespiegelt und anschließend um $2$ nach unten verschoben. Bestimmen Sie den Term der so entstandenen Funktion $h$ in Abhängigkeit von $f$ und geben Sie an, für welchen Wert von $x$ der Punkt $(1\mid f(1))$ auf dem Graphen von $h$ liegt.

**Aufgabe 3** `[原创]`
> Gegeben ist $g(x)=\sin\big(2(x+\tfrac{\pi}{4})\big)-1$.
> a) Geben Sie Amplitude, Periode und die Verschiebung in $y$-Richtung an.
> b) Skizzieren Sie den Graphen von $g$ für $0\le x\le 2\pi$ und markieren Sie einen Hochpunkt.

**Aufgabe 4** `[NRW-改编]`
> Der Graph einer Funktion $p$ ist eine nach unten geöffnete Parabel mit Scheitelpunkt $S(2\mid 3)$, die durch den Punkt $P(0\mid -1)$ verläuft. Bestimmen Sie den Funktionsterm von $p$ in Scheitelpunktform.

### 5.3 Musterlösung

**Aufgabe 1**
1. **Standardform**: $g(x)=(x-3)^2+1$ ist bereits Scheitelpunktform ✓
2. **Verschiebung**: $x-3$ ⇒ um $3$ nach **rechts**; $+1$ ⇒ um $1$ nach **oben** ✓ 得分点：方向正确
3. **Scheitelpunkt**: $S(3\mid1)$ ✓ 得分点：坐标给出

**Aufgabe 2**
1. **Spiegelung an der y-Achse**: $f(-x)$ ✓ 得分点：$f(-x)$ 而非 $-f(x)$
2. **Verschiebung nach unten**: $h(x)=f(-x)-2$ ✓
3. **Punktbedingung**: Für $x=1$ ist $h(1)=f(-1)-2$; der Punkt $(1\mid f(1))$ liegt auf $h$ genau dann, wenn $f(-1)-2=f(1)$ ✓ 得分点：把「点在图上」翻译成等式
4. **Folgerung**: Diese Bedingung ist im Allgemeinen nur für spezielle $f$ erfüllt (z. B. $f$ gerade); für ein gerades $f$ gilt $f(-1)=f(1)$ und damit $h(1)=f(1)-2\neq f(1)$. Also liegt der Punkt im Allgemeinen **nicht** auf dem Graphen von $h$. ✓ 得分点：结论句

**Aufgabe 3**
1. **a) Amplitude**: $|a|=1$ ✓
2. **a) Periode**: $p=\dfrac{2\pi}{2}=\pi$ ✓ 得分点：用 $2\pi/|b|$
3. **a) y-Verschiebung**: $d=-1$ (um $1$ nach unten) ✓
4. **a) x-Verschiebung**: $x+\tfrac{\pi}{4}$ ⇒ um $\tfrac{\pi}{4}$ nach **links** ✓ 得分点：方向
5. **b) Skizze**: 中轴 $y=-1$，振幅 $1$ ⇒ 值域 $[-2,0]$；一个 Hochpunkt liegt bei $x=\tfrac{\pi}{4}$ mit $g(\tfrac{\pi}{4})=1-1=0$ ✓ 得分点：标出具体点
6. **b) Verlauf**: 周期 $\pi$，Hochpunkte bei $x=\tfrac{\pi}{4},\ \tfrac{\pi}{4}+\pi,\dots$; Tiefpunkte bei $x=\tfrac{3\pi}{4},\dots$ ✓

**Aufgabe 4**
1. **Ansatz**: $p(x)=a(x-2)^2+3$ mit $a<0$ ✓ 得分点：用 Scheitelpunktform
2. **Punkt einsetzen**: $p(0)=a(0-2)^2+3=4a+3$ ✓
3. **Gleichung**: $4a+3=-1\Rightarrow 4a=-4\Rightarrow a=-1$ ✓ 得分点：解参数
4. **Kontrolle**: $a=-1<0$ ⇒ nach unten geöffnet, passt zur Angabe ✓
5. **Term**: $p(x)=-(x-2)^2+3$ ✓ 得分点：完整函数项

---

## 6. Fehlerquellen（典型错误）

| 类型 | 表现 | 对策 |
|---|---|---|
| 辨别错 | 把 $f(2x)$ 当成横向拉伸（实为压缩） | 方法 A 步骤 3：横向系数「反着读」 |
| 辨别错 | 把 $f(x-2)$ 说成「向左移 2」 | 口诀：括号内「左加右减」 |
| 知识错 | 混淆 $-f(x)$（x 轴）与 $f(-x)$（y 轴） | 方法 2.2 三行表，先写负号位置再判轴 |
| 知识错 | 组合变换时先平移后伸缩，顺序错 | 横向内部**先 b 后 c** |
| 表达错 | Skizze 不标任何坐标 → 「未描述本质」[据推断] | 至少标出顶点/一个关键点 |

---

## 7. Vernetzung

- **上游**：`MA-A1-01` Potenzfunktionen · `MA-A1-02` Ganzrationale Funktionen（[`Ganzrationale-Funktionen-Kurvendiskussion.md`](Ganzrationale-Funktionen-Kurvendiskussion.md)）
- **下游**：`MA-A2-04` Parameterwirkung Sinus → LK `MA-A6-05` 三角与 `ln` 求导（[`Trigonometrische-und-Logarithmusfunktionen-LK.md`](Trigonometrische-und-Logarithmusfunktionen-LK.md)）· `MA-A6-01` Modellierung（由 Skizze 定 Term）
- **横向**：物理（简谐振动、波的参数 $A/\omega/\varphi$）· `Analysis-Physik-Kinetik-Vernetzung.md`
- **术语卡**：`Verschiebung` / `Spiegelung an der Koordinatenachse` / `Streckung` / `Scheitelpunktform` / `Amplitude` / `Periode`（建议由主线程补入 EF 术语表）

---

> **来源标注说明**：`[已验证]` = 实际访问官方源确认 · `[据推断]` = 基于搜索摘要 · `[未获取到]` = 未找到，如实标注。
> **版权**：本笔记仅引用 NRW 官方公开题的结构与题型；训练题全部为原创或改编（CN 技法只取方法层，不搬高考原题），解析为原创。不搬运出版社教辅原文。
