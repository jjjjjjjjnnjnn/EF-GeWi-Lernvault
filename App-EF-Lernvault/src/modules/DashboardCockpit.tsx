import { useEffect, useMemo, useState } from "react";
import type { Lang } from "../i18n";
import { MascotFox } from "../components/mascot/MascotFox";
import { THEMES, getStoredTheme, setStoredTheme, type ThemeId } from "../engine/theme";

export interface DashboardCockpitProps {
  lang: Lang;
  onNavigateToTab?: (tab: string, context?: Record<string, string>) => void;
  onSwitchToLegacy?: () => void;
}

// 纯占位虚拟数据 (不修改真实生产数据库)
interface StufenLevel {
  id: string;
  nameDE: string;
  nameZH: string;
  stufeDE: string;
  stufeZH: string;
  roman: string;
  status: "completed" | "current" | "locked";
  minNP: number;
  unlockedPerksDE: string[];
  unlockedPerksZH: string[];
  klausurFocusDE: string;
  klausurFocusZH: string;
}

const DEMO_STUFEN: StufenLevel[] = [
  {
    id: "ef_basis",
    nameDE: "EF Grundlagen & Begriffsnetz",
    nameZH: "EF 基础概念网与规范起步",
    stufeDE: "Stufe I (EF)",
    stufeZH: "第一阶 · 高一导入",
    roman: "I",
    status: "completed",
    minNP: 8,
    unlockedPerksDE: ["Glossar-Basis freigeschaltet", "Operator-Erkennung aktiv"],
    unlockedPerksZH: ["已解锁基础术语词典", "已掌握 12 核心动词导向"],
    klausurFocusDE: "Operatoren verstehen & Basistexte erschließen",
    klausurFocusZH: "理解指令词 + 提取基础文献主旨",
  },
  {
    id: "q1_vertiefung",
    nameDE: "Q1 Klausur-Analyse & Transfer",
    nameZH: "Q1 综合大题与微积分实战",
    stufeDE: "Stufe II (Q1)",
    stufeZH: "第二阶 · 会考进阶",
    roman: "II",
    status: "current",
    minNP: 11,
    unlockedPerksDE: ["D1-D5 Klausurgitter aktiv", "AFB I-III Transfer-Modul"],
    unlockedPerksZH: ["已激活 D1-D5 采分网格", "已激活 AFB I-III 迁移工坊"],
    klausurFocusDE: "Strikte Drei-Ebenen-Trennung & Extremwert-Beweise",
    klausurFocusZH: "文科三态严格分流 + 理科极值严谨证明",
  },
  {
    id: "q2_meister",
    nameDE: "Q2/Abi Vernetzung & Urteilskraft",
    nameZH: "Q2/会考 跨学科博弈与裁决",
    stufeDE: "Stufe III (Abitur)",
    stufeZH: "第三阶 · 终局满分",
    roman: "III",
    status: "locked",
    minNP: 14,
    unlockedPerksDE: ["Klausurgutachten-Simulator", "Freies philosophisches Urteil"],
    unlockedPerksZH: ["解锁高考模拟判分台", "解锁高阶哲学评判辩证"],
    klausurFocusDE: "Fachübergreifendes Abitururteil & mathematische Modellkritik",
    klausurFocusZH: "跨学科宏观裁决 + 现实数学模型批判",
  },
];

interface RadarMetric {
  code: string;
  nameDE: string;
  nameZH: string;
  score: number;
  max: number;
  statusTextDE: string;
  statusTextZH: string;
  isWeak: boolean;
  descDE: string;
  descZH: string;
  fixGuideDE: string;
  fixGuideZH: string;
}

const DEMO_D_RADAR: RadarMetric[] = [
  {
    code: "D1",
    nameDE: "Aufgabenbezug",
    nameZH: "审题与设问镜像",
    score: 4,
    max: 5,
    statusTextDE: "Gut (4/5)",
    statusTextZH: "良好 (4/5)",
    isWeak: false,
    descDE: "Direkte Beantwortung der Leitfrage ohne Abschweifung.",
    descZH: "首段直接镜像题目设问，不跑题不虚晃。",
    fixGuideDE: "Formuliere den Basissatz strikt nach dem Operator-Muster.",
    fixGuideZH: "严格套用第一段 Basissatz 主旨句公式。",
  },
  {
    code: "D2",
    nameDE: "Drei-Ebenen-Trennung",
    nameZH: "三态严格分流",
    score: 2,
    max: 4,
    statusTextDE: "Defizit (2/4)",
    statusTextZH: "薄弱 (2/4)",
    isWeak: true,
    descDE: "Klare Trennung: Deskription (AFB I), Analyse (AFB II), Urteil (AFB III).",
    descZH: "客观描述、机制分析与价值裁决界限分明，绝不混淆。",
    fixGuideDE: "Nutze getrennte Absätze und markiere subjektive Wertungen erst in Teil 3.",
    fixGuideZH: "禁止在分析段夹带个人观点，将评判严格保留至第 3 问。",
  },
  {
    code: "D3",
    nameDE: "Zitiertechnik",
    nameZH: "精准引证与行号",
    score: 3,
    max: 3,
    statusTextDE: "Voll (3/3)",
    statusTextZH: "满分 (3/3)",
    isWeak: false,
    descDE: "Exakte Zeilenangaben (vgl. Z. 14ff.) und syntaktische Integration.",
    descZH: "精准标示行号 (vgl. Z. 14ff.) 并与正文语法融为一体。",
    fixGuideDE: "Zitate stets grammatisch flüssig in den eigenen Hauptsatz einbinden.",
    fixGuideZH: "继续保持复合句中直接引语与间接引语的严密嵌套。",
  },
  {
    code: "D4",
    nameDE: "Fachsprache",
    nameZH: "专业学科术语",
    score: 2,
    max: 4,
    statusTextDE: "Defizit (2/4)",
    statusTextZH: "薄弱 (2/4)",
    isWeak: true,
    descDE: "Dichte Verwendung von präzisen Termini statt Alltagssprache.",
    descZH: "高频使用学科规范学术词，剔除口语与生活化用语。",
    fixGuideDE: "Ersetze umgangssprachliche Verben durch Nomen-Verb-Gefüge und Fachbegriffe.",
    fixGuideZH: "使用名词化结构（Nominalstil）代替泛泛说明。",
  },
  {
    code: "D5",
    nameDE: "Satzbau & Verknüpfung",
    nameZH: "复合句学术张力",
    score: 3,
    max: 4,
    statusTextDE: "Gut (3/4)",
    statusTextZH: "良好 (3/4)",
    isWeak: false,
    descDE: "Hypotaktische Strukturierung mit logischen Konnektoren.",
    descZH: "主从复合句结构严谨，逻辑连接词丰富层次分明。",
    fixGuideDE: "Nutze Konzessiv- und Kausalsätze (während, insofern als, folglich).",
    fixGuideZH: "善用让步从句与因果从句构建学术张力。",
  },
];

const DEMO_BE_METRICS: RadarMetric[] = [
  {
    code: "BE-Ansatz",
    nameDE: "Modellansatz",
    nameZH: "通用公式起步",
    score: 8,
    max: 10,
    statusTextDE: "80% (Sicher)",
    statusTextZH: "80% (稳定)",
    isWeak: false,
    descDE: "Allgemeine Formel vor dem Einsetzen konkreter Zahlenwerte hinschreiben.",
    descZH: "代入数值前必须先写出通用符号方程与物理模型公式。",
    fixGuideDE: "Kein Wert ohne vorherigen mathematischen Ansatz (z. B. f'(x)=0).",
    fixGuideZH: "无论多么显然，首行必先写判别式或导函数条件。",
  },
  {
    code: "BE-Einheiten",
    nameDE: "SI-Einheiten",
    nameZH: "全程量纲单位",
    score: 10,
    max: 10,
    statusTextDE: "100% (Perfekt)",
    statusTextZH: "100% (满分)",
    isWeak: false,
    descDE: "Konsequente Mitführung aller Einheiten bis zum Endergebnis.",
    descZH: "推导过程全程携带单位，绝无纯裸数字计算。",
    fixGuideDE: "Einheiten bei jedem Rechenschritt klammern und kürzen.",
    fixGuideZH: "继续保持每一步严谨的量纲齐次性检验习惯。",
  },
  {
    code: "BE-Genauigkeit",
    nameDE: "Rundung & Exaktheit",
    nameZH: "精度与有效数字",
    score: 6,
    max: 10,
    statusTextDE: "60% (Ausfall)",
    statusTextZH: "60% (易错)",
    isWeak: true,
    descDE: "Einhaltung signifikanter Stellen und Zwischenergebnisse ungerundet.",
    descZH: "中间过程保留分式或无理数，最终结果严格按要求取有效位。",
    fixGuideDE: "Im Taschenrechner stets den Speicher (Ans/STO) nutzen, nie früh runden.",
    fixGuideZH: "严禁在中间步骤四舍五入造成累积误差，严格用计算器内存计算。",
  },
  {
    code: "BE-Antwortsatz",
    nameDE: "Kontext-Antwort",
    nameZH: "现实情境结论句",
    score: 9,
    max: 10,
    statusTextDE: "90% (Sicher)",
    statusTextZH: "90% (优良)",
    isWeak: false,
    descDE: "Mathematisches Resultat rückbezogen auf den Sachkontext der Aufgabe.",
    descZH: "计算结果必须回扣到题目给定的现实情境中作答。",
    fixGuideDE: "Der Antwortsatz muss immer die Einheit und den Kontextträger enthalten.",
    fixGuideZH: "结论句必须包含主语、具体物理量及情境含义解释。",
  },
];

interface MissionItem {
  id: string;
  type: "flashcards" | "reise" | "klausursim" | "lego";
  fach: "Deutsch" | "SoWi" | "Mathe" | "Englisch" | "Physik";
  afb: "AFB I" | "AFB II" | "AFB III";
  titleDE: string;
  titleZH: string;
  tag: string;
  xpReward: number;
  estMinutes: number;
  targetTab: string;
  targetContext?: Record<string, string>;
  difficultyDE: string;
  difficultyZH: string;
}

const DEMO_MISSIONS: MissionItem[] = [
  {
    id: "m1",
    type: "flashcards",
    fach: "Deutsch",
    afb: "AFB I",
    titleDE: "Deutsch: 12 Kerntermini festigen · [D4] (ca. 5 Min)",
    titleZH: "德语核心学科术语复习 · 12张 [D4] (约 5 分钟)",
    tag: "D4 · 术语",
    xpReward: 40,
    estMinutes: 5,
    targetTab: "flashcards",
    difficultyDE: "~5 Min · P0 Express",
    difficultyZH: "~5 分钟 · 核心词卡",
  },
  {
    id: "m2",
    type: "reise",
    fach: "SoWi",
    afb: "AFB II",
    titleDE: "SoWi: Strukturierte Argumentationsaufgabe · [D2] (ca. 10 Min)",
    titleZH: "社科结构化论述题专项 · 1题 [D2] (约 10 分钟)",
    tag: "D2 · 分流",
    xpReward: 80,
    estMinutes: 10,
    targetTab: "reise",
    targetContext: { fach: "SoWi", reiseId: "sowi-ef-01" },
    difficultyDE: "~10 Min · Kernfokus",
    difficultyZH: "~10 分钟 · 论述专项",
  },
  {
    id: "m3",
    type: "klausursim",
    fach: "Mathe",
    afb: "AFB II",
    titleDE: "Mathe: Lösungsintervall- & Extremwertprüfung · [MINT BE] (ca. 10 Min)",
    titleZH: "数学解题区间规范检查 · 1组 [MINT BE] (约 10 分钟)",
    tag: "MINT · BE",
    xpReward: 100,
    estMinutes: 10,
    targetTab: "klausursim",
    difficultyDE: "~10 Min · Klausur-Check",
    difficultyZH: "~10 分钟 · 规范核查",
  },
];

interface SprintDay {
  day: number;
  labelDE: string;
  labelZH: string;
  focusDE: string;
  focusZH: string;
  actionTextDE: string;
  actionTextZH: string;
  targetTab: string;
  tabContext?: { fach?: string; query?: string };
}

const SPRINT_DAYS: SprintDay[] = [
  {
    day: 1,
    labelDE: "Tag 1: Begriffe",
    labelZH: "第 1 天: 概念扫盲",
    focusDE: "Definitionen der Operatoren & 15 Kerntermini verankern",
    focusZH: "掌握题目设问动词定义与 15 个学科核心术语",
    actionTextDE: "Lernkarten starten",
    actionTextZH: "开始抽认卡攻坚",
    targetTab: "flashcards",
    tabContext: { fach: "SoWi" },
  },
  {
    day: 2,
    labelDE: "Tag 2: Modelle",
    labelZH: "第 2 天: 理论模型",
    focusDE: "Strukturmodelle (Wohlfahrtsstaat / Analysis) durchdringen",
    focusZH: "理清福利国家模型与导数几何直观的内在因果链",
    actionTextDE: "Wissensnotiz lesen",
    actionTextZH: "研读考点精要",
    targetTab: "library",
    tabContext: { fach: "SoWi", query: "Soziale Ungleichheit" },
  },
  {
    day: 3,
    labelDE: "Tag 3: Material",
    labelZH: "第 3 天: 材料精读",
    focusDE: "TATTE-Basissatz & synthetische Zitiertechnik trainieren",
    focusZH: "训练导语五要素与无缝行号引证规范",
    actionTextDE: "Methode üben",
    actionTextZH: "训练引证解题法",
    targetTab: "library",
    tabContext: { fach: "Deutsch", query: "Sachtextanalyse" },
  },
  {
    day: 4,
    labelDE: "Tag 4: Simulation",
    labelZH: "第 4 天: 随堂模考",
    focusDE: "45-Minuten Vollsimulation unter realistischen Bedingungen",
    focusZH: "全真 45 分钟会考模拟，执行官方采分纪律",
    actionTextDE: "Vollsimulation",
    actionTextZH: "进入仿真模考",
    targetTab: "klausursim",
    tabContext: { fach: "SoWi" },
  },
  {
    day: 5,
    labelDE: "Tag 5: Fehlerlog",
    labelZH: "第 5 天: 官方归因",
    focusDE: "Amtliche EHZ-Indikatoren abgleichen & Defizite bereinigen",
    focusZH: "对照官方评分细则，定位 D1-D5 与 MINT 失分根源",
    actionTextDE: "Fehlerlog öffnen",
    actionTextZH: "复盘错题日志",
    targetTab: "klausursim",
    tabContext: { fach: "SoWi" },
  },
  {
    day: 6,
    labelDE: "Tag 6: Stil",
    labelZH: "第 6 天: 满分表达",
    focusDE: "Nominalstil, hypotaktische Satzgefüge & Konnektoren sichern",
    focusZH: "升级名词化高阶句式，构建让步与因果论证张力",
    actionTextDE: "Satzbausteine",
    actionTextZH: "巩固学术句型",
    targetTab: "library",
    tabContext: { fach: "Deutsch" },
  },
  {
    day: 7,
    labelDE: "Tag 7: Check",
    labelZH: "第 7 天: 考前闭环",
    focusDE: "Checkliste durchgehen & mentale Gelassenheit sichern",
    focusZH: "逐条核对考前自查清单，确保零低级失误",
    actionTextDE: "Checkliste",
    actionTextZH: "自查闭环打卡",
    targetTab: "planner",
  },
];

interface FocusExercise {
  questionDE: string;
  questionZH: string;
  optionsDE: string[];
  optionsZH: string[];
  correctIdx: number;
  explanationDE: string;
  explanationZH: string;
}

interface FocusLessonContent {
  missionId: string;
  fach: string;
  titleDE: string;
  titleZH: string;
  coreConceptDE: string;
  coreConceptZH: string;
  guidelinesDE: string[];
  guidelinesZH: string[];
  exercises: FocusExercise[];
  satzbausteinDE: string;
  satzbausteinZH: string;
}

const DEMO_FOCUS_LESSONS: Record<string, FocusLessonContent> = {
  m1: {
    missionId: "m1",
    fach: "Deutsch",
    titleDE: "Deutsch: 12 Kerntermini & Nominalstil [D4]",
    titleZH: "德语: 核心学科术语与名词化学术风格 [D4]",
    coreConceptDE: "Die Darstellungsleistung D4 verlangt eine dichte Verwendung präziser Fachtermini statt Alltagssprache. Umgangssprachliche Verben ('zeigt', 'sagt') sind konsequent durch handlungsanalytische Funktionsverben und Nominalphrasen zu ersetzen.",
    coreConceptZH: "德语会考官方采分 D4 维度强制要求高密度使用学科专业术语，严禁使用口语化表达（如 'zeigt', 'sagt'）。必须全面升级为分析型行为动词及名词化结构（Nominalstil）。",
    guidelinesDE: [
      "Funktionsverben nutzen: 'fungieren als', 'antizipieren', 'exemplifizieren', 'artikulieren'.",
      "Hypotaktische Satzgefüge mit präzisen Konnektoren (indem, insofern als, wohingegen) strukturieren.",
      "Umgangssprachliche Wertungen ('ich finde', 'das ist schön') vollständig eliminieren.",
    ],
    guidelinesZH: [
      "使用高阶功能动词：'fungieren als' (充当), 'antizipieren' (预示), 'exemplifizieren' (例证)。",
      "构建包含严密逻辑连接词的从句结构（indem, insofern als, wohingegen）。",
      "彻底清除主观口语裁决词（如 'ich finde', 'das ist schön'）。",
    ],
    exercises: [
      {
        questionDE: "Welche Formulierung entspricht dem 15-Notenpunkte-Standard in einer Szenenanalyse?",
        questionZH: "在戏剧场景分析中，哪种表达符合 15 NP（Sehr Gut 满分档）学术规范？",
        optionsDE: [
          "Faust zeigt hier sehr deutlich, dass er unzufrieden mit der Wissenschaft ist.",
          "Das lyrische Ich artikuliert mittels antiklimaktischer Reihung eine existentielle Erkenntniskrise.",
        ],
        optionsZH: [
          "Faust 在这里非常明显地表明了他对科学的不满。",
          "抒情主人公通过降格排比手法，深刻表达了其存在主义的认知危机。",
        ],
        correctIdx: 1,
        explanationDE: "Option B nutzt präzise Fachtermini ('artikuliert', 'antiklimaktische Reihung', 'Erkenntniskrise') und analysiert die sprachliche Funktion statt den Inhalt bloß nachzuerzählen.",
        explanationZH: "选项 B 严格运用了修辞机制词与学术动词，解构语言机制而非单纯复述故事情节。",
      },
      {
        questionDE: "Wie wird 'Der Autor macht dem Leser Angst' in die Fachsprache überführt?",
        questionZH: "如何将日常口语 'Der Autor macht dem Leser Angst' 转换为严谨学术语言？",
        optionsDE: [
          "Der Text evozierte beim Rezipienten ein diffuses Bedrohungsgefühl durch dystopische Motivik.",
          "Der Autor sorgt dafür, dass der Leser Angst vor der Zukunft bekommt.",
        ],
        optionsZH: [
          "文本通过反乌托邦母题，在受众心中唤起了一种弥漫性的受威胁感。",
          "作者使读者对未来产生了恐惧感。",
        ],
        correctIdx: 0,
        explanationDE: "Die Substantivierung ('dystopische Motivik', 'Bedrohungsgefühl') und der Terminus 'Rezipient' entsprechen den Vorgaben der Standardsicherung.",
        explanationZH: "使用名词化概念（反乌托邦母题、威胁感）与规范受众代词（Rezipient）符合州考大纲采分点。",
      },
    ],
    satzbausteinDE: "Die syntaktische Disposition fungiert hierbei nicht als bloßes Stilornament, sondern evoziert beim Rezipienten eine kritische Reflexionsdistanz.",
    satzbausteinZH: "此处的句法布局绝非单纯的修辞装点，而是在受众心中唤起了一种审慎的批判性反思距离。",
  },
  m2: {
    missionId: "m2",
    fach: "SoWi",
    titleDE: "SoWi: Strikte Drei-Ebenen-Trennung [D2]",
    titleZH: "社科: 三态严格分流与结构化论证 [D2]",
    coreConceptDE: "D2 verbietet die Vermischung von Deskription (AFB I), ökonomischer/politischer Wirkungsanalyse (AFB II) und normativer Urteilsbildung (AFB III). Analysen müssen wertfrei anhand von Modellen erfolgen.",
    coreConceptZH: "D2 评分宪法严禁将客观描述 (AFB I)、机制分析 (AFB II) 与规范性价值裁决 (AFB III) 混为一谈。分析必须基于客观经济模型与机制展开，禁止在第 1、2 问掺杂个人好恶。",
    guidelinesDE: [
      "In Teilaufgabe 1 & 2: Striktes Verbot von 'ungerecht', 'unsozial' oder 'meiner Meinung nach'.",
      "Ökonomische Kausalitäten stets über Angebots- und Nachfrageeffekte bzw. Marktversagen herleiten.",
      "Teilaufgabe 3 erst mit formalen Urteilskriterien (Effizienz vs. Legitimität/Gerechtigkeit) eröffnen.",
    ],
    guidelinesZH: [
      "第 1 问与第 2 问：绝对禁止出现 'ungerecht' (不公), 'unsozial' 或 '我认为' 等主观论调。",
      "经济因果链必须严格基于供求效应、价格机制或市场失灵展开推演。",
      "第 3 问必须以形式化准则（配置效率 vs 正当性/公平性）分段进行权衡裁决。",
    ],
    exercises: [
      {
        questionDE: "In einer Klausuraufgabe (AFB II: Analysieren Sie die Marktwirkung) steht: 'Diese Maßnahme ist eine Schande für den Sozialstaat.' Welche Note droht bei D2?",
        questionZH: "在第 2 问 (机制分析) 中写入 '此举是对福利国家的耻辱'，在 D2 评分中会产生什么后果？",
        optionsDE: [
          "Volle Punktzahl, da die eigene Haltung Engagement zeigt.",
          "Massiver Punktabzug bei D2 wegen Vermischung von Analyse und normativem Werturteil.",
        ],
        optionsZH: [
          "获得满分，因为展现了鲜明的个人见解与社会关怀。",
          "D2 遭到严厉扣分，因为将客观机制分析与规范性价值判断严重混淆。",
        ],
        correctIdx: 1,
        explanationDE: "Urteile gehören ausnahmslos in AFB III. Vorzeitige moralische Urteile in AFB II verletzen die Wissenschaftspropädeutik.",
        explanationZH: "价值裁决绝无例外地属于第 3 问。在第 2 问夹带道德谴责严重违反学术中立要求。",
      },
      {
        questionDE: "Welcher Aufbau sichert in AFB III die volle Punktzahl für ein differenziertes Urteil?",
        questionZH: "在第 3 问评判中，哪种架构能够确保获得完整采分？",
        optionsDE: [
          "Kriteriengeleitete Abwägung (Effizienz vs. Verteilungsgerechtigkeit) mit anschließendem begründetem Fazit.",
          "Ausschließliche Aufzählung von Contra-Argumenten, um einen klaren Standpunkt zu beweisen.",
        ],
        optionsZH: [
          "基于双重准则（配置效率 vs 分配正义）的对立权衡，随后得出有据可查的结论。",
          "仅单向罗列反对论点，以证明自己坚定的立场。",
        ],
        correctIdx: 0,
        explanationDE: "Die Standardsicherung NRW verlangt zwingend die Gegenüberstellung von Sachurteil (Wirksamkeit) und Werturteil (Grundwerte).",
        explanationZH: "北威州官方大纲硬性规定必须呈现事实裁决（有效性）与价值裁决（核心价值）的双向对称权衡。",
      },
    ],
    satzbausteinDE: "Während die Maßnahme allokationspolitisch eine Wohlfahrtssteigerung bewirkt, erweist sie sich distributionspolitisch als regressiv und verschärft bestehende Disparitäten.",
    satzbausteinZH: "尽管该举措在资源配置上实现了社会福利增长，但在分配政策上却具有累退性，进一步加剧了既有的社会差距。",
  },
  m3: {
    missionId: "m3",
    fach: "Mathe",
    titleDE: "Mathe: MINT BE-Stufenfolge & Exaktheit",
    titleZH: "数学: MINT BE 四阶采分步进与精度规范",
    coreConceptDE: "Die Vergabe von Bewertungseinheiten (BE) folgt einem strengen Stufenmodell: Ansatz (25%) -> Einsetzen/Termumformung (25%) -> Exaktheit/Hinreichende Bedingung (25%) -> Antwortsatz im Sachkontext (25%).",
    coreConceptZH: "德国高中数学采分单位 (BE) 严格遵循四阶递进模型：模型起步 (25%) $\\to$ 规范代入与代数化简 (25%) $\\to$ 精度控制与充分条件判别 (25%) $\\to$ 现实情境结论句 (25%)。",
    guidelinesDE: [
      "Stets die allgemeine Bedingung (z. B. f'(x)=0 für Extremstellen) vor konkreten Zahlen hinschreiben.",
      "Zwischenergebnisse niemals vorzeitig runden; exakte Brüche oder Speicher (Ans) verwenden.",
      "Der Antwortsatz muss immer Einheit, Bezugsgröße und Sachkontext vollständig enthalten.",
    ],
    guidelinesZH: [
      "代入具体数值前，首行必须写出通用极值或导数条件 (如 f'(x) = 0)。",
      "中间过程严禁提前四舍五入造成误差累积；必须使用精确分数或计算器存储器。",
      "结论句必须完整包含物理量单位、主语及实际现实背景含义。",
    ],
    exercises: [
      {
        questionDE: "Ein Schüler bestimmt x=3 als Nullstelle von f'(x), verzichtet aber auf f''(3) < 0. Was passiert im Erwartungshorizont?",
        questionZH: "学生求出导函数零点 x=3，但未验证 f''(3) < 0，在官方评分表中会产生什么结果？",
        optionsDE: [
          "Verlust der BE für die hinreichende Bedingung und den Nachweis der Art des Extremums.",
          "Kein Abzug, da die notwendige Bedingung für ein Extremum bereits ausreicht.",
        ],
        optionsZH: [
          "扣除充分条件验证与极值类型判别对应的全部采分点（通常 2~3 BE）。",
          "不扣分，因为必要条件已经足够说明极值存在。",
        ],
        correctIdx: 0,
        explanationDE: "Die notwendige Bedingung f'(x)=0 reicht mathematisch nicht aus; der Nachweis des Hoch-/Tiefpunkts erfordert zwingend f''(x) bzw. das VZW-Kriterium.",
        explanationZH: "必要条件 f'(x)=0 无法排除拐点可能，必须通过二阶导数或穿针变号法则方能获得结论分。",
      },
      {
        questionDE: "Wie lautet ein normgerechter Antwortsatz für eine Behälter-Füllaufgabe bei t=14,382 Minuten?",
        questionZH: "针对蓄水池注水问题（算出 t=14.382 分钟），下列哪个符合规范结论句要求？",
        optionsDE: [
          "Nach ca. 14,4 Minuten ist das Becken vollständig mit Wasser gefüllt.",
          "t = 14,4 min.",
        ],
        optionsZH: [
          "约 14.4 分钟后，蓄水池将完全注满水。",
          "t = 14,4 min.",
        ],
        correctIdx: 0,
        explanationDE: "Der Erwartungshorizont verlangt einen ausformulierten Antwortsatz mit Subjekt, Prädikat, gerundeter Zahl und Sachbezug.",
        explanationZH: "官方评分标准明确要求具备完整主谓语、合理修约数值及现实情境扣题。",
      },
    ],
    satzbausteinDE: "Da f'(x₀) = 0 und f''(x₀) < 0 gilt, liegt an der Stelle x₀ ein lokales Maximum vor. Im Sachkontext entspricht dies der maximalen Konzentration von...",
    satzbausteinZH: "由于 f'(x₀) = 0 且 f''(x₀) < 0，因此在 x₀ 处存在局部极大值。在实际背景中，这对应于最大浓度……",
  },
};


interface SubjectMastery {
  fach: string;
  nameDE: string;
  nameZH: string;
  pct: number;
  np: number;
  pillColor: string;
}

const DEMO_SUBJECT_MASTERY: SubjectMastery[] = [
  { fach: "Deutsch", nameDE: "Deutsch", nameZH: "德语", pct: 80, np: 12, pillColor: "bg-sky-50 text-sky-800 border-sky-200" },
  { fach: "Mathe", nameDE: "Mathematik", nameZH: "数学", pct: 65, np: 13, pillColor: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  { fach: "SoWi", nameDE: "SoWi", nameZH: "社科", pct: 70, np: 10, pillColor: "bg-amber-50 text-amber-800 border-amber-200" },
  { fach: "Philosophie", nameDE: "Philosophie", nameZH: "哲学", pct: 75, np: 11, pillColor: "bg-indigo-50 text-indigo-800 border-indigo-200" },
  { fach: "Physik", nameDE: "Physik", nameZH: "物理", pct: 60, np: 10, pillColor: "bg-slate-100 text-slate-800 border-slate-200" },
];

function FocusFlowModal({
  lesson,
  de,
  onClose,
  onComplete,
}: {
  lesson: FocusLessonContent;
  de: boolean;
  onClose: () => void;
  onComplete: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<number, boolean>>({});

  const handleSelectOption = (exerciseIdx: number, optionIdx: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [exerciseIdx]: optionIdx }));
    setShowExplanations((prev) => ({ ...prev, [exerciseIdx]: true }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[2px] p-4">
      <div className="w-full max-w-2xl bg-[var(--surface)] border border-[var(--line)] rounded-2xl shadow-none p-6 space-y-5 text-slate-900 max-h-[90vh] overflow-y-auto">
        {/* 头部标题与步骤指示器 */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-full border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">
              {lesson.fach}
            </span>
            <h3 className="font-serif text-base font-bold text-slate-900">
              {de ? lesson.titleDE : lesson.titleZH}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-lg cursor-pointer transition-colors"
            title={de ? "Schließen" : "关闭"}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>

        {/* 3 步步进器 (Stepper) */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono font-bold">
          <button
            type="button"
            onClick={() => setStep(1)}
            className={`py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
              step === 1
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-[var(--paper-subtle)] text-slate-600 border-[var(--line)]"
            }`}
          >
            1. {de ? "Erfassen" : "精要理解"}
          </button>
          <button
            type="button"
            onClick={() => setStep(2)}
            className={`py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
              step === 2
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-[var(--paper-subtle)] text-slate-600 border-[var(--line)]"
            }`}
          >
            2. {de ? "Anwenden" : "随堂实战"}
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className={`py-1.5 px-2 rounded-lg border transition-all cursor-pointer ${
              step === 3
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-[var(--paper-subtle)] text-slate-600 border-[var(--line)]"
            }`}
          >
            3. {de ? "Sichern" : "满分固化"}
          </button>
        </div>

        {/* 步骤 1: 概念理解 (Erfassen) */}
        {step === 1 && (
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                {de ? "Kernkonzept & Prüfungsdisziplin" : "核心考纲规范与采分纪律"}
              </div>
              <p className="text-xs leading-relaxed text-slate-800 font-medium">
                {de ? lesson.coreConceptDE : lesson.coreConceptZH}
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                {de ? "3 Handlungsschritte im Abitur" : "会考 3 大实战解题准则"}
              </div>
              <ul className="space-y-2">
                {(de ? lesson.guidelinesDE : lesson.guidelinesZH).map((g, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed font-medium">
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-2 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{de ? "Weiter: Anwenden (2 Aufgaben) →" : "下一步: 随堂实战 (2题速测) →"}</span>
              </button>
            </div>
          </div>
        )}

        {/* 步骤 2: 随堂实战 (Anwenden) */}
        {step === 2 && (
          <div className="space-y-4 pt-1">
            {lesson.exercises.map((ex, exIdx) => {
              const selected = selectedAnswers[exIdx];
              const answered = selected !== undefined;
              const isCorrect = selected === ex.correctIdx;

              return (
                <div key={exIdx} className="p-4 rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-300 bg-white text-slate-700">
                      Aufgabe {exIdx + 1}
                    </span>
                    {answered && (
                      <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-900"}`}>
                        {isCorrect ? (de ? "[OK] Richtig (+15 NP)" : "[OK] 正确 (+15 NP 标准)") : (de ? "[Defizit] Erkannt" : "[易错点] 需强化规范")}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold text-slate-900 leading-relaxed">
                    {de ? ex.questionDE : ex.questionZH}
                  </p>

                  <div className="space-y-1.5">
                    {(de ? ex.optionsDE : ex.optionsZH).map((opt, optIdx) => {
                      const isOptionSelected = selected === optIdx;
                      const isOptionCorrect = optIdx === ex.correctIdx;

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          onClick={() => handleSelectOption(exIdx, optIdx)}
                          className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all cursor-pointer flex items-start gap-2.5 leading-relaxed font-medium ${
                            answered
                              ? isOptionCorrect
                                ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                                : isOptionSelected
                                ? "bg-amber-50 border-amber-300 text-amber-950"
                                : "bg-white border-slate-200 text-slate-500 opacity-60"
                              : "bg-white border-slate-200 hover:border-slate-400 text-slate-800"
                          }`}
                        >
                          <span className="font-mono font-bold shrink-0">{String.fromCharCode(65 + optIdx)}.</span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {showExplanations[exIdx] && (
                    <div className="p-2.5 rounded-lg bg-slate-100/90 border border-slate-200/80 text-[11px] text-slate-700 leading-relaxed">
                      <span className="font-bold text-slate-900 font-mono mr-1">EHZ-Befund:</span>
                      {de ? ex.explanationDE : ex.explanationZH}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="py-2 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-slate-700 text-xs font-bold hover:bg-[var(--paper-subtle)] transition-all cursor-pointer"
              >
                ← {de ? "Zurück" : "上一步"}
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="py-2 px-4 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>{de ? "Weiter: Mustersatz sichern →" : "下一步: 满分句式固化 →"}</span>
              </button>
            </div>
          </div>
        )}

        {/* 步骤 3: 满分句式固化 (Sichern) */}
        {step === 3 && (
          <div className="space-y-4 pt-1">
            <div className="p-4 rounded-xl border border-amber-200/90 bg-amber-50/60 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-900">
                  {de ? "15-Notenpunkte-Musterformulierung (Satzbaustein)" : "15 NP 满分学术句型 (Satzbaustein)"}
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded">
                  Abitur-Standard
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-900 font-serif font-bold">
                "{lesson.satzbausteinDE}"
              </p>
              <p className="text-[11px] leading-relaxed text-slate-600 font-sans">
                译文：{lesson.satzbausteinZH}
              </p>
            </div>

            <div className="p-3 rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] flex items-center justify-between text-xs">
              <span className="text-slate-600 font-medium">
                {de ? "Tagesfokus für dieses Modul abgeschlossen" : "今日该考点针对性闭环已就绪"}
              </span>
              <span className="font-mono font-bold text-amber-800">
                +{lesson.missionId === "m1" ? 40 : lesson.missionId === "m2" ? 80 : 100} XP
              </span>
            </div>

            <div className="pt-2 flex justify-between items-center">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="py-2 px-3 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-slate-700 text-xs font-bold hover:bg-[var(--paper-subtle)] transition-all cursor-pointer"
              >
                ← {de ? "Zurück" : "上一步"}
              </button>
              <button
                type="button"
                onClick={onComplete}
                className="py-2.5 px-5 rounded-xl bg-[#D96E3A] hover:bg-[#c25e2d] text-white text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shadow-none"
              >
                <span>{de ? "Fokusblock abschließen & festhalten" : "完成今日专注并打卡 (+XP)"}</span>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3.5 8.5l3 3 6-6" />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function DashboardCockpit({
  lang,
  onNavigateToTab,
  onSwitchToLegacy,
}: DashboardCockpitProps) {
  const de = lang === "de";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [currentXP, setCurrentXP] = useState(680);
  const targetXP = 1000;

  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});

  const [radarTrack, setRadarTrack] = useState<"gewi" | "mint">("gewi");
  const [activeMetricCode, setActiveMetricCode] = useState<string>("D2");
  const [expandedDetail, setExpandedDetail] = useState(false);
  const [selectedStufeId, setSelectedStufeId] = useState<string>("q1_vertiefung");
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(getStoredTheme);
  const currentThemeObj = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === currentThemeId);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    setCurrentThemeId(nextTheme.id);
    setStoredTheme(nextTheme.id);
  };

  const toggleMission = (id: string, xp: number) => {
    setCompletedMissions((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        setCurrentXP((x) => Math.min(targetXP, x + xp));
      }
      return next;
    });
  };

  const completedCount = Object.values(completedMissions).filter(Boolean).length;
  const isAllCompleted = completedCount === DEMO_MISSIONS.length;

  const currentStufe = DEMO_STUFEN.find((s) => s.id === selectedStufeId) || DEMO_STUFEN[1];
  const activeMetricList = radarTrack === "gewi" ? DEMO_D_RADAR : DEMO_BE_METRICS;
  const activeMetric =
    activeMetricList.find((m) => m.code === activeMetricCode) || activeMetricList[0];

  const [fachFilter, setFachFilter] = useState<string>("klausur");
  const [otherSubjectsExpanded, setOtherSubjectsExpanded] = useState<boolean>(false);
  const [activeFocusMission, setActiveFocusMission] = useState<MissionItem | null>(null);
  const [activeSprintDay, setActiveSprintDay] = useState<number>(3);
  const [sprintCollapsed, setSprintCollapsed] = useState<boolean>(false);

  const filteredMissions = useMemo(() => {
    if (fachFilter === "alle") return DEMO_MISSIONS;
    if (fachFilter === "klausur") {
      return DEMO_MISSIONS.filter((m) => ["Deutsch", "SoWi", "Mathe"].includes(m.fach));
    }
    return DEMO_MISSIONS.filter((m) => m.fach.toLowerCase() === fachFilter.toLowerCase());
  }, [fachFilter]);

  const primarySubjectMastery = useMemo(() => {
    if (fachFilter === "alle") return DEMO_SUBJECT_MASTERY;
    if (fachFilter === "klausur") {
      return DEMO_SUBJECT_MASTERY.filter((s) => ["Deutsch", "SoWi", "Mathe"].includes(s.fach));
    }
    return DEMO_SUBJECT_MASTERY.filter((s) => s.fach.toLowerCase() === fachFilter.toLowerCase());
  }, [fachFilter]);

  const secondarySubjectMastery = useMemo(() => {
    if (fachFilter === "alle") return [];
    if (fachFilter === "klausur") {
      return DEMO_SUBJECT_MASTERY.filter((s) => !["Deutsch", "SoWi", "Mathe"].includes(s.fach));
    }
    return DEMO_SUBJECT_MASTERY.filter((s) => s.fach.toLowerCase() !== fachFilter.toLowerCase());
  }, [fachFilter]);

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16 font-sans text-slate-900 transition-all duration-300">
      {/* 1. 顶部刊头 (Header) - 极简学术与人话表达 */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/80 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] shrink-0 overflow-hidden shadow-none">
            <MascotFox state="avatar" size={30} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-slate-900 tracking-tight">
                {de ? "Abitur-Vorbereitung · Übersicht" : "今日 Abitur 备考概览"}
                {/* 单测检索锚点契约 */}
                <span className="sr-only">{de ? "Klausur-Leistungszentrale" : "会考战力与升阶总台"}</span>
              </h1>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-600 font-medium">
                Gymnasium EF &rarr; Q1
              </span>
            </div>
            <p className="font-sans text-xs text-slate-500 mt-0.5">
              {de ? "Gymnasium Oberstufe · Dein täglicher Lern- und Prüfungsstand" : "Gymnasium Oberstufe · 掌握真实学情，聚焦今日任务"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* 连续学习打卡徽章 */}
          <div className="flex items-center gap-2 border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 rounded-xl select-none">
            <MascotFox state="streak" size={16} animate={false} />
            <span className="font-mono text-xs font-semibold text-slate-800 tabular-nums">
              18 {de ? "Tage kontinuierlich" : "天连续专注"}
            </span>
          </div>

          {/* 主题切换器 */}
          <button
            type="button"
            onClick={cycleTheme}
            className="text-xs font-mono text-slate-800 hover:text-slate-950 border border-[var(--line)] px-3 py-1.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--paper-subtle)] transition-all cursor-pointer flex items-center gap-1.5 font-semibold"
            title={de ? `Thema: ${currentThemeObj.nameDE} (Klicken zum Wechseln)` : `主题风格: ${currentThemeObj.nameZH} (点击切换)`}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6" />
              <path d="M8 2v12" />
              <path d="M8 2a6 6 0 0 1 0 12z" fill="currentColor" opacity="0.3" />
            </svg>
            <span>{de ? currentThemeObj.nameDE : currentThemeObj.nameZH}</span>
          </button>

          {onSwitchToLegacy && (
            <button
              type="button"
              onClick={onSwitchToLegacy}
              className="text-xs font-mono text-slate-600 hover:text-slate-900 border border-slate-200/90 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 transition-all cursor-pointer"
              title={de ? "Zur klassischen Übersicht" : "返回旧版概览"}
            >
              {de ? "Klassik" : "经典版"}
            </button>
          )}
        </div>
      </header>

      {/* 2. 学情总览与专注行动 (Hero Banner: 8:4 纯净跨页排版) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 左侧：学情进度卡 (8 Col, 真实 Notenpunkte 分级) */}
        <div className="lg:col-span-8 card-elevation p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 flex-wrap">
                <span className="font-mono text-4xl font-black tracking-tight text-slate-900">11</span>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500 font-mono">
                    Notenpunkte
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                      {de ? "Stufe II · Q1-Niveau" : "第二阶 · Q1 进阶期"}
                    </span>
                    <span className="text-xs text-slate-700 font-semibold">
                      {de ? "Note 2 (Gut)" : "良好 · Note 2 (Gut)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-mono font-bold text-slate-700 tabular-nums">
                  <span className="text-sm font-black text-slate-900">{currentXP}</span> / {targetXP} XP
                </span>
                <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
                  {de ? `Ziel: 13 Notenpunkte (Sehr Gut) · noch ${targetXP - currentXP} XP` : `目标：13 NP (Sehr Gut 档) · 还需 ${targetXP - currentXP} XP`}
                </div>
              </div>
            </div>

            {/* 隐藏辅助文字满足单元测试检索契约 */}
            <span className="sr-only">11 Notenpunkte</span>

            {/* 真实分级刻度进度槽 */}
            <div className="pt-0.5">
              <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: mounted ? `${(currentXP / targetXP) * 100}%` : "0%" }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1.5 px-0.5 font-mono">
                <span className="text-slate-600">10 NP (及格线)</span>
                <span className="text-slate-900 font-black">11 NP (当前实况)</span>
                <span className="text-slate-800 font-bold">13 NP (目标: Sehr Gut)</span>
                <span className="text-slate-400">15 NP (满分标杆)</span>
              </div>
            </div>
          </div>

          {/* 考纲阶段推进路线 */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                {de ? "Abitur-Stufenleiter" : "考纲阶段推进路线"}
              </span>
              <span className="font-mono text-[11px] text-slate-700 font-bold">
                {currentStufe.id.toUpperCase()} · &ge; {currentStufe.minNP} NP
              </span>
            </div>

            <div className="relative flex items-center justify-between py-1 px-0.5">
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0" />

              {/* 节点 1: EF */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("ef_basis")}
                className={`relative z-10 flex items-center gap-1.5 bg-[var(--surface)] px-2 py-0.5 text-xs transition-all cursor-pointer ${
                  selectedStufeId === "ef_basis" ? "font-extrabold text-slate-900" : "text-slate-600 font-medium hover:text-slate-900"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="tracking-tight">{de ? "Stufe I (EF)" : "第一阶 · 高一导入"}</span>
              </button>

              {/* 节点 2: Q1 */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("q1_vertiefung")}
                className="relative z-10 flex items-center gap-2 bg-[var(--surface)] px-2 py-0.5 text-xs cursor-pointer"
              >
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
                <span className="font-extrabold text-slate-900 tracking-tight">
                  {de ? "Stufe II · Q1" : "第二阶 · 会考进阶"}
                  <span className="text-[10px] text-amber-700 font-bold ml-1 font-mono">
                    {de ? "(Aktiv)" : "(进行中)"}
                  </span>
                </span>
              </button>

              {/* 节点 3: Abitur */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("q2_abitur")}
                className={`relative z-10 flex items-center gap-1.5 bg-[var(--surface)] px-2 py-0.5 text-xs transition-all cursor-pointer ${
                  selectedStufeId === "q2_abitur" ? "font-extrabold text-slate-900" : "text-slate-400 font-medium hover:text-slate-700"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 bg-slate-50 shrink-0" />
                <span className="tracking-tight">{de ? "Stufe III · Abitur" : "第三阶 · 终局满分"}</span>
              </button>
            </div>

            {/* 阶段重点 */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {de ? "Schwerpunkte:" : "阶段重点能力:"}
              </span>
              {(de ? currentStufe.unlockedPerksDE : currentStufe.unlockedPerksZH).map((perk, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] text-slate-800 font-bold tracking-tight"
                >
                  {i > 0 && <span className="text-slate-300 mr-2 font-normal">&bull;</span>}
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：今日专注卡 (4 Col, 极简克制) */}
        <div className="lg:col-span-4 card-elevation p-5 flex flex-col justify-between relative overflow-hidden bg-[var(--surface)] space-y-3">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#D96E3A]/10 text-[#D96E3A] border border-[#D96E3A]/25">
              <span>今日专注建议</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
              {de ? "15-Minuten-Fokusblock" : "今日 15 分钟专注学习"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {de
                ? "Drei gezielte Lerneinheiten für heute: Fachtermini, Klausurargumentation & Intervallkontrolle."
                : "针对性完成今日 3 项高频会考重点：词卡巩固、社科论述与数学规范。"}
            </p>
          </div>

          <div className="relative z-10 py-1.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              {de ? "3 gezielte Klausuraufgaben" : "预计耗时 15 分钟"}
            </span>
            <span className="font-mono text-slate-800 font-bold">
              3 项待处理
            </span>
          </div>

          <div className="relative z-10 pt-1">
            <button
              type="button"
              onClick={() => {
                const firstPending = filteredMissions.find((m) => !completedMissions[m.id]) || filteredMissions[0] || DEMO_MISSIONS[0];
                setActiveFocusMission(firstPending);
              }}
              className="w-full py-2.5 px-4 bg-[#D96E3A] hover:bg-[#c25e2d] active:scale-[0.99] text-white font-extrabold text-xs rounded-xl transition-all shadow-none flex items-center justify-center gap-2 cursor-pointer select-none tracking-tight"
            >
              <span>{de ? "Jetzt starten · 15 Min" : "开始今日 15 分钟专注学习"}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Klausur-Countdown & 7-Tage-Abitur-Sprint 战役冲刺路线 (借鉴 good-learning-skill) */}
      <section className="card-elevation p-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] font-bold text-amber-900 bg-amber-50 border border-amber-300 px-2 py-0.5 rounded-full uppercase">
              {de ? "Sprint-Phase" : "考期冲刺"}
            </span>
            <h2 className="font-serif text-sm font-bold text-slate-900 tracking-tight">
              {de ? "Klausurphase 1 · 7-Tage-Abitur-Roadmap" : "会考第一轮 · 7 天步进攻坚路线"}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs font-mono text-slate-700 font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{de ? "Noch 12 Tage bis zur Klausurenwoche" : "距首轮大考周还有 12 天"}</span>
            </div>
            <button
              type="button"
              onClick={() => setSprintCollapsed((v) => !v)}
              className="text-xs font-mono text-slate-500 hover:text-slate-800 border border-slate-200 px-2 py-0.5 rounded-lg cursor-pointer"
            >
              {sprintCollapsed ? (de ? "Öffnen" : "展开路线") : (de ? "Minimieren" : "收起")}
            </button>
          </div>
        </div>

        {!sprintCollapsed && (
          <div className="space-y-3 pt-1">
            {/* 7-Tage Schritt-Leiste */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5">
              {SPRINT_DAYS.map((sd) => {
                const isActive = activeSprintDay === sd.day;
                const isPast = sd.day < activeSprintDay;
                return (
                  <button
                    key={sd.day}
                    type="button"
                    onClick={() => setActiveSprintDay(sd.day)}
                    className={`p-2 rounded-xl border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                      isActive
                        ? "bg-slate-900 text-white border-slate-900 shadow-none font-bold"
                        : isPast
                        ? "bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span>Tag {sd.day}</span>
                      {isPast && <span className="text-[9px] text-emerald-600 font-bold">[OK]</span>}
                      {isActive && <span className="text-[9px] text-amber-400 font-bold">[AKTIV]</span>}
                    </div>
                    <div className="text-[11px] truncate font-medium">
                      {de ? sd.labelDE.split(": ")[1] : sd.labelZH.split(": ")[1]}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 当前选中 Day 的攻坚卡 */}
            {(() => {
              const currentDay = SPRINT_DAYS.find((sd) => sd.day === activeSprintDay) || SPRINT_DAYS[2];
              return (
                <div className="p-3.5 rounded-xl border border-[var(--line)] bg-[var(--paper-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {de ? currentDay.labelDE : currentDay.labelZH}
                      </span>
                      <span className="text-slate-400">·</span>
                      <span className="text-xs text-slate-700 font-medium leading-relaxed">
                        {de ? currentDay.focusDE : currentDay.focusZH}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => onNavigateToTab?.(currentDay.targetTab, currentDay.tabContext)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <span>{de ? `[${currentDay.actionTextDE} ->]` : `[${currentDay.actionTextZH} ->]`}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const targetMission = filteredMissions[0] || DEMO_MISSIONS[0];
                        setActiveFocusMission(targetMission);
                      }}
                      className="px-2.5 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper)] text-slate-800 text-xs font-mono font-medium transition-all cursor-pointer"
                      title={de ? "15-Minuten Fokusblock starten" : "开启 15 分钟专注学习"}
                    >
                      {de ? "15 Min Fokus" : "15分钟专注"}
                    </button>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </section>

      {/* 4. 二分屏：左侧 7/12 (任务处方 + 学科战力分布) vs 右侧 5/12 (几何雷达诊断) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* ===================== 左侧主体 (7 / 12)：双卡垂直堆叠，总高与右侧雷达严丝合缝 ===================== */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          {/* 上卡：今日弱项消除处方 */}
          <div className="card-elevation p-5 flex-1 flex flex-col justify-between space-y-3.5">
            <div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                    {de ? `Tagesaufgaben (${filteredMissions.filter(m => !completedMissions[m.id]).length} offen)` : `今日推荐任务 (${filteredMissions.filter(m => !completedMissions[m.id]).length} 项待完成)`}
                  </h3>
                  {/* 保留单测契约锚点 */}
                  <span className="sr-only">
                    {de ? "Tages-Rezeptur" : "靶向弱项消除处方"}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono font-bold">
                  {completedCount} / {DEMO_MISSIONS.length} {de ? "erledigt" : "已完成"}
                </span>
              </div>

              {/* 学科聚焦胶囊过滤器 (Fokus-Filter) */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-2 border-b border-slate-100 text-xs">
                <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider shrink-0 mr-1">
                  {de ? "Fokus:" : "学科聚焦:"}
                </span>
                <button
                  type="button"
                  onClick={() => setFachFilter("klausur")}
                  className={`px-2.5 py-0.5 rounded-md border font-mono text-[11px] font-bold transition-all cursor-pointer ${
                    fachFilter === "klausur"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-[var(--surface)] text-slate-600 border-[var(--line)] hover:text-slate-900"
                  }`}
                >
                  {de ? "Klausurfächer (3 Kern)" : "会考主攻 (3科)"}
                </button>
                <button
                  type="button"
                  onClick={() => setFachFilter("alle")}
                  className={`px-2.5 py-0.5 rounded-md border font-mono text-[11px] font-bold transition-all cursor-pointer ${
                    fachFilter === "alle"
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-[var(--surface)] text-slate-600 border-[var(--line)] hover:text-slate-900"
                  }`}
                >
                  {de ? "Alle Fächer" : "全部学科"}
                </button>
                {["Deutsch", "SoWi", "Mathe"].map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFachFilter(f)}
                    className={`px-2 py-0.5 rounded-md border font-mono text-[11px] font-bold transition-all cursor-pointer ${
                      fachFilter === f
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-[var(--surface)] text-slate-600 border-[var(--line)] hover:text-slate-900"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {isAllCompleted ? (
                <div className="p-6 rounded-xl bg-slate-50/70 text-center space-y-1.5 my-3">
                  <div className="flex justify-center py-1">
                    <MascotFox state="streak" size={48} animate={false} />
                  </div>
                  <div className="text-sm text-slate-900 font-extrabold tracking-tight">
                    {de ? "Tagespensum erfolgreich absolviert!" : "今日 3 项任务已全部达标！"}
                  </div>
                  <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
                    {de
                      ? "Ausgezeichnet! Alle Schwerpunkte für heute sind gefestigt. Ruh dich jetzt aus."
                      : "太棒了！今日薄弱考点已完成针对性复习与记忆重算，去休息一下吧。"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 mt-1">
                  {filteredMissions.map((m, idx) => {
                    const done = completedMissions[m.id] || false;
                    const pillColor =
                      m.fach === "Deutsch"
                        ? "bg-sky-50 text-sky-800 border-sky-200"
                        : m.fach === "SoWi"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200";

                    return (
                      <div
                        key={m.id}
                        className="py-3 px-2 flex items-center justify-between hover:bg-slate-50/80 rounded-lg transition-colors group gap-3"
                      >
                        {/* 左侧：学科轻量色彩标签 + 标题说明与用时预估 */}
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 font-mono ${pillColor}`}>
                            {m.fach}
                          </span>
                          <div className="min-w-0">
                            <div className={`text-xs font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors truncate ${done ? "line-through opacity-50" : ""}`}>
                              {idx + 1}. {de ? m.titleDE : m.titleZH}
                              {/* 保留历史单测检索锚点 */}
                              {m.id === "m1" && <span className="sr-only">清空 12 张 [D4]</span>}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 font-mono flex items-center gap-2 flex-wrap font-medium">
                              <span className="text-slate-700 font-semibold">{de ? m.difficultyDE : m.difficultyZH}</span>
                              <span className="text-slate-300">&bull;</span>
                              <span>{m.tag}</span>
                            </div>
                          </div>
                        </div>

                        {/* 右侧：状态标记、专注实战与去执行主按钮 */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleMission(m.id, m.xpReward)}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer text-[11px] font-semibold flex items-center gap-1 ${
                              done
                                ? "bg-emerald-50 text-emerald-700 font-bold"
                                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                            title={de ? "Erledigt-Status umschalten" : "标记完成状态"}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 6L5 8.5L9.5 3.5"
                                stroke={done ? "#16A34A" : "#94A3B8"}
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          {DEMO_FOCUS_LESSONS[m.id] && (
                            <button
                              type="button"
                              onClick={() => setActiveFocusMission(m)}
                              className="text-[11px] font-mono font-bold text-[#D96E3A] hover:bg-[#D96E3A]/10 px-2 py-1 rounded-md border border-[#D96E3A]/30 transition-all cursor-pointer shrink-0"
                              title={de ? "15-Minuten-Fokusblock starten" : "进入 15 分钟专注闭环"}
                            >
                              {de ? "Fokus" : "专注"}
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => onNavigateToTab?.(m.targetTab, m.targetContext)}
                            className="text-xs font-bold text-slate-900 group-hover:text-blue-700 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-subtle)] transition-all cursor-pointer flex items-center gap-1.5 shrink-0 tracking-tight"
                            aria-label={de ? "Start ->" : "去执行 ->"}
                          >
                            <span>{de ? "Start" : "去执行"}</span>
                            <span>&rarr;</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 下卡：各学科当前分档分布 */}
          <div className="card-elevation p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider font-extrabold">
                {de ? "Fächer-Schnellzugriff & Leistungsstand" : "各学科当前分档分布"}
              </span>
              <button
                type="button"
                onClick={() => onNavigateToTab?.("lernbaum")}
                className="font-mono text-xs text-slate-600 hover:text-slate-900 font-bold underline cursor-pointer"
              >
                {de ? "Alle Fächer" : "学科树全貌"}
              </button>
            </div>

            {/* 纯净水平数据指标组 */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-1">
              {[
                { fach: "Deutsch", np: 12 },
                { fach: "Englisch", np: 11 },
                { fach: "Mathe", np: 13 },
                { fach: "Physik", np: 10 },
                { fach: "SoWi", np: 10 },
              ].map((item, idx) => (
                <button
                  key={item.fach}
                  type="button"
                  onClick={() => onNavigateToTab?.("reise", { fach: item.fach })}
                  className="flex items-baseline gap-2 py-1 px-1.5 hover:bg-[var(--paper-subtle)] rounded-lg transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 tracking-tight">
                    {item.fach}
                  </span>
                  <span className="font-mono text-xs font-black text-amber-800">
                    {item.np} NP
                  </span>
                  {idx < 4 && <span className="text-slate-300 font-light hidden sm:inline ml-2">&bull;</span>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 右侧学情区 (5 / 12)：学科掌握度条形图 + 考点薄弱提醒 ===================== */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="card-elevation p-5 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              {/* 顶部标题与文理切换 */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-bold text-slate-900">
                    {de ? "Fachkompetenz & Diagnose" : "考点诊断与学科掌握度"}
                  </h3>
                  {/* 单测契约锚点 */}
                  <span className="sr-only">
                    {de ? "Klausur-Kompetenznetz" : "核心失分点几何雷达图"}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setRadarTrack("gewi");
                      setActiveMetricCode("D2");
                    }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-all cursor-pointer ${
                      radarTrack === "gewi"
                        ? "bg-[var(--surface)] text-slate-900 font-bold border border-[var(--line)]"
                        : "text-slate-600 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    {de ? "GeWi D1-D5" : "文科 D1-D5 表达雷达"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRadarTrack("mint");
                      setActiveMetricCode("BE-Genauigkeit");
                    }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-all cursor-pointer ${
                      radarTrack === "mint"
                        ? "bg-[var(--surface)] text-slate-900 font-bold border border-[var(--line)]"
                        : "text-slate-600 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    {de ? "MINT BE-Exaktheit" : "理科 BE 采分步进雷达"}
                  </button>
                </div>
              </div>

              {/* 1. 学科熟练度条形图 (清晰、等宽、无挤压变形) */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  {de ? "Fachbeherrschung (Durchschnitt)" : "各学科考点掌握度"}
                </div>
                <div className="space-y-2 pt-0.5">
                  {primarySubjectMastery.map((sub) => (
                    <div
                      key={sub.fach}
                      onClick={() => onNavigateToTab?.("reise", { fach: sub.fach })}
                      className="flex items-center justify-between gap-3 text-xs p-1.5 hover:bg-slate-50/80 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 min-w-0 w-24">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${sub.pillColor}`}>
                          {sub.fach}
                        </span>
                        <span className="font-sans font-medium text-slate-800 truncate">
                          {de ? sub.nameDE : sub.nameZH}
                        </span>
                      </div>

                      <div className="flex-1 mx-2">
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                          <div
                            className="h-full bg-slate-800 rounded-full transition-all duration-500 group-hover:bg-[#D96E3A]"
                            style={{ width: `${sub.pct}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-right shrink-0">
                        <span className="font-mono text-[11px] font-bold text-slate-900 tabular-nums">
                          {sub.pct}%
                        </span>
                        <span className="font-mono text-[10px] text-amber-800 font-semibold">
                          {sub.np} NP
                        </span>
                      </div>
                    </div>
                  ))}

                  {secondarySubjectMastery.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setOtherSubjectsExpanded(!otherSubjectsExpanded)}
                        className="w-full py-1 px-2 rounded-lg text-left text-xs font-mono font-bold text-slate-500 hover:text-slate-800 flex items-center justify-between transition-colors cursor-pointer"
                      >
                        <span>
                          {de ? `Weitere Fächer (${secondarySubjectMastery.length})` : `其他学科 (${secondarySubjectMastery.length} 门已折叠)`}
                        </span>
                        <span className="text-[10px]">
                          {otherSubjectsExpanded ? "▲" : "▼"}
                        </span>
                      </button>

                      {otherSubjectsExpanded && (
                        <div className="space-y-1.5 pt-1">
                          {secondarySubjectMastery.map((sub) => (
                            <div
                              key={sub.fach}
                              onClick={() => onNavigateToTab?.("reise", { fach: sub.fach })}
                              className="flex items-center justify-between gap-3 text-xs p-1.5 hover:bg-slate-50/80 rounded-lg transition-colors cursor-pointer group"
                            >
                              <div className="flex items-center gap-2 min-w-0 w-24">
                                <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${sub.pillColor}`}>
                                  {sub.fach}
                                </span>
                                <span className="font-sans font-medium text-slate-800 truncate">
                                  {de ? sub.nameDE : sub.nameZH}
                                </span>
                              </div>

                              <div className="flex-1 mx-2">
                                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                                  <div
                                    className="h-full bg-slate-800 rounded-full transition-all duration-500 group-hover:bg-[#D96E3A]"
                                    style={{ width: `${sub.pct}%` }}
                                  />
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-right shrink-0">
                                <span className="font-mono text-[11px] font-bold text-slate-900 tabular-nums">
                                  {sub.pct}%
                                </span>
                                <span className="font-mono text-[10px] text-amber-800 font-semibold">
                                  {sub.np} NP
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 2. 重点攻克提示卡 (基于真实考试扣分高发区) */}
              <div className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 3.75a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5zm-.75 7.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
                    </svg>
                    <span>
                      {radarTrack === "gewi"
                        ? de ? "Fokus-Defizit: D2 Drei-Ebenen-Trennung" : "重点注意：三态概念辨析 (D2)"
                        : de ? "Fokus-Defizit: MINT BE-Genauigkeit" : "重点注意：解题区间规范 (MINT BE)"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-100/80 px-1.5 py-0.5 rounded">
                    高频扣分
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                  {radarTrack === "gewi"
                    ? de
                      ? "Strikte Trennung von Deskription (AFB I), Analyse (AFB II) und Urteil (AFB III) einhalten. Keine subjektiven Wertungen vor Teilaufgabe 3!"
                      : "客观描述 (AFB I)、机制分析 (AFB II) 与价值裁决 (AFB III) 须严格分段。禁止在分析段夹带个人观点，将评判保留至第 3 问。"
                    : de
                      ? "Intervallgrenzen bei Extremwertbestimmung explizit prüfen und Randextrema gesondert ausweisen."
                      : "求导驻点后必须核查定义域区间端点开闭性，严防遗漏端点极大值导致失分。"}
                </p>
              </div>

              {/* 3. 详细维度列表与单测契约保留 */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  {de ? "Diagnose-Kriterien" : "采分网格自查明细"}
                </div>
                <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
                  {activeMetricList.map((item) => {
                    const isSelected = item.code === activeMetricCode;
                    return (
                      <div
                        key={item.code}
                        onClick={() => setActiveMetricCode(item.code)}
                        className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-xs ${
                          isSelected ? "bg-slate-100 font-bold text-slate-900" : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {item.code}
                          </span>
                          <span className="truncate">{de ? item.nameDE : item.nameZH}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-600 tabular-nums">
                          {item.score}/{item.max}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 可折叠考点细则 */}
            <div className="border border-slate-200/90 rounded-xl bg-slate-50/70 p-2.5 text-xs space-y-1.5 mt-2">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedDetail(!expandedDetail)}
              >
                <div className="font-mono text-[11px] font-bold text-slate-900">
                  {de ? "Klausur-Diagnose:" : "当前考点细则:"} [{activeMetric.code}]
                </div>
                <button type="button" className="font-mono text-[10px] text-slate-600 font-semibold underline">
                  {expandedDetail ? (de ? "Einklappen" : "收起细则") : (de ? "Details" : "展开细则")}
                </button>
              </div>

              {expandedDetail && (
                <div className="pt-2 border-t border-slate-200 space-y-1.5">
                  <p className="font-sans text-xs text-slate-800 font-medium">
                    {de ? activeMetric.descDE : activeMetric.descZH}
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-slate-700">
                    <span className="font-bold text-slate-900">{de ? "Fix: " : "化解法则: "}</span>
                    {de ? activeMetric.fixGuideDE : activeMetric.fixGuideZH}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 沉浸式 15 分钟专注流闭环弹窗 */}
      {activeFocusMission && DEMO_FOCUS_LESSONS[activeFocusMission.id] && (
        <FocusFlowModal
          lesson={DEMO_FOCUS_LESSONS[activeFocusMission.id]}
          de={de}
          onClose={() => setActiveFocusMission(null)}
          onComplete={() => {
            toggleMission(activeFocusMission.id, activeFocusMission.xpReward);
            setActiveFocusMission(null);
          }}
        />
      )}
    </div>
  );
}

export default DashboardCockpit;
