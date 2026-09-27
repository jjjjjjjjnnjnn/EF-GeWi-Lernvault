---
fach: Bio
thema: "Enzymkinetik mit Michaelis und allosterischer Regulation"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, erklaeren, vergleichen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, CN]
version: Lesson-v3
---

# Lernreise: Enzymkinetik mit Michaelis und allosterischer Regulation (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能画出米氏曲线并标出 $v_{max}$ 与 $K_m$（$K_m$ 是达到半速时的底物浓度）。
2. 中文：能区分竞争性与非竞争性抑制在曲线上的表现（$K_m$ 变还是 $v_{max}$ 变）。
3. 中文：能选择调节类型解释（选程序：米氏定量 vs 变构定性）。

Voraussetzung（窄切口）：只做底物浓度影响速率，已知酶促三步 E+S→ES→E+P；不推导米氏方程、不做 pH 曲线。


Hook中文生活切入:

想象食堂打饭窗口:窗口就一个,学生越聚越多,刚开始多来一个人就多打一份饭,可窗口忙到极限后,再排多少人速度也不再增加;而别处开了新窗口或者有人插队,整个队伍的速度又会变化。酶和底物的关系正是如此:酶的数量有限,底物再多也有上限,而抑制剂和激活剂还能远程调节酶的干劲。

Phaenomen-Satz (DE): Ein Schalter bedient alle, doch irgendwann hilft keine laengere Schlange mehr.

中文机制铺垫:底物浓度低时反应速度随浓度上升,酶被底物饱和后速度封顶为最大值;米氏常数标记达到半速所需的底物量,竞争性抑制抬高表观米氏常数,别构效应则改变酶的空间形状从而调节上限。

Mechanismus-Satz (DE): Saettigung begrenzt die Geschwindigkeit, Hemmung und Aktivierung verstellen die Kennwerte.

Klausur-Satz: `Die Reaktionsgeschwindigkeit folgt der Michaelis-Kurve mit v_max und K_m; Hemmtypen veraendern sie charakteristisch.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 最大速率 — Maximalgeschwindigkeit $v_{max}$：酶被底物饱和时的速率平台。
- 米氏常数 — Michaelis-Konstante $K_m$：达到 $v_{max}/2$ 的底物浓度，越小亲和力越高。
- 竞争性抑制 — kompetitive Hemmung：抑制剂抢活性中心，$K_m$ 增大、$v_{max}$ 不变。
- 非竞争性抑制 — nichtkompetitive Hemmung：抑制剂结合别处，$v_{max}$ 下降、$K_m$ 不变。
- 变构调节 — allosterische Regulation：效应物结合调节部位，改变酶构象与活性。

Klausur-Satz: `Kompetitiv erhoeht K_m, nichtkompetitiv senkt v_max; allosterisch veraendert die Enzymgestalt.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象地铁早高峰安检口：人少时来一个过一个，人多了安检员满负荷，再多人也只能排队，通行速度封顶。酶也一样会忙不过来。

Phaenomen-Satz (DE): Wenig Substrat heisst freie Kapazitaet, viel Substrat heisst Warteschlange am Enzym.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块底物浓度 [S] 从低到高（关键词：Substrat, Sättigung v_max, K_m），再分别加入竞争性抑制剂和非竞争性抑制剂，看曲线右移还是峰顶下压。

Beobachtungs-Satz (DE): Mit steigendem [S] naehert sich v dem Plateau v_max; der Hemmstoff verschiebt die Kurve oder senkt das Plateau.

Aha-Moment因果链：

中文因果链：底物越多酶被占用比例越高，全部在岗即饱和，速度封顶为v_max；一半酶在岗时的底物浓度就是K_m；竞争者抢活性位点需更高底物才能赶上所以K_m变大、封顶不变，非竞争者从别处锁死酶所以封顶v_max直接下降。

Gesetz-Satz (DE): Saettigung erzeugt das Plateau, der Hemmtyp entscheidet ueber K_m oder v_max.

$v = v_{max} \cdot [S]/(K_m + [S])$

$[S] = K_m \Rightarrow v = v_{max}/2$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
v ^
  |  v_max .................. Plateau
  |         ....
  |       ..
  |     ..  K_m markiert v_max/2
  +----------------------------------> [S]
  kompetitiv: Kurve rechts | nichtkompetitiv: Plateau tiefer
```
Klausur-Satz: `Die Saettigung erklaert das Plateau; der Hemmtyp entscheidet, ob K_m oder v_max betroffen ist.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Leonor Michaelis und Maud Menten veröffentlichten 1913 ihre Kinetik-Gleichung — Menten als eine der ersten kanadischen Doktorinnen der Medizin. Ihre Kurve beschreibt bis heute, wie Enzyme und viele Medikamente wirken.

**中文解读**: 米氏方程出自 1913 年，作者之一门滕是早期杰出女科学家。记住 $K_m$ 与半速点的对应，任何酶动力学曲线题都能定位。

**Bezug zum Konzept**: `K_m als Halbsaettigung macht Affinitaet messbar.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

[Werkzeug: enzyme-lock]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：两组酶实验，一组加抑制剂后曲线右移但封顶不变，另一组封顶下降。请判定抑制类型，并用K_m与v_max作证。

AUFGABE (auswerten, AFB II): Zwei Ansaetze mit Hemmstoff zeigen (a) Rechtsverschiebung bei gleichem Plateau, (b) gesenktes Plateau. Bestimmen Sie jeweils den Hemmtyp und begruenden Sie mit $K_m$ und $v_{max}$.

HILFE（中德双语步骤）：

1. 中文：第1步读封顶：封顶不变看K_m，封顶下降看v_max，关键词：Plateau。
   Schritt 1 (DE): Pruefen Sie zuerst das Plateau v_max.
2. 中文：第2步右移等顶判竞争性、压顶判非竞争，关键词：Rechtsverschiebung。
   Schritt 2 (DE): Rechtsverschiebung bei gleichem Plateau heisst kompetitiv.
3. 中文：第3步补一句别构效应的形状变化含义，关键词：Gestalt。
   Schritt 3 (DE): Ergaenzen Sie die Deutung der Gestaltveraenderung.

MUSTERLOESUNG：中文：a组封顶不变只是达到同样速度需要更多底物，是竞争性抑制，K_m增大、v_max不变；b组天花板被压低，是非竞争或别构抑制，v_max下降；两类都可用洗掉抑制剂是否恢复来验证。

MUSTERLOESUNG (DE): Ansatz (a) ist kompetitiv: $K_m$ steigt, $v_{max}$ bleibt, die Kurve wandert nach rechts. Ansatz (b) ist nichtkompetitiv bzw. allosterisch: $v_{max}$ sinkt, das Plateau liegt tiefer. Beide Deutungen folgen direkt aus $v = v_{max} \cdot [S]/(K_m + [S])$.
Klausur-Satz: `Bei [S] = K_m betraegt v die Haelfte von v_max; bei Saettigung bleibt v auf v_max.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：米氏定量 vs 变构定性）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看问什么：(i) 米氏定量（问 $K_m$/$v_{max}$ 读数、抑制剂使哪个参数变：看曲线平移还是压低）oder (ii) 变构定性（问反馈抑制/激活：讲调节部位与构象变化，不算数）—— dann loesen.

AUFGABE A：Mit Hemmstoff X bleibt das Plateau gleich, die Kurve ist nach rechts verschoben. Hemmtyp?
AUFGABE B：Endprodukt E hemmt das erste Enzym der Kette an separater Stelle. Regulationstyp?

HILFE: A 问曲线参数变化 → Verfahren (i)。B 问链首反馈、无 $K_m$ 数值 → Verfahren (ii)。【选程序：见曲线比参数；见反馈讲构象。】

ANTWORT: A erfordert Verfahren (i): Gleiches $v_{max}$ bei groesserem $K_m$ ist kompetitiv — mehr Substrat verdraengt den Hemmer. B erfordert Verfahren (ii): Das Endprodukt bindet allosterisch und schaltet das Eingangsenzym per Konformationsaenderung ab (negative Rueckkopplung); hier wird kein $K_m$-Wert berechnet, sondern die Regulation als Sparschaltung gedeutet.

Klausur-Satz: `Rechtsverschiebung bei gleichem Plateau heisst kompetitiv; Endprodukt-Hemmung am Kettenanfang heisst allosterische Rueckkopplung.`

## Schritt 6 — check: Selbsttest zu Enzymkinetik mit Michaelis und allosterischer Regulation
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Was bedeuten $v_{max}$ und $K_m$? | ANTWORT: $v_{max}$ ist das Plateau bei Saettigung; $K_m$ ist $[S]$ bei $v_{max}/2$, Mass fuer Affinitaet (klein = affin).
FRAGE: Wie unterscheiden sich die Hemmtypen in der Kurve? | ANTWORT: Kompetitiv: $K_m$ steigt, $v_{max}$ gleich; nichtkompetitiv: $v_{max}$ sinkt, $K_m$ gleich.
FRAGE: Was geschieht allosterisch? | ANTWORT: Ein Effektor bindet ausserhalb des aktiven Zentrums und aendert die Gestalt und Aktivitaet.

Klausur-Satz: `Kompetitiv veraendert K_m, nichtkompetitiv v_max, allosterisch die Gestalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"$K_m$ 越大亲和力越强"。
   中文纠偏：反了。$K_m$ 是半速浓度，需要底物越少说明结合越容易，所以 $K_m$ 越小亲和力越大。
   Korrektur-Satz: `Ein kleines K_m bedeutet hohe Affinitaet.`

2. 误解"多加底物总能克服抑制"。
   中文纠偏：只对竞争性成立；非竞争性减少了有效酶量，平台永久压低，加底物无用。
   Korrektur-Satz: `Nur die kompetitive Hemmung laesst sich durch Substratueberschuss aufheben.`

## Schritt 7 — szenario: Klausurtransfer: Enzymkinetik mit Michaelis und allosterischer Regulation
ROLLE: Du bist Tutor und erklaerst eine Enzymkurve mit Hemmstoff.
SITUATION: Eine Gruppe liest $K_m$ und $v_{max}$ falsch ab und verwechselt die Hemmtypen. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) an einer Kurvenskizze, wie man beide Kennwerte abliest und woran man kompetitiv gegen nichtkompetitiv erkennt.
RUBRIC (30 XP): Ablesen von $v_{max}$ und $K_m$ (10 XP) | Unterscheidung der Hemmtypen an der Kurve (10 XP) | Allosterische Deutung als Regulation (6 XP) | Fachsprachliche Korrektheit (4 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：米氏曲线看两点——平台 $v_{max}$ 与半速 $K_m$。右移是竞争（加底物可救），压低是非竞争（加底物无用），首酶被尾产物关停是变构反馈。记住一句话——右移争位，压低减员，反馈关总闸。
Takeaway-Satz: `Plateau und Halbwert lesen, Verschiebung gegen Absenkung halten, Rueckkopplung als Schaltung deuten.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Ablesen von K_m (Schritt 4) oder die Wahl zwischen Kurve und Regulation (Schritt 5)?
2. 元认知计划：Beim naechsten Mal markiere ich zuerst v_max und die Haelfte davon.
