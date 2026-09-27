---
fach: Mathe
thema: "Ganzrationale Funktionen im Sachkontext"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, eroertern]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Ganzrationale Funktionen im Sachkontext (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 12/33 | Krise: Kuehlhaus-Temperatur driftet auf -13,2 Grad | Zielgroessen: G(x) mit Break-even und Gewinnmaximum, Menge x in Stück | Tool: formula -->

## Schritt 1 — entdecken: Gewinnzone im Sachkontext
ZIELE (3条，本节20分钟学完能做到——先读中文，再记德语)：

1. 中文：能把企业故事翻译成函数：收入 E(x)、成本 K(x)、利润 G(x)=E(x)-K(x)，x 为产量（ME），函数值为钱（GE），并写出 Definitionsmenge。
2. 中文：能用 ganzrationale Funktionen 求盈亏平衡点（Nullstellen von G）、最高利润（Hochpunkt von G）与最快增长处（Wendepunkt）。
3. 中文：能结合图像 eroertern 哪个产量区间值得生产，并写出带单位的德语标准结论句（AFB II-III）。

### Hook / Phaenomen

成本是曲线，售价是直线：两线之间夹着利润区，盈亏平衡点只是起点，利润最大点才是终点。

Hook / Phaenomen: Die Kosten steigen kurvig, der Preis bleibt linear: Irgendwo dazwischen liegt die Gewinnzone. Die **Gewinnfunktion** zieht Kosten von Erloes ab, der **Break-even-Punkt** markiert die schwarze Null. Erst das **Gewinnmaximum** sagt, welche Menge wirklich optimal ist.

`Klausur-Satz: Im Sachkontext wird jede Nullstelle oekonomisch gelesen: Break-even ist Kostendeckung, Maximum ist optimale Menge.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语）：

中文在上，德语在下：

- 产量与货币单位 — Mengeneinheit (ME) und Geldeinheit (GE)：x in ME misst die Menge, f(x) in GE misst das Geld; jede Achse braucht Einheiten. x in ME zaehlt die Stuecke, f(x) in GE zaehlt das Geld. Mechanismus: Achsen mit ME und GE beschriften und D festlegen. Klausur-Tipp: Einheiten bei jedem Wert mitfuehren.
- 收入函数 — Erloesfunktion E(x)：Verkaufserloes in Abhaengigkeit von der Menge, oft linear wie E(x) = p mal x. Er waechst proportional zur Menge mit Preis p als Steigung. Mechanismus: Preis mal Menge als Gerade ansetzen. Klausur-Tipp: E(x)-Term mit Preis und Einheit nennen.
- 成本函数 — Kostenfunktion K(x)：Gesamtkosten aus fixen plus variablen Anteilen, oft ganzrational dritten Grades. Sie addiert Fixkosten und variable Kosten zu einer S-Kurve. Mechanismus: Fixkosten plus variable Kosten gliedweise addieren. Klausur-Tipp: K(x)-Term mit Gradbegruendung nennen.
- 利润函数 — Gewinnfunktion G(x)：G(x) = E(x) - K(x); G(x) > 0 bedeutet Gewinnzone, G(x) = 0 bedeutet Break-even. Sie entsteht als Erloes minus Kosten und traegt die Einheit Euro. Mechanismus: Erloesfunktion minus Kostenfunktion gliedweise bilden. Klausur-Tipp: Funktionsterm plus Einheit in der Antwort nennen.
- 现实定义域 — Sachnahe Definitionsmenge：z. B. D = [0; 20] ME aus Kapazitaet; Rechnung ausserhalb von D ist oekonomisch sinnlos. Negative Stueckzahlen sind oekonomisch sinnlos und werden ausgeschlossen. Mechanismus: Sinnvolle Grenzen aus dem Kontext ablesen. Klausur-Tipp: Definitionsmenge vor der Rechnung festlegen.

`Klausur-Satz: Die Nullstellen von G(x) = E(x) - K(x) liefern die Break-even-Punkte, der Hochpunkt liefert den maximalen Gewinn.`

## Schritt 3 — entdecken: Wirkungskette hinter Ganzrationale Funktionen im Sachkontext
ENTDECKEN（1概念 + 1文字图解）：

中文：一家小厂的故事足以串起整课。单价固定，收入就是一条直线 E(x)=px；成本则先降后升（大规模分摊固定成本，超产后加班涨价），常用三次函数 K(x) 拟合。两者相减得利润 G(x)=E(x)-K(x)，仍是三次函数。G 的零点是盈亏平衡：低于它亏，高于它赚；G 的峰是最大利润；G 的拐点是利润增长最快的产量。图像上直线与曲线的两次相交围出 Gewinnzone。所有结论只在 Kapazitaet 区间 D 内有效，超出就没意义。

德语在下：Sei E(x) = 12x in GE und K(x) = 0.5x^3 - 6x^2 + 26x + 8 in GE auf D = [0; 12] ME. Dann gilt G(x) = E(x) - K(x) = -0.5x^3 + 6x^2 - 14x - 8. Die Nullstellen von G markieren Break-even, der Hochpunkt markiert Maximalgewinn, der Wendepunkt markiert den staerksten Gewinnanstieg.

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
       GE ^
          |      E(x)=12x  /
          |              /      ___ G(x) Gewinnberg
          |            /    .--´   `--.
          |          /   .´             `.
          |  K(x) .´  .´  Gewinnzone     `.
          |   .--´ .´  (G>0 zwischen      `.
          | .´   .´    Break-even 1 und 2)  `.
          +----------------------------------------> x in ME
          0   BE1=4  Wende=4  Hmax~6.58  BE2~8.49   12
       G(x) = E(x) - K(x) | D = [0; 12] ME
       Nullstelle = Break-even | Hochpunkt = Maxgewinn
```

$$G(x) = -0{,}5x^3+6x^2-14x-8,\quad G'(x_B) = 0$$
`Klausur-Satz: Zwischen den beiden Break-even-Punkten gilt G(x) > 0, ausserhalb gilt G(x) < 0 auf der sachnahen Definitionsmenge.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Ein Gruender prahlte mit steigendem Umsatz, doch sein Konto blieb leer. Ein Berater zeichnete E(x) und K(x) in ein Bild und zeigte: die Kurven schneiden sich zweimal, und nur dazwischen liegt die Gewinnzone. Ausserhalb frisst K die E auf. Seitdem plant die Firma jede Menge mit G(x) = E(x) - K(x).

**中文解读**: 创始人空有 rising 销售额却没钱，顾问只画了一张图：收入直线与成本曲线交两次，中间夹出的才是赚钱区间，外面全是亏。利润不是收入，而是收入减成本，这个差值函数 G(x) 才是老板真正的方向盘。

**Bezug zum Konzept**: `Erst die Differenz G(x) = E(x) - K(x) zeigt, in welchem Mengenintervall Produktion lohnt.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Grenzwert am Limit
Kontinuitaet: Vorher Mathe-Ganzrationale-Funktionen-Sachkontext-DE-L1.md | Nachher Mathe-Grenzwert-h-Methode-Ableitung-Stelle-CN-L1.md. Krise dieser Episode: Kuehlhaus-Temperatur driftet auf -13,2 Grad. Zielgroessen: G(x) mit Break-even und Gewinnmaximum, Menge x in Stück

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen, AFB II)：Gegeben sind E(x) = 12x und K(x) = 0.5x^3 - 6x^2 + 26x + 8 auf D = [0; 12] (x in ME, Werte in GE). Bestimmen Sie die Gewinnfunktion G(x), die Break-even-Punkte und die gewinnmaximale Menge.

HILFE:
1. Schritt 1: Gewinnfunktion bilden: G(x) = E(x) - K(x) ausrechnen und Definitionsmenge mit Einheiten notieren.
2. Schritt 2: Break-even als Nullstellen von G suchen: G(x) = 0 mit GTR oder Naeherung loesen.
3. Schritt 3: Maximum als Hochpunkt von G suchen: G'(x) = 0 plus G''(x) und Randwerte auf D pruefen.

MUSTERLÖSUNG / MUSTERLOESUNG: Es gilt G(x) = 12x - (0.5x^3 - 6x^2 + 26x + 8) = -0.5x^3 + 6x^2 - 14x - 8 auf D = [0; 12] ME. Aus G(x) = 0 folgt mit GTR x_BE1 = 4 ME und x_BE2 ~ 8.49 ME; Probe: G(4) = -32 + 96 - 56 - 8 = 0. Weiter gilt G'(x) = -1.5x^2 + 12x - 14 = 0, also x^2 - 8x + 28/3 = 0, somit x ~ 1.42 oder x ~ 6.58. Mit G''(x) = -3x + 12 gilt G''(1.42) > 0 (Tiefpunkt) und G''(6.58) < 0 (Hochpunkt). Mit G(6.58) ~ 17.24 GE, G(0) = -8 GE und G(12) = -128 GE ist x ~ 6.58 ME die gewinnmaximale Menge, die Gewinnzone liegt zwischen 4 ME und 8.49 ME. Der Wendepunkt liegt bei x_W = 4 ME mit W(4 | 0).

`Klausur-Satz: Auf D = [0; 12] ME liegt die Gewinnzone zwischen x = 4 ME und x ~ 8.49 ME, die gewinnmaximale Menge liegt bei x ~ 6.58 ME.`

## Schritt 5 — ausprobieren: Duell der Verfahren Grenzwert am Limit
VERGLEICH辨别实验（图像交点读数 vs. 代数精确算）：

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Wähle erst / Waehele erst das Verfahren — 【选程序】先判断题目要 (i) Graphische Deutung（读交点、读 Gewinnzone、读 Trend，用 Schnittpunkte von E und K）还是 (ii) Rechnerische Bestimmung（算 Nullstellen/Hochpunkt/Wende von G mit Ableitung）—— dann lösen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Skizzieren Sie E(x) = 10x und K(x) = 0.25x^3 - 4x^2 + 20x + 8 auf D = [0; 14] in einem Bild. Lesen Sie die Break-even-Bereiche ab und beschreiben Sie, wo sich E und K schneiden.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Fuer G(x) = -0.25x^3 + 4x^2 - 10x - 8 auf D = [0; 14] berechnen Sie exakt Break-even-Punkte, Hochpunkt und Wendepunkt und deuten Sie jede Stelle oekonomisch.

HILFE: A nennt skizzieren, ablesen, beschreiben -> Verfahren (i), Graph lesen ohne Ableitung.【选程序：题干出现 skizzieren/ablesen/deuten/beschreiben 选图像解读；出现 berechnen/bestimmen Sie exakt plus Hochpunkt/Wende 选代数计算。】B nennt berechnen plus Hochpunkt und Wendepunkt -> Verfahren (ii), Ableitung plus Nachweis.

ANTWORT: A erfordert Verfahren (i): E als Gerade, K als S-Kurve; zwei Schnittpunkte begrenzen die Gewinnzone, links von BE1 und rechts von BE2 liegt Verlustzone, weil K ueber E verlaeuft. B erfordert Verfahren (ii): G(x) = 0 liefert BE-Punkte per GTR, G'(x) = -0.75x^2 + 8x - 10 = 0 liefert Kandidaten, G'' entscheidet Hoch versus Tief, G'' = 0 plus VZW liefert Wende als staerksten Anstieg; jede Stelle erhaelt Einheiten ME und GE plus Satz im Kontext.

`Klausur-Satz: Die graphische Deutung liest Gewinnzonen an Schnittpunkten ab, die rechnerische Bestimmung sichert sie mit Ableitung und Einheiten.`

## Schritt 6 — check: Selbsttest zu Ganzrationale Funktionen im Sachkontext: Grenzwert am Limit
CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Wie haengen E(x), K(x) und G(x) zusammen und welche Einheiten tragen sie? | ANTWORT: Es gilt G(x) = E(x) - K(x), x in ME, alle Funktionswerte in GE, auf sachnaher Definitionsmenge D.
- FRAGE: Was bedeuten Nullstelle, Hochpunkt und Wendepunkt von G oekonomisch? | ANTWORT: Nullstelle ist Break-even, Hochpunkt ist Maximalgewinn, Wendepunkt ist staerkster Gewinnanstieg.
- FRAGE: Warum darf D nicht ignoriert werden? | ANTWORT: Weil Kapazitaet und negative Mengen unrealistisch sind; Aussagen ausserhalb von D sind oekonomisch ungueltig.

`Klausur-Satz: Jede Aussage im Sachkontext braucht Definitionsmenge D plus Einheiten ME und GE.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解“收入涨了利润一定涨，盯着 E 就够了”。
   中文纠偏：利润是差 G=E-K。E 涨时 K 可能涨更快（如加班成本），G 反而跌。必须分析 G 的单调与极值，而不是 E 的单调。图像上 E 在涨，G 的山峰却可能已过。
   Korrektur-Satz: `Nicht der Anstieg von E, sondern Verlauf und Extrema von G(x) = E(x) - K(x) entscheiden ueber Gewinn.`

2. 误解“算出零点和极值就满分，单位和区间无所谓”。
中文纠偏：Sachkontext 的一半分数在 D + ME/GE + Antwortsatz。无单位的数字在 Klausur 算“未解读”。标准结尾三件套：D=[..] ME、x=.. ME、G=.. GE，再加一句“zwischen ..

und .. lohnt Produktion”。
   Korrektur-Satz: `Ohne Definitionsmenge, Einheiten ME und GE sowie Antwortsatz gilt eine Sachkontext-Loesung als unvollstaendig.`

## Schritt 7 — szenario: Klausurtransfer: Ganzrationale Funktionen im Sachkontext: Grenzwert am Limit
ROLLE: Du bist Junior-Controller in einem Startup.
SITUATION: E(x) = 15x, K(x) = 0.4x^3 - 5x^2 + 28x + 15, D = [0; 15] ME, Werte in GE. Die Chefin will wissen, ab wann sich Produktion lohnt, wo der Gewinn maximal ist und ob eine Ausweitung ueber 12 ME hinaus sinnvoll bleibt. Schreibe eine Stellungnahme (ca. 150 Woerter) mit Rechnung und oekonomischer Deutung.
AUFGABE (eroertern, AFB III)：Eroertere auf Basis von Break-even, Hochpunkt und Grenze von D, welche Mengenintervalle zu empfehlen sind.
RUBRIC (30 XP): G(x) plus D mit Einheiten korrekt (5 XP) | Break-even korrekt berechnet (10 XP) | Hochpunkt plus Wende korrekt (10 XP) | Eroerterung mit Empfehlung fuer Intervalle (5 XP).

`Klausur-Satz: Wer Gewinnfunktion aufstellt, Break-even berechnet, Maximum bestimmt und oekonomisch deutet, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Grenzwert am Limit
TAKEAWAY 1盒（核心总结）：

中文：Sachkontext 三步走：建模 G=E-K 加 D（ME/GE）、计算零点峰点拐点、解读区间。零点管盈亏平衡，峰管最大利润，拐点管增长最快。图像是直线 E 切/交 S 形 K，代数靠求导。结尾必带单位与现实建议。
Takeaway-Satz: `Modelliere G(x) = E(x) - K(x) auf D, berechne Nullstellen, Extrema und Wende und deute jedes Ergebnis mit ME und GE.`

REFLEXION 2问：
1. 过程自省：Welcher Teil fiel schwerer — das Aufstellen von G(x) mit Einheiten (Schritt 4) oder die Wahl zwischen Deutung und Rechnung im Vergleich (Schritt 5)?
2. 元认知计划：Beim naechsten Mal notiere ich zuerst D, ME und GE und formuliere zu jedem Rechenergebnis sofort einen Antwortsatz.

`Klausur-Satz: Mathematik liefert Zahlen, der Kontext liefert Sinn: Keine Deutung ohne Einheit und Bezug.`
