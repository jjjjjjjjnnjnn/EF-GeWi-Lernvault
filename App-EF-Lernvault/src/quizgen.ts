import type { VaultNote, Block } from "./vault/parser";

export type RubricCriterion = "operator" | "fachbegriff" | "beleg" | "vorgehen";

export interface RubricItem {
  id: RubricCriterion;
  name: string; // "Operator verfehlt" | "Fachbegriff falsch" | "Beleg fehlt"
  labelZH: string;
  descriptionDE: string;
  descriptionZH: string;
}

export const RUBRIC_CRITERIA: RubricItem[] = [
  {
    id: "operator",
    name: "Operator verfehlt",
    labelZH: "动词偏离",
    descriptionDE: "Aufgabenstellung und Operator (darstellen/analysieren/beurteilen) nicht exakt eingehalten.",
    descriptionZH: "未严格对照指令动词层级（AFB I/II/III）要求作答。",
  },
  {
    id: "fachbegriff",
    name: "Fachbegriff falsch",
    labelZH: "学科术语错用",
    descriptionDE: "Zentrale Fachtermini fehlen oder wurden sachlich unpräzise verwendet.",
    descriptionZH: "核心专业术语缺失或概念使用不准确。",
  },
  {
    id: "beleg",
    name: "Beleg fehlt",
    labelZH: "缺乏材料论据",
    descriptionDE: "Behauptungen ohne direkte Zitate oder Verweise auf das Material formuliert.",
    descriptionZH: "断言缺少对材料文本或数据的具体行号/段落引用。",
  },
  {
    id: "vorgehen",
    name: "Vorgehen falsch",
    labelZH: "程序选择错误",
    descriptionDE:
      "Lösungsverfahren bzw. Begriffswahl falsch oder das Warum nicht begründet (Prozessdimension, gleichgewichtet mit Ergebnis: je −2, Operator −3).",
    descriptionZH: "解题程序/概念选错，或未论证“为什么用它”（过程维，与结果项等权重：各 −2，动词偏离 −3）。",
  },
];

export type QuizTaskKind = "standard" | "discrimination" | "contrast";

export interface QuizTask {
  operator: "darstellen" | "analysieren" | "beurteilen";
  afb: "AFB I" | "AFB II" | "AFB III";
  kind?: QuizTaskKind; // default "standard" (AFB triple); v3 optional tasks use discrimination/contrast
  leadDE: string;
  leadZH: string;
  promptDE: string;
  promptZH: string;
  sourceRef: string; // Pflicht (Zitierpflicht): discrimination/contrast builders throw on empty
}

export interface GeneratedQuiz {
  thema: string;
  fach: string;
  notePath: string;
  materialQuote: string;
  tasks: QuizTask[];
}

// Fallback exemplar when vault is empty or notes lack klausurrelevant tag
export const MOCK_QUIZ: GeneratedQuiz = {
  thema: "Soziale Ungleichheit",
  fach: "SoWi",
  notePath: "08_SoWi/Soziale-Ungleichheit.md",
  materialQuote:
    "„Die Dimensionen sozialer Ungleichheit erfassen materielle wie immaterielle Vor- und Nachteile in der Gesellschaft: Einkommen, Vermögen, Bildung, Berufsposition und Macht. Das Grundgesetz verpflichtet die Bundesrepublik als sozialen Bundesstaat (Art. 20 Abs. 1 GG) zum Ausgleich sozialer Gegensätze und zur Gewährleistung von Chancengerechtigkeit.“",
  tasks: [
    {
      operator: "darstellen",
      afb: "AFB I",
      leadDE: "Worum geht es im Material?",
      leadZH: "材料讲什么？",
      promptDE:
        "Stellen Sie die im Material genannten Dimensionen sozialer Ungleichheit und das verfassungsrechtliche Ziel des Sozialstaatsgebots dar.",
      promptZH: "概述材料中提及的社会不平等维度及《基本法》中社会国家原则的宪法目标。",
      sourceRef: "08_SoWi/Soziale-Ungleichheit.md#1",
    },
    {
      operator: "analysieren",
      afb: "AFB II",
      leadDE: "Ursachen, Folgen, Akteure mit Fachbegriffen belegen",
      leadZH: "原因、后果、行动者——用术语论证",
      promptDE:
        "Analysieren Sie den Zusammenhang zwischen Bildungschancen und Einkommensverteilung unter Verwendung der Fachbegriffe (z. B. soziale Mobilität, Statuserhalt).",
      promptZH: "运用专业术语（如社会流动、阶层复制）分析教育机会与收入分配之间的内在联系。",
      sourceRef: "08_SoWi/Soziale-Ungleichheit.md#2",
    },
    {
      operator: "beurteilen",
      afb: "AFB III",
      leadDE: "Kriterien nennen, dann eigenes Urteil formulieren",
      leadZH: "先亮标准，再下判断",
      promptDE:
        "Beurteilen Sie kriteriengeleitet (z. B. Chancengerechtigkeit vs. Leistungsgerechtigkeit), inwieweit staatliche Bildungsinvestitionen soziale Ungleichheit effektiv verringern können.",
      promptZH: "基于明确评价标准（如机会公平 vs 绩效公平），评判国家教育投入在多大程度上能够有效缓解社会不平等。",
      sourceRef: "08_SoWi/Soziale-Ungleichheit.md#3",
    },
  ],
};

function extractQuote(blocks: Block[]): string {
  const quoteBlocks = blocks.filter((b) => b.kind === "quote" || (b.kind === "p" && b.lang === "de"));
  if (quoteBlocks.length > 0) {
    return quoteBlocks[0].text;
  }
  return "Kein Materialblock in der Notiz gefunden. / 笔记中未找到正文材料块。";
}

export function generateQuizFromNote(note: VaultNote): GeneratedQuiz {
  const materialQuote = extractQuote(note.blocks);
  const notePath = note.path || `${note.fach}/${note.thema}.md`;

  const tasks: QuizTask[] = [
    {
      operator: "darstellen",
      afb: "AFB I",
      leadDE: "Worum geht es im Material? (3-Satz-Einleitung: Thema + Material + These)",
      leadZH: "材料讲什么？（三句导语：主题+材料+核心论点）",
      promptDE: `Stellen Sie die Kernaussagen des Materials zum Thema „${note.thema}“ strukturiert dar.`,
      promptZH: `结构化概述材料关于“${note.thema}”的核心陈述与基本论点。`,
      sourceRef: `${notePath}#1`,
    },
    {
      operator: "analysieren",
      afb: "AFB II",
      leadDE: "Ursachen, Folgen, Akteure mit Fachbegriffen belegen",
      leadZH: "原因、后果、行动者——用专业术语深入分析",
      promptDE: `Analysieren Sie die Zusammenhänge, Wirkungsmechanismen und beteiligten Akteure im Sachverhalt „${note.thema}“ kriterienorientiert mit präzisen Fachtermini.`,
      promptZH: `运用规范学科术语深入分析“${note.thema}”中涉及的因果机制与各方行动者关系。`,
      sourceRef: `${notePath}#2`,
    },
    {
      operator: "beurteilen",
      afb: "AFB III",
      leadDE: "Kriterien nennen, dann eigenes Urteil formulieren",
      leadZH: "明确评判标准，给出有理有据的权衡评价",
      promptDE: `Beurteilen Sie die im Kontext von „${note.thema}“ getroffenen Maßnahmen bzw. Thesen kriteriengeleitet (z. B. Effizienz, Legitimität, Gerechtigkeit).`,
      promptZH: `基于明确标准（如效率、合法性、公平性），对“${note.thema}”相关措施或观点进行权衡评价。`,
      sourceRef: `${notePath}#3`,
    },
  ];

  return {
    thema: note.thema,
    fach: note.fach,
    notePath,
    materialQuote,
    tasks,
  };
}

export function buildDiscriminationTask(
  thema: string,
  optionA: string,
  optionB: string,
  sourceRef: string
): QuizTask {
  if (!sourceRef || !sourceRef.trim()) {
    throw new Error("discrimination task requires non-empty sourceRef (Zitierpflicht).");
  }
  return {
    operator: "analysieren",
    afb: "AFB II",
    kind: "discrimination",
    leadDE: "Welches Verfahren passt — und warum?",
    leadZH: "这题用哪个程序/概念，为什么？",
    promptDE: `Gegeben zwei leicht verwechselbare Verfahren/Begriffe („${optionA}“ vs. „${optionB}“): Entscheiden Sie begründet, welches auf „${thema}“ anzuwenden ist, und legen Sie das Warum mit Fachbegriffen und einem Materialbeleg dar.`,
    promptZH: `给出两个易混程序/概念（“${optionA}” vs “${optionB}”）：判断“${thema}”本题该用哪一个并说明为什么，须用学科术语+材料依据论证。`,
    sourceRef,
  };
}

export function buildContrastTask(
  thema: string,
  loesungA: string,
  loesungB: string,
  sourceRef: string
): QuizTask {
  if (!sourceRef || !sourceRef.trim()) {
    throw new Error("contrast task requires non-empty sourceRef (Zitierpflicht).");
  }
  return {
    operator: "beurteilen",
    afb: "AFB III",
    kind: "contrast",
    leadDE: "Zwei Lösungen vergleichen: Unterschiede, Stärken, Schwächen",
    leadZH: "AB两解对比：差异与优劣",
    promptDE: `Vergleichen Sie die Lösungswege A („${loesungA}“) und B („${loesungB}“) zu „${thema}“ (vgl. ${sourceRef}): Arbeiten Sie Unterschiede heraus und beurteilen Sie kriteriengeleitet Stärken und Schwächen beider Wege mit Materialbeleg.`,
    promptZH: `对比关于“${thema}”的A解（“${loesungA}”）与B解（“${loesungB}”）（见${sourceRef}）：指出差异，并基于明确标准评判两解优劣，须附材料依据。`,
    sourceRef,
  };
}

export interface ExtendedQuizOptions {
  discrimination?: { optionA: string; optionB: string };
  contrast?: { loesungA: string; loesungB: string };
}

// AFB triple stays tasks[0..2]; v3 types append as optional tasks[3..4] only.
export function generateExtendedQuiz(note: VaultNote, opts?: ExtendedQuizOptions): GeneratedQuiz {
  const base = generateQuizFromNote(note);
  const notePath = base.notePath;
  const extra: QuizTask[] = [];
  if (opts?.discrimination) {
    extra.push(
      buildDiscriminationTask(
        base.thema,
        opts.discrimination.optionA,
        opts.discrimination.optionB,
        `${notePath}#4`
      )
    );
  }
  if (opts?.contrast) {
    extra.push(
      buildContrastTask(
        base.thema,
        opts.contrast.loesungA,
        opts.contrast.loesungB,
        `${notePath}#${extra.length + 4}`
      )
    );
  }
  return { ...base, tasks: [...base.tasks, ...extra] };
}

export function getAvailableThemen(notes: VaultNote[] | null): { thema: string; fach: string; note: VaultNote }[] {
  if (!notes || notes.length === 0) return [];
  return notes
    .filter((n) => n.klausurrelevant)
    .map((n) => ({ thema: n.thema, fach: n.fach, note: n }));
}
