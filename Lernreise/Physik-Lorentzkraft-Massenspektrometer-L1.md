---
fach: Physik
thema: "Lorentzkraft und Massenspektrometrie"
level: 1
ziel: Klausur
xp: 100
operatoren: [herleiten, berechnen, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Elektrodynamik, Lorentzkraft, Massenspektrometer, Magnetfeld]
version: Lesson-v3
---

# Lernreise: Lorentzkraft und Massenspektrometrie (L1, Ziel Klausur)

<!-- Campaign: Elektrodynamik-und-Teilchen | Episode 4/10 | Krise: Wie wiegt man Atome, die nur ein Millionstel Milliardstel Gramm wiegen? | Zielgroessen: Lorentzkraft, Zentripetalkraft, Wien-Filter, Massenspektrometer | Tool: lego -->

## Schritt 1 — entdecken: Die Waage fuer das Unsichtbare
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清洛伦兹力（Lorentzkraft $\vec{F}_L = q (\vec{v} \times \vec{B})$）的物理本质及右手定则（Drei-Finger-Regel der rechten Hand）。
2. 中文：能完整推导维恩速度选择器（Wien-Filter $v = \frac{E}{B}$）与质谱仪圆形偏转轨道半径公式（$r = \frac{m \cdot v}{q \cdot B}$）。
3. 中文：能在现代物理综合大题（AFB I/II/III）中利用偏转半径比精准计算同位素（Isotope: z.B. $^{235}\text{U}$ vs. $^{238}\text{U}$）的质量差并分析实验误差。

### Hook / Phaenomen

假如你手里有一小瓶无色透明的水，如何才能知道其中是否掺杂了极其罕见且有毒的重水同位素（氘 $^2\text{H}$）？世界上没有任何一杆机械天平能称量单个原子的重量——一个质子的质量只有微不足道的 $1.67 \times 10^{-27}\text{ kg}$！然而，物理学家却设计出了一种极其巧妙的“磁场天平”：让带电离子以极高速度射入磁场，洛伦兹力就会像一根看不见的绳索，把重的粒子甩向大圆弧，把轻的粒子甩向小圆弧。仅仅通过一把毫米刻度尺测量圆弧半径，就能测出分毫不差的原子的真实质量！

Hook / Phaenomen: Wie wiegt man ein einzelnes Atom? Kein Mikroskop und keine Laborwaage der Welt kann $10^{-26}\text{ Kilogramm}$ direkt erfassen. Als Francis Aston und Kenneth Bainbridge Anfang des 20. Jahrhunderts vor diesem Raetsel standen, nutzten sie eine fundamentale Entdeckung von Hendrik Lorentz: Eine elektrische Ladung, die sich durch ein Magnetfeld bewegt, erfahrt eine Kraft senkrecht zur Bewegungsrichtung und senkrecht zum Magnetfeld — die **Lorentzkraft**! Weil diese Kraft die Ionen auf eine praezise Kreisbahn zwingt, wirkt sie wie ein kosmischer Sortierer: Schwerere Isotope fliegen in weiten Radien, leichtere in engen Kurven. Das Massenspektrometer war geboren — die empfindlichste Waage des Universums.

`Klausur-Satz: Im homogenen Magnetfeld zwingt die Lorentzkraft geladene Teilchen auf eine Kreisbahn, deren Radius direkt proportional zur spezifischen Masse m/q ist.`

## Schritt 2 — entdecken: Ausruestungskiste der Elektrodynamik-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 洛伦兹力 — Lorentzkraft ($F_L = q \cdot v \cdot B$): 运动电荷在磁场中受到的垂直于速度与磁感应强度的偏转磁场力。 Die Kraft, die ein Magnetfeld auf eine bewegte elektrische Ladung ausuebt. Mechanismus: Vektorprodukt $\vec{F}_L = q (\vec{v} \times \vec{B})$, wirkt stets senkrecht zur Bewegung und verrichtet daher keine Beschleunigungsarbeit (reine Richtungsablenkung). Klausur-Tipp: Bei negativen Ladungen (Elektronen) die linke Hand benutzen oder Vorzeichen beachten!
- 三指法则 / 右手法则 — Drei-Finger-Regel (UVB-Regel): 判定正电荷受力方向的法则：拇指指向运动方向（Ursache $v$）、食指指向磁感线方向（Vermittlung $B$）、中指指向洛伦兹力方向（Wirkung $F_L$）。 Geometrische Merkregel fuer positive Ladungstraeger (Daumen = $\vec{v}$, Zeigefinger = $\vec{B}$, Mittelfinger = $\vec{F}_L$). Mechanismus: Rechtshaendiges Koordinatensystem. Klausur-Tipp: In Klausuren den Arm unauffaellig pruefen — nicht Hand verwechseln!
- 维恩速度选择器 — Wien-Filter (Geschwindigkeitsfilter): 电场与磁场相互垂直的空间，只有速度满足 $v = \frac{E}{B}$ 的带电粒子才能直线穿过而不发生偏转。 Eine Anordnung gekreuzter elektrischer ($E$) und magnetischer ($B$) Felder. Mechanismus: Kraeftegleichgewicht von Coulomb-Kraft und Lorentzkraft ($F_{el} = F_L \iff q E = q v B$). Klausur-Tipp: Ermoeglicht monoenergetische Teilchenstrahlen unabhaengig von Masse und Ladung!
- 质谱仪 — Massenspektrometer (nach Bainbridge): 结合速度选择器与半圆偏转磁场，用于分离与测量不同质量荷质比的带电粒子仪器。 Analytisches Instrument zur Bestimmung von Isotopenmassen anhand ihrer Bahnradien im Magnetfeld. Mechanismus: $r = \frac{m \cdot v}{q \cdot B}$; Radius waechst linear mit der Masse $m$. Klausur-Tipp: Herleitung aus $F_L = F_Z$ gehoert zum Pflichtprogramm in Klausuren!
- 荷质比 / 比电荷 — Spezifische Ladung ($q/m$): 粒子的电荷量与静止质量的比值，是带电微观粒子的核心指纹常数。 Das Verhaeltnis von elektrischer Ladung zu Traegheitsmasse. Mechanismus: Bestimmt die Beschleunigung und Kruemmung in elektromagnetischen Feldern. Klausur-Tipp: Historische Bestimmung des Elektrons durch J.J. Thomson (Fadenstrahlrohr).

`Klausur-Satz: Da die Lorentzkraft stets senkrecht auf dem Geschwindigkeitsvektor steht, fungiert sie als reine Zentripetalkraft und aendert nur die Bewegungsrichtung, nicht aber den Betrag der kinetischen Energie.`

## Schritt 3 — entdecken: Der mathematische Dreisatz der Teilchenwaage
ENTDECKEN（1概念 + 1文字图解）：

中文：推导质谱仪的轨道半径仅需两步，这构成了德国高中物理力学与电磁学结合最严谨的考题：
1. 维恩滤速器中的受力平衡：
   $$F_{\text{el}} = F_L \implies q \cdot E = q \cdot v \cdot B_1 \implies v = \frac{E}{B_1}$$
2. 偏转室中的向心力平衡：
   $$F_L = F_Z \implies q \cdot v \cdot B_2 = m \cdot \frac{v^2}{r} \implies r = \frac{m \cdot v}{q \cdot B_2} = \frac{m \cdot E}{q \cdot B_1 \cdot B_2}$$

文字图解（ASCII 质谱仪实验装置与轨迹分离）：

```diagram
Aufbau des Bainbridge-Massenspektrometers:

   [ Ionenquelle ]
         |
         v (q, m)
   +-----------+  Wien-Filter (gekreuzte Felder E und B1):
   |  +  +  +  |  Plattenkondensator (E nach unten)
   |  o  o  o  |  B1 senkrecht aus der Zeichenebene
   |  -  -  -  |  Nur Teilchen mit v = E/B1 fliegen geradeaus!
   +-----------+
         |
         v Eintritts-Blende S (mit exakter Geschwindigkeit v)
  =============================================================
   Ablenkkammer (homogenes Magnetfeld B2 senkrecht in die Ebene):
   
         |
         |         . - ~ - .   Leichtes Isotop m1 (kleiner Radius r1)
         |     . '           ' .
         |   .                   x Detektor 1: d1 = 2*r1
         |  .
         | .          . - ~ - ~ - .   Schweres Isotop m2 (grosser Radius r2)
         |.       . '               ' .
         |     .                         x Detektor 2: d2 = 2*r2
```

`Klausur-Satz: Der Abstand zwischen zwei Detektionspunkten auf dem Fotoschirm betraegt $\Delta d = 2 \cdot (r_2 - r_1)$ und erlaubt die hochpraezise Isotopenunterscheidung.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Im geheimen Manhattan-Projekt (1943) standen die amerikanischen Physiker vor einem scheinbar unloesbaren Problem: Sie mussten das seltene, spaltbare Uran-Isotop $^{235}\text{U}$ von dem unspaltbaren $^{238}\text{U}$ trennen. Der Massenunterschied betraegt gerade einmal 1,2 Prozent! Nobelpreistraeger Ernest Lawrence baute daraufhin in Oak Ridge gigantische Riesen-Massenspektrometer namens "Calutrons". Weil wackere Kupfermengen im Krieg knapp waren, lieh sich die US-Armee heimlich **14.000 Tonnen reines Feinsilber** aus den Tresoren der Bundesbank (Fort Knox), schmolz es ein und wickelte daraus die Spulen der gewaltigen Elektromagneten!

**中文解读**: 1943 年曼哈顿工程制造原子弹时，科学家面临绝境：必须把能裂变的铀-235 从只重 1.2% 的普通铀-238 矿石中分离出来。诺奖得主劳伦斯决定用质谱仪暴力筛选，建造了代号“电磁分离器（Calutron）”的庞然大物。由于当时战时铜线极度匮乏，美国军方竟然动用绝密特权，从美国诺克斯堡联邦黄金储备库里秘密借出了 **14,000 吨纯银条**！工人们把上万吨国库白银熔化拉成电磁线圈，用来制造偏转同位素的超级磁场！

**Bezug zum Konzept**: `Die elektromagnetische Isotopentrennung im Calutron basiert exakt auf der Massenabhaengigkeit des Bahnradius im transversalen Magnetfeld.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Isotopentrennung im Abitur
Kontinuitaet: Vorher Physik-Gleichfoermige-Kreisbewegung-L1.md | Nachher Physik-Spezielle-Relativitaet-Lichtuhr-L1.md. Krise dieser Episode: Wie wiegt man Atome, die nur ein Millionstel Milliardstel Gramm wiegen? Zielgroessen: Lorentzkraft, Zentripetalkraft, Wien-Filter, Massenspektrometer

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: lego]

AUFGABE (herleiten & berechnen, AFB I/II)：
Einfach positiv geladene Kalium-Ionen ($q = +e = 1,602 \times 10^{-19}\text{ C}$) treten nach Durchlaufen eines Wien-Filters ($E = 8,0 \times 10^4\text{ V/m}$, $B_1 = 0,20\text{ T}$) senkrecht in das Magnetfeld $B_2 = 0,50\text{ T}$ eines Massenspektrometers ein. Auf dem Detektorschirm werden zwei Auftreffpunkte im Abstand von $\Delta d = 1,66\text{ cm}$ registriert.
1. Leiten Sie die Formel fuer die Geschwindigkeit $v$ im Wien-Filter und den Bahnradius $r$ in der Ablenkkammer her. (10 BE)
2. Berechnen Sie die Geschwindigkeit der Ionen sowie die Masse des leichteren Isotops $^{39}\text{K}$, dessen Bahnradius $r_1 = 16,2\text{ cm}$ betraegt. (20 BE)

HILFE:
1. Schritt 1: Wien-Filter: Kraeftegleichgewicht $q E = q v B_1 \implies v = E/B_1$.
2. Schritt 2: Ablenkkammer: Lorentzkraft = Zentripetalkraft $q v B_2 = m v^2/r \implies r = \frac{m v}{q B_2} \implies m = \frac{q B_2 r}{v}$.
3. Schritt 3: Zahlenwerte einsetzen (Einheiten sauber kuerzen!).

MUSTERLÖSUNG:
1. Herleitung:
   - Im Wien-Filter stehen das elektrische Feld $\vec{E}$ und das Magnetfeld $\vec{B}_1$ senkrecht zueinander. Auf ein einfach positiv geladenes Ion wirken die Coulomb-Kraft $F_{\text{el}} = q \cdot E$ und die Lorentzkraft $F_{L,1} = q \cdot v \cdot B_1$. Teilchen, die den Filter ungebeugt auf einer geraden Linie passieren, muessen das Kraeftegleichgewicht erfuellen:
     $$F_{\text{el}} = F_{L,1} \iff q \cdot E = q \cdot v \cdot B_1 \implies v = \frac{E}{B_1}$$
   - In der nachgeschalteten Ablenkkammer wirkt ausschliesslich das Magnetfeld $\vec{B}_2$. Die Lorentzkraft steht stets orthogonal zur Geschwindigkeit und wirkt somit als Radial- bzw. Zentripetalkraft:
     $$F_{L,2} = F_Z \iff q \cdot v \cdot B_2 = \frac{m \cdot v^2}{r} \implies r = \frac{m \cdot v}{q \cdot B_2}$$
2. Berechnung:
   - Ionengeschwindigkeit:
     $$v = \frac{8,0 \times 10^4\text{ V/m}}{0,20\text{ T}} = 4,0 \times 10^5\text{ m/s}$$
   - Masse des Kalium-Isotops ($r_1 = 0,162\text{ m}$):
     $$m_1 = \frac{q \cdot B_2 \cdot r_1}{v} = \frac{1,602 \times 10^{-19}\text{ C} \cdot 0,50\text{ T} \cdot 0,162\text{ m}}{4,0 \times 10^5\text{ m/s}}$$
     $$m_1 = \frac{1,2976 \times 10^{-19}}{4,0 \times 10^5} \approx 3,244 \times 10^{-26}\text{ kg}$$
   - Zur Kontrolle in atomaren Masseneinheiten $u$ ($1\text{ u} = 1,6605 \times 10^{-27}\text{ kg}$):
     $$\frac{3,244 \times 10^{-26}}{1,6605 \times 10^{-27}} \approx 39,05\text{ u}$$
     Dies bestaetigt praezise das Isotop Kalium-39 ($^{39}\text{K}$).

`Klausur-Satz: Durch das Zusammenspiel von Wien-Filter und magnetischer Kreisablenkung laesst sich die Ionenmasse exakt auf Grundgroessen der Kinematik und Elektrizitaetslehre zurueckfuehren.`

## Schritt 5 — ausprobieren: Duell der Felder: Elektrisch vs. Magnetisch

VERGLEICH: Ablenkung im homogenen E-Feld vs. homogenen B-Feld

- Position A (Elektrisches Querfeld / Parabelbahn):
  - Kraftrichtung: Parallel zu den elektrischen Feldlinien ($\vec{F}_{\text{el}} = q \vec{E}$); unabhaengig von der Teilchengeschwindigkeit.
  - Bahnkurve: Quadratische Wurfparabel (konstante Beschleunigung senkrecht zur Eintrittsrichtung).
  - Energieaenderung: Die Coulomb-Kraft verrichtet Arbeit; der Betrag der Geschwindigkeit nimmt staendig zu.
  - Technische Anwendung: Braunsche Roehre (historischer Roehrenfernseher), Oszilloskop.
- Position B (Magnetisches Querfeld / Kreisbahn):
  - Kraftrichtung: Senkrecht zur Geschwindigkeit und senkrecht zu den Feldlinien ($\vec{F}_L = q (\vec{v} \times \vec{B})$).
  - Bahnkurve: Exakter Kreisbogen (konstanter Kruemmungsradius $r$).
  - Energieaenderung: Keine Arbeit ($W = 0$), Betrag der Geschwindigkeit bleibt streng konstant; nur die Richtung dreht sich.
  - Technische Anwendung: Massenspektrometer, Zyklotron, Kernfusionsreaktor (Tokamak).

Entscheidungsregel fuer die Klausur:
Wird nach `Energieaenderung im Magnetfeld` gefragt, immer sofort antworten: "Ein statisches Magnetfeld verrichtet an einer freien Ladung NIEMALS Beschleunigungsarbeit, da $\vec{F}_L \perp \vec{v}$ gilt ($\Delta E_{\text{kin}} = 0$)!"

## Schritt 6 — check: Klausur-Transfer Zyklotron & Relativistische Grenze
PRÜFUNGSSZENARIO (KLP NRW Physik GK/LK Inhaltsfeld 3: Elektrodynamik und Quantenphysik):

In einem Zyklotron kreisen Protonen im homogenen Magnetfeld $B$. Zur Beschleunigung dient eine hochfrequente Wechselspannung zwischen zwei Duanten (D-foermige Elektroden).
Die Umlaufzeit eines Protons betraegt $T = \frac{2 \pi m}{q B}$.

AUFGABE (herleiten & problematisieren, AFB II/III):
1. Leiten Sie die Unabhaengigkeit der Umlaufzeit $T$ vom Bahnradius $r$ her. (12 BE)
2. Problematisieren Sie die physikalische Grenze des klassischen Zyklotrons bei Geschwindigkeiten nahe der Lichtgeschwindigkeit ($v > 0,1 c$). (18 BE)

ERWARTUNGSHORIZONT:
- AFB II:
  - Aus $q v B = m \frac{v^2}{r} \implies v = \frac{q B r}{m}$.
  - Umlaufzeit: $T = \frac{2 \pi r}{v} = \frac{2 \pi r}{\frac{q B r}{m}} = \frac{2 \pi m}{q B}$.
  - Da sich der Radius $r$ vollstaendig herauskuerzt, ist die Zeit fuer einen halben Umlauf konstant: Zwar wird der Radius bei zunehmender Geschwindigkeit groesser, der Weg verlaengert sich aber im exakt selben Verhaeltnis wie die Geschwindigkeit! Die Beschleunigungsfrequenz kann starr bleiben.
- AFB III:
  - Bei relativistischen Geschwindigkeiten ($v > 0,1 c$) waechst die relativistische Masse bzw. Energie des Protons ($m(v) = \frac{m_0}{\sqrt{1 - v^2/c^2}}$).
  - Dadurch verlaengert sich die Umlaufzeit $T$. Das Teilchen kommt zu spaet am Spalt zwischen den Duanten an und geraet ausser Phase mit der konstanten Hochfrequenz (es wird gebremst statt beschleunigt). Das klassische Zyklotron versagt und muss durch ein Synchrotron ersetzt werden, bei dem Magnetfeld und Hochfrequenz dynamisch an die relativistische Masse angepasst werden.

## Schritt 7 — check: Format-Check & Scoring
30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche Bedingung muss fuer die Geschwindigkeit $v$ im Wien-Filter erfuellt sein, damit Teilchen unbeeinflusst geradeaus fliegen?
ANTWORT: $v = \frac{E}{B}$ (elektrische Feldstaerke geteilt durch magnetische Flussdichte).

FRAGE: Warum aendert ein statisches Magnetfeld niemals den kinetischen Energiebetrag eines geladenen Teilchens?
ANTWORT: Weil die Lorentzkraft stets exakt senkrecht zur Bewegungsrichtung steht und daher keine physikalische Arbeit verrichtet.

FRAGE: Welche Handregel verwendet man zur Richtungsbestimmung der Lorentzkraft bei negativ geladenen Elektronen?
ANTWORT: Die Drei-Finger-Regel der LINKEN Hand (oder rechte Hand mit Umkehrung des Kraftvektors).

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission
REFLEXION:
Du beherrschst nun eines der elegantesten Messverfahren der experimentellen Physik. Du kannst Ionenbahnen im Magnetfeld berechnen, Massenspektrogramme auswerten und verstehst die Funktionsweise des Wien-Filters.

<!-- reflexion: physik-lorentzkraft-massenspektrometer -->
In der naechsten Physik-Episode tauchen wir ein in Albert Einsteins revolutionaere Relativitaetstheorie: Warum vergeht die Zeit in einer bewegten Lichtuhr langsamer? Weiter geht es mit [Physik-EF-2-Weltbild-und-Zeitdilatation](Physik-EF-2-Weltbild-und-Zeitdilatation.md).
