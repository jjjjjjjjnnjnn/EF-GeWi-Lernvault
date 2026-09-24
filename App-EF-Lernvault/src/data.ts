export interface Note {
  id: string;
  fach: string;
  thema: string;
  zh: string;
  operatoren: string[];
  klausurrelevant: boolean;
  bodyDE: string[];
  bodyZH: string[];
}

export interface Card {
  id: string;
  front: string;
  back: string;
  example: string;
  fach: string;
  dueIn: string;
}

export const notes: Note[] = [
  {
    id: "sowi-ungleichheit",
    fach: "SoWi",
    thema: "Soziale Ungleichheit & Wohlfahrtsmodelle",
    zh: "社会不平等与福利国家模型",
    operatoren: ["darstellen", "analysieren", "beurteilen"],
    klausurrelevant: true,
    bodyDE: [
      "Dimensionen: Einkommen, Bildung, Vermögen, soziale Herkunft und Geschlecht.",
      "Ursachenanalyse: Strukturwandel, Bildungsexpansion und Meritokratie-Dilemma.",
      "Urteilsbildung: Differenzierung zwischen Sachurteil (Effizienz) und Werturteil (Legitimität & Chancengerechtigkeit).",
    ],
    bodyZH: [
      "核心维度：收入水平、受教育程度、资产积累、家庭出身与性别结构。",
      "成因分析：产业结构变迁、教育扩张滞后与能力主义不平等悖论。",
      "评价规范：严格区隔事实裁决（效率性评估）与价值裁决（合法性与机会公平评价）。",
    ],
  },
  {
    id: "deutsch-sachtext",
    fach: "Deutsch",
    thema: "Sachtextanalyse & rhetorische Mittel",
    zh: "实用文分析与修辞手法",
    operatoren: ["analysieren", "darstellen", "beurteilen"],
    klausurrelevant: true,
    bodyDE: [
      "Einleitung (TATTE): Textsorte, Autor, Titel, Thema, Erscheinungsjahr/-ort und Kernhypothese.",
      "Sinnabschnitte strukturieren: Zeilenangaben präzise belegen und argumentative Verknüpfungen isolieren.",
      "Funktionsanalyse: Rhetorische Mittel (Metapher, Alliteration, Paradoxon) konsequent an der Leserlenkung messen.",
    ],
    bodyZH: [
      "导语（TATTE五要素）：文体特征、作者身份、标题意图、核心议题、发表时间与阐释假说。",
      "意义段落结构化：严格标注起止行号，抽丝剥茧提炼论证链条与驳论逻辑。",
      "修辞功能剖析：拒绝术语堆砌，深入解读修辞手法对读者情感与逻辑的说服导向。",
    ],
  },
  {
    id: "englisch-pee-method",
    fach: "Englisch",
    thema: "P.E.E. Method & Characterization",
    zh: "P.E.E.论据链与人物刻画",
    operatoren: ["analyze", "characterize", "comment"],
    klausurrelevant: true,
    bodyDE: [
      "Point: State the main trait or thematic argument clearly in an explicit topic sentence.",
      "Evidence: Embed direct textual evidence with accurate line references (e.g., 'cf. ll. 12-14').",
      "Explanation: Clarify how stylistic devices and linguistic register reinforce the character's motivation.",
    ],
    bodyZH: [
      "观点（Point）：首句用一个明确的主题句直接亮出人物特质或核心论点。",
      "证据（Evidence）：无缝嵌入文本原句并精准附带行号引注（如 'cf. ll. 12-14'）。",
      "阐释（Explanation）：深入剖析语言风格与语域如何支撑论据并反哺核心人物动机。",
    ],
  },
  {
    id: "mathe-ableitungen",
    fach: "Mathe",
    thema: "Differentialrechnung & Tangentensteigung",
    zh: "微分学与切线斜率几何直观",
    operatoren: ["berechnen", "bestimmen", "begründen"],
    klausurrelevant: true,
    bodyDE: [
      "Grenzwert der Sekantensteigung: $$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}$$.",
      "Wichtige Ableitungsregeln: Potenzregel $$(x^n)' = n x^{n-1}$$, Faktorregel und Summenregel.",
      "Tangentenformel im Punkt $P(x_0|f(x_0))$: $$t(x) = f'(x_0)(x - x_0) + f(x_0)$$.",
    ],
    bodyZH: [
      "割线斜率的极限（导数定义）：$$f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{f(x_0+\\Delta x)-f(x_0)}{\\Delta x}$$。",
      "核心求导法则：幂函数导数 $$(x^n)' = n x^{n-1}$$、常数倍法则与和差法则。",
      "切线方程公式：在点 $P(x_0|f(x_0))$ 处切线为 $$t(x) = f'(x_0)(x - x_0) + f(x_0)$$。",
    ],
  },
  {
    id: "mathe-kurvendiskussion",
    fach: "Mathe",
    thema: "Ganzrationale Funktionen & Kurvendiskussion",
    zh: "整式多项式函数与曲线讨论（极值与拐点）",
    operatoren: ["berechnen", "bestimmen", "untersuchen"],
    klausurrelevant: true,
    bodyDE: [
      "Symmetriekriterien: Achsensymmetrie zur y-Achse $f(-x) = f(x)$ bei geraden Exponenten; Punktsymmetrie zum Ursprung $f(-x) = -f(x)$ bei ungeraden Exponenten.",
      "Extrema: Notwendige Bedingung $f'(x_0) = 0$; hinreichende Bedingung $f''(x_0) < 0$ (Hochpunkt) bzw. $f''(x_0) > 0$ (Tiefpunkt).",
      "Extremwertprobleme im Sachzusammenhang: Hauptbedingung aufstellen, Nebenbedingung einsetzen und Zielfunktion unter Randwertprüfung optimieren.",
    ],
    bodyZH: [
      "对称性判据：纯偶次项满足 $f(-x) = f(x)$（关于 y 轴对称）；纯奇次项满足 $f(-x) = -f(x)$（关于原点对称）。",
      "极值判据：必要条件 $f'(x_0) = 0$；充分条件 $f''(x_0) < 0$ 为极大值点，$f''(x_0) > 0$ 为极小值点。",
      "实际情境极值问题：建立目标函数，代入几何/经济约束条件，在定义域内求导并严格进行边界值检验。",
    ],
  },
  {
    id: "mathe-steckbrief",
    fach: "Mathe",
    thema: "Steckbriefaufgaben & Funktionsanpassung",
    zh: "待定系数法与几何条件逆推建模",
    operatoren: ["aufstellen", "bestimmen", "berechnen"],
    klausurrelevant: true,
    bodyDE: [
      "Ansatz & Grad: Für Polynom n-ten Grades $f(x) = a_n x^n + \\dots + a_0$ sind genau $n+1$ linear unabhängige Bedingungen erforderlich.",
      "Geometrische Bedingungen: Punkte $f(x_0)=y_0$, Extrema $f'(x_0)=0$, Wendepunkte $f''(x_0)=0$, Wendetangente $f'(x_0)=m$.",
      "Lineares Gleichungssystem: Aufstellen via Gauß-Algorithmus oder GTR/CAS; anschließende Definitions- und Randwertprüfung.",
    ],
    bodyZH: [
      "函数设式与自由度：$n$ 次多项式 $f(x) = a_n x^n + \\dots + a_0$ 具有 $n+1$ 个待定系数，必须对应 $n+1$ 个线性无关条件。",
      "几何特征翻译：过定点 $f(x_0)=y_0$、极值点 $f'(x_0)=0$、拐点 $f''(x_0)=0$、拐点切线斜率 $f'(x_0)=m$。",
      "线性方程组求解：通过高斯消元法或图形计算器求解系数向量，最后验证对称性与区间边界合理性。",
    ],
  },
  {
    id: "physik-kinematik",
    fach: "Physik",
    thema: "Kinematik & Newtonsche Axiome",
    zh: "运动学方程与牛顿力学定律",
    operatoren: ["berechnen", "herleiten", "skizzieren"],
    klausurrelevant: true,
    bodyDE: [
      "Gleichmäßig beschleunigte Bewegung: $$s(t) = \\frac{1}{2} a t^2 + v_0 t + s_0$$ und $$v(t) = a t + v_0$$.",
      "Newtonsches Grundgesetz: $$\\vec{F} = m \\cdot \\vec{a}$$ mit strikter SI-Einheitenkontrolle ($$1\\,\\text{N} = 1\\,\\text{kg}\\cdot\\text{m}/\\text{s}^2$$).",
      "Graphische Analysis: Steigung im $s-t$-Diagramm ist Geschwindigkeit, Fläche unter $v-t$-Graph ist Strecke.",
    ],
    bodyZH: [
      "匀加速直线运动规律：$$s(t) = \\frac{1}{2} a t^2 + v_0 t + s_0$$ 与 $$v(t) = a t + v_0$$。",
      "牛顿第二运动定律：$$\\vec{F} = m \\cdot \\vec{a}$$，严格遵循 SI 量纲检验（$$1\\,\\text{N} = 1\\,\\text{kg}\\cdot\\text{m}/\\text{s}^2$$）。",
      "图象物理意义：$s-t$ 图切线斜率为瞬时速度，$v-t$ 图曲线下方包围的面积为位移。",
    ],
  },
  {
    id: "physik-newton-dynamik",
    fach: "Physik",
    thema: "Newtonsche Gesetze & Kräftezerlegung",
    zh: "牛顿力学三大定律与斜面受力分析",
    operatoren: ["analysieren", "berechnen", "begründen"],
    klausurrelevant: true,
    bodyDE: [
      "Trägheit und Wechselwirkung: Trägheitsgesetz (kräftefreier Zustand verharrt in Ruhe/Gleichförmigkeit) und Reaktionsprinzip (Actio gleich Reactio).",
      "Kräftezerlegung an der geneigten Ebene: Hangabtriebskraft $F_H = m \\cdot g \\cdot \\sin(\\alpha)$, Normalkraft $F_N = m \\cdot g \\cdot \\cos(\\alpha)$.",
      "Mechanische Energieerhaltung: $E_{\\text{kin}} + E_{\\text{pot}} = \\frac{1}{2}mv^2 + mgh = \\text{konstant}$ im konservativen Schwerefeld.",
    ],
    bodyZH: [
      "惯性与作用力定律：惯性定律（合力为零时保持静止或匀速直线运动）与反作用力定律（Actio = Reactio）。",
      "斜面受力分解模型：下滑力 $F_H = m \\cdot g \\cdot \\sin(\\alpha)$，法向正压力 $F_N = m \\cdot g \\cdot \\cos(\\alpha)$，摩擦力阻碍相对运动。",
      "机械能守恒定律：在只有重力做功的保守力场中，动能与重力势能之和保持恒定。",
    ],
  },
  {
    id: "physik-freier-fall",
    fach: "Physik",
    thema: "Gleichmäßig beschleunigte Bewegung & Freier Fall",
    zh: "匀加速直线运动与自由落体定律",
    operatoren: ["berechnen", "herleiten", "analysieren"],
    klausurrelevant: true,
    bodyDE: [
      "Bewegungsgleichungen: $$v(t) = g t + v_0$$ und $$h(t) = -\\frac{1}{2} g t^2 + v_0 t + h_0$$ mit $g \\approx 9{,}81\\,\\text{m}/\\text{s}^2$.",
      "Unabhängigkeit von Masse: Im Vakuum fallen alle Körper gleich schnell; Luftwiderstand führt zur Grenzgeschwindigkeit $v_{\\text{term}}$.",
      "Superpositionsprinzip: Horizontale gleichförmige Bewegung überlagert ungestört vertikale Fallbewegung (Wurfparabel).",
    ],
    bodyZH: [
      "运动学方程：$$v(t) = g t + v_0$$ 与 $$h(t) = -\\frac{1}{2} g t^2 + v_0 t + h_0$$，重力加速度 $g \\approx 9{,}81\\,\\text{m}/\\text{s}^2$。",
      "质量无关性：真空中不同质量物体下落加速度严格相同；空气阻力随速率上升，终达受力平衡之终端速度 $v_{\\text{term}}$。",
      "运动独立性原理：平抛运动在水平方向匀速与竖直方向自由落体互不干扰，合成轨迹为平抛抛物线。",
    ],
  },
  {
    id: "chemie-le-chatelier",
    fach: "Chemie",
    thema: "Chemisches Gleichgewicht & Le Chatelier",
    zh: "化学平衡常数与勒夏特列移动原理",
    operatoren: ["erläutern", "berechnen", "aufstellen"],
    klausurrelevant: true,
    bodyDE: [
      "Massenwirkungsgesetz (MWG): Für $$aA + bB \\rightleftharpoons cC + dD$$ gilt $$K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$$.",
      "Prinzip vom kleinsten Zwang: Äußere Einwirkungen (Druck, Temperatur, Konzentration) verschieben das Gleichgewicht zur Kompensationsseite.",
      "Temperatur-Regel: Temperaturerhöhung begünstigt stets die endotherme Teilreaktion ($\\Delta H > 0$).",
    ],
    bodyZH: [
      "质量作用定律（MWG）：对可逆反应 $$aA + bB \\rightleftharpoons cC + dD$$，平衡常数 $$K_c = \\frac{[C]^c [D]^d}{[A]^a [B]^b}$$。",
      "最小应激原理（勒夏特列）：改变外界压力、温度或反应物浓度，平衡向减弱该改变的方向移动。",
      "温度调控规律：升高温度永远促进吸热反应方向（$\\Delta H > 0$），降低温度促进放热方向。",
    ],
  },
  {
    id: "chemie-saeure-base",
    fach: "Chemie",
    thema: "Säure-Base-Gleichgewichte & pH-Wert",
    zh: "布朗斯特酸碱质子理论与 pH 值计算",
    operatoren: ["beschreiben", "berechnen", "begründen"],
    klausurrelevant: true,
    bodyDE: [
      "Brønsted-Lowry-Konzept: Säure als Protonendonator ($H^+$ Abgabe), Base als Protonenakzeptor ($H^+$ Aufnahme) unter Bildung korrespondierender Paare.",
      "Autoprotolyse des Wassers: $2\\,\\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-$ mit Ionenprodukt $K_w = [H_3O^+][OH^-] = 10^{-14}\\,\\text{mol}^2/\\text{l}^2$.",
      "Logarithmische pH-Skala: $\\text{pH} = -\\lg[H_3O^+]$ und Neutralisation $\\text{H}_3\\text{O}^+ + \\text{OH}^- \\to 2\\,\\text{H}_2\\text{O}$ am Äquivalenzpunkt.",
    ],
    bodyZH: [
      "布朗斯特酸碱概念：酸为质子供体（给出质子），碱为质子受体（接收质子），形成共轭酸碱对。",
      "水自耦电离平衡：$2\\,\\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-$，常温下水离子积常数 $K_w = 10^{-14}\\,\\text{mol}^2/\\text{l}^2$。",
      "对数 pH 标度：$\\text{pH} = -\\lg[H_3O^+]$，中和滴定化学计量点满足酸碱物质的量等当量平衡。",
    ],
  },
  {
    id: "chemie-zmk",
    fach: "Chemie",
    thema: "Zwischenmolekulare Kräfte & Stoffeigenschaften",
    zh: "分子间作用力与物质物理性质",
    operatoren: ["erläutern", "vergleichen", "begründen"],
    klausurrelevant: true,
    bodyDE: [
      "Hierarchie der Kräfte: Van-der-Waals-Kräfte (temporäre Dipole) < Dipol-Dipol-Kräfte (permanente Dipole) < Wasserstoffbrückenbindungen (H an F, O, N).",
      "Siedepunkt-Korrelation: Stärkere zwischenmolekulare Wechselwirkungen erfordern höhere thermische Energie zum Phasenübergang.",
      "Löslichkeitsregel: 'Similia similibus solvuntur' — polare Substanzen lösen sich in polaren Solventien, unpolare in unpolaren.",
    ],
    bodyZH: [
      "作用力强度阶梯：范德华力（瞬时偶极诱导）< 永久偶极-偶极力 < 氢键（H 连接强电负性原子 F、O、N）。",
      "沸点与相变规律：分子间作用力越强，克服引力实现气化所需的活化热能越高，宏观沸点与熔点越高。",
      "相似相溶原理：极性溶质易溶于水等极性溶剂，非极性溶质（如烷烃）易溶于有机非极性溶剂。",
    ],
  },
  {
    id: "bio-zellbiologie",
    fach: "Bio",
    thema: "Biomembran & Enzymkinetik",
    zh: "生物膜流动镶嵌模型与酶催化动力学",
    operatoren: ["beschreiben", "erklären", "analysieren"],
    klausurrelevant: true,
    bodyDE: [
      "Flüssig-Mosaik-Modell: Selektiv permeable Phospholipid-Doppelschicht mit integralen und peripheren Proteinen.",
      "Enzymwirkung: Senkung der Aktivierungsenergie $E_A$ durch Bildung des Enzym-Substrat-Komplexes nach dem Schlüssel-Schloss-Prinzip.",
      "Einflussfaktoren: RGT-Regel bis zum Temperaturoptimum; irreversible Denaturierung der Tertiärstruktur bei Überhitzung oder pH-Extremen.",
    ],
    bodyZH: [
      "流动镶嵌模型：具选择透过性的磷脂双分子层骨架，嵌入贯穿蛋白与外周蛋白。",
      "酶催化机制：基于锁钥学说形成酶-底物复合物，显著降低化学反应所需的活化能 $E_A$。",
      "反应速率调控：最适温度前遵循范霍夫规则（RGT）；极端高温或强酸强碱导致空间三级构象不可逆变性。",
    ],
  },
  {
    id: "bio-biomembran-osmose",
    fach: "Bio",
    thema: "Biomembran-Transportmechanismen & Osmose",
    zh: "跨膜运输机制与细胞渗透平衡",
    operatoren: ["beschreiben", "vergleichen", "erklären"],
    klausurrelevant: true,
    bodyDE: [
      "Transporttypen: Passive Diffusion (Kanal-/Carrierproteine ohne ATP entlang Gradient) vs. aktiver Transport (unter ATP-Verbrauch gegen Gradient).",
      "Osmose & Tonizität: Gerichteter Wasserstrom durch Semipermeabilität; hyperton (Wasserverlust), isoton (Gleichgewicht), hypoton (Wassereinstrom).",
      "Pflanzliche Plasmolyse: Ablösung des Protoplasten von Zellwand in hypertoner Lösung; Reversibilität durch Deplasmolyse.",
    ],
    bodyZH: [
      "跨膜运输方式分类：被动转运（顺浓度梯度，无需消耗 ATP，如通道蛋白与载体蛋白协助扩散）vs 主动转运（逆浓度梯度，消耗 ATP）。",
      "渗透作用与介质张力：半透膜两侧水分子定向移动；高渗环境失水、等渗动态平衡、低渗环境吸水膨胀。",
      "植物质壁分离实验：在高渗溶液中原生质体收缩脱离细胞壁；移入纯水或低渗环境可实现质壁分离复原（Deplasmolyse）。",
    ],
  },
  {
    id: "philo-util-kant",
    fach: "Philosophie",
    thema: "Utilitarismus vs. Kantische Deontologie",
    zh: "功利主义效用论 vs 康德义务论伦理",
    operatoren: ["analysieren", "vergleichen", "beurteilen"],
    klausurrelevant: true,
    bodyDE: [
      "Utilitarismus (Bentham/Mill): Teleologische Ethik — 'Größtes Glück der größten Zahl'; Handlung wird an ihren Folgen gemessen.",
      "Kantische Ethik: Deontologische Pflichtethik — Handeln aus Pflicht; der kategorische Imperativ verbietet die Instrumentalisierung des Menschen.",
      "Klausur-Erörterung: Konfliktfall strukturieren, Pro-/Contra-Argumente kriteriengeleitet gewichten und Synthese formulieren.",
    ],
    bodyZH: [
      "功利主义（边沁/密尔）：目的论伦理——追求'最大多数人的最大幸福'，以行动实际产生的社会后果判定善恶。",
      "康德义务论：绝对义务伦理——出于责任而行动；定言命令严禁将人仅仅视为实现目的的手段，捍卫人格尊严。",
      "哲学论述考点：拆解具体伦理困境案例，严格依据事实标准与道德标准对立统一进行价值裁决。",
    ],
  },
  {
    id: "musik-sonatenform",
    fach: "Musik",
    thema: "Sonatenhauptsatzform & Motivverarbeitung",
    zh: "奏鸣曲式宏观建构与动机变奏展开",
    operatoren: ["analysieren", "beschreiben", "darstellen"],
    klausurrelevant: true,
    bodyDE: [
      "Formabschnitte: Exposition (1. Thema Tonika, Überleitung, 2. Thema Dominante) → Durchführung (Modulation, Verdichtung) → Reprise (beide Themen in Tonika).",
      "Verarbeitungstechniken: Umkehrung (Spiegelung an horizontaler Achse), Krebs (zeitliche Rückwärtsbewegung) und Abspaltung.",
      "Partituranalyse: Taktgenaue Belegstellen, Harmoniefolgen und dynamische Kontraste präzise dokumentieren.",
    ],
    bodyZH: [
      "经典曲式结构：呈示部（主部主题调性 vs 副部属调）→ 展开部（多重转调、动机分裂与重组）→ 再现部（调性统一于主调）。",
      "动机展开技法：倒影（音程方向反转）、逆行（音符时序倒放）、倒影逆行与动机片段化剥离。",
      "乐谱分析采分点：精准标注小节起止序号，列出核心和声和弦功能与力度戏剧性对比。",
    ],
  },
  {
    id: "sport-trainingslehre",
    fach: "Sport",
    thema: "Superkompensation & Belastungssteuerung",
    zh: "超量恢复模型与运动生理适应",
    operatoren: ["erläutern", "analysieren", "beurteilen"],
    klausurrelevant: true,
    bodyDE: [
      "Phasenmodell: Belastungsreiz → Homöostasestörung/Ermüdung → Erholungsphase → Superkompensation (Leistungsanstieg über das Ausgangsniveau).",
      "Trainingssteuerung: Neuer Reiz muss im Gipfelintervall erfolgen; verfrühte Reize führen zu Übertraining und Leistungsabfall.",
      "Energiebereitstellung: Anaerob-alaktazid (KP), Anaerob-laktazid (Laktatbildung) und Aerob (Glykogen- & Fettverbrennung).",
    ],
    bodyZH: [
      "超量恢复四阶段：训练负荷刺激 → 机体内环境稳态破坏/疲劳衰竭 → 恢复再生期 → 超量代偿（体能储备超越原初水平）。",
      "负荷节奏把控：下一次进阶训练必须精准命中超量代偿波峰区间；恢复不足盲目施压将诱发过度训练综合征。",
      "代谢供能通路：无氧磷酸原系统（极短爆发）→ 无氧糖酵解系统（乳酸堆积阈值）→ 有氧氧化系统（糖原与脂肪持久供能）。",
    ],
  },
];

export const cards: Card[] = [
  { id: "c1", front: "Soziale Mobilität", back: "社会流动", example: "Bildung ermöglicht intergenerationale soziale Mobilität.", fach: "SoWi", dueIn: "heute" },
  { id: "c2", front: "Chancengerechtigkeit", back: "机会公平", example: "Klausur-Urteile fordern die Explikation von Chancengerechtigkeit.", fach: "SoWi", dueIn: "heute" },
  { id: "c3", front: "TATTE-Formel", back: "德语分析导语五要素", example: "Textsorte, Autor, Titel, Thema, Erscheinungsjahr.", fach: "Deutsch", dueIn: "heute" },
  { id: "c4", front: "Deutungshypothese", back: "阐释假说", example: "Die Deutungshypothese leitet die systematische Textanalyse an.", fach: "Deutsch", dueIn: "morgen" },
  { id: "c5", front: "P.E.E. Principle", back: "观点-引文-解释三段论", example: "Every analytical paragraph must follow Point-Evidence-Explanation.", fach: "Englisch", dueIn: "heute" },
  { id: "c6", front: "Register & Style", back: "语域与语体控制", example: "Avoid colloquialisms in academic English commentaries.", fach: "Englisch", dueIn: "in 2 Tagen" },
  { id: "c7", front: "Lokale Änderungsrate", back: "瞬时变化率（切线斜率）", example: "Die Ableitung f'(x0) entspricht der Tangentensteigung im Punkt x0.", fach: "Mathe", dueIn: "heute" },
  { id: "c8", front: "Potenzregel", back: "幂函数求导公式", example: "Die Ableitung von f(x) = x^n lautet f'(x) = n * x^(n-1).", fach: "Mathe", dueIn: "morgen" },
  { id: "c9", front: "Newton 2 (Grundgesetz)", back: "牛顿第二定律", example: "Kraft ist Masse mal Beschleunigung: F = m * a in Newton.", fach: "Physik", dueIn: "heute" },
  { id: "c10", front: "SI-Basiseinheiten", back: "国际标准单位制", example: "Masse in kg, Länge in m, Zeit in s, Stromstärke in A.", fach: "Physik", dueIn: "in 3 Tagen" },
  { id: "c11", front: "Prinzip von Le Chatelier", back: "勒夏特列平衡移动原理", example: "Ausweichen des Systems vor einem äußeren Zwang (Druck, T, c).", fach: "Chemie", dueIn: "heute" },
  { id: "c12", front: "Massenwirkungsgesetz (MWG)", back: "化学平衡常数表达式", example: "Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b) bei T = const.", fach: "Chemie", dueIn: "morgen" },
  { id: "c13", front: "Flüssig-Mosaik-Modell", back: "流动镶嵌膜模型", example: "Die Biomembran besteht aus einer fluiden Phospholipid-Doppelschicht.", fach: "Bio", dueIn: "heute" },
  { id: "c14", front: "RGT-Regel", back: "范霍夫反应速率规则", example: "Temperaturanstieg um 10 °C verdoppelt bis verdreifacht die Reaktionsrate.", fach: "Bio", dueIn: "in 2 Tagen" },
  { id: "c15", front: "Kategorischer Imperativ", back: "康德定言命令", example: "Handle nur nach derjenigen Maxime, die zugleich Gesetz werden kann.", fach: "Philosophie", dueIn: "heute" },
  { id: "c16", front: "Utilitaristisches Kalkül", back: "功利主义效用核算", example: "Maximierung des Nutzens für die größtmögliche Anzahl von Akteuren.", fach: "Philosophie", dueIn: "morgen" },
  { id: "c17", front: "Sonatenhauptsatzform", back: "奏鸣曲式", example: "Dreiteilige Form bestehend aus Exposition, Durchführung und Reprise.", fach: "Musik", dueIn: "heute" },
  { id: "c18", front: "Krebs & Umkehrung", back: "逆行与倒影变奏技法", example: "Verarbeitungstechniken von Motiven in der klassischen Satzlehre.", fach: "Musik", dueIn: "in 4 Tagen" },
  { id: "c19", front: "Superkompensation", back: "超量恢复原理", example: "Wiederherstellung der energetischen Reserven über das Ausgangsniveau.", fach: "Sport", dueIn: "heute" },
  { id: "c20", front: "Anaerobe Schwelle", back: "无氧乳酸阈值", example: "Maximale Belastungsintensität mit Laktat-Gleichgewicht (ca. 4 mmol/l).", fach: "Sport", dueIn: "in 2 Tagen" },
  { id: "c21", front: "Kurvendiskussion", back: "曲线讨论（性质研究）", example: "Systematische Untersuchung von Symmetrie, Nullstellen und Extrema.", fach: "Mathe", dueIn: "heute" },
  { id: "c22", front: "Trägheitsgesetz", back: "牛顿第一惯性定律", example: "Ein kräftefreier Körper verharrt in Ruhe oder gleichförmiger Bewegung.", fach: "Physik", dueIn: "morgen" },
  { id: "c23", front: "Protolyse & pH", back: "酸碱质子转移与pH对数标度", example: "Säure als Protonendonator und pH = -lg[H3O+] in wässriger Lösung.", fach: "Chemie", dueIn: "heute" },
  { id: "c24", front: "Steckbriefaufgabe", back: "求式建模（依几何条件求解析式）", example: "Bedingungen wie f'(2)=0 und f(0)=3 in ein lineares Gleichungssystem übersetzen.", fach: "Mathe", dueIn: "heute" },
  { id: "c25", front: "Freier Fall", back: "自由落体运动", example: "Gleichmäßig beschleunigte Bewegung mit Erdbeschleunigung g ohne Luftwiderstand.", fach: "Physik", dueIn: "morgen" },
  { id: "c26", front: "Zwischenmolekulare Kräfte", back: "分子间作用力", example: "Van-der-Waals-Kräfte, Dipol-Dipol-Kräfte und Wasserstoffbrückenbindungen.", fach: "Chemie", dueIn: "heute" },
  { id: "c27", front: "Carrier- & Kanalproteine", back: "载体蛋白与通道蛋白", example: "Erleichterte Diffusion durch biologische Membranen entlang des Gradienten.", fach: "Bio", dueIn: "in 2 Tagen" },
];

export const quizSteps = [
  { op: "darstellen", de: "Worum geht es im Material? (3-Satz-Einleitung: Thema + Material + These)", zh: "材料讲什么？（三句导语：主题+材料+论点）" },
  { op: "analysieren", de: "Ursachen, Folgen, Akteure — mit Fachbegriffen belegen.", zh: "原因、后果、行动者——用术语论证。" },
  { op: "beurteilen", de: "Kriterien nennen, dann eigenes Urteil formulieren.", zh: "先亮标准，再下判断。" },
];

export const planWeek = [
  { day: "Mo", task: "SoWi: 12 Karten + Ungleichheit & Wohlfahrt wiederholen", done: true },
  { day: "Di", task: "Philo & Deutsch: Utilitarismus vs Kant & TATTE-Schema trainieren", done: true },
  { day: "Mi", task: "Mathe & Physik: Kurvendiskussion & Newton-Dynamik durchrechnen", done: false },
  { day: "Do", task: "Chemie & Bio: Säure-Base & Enzymkinetik Karten durchgehen", done: false },
  { day: "Fr", task: "Englisch & Musik: P.E.E. Klausur-Phrasen & Sonatensatz üben", done: false },
  { day: "Sa", task: "Sport: Superkompensation & Trainingslehre vertiefen", done: false },
  { day: "So", task: "Gesamt-Fehlerlog sichten & Klausur-Simulation (90 Min)", done: false },
];

export const mindmapNodes = [
  { label: "Gymnasiale Oberstufe (EF) 全学科图谱", x: 400, y: 30, root: true },
  { label: "SoWi · 社会流动与不平等", x: 120, y: 120 },
  { label: "Philosophie · 功利与义务论", x: 260, y: 120 },
  { label: "Deutsch · 议论文与诗歌分析", x: 400, y: 120 },
  { label: "Englisch · 调解与全球化分析", x: 540, y: 120 },
  { label: "Mathematik · 多项式与微积分", x: 680, y: 120 },
  { label: "Physik · 牛顿动力学与能量守恒", x: 120, y: 220 },
  { label: "Chemie · 酸碱质子平衡与反应速率", x: 260, y: 220 },
  { label: "Biologie · 生物膜流动与酶催化", x: 400, y: 220 },
  { label: "Musik · 奏鸣曲式与动机展开", x: 540, y: 220 },
  { label: "Sport · 训练超量与负荷调控", x: 680, y: 220 },
  { label: "MINT-Brücke · 数理化跨学科公理网", x: 400, y: 320 },
];
