---
fach: Physik
thema: "Der Photoelektrische Effekt und Einsteins Lichtquantenhypothese"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, erklaeren, berechnen]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Physik, Quantenphysik, Photoeffekt, Einstein, Photon, Gegenfeldmethode]
version: Lesson-v3
---

# Lernreise: Der Photoelektrische Effekt und Einsteins Lichtquantenhypothese (L1, Ziel Klausur)

<!-- Campaign: Quantenmechanik-und-Atomphysik | Episode 3/10 | Krise: Warum schlaegt rotes Flutlicht kein Elektron aus Zink, aber schwaches UV-Licht sofort? | Zielgroessen: Hallwachs-Effekt, Grenzfrequenz, Austrittsarbeit, Gegenfeldmethode | Tool: balance-board -->

## Schritt 1 — entdecken: Das Raetsel der Zinkplatte
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清经典麦克斯韦电磁波理论（klassische Wellentheorie）在解释光电效应（Hallwachs-Effekt / Photoeffekt）时的三大灾难性破产点。
2. 中文：能完整推导爱因斯坦光电效应能量方程（$E_{\text{kin,max}} = h \cdot f - W_A = e \cdot U_G$）与反向截止电压法（Gegenfeldmethode）测量普朗克常数 $h$ 的数学原理。
3. 中文：能在近代物理实验图表分析大题（AFB I/II/III）中利用 $U_G(f)$ 截距斜率直线精准求取截止频率（Grenzfrequenz $f_g$）与金属逸出功（Austrittsarbeit $W_A$）。

### Hook / Phaenomen

在物理实验室里，你给一块连接在验电器上的锌板充上负电荷（多余电子），验电器的指针张开。现在，你推来一台功率高达 2000 瓦的超强红色探照灯——光芒刺眼得令人无法直视，照在锌板上甚至能把金属烤得滚烫！按照经典物理学常识，电磁波蕴含着巨大的能量，照射时间越久、光强越强，电子吸收的能量就应该越多，验电器迟早会放电闭合。然而，哪怕你照射一整天，验电器的指针纹丝不动！接着，你关掉探照灯，拿出一支功率仅有 2 瓦的微弱紫外线（UV）小手电筒，轻轻扫过锌板一秒钟——验电器的指针竟然像触电一样瞬间合拢，所有电子瞬间被一扫而空！为什么 2000 瓦的强光毫无作用，而 2 瓦的弱光却势不可挡？

Hook / Phaenomen: Nimm eine negativ geladene Zinkplatte an einem Elektroskop. Bestrahlst du sie mit einem gigantischen 2000-Watt-Scheinwerfer aus rotem Licht, passiert absolut rein gar nichts — das Elektroskop bleibt voll geladen, egal wie lange du wartest! Knipst du jedoch ein winziges, lichtschwaches 2-Watt-Taschenlaempchen mit unsichtbarem ultraviolettem (UV) Licht an, schlaegt der Zeiger des Elektroskops im Bruchteil einer Sekunde auf null zurueck! Nach der klassischen Physik von James Clerk Maxwell war das ein voelliges Mysterium: Licht galt als kontinuierliche Welle — mehr Intensitaet haette mehr Energie liefern muessen! 1905 loeste ein 26-jaehriger Patentamtsangestellter namens Albert Einstein das Raetsel mit einem genialen Gedanken: Licht ist kein kontinuierlicher Wellenbrei, sondern ein Hagel von Energiepaketen — den **Lichtquanten (Photonen)**!

`Klausur-Satz: Der photoelektrische Effekt beweist die Teilchennatur des Lichts: Die kinetische Energie herausgeschlagener Photoelektronen haengt ausschliesslich von der Frequenz des Lichts ab, waehrend die Lichtintensitaet lediglich die Anzahl der pro Zeiteinheit ausgeloesten Elektronen bestimmt.`

## Schritt 2 — entdecken: Ausruestungskiste der Photoeffekt-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 光量子 / 光子 — Lichtquant / Photon ($E = h \cdot f$): 光在空间中传播与被吸收时不可分割的能量包，其能量只由频率 $f$ 和普朗克常数 $h$ 决定。 Ein unteilbares Energiepaket elektromagnetischer Strahlung. Mechanismus: Energieuebertragung erfolgt nach dem Alles-oder-Nichts-Prinzip: Ein Photon wechselwirkt immer mit exakt einem Elektron. Klausur-Tipp: Bei Verdopplung der Lichtintensitaet verdoppelt sich die Anzahl der Photonen, NICHT die Energie des einzelnen Photons!
- 逸出功 — Austrittsarbeit ($W_A$): 电子为了克服金属表面原子核及电子云的束缚引力逃离金属所需消耗的最小结合能。 Die materialabhaengige Mindestenergie, die aufgebracht werden muss, um ein Elektron aus der Metalloberflaeche zu loesen. Mechanismus: Bindungsenergie der Leitungselektronen an das Gitter. Klausur-Tipp: $W_A$ ist eine feste Materialkonstante (z.B. Caesium: ca. 2,1 eV; Platin: ca. 5,3 eV)!
- 截止频率 / 阈值频率 — Grenzfrequenz ($f_g = \frac{W_A}{h}$): 能够引发光电效应的最低光波频率；当 $f < f_g$ 时，无论光强多大，均不可能释放任何电子。 Die minimale Lichtfrequenz, bei der die Photonenenergie gerade der Austrittsarbeit entspricht ($h \cdot f_g = W_A$). Mechanismus: Unterhalb von $f_g$ reicht die Energie eines einzelnen Photons nicht zur Ionisation aus. Klausur-Tipp: Grenzwellenlaenge berechnet sich ueber $\lambda_g = \frac{c}{f_g}$!
- 截止电压法 / 反向电压法 — Gegenfeldmethode (Gegenspannungsmethode): 通过对光电管施加反向可调减速电压 $U_G$，使具有最大动能的电子刚好减速至零（电流降为 0），以此精确测量 $E_{\text{kin,max}}$。 Eine experimentelle Methode zur Bestimmung der maximalen kinetischen Energie der Photoelektronen. Mechanismus: $E_{\text{kin,max}} = e \cdot U_G$; die elektrische Bremsarbeit kompensiert die Bewegungsenergie. Klausur-Tipp: Im Diagramm $U_G(f)$ entspricht die Steigung exakt dem Quotienten $h/e$!
- 饱和光电流 — Saettigungsstrom ($I_S$): 当光电管加上正向加速电压后，金属板释放出的所有电子均被阳极收集时达到的恒定最大电流。 Der maximale Photostrom, wenn alle emittierten Elektronen die Anode erreichen. Mechanismus: Proportional zur Bestrahlungsstaerke (Intensitaet) des einfallenden Lichts. Klausur-Tipp: Unterscheidung: Frequenz bestimmt $U_G$, Intensitaet bestimmt $I_S$!

`Klausur-Satz: In der Gegenfeldmethode kompensiert die elektrische Feldarbeit $e \cdot U_G$ die maximale kinetische Energie der Photoelektronen, sodass aus der Steigung der linearen Funktion $U_G(f)$ das Plancksche Wirkungsquantum $h$ bestimmt werden kann.`

## Schritt 3 — entdecken: Die lineare Kennlinie des Photoeffekts
ENTDECKEN（1概念 + 1文字图解）：

中文：爱因斯坦光电方程是能量守恒在微观量子世界的直接体现：
$$E_{\text{Photon}} = W_A + E_{\text{kin,max}} \iff h \cdot f = W_A + e \cdot U_G$$
通过对截止电压 $U_G$ 变形，可得标准的线性一次函数方程：
$$U_G(f) = \frac{h}{e} \cdot f - \frac{W_A}{e}$$
- 该直线的斜率（Steigung）为宇宙通用普适常数：$m = \frac{h}{e} \approx 4,136 \times 10^{-15}\text{ V}\cdot\text{s}$（与金属材质无关！所有金属的直线互相平行）。
- 横轴截距（Nullstelle）即为截止频率：$f_g = \frac{W_A}{h}$。
- 纵轴截距（$y$-Achsenabschnitt）即为负逸出电位：$-\frac{W_A}{e}$。

文字图解（ASCII 反向截止电压与光照频率线性关系图）：

```diagram
Lineare Kennlinie der Gegenfeldmethode UG(f):

  Gegenspannung UG (V)
       ^
       |                                     / (Metall 1: z.B. Caesium)
       |                                    /
       |                                   /       / (Metall 2: z.B. Zink)
       |                                  /       /
       |               Steigung m = h/e  /       /
       |                                /       /  (Beide Geraden PARALLEL!)
      0+-------------------------------+-------+-----------------------> Frequenz f
       |                              /       /
       |                             /fg1    /fg2 (Grenzfrequenz)
       |                            /       /
       |                           /       /
 -WA/e v                          /       /
```

`Klausur-Satz: Da die Steigung der Geraden $m = h/e$ eine universelle Naturkonstante repraesentiert, verlaufen die Kennlinien unterschiedlicher Metalle im $U_G(f)$-Diagramm exakt parallel zueinander.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wusstest du, wofuer Albert Einstein 1921 seinen einzigen Nobelpreis fuer Physik erhielt? Nicht fuer die beruehmte Spezielle Relativitaetstheorie, nicht fuer $E=mc^2$ und auch nicht fuer die Allgemeine Relativitaetstheorie und die Kruemmung der Raumzeit! Das Nobelpreiskomitee in Stockholm fand Einsteins Relativitaetstheorie damals viel zu abstrakt, spekulativ und unbewiesen. Stattdessen verliehen sie ihm den Preis ausdruecklich *"fuer seine Verdienste um die theoretische Physik, besonders fuer seine Entdeckung des Gesetzes des photoelektrischen Effekts"*. Einstein aerguerte sich heimlich so sehr darueber, dass er in seiner offiziellen Nobelpreis-Vorlesung in Stockholm fast ausschliesslich ueber seine Relativitaetstheorie sprach!

**中文解读**: 很多人以为爱因斯坦得诺贝尔奖是因为相对论或著名的质能方程 $E=mc^2$。实际上，保守的瑞典诺贝尔奖评审委员会当年认为广义相对论“过于前卫、缺乏确凿实验证据”，迟迟不敢颁奖。直到 1921 年，他们才找了一个无可辩驳的扎实理论——爱因斯坦对**光电效应定律的解释**，把诺奖补发给他！爱因斯坦对此哭笑不得，在去斯德哥尔摩发表获奖演说时，他甚至几乎对光电效应只字未提，全场激情澎湃地大讲特讲他最心爱的相对论！

**Bezug zum Konzept**: `Einsteins Deutung des Photoeffekts begruendete die moderne Quantenphysik und fuehrte zum fundamentalen Konzept des Photons.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Laborauswertung Gegenfeldmethode
Kontinuitaet: Vorher Physik-Doppelspalt-und-Quantenobjekte-L1.md | Nachher Physik-GK-3-Elektromagnetische-Induktion-und-Energieuebertragung.md. Krise dieser Episode: Warum schlaegt rotes Flutlicht kein Elektron aus Zink, aber schwaches UV-Licht sofort? Zielgroessen: Hallwachs-Effekt, Grenzfrequenz, Austrittsarbeit, Gegenfeldmethode

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: balance-board]

AUFGABE (berechnen & erklaeren, AFB I/II)：
In einem Schuellerexperiment zur Gegenfeldmethode wird eine Photozelle mit Licht verschiedener Spektrallinien bestrahlt. Die Messung der Gegenspannung $U_G$, bei der der Photostrom exakt abreisst, liefert folgende Messwerte:
- Messung 1: Wellenlaenge $\lambda_1 = 365\text{ nm}$ ($f_1 = 8,22 \times 10^{14}\text{ Hz}$), Gegenspannung $U_{G,1} = 1,40\text{ V}$
- Messung 2: Wellenlaenge $\lambda_2 = 436\text{ nm}$ ($f_2 = 6,88 \times 10^{14}\text{ Hz}$), Gegenspannung $U_{G,2} = 0,85\text{ V}$
(Elementarladung $e = 1,602 \times 10^{-19}\text{ C}$, Lichtgeschwindigkeit $c = 3,00 \times 10^8\text{ m/s}$).
1. Berechnen Sie aus diesen Messwerten das Plancksche Wirkungsquantum $h$. (10 BE)
2. Bestimmen Sie die Austrittsarbeit $W_A$ der Photokathode in Elektronenvolt (eV) sowie die Grenzfrequenz $f_g$. (20 BE)

HILFE:
1. Schritt 1: Steigung bestimmen: $m = \frac{\Delta U_G}{\Delta f} = \frac{U_{G,1} - U_{G,2}}{f_1 - f_2} = \frac{h}{e} \implies h = e \cdot \frac{\Delta U_G}{\Delta f}$.
2. Schritt 2: Austrittsarbeit berechnen: $W_A = h \cdot f_1 - e \cdot U_{G,1}$.
3. Schritt 3: In eV umrechnen ($1\text{ eV} = 1,602 \times 10^{-19}\text{ J}$).
4. Schritt 4: Grenzfrequenz: $f_g = \frac{W_A}{h}$.

MUSTERLÖSUNG:
1. Bestimmung des Planckschen Wirkungsquantums $h$:
   - Aus der Einsteinschen Geradengleichung $U_G(f) = \frac{h}{e} \cdot f - \frac{W_A}{e}$ folgt fuer zwei Messpunkte:
     $$\Delta U_G = \frac{h}{e} \cdot \Delta f \implies h = e \cdot \frac{U_{G,1} - U_{G,2}}{f_1 - f_2}$$
   - Einsetzen der Messwerte:
     $$\Delta U_G = 1,40\text{ V} - 0,85\text{ V} = 0,55\text{ V}$$
     $$\Delta f = 8,22 \times 10^{14}\text{ Hz} - 6,88 \times 10^{14}\text{ Hz} = 1,34 \times 10^{14}\text{ s}^{-1}$$
     $$h = 1,602 \times 10^{-19}\text{ C} \cdot \frac{0,55\text{ V}}{1,34 \times 10^{14}\text{ s}^{-1}} = 1,602 \times 10^{-19} \cdot 4,104 \times 10^{-15} \approx 6,57 \times 10^{-34}\text{ J}\cdot\text{s}$$
   - **Ergebnis**: Der experimentell ermittelte Wert von $h \approx 6,57 \times 10^{-34}\text{ J}\cdot\text{s}$ stimmt hervorragend mit dem Literaturwert ($6,626 \times 10^{-34}\text{ J}\cdot\text{s}$) ueberein (Abweichung unter 1%).
2. Berechnung von Austrittsarbeit $W_A$ und Grenzfrequenz $f_g$:
   - Berechnung der Austrittsarbeit:
     $$W_A = h \cdot f_1 - e \cdot U_{G,1} = 6,57 \times 10^{-34}\text{ J}\cdot\text{s} \cdot 8,22 \times 10^{14}\text{ s}^{-1} - 1,602 \times 10^{-19}\text{ C} \cdot 1,40\text{ V}$$
     $$W_A = 5,400 \times 10^{-19}\text{ J} - 2,243 \times 10^{-19}\text{ J} = 3,157 \times 10^{-19}\text{ J}$$
   - Umrechnung in Elektronenvolt:
     $$W_A\text{ (in eV)} = \frac{3,157 \times 10^{-19}\text{ J}}{1,602 \times 10^{-19}\text{ J/eV}} \approx 1,97\text{ eV}$$
   - Grenzfrequenz $f_g$:
     $$f_g = \frac{W_A}{h} = \frac{3,157 \times 10^{-19}\text{ J}}{6,57 \times 10^{-34}\text{ J}\cdot\text{s}} \approx 4,80 \times 10^{14}\text{ Hz}$$
   - (Dies entspricht einer Grenz-Wellenlaenge von $\lambda_g = \frac{c}{f_g} \approx 625\text{ nm}$ im orangen Spektralbereich).

`Klausur-Satz: Bei Bestrahlung mit Frequenzen unterhalb von $f_g = 4,80 \times 10^{14}\text{ Hz}$ tritt unabhaengig von der Lichtintensitaet kein messbarer Photostrom auf.`

## Schritt 5 — ausprobieren: Duell der Lichttheorien: Welle vs. Quant

VERGLEICH: Wellenmodell nach Maxwell vs. Quantenmodell nach Einstein

- Position A (Klassische Wellentheorie / Kontinuierliche Energie):
  - Prognose 1: Die kinetische Energie der Elektronen muesste mit der Intensitaet (Lichtamplitude) steigen. (FALSCH: Die Energie haengt nur von $f$ ab!).
  - Prognose 2: Bei extrem schwachem Licht muesste eine messbare Zeitverzoegerung (mehrere Minuten/Stunden) auftreten, bis ein Elektron genuegend Wellenenergie aufgesaugt hat. (FALSCH: Elektronen treten verzuegungsfrei im Nanosekundenbereich aus!).
  - Prognose 3: Jedes Licht muesste bei genuegender Helligkeit Elektronen ausloesen. (FALSCH: Rotes Licht scheitert immer!).
- Position B (Einsteins Lichtquantenhypothese / Diskrete Photonen):
  - Erklaerung 1: Ein Photon uebergibt seine gesamte Energie $h \cdot f$ an ein einzelnes Elektron (1-zu-1-Wechselwirkung).
  - Erklaerung 2: Ist $h \cdot f < W_A$, reicht die Einzelportion nicht aus $\to$ kein Austritt!
  - Erklaerung 3: Hoehere Intensitaet bedeutet lediglich einen dichteren Hagel von Photonen $\to$ mehr Elektronen pro Sekunde, aber keine hoehere Einzelenergie!

Entscheidungsregel fuer die Klausur:
Wird nach dem `Versagen der klassischen Physik` gefragt, immer die drei Punkte nennen: 1. Keine Zeitverzoegerung, 2. Unwirksamkeit von hoher Intensitaet bei $f < f_g$, 3. Proportionalitaet von $E_{\text{kin,max}}$ zu $f$ statt zu $I$!

## Schritt 6 — check: Klausur-Transfer Solarzelle & Photomultiplier
PRÜFUNGSSZENARIO (KLP NRW Physik GK/LK Inhaltsfeld 3: Quantenphysik / Technische Anwendungen):

In der Astrophysik werden schwach leuchtende Sterne mit einem Photomultiplier (Sekundaerelektronenvervielfacher) untersucht. Dabei loest ein einzelnes einfallendes Photon an einer Photokathode ein Primarelektron aus, welches durch eine Kaskade von 10 Dynoden jeweils um den Faktor 4 verstaerkt wird.

AUFGABE (berechnen & erklaeren, AFB II/III):
1. Berechnen Sie die Gesamtanzahl der Elektronen, die nach Durchlaufen der 10 Dynoden an der Anode gemessen werden. (10 BE)
2. Erklaeren Sie, warum Halbleiter-Solarzellen fuer langwellige Infrarotstrahlung ($h \cdot f < E_{\text{Bandluecke}}$) vollstaendig transparent sind und keinen Strom erzeugen. (20 BE)

ERWARTUNGSHORIZONT:
- AFB II:
  - Bei jeder Dynode vervierfacht sich die Anzahl der Sekundaerelektronen ($k = 4$).
  - Bei $n = 10$ Dynoden betraegt die Gesamtverstaerkung:
    $$N = k^n = 4^{10} = (2^2)^{10} = 2^{20} = 1.048.576\text{ Elektronen!}$$
  - Ein einziges Photon erzeugt einen messbaren Stromimpuls von ueber 1 Million Elektronen an der Anode.
- AFB III:
  - In einer Halbleiter-Solarzelle (z.B. Silizium) muessen Elektronen vom Valenzband ueber die Bandluecke ($E_g \approx 1,1\text{ eV}$) in das Leitungsband gehoben werden (innerer Photoeffekt).
  - Gemaess Einsteins Quantenhypothese kann ein Photon nur dann absorbiert werden, wenn seine Energie mindestens der Bandluecke entspricht: $h \cdot f \ge E_g$.
  - Langwellige Infrarotstrahlung besitzt eine zu geringe Frequenz ($h \cdot f < E_g$). Da ein Elektron nicht zwei Photonen nacheinander "halb" absorbieren kann (Einteilchen-Prozess), kann das Photon mit den Valenzelektronen nicht in Wechselwirkung treten. Der Halbleiter ist fuer dieses Licht optisch transparent; das Licht passiert das Silizium ungehindert ohne Ladungstraegergeneration.

## Schritt 7 — check: Format-Check & Scoring
30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche physikalische Eigenschaft des Lichts bestimmt die maximale Geschwindigkeit der herausgeschlagenen Photoelektronen?
ANTWORT: Die Frequenz des Lichts (bzw. die Wellenlaenge, da $E = h \cdot f$).

FRAGE: Was bewirkt eine Erhoehung der Lichtintensitaet (Helligkeit) bei gleichbleibender Frequenz oberhalb der Grenzfrequenz?
ANTWORT: Sie erhoeht die Anzahl der pro Zeiteinheit herausgeschlagenen Elektronen (hoeherer Saettigungsstrom), laesst aber deren maximale kinetische Energie unveraendert.

FRAGE: Welche fundamentale Naturkonstante laesst sich aus der Steigung der Kennlinie im $U_G(f)$-Diagramm experimentell bestimmen?
ANTWORT: Das Plancksche Wirkungsquantum $h$ (ueber die Beziehung $\text{Steigung} = h/e$).

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission
REFLEXION:
Du hast verstanden, warum Albert Einstein mit dem Photoeffekt das Fundament der Quantenrevolution legte. Du beherrschst die Gegenfeldmethode im Schlaf, kannst Kennlinien auswerten und weisst, wie Photonen die klassische Physik pulverisierten.

<!-- reflexion: physik-photoeffekt-und-einstein -->
In der naechsten MINT-Episode wechseln wir in die organische Reaktionsmechanik der Chemie: Was entscheidet darueber, ob ein Molekuel Rueckseitenangriff oder Carbokation waehlt? Weiter geht es mit [Chemie-Reaktionsmechanismen-SN1-vs-SN2-L1](Chemie-Reaktionsmechanismen-SN1-vs-SN2-L1.md).
