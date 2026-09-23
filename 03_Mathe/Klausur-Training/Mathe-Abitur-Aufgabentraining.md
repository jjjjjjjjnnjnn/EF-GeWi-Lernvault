---
fach: Mathe
thema: "Abitur-Aufgabentraining 2026"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Mathe]
---

# Mathe-Abitur-Aufgabentraining（2026 Leistungskurs）

> 中文一句话理解：把 2026 数学高考拆成三个原创训练包——第一卷无工具完成四道必答并从六道选二，第二卷在模块化数学系统和公式册辅助下完成二分析、一向量几何、一概率——重点不是背答案，而是写清可评分的解题链。
>
> Lesson v3（9步制）导航：1 ZIELE → 2 PRETRAINING → 3 BEISPIEL → 4 中文讲一遍 → 5 争议/辨析 → 6 Klausur-Sätze → 7 VERGLEICH → 8 FEHLVORSTELLUNG + check/ANTWORT → 9 TAKEAWAY + REFLEXION。
>
> Deutsch: Im Abitur 2026 gibt es einen ersten Prüfungsteil ohne Hilfsmittel und einen zweiten mit modularem Mathematiksystem sowie Formelsammlung. Die Aufgaben und Lösungen in diesem Heft sind vollständig selbst erstellt; sie übernehmen nur die öffentlich zugängliche Struktur.

## ZIELE: 本课学完能… (3条)

- [ ] 能遵守第一卷禁用计算器、模块化数学系统和公式册的规则，并手算完成两道分析、一道向量几何和一道概率题（Operator：berechnen, begruenden）
- [ ] 能从六道第一卷选做题中选二，并按题域选边而不是按所谓“简单题”猜（Operator：auswaehlen, begruenden）
- [ ] 能在第二卷写出模型、公式、代入、单位化结果和结论句，不只抄 CAS 输出（Operator：modellieren, darstellen, pruefen）

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

| Deutsch | 中文 | 一句话释义 |
|---|---|---|
| der Prüfungsteil | 考试部分 | 第一卷或第二卷，必须先认清工具规则 |
| die Pflichtaufgabe | 必答题 | 不允许考生跳过 |
| die Wahlpflichtaufgabe | 选做题 | 从规定题目中按规则选择 |
| das Sachgebiet | 内容领域 | Analysis、Vektorielle Geometrie、Stochastik 等分类 |
| das modulare Mathematiksystem | 模块化数学系统 | 第二卷使用的计算机代数系统 |
| die Bewertungseinheit | 评分单位 | 可获得分数的完整解题步骤 |

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干）：Berechne fuer $f(x)=x^2-5x$ die Steigung der Tangente bei $x_0=2$.
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则 Potenz- und Summenregel）：$f'(x)=2x-5$.
  - Schritt 2（规则 lokale Aenderungsrate）：$f'(2)=4-5=-1$.
  - Schritt 3（规则 Tangentengleichung）：$f(2)=-6$, also $t(x)=-6-(x-2)=-x-4$.
- 新题（同类，独立做，见下方 check）：Ableitung, Tangente oder Extremwert zuerst selbst wählen, dann begründen.

## 1. 中文讲一遍 (Feynman)

- 2026 Leistungskurs 第一卷共做六题：四道必答固定为 **2 Analysis + 1 Analytische Geometrie/Lineare Algebra + 1 Stochastik**；另有六道选做题，每域两道，选二。考生可以两题都选同一域。
- 第一卷从开始到交卷最多 110 分钟。交第一卷后才拿到 WTR 或 CAS/MMS 与公式册；**第一卷无任何数学工具和公式册**。
- 第二卷官方提供四题：2 Analysis、1 Vektorgeometrie、1 Stochastik；学校按本班工具版本选卷。训练时把公式册和 CAS 当辅助，不把它们当论证替代品。
- 中文记忆：第一卷“公式在脑中、过程能复现”，第二卷“模型能落地、结果能解释”。
- Deutsch: Im ersten Prüfungsteil müssen Ansatz, Rechnung und Begründung ohne Hilfsmittel nachvollziehbar sein. Im zweiten Prüfungsteil bleiben die vereinbarten Hilfsmittel erlaubt, doch der Lösungsweg ist weiterhin Teil der Leistung.

### Trainingspaket M1 — Teil 1 Pflichtblock: Aufgaben ohne Hilfsmittel

**中文任务理解：**以下四道模拟第一卷必答结构；练习时关闭笔记、计算器和公式册。

- **M1-A1 Analysis:** Gegeben ist $f(x)=x^3-3x+1$. a) Berechne $f'(x)$. b) Bestimme die lokalen Extrempunkte. c) Gib die Monotonieintervalle an.
- **M1-A2 Analysis:** Gegeben ist $g(x)=x^2-4x+5$. a) Bestimme die Nullstellen. b) Berechne Stelle und Wert des globalen Minimums. c) Begruende das Ergebnis mit dem Graphen einer Parabel.
- **M1-A3 Analytische Geometrie:** Gegeben sind $A(1\mid2\mid3)$ und $B(4\mid6\mid3)$. a) Berechne $\vec{AB}$ und $|\vec{AB}|$. b) Die Gerade $g$ ist $g\colon\vec{x}=\vec{A}+r\vec{AB}$. c) Pruefe, ob $D(7\mid10\mid3)$ auf $g$ liegt.
- **M1-A4 Stochastik:** Eine Urne enthaelt drei rote und zwei blaue Kugeln. Es werden ohne Zuruecklegen zwei Kugeln gezogen. Bestimme die Wahrscheinlichkeit, dass beide rot sind, und stelle den Weg ueber ein Baumdiagramm dar.

**中文理解：**A1 用二阶导数区分极大和极小；A2 顶点和零点都要写；A3 三分量必须共用同一个参数；A4 无放回使第二次分母改变。

- **Loesung M1-A1:** $f'(x)=3x^2-3=3(x-1)(x+1)$. Die notwendigen Stellen sind $x=-1$ und $x=1$. Mit $f''(x)=6x$ gilt $f''(-1)=6>0$, also Hochpunkt $H(-1\mid3)$, und $f''(1)=-6<0$, also Tiefpunkt $T(1\mid-1)$. Wegen $f'(x)>0$ fuer $x<-1$, $f'(x)<0$ fuer $-1<x<1$ und $f'(x)>0$ fuer $x>1$, ist $f$ auf $(-infty,-1]$ und $[1,infty)$ streng monoton steigend und auf $[-1,1]$ streng monoton fallend.
- **中文理解：**导数为零只产生候选点；二阶导的符号才完成类型判定。
- **Rubrik M1-A1 (5 BE):** $f'$ 1；候选点 1；充分条件 1；极值点坐标 1；单调区间 1。

- **Loesung M1-A2:** $g(x)=x^2-4x+5=(x-2)^2+1$, also $N(2\mid1)$. Die Nullstellen folgen aus $(x-2)^2=1$ zu $x_1=1$ und $x_2=3$. Die Oeffnung zeigt nach oben; $g(2)=1$ ist deshalb das globale Minimum. Aequivalent liefert $g'(2)=0$ und $g''(2)=2>0$.
- **中文理解：**配方同时给出顶点、开口和最小值，比只写“顶点在 x=2”完整。
- **Rubrik M1-A2 (5 BE):** 配方或等价 Ansatz 1；零点 1；开口/单调论证 1；最小点 1；数值与句子 1。

- **Loesung M1-A3:** $\vec{AB}=B-A=(3\mid4\mid0)$. Daher $|\vec{AB}|=\sqrt{3^2+4^2+0^2}=5$. Fuer $D$ liefert die erste Koordinate $7=1+3r$, also $r=2$. Die beiden anderen Koordinaten ergeben $10=2+4\cdot2$ und $3=3+2\cdot0$. Da derselbe Parameter alle Komponenten erfuellt, liegt $D$ auf $g$.
- **中文理解：**不能只验证第一分量；点在线上的证据是三坐标共用同一参数。
- **Rubrik M1-A3 (5 BE):** 向量 1；平方和与开方 1；写出参数式 1；共同参数 1；结论句 1。

- **Loesung M1-A4:** Der erste Pfad beginnt mit $3/5$. Danach bleiben drei rote von vier Kugeln uebrig, also ist die zweite Wahrscheinlichkeit $2/4$. Im Baum wird der Pfad rot-rot mit $3/5\cdot2/4=3/10$ markiert.
- **中文理解：**无放回后总数和有利数都改变，所以不是 $(3/5)^2$。
- **Rubrik M1-A4 (5 BE):** 第一枝 1；第二枝剩余量 1；路径相乘 1；化简 1；答案句 1。

### Trainingspaket M2 — Teil 1 Wahlpflichtblock: zwei aus sechs waehlen

**中文任务理解：**模拟六选二；先看题域和自己的把握，再选择。下列六题都原创且都应在无辅助工具条件下完成。

- **M2-W1 Analysis:** Bestimme Nullstellen und Symmetrieachse von $p(x)=x^2-5x+6$.
- **M2-W2 Analysis:** Untersuche $h(x)=x^3-6x+1$ auf lokale Extrempunkte.
- **M2-W3 Analytische Geometrie:** Pruefe, ob $\vec a=(2\mid-1\mid4)$ und $\vec b=(-4\mid2\mid-8)$ kollinear sind.
- **M2-W4 Analytische Geometrie:** Bestimme den Schnittpunkt von $g\colon\vec{x}=(1\mid0\mid2)+s(0\mid1\mid0)$ und $h\colon\vec{x}=(0\mid2\mid1)+r(1\mid0\mid0)$.
- **M2-W5 Stochastik:** Eine Urne enthaelt drei rote und eine weisse Kugel. Zwei Kugeln werden ohne Zuruecklegen gezogen. Bestimme die Wahrscheinlichkeit fuer genau eine weisse Kugel.
- **M2-W6 Stochastik:** Eine Urne enthaelt drei rote und zwei blaue Kugeln. Zwei Kugeln werden mit Zuruecklegen gezogen. Bestimme die Wahrscheinlichkeit fuer zwei Kugeln gleicher Farbe.

**中文理解：**训练目标是依据“稳定得分”选择；不应声称某一领域必比另一领域简单。

- **Loesung M2-W1:** $p(x)=(x-2)(x-3)$, also $N_1(2\mid0)$ und $N_2(3\mid0)$. Die Symmetrieachse liegt mittig bei $x=\frac52$.
- **Rubrik (5 BE):** Faktorform 1；两零点 1；轴位置 1；过程可复现 1；结论句 1。

- **Loesung M2-W2:** $h'(x)=3x^2-6=0$ liefert $x=-\sqrt2$ und $x=\sqrt2$. Wegen $h''(x)=6x$ ist $x=-\sqrt2$ ein Hochpunkt mit $h(-\sqrt2)=1+4\sqrt2$ und $x=\sqrt2$ ein Tiefpunkt mit $h(\sqrt2)=1-4\sqrt2$.
- **Rubrik (5 BE):** 导数 1；两候选 1；二阶判别 2；两坐标 1。

- **Loesung M2-W3:** Es gilt $\vec b=-2\cdot\vec a$. Da derselbe Skalar fuer alle Komponenten gilt, sind $\vec a$ und $\vec b$ kollinear.
- **Rubrik (5 BE):** 公共比例 2；三分量核对 1；术语 1；结论 1。

- **Loesung M2-W4:** $1=0+r$ liefert $r=1$ und $0=2s$ liefert $s=0$. Die $z$-Koordinaten stimmen ebenfalls ueberein. Also ist $S(1\mid2\mid2)$ der Schnittpunkt.
- **Rubrik (5 BE):** $r$ 1；$s$ 1；三分量代回 2；交点 1。

- **Loesung M2-W5:** Genau eine weisse Kugel entsteht auf einem von zwei Pfaden: erst weiss dann rot oder erst rot dann weiss. $P(W\!R)=1/4\cdot3/3=1/4$ und $P(R\!W)=3/4\cdot1/3=1/4$. Disjunkte Ereignisse werden addiert: $P=1/2$.
- **Rubrik (5 BE):** 两条路径 2；分支概率 1；相加理由 1；答案 1。

- **Loesung M2-W6:** Mit Zuruecklegen bleiben die Wahrscheinlichkeiten pro Zug konstant. $P(RR)=(3/5)^2=9/25$ und $P(BB)=(2/5)^2=4/25$. Da $RR$ und $BB$ disjunkt sind, ergibt sich $13/25$.
- **Rubrik (5 BE):** 放回理由 1；$RR$ 1；$BB$ 1；相加 1；答案 1。

### Trainingspaket M3 — Teil 2: modulares Mathematiksystem und Formelsammlung

**中文任务理解：**第二卷使用四题结构：两道 Analysis、一道 Vektorgeometrie、一道 Stochastik；学校按工具版本选定相应卷。练习可打开 CAS/MMS 和公式册，但每个结果仍写 Ansatz 与理由。

- **M3-B1 Analysis:** Untersuche $p(x)=x^3-3x$ auf Nullstellen, lokale Extrempunkte und Monotonie. Bestimme ausserdem die Tangente bei $x_0=0$.
- **M3-B2 Analysis mit Sachbezug:** Eine Minutentrainingseinheit kostet $C(x)=0{,}5x^2-6x+40$ Euro fuer $0\le x\le12$ Teilnehmer. Bestimme das Kostenminimum und deute $x$ praktisch.
- **M3-B3 Vektorielle Geometrie:** Untersuche die Lage der Geraden $g\colon\vec{x}=(2\mid-1\mid1)+s(1\mid2\mid0)$ und $h\colon\vec{x}=(0\mid3\mid1)+r(0\mid-2\mid1)$.
- **M3-B4 Stochastik:** Eine Urne enthaelt vier gruene und zwei rote Kugeln. Zwei Kugeln werden ohne Zuruecklegen gezogen. Bedingt auf die erste gruene Kugel: Bestimme die Wahrscheinlichkeit, dass die zweite rot ist.

- **Loesung M3-B1:** $p(x)=x(x^2-3)$ liefert $0,\pm\sqrt3$. Mit $p'(x)=3x^2-3$ sind $\pm1$ Kandidaten; $p''(-1)=6>0$ und $p''(1)=-6<0$ ergeben $H(-1\mid2)$ und $T(1\mid-2)$. $p'$ ist links von $-1$ positiv, dazwischen negativ und rechts von $1$ positiv. Fuer die Tangente gilt $p(0)=0$ und $p'(0)=-3$, also $t(x)=-3x$.
- **中文理解：**模型可以由 CAS 辅助检查，但零点、极值类型和单调区间必须分别论证。
- **Rubrik (10 BE):** 零点 1；导数与候选 2；充分条件 2；点坐标 2；单调 2；切线 Ansatz 与结果 1。

- **Loesung M3-B2:** $C(x)=0{,}5(x^2-12x)+40=0{,}5(x-6)^2+22$. Da das Quadrat nicht negativ ist, gilt $C(x)\ge22$ mit Gleichheit bei $x=6$. Das Minimum liegt im erlaubten Intervall und bedeutet: Sechs Teilnehmer verursachen die geringsten Kosten.
- **Rubrik (10 BE):** 领域建模 2；变形 3；非负论证 2；最小值 1；区间检查 1；解释 1。

- **Loesung M3-B3:** $2+s=0$ liefert $s=-2$ und $1=1+r$ liefert $r=0$. Die $y$-Gleichungen wuerden zugleich $-1+2(-2)=-5$ und $3-2(0)=3$ verlangen. Da das unmoeglich ist, sind $g$ und $h$ windschief.
- **Rubrik (10 BE):** 参数方程 2；$s$ 2；$r$ 2；$y$ 矛盾 2；分类与句子 2。

- **Loesung M3-B4:** Nach der ersten grünen Kugel bleiben drei gruene und zwei rote Kugeln uebrig, insgesamt fuenf. Da das Ergebnis der ersten Ziehung feststeht, betragen alle fuenfmoeglichen zweiten Ziehungen gleich $1/5$. Zwei davon sind rot, also $P=2/5$.
- **Rubrik (10 BE):** 条件事件 2；剩余集合 2；等可能性 2；计数 2；答案与解释 2。

## 2. 争议/辨析 (GeWi填Pro/Contra；MINT填Fehlvorstellungen；Sprachen填Aufgabenart+AFB)

### Pro / 常见正确理解
- 第一卷先在纸上选好选做题域，再做四道必答；第二卷才切换工具。
- 工具只承担运算，计算条件、模型选择和结论句仍属于考生。

### Contra / 典型错概念
- 认为第一卷可以用手机查导数或带小抄公式册。
- 认为 CAS 给出的准确小数就是完整答案。

### Stellungnahme-Satz (beurteilen/erörtern)
- Ich bewerte einen CAS-Einsatz nur dann als klausurgerecht, wenn Ansatz, Bedingungen und Schlussfolgerung eigenstaendig dokumentiert sind.

## 3. 德语 Klausur-Sätze (用Operatoren)

- `Der erste Prüfungsteil wird ohne Taschenrechner, CAS/MMS und Formelsammlung bearbeitet.`
- `Aus den sechs Wahlpflichtaufgaben werden zwei Aufgaben bearbeitet; die Auswahl wird begruendet.`
- `Notwendige Kandidaten werden durch eine hinreichende Bedingung ueberprueft.`
- `Derselbe Parameter erfuellt alle Komponenten, daher liegt der Punkt auf der Geraden.`
- `Entlang eines Pfades werden Wahrscheinlichkeiten multipliziert, disjunkte Ereignisse werden addiert.`
- `Das CAS bestaetigt die Rechnung, ersetzt aber nicht den dokumentierten Lösungsweg.`

## 4. Fachbegriffe (进Anki)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| der Prüfungsteil | 考试部分 | Der erste Prüfungsteil wird ohne Hilfsmittel bearbeitet. |
| die Pflichtaufgabe | 必答题 | Die Pflichtaufgabe kann nicht uebersprungen werden. |
| die Wahlpflichtaufgabe | 选做题 | Zwei Wahlpflichtaufgaben werden ausgewaehlt. |
| das Sachgebiet | 内容领域 | Jedes Sachgebiet verlangt eine passende Strategie. |
| das modulare Mathematiksystem | 模块化数学系统 | Das modulare Mathematiksystem unterstuetzt die Rechnung im zweiten Teil. |
| die Bewertungseinheit | 评分单位 | Jede vollstaendige Bewertungseinheit traegt Punkte. |

## 5. Quelle / Aufgabe

- MSB NRW, Zentralabitur 2026 Mathematik, amtliche Struktur (Amtliches Werk, nur paraphrasiert): https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/mathematik_2026_gg_0.pdf
- MSB NRW, Vorblatt Leistungskurs Teil 1 (Wahlpflichtauswahl und 110-Minuten-Regel): https://www.standardsicherung.schulministerium.nrw.de/system/files/media/document/file/vorblatt_lk_2026_aufgabenauswahl_pruefungsteila.pdf
- MSB NRW, Mathematik GOSt (Formelsammlung und Toolregeln ab 2026): https://www.standardsicherung.schulministerium.nrw.de/zentralabitur-gost/faecher/mathematik-gost
- IQB, Abitur-Aufgabenpools (nur Aufgabentypen als Orientierung, keine Aufgabe uebernommen): https://www.iqb.hu-berlin.de/abitur/pools
- Aufgaben, Zahlen, Lösungswege und Trainingsrubriken: vollständig selbst erstellt. Die Rubriken sind Lernhilfen und keine originalen Prüfungspunkte.

## 6. Lernreise

- Nicht anwendbar: 本页是 Klausur-Training，不新建或修改 App/Lernreise 内容。

## 7. Fehlerlog

- [ ] 每次训练把假工具、步骤缺失和选题失误分别记入 `03_Mathe/Klausur-Training/Fehlerlog.md`。

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（第一卷）：`Berechne die Nullstellen und eine Tangente ohne Formelsammlung.`
- B题（第二卷）：`Modelliere eine Kostenfunktion und pruefe das Minimum mit CAS/MMS und Formelsammlung.`
- 二选程序（先选再做）：“这题用哪个？因为第一卷没有工具，所以选A；因为第二卷需要情境模型与工具核验，所以选B。”
- 一句话区别：Erster Teil = Hilfsmittelfreiheit plus Rechenweg; zweiter Teil = Modell plus Werkzeug plus nachvollziehbare Urteilskette.

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：交第一卷前可以借用公式册 → 纠偏：公式册与数学工具只在交卷后获得（正确：Teil 1 ist vollständig hilfsmittelfrei）。
- 误解2：$f'(x_0)=0$ 保证极值 → 纠偏：它只是必要条件（正确：Typ und Art erst mit hinreichender Bedingung）。

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator)：Waehle aus M2-W1 bis M2-W6 zwei Aufgaben. Begruende die Auswahl, rechne beide vollstaendig und vergleiche die erwartbare Fehlerquote.
- Antwort (合书先写)：
- KR（对/错）：
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：

## TAKEAWAY: 1盒总结

> 第一卷四必答加六选二，全部无工具；第二卷二分析、一几何、一概率，工具可用但思路必须自写。`Regel zuerst, Ansatz danach, Urteil zuletzt.`

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为不同题域要求不同方法，所以我先按 Analysis、Vektorgeometrie、Stochastik 分类再动手。
2. 元认知：哪里最卡/最易混？因为 CAS 输出很像证明，所以下次先把 Ansatz 和工具切换点写出来再调用计算。
