---
fach: Chemie
thema: "Saeure-Base-Gleichgewichte und pH-Wert"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Saeure-Base]
version: Lesson-v3
---

# Lernreise: Saeure-Base-Gleichgewichte und pH-Wert (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用 Brønsted 理论写出质子转移方程，并指出共轭酸碱对。
2. 中文：能用 pH = -lg[H3O+] 与 pH + pOH = 14 完成对数计算，并说明"稀释 10 倍 pH 升 1"。
3. 中文：能用三段式算弱酸电离，写出 c(H3O+) 并检验近似 x/c0 < 5 %。

Klausur-Satz: `Der pH-Wert ist der negative dekadische Logarithmus der Oxoniumionenkonzentration; er ändert sich um eine Einheit, wenn sich die Konzentration um den Faktor 10 ändert.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 质子转移 — Protolyse：酸把质子（H+）交给碱，形成共轭酸碱对。
- 共轭酸碱对 — korrespondierendes Säure-Base-Paar：酸失去质子后变成其共轭碱（如 HCl / Cl-）。
- 水离子积 — Ionenprodukt des Wassers Kw：Kw = [H3O+] * [OH-] = 1,0 * 10^-14 (mol/L)^2（25 °C）。
- pH 值 — pH-Wert：pH = -lg[H3O+]，是负常用对数标度，1 个单位对应 10 倍浓度差。
- 酸常数 — Säurekonstante K_S：K_S = [A-] * [H3O+] / [HA]，K_S 越大酸性越强。

Klausur-Satz: `Eine Säure ist nach Brønsted ein Protonendonator, eine Base ein Protonenakzeptor; jede Protolyse verläuft als Gleichgewicht.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：酸碱化学的本质是"质子（H+）搬家"。酸是给出质子的那方，碱是接收质子的那方；一个酸给出质子后就变成它的共轭碱，两者构成一对。水既能当酸又能当碱（两性），它会自耦电离出 H3O+ 和 OH-，两者浓度乘积恒为 1,0 * 10^-14，所以中性溶液里两者都是 10^-7 mol/L。pH 就是给 H3O+ 浓度"取负对数"：浓度 10^-3 对应 pH 3，浓度 5 * 10^-3 对应 pH 2,30。这里最关键的分水岭是强酸与弱酸：强酸几乎 100 % 电离，[H3O+] 直接等于初始浓度，一步 -lg 就完事；弱酸只部分电离，必须走平衡三段式，用 K_S 解出 x 再取对数。做题第一步永远是"先看强弱，再选公式"。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
pH-Skala (25 C)         c(H3O+) in mol/L
  0  |#####| sauer        1,0 * 10^0
  1  |#### |              1,0 * 10^-1     <-- 每降 1 单位 = 浓度 x10
  2  |###  |              1,0 * 10^-2
  2,30|## |   HCl 0,005    5,0 * 10^-3   <-- pH = -lg(5*10^-3)
  2,87|## |   HAc 0,10     1,34 * 10^-3  <-- schwach, aus K_S
  7  |----| neutral        1,0 * 10^-7
 14  |     | basisch        1,0 * 10^-14

  Merke:  pH + pOH = 14  (nur bei 25 C)
  stark:  pH = -lg(c0)          schwach: K_S = x^2/(c0 - x)
```

四张公式卡（背下来直接套）：
1. 强酸：pH = -lg(c0)，因为 [H3O+] = c0。
2. 强碱：pOH = -lg(c0)，pH = 14 - pOH。
3. 水离子积：Kw = [H3O+] * [OH-] = 1,0 * 10^-14，所以 pH + pOH = 14（25 °C）。
4. 弱酸：K_S = x^2 / (c0 - x)，近似后 pH = -lg(x)，并用 x/c0 < 5 % 检验。

对数速算技巧：-lg(a * 10^-n) = n - lg(a)。例如 -lg(5 * 10^-3) = 3 - 0,70 = 2,30；-lg(2 * 10^-3) = 3 - 0,30 = 2,70。把常用 lg2 = 0,30、lg5 = 0,70 记住，考场上不用计算器也能估。

中性化计算：酸与碱按物质的量相等反应，n(H3O+) = n(OH-)，即 c1 * V1 = c2 * V2。强酸 + 强碱恰好中和时 pH = 7；弱酸 + 强碱则因生成共轭碱而使溶液偏碱性。

Klausur-Tipp：弱酸题的得分点顺序是"判断强弱 → 列三段式 → 代入 K_S → 解 x → 求 pH → 检验近似"。其中检验 x/c0 < 5 % 单独占分，漏掉这一步即使结果正确也会被扣分，务必写出来。

常见追问："pH 4 的盐酸稀释 10 倍后 pH 是多少？"答：强酸稀释 10 倍，浓度降为原来的 1/10，pH 上升 1 个单位，即 pH 5。记住对数尺的这条直觉，很多判断小题可以直接秒答。

Klausur-Satz: `Während eine starke Säure in wässriger Lösung nahezu vollständig dissoziiert und pH = -lg(c0) gilt, stellt sich bei einer schwachen Säure ein Protolysegleichgewicht ein, das über K_S berechnet wird.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der pH-Wert wurde von dem dänischen Chemiker Sørensen eingeführt, der damit die Acidität beim Bierbrauen kontrollieren wollte. Weil die Konzentrationen der Oxoniumionen über einen sehr weiten Bereich schwanken, wählte er eine logarithmische Skala statt der rohen Zahlenwerte. Was der Buchstabe p genau bedeutet, ist bis heute umstritten; die Zahlen von 0 bis 14 sind dagegen reine Konvention.

**中文解读**: pH 之所以是对数尺，是因为 H3O+ 浓度能横跨十几个数量级，用线性刻度根本无法比较。理解了这一点，"稀释 10 倍 pH 升 1"和"强酸弱酸差几个 pH"就都成了自然结论。

**Bezug zum Konzept**: Die logarithmische pH-Skala wurde gewählt, weil die Oxoniumionenkonzentration über viele Zehnerpotenzen variiert.

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen, AFB II)：Berechnen Sie den pH-Wert einer Salzsäurelösung mit c0 = 0,005 mol/L sowie einer Essigsäurelösung mit c0 = 0,10 mol/L (K_S = 1,8 * 10^-5 mol/L). Begründen Sie, warum für beide Säuren unterschiedliche Ansätze nötig sind, und prüfen Sie bei der Essigsäure die Näherung x/c0 < 5 %.

HILFE:
1. Schritt 1: Entscheide zuerst, ob die Säure stark oder schwach ist (pK_S-Wert bzw. K_S).
2. Schritt 2: Bei der starken Säure gilt [H3O+] = c0; setze direkt in pH = -lg[H3O+] ein.
3. Schritt 3: Bei der schwachen Säure stelle die Dreisatztabelle auf: Start c0 / 0 / 0; Änderung -x / +x / +x; Gleichgewicht c0 - x / x / x.
4. Schritt 4: Setze in K_S = x^2 / (c0 - x) ein, nutze die Näherung c0 - x ungefähr c0, und prüfe x/c0 < 5 %.

MUSTERLÖSUNG: Salzsäure ist eine sehr starke Säure (pK_S etwa -6) und dissoziiert vollständig, daher gilt [H3O+] = c0 = 0,005 mol/L = 5,0 * 10^-3 mol/L. Es folgt pH = -lg(5,0 * 10^-3) = -(0,70 - 3) = 2,30. Essigsäure ist dagegen eine schwache Säure; mit der Dreisatztabelle gilt K_S = x^2 / (0,10 - x). Mit der Näherung 0,10 - x ungefähr 0,10 folgt x^2 = 1,8 * 10^-5 * 0,10 = 1,8 * 10^-6, also x = 1,34 * 10^-3 mol/L. Damit ist pH = -lg(1,34 * 10^-3) = 3 - 0,13 = 2,87. Die Kontrolle ergibt x/c0 = 1,34 * 10^-3 / 0,10 = 0,013, also 1,3 % < 5 %, die Näherung ist zulässig. Obwohl Essigsäure die zehnfache Ausgangskonzentration hat, ist ihr pH nur wenig niedriger als der der Salzsäure, weil sie nur zu etwa 1,3 % dissoziiert.

Klausur-Satz: `Bei gleicher Ausgangskonzentration liefert eine starke Säure einen deutlich niedrigeren pH-Wert als eine schwache Säure, da nur die starke Säure vollständig protoniert vorliegt.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：强酸眼 vs. 弱酸眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目给的是 (i) starke-Säure-Verfahren（pK_S sehr klein, vollständige Dissoziation, pH = -lg(c0)）还是 (ii) schwache-Säure-Verfahren（K_S gegeben, Gleichgewicht, Dreisatztabelle）—— dann lösen.

AUFGABE A：Eine Salpetersäurelösung (HNO3) hat die Konzentration c0 = 0,010 mol/L. Berechnen Sie den pH-Wert.

AUFGABE B：Eine wässrige Lösung einer schwachen Säure HA (K_S = 4,0 * 10^-7 mol/L) hat die Konzentration c0 = 0,20 mol/L. Berechnen Sie den pH-Wert und begründen Sie, ob die Näherung zulässig ist.

HILFE: A nennt eine starke Säure ohne K_S-Wert; sie dissoziiert vollständig → Verfahren (i). B nennt ausdrücklich einen K_S-Wert und verlangt eine Näherungsprüfung → Verfahren (ii).【选程序：题目只给 c0、酸属强酸 = 强酸程序（直接 -lg）；题目给 K_S、酸属弱酸 = 弱酸程序（三段式 + 检验）。】

ANTWORT: A erfordert Verfahren (i): HNO3 dissoziiert vollständig, also gilt [H3O+] = c0 = 0,010 mol/L = 1,0 * 10^-2 mol/L und pH = -lg(1,0 * 10^-2) = 2,00. B erfordert Verfahren (ii): Mit K_S = x^2 / (0,20 - x) und der Näherung 0,20 - x ungefähr 0,20 folgt x^2 = 4,0 * 10^-7 * 0,20 = 8,0 * 10^-8, also x = 2,83 * 10^-4 mol/L. Damit ist pH = -lg(2,83 * 10^-4) = 4 - 0,45 = 3,55. Die Kontrolle ergibt x/c0 = 2,83 * 10^-4 / 0,20 = 0,0014, also 0,14 % < 5 %, die Näherung ist zulässig.

Klausur-Satz: `Nur bei vollständiger Dissoziation gilt pH = -lg(c0); bei einer schwachen Säure muss die Oxoniumionenkonzentration zuerst über das Protolysegleichgewicht bestimmt werden.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die Definition des pH-Wertes? | ANTWORT: pH = -lg[H3O+], also der negative dekadische Logarithmus der Oxoniumionenkonzentration.
FRAGE: Warum gilt für eine starke Säure [H3O+] = c0? | ANTWORT: Weil sie in wässriger Lösung nahezu vollständig dissoziiert (Dissoziationsgrad etwa 100 %).
FRAGE: Welche Bedingung muss eine Näherung c0 - x ungefähr c0 erfüllen? | ANTWORT: Der Umsatz x muss klein gegen c0 sein, geprüft durch x/c0 < 5 %.

Klausur-Satz: `Der pH-Wert folgt aus der Oxoniumionenkonzentration über den negativen dekadischen Logarithmus.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"pH 3 只比 pH 5 酸一点点"。
   中文纠偏：pH 是对数标度，差 1 个单位就是 10 倍浓度差，差 2 个单位是 100 倍。pH 3 的 H3O+ 浓度是 pH 5 的 100 倍，绝不能用"线性"直觉去比较。
   Korrektur-Satz: `Da der pH-Wert logarithmisch definiert ist, entspricht ein Unterschied von zwei pH-Einheiten dem Faktor 100 in der Oxoniumionenkonzentration.`

2. 误解"弱酸的 pH 也用 pH = -lg(c0) 算"。
   中文纠偏：绝对不行。弱酸只部分电离，[H3O+] 远小于 c0；必须用 K_S 走三段式解出 x。若直接代入 c0，会把 pH 算得偏低好几个量级，这是弱酸题最常见的知识性错误。
   Korrektur-Satz: `Bei einer schwachen Säure ist [H3O+] deutlich kleiner als c0; die Konzentration muss deshalb über K_S aus dem Protolysegleichgewicht bestimmt werden.`

## Schritt 7 — szenario

ROLLE: Du bist Praktikant im Schullabor und sollst eine Säure-Base-Titration vorbereiten und auswerten.
SITUATION: Es liegen 100 mL Salzsäure mit c0 = 0,005 mol/L vor. Diese sollen mit Natronlauge (c = 0,02 mol/L) vollständig neutralisiert werden. Berechne das benötigte Volumen der Natronlauge, erläutere die Bedingung am Äquivalenzpunkt und begründe, warum der pH-Wert am Äquivalenzpunkt bei 7 liegt. Verfasse eine zusammenhängende Auswertung (ca. 150 Wörter).
RUBRIC (30 XP): Aufstellen der Neutralisationsgleichung HCl + NaOH -> NaCl + H2O (5 XP) | Stoffmengenansatz c1 * V1 = c2 * V2 und Berechnung V2 = 25 mL (10 XP) | Bedingung am Äquivalenzpunkt n(H3O+) = n(OH-) (8 XP) | Begründung pH = 7 wegen vollständiger Neutralisation durch starke Säure und starke Base (7 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：酸碱题的解题顺序只有三步——先判强弱，再选公式，最后检验。强酸强碱走一步式：pH = -lg(c0)，pOH = -lg(c0)，pH + pOH = 14。弱酸弱碱走平衡式：列三段式，K_S = x^2/(c0 - x)，近似后必须检验 x/c0 < 5 %。永远记住 pH 是对数尺，浓度差 10 倍 = pH 差 1。中性化计算则抓住"物质的量相等"这一条。
Takeaway-Satz: `Die pH-Berechnung beginnt mit der Entscheidung stark oder schwach; erst danach folgt der passende Ansatz, und jede Näherung wird überprüft.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Logarithmusrechnung in Schritt 4 oder die Entscheidung starke oder schwache Säure in Schritt 5?
2. 元认知计划：Beim nächsten Mal lese ich zuerst, ob ein K_S-Wert gegeben ist, und wähle danach zwischen Ein-Schritt-Formel und Dreisatztabelle.
