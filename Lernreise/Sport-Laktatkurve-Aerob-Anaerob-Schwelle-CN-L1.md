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

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能画乳酸曲线并标出有氧阈与无氧阈（$2\,\mathrm{mmol/L}$ 与 $4\,\mathrm{mmol/L}$）。
2. 中文：能说出三区间供能特点——纯有氧、混氧、无氧主导。
3. 中文：能选择训练强度（选程序：低强打底 vs 阈值提速）。

Voraussetzung（窄切口）：只做递增负荷曲线解读，不做 Spiroergometrie 细节；已会 Energiebereitstellung 三系统。


Hook中文生活切入:

想象手机电量:刷短视频时省电模式撑很久,一切到高帧率游戏电量断崖下跌,还发烫卡顿,得插电才能续命。人体供能同理:慢跑时有氧系统细水长流,强度一过阈值无氧登场,乳酸堆积、呼吸加深,速度再也维持不住,阈值就是这条电量红线。这条电量红线的位置漂移,正是本节曲线题要找的拐点。

Phaenomen-Satz (DE): Locker laeuft es ewig, schnell brennt es kurz, die Schwelle trennt beides.

中文机制铺垫:有氧阈之前脂肪为主,阈间糖酵解 ramp up,无氧阈之后乳酸陡增;乳酸阈测试用逐级递增速找拐点,耐力训练把阈值右移;答题先认曲线拐点,再对供能系统,训练建议落在阈值跑。

Mechanismus-Satz (DE): Unter der Schwelle aerob stabil, darueber anaerob teuer und kurz.

Klausur-Satz: `Die Laktatkurve trennt aerobe Basis, aerob-anaeroben Uebergang und anaerobe Spitze.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 乳酸 — Laktat：无氧糖酵解产物，浓度以 $\mathrm{mmol/L}$ 计。
- 有氧阈 — aerobe Schwelle：约 $2\,\mathrm{mmol/L}$，纯有氧上限。
- 无氧阈 — anaerobe Schwelle：约 $4\,\mathrm{mmol/L}$，可维持的最高稳态强度。
- 稳态 — Steady State：生成与清除平衡，乳酸不再堆积。
- 逐级测试 — Stufentest：速度逐级提高并测乳酸，绘成曲线。

Klausur-Satz: `An der anaeroben Schwelle halten sich Bildung und Abbau von Laktat gerade die Waage.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象跑步撞墙时刻：还能聊天时很稳，一加速就喘到说不出话。乳酸曲线就是这堵墙的地图。

Phaenomen-Satz (DE): Flach heisst tragbar, steil heisst Stau.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块提配速（关键词：aerob, anaerob, Schwelle, Laktat），看曲线何时由平转陡，找到能聊天与必须闭嘴的分界。

Beobachtungs-Satz (DE): An der Schwelle halten sich Bildung und Abbau die Waage.

Aha-Moment因果链：

中文因果链：低速时乳酸边产边清曲线平，高于阈值后产生压过清除曲线陡；平段练 base、阈值练 tempo、陡段只配间歇；曲线右移即训练有效。

Gesetz-Satz (DE): Flach heisst abbaubar, steil heisst akkumulierend.

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Laktat ^
  |         #### steil (anaerob, Intervall)
  |       ##  Schwelle ca. 12 km/h
  |   ....  flach (aerob, Basis 10 km/h)
  +----------------------------> Tempo
```
Klausur-Satz: `Flach heisst abbaubar, steil heisst akkumulierend.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Der Marathon-Mythos von 490 v. Chr. endet mit dem Tod des Laeufers — ein Bild der anaeroben Katastrophe. Modernes Training verschiebt genau diese Grenze: Die Schwelle wandert nach rechts, der Laeufer bleibt laenger im Steady State.

**中文解读**: 马拉松传说死于无氧崩盘，现代训练就是把阈值右移。记住"右移即进步"，曲线解读就有了训练意义。

**Bezug zum Konzept**: `Training verschiebt die Kurve nach rechts.`

## Schritt 4 — ausprobieren: Interaktive Praxis & Labor

[Werkzeug: weitsprung-sim]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（读图谜题）：某跑者10配速平稳、12临界、14爆表。请划分三区并开出三周训练单。

AUFGABE (auswerten, AFB II): Bei $10\,\mathrm{km/h}$ flach, bei $12$ Schwelle, bei $14$ steil. Zonen Sie und verordnen Sie Training.

HILFE（中德双语步骤）：

1. 中文：第1步分区：有氧底、阈值、间歇，关键词：Zonen。
   Schritt 1 (DE): Basis, Schwelle, Spitze trennen.
2. 中文：第2步配练：长慢跑、控速跑、短间歇，关键词：Rezept。
   Schritt 2 (DE): Lang ruhig, kurz hart, Intervalle.
3. 中文：第3步验效：右移即进步，关键词：Kontrolle。
   Schritt 3 (DE): Rechtsverschiebung heisst trainiert.

MUSTERLOESUNG：中文：10是有氧底配长慢跑，12是阈值配控速跑，14是无氧顶只配短间歇；复测曲线右移即有效，变陡提前即练崩。

MUSTERLOESUNG (DE): $10\,\mathrm{km/h}$ ist Basis, $12$ ist Schwelle, $14$ ist Intervall: Basis lang und ruhig, Schwelle kurz und kontrolliert hart.
Klausur-Satz: `10 km/h ist Basis, 12 km/h ist Schwelle, 14 km/h ist Intervall.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：低强打底 vs 阈值提速）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先看目标：(i) 低强打底（Grundlage/Basis/Fettstoffwechsel：$2$ 下大量、慢而长）oder (ii) 阈值提速（Schwelle/Wettkampf：$4$ 附近少而精、快而控）—— dann loesen.

AUFGABE A：Anfänger will 10 km finishen. Schwerpunkt?
AUFGABE B：Fortgeschrittener will Bestzeit verbessern, Schwelle bei 12 km/h. Schwerpunkt?

HILFE: A 含 finishen/Anfänger → Verfahren (i)。B 含 Bestzeit/Schwelle → Verfahren (ii)。【选程序：求完赛堆低强；求提速练阈值。】

ANTWORT: A erfordert Verfahren (i): Umfang unter der aeroben Schwelle, lange ruhige Laeufe, Laktat flach — Oekonomie und Durchhaltevermoegen vor Tempo. B erfordert Verfahren (ii): Tempodauerlaeufe und Intervalle um die anaerobe Schwelle, Laktat kontrolliert hoch — Schwelle nach rechts schieben. Vertauscht trainiert der Anfaenger sich in Ueberlastung, der Fortgeschrittene in Stagnation.

Klausur-Satz: `Basis laeuft man lang und ruhig, Schwelle kurz und kontrolliert hart.`

## Schritt 6 — check: Selbsttest zu Laktatkurve mit aerober und anaerober Schwelle
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

## Schritt 7 — szenario: Klausurtransfer: Laktatkurve mit aerober und anaerober Schwelle
ROLLE: Du betreust einen Hobbylaeufer mit Stufentest-Protokoll.
SITUATION: Er will Marathon finishen und fragt nach Zonen. Deute in zusammenhaengender Darstellung (ca. 150 Woerter) seine drei Messpunkte und gib zwei Zonenempfehlungen.
RUBRIC (30 XP): Zonenordnung aller Punkte (12 XP) | Zwei Trainingsempfehlungen mit Begruendung (10 XP) | Rechtsverschiebung als Ziel (4 XP) | Verstaendliche Sprache (4 XP).

## Schritt 8 — reflexion: Takeaway & Metakognitive Reflexion

TAKEAWAY 1盒（核心总结）：

中文：曲线看斜率——平是有氧、扬是混氧、陡是无氧。完赛堆低强，提速磨阈值。记住一句话——平处堆量，陡处控量。
Takeaway-Satz: `Flach ausbauen, Schwelle schieben, Spitze dosieren.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Zonenordnung (Schritt 4) oder die Trainingswahl (Schritt 5)?
2. 元认知计划：Beim naechsten Mal zeichne ich zuerst 2 und 4 als Linien ein.
