---
fach: Mathe
thema: "CN-Formeln dreisprachig diktieren und rechnen"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, erlaeutern]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, CN]
version: Lesson-v3
---

# Lernreise: CN-Formeln dreisprachig diktieren und rechnen (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 4/33 | Krise: Hafen-Kran Last pendelt 3,2 Grad | Target: x0 = 6, h = 0.5, Target m = 4.48 | Tool: formula -->

## Schritt 1 — entdecken: Bruecke der Symbole
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能用中德英三语说出五组 EF 核心公式——求导三法则、韦达定理、均值不等式、向量三式、古典概型，并各补一句适用条件。
2. 中文：能把中文口诀（如"幂降一次系数提前""和积反推验根"）翻译成德语 Klausur 论证句。
3. 中文：能用这些公式免工具手算求导、验根、向量长度与简单概率小题（AFB I/II）。

### Hook / Phaenomen

【首席算法官·第4集/共33集】警报：Hafen-Kran Last pendelt 3,2 Grad。首席算法官下令：“x0 = 6, h = 0.5, Target m = 4.48！”全场红灯闪烁。上一集（Mathe-CN-Formeln-DE-L1.md）的伏笔在此引爆，下一集（Mathe-CN-Training-DE-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 4 von 33): Super-Engineering-Zentrale, Hafen-Kran Last pendelt 3,2 Grad. Der Chief Algorithm Officer ruft: x0 = 6, h = 0.5, Target m = 4.48, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet CN-Formeln dreisprachig diktieren und rechnen ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-CN-Formeln-DE-L1.md) legte die Spur, das naechste Audit (Mathe-CN-Training-DE-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 幂法则 — Potenzregel：`(x^n)' = n * x^(n-1)`，指数下移作系数、指数减一。
- 韦达定理 — Satz von Vieta：对 `ax^2 + bx + c = 0`，`x1 + x2 = -b/a`，`x1 * x2 = c/a`。
- 均值不等式 — AM-GM-Ungleichung：`a, b > 0` 时 `(a + b) / 2 >= Wurzel(a*b)`，等号当且仅当 `a = b`。
- 向量模长 — Betrag eines Vektors：`|a| = Wurzel(a1^2 + a2^2 + a3^2)`。
- 古典概型 — Laplace-Experiment：`P(E) = 有利结果数 / 全部等可能结果数`。

Klausur-Satz: `Jede Formel gilt nur unter ihrer Bedingung; die Potenzregel etwa nur fuer Potenzen, AM-GM nur fuer positive Zahlen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter CN-Formeln dreisprachig diktieren und rechnen
ENTDECKEN（1概念 + 1文字图解）：

中文：中国理科背公式强调"口诀加变形"，德国 Klausur 强调"条件加论证句"。把两者叠起来，才是三语公式训练的真正目标。做法很简单：每条公式准备三样东西——一个中文口诀（帮你定位用哪条）、一个德语 Bedingungssatz（说清适用条件）、一个德语 Anwendungssatz（写出怎么用）。例如"幂降一次系数提前"对应 `Ich bilde die Ableitung mit der Potenzregel (x^n)' = n * x^(n-1).`；"和积反推验根"对应 `Nach dem Satz von Vieta pruefe ich die Nullstellen mit Summe und Produkt.`。中文口诀负责速度和方向，德语条件句负责分数。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   CN 口诀           Bedingung (DE)             Anwendungssatz (DE)
   -----------       --------------------       --------------------------
   幂降系数提前       nur fuer Potenzen          Potenzregel (x^n)'=n*x^(n-1)
   和积反推验根       nur ax^2+bx+c=0, a!=0      Satz von Vieta
   和定积最大         nur a,b > 0                AM-GM mit Gleichheit a=b
   终点减起点         nur zwei Punkte            Vektor PQ = Q - P, |a| per Wurzel
   有利除可能         nur gleich wahrscheinlich  P(E) = guenstig / moeglich
   -----------       --------------------       --------------------------
   口诀定位           条件把关                   论证句得分
```

Klausur-Satz: `Ich verbinde eine chinesische Merkregel mit dem deutschen Bedingungssatz, um die Formel klausurtauglich anzuwenden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Das Wort Algebra stammt aus dem Arabischen al-dschabr und bedeutet etwa "das Wiederherstellen". Es geht auf ein Lehrbuch des Gelehrten al-Chwarizmi zurueck, der im 9. Jahrhundert in Bagdad wirkte; aus seinem Namen wurde spaeter das Wort Algorithmus. Formeln wie die pq-Formel oder der Satz von Vieta sind seitdem durch viele Sprachen und Kulturen gewandert.

**中文解读**: 公式从来不是某一种语言的专利，而是在语言之间迁徙——"代数"一词本身就带着这段迁徙史。本课把中文口诀、德语条件句和德语应用句叠在一起，正是这种跨语言传统的延续：口诀帮你定位，德语帮你得分。

**Bezug zum Konzept**: `Kernformeln sind kulturuebergreifend; die dreisprachige Arbeit setzt ihre Wanderung durch die Sprachen fort.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Bruecke der Symbole
Kontinuitaet: Vorher Mathe-CN-Formeln-DE-L1.md | Nachher Mathe-CN-Training-DE-L1.md. Krise dieser Episode: Hafen-Kran Last pendelt 3,2 Grad. Target: x0 = 6, h = 0.5, Target m = 4.48.

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen, AFB II)：Dreisprachiges Diktat mit Rechnung. Gegeben ist h(x) = 5x^3 - 2x^2 + x - 8. a) Bestimmen Sie h'(x) und h'(1). b) Pruefen Sie mit dem Satz von Vieta, ob 4 und 5 die Loesungen von x^2 - 9x + 20 = 0 sind.

HILFE:
1. Schritt 1: Bei a) jeden Summanden mit der Potenzregel ableiten und zusammenfassen.
2. Schritt 2: x0 = 1 in h'(x) einsetzen.
3. Schritt 3: Bei b) Summe und Produkt der vermuteten Loesungen mit -b/a und c/a vergleichen.

MUSTERLÖSUNG: a) Gliedweise gilt 5x^3 -> 15x^2, -2x^2 -> -4x, x -> 1, -8 -> 0. Also h'(x) = 15x^2 - 4x + 1 und h'(1) = 15 - 4 + 1 = 12. b) Fuer x^2 - 9x + 20 = 0 gilt a = 1, b = -9, c = 20, also x1 + x2 = -b/a = 9 und x1 * x2 = c/a = 20. Die vermuteten Werte 4 und 5 erfuellen 4 + 5 = 9 und 4 * 5 = 20; beide Bedingungen stimmen, also sind 4 und 5 die Loesungen.

Klausur-Satz: `Mit der Potenzregel folgt h'(x) = 15x^2 - 4x + 1 und h'(1) = 12; nach dem Satz von Vieta bestaetigen Summe 9 und Produkt 20 die Loesungen 4 und 5.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Bruecke der Symbole
VERGLEICH辨别实验（双向辨析：验根眼 vs. 最值眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目问的是 (i) Satz von Vieta（检验给定的根是否正确，用和与积反推）还是 (ii) AM-GM（求正数和式的最小值，凑定积）—— dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Sind 2 und 7 die Loesungen der Gleichung x^2 - 9x + 14 = 0?
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Fuer x > 0 ist A(x) = x + 25/x gegeben. Bestimmen Sie den minimalen Wert von A.

HILFE: A fragt, ob gegebene Zahlen die Gleichung loesen -> Verfahren (i), Vieta. B fragt nach dem Minimum einer Summe positiver Terme -> Verfahren (ii), AM-GM.【选程序：问"根对不对"用韦达；问"和式最小值"用均值。】

ANTWORT: A erfordert Verfahren (i): Hier gilt a = 1, b = -9, c = 14, also Summe 9 und Produkt 14; wegen 2 + 7 = 9 und 2 * 7 = 14 sind 2 und 7 tatsaechlich die Loesungen. B erfordert Verfahren (ii): Da x > 0 und 25/x > 0, folgt mit AM-GM A(x) >= 2 * Wurzel(x * 25/x) = 2 * 5 = 10; Gleichheit gilt fuer x = 25/x, also x = 5, und der minimale Wert ist A(5) = 10.

Klausur-Satz: `Vieta prueft vorhandene Loesungen ueber Summe und Produkt, AM-GM schaetzt eine Summe positiver Terme nach unten ab.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu CN-Formeln dreisprachig diktieren und rechnen: Bruecke der Symbole
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lauten Summe und Produkt der Loesungen von ax^2 + bx + c = 0 nach Vieta? | ANTWORT: x1 + x2 = -b/a und x1 * x2 = c/a (mit a ungleich 0).
FRAGE: Unter welcher Bedingung gilt die AM-GM-Ungleichung, und wann herrscht Gleichheit? | ANTWORT: Nur fuer positive Zahlen a, b > 0; Gleichheit gilt genau dann, wenn a = b ist.
FRAGE: Wie berechnet man die Laenge des Vektors a = (a1 | a2 | a3)? | ANTWORT: |a| = Wurzel(a1^2 + a2^2 + a3^2), also die Wurzel der Summe der Quadrate.

Klausur-Satz: `Nach Vieta gilt fuer ax^2 + bx + c = 0 die Beziehung x1 + x2 = -b/a und x1 * x2 = c/a.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"均值不等式对任何数都成立，直接套就行"。
   中文纠偏：错。AM-GM 只对正数成立。反例：a = -1、b = -4 时 `(a+b)/2 = -2.5` 小于 `Wurzel(a*b) = 2`，公式失效。用之前必须先声明两项为正。
   Korrektur-Satz: `Die AM-GM-Ungleichung gilt nur fuer positive Zahlen; die Positivitaet muss vor der Abschaetzung nachgewiesen werden.`

2. 误解"韦达定理的系数关系可以照搬到三次方程"。
   中文纠偏：错。`x1 + x2 = -b/a` 只适用于二次方程 `ax^2 + bx + c = 0`。三次方程虽有类似的根与系数关系，但形式不同，不能直接套二次的公式。
   Korrektur-Satz: `Der Satz von Vieta in der Form x1 + x2 = -b/a gilt nur fuer quadratische Gleichungen.`

## Schritt 7 — szenario: Klausurtransfer: CN-Formeln dreisprachig diktieren und rechnen: Bruecke der Symbole
ROLLE: Du bist Tutor fuer zweisprachige Mathe-Lernende und haeltst eine kurze Diktat-Runde.
SITUATION: Ein Mitschueler kennt die chinesischen Merksprueche, kann sie aber nicht in deutsche Klausursaetze uebersetzen, und schreibt im Test nur Ergebnisse ohne Bedingung. Erklaere ihm in einer zusammenhaengenden Darstellung (ca. 150 Woerter) an zwei Beispielen (Potenzregel und AM-GM), wie man eine Formel dreisprachig mit Bedingungssatz klausurtugendlich aufschreibt.
RUBRIC (30 XP): Erklaerung des Dreisprachen-Prinzips (CN-Heuristik, DE-Bedingung, DE-Anwendung) (5 XP) | Korrektes Beispiel zur Potenzregel mit Anwendungssatz (10 XP) | Korrektes Beispiel zu AM-GM mit Positivitaetsbedingung und Gleichheitsfall (10 XP) | Kriteriengeleitetes Fazit zum Verhaeltnis von Heuristik und Beweispflicht (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Bruecke der Symbole
TAKEAWAY 1盒（核心总结）：

中文：三语公式训练的核心是"三件套"——中文口诀负责定位和速度，德语条件句负责把关，德语应用句负责得分。幂法则要记得指数减一，韦达只对二次方程，AM-GM 先证正数再写等号条件，向量模长是平方和的根，古典概型是有利除以可能。做题先用口诀选对公式，再用德语条件句把过程写全。记住一句话——口诀管速度，条件管分数。
Takeaway-Satz: `Kernformeln werden dreisprachig mit ihrer Bedingung gelernt; die chinesische Heuristik wird erst durch den deutschen Bedingungssatz klausurtauglich.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das dreisprachige Diktat der Formeln (Schritt 2) oder die Zuordnung der passenden Formel im Vergleich (Schritt 5)?
2. 元认知计划：Beim naechsten Mal notiere ich zu jeder Formel sofort ihre Bedingung, bevor ich sie anwende.

`Klausur-Satz: Siehe Schritt-Inhalt.`
