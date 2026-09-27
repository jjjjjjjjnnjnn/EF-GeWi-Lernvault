---
fach: Physik
thema: "Mechanische Energieerhaltung"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, begruenden, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Mechanik]
version: Lesson-v3
---

# Lernreise: Mechanische Energieerhaltung (L1, Ziel Klausur)

<!-- Campaign: Mars-Mission | Episode 8/28 | Krise: Sol-064 Funkschatten 11 Minuten hinter Olympus Mons | Zielgroessen: Rampe mit Hoehe h, Ziel Geschwindigkeit aus Energiebilanz | Tool: schiefe-ebene -->

## Schritt 1 — entdecken: Federbeine im Test
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能写出三种机械能——动能 E_kin = 0.5*m*v^2、重力势能 E_pot = m*g*h、弹性势能 E_spann = 0.5*D*s^2。
2. 中文：能对"无摩擦、只有重力或弹力做功"的过程列能量账，用 E_vor = E_nach 一步求出速度或高度。
3. 中文：能判断能量法是否适用（有无耗散），并用德语写出一句带条件的评价句。

### Hook / Phaenomen

山顶静止、山脚飞驰：重力势能一滴不剩变成动能，能量账本有借必有贷，守恒负责兜底，摩擦是唯一的税。

Hook / Phaenomen: Oben schnell nichts, unten alles Tempo: Die **Lageenergie** verwandelt sich restlos in **Bewegungsenergie**. Die **Energiebilanz** schreibt jede Umwandlung auf, die **Energieerhaltung** buergt fuer die Summe. Reibung ist der einzige Steuerdieb in dieser Bilanz.

`Klausur-Satz: Energie geht nicht verloren, sie wechselt nur das Konto: Lage plus Bewegung plus Spannung bleiben konstant.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 动能 — die kinetische Energie E_kin = 0.5*m*v^2 (J)：运动物体具有的能量，随速度平方增长。 Sie waechst quadratisch mit der Geschwindigkeit. Mechanismus: Halb m v Quadrat aus Masse und Tempo bilden. Klausur-Tipp: Quadrat nie vergessen, Einheit Joule pruefen.
- 重力势能 — die Lageenergie E_pot = m*g*h (J)：相对零势能面的高度能量，与高度成正比。 Sie zaehlt ab einem frei gewaehlten Nullniveau nach oben. Mechanismus: Masse mal g mal Hoehe ueber Nullniveau berechnen. Klausur-Tipp: Nullniveau in der ersten Zeile festlegen.
- 弹性势能 — die Spannenergie E_spann = 0.5*D*s^2 (J)：弹簧形变储存的能量，D 为劲度系数、s 为形变量。 Gespannte Federn und Seile speichern Arbeit als Spannung. Mechanismus: Halb D x Quadrat aus Haerte und Dehnung bilden. Klausur-Tipp: Dehnung ab Ruhelage messen.
- 能量守恒 — die Energieerhaltung：无耗散时 E_vor = E_nach，能量只转化不消失。 Anfangssumme gleich Endsumme plus eventuelle Reibungsarbeit. Mechanismus: Alle Energiekonten beidseitig aufstellen und gleichsetzen. Klausur-Tipp: Jedes Konto als eigenen Term zeigen.
- 耗散 — die Dissipation：摩擦把机械能转化为内能，能量账里必须扣掉这部分。 Im abgeschlossenen System bleibt die Gesamtsumme exakt konstant. Mechanismus: System abgrenzen und Erhaltungssatz als Gleichung schreiben. Klausur-Tipp: Abgeschlossenheit ausdruecklich feststellen.

`Klausur-Satz: Bei der Energiebilanz werden alle Energieformen vor und nach dem Vorgang aufgefuehrt; bei Reibung wird die dissipierte Energie abgezogen.`

## Schritt 3 — entdecken: Wirkungskette hinter Mechanische Energieerhaltung
ENTDECKEN（1概念 + 1文字图解）：

中文：能量法是一种"偷懒"的聪明办法——它不看过程的每一瞬间，只比较开始和结束两个状态。只要没有摩擦（或者说摩擦力不做功），机械能总量就守恒：开始时有多少重力势能加动能，结束时还是这么多，只不过换了个形式。规范写法叫"列能量账"：先选一个零势能面（通常取最低点），再把初态和末态的能量形式逐项写出来，令它们相等。比如滑块从高度 h 滑下，初态只有 m*g*h，末态只有 0.5*m*v^2，于是 m*g*h = 0.5*m*v^2，质量 m 约掉，得 v = sqrt(2*g*h)——一个不需要知道斜面角度、也不需要知道过程细节的结果。如果末端有弹簧，就把弹性势能 0.5*D*s^2 也写进末态。有摩擦时，在末态再减去摩擦耗散的那部分能量即可。

补充：功 W = F*s*cos(alpha) 是连接"受力"与"能量"两个视角的桥梁。合力做的总功等于动能的变化，即动能定理 W_ges = ΔE_kin；这条式子既能当能量法用，也能在需要时从受力视角反推，是两套方法之间的转换器。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
    oben:  v = 0,  h > 0
      E_pot = m*g*h      E_kin = 0
           |
           |  (Umwandlung, ohne Reibung)
           v
    unten: h = 0,  v > 0
      E_pot = 0          E_kin = 0.5*m*v^2

    Energiebilanz:  E_pot + E_kin = konstant
                    m*g*h = 0.5*m*v^2  =>  v = sqrt(2*g*h)

    mit Feder am Ende:  m*g*h = 0.5*D*s^2  =>  s = sqrt(2*m*g*h/D)
    mit Reibung:        E_vor = E_nach + W_Reibung
```

$$E = mgh+\frac{1}{2}mv^2 = \text{const}$$
`Klausur-Satz: Da beim reibungsfreien Herabgleiten die gesamte Lageenergie in Bewegungsenergie umgewandelt wird, gilt m*g*h = 0.5*m*v^2 und damit v = sqrt(2*g*h).`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Dass Energie weder erzeugt noch vernichtet, sondern nur umgewandelt wird, wurde nicht von einem einzigen Genie entdeckt: In den 1840er Jahren formulierten mehrere Forscher in verschiedenen Laendern diesen Satz fast gleichzeitig und unabhaengig voneinander — ein Arzt, ein Brauereibesitzer und ein Physiologe kamen auf dieselbe Idee. So entstand ein Naturgesetz, das heute zu den tragenden Saeulen der gesamten Physik gehoert.

**中文解读**: 能量守恒不是某一个人的专利，而是十九世纪四十年代多位学者各自独立提出的结论，说明它是从大量实验事实中"长"出来的规律，而非灵光一现。这正好印证本课：无论研究什么系统，只要无耗散，E_vor = E_nach 都成立。记住它是"多位发现者共同确认"的定律，你就更能体会它的普遍性。

**Bezug zum Konzept**: `Die Energieerhaltung wurde unabhaengig von mehreren Forschern gefunden, weil sie in sehr vielen Systemen gilt — genau darum ist E_vor = E_nach so universell.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Federbeine im Test
Kontinuitaet: Vorher Physik-Energieerhaltung-Mechanik-DE-L1.md | Nachher Physik-Federpendel-Harmonische-Schwingung-CN-L1.md. Krise dieser Episode: Sol-064 Funkschatten 11 Minuten hinter Olympus Mons. Zielgroessen: Rampe mit Hoehe h, Ziel Geschwindigkeit aus Energiebilanz

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: schiefe-ebene]

AUFGABE (berechnen, AFB II)：Ein Wagen der Masse m = 1,0 kg startet aus der Ruhe und rollt eine reibungsfreie Rampe der Höhe h = 0,80 m hinunter. Am Fuß der Rampe trifft er auf eine horizontale Feder mit der Federkonstante D = 100 N/m und staucht sie zusammen. Es gilt g = 10 m/s^2. Bestimmen Sie die Geschwindigkeit des Wagens am Fuß der Rampe sowie die maximale Zusammendrückung s der Feder.

HILFE:
1. Schritt 1: Stelle die Energiebilanz für die Rampe auf: m*g*h = 0.5*m*v^2.
2. Schritt 2: Löse nach v auf und setze die Zahlen ein.
3. Schritt 3: Für die Feder gilt am Umkehrpunkt m*g*h = 0.5*D*s^2; löse nach s auf.

MUSTERLÖSUNG: Auf der reibungsfreien Rampe wird die Lageenergie vollständig in Bewegungsenergie umgewandelt: m*g*h = 0.5*m*v^2. Die Masse kürzt sich heraus, sodass v = sqrt(2*g*h) = sqrt(2 * 10 m/s^2 * 0,80 m) = sqrt(16 m^2/s^2) = 4,0 m/s. Am Fuß der Rampe hat der Wagen also die Geschwindigkeit 4,0 m/s. Beim Stauchen der Feder geht die kinetische Energie vollständig in Spannenergie über; am Punkt maximaler Zusammendrückung gilt m*g*h = 0.5*D*s^2 (die Gesamtenergie bleibt dieselbe wie oben). Einsetzen ergibt 0.5 * 100 N/m * s^2 = 1,0 kg * 10 m/s^2 * 0,80 m = 8,0 J, also s^2 = 16,0 J / 100 N/m = 0,16 m^2 und damit s = 0,40 m. Gegenprobe über die Geschwindigkeit: 0.5 * 1,0 kg * (4,0 m/s)^2 = 8,0 J, was der Anfangsenergie entspricht.

`Klausur-Satz: Aus der Energieerhaltung folgt fuer den Wagen am Fuss der Rampe v = 4,0 m/s und fuer die maximale Federspannung s = 0,40 m.`

## Schritt 5 — ausprobieren: Duell der Verfahren Federbeine im Test
VERGLEICH辨别实验（双向辨析：能量眼 vs. 受力眼）：

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Wähle erst das Verfahren — 【选程序】先读题干问的是什么、力是否恒定、过程有几段：(i) Energieansatz（只问速度/高度/形变量，力变化或过程多段 → 用 E_vor = E_nach，跳过中间细节）oder (ii) Kraftansatz（要加速度、时间、方向或某处的内力 → 用 F_res = m*a 逐步追踪）—— dann lösen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Ein Ball wird aus der Ruhe an einem Faden der Länge L = 1,25 m hochgezogen und dann losgelassen; gesucht ist nur seine Geschwindigkeit am tiefsten Punkt. Welches Verfahren ist zu wählen, und warum?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Derselbe Ball soll zu einem bestimmten Zeitpunkt nach dem Loslassen betrachtet werden; gesucht ist die Zeit, bis er den tiefsten Punkt erreicht. Welches Verfahren ist zu wählen, und warum?

HILFE: A: Gefragt ist nur eine Geschwindigkeit, keine Zeit, kein Winkel nötig → Verfahren (i), Energiebilanz m*g*L = 0.5*m*v^2. B: Gefragt ist eine Zeit, die in der Energiegleichung gar nicht vorkommt → Verfahren (ii), Kraftansatz mit Beschleunigung und Kinematik.【选程序：问速度/高度走能量程序；问时间/加速度/内力走受力程序。】

ANTWORT: A erfordert Verfahren (i): Da nur die Geschwindigkeit am tiefsten Punkt gesucht ist und keine Reibung auftritt, genügt die Energiebilanz m*g*L = 0.5*m*v^2, also v = sqrt(2*g*L) = sqrt(2 * 10 m/s^2 * 1,25 m) = 5,0 m/s; der Fadenwinkel und der genaue Bahnverlauf sind dabei irrelevant. B erfordert Verfahren (ii): Die Energiegleichung enthält die Zeit überhaupt nicht, deshalb muss man über die Beschleunigung (hier a = g*sin(beta) längs der Bahn) und die Kinematik gehen, um die gesuchte Zeit zu bestimmen.

`Klausur-Satz: Fragt die Aufgabe nur nach einer Geschwindigkeit oder Hoehe, fuehrt der Energieansatz ohne Zeit und ohne Winkel zum Ziel; ist dagegen eine Zeit gesucht, muss der Kraftansatz verwendet werden.`

## Schritt 6 — check: Selbsttest zu Mechanische Energieerhaltung: Federbeine im Test
CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Unter welcher Bedingung gilt die mechanische Energieerhaltung? | ANTWORT: Wenn nur konservative Kraefte wie Gewichtskraft oder Federkraft wirken, also keine Reibung Energie entzieht.
- FRAGE: Wie lauten die drei Formeln der mechanischen Energieformen? | ANTWORT: E_kin = 0.5*m*v^2, E_pot = m*g*h und E_spann = 0.5*D*s^2.
- FRAGE: Warum faellt in v = sqrt(2*g*h) die Masse heraus? | ANTWORT: Weil die Masse sowohl in m*g*h als auch in 0.5*m*v^2 als Faktor steht und daher auf beiden Seiten gekuerzt werden kann.

`Klausur-Satz: Bei reibungsfreien Vorgaengen sind Anfangs- und Endenergie gleich, sodass die Masse oft herausfaellt und die Endgeschwindigkeit nur von der Hoehe abhaengt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"能量守恒就是能量凭空保持不变，跟过程没关系"。
   中文纠偏：守恒的前提是"没有耗散"。一旦有摩擦，机械能总量就减少，减少的部分变成了内能，绝不是消失。有摩擦时必须写 E_vor = E_nach + W_Reibung，否则能量账就是错的。
   Korrektur-Satz: `Die mechanische Energie bleibt nur ohne Reibung erhalten; bei Reibung wird ein Teil in innere Energie umgewandelt und muss in der Bilanz abgezogen werden.`

2. 误解"能量法能算出所有量，包括时间和加速度"。
   中文纠偏：能量方程里根本没有时间变量，所以它天然算不出时间、也算不出某一时刻的瞬时加速度。凡是题目问时间或问加速度，就得回到受力视角用 F_res = m*a 和运动学。
   Korrektur-Satz: `Die Energieerhaltung enthaelt keine Zeit und liefert daher keine Zeit- oder Beschleunigungswerte; diese erfordern den Kraftansatz.`

## Schritt 7 — szenario: Klausurtransfer: Mechanische Energieerhaltung: Federbeine im Test
ROLLE: Du bist Praktikumsbetreuerin im Physikpraktikum der EF und sollst eine Halfpipe-Analyse anleiten.
SITUATION: Ein Skateboarder (m = 60 kg) startet aus der Ruhe am Rand einer reibungsfreien Halfpipe mit der Höhe h = 1,8 m über dem tiefsten Punkt. Er soll ohne weitere Kraftanstrengung durch die Bahn fahren. Beurteile in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), welche Geschwindigkeit er am tiefsten Punkt erreicht und warum die Energiebetrachtung hier sinnvoller ist als eine Kraftbetrachtung. Nutze g = 10 m/s^2.
RUBRIC (30 XP): Aufstellen der Energiebilanz m*g*h = 0.5*m*v^2 mit gewaehlter Nullhoehe (5 XP) | Korrekte Berechnung v = sqrt(2*g*h) = 6,0 m/s mit Einheit (10 XP) | Begruendung der Unabhaengigkeit von der Masse (10 XP) | Kriteriengeleitetes Urteil zum Vorzug des Energieansatzes (veränderliche Kraftrichtung, keine Zeit gesucht) (5 XP).

`Klausur-Satz: Wer Energiebilanz aufstellt, Nullniveau waehlt, umstellt und Reibungsverluste diskutiert, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Federbeine im Test
TAKEAWAY 1盒（核心总结）：

中文：能量法只看"开头"和"结尾"，跳过中间所有细节，所以又快又稳。三件套记牢：动能 0.5*m*v^2、重力势能 m*g*h、弹性势能 0.5*D*s^2。列账四步：选零势能面、写初态、写末态、令相等（有摩擦就减耗散）。判断口诀：只问速度或高度、力还在变、过程有好几段，就用能量；一旦问时间、问加速度、问方向，就回到受力。记住，能量法不是万能钥匙，但它省下的计算量常常能救回整场考试的时间。
Takeaway-Satz: `Der Energieansatz vergleicht nur Anfangs- und Endzustand und kommt ohne Zeit und ohne Neigungswinkel aus, solange keine Reibung Energie entzieht.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Energiebilanz mit der Feder (Schritt 4) oder die Entscheidung zwischen Energie- und Kraftansatz im Vergleich (Schritt 5)?
2. 元认知计划：Beim nächsten Mal pruefe ich zuerst, ob nach einer Zeit gefragt wird und ob Reibung auftritt, bevor ich den Ansatz waehle.

`Klausur-Satz: Erhaltung heisst Buchhaltung: Wer alle Konten fuehrt, findet jeden Fehler selbst.`
