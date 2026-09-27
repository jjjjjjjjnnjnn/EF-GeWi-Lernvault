---
fach: Mathe
thema: "ZKE 2027: Teil A und Teil B im Zeitmodus"
level: 1
ziel: Klausur
xp: 100
operatoren: [berechnen, untersuchen, begruenden]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: ZKE 2027 — Teil A und Teil B im Zeitmodus (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 33/33 | Krise: Abnahme-Audit: ZKE-Kommission fordert Beweisband | Target: x0 = 5, h = 0.2, Target m = 15.21 | Tool: formula -->

## Schritt 1 — entdecken: Uebergabe an die Kommission
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说出 ZKE 的两段结构与时间规则——Teil A 免工具最多 25 分钟（无计算器、无公式表），Teil B 用 WTR 或 CAS 加官方公式表至少 75 分钟，合计 100 分钟。
2. 中文：能免工具手算 Teil A 三件套——零点、导数、向量长度，并能在没有公式表的情况下默写幂法则与 pq 公式。
3. 中文：能在 Teil B 写出"Ansatz + Rechnung + Antwortsatz"的完整论证链，因为评分的正是可追溯的解答过程（AFB II/III）。

### Hook / Phaenomen

【首席算法官·第33集/共33集】警报：Abnahme-Audit: ZKE-Kommission fordert Beweisband。首席算法官下令：“x0 = 5, h = 0.2, Target m = 15.21！”全场红灯闪烁。上一集（Mathe-ZKE-2027-DE-L1.md）的伏笔在此引爆，下一集（Mathe-Ableitungsregeln-Polynome-DE-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 33 von 33): Super-Engineering-Zentrale, Abnahme-Audit: ZKE-Kommission fordert Beweisband. Der Chief Algorithm Officer ruft: x0 = 5, h = 0.2, Target m = 15.21, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet ZKE 2027: Teil A und Teil B im Zeitmodus ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-ZKE-2027-DE-L1.md) legte die Spur, das naechste Audit (Mathe-Ableitungsregeln-Polynome-DE-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 免工具部分 — hilfsmittelfreier Teil (Teil A)：不用计算器、不用公式表，全部靠手算与记忆。
- 工具部分 — Teil B mit Hilfsmitteln：可用 WTR 或 CAS，并配官方公式表，但过程必须完整书写。
- 平均变化率 — mittlere Aenderungsrate：区间上的差商，即割线斜率。
- 瞬时变化率 — lokale Aenderungsrate：某点的导数值，即切线斜率。
- 呈现能力 — Darstellungsleistung：解答过程本身计分，答案对但过程缺失同样扣分。

Klausur-Satz: `In Teil A muessen Potenzregel, pq-Formel und Vektorlaenge ohne Hilfsmittel sicher beherrscht werden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter ZKE 2027: Teil A und Teil B im Zeitmodus
ENTDECKEN（1概念 + 1文字图解）：

中文：ZKE 不是"一次考试"，而是"两场节奏完全不同的考试"。开考时 A、B 两卷都在桌上，但工具先不发；你自己决定何时交 A 卷换工具，最晚 25 分钟必须交，之后至少 75 分钟做 B 卷。Teil A 拼的是手算准确率和记忆——零点、导数、向量长度必须闭卷做对，因为公式表此时不在手边。Teil B 拼的是论证链和情境翻译——题目只考函数与分析，允许用 WTR/CAS 和公式表，但评分针对的是可追溯的解答路径，而不是最终那个数字。因此策略是：A 卷求快求准，B 卷求全求清。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Gesamtzeit 100 min
   +--------------------------+--------------------------------+
   |   Teil A  (max. 25 min)  |    Teil B  (mind. 75 min)      |
   |   hilfsmittelfrei        |    WTR/CAS + Formelsammlung    |
   +--------------------------+--------------------------------+
   |  Analysis + Geometrie    |  nur Analysis                  |
   |  Nullstellen, Ableitung  |  Argumentation + Sachkontext   |
   |  Vektorlaenge            |  Ansatz + Rechnung + Satz      |
   +--------------------------+--------------------------------+
    A: schnell und exakt      B: vollstaendig und klar
    Uebergabe spaetestens bei Minute 25
```

Klausur-Satz: `Teil A prueft Analysis und Geometrie ohne Hilfsmittel, Teil B nur Analysis mit Hilfsmitteln und verlangt vollstaendige Rechenwege.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Seit Taschenrechner und spaeter Computeralgebra-Systeme (CAS) in den Mathematikunterricht kamen, wird diskutiert, wie viel Handrechnung noch noetig ist. Ein CAS kann in Sekunden ableiten, Gleichungen loesen und Grenzwerte berechnen. Deshalb teilt die ZKE die Pruefung in einen hilfsmittelfreien Teil und einen Teil mit Hilfsmitteln.

**中文解读**: 正因为工具能在几秒内完成求导和解方程，考试才特意保留一段免工具部分，检验你是否真的记住了幂法则和 pq 公式；另一半允许用工具，但要求写出完整论证链——工具负责算，人负责解释。

**Bezug zum Konzept**: `Weil CAS die Rechnung uebernehmen, prueft Teil A gerade die Grundformeln im Kopf.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Uebergabe an die Kommission
Kontinuitaet: Vorher Mathe-ZKE-2027-DE-L1.md | Nachher Mathe-Ableitungsregeln-Polynome-DE-L1.md. Krise dieser Episode: Abnahme-Audit: ZKE-Kommission fordert Beweisband. Target: x0 = 5, h = 0.2, Target m = 15.21.

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: formula]

AUFGABE (berechnen, AFB I/II)：Teil-A-Stil, hilfsmittelfrei. a) Berechnen Sie die Nullstellen von f(x) = x^3 - 4x. b) Bestimmen Sie f'(x). c) Gegeben sind P(1 | 2 | 0) und Q(4 | 6 | 0); berechnen Sie den Vektor PQ und seine Laenge.

HILFE:
1. Schritt 1: Bei a) x ausklammern, dann den quadratischen Faktor mit der pq-Formel loesen.
2. Schritt 2: Bei b) jeden Summanden mit der Potenzregel ableiten.
3. Schritt 3: Bei c) Vektor als Q - P bilden und die Laenge als Wurzel der Summe der Quadrate.

MUSTERLÖSUNG: a) x^3 - 4x = x(x^2 - 4) = x(x - 2)(x + 2), also x1 = 0, x2 = 2, x3 = -2. b) Mit der Potenzregel gilt f'(x) = 3x^2 - 4. c) Der Vektor lautet PQ = Q - P = (4 - 1 | 6 - 2 | 0 - 0) = (3 | 4 | 0). Seine Laenge ist |PQ| = Wurzel(3^2 + 4^2 + 0^2) = Wurzel(25) = 5. Alle drei Teilaufgaben sind ohne Hilfsmittel loesbar; die pq-Formel und die Betragsformel muessen auswendig sitzen.

Klausur-Satz: `Die Nullstellen, die Ableitung und die Vektorlaenge lassen sich im hilfsmittelfreien Teil mit Potenzregel, pq-Formel und Betragsformel berechnen.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Uebergabe an die Kommission
VERGLEICH辨别实验（双向辨析：A卷眼 vs. B卷眼）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先判断这道题属于 (i) Teil-A-Aufgabe（hilfsmittelfrei：手算零点/导数/向量，只要结果对）还是 (ii) Teil-B-Aufgabe（mit Hilfsmitteln：需要完整论证链、情境解释、Antwortsatz）—— dann bearbeiten.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Berechnen Sie die Ableitung von f(x) = 5x^3 - 2x^2 + x - 7 an der Stelle x0 = 1.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Untersuchen Sie g(x) = x^3 - 12x + 3 rechnerisch auf lokale Extrempunkte und erlaeutern Sie die Bedeutung der Ergebnisse im Sachzusammenhang.

HILFE: A ist eine kurze Handrechnung ohne Kontext -> Teil A. B verlangt vollstaendigen Loesungsweg mit Argumentation und Deutung -> Teil B.【选程序：只要结果、无情境、可用心算 → Teil A；要求 Ansatz + Rechnung + Antwortsatz、含情境解释 → Teil B。】

ANTWORT: A gehoert zu Teil A: f'(x) = 15x^2 - 4x + 1, also f'(1) = 15 - 4 + 1 = 12. B gehoert zu Teil B: g'(x) = 3x^2 - 12 = 0 ergibt x = 2 und x = -2; mit g''(x) = 6x folgt g''(-2) = -12 < 0 (Hochpunkt) und g''(2) = 12 > 0 (Tiefpunkt). Wegen g(-2) = 19 und g(2) = -13 gilt HP(-2 | 19) und TP(2 | -13); im Sachzusammenhang markieren diese Stellen die Wendepunkte eines zeitlichen Verlaufs mit maximalem bzw. minimalem Bestand.

Klausur-Satz: `Teil-A-Aufgaben verlangen nur das exakte Ergebnis, Teil-B-Aufgaben einen vollstaendigen und gedeuteten Loesungsweg.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu ZKE 2027: Teil A und Teil B im Zeitmodus: Uebergabe an die Kommission
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lange darf man hoechstens fuer Teil A der ZKE verwenden, und welche Hilfsmittel sind dort erlaubt? | ANTWORT: Hoechstens 25 Minuten, ohne Taschenrechner und ohne Formelsammlung.
FRAGE: Welche Hilfsmittel sind in Teil B zugelassen? | ANTWORT: WTR oder CAS sowie die offizielle Formelsammlung NRW.
FRAGE: Warum reicht in Teil B ein korrektes Ergebnis allein nicht aus? | ANTWORT: Weil die Darstellungsleistung bepunktet wird; der Loesungsweg muss nachvollziehbar in Saetzen dargestellt werden.

Klausur-Satz: `In Teil A zaehlt das exakte Ergebnis ohne Hilfsmittel, in Teil B der vollstaendig dargestellte Loesungsweg mit Hilfsmitteln.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"Teil B 有 CAS，过程随便写写、直接给结果就行"。
   中文纠偏：错。B 卷评的是可追溯的解答过程（Darstellungsleistung），不是最后那个数字。每一步结论都要有完整句子支撑；只写答案会大面积失分。
   Korrektur-Satz: `In Teil B wird der nachvollziehbare Loesungsweg bepunktet, nicht nur das Endergebnis.`

2. 误解"公式表反正会发，Teil A 的公式不必背"。
   中文纠偏：错。Teil A 既无计算器也无公式表，幂法则、pq 公式、向量长度公式必须闭卷掌握。依赖公式表会导致 A 卷时间崩盘。
   Korrektur-Satz: `Teil A laeuft ohne Taschenrechner und ohne Formelsammlung, daher muessen die Grundformeln auswendig beherrscht werden.`

## Schritt 7 — szenario: Klausurtransfer: ZKE 2027: Teil A und Teil B im Zeitmodus: Uebergabe an die Kommission
ROLLE: Du bist Pruefungskoordinator und bereitest einen Jahrgang auf die ZKE vor.
SITUATION: Du sollst vor der Pruefung eine kurze Strategie-Empfehlung (ca. 150 Woerter) formulieren, wie die 100 Minuten zwischen Teil A und Teil B aufgeteilt und wann die Hilfsmittel angefordert werden sollten. Begruende deine Empfehlung mit Blick auf Hilfsmittelregeln und Darstellungsleistung.
RUBRIC (30 XP): Korrekte Wiedergabe der Zeit- und Hilfsmittelregeln (5 XP) | Begruendete Zeitaufteilung zwischen Teil A und Teil B (10 XP) | Hinweis auf die Bedeutung der Darstellungsleistung in Teil B (10 XP) | Kriteriengeleitetes Fazit zur Pruefungsstrategie (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Uebergabe an die Kommission
TAKEAWAY 1盒（核心总结）：

中文：ZKE 是两场节奏不同的考试。Teil A 免工具、最多 25 分钟，拼手算准确率和公式记忆——零点、导数、向量长度必须闭卷做对。Teil B 用 WTR/CAS 加公式表、至少 75 分钟，拼完整论证链和情境翻译——Ansatz、Rechnung、Antwortsatz 一个都不能少。开考先规划时间，最晚 25 分钟交 A 卷换工具。记住一句话——A 卷拼准，B 卷拼全。
Takeaway-Satz: `Teil A fehlerfrei und schnell ohne Hilfsmittel rechnen, Teil B vollstaendig und nachvollziehbar mit Hilfsmitteln argumentieren.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — das hilfsmittelfreie Rechnen in Teil A (Schritt 4) oder das Aufschreiben der vollstaendigen Argumentation fuer Teil B (Schritt 5)?
2. 元认知计划：Beim naechsten Mal lege ich vor Beginn eine Zeitmarke fuer die Abgabe von Teil A fest und pruefe am Ende, ob jeder Teil-B-Schritt einen Antwortsatz besitzt.

`Klausur-Satz: Siehe Schritt-Inhalt.`
