---
fach: Mathe
thema: "Kurvendiskussion und Wendepunkte"
level: 1
ziel: Klausur
xp: 100
operatoren: [analysieren, interpretieren]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Kurvendiskussion und Wendepunkte (L1, Ziel Klausur)

<!-- Campaign: Optimierung | Episode 22/33 | Krise: Logistik-Drohne Akku nur 14 Minuten | Zielgroessen: f mit f''(x) = 6x-12, Ziel Wendepunkt bei 2 | Tool: box-optimizer -->

## Schritt 1 — entdecken: Geheimakte Rekonstruktion
ZIELE (3条，本节20分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清拐点的几何含义——曲线凹凸性改变的地方，流行病曲线上就是新增病例从加速变为减速的转折时刻。
2. 中文：能执行标准检验链 f''(x)=0 加 Vorzeichenwechsel（或 f'''(x) 不为 0），并求出完整 Wendepunkt 坐标与 Wendetangente。
3. 中文：能辨别反例 x^4 在 0 处二阶导为 0 却不是拐点，并写出德语标准结论句（AFB II）。

### Hook / Phaenomen

先左弯后右弯，中间必有一处“翻转”：拐点处的切线会穿过图像，三阶导数负责一锤定音。

Hook / Phaenomen: Erst links-, dann rechtsgekrümmt: Irgendwo dazwischen kippt die **Kruemmung**. Dieser Kippunkt heisst **Wendepunkt**, seine **Wendetangente** durchschneidet den Graphen. Die **dritte Ableitung** besiegelt, ob die Wende wirklich stattfindet.

`Klausur-Satz: Wendepunkte markieren den Kruemmungswechsel: f zwei Strich null plus Vorzeichenwechsel plus f drei Strich ungleich null.`

## Schritt 2 — entdecken: Ausruestungskiste der Algorithmus-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语）：

中文在上，德语在下：

- 凹凸性 — Kruemmung：f''(x) > 0 对应 linksgekruemmt（下凸，如碗），f''(x) < 0 对应 rechtsgekruemmt（上凸，如帽）。 Positive zweite Ableitung bedeutet linksgekrümmt, negative rechtsgekrümmt. Mechanismus: Vorzeichen von f zwei Strich auf Intervallen bestimmen. Klausur-Tipp: Kruemmungsaussage stets mit Intervall verbinden.
- 拐点 — Wendepunkt：Kruemmung 改变方向的点，必须同时给出 x 与 y 坐标 W(x_W | f(x_W))。 Jede Nullstelle von f zwei Strich ist zunaechst nur verdaechtig. Mechanismus: Zweite Ableitung null setzen und Kandidaten sammeln. Klausur-Tipp: Kandidat und Wendepunkt sprachlich trennen
- 二阶导零点 — Nullstelle von f''：拐点的必要条件 f''(x_W) = 0，但单独还不够，还须检验。 Ist sie ungleich null, liegt sicher ein Wendepunkt vor. Mechanismus: Kandidaten in die dritte Ableitung einsetzen. Klausur-Tipp: Ungleich-null als hinreichendes Kriterium nennen.
- 正负号变化 — Vorzeichenwechsel (VZW)：f'' 在候选点左右异号，是充分条件，比只看 f''' 更稳。 Erst der Wechsel adelt den Kandidaten zum echten Wendepunkt. Mechanismus: Vorzeichen von f zwei Strich beidseitig pruefen. Klausur-Tipp: Wechsel explizit als Satz formulieren.
- 拐点切线 — Wendetangente：曲线在 Wendepunkt 处的切线 y = f'(x_W)(x - x_W) + f(x_W)，穿过曲线。 Sie durchschneidet den Graphen im Wendepunkt statt ihn zu beruehren. Mechanismus: Steigung f Strich an der Wendestelle plus Punkt einsetzen. Klausur-Tipp: Tangentengleichung vollstaendig angeben.

`Klausur-Satz: Aus f''(x_W) = 0 mit Vorzeichenwechsel folgt ein Wendepunkt, die Wendetangente beschreibt die Richtung an dieser Stelle.`

## Schritt 3 — entdecken: Wirkungskette hinter Kurvendiskussion und Wendepunkte
ENTDECKEN（1概念 + 1文字图解）：

中文：把流行病累计病例曲线画出来最直观。疫情初期大家都没免疫，新增越来越快，曲线下凸、越走越陡；防控起效后新增开始减少，曲线上凸、逐渐走平。中间凹凸切换的那个点就是 Wendepunkt——新增病例最多的时刻，也就是日增曲线的峰。数学上凹凸由 f'' 的符号管：f''>0 下凸，f''<0 上凸。找拐点就是找 f'' 变号的位置：先解 f''(x)=0 拿候选，再看左右符号是否翻转，最后可顺手写出该点切线。注意符号不变的零点不是拐点，这是 x^4 陷阱的全部秘密。

德语在下：Die kumulierte Fallzahl waechst zuerst immer schneller (linksgekruemmt, f'' > 0) und danach immer langsamer (rechtsgekruemmt, f'' < 0). Der Wechsel liegt am Wendepunkt. Dort gilt f''(x_W) = 0 mit Vorzeichenwechsel, und die Wendetangente y = f'(x_W)(x - x_W) + f(x_W) kreuzt den Graphen.

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
        f ^
          |                         ___---
          |                     ___´        <- rechtsgekruemmt f''<0
          |        W *---------´   W = Wendepunkt
          |       .´ `.
          |     .´     `.          <- Wendetangente kreuzt hier
          |   .´         `.
          |.´               `.
          +----------------------------------> x
       linksgekruemmt   |   rechtsgekruemmt
       f'' > 0          |   f'' < 0
       faellt->steigt    W    steigt->flacht ab
       Test: f''(x)=0 + VZW + f''' oder Kruemmung
```

$$f''(x_W) = 0,\quad f'''(x_W)\ne 0$$
`Klausur-Satz: Wechselt f'' an einer Nullstelle das Vorzeichen, so aendert der Graph dort seine Kruemmung und besitzt einen Wendepunkt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: In einer Epidemie starren alle auf die Tageszahlen, doch Experten schauen auf die kumulierte Kurve und suchen den Wendepunkt. Ab dort waechst die Kurve zwar weiter, aber immer langsamer. Der Moment wurde oft als Hoffnungszeichen gefeiert: der Anstieg bricht, auch wenn die Gesamtzahl noch steigt.

**中文解读**: 疫情里人人盯着“今天新增多少”，专家却盯着累计曲线的拐点。拐点一到，总数还在涨，但增速开始下滑——这是疫情受控的第一个数学信号。拐点不是结束，而是“加速变减速”的分水岭，和导数里的凹凸切换完全是一回事。

**Bezug zum Konzept**: `Der Wendepunkt der kumulierten Kurve markiert das Maximum des Tageszuwachses und den Wechsel der Kruemmung.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Geheimakte Rekonstruktion
Kontinuitaet: Vorher Mathe-Kurvendiskussion-Wendepunkte-DE-L1.md | Nachher Mathe-Rekonstruktion-Symmetrie-Bedingungen-CN-L2.md. Krise dieser Episode: Logistik-Drohne Akku nur 14 Minuten. Zielgroessen: f mit f''(x) = 6x-12, Ziel Wendepunkt bei 2

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: box-optimizer]

AUFGABE (analysieren, AFB II)：Gegeben ist f(x) = x^3 - 6x^2 + 9x + 1. Bestimmen Sie alle Wendepunkte und die Gleichung der Wendetangente.

HILFE:
1. Schritt 1: Zweimal ableiten und Kandidaten suchen: f''(x) = 0 loesen.
2. Schritt 2: Art mit Vorzeichenwechsel oder f'''(x) sichern: Tabelle links und rechts von x_W oder f'''(x_W) ungleich 0.
3. Schritt 3: y-Wert berechnen und Wendetangente mit y = f'(x_W)(x - x_W) + f(x_W) aufstellen.

MUSTERLÖSUNG / MUSTERLOESUNG: Es gilt f'(x) = 3x^2 - 12x + 9, f''(x) = 6x - 12, f'''(x) = 6. Aus f''(x) = 0 folgt 6x - 12 = 0, also x_W = 2. Wegen f'''(2) = 6 ungleich 0, alternativ VZW von minus nach plus, liegt ein Wendepunkt vor. Mit f(2) = 8 - 24 + 18 + 1 = 3 folgt W(2 | 3). Mit f'(2) = 12 - 24 + 9 = -3 lautet die Wendetangente y = -3(x - 2) + 3 = -3x + 9. Der Graph wechselt dort von rechtsgekruemmt zu linksgekruemmt.

`Klausur-Satz: Mit f''(2) = 0, f'''(2) ungleich 0 und W(2 | 3) besitzt f dort einen Wendepunkt mit Tangente y = -3x + 9.`

## Schritt 5 — ausprobieren: Duell der Verfahren Geheimakte Rekonstruktion
VERGLEICH辨别实验（真拐点 vs. 假拐点）：

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Wähle erst / Waehele erst das Verfahren — 【选程序】先判断属于 (i) Wende-Test（f''(x)=0 + VZW 或 f'''，再加 y-Wert 与 Kruemmung-Deutung）还是 (ii) Nur-Stationaer-Test（只看 f'(x)=0，管极值不管凹凸）—— dann lösen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Untersuchen Sie g(x) = x^4 auf Wendepunkte. Pruefen Sie die Stelle x = 0 mit f'' und Vorzeichenwechsel und deuten Sie die Kruemmung.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Eine Infektionskurve wird durch k(t) = -0.1t^3 + 3t^2 modelliert (t in Tagen). Bestimmen Sie den Wendepunkt und deuten Sie ihn als Moment des groessten Tageszuwachses.

HILFE: A nennt Wendepunkte, aber f''(0) = 0 allein reicht nicht -> Verfahren (i) mit VZW-Tabelle, kein Zeichenwechsel bedeutet kein Wendepunkt.【选程序：题干出现 Wendepunkt/Kruemmung 选 Wende-Test，必须做 VZW；只出现 Hoch/Tief/Extrem 选 stationaer-Test，只看 f'。】B nennt Wendepunkt plus Deutung im Kontext -> Verfahren (i) plus Interpretation als Peak des Zuwachses.

ANTWORT: A erfordert Verfahren (i): g'(x) = 4x^3, g''(x) = 12x^2, g''(0) = 0, aber g''(x) >= 0 links und rechts von 0, also kein Vorzeichenwechsel und kein Wendepunkt; der Graph bleibt ueberall linksgekruemmt. B erfordert Verfahren (i): k'(t) = -0.3t^2 + 6t, k''(t) = -0.6t + 6 = 0 liefert t_W = 10, k'''(10) = -0.6 ungleich 0, also Wende bei W(10 | 2000); dort ist der Tageszuwachs k'(10) = 30 maximal, danach faellt er.

`Klausur-Satz: Ohne Vorzeichenwechsel von f'' liegt kein Wendepunkt vor, wie g(x) = x^4 an der Stelle x = 0 zeigt.`

## Schritt 6 — check: Selbsttest zu Kurvendiskussion und Wendepunkte: Geheimakte Rekonstruktion
CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Wie lautet die notwendige und die hinreichende Bedingung fuer einen Wendepunkt? | ANTWORT: Notwendig ist f''(x_W) = 0, hinreichend ist ein Vorzeichenwechsel von f'' oder f'''(x_W) ungleich 0.
- FRAGE: Warum ist x = 0 bei g(x) = x^4 kein Wendepunkt, obwohl g''(0) = 0 gilt? | ANTWORT: Weil g''(x) = 12x^2 links und rechts von 0 positiv bleibt, also kein Vorzeichenwechsel und kein Wechsel der Kruemmung vorliegt.
- FRAGE: Was gehoert zur vollstaendigen Angabe von Wendepunkt und Wendetangente? | ANTWORT: Beide Koordinaten W(x_W | f(x_W)), Nachweis per VZW oder f''', Tangentengleichung und Deutung der Kruemmung.

`Klausur-Satz: Erst f''(x_W) = 0 plus Vorzeichenwechsel plus y-Wert ergeben einen vollstaendigen Wendepunkt-Nachweis.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解“f''=0 的地方就是拐点，和 f'=0 就是极值一样”。
   中文纠偏：f''=0 只是候选。x^4 在 0 处 f''=0，但左右都是下凸，符号没变，所以不是拐点。极值点同样需要 VZW 或二阶检验。考场必须多写一行 VZW 表或 f''' 值，否则按“未证明”扣分。
   Korrektur-Satz: `Ohne Vorzeichenwechsel von f'' oder Nachweis mit f''' darf aus f''(x) = 0 kein Wendepunkt gefolgert werden.`

2. 误解“拐点只要写 x 坐标就行，切线方程是附加题”。
   中文纠偏：Wendepunkt 是点，必须写 W(x|y)。Wendetangente 是 Klausur 常问第二问，直接用点斜式 y = f'(x_W)(x-x_W)+f(x_W)。只写 x_W 会丢坐标分，漏切线会丢整问。
   Korrektur-Satz: `Ein Wendepunkt verlangt beide Koordinaten und bei Bedarf die Gleichung der Wendetangente.`

## Schritt 7 — szenario: Klausurtransfer: Kurvendiskussion und Wendepunkte: Geheimakte Rekonstruktion
ROLLE: Du bist Daten-Assistent im Gesundheitsamt.
SITUATION: Die kumulierten Meldungen folgen k(t) = -0.05t^3 + 2.4t^2 + 100 (t in Tagen seit Ausbruch, k in Faellen). Der Stab fragt, wann der Tageszuwachs am groessten war und ab wann die Massnahmen sichtbar wirken. Erstelle eine Analyse (ca. 150 Woerter) mit Rechnung, Wendetangente und Deutung fuer die Presse.
AUFGABE (interpretieren, AFB III)：Bestimme den Wendepunkt, erklaere seine Bedeutung als Peak des Zuwachses und beurteile Grenzen des Modells.
RUBRIC (30 XP): Ableitungen plus x_W korrekt (5 XP) | Nachweis per VZW oder f''' plus y-Wert (10 XP) | Wendetangente korrekt (10 XP) | Deutung als Peak plus Modellkritik (5 XP).

`Klausur-Satz: Wer Wendekandidat, Vorzeichenwechsel, Punkt und Wendetangente zeigt, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Geheimakte Rekonstruktion
TAKEAWAY 1盒（核心总结）：

中文：拐点 = 凹凸切换点。流程固定四步：解 f''=0、验变号（VZW 或 f'''）、算 y 值、写切线。x^4 提醒你：不变号就不是拐点。应用题里拐点就是增速峰，日增最大处。记住口诀：零、变、点、线——零点、变号、点坐标、切线。
Takeaway-Satz: `Wendepunkt heisst null, Wechsel, Punkt und Linie: f''(x) = 0, Vorzeichenwechsel, W(x | y) und Wendetangente.`

REFLEXION 2问：
1. 过程自省：Welcher Teil fiel schwerer — die Rechnung der Wendetangente (Schritt 4) oder die Abwehr der x-hoch-vier-Falle im Vergleich (Schritt 5)?
2. 元认知计划：Beim naechsten Mal zeichne ich zuerst die Vorzeichentabelle von f'' und formuliere danach erst den Antwortsatz.

`Klausur-Satz: Wende heisst Wechsel: Ohne Vorzeichenwechsel bleibt jede Nullstelle von f zwei Strich Kandidat.`
