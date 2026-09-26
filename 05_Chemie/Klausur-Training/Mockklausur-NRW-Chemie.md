---
fach: Chemie
thema: "Abgaskatalysator — Kinetik, chemisches Gleichgewicht, MWG"
operatoren: [beschreiben, darstellen, zuordnen, erklären, anwenden, überprüfen, beurteilen, Stellung nehmen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Chemie, Kinetik, Gleichgewicht, MWG]
---

# Mockklausur Chemie — Abgaskatalysator (Kinetik · chemisches Gleichgewicht · MWG)

> 中文一句话：以三元催化器为载体，把「碰撞理论/活化能（动力学）」与「质量作用定律/最小作用力原理（热力学平衡）」分开考——最经典的坑是**把「冷启动转化率低」误判成平衡问题**，其实它是速率问题。

---

### 1. Prüfungsrahmen

| Merkmal | Angabe |
|---|---|
| Fach | Chemie（EF → Q1 对标， Grundkurs-Niveau） |
| Inhaltsfeld (KLP) | IF 2: Reaktionsgeschwindigkeit und chemisches Gleichgewicht（+ IF 1 有机燃料作情境） |
| Dauer | **120 min Bearbeitungszeit**（EF-Klausur üblich 90 min；此处按 Q1 全真模拟加倍：Lese-/Planungszeit 10 min + Bearbeitung 100 min + Schlusskontrolle 10 min）。⏳ 待确认：本班 Lehrkraft 若按 90 min 出题，压缩方案见 §7。 |
| Hilfsmittel | Taschenrechner (nicht-CAS)、Periodensystem、Handformelsammlung、**kein** Tabellenbuch |
| Gesamt-BE | **100 BE** |
| AFB-Verhältnis | **AFB I + AFB II = 80 BE (80 %) · AFB III = 20 BE (20 %)** |
| Aufgaben | 10（A1–A4 = AFB I，A5–A8 = AFB II，A9–A10 = AFB III） |

**Zeitverteilung（Vorschlag）**：Material lesen 10 min · A1 5 · A2 8 · A3 8 · A4 7 · A5 10 · A6 12 · A7 14 · A8 13 · A9 14 · A10 9 · Kontrolle 10 min.

---

### 2. Material — 原创德语文献材料

#### M1 — „Wenn die Chemie zu langsam ist: Der Dreiwegekatalysator im Kaltstart"

> ⚠️ 原创仿写 Modelltext（仿 Technikjournal / populärwissenschaftlicher Fachartikel 风格撰写，非真实出版物摘录；数据与人名均为虚构）

Ein moderner Ottomotor mit geregeltem Dreiwegekatalysator gilt als Musterbeispiel angewandter Chemie: Auf engstem Raum werden drei Schadstoffgruppen gleichzeitig in deutlich harmlosere Produkte überführt. Kohlenstoffmonoxid (CO) wird zu Kohlenstoffdioxid oxidiert, unverbrannte Kohlenwasserstoffe ($C_xH_y$) werden zu $CO_2$ und Wasser verbrannt, und Stickstoffmonoxid (NO) wird zu molekularem Stickstoff reduziert. Chemisch gesehen konkurrieren dabei zwei Zielsetzungen: CO und Kohlenwasserstoffe brauchen Sauerstoff, NO dagegen darf nicht mit Sauerstoff in Kontakt bleiben, wenn es zu $N_2$ reduziert werden soll. Der Katalysator muss also zugleich oxidieren und reduzieren. Das gelingt nur in einem engen Fenster um das Luftverhältnis $\lambda = 1$, bei dem Luft und Kraftstoff im stöchiometrischen Verhältnis zugeführt werden.

Herzstück der Anlage ist ein Keramikwabenkörper aus Cordierit mit rund 600 Kanälen pro Quadratzentimeter Stirnfläche. Auf den Kanalwänden liegt eine poröse Zwischenschicht, der sogenannte Washcoat aus Aluminiumoxid; sie vergrößert die wirksame Oberfläche auf das Mehrhundertfache der geometrischen Wabenfläche. In diese Schicht sind die Edelmetalle Platin, Palladium und Rhodium als feinste Kristallite eingebettet. Platin und Palladium übernehmen vor allem die Oxidation, Rhodium die Reduktion der Stickoxide. Entscheidend ist, dass die Umsetzung nicht im Gasraum, sondern an der Metalloberfläche abläuft: Die Moleküle werden adsorbiert, ihre Bindungen werden geschwächt, und der entscheidende Reaktionsschritt benötigt eine deutlich geringere Aktivierungsenergie als in der Gasphase. Nach der Arrhenius-Beziehung entspricht die Absenkung der Aktivierungsenergie von 98 auf 54 kJ·mol⁻¹ bei 400 °C einer Erhöhung der Reaktionsgeschwindigkeit um den Faktor 2,6·10³ gegenüber der unkatalysierten Reaktion gleicher Temperatur.

So überzeugend diese Bilanz klingt, sie hat eine Schwachstelle: den Kaltstart. Direkt nach dem Anlassen ist der Katalysator kalt. Unterhalb der sogenannten Anspringtemperatur von etwa 280 °C läuft die Umsetzung nur langsam ab; bei 250 °C werden in den ersten zehn Sekunden lediglich rund 10 % des Kohlenstoffmonoxids umgesetzt, bei 400 °C sind es unter sonst gleichen Bedingungen 82 %. Das ist bemerkenswert, denn thermodynamisch läge das Gleichgewicht bei niedrigerer Temperatur sogar günstiger: Die Reaktion $2\,NO(g) + 2\,CO(g) \rightleftharpoons N_2(g) + 2\,CO_2(g)$ verläuft exotherm, folglich fällt die Gleichgewichtskonstante $K_c$ von 2,6·10³ L·mol⁻¹ bei 250 °C auf 4,2·10² L·mol⁻¹ bei 400 °C. Mit anderen Worten: Der Katalysator versagt im Kaltstart nicht, weil das Gleichgewicht ungünstig läge, sondern weil die Reaktionsgeschwindigkeit zu klein ist. Erst nach ein bis zwei Minuten Fahrzeit erreicht der Wabenkörper seine Betriebstemperatur; in dieser Zeit entsteht ein erheblicher Anteil der Schadstoffe eines durchschnittlichen Stadtfahrzyklus.

Hersteller reagieren mit elektrisch beheizbaren Katalysatoren, mit einem zusätzlichen motornah eingebauten Vorkatalysator und mit Motorsteuerungen, die das Abgas durch späte Zündung schnell aufheizen. Alle diese Maßnahmen verbrauchen zusätzliche Energie und damit zusätzlichen Kraftstoff – ein Zielkonflikt, der sich nicht wegdiskutieren lässt. Ebenso wenig löst der Katalysator das Klimaproblem: Er wandelt giftige Stoffe in Kohlenstoffdioxid um, also in genau das Gas, das für die Erwärmung der Atmosphäre verantwortlich gemacht wird. Hinzu kommt der Bedarf an Platinmetallen, deren Gewinnung energieintensiv ist und die nur durch aufwendiges Recycling zurückgewonnen werden können. Wer den Dreiwegekatalysator beurteilt, muss daher zwischen der Toxizität der Abgase, der Kinetik der Umsetzung und der Bilanz der eingesetzten Rohstoffe unterscheiden. Der Katalysator ist ein sehr wirksames Werkzeug der chemischen Kinetik, aber kein Freibrief für den Verbrennungsmotor.

[Wortzahl: 493]  <!-- 计数方式：仅正文德文词，LaTeX 公式段不计，复合单位如 kJ·mol⁻¹ 计为 1 词 -->

#### M2 — Datenblätter (原创仿写, 数据虚构但自洽)

**Tab. 1 — Kennwerte des Modellkatalysators**

| Kenngröße | Wert |
|---|---|
| Träger | Keramikwabenkörper aus Cordierit, ca. 600 Kanäle/cm² |
| Washcoat | $\gamma$-$Al_2O_3$, poröse Zwischenschicht |
| Edelmetalle | Pt / Pd（Oxidation），Rh（Reduktion der Stickoxide） |
| Anspringtemperatur（50 % Umsatz） | $\vartheta_{50} \approx 280\ ^\circ\mathrm{C}$ |
| Luftverhältnis im Optimalbetrieb | $\lambda = 0{,}99 - 1{,}01$ |
| Aktivierungsenergie $E_A$ | unkatalysiert $98\ \mathrm{kJ{\cdot}mol^{-1}}$ · katalysiert $54\ \mathrm{kJ{\cdot}mol^{-1}}$ |
| Modellreaktor | $V = 2{,}0\ \mathrm{L}$ |

**Tab. 2 — Messreihe V4: Konzentrationen beim Umsatz von NO und CO**
（$\vartheta = 400\ ^\circ\mathrm{C}$, Pt/Rh-Wabenkörper, $V = 2{,}0\ \mathrm{L}$, $c_0(NO) = c_0(CO) = 0{,}900\ \mathrm{mol{\cdot}L^{-1}}$）

| $t\,/\,\mathrm{s}$ | 0 | 2 | 4 | 6 | 8 | 10 | 12 | 14 | 16 |
|---|---|---|---|---|---|---|---|---|---|
| $c(CO)\,/\,(\mathrm{mol{\cdot}L^{-1}})$ | 0,900 | 0,610 | 0,410 | 0,270 | 0,195 | 0,160 | 0,150 | 0,150 | 0,150 |
| $c(NO)\,/\,(\mathrm{mol{\cdot}L^{-1}})$ | 0,900 | 0,610 | 0,410 | 0,270 | 0,195 | 0,160 | 0,150 | 0,150 | 0,150 |

**Tab. 3 — Kinetik-Vergleich（Modellreaktion $2\,NO + 2\,CO \rightleftharpoons N_2 + 2\,CO_2$, $c_0 = 0{,}900\ \mathrm{mol{\cdot}L^{-1}}$）**

| Versuch | $\vartheta\,/\,^\circ\mathrm{C}$ | Katalysator | $E_A\,/\,(\mathrm{kJ{\cdot}mol^{-1}})$ | $v_{rel}$ | Umsatz nach 10 s |
|---|---|---|---|---|---|
| V1 | 250 | ohne | 98 | 1,0 | < 0,01 % |
| V2 | 250 | Pt/Rh-Wabenkörper | 54 | 2,5·10⁴ | 10 % |
| V3 | 400 | ohne | 98 | 1,5·10² | 0,05 % |
| V4 | 400 | Pt/Rh-Wabenkörper | 54 | 4,0·10⁵ | 82 % |

**Tab. 4 — Gleichgewichtskonstante in Abhängigkeit von der Temperatur**

| $\vartheta\,/\,^\circ\mathrm{C}$ | $K_c\,/\,(\mathrm{L{\cdot}mol^{-1}})$ | Gleichgewichts-Umsatz bei $c_0 = 0{,}900\ \mathrm{mol{\cdot}L^{-1}}$ |
|---|---|---|
| 250 | 2,6·10³ | 89 % |
| 400 | 4,2·10² | 83 % |

### 2.1 Material-Kennzeichnung

| Merkmal | Angabe |
|---|---|
| Textsorte | populärwissenschaftlicher Technikartikel（Sachtext mit Datenanhang） |
| Quellenart（仿） | Technikjournal / Fachzeitschrift für angewandte Chemie（fiktiv，非真实出版物） |
| Kernthese | **Der Dreiwegekatalysator scheitert im Kaltstart nicht thermodynamisch, sondern kinetisch: die Gleichgewichtslage ist bei niedriger Temperatur sogar günstiger, die Reaktionsgeschwindigkeit ist zu klein.** |
| Schlüsselbegriffe | ① *Reaktionsgeschwindigkeit* 反应速率 ② *Aktivierungsenergie* 活化能 ③ *Massenwirkungsgesetz / Gleichgewichtskonstante* 质量作用定律/平衡常数 ④ *Prinzip vom kleinsten Zwang* 最小作用力原理（勒夏特列） ⑤ *Anspringtemperatur* 起燃温度 |

---

### 3. Aufgaben（AFB I + II = 80 BE · AFB III = 20 BE）

**Aufgabe 1 [AFB I] · Operator: beschreiben · 6 BE · 5 min**
> „Beschreiben Sie die Aufgabe des Dreiwegekatalysators. Benennen Sie die drei im Material genannten Schadstoffgruppen und stellen Sie die Reaktionsgleichungen für die Oxidation des Kohlenstoffmonoxids sowie für die gemeinsame Umsetzung von Stickstoffmonoxid und Kohlenstoffmonoxid auf. Verwenden Sie Formelzeichen mit Aggregatzuständen."

中文提示：考「三条主反应」的书写与配平。陷阱：只写 CO 氧化、忘了 NO 还原；漏气态符号 (g)；CO₂ 的 O 原子数配错。

---

**Aufgabe 2 [AFB I] · Operator: darstellen · 8 BE · 8 min**
> „Stellen Sie den zeitlichen Verlauf der CO-Konzentration aus Tab. 2 in einem Diagramm dar. Beschriften Sie beide Achsen mit Größe, Einheit und Skala, zeichnen Sie die Messpunkte und den Kurvenverlauf ein und geben Sie an, ab welchem Zeitpunkt das chemische Gleichgewicht erreicht ist, sowie die zugehörige Gleichgewichtskonzentration."

中文提示：考图表转译 + 从「浓度不再变化」识别平衡点。陷阱：横轴单位写错；把「趋平」的开始时间（10 s）当成平衡时间（12 s）。

---

**Aufgabe 3 [AFB I] · Operator: beschreiben · 8 BE · 8 min**
> „Beschreiben Sie den Begriff der Aktivierungsenergie und der Reaktionsgeschwindigkeit. Geben Sie die Definitionsgleichung der mittleren Reaktionsgeschwindigkeit mit Einheiten an und beschreiben Sie, wie sich die Reaktionsgeschwindigkeit im Verlauf der Messreihe V4 (Tab. 2) ändert."

中文提示：考碰撞理论术语与 $v = \Delta c/\Delta t$。陷阱：漏单位 $\mathrm{mol{\cdot}L^{-1}{\cdot}s^{-1}}$；只说「变慢」不给原因（反应物浓度下降 → 有效碰撞数减少）。

---

**Aufgabe 4 [AFB I] · Operator: zuordnen · 8 BE · 7 min**
> „Ordnen Sie den vier Einflussgrößen Temperaturerhöhung, Konzentrationserhöhung der Edukte, Druckerhöhung (Gasreaktion mit ungleicher Teilchenzahl) und Zugabe eines Katalysators jeweils zu, ob sie **(a)** die Reaktionsgeschwindigkeit erhöhen und **(b)** die Gleichgewichtslage verschieben. Legen Sie dazu eine Tabelle mit den Spalten ‚Einflussgröße · Auswirkung auf $v$ · Auswirkung auf die Gleichgewichtslage ($K_c$)‘ an."

中文提示：考「速率 vs. 平衡」的分类意识，是本卷 AFB I 的核心分水岭。陷阱：把催化剂写成「使平衡右移」；把压强写成「改变 $K_c$」。

---

**Aufgabe 5 [AFB II] · Operator: erklären · 10 BE · 10 min**
> „Erklären Sie die Wirkungsweise des Pt/Rh-Katalysators. Gehen Sie auf die Vorgänge an der Metalloberfläche, auf die Absenkung der Aktivierungsenergie (98 → 54 kJ·mol⁻¹, Tab. 1) und auf die Frage ein, warum die Gleichgewichtslage durch den Katalysator nicht verändert wird. Erklären Sie außerdem, welche Funktion die Wabenstruktur und der Washcoat haben."

中文提示：考多相催化的四步（吸附–表面反应–脱附）+「正逆反应同等加速 → $K_c$ 不变」。陷阱：说「催化剂使平衡右移」；把「降低活化能」说成「提供能量」。

---

**Aufgabe 6 [AFB II] · Operator: anwenden · 12 BE · 12 min**
> „Berechnen Sie für den Versuch V4 (Tab. 2, $\vartheta = 400\ ^\circ\mathrm{C}$, $V = 2{,}0\ \mathrm{L}$):
> a) die mittlere Reaktionsgeschwindigkeit der CO-Umsetzung in den Intervallen $0 - 2\ \mathrm{s}$ und $8 - 10\ \mathrm{s}$,
> b) das Verhältnis der beiden Werte,
> c) die Stoffmenge und die Masse an Kohlenstoffmonoxid, das bis zum Erreichen des Gleichgewichts umgesetzt wird, sowie die Masse des dabei entstandenen Kohlenstoffdioxids."

中文提示：考 $\bar v = \Delta c/\Delta t$ 与 $n = c\cdot V$、$m = n\cdot M$。陷阱：Δc 取错（用 0→12 s 却写 Δt = 2 s）；忘记生成 CO₂ 与消耗 CO 是 1:1（系数 2:2）。

---

**Aufgabe 7 [AFB II] · Operator: anwenden · 14 BE · 14 min**
> „Stellen Sie für die Reaktion $2\,NO(g) + 2\,CO(g) \rightleftharpoons N_2(g) + 2\,CO_2(g)$ den Ausdruck des Massenwirkungsgesetzes auf. Ermitteln Sie aus Tab. 2 die Gleichgewichtskonzentrationen aller vier am Gleichgewicht beteiligten Stoffe und berechnen Sie die Gleichgewichtskonstante $K_c$ bei 400 °C. Überprüfen Sie Ihr Ergebnis, indem Sie die berechneten Werte erneut in den MWG-Ausdruck einsetzen."

中文提示：考 MWG 表达式 + 三段式（起始/变化/平衡）+ 单位。陷阱：$N_2$ 系数 1 → $c(N_2) = \Delta c/2$，不是 $\Delta c$；漏写单位 $\mathrm{L{\cdot}mol^{-1}}$。

---

**Aufgabe 8 [AFB II] · Operator: überprüfen · 14 BE · 13 min**
> „Im Material wird behauptet, der Katalysator arbeite im Kaltstart nicht ‚thermodynamisch schlecht‘. Überprüfen Sie diese Behauptung:
> a) Erklären Sie mit dem Prinzip vom kleinsten Zwang, wie sich eine Druckerhöhung und eine Temperaturerhöhung auf die Gleichgewichtslage der exothermen Reaktion auswirken, und stellen Sie beide Aussagen den Werten der Tab. 4 gegenüber.
> b) Prüfen Sie rechnerisch, ob der in Tab. 4 angegebene Gleichgewichts-Umsatz von 89 % bei 250 °C mit $K_c(250\ ^\circ\mathrm{C}) = 2{,}6\cdot10^3\ \mathrm{L{\cdot}mol^{-1}}$ vereinbar ist.
> c) Entscheiden Sie, ob der geringe Umsatz im Kaltstart thermodynamisch oder kinetisch bedingt ist, und begründen Sie mit zwei Belegen aus dem Material."

中文提示：本卷最值钱的一题——「热力学 vs. 动力学」分离。陷阱：看到「转化率低」就答「平衡左移」；实际上 250 °C 的 $K_c$ 更大（平衡更有利），低转化率纯属速率不足。

---

**Aufgabe 9 [AFB III] · Operator: beurteilen · 12 BE · 14 min**
> „Beurteilen Sie drei Maßnahmen zur Verringerung der Kaltstartemissionen: (1) elektrisch beheizbarer Katalysator, (2) motornaher Vorkatalysator, (3) Betriebsstrategie (Hybridantrieb, Vermeidung von Kurzstrecken). Legen Sie mindestens drei Bewertungskriterien fest und begründen Sie ein Gesamturteil mit Rangfolge."

中文提示：考多维评判（有效性 / 能耗与 CO₂ 平衡 / 成本与日常可行性）。陷阱：只写「有效」不写代价；没有给出可比较的 Kriterien 就被扣分。

---

**Aufgabe 10 [AFB III] · Operator: Stellung nehmen · 8 BE · 9 min**
> „Nehmen Sie begründet Stellung zu der These: ‚Der Dreiwegekatalysator hat das Abgasproblem gelöst.‘"

中文提示：考「技术有效性 vs. 系统性问题」的区分。陷阱：全盘否定或全盘肯定；漏掉 CO₂（催化器把毒物变成温室气体）这一关键反例。

---

### 4. Erwartungshorizont (EHZ) — 80:20 采分点标准

| Aufgabe | AFB | BE | Erwartete Leistung（德语踩分点） | Typischer Fehler |
|---|---|---|---|---|
| **A1** | I | 6 | ✓ drei Schadstoffgruppen benannt: CO, Kohlenwasserstoffe $C_xH_y$, Stickstoffmonoxid NO（1 BE）<br>✓ Aufgabe des Dreiwegekatalysators beschrieben: gleichzeitige Oxidation von CO/$C_xH_y$ **und** Reduktion von NO zu $N_2$, nur im Fenster um $\lambda = 1$（1 BE）<br>✓ $2\,CO(g) + O_2(g) \rightleftharpoons 2\,CO_2(g)$ stöchiometrisch richtig mit Aggregatzuständen（2 BE）<br>✓ $2\,NO(g) + 2\,CO(g) \rightleftharpoons N_2(g) + 2\,CO_2(g)$（2 BE） | 只写氧化、漏 NO 还原；O 原子未配平；缺 (g) |
| **A2** | I | 8 | ✓ beide Achsen mit Größe + Einheit + Skala beschriftet: $t$ in s, $c(CO)$ in mol·L⁻¹（2 BE）<br>✓ mindestens sechs Messpunkte aus Tab. 2 korrekt eingetragen（2 BE）<br>✓ monoton fallende Kurve mit Plateau ab $t = 12\ \mathrm{s}$ gezeichnet（2 BE）<br>✓ Gleichgewichtseinstellung: $t_{GG} = 12\ \mathrm{s}$（1 BE）<br>✓ $c_{GG}(CO) = 0{,}150\ \mathrm{mol{\cdot}L^{-1}}$（1 BE） | 把 10 s（接近但未到）当平衡点；纵轴从 0,900 起却画成上升曲线 |
| **A3** | I | 8 | ✓ Aktivierungsenergie als Mindestenergie definiert, die ein Stoß übersteigen muss（2 BE）<br>✓ wirksamer Stoß = ausreichende Energie **und** günstige räumliche Orientierung（2 BE）<br>✓ Definitionsgleichung $\bar v = \dfrac{\Delta c}{\Delta t}$, Einheit $\mathrm{mol{\cdot}L^{-1}{\cdot}s^{-1}}$（2 BE）<br>✓ Verlauf V4: $\bar v$ nimmt ab, weil $c(NO)$ und $c(CO)$ sinken und damit die Zahl wirksamer Stöße pro Zeit abnimmt（2 BE） | 单位漏写或写成 mol/s；只描述趋势不给碰撞理论解释 |
| **A4** | I | 8 | ✓ Temperatur ↑: $v$ ↑ **und** Gleichgewicht wird verschoben, $K_c$ ändert sich（2 BE）<br>✓ Konzentration der Edukte ↑: $v$ ↑ **und** Gleichgewicht wird verschoben, $K_c$ bleibt（2 BE）<br>✓ Druck ↑ ($\Delta\nu = -1$): $v$ ↑ **und** Gleichgewicht weicht auf die Seite mit weniger Gas-Teilchen aus, $K_c$ bleibt（2 BE）<br>✓ Katalysator: $v$ ↑ ($E_A \downarrow$), Gleichgewichtslage **unverändert**, $K_c$ unverändert, nur Einstellzeit ↓（2 BE） | 催化剂「使平衡右移」；认为压强改变 $K_c$ |
| **A5** | II | 10 | ✓ heterogene Katalyse: Adsorption von NO und CO an aktiven Zentren der Edelmetall-Oberfläche（2 BE）<br>✓ Bindungsschwächung / alternativer Reaktionsweg, $E_A$ sinkt von 98 auf 54 kJ·mol⁻¹（2 BE）<br>✓ Folge: größerer Anteil der Teilchen mit $E \geq E_A$ → mehr wirksame Stöße pro Zeit → $v$ ↑（2 BE）<br>✓ Hin- **und** Rückreaktion werden im gleichen Maß beschleunigt, daher $k_{hin}/k_{rück} = K_c$ unverändert; nur die Einstellungszeit verkürzt sich（2 BE）<br>✓ Wabenstruktur + Washcoat vergrößern die wirksame Oberfläche → mehr aktive Zentren, gleichzeitig geringer Abgasgegendruck（2 BE） | 「催化剂提供能量」；只讲加速正反应、忽略逆反应同等加速 |
| **A6** | II | 12 | ✓ $\Delta c(CO) = 0{,}900 - 0{,}610 = 0{,}290\ \mathrm{mol{\cdot}L^{-1}}$; $\bar v_1 = 0{,}290/2 = 0{,}145\ \mathrm{mol{\cdot}L^{-1}{\cdot}s^{-1}}$（3 BE）<br>✓ $\Delta c(CO) = 0{,}195 - 0{,}160 = 0{,}035\ \mathrm{mol{\cdot}L^{-1}}$; $\bar v_2 = 0{,}0175\ \mathrm{mol{\cdot}L^{-1}{\cdot}s^{-1}}$（3 BE）<br>✓ Verhältnis $\bar v_1 : \bar v_2 = 8{,}3$（2 BE）<br>✓ $\Delta c = 0{,}750\ \mathrm{mol{\cdot}L^{-1}} \Rightarrow \Delta n(CO) = 0{,}750 \cdot 2{,}0 = 1{,}50\ \mathrm{mol} \Rightarrow m(CO) = 42{,}0\ \mathrm{g}$（2 BE）<br>✓ $n(CO_2) = n(CO)_{umsatz} = 1{,}50\ \mathrm{mol} \Rightarrow m(CO_2) = 66{,}0\ \mathrm{g}$（2 BE） | Δc 与 Δt 不配对；把 $n(CO_2)$ 算成 0,75 mol（误用系数 2:2 当 2:1） |
| **A7** | II | 14 | ✓ MWG-Ausdruck $K_c = \dfrac{c(N_2)\cdot c(CO_2)^2}{c(NO)^2 \cdot c(CO)^2}$（2 BE）<br>✓ $c_{GG}(CO) = c_{GG}(NO) = 0{,}150\ \mathrm{mol{\cdot}L^{-1}}$（2 BE）<br>✓ $c_{GG}(CO_2) = \Delta c = 0{,}750\ \mathrm{mol{\cdot}L^{-1}}$（2 BE）<br>✓ $c_{GG}(N_2) = \Delta c/2 = 0{,}375\ \mathrm{mol{\cdot}L^{-1}}$（2 BE）<br>✓ Einsetzen mit Zwischenwerten: Zähler $0{,}375 \cdot 0{,}5625 = 0{,}2109$; Nenner $0{,}0225 \cdot 0{,}0225 = 5{,}06\cdot10^{-4}$（3 BE）<br>✓ $K_c = 4{,}17\cdot10^2 \approx 4{,}2\cdot10^2\ \mathrm{L{\cdot}mol^{-1}}$（2 BE）<br>✓ Antwortsatz: „Das Gleichgewicht liegt bei 400 °C weit auf der Produktseite; der Wert stimmt mit Tab. 4 überein.“（1 BE） | $c(N_2)$ 未除以 2；指数写成 1；单位写成 mol·L⁻¹ |
| **A8** | II | 14 | ✓ Druck: $\Delta\nu = 3 - 4 = -1$; Druckerhöhung → System weicht zur Seite mit weniger Gas-Teilchen (rechts) aus; $K_c$ bleibt konstant（3 BE）<br>✓ Temperatur: Reaktion exotherm ($\Delta H < 0$); Temperaturerhöhung begünstigt die endotherme Rückreaktion → Verschiebung nach links; Beleg Tab. 4: $K_c$ fällt von 2,6·10³ auf 4,2·10² L·mol⁻¹（4 BE）<br>✓ Probe 250 °C: $\Delta c = 0{,}89 \cdot 0{,}900 \approx 0{,}80\ \mathrm{mol{\cdot}L^{-1}}$, also $c(CO_2) = 0{,}80$, $c(N_2) = 0{,}40$, $c(NO) = c(CO) = 0{,}10\ \mathrm{mol{\cdot}L^{-1}}$ → $Q = 2{,}56\cdot10^3 \approx K_c(250\ ^\circ C) = 2{,}6\cdot10^3\ \mathrm{L{\cdot}mol^{-1}}$（4 BE）<br>✓ Entscheidung: **kinetisch** bedingt — (i) $K_c(250\ ^\circ C) > K_c(400\ ^\circ C)$, das Gleichgewicht ist also bei niedriger Temperatur sogar günstiger; (ii) unterhalb der Anspringtemperatur von 280 °C ist $v$ zu klein (Tab. 3: nur 10 % Umsatz in 10 s)（3 BE） | 把冷启动低转化率归为「平衡不利」；把「$K_c$ 随 T 升高而增大」 |
| **A9** | III | 12 | ✓ mindestens drei Kriterien benannt und operationalisiert: Wirksamkeit (Schadstoffminderung in den ersten 60–120 s), Energie- und $CO_2$-Bilanz, Kosten und Alltagstauglichkeit/Robustheit（2 BE）<br>✓ Maßnahme 1 (E-Kat): sehr wirksam, Anspringzeit stark verkürzt, aber zusätzlicher Strombedarf → Mehrverbrauch und höhere Kosten（3 BE）<br>✓ Maßnahme 2 (Vorkat): nutzt Abgaswärme, klein und schnell heiß, aber thermische Alterung und begrenzte Speicher-/Wirkfläche（3 BE）<br>✓ Maßnahme 3 (Betriebsstrategie): ohne Zusatztechnik wirksam, aber vom Nutzerverhalten abhängig und rechtlich nicht erzwingbar（2 BE）<br>✓ begründetes Gesamturteil mit Rangfolge und Benennung des Zielkonflikts (Schadstoffminderung gegen Mehrverbrauch)（2 BE） | 只列优点不列代价；Kriterien 未定义就下结论；没有 Rangfolge |
| **A10** | III | 8 | ✓ These eingeordnet: zutreffend für den warmen, geregelten Betrieb (CO, $C_xH_y$, NO deutlich gemindert), unzutreffend als pauschale Aussage（2 BE）<br>✓ Gegenargument 1: der Katalysator oxidiert kohlenstoffhaltige Schadstoffe zu $CO_2$ — das Klimaproblem bleibt bestehen（2 BE）<br>✓ Gegenargument 2: Kaltstart und Kurzstrecke; im Realbetrieb entsteht ein Großteil der Emissionen vor Erreichen der Betriebstemperatur（2 BE）<br>✓ begründetes Urteil: wirksames, aber ergänzendes Werkzeug; Ressourcenbedarf (Pt/Pd/Rh) und Rohstoffbilanz begrenzen den Beitrag → Antriebs- und Verkehrswende zusätzlich nötig（2 BE） | 全盘肯定/否定；漏掉 CO₂ 反例；只复述材料不表态 |

**Σ AFB I: 30 BE + AFB II: 50 BE = 80 BE (80 %) · AFB III: 20 BE (20 %) · Gesamt 100 BE**

---

### 5. Notenstufen-Umrechnung（15 分制换算表）

| Erreichte BE | % | Notenpunkte | Note |
|---|---|---|---|
| 100 – 95 | 100 – 95 | 15 | 1+ |
| 94 – 90 | 94 – 90 | 14 | 1 |
| 89 – 85 | 89 – 85 | 13 | 1- |
| 84 – 80 | 84 – 80 | 12 | 2+ |
| 79 – 75 | 79 – 75 | 11 | 2 |
| 74 – 70 | 74 – 70 | 10 | 2- |
| 69 – 65 | 69 – 65 | 9 | 3+ |
| 64 – 60 | 64 – 60 | 8 | 3 |
| 59 – 55 | 59 – 55 | 7 | 3- |
| 54 – 50 | 54 – 50 | 6 | 4+ |
| 49 – 45 | 49 – 45 | 5 | 4 |
| 44 – 40 | 44 – 40 | 4 | 4- |
| 39 – 34 | 39 – 34 | 3 | 5+ |
| 33 – 27 | 33 – 27 | 2 | 5 |
| 26 – 20 | 26 – 20 | 1 | 5- |
| ≤ 19 | ≤ 19 | 0 | 6 |

Notenpunkte → Note：15–13 = 1+ / 1 / 1- · 12–10 = 2+ / 2 / 2- · 9–7 = 3+ / 3 / 3- · 6–4 = 4+ / 4 / 4- · 3–1 = 5+ / 5 / 5- · 0 = 6. （Da 100 BE = 100 %，BE-Spalte und %-Spalte identisch.）

⏳ 待确认：Prozent-Punkte-Raster 各校略有差异，以本班 Lehrkraft 下发的 Notenstufen 为准。

---

### 6. Musterlösung（标准答案要点）

#### A1 — beschreiben（6 BE）

- 三种有害物质：**Kohlenstoffmonoxid (CO)**、**unverbrannte Kohlenwasserstoffe ($C_xH_y$)**、**Stickstoffmonoxid (NO)**。
- 功能描述（可直接写进答卷）：
  > „Der Dreiwegekatalysator überführt drei Schadstoffgruppen gleichzeitig: Er oxidiert CO und Kohlenwasserstoffe zu $CO_2$ und $H_2O$ und reduziert gleichzeitig NO zu $N_2$; das gelingt nur in einem engen Fenster um $\lambda = 1$."
- 反应式（LaTeX，务必带聚集态）：

$$2\,CO(g) + O_2(g) \rightleftharpoons 2\,CO_2(g)$$

$$2\,NO(g) + 2\,CO(g) \rightleftharpoons N_2(g) + 2\,CO_2(g)$$

- 补充（可作附加分语境）：Kohlenwasserstoffe，z. B. $2\,C_8H_{18}(g) + 25\,O_2(g) \rightarrow 16\,CO_2(g) + 18\,H_2O(g)$（C: 16 = 16，H: 36 = 36，O: 50 = 32 + 18 ✓ 配平自检）。

#### A2 — darstellen（8 BE）

- 横轴 $t$ in s（0–16），纵轴 $c(CO)$ in mol·L⁻¹（0–0,900）。
- Messpunkte：(0 | 0,900)、(2 | 0,610)、(4 | 0,410)、(6 | 0,270)、(8 | 0,195)、(10 | 0,160)、(12 | 0,150)、(14 | 0,150)、(16 | 0,150)。
- 曲线形态：**steil fallend → 逐步趋平 → 水平 Plateau**（先快后慢，典型的「反应物消耗 → 速率下降」）。
- Antwortsatz：
  > „Ab $t = 12\ \mathrm{s}$ bleibt $c(CO)$ konstant bei $0{,}150\ \mathrm{mol{\cdot}L^{-1}}$; das chemische Gleichgewicht ist damit erreicht — Hin- und Rückreaktion laufen gleich schnell."
- Plausibilitätskontrolle：$t = 10\ \mathrm{s}$ 时 0,160 ≠ 0,150，尚在动；12/14/16 s 三点同值 → 平衡判据成立 ✓。

#### A3 — beschreiben（8 BE）

> „Die **Aktivierungsenergie** ist die Mindestenergie, die ein Zusammenstoß zweier Teilchen überschreiten muss, damit aus dem Stoß eine Reaktion wird (**wirksamer Stoß**: ausreichende Energie *und* günstige Orientierung)."

$$\bar v = \frac{\Delta c}{\Delta t} \qquad [\bar v] = \mathrm{mol{\cdot}L^{-1}{\cdot}s^{-1}}$$

> „Im Verlauf von V4 nimmt die mittlere Reaktionsgeschwindigkeit ab: Die Konzentrationen der Edukte sinken, die Zahl der Stöße und damit der **wirksamen** Stöße pro Zeit nimmt ab."

#### A4 — zuordnen（8 BE）

| Einflussgröße | Auswirkung auf $v$ | Auswirkung auf die Gleichgewichtslage ($K_c$) |
|---|---|---|
| Temperatur ↑ | ↑（mehr Teilchen mit $E \geq E_A$） | 平衡移动，**$K_c$ 改变**（放热反应升温 → 左移，$K_c$ ↓） |
| Konzentration der Edukte ↑ | ↑（höhere Stoßzahl） | 平衡右移，**$K_c$ 不变**（只有 T 改变 $K_c$） |
| Druck ↑ / Volumen ↓ | ↑（Teilchendichte ↑） | 向气体粒子数较少的一侧移动（此处右移，$\Delta\nu = -1$）；**$K_c$ 不变** |
| Katalysator | ↑（$E_A \downarrow$ → mehr wirksame Stöße） | **平衡位置与 $K_c$ 均不变**，nur die Einstellungszeit verkürzt sich |

#### A5 — erklären（10 BE）

> „Beim Pt/Rh-Katalysator handelt es sich um **heterogene Katalyse**: Die Reaktanden werden an aktiven Zentren der Metalloberfläche **adsorbiert**, wodurch ihre Bindungen geschwächt werden. Es wird ein alternativer Reaktionsweg mit niedrigerer **Aktivierungsenergie** eröffnet ($E_A$ sinkt von 98 auf 54 kJ·mol⁻¹). Dadurch ist ein deutlich größerer Anteil der Teilchen in der Lage, die Aktivierungsenergie zu übersteigen; die Zahl der wirksamen Stöße pro Zeit und damit die **Reaktionsgeschwindigkeit** steigen."

> „Der Katalysator beschleunigt Hin- und Rückreaktion im gleichen Maß. Da nach dem **Massenwirkungsgesetz** $K_c = k_{hin}/k_{rück}$ gilt, bleibt die **Gleichgewichtskonstante** und damit die Gleichgewichtslage unverändert; verkürzt wird nur die Zeit bis zur Gleichgewichtseinstellung."

> „Die Wabenstruktur und der poröse Washcoat vergrößern die wirksame Oberfläche um ein Vielfaches. So stehen mehr aktive Zentren zur Verfügung, während der Abgasgegendruck klein bleibt."

#### A6 — anwenden（12 BE，完整 Rechengang）

**a) mittlere Reaktionsgeschwindigkeit**

$$\Delta c_1(CO) = 0{,}900\ \mathrm{mol\,L^{-1}} - 0{,}610\ \mathrm{mol\,L^{-1}} = 0{,}290\ \mathrm{mol\,L^{-1}}$$

$$\bar v_1 = \frac{\Delta c_1}{\Delta t} = \frac{0{,}290\ \mathrm{mol\,L^{-1}}}{2\ \mathrm{s}} = 0{,}145\ \mathrm{mol{\cdot}L^{-1}{\cdot}s^{-1}}$$

$$\Delta c_2(CO) = 0{,}195 - 0{,}160 = 0{,}035\ \mathrm{mol\,L^{-1}} \quad\Rightarrow\quad \bar v_2 = \frac{0{,}035}{2} = 0{,}0175\ \mathrm{mol{\cdot}L^{-1}{\cdot}s^{-1}}$$

> Antwortsatz: „Die mittlere Reaktionsgeschwindigkeit beträgt im Intervall 0–2 s 0,145 mol·L⁻¹·s⁻¹ und im Intervall 8–10 s 0,0175 mol·L⁻¹·s⁻¹; sie fällt also auf etwa ein Achtel."

**b) Verhältnis**

$$\frac{\bar v_1}{\bar v_2} = \frac{0{,}145}{0{,}0175} = 8{,}29 \approx 8{,}3$$

**c) Stoffmenge und Masse（bis Gleichgewicht, $t = 12\ \mathrm{s}$）**

$$\Delta c(CO) = c_0 - c_{GG} = 0{,}900 - 0{,}150 = 0{,}750\ \mathrm{mol{\cdot}L^{-1}}$$

$$\Delta n(CO) = \Delta c \cdot V = 0{,}750\ \mathrm{mol{\cdot}L^{-1}} \cdot 2{,}0\ \mathrm{L} = 1{,}50\ \mathrm{mol}$$

$$m(CO) = n \cdot M = 1{,}50\ \mathrm{mol} \cdot 28{,}01\ \mathrm{g\,mol^{-1}} = 42{,}0\ \mathrm{g}$$

Stoffmengenverhältnis aus der Gleichung $2\,CO \rightarrow 2\,CO_2$（系数比 $2:2$，即 $1:1$）：

$$n(CO_2) = 1{,}50\ \mathrm{mol} \quad\Rightarrow\quad m(CO_2) = 1{,}50\ \mathrm{mol} \cdot 44{,}01\ \mathrm{g\,mol^{-1}} = 66{,}0\ \mathrm{g}$$

> Antwortsatz: „Bis zum Erreichen des Gleichgewichts werden 1,50 mol bzw. 42,0 g CO umgesetzt; dabei entstehen 1,50 mol bzw. 66,0 g $CO_2$."

**Plausibilitätskontrolle**：
- $66{,}0/42{,}0 = 1{,}571$ 与 $M(CO_2)/M(CO) = 44{,}01/28{,}01 = 1{,}571$ 一致 ✓（1:1 换算正确）。
- Umsatz $= 0{,}750/0{,}900 = 83{,}3\ \%$，与 Tab. 4 的 83 % 相符 ✓。
- $42{,}0\ \mathrm{g}$ CO 在 2,0 L 反应器内属合理量级（$0{,}750\ \mathrm{mol/L}$ 属高浓度 Modellwert，非真实尾气）✓。

#### A7 — anwenden（14 BE，完整 Rechengang）

**Massenwirkungsgesetz**

$$K_c = \frac{c(N_2)\cdot c(CO_2)^2}{c(NO)^2 \cdot c(CO)^2}$$

**Dreisatz-Tabelle（起始 / 变化 / 平衡，单位 mol·L⁻¹）**

| | $2\,NO$ | $+\ 2\,CO$ | $\rightleftharpoons\ N_2$ | $+\ 2\,CO_2$ |
|---|---|---|---|---|
| $c_0$ | 0,900 | 0,900 | 0 | 0 |
| $\Delta c$ | −0,750 | −0,750 | +0,375 | +0,750 |
| $c_{GG}$ | **0,150** | **0,150** | **0,375** | **0,750** |

（$\Delta c = 0{,}900 - 0{,}150 = 0{,}750$；因系数 $2:2:1:2$，故 $\Delta c(N_2) = \Delta c/2 = 0{,}375$，$\Delta c(CO_2) = \Delta c = 0{,}750$。）

**Einsetzen**

$$K_c = \frac{0{,}375 \cdot (0{,}750)^2}{(0{,}150)^2 \cdot (0{,}150)^2} = \frac{0{,}375 \cdot 0{,}5625}{0{,}0225 \cdot 0{,}0225} = \frac{0{,}2109}{5{,}06\cdot10^{-4}} = 4{,}17\cdot10^{2}$$

$$K_c \approx 4{,}2\cdot10^{2}\ \mathrm{L{\cdot}mol^{-1}}$$

**Einheit**：$\dfrac{(\mathrm{mol\,L^{-1}})^3}{(\mathrm{mol\,L^{-1}})^4} = \mathrm{L{\cdot}mol^{-1}}$（$\Delta\nu = 3 - 4 = -1$）。

> Antwortsatz: „Die Gleichgewichtskonstante der Reaktion beträgt bei 400 °C $K_c = 4{,}2\cdot10^2\ \mathrm{L{\cdot}mol^{-1}}$; da $K_c \gg 1$, liegt das Gleichgewicht weit auf der Seite der Produkte."

**Plausibilitätskontrolle（Probe）**
- 回代：$0{,}2109 / 5{,}0625\cdot10^{-4} = 416{,}7$ ✓。
- 与 Tab. 4 的 $4{,}2\cdot10^2\ \mathrm{L{\cdot}mol^{-1}}$ 完全一致 ✓。
- $K_c \gg 1 \Leftrightarrow$ Umsatz 83 %，自洽 ✓。

#### A8 — überprüfen（14 BE）

**a) Prinzip vom kleinsten Zwang**

> „Nach dem **Prinzip vom kleinsten Zwang** weicht das System jedem Zwang so aus, dass dessen Wirkung verringert wird."

- **Druckerhöhung**: $\Delta\nu = n_{Produkte} - n_{Edukte} = (1+2) - (2+2) = 3 - 4 = -1$. Das Gleichgewicht weicht auf die Seite mit der kleineren Gas-Teilchenzahl aus, also **nach rechts**; $K_c$ bleibt dabei konstant.
- **Temperaturerhöhung**: Die Reaktion ist exotherm ($\Delta H < 0$). Eine Temperaturerhöhung begünstigt die **endotherme Rückreaktion**, das Gleichgewicht verschiebt sich **nach links**, $K_c$ nimmt ab. Beleg aus Tab. 4: $K_c$ fällt von $2{,}6\cdot10^3$ (250 °C) auf $4{,}2\cdot10^2\ \mathrm{L{\cdot}mol^{-1}}$ (400 °C) ✓.

**b) Probe zum Gleichgewichts-Umsatz bei 250 °C**

$$U = 89\ \% \Rightarrow \Delta c = 0{,}89 \cdot 0{,}900\ \mathrm{mol\,L^{-1}} = 0{,}801 \approx 0{,}80\ \mathrm{mol{\cdot}L^{-1}}$$

$$c(CO) = c(NO) = 0{,}900 - 0{,}80 = 0{,}10\ \mathrm{mol{\cdot}L^{-1}};\quad c(CO_2) = 0{,}80\ \mathrm{mol{\cdot}L^{-1}};\quad c(N_2) = 0{,}40\ \mathrm{mol{\cdot}L^{-1}}$$

$$Q = \frac{0{,}40 \cdot (0{,}80)^2}{(0{,}10)^2 \cdot (0{,}10)^2} = \frac{0{,}40 \cdot 0{,}64}{1{,}0\cdot10^{-4}} = \frac{0{,}256}{1{,}0\cdot10^{-4}} = 2{,}56\cdot10^{3}\ \mathrm{L{\cdot}mol^{-1}}$$

$$Q \approx K_c(250\ ^\circ\mathrm{C}) = 2{,}6\cdot10^3\ \mathrm{L{\cdot}mol^{-1}} \quad\checkmark$$

**c) Entscheidung**

> „Der geringe Umsatz im Kaltstart ist **kinetisch** und nicht thermodynamisch bedingt. Erstens ist $K_c$ bei 250 °C mit $2{,}6\cdot10^3\ \mathrm{L{\cdot}mol^{-1}}$ größer als bei 400 °C ($4{,}2\cdot10^2$), die Gleichgewichtslage ist also bei niedriger Temperatur sogar günstiger. Zweitens liegt die Temperatur unterhalb der Anspringtemperatur von 280 °C; nach Tab. 3 werden bei 250 °C in 10 s nur 10 % des CO umgesetzt, weil der Anteil der Teilchen mit $E \geq E_A$ zu klein ist. Ein Katalysator senkt zwar $E_A$, kann aber eine zu niedrige Temperatur nicht ersetzen."

#### A9 — beurteilen（12 BE）

**Kriterien**（先定义再评判）
1. **Wirksamkeit** — Schadstoffminderung in den ersten 60–120 s (Kaltstartphase)。
2. **Energie- und $CO_2$-Bilanz** — zusätzlicher Kraftstoff- bzw. Strombedarf。
3. **Kosten und Alltagstauglichkeit** — Zusatzkosten, Robustheit, Abhängigkeit vom Nutzerverhalten。

**Maßnahme 1 — elektrisch beheizbarer Katalysator**
> „Der E-Kat verkürzt die Anspringzeit auf wenige Sekunden und ist damit die wirksamste Maßnahme (Kriterium 1: hoch). Dem steht ein erheblicher Energiebedarf gegenüber, der aus dem Bordnetz und damit mittelbar aus Kraftstoff stammt (Kriterium 2: ungünstig); zudem sind die Kosten hoch (Kriterium 3: mittel)."

**Maßnahme 2 — motornaher Vorkatalysator**
> „Der Vorkat nutzt die Abgaswärme, wird in wenigen Sekunden heiß und braucht keine Fremdenergie (Kriterium 2: günstig). Er altert jedoch durch die hohen Temperaturen schneller und seine kleine wirksame Fläche begrenzt die Wirkung (Kriterium 1: mittel, Kriterium 3: nur in Kombination mit dem Hauptkatalysator sinnvoll)."

**Maßnahme 3 — Betriebsstrategie (Hybrid, Kurzstrecken vermeiden)**
> „Werden die ersten Kilometer elektrisch gefahren, fallen die Kaltstartemissionen praktisch weg (Kriterium 1: hoch, Kriterium 2: günstig). Die Maßnahme hängt aber vollständig vom Nutzerverhalten ab und ist nicht erzwingbar (Kriterium 3: unsicher)."

> **Gesamturteil**: „Ich bewerte die Kombination aus Vorkat und Hybridbetrieb als die günstigste Lösung, weil sie die Kaltstartphase ohne zusätzlichen Energiebedarf verkürzt; der elektrisch beheizbare Katalysator ist zwar am wirksamsten, aber nur dort gerechtfertigt, wo häufige Kaltstarts zu erwarten sind. Der Zielkonflikt zwischen Schadstoffminderung und Mehrverbrauch bleibt bestehen."

#### A10 — Stellung nehmen（8 BE）

> „Der These stimme ich **eingeschränkt** zu. Richtig ist: Im warmen, geregelten Betrieb senkt der Dreiwegekatalysator die Emissionen an CO, Kohlenwasserstoffen und NO erheblich — das ist eine beachtliche Leistung der angewandten Kinetik."

> „Unzutreffend ist die These in drei Punkten. Erstens **wandelt** der Katalysator die giftigen Schadstoffe lediglich **um**: Aus CO und Kohlenwasserstoffen wird $CO_2$, also genau das Gas, das für die Erwärmung der Atmosphäre verantwortlich ist; das Klimaproblem wird durch den Katalysator nicht gemindert. Zweitens entsteht ein erheblicher Teil der Emissionen im Kaltstart und auf Kurzstrecken, also gerade dort, wo die Reaktionsgeschwindigkeit noch zu klein ist. Drittens erfordert der Katalysator die kritischen Rohstoffe Platin, Palladium und Rhodium, deren Gewinnung energieintensiv ist."

> **Begründetes Urteil**: „Ich bewerte den Dreiwegekatalysator als sehr wirksames, aber ergänzendes Werkzeug: Er löst das Toxizitätsproblem des Abgases, aber weder das $CO_2$-Problem noch das Problem der Rohstoffbilanz. Eine nachhaltige Lösung erfordert zusätzlich die Vermeidung von Verkehr und den Wechsel der Antriebsart."

---

### 7. Zeit- und Punktstrategie（中文应试策略）

| Aufgabe | AFB | BE | Minuten | 建议启动时刻（累计） |
|---|---|---|---|---|
| Material lesen + markieren | — | — | 10 | 00:00 |
| A1 beschreiben | I | 6 | 5 | 00:10 |
| A2 darstellen | I | 8 | 8 | 00:15 |
| A3 beschreiben | I | 8 | 8 | 00:23 |
| A4 zuordnen | I | 8 | 7 | 00:31 |
| A5 erklären | II | 10 | 10 | 00:38 |
| A6 anwenden（计算） | II | 12 | 12 | 00:48 |
| A7 anwenden（MWG） | II | 14 | 14 | 01:00 |
| A8 überprüfen | II | 14 | 13 | 01:14 |
| A9 beurteilen | III | 12 | 14 | 01:27 |
| A10 Stellung nehmen | III | 8 | 9 | 01:41 |
| Schlusskontrolle（单位/配平/Probe） | — | — | 10 | 01:50 |

**「保 80 分」三条（AFB I + II 可复制套路）**
1. **先写公式再代数**：A6/A7 一律按「Δc → Δc/Δt 或 n = c·V → m = n·M」三步走，每步带单位；单位写对就先拿 1/3 的分，即使最后数字算错。
2. **三段式表格必画**：MWG 题（A7/A8b）先画「起始 / Δc / 平衡」三行表，按系数比填 Δc（$2:2:1:2$ → $N_2$ 必须除以 2），这一步做对，代入只是算术。
3. **A4 的四行表格当模板背**：温度↑→$v$↑且平衡移动且 $K_c$ 变；浓度/压强↑→$v$↑且平衡移动但 $K_c$ 不变；催化剂→只加速、$K_c$ 与平衡位置均不变。这张表同时覆盖 A5 与 A8 的核心句。

**「抢 20 分」三条（AFB III：These → Begründung → Gegenargument → Abwägung → begründetes Urteil）**
1. **先定 Kriterien 再评判**（A9）：没有可比较的标准就下结论，是 AFB III 最大的失分口；三行「Wirksamkeit / Energie- und $CO_2$-Bilanz / Kosten und Alltagstauglichkeit」直接套。
2. **表态句必须有「eingeschränkt / teilweise」**：A10 用 „Ich stimme der These **eingeschränkt** zu“ 起手，立刻显示你能区分「技术有效」与「系统性问题」。
3. **每个 Gegenargument 配一个数据或材料依据**：如 „$K_c$ fällt von 2,6·10³ auf 4,2·10² L·mol⁻¹“、„10 % Umsatz in 10 s bei 250 °C“——带数据的论证比空泛评价高一档。

**高频失分点三条**
1. **把催化剂当成平衡移动因素**：唯一正确的表述是 „Der Katalysator beschleunigt Hin- und Rückreaktion im gleichen Maß; $K_c$ und die Gleichgewichtslage bleiben unverändert, nur die Einstellungszeit verkürzt sich.“
2. **把「冷启动转化率低」说成热力学问题**：本卷的核心陷阱。判据只有一句——$K_c(250\ ^\circ C) > K_c(400\ ^\circ C)$，故平衡更有利，低转化率是 $v$ 太小。
3. **$N_2$ 的系数 1 被忽略**：$2\,NO + 2\,CO \rightleftharpoons N_2 + 2\,CO_2$ 中 $\Delta c(N_2) = \Delta c/2$；同时 $K_c$ 的指数必须写成 $c(N_2)^1 \cdot c(CO_2)^2 / (c(NO)^2 \cdot c(CO)^2)$，并给出单位 $\mathrm{L{\cdot}mol^{-1}}$。

---

### 8. Glossar-Zeilen（待合并）

| Deutsch | Chinesisch | Fach | Beispielsatz |
|---|---|---|---|
| das Prinzip vom kleinsten Zwang | 最小作用力原理（勒夏特列原理） | Chemie | Nach dem Prinzip vom kleinsten Zwang weicht ein exothermes Gleichgewicht einer Temperaturerhöhung nach links aus. |
| der wirksame Stoß | 有效碰撞 | Chemie | Nur ein wirksamer Stoß mit ausreichender Energie und günstiger Orientierung führt zur Reaktion. |
| die heterogene Katalyse | 多相催化 | Chemie | Bei der heterogenen Katalyse laufen Adsorption, Oberflächenreaktion und Desorption an der Metalloberfläche ab. |
| die Anspringtemperatur | 起燃温度（起活温度） | Chemie | Unterhalb der Anspringtemperatur von 280 °C ist der Umsatz des Katalysators gering. |
| die Adsorption | 吸附 | Chemie | Bei der Adsorption bindet das Reaktandmolekül an ein aktives Zentrum der Oberfläche. |
| der Washcoat | 载体涂层 | Chemie | Der Washcoat aus Aluminiumoxid vergrößert die wirksame Oberfläche des Wabenkörpers. |
