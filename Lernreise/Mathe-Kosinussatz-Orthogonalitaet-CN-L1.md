---
fach: Mathe
thema: "Kosinussatz und Orthogonalitaet"
level: 1
ziel: Klausur
xp: 100
operatoren: [herleiten, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Geometrie]
version: Lesson-v3
---

# Lernreise: Kosinussatz und Orthogonalitaet (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 16/33 | Krise: Autobahn-Rampe Stau 1,9 km Rueckstau | Target: x0 = 3, h = 0.1, Target m = 8.92 | Tool: formula -->

## Schritt 1 — entdecken: Orthogonaler Kurs
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清余弦定理是勾股定理的推广——多出的修正项 $-2bc\cos\alpha$ 正好补偿斜边对面的夹角偏离直角的程度。
2. 中文：能用余弦定理在已知两边夹角时求第三边，或在已知三边时反解任意内角。
3. 中文：能用余弦定理的推论判定三角形是锐角、直角还是钝角，并写出德语标准结论句（AFB II）。

### Hook / Phaenomen

【首席算法官·第16集/共33集】警报：Autobahn-Rampe Stau 1,9 km Rueckstau。首席算法官下令：“x0 = 3, h = 0.1, Target m = 8.92！”全场红灯闪烁。上一集（Mathe-Grenzwert-h-Methode-Ableitung-Stelle-L1.md）的伏笔在此引爆，下一集（Mathe-Kosinussatz-Orthogonalitaet-DE-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 16 von 33): Super-Engineering-Zentrale, Autobahn-Rampe Stau 1,9 km Rueckstau. Der Chief Algorithm Officer ruft: x0 = 3, h = 0.1, Target m = 8.92, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Kosinussatz und Orthogonalitaet ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Grenzwert-h-Methode-Ableitung-Stelle-L1.md) legte die Spur, das naechste Audit (Mathe-Kosinussatz-Orthogonalitaet-DE-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 余弦定理 — Kosinussatz：$a^2 = b^2 + c^2 - 2bc\cos\alpha$，知三求一。【陷阱：Kosinussatz（处理任意三角形）不是 Sinussatz（正弦定理，处理对边对角比例）。】
- 对边对角 — Gegenueberliegende Seite：边 $a$ 恒在角 $\alpha$ 对面，公式中成对出现。【陷阱：Seite（边）与 Winkel（角）必须配对，错位代入全题报废。】
- 夹角 — Eingeschlossener Winkel：两已知边夹住的角，求边时必须用它。【陷阱：eingeschlossen（被夹住）不是 anliegend（邻接，泛指相邻）。】
- 垂直 — Orthogonalitaet / Rechtwinkligkeit：余弦为零的特例，对应勾股定理。【陷阱：rechtwinklig（恰为 $90^\circ$）不是 stumpf（钝角，大于 $90^\circ$）。】
- 反余弦 — Arkuskosinus：由 $\cos\alpha$ 反求角度，记作 $\arccos$。【陷阱：Arkuskosinus（求角度）不是 Kosinus（求比值），计算器模式 Degree/Radian 要先检查。】

Klausur-Satz: `Mit dem Kosinussatz laesst sich aus drei Seiten jeder Winkel ueber den Arkuskosinus bestimmen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Kosinussatz und Orthogonalitaet
ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象斜穿操场比沿直角边走近：斜边有多短，取决于夹角有多大。余弦定理就是给勾股定理装了个角度修正器。

Phaenomen-Satz (DE): Der Winkel korrigiert das Quadrat der Gegenseite.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块改夹角 alpha 从锐角到直角再到钝角（关键词：Kosinussatz, Arkuskosinus, Orthogonalitaet），看a平方与b平方加c平方的大小关系如何翻转。

Beobachtungs-Satz (DE): Bei $90^\circ$ gilt Pythagoras, davor minus, danach plus Korrektur.

Aha-Moment因果链：

中文因果链：夹角把对边拉长或压短，修正项负二倍bc乘cos alpha exactly补上这个差；比较a方与b方加c方即可判锐直钝，已知三边用反余弦开角，已知两边夹角直接开第三边。

Gesetz-Satz (DE): Der Kosinussatz verallgemeinert Pythagoras um den Winkelterm.

$a^2 = b^2 + c^2 - 2bc\cos\alpha$

$\alpha = \arccos\frac{b^2+c^2-a^2}{2bc}$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Dreieck: Seiten b, c schliessen alpha ein -> a
alpha<90: a^2 < b^2+c^2 (spitz)
alpha=90: a^2 = b^2+c^2 (recht)
alpha>90: a^2 > b^2+c^2 (stumpf)
```
Klausur-Satz: `Der Vergleich von $a^2$ mit $b^2 + c^2$ entscheidet, ob das Dreieck spitz-, recht- oder stumpfwinklig ist.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der Kosinussatz war schon dem Mathematiker Euklid inhaltlich bekannt, aber erst die arabischen Astronomen wie al-Battani formulierten ihn mit dem Kosinus — sie brauchten ihn, um aus zwei Sternbeobachtungen Winkel am Himmel zu berechnen. GPS-Satelliten loesen noch heute millionenfach Kosinussatz-Gleichungen.

**中文解读**: 余弦定理是古代"观星术"的遗产：已知两颗星的距离和夹角，求第三边。中国学生背的"知两边夹角求第三边"和天文学家算星距是同一道题，GPS 定位每秒都在解它。

**Bezug zum Konzept**: `Ohne Kosinussatz koennte kein Navigationssystem aus zwei Messungen eine Position bestimmen.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Orthogonaler Kurs
Kontinuitaet: Vorher Mathe-Grenzwert-h-Methode-Ableitung-Stelle-L1.md | Nachher Mathe-Kosinussatz-Orthogonalitaet-DE-L1.md. Krise dieser Episode: Autobahn-Rampe Stau 1,9 km Rueckstau. Target: x0 = 3, h = 0.1, Target m = 8.92.

[Werkzeug: formula]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：已知两边及其夹角，求第三边；再反过来，已知三边求最大角并判形状。

AUFGABE (anwenden, AFB II): Gegeben sind zwei Seiten mit eingeschlossenem Winkel; berechnen Sie die dritte Seite. Entscheiden Sie zusaetzlich aus drei Seiten ueber spitz, recht oder stumpf.

HILFE（中德双语步骤）：

1. 中文：第1步代入余弦定理开第三边，关键词：Einsetzen。
   Schritt 1 (DE): $a^2 = b^2 + c^2 - 2bc\cos\alpha$.
2. 中文：第2步三边反解最大角用反余弦，关键词：Arkuskosinus。
   Schritt 2 (DE): Groessten Winkel per $\arccos$ bestimmen.
3. 中文：第3步比较平方和判形状，关键词：Vergleich。
   Schritt 3 (DE): $a^2$ gegen $b^2 + c^2$ vergleichen.

MUSTERLOESUNG：中文：两边夹角代入公式直接得第三边；三边情形对最大边用反余弦求角，平方比较一眼定性，锐直钝一次分清。

MUSTERLOESUNG (DE): Aus zwei Seiten und Winkel folgt $a$ eindeutig per Kosinussatz. Aus drei Seiten folgt jeder Winkel per $\arccos$; der Vergleich von $a^2$ mit $b^2 + c^2$ trennt spitz, recht und stumpf.
Klausur-Satz: `Aus zwei Seiten und dem eingeschlossenen Winkel folgt die dritte Seite eindeutig ueber den Kosinussatz.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Orthogonaler Kurs
VERGLEICH辨别实验（双向辨析：正弦眼 vs. 余弦眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断已知条件是 (i) Kosinus-Verfahren（两边夹角 SSS 或 SAS，涉及平方和修正）还是 (ii) Sinus-Verfahren（对边对角成对出现 SSA 或 ASA）—— dann rechnen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Gegeben sind $b = 5$, $c = 7$, $\alpha = 60^\circ$. Gesucht ist $a$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Gegeben sind $a = 6$, $\alpha = 30^\circ$, $\beta = 70^\circ$. Gesucht ist $b$.

HILFE: A nennt zwei Seiten plus eingeschlossenen Winkel -> Verfahren (i). B nennt zwei Winkel plus eine Seite, Paare aus Seite und Gegenwinkel -> Verfahren (ii).【选程序：题干出现 zwei Seiten + eingeschlossener Winkel 或 drei Seiten 选余弦；出现 Gegenwinkel-Paar 或 zwei Winkel 选正弦。】

ANTWORT: A erfordert Verfahren (i): $a^2 = b^2 + c^2 - 2bc\cos\alpha$. B erfordert Verfahren (ii): $b / \sin\beta = a / \sin\alpha$, also $b = a\sin\beta / \sin\alpha$.

Klausur-Satz: `Der Kosinussatz nutzt Seitenquadrate, der Sinussatz nutzt Verhaeltnisse von Seite zu Gegenwinkel.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Kosinussatz und Orthogonalitaet: Orthogonaler Kurs
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet der Kosinussatz fuer die Seite $a$? | ANTWORT: $a^2 = b^2 + c^2 - 2bc\cos\alpha$.
FRAGE: Wie erkennt man am Kosinussatz einen rechten Winkel? | ANTWORT: Bei $\alpha = 90^\circ$ ist $\cos\alpha = 0$, die Formel wird zu $a^2 = b^2 + c^2$.
FRAGE: Wie entscheidet man nur mit Seitenlaengen ueber spitz oder stumpf? | ANTWORT: $a^2 < b^2 + c^2$ bedeutet spitz bei $\alpha$, $a^2 > b^2 + c^2$ bedeutet stumpf.

Klausur-Satz: `Der Kosinussatz liefert Seiten und Winkel in beide Richtungen, vorwaerts und rueckwaerts aufgeloest.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"余弦定理和正弦定理随便用哪个都行，反正都是三角公式"。
   中文纠偏：两者分工完全不同。已知条件里有"夹"（两边夹一角）或"全"（三边）必须用余弦；已知条件里有"对"（边角成对）或"两角"必须用正弦。用错公式连列式分都拿不到。
   Korrektur-Satz: `Die Wahl zwischen Sinus- und Kosinussatz haengt allein von den gegebenen Stuecken ab.`

2. 误解"算出 $\cos\alpha$ 为负数一定是算错了"。
   中文纠偏：余弦为负恰恰说明角是钝角，这是正常结果。$90^\circ$ 到 $180^\circ$ 之间余弦恒为负，删掉它等于删掉钝角三角形。
   Korrektur-Satz: `Ein negativer Kosinuswert zeigt einen stumpfen Winkel an und ist kein Rechenfehler.`

## Schritt 7 — szenario: Klausurtransfer: Kosinussatz und Orthogonalitaet: Orthogonaler Kurs
ROLLE: Du bist Tutor in der EF und erklaerst einer Lerngruppe die Dreiecksberechnung.
SITUATION: Ein Dreieck hat die Seiten $3$, $4$, $6$. Die Gruppe streitet, ob es rechtwinklig ist.
AUFGABE: Entscheide in ca. 150 Woertern mit Kosinussatz-Rechnung, welcher Winkeltyp vorliegt, und benenne den groessten Winkel.
RUBRIC (30 XP): Korrekter Seitenvergleich $36$ gegen $25$ (10 XP) | Winkeltyp stumpf begruendet (10 XP) | Groesster Winkel gegenueber laengster Seite plus Fachbegriffe (10 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Orthogonaler Kurs
TAKEAWAY 1盒（核心总结）：

中文：余弦定理 = 勾股定理 + 偏角修正。知 SAS 求边直接代，知 SSS 求角反解 $\arccos$。判角型只看平方和大小：等是直角，小是锐角，大是钝角。选题口诀：见"夹"见"全"用余弦，见"对"见"两角"用正弦。
Takeaway-Satz: `Der Kosinussatz korrigiert Pythagoras um den Winkel: Quadratsummen vergleichen genuegt zur Winkeltypen-Bestimmung.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Umstellen nach dem Winkel (Schritt 4) oder die Verfahrenswahl Sinus gegen Kosinus (Schritt 5)?
2. 元认知计划：Beim naechsten Mal markiere ich zuerst gegebene Seiten und Winkel im Dreieck und pruefe, ob ein Gegenpaar existiert.

`Klausur-Satz: Siehe Schritt-Inhalt.`
