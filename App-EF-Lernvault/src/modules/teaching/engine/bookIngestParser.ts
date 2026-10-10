// Book Ingest & Structural DAG Deconstruction Engine
// 第一性原理书籍/课纲智能拆解引擎：将任意教材文本、目录大纲拆解为 DAG 进阶关卡网络

export type LessonType = "concept" | "practice" | "experiment";

export type InteractiveToolType =
  | "magisches-viereck"
  | "gini-allocator"
  | "orderbuch-sim"
  | "ethik-waage"
  | "dilemma-theatre"
  | "tangent-slider"
  | "wahlsystem-sim"
  | "rawls-sim"
  | "variable_slider"
  | "dilemma_balance"
  | "logic_blocks"
  | "scenario_tree";

export interface KeyConceptSnippet {
  term: string;
  definitionDE: string;
  definitionZH: string;
  analogy: string; // 直觉通俗比喻
  examTrap: string; // 高频失分陷阱 (Fehlerquelle)
}

export interface ParsedQuestNode {
  id: string;
  chapterId: string;
  order: number;
  title: string;
  lessonType: LessonType;
  estimatedMinutes: number; // 8-15 min 无痛微块
  prerequisites: string[]; // 前置依赖节点 ID 列表 (DAG)
  matchedToolId: string;
  matchedToolName: string;
  interactiveType: InteractiveToolType;
  summary: string;
  socraticPrompt: string; // 苏格拉底导学启发设问
  keyConcepts: KeyConceptSnippet[];
  xp: number;
}

export interface ParsedChapter {
  id: string;
  order: number;
  title: string;
  nodes: ParsedQuestNode[];
  totalMinutes: number;
}

export interface ParsedBookStructure {
  title: string;
  fach: string;
  rawInputLength: number;
  chapters: ParsedChapter[];
  totalNodes: number;
  totalMinutes: number;
  dagEdgesCount: number;
  createdAt: string;
}

// 教具匹配词库与元数据
interface ToolRule {
  id: string;
  name: string;
  interactiveType: InteractiveToolType;
  keywords: string[];
}

const TOOL_RULES: ToolRule[] = [
  {
    id: "wahlsystem-sim",
    name: "Wahlsystem-Sim (联邦大选双票制与议席分配)",
    interactiveType: "wahlsystem-sim",
    keywords: ["wahl", "erststimme", "zweitstimme", "bundestag", "sainte-lague", "5%-huerde", "mandat", "abgeordnete"],
  },
  {
    id: "rawls-sim",
    name: "Rawls-Gerechtigkeit (无知之幕与差异原则沙盘)",
    interactiveType: "rawls-sim",
    keywords: ["rawls", "schleier", "urzustand", "differenzprinzip", "gerechtigkeit", "umverteilung", "fairness"],
  },
  {
    id: "magisches-viereck",
    name: "Magisches Viereck (宏观经济景气与四大目标沙盘)",
    interactiveType: "magisches-viereck",
    keywords: ["wirtschaft", "wachstum", "inflation", "arbeitslos", "konjunktur", "markt", "ezb", "preisstabilitaet"],
  },
  {
    id: "gini-allocator",
    name: "Gini-Allocator (基尼系数与社会分层模拟)",
    interactiveType: "gini-allocator",
    keywords: ["gini", "einkommen", "armut", "vermoegen", "schicht", "ungleichheit", "steuer", "transfer"],
  },
  {
    id: "ethik-waage",
    name: "Ethik-Waage (康德义务论与功利主义权衡天平)",
    interactiveType: "ethik-waage",
    keywords: ["kant", "pflicht", "kategorisch", "imperativ", "utilitarismus", "nutzen", "moral", "folge"],
  },
  {
    id: "tangent-slider",
    name: "Tangent-Slider (微积分导数与变化率切线)",
    interactiveType: "tangent-slider",
    keywords: ["ableitung", "steigung", "tangente", "differenzenquotient", "funktion", "grenzwert", "extrema"],
  },
  {
    id: "dilemma-theatre",
    name: "Dilemma-Theatre (两难抉择剧场与电车困境)",
    interactiveType: "dilemma-theatre",
    keywords: ["dilemma", "konflikt", "entscheidung", "trolley", "verantwortung", "schuld", "tragik"],
  },
];

// 通用交互微世界备用项
const GENERIC_TOOLS: Record<LessonType, { id: string; name: string; interactiveType: InteractiveToolType }> = {
  concept: {
    id: "variable-slider-box",
    name: "Kausal-Schieberegler (变量与因果微世界)",
    interactiveType: "variable_slider",
  },
  practice: {
    id: "logic-block-builder",
    name: "Argumentations-Baukasten (逻辑因果积木)",
    interactiveType: "logic_blocks",
  },
  experiment: {
    id: "scenario-decision-tree",
    name: "Szenario-Entscheidungsbaum (情境抉择树)",
    interactiveType: "scenario_tree",
  },
};

/**
 * 课型推断
 */
export function inferLessonType(text: string): LessonType {
  const lower = text.toLowerCase();
  if (
    lower.includes("simulation") ||
    lower.includes("experiment") ||
    lower.includes("labor") ||
    lower.includes("dynamik") ||
    lower.includes("modell") ||
    lower.includes("sandkasten") ||
    lower.includes("interaktiv")
  ) {
    return "experiment";
  }
  if (
    lower.includes("analyse") ||
    lower.includes("training") ||
    lower.includes("uebung") ||
    lower.includes("übung") ||
    lower.includes("aufgabe") ||
    lower.includes("anwendung") ||
    lower.includes("berechnung") ||
    lower.includes("klausur") ||
    lower.includes("fallstudie")
  ) {
    return "practice";
  }
  return "concept";
}

/**
 * 教具匹配
 */
export function matchInteractiveTool(text: string, lessonType: LessonType): {
  id: string;
  name: string;
  interactiveType: InteractiveToolType;
} {
  const lower = text.toLowerCase();
  for (const rule of TOOL_RULES) {
    const hits = rule.keywords.filter((kw) => lower.includes(kw));
    if (hits.length > 0) {
      return {
        id: rule.id,
        name: rule.name,
        interactiveType: rule.interactiveType,
      };
    }
  }
  // 伦理辩证类通用偏向天平
  if (lower.includes("pro") || lower.includes("contra") || lower.includes("debatte") || lower.includes("vergleich")) {
    return {
      id: "dilemma-balance-scale",
      name: "Diskurs-Waage (价值对决天平)",
      interactiveType: "dilemma_balance",
    };
  }
  return GENERIC_TOOLS[lessonType];
}

/**
 * 苏格拉底导学问题生成器
 */
export function generateSocraticPrompt(title: string, lessonType: LessonType, fach: string): string {
  if (lessonType === "experiment") {
    return `Wenn du die Parameter in »${title}« extrem veränderst, welches unerwartete Phänomen tritt auf?`;
  }
  if (lessonType === "practice") {
    return `Welcher logische Fehlschluss oder Klausurfehler lauert typischerweise bei der Anwendung von »${title}«?`;
  }
  return `Warum existiert das Konzept »${title}« überhaupt in ${fach}? Welches reale Problem löst es?`;
}

/**
 * 核心概念与易错点初提
 */
export function extractKeyConcepts(title: string, fach: string): KeyConceptSnippet[] {
  const cleanTitle = title.replace(/^[\d.\-\s]+/, "").trim();
  return [
    {
      term: cleanTitle,
      definitionDE: `Zentraler Fachbegriff im Kontext von ${fach}: Bezeichnet den systematischen Wirkungsmechanismus von ${cleanTitle}.`,
      definitionZH: `${fach} 核心概念：指代 ${cleanTitle} 的系统性运作机理与评价维度。`,
      analogy: `Wie ein Regler in einem vernetzten System: Ändert man diesen Faktor, verschiebt sich das gesamte Gleichgewicht.`,
      examTrap: `Verwechslung von Ursache und Wirkung; in Klausuren AFB II/III immer die institutionellen Rahmenbedingungen mitbenennen!`,
    },
  ];
}

interface RawOutlineItem {
  level: number;
  title: string;
  content: string[];
}

/**
 * 原始文本切分提取层级结构
 */
function parseRawOutline(rawText: string): RawOutlineItem[] {
  const lines = rawText.split(/\r?\n/).map((l) => l.trimEnd());
  const items: RawOutlineItem[] = [];
  let currentItem: RawOutlineItem | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 1. Markdown 标题语法 (#, ##, ###)
    const mdMatch = line.match(/^(#{1,4})\s+(.+)$/);
    if (mdMatch) {
      if (currentItem) items.push(currentItem);
      const level = mdMatch[1].length;
      currentItem = { level, title: mdMatch[2].trim(), content: [] };
      continue;
    }

    // 2. 章节编号模式 (Kapitel 1, Teil A, 1. , 1.1 )
    const chapterMatch = trimmed.match(/^(Kapitel\s+\d+|Teil\s+[A-Z\d+]|Chapter\s+\d+)\s*[:.-]?\s*(.*)$/i);
    if (chapterMatch) {
      if (currentItem) items.push(currentItem);
      const title = chapterMatch[2] ? `${chapterMatch[1]}: ${chapterMatch[2]}` : chapterMatch[1];
      currentItem = { level: 1, title, content: [] };
      continue;
    }

    const numberedMatch = trimmed.match(/^(\d+(?:\.\d+)*)\s*[\.、\)\s]\s*(.+)$/);
    if (numberedMatch) {
      if (currentItem) items.push(currentItem);
      const dots = numberedMatch[1].split(".").length;
      currentItem = {
        level: dots <= 1 ? 1 : dots,
        title: `${numberedMatch[1]} ${numberedMatch[2]}`,
        content: [],
      };
      continue;
    }

    // 3. 列表项模式 (- , * , +)
    const listMatch = line.match(/^(\s*)[-*+]\s+(.+)$/);
    if (listMatch) {
      if (currentItem) items.push(currentItem);
      const indent = listMatch[1].length;
      const level = indent >= 4 ? 3 : 2;
      currentItem = { level, title: listMatch[2].trim(), content: [] };
      continue;
    }

    // 4. 普通正文累积到当前项，若尚无当前项则视为主标题
    if (currentItem) {
      currentItem.content.push(trimmed);
    } else {
      currentItem = { level: 1, title: trimmed, content: [] };
    }
  }

  if (currentItem) {
    items.push(currentItem);
  }

  return items;
}

/**
 * 核心解析函数：书籍/大纲输入 -> 结构化 DAG 课程树
 */
export function parseBookToQuests(
  bookTitle: string,
  fach: string,
  rawInput: string
): ParsedBookStructure {
  const trimmedInput = rawInput.trim();
  const rawItems = parseRawOutline(trimmedInput);

  const chapters: ParsedChapter[] = [];
  let currentChapter: ParsedChapter | null = null;
  let globalNodeIndex = 0;
  let previousNodeId: string | null = null;

  // 保证至少有章节结构
  if (rawItems.length === 0) {
    const defaultChap: ParsedChapter = {
      id: "chap-1",
      order: 1,
      title: "Kapitel 1: Grundlagen",
      nodes: [
        {
          id: "q-1-1",
          chapterId: "chap-1",
          order: 1,
          title: "Einführung & Grundbegriffe",
          lessonType: "concept",
          estimatedMinutes: 10,
          prerequisites: [],
          matchedToolId: "variable-slider-box",
          matchedToolName: "Kausal-Schieberegler",
          interactiveType: "variable_slider",
          summary: `Grundlagen und Problemaufriss im Bereich ${fach}.`,
          socraticPrompt: generateSocraticPrompt("Einführung & Grundbegriffe", "concept", fach),
          keyConcepts: extractKeyConcepts("Grundlagen", fach),
          xp: 100,
        },
      ],
      totalMinutes: 10,
    };
    return {
      title: bookTitle || "Unbekanntes Lehrwerk",
      fach: fach || "SoWi",
      rawInputLength: rawInput.length,
      chapters: [defaultChap],
      totalNodes: 1,
      totalMinutes: 10,
      dagEdgesCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
    };
  }

  // 遍历层级项组装章节与关卡
  for (let i = 0; i < rawItems.length; i++) {
    const item = rawItems[i];
    const isChapterLevel = item.level === 1 || (!currentChapter && chapters.length === 0);

    if (isChapterLevel && item.level === 1) {
      if (currentChapter && currentChapter.nodes.length > 0) {
        chapters.push(currentChapter);
      }
      const chapOrder = chapters.length + 1;
      currentChapter = {
        id: `chap-${chapOrder}`,
        order: chapOrder,
        title: item.title,
        nodes: [],
        totalMinutes: 0,
      };
      continue;
    }

    if (!currentChapter) {
      currentChapter = {
        id: "chap-1",
        order: 1,
        title: "Kapitel 1: Einführung & Überblick",
        nodes: [],
        totalMinutes: 0,
      };
    }

    globalNodeIndex++;
    const nodeOrder = currentChapter.nodes.length + 1;
    const nodeId = `q-${currentChapter.order}-${nodeOrder}`;
    const lessonType = inferLessonType(`${item.title} ${item.content.join(" ")}`);
    const tool = matchInteractiveTool(`${item.title} ${item.content.join(" ")}`, lessonType);

    // 智能构建 DAG 依赖关系：
    // 1. 同章节第一关：如果存在前一章节，依赖前一章节的最后一关或核心关卡；
    // 2. 同章节后续关卡：依赖本章节上一关；
    const prerequisites: string[] = [];
    if (previousNodeId) {
      prerequisites.push(previousNodeId);
    }

    // 估算无痛学习时长（8-14 分钟）
    const duration = lessonType === "experiment" ? 14 : lessonType === "practice" ? 12 : 9;

    const questNode: ParsedQuestNode = {
      id: nodeId,
      chapterId: currentChapter.id,
      order: nodeOrder,
      title: item.title,
      lessonType,
      estimatedMinutes: duration,
      prerequisites,
      matchedToolId: tool.id,
      matchedToolName: tool.name,
      interactiveType: tool.interactiveType,
      summary:
        item.content.length > 0
          ? item.content.slice(0, 3).join(" ")
          : `Systematische Erarbeitung von »${item.title}« mit interaktivem Werkzeug.`,
      socraticPrompt: generateSocraticPrompt(item.title, lessonType, fach),
      keyConcepts: extractKeyConcepts(item.title, fach),
      xp: duration * 10,
    };

    currentChapter.nodes.push(questNode);
    currentChapter.totalMinutes += duration;
    previousNodeId = nodeId;
  }

  if (currentChapter && currentChapter.nodes.length > 0) {
    chapters.push(currentChapter);
  }

  // 计算统计指标
  let totalNodes = 0;
  let totalMinutes = 0;
  let dagEdgesCount = 0;

  for (const chap of chapters) {
    totalNodes += chap.nodes.length;
    totalMinutes += chap.totalMinutes;
    for (const node of chap.nodes) {
      dagEdgesCount += node.prerequisites.length;
    }
  }

  return {
    title: bookTitle || "Eingebettetes Lehrwerk",
    fach: fach || "SoWi",
    rawInputLength: rawInput.length,
    chapters,
    totalNodes,
    totalMinutes,
    dagEdgesCount,
    createdAt: new Date().toISOString().split("T")[0],
  };
}

/**
 * 经典预设课纲样本，方便用户一键载入体验
 */
export const BOOK_INGEST_PRESETS = [
  {
    id: "sowi-markt-staat",
    title: "Markt, Staat und soziale Sicherung in der BRD",
    fach: "SoWi",
    rawContent: `# Kapitel 1: Wirtschaftsordnung & Marktdynamik
## 1.1 Das Modell des vollkommenen Marktes (Angebot & Nachfrage)
## 1.2 Marktversagen: Externe Effekte und oeffentliche Gueter
## 1.3 Preisbildung und staatliche Mindest-/Hoechstpreise
## 1.4 Das Magische Viereck der Wirtschaftspolitik (Simulation)

# Kapitel 2: Politisches System & Wahlrecht
## 2.1 Wahlsystem der BRD: Erst- und Zweitstimme
## 2.2 Die 5%-Huerde und Ueberhangmandate im Bundestag
## 2.3 Gewaltenteilung und Gesetzgebungsprozess
## 2.4 Verfassungsorgane im Spannungsfeld (Fallstudie)

# Kapitel 3: Sozialstaat & Umverteilung
## 3.1 Gini-Koeffizient und Einkommensungleichheit
## 3.2 Die Saeulen der gesetzlichen Sozialversicherung
## 3.3 Generationenvertrag und demografischer Wandel
## 3.4 Klausur-Training: AFB III Stellungnahme zur Rentenreform`,
  },
  {
    id: "deutsch-textanalyse",
    title: "Texte analysieren & interpretieren in der Sek II",
    fach: "Deutsch",
    rawContent: `# Kapitel 1: Grundlagen der Sachtextanalyse
## 1.1 Textsortenbestimmung und Intention des Autors
## 1.2 Analyse der Argumentationsstruktur (Toulmin-Schema)
## 1.3 Rhetorische Mittel und sprachliche Gestaltung
## 1.4 Klausur-Training: Einleitung und strukturierte Wiedergabe

# Kapitel 2: Literarische Texte & Dramenanalyse
## 2.1 Dialoganalyse und Figurenkonstellation
## 2.2 Szenische Entwicklung und Spannungsaufbau
## 2.3 Epochentypische Motive (Aufklaerung bis Moderne)
## 2.4 Uebung: Vergleichende Interpretation`,
  },
  {
    id: "philo-kant-utilitarismus",
    title: "Praktische Philosophie: Pflichtethik vs. Utilitarismus",
    fach: "Philosophie",
    rawContent: `# Kapitel 1: Immanuel Kants Deontologie
## 1.1 Der Gute Wille und die Pflicht
## 1.2 Der Kategorische Imperativ (Universalisierungsformel)
## 1.3 Die Menschheitszweckformel
## 1.4 Dilemma-Diskussion: Das Luegenverbot

# Kapitel 2: Utilitarismus & Folgenethik
## 2.1 Jeremy Benthams Hedonistisches Kalkuel
## 2.2 John Stuart Mill: Qualitativer Utilitarismus
## 2.3 Handlungs- vs. Regelutilitarismus
## 2.4 Simulation: Das Trolley-Problem und Ethik-Waage`,
  },
  {
    id: "physik-mechanik",
    title: "Klassische Mechanik & Energieerhaltungssatz",
    fach: "Physik",
    rawContent: `# Kapitel 1: Kinematik und Bewegungsgleichungen
## 1.1 Gleichfoermige und beschleunigte Bewegung
## 1.2 Tangenten- und Ableitungsinterpretation im s-t-Diagramm
## 1.3 Newtons Axiome und Kraeftezerlegung

# Kapitel 2: Arbeit, Energie und Leistung
## 2.1 Kinetische und potentielle Energie
## 2.2 Der mechanische Energieerhaltungssatz
## 2.3 Reibungsverluste und Dissipation
## 2.4 Labor-Experiment: Fadenpendel und Energieaustausch`,
  },
  {
    id: "deutsch-faust-drama",
    title: "Goethe: Faust I & Klassische Dramenanalyse EF",
    fach: "Deutsch",
    rawContent: `# Kapitel 1: Vorspiele und Exposition
## 1.1 Zueignung und Vorspiel auf dem Theater (Kunstbegriff)
## 1.2 Prolog im Himmel: Der Herr vs. Mephisto (Die Wette)
## 1.3 Nacht: Fausts Erkenntniskrise und der Erdgeist
## 1.4 Studierzimmer: Teufelspakt vs. Wette und Entgrenzung

# Kapitel 2: Die Gelehrtentragödie zur Gretchentragödie
## 2.1 Auerbachs Keller & Hexenkueche (Verjuengung)
## 2.2 Strasse und Spaziergang: Begegnung mit Gretchen
## 2.3 Marthens Garten: Die Gretchenfrage und Religiositaet
## 2.4 Kerker: Erlösung Gretchens und Fausts Schuld`,
  },
  {
    id: "mathe-differentialrechnung",
    title: "Differentialrechnung & Kurvendiskussion EF",
    fach: "Mathe",
    rawContent: `# Kapitel 1: Von der Sekante zur Tangente
## 1.1 Mittlere Änderungsrate (Differenzenquotient)
## 1.2 Lokale Änderungsrate und Ableitungsbegriff (h-Methode)
## 1.3 Tangentengleichung und lineare Approximation
## 1.4 Geometrische Interpretation des s-t und v-t Diagramms

# Kapitel 2: Ableitungsregeln & Kurvenuntersuchung
## 2.1 Potenzregel, Faktorregel und Summenregel
## 2.2 Monotonieverhalten und erste Ableitung
## 2.3 Notwendiges und hinreichendes Kriterium für Extremstellen
## 2.4 Wendepunkte und Kruemmungsverhalten im Sachkontext`,
  },
];
