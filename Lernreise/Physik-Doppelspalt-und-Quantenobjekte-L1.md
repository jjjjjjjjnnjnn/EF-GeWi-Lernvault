---
fach: Physik
thema: "Das Doppelspaltexperiment und die Natur von Quantenobjekten"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Quantenphysik, Doppelspalt, Interferenz, Welle-Teilchen-Dualismus]
version: Lesson-v3
---

# Lernreise: Das Doppelspaltexperiment und die Natur von Quantenobjekten (L1, Ziel Klausur)

<!-- Campaign: Quantenmechanik-und-Atomphysik | Episode 2/10 | Krise: Welle oder Teilchen? Warum veraendert das Beobachten die Realitaet? | Zielgroessen: Interferenz, De-Broglie-Wellenlaenge, Welcher-Weg-Information, Wahrscheinlichkeitsinterpretation | Tool: lego -->

## Schritt 1 — entdecken: Das unmoeglichste Experiment der Welt
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清托马斯·杨氏双缝干涉（Doppelspalt）到单个电子双缝实验（Interferenz einzelner Elektronen）所揭示的微观量子奇异性。
2. 中文：能推导并计算德布罗意物质波长（De-Broglie-Wellenlaenge: $\lambda = \frac{h}{p} = \frac{h}{m \cdot v}$）与明暗条纹间距几何公式（$s_k = k \cdot \frac{\lambda \cdot a}{d}$）。
3. 中文：能在现代物理认识论大题（AFB I/II/III）中运用波恩概率诠释（Bornsche Wahrscheinlichkeitsinterpretation）与“哪条路径信息”（Welcher-Weg-Information）阐述观察行为对量子相干性的塌缩破坏。

### Hook / Phaenomen

拿一把机枪向带有两条窄缝的钢板扫射，穿过缝隙的子弹在后方靶子上必然留下两条分明的弹道痕迹；向双缝投射水波，两道波纹交织穿过，在后方会产生明暗交替的波纹干涉条纹。这一切都符合经典物理常识。然而，在 1989 年日本日立中央研究所的实验室里，物理学家外村彰（Akira Tonomura）将电子枪调到极致微弱——弱到枪膛每隔整整一秒钟才向双缝射出一颗孤零零的电子！由于场中绝无第二个电子存在，单个电子绝不可能和其它粒子相撞。但令人毛骨悚然的事情发生了：几小时后，靶屏幕上数万个随机落点竟然自发拼装出了清晰绝伦的明暗相间的波动干涉条纹！难道这颗微小的固态电子，在飞跃双缝的瞬间把自己劈成了两半，同时穿过了两条缝并与自己发生了干涉？更诡异的是：如果你在缝口装上高灵敏探测器想看清它究竟走哪边，干涉条纹竟在被你看到的瞬间当场彻底消失！

Hook / Phaenomen: Schiesst man Tennisbaelle auf eine Wand mit zwei Schlitzen, landen sie brav in zwei Streifen auf der Zielwand. Schickt man Wasserwellen hindurch, entsteht ein physikalisches Interferenzmuster mit Verstaerkung und Ausloeschung. Soweit die klassische Welt. Doch als Physiker das Experiment mit realen Materieteilchen — einzelnen **Elektronen** — wiederholten, und zwar so stark gedrosselt, dass sich zu jedem Zeitpunkt immer nur ein einziges Elektron im gesamten Versuchsaufbau befand, passierte das Unbegreifliche: Nach einigen tausend Treffern zeichnete sich auf dem Leuchtschirm ein makelloses **Interferenzmuster** ab! Ein einzelnes Teilchen scheint gleichzeitig durch beide Spalte zu gehen und mit sich selbst zu interferieren! Und der groesste Schock: Stellt man einen Detektor auf, um zu beobachten, durch welchen Spalt das Elektron wirklich fliegt, bricht das Interferenzmuster augenblicklich zusammen — die Natur verweigert die klassische Ortsbestimmung!

`Klausur-Satz: Das Doppelspaltexperiment mit Einzelelektronen beweist, dass Quantenobjekte weder klassische Massepunkte noch reine Wellen sind, sondern ein Interferenzmuster gemaess einer Wahrscheinlichkeitswelle $\psi$ ausbilden.`

## Schritt 2 — entdecken: Ausruestungskiste der Quanten-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 德布罗意物质波长 — De-Broglie-Wellenlaenge ($\lambda = \frac{h}{p}$): 任何动量为 $p = m \cdot v$ 的运动物质粒子都伴随具有特定波长 $\lambda$ 的波动性质。 Die jedem bewegten Materieteilchen mit dem Impuls $p$ zugeordnete Wellenlaenge ($\lambda = \frac{h}{m \cdot v}$). Mechanismus: Verknuepft Teilchengroessen ($m, v$) mit Wellengroessen ($\lambda$) ueber das Plancksche Wirkungsquantum $h$. Klausur-Tipp: Bei schnellen Elektronen kinetische Energie $E_{\text{kin}} = e \cdot U = \frac{p^2}{2m}$ zur Impulsberechnung nutzen!
- 几率解释 / 波恩诠释 — Bornsche Wahrscheinlichkeitsinterpretation ($|\psi|^2$): 物质波并不是带电体在空间中的实体发散，波函数的模平方代表粒子在特定时空坐标被测量探测到的几率密度。 Das Quadrat der Wellenfunktion $|\psi(x,t)|^2$ gibt die Wahrscheinlichkeitsdichte an, ein Quantenobjekt an einem bestimmten Ort nachzuweisen. Mechanismus: Determiniert ist nicht der Ort des Teilchens, sondern die raumzeitliche Wahrscheinlichkeitsverteilung. Klausur-Tipp: Schluesselbegriff zur Abgrenzung vom klassischen Determinismus!
- 哪条路径信息 — Welcher-Weg-Information (Which-Way Information): 一旦通过实验手段探测到量子微粒究竟穿越了左缝还是右缝，其空间叠加态就会瞬间被破坏。 Die experimentelle Feststellung, welchen konkreten Pfad ein Quantenobjekt genommen hat. Mechanismus: Jede irreversible Wechselwirkung mit einem Messapparat zerstoert die Phasenkohaerenz $\implies$ Das Interferenzmuster kollabiert zur klassischen Summenverteilung. Klausur-Tipp: Erklaert das Messproblem der Quantenmechanik!
- 波粒二象性与互补原理 — Komplementaritaetsprinzip (nach Niels Bohr): 波动图像与粒子图像是描述微观世界的两种互斥但互补的观察视角；单次实验绝不可能同时显现完美的波动性与粒子性。 Welle- und Teilchenaspekte schliessen sich im selben Einzelexperiment gegenseitig aus, ergaenzen sich aber zur vollstaendigen Beschreibung. Mechanismus: Versuchsaufbau bestimmt, welches Phaenomen sich manifestiert. Klausur-Tipp: Niemals schreiben "das Elektron ist beides gleichzeitig", sondern "zeigt je nach Messanordnung Wellen- oder Teilchencharakter"!
- 双缝干涉极大值条件 — Interferenzbedingung am Doppelspalt: 当两列相干子波的光程差 $\Delta s$ 等于波长的整数倍时产生建设性相干加强（亮条纹）。 Bedingung fuer Interferenzmaxima: Gangunterschied $\Delta s = d \cdot \sin(\alpha_k) = k \cdot \lambda$ (fuer $k \in \mathbb{Z}$). Mechanismus: Konstruktive Interferenz zweier Elementarwellen. Klausur-Tipp: Fuer kleine Winkel gilt $\sin(\alpha) \approx \tan(\alpha) = \frac{s_k}{a}$!

`Klausur-Satz: Der Nachweis der Welcher-Weg-Information vernichtet die quantenmechanische Interferenzfaehigkeit, da die Ueberlagerung der Wahrscheinlichkeitsamplituden zerfaellt.`

## Schritt 3 — entdecken: Die Geometrie des Interferenzmusters
ENTDECKEN（1概念 + 1文字图解）：

中文：双缝干涉的几何光程差推导是物理高考必考基础：
- 缝隙间距 $d$、缝到屏幕距离 $a$（$a \gg d$）
- 第 $k$ 级亮纹到中心距离 $s_k$
- 光程差：$\Delta s = d \cdot \sin(\alpha)$
- 小角近似：$\sin(\alpha) \approx \tan(\alpha) = \frac{s_k}{a}$
- 综合极大值公式：
  $$\Delta s = k \cdot \lambda \implies d \cdot \frac{s_k}{a} = k \cdot \lambda \implies s_k = k \cdot \frac{\lambda \cdot a}{d}$$

文字图解（ASCII 双缝结构与概率分布曲线）：

```diagram
Experimenteller Aufbau und Interferenzmuster am Doppelspalt:

  Elektronenquelle            Doppelspalt          Schirm mit Detektoren
      (Monoenergetisch)       (Abstand d)          (Abstand a >> d)

            *
            *               +---+
            *               |   |                  Intensitaetsverteilung:
    e-      * ------------> | S1| -----------------     .---. (k=1)
   ----->   *               |   |                 \    /     \
            *               +---+                  \  /       \   .-------. (k=0 Maximum)
            *                 d                     \/         \ /         \
            *               +---+                   /\          X           \
   ----->   * ------------> | S2| -----------------/  \        / \           \
            *               |   |                      \      /   \           /
            *               +---+                       '----'     '---------'
            *                                      |<- sk ->|
```

`Klausur-Satz: Der Abstand benachbarter Interferenzmaxima vergroessert sich antiproportional zum Spaltabstand d und proportional zur De-Broglie-Wellenlaenge $\lambda$.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wusstest du, dass Albert Einstein die Wahrscheinlichkeitsinterpretation der Quantenmechanik bis zu seinem Tod zutiefst hasste? In einem beruehmten Brief an Max Born schrieb er voller Empoerung: "Die Theorie liefert viel, aber dem Geheimnis des Alten bringt sie uns kaum naeher. Jedenfalls bin ich ueberzeugt, dass der Alte [Gott] nicht wuerfelt!" Niels Bohr konterte spaeter trocken und legendaer: "Aber Einstein, hoeren Sie doch endlich auf, Gott vorzuschreiben, wie er die Welt zu regieren hat!"

**中文解读**: 爱因斯坦至死都拒绝承认量子力学在微观世界中彻底抛弃了确定因果律！他在给马克斯·玻恩的亲笔信中写下了科学史上最著名的抗议：“量子理论确实管用，但我无论如何深信，上帝是绝不掷骰子的！”而量子力学校长尼尔斯·玻尔（Niels Bohr）听到后冷冷反驳：“爱因斯坦，别再去指挥上帝该怎么管他的宇宙了！”

**Bezug zum Konzept**: `Das Doppelspaltexperiment bestaetigte Bohrs statistische Interpretation und widerlegte Einsteins klassische Erwartung determinierter Teilchenbahnen.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Berechnung der De-Broglie-Wellenlaenge
Kontinuitaet: Vorher Physik-Lorentzkraft-Massenspektrometer-L1.md | Nachher Physik-EF-2-Weltbild-und-Zeitdilatation.md. Krise dieser Episode: Welle oder Teilchen? Warum veraendert das Beobachten die Realitaet? Zielgroessen: Interferenz, De-Broglie-Wellenlaenge, Welcher-Weg-Information, Wahrscheinlichkeitsinterpretation

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: lego]

AUFGABE (berechnen & erlaeutern, AFB I/II)：
In einer Elektronenbeugungsroehre werden Elektronen ($m_e = 9,109 \times 10^{-31}\text{ kg}$, $e = 1,602 \times 10^{-19}\text{ C}$) durch eine Beschleunigungsspannung von $U_B = 150\text{ V}$ beschleunigt und treffen auf einen Doppelspalt mit Spaltabstand $d = 2,0\,\mu\text{m}$. Der Schirm befindet sich im Abstand von $a = 1,20\text{ m}$. ($h = 6,626 \times 10^{-34}\text{ J}\cdot\text{s}$).
1. Berechnen Sie die Geschwindigkeit $v$ der Elektronen und ihre De-Broglie-Wellenlaenge $\lambda$. (10 BE)
2. Bestimmen Sie den Abstand $s_1$ des ersten Interferenzmaximums ($k = 1$) vom zentralen Hauptmaximum. (20 BE)

HILFE:
1. Schritt 1: Kinetische Energie: $E_{\text{kin}} = e \cdot U_B = \frac{1}{2} m_e v^2 \implies v = \sqrt{\frac{2 e U_B}{m_e}}$.
2. Schritt 2: De-Broglie-Formel: $\lambda = \frac{h}{p} = \frac{h}{m_e \cdot v}$.
3. Schritt 3: Interferenzabstand: $s_1 = 1 \cdot \frac{\lambda \cdot a}{d}$.

MUSTERLÖSUNG:
1. Berechnung von Geschwindigkeit und De-Broglie-Wellenlaenge:
   - Elektronengeschwindigkeit:
     $$v = \sqrt{\frac{2 \cdot e \cdot U_B}{m_e}} = \sqrt{\frac{2 \cdot 1,602 \times 10^{-19}\text{ C} \cdot 150\text{ V}}{9,109 \times 10^{-31}\text{ kg}}} = \sqrt{\frac{4,806 \times 10^{-17}}{9,109 \times 10^{-31}}} \approx 7,264 \times 10^6\text{ m/s}$$
     (Da $v \approx 2,4\% c$ liegt, ist eine relativistische Korrektur nicht erforderlich).
   - De-Broglie-Wellenlaenge $\lambda$:
     $$\lambda = \frac{h}{m_e \cdot v} = \frac{6,626 \times 10^{-34}\text{ J}\cdot\text{s}}{9,109 \times 10^{-31}\text{ kg} \cdot 7,264 \times 10^6\text{ m/s}} = \frac{6,626 \times 10^{-34}}{6,617 \times 10^{-24}} \approx 1,001 \times 10^{-10}\text{ m} = 0,100\text{ nm}$$
     (Dies entspricht exakt der Groessenordnung von Roentgenstrahlung bzw. Atomdurchmessern!).
2. Berechnung des Abstands des 1. Interferenzmaximums ($k = 1$):
   - Geometrische Interferenzformel:
     $$s_1 = \frac{\lambda \cdot a}{d} = \frac{1,001 \times 10^{-10}\text{ m} \cdot 1,20\text{ m}}{2,0 \times 10^{-6}\text{ m}} = \frac{1,201 \times 10^{-10}}{2,0 \times 10^{-6}} \approx 6,01 \times 10^{-5}\text{ m} \approx 0,060\text{ mm} = 60\,\mu\text{m}$$
   - **Ergebnis**: Der Abstand der ersten Interferenzstreifen betraegt ca. $60\,\mu\text{m}$. Um diese Streifen mit dem menschlichen Auge aufzuloesen, wird im Experiment ein Mikroskop oder ein feiner optischer Sensor verwendet.

`Klausur-Satz: Wegen der winzigen Masse des Elektrons liegt seine De-Broglie-Wellenlaenge bei moderaten Beschleunigungsspannungen im Sub-Nanometer-Bereich und erzeugt messbare mikroskopische Interferenzmuster.`

## Schritt 5 — ausprobieren: Duell der Weltbilder: Klassische Physik vs. Quantenmechanik

VERGLEICH: Klassisches Teilchenkonzept (Newton) vs. Quantenobjekt (Kopenhagener Deutung)

- Position A (Klassische Mechanik / Reale Teilchenbahn):
  - Grundannahme: Ein Objekt besitzt zu jedem Zeitpunkt einen exakt definierten Ort $\vec{x}(t)$ und Impuls $\vec{p}(t)$.
  - Messvorgang: Die Messung enthuellt lediglich eine vorgegebene Realitaet; der Einfluss des Beobachters kann prinzipiell beliebig klein gemacht werden.
  - Doppelspalt-Ergebnis: Jedes Teilchen nimmt zwingend genau einen Spalt. Das Gesamtbild ist die simple Summe zweier Einspalt-Haeufungen ($P_{\text{gesamt}} = P_1 + P_2$).
- Position B (Quantenmechanik / Wahrscheinlichkeitszustand):
  - Grundannahme: Das Quantenobjekt wird durch eine quantenmechanische Zustandsfunktion $\psi$ beschrieben. Vor der Messung existiert keine klassische Flugbahn!
  - Messvorgang: Der Messakt ist ein irreversibler Eingriff, der die Superposition kollabieren laesst (Zustandsreduktion).
  - Doppelspalt-Ergebnis: Nicht die Wahrscheinlichkeiten addieren sich, sondern die Wahrscheinlichkeitsamplituden ($\psi_{\text{gesamt}} = \psi_1 + \psi_2$), was zum Interferenzterm fuehrt:
    $$P = |\psi_1 + \psi_2|^2 = |\psi_1|^2 + |\psi_2|^2 + 2\text{Re}(\psi_1^* \psi_2)$$

Entscheidungsregel fuer die Klausur:
Wird nach `dem Verschwinden des Interferenzmusters` gefragt, stets begruenden: "Sobald Welcher-Weg-Information existiert, wird der Interferenzterm $2\text{Re}(\psi_1^* \psi_2)$ zerstoert, und das Muster geht in die klassische Wahrscheinlichkeitsaddition ueber!"

## Schritt 6 — check: Klausur-Transfer Delayed-Choice-Gedankenexperiment
PRÜFUNGSSZENARIO (KLP NRW Physik GK/LK Inhaltsfeld 3: Quantenphysik / Kopenhagener Deutung):

Im sogenannten "Delayed-Choice-Gedankenexperiment" (Verzoegerte Entscheidung nach John Archibald Wheeler) entscheidet der Experimentator erst NACHDEM das Photon bzw. Elektron den Doppelspalt passiert hat, aber BEVOR es auf dem Detektorschirm einschlaegt, ob er die Welcher-Weg-Messung zuschaltet oder nicht.

AUFGABE (erklaeren & beurteilen, AFB II/III):
1. Erklaeren Sie die scheinbare Paradoxie des Delayed-Choice-Experiments aus Sicht der klassischen Kausalitaet. (12 BE)
2. Beurteilen Sie vor diesem Hintergrund das Konzept der "Realitaet" vor dem Messprozess in der Kopenhagener Deutung. (18 BE)

ERWARTUNGSHORIZONT:
- AFB II: Klassisch gedacht muesste sich das Quantenobjekt bereits am Doppelspalt entschieden haben, ob es als Welle (durch beide Spalte) oder als Teilchen (durch einen Spalt) hindurchfliegt. Wenn der Experimentator jedoch erst Sekundenbruchteile spaeter im Flug entscheidet, die Spalte zu beobachten, scheint es, als wuerde die spaetere Messung rueckwirkend in die Vergangenheit eingreifen und die fruehere Entscheidung des Teilchens aendern.
- AFB III: Die Kopenhagener Deutung (Bohr, Heisenberg) loest die Paradoxie auf, indem sie den Begriff der "objektiven Teilchenbahn vor der Messung" als physikalisch sinnlos verwirft. Das Quantenobjekt hat vor dem tatsaechlichen Messereignis keine Vorgeschichte im Sinne klassischer Bahnen! Erst das vollstaendige, geschlossene Gesamtexperiment (inklusive Detektor am Schirm) definiert das physikalische Phaenomen. Nicht die Vergangenheit wird geaendert, sondern das Quantensystem verharrt bis zur endgueltigen Detektion in einer raumzeitlichen Verspassung der Moeglichkeiten.

## Schritt 7 — check: Format-Check & Scoring
30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche Formel verknuepft den Teilchenimpuls $p$ mit der De-Broglie-Wellenlaenge $\lambda$?
ANTWORT: $\lambda = \frac{h}{p}$ (mit dem Planckschen Wirkungsquantum $h$).

FRAGE: Was passiert mit dem Interferenzmuster am Doppelspalt, wenn man durch einen Detektor zweifelsfrei feststellt, durch welchen Spalt jedes Elektron geflogen ist?
ANTWORT: Das Interferenzmuster bricht vollstaendig zusammen; es entsteht lediglich die klassische Summenverteilung zweier Einzelstreifen.

FRAGE: Wie interpretiert Max Born das Betragsquadrat der quantenmechanischen Wellenfunktion $|\psi|^2$?
ANTWORT: Als raumzeitliche Wahrscheinlichkeitsdichte fuer das Auffinden des Quantenobjekts.

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission
REFLEXION:
Du hast das Schluesselportal zur modernen Quantenphysik durchschritten. Du kannst De-Broglie-Wellenlaengen berechnen, verstehst die Grenzen der klassischen Anschauung und beherrschst die Kopenhagener Deutung fuer das Abitur.

<!-- reflexion: physik-doppelspalt-und-quantenobjekte -->
In der naechsten MINT-Episode wechseln wir von der Quantenwelt in die chemische Thermodynamik und Biomedizin: Warum toetet uns ein Schluck Essig nicht sofort und wie haelt der Blutpuffer unser Leben stabil? Weiter geht es mit [Chemie-Puffer-und-Henderson-Hasselbalch-L1](Chemie-Puffer-und-Henderson-Hasselbalch-L1.md).
