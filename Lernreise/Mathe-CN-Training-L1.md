---
fach: Mathe
thema: "CN-Training: vier Aufgaben unter Zeitdruck"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, bestimmen, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: CN-Training — vier Aufgaben unter Zeitdruck (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能在 60 分钟内限时完成四道自编题——求导加切线、向量与直线、概率树形图、均值求极值。
2. 中文：能按 EHZ 采分点给自己的解答逐项打分，区分"算错"与"概念错"。
3. 中文：能为每题写出 Ansatz、Rechnung、Antwortsatz 三段式，确保拿到呈现分（AFB II/III）。

Klausur-Satz: `Jeder Loesungsweg braucht Ansatz, Rechnung und Antwortsatz; ohne Antwortsatz verliert man Darstellungspunkte.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 切线 — Tangente：`t(x) = f(x0) + f'(x0) * (x - x0)`，用点与斜率写成点斜式。
- 方向向量 — Richtungsvektor：直线参数式 `x = a + s * u` 中的 u，决定方向。
- 点检验 — Punktprobe：把点代入直线，看三个坐标方程是否共用同一个 s。
- 树形图 — Baumdiagramm：分步实验沿树枝相乘、跨枝相加。
- 期望视野 — Erwartungshorizont (EHZ)：官方评分标准，按采分点逐项给分。

Klausur-Satz: `Die Tangente bei x0 ergibt sich aus dem Punkt (x0 | f(x0)) und der Steigung f'(x0).`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：这一课是"限时迁移训练"。四道题全部自编、数字自定，覆盖 EF 四大题型：函数求导与切线、向量与直线、概率树形图、均值求极值。训练规则是限时 60 分钟，做完后按 EHZ 采分点自评。自评时要把失分归类：计算错（Rechenfehler）还是概念错（Konzeptfehler）——计算错可以靠检查挽回，概念错必须回到方法层重学。记住三段式：Ansatz 写清思路、Rechnung 写出步骤、Antwortsatz 用德语收尾。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Aufgabe 1  Funktion: f' -> f(x0), f'(x0) -> Tangente t(x)
   Aufgabe 2  Vektor  : PQ = Q - P -> |PQ| -> Punktprobe (ein s)
   Aufgabe 3  Stochastik: Baum -> Pfadprodukt -> Summe -> Antwortsatz
   Aufgabe 4  Extremum : Positivitaet -> AM-GM -> Gleichheit -> Ableitung
   ---------------------------------------------------------------
   Zeit: 60 min | Struktur je Aufgabe: Ansatz + Rechnung + Antwortsatz
   EHZ-Selbstbewertung: Rechenfehler vs Konzeptfehler trennen
```

Klausur-Satz: `Die vier Aufgaben pruefen die Kernkompetenzen der EF: Differenzieren, Vektorrechnung, Wahrscheinlichkeit und Extremwertbestimmung.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Das Wort Klausur kommt vom lateinischen claustrum, "abgeschlossener Raum". Frueher bezeichnete es einen abgetrennten Bereich im Kloster, spaeter die abgeschlossene Pruefung unter Aufsicht. Auch heute bedeutet Klausur: begrenzte Zeit, keine fremde Hilfe, nur das eigene Wissen. Genau diese Bedingungen simuliert das 60-Minuten-Training.

**中文解读**: "Klausur" 本义是"封闭的空间"，后来引申为闭卷限时考试。这正好对应本课的训练场景——关门、限时、不借外力，做完后按 EHZ 采分点自评，把失分分成计算错与概念错。

**Bezug zum Konzept**: `Eine Klausur ist eine abgeschlossene, zeitlich begrenzte Pruefung; der Zeitmodus trainiert genau diese Situation.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II)：Aufgabe 1 (6 BE). Gegeben ist f(x) = x^3 - 4x^2 + 5x + 1. a) Berechnen Sie f'(x). b) Bestimmen Sie die Tangente an f bei x0 = 2.

HILFE:
1. Schritt 1: f'(x) gliedweise mit der Potenzregel bilden.
2. Schritt 2: f(2) und f'(2) auswerten (Punkt und Steigung).
3. Schritt 3: Beides in die Punkt-Steigungs-Form t(x) = f(x0) + f'(x0) * (x - x0) einsetzen.

MUSTERLÖSUNG: a) Mit der Potenzregel gilt f'(x) = 3x^2 - 8x + 5. b) Es ist f(2) = 8 - 16 + 10 + 1 = 3 und f'(2) = 12 - 16 + 5 = 1. Damit lautet die Tangente t(x) = 3 + 1 * (x - 2) = x + 1. Die Tangente beruehrt den Graphen im Punkt (2 | 3) mit der Steigung 1.

EHZ-Punkte (6 BE): f'(x) korrekt (2 BE) | f(2) und f'(2) korrekt (2 BE) | Tangentengleichung mit Ansatz (2 BE).

Klausur-Satz: `Die Tangente bei x0 = 2 lautet t(x) = x + 1, da f(2) = 3 und f'(2) = 1 gilt.`

TRAININGSPACK（其余三题，限时完成，做完按 EHZ 自评）：

Aufgabe 2 (Vektor/Geometrie, 6 BE, selbst gestellt)：Gegeben sind A(1 | 0 | 0) und B(3 | 3 | 6). a) Geben Sie den Vektor AB an und berechnen Sie |AB|. b) Die Gerade g lautet x = (1 | 0 | 0) + s * (2 | 3 | 6). Pruefen Sie durch eine Punktprobe, ob C(5 | 6 | 12) auf g liegt.
中文思路：终点减起点得向量，平方和开根得模长；点检验要三个坐标方程共用同一个 s。
Lösungsweg: AB = (3 - 1 | 3 - 0 | 6 - 0) = (2 | 3 | 6); |AB| = Wurzel(4 + 9 + 36) = Wurzel(49) = 7. Probe fuer C: 5 = 1 + 2s ergibt s = 2; 6 = 0 + 3 * 2 = 6 stimmt; 12 = 0 + 6 * 2 = 12 stimmt. Also liegt C auf g.
EHZ-Punkte: Vektor korrekt (1 BE) | Laenge mit Wurzel (2 BE) | Punktprobe mit gemeinsamem s und Schluss (3 BE).
DE-Transfer-Satz: `Der Punkt C liegt auf g, da ein gemeinsames s = 2 alle drei Koordinatengleichungen erfuellt.`

Aufgabe 3 (Stochastik, 5 BE, selbst gestellt)：Eine Box enthaelt 7 Kugeln: 4 rote und 3 blaue. Es wird zweimal ohne Zuruecklegen gezogen. Bestimmen Sie mit einem Baumdiagramm die Wahrscheinlichkeit, dass beide Kugeln rot sind.
中文思路：第一次红概率 4/7，第二次剩 3 红共 6 球，沿枝相乘。
Lösungsweg: Pfad rot-rot: (4/7) * (3/6) = 12/42 = 2/7. Baum mit vier Pfaden (RR, RB, BR, BB) skizzieren und die Stufenwahrscheinlichkeiten entlang des Pfades multiplizieren. Antwort: P(beide rot) = 2/7 ≈ 0,286 = 28,6 %.
EHZ-Punkte: Baum korrekt beschriftet (2 BE) | Pfadmultiplikation (2 BE) | Antwortsatz mit Deutung (1 BE).
DE-Transfer-Satz: `Entlang des Pfades multipliziere ich die Stufenwahrscheinlichkeiten, also gilt P(beide rot) = (4/7) * (3/6) = 2/7.`

Aufgabe 4 (Extremwert mit AM-GM, 7 BE, selbst gestellt)：Fuer x > 0 sei A(x) = x + 25/x. Untersuchen Sie A mit AM-GM auf das Minimum und geben Sie Stelle und Wert an. Bestaetigen Sie das Ergebnis kurz mit A'(x).
中文思路：先证两项为正，用均值凑定积 25，等号在 x = 5；再求导验证确为最小。
Lösungsweg: Da x > 0 und 25/x > 0 gilt: A(x) >= 2 * Wurzel(x * 25/x) = 2 * 5 = 10, Gleichheit fuer x = 25/x, also x = 5. Probe mit der Ableitung: A'(x) = 1 - 25/x^2 = 0 ergibt x = 5 (positiv); A''(x) = 50/x^3 > 0, also ein Minimum. Es gilt A(5) = 10.
EHZ-Punkte: Positivitaet genannt (1 BE) | AM-GM-Abschaetzung (2 BE) | Gleichheitsstelle x = 5 (1 BE) | Ableitungs-Bestaetigung (2 BE) | Minimumswert 10 mit Satz (1 BE).
DE-Transfer-Satz: `Da beide Summanden positiv sind, folgt mit AM-GM A(x) >= 10 mit Gleichheit bei x = 5; die Ableitung bestaetigt dort ein Minimum mit Wert 10.`

Klausur-Satz: `Die vier Aufgaben folgen dem Muster Ansatz, Rechnung und Antwortsatz, wobei jede Aufgabe ihre eigene Kernmethode besitzt.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：均值眼 vs. 求导眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目问的是 (i) AM-GM-Verfahren（和式为正且乘积固定，求最小值）还是 (ii) Ableitungs-Verfahren（多项式求单调与极值，必须列符号表）—— dann rechnen.

AUFGABE A：Fuer x > 0 ist A(x) = x + 25/x gegeben. Bestimmen Sie den minimalen Wert.
AUFGABE B：Gegeben ist g(x) = x^3 - 4x^2 + 5x + 1. Bestimmen Sie die lokalen Extremstellen.

HILFE: A ist eine Summe zweier positiver Terme mit festem Produkt -> Verfahren (i), AM-GM. B ist ein Polynom, das monotonieanalytisch untersucht werden muss -> Verfahren (ii), Ableitung und Vorzeichentabelle.【选程序：正数和式、乘积固定用均值；一般多项式求极值用求导。】

ANTWORT: A erfordert Verfahren (i): A(x) >= 2 * Wurzel(25) = 10, Gleichheit fuer x = 5, also Minimum 10 an der Stelle x = 5. B erfordert Verfahren (ii): g'(x) = 3x^2 - 8x + 5 = 0 ergibt x = 1 und x = 5/3; mit g''(x) = 6x - 8 folgt g''(1) = -2 < 0 (Hochpunkt) und g''(5/3) = 2 > 0 (Tiefpunkt).

Klausur-Satz: `Fuer Summen positiver Terme mit festem Produkt nutzt man AM-GM, fuer Polynome das Ableitungsverfahren mit Vorzeichentabelle.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die Punkt-Steigungs-Form der Tangente an der Stelle x0? | ANTWORT: t(x) = f(x0) + f'(x0) * (x - x0).
FRAGE: Woran erkennt man bei einer Punktprobe, dass ein Punkt auf einer Geraden liegt? | ANTWORT: Daran, dass ein einziger Parameter s alle drei Koordinatengleichungen erfuellt.
FRAGE: Welche zwei Bedingungen braucht AM-GM, um ein Minimum zu bestimmen? | ANTWORT: Positivitaet beider Terme und ein festes Produkt; der Wert liegt an der Gleichheitsstelle.

Klausur-Satz: `Ansatz, Rechnung und Antwortsatz gehoeren zu jeder Aufgabe; AM-GM verlangt Positivitaet und die Gleichheitsbedingung.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"切线方程可以背 y = mx + b 直接凑出 b"。
   中文纠偏：错。必须用点斜式 `t(x) = f(x0) + f'(x0) * (x - x0)`，把点 (x0 | f(x0)) 和斜率 f'(x0) 一起代入。凭空猜 b 极易出错，也拿不到 Ansatz 分。
   Korrektur-Satz: `Die Tangente wird mit der Punkt-Steigungs-Form aus f(x0) und f'(x0) bestimmt, nicht durch Raten des Achsenabschnitts.`

2. 误解"不放回抽样时，第二次的概率和第一次一样"。
   中文纠偏：错。不放回抽样中，总数和有利数都要各减一。例如第一次红是 4/7，第二次红就是 3/6 而不是 4/7；把不放回当成放回是最典型的概念错。
   Korrektur-Satz: `Beim Ziehen ohne Zuruecklegen verringern sich Zaehler und Nenner jeweils um eins.`

## Schritt 7 — szenario

ROLLE: Du bist Lerncoach und wertest die Ergebnisse des 60-Minuten-Trainings aus.
SITUATION: Ein Schueler hat alle vier Aufgaben bearbeitet, aber bei Aufgabe 2 nur den Vektor angegeben, bei Aufgabe 3 die zweite Wahrscheinlichkeit als 4/7 geschrieben und bei Aufgabe 4 das Ergebnis ohne Gleichheitsbedingung gelassen. Beurteile seine Leistung in einer zusammenhaengenden Darstellung (ca. 150 Woerter), ordne die Fehler nach EHZ-Punkten ein und unterscheide Rechenfehler von Konzeptfehlern.
RUBRIC (30 XP): Zuordnung der Fehler zu den EHZ-Punkten (5 XP) | Analyse Aufgabe 2: fehlender Nachweis der Laenge und Punktprobe (10 XP) | Analyse Aufgabe 3 und 4: Konzeptfehler ohne Zuruecklegen bzw. fehlende Gleichheitsbedingung (10 XP) | Kriteriengeleitetes Fazit mit Lernempfehlung (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：四题迁移链——求导给斜率、向量看公共参数、概率沿枝相乘、极值先证正数再用均值并求导复核。每题都写 Ansatz、Rechnung、Antwortsatz，限时 60 分钟，做完按 EHZ 自评，把失分分成计算错和概念错。记住一句话——过程完整才拿分，错因归类才会进步。
Takeaway-Satz: `Ansatz, Rechnung und Antwortsatz gehoeren zu jeder Aufgabe; die EHZ-Selbstbewertung trennt Rechenfehler von Konzeptfehlern.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Tangente in Aufgabe 1 (Schritt 4) oder die Wahl zwischen AM-GM und Ableitung in Aufgabe 4 (Schritt 5)?
2. 元认知计划：Beim naechsten Mal pruefe ich bei jeder Aufgabe zuerst die Bedingung der Methode (Positivitaet, kein Zuruecklegen, gemeinsames s) und erst danach rechne ich.
