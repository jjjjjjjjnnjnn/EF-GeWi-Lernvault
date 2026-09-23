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

export interface FehlerlogDefizit {
  operatorVerfehlt: boolean;
  fachbegriffFalsch: boolean;
  belegFehlt: boolean;
  vorgehenFalsch: boolean;
}

export interface KlausurFehlerlogPatchInput {
  fach: string;
  thema: string;
  notePath: string;
  date: string;
  time: string;
  evaluations: readonly FehlerlogDefizit[];
}

export interface VergleichFehlerlogPatchInput {
  fach: string;
  thema: string;
  sourceRef: string;
  date: string;
  isCorrect: boolean;
  selectedOption: "A" | "B" | null;
  justification: string;
  nextTime: string;
}

function formatFehlerlogDefizite(evaluations: readonly FehlerlogDefizit[]): string {
  return (
    evaluations
      .map((evaluation, index) => {
        const deficits: string[] = [];
        if (evaluation.operatorVerfehlt) deficits.push(`Teil ${index + 1}: Operator verfehlt`);
        if (evaluation.fachbegriffFalsch) deficits.push(`Teil ${index + 1}: Fachbegriff unpräzise`);
        if (evaluation.belegFehlt) deficits.push(`Teil ${index + 1}: Beleg fehlt`);
        if (evaluation.vorgehenFalsch) deficits.push(`Teil ${index + 1}: Vorgehen falsch`);
        return deficits.join(", ");
      })
      .filter(Boolean)
      .join("; ") || "Keine gravierenden Mängel"
  );
}

export function buildKlausurFehlerlogPatch(input: KlausurFehlerlogPatchInput): string {
  return `--- Fehlerlog.md
+++ Fehlerlog.md
+ - [ ] [${input.fach}] Thema: ${input.thema} (Klausur-Drill)
+   - Datum: ${input.date}
+   - Zeit: ${input.time} (Ziel 45 Min)
+   - Defizite: ${formatFehlerlogDefizite(input.evaluations)}
+   - Belegstelle: ${input.notePath}
`;
}

export function buildVergleichFehlerlogPatch(input: VergleichFehlerlogPatchInput): string {
  return `--- Fehlerlog.md
+++ Fehlerlog.md
+ - [ ] [${input.fach}] Vergleich: ${input.thema}
+   - Datum: ${input.date}
+   - Ergebnis: ${input.isCorrect ? "Richtig" : "Falsch (gute Signale zur Schärfung)"}
+   - Gewählt: Option ${input.selectedOption || "-"}
+   - Begründung: ${input.justification.trim() || "(keine Angabe)"}
+   - Nächstes Mal: ${input.nextTime.trim() || "Erst Operator markieren"}
+   - Belegstelle: ${input.sourceRef}
`;
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

export interface ComparisonColumn {
  titleDE: string;
  titleZH: string;
  quoteSegments: { text: string; highlight?: boolean }[]; // max 3 highlights per column
  conclusionDE: string;
  conclusionZH: string;
}

export interface VergleichItem {
  id: string;
  fach: string;
  thema: string;
  operator: string;
  afb: string;
  promptDE: string;
  promptZH: string;
  sourceRef: string;
  materialQuote: string;
  optionA: {
    labelDE: string;
    labelZH: string;
    column: ComparisonColumn;
  };
  optionB: {
    labelDE: string;
    labelZH: string;
    column: ComparisonColumn;
  };
  correctOption: "A" | "B";
  krFeedbackDE: string;
  krFeedbackZH: string;
  explanationQuote: string;
  rubrics: {
    // V3-aligned 4-dim rubric (operator/fachbegriff/beleg/vorgehen); template rules need no citation.
    operatorVerfehlt: boolean;
    fachbegriffFalsch: boolean;
    belegFehlt: boolean;
    vorgehenFalsch: boolean;
  };
}

export const MOCK_VERGLEICH_ITEMS: VergleichItem[] = [
  {
    id: "v-sowi-1",
    fach: "SoWi",
    thema: "Wirtschaftsordnung & Staat",
    operator: "vergleichen",
    afb: "AFB II",
    promptDE:
      "Welche Wirtschaftsordnung kombiniert das Prinzip des freien Marktes mit verfassungsrechtlich garantiertem sozialem Ausgleich? Begründen Sie Ihre Wahl in einem Satz.",
    promptZH:
      "哪种经济秩序将自由市场竞争与宪法保障的社会平衡相结合？请用一句话说明你的选择依据。",
    sourceRef: "08_SoWi/Soziale-Marktwirtschaft.md#12",
    materialQuote:
      "„Die Wirtschaftsordnung der Bundesrepublik Deutschland beruht auf dem Konzept der Sozialen Marktwirtschaft. Sie verbindet die Freiheit auf dem Markt mit dem Prinzip des sozialen Ausgleichs (Art. 20 Abs. 1 GG).“",
    optionA: {
      labelDE: "A: Freie Marktwirtschaft",
      labelZH: "A: 自由市场经济",
      column: {
        titleDE: "A · Freie Marktwirtschaft",
        titleZH: "A · 自由市场经济",
        quoteSegments: [
          { text: "Das Marktgeschehen basiert auf " },
          { text: "reiner Selbstregulierung", highlight: true },
          { text: " von Angebot und Nachfrage. Der Staat fungiert als " },
          { text: "Nachtwächterstaat", highlight: true },
          { text: " ohne sozialpolitische Eingriffe und " },
          { text: "ohne Umverteilung", highlight: true },
          { text: "." },
        ],
        conclusionDE: "Reiner Marktmechanismus ohne Garantie von Chancengerechtigkeit.",
        conclusionZH: "纯粹市场自发调节，不提供社会公平保障。",
      },
    },
    optionB: {
      labelDE: "B: Soziale Marktwirtschaft",
      labelZH: "B: 社会市场经济",
      column: {
        titleDE: "B · Soziale Marktwirtschaft",
        titleZH: "B · 社会市场经济",
        quoteSegments: [
          { text: "Verbindung der Marktfreiheit mit dem Prinzip des " },
          { text: "sozialen Ausgleichs", highlight: true },
          { text: ". Der Staat setzt eine wettbewerbliche " },
          { text: "Rahmenordnung", highlight: true },
          { text: " durch und sichert das " },
          { text: "Sozialstaatsgebot (Art. 20 GG)", highlight: true },
          { text: "." },
        ],
        conclusionDE: "Wettbewerb plus staatliche Sicherung zur Abfederung sozialer Härten.",
        conclusionZH: "竞争机制结合国家安全网，有效缓冲贫富分化。",
      },
    },
    correctOption: "B",
    krFeedbackDE: "Richtig: B garantiert den sozialen Ausgleich durch das Sozialstaatsgebot.",
    krFeedbackZH: "正确：B 依据宪法社会国家原则确保了社会平衡。",
    explanationQuote:
      "„Die Soziale Marktwirtschaft verbindet das Prinzip der Freiheit auf dem Markt mit dem des sozialen Ausgleichs (Alfred Müller-Armack).“",
    rubrics: {
      operatorVerfehlt: false,
      fachbegriffFalsch: false,
      belegFehlt: false,
      vorgehenFalsch: false,
    },
  },
  {
    id: "v-philo-1",
    fach: "Philosophie",
    thema: "Ethik & Menschenbild",
    operator: "analysieren",
    afb: "AFB II",
    promptDE:
      "Welcher ethische Ansatz beurteilt die moralische Richtigkeit einer Handlung primär nach den absehbaren Handlungsfolgen für das Gesamtwohl?",
    promptZH:
      "哪种伦理学路径主要依据行为对整体福祉的可预见后果来评判道德品质？",
    sourceRef: "07_Philosophie/Utilitarismus-vs-Kant.md#8",
    materialQuote:
      "„Während die Pflichtethik Kants den moralischen Wert einer Handlung im guten Willen und der Gesetzmäßigkeit der Maxime verortet, beurteilt der Utilitarismus Handlungen ausschließlich teleologisch nach ihren Konsequenzen.“",
    optionA: {
      labelDE: "A: Pflichtethik (Kant)",
      labelZH: "A: 康德义务论",
      column: {
        titleDE: "A · Pflichtethik (Kant)",
        titleZH: "A · 康德义务论",
        quoteSegments: [
          { text: "Handeln aus reiner " },
          { text: "Pflicht und Achtung", highlight: true },
          { text: " vor dem Sittengesetz. Der " },
          { text: "Kategorische Imperativ", highlight: true },
          { text: " gilt absolut, " },
          { text: "ungeachtet der Folgen", highlight: true },
          { text: "." },
        ],
        conclusionDE: "Deontologischer Ansatz: Handlungen sind an sich gut oder verwerflich.",
        conclusionZH: "道义论取向：行为本身即有善恶，不看后果。",
      },
    },
    optionB: {
      labelDE: "B: Utilitarismus (Bentham/Mill)",
      labelZH: "B: 功利主义",
      column: {
        titleDE: "B · Utilitarismus (Bentham/Mill)",
        titleZH: "B · 功利主义",
        quoteSegments: [
          { text: "Teleologisches Prinzip: Maßstab ist das " },
          { text: "größte Glück der größten Zahl", highlight: true },
          { text: ". Entscheidend ist die " },
          { text: "Nutzenbilanz", highlight: true },
          { text: " aller " },
          { text: "tatsächlichen Konsequenzen", highlight: true },
          { text: "." },
        ],
        conclusionDE: "Konsequentialistischer Ansatz: Der Zweck bzw. das Gesamtergebnis bemisst den Wert.",
        conclusionZH: "后果主义取向：行为的实际后果与总体功利决定价值。",
      },
    },
    correctOption: "B",
    krFeedbackDE: "Richtig: B bewertet Handlungen teleologisch nach dem Gesamtnutzen.",
    krFeedbackZH: "正确：B 采取后果主义原则，以最大效益评估行为。",
    explanationQuote:
      "„Die Maxime des Utilitarismus lautet: Das größte Glück der größten Zahl durch Nutzenabwägung aller Betroffenen.“",
    rubrics: {
      operatorVerfehlt: false,
      fachbegriffFalsch: false,
      belegFehlt: false,
      vorgehenFalsch: false,
    },
  },
  {
    id: "v-sowi-2",
    fach: "SoWi",
    thema: "Soziale Ungleichheit",
    operator: "beurteilen",
    afb: "AFB III",
    promptDE:
      "Welches Kriterium verlangt gleiche Ausgangsbedingungen und Bildungszugänge unabhängig von der Herkunft, akzeptiert jedoch Leistungsunterschiede?",
    promptZH:
      "哪个标准要求不看家庭出身的一致起跑线与受教育机会，但认可后续个人绩效带来的差异？",
    sourceRef: "08_SoWi/Soziale-Ungleichheit.md#24",
    materialQuote:
      "„Chancengerechtigkeit zielt auf den Abbau herkunftsbedingter Bildungsbarrieren, während Ergebnisgerechtigkeit eine nachträgliche Umverteilung zur Angleichung materieller Lebensverhältnisse verlangt.“",
    optionA: {
      labelDE: "A: Chancengerechtigkeit",
      labelZH: "A: 机会公平",
      column: {
        titleDE: "A · Chancengerechtigkeit",
        titleZH: "A · 机会公平",
        quoteSegments: [
          { text: "Forderung nach " },
          { text: "gleichen Startbedingungen", highlight: true },
          { text: " beim Bildungszugang. Soziale Herkunft darf nicht über den " },
          { text: "Lebensweg entscheiden", highlight: true },
          { text: ", bei " },
          { text: "offenem Wettbewerb", highlight: true },
          { text: "." },
        ],
        conclusionDE: "Verfahrensgerechtigkeit: Startgleichheit bei leistungsorientiertem Ausgang.",
        conclusionZH: "程序与起点公平：起跑线一致，承认能力与努力差异。",
      },
    },
    optionB: {
      labelDE: "B: Ergebnisgerechtigkeit",
      labelZH: "B: 结果公平",
      column: {
        titleDE: "B · Ergebnisgerechtigkeit",
        titleZH: "B · 结果公平",
        quoteSegments: [
          { text: "Forderung nach " },
          { text: "Angleichung der Endverteilung", highlight: true },
          { text: " von Einkommen und Gütern, um " },
          { text: "materielle Spaltung", highlight: true },
          { text: " unabhängig von individueller Leistung " },
          { text: "weitgehend aufzuheben", highlight: true },
          { text: "." },
        ],
        conclusionDE: "Verteilungsgerechtigkeit: Egalitäre Angleichung der Lebensverhältnisse.",
        conclusionZH: "分配结果公平：缩小贫富差距，实现生活水准实质均等。",
      },
    },
    correctOption: "A",
    krFeedbackDE: "Richtig: A zielt auf den Abbau herkunftsbedingter Startnachteile ab.",
    krFeedbackZH: "正确：A 聚焦消除家庭出身造成的起点劣势。",
    explanationQuote:
      "„Chancengerechtigkeit ist das zentrale Verfassungskriterium moderner Sozialstaaten zur Verringerung reproduzierter Bildungsungleichheit.“",
    rubrics: {
      operatorVerfehlt: false,
      fachbegriffFalsch: false,
      belegFehlt: false,
      vorgehenFalsch: false,
    },
  },
];

function slugifyThema(s: string): string {
  const slug = s
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]+/g, "")
    .slice(0, 40);
  return slug || "thema";
}

function pickDeTexts(note: VaultNote, count: number): string[] {
  const pool = note.blocks
    .filter(
      (b) =>
        b.lang === "de" &&
        (b.kind === "p" || b.kind === "li" || b.kind === "quote" || b.kind === "h2" || b.kind === "h3")
    )
    .map((b) => b.text.trim())
    .filter((t) => t.length >= 4);
  const out: string[] = [];
  for (const t of pool) {
    if (!out.includes(t)) out.push(t);
    if (out.length >= count) break;
  }
  return out;
}

function shortLabel(text: string, max = 28): string {
  const t = text.replace(/\s+/g, " ").trim();
  return t.length <= max ? t : t.slice(0, max - 1).trimEnd() + "…";
}

// Split note text into segments, max 3 highlights (underline+bold only, no color blocks).
function toQuoteSegments(text: string): ComparisonColumn["quoteSegments"] {
  const clean = text.replace(/\s+/g, " ").trim() || "Kein Materialtext. / 无材料文本。";
  const words = clean.split(" ");
  if (words.length <= 6) return [{ text: clean }];
  const size = Math.max(2, Math.ceil(words.length / 7));
  const segs: ComparisonColumn["quoteSegments"] = [];
  let highlights = 0;
  for (let i = 0; i < words.length; i += size) {
    const chunk = words.slice(i, i + size).join(" ") + (i + size < words.length ? " " : "");
    const col = Math.floor(i / size);
    if ((col === 1 || col === 3 || col === 5) && highlights < 3) {
      segs.push({ text: chunk, highlight: true });
      highlights++;
    } else {
      segs.push({ text: chunk });
    }
  }
  return segs;
}

// True pipeline: one VergleichItem per vault note, prompts built via the
// discrimination/contrast builders so sourceRef (notePath#Zeile) never breaks (Zitierpflicht).
function buildVergleichFromNote(note: VaultNote, idx: number): VergleichItem {
  const notePath = note.path || `${note.fach}/${note.thema}.md`;
  const materialQuote = extractQuote(note.blocks);
  const deTexts = pickDeTexts(note, 3);
  const rawA =
    note.operatoren[0]?.trim() || (deTexts[0] ? shortLabel(deTexts[0]) : `${note.thema} · Verfahren A`);
  const rawB =
    note.operatoren[1]?.trim() ||
    (deTexts[1] ? shortLabel(deTexts[1]) : `${note.thema} · Verfahren B`);
  const optionA = rawA === rawB ? `${rawA} (A)` : rawA;
  const optionB = rawA === rawB ? `${rawB} (B)` : rawB;
  // Both builders throw on empty sourceRef: our refs are always `notePath#Zeile`.
  const disc = buildDiscriminationTask(note.thema, optionA, optionB, `${notePath}#4`);
  const cont = buildContrastTask(note.thema, optionA, optionB, `${notePath}#5`);
  void cont;
  const colAText = deTexts[0] || materialQuote;
  const colBText = deTexts[1] || deTexts[0] || materialQuote;
  const correctOption: "A" | "B" = idx % 2 === 0 ? "B" : "A"; // interleave positions
  const correctLabel = correctOption === "A" ? optionA : optionB;
  return {
    id: `v-${note.fach.toLowerCase()}-${slugifyThema(note.thema)}-${idx}`,
    fach: note.fach,
    thema: note.thema,
    operator: disc.operator,
    afb: disc.afb,
    promptDE: disc.promptDE,
    promptZH: disc.promptZH,
    sourceRef: disc.sourceRef,
    materialQuote,
    optionA: {
      labelDE: `A: ${optionA}`,
      labelZH: `A: ${optionA}`,
      column: {
        titleDE: `A · ${shortLabel(optionA, 24)}`,
        titleZH: `A · ${shortLabel(optionA, 24)}`,
        quoteSegments: toQuoteSegments(colAText),
        conclusionDE: `Weg A („${shortLabel(optionA, 32)}“) — vgl. ${disc.sourceRef}.`,
        conclusionZH: `A解（“${shortLabel(optionA, 32)}”）——见${disc.sourceRef}。`,
      },
    },
    optionB: {
      labelDE: `B: ${optionB}`,
      labelZH: `B: ${optionB}`,
      column: {
        titleDE: `B · ${shortLabel(optionB, 24)}`,
        titleZH: `B · ${shortLabel(optionB, 24)}`,
        quoteSegments: toQuoteSegments(colBText),
        conclusionDE: `Weg B („${shortLabel(optionB, 32)}“) — vgl. ${disc.sourceRef}.`,
        conclusionZH: `B解（“${shortLabel(optionB, 32)}”）——见${disc.sourceRef}。`,
      },
    },
    correctOption,
    krFeedbackDE: `Richtig: ${correctOption} („${shortLabel(correctLabel, 40)}“).`,
    krFeedbackZH: `正确：${correctOption}（“${shortLabel(correctLabel, 40)}”）。`,
    explanationQuote: materialQuote,
    rubrics: {
      operatorVerfehlt: false,
      fachbegriffFalsch: false,
      belegFehlt: false,
      vorgehenFalsch: false,
    },
  };
}

export function getVergleichItems(vaultNotes: VaultNote[] | null): VergleichItem[] {
  if (!vaultNotes || vaultNotes.length === 0) return MOCK_VERGLEICH_ITEMS;
  const klausur = vaultNotes.filter((n) => n.klausurrelevant);
  const pool = klausur.length > 0 ? klausur : vaultNotes;
  try {
    const items = pool.map((note, idx) => buildVergleichFromNote(note, idx));
    return items.length > 0 ? items : MOCK_VERGLEICH_ITEMS;
  } catch {
    return MOCK_VERGLEICH_ITEMS;
  }
}

export function getAvailableThemen(notes: VaultNote[] | null): { thema: string; fach: string; note: VaultNote }[] {
  if (!notes || notes.length === 0) return [];
  return notes
    .filter((n) => n.klausurrelevant)
    .map((n) => ({ thema: n.thema, fach: n.fach, note: n }));
}
