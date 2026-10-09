// Course Series Pipeline Engine (书本-课程集自动化生成流水线)
// Transforms any textbook / outline / syllabus into an engaging, gamified 8-step interactive Lernreise series.

export type GamificationStyle = "adventure" | "investigation" | "sandbox" | "speedrun";

export interface BookChapterInput {
  title: string;
  subtopics?: string[];
  rawText?: string;
}

export interface BookInput {
  title: string;
  fach: string;
  targetAudience?: string; // Default: "Gymnasium EF (NRW)"
  level?: number;
  gamificationStyle?: GamificationStyle;
  chapters?: BookChapterInput[];
  rawText?: string; // Raw text or outline to parse
}

export interface KeyTerm {
  termDE: string;
  termZH: string;
  mechanismDE: string;
  mechanismZH: string;
  klausurTipp: string;
}

export interface GeneratedEpisode {
  id: string;
  fach: string;
  thema: string;
  chapterIndex: number;
  episodeNumber: number;
  episodeTitle: string;
  campaignTitle: string;
  level: number;
  xp: number;
  role: string;
  crisisHook: string;
  matchedToolId: string;
  matchedToolName: string;
  keyTerms: KeyTerm[];
  markdownContent: string;
}

export interface CoursePack {
  bookTitle: string;
  campaignTitle: string;
  fach: string;
  targetAudience: string;
  gamificationStyle: GamificationStyle;
  totalEpisodes: number;
  totalXp: number;
  episodes: GeneratedEpisode[];
  createdAt: string;
}

// 仿真教具与学科偏好匹配矩阵
interface ToolSpec {
  id: string;
  name: string;
  faecher: string[];
  keywords: string[];
}

const AVAILABLE_TOOLS: ToolSpec[] = [
  {
    id: "magisches-viereck",
    name: "Magisches Viereck (宏观经济四角沙盘)",
    faecher: ["SoWi"],
    keywords: ["wirtschaft", "wachstum", "inflation", "arbeitslos", "konjunktur", "markt", "ezb", "geldpolitik"],
  },
  {
    id: "gini-allocator",
    name: "Gini-Allocator (财富分配与基尼系数)",
    faecher: ["SoWi"],
    keywords: ["ungleichheit", "gini", "einkommen", "steuer", "sozial", "schicht", "armut", "vermögen"],
  },
  {
    id: "orderbuch-sim",
    name: "Orderbuch-Simulator (证券交易与撮合沙盘)",
    faecher: ["SoWi"],
    keywords: ["börse", "aktie", "depot", "finanz", "order", "wertpapier", "rendite"],
  },
  {
    id: "ethik-waage",
    name: "Ethik-Waage (伦理天平与辩证权衡)",
    faecher: ["Philosophie", "SoWi"],
    keywords: ["ethik", "kant", "utilitarismus", "moral", "dilemma", "gerechtigkeit", "pflicht", "urteil"],
  },
  {
    id: "dilemma-theatre",
    name: "Dilemma-Theatre (两难抉择剧场)",
    faecher: ["Philosophie", "SoWi", "Deutsch"],
    keywords: ["konflikt", "entscheidung", "freiheit", "verantwortung", "staat", "gesetz", "trolley"],
  },
  {
    id: "tangent-slider",
    name: "Tangent-Slider (切线斜率与导数逼近沙盘)",
    faecher: ["Mathe"],
    keywords: ["ableitung", "steigung", "tangente", "differential", "grenzwert", "extremum", "funktion"],
  },
  {
    id: "box-optimizer",
    name: "Box-Optimizer (容积极值优化沙盘)",
    faecher: ["Mathe"],
    keywords: ["extremwert", "optimierung", "volumen", "fläche", "hochpunkt", "tiefpunkt", "ableitung"],
  },
  {
    id: "kinematik-sim",
    name: "Kinematik-Sim (运动学速度与重力沙盘)",
    faecher: ["Physik"],
    keywords: ["bewegung", "beschleunigung", "geschwindigkeit", "fall", "wurf", "kraft", "newton"],
  },
  {
    id: "schiefe-ebene",
    name: "Schiefe Ebene (斜面受力分解)",
    faecher: ["Physik"],
    keywords: ["reibung", "hangabtrieb", "normalkraft", "vektor", "zerlegung", "winkel"],
  },
  {
    id: "optics-bench",
    name: "Optics-Bench (光学成像导轨)",
    faecher: ["Physik"],
    keywords: ["optik", "linse", "brechung", "fokus", "brennweite", "licht", "spiegel"],
  },
  {
    id: "titration-lab",
    name: "Titration-Lab (酸碱滴定曲线工坊)",
    faecher: ["Chemie"],
    keywords: ["säure", "base", "ph-wert", "titration", "neutralisation", "indikator", "puffer"],
  },
  {
    id: "haber-bosch",
    name: "Haber-Bosch-Lab (化学平衡移动沙盘)",
    faecher: ["Chemie"],
    keywords: ["gleichgewicht", "le-chatelier", "synthese", "druck", "temperatur", "katalysator"],
  },
  {
    id: "osmose-lab",
    name: "Osmose-Lab (渗透压与细胞膜模拟)",
    faecher: ["Bio"],
    keywords: ["osmose", "diffusion", "membran", "turgor", "plasmolyse", "zelle", "wasserpotenzial"],
  },
  {
    id: "satzbau-lego",
    name: "Satzbau-Lego (文科高分句式积木)",
    faecher: ["Deutsch", "Englisch", "Philosophie", "SoWi"],
    keywords: ["operator", "analyse", "text", "zitat", "these", "argument", "basissatz", "klausur"],
  },
  {
    id: "gewi-reading",
    name: "GeWi-Reading-Lab (学术原典精读工坊)",
    faecher: ["Deutsch", "Philosophie", "SoWi"],
    keywords: ["quelle", "historie", "interpretation", "diskurs", "theorie", "autor"],
  },
  {
    id: "oral-timer",
    name: "Oral-Exam-Timer (口试演练与速答)",
    faecher: ["Musik", "Sport", "Englisch", "Deutsch"],
    keywords: ["mündlich", "vortrag", "rede", "debatte", "taktik", "spiel", "analyse"],
  },
];

// 智能根据学科与主题内容匹配最佳互动教具
export function matchPedagogicalTool(fach: string, topicText: string): ToolSpec {
  const normTopic = topicText.toLowerCase();
  const normFach = fach.toLowerCase();

  // 1. 优先按学科与关键词同时匹配
  for (const tool of AVAILABLE_TOOLS) {
    const fachMatches = tool.faecher.some((f) => f.toLowerCase() === normFach);
    if (fachMatches) {
      const keywordHit = tool.keywords.some((k) => normTopic.includes(k));
      if (keywordHit) return tool;
    }
  }

  // 2. 其次按关键词匹配（跨学科通用工具）
  for (const tool of AVAILABLE_TOOLS) {
    const keywordHit = tool.keywords.some((k) => normTopic.includes(k));
    if (keywordHit) return tool;
  }

  // 3. 学科默认保底工具
  const defaultByFach: Record<string, string> = {
    sowi: "magisches-viereck",
    philosophie: "ethik-waage",
    mathe: "tangent-slider",
    physik: "kinematik-sim",
    chemie: "titration-lab",
    bio: "osmose-lab",
    deutsch: "satzbau-lego",
    englisch: "satzbau-lego",
    musik: "oral-timer",
    sport: "oral-timer",
  };

  const defaultId = defaultByFach[normFach] || "dilemma-theatre";
  return AVAILABLE_TOOLS.find((t) => t.id === defaultId) || AVAILABLE_TOOLS[0];
}

// 生成沉浸式战役世界观与危机Hook (Gamification Engine)
export function generateCampaignUniverse(
  bookTitle: string,
  fach: string,
  style: GamificationStyle = "adventure"
): { campaignTitle: string; defaultRole: string; crisisTemplates: string[] } {
  const normFach = fach.toLowerCase();
  const styleSuffix = style === "speedrun" ? " · Speedrun" : style === "sandbox" ? " · Sandbox" : "";

  if (normFach.includes("sowi")) {
    return {
      campaignTitle: `Operation Realwirtschaft: Die 100-Tage-Rettung (${bookTitle})${styleSuffix}`,
      defaultRole: `Leitender Wirtschaftsberater & ${style === "investigation" ? "Debatten-Richter" : "Krisen-Koordinator"}`,
      crisisTemplates: [
        "凌晨 03:00，通胀率突遭外部冲击飙升，内阁紧急热线要求你在 30 分钟内交出货币与财政双轨平衡方案！",
        "国内失业率与物价水平发生剧烈背离，滞胀警报全面拉响，市场信心指数跌破荣枯线！",
        "某巨头企业申请破产保护，纳税人救助还是放任出清？议会辩论将在晨光初照时投票表决！",
        "外贸顺差剧烈波动，汇率承压，央行金库与国际储备必须在收盘前完成对冲！",
      ],
    };
  }

  if (normFach.includes("philo")) {
    return {
      campaignTitle: `Das Tribunal der Vernunft: Der Agora-Prozess (${bookTitle})`,
      defaultRole: "Verteidiger der Aufklärung & Urteilsprüfer",
      crisisTemplates: [
        "城邦法庭座无虚席：一名被告声称其一切行为受生物决定论支配，若无自由意志，审判即是不公！陪审团正等待你的哲学裁决。",
        "无人驾驶电车决策算法面临生死分岔：牺牲少数拯救多数还是坚守绝对道义底线？程序将在 10 秒后烧录进底层芯片。",
        "社会契约发生断裂：在极端匮乏状态下，公民是否拥有推翻秩序的自然权利？正义女神的信条悬于一线。",
        "真理与谎言的界限被技术抹平，怀疑论彻底席卷学派，你必须从思维原点重筑第一确证基石！",
      ],
    };
  }

  if (normFach.includes("mathe")) {
    return {
      campaignTitle: `Der Grenzwert-Architekt: Rettung des Mega-Projekts (${bookTitle})`,
      defaultRole: "Chef-Ingenieur für Mathematische Modellierung",
      crisisTemplates: [
        "跨海大桥受力传感器传回异常震荡信号，斜率临界点正在逼近材料屈服极限，必须立刻完成导数极值推导！",
        "航天器返航姿态轨道出现微小偏差，微积分逼近算法必须在进入黑障前完成误差收敛判定！",
        "仓储容积最大化方案与材料成本函数发生对冲，预算审批仅剩半小时，你必须求出全局驻点精确解！",
        "算法复杂度随数据规模指数爆炸，优化迭代公式必须重构为封闭极值形式！",
      ],
    };
  }

  if (normFach.includes("physik")) {
    return {
      campaignTitle: `Operation Warp-Speed: Das Gravitations-Paradoxon (${bookTitle})`,
      defaultRole: "Leitender Astrophysiker der Forschungsstation",
      crisisTemplates: [
        "空间站轨道姿态受微陨石撞击偏转，合成受力与角加速度失衡，逃逸窗口仅剩最后 45 秒！",
        "高能粒子碰撞探测器读数异常，相对论动量与能量守恒出现未知偏离，必须立刻厘清力场分解！",
        "激光干涉成像仪透镜组聚焦失准，光路几何相位发生严重色散，空间望远镜主镜急需重新调谐！",
        "深井落体实验传感器传回反常负加速度数据，重力与空气阻力模型急需现场重构验证！",
      ],
    };
  }

  if (normFach.includes("chemie")) {
    return {
      campaignTitle: `Die Reaktions-Kammer: Alchemie des 21. Jahrhunderts (${bookTitle})`,
      defaultRole: "Chemie-Laborleiter & Katalyse-Stratege",
      crisisTemplates: [
        "高压合成塔温度失控，化学平衡向吸热分解方向急剧漂移，压力表针正刺入红色警戒区！",
        "工业废水 pH 值突破排放红线，酸碱中和反应滴定终点即将错过，指示剂颜色正发生危险跃迁！",
        "分子配位键发生位阻异构，产物纯度跌破会考级指标，急需通过勒夏特列原理现场力挽狂澜！",
        "反应速率常数受杂质抑制衰减 80%，活化能垒亟待催化剂重构路径方案！",
      ],
    };
  }

  if (normFach.includes("bio")) {
    return {
      campaignTitle: `Projekt Bio-Sphere: Das Membran-Laboratorium (${bookTitle})`,
      defaultRole: "Chef-Molekularbiologe der Notfallstation",
      crisisTemplates: [
        "透析室警报长鸣：血液侧渗透压失衡，水分正疯狂涌向高渗区，细胞面临质壁分离枯竭危机！",
        "神经突触动作电位传导受阻，膜电位去极化阈值无法激活，关键离子通道通道急待参数复位！",
        "人工生态舱水势梯度倒挂，植物根系蒸腾拉力中断，整片作物温室急需渗透调节救生液！",
        "病毒假体试图穿越磷脂双分子层，载体蛋白特异性受体正遭到竞争性抑制攻击！",
      ],
    };
  }

  // 通用/文科保底世界观
  return {
    campaignTitle: `Die Klausur-Meisterklasse: Exzellenz in ${fach} (${bookTitle})`,
    defaultRole: "Fachexperte & Klausur-Stratege (Stufe EF/Abitur)",
    crisisTemplates: [
      "会考阅卷官给出一篇典型 08 分的平庸试卷，设问逻辑模糊、论据断裂，你受命以主考官视角重构满分示范！",
      "关键学术争论在核心文献中爆发，两派理论各执一词，你必须以严谨论证框架建立独立判定！",
      "核心考点原典出现复杂变体，常规死记硬背完全失效，急需通过因果建模直击命题核心！",
      "模拟考倒计时仅剩最后 15 分钟，踩分点与指令词（Operatoren）必须实现精准命中！",
    ],
  };
}

// 解析书本目录结构（支持文本段落、带序号目录、或者已有章节数组）
export function parseBookTableOfContents(input: BookInput): BookChapterInput[] {
  if (input.chapters && input.chapters.length > 0) {
    return input.chapters;
  }

  const raw = input.rawText || "";
  if (!raw.trim()) {
    // 默认生成该学科的经典五大核心模块
    return generateDefaultChapters(input.fach, input.title);
  }

  const lines = raw.split("\n").map((l) => l.trim()).filter(Boolean);
  const chapters: BookChapterInput[] = [];
  let currentChapter: BookChapterInput | null = null;

  for (const line of lines) {
    const isHeading =
      line.startsWith("#") ||
      /^(?:Kapitel|Unit|Chapter|Modul|第[一二三四五六七八九十\d]+章|\d+[.:])\s*/i.test(line);

    if (isHeading && !line.startsWith("- ") && !line.startsWith("* ")) {
      if (currentChapter) {
        chapters.push(currentChapter);
      }
      let cleanTitle = line.replace(/^#+\s*/, "").trim();
      cleanTitle = cleanTitle
        .replace(
          /^(?:(?:Kapitel|Unit|Chapter|Modul|第[一二三四五六七八九十\d]+章)\s*(?:\d+|[一二三四五六七八九十]+)?[.:\s\-]*|\d+[.:\s\-]+)/i,
          ""
        )
        .trim();
      currentChapter = {
        title: cleanTitle || line,
        subtopics: [],
      };
    } else if (line.startsWith("- ") || line.startsWith("* ") || /^\d+\.\d+/.test(line)) {
      const cleanSub = line.replace(/^[-*\d.]+\s*/, "").trim();
      if (currentChapter) {
        currentChapter.subtopics = currentChapter.subtopics || [];
        currentChapter.subtopics.push(cleanSub);
      } else {
        currentChapter = {
          title: cleanSub,
          subtopics: [],
        };
      }
    } else if (currentChapter) {
      currentChapter.subtopics = currentChapter.subtopics || [];
      currentChapter.subtopics.push(line);
    } else {
      currentChapter = {
        title: line,
        subtopics: [],
      };
    }
  }

  if (currentChapter) {
    chapters.push(currentChapter);
  }

  return chapters.length > 0 ? chapters : generateDefaultChapters(input.fach, input.title);
}

function generateDefaultChapters(fach: string, bookTitle: string): BookChapterInput[] {
  const normFach = fach.toLowerCase();
  if (normFach.includes("sowi")) {
    return [
      {
        title: "Marktgeschehen und Staatseingriffe in der Sozialen Marktwirtschaft",
        subtopics: ["Magisches Viereck im Zielkonflikt", "Preisbildung und Marktversagen"],
      },
      {
        title: "Geldpolitik und Finanzmaerkte der Europaeischen Waehrungsunion",
        subtopics: ["EZB-Leitzins und Transmission", "Inflation vs. Deflation"],
      },
      {
        title: "Soziale Ungleichheit, Wohlfahrtsstaat und Verteilungsgerechtigkeit",
        subtopics: ["Gini-Koeffizient und Lorenzkurve", "Steuerpolitik und Sozialtransfers"],
      },
    ];
  }

  if (normFach.includes("philo")) {
    return [
      {
        title: "Anthropologie: Das Menschenbild zwischen Natur und Freiheit",
        subtopics: ["Freier Wille vs. Determinismus", "Kants Frage: Was ist der Mensch?"],
      },
      {
        title: "Normative Ethik: Grundpositionen moralischen Handelns",
        subtopics: ["Kategorischer Imperativ", "Utilitarismus und Nutzenkalkül"],
      },
      {
        title: "Staatsphilosophie: Legitimation von Herrschaft und Recht",
        subtopics: ["Gesellschaftsvertrag bei Hobbes und Locke", "Gerechtigkeit als Fairness"],
      },
    ];
  }

  if (normFach.includes("mathe")) {
    return [
      {
        title: "Differentialrechnung: Grundlagen des lokalen Veraenderungsverhaltens",
        subtopics: ["Sekantensteigung und Differenzenquotient", "Ableitungsfunktion und Tangente"],
      },
      {
        title: "Funktionsuntersuchungen und Kurvendiskussion ganzrationaler Funktionen",
        subtopics: ["Kriterium für Hoch- und Tiefpunkte", "Wendepunkte und Krummung"],
      },
      {
        title: "Extremwertprobleme mit Nebenbedingungen im Sachkontext",
        subtopics: ["Zielfunktion und Nebenbedingung", "Optimierung technischer Körper"],
      },
    ];
  }

  if (normFach.includes("bio")) {
    return [
      {
        title: "Zellbiologie: Biomembranen und Stofftransport",
        subtopics: ["Fluessig-Mosaik-Modell", "Diffusion und Osmose im Experiment"],
      },
      {
        title: "Neurobiologie: Signalweiterleitung an Nervenzellen",
        subtopics: ["Ruhepotenzial und Ionenverteilung", "Aktionspotenzial und Refraktaerzeit"],
      },
    ];
  }

  // 通用备考章节
  return [
    {
      title: `${bookTitle} — Grundlagen & Begriffssystem`,
      subtopics: ["Phänomenologie & Leitfrage", "Klausurrelevante Fachbegriffe"],
    },
    {
      title: `${bookTitle} — Kernmechanismus & Analyse`,
      subtopics: ["Ursache-Wirkungs-Modell", "Methodenvergleich"],
    },
    {
      title: `${bookTitle} — Urteilsbildung & Transfer`,
      subtopics: ["Dilemma & Klausurtransfer", "Synthese & Reflexion"],
    },
  ];
}

// 核心流水线生成函数：为一个课时生成完整的符合 Lesson-v3 规范的 8 步微课 Markdown
export function generateEpisodeMarkdown(
  chapter: BookChapterInput,
  subtopicTitle: string,
  chapterIndex: number,
  episodeIndex: number,
  fach: string,
  campaignTitle: string,
  role: string,
  crisisHook: string,
  tool: ToolSpec,
  level: number = 1
): GeneratedEpisode {
  const episodeNumber = chapterIndex * 10 + episodeIndex + 1;
  const thema = subtopicTitle;
  const episodeId = `${fach.toLowerCase()}-${chapter.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 20)}-ep${episodeNumber}`;

  // 1. 术语盒构建
  const keyTerms: KeyTerm[] = [
    {
      termDE: `${thema} (Kernbegriff)`,
      termZH: `${thema} (核心概念)`,
      mechanismDE: `Definiert den zentralen Wirkungszusammenhang in diesem Modul nach den NRW Kernlehrplänen.`,
      mechanismZH: `北威州核心考纲所规定的该模块主干因果机制。`,
      klausurTipp: `In der Einleitung stets als Basissatz mit Operator verknüpfen.`,
    },
    {
      termDE: `Wirkungskette (${fach})`,
      termZH: `因果推演链条`,
      mechanismDE: `Verbindet Ursache, Zwischenschritt und finale Auswirkung ohne Lücken.`,
      mechanismZH: `严格建立“前提 -> 传导机制 -> 终局效应”无缝闭环。`,
      klausurTipp: `Keine logischen Sprünge machen; jeden Teilschritt explizit benennen.`,
    },
    {
      termDE: `Dilemma / Zielkonflikt`,
      termZH: `两难权衡与目标冲突`,
      mechanismDE: `Zeigt auf, dass eine Maßnahme immer auch Opportunitätskosten und Gegenreaktionen erzeugt.`,
      mechanismZH: `辩证剖析任何方案所伴随的机会成本与反作用力。`,
      klausurTipp: `In AFB III zwingend als Abwägungsgrundlage heranziehen.`,
    },
  ];

  // 2. 8 步全长 Markdown 生成
  const md = `---
fach: ${fach}
thema: "${thema}"
level: ${level}
ziel: Klausur
xp: ${100 + level * 20}
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: ${new Date().toISOString().slice(0, 10)}
tags: [EF, ${fach}, CoursePipeline]
version: Lesson-v3
---

# Lernreise: ${thema} — Episode ${episodeNumber}: ${subtopicTitle}

<!-- Campaign: ${campaignTitle} | ${fach} | Instapower: entdecken 5 / ausprobieren 15 / check 20 / szenario 30 -->
## Schritt 1 — entdecken: Ziele & Phänomen-Einstieg

ZIELE（本节三目标）：
1. 中文：彻底掌握 ${thema} 的核心定义与因果推演机制。
2. 中文：能运用仿真教具 [${tool.name}] 完成实操推演与参数判定。
3. 中文：达到北威州会考标准，完成 AFB I~III 完整题型答题与角色迁移。

【危机Hook】${crisisHook}
此时你作为【${role}】，必须在有限时间内理清核心规律，作出严谨判定！

\`Klausur-Satz: Wer die Funktionslogik von ${thema} präzise begründet, beherrscht das Fundament der gesamten Klausur.\`

## Schritt 2 — entdecken: Fachbegriffe & Pre-Training

PRETRAINING术语盒（核心概念装备库）：

- 中文：${keyTerms[0].termZH} — 德语：${keyTerms[0].termDE}：${keyTerms[0].mechanismZH} / ${keyTerms[0].mechanismDE} Klausur-Tipp: ${keyTerms[0].klausurTipp}

- 中文：${keyTerms[1].termZH} — 德语：${keyTerms[1].termDE}：${keyTerms[1].mechanismZH} / ${keyTerms[1].mechanismDE} Klausur-Tipp: ${keyTerms[1].klausurTipp}

- 中文：${keyTerms[2].termZH} — 德语：${keyTerms[2].termDE}：${keyTerms[2].mechanismZH} / ${keyTerms[2].mechanismDE} Klausur-Tipp: ${keyTerms[2].klausurTipp}

\`Klausur-Satz: Präzise Fachsprache sichert die D1-D5 Darstellungsleistung in jeder Oberstufen-Klausur.\`

## Schritt 3 — entdecken: Kernkonzept & Wirkungsmodell

ENTDECKEN因果传导机制（机制深度拆解）：

中文：在【${thema}】的作用体系中，核心变量的变化会驱动系统发生链式反应。通过因果闭环推演，理解其内在动力与外部边界。

德语：Im System von **${thema}** löst jede Parameterverschiebung eine kausale Kettenreaktion aus. Erst durch die Verknüpfung von Primärursache, Übertragungsmechanismus und Folgewirkung entsteht ein klausurfestes Erklärungsmodell.

\`\`\`diagram
Ursache -> Mechanismen-Schritt -> Systemreaktion
Gegenimpuls -> Zielkonflikt -> Neues Gleichgewicht
\`\`\`

## Anekdote & Fun-Fact

**Anekdote / Fun-Fact (DE)**: Auch die größten Experten stritten einst über dieses Problem — erst die systematische Modellierung brachte Klarheit.

**中文解读**: 即使历史上的权威大师也曾对此产生过重大分歧，唯有严谨的系统性建模才揭示了底层的运行真理。

## Schritt 4 — ausprobieren: Interaktiver Sandkasten: ${tool.name}

[Werkzeug: ${tool.id}]

AUFGABE目标挑战：
启动上方互动教具【${tool.name}】。调节参数观察系统反应，找出达到平衡的最佳临界点，并给出量化或定性分析依据。

HILFE:
1. 观察首要输入变量对结果指示器的直接驱动方向。
2. 寻找使系统达到最优状态的参数组合。
3. 记录边界条件下的极端情况。

MUSTERLOESUNG：
中文：通过教具联动可知，参数在中间平衡带能兼顾各方诉求，极端偏移会导致系统失衡。
德语：Der Simulator zeigt eindeutig, dass eine moderate Justierung des Primärfaktors das System stabilisiert, während Extremwerte zum Zusammenbruch führen.

\`Klausur-Satz: Mit dem interaktiven Werkzeug ${tool.id} lässt sich die theoretische Wirkungskette anschaulich verifizieren.\`

## Schritt 5 — ausprobieren: Duell der Wege: Verfahrensvergleich & Abgrenzung

VERGLEICH: Wähle erst das Verfahren, dann lösen:

Weg A (Systemanalytischer Weg): Strikte logische Deduktion anhand des Modells von Ursache zu Wirkung. Dieser Weg ist methodisch lückenlos und punktet bei AFB II.

Weg B (Pragmatischer Dialektik-Weg): Analyse über Zielkonflikte, Dilemmata und praktische Umsetzbarkeit. Dieser Weg liefert die stärksten Argumente für AFB III.

## Schritt 6 — check: Selbsttest (Verständnisprüfung)

FRAGE: Was ist die primäre Wirkungskette bei ${thema}?
ANTWORT: Die primäre Wirkungskette beschreibt den direkten Zusammenhang zwischen Auslöser und Folgereaktion im System.

FRAGE: Welcher Zielkonflikt tritt typischerweise auf?
ANTWORT: Es entsteht ein klassisches Dilemma zwischen kurzfristiger Maximierung und langfristiger Systemstabilität.

FRAGE: Wie lautet der zentrale Klausur-Merksatz?
ANTWORT: Ohne Kausalitätsprüfung bleibt jede Darstellung oberflächlich; die explizite Benennung des Operators ist entscheidend.

## Schritt 7 — szenario: Klausur-Transfer & Szenario

ROLLE: ${role}
SITUATION: Eine offizielle Prüfungskommission legt dir ein reales Fallbeispiel zu ${thema} vor und fordert eine fundierte Stellungnahme innerhalb des 45-Minuten-Zeitfensters.
BEWERTUNG / RUBRIC:
- Kriterium 1: Präzise Definition der Fachbegriffe und Spiegelung der Leitfrage (AFB I)
- Kriterium 2: Lückenlose Darstellung des Kausalmechanismus (AFB II)
- Kriterium 3: Ausgewogenes und differenziertes Urteil unter Einbezug von Dilemmata (AFB III)

## Schritt 8 — reflexion: Takeaway & Reflexion

TAKEAWAY:
Du hast Episode ${episodeNumber} erfolgreich gemeistert!
Die Synthese aus theoretischem Fundament, praktischer Simulation im Werkzeug [${tool.id}] und dem abschließenden Klausurtransfer sichert dir volle Punktzahl bei Prüfungsfragen zu ${thema}.
`;

  return {
    id: episodeId,
    fach,
    thema,
    chapterIndex,
    episodeNumber,
    episodeTitle: subtopicTitle,
    campaignTitle,
    level,
    xp: 100 + level * 20,
    role,
    crisisHook,
    matchedToolId: tool.id,
    matchedToolName: tool.name,
    keyTerms,
    markdownContent: md,
  };
}

// 课程集流水线主入口函数：接收书本输入，运行全流程，输出完整 CoursePack
export function runCourseSeriesPipeline(input: BookInput): CoursePack {
  const fach = input.fach || "SoWi";
  const bookTitle = input.title || `Lehrbuch ${fach} EF`;
  const style = input.gamificationStyle || "adventure";
  const targetAudience = input.targetAudience || "Gymnasium EF (NRW)";

  // 1. 书籍章节解构
  const chapters = parseBookTableOfContents(input);

  // 2. 世界观与剧情战役生成
  const campaign = generateCampaignUniverse(bookTitle, fach, style);

  // 3. 遍历章节与课时，编译生成系列互动关卡
  const episodes: GeneratedEpisode[] = [];
  let crisisIndex = 0;

  chapters.forEach((chap, cIdx) => {
    const subtopics = chap.subtopics && chap.subtopics.length > 0 ? chap.subtopics : [chap.title];
    subtopics.forEach((sub, sIdx) => {
      const tool = matchPedagogicalTool(fach, `${chap.title} ${sub}`);
      const crisis = campaign.crisisTemplates[crisisIndex % campaign.crisisTemplates.length];
      crisisIndex++;

      const episode = generateEpisodeMarkdown(
        chap,
        sub,
        cIdx,
        sIdx,
        fach,
        campaign.campaignTitle,
        campaign.defaultRole,
        crisis,
        tool,
        input.level || 1
      );
      episodes.push(episode);
    });
  });

  const totalXp = episodes.reduce((acc, ep) => acc + ep.xp, 0);

  return {
    bookTitle,
    campaignTitle: campaign.campaignTitle,
    fach,
    targetAudience,
    gamificationStyle: style,
    totalEpisodes: episodes.length,
    totalXp,
    episodes,
    createdAt: new Date().toISOString(),
  };
}
