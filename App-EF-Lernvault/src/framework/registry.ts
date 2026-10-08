import type { FachPlugin } from "./types";

const CANONICAL_PLUGINS: FachPlugin[] = [
  {
    id: "Deutsch",
    kurz: "DE",
    nameDE: "Deutsch",
    nameZH: "德语",
    category: "sprachen",
    operators: ["analysieren", "darstellen", "beurteilen", "eroertern", "interpretieren"],
    isDefault: true,
    descriptionDE: "Sachtexte, Dramen, Lyrik, TATTE-Schema und Sprachwandel.",
    descriptionZH: "实用文与文学文本分析、TATTE导语与语言变迁。",
  },
  {
    id: "Englisch",
    kurz: "EN",
    nameDE: "Englisch",
    nameZH: "英语",
    category: "sprachen",
    operators: ["describe", "analyse", "evaluate", "comment"],
    isDefault: true,
    descriptionDE: "Mediation, Globalisierung, Postkolonialismus und literarische Analyse.",
    descriptionZH: "跨语言调解、全球化与后殖民议题、文学分析。",
  },
  {
    id: "Mathe",
    kurz: "MA",
    nameDE: "Mathematik",
    nameZH: "数学",
    category: "mint",
    operators: ["berechnen", "bestimmen", "begruenden", "untersuchen", "modellieren"],
    isDefault: true,
    descriptionDE: "Differentialrechnung, Kurvendiskussion, Vektorrechnung und Stochastik.",
    descriptionZH: "微分学、整式多项式曲线讨论、向量与概率统计。",
  },
  {
    id: "Physik",
    kurz: "PH",
    nameDE: "Physik",
    nameZH: "物理",
    category: "mint",
    operators: ["berechnen", "erlaeutern", "skizzieren", "auswerten"],
    isDefault: true,
    descriptionDE: "Klassische Mechanik, Kinematik, Kraftgesetze und Energieerhaltung.",
    descriptionZH: "经典力学、运动学方程、牛顿运动定律与能量守恒。",
  },
  {
    id: "Chemie",
    kurz: "CH",
    nameDE: "Chemie",
    nameZH: "化学",
    category: "mint",
    operators: ["erklaeren", "berechnen", "begruenden", "vergleichen"],
    isDefault: true,
    descriptionDE: "Säure-Base-Gleichgewichte, pH-Wert, Redoxsysteme und Thermodynamik.",
    descriptionZH: "酸碱质子平衡理论、pH计算、氧化还原与热力学。",
  },
  {
    id: "Bio",
    kurz: "BI",
    nameDE: "Biologie",
    nameZH: "生物",
    category: "mint",
    operators: ["beschreiben", "analysieren", "vergleichen", "erklaeren"],
    isDefault: true,
    descriptionDE: "Zellbiologie, Biomembranen, Enzymkinetik und molekulare Genetik.",
    descriptionZH: "细胞生物学、生物膜流动镶嵌模型、酶促反应与分子遗传。",
  },
  {
    id: "Philosophie",
    kurz: "PL",
    nameDE: "Philosophie",
    nameZH: "哲学",
    category: "gewi",
    operators: ["rekonstruieren", "vergleichen", "beurteilen", "eroertern"],
    isDefault: true,
    descriptionDE: "Normative Ethik (Utilitarismus vs. Deontologie), Erkenntnistheorie und Staatsphilosophie.",
    descriptionZH: "规范伦理学（功利主义与康德道义论）、认识论与国家哲学。",
  },
  {
    id: "SoWi",
    kurz: "SW",
    nameDE: "Sozialwissenschaften",
    nameZH: "社会科学",
    category: "gewi",
    operators: ["darstellen", "analysieren", "beurteilen", "vergleichen"],
    isDefault: true,
    descriptionDE: "Soziale Ungleichheit, Wohlfahrtsstaatsmodelle, Wirtschaftspolitik und politische Systeme.",
    descriptionZH: "社会结构与不平等、福利国家模式、经济政策调控与民主制度。",
  },
  {
    id: "Musik",
    kurz: "MU",
    nameDE: "Musik",
    nameZH: "音乐",
    category: "kuenste",
    operators: ["beschreiben", "analysieren", "deuten", "beurteilen"],
    isDefault: true,
    descriptionDE: "Formenlehre (Sonatensatzform), Motivisch-thematische Arbeit und Harmonik.",
    descriptionZH: "曲式学（奏鸣曲式）、动机主题展开与和声分析。",
  },
  {
    id: "Sport",
    kurz: "SP",
    nameDE: "Sport",
    nameZH: "体育",
    category: "sport",
    operators: ["beschreiben", "erklaeren", "beurteilen"],
    isDefault: true,
    descriptionDE: "Trainingslehre, Superkompensationsmodell, Bewegungsanalyse und Sportbiologie.",
    descriptionZH: "训练学、超量恢复模型、动作力学分析与运动生理。",
  },
];

class FachRegistryManager {
  private registry = new Map<string, FachPlugin>();

  constructor() {
    this.resetToDefaults();
  }

  public resetToDefaults(): void {
    this.registry.clear();
    CANONICAL_PLUGINS.forEach((plugin) => {
      this.registry.set(plugin.id.toLowerCase(), plugin);
    });
  }

  public registerSubject(plugin: FachPlugin): void {
    this.registry.set(plugin.id.toLowerCase(), plugin);
  }

  public getSubject(idOrKurz: string): FachPlugin | undefined {
    const key = idOrKurz.trim().toLowerCase();
    for (const p of this.registry.values()) {
      if (p.id.toLowerCase() === key || p.kurz.toLowerCase() === key) {
        return p;
      }
    }
    return undefined;
  }

  public getAllSubjects(): FachPlugin[] {
    return Array.from(this.registry.values());
  }

  public getCustomSubjects(): FachPlugin[] {
    return Array.from(this.registry.values()).filter((p) => !p.isDefault);
  }
}

export const FachRegistry = new FachRegistryManager();
