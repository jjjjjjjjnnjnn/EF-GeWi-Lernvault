// Pedagogy Component Registry
// Register aller pädagogischen Spezial-Komponenten & Didaktik-Simulatoren
// Ermöglicht dynamische Auflösung und Alias-Routing für MINT & GeWi Werkzeuge

import type React from "react";
import { WahlsystemSim } from "./WahlsystemSim";
import { MagischesViereckSim } from "./MagischesViereckSim";
import { SinusMilieusSim } from "./SinusMilieusSim";
import { SatzbauLego } from "./SatzbauLego";
import { BalanceBoard } from "./BalanceBoard";
import { TextHighlighter } from "./TextHighlighter";
import { TangentSlider } from "./TangentSlider";
import { TitrationSimulator } from "./TitrationSimulator";
import { BoxOptimizerSim } from "./BoxOptimizerSim";
import { EthikWaageSim } from "./EthikWaageSim";
import { SchiefeEbeneSim } from "./SchiefeEbeneSim";
import { GiniAllocatorSim } from "./GiniAllocatorSim";
import { GeWiReadingLab } from "./GeWiReadingLab";
import { TrilemmaSim } from "./TrilemmaSim";
import { TrustGameSim } from "./TrustGameSim";

export interface PedagogyRegistryEntry {
  id: string;
  aliases: string[];
  nameDE: string;
  nameZH: string;
  fach: string;
  kategorie: string;
  descriptionDE: string;
  descriptionZH: string;
  component: React.ComponentType<any>;
}

export const PEDAGOGY_REGISTRY: PedagogyRegistryEntry[] = [
  {
    id: "wahlsystem-sim",
    aliases: [
      "WahlsystemSim",
      "wahlsystem",
      "bundestagswahl",
      "sitzverteilung",
      "sowi-wahlsystem",
      "sowi-bundestagswahl",
      "bundestag-sim",
    ],
    nameDE: "Bundestagswahl & Sitzverteilung Simulator",
    nameZH: "德国联邦议院选举与议席分配沙盘",
    fach: "SoWi",
    kategorie: "Politisches System der BRD",
    descriptionDE:
      "BWG 2023/2024 Reform, Sainte-Laguë/Schepers-Verfahren, 5%-Hürde, Zweitstimmendeckung vs. Überhangmandate.",
    descriptionZH:
      "2023新选举法改革、圣拉古除数法、5%门槛、第二票配额覆盖与悬峙平衡议席机制对比。",
    component: WahlsystemSim,
  },
  {
    id: "sowi-sinus-milieus",
    aliases: ["SinusMilieusSim", "sinus-milieus", "milieus"],
    nameDE: "Sinus-Milieus Deutschland Explorer",
    nameZH: "德国当代 Sinus-Milieus 10大社会阶层沙盘",
    fach: "SoWi",
    kategorie: "Sozialstruktur & Ungleichheit",
    descriptionDE: "Zweidimensionales Koordinatensystem: Soziale Lage vs. Grundorientierung.",
    descriptionZH: "社会阶层与价值观双维全景图谱。",
    component: SinusMilieusSim,
  },
  {
    id: "magisches-viereck",
    aliases: ["MagischesViereckSim", "magisches-viereck-sim", "wirtschaftspolitik"],
    nameDE: "Magisches Viereck der Wirtschaftspolitik",
    nameZH: "经济政策魔力四角动态仿真台",
    fach: "SoWi",
    kategorie: "Wirtschaftspolitik",
    descriptionDE: "Wachstum, Vollbeschäftigung, Preisstabilität und außenwirtschaftliches Gleichgewicht.",
    descriptionZH: "经济增长、充分就业、物价稳定与外贸平衡目标协调。",
    component: MagischesViereckSim,
  },
  {
    id: "satzbau-lego",
    aliases: ["SatzbauLego", "lego", "satzbau"],
    nameDE: "Satzbau-Lego (Klausur-Analyse)",
    nameZH: "句式积木 (Satzbau-Lego)",
    fach: "Deutsch",
    kategorie: "Texte-Analyse",
    descriptionDE: "Steckbausteine für formale Textanalyse und TATTE-Zitate.",
    descriptionZH: "实用文与文学文本分析积木式高分结构组装。",
    component: SatzbauLego,
  },
  {
    id: "balance-board",
    aliases: ["BalanceBoard", "waage", "dialektische-waage"],
    nameDE: "Dialektische Waage (AFB III)",
    nameZH: "辩证天平 (Dialektische Waage)",
    fach: "Philosophie",
    kategorie: "Urteilskompetenz",
    descriptionDE: "Pro- und Contra-Gewichtung für theoriegeleitete Urteilsbildung.",
    descriptionZH: "正反两造论据权衡与哲学/社科规范化裁判推导。",
    component: BalanceBoard,
  },
  {
    id: "text-highlighter",
    aliases: ["TextHighlighter", "marker", "annotation"],
    nameDE: "Präzisions-Texterfassung",
    nameZH: "高亮精读标记台",
    fach: "Deutsch",
    kategorie: "Textarbeit",
    descriptionDE: "Operatoren-orientierte Markierung mit Fundstellen.",
    descriptionZH: "行号锚定与分析性关键词高亮标记。",
    component: TextHighlighter,
  },
  {
    id: "tangent-slider",
    aliases: ["TangentSlider", "ableitung", "tangente"],
    nameDE: "Dynamischer Tangenten-Schieber",
    nameZH: "动态切线导数滑块",
    fach: "Mathe",
    kategorie: "Analysis",
    descriptionDE: "Visualisierung der Ableitung als Steigung der Tangente.",
    descriptionZH: "导数几何意义与割线逼近切线动态实验。",
    component: TangentSlider,
  },
  {
    id: "titration-simulator",
    aliases: ["TitrationSimulator", "titration"],
    nameDE: "Säure-Base-Titrationslabor",
    nameZH: "酸碱滴定实验台",
    fach: "Chemie",
    kategorie: "Säure-Base-Gleichgewichte",
    descriptionDE: "pH-Kurvenberechnung und Indikatorumschlag.",
    descriptionZH: "滴定曲线生成与化学等当点指标计算。",
    component: TitrationSimulator,
  },
  {
    id: "box-optimizer",
    aliases: ["BoxOptimizerSim", "extremwert"],
    nameDE: "Extremwert-Box-Optimierer",
    nameZH: "极值优化纸盒展开台",
    fach: "Mathe",
    kategorie: "Analysis",
    descriptionDE: "Volumenmaximierung durch Ableitung.",
    descriptionZH: "导数应用题容积最大化展开实验。",
    component: BoxOptimizerSim,
  },
  {
    id: "ethik-waage",
    aliases: ["EthikWaageSim", "ethik"],
    nameDE: "Ethische Dilemma-Waage",
    nameZH: "伦理困境天平",
    fach: "Philosophie",
    kategorie: "Praktische Philosophie",
    descriptionDE: "Konsequentialismus vs. Deontologie nach Kant.",
    descriptionZH: "后果主义与康德道义论伦理冲突模拟。",
    component: EthikWaageSim,
  },
  {
    id: "schiefe-ebene",
    aliases: ["SchiefeEbeneSim", "mechanik"],
    nameDE: "Schiefe Ebene & Kraftzerlegung",
    nameZH: "斜面受力分解实验台",
    fach: "Physik",
    kategorie: "Mechanik",
    descriptionDE: "Hangabtriebskraft, Normalkraft und Reibung.",
    descriptionZH: "牛顿力学与重力分力动态矢量推演。",
    component: SchiefeEbeneSim,
  },
  {
    id: "gini-allocator",
    aliases: ["GiniAllocatorSim", "lorenzkurve", "gini"],
    nameDE: "Lorenzkurve & Gini-Koeffizient",
    nameZH: "洛伦兹曲线与基尼系数实验台",
    fach: "SoWi",
    kategorie: "Soziale Ungleichheit",
    descriptionDE: "Einkommens- und Vermögensverteilung interaktiv berechnen.",
    descriptionZH: "收入与财产分配不平等度动态测算。",
    component: GiniAllocatorSim,
  },
  {
    id: "gewi-reading",
    aliases: ["GeWiReadingLab", "reading-lab"],
    nameDE: "GeWi Text- & Quellenanalyse-Labor",
    nameZH: "文科高阶原始文本深度精读台",
    fach: "Deutsch",
    kategorie: "Texte-Analyse",
    descriptionDE: "Bilinguale philologische Annotation und Argumentationsanalyse.",
    descriptionZH: "双语段落精读、论证链条拆解与TATTE结构支撑。",
    component: GeWiReadingLab,
  },
  {
    id: "trilemma-sim",
    aliases: ["TrilemmaSim", "trilemma", "globalisierung"],
    nameDE: "Politisches Globalisierungs-Trilemma (Dani Rodrik)",
    nameZH: "罗德里克全球化政治三难困境",
    fach: "SoWi",
    kategorie: "Globalisierung",
    descriptionDE: "Hyperglobalisierung, Nationalstaat und Demokratie im Konflikt.",
    descriptionZH: "超级全球化、民族国家主权与民主政治的不可兼得推演。",
    component: TrilemmaSim,
  },
  {
    id: "trust-game",
    aliases: ["TrustGameSim", "spieltheorie", "vertrauen"],
    nameDE: "Vertrauensspiel (Spieltheorie)",
    nameZH: "信任博弈实验台",
    fach: "SoWi",
    kategorie: "Ökonomische Verhaltenslehre",
    descriptionDE: "Nash-Gleichgewicht, Reziprozität und soziale Normen.",
    descriptionZH: "纳什均衡、互惠性与社会规范博弈仿真。",
    component: TrustGameSim,
  },
];

/**
 * 依据组件 ID 或别名（如 'wahlsystem', 'bundestagswahl', 'WahlsystemSim' 等）查找组件条目
 */
export function getPedagogyComponentEntry(idOrAlias: string): PedagogyRegistryEntry | undefined {
  if (!idOrAlias) return undefined;
  const normalized = idOrAlias.trim().toLowerCase();

  return PEDAGOGY_REGISTRY.find(
    (entry) =>
      entry.id.toLowerCase() === normalized ||
      entry.aliases.some((alias) => alias.toLowerCase() === normalized)
  );
}

/**
 * 依据组件 ID 或别名直接获取对应的 React 组件
 */
export function getPedagogyComponent(idOrAlias: string): React.ComponentType<any> | undefined {
  const entry = getPedagogyComponentEntry(idOrAlias);
  return entry?.component;
}

/**
 * 检查是否存在对应的教具组件
 */
export function hasPedagogyComponent(idOrAlias: string): boolean {
  return Boolean(getPedagogyComponentEntry(idOrAlias));
}

/**
 * 获取所有已注册的教具条目
 */
export function getAllPedagogyEntries(): PedagogyRegistryEntry[] {
  return PEDAGOGY_REGISTRY;
}
