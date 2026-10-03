---
fach: Mathe
thema: "Stochastik: Bernoulli-Ketten, Binomialkoeffizient und Binomialverteilung"
level: 1
ziel: Klausur
xp: 100
operatoren: [herleiten, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Mathe, Stochastik, Bernoulli-Kette, Binomialkoeffizient, Binomialverteilung, Wahrscheinlichkeitsrechnung]
version: Lesson-v3
---

# Lernreise: Stochastik: Bernoulli-Ketten, Binomialkoeffizient und Binomialverteilung (L1, Ziel Klausur)

<!-- Campaign: Stochastik-und-Wahrscheinlichkeitsrechnung | Episode 3/10 | Krise: Wie berechnet man Trefferchancen im unendlichen Wahrscheinlichkeitsbaum? | Zielgroessen: Bernoulli-Experiment, Binomialkoeffizient, n ueber k, Erwartungswert, Standardabweichung | Tool: lego -->

## Schritt 1 — entdecken: Der Baum, der den Wald vor lauter Aesten nicht sieht
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清伯努利试验（Bernoulli-Experiment）与伯努利链（Bernoulli-Kette）的严格数学定义（二元结果、概率独立不变）。
2. 中文：能透彻推导二项式系数组合公式（Binomialkoeffizient: $\binom{n}{k} = \frac{n!}{k!(n-k)!}$）与伯努利概率分布公式（Formel von Bernoulli: $B(n,p,k) = \binom{n}{k} \cdot p^k \cdot (1-p)^{n-k}$）。
3. 中文：能在离散型随机变量实考大题（AFB I/II/III）中秒杀期望值（$\mu = n \cdot p$）、方差（$\sigma^2$）与累积分布概率（kumulierte Wahrscheinlichkeiten: "mindestens", "hoechstens", "genau"）。

### Hook / Phaenomen

你现在手中有一枚质地均匀的硬币，抛出正面的概率是准确的 $p = 0,5$。如果只抛 3 次，你可以轻松在草稿纸上画出一棵拥有 $2^3 = 8$ 条分叉的概率树状图，一眼就能数出“恰好出现 2 次正面”的概率是 $\frac{3}{8}$。但如果全班 30 名同学每人抛一次硬币，或者一家制药公司在临床试验中给 100 名重症患者测试治愈率为 $80\%$ 的新药呢？要想画出 100 次试验的完整树状图，树枝的总分叉数量将高达 $2^{100} \approx 1,26 \times 10^{30}$ 条——这比全宇宙所有沙滩上的沙子总数还要多出一万亿倍！面对这种算力黑洞，瑞士数学家雅各布·伯努利（Jakob Bernoulli）在 300 年前微微一笑，用一个极其精妙的数学组合学剪刀，硬生生把这棵遮天蔽日的无限大树压缩进了一张火柴盒大小的公式里！

Hook / Phaenomen: Wirfst du eine Muenze 3 Mal, hat dein Baumdiagramm handliche 8 Pfade. Wirfst du sie jedoch 100 Mal, explodiert die Anzahl der Pfade auf unvorstellbare $2^{100} \approx 1,26 \times 10^{30}$ Aeste — mehr als alle Sandkoerner der Erde! Wolltest du die Wahrscheinlichkeit fuer "genau 50 Mal Kopf" durch blosses Baumzeichnen ermitteln, wuerde die Tinte deines Stiftes bis zum Ende des Universums nicht reichen! Der Basler Mathematiker Jakob Bernoulli fand 1713 einen genialen Ausweg: Statt jeden Ast einzeln abzugehen, erkannte er das symmetrische Prinzip der Kombinatorik: Der **Binomialkoeffizient $\binom{n}{k}$** zaehlt alle Pfade mit exakt $k$ Treffern in Bruchteilen einer Sekunde ab. Mit der **Formel von Bernoulli** wird die Stochastik von der unendlichen Fleissarbeit zur hoechsten mathematischen Eleganz.

`Klausur-Satz: Eine n-stufige Bernoulli-Kette modelliert ein Zufallsexperiment mit exakt zwei komplementaeren Ausgaengen unter konstanter Erfolgswahrscheinlichkeit p, wobei die Binomialverteilung $B(n,p,k)$ die Trefferwahrscheinlichkeit analytisch bestimmt.`

## Schritt 2 — entdecken: Ausruestungskiste der Stochastik-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 伯努利试验与伯努利链 — Bernoulli-Experiment & Kette: 只有两种互斥结果（成功 $E$ 与失败 $\bar{E}$）的随机试验；将该试验独立重复进行 $n$ 次且每次成功概率 $p$ 严格保持不变的序列称为 $n$ 阶伯努利链。 Ein Zufallsexperiment mit exakt zwei Ausgaengen (Treffer / Niete). Mechanismus: Stochastische Unabhaengigkeit: Die Trefferwahrscheinlichkeit $p$ aendert sich von Stufe zu Stufe nicht ($q = 1-p$). Klausur-Tipp: Immer zuerst die zwei Bedingungen pruefen: 1. Nur 2 Ausgaenge? 2. Ziehen MIT Zuruecklegen?
- 二项式系数 — Binomialkoeffizient ($\binom{n}{k}$ "n ueber k"): 从 $n$ 个不同元素中无序抽取 $k$ 个元素的组合数；在树状图中代表含有恰好 $k$ 次成功的不同路径总数。 Die Anzahl der Moeglichkeiten, aus $n$ Stufen genau $k$ Treffer auszuwaehlen: $\binom{n}{k} = \frac{n!}{k! \cdot (n-k)!}$. Mechanismus: Zaehlt die Pfade im Wahrscheinlichkeitsbaum ab, die denselben Pfadwert besitzen. Klausur-Tipp: Symmetrie beachten: $\binom{n}{k} = \binom{n}{n-k}$!
- 伯努利公式 — Formel von Bernoulli ($P(X = k)$): 随机变量 $X$ 恰好取得 $k$ 次成功的概率计算公式：$P(X = k) = \binom{n}{k} \cdot p^k \cdot (1-p)^{n-k}$。 Die explizite Wahrscheinlichkeitsfunktion einer binomialverteilten Zufallsgroesse $X \sim B(n,p)$. Mechanismus: Pfadanzahl $\times$ Einzeltreffer $\times$ Einzelnieten. Klausur-Tipp: Bei "genau $k$" ist die Punktwahrscheinlichkeit gemeint!
- 期望值与标准差 — Erwartungswert ($\mu$) & Standardabweichung ($\sigma$): 二项分布的理论平均中心位置 $\mu = n \cdot p$，以及衡量数据围绕均值离散分散程度的指标 $\sigma = \sqrt{n \cdot p \cdot (1-p)}$。 Kennzahlen der Binomialverteilung: $\mu = n \cdot p$ (Schwerpunkt des Histogramms); $\sigma = \sqrt{n \cdot p \cdot q}$ (Breite der Streuung). Klausur-Tipp: Wenn $\sigma > 3$, ist die Verteilung glockenfoermig (Laplace-Bedingung erfuellt)!
- 累积概率 — Kumulierte Wahrscheinlichkeit ($P(X \le k)$): 成功次数在某个取值区间内的总概率之和（如“最多 $k$ 次”、“至少 $k$ 次”）。 Die Summe mehrerer Punktwahrscheinlichkeiten: $P(X \le k) = \sum_{i=0}^k B(n,p,i)$. Mechanismus: Gegenereignis-Regel nutzen: $P(X \ge k) = 1 - P(X \le k-1)$! Klausur-Tipp: Wortlaut genau lesen: "mindestens 3" bedeutet $P(X \ge 3) = 1 - P(X \le 2)$!

`Klausur-Satz: Bei der Interpretation von Aufgabentexten signalisiert "hoechstens k" die kumulierte Wahrscheinlichkeit $P(X \le k)$, waehrend "mindestens k" ueber das Gegenereignis $1 - P(X \le k-1)$ berechnet werden muss.`

## Schritt 3 — entdecken: Die Architektur des Binomial-Histogramms
ENTDECKEN（1概念 + 1文字图解）：

中文：二项分布直方图展示了随成功次数 $k$ 变化的概率立柱：
- 当 $p = 0,5$ 时，直方图关于期望值 $\mu = \frac{n}{2}$ 呈现完美的轴对称！
- 当 $p < 0,5$ 时，图形向左侧倾斜（rechtsschief）；当 $p > 0,5$ 时，图形向右侧倾斜（linksschief）。
- 随着试验次数 $n$ 不断增大，直方图的轮廓逐渐平滑拟合为著名的**高斯正态分布钟形曲线**（Gaußsche Glockenkurve）！

文字图解（ASCII 二项分布柱状图与 $\sigma$-Umgebungen）：

```diagram
Histogramm einer symmetrischen Binomialverteilung (z.B. n = 20, p = 0,5):

  Wahrscheinlichkeit P(X=k)
       ^
       |                      [ Erwartungswert mu = 10 ]
   0,18|                                | |
   0,15|                              | | | |
   0,12|                            | | | | | |
   0,09|                          | | | | | | | |
   0,06|                        | | | | | | | | | |
   0,03|                    | | | | | | | | | | | | | |
      0+--------------------+-------------------------+-------------> k (Treffer)
       0         4          8       10        12         16       20
                            |<-- 1*sigma -->|
                            (ca. 68,3% aller Daten)
```

`Klausur-Satz: In der 1-Sigma-Umgebung $[\mu - \sigma; \mu + \sigma]$ einer Binomialverteilung liegen bei erfuellter Laplace-Bedingung ca. 68,3 Prozent der Gesamtwahrscheinlichkeit.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wusstest du, dass die Familie Bernoulli aus Basel die genialste, aber auch die unertraeglich streitsuechtigste Dynastie der Wissenschaftsgeschichte war? Jakob Bernoulli (Erfinder der Bernoulli-Verteilung) lieferte sich mit seinem juengeren Bruder Johann Bernoulli einen jahrelangen, oeffentlichen Krieg in mathematischen Journalen! Sie veroeffentlichten gegenseitig teuflisch schwere mathematische Raetsel, beschimpften sich in Flugblaettern als Scharlatane und weigerten sich, am selben Tisch zu sitzen. Als Jakobs Meisterwerk *"Ars Conjectandi"* (Die Kunst des Vermutens) 1713 posthum erschien, revolutionierte es die gesamte Weltwirtschaft, Versicherungsmathematik und moderne KI — und bewies, dass selbst unbaendiger Familienhass die mathematische Genialitaet nicht aufhalten konnte!

**中文解读**: 数学史上最天才、但脾气也最火爆奇葩的家族当属瑞士的伯努利家族。发明伯努利公式的哥哥雅各布·伯努利，和同样是数学巨擘的亲弟弟约翰·伯努利撕了一辈子！兄弟俩在学术期刊上公开发帖互相下战书刁难，在各大报纸上痛骂对方是学术骗子，甚至发誓老死不相往来。当哥哥雅各布去世后，他的划时代遗作《推测术》（Ars Conjectandi）横空出世，一举奠定了现代精算学、人寿保险与大数据概率论的基石！这本用家族仇恨催生出的数学丰碑，成为了人类理性战胜随机混沌的终极武器。

**Bezug zum Konzept**: `Jakob Bernoullis "Gesetz der grossen Zahlen" bewies erstmals mathematisch streng, dass relative Haeufigkeiten bei wachsendem n gegen die theoretische Wahrscheinlichkeit p konvergieren.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Qualitaetskontrolle im Abitur
Kontinuitaet: Vorher Mathe-Ebenen-Hessesche-Normalenform-L1.md | Nachher Mathe-Beurteilende-Statistik-Prognose-und-Konfidenzintervall.md. Krise dieser Episode: Wie berechnet man Trefferchancen im unendlichen Wahrscheinlichkeitsbaum? Zielgroessen: Bernoulli-Experiment, Binomialkoeffizient, n ueber k, Erwartungswert, Standardabweichung

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: lego]

AUFGABE (berechnen & beurteilen, AFB I/II)：
Ein Smartphone-Hersteller produziert OLED-Displays. Erfahrungsgemaess weisen $5\%$ der produzierten Displays Pixelfehler auf ($p = 0,05$). Eine Qualitaetspruefung entnimmt einer Grossserie zufaellig $n = 50$ Displays (stichprobenartig, mit Zuruecklegen modellierbar).
Die Zufallsgroesse $X$ beschreibt die Anzahl der defekten Displays.
1. Begruenden Sie, warum $X$ als binomialverteilt modelliert werden kann, und berechnen Sie den Erwartungswert $\mu$ sowie die Standardabweichung $\sigma$. (10 BE)
2. Berechnen Sie die Wahrscheinlichkeiten fuer folgende Ereignisse:
   - Ereignis A: "Genau 2 Displays sind defekt."
   - Ereignis B: "Hoechstens 3 Displays sind defekt."
   - Ereignis C: "Mindestens 2 Displays sind defekt." (20 BE)

HILFE:
1. Schritt 1: Modellierung begruenden: Nur zwei Ausgaenge (defekt / intakt), konstantes $p = 0,05$, unabhaengige Entnahmen.
2. Schritt 2: Kennzahlen: $\mu = n \cdot p = 50 \cdot 0,05 = 2,5$. $\sigma = \sqrt{n \cdot p \cdot (1-p)} = \sqrt{50 \cdot 0,05 \cdot 0,95} = \sqrt{2,375} \approx 1,541$.
3. Schritt 3: Ereignis A: $P(X = 2) = \binom{50}{2} \cdot 0,05^2 \cdot 0,95^{48}$.
4. Schritt 4: Ereignis B: $P(X \le 3) = P(X=0) + P(X=1) + P(X=2) + P(X=3)$.
5. Schritt 5: Ereignis C: $P(X \ge 2) = 1 - P(X \le 1) = 1 - (P(X=0) + P(X=1))$.

MUSTERLÖSUNG:
1. Modellierung und Kenngroessen:
   - Die Zufallsgroesse $X$ kann als binomialverteilt gemaess $X \sim B(50; 0,05)$ modelliert werden, weil:
     1. Es gibt genau zwei disjunkte Ausgaenge: Display defekt ($p = 0,05$) oder intakt ($q = 0,95$).
     2. Die Stichprobe wird aus einer Grossserie gezogen, sodass die Entnahme eines Displays die Fehlerwahrscheinlichkeit der nachfolgenden Displays praktisch nicht aendert (konstante Wahrscheinlichkeit $p$, stochastische Unabhaengigkeit).
   - **Erwartungswert $\mu$**:
     $$\mu = n \cdot p = 50 \cdot 0,05 = 2,5\text{ defekte Displays}$$
   - **Standardabweichung $\sigma$**:
     $$\sigma = \sqrt{n \cdot p \cdot (1 - p)} = \sqrt{50 \cdot 0,05 \cdot 0,95} = \sqrt{2,375} \approx 1,541$$
2. Berechnung der Wahrscheinlichkeiten:
   - **Ereignis A: "Genau 2 defekte Displays" ($P(X = 2)$)**:
     $$P(X = 2) = \binom{50}{2} \cdot 0,05^2 \cdot 0,95^{48}$$
     $$\binom{50}{2} = \frac{50 \cdot 49}{2 \cdot 1} = 1225$$
     $$P(X = 2) = 1225 \cdot 0,0025 \cdot (0,95)^{48} \approx 1225 \cdot 0,0025 \cdot 0,08513 \approx 0,2611 \implies 26,11\%$$
   - **Ereignis B: "Hoechstens 3 defekte Displays" ($P(X \le 3)$)**:
     $$P(X = 0) = \binom{50}{0} \cdot 0,05^0 \cdot 0,95^{50} \approx 0,0769$$
     $$P(X = 1) = \binom{50}{1} \cdot 0,05^1 \cdot 0,95^{49} = 50 \cdot 0,05 \cdot 0,0810 \approx 0,2025$$
     $$P(X = 2) \approx 0,2611$$
     $$P(X = 3) = \binom{50}{3} \cdot 0,05^3 \cdot 0,95^{47} = 19600 \cdot 0,000125 \cdot 0,0896 \approx 0,2195$$
     $$P(X \le 3) = 0,0769 + 0,2025 + 0,2611 + 0,2195 \approx 0,7600 \implies 76,00\%$$
   - **Ereignis C: "Mindestens 2 defekte Displays" ($P(X \ge 2)$)**:
     Hier nutzen wir die Gegenereignis-Methode:
     $$P(X \ge 2) = 1 - P(X \le 1) = 1 - (P(X = 0) + P(X = 1))$$
     $$P(X \ge 2) = 1 - (0,0769 + 0,2025) = 1 - 0,2794 = 0,7206 \implies 72,06\%$$

`Klausur-Satz: Bei "Mindestens-Aufgaben" halbiert der Rueckgriff auf das Gegenereignis $1 - P(X \le k-1)$ den Rechenaufwand drastisch und minimiert potenzielle Rundungsfehler.`

## Schritt 5 — ausprobieren: Duell der Ziehungen: Mit vs. Ohne Zuruecklegen

VERGLEICH: Binomialverteilung (Mit Zuruecklegen) vs. Hypergeometrische Verteilung (Ohne Zuruecklegen)

- Position A (Binomialverteilung / Unabhaengige Stufen):
  - Versuchsmodell: Ziehen MIT Zuruecklegen (oder Ziehen aus einer quasi-unendlichen Grundgesamtheit, z.B. Grossserienproduktion).
  - Wahrscheinlichkeit: $p$ bleibt von Zug zu Zug exakt konstant.
  - Rechenformel: Bernoulli-Formel $\binom{n}{k} p^k (1-p)^{n-k}$.
- Position B (Hypergeometrische Verteilung / Abhaengige Stufen):
  - Versuchsmodell: Ziehen OHNE Zuruecklegen aus einer kleinen, endlichen Urne (z.B. Lotto 6 aus 49, Skatkarten).
  - Wahrscheinlichkeit: Nach jedem Zug veraendert sich die Zusammensetzung der Urne $\implies$ $p$ aendert sich permanent!
  - Rechenformel: Quotienten aus drei Binomialkoeffizienten $\frac{\binom{M}{k} \cdot \binom{N-M}{n-k}}{\binom{N}{n}}$.

Entscheidungsregel fuer die Klausur:
Faustregel fuer die Modellwahl: Wenn der Stichprobenumfang $n$ weniger als $5\%$ der Grundgesamtheit $N$ betraegt ($n/N \le 0,05$), darf das Ziehen ohne Zuruecklegen als Naeherung hervorragend ueber die Binomialverteilung gerechnet werden!

## Schritt 6 — check: Klausur-Transfer Hypothesentest & Signifikanzniveau
PRÜFUNGSSZENARIO (KLP NRW Mathematik Q1 Inhaltsfeld Stochastik: Beurteilende Statistik):

Der Hersteller behauptet stolz: "Unsere Fehlerquote liegt bei hoechstens 5% ($H_0: p \le 0,05$)."
Eine Verbraucherzentrale vermutet jedoch Verbrauchertaeuschung und argwoehnt, dass die Fehlerquote in Wahrheit hoeher ist ($H_1: p > 0,05$). Sie testet $n = 100$ Displays bei einem Signifikanzniveau von $\alpha = 0,05$ (5%).
Die Entscheidungsregel lautet: Wenn die Anzahl der defekten Displays im Ablehnungsbereich $K = \{k_{\text{krit}}, \dots, 100\}$ liegt, wird die Herstellerbehauptung verworfen.

AUFGABE (erklaeren & ableiten, AFB II/III):
1. Definieren Sie den Fehler 1. Art ($\alpha$-Fehler) im Sachzusammenhang. (10 BE)
2. Bestimmen Sie anhand der Bedingung $P_{p=0,05}(X \ge k_{\text{krit}}) \le 0,05$ den kritischen Wert $k_{\text{krit}}$, wenn tabelliert gegeben ist:
   $P(X \le 8) = 0,9369$, $P(X \le 9) = 0,9718$, $P(X \le 10) = 0,9885$. (20 BE)

ERWARTUNGSHORIZONT:
- AFB II: Der **Fehler 1. Art ($\alpha$-Fehler)** besteht darin, dass die Nullhypothese $H_0$ ($p \le 0,05$) faelschlicherweise verworfen wird, obwohl sie in Wahrheit wahr ist. Im Sachzusammenhang: Die Verbraucherzentrale bezichtigt den Hersteller oeffentlich der Taeuschung und behauptet, die Displays seien schlechter als versprochen, obwohl die Fehlerquote in Wirklichkeit hoechstens 5% betraegt (ungerechtfertigter Rufschaden fuer den Hersteller).
- AFB III:
  - Wir suchen den kleinsten ganzzahligen Wert $k_{\text{krit}}$, fuer den gilt:
    $$P_{p=0,05}(X \ge k_{\text{krit}}) \le 0,05$$
  - Umformung auf das Gegenereignis (kumulierte Verteilung):
    $$1 - P_{p=0,05}(X \le k_{\text{krit}} - 1) \le 0,05 \iff P_{p=0,05}(X \le k_{\text{krit}} - 1) \ge 0,95$$
  - Abgleich mit den gegebenen Tabellenwerten:
    - Fuer $k_{\text{krit}} - 1 = 8$: $P(X \le 8) = 0,9369 < 0,95$ (Bedingung noch nicht erfuellt).
    - Fuer $k_{\text{krit}} - 1 = 9$: $P(X \le 9) = 0,9718 \ge 0,95$ (Bedingung erstmals erfuellt!).
  - Folglich gilt:
    $$k_{\text{krit}} - 1 = 9 \implies k_{\text{krit}} = 10$$
  - **Ergebnis**: Der Ablehnungsbereich lautet $K = \{10, 11, \dots, 100\}$.
  - **Entscheidungsregel**: Erst wenn in der Stichprobe von 100 Displays **10 oder mehr defekt** sind, darf die Verbraucherzentrale die Aussage des Herstellers mit einer Irrtumswahrscheinlichkeit von maximal 5% als Luege zurueckweisen!

## Schritt 7 — check: Format-Check & Scoring
30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche beiden Bedingungen muessen erfuellt sein, damit ein Zufallsversuch als Bernoulli-Kette bezeichnet werden darf?
ANTWORT: 1. Es gibt auf jeder Stufe nur genau zwei Ausgaenge (Erfolg/Misserfolg), 2. Die Trefferwahrscheinlichkeit $p$ bleibt auf allen Stufen konstant (Unabhaengigkeit).

FRAGE: Wie berechnet man den Erwartungswert $\mu$ einer Binomialverteilung $B(n,p)$?
ANTWORT: $\mu = n \cdot p$ (Versuchsanzahl mal Trefferwahrscheinlichkeit).

FRAGE: Welche Formel verwendet man, um "mindestens 1 Treffer" ($P(X \ge 1)$) bei $n$ Stufen blitzschnell zu berechnen?
ANTWORT: $P(X \ge 1) = 1 - P(X = 0) = 1 - (1-p)^n$ (Eins minus Nietenwahrscheinlichkeit hoch $n$).

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission
REFLEXION:
Du hast das wichtigste Wahrscheinlichkeitsmodell der gesamten Schulmathematik gemeistert. Du kannst Bernoulli-Formeln herleiten, Summenwahrscheinlichkeiten berechnen und Hypothesentests im Abitur fehlerfrei auswerten.

<!-- reflexion: mathe-stochastik-bernoulli -->
In der naechsten Episode wechseln wir von den Zahlenreihen zur soziologischen Gesellschaftsanalyse: Wie ist die moderne deutsche Gesellschaft aufgebaut — leben wir noch in Schichten oder in Sinus-Milieus? Weiter geht es mit [SoWi-Soziale-Ungleichheit-Modelle-Schichten-und-Milieus-L1](SoWi-Soziale-Ungleichheit-Modelle-Schichten-und-Milieus-L1.md).
