---
fach: Mathe
thema: "Monotonie und Extrempunkte kompakt"
level: 1
ziel: Klausur
xp: 100
operatoren: [untersuchen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Monotonie und Extrempunkte kompakt (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说出单调性的判据——一阶导数在某区间内恒正则上升、恒负则下降，并据此画出符号表。
2. 中文：能完整执行极值两步法：必要条件 `f'(x0) = 0` 找候选点，充分条件（二阶导符号或 f' 变号）定性，再回代求点坐标。
3. 中文：能分清"局部极值"与"全局极值"，并在德语答题句里正确区分 Hochpunkt 与 globales Maximum（AFB II）。

Klausur-Satz: `Ein lokaler Extrempunkt liegt vor, wenn f'(x0) = 0 gilt und f' an dieser Stelle das Vorzeichen wechselt oder f''(x0) ungleich 0 ist.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 单调递增 — monoton steigend：在该区间内 `f'(x) > 0`，图像自左向右上升。
- 单调递减 — monoton fallend：在该区间内 `f'(x) < 0`，图像自左向右下降。
- 必要条件 — notwendige Bedingung：`f'(x0) = 0`，只是极值点的候选条件，单独不充分。
- 充分条件 — hinreichende Bedingung：`f''(x0) < 0` 为极大、`f''(x0) > 0` 为极小（或 f' 变号）。
- 符号表 — Vorzeichentabelle：把 f' 的零点排开、逐段判断正负，据此读出单调区间。

Klausur-Satz: `Die Monotonie ergibt sich aus dem Vorzeichen der ersten Ableitung, die Art des Extremums aus dem Vorzeichen der zweiten Ableitung.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：单调性和极值其实是同一件事的两面。一阶导数 f' 的正负告诉你曲线往哪走：f' 为正就上升，为负就下降。既然极值点必须是"由升转降"或"由降转升"的转折处，那么在转折点上 f' 只能恰好为零——这就是必要条件。但 `f'(x0) = 0` 只是候选：它也可能是拐点处的一段平台（鞍点）。要确认类型，就用充分条件——看 f' 是否真的变号，或看二阶导 f''(x0) 的符号：f'' 为负说明曲线向下弯（极大），f'' 为正说明向上弯（极小）。三步走：求 f'、解 f' = 0、用 f'' 定性并回代求点。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   f'(x) :  +  +  + | -  -  - | +  +  +
                   x1        x2
   f(x) :  steigt   | faellt  | steigt
            \ Hochpunkt /   \ Tiefpunkt /
   f'(x1)=0, VZW + -> -  => lokales Maximum  (f''(x1)<0)
   f'(x2)=0, VZW - -> +  => lokales Minimum  (f''(x2)>0)
   Merke: f'(x0)=0 ist nur notwendig, erst der VZW entscheidet.
```

Klausur-Satz: `Wechselt f' an der Stelle x0 das Vorzeichen von plus nach minus, so liegt dort ein lokales Maximum vor.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Stell dir vor, du stehst auf dem Gipfel eines kleinen Berges: Rundherum geht es nur nach unten, also fuehlt sich der Punkt wie der hoechste der Umgebung an. Trotzdem ist dieser Gipfel nicht der hoechste Punkt der Erde. Genauso ist ein Hochpunkt einer Funktion nur ein lokales Maximum — weiter weg kann die Funktion deutlich groessere Werte annehmen.

**中文解读**: 站在小山山顶，四周都在下降，你会觉得到了最高点，但它并不是全球最高点。这正对应局部极值与全局极值的区别：f'(x0)=0 找到的只是局部候选，要谈全局最大或最小，还必须比较所有候选点与区间端点。

**Bezug zum Konzept**: `Ein Hochpunkt ist nur ein lokales Maximum; das globale Maximum muss nicht dort liegen.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: lego]

AUFGABE (untersuchen, AFB II)：Gegeben ist f(x) = x^3 - 6x^2 + 9x + 1. Untersuchen Sie f rechnerisch auf Monotonie sowie auf lokale Extrempunkte und geben Sie Art und Koordinaten an.

HILFE:
1. Schritt 1: f'(x) bilden und f'(x) = 0 setzen, um die Kandidaten zu erhalten.
2. Schritt 2: f''(x) bilden und an den Kandidaten auswerten (negativ -> Hochpunkt, positiv -> Tiefpunkt).
3. Schritt 3: Die Kandidaten in f einsetzen, um die y-Koordinaten zu erhalten; mit dem Vorzeichen von f' die Monotonieintervalle angeben.

MUSTERLÖSUNG: Es gilt f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x - 1)(x - 3). Die notwendige Bedingung f'(x) = 0 liefert die Kandidaten x1 = 1 und x2 = 3. Mit f''(x) = 6x - 12 folgt f''(1) = -6 < 0, also ein lokales Maximum, und f''(3) = 6 > 0, also ein lokales Minimum. Die Funktionswerte sind f(1) = 1 - 6 + 9 + 1 = 5 und f(3) = 27 - 54 + 27 + 1 = 1. Damit gilt HP(1 | 5) und TP(3 | 1). Da f'(x) fuer x < 1 positiv, fuer 1 < x < 3 negativ und fuer x > 3 wieder positiv ist, steigt f auf ]-unendlich; 1[ und ]3; +unendlich[ und faellt auf ]1; 3[.

Klausur-Satz: `Der Graph besitzt bei x = 1 ein lokales Maximum mit HP(1 | 5) und bei x = 3 ein lokales Minimum mit TP(3 | 1).`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：二阶导眼 vs. 变号眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断该用 (i) f''-Kriterium（二阶导易算且在该点不为零）还是 (ii) VZW-Kriterium（符号表，当 f''(x0) = 0 或二阶导很繁琐时）—— dann rechnen.

AUFGABE A：Bestimmen Sie die Art der Extremstelle von f(x) = x^3 - 6x^2 + 9x + 1 bei x = 3.
AUFGABE B：Bestimmen Sie die Art der Extremstelle von g(x) = x^4 bei x = 0.

HILFE: A: f''(x) = 6x - 12 ist einfach und f''(3) = 6 ungleich 0 -> Verfahren (i). B: g''(x) = 12x^2 ergibt g''(0) = 0, das Kriterium versagt hier; deshalb g'(x) = 4x^3 betrachten: fuer x < 0 ist g'(x) < 0, fuer x > 0 ist g'(x) > 0 -> Verfahren (ii).【选程序：f''(x0) 好算且非零用二阶导；f''(x0) = 0 或太繁用符号表。】

ANTWORT: A erfordert Verfahren (i): f''(3) = 6 > 0, also ein lokales Minimum (TP(3 | 1)). B erfordert Verfahren (ii): Da g''(0) = 0 das Kriterium nicht entscheidet, wird f' betrachtet; g'(x) = 4x^3 wechselt bei x = 0 das Vorzeichen von minus nach plus, also liegt dort ein lokales Minimum mit g(0) = 0 vor.

Klausur-Satz: `Ist f''(x0) ungleich 0, so entscheidet ihr Vorzeichen die Art; ist f''(x0) = 0, so muss der Vorzeichenwechsel von f' geprueft werden.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welche Bedingung ist notwendig fuer einen lokalen Extrempunkt? | ANTWORT: f'(x0) = 0, das heisst eine waagerechte Tangente an der Stelle x0.
FRAGE: Wie unterscheidet man mit der zweiten Ableitung ein Maximum von einem Minimum? | ANTWORT: f''(x0) < 0 bedeutet ein lokales Maximum, f''(x0) > 0 ein lokales Minimum.
FRAGE: Warum ist f'(x0) = 0 allein kein Beweis fuer ein Extremum? | ANTWORT: Weil bei einem Sattelpunkt ebenfalls f'(x0) = 0 gilt; erst ein Vorzeichenwechsel von f' sichert ein Extremum.

Klausur-Satz: `Aus f'(x0) = 0 und einem Vorzeichenwechsel von f' folgt ein lokaler Extrempunkt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"只要 f'(x0) = 0，那里就一定是极值点"。
   中文纠偏：这是把必要条件当成了充分条件。`f'(x0) = 0` 只说明切线水平，鞍点处也满足。必须再看 f' 是否变号，或用 f''(x0) 的符号定性，才能下结论。
   Korrektur-Satz: `f'(x0) = 0 ist nur notwendig; erst ein Vorzeichenwechsel von f' oder ein von null verschiedenes f''(x0) sichert ein Extremum.`

2. 误解"某点导数为正，整条函数就单调递增"。
   中文纠偏：单调性是区间性质，不是点性质。必须在一个完整区间上判断 f' 的符号，而不是看单点。正确做法是画符号表，把 f' 的所有零点排开、逐段定号。
   Korrektur-Satz: `Monotonie ist eine Eigenschaft eines Intervalls; entscheidend ist das Vorzeichen von f' auf dem gesamten Intervall.`

## Schritt 7 — szenario

ROLLE: Du bist Referent in einem Mathe-Crashkurs fuer die ZKE-Vorbereitung.
SITUATION: Ein Kursteilnehmer behauptet, jede Stelle mit f'(x0) = 0 sei automatisch ein Hoch- oder Tiefpunkt, und will seine Behauptung an f(x) = x^3 (mit f'(0) = 0) belegen. Bewerte seine Aussage in einer zusammenhaengenden Darstellung (ca. 150 Woerter) unter Rueckgriff auf notwendige und hinreichende Bedingung.
RUBRIC (30 XP): Benennung der Behauptung als Verwechslung von notwendig und hinreichend (5 XP) | Gegenbeispiel f(x) = x^3 mit f'(0) = 0, aber keinem Extremum (10 XP) | Korrekte Vorgehensweise mit f''- oder VZW-Kriterium (10 XP) | Kriteriengeleitetes Fazit zum Stellenwert beider Bedingungen (5 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：单调看 f' 的符号，极值走两步——必要条件 `f'(x0) = 0` 找候选，充分条件（f'' 符号或 f' 变号）定性，最后回代求点。`f'(x0) = 0` 只是"切线水平"，不等于极值，鞍点就是反例。全局极值要在所有局部候选加区间端点中比较。记住一句话——导数为零只是候选，变号才定类型。
Takeaway-Satz: `f'(x0) = 0 ist nur notwendig; erst der Vorzeichenwechsel von f' oder das Vorzeichen von f''(x0) legt die Art des Extremums fest.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Aufstellen der Vorzeichentabelle (Schritt 4) oder die Wahl zwischen f''- und VZW-Kriterium (Schritt 5)?
2. 元认知计划：Beim naechsten Mal pruefe ich nach dem Loesen von f'(x) = 0 zuerst f''(x0); ist es null, wechsle ich sofort zur Vorzeichentabelle.
