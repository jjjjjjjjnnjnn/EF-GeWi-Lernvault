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

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能画出米氏曲线并标出 $v_{max}$ 与 $K_m$（$K_m$ 是达到半速时的底物浓度）。
2. 中文：能区分竞争性与非竞争性抑制在曲线上的表现（$K_m$ 变还是 $v_{max}$ 变）。
3. 中文：能选择调节类型解释（选程序：米氏定量 vs 变构定性）。

Voraussetzung（窄切口）：只做底物浓度影响速率，已知酶促三步 E+S→ES→E+P；不推导米氏方程、不做 pH 曲线。

Klausur-Satz: `Die Reaktionsgeschwindigkeit folgt der Michaelis-Kurve mit v_max und K_m; Hemmtypen veraendern sie charakteristisch.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 最大速率 — Maximalgeschwindigkeit $v_{max}$：酶被底物饱和时的速率平台。
- 米氏常数 — Michaelis-Konstante $K_m$：达到 $v_{max}/2$ 的底物浓度，越小亲和力越高。
- 竞争性抑制 — kompetitive Hemmung：抑制剂抢活性中心，$K_m$ 增大、$v_{max}$ 不变。
- 非竞争性抑制 — nichtkompetitive Hemmung：抑制剂结合别处，$v_{max}$ 下降、$K_m$ 不变。
- 变构调节 — allosterische Regulation：效应物结合调节部位，改变酶构象与活性。

Klausur-Satz: `Kompetitiv erhoeht K_m, nichtkompetitiv senkt v_max; allosterisch veraendert die Enzymgestalt.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：底物少时速率随浓度直线上升，底物多时酶"忙不过来"进入平台——这就是饱和。$K_m$ 是亲和力的反指标：达到半速所需底物越少，亲和力越强。抑制剂分两类：竞争者可被底物"人多挤走"，多加底物能回到原 $v_{max}$，只是 $K_m$ 右移；非竞争者"另起 binding 位点"把酶总量变相减少，再多底物也回不到原平台。变构激活与抑制则是细胞的"远程开关"。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
  v ^  nichtkomp. senkt Plateau
      |   normal ________ v_max
      |  /  . kompetitiv: rechts verschoben, gleiches Plateau
      | / .
      +--------------> [S]   Km = [S] bei v_max/2
```

Klausur-Satz: `Die Saettigung erklaert das Plateau; der Hemmtyp entscheidet, ob K_m oder v_max betroffen ist.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Leonor Michaelis und Maud Menten veröffentlichten 1913 ihre Kinetik-Gleichung — Menten als eine der ersten kanadischen Doktorinnen der Medizin. Ihre Kurve beschreibt bis heute, wie Enzyme und viele Medikamente wirken.

**中文解读**: 米氏方程出自 1913 年，作者之一门滕是早期杰出女科学家。记住 $K_m$ 与半速点的对应，任何酶动力学曲线题都能定位。

**Bezug zum Konzept**: `K_m als Halbsaettigung macht Affinitaet messbar.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: enzyme]

AUFGABE (darstellen, AFB II)：Skizzieren und deuten Sie die Michaelis-Kurve eines Enzyms mit $v_{max} = 100\,\mu\mathrm{mol/min}$ und $K_m = 2\,\mathrm{mmol/L}$. Wo liegt $v$ bei $[S] = 2\,\mathrm{mmol/L}$ und bei Saettigung?

HILFE:
1. Schritt 1: Achsen beschriften ($v$ gegen $[S]$), Plateau $v_{max}$ einzeichnen.
2. Schritt 2: Punkt $(K_m|v_{max}/2)$ markieren.
3. Schritt 3: Verlauf von null bis Saettigung deuten.

MUSTERLÖSUNG: Die Kurve startet im Ursprung, steigt zunaechst fast linear und naehert sich dann dem Plateau $v_{max} = 100\,\mu\mathrm{mol/min}$. Bei $[S] = K_m = 2\,\mathrm{mmol/L}$ gilt definitionsgemaess $v = 50\,\mu\mathrm{mol/min}$. Bei sehr hoher Substratkonzentration sind praktisch alle aktiven Zentren besetzt (Saettigung), $v$ bleibt bei $v_{max}$. Ein kleineres $K_m$ wuerde steileren Anstieg und hoehere Affinitaet bedeuten.

Klausur-Satz: `Bei [S] = K_m betraegt v die Haelfte von v_max; bei Saettigung bleibt v auf v_max.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：米氏定量 vs 变构定性）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看问什么：(i) 米氏定量（问 $K_m$/$v_{max}$ 读数、抑制剂使哪个参数变：看曲线平移还是压低）oder (ii) 变构定性（问反馈抑制/激活：讲调节部位与构象变化，不算数）—— dann loesen.

AUFGABE A：Mit Hemmstoff X bleibt das Plateau gleich, die Kurve ist nach rechts verschoben. Hemmtyp?
AUFGABE B：Endprodukt E hemmt das erste Enzym der Kette an separater Stelle. Regulationstyp?

HILFE: A 问曲线参数变化 → Verfahren (i)。B 问链首反馈、无 $K_m$ 数值 → Verfahren (ii)。【选程序：见曲线比参数；见反馈讲构象。】

ANTWORT: A erfordert Verfahren (i): Gleiches $v_{max}$ bei groesserem $K_m$ ist kompetitiv — mehr Substrat verdraengt den Hemmer. B erfordert Verfahren (ii): Das Endprodukt bindet allosterisch und schaltet das Eingangsenzym per Konformationsaenderung ab (negative Rueckkopplung); hier wird kein $K_m$-Wert berechnet, sondern die Regulation als Sparschaltung gedeutet.

Klausur-Satz: `Rechtsverschiebung bei gleichem Plateau heisst kompetitiv; Endprodukt-Hemmung am Kettenanfang heisst allosterische Rueckkopplung.`

## Schritt 6 — check

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

## Schritt 7 — szenario

ROLLE: Du bist Tutor und erklaerst eine Enzymkurve mit Hemmstoff.
SITUATION: Eine Gruppe liest $K_m$ und $v_{max}$ falsch ab und verwechselt die Hemmtypen. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) an einer Kurvenskizze, wie man beide Kennwerte abliest und woran man kompetitiv gegen nichtkompetitiv erkennt.
RUBRIC (30 XP): Ablesen von $v_{max}$ und $K_m$ (10 XP) | Unterscheidung der Hemmtypen an der Kurve (10 XP) | Allosterische Deutung als Regulation (6 XP) | Fachsprachliche Korrektheit (4 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：米氏曲线看两点——平台 $v_{max}$ 与半速 $K_m$。右移是竞争（加底物可救），压低是非竞争（加底物无用），首酶被尾产物关停是变构反馈。记住一句话——右移争位，压低减员，反馈关总闸。
Takeaway-Satz: `Plateau und Halbwert lesen, Verschiebung gegen Absenkung halten, Rueckkopplung als Schaltung deuten.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Ablesen von K_m (Schritt 4) oder die Wahl zwischen Kurve und Regulation (Schritt 5)?
2. 元认知计划：Beim naechsten Mal markiere ich zuerst v_max und die Haelfte davon.
