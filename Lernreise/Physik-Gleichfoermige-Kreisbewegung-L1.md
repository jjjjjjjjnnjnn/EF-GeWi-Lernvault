---
fach: Physik
thema: "Gleichfoermige Kreisbewegung"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, erklaeren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, Mechanik]
version: Lesson-v3
---

# Lernreise: Gleichfoermige Kreisbewegung (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清匀速圆周运动的核心矛盾——速率大小不变、速度方向时刻改变，因此一定存在指向圆心的加速度和向心力。
2. 中文：能写出并运用三个公式 v = 2πr/T、ω = 2πf、F_Z = m v^2/r，在弯道、转盘类题目中算出速度、角速度与向心力。
3. 中文：能用德语标准结论句解释弯道侧翻或打滑的原因，并指出真正存在的力是指向圆心的向心力（AFB II）。

Klausur-Satz: `Bei der gleichfoermigen Kreisbewegung bleibt der Betrag der Geschwindigkeit konstant, die Richtung aendert sich jedoch staendig, sodass eine zum Mittelpunkt gerichtete Zentripetalkraft erforderlich ist.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 匀速圆周运动 — Gleichfoermige Kreisbewegung：速率大小不变、沿圆周运行的运动，方向持续改变。
- 周期 — Umlaufdauer T：转一整圈所需的时间，单位为秒，频率 f = 1/T。
- 角速度 — Winkelgeschwindigkeit ω：单位时间转过的角度，ω = 2πf = 2πr / (rT)。
- 线速度 — Bahngeschwindigkeit v：沿切线方向的瞬时速度，v = 2πr/T = ωr。
- 向心力 — Zentripetalkraft F_Z：指向圆心的合力，F_Z = m v^2/r = m ω^2 r。

Klausur-Satz: `Die Bahngeschwindigkeit zeigt tangential zur Kreisbahn, die Zentripetalkraft zeigt radial zum Mittelpunkt.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：匀速圆周运动最容易误判的地方是"匀速"二字——它只保证速率表盘不动，不保证方向不动。方向一转就需要力，而能让物体一直拐弯不飞走的力，只能指向圆心，这就是向心力 F_Z。它不是多出来的新力，而是静摩擦、拉力、重力分量等在径向上的合力效果。速率由圈长除以周期决定 v = 2πr/T，转得越快则单位时间转角越大 ω = 2πf，需要的向心力随速度平方增长 F_Z = m v^2/r。弯道上车速翻倍，需要的侧向摩擦变为四倍，一旦超过最大静摩擦，车就向外打滑——看似被甩出去，实则是向心力不够、惯性让车走直线。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
              ^ v (tangential)
              |
         -----+------>
        /     |      \
       /      |       \
      /       |r       \   <-- Kreisbahn von oben (Draufsicht)
     |        o-------->|
     |     Mittelpunkt  \
      \      ^          /
       \     | F_Z      /
        \    | radial  /
         \---+---/
              v
   Legende: r = Radius, v = tangential, F_Z = radial zum Zentrum
   Formeln: v = 2πr/T, ω = 2πf, F_Z = m v^2/r
```

Klausur-Satz: `Die Zentripetalkraft F_Z = m v^2/r wirkt radial zum Mittelpunkt und wird durch die reale Radialkomponente der Kraefte aufgebracht.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Rennfahrer sprechen in Kurven vom Sehen des Scheitelpunkts und vom Kampf mit der Fliehkraft, doch in der Physik existiert diese Fliehkraft im Inertialsystem gar nicht. Was man im Auto nach aussen spuert, ist die eigene Traegheit: Der Koerper will geradeaus weiterfahren, waehrend das Auto durch Reibung nach innen gezwungen wird. Darum kippt ein zu schneller LKW in der Kurve nicht wegen einer geheimnisvollen Kraft nach aussen, sondern weil die noetige Zentripetalkraft fehlt.

**中文解读**: 弯道里感觉到的"外甩"并不是真实的力，而是惯性想走直线、车被摩擦拽向圆心的反差。物理只在惯性系里承认指向圆心的向心力，离心力只是随车一起转的视角里的错觉。车速翻倍、向心力需求变四倍，就是侧翻公式的直觉来源。

**Bezug zum Konzept**: `Was als Fliehkraft nach aussen gefuehlt wird, ist Traegheit; physikalisch real ist nur die Zentripetalkraft nach innen.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen, AFB II)：Ein Auto der Masse m = 1200 kg durchfaehrt eine flache Kurve mit Radius r = 50 m und Umlaufdauer T = 12 s fuer einen vollen Kreis. Berechnen Sie v, ω und die erforderliche Zentripetalkraft F_Z und erklaeren Sie, was bei doppelter Geschwindigkeit geschieht.

HILFE:
1. Schritt 1: Umfang berechnen U = 2πr, dann v = U/T einsetzen.
2. Schritt 2: Frequenz f = 1/T bestimmen, dann ω = 2πf berechnen, alternativ ω = v/r nutzen.
3. Schritt 3: F_Z = m v^2/r einsetzen; danach v verdoppeln und zeigen, dass F_Z sich vervierfacht, weil v quadratisch eingeht.

MUSTERLOESUNG: Es gilt U = 2πr = 2π mal 50 m = 314 m, also v = 314 m / 12 s = 26.2 m/s. Die Frequenz betraegt f = 1/12 s = 0.0833 1/s, also ω = 2πf = 0.524 1/s, Kontrolle: ω = v/r = 26.2/50 = 0.524 1/s. Die Zentripetalkraft betraegt F_Z = m v^2/r = 1200 mal (26.2)^2 / 50 = 1200 mal 686 / 50 = 16470 N. Bei doppelter Geschwindigkeit gilt F_Z neu = m (2v)^2/r = 4 m v^2/r, also das Vierfache. In der Kurve muss die Haftreibung diese Radialkraft liefern; reicht sie nicht, so folgt das Auto der Traegheit tangential nach aussen und rutscht.

Klausur-Satz: `Mit v = 2πr/T und F_Z = m v^2/r folgt, dass eine Verdopplung von v die vierfache Zentripetalkraft erfordert.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：切向速度眼 vs. 径向受力眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目问的是 (i) Bahn-Verfahren（求速率/周期/角速度，用 v = 2πr/T 与 ω = 2πf）还是 (ii) Kraft-Verfahren（问能否过弯/是否打滑/拉力多大，用 F_Z = m v^2/r 做径向合力分析）—— dann rechnen.

AUFGABE A：Eine Drehscheibe hat r = 0.30 m und f = 2.0 1/s. Gefragt ist die Bahngeschwindigkeit eines Punktes am Rand.
AUFGABE B：Auf derselben Scheibe liegt eine Muenze der Masse 10 g. Gefragt ist, ob sie bei einem Haftkoeffizienten von 0.40 haften bleibt.

HILFE: A nennt nur Geometrie plus Drehzahl und fragt nach Tempo -> Verfahren (i), Bahn. B nennt Masse plus Reibung und fragt nach Halten oder Rutschen -> Verfahren (ii), Kraft.【选程序：题干出现 T / f / r 求 v 或 ω 选轨道程序；出现 m / Reibung / Halten / Reissen 选受力程序。】

ANTWORT: A erfordert Verfahren (i): v = 2πr f = 2π mal 0.30 mal 2.0 = 3.77 m/s; dies ist die tangentiale Bahngeschwindigkeit. B erfordert Verfahren (ii): F_Z Bedarf = m v^2/r = 0.010 mal (3.77)^2 / 0.30 = 0.474 N; maximal moegliche Haftreibung = 0.40 mal 0.010 mal 9.81 = 0.039 N. Der Bedarf ist groesser als das Angebot, daher rutscht die Muenze nach aussen weg.

Klausur-Satz: `Kinematische Fragen nach v und ω verlangen das Bahn-Verfahren, Fragen nach Halten oder Reissen verlangen das Kraft-Verfahren mit F_Z.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie berechnen sich Bahngeschwindigkeit v und Winkelgeschwindigkeit ω aus r, T und f? | ANTWORT: v = 2πr/T = ωr und ω = 2πf = 2π/T; v zeigt tangential, ω beschreibt die Drehgeschwindigkeit.
FRAGE: Wie lautet die Formel der Zentripetalkraft und wohin zeigt sie? | ANTWORT: F_Z = m v^2/r = m ω^2 r; sie zeigt radial zum Mittelpunkt und ist die Radialkomponente der realen Kraefte.
FRAGE: Warum vervierfacht sich die Kraft bei doppelter Geschwindigkeit? | ANTWORT: Weil v in F_Z quadratisch eingeht: (2v)^2 = 4v^2, daher braucht die Kurve viermal so viel Haftreibung.

Klausur-Satz: `Die Formeln v = 2πr/T, ω = 2πf und F_Z = m v^2/r bilden das geschlossene Verfahren der Kreisbewegung.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"匀速圆周运动没有加速度，因为速率不变"。
   中文纠偏：速率不变不等于速度不变。方向每时每刻都在转，速度矢量一直在变，因此必有指向圆心的加速度。没有这个加速度，物体只会沿切线飞走，根本拐不了弯。
   Korrektur-Satz: `Trotz konstantem Betrag der Geschwindigkeit liegt eine Zentripetalbeschleunigung zum Mittelpunkt vor, weil sich die Richtung staendig aendert.`

2. 误解"离心力是与向心力平衡的真实反作用力"。
   中文纠偏：在地面惯性系里根本不存在向外的离心力。真实存在的只有指向圆心的合力（向心力），而"外甩感"是惯性沿直线运动的趋势。离心力只在随车转动的非惯性系里为凑平衡才引入，考试受力图里绝不能画。
   Korrektur-Satz: `Im Inertialsystem existiert keine reale Zentrifugalkraft nach aussen; die einzige reale Radialkraft ist die Zentripetalkraft nach innen.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor in der EF und erklaerst einer Mitschuelerin die Kurvenphysik.
SITUATION: Nach einem Regen ist ein Auto in einer flachen Kurve mit Radius 60 m ins Rutschen geraten. Die Mitschuelerin sagt: Die Fliehkraft hat das Auto nach aussen gezogen. Nimm in einer zusammenhaengenden Darstellung (ca. 150 Woerter) Stellung, berechne exemplarisch mit v = 20 m/s und m = 1000 kg die noetige Zentripetalkraft und beurteile die Aussage.
AUFGABE: Schreibe eine Klausur-Antwort mit Formeln, Rechnung, Kraftdeutung und Urteil ueber die Fliehkraft-Aussage.
RUBRIC (30 XP): Korrekte Rechnung mit F_Z = m v^2/r (10 XP) | Deutung als Haftreibung als Lieferant der Radialkraft (10 XP) | Urteil: keine reale Kraft nach aussen, sondern Traegheit bei fehlender Zentripetalkraft (10 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：匀速圆周抓住两句话：运动看切线，受力看径向。速率用圈长除周期 v = 2πr/T，转快慢用 ω = 2πf，能否过弯用 F_Z = m v^2/r 验算摩擦够不够。车速翻倍、需求变四倍，这是所有弯道题的秒杀点。受力图只画指向圆心的真实力，绝不画离心力；凡是"被甩出去"，翻译成"向心力不够、惯性走直线"。
Takeaway-Satz: `Bahn tangential mit v = 2πr/T, Kraft radial mit F_Z = m v^2/r; doppelte Geschwindigkeit verlangt vierfache Haftreibung.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Rechnung mit v und F_Z (Schritt 4) oder die Wahl zwischen Bahn-Verfahren und Kraft-Verfahren (Schritt 5)?
2. 元认知计划：Beim naechsten Mal zeichne ich zuerst die Draufsicht mit Radius, Tangente und Radialpfeil und frage dann, ob nach Tempo oder nach Halten gefragt ist.
