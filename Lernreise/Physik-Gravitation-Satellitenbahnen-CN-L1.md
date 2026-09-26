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

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清万有引力公式 $F = G\,mM/r^2$ 中每个符号的含义，并解释平方反比为什么导致高轨道引力骤降。
2. 中文：能由"引力提供向心力"列出等式并推出第一宇宙速度和轨道速度公式 $v = \sqrt{GM/r}$。
3. 中文：能区分低轨、同步轨道的速度与周期特点，并写出德语标准结论句（AFB II）。

Klausur-Satz: `Auf einer Kreisbahn liefert die Gravitationskraft die noetige Zentripetalkraft fuer den Satelliten.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 万有引力 — Gravitationskraft：$F = G\,mM/r^2$，质量乘积成正比、距离平方成反比。【陷阱：Gravitation（质量间的普适引力）不是 Gewichtskraft（特指地球对物体的重力 $mg$，只在地面附近近似）。】
- 向心力 — Zentripetalkraft：维持圆周运动指向圆心的合力，$F_z = mv^2/r$。【陷阱：Zentripetal（向心，真实合力）不是 Zentrifugal（离心，惯性系中的假想力）。】
- 轨道半径 — Bahnradius：从地心算起，$r = R_{Erde} + h$。【陷阱：Bahnradius（自地心起算）不是 Flughöhe（自地面起算的高度 $h$）。】
- 第一宇宙速度 — Erste kosmische Geschwindigkeit：地面附近环绕速度约 $7{,}9\,\mathrm{km/s}$。【陷阱：erste kosmische（环绕不落地）不是 zweite kosmische（$11{,}2\,\mathrm{km/s}$，脱离地球）。】
- 地球同步轨道 — Geostationaere Bahn：周期 $24\,\mathrm{h}$、高度约 $35\,786\,\mathrm{km}$ 的赤道轨道。【陷阱：geostationaer（定点于赤道上空）不是 sonnensynchron（极地轨道，过境地方时固定）。】

Klausur-Satz: `Der Bahnradius wird immer vom Erdmittelpunkt aus gemessen, nicht von der Erdoberflaeche.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：卫星不掉下来不是因为没有引力，恰恰是因为引力在拉着它转弯。圆轨道条件只有一句话：引力 = 所需向心力，即 $G\,mM/r^2 = m v^2/r$，约掉 $m$ 和一个 $r$ 得到 $v = \sqrt{GM/r}$。半径越大，速度越慢、周期越长——这就是为什么低轨卫星八九十分钟一圈，而同步卫星要 24 小时。算周期再套一圈周长：$T = 2\pi r / v$。记住半径必须从地心算，漏加地球半径是头号丢分点。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
              Satellit m (v tangential ->)
                    o
                   /|
                  / |
          F_grav |  | r = R_Erde + h
          (ein-) |  |
          waerts |  |
                 |  |
                 +--+
              Erdmittelpunkt (M)
   Gleichgewicht: G*m*M/r^2 = m*v^2/r
   => v = sqrt(GM/r),  T = 2*pi*r/v
   klein r -> gross v, klein T (LEO)
   gross r -> klein v, gross T (GEO)
```

Klausur-Satz: `Mit wachsendem Bahnradius sinkt die Bahngeschwindigkeit und waechst die Umlaufzeit.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Newton soll die Gravitation durch einen fallenden Apfel verstanden haben — aber sein genialer Gedanke war: Der Mond faellt genauso wie der Apfel, er verfehlt nur staendig die Erde, weil er seitwaerts schnell genug fliegt. Ein Satellit ist also nichts anderes als ein ewig fallender Koerper.

**中文解读**: 牛顿的苹果和月亮是同一个公式。中国学生常问"卫星为什么悬着不掉"，答案是它一直在掉，只是横向跑得太快，每次都错过地面——"失重"不是没引力，而是和引力一起自由下落。

**Bezug zum Konzept**: `Ein Satellit faellt permanent zur Erde und verfehlt sie durch seine Bahngeschwindigkeit.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: gravitation]

AUFGABE中文导读：已知低轨高度求轨道速度和周期，练习"地心半径 + 引力等于向心力"两步列式。

AUFGABE (berechnen, AFB II)：Ein Satellit kreist in $h = 400\,\mathrm{km}$ Hoehe ueber der Erde ($R_{Erde} = 6370\,\mathrm{km}$, $M_{Erde} = 5{,}97 \times 10^{24}\,\mathrm{kg}$, $G = 6{,}67 \times 10^{-11}\,\mathrm{m^3/(kg\,s^2)}$). Berechnen Sie Bahngeschwindigkeit und Umlaufzeit.

HILFE:
1. Schritt 1: Bahnradius vom Erdmittelpunkt bestimmen: $r = R_{Erde} + h$.
2. Schritt 2: Kraftansatz $G\,mM/r^2 = m v^2/r$ nach $v = \sqrt{GM/r}$ aufloesen und einsetzen.
3. Schritt 3: Umlaufzeit $T = 2\pi r / v$ berechnen und in Minuten umrechnen.

MUSTERLÖSUNG: Es gilt $r = 6{,}37 \times 10^6 + 0{,}40 \times 10^6 = 6{,}77 \times 10^6\,\mathrm{m}$. Damit $v = \sqrt{GM/r} = \sqrt{3{,}98 \times 10^{14} / 6{,}77 \times 10^6} \approx 7{,}67 \times 10^3\,\mathrm{m/s} \approx 7{,}7\,\mathrm{km/s}$. Die Umlaufzeit ist $T = 2\pi \cdot 6{,}77 \times 10^6 / 7670 \approx 5540\,\mathrm{s} \approx 92\,\mathrm{min}$.

Klausur-Satz: `In $400\,\mathrm{km}$ Hoehe betraegt die Bahngeschwindigkeit etwa $7{,}7\,\mathrm{km/s}$ bei $92$ Minuten Umlaufzeit.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：低轨眼 vs. 同步轨眼）：

VERGLEICH: Waehle erst das Konzept — 【选概念】先判断题目给的是 (i) LEO-Konzept（高度几百公里、周期约 $90\,\mathrm{min}$、速度约 $8\,\mathrm{km/s}$）还是 (ii) GEO-Konzept（周期 $24\,\mathrm{h}$、高度约 $36\,000\,\mathrm{km}$、定点赤道）—— dann rechnen.

AUFGABE A：Eine Raumstation in $400\,\mathrm{km}$ Hoehe soll versorgt werden. Welche Umlaufzeit erwarten Sie grob?
AUFGABE B：Ein TV-Satellit soll fest ueber dem Aequator stehen. Welche Bahnbedingung muss gelten?

HILFE: A nennt LEO-Hoehe -> Konzept (i), kurze Periode. B verlangt feststehenden Eindruck -> Konzept (ii), $T = 24\,\mathrm{h}$.【选概念：题干出现 ISS / $400\,\mathrm{km}$ / Erdbeobachtung 选低轨；出现 feststehend / Aequator / $24\,\mathrm{h}$ / Fernsehen 选同步轨。】

ANTWORT: A erfordert Konzept (i): $T \approx 90\,\mathrm{min}$, $v \approx 7{,}7\,\mathrm{km/s}$. B erfordert Konzept (ii): $T = 24\,\mathrm{h}$, daraus $r \approx 42\,164\,\mathrm{km}$ bzw. $h \approx 35\,786\,\mathrm{km}$ ueber dem Aequator.

Klausur-Satz: `Niedrige Bahnen sind schnell und kurzperiodisch, die geostationaere Bahn ist langsam und tagesperiodisch.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet der Kraftansatz fuer eine Kreisbahn? | ANTWORT: $G\,mM/r^2 = m v^2/r$, Gravitation liefert Zentripetalkraft.
FRAGE: Wie haengt die Bahngeschwindigkeit vom Radius ab? | ANTWORT: $v = \sqrt{GM/r}$, groesseres $r$ bedeutet kleineres $v$.
FRAGE: Von wo aus wird der Bahnradius gemessen? | ANTWORT: Vom Erdmittelpunkt, also $r = R_{Erde} + h$.

Klausur-Satz: `Die Umlaufzeit folgt aus Umfang durch Geschwindigkeit: $T = 2\pi r / v$.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"卫星上失重是因为那里没有引力"。
   中文纠偏：在 400 公里高度引力仍有地面的约九成。失重是因为卫星和宇航员一起绕地自由下落，引力全用来转弯，没有多余来压地板。
   Korrektur-Satz: `Schwerelosigkeit auf der Umlaufbahn bedeutet freien Fall, nicht Abwesenheit von Gravitation.`

2. 误解"轨道半径就是题目给的高度，直接代入公式"。
   中文纠偏：公式里的 $r$ 是到地心的距离，必须加地球半径 $6370\,\mathrm{km}$。直接用高度会算出超大速度，是计算题最常见的整题丢分。
   Korrektur-Satz: `In alle Bahngleichungen ist $r = R_{Erde} + h$ einzusetzen, nie die Hoehe allein.`

## Schritt 7 — szenario

ROLLE: Du bist Tutor im Physikkurs und erklaerst Satellitenbahnen.
SITUATION: Eine Mitschuelerin behauptet, ein TV-Satellit koenne in $400\,\mathrm{km}$ Hoehe fest ueber Berlin stehen.
AUFGABE: Widerlegen Sie das in ca. 150 Woertern mit Umlaufzeit-Argument und Bahnradius-Rechnung und nennen Sie die korrekte Bahn.
RUBRIC (30 XP): LEO-Periode ca. $90\,\mathrm{min}$ berechnet (10 XP) | Widerspruch zu feststehend erklaert (10 XP) | GEO-Bedingung $T = 24\,\mathrm{h}$ plus Aequatorlage genannt (10 XP).

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：卫星就一句话：引力拽着转弯。列 $G\,mM/r^2 = mv^2/r$，得 $v = \sqrt{GM/r}$，再套 $T = 2\pi r/v$。半径从地心算，越高越慢越长。低轨约 90 分钟一圈，同步轨 24 小时定点赤道。
Takeaway-Satz: `Gravitation gleich Zentripetalkraft: Daraus folgen Geschwindigkeit und Periode jeder Kreisbahn.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Wurzelrechnung mit Zehnerpotenzen (Schritt 4) oder die Konzeptwahl LEO gegen GEO (Schritt 5)?
2. 元认知计划：Beim naechsten Mal schreibe ich zuerst $r = R_{Erde} + h$ hin und kreise den Radius rot ein.
