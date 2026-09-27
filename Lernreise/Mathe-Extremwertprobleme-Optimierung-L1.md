---
fach: Mathe
thema: "Extremwertprobleme und Optimierung"
level: 1
ziel: Klausur
xp: 100
operatoren: [bestimmen, beurteilen]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Extremwertprobleme und Optimierung (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 10/33 | Krise: Windpark-Rotor Unwucht 11 Hz Resonanz | Target: x0 = 2, h = 0.3, Target m = 6.70 | Tool: box-optimizer -->

## Schritt 1 — entdecken: Sachkontext Frachthafen
ZIELE (3条，本节20分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清极值问题的三件套流程——列目标函数 Zielfunktion，找约束条件 Nebenbedingung 代入化为一元函数，再求导找候选点并做边界检验 Randpruefung。
2. 中文：能对一个纸箱体积问题独立列出 V(x)、确定 Definitionsmenge，并用 f'=0 加二阶导或单调表判断极大还是极小。
3. 中文：能解释为什么 f'=0 只是必要条件，必须结合 Randwerte 与 globallyer Vergleich 才能下结论“最大”，并写出德语标准结论句（AFB II-III）。

### Hook / Phaenomen

【首席算法官·第10集/共33集】警报：Windpark-Rotor Unwucht 11 Hz Resonanz。首席算法官下令：“x0 = 2, h = 0.3, Target m = 6.70！”全场红灯闪烁。上一集（Mathe-Extremwertprobleme-Optimierung-DE-L1.md）的伏笔在此引爆，下一集（Mathe-Ganzrationale-Funktionen-Sachkontext-DE-L1.md）只给交出最优解的人放行。本集你要在沙盘里亲手把工程从亏损/相撞边缘拉回来：先看现象、再点装备、最后算出让审计点头的 Bilanz。记住：先看区间还是时刻、再选割线还是切线/极值还是向量，做完必做 Gegenprobe——这就是工程帝国法则，也是 Klausur 拿分法则。

Hook / Phaenomen (CAO-Log, Episode 10 von 33): Super-Engineering-Zentrale, Windpark-Rotor Unwucht 11 Hz Resonanz. Der Chief Algorithm Officer ruft: x0 = 2, h = 0.3, Target m = 6.70, die Assistentin meldet Rot-Alarm auf allen Screens. Genau hier entscheidet Extremwertprobleme und Optimierung ueber Freigabe oder Sperrung, ueber Kostenexplosion oder Rekordgewinn, ueber Kollision oder gruene Welle. Das Protokoll der Vorwoche (Mathe-Extremwertprobleme-Optimierung-DE-L1.md) legte die Spur, das naechste Audit (Mathe-Ganzrationale-Funktionen-Sachkontext-DE-L1.md) laesst keine Ausrede mehr zu. Die Messwerte streuen, die Kurven zittern, doch die Mathematik bleibt unbestechlich: Wer Sekante und Tangente, Maximum und Wendepunkt, Vektor und Ebene richtig liest, rettet das Projekt. In dieser Episode stellst du im Sandbox-Optimierer die Parameter so ein, dass alle Kennzahlen im gruenen Bereich landen. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Objekte mit exakter Notation, pruefe schliesslich das Ergebnis mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语）：

中文在上，德语在下：

- 目标函数 — Zielfunktion：要最大化或最小化的量，如体积 V(x)、面积 A(x)、利润 G(x)。
- 约束条件 — Nebenbedingung：变量之间的固定关系，如纸板总长固定、周长固定，用它消去多余变量。
- 定义域（含实际意义） — Definitionsmenge / Definitionsbereich：x 在现实中有意义的区间，如 Schnittlaenge x in [0; 6]，端点必须单独检验。
- 边界检验 — Randpruefung：比较 interior 极值点的函数值与区间端点的函数值，只有最大者才是全局最大。
- 极值候选点 — Extremstellen-Kandidat：满足 f'(x) = 0 的点，只是候选，还须用 Vorzeichenwechsel 或 f''(x) 与 Randvergleich beurteilen。

Klausur-Satz: `Die Nebenbedingung reduziert die Zielfunktion auf eine Variable, die Definitionsmenge legt das Intervall fuer die Randpruefung fest.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Extremwertprobleme und Optimierung
ENTDECKEN（1概念 + 1文字图解）：

中文：物流纸箱的故事就是全部思想。仓库有一块 20 cm x 12 cm 的纸板，四角各剪去边长为 x 的小正方形，折起来做成无盖纸箱。体积显然依赖于 x：剪太小，箱子矮扁；剪太大，底面缩没了。于是体积 V(x) = Hoehe mal Grundflaeche = x(20-2x)(12-2x)，x 只能在 0 到 6 之间。把这个 V(x) 画出来是一条三次曲线，先升后降，峰顶就是最优剪法。求峰顶分三步：求导找平点 f'(x)=0，判断凹凸或单调，最后把端点 V(0)=0 与 V(6)=0 拉进来比较。三步缺一不可，第三步正是考试最爱扣分的地方。

德语在下：Die Pappe ist 20 cm mal 12 cm gross. Nach dem Ausschneiden der vier Quadrate mit Seite x gilt V(x) = x(20-2x)(12-2x) auf D = [0; 6]. Der Graph von V steigt zuerst und faellt danach. Der Gipfel liegt bei f'(x) = 0 und wird erst durch Vergleich mit den Randwerten V(0) und V(6) als globales Maximum bestaetigt.

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
        V ^
          |        .-- Gipfel Vmax bei x ~ 2.43
          |      .´  `.
          |    .´      `.
          |  .´          `.
          | .´              `.
          |.                  `.
          +----------------------------------> x
          0                   6
   V(x) = x(20-2x)(12-2x) = 4x^3 - 64x^2 + 240x
   Zielfunktion + Nebenbedingung -> eine Variable
   Kandidat: f'(x)=0 | Entscheid: Randpruefung
```

Klausur-Satz: `Das globale Maximum liegt entweder an einer inneren Stelle mit f'(x) = 0 oder am Rand des Definitionsbereichs.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Ein Logistik-Unternehmen wollte Porto sparen und fragte: welche offene Kiste aus einem Standard-Bogen hat das groesste Volumen? Die Antwort war nicht die groesste oder die kleinste Schnitttiefe, sondern ein Wert dazwischen. Genau so arbeiten Optimierer in Fabriken: sie suchen den Gipfel einer Funktion, nicht das Extrem der Einzelteile.

**中文解读**: 物流公司想用同一块纸板装最多货，答案既不是剪最小也不是剪最大，而是中间某个“峰顶”。极值问题的本质就是找这个峰：目标与约束打架的地方，最优往往藏在中间，靠导数定位、靠边界检验拍板。

**Bezug zum Konzept**: `Die optimale Kiste liegt am Gipfel der Zielfunktion, und erst die Randpruefung macht aus einem Kandidaten das globale Maximum.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Sachkontext Frachthafen
Kontinuitaet: Vorher Mathe-Extremwertprobleme-Optimierung-DE-L1.md | Nachher Mathe-Ganzrationale-Funktionen-Sachkontext-DE-L1.md. Krise dieser Episode: Windpark-Rotor Unwucht 11 Hz Resonanz. Target: x0 = 2, h = 0.3, Target m = 6.70.

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: box-optimizer]

AUFGABE (bestimmen, AFB II)：Aus einer Pappe 20 cm x 12 cm wird durch Ausschneiden von Quadraten der Seite x eine offene Kiste gebaut. Bestimmen Sie die Schnittlaenge x, fuer die das Volumen maximal wird, und geben Sie das maximale Volumen an.

HILFE:
1. Schritt 1: Zielfunktion mit Nebenbedingung aufstellen und Definitionsmenge notieren: V(x) = x(20-2x)(12-2x), D = [0; 6].
2. Schritt 2: Ableiten und Kandidaten suchen: V'(x) = 12x^2 - 128x + 240 = 0 loesen, unbrauchbare Loesung ausserhalb von D streichen.
3. Schritt 3: Art der Kandidaten mit V''(x) klaeren und Randpruefung V(0), V(6) gegen V(x_Kandidat) vergleichen.

MUSTERLÖSUNG / MUSTERLOESUNG: Es gilt V(x) = x(20-2x)(12-2x) = 4x^3 - 64x^2 + 240x auf D = [0; 6]. Dann V'(x) = 12x^2 - 128x + 240 und V''(x) = 24x - 128. Aus V'(x) = 0 folgt 3x^2 - 32x + 60 = 0, also x = (32 +- sqrt(304)) / 6, somit x1 ~ 2.43 und x2 ~ 8.24. Nur x1 liegt in D. Wegen V''(2.43) ~ -69.7 < 0 liegt ein lokales Maximum vor. Randpruefung: V(0) = 0, V(6) = 0, V(2.43) ~ 262.7. Also ist x ~ 2.43 cm optimal und Vmax ~ 262.7 cm^3.

Klausur-Satz: `Mit V'(x1) = 0, V''(x1) < 0 und V(x1) > V(0), V(x1) > V(6) ist x1 die globale Maximalstelle auf D.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Sachkontext Frachthafen
VERGLEICH辨别实验（配方选择 vs. 直接求导）：

VERGLEICH: Wähle erst / Waehele erst das Verfahren — 【选程序】先判断题目属于 (i) Extremwert-Schema（求最大/最小、含 Zielfunktion + Nebenbedingung + Definitionsmenge + Randpruefung）还是 (ii) Nur-Ableitung-Schema（只求 f'=0 的 Stellen，无现实区间、无 Randvergleich）—— dann lösen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Ein Versandhaus formt aus 36 cm Draht den Rand einer offenen Kiste mit quadratischer Grundflaeche. Das Volumen soll maximal werden. Stellen Sie erst Zielfunktion, Nebenbedingung und Definitionsmenge auf, dann loesen Sie.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Gegeben ist f(x) = x^3 - 3x^2 + 2. Bestimmen Sie nur alle Stellen mit f'(x) = 0 und deren Art, ohne Sachkontext und ohne Randpruefung.

HILFE: A enthaelt Woerter wie maximal, Drahtlaenge fest, offene Kiste -> Verfahren (i), Extremwert-Schema mit Randpruefung.【选程序：题干出现 maximal/minimal + feste Laenge/Flaeche/Volumen + Definitionsmenge 选极值流程；只出现 Bestimmen Sie f'(x)=0 无现实区间选纯求导。】B nennt nur eine Formel ohne Kontext -> Verfahren (ii), nur Ableiten plus Vorzeichen-Test.

ANTWORT: A erfordert Verfahren (i): Sei Grundkante a und Hoehe h, dann 4a + 4h = 36, also h = 9 - a, V(a) = a^2(9-a) auf D = [0; 9]; V'(a) = 18a - 3a^2 = 0 liefert a = 6 (a = 0 ist Rand), V''(6) < 0, Randwerte 0, also a = 6 cm, h = 3 cm, Vmax = 108 cm^3. B erfordert Verfahren (ii): f'(x) = 3x^2 - 6x = 3x(x-2) = 0, also x = 0 und x = 2; mit f''(x) = 6x - 6 gilt f''(0) = -6 < 0 (Maximum) und f''(2) = 6 > 0 (Minimum), ohne Randvergleich.

Klausur-Satz: `Ein Sachkontext mit fester Ressource verlangt das volle Extremwert-Schema inklusive Randpruefung, eine reine Formel verlangt nur die Analyse von f'(x) = 0.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Extremwertprobleme und Optimierung: Sachkontext Frachthafen
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet das Drei-Schritt-Schema eines Extremwertproblems? | ANTWORT: Zielfunktion aufstellen, mit Nebenbedingung auf eine Variable reduzieren, Kandidaten mit f'(x) = 0 suchen und mit Randpruefung beurteilen.
FRAGE: Warum reicht f'(x) = 0 allein nicht fuer ein globales Maximum? | ANTWORT: Weil f'(x) = 0 nur lokale Kandidaten liefert; erst der Vergleich mit den Randwerten zeigt, ob ein Kandidat global maximal ist.
FRAGE: Was gehoert zur vollstaendigen Angabe der Loesung im Sachkontext? | ANTWORT: Definitionsmenge mit Einheiten, optimale Stelle mit Einheit, maximaler Wert mit Einheit und ein Antwortsatz im Kontext.

Klausur-Satz: `Erst Zielfunktion plus Nebenbedingung plus Definitionsmenge plus Randpruefung ergeben eine vollstaendige Extremwert-Loesung.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解“f'=0 的点就是最大值点，找到就做完了”。
   中文纠偏：f'=0 只是“平点”，可能是极大、极小，甚至 saddle（如 x^3 在 0 处）。就算确认是局部极大，端点值还可能更大。本题 V(0)=V(6)=0 虽小，但换一道利润题，端点经常反超。必须加二阶导或正负号表，再加边界比较。
   Korrektur-Satz: `Aus f'(x) = 0 folgt nur ein Kandidat; erst f''(x) oder Vorzeichenwechsel plus Randvergleich entscheiden ueber das globale Maximum.`

2. 误解“定义域和单位是形式，不写不扣分；边界 0 处体积为 0 太显然不用算”。
   中文纠偏：恰恰相反，Klausur 按 Definitionsmenge + Einheiten + Randwerte 给分。0 处的 0 正是证明“内部峰是全局峰”的证据。漏写 D 或漏算端点，Rubric 直接扣掉一半。养成习惯：列式先写 D = [...]，结尾必列 Randwerte。
   Korrektur-Satz: `Ohne Definitionsmenge mit Einheiten und ohne explizite Randwerte gilt eine Extremwert-Loesung als unvollstaendig.`

## Schritt 7 — szenario: Klausurtransfer: Extremwertprobleme und Optimierung: Sachkontext Frachthafen
ROLLE: Du bist Praktikant in der Logistik-Abteilung eines Online-Haendlers.
SITUATION: Aus einem Standard-Bogen 24 cm x 18 cm sollen offene Versandkisten mit maximalem Volumen gebaut werden. Deine Chefin verlangt eine nachvollziehbare Rechnung mit Zielfunktion, Definitionsmenge, Ableitung und Randpruefung sowie eine klare Empfehlung fuer die Produktion (ca. 150 Woerter, mit Einheiten cm und cm^3).
AUFGABE (beurteilen, AFB III)：Entscheide, welche Schnittlaenge in die Produktion geht, und beurteile, wie sensibel das Maximum auf Abweichungen von +-0.5 cm reagiert.
RUBRIC (30 XP): Zielfunktion plus Definitionsmenge korrekt (5 XP) | Kandidaten mit Ableitung korrekt berechnet (10 XP) | Randpruefung mit Einheiten vollstaendig (10 XP) | Produktionsempfehlung mit Beurteilung der Sensibilitaet (5 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Sachkontext Frachthafen
TAKEAWAY 1盒（核心总结）：

中文：极值问题永远四件套：目标函数、约束代入、定义域、边界检验。先把现实翻译成 V(x) 加 D，再求导找平点，最后把端点拉进来比大小。记住口诀：列、代、定、比——列目标、代约束、定区间、比边界。f'=0 只是入场券，Randvergleich 才是终审。
Takeaway-Satz: `Liste Zielfunktion, Nebenbedingung, Definitionsmenge und Randvergleich auf; f'(x) = 0 allein beweist kein globales Maximum.`

REFLEXION 2问：
1. 过程自省：Welcher Teil fiel schwerer — das Aufstellen von Zielfunktion und Nebenbedingung (Schritt 4) oder die Entscheidung fuer das volle Schema im Vergleich (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst D mit Einheiten auf und plane die Randpruefung fest ein, bevor ich ableite.

`Klausur-Satz: Siehe Schritt-Inhalt.`
