---
fach: Mathe
thema: "Steckbriefaufgaben: Bedingungen in Gleichungen"
level: 1
ziel: Klausur
xp: 100
operatoren: [bestimmen, aufstellen, loesen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Steckbriefaufgaben — Bedingungen in Gleichungen (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 28/33 | Krise: Datenkabel-Latenz 47 ms Spike | Target: x0 = 5, h = 0.5, Target m = 13.36 | Tool: box-optimizer -->

## Schritt 1 — entdecken: ZKE-Generalprobe I
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能根据几何条件数量，正确设出多项式的一般式——三次设 4 个系数、四次轴对称只设偶次项。
2. 中文：能把"过某点、切线斜率、极值、拐点"等几何语言准确翻译成代数方程（`f(x0)=y0`、`f'(x0)=m`、`f''(x0)=0`）。
3. 中文：能列出线性方程组、用消元法解出全部系数，并回代原条件做验算（AFB II）。

### Hook / Phaenomen

【首席算法官·第28集/共33集】警报：Datenkabel-Latenz 47 ms Spike。首席算法官下令：“x0 = 5, h = 0.5, Target m = 13.36！”全场红灯闪烁。上一集（Mathe-Steckbriefaufgaben-Verfahren-DE-L1.md）的伏笔在此引爆，下一集（Mathe-Vektoren-Raum-Skalarprodukt-CN-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 28 von 33): Super-Engineering-Zentrale, Datenkabel-Latenz 47 ms Spike. Der Chief Algorithm Officer ruft: x0 = 5, h = 0.5, Target m = 13.36, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Steckbriefaufgaben: Bedingungen in Gleichungen ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Steckbriefaufgaben-Verfahren-DE-L1.md) legte die Spur, das naechste Audit (Mathe-Vektoren-Raum-Skalarprodukt-CN-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 一般式 — allgemeiner Ansatz：含全部待定系数的多项式形式，如 `f(x) = ax^3 + bx^2 + cx + d`。
- 待定系数 — Koeffizienten：尚未确定的常数 a, b, c, d，由条件解出。
- 几何条件翻译 — Uebersetzung der Bedingungen：把点、斜率、极值等特征写成方程。
- 线性方程组 — lineares Gleichungssystem (LGS)：把各条方程联立后求解系数。
- 验算 — Probe：把解得的系数代回原条件，检查是否全部满足。

Klausur-Satz: `Die Anzahl der unbekannten Koeffizienten muss der Anzahl der unabhaengigen Bedingungen entsprechen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Steckbriefaufgaben: Bedingungen in Gleichungen
ENTDECKEN（1概念 + 1文字图解）：

中文：Steckbriefaufgabe 是"反向工程"——题目不给你函数式，而是给你图像满足的一串特征，让你把函数还原出来。核心只有一招：翻译。先按待定系数个数选一般式（三次函数 4 个系数，需要 4 个独立条件；若已知关于 y 轴对称，则只设偶次项，系数减到 3 个），再备好导数链 f'、f''，最后把每条几何条件逐字翻译成等式：过点写成 `f(x0) = y0`，切线斜率写成 `f'(x0) = m`，水平切线写成 `f'(x0) = 0`，拐点写成 `f''(x0) = 0`。条件数与未知数个数相等时，解出的方程组通常唯一。解完务必回代验算——这是最容易被忽略、也最容易拿回分的一步。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Geometrische Bedingung           Algebraische Gleichung
   ------------------------         ----------------------
   Graph durch P(0 | 4)             f(0) = 4        ->  d = 4
   Tangentensteigung bei 0 ist -6   f'(0) = -6      ->  c = -6
   Wendepunkt bei x = 1             f''(1) = 0      ->  6a + 2b = 0
   Nullstelle bei x = 1             f(1) = 0        ->  a + b + c + d = 0
   ------------------------         ----------------------
   4 Bedingungen  ->  4 Gleichungen  ->  LGS loesen  ->  f(x)
```

Klausur-Satz: `Jede geometrische Eigenschaft des Graphen entspricht genau einer Bedingung an f, f' oder f''.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Schon in der Song- und Yuan-Zeit loesten chinesische Mathematiker Aufgaben, indem sie eine unbekannte Groesse mit einem eigenen Zeichen ansetzten und daraus Gleichungen aufbauten. Diese Methode nannte man Tianyuanshu, die "Kunst des himmlischen Elements". Im Kern ist sie nichts anderes als unser Ansatz mit unbekannten Koeffizienten.

**中文解读**: 天元术的做法是"设未知、列方程、求解"，与 Steckbriefaufgabe 的"待定系数加方程组"完全一致。把几何条件翻译成代数方程，是几百年来一脉相承的建模思路——先设一般式，再让条件变成方程。

**Bezug zum Konzept**: `Ein Ansatz mit unbekannten Koeffizienten ist eine alte Idee: aus Bedingungen werden Gleichungen gebaut.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag ZKE-Generalprobe I
Kontinuitaet: Vorher Mathe-Steckbriefaufgaben-Verfahren-DE-L1.md | Nachher Mathe-Vektoren-Raum-Skalarprodukt-CN-L1.md. Krise dieser Episode: Datenkabel-Latenz 47 ms Spike. Target: x0 = 5, h = 0.5, Target m = 13.36.

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: box-optimizer]

AUFGABE (bestimmen, AFB II)：Gesucht ist der Funktionsterm einer ganzrationalen Funktion dritten Grades, deren Graph die y-Achse bei y = 4 schneidet, an der Stelle x = 0 die Tangentensteigung -6 besitzt, an der Stelle x = 1 einen Wendepunkt hat und an der Stelle x = 1 eine Nullstelle besitzt.

HILFE:
1. Schritt 1: Ansatz f(x) = ax^3 + bx^2 + cx + d aufstellen sowie f' und f'' berechnen.
2. Schritt 2: Aus jeder der vier Eigenschaften eine Gleichung ableiten.
3. Schritt 3: Das LGS loesen und den Funktionsterm mit einer Probe kontrollieren.

MUSTERLÖSUNG: Ansatz: f(x) = ax^3 + bx^2 + cx + d, f'(x) = 3ax^2 + 2bx + c, f''(x) = 6ax + 2b. Bedingungen: (I) y-Achsenabschnitt f(0) = 4 ergibt d = 4. (II) Tangentensteigung f'(0) = -6 ergibt c = -6. (III) Wendepunkt f''(1) = 0 ergibt 6a + 2b = 0, also b = -3a. (IV) Nullstelle f(1) = 0 ergibt a + b + c + d = 0. Mit c = -6 und d = 4 folgt aus (IV) a + b - 2 = 0, also a + b = 2. Einsetzen von b = -3a liefert a - 3a = 2, also -2a = 2 und damit a = -1 sowie b = 3. Ergebnis: f(x) = -x^3 + 3x^2 - 6x + 4. Probe: f(0) = 4, f'(x) = -3x^2 + 6x - 6 mit f'(0) = -6, f''(x) = -6x + 6 mit f''(1) = 0 und f(1) = -1 + 3 - 6 + 4 = 0. Alle Bedingungen sind erfuellt.

Klausur-Satz: `Aus den vier Bedingungen folgt das LGS mit der eindeutigen Loesung a = -1, b = 3, c = -6, d = 4, also f(x) = -x^3 + 3x^2 - 6x + 4.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren ZKE-Generalprobe I
VERGLEICH辨别实验（双向辨析：正向眼 vs. 反向眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断题目给的是 (i) Kurvendiskussion（已给函数式，问性质：求导数、判极值、求拐点）还是 (ii) Rekonstruktion（给性质，求函数式：列方程解系数）—— dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Gegeben ist f(x) = x^3 - 6x^2 + 9x + 1. Bestimmen Sie die Koordinaten der Extrempunkte.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Der Graph einer ganzrationalen Funktion dritten Grades hat im Ursprung eine waagerechte Tangente und im Punkt P(2 | -4) einen Wendepunkt. Bestimmen Sie den Funktionsterm.

HILFE: A gibt die Funktion vor und fragt nach Eigenschaften -> Verfahren (i). B gibt Eigenschaften vor und fragt nach dem Term -> Verfahren (ii).【选程序：函数式已知走 Kurvendiskussion；函数式未知、给的是点/斜率/极值/拐点走 Rekonstruktion。】

ANTWORT: A erfordert Verfahren (i): f'(x) = 3x^2 - 12x + 9 = 0 ergibt x = 1 und x = 3; mit f''(1) = -6 < 0 folgt HP(1 | 5) und mit f''(3) = 6 > 0 folgt TP(3 | 1). B erfordert Verfahren (ii): Ansatz f(x) = ax^3 + bx^2 + cx + d; f'(0) = 0 ergibt c = 0, f(0) = 0 ergibt d = 0, f''(2) = 0 ergibt 12a + 2b = 0, also b = -6a, und f(2) = -4 ergibt 8a + 4b = -4, also 2a + b = -1. Einsetzen liefert 2a - 6a = -1, also a = 0,25 und b = -1,5; damit f(x) = 0,25x^3 - 1,5x^2.

Klausur-Satz: `Ist der Funktionsterm unbekannt, wird er ueber einen allgemeinen Ansatz und ein LGS aus den gegebenen Bedingungen rekonstruiert.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Steckbriefaufgaben: Bedingungen in Gleichungen: ZKE-Generalprobe I
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welchen Ansatz waehlt man fuer eine ganzrationale Funktion dritten Grades? | ANTWORT: f(x) = ax^3 + bx^2 + cx + d mit vier unbekannten Koeffizienten.
FRAGE: In welche Gleichung uebersetzt man einen Wendepunkt an der Stelle x0? | ANTWORT: In die Bedingung f''(x0) = 0 (bei Nachweis der Art zusaetzlich f''' ungleich 0).
FRAGE: Wie viele unabhaengige Bedingungen braucht man fuer einen Ansatz mit vier Koeffizienten? | ANTWORT: Genau vier, da jede unabhaengige Bedingung eine Gleichung fuer das LGS liefert.

Klausur-Satz: `Ein Wendepunkt liefert die Bedingung f''(x0) = 0, ein Extrempunkt die Bedingungen f(x0) = y0 und f'(x0) = 0.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"条件比系数多就一定更好，随便挑几个用就行"。
   中文纠偏：条件数与系数个数必须匹配，而且条件要相互独立。若拿了互相蕴含的重复条件，方程组会退化、解不唯一；若条件不足，则会有无穷多解。正确做法是先用满所需数量的独立条件，剩余条件用于验算。
   Korrektur-Satz: `Es muessen ebenso viele unabhaengige Bedingungen wie unbekannte Koeffizienten vorliegen, sonst ist das LGS nicht eindeutig loesbar.`

2. 误解"求完系数、写出函数式就算答完了"。
   中文纠偏：缺少回代验算会丢分，也可能让错误一路带到后面小题。必须把解出的系数代回每条原条件逐条检查，并在答题句里明确写出"Probe"。
   Korrektur-Satz: `Nach dem Loesen des LGS muessen die Koeffizienten zur Kontrolle in alle Ausgangsbedingungen eingesetzt werden.`

## Schritt 7 — szenario: Klausurtransfer: Steckbriefaufgaben: Bedingungen in Gleichungen: ZKE-Generalprobe I
ROLLE: Du bist Mitarbeiter in einem Ingenieurbuero und sollst ein Brueckenprofil modellieren.
SITUATION: Das Profil eines Brueckenbogens soll naeherungsweise durch eine ganzrationale Funktion dritten Grades beschrieben werden. Bekannt sind: Der Bogen beginnt im Ursprung mit waagerechter Tangente, erreicht an der Stelle x = 4 seinen hoechsten Punkt und hat dort eine Hoehe von 16 Metern. Bestimme den Funktionsterm und erlaeutere in einer zusammenhaengenden Darstellung (ca. 150 Woerter) dein Vorgehen.
RUBRIC (30 XP): Korrekter Ansatz f(x) = ax^3 + bx^2 + cx + d (5 XP) | Uebersetzung der Bedingungen (f(0) = 0, f'(0) = 0, f(4) = 16, f'(4) = 0) (10 XP) | Loesung des LGS mit Ergebnis (10 XP) | Probe und Antwortsatz im Sachzusammenhang (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: ZKE-Generalprobe I
TAKEAWAY 1盒（核心总结）：

中文：Steckbriefaufgabe 的钥匙只有一把——翻译。先数待定系数、选对一般式（三次 4 个、四次轴对称 3 个），再备好 f' 和 f''，然后把"过点、切线斜率、极值、拐点"逐条翻成方程：`f(x0)=y0`、`f'(x0)=m`、`f'(x0)=0`、`f''(x0)=0`。条件数与系数个数相等才能唯一解出，最后一定回代验算。记住一句话——几何条件变方程，解完方程必验算。
Takeaway-Satz: `Jede geometrische Bedingung wird in eine Gleichung uebersetzt; die Anzahl unabhaengiger Bedingungen bestimmt die Loesbarkeit des LGS.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das Uebersetzen der Bedingungen (Schritt 4) oder das Loesen des LGS (Schritt 5)?
2. 元认知计划：Beim naechsten Mal zaehle ich zuerst die Bedingungen und vergleiche sie mit der Anzahl der Koeffizienten, bevor ich den Ansatz waehle.

`Klausur-Satz: Siehe Schritt-Inhalt.`
