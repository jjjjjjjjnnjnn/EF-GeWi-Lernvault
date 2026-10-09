import React, { useState, useMemo, useRef } from "react";
import {
  graphRegistry,
  type KnowledgeNode,
  type SubjectKnowledgeGraph,
  type SubjectKey,
} from "../engine/skillTree";
import type { Lang, NodeLanguageMode } from "../i18n/types";
import { resolveNodeLanguage } from "../i18n/nodeLocalization";
import { truncateTextToVisualWidth } from "../utils/svgTypography";
import { fuzzyFilterAndRankNodes } from "../utils/fuzzySearch";

export interface SynergyTrackStage {
  readonly schritt: number; // 1, 2, 3, 4
  readonly fach: string;
  readonly titleDE: string;
  readonly titleZH: string;
  readonly descriptionDE: string;
  readonly descriptionZH: string;
  readonly nodeId?: string;
  readonly notePath?: string;
}

export interface CrossSubjectSynergyTrack {
  readonly id: string;
  readonly clusterId?: string;
  readonly aliasIds?: readonly string[];
  readonly titleDE: string;
  readonly titleZH: string;
  readonly descriptionDE: string;
  readonly descriptionZH: string;
  readonly subjectIds: readonly string[];
  readonly nodeIds: readonly string[];
  readonly linkedNotePath: string;
  readonly operator: string;
  readonly szenarioQuestionDE: string;
  readonly szenarioQuestionZH: string;
  readonly methodischeBrueckeDE: string;
  readonly methodischeBrueckeZH: string;
  readonly klausurSynthese15NP_DE: string;
  readonly klausurSynthese15NP_ZH: string;
  readonly stages: readonly SynergyTrackStage[];
}

/**
 * 跨学科黄金融通四大战役预设清单 (Gymnasium Oberstufe Interdisciplinary Synergies 4 Clusters)
 * 完整对应系统内置四大考点沙盘簇：
 * Cluster 1: 异化劳动与资本 (Deutsch, Philosophie, SoWi, Englisch)
 * Cluster 2: 正义论与再分配 (Philosophie, SoWi, Englisch, Deutsch)
 * Cluster 3: 变化率与守恒律 (Mathe, Physik, Chemie, Bio)
 * Cluster 4: 论辩修辞与语言中继 (Deutsch, Englisch, Philosophie, SoWi)
 */
export const CROSS_SUBJECT_SYNERGY_TRACKS: readonly CrossSubjectSynergyTrack[] = [
  {
    id: "cluster_alienation_labor",
    clusterId: "cluster_alienation_labor",
    aliasIds: ["alienation-labor-capital"],
    titleDE: "Entfremdete Arbeit, Verdinglichung & Kapitalismuskritik",
    titleZH: "异化劳动与资本 · 现代异化劳动、主体物化与资本主义批判全景沙盘",
    descriptionDE: "Verschränkung von Kafkas Daseinsmetapher, Marxscher Arbeitswerttheorie, Kants Menschheitszweckformel und soziologischer Prekarisierung im Arbeitsmarkt.",
    descriptionZH: "卡夫卡存在隐喻、马克思劳动异化、康德目的公式与社会学劳动力底层贫困化四维联通沙盘，解构现代资本主义下劳动者的工具化与物化命运。",
    subjectIds: ["Deutsch", "Philosophie", "SoWi", "Englisch"],
    nodeIds: [
      "deutsch-epik-kafka-verwandlung",
      "philo-kant-kategorischer-imperativ",
      "sowi-soziale-ungleichheit",
      "englisch-american-dream",
    ],
    linkedNotePath: "01_Deutsch/Texte-Analyse/Kafka-Die-Verwandlung-Epik.md",
    operator: "beurteilen (AFB III)",
    szenarioQuestionDE: "Beurteilen Sie anhand von Kafkas 'Die Verwandlung' und Kants Menschheitszweckformel, inwieweit moderne Formen atypischer Beschäftigung (Prekarisierung) eine unzulässige Verdinglichung des Menschen darstellen.",
    szenarioQuestionZH: "结合卡夫卡《变形记》的存在主义物化隐喻与康德目的公式，深度评判现代劳动力市场非典型就业与底层贫困化（Prekarisierung）是否构成了对人的主体性的异化与奴役。",
    methodischeBrueckeDE: "Verschränkung literarischer Metaphorik (Kafka/Miller) mit normativer Moralphilosophie (Kant/Marx) und empirischer Schichtungsanalyse (Gini/Prekarisierung).",
    methodischeBrueckeZH: "文学具象隐喻（卡夫卡格里高尔变虫/米勒推销员人格商品化）-> 规范伦理批判（康德禁止工具化与马克思四维异化）-> 经验实证社会学（基尼系数与非标准就业贫困化）。",
    klausurSynthese15NP_DE: "In AFB III können Klausurtexte über Prekarisierung und Entfremdung simultan mit Kafkas Verdinglichungsmetapher und Kants Menschheitszweckformel abgeglichen werden: Der Arbeitnehmer wird im Markt zum bloßen Mittel degradiert, was sowohl ethisch (Kant) als auch soziologisch (Prekarisierung) und literarisch (Samsa als Rädchen) eine Grenzverletzung menschlicher Autonomie markiert.",
    klausurSynthese15NP_ZH: "在会考最高评价阶（AFB III）中，将底层贫困化与劳务异化议题同时引申至卡夫卡《变形记》的物化隐喻与康德目的公式：劳动者被降格为纯粹手段与可替换齿轮，既违背康德目的公式，又与经验基尼系数固化相呼应，构筑文学敏锐度与哲学深度兼备的 15 NP 满分评价。",
    stages: [
      {
        schritt: 1,
        fach: "Deutsch",
        titleDE: "Literarische Epik: Reduktion des Angestellten auf ein bloßes Funktionsteil",
        titleZH: "文学表征：雇员被物化为经济机器中的可替换零件（卡夫卡《变形记》）",
        descriptionDE: "Gregors Verwandlung symbolisiert die somatische Rebellion gegen die totale ökonomische Funktionalisierung des Menschen.",
        descriptionZH: "格里高尔变虫象征肉体对彻底经济工具化的终极无声反叛，揭示家庭与职场作为功利算计共同体的冷酷本质。",
        nodeId: "deutsch-epik-kafka-verwandlung",
        notePath: "01_Deutsch/Texte-Analyse/Kafka-Die-Verwandlung-Epik.md",
      },
      {
        schritt: 2,
        fach: "Philosophie",
        titleDE: "Normative Ethik & Anthropologie: Das Instrumentalisierungsverbot",
        titleZH: "哲学反思：康德目的公式与马克思四维劳动异化论",
        descriptionDE: "Kants Menschheitszweckformel verbietet es kategorisch, Personen bloß als Mittel zu gebrauchen; Marx dekonstruiert die Entfremdung von Produkt und Gattungswesen.",
        descriptionZH: "康德人类目的公式严禁将人降格为纯粹手段；马克思剖析工人在资本主义生产中与产品、劳动、类本质的全面异化。",
        nodeId: "philo-kant-kategorischer-imperativ",
        notePath: "07_Philosophie/Texte-Analyse/Mill-Utilitarismus-Qualitativer-Hedonismus.md",
      },
      {
        schritt: 3,
        fach: "SoWi",
        titleDE: "Empirische Soziologie: Gini-Koeffizient & Prekarisierung des Arbeitsmarkts",
        titleZH: "社会学实证：劳动力市场底层贫困化与基尼系数持续固化",
        descriptionDE: "Atypische Beschäftigungsverhältnisse, Plattformökonomie und wachsende Vermögenskonzentration führen zu struktureller gesellschaftlicher Verwundbarkeit.",
        descriptionZH: "平台零工经济、非标准就业与基尼系数分化，实证印证了劳动力市场制度性剥削与社会阶层壁垒。",
        nodeId: "sowi-soziale-ungleichheit",
        notePath: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
      },
      {
        schritt: 4,
        fach: "Englisch",
        titleDE: "Modern Drama: Commodification of personality & The American Dream",
        titleZH: "跨文化戏剧：推销员之死与美国梦幻灭中的人格全面商品化",
        descriptionDE: "Arthur Millers Willy Loman scheitert an der Illusion bedingungslosen Aufstiegs: Seine Persönlichkeit wird zur verkäuflichen, austauschbaren Ware.",
        descriptionZH: "威利·洛曼的人格商品化悲剧，同构于卡夫卡格里高尔作为随时可被替代的经济齿轮的异化宿命，构建跨语言批判闭环。",
        nodeId: "englisch-american-dream",
        notePath: "02_Englisch/Texte-Analyse/Miller-Death-of-a-Salesman-American-Dream.md",
      },
    ],
  },
  {
    id: "cluster_justice_welfare",
    clusterId: "cluster_justice_welfare",
    aliasIds: ["gewi-rationalitaet-gerechtigkeit"],
    titleDE: "Gerechtigkeit, Institutionen & Wohlfahrtsstaat",
    titleZH: "社哲辨析 · 经济理性人假设与正义分配伦理 (分配正义与福利国家)",
    descriptionDE: "Konzeptionelle Brücke zwischen Rawls' Schleier des Nichtwissens, Verfassungsprinzipien der sozialen Marktwirtschaft, Bürgerrechtsrhetorik und staatlicher Umverteilung.",
    descriptionZH: "从微观经济稀缺性与市场价格机制，跨越至功利主义最大福祉、康德绝对命令与罗尔斯无知之幕分配正义的宏观社会伦理辩证。",
    subjectIds: ["Philosophie", "SoWi", "Englisch", "Deutsch"],
    nodeIds: [
      "philo-rawls-schleier-des-nichtwissens",
      "sowi-preismechanismus",
      "englisch-civil-rights-mlk",
      "sowi-sozialstaatsprinzip",
    ],
    linkedNotePath: "07_Philosophie/Gerechtigkeit-Wirtschaftsethik-Vernetzung.md",
    operator: "beurteilen (AFB III)",
    szenarioQuestionDE: "Beurteilen Sie aus Sicht von Rawls' Differenzprinzip und der sozialen Marktwirtschaft, ob eine Anhebung des Mindestlohns auf 15 € oder eine Vermögensabgabe wohlfahrtsfördernd ist.",
    szenarioQuestionZH: "依据罗尔斯无知之幕与差异原则，结合德国社会市场经济制度，综合评价上调法定最低工资或开征财富税是否具备伦理正当性与经济可行性。",
    methodischeBrueckeDE: "Synthese zwischen philosophischem Gesellschaftsvertrag (Rawls Maximin), wohlfahrtsstaatlichen Verfassungsprinzipien und politischem Bürgerrechtsdiskurs (MLK).",
    methodischeBrueckeZH: "罗尔斯正义论“无知之幕与最不利者获益” + 宪政社会国家原则与效率/公平权衡 + 民权运动制度性平等反思。",
    klausurSynthese15NP_DE: "SoWi-Urteile zu Mindestlohn und Spitzensteuersatz gewinnen an Höchstpunktzahl (15 NP), wenn Rawls' Maximin-Regel als normativer Prüfstein fungiert: Eine Marktverzerrung ist legitim, insofern sie die reale Position der am schlechtesten Gestellten nachhaltig maximiert, ohne den Wohlstandsanreiz zu zerstören.",
    klausurSynthese15NP_ZH: "在社会经济议题评价段中，引入罗尔斯正义论“差异原则”作为衡量合法性的规范标尺：任何对自由市场的政策干预，只要能在不摧毁生产力激励的前提下最大化处境最差者的实质福祉，即具备最高宪政与伦理正当性（15 NP 踩分关键）。",
    stages: [
      {
        schritt: 1,
        fach: "Philosophie",
        titleDE: "Gerechtigkeitstheorie: Schleier des Nichtwissens & Maximin-Regel",
        titleZH: "伦理基石：原初状态无知之幕推演，最不利者利益最大化之差异原则",
        descriptionDE: "Im Schleier des Nichtwissens entscheiden rationale Akteure für das Differenzprinzip zur Besserstellung der Schwächsten.",
        descriptionZH: "在无知之幕遮蔽自身禀赋与阶层的前提下，理性人必然优先规避底线风险，确立最不利者实质利益最大化的差异原则。",
        nodeId: "philo-rawls-schleier-des-nichtwissens",
        notePath: "07_Philosophie/Gerechtigkeit-Wirtschaftsethik-Vernetzung.md",
      },
      {
        schritt: 2,
        fach: "SoWi",
        titleDE: "Soziale Marktwirtschaft: Marktversagen & Verteilungskonflikt",
        titleZH: "经济政策：市场失灵与法定最低工资博弈，配置效率与分配公平的张力",
        descriptionDE: "Spannungsverhältnis zwischen allokativer Effizienz freier Märkte und staatlicher Korrektur durch Tarifautonomie und Mindestlohn.",
        descriptionZH: "价格调节配置效率与收入二次分配公平的内在张力，解析最低工资对就业弹性与内需消费拉动的双向因果链路。",
        nodeId: "sowi-preismechanismus",
        notePath: "08_SoWi/Klausur-Training/Mindestlohn-Streit-AfB-Training.md",
      },
      {
        schritt: 3,
        fach: "Englisch",
        titleDE: "Bürgerrechtsdiskurs & Rhetorik: Martin Luther King (I Have a Dream)",
        titleZH: "制度批判：民权运动政治修辞，制度性种族隔阂与宪法平等信条的现实冲突",
        descriptionDE: "Analyse institutionalisierter Diskriminierung gegen das egalitäre Verfassungsideal in rhetorisch verdichteter Rede.",
        descriptionZH: "从美国民权演说辞分析制度性不公对宪法平等原则的践踏，剖析反抗体制性歧视的政治修辞力量。",
        nodeId: "englisch-civil-rights-mlk",
        notePath: "02_Englisch/Texte-Analyse/MLK-I-Have-a-Dream-Speech-Analysis.md",
      },
      {
        schritt: 4,
        fach: "SoWi",
        titleDE: "Institutionelle Synthese: Sozialstaatsgebot des Grundgesetzes (Art. 20 GG)",
        titleZH: "综合评价：基本法社会国家原则、宏观宏观调控与社会阶层和解的 AFB III 闭环",
        descriptionDE: "Verfassungsrechtliche Verankerung des Sozialstaates und normative Urteilsbildung im Spannungsfeld von Leistungsanreiz und sozialer Absicherung.",
        descriptionZH: "基于德国基本法第 20 条社会国家原则，综合权衡财政负担率、企业国际竞争力与社会凝聚力，完成高阶会考决策权衡。",
        nodeId: "sowi-sozialstaatsprinzip",
        notePath: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
      },
    ],
  },
  {
    id: "cluster_rate_of_change",
    clusterId: "cluster_rate_of_change",
    aliasIds: ["mint-analysis-kinetik"],
    titleDE: "Dynamische Änderungsraten & Erhaltungssätze",
    titleZH: "数理融通 · 微积分极限定理到牛顿动力学方程 (变化率与守恒律)",
    descriptionDE: "Von der Sekantensteigung zum Differentialquotienten und dessen physikalischer Anwendung in gleichmäßig beschleunigten Bewegungen, Reaktionskinetik und enzymatischer Katalyse.",
    descriptionZH: "从割线斜率逼近切线导数，直通物理运动学瞬时速率、化学反应速率与生物酶促动力学，完成数理生化四大底层方法论贯通。",
    subjectIds: ["Mathe", "Physik", "Chemie", "Bio"],
    nodeIds: [
      "mathe-lokale-ableitung-grenzwert",
      "physik-gleichfoermig-beschleunigt",
      "chemie-reaktionsgeschwindigkeit",
      "bio-enzymkinetik-michaelis-menten",
    ],
    linkedNotePath: "03_Mathe/Aenderungsrate-Erhaltungssaetze-MINT-Vernetzung.md",
    operator: "modellieren & analysieren (AFB II/III)",
    szenarioQuestionDE: "Modellieren Sie die Kinetik eines gekoppelten Systems aus mechanischer Beschleunigung, chemischer Reaktionsrate und enzymatischer Michaelis-Menten-Sättigung über Differentialgleichungsansätze.",
    szenarioQuestionZH: "运用微积分导数与微分方程思想，建模分析物理机械加速、化学反应动力学与生物酶促米氏饱和曲线的动态变化率与平衡转折点。",
    methodischeBrueckeDE: "Infinitesimalrechnung als universelle mathematische Sprache für Bewegungslehre, Reaktionsgeschwindigkeiten und metabolische Fließgleichgewichte.",
    methodischeBrueckeZH: "微积分导数 f'(t) 作为统一数学语言，横贯物理运动学瞬时速度、化学反应速率 dc/dt 与生物酶促稳态。",
    klausurSynthese15NP_DE: "In naturwissenschaftlichen Klausuren (AFB II/III) wird die Tangentensteigung f'(t) simultan als v(t)=s'(t) (Physik), v=dc/dt (Chemie) und metabolische Umsatzrate (Bio) operationalisiert: Nullstellen von f' kennzeichnen stets die physikalischen Umkehrpunkte, das chemische dynamische Gleichgewicht oder das enzymatische Sättigungsplateau.",
    klausurSynthese15NP_ZH: "自然科学跨学科大题中，将切线斜率 f'(t) 统一对应物理瞬时速度、化学反应速率与生物酶促转化率：一阶导数零点恒定对标机械运动转向点、化学动态平衡极值或生物酶促饱和稳态，形成数理生化严密数理闭环。",
    stages: [
      {
        schritt: 1,
        fach: "Mathe",
        titleDE: "Analysis & Differentialquotient: f'(x) = lim Δy/Δx",
        titleZH: "数学基石：割线斜率极限逼近微商，局部瞬时变化率与切线导数定义",
        descriptionDE: "Der Übergang von der Sekanten- zur Tangentensteigung definiert die lokale Änderungsrate und das Fundament aller dynamischen Prozesse.",
        descriptionZH: "从平均变化率到微分商极限，微积分严格刻画变量在极短瞬间的跃迁强度与几何切线斜率。",
        nodeId: "mathe-lokale-ableitung-grenzwert",
        notePath: "03_Mathe/Aenderungsrate-Erhaltungssaetze-MINT-Vernetzung.md",
      },
      {
        schritt: 2,
        fach: "Physik",
        titleDE: "Kinematik & Newtonsche Mechanik: v(t)=s'(t) & a(t)=v''(t)",
        titleZH: "经典物理：位移时间一阶导数瞬时速度、二阶导数加速度与能量守恒",
        descriptionDE: "Ort, Momentangeschwindigkeit und Beschleunigung bilden eine Kette zeitlicher Ableitungen; Energieerhaltung verknüpft kinetische und potentielle Potenziale.",
        descriptionZH: "物理运动学中瞬时速度与加速度分别对应轨迹位移对时间的一阶与二阶导数，与机械能守恒定律严格联立。",
        nodeId: "physik-gleichfoermig-beschleunigt",
        notePath: "04_Physik/Gleichfoermige-Bewegung-Training.md",
      },
      {
        schritt: 3,
        fach: "Chemie",
        titleDE: "Reaktionskinetik: v = -dc/dt & Le-Chatelier-Gleichgewicht",
        titleZH: "物理化学：反应速率微分方程、活化能势垒与勒夏特列动平衡",
        descriptionDE: "Konzentrationsgradienten treiben Stoffumsätze; Katalysatoren senken die Aktivierungsenergie EA, lassen jedoch die Gleichgewichtslage unberührt.",
        descriptionZH: "单位时间反应物浓度消耗速率为负导数，催化剂通过降低活化能改变反应速率常数，但不改变勒夏特列平衡常数。",
        nodeId: "chemie-reaktionsgeschwindigkeit",
        notePath: "05_Chemie/Kinetik-Gleichgewicht-Bio-Vernetzung.md",
      },
      {
        schritt: 4,
        fach: "Bio",
        titleDE: "Zellbiologie: Michaelis-Menten-Enzymkinetik & Fließgleichgewicht",
        titleZH: "分子生物：酶促米氏动力学底物饱和曲线、最大初速率与生命动态稳态",
        descriptionDE: "Sättigungshyperbel der Enzymkatalyse (Km & Vmax); lebende Zellen befinden sich im dissipativen dynamischen Fließgleichgewicht (steady state).",
        descriptionZH: "生物酶催化表现为典型的非线性双曲线饱和关系，活细胞依托开放系统能量耗散维系永不休止的动态流平衡稳态。",
        nodeId: "bio-enzymkinetik-michaelis-menten",
        notePath: "05_Chemie/Kinetik-Gleichgewicht-Bio-Vernetzung.md",
      },
    ],
  },
  {
    id: "cluster_argumentation_rhetoric",
    clusterId: "cluster_argumentation_rhetoric",
    aliasIds: ["kultur-rhetorik-epistemologie"],
    titleDE: "Argumentation, Leserlenkung & Sprachmittlung",
    titleZH: "德哲思辨 · 论说修辞结构与认识论批判标准 (论辩修辞与语言中继)",
    descriptionDE: "Konvergente Textanalyse-Strukturen: Dreischritt (These-Beleg-Deutung), P.E.E.-Schema, formale Logik und politisch-deliberative Diskursanalyse (Habermas).",
    descriptionZH: "从德语学术论述文的三段论结构与古典修辞格说服力，贯通至英语 P.E.E. 中继写作、哲学形式逻辑真值与哈贝马斯交往理性公共协商。",
    subjectIds: ["Deutsch", "Englisch", "Philosophie", "SoWi"],
    nodeIds: [
      "deutsch-sachtextanalyse-argumentation",
      "englisch-mediation-pee",
      "philo-logik-fehlschluesse",
      "sowi-deliberative-demokratie",
    ],
    linkedNotePath: "01_Deutsch/Texte-Analyse/Argumentationslogik-und-Sprachmacht-Vernetzung.md",
    operator: "analysieren & erörtern (AFB II/III)",
    szenarioQuestionDE: "Analysieren Sie die Überzeugungsstrategie einer politischen Rede anhand von rhetorischen Mitteln, logischer Prämissengültigkeit und Habermas' Diskurskriterien.",
    szenarioQuestionZH: "综合运用德英议论修辞三步法、哲学形式逻辑前提检验与哈贝马斯交往理性准则，全面解构政治演说辞的论辩有效性与读者操纵机制。",
    methodischeBrueckeDE: "Isomorphismus zwischen deutschem Sachtext-Dreischritt (These, Beleg, Deutung), englischem P.E.E.-Schema, formaler Logik und politischer Diskursanalyse.",
    methodischeBrueckeZH: "德语文段三步论证（论点-证据-阐释）与英语 P.E.E. 结构同构，串联哲学演绎逻辑有效性与社会学话语权力解构。",
    klausurSynthese15NP_DE: "In textanalytischen Klausuren (AFB II/III) wird die argumentative Überzeugungskraft durch den Dreiklang aus formaler Logik (Prämissengültigkeit), rhetorischer Leserlenkung (Stilmittel) und deliberativer Diskursmacht (Habermas) dekonstruiert: Manipulative Scheinargumente (ad hominem, ad baculum) verletzen die formale Stichhaltigkeit und untergraben den herrschaftsfreien Diskurs.",
    klausurSynthese15NP_ZH: "在文本分析与写作大题中，构建形式逻辑（前提有效性）、修辞引导（读者操纵）与交往理性（哈贝马斯）三位一体分析闭环：虚假论据不仅破坏形式论证有效性，更在话语权力上破坏了无支配交往，直指 15 NP 最高批判标准。",
    stages: [
      {
        schritt: 1,
        fach: "Deutsch",
        titleDE: "Sachtextanalyse: Argumenttypen & strategische Leserlenkung",
        titleZH: "德语论辩：事实/规范/权威论据金字塔，反诘反驳与读者心理引导",
        descriptionDE: "Dreischritt aus These, Beleg und Begründung; Entlarvung rhetorischer Stilmittel zur persuasiven Leserbeeinflussung.",
        descriptionZH: "事实论据、规范论据与权威论据的分层金字塔，通过语篇衔接词与修辞格隐性引导读者预期与情感共鸣。",
        nodeId: "deutsch-sachtextanalyse-argumentation",
        notePath: "01_Deutsch/Texte-Analyse/Argumentationslogik-und-Sprachmacht-Vernetzung.md",
      },
      {
        schritt: 2,
        fach: "Englisch",
        titleDE: "Sprachmittlung (Mediation) & P.E.E.-Schema",
        titleZH: "英语中继：观点-证据-阐释 (Point, Evidence, Explanation) 跨语言信息重组",
        descriptionDE: "Adressatengerechte Selektion und Umstrukturierung deutscher Ausgangstexte ins Englische mittels Point, Evidence, Explanation.",
        descriptionZH: "中继写作遵循 P.E.E. 分析骨架，在语域（Register）转换与跨文化沟通中剔除多余修辞干扰，精确重组核心事实与逻辑论点。",
        nodeId: "englisch-mediation-pee",
        notePath: "01_Deutsch/Texte-Analyse/Argumentationslogik-und-Sprachmacht-Vernetzung.md",
      },
      {
        schritt: 3,
        fach: "Philosophie",
        titleDE: "Formale Logik & Argumentationsrekonstruktion",
        titleZH: "哲学逻辑：论题前提演绎有效性（Gültigkeit）与事实真实性（Stichhaltigkeit）",
        descriptionDE: "Prüfung von Syllogismen und Identifikation logischer Fehlschlüsse (Sein-Sollen, Zirkelschluss, Strohmann).",
        descriptionZH: "解构前提与结论的推导链条，区分形式演绎有效性与实质真实性，精准识别自然主义谬误与假两难论题。",
        nodeId: "philo-logik-fehlschluesse",
        notePath: "01_Deutsch/Texte-Analyse/Argumentationslogik-und-Sprachmacht-Vernetzung.md",
      },
      {
        schritt: 4,
        fach: "SoWi",
        titleDE: "Politische Diskursanalyse & Habermas' Deliberation",
        titleZH: "政治社会学：哈贝马斯无支配交往理论、公共协商民主与民粹修辞解构",
        descriptionDE: "Kriterien des herrschaftsfreien Diskurses (Verständlichkeit, Wahrheit, Wahrhaftigkeit, Richtigkeit).",
        descriptionZH: "应用交往行为理论的四大有效性诉求，解构政治竞选与媒体报道中的操控性话语霸权，为民主协商提供批判性反思标尺。",
        nodeId: "sowi-deliberative-demokratie",
        notePath: "01_Deutsch/Texte-Analyse/Argumentationslogik-und-Sprachmacht-Vernetzung.md",
      },
    ],
  },
];

export interface AllSubjectsMacroViewProps {
  readonly lang: Lang;
  readonly nodeLangMode: NodeLanguageMode;
  readonly onSelectSubject: (fach: SubjectKey) => void;
  readonly onSelectNode: (node: KnowledgeNode) => void;
  readonly onDeselectNode?: () => void;
  readonly onOpenNote?: (notePath: string) => void;
  readonly onStartSzenario?: (track: CrossSubjectSynergyTrack) => void;
  readonly selectedNodeId?: string | null;
  readonly masteredIds: Set<string>;
  readonly onToggleMastered?: (nodeId: string, fach: string) => void;
  readonly className?: string;
}

type MacroTab = "astrolabe" | "matrix" | "synergies";

export function AllSubjectsMacroView({
  lang,
  nodeLangMode,
  onSelectSubject,
  onSelectNode,
  onDeselectNode,
  onOpenNote,
  onStartSzenario,
  selectedNodeId,
  masteredIds,
  className = "",
}: AllSubjectsMacroViewProps) {
  const de = lang === "de";

  // 当前子视图 Tab: 宏观星盘 (astrolabe) | 十科阵列 (matrix) | 跨学科战役 (synergies)
  const [activeTab, setActiveTab] = useState<MacroTab>("astrolabe");

  // 跨学科战役高亮选择
  const [selectedSynergyId, setSelectedSynergyId] = useState<string | null>(null);

  // 全科考点即时检索关键字
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 悬停学科或考点
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // 模拟 AFB III 综合大题弹窗工作台
  const [simulatingTrack, setSimulatingTrack] = useState<CrossSubjectSynergyTrack | null>(null);
  const [scenarioDraft, setScenarioDraft] = useState<string>("");

  // 星盘画布平移与缩放
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1.0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 汇总所有已注册学科图谱与知识点
  const allGraphs = useMemo<SubjectKnowledgeGraph[]>(() => {
    return graphRegistry.getAll();
  }, []);

  const allSubjectsMeta = useMemo(() => {
    return graphRegistry.listSubjects();
  }, []);

  // 扁平化全科考点池
  const allNodes = useMemo<KnowledgeNode[]>(() => {
    const list: KnowledgeNode[] = [];
    for (const g of allGraphs) {
      for (const n of g.nodes) {
        list.push(n);
      }
    }
    return list;
  }, [allGraphs]);

  const nodeMap = useMemo(() => {
    return new Map(allNodes.map((n) => [n.id, n]));
  }, [allNodes]);

  // 当前选中的跨学科战役对象
  const activeSynergyTrack = useMemo<CrossSubjectSynergyTrack | null>(() => {
    if (!selectedSynergyId) return null;
    return (
      CROSS_SUBJECT_SYNERGY_TRACKS.find(
        (t) =>
          t.id === selectedSynergyId ||
          t.clusterId === selectedSynergyId ||
          t.aliasIds?.includes(selectedSynergyId)
      ) || null
    );
  }, [selectedSynergyId]);

  // 全科全局宏观指标 (KPI)
  const globalStats = useMemo(() => {
    const total = allNodes.length;
    const mastered = allNodes.filter((n) => masteredIds.has(n.id)).length;
    const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;

    // 文理平衡分布：MINT (理科) vs GeWi (文科/社科)
    const mintSubs = new Set(["mathe", "physik", "chemie", "bio", "informatik"]);
    let mintTotal = 0;
    let mintMastered = 0;
    let gewiTotal = 0;
    let gewiMastered = 0;

    for (const n of allNodes) {
      const f = String(n.fach).toLowerCase();
      if (mintSubs.has(f)) {
        mintTotal++;
        if (masteredIds.has(n.id)) mintMastered++;
      } else {
        gewiTotal++;
        if (masteredIds.has(n.id)) gewiMastered++;
      }
    }

    const mintPercent = mintTotal > 0 ? Math.round((mintMastered / mintTotal) * 100) : 0;
    const gewiPercent = gewiTotal > 0 ? Math.round((gewiMastered / gewiTotal) * 100) : 0;

    return {
      total,
      mastered,
      percent,
      mintTotal,
      mintMastered,
      mintPercent,
      gewiTotal,
      gewiMastered,
      gewiPercent,
    };
  }, [allNodes, masteredIds]);

  // 全科即时搜索过滤结果
  const searchResults = useMemo(() => {
    const q = searchQuery.trim();
    if (!q) return [];
    return fuzzyFilterAndRankNodes(allNodes, q).slice(0, 20);
  }, [searchQuery, allNodes]);

  // 计算 10 门主修学科在星盘环周的极坐标布局 (Astrolabe Orbital Planetary Layout)
  const ASTROLABE_CX = 560;
  const ASTROLABE_CY = 440;
  const ASTROLABE_ORBIT_R = 270;

  const subjectPlacements = useMemo(() => {
    const subs = allSubjectsMeta;
    const count = subs.length;
    if (count === 0) return [];

    return subs.map((sub, idx) => {
      // 均分 360 度，从 -90 度 (正上方 12 点钟位置) 开始顺时针排列
      const angleDeg = -90 + (idx * 360) / count;
      const angleRad = (angleDeg * Math.PI) / 180;
      const cx = ASTROLABE_CX + ASTROLABE_ORBIT_R * Math.cos(angleRad);
      const cy = ASTROLABE_CY + ASTROLABE_ORBIT_R * Math.sin(angleRad);

      const graph = allGraphs.find((g) => g.fach.toLowerCase() === sub.fach.toLowerCase());
      const nodes = graph ? graph.nodes : [];
      const total = nodes.length;
      const mastered = nodes.filter((n) => masteredIds.has(n.id)).length;
      const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;

      // 提取该学科代表性锚定知识点 (AFB I, II, III 各选 1 个)
      const anchorNodes: KnowledgeNode[] = [];
      const afb1 = nodes.find((n) => n.level === 1);
      const afb2 = nodes.find((n) => n.level === 2 && n.id !== afb1?.id);
      const afb3 = nodes.find((n) => n.level === 3 && n.id !== afb1?.id && n.id !== afb2?.id);
      if (afb1) anchorNodes.push(afb1);
      if (afb2) anchorNodes.push(afb2);
      if (afb3) anchorNodes.push(afb3);

      return {
        fach: sub.fach,
        nameDE: sub.nameDE,
        nameZH: sub.nameZH,
        cx,
        cy,
        angleDeg,
        total,
        mastered,
        percent,
        anchorNodes,
      };
    });
  }, [allSubjectsMeta, allGraphs, masteredIds]);

  // 跨学科连线渲染数据 (Interdisciplinary Link Vectors with Gravitational Bezier Arcs)
  const crossSubjectLinks = useMemo(() => {
    const links: Array<{
      id: string;
      trackId: string;
      fromSubject: string;
      toSubject: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      qx: number;
      qy: number;
      pathD: string;
      titleZH: string;
      titleDE: string;
      isActive: boolean;
    }> = [];

    const placementMap = new Map(subjectPlacements.map((p) => [p.fach.toLowerCase(), p]));

    for (const track of CROSS_SUBJECT_SYNERGY_TRACKS) {
      const isTrackSelected =
        selectedSynergyId === track.id ||
        selectedSynergyId === track.clusterId ||
        (track.aliasIds && selectedSynergyId ? track.aliasIds.includes(selectedSynergyId) : false);

      const subs = track.subjectIds;
      if (subs.length >= 2) {
        // 连接该战役学科群的相邻环形星体 (S_0 -> S_1 -> S_2 -> ... -> S_0)
        for (let i = 0; i < subs.length; i++) {
          const s1 = subs[i];
          const s2 = subs[(i + 1) % subs.length];
          const p1 = placementMap.get(s1.toLowerCase());
          const p2 = placementMap.get(s2.toLowerCase());
          if (p1 && p2) {
            const isHovered =
              hoveredSubject === p1.fach.toLowerCase() ||
              hoveredSubject === p2.fach.toLowerCase();

            // 如果有战役被选中，只有选中战役的连线激活；若未选中，则悬停学科激活
            const isActive = selectedSynergyId ? isTrackSelected : isHovered;

            // 计算重力弯曲贝塞尔控制点 (向星盘中心拉扯弯曲，形成引力透镜弧线)
            const mx = (p1.cx + p2.cx) / 2;
            const my = (p1.cy + p2.cy) / 2;
            const vx = mx - ASTROLABE_CX;
            const vy = my - ASTROLABE_CY;
            const qx = +(mx - 0.35 * vx).toFixed(1);
            const qy = +(my - 0.35 * vy).toFixed(1);
            const pathD = `M ${p1.cx} ${p1.cy} Q ${qx} ${qy} ${p2.cx} ${p2.cy}`;

            links.push({
              id: `${track.id}-${p1.fach}-${p2.fach}`,
              trackId: track.id,
              fromSubject: p1.fach,
              toSubject: p2.fach,
              x1: p1.cx,
              y1: p1.cy,
              x2: p2.cx,
              y2: p2.cy,
              qx,
              qy,
              pathD,
              titleZH: track.titleZH,
              titleDE: track.titleDE,
              isActive,
            });
          }
        }
      }
    }

    return links;
  }, [subjectPlacements, selectedSynergyId, hoveredSubject]);

  const handleStartSzenario = (track: CrossSubjectSynergyTrack) => {
    setSimulatingTrack(track);
    setScenarioDraft("");
    onStartSzenario?.(track);
  };

  const handleOpenNote = (notePath: string) => {
    onOpenNote?.(notePath);
  };

  const canvasPointerDownPosRef = useRef<{ x: number; y: number } | null>(null);
  const canvasHasMovedRef = useRef<boolean>(false);

  // 画布鼠标拖拽平移与点击空白取消选中支持
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if ((e.target as HTMLElement).closest("[data-clickable='true']")) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // 兼容不支持 setPointerCapture 的测试环境
    }
    canvasPointerDownPosRef.current = { x: e.clientX, y: e.clientY };
    canvasHasMovedRef.current = false;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    if (canvasPointerDownPosRef.current) {
      const dist = Math.hypot(
        e.clientX - canvasPointerDownPosRef.current.x,
        e.clientY - canvasPointerDownPosRef.current.y
      );
      if (dist > 8) {
        canvasHasMovedRef.current = true;
      }
    }
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // 兼容不支持 pointerCapture 的环境
    }
    const startPos = canvasPointerDownPosRef.current;
    canvasPointerDownPosRef.current = null;
    isDraggingRef.current = false;

    const dist = startPos ? Math.hypot(e.clientX - startPos.x, e.clientY - startPos.y) : 999;
    if (startPos && !canvasHasMovedRef.current && dist <= 8) {
      onDeselectNode?.();
    }
  };

  const handleCanvasBgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).closest("[data-clickable='true']")) return;
    if (canvasHasMovedRef.current) {
      canvasHasMovedRef.current = false;
      return;
    }
    onDeselectNode?.();
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((z) => Math.min(2.5, Math.max(0.65, +(z * factor).toFixed(3))));
  };

  return (
    <div
      className={`relative flex flex-col w-full h-full bg-[var(--surface)] text-[var(--ink)] overflow-hidden select-none ${className}`}
      data-testid="all-subjects-macro-view"
    >
      {/* 顶部微型全科导航栏与 KPI 控制台 */}
      <div className="flex items-center justify-between border-b border-[var(--line)] px-3 py-1.5 bg-[var(--paper-subtle)] text-xs font-mono shrink-0 gap-3 z-10 flex-wrap min-h-[40px]">
        {/* 左侧：Tab 视图切换 */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[var(--gray)] font-bold uppercase tracking-wider text-[11px] mr-1">
            {de ? "Gesamt-Kosmos:" : "全科学业总台:"}
          </span>
          <div className="flex items-center border border-[var(--line)] rounded-[var(--radius)] overflow-hidden h-7 bg-[var(--surface)]">
            <button
              type="button"
              onClick={() => setActiveTab("astrolabe")}
              aria-pressed={activeTab === "astrolabe"}
              className={`px-2.5 h-full flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === "astrolabe"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title={de ? "Interdisziplinäres Astrolabium" : "全科学术引力星盘"}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="8" cy="8" r="6" strokeDasharray="2 2" />
                <circle cx="8" cy="8" r="2.5" fill="currentColor" />
              </svg>
              <span>{de ? "Kosmos-Astrolabium" : "全科引力星盘"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("matrix")}
              aria-pressed={activeTab === "matrix"}
              className={`px-2.5 h-full flex items-center gap-1.5 cursor-pointer transition-colors border-l border-[var(--line)] ${
                activeTab === "matrix"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title={de ? "Fächer-Curriculum-Matrix" : "十科学阶阵列矩阵"}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="9" y="2" width="5" height="5" rx="1" />
                <rect x="2" y="9" width="5" height="5" rx="1" />
                <rect x="9" y="9" width="5" height="5" rx="1" />
              </svg>
              <span>{de ? "Fächer-Matrix" : "学阶矩阵阵列"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("synergies")}
              aria-pressed={activeTab === "synergies"}
              className={`px-2.5 h-full flex items-center gap-1.5 cursor-pointer transition-colors border-l border-[var(--line)] ${
                activeTab === "synergies"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title={de ? "Interdisziplinäre Vernetzungspfade" : "跨学科融通战役"}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{de ? "Vernetzungs-Pfade" : "跨学科融通战役"}</span>
            </button>
          </div>
        </div>

        {/* 中间：全科全域即时搜索输入框 */}
        <div className="relative flex-1 max-w-xs shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={de ? "Alle 700+ Knoten durchsuchen…" : "全科 700+ 考点闪电穿梭检索…"}
            className="w-full h-7 pl-7 pr-2 text-xs font-mono bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--ink)] focus:outline-none"
            data-testid="all-subjects-search-input"
          />
          <svg
            className="absolute left-2 top-2 w-3.5 h-3.5 text-[var(--gray)] pointer-events-none"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>

          {/* 搜索结果即时浮层 */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-8 bg-[var(--surface)] border border-[var(--ink)] rounded-[var(--radius)] max-h-72 overflow-y-auto z-40 p-1 space-y-1">
              <div className="px-2 py-1 text-[10px] text-[var(--gray)] border-b border-[var(--line)] flex justify-between items-center">
                <span>{de ? "Gefundene Knoten" : "匹配考点清单"} ({searchResults.length})</span>
                <button
                  type="button"
                  className="cursor-pointer text-[var(--gray)] hover:text-[var(--ink)] p-0.5"
                  onClick={() => setSearchQuery("")}
                  aria-label={de ? "Schließen" : "关闭"}
                >
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <path d="M3 3l10 10M13 3L3 13" />
                  </svg>
                </button>
              </div>
              {searchResults.map((node) => {
                const loc = resolveNodeLanguage(node, nodeLangMode, lang);
                const isMastered = masteredIds.has(node.id);
                return (
                  <div
                    key={node.id}
                    data-testid={`search-result-${node.id}`}
                    onClick={() => {
                      onSelectNode(node);
                      setSearchQuery("");
                    }}
                    className="p-1.5 rounded-[var(--radius)] hover:bg-[var(--paper-subtle)] cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="min-w-0 flex items-center gap-1.5">
                      <span className="font-mono text-[9px] uppercase px-1 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] rounded shrink-0">
                        {node.fach}
                      </span>
                      <span className="font-serif font-bold truncate text-[var(--ink)]">
                        {loc.primaryTitle}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--gray)] truncate hidden sm:inline">
                        {loc.secondaryTitle}
                      </span>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5 ml-2">
                      <span className="font-mono text-[9px] text-[var(--gray)]">
                        AFB {node.level === 1 ? "I" : node.level === 2 ? "II" : "III"}
                      </span>
                      {isMastered ? (
                        <span className="font-mono text-[8px] px-1 py-0.5 bg-[var(--ink)] text-[var(--surface)] rounded">
                          {de ? "Gekonnt" : "已精通"}
                        </span>
                      ) : (
                        <span className="font-mono text-[8px] px-1 py-0.5 border border-[var(--line)] text-[var(--gray)] rounded">
                          {de ? "Offen" : "待学"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 右侧：全科宏观学习总进度胶囊 */}
        <div className="flex items-center gap-2.5 ml-auto shrink-0">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-[11px] font-mono">
            <span className="text-[var(--gray)]">{de ? "Gesamt:" : "全科总进度:"}</span>
            <span className="font-bold tabular-nums text-[var(--ink)]">
              {globalStats.mastered}/{globalStats.total} ({globalStats.percent}%)
            </span>
            <div className="w-14 h-1.5 bg-[var(--line)] rounded-full overflow-hidden ml-0.5">
              <div
                className="h-full bg-[var(--ink)] transition-all duration-300"
                style={{ width: `${globalStats.percent}%` }}
              />
            </div>
          </div>

          {/* 文理平衡分布比 (MINT vs GeWi) */}
          <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-[10px] font-mono">
            <span className="text-[var(--gray)]">MINT {globalStats.mintPercent}%</span>
            <span className="text-[var(--line)]">|</span>
            <span className="text-[var(--gray)]">GeWi {globalStats.gewiPercent}%</span>
          </div>

          {/* 缩放控制器 */}
          <div className="flex items-center border border-[var(--line)] rounded-[var(--radius)] overflow-hidden h-7 bg-[var(--surface)]">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)))}
              className="px-2 h-full text-xs hover:bg-[var(--paper-subtle)] cursor-pointer"
              title={de ? "Vergrößern" : "放大"}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.65, +(z - 0.15).toFixed(2)))}
              className="px-2 h-full text-xs hover:bg-[var(--paper-subtle)] cursor-pointer border-l border-[var(--line)]"
              title={de ? "Verkleinern" : "缩小"}
            >
              -
            </button>
            <button
              type="button"
              onClick={() => {
                setZoom(1.0);
                setPan({ x: 0, y: 0 });
              }}
              className="px-2 h-full text-[11px] hover:bg-[var(--paper-subtle)] cursor-pointer border-l border-[var(--line)]"
              title={de ? "Zurücksetzen" : "重置"}
            >
              1:1
            </button>
          </div>
        </div>
      </div>

      {/* 主体画布展示区 */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[var(--surface)]">
        {/* TAB 1: 全科学术引力星盘 (Astrolabe Multi-Cosmos) */}
        {activeTab === "astrolabe" && (
          <div className="relative w-full h-full">
            {/* 宏观星盘顶部快捷战役引力筛选胶囊 */}
            <div className="absolute top-2.5 left-3 z-10 flex items-center gap-1.5 bg-[var(--surface)] border border-[var(--line)] px-2 py-1 rounded-[var(--radius)] text-xs font-mono max-w-full overflow-x-auto no-scrollbar">
              <span className="text-[var(--gray)] font-bold text-[10px] uppercase shrink-0">
                {de ? "Synergie-Fokus:" : "战役引力桥:"}
              </span>
              <button
                type="button"
                onClick={() => setSelectedSynergyId(null)}
                className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer transition-colors shrink-0 ${
                  selectedSynergyId === null
                    ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? "Alle" : "全景"}
              </button>
              {CROSS_SUBJECT_SYNERGY_TRACKS.map((track) => (
                <button
                  key={track.id}
                  type="button"
                  data-testid={`astrolabe-synergy-pill-${track.id}`}
                  onClick={() =>
                    setSelectedSynergyId(selectedSynergyId === track.id ? null : track.id)
                  }
                  className={`px-1.5 py-0.5 rounded text-[10px] cursor-pointer transition-colors shrink-0 ${
                    selectedSynergyId === track.id
                      ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                      : "text-[var(--gray)] hover:text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)]"
                  }`}
                  title={de ? track.titleDE : track.titleZH}
                >
                  {track.subjectIds.join("+")}
                </button>
              ))}
            </div>

            <svg
              className="w-full h-full cursor-grab active:cursor-grabbing"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onClick={handleCanvasBgClick}
              onWheel={handleWheel}
              data-testid="all-subjects-astrolabe"
            >
              {/* 毫米方格学术工程底纹图纸 */}
              <defs>
                <pattern id="macro-grid-subtle" width="28" height="28" patternUnits="userSpaceOnUse">
                  <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--line)" strokeWidth="0.5" opacity="0.45" />
                </pattern>
                <pattern id="macro-grid-major" width="140" height="140" patternUnits="userSpaceOnUse">
                  <rect width="140" height="140" fill="url(#macro-grid-subtle)" />
                  <path d="M 140 0 L 0 0 0 140" fill="none" stroke="var(--line)" strokeWidth="0.9" opacity="0.75" />
                </pattern>
              </defs>
              <rect
                width="100%"
                height="100%"
                fill="url(#macro-grid-major)"
                onClick={handleCanvasBgClick}
                data-testid="all-subjects-astrolabe-bg"
              />

              <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                {/* 1. 星盘同心天球轨道环层 */}
                <circle
                  cx={ASTROLABE_CX}
                  cy={ASTROLABE_CY}
                  r={ASTROLABE_ORBIT_R}
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="1.2"
                  strokeDasharray="4 4"
                />
                <circle
                  cx={ASTROLABE_CX}
                  cy={ASTROLABE_CY}
                  r={ASTROLABE_ORBIT_R + 65}
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="0.7"
                  strokeDasharray="2 6"
                  opacity="0.6"
                />
                <circle
                  cx={ASTROLABE_CX}
                  cy={ASTROLABE_CY}
                  r={ASTROLABE_ORBIT_R - 95}
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="0.8"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />

                {/* 2. 跨学科引力连线网络与重力贝塞尔弧线桥梁 (Inter-Subject Gravitational Bridge Links) */}
                <g className="cross-subject-links">
                  {crossSubjectLinks.map((link) => (
                    <g
                      key={link.id}
                      className={`inter-subject-bridge-link transition-all duration-300 ${
                        link.isActive ? "active-bridge" : ""
                      }`}
                      data-testid="inter-subject-bridge-link"
                    >
                      {/* A. 柔化微光外包络层 */}
                      <path
                        d={link.pathD}
                        fill="none"
                        stroke="var(--ink)"
                        strokeWidth={link.isActive ? 5 : 1.2}
                        strokeOpacity={link.isActive ? 0.15 : 0.06}
                        strokeLinecap="round"
                      />

                      {/* B. 基础贝塞尔引力弧线桥 */}
                      <path
                        d={link.pathD}
                        fill="none"
                        stroke={link.isActive ? "var(--ink)" : "var(--line)"}
                        strokeWidth={link.isActive ? 2.2 : 0.8}
                        strokeDasharray={link.isActive ? "none" : "3 4"}
                        strokeOpacity={link.isActive ? 1.0 : 0.35}
                        strokeLinecap="round"
                      />

                      {/* C. 双向拓扑微光 (Topological bidirectional light shimmers) */}
                      {link.isActive && (
                        <>
                          {/* 正向拓扑微光 */}
                          <path
                            d={link.pathD}
                            fill="none"
                            stroke="var(--ink)"
                            strokeWidth="1.8"
                            strokeDasharray="5 9"
                            strokeOpacity="0.85"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="28;0"
                              dur="2.4s"
                              repeatCount="indefinite"
                            />
                          </path>
                          {/* 反向拓扑微光 */}
                          <path
                            d={link.pathD}
                            fill="none"
                            stroke="var(--ink)"
                            strokeWidth="1.2"
                            strokeDasharray="3 11"
                            strokeOpacity="0.6"
                          >
                            <animate
                              attributeName="stroke-dashoffset"
                              values="0;28"
                              dur="3.2s"
                              repeatCount="indefinite"
                            />
                          </path>
                        </>
                      )}

                      {/* D. 激活时在引力桥中点展示信息气泡 */}
                      {link.isActive && (
                        <g transform={`translate(${link.qx}, ${link.qy})`} className="pointer-events-none">
                          <rect
                            x="-44"
                            y="-9"
                            width="88"
                            height="18"
                            rx="2.5"
                            fill="var(--surface)"
                            stroke="var(--ink)"
                            strokeWidth="1.2"
                          />
                          <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontFamily="monospace"
                            fontSize="8.5"
                            fontWeight="bold"
                            fill="var(--ink)"
                          >
                            {`${link.fromSubject} ↔ ${link.toSubject}`}
                          </text>
                        </g>
                      )}
                    </g>
                  ))}
                </g>

                {/* 3. 星盘中枢核心：全科学业会考中枢 (Abitur 2027 Universal Nucleus) */}
                <g transform={`translate(${ASTROLABE_CX}, ${ASTROLABE_CY})`} className="select-none">
                  {/* 擒纵轮外周刻度 */}
                  {Array.from({ length: 36 }).map((_, i) => {
                    const rad = (i * 10 * Math.PI) / 180;
                    return (
                      <line
                        key={i}
                        x1={54 * Math.cos(rad)}
                        y1={54 * Math.sin(rad)}
                        x2={60 * Math.cos(rad)}
                        y2={60 * Math.sin(rad)}
                        stroke="var(--line)"
                        strokeWidth="1.0"
                      />
                    );
                  })}
                  <circle
                    r="52"
                    fill="var(--surface)"
                    stroke="var(--ink)"
                    strokeWidth="2.2"
                  />
                  <circle
                    r="48"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="0.8"
                    strokeOpacity="0.3"
                  />
                  <text
                    y="-14"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="8.5"
                    fontWeight="bold"
                    letterSpacing="1.5"
                    fill="var(--gray)"
                  >
                    GYMNASIUM NRW
                  </text>
                  <text
                    y="4"
                    textAnchor="middle"
                    fontFamily="serif"
                    fontSize="13"
                    fontWeight="bold"
                    fill="var(--ink)"
                  >
                    ABITUR 2027
                  </text>
                  <text
                    y="20"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="9"
                    fill="var(--gray)"
                  >
                    {`${allSubjectsMeta.length} FÄCHER · ${globalStats.total} KNOTEN`}
                  </text>
                </g>

                {/* 4. 十大学科星系核与支柱锚点 (Subject Planetary Cores & Anchor Satellites) */}
                {subjectPlacements.map((sub) => {
                  const isHovered = hoveredSubject === sub.fach.toLowerCase();
                  const isSubInActiveTrack = activeSynergyTrack
                    ? activeSynergyTrack.subjectIds.some(
                        (s) => s.toLowerCase() === sub.fach.toLowerCase()
                      )
                    : false;
                  const isSubDimmed = activeSynergyTrack && !isSubInActiveTrack;

                  return (
                    <g
                      key={sub.fach}
                      transform={`translate(${sub.cx}, ${sub.cy})`}
                      className="group"
                      opacity={isSubDimmed ? 0.35 : 1.0}
                      onPointerEnter={() => setHoveredSubject(sub.fach.toLowerCase())}
                      onPointerLeave={() => setHoveredSubject(null)}
                      style={{
                        transformOrigin: `${sub.cx}px ${sub.cy}px`,
                        transformBox: "view-box",
                      }}
                    >
                      {/* A. 战役高亮光环与学科微型卫星轨道环 */}
                      {isSubInActiveTrack && (
                        <circle
                          r="56"
                          fill="none"
                          stroke="var(--ink)"
                          strokeWidth="1.4"
                          strokeDasharray="3 3"
                        />
                      )}
                      <circle
                        r="48"
                        fill="none"
                        stroke={isHovered || isSubInActiveTrack ? "var(--ink)" : "var(--line)"}
                        strokeWidth={isSubInActiveTrack ? 1.4 : 0.8}
                        strokeDasharray="2 3"
                      />

                      {/* B. 学科支柱锚定节点 (3 个 AFB 卫星点) */}
                      {sub.anchorNodes.map((node, nodeIdx) => {
                        const satAngle = (nodeIdx * 120 * Math.PI) / 180;
                        const satX = 48 * Math.cos(satAngle);
                        const satY = 48 * Math.sin(satAngle);
                        const isNodeMastered = masteredIds.has(node.id);
                        const isNodeSelected = selectedNodeId === node.id;
                        const isNodeHovered = hoveredNodeId === node.id;
                        const isNodeInSynergy = activeSynergyTrack
                          ? activeSynergyTrack.nodeIds.includes(node.id) ||
                            activeSynergyTrack.stages.some((s) => s.nodeId === node.id)
                          : false;
                        const loc = resolveNodeLanguage(node, nodeLangMode, lang);

                        return (
                          <g
                            key={node.id}
                            transform={`translate(${satX}, ${satY})`}
                            data-clickable="true"
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectNode(node);
                            }}
                            onPointerEnter={() => setHoveredNodeId(node.id)}
                            onPointerLeave={() => setHoveredNodeId(null)}
                          >
                            {isNodeInSynergy && (
                              <circle
                                r="11"
                                fill="none"
                                stroke="var(--ink)"
                                strokeWidth="1.2"
                                strokeDasharray="2 2"
                              />
                            )}
                            <circle
                              r={isNodeSelected || isNodeHovered ? "8.5" : "6.5"}
                              fill={isNodeMastered ? "var(--ink)" : "var(--surface)"}
                              stroke="var(--ink)"
                              strokeWidth={isNodeSelected || isNodeInSynergy ? "2.0" : "1.2"}
                              className="transition-all duration-150"
                            />
                            {isNodeMastered && (
                              <path
                                d="M-2.5 0 L-0.8 1.8 L2.5 -1.5"
                                fill="none"
                                stroke="var(--surface)"
                                strokeWidth="1.2"
                                strokeLinecap="round"
                              />
                            )}
                            {/* 悬停展示微型气泡名牌 */}
                            {(isNodeHovered || isNodeSelected) && (
                              <g transform="translate(0, -14)" className="pointer-events-none">
                                <rect
                                  x="-50"
                                  y="-10"
                                  width="100"
                                  height="18"
                                  rx="3"
                                  fill="var(--surface)"
                                  stroke="var(--ink)"
                                  strokeWidth="1.2"
                                />
                                <text
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  fontFamily="serif"
                                  fontSize="8.5"
                                  fontWeight="bold"
                                  fill="var(--ink)"
                                >
                                  {truncateTextToVisualWidth(loc.primaryTitle, 86, 8.5, true)}
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })}

                      {/* C. 学科核心实体球 (Subject Sun Nucleus) */}
                      <g
                        data-clickable="true"
                        className="cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSubject(sub.fach);
                        }}
                      >
                        <circle
                          r="27"
                          fill="var(--surface)"
                          stroke="var(--ink)"
                          strokeWidth={isHovered || isSubInActiveTrack ? "2.4" : "1.8"}
                          className="transition-all duration-150"
                        />
                        <circle
                          r="23"
                          fill="none"
                          stroke={isSubInActiveTrack ? "var(--ink)" : "var(--line)"}
                          strokeWidth="0.8"
                        />
                        {/* 学科缩写代码 */}
                        <text
                          y="-4"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontSize="9.5"
                          fontWeight="bold"
                          fill="var(--ink)"
                        >
                          {String(sub.fach).toUpperCase()}
                        </text>
                        {/* 掌握度百分比 */}
                        <text
                          y="9"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontSize="8.5"
                          fill="var(--gray)"
                        >
                          {`${sub.percent}%`}
                        </text>
                      </g>

                      {/* D. 学科名称标牌与快速穿梭链接 */}
                      <g transform="translate(0, 36)" className="select-none">
                        <text
                          textAnchor="middle"
                          fontFamily="serif"
                          fontSize="11"
                          fontWeight="bold"
                          fill="var(--ink)"
                        >
                          {de ? sub.nameDE : sub.nameZH}
                        </text>
                        <g
                          data-clickable="true"
                          className="cursor-pointer hover:opacity-80"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectSubject(sub.fach);
                          }}
                        >
                          <text
                            y="13"
                            textAnchor="middle"
                            fontFamily="monospace"
                            fontSize="8.5"
                            fill="var(--gray)"
                            textDecoration="underline"
                          >
                            {de ? "→ Zum Fach" : "→ 深入该科图谱"}
                          </text>
                        </g>
                      </g>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* 星盘浮动战役信息 HUD 卡片 */}
            {activeSynergyTrack && (
              <div
                className="absolute bottom-4 right-4 max-w-sm w-full bg-[var(--surface)] border border-[var(--ink)] rounded-[var(--radius)] p-3 text-xs font-mono z-20 space-y-2"
                data-testid="astrolabe-active-synergy-hud"
              >
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-[9px] px-1 py-0.5 bg-[var(--ink)] text-[var(--surface)] rounded">
                      {activeSynergyTrack.operator}
                    </span>
                    <span className="font-bold text-[10px] text-[var(--gray)]">
                      {activeSynergyTrack.subjectIds.join(" + ")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedSynergyId(null)}
                    className="p-1 hover:text-[var(--gray)] cursor-pointer"
                    aria-label={de ? "Schließen" : "关闭"}
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                <div className="font-serif font-bold text-sm text-[var(--ink)]">
                  {de ? activeSynergyTrack.titleDE : activeSynergyTrack.titleZH}
                </div>
                <p className="font-serif text-[11px] text-[var(--gray)] line-clamp-2 leading-tight">
                  {de ? activeSynergyTrack.szenarioQuestionDE : activeSynergyTrack.szenarioQuestionZH}
                </p>
                <div className="flex items-center gap-2 pt-1 border-t border-[var(--line)]">
                  <button
                    type="button"
                    data-testid={`hud-start-szenario-btn-${activeSynergyTrack.id}`}
                    onClick={() => handleStartSzenario(activeSynergyTrack)}
                    className="flex-1 h-7 rounded bg-[var(--ink)] text-[var(--surface)] text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer hover:opacity-90"
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <polygon points="4 2 14 8 4 14 4 2" />
                    </svg>
                    <span>{de ? "Szenario starten" : "大题模拟"}</span>
                  </button>
                  <button
                    type="button"
                    data-testid={`hud-open-note-btn-${activeSynergyTrack.id}`}
                    onClick={() => handleOpenNote(activeSynergyTrack.linkedNotePath)}
                    className="flex-1 h-7 rounded border border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)] text-[10px] font-bold flex items-center justify-center gap-1 cursor-pointer hover:bg-[var(--paper-subtle)]"
                  >
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path d="M3 2h8l3 3v9H3V2z" />
                    </svg>
                    <span>{de ? "Notiz öffnen" : "研读笔记"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("synergies")}
                    className="px-2 h-7 rounded border border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)] text-[10px] cursor-pointer"
                    title={de ? "Alle 4 Schritte ansehen" : "查看4阶段因果链"}
                  >
                    →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: 跨学科融通战役 (Synergy Tracks Flow with 4-Stage Causal Chains & Scenarios) */}
        {activeTab === "synergies" && (
          <div
            className="w-full h-full overflow-y-auto p-4 md:p-6 space-y-6"
            data-testid="all-subjects-synergy-tracks"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onDeselectNode?.();
              }
            }}
          >
            <div className="border-b border-[var(--line)] pb-3">
              <h2 className="font-serif text-lg font-bold text-[var(--ink)]">
                {de ? "Interdisziplinäre Vernetzungspfade (Oberstufe)" : "跨学科融通专题战役 (高中全科核心因果链)"}
              </h2>
              <p className="text-xs text-[var(--gray)] mt-1 font-mono">
                {de
                  ? "4 fundierte Klausur-Szenarien (Cluster 1-4) über MINT & GeWi Fachgrenzen hinweg mit 15 NP Bewertungsrastern."
                  : "四大核心跨学科会考沙盘簇 (Cluster 1-4)，深度贯通 MINT 理科与 GeWi 文科社科，直通 15 NP 高阶大题评分标准。"}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {CROSS_SUBJECT_SYNERGY_TRACKS.map((track) => {
                const isSelected = selectedSynergyId === track.id;
                return (
                  <div
                    key={track.id}
                    data-testid={`synergy-track-card-${track.id}`}
                    onClick={() => setSelectedSynergyId(isSelected ? null : track.id)}
                    className={`p-4 md:p-5 rounded-[var(--radius)] border transition-all cursor-pointer flex flex-col gap-4 ${
                      isSelected
                        ? "bg-[var(--surface)] border-[var(--ink)] ring-1 ring-[var(--ink)]"
                        : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--ink)]"
                    }`}
                  >
                    {/* 头部元数据 */}
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {track.subjectIds.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[9.5px] uppercase font-bold px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] rounded"
                          >
                            {s}
                          </span>
                        ))}
                        <span className="font-mono text-[9.5px] px-1.5 py-0.5 bg-[var(--ink)] text-[var(--surface)] rounded font-bold">
                          {track.operator}
                        </span>
                        <span className="font-mono text-[9px] text-[var(--gray)] ml-auto">
                          {track.linkedNotePath.split("/").pop()}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[var(--ink)] mt-2">
                        {de ? track.titleDE : track.titleZH}
                      </h3>
                      <p className="text-xs text-[var(--gray)] mt-1.5 leading-relaxed">
                        {de ? track.descriptionDE : track.descriptionZH}
                      </p>
                    </div>

                    {/* 4 阶段因果链推进流 (Schritt 1 -> Schritt 4) */}
                    <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                      <div className="font-mono text-[10px] text-[var(--gray)] font-bold flex items-center justify-between">
                        <span>{de ? "4-Stufen-Kausalkette (Progression):" : "4阶段因果链推进流 (Schritt 1 -> Schritt 4):"}</span>
                        <span className="text-[9px]">{`${track.stages.length} Stationen`}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {track.stages.map((stage) => (
                          <div
                            key={stage.schritt}
                            className="p-2.5 rounded border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between gap-1.5 text-xs font-mono"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-[9px] px-1 py-0.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded">
                                Schritt {stage.schritt}
                              </span>
                              <span className="text-[9px] font-bold uppercase text-[var(--ink)]">
                                {stage.fach}
                              </span>
                            </div>
                            <div>
                              <div className="font-serif font-bold text-[11px] text-[var(--ink)] line-clamp-1">
                                {de ? stage.titleDE : stage.titleZH}
                              </div>
                              <div className="text-[10px] text-[var(--gray)] mt-0.5 line-clamp-3 leading-tight font-serif">
                                {de ? stage.descriptionDE : stage.descriptionZH}
                              </div>
                            </div>
                            {stage.nodeId && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const n = nodeMap.get(stage.nodeId!);
                                  if (n) onSelectNode(n);
                                }}
                                className="mt-1 text-[9px] text-[var(--ink)] underline hover:opacity-80 text-left font-mono cursor-pointer"
                              >
                                {de ? "→ Station ansteuern" : "→ 锚定考点"}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 核心思维桥梁 (Methodische Brücke) */}
                    <div className="p-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-xs">
                      <div className="font-mono text-[10px] font-bold text-[var(--gray)] flex items-center gap-1.5 mb-1">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <circle cx="8" cy="8" r="6" />
                          <path d="M8 2v12M2 8h12" />
                        </svg>
                        <span>{de ? "Methodische Brücke:" : "核心思维桥梁 (Methodische Brücke):"}</span>
                      </div>
                      <p className="font-serif text-[11.5px] text-[var(--ink)] leading-relaxed">
                        {de ? track.methodischeBrueckeDE : track.methodischeBrueckeZH}
                      </p>
                    </div>

                    {/* 15 NP 会考踩分话术示例 */}
                    <div className="p-3 rounded border border-[var(--line)] bg-[var(--surface)] text-xs">
                      <div className="font-mono text-[10px] font-bold text-[var(--gray)] flex items-center gap-1.5 mb-1">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                          <path d="M3 13h10M3 3h10M5 7h6" />
                        </svg>
                        <span>{de ? "15 NP Klausur-Synthese (Musterbewertung):" : "15 NP 会考踩分话术示例 (Musterbewertung):"}</span>
                      </div>
                      <blockquote className="font-serif text-[11px] text-[var(--ink)] pl-2.5 border-l-2 border-[var(--ink)] leading-relaxed">
                        {de ? track.klausurSynthese15NP_DE : track.klausurSynthese15NP_ZH}
                      </blockquote>
                    </div>

                    {/* AFB III 会考大题场景设问 */}
                    <div className="p-3 rounded border border-[var(--ink)] bg-[var(--surface)] text-xs">
                      <div className="font-mono text-[10px] font-bold text-[var(--ink)] flex items-center justify-between mb-1">
                        <span>{de ? "AFB III Klausur-Szenario (Leitfrage):" : "AFB III 会考综合大题场景设问:"}</span>
                        <span className="px-1 py-0.2 bg-[var(--ink)] text-[var(--surface)] text-[9px] rounded font-mono">
                          {track.operator}
                        </span>
                      </div>
                      <p className="font-serif font-bold text-xs text-[var(--ink)] leading-relaxed">
                        {de ? track.szenarioQuestionDE : track.szenarioQuestionZH}
                      </p>
                    </div>

                    {/* 一键行动按钮 */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[var(--line)] flex-wrap">
                      <button
                        type="button"
                        data-testid={`start-szenario-btn-${track.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartSzenario(track);
                        }}
                        className="px-3 h-8 rounded-[var(--radius)] bg-[var(--ink)] text-[var(--surface)] font-mono text-xs font-bold hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
                      >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <polygon points="4 2 14 8 4 14 4 2" />
                        </svg>
                        <span>{de ? "Klausur-Szenario starten" : "进入 AFB III 综合大题模拟"}</span>
                      </button>
                      <button
                        type="button"
                        data-testid={`open-note-btn-${track.id}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenNote(track.linkedNotePath);
                        }}
                        className="px-3 h-8 rounded-[var(--radius)] bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:border-[var(--ink)] font-mono text-xs font-bold hover:bg-[var(--paper-subtle)] transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 2h8l3 3v9H3V2z" />
                          <path d="M11 2v3h3" />
                        </svg>
                        <span>{de ? "Vernetzungsnotiz öffnen" : "研读跨学科考纲笔记"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: 十科学阶阵列矩阵 (Curriculum Matrix & Balance KPI) */}
        {activeTab === "matrix" && (
          <div
            className="w-full h-full overflow-y-auto p-4 md:p-6 space-y-6"
            data-testid="all-subjects-matrix"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onDeselectNode?.();
              }
            }}
          >
            <div className="border-b border-[var(--line)] pb-3">
              <h2 className="font-serif text-lg font-bold text-[var(--ink)]">
                {de ? "Fächer-Curriculum-Matrix & Fortschritts-Radar" : "全学科考阶阵列矩阵与备考总台"}
              </h2>
              <p className="text-xs text-[var(--gray)] mt-1 font-mono">
                {de
                  ? "Gesamtübersicht aller 10 Kernfächer mit direktem Einstieg in die Fachspezifische Detailebene."
                  : "全量 10 大会考学科完整矩阵看板，支持一键穿梭直达单科精细图谱。"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectPlacements.map((sub) => {
                return (
                  <div
                    key={sub.fach}
                    className="p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink)] transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded text-[var(--ink)]">
                          {sub.fach}
                        </span>
                        <span className="font-mono text-xs font-bold text-[var(--ink)] tabular-nums">
                          {sub.mastered}/{sub.total} ({sub.percent}%)
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[var(--ink)] mt-2">
                        {de ? sub.nameDE : sub.nameZH}
                      </h3>
                      <div className="w-full h-2 bg-[var(--line)] rounded-full overflow-hidden mt-3">
                        <div
                          className="h-full bg-[var(--ink)] transition-all duration-300"
                          style={{ width: `${sub.percent}%` }}
                        />
                      </div>
                    </div>

                    {/* 代表性核心支柱考点快捷试读 */}
                    <div className="space-y-1.5 pt-2 border-t border-[var(--line)] text-xs">
                      <div className="font-mono text-[10px] text-[var(--gray)]">
                        {de ? "Kern-Schwerpunkte:" : "核心支柱考点:"}
                      </div>
                      <div className="space-y-1">
                        {sub.anchorNodes.map((n) => {
                          const isM = masteredIds.has(n.id);
                          const loc = resolveNodeLanguage(n, nodeLangMode, lang);
                          return (
                            <div
                              key={n.id}
                              onClick={() => onSelectNode(n)}
                              className="p-1 rounded hover:bg-[var(--paper-subtle)] cursor-pointer flex items-center justify-between font-serif text-[11px]"
                            >
                              <span className="truncate max-w-[180px] text-[var(--ink)]">
                                · {loc.primaryTitle}
                              </span>
                              <span className="font-mono text-[9px] text-[var(--gray)] flex items-center gap-1">
                                {isM ? (
                                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                    <polyline points="3.5 8.5 6.5 11.5 12.5 4.5" />
                                  </svg>
                                ) : `AFB ${n.level}`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectSubject(sub.fach)}
                      className="w-full h-8 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--paper-subtle)] font-mono text-xs font-bold text-[var(--ink)] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      data-testid={`jump-to-fach-${sub.fach}`}
                    >
                      <span>{de ? `In ${sub.nameDE} eintauchen` : `深入【${sub.nameZH}】精细图谱`}</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M3 8h10M9 4l4 4-4 4" />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* AFB III 综合大题交互式模拟沙盒弹窗 */}
      {simulatingTrack && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--surface)]/80 backdrop-blur-sm p-4"
          data-testid="afb3-simulation-modal"
        >
          <div className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--ink)] rounded-[var(--radius)] max-h-[90vh] overflow-y-auto p-4 md:p-6 space-y-4">
            {/* 模态头 */}
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs px-2 py-0.5 bg-[var(--ink)] text-[var(--surface)] rounded font-bold">
                  {simulatingTrack.operator}
                </span>
                <span className="font-mono text-xs text-[var(--gray)]">
                  {simulatingTrack.subjectIds.join(" ↔ ")}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSimulatingTrack(null)}
                className="p-1 hover:text-[var(--gray)] cursor-pointer"
                aria-label={de ? "Schließen" : "关闭"}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div>
              <h3 className="font-serif text-base font-bold text-[var(--ink)]">
                {de ? simulatingTrack.titleDE : simulatingTrack.titleZH}
              </h3>
              <p className="font-serif text-sm font-bold text-[var(--ink)] mt-2 p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded leading-relaxed">
                {de ? simulatingTrack.szenarioQuestionDE : simulatingTrack.szenarioQuestionZH}
              </p>
            </div>

            {/* 4 步作答规范指引 */}
            <div className="space-y-1.5 border-t border-[var(--line)] pt-3 text-xs">
              <div className="font-mono text-[10px] text-[var(--gray)] font-bold">
                {de ? "AFB III Kriterien & Bewertungsraster:" : "AFB III 满分作答规范指引:"}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                <div className="p-2 border border-[var(--line)] rounded bg-[var(--paper-subtle)]">
                  1. {de ? "Kriteriengeleitete Argumentation" : "标准导向事实论据展开"}
                </div>
                <div className="p-2 border border-[var(--line)] rounded bg-[var(--paper-subtle)]">
                  2. {de ? "Normativer Perspektivenwechsel" : "规范伦理/理论视阈转换"}
                </div>
                <div className="p-2 border border-[var(--line)] rounded bg-[var(--paper-subtle)]">
                  3. {de ? "Fachübergreifende Synthese" : "跨学科底层机理联通"}
                </div>
                <div className="p-2 border border-[var(--line)] rounded bg-[var(--paper-subtle)]">
                  4. {de ? "15 NP Fazit & Eigenurteil" : "独立辩证终极评价闭环"}
                </div>
              </div>
            </div>

            {/* 15 NP 参考评分示范 */}
            <div className="space-y-1 text-xs">
              <div className="font-mono text-[10px] text-[var(--gray)] font-bold">
                {de ? "15 NP Musterformulierung (Synthese):" : "15 NP 踩分话术示范 (Synthese):"}
              </div>
              <blockquote className="p-3 bg-[var(--paper-subtle)] border-l-2 border-[var(--ink)] font-serif text-[11px] text-[var(--ink)] leading-relaxed">
                {de ? simulatingTrack.klausurSynthese15NP_DE : simulatingTrack.klausurSynthese15NP_ZH}
              </blockquote>
            </div>

            {/* 交互练习草稿区 */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[var(--gray)] font-bold block">
                {de ? "Eigene Klausur-Antwort skizzieren:" : "个人论述草稿演练:"}
              </label>
              <textarea
                rows={4}
                value={scenarioDraft}
                onChange={(e) => setScenarioDraft(e.target.value)}
                placeholder={de ? "Formulieren Sie hier Ihre begründete Synthese…" : "在此输入你的论辩阐述与综合评价…"}
                className="w-full p-2.5 text-xs font-serif bg-[var(--surface)] border border-[var(--line)] rounded text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--ink)] focus:outline-none"
              />
            </div>

            {/* 底部按钮 */}
            <div className="flex items-center justify-between border-t border-[var(--line)] pt-3 flex-wrap gap-2">
              <button
                type="button"
                onClick={() =>
                  setScenarioDraft(
                    de ? simulatingTrack.klausurSynthese15NP_DE : simulatingTrack.klausurSynthese15NP_ZH
                  )
                }
                className="px-2.5 py-1 text-xs font-mono border border-[var(--line)] rounded hover:bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
              >
                {de ? "Muster übernehmen" : "填入示范话术"}
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenNote(simulatingTrack.linkedNotePath)}
                  className="px-3 py-1 text-xs font-mono border border-[var(--line)] rounded hover:border-[var(--ink)] text-[var(--ink)] cursor-pointer"
                >
                  {de ? "Notiz öffnen" : "研读考纲笔记"}
                </button>
                <button
                  type="button"
                  onClick={() => setSimulatingTrack(null)}
                  className="px-4 py-1 text-xs font-mono bg-[var(--ink)] text-[var(--surface)] rounded font-bold cursor-pointer hover:opacity-90"
                >
                  {de ? "Fertigstellen" : "完成退出"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
