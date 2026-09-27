---
fach: Physik
thema: "CN-Tricks: sechs Verfahren fuer die Physik-Klausur"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Methoden]
version: Lesson-v3
---

# Lernreise: CN-Tricks: sechs Verfahren fuer die Physik-Klausur (L1, Ziel Klausur)

<!-- Campaign: Mars-Mission | Episode 4/28 | Krise: Sol-052 Landebeine-Daempfer blockiert bei -63 Grad | Target: v0 = 268 m/s, a = 2.5 m/s2, Ziel s = 948 m | Tool: formula -->

## Schritt 1 — entdecken: Staub frisst die Messung
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说出六个中国解题套路的中文名，并把每一个对应到德语 Klausur 的规范步骤。
2. 中文：能用图像面积法与量纲检验独立解一道题，并做一次交叉验算。
3. 中文：能在"整体法"与"隔离法"之间做出选择，并用德语说出选择理由。

### Hook / Phaenomen

【火星拓荒者·第4集/共28集】警报：Sol-052 Landebeine-Daempfer blockiert bei -63 Grad。领航员 Lena 大喊：“v0 = 268 m/s, a = 2.5 m/s2, Ziel s = 948 m！”机械师 Tom 回应：“稳住曲线！”上一集（Physik-CN-Tricks-DE-L1.md）埋下的隐患在此爆发，下一集（Physik-Diagramme-DE-L1.md）的大门只为算对的人打开。本集你要在沙盘里亲手把飞船从超速边缘救回来：先看现象、再点装备、最后算出让考官点头的 Bilanz。记住：读图先看轴、计算必带单位、做完必用另一张图验算——这就是火星人生存法则，也是 Klausur 拿分法则。

Hook / Phaenomen (Sol-Logbuch, Episode 4 von 28): Mars-Anflug, Sol-052 Landebeine-Daempfer blockiert bei -63 Grad. Navigatorin Lena meldet: v0 = 268 m/s, a = 2.5 m/s2, Ziel s = 948 m, Mechaniker Tom ruft: Halte die Kurve! Der Bordcomputer geht auf Rot, das Funkgeraet rauscht, die Crew haelt den Atem an. Genau hier entscheidet CN-Tricks: sechs Verfahren fuer die Physik-Klausur ueber Landung oder Absturz, ueber Festfahren oder Weiterfahrt, ueber Andocken oder Abprall. Das Logbuch des vorherigen Sols (Physik-CN-Tricks-DE-L1.md) warnte bereits vor diesem Moment, und das naechste Fenster (Physik-Diagramme-DE-L1.md) oeffnet sich nur, wenn diese Aufgabe geloest wird. Die Sensoren streuen, die Diagramme zittern, doch die Physik bleibt unbestechlich: Wer Steigung und Flaeche, Kraft und Gegenkraft, Schwung und Stoss richtig liest, rettet die Mission. In dieser Episode stellst du im Sandbox-Labor die Brems- und Gleitzahlen so ein, dass die Kapsel sicher durchkommt. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Groessen mit exakten Einheiten, pruefe schliesslich die Bilanz mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 受力图 — das Kraeftediagramm：把所有力画成带方向的箭头，一个不多、一个不少。
- 系统 — das System：一次研究中被当成一个整体的对象。
- 曲线下面积 — die Flaeche unter der Kurve：v-t 图线下的面积即路程。
- 等效力 — die Ersatzkraft：用一个力替换多个力，效果完全相同。
- 量纲检验 — die Dimensionsprobe：代入数字前先检查单位是否等于目标单位。

Klausur-Satz: `Erst das Bild, dann die Formel, dann die Zahl — und vor dem Einsetzen wird die Einheit geprueft.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter CN-Tricks: sechs Verfahren fuer die Physik-Klausur
ENTDECKEN（1概念 + 1文字图解）：

中文：中国物理训练强调"程序化"，好处是稳定、不漏步；德国 Klausur 强调"规范表达"，好处是拿步骤分。两者其实互补：中文套路决定"先做什么"，德语 Ansatz 决定"怎么写才给分"。下面六招，每招给一道自编小题和一句德语检验句，检验句就是你写进答卷的那句话。

**Trick 1 受力分析程序** — 按"重力→弹力→摩擦力→外加力"顺序画受力图，画完再列式。
自编小题：小车 m = 3,0 kg 在 alpha = 30 Grad 的光滑斜面上（sin = 0,50），求下滑加速度。解：F_H = m*g*sin(alpha) = 3,0*10*0,50 = 15 N，a = F_H/m = 5,0 m/s^2。
德语检验句：`Alle Kraefte werden mit Richtung im Kraeftediagramm dargestellt, dann folgt der Ansatz F_res = m*a.`

**Trick 2 整体隔离法** — 先把多物体当成一个整体求共同加速度，再隔离其中一个求内力。
自编小题：A 车 2,0 kg 与 B 车 3,0 kg 并排，水平推 A 用 15 N，无摩擦。整体 a = 15/5,0 = 3,0 m/s^2；隔离 B，A 对 B 的推力 F = 3,0*3,0 = 9,0 N。
德语检验句：`Zuerst wird das Gesamtsystem betrachtet, danach wird am freigeschnittenen Teil die innere Kraft berechnet.`

**Trick 3 图像面积法** — v-t 图线下的面积就是路程，先看轴再读图。
自编小题：v-t 图 0 bis 5 s 速度从 0 匀增到 10 m/s，路程 s = 0,5*5*10 = 25 m。
德语检验句：`Die Flaeche unter der v-t-Linie gibt den zurueckgelegten Weg an und wird als Dreiecksflaeche berechnet.`

**Trick 4 等效法** — 效果相同即可替换：多力合一、复杂运动分解、弹簧串并联化简。
自编小题：两根相同弹簧并联，每根 D = 30 N/m，等效 D_ges = 60 N/m；挂 3,0 kg（30 N），伸长 s = 30/60 = 0,50 m。
德语检验句：`Mehrere Kraefte werden durch eine Ersatzkraft mit gleicher Wirkung ersetzt.`

**Trick 5 量纲检验** — 代入数字前先把单位相乘除，单位错则式子必错。
自编小题：某同学写 v = m*s（质量乘路程），单位是 kg*m，不是 m/s，故必错；正确 v = s/t，单位 m/s。
德语检验句：`Vor dem Einsetzen wird die Einheit geprueft, weil eine falsche Einheit auf einen falschen Ansatz hinweist.`

**Trick 6 二级结论** — 常用小结论直接用，但必须说出适用条件。
自编小题：初速为零、a = 2,0 m/s^2，前三秒内每秒位移比为 1:3:5，即 1,0 m / 3,0 m / 5,0 m（用 s_n = a*(2n-1)/2 验算）。
德语检验句：`Bekannte Kurzregeln werden nur mit genannter Bedingung benutzt und kurz begruendet.`

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Kraeftediagramm (Reihenfolge: Gewicht, Normale, Reibung, Zug)
                 F_N ^
                     |
        F_R  <--  [Block]  -->  F_Zug
                     |
                     v  F_G = m*g

   Flaeche unter v-t:
     v ^
       |          .
       |        . |
       |      .   |   Dreieck: s = 0,5 * t * v
       |    .     |
       +--------------> t
        0         5 s
```

Klausur-Satz: `Die sechs Verfahren beschleunigen das Loesen, aber erst der ausgeschriebene Ansatz mit Formel und Einheit macht die Loesung klausurfaehig.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Galileo Galilei soll beim Studium fallender Koerper eine erstaunliche Regel gefunden haben: Legt ein Koerper aus der Ruhe in gleichen Zeitabschnitten immer laengere Strecken zurueck, so verhalten sich diese Strecken wie die ungeraden Zahlen 1 : 3 : 5 : 7. In der ersten Sekunde also eine Einheit, in der zweiten drei, in der dritten fuenf. Diese "ungeraden Zahlen" sind bis heute eine der bekanntesten Kurzregeln der Kinematik.

**中文解读**: 伽利略发现自由落体在连续相等时间内走过的位移之比是 1:3:5:7，正是本课 Trick 6"二级结论"的原型。它来自 s = ½at² 的平方关系，能让你不做积分就快速检验匀加速运动。记住这条规律，就记住了一个能省时间的经典结论。

**Bezug zum Konzept**: `Die ungeraden Zahlen 1 : 3 : 5 folgen direkt aus s = 0.5*a*t^2 und sind das klassische Beispiel fuer eine Kurzregel mit genannter Bedingung (Start aus der Ruhe).`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Staub frisst die Messung
Kontinuitaet: Vorher Physik-CN-Tricks-DE-L1.md | Nachher Physik-Diagramme-DE-L1.md. Krise dieser Episode: Sol-052 Landebeine-Daempfer blockiert bei -63 Grad. Target: v0 = 268 m/s, a = 2.5 m/s2, Ziel s = 948 m.

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen, AFB II)：Ein Block der Masse m = 5,0 kg liegt auf einer waagerechten Tischplatte. Er wird mit einer horizontalen Zugkraft F_Zug = 20 N gezogen; der Gleitreibungskoeffizient beträgt mu = 0,20, es gilt g = 10 m/s^2. Beschreiben Sie das Kräftediagramm und berechnen Sie die Beschleunigung des Blocks. Prüfen Sie das Ergebnis mit der Dimensionsprobe.

HILFE:
1. Schritt 1 (Kraeftediagramm): Zeichne Gewichtskraft nach unten, Normalkraft nach oben, Zugkraft nach rechts und Reibung nach links.
2. Schritt 2 (Ansatz): Senkrecht gilt Kräftegleichgewicht F_N = m*g; waagerecht gilt F_res = F_Zug - mu*F_N = m*a.
3. Schritt 3 (Zahlen und Dimensionsprobe): Setze die Werte ein und prüfe, ob die Einheit der Beschleunigung m/s^2 ergibt.

MUSTERLÖSUNG: Das Kräftediagramm enthält genau vier Kräfte: die Gewichtskraft F_G = m*g = 5,0 kg * 10 m/s^2 = 50 N nach unten, die gleich große Normalkraft F_N = 50 N nach oben, die Zugkraft F_Zug = 20 N nach rechts und die Gleitreibung F_R = mu*F_N = 0,20 * 50 N = 10 N nach links. Senkrecht gilt Kräftegleichgewicht, waagerecht ist die resultierende Kraft F_res = F_Zug - F_R = 20 N - 10 N = 10 N. Aus F_res = m*a folgt a = F_res/m = 10 N / 5,0 kg = 2,0 m/s^2. Dimensionsprobe: [F_res/m] = (kg*m/s^2)/kg = m/s^2, was der Einheit der Beschleunigung entspricht; die Größenordnung 2,0 m/s^2 ist für einen gezogenen Block plausibel.

Klausur-Satz: `Aus dem vollstaendigen Kraeftediagramm folgt fuer den Block mit F_res = 10 N eine Beschleunigung von 2,0 m/s^2, und die Dimensionsprobe bestaetigt den Ansatz.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Staub frisst die Messung
VERGLEICH辨别实验（双向辨析：整体眼 vs. 隔离眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先看题目问的是"系统整体的运动"还是"物体之间的内力"：(i) Ganzheits-Verfahren（整体法：把多个物体看成一个系统，用 a = F_aussen / m_ges 一次求共同加速度）oder (ii) Isolations-Verfahren（隔离法：只切开其中一个物体，用 F_innen = m_teil * a 求相互作用力）—— dann lösen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Zwei verbundene Wagen (m1 = 2,0 kg, m2 = 4,0 kg) werden auf reibungsfreier Bahn mit einer äußeren Kraft F = 12 N gezogen; gefragt ist die gemeinsame Beschleunigung. Welches Verfahren ist zu wählen?

Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Bei denselben Wagen ist nun die Zugkraft im Verbindungsseil gefragt. Welches Verfahren ist zu wählen?

HILFE: A: Gefragt ist die gemeinsame Beschleunigung des ganzen Systems → Verfahren (i), a = F/(m1+m2). B: Gefragt ist eine Kraft zwischen den Wagen → Verfahren (ii), einen Wagen freischneiden und F_innen = m_teil*a rechnen.【选程序：问整体多快走整体程序；问物体间作用力走隔离程序。】

ANTWORT: A erfordert Verfahren (i): Die beiden Wagen bilden ein System der Gesamtmasse m_ges = 2,0 kg + 4,0 kg = 6,0 kg, die äußere Kraft ist F = 12 N, also a = F/m_ges = 12 N / 6,0 kg = 2,0 m/s^2. B erfordert Verfahren (ii): Man schneidet den hinteren Wagen (m2 = 4,0 kg) frei; auf ihn wirkt nur die Seilkraft als äußere Kraft, und es gilt F_Seil = m2*a = 4,0 kg * 2,0 m/s^2 = 8,0 N. Zur Kontrolle wirkt auf den vorderen Wagen (2,0 kg) die Differenz 12 N - 8,0 N = 4,0 N, was gerade m1*a = 2,0 kg * 2,0 m/s^2 = 4,0 N entspricht.

Klausur-Satz: `Die gemeinsame Beschleunigung folgt aus dem Gesamtsystem, die innere Seilkraft dagegen erst nach dem Freischneiden eines einzelnen Wagens.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu CN-Tricks: sechs Verfahren fuer die Physik-Klausur: Staub frisst die Messung
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: In welcher Reihenfolge werden die Kraefte im Kraeftediagramm eingezeichnet? | ANTWORT: Zuerst die Gewichtskraft, dann die Normalkraft, dann die Reibung und zuletzt die aeussere Zugkraft.
FRAGE: Wann verwendet man das Ganzheitsverfahren, wann das Isolationsverfahren? | ANTWORT: Das Ganzheitsverfahren fuer die gemeinsame Beschleunigung des Systems, das Isolationsverfahren fuer die innere Kraft zwischen den Teilen.
FRAGE: Was prueft die Dimensionsprobe, und was kann sie nicht leisten? | ANTWORT: Sie prueft, ob die Einheit des Ergebnisses stimmt; sie erkennt aber keine falschen Koeffizienten oder falschen Bedingungen.

Klausur-Satz: `Das Ganzheitsverfahren liefert die gemeinsame Beschleunigung, das Isolationsverfahren die innere Kraft, und die Dimensionsprobe kontrolliert beide Ansaetze ueber die Einheit.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"受力图画得越多越保险"。
   中文纠偏：多画即错。每一个箭头都必须有明确的施力物体，凭空多画一个"向心力"或"惯性力"就会误导列式。正确做法是按"重、弹、摩、外"四步逐个确认，画完再数一遍箭头数是否合理。
   Korrektur-Satz: `Jeder Kraftpfeil braucht einen Verursacher; ueberzaehlige Kraefte im Diagramm fuehren zu einem falschen Ansatz.`

2. 误解"量纲对了，答案就一定对"。
   中文纠偏：量纲检验只是必要条件。比如把 0,5*a*t^2 写成 a*t^2，单位仍是 m，量纲照样通过，但数值大了一倍。所以单位检查之后，还要回题干核对条件与数量级。
   Korrektur-Satz: `Die Dimensionsprobe ist nur eine notwendige Bedingung und ersetzt nicht die Pruefung von Bedingung und Groessenordnung.`

## Schritt 7 — szenario: Klausurtransfer: CN-Tricks: sechs Verfahren fuer die Physik-Klausur: Staub frisst die Messung
ROLLE: Du bist Nachhilfelehrerin und bringst einer Schülergruppe die chinesischen Verfahren als Lernstrategie für die Physik-Klausur näher.
SITUATION: Die Gruppe rechnet zwar schnell, verliert aber regelmäßig Punkte, weil die Ansätze fehlen und die Diagramme unvollständig sind. Erkläre in einer zusammenhängenden Stellungnahme (ca. 150 Wörter), wie man die sechs Verfahren mit den deutschen Schreibregeln verbindet, sodass Tempo und Formalkorrektheit zusammenkommen.
RUBRIC (30 XP): Benennung und Zuordnung von mindestens drei Verfahren zu deutschen Schritten (10 XP) | Erlaeuterung, warum der ausgeschriebene Ansatz Punkte sichert (10 XP) | Beispiel zur Wahl zwischen Ganzheits- und Isolationsverfahren (5 XP) | Adressatengerechte, fachsprachlich korrekte Darstellung (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Staub frisst die Messung
TAKEAWAY 1盒（核心总结）：

中文：六招的本质是"先程序、后计算"。受力分析保证不漏力，整体隔离保证内外力不混，面积法保证读图快，等效法保证化繁为简，量纲检验保证方向不错，二级结论保证省时间。但记住：套路只决定"怎么做"，答卷上还要写出 Ansatz、代入和单位，这三样才是德国阅卷老师打分的对象。中文练速度，德语练规范，两条腿走路才稳。
Takeaway-Satz: `Bild vor Formel, Ganzes vor Teil, Flaeche vor Zahl — und zu jedem Verfahren wird der Ansatz mit Einheit ausgeschrieben.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das vollstaendige Kraeftediagramm (Schritt 4) oder die Wahl zwischen Ganzheits- und Isolationsverfahren im Vergleich (Schritt 5)?
2. 元认知计划：Beim nächsten Mal zeichne ich zuerst das Kraeftediagramm und pruefe die Einheit, bevor ich Zahlen einsetze.

`Klausur-Satz: Siehe Schritt-Inhalt.`
