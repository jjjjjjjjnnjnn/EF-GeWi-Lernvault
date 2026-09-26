---
fach: Bio
thema: "Populationsdynamik — exponentielles vs. logistisches Wachstum (Modellierung + Varianten)"
operatoren: [beschreiben, zuordnen, berechnen, begruenden, vergleichen, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Bio, Oekologie, Populationsdynamik]
stufe: "Q1"
kursart: "LK"
---

# Varianten-Training-Bio · Populationsdynamik（建模 + 三变式）

> **中文一句话**：把种群增长当成数学建模题来做——**先写 Modellannahmen，再数学化，再求解，最后回译成生物学结论**；指数增长只在前 5 年成立，逻辑斯谛增长才是全程。
>
> **本篇分工（与已有笔记不重复）**：`06_Bio/Populationsdynamik-Wachstumsmodelle.md` 是**概念/术语/机制卡**（J 型 vs S 型、K 值、r/K 策略，AFB I–II **定性**）；`Bio-EF-Oekologie-Training.md` 是 EF 生态基础。本篇只做三件事：**① 定量建模计算 ② 德国评分惯例与 Rechengang 规范 ③ 三道变式 + AFB III Modellkritik**。
>
> ⛔ **分层**：`exponentielles/logistisches Wachstum`、`Kapazitätsgrenze K` 属 **Q1-LK 增量**（KLP IF 4 Ökologie，LK-Inkrement）。**GK 卷面写 J 型/S 型/K 值 = 超纲**，LK 卷面只定性描述「种群波动」不给模型 = 深度不足。
> ⏳ 待确认：Tag 首标签按仓库惯例写 `EF`，但内容层级为 **Q1/LK**；若主线程另有 Tag 规范，请据 `AGENTS.md §2` 统一调整。

---

## 1. Standard-Modellierungsaufgabe（标准德语建模题）

> ⚠️ 原创仿写 Modelltext（仿 NRW-Abitur materialgebundene Aufgabe / Aufgabenart I 风格撰写，非真实出版物摘录；数据与人名均为虚构）`[原创仿写]`

### 1.1 Material

**M 1 — Sachkontext: Damwild in einem eingezäunten Gehege**

In einem 250 ha großen, eingezäunten Gehege in der Niederung eines Tieflandbachs wird seit dem Frühjahr 2015 eine Herde Damwild gehalten; zu Beginn wurden 40 Tiere ausgesetzt. Natürliche Feinde fehlen, im Winter wird zugefüttert, und die Tiere finden ganzjährig Deckung in einem Mischwaldstreifen mit angrenzendem Grünland. Jedes Frühjahr erfassen Mitarbeitende des Geheges den Bestand durch wiederholte Zählungen an mehreren aufeinanderfolgenden Tagen; die Ergebnisse werden auf ganze Tiere gerundet. Seit dem sechsten Jahr häufen sich Meldungen über Verbisschäden an jungen Laubbäumen und über eine abnehmende Deckung der Grasnarbe in Ufernähe. Die Gehegeleitung prüft daher, ob der Bestand künftig durch gezielte Entnahmen reguliert werden muss. Zur Vorbereitung dieser Entscheidung soll die bisherige Bestandsentwicklung mit zwei Wachstumsmodellen beschrieben und verglichen werden: dem exponentiellen Modell (konstante Wachstumsrate, unbegrenzte Ressourcen) und dem logistischen Modell (Wachstumsrate nimmt mit steigender Dichte ab, Annäherung an eine Kapazitätsgrenze). Für das logistische Modell werden eine Wachstumsrate von $r = 0{,}40\ \mathrm{a^{-1}}$ und eine Kapazitätsgrenze von $K = 400$ Individuen angenommen. In der Modellierung werden **keine Zu- und Abwanderung**, **keine Alters- und Geschlechtsstruktur** sowie **keine Zeitverzögerung** berücksichtigt.

**M 2 — Datenreihe: Bestandszählung 2015–2025** (Erhebung jeweils im Frühjahr, Werte auf ganze Individuen gerundet)

| $t$ (Jahre nach der Aussetzung) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Jahr | 2015 | 2016 | 2017 | 2018 | 2019 | 2020 | 2021 | 2022 | 2023 | 2024 | 2025 |
| $N$ (Individuen) | 40 | 57 | 79 | 108 | 142 | 180 | 220 | 259 | 293 | 321 | 343 |

Hinweis: $t = 0$ entspricht dem Frühjahr 2015; $N$ ist die **Bestandsgröße in Individuen**, a = Jahr (annus). Alle Modellwerte sind auf ganze Individuen gerundet.

`[Wortzahl Materialteil (M 1 + M 2 inkl. Hinweis): 208]`

### 1.2 Aufgabenstellung（30 BE）

> **a)** Beschreiben Sie den Verlauf der Datenreihe (M 2) und ordnen Sie ihn einem der beiden Wachstumsmodelle zu. Begründen Sie Ihre Zuordnung mit zwei Kennzeichen des Verlaufs. `(AFB I–II, 5 BE)`
>
> **b)** Berechnen Sie für die Intervalle $0 \rightarrow 1$, $4 \rightarrow 5$ und $9 \rightarrow 10$ den jährlichen Zuwachs $\Delta N$ sowie die relative Zuwachsrate $\dfrac{\Delta N/\Delta t}{N}$ (Bezug: Bestand am Intervallanfang). Zeigen Sie, dass die relative Zuwachsrate mit zunehmendem Bestand abnimmt. `(AFB II, 6 BE)`
>
> **c)** Bestimmen Sie die Kapazitätsgrenze $K$ aus der Datenreihe. Berechnen Sie anschließend mit $K = 400$ Individuen und $r = 0{,}40\ \mathrm{a^{-1}}$ die Wachstumsgeschwindigkeit $\dfrac{dN}{dt}$ für $N = 100$, $N = 200$ und $N = 300$ Individuen und geben Sie an, bei welchem Bestand sie maximal ist. `(AFB II, 7 BE)`
>
> **d)** Berechnen Sie die Prognose des exponentiellen Modells $N(t) = N_0 \cdot e^{r \cdot t}$ für $t = 5$ Jahre und vergleichen Sie sie mit dem Wert der Datenreihe. Berechnen Sie außerdem, nach welcher Zeit der Bestand nach dem logistischen Modell die Hälfte der Kapazitätsgrenze erreicht. `(AFB II, 6 BE)`
>
> **e)** Beurteilen Sie, inwieweit das logistische Modell geeignet ist, die künftige Bestandsentwicklung im Gehege vorherzusagen. `(AFB III, 6 BE)`

### 1.3 中文题干理解 + 考点映射

**中文理解（4 句）**：一个 250 ha 围栏鹿苑从 2015 年起放养 40 头黇鹿，无天敌、冬季补饲，每年春季清点一次，得到 11 年数据。数据先加速增长、后趋缓并逼近某个上限——题目要求先判模型，再定量算出「每年增加多少头」和「相对增长率如何下降」，由此反推容量上限 K 与增长最快点 K/2。随后把「指数模型的外推值」与实测值对比，暴露指数模型忽略 **Umweltwiderstand（环境阻力）** 的缺陷；最后在 AFB III 层面评判模型的适用边界。

| 项 | 内容 |
|---|---|
| Inhaltsfeld | **IF 4 Ökologie** — Teilbereich *Populationsdynamik / idealisierte Populationsentwicklung*（**Q1-LK-Inkrement**） |
| Basiskonzept | *Steuerung und Regelung*（dichteabhängige Rückkopplung）· *Struktur und Funktion*（Bestandsdichte ↔ Ressourcenangebot） |
| Operator | beschreiben · zuordnen · begründen (a) · **berechnen** (b, c, d) · vergleichen (d) · **beurteilen** (e) |
| AFB | I（5 BE）→ II（19 BE）→ III（6 BE）；II : III ≈ 76 : 24 |
| BE | **30 BE**，建议 **50 min**（见 §6） |

---

## 2. DE-Lösungsstandard（德国官方标准解题步骤）

### 2.0 Modellierungszyklus（先写这一行，再动笔算）

德国建模题的给分骨架是 **五步循环**，卷面上把这五个词写出来就等于把「思路分」钉住：

`Modellannahmen formulieren` → `mathematisieren` → `lösen` → `interpretieren` → `überprüfen`

> *Klausur-Satz (Einleitung)*: Ich gehe von einer geschlossenen Population mit konstanter Wachstumsrate $r$ und konstanter Kapazitätsgrenze $K$ aus; die Altersstruktur und Zeitverzögerungen bleiben unberücksichtigt.

### 2.1 Teilaufgabe a) — Verlauf beschreiben und Modell zuordnen (5 BE)

| 要素 | 内容 |
|---|---|
| **Was ist zu tun** | *Werte die Datenreihe aus: berechne die jährlichen Zuwächse, beschreibe den Verlauf und ordne ihn einem Wachstumsmodell zu.* |
| **Rechengang** | Zuwächse $\Delta N$ pro Intervall (Individuen): $17;\ 22;\ 29;\ 34;\ 38;\ \mathbf{40};\ 39;\ 34;\ 28;\ 22$<br>Zuwachsfaktoren $\lambda = N_{t+1}/N_t$: $57/40 = 1{,}43$; $180/142 = 1{,}27$; $343/321 = 1{,}07$ |
| **Antwortsatz** | Der Bestand wächst zunächst beschleunigt; der jährliche Zuwachs steigt bis zum Intervall vom 5. zum 6. Jahr auf seinen höchsten Wert von 40 Individuen und nimmt danach wieder ab, während sich die Kurve einem Grenzwert von etwa 400 Individuen nähert. **Daher ordne ich die Datenreihe dem logistischen Wachstum (S-förmiger Verlauf) zu.** |
| **Plausibilitätskontrolle** | Der Zuwachsfaktor $\lambda$ ist **nicht konstant** ($1{,}43 \rightarrow 1{,}27 \rightarrow 1{,}07$), sondern fällt monoton — das ist das entscheidende Gegenargument gegen exponentielles Wachstum, das ein **konstantes** $\lambda$ verlangt. |

### 2.2 Teilaufgabe b) — Zuwachs und relative Zuwachsrate (6 BE)

| 要素 | 内容 |
|---|---|
| **Was ist zu tun** | *Berechne für drei Intervalle den Zuwachs $\Delta N$, die Wachstumsgeschwindigkeit $\Delta N/\Delta t$ und die relative Zuwachsrate $(\Delta N/\Delta t)/N$.* |
| **Rechengang** | **0 → 1:** $\Delta N = 57 - 40 = 17\ \text{Individuen}$; $\Delta N/\Delta t = \dfrac{17\ \text{Individuen}}{1\ \mathrm{a}} = 17\ \mathrm{Individuen \cdot a^{-1}}$; $\dfrac{17}{40}\,\mathrm{a^{-1}} = 0{,}425\ \mathrm{a^{-1}} = \mathbf{42{,}5\ \% \cdot a^{-1}}$<br>**4 → 5:** $\Delta N = 180 - 142 = 38\ \text{Individuen}$; $38\ \mathrm{Individuen \cdot a^{-1}}$; $\dfrac{38}{142}\,\mathrm{a^{-1}} = 0{,}2676\ \mathrm{a^{-1}} = \mathbf{26{,}8\ \% \cdot a^{-1}}$<br>**9 → 10:** $\Delta N = 343 - 321 = 22\ \text{Individuen}$; $22\ \mathrm{Individuen \cdot a^{-1}}$; $\dfrac{22}{321}\,\mathrm{a^{-1}} = 0{,}0685\ \mathrm{a^{-1}} = \mathbf{6{,}9\ \% \cdot a^{-1}}$ |
| **Antwortsatz** | Die relative Zuwachsrate sinkt von $42{,}5\ \% \cdot \mathrm{a^{-1}}$ über $26{,}8\ \% \cdot \mathrm{a^{-1}}$ auf $6{,}9\ \% \cdot \mathrm{a^{-1}}$; sie nimmt also mit wachsendem Bestand monoton ab. Das ist der quantitative Ausdruck des **Umweltwiderstands**. |
| **Plausibilitätskontrolle** | Modellwerte für die Momentanrate $\dfrac{1}{N}\dfrac{dN}{dt} = r \cdot \dfrac{K - N}{K}$: für $N = 40$: $0{,}40 \cdot 0{,}90 = 0{,}36\ \mathrm{a^{-1}}$; für $N = 142$: $0{,}40 \cdot 0{,}645 = 0{,}258\ \mathrm{a^{-1}}$; für $N = 321$: $0{,}40 \cdot 0{,}1975 = 0{,}079\ \mathrm{a^{-1}}$. Die Datenwerte liegen **erwartungsgemäß etwas darüber** ($0{,}425 / 0{,}268 / 0{,}069$), weil $\Delta N$ über ein ganzes Jahr gemittelt wird, in dem $N$ bereits weiter zunimmt (Diskretisierung). Als logarithmische Mittelrate ergäbe sich z. B. $\ln(57/40)/1\ \mathrm{a} = 0{,}354\ \mathrm{a^{-1}}$ — das passt zu $0{,}36\ \mathrm{a^{-1}}$. |

> ⚠️ 德国评分要点：三个区间**各写一行**、每行都带 Einheit，才算「Zwischenergebnisse sichtbar」。只写「42,5 / 26,8 / 6,9」三数 = 可能只拿一半分。

### 2.3 Teilaufgabe c) — Kapazitätsgrenze und Wachstumsgeschwindigkeit (7 BE)

| 要素 | 内容 |
|---|---|
| **Was ist zu tun** | *Bestimme $K$ aus der Datenreihe, setze dann in die logistische Differenzialgleichung ein und berechne $\dfrac{dN}{dt}$ für drei Bestandsgrößen.* |
| **Rechengang** | **K-Bestimmung:** Der größte Jahreszuwachs (40 Individuen) liegt im Intervall $5 \rightarrow 6$, in dem der Bestand von 180 auf 220 Individuen steigt, im Mittel also bei $N = 200$ Individuen liegt. Beim logistischen Wachstum ist $\dfrac{dN}{dt}$ bei $N = \dfrac{K}{2}$ maximal $\Rightarrow K = 2 \cdot 200 = \mathbf{400\ Individuen}$. (Stützung: die Kurve flacht ab und nähert sich 400.)<br><br>$$\frac{dN}{dt} = r \cdot N \cdot \frac{K - N}{K}$$<br><br>$N = 100$: $\dfrac{dN}{dt} = 0{,}40\ \mathrm{a^{-1}} \cdot 100\ \text{Individuen} \cdot \dfrac{300\ \text{Individuen}}{400\ \text{Individuen}} = 40\ \mathrm{Individuen \cdot a^{-1}} \cdot 0{,}75 = \mathbf{30\ Individuen \cdot a^{-1}}$<br>$N = 200$: $= 0{,}40\ \mathrm{a^{-1}} \cdot 200 \cdot \dfrac{200}{400} = 80\ \mathrm{Individuen \cdot a^{-1}} \cdot 0{,}50 = \mathbf{40\ Individuen \cdot a^{-1}}$<br>$N = 300$: $= 0{,}40\ \mathrm{a^{-1}} \cdot 300 \cdot \dfrac{100}{400} = 120\ \mathrm{Individuen \cdot a^{-1}} \cdot 0{,}25 = \mathbf{30\ Individuen \cdot a^{-1}}$ |
| **Antwortsatz** | Die Kapazitätsgrenze beträgt $K = 400$ Individuen. Die Wachstumsgeschwindigkeit ist bei $N = \dfrac{K}{2} = 200$ Individuen mit $40\ \mathrm{Individuen \cdot a^{-1}}$ maximal; bei $N = 100$ und $N = 300$ Individuen liegt sie jeweils bei $30\ \mathrm{Individuen \cdot a^{-1}}$. |
| **Plausibilitätskontrolle** | **Symmetrieprobe:** $\dfrac{dN}{dt}(100) = \dfrac{dN}{dt}(300) = 30\ \mathrm{Individuen \cdot a^{-1}}$ — die Wachstumsgeschwindigkeit ist eine Parabel, die symmetrisch zu $N = K/2 = 200$ liegt, und $100 + 300 = 400 = K$. Außerdem stimmt der berechnete Maximalwert 40 mit dem größten gemessenen Jahreszuwachs (40 Individuen) überein. Biologische Deutung: bei $N = K/2$ wirkt der Umweltwiderstand erst zur Hälfte, weil $\dfrac{K - N}{K} = 0{,}50$. |

### 2.4 Teilaufgabe d) — Exponentialprognose und Halbzeit von K (6 BE)

| 要素 | 内容 |
|---|---|
| **Was ist zu tun** | *Wende das exponentielle Modell an, vergleiche mit dem Datenwert, und löse die logistische Modellgleichung nach t auf.* |
| **Rechengang** | **(1) Exponential:** $N(5) = N_0 \cdot e^{r \cdot t} = 40\ \text{Individuen} \cdot e^{0{,}40\ \mathrm{a^{-1}} \cdot 5\ \mathrm{a}} = 40 \cdot e^{2{,}0}\ \text{Individuen} = 40 \cdot 7{,}3891 = \mathbf{295{,}6 \approx 296\ Individuen}$<br>Vergleich: $295{,}6 - 180{,}3 = 115{,}3 \approx \mathbf{116\ Individuen}$; das sind $\dfrac{115{,}3}{180{,}3} = 0{,}64 = \mathbf{64\ \%}$ des Datenwertes.<br><br>**(2) Zeitpunkt $N = K/2$:** $$N(t) = \frac{K}{1 + \frac{K - N_0}{N_0} \cdot e^{-r t}} = \frac{400}{1 + 9 \cdot e^{-0{,}40\,t}}$$<br>$$\frac{K}{2} = 200 = \frac{400}{1 + 9 e^{-0{,}40 t}} \Rightarrow 2 = 1 + 9 e^{-0{,}40 t} \Rightarrow e^{-0{,}40 t} = \frac{1}{9}$$<br>$$-0{,}40\,t = -\ln 9 = -2{,}1972 \Rightarrow t = \frac{2{,}1972}{0{,}40}\ \mathrm{a} = \mathbf{5{,}49\ a}$$ |
| **Antwortsatz** | Das exponentielle Modell prognostiziert für das Jahr 5 einen Bestand von **296 Individuen** und liegt damit um rund **116 Individuen (≈ 64 %)** über dem gezählten Wert von 180 Individuen. Die Hälfte der Kapazitätsgrenze (200 Individuen) wird nach dem logistischen Modell nach $t = \dfrac{\ln 9}{0{,}40\ \mathrm{a^{-1}}} = \mathbf{5{,}5\ Jahren}$, also im Herbst 2020, erreicht. |
| **Plausibilitätskontrolle** | **Größenordnung:** Nach 10 Jahren ergäbe das Exponentialmodell $40 \cdot e^{4{,}0} = 40 \cdot 54{,}6 = 2184$ Individuen — das sind $8{,}7\ \mathrm{Individuen \cdot ha^{-1}}$ und damit das Fünffache von $K$; der Ansatz ist für diesen Zeitraum offensichtlich unbrauchbar. **Kreuzprobe zum Zeitpunkt $t = 5{,}49\ \mathrm{a}$:** das Exponentialmodell liefert dort $40 \cdot e^{\ln 9} = 40 \cdot 9 = 360$ Individuen $= 0{,}90 \cdot K$, tatsächlich gezählt wurden 200 Individuen — Faktor 1,8. Das bestätigt, dass der Umweltwiderstand ab etwa $N \approx 0{,}4\,K$ nicht mehr vernachlässigbar ist. |

### 2.5 Teilaufgabe e) — Modellkritik, AFB III (6 BE)

| 要素 | 内容 |
|---|---|
| **Was ist zu tun** | *Beurteile die Eignung des Modells: nenne Kriterien, wäge ab, fälle ein begründetes Urteil.* |
| **Rechengang** (Argumentaufbau) | **Kriterium 1 — Passung:** Das Modell bildet die Messreihe über zehn Jahre gut ab (Modellwerte 57/79/108/142/180/220/259/293/321/343 weichen nach Rundung kaum von M 2 ab).<br>**Kriterium 2 — Geltungsgrenze der Annahmen:** $K$ wird als Konstante behandelt, ist aber vom Nahrungsangebot, von Witterung und vom Verbisszustand abhängig; $r$ ist alters- und geschlechtsabhängig; die Tragzeit bewirkt eine **Zeitverzögerung**, die das Modell nicht enthält.<br>**Kriterium 3 — praktische Messbarkeit:** $K$ ist für Wildbestände nicht direkt messbar, Zählungen sind mit Beobachtungsfehlern behaftet (Witterung, Deckung).<br>**Kriterium 4 — blinder Fleck:** Bei sehr kleinen Beständen greift der **Allee-Effekt** (erschwerte Partnerfindung), den das Modell nicht abbildet. |
| **Antwortsatz (Urteil)** | Ich beurteile das logistische Modell als **eingeschränkt geeignet**: Es liefert eine verlässliche **Tendenz und Größenordnung** sowie eine begründete Handlungsregel (Zielbestand nahe $K/2 = 200$ Individuen, Entnahme bei Überschreiten), **aber keine Punktprognose**, weil $K$ und $r$ keine Konstanten sind und Altersstruktur sowie Zeitverzögerung fehlen. Für die Gehegeplanung ist es daher nur in Verbindung mit jährlichen Zählungen, einer Abschätzung von $K$ aus dem Vegetationszustand und einer Sicherheitsmarge verwendbar. |

> **Bewertung 三段模板（可背诵）**：`Kriterium` – *Als Kriterium lege ich die … an.* → `Abwägung` – *Einerseits …, andererseits …* → `Urteil` – *Ich beurteile … als eingeschränkt/nicht geeignet, weil …; daher …*

### 2.6 德国评分惯例 5 条（Bewertungspraxis）

1. **Zwischenschritte 必须可见**：结果对但无过程 = **0 BE**。指数题必须写出 $e^{2{,}0} = 7{,}3891$，逻辑斯谛题必须写出代入后的中间乘积（如 $80 \cdot 0{,}50$）。
2. **Einheit 全程携带**：不仅最终值要带 `Individuen` / `Individuen·a⁻¹` / `a⁻¹`，**每一个 Zwischenergebnis** 也要带；$r$ 的单位是 $\mathrm{a^{-1}}$，$\frac{K - N}{K}$ 是 **dimensionslos**（要在卷面上写一句「dimensionslos」）。
3. **Antwortsatz 必写**：`berechnen` 类子题的最后一行必须是完整德语句（含 Ergebnis + Einheit + 生物学 Deutung），纯数字不给满分。
4. **变量与 Modellannahmen 明确定义**：动笔前写「$N$ = Bestandsgröße in Individuen, $t$ = Zeit in Jahren (a), $r$ = Wachstumsrate in $\mathrm{a^{-1}}$, $K$ = Kapazitätsgrenze in Individuen」+ 一句 Annahme（geschlossene Population, konstantes $K$, keine Zeitverzögerung）。
5. **图表必须 beschriftet**：自绘草图要有 **Achsenbezeichnung + Einheit + Skala + Legende**；缺一项即扣分。纵轴写 $\dfrac{dN}{dt}\ /\ \mathrm{Individuen \cdot a^{-1}}$，横轴写 $N$ / Individuen。

---

## 3. 🇨🇳 CN-Methode vs DE-Standard（中德极速洞察技巧对比）

| 环节 | 中国技法（具体可操作） | 德国标准做法 | 合规性 | 在 Abitur 怎么用（且不丢分） |
|---|---|---|---|---|
| **① λ / J 型曲线口诀** | 「**λ 恒定才是 J 型**」：$\lambda = N_{t+1}/N_t$，先算三点 λ（1,43 / 1,27 / 1,07），λ 一路下降 → 直接判 S 型，不必看图 | *Vergleich der Zuwachsfaktoren $\lambda$; exponentielles Wachstum verlangt konstantes $\lambda$* | ✅ | 把「λ 三点」写成 **三行 Rechengang**，再补一句 Antwortsatz：*Da λ monoton abnimmt, liegt kein exponentielles Wachstum vor.* 三步 = 满分 |
| **② K 值与环境容纳量** | 「**K 是长期容纳量不是最大值；K/2 长得最快；K 会随环境变**」；由最大年增量所在区间反推 $K = 2 \cdot N_{\text{maxZuwachs}}$ | *Kapazitätsgrenze $K$ = Asymptote; Umweltwiderstand $\frac{K-N}{K}$; Maximum von $\frac{dN}{dt}$ bei $N = K/2$* | ✅ | 不能只报 K，要写**推导句**：*Der größte Zuwachs liegt bei N ≈ 200, und da dN/dt bei K/2 maximal ist, folgt K = 400 Individuen.* |
| **③ 坐标图三步判读** | 「**看走向 → 找拐点/平台 → 说机制**」：走向定 S 型，拐点 = $K/2$，平台 = 出生率 ≈ 死亡率（**不是停止繁殖**） | *Kurvenauswertung: Verlauf – Extremum/Wendepunkt – Ursache; jede Skizze mit Achsen + Einheit + Skala* | ✅ | 「平台 = 停止繁殖」是德国卷面**经典零分句**，必须写：*Im Plateau gilt Geburtenrate ≈ Sterberate; die Reproduktion läuft weiter.* |
| **④ 半衰期式速算** | 倍增时间 $T_2 = \dfrac{\ln 2}{r} \approx \dfrac{0{,}69}{r}$ → $r = 0{,}40\ \mathrm{a^{-1}}$ 时 **1,7 a**；逼近 K 段用「**缺口半衰期**」：$\dfrac{\ln 2}{r \cdot N/K}$，在 $N \approx 0{,}9K$ 时约 $\dfrac{0{,}69}{0{,}40 \cdot 0{,}9} = \mathbf{1{,}9\ a}$ | *Abschätzung der Größenordnung (Überschlagsrechnung) als Kontrolle, nicht als Lösung* | ⚠️ | 只能作 **Plausibilitätskontrolle** 写在最后一行；**不能代替**精确求解，否则按「无 Rechengang」扣分 |
| **⑤ 设而不求（无量纲化）** | 令 $x = N/K$，DGL 变为 $\dfrac{dx}{dt} = r\,x(1-x)$；令 $u = \dfrac{K-N}{N}$，则 $u = 9e^{-rt}$，求 $t$ 时根本不用先算 $N$ | *Substitution einführen und **explizit definieren**: „Setze $x = N/K$ (dimensionslos)“* | ⚠️ | 换元**必须书面定义**，否则视为未定义变量（扣分点 ④）；写 `Setze u = (K−N)/N` + 一句 «dimensionslos» 即合规 |
| **⑥ 特值 / 极限检验** | 代 $N \to 0$（应还原指数增长）、$N \to K$（应有 $\frac{dN}{dt} \to 0$）、$N = K/2$（应得 $\frac{rK}{4}$） | *Grenzbetrachtung / Plausibilitätsprüfung am Rand des Definitionsbereichs* | ✅ | 写成独立一句 **Probe**：*Für N → K geht dN/dt → 0; das Modell verhält sich im Grenzfall plausibel.* 属于**加分项**，德国评分惯例鼓励 |
| **⑦ 量纲检验** | 先查量纲：$[\frac{dN}{dt}] = \mathrm{Individuen \cdot a^{-1}}$；$[r] = \mathrm{a^{-1}}$；$[\frac{K-N}{K}] = 1$。量纲不对 → 公式一定代错 | *Einheitenkontrolle an jedem Zwischenergebnis* | ✅ | 在 Rechengang 后加半行 `Einheitenprobe: a⁻¹ · Individuen · 1 = Individuen·a⁻¹ ✓`，德国卷面**直接认作过程分** |
| **⑧ 对称与换元化简** | 「**抛物线关于 K/2 对称**」：$\frac{dN}{dt}(N) = \frac{dN}{dt}(K-N)$ → 算出 $N=100$ 得 30，立刻知道 $N=300$ 也是 30，**省一次计算**，且两根之和必为 $K$ | *Symmetrie der logistischen Parabel; Probe durch den zweiten Wert* | ✅ | 省下的计算**要换成一句检验句**：*Wegen der Symmetrie muss dN/dt(300) ebenfalls 30 betragen; die Probe bestätigt es.* —— 既快又有过程 |
| **⑨ 结果反代验证** | 求出 $t = 5{,}49\ \mathrm{a}$ 后反代：$400/(1+9e^{-2{,}197}) = 400/(1+1) = 200$ ✓；二次方程两根代回原式各得 24 | *Probe durch Einsetzen in die Ausgangsgleichung* | ✅ | 反代是德国 **Operator `überprüfen`** 的正面得分动作，务必单列一行 «Probe» |
| **⑩ 估算定位答案区间** | 先框区间：$K/2 = 200$ 在 180 与 220 之间 → 答案必落此间；若算出 900 或 20，立刻知道模型选错；指数外推 2184 ≫ K → 判废 | *Größenordnungskontrolle / Überschlagsrechnung vor dem exakten Rechnen* | ✅ | 写在 **Antwortsatz 之后**作为 Kontrolle，绝不写在解答开头替代计算 |
| **⑪ 数形结合** | 画 $\frac{dN}{dt}$–$N$ 抛物线：零点在 $N=0$ 与 $N=K$，顶点在 $K/2$，用图读出「最大增长点」与「负增长区」 | *Skizze mit beschrifteten Achsen, Einheit, Skala und Legende* | ⚠️ | 草图**未标注坐标轴/单位 = 扣分**；正确的快法是「画框 + 两个零点 + 顶点 + 单位」四处标注即可，10 秒完成 |

### 3.1 哪些「心算跳步」在德国评分下会丢分，怎么改成「又快又满分」

**❌ 会丢分的中国式写法**：① 只写答案 `40`；② 写 `= 40`（无单位、无 Zwischenergebnis）；③ 用口诀一句「K/2 最大」代替计算；④ 换元不定义；⑤ 心算 $e^2 \approx 7{,}4$ 后不再写出；⑥ 图表只有两条曲线没有 Achsen。

**✅ 改成「3-Zeilen-Kompromiss」（三行拿满过程分，约 20 秒）**：

```text
Gegeben:  r = 0,40 a⁻¹,  K = 400 Individuen,  N = 100 Individuen.
dN/dt = r · N · (K − N)/K = 0,40 a⁻¹ · 100 Individuen · (400 − 100) Individuen / 400 Individuen
      = 40 Individuen·a⁻¹ · 0,75 = 30 Individuen·a⁻¹          [dimensionsloser Faktor: 0,75]
Die Wachstumsgeschwindigkeit beträgt bei N = 100 Individuen 30 Individuen pro Jahr.
```

> 口诀变形记：**中国口诀负责「选对方向 + 少算一次」，德国卷面负责「把省下的那一次写成一句 Probe/Symmetrie/Einheitenprobe」**——技巧不丢，过程分不丢。

---

## 4. Fehlerquellen（扣分避坑要点，12 条）

| 坑 | 典型表现 | 丢分后果 | 规避动作（德语动作指令） |
|---|---|---|---|
| **1. 单位缺失 / 换算错** | 写 `r = 0,40`（无 $\mathrm{a^{-1}}$）；把 $\mathrm{Individuen}$ 写成 $\mathrm{Individuen \cdot a^{-1}}$；年份与月份混用 | 每个 Teil 扣 1–2 BE；单位错 = 结果错 | `Schreiben Sie zu jedem Zwischenergebnis die Einheit: Individuen, Individuen·a⁻¹, a⁻¹, Individuen·ha⁻¹.` |
| **2. 过早舍入** | $e^{2} \to 7{,}4$ 再乘 40 = 296（碰巧对）或 $\ln 9 \to 2{,}2$ 得 $t = 5{,}5$ 却无法反代 | 后续误差放大；Probe 对不上 → 判为「Rechenfehler」 | `Rechnen Sie mit voller Genauigkeit und runden Sie erst im Endergebnis (Individuen: ganze Zahl; Raten: eine Nachkommastelle).` |
| **3. 无 Antwortsatz** | 只写 `= 30` 或只画一个框 | AFB II 的 Deutung 分全丢（常 1–2 BE） | `Formulieren Sie jeden Teil mit einem vollständigen Antwortsatz: Größe + Wert + Einheit + Deutung.` |
| **4. 变量未定义** | 直接写 $\frac{dN}{dt}$，卷面从没说过 $N$ 是什么 | 按「不可 nachvollziehbar」扣 1 BE | `Definieren Sie vor der Rechnung: N = Bestandsgröße in Individuen, t = Zeit in Jahren (a), r, K, N₀.` |
| **5. 图表无标注** | 抛物线草图只有曲线，无轴名/单位/刻度 | 图形题通常扣 1–2 BE | `Beschriften Sie jede Skizze: Achsenbezeichnung + Einheit + Skala + Legende.` |
| **6. Modellannahmen 未说明** | 直接套公式，未说「geschlossene Population / konstantes K / keine Zeitverzögerung」 | AFB III 直接降档（Urteil 无依据） | `Nennen Sie die Modellannahmen im ersten Satz; prüfen Sie am Ende, ob sie erfüllt sind.` |
| **7. 只给结果不给解释** | 算出 296 就停，不写「指数模型高估的原因」 | `vergleichen` / `erklären` 子题 0–1 BE | `Schließen Sie jede Rechnung mit einem Deutungssatz: „Das bedeutet biologisch: …“` |
| **8. 德语专业词拼写** | `Grosse` statt **Größe**；`Einheit` 大小写错；`Skala` 写成 `Scala`；`Zuwachs`/`Zuwächse` 写错 | 术语错在 EHZ 中计为 Sachfehler | `Schreiben Sie: die Größe (Grö-ße), die Einheit, die Skala, der Zuwachs, die Kapazitätsgrenze, der Umweltwiderstand.` |
| **9. 有效数字** | 报 `295,56 Individuen` 或 `30,0 Individuen·a⁻¹` | 未按要求取位，扣 0,5–1 BE | `Runden Sie Individuen auf ganze Zahlen, Raten auf eine Nachkommastelle, Prozent auf eine Nachkommastelle.` |
| **10. 符号混淆（Δ vs d, K vs k, N vs n）** | $\Delta N$（年内差量）与 $\frac{dN}{dt}$（瞬时速率）混用；$K$（Kapazitätsgrenze）写成 $k$（Wachstumskonstante der Mathematik）；$N$ 与 $n$ 不分 | 概念错，AFB II 扣分 | `Unterscheiden Sie ΔN (Differenz), dN/dt (momentane Rate), K (Kapazitätsgrenze, groß), r (Wachstumsrate, klein), λ (Zuwachsfaktor).` |
| **11. 术语性别错（der/die/das）** | `das Wachstumsrate` / `die Zuwachs` / `das Kapazitätsgrenze` | 语言质量档位下降，累积扣分 | ` Merken Sie: die Wachstumsrate · die Wachstumsgeschwindigkeit · das Wachstum · der Zuwachs · die Kapazitätsgrenze · der Umweltwiderstand · der Bestand · die Populationsgröße.` |
| **12. 概念混淆（r vs dN/dt；平台含义）** | 说「增长率随密度增大而增大」；说「增长最快在 $N = K$」；说 S 型平台 = 停止繁殖 | AFB II 核心分全丢 | `Halten Sie fest: r ist die relative Rate (Modellparameter, konstant); dN/dt ist die absolute Zunahme und bei N = K/2 maximal; im Plateau gilt Geburtenrate ≈ Sterberate.` |

---

## 5. Drei Varianten（3 道变式题）

### 5.1 Variante A — 数据变（参数全换，方法不变）

**德语题干** `[原创仿写]`

> In einem 180 ha großen Gehege wurden im Frühjahr 2018 **30 Stück Rehwild** ausgesetzt. Für den Bestand gelte das logistische Modell mit $K = 300$ Individuen und $r = 0{,}50\ \mathrm{a^{-1}}$.
> **a)** Stellen Sie die Modellgleichung $N(t)$ auf und berechnen Sie den Bestand nach 4 Jahren. `(4 BE)`
> **b)** Berechnen Sie die Prognose des exponentiellen Modells für $t = 4$ Jahre und die absolute sowie die relative Abweichung vom logistischen Wert. `(3 BE)`
> **c)** Nach welcher Zeit erreicht der Bestand die Hälfte der Kapazitätsgrenze? `(3 BE)`
> **d)** Bei welchen Bestandsgrößen beträgt die Wachstumsgeschwindigkeit $24\ \mathrm{Individuen \cdot a^{-1}}$? `(4 BE)`

**变化点说明**：$N_0$: 40→30，$K$: 400→300，$r$: 0,40→0,50 $\mathrm{a^{-1}}$，Zeitpunkt 5→4 a。**关键不变**：$K/N_0 = 10$ 保持不变，因此无量纲因子仍是 $\frac{K-N_0}{N_0} = 9$，$t_{K/2} = \frac{\ln 9}{r}$ 仍是通式。**BE: 14**

**完整解答**

| 子题 | Rechengang（含 Zwischenergebnisse + Einheit） | Antwortsatz |
|---|---|---|
| **a)** | $\dfrac{K - N_0}{N_0} = \dfrac{300 - 30}{30} = 9$ ⟹ $N(t) = \dfrac{300}{1 + 9 \cdot e^{-0{,}50\,t}}$ ($t$ in a, $N$ in Individuen)<br>$N(4) = \dfrac{300}{1 + 9 \cdot e^{-2{,}0}} = \dfrac{300}{1 + 9 \cdot 0{,}1353} = \dfrac{300}{2{,}2180} = 135{,}26 \approx \mathbf{135\ Individuen}$ | Nach 4 Jahren beträgt der Bestand nach dem logistischen Modell **135 Individuen**; er liegt damit noch unter $K/2 = 150$ Individuen. |
| **b)** | $N_{\text{exp}}(4) = 30 \cdot e^{0{,}50 \cdot 4} = 30 \cdot e^{2{,}0} = 30 \cdot 7{,}3891 = 221{,}67 \approx \mathbf{222\ Individuen}$<br>absolut: $221{,}67 - 135{,}26 = \mathbf{86{,}4\ Individuen}$; relativ: $\dfrac{86{,}4}{135{,}3} = 0{,}639 = \mathbf{64\ \%}$ | Das exponentielle Modell prognostiziert **222 Individuen** und liegt damit um **86 Individuen (≈ 64 %)** über dem logistischen Wert von 135 Individuen. |
| **c)** | $N = K/2 \Rightarrow 1 + 9e^{-0{,}50t} = 2 \Rightarrow e^{-0{,}50t} = \tfrac{1}{9} \Rightarrow t = \dfrac{\ln 9}{0{,}50\ \mathrm{a^{-1}}} = \dfrac{2{,}1972}{0{,}50}\ \mathrm{a} = \mathbf{4{,}39\ a}$ | Die Hälfte der Kapazitätsgrenze (150 Individuen) wird nach **4,4 Jahren** erreicht. |
| **d)** | $\dfrac{dN}{dt} = 0{,}50 \cdot N \cdot \dfrac{300 - N}{300} = \dfrac{N(300 - N)}{600} = 24\ \mathrm{Individuen \cdot a^{-1}}$<br>⟹ $N(300 - N) = 14\,400 \Rightarrow -N^2 + 300N - 14\,400 = 0 \Rightarrow N^2 - 300N + 14\,400 = 0$<br>$N = \dfrac{300 \pm \sqrt{90\,000 - 57\,600}}{2} = \dfrac{300 \pm \sqrt{32\,400}}{2} = \dfrac{300 \pm 180}{2}$ ⟹ $N_1 = \mathbf{60}$, $N_2 = \mathbf{240}$ Individuen | Die Wachstumsgeschwindigkeit beträgt bei **$N = 60$ Individuen und bei $N = 240$ Individuen** jeweils $24\ \mathrm{Individuen \cdot a^{-1}}$. |

**Plausibilitätskontrolle（末步）**：两根之和 $60 + 240 = 300 = K$ ✓，中点 $\frac{60+240}{2} = 150 = K/2$ ✓（Parabelsymmetrie）；顶点值 $\frac{dN}{dt}(150) = 0{,}50 \cdot 150 \cdot 0{,}50 = 37{,}5\ \mathrm{Individuen \cdot a^{-1}} > 24$ ✓。**跨题快检**：因为 $K/N_0 = 10$ 且 $r \cdot t = 2$ 与原型相同，比值必有 $\frac{N_{\text{exp}}}{N_{\text{log}}} = \frac{e^{rt} + 9}{10} = \frac{7{,}389 + 9}{10} = 1{,}639$ → 两题同为 **64 %**，无需重算。

**中文点评（陷阱 + 迁移点）**
- **陷阱 1**：d) 是二次方程，**必须报两个根**（60 与 240），只写一个直接丢 2 BE；德国 EHZ 明确两根各给 1 BE。
- **陷阱 2**：a) 中 $\frac{K-N_0}{N_0} = 9$ 这一步**不能省**——它是「变量已定义 + 换元合法」的证据。
- **迁移点**：$t_{K/2} = \frac{\ln(K/N_0 - 1)}{r}$ 是通式（此处 $\ln 9 / r$）；掌握它以后任何「何时达到 K/2」都在 20 秒内写完。
- **迁移点 2**：$Y_{\max} = \frac{rK}{4}$（最大增长速率）与 $t_{K/2}$ 构成一对「通式搭档」，Variante C 直接用。

---

### 5.2 Variante B — 条件/情境变（Räuber-Beute als Nebenbedingung + Dichtelimit）

**德语题干** `[原创仿写]`

> Im Gehege aus der Standardaufgabe hat sich der Bestand im Jahr 10 auf **343 Individuen** stabilisiert ($K = 400$ Individuen, $r = 0{,}40\ \mathrm{a^{-1}}$). Nun wandert ein Wolfsrudel ein. Die Gehegeleitung nimmt an, dass die Prädation dem Bestand proportional ist und **jährlich $p = 10\ \%$** des Bestandes erfasst ($p = 0{,}10\ \mathrm{a^{-1}}$).
> **a)** Formulieren Sie die Modellannahmen und die neue Modellgleichung. Berechnen Sie den neuen Gleichgewichtsbestand $N^*$. `(6 BE)`
> **b)** Berechnen Sie den Bestand, bei dem die Wachstumsgeschwindigkeit unter Prädation maximal ist, sowie den zugehörigen Wert von $\dfrac{dN}{dt}$. `(4 BE)`
> **c)** In einem Trockenjahr sinkt die Kapazitätsgrenze auf $K' = 320$ Individuen (ohne Prädation). Berechnen Sie $\dfrac{dN}{dt}$ für $N = 343$ Individuen und deuten Sie das Vorzeichen. `(4 BE)`

**变化点说明**：原型假设「geschlossene Population ohne Feinde」被打破——**新增一条密度比例的死亡项 $-p \cdot N$**，模型必须**重新数学化**（不是换数字）；c) 则是 **Dichtelimit 位移**（$K$ 不再恒定），检验「$N > K$ ⟹ 负增长」这一反直觉结论。**BE: 14**

**完整解答**

| 子题 | Rechengang | Antwortsatz |
|---|---|---|
| **a)** | **Annahmen:** geschlossene Population; $r$, $K$, $p$ konstant; Prädation proportional zum Bestand; keine Zeitverzögerung.<br>$$\frac{dN}{dt} = r\,N\,\frac{K-N}{K} \;-\; p\,N$$<br>$= 0{,}40\,N \cdot \dfrac{400 - N}{400} - 0{,}10\,N = 0{,}001\,N(400 - N) - 0{,}10\,N$<br>$= 0{,}40N - 0{,}001N^2 - 0{,}10N = \mathbf{0{,}30\,N - 0{,}001\,N^2}\ \mathrm{Individuen \cdot a^{-1}}$<br>Gleichgewicht: $0{,}30N - 0{,}001N^2 = 0 \Rightarrow N(0{,}30 - 0{,}001N) = 0 \Rightarrow N^*_1 = 0$ (Aussterben), $N^*_2 = \dfrac{0{,}30}{0{,}001} = \mathbf{300\ Individuen}$ | Unter Prädation stellt sich ein neuer Gleichgewichtsbestand von **$N^* = 300$ Individuen** ein; er liegt 100 Individuen unter der Kapazitätsgrenze $K = 400$. |
| **b)** | Parabel $\dfrac{dN}{dt}(N) = -0{,}001N^2 + 0{,}30N$; Scheitel bei $N = -\dfrac{b}{2a} = -\dfrac{0{,}30}{2 \cdot (-0{,}001)} = \dfrac{0{,}30}{0{,}002} = \mathbf{150\ Individuen}$<br>$\dfrac{dN}{dt}(150) = 0{,}30 \cdot 150 - 0{,}001 \cdot 150^2 = 45 - 22{,}5 = \mathbf{22{,}5\ Individuen \cdot a^{-1}}$ | Das Maximum der Wachstumsgeschwindigkeit verschiebt sich durch die Prädation von $N = 200$ auf **$N = 150$ Individuen** und fällt von 40 auf **$22{,}5\ \mathrm{Individuen \cdot a^{-1}}$**. |
| **c)** | $\dfrac{dN}{dt} = 0{,}40\ \mathrm{a^{-1}} \cdot 343\ \text{Individuen} \cdot \dfrac{320 - 343}{320} = 137{,}2\ \mathrm{Individuen \cdot a^{-1}} \cdot (-0{,}07188) = \mathbf{-9{,}9\ Individuen \cdot a^{-1}}$ | Bei $N = 343$ Individuen und $K' = 320$ Individuen beträgt die Wachstumsgeschwindigkeit **$-9{,}9\ \mathrm{Individuen \cdot a^{-1}}$**: Da der Bestand **über** der Kapazitätsgrenze liegt, **nimmt er ab**, bis er $K'$ erreicht. |

**Plausibilitätskontrolle（末步）**：$N^* = K\left(1 - \frac{p}{r}\right) = 400\left(1 - \frac{0{,}10}{0{,}40}\right) = 400 \cdot 0{,}75 = 300$ ✓（与 a) 的二次方程根一致）；$150 < K/2 = 200$ ✓（Prädation 把最大增长点推向更小种群）；$\frac{dN}{dt}(300) = 0{,}30 \cdot 300 - 0{,}001 \cdot 90\,000 = 90 - 90 = 0$ ✓；c) 中 Vorzeichenwechsel 恰在 $N = K' = 320$ ✓，且 $|{-9{,}9}| \ll 40$ —— 因为 $N$ 仅略高于 $K'$。

**中文点评（陷阱 + 迁移点）**
- **陷阱 1**：**不能沿用原公式**。凡出现 Nebenbedingung（捕食、捕捞、病害、迁出），第一句必须重写 Modellannahmen，否则 a) 6 BE 只剩 1–2 BE 的 Ansatz-Punkte。
- **陷阱 2**：新平衡的 **两个根**（0 与 300）都要写；$N = 0$ 要注明「Aussterben（triviales Gleichgewicht）」。
- **陷阱 3**：**负的 $\frac{dN}{dt}$ 不是算错**——$N > K$ 时 $\frac{K-N}{K} < 0$，种群下降是模型的正确预言，德国卷面正是靠这一步区分 AFB II 与 III。
- **迁移点**：一般式 $N^* = K\left(1 - \frac{p}{r}\right)$，$p \ge r$ 时种群必然灭绝（$N^* \le 0$）；这是 AFB III「Dichtelimit / Übernutzung」的标准论证。

---

### 5.3 Variante C — 迁移/综合（Fischerei, AFB III Bewertung）

**德语题干** `[原创仿写]`

> In einem 60 ha großen Baggersee wird ein Felchenbestand (Maräne) wirtschaftlich genutzt. Gutachten gehen von $K = 1200$ Individuen und $r = 0{,}30\ \mathrm{a^{-1}}$ aus; der aktuelle Bestand wird auf $N = 900$ Individuen geschätzt.
> **a)** Berechnen Sie den Bestand, bei dem der jährliche Zuwachs maximal ist, sowie den maximalen nachhaltigen Dauerertrag. `(5 BE)`
> **b)** Der Betrieb möchte den Bestand dauerhaft bei $N = 900$ Individuen bewirtschaften („möglichst viele Fische im See“). Berechnen Sie den dort erzielbaren Dauerertrag und vergleichen Sie ihn mit dem Ergebnis aus a). `(5 BE)`
> **c)** Beurteilen Sie, ob die Bewirtschaftung des Sees allein nach dem logistischen Modell festgelegt werden kann. `(AFB III, 8 BE)`

**变化点说明**：从「围栏鹿苑（封闭种群、观察）」迁移到「**开发型渔业（开放利用、决策）**」——模型不变，但输出从「预测数量」变成「**确定捕捞配额**」，并加入 AFB III 的 `beurteilen` 子问（含 Kriterium → Abwägung → Urteil + 一条 gestaltende Empfehlung）。**BE: 18**

**完整解答**

| 子题 | Rechengang | Antwortsatz |
|---|---|---|
| **a)** | Maximum bei $N = \dfrac{K}{2} = \dfrac{1200}{2} = \mathbf{600\ Individuen}$<br>$Y_{\max} = \dfrac{dN}{dt}\!\left(\dfrac{K}{2}\right) = r \cdot \dfrac{K}{2} \cdot \dfrac{K - K/2}{K} = \dfrac{rK}{4} = \dfrac{0{,}30\ \mathrm{a^{-1}} \cdot 1200\ \text{Individuen}}{4} = \mathbf{90\ Individuen \cdot a^{-1}}$<br>Probe: $0{,}30 \cdot 600 \cdot \frac{600}{1200} = 180 \cdot 0{,}50 = 90$ ✓ | Der Zuwachs ist bei **$N = K/2 = 600$ Individuen** maximal; der maximale nachhaltige Dauerertrag beträgt **90 Individuen pro Jahr**. |
| **b)** | $\dfrac{dN}{dt}(900) = 0{,}30\ \mathrm{a^{-1}} \cdot 900\ \text{Individuen} \cdot \dfrac{1200 - 900}{1200} = 270\ \mathrm{Individuen \cdot a^{-1}} \cdot 0{,}25 = \mathbf{67{,}5\ Individuen \cdot a^{-1}}$<br>Differenz: $90 - 67{,}5 = \mathbf{22{,}5\ Individuen \cdot a^{-1}}$ = **25 %** des Maximalertrags | Bei einem Zielbestand von 900 Individuen beträgt der Dauerertrag **67,5 Individuen pro Jahr** und liegt damit um **22,5 Individuen (25 %) unter** dem maximalen Dauerertrag. |
| **c)** | **Kriterium 1 (Struktur):** Das Modell kennt nur eine Gesamtzahl; die Fischerei entnimmt bevorzugt große, besonders fertile Tiere → der reale Nachwuchs sinkt stärker als im Modell.<br>**Kriterium 2 (Konstanz von $K$):** $K$ hängt von Nährstoffeintrag, Wassertemperatur, Sauerstoff im Tiefenwasser und Wasserstand ab; Schätzfehler von $\pm 20\ \%$ sind üblich. Bei Zielbestand 900 (= $0{,}75\,K$) führt eine Überschätzung von $K$ um 25 % ($K_{\text{wahr}} = 900$) zu $\frac{dN}{dt} = 0$ — die geplante Entnahme von 67,5 Fischen würde den Bestand dann **unter** den Gleichgewichtswert drücken.<br>**Kriterium 3 (Zeitverzögerung & Stochastik):** Der Nachwuchs hängt von der Jahrgangsstärke ab (Kälte im Frühjahr, Laichhabitat); ohne Zeitverzögerung unterschätzt das Modell das Überschwingen über $K$.<br>**Kriterium 4 (Allee-Effekt):** Bei sehr kleinem Bestand sinkt die Reproduktionsrate (Partnerfindung); das Modell kennt diese Untergrenze nicht. | s. u. |

**c) 德语 Bewertung 范式（Kriterium → Abwägung → Urteil，可直接默写）**

> *Kriterium:* Als Kriterien lege ich die Abbildungsgenauigkeit der Bestandsstruktur, die Konstanz von $K$ sowie die praktische Messbarkeit der Parameter an.
> *Abwägung:* Einerseits liefert das Modell eine einfache, überprüfbare Handlungsregel — der Dauerertrag ist bei $N = K/2$ maximal ($Y_{\max} = rK/4 = 90\ \mathrm{Individuen \cdot a^{-1}}$) — und macht die Folge einer Übernutzung sichtbar. Andererseits sind $K$ und $r$ für Wildbestände nur mit großer Unsicherheit bestimmbar, die Altersstruktur, die Zeitverzögerung der Rekrutierung und der Allee-Effekt bleiben unberücksichtigt.
> *Urteil:* Ich beurteile das logistische Modell als **alleinige Grundlage für die Festlegung von Fangquoten als nicht ausreichend**, als heuristische Grundlage jedoch als **geeignet**. Ich empfehle einen Zielbestand von etwa $0{,}6\,K = 720$ Individuen: Dort beträgt der Dauerertrag $0{,}30 \cdot 720 \cdot \frac{480}{1200} = 216 \cdot 0{,}40 = \mathbf{86{,}4 \approx 86\ Individuen \cdot a^{-1}}$, also nur **4 %** weniger als das Maximum, der Bestand ist aber gegen eine Überschätzung von $K$ deutlich robuster. Die Quote ist jährlich an neue Bestandsschätzungen anzupassen.

**Plausibilitätskontrolle（末步）**：$86{,}4 < 90$ ✓（Sicherheitsmarge kostet Ertrag）；$720 > K/2 = 600$ ✓（Marge liegt auf der sicheren Seite）；$86{,}4/720 = 12\ \% \cdot \mathrm{a^{-1}} < r = 30\ \% \cdot \mathrm{a^{-1}}$ ✓（Entnahme 不可能超过最大相对增长率）；若误用 $N = 900$ 且 $K$ 实为 900，则 $\frac{dN}{dt} = 0.3 \cdot 900 \cdot 0 = 0$，配额 67,5 会持续掏空种群 ✓（论证闭环）。

**中文点评（陷阱 + 迁移点）**
- **陷阱 1**：`Dauerertrag` 的单位是 $\mathrm{Individuen \cdot a^{-1}}$（**流量**），不是 Individuen（**存量**）——单位写错整题降档。
- **陷阱 2**：a) 不能只答 $N = K/2$，还要把 $Y_{\max} = \frac{rK}{4}$ 算出来；这是「最大持续产量 MSY」的核心公式，渔业/林业/狩猎题通用。
- **陷阱 3**：AFB III 只写「模型太简单」不得分；必须**列 ≥2 个 Kriterium + je ein Pro/Contra + explizites Urteil mit Empfehlung**（本段范式照抄即可保 60 % 以上分值）。
- **迁移点**：本范式可直接迁移到 **Forstwirtschaft、Wildtier-Management、Algenblüte nach Düngereintrag、Insekten-Schädlingsbekämpfung** 等一切「确定可利用量」的情境。

---

## 6. Zeitstrategie & Glossar-Zeilen

### 6.1 Zeitplan（Standardaufgabe, 30 BE, 50 min）

| Teilaufgabe | Operator | AFB | BE | Minuten | 抢分动作 |
|---|---|---|---|---|---|
| a) Verlauf + Modellzuordnung | beschreiben / zuordnen / begründen | I–II | 5 | **6** | 先写 Zuwächse 与 λ 三值（机械分），最后一句 Zuordnung |
| b) ΔN + relative Zuwachsrate | berechnen | II | 6 | **8** | 三个区间**各一行**，行行带 Einheit；末行写「monoton abnehmend」 |
| c) K bestimmen + dN/dt ×3 | berechnen / begründen | II | 7 | **10** | 三次代入 + Symmetrie-Probe（$100 \leftrightarrow 300$） |
| d) Exponentialprognose + $t_{K/2}$ | berechnen / vergleichen | II | 6 | **9** | $e^{2} = 7{,}3891$、$\ln 9 = 2{,}1972$ 全值写出；末行 Größenordnungskontrolle |
| e) Modellkritik | beurteilen | III | 6 | **9** | 三段模板：Kriterium → Abwägung → Urteil（背熟直接套） |
| Schlusskontrolle | — | — | — | **8** | Einheiten / Antwortsätze / Skizzenbeschriftung / 变量定义是否齐全 |

### 6.2 「先保分后抢分」三条

1. **先扫 AFB I + II 的机械分**：读数、代入、单位、Antwortsatz 是「写了就有」的分，**在 30 min 内全部落袋**，AFB III 放到最后。
2. **AFB III 用模板保底**：`Kriterium – Abwägung – Urteil` 三句写完即可拿到该类子题 60–75 % 的分值；不要追求修辞，追求**论据条数 ≥2 + 明确 Urteil**。
3. **卡壳时先卖 Ansatz**：算不下去也要写「Modellannahmen + 已知量清单 + 公式原式 + 单位」——德国评分对 **korrekter Ansatz** 通常给 1–2 BE，写完再回头补算；绝不空题。

### 6.3 Glossar-Zeilen（待合并，4 列 × 6 行）

`| Deutsch | Chinesisch | Fach | Beispielsatz |`

| Deutsch | Chinesisch | Fach | Beispielsatz |
|---|---|---|---|
| Wachstumsrate | 增长率 | Bio | Die Wachstumsrate r gibt die relative Zunahme des Bestandes pro Jahr an. |
| Kapazitätsgrenze | 环境容纳量（K 值） | Bio | Die Kapazitätsgrenze K ist der Bestand, dem sich die Population asymptotisch nähert. |
| Umweltwiderstand | 环境阻力 | Bio | Der Umweltwiderstand bremst das Wachstum, sobald die Bestandsdichte steigt. |
| Wachstumsgeschwindigkeit | 增长速率 | Bio | Die Wachstumsgeschwindigkeit dN/dt ist bei N gleich K/2 maximal. |
| Gleichgewichtsbestand | 平衡种群量 | Bio | Unter Praedation stellt sich ein niedrigerer Gleichgewichtsbestand ein. |
| Geltungsgrenze | 模型适用边界 | Bio | Die Geltungsgrenze des Modells liegt in der Annahme einer konstanten Kapazitaetsgrenze. |

---

> ⏳ 待确认：① 本届 Bio-LK Klausur 是否允许 grafikfähiger Taschenrechner/CAS（本文两种写法都给：可直接取 $e^{2} = 7{,}3891$、$\ln 9 = 2{,}1972$，也可手算估算）；② Tag 首标签 `EF` 与内容层级 `Q1/LK` 的取舍（见文首）。
> 所有 Material、数据、数值均为**本人原创仿写**，无人名、无真实出版物摘录；题目来源层级 `[原创仿写]`。本篇为 **LK 专属**，GK 卷面不得使用 J 型/S 型/K 值表述。
