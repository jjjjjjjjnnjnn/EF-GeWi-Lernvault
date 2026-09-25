---
fach: Physik
thema: "Klausurtraining: Kinematik und Dynamik im Strassenverkehr"
operatoren: [berechnen, herleiten, erlaeutern, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik]
---

# Klausurtraining: Kinematik und Dynamik im Strassenverkehr (复合制动、相向防撞与能量守恒综合大题)

> **中文理解**：
> 在德国 NRW 高中物理（EF）考纲中，力学综合大题的核心是将**运动学（Kinematik，无受力的时空关系）**与**动力学（Dynamik，牛顿力学与能量守恒）**打通。
> 最典型的命题场景是道路交通安全与防撞分析（Straßenverkehrssicherheit）：
> 1. 车辆制动过程严格划分为两段：**反应阶段（Reaktionsphase）**为匀速直线运动（$s_R = v_0 \cdot t_R$）；**制动减速阶段（Bremsphase）**为匀减速直线运动（$s_B = \frac{v_0^2}{2a}$）。总停止距离为 $s_{\text{Anhalt}} = s_R + s_B$。
> 2. 减速度 $a$ 的物理来源是地面对轮胎的最大静摩擦力或滑动摩擦力：$F_R = \mu \cdot F_N = \mu \cdot m \cdot g$。由牛顿第二定律 $F = m \cdot a$ 可得 $a = \mu \cdot g$，即车辆减速度**与车辆质量无关**！
> 3. 从功能关系与能量守恒看，制动距离与初速度的平方成正比（$\Delta E_{\text{kin}} = \frac{1}{2}mv_0^2 = W_R = F_R \cdot s_B \implies s_B \propto v_0^2$）。速度翻倍，刹车距离翻两倍（四倍）。

---

## 1. 核心概念与算子标准 (Kernbegriffe & Operatoren)

- **Anhalteweg (总停止距离)**:
  > *Klausur-Satz*: Der gesamte Anhalteweg setzt sich additiv aus dem Reaktionsweg während der Schrecksekunde ($s_R = v_0 \cdot t_R$) und dem eigentlichen Bremsweg bei konstanter Verzögerung ($s_B = \frac{v_0^2}{2a}$) zusammen: $s_{\text{Anhalt}} = v_0 \cdot t_R + \frac{v_0^2}{2 \cdot \mu \cdot g}$.
- **Massenunabhaengigkeit der Bremsbeschleunigung (减速度质量无关性)**:
  > *Klausur-Satz*: Da sowohl die Reibungskraft $F_R = \mu \cdot m \cdot g$ als auch die erforderliche Bremskraft $F = m \cdot a$ linear von der Masse abhängen, kürzt sich die Masse heraus, sodass die maximal erzielbare Bremsverzögerung $a = \mu \cdot g$ allein vom Haftungsbeiwert und der Erdbeschleunigung abhängt.
- **Energiebilanz beim Bremsen (制动能量守恒与耗散)**:
  > *Klausur-Satz*: Beim Bremsvorgang wird die gesamte kinetische Energie des Fahrzeugs durch die Reibungsarbeit der Bremsklötze und Reifen vollständig in thermische innere Energie dissipiert ($E_{\text{kin}} = W_{\text{Reibung}}$).

---

## 2. 知识结构图 (Wissensstruktur)

```
Kinematik & Dynamik (EF)
├── 1. Kinematik (Bewegungsgesetze)
│   ├── Gleichförmig: s(t) = v₀ · t (Reaktionsphase)
│   └── Gleichmäßig verzögert: v(t) = v₀ - a·t, s(t) = v₀·t - ½ a·t²
├── 2. Dynamik (Kräfte & Newton)
│   ├── Gewichtskraft & Normalkraft: F_G = F_N = m·g (auf horizontaler Ebene)
│   ├── Reibungskraft: F_R = μ · F_N
│   └── Grundgleichung der Mechanik: F_res = m·a ⟹ a = μ·g
└── 3. Energie & Arbeit (Thermodynamische Kopplung)
    ├── Kinetische Energie: E_kin = ½ m v₀²
    ├── Reibungsarbeit: W_R = F_R · s_B
    └── Proportionalität: s_B ~ v₀² (Quadratischer Anstieg)
```

---

## 3. 标准四步解题法 (Schritt-für-Schritt-Verfahren)

1. **Einheiten sofort auf SI-Basiseinheiten normieren**:
   - Geschwindigkeit von $\text{km/h}$ in $\text{m/s}$ umrechnen: $v [\text{m/s}] = \frac{v [\text{km/h}]}{3{,}6}$.
2. **Kräftebilanz am freigemachten Körper aufstellen**:
   - Skizze mit allen Vektoren: $F_G$ (nach unten), $F_N$ (nach oben), $F_R$ (entgegen der Fahrtrichtung).
3. **Zweiteilung des Weges explizit trennen**:
   - Nie Reaktionsphase mit Bremsphase in einer einzigen Formel vermischen. Zuerst $s_R$, dann $s_B$.
4. **Physikalische Plausibilität & Einheitenkontrolle**:
   - Verzögerung $a$ muss in $\text{m/s}^2$ stehen (typische Vollbremsung: $6\text{ bis }9\text{ m/s}^2$). Bremsweg in Metern.

---

## 4. 🇨🇳 技巧与中德思维桥 (CN-Methode & Denkbruecke)

- **🇨🇳 追及与防撞的「相对运动极值法」vs.「时间判别式法」**:
  国内习惯直接对相对速度列式（$v_{\text{rel}} = 0$ 时距离最小）。在 NRW 考卷中，**推荐先列出两车的绝对运动方程 $s_1(t)$ 与 $s_2(t)$**，再求解 $s_2(t) - s_1(t) = 0$ 的判别式 $\Delta$ 或极值点。这样在 Erwartungshorizont 中能稳定拿满过程分。
- **德语表达模板 (Klausur-Satzbausteine)**:
  - *Kräfteansatz*: "In vertikaler Richtung herrscht Kräftegleichgewicht: $F_N = F_G = m \cdot g$."
  - *Dynamischer Ansatz*: "Die einzige in horizontaler Richtung wirkende Kraft ist die Reibungskraft $F_R$, sodass gilt: $m \cdot a = \mu \cdot m \cdot g$."
  - *Herleitung*: "Daraus folgt durch Kürzen der Masse $m$: $a = \mu \cdot g$."
  - *Kollisionskriterium*: "Zur Vermeidung einer Kollision muss gelten, dass der verbleibende Abstand $d(t) = s_2(t) - s_1(t) > 0$ für alle Zeiten $t$ bleibt."

---

## 5. 全真训练题与标准评分指南 (Klausur-Training & Erwartungshorizont)

### 题目背景 (Kontext)
Auf einer geradlinigen, horizontalen Bundesstraße fährt Fahrzeug A mit einer konstanten Geschwindigkeit von $v_A = 108\text{ km/h}$. Plötzlich taucht in einer Entfernung von $d = 85\text{ m}$ ein langsam fahrender Traktor B auf, der sich mit konstanter Geschwindigkeit von $v_B = 36\text{ km/h}$ in derselben Fahrtrichtung bewegt.
Die Fahrerin von Fahrzeug A reagiert nach einer Reaktionszeit von $t_R = 1{,}0\text{ s}$ und leitet eine Vollbremsung ein. Der Haftreibungsbeiwert zwischen Reifen und asphaltierter Straße beträgt auf trockener Fahrbahn $\mu_1 = 0{,}75$ und auf nasser Fahrbahn $\mu_2 = 0{,}35$. Die Erdbeschleunigung wird mit $g = 9{,}81\text{ m/s}^2$ angesetzt. Die Masse von Fahrzeug A beträgt $m_A = 1500\text{ kg}$.

### Teilaufgabe a) [AFB I, 6 BE]
1. **Rechnen Sie** die beiden Geschwindigkeiten in die SI-Einheit $\text{m/s}$ um.
2. **Leiten Sie** aus dem Ansatz des Kräftegleichgewichts und dem zweiten Newtonschen Axiom die Formel für die maximale Bremsverzögerung $a$ her und **zeigen Sie**, dass $a$ unabhängig von der Masse des Fahrzeugs ist.
3. **Berechnen Sie** den Zahlenwert der Bremsverzögerung $a_1$ für trockene Fahrbahn.

### Teilaufgabe b) [AFB II, 10 BE]
1. **Stellen Sie** die Bewegungsgleichungen $s_A(t)$ und $s_B(t)$ für trockene Fahrbahn ab dem Zeitpunkt $t = 0$ (Auftauchen des Traktors) auf.
2. **Untersuchen Sie rechnerisch**, ob Fahrzeug A auf trockener Fahrbahn rechtzeitig hinter dem Traktor auf dessen Geschwindigkeit abgebremst werden kann oder ob es zu einem Auffahrunfall kommt. Bestimmen Sie im Falle einer unfallfreien Fahrt den minimalen Sicherheitsabstand.

### Teilaufgabe c) [AFB III, 8 BE]
1. **Ermitteln Sie** die Geschwindigkeit, mit der Fahrzeug A auf nasser Fahrbahn ($\mu_2 = 0{,}35$) auf den Traktor prallt, oder begründen Sie rechnerisch, warum es auch hier unfallfrei bleibt.
2. **Beurteilen Sie** aus physikalischer Sicht die Aussage: *"Eine Verdopplung der Ausgangsgeschwindigkeit führt lediglich zu einer Verdopplung der Aufprallenergie."*

---

### Erwartungshorizont & Bewertungsbogen (官方标准评分表)

| Teilaufgabe | Erwartete Teilleistung | BE |
|---|---|:---:|
| **a1) Umrechnung** | $v_A = \frac{108}{3{,}6} = 30\text{ m/s}$; $v_B = \frac{36}{3{,}6} = 10\text{ m/s}$. | 2 |
| **a2) Herleitung** | Stellt Kräfteansatz auf: $F_R = \mu \cdot F_N = \mu \cdot m \cdot g$. | 1 |
| | Setzt Newtons zweites Axiom gleich: $m \cdot a = \mu \cdot m \cdot g$. | 1 |
| | Kürzt $m$ heraus und folgert: $a = \mu \cdot g$, somit unabhängig von $m$. | 1 |
| **a3) Verzögerung** | Berechnet $a_1 = 0{,}75 \cdot 9{,}81\text{ m/s}^2 \approx 7{,}36\text{ m/s}^2$. | 1 |
| **b1) Bewegungsgleichungen** | Traktor B: $s_B(t) = d + v_B \cdot t = 85 + 10 \cdot t$. | 1 |
| | Fahrzeug A während Reaktionszeit ($0 \le t \le 1{,}0\text{ s}$): $s_A(t) = 30 \cdot t$. | 1 |
| | Weg bis Reaktionsende: $s_A(1) = 30\text{ m}$. Geschwindigkeit bei $t = 1$: $30\text{ m/s}$. | 1 |
| | Für $t \ge 1{,}0\text{ s}$: $s_A(t) = 30 + 30(t - 1) - \frac{1}{2} \cdot 7{,}36 \cdot (t - 1)^2$. | 2 |
| **b2) Kollisionsprüfung** | Erkennt das Kriterium für den minimalen Abstand: $v_A(t) = v_B \implies 30 - 7{,}36(t^* - 1) = 10$. | 2 |
| | Löst nach Bremsdauer auf: $\Delta t = t^* - 1 = \frac{20}{7{,}36} \approx 2{,}717\text{ s} \implies t^* \approx 3{,}72\text{ s}$. | 1 |
| | Berechnet Positionen zu diesem Zeitpunkt: | |
| | $s_B(3{,}717) = 85 + 10 \cdot 3{,}717 \approx 122{,}17\text{ m}$. | 1 |
| | $s_A(3{,}717) = 30 + 30 \cdot 2{,}717 - \frac{1}{2} \cdot 7{,}36 \cdot (2{,}717)^2 = 30 + 81{,}51 - 27{,}17 \approx 84{,}34 + 30 = 84{,}34\text{ m}$ (Bremsweg $54{,}34\text{ m}$, Gesamtstrecke $84{,}34\text{ m}$). | 1 |
| | Differenz: $\Delta s = 122{,}17 - 84{,}34 \approx 37{,}83\text{ m} > 0$. Kein Auffahrunfall; minimaler Abstand ca. $37{,}8\text{ m}$. | 1 |
| **c1) Nasse Fahrbahn** | Berechnet neue Verzögerung: $a_2 = 0{,}35 \cdot 9{,}81 \approx 3{,}434\text{ m/s}^2$. | 1 |
| | Bremsweg bis $v_B = 10\text{ m/s}$: $s_{B2} = \frac{30^2 - 10^2}{2 \cdot 3{,}434} = \frac{800}{6{,}868} \approx 116{,}48\text{ m}$. | 1 |
| | Gesamtweg von A bis zum Angleich: $s_A = 30 + 116{,}48 = 146{,}48\text{ m}$. | 1 |
| | Weg von B in gleicher Zeit: $t_2 = 1 + \frac{20}{3{,}434} \approx 6{,}82\text{ s} \implies s_B = 85 + 68{,}2 = 153{,}2\text{ m}$. | 1 |
| | Da $146{,}48 < 153{,}2$, reicht der Abstand auch bei Nässe knapp aus! Minimaler Restabstand: ca. $6{,}7\text{ m}$. | 1 |
| **c2) Kritische Beurteilung** | Widerlegt die Aussage anhand der Formel $E_{\text{kin}} = \frac{1}{2}mv^2$: Eine Verdopplung von $v$ ($2v$) führt zu einer Vervierfachung der Energie ($4 \cdot \frac{1}{2}mv^2$). | 2 |
| | Verknüpft physikalisch: Die Zunahme der kinetischen Energie bestimmt die erforderliche Deformationsarbeit bei einem Aufprall. Der Zuwachs ist quadratisch, nicht linear. | 1 |
| **Gesamt** | | **24 BE** |

---

## 6. Häufige Fehlerquellen (Fehlerlog-Prävention)

1. **Reaktionszeit nicht addiert**:
   - Wer vergisst, dass der Bremsweg erst bei $t = t_R$ beginnt, setzt den Bremsweg fälschlicherweise bei $t = 0$ an und unterschätzt den Gesamtweg um die vollen $30\text{ m}$.
2. **Kollision bei $v = 0$ statt bei Relativgeschwindigkeit $v_A = v_B$ geprüft**:
   - Da der Traktor weiterfährt, muss Fahrzeug A nicht bis zum Stillstand abbremsen, sondern nur bis zur Geschwindigkeit des Traktors. Wer $v_A = 0$ ansetzt, berechnet ein falsches Kollisionskriterium.
3. **Geschwindigkeitseinheit $\text{km/h}$ in dynamische Gleichung eingesetzt**:
   - Rechnen mit $108^2$ statt $30^2$ führt zu absurden Wegen von mehreren Kilometern.

---

## 7. Vernetzung & Querverweise (Vernetzung)

- **Verwandte Wissensnotizen**:
  - `04_Physik/Kinematik-Gleichfoermig-Beschleunigt.md`
  - `04_Physik/Dynamik-Newton-Axiome.md`
  - `04_Physik/Energieerhaltung-Mechanik.md`
  - `03_Mathe/Differentialrechnung-Ableitungsregeln.md` ($v = s', a = v''$)
- **Klausur-Satz**:
  - *Der Bremsweg wächst mit dem Quadrat der Geschwindigkeit ($s_B \propto v^2$), während die Bremsverzögerung von der Fahrzeugmasse unabhängig ist ($a = \mu \cdot g$).*
