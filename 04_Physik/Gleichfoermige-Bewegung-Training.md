---
fach: Physik
thema: "Gleichförmige Bewegung: Training"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-23
tags: [EF, Physik]
---

# Gleichfoermige Bewegung: Training（匀速运动轮训·方法总结）

> 中文一句话理解：匀速就是速度不变，s-t 图是一条直线，斜率即速度；考试只考"读图画图→列式带单位算→评价误差与出行意义"这一条链。

## 1. ggB 三件套（darstellen + analysieren）

中文在上：三件套互相锁死——图对了，公式就不会错；单位对了，评价就有分。

- **s-t-Diagramm lesen/zeichnen**：横轴时间 t，纵轴路程 s；匀速对应一条过原点（或起点）的直线。读图看斜率，画图先标轴+单位再连点成线。
- **v = s/t + Einheiten**：公式见 `Formel-Spickzettel.md`（$s = v\cdot t$）；计算全程带单位，结果带单位；km/h 与 m/s 之间换算见 §4。
- **Durchschnitts- vs Momentangeschwindigkeit**：平均速度 = 总路程/总时间（含停留段会拉低平均值）；瞬时速度 = 某时刻 s-t 切线斜率；匀速段内两者相等，非匀速段内不等。

Alltags-Kontexttypen（只谈题型，不抄题干数字）：

- Autobahn-Kontexttyp：一句话——长途高速行程适合练"分段读图+全程平均速度"，关键是区分行驶段与停留段。
- Ruhrtalradweg-Kontexttyp：一句话——休闲骑行路线适合练"地图路程与时间表对照+现实 plausibility 评价"，关键是把匀速模型当作近似并指出其边界。

德语 Klausur-Satz：

- `Im s-t-Diagramm zeigt sich eine gleichförmige Bewegung daran, dass die Messpunkte auf einer Geraden liegen; ihre Steigung gibt die Geschwindigkeit an.`

## 2. Messreihe-Auswertung in vier Schritten（EXEL-AB 转述）

中文在上：老师那份表格软件讲义的核心就是"表→图→斜率→评价"，软件只是尺子，物理判断在人。

1. **Tabelle**：两列量 + 单位 + 合理小数位；t 与 s 配对记录，不跳步。
2. **Diagramm mit Excel**：散点图（punkte），轴标题含单位，趋势线为直线拟合；不连折线，不强行过原点。
3. **Steigung = Größe**：拟合直线斜率即速度 v（含单位）；用两点式 `v = Δs/Δt` 核对，与拟合值互相印证。
4. **Bewertung/Messfehler**：看点偏离直线的程度谈偶然误差，看停表/ attributed 起点谈系统误差；结论只说模型在误差内成立，不说绝对精确。

德语 Klausur-Satz：

- `Die Ausgleichsgerade beschreibt die Messreihe im Rahmen der Messunsicherheit gut, weil die Abweichungen unsystematisch streuen.`

## 3. Klausur-Baustein（gegeben/gesucht → Bewertung）

中文在上：力学大题永远四行——已知求解、公式、带单位计算、回扣出行/气候一句话评价。

- **gegeben/gesucht**：符号+单位摘出，隐含条件（如"gleichförmig""Ruhepause"）单独列一行。
- **Ansatz**：先写 $v = s/t$ 或 $s = v\cdot t$，再代入，绝不只写数字。
- **Rechnung mit Einheiten**：每步带单位，末行"Ergebnis + Einheit + Größenordnung ok?"。
- **Bewertung Mobilität/Klima**：匀速模型省油/准时 vs 现实有加速停留；骑行/公共出行对比只谈趋势，不编数据。

德语 Klausur-Sätze（本节 2 个）：

- `Gegeben ist eine gleichförmige Bewegung, gesucht ist die Geschwindigkeit; mit dem Ansatz v = s/t folgt das Ergebnis einschließlich Einheit.`
- `Für die Bewertung der Mobilität ist das Ergebnis plausibel, weil die gleichförmige Fahrt als Näherung den Energieverbrauch senkt, aber Pausen und Beschleunigung unberücksichtigt lässt.`

## 4. Typische Fehler（Fehlvorstellungen）

中文在上：两处年年丢分——轴看错、单位不换。

- **s-t 与 v-t 轴混淆**：s-t 直线斜率是速度，v-t 直线（水平）本身是速度；s-t 越陡越快，v-t 越高越快；纠偏：做题先圈轴标签再说"这是哪张图"。
- **Einheit km/h ↔ m/s（Faktor 3,6）**：km/h 除以 3,6 得 m/s，m/s 乘以 3,6 得 km/h；纠偏：公式计算统一用 m/s 与 s，结果需要时再换回 km/h 并写出换算一步。

德语 Klausur-Satz：

- `Der Vergleich ist erst nach der Umrechnung auf dieselbe Einheit zulässig, weil sonst systematisch um den Faktor 3,6 verfälscht wird.`

## 5. Quelle / Anbindung

- Methode原创总结；题型对应 `_Downloads/Physik/lehrer-2026-09/` 内 Lehrer-Material（nur lokales Lernen, keine Weitergabe；题干原文与数字不抄入本笔记）。
- 公式源：`04_Physik/Formel-Spickzettel.md`（ggB-覆盖：$s = v\cdot t$ 已有；本篇补读图/评价链）。
- Lehrplan-Anker：`04_Physik/Lehrplan.md` §1 Grundlagen der Mechanik（Kinematik gleichförmig + digitale Messdatenauswertung）。

## 6. Vernetzung

- [[00_META/MINT-Vernetzung-Konzeptkarte|MINT-Vernetzung-Konzeptkarte]] — 理科大一统图谱（变化率、守恒、平衡）
- [[03_Mathe/Analysis-Physik-Kinetik-Vernetzung|Analysis-Physik-Kinetik-Vernetzung]] — 微积分导数与运动学速度瞬时变化率深度联动
