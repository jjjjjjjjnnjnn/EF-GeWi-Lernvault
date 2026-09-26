---
fach: Sport
thema: "Laktatkurve mit aerober und anaerober Schwelle"
level: 1
ziel: Klausur
xp: 100
operatoren: [erklaeren, deuten, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Sport, CN]
version: Lesson-v3
---

# Lernreise: Laktatkurve mit aerober und anaerober Schwelle (L1, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能画乳酸曲线并标出有氧阈与无氧阈（$2\,\mathrm{mmol/L}$ 与 $4\,\mathrm{mmol/L}$）。
2. 中文：能说出三区间供能特点——纯有氧、混氧、无氧主导。
3. 中文：能选择训练强度（选程序：低强打底 vs 阈值提速）。

Voraussetzung（窄切口）：只做递增负荷曲线解读，不做 Spiroergometrie 细节；已会 Energiebereitstellung 三系统。

Klausur-Satz: `Die Laktatkurve trennt aerobe Basis, aerob-anaeroben Uebergang und anaerobe Spitze.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 乳酸 — Laktat：无氧糖酵解产物，浓度以 $\mathrm{mmol/L}$ 计。
- 有氧阈 — aerobe Schwelle：约 $2\,\mathrm{mmol/L}$，纯有氧上限。
- 无氧阈 — anaerobe Schwelle：约 $4\,\mathrm{mmol/L}$，可维持的最高稳态强度。
- 稳态 — Steady State：生成与清除平衡，乳酸不再堆积。
- 逐级测试 — Stufentest：速度逐级提高并测乳酸，绘成曲线。

Klausur-Satz: `An der anaeroben Schwelle halten sich Bildung und Abbau von Laktat gerade die Waage.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：曲线横轴是速度、纵轴是乳酸：低速段平缓（有氧清得掉），中速段上扬（混氧开始欠账），高速段陡增（无氧主导、很快力竭）。$2$ 与 $4$ 是路标不是墙：$2$ 下随便聊天的慢跑，$2$–$4$ 之间可坚持的 tempo 跑，$4$ 上只能顶几分钟。训练对号：打底用 $2$ 下 GA1，提速用 $4$ 附近 Schwelle，冲刺用 $4$ 上 Intervall。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
  Laktat ^         *  anaerob (>4, Abbruch bald)
         |       *
         |  _4_ _ _ _ _ anaerobe Schwelle
         |    *      aerob-anaerob (Tempo)
         | _2_ _ _ _ _ aerobe Schwelle
         | *           aerob (GA1, reden moeglich)
         +------------------> Geschwindigkeit
```

Klausur-Satz: `Flach heisst abbaubar, steil heisst akkumulierend.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der Marathon-Mythos von 490 v. Chr. endet mit dem Tod des Laeufers — ein Bild der anaeroben Katastrophe. Modernes Training verschiebt genau diese Grenze: Die Schwelle wandert nach rechts, der Laeufer bleibt laenger im Steady State.

**中文解读**: 马拉松传说死于无氧崩盘，现代训练就是把阈值右移。记住"右移即进步"，曲线解读就有了训练意义。

**Bezug zum Konzept**: `Training verschiebt die Kurve nach rechts.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: kurve]

AUFGABE (deuten, AFB II)：Deuten Sie eine Laktatkurve: Bei $10\,\mathrm{km/h}$ liegt Laktat bei $1{,}8$, bei $12\,\mathrm{km/h}$ bei $3{,}2$, bei $14\,\mathrm{km/h}$ bei $6{,}5\,\mathrm{mmol/L}$. Ordnen Sie Zonen zu und empfehlen Sie Training.

HILFE:
1. Schritt 1: Beide Schwellen als Linien einzeichnen.
2. Schritt 2: Jeden Messpunkt einer Zone zuordnen.
3. Schritt 3: Zwei Trainingsempfehlungen ableiten.

MUSTERLÖSUNG: $10\,\mathrm{km/h}$ mit $1{,}8$ liegt unter der aeroben Schwelle — reiner GA1-Bereich, lange Dauerlaeufe moeglich. $12\,\mathrm{km/h}$ mit $3{,}2$ liegt zwischen den Schwellen — aerob-anaerober Uebergang, als Tempodauerlauf an der Schwelle trainierbar. $14\,\mathrm{km/h}$ mit $6{,}5$ liegt deutlich ueber der anaeroben Schwelle — kein Steady State, nur Intervall mit Pausen. Empfehlung: Basis mit $10\,\mathrm{km/h}$ ausbauen, Schwelle mit Intervallen um $12\,\mathrm{km/h}$ nach rechts verschieben.

Klausur-Satz: `10 km/h ist Basis, 12 km/h ist Schwelle, 14 km/h ist Intervall.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：低强打底 vs 阈值提速）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看目标：(i) 低强打底（Grundlage/Basis/Fettstoffwechsel：$2$ 下大量、慢而长）oder (ii) 阈值提速（Schwelle/Wettkampf：$4$ 附近少而精、快而控）—— dann loesen.

AUFGABE A：Anfänger will 10 km finishen. Schwerpunkt?
AUFGABE B：Fortgeschrittener will Bestzeit verbessern, Schwelle bei 12 km/h. Schwerpunkt?

HILFE: A 含 finishen/Anfänger → Verfahren (i)。B 含 Bestzeit/Schwelle → Verfahren (ii)。【选程序：求完赛堆低强；求提速练阈值。】

ANTWORT: A erfordert Verfahren (i): Umfang unter der aeroben Schwelle, lange ruhige Laeufe, Laktat flach — Oekonomie und Durchhaltevermoegen vor Tempo. B erfordert Verfahren (ii): Tempodauerlaeufe und Intervalle um die anaerobe Schwelle, Laktat kontrolliert hoch — Schwelle nach rechts schieben. Vertauscht trainiert der Anfaenger sich in Ueberlastung, der Fortgeschrittene in Stagnation.

Klausur-Satz: `Basis laeuft man lang und ruhig, Schwelle kurz und kontrolliert hart.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wo liegen aerobe und anaerobe Schwelle? | ANTWORT: Bei ca. $2$ bzw. $4\,\mathrm{mmol/L}$ Laktat.
FRAGE: Was heisst Steady State? | ANTWORT: Bildung und Abbau von Laktat halten sich die Waage, die Konzentration bleibt stabil.
FRAGE: Was bedeutet Rechtsverschiebung? | ANTWORT: Hoehere Geschwindigkeit bei gleicher Laktatstufe — Trainingsfortschritt.

Klausur-Satz: `Rechts heisst trainiert, steil heisst ueberfordert.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"乳酸是毒素越少越好"。
   中文纠偏：乳酸是中间产物可再利用；阈值看生成清除平衡，不是毒性剂量。
   Korrektur-Satz: `Laktat ist Zwischenprodukt, nicht Gift.`

2. 误解"阈值是固定墙"。
   中文纠偏：$2$/$4$ 是约定路标，可训练右移；同一速度阈值前后意义不同。
   Korrektur-Satz: `Schwellen sind verschiebbare Marken, keine Mauern.`

## Schritt 7 — szenario

ROLLE: Du betreust einen Hobbylaeufer mit Stufentest-Protokoll.
SITUATION: Er will Marathon finishen und fragt nach Zonen. Deute in zusammenhaengender Darstellung (ca. 150 Woerter) seine drei Messpunkte und gib zwei Zonenempfehlungen.
RUBRIC (30 XP): Zonenordnung aller Punkte (12 XP) | Zwei Trainingsempfehlungen mit Begruendung (10 XP) | Rechtsverschiebung als Ziel (4 XP) | Verstaendliche Sprache (4 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：曲线看斜率——平是有氧、扬是混氧、陡是无氧。完赛堆低强，提速磨阈值。记住一句话——平处堆量，陡处控量。
Takeaway-Satz: `Flach ausbauen, Schwelle schieben, Spitze dosieren.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Zonenordnung (Schritt 4) oder die Trainingswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal zeichne ich zuerst 2 und 4 als Linien ein.
