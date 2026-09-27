---
fach: Mathe
thema: "CN-Tricks: sechs Schnellverfahren"
level: 1
ziel: Klausur
xp: 100
operatoren: [anwenden, begruenden, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: CN-Tricks — sechs Schnellverfahren (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 8/33 | Krise: Lieferketten-Engpass: 640 Boxen pro Stunde | Target: x0 = 5, h = 0.1, Target m = 5.96 | Tool: formula -->

## Schritt 1 — entdecken: Kiste fuer den Mars
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说出六种中国速解法的原理与适用条件——特殊值法、排除法、数形结合、韦达定理、均值不等式、分离参数。
2. 中文：能为每种技法做一道自编小题，并把结果翻译成一句德语检验句（Pruefsatz）。
3. 中文：能判断速解法何时失效，并果断切回德国通法——因为大题只认完整过程（AFB II/III）。

### Hook / Phaenomen

【首席算法官·第8集/共33集】警报：Lieferketten-Engpass: 640 Boxen pro Stunde。首席算法官下令：“x0 = 5, h = 0.1, Target m = 5.96！”全场红灯闪烁。上一集（Mathe-CN-Tricks-DE-L1.md）的伏笔在此引爆，下一集（Mathe-Extremwertprobleme-Optimierung-DE-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 8 von 33): Super-Engineering-Zentrale, Lieferketten-Engpass: 640 Boxen pro Stunde. Der Chief Algorithm Officer ruft: x0 = 5, h = 0.1, Target m = 5.96, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet CN-Tricks: sechs Schnellverfahren ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-CN-Tricks-DE-L1.md) legte die Spur, das naechste Audit (Mathe-Extremwertprobleme-Optimierung-DE-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 特殊值法 — Spezialwert-Methode：代入 0、1、-1 等好算的值先猜结果，再回头证明。
- 排除法 — Ausschlussverfahren：用定义域、符号、无穷趋势先砍掉不可能的情形。
- 数形结合 — Skizze / Veranschaulichung：画草图把代数问题变成图像上的交点与单调问题。
- 分离参数 — Parametertrennung：把参数单独放到不等式一边，另一边求最值。
- 检验句 — Pruefsatz：把速解结果写成一句德语结论，明确它的适用范围。

Klausur-Satz: `Jedes Schnellverfahren ist nur eine Abkuerzung; ohne Bedingungspruefung gibt es in der Klausur keine Punkte.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter CN-Tricks: sechs Schnellverfahren
ENTDECKEN（1概念 + 1文字图解）：

中文：中国选择填空常用速解法"秒杀"，但德国 Klausur 按论证链给分，所以这些技法只能当草稿纸上的侦察工具。正确的分工是：速解法负责定位答案、发现错误、缩小范围；德国通法负责写出完整过程、拿到分数。六法各有一个适用条件，条件不满足就立即换通法。下面每法都给一道自编小题和一句德语检验句。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Trick            Bedingung / 适用条件            Rolle
   --------------   -----------------------------   ----------------
   1 特殊值法        一般成立则特殊必成立            先猜结果
   2 排除法          定义域/符号/趋势可判定          砍掉错项
   3 数形结合        能画单调与交点草图              数零点个数
   4 韦达定理        仅二次方程 ax^2+bx+c=0          秒验根
   5 均值不等式      两项为正且有定积                秒最小值
   6 分离参数        不等式可把参数单独放一边        恒成立求最值
   --------------   -----------------------------   ----------------
   速解法 = Schmierpapier 侦察; 通法 = Reinschrift 得分
```

六法详解（每法：原理 + 自编 mini 例题 + 德语检验句）：

- 特殊值法（Spezialwert-Methode）：一般结论若成立则对特殊值必成立。自编题：若 `f(x) = (x - 3)^2 + k` 对一切 x 满足 `f(x) >= 2`，猜 k 的范围。取 x = 3 得 `k >= 2`；再证 `(x - 3)^2 >= 0` 故充分。德语检验句：`Ich teste den Spezialwert x = 3 zur Vermutung und beweise danach allgemein.`
- 排除法（Ausschlussverfahren）：用定义域、符号、无穷趋势先排除。自编题：`f(x) = -3x^3 + 2x - 5` 当 `x -> +unendlich` 的趋势？首项 `-3x^3 -> -unendlich`，故"趋向 +unendlich"的猜测直接排除。德语检验句：`Ich schliesse unmoegliche Faelle ueber Definitionsbereich und Grenzverhalten aus.`
- 数形结合（Skizze）：方程根即图像交点。自编题：`g(x) = x^3 - 3x + 1` 有几个零点？`g'(x) = 3x^2 - 3 = 0` 得 `x = 1` 与 `x = -1`；`g(-1) = 3 > 0`、`g(1) = -1 < 0`，结合两端趋势得三个零点。德语检验句：`Die Skizze zeigt Monotonie und Nullstellen, der Rechenweg belegt sie.`
- 韦达定理（Satz von Vieta）：二次方程和与积由系数读出。自编题：断言 `x^2 - 9x + 20 = 0` 的根为 3 与 6？和为 9 对了但积 18 不等于 20，故错误，真根为 4 与 5。德语检验句：`Nach Vieta pruefe ich Summe x1 + x2 = -b/a und Produkt x1 * x2 = c/a.`
- 均值不等式（AM-GM）：正数和定积最大。自编题：`x > 0` 时求 `x + 9/x` 的最小值。由 AM-GM 得 `>= 2 * Wurzel(9) = 6`，等号在 `x = 3` 处成立。德语检验句：`Da x > 0 gilt, folgt mit AM-GM die Abschaetzung mit Gleichheit fuer x = 3.`
- 分离参数（Parametertrennung）：`k >= h(x)` 恒成立等价于 `k >= max h(x)`。自编题：`k >= 4x - x^2` 对 `x` 在 `[0; 4]` 恒成立，求最小 k。`h(x) = -x^2 + 4x` 顶点 `x = 2`，`h(2) = 4`，故 `k_min = 4`。德语检验句：`Ich trenne den Parameter ab und bestimme das Maximum von h auf dem Intervall.`

Klausur-Satz: `Ich wende ein Schnellverfahren zur Orientierung an und belege das Ergebnis anschliessend mit dem Standardweg.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Das Wort Heuristik stammt vom griechischen heuriskein, "finden" oder "entdecken". Denselben Wortstamm hoert man im beruehmten "Heureka!" des Archimedes. Eine Heuristik hilft, eine Loesung zu finden, sie beweist sie aber nicht. Genau das ist die Rolle der chinesischen Schnellverfahren: Sie sind Suchhilfen, kein Beweis.

**中文解读**: 速解法本质是"启发式"(Heuristik)——它的词根就是"发现"，和 Archimedes 的 "Heureka"（我发现了）同源。这提醒我们：速解法擅长发现答案，却不能替代证明；遇到 begruenden/beweisen 必须切回通法。

**Bezug zum Konzept**: `Schnellverfahren sind Heuristiken: Sie finden eine Vermutung, den Beweis liefert der Standardweg.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Kiste fuer den Mars
Kontinuitaet: Vorher Mathe-CN-Tricks-DE-L1.md | Nachher Mathe-Extremwertprobleme-Optimierung-DE-L1.md. Krise dieser Episode: Lieferketten-Engpass: 640 Boxen pro Stunde. Target: x0 = 5, h = 0.1, Target m = 5.96.

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (anwenden, AFB II)：Vergleichen Sie die Zahlen a = 2^30 und b = 3^20 mit der Spezialwert-Idee (gleiche Exponenten suchen) und bestaetigen Sie das Ergebnis durch eine Abschaetzung.

HILFE:
1. Schritt 1: Beide Zahlen als Potenz mit demselben Exponenten schreiben (Potenzgesetze).
2. Schritt 2: Die Basen vergleichen und die Monotonie der Potenzfunktion nutzen.
3. Schritt 3: Ergebnis als Pruefsatz formulieren.

MUSTERLÖSUNG: Es gilt a = 2^30 = (2^3)^10 = 8^10 und b = 3^20 = (3^2)^10 = 9^10. Da die Funktion `x^10` fuer `x > 0` monoton waechst und `8 < 9` gilt, folgt `8^10 < 9^10`, also `a < b`. Das Schnellverfahren liefert hier direkt das Ergebnis, weil beide Zahlen auf denselben Exponenten 10 gebracht werden koennen; die Monotonie der Potenzfunktion begruendet den Schluss sauber.

Klausur-Satz: `Da 2^30 = 8^10 und 3^20 = 9^10 gilt und 8 < 9 ist, folgt a < b.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Kiste fuer den Mars
VERGLEICH辨别实验（双向辨析：猜值眼 vs. 证明眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目要的是 (i) Schnellverfahren（草稿纸上猜值、缩小范围、验算）还是 (ii) Standardweg（Reinschrift 上必须写完整证明，如 begruenden/nachweisen）—— dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Fuer `x > 0` ist `x + 9/x` gegeben. Vermuten Sie den minimalen Wert durch Einsetzen geeigneter Werte.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Fuer `x > 0` ist `x + 9/x` gegeben. Beweisen Sie, dass der Wert 6 ein Minimum ist.

HILFE: A verlangt nur eine Vermutung -> Verfahren (i), Spezialwert x = 3 einsetzen. B verlangt einen Beweis -> Verfahren (ii), AM-GM mit Gleichheitsbedingung.【选程序：Operator 是 vermuten/entscheiden 用速解法；Operator 是 begruenden/beweisen/nachweisen 必须写通法。】

ANTWORT: A erfordert Verfahren (i): Setzt man x = 3 ein, ergibt sich 3 + 9/3 = 6; dies legt 6 als Minimum nahe, beweist es aber nicht. B erfordert Verfahren (ii): Da x > 0 und 9/x > 0, folgt mit AM-GM x + 9/x >= 2 * Wurzel(x * 9/x) = 2 * 3 = 6; Gleichheit gilt fuer x = 9/x, also x = 3. Damit ist 6 nachweislich das Minimum.

Klausur-Satz: `Ein Spezialwert liefert nur eine Vermutung; erst die AM-GM-Abschaetzung mit Gleichheitsbedingung beweist das Minimum.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu CN-Tricks: sechs Schnellverfahren: Kiste fuer den Mars
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Warum beweist das Einsetzen eines Spezialwertes keine allgemeine Aussage? | ANTWORT: Weil eine Aussage, die fuer einen einzelnen Wert gilt, nicht fuer alle Werte gelten muss.
FRAGE: Wann darf man den Satz von Vieta in der Form x1 + x2 = -b/a verwenden? | ANTWORT: Nur bei einer quadratischen Gleichung ax^2 + bx + c = 0 mit a ungleich 0.
FRAGE: Was liefert die Parametertrennung bei einer Ungleichung der Form k >= h(x)? | ANTWORT: Die Bedingung wird zu k >= max h(x); der Parameter steht allein auf einer Seite.

Klausur-Satz: `Schnellverfahren liefern Vermutungen und Kontrollen, den Beweis uebernimmt der Standardweg.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"特殊值算对了就等于证明了结论"。
   中文纠偏：错。对一个点成立不代表对全体成立。特殊值法只能用来猜答案或验算，正卷里凡遇 `begruenden/nachweisen`，必须补上一般性证明。
   Korrektur-Satz: `Ein einzelner Spezialwert beweist keinen allgemeinen Satz; er dient nur der Vermutung.`

2. 误解"分离参数时可以直接把不等式两边乘以含 x 的式子"。
   中文纠偏：错。乘以负数会使不等号方向翻转，乘以可能为零的式子更是非法。必须先判断所乘表达式的符号，必要时分类讨论。
   Korrektur-Satz: `Beim Multiplizieren einer Ungleichung mit einem Term muss dessen Vorzeichen geprueft werden, da sich sonst das Ungleichheitszeichen umdreht.`

## Schritt 7 — szenario: Klausurtransfer: CN-Tricks: sechs Schnellverfahren: Kiste fuer den Mars
ROLLE: Du bist Tutor in einem bilingualen Mathe-Kurs und sollst eine Strategiekarte erstellen.
SITUATION: Ein Mitschueler will in der Klausur nur mit chinesischen Schnellverfahren arbeiten und keine Standardwege schreiben. Beurteile seine Strategie in einer zusammenhaengenden Darstellung (ca. 150 Woerter) und erlaeutere an zwei Beispielen (Spezialwert und AM-GM), wann ein Schnellverfahren erlaubt ist und wann der Standardweg zwingend ist.
RUBRIC (30 XP): Benennung des Grundproblems — Heuristik ersetzt keinen Beweis (5 XP) | Beispiel Spezialwert: Vermutung versus Beweis (10 XP) | Beispiel AM-GM: Positivitaet plus Gleichheitsbedingung (10 XP) | Kriteriengeleitetes Fazit zur Arbeitsteilung von Schmierpapier und Reinschrift (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Kiste fuer den Mars
TAKEAWAY 1盒（核心总结）：

中文：六法只做草稿纸侦察——特殊值猜、排除法砍、画图看、韦达验、均值凑、参数分。它们帮你快速定位答案、发现错误、缩小范围，但绝不代替正卷上的通法。凡遇 `begruenden/beweisen/nachweisen`，一律补上一般性证明与条件句。记住一句话——速解法定方向，通法定分数。
Takeaway-Satz: `Schnellverfahren gehoeren aufs Schmierpapier, in die Reinschrift gehoeren Standardweg und Bedingungssaetze.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Anwendung der sechs Verfahren (Schritt 3) oder die Entscheidung zwischen Schnellverfahren und Standardweg (Schritt 5)?
2. 元认知计划：Beim naechsten Mal lese ich zuerst den Operator; bei begruenden oder beweisen schreibe ich sofort den Standardweg und nutze die Tricks nur zur Kontrolle.

`Klausur-Satz: Siehe Schritt-Inhalt.`
