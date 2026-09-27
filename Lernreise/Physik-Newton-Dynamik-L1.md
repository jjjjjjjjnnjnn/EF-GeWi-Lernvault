---
fach: Physik
thema: "Newtonsche Gesetze: Kraftzerlegung und Reibung"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden, analysieren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Dynamik]
version: Lesson-v3
---

# Lernreise: Newtonsche Gesetze: Kraftzerlegung und Reibung (L1, Ziel Klausur)

<!-- Campaign: Mars-Mission | Episode 28/28 | Krise: Sol-137 Finale Kopplung: Andockring-Toleranz 4 cm | Zielgroessen: Masse 4,0 kg auf Rampe mit Reibung, Ziel Beschleunigung | Tool: schiefe-ebene -->

## Schritt 1 — entdecken: Generalprobe vor dem Fenster
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清牛顿第二定律的核心——合力 F_res = m*a，力是产生加速度的原因，不是维持速度的原因。
2. 中文：能在斜面上把重力正确分解成下滑力 F_H = m*g*sin(alpha) 与正压力 F_N = m*g*cos(alpha)，并写出含摩擦的合力式。
3. 中文：能判断物体是"平衡（a = 0，合力为零）"还是"加速（合力不为零）"，并据此选对程序列式。

### Hook / Phaenomen

冰面斜坡绳索：各方向的力乱成一团，只有合力说了算，分解先分出下滑与法向，牛二把合力变成加速度，摩擦拖后腿，平衡原地待命。

Hook / Phaenomen: Eis, Rampe, Seil: Kraefte ziehen aus allen Richtungen, doch nur die Summe zaehlt. Die **Kraeftezerlegung** sortiert in Hang und Normale, das **zweite Axiom** verwandelt Summe in Beschleunigung. **Reibung** bremst, **Gleichgewicht** steht still.

`Klausur-Satz: Newton II verwandelt Kraefte in Bewegung: Resultierende Kraft gleich Masse mal Beschleunigung nach Zerlegung und Reibungsabzug.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 合力 — die resultierende Kraft F_res (N)：所有力的矢量和，决定加速度的大小与方向。 Jede Kraft wird in Hang- und Normalanteil entlang der Flaeche aufgeteilt. Mechanismus: Kraft per Sinus und Kosinus in Komponenten teilen. Klausur-Tipp: Winkel an der Skizze nachweisen.
- 重力 — die Gewichtskraft F_G = m*g (N)：竖直向下，是斜面上一切分解的来源。 Resultierende Kraft gleich Masse mal Beschleunigung in Kraftrichtung. Mechanismus: Kraeftesumme bilden und durch Masse teilen. Klausur-Tipp: Resultierende vor dem Teilen einkreisen.
- 下滑力 — die Hangabtriebskraft F_H = m*g*sin(alpha) (N)：沿斜面向下的分量。 Verschwindende Summe bedeutet Ruhe oder gleichfoermige Fahrt. Mechanismus: Alle Kraefte zu null summieren. Klausur-Tipp: Gleichgewicht als Sonderfall kennzeichnen.
- 正压力 — die Normalkraft F_N = m*g*cos(alpha) (N)：垂直压向斜面的分量，决定摩擦力大小。 Steigung und Flaeche uebersetzen die Kraftwirkung in lesbare Bewegung. Mechanismus: Beschleunigung in Diagrammform uebertragen. Klausur-Tipp: Diagrammart zur Frage zuordnen.
- 摩擦力 — die Reibungskraft F_R = mu*F_N (N)：方向与相对运动相反，mu 为摩擦系数。 Sie wirkt stets gegen die Bewegung und frisst einen Anteil der Hang Kraft. Mechanismus: My mal Normalkraft als Reibungskraft abziehen. Klausur-Tipp: Haft gegen Gleit als Fallunterscheidung nennen.

`Klausur-Satz: Die Gewichtskraft wird an der schiefen Ebene in die Hangabtriebskraft und die Normalkraft zerlegt, wobei F_H = m*g*sin(alpha) und F_N = m*g*cos(alpha) gilt.`

## Schritt 3 — entdecken: Wirkungskette hinter Newtonsche Gesetze: Kraftzerlegung und Reibung
ENTDECKEN（1概念 + 1文字图解）：

中文：动力学只回答一个问题——"为什么这样动"。答案是：合力决定加速度，加速度改变速度。做题先画受力图，顺序固定为"重力→弹力（支持力/拉力）→摩擦力→外加力"，一个箭头都不能多、也不能少。在斜面上，重力必须沿"平行斜面"和"垂直斜面"两个方向分解：平行的分量 F_H = m*g*sin(alpha) 想把物体往下拽，垂直的分量 F_N = m*g*cos(alpha) 压住斜面、并通过摩擦系数决定摩擦力 F_R = mu*F_N。把沿运动方向的力相加得合力，再除以质量就是加速度 a = F_res/m。一个漂亮的结论是：在无摩擦斜面上，a = g*sin(alpha)，与质量完全无关。若合力为零，物体处于平衡，加速度为零，这就是第一定律的情形。

补充：牛顿第三定律（Actio = Reactio）说的是两物体之间的作用力与反作用力大小相等、方向相反、作用在不同物体上。它不能和"二力平衡"混用——一对反作用力分别作用在两个物体上，而一对平衡力作用在同一物体上；受力图上如果只研究一个物体，就不要把它的反作用力也画进来。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
      F_N  ^  (senkrecht zur Ebene)
           |
   F_R <--[Block]--> F_H   (F_H parallel, hangabwaerts)
           |
           v  F_G = m*g   (senkrecht nach unten)

   Zerlegung an der schiefen Ebene:
     F_H = m*g*sin(alpha)    (parallel, hangabwaerts)
     F_N = m*g*cos(alpha)    (senkrecht in die Ebene)
     F_R = mu*F_N            (Gleitreibung, der Bewegung entgegen)

   Bewegungsgleichung:  F_res = F_H - F_R = m*a
                        a = g*(sin(alpha) - mu*cos(alpha))
```

$$F_{\text{res}} = ma,\quad F_R = \mu F_N$$
`Klausur-Satz: Die resultierende Kraft laengs der schiefen Ebene ist F_res = m*g*sin(alpha) - mu*m*g*cos(alpha), woraus a = g*(sin(alpha) - mu*cos(alpha)) folgt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Auf dem Mond liess der Astronaut David Scott 1971 eine Feder und einen Hammer gleichzeitig aus gleicher Hoehe fallen — und beide erreichten den Boden im selben Moment. Da der Mond keine Atmosphaere hat, wirkte keine Luftreibung, und man sah direkt: Die Fallbeschleunigung haengt nicht von der Masse ab. Genau deshalb kuerzt sich m in a = g*sin(alpha) heraus.

**中文解读**: 1971 年阿波罗 15 号的宇航员在月球上同时丢下锤子和羽毛，二者同时落地——因为月球没有空气阻力，直观证明了自由落体加速度与质量无关。这正是本课的关键结论：斜面上 a = g·sin(alpha)，质量被约掉。记住这个实验，你就明白了为什么"重的东西不一定落得快"。

**Bezug zum Konzept**: `Da die Fallbeschleunigung nicht von der Masse abhaengt, kuerzt sich m in F_res = m*a heraus — genau das zeigte der Hammer-Feder-Versuch auf dem Mond.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Generalprobe vor dem Fenster
Kontinuitaet: Vorher Physik-Newton-Dynamik-DE-L1.md | Nachher Physik-CN-Training-DE-L1.md. Krise dieser Episode: Sol-137 Finale Kopplung: Andockring-Toleranz 4 cm. Zielgroessen: Masse 4,0 kg auf Rampe mit Reibung, Ziel Beschleunigung

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: schiefe-ebene]

AUFGABE (berechnen, AFB II)：Ein Kasten der Masse m = 4,0 kg rutscht aus der Ruhe eine schiefe Ebene mit dem Neigungswinkel alpha = 30 Grad hinab. Der Gleitreibungskoeffizient beträgt mu = 0,20, es gilt g = 10 m/s^2, sin(30 Grad) = 0,50 und cos(30 Grad) = 0,87. Berechnen Sie die Beschleunigung a des Kastens und die Geschwindigkeit, die er nach s = 2,0 m zurückgelegter Strecke erreicht.

HILFE:
1. Schritt 1: Zerlege die Gewichtskraft: F_H = m*g*sin(alpha), F_N = m*g*cos(alpha).
2. Schritt 2: Bestimme die Reibung F_R = mu*F_N und daraus die resultierende Kraft F_res = F_H - F_R.
3. Schritt 3: Aus a = F_res/m die Beschleunigung, dann aus v^2 = 2*a*s die Endgeschwindigkeit.

MUSTERLÖSUNG: Zuerst die Gewichtskraft: F_G = m*g = 4,0 kg * 10 m/s^2 = 40 N. Ihre Zerlegung ergibt F_H = 40 N * 0,50 = 20 N (hangabwärts) und F_N = 40 N * 0,87 = 34,8 N (in die Ebene). Die Gleitreibung beträgt F_R = mu*F_N = 0,20 * 34,8 N = 6,96 N, sie wirkt der Bewegung entgegen. Damit ist F_res = F_H - F_R = 20 N - 6,96 N = 13,04 N, und die Beschleunigung folgt zu a = F_res/m = 13,04 N / 4,0 kg = 3,26 m/s^2, gerundet 3,3 m/s^2. (Kontrolle über die Formel: a = g*(sin(alpha) - mu*cos(alpha)) = 10 m/s^2 * (0,50 - 0,20*0,87) = 3,26 m/s^2.) Nach s = 2,0 m gilt v^2 = 2*a*s = 2 * 3,26 m/s^2 * 2,0 m = 13,04 m^2/s^2, also v = 3,6 m/s.

`Klausur-Satz: Mit der Zerlegung der Gewichtskraft und der Gleitreibung ergibt sich fuer den Kasten eine Beschleunigung von etwa 3,3 m/s^2 und nach 2,0 m eine Geschwindigkeit von etwa 3,6 m/s.`

## Schritt 5 — ausprobieren: Duell der Verfahren Generalprobe vor dem Fenster
VERGLEICH辨别实验（双向辨析：平衡眼 vs. 加速眼）：

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Wähle erst das Verfahren — 【选程序】先判断物体的加速度是否为零：(i) Gleichgewichts-Verfahren（a = 0, also F_res = 0；问的是静止、匀速或保持不动所需的力）oder (ii) Aktions-Verfahren（a ungleich 0, also F_res = m*a；问的是加速度、速度或时间）—— dann lösen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Ein Kasten liegt auf einer schiefen Ebene mit dem Winkel alpha = 20 Grad. Der Haftreibungskoeffizient ist so groß, dass der Kasten trotz der Hangabtriebskraft in Ruhe bleibt. Welches Verfahren ist zu wählen, und welche Aussage gilt für die Kräfte?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Derselbe Kasten wird nun auf eine steilere, glattere Ebene gelegt, sodass er sichtbar beschleunigt hinabrutscht. Welches Verfahren ist zu wählen, und wie lautet der Ansatz?

HILFE: A: Der Kasten bleibt in Ruhe, also a = 0 → Verfahren (i), Kräftegleichgewicht F_res = 0 (Haftreibung hebt die Hangabtriebskraft auf). B: Der Kasten rutscht beschleunigt, also a ungleich 0 → Verfahren (ii), Ansatz F_H - F_R = m*a.【选程序：题说"静止/匀速/不动"走平衡程序；题说"加速/越来越快"走第二定律程序。】

ANTWORT: A erfordert Verfahren (i): Bei a = 0 gilt Kräftegleichgewicht längs der Ebene, das heißt die Haftreibung F_R,h ist gerade so groß wie die Hangabtriebskraft F_H = m*g*sin(20 Grad), sodass F_res = 0 und der Kasten in Ruhe bleibt. B erfordert Verfahren (ii): Jetzt übersteigt die Hangabtriebskraft die Gleitreibung, es gilt F_res = m*g*sin(alpha) - mu*m*g*cos(alpha) = m*a, und daraus folgt die Beschleunigung a = g*(sin(alpha) - mu*cos(alpha)) unabhängig von der Masse.

`Klausur-Satz: Solange die Haftreibung die Hangabtriebskraft ausgleicht, gilt a = 0 und Kraeftegleichgewicht; uebersteigt die Hangabtriebskraft die Gleitreibung, beschleunigt der Koerper nach F_res = m*a.`

## Schritt 6 — check: Selbsttest zu Newtonsche Gesetze: Kraftzerlegung und Reibung: Generalprobe vor dem Fenster
CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Wie lautet das zweite Newtonsche Gesetz als Gleichung? | ANTWORT: F_res = m*a, die resultierende Kraft ist gleich Masse mal Beschleunigung.
- FRAGE: Warum ist die Beschleunigung auf einer reibungsfreien schiefen Ebene unabhaengig von der Masse? | ANTWORT: Weil sich die Masse in F_H = m*g*sin(alpha) und in F_res = m*a herauskuerzt, sodass a = g*sin(alpha) gilt.
- FRAGE: Wie zerlegt man die Gewichtskraft an der schiefen Ebene? | ANTWORT: In die Hangabtriebskraft F_H = m*g*sin(alpha) parallel zur Ebene und die Normalkraft F_N = m*g*cos(alpha) senkrecht zur Ebene.

`Klausur-Satz: Da sich die Masse beim Einsetzen in F_res = m*a herauskuerzt, ist die Beschleunigung an der reibungsfreien schiefen Ebene allein durch den Neigungswinkel bestimmt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"力是维持运动的原因，没有力物体就会停下来"。
   中文纠偏：这是亚里士多德式的直觉，不是物理。力改变的是运动状态（产生加速度），不是维持速度。桌面上滑块停下不是因为"没有力了"，而是因为有摩擦力在做反向的合力，使 a 与运动方向相反。
   Korrektur-Satz: `Eine Kraft aendert die Geschwindigkeit, sie erhaelt sie nicht: Ohne resultierende Kraft bewegt sich ein Koerper gleichfoermig geradeaus weiter.`

2. 误解"正压力 F_N 永远等于重力 F_G = m*g"。
   中文纠偏：只在水平面上才相等。在斜面上 F_N = m*g*cos(alpha)，恒小于重力；斜面越陡，正压力越小，摩擦力也越小。把 F_N 直接写成 m*g 会连带把摩擦力算大。
   Korrektur-Satz: `An der schiefen Ebene gilt F_N = m*g*cos(alpha), denn nur ein Teil der Gewichtskraft wirkt senkrecht auf die Unterlage.`

## Schritt 7 — szenario: Klausurtransfer: Newtonsche Gesetze: Kraftzerlegung und Reibung: Generalprobe vor dem Fenster
ROLLE: Du bist Mitglied einer Schülerforschungsgruppe, die einen Rampenversuch für den Tag der offenen Tür plant.
SITUATION: Auf einer Rampe mit dem Neigungswinkel alpha = 25 Grad soll ein Kasten (m = 3,0 kg) kontrolliert hinabgleiten. Die Gruppe diskutiert, ob eine bestimmte Oberfläche geeignet ist: Bei zu großer Reibung rutscht der Kasten nicht an, bei zu kleiner Reibung wird er zu schnell. Beurteile in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), wovon die Beschleunigung abhängt und wie die Reibung das Ergebnis beeinflusst. Nutze g = 10 m/s^2.
RUBRIC (30 XP): Benennung der zerlegten Kräfte F_H und F_N mit Formel (5 XP) | Aufstellen der Bewegungsgleichung F_res = F_H - F_R = m*a (10 XP) | Nachweis, dass a unabhaengig von der Masse ist, und Rechnung mit Zahlen (10 XP) | Kriteriengeleitetes Urteil zur Eignung der Oberflaeche mit Einheit (5 XP).

`Klausur-Satz: Wer zerlegt, bilanziert, Axiom anwendet und s-t- sowie v-t-Deutung liefert, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Generalprobe vor dem Fenster
TAKEAWAY 1盒（核心总结）：

中文：动力学的全部套路就三步——画受力图（重弹摩外，不多不少）、沿运动方向求合力、用 F_res = m*a 得加速度。斜面上记牢两个分解式：平行分量 m*g*sin(alpha)，垂直分量 m*g*cos(alpha)，后者决定摩擦。做题前先问一句"a 是不是零"：是零就写平衡，不是零就写第二定律。质量常常在最后一步被约掉，这不是巧合，而是斜面问题的标志性结论。
Takeaway-Satz: `Zuerst das Kraeftediagramm, dann die resultierende Kraft, dann a = F_res/m — an der schiefen Ebene zerlegt man die Gewichtskraft in m*g*sin(alpha) und m*g*cos(alpha).`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Kraeftezerlegung mit Sinus und Kosinus (Schritt 4) oder die Entscheidung zwischen Gleichgewicht und Aktionsprinzip im Vergleich (Schritt 5)?
2. 元认知计划：Beim nächsten Mal zeichne ich zuerst das Kraeftediagramm und pruefe, ob die Beschleunigung null ist, bevor ich eine Gleichung aufstelle.

`Klausur-Satz: Kraefte sind Vektoren mit Willen: Erst zerlegen, dann summieren, dann erst bewegen.`
