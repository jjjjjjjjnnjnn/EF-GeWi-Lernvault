---
fach: Chemie
thema: "Titrationskurven und Indikatoren"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, begruenden, auswaehlen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, Saeure-Base]
version: Lesson-v3
---

# Lernreise: Titrationskurven und Indikatoren (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清滴定曲线的三段结构——起始 pH、突跃段、过量段，以及等当点不一定是 pH 7。
2. 中文：能读出强酸强碱、强酸弱碱、弱酸强碱三类曲线的等当点酸碱性差异。
3. 中文：能根据等当点 pH 落在指示剂变色域内来选择指示剂，并写出德语标准结论句（AFB II）。


Hook中文生活切入:

想象给一锅太咸的汤调味:一勺一勺加水并不断尝咸淡,刚开始几勺几乎尝不出变化,可接近合适咸淡时多一勺就过头变淡,咸淡突变只发生在一个很窄的区间。酸碱滴定正是这锅汤:滴定剂一滴一滴加,突跃区间很窄,指示剂就是在突变点准时变色的舌头。

Phaenomen-Satz (DE): Loeffel fuer Loeffel schmeckt man nichts, dann kippt alles mit einem Tropfen.

中文机制铺垫:强酸强碱滴定的突跃大,弱酸弱碱体系因缓冲而突跃小甚至分步出现;指示剂的变色范围必须落在突跃区间内,酚酞管碱性端、甲基橙管酸性端,选错指示剂终点就会系统性偏离。

Mechanismus-Satz (DE): Der Sprung bestimmt die Kurve, der Indikator muss in seinen Bereich fallen.

Klausur-Satz: `Der Indikator muss so gewaehlt werden, dass sein Umschlagsbereich den Aequivalenzpunkt der Titration enthaelt.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 等当点 — Aequivalenzpunkt：酸碱恰好完全中和的理论点，突跃中点。【陷阱：Aequivalenzpunkt（理论计算点）不是 Endpunkt（实际观察到变色的点，尽量靠近前者）。】
- 突跃 — pH-Sprung：等当点附近一滴即变数个 pH 的陡峭段。【陷阱：Sprung（陡峭段）不是 Pufferbereich（平坦缓冲段，pH 难变）。】
- 指示剂 — Indikator：特定 pH 变色的弱酸/弱碱染料。【陷阱：Indikator（只示踪，不参与中和计算）不是 Reaktant（反应物）。】
- 变色域 — Umschlagsbereich：指示剂变色的 pH 区间，约 $pK_{In} \pm 1$。【陷阱：Umschlagsbereich（区间概念）不是 Umschlagspunkt（单一 pH 值，不存在）。】
- 滴定曲线 — Titrationskurve：$pH$ 对滴定剂体积 $V$ 的 S 形曲线。【陷阱：Titrationskurve（全程记录）不是 einzelne pH-Messung（单点测量）。】

Klausur-Satz: `Der pH-Sprung am Aequivalenzpunkt ermoeglicht die sichtbare Endpunktbestimmung mit einem Indikator.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象给奶茶调甜度：每加一勺尝一口，前几勺变化不大，临界那一勺突然过甜。滴定曲线的突跃也是这个脾气。

Phaenomen-Satz (DE): Tropfen fuer Tropfen fast nichts, ein Tropfen alles: der Sprung verrät den Punkt.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块逐滴加入标准液（关键词：Titrant, Äquivalenzpunkt, pH-Sprung, Umschlagsbereich），观察曲线何时陡峭，并切换不同指示剂看变色区间是否套住突跃。

Beobachtungs-Satz (DE): Am Aequivalenzpunkt springt der pH, nur ein passender Indikator schlaegt dort um.

Aha-Moment因果链：

中文因果链：滴定终点附近被测物几乎耗尽，多一滴标准液就无缓冲可吃，pH直线拉升形成突跃；强弱酸碱生成的盐会水解，所以化学计量点的pH不一定等于7，指示剂变色区间必须包住突跃才看得见终点。

Gesetz-Satz (DE): Das Salz der Neutralisation bestimmt den pH am Aequivalenzpunkt, nicht der Titrant allein.

$pH = -\lg[H_3O^+]$

$K_w = [H_3O^+]\cdot[OH^-] = 10^{-14}$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
pH ^
  12|      ............
    |     /  Sprung
   7|..../.............
    |  /
  2 +--------------------> V(Titrant)
  Indikator-Balken muss Sprung ueberdecken
```
Klausur-Satz: `Der pH am Aequivalenzpunkt wird vom Salz der Neutralisation bestimmt, nicht vom Titrant allein.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der erste synthetische Indikator Phenolphthalein wurde 1871 von Adolf von Baeyer entdeckt — dieselbe Chemiker-Generation, die auch Aspirin entwickelte. Vorher prueften Chemiker Saeuren, indem sie daran rochen oder vorsichtig kosteten, was bei starken Saeuren lebensgefaehrlich war.

**中文解读**: 指示剂是"用眼睛代替舌头"的发明。以前化学家靠闻靠尝判断酸碱，经常受伤；有了变色染料，一滴颜色变化代替一口品尝。中国学生记住酚酞碱变红、甲基橙酸变红，本质都是给眼睛装的 pH 报警器。

**Bezug zum Konzept**: `Indikatoren machen den unsichtbaren Aequivalenzpunkt mit einem Farbwechsel sichtbar.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

[Werkzeug: titration-lab]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：用强酸滴定弱碱，曲线突跃落在酸性区。请判断计量点酸碱性并挑选指示剂，说明为什么酚酞不行。

AUFGABE (auswaehlen, AFB II): Bei der Titration einer schwachen Base mit starker Saeure liegt der Sprung im Sauren. Waehlen Sie einen Indikator und begruenden Sie die Wahl ueber den $pH$-Sprung.

HILFE（中德双语步骤）：

1. 中文：第1步定计量点：弱碱的共轭酸水解显酸性，关键词：Salzhydrolyse。
   Schritt 1 (DE): Das Ammoniumsalz hydrolysiert sauer, $pH < 7$.
2. 中文：第2步定区间：选变色区间落在突跃内的酸性指示剂，关键词：Umschlag。
   Schritt 2 (DE): Waehlen Sie Methylorange statt Phenolphthalein.
3. 中文：第3步排除酚酞：在碱区变色会错过突跃，关键词：Ausschluss。
   Schritt 3 (DE): Phenolphthalein schlaegt erst basisch um und verfehlt den Sprung.

MUSTERLOESUNG：中文：弱碱被强酸滴定生成铵盐水解显酸，计量点pH小于7，突跃也在酸区；甲基橙变色区间约3到4正好套住突跃，酚酞8到10在碱区，变色时早已过终点，故不用。

MUSTERLOESUNG (DE): Der Aequivalenzpunkt liegt sauer ($pH < 7$), weil das $NH_4^+$-Salz hydrolysiert. Methylorange mit Umschlag ca. $3$ bis $4$ trifft den Sprung; Phenolphthalein ($8$ bis $10$) schlaegt zu spaet um und ist ungeeignet.
Klausur-Satz: `Bei der Titration einer schwachen Base mit starker Saeure liegt der Aequivalenzpunkt im Sauren und verlangt einen sauren Indikator.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：酸性等当点眼 vs. 碱性等当点眼）：

VERGLEICH: Waehle erst das Konzept — 【选概念】先判断生成盐的类型：(i) Saures-Konzept（强酸 + 弱碱 → 酸性盐，pH 小于 7）还是 (ii) Basisches-Konzept（弱酸 + 强碱 → 碱性盐，pH 大于 7）—— dann Indikator waehlen.

AUFGABE A：Essigsaeure wird mit Natronlauge titriert. Welcher Indikator passt?
AUFGABE B：Ammoniak wird mit Salzsaeure titriert. Welcher Indikator passt?

HILFE: A erzeugt Acetat (Base einer schwachen Saeure) -> Konzept (ii), pH groesser $7$. B erzeugt Ammonium (Saeure einer schwachen Base) -> Konzept (i), pH kleiner $7$.【选概念：题干出现 schwache Saeure + starke Base 选碱性等当点配酚酞；出现 starke Saeure + schwache Base 选酸性等当点配甲基红/甲基橙。】

ANTWORT: A erfordert Konzept (ii): Aequivalenzpunkt ca. pH $8$–$9$, Phenolphthalein passt. B erfordert Konzept (i): Aequivalenzpunkt ca. pH $5$, Methylrot passt, Phenolphthalein versagt.

Klausur-Satz: `Schwache Saeure verlangt basischen Indikator, schwache Base verlangt sauren Indikator.`

## Schritt 6 — check: Verständnisprüfung

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Was unterscheidet Aequivalenzpunkt und Endpunkt? | ANTWORT: Aequivalenzpunkt ist der theoretische Neutralisationspunkt, Endpunkt der beobachtete Farbumschlag.
FRAGE: Warum ist der Aequivalenzpunkt nicht immer pH $7$? | ANTWORT: Weil das gebildete Salz hydrolysieren kann und sauer oder basisch reagiert.
FRAGE: Wie waehlt man den Indikator? | ANTWORT: Der Umschlagsbereich muss den Aequivalenzpunkt enthalten.

Klausur-Satz: `Ohne pH-Sprung gaebe es keinen sichtbaren Endpunkt und keine Titration mit Indikator.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"等当点永远是 pH 7，中和嘛当然中性"。
   中文纠偏：只有强酸强碱的盐才中性。弱酸根会水解显碱，弱碱阳离子会水解显酸。等当点的酸碱性看盐不看"中和"这个名字。
   Korrektur-Satz: `Der pH am Aequivalenzpunkt folgt aus der Hydrolyse des entstandenen Salzes.`

2. 误解"酚酞是万能指示剂，任何滴定都可以用"。
   中文纠偏：酚酞只在 pH 8–10 变色，酸性等当点（如滴氨水）到不了那么高，用它永远不变色，会把标准液加过量。选错指示剂等于判错终点。
   Korrektur-Satz: `Ein Indikator ausserhalb des Aequivalenzpunkts zeigt den Endpunkt zu spaet oder nie an.`

## Schritt 7 — szenario: Klausurtransfer & Rubric

ROLLE: Du bist Laborpartnerin und erklaerst die Indikatorwahl.
SITUATION: Ein Mitschueler will Essigsaeure mit NaOH gegen Phenolphthalein titrieren, ein anderer schlaegt Methylorange vor.
AUFGABE: Entscheiden Sie in ca. 150 Woertern mit Salz-Argument, wer recht hat, und erklaeren Sie Kurvenlage und Umschlagsbereiche.
RUBRIC (30 XP): Salz Acetat als basisch erkannt (10 XP) | Aequivalenzpunkt pH groesser $7$ (10 XP) | Indikatorentscheidung mit Bereichsbegruendung (10 XP).

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：滴定三段记：缓冲平、突跃陡、过量平。等当点 pH 看盐：强强为 7，强酸弱碱偏酸，弱酸强碱偏碱。指示剂铁律：变色域套住等当点。酚酞管碱性，甲基橙/甲基红管酸性。
Takeaway-Satz: `Salz bestimmt Aequivalenzpunkt, Aequivalenzpunkt bestimmt Indikator: Bereich muss Punkt enthalten.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Salz-Hydrolyse am Aequivalenzpunkt (Schritt 4) oder die Konzeptwahl sauer gegen basisch (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst die Neutralisationsgleichung und kreise das Salz ein.
