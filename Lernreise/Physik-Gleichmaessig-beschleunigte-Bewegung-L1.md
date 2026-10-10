---
fach: Physik
thema: "Gleichmaessig beschleunigte Bewegung"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren]
klausurrelevant: true
datum: 2026-10-10
tags: [EF, Physik, Mechanik]
version: Enterprise-v5
---

# Lernreise: Gleichmaessig beschleunigte Bewegung (L1, Ziel: Klausur)

> Didaktischer Archetyp: D: 理科POE仿真探究实验室 (Predict-Observe-Explain)
> Werkzeug ID: [Werkzeug: kinematik]

---

## Schritt 1 — entdecken

> 真实情境: 一列高铁以 $120\text{ km/h}$ 紧急刹车。司机从看到障碍到踩下刹车有 $0{,}9\text{ s}$ 反应时间。问题一: 反应时间内列车按原速走多远. 问题二: 踩下刹车后减速滑行距离有多远. 问题三: 如果初速翻倍, 刹车距离翻几倍.

**设问 (Leitfrage)**: 初速变为两倍时, 纯制动距离如何变化.

- [Option A]: 刹车距离与初速成正比: 初速翻倍, 距离翻倍。
  - Folge: 高速刹车的代价与速度增长相同, 制动痕长度只翻一倍。
- [Option B]: 刹车距离与初速平方成正比: 初速翻倍, 距离变为四倍。
  - Folge: 高速刹车的代价快于速度增长, 制动痕长度变为四倍。

AUFLÖSUNG (nach der Wahl lesen)

Mechanismus zu Option A: 该直觉把刹车看成匀速运动, 认为距离只由 $v_0$ 一次方决定。它忽略了速度本身在刹车过程中持续下降, 高速段单位时间内吞掉的路程更长, 因而低估了高速的代价。

Mechanismus zu Option B: 刹车是匀减速过程, 速度从 $v_0$ 线性降到 $0\text{ m/s}$。平均速度为 $\frac{v_0}{2}$, 制动时间本身也与 $v_0$ 成正比, 两者相乘得到 $s$ 与 $v_0^2$ 成正比。好比高铁刹车: 时速翻倍, 刹车痕长变为四倍, 像叠了四层刹车垫。

> 一句话本质: 匀减速刹车中时间与平均速度都随初速增长, 两者相乘使制动距离服从平方律。

**Klausur-Satz**: `Bei konstanter Verzoegerung waechst der reine Bremsweg mit dem Quadrat der Anfangsgeschwindigkeit, weil Bremszeit und mittlere Geschwindigkeit jeweils proportional zu $v_0$ sind.`

---

## Schritt 2 — ausprobieren

[Werkzeug: kinematik]

中文理解: 本步用参数沙盒验证平方律。先固定减速度, 改变初速, 观察 $v$-$t$-图直线斜率不变而包围面积快速放大。核心定律为速度时间关系与位移时间关系:

$$v = v_0 + a \cdot t$$

$$s = v_0 \cdot t + \frac{1}{2} \cdot a \cdot t^2$$

其中 $v$ 为瞬时速度, $v_0$ 为初速, $a$ 为恒定加速度, $t$ 为时间, $s$ 为位移。

AUFGABE (berechnen, AFB II):
Gegeben sind $a = -4\text{ m/s}^2$ und $v_0 = 33\text{ m/s}$. Ein Zug bremst bis zum Stillstand. Berechnen Sie die Bremszeit $t_B$ und den reinen Bremsweg $s_B$.

HILFE:
- Richtung: Zuerst mit der Endbedingung des Stillstands und dem Geschwindigkeits-Zeit-Gesetz die Bremszeit bestimmen.
- Richtung: Danach mit dem Weg-Zeit-Gesetz aus Anfangsgeschwindigkeit, Bremszeit und Beschleunigung den reinen Bremsweg berechnen.
- Richtung: Auf konsistente Einheiten und das Vorzeichen der Verzoegerung achten, erst am Ende Zahlen einsetzen.

COMPLETION (Lückentext):
- Die Bremszeit betraegt $t_B =$ ___ $\text{s}$.
- Der reine Bremsweg betraegt $s_B =$ ___ $\text{m}$; der Anhalteweg ist die Summe aus Reaktionsweg und $s_B$.

MUSTERLÖSUNG:
Bremszeit: $$t_B = \frac{-33\text{ m/s}}{-4\text{ m/s}^2} = 8{,}25\text{ s}$$
Bremsweg: $$s_B = 33\text{ m/s} \cdot 8{,}25\text{ s} + \frac{1}{2} \cdot (-4\text{ m/s}^2) \cdot (8{,}25\text{ s})^2 = 272{,}25\text{ m} - 136{,}13\text{ m} = 136{,}12\text{ m}$$
Reaktionsweg extra: $$s_{\text{Reaktion}} = v_0 \cdot t_R = 33\text{ m/s} \cdot 0{,}9\text{ s} = 29{,}7\text{ m}$$ Der Anhalteweg ist $$s_{\text{Halt}} = s_{\text{Reaktion}} + s_B$$

**Klausur-Satz**: `Mit $v = 0\text{ m/s}$ folgt $t_B = \frac{-v_0}{a}$ und durch Einsetzen in $s = v_0 \cdot t + \frac{1}{2} \cdot a \cdot t^2$ ergibt sich der reine Bremsweg.`

---

## Schritt 3 — entdecken

中文理解: 本步从图像推出定律。$v$-$t$-图是一条直线, 斜率恒定代表加速度不变, 直线与时间轴包围的梯形面积正好等于位移。斜率给出速度公式, 面积给出位移公式, 两者构成匀加速运动的完整推导链。

```diagram
[Gerade im $v$-$t$-Diagramm bei konstanter Beschleunigung] -> [Steigung der Gerade ablesen -> Beschleunigung $a$] -> [Flaeche unter der Gerade berechnen -> Weg $s$] -> [Geschwindigkeitsgesetz und Weg-Zeit-Gesetz herleiten]
```

推导链条:
$$a = \frac{\Delta v}{\Delta t}$$ 得到 $$v = v_0 + a \cdot t$$
梯形面积得到 $$s = \frac{v_0 + v}{2} \cdot t$$ 代入 $v$ 得到 $$s = v_0 \cdot t + \frac{1}{2} \cdot a \cdot t^2$$

### 考纲核心三词 (KLP-Termini)

1. **Momentangeschwindigkeit** (瞬时速度): 某一时刻的速度值, 对应 $v$-$t$-图上该时刻点的纵坐标。德语定义: Geschwindigkeit zu einem exakten Zeitpunkt, abgelesen als Funktionswert $v(t)$ im $v$-$t$-Diagramm.
2. **Beschleunigung** (加速度): 单位时间内速度的变化率, 对应 $v$-$t$-图直线的斜率。德语定义: Aenderung der Geschwindigkeit pro Zeit, definiert durch $a = \frac{\Delta v}{\Delta t}$ mit Einheit $\text{m/s}^2$.
3. **Weg-Zeit-Gesetz** (位移时间定律): 匀加速运动位移随时间变化的二次函数关系。德语定义: Quadratischer Zusammenhang zwischen Weg und Zeit in der Form $s = v_0 \cdot t + \frac{1}{2} \cdot a \cdot t^2$.

**Klausur-Satz**: `Im $v$-$t$-Diagramm entspricht die Steigung der Geraden der Beschleunigung $a$, waehrend die Flaeche unter der Geraden den zurueckgelegten Weg $s$ liefert.`

---

## Schritt 4 — check

中文理解: 本步专排计算失分点。第一, 平均速度与瞬时速度不可混用, 刹车全程平均速度是 $\frac{v_0}{2}$, 不是 $v_0$。第二, 总停车距离必须加上反应距离, 公式为 $s_{\text{Halt}} = s_{\text{Reaktion}} + s_B$, 其中 $s_{\text{Reaktion}} = v_0 \cdot t_R$。第三, 题干给 $km/h$ 时必须先换算, 换算关系为 $v_{\text{km/h}} = v_{\text{m/s}} \cdot 3{,}6$, 反向为 $v_{\text{m/s}} = \frac{v_{\text{km/h}}}{3{,}6}$。忘记任何一项都会丢整道大题的步骤分。

### 关卡微测对抗

`FRAGE: Warum unterschaetzt die Rechnung mit $s = v_0 \cdot t$ den Bremsweg systematisch? | ANTWORT: Weil $s = v_0 \cdot t$ eine gleichfoermige Bewegung voraussetzt, waehrend beim Bremsen $v(t) = v_0 + a \cdot t$ mit negativem $a$ gilt, sodass nur $s = v_0 \cdot t + \frac{1}{2} \cdot a \cdot t^2$ und zusaetzlich $s_{\text{Reaktion}} = v_0 \cdot t_R$ korrekt sind.`

**Klausur-Satz**: `Fehlerquellen sind die Verwechslung von mittlerer und momentaner Geschwindigkeit, das Vergessen von $s_{\text{Reaktion}} = v_0 \cdot t_R$ sowie die fehlende Umrechnung zwischen $\text{m/s}$ und $\text{km/h}$.`

---

## Schritt 5 — szenario

> SITUATION: 住宅区路口发生电动滑板车事故。地面留下 $12\text{ m}$ 刹车痕。鉴定给出有效减速度 $a = -5\text{ m/s}^2$, 终速 $v = 0\text{ m/s}$。该路段限速 $25\text{ km/h}$。问题: 骑手是否超速. 请用匀加速运动定律取证。

中文理解: 本题是逆向取证, 已知制动距离反推初速。思路是消去时间, 用速度位移关系 $v^2 - v_0^2 = 2 \cdot a \cdot s$ 直接求 $v_0$, 再换算成 $km/h$ 与限速对比并做出是否超速的解释。

**AUFGABE (berechnen & interpretieren) [AFB II/III]**:
1. Leiten Sie aus $v = v_0 + a \cdot t$ und $s = v_0 \cdot t + \frac{1}{2} \cdot a \cdot t^2$ die zeitfreie Gleichung $v^2 - v_0^2 = 2 \cdot a \cdot s$ her oder wenden Sie sie an.
2. Berechnen Sie mit $s = 12\text{ m}$, $a = -5\text{ m/s}^2$ und $v = 0\text{ m/s}$ die Anfangsgeschwindigkeit $v_0$ in $\text{m/s}$ und in $\text{km/h}$.
3. Interpretieren Sie das Ergebnis im Hinblick auf die zulässige Höchstgeschwindigkeit von $25\text{ km/h}$.

**MUSTERLÖSUNG Dreischritt (Ansatz -> Rechnung -> Interpretation)**:
1. Ansatz: Gleichmaessig verzögerte Bewegung mit $$v^2 - v_0^2 = 2 \cdot a \cdot s$$ und Endbedingung $$v = 0\text{ m/s}$$
2. Rechnung: $$0 - v_0^2 = 2 \cdot (-5\text{ m/s}^2) \cdot 12\text{ m}$$ also $$v_0^2 = 120\text{ m}^2\text{/s}^2$$ und $$v_0 = \sqrt{120}\text{ m/s} = 10{,}95\text{ m/s}$$ Umrechnung: $$v_0 = 10{,}95\text{ m/s} \cdot 3{,}6 = 39{,}4\text{ km/h}$$
3. Interpretation: Messwert $39{,}4\text{ km/h}$ liegt deutlich über $25\text{ km/h}$, daher ist von einer erheblichen Geschwindigkeitsüberschreitung auszugehen, Reaktionsweg nicht eingerechnet.

ERWARTUNGSHORIZONT:
Teilleistung | Punkte | Alternativweg
Ansatz: zeitfreie Gleichung aus beiden Gesetzen herleiten oder anwenden, Endbedingung nennen | 5 NP | Elimination von $t$ aus beiden Gesetzen als Herleitung akzeptieren
Rechnung: $v_0$ in $\text{m/s}$ berechnen und in $\text{km/h}$ umrechnen | 6 NP | Rueckwaertseinsetzen in beide Gesetze als Rechenweg akzeptieren
Interpretation: Vergleich mit $25\text{ km/h}$ und Ueberschreitungs-Urteil ohne Reaktionsweg | 4 NP | Urteil mit Messunsicherheit oder Reaktionsweg-Zusatz akzeptieren

**15 NP MUSTER-KLAUSURSATZ**:
> "Aus $v^2 - v_0^2 = 2 \cdot a \cdot s$ folgt mit $s = 12\text{ m}$ und $a = -5\text{ m/s}^2$ eine Anfangsgeschwindigkeit von $v_0 = 10{,}95\text{ m/s}$ entsprechend $39{,}4\text{ km/h}$; da dieser Wert die zulaessige Hoechstgeschwindigkeit von $25\text{ km/h}$ signifikant ueberschreitet, ist der E-Scooter nachweislich zu schnell gefahren."

KERNSATZ (auswendig):
`Mit $v=0\text{m/s}$ folgt $t_B=\frac{-v_0}{a}$ und durch Einsetzen in $s=v_0\cdot t+\frac{1}{2}\cdot a\cdot t^2$ ergibt sich der reine Bremsweg.`
- Zerlegung: Subjekt | Mechanismus | Urteil
- Endbedingung $v=0\text{m/s}$ mit $v_0$ und $a$ | Einsetzen in beide Gesetze liefert $t_B$ und $s_B$ | Reiner Bremsweg ist berechenbar, Reaktionsweg kommt hinzu
- Selbsttest: Mit $v=0\text{m/s}$ folgt $t_B=\frac{-v_0}{a}$ und durch ___ in $s=v_0\cdot t+\frac{1}{2}\cdot a\cdot t^2$ ergibt sich der reine Bremsweg.
