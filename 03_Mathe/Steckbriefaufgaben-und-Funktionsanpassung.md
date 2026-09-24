---
fach: Mathe
thema: "Steckbriefaufgaben und Funktionsanpassung"
operatoren: [bestimmen, aufstellen, berechnen, loesen]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Mathe, Analysis]
---

# Steckbriefaufgaben und Funktionsanpassung (函数重构与待定系数求解)

> **中文理解**：Steckbriefaufgabe（特征信息重构题，又称 Rekonstruktion von Funktionen）是北威州高一高二微积分的核心考题。
> 题目不直接给出函数解析式，而是给出函数图像所满足的一组几何特征（点坐标、切线斜率、极值、拐点等），要求反向解出待定系数：
> 1. **设出通用多项式设式 (Allgemeiner Ansatz)**：
>    - 三次函数：$f(x) = ax^3 + bx^2 + cx + d$（4个待定系数，需4个独立条件）；
>    - 四次对称函数：若关于 $y$ 轴对称，只设偶次项 $f(x) = ax^4 + cx^2 + e$（仅3个待定系数）；
> 2. **列导数公式链 (Ableitungen vorbereiten)**：先求出一阶导 $f'(x)$ 与二阶导 $f''(x)$；
> 3. **几何语言转代数方程 (Übersetzung geometrischer Eigenschaften)**：严格依照特征翻译成 $f(x_0)=y_0$、$f'(x_0)=m$、$f''(x_0)=0$ 等等式；
> 4. **联立线性方程组并求解 (Lineares Gleichungssystem, LGS)**：运用加减消元法（Gauß-Verfahren）或代入法，求得各系数并写出最终解析式；
> 5. **充分性检验 (Probe & Kontrolle)**：代入原条件快速核验。

---

## 1. 几何特征与代数条件翻译对照表 (Übersetzungstabelle)

| 几何条件描述 (Geometrische Eigenschaft) | 德语考题常见题干 | 数学等式条件 (Bedingungsgleichung) |
|---|---|---|
| **经过某已知点** | *Der Graph verläuft durch den Punkt $P(x_0 \mid y_0)$.* | $f(x_0) = y_0$ |
| **与坐标轴的交点** | *Der Graph schneidet die $y$-Achse bei $y = 3$.* | $f(0) = 3 \implies d = 3$ |
| **已知横截距 / 零点** | *An der Stelle $x = 2$ liegt eine Nullstelle.* | $f(2) = 0$ |
| **切线斜率** | *Die Tangente an der Stelle $x = 1$ hat die Steigung $m = -4$.* | $f'(1) = -4$ |
| **水平切线** | *Der Graph hat an der Stelle $x = 3$ eine waagerechte Tangente.* | $f'(3) = 0$ |
| **已知极值点 (Hoch-/Tiefpunkt)** | *Der Graph besitzt im Punkt $H(2 \mid 5)$ ein lokales Maximum.* | **双重条件**：$f(2) = 5$ 且 $f'(2) = 0$ |
| **已知拐点 (Wendepunkt)** | *Der Graph hat im Punkt $W(1 \mid 2)$ einen Wendepunkt.* | **双重条件**：$f(1) = 2$ 且 $f''(1) = 0$ |
| **已知鞍点 (Sattelpunkt)** | *Im Punkt $S(0 \mid 1)$ liegt ein Sattelpunkt.* | **三重条件**：$f(0) = 1$、$f'(0) = 0$ 且 $f''(0) = 0$ |
| **相切于已知直线** | *Der Graph berührt die Gerade $y = 2x - 1$ an der Stelle $x = 3$.* | $f(3) = 2(3) - 1 = 5$ 且 $f'(3) = 2$ |

---

## 2. 北威州标准高分范例 (Klausur-Musterfall)

### 任务情境 (Aufgabenstellung)
> *Bestimmen Sie den Funktionsterm einer ganzrationalen Funktion dritten Grades, deren Graph im Ursprung einen Wendepunkt mit der Wendetangente $y = -3x$ besitzt und an der Stelle $x = 2$ ein lokales Extremum aufweist.*

**推演步骤 (Lösungsschritte)**:
1. **Ansatz für Funktion dritten Grades**:
   $$f(x) = ax^3 + bx^2 + cx + d$$
   $$f'(x) = 3ax^2 + 2bx + c$$
   $$f''(x) = 6ax + 2b$$

2. **Bedingungen formulieren (4 Unbekannte $\implies$ 4 Gleichungen)**:
   - (I) Wendepunkt im Ursprung $(0 \mid 0)$:
     $$f(0) = 0 \implies d = 0$$
   - (II) Krümmung am Wendepunkt $x = 0$ ist null:
     $$f''(0) = 0 \implies 2b = 0 \implies b = 0$$
   - (III) Steigung der Wendetangente im Ursprung ist $-3$:
     $$f'(0) = -3 \implies c = -3$$
   - (IV) Lokales Extremum an der Stelle $x = 2$:
     $$f'(2) = 0 \implies 3a(2)^2 + 2b(2) + c = 0$$

3. **LGS lösen**:
   Da $b = 0$ und $c = -3$ bereits feststehen, setzen wir in (IV) ein:
   $$12a + 2(0) - 3 = 0 \implies 12a = 3 \implies a = \frac{3}{12} = \frac{1}{4}$$

4. **Funktionsterm angeben**:
   $$f(x) = \frac{1}{4}x^3 - 3x$$

5. **Klausur-Antwortsatz (DE)**:
   > *Aufgrund der Symmetrieeigenschaften und der vorgegebenen geometrischen Bedingungen (Wendetangente im Ursprung und Extremstelle bei $x = 2$) lautet der gesuchte Funktionsterm $f(x) = \frac{1}{4}x^3 - 3x$.*
