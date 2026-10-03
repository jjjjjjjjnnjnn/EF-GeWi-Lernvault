---
fach: Physik
thema: "Quantenphysik: Der aeussere Photoeffekt, Gegenfeldmethode und Bestimmung von h"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, auswerten, beurteilen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Quantenphysik, Photoeffekt, Einstein, Lichtquantenhypothese, Gegenfeldmethode, Austrittsarbeit]
version: Lesson-v3
---

# Lernreise: Quantenphysik: Der aeussere Photoeffekt, Gegenfeldmethode und Bestimmung von h (L1, Ziel Klausur)

<!-- Campaign: Quantenmechanik-und-Atomphysik | Episode 4/10 | Krise: Warum versagt die klassische Wellentheorie des Lichts klaeglich beim Versuch zu erklaeren, warum grellstes rotes Flutlicht kein einziges Elektron aus einer Zinkplatte loest, schwaches blaues Licht hingegen sofort? | Zielgroessen: Aeussere Photoeffekt, Grenzfrequenz, Austrittsarbeit, kinetische Energie, Gegenfeldmethode, Gegenspannung U_g, Plancksches Wirkungsquantum h | Tool: balance-board -->

## Schritt 1 — entdecken: Das Raetsel der unberuehrten Zinkplatte
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能详尽列举经典波动理论（klassische Wellentheorie des Lichts）在解释外光电效应（aeussere Photoeffekt）时的三大致命矛盾：极限频率的存在（Grenzfrequenz）、光电子动能与光强无关（Intensitaetsunabhaengigkeit）以及能量释放的零时滞（keine Verzoegerungszeit）。
2. 中文：能运用爱因斯坦光量子假说（Einsteins Lichtquantenhypothese: $E_{\text{Ph}} = h \cdot f$）及光电效应方程（$E_{\text{kin,max}} = h \cdot f - W_A = e \cdot U_g$）严密解析光子与电子的“一对一碰撞吸收机制”。
3. 中文：能在高考物理实验大题（AFB I/II/III）中依据反向电压法（Gegenfeldmethode）的 $U_g(f)$-线性函数图像，通过斜率计算普朗克常数 $h$ 并由纵截距求取金属逸出功（Austrittsarbeit $W_A$）。

### Hook / Phaenomen

Stell dir vor, du stehst im Physik-Hoersaal vor einem negativ geladenen Zinkplatten-Elektroskop. Die beiden Zeiger spreizen sich weit auseinander. Zunaechst richtest du den gewaltigen, blendend hellen Strahl eines 10.000-Watt-Rotlicht-Scheinwerfers auf die Platte. Die Hitze laesst den Lack dampfen, und der Raum wird in grelles Licht getaucht. Doch was geschieht mit den Zeigern des Elektroskops? Absolut gar nichts! Die Zeiger bleiben starr gespreizt. Nun schaltest du den Riesenscheinwerfer aus und knipst eine winzige, kaum erkennbare ultraviolette Taschenlampe mit einer Leistung von Bruchteilen eines Milliwatts an. Binnen einer Millisekunde klappen die Zeiger des Elektroskops mit einem Schlag zusammen: Die Platte hat sich schlagartig entladen! Nach der klassischen Physik von Maxwell muesste die gewaltige Energie des roten Flutlichts die Elektronen wie Meereswellen wegschwemmen, waehrend die winzige UV-Funzel Stunden brauchen muesste, um genuegend Energie anzusammeln. Warum scheitert die Wellenlehre so dramatisch?

`Klausur-Satz: gemaess Einsteins Lichtquantenhypothese besteht Licht aus diskreten Energiequanten (Photonen) mit E = h * f; beim aeusseren Photoeffekt uebertraegt ein einzelnes Photon seine gesamte Energie in einem unteilbaren Elementarprozess an ein einzelnes Elektron.`

## Schritt 2 — entdecken: Das physikalische Vokabular der Photonik
PRETRAINING术语盒（核心4词，先读三遍中德，合书自测中文→德语）：

- 外光电效应 — Aeusserer Photoeffekt (Hallwachs-Effekt): Das Herausschlagen von gebundenen Leitungselektronen aus einer Metalloberflaeche durch Bestrahlung mit elektromagnetischer Strahlung oberhalb einer Grenzfrequenz.
- 光子能量与普朗克常量 — Photonenenergie & Plancksches Wirkungsquantum ($h$): Die Energie eines Lichtquants ist direkt proportional zu seiner Frequenz ($E = h \cdot f$ mit $h \approx 6{,}626 \cdot 10^{-34}\,\text{J}\cdot\text{s}$).
- 逸出功与极限频率 — Austrittsarbeit ($W_A$) & Grenzfrequenz ($f_{\text{grenz}}$): Die materialabhaengige Mindestenergie, die aufgebracht werden muss, um ein Elektron aus dem metallischen Gitterverband ins Vakuum zu befreien ($W_A = h \cdot f_{\text{grenz}}$).
- 反向电压法 — Gegenfeldmethode: Ein praezises Messverfahren mit einer Photozelle, bei dem eine regelbare Gegenspannung $U_g$ angelegt wird, die selbst die schnellsten Photoelektronen vor der Anode abbremst ($E_{\text{kin,max}} = e \cdot U_g$).

## Schritt 3 — entdecken: Die lineare $U_g(f)$-Kennlinie
ENTDECKEN（1概念 + 1文字图解）：

```diagram
Experimentelle Gegenfeldmethode und Einsteinsche Gerade:

Photokathode (Zink/Caesium)               Gegenspannung U_g
     [  METALL  ] ---- Photonen (h*f) ---->   [  ANODE  ]
          |                                        |
          +----------( Mikroamperemeter I )--------+

Einsteinsche Gerade im Koordinatensystem:
Gegenspannung U_g [V]
       ^
       |                                      / (Steigung m = h / e)
       |                                   /
       |                                /
       |                             /
  0 ---+--------------------------+---------------------> Frequenz f [Hz]
       |                       f_grenz (Nullstelle)
       |                     /
       |                  /
  -W_A/e ---------------- (Achsenabschnitt y = -W_A / e)
```

## Schritt 4 — ausprobieren: Das Photoeffekt-Labor zur h-Bestimmung
[Werkzeug: balance-board]
Balanciere auf dem quantenphysikalischen Balance-Board die gemessenen Gegenspannungswerte $U_g$ fuer verschiedene Spektrallinien an einer Caesium-Kathode:

| Spektrallinie (Lichtquelle) | Wellenlaenge $\lambda$ | Frequenz $f = \frac{c}{\lambda}$ | Gemessene Gegenspannung $U_g$ | Maximale kinetische Energie $E_{\text{kin}} = e \cdot U_g$ |
| :--- | :--- | :--- | :--- | :--- |
| **Gelb (Quecksilber)** | $578\,\text{nm}$ | $5{,}19 \cdot 10^{14}\,\text{Hz}$ | $0{,}18\,\text{V}$ | $0{,}18\,\text{eV} = 2{,}88 \cdot 10^{-20}\,\text{J}$ |
| **Gruen (Quecksilber)** | $546\,\text{nm}$ | $5{,}49 \cdot 10^{14}\,\text{Hz}$ | $0{,}31\,\text{V}$ | $0{,}31\,\text{eV} = 4{,}96 \cdot 10^{-20}\,\text{J}$ |
| **Blau-Violett (Hg)** | $436\,\text{nm}$ | $6{,}88 \cdot 10^{14}\,\text{Hz}$ | $0{,}88\,\text{V}$ | $0{,}88\,\text{eV} = 1{,}41 \cdot 10^{-19}\,\text{J}$ |
| **Ultraviolett (Hg)** | $365\,\text{nm}$ | $8{,}22 \cdot 10^{14}\,\text{Hz}$ | $1{,}44\,\text{V}$ | $1{,}44\,\text{eV} = 2{,}30 \cdot 10^{-19}\,\text{J}$ |

*Steigungsberechnung*:
$$m = \frac{\Delta U_g}{\Delta f} = \frac{1{,}44\,\text{V} - 0{,}18\,\text{V}}{8{,}22 \cdot 10^{14}\,\text{Hz} - 5{,}19 \cdot 10^{14}\,\text{Hz}} = \frac{1{,}26\,\text{V}}{3{,}03 \cdot 10^{14}\,\text{s}^{-1}} \approx 4{,}16 \cdot 10^{-15}\,\text{V}\cdot\text{s}$$
$$h = e \cdot m = 1{,}602 \cdot 10^{-19}\,\text{C} \cdot 4{,}16 \cdot 10^{-15}\,\text{V}\cdot\text{s} \approx 6{,}66 \cdot 10^{-34}\,\text{J}\cdot\text{s} \quad (\approx h_{\text{Literatur}})$$

## Schritt 5 — check: Das Konzeptduell
VERGLEICH: Klassische Wellenlehre versus Einsteins Lichtquantenhypothese

- **Klassische Wellenvorstellung (Maxwell)**: Licht breitet sich als kontinuierliche elektromagnetische Raumwelle aus. Die Energie haengt allein von der Amplitude (Intensitaet) ab. Bei hoeherer Intensitaet muessten die Elektronen mit hoeherer kinetischer Energie heraustreten; bei geringer Intensitaet muesste eine Verzoegerungszeit auftreten, bis das Elektron gengend Wellenenergie absorbiert hat.
- **Einsteins Photonenhypothese (1905, Nobelpreis)**: Licht besteht aus gequantelten Energiepaketen (Photonen). Ein Photon reagiert nach dem 'Alles-oder-Nichts-Prinzip' mit genau einem Elektron. Die Intensitaet bestimmt nur die ANZAHL der Photonen pro Sekunde (Photostromstaerke), waehrend allein die Frequenz $f$ die kinetische ENERGIE des einzelnen herausgeschlagenen Elektrons bestimmt!

## Schritt 6 — szenario: Die Klausuraufgabe
Eine Kalium-Photokathode besitzt eine Austrittsarbeit von $W_A = 2{,}25\,\text{eV}$. Sie wird mit monochromatischem Laserlicht der Wellenlaenge $\lambda = 405\,\text{nm}$ bestrahlt.

1. **AFB I**: Berechne die Frequenz des Laserlichts sowie die Photonenenergie $E_{\text{Ph}}$ sowohl in Joule als auch in Elektronenvolt.
2. **AFB II**: Ermittle die Grenzfrequenz $f_{\text{grenz}}$ von Kalium und berechne die maximale Geschwindigkeit $v_{\text{max}}$ der ausgeloesten Photoelektronen ($m_e = 9{,}109 \cdot 10^{-31}\,\text{kg}$).
3. **AFB III**: Diskutiere, wie sich (a) eine Verdopplung der Laserleistung bei konstanter Wellenlaenge und (b) ein Wechsel zu einem Laser mit $\lambda = 650\,\text{nm}$ auf die Gegenspannung $U_g$ und den Saettigungs-Photostrom $I_{\text{max}}$ auswirken.

`Musterloesungshinweis`:
- AFB I: $f = \frac{c}{\lambda} = \frac{3 \cdot 10^8\,\text{m/s}}{405 \cdot 10^{-9}\,\text{m}} = 7{,}41 \cdot 10^{14}\,\text{Hz}$. $E_{\text{Ph}} = h \cdot f = 6{,}626 \cdot 10^{-34} \cdot 7{,}41 \cdot 10^{14} \approx 4{,}91 \cdot 10^{-19}\,\text{J} = \frac{4{,}91 \cdot 10^{-19}}{1{,}602 \cdot 10^{-19}}\,\text{eV} \approx 3{,}06\,\text{eV}$.
- AFB II: $f_{\text{grenz}} = \frac{W_A}{h} = \frac{2{,}25 \cdot 1{,}602 \cdot 10^{-19}\,\text{J}}{6{,}626 \cdot 10^{-34}\,\text{J}\cdot\text{s}} = 5{,}44 \cdot 10^{14}\,\text{Hz}$. Da $f > f_{\text{grenz}}$, tritt der Photoeffekt ein: $E_{\text{kin,max}} = E_{\text{Ph}} - W_A = 3{,}06\,\text{eV} - 2{,}25\,\text{eV} = 0{,}81\,\text{eV} = 1{,}30 \cdot 10^{-19}\,\text{J}$. Da $E_{\text{kin}} \ll m_e c^2$, reicht nicht-relativistisch: $v_{\text{max}} = \sqrt{\frac{2 \cdot E_{\text{kin}}}{m_e}} = \sqrt{\frac{2 \cdot 1{,}30 \cdot 10^{-19}}{9{,}109 \cdot 10^{-31}}} \approx 5{,}34 \cdot 10^5\,\text{m/s}$.
- AFB III: (a) Verdopplung der Lichtleistung erhoeht die Photonendichte pro Sekunde; folglich verdoppelt sich der Saettigungsstrom $I_{\text{max}}$. Da die Frequenz unveraendert bleibt, bleibt die kinetische Energie und damit die noetige Gegenspannung $U_g = 0{,}81\,\text{V}$ exakt gleich. (b) Bei $\lambda = 650\,\text{nm}$ ist $f = 4{,}62 \cdot 10^{14}\,\text{Hz} < f_{\text{grenz}}$. Die Photonenenergie betraegt nur $1{,}91\,\text{eV} < 2{,}25\,\text{eV}$; es werden ueberhaupt keine Elektronen ausgeloest ($I = 0\,\text{A}$, kein Gegenfeld messbar).

## Schritt 7 — muendlich: Die muendliche Blitzpruefung
Simuliere ein muendliches Abiturszenario:

FRAGE: Pruefer: "Warum fuehrt eine Erhoehung der Lichtintensitaet beim Photoeffekt nicht zu schnelleren Elektronen, und welche revolutionaere Schlussfolgerung zog Einstein daraus?"

ANTWORT: Pruefling: "Nach der klassischen Physik muesste ein staerkeres Lichtfeld hoehere elektrische Feldstaerken besitzen und damit den Elektronen mehr kinetische Energie mitgeben. Experimentell sind die herausgeschlagenen Elektronen bei intensivem Licht jedoch exakt gleich schnell wie bei schwaechstem Glimmen derselben Wellenlaenge; es treten lediglich zahlenmaessig mehr Elektronen pro Sekunde aus. Einstein schlussfolgerte daraus revolutionaer, dass Licht keine gleichmaessig verteilte Welle ist, sondern aus unteilbaren Quanten (Photonen) besteht. Da die Wechselwirkung strikt als 1-zu-1-Kollision zwischen einem Photon und einem Elektron stattfindet, bestimmt ausschliesslich die Frequenz dieses einen Photons die Energiebilanz. Die Erhoehung der Intensitaet erhoeht lediglich die Zahl der eintreffenden Photonen, nicht deren individuellen Energieinhalt."

## Schritt 8 — reflexion: Metakognition und Fehlerschutz
Reflektiere deine Konzeptbeherrschung mit 3 diagnostischen Kontrollfragen:

1. Huetest du dich davor, bei der Formel $E = h \cdot f$ Frequenz $f$ und Wellenlaenge $\lambda$ zu verwechseln ($\lambda$ steht im Nenner: $E = \frac{h \cdot c}{\lambda}$)?
2. Warum schneidet die Einstein-Gerade im $U_g(f)$-Diagramm die Frequenzachse bei $f_{\text{grenz}}$ und nicht im Koordinatenursprung?
3. Kannst du den Unterschied zwischen der Austrittsarbeit des Kathodenmaterials und der Kontaktspannung zwischen Kathode und Anode erklaeren?

## Schritt 9 — reflexion: Der Spickzettel fuer die Klausur
SPICKZETTEL (Maximal 5 Merkpunkte, ideal zum Einpraegen vor dem Klausurbeginn):

- **Einstein-Gleichung**: $E_{\text{kin,max}} = h \cdot f - W_A = e \cdot U_g$.
- **Gegenfeldmethode**: Gegenspannung $U_g$ bremst schnellste Elektronen ab bis Fotostrom $I = 0$.
- **Einstein-Gerade**: Steigung $m = \frac{h}{e}$ (universell fuer alle Metalle!); $y$-Achsenabschnitt liefert Austrittsarbeit $-\frac{W_A}{e}$.
- **Intensitaet vs. Frequenz**: Intensitaet steuert Stromstaerke $I$ (Zahl der Elektronen); Frequenz steuert Kinetik $E_{\text{kin}}$ und $U_g$.
- **Wellenversagen**: Existenz der Grenzfrequenz und verzoegerungsfreie Ausloesung beweisen den Teilchencharakter des Lichts.
