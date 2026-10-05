// Vernetzungs-Engine: 0ms pure in-memory cross-subject topological anchor search.
// Designed for ultra-low token consumption (<50 tokens injection) and zero-latency user-unobtrusive hints.
// Based on cognitive evidence: Ausubel (1968) Advance Organizers & Rohrer (2020) Interleaved Discrimination.

import { estimateTokens } from "./context";

export type VernetzungDimension =
  | "rate_of_change"           // 变化率与导数 (Mathe / Physik / Chemie / Bio)
  | "conservation_law"         // 守恒律与能量 (Physik / Chemie / Bio)
  | "equilibrium"              // 平衡态与动平衡 (Physik / Chemie / Bio)
  | "justice_welfare"          // 正义论、制度与不平等 (Philo / SoWi)
  | "alienation_labor_capital" // 异化劳动、功利主义与资本批判 (Deutsch / Philo / SoWi / Englisch)
  | "argumentation_rhetoric";  // 论证、修辞与跨语言中继 (Deutsch / Englisch)

export interface VernetzungBridge {
  id: string;
  dimension: VernetzungDimension;
  sourceSubject: string;      // z.B. "Mathe"
  targetSubject: string;      // z.B. "Physik"
  targetThema: string;        // z.B. "Kinematik & Momentangeschwindigkeit"
  targetNotePath: string;     // z.B. "04_Physik/Gleichfoermige-Bewegung-Training.md"
  badgeLabel: string;         // z.B. "Physik: 瞬时速度 v=s'(t)"
  anchorFormulaOrSentenceDE: string; // 考纲规范句/公式 (DE)
  anchorSentenceZH: string;          // 中文一句话映射 (ZH)
  keywords: string[];         // 触发关键词 (中/德)
}

/**
 * 跨学科拓扑知识图谱定义 (Ontological Cross-Subject Bridges)
 */
export const VERNETZUNG_BRIDGES: VernetzungBridge[] = [
  {
    id: "mathe_to_physik_rate",
    dimension: "rate_of_change",
    sourceSubject: "Mathe",
    targetSubject: "Physik",
    targetThema: "Kinematik & Momentangeschwindigkeit",
    targetNotePath: "04_Physik/Gleichfoermige-Bewegung-Training.md",
    badgeLabel: "Physik: 瞬时速度 v=s'(t)",
    anchorFormulaOrSentenceDE: "Die Momentangeschwindigkeit ist die 1. Ableitung des Ortes nach der Zeit v(t) = s'(t).",
    anchorSentenceZH: "微积分导数在物理运动学中对应瞬时速度与加速度。",
    keywords: [
      "ableitung", "tangente", "steigung", "differenzenquotient", "differentialquotient",
      "änderungsrate", "geschwindigkeit", "momentangeschwindigkeit", "kinematik", "bewegungslehre", "hochpunkt", "tiefpunkt",
      "导数", "切线斜率", "变化率", "瞬时速度", "加速度", "极值", "物理意义"
    ],
  },
  {
    id: "physik_to_mathe_rate",
    dimension: "rate_of_change",
    sourceSubject: "Physik",
    targetSubject: "Mathe",
    targetThema: "Differentialrechnung & Analysis",
    targetNotePath: "03_Mathe/Analysis-Physik-Kinetik-Vernetzung.md",
    badgeLabel: "Mathe: 导函数 f'(x) 切线斜率",
    anchorFormulaOrSentenceDE: "Die Tangentensteigung f'(x) = lim Δy/Δx bestimmt die lokale Änderungsrate.",
    anchorSentenceZH: "速度测量与图像斜率对应的数学本质是切线极限与导数。",
    keywords: [
      "geschwindigkeit", "beschleunigung", "v-t-diagramm", "s-t-diagramm", "momentan",
      "steigung", "ableitung", "umkehrpunkt", "瞬时速度", "加速度", "斜率", "路程时间", "图表斜率"
    ],
  },
  {
    id: "chemie_to_bio_kinetik",
    dimension: "rate_of_change",
    sourceSubject: "Chemie",
    targetSubject: "Bio",
    targetThema: "Enzymkatalyse & Substratsättigung",
    targetNotePath: "05_Chemie/Kinetik-Gleichgewicht-Bio-Vernetzung.md",
    badgeLabel: "Bio: 酶促反应米氏动力学饱和曲线",
    anchorFormulaOrSentenceDE: "Enzyme senken als Biokatalysatoren die Aktivierungsenergie EA, lassen aber Kc unberührt.",
    anchorSentenceZH: "化学活化能与阿伦尼乌斯定律在生物中体现为酶催化与底物饱和。",
    keywords: [
      "reaktionsgeschwindigkeit", "aktivierungsenergie", "katalysator", "enzym", "substrat",
      "sättigung", "michaelis-menten", "rgt-regel", "arrhenius", "反应速率", "活化能", "催化剂",
      "酶", "米氏方程", "底物饱和"
    ],
  },
  {
    id: "chemie_to_bio_equilibrium",
    dimension: "equilibrium",
    sourceSubject: "Chemie",
    targetSubject: "Bio",
    targetThema: "Fließgleichgewicht & Puffer",
    targetNotePath: "05_Chemie/Kinetik-Gleichgewicht-Bio-Vernetzung.md",
    badgeLabel: "Bio: 动态流平衡与缓冲系统",
    anchorFormulaOrSentenceDE: "Lebende Zellen befinden sich im dynamischen Fließgleichgewicht (steady state).",
    anchorSentenceZH: "勒夏特列化学平衡在生命体内体现为血液碳酸氢盐缓冲与动态流平衡。",
    keywords: [
      "gleichgewicht", "le chatelier", "fließgleichgewicht", "massenwirkungsgesetz", "puffer",
      "homöostase", "steady state", "kohlensäure", "平衡移动", "勒夏特列", "缓冲溶液", "稳态", "流平衡"
    ],
  },
  {
    id: "philo_to_sowi_justice",
    dimension: "justice_welfare",
    sourceSubject: "Philosophie",
    targetSubject: "SoWi",
    targetThema: "Soziale Ungleichheit & Umverteilung",
    targetNotePath: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
    badgeLabel: "SoWi: 累进税制与基尼系数量化",
    anchorFormulaOrSentenceDE: "Soziale Ungleichheit wird über den Gini-Koeffizienten quantifiziert.",
    anchorSentenceZH: "罗尔斯正义论在现实政策中对标社会不平等基尼系数与二次分配。",
    keywords: [
      "rawls", "gerechtigkeit", "schleier des nichtwissens", "differenzprinzip", "kant",
      "utilitarismus", "ungleichheit", "umverteilung", "gini", "eigentum", "sozialstaat",
      "无知之幕", "差异原则", "正义论", "社会不平等", "基尼系数", "再分配", "福利国家"
    ],
  },
  {
    id: "sowi_to_philo_justice",
    dimension: "justice_welfare",
    sourceSubject: "SoWi",
    targetSubject: "Philosophie",
    targetThema: "Rawlsche Gerechtigkeit & Maximin-Regel",
    targetNotePath: "07_Philosophie/Gerechtigkeit-Wirtschaftsethik-Vernetzung.md",
    badgeLabel: "Philo: 罗尔斯无知之幕与分配正义",
    anchorFormulaOrSentenceDE: "Nach Rawls Differenzprinzip sind Ungleichheiten nur gerecht, wenn sie den Schwächsten nützen.",
    anchorSentenceZH: "社会经济政策的合法性评判取决于分配正义与最不利者获益原则。",
    keywords: [
      "ungleichheit", "armut", "gini", "mindestlohn", "steuern", "soziale marktwirtschaft",
      "legitimität", "effizienz", "chancengleichheit", "vermögen", "不平等", "贫困", "最低工资",
      "基尼系数", "正义", "合法性", "效率", "机会平等"
    ],
  },
  {
    id: "deutsch_to_englisch_mediation",
    dimension: "argumentation_rhetoric",
    sourceSubject: "Deutsch",
    targetSubject: "Englisch",
    targetThema: "Mediation & P.E.E. Structure",
    targetNotePath: "01_Deutsch/Texte-Analyse/Rhetorik-Mediation-Vernetzung.md",
    badgeLabel: "Englisch: P.E.E. 结构与中继写作",
    anchorFormulaOrSentenceDE: "P.E.E.-Schema (Point, Evidence, Explanation) entspricht These, Beleg und Deutung.",
    anchorSentenceZH: "德语文段事实/规范论据分析与英语中继写作（Mediation）共享 P.E.E. 逻辑。",
    keywords: [
      "sachtextanalyse", "argumentation", "rhetorische mittel", "faktenargument", "normatives argument",
      "autoritätsargument", "mediation", "p.e.e.", "connectors", "leserlenkung", "修辞", "论点",
      "论据", "中继写作", "议论文", "读者引导"
    ],
  },
  {
    id: "englisch_to_deutsch_rhetoric",
    dimension: "argumentation_rhetoric",
    sourceSubject: "Englisch",
    targetSubject: "Deutsch",
    targetThema: "Sachtextanalyse & Leserlenkung",
    targetNotePath: "01_Deutsch/Texte-Analyse/Rhetorik-Mediation-Vernetzung.md",
    badgeLabel: "Deutsch: Sachtext 论据金字塔与修辞手段",
    anchorFormulaOrSentenceDE: "Im deutschen Sachtext stützen Fakten-, normative und Autoritätsargumente die Leserlenkung.",
    anchorSentenceZH: "英语 Comment 与 Mediation 中的论据展开同构于德语议论文事实/规范论据分析。",
    keywords: [
      "mediation", "comment", "p.e.e.", "evidence", "claim", "connectors", "rhetoric",
      "register", "formal letter", "speech", "中继", "评论", "证据", "语域", "正式信件"
    ],
  },
  {
    id: "deutsch_to_philo_alienation",
    dimension: "alienation_labor_capital",
    sourceSubject: "Deutsch",
    targetSubject: "Philosophie",
    targetThema: "Marx: Entfremdete Arbeit & Mill: Utilitarismus",
    targetNotePath: "07_Philosophie/Texte-Analyse/Mill-Utilitarismus-Qualitativer-Hedonismus.md",
    badgeLabel: "Philo: 马克思劳动异化论与人的物化",
    anchorFormulaOrSentenceDE: "Marx: Im Kapitalismus entfremdet sich der Arbeiter von Produkt und Gattungswesen (Kafka: Gregor Samsa als Rädchen).",
    anchorSentenceZH: "马克思劳动异化论：工人在生产中异化为商品并丧失主体性，卡夫卡格里高尔正是齿轮物化的文学投射。",
    keywords: [
      "entfremdung", "kafka", "verwandlung", "gregor", "arbeit", "ware", "marx", "kapitalismus",
      "ausbeutung", "woyzeck", "异化", "卡夫卡", "变形记", "格里高尔", "齿轮", "商品化", "剥削", "沃伊采克"
    ],
  },
  {
    id: "philo_to_deutsch_alienation",
    dimension: "alienation_labor_capital",
    sourceSubject: "Philosophie",
    targetSubject: "Deutsch",
    targetThema: "Kafka: Die Verwandlung & Büchner: Woyzeck",
    targetNotePath: "01_Deutsch/Texte-Analyse/Kafka-Die-Verwandlung-Epik.md",
    badgeLabel: "Deutsch: 卡夫卡《变形记》劳动异化与肉体物化",
    anchorFormulaOrSentenceDE: "Gregors Verwandlung symbolisiert die somatische Rebellion gegen die totale ökonomische Funktionalisierung des Menschen.",
    anchorSentenceZH: "格里高尔的变虫象征着肉体对彻底经济工具化与劳资剥削的终极无声反叛。",
    keywords: [
      "marx", "entfremdung", "ware", "instrumentalisierung", "kant", "zweckformel", "utilitarismus",
      "kafka", "verwandlung", "woyzeck", "异化", "马克思", "物化", "卡夫卡", "目的公式", "工具化"
    ],
  },
  {
    id: "philo_to_sowi_alienation",
    dimension: "alienation_labor_capital",
    sourceSubject: "Philosophie",
    targetSubject: "SoWi",
    targetThema: "Soziale Ungleichheit, Prekarisierung & Gini-Index",
    targetNotePath: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
    badgeLabel: "SoWi: 阶层分化、底层贫困化与基尼系数",
    anchorFormulaOrSentenceDE: "Ökonomische Instrumentalisierung führt zur Verfestigung sozialer Ungleichheit und Prekarisierung im Arbeitsmarkt.",
    anchorSentenceZH: "劳动的工具化在社会结构上导致阶层固化、底层贫困化（Prekarisierung）与基尼系数扩大。",
    keywords: [
      "marx", "entfremdung", "kapital", "prekarisierung", "ungleichheit", "gini", "arbeitsmarkt",
      "armut", "schichtung", "异化", "资本", "不平等", "基尼系数", "阶层", "贫困化", "劳动力市场"
    ],
  },
  {
    id: "sowi_to_philo_alienation",
    dimension: "alienation_labor_capital",
    sourceSubject: "SoWi",
    targetSubject: "Philosophie",
    targetThema: "Kritik des Kapitalismus & Kants Menschheitszweckformel",
    targetNotePath: "07_Philosophie/Gerechtigkeit-Wirtschaftsethik-Vernetzung.md",
    badgeLabel: "Philo: 康德目的公式与资本异化反思",
    anchorFormulaOrSentenceDE: "Kants Zweck-Mittel-Formel verbietet es, Arbeitnehmer rein als ökonomische Produktionsfaktoren zu instrumentalisieren.",
    anchorSentenceZH: "康德目的公式规定：人永远是自身目的，绝不允许在劳动力市场中将劳动者异化为纯粹生产工具。",
    keywords: [
      "prekarisierung", "ungleichheit", "arbeitsmarkt", "ausbeutung", "menschenwuerde", "kant",
      "marx", "zweckformel", "不平等", "劳动力市场", "剥削", "尊严", "康德", "目的公式", "贫困"
    ],
  },
  {
    id: "deutsch_to_englisch_alienation",
    dimension: "alienation_labor_capital",
    sourceSubject: "Deutsch",
    targetSubject: "Englisch",
    targetThema: "Arthur Miller: Death of a Salesman",
    targetNotePath: "02_Englisch/Texte-Analyse/Miller-Death-of-a-Salesman-American-Dream.md",
    badgeLabel: "Englisch: 推销员人格商品化与美国梦异化",
    anchorFormulaOrSentenceDE: "Willy Lomans commodification of personality spiegelt Gregors Entfremdung als austauschbares Wirtschaftsrad wider.",
    anchorSentenceZH: "威利·洛曼的人格商品化悲剧，同构于卡夫卡格里高尔作为随时可被替代的经济齿轮的异化宿命。",
    keywords: [
      "kafka", "verwandlung", "entfremdung", "miller", "salesman", "willy", "american dream",
      "commodification", "卡夫卡", "异化", "推销员之死", "美国梦", "商品化", "洛曼"
    ],
  },
  {
    id: "englisch_to_deutsch_alienation",
    dimension: "alienation_labor_capital",
    sourceSubject: "Englisch",
    targetSubject: "Deutsch",
    targetThema: "Franz Kafka: Die Verwandlung & Epik",
    targetNotePath: "01_Deutsch/Texte-Analyse/Kafka-Die-Verwandlung-Epik.md",
    badgeLabel: "Deutsch: 卡夫卡《变形记》存在困境与工具人批判",
    anchorFormulaOrSentenceDE: "Kafkas Erzählung entlarvt die bürgerliche Familie als utilitaristisches Verwertungskollektiv (vgl. Miller: Salesman).",
    anchorSentenceZH: "卡夫卡小说揭示了市民阶级家庭作为功利算计与经济剥削共同体的冷酷本质（对标米勒《推销员之死》）。",
    keywords: [
      "salesman", "miller", "willy", "commodification", "alienation", "kafka", "verwandlung",
      "推销员之死", "异化", "卡夫卡", "变形记", "商品化"
    ],
  },
];

/**
 * 跨学科考点全景沙盘簇定义 (Interdisciplinary Nexus Clusters)
 */
export interface VernetzungsClusterNode {
  fach: string;
  thema: string;
  nodeId?: string;
  notePath?: string;
  roleDE: string;
  roleZH: string;
}

export interface VernetzungsCluster {
  id: string;
  dimension: VernetzungDimension;
  titleDE: string;
  titleZH: string;
  summaryDE: string;
  summaryZH: string;
  nodes: VernetzungsClusterNode[];
  klausurSynthesisDE: string;
  klausurSynthesisZH: string;
}

export const VERNETZUNGS_CLUSTERS: VernetzungsCluster[] = [
  {
    id: "cluster_alienation_labor",
    dimension: "alienation_labor_capital",
    titleDE: "Entfremdete Arbeit, Verdinglichung & Kapitalismuskritik",
    titleZH: "现代异化劳动、主体物化与资本主义批判全景沙盘",
    summaryDE: "Verschränkung von Kafkas Daseinsmetapher, Marxscher Arbeitswerttheorie, Mill-Kritik und soziologischer Prekarisierung.",
    summaryZH: "卡夫卡存在隐喻、马克思劳动异化、密尔质性快乐与社会学劳动力底层贫困化四维联通沙盘。",
    nodes: [
      {
        fach: "Deutsch",
        thema: "Kafka: Die Verwandlung & Büchner: Woyzeck",
        nodeId: "deutsch/if2/erzaehltexte",
        notePath: "01_Deutsch/Texte-Analyse/Kafka-Die-Verwandlung-Epik.md",
        roleDE: "Literarische Epik: Reduktion des Angestellten auf ein bloßes Funktionsteil im Wirtschaftskörper.",
        roleZH: "叙事文学：雇员被物化为经济机器中的可替换零件，肉体异化与被遗弃。",
      },
      {
        fach: "Philosophie",
        thema: "Marx: Ök.-phil. Manuskripte & Kant: Zweckformel",
        nodeId: "philosophie/if2/pflichtethik-kant/menschheitszweck",
        notePath: "07_Philosophie/Texte-Analyse/Mill-Utilitarismus-Qualitativer-Hedonismus.md",
        roleDE: "Normative Ethik & Anthropologie: Das Verbot der Instrumentalisierung und die vier Dimensionen der Entfremdung.",
        roleZH: "规范伦理与人类学：康德禁止人被充当纯粹手段，马克思剖析生产活动、产品与类本质的全面异化。",
      },
      {
        fach: "SoWi",
        thema: "Soziale Ungleichheit & Prekarisierung des Arbeitsmarkts",
        nodeId: "sowi/if1/dimensionen/einkommen-bildung",
        notePath: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
        roleDE: "Empirische Soziologie: Gini-Koeffizient, atypische Beschäftigung und Vererbung sozialer Bildungsbenachteiligung.",
        roleZH: "经验实证社会学：基尼系数、非标准就业底层贫困化（Prekarisierung）与教育出身壁垒。",
      },
      {
        fach: "Englisch",
        thema: "Miller: Death of a Salesman & The American Dream",
        nodeId: "englisch/tf1/identitaet/ambitionen-hindernisse",
        notePath: "02_Englisch/Texte-Analyse/Miller-Death-of-a-Salesman-American-Dream.md",
        roleDE: "Modern Drama: Commodification of personality im falschen Versprechen unbegrenzten Aufstiegs.",
        roleZH: "现代戏剧：威利·洛曼的人格商品化与资本剥削下的美国梦破灭。",
      },
    ],
    klausurSynthesisDE: "In AFB III können Klausurtexte über Prekarisierung und Entfremdung simultan mit Kafkas Verdinglichungsmetapher und Kants Menschheitszweckformel abgeglichen werden, um die Höchstnote (15 NP) zu erzielen.",
    klausurSynthesisZH: "在会考最高评价阶（AFB III）中，可将底层贫困化与劳务异化议题同时引申至卡夫卡《变形记》的物化隐喻与康德目的公式，构建兼具文学敏锐度与哲学深度的全景论辩（15分满分话术）。",
  },
  {
    id: "cluster_justice_welfare",
    dimension: "justice_welfare",
    titleDE: "Gerechtigkeit, Institutionen & Wohlfahrtsstaat",
    titleZH: "分配正义、制度设计与福利国家再分配沙盘",
    summaryDE: "Konzeptionelle Brücke zwischen Rawls' Schleier des Nichtwissens, Verfassungsprinzipien und sozialstaatlicher Umverteilung.",
    summaryZH: "罗尔斯正义论“无知之幕”、宪政福利原则与累进税制调控政策的跨学科映射。",
    nodes: [
      {
        fach: "Philosophie",
        thema: "John Rawls: A Theory of Justice (Maximin-Regel)",
        nodeId: "philosophie/if2/utilitarismus/handlungs-regelutilitarismus",
        notePath: "07_Philosophie/Gerechtigkeit-Wirtschaftsethik-Vernetzung.md",
        roleDE: "Gerechtigkeitstheorie: Ungleichheiten sind nur legitim, wenn sie den am wenigsten Begünstigten den größtmöglichen Vorteil bringen.",
        roleZH: "分配正义：差异原则强调任何不平等只有在有利于处境最不利者时才具备道德正当性。",
      },
      {
        fach: "SoWi",
        thema: "Sozialstaatsprinzip & Mindestlohn-Kontroverse",
        nodeId: "sowi/if1/mobilitaet-sozialstaat/sozialstaat-ausgleich",
        notePath: "08_SoWi/Klausur-Training/Mindestlohn-Streit-AfB-Training.md",
        roleDE: "Wirtschafts- und Gesellschaftspolitik: Das Spannungsverhältnis zwischen ökonomischer Effizienz und Verteilungsgerechtigkeit.",
        roleZH: "经济社会政策：市场效率与分配公平的张力、法定最低工资与社会保障网的制度博弈。",
      },
      {
        fach: "Englisch",
        thema: "Civil Rights & Martin Luther King (I Have a Dream)",
        nodeId: "englisch/tf1/werte-vielfalt/values-wertewandel",
        notePath: "02_Englisch/Texte-Analyse/MLK-I-Have-a-Dream-Speech-Analysis.md",
        roleDE: "Politischer Diskurs: Institutionelle Diskriminierung vs. Verfassungsideal der Gleichheit.",
        roleZH: "政治话语：制度性种族隔阂与宪法平等信条的现实冲突，非暴力修辞号召制度正义。",
      },
    ],
    klausurSynthesisDE: "SoWi-Urteile zum Mindestlohn oder Spitzensteuersatz gewinnen an Überzeugungskraft, wenn die Rawlsche Maximin-Regel als normativer Maßstab herangezogen wird.",
    klausurSynthesisZH: "在社科议论文评价段中，引入罗尔斯正义论“差异原则”作为判断最低工资或财富税合法性的规范标尺，论据论证力倍增。",
  },
  {
    id: "cluster_rate_of_change",
    dimension: "rate_of_change",
    titleDE: "Dynamische Änderungsraten & Erhaltungssätze",
    titleZH: "瞬时变化率、动平衡与动力学守恒沙盘",
    summaryDE: "Mathematische Ableitung als universelle Sprache für Kinematik, Reaktionskinetik und enzymatische Katalyse.",
    summaryZH: "微积分切线导数作为物理运动学、化学反应速率与生物酶促动力学的通用数学语言。",
    nodes: [
      {
        fach: "Mathe",
        thema: "Differentialrechnung & Lokale Änderungsrate",
        nodeId: "mathe/if1",
        notePath: "03_Mathe/Analysis-Physik-Kinetik-Vernetzung.md",
        roleDE: "Analytische Grundlage: Differentialquotient lim(Δy/Δx) als Tangentensteigung f'(x).",
        roleZH: "分析学基石：差商极限与导数定义，极值点与拐点判定。",
      },
      {
        fach: "Physik",
        thema: "Kinematik: v(t) = s'(t) & a(t) = v'(t)",
        nodeId: "physik/if1",
        notePath: "04_Physik/Gleichfoermige-Bewegung-Training.md",
        roleDE: "Mechanik: Momentangeschwindigkeit und Beschleunigung als Zeit-Ableitungen des Ortes.",
        roleZH: "经典力学：位移对时间的一阶导数为瞬时速度，二阶导数为加速度。",
      },
      {
        fach: "Chemie",
        thema: "Reaktionskinetik: v = dc/dt & Katalyse",
        nodeId: "chemie/if1",
        notePath: "05_Chemie/Kinetik-Gleichgewicht-Bio-Vernetzung.md",
        roleDE: "Physikalische Chemie: Konzentrationsänderung pro Zeiteinheit und Absenkung der Aktivierungsenergie.",
        roleZH: "物理化学：单位时间浓度变化率、阿伦尼乌斯方程与活化能跃迁。",
      },
      {
        fach: "Bio",
        thema: "Enzymkinetik (Michaelis-Menten) & Fließgleichgewicht",
        nodeId: "bio/if1",
        notePath: "05_Chemie/Kinetik-Gleichgewicht-Bio-Vernetzung.md",
        roleDE: "Zellbiologie: Sättigungskurven, Wechselzahl kcat und dynamischer Steady-State.",
        roleZH: "细胞生物学：底物饱和曲线、米氏常数 Km 与活细胞动态稳态。",
      },
    ],
    klausurSynthesisDE: "Die Interpretation von Diagrammsteigungen (Steigungswert = physikalischer/chemischer Parameter) verknüpft Analysis mit naturwissenschaftlicher Klausurpraxis.",
    klausurSynthesisZH: "曲线切线斜率对应实际物理速度或化学反应速率，打通自然科学与微积分图表解读直觉。",
  },
  {
    id: "cluster_argumentation_rhetoric",
    dimension: "argumentation_rhetoric",
    titleDE: "Argumentation, Leserlenkung & Sprachmittlung",
    titleZH: "文本论辩、修辞引导与跨语言中继沙盘",
    summaryDE: "Konvergente Textanalyse-Strukturen: Dreischritt, P.E.E.-Schema und rhetorische Wirkungsanalyse.",
    summaryZH: "德语文段三步论证与英语 P.E.E. 结构、修辞读者引导与双向中继写作的深度同构。",
    nodes: [
      {
        fach: "Deutsch",
        thema: "Sachtextanalyse: Argumenttypen & Leserlenkung",
        nodeId: "deutsch/if2/pragmatische-texte/argumentationsgang",
        notePath: "01_Deutsch/Texte-Analyse/Rhetorik-Mediation-Vernetzung.md",
        roleDE: "Argumentanalyse: These -> Fakten-/Normatives/Autoritätsargument -> Stützung/Entkräftung.",
        roleZH: "议论分析：论点设立、事实/规范/权威论据金字塔与反诘反驳。",
      },
      {
        fach: "Englisch",
        thema: "Mediation & P.E.E. (Point, Evidence, Explanation)",
        nodeId: "englisch/zusatz/teil-a-lesen-schreiben/analysis",
        notePath: "01_Deutsch/Texte-Analyse/Rhetorik-Mediation-Vernetzung.md",
        roleDE: "Textproduktion: Adressatengerechter Wissenstransfer und analytische Belegführung.",
        roleZH: "语言中继与分析：读者导向跨语言转换与“观点-证据-阐释”标准骨架。",
      },
      {
        fach: "Philosophie",
        thema: "Logische Rekonstruktion: Prämisse & Konklusion",
        nodeId: "philosophie/if2/gewissen-verantwortung-normen",
        notePath: "07_Philosophie/Philosophische-Fragen-Typen.md",
        roleDE: "Formale Argumentation: Prüfung von Gültigkeit, Stichhaltigkeit und logischen Fehlschlüssen.",
        roleZH: "论证重构：前提与结论的演绎有效性（Gültigkeit）与事实真实性（Stichhaltigkeit）核验。",
      },
    ],
    klausurSynthesisDE: "Das P.E.E.-Schema schärft die Belegführung in beiden Sprachen: Keine Behauptung ohne Zeilennachweis und funktionale Deutung.",
    klausurSynthesisZH: "P.E.E. 逻辑贯通德英双语会考写作铁律：凡有论点必引行号证据，凡引证据必分析功能效果，绝不停留于表面复述。",
  },
];

/**
 * 0ms 纯内存拓扑快速匹配：找到与用户问题相关度最高的跨学科思维桥 (Top-1)
 * @param query 用户的提问文本
 * @param currentSubject 当前所处学科（可选，例如 "Mathe"）
 * @returns 命中最高分且符合跨学科约束的思维桥；若无匹配或分值过低则返回 null
 */
export function findVernetzungBridge(
  query: string,
  currentSubject?: string
): VernetzungBridge | null {
  if (!query || query.trim().length < 2) return null;
  const q = query.toLowerCase();

  let bestBridge: VernetzungBridge | null = null;
  let bestScore = 0;

  for (const bridge of VERNETZUNG_BRIDGES) {
    let score = 0;

    // 学科权重：如果指定了当前学科，且 bridge 的 sourceSubject 匹配，给予加成
    if (currentSubject && bridge.sourceSubject.toLowerCase() === currentSubject.toLowerCase()) {
      score += 4;
    }

    // 关键词匹配
    for (const kw of bridge.keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += 3;
      }
    }

    // 如果目标学科名称直接出现在提问中
    if (q.includes(bridge.targetSubject.toLowerCase())) {
      score += 5;
    }

    // 唯有跨学科才有意义：如果 targetSubject 与当前学科完全相同，严重降权
    if (currentSubject && bridge.targetSubject.toLowerCase() === currentSubject.toLowerCase()) {
      score = Math.floor(score * 0.2);
    }

    if (score > bestScore) {
      bestScore = score;
      bestBridge = bridge;
    }
  }

  // 必须达到最低相关阈值
  return bestScore >= 3 ? bestBridge : null;
}

/**
 * 针对知识树特定节点查找与之相关的所有跨学科思维桥 (多学科辐射)
 */
export function findVernetzungBridgesForNode(
  sourceSubject: string,
  queryOrTitle: string
): VernetzungBridge[] {
  if (!queryOrTitle || queryOrTitle.trim().length === 0) return [];
  const q = queryOrTitle.toLowerCase();
  const subj = sourceSubject.toLowerCase();

  const results: VernetzungBridge[] = [];

  for (const bridge of VERNETZUNG_BRIDGES) {
    // 匹配源学科
    const sourceMatch = bridge.sourceSubject.toLowerCase() === subj;
    const targetMatch = bridge.targetSubject.toLowerCase() === subj;
    if (!sourceMatch && !targetMatch) continue;

    // 关键词命中
    const kwHit = bridge.keywords.some((kw) => q.includes(kw.toLowerCase()));
    const themaHit =
      bridge.targetThema.toLowerCase().includes(q) ||
      q.includes(bridge.targetThema.toLowerCase());

    if (kwHit || themaHit) {
      results.push(bridge);
    }
  }

  return results;
}

/**
 * 获取所有预设跨学科考点全景沙盘
 */
export function getAllVernetzungsClusters(): VernetzungsCluster[] {
  return VERNETZUNGS_CLUSTERS;
}

/**
 * 极简 Token 压缩器：生成注入到 LLM Prompt Warm-Zone 的思维桥文本。
 * 严格控制在 15–25 Tokens，单次增量绝对 < 50 Tokens。
 */
export function formatBridgeForPrompt(bridge: VernetzungBridge): string {
  return `Fachübergreifende Vernetzung: [${bridge.targetSubject}]: ${bridge.anchorFormulaOrSentenceDE}`;
}

/**
 * 计算思维桥文本的预估 Token 数
 */
export function estimateBridgeTokens(bridge: VernetzungBridge): number {
  return estimateTokens(formatBridgeForPrompt(bridge));
}

