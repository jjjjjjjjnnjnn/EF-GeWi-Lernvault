---
fach: Physik
thema: "Gleichmaessig beschleunigte Bewegung und freier Fall"
operatoren: [berechnen, herleiten, interpretieren, skizzieren]
klausurrelevant: true
datum: 2026-09-24
tags: [EF, Physik, Kinematik]
---

# Gleichmaessig beschleunigte Bewegung und freier Fall (匀变速直线运动与自由落体)

> **中文理解**：匀变速直线运动（Gleichmäßig beschleunigte geradlinige Bewegung）是物理运动学（Kinematik）的核心基础模型。
> 其本质特征是加速度恒定不变（$a = \text{konstant}$），由速度对时间的导数恒定所决定：
> 1. **运动学基本方程 (Grundgleichungen)**：
>    - 加速度函数：$a(t) = a = \text{konstant}$；
>    - 速度-时间函数：$v(t) = a \cdot t + v_0$（$v-t$ 图像为倾斜直线，斜率即加速度）；
>    - 位移-时间函数：$s(t) = \frac{1}{2} a \cdot t^2 + v_0 \cdot t + s_0$（$s-t$ 图像为开口朝上或朝下的抛物线）；
> 2. **无时间公式 (Zeitfreie Gleichung)**：$v^2 - v_0^2 = 2 \cdot a \cdot \Delta s$（已知初末速度与位移求加速度或路程时的降维利器）；
> 3. **自由落体 (Freier Fall)**：忽略空气阻力时，所有物体均以重力加速度 $g \approx 9{,}81\,\text{m/s}^2$ 竖直向下加速；
> 4. **运动的独立叠加原理 (Superpositionsprinzip)**：在平抛运动（Waagerechter Wurf）中，水平方向为匀速直线运动（$x = v_0 \cdot t$），竖直方向为独立自由落体（$y = \frac{1}{2} g \cdot t^2$），互不干扰。

---

## 1. 核心运动学公式与图像特征表 (Kinematische Gesetzmäßigkeiten)

| 物理量与运动形式 | 数学解析式 | 图像直观特征 (Diagramm) | 斜率与面积物理意义 | 德语 Klausur 标准表述 |
|---|---|---|---|---|
| **恒定加速度** | $a(t) = a_0$ | $a-t$ 图为平行于时间轴的水平线 | 曲线下面积为速度增量 $\Delta v = a \cdot t$ | *Die Beschleunigung ist zeitlich konstant.* |
| **瞬时速度** | $v(t) = a \cdot t + v_0$ | $v-t$ 图为斜率为 $a$ 的直线 | 曲线下方面积严格等于经过的位移 $\Delta s$ | *Die Steigung im $v-t$-Diagramm entspricht der Beschleunigung.* |
| **位移与轨迹** | $s(t) = \frac{1}{2}at^2 + v_0t$ | $s-t$ 图为二次抛物线 | 某点切线斜率即该时刻瞬时速度 $v(t)$ | *Die Momentangeschwindigkeit ist die Steigung der Tangente im $s-t$-Graph.* |
| **自由落体速度** | $v(t) = g \cdot t$ | 起始于原点的倾斜直线 | $g \approx 9{,}81\,\text{m/s}^2$（下落常数） | *Im freien Fall fallen alle Körper unabhängig von ihrer Masse gleich schnell.* |
| **自由落体高度** | $h(t) = \frac{1}{2}g \cdot t^2$ | 二次抛物线 | 下落时间 $t = \sqrt{\frac{2h}{g}}$ | *Die Fallzeit hängt ausschließlich von der Fallhöhe ab.* |

---

## 2. 北威州标准考题演练 (Klausur-Musterfall)

### 任务情境 (Aufgabenstellung)
Ein Rettungshubschrauber schwebt in einer konstanten Höhe von $h = 80\,\text{m}$ über dem Erdboden. Zum Zeitpunkt $t = 0$ wird ein Notfallpaket ohne Anfangsgeschwindigkeit ausgeklinkt. Der Luftwiderstand wird in dieser Aufgabe vernachlässigt ($g = 10\,\text{m/s}^2$).

#### 子任务 1 (Operator: berechnen)
> *Berechnen Sie die Fallzeit $t_{\text{Fall}}$ des Notfallpakets sowie die Aufprallgeschwindigkeit $v_{\text{Aufprall}}$ auf dem Boden in $\text{km/h}$.*

**推演步骤 (Lösungsschritte)**:
1. **Ansatz für freien Fall**:
   $$h = \frac{1}{2} g \cdot t^2$$
2. **Fallzeit bestimmen**:
   $$t_{\text{Fall}} = \sqrt{\frac{2h}{g}} = \sqrt{\frac{2 \cdot 80\,\text{m}}{10\,\text{m/s}^2}} = \sqrt{16\,\text{s}^2} = 4\,\text{s}$$
3. **Aufprallgeschwindigkeit berechnen**:
   $$v_{\text{Aufprall}} = g \cdot t_{\text{Fall}} = 10\,\frac{\text{m}}{\text{s}^2} \cdot 4\,\text{s} = 40\,\frac{\text{m}}{\text{s}}$$
4. **Einheitenumrechnung in $\text{km/h}$**:
   $$40\,\frac{\text{m}}{\text{s}} = 40 \cdot 3{,}6\,\frac{\text{km}}{\text{h}} = 144\,\frac{\text{km}}{\text{h}}$$
5. **Klausur-Antwortsatz (DE)**:
   > *Das Paket erreicht den Erdboden nach einer Fallzeit von $4\,\text{s}$. Die Aufprallgeschwindigkeit beträgt $40\,\text{m/s}$ (entsprechend $144\,\text{km/h}$).*

---

## 3. 平抛运动与叠加原理 (Waagerechter Wurf & Bahnkurve)

当物体以初速度 $v_0$ 水平抛出时：
- 水平方向（匀速）：$x(t) = v_0 \cdot t \implies t = \frac{x}{v_0}$
- 竖直方向（自由落体）：$y(t) = \frac{1}{2} g \cdot t^2$
- **轨迹方程 (Bahnkurvengleichung)**：
  $$y(x) = \frac{g}{2 v_0^2} \cdot x^2$$
  轨迹为严格的以原点为顶点的抛物线，水平射程与下落时间呈线性正比。
