---
fach: Chemie
thema: "Gleichgewicht vertieft mit Q-Berechnung"
level: 2
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Chemie, CN]
version: Lesson-v3
---

# Lernreise: Gleichgewicht vertieft mit Q-Berechnung (L2, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用任意时刻浓度算反应商 $Q$ 并与 $K_c$ 比较判方向。
2. 中文：能用三段式解含 $x^2$ 的平衡浓度，判断近似是否可用。
3. 中文：能选择定量还是定性程序（选程序：算商定量 vs 原理定性）。

Voraussetzung（窄切口）：只做气相与溶液均相平衡，已会 MWG 表达式与 Le Chatelier 定性；L1 已学 $K_c$ 含义。

Klausur-Satz: `Q misst die aktuelle Lage, K_c die Ziellage; das System laeuft, bis Q gleich K_c ist.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 反应商 — Reaktionsquotient $Q$：任意时刻代入 MWG 式的值，$Q = \frac{[P]^p}{[E]^e}$。
- 平衡常数 — Gleichgewichtskonstante $K_c$：平衡时刻的 $Q$，只随温度变。
- 三段式 — Dreisatztabelle：Start、 Aenderung ($x$)、 Gleichgewicht 三行表。
- 转化率 — Umsetzungsgrad：已转化量占初始量之比，$\alpha = x/c_0$。
- 小 $x$ 近似 — Klein-x-Naeherung：$x \ll c_0$ 时 $c_0 - x \approx c_0$，需回代检验。

Klausur-Satz: `Q kleiner K_c heisst Nachschub nach rechts, Q groesser K_c heisst Abbau nach links.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：$Q$ 与 $K_c$ 用同一公式、不同时刻：$Q$ 问"现在在哪"，$K_c$ 说"该去哪"。$Q < K_c$ 说明产物不够、向右补；$Q > K_c$ 说明产物过多、向左退；相等即平衡。三段式是算 $Q$/$K_c$ 的脚手架：变化行按系数配 $x$（如 $2HI$ 对 $+2x$），平衡行代入 $K_c$ 解方程。若 $K_c$ 极小且 $c_0$ 大，可试 $c_0 - x \approx c_0$，解完必须验 $x/c_0 < 5\%$，否则回精确式。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
  Q = [aktuelle c] in MWG-Formel;  Kc = [Gleichgew.-c] in MWG-Formel
  Q < Kc ──> rechts (Produkt nachbilden)
  Q = Kc ──> Gleichgewicht (Ruhe)
  Q > Kc ──> links (Produkt abbauen)
  Tabelle: Start | -/+x nach Koeff. | Gleichgew. ──> in Kc einsetzen
```

Klausur-Satz: `Die Tabelle liefert Q oder die Gleichgewichtskonzentrationen, der Vergleich mit K_c die Richtung.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Guldberg und Waage formulierten 1864 das Massenwirkungsgesetz aus der Idee, dass Hin- und Rueckrate sich aufheben. Ihre Formel mit $Q$ gegen $K_c$ ist bis heute das Navi jeder Gleichgewichtsrechnung.

**中文解读**: 质量作用定律生于 1864 年挪威，正逆速率相等的瞬间即平衡。记住 $Q$ 追 $K_c$ 的导航比喻，方向题永不错。

**Bezug zum Konzept**: `Q ist Standort, K_c ist Ziel — die Tabelle ist die Route.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: balance]

AUFGABE (berechnen, AFB II/III)：Fuer $H_2 + I_2 \rightleftharpoons 2HI$ mit $K_c = 64$ liegen momentan $c(H_2) = 0{,}30$, $c(I_2) = 0{,}10$, $c(HI) = 1{,}00\,\mathrm{mol/L}$ vor. Berechnen Sie $Q$ und sagen Sie die Richtung voraus.

HILFE:
1. Schritt 1: MWG-Ausdruck $Q = [HI]^2/([H_2][I_2])$ hinschreiben.
2. Schritt 2: Aktuelle Werte einsetzen.
3. Schritt 3: Mit $K_c$ vergleichen und Richtung mit Satz begruenden.

MUSTERLÖSUNG: Es gilt $Q = 1{,}00^2/(0{,}30 \cdot 0{,}10) = 1{,}00/0{,}030 \approx 33$. Da $Q \approx 33 < K_c = 64$ ist, liegen zu wenige Produkte vor; die Hinreaktion wird bevorzugt, das System laeuft nach rechts, bis $Q$ wieder gleich $K_c$ ist. In Klausursprache: Das Gleichgewicht verschiebt sich zugunsten von $HI$.

Klausur-Satz: `Mit Q = 33 kleiner K_c = 64 verschiebt sich das Gleichgewicht nach rechts.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：算商定量 vs 原理定性）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看题给什么：(i) 算商定量（给了浓度或 $K_c$ 数值：算 $Q$、列三段式、解 $x$）oder (ii) 原理定性（只给扰动如 Druck/Temperatur：用 Le Chatelier 讲方向）—— dann loesen.

AUFGABE A：Gegeben $K_c$ und drei Konzentrationen. Wohin laeuft das System?
AUFGABE B：Das Volumen wird halbiert. Wohin verschiebt sich $N_2 + 3H_2 \rightleftharpoons 2NH_3$?

HILFE: A 有数值 → Verfahren (i)。B 只说体积减半 → Verfahren (ii)。【选程序：见数值算商；见扰动讲理。】

ANTWORT: A erfordert Verfahren (i): $Q$ ausrechnen und mit $K_c$ vergleichen — Zahl entscheidet. B erfordert Verfahren (ii): Halbiertes Volumen verdoppelt alle Konzentrationen; $Q$ wuerde mit vierter Potenz im Nenner kleiner, also $Q < K_c$, oder direkt nach Le Chatelier: Druckerhoehung bevorzugt die Seite mit weniger Gasteilchen (rechts, 2 gegen 4) — Richtung ohne eine Zahl. Wer in B $Q$ ausrechnet, erfindet Daten; wer in A nur Le Chatelier zitiert, liefert keine Zahl.

Klausur-Satz: `Zahlen verlangen Q, Stoerungen verlangen Le Chatelier.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie unterscheiden sich $Q$ und $K_c$? | ANTWORT: Gleiche Formel, $Q$ mit aktuellen, $K_c$ mit Gleichgewichtskonzentrationen; $K_c$ aendert nur mit $T$.
FRAGE: Wie lautet die Richtungsregel? | ANTWORT: $Q < K_c$ nach rechts, $Q > K_c$ nach links, $Q = K_c$ im Gleichgewicht.
FRAGE: Wann gilt die Klein-x-Naeherung? | ANTWORT: Wenn $x \ll c_0$ (Faustregel $x/c_0 < 5\%$), geprueft durch Rueckeinsetzen.

Klausur-Satz: `Q gegen K_c entscheidet jede Richtung, die Tabelle liefert jede Zahl.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"$Q$ 与 $K_c$ 各有各的公式"。
   中文纠偏：同一 MWG 式，只是代入时刻不同；写两个公式必错其一。
   Korrektur-Satz: `Q und K_c teilen denselben Ausdruck, nur die Zeitpunkte differieren.`

2. 误解"近似解完不用检验"。
   中文纠偏：小 $x$ 近似是赊账，必须回代验 $5\%$；超了就老实解二次方程。
   Korrektur-Satz: `Jede Naeherung wird durch Rueckeinsetzen geprueft.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor und kontrollierst eine Gleichgewichtsrechnung.
SITUATION: Ein Kursmitglied verwechselt $Q$ mit $K_c$ und vergisst die Probe der Naeherung. Erklaere in zusammenhaengender Darstellung (ca. 150 Woerter) an einem Zahlenbeispiel, wie man $Q$ berechnet, die Richtung bestimmt und die Naeherung prueft.
RUBRIC (30 XP): $Q$-Rechnung mit MWG-Ausdruck (10 XP) | Richtungsbegruendung ueber $K_c$ (8 XP) | Naeherungspruefung mit $5\%$-Regel (8 XP) | Fachsprachliche Korrektheit (4 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：有数就算 $Q$ 比 $K_c$，无扰动才空讲原理。三段式按系数配 $x$，近似必回代。记住一句话——商小补右，商大退左，相等即稳。
Takeaway-Satz: `Q sucht K_c; die Tabelle weist den Weg, die Probe sichert die Zahl.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Q-Rechnung (Schritt 4) oder die Verfahrenswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst den MWG-Ausdruck hin, dann erst Zahlen.
