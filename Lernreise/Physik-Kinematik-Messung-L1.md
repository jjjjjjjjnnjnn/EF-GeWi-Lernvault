---
fach: Physik
thema: "Kinematik: Messung und Diagramme"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Kinematik]
version: Lesson-v3
---

# Lernreise: Kinematik: Messung und Diagramme (L1, Ziel Klausur)

<!-- Campaign: Mars-Mission | Episode 26/28 | Krise: Sol-131 Ionentriebwerk Schub nur 91 mN statt 120 mN | Zielgroessen: Messreihe s-t und v-t, Ziel Momentangeschwindigkeit | Tool: kinematik-lab -->

## Schritt 1 — entdecken: Training im Simulator
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能从一串测量数据判断运动类型——匀速的 s-t 点是直线，匀变速的 s-t 点是抛物线、而 v-t 点是斜直线。
2. 中文：能说出两张图的读法分工：s-t 图切线斜率读瞬时速度 v，v-t 图线下的面积算路程 s，v-t 图斜率读加速度 a。
3. 中文：能按"表→图→斜率/面积→单位"四步完整解一道带数字的题，并用德语写出 Ansatz 与结果句。

### Hook / Phaenomen

光栅咔哒、手机计时：一切位移时间的测量都落进图像里，s-t图读位置，v-t图面积读位移，瞬时与平均决定了探头和码表谁说了算。

Hook / Phaenomen: Lichtschranken klicken, das Handy stoppt: Jede **Messung** von Weg und Zeit endet in Diagrammen. Das **Weg-Zeit-Diagramm** zeigt Orte, das **Geschwindigkeit-Zeit-Diagramm** zeigt Flaechen als Wege. **Momentan gegen Mittel** entscheidet, ob Blitzer oder Tacho recht hat.

`Klausur-Satz: Kinematik liest Bewegung aus Diagrammen: Steigung gibt Tempo, Flaeche gibt Weg, Mittel gegen Momentan entscheidet Deutung.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 路程 — die Strecke s (m)：运动经过的总长度，s-t 图的纵轴量。 Seine Steigung ist die Geschwindigkeit in jedem Punkt. Mechanismus: Orte gegen Zeit auftragen und Steigung ablesen. Klausur-Tipp: Gerade Abschnitte als gleichfoermig deuten.
- 加速度 — die Beschleunigung a (m/s^2)：速度变化快慢，匀变速运动中恒定。 Sie misst die Tempowende pro Sekunde. Mechanismus: Delta v durch Delta t teilen. Klausur-Tipp: Vorzeichen als schneller oder langsamer deuten.
- 斜率 — die Steigung：图线的倾斜程度，s-t 图斜率即速度、v-t 图斜率即加速度。 Momentan gilt im Punkt, Mittel gilt ueber die Strecke. Mechanismus: Tangentensteigung gegen Sekantensteigung abgrenzen. Klausur-Tipp: Messverfahren zur Rate zuordnen.
- 曲线下面积 — die Flaeche unter der Linie：v-t 图线下方区域的面积，数值上等于路程。 Jede Messung traegt Reaktions- und Geraetefehler. Mechanismus: Mehrfach messen und Streuung angeben. Klausur-Tipp: Unsicherheit am Endergebnis ausweisen.
- 瞬时速度 — die Momentangeschwindigkeit v (m/s)：某一时刻的速度，等于该点 s-t 切线斜率。 Seine Flaeche ist der zurueckgelegte Weg. Mechanismus: Flaechen als Dreiecke und Rechtecke summieren. Klausur-Tipp: Flaeche stets mit Einheit Quadratmeter lesen.

`Klausur-Satz: Die Beschleunigung ist im v-t-Diagramm die Steigung der Geraden, im a-t-Diagramm dagegen die Hoehe der waagerechten Linie.`

## Schritt 3 — entdecken: Wirkungskette hinter Kinematik: Messung und Diagramme
ENTDECKEN（1概念 + 1文字图解）：

中文：运动学的全部信息都藏在两条曲线里。先看"谁是谁"：匀速运动的 s 随时间线性增长，所以 s-t 是一条直线；匀变速运动的 s 含 t 平方项，所以 s-t 是抛物线，而它的速度 v = a*t + v0 随时间线性变化，所以 v-t 反而是直线。读图要记住两句口诀：**s-t 读斜率**（该点切线越陡，瞬时速度越大），**v-t 读面积**（线下的三角形或矩形面积就是走过的路程）。最后 a-t 图更简单，一条水平线的高度就是加速度，它下方的面积就是速度增量。EF 考试里，题目通常给一串测量点或一张图，要求你先判断运动类型，再求 a 或 v 或 s——判断靠"点是否共线、共线的是直线还是抛物线"，计算靠"斜率或面积"。

补充：km/h 与 m/s 之间相差 3,6 倍——km/h 除以 3,6 得 m/s，m/s 乘以 3,6 得 km/h。计算时统一用 m/s 与 s，需要时最后一步再换回 km/h，并把换算这一步写出来，否则量纲比较会系统性偏 3,6 倍。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   s ^                         v ^
     |        .                |            /
     |      .                  |          /
     |    .    (Parabel)       |        /  (Gerade, Steigung = a)
     |  .                      |      /
     |.                        |    /
     +------------------> t    +--------------> t
      s-t: Steigung -> v        v-t: Flaeche -> s

   v-t-Flaeche (Trapez) = Weg:
     v ^
       |      ___________
       |     /           \
       |    /             \
       +------------------------> t
        |__A1__|___A2___|_A3_|   s = A1 + A2 + A3
```

$$s = \frac{1}{2}at^2+v_0t,\quad a = \frac{\Delta v}{\Delta t}$$
`Klausur-Satz: Eine gleichmaessig beschleunigte Bewegung erkennt man daran, dass die Messpunkte im s-t-Diagramm auf einer Parabel und im v-t-Diagramm auf einer steigenden Geraden liegen.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Die Einheit Meter wurde Ende des 18. Jahrhunderts ueber die Vermessung der Erde festgelegt: Sie sollte ein Zehnmillionstel der Strecke vom Nordpol zum Aequator sein. Spaeter definierte man sie ueber eine Metallstange, und heute ueber die Lichtgeschwindigkeit. Das zeigt: Selbst eine so grundlegende Groesse wie "ein Meter" ist eine menschliche Vereinbarung, die man immer genauer fassen konnte.

**中文解读**: 米最初被定义为从北极到赤道距离的一千万分之一，后来改用金属原器，今天则用光速定义——说明单位本身是人类约定的、可以不断精确化的。这正好对应本课里 km/h 与 m/s 的换算：两个单位描述的是同一个速度，只是约定不同。记住这点，换算时就不会被 3.6 这个数字吓到。

**Bezug zum Konzept**: `Einheiten wie Meter und km/h sind Vereinbarungen; die Umrechnung von km/h in m/s ist daher nur eine Frage der Definition, nicht der Physik.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Training im Simulator
Kontinuitaet: Vorher Physik-Kinematik-Messung-DE-L1.md | Nachher Physik-Newton-Dynamik-DE-L1.md. Krise dieser Episode: Sol-131 Ionentriebwerk Schub nur 91 mN statt 120 mN. Zielgroessen: Messreihe s-t und v-t, Ziel Momentangeschwindigkeit

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: kinematik-lab]

AUFGABE (berechnen, AFB II)：Bei einem Schulexperiment auf der Luftkissenbahn werden zu den Zeiten t = 0 s, 1 s, 2 s, 3 s und 4 s die Strecken s = 0 m; 0,50 m; 2,00 m; 4,50 m und 8,00 m gemessen. Prüfen Sie, ob eine gleichmäßig beschleunigte Bewegung vorliegt, und bestimmen Sie die Beschleunigung a sowie die Momentangeschwindigkeit bei t = 4 s.

HILFE:
1. Schritt 1: Prüfe mit dem Ansatz s = 0,5*a*t^2, ob a = 2s/t^2 für alle Messpunkte denselben Wert ergibt.
2. Schritt 2: Setze t = 4 s und s = 8,00 m ein, um a zu bestimmen.
3. Schritt 3: Für die Momentangeschwindigkeit nutze v = a*t (oder die Tangentensteigung im s-t-Diagramm).

MUSTERLÖSUNG: Testet man die Daten mit a = 2s/t^2, so ergibt sich für jeden Punkt derselbe Wert: 2*0,50/1^2 = 1,0; 2*2,00/2^2 = 1,0; 2*4,50/3^2 = 1,0; 2*8,00/4^2 = 1,0 (Einheit m/s^2). Da der Quotient konstant bleibt, liegen die s-t-Punkte auf einer Parabel und die Bewegung ist gleichmäßig beschleunigt mit a = 1,0 m/s^2. Die Momentangeschwindigkeit bei t = 4 s folgt aus v = a*t = 1,0 m/s^2 * 4 s = 4,0 m/s. Gegenprobe über das v-t-Diagramm: Die Gerade steigt linear von 0 auf 4,0 m/s, ihre Dreiecksfläche ist 0,5 * 4 s * 4,0 m/s = 8,0 m und stimmt mit der gemessenen Strecke überein.

`Klausur-Satz: Da der Quotient 2s/t^2 für alle Messpunkte konstant ist, liegt eine gleichmaessig beschleunigte Bewegung mit a = 1,0 m/s^2 vor, und die Endgeschwindigkeit betraegt v = 4,0 m/s.`

## Schritt 5 — ausprobieren: Duell der Verfahren Training im Simulator
VERGLEICH辨别实验（双向辨析：斜率眼 vs. 面积眼）：

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Wähle erst das Verfahren — 【选程序】先判断题目给的是哪张图、问的是哪个量：(i) s-t-Verfahren（纵轴是路程 s，问速度 → 读切线斜率 v = Δs/Δt）oder (ii) v-t-Verfahren（纵轴是速度 v，问路程 → 读线下面积 s = Flaeche）—— dann lösen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：In einem s-t-Diagramm steigt die Ausgleichsgerade eines Wagens gleichmäßig von s = 0 m bei t = 0 s auf s = 6,0 m bei t = 4,0 s. Welches Verfahren ist zu wählen, und wie groß ist die Geschwindigkeit?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：In einem v-t-Diagramm beschleunigt ein Fahrzeug von 0 s bis 4,0 s gleichmäßig von 0 m/s auf 8,0 m/s. Welches Verfahren ist zu wählen, und welchen Weg legt es zurück?

HILFE: A: Die Achse trägt s, gefragt ist v → Verfahren (i), Steigung lesen. B: Die Achse trägt v, gefragt ist s → Verfahren (ii), Dreiecksfläche berechnen.【选程序：纵轴是 s 就用斜率，纵轴是 v 就用面积；先看轴标签再动手。】

ANTWORT: A erfordert Verfahren (i): Die Geschwindigkeit ist die Steigung der s-t-Geraden, also v = Δs/Δt = (6,0 m - 0 m) / (4,0 s - 0 s) = 1,5 m/s. B erfordert Verfahren (ii): Der Weg ist die Fläche unter der v-t-Geraden, hier ein Dreieck mit s = 0,5 * 4,0 s * 8,0 m/s = 16 m. Die mittlere Geschwindigkeit wäre hier s/t = 16 m / 4,0 s = 4,0 m/s, also die Hälfte der Endgeschwindigkeit, wie es bei gleichmäßiger Beschleunigung aus der Ruhe sein muss.

`Klausur-Satz: Bei einer s-t-Geraden wird die Geschwindigkeit als Steigung gelesen, bei einer v-t-Geraden dagegen der Weg als Flaeche unter der Linie berechnet.`

## Schritt 6 — check: Selbsttest zu Kinematik: Messung und Diagramme: Training im Simulator
CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Woran erkennt man im s-t-Diagramm eine gleichmaessig beschleunigte Bewegung? | ANTWORT: Die Messpunkte liegen auf einer Parabel, weil der Weg mit dem Quadrat der Zeit waechst.
- FRAGE: Welche physikalische Groesse liefert die Flaeche unter der v-t-Linie? | ANTWORT: Die Flaeche unter der v-t-Linie ergibt den zurueckgelegten Weg s, bei einem Dreieck also s = 0,5 * t * v.
- FRAGE: Wie berechnet man die Momentangeschwindigkeit aus einer Messreihe? | ANTWORT: Als Steigung der Tangente an der betreffenden Stelle im s-t-Diagramm, naeherungsweise v = Δs/Δt mit zwei eng benachbarten Punkten.

`Klausur-Satz: Die Steigung im s-t-Diagramm und die Flaeche im v-t-Diagramm sind die beiden zentralen Auswerteschritte der Kinematik.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"s-t 图越陡，物体越慢"。
   中文纠偏：正好相反。s-t 图的斜率就是速度，线越陡说明单位时间内走过的路程越多，也就是越快。读图第一步永远是先圈轴标签，确认纵轴是 s 还是 v，再判断快慢。
   Korrektur-Satz: `Im s-t-Diagramm bedeutet eine groessere Steigung eine groessere Geschwindigkeit, weil die Steigung gerade die Geschwindigkeit angibt.`

2. 误解"v-t 图上，线的高度就是路程"。
   中文纠偏：线的高度是速度（单位 m/s），不是路程。路程要从面积里算，单位是 m。把"高度"和"面积"混为一谈，量纲立刻就不对了——m/s 乘上 s 才等于 m。
   Korrektur-Satz: `Im v-t-Diagramm gibt die Hoehe der Linie die Geschwindigkeit an, waehrend erst die Flaeche unter der Linie den Weg liefert.`

## Schritt 7 — szenario: Klausurtransfer: Kinematik: Messung und Diagramme: Training im Simulator
ROLLE: Du bist Tutorin für Physik in der EF und leitest eine Kleingruppe bei der Auswertung eines Fahrbahnexperiments.
SITUATION: Eine Mitschülerin hat eine Messreihe mit t in s und s in m aufgenommen, aber die Punkte streuen leicht um eine Kurve. Sie fragt dich, wie sie entscheiden soll, ob eine gleichförmige oder eine gleichmäßig beschleunigte Bewegung vorliegt, und wie sie daraus a und v bestimmt. Erkläre ihr das Vorgehen in einer zusammenhängenden Antwort (ca. 150 Wörter) unter Rückgriff auf s-t- und v-t-Diagramm.
RUBRIC (30 XP): Benennung des Prüfkriteriums — Gerade (gleichförmig) vs. Parabel (beschleunigt) (5 XP) | Test mit dem Ansatz s = 0,5*a*t^2 bzw. a = 2s/t^2 und Angabe des konstanten Werts (10 XP) | Bestimmung von v als Tangentensteigung bzw. über v = a*t (10 XP) | Sauberes Ergebnis mit Einheit und Gegenprobe über die v-t-Fläche (5 XP).

`Klausur-Satz: Wer Diagramme zeichnet, Steigung und Flaeche auswertet und Messunsicherheit diskutiert, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Training im Simulator
TAKEAWAY 1盒（核心总结）：

中文：运动学读图只有两句话——s-t 看斜率得速度，v-t 看面积得路程，v-t 看斜率得加速度。判断运动类型靠"点的形状"：直线是匀速，抛物线是匀变速。计算永远四步走：列已知求解、写 Ansatz、带单位算、回头用另一张图做检验。这样即使数字算错，步骤分和 Ansatz 分也拿得住。
Takeaway-Satz: `Die Steigung im s-t-Diagramm liefert v, die Flaeche im v-t-Diagramm liefert s — wer zuerst die Achsen liest, verwechselt die beiden Diagramme nie.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Prüfen der Messreihe mit a = 2s/t^2 (Schritt 4) oder die Wahl zwischen Steigung und Fläche im Vergleich (Schritt 5)?
2. 元认知计划：Beim nächsten Mal lese ich zuerst die Achsenbeschriftung mit Einheit und entscheide danach, ob ich eine Steigung oder eine Fläche auswerte.

`Klausur-Satz: Messen heisst abbilden: Jedes Diagramm ist eine Uebersetzung von Zeit in Form.`
