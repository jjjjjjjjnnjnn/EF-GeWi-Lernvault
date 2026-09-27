---
fach: Physik
thema: "Diagramme lesen, zeichnen und Messfehler beurteilen"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, analysieren, interpretieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Physik, Messung]
version: Lesson-v3
---

# Lernreise: Diagramme lesen, zeichnen und Messfehler beurteilen (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能按规范画图——先标轴和单位，再用散点表示测量点，最后画一条拟合直线（Ausgleichsgerade），不连折线、不强行过原点。
2. 中文：能从拟合直线的斜率读出待求物理量，并用"两点式"做一次交叉验算。
3. 中文：能区分随机误差与系统误差，并用一句受限的德语结论评价模型（"在测量不确定度范围内成立"）。

Klausur-Satz: `Die Ausgleichsgerade fasst die streuenden Messpunkte sinnvoll zusammen; ihre Steigung liefert die gesuchte Groesse, und die Streuung der Punkte gibt die Messunsicherheit an.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 拟合直线 — die Ausgleichsgerade：用最小二乘/趋势线穿过散点的最佳直线，斜率即待求量。
- 测量不确定度 — die Messunsicherheit：每次读数都带误差，结论只能在误差范围内成立。
- 随机误差 — der zufaellige Fehler：测量点无规律地散落在直线两侧，多次取平均可减小。
- 系统误差 — der systematische Fehler：所有读数朝同一方向偏移，如停表启动过晚，取平均也消不掉。
- 散点图 — das Punktdiagramm：只画数据点、不连折线的图，用于观察趋势。

Klausur-Satz: `Zufaellige Fehler streuen unsystematisch um die Ausgleichsgerade, waehrend systematische Fehler alle Messwerte in dieselbe Richtung verschieben.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：实验数据的价值不在"算出一个数"，而在"能不能说清这个数有多可信"。规范流程是四步。第一，做表：两列量各带单位、保留合理小数位，不跳点。第二，画图：横纵轴都要写清物理量和单位，用**散点**而不是折线——折线会假装数据连续，而物理数据是离散的。第三，画一条拟合直线（Excel 的趋势线，或手工目测的平衡线），读出它的斜率，斜率就是待求量（比如 s-t 图的斜率是速度）。第四，评价：看点偏离直线的程度谈随机误差，看仪器和操作谈系统误差。随机误差无规律地上下散布，多次测量取平均能压住它；系统误差则让所有点整体偏高或偏低（比如停表总是启动晚半秒），取平均也救不了。最后写结论时只说"模型在测量不确定度范围内成立"，绝不说"绝对精确"。

补充：拟合直线不强行过原点，除非物理上确定"零输入对应零输出"（例如 t = 0 时 s = 0）。用两点式 v = Δs/Δt 独立核对拟合斜率，两个值越接近，说明模型越可靠；若两者相差很大，先怀疑轴标签或单位错了，而不是急着改结论。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
    s ^
      |                        .   (Messpunkt, gestreut)
      |                     .     /
      |                  .       /  Ausgleichsgerade
      |               .        /    (Steigung = v)
      |            .         .
      |         .       .
      |      .     .
      |   .   .
      +-----------------------------> t
       Achsen mit Einheit, Punkte als
       Punkte, Linie als Ausgleichsgerade

    zufaellig:  Punkte oben UND unten  -> mitteln hilft
    systematisch: alle Punkte zu hoch -> mitteln hilft NICHT
```

Klausur-Satz: `Ein Diagramm ohne beschriftete Achsen samt Einheiten ist wertlos, und eine Messreihe darf nur im Rahmen der Messunsicherheit beurteilt werden.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Ein beruehmtes Beispiel fuer einen systematischen Fehler ist der Spiegel des Hubble-Weltraumteleskops: Beim Schleifen wurde ein Messgeraet falsch zusammengesetzt, sodass alle Kontrollmessungen in dieselbe Richtung abwichen und der Spiegel eine winzige, aber folgenreiche Fehlform bekam. Der Fehler fiel erst nach dem Start auf und liess sich nicht durch mehr Messen oder Mitteln beseitigen, sondern nur durch eine Korrektur an der Ursache.

**中文解读**: 哈勃望远镜主镜因检验仪器装配错误而整体磨偏，所有读数朝同一方向偏离——这是"系统误差"的教科书案例：取平均也救不了，只能修源头。它印证了本课核心：随机误差靠多次测量压低，系统误差必须找到仪器或操作上的原因。记住这个故事，你就不会把两类误差混为一谈。

**Bezug zum Konzept**: `Der Hubble-Spiegel zeigt, dass ein systematischer Fehler alle Messwerte gleichsinnig verschiebt und nur an seiner Ursache behoben werden kann, nicht durch Mittelung.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (analysieren, AFB II)：Bei einem Versuch mit einem Wagen auf gerader Bahn werden die folgenden Messwerte aufgenommen (t in s; s in m): 0 s / 0 m, 2 s / 1,05 m, 4 s / 1,96 m, 6 s / 3,05 m, 8 s / 3,98 m. Stellen Sie die Messreihe als Punktdiagramm dar, bestimmen Sie die Steigung der Ausgleichsgeraden und beurteilen Sie, ob das Modell der gleichförmigen Bewegung im Rahmen der Messunsicherheit haltbar ist.

HILFE:
1. Schritt 1: Trage die Punkte in ein s-t-Diagramm ein (Achsen mit Einheit) und lege eine Ausgleichsgerade durch die Punkte.
2. Schritt 2: Lies die Steigung mit zwei weit auseinanderliegenden Punkten als v = Δs/Δt ab.
3. Schritt 3: Vergleiche die Messpunkte mit der Geraden und beurteile die Abweichungen als zufällig oder systematisch.

MUSTERLÖSUNG: Trägt man die Punkte in ein s-t-Diagramm ein, so liegen sie nahezu auf einer Geraden durch den Ursprung. Die Steigung der Ausgleichsgeraden bestimmt man mit den äußeren Punkten: v = Δs/Δt = (3,98 m - 0 m) / (8 s - 0 s) = 0,4975 m/s, gerundet 0,50 m/s. Die Zwischenwerte stützen dieses Ergebnis: 1,05 m / 2 s = 0,525 m/s, 1,96 m / 4 s = 0,490 m/s und 3,05 m / 6 s = 0,508 m/s streuen unregelmäßig um 0,50 m/s. Vergleicht man jeden Messpunkt mit der Geraden s = 0,50 m/s * t, so liegt der Punkt bei t = 2 s um 0,05 m über, der bei t = 4 s um 0,04 m unter, der bei t = 6 s um 0,05 m über und der bei t = 8 s um 0,02 m unter der Geraden — die Abweichungen wechseln also das Vorzeichen und sind damit zufällig. Daher ist das Modell der gleichförmigen Bewegung im Rahmen der Messunsicherheit haltbar; eine exakte Aussage ist wegen der Streuung nicht zulässig.

Klausur-Satz: `Die Ausgleichsgerade ergibt eine Geschwindigkeit von etwa 0,50 m/s, und da die Abweichungen unsystematisch streuen, ist das Modell im Rahmen der Messunsicherheit haltbar.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：随机误差眼 vs. 系统误差眼）：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先看测量点相对拟合直线的偏离方式：(i) Zufallsfehler-Verfahren（点无规律地散在直线两侧，正负偏差交替出现 → 多次测量取平均）oder (ii) Systemfehler-Verfahren（所有点朝同一方向偏离，直线整体平移或斜率被拉偏 → 找仪器与操作原因）—— dann lösen.

AUFGABE A：Eine Messreihe zeigt Punkte, die abwechselnd über und unter der Ausgleichsgeraden liegen, ohne erkennbares Muster. Welches Verfahren ist zu wählen, und wie lässt sich der Fehler verkleinern?

AUFGABE B：Bei einer Zeitmessung wurde die Stoppuhr bei jedem Durchgang etwa 0,3 s zu spät gestartet, sodass alle Zeitwerte systematisch zu groß sind. Welches Verfahren ist zu wählen, und warum hilft Mittelwertbildung hier nicht?

HILFE: A: Die Punkte streuen ohne Muster → Verfahren (i), Zufallsfehler, Mehrfachmessung mittelt die Streuung heraus. B: Alle Werte sind gleichsinnig verschoben → Verfahren (ii), Systemfehler, der Mittelwert bleibt verschoben.【选程序：偏差正负交替走随机程序；偏差同一方向走系统程序。】

ANTWORT: A erfordert Verfahren (i): Da die Punkte unsystematisch um die Ausgleichsgerade streuen, handelt es sich um zufällige Fehler; sie lassen sich durch wiederholte Messung und Mittelwertbildung verkleinern, weil sich positive und negative Abweichungen gegenseitig aufheben. B erfordert Verfahren (ii): Der um 0,3 s zu späte Start verschiebt alle Zeitwerte gleichsinnig, also liegt ein systematischer Fehler vor; die Mittelwertbildung mittelt diese Verschiebung nur mit, der Mittelwert bleibt zu groß. Der Fehler muss an der Ursache behoben werden, indem man den Startzeitpunkt korrigiert oder eine Lichtschranke verwendet.

Klausur-Satz: `Zufaellige Fehler werden durch Mittelung verkleinert, systematische Fehler dagegen nur durch das Beheben ihrer Ursache.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welche drei Elemente muss ein sauberes Diagramm mindestens enthalten? | ANTWORT: Beschriftete Achsen mit physikalischer Groesse, zugehoerige Einheiten und die eingezeichneten Messpunkte bzw. die Ausgleichsgerade.
FRAGE: Woran erkennt man einen systematischen Fehler in einer Messreihe? | ANTWORT: Alle Messwerte weichen gleichsinnig von der Ausgleichsgeraden ab, sodass die Gerade verschoben oder ihre Steigung verfaelscht ist.
FRAGE: Warum darf ein Messergebnis nicht als exakt bezeichnet werden? | ANTWORT: Weil jede Messung eine Unsicherheit traegt; das Ergebnis gilt nur im Rahmen dieser Messunsicherheit.

Klausur-Satz: `Ein Messergebnis wird nur im Rahmen der Messunsicherheit beurteilt, wobei zufaellige und systematische Fehler getrennt benannt werden.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"把测量点用折线连起来就是画图"。
   中文纠偏：物理数据是离散的，折线会暗示点与点之间真实存在那段变化，从而编造出不存在的细节。正确做法是只画散点，再补一条拟合直线或拟合曲线来体现整体趋势。
   Korrektur-Satz: `Messpunkte werden als Punkte dargestellt und durch eine Ausgleichsgerade zusammengefasst, nicht durch eine stueckweise verbundene Linie.`

2. 误解"多做几次取平均，什么误差都能消掉"。
   中文纠偏：取平均只能压住随机误差，对系统误差完全无效。停表总是晚启动、米尺零点磨损，这些会让所有点整体偏移，平均之后偏移依旧存在，只能从仪器和操作上找原因。
   Korrektur-Satz: `Die Mittelung verkleinert nur zufaellige Fehler; systematische Fehler bleiben erhalten und muessen an ihrer Ursache beseitigt werden.`

## Schritt 7 — szenario

ROLLE: Du bist Mitglied der Physik-AG und sollst für das Schuljahrbuch einen Versuch zur gleichförmigen Bewegung auswerten und dokumentieren.
SITUATION: Eine Gruppe hat eine Messreihe (t in s, s in m) aufgenommen; die Punkte streuen leicht um eine Gerade, und ein Schüler behauptet, das Ergebnis sei "genau 0,50 m/s". Die Redaktion fragt dich, wie man die Daten korrekt darstellt, die Geschwindigkeit bestimmt und die Aussagekraft der Messung bewertet. Beurteile in einer zusammenhängenden Stellungnahme (ca. 150 Wörter) unter Rückgriff auf Ausgleichsgerade und Messunsicherheit.
RUBRIC (30 XP): Beschreibung der korrekten Darstellung (Achsen mit Einheit, Punkte, Ausgleichsgerade) (5 XP) | Bestimmung der Steigung als Geschwindigkeit mit Rechnung (10 XP) | Beurteilung der Abweichungen als zufaellig bzw. systematisch (10 XP) | Eingeschraenktes, kriteriengeleitetes Fazit statt "exakt" (5 XP).

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY 1盒（核心总结）：

中文：实验题的分数在"规范"两个字上。画图三件套：轴、单位、散点加拟合线；读数靠斜率，结论靠误差。误差分两类：随机误差让点上下乱跳、取平均能压住；系统误差让点整体偏移、只能改仪器改操作。最后那句结论是拿分关键——说"在测量不确定度范围内成立"，而不是"绝对准确"。这套流程不只用于 s-t 图，任何"数据→直线→斜率"的实验都通用。
Takeaway-Satz: `Achsen mit Einheiten, Punkte plus Ausgleichsgerade, Steigung als Ergebnis und ein Urteil nur im Rahmen der Messunsicherheit — so wird aus einer Messreihe ein belastbares Ergebnis.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Ablesen der Steigung aus der Ausgleichsgeraden (Schritt 4) oder die Unterscheidung von zufaelligem und systematischem Fehler im Vergleich (Schritt 5)?
2. 元认知计划：Beim nächsten Mal beschrifte ich zuerst die Achsen mit Einheiten und pruefe am Ende, ob meine Schlussfolgerung den Fehlerrahmen ausdruecklich nennt.
