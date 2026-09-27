---
fach: Physik
thema: "Gravitation und Satellitenbahnen"
level: 1
ziel: Klausur
xp: 100
operatoren: [herleiten, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, Gravitation]
version: Lesson-v3
---

# Lernreise: Gravitation und Satellitenbahnen (L1, Ziel Klausur)

<!-- Campaign: Mars-Mission | Episode 19/28 | Krise: Sol-105 Rover-Kippmoment 34 Nm ueber Limit | Zielgroessen: Satellit mit Bahnradius r, Ziel Geschwindigkeit und Umlaufzeit | Tool: formula -->

## Schritt 1 — entdecken: Impuls beim Ankoppeln
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清万有引力公式 $F = G\,mM/r^2$ 中每个符号的含义，并解释平方反比为什么导致高轨道引力骤降。
2. 中文：能由"引力提供向心力"列出等式并推出第一宇宙速度和轨道速度公式 $v = \sqrt{GM/r}$。
3. 中文：能区分低轨、同步轨道的速度与周期特点，并写出德语标准结论句（AFB II）。

### Hook / Phaenomen

月亮一直在往地球掉，却永远砸不到：引力恰好充当向心力，轨道高度定速度，开普勒定律定周期，静止轨道悬停，近地轨道狂奔。

Hook / Phaenomen: Der Mond faellt staendig zur Erde und trifft sie nie: **Gravitationskraft** liefert exakt die noetige Zentripetalkraft. Dieses **Bahn-Gleichgewicht** sortiert Satelliten nach Hoehe, **Kepler** sortiert sie nach Zeit. **GEO** steht still, erdnahe Bahnen rasen.

`Klausur-Satz: Gravitation haelt Bahnen: G m M durch r Quadrat gleich Zentripetalkraft bestimmt Geschwindigkeit aus Bahnradius.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 万有引力 — Gravitationskraft：$F = G\,mM/r^2$，质量乘积成正比、距离平方成反比。【陷阱：Gravitation（质量间的普适引力）不是 Gewichtskraft（特指地球对物体的重力 $mg$，只在地面附近近似）。】 Sie faellt mit dem Abstandsquadrat und reicht bis zum Mond. Sie faellt mit dem Abstandsquadrat und reicht bis zum Mond. Mechanismus: Massen und Abstand in das Gravitationsgesetz einsetzen. Klausur-Tipp: Abstand ab Erdmittelpunkt messen.
- 向心力 — Zentripetalkraft：维持圆周运动指向圆心的合力，$F_z = mv^2/r$。【陷阱：Zentripetal（向心，真实合力）不是 Zentrifugal（离心，惯性系中的假想力）。】 Gravitation und Zentripetalkraft halten sich exakt die Waage. Gravitation und Zentripetalkraft halten sich exakt die Waage. Mechanismus: Beide Kraefte gleichsetzen und kuerzen. Klausur-Tipp: Gleichsetzung als eigene Zeile zeigen.
- 轨道半径 — Bahnradius：从地心算起，$r = R_{Erde} + h$。【陷阱：Bahnradius（自地心起算）不是 Flughöhe（自地面起算的高度 $h$）。】 Keplers drittes Gesetz steckt in der Bahnkonstanten; die Gravitationskonstante G bestimmt ihren Zahlenwert. Keplers drittes Gesetz steckt in der Bahnkonstanten; die Gravitationskonstante G bestimmt ihren Zahlenwert. Mechanismus: T Quadrat durch r hoch drei als Konstante nutzen. Klausur-Tipp: Kepler als Kontrolle der Rechnung einsetzen.
- 第一宇宙速度 — Erste kosmische Geschwindigkeit：地面附近环绕速度约 $7{,}9\,\mathrm{km/s}$。【陷阱：erste kosmische（环绕不落地）不是 zweite kosmische（$11{,}2\,\mathrm{km/s}$，脱离地球）。】 Sie sinkt mit wachsendem Bahnradius wie eins durch Wurzel r. Sie sinkt mit wachsendem Bahnradius wie eins durch Wurzel r. Mechanismus: Gleichgewicht nach v aufloesen. Klausur-Tipp: Hoehenabhaengigkeit in Worten deuten.
- 地球同步轨道 — Geostationaere Bahn：周期 $24\,\mathrm{h}$、高度约 $35\,786\,\mathrm{km}$ 的赤道轨道。【陷阱：geostationaer（定点于赤道上空）不是 sonnensynchron（极地轨道，过境地方时固定）。】 GEO steht ueber dem Aequator still, erdnahe Bahnen rasen in 90 Minuten herum. GEO steht ueber dem Aequator still, erdnahe Bahnen rasen in 90 Minuten herum. Mechanismus: Umlaufzeit 24 Stunden mit Bahnradius verknuepfen. Klausur-Tipp: GEO-Radius als bekannte Groesse zitieren.

`Klausur-Satz: Der Bahnradius wird immer vom Erdmittelpunkt aus gemessen, nicht von der Erdoberflaeche.`

## Schritt 3 — entdecken: Wirkungskette hinter Gravitation und Satellitenbahnen
ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象高铁过弯：弯越急、车越快，越需要轨道往里拽。卫星不掉下来，也是被引力一路拽着转弯。

Phaenomen-Satz (DE): Wer kreist, wird staendig nach innen gezogen.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块改轨道半径 r（关键词：Gravitationskraft, Zentripetalkraft, Bahnradius, Umlaufzeit），看速度与周期如何一降一升。

Beobachtungs-Satz (DE): Weiter draussen heisst langsamer und laenger unterwegs.

Aha-Moment因果链：

中文因果链：圆轨道上引力全充当向心力，列等式约掉卫星质量即得速度只与中心天体和半径有关；半径越大引力越弱，速度越小、跑一圈越久，半径必须从地心算起。

Gesetz-Satz (DE): Auf der Kreisbahn liefert die Gravitation die noetige Zentripetalkraft.

$G\frac{Mm}{r^2} = m\frac{v^2}{r}$

$v = \sqrt{GM/r}$

$T = 2\pi r / v$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
Erde (M) ----r---- Satellit (m), v tangential
Kraftpfeil: Gravitation -> innen = Zentripetalkraft
r gross -> v klein, T gross | 400km: 7.7km/s, 92min
```

$$F_G = G\frac{mM}{r^2},\quad \frac{T^2}{r^3} = \text{const}$$
`Klausur-Satz: Mit wachsendem Bahnradius sinkt die Bahngeschwindigkeit und waechst die Umlaufzeit.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Newton soll die Gravitation durch einen fallenden Apfel verstanden haben — aber sein genialer Gedanke war: Der Mond faellt genauso wie der Apfel, er verfehlt nur staendig die Erde, weil er seitwaerts schnell genug fliegt. Ein Satellit ist also nichts anderes als ein ewig fallender Koerper.

**中文解读**: 牛顿的苹果和月亮是同一个公式。中国学生常问"卫星为什么悬着不掉"，答案是它一直在掉，只是横向跑得太快，每次都错过地面——"失重"不是没引力，而是和引力一起自由下落。

**Bezug zum Konzept**: `Ein Satellit faellt permanent zur Erde und verfehlt sie durch seine Bahngeschwindigkeit.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Impuls beim Ankoppeln
Kontinuitaet: Vorher Physik-Gleichfoermige-Kreisbewegung-L1.md | Nachher Physik-Gravitation-Satellitenbahnen-DE-L1.md. Krise dieser Episode: Sol-105 Rover-Kippmoment 34 Nm ueber Limit. Zielgroessen: Satellit mit Bahnradius r, Ziel Geschwindigkeit und Umlaufzeit

[Werkzeug: formula]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：400千米高轨道上，求卫星速度量级并解释为何同步轨道更高更慢。

AUFGABE (anwenden, AFB II): Ein Satellit kreist in $400\,\mathrm{km}$ Hoehe. Schaetzen Sie $v$ und $T$ und erklaeren Sie die geostationaere Bahn.

HILFE（中德双语步骤）：

1. 中文：第1步列引力等于向心力并注意半径从地心算，关键词：Ansatz。
   Schritt 1 (DE): $G\,M\,m/r^2 = m\,v^2/r$, $r$ ab Erdmittelpunkt.
2. 中文：第2步代入得约7.7千米每秒、92分钟，关键词：Werte。
   Schritt 2 (DE): $v \approx 7{,}7\,\mathrm{km/s}$, $T \approx 92\,\mathrm{min}$.
3. 中文：第3步推同步轨道：周期须等于一天故半径更大更慢，关键词：Folgerung。
   Schritt 3 (DE): $T = 24\,\mathrm{h}$ verlangt groesseres $r$, kleineres $v$.

MUSTERLOESUNG：中文：400千米轨道速度约7.7千米每秒、一圈约92分钟；同步轨道要求周期一天，半径必须更大，速度反而更小，高而慢是引力定律的必然。

MUSTERLOESUNG (DE): In $400\,\mathrm{km}$ Hoehe betraegt $v$ etwa $7{,}7\,\mathrm{km/s}$ bei $92$ Minuten Umlaufzeit aus $T = 2\pi r / v$. Geostationaer verlangt $T = 24\,\mathrm{h}$, also groesseres $r$ und kleineres $v$.
`Klausur-Satz: In $400\,\mathrm{km}$ Hoehe betraegt die Bahngeschwindigkeit etwa $7{,}7\,\mathrm{km/s}$ bei $92$ Minuten Umlaufzeit.`

## Schritt 5 — ausprobieren: Duell der Verfahren Impuls beim Ankoppeln
VERGLEICH辨别实验（双向辨析：低轨眼 vs. 同步轨眼）：

VERGLEICH: (Weg A quantitativ-rechnerisch gegen Weg B qualitativ-strukturell): Waehle erst das Konzept — 【选概念】先判断题目给的是 (i) LEO-Konzept（高度几百公里、周期约 $90\,\mathrm{min}$、速度约 $8\,\mathrm{km/s}$）还是 (ii) GEO-Konzept（周期 $24\,\mathrm{h}$、高度约 $36\,000\,\mathrm{km}$、定点赤道）—— dann rechnen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Eine Raumstation in $400\,\mathrm{km}$ Hoehe soll versorgt werden. Welche Umlaufzeit erwarten Sie grob?
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Ein TV-Satellit soll fest ueber dem Aequator stehen. Welche Bahnbedingung muss gelten?

HILFE: A nennt LEO-Hoehe -> Konzept (i), kurze Periode. B verlangt feststehenden Eindruck -> Konzept (ii), $T = 24\,\mathrm{h}$.【选概念：题干出现 ISS / $400\,\mathrm{km}$ / Erdbeobachtung 选低轨；出现 feststehend / Aequator / $24\,\mathrm{h}$ / Fernsehen 选同步轨。】

ANTWORT: A erfordert Konzept (i): $T \approx 90\,\mathrm{min}$, $v \approx 7{,}7\,\mathrm{km/s}$. B erfordert Konzept (ii): $T = 24\,\mathrm{h}$, daraus $r \approx 42\,164\,\mathrm{km}$ bzw. $h \approx 35\,786\,\mathrm{km}$ ueber dem Aequator.

`Klausur-Satz: Niedrige Bahnen sind schnell und kurzperiodisch, die geostationaere Bahn ist langsam und tagesperiodisch.`

## Schritt 6 — check: Selbsttest zu Gravitation und Satellitenbahnen: Impuls beim Ankoppeln
CHECK检索默写（自测 3 题，与答案配对）：

- FRAGE: Wie lautet der Kraftansatz fuer eine Kreisbahn? | ANTWORT: $G\,mM/r^2 = m v^2/r$, Gravitation liefert Zentripetalkraft.
- FRAGE: Wie haengt die Bahngeschwindigkeit vom Radius ab? | ANTWORT: $v = \sqrt{GM/r}$, groesseres $r$ bedeutet kleineres $v$.
- FRAGE: Von wo aus wird der Bahnradius gemessen? | ANTWORT: Vom Erdmittelpunkt, also $r = R_{Erde} + h$.

`Klausur-Satz: Die Umlaufzeit folgt aus Umfang durch Geschwindigkeit: $T = 2\pi r / v$.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"卫星上失重是因为那里没有引力"。
   中文纠偏：在 400 公里高度引力仍有地面的约九成。失重是因为卫星和宇航员一起绕地自由下落，引力全用来转弯，没有多余来压地板。
   Korrektur-Satz: `Schwerelosigkeit auf der Umlaufbahn bedeutet freien Fall, nicht Abwesenheit von Gravitation.`

2. 误解"轨道半径就是题目给的高度，直接代入公式"。
   中文纠偏：公式里的 $r$ 是到地心的距离，必须加地球半径 $6370\,\mathrm{km}$。直接用高度会算出超大速度，是计算题最常见的整题丢分。
   Korrektur-Satz: `In alle Bahngleichungen ist $r = R_{Erde} + h$ einzusetzen, nie die Hoehe allein.`

## Schritt 7 — szenario: Klausurtransfer: Gravitation und Satellitenbahnen: Impuls beim Ankoppeln
ROLLE: Du bist Tutor im Physikkurs und erklaerst Satellitenbahnen.
SITUATION: Eine Mitschuelerin behauptet, ein TV-Satellit koenne in $400\,\mathrm{km}$ Hoehe fest ueber Berlin stehen.
AUFGABE: Widerlegen Sie das in ca. 150 Woertern mit Umlaufzeit-Argument und Bahnradius-Rechnung und nennen Sie die korrekte Bahn.
RUBRIC (30 XP): LEO-Periode ca. $90\,\mathrm{min}$ berechnet (10 XP) | Widerspruch zu feststehend erklaert (10 XP) | GEO-Bedingung $T = 24\,\mathrm{h}$ plus Aequatorlage genannt (10 XP).

`Klausur-Satz: Wer Gleichgewicht ansetzt, Bahngroessen berechnet und Kepler zur Kontrolle nutzt, erhaelt die volle Punktzahl.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Impuls beim Ankoppeln
TAKEAWAY 1盒（核心总结）：

中文：卫星就一句话：引力拽着转弯。列 $G\,mM/r^2 = mv^2/r$，得 $v = \sqrt{GM/r}$，再套 $T = 2\pi r/v$。半径从地心算，越高越慢越长。低轨约 90 分钟一圈，同步轨 24 小时定点赤道。
Takeaway-Satz: `Gravitation gleich Zentripetalkraft: Daraus folgen Geschwindigkeit und Periode jeder Kreisbahn.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Wurzelrechnung mit Zehnerpotenzen (Schritt 4) oder die Konzeptwahl LEO gegen GEO (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst $r = R_{Erde} + h$ hin und kreise den Radius rot ein.

`Klausur-Satz: Fallen und Fliegen sind eins: Umlaufbahnen sind ewiges Fallen am Boden vorbei.`
