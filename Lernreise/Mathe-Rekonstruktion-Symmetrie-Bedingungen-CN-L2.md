---
fach: Mathe
thema: "Rekonstruktion mit Symmetrie und passenden Bedingungen"
level: 2
ziel: Klausur
xp: 100
operatoren: [aufstellen, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: Rekonstruktion mit Symmetrie und passenden Bedingungen (L2, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 23/33 | Krise: Hafenbecken-Tide plus 68 cm | Target: x0 = 5, h = 0.8, Target m = 11.51 | Tool: box-optimizer -->

## Schritt 1 — entdecken: Steckbrief des Täters
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能从对称性直接降次设函数——偶函数只留偶次项，奇函数只留奇次项，减少未知数。
2. 中文：能把文字条件翻译成方程——过点用 $f(x)=y$，极值用 $f'(x)=0$，拐点用 $f''(x)=0$。
3. 中文：能在"对称设元"与"一般设元"之间做选择（选程序：对称降次 vs 全项待定）。

Voraussetzung（窄切口）：只做三次与四次多项式，已会求导法则；本题不处理分段与有理函数。

### Hook / Phaenomen

【首席算法官·第23集/共33集】警报：Hafenbecken-Tide plus 68 cm。首席算法官下令：“x0 = 5, h = 0.8, Target m = 11.51！”全场红灯闪烁。上一集（Mathe-Kurvendiskussion-Wendepunkte-L1.md）的伏笔在此引爆，下一集（Mathe-Rekonstruktion-Symmetrie-Bedingungen-L2.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 23 von 33): Super-Engineering-Zentrale, Hafenbecken-Tide plus 68 cm. Der Chief Algorithm Officer ruft: x0 = 5, h = 0.8, Target m = 11.51, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Rekonstruktion mit Symmetrie und passenden Bedingungen ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Kurvendiskussion-Wendepunkte-L1.md) legte die Spur, das naechste Audit (Mathe-Rekonstruktion-Symmetrie-Bedingungen-L2.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 偶对称 — Achsensymmetrie zur y-Achse：$f(-x) = f(x)$，只含偶次幂，如 $f(x) = ax^4+bx^2+c$。
- 奇对称 — Punktsymmetrie zum Ursprung：$f(-x) = -f(x)$，只含奇次幂，如 $f(x) = ax^3+bx$。
- 过点条件 — Punktbedingung：点 $(x_0|y_0)$ 在图像上即 $f(x_0) = y_0$。
- 极值条件 — Extrembedingung：在 $x_E$ 有极值即 $f'(x_E) = 0$ 加 $y$-值方程。
- 拐点条件 — Wendebedingung：在 $x_W$ 有拐点即 $f''(x_W) = 0$ 加 $y$-值方程。

Klausur-Satz: `Jede geometrische Bedingung wird in eine Gleichung uebersetzt: Punkte in f, Extrema in f', Wendepunkte in f''.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Rekonstruktion mit Symmetrie und passenden Bedingungen
ENTDECKEN（1概念 + 1文字图解）：

中文：待定系数法的成败取决于"设得对不对"。题目出现 achsensymmetrisch zur y-Achse，立刻把四次设成 $ax^4+bx^2+c$（三个未知数而非五个）；出现 punktsymmetrisch zum Ursprung，三次设成 $ax^3+bx$（两个未知数）。未知数个数 = 需要的条件个数，数一数条件够不够是第一步。然后每个条件写一行方程：过点写 $f$，极值横坐标写 $f'=0$，拐点横坐标写 $f''=0$，别忘了极值点和拐点的纵坐标也要各写一个 $f$ 方程。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
  Text -> Ansatz -> Gleichungen -> LGS -> Probe
  achsensymm.  f = ax^4+bx^2+c    3 Unbekannte = 3 Gleichungen
  punktsymm.   f = ax^3+bx        2 Unbekannte = 2 Gleichungen
  P(x0|y0)     f(x0) = y0
  Extremum xE  f'(xE) = 0  +  f(xE) = yE
  Wendep.  xW  f''(xW) = 0 +  f(xW) = yW
```

Klausur-Satz: `Die Symmetrie legt den Ansatz fest; jede Bedingung liefert genau eine Gleichung fuer das lineare Gleichungssystem.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der Mathematiker Carl Friedrich Gauss loeste als Schueler das Summieren von 1 bis 100 durch Symmetrie: Er paarte 1 mit 100, 2 mit 99 und erhielt 50 Paare zu je 101. Auch in der Rekonstruktion spart Symmetrie Arbeit — wer sie erkennt, halbiert die Zahl der Unbekannten.

**中文解读**: 高斯用配对省去 100 次加法，对称设元同理——认出对称就省掉一半未知数。本节训练的正是这种"先看结构、再列方程"的习惯。

**Bezug zum Konzept**: `Symmetrie zu erkennen halbiert den Ansatz, bevor das Gleichungssystem ueberhaupt aufgestellt wird.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Steckbrief des Täters
Kontinuitaet: Vorher Mathe-Kurvendiskussion-Wendepunkte-L1.md | Nachher Mathe-Rekonstruktion-Symmetrie-Bedingungen-L2.md. Krise dieser Episode: Hafenbecken-Tide plus 68 cm. Target: x0 = 5, h = 0.8, Target m = 11.51.

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: box-optimizer]

AUFGABE (berechnen, AFB II)：Der Graph einer ganzrationalen Funktion 3. Grades ist punktsymmetrisch zum Ursprung, verlaeuft durch $P(1|2)$ und besitzt an der Stelle $x = 2$ einen Extrempunkt. Bestimmen Sie den Funktionsterm.

HILFE:
1. Schritt 1: Symmetrieansatz $f(x) = ax^3+bx$ mit $f'(x) = 3ax^2+b$ waehlen.
2. Schritt 2: Bedingungen uebersetzen: $f(1) = 2$ und $f'(2) = 0$.
3. Schritt 3: Gleichungssystem loesen und Probe machen.

MUSTERLÖSUNG: Aus $f(1) = a+b = 2$ und $f'(2) = 12a+b = 0$ folgt durch Subtraktion $11a = -2$, also $a = -\frac{2}{11}$ und $b = 2-a = \frac{24}{11}$. Damit gilt $f(x) = -\frac{2}{11}x^3+\frac{24}{11}x$. Probe: $f(1) = \frac{22}{11} = 2$ und $f'(2) = 3 \cdot (-\frac{2}{11}) \cdot 4 + \frac{24}{11} = 0$; wegen $f''(2) = 6a \cdot 2 = -\frac{24}{11} \ne 0$ liegt dort tatsaechlich ein Extremum vor.

Klausur-Satz: `Aus dem symmetrischen Ansatz f(x) = ax^3+bx folgen mit f(1) = 2 und f'(2) = 0 die Koeffizienten a = -2/11 und b = 24/11.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Steckbrief des Täters
VERGLEICH辨别实验（双向辨析：对称降次 vs 全项待定）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先读对称词：(i) 对称降次（题含 achsensymmetrisch / punktsymmetrisch，直接用缺项 Ansatz）oder (ii) 全项待定（题无对称词，用完整多项式 $ax^3+bx^2+cx+d$）—— dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Funktion 4. Grades, achsensymmetrisch zur y-Achse, geht durch $(0|1)$ und $(1|0)$ und hat dort ein Extremum? Ansatz?
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Funktion 3. Grades ohne Symmetrieangabe, mit vier Punktbedingungen. Ansatz?

HILFE: A enthaelt achsensymmetrisch → Verfahren (i)，设 $ax^4+bx^2+c$。B 无对称 → Verfahren (ii)，设全项。【选程序：见对称用缺项；不见用全项。】

ANTWORT: A erfordert Verfahren (i): Ansatz $f(x) = ax^4+bx^2+c$ mit nur drei Unbekannten; die Bedingungen $f(0) = 1$, $f(1) = 0$ und $f'(1) = 0$ reichen aus. B erfordert Verfahren (ii): Ansatz $f(x) = ax^3+bx^2+cx+d$ mit vier Unbekannten; erst die vier Punktgleichungen liefern ein loesbares System. Wer in A den vollen Ansatz waehlt, erzeugt ueberfluessige Unbekannte und ein unterbestimmtes System.

Klausur-Satz: `Mit Symmetrie entfaellt jede zweite Potenz, ohne Symmetrie braucht der Ansatz alle Potenzen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Rekonstruktion mit Symmetrie und passenden Bedingungen: Steckbrief des Täters
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet der Ansatz fuer eine punktsymmetrische Funktion 3. Grades? | ANTWORT: $f(x) = ax^3+bx$ (nur ungerade Potenzen, kein absolutes Glied).
FRAGE: Wie werden Extrem- und Wendestellen in Gleichungen uebersetzt? | ANTWORT: Extremstelle $x_E$: $f'(x_E) = 0$; Wendestelle $x_W$: $f''(x_W) = 0$, jeweils plus $f$-Gleichung fuer den $y$-Wert.
FRAGE: Woran erkennt man, ob genug Bedingungen vorliegen? | ANTWORT: Die Zahl der unabhaengigen Gleichungen muss der Zahl der Unbekannten im Ansatz entsprechen.

Klausur-Satz: `Der symmetrische Ansatz und die Bedingungsgleichungen muessen zusammen ein eindeutig loesbares System bilden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"对称函数也可以设全项，反正能解出来"。
   中文纠偏：全项设元会引入本应为零的系数，方程数不够会导致无穷多解。只有用缺项 Ansatz，未知数与条件数才匹配。
   Korrektur-Satz: `Bei Symmetrie muessen die unpassenden Potenzen von vornherein entfallen, sonst ist das System unterbestimmt.`

2. 误解"极值条件只有一个方程 $f'=0$"。
   中文纠偏：$f'(x_E)=0$ 只定横坐标，纵坐标还需 $f(x_E)=y_E$。一个极值点完整提供两个方程，漏写纵坐标方程是高频丢分。
   Korrektur-Satz: `Ein Extrempunkt liefert zwei Gleichungen: f'(x_E) = 0 und f(x_E) = y_E.`

## Schritt 7 — szenario: Klausurtransfer: Rekonstruktion mit Symmetrie und passenden Bedingungen: Steckbrief des Täters
ROLLE: Du bist Tutor und hilfst einer Klausurgruppe bei Steckbriefaufgaben.
SITUATION: Die Gruppe stellt immer den vollen Ansatz auf und scheitert am Gleichungssystem. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) an einem symmetrischen Beispiel, wie man aus der Symmetrie den verkuerzten Ansatz waehlt und jede Bedingung in genau eine Gleichung uebersetzt.
RUBRIC (30 XP): Wahl des symmetrischen Ansatzes mit Begruendung (10 XP) | Korrekte Uebersetzung von Punkt-, Extrem- und Wendebedingungen (10 XP) | Loesungsweg bis zum Funktionsterm mit Probe (6 XP) | Fachsprachliche Korrektheit (4 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Steckbrief des Täters
TAKEAWAY 1盒（核心总结）：

中文：重建问题两步——先看对称选设元（偶留偶、奇留奇），再把每句话译成方程（点写 f，极值写 f'，拐点写 f''，纵坐标别漏）。方程数等于未知数才能解，解完代回验算。记住一句话——对称定设元，条件定方程。
Takeaway-Satz: `Symmetrie bestimmt den Ansatz, jede Bedingung genau eine Gleichung, und das System wird durch Einsetzen geprueft.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Wahl des symmetrischen Ansatzes (Schritt 4) oder die Abgrenzung zum vollen Ansatz (Schritt 5)?
2. 元认知计划：Beim naechsten Mal unterstreiche ich zuerst das Symmetriewort, bevor ich den Ansatz hinschreibe.

`Klausur-Satz: Siehe Schritt-Inhalt.`
