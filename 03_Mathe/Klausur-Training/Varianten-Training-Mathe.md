---
fach: Mathe
thema: "Varianten-Training: Solaranlage — Kosten-Nutzen-Optimierung"
operatoren: [beschreiben, darstellen, untersuchen, anwenden, überprüfen, in Beziehung setzen, beurteilen, bewerten, reflektieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis, Integralrechnung, Modellierung, Varianten]
---

# Varianten-Training Mathe — Solaranlage: Kosten-Nutzen-Optimierung

> **中文一句话理解**：本文件用**一个**情境（屋顶光伏）把 EF→Q1 的核心动作串成一条线——**Steckbrief 反求三次函数**（$P(0)=P'(0)=P(12)=0$，顶点 $P(8)=4{,}00$）→ **Nullstellen / Extremwerte / Wendepunkt / Monotonie** → **Stammfunktion 与定积分求日发电量** → **Amortisationsrechnung**（自用电 vs 上网电价、年度收益、回收期）；随后用三道变式（数据变 / 边界条件变 / 迁移综合）把同一方法迁移到新数字、新假设、新情境。
> 德语定位：Eine durchgängige Modellierungsaufgabe im Inhaltsfeld *Funktionen und Analysis* (ganzrationale Funktion dritten Grades, Extremwerte, Integral, Amortisation) mit drei Varianten und einem Abschnitt zum Vergleich chinesischer Schnellverfahren mit dem deutschen Bewertungsstandard.

> ⚠️ **原创仿写**：本文件全部题干、材料、数据、人名与数值均为**本人原创撰写**，非任何真实出版物、真题或教材的摘录。
> 来源层级：**[原创仿写]**

---

## 1. Standard-Modellierungsaufgabe（标准德语建模题）

> ⚠️ 原创仿写 Modelltext（仿 Energie-Ratgeber / Technikjournalismus 风格撰写，非真实出版物摘录；数据、Firmen- und Personennamen sind frei erfunden）
> 来源层级：**[原创仿写]** · Gesamt-BE: **30 BE** · Bearbeitungszeit (empfohlen): **30 min**

### Material M1 — „Sonnenstrom vom eigenen Dach"

Eine Photovoltaikanlage wandelt die Strahlungsenergie der Sonne unmittelbar in elektrische Energie um. Maßgeblich für den Ertrag ist nicht die Nennleistung der Module allein, sondern der Verlauf der erzeugten Leistung über den Tag. An einem klaren Sommertag steigt die Leistung nach Sonnenaufgang zunächst zügig an, erreicht um die Mittagszeit ihren Höchstwert und fällt bis zum Abend wieder auf null zurück. Der Flächeninhalt zwischen dem Graphen der Leistungsfunktion und der Zeitachse ist dabei keine abstrakte Rechengröße: Er entspricht genau der elektrischen Energie, die an diesem Tag erzeugt wird.

Für die Wirtschaftlichkeit einer Anlage sind zwei Größen entscheidend. Erstens der Jahresertrag, also die über ein Jahr erzeugte Energiemenge. Zweitens das Verhältnis von Investition zu jährlicher Ersparnis: Erst wenn die Summe der jährlichen Ersparnisse die Anschaffungskosten übersteigt, hat sich die Anlage amortisiert. Ob der erzeugte Strom selbst verbraucht oder ins Netz eingespeist wird, ist dabei keineswegs gleichgültig, denn der vermiedene Strombezug ist deutlich wertvoller als die Einspeisevergütung. Ein Modell, das den Tagesverlauf beschreibt, macht beide Größen berechenbar — es gilt allerdings nur für den beobachteten Tag und blendet Bewölkung, Verschattung und Jahreszeiten aus.

[Wortzahl: 179]

### Angabe

Familie Berger hat auf dem Süddach ihres Einfamilienhauses in Sprockhövel eine Photovoltaikanlage mit einer Modulleistung von $4{,}0$ kWp installieren lassen. An einem klaren Junitag protokolliert ein Datenlogger die erzeugte elektrische Leistung. Der Tagesverlauf soll durch eine **ganzrationale Funktion dritten Grades** $P$ beschrieben werden:

$$P(t) = at^3 + bt^2 + ct + d, \qquad a \ne 0$$

Dabei ist $t$ die Zeit in Stunden **nach 6:00 Uhr** und $P(t)$ die elektrische Leistung in Kilowatt (kW); der **Modellierungszeitraum** ist $0 \le t \le 12$ (also 6:00 bis 18:00 Uhr).

Der Steckbrief der Anlage liefert vier Bedingungen:

| Nr. | Bedingung | Bedeutung |
|:--|:--|:--|
| (1) | $P(0) = 0$ | Um 6:00 Uhr liefert die Anlage keine Leistung. |
| (2) | $P'(0) = 0$ | Die Leistungskurve beginnt mit waagerechter Tangente. |
| (3) | $P(12) = 0$ | Um 18:00 Uhr endet die Erzeugung. |
| (4) | $P(8) = 4{,}00$ | Den Höchstwert von $4{,}00$ kW erreicht die Anlage um 14:00 Uhr. |

**Tabelle 1 — Kennwerte der Anlage und der Abrechnung (fiktiv)**

| Kenngröße | Wert |
|:--|:--|
| Standort / Ausrichtung | Einfamilienhaus, Sprockhövel (NRW), Süddach, Neigung 32° |
| Modulleistung | $4{,}0$ kWp |
| Investition (Anschaffung, Montage, Anmeldung) | $9\,600$ € |
| Strompreis für vermiedenen Netzbezug | $0{,}32$ €/kWh |
| Einspeisevergütung | $0{,}08$ €/kWh |
| Eigenverbrauchsquote | $70\ \%$ des Jahresertrags |
| Tage im Jahr mit diesem Ertragsverlauf | $140$ |

### Aufgaben

**a) [AFB II · Operator: darstellen · 8 BE]**
**Stellen Sie** die Funktionsgleichung von $P$ auf, indem Sie den Steckbrief in ein lineares Gleichungssystem übersetzen und dieses lösen. **Geben Sie** die Gleichung mit den zugehörigen Einheiten an und **überprüfen Sie**, dass an der Stelle $t = 8$ tatsächlich ein lokaler Hochpunkt vorliegt.

**b) [AFB II · Operator: untersuchen · 7 BE]**
**Untersuchen Sie** den Graphen von $P$ im Modellierungszeitraum. **Bestimmen Sie** die Nullstellen und **erläutern Sie**, warum der Graph die Zeitachse bei $t = 0$ berührt, bei $t = 12$ aber schneidet. **Weisen Sie** die Extremstelle mit notwendiger und hinreichender Bedingung nach, **geben Sie** Wendepunkt und Monotonieintervalle an.

**c) [AFB II · Operator: anwenden · 5 BE]**
**Berechnen Sie** mit Hilfe einer Stammfunktion den Tagesertrag $E = \int_{0}^{12} P(t)\,dt$ in kWh sowie die mittlere Leistung $\overline{P}$ im Modellierungszeitraum.

**d) [AFB II · Operator: in Beziehung setzen · 4 BE]**
**Berechnen Sie** die Energie, die zwischen 12:00 und 18:00 Uhr (also für $6 \le t \le 12$) erzeugt wird, und **setzen Sie** ihren Anteil am Tagesertrag **in Beziehung** zum Verlauf des Graphen.

**e) [AFB III · Operator: beurteilen / bewerten · 6 BE]**
**Berechnen Sie** mit Tabelle 1 den Jahresertrag, den jährlichen Nutzen und die Amortisationsdauer der Anlage. **Beurteilen Sie** anschließend, ob sich die Investition lohnt. **Bewerten Sie** abschließend, inwiefern das Modell diese Entscheidung trägt, und gehen Sie dabei auf mindestens eine Grenze des Modells ein.

**Σ 8 + 7 + 5 + 4 + 6 = 30 BE**

### 1.1 中文题干理解

题目给一台 4 kWp 屋顶光伏的**日功率曲线**：以 $t=$ 6:00 起的小时数建模，区间 $0\le t\le 12$。四个条件构成 **Steckbrief**：日出功率为零（$P(0)=0$）、起始切线水平（$P'(0)=0$，即零点为二重根）、日落归零（$P(12)=0$）、14:00 达到峰值 4,00 kW（$P(8)=4{,}00$）。四个条件正好定出三次函数的四个系数，这是标准的"条件清单 → 线性方程组"套路。随后 a)–d) 是纯分析动作（极值、拐点、单调、定积分、面积占比），e) 把积分结果接进**经济性**（自用 vs 上网、年收益、回收期），并要求做 AFB III 的模型评价。

### 1.2 考点映射

| 考点 | Inhaltsfeld / 考纲条目 | AFB | Operator |
|:--|:--|:--|:--|
| Steckbrief → LGS → 三次函数 | Funktionen und Analysis: ganzrationale Funktionen | II | darstellen |
| 零点重数（二重零点 = 切点） | Funktionen und Analysis: Nullstellen, Graphverlauf | II | untersuchen / erläutern |
| 极值：必要 + 充分条件 | Ableitungsbegriff, Ableitungsregeln (Potenz-/Summen-/Faktorregel) | II | untersuchen |
| 拐点与单调区间 | Krümmung, Wendepunkt, Monotonie | II | untersuchen |
| Stammfunktion + 定积分 = 能量 | Integralrechnung: Bestand aus Änderungsrate | II | anwenden |
| 积分分窗 + 面积占比 | Integralrechnung, Argumentieren | II | in Beziehung setzen |
| 经济性建模（Amortisation） | Modellieren: Sachkontext in Mathematik übersetzen | III | beurteilen / bewerten |
| 模型批判（Modellannahmen, Grenzen） | Modellieren / Kommunizieren | III | bewerten / reflektieren |

⏳ 待确认：本文件同时用到 **Integralrechnung** 与 **Amortisationsrechnung**，属 Q1 内容；若本班尚在 EF 阶段，请先完成 a)–b)（微分部分），c)–e) 待 Q1 补做。请以本班 Lehrkraft 的时间表为准。

---

## 2. DE-Lösungsstandard（德国官方标准解题步骤）

> 每个 Teilaufgabe 按四要素写：**① Was ist zu tun（德语指令）→ ② Rechengang（中间结果 + 全程 Einheit + 舍入规则）→ ③ Klausur-Satz / Antwortsatz（德语完整句，带 Ergebnis + Einheit）→ ④ Plausibilitäts-/Größenordnungskontrolle**。
> **舍入规则**：全程用精确分数（Bruch）计算，只在 Antwortsatz 处舍入；Endergebnis 保留 3 位有效数字或 2 位小数（金额 2 位小数，Jahre 1 位小数）。

### 2.1 Aufgabe a) — Steckbrief und Funktionsterm

**① Was ist zu tun**: *Ansatz formulieren · Variablen mit Einheiten definieren · Bedingungen in ein lineares Gleichungssystem (LGS) übersetzen · LGS lösen · Hochpunkt nachweisen.*

**② Rechengang**

1. Ansatz mit Ableitungen:
   $$P(t) = at^3 + bt^2 + ct + d,\quad P'(t) = 3at^2 + 2bt + c,\quad P''(t) = 6at + 2b$$
   Einheiten: $t$ in h, $P(t)$ in kW, $a$ in kW/h³, $b$ in kW/h², $c$ in kW/h, $d$ in kW.
2. Bedingung (1): $P(0) = d = 0 \;\Rightarrow\; d = 0$.
3. Bedingung (2): $P'(0) = c = 0 \;\Rightarrow\; c = 0$.
4. Bedingung (3): $P(12) = 1728a + 144b + 12c + d = 0$; mit $c = d = 0$ folgt $1728a + 144b = 0 \;\Rightarrow\; b = -12a$.
5. Bedingung (4): $P(8) = 512a + 64b + 8c + d = 4$; mit $c=d=0$ und $b = -12a$:
   $$512a - 768a = 4 \;\Rightarrow\; -256a = 4 \;\Rightarrow\; a = -\frac{1}{64}$$
6. Rückeinsetzen: $b = -12 \cdot \left(-\frac{1}{64}\right) = \frac{3}{16}$.
7. Ergebnis: $P(t) = -\frac{1}{64}t^3 + \frac{3}{16}t^2 = \frac{t^2(12-t)}{64}$.
8. Probe (Hochpunkt): $P'(t) = -\frac{3}{64}t^2 + \frac{3}{8}t = \frac{3t(8-t)}{64}$; $P'(8) = 0$ ✓.
   $P''(t) = -\frac{6}{64}t + \frac{3}{8} = \frac{24-6t}{64}$; $P''(8) = \frac{24-48}{64} = -0{,}375 < 0$ ⟹ **lokaler Hochpunkt** ✓. $P(8) = \frac{64 \cdot 4}{64} = 4{,}00$ kW ✓.

**③ Klausur-Satz / Antwortsatz**
> Die erzeugte Leistung wird im Modellierungszeitraum durch $P(t) = -\frac{1}{64}t^3 + \frac{3}{16}t^2$ mit $P(t)$ in kW und $t$ in Stunden beschrieben. An der Stelle $t = 8$ liegt wegen $P'(8) = 0$ und $P''(8) = -0{,}375 < 0$ ein lokaler Hochpunkt mit der Leistung $4{,}00$ kW vor.

**④ Plausibilitätskontrolle**: $P(t) = \frac{t^2(12-t)}{64} \ge 0$ für alle $t \in [0;12]$, da $t^2 \ge 0$ und $12 - t \ge 0$; die Anlage liefert also im gesamten Zeitraum nie negative Leistung. Die Randwerte $P(0) = 0$ und $P(12) = 0$ erfüllen den Steckbrief exakt.

---

### 2.2 Aufgabe b) — Nullstellen, Extremwerte, Wendepunkt, Monotonie

**① Was ist zu tun**: *Nullstellen bestimmen und ihre Vielfachheit deuten · notwendige und hinreichende Bedingung für Extrema prüfen · Wendepunkt über den Vorzeichenwechsel von $P''$ nachweisen · Monotonieintervalle angeben.*

**② Rechengang**

1. **Nullstellen**: $P(t) = 0 \iff t^2(12-t) = 0 \;\Rightarrow\; t_1 = 0$ (**doppelte** Nullstelle) und $t_2 = 12$ (einfache Nullstelle).
   Bei $t = 0$ gilt $P(0) = 0$ **und** $P'(0) = 0$: Der Graph **berührt** die $t$-Achse (Berührpunkt, kein Vorzeichenwechsel). Bei $t = 12$ wechselt $P$ das Vorzeichen von $+$ nach $-$, der Graph **schneidet** die Achse.
2. **Notwendige Bedingung**: $P'(t) = 0 \iff \frac{3t(8-t)}{64} = 0 \;\Rightarrow\; t = 0$ oder $t = 8$.
3. **Hinreichende Bedingung**: $P''(0) = \frac{24}{64} = 0{,}375 > 0$ ⟹ lokales Minimum (Randminimum) $T(0 \mid 0)$;
   $P''(8) = -0{,}375 < 0$ ⟹ lokales Maximum $H(8 \mid 4{,}00)$.
4. **Wendepunkt**: $P''(t) = 0 \iff 24 - 6t = 0 \;\Rightarrow\; t = 4$. Vorzeichenwechsel: für $t < 4$ ist $P''(t) > 0$ (Linkskrümmung), für $t > 4$ ist $P''(t) < 0$ (Rechtskrümmung) ⟹ **Wendepunkt**.
   $P(4) = \frac{16 \cdot 8}{64} = 2{,}00 \;\Rightarrow\; W(4 \mid 2{,}00)$.
5. **Monotonie**: $P'(t) > 0$ für $0 < t < 8$; $P'(t) < 0$ für $8 < t < 12$. Also ist $P$ streng monoton wachsend auf $[0;8]$ und streng monoton fallend auf $[8;12]$.

**③ Klausur-Satz / Antwortsatz**
> Der Graph berührt die Zeitachse an der doppelten Nullstelle $t = 0$ und schneidet sie an der einfachen Nullstelle $t = 12$. Der Hochpunkt liegt bei $H(8 \mid 4{,}00)$, der Wendepunkt bei $W(4 \mid 2{,}00)$; die Leistung steigt auf $[0;8]$ streng monoton an und fällt auf $[8;12]$ streng monoton ab.

**④ Plausibilitätskontrolle**: Wegen $P''(4) = 0$ und $P''(t) > 0$ für $t < 4$ hat $P'$ bei $t = 4$ sein Maximum, nämlich $P'(4) = \frac{3 \cdot 4 \cdot 4}{64} = 0{,}75$ kW/h. Die Leistung wächst also um 10:00 Uhr am schnellsten — das entspricht dem Verlauf einer Solaranlage und bestätigt die Lage des Wendepunkts **vor** dem Hochpunkt.

---

### 2.3 Aufgabe c) — Stammfunktion, Tagesertrag, mittlere Leistung

**① Was ist zu tun**: *Stammfunktion bilden und durch Ableiten prüfen · Hauptsatz anwenden: $E = F(b) - F(a)$ · Einheit des Integrals angeben · mittlere Leistung als Integral geteilt durch die Intervalllänge berechnen.*

**② Rechengang**

1. Stammfunktion (Potenzregel, gliedweise):
   $$F(t) = -\frac{1}{256}t^4 + \frac{1}{16}t^3$$
   Probe: $F'(t) = -\frac{4}{256}t^3 + \frac{3}{16}t^2 = -\frac{1}{64}t^3 + \frac{3}{16}t^2 = P(t)$ ✓
2. Zwischenergebnisse (jeweils mit Einheit):
   $$F(12) = -\frac{20\,736}{256} + \frac{1\,728}{16} = -81 + 108 = 27\ \text{kWh}, \qquad F(0) = 0\ \text{kWh}$$
3. Tagesertrag:
   $$E = \int_{0}^{12} P(t)\,dt = F(12) - F(0) = 27\ \text{kWh} - 0\ \text{kWh} = \mathbf{27{,}00\ kWh}$$
   Einheitenkette: $P$ in kW $\cdot$ $t$ in h $\Rightarrow$ $\int_a^b P(t)\,dt$ in kW$\cdot$h = **kWh**.
4. Mittlere Leistung:
   $$\overline{P} = \frac{1}{12 - 0}\int_{0}^{12} P(t)\,dt = \frac{27\ \text{kWh}}{12\ \text{h}} = \mathbf{2{,}25\ kW}$$

**③ Klausur-Satz / Antwortsatz**
> Die Anlage erzeugt an diesem Tag eine elektrische Energie von $27{,}00$ kWh; die mittlere Leistung im Modellierungszeitraum beträgt $2{,}25$ kW.

**④ Plausibilitätskontrolle (Größenordnung)**: Es gilt $0 < \overline{P} = 2{,}25\ \text{kW} < P_{\max} = 4{,}00\ \text{kW}$ — der Mittelwert liegt erwartungsgemäß zwischen Minimum und Maximum. Ferner entsprechen $27$ kWh bei $4{,}0$ kWp genau $27/4 = 6{,}75$ Volllaststunden; für einen klaren Junitag ist das die richtige Größenordnung.

---

### 2.4 Aufgabe d) — Integral über ein Teilfenster

**① Was ist zu tun**: *Teilintegral mit der Stammfunktion berechnen · Anteil am Gesamtertrag als Quotienten bilden · Ergebnis mit dem Verlauf des Graphen in Beziehung setzen.*

**② Rechengang**

1. Stammfunktion an der Zwischenstelle:
   $$F(6) = -\frac{1\,296}{256} + \frac{216}{16} = -5{,}0625 + 13{,}5 = 8{,}4375\ \text{kWh}$$
2. Nachmittagsfenster $6 \le t \le 12$:
   $$\int_{6}^{12} P(t)\,dt = F(12) - F(6) = 27\ \text{kWh} - 8{,}4375\ \text{kWh} = \mathbf{18{,}5625\ kWh} \approx 18{,}56\ \text{kWh}$$
3. Vormittagsfenster (Kontrolle): $E_{[0;6]} = F(6) - F(0) = 8{,}4375$ kWh.
4. Anteil:
   $$\frac{18{,}5625\ \text{kWh}}{27{,}00\ \text{kWh}} = 0{,}6875 = \mathbf{68{,}75\ \%}$$

**③ Klausur-Satz / Antwortsatz**
> Zwischen 12:00 und 18:00 Uhr erzeugt die Anlage $18{,}56$ kWh, das sind $68{,}75\ \%$ des Tagesertrags; auf den Vormittag entfallen entsprechend nur $31{,}25\ \%$. Der Anteil ist nicht ausgeglichen, weil der Hochpunkt erst um 14:00 Uhr und damit deutlich nach der Intervallmitte liegt.

**④ Plausibilitätskontrolle**: Summenprobe $8{,}4375 + 18{,}5625 = 27{,}00$ kWh ✓ und $31{,}25\ \% + 68{,}75\ \% = 100\ \%$ ✓. Wegen $P(8) = 4{,}00 > P(6) = 3{,}375$ ist der Nachmittag ertragreicher — konsistent mit der Lage des Hochpunkts.

---

### 2.5 Aufgabe e) — Wirtschaftlichkeit und Amortisation

**① Was ist zu tun**: *Jahresertrag aus Tagesertrag und Anzahl der Vergleichstage bestimmen · Nutzen aus Eigenverbrauch und Einspeisung getrennt berechnen · Amortisationsdauer als Quotient aus Investition und jährlichem Nutzen angeben · Ergebnis beurteilen und Modellgrenzen reflektieren.*

**② Rechengang**

1. Jahresertrag: $E_{\text{Jahr}} = 27{,}00\ \text{kWh} \cdot 140 = \mathbf{3\,780\ kWh}$.
2. Eigenverbrauch ($70\ \%$) und Ersparnis:
   $$0{,}70 \cdot 3\,780\ \text{kWh} = 2\,646\ \text{kWh}, \qquad 2\,646\ \text{kWh} \cdot 0{,}32\ \tfrac{€}{\text{kWh}} = \mathbf{846{,}72\ €}$$
3. Einspeisung ($30\ \%$) und Vergütung:
   $$0{,}30 \cdot 3\,780\ \text{kWh} = 1\,134\ \text{kWh}, \qquad 1\,134\ \text{kWh} \cdot 0{,}08\ \tfrac{€}{\text{kWh}} = \mathbf{90{,}72\ €}$$
4. Jährlicher Nutzen: $846{,}72\ € + 90{,}72\ € = \mathbf{937{,}44\ €}$ pro Jahr.
5. Amortisationsdauer:
   $$T = \frac{9\,600\ €}{937{,}44\ €/\text{a}} = 10{,}24\ \text{a} \approx \mathbf{10{,}2\ \text{Jahre}}$$

**③ Klausur-Satz / Antwortsatz**
> Bei 140 Vergleichstagen ergibt sich ein Jahresertrag von $3\,780$ kWh und ein jährlicher Nutzen von $937{,}44$ €. Die Investition von $9\,600$ € hat sich damit nach etwa $10{,}2$ Jahren amortisiert.

**④ Bewertung (AFB III, Kriterium → Abwägung → Urteil)**

- **Kriterium**: Eine Photovoltaikanlage ist wirtschaftlich sinnvoll, wenn die Amortisationsdauer deutlich unter der technischen Nutzungsdauer von etwa 25 bis 30 Jahren liegt.
- **Abwägung**: $10{,}2$ Jahre sind gegenüber 25 Jahren Lebensdauer klar günstig; andererseits sinkt der Ertrag durch Degradation jährlich um etwa $0{,}5\ \%$, und ein Wechselrichter muss nach etwa 12 bis 15 Jahren ersetzt werden. Steigende Strompreise verkürzen die Amortisationsdauer dagegen zusätzlich.
- **Urteil**: Die Investition lohnt sich, sofern die Anlage planmäßig mindestens 15 Jahre betrieben wird.
- **Modellgrenze**: Das Modell beschreibt einen einzigen klaren Junitag; die Hochrechnung auf $140$ gleichartige Tage blendet Jahreszeiten, Bewölkung, Verschattung und Degradation aus und überschätzt daher die Genauigkeit des Ergebnisses. Der Eigenverbrauchsanteil hängt zusätzlich vom Nutzerverhalten ab und ist keine physikalische Größe.

**⑤ Plausibilitätskontrolle**: $3\,780$ kWh/Jahr bei $4{,}0$ kWp ergibt $945$ kWh pro kWp — genau die für NRW typische Größenordnung von $900$ bis $1\,000$ kWh/kWp. Der Jahresnutzen von $937{,}44$ € liegt unter $3\,780 \cdot 0{,}32 = 1\,209{,}60$ €, weil nur $70\ \%$ der Energie den höheren Wert des vermiedenen Netzbezugs erhält; das ist schlüssig.

### 2.6 德国评分惯例 5 条

| Nr. | 评分惯例 | 在本文件中的具体落点 |
|:--|:--|:--|
| ① | **Zwischenschritte 必须可见**：结果对但无过程 = 0 BE | 直接写 "$E = 27$ kWh" 而不写 $F(t)$ 与 $F(12)-F(0)$，本题 c) 的 5 BE 几乎全失 |
| ② | **Einheit 全程**：每个中间结果都带单位 | $F(12) = 27$ kWh、$F(6) = 8{,}4375$ kWh、$T = 10{,}2$ a；$\int P\,dt$ 必须是 kWh 而不是 kW |
| ③ | **Antwortsatz 必写**：完整德语句，含结果 + 单位 + 情境指称 | 每小问末尾的 *Klausur-Satz*；缺 Antwortsatz 每处扣 1–2 BE |
| ④ | **变量与 Modellannahmen 明确定义**：先定义再算 | 开头必须写 $t$ = Stunden nach 6:00 Uhr、$P(t)$ in kW、$0 \le t \le 12$；e) 必须写出"140 天同型""70 % 自用"等假设 |
| ⑤ | **图表必须 beschriftet**：Achsen + Einheit + Skala + Legende | 画 $P$ 的草图时标 $t$/h 与 $P$/kW、标出 $H(8\mid4{,}00)$、$W(4\mid2{,}00)$、$t=12$；无标注的草图不得分 |

---

## 3. 🇨🇳 CN-Methode vs DE-Standard（中德极速洞察技巧对比）

| 环节 | 中国技法（口诀 / 具体操作） | 德国标准做法 | 合规性 | 在 Abitur 怎么用（且不丢分） |
|:--|:--|:--|:--:|:--|
| **设而不求** | "先设后算"：见条件清单先写 $P(t)=at^3+bt^2+ct+d$，把 4 个条件编号 (1)–(4) 排成表，再逐条代入；不先猜系数含义 | Ansatz + **Variablendefinition mit Einheiten** + LGS，逐条 Bedingung 编号并说明来源 | ✅ | 表格化 Bedingungen 反而正是 NRW 想要的 *Darstellungsleistung*；但必须写出 $a$ 的单位 kW/h³ 与 $a \ne 0$，否则扣 Ansatz 分 |
| **特值 / 极限检验** | 代入 $t=0,\,12$ 秒验，再看 $t\to\pm\infty$ 判断首项符号 | 作为 *Probe* 与 *Grenzverhalten* 单独写出，成为独立采分点 | ✅ | 把"心里算的特值"写成一行 "*Probe*: $P(0)=0$, $P(12)=0$ ✓"——从 0 分变成 1–2 BE |
| **量纲检验** | "单位带进带出"：kW × h = kWh，一眼判断积分结果量纲 | Einheitenkette 明确写出：$t$ in h, $P$ in kW, $\int_a^b P\,dt$ in kWh | ✅ | 每问末尾加一句 Einheitenkette；这是 NRW 最容易白送也最容易丢的分 |
| **对称与换元化简** | 见 $t^2(12-t)$ 立刻反应"二重根 + 单根"，用 $u=t-6$ 对称化或用韦达定理秒验根 | Faktorisieren 与 Symmetrie **必须论证**（如"doppelte Nullstelle ⟹ Berührpunkt"） | ⚠️ | 换元可以做，但必须写 *Substitution* 与 *Rücksubstitution*；"我看出来的"在德国评分下等于没写 |
| **结果反代验证** | 把求出的 $a,b,c,d$ 代回 (3)(4) 两式快速自检 | *Probe* 作为独立步骤写在结果之后（本题即 Hochpunkt-Probe） | ✅ | 反代要写在**正卷**上并标注 "Probe"，不能只留在草稿纸；这是最便宜的过程分 |
| **估算定位答案区间** | 先估量级：平均功率约 2 kW，12 h 就是 20 多 kWh，答案超过 40 或低于 10 立刻回头查 | *Größenordnungskontrolle / Plausibilitätskontrolle* 作为必写末步 | ✅ | 先估后算再"用估值检验终值"，一句话即可拿到 AFB II 的 Argumentieren 分 |
| **数形结合** | 先画草图定零点、极值、拐点位置，用图排除不可能结论 | *Skizze* 允许且受欢迎，但必须 mit Achsenbeschriftung, Einheit, Skala；图**不能代替**证明 | ⚠️ | 草图只用来辅助叙述（"wegen der Lage des Hochpunkts nach der Intervallmitte"）；$P''$-Vorzeichenwechsel 仍必须代数验证 |

**哪些"心算跳步 / 只写答案"在德国评分下会丢分，如何改成又快又满分**

1. **只写答案**（"$E = 27$ kWh"）：c) 的 5 BE 会只剩 0–1 BE。改写：`Stammfunktion $F(t)=\dots$` → `$F(12)-F(0)=27-0$` → `Antwortsatz`。多写两行，得分从 1 BE 变 5 BE。
2. **心算消元**（"$1728a+144b=0$，所以 $b=-12a$" 不写）：丢 *Darstellungsleistung*。改写：把每条 Bedingung 编号并写出方程，消元步骤保留一行。
3. **用草图代替判别**（"图上显然是极大值"）：丢 hinreichende Bedingung 的 2–3 BE。改写：`$P'(8)=0$` **且** `$P''(8)=-0{,}375<0$`，两个条件各占一行。
4. **跳步乘除**（$7500/749{,}952$ 直接写 $10$ a）：结果对但过程不可追溯，AFB III 的 Rechenweg 分会扣。改写：写出 $T=\frac{\text{Investition}}{\text{jährlicher Nutzen}}=\frac{9\,600}{937{,}44}$，再给终值。
5. **不给单位**（$T = 10{,}2$）：德国阅卷对 Einheit 是**独立采分点**。改写：所有终值都写单位，金额写 €、时间写 a、能量写 kWh。

一句话总结：**中国快法只做草稿纸上的侦察（猜值、估量级、验算），正卷只写"Ansatz → Rechenweg → Antwortsatz → Kontrolle"四件套。**

---

## 4. Fehlerquellen（扣分避坑要点）

| # | 坑 | 典型表现 | 丢分后果 | 规避动作（德语动作指令） |
|:--|:--|:--|:--|:--|
| 1 | 单位缺失或换算错 | $\int_0^{12}P\,dt$ 写成 "$27$ kW"；把 kW 与 kWh 混用 | 该采分点直接 0 BE（本题 c) 有 2 个独立 Einheit-Punkte） | *Ich gebe zu jedem Zwischenergebnis die Einheit an: $P$ in kW, $t$ in h, $\int_a^b P\,dt$ in kWh.* |
| 2 | 过早舍入 | 中途把 $a=-\frac{1}{64}$ 舍成 $-0{,}016$，终值 $E$ 偏出 $0{,}5$ kWh | 终值错误 → c) 与 e) 连锁失分（约 4 BE） | *Ich rechne durchgehend exakt in Brüchen und runde erst im Antwortsatz auf drei sinnvolle Stellen.* |
| 3 | 无 Antwortsatz | 只有数字串，没有一句话结论 | 每小问扣 1–2 BE，共可丢 5 BE | *Ich formuliere einen vollständigen Satz mit Ergebnis, Einheit und Sachbezug („Die Anlage erzeugt … kWh").* |
| 4 | 变量未定义 | 直接写 $P(t)=at^3+\dots$，不说 $t$ 从何时起算、单位是什么 | Modellieren 的 0–2 BE 全丢，后续解释也无依据 | *Ich definiere vor dem Ansatz jede Variable mit Einheit und den Definitionsbereich: $t$ in h nach 6:00 Uhr, $0\le t\le 12$.* |
| 5 | 图表无标注 | 草图只有一条曲线，无 Achsenbeschriftung、无 Skala、无 Legende | Darstellungs-BE 为 0，且不能作为 Begründung | *Ich beschrifte beide Achsen mit Größe und Einheit, trage Skala und markiere $H$, $W$, die Nullstellen sowie die Legende.* |
| 6 | Modellannahmen 未说明 | 直接说"die Anlage liefert 27 kWh", 不提 klarer Tag / 140 Tage / 70 % 自用 | AFB III 的 Beurteilung 无根基，扣 2–3 BE | *Ich nenne die Modellannahmen ausdrücklich: klarer Junitag, keine Verschattung, keine Degradation, 140 gleichartige Tage, Eigenverbrauchsquote 70 %.* |
| 7 | 只给结果不给解释 | "Wendepunkt bei $t=4$" 却不写 $P''$-Vorzeichenwechsel | 丢 hinreichende Bedingung（2 BE） | *Ich prüfe den Vorzeichenwechsel von $P''$ und notiere ihn als eigenen Satz.* |
| 8 | 德语专业词拼写 | "Groesse", "Einheiten", "Amortisation" 拼错；"der Stammfunktion" | Sprachrichtigkeit 单独扣分，可与 Inhalt 分叠加 | *Ich schreibe Fachbegriffe korrekt in den Antwortsatz: die Größe, die Einheit, die Skala, die Amortisation, der Ertrag.* |
| 9 | 有效数字不合理 | 写 $T = 10{,}2406554$ Jahre 或 $E = 27{,}0000001$ kWh | Darstellungs- und Sprachrichtigkeitsabzug | *Ich runde Endergebnisse sinnvoll: Energie auf 2 Nachkommastellen, Geld auf Cent, Zeit auf eine Nachkommastelle.* |
| 10 | 符号混淆（Δ vs. d, K vs. k） | 把 Ableitungszeichen $d$ 与 Differenz $\Delta$ 混用；把 Kosten $K$ 写成 $k$（Steigung） | 逻辑混乱，判为 Fachfehler | *Ich unterscheide konsequent: $d$ Konstante, $\Delta$ Differenz, $K$ Kosten, $k$ Steigung, $E$ Energie, $P$ Leistung.* |
| 11 | 术语性别错（der/die/das） | "die Integral", "der Nullstelle", "das Amortisation" | 语言分与专业印象双重扣分 | *Ich lerne jedes Genus mit: die Stammfunktion, die Nullstelle, der Wendepunkt, der Berührpunkt, das Integral, die Amortisationsdauer.* |
| 12 | 漏 Randwertvergleich | 只给 $H(8\mid4{,}00)$ 就宣布全局最大值，不比较 $P(0)$、$P(12)$ | 结论不完整，扣 2 BE（本题 $P(0)=P(12)=0$，所以结论恰好正确，但理由缺失仍扣分） | *Ich vergleiche immer die Randwerte $P(0)$ und $P(12)$ mit den Extremwerten und dokumentiere den Vergleich.* |

---

## 5. Drei Varianten（3 道变式题）

### Variante A — 数据变（Datenvariation）

**德语题干**

> Eine Photovoltaikanlage desselben Bautyps wird an einem weniger sonnigen Standort installiert. Ihr Tagesverlauf wird ebenfalls durch eine ganzrationale Funktion dritten Grades $P$ mit demselben Steckbrief-Typ beschrieben: $P(0)=0$, $P'(0)=0$, $P(12)=0$ und der Höchstwert $3{,}20$ kW um 14:00 Uhr ($t=8$).
>
> a) **Stellen Sie** die Funktionsgleichung auf und **weisen Sie** den Hochpunkt bei $t=8$ nach. **(5 BE)**
> b) **Berechnen Sie** den Tagesertrag und die mittlere Leistung. **(4 BE)**
> c) **Berechnen Sie** den Ertrag im Vormittagsfenster $0\le t\le 6$ und seinen Anteil am Tagesertrag. **(3 BE)**
> d) Die Investition beträgt $7\,500$ €; alle übrigen Kennwerte aus Tabelle 1 gelten unverändert. **Berechnen Sie** die Amortisationsdauer. **(4 BE)**

**变化点说明（相对原型改了什么）**：只更换数值参数——峰值由 $4{,}00$ kW 降为 $3{,}20$ kW，投资由 $9\,600$ € 降为 $7\,500$ €；**方法完全不变**（同一 Steckbrief 结构、同一积分、同一摊销公式），用于检验是否把"步骤"与"数字"分离掌握。

**完整解答**

1. Ansatz und LGS wie im Prototyp: $d=0$, $c=0$, $b=-12a$; aus $P(8)=3{,}2$ folgt $512a+64b = 3{,}2 \Rightarrow -256a = 3{,}2 \Rightarrow a = -\frac{1}{80}$, $b = \frac{3}{20}$.
   $$P(t) = -\frac{1}{80}t^3 + \frac{3}{20}t^2 = \frac{t^2(12-t)}{80}, \quad P \text{ in kW}, \ t \text{ in h}$$
   Probe: $P'(t) = \frac{3t(8-t)}{80}$, $P'(8)=0$; $P''(8) = \frac{24-48}{80} = -0{,}30 < 0$ ⟹ Hochpunkt $H(8\mid 3{,}20)$.
2. Stammfunktion $F(t) = -\frac{1}{320}t^4 + \frac{1}{20}t^3$; $F(12) = -64{,}8 + 86{,}4 = 21{,}6$ kWh; $F(0)=0$.
   $$E = 21{,}60\ \text{kWh}, \qquad \overline{P} = \frac{21{,}60\ \text{kWh}}{12\ \text{h}} = 1{,}80\ \text{kW}$$
3. $F(6) = -\frac{1\,296}{320} + \frac{216}{20} = -4{,}05 + 10{,}80 = 6{,}75$ kWh; Anteil $\frac{6{,}75}{21{,}60} = 0{,}3125 = 31{,}25\ \%$ (Nachmittag: $68{,}75\ \%$).
4. Jahresertrag $= 21{,}60 \cdot 140 = 3\,024$ kWh.
   Eigenverbrauch: $0{,}70\cdot3\,024 = 2\,116{,}8$ kWh $\Rightarrow 2\,116{,}8 \cdot 0{,}32 = 677{,}38$ €.
   Einspeisung: $0{,}30\cdot3\,024 = 907{,}2$ kWh $\Rightarrow 907{,}2 \cdot 0{,}08 = 72{,}58$ €.
   Jährlicher Nutzen: $677{,}38 + 72{,}58 = 749{,}95$ €.
   $$T = \frac{7\,500\ €}{749{,}95\ €/\text{a}} = 10{,}00\ \text{a}$$
   > *Antwortsatz*: Bei einem Tagesertrag von $21{,}60$ kWh und einem jährlichen Nutzen von $749{,}95$ € amortisiert sich die Investition von $7\,500$ € nach genau $10{,}0$ Jahren.

**中文点评**：陷阱有两个。其一，峰值从 4,00 降到 3,20 后，$a$ 由 $-\frac{1}{64}$ 变为 $-\frac{1}{80}$，**不能照抄原型的系数**；正确做法是每次重新解 $-256a = P(8)$ 这一步。其二，占比 $31{,}25\ \%$ 与原型**完全相同**——因为两函数只差一个常数因子，积分比值不变；能看出这一点说明真正理解了"面积占比只由形状决定，与整体缩放无关"。考查迁移点：参数变而结构不变的"缩放不变性"。

---

### Variante B — 边界条件 / 模型假设变（Randbedingung）

**德语题干**

> Die Anlage wird nun auf einem Westdach betrieben. Das Modellierungsfenster wird auf 7:00 bis 19:00 Uhr verschoben; $t$ bezeichnet weiterhin die Zeit in Stunden, jetzt aber **nach 7:00 Uhr**, und es gilt $0 \le t \le 12$. Der neue Steckbrief lautet:
> (1) Um 7:00 Uhr liefert die Anlage bereits $P(0) = 1{,}00$ kW;
> (2) der Hochpunkt liegt bei $t = 6$ mit $P(6) = 4{,}00$ kW;
> (3) um 19:00 Uhr endet die Erzeugung: $P(12) = 0$.
>
> Zusätzlich wird ein **Systemwirkungsgrad** $\eta = 0{,}92$ berücksichtigt: Nur $92\ \%$ der Modulleistung stehen als Wechselstrom zur Verfügung.
>
> a) **Stellen Sie** das neue lineare Gleichungssystem auf, **lösen Sie** es und **weisen Sie** den Hochpunkt bei $t=6$ nach. **(7 BE)**
> b) **Berechnen Sie** den Tagesertrag auf der Gleichstromseite und den tatsächlich nutzbaren Wechselstromertrag. **(4 BE)**
> c) Die Investition beträgt $13\,500$ €, es werden $120$ Vergleichstage angesetzt; alle übrigen Kennwerte aus Tabelle 1 gelten. **Berechnen Sie** die Amortisationsdauer. **(4 BE)**

**变化点说明**：**边界条件本质改变**——$P(0) \ne 0$，即模型窗口的起点不再是零点。于是 $d \ne 0$，原先"$d=0 \Rightarrow c=0 \Rightarrow b=-12a$"的快捷链条全部失效，必须重新列四条方程；再加上一个 **Verlustterm**（系统效率 $\eta$），把积分结果从"组件侧能量"换算为"可用交流能量"。

**完整解答**

1. Ansatz $P(t)=at^3+bt^2+ct+d$, $P'(t)=3at^2+2bt+c$, $P''(t)=6at+2b$.
2. (1) $P(0)=d=1{,}00 \Rightarrow d=1$.
3. (3) $P(12)=1\,728a+144b+12c+1 = 0 \Rightarrow 1\,728a+144b+12c = -1$.
4. (2) 必要条件 $P'(6)=108a+12b+c=0 \Rightarrow c = -108a-12b$.
5. (2) 值条件 $P(6)=216a+36b+6c+1 = 4 \Rightarrow 216a+36b+6c = 3$.
6. Einsetzen von $c$ in (3): $1\,728a+144b-1\,296a-144b = -1 \Rightarrow 432a = -1 \Rightarrow a = -\frac{1}{432}$.
7. Einsetzen von $c$ und $a$ in (5): $-432a-36b = 3 \Rightarrow 1 - 36b = 3 \Rightarrow b = -\frac{1}{18}$.
8. $c = -108\left(-\frac{1}{432}\right) - 12\left(-\frac{1}{18}\right) = 0{,}25 + 0{,}6\overline{6} = \frac{11}{12}$.
   $$P(t) = -\frac{1}{432}t^3 - \frac{1}{18}t^2 + \frac{11}{12}t + 1, \quad P \text{ in kW}, \ t \text{ in h}$$
9. Probe: $P(0)=1{,}00$ ✓, $P(12) = -4-8+11+1 = 0$ ✓, $P(6) = -0{,}5-2+5{,}5+1 = 4{,}00$ ✓.
   $P'(t) = -\frac{1}{144}t^2 - \frac{1}{9}t + \frac{11}{12}$; $P'(6) = -0{,}25-0{,}6\overline{6}+0{,}91\overline{6}=0$ ✓.
   $P''(t) = -\frac{1}{72}t - \frac{1}{9}$; $P''(6) = -0{,}0833-0{,}1111 = -0{,}1944 < 0$ ⟹ **Hochpunkt** $H(6\mid4{,}00)$ ✓.
   Hinweis: $P''(t) = 0$ liefert $t = -8 \notin [0;12]$; der Graph ist auf dem gesamten Modellierungszeitraum **rechtsgekrümmt**, es gibt dort also **keine Wendestelle**.
10. Stammfunktion $F(t) = -\frac{1}{1\,728}t^4 - \frac{1}{54}t^3 + \frac{11}{24}t^2 + t$;
    $F(12) = -12 - 32 + 66 + 12 = 34{,}00$ kWh, $F(0)=0$.
    $$E_{\text{DC}} = 34{,}00\ \text{kWh}, \qquad E_{\text{AC}} = \eta \cdot E_{\text{DC}} = 0{,}92 \cdot 34{,}00\ \text{kWh} = 31{,}28\ \text{kWh}$$
11. Jahresertrag $= 31{,}28 \cdot 120 = 3\,753{,}6$ kWh.
    Eigenverbrauch: $0{,}70 \cdot 3\,753{,}6 = 2\,627{,}52$ kWh $\Rightarrow 840{,}81$ €.
    Einspeisung: $0{,}30 \cdot 3\,753{,}6 = 1\,126{,}08$ kWh $\Rightarrow 90{,}09$ €.
    Jährlicher Nutzen: $930{,}89$ €.
    $$T = \frac{13\,500\ €}{930{,}89\ €/\text{a}} = 14{,}50\ \text{a} \approx 14{,}5\ \text{Jahre}$$
    > *Antwortsatz*: Der Wechselstromertrag beträgt $31{,}28$ kWh pro Tag, der Jahresertrag $3\,753{,}6$ kWh; bei einem jährlichen Nutzen von $930{,}89$ € amortisiert sich die Investition von $13\,500$ € erst nach etwa $14{,}5$ Jahren.

**中文点评**：三个陷阱。① $P(0)=1{,}00\ne 0$ 使 $d=1$，若沿用原型"$b=-12a$"会直接算错；正确路线是"$c=-108a-12b$ 代入 $P(12)$"先消 $b$、再消 $c$。② **效率 $\eta$ 乘在能量（积分结果）上，不是乘在时间 $t$ 上**；且 Jahresertrag 必须用 $E_{\text{AC}}$ 而非 $E_{\text{DC}}$。③ $P''(t)=0$ 的解 $t=-8$ 落在定义域外，因此本模型**没有拐点**；若强行写出拐点坐标即为概念错误。考查迁移点：边界条件一变，LGS 必须重建；外生损耗作为"后处理因子"的插入位置。

---

### Variante C — 迁移 / 综合（含 AFB III Bewertung）

**德语题干**

> Eine Mieterin vergleicht zwei Anlagen. Die **Dachanlage** aus der Modellierungsaufgabe ($4{,}0$ kWp, Investition $9\,600$ €, Tagesertrag $27{,}00$ kWh) soll mit einem **Balkonkraftwerk** ($0{,}60$ kWp, Investition $600$ €) verglichen werden. Für das Balkonkraftwerk gilt dasselbe Modell wie für die Dachanlage, jedoch mit dem Höchstwert $0{,}60$ kW um 14:00 Uhr ($t=8$); es gilt also $P_B(t) = a\,t^2(12-t)$ mit $P_B(8) = 0{,}60$. Für **beide** Anlagen gelten Tabelle 1 sowie $140$ Vergleichstage.
>
> a) **Bestimmen Sie** den Funktionsterm $P_B$ und den Tagesertrag des Balkonkraftwerks. **(4 BE)**
> b) **Berechnen Sie** für beide Anlagen den Jahresertrag, den jährlichen Nutzen und die Amortisationsdauer. **(6 BE)**
> c) **Bewerten Sie**, für welche Nutzergruppe welche Anlage sinnvoll ist. **Gehen Sie** dabei auf mindestens zwei Kriterien ein, **wägen Sie** diese gegeneinander ab und **reflektieren Sie** abschließend eine Grenze des gemeinsamen Modells. **(6 BE)**

**变化点说明**：情境迁移到 **Balkonkraftwerk vs. Dachanlage** 的对比决策，并加入 AFB III 的 *bewerten/reflektieren* 子问。数据上只需把峰值按比例缩小（$0{,}60/4{,}00 = 0{,}15$），但**评价维度全新**：回收期、每 kWp 成本、绝对发电量、自用比例、使用限制。

**完整解答**

**a)** Aus $P_B(8) = 256a = 0{,}60$ folgt $a = \frac{0{,}60}{256} = \frac{3}{1\,280}$.
$$P_B(t) = \frac{3}{1\,280}t^2(12-t) = \frac{36t^2 - 3t^3}{1\,280}, \quad P_B \text{ in kW}$$
Stammfunktion $F_B(t) = \frac{12t^3 - \frac{3}{4}t^4}{1\,280}$;
$$F_B(12) = \frac{12 \cdot 1\,728 - 0{,}75 \cdot 20\,736}{1\,280} = \frac{20\,736 - 15\,552}{1\,280} = \frac{5\,184}{1\,280} = 4{,}05\ \text{kWh}$$
> *Antwortsatz*: Das Balkonkraftwerk erzeugt an einem klaren Junitag $4{,}05$ kWh; seine mittlere Leistung beträgt $\overline{P}_B = \frac{4{,}05}{12} = 0{,}34$ kW.

**b)** Beide Anlagen, gerechnet mit Eigenverbrauchsquote $70\ \%$ (Wert $0{,}32$ €/kWh) und Einspeisung $30\ \%$ (Wert $0{,}08$ €/kWh), $140$ Tage:

| Größe | Dachanlage | Balkonkraftwerk |
|:--|--:|--:|
| Tagesertrag | $27{,}00$ kWh | $4{,}05$ kWh |
| Jahresertrag | $3\,780$ kWh | $567$ kWh |
| Eigenverbrauch ($70\ \%$) | $2\,646$ kWh → $846{,}72$ € | $396{,}9$ kWh → $127{,}01$ € |
| Einspeisung ($30\ \%$) | $1\,134$ kWh → $90{,}72$ € | $170{,}1$ kWh → $13{,}61$ € |
| Jährlicher Nutzen | $937{,}44$ € | $140{,}62$ € |
| Investition | $9\,600$ € | $600$ € |
| **Amortisationsdauer** | $10{,}24 \approx \mathbf{10{,}2}$ **a** | $4{,}27 \approx \mathbf{4{,}3}$ **a** |
| Spezifische Kosten | $2\,400$ €/kWp | $1\,000$ €/kWp |

> *Antwortsatz*: Das Balkonkraftwerk amortisiert sich nach etwa $4{,}3$ Jahren, die Dachanlage nach etwa $10{,}2$ Jahren; pro installiertem Kilowatt kostet das Balkonkraftwerk mit $1\,000$ €/kWp weniger als die Hälfte der Dachanlage ($2\,400$ €/kWp).

**c) Bewertung (Kriterium → Abwägung → Urteil)**

- **Kriterium 1 — Amortisationsdauer**: Das Balkonkraftwerk ist mit $4{,}3$ Jahren klar im Vorteil; das Kapital ist deutlich schneller zurückverdient.
- **Kriterium 2 — absoluter Beitrag**: Die Dachanlage liefert mit $3\,780$ kWh/a rund das **6,7-Fache** ($3\,780 : 567 \approx 6{,}67$) des Balkonkraftwerks und leistet damit einen wesentlich größeren Beitrag zur Deckung des Haushaltsverbrauchs.
- **Kriterium 3 — Kosten pro kWp**: $1\,000$ €/kWp gegenüber $2\,400$ €/kWp; der Vorteil des Balkonkraftwerks entsteht vor allem durch den Wegfall von Gerüst, Dachmontage und Elektroinstallation.
- **Gegenargument**: Der Balkonkraftwerk-Ertrag fällt fast vollständig in die Mittagszeit, also nur dann an, wenn tatsächlich Verbraucher laufen; die real erreichbare Eigenverbrauchsquote liegt deshalb niedriger als $70\ \%$, was die Amortisationsdauer verlängert.
- **Abwägung / Urteil**: Für eine Mieterin ohne eigene Dachfläche ist das Balkonkraftwerk die einzige realisierbare und zugleich die wirtschaftlich attraktivste Option; für eine Eigentümerin mit geeignetem Süddach ist die Dachanlage trotz der doppelt so langen Amortisationsdauer vorzuziehen, weil sie absolut ein Vielfaches an Strom liefert und die Amortisationsdauer von $10{,}2$ Jahren noch klar unter der Nutzungsdauer von $25$ bis $30$ Jahren liegt.
- **Grenze des Modells (Reflexion)**: Beide Anlagen werden mit **derselben Kurvenform** und mit $140$ identischen Tagen gerechnet. Das Modell kennt keine Jahreszeiten, keine Bewölkung, keine Verschattung, keine Degradation und keine vom Nutzerverhalten abhängige Eigenverbrauchsquote; der Vergleich ist daher nur ein **Größenordnungsvergleich**, keine Prognose. Für eine Investitionsentscheidung müsste mindestens die Verteilung der Tageserträge über das Jahr sowie ein realistischer Eigenverbrauchsanteil modelliert werden.

**中文点评**：陷阱有三。① 比例缩放：$a = 0{,}60/256$，很多人会误算成 $0{,}60/12$ 或直接用 $0{,}15 \cdot \frac{1}{64}$ 却不验证 $P_B(8)$。② 对比评价必须**先算后评**——先给出 $4{,}3$ a 与 $10{,}2$ a、$567$ 与 $3\,780$ kWh 两组硬数据，再展开 Kriterium → Abwägung → Urteil，否则 AFB III 只有形容词没有分。③ 主动给出 Gegenargument（中午发电与用电时间错配）并说明为什么在给定假设下不改变结论。考查迁移点：同一模型跨情境复用 + 经济性决策 + 模型批判三合一。

---

## 6. Zeitstrategie & Glossar-Zeilen

### 6.1 时间分配表（原型 30 BE ≈ 30 min）

| Teilaufgabe | Inhalt | AFB | BE | Minuten | 备注 |
|:--|:--|:--|:--:|:--:|:--|
| a) | Steckbrief → LGS → $P(t)$ + Hochpunktprobe | II | 8 | 8 | 列 4 条方程 3 min，解 LGS 3 min，Probe 2 min |
| b) | Nullstellen / Extrema / Wendepunkt / Monotonie | II | 7 | 6 | 三段式（必要 → 充分 → 单调区间）必须写全 |
| c) | Stammfunktion + Tagesertrag + Mittelwert | II | 5 | 5 | $F(t)$ 先写出并求导验算，再代 $F(12)-F(0)$ |
| d) | 分窗积分 + 面积占比 | II | 4 | 4 | 先写 $F(6)$，再写占比，最后写 Summenprobe |
| e) | 年收益 + 回收期 + Bewertung | III | 6 | 7 | 先算 5 步数字（约 4 min），再 5 步收口（约 3 min） |
| **Σ** | | | **30** | **30** | 若卡住，先跳到下一小题，回头再补 |

### 6.2 「先保分后抢分」三条

1. **保分第一条 — Steckbrief 万能四步照抄**：`Ansatz $P(t)=at^3+bt^2+ct+d$, $a\ne0$` → 代入值条件 → 代入 $P'(t_E)=0$（必要条件，绝不可漏）→ 相减消元先消 $c$ 再消 $b$。写完整套，a) 的 8 BE 基本可全拿；**漏掉 $P'(8)=0$ 或 $P'(0)=0$ 会立刻丢 2–3 BE**。
2. **保分第二条 — 积分题「三件套」**：$F(t)$ 写出并求导自检 → $F(b)-F(a)$ 逐行写出中间值（$F(12)=27$ kWh，$F(6)=8{,}4375$ kWh）→ Antwortsatz 带 kWh。**即使最后数字算错，Darstellungsleistung 仍能保住一半分**；反之只写答案则 0 分。
3. **抢分第三条 — AFB III 五步收口**：`These（第一句就下判断）` → `量化 Begründung（$937{,}44$ €/a、$10{,}2$ a、$945$ kWh/kWp 三处硬数据）` → `Gegenargument（Degradation / 逆变器 12–15 年更换 / 自用比例下降）` → `Abwägung` → `begründetes Urteil（回到量纲：与 25–30 年寿命比较）`。**不写 Gegenargument 的结论最多拿一半的 Bewertung 分**。

### 6.3 Glossar-Zeilen（待合并，4 列 ≤6 行）

| Deutsch | Chinesisch | Fach | Beispielsatz |
|---|---|---|---|
| die Amortisationsdauer | 投资回收期 | Mathe | Bei einem jährlichen Nutzen von 937,44 € und 9.600 € Investition beträgt die Amortisationsdauer rund 10,2 Jahre. |
| die Eigenverbrauchsquote | 自用电比例 | Mathe | Bei einer Eigenverbrauchsquote von 70 % werden 2.646 kWh des Jahresertrags selbst verbraucht. |
| die Einspeisevergütung | 上网电价补贴 | Mathe | Für die eingespeisten 1.134 kWh erhält der Betreiber eine Einspeisevergütung von 0,08 €/kWh. |
| der Ertragsverlauf | 发电量/功率曲线 | Mathe | Der Ertragsverlauf wird im Modellierungszeitraum durch eine ganzrationale Funktion dritten Grades beschrieben. |
| der Berührpunkt (doppelte Nullstelle) | 切点（二重零点） | Mathe | Wegen P(0) = P'(0) = 0 liegt bei t = 0 ein Berührpunkt des Graphen mit der Zeitachse vor. |
| der Randwertvergleich | 端点值比较 | Mathe | Der Randwertvergleich mit P(0) = P(12) = 0 bestätigt, dass der Hochpunkt bei t = 8 das globale Maximum ist. |

### 6.4 Vernetzung（延伸阅读，非新增小节）

- `03_Mathe/CN-Mathe-Tricks.md` — 六法只做草稿纸侦察：特值猜、排除砍、画图看、韦达验、均值凑、参分求；正卷只写通法加条件句
- `03_Mathe/Klausur-Training/Mockklausur-NRW-Mathe.md` — 同题型姊妹卷（Wärmepumpe Lastprofil，含 100 BE 全卷与 Notenstufen-Raster）
- `03_Mathe/Klausur-Training/Fehlerlog.md` — 本文件 §4 的 12 条坑请逐条登记（Rechenfehler 与 Konzeptfehler 分开）
- `03_Mathe/Formel-Spickzettel.md` — 幂函数积分表与 KaTeX 写法

⏳ 待确认：Einspeisevergütung 与 Strompreis 每年调整，Tabelle 1 中的 $0{,}32$ €/kWh 与 $0{,}08$ €/kWh 为 2026 年量级的假设值；请以本班 Lehrkraft 下发的数据或当年实际费率为准。
