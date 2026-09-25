---
fach: Sport
thema: "Biomechanische Optimierung des Weitsprungs: Absprung und Flug"
level: 1
ziel: Muendlich
xp: 100
operatoren: [beschreiben, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Sport, Leichtathletik]
version: Lesson-v3
---

# Lernreise: Biomechanische Optimierung des Weitsprungs — Absprung und Flug (L1, Ziel Muendlich)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能分相描述跳远（Anlauf / Absprung / Flug / Landung），并指出主相是 Absprung，且能把四相映射回通用三相。
2. 中文：能用力学原理解释起跳——水平速度与垂直速度的合成决定重心抛物线与远度，起跳要"快而平"而非一味求陡。
3. 中文：能分析腾空相的优化边界——重心轨迹在起跳瞬间已定，空中只能优化姿态与落地前伸，并给出典型错误与纠正。

Klausur-Satz: `Beim Weitsprung entscheidet der Absprung als Hauptphase über die Weite, weil dort die Anlaufgeschwindigkeit in eine optimale Flugkurve des Körperschwerpunkts umgesetzt wird.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 起跳 — Absprung：单脚快速蹬伸、把水平速度转化为远度的关键相，即主相。
- 腾空相 — Flugphase：起跳后重心沿抛物线飞行，空中只能优化姿态而无法再加速。
- 身体重心 — Körper-Schwerpunkt (KSP)：跳远中沿抛物线运动的参考点，其轨迹在起跳瞬间即被确定。
- 起跳角 — Absprungwinkel：起跳时的蹬伸方向角，需"快而平"以保住水平速度，而非一味求陡。
- 水平/垂直速度 — Horizontal- / Vertikalgeschwindigkeit：起跳瞬间由水平速度转出垂直速度，二者合成决定远度。

Klausur-Satz: `Der Körperschwerpunkt bewegt sich nach dem Absprung auf einer festgelegten Parabel, sodass die Weite im Absprung weitgehend bestimmt wird.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：跳远的成绩几乎在起跳那一瞬间就定了。助跑带来的是水平速度，起跳要做的不是"往上蹦"，而是"快而平"地把水平速度部分转成垂直速度——两者合成一个速度矢量，决定身体重心（KSP）飞出的抛物线。起跳角一味求陡，反而会吃掉水平速度，让远度下降；因此关键在于"快速触板、充分蹬伸、摆动腿前摆"。起跳之后，KSP 的抛物线已经固定，空中无法再"加速"，腾空步只能做两件事：保持平衡（步式或挺髋技术）和为落地做准备。所以优化顺序永远是：先把 Anlauf 的速度和 Absprung 的转换做好，再用 Flug 与 Landung 把已有的远度"兑现"出来。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
   Weitsprung: Absprung = Hauptphase (v -> Weite)
   Anlauf (horizontal)        Absprung (Vektorzerlegung)
   ------>  v_h                  \
                                  \  v (Resultierende)
                             v_v   \
                                   \ |
                                    \|____  v_h bleibt moeglichst gross
   -> flacher, schneller Absprung schlaegt steiles Springen

   KSP-Bahn NACH dem Absprung = Parabel (fix!)
   Flug:   nur Haltung optimierbar (Schritt-Technik / Hueftstreckung)
   Landung: Beine nach vorn, Knie beugen, kein Rueckfallen

   Kette:  Anlauf-Geschwindigkeit  ->  Absprung-Umsetzung  ->  Flug-Haltung  ->  Landung
           (Vorbereitung)              (Hauptphase)          (Endphase vorn)   (Endphase hinten)
```

> **判据 / 决策点**：错误在离板之前（助跑、起跳角）→ 影响远度上限，走起跳优化；错误在离板之后（姿态、落地）→ 只影响兑现，走腾空优化。
>
> **Redemittel（口述句）**：`Ich gliedere den Sprung in vier Phasen und bestimme den Absprung als Hauptphase.`

Klausur-Satz: `Ein zu steiler Absprungwinkel verringert die horizontale Geschwindigkeit, während ein flacher, schneller Absprung die Flugkurve des Körperschwerpunkts am besten trägt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Bei den Olympischen Spielen 1968 in Mexiko-Stadt sprang Bob Beamon 8,90 m weit — so viel weiter als alle vor ihm, dass die Anzeigetafel dafür zunächst gar nicht ausgelegt war. Der Rekord hielt 23 Jahre, bis Mike Powell 1991 in Tokio 8,95 m erreichte; diese Weite ist bis heute unübertroffen. Mexiko-Stadt liegt hoch, und die dünnere Luft verringerte den Luftwiderstand — ein Umgebungsfaktor, der vor allem den Anlauf begünstigte, nicht die Flugbewegung.

**中文解读**: Beamon 的纪录常被误读成"空中动作神了"，其实关键在助跑速度与起跳，外加高原空气阻力小。腾空步（步式/挺髋）再漂亮，也改变不了离板瞬间已定的重心抛物线。记住：远度在起跳那一刻就写好了，空中只是把姿态摆好、把腿前伸。

**Bezug zum Konzept**: `Beamons Weite entstand aus Anlaufgeschwindigkeit und Absprung; die Flugphase konnte sie nur nutzen, nicht erzeugen.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: tangent]

AUFGABE (analysieren, AFB II)：Ein Sportler bremst kurz vor dem Absprungbrett ab und springt danach sehr steil nach oben. Analysieren Sie diesen Fehler biomechanisch und begründen Sie, warum die Weite gering bleibt.

HILFE:
1. Schritt 1: Bestimme die Phase und benenne das Fehlerbild (Geschwindigkeitsverlust durch Stemmen).
2. Schritt 2: Erkläre die Folge für die horizontale Geschwindigkeit v_h.
3. Schritt 3: Erkläre, wie ein zu steiler Absprungwinkel die Umsetzung in Weite verschlechtert.
4. Schritt 4: Leite aus der fixierten KSP-Parabel ab, warum die Weite nicht mehr korrigierbar ist, und gib eine Korrektur an.

MUSTERLÖSUNG: Das Abbremsen vor dem Brett gehört zum Absprung als Hauptphase und stellt das Fehlerbild des Geschwindigkeitsverlusts durch Stemmen dar. Durch das Abbremsen sinkt die horizontale Geschwindigkeit v_h, die die eigentliche Weitenquelle ist. Der anschließende steile Absprung wandelt zusätzlich einen zu großen Anteil der verbliebenen Geschwindigkeit in vertikale Richtung um, sodass v_h weiter abnimmt und der Körperschwerpunkt zwar hoch, aber nicht weit fliegt. Da die Parabel des Körperschwerpunkts im Moment des Absprungs festgelegt wird, kann die verlorene Weite in der Luft nicht mehr ausgeglichen werden. Die Korrektur besteht in einem rhythmischen Anlauf mit Markierungen und einem kurzen Anlauf zum Üben, damit der Sportler schnell und flach über das Brett kommt.

Klausur-Satz: `Geschwindigkeitsverlust durch Stemmen senkt die horizontale Ausgangsgeschwindigkeit und verkürzt damit die im Absprung fixierte Flugparabel.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：起跳优化眼 vs. 腾空优化眼），并做口述解释：

VERGLEICH: Wähle erst das Verfahren — 【选程序】先判断题目问的是 (i) Absprung-Optimierung（起跳：保住水平速度、控制起跳角、快速蹬伸，决定远度上限）还是 (ii) Flug-/Landungs-Optimierung（腾空与落地：保持平衡、前伸落地，只能"兑现"已定的远度）—— dann lösen.

AUFGABE A：Ein Sportler verliert im Anlauf Tempo und springt zu steil. Welches Verfahren ist zu wählen, und wie ist zu argumentieren?

AUFGABE B：Ein Sportler springt gut ab, zieht aber in der Luft die Beine zu früh an und landet mit dem Gesäß zuerst. Welches Verfahren ist zu wählen, und wie ist zu argumentieren?

HILFE: A 涉及水平速度丢失与起跳角，属于远度上限的问题 → 程序 (i)。B 中起跳已好，问题出在空中的姿态与落地前伸，属于"兑现"环节 → 程序 (ii)。【选程序：问题在助跑/起跳（速度与角度）= 起跳程序；问题在腾空姿态/落地 = 腾空程序。口述时先说 `Ich wähle Verfahren (i)/(ii), weil …`】

ANTWORT: A erfordert Verfahren (i): Der Fehler liegt im Absprung — durch Abbremsen und zu steilen Winkel sinkt v_h, die Flugparabel wird kürzer; die Korrektur setzt am Anlaufrhythmus und an einem flachen, schnellen Absprung an. B erfordert Verfahren (ii): Da der Absprung gelungen ist, ist die KSP-Parabel bereits fixiert; das frühe Anziehen der Beine und die falsche Landung verschlechtern nur die Ausnutzung. Mündlich formuliere ich: `Die Flugbahn des KSP steht nach dem Absprung fest; deshalb optimiere ich im Flug nur die Haltung und strecke die Beine bei der Landung aktiv nach vorn, damit die vorhandene Weite voll genutzt wird.`

> **口述提示**：先定位错误发生的相位，再判断它影响的是"远度上限"还是"远度兑现"，最后给出针对性纠正。
>
> **Redemittel（口述句）**：`Die Flugbahn des KSP steht nach dem Absprung fest; deshalb optimiere ich nur die Haltung und die Landung.`

Klausur-Satz: `Der Absprung bestimmt die Flugparabel, während Flug und Landung nur darüber entscheiden, wie gut die bereits bestimmte Weite genutzt wird.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Warum ist der Absprung die Hauptphase des Weitsprungs? | ANTWORT: Weil dort die Anlaufgeschwindigkeit in die Flugkurve des Körperschwerpunkts umgesetzt wird und damit die Weite weitgehend festgelegt ist.
FRAGE: Warum ist ein zu steiler Absprungwinkel nachteilig? | ANTWORT: Er wandelt zu viel horizontale in vertikale Geschwindigkeit um, wodurch die entscheidende horizontale Geschwindigkeit und damit die Weite sinken.
FRAGE: Was kann der Sportler während der Flugphase noch optimieren? | ANTWORT: Nur die Körperhaltung und die Vorbereitung der Landung, da die Parabel des Körperschwerpunkts bereits fixiert ist.

Klausur-Satz: `Die Weite wird im Absprung bestimmt; in der Luft lässt sich nur die Haltung und die Landung optimieren, nicht die Flugkurve selbst.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"跳远要跳得越高越好，用力往上蹬就能更远"。
   中文纠偏：方向错了。跳远是"向前"的项目，成绩来自水平速度。过分求高的起跳会吃掉水平速度，抛物线变高却变短，远度反而下降。正确做法是"快而平"——快速触板、充分蹬伸、摆动腿前摆，把水平速度尽量保住并部分转为垂直速度。
   Korrektur-Satz: `Ein zu steiler Absprung verschlechtert die Weite, weil er horizontale Geschwindigkeit verbraucht; entscheidend ist ein schneller, flacher Absprung.`

2. 误解"腾空时还能在空中'再使劲'，把距离补回来"。
   中文纠偏：不可能。身体重心的抛物线在离板瞬间就已确定，空中没有任何着力点可以再加速。腾空步只能保持平衡、优化姿态，落地时把双腿主动前伸，才能把已定的远度兑现出来。把希望寄托在"空中补一下"，是典型的力学误判。
   Korrektur-Satz: `Nach dem Absprung ist die Bahn des Körperschwerpunkts festgelegt; in der Luft kann nur noch die Haltung und die Landung optimiert werden.`

## Schritt 7 — szenario

ROLLE: Du bist Prüfling in einer mündlichen Sportprüfung und sollst eine Weitsprung-Analyse vorstellen.
SITUATION: Der Prüfer zeigt dir die Videoaufnahme eines Mitschülers: Der Sportler bremst vor dem Brett ab, springt sehr steil ab und landet mit dem Gesäß zuerst. Erkläre mündlich in zusammenhängenden deutschen Sätzen (ca. 2 Minuten) die biomechanischen Ursachen des geringen Ergebnisses, ordne die Fehler den Phasen zu und schlage je eine konkrete Korrektur vor.
RUBRIC (30 XP): Gliederung des Weitsprungs in Phasen mit Benennung der Hauptphase (5 XP) | Biomechanische Analyse des Absprungs (v_h, Absprungwinkel, fixierte KSP-Parabel) (10 XP) | Analyse der Flug- und Landungsfehler mit Hinweis auf die festgelegte Flugbahn (10 XP) | Kriteriengeleitete Korrekturvorschläge mit methodischem Bezug (5 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：跳远的钱在起跳那一秒就付清了。做题第一步先"选程序"：问题出在助跑与起跳（水平速度、起跳角、触板）→ 走起跳程序，因为那决定远度上限；问题出在空中的姿态与落地 → 走腾空程序，因为那只能"兑现"已定的远度。记住两句话：一是起跳要"快而平"，别用求高换掉水平速度；二是重心抛物线离板即定，空中再使劲也补不回来。
Takeaway-Satz: `Der Absprung legt als Hauptphase die Flugparabel des Körperschwerpunkts fest; ein flacher, schneller Absprung trägt weit, während Flug und Landung nur die bereits bestimmte Weite nutzen.`

> **Merke（一句话锚点）**：助跑拿速度，起跳定远度，腾空保姿态，落地往前伸。
> 重心抛物线离板即定，空中再使劲也补不回来。

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die biomechanische Analyse des Absprungs (Schritt 4) oder die Unterscheidung von Absprung- und Flugoptimierung (Schritt 5)?
2. 元认知计划：Beim nächsten Mal prüfe ich zuerst, ob der Fehler vor oder nach dem Absprung liegt, und wähle danach das Verfahren, bevor ich Korrekturen vorschlage.
