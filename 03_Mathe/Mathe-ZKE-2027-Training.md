---
fach: Mathe
thema: 'ZKE 2027 Training: Teil A + Teil B'
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Mathe]
---

# Mathe-ZKE-2027-Training (ZKE 2027 训练：A卷手算 + B卷工具卷)

> 中文一句话理解：ZKE是EF结束时的全州统考。A卷最多25分钟，纯手算，不给计算器和公式表；B卷至少75分钟，给WTR或CAS其中一套加官方公式表；总共100分钟，A卷最晚25分钟时必须交卷换工具。
>
> Lesson v3导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 Fehlvorstellungen辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。
>
> Deutsch: Die ZKE ist die zentrale Klausur am Ende der EF. Teil A laeuft hilfsmittelfrei in max. 25 Minuten, Teil B mit WTR oder CAS plus Formelsammlung in min. 75 Minuten, insgesamt 100 Minuten. Es gibt nur ganzzahlige Punkte.

## ZIELE: 本课学完能… (3条)

- [ ] 能手算A卷三件套：零点、导数、向量长度（Operator：berechnen）
- [ ] 能用必要加充分条件论证极值与拐点（Operator：untersuchen, begruenden）
- [ ] 能区分平均与瞬时变化率并解释情境含义（Operator：erlaeutern）

Deutsch:

- [ ] Ich kann im Teil A Nullstellen, Ableitungen und Vektorlaengen hilfsmittelfrei berechnen.
- [ ] Ich kann Extrempunkte und Wendepunkte mit notwendigem und hinreichendem Kriterium untersuchen und begruenden.
- [ ] Ich kann mittlere und lokale Aenderungsrate unterscheiden und im Sachzusammenhang erlaeutern.

## PRETRAINING: 术语盒

| Deutsch | 中文 | 一句话释义 |
|---|---|---|
| die Ableitung $f′(x)$ | 导数 | Jede Stelle bekommt ihre Tangentensteigung, gebildet mit der Potenzregel |
| die mittlere Aenderungsrate $\frac{f(x_2)-f(x_1)}{x_2-x_1}$ | 平均变化率 | Sekantensteigung ueber ein Intervall |
| die lokale Aenderungsrate $f′(x_0)$ | 瞬时变化率 | Tangentensteigung in genau einem Punkt |
| kollinear $\vec{a} = k\cdot\vec{b}$ | 共线 | Ein Vektor ist ein Vielfaches des anderen |
| der Wendepunkt $f′′(x) = 0$ | 拐点 | Kruemmung wechselt, nur mit Vorzeichenwechsel gueltig |

Deutsch: Diese fuenf Begriffe vor dem Training aktiv beherrschen, erst dann Aufgaben loesen.

## BEISPIEL: 正确例题

- 例题（题干）：$f(x) = x^3 - 4x + 2$. Bestimme $f′(x)$ und die Tangentensteigung bei $x_0 = 2$.
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则 Potenzregel $(x^n)′ = n\cdot x^{n-1}$）：$x^3$ wird zu $3x^2$, $-4x$ wird zu $-4$
  - Schritt 2（规则 Summenregel, Konstante faellt weg）：$2$ wird zu $0$, also $f′(x) = 3x^2 - 4$
  - Schritt 3（规则 Einsetzen, lokale Aenderungsrate）：$f′(2) = 3\cdot 4 - 4 = 8$
- 新题（同类，独立做，见下方 check）：$g(x) = 2x^3 - 5x^2 + x - 1$, bestimme $g′(x)$ und $g′(1)$.

## 1. 中文讲一遍 (Feynman)

- 开考时A卷和B卷都在桌上，但计算器和公式表先不发。你自己决定何时交A卷换工具，最晚25分钟必须交，之后至少75分钟做B卷，总时长100分钟。
- A卷考两大块：函数与分析（整数指数幂函数、整式函数、图像走势、定义域、值域、零点、对称、无穷趋势、坐标轴对称、平移、伸缩、平均与瞬时变化率、图像求导、割线与切线、只用幂法则加和法则和常数倍法则求导、单调性、极值点、局部与全局极值、凹凸、拐点）加解析几何（空间点、位置向量、向量、加法、数乘、长度、共线）。
- B卷只有函数与分析：一题纯数学论证，一题现实情境。按学校设备考WTR版或CAS版其中一套，官方公式表可用，德语词典两部分都可用。
- Typische B-Frageformate in eigenen Worten: Darstellungsform wechseln und Vorteil nennen, Extrempunkte rechnerisch bestimmen, Sekantengleichung durch zwei Punkte, Steigungswinkel aus $m$ mit $\tan\alpha = m$, Graph der Ableitung zeichnen und deuten, mittlere gegen momentane Rate im Kontext erklaeren.
- Deutsch: Teil A prueft Analysis und Geometrie ohne Hilfsmittel. Teil B prueft nur Analysis mit Hilfsmitteln und verlangt vollstaendige Rechenwege, da die Darstellungsleistung bepunktet wird.

## 2. 辨析 Fehlvorstellungen (MINT-Variante, statt Pro und Contra)

- 误解1：B卷有CAS，过程随便写写就行 → 纠偏：错。Bepunktet wird der nachvollziehbare Loesungsweg, nicht nur das Ergebnis. Jede Folgerung braucht einen Satz.
- 误解2：A卷可以先看公式表，公式都认识就行 → 纠偏：错。Teil A laeuft ohne Taschenrechner und ohne Formelsammlung, also muessen Potenzregel, pq-Formel und Vektorlaenge auswendig sitzen.
- 误解3：导数为零的地方就是极值点 → 纠偏：错。$f′(x_0) = 0$ ist nur notwendig. Erst ein Vorzeichenwechsel von $f′$ oder $f′′(x_0)$ mit Vorzeichen sichert die Art.
- Deutsch: Jede Fehlvorstellung im Muster Irrtum, Warum falsch, Was richtig aufschreiben und mit einer selbst gestellten Aufgabe testen.

## 3. 德语 Klausur-Sätze

- Die Ableitung an der Stelle $x_0$ gibt die lokale Aenderungsrate (Tangentensteigung) an.
- Aus $f′(x_0) = 0$ und einem Vorzeichenwechsel von $f′$ bei $x_0$ folgt ein lokaler Extrempunkt.
- Die Vektoren $\vec{a}$ und $\vec{b}$ sind kollinear, da ein $k$ existiert mit $\vec{a} = k\cdot\vec{b}$.
- Die Sekantensteigung $\frac{f(x_2)-f(x_1)}{x_2-x_1}$ beschreibt die mittlere Aenderungsrate im Intervall $[x_1, x_2]$.
- Der Graph besitzt bei $x = 1$ einen Wendepunkt, da $f′′(1) = 0$ gilt und $f′′$ dort das Vorzeichen wechselt.
- Im Sachzusammenhang bedeutet ein positiver Wert der Ableitung, dass die Groesse momentan zunimmt.

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| die Ableitung | 导数 | Die Ableitung an der Stelle $x_0$ gibt die Tangentensteigung an. |
| die mittlere Aenderungsrate | 平均变化率 | Die Sekante durch zwei Punkte zeigt die mittlere Aenderungsrate. |
| kollinear | 共线 | Die Vektoren sind kollinear, da $\vec{b} = 2\cdot\vec{a}$ gilt. |
| der Wendepunkt | 拐点 | Am Wendepunkt wechselt der Graph die Kruemmung. |

## 5. Quelle / Aufgabe

- Vorgaben ZKE 2027 (Amtliches Werk, nur lokal gelesen, nichts kopiert)：_Downloads/Mathe/vorgaben_zke_mathe_2027.pdf
- Beispielsaetze zur Orientierung (alle Aufgaben unten selbst gestellt)：_Downloads/Mathe/zke_a_beispiel1.pdf, _Downloads/Mathe/zke_b_beispiel_wtr.pdf
- Training mit Formelsammlung：_Downloads/Mathe/formelsammlung_nrw_2024.pdf, dazu Serlo Ableitung und Vektoren Grundbegriffe (siehe 03_Mathe/Ressourcen.md).

## 6. Lernreise

- Lernreise/Mathe-ZKE-2027-L1.md（待建：A卷25分钟模拟加B卷论证链）

## 7. Fehlerlog

- [ ] Jeden Fehler aus den vier Uebungen unten in 03_Mathe/Klausur-Training/Fehlerlog.md eintragen, Rechenfehler und Konzeptfehler getrennt markieren.

## UEBUNGSPACK: 每块2道自编 klausurnahe Aufgaben (alle selbst gestellt, nichts kopiert)

### Uebung A1 (Analysis, Teil-A-Stil)：零点加求导

- Aufgabe：$f(x) = x^3 - 4x^2 + 3x$. a) Berechne die Nullstellen von $f$. b) Bilde $f′(x)$.
- 中文思路：先提公因式x降次，再对二次部分用pq公式；求导逐项用幂法则。
- Loesungsweg：$f(x) = x\cdot(x^2-4x+3) = 0$, also $x_1 = 0$. Fuer $x^2-4x+3 = 0$ gilt mit pq $x_{2,3} = 2 \pm \sqrt{4-3} = 2 \pm 1$, also $x_2 = 1$, $x_3 = 3$. Ableitung：$f′(x) = 3x^2 - 8x + 3$.
- Typischer Fehler：pq-Vorzeichen falsch ($p = -4$ gibt $-\frac{p}{2} = +2$, nicht $-2$)；Ausklammern vergessen und pq direkt auf Grad 3 versucht.

### Uebung A2 (Analysis, Teil-B-Stil)：极值论证

- Aufgabe：$g(x) = x^3 - 3x^2 - 9x + 5$. Untersuche $g$ rechnerisch auf lokale Extremstellen und gib Art und Koordinaten der Extrempunkte an.
- 中文思路：先必要条件导数为零求候选点，再用二阶导符号充分条件定性，最后回代求点。
- Loesungsweg：$g′(x) = 3x^2 - 6x - 9 = 0$ gibt $x^2-2x-3 = 0$, also $x = 1 \pm \sqrt{1+3}$, Kandidaten $x = -1$ und $x = 3$. Mit $g′′(x) = 6x-6$ gilt $g′′(-1) = -12 < 0$ (Hochpunkt) und $g′′(3) = 12 > 0$ (Tiefpunkt). Wegen $g(-1) = 10$ und $g(3) = -22$ folgen $H(-1\mid 10)$ und $T(3\mid -22)$.
- Typischer Fehler：Nach $g′ = 0$ aufgehoert ohne Art und Punkte；bei Operator rechnerisch nur am Graphen abgelesen (gibt keine Punkte)；$g(-1)$ mit Vorzeichenfehlern berechnet.

### Uebung G1 (Geometrie, Teil-A-Stil)：向量与长度

- Aufgabe：$P(1\mid 0\mid 2)$, $Q(4\mid 4\mid 2)$. a) Gib $\vec{PQ}$ an. b) Berechne $|\vec{PQ}|$.
- 中文思路：终点减起点得向量，各分量平方求和再开方。
- Loesungsweg：$\vec{PQ} = (4-1\mid 4-0\mid 2-2) = (3\mid 4\mid 0)$. Laenge：$|\vec{PQ}| = \sqrt{3^2+4^2+0^2} = \sqrt{25} = 5$.
- Typischer Fehler：$P - Q$ statt $Q - P$ (Richtung falsch)；Wurzel am Ende vergessen；Minuszeichen beim Quadrieren ohne Klammer.

### Uebung G2 (Geometrie, Teil-A-Stil)：共线加直线检验

- Aufgabe：a) Pruefe, ob $\vec{a} = (1\mid 2\mid 3)$ und $\vec{b} = (2\mid 4\mid 6)$ kollinear sind. b) Gerade $h\colon \vec{x} = (0\mid 1\mid 2) + r\cdot(1\mid 0\mid -1)$. Mache die Punktprobe fuer $R(2\mid 1\mid 0)$.
- 中文思路：共线要找到同一个k对三个分量都成立；点检验要同一个r满足三个坐标方程。
- Loesungsweg：a) $\vec{b} = 2\cdot\vec{a}$ mit $k = 2$ fuer alle drei Komponenten, also kollinear. b) $2 = 0 + r$ gibt $r = 2$；$1 = 1 + 2\cdot 0$ stimmt；$0 = 2 + 2\cdot(-1) = 0$ stimmt. Also liegt $R$ auf $h$.
- Typischer Fehler：Nur eine Komponente verglichen und kollinear behauptet；bei der Punktprobe $r$ aus einer Zeile genommen und den Rest nicht mehr geprueft.

## VERGLEICH: 对比实验

- A题 (mittlere Rate, Sekante)：Durchschnittssteigung von $f$ zwischen $x = 0$ und $x = 120$ mit $\frac{f(120)-f(0)}{120-0}$.
- B题 (lokale Rate, Tangente)：Momentansteigung $f′(120)$ genau an der Stelle $x = 120$.
- 二选程序：先问有几个点？两点加区间用A公式，一个点用B求导。因为题目问 durchschnittlich pro Minute，所以选A。
- 一句话区别：A mittelt ueber ein Intervall (Sekante durch zwei Punkte), B misst in einem Moment (Tangente in einem Punkt).
- Deutsch: Erst die Frage einordnen (Intervall oder Moment), dann erst rechnen.

## FEHLVORSTELLUNG: 常见误解加纠偏

- 误解1：局部最大值就是全局最大值 → 纠偏：全局要比较所有候选加区间端点。Richtig：Alle lokalen Extrema plus Randwerte vergleichen, erst dann global entscheiden.
- 误解2：函数单调只看某点导数符号 → 纠偏：一阶导要在整个区间定号。Richtig：Monotonie braucht eine Vorzeichentabelle von $f′$ ueber dem ganzen Intervall.
- Deutsch: Beide Fehler entstehen, wenn man von einer Stelle auf das Ganze schliesst.

## check / ANTWORT

- Aufgabe (Klausur-format, mit Operator, selbst gestellt)：$g(x) = 2x^3 - 5x^2 + x - 1$. Berechne $g′(x)$ und die lokale Aenderungsrate bei $x_0 = 1$.
- Antwort (合书先写)：
- KR（对/错）：
- Korrektur加错因归类（辨别错 / 知识错 / 表达错）：

## TAKEAWAY: 1盒总结

> A卷拼手算准确率（零点、求导、向量），B卷拼完整论证链加情境翻译；导数为零只是候选，定性要靠符号；共线与点检验都要所有分量用同一个常数。
> Deutsch: Teil A fehlerfrei rechnen, Teil B vollstaendig argumentieren. $f′ = 0$ ist nur notwendig, Kollinearitaet und Punktprobe brauchen eine Konstante fuer alle Komponenten.

## REFLEXION: 2问

1. 过程：这道题关键一步用了哪个规则？因为极值论证必须先必要后充分，所以先解 $f′ = 0$ 再用 $f′′$ 定性。
2. 元认知：哪里最卡/最易混？因为平均与瞬时变化率题干词相近，所以下次先划出是区间还是时刻再选公式。
