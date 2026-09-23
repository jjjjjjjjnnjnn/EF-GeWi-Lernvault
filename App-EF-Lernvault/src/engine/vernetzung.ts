// Vernetzungs-Engine: 0ms pure in-memory cross-subject topological anchor search.
// Designed for ultra-low token consumption (<50 tokens injection) and zero-latency user-unobtrusive hints.
// Based on cognitive evidence: Ausubel (1968) Advance Organizers & Rohrer (2020) Interleaved Discrimination.

import { estimateTokens } from "./context";

export type VernetzungDimension =
  | "rate_of_change"       // 变化率与导数 (Mathe / Physik / Chemie / Bio)
  | "conservation_law"     // 守恒律与能量 (Physik / Chemie / Bio)
  | "equilibrium"          // 平衡态与动平衡 (Physik / Chemie / Bio)
  | "justice_welfare"      // 正义论、制度与不平等 (Philo / SoWi)
  | "argumentation_rhetoric"; // 论证、修辞与跨语言中继 (Deutsch / Englisch)

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
