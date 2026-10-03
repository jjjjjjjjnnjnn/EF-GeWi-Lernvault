---
fach: Chemie
thema: "Reaktionsmechanismen der Organik: Nucleophile Substitution SN1 vs. SN2"
level: 1
ziel: Klausur
xp: 100
operatoren: [beschreiben, vergleichen, analysieren]
klausurrelevant: true
datum: 2026-10-03
tags: [EF, Chemie, Organik, Reaktionsmechanismen, Nucleophile-Substitution, SN1, SN2, Stereochemie]
version: Lesson-v3
---

# Lernreise: Reaktionsmechanismen der Organik: Nucleophile Substitution SN1 vs. SN2 (L1, Ziel Klausur)

<!-- Campaign: Organische-Reaktionsmechanismen | Episode 4/10 | Krise: Rueckseitenangriff oder Carbokation? Das Duell der molekularen Pfade | Zielgroessen: SN1, SN2, Walden-Umkehr, Carbenium-Ion, sterische Hinderung, Kinetik | Tool: balance-board -->

## Schritt 1 — entdecken: Das molekulare Billardspiel
ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清亲核取代反应（Nucleophile Substitution）的微观本质——亲核试剂（Nucleophil）进攻带正电荷碳原子并踢飞离去基团（Abgangsgruppe）。
2. 中文：能精准对比协同单步 $S_N2$ 反应（Rückseitenangriff, trigonale Bipyramide, Walden-Umkehr / Inversion der Konfiguration）与分步两阶段 $S_N1$ 反应（Carbenium-Ion, Racemisierung, Kinetik 1. Ordnung）在立体化学、反应动力学及过渡态结构上的根本对立。
3. 中文：能在有机合成机理大题（AFB I/II/III）中依据底物结构（primär / sekundär / tertiär）、溶剂极性（protisch vs. aprotisch）与亲核试剂强弱精准预测反应路径与产物构型。

### Hook / Phaenomen

在两个透明试管里，分别装着两种分子式同为 $C_4H_9Br$ 的有机卤代烃：试管 A 装的是一条直链的 1-溴丁烷（primäres Halogenalkan），试管 B 装的是像伞状对称的 2-溴-2-甲基丙烷（tertiäres Halogenalkan）。现在，你在两个试管里分别加入完全相同的氢氧化钠溶液（$NaOH$）并滴入酚酞指示剂。令人难以置信的现象发生了：试管 A 里的反应极其缓慢，甚至需要加热摇晃几分钟；而试管 B 刚加入氢氧化钠，瞬间就在一秒钟之内发生了闪电般的剧烈反应！更神奇的是，如果用旋光仪测试手性产物：试管 A 的产物空间立体构型被像雨伞一样 100% 翻转了过去，而试管 B 的产物却完全失去了旋光性变成了一半左旋一半右旋的外消旋混合物！化学分子在发生置换时，究竟遵循着怎样不可逾越的“空间几何与动力学法典”？

Hook / Phaenomen: Zwei scheinbar identische Fluessigkeiten mit der Summenformel $C_4H_9Br$: 1-Brombutan und 2-Brom-2-methylpropan. Gibst du zu beiden dieselbe Menge an Hydroxid-Ionen ($OH^-$), verhalten sie sich wie Tag und Nacht! Das eine Molekuel reagiert nur, wenn das Hydroxid-Ion exakt von hinten im 180-Grad-Winkel einschlaegt — und klappt dabei das gesamte Raummolekuel um wie einen Regenschirm im Sturm (**Walden-Umkehr**). Das andere Molekuel laesst den Angreifer zunaechst voellig links liegen, wirft zuerst ganz alleine sein Brom-Atom ab und bildet ein flaches, nacktes Carbokation, das von beiden Seiten attackiert werden kann! Willkommen im dramatischen Duell der **$S_N1$- und $S_N2$-Reaktionsmechanismen**.

`Klausur-Satz: Waehrend die bimolekulare $S_N2$-Reaktion ueber einen konzertierten Rueckseitenangriff unter vollstaendiger Konfigurationsumkehr (Inversion) verlaeuft, schreitet die monomolekulare $S_N1$-Reaktion ueber ein planares Carbenium-Ion unter Racemisierung fort.`

## Schritt 2 — entdecken: Ausruestungskiste der Substitutions-Unit
PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 亲核试剂与亲电中心 — Nucleophil & Elektrophiles Zentrum: 拥有孤对电子或带负电荷、渴望进攻正电荷核的富电子微粒（如 $OH^-, I^-, NH_3$），以及受电负性诱导而带部分正电荷的碳原子（$C^{\delta+}$）。 Nucleophil: "Kernliebendes" Reagenz mit freiem Elektronenpaar. Elektrophiles Zentrum: Das partiell positiv polarisierte Kohlenstoffatom ($C^{\delta+} - X^{\delta-}$). Klausur-Tipp: Pfeile im Reaktionsmechanismus starten IMMER am freien Elektronenpaar des Nucleophils!
- 双分子亲核取代 — $S_N2$-Mechanismus (Bimolekular): 亲核试剂从离去基团的反背面协同进攻，经过五配位双三角锥过渡态，一步完成键的断裂与生成。 Konzertierter, einstufiger Mechanismus ohne Zwischenstufe. Kinetik: Geschwindigkeitsgesetz 2. Ordnung: $v = k \cdot [R-X] \cdot [Nu^-]$. Klausur-Tipp: Bevorzugt an sterisch ungehinderten **primaeren** Kohlenstoffatomen!
- 单分子亲核取代 — $S_N1$-Mechanismus (Monomolekular): 反应分两步进行，第一步（慢速决速步）离去基团自行解离生成平面正碳离子，第二步亲核试剂快速进攻该正离子。 Zweistufiger Mechanismus ueber ein planares Carbenium-Ion ($sp^2$-hybridisiert). Kinetik: Geschwindigkeitsgesetz 1. Ordnung: $v = k \cdot [R-X]$ (unabhaengig von der Nucleophil-Konzentration!). Klausur-Tipp: Bevorzugt an stabilisierten **tertiaeren** Kohlenstoffatomen!
- 瓦尔登翻转 — Walden-Umkehr (Inversion der Konfiguration): 在 $S_N2$ 反应中，由于亲核试剂只能从离去基团的背侧 180 度进攻，导致中心碳原子连接的其余三个基团像被狂风刮翻的雨伞一样翻转。 Die stereochemische Umkehr der Konfiguration am chiralen Zentrum ($R \to S$ oder $S \to R$). Mechanismus: Rueckseitenangriff erzwingt das Umklappen der Substituenten. Klausur-Tipp: Optische Reinheit bleibt erhalten!
- 外消旋化 — Racemisierung: 在 $S_N1$ 反应中，由于中间体正碳离子为平面三角形结构（$sp^2$），亲核试剂从上方或下方进攻的几率完全均等（各占 50%），导致生成等量的对映异构体混合物。 Die Bildung eines 1:1-Gemisches zweier Enantiomere aus einem chiralen Edukt. Mechanismus: Statistische Gleichverteilung des Angriffs von der Ober- und Unterseite des Carbenium-Ions. Klausur-Tipp: Das Reaktionsprodukt verliert saemtliche optische Aktivitaet!

`Klausur-Satz: Die Reaktionsordnung offenbart den Mechanismus: Haengt die Reaktionsgeschwindigkeit von beiden Eduktkonzentrationen ab, liegt ein bimolekularer $S_N2$-Weg vor; haengt sie nur vom Halogenalkan ab, ein monomolekularer $S_N1$-Weg.`

## Schritt 3 — entdecken: Das Reaktionskoordinaten-Profil
ENTDECKEN（1概念 + 1文字图解）：

中文：理解 $S_N1$ 与 $S_N2$ 的核心在于掌握它们在势能面（Reaktionskoordinate）上的拓扑差异：
- $S_N2$（单步山丘）：仅有一个能量峰顶（Übergangszustand），无任何化学中间体存在！
- $S_N1$（双峰双驼峰）：有两个活化能山峰，中间凹陷处是一个真实存在的化学亚稳态中间体——平面正碳离子（Carbenium-Ion）！

文字图解（ASCII 能量曲线与过渡态结构）：

```diagram
Vergleich der Energieprofile (Reaktionskoordinaten):

  Enthalpie H                            Enthalpie H
       ^                                      ^
       |          [ Übergangszustand ]        |          [ TS 1 (langsam!) ]
       |                   *                  |                   *
       |                 /   \                |                 /   \       [ TS 2 ]
       |   E_A(SN2)     /     \               |   E_A1         /     \  *  /  \
       |               /       \              |               /   [Carbenium]  \
  Edukt|  * ---------'          \        Edukt|  * ---------'     (Zwischen-    \
  (R-X)|                         * Produkt    |                    stufe)        * Produkt
       +----------------------------> Koord.  +-----------------------------------> Koord.
                  S_N 2 (1-stufig)                           S_N 1 (2-stufig)
```

Struktur des $S_N2$-Uebergangszustands:
```diagram
           H
           |       delta-
  delta-   |      /
    HO --- C --- Br
          / \
         H   H
  (Trigonale Bipyramide: 5-bindiger Kohlenstoff!)
```

`Klausur-Satz: Die Stufe der Carbenium-Ionen-Bildung stellt bei der $S_N1$-Reaktion den geschwindigkeitsbestimmenden Schritt (hoechste Aktivierungsenergie $E_{A,1}$) dar.`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Wusstest du, dass Paul Walden 1896 fast fuer verrueckt erklaert wurde, als er seine beruehmte "Walden-Umkehr" entdeckte? Die damaligen Chemiker glaubten felsenfest, dass Atome in starren Kugeln angeordnet sind und chemische Bindungen wie Holzstoeckchen brechen. Als Walden nachwies, dass man aus rechtsdrehender Apfelsaeure durch simple Zugabe von Phosphorpentachlorid ploetzlich linksdrehende Chlorspfeffersaeure erhaelt und diese durch Silberoxid wieder in linksdrehende Apfelsaeure verwandeln kann — das Molekuel also seine "Haendigkeit" komplett invertierte —, glaubten viele an einen Messfehler. Erst die Quantenchemie und der $S_N2$-Rueckseitenangriff bewiesen: Molekuele sind keine starren Steine, sondern elastische geometrische Skulpturen!

**中文解读**: 1896 年化学家保罗·瓦尔登（Paul Walden）发现以他命名的“瓦尔登翻转”时，欧洲学术界一片哗然，甚至有人嘲笑他把化学仪器装反了。因为当时主流观点认为分子就像硬邦邦的木球，换一个原子只是原样插拔。当瓦尔登硬生生用一系列简单反应，把具有右旋光活性的苹果酸 100% 倒腾成了左旋苹果酸时，所有人都傻眼了！直到几十年后 $S_N2$ 反面进攻机理被证实，人们才恍然大悟：原来中心碳原子的三个基团在被进攻瞬间，真的会像暴风雨里的雨伞一样被整体吹翻骨架！

**Bezug zum Konzept**: `Waldens Entdeckung lieferte den ersten experimentellen Beweis fuer den raeumlich gerichteten Rueckseitenangriff bei bimolekularen Substitutionen.`

## Schritt 4 — ausprobieren: Sandbox-Auftrag Synthese-Vorhersage im Abitur
Kontinuitaet: Vorher Chemie-Puffer-und-Henderson-Hasselbalch-L1.md | Nachher Chemie-Reaktionsmechanismen-Uebergang-Elektronenpaar-Formalladung.md. Krise dieser Episode: Rueckseitenangriff oder Carbokation? Das Duell der molekularen Pfade. Zielgroessen: SN1, SN2, Walden-Umkehr, Carbenium-Ion, sterische Hinderung, Kinetik

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: balance-board]

AUFGABE (analysieren & beurteilen, AFB I/II/III)：
Zwei unmarkierte Laborflaschen enthalten jeweils ein chirales Halogenalkan:
- Flasche A: $(R)$-2-Brombutan (sekundaeres Halogenalkan)
- Flasche B: 2-Brom-2-methylbutan (tertiaeres Halogenalkan)
Beide Substanzen werden mit wasserfreiem Natriumiodid ($NaI$) in trockenem Aceton (polares aprotisches Loesungsmittel) bzw. mit Wasser in Ethanol (polares protisches Loesungsmittel) zur Reaktion gebracht.
1. Analysieren Sie fuer beide Edukte, welcher Mechanismus ($S_N1$ oder $S_N2$) unter den jeweiligen Bedingungen favorisiert wird, und begruenden Sie dies anhand sterischer und elektronischer Faktoren. (12 BE)
2. Beurteilen Sie die optische Aktivitaet des Produkts, wenn reines enantiomerenreines $(R)$-2-Brombutan ueber einen reinen $S_N2$-Weg umgesetzt wird. (18 BE)

HILFE:
1. Schritt 1: Substrat untersuchen:
   - Flasche B ist tertiaer $\implies$ Rueckseitenangriff durch 3 Methylgruppen sterisch komplett blockiert $\implies$ zwingend $S_N1$ (tertiäres Carbenium-Ion ist durch Hyperkonjugation und +I-Effekte extrem stabil).
   - Flasche A ist sekundaer $\implies$ Grenzfall! Haengt vom Loesungsmittel und Nucleophil ab.
2. Schritt 2: Loesungsmitteleinfluss:
   - Aceton (polar aprotisch) solvatisiert keine Anionen $\implies$ $I^-$ ist "nackt" und hochgradig nucleophil $\implies$ beguenstigt $S_N2$ bei Flasche A!
   - Wasser/Ethanol (polar protisch) bildet Wasserstoffbruecken zu Anionen $\implies$ daempft Nucleophilie, stabilisiert aber das Carbokation $\implies$ beguenstigt $S_N1$.
3. Schritt 3: Stereochemie: Reines $S_N2$ fuehrt zur 100% Inversion $\implies$ das Produkt ist wieder enantiomerenrein und voll optisch aktiv (Drehung der Polarisationsebene).

MUSTERLÖSUNG:
1. Mechanismus-Analyse:
   - **Flasche B (2-Brom-2-methylbutan, tertiaer)**: Reagiert **ausschliesslich nach dem $S_N1$-Mechanismus**. Ein $S_N2$-Rueckseitenangriff ist sterisch unmoeglich, da drei raumgreifende Alkylgruppen den Zugang zum zentralen Kohlenstoffatom abschirmen (**sterische Hinderung**). Gleichzeitig ist das nach Abspaltung des Bromid-Ions entstehende tertiaere Carbenium-Ion durch den positiven induktiven Effekt (+I-Effekt) der drei Alkylgruppen und Hyperkonjugation thermodynamisch ausserordentlich stabil.
   - **Flasche A ($(R)$-2-Brombutan, sekundaer)**: Reagiert im aprotischen Aceton bevorzugt nach **$S_N2$**, im protischen Wasser/Ethanol nach **$S_N1$**. Da sekundaere Zentren sterisch maessig zugaenglich sind, entscheidet das Milieu: Das polare aprotische Loesungsmittel Aceton kann das $I^-$-Ion nicht durch Wasserstoffbrueckenbindungen abschirmen; das Iodid liegt als extrem reaktives, "nacktes" Nucleophil vor und erzwingt den $S_N2$-Rueckseitenangriff. Das polare protische Wasser/Ethanol-Gemisch hingegen stabilisiert die Ionenladung der Carbenium-Zwischenstufe und beguenstigt den $S_N1$-Pfad.
2. Stereochemische Beurteilung des Produkts von Flasche A bei $S_N2$:
   - Da der $S_N2$-Mechanismus konzertiert (in einem einzigen Schritt) ohne freies Zwischenkation verlaeuft, kann das Nucleophil ausschliesslich von der dem Bromatom exakt gegenueberliegenden Rueckseite (180°-Winkel) angreifen.
   - Waehrend der Bindungsbildung mit dem Nucleophil klappen die drei verbleibenden Substituenten ($H, CH_3, C_2H_5$) simultan auf die andere Seite um (**Walden-Umkehr / Inversion der Konfiguration**).
   - Aus dem chiralen, enantiomerenreinen $(R)$-Edukt entsteht mit 100% stereospezifischer Ausbeute das invertierte $(S)$-Produkt. Das Produktgemisch enthaelt keinerlei Racematanteil; es ist **vollstaendig optisch aktiv** und dreht die Schwingungsebene von linear polarisiertem Licht im Polarimeter um einen charakteristischen Drehwinkel $\alpha$.

`Klausur-Satz: Waehrend $S_N2$-Reaktionen unter vollstaendiger Konfigurationsinversion zu optisch aktiven Produkten fuehren, zerstoert die intermediäre Planaritaet des $S_N1$-Carbenium-Ions die Chiralitaet und erzeugt ein inaktives Racemat.`

## Schritt 5 — ausprobieren: Duell der molekularen Pfade: SN1 vs. SN2

VERGLEICH: $S_N1$ (Monomolekular) vs. $S_N2$ (Bimolekular)

- Kriterium 1: Stufen und Kinetik:
  - $S_N1$: Zweistufig mit Carbenium-Ion; Kinetik 1. Ordnung ($v = k [R-X]$).
  - $S_N2$: Einstufig ohne Zwischenstufe; Kinetik 2. Ordnung ($v = k [R-X] [Nu^-]$).
- Kriterium 2: Stereochemie am chiralen Zentrum:
  - $S_N1$: Racemisierung (Verlust der optischen Aktivitaet, 50% R / 50% S).
  - $S_N2$: Inversion der Konfiguration (Walden-Umkehr, 100% Umklappen).
- Kriterium 3: Bevorzugtes Substrat:
  - $S_N1$: Tertiaer > Sekundaer $\gg$ Primaer (Carbenium-Ion-Stabilitaet dominiert).
  - $S_N2$: Methyl > Primaer > Sekundaer $\gg$ Tertiaer (Sterische Zugaenglichkeit dominiert).
- Kriterium 4: Loesungsmitteleinfluss:
  - $S_N1$: Beguenstigt durch polare protische Loesungsmittel (stabilisieren Ionen).
  - $S_N2$: Beguenstigt durch polare aprotische Loesungsmittel (erhalten nacktes Nucleophil).

Entscheidungsregel fuer die Klausur:
Merke dir die "3-2-1-Regel": Tertiaer will $S_N1$, Primaer will $S_N2$, Sekundaer fragt das Loesungsmittel!

## Schritt 6 — check: Klausur-Transfer Reaktionskinetik & Geschwindigkeitsgesetz
PRÜFUNGSSZENARIO (KLP NRW Chemie Q1 Inhaltsfeld 1: Reaktionsmechanismen / Kinetik):

In einer kinetischen Versuchsreihe wird die Hydrolyse zweier Halogenalkane mit Natronlauge untersucht:
- Versuch 1: Die Konzentration von 1-Brombutan wird verdoppelt $\to$ Reaktionsgeschwindigkeit verdoppelt sich ($2 \times v$). Die Konzentration von $OH^-$ wird zusaetzlich verdreifacht $\to$ Geschwindigkeit versechsfacht sich ($6 \times v$).
- Versuch 2: Bei 2-Brom-2-methylpropan wird die Konzentration von $OH^-$ verzehnfacht $\to$ die Reaktionsgeschwindigkeit bleibt absolut unveraendert ($1 \times v$). Erst als die Konzentration des Halogenalkans verdoppelt wird, verdoppelt sich die Geschwindigkeit ($2 \times v$).

AUFGABE (ableiten & begründen, AFB II/III):
1. Leiten Sie aus den Messreihen fuer beide Versuche das jeweilige differentielle Geschwindigkeitsgesetz ab. (10 BE)
2. Begruenden Sie mechanistisch, warum die Reaktionsgeschwindigkeit in Versuch 2 vollstaendig unbeeinflusst von der Konzentration des Hydroxid-Ions bleibt. (20 BE)

ERWARTUNGSHORIZONT:
- AFB II:
  - *Versuch 1*: Die Geschwindigkeit ist sowohl proportional zu $[R-Br]^1$ als auch zu $[OH^-]^1$. Gesamtreaktionsordnung = $1 + 1 = 2$.
    Geschwindigkeitsgesetz: $v_1 = k_1 \cdot [1\text{-Brombutan}] \cdot [OH^-]$ $\implies$ Beweis fuer **$S_N2$**.
  - *Versuch 2*: Die Geschwindigkeit haengt linear von $[R-Br]^1$ ab, aber von $[OH^-]^0$ (Ordnung Null bezueglich des Nucleophils). Gesamtreaktionsordnung = 1.
    Geschwindigkeitsgesetz: $v_2 = k_2 \cdot [2\text{-Brom-2-methylpropan}]$ $\implies$ Beweis fuer **$S_N1$**.
- AFB III:
  - *Mechanistische Begruendung fuer Versuch 2*: Die $S_N1$-Reaktion laeuft in zwei aufeinanderfolgenden Teilschritten ab. Der erste Teilschritt ist die spontane, heterolytische Abspaltung des Bromid-Ions unter Bildung des Carbenium-Ions ($R-Br \rightleftharpoons R^+ + Br^-$). Dieser Schritt erfordert das Aufbrechen einer kovalenten Bindung ohne Hilfe des Nucleophils und besitzt eine enorm hohe Aktivierungsenergie. Er ist folglich der **geschwindigkeitsbestimmende Schritt (Flaschenhals)** der Gesamtreaktion.
  - Das Hydroxid-Ion greift erst im zweiten, nachgelagerten Teilschritt an ($R^+ + OH^- \to R-OH$). Da das positiv geladene Carbenium-Ion extrem reaktiv ist, erfolgt dieser zweite Schritt blitzschnell mit vernachlaessigbar kleiner Aktivierungsenergie. Selbst wenn Milliarden von $OH^-$-Ionen im Loesungsmittel lauern, muessen sie alle warten, bis ueberhaupt ein Carbenium-Ion gebildet wird. Eine Erhoehung der $OH^-$-Konzentration kann den langsamen ersten Schritt nicht beschleunigen — die Gesamtreaktionsgeschwindigkeit bleibt strikt unbeeinflusst.

## Schritt 7 — check: Format-Check & Scoring
30 XP Schnelltest zur Verstaendigungssicherung:

FRAGE: Welche raeumliche Geometrie besitzt das intermediäre Carbenium-Ion bei einer $S_N1$-Reaktion?
ANTWORT: Eine planare Dreiecksgeometrie ($sp^2$-hybridisierter Kohlenstoff mit 120°-Bindungswinkeln).

FRAGE: Wie bezeichnet man das stereochemische Phaenomen beim $S_N2$-Mechanismus, bei dem die Substituenten wie ein Regenschirm umklappen?
ANTWORT: Walden-Umkehr (Inversion der Konfiguration).

FRAGE: Welche Art von Kohlenstoffgeruest (primaer oder tertiaer) reagiert bevorzugt ueber einen $S_N2$-Mechanismus?
ANTWORT: Primaere Kohlenstoffatome (aufgrund minimaler sterischer Hinderung).

## Schritt 8 — reflexion: Meisterschaft & Naechste Mission
REFLEXION:
Du beherrschst nun die Koenigsdisziplin der organischen Reaktionsmechanismen. Du kannst Reaktionsprofile zeichnen, stereochemische Inversionen von Racematen unterscheiden und Geschwindigkeitsgesetze im Abitur souveraen deuten.

<!-- reflexion: chemie-reaktionsmechanismen-sn1-vs-sn2 -->
In der naechsten MINT-Episode tauchen wir ein in das groesste biochemische Kraftwerk unseres Planeten: Wie wandeln Chloroplasten im Z-Schema Sonnenlicht in chemische Energie und Zucker um? Weiter geht es mit [Bio-Fotosynthese-Lichtreaktion-und-Calvin-Zyklus-L1](Bio-Fotosynthese-Lichtreaktion-und-Calvin-Zyklus-L1.md).
