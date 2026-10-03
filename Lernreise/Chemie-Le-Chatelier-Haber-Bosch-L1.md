---
fach: Chemie
thema: "Das Prinzip von Le Chatelier am Haber-Bosch-Verfahren"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Chemie, Chemisches-Gleichgewicht, Le-Chatelier, Haber-Bosch, Thermodynamik]
version: Lesson-v3
---

# Lernreise: Das Prinzip von Le Chatelier am Haber-Bosch-Verfahren (L1, Ziel Klausur)

<!-- Campaign: Kinetik-und-Gleichgewicht | Episode 5/10 | Krise: Brot aus der Luft vs. Dynamit fuer den Krieg | Zielgroessen: Massenwirkungsgesetz, Prinzip vom kleinsten Zwang, Druckeinfluss, Katalysator | Tool: balance-board -->

## Schritt 1 — entdecken: Die Rettung vor dem weltweiten Hungertod
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能深刻理解勒夏特列原理（Prinzip von Le Chatelier / Prinzip vom kleinsten Zwang）的微观热力学本质——系统永远反抗外界施加的“暴力”。
2. 中文：能结合哈伯-博施法（Haber-Bosch-Verfahren: $N_2 + 3 H_2 \rightleftharpoons 2 NH_3, \Delta H = -92\text{ kJ/mol}$）精确推导温度、压强、反应物浓度及催化剂对化学平衡与反应速率的双重冲突影响。
3. 中文：能在化学工艺分析大题（AFB I/II/III）中科学论证为何工业生产必须在动力学（Kinetik）与热力学平衡（Gleichgewicht）之间选取“妥协参数”（Kompromissbedingungen: 450 °C, 200 bar, Eisenkatalysator）。

### Hook / Phaenomen

1898 年，英国皇家学会会长威廉·克鲁克斯爵士向全人类发出了可怕的末日预言：由于全球天然鸟粪硝石矿（智利硝石）即将开采殆尽，缺乏氮肥的土壤将在 1930 年之前引发席卷全球的特大饥荒，数十亿人将活活饿死！空气中明明 78% 都是氮气，人类却像漂浮在海水中的渴死者一样束手无策——因为氮气分子里的氮氮三键（$N \equiv N$）是自然界中最牢固的化学键之一，需要数千度的高温才能拆开。德国化学家弗里茨·哈伯（Fritz Haber）与卡尔·博施（Carl Bosch）是如何打破这道热力学魔咒，“把空气变成面包”的？

Hook / Phaenomen: Zu Beginn des 20. Jahrhunderts drohte der Menschheit die groesste Hungerskatastrophe der Geschichte: Die globalen Vorkommen an natuerlichem Stickstoffduenger (Chile-Salpeter) waren nahezu erschoepft. Obwohl die Erdatmosphaere zu 78% aus reinem Stickstoff ($N_2$) besteht, ist dieser fuer Pflanzen unnutzbar — die extrem reaktionstraege Dreifachbindung ($N \equiv N$) widersteht fast jeder chemischen Reaktion. 1909 gelang Fritz Haber und Carl Bosch ein Jahrhundertdurchbruch: Sie zwaengten Stickstoff und Wasserstoff bei 200 bar und 450 °C in gewaltige Hochdruckreaktoren und synthetisierten Ammoniak ($NH_3$). Heute haelt dieses Verfahren die Haelfte der Weltbevoelkerung am Leben — doch im Ersten Weltkrieg diente derselbe Ammoniak zur Herstellung von Sprengstoff!

`Klausur-Satz: Das Haber-Bosch-Verfahren repraesentiert die meisterhafte technische Anwendung des Prinzips von Le Chatelier auf eine exotherme Gleichgewichtsreaktion unter Volumenabnahme.`

## Schritt 2 — entdecken: Ausruestungskiste der Gleichgewichts-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 勒夏特列原理 / 最小约束原理 — Prinzip von Le Chatelier (Prinzip vom kleinsten Zwang): 处于动态平衡的系统若受到外界条件的改变（温度、压力、浓度），平衡将向着减弱这种外界改变的方向移动。 Uebt man auf ein im chemischen Gleichgewicht befindliches System einen Zwang aus (Druck, Temperatur, Konzentration), so weicht das System diesem Zwang aus. Mechanismus: Verschiebung der Hin- oder Rueckreaktionsgeschwindigkeit. Klausur-Tipp: Immer den Dreischritt nennen: Zwang benennen $\to$ Ausweichrichtung begruenden $\to$ Konzentrationsverschiebung ableiten!
- 质量作用定律 — Massenwirkungsgesetz (MWG): 在恒定温度下，可逆反应达到化学平衡时，生成物平衡浓度幂乘积与反应物平衡浓度幂乘积的比值为一常数 $K_c$。 Das mathematische Gesetz fuer das Konzentrationsverhaeltnis im dynamischen Gleichgewicht: $K_c = \frac{[NH_3]^2}{[N_2] \cdot [H_2]^3}$. Mechanismus: Dynamisches Fliessgleichgewicht ($v_{\text{hin}} = v_{\text{rueck}}$). Klausur-Tipp: $K_c$ ist AUSSCHLIESSLICH temperaturabhaengig; Druck- oder Konzentrationsaenderungen aendern $K_c$ nicht!
- 反应焓与温度影响 — Reaktionsenthalpie ($\Delta H$): 反应吸收或释放的热量。放热反应（$\Delta H < 0$）升温平衡逆向移动，吸热反应（$\Delta H > 0$）升温平衡正向移动。 Exotherme Reaktionen setzen Waerme frei; Temperaturerhoehung beguenstigt gemaess Le Chatelier die endotherme Rueckreaktion zum Waermeverbrauch. Klausur-Tipp: "Waerme wie ein Produkt behandeln" als Denktrick!
- 压力影响与摩尔体积 — Druckeinfluss & Gasmolzahl ($\Delta n_{\text{Gas}}$): 增大总压强平衡向着气体系数和减少（体积减小）的方向移动；减小压强向着气体系数和增加的方向移动。 Bei Reaktionen mit Gasen fuehrt Druckerhoehung zur Verschiebung auf die Seite mit geringerer Stoffmenge an Gasmolekuelen. Mechanismus: Verringerung der Teilchendichte. Klausur-Tipp: Bei Haber-Bosch: $1 N_2 + 3 H_2$ (4 Mol Gas) $\rightleftharpoons 2 NH_3$ (2 Mol Gas) $\implies$ Druckerhoehung treibt nach rechts!
- 活化能与催化剂 — Aktivierungsenergie & Katalysator: 催化剂通过改变反应路径显著降低活化能（$E_A$），同时同等程度加速正向与逆向反应速率。 Ein Stoff, der die Aktivierungsenergie herabsetzt, ohne selbst verbraucht zu werden. Mechanismus: Beschleunigt die Gleichgewichtseinstellung drastisch, verschiebt aber NIEMALS die Gleichgewichtslage ($K_c$ bleibt unveraendert). Klausur-Tipp: Haeufigste Pruefungsfalle im AFB I/II!

`Klausur-Satz: Ein Katalysator verringert die Aktivierungsenergie und beschleunigt die Einstellzeit des Gleichgewichts, hat jedoch keinerlei Einfluss auf die thermodynamische Gleichgewichtskonstante Kc.`

## Schritt 3 — entdecken: Das Haber-Bosch-Konfliktdreieck
ENTDECKEN（1概念 + 1文字图解）：

中文：哈伯-博施法是工业化学史上的“魔鬼权衡”：
- 反应方程式：$N_2\text{ (g)} + 3 H_2\text{ (g)} \rightleftharpoons 2 NH_3\text{ (g)}, \quad \Delta H = -92,4\text{ kJ/mol}$
- 困境 1（温度矛盾）：因为是放热反应，理论上温度越低，勒夏特列平衡越偏向右侧生成物；但在室温下，粒子碰撞动能远低于活化能，反应甚至需要等上一万年！
- 困境 2（压强极限）：压力越高产率越高，但压强超过 300 bar 会引发高压氢脆爆炸，摧毁钢铁反应器。
- 绝妙方案：450 °C（兼顾速率与产率的妥协温度）+ 200 bar（工业安全高压）+ $\alpha$-Eisen-Katalysator（攻克活化能堡垒）+ 循环冷凝分离（不断抽走 $NH_3$ 迫使反应向右）。

文字图解（ASCII 工业合成回路与 Le Chatelier 调控）：

```diagram
Haber-Bosch-Kreislaufverfahren im industriellen Reaktor:

     Frischgas (N2 + 3 H2)
             |
             v
      [ Kompressor ]  --->  Erhoehung auf 200 bar (Le Chatelier: Druck beguenstigt NH3!)
             |
             v
   +-------------------+  Reaktionskammer:
   |   T = 450 °C      |  (Kompromiss: Genug Kinetik fuer schnelle Kollisionen)
   |  [ Katalysator ]  |  (Fe3O4 / Al2O3 senkt Aktivierungsenergie der N2-Spaltung)
   +-------------------+
             |
             v Gasgemisch (ca. 15-20% NH3 + 80% nicht reagiertes N2/H2)
      [ Kuehler / Kondensator ]
             |
             +----------------------------+
             |                            |
             v (Verfluessigung)           v (Rueckfuehrung / Kreislauf)
     Fluessiges NH3              Unreagiertes N2 + H2
     (Wird entnommen!)           (Geht zurueck in den Reaktor!)
     Le Chatelier:               (Spart Rohstoffe und erzwingt
     Produktentzug stoert        100% Gesamtausbeute!)
     Gleichgewicht -> Nachschub!
```

`Klausur-Satz: Die kontinuierliche Kondensation und Ausschleusung des fluessigen Ammoniaks entzieht dem Gleichgewicht das Produkt, wodurch die Rueckreaktion unterbunden und die Gesamtausbeute maximiert wird.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Fritz Haber ist eine der tragischsten und duestersten Figuren der Wissenschaftsgeschichte. Fuer die Erfindung des Ammoniak-Verfahrens erhielt er 1918 den Nobelpreis fuer Chemie, weil er Milliarden Menschen vor dem Verhungern bewahrt hatte. Doch waehrend des Ersten Weltkriegs stellte sich Haber fanatisch in den Dienst des deutschen Militaers und entwickelte die ersten toedlichen Chemiewaffen — er leitete persoenlich den ersten Giftgasangriff der Menschheitsgeschichte mit Chlorgas bei Ypern (1915). Aus Verzweiflung und Scham ueber Habers toedliche Experimente erschoss sich seine Ehefrau, die promovierte Chemikerin Clara Immerwahr, im Garten ihrer Villa mit Habers Dienstpistole.

**中文解读**: 弗里茨·哈伯是科学史上最备受争议的“双面普罗米修斯”。他发明哈伯法制造了全球一半人口赖以生存的人造氮肥，荣获诺贝尔化学奖；但在第一次世界大战中，他却沦为狂热的军国主义者，亲自在一线指挥了人类历史上第一次惨绝人寰的大规模氯气毒气战（伊普尔战役）。他的妻子克拉拉·伊默瓦尔（Clara Immerwahr，德国历史上第一位化学女博士）苦劝无果，因痛心丈夫把科学沦为杀人武器，在哈伯出征前夜，于自家花园中用哈伯的军用手枪饮弹自尽。

**Bezug zum Konzept**: `Habers Entdeckung verdeutlicht die fundamentale ethische Ambivalenz chemischer Grosssynthesen zwischen Ernaehrungssicherheit und militaerischer Sprengstoffproduktion.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Gleichgewichtsrechnung
Kontinuitaet: Vorher Chemie-Stosstheorie-und-mittlere-Reaktionsgeschwindigkeit.md | Nachher Chemie-Saeure-Base-Gleichgewichte-pH-Wert.md. Krise dieser Episode: Brot aus der Luft vs. Dynamit fuer den Krieg. Zielgroessen: Massenwirkungsgesetz, Prinzip vom kleinsten Zwang, Druckeinfluss, Katalysator

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: balance-board]

AUFGABE (erklaeren & berechnen, AFB I/II)：
In einem geschlossenen Labor-Reaktionsgefaess ($V = 10\text{ Liter}$) stellt sich bei einer Temperatur von $T_1 = 400\text{ ^\circ C}$ das Gleichgewicht der Ammoniaksynthese ein. Die Analyse ergibt folgende Gleichgewichtskonzentrationen:
$[N_2] = 0,20\text{ mol/l}$, $[H_2] = 0,60\text{ mol/l}$, $[NH_3] = 0,18\text{ mol/l}$.
1. Formulieren Sie das Massenwirkungsgesetz und berechnen Sie den Zahlenwert der Gleichgewichtskonstante $K_c$ bei $400\text{ ^\circ C}$ inklusive Einheit. (10 BE)
2. Erklaeren Sie unter Anwendung des Prinzips von Le Chatelier, wie sich der Wert von $K_c$ und die Ammoniakausbeute veraendern, wenn man die Temperatur auf $500\text{ ^\circ C}$ erhoeht. (20 BE)

HILFE:
1. Schritt 1: MWG aufstellen: $K_c = \frac{[NH_3]^2}{[N_2] \cdot [H_2]^3}$.
2. Schritt 2: Werte einsetzen: Zaehler = $(0,18)^2$, Nenner = $0,20 \cdot (0,60)^3$.
3. Schritt 3: Einheit beachten: $\frac{(\text{mol/l})^2}{\text{mol/l} \cdot (\text{mol/l})^3} = \frac{1}{(\text{mol/l})^2} = \text{l}^2/\text{mol}^2$.
4. Schritt 4: Temperaturerhoehung: Da $\Delta H < 0$ (exotherm), fuehrt Temperaturzufuhr gemaess Le Chatelier zur Beguenstigung der endothermen Rueckreaktion $\implies K_c$ sinkt!

MUSTERLÖSUNG:
1. Berechnung der Gleichgewichtskonstante $K_c$:
   - Das Massenwirkungsgesetz fuer die Reaktion $N_2\text{ (g)} + 3 H_2\text{ (g)} \rightleftharpoons 2 NH_3\text{ (g)}$ lautet:
     $$K_c = \frac{[NH_3]^2}{[N_2] \cdot [H_2]^3}$$
   - Einsetzen der gegebenen Gleichgewichtskonzentrationen:
     $$K_c = \frac{(0,18\text{ mol/l})^2}{(0,20\text{ mol/l}) \cdot (0,60\text{ mol/l})^3} = \frac{0,0324\text{ mol}^2/\text{l}^2}{0,20\text{ mol/l} \cdot 0,216\text{ mol}^3/\text{l}^3}$$
     $$K_c = \frac{0,0324}{0,0432}\text{ l}^2/\text{mol}^2 = 0,75\text{ l}^2/\text{mol}^2$$
2. Erklaerung der Temperaturerhoehung auf $500\text{ ^\circ C}$:
   - Die Hinreaktion zur Synthese von Ammoniak verlaeuft exotherm ($\Delta H = -92,4\text{ kJ/mol}$).
   - Nach dem Prinzip von Le Chatelier fuehrt das Einbringen eines thermischen Zwangs (Temperaturerhoehung) dazu, dass das System dem Zwang ausweicht, indem es diejenige Teilreaktion beguenstigt, die thermische Energie verbraucht. Dies ist hier die **endotherme Rueckreaktion** (Zerfall von Ammoniak in Stickstoff und Wasserstoff).
   - Infolgedessen sinkt die Gleichgewichtskonzentration des Produkts $[NH_3]$, waehrend die Konzentrationen der Edukte $[N_2]$ und $[H_2]$ ansteigen.
   - Da die Gleichgewichtskonstante $K_c$ mathematisch durch den Quotienten definiert ist, nimmt der Zaehler ab und der Nenner zu: **Der Wert von $K_c$ sinkt bei $500\text{ ^\circ C}$ messbar ab**, und die theoretische Ausbeute an Ammoniak im Gleichgewicht verschlechtert sich.

`Klausur-Satz: Bei exothermen Reaktionen fuehrt eine Temperaturerhoehung zwingend zu einer Verkleinerung der Gleichgewichtskonstante Kc und damit zu einer Verschiebung des Gleichgewichts auf die Eduktseite.`

## Schritt 5 — ausprobieren: Duell der Perspektiven: Thermodynamik vs. Kinetik

VERGLEICH: Thermodynamisches Gleichgewicht vs. Reaktionskinetik

- Position A (Thermodynamik / Das "Ob"):
  - Fokus: Energetische Stabilitaet, Enthalpie, Entropie, Lage des Gleichgewichts ($K_c$).
  - Forderung fuer Haber-Bosch: Moeglichst niedrige Temperatur (z.B. 25 °C), um das exotherme Gleichgewicht maximal auf die Ammoniakseite zu verschieben.
  - Problem: Ignoriert die Zeit voellig — sagt nur, was im unendlichen Gleichgewicht passiert.
- Position B (Reaktionskinetik / Das "Wie schnell"):
  - Fokus: Reaktionsgeschwindigkeit ($v$), Stosstheorie, Ueberwindung der Aktivierungsenergie ($E_A$).
  - Forderung fuer Haber-Bosch: Moeglichst hohe Temperatur (z.B. 1000 °C), damit genuegend Teilchen die gewaltige Aktivierungsenergie fuer die Dreifachbindungsspaltung aufbringen.
  - Problem: Zerstoert bei hohen Temperaturen das Produkt thermodynamisch vollstaendig.

Entscheidungsregel fuer die Klausur:
In industriellen Bewertungsaufgaben (AFB III) den Begriff der **Kompromisstemperatur** als Synthese aus Kinetik (Reaktionsgeschwindigkeit) und Thermodynamik (Gleichgewichtslage) definieren!

## Schritt 6 — check: Klausur-Transfer Katalysator & Druck-Optimierung
PRÜFUNGSSZENARIO (KLP NRW Chemie EF/Q1 Inhaltsfeld 2: Chemisches Gleichgewicht):

Ein Chemie-Ingenieur schlaegt vor, die Kosten fuer die teuren Hochdruckreaktoren (200 bar) einzusparen: "Wir koennen die Synthese doch einfach bei normalem Umgebungsdruck (1 bar) durchfuehren. Den Ausbeuteverlust gleichen wir aus, indem wir einfach die fuenffache Menge des Eisenkatalysators in den Reaktor fuellen!"

AUFGABE (beurteilen & begruenden, AFB II/III):
1. Beurteilen Sie den Vorschlag des Ingenieurs auf wissenschaftlicher Grundlage. (12 BE)
2. Begruenden Sie aus Sicht der Reaktionskinetik und der chemischen Thermodynamik, warum dieser Plan zum Scheitern verurteilt ist. (18 BE)

ERWARTUNGSHORIZONT:
- AFB II: Der Vorschlag des Ingenieurs zeugt von einem fundamentalen Fehlverstaendnis der Funktion eines Katalysators. Der Plan ist voellig unbrauchbar und physikochemisch zum Scheitern verurteilt.
- AFB III:
  - *Thermodynamische Begruendung*: Gemaess Le Chatelier sinkt bei einer Drucksenkung von 200 bar auf 1 bar die Ausbeute an Ammoniak drastisch gegen Null (bei 1 bar liegt der Gleichgewichtsanteil von $NH_3$ bei 450 °C bei unter 0,1%), da das System dem Druckabfall durch Verschiebung zur Seite mit groesserer Gasstoffmenge (4 Mol Edukte vs. 2 Mol Produkte) ausweicht.
  - *Katalysator-Fehlschluss*: Ein Katalysator senkt ausschliesslich die Aktivierungsenergie und beschleunigt die Gleichgewichtseinstellung, er kann jedoch die thermodynamische Gleichgewichtslage ($K_c$) zu keinem Zeitpunkt verschieben! Selbst mit einer unendlichen Menge Katalysator kann man bei 1 bar und 450 °C niemals mehr als die thermodynamisch vorgegebenen 0,1% Ammoniak gewinnen. Um nennenswerte Mengen zu produzieren, ist der hohe Druck von ca. 200 bar zwingend physikalisch unersetzlich.

## Schritt 7 — check: Format-Check & Scoring
30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche Auswirkung hat die Zugabe eines Katalysators auf den Zahlenwert der Gleichgewichtskonstante $K_c$?
ANTWORT: Gar keine; der Wert von $K_c$ bleibt absolut unveraendert (ein Katalysator beschleunigt Hin- und Rueckreaktion gleichermassen).

FRAGE: Wohin verschiebt sich das chemische Gleichgewicht beim Haber-Bosch-Verfahren, wenn der Gesamtdruck drastisch erhoeht wird?
ANTWORT: Nach rechts (auf die Produktseite zum Ammoniak), da dort weniger Gasmolmolekuele (2 Mol) vorliegen als auf der Eduktseite (4 Mol).

FRAGE: Warum ist die industrielle Synthesetemperatur von ca. 450 °C eine "Kompromisstemperatur"?
ANTWORT: Weil sie den Widerspruch zwischen thermodynamischer Ausbeute (verlangt Kaelte) und kinetischer Reaktionsgeschwindigkeit (verlangt Hitze) optimal ausbalanciert.

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission
REFLEXION:
Du hast eines der wichtigsten Prinzipien der gesamten Chemie durchdrungen. Du kannst chemische Gleichgewichte nach Le Chatelier steuern, Gleichgewichtskonstanten berechnen und verstehst die industrielle Chemie des 20. Jahrhunderts.

<!-- reflexion: chemie-le-chatelier-haber-bosch -->
In der naechsten naturwissenschaftlichen Episode wechseln wir in die Zell- und Neurobiologie: Wie feuert ein menschliches Neuron blitzschnelle elektrische Aktionspotenziale und warum kann der Strom niemals rueckwaerts fliessen? Weiter geht es mit [Bio-Aktionspotenzial-und-Refraktaerzeit-L1](Bio-Aktionspotenzial-und-Refraktaerzeit-L1.md).
