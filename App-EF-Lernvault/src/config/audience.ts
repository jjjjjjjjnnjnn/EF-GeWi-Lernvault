import type { Block } from "../vault/parser";

export type AudienceId = "de-native" | "zh-bilingual" | "en-intl";

export interface AudienceProfile {
  id: AudienceId;
  name: string;
  description: string;
  defaultPureGerman: boolean;
  showAfbBadges: boolean;
  showOperatorenGuide: boolean;
  priorityVocabularyField: "definition" | "translation";
}

export const AUDIENCE_PROFILES: Record<AudienceId, AudienceProfile> = {
  "de-native": {
    id: "de-native",
    name: "Gymnasium NRW (Deutsch)",
    description: "Fokus auf Fachsprache, AFB I-III Operatoren und Klausur-Sätze. Ohne Übersetzungsschnickschnack.",
    defaultPureGerman: true,
    showAfbBadges: true,
    showOperatorenGuide: true,
    priorityVocabularyField: "definition",
  },
  "zh-bilingual": {
    id: "zh-bilingual",
    name: "Chinesisch-Deutsch (Bilingual)",
    description: "Zweisprachige Brücke mit CN-Methode, Glossarabgleich und intuitiven Metaphern.",
    defaultPureGerman: false,
    showAfbBadges: true,
    showOperatorenGuide: true,
    priorityVocabularyField: "translation",
  },
  "en-intl": {
    id: "en-intl",
    name: "International / European",
    description: "English-German academic interface for European and international curriculum exchange.",
    defaultPureGerman: false,
    showAfbBadges: true,
    showOperatorenGuide: true,
    priorityVocabularyField: "definition",
  },
};

export type Anforderungsbereich = "AFB I" | "AFB II" | "AFB III";

export interface OperatorInfo {
  operator: string;
  afb: Anforderungsbereich;
  definitionDe: string;
  definitionZh: string;
  klausurTippDe: string;
}

export const NRW_OPERATOREN: Record<string, OperatorInfo> = {
  // AFB I: Reproduktion
  nennen: {
    operator: "nennen",
    afb: "AFB I",
    definitionDe: "Elemente, Sachverhalte oder Begriffe ohne Erläuterung zielgerichtet auflisten.",
    definitionZh: "列举要素或概念，无需展开解释。",
    klausurTippDe: "Keine langen Sätze — reine präzise Stichpunkte genügen meist.",
  },
  darstellen: {
    operator: "darstellen",
    afb: "AFB I",
    definitionDe: "Sachverhalte, Zusammenhänge oder Methoden strukturiert und verständlich wiedergeben.",
    definitionZh: "系统阐述事实或理论，按逻辑结构展开。",
    klausurTippDe: "Auf logischen Aufbau und korrekte Fachbegriffe achten.",
  },
  skizzieren: {
    operator: "skizzieren",
    afb: "AFB I",
    definitionDe: "Einen Sachverhalt oder Ablauf in seinen Grundzügen übersichtlich darstellen.",
    definitionZh: "勾勒轮廓或基本要点。",
    klausurTippDe: "Nur wesentliche Konturen oder Leitlinien, keine Detailverliebtheit.",
  },
  beschreiben: {
    operator: "beschreiben",
    afb: "AFB I",
    definitionDe: "Phänomene, Strukturen oder Sachverhalte sachlich und mit Fachbegriffen erfassen.",
    definitionZh: "客观描述现象或结构，使用专业术语。",
    klausurTippDe: "Keine eigene Wertung einfließen lassen.",
  },
  wiedergeben: {
    operator: "wiedergeben",
    afb: "AFB I",
    definitionDe: "Inhalte oder Gedankengänge mit eigenen Worten sachbezogen zusammenfassen.",
    definitionZh: "用自己的语言概括核心内容。",
    klausurTippDe: "Prägnante Zusammenfassung ohne eigene Interpretation.",
  },

  // AFB II: Reorganisation & Transfer
  analysieren: {
    operator: "analysieren",
    afb: "AFB II",
    definitionDe: "Materialien, Texte oder Daten systematisch untersuchen und nach Kriterien zerlegen.",
    definitionZh: "按维度系统剖析文本或数据，揭示内在机制。",
    klausurTippDe: "Immer Textbelege (Zitate/Zeilen) oder Datenpunkte anführen!",
  },
  berechnen: {
    operator: "berechnen",
    afb: "AFB II",
    definitionDe: "Ergebnisse mittels mathematischer Rechenoperationen und Formeln herleiten.",
    definitionZh: "套用公式与运算法则求解数值结果。",
    klausurTippDe: "Ansatz hinschreiben! Auch Zwischenschritte bringen Teilpunkte.",
  },
  bestimmen: {
    operator: "bestimmen",
    afb: "AFB II",
    definitionDe: "Einen Wert oder eine Eigenschaft durch mathematische oder logische Verfahren ermitteln.",
    definitionZh: "通过数学或逻辑方法测定具体数值或特征。",
    klausurTippDe: "Genaue rechnerische oder grafische Ermittlung mit Angabe von Einheiten.",
  },
  erlaeutern: {
    operator: "erläutern",
    afb: "AFB II",
    definitionDe: "Einen Sachverhalt durch zusätzliche Informationen, Beispiele und Kausalitäten verdeutlichen.",
    definitionZh: "结合因果关系与实例深入阐明原理。",
    klausurTippDe: "Weil/Da-Konstruktionen nutzen: Ursache -> Wirkung aufzeigen.",
  },
  vergleichen: {
    operator: "vergleichen",
    afb: "AFB II",
    definitionDe: "Gemeinsamkeiten, Ähnlichkeiten und Unterschiede kriteriengeleitet gegenüberstellen.",
    definitionZh: "依据明确维度对比异同点。",
    klausurTippDe: "Nicht nacheinander abhandeln, sondern kriterienorientiert vergleichen!",
  },
  nachweisen: {
    operator: "nachweisen",
    afb: "AFB II",
    definitionDe: "Eine Aussage oder Formel durch lückenlose mathematische oder logische Argumentation belegen.",
    definitionZh: "通过严密数学推导或逻辑论证进行证明。",
    klausurTippDe: "Formale Schritte lückenlos darlegen (z. B. Grenzwertprozess).",
  },
  begruenden: {
    operator: "begründen",
    afb: "AFB II",
    definitionDe: "Einen Sachverhalt oder eine These durch stichhaltige Argumente und Kausalitäten absichern.",
    definitionZh: "给出充分论据与事实支撑结论。",
    klausurTippDe: "These -> Argument -> Beleg (TAB-Schema).",
  },
  untersuchen: {
    operator: "untersuchen",
    afb: "AFB II",
    definitionDe: "Einen Sachverhalt oder Gegenstand kriteriengeleitet prüfen und differenziert darstellen.",
    definitionZh: "依据特定标准进行全面检验分析。",
    klausurTippDe: "Prüfkriterien klar gliedern und durch Belege stützen.",
  },

  // AFB III: Reflexion & Problemlösung
  beurteilen: {
    operator: "beurteilen",
    afb: "AFB III",
    definitionDe: "Einen Sachverhalt anhand sachbezogener Kriterien (z. B. Effizienz, Machbarkeit) bewerten.",
    definitionZh: "基于客观事实与理性标准（如效率、可行性）做出专业评价。",
    klausurTippDe: "Sachurteil: Keine persönliche Emotionalität, sondern Kriterien anlegen!",
  },
  bewerten: {
    operator: "bewerten",
    afb: "AFB III",
    definitionDe: "Ein Sachurteil fällen und zusätzlich normative Wertmaßstäbe (z. B. Gerechtigkeit, Grundgesetz) einbeziehen.",
    definitionZh: "基于价值规范与伦理标准做出价值评估。",
    klausurTippDe: "Werturteil: Eigene ethische/normative Maßstäbe explizit benennen.",
  },
  eroertern: {
    operator: "erörtern",
    afb: "AFB III",
    definitionDe: "Eine Problemstellung dialektisch von mehreren Seiten beleuchten und zu einem begründeten Fazit kommen.",
    definitionZh: "正反两方面充分辩证剖析，最终给出深思熟虑的结论。",
    klausurTippDe: "Sanduhr-Prinzip: Erst Gegenseite abarbeiten, dann stärkere eigene Seite.",
  },
  stellung_nehmen: {
    operator: "Stellung nehmen",
    afb: "AFB III",
    definitionDe: "Nach sachlicher Abwägung eine eigene begründete Position beziehen.",
    definitionZh: "在客观权衡后明确亮出立场并做论证。",
    klausurTippDe: "Eindeutige Positionierung am Ende, kein Wischiwaschi.",
  },
};

export function getOperatorInfo(operatorName: string): OperatorInfo | null {
  const norm = operatorName.toLowerCase().replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").trim();
  for (const [k, v] of Object.entries(NRW_OPERATOREN)) {
    if (norm === k || norm.startsWith(k) || k.startsWith(norm)) return v;
  }
  return null;
}

export function getHighestAfb(operatoren: string[]): Anforderungsbereich {
  let highest: Anforderungsbereich = "AFB I";
  for (const op of operatoren) {
    const info = getOperatorInfo(op);
    if (!info) continue;
    if (info.afb === "AFB III") return "AFB III";
    if (info.afb === "AFB II") highest = "AFB II";
  }
  return highest;
}

/**
 * Checks if a block is predominantly Chinese or contains Chinese-only instructional scaffolding.
 */
export function isPureChineseText(text: string): boolean {
  if (!text) return false;
  const trimmed = text.trim();
  if (
    /^(?:中文理解|中文|CN-Methode|【中文】|口诀|判据)[:：]/.test(trimmed) ||
    trimmed.includes("CN-Methode") ||
    trimmed.startsWith("中文：") ||
    trimmed.startsWith("中文解读")
  ) {
    return true;
  }
  const chineseChars = (trimmed.match(/[\u4e00-\u9fa5]/g) || []).length;
  const totalChars = trimmed.replace(/\s+/g, "").length;
  return totalChars > 0 && chineseChars / totalChars > 0.45;
}

/**
 * Filter blocks for German native students:
 * Strips Chinese translation blocks and Chinese-only scaffolding so that local students
 * experience a pure, high-density German Gymnasium learning environment.
 */
export function filterBlocksForGermanNative(blocks: Block[]): Block[] {
  return blocks.filter((b) => {
    if (b.lang === "zh") return false;
    if (isPureChineseText(b.text)) return false;
    return true;
  });
}
