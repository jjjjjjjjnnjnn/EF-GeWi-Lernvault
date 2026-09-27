---
fach: Mathe
thema: "Ableitungsregeln fuer Polynome"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, begruenden, nachweisen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Ableitungsregeln fuer Polynome (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 2/33 | Krise: Bruecken-Sensor Drift 0,4 mm pro Stunde | Target: x0 = 4, h = 0.3, Target m = 3.74 | Tool: tangent-slider -->

## Schritt 1 — entdecken: Blitzer gegen Tacho
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说出多项式求导的三件工具——幂法则（指数降一次、原指数变系数）、因子法则（常数照抄）、和法则（逐项求导），并说清各自适用条件。
2. 中文：能把一个整式多项式按项拆开、逐项求导再合并，且不丢常数项、不丢符号。
3. 中文：能区分"求导"与"证明"两种任务：`berechnen` 直接套法则，`nachweisen/zeigen` 必须走差商加极限（AFB II）。

### Hook / Phaenomen

【首席算法官·第2集/共33集】警报：Bruecken-Sensor Drift 0,4 mm pro Stunde。首席算法官下令：“x0 = 4, h = 0.3, Target m = 3.74！”全场红灯闪烁。上一集（Mathe-Ableitungsregeln-Polynome-DE-L1.md）的伏笔在此引爆，下一集（Mathe-CN-Formeln-DE-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 2 von 33): Super-Engineering-Zentrale, Bruecken-Sensor Drift 0,4 mm pro Stunde. Der Chief Algorithm Officer ruft: x0 = 4, h = 0.3, Target m = 3.74, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Ableitungsregeln fuer Polynome ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Ableitungsregeln-Polynome-DE-L1.md) legte die Spur, das naechste Audit (Mathe-CN-Formeln-DE-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 幂法则 — Potenzregel：$(x^n)' = n \cdot x^{n-1}$，指数下移作系数、指数减一。
- 因子法则 — Faktorregel：$(c \cdot f)' = c \cdot f'$，常数因子在求导时照抄不动。
- 和法则 — Summenregel：$(f + g)' = f' + g'$，和的导数等于导数之和。
- 常数函数 — konstante Funktion：$f(x) = c$ 的导数为 $0$，图像是水平线。
- 导函数 — Ableitungsfunktion：把每个点的切线斜率作为函数值，记作 $f'$。

Klausur-Satz: `Fuer eine Potenz gilt die Potenzregel (x^n)' = n \cdot x^{n-1}; Konstanten fallen beim Differenzieren weg.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Ableitungsregeln fuer Polynome
ENTDECKEN（1概念 + 1文字图解）：

中文：多项式求导是一条流水线。先把整式看成若干"单项之和"，再对每个单项做两件事：系数乘上原来的指数，指数减一；若该项不含 x（纯常数），直接归零。三件工具各司其职——幂法则管 $x^n$，因子法则管前面的数字系数，和法则管整条式子可以拆开逐项处理。因为和法则保证"和的导数等于导数之和"，我们才能放心地一项一项做，最后把结果相加。注意：因子法则只对"常数乘以函数"成立，对"两个含 x 的函数相乘"不成立（那是 Q1 的乘积法则）。

$$f(x) = 4x^3 - 5x^2 + 7x - 2 \implies f'(x) = 12x^2 - 10x + 7$$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   f(x)  =   4x^3    -    5x^2    +    7x    -    2
               |            |           |         |
               v            v           v         v
   Regel:    4*3x^2       -5*2x         7         0
               |            |           |         |
               v            v           v         v
   f'(x) =   12x^2   -    10x     +     7    +    0
               \__________________________________/
                Summenregel: gliedweise addieren
   指数降一, 系数乘指数; 纯常数 -> 0
```

Klausur-Satz: `Da die Summenregel das gliedweise Differenzieren erlaubt, wird jeder Summand einzeln mit der Potenzregel abgeleitet.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Die Differentialrechnung wurde im 17. Jahrhundert zweimal unabhaengig erfunden: von Isaac Newton in England und von Gottfried Wilhelm Leibniz in Deutschland. Newton dachte dabei an Bewegung und Aenderungsraten, Leibniz an unendlich kleine Differenzen; seine Schreibweise dy/dx benutzen wir noch heute. Erst mit diesen Ideen wurde es moeglich, Polynome gliedweise und nach festen Regeln abzuleiten.

**中文解读**: 微积分由牛顿与莱布尼茨各自独立建立，说明"求变化率"是数学发展的必然一步。本课把多项式拆成单项、按幂法则与和法则逐项求导的"流水线"，正是这套法则体系化之后的产物——记住它，你就握住了当年两大发明家的核心工具。

**Bezug zum Konzept**: `Die Potenz-, Faktor- und Summenregel sind die systematische Form der fruehesten Ableitungsregeln.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Blitzer gegen Tacho
Kontinuitaet: Vorher Mathe-Ableitungsregeln-Polynome-DE-L1.md | Nachher Mathe-CN-Formeln-DE-L1.md. Krise dieser Episode: Bruecken-Sensor Drift 0,4 mm pro Stunde. Target: x0 = 4, h = 0.3, Target m = 3.74.

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: tangent-slider]

AUFGABE (berechnen, AFB II)：Gegeben ist die ganzrationale Funktion $f(x) = 4x^3 - 5x^2 + 7x - 2$. Bestimmen Sie $f'(x)$ sowie die lokale Aenderungsrate an der Stelle $x_0 = 2$.
(Tipp: Du kannst deine Rechnung direkt eintippen, das Werkzeug nutzen oder deinen handschriftlichen Rechenweg per Foto/Clipboard hochladen und automatisch transkribieren lassen.)

HILFE:
1. Schritt 1: Jeden Summanden einzeln nach der Potenzregel ableiten (Exponent nach vorne, Exponent minus eins).
2. Schritt 2: Den konstanten Summanden $-2$ zu $0$ setzen und alle Ergebnisse mit der Summenregel addieren.
3. Schritt 3: $x_0 = 2$ in $f'(x)$ einsetzen und den Wert als lokale Aenderungsrate deuten.

MUSTERLÖSUNG: Gliedweise ergibt sich: $4x^3 \to 4 \cdot 3x^2 = 12x^2$; $-5x^2 \to -5 \cdot 2x = -10x$; $7x \to 7$; $-2 \to 0$. Mit der Summenregel folgt $f'(x) = 12x^2 - 10x + 7$. An der Stelle $x_0 = 2$ gilt $f'(2) = 12 \cdot 2^2 - 10 \cdot 2 + 7 = 48 - 20 + 7 = 35$. Die lokale Aenderungsrate betraegt also $35$; der Graph steigt an dieser Stelle steil an.

Klausur-Satz: `Mit Potenz-, Faktor- und Summenregel ergibt sich f'(x) = 12x^2 - 10x + 7 und damit f'(2) = 35.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Blitzer gegen Tacho
VERGLEICH辨别实验（双向辨析：套法则眼 vs. 差商眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看 Operator 是 (i) berechnen/bestimmen（直接用 Potenz-, Faktor- und Summenregel 求导函数）还是 (ii) nachweisen/zeigen（必须用 Differenzenquotient 加 Grenzuebergang 证明）—— dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Bestimmen Sie die Ableitung von $f(x) = 3x^4 - 2x^2 + 9$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Zeigen Sie mit Hilfe des Differenzenquotienten, dass die Funktion $g(x) = x^2$ an der Stelle $x_0$ die Ableitung $g'(x_0) = 2x_0$ besitzt.

HILFE: A verlangt nur das Ergebnis -> Verfahren (i), gliedweise Potenzregel. B enthaelt das Verb zeigen -> Verfahren (ii), vollstaendiger Grenzprozess.【选程序：动词是 berechnen/bestimmen 走套法则；动词是 zeigen/nachweisen 走差商加极限，只写结果不给分。】

ANTWORT: A erfordert Verfahren (i): $f'(x) = 12x^3 - 4x$. B erfordert Verfahren (ii): Der Differenzenquotient lautet $\frac{(x_0 + h)^2 - x_0^2}{h} = \frac{2x_0 h + h^2}{h} = 2x_0 + h$; der Grenzuebergang $h \to 0$ liefert $g'(x_0) = 2x_0$.

Klausur-Satz: `Bei berechnen genuegt das Ergebnis der Regelanwendung, bei nachweisen muss der Grenzprozess vollstaendig dargestellt werden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Ableitungsregeln fuer Polynome: Blitzer gegen Tacho
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die Potenzregel fuer $f(x) = x^n$? | ANTWORT: $f'(x) = n \cdot x^{n-1}$, der Exponent wird zum Faktor und um eins verringert.
FRAGE: Was ergibt die Ableitung eines konstanten Summanden wie $-2$? | ANTWORT: Null ($f'(x) = 0$), da der Graph einer konstanten Funktion eine waagerechte Gerade ist.
FRAGE: Warum darf die Faktorregel nicht auf ein Produkt zweier Funktionen angewandt werden? | ANTWORT: Die Faktorregel gilt nur fuer einen konstanten Faktor; fuer Produkte zweier Funktionen braucht man die Produktregel.

Klausur-Satz: `Potenz-, Faktor- und Summenregel gelten fuer ganzrationale Funktionen und werden gliedweise angewandt.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"求导时把指数直接抄下来当系数，指数保持不变"。
   中文纠偏：顺序和指数都要处理。幂法则要求指数下移作系数、指数本身减一：`$(x^3)' = 3x^2$`，而不是 `3x^3`。写成后者的图像斜率会被严重高估。
   Korrektur-Satz: `Die Potenzregel lautet (x^n)' = n * x^(n-1); der Exponent wird zum Faktor und zugleich um eins verringert.`

2. 误解"只要出现两个因式相乘，就可以用因子法则把常数提出来"。
   中文纠偏：因子法则只对"常数乘以函数"成立。像 `x * (x + 1)` 这种两个含 x 的因式相乘，必须先展开或使用乘积法则；把 x 当成常数提出去是典型的知识错。
   Korrektur-Satz: `Die Faktorregel gilt nur fuer einen konstanten Faktor, nicht fuer das Produkt zweier x-abhaengiger Faktoren.`

## Schritt 7 — szenario: Klausurtransfer: Ableitungsregeln fuer Polynome: Blitzer gegen Tacho
ROLLE: Du bist Schueler-Tutor im Mathe-Foerderkurs der EF.
SITUATION: Ein Mitschueler hat $f(x) = 4x^3 - 5x^2 + 7x - 2$ abgeleitet und als Ergebnis $12x^3 - 10x^2 + 7x$ herausbekommen. Erklaere ihm in einer zusammenhaengenden Darstellung (ca. 150 Woerter), welcher Regelverstoss vorliegt, fuehre die korrekte Ableitung vor und erlaeutere den Unterschied zwischen berechnen und nachweisen.
(Tipp: Du kannst deine Erklärung handschriftlich auf Papier verfassen und als Foto oder Screenshot hochladen, um sie mit den Bewertungskriterien pruefen zu lassen.)
RUBRIC (30 XP): Benennung des Fehlers — Exponent nicht verringert, Konstante nicht beachtet (5 XP) | Korrekte gliedweise Ableitung $f'(x) = 12x^2 - 10x + 7$ (10 XP) | Begruendung mit Potenz-, Faktor- und Summenregel (10 XP) | Abgrenzung berechnen gegen nachweisen (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Blitzer gegen Tacho
TAKEAWAY 1盒（核心总结）：

中文：多项式求导就是一条流水线——把式子拆成单项，每项做"系数乘指数、指数减一"，纯常数归零，最后用和法则相加。三件工具对应三种结构：幂法则管 `x^n`，因子法则管常数系数，和法则管整式拆分。做题先读动词：`berechnen` 直接套法则，`zeigen/nachweisen` 必须走差商加极限。记住一句话——幂降一、常归零、逐项加。
Takeaway-Satz: `Ganzrationale Funktionen werden gliedweise mit Potenz-, Faktor- und Summenregel differenziert; Konstanten fallen weg.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das gliedweise Differenzieren (Schritt 4) oder die Unterscheidung von berechnen und nachweisen (Schritt 5)?
2. 元认知计划：Beim naechsten Mal lese ich zuerst das Verb der Aufgabe und entscheide dann, ob ich nur die Regel anwende oder den Grenzprozess aufschreiben muss.

`Klausur-Satz: Siehe Schritt-Inhalt.`
