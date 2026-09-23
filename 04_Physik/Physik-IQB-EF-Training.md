---
fach: Physik
thema: "Physik IQB EF Training: Diagramme und Messung"
operatoren: []
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Physik]
---

# Physik IQB EF Training: Diagramme und Messung（图表与测量·EF应试训练）

> 中文一句话理解：EF力学考试就是看图说话加动手算图，s-t图斜率读速度，v-t图面积算路程，平均与瞬时要分清，Excel拟合直线只在误差范围内成立。

## ZIELE: 本课学完能… (3条)

- [ ] 能读画s-t图与v-t图并互相转换（Operator：darstellen）
- [ ] 能区分平均速度与瞬时速度并用切线斜率求瞬时值（Operator：erklaeren）
- [ ] 能评价测量误差并用Excel拟合直线做结论（Operator：beurteilen）

## PRETRAINING: 术语盒 (Mayer pre-training，先词后课)

中文在上：先认表再上课，做题前遮住中文自测一遍。

| Deutsch | 中文 | 一句话释义 |
|---|---|---|
| die Strecke s | 路程 | 运动经过的总长度，单位 m |
| die Zeit t | 时间 | 停表读数，单位 s |
| die Geschwindigkeit v | 速度 | 单位时间走多远，EF核心量 |
| die Steigung | 斜率 | 图线倾斜程度，s-t图斜率即速度 |
| die Ausgleichsgerade | 拟合直线 | Excel穿过散点的最佳直线，斜率即待求量 |
| die Messunsicherheit | 测量不确定度 | 每次读数都带误差，结论只能在误差内成立 |
| die Durchschnittsgeschwindigkeit | 平均速度 | 总路程除以总时间，含停留段 |
| die Momentangeschwindigkeit | 瞬时速度 | 某一时刻的速度，等于s-t切线斜率 |

德语小结：`Ohne saubere Achsen mit Einheiten ist jedes Diagramm wertlos.`

## BEISPIEL: 正确例题 (worked example，先例后题)

- 例题（题干，自写）：Labor-Fahrbahn，Messpunkte t in s: 0, 1, 2, 3, 4；s in m: 0 / 0,48 / 1,02 / 1,47 / 2,03。判断是否为匀速并求速度。
- 正确解法（分步，每步注规则）：
  - Schritt 1（规则：先画图再算）：s-t散点图，横轴 t in s，纵轴 s in m，点近乎共线。
  - Schritt 2（规则：斜率即速度）：取远端两点，$v = \Delta s / \Delta t$，约 $(2,03 - 0) / (4 - 0) \approx 0,51 \, \mathrm{m/s}$。
  - Schritt 3（规则：拟合印证）：Excel趋势线为直线，斜率约同值，点偏离无规律，故模型在误差内成立。
- 新题（同类，独立做，见下方 check）：用同样三步处理 UEBUNG 1。

## 1. 中文讲一遍 (Feynman)

- s-t图看斜率，v-t图看高度和面积：s-t直线斜率就是速度 $v = s / t$；v-t水平线高度就是速度，线下方面积就是路程。
- 平均管全程，瞬时管一点：平均 $v_{mittel} = s_{gesamt} / t_{gesamt}$ 会被停留拉低；瞬时看该时刻切线斜率 $v_{momentan} \approx \Delta s / \Delta t$。
- Excel只是尺子：表要两列加单位，图用散点加趋势线，结论只说误差内成立，不说绝对精确。

德语复述：`Im s-t-Diagramm gibt die Steigung die Geschwindigkeit an, im v-t-Diagramm gibt die Flaeche unter der Linie den Weg an.`

## 2. 争议/辨析 (MINT: Fehlvorstellungen)

### Pro / 常见正确理解

- 图对公式对：轴与单位先标清，斜率与面积各有分工，平均与瞬时分开算。

### Contra / 典型错概念

- 看见直线就喊匀速：v-t的水平直线才是匀速的速度线，s-t的斜直线才是匀速的路程线，两张图不可混读。

### Stellungnahme-Satz (beurteilen)

- `Obwohl beide Diagramme Geraden zeigen koennen, liegt gleichfoermige Bewegung im s-t-Diagramm als steigende Gerade und im v-t-Diagramm als waagerechte Linie vor, daher entscheidet zuerst die Achsenbeschriftung.`

## 3. 德语 Klausur-Sätze (用Operatoren)

- `Das s-t-Diagramm wird mit beschrifteten Achsen einschliesslich Einheiten dargestellt; die Ausgleichsgerade fasst die Messpunkte zusammen.`
- `Die Durchschnittsgeschwindigkeit wird mit dem Ansatz v gleich s durch t berechnet und mit Einheit angegeben.`
- `Die Momentangeschwindigkeit wird als Tangentensteigung am gewaehlten Zeitpunkt erklaert und vom Mittelwert unterschieden.`
- `Die Messreihe wird im Rahmen der Messunsicherheit beurteilt, weil zufaellige Abweichungen unsystematisch und systematische Effekte separat benannt werden.`

## UEBUNGEN: 4 klausurnahe Aufgaben (selbst gestellt, nicht aus IQB kopiert)

中文在上：四道全部自编，只练EF三类题型，数字全部自造，不抄任何原题。

### UEBUNG 1 — s-t lesen + Mittelwert (beschreiben, berechnen)

- Aufgabe：Fahrrad-Schulweg 600 m in 300 s，dabei 60 s Ampelstopp。Beschreibe den Verlauf im s-t-Diagramm und berechne die Durchschnittsgeschwindigkeit。
- Loesungsweg：
  - Schritt 1：deutsch beschreiben，Anstieg，dann waagerechtes Stueck，dann Anstieg。
  - Schritt 2：$v_{mittel} = 600 / 300 = 2,0 \, \mathrm{m/s}$，mit Einheit。
  - Schritt 3：ohne Stopp waeren es $600 / 240 = 2,5 \, \mathrm{m/s}$，Differenz zeigt Stoppeffekt。
- Auswerte-Hinweis：读图先圈停留水平段，算平均必须用总时间，停留段斜率为零。

### UEBUNG 2 — v-t zeichnen + Flaeche (darstellen, analysieren)

- Aufgabe：Fahrstuhlfahrt，0 bis 2 s Anfahrt auf 2 m pro s，2 bis 8 s konstante Fahrt，8 bis 10 s Abbremsen auf null。Zeichne das v-t-Diagramm und analysiere den zurueckgelegten Weg。
- Loesungsweg：
  - Schritt 1：Treppenprofil zeichnen，Achsen mit Einheiten。
  - Schritt 2：Weg als Flaeche，Trapez，$s = (8 + 10) / 2 \cdot 2 = 18 \, \mathrm{m}$，alternativ Teilflaechen addieren。
  - Schritt 3：mittlere Geschwindigkeit $18 / 10 = 1,8 \, \mathrm{m/s}$。
- Auswerte-Hinweis：画图三件套为轴加单位加折线，面积分段数格可核对。

### UEBUNG 3 — Mittelwert vs Momentan (erklaeren, begruenden)

- Aufgabe：100 m Lauf mit Lichtschranken，Gesamtzeit 12,5 s。Die Tangente am s-t-Graphen bei 6 s hat die Steigung 9,0 m pro s。Erklaere den Unterschied und begruende die Aussage。
- Loesungsweg：
  - Schritt 1：Mittelwert $v_{mittel} = 100 / 12,5 = 8,0 \, \mathrm{m/s}$。
  - Schritt 2：Momentanwert als Tangentensteigung 9,0 m pro s，groesser als Mittelwert，typisch fuer Zwischenphase mit Top Speed。
  - Schritt 3：Begruendung mit Formel $v_{momentan} \approx \Delta s / \Delta t$ am Punkt，Mittelwert mittelt Start und Ziel mit。
- Auswerte-Hinweis：问平均答总数除以总时，问瞬时答切线，两者只在匀速段相等。

### UEBUNG 4 — Excel Messreihe + Fehler (auswerten, beurteilen)

- Aufgabe：Federwagen Messreihe selbst aufgenommen，s-t-Punkte streuen leicht um eine Gerade。Werte mit Excel aus und beurteile die Guete des Modells。
- Loesungsweg：
  - Schritt 1：Tabelle mit Einheiten，sinnvolle Nachkommastellen。
  - Schritt 2：Punktdiagramm plus linearer Trendlinie，Steigung mit Einheit ablesen，Gegenprobe mit $v = \Delta s / \Delta t$。
  - Schritt 3：zufaellige Fehler an Streuung festmachen，systematische an Stoppuhr und Startpunkt，Urteil nur im Rahmen der Unsicherheit。
- Auswerte-Hinweis：趋势线不硬过原点，不连折线，结论句式见 Klausur-Satz 4。

## 4. Fachbegriffe (进Anki，CSV暂无故只存表)

| Deutsch | Chinesisch | Beispielsatz |
|---|---|---|
| die Steigung | 斜率 | Die Steigung im s-t-Diagramm gibt die Geschwindigkeit an. |
| die Ausgleichsgerade | 拟合直线 | Die Ausgleichsgerade fasst die streuenden Punkte sinnvoll zusammen. |
| die Messunsicherheit | 测量不确定度 | Jede Messung traegt eine Unsicherheit, daher gilt das Ergebnis nur im Rahmen der Fehler. |
| der Mittelwert | 平均值 | Der Mittelwert aus Gesamtstrecke und Gesamtzeit enthaelt auch die Pause. |
| die Tangente | 切线 | Die Tangente am Kurvenpunkt liefert die Momentangeschwindigkeit. |
| systematisch / zufaellig | 系统的/随机的 | Systematische Fehler verschieben alle Werte, zufaellige streuen um die Gerade. |

## 5. Quelle / Aufgabe

- IQB NaWi Pools 2025 und 2026 lokal gelesen (`_Downloads/Physik/iqb_2025*.pdf`, `iqb_2026*.pdf`，frei fuer Lehrzwecke)，Aufgabentypen nur als Typenreferenz，keine Aufgabe kopiert。
- StanSi Operatoren ab 2025 plus Konstruktion und Korrekturzeichen aus `stansi-runde4/` (Amtliches Werk，nur lokal，Definitionen paraphrasiert)。
- LEIFI Methoden paraphrasiert：https://www.leifiphysik.de/ 与 https://www.leifiphysik.de/mechanik/gleichfoermige-bewegung (Grundwissen plus Aufgaben mit Musterloesung)。
- Stilvorbild ohne Wiederholung：`04_Physik/Gleichfoermige-Bewegung-Training.md` (ggB Kette bereits dort，本篇只练 Diagramm plus Fehler)。
- Lehrplan Anker：`04_Physik/Lehrplan.md` Abschnitt 1 (Kinematik plus digitale Messdatenauswertung)。

## 6. Lernreise

- `Lernreise/Physik-Diagramme-L1.md`（待建，本篇为唯一课程源候选，只读消费）

## 7. Fehlerlog

- [ ] UEBUNG 1 bis 4 je mit Datum abhaken，Fehlertyp notieren (Achse / Einheit / Mittel-vs-Momentan / Fehlerurteil)。

## VERGLEICH: 对比/辨别实验 (interleaving + discrimination)

- A题（Mittelwert）：给总路程总时间求平均，含停留，公式 $v_{mittel} = s_{gesamt} / t_{gesamt}$。
- B题（Momentan）：给s-t曲线求某点切线斜率，公式 $v_{momentan} \approx \Delta s / \Delta t$。
- 二选程序（先选再做）：“这题用哪个？因为题干问全程所以选A，因为题干问某时刻所以选B。”
- 一句话区别（A vs B）：A除全程，B切一点，匀速段两者才相等。

## FEHLVORSTELLUNG: 常见误解 + 纠偏

- 误解1：s-t越陡越慢 → 纠偏：越陡越快，因为斜率即速度（正确：先读轴再判快慢）。
- 误解2：平均速度就是速度表读数 → 纠偏：表读数为瞬时，平均需总路程除总时间（正确：停留会拉低平均）。

## check / ANTWORT (TAP：题目格式 ≈ Klausur 格式)

- Aufgabe (Klausur-format, mit Operator)：Beschreibe die gegebene s-t-Punktreihe aus UEBUNG 1，berechne die Durchschnittsgeschwindigkeit mit Ansatz und Einheit，und beurteile，ob das Modell gleichfoermiger Bewegung trotz Pause haltbar ist。
- Antwort (合书先写)：
- KR（对/错）：
- Korrektur + 错因归类（辨别错 / 知识错 / 表达错）：重点查轴单位与 weil 句是否完整。

## TAKEAWAY: 1盒总结

> 斜率读速度，面积算路程，平均除全程，瞬时切一点，拟合只在误差内成立。`Die Steigung gibt v an, die Flaeche gibt s an.`

## REFLEXION: 2问 (一过程 + 一元认知)

1. 过程（assisted自解释）：这道题关键一步用了哪个规则？因为…所以…
2. 元认知：哪里最卡/最易混？因为…所以下次先…
