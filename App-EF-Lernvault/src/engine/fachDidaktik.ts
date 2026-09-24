import type { FachId } from "../fach";

export type FachDomain = "gewi" | "sprachen" | "mint" | "muendlich";

export type DidaktikToolId =
  | "lego"
  | "balance"
  | "highlighter"
  | "tangent"
  | "formula"
  | "oralTimer";

export interface FachDidaktikProfile {
  readonly fach: FachId;
  readonly domain: FachDomain;
  readonly domainNameDE: string;
  readonly domainNameZH: string;
  readonly coreMethodDE: string;
  readonly coreMethodZH: string;
  readonly primaryOperators: readonly string[];
  readonly examFormat: "klausur" | "muendlich";
  readonly recommendedTools: readonly DidaktikToolId[];
}

export const FACH_DIDAKTIK: Record<FachId, FachDidaktikProfile> = {
  SoWi: {
    fach: "SoWi",
    domain: "gewi",
    domainNameDE: "Gesellschaftswissenschaften",
    domainNameZH: "社会科学领域",
    coreMethodDE: "Kriterienorientierte Urteilsbildung (Effizienz & Legitimität), Makro- & Mikromodelle",
    coreMethodZH: "标准导向价值裁决（效率与合法性评价）、宏观与微观社会理论应用",
    primaryOperators: ["darstellen", "analysieren", "beurteilen", "erörtern"],
    examFormat: "klausur",
    recommendedTools: ["balance", "lego"],
  },
  Philosophie: {
    fach: "Philosophie",
    domain: "gewi",
    domainNameDE: "Gesellschaftswissenschaften",
    domainNameZH: "哲学与伦理领域",
    coreMethodDE: "Gedankenexperimente, Begriffsanalyse, Deontologie vs. Teleologie / Utilitarismus",
    coreMethodZH: "思想实验、概念谱系辨析、义务论 vs 功利论价值裁决",
    primaryOperators: ["darstellen", "analysieren", "beurteilen", "vergleichen"],
    examFormat: "klausur",
    recommendedTools: ["balance", "lego"],
  },
  Deutsch: {
    fach: "Deutsch",
    domain: "sprachen",
    domainNameDE: "Sprachlich-künstlerisches Aufgabenfeld",
    domainNameZH: "语言文学分析领域",
    coreMethodDE: "Sachtextanalyse nach Sinnabschnitten, Deutungshypothese, rhetorische Funktionsanalyse",
    coreMethodZH: "依意义段落进行实用文与文学解构、阐释假说构建、修辞与论证功能分析",
    primaryOperators: ["analysieren", "interpretieren", "darstellen", "erörtern"],
    examFormat: "klausur",
    recommendedTools: ["highlighter", "lego"],
  },
  Englisch: {
    fach: "Englisch",
    domain: "sprachen",
    domainNameDE: "Moderne Fremdsprachen",
    domainNameZH: "现代外语产出领域",
    coreMethodDE: "P.E.E.-Methode (Point-Evidence-Explanation), Mediation, Register & Style",
    coreMethodZH: "P.E.E. 论据链（观点-引文-解释）、跨文化中继写作、语域与语体控制",
    primaryOperators: ["analyze", "characterize", "comment", "mediate"],
    examFormat: "klausur",
    recommendedTools: ["highlighter", "lego"],
  },
  Mathe: {
    fach: "Mathe",
    domain: "mint",
    domainNameDE: "Mathematisch-naturwissenschaftliches Aufgabenfeld",
    domainNameZH: "数学抽象与推演领域",
    coreMethodDE: "Axiomatische Deduktion, Differentialrechnung (Δx → 0), 4-Schritte-Lösungsweg",
    coreMethodZH: "公理化演绎、导数几何直观逼近、规范四步解题法（已知-公式-代入-解释）",
    primaryOperators: ["berechnen", "bestimmen", "herleiten", "begründen"],
    examFormat: "klausur",
    recommendedTools: ["tangent", "formula"],
  },
  Physik: {
    fach: "Physik",
    domain: "mint",
    domainNameDE: "Naturwissenschaften",
    domainNameZH: "物理实验与力学领域",
    coreMethodDE: "Phänomen → Modell → Formel, Einheitenkontrolle (SI-Einheiten), Diagramminterpretation",
    coreMethodZH: "物理现象到数学模型、受力分析图、严格量纲与单位换算检查",
    primaryOperators: ["erklären", "berechnen", "herleiten", "skizzieren"],
    examFormat: "klausur",
    recommendedTools: ["formula"],
  },
  Chemie: {
    fach: "Chemie",
    domain: "mint",
    domainNameDE: "Naturwissenschaften",
    domainNameZH: "化学反应与微观平衡领域",
    coreMethodDE: "Teilchenmodell, Massenwirkungsgesetz, Stöchiometrie, Le Chatelier Gleichgewichtsverschiebung",
    coreMethodZH: "微观粒子模型、勒夏特列平衡移动原理、化学计量学与摩尔浓度推算",
    primaryOperators: ["erläutern", "berechnen", "aufstellen", "vergleichen"],
    examFormat: "klausur",
    recommendedTools: ["formula"],
  },
  Bio: {
    fach: "Bio",
    domain: "mint",
    domainNameDE: "Naturwissenschaften",
    domainNameZH: "生命机制与生物催化领域",
    coreMethodDE: "Schlüssel-Schloss-Prinzip, Kinetikkurven (T / pH / Substrat), zelluläre Wirkmechanismen",
    coreMethodZH: "酶促反应钥匙-锁模型、温度与pH反应曲线解读、细胞机制因果链推理",
    primaryOperators: ["beschreiben", "erklären", "analysieren", "deuten"],
    examFormat: "klausur",
    recommendedTools: ["formula"],
  },
  Musik: {
    fach: "Musik",
    domain: "muendlich",
    domainNameDE: "Mündliche Prüfung & Ästhetik",
    domainNameZH: "口试表达与听觉分析",
    coreMethodDE: "Höranalyse (Motiv-Entwicklung, Sonatensatzform), 15 Min Vorbereitung → 5 Min Vortrag",
    coreMethodZH: "听觉微观主题动机分析、奏鸣曲式织体识别、15分钟备考-5分钟口试结构陈述",
    primaryOperators: ["beschreiben", "analysieren", "erläutern", "beurteilen"],
    examFormat: "muendlich",
    recommendedTools: ["oralTimer"],
  },
  Sport: {
    fach: "Sport",
    domain: "muendlich",
    domainNameDE: "Mündliche Prüfung & Biomechanik",
    domainNameZH: "口试表达与动作力学",
    coreMethodDE: "Phasenstruktur nach Meinel/Schnabel (Vorbereitung/Haupt/Ende), Biomechanische Prinzipien",
    coreMethodZH: "运动三阶段力学分析（准备-主-结束相）、生物力学原则、口试考官追问应对",
    primaryOperators: ["beschreiben", "erläutern", "beurteilen", "überprüfen"],
    examFormat: "muendlich",
    recommendedTools: ["oralTimer"],
  },
};

export function getFachDidaktik(fach: string): FachDidaktikProfile | undefined {
  return FACH_DIDAKTIK[fach as FachId];
}

export function getDomainForFach(fach: string): FachDomain {
  return FACH_DIDAKTIK[fach as FachId]?.domain ?? "gewi";
}

export function getToolsForFach(fach: string): readonly DidaktikToolId[] {
  const profile = getFachDidaktik(fach);
  if (profile) return profile.recommendedTools;
  // Fallback for "alle": return core representational set
  return ["lego", "balance", "highlighter", "tangent", "formula", "oralTimer"];
}
