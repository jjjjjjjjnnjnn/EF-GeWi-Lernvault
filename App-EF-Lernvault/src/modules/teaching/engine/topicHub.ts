// topicHub.ts
// 互动研习工坊：跨板块数据映射与闭环主题中枢 (Topic Loop Registry)
// 联通 Lernreise 互动课、Labor 实验、Library 知识笔记与 Quiz 题库的四大板块桥梁

import type { LaborSimId } from "../../laborRegistry";

export type TopicDifficulty = "grundlagen" | "vertiefung" | "klausur";

export type TopicStudyPhase = "lecture" | "labor" | "notes" | "quiz";

export interface UnifiedTopicLoop {
  id: string;
  fach: string;
  titleDE: string;
  titleZH: string;
  descriptionDE: string;
  descriptionZH: string;
  reiseCourseId?: string; // 对应 Lernreise 课程 ID (如 "Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md")
  laborSimId?: LaborSimId; // 对应 Labor 仿真或教具工具 ID (如 "sowi-wahlsystem", "markt-welfare", "pendulum" 等)
  noteId?: string; // 对应 Library 中的 Wissensnotiz ID (如 "sowi-ungleichheit", "physik-kinematik" 等)
  quizTags?: string[]; // 对应 Quiz 题库的筛选标签
  difficulty: TopicDifficulty;
}

/**
 * 全学科高频核心主题预设表
 * 覆盖 SoWi, Deutsch, Philosophie, Physik, Mathe, Chemie, Bio, Englisch 等核心科目
 */
export const UNIFIED_TOPIC_REGISTRY: UnifiedTopicLoop[] = [
  // =========================================================================
  // SoWi (Sozialwissenschaften / 政治经济社科)
  // =========================================================================
  {
    id: "sowi-soziale-marktwirtschaft",
    fach: "SoWi",
    titleDE: "Soziale Marktwirtschaft & Wohlfahrtsmodelle",
    titleZH: "社会市场经济与福利国家模型",
    descriptionDE: "Zusammenspiel von Marktmechanismus, staatlicher Rahmenordnung und sozialem Ausgleich (Art. 20 Abs. 1 GG).",
    descriptionZH: "自由市场价格机制、国家竞争秩序保障与社会福利调控平衡（基本法第20条）。",
    reiseCourseId: "Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md",
    laborSimId: "markt",
    noteId: "sowi-ungleichheit",
    quizTags: ["SoWi", "Wirtschaft", "Soziale Marktwirtschaft", "Marktversagen"],
    difficulty: "grundlagen",
  },
  {
    id: "sowi-wertpapierdepot-orderarten",
    fach: "SoWi",
    titleDE: "Wertpapierdepot & Orderarten an der Börse",
    titleZH: "证券交易账户与交易所订单类型",
    descriptionDE: "Mechanik des Orderbuchs, Limit-, Stop-Loss- und Market-Orders sowie Liquiditätsrisiken.",
    descriptionZH: "订单簿连续撮合机制、市价/限价/止损单执行逻辑及流动性与滑点风险。",
    reiseCourseId: "Lernreise/SoWi-Wertpapierdepot-Orderarten-L1.md",
    laborSimId: "orderbuch",
    noteId: "sowi-wertpapiere-orderarten",
    quizTags: ["SoWi", "Finanzen", "Börse", "Depot", "Orderbuch"],
    difficulty: "vertiefung",
  },
  {
    id: "sowi-wahlsystem-bundestag",
    fach: "SoWi",
    titleDE: "Wahlsystem & Bundestagsmandate",
    titleZH: "德国联邦议院选举制度与席位分配",
    descriptionDE: "Personalisierte Verhältniswahl, Erst-/Zweitstimme, 5%-Sperrklausel und Sitzverteilung nach Sainte-Laguë.",
    descriptionZH: "个性化比例代表制、一票选人与二票选党、5%门槛线与席位分配算法。",
    laborSimId: "wahlsystem-sim",
    noteId: "sowi-wahlsystem-bundestag",
    quizTags: ["SoWi", "Politik", "Bundestag", "Wahlen", "Mandate"],
    difficulty: "klausur",
  },
  {
    id: "sowi-magisches-viereck",
    fach: "SoWi",
    titleDE: "Magisches Viereck & Wirtschaftspolitische Zielkonflikte",
    titleZH: "魔力四角与经济政策目标冲突",
    descriptionDE: "Stabilitätsgesetz 1967: Preisniveaustabilität, Vollbeschäftigung, außenwirtschaftliches Gleichgewicht und angemessenes Wachstum.",
    descriptionZH: "1967年经济稳定法四大约束：物价稳定、充分就业、外贸平衡与合理适度经济增长。",
    laborSimId: "magisches-viereck",
    noteId: "sowi-magisches-viereck",
    quizTags: ["SoWi", "Wirtschaft", "Konjunktur", "Geldpolitik"],
    difficulty: "vertiefung",
  },
  {
    id: "sowi-soziale-ungleichheit-gini",
    fach: "SoWi",
    titleDE: "Soziale Ungleichheit & Gini-Koeffizient",
    titleZH: "社会不平等与基尼系数测量",
    descriptionDE: "Lorenzkurve, Gini-Koeffizient, Einkommens- und Vermögensverteilung sowie vertikale und horizontale Mobilität.",
    descriptionZH: "洛伦兹曲线、基尼系数测算、收入财产不平等与纵向横向阶层流动性分析。",
    laborSimId: "gini",
    noteId: "sowi-ungleichheit",
    quizTags: ["SoWi", "Gesellschaft", "Ungleichheit", "Gini"],
    difficulty: "klausur",
  },

  // =========================================================================
  // Deutsch (德语文学与文本分析)
  // =========================================================================
  {
    id: "deutsch-sachtext-leserlenkung",
    fach: "Deutsch",
    titleDE: "Sachtextanalyse & Rhetorische Leserlenkung",
    titleZH: "论说文分析与修辞意图解构",
    descriptionDE: "TATTE-Schema, argumentative Gangart, rhetorische Mittel und funktionale Leserlenkungsanalyse.",
    descriptionZH: "导语五要素（TATTE）、论证逻辑链剖析、修辞手法学术定名与读者心理引导功能解读。",
    laborSimId: "deutsch-sachtext-argument",
    noteId: "deutsch-sachtext",
    quizTags: ["Deutsch", "Sachtext", "Rhetorik", "TATTE", "Leserlenkung"],
    difficulty: "grundlagen",
  },
  {
    id: "deutsch-dramenanalyse-freytag",
    fach: "Deutsch",
    titleDE: "Dramenstruktur nach Freytag & Szenenanalyse",
    titleZH: "弗赖塔格金字塔与经典戏剧场景分析",
    descriptionDE: "Klassischer 5-Akt-Aufbau (Exposition, Steigerung, Peripetie, Retardation, Katastrophe) und dramaturgische Dialoganalyse.",
    descriptionZH: "古典五幕结构（呈示、上升、高潮逆转、延宕、悲剧解决）与人物台词戏剧潜台词剖析。",
    laborSimId: "deutsch-drama-freytag",
    noteId: "deutsch-drama-analyse",
    quizTags: ["Deutsch", "Drama", "Freytag", "Klassik", "Szenenanalyse"],
    difficulty: "klausur",
  },
  {
    id: "deutsch-lyrik-metrum",
    fach: "Deutsch",
    titleDE: "Lyrikanalyse & Metrische Klangstrukturen",
    titleZH: "诗歌韵律剖析与格律音效结构",
    descriptionDE: "Jambus, Trochäus, Daktylus, Anapäst, Kadenzen, Reimschemata und syntaktisch-semantische Verschränkung.",
    descriptionZH: "抑扬格/扬抑格/扬抑抑格音步、抑扬韵脚与韵式组合对诗歌意象和情绪张力的声韵加持。",
    laborSimId: "deutsch-lyrik-metrum",
    noteId: "deutsch-lyrik-analyse",
    quizTags: ["Deutsch", "Lyrik", "Metrum", "Gedichtanalyse"],
    difficulty: "vertiefung",
  },
  {
    id: "deutsch-episches-theater-brecht",
    fach: "Deutsch",
    titleDE: "Episches Theater & Bertolt Brechts V-Effekt",
    titleZH: "叙事体戏剧与布莱希特间离效果",
    descriptionDE: "Verfremdungseffekt, Kritik am aristotelischen Theater, Illusionsdurchbrechung und kritisch-rationale Rezeption.",
    descriptionZH: "间离法、打破第四堵墙与破除亚里士多德式戏剧共情，唤醒观众理性反思社会现实。",
    laborSimId: "deutsch-brecht-episch",
    noteId: "deutsch-episches-theater",
    quizTags: ["Deutsch", "Drama", "Brecht", "Episches Theater", "V-Effekt"],
    difficulty: "vertiefung",
  },

  // =========================================================================
  // Philosophie (哲学伦理与认识论)
  // =========================================================================
  {
    id: "philo-kant-kategorischer-imperativ",
    fach: "Philosophie",
    titleDE: "Kants Kategorischer Imperativ & Deontologie",
    titleZH: "康德绝对命令与道义论伦理学",
    descriptionDE: "Maximenprüfung im 4-Schritt-Verfahren, Pflichtethik, Selbstzweckformel und Abgrenzung zum hypothetischen Imperativ.",
    descriptionZH: "准则普遍化四步检验法、出于义务与合乎义务的严格区隔、人即目的公式与反结果论道德哲学。",
    laborSimId: "philo-kant-kategorischer",
    noteId: "philo-kant-kategorischer",
    quizTags: ["Philosophie", "Kant", "Ethik", "Kategorischer Imperativ", "Deontologie"],
    difficulty: "klausur",
  },
  {
    id: "philo-utilitarismus-ethik-waage",
    fach: "Philosophie",
    titleDE: "Utilitarismus & Das hedonistische Kalkül",
    titleZH: "功利主义与功利天平抉择",
    descriptionDE: "Bentham & Mill: Konsequenzen-, Utilitäts-, Hedonistisches und Universalitätsprinzip sowie Handlungs- vs. Regelutilitarismus.",
    descriptionZH: "后果原则、效用原则、享乐原则与普世原则四大基石，量化利弊得失并反思多数暴政伦理困境。",
    laborSimId: "ethik-waage",
    noteId: "philo-utilitarismus",
    quizTags: ["Philosophie", "Utilitarismus", "Bentham", "Mill", "Dilemma"],
    difficulty: "grundlagen",
  },
  {
    id: "philo-rawls-schleier-des-nichtwissens",
    fach: "Philosophie",
    titleDE: "John Rawls: Gerechtigkeit & Schleier des Nichtwissens",
    titleZH: "罗尔斯正义论与无知之幕思想实验",
    descriptionDE: "Urzustand (Original Position), Schleier des Nichtwissens (Veil of Ignorance), Freiheitsprinzip und Differenzprinzip.",
    descriptionZH: "原初状态、无知之幕、最大均等自由原则与差异原则（优先改善最不利者境遇）。",
    laborSimId: "philo-rawls-schleier",
    noteId: "philo-rawls-gerechtigkeit",
    quizTags: ["Philosophie", "Rawls", "Gerechtigkeit", "Staatsphilosophie"],
    difficulty: "vertiefung",
  },
  {
    id: "philo-platons-hoehlengleichnis",
    fach: "Philosophie",
    titleDE: "Platons Höhlengleichnis & Erkenntnistheorie",
    titleZH: "柏拉图洞穴隐喻与理念认识论",
    descriptionDE: "Sinnliche Wahrnehmung vs. noetische Erkenntnis, Ideenlehre und der Aufstieg aus der Höhle zum Guten an sich.",
    descriptionZH: "感性幻象世界与理性观念世界的二元对立、认识阶梯攀登与启蒙者的教育使命。",
    laborSimId: "philo-hoehlengleichnis",
    noteId: "philo-hoehlengleichnis-erkenntnis",
    quizTags: ["Philosophie", "Platon", "Erkenntnistheorie", "Ideenlehre"],
    difficulty: "vertiefung",
  },

  // =========================================================================
  // Physik (物理经典与近代力学)
  // =========================================================================
  {
    id: "physik-kinematik-newton",
    fach: "Physik",
    titleDE: "Kinematik & Newtonsche Axiome",
    titleZH: "运动学方程与牛顿动力学定律",
    descriptionDE: "Gleichmäßig beschleunigte Bewegung, s(t)-, v(t)-Diagramme und Grundgesetz der Mechanik (F = m * a).",
    descriptionZH: "匀加速直线运动时空演化、位移速度图象微积分物理意义与牛顿三大运动定律。",
    laborSimId: "kinematik",
    noteId: "physik-kinematik",
    quizTags: ["Physik", "Mechanik", "Kinematik", "Newton", "Axiome"],
    difficulty: "grundlagen",
  },
  {
    id: "physik-schiefe-ebene-dynamik",
    fach: "Physik",
    titleDE: "Kräftezerlegung an der schiefen Ebene",
    titleZH: "斜面受力分解与摩擦动力学平衡",
    descriptionDE: "Hangabtriebskraft, Normalkraft, Haft- und Gleitreibung sowie Energieerhaltung im Schwerefeld.",
    descriptionZH: "下滑分力与法向正压力正交分解、静动摩擦突变条件及斜面下滑加速度动力学计算。",
    laborSimId: "schiefe-ebene",
    noteId: "physik-newton-dynamik",
    quizTags: ["Physik", "Mechanik", "Schiefe Ebene", "Kräfte", "Reibung"],
    difficulty: "vertiefung",
  },
  {
    id: "physik-energieerhaltung-skater",
    fach: "Physik",
    titleDE: "Energieerhaltung im Skaterpark",
    titleZH: "过山车滑板场与机械能守恒定律",
    descriptionDE: "Interaktive Transformation zwischen kinetischer Energie, potentieller Lageenergie und thermischer Dissipation.",
    descriptionZH: "动能、重力势能与摩擦耗散内能的实时能量转化与保守力场守恒定律。",
    laborSimId: "skate",
    noteId: "physik-energieerhaltung",
    quizTags: ["Physik", "Mechanik", "Energie", "Energieerhaltung", "Skater"],
    difficulty: "grundlagen",
  },
  {
    id: "physik-harmonische-schwingungen-pendel",
    fach: "Physik",
    titleDE: "Harmonische Schwingungen & Pendel-Labor",
    titleZH: "简谐振动模型与单摆周期实验室",
    descriptionDE: "Rückstellkraft, Kleinwinkelnäherung, Eigenfrequenz und Periodendauer T = 2*pi*sqrt(L/g).",
    descriptionZH: "回复力与小角度简谐近似、单摆周期与摆长质量重力加速度关系的定量实验探究。",
    laborSimId: "pendulum",
    noteId: "physik-schwingungen-pendel",
    quizTags: ["Physik", "Schwingungen", "Pendel", "Harmonisch"],
    difficulty: "vertiefung",
  },
  {
    id: "physik-geometrische-optik-linsen",
    fach: "Physik",
    titleDE: "Geometrische Optik & Abbildungsgesetze",
    titleZH: "几何光学透镜成像与高斯成像公式",
    descriptionDE: "Linsengleichung 1/f = 1/g + 1/b, Strahlenkonstruktion (Parallel-, Brennpunkt-, Mittelpunktstrahl) und Dispersion.",
    descriptionZH: "平行光线/焦点光线/光心光线三条特殊光线作图法与凸透镜成像规律计算。",
    laborSimId: "optics",
    noteId: "physik-optik-linsen",
    quizTags: ["Physik", "Optik", "Linsen", "Linsengleichung"],
    difficulty: "grundlagen",
  },

  // =========================================================================
  // Mathe (数学分析与代数几何)
  // =========================================================================
  {
    id: "mathe-differentialrechnung-tangente",
    fach: "Mathe",
    titleDE: "Differentialrechnung & Lokale Änderungsrate",
    titleZH: "微分学引论与瞬时切线斜率",
    descriptionDE: "Differenzenquotient, Grenzwertübergang (h->0), Ableitung f'(x0) und Konstruktion der Tangentengleichung.",
    descriptionZH: "割线斜率差商极限逼近、导数定义几何物理内涵与切线方程解析推导。",
    laborSimId: "tangent",
    noteId: "mathe-ableitungen",
    quizTags: ["Mathe", "Analysis", "Ableitung", "Tangente", "Differentialrechnung"],
    difficulty: "grundlagen",
  },
  {
    id: "mathe-integralrechnung-flaechen",
    fach: "Mathe",
    titleDE: "Integralrechnung & Flächenberechnung",
    titleZH: "微积分基本定理与定积分曲边面积",
    descriptionDE: "Riemann-Summen, Hauptsatz der Differential- und Integralrechnung und Flächenberechnung zwischen Funktionsgraphen.",
    descriptionZH: "黎曼和矩形分割逼近、牛顿-莱布尼茨公式与双函数相交封闭面积计算。",
    laborSimId: "mathe-integral-flaeche",
    noteId: "mathe-integralrechnung",
    quizTags: ["Mathe", "Analysis", "Integral", "Hauptsatz", "Flächen"],
    difficulty: "klausur",
  },
  {
    id: "mathe-kurvendiskussion-extremwerte",
    fach: "Mathe",
    titleDE: "Kurvendiskussion & Optimierungsaufgaben",
    titleZH: "函数性质全流程讨论与极值优化",
    descriptionDE: "Nullstellen, Symmetrie, Extrempunkte (f'=0, f''!=0), Wendepunkte und Monotonieintervalle in Klausurformat.",
    descriptionZH: "定义域零点对称性、一阶二阶导数判定极值与拐点、凹凸性区间与闭区间最值优化解法。",
    laborSimId: "mathe-kurvendiskussion",
    noteId: "mathe-kurvendiskussion-extremwerte",
    quizTags: ["Mathe", "Analysis", "Kurvendiskussion", "Extremwerte", "Wendepunkte"],
    difficulty: "klausur",
  },
  {
    id: "mathe-vektorrechnung-analytische-geometrie",
    fach: "Mathe",
    titleDE: "Vektorgeometrie & Skalar- / Kreuzprodukt",
    titleZH: "空间向量几何与数量积/向量积应用",
    descriptionDE: "Geraden- und Ebenengleichungen in Parameterform, Normalenvektor, Orthogonalität und Abstandsberechnungen.",
    descriptionZH: "三维空间直线与平面方程、点积判断垂直正交与点面距离判定。",
    laborSimId: "mathe-vektor-skalar-kreuz",
    noteId: "mathe-vektoren-geometrie",
    quizTags: ["Mathe", "Lineare Algebra", "Vektoren", "Analytische Geometrie"],
    difficulty: "vertiefung",
  },
  {
    id: "mathe-stochastik-wahrscheinlichkeitsbaeume",
    fach: "Mathe",
    titleDE: "Stochastik & Bedingte Wahrscheinlichkeit",
    titleZH: "概率论基础与树状图条件概率推演",
    descriptionDE: "Baumdiagramme, Pfadregeln, Satz von Bayes und Vierfeldertafeln für diagnostische Tests.",
    descriptionZH: "多层树状图乘法加法路径法则、全概率公式、贝叶斯定理与四格表诊断准确率研判。",
    laborSimId: "probability",
    noteId: "mathe-stochastik-wahrscheinlichkeit",
    quizTags: ["Mathe", "Stochastik", "Wahrscheinlichkeit", "Bayes"],
    difficulty: "vertiefung",
  },

  // =========================================================================
  // Chemie (化学平衡与电化学)
  // =========================================================================
  {
    id: "chemie-chemisches-gleichgewicht-chatelier",
    fach: "Chemie",
    titleDE: "Chemisches Gleichgewicht & Le Chatelier",
    titleZH: "化学平衡与勒夏特列平衡移动原理",
    descriptionDE: "Massenwirkungsgesetz, Reaktionsquotient Q, Störung des Gleichgewichts durch Druck, Temperatur und Konzentration.",
    descriptionZH: "质量作用定律平衡常数K、压强/温度/浓度外部强迫扰动下平衡自适应抗衡位移机制。",
    laborSimId: "gleichgewicht",
    noteId: "chemie-le-chatelier",
    quizTags: ["Chemie", "Gleichgewicht", "Le Chatelier", "Massenwirkungsgesetz"],
    difficulty: "grundlagen",
  },
  {
    id: "chemie-saeure-base-titration",
    fach: "Chemie",
    titleDE: "Säure-Base-Gleichgewichte & pH-Titration",
    titleZH: "酸碱质子传递平衡与pH滴定曲线",
    descriptionDE: "Brønsted-Theorie, Autoprotolyse des Wassers, Äquivalenzpunkt, Pufferbereich und Indikatorauswahl.",
    descriptionZH: "布朗斯特质子酸碱论、水自偶电离、滴定突跃与等当点判定、缓冲体系机制与指示剂选择。",
    laborSimId: "titration",
    noteId: "chemie-titration-ph",
    quizTags: ["Chemie", "Säure-Base", "Titration", "pH", "Puffer"],
    difficulty: "klausur",
  },
  {
    id: "chemie-galvanische-zelle-elektrochemie",
    fach: "Chemie",
    titleDE: "Galvanische Zelle & Redox-Potenziale",
    titleZH: "原电池反应机理与氧化还原电位",
    descriptionDE: "Daniell-Element, Nernst-Gleichung, elektrochemische Spannungsreihe und standardisierte Zellspannung.",
    descriptionZH: "丹尼尔原电池半反应、能斯特方程计算、金属活泼性电极电势差与化学能向电能自发转化。",
    laborSimId: "chemie-galvanische-zelle",
    noteId: "chemie-galvanische-elemente",
    quizTags: ["Chemie", "Elektrochemie", "Redox", "Galvanisch", "Nernst"],
    difficulty: "vertiefung",
  },

  // =========================================================================
  // Biologie (生物结构与能量代谢)
  // =========================================================================
  {
    id: "bio-biomembran-osmose",
    fach: "Bio",
    titleDE: "Biomembran, Osmose & Plasmolyse",
    titleZH: "生物膜流动镶嵌模型与渗透质壁分离",
    descriptionDE: "Fluid-Mosaik-Modell, selektive Permeabilität, Aquaporine, Plasmolyse und Deplasmolyse pflanzlicher Zellen.",
    descriptionZH: "脂质双分子层流动镶嵌结构、半透膜选择透过性、植物细胞质壁分离与复原动力学。",
    laborSimId: "osmose",
    noteId: "bio-biomembran",
    quizTags: ["Bio", "Zytologie", "Membran", "Osmose", "Plasmolyse"],
    difficulty: "grundlagen",
  },
  {
    id: "bio-fotosynthese-lichtreaktion",
    fach: "Bio",
    titleDE: "Fotosynthese & Calvin-Zyklus",
    titleZH: "光合作用光反应与暗反应卡尔文循环",
    descriptionDE: "Thylakoidmembran, Elektronentransportkette, Photolyse des Wassers, ATP-Synthase und CO2-Fixierung.",
    descriptionZH: "类囊体膜光合电子传递链、水光解制氧、质子梯度合成ATP与核酮糖二磷酸暗反应固碳全景。",
    laborSimId: "bio-fotosynthese",
    noteId: "bio-fotosynthese-grundlagen",
    quizTags: ["Bio", "Stoffwechsel", "Fotosynthese", "Calvin-Zyklus", "Chloroplast"],
    difficulty: "vertiefung",
  },
  {
    id: "bio-synapse-signaluebertragung",
    fach: "Bio",
    titleDE: "Synaptische Erregungsübertragung & Neurotransmitter",
    titleZH: "神经突触化学信号传递与递质释放",
    descriptionDE: "Aktionspotenzial am Endknöpfchen, Ca2+-Einstrom, Exozytose von Acetylcholin, EPSP/IPSP und Synapsengifte.",
    descriptionZH: "前膜动作电位触发电压门控钙通道开放、乙酰胆碱囊泡胞吐外排、后膜受体开启产生去极化电位。",
    laborSimId: "bio-synapse",
    noteId: "bio-neurobiologie-synapse",
    quizTags: ["Bio", "Neurobiologie", "Synapse", "Aktionspotenzial", "Neurotransmitter"],
    difficulty: "klausur",
  },

  // =========================================================================
  // Englisch (英语文学与论证评述)
  // =========================================================================
  {
    id: "englisch-pee-method-characterization",
    fach: "Englisch",
    titleDE: "P.E.E. Method & Characterization in Literary Texts",
    titleZH: "P.E.E.分析法与文学人物刻画论据链",
    descriptionDE: "Point-Evidence-Explanation framework, direct textual citation, stylistic devices and character traits.",
    descriptionZH: "核心论点句（Point）、精准行号引注（Evidence）与修辞语体反哺动机剖析（Explanation）黄金三步法。",
    noteId: "englisch-pee-method",
    quizTags: ["Englisch", "Literature", "Analysis", "PEE", "Characterization"],
    difficulty: "grundlagen",
  },
  {
    id: "englisch-mediation-strategies",
    fach: "Englisch",
    titleDE: "Mediation Strategies & Cross-Cultural Contexts",
    titleZH: "跨文化信息调解策略与特定语境转述",
    descriptionDE: "Situational embedding, selective filtering, avoiding word-by-word translation and cultural paraphrasing.",
    descriptionZH: "交际情景锚定、提炼德语文本精要用独立英语组织，针对本土制度提供文化释义。",
    noteId: "englisch-mediation",
    quizTags: ["Englisch", "Mediation", "Communication", "Cross-Cultural"],
    difficulty: "vertiefung",
  },
];

/**
 * 根据学科代码检索该学科的所有统一研习闭环主题
 * 支持大小写与空白字符归一化；若未收录特定新学科，提供自适应降级聚合
 */
export function getTopicsForFach(fach: string): UnifiedTopicLoop[] {
  const normalized = fach.trim().toLowerCase();
  if (!normalized) return UNIFIED_TOPIC_REGISTRY;

  // 1. 精确与别名匹配
  const matched = UNIFIED_TOPIC_REGISTRY.filter((t) => {
    const tFach = t.fach.trim().toLowerCase();
    if (tFach === normalized) return true;
    if (normalized === "sowi" && (tFach === "sozialwissenschaften" || tFach === "politik")) return true;
    if (normalized === "math" && tFach === "mathe") return true;
    if (normalized === "physics" && tFach === "physik") return true;
    if (normalized === "chem" && tFach === "chemie") return true;
    if (normalized === "bio" && tFach === "biologie") return true;
    if (normalized === "philo" && tFach === "philosophie") return true;
    if (normalized === "german" && tFach === "deutsch") return true;
    if (normalized === "english" && tFach === "englisch") return true;
    return false;
  });

  if (matched.length > 0) {
    return matched;
  }

  // 2. 保护性兜底：若学科完全未知，返回该学科的通用合成主题，避免空白崩溃
  return [
    {
      id: `${normalized}-grundlagen-loop`,
      fach: fach,
      titleDE: `${fach} — Grundlagen & Methodentraining`,
      titleZH: `${fach} 核心基础与解题方法训练`,
      descriptionDE: `Systematische Erarbeitung der abiturrelevanten Kernkonzepte für das Fach ${fach}.`,
      descriptionZH: `系统梳理与研习 ${fach} 核心概念与考试方法闭环。`,
      difficulty: "grundlagen",
      quizTags: [fach, "Grundlagen", "Methoden"],
    },
  ];
}

/**
 * 根据主题唯一 ID 检索研习主题
 */
export function getTopicById(id: string): UnifiedTopicLoop | undefined {
  return UNIFIED_TOPIC_REGISTRY.find((t) => t.id === id);
}

/**
 * 获取全量统一主题列表
 */
export function getAllTopics(): UnifiedTopicLoop[] {
  return UNIFIED_TOPIC_REGISTRY;
}

/**
 * 根据 Labor 仿真实验 ID 反查关联的研习主题
 */
export function findTopicForLaborSim(simId: LaborSimId): UnifiedTopicLoop | undefined {
  return UNIFIED_TOPIC_REGISTRY.find((t) => t.laborSimId === simId);
}

/**
 * 根据 Lernreise 课程路径 ID 反查关联的主题
 */
export function findTopicForReiseCourse(courseId: string): UnifiedTopicLoop | undefined {
  return UNIFIED_TOPIC_REGISTRY.find((t) => t.reiseCourseId === courseId || (t.reiseCourseId && courseId.includes(t.reiseCourseId)));
}

/**
 * 根据知识库笔记 ID 反查关联的主题
 */
export function findTopicForNote(noteId: string): UnifiedTopicLoop | undefined {
  return UNIFIED_TOPIC_REGISTRY.find((t) => t.noteId === noteId);
}

/**
 * 按难度级别过滤研习主题
 */
export function filterTopicsByDifficulty(
  topics: UnifiedTopicLoop[],
  difficulty: TopicDifficulty
): UnifiedTopicLoop[] {
  return topics.filter((t) => t.difficulty === difficulty);
}

/**
 * 根据标签关键词检索研习主题
 */
export function findTopicsByTag(tag: string): UnifiedTopicLoop[] {
  const normTag = tag.trim().toLowerCase();
  return UNIFIED_TOPIC_REGISTRY.filter((t) =>
    t.quizTags?.some((qt) => qt.toLowerCase().includes(normTag))
  );
}
