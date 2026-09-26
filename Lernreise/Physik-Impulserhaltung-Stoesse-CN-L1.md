---
fach: Physik
thema: "Impulserhaltung und Stoesse"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, CN]
version: Lesson-v3
---

# Lernreise: Impulserhaltung und Stoesse (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能写出动量 $p = m v$ 与守恒条件（合外力为零、碰撞瞬间内力远大于外力）。
2. 中文：能用守恒式 $m_1 v_1 + m_2 v_2 = m_1 u_1 + m_2 u_2$ 解一维完全非弹性与弹性碰撞。
3. 中文：能选择碰撞类型对应的方程组（选程序：粘连共速 vs 弹性双守）。

Voraussetzung（窄切口）：只做一维、已知质量与初速求末速；不处理斜碰与相对论，已会解二元一次方程。

Klausur-Satz: `In einem abgeschlossenen System bleibt der Gesamtimpuls erhalten; bei Stoessen gilt p_vor = p_nach.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 动量 — Impuls $p = m v$：矢量，方向与速度相同，单位 $\mathrm{kg \cdot m/s}$。
- 封闭系统 — abgeschlossenes System：合外力为零，$p_{ges}$ 不变。
- 完全非弹性碰撞 — vollkommen unelastischer Stoss：碰后粘连共速 $u$，动能损失最大。
- 弹性碰撞 — elastischer Stoss：动量与动能双守恒，$E_{kin}$ 不变。
- 反冲 — Rueckstoss：系统初动量为零时两部分向相反方向运动。

Klausur-Satz: `Der Impuls ist eine vektorielle Groesse; seine Richtung muss im Ansatz durch Vorzeichen beruecksichtigt werden.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：动量守恒的本质是"内部怎么撞，总量不变"。一维先定正方向，速度带符号代入。一类题粘连共速：$m_1 v_1 + m_2 v_2 = (m_1+m_2) u$，直接解 $u$。另一类弹性碰撞：动量式加动能式 $\frac{1}{2}m_1v_1^2+\frac{1}{2}m_2v_2^2 = \frac{1}{2}m_1u_1^2+\frac{1}{2}m_2u_2^2$，联立解两个末速。关键词：haften zusammen / bleiben zusammen 是粘连；elastisch 是弹性。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
  vor:  [m1] v1 -->   <-- v2 [m2]
  nach (unelastisch): [m1+m2] u -->
  p_vor = m1*v1 + m2*v2 = (m1+m2)*u = p_nach
  elastisch zusaetzlich: E_vor = E_nach (1/2 m v^2)
```

Klausur-Satz: `Unelastisch teilt man durch die Gesamtmasse, elastisch loest man das System aus Impuls- und Energiesatz.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Beim Kugelstoss-Pendel (Newton-Wiege) bleibt beim elastischen Stoss fast die gesamte Bewegung erhalten: Eine Kugel faellt herein, genau eine Kugel fliegt hinaus. Der Gesamtimpuls wandert durch die ruhenden Kugeln hindurch — ein Schreibtisch-Experiment zur Impulserhaltung.

**中文解读**: 牛顿摆是弹性碰撞的活模型——进一个、出一只，中间球几乎不动。记住这个画面，弹性双守恒就不再抽象。

**Bezug zum Konzept**: `Die Newton-Wiege zeigt Impuls- und Energieerhaltung in einem einzigen Klick.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: collision]

AUFGABE (berechnen, AFB II)：Ein Wagen $m_1 = 2{,}0\,\mathrm{kg}$ faehrt mit $v_1 = 3{,}0\,\mathrm{m/s}$ auf einen ruhenden Wagen $m_2 = 1{,}0\,\mathrm{kg}$ ($v_2 = 0$). Nach dem Stoss bleiben beide zusammen. Berechnen Sie die gemeinsame Geschwindigkeit $u$.

HILFE:
1. Schritt 1: Positive Richtung festlegen und Ansatz $m_1v_1+m_2v_2 = (m_1+m_2)u$ schreiben.
2. Schritt 2: Werte mit Vorzeichen einsetzen.
3. Schritt 3: Nach $u$ aufloesen und Richtung deuten.

MUSTERLÖSUNG: Mit $+$-Richtung nach rechts gilt $p_{vor} = 2{,}0 \cdot 3{,}0 + 0 = 6{,}0\,\mathrm{kg \cdot m/s}$. Nach dem Stoss ist $p_{nach} = 3{,}0 \cdot u$. Aus $6{,}0 = 3{,}0 u$ folgt $u = 2{,}0\,\mathrm{m/s}$ in positiver Richtung. Die kinetische Energie sinkt von $9{,}0\,\mathrm{J}$ auf $6{,}0\,\mathrm{J}$; die Differenz bleibt als Verformung und Waerme — typisch unelastisch.

Klausur-Satz: `Aus p_vor = 6,0 kg m/s und der Gesamtmasse 3,0 kg folgt u = 2,0 m/s in Fahrtrichtung.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：粘连共速 vs 弹性双守）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先找关键词：(i) 粘连共速（haften / zusammenbleiben：只列动量式，除以总质量）oder (ii) 弹性双守（elastisch：动量式加动能式联立）—— dann loesen.

AUFGABE A：Zwei Knetkugeln bleiben nach dem Stoss zusammen. Gegeben $m$, $v$, gesucht $u$.
AUFGABE B：Zwei Stahlkugeln stossen elastisch; gesucht beide Endgeschwindigkeiten.

HILFE: A 含 zusammen → Verfahren (i)。B 含 elastisch → Verfahren (ii)。【选程序：见粘连除总质；见弹性列双式。】

ANTWORT: A erfordert Verfahren (i): Eine Gleichung $m_1v_1+m_2v_2 = (m_1+m_2)u$ genuegt; $u$ folgt durch Division durch $m_1+m_2$. B erfordert Verfahren (ii): Zusaetzlich gilt $\frac{1}{2}m_1v_1^2+\frac{1}{2}m_2v_2^2 = \frac{1}{2}m_1u_1^2+\frac{1}{2}m_2u_2^2$; erst beide Gleichungen zusammen liefern $u_1$ und $u_2$. Wer in B nur den Impulssatz schreibt, hat eine Gleichung zu wenig.

Klausur-Satz: `Unelastisch genuegt der Impulssatz, elastisch braucht man Impuls- und Energiesatz gemeinsam.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wann gilt die Impulserhaltung? | ANTWORT: Wenn das System abgeschlossen ist bzw. beim Stoss die inneren Kraefte dominieren; dann gilt $p_{vor} = p_{nach}$.
FRAGE: Wie lautet der Ansatz beim vollkommen unelastischen Stoss? | ANTWORT: $m_1v_1+m_2v_2 = (m_1+m_2)u$.
FRAGE: Was gilt zusaetzlich beim elastischen Stoss? | ANTWORT: Die kinetische Gesamtenergie bleibt erhalten: $E_{vor} = E_{nach}$.

Klausur-Satz: `Der Stosstyp entscheidet, ob nur der Impuls oder Impuls und Energie erhalten bleiben.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"动量守恒就是动能守恒"。
   中文纠偏：动量在封闭系统恒守恒，动能只在弹性碰撞守恒。粘连碰撞动能必然损失一部分，不能再列动能式。
   Korrektur-Satz: `Der Impuls bleibt in jedem abgeschlossenen Stoss erhalten, die Energie nur im elastischen.`

2. 误解"速度直接代入大小即可"。
   中文纠偏：动量是矢量，一维必须先定正方向，反向速度取负。符号错则整式错。
   Korrektur-Satz: `Geschwindigkeiten gegen die positive Richtung erhalten ein negatives Vorzeichen.`

## Schritt 7 — szenario

ROLLE: Du bist Laborassistent und erklaerst zwei Stossversuche.
SITUATION: Eine Gruppe verwechselt Knete mit Stahlkugeln und schreibt immer beide Saetze hin. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter), wie man am Versuchsergebnis (zusammen vs. getrennt) den Stosstyp erkennt und welchen Gleichungssatz man jeweils ansetzt.
RUBRIC (30 XP): Erkennungsmerkmal des Stosstyps (8 XP) | Ansatz unelastisch mit Rechnung (8 XP) | Ansatz elastisch mit beiden Saetzen (8 XP) | Vorzeichenregel und Fachsprache (6 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：先定正方向管符号，再看关键词选方程：粘连只列动量、除以总质量；弹性动量加动能、联立解双末速。记住一句话——粘连列一式，弹性列两式。
Takeaway-Satz: `Erst die Richtung, dann der Stosstyp, dann der passende Gleichungssatz.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Rechnung mit Vorzeichen (Schritt 4) oder die Wahl des Stosstyps (Schritt 5)?
2. 元认知计划：Beim naechsten Mal markiere ich zuerst das Wort zusammen oder elastisch.
