// NRW 高中教学大纲能力域映射 (Kernlehrplan Gymnasium NRW - Einführungsphase EF)
// 将笔记、卡片与考查主题自动对齐到官方 Inhaltsfelder (IF) 认知维度

export interface Inhaltsfeld {
  id: string;          // 唯一标识 (如 "sowi-if1")
  code: string;        // 官方编号 (如 "IF 1")
  fach: string;        // 学科 (SoWi, Philosophie, Deutsch, Englisch)
  titleDE: string;     // 德语考纲标题
  titleZH: string;     // 中文对照
  keywords: string[];  // 识别特征关键词 (用于自动分类)
}

export const NRW_LEHRPLAN_IFS: Inhaltsfeld[] = [
  // --- Sozialwissenschaften (SoWi) ---
  {
    id: "sowi-if1",
    code: "IF 1",
    fach: "SoWi",
    titleDE: "Marktwirtschaftliche Ordnung und Wirtschaftspolitik",
    titleZH: "市场经济秩序与经济政策",
    keywords: ["markt", "wirtschaft", "wettbewerb", "preisbildung", "tarifautonomie", "inflation", "ezb", "staat"],
  },
  {
    id: "sowi-if2",
    code: "IF 2",
    fach: "SoWi",
    titleDE: "Individuum, Gesellschaft und soziale Ungleichheit",
    titleZH: "个体、社会与社会不平等",
    keywords: ["gesellschaft", "ungleichheit", "mobilität", "schichten", "bildung", "armut", "chancengerechtigkeit", "geißler"],
  },
  {
    id: "sowi-if3",
    code: "IF 3",
    fach: "SoWi",
    titleDE: "Politisches System und Partizipation in der BRD",
    titleZH: "联邦德国政治体制与民主参与",
    keywords: ["politik", "demokratie", "grundgesetz", "bundestag", "parteien", "wahlen", "partizipation", "gewaltenteilung"],
  },

  // --- Philosophie ---
  {
    id: "philo-if1",
    code: "IF 1",
    fach: "Philosophie",
    titleDE: "Der Mensch und sein Handeln (Anthropologie)",
    titleZH: "人及其行为（哲学人类学与人性论）",
    keywords: ["mensch", "menschenbild", "anthropologie", "willensfreiheit", "gehirn", "natur", "kultur"],
  },
  {
    id: "philo-if2",
    code: "IF 2",
    fach: "Philosophie",
    titleDE: "Grundsätze eines gelingenden Lebens (Ethik)",
    titleZH: "美好生活的原则（规范伦理学）",
    keywords: ["ethik", "moral", "kant", "utilitarismus", "imperativ", "bentham", "mill", "pflicht", "tugend"],
  },
  {
    id: "philo-if3",
    code: "IF 3",
    fach: "Philosophie",
    titleDE: "Das Recht und die Gerechtigkeit (Staatsphilosophie)",
    titleZH: "法权与正义（国家哲学与契约论）",
    keywords: ["recht", "gerechtigkeit", "staat", "vertrag", "hobbes", "locke", "rousseau", "rawls", "legitimität"],
  },

  // --- Deutsch ---
  {
    id: "deutsch-if1",
    code: "IF 1",
    fach: "Deutsch",
    titleDE: "Texte der Gegenwart und Vergangenheit (Epik, Drama, Lyrik)",
    titleZH: "古今文学文本研读（叙事、戏剧、诗歌）",
    keywords: ["drama", "epik", "lyrik", "gedicht", "roman", "aufklärung", "sturm", "klassik", "szene"],
  },
  {
    id: "deutsch-if2",
    code: "IF 2",
    fach: "Deutsch",
    titleDE: "Sprache und Sprachgebrauch im Wandel",
    titleZH: "语言演进与交际语用",
    keywords: ["sprache", "rhetorik", "stilmittel", "argumentation", "sprachwandel", "anglizismen", "jugendsprache"],
  },
  {
    id: "deutsch-if3",
    code: "IF 3",
    fach: "Deutsch",
    titleDE: "Sachtexte und Medienreflexion",
    titleZH: "论说文阅读与现代媒体反思",
    keywords: ["sachtext", "medien", "kommentar", "glosse", "leitartikel", "nachrichten", "digital"],
  },

  // --- Englisch ---
  {
    id: "englisch-if1",
    code: "IF 1",
    fach: "Englisch",
    titleDE: "Individual and Society (Identity, Migration)",
    titleZH: "个体与社会（身份认同、移民多元文化）",
    keywords: ["identity", "society", "migration", "diversity", "culture", "multiculturalism", "integration"],
  },
  {
    id: "englisch-if2",
    code: "IF 2",
    fach: "Englisch",
    titleDE: "Global Challenges and Digital Media",
    titleZH: "全球挑战与数字媒体",
    keywords: ["global", "challenges", "media", "environment", "technology", "artificial", "future"],
  },
];

/**
 * 根据学科、标题与标签，自动将考点/笔记归类到对应的 Inhaltsfeld (IF)
 */
export function resolveInhaltsfeld(fach: string, thema: string, tags: string[] = []): Inhaltsfeld | null {
  const normalizedFach = fach.toLowerCase();
  const candidates = NRW_LEHRPLAN_IFS.filter((item) => item.fach.toLowerCase() === normalizedFach);
  if (candidates.length === 0) return null;

  const corpus = `${thema} ${tags.join(" ")}`.toLowerCase();

  let bestMatch: Inhaltsfeld | null = null;
  let maxHits = 0;

  for (const candidate of candidates) {
    let hits = 0;
    for (const kw of candidate.keywords) {
      if (corpus.includes(kw)) hits++;
    }
    if (hits > maxHits) {
      maxHits = hits;
      bestMatch = candidate;
    }
  }

  // 默认兜底到该学科第一个 Inhaltsfeld
  return bestMatch ?? candidates[0];
}
