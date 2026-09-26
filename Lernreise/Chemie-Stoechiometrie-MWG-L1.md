---
fach: Chemie
thema: "Stoechiometrie und Massenwirkungsgesetz"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, ueberpruefen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Stoechiometrie]
version: Lesson-v3
---

# Lernreise: Stoechiometrie und Massenwirkungsgesetz (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能复述口诀"先配平、归 n、比系数"——一切质量体积先换成物质的量 n = m/M = cV，再按配平方程式的系数比换算。
2. 中文：能找出限量试剂并算理论产量与百分产率 Ausbeute = 实际/理论 × 100%，解释锂电池 NCM 配比为何必须精确。
3. 中文：能写出质量作用定律 K_c 并用它检验平衡、预测移动方向：Q < K 则正向走，Q > K 则逆向走（AFB II）。

Klausur-Satz: `Erst ausgleichen, dann alles in die Stoffmenge n = m/M = cV umrechnen und schliesslich im Verhaeltnis der Koeffizienten umsetzen.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 物质的量 — Stoffmenge n：微粒集体单位，n = m/M = cV，是质量、体积与方程之间的枢纽。
- 配平 — Ausgleichen：用系数让左右原子数相等，系数比即粒子数比、也是物质的量比。
- 限量试剂 — Limitierendes Reagenz：按系数比先耗尽、决定最大产量的反应物。
- 百分产率 — Ausbeute：实际产量除以理论产量再乘百分号，反映损耗与副反应。
- 质量作用定律 — Massenwirkungsgesetz：K_c 等于产物浓度幂之积除以反应物浓度幂之积，指数取配平系数。

Klausur-Satz: `Die Koeffizienten der ausgeglichenen Gleichung geben das Stoffmengenverhaeltnis vor, K_c prueft die Lage des Gleichgewichts.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：化学计算只有一条高速公路：所有已知量先"归 n"，再"比系数"过桥。质量用 n = m/M 进站，溶液用 n = cV 进站，气体在 EF 阶段同样先换成 n；上了 n 高速后，配平系数就是车道比——比如 2 mol 对应 1 mol，算出目标物质的 n 后再出站变回质量或浓度。限量试剂就是先用完的那条车道：把每个反应物的"现有 n 除以它的系数"算一遍，比值最小者限量，理论产量只能按它算。质量作用定律是同一思想在平衡上的延续：K_c 把"产物之积除以反应物之积"定成常数，当前商 Q 与 K 一比就知道往哪走。锂电池 NCM 三元配比正是限量思想的工业版——镍钴锰比例一偏，多的料全浪费，还拖累容量。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   m --(M)--> n <--(cV)-- V,c
               |
        [Ausgleichen: Koeffizienten]
               |
     n(Ziel) = n(Start) * (Coeff_Ziel / Coeff_Start)
               |
        m = n*M  |  c = n/V  |  Ausbeute = real/theoretisch
   Beispiel MWG: aA + bB <=> cC + dD
   Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b), Q vs K entscheidet
```

Klausur-Satz: `Alle Mengenangaben werden erst in n umgerechnet, dann im Verhaeltnis der Koeffizienten umgesetzt und zuletzt ueber K_c ueberprueft.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Bei Lithium-Akkus mit NCM-Kathode zaehlt jedes Prozent Nickel, Kobalt und Mangan. Die Fabrik mischt die Metallsalze so genau, dass kein Partner frueh ausgeht, denn der knappste Stoff begrenzt die ganze Charge wie die kuerzeste Daube eines Fasses. Ein kleiner Dosierfehler erzeugt Tonnen teuren Ausschuss, daher prueft das Labor jede Lieferung erst in Mol um und vergleicht dann mit den Koeffizienten der Faellgleichung.

**中文解读**: 三元锂电池的镍钴锰配比就是放大的限量试剂问题——最短的那块木板决定木桶装多少水。工厂先把每批原料全部换算成摩尔，再按沉淀方程的系数比配料，偏一点就整批报废。这正是"先配平、归 n、比系数"口诀的工业身价。

**Bezug zum Konzept**: `Das knappste Reagenz begrenzt den Ertrag wie die kuerzeste Daube das Fass.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen, AFB II)：Aus 10.0 g CaCO3 wird durch Brennen CaO gewonnen: CaCO3 -> CaO + CO2. M(CaCO3) = 100.1 g/mol, M(CaO) = 56.1 g/mol. Berechnen Sie die theoretische Masse an CaO und die Ausbeute, wenn real 4.50 g erhalten werden. Ueberpruefen Sie zudem mit K_c-Skizze, was ein Abpumpen von CO2 bewirkt.

HILFE:
1. Schritt 1: Gleichung pruefen (hier bereits 1:1:1), dann n = m/M fuer CaCO3 berechnen.
2. Schritt 2: Im Verhaeltnis der Koeffizienten umsetzen: n(CaO) = n(CaCO3) mal (1/1), dann m = n mal M.
3. Schritt 3: Ausbeute = real/theoretisch mal 100 Prozent; danach Q vs K deuten: CO2 senken heisst Q kleiner als K, also nach rechts.

MUSTERLOESUNG: Es gilt n(CaCO3) = 10.0 g / 100.1 g/mol = 0.0999 mol. Wegen des Verhaeltnisses 1:1 folgt n(CaO) = 0.0999 mol, also m(theoretisch) = 0.0999 mol mal 56.1 g/mol = 5.60 g. Die Ausbeute betraegt 4.50 g / 5.60 g mal 100 Prozent = 80.4 Prozent. Fuer das Gleichgewicht gilt K_c proportional zu [CO2], weil Feststoffe nicht erscheinen; pumpt man CO2 ab, so sinkt Q unter K, und das System laeuft nach rechts bis Q wieder gleich K ist.

Klausur-Satz: `Aus n = m/M und dem Koeffizientenverhaeltnis 1:1 folgt m = 5.60 g und eine Ausbeute von 80.4 Prozent; CO2-Entzug verschiebt nach rechts.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：配比计算眼 vs. 平衡检验眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目问的是 (i) Stoechiometrie-Verfahren（求 n / m / c / 限量 / 产率，口诀先配平归 n 比系数）还是 (ii) MWG-Verfahren（写 K_c、算 Q、与 K 比大小、判移动方向）—— dann rechnen.

AUFGABE A：5.00 g Mg plus 5.00 g O2 reagieren zu MgO (2Mg + O2 -> 2MgO). Gefragt ist die maximale Masse an MgO.
AUFGABE B：Fuer N2 + 3H2 <=> 2NH3 ist K_c = 0.50 gegeben; aktuell gilt [N2] = 1.0, [H2] = 1.0, [NH3] = 1.0 (mol/L). Gefragt ist, in welche Richtung das System laeuft.

HILFE: A nennt Gramm plus Ausbeute-Frage ohne K -> Verfahren (i), Mol. B nennt K_c plus Momentankonzentrationen -> Verfahren (ii), Q.【选程序：题干出现 g / mL / mol / limitierend / Ausbeute 选配比程序；出现 K_c / Q / verschiebt / Gleichgewicht 选平衡程序。】

ANTWORT: A erfordert Verfahren (i): n(Mg) = 5.00/24.3 = 0.206 mol, n(O2) = 5.00/32.0 = 0.156 mol; n/Coeff: 0.206/2 = 0.103 gegen 0.156/1 = 0.156, also Mg limitierend; n(MgO) = 0.206 mol ergibt m = 0.206 mal 40.3 = 8.30 g. B erfordert Verfahren (ii): Q = (1.0)^2 / (1.0 mal (1.0)^3) = 1.0; Q = 1.0 ist groesser als K_c = 0.50, daher laeuft das System rueckwaerts nach links.

Klausur-Satz: `Mengenfragen verlangen n und Koeffizientenvergleich, Gleichgewichtsfragen verlangen Q gegen K.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die Merkhilfe der Stoechiometrie und was ist die Drehscheibe n? | ANTWORT: Erst ausgleichen, dann alles in n = m/M = cV umrechnen und im Verhaeltnis der Koeffizienten umsetzen; n verbindet Masse, Volumen und Gleichung.
FRAGE: Wie findet man das limitierende Reagenz und die Ausbeute? | ANTWORT: Fuer jedes Reagenz n durch Koeffizient teilen, der kleinste Wert ist limitierend; Ausbeute = reale Masse durch theoretische Masse mal 100 Prozent.
FRAGE: Wie lautet das MWG und wie deutet man Q gegen K? | ANTWORT: K_c = Produkt hoch Koeffizient durch Edukt hoch Koeffizient; Q kleiner als K laeuft vorwaerts, Q groesser als K laeuft rueckwaerts, Q gleich K ist im Gleichgewicht.

Klausur-Satz: `Mit n als Drehscheibe, Koeffizienten als Verhaeltnis und Q gegen K ist jede EF-Rechnung geschlossen.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"质量可以直接按系数比换算，谁给得多谁就多产"。
   中文纠偏：系数比只对物质的量成立，不对质量成立，因为每种物质摩尔质量不同。必须先全部"归 n"，比完系数再换回质量；直接拿克数比系数，限量判断必错。
   Korrektur-Satz: `Das Koeffizientenverhaeltnis gilt nur fuer Stoffmengen, daher muss jede Masse erst in n umgerechnet werden.`

2. 误解"K_c 表达式里固体纯物质也要写进去，浓度越大 K 越大"。
   中文纠偏：纯固体与纯液体的浓度视为常数，已并入 K，不写入表达式；K 只随温度变，不随浓度变。浓度改变只改变 Q，系统用移动来把 Q 拉回 K，K 本身不动。
   Korrektur-Satz: `Reine Feststoffe erscheinen nicht in K_c, und K_c haengt nur von der Temperatur ab, nicht von den Konzentrationen.`

## Schritt 7 — szenario

ROLLE: Du bist Praktikant in der Batteriefertigung und pruefst eine NCM-Charge.
SITUATION: Geliefert wurden 10.0 mol Ni-, 10.0 mol Co- und 12.0 mol Mn-Salz fuer eine Faellgleichung mit Koeffizienten 1:1:1 zum NCM-Precursor. Die Schichtleitung fragt, welche Komponente limitiert, wie viel Precursor maximal entsteht und wie das CO2-Abziehen beim Brennen per MWG wirkt. Antworte in einer zusammenhaengenden Darstellung (ca. 150 Woerter).
AUFGABE: Schreibe eine Klausur-Antwort mit n/Coeff-Vergleich, Ertragsrechnung und Q-gegen-K-Urteil.
RUBRIC (30 XP): Korrekter Limit-Nachweis per n durch Koeffizient (10 XP) | Ertrag aus dem knappsten Partner plus Ausbeute-Deutung (10 XP) | MWG-Urteil: Q kleiner als K laeuft zum Produkt (10 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：计算题默念"先配平、归 n、比系数"：质量体积先变 n = m/M = cV，n 除以系数最小者限量，再按系数比求目标，最后实际除以理论得产率。平衡题另起一行写 K_c = 产物幂积除以反应物幂积，算 Q 与 K 比大小定方向。固体不进 K，K 只随温度变。NCM 配比就是工业限量题——缺谁全线停谁。
Takeaway-Satz: `Erst ausgleichen, dann in n umrechnen, im Koeffizientenverhaeltnis umsetzen und zuletzt mit Q gegen K ueberpruefen.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Ertragsrechnung mit n und Ausbeute (Schritt 4) oder die Wahl zwischen Stoechiometrie- und MWG-Verfahren (Schritt 5)?
2. 元认知计划：Beim naechsten Mal gleiche ich zuerst aus, rechne alles in n um und frage dann, ob nach Menge oder nach Q gegen K gefragt ist.
