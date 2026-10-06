// diagnostics.ts — Strukturierte Diagnose-Codes (D1–D5 & MINT-BE) und Fehlerlog-Kopplung
// Verbindet KlausurSim-Selbstdiagnose mit Obsidian-Fehlerlog-Patches und FSRS-Gewichtung.

export type DiagnosticCodeCategory = "D1_D5" | "MINT_BE";

export interface DiagnosticCodeDefinition {
  code: string;
  nameDE: string;
  nameZH: string;
  category: DiagnosticCodeCategory;
  standardTarget: number | boolean; // D-Scores: target threshold; BE: target true
  descriptionDE: string;
  remedyDE: string;
  remedyZH: string;
  ankiPriorityBoost: number; // Stufenfaktor für FSRS-Priorisierung
}

export const DIAGNOSTIC_CODES: Record<string, DiagnosticCodeDefinition> = {
  D1: {
    code: "D1",
    nameDE: "Aufgabenbezug & Stringenz",
    nameZH: "审题与论证严谨度",
    category: "D1_D5",
    standardTarget: 5,
    descriptionDE: "Aufgabenstellung nicht präzise gespiegelt oder Gedankengang weist strukturelle Brüche auf.",
    remedyDE: "Operator im Einleitungssatz explizit spiegeln und These-Begründung-Beleg-Rückbezug strikt einhalten.",
    remedyZH: "在首句直接呼应题目 Operator，论点-论据-例证-回扣必须形成严密闭环。",
    ankiPriorityBoost: 3,
  },
  D2: {
    code: "D2",
    nameDE: "Drei-Ebenen-Trennung",
    nameZH: "三层次分离（描述/分析/评价）",
    category: "D1_D5",
    standardTarget: 4,
    descriptionDE: "Verschwommene Abgrenzung zwischen Textbefund (Deskription), Funktion (Analyse) und Wertung.",
    remedyDE: "Klare Signalwörter nutzen: 'Der Text formuliert...' vs. 'Dies fungiert als...' vs. 'Kritisch ist einzuwenden...'.",
    remedyZH: "严禁夹叙夹议混为一谈，使用明确的路标词严格区分文本原意、修辞功能与个人评判。",
    ankiPriorityBoost: 2,
  },
  D3: {
    code: "D3",
    nameDE: "Beleg- & Zitiertechnik",
    nameZH: "引证与文本依据规范",
    category: "D1_D5",
    standardTarget: 3,
    descriptionDE: "Isolierte Zitat-Inseln oder fehlende/unpräzise Zeilennachweise (Z. 12f.).",
    remedyDE: "Zitate syntaktisch flüssig in den eigenen Satz einbetten; Konjunktiv I bei indirekter Rede anwenden.",
    remedyZH: "消除孤立引用块，将引文自然嵌入自身主谓句，间接引述严格使用第一第一虚拟式（Konjunktiv I）。",
    ankiPriorityBoost: 2,
  },
  D4: {
    code: "D4",
    nameDE: "Fachsprache & Differenzierung",
    nameZH: "学科术语与高阶学术表达",
    category: "D1_D5",
    standardTarget: 4,
    descriptionDE: "Alltagssprachliche Formulierungen statt präziser theoretischer Fachtermini.",
    remedyDE: "Fachbegriffe und theoriegeleitete Kriterienkataloge einsetzen (Nominalstil / akademischer Wortschatz).",
    remedyZH: "用精准的学科核心术语替代日常口语词，善用名词化复合词与专业判断标准。",
    ankiPriorityBoost: 3,
  },
  D5: {
    code: "D5",
    nameDE: "Sprachliche Richtigkeit & Satzverknüpfung",
    nameZH: "语言正确性与复合句衔接",
    category: "D1_D5",
    standardTarget: 4,
    descriptionDE: "Verknüpfungsmängel, Hauptsatz-Aneinanderreihung oder Grammatik-/Orthographiefehler.",
    remedyDE: "Kausale, konzessive und finale Konjunktionen (Infolgedessen, Obschon, Damit) gezielt einsetzen.",
    remedyZH: "运用因果、让步和目的状语从句提升学术句型张力，杜绝单调简单句堆砌。",
    ankiPriorityBoost: 2,
  },
  BE_ANSATZ: {
    code: "BE-Ansatz",
    nameDE: "Formelansatz & Modellierung",
    nameZH: "模型建立与基本公式起步",
    category: "MINT_BE",
    standardTarget: true,
    descriptionDE: "Fehlender oder fehlerhafter mathematischer/physikalischer Grundansatz vor dem Einsetzen.",
    remedyDE: "Allgemeine Formel/Grundgleichung explizit hinschreiben (z. B. f'(x)=0, v=s'(t)), bevor Zahlen eingesetzt werden.",
    remedyZH: "代入数值前必须先显式写出通用定律公式或极值判别原式，保障起步得分点。",
    ankiPriorityBoost: 3,
  },
  BE_EINHEITEN: {
    code: "BE-Einheiten",
    nameDE: "Einheitenführung & Konsistenz",
    nameZH: "量纲单位与全过程带单位",
    category: "MINT_BE",
    standardTarget: true,
    descriptionDE: "Vergessene oder dimensionslose Einheiten in Zwischenrechnungen oder im Endergebnis.",
    remedyDE: "SI-Einheiten konsequent in allen Zeilen mitführen; Pauschalabzug (-1 BE) aktiv vermeiden.",
    remedyZH: "严禁出现无量纲裸数字，计算每一步与最终结果均严格规范标注 SI 单位。",
    ankiPriorityBoost: 2,
  },
  BE_GENAUIGKEIT: {
    code: "BE-Genauigkeit",
    nameDE: "Rechnerische Genauigkeit & Rundung",
    nameZH: "计算精度与有效数字",
    category: "MINT_BE",
    standardTarget: true,
    descriptionDE: "Verfrühtes Runden in Zwischenschritten oder Nichtbeachtung signifikanter Stellen.",
    remedyDE: "Zwischenergebnisse im Taschenrechner speichern; Endwert erst am Schluss auf 2–3 signifikante Stellen runden.",
    remedyZH: "中间过程保留存储变量不提前四舍五入，最终答案严格按题目给定有效数字规范截断。",
    ankiPriorityBoost: 2,
  },
  BE_ANTWORTSATZ: {
    code: "BE-Antwortsatz",
    nameDE: "Kontextbezogener Antwortsatz & Deutung",
    nameZH: "情境结论句与物理/现实意义诠释",
    category: "MINT_BE",
    standardTarget: true,
    descriptionDE: "Reine Zahl ohne Einbettung in den Sachkontext der Aufgabe.",
    remedyDE: "Immer einen vollständigen Antwortsatz mit Subjekt, Zahl, Einheit und kontextueller Bedeutung formulieren.",
    remedyZH: "绝不只给孤立得数，必须完整写出包含主语、数值、单位及现实内涵的德语结论句。",
    ankiPriorityBoost: 2,
  },
};

export interface DiagnosticEvaluation {
  fach: string;
  dScores?: { d1: number; d2: number; d3: number; d4: number; d5: number };
  mintChecks?: Record<string, boolean>;
}

export interface DetectedDiagnosticIssue {
  code: string;
  definition: DiagnosticCodeDefinition;
  actualScoreOrStatus: string;
  expected: string;
}

/**
 * Analysiert D1–D5 und MINT-Checks und extrahiert die konkreten Defizite.
 */
export function detectDiagnosticIssues(evalData: DiagnosticEvaluation): DetectedDiagnosticIssue[] {
  const issues: DetectedDiagnosticIssue[] = [];

  if (evalData.dScores) {
    const { d1, d2, d3, d4, d5 } = evalData.dScores;
    // D1 Target: 5 (Schwäche bei <= 3)
    if (d1 < 4) {
      issues.push({
        code: "D1",
        definition: DIAGNOSTIC_CODES.D1,
        actualScoreOrStatus: `${d1}/5 P.`,
        expected: "≥ 4/5 P.",
      });
    }
    // D2 Target: 4 (Schwäche bei <= 2)
    if (d2 < 3) {
      issues.push({
        code: "D2",
        definition: DIAGNOSTIC_CODES.D2,
        actualScoreOrStatus: `${d2}/4 P.`,
        expected: "≥ 3/4 P.",
      });
    }
    // D3 Target: 3 (Schwäche bei <= 1)
    if (d3 < 2) {
      issues.push({
        code: "D3",
        definition: DIAGNOSTIC_CODES.D3,
        actualScoreOrStatus: `${d3}/3 P.`,
        expected: "≥ 2/3 P.",
      });
    }
    // D4 Target: 4 (Schwäche bei <= 2)
    if (d4 < 3) {
      issues.push({
        code: "D4",
        definition: DIAGNOSTIC_CODES.D4,
        actualScoreOrStatus: `${d4}/4 P.`,
        expected: "≥ 3/4 P.",
      });
    }
    // D5 Target: 4 (Schwäche bei <= 2)
    if (d5 < 3) {
      issues.push({
        code: "D5",
        definition: DIAGNOSTIC_CODES.D5,
        actualScoreOrStatus: `${d5}/4 P.`,
        expected: "≥ 3/4 P.",
      });
    }
  }

  if (evalData.mintChecks) {
    if (!evalData.mintChecks.formelansatz) {
      issues.push({
        code: "BE-Ansatz",
        definition: DIAGNOSTIC_CODES.BE_ANSATZ,
        actualScoreOrStatus: "Nicht erfüllt",
        expected: "Erfüllt (Ansatz explizit)",
      });
    }
    if (!evalData.mintChecks.einheiten) {
      issues.push({
        code: "BE-Einheiten",
        definition: DIAGNOSTIC_CODES.BE_EINHEITEN,
        actualScoreOrStatus: "Nicht erfüllt",
        expected: "Erfüllt (SI-Einheiten konsistent)",
      });
    }
    if (!evalData.mintChecks.genauigkeit) {
      issues.push({
        code: "BE-Genauigkeit",
        definition: DIAGNOSTIC_CODES.BE_GENAUIGKEIT,
        actualScoreOrStatus: "Nicht erfüllt",
        expected: "Erfüllt (Rundung & signifikante Stellen)",
      });
    }
    if (!evalData.mintChecks.antwortsatz) {
      issues.push({
        code: "BE-Antwortsatz",
        definition: DIAGNOSTIC_CODES.BE_ANTWORTSATZ,
        actualScoreOrStatus: "Nicht erfüllt",
        expected: "Erfüllt (Antwortsatz im Kontext)",
      });
    }
  }

  return issues;
}

/**
 * Erzeugt formatierte Zeilen für das Obsidian Fehlerlog mit Diagnose-Codes.
 */
export function buildDiagnosticFehlerlogRows(
  _fach: string,
  thema: string,
  issues: DetectedDiagnosticIssue[],
  datum?: string
): string[] {
  const dateStr = datum || new Date().toISOString().slice(0, 10);
  return issues.map((issue) => {
    const typ = issue.definition.category === "D1_D5" ? "Fachsprache/Ausdruck" : "Logik/Begründung";
    const fehler = `[${issue.code}] ${issue.definition.nameDE}: ${issue.actualScoreOrStatus} (Soll: ${issue.expected})`;
    const loesung = `${issue.definition.remedyDE} — *Merksatz:* ${issue.definition.remedyZH}`;
    return `| ${dateStr} | ${thema} | ${typ} | ${fehler} | ${loesung} |`;
  });
}
