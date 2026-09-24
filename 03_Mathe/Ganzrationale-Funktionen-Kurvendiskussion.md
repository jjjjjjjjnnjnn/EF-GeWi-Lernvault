---
fach: Mathe
thema: "Ganzrationale Funktionen und Kurvendiskussion"
operatoren: [berechnen, bestimmen, untersuchen, interpretieren]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Mathe, Analysis]
---

# Ganzrationale Funktionen und Kurvendiskussion (整式多项式函数与函数性质研究)

> **中文理解**：整式多项式函数（Ganzrationale Funktion / Polynomfunktion）是高中微积分分析（Analysis）的基石。
> 在北威州 EF 阶段，Kurvendiskussion（曲线讨论）要求系统性地剖析函数的六大核心几何性质：
> 1. **对称性 (Symmetrie)**：观察指数奇偶性（纯偶次为偶函数关于 $y$ 轴对称；纯奇次为奇函数关于原点对称）；
> 2. **渐近行为 (Verhalten im Unendlichen / Globalverhalten)**：由最高次项（Leitterm $a_n x^n$）决定无穷远处的极限走势；
> 3. **零点 (Nullstellen)**：令 $f(x)=0$，掌握因式提公因式 (Ausklammern)、$pq$ 公式、换元法 (Substitution) 与无计算器快速因式分解；
> 4. **极值点 (Hochpunkte / Tiefpunkte)**：一阶导数判据（必要条件 $f'(x_0)=0$；充分条件 $f''(x_0) \neq 0$ 或符号变换法 VZW）；
> 5. **拐点 (Wendepunkte)**：二阶导数判据（必要条件 $f''(x_0)=0$，充分条件 $f'''(x_0) \neq 0$）；
> 6. **实际应用建模 (Extremwertproblem mit Nebenbedingung)**：建立目标函数 (Zielfunktion) 与约束条件 (Nebenbedingung)，求最优解。

---

## 1. 核心数学概念与判据表 (Kriterien der Kurvendiskussion)

| 分析环节 | 检验条件 (Mathematische Bedingung) | 判定准则与结论 | 德语 Klausur 规范表述 |
|---|---|---|---|
| **Achsensymmetrie zur y-Achse** | $f(-x) = f(x)$ | 所有项指数均为偶数 | *Der Graph ist achsensymmetrisch zur y-Achse, da nur gerade Exponenten auftreten.* |
| **Punktsymmetrie zum Ursprung** | $f(-x) = -f(x)$ | 所有项指数均为奇数 | *Der Graph ist punktsymmetrisch zum Koordinatenursprung, da nur ungerade Exponenten auftreten.* |
| **Globalverhalten ($x \to \pm\infty$)** | $\lim_{x \to \pm\infty} a_n x^n$ | 仅考察最高次主导项符号与奇偶 | *Das Verhalten für $x \to \pm\infty$ wird durch den Leitterm bestimmt.* |
| **Lokales Maximum (Hochpunkt)** | $f'(x_E) = 0$ 且 $f''(x_E) < 0$ | 切线水平且图像下凸（右弯曲） | *Da $f'(x_E)=0$ und $f''(x_E)<0$, liegt an der Stelle $x_E$ ein lokales Maximum vor.* |
| **Lokales Minimum (Tiefpunkt)** | $f'(x_E) = 0$ 且 $f''(x_E) > 0$ | 切线水平且图像上凹（左弯曲） | *Da $f'(x_E)=0$ und $f''(x_E)>0$, liegt an der Stelle $x_E$ ein lokales Minimum vor.* |
| **Wendepunkt (Krümmungswechsel)** | $f''(x_W) = 0$ 且 $f'''(x_W) \neq 0$ | 弯曲方向发生改变的点 | *An der Stelle $x_W$ ändert der Graph sein Krümmungsverhalten, somit liegt ein Wendepunkt vor.* |
| **Sattelpunkt (Terrassenpunkt)** | $f'(x_S) = 0$, $f''(x_S) = 0$, $f'''(x_S) \neq 0$ | 水平切线但非极值的拐点 | *Es handelt sich um einen Sattelpunkt mit waagerechter Tangente.* |

---

## 2. 北威州标准考题演练 (Klausur-Musteraufgabe)

### 任务情境 (Aufgabenstellung)
Gegeben ist die ganzrationale Funktion dritten Grades:
$$f(x) = \frac{1}{3}x^3 - x^2 - 3x + 4 \quad (x \in \mathbb{R})$$

#### 子任务 1 (Operator: untersuchen)
> *Untersuchen Sie das Verhalten der Funktion $f$ für $x \to \pm\infty$ und bestimmen Sie die Koordinaten aller lokalen Extrempunkte des Graphen.*

**推演步骤 (Lösungsschritte)**:
1. **Globalverhalten**:
   $$\lim_{x \to +\infty} \left(\frac{1}{3}x^3\right) = +\infty, \quad \lim_{x \to -\infty} \left(\frac{1}{3}x^3\right) = -\infty$$
   > *Klausur-Satz*: Für $x \to +\infty$ strebt $f(x)$ gegen $+\infty$; für $x \to -\infty$ strebt $f(x)$ gegen $-\infty$.

2. **Ableitungen bilden**:
   $$f'(x) = x^2 - 2x - 3$$
   $$f''(x) = 2x - 2$$
   $$f'''(x) = 2$$

3. **Notwendige Bedingung für Extrema**: $f'(x) = 0$
   $$x^2 - 2x - 3 = 0 \iff (x - 3)(x + 1) = 0 \implies x_1 = -1, \quad x_2 = 3$$

4. **Hinreichende Bedingung prüfen**:
   - Für $x_1 = -1$:
     $$f''(-1) = 2(-1) - 2 = -4 < 0 \implies \text{lokales Maximum (Hochpunkt)}$$
     $$y_1 = f(-1) = \frac{1}{3}(-1)^3 - (-1)^2 - 3(-1) + 4 = -\frac{1}{3} - 1 + 3 + 4 = \frac{17}{3} \approx 5{,}67$$
     > $\text{HP}\left(-1 \mid \frac{17}{3}\right)$
   - Für $x_2 = 3$:
     $$f''(3) = 2(3) - 2 = 4 > 0 \implies \text{lokales Minimum (Tiefpunkt)}$$
     $$y_2 = f(3) = \frac{1}{3}(3)^3 - (3)^2 - 3(3) + 4 = 9 - 9 - 9 + 4 = -5$$
     > $\text{TP}(3 \mid -5)$

5. **Klausur-Antwortsatz (DE)**:
   > *Der Graph der Funktion besitzt an der Stelle $x = -1$ ein lokales Maximum mit dem Hochpunkt $\text{HP}\left(-1 \mid \frac{17}{3}\right)$ und an der Stelle $x = 3$ ein lokales Minimum mit dem Tiefpunkt $\text{TP}(3 \mid -5)$.*

---

## 3. 实际情境极值问题解题脚手架 (Extremwertprobleme im Sachzusammenhang)

在中德考题对比中，实际极值问题通常遵循严格的四步法：
1. **Hauptbedingung (目标函数)**：列出待最大化或最小化的物理/几何量（如体积 $V = l \cdot b \cdot h$、面积 $A = x \cdot y$）；
2. **Nebenbedingung (约束条件)**：由现实给定量建立变量间的代数关联（如铁丝总长 $2x + 2y = 40 \implies y = 20 - x$）；
3. **Zielfunktion in einer Variable (单变量目标函数)**：将约束代入目标函数，明确定义域（Definitionsbereich $D$）；
4. **Optimierung und Randwertprüfung (求导驻点与边界检验)**：令导数等于零，检验充分条件，比对区间边界端点值。

> **Klausur-Merksatz**:
> *Bei Anwendungsaufgaben muss der ökonomische bzw. geometrische Definitionsbereich stets beachtet und eine Randwertprüfung durchgeführt werden, um absolute Extrema sicher zu identifizieren.*
