---
fach: Physik
thema: "Formelhandbuch Mechanik: dreisprachig und handgerechnet"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Formeln]
version: Lesson-v3
---

# Lernreise: Formelhandbuch Mechanik: dreisprachig und handgerechnet (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用三语默写 EF 力学六组核心公式，并说出每个字母的含义与单位。
2. 中文：能按"条件定公式、字母式先行、单位跟到底"的流程，用德语写出完整手算步骤。
3. 中文：能用一句德语评价结果的量级是否合理（与日常经验对照）。

Klausur-Satz: `Ohne Ansatz mit Formel und Einheit gibt es keine volle Punktzahl, denn bewertet wird der Weg, nicht nur die Zahl.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 速度 — die Geschwindigkeit v (m/s)：单位时间走过的路程，匀速时 v = s/t。
- 加速度 — die Beschleunigung a (m/s^2)：速度变化快慢，匀加速时 a = Δv/Δt。
- 力 — die Kraft F (N)：改变运动状态的原因，1 N = 1 kg*m/s^2，牛顿第二定律 F = m*a。
- 能量 — die Energie E (J)：做功的本领，1 J = 1 N*m，动能 0.5*m*v^2、势能 m*g*h。
- 动量 — der Impuls p (kg*m/s)：p = m*v，碰撞中无外冲量时守恒。

Klausur-Satz: `Jede Formel gilt nur unter ihrer Bedingung, daher wird zuerst die Bedingung geprueft und dann der Ansatz gewaehlt.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：公式手册不是一张"随便挑"的清单，而是一棵决策树——**条件选公式，公式出 Ansatz**。运动学里，匀速用 s = v*t，匀加速用 v = v0 + a*t、s = v0*t + 0.5*a*t^2，无时间公式 v^2 - v0^2 = 2*a*s 用来"消掉 t"。受力里，牛顿第二定律 F = m*a 是核心，重力 F_G = m*g、摩擦 F_R = mu*F_N、弹簧 F = D*s 是三个常用特例。能量里，动能 0.5*m*v^2、重力势能 m*g*h、弹性势能 0.5*D*s^2，无摩擦时三者之和守恒。动量 p = m*v，碰撞中 p_vor = p_nach。圆周运动里，线速度 v = omega*r，向心力 F_z = m*v^2/r 由真实合力提供。三语对照的意义在于：中文口诀帮你记逻辑，德语写步骤拿分，英语关键词帮你快速核对含义。记住一句话——**先写字母式，再代数字，最后带单位**，字母式正确本身就有步骤分。

补充：单位换算是公式题的高频失分点——1 N = 1 kg*m/s^2，1 J = 1 N*m = 1 kg*m^2/s^2，km/h 除以 3,6 得 m/s。先把所有量统一到国际单位制再代数，能避免大半的计算错误；结果需要时再换回题目要求的单位并写出换算步骤。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Frage an die Aufgabe
        |
        +-- nach Zeit / Richtung gefragt?  --> Kraftansatz  F = m*a
        |
        +-- reibungsfrei, nur v oder h?    --> Energie     E_pot + E_kin = const
        |
        +-- Stoss / Explosion?             --> Impuls      p_vor = p_nach
        |
        +-- Kreisbahn?                     --> Zentripetal F_z = m*v^2/r
        |
        +-- kein t bekannt?                 --> v^2 - v0^2 = 2*a*s

   Reihenfolge im Heft:
     1. Ansatz (Buchstabenformel)
     2. Einsetzen (Zahlen mit Einheiten)
     3. Ergebnis + Einheit + Urteil
```

Klausur-Satz: `Die Bedingung waehlt den Ansatz: reibungsfrei und ohne Zeitangabe fuehrt zur Energieerhaltung, eine Zeitfrage dagegen zum Kraftansatz F = m*a.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Ein teurer Fehler mit Einheiten ereignete sich 1999 bei der NASA: Zwei Teams rechneten mit unterschiedlichen Einheitensystemen — die einen in metrischen Einheiten, die anderen in angelsaechsischen — und die Werte wurden nicht umgerechnet. Dadurch ging die Sonde Mars Climate Orbiter verloren. Eine einzige fehlende Umrechnung kostete ein ganzes Raumfahrtprojekt.

**中文解读**: 1999 年 NASA 的火星气候轨道器因两个团队分别使用公制与英制、没有换算单位而坠毁——这正是本课"单位跟到底"的反面教材。公式本身没错，但单位一乱，结果就全错。记住这个案例，写答案时就会自觉检查 1 N = 1 kg·m/s²、km/h ÷ 3.6 这类换算。

**Bezug zum Konzept**: `Fehlende Einheitenumrechnung macht selbst eine korrekte Formel wertlos — die Einheitenpruefung ist daher kein Zusatz, sondern Pflicht.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen, AFB II)：Ein Pkw der Masse m = 1500 kg beschleunigt aus dem Stand gleichmäßig und erreicht nach t = 10 s die Geschwindigkeit v = 20 m/s. Berechnen Sie die Beschleunigung a, die beschleunigende Kraft F, den zurückgelegten Weg s und vergleichen Sie die verrichtete Arbeit W mit der kinetischen Energie E_kin. Prüfen Sie zum Schluss die Einheiten.

HILFE:
1. Schritt 1: Ansatz für die Beschleunigung: a = Δv/Δt = v/t (Start aus der Ruhe).
2. Schritt 2: Ansatz für die Kraft: F = m*a; Ansatz für den Weg: s = 0.5*a*t^2.
3. Schritt 3: Ansatz für die Arbeit W = F*s und für die Energie E_kin = 0.5*m*v^2, dann vergleichen und Einheiten prüfen.

MUSTERLÖSUNG: Zuerst die Beschleunigung: a = v/t = 20 m/s / 10 s = 2,0 m/s^2. Daraus folgt nach dem zweiten Newtonschen Gesetz die Kraft F = m*a = 1500 kg * 2,0 m/s^2 = 3000 N. Der Weg ergibt sich aus s = 0.5*a*t^2 = 0.5 * 2,0 m/s^2 * (10 s)^2 = 100 m. Die beschleunigende Arbeit ist W = F*s = 3000 N * 100 m = 300000 J = 300 kJ. Zur Kontrolle die kinetische Energie: E_kin = 0.5*m*v^2 = 0.5 * 1500 kg * (20 m/s)^2 = 300000 J = 300 kJ. Beide Werte stimmen überein, was nach dem Arbeit-Energie-Zusammenhang W = ΔE_kin zu erwarten war. Einheitenprüfung: [a] = m/s^2, [F] = kg*m/s^2 = N, [s] = m, [W] = N*m = J — alle Einheiten passen, und die Größenordnung (300 kJ für eine Pkw-Beschleunigung) ist plausibel.

Klausur-Satz: `Mit a = 2,0 m/s^2 und F = 3000 N ergibt sich fuer den Pkw ein Weg von 100 m, und die Arbeit W = 300 kJ entspricht genau der kinetischen Energie.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：能量眼 vs. 动量眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先读题干里的关键词：(i) Energieverfahren（关键词"光滑、无摩擦、下滑、抛起"，一个物体在不同位置的能量转换，问速度或高度 → E_pot + E_kin = const）oder (ii) Impulsverfahren（关键词"碰撞、相撞、爆炸、反冲"，多个物体相互作用前后，问碰后速度 → p_vor = p_nach）—— dann lösen.

AUFGABE A：Ein Wagen rollt reibungsfrei eine Rampe hinunter; gefragt ist seine Geschwindigkeit am Fuß der Rampe. Welches Verfahren ist zu wählen, und warum?

AUFGABE B：Zwei Wagen stoßen auf einer horizontalen, reibungsfreien Bahn zusammen und bleiben nach dem Stoß zusammen; gefragt ist ihre gemeinsame Geschwindigkeit nach dem Stoß. Welches Verfahren ist zu wählen, und warum?

HILFE: A: "reibungsfrei, hinunterrollen, Geschwindigkeit gefragt" → Verfahren (i), Energieerhaltung. B: "zusammenstoßen, gemeinsame Geschwindigkeit gefragt" → Verfahren (ii), Impulserhaltung.【选程序：一个物体的位置能量转换走能量程序；两个物体相互作用前后走动量程序。】

ANTWORT: A erfordert Verfahren (i): Da keine Reibung wirkt und nur die Geschwindigkeit am Fuß der Rampe gesucht ist, gilt die Energieerhaltung m*g*h = 0.5*m*v^2, also v = sqrt(2*g*h); der Energieansatz verknüpft nur Anfangs- und Endzustand des einen Wagens. B erfordert Verfahren (ii): Beim Zusammenstoß wirken nur innere Kräfte, der Gesamtimpuls bleibt erhalten; mit p_vor = p_nach gilt m1*v1 + m2*v2 = (m1 + m2)*v', woraus sich die gemeinsame Geschwindigkeit v' ergibt.

Klausur-Satz: `Die Energieerhaltung verfolgt einen Koerper ueber verschiedene Positionen, waehrend die Impulserhaltung den Gesamtimpuls mehrerer Koerper vor und nach einem Stoss vergleicht.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die zeitfreie Gleichung der gleichmaessig beschleunigten Bewegung? | ANTWORT: v^2 - v0^2 = 2*a*s, sie verknuepft Geschwindigkeiten und Weg ohne die Zeit.
FRAGE: Welche drei Formeln beschreiben die mechanischen Energieformen? | ANTWORT: E_kin = 0.5*m*v^2, E_pot = m*g*h und E_spann = 0.5*D*s^2.
FRAGE: Wann gilt die Impulserhaltung bei einem Stoss? | ANTWORT: Wenn keine aeusseren Kraefte wirken, sodass der Gesamtimpuls vor und nach dem Stoss gleich bleibt.

Klausur-Satz: `Jede Formel wird zuerst in Buchstabenform angeschrieben, dann mit Einheiten gefuellt und erst zuletzt als Zahl notiert.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"公式背得越多越好，看到题就往上套"。
   中文纠偏：公式必须"条件匹配"才有效。把 m*g*h = 0.5*m*v^2 用在有摩擦的斜面上，就漏掉了摩擦耗散项，答案必然偏大。正确顺序是先写已知未知、判断条件，再选一个 Ansatz；Ansatz 错了，后面全错。
   Korrektur-Satz: `Eine Formel gilt nur unter ihrer Bedingung; wird die Reibung ignoriert, fehlt in der Energiebilanz ein Term und das Ergebnis wird falsch.`

2. 误解"只要单位对，答案就一定对"。
   中文纠偏：量纲正确只是必要条件，不是充分条件。系数写错、条件判断错，单位依然可能对（例如把 0.5*a*t^2 误写成 a*t^2，单位一样是 m，但数值差一倍）。所以单位检验之后还要回题干核对条件和数量级。
   Korrektur-Satz: `Die Dimensionsprobe ist nur eine notwendige Bedingung; erst der Vergleich mit Bedingung und Groessenordnung sichert das Ergebnis.`

## Schritt 7 — szenario

ROLLE: Du bist Lerncoach und bereitest eine Mitschülerin auf die Formelaufgaben der Physik-Klausur vor.
SITUATION: Die Mitschülerin kennt viele Formeln, verwechselt aber ständig, wann sie welche einsetzen soll, und schreibt oft nur das Ergebnis ohne Ansatz. Erkläre ihr in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), wie man mit einer Entscheidungshilfe die richtige Formel wählt und wie ein vollständiger Lösungsweg aussieht, damit sie die Schrittpunkte erhält.
RUBRIC (30 XP): Darstellung der Entscheidungsregel (Bedingung waehlt Ansatz) mit mindestens zwei Beispielen (10 XP) | Erklaerung des dreischrittigen Loesungswegs Ansatz-Einsetzen-Ergebnis (10 XP) | Hinweis auf Einheiten und Groessenordnung als Kontrolle (5 XP) | Nachvollziehbare, adressatengerechte Sprache mit Fachbegriffen (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：公式手册要当决策树用，不能当清单用。口诀是"条件定公式、字母式先行、单位跟到底、量级做检验"。六组公式各有一个"触发词"：匀速看 s = v*t，匀加速看 v = v0 + a*t 与 s 的平方项，受力看 F = m*a，能量看"无摩擦"三字，动量看"碰撞"两字，圆周看"向心力由谁提供"。中文记逻辑、德语写步骤、英语核含义，三语一起练，考场就不会只写出一个孤零零的数字。
Takeaway-Satz: `Bedingung waehlt den Ansatz, Buchstabenform vor Zahlen, Einheit und Groessenordnung als Kontrolle — so wird aus einer Formel eine volle Punktzahl.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Auswendigschreiben der sechs Formelgruppen (Schritt 2) oder die Auswahl der richtigen Formel im Vergleich (Schritt 5)?
2. 元认知计划：Beim nächsten Mal notiere ich zuerst die Bedingung (Reibung? Zeit gefragt?) und waehle erst danach die Formel aus.
