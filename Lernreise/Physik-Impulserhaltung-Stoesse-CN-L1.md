---
fach: Physik
thema: "Impulserhaltung und Stoesse"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, berechnen, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Physik, CN]
version: Lesson-v3
---

# Lernreise: Impulserhaltung und Stoesse (L1, Ziel Klausur)

<!-- Campaign: Mars-Mission | Episode 22/28 | Krise: Sol-118 Seilwinden-Test Last 480 kg reisst fast | Target: v0 = 394 m/s, a = 4.9 m/s2, Ziel s = 1614 m | Tool: formula -->

## Schritt 1 — entdecken: Startbahn der Messdaten
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能写出动量 $p = m v$ 与守恒条件（合外力为零、碰撞瞬间内力远大于外力）。
2. 中文：能用守恒式 $m_1 v_1 + m_2 v_2 = m_1 u_1 + m_2 u_2$ 解一维完全非弹性与弹性碰撞。
3. 中文：能选择碰撞类型对应的方程组（选程序：粘连共速 vs 弹性双守）。

Voraussetzung（窄切口）：只做一维、已知质量与初速求末速；不处理斜碰与相对论，已会解二元一次方程。

### Hook / Phaenomen

【火星拓荒者·第22集/共28集】警报：Sol-118 Seilwinden-Test Last 480 kg reisst fast。领航员 Lena 大喊：“v0 = 394 m/s, a = 4.9 m/s2, Ziel s = 1614 m！”机械师 Tom 回应：“稳住曲线！”上一集（Physik-Gravitation-Satellitenbahnen-L1.md）埋下的隐患在此爆发，下一集（Physik-Impulserhaltung-Stoesse-DE-L1.md）的大门只为算对的人打开。本集你要在沙盘里亲手把飞船从超速边缘救回来：先看现象、再点装备、最后算出让考官点头的 Bilanz。记住：读图先看轴、计算必带单位、做完必用另一张图验算——这就是火星人生存法则，也是 Klausur 拿分法则。

Hook / Phaenomen (Sol-Logbuch, Episode 22 von 28): Mars-Anflug, Sol-118 Seilwinden-Test Last 480 kg reisst fast. Navigatorin Lena meldet: v0 = 394 m/s, a = 4.9 m/s2, Ziel s = 1614 m, Mechaniker Tom ruft: Halte die Kurve! Der Bordcomputer geht auf Rot, das Funkgeraet rauscht, die Crew haelt den Atem an. Genau hier entscheidet Impulserhaltung und Stoesse ueber Landung oder Absturz, ueber Festfahren oder Weiterfahrt, ueber Andocken oder Abprall. Das Logbuch des vorherigen Sols (Physik-Gravitation-Satellitenbahnen-L1.md) warnte bereits vor diesem Moment, und das naechste Fenster (Physik-Impulserhaltung-Stoesse-DE-L1.md) oeffnet sich nur, wenn diese Aufgabe geloest wird. Die Sensoren streuen, die Diagramme zittern, doch die Physik bleibt unbestechlich: Wer Steigung und Flaeche, Kraft und Gegenkraft, Schwung und Stoss richtig liest, rettet die Mission. In dieser Episode stellst du im Sandbox-Labor die Brems- und Gleitzahlen so ein, dass die Kapsel sicher durchkommt. Beobachte zuerst das Phaenomen in Ruhe, benenne dann die Groessen mit exakten Einheiten, pruefe schliesslich die Bilanz mit einer Gegenrechnung. Der folgende Weg fuehrt vom Alarmton zur sauberen Klausurloesung: erst das Phaenomen beobachten, dann die Begriffe sichern, dann das Modell rechnen und im Labor bestaetigen.

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 2 — entdecken: Ausruestungskiste der Mars-Crew
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 动量 — Impuls $p = m v$：矢量，方向与速度相同，单位 $\mathrm{kg \cdot m/s}$。
- 封闭系统 — abgeschlossenes System：合外力为零，$p_{ges}$ 不变。
- 完全非弹性碰撞 — vollkommen unelastischer Stoss：碰后粘连共速 $u$，动能损失最大。
- 弹性碰撞 — elastischer Stoss：动量与动能双守恒，$E_{kin}$ 不变。
- 反冲 — Rueckstoss：系统初动量为零时两部分向相反方向运动。

Klausur-Satz: `Der Impuls ist eine vektorielle Groesse; seine Richtung muss im Ansatz durch Vorzeichen beruecksichtigt werden.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 3 — entdecken: Wirkungskette hinter Impulserhaltung und Stoesse
ENTDECKEN（1概念 + 1文字图解，中文在上、德语在下）：

Hook中文生活切入：

中文：想象台球桌：白球撞停、彩球飞走，动量像传接力棒一样交了出去，总数一颗没少。

Phaenomen-Satz (DE): Der Stoss verteilt, die Summe bleibt.

Spiel-Aufgabe沙盒操作指引：

中文：打开沙盒，拖动滑块改两车质量与初速、正负代表方向（关键词：Impuls, Vorzeichen, abgeschlossen, Stossart），看完全非弹性碰撞后共速如何由总动量除以总质量定出。

Beobachtungs-Satz (DE): Vorher plus nachher: $p_{vor} = p_{nach}$ zaehlt mit Zeichen.

Aha-Moment因果链：

中文因果链：封闭系统无外冲量，总动量守恒；先定正方向带符号求和得总动量，非弹性碰后粘一起即除以总质量得共速，弹性则需再加能量方程联立；碰型决定用几个方程。

Gesetz-Satz (DE): In einem abgeschlossenen System bleibt der Gesamtimpuls erhalten.

$p = m\,v$

$p_{vor} = p_{nach}$

$u = p_{vor}/(m_1+m_2)$

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
vor: m1*v1 (+/-) + m2*v2 (+/-) = p_vor = 6.0
nach (unelastisch): (m1+m2)*u, u = 2.0 m/s
Regel: Zeichen = Richtung, Typ = Gleichungszahl
```
Klausur-Satz: `Unelastisch teilt man durch die Gesamtmasse, elastisch loest man das System aus Impuls- und Energiesatz.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Beim Kugelstoss-Pendel (Newton-Wiege) bleibt beim elastischen Stoss fast die gesamte Bewegung erhalten: Eine Kugel faellt herein, genau eine Kugel fliegt hinaus. Der Gesamtimpuls wandert durch die ruhenden Kugeln hindurch — ein Schreibtisch-Experiment zur Impulserhaltung.

**中文解读**: 牛顿摆是弹性碰撞的活模型——进一个、出一只，中间球几乎不动。记住这个画面，弹性双守恒就不再抽象。

**Bezug zum Konzept**: `Die Newton-Wiege zeigt Impuls- und Energieerhaltung in einem einzigen Klick.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Startbahn der Messdaten
Kontinuitaet: Vorher Physik-Gravitation-Satellitenbahnen-L1.md | Nachher Physik-Impulserhaltung-Stoesse-DE-L1.md. Krise dieser Episode: Sol-118 Seilwinden-Test Last 480 kg reisst fast. Target: v0 = 394 m/s, a = 4.9 m/s2, Ziel s = 1614 m.

[Werkzeug: formula]

BEISPIEL（正确例题示范，含教具操作与解答，中文在上、德语在下）：

AUFGABE中文导读（沙盒谜题）：两车碰前总动量6.0、总质量3.0千克，完全非弹性碰后求共速并指方向。

AUFGABE (berechnen, AFB II): Zwei Wagen mit $p_{vor} = 6{,}0\,\mathrm{kg\,m/s}$ und Gesamtmasse $3{,}0\,\mathrm{kg}$ stossen voll unelastisch. Berechnen Sie $u$.

HILFE（中德双语步骤）：

1. 中文：第1步定正方向带符号求和，关键词：Richtung。
   Schritt 1 (DE): Vorzeichen als Richtung beachten.
2. 中文：第2步认碰型：粘一起用动量方程一个就够，关键词：Typ。
   Schritt 2 (DE): Unelastisch: eine Gleichung genuegt.
3. 中文：第3步总动量除以总质量得共速，关键词：Division。
   Schritt 3 (DE): $u = p_{vor}/(m_1+m_2)$.

MUSTERLOESUNG：中文：碰前总动量6.0带正号即沿正方向，非弹性碰后两车一体，6.0除以3.0得共速2.0米每秒，方向与原来总动量一致。

MUSTERLOESUNG (DE): Aus $p_{vor} = 6{,}0\,\mathrm{kg\,m/s}$ und $3{,}0\,\mathrm{kg}$ folgt $u = 2{,}0\,\mathrm{m/s}$ in Fahrtrichtung: $p_{vor} = p_{nach}$ mit Zeichen.
Klausur-Satz: `Aus p_vor = 6,0 kg m/s und der Gesamtmasse 3,0 kg folgt u = 2,0 m/s in Fahrtrichtung.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 5 — ausprobieren: Duell der Verfahren Startbahn der Messdaten
VERGLEICH辨别实验（双向辨析：粘连共速 vs 弹性双守）：

VERGLEICH: Waehle erst das Verfahren — 【选程序】先找关键词：(i) 粘连共速（haften / zusammenbleiben：只列动量式，除以总质量）oder (ii) 弹性双守（elastisch：动量式加动能式联立）—— dann loesen.

Weg A: Erst Verfahren waehlen, dann rechnen.

AUFGABE A：Zwei Knetkugeln bleiben nach dem Stoss zusammen. Gegeben $m$, $v$, gesucht $u$.
Weg B: Alternative Route mit Gegenrechnung.

AUFGABE B：Zwei Stahlkugeln stossen elastisch; gesucht beide Endgeschwindigkeiten.

HILFE: A 含 zusammen → Verfahren (i)。B 含 elastisch → Verfahren (ii)。【选程序：见粘连除总质；见弹性列双式。】

ANTWORT: A erfordert Verfahren (i): Eine Gleichung $m_1v_1+m_2v_2 = (m_1+m_2)u$ genuegt; $u$ folgt durch Division durch $m_1+m_2$. B erfordert Verfahren (ii): Zusaetzlich gilt $\frac{1}{2}m_1v_1^2+\frac{1}{2}m_2v_2^2 = \frac{1}{2}m_1u_1^2+\frac{1}{2}m_2u_2^2$; erst beide Gleichungen zusammen liefern $u_1$ und $u_2$. Wer in B nur den Impulssatz schreibt, hat eine Gleichung zu wenig.

Klausur-Satz: `Unelastisch genuegt der Impulssatz, elastisch braucht man Impuls- und Energiesatz gemeinsam.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 6 — check: Selbsttest zu Impulserhaltung und Stoesse: Startbahn der Messdaten
CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wann gilt die Impulserhaltung? | ANTWORT: Wenn das System abgeschlossen ist bzw. beim Stoss die inneren Kraefte dominieren; dann gilt $p_{vor} = p_{nach}$.
FRAGE: Wie lautet der Ansatz beim vollkommen unelastischen Stoss? | ANTWORT: $m_1v_1+m_2v_2 = (m_1+m_2)u$.
FRAGE: Was gilt zusaetzlich beim elastischen Stoss? | ANTWORT: Die kinetische Gesamtenergie bleibt erhalten: $E_{vor} = E_{nach}$.

Klausur-Satz: `Der Stosstyp entscheidet, ob nur der Impuls oder Impuls und Energie erhalten bleiben.`

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解"动量守恒就是动能守恒"。
   中文纠偏：动量在封闭系统恒守恒，动能只在弹性碰撞守恒。粘连碰撞动能必然损失一部分，不能再列动能式。
   Korrektur-Satz: `Der Impuls bleibt in jedem abgeschlossenen Stoss erhalten, die Energie nur im elastischen.`

2. 误解"速度直接代入大小即可"。
   中文纠偏：动量是矢量，一维必须先定正方向，反向速度取负。符号错则整式错。
   Korrektur-Satz: `Geschwindigkeiten gegen die positive Richtung erhalten ein negatives Vorzeichen.`

## Schritt 7 — szenario: Klausurtransfer: Impulserhaltung und Stoesse: Startbahn der Messdaten
ROLLE: Du bist Laborassistent und erklaerst zwei Stossversuche.
SITUATION: Eine Gruppe verwechselt Knete mit Stahlkugeln und schreibt immer beide Saetze hin. Erklaere in einer zusammenhaengenden Darstellung (ca. 150 Woerter), wie man am Versuchsergebnis (zusammen vs. getrennt) den Stosstyp erkennt und welchen Gleichungssatz man jeweils ansetzt.
RUBRIC (30 XP): Erkennungsmerkmal des Stosstyps (8 XP) | Ansatz unelastisch mit Rechnung (8 XP) | Ansatz elastisch mit beiden Saetzen (8 XP) | Vorzeichenregel und Fachsprache (6 XP).

`Klausur-Satz: Siehe Schritt-Inhalt.`

## Schritt 8 — reflexion: Takeaway & Reflexion: Startbahn der Messdaten
TAKEAWAY 1盒（核心总结）：

中文：先定正方向管符号，再看关键词选方程：粘连只列动量、除以总质量；弹性动量加动能、联立解双末速。记住一句话——粘连列一式，弹性列两式。
Takeaway-Satz: `Erst die Richtung, dann der Stosstyp, dann der passende Gleichungssatz.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — die Rechnung mit Vorzeichen (Schritt 4) oder die Wahl des Stosstyps (Schritt 5)?
2. 元认知计划：Beim naechsten Mal markiere ich zuerst das Wort zusammen oder elastisch.

`Klausur-Satz: Siehe Schritt-Inhalt.`
