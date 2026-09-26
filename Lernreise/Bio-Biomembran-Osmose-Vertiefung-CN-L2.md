---
fach: Bio
thema: "Biomembran und Osmose in der Vertiefung"
level: 2
ziel: Klausur
xp: 100
operatoren: [darstellen, erklaeren, begruenden]
klausurrelevant: true
datum: 2026-09-26
tags: [EF, Bio, CN]
version: Lesson-v3
---

# Lernreise: Biomembran und Osmose in der Vertiefung (L2, Ziel Klausur)

<!-- Lesson v3 9步制架构：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间（Parser 自动跳过，不占步数）；支持内嵌 [Werkzeug: <id>] 交互教具；Gating: check/szenario 未过 = Weiter 置灰；XP: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->

## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

【生活日常现象与思考（Hook & Phänomen）】：
为什么给新鲜的黄瓜片撒上一层食盐后，盘子里会迅速渗出大量水珠，而黄瓜片本身变得软塌塌？
为什么将红细胞放入纯净的蒸馏水中时，红细胞会迅速吸水膨胀直至破裂（溶血现象 Hämolyse），而具有相同外界环境的植物表皮细胞却能保持饱满挺拔而绝不破裂？

答案的核心在于**生物膜的微观架构（Biomembran）与渗透热力学（Osmose）**。细胞膜不是一层死气沉沉的塑料薄膜，而是一个动态流动的微观分子筛选大门。

ZIELE（本节 15 分钟深度掌握以下 3 大核心考点）：
1. **结构认知**：能准确复述并图解流动镶嵌模型（Fluessig-Mosaik-Modell）的三大要件：磷脂双分子层（Phospholipid-Doppelschicht）、镶嵌/跨膜蛋白（Proteine）、以及胆固醇（Cholesterin）对膜流动性的精密调控；
2. **热力学与水流判定**：能依据水势与渗透浓度梯度判断水分净移动方向（Wasserstrom），定量/定性推导植物细胞的质壁分离（Plasmolyse）与质壁复原（Deplasmolyse）；
3. **解题方法（选程序）**：能在考试中瞬间区分顺浓度的被动运输（Passiver Transport，无需 ATP）与逆浓度的初级/次级主动运输（Aktiver Transport，依赖 ATP 水解供能）。

Voraussetzung（知识预备与切口）：
- 已掌握扩散（Diffusion）的基本定义；
- 了解植物细胞含有中央大液泡（Vakuole）与刚性细胞壁（Zellwand），而动物细胞仅有细胞膜无细胞壁。

Klausur-Satz: `Wasser folgt passiv dem Konzentrationsgefaelle des Loesungsmittels (Osmose); die selektiv permeable Biomembran reguliert den selektiven Stoffdurchtritt.`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING 核心术语盒（5 大高频考点术语，中德双语精解）：

1. **流动镶嵌模型 — Fluessig-Mosaik-Modell**：
   - 中文：以流动性的磷脂双分子层为基质（“脂海”），膜蛋白以镶嵌、贯穿或表面附着的形式分布其中（“蛋白岛”），具备横向流动性与非对称性。
   - 德语：Modell der Biomembran, bei dem Proteine in eine zaehfluessige Phospholipid-Doppelschicht eingebettet und lateral beweglich sind.
2. **选择透过性 — Selektive Permeabilitaet**：
   - 中文：膜只允许小分子、非极性脂溶性分子（如 $O_2, CO_2$）自由穿透；极性大分子和带电水合离子无法直接通过，必须借助特异性转运蛋白。
   - 德语：Eigenschaft der Membran, bestimmte Stoffe ungehindert passieren zu lassen, andere jedoch zurueckzuhalten.
3. **渗透 — Osmose**：
   - 中文：水分子通过选择透过性膜，从低溶质浓度（高水分子浓度/高水势）区域向高溶质浓度（低水分子浓度/低水势）区域的定向净扩散。
   - 德语：Spontane Nettodiffusion von Wasser durch eine semipermeable Membran entlang des Wasserpotenzialgefaelles.
4. **质壁分离 — Plasmolyse**：
   - 中文：植物细胞处于高渗溶液（hypertonische Loesung）中时，液泡失水收缩，原生质体（Protoplast）收缩并脱离刚性细胞壁的现象。
   - 德语：Ablaesung des Protoplasten von der pflanzlichen Zellwand durch osmotischen Wasserverlust in hypertoner Umgebung.
5. **质壁复原与膨压 — Deplasmolyse & Turgordruck**：
   - 中文：将已质壁分离的细胞移入低渗溶液（hypotonisch）中，水分子倒流进入液泡，原生质体复位膨胀，抵住细胞壁产生对抗进一步吸水的机械反向压力（Turgor）。
   - 德语：Wiederanlegen des Protoplasten an die Wand bei Wassereinstrom sowie Ausbildung des mechanischen Turgordrucks.

Klausur-Satz: `Osmose ist gerichtete Diffusion von Wasser durch eine semipermeable Membran zum Ort des hoeheren osmotischen Werts.`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN（因果作用模型与微观水流机制）：

水分子在渗透中的运动遵循**最小阻力与热力学熵增驱动**。牢记解题核心口诀：“**水往咸处流，有壁建膨压，无壁易胀破**”。

- **高渗环境（Aussen hypertonisch）**：外液溶质浓度高于细胞内液。水分分子顺自身浓度梯度向外净流失 $\to$ 液泡缩瘪 $\to$ 原生质体（Protoplast）脱离细胞壁（Plasmolyse）。红细胞失水皱缩（Krenierung）。
- **等渗环境（Aussen isotonisch）**：膜两侧进出水分子动态平衡 $\to$ 动植物细胞维持稳定形态。
- **低渗环境（Aussen hypotonisch）**：外液溶质浓度低于细胞内液。水分由外向内倒灌 $\to$ 植物原生质体膨胀顶住细胞壁形成高膨压（Turgordruck $\Psi_p$），当膨压反作用力与渗透吸水力抵消时达到动态吸水饱和；而动物红细胞由于缺乏刚性细胞壁保护，细胞膜无法承受内部流体静压而发生溶血胀破（Haemolyse）。

跨膜转运因果分类逻辑图：

```diagram
                     ┌── 被动运输 (passiv, ohne ATP) ──┬── 简单自由扩散 (Diffusion, z.B. O2, CO2)
                     │                                ├── 渗透水流 (Osmose via Aquaporine)
                     │                                └── 易化扩散 (Kanal-/Carrier-Proteine)
跨膜转运 (Transport) ─┤
                     └── 主动运输 (aktiv, mit ATP) ────┬── 初级主动 (z.B. Na+/K+-ATPase Pumpe)
                                                      ├── 次级主动 (z.B. SGLT Glukose-Symport)
                                                      └── 囊泡运输 (Endozytose / Exozytose)
```

Klausur-Satz: `In hypertoner Umgebung verliert die Pflanzenzelle Wasser und plasmolysiert; in hypotoner Umgebung erzeugt der osmotische Wassereinstrom den mechanisch stabilisierenden Turgordruck gegen die Zellwand.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Gorter und Grendel wiesen 1925 aus roten Blutkoerperchen nach, dass die Membran eine Doppelschicht ist — ausgerechnet kernlose Zellen verrieten die Doppelhaut. Singer und Nicolson gaben ihr 1972 mit dem Mosaik das Fliessen zurueck.

**中文解读**: 科学史上红细胞因为没有细胞核与内部细胞器，只剩下一张外皮膜，反而为科学家测定膜面积提供了完美材料（提取出的磷脂单分子层铺展面积恰好是红细胞表面积的整整 2 倍，无可辩驳地证明了“双分子层”结构）。1972 年流动镶嵌模型更让人们认识到膜不是僵硬的栅栏，而是一片波光粼粼的微观海洋。

**Bezug zum Konzept**: `Die Doppelschicht bildet die Permeabilitaetsschranke, waehrend Proteine den selektiven Transport und die Reizleitung gewaehrleisten.`

## Schritt 4 — ausprobieren: Interaktives Osmose-Labor

[Werkzeug: osmose-lab]

AUFGABE (erklaeren, AFB II)：
Im didaktischen Osmose-Simulator oben wird eine pflanzliche Zelle (Zellsaft-Osmotisches Potenzial $\Psi_s = -0{,}7\,\mathrm{MPa}$, Turgordruck $\Psi_p = +0{,}3\,\mathrm{MPa}$) in eine Testloesung mit $\Psi_s = -1{,}5\,\mathrm{MPa}$ gelegt.
1. Berechne das initiale Gesamtwasserpotenzial $\Psi = \Psi_s + \Psi_p$ der Zelle und vergleiche es mit der Aussenloesung.
2. Erklaere anhand des Simulators die Richtung des Wasserstroms und beschreibe die morphologische Zustandsaenderung des Protoplasten.
3. Begruende, warum das Phaenomen vollstaendig reversibel ist, wenn die Zelle anschliessend in destilliertes Wasser uebertragen wird.

HILFE:
1. Formel anwenden: $\Psi_{\mathrm{Zelle}} = \Psi_s + \Psi_p = -0{,}7 + 0{,}3 = -0{,}4\,\mathrm{MPa}$.
2. Wasser stroemt stets vom hoeheren (weniger negativen) zum niedrigeren (staerker negativen) Wasserpotenzial: $-0{,}4\,\mathrm{MPa} > -1{,}5\,\mathrm{MPa}$.
3. Wasser stroemt also aus der Zelle heraus. Der Protoplast loest sich von der festen Zellwand $\to$ Plasmolyse. Bei Zugabe von Wasser dreht sich das Potenzialgefaelle um.

MUSTERLÖSUNG:
1. Das initiale Gesamtwasserpotenzial der pflanzlichen Zelle betraegt $\Psi_{\mathrm{Zelle}} = \Psi_s + \Psi_p = -0{,}7\,\mathrm{MPa} + 0{,}3\,\mathrm{MPa} = -0{,}4\,\mathrm{MPa}$. Das Potenzial der Aussenloesung liegt bei $\Psi_{\mathrm{Aussen}} = -1{,}5\,\mathrm{MPa}$.
2. Da Wasser thermodynamisch vom Ort des hoeheren ($-0{,}4\,\mathrm{MPa}$) zum Ort des niedrigeren Wasserpotenzials ($-1{,}5\,\mathrm{MPa}$) stroemt, tritt Wasser osmotisch aus der Vakuole und dem Zytoplasma durch das selektiv permeable Plasmalemma nach aussen. Der Turgordruck faellt auf $0\,\mathrm{MPa}$ ab, das Zellvolumen des Protoplasten verringert sich drastisch, und die Zellmembran loest sich sichtbar von der unelastischeren Zellwand ab (vollstaendige Plasmolyse).
3. Der Vorgang ist reversibel (Deplasmolyse), da die Zellwand als stabiles Exoskelett erhalten bleibt und die Membranproteine bei reiner osmotischer Entwaesserung intakt bleiben. Wird die Zelle in destilliertes Wasser ($\Psi = 0\,\mathrm{MPa}$) uebertragen, ist das Aussenpotenzial hoeher als das Innenpotenzial; Wasser diffundiert zurueck in die Zelle, bis der aufgebaute Turgordruck das osmotische Potenzial exakt kompensiert.

Klausur-Satz: `Wasser stroemt stets entlang des Gefaelles zum staerker negativen Wasserpotenzial; in hypertoner Loesung erfolgt Plasmolyse, in hypotoner Deplasmolyse.`

## Schritt 5 — ausprobieren: Verfahrensvergleich & Abgrenzung

VERGLEICH辨别实验（双向辨析：被动顺流 vs 主动逆流）：

【选程序钥匙】：审题先看两项指标——(1) 移动方向是顺浓度差（mit Gefaelle）还是逆浓度差（gegen Gefaelle）？(2) 是否需要水解三磷酸腺苷（ATP）直接或间接提供代谢能量？

AUFGABE A：
Eine Nervenzelle reichert intrazellulaer $K^+$-Ionen gegen ein bestehendes starkes Konzentrationsgefaelle an, waehrend $Na^+$-Ionen aktiv nach aussen transportiert werden. Um welche Transportart handelt es sich, und was geschieht bei Zugabe des Stoffwechselgiftes Cyanid (welches die ATP-Synthese blockiert)?

AUFGABE B：
Wasser stroemt nach einem warmen Sommerregen aus dem feuchten Boden rasch in die Wurzelhaarzellen einer Pflanze ein, ohne dass der pflanzliche ATP-Spiegel absinkt. Um welches Transportverfahren handelt es sich?

HILFE:
- A: Anreicherung gegen Gefaelle $\to$ Verfahren (ii) Primär aktiver Transport über die $Na^+/K^+$-ATPase. Cyanid hemmt ATP $\to$ aktiver Transport bricht zusammen!
- B: Wasserbewegung ins Wurzelhaar $\to$ Verfahren (i) Passiver Transport (Osmose via Aquaporine), unbeeinflusst von akuter ATP-Hemmung.

ANTWORT:
- Fall A repraesentiert einen **primaer aktiven Transport** (Verfahren ii). Die $Na^+/K^+$-Ionenpumpe transportiert Ionen gegen ihr elektrochemisches Gefaelle unter direktem Verbrauch von ATP. Bei Zugabe von Cyanid bricht die Zellatmung und damit die mitochondriale ATP-Produktion zusammen; der aktive Transport stoppt sofort, und die Ionenkonzentrationen gleichen sich durch Leckstroeme passiv an.
- Fall B repraesentiert einen **passiven Transport** in Form von **Osmose** (Verfahren i). Da die Wurzelzelle durch osmotisch aktive Substanzen (Ionen, Zucker) hypertonisch gegenueber dem Bodenwasser ist, folgt das Wasser spontan seinem Potenzialgefaelle durch die Aquaporine in der Membran. Dafuer wird kein biochemisches ATP benoetigt.

Klausur-Satz: `Passiver Transport erfolgt energetisch spontan mit dem Konzentrationsgefaelle; aktiver Transport erzwingt die Bewegung gegen das Gefaelle unter zwingendem ATP-Aufwand.`

## Schritt 6 — check: Verständnisprüfung

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Welche Molekuele koennen die Phospholipid-Doppelschicht einer Biomembran durch einfache freie Diffusion ungehindert durchqueren? | ANTWORT: Kleine, ungeladene und lipophile (unpolare) Molekuele wie Sauerstoff (O2), Kohlenstoffdioxid (CO2) und in geringem Masse sehr kleine Molekuele wie Wasser.
FRAGE: Warum platzen pflanzliche Zellen in reinem Wasser nicht, waehrend tierische Erythrozyten platzen (Haemolyse)? | ANTWORT: Die feste pflanzliche Zellwand begrenzt die Volumenzunahme mechanisch und baut einen Turgordruck auf; tierische Zellen besitzen keine Zellwand und reissen bei zu hohem osmotischen Einstrom auf.
FRAGE: Was unterscheidet primaer aktiven Transport von sekundaer aktivem Transport? | ANTWORT: Primaer aktiver Transport nutzt direkt die Hydrolyse von ATP (z.B. Na+/K+-Pumpe); sekundaer aktiver Transport nutzt den elektrochemischen Gradienten, der zuvor durch primaeren Transport aufgebaut wurde (z.B. Glukose-Cotransport).

Klausur-Satz: `Die pflanzliche Zellwand baut bei osmotischem Wassereinstrom elastischen Gegendruck (Turgor) auf und verhindert die Zellyse.`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解：“水往浓度低的地方跑”。
   中文纠偏：这是最容易扣分的口误！水永远是向“溶质浓度高（osmotischer Wert hoch）”或“水自身浓度低/水势低（Wasserpotenzial stark negativ）”的区域扩散。牢记口诀：水往咸处跑！
   Korrektur-Satz: `Wasser stroemt stets zur Seite der hoeheren Loesungskonzentration (staerker negatives Wasserpotenzial).`

2. 误解：“渗透需要消耗能量 ATP”。
   中文纠偏：渗透在本质上就是水分子的物理自由扩散，不需要消耗任何 ATP 生化能量。需要消耗 ATP 的是逆着浓度梯度的离子泵或胞吞胞吐。
   Korrektur-Satz: `Osmose ist ein passiver Prozess ohne ATP-Verbrauch; aktiver Transport erfordert ATP.`

## Schritt 7 — szenario: Klausurtransfer & Szenario

ROLLE: Du bist beratender Agrarbiologe und erklaerst einer Gruppe von Junggaertnern ein biologisches Schadensbild.
SITUATION: Eine Gaertnerei hat ihre Gewaechshaustomaten mit einer hochkonzentrierten mineralischen Duengerloesung gegoessen. Bereits nach wenigen Stunden lassen saemtliche Pflanzen die Blaetter schlaff haengen und welken dramatisch, obwohl die Erde voellig durchnaesst ist. Die Gaertner vermuten faelschlicherweise eine Pilzkrankheit oder Wassermangel. Erklaere in einer wissenschaftlich praezisen Stellungnahme (ca. 150 Woerter) unter Verwendung der Fachbegriffe Tonizitaet, Wasserpotenzial, Plasmolyse und Turgordruck, was auf Zellebene geschehen ist und welche Sofortmassnahme die Pflanzen retten kann.
RUBRIC (30 XP):
- Korrekte Identifikation der Duengerloesung als stark hyperton gegenueber dem Zellsaft der Wurzelhaare (8 XP)
- Praezise Ableitung des osmotischen Wasserentzugs (Wasserstrom aus den Wurzeln in den Boden) trotz feuchter Erde (8 XP)
- Verknuepfung des Verlusts des Turgordrucks mit Plasmolyse der Zellen und Welken der krautigen Organe (8 XP)
- Angabe der physikalischen Sofortmassnahme (grosszuegiges Auswaschen/Flueten mit reinem Wasser) zur Deplasmolyse (6 XP)

## Schritt 8 — entdecken: Takeaway & Metakognitive Reflexion

TAKEAWAY 核心总结：
1. **膜之架构**：流动镶嵌模型——磷脂双分子层阻隔水溶物，蛋白质行使大门职能，胆固醇稳定流动性；
2. **水之流动**：渗透即水扩散，水往负水势/高盐区走；
3. **动植之别**：植物有壁形成澎压（Turgor），动物无壁溶血胀破；
4. **能之消耗**：顺流无消耗（被动），逆流耗 ATP（主动）。

Takeaway-Satz: `Biomembranen gewaehrleisten durch selektive Permeabilitaet die Kompartimentierung; Wasser folgt passiv osmotischen Gradienten, waehrend lebenswichtige Konzentrationsgefaelle aktiv durch ATP-Pumpen aufrechterhalten werden.`

REFLEXION 2 问：
1. **过程自省**：在面对实验题时，你能否一眼通过有无细胞壁（Pflanze vs. Tier）预判吸水结果是产生 Turgor 还是发生 Hämolyse？
2. **元认知计划**：下次遇到带图大题，我将第一时间寻找关键动词与已知条件：是“mit Gefaelle”（被动）还是“gegen Gefaelle”（主动）？
