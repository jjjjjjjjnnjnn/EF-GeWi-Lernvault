---
fach: Chemie
thema: "Chemisches Gleichgewicht und Le Chatelier"
level: 1
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, deuten, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Gleichgewicht]
version: Lesson-v3
---

# Lernreise: Chemisches Gleichgewicht und Le Chatelier (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能写出可逆反应的 MWG 表达式，记住"指数=系数、纯固体与纯液体不写入"两条铁律。
2. 中文：能用反应商 Q 与 K_c 比较，判断平衡向哪个方向移动。
3. 中文：能用勒夏特列原理分析浓度、压强、温度三种扰动，并说清"只有温度改变 K_c"。

Klausur-Satz: `Nach dem Massenwirkungsgesetz ist die Gleichgewichtskonstante K_c der Quotient der mit ihren Koeffizienten potenzierten Gleichgewichtskonzentrationen von Produkten und Edukten; reine Feststoffe und Flüssigkeiten werden nicht aufgenommen.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 动态平衡 — dynamisches Gleichgewicht：正逆反应速率相等，浓度不再变化，但反应并未停止。
- 质量作用定律 — Massenwirkungsgesetz (MWG)：把平衡浓度按系数幂次写成商式，得 K_c。
- 平衡常数 — Gleichgewichtskonstante K_c：只随温度变化，其大小反映平衡偏向产物还是反应物。
- 反应商 — Reaktionsquotient Q：用任意时刻浓度代入同一表达式，用来判断移动方向。
- 勒夏特列原理 — Prinzip von Le Chatelier：系统受扰动时，平衡向削弱该扰动的方向移动。

Klausur-Satz: `Ein dynamisches Gleichgewicht liegt vor, wenn die Geschwindigkeiten der Hin- und Rückreaktion gleich groß sind und die Konzentrationen konstant bleiben.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：可逆反应不会"跑到底"，而是在某个位置停住——正反应速率等于逆反应速率，浓度不再变化，这就是动态平衡。平衡的"位置"用 K_c 定量刻画：K_c ≫ 1 说明偏产物，K_c ≪ 1 说明偏反应物。真正的解题引擎是勒夏特列原理：你给系统一个扰动，它就朝"削弱这个扰动"的方向移动。加反应物 → 消耗反应物（右移）；减压（对气体分子数多的一侧不利）→ 向气体分子数少的一侧移动；升温 → 向吸热方向移动。关键分界：浓度和压强只改变 Q，让 Q ≠ K_c，平衡移动直到 Q 重新等于 K_c；只有温度才真正改变 K_c 本身。把这条分界记牢，EF 的 Le Chatelier 题就不会翻车。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
N2 + 3 H2  <==>  2 NH3      (Hinreaktion exotherm, dH < 0)
 Edukte: 4 Gasteilchen      Produkt: 2 Gasteilchen

 Stoerung (Stress)          Antwort des Systems      K_c?
 ------------------------------------------------  ------
 c(N2) oder c(H2) erhoehen  -> nach rechts (Produkt)  unveraendert
 c(NH3) entziehen           -> nach rechts            unveraendert
 Druck erhoehen             -> nach rechts (weniger   unveraendert
                               Gasteilchen)
 Temperatur erhoehen        -> nach links (endotherm  sinkt
                               Richtung bevorzugt)
 Katalysator zugeben        -> nur schneller, Lage     unveraendert
                               unveraendert
```

三类定量任务速查（EF 全部题型）：
1. 求 K_c：给了平衡浓度 → 直接代入 MWG 表达式。
2. 求平衡浓度 / 转化率：给了 K_c 与初始浓度 → 画三段式表，解 x。
3. 判方向：给了 K_c 与任意时刻浓度 → 算 Q，与 K_c 比较（Q < K_c 向右，Q > K_c 向左，Q = K_c 已达平衡）。

两条铁律：指数 = 方程式系数（不是原子数）；纯固体与纯液体不写入表达式（如 CaCO3(s) <-> CaO(s) + CO2(g) 的 K_c 只等于 [CO2]）。

方向判据一句话：Q 比 K_c 小，说明产物"不够"，反应向右补；Q 比 K_c 大，说明产物"过多"，反应向左退；相等则已达平衡。判断完方向后，再补一句"平衡移动直到 Q 重新等于 K_c"，论证链就完整了。

Klausur-Tipp：凡是问"平衡如何移动"，标准答句都要含三个要素——扰动是什么、向哪边移动、为什么（削弱扰动 / Q 与 K_c 的关系）。只写方向不写理由，会丢掉 begründen 的分。

Klausur-Satz: `Eine Änderung der Konzentration oder des Drucks verändert K_c nicht, sondern nur den Reaktionsquotienten Q; allein eine Temperaturänderung verändert K_c selbst.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Bei der industriellen Ammoniaksynthese nach dem Haber-Bosch-Verfahren wird das Gleichgewicht N2 + 3 H2 <-> 2 NH3 gezielt beeinflusst. Da die Hinreaktion exotherm ist, verschiebt eine hohe Temperatur das Gleichgewicht nach links und senkt die Ausbeute. Trotzdem arbeitet die Industrie bei mehreren hundert Grad, weil die Reaktion sonst viel zu langsam läuft; hoher Druck und ein Katalysator lösen diesen Konflikt.

**中文解读**: 这是勒夏特列原理最著名的工业注脚：升温对"平衡位置"不利、却对"反应速率"有利，工厂必须两头权衡——高压 + 中等温度 + 催化剂。它同时印证本节的两条分界：压强只改 Q，温度才真正改 K_c。

**Bezug zum Konzept**: Das Haber-Bosch-Verfahren zeigt, dass Ausbeute und Reaktionsgeschwindigkeit nach dem Prinzip von Le Chatelier gegeneinander abgewogen werden müssen.

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: gleichgewicht]

AUFGABE (berechnen, AFB II)：Für die Reaktion H2(g) + I2(g) <-> 2 HI(g) gilt bei einer bestimmten Temperatur K_c = 64. Es werden H2 und I2 mit c0 = 0,50 mol/L eingesetzt, HI ist zu Beginn nicht vorhanden. Bestimmen Sie mithilfe einer Gleichgewichtstabelle die Gleichgewichtskonzentration von HI und den Umsetzungsgrad von H2.

HILFE:
1. Schritt 1: Schreibe die Reaktionsgleichung und den Ausdruck für K_c = [HI]^2 / ([H2] * [I2]).
2. Schritt 2: Erstelle die Dreisatztabelle (Start / Änderung / Gleichgewicht); die Änderungszeile folgt den Koeffizienten: -x / -x / +2x.
3. Schritt 3: Setze die Gleichgewichtskonzentrationen in K_c ein und löse durch Wurzelziehen.
4. Schritt 4: Berechne den Umsetzungsgrad als x / c0.

MUSTERLÖSUNG: Die Dreisatztabelle lautet: Start 0,50 / 0,50 / 0; Änderung -x / -x / +2x; Gleichgewicht 0,50 - x / 0,50 - x / 2x. Einsetzen ergibt (2x)^2 / (0,50 - x)^2 = 64. Da beide Seiten quadratisch sind, darf man die Wurzel ziehen: 2x / (0,50 - x) = 8, also 2x = 4 - 8x, woraus 10x = 4 und damit x = 0,40 mol/L folgt. Die Gleichgewichtskonzentration beträgt c(HI) = 2x = 0,80 mol/L, und für H2 bzw. I2 gilt c = 0,50 - 0,40 = 0,10 mol/L. Kontrolle: 0,80^2 / (0,10 * 0,10) = 0,64 / 0,01 = 64, also gleich K_c. Der Umsetzungsgrad von H2 ist x / c0 = 0,40 / 0,50 = 0,80, das heißt 80 %.

Klausur-Satz: `Zur Berechnung von Gleichgewichtskonzentrationen wird eine Dreisatztabelle verwendet, deren Änderungszeile nach den stöchiometrischen Koeffizienten angesetzt und anschließend in das Massenwirkungsgesetz eingesetzt wird.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：MWG-定量眼 vs. Le-Chatelier-定性眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目问的是 (i) MWG-Verfahren（给了浓度或 K_c，要算数值、算转化率）还是 (ii) Le-Chatelier-Verfahren（给了一个扰动，问平衡向哪边移动）—— dann lösen.

AUFGABE A：In einem Gefäß liegen bei 500 °C die Gleichgewichtskonzentrationen c(H2) = 0,20 mol/L, c(I2) = 0,20 mol/L und c(HI) = 1,60 mol/L vor. Berechnen Sie K_c und deuten Sie den Zahlenwert.

AUFGABE B：Für die exotherme Reaktion N2 + 3 H2 <-> 2 NH3 wird die Temperatur des Reaktionsgemischs erhöht. Geben Sie an, in welche Richtung sich das Gleichgewicht verschiebt, und begründen Sie dies.

HILFE: A nennt konkrete Gleichgewichtskonzentrationen und verlangt einen Zahlenwert → Verfahren (i). B nennt nur eine Temperaturänderung und fragt nach der Richtung → Verfahren (ii).【选程序：题目出现具体浓度或 K_c 数值 = MWG 定量程序；题目只描述一个扰动（升温/加压/加料）= 勒夏特列定性程序。】

ANTWORT: A erfordert Verfahren (i): Es gilt K_c = [HI]^2 / ([H2] * [I2]) = (1,60)^2 / (0,20 * 0,20) = 2,56 / 0,04 = 64. Da K_c deutlich größer als 1 ist, liegt das Gleichgewicht auf der Produktseite, die Bildung von HI wird also stark begünstigt. B erfordert Verfahren (ii): Die Hinreaktion ist exotherm. Nach dem Prinzip von Le Chatelier weicht das System der Temperaturerhöhung aus, indem es die endotherme Richtung bevorzugt, also die Rückreaktion; das Gleichgewicht verschiebt sich nach links, und K_c sinkt, weil nur die Temperatur K_c verändert.

Klausur-Satz: `Wird ein exothermes Gleichgewicht erwärmt, verschiebt es sich in Richtung der Edukte, da das System der Erwärmung durch die endotherme Rückreaktion entgegenwirkt.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welche Stoffe werden nicht in den Ausdruck für K_c aufgenommen? | ANTWORT: Reine Feststoffe und reine Flüssigkeiten, weil ihre Konzentration konstant ist.
FRAGE: Was bedeutet Q < K_c für die Reaktionsrichtung? | ANTWORT: Es liegen zu wenige Produkte vor; die Reaktion läuft bevorzugt in Richtung der Produkte (nach rechts).
FRAGE: Welche Größe verändert K_c selbst? | ANTWORT: Nur eine Temperaturänderung; Konzentration, Druck und Katalysator verändern K_c nicht.

Klausur-Satz: `Eine Änderung der Konzentration oder des Drucks verändert nur Q, während allein die Temperatur K_c verändert.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"加催化剂能让平衡右移、提高产率"。
   中文纠偏：催化剂只降低活化能、加快正逆反应速率，让系统更快达到平衡，但它同等加速两个方向，绝不改变平衡位置和 K_c。想提高产率要靠勒夏特列（如移出产物、加压、调温），不是靠催化剂。
   Korrektur-Satz: `Ein Katalysator beschleunigt Hin- und Rückreaktion gleichermaßen und verändert weder die Gleichgewichtslage noch K_c.`

2. 误解"平衡移动了，就说明 K_c 变了"。
   中文纠偏：两件事必须分开。改变浓度或压强只会让 Q 偏离 K_c，平衡移动是系统把 Q 重新拉回 K_c 的过程，K_c 本身不动；只有温度变化才会真正改变 K_c。答题时把"平衡移动"和"K_c 变化"混为一谈是高频扣分点。
   Korrektur-Satz: `Das Gleichgewicht verschiebt sich so lange, bis Q wieder gleich K_c ist; nur eine Temperaturänderung verändert K_c selbst.`

## Schritt 7 — szenario

ROLLE: Du bist Verfahrenstechniker in einem Werk, das nach dem Haber-Bosch-Verfahren Ammoniak herstellt.
SITUATION: Für die exotherme Reaktion N2(g) + 3 H2(g) <-> 2 NH3(g) soll die Ammoniak-Ausbeute erhöht werden. Die Betriebsleitung schlägt vor, die Temperatur deutlich zu erhöhen und den Druck abzusenken. Beurteile diesen Vorschlag in einer zusammenhängenden Stellungnahme (ca. 150 Wörter) mit dem Prinzip von Le Chatelier und begründe, welche Bedingungen tatsächlich günstig sind.
RUBRIC (30 XP): Analyse der Temperaturwirkung — exotherm, Erwärmen verschiebt nach links (8 XP) | Analyse der Druckwirkung — 4 Gasteilchen links gegen 2 rechts, Druckabsenkung verschiebt nach links (8 XP) | Gegenentwurf mit korrekten Bedingungen — hoher Druck, mäßige Temperatur, Katalysator (8 XP) | Kriteriengeleitetes Urteil mit Abwägung von Ausbeute und Reaktionsgeschwindigkeit (6 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：平衡题的解题顺序只有两步——先选程序：题目要数值 → MWG 定量程序（写式、三段式、解 x、算转化率）；题目给扰动 → 勒夏特列定性程序（加料往对侧走、加压往气体少的一侧走、升温往吸热一侧走）。再记死一条分界：浓度和压强只改 Q，只有温度改 K_c。K_c 越大越偏产物，催化剂永远只改速率不改位置。
Takeaway-Satz: `Das Gleichgewicht ist dynamisch; es verschiebt sich so lange, bis Q wieder gleich K_c ist, und nur die Temperatur verändert K_c selbst.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Aufstellen und Lösen der Gleichgewichtstabelle (Schritt 4) oder die Wahl zwischen MWG- und Le-Chatelier-Verfahren (Schritt 5)?
2. 元认知计划：Beim nächsten Mal prüfe ich zuerst, ob die Aufgabe einen Zahlenwert verlangt (dann MWG) oder nur eine Richtung nennt (dann Le Chatelier), und schreibe erst danach den Ansatz.
