---
fach: ""
thema: "Lehrplan-Content-Spezifikation"
operatoren: []
klausurrelevant: false
datum: 2026-09-25
tags: [EF, Meta]
---

# EF-GeWi-Lernvault 考纲全量内容搜集与生成规范 (Master Content Specification)

> **适用对象**：用户与外部高级大模型（Claude 3.5 Sonnet / GPT-4o / Gemini 1.5 Pro）。  
> **核心目标**：为北威州高级阶段（Gymnasiale Oberstufe EF, NRW）十大学科批量补充缺失的交互课程、八段式知识笔记与双向词卡。  
> **版权红线**：纯原创总结与自编例题，绝不收录学校真题原件、教材影印件或版权受限扫描件。

---

## 目录
1. [十大学科考纲缺口全景清单 (Curriculum Gap Inventory)](#1-十大学科考纲缺口全景清单)
2. [规范 A：Lernreise 9 步交互课程脚本标准模板](#2-规范-alernreise-9-步交互课程脚本标准模板)
3. [规范 B：Wissensnotiz 八段式知识笔记标准模板](#3-规范-bwissensnotiz-八段式知识笔记标准模板)
4. [规范 C：Anki CSV 双向卡片与术语规范](#4-规范-canki-csv-双向卡片与术语规范)
5. [即用型外部 AI 批量提示词 (Master Prompts)](#5-即用型外部-ai-批量提示词)

---

## 1. 十大学科考纲缺口全景清单

根据北威州各科核心教学计划（Kernlehrplan EF, NRW）及全库审计，目前以下 10 门学科急需补充核心教学内容：

| 学科目录 | 学科名称 | 核心知识域 (Inhaltsfelder, IF) | 紧缺交互课程 (Lernreise) 需求 (目标 3~4 篇/科) | 紧缺知识笔记 (Wissensnotizen) 重点补全方向 |
| :--- | :--- | :--- | :--- | :--- |
| `01_Deutsch/` | 德语 (Deutsch) | IF 1: Texte der Gegenwart & Klassik (Drama/Lyrik)<br/>IF 2: Sprache & Sprachwandel (Mehrsprachigkeit)<br/>IF 3: Kommunikation & Medien | • `Deutsch-Drama-Szenenanalyse-L1.md`<br/>• `Deutsch-Sachtext-Argumentation-L1.md`<br/>• `Deutsch-Lyrik-Sturm-und-Drang-L1.md` | 戏剧场景分析步骤、政论说明文论证结构剖析、启蒙与狂飙突进诗歌意象、交际模型（Schulz von Thun 四耳模型） |
| `02_Englisch/` | 英语 (Englisch) | IF 1: Growing up / Identity / Role Models<br/>IF 2: Global Challenges / Digital Media<br/>Teil B: Mediation & Strategies | • `Englisch-Characterisation-Techniques-L1.md`<br/>• `Englisch-Mediation-Strategies-L1.md`<br/>• `Englisch-Comment-Writing-L1.md` | 间接与直接人物刻画术语、跨文化调解信函与博客格式、辩论文 (Comment) P.E.E. 结构、非洲英语文学 (Nigeria) 核心主题 |
| `03_Mathe/` | 数学 (Mathe) | IF 1: Funktionen & Analysis (Polynome, Ableitung, Tangenten, Extremstellen)<br/>IF 2: Stochastik Grundlagen<br/>IF 3: Analytische Geometrie | • `Mathe-Sekante-zu-Tangente-L1.md`<br/>• `Mathe-Ableitungsregeln-Polynome-L1.md`<br/>• `Mathe-Kurvendiskussion-Kompakt-L1.md`<br/>• `Mathe-Steckbriefaufgaben-Verfahren-L1.md` | 割线斜率到瞬时切线斜率微分思想、导数运算法则、单调性与极值一阶二阶充分条件检验、待定系数法几何条件方程组求解 |
| `04_Physik/` | 物理 (Physik) | IF 1: Kinematik & Dynamik (Gleichförmig, Beschleunigt, Freier Fall, Newton)<br/>IF 2: Mechanische Energie & Impuls | • `Physik-Kinematik-Messung-L1.md`<br/>• `Physik-Newton-Dynamik-L1.md`<br/>• `Physik-Energieerhaltung-Mechanik-L1.md` | 匀变速运动公式推导与 s-t/v-t 图像斜率面积积分意义、牛顿第二定律受力分解、机械能守恒定律弹簧与重力势能计算 |
| `05_Chemie/` | 化学 (Chemie) | IF 1: Atombau & Periodensystem<br/>IF 2: Chemische Bindung & Zwischenmolekulare Kräfte<br/>IF 3: Kinetik & Säure-Base | • `Chemie-Zwischenmolekulare-Kraefte-L1.md`<br/>• `Chemie-Chemisches-Gleichgewicht-L1.md`<br/>• `Chemie-Saeure-Base-pH-L1.md` | 范德华力/偶极作用/氢键与宏观物理性质（沸点/溶解度）联系、勒夏特列原理与浓度/压强/温度平衡移动、pH值对数计算与弱酸电离平衡 |
| `06_Bio/` | 生物 (Bio) | IF 1: Zellbiologie (Zellorganellen, Biomembran, Transport)<br/>IF 2: Enzymkinetik & Stoffwechsel<br/>IF 3: Ökologie Grundlagen | • `Bio-Biomembran-Transport-L1.md`<br/>• `Bio-Enzymaktivitaet-Faktoren-L1.md`<br/>• `Bio-Zellorganellen-Struktur-L1.md` | 流动镶嵌模型与被动扩散/易化扩散/主动运输、温度与pH对酶促反应速率影响机理、线粒体/叶绿体双层膜与内共生学说 |
| `07_Philosophie/`| 哲学 (Philosophie)| IF 1: Was ist der Mensch? (Anthropologie, Gehlen, Kant)<br/>IF 2: Was soll ich tun? (Kant Pflichtethik vs. Utilitarismus)<br/>IF 3: Was darf ich hoffen? (Staatsphilosophie) | • `Philo-Kategorischer-Imperativ-L1.md`<br/>• `Philo-Utilitarismus-Kalkuel-L1.md`<br/>• `Philo-Anthropologie-Sonderstellung-L1.md` | 康德定言命令 Universalisierungsformel 四步检验法、边沁功利主义快乐七维计算表与密尔质优论、格伦人之欠缺存在者 (Mängelwesen) |
| `08_SoWi/` | 政治社科 (SoWi) | IF 1: Soziale Marktwirtschaft (Preismechanismus, Tarifautonomie)<br/>IF 2: Gesellschaft & Soziale Ungleichheit (Gini, Mobilität)<br/>IF 3: Politisches System & Partizipation | • `Sowi-Preismechanismus-Markt-L1.md`<br/>• `Sowi-Soziale-Ungleichheit-Gini-L1.md`<br/>• `Sowi-Gesetzgebung-Demokratie-L1.md` | 供求曲线弹性与政府价格干预（最低工资/租金管制）负效应、基尼系数与洛伦兹曲线四维不平等维度、联邦议院法律草案三读通过程序 |
| `09_Musik/` | 音乐 (Musik) | IF 1: Sonatenhauptsatzform & Motivische Arbeit (Beethoven)<br/>IF 2: Programmmusik & Textbezug | • `Musik-Sonatensatzform-Analyse-L1.md`<br/>• `Musik-Motivische-Verarbeitung-L1.md` | 奏鸣曲式三大段（呈示部/展开部/再现部）主副部调性对比、动机变奏手法（模进/逆行/倒影/减缩/扩充）、听觉听写分析量表 |
| `10_Sport/` | 体育 (Sport) | IF 1: Bewegungsanalyse & Biomechanik (Meinel/Schnabel)<br/>IF 2: Trainingslehre & Ausdauer (Superkompensation) | • `Sport-Phasenstruktur-Meinel-L1.md`<br/>• `Sport-Ausdauertraining-Prinzipien-L1.md` | 运动三相模型（准备相/主相/结束相）动力学特征、超量恢复原理与负荷强度控制、短跑起跑与跳远腾空步生物力学优化 |

---

## 2. 规范 A：Lernreise 9 步交互课程脚本标准模板

交互课程是**客户端传授全新概念的核心模块**。每一篇必须严格遵守以下 9 步阶梯结构，使客户端解析器能够无误挂载、分步放行（Gating）并嵌入交互教具：

### 文件命名与存放路径
- **存放目录**：`Lernreise/` 根目录下（只读消费）
- **文件名格式**：`<Fach>-<Thema-Kebab-Case>-L<Level>.md`
- **严禁事项**：**文件名绝对禁止包含空格及德语变音字符（ä/ö/ü/ß），必须使用 ae/oe/ue/ss 代替**。
- **示例**：`Lernreise/Mathe-Sekante-zu-Tangente-L1.md`

### 模板全文骨架

```markdown
---
fach: Mathe
thema: "Von der Sekante zur Tangente"
level: 1
ziel: Klausur
xp: 100
operatoren: [darstellen, berechnen, interpretieren]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, Mathe, Analysis]
version: Lesson-v3
---

# Lernreise: Von der Sekante zur Tangente (L1 Pilot, Ziel Klausur)

<!-- Lesson v3 9步制架构规范：Schritt 1至8固定结构；Fehlvorstellung 夹在 Schritt 6 与 7 之间；支持内嵌 [Werkzeug: <id>] 交互教具 -->

## Schritt 1 — entdecken

ZIELE (3条，本节15分钟学完能做到——先读中文，再记德语)：

1. 中文：能说清割线斜率（平均变化率）与切线斜率（瞬时变化率）的根本几何区别。
2. 中文：能写出差商公式并在坐标系中指出 Δx 逼近 0 的动态过程。
3. 中文：能运用德语标准句写出导数作为极限的定义，达到 AFB II 作答标准。

Klausur-Satz: `Die Ableitung an einer Stelle entspricht dem Grenzwert der Differenzenquotienten für delta_x gegen 0 und beschreibt die lokale Steigung der Tangente.`

## Schritt 2 — entdecken

PRETRAINING术语盒（核心5词，先读三遍中德，合书自测中文→德语，Evidenz：pretraining降认知负荷）：

中文在上，德语在下：

- 平均变化率（割线斜率） — Mittlere Änderungsrate (Sekantensteigung)：两点间直线的倾斜程度，即差商 Δy/Δx。
- 瞬时变化率（切线斜率） — Lokale/Momentane Änderungsrate (Tangentensteigung)：在某一点处的瞬时变化率，即极限 lim。
- 割线 — Sekante：穿过函数曲线上至少两点的直线。
- 切线 — Tangente：在某一点与曲线紧密相贴且斜率等于该点导数的直线。
- 差商 — Differenzenquotient：[f(x0 + h) - f(x0)] / h，表示割线的斜率。

Klausur-Satz: `Der Differenzenquotient beschreibt die Sekantensteigung zwischen zwei Punkten, während der Differentialquotient die Tangentensteigung an einer Stelle angibt.`

## Schritt 3 — entdecken

ENTDECKEN（1概念 + 1文字图解）：

中文：导数不是什么玄学，就是把两个点越缩越近。当第二个点无限贴近第一个点（h 或 Δx 趋向于 0）时，连接两点的「割线」就在极限位置旋转定型成了「切线」。切线的斜率就是瞬时变化率。

文字图解（ASCII 结构图，App支持解析渲染）：

```diagram
        y ^
          |                 . P2(x0+h | f(x0+h))   <-- Sekante
          |               .´ /
          |             .´  /
          |          .´   / Tangente
          |       .´    /
          |    .´     /
          |  P1(x0 | f(x0))
          +-----------------------------------> x
                 x0     x0+h  (h -> 0)
```

Klausur-Satz: `Durch den Grenzübergang h gegen 0 geht die Sekante durch zwei Kurvenpunkte in die Tangente an der Stelle x0 über.`

## Schritt 4 — ausprobieren

BEISPIEL（正确例题示范，含教具操作与解答）：

[Werkzeug: tangent]

AUFGABE (berechnen, AFB II)：Berechnen Sie die mittlere Steigung der Funktion f(x) = x^2 im Intervall [1; 3] und vergleichen Sie diese mit der exakten Tangentensteigung an der Stelle x0 = 1.

HILFE: 
1. Schritt 1: Differenzenquotient aufstellen m_sek = [f(3) - f(1)] / [3 - 1].
2. Schritt 2: Werte einsetzen und ausrechnen.
3. Schritt 3: Ableitung f'(x) = 2x bestimmen und x0 = 1 einsetzen.

MUSTERLÖSUNG: Der Differenzenquotient im Intervall [1; 3] lautet (9 - 1) / (3 - 1) = 8 / 2 = 4. Die Sekantensteigung beträgt somit 4. Die Ableitungsfunktion von f(x) = x^2 ist f'(x) = 2x. An der Stelle x0 = 1 gilt f'(1) = 2. Die Sekantensteigung überschätzt die lokale Tangentensteigung in x0 = 1, da die Kurve linksgekrümmt zunimmt.

Klausur-Satz: `Die lokale Tangentensteigung f'(1) = 2 unterscheidet sich von der mittleren Sekantensteigung m = 4 über das Intervall.`

## Schritt 5 — ausprobieren

VERGLEICH辨别实验（双向辨析：割线眼 vs. 切线眼）：

VERGLEICH: Wähle erst das Verfahren — (i) Sekanten-Verfahren (Intervall, Durchschnitt, Differenzenquotient) oder (ii) Tangenten-Verfahren (Zeitpunkt/Stelle, Momentanwert, Ableitung) — dann lösen.

AUFGABE A：Ein Auto legt in 2 Stunden 140 km zurück. Bestimme die Geschwindigkeit über die gesamte Fahrt.
AUFGABE B：Ein Blitzer misst das Tempo des Autos genau beim Passieren des Schildes. Welche mathematische Größe erfasst der Blitzer?

HILFE: A fragt nach Durchschnitt (Intervall) -> Sekante. B fragt nach Zeitpunkt -> Tangente/Ableitung.

ANTWORT: A erfordert Verfahren (i): v_durchschnitt = 140km / 2h = 70 km/h (mittlere Änderungsrate). B erfordert Verfahren (ii): v_momentan = s'(t0) (momentane Änderungsrate, Steigung der Tangente zum Zeitpunkt t0).

Klausur-Satz: `Durchschnittsgeschwindigkeiten entsprechen Sekantensteigungen, Momentangeschwindigkeiten entsprechen Tangentensteigungen.`

## Schritt 6 — check

CHECK检索默写（自测 3 题，与答案配对）：

FRAGE: Wie lautet die Definition des Differenzenquotienten für ein Intervall [x0; x0 + h]? | ANTWORT: m = [f(x0 + h) - f(x0)] / h
FRAGE: Was geschieht geometrisch mit der Sekante, wenn h gegen 0 strebt? | ANTWORT: Die Sekante dreht sich um den festen Punkt P(x0 | f(x0)) und nähert sich im Grenzfall der Tangente an.
FRAGE: Welcher Operator verlangt die bloße Angabe der Steigung ohne Rechnung: „Nennen Sie...“ oder „Berechnen Sie...“? | ANTWORT: Nennen (AFB I verlangt Faktenwiedergabe ohne Rechenweg; Berechnen verlangt Ansatz und Zwischenschritte).

Klausur-Satz: `Der Grenzwert des Differenzenquotienten für h gegen 0 liefert den Differentialquotienten f'(x0).`

## Fehlvorstellung

(非Schritt小节，Parser 自动识别，不计入步骤步数)

1. 误解“割线和切线只是画法不同，算出来数值一样”。
   中文纠偏：完全不同！割线算的是跨越一段区间的宏观平均值；切线算的是停在针尖上的一瞬间的瞬时值。区间只要有凹凸，割线斜率就不等于切线斜率。
   Korrektur-Satz: `Die Sekantensteigung über ein Intervall darf niemals mit der lokalen Steigung an einem der Intervallränder gleichgesetzt werden.`

2. 误解“Δx 趋近于 0 就是分母等于 0，所以不能除”。
   中文纠偏：微积分的核心正是极限过程（Limes）。Δx 只是无限逼近 0，但在求极限的过程中先消去分母上的公因式 h，再令 h 趋于 0，并不违反数学公理。
   Korrektur-Satz: `Beim Grenzübergang wird der Differenzenquotient erst algebraisch gekürzt, bevor h gegen 0 betrachtet wird.`

## Schritt 7 — szenario

ROLLE: Du bist Mathe-Tutor in der gymnasialen Oberstufe.
SITUATION: Eine Mitschülerin versteht nicht, warum ihr Graphikrechner (GTR) bei f(x) = x^3 im Intervall [-1; 1] als Durchschnittssteigung 1 ausgibt, die Tangente bei x = 0 aber waagerecht (Steigung 0) verläuft. Erkläre ihr das Phänomen anhand der beiden Begriffe Sekante und Tangente.
RUBRIC: These in Satz 1 (Unterschied Sekante vs. Tangente) | Berechnung Sekantensteigung (1 - (-1)) / 2 = 1 | Begründung Tangente f'(0) = 0 | Abschlussfazit mit Fachtermini.

## Schritt 8 — entdecken

TAKEAWAY 1盒（核心总结）：

中文：割线拉区间求平均（两点差商），切线定一点求瞬时（极限导数）。做题先看是“时间段”还是“时间点”，段选割线，点选导数。
Takeaway-Satz: `Sekanten mitteln über Intervalle, Tangenten erfassen den Moment — die Ableitung ist der Grenzwert der Sekantensteigung.`

REFLEXION 2问：
1. 过程自省：Welcher Schritt fiel schwerer — der algebraische Grenzwert (Schritt 4) oder die Begriffsunterscheidung (Schritt 5)?
2. 元认知计划：Beim nächsten Mal überprüfe ich zuerst, ob ein Intervall oder ein Zeitpunkt gegeben ist.
```

---

## 3. 规范 B：Wissensnotiz 八段式知识笔记标准模板

用于为库中新增或补全深度的核心知识笔记。

### 文件路径规范
- **文科 / 社科**（Deutsch · Englisch · Philosophie · SoWi · Musik · Sport）→ `<FachFolder>/Texte-Analyse/<Thema-DE-kebab-case>.md`
- **理科**（Mathe · Physik · Chemie · Bio）→ `<FachFolder>/<Thema-DE-kebab-case>.md`
- **文件名要求**：**全英文小写 + 连字符（kebab-case），严禁空格，禁止变音符号**（如用 `ueberhangmandat.md` 而非 `Überhangmandat.md`）。

### 结构八段式规范

```markdown
---
fach: SoWi
thema: "Preismechanismus-und-Marktformen"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-25
tags: [EF, SoWi, Wirtschaft]
stufe: "EF"
---

# Preismechanismus und Marktformen (价格机制与市场形态)

> **中文理解**：价格机制是市场经济的心脏。供求关系通过价格波动自动调节资源配置：供给过剩则价格下跌抑制生产，供给不足则价格上涨刺激生产。在高中 EF 考卷中，该考点常结合国家对价格的干预（如法定最低工资 Mindestlohn 或租金管制 Mietpreisbremse）出现在 AFB II 分析题与 AFB III 辩证评判题中。
>
> **Klausur-Relevanz**：NRW EF 必考基础题眼，是理解后续“社会市场经济（Soziale Marktwirtschaft）”中自由与兜底张力的第一前提。

---

## 1. 核心概念 (Kernbegriffe)

| 术语 (DE) | 中文 | English | 定义 / 公式 | 备注 |
|---|---|---|---|---|
| der Preismechanismus | 价格机制 | price mechanism | Automatischer Ausgleich von Angebot und Nachfrage über Preissignale | 市场核心自律机制 |
| der Gleichgewichtspreis | 均衡价格 | equilibrium price | Preis, bei dem angebotene und nachgefragte Menge übereinstimmen | 供需交点 (Schnittpunkt) |
| der Nachfrageüberhang | 供不应求 / 需求过剩 | excess demand | Nachfragemenge > Angebotsmenge bei Preisen unter dem Gleichgewicht | 诱发黑市与短缺 |
| der Angebotsüberhang | 供大于求 / 供给过剩 | excess supply | Angebotsmenge > Nachfragemenge bei Preisen über dem Gleichgewicht | 产生库存积压 |
| das Monopol / Oligopol | 垄断 / 寡头垄断 | monopoly / oligopoly | Marktform mit einem bzw. wenigen Anbietern; Aushebelung des Wettbewerbs | 价格机制失灵主因 |

---

## 2. 知识结构 (Struktur)

### 2.1 价格的四大核心功能 (Funktionen des Preises)
1. **信号与指示功能 (Signalfunktion / Informationsfunktion)**：价格高低直观反映某种商品的稀缺程度。
2. **配置与调节功能 (Allokationsfunktion)**：引导资本和劳动力流向利润最高、社会需求最迫切的产业。
3. **出清功能 (Ausgleichs- / Räumungsfunktion)**：在灵活价格下，市场自动达到无积压、无短缺的状态。
4. **激励与筛选功能 (Anreiz- und Selektionsfunktion)**：促使企业降低成本技术创新，淘汰低效落后产能。

> *Klausur-Satz*: `Der Preis erfüllt im vollkommenen Markt vier zentrale Funktionen: Signal-, Allokations-, Ausgleichs- und Selektionsfunktion.`

---

## 3. 解题方法 (Methoden)

### 3.1 供求变动与价格干预分析法 (3-Schritt-Analyse)
1. **Schritt 1: Ausgangszustand definieren (界定初始稳态)**：写出原初均衡价格 P0 与均衡数量 Q0。
2. **Schritt 2: Schock analysieren (分析冲击性质)**：判断是需求曲线平移（如消费者偏好变化、收入变动）还是供给曲线平移（如原材料成本上涨、自然灾害）。
3. **Schritt 3: Wirkung & Anpassung (阐述调节过程与后果)**：说明价格如何变动以达到新均衡；若存在最高限价（Höchstpreis）或最低限价（Mindestpreis），明确指出其导致的过剩或短缺。

> **判据 / 决策点**：题目要求分析国家干预时，牢牢抓住“价格机制被阻断（außerkraftgesetzt）”这一关键失灵点展开论述。

---

## 4. 🇨🇳 CN-Methode

### CN-Methode: 供求交叉双轴速画判定法
- **技法内容**：在中国政治经济学与高中数学解析几何训练中，常将价格 P 视作纵轴、数量 Q 视作横轴，利用反比例趋势速画供求十字线。遇到最低限价题，直接在均衡线 P0 上方画水平虚线 Pmin，两线交点之差即为过剩量。
- **DE-Anschluss**：德国 SoWi 考试中同样要求掌握 einfache Angebots- und Nachfragekurve 的几何表征。
- **合规性**：✅ 完全合规。注意在德语答卷中，纵轴必须标注 `Preis (p)`，横轴标注 `Menge (q)`，交点标注 `Gleichgewicht (G)`.
- **Abitur 应用**：可在草稿纸上 10 秒内速画验证文字论述逻辑，避免写反“供不应求”与“供大于求”。

---

## 5. Klausur-Training (自编原创训练题)

### Teilaufgabe 1 (darstellen, AFB I - 6 BE)
Stellen Sie die vier Funktionen des Preises in einer marktwirtschaftlichen Ordnung knapp dar.

**Erwartungshorizont (EHZ)**:
- Nennung und Erläuterung der Signalfunktion (2 BE)
- Nennung und Erläuterung der Allokationsfunktion (2 BE)
- Nennung der Ausgleichs- und Selektionsfunktion (2 BE)

### Teilaufgabe 2 (analysieren, AFB II - 10 BE)
Analysieren Sie die ökonomischen Folgen der Einführung eines gesetzlichen Höchstpreises für Mietwohnungen (Mietpreisbremse) unterhalb des Gleichgewichtspreises.

**Erwartungshorizont (EHZ)**:
- Definition des Höchstpreises als staatliche Preisfestsetzung unter P_Gleichgewicht (2 BE)
- Analyse des Entstehens eines Nachfrageüberhangs: Niedriger Preis führt zu steigender Nachfrage bei gleichzeitig sinkender Angebotsbereitschaft der Vermieter (4 BE)
- Darlegung der Folgeeffekte: Fehlallokation, Entstehung von Schattenmärkten, Investitionsrückgang in Neubauten (4 BE)

---

## 6. 常见错误与防坑指南 (Fehlerquellen)

| 典型错误 / 概念混淆 | 德国考官扣分点说明 | 正确的学术表达 (Klausur-Muster) |
| :--- | :--- | :--- |
| 将最低限价（Mindestpreis）画在均衡点下方 | 最低限价若低于均衡价格则不起作用；最低限价旨在保护供给者，必然设在均衡价格之上 | `Ein staatlicher Mindestpreis entfaltet nur dann ökonomische Wirkung, wenn er über dem Gleichgewichtspreis fixiert wird.` |
| 混淆“沿曲线移动”与“曲线本身的平移” | 纯因自身价格变动引起的供求量改变是沿曲线移动；因外部因素（如收入、技术）引起的是整条曲线位移 | `Eine Preisänderung des Gutes bewirkt eine Bewegung auf der Kurve, während veränderte Präferenzen die gesamte Nachfragekurve verschieben.` |

---

## 7. 学科联系与网络 (Vernetzung)

- **跨学科网络 (SoWi ↔ Philosophie)**: 自由价格机制的效率追求（Adam Smith）↔ 罗尔斯正义论与康德义务论中对弱者尊严的兜底保护（Sozialer Ausgleich）。
- **跨学科网络 (SoWi ↔ Mathe)**: 供求线性方程联立求解交点坐标 `p_Angebot(q) = p_Nachfrage(q)` 对应数学中一次函数方程组求解。
```

---

## 4. 规范 C：Anki CSV 双向卡片与术语规范

为保证抽认卡模块的 FSRS-4.5 算法能够无损读取，外部 AI 产出的词汇卡必须严格符合以下规定：

1. **路径**：`<FachFolder>/Vokabeln-Anki/<Fach>-Vokabeln.csv`
2. **编码**：**UTF-8 无 BOM**。
3. **分隔符**：仅使用英文字符分号 `;`。
4. **禁止项**：**禁止在单元格内换行**，禁止使用双引号包含换行。
5. **列结构（固定 5 列）**：
   ```csv
   Deutsch;Chinesisch;Beispielsatz;Fach;Thema
   ```
6. **示例**：
   ```csv
   die Allokationsfunktion;资源配置功能;Die Allokationsfunktion des Preises lenkt Produktionsfaktoren dorthin, wo der größte Ertrag erzielt wird.;SoWi;Preismechanismus
   der Differenzenquotient;差商 (割线斜率);Der Differenzenquotient beschreibt die durchschnittliche Steigung einer Funktion über einem Intervall.;Mathe;Analysis
   der kategorische Imperativ;定言命令;Kants kategorischer Imperativ fordert, nur nach Maximen zu handeln, die zugleich allgemeines Gesetz werden können.;Philosophie;Ethik
   ```

---

## 5. 即用型外部 AI 批量提示词

用户可直接将以下提示词完整复制并粘贴给 **Claude 3.5 Sonnet / GPT-4o / Gemini 1.5 Pro** 进行批量搜集与生产。

### Prompt 1: 批量生产交互课程脚本 (Lernreise)

```text
你是一位精通德国北威州高中教育体制（Gymnasiale Oberstufe EF, NRW）的资深学科教学专家。
请根据下列要求，为学科 [填入学科，如：03_Mathe 或 08_SoWi] 的核心主题 [填入主题，如：Von der Sekante zur Tangente] 编写一份符合官方教纲的 9 步标准交互课程脚本。

【严苛格式约束】：
1. 文件名格式必须为纯英文连字符无变音字符：[Fach]-[Thema-kebab-case]-L1.md，不得有空格或 ä/ö/ü/ß。
2. 头部 Frontmatter 必须严格包含：fach, thema, level, ziel, xp, operatoren, klausurrelevant: true, datum: YYYY-MM-DD, tags, version: Lesson-v3。
3. 严格包含以下 9 个小节，标题与顺序完全一致：
   - ## Schritt 1 — entdecken (学习目标 ZIELE 中德双语 3 条 + 1条 Klausur-Satz)
   - ## Schritt 2 — entdecken (PRETRAINING 核心5词，中德双语)
   - ## Schritt 3 — entdecken (ENTDECKEN 概念讲授 + 1个字符图解 diagram 代码块)
   - ## Schritt 4 — ausprobieren (BEISPIEL 正确例题示范，可按需嵌入 [Werkzeug: tangent/balance/lego/formula])
   - ## Schritt 5 — ausprobieren (VERGLEICH 双向辨析实验：程序选择与对比)
   - ## Schritt 6 — check (CHECK 检索默写 3 题，格式为 FRAGE: ... | ANTWORT: ...)
   - ## Fehlvorstellung (2条典型学生误区纠偏与 Korrektur-Satz，此节 Parser 自动跳过不占步数)
   - ## Schritt 7 — szenario (ROLLE / SITUATION / RUBRIC 实战，带 30 XP 评价维度)
   - ## Schritt 8 — entdecken (TAKEAWAY 核心总结盒 + REFLEXION 元认知 2 问)
4. 语言标准：概念讲解与引导使用严谨凝练的中文；Klausur-Satz、术语及考场例题使用地道精准的高级德语学术用语（Bildungssprache, EF-Niveau）。
5. 版权红线：所有试题与情境必须完全原创编写，严禁照抄教材扫描或公开考试原题。

请直接输出完整的 Markdown 文件内容，无需额外客套前言。
```

### Prompt 2: 批量生产八段式标准知识笔记 (Wissensnotiz)

```text
你是一位精通德国高中北威州核心教学计划（NRW Kernlehrplan EF）的学科专家。
请为学科 [填入学科，如：05_Chemie] 编写关于 [填入主题，如：Zwischenmolekulare Kraefte] 的标准八段式核心知识笔记。

【严苛格式约束】：
1. 存放路径约定：文科社科放至 <FachFolder>/Texte-Analyse/<Thema>.md，理科放至 <FachFolder>/<Thema>.md。文件名必须为 kebab-case，禁用空格与变音字符。
2. 头部 Frontmatter：包含 fach, thema, operatoren, klausurrelevant: true, datum: YYYY-MM-DD, tags, stufe: "EF"。
3. 正文必须严格包含以下 8 大板块：
   - 顶部导言：中文理解（3-6句精准拆解该概念在考纲与考卷中的定位）+ Klausur-Relevanz 考点价值
   - ## 1. 核心概念 (Kernbegriffe)：五列 Markdown 表格（术语 DE | 中文 | English | 定义/公式 | 备注）
   - ## 2. 知识结构 (Struktur)：分层深入论述，每个子主题必须配以加粗高亮的 `> *Klausur-Satz*: ...`
   - ## 3. 解题方法 (Methoden)：编号解题步骤（1, 2, 3），标注对应官方 Operator 与选择判据
   - ## 4. 🇨🇳 CN-Methode：理科给出高效中国对照解题技法与合规性证明；文科说明豁免理由
   - ## 5. Klausur-Training：自编原创考题（Teilaufgabe 1 & 2），配完整 Erwartungshorizont (EHZ) 与采分点（BE）
   - ## 6. 常见错误与防坑指南 (Fehlerquellen)：表格形式，列出典型概念混淆点、阅卷扣分原因及满分修正句
   - ## 7. 学科联系与网络 (Vernetzung)：与至少一个其他学科的横向思维网络关联
4. 版权红线：所有内容必须纯原创总结与自编，杜绝搬运真实教辅与试卷原文。

请直接输出完整的 Markdown 文本。
```
