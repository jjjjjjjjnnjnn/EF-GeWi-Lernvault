import type { AFBLevel } from "../types/klausur";
import { getExamTopicSelectionWeight, type TopicMastery } from "./mastery";
import { extractKlausurFromNote } from "./klausurExtractor";

export type ExamCourseType = "GK" | "LK";
export type MathSachgebiet = "analysis" | "geometry" | "stochastics";
export type MathToolset = "WTR" | "CAS";

export type ExamSubject =
  | "Deutsch"
  | "Englisch"
  | "Mathe"
  | "Bio"
  | "Chemie"
  | "Physik"
  | "SoWi"
  | "Religion"
  | "Kunst"
  | "Musik"
  | "Sport";

export const NRW_2026_WORKING_TIMES = {
  Deutsch: { GK: 255, LK: 315 },
  Englisch: { GK: 285, LK: 315 },
  Mathe: { GK: 255, LK: 300 },
  Bio: { GK: 255, LK: 300 },
  Chemie: { GK: 255, LK: 300 },
  Physik: { GK: 255, LK: 300 },
  SoWi: { GK: 240, LK: 300 },
  Religion: { GK: 240, LK: 300 },
  Kunst: { GK: 240, LK: 300 },
  Musik: { GK: 240, LK: 300 },
  Sport: { GK: null, LK: 300 },
} as const satisfies Readonly<
  Record<ExamSubject, Readonly<Record<ExamCourseType, number | null>>>
>;

export const UNKNOWN_SUBJECT_WORKING_TIME_MINUTES = 300;

export const NRW_2026_EXAM_RULES = {
  source: "BASS 13-32 Nr. 3.2 (VVzAPO-GOSt), Fassung 2026/2027",
  workingTime: {
    includesSelectionTime: true,
    starts: "unmittelbar nach Vorlage der Aufgaben",
  },
  assessment: {
    wholePointsOnly: true,
    criteriaAreBinding: true,
    correctorMayAdjustCriteria: false,
    partialCredit: "je erfülltem Indikator",
  },
  deutsch: {
    offeredTasks: 4,
    chosenTasks: 1,
  },
  mathe: {
    part1: {
      mandatoryTasks: 4,
      mandatorySachgebiete: { analysis: 2, geometry: 1, stochastics: 1 },
      optionalPoolTasks: 6,
      optionalSachgebiete: { analysis: 2, geometry: 2, stochastics: 2 },
      chosenOptionalTasks: 2,
      totalTasks: 6,
      aids: "keine Hilfsmittel",
    },
    part2: {
      offeredSets: ["WTR", "CAS/MMS"],
      chosenByTeacher: true,
      tasksPerSet: 4,
      sachgebiete: { analysis: 2, geometry: 1, stochastics: 1 },
      aids: "modulares Mathematiksystem und zugelassene Formelsammlung",
    },
  },
  zke: {
    partA: "ohne Hilfsmittel",
    partB: "mit modularen System beziehungsweise Formelsammlung",
    scopePointsAndTimeAdjustedFrom2025: true,
  },
  naturalSciences: {
    practicalTaskExtraTime: "Die zusätzliche Zeit wird im Aufgabentext ausgewiesen.",
  },
} as const;

export const EXAM_SUBJECT_ORDER: readonly ExamSubject[] = [
  "Deutsch",
  "Englisch",
  "Mathe",
  "Bio",
  "Chemie",
  "Physik",
  "SoWi",
  "Religion",
  "Kunst",
  "Musik",
  "Sport",
];

const SUBJECT_ALIASES: Readonly<Record<string, ExamSubject>> = {
  deutsch: "Deutsch",
  "deutsch (klausur)": "Deutsch",
  englisch: "Englisch",
  "moderne fremdsprache": "Englisch",
  "englisch (moderne fremdsprache)": "Englisch",
  mathe: "Mathe",
  mathematik: "Mathe",
  bio: "Bio",
  biologie: "Bio",
  chemie: "Chemie",
  physik: "Physik",
  sowi: "SoWi",
  gesellschaftswissenschaften: "SoWi",
  "gesellschaftswissenschaften (sowi)": "SoWi",
  religion: "Religion",
  kunst: "Kunst",
  musik: "Musik",
  sport: "Sport",
};

export const MATH_SACHGEBIET_LABELS_DE: Readonly<Record<MathSachgebiet, string>> = {
  analysis: "Analysis",
  geometry: "Analytische Geometrie / Lineare Algebra",
  stochastics: "Stochastik",
};

export interface ExamNoteBlock {
  kind: "h2" | "h3" | "p" | "li" | "quote" | "math" | "diagram";
  text: string;
  lang: "zh" | "de";
  raw?: string;
}

export interface ExamNoteCandidate {
  path: string;
  fach: string;
  thema: string;
  operatoren?: readonly string[];
  klausurrelevant?: boolean;
  datum?: string;
  tags?: readonly string[];
  content?: string;
  blocks?: readonly ExamNoteBlock[];
  mathSachgebiete?: readonly MathSachgebiet[];
}

export interface ExamCriterion {
  id: string;
  indicatorDE: string;
  points: number;
}

export interface ComposedExamTask {
  id: string;
  code: string;
  sectionId: string;
  afb: AFBLevel;
  operator: string;
  promptDE: string;
  promptZH: string;
  points: number;
  sourceNotePaths: string[];
  topicIds: string[];
  criteria: ExamCriterion[];
  mathSachgebiet?: MathSachgebiet;
}

export interface ComposedExamSection {
  id: string;
  titleDE: string;
  instructionDE: string;
  taskIds: string[];
  aidsDE?: string;
}

export interface ComposedExamOptionGroup {
  id: string;
  titleDE: string;
  taskIds: string[];
  choose: number;
}

export type ExamOptionSelections = Readonly<Record<string, readonly string[]>>;

export interface ComposedExam {
  id: string;
  subject: ExamSubject | string;
  courseType: ExamCourseType;
  seed: number;
  officialWorkingTimeMinutes: number | null;
  rulesDE: string[];
  pointBasisDE: string;
  tasks: ComposedExamTask[];
  sections: ComposedExamSection[];
  optionGroups: ComposedExamOptionGroup[];
  defaultOptionSelections: Record<string, string[]>;
  sourceNotePaths: string[];
}

export interface ComposeExamOptions {
  seed?: number;
  random?: () => number;
  masteryLookup?: (topicId: string) => TopicMastery | null;
  weakTopicBoost?: number;
  unattemptedMastery?: number;
  mathToolset?: MathToolset;
}

export interface ExamCriterionGrade {
  criterionId: string;
  indicatorDE: string;
  points: number;
  satisfied: boolean;
}

export interface ComposedTaskGrade {
  taskId: string;
  points: number;
  maxPoints: number;
  criterionGrades: ExamCriterionGrade[];
  missingCriteriaDE: string[];
}

export interface ComposedExamGrade {
  taskGrades: ComposedTaskGrade[];
  totalPoints: number;
  maxTotalPoints: number;
  percentage: number;
}

interface WeightedNote {
  note: ExamNoteCandidate;
  topicId: string;
  weight: number;
}

interface TaskSlot {
  sectionId: string;
  code: string;
  afb: AFBLevel;
  operator: string;
  points: number;
  mathSachgebiet?: MathSachgebiet;
}

const MATH_KEYWORDS: Readonly<Record<MathSachgebiet, readonly string[]>> = {
  analysis: [
    "analysis",
    "funktion",
    "ableitung",
    "differential",
    "integral",
    "kurve",
    "tangente",
    "extrem",
    "grenzwert",
    "potenzregel",
  ],
  geometry: [
    "analytische geometrie",
    "geometrie",
    "lineare algebra",
    "linear algebra",
    "vektor",
    "matrix",
    "gerade",
    "koordinaten",
    "parameterform",
    "kollinear",
  ],
  stochastics: [
    "stochastik",
    "statistik",
    "wahrscheinlichkeit",
    "zufall",
    "kombinatorik",
    "binomial",
    "normalverteilung",
    "erwartungswert",
    "varianz",
    "baumdiagramm",
  ],
};

const STOP_WORDS = new Set([
  "aber",
  "als",
  "auch",
  "auf",
  "aus",
  "bei",
  "das",
  "dass",
  "dem",
  "den",
  "der",
  "des",
  "die",
  "ein",
  "eine",
  "einer",
  "eines",
  "für",
  "ist",
  "mit",
  "oder",
  "sie",
  "und",
  "von",
  "zum",
  "zur",
]);

export function normalizeExamSubject(subject: string): ExamSubject | null {
  const key = subject.trim().toLowerCase();
  return SUBJECT_ALIASES[key] ?? null;
}

export function getOfficialWorkingTimeMinutes(
  subject: string,
  courseType: ExamCourseType
): number | null {
  const normalizedSubject = normalizeExamSubject(subject);
  if (!normalizedSubject) return UNKNOWN_SUBJECT_WORKING_TIME_MINUTES;
  return NRW_2026_WORKING_TIMES[normalizedSubject][courseType];
}

function slug(value: string): string {
  const normalized = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return normalized.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "x";
}

export function getExamTopicId(subject: string, notePath: string): string {
  const normalizedSubject = normalizeExamSubject(subject) ?? subject.trim();
  const normalizedPath = notePath
    .replace(/\\/g, "/")
    .split("/")
    .filter(Boolean)
    .map(slug)
    .join("/");
  return `exam:${slug(normalizedSubject)}:${normalizedPath}`;
}

function createSeededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296;
  };
}

function safeRandomValue(value: number): number {
  if (!Number.isFinite(value)) return 0.5;
  return Math.min(1 - Number.EPSILON, Math.max(Number.EPSILON, value));
}

function getCandidateContent(note: ExamNoteCandidate): string {
  if (note.content?.trim()) return note.content;
  return (note.blocks ?? [])
    .map((block) => {
      if (block.raw) return block.raw;
      const prefix = block.kind === "h2" ? "## " : block.kind === "h3" ? "### " : "";
      return `${prefix}${block.text}`;
    })
    .join("\n");
}

function getEligibleNotes(
  pool: readonly ExamNoteCandidate[],
  subject: string
): ExamNoteCandidate[] {
  const canonicalSubject = normalizeExamSubject(subject);
  const requested = subject.trim().toLowerCase();
  const seenPaths = new Set<string>();
  const matching = pool.filter((note) => {
    const noteSubject = normalizeExamSubject(note.fach) ?? note.fach.trim().toLowerCase();
    const subjectMatches = canonicalSubject
      ? noteSubject.toLowerCase() === canonicalSubject.toLowerCase()
      : noteSubject === requested;
    if (!subjectMatches || !note.path.trim() || seenPaths.has(note.path)) return false;
    seenPaths.add(note.path);
    return true;
  });
  const relevant = matching.filter((note) => note.klausurrelevant !== false);
  return (relevant.length > 0 ? relevant : matching).sort((a, b) =>
    a.path.localeCompare(b.path, "de")
  );
}

function inferMathSachgebiete(note: ExamNoteCandidate): MathSachgebiet[] {
  if (note.mathSachgebiete && note.mathSachgebiete.length > 0) {
    return Array.from(new Set(note.mathSachgebiete));
  }
  const corpus = [
    note.thema,
    note.path,
    ...(note.tags ?? []),
    ...(note.operatoren ?? []),
    getCandidateContent(note).slice(0, 40_000),
  ]
    .join(" ")
    .toLowerCase();
  return (Object.keys(MATH_KEYWORDS) as MathSachgebiet[]).filter((area) =>
    MATH_KEYWORDS[area].some((keyword) => corpus.includes(keyword))
  );
}

function buildWeightedNotes(
  notes: readonly ExamNoteCandidate[],
  subject: string,
  options: ComposeExamOptions
): WeightedNote[] {
  const weakTopicBoost = Math.max(0, options.weakTopicBoost ?? 3);
  const unattemptedMastery = Math.min(1, Math.max(0, options.unattemptedMastery ?? 0.15));
  return notes.map((note) => {
    const topicId = getExamTopicId(subject, note.path);
    const mastery = options.masteryLookup?.(topicId) ?? null;
    return {
      note,
      topicId,
      weight: getExamTopicSelectionWeight(mastery, {
        weakTopicBoost,
        unattemptedMastery,
      }),
    };
  });
}

function pickWeightedNote(
  candidates: readonly WeightedNote[],
  usedTopicIds: Set<string>,
  random: () => number
): WeightedNote {
  if (candidates.length === 0) throw new Error("Für diesen Prüfungsteil fehlen geeignete Notizen.");
  const unused = candidates.filter((candidate) => !usedTopicIds.has(candidate.topicId));
  const selectable = unused.length > 0 ? unused : candidates;
  let selected = selectable[0];
  let selectedKey = Number.POSITIVE_INFINITY;
  for (const candidate of selectable) {
    const key = -Math.log(safeRandomValue(random())) / candidate.weight;
    if (key < selectedKey) {
      selected = candidate;
      selectedKey = key;
    }
  }
  usedTopicIds.add(selected.topicId);
  return selected;
}

function takeWeightedNotes(
  candidates: readonly WeightedNote[],
  count: number,
  usedTopicIds: Set<string>,
  random: () => number
): WeightedNote[] {
  return Array.from({ length: count }, () =>
    pickWeightedNote(candidates, usedTopicIds, random)
  );
}

function allocateWholePoints(total: number, count: number): number[] {
  const safeTotal = Math.max(0, Math.round(total));
  const safeCount = Math.max(1, Math.min(safeTotal, count));
  const base = Math.floor(safeTotal / safeCount);
  const remainder = safeTotal % safeCount;
  return Array.from({ length: safeCount }, (_, index) => base + (index < remainder ? 1 : 0));
}

function sanitizeIndicator(value: string): string {
  return value
    .replace(/[`*_#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function getNoteCriteria(note: ExamNoteCandidate, afb: AFBLevel): string[] {
  const extracted = extractKlausurFromNote({
    path: note.path,
    fach: note.fach,
    thema: note.thema,
    content: getCandidateContent(note),
    operatoren: [...(note.operatoren ?? [])],
    klausurrelevant: note.klausurrelevant,
  });
  const index = afb === "AFB I" ? 0 : afb === "AFB II" ? 1 : 2;
  return extracted.aufgaben[index].expectedPoints
    .map(sanitizeIndicator)
    .filter(
      (value) =>
        value.length >= 8 &&
        /[A-Za-zÄÖÜäöüß]/.test(value) &&
        !/[\u4e00-\u9fff]/.test(value)
    );
}

function getIndicatorFallbacks(
  note: ExamNoteCandidate,
  afb: AFBLevel,
  mathSachgebiet?: MathSachgebiet
): string[] {
  const topic = `„${note.thema}“`;
  if (mathSachgebiet) {
    const area = MATH_SACHGEBIET_LABELS_DE[mathSachgebiet].toLowerCase();
    if (mathSachgebiet === "analysis") {
      return [
        `Die für ${topic} relevanten Funktionsbegriffe und Zusammenhänge fachlich korrekt darstellen.`,
        `Den gewählten analysisbezogenen Lösungsweg nachvollziehbar begründen.`,
        `Voraussetzungen, Randbedingungen und Ergebnis auf Konsistenz prüfen.`,
      ];
    }
    if (mathSachgebiet === "geometry") {
      return [
        `Die für ${topic} relevanten geometrischen Größen und Bedingungen korrekt erfassen.`,
        `Den ${area}bezogenen Rechenweg mit nachvollziehbaren Zwischenschritten begründen.`,
        `Ergebnis, Lagebeziehung und Randbedingungen gegeneinander prüfen.`,
      ];
    }
    return [
      `Die für ${topic} relevanten Zufallsgrößen, Ereignisse und Parameter eindeutig bestimmen.`,
      `Den ${area}bezogenen Lösungsweg mit passendem Modell und vollständiger Begründung darstellen.`,
      `Ergebnis, Einheiten und Plausibilität sowie Randfälle kontrollieren.`,
    ];
  }
  if (afb === "AFB I") {
    return [
      `Den Gegenstand ${topic} mit mindestens zwei fachlichen Merkmalen strukturiert darstellen.`,
      `Die zentralen Begriffe der Lernnotiz ohne unbelegte Wertung wiedergeben.`,
      `Eine klare fachliche Einordnung und einen präzisen Fachbegriff verwenden.`,
    ];
  }
  if (afb === "AFB II") {
    return [
      `Die zentralen Aussagen und Zusammenhänge ${topic} materialbezogen herausarbeiten.`,
      `Ein einschlägiges Fachmodell auf den Gegenstand anwenden und den Wirkungszusammenhang erklären.`,
      `Die Analyse mit nachvollziehbaren Belegen und einer präzisen Schlussfolgerung abschließen.`,
    ];
  }
  return [
    `Zwei klare Beurteilungskriterien für die Bearbeitung ${topic} benennen.`,
    `Argumente für und gegen die relevante Position abwägen und dabei die Kriterien anwenden.`,
    `Ein eigenständiges, begründetes Sachurteil mit klarer Schlussfolgerung formulieren.`,
  ];
}

function createCriteria(
  taskId: string,
  points: number,
  note: ExamNoteCandidate,
  afb: AFBLevel,
  mathSachgebiet?: MathSachgebiet
): ExamCriterion[] {
  const desiredCount = mathSachgebiet ? 3 : 5;
  const noteCriteria = getNoteCriteria(note, afb);
  const fallbacks = getIndicatorFallbacks(note, afb, mathSachgebiet);
  const candidates = mathSachgebiet
    ? [...fallbacks, ...noteCriteria]
    : [...noteCriteria, ...fallbacks];
  const indicators = Array.from(new Set(candidates.map(sanitizeIndicator).filter(Boolean))).slice(
    0,
    desiredCount
  );
  while (indicators.length < desiredCount) {
    indicators.push(
      `Die fachliche Aussage zu ${note.thema} präzise, belegt und sprachlich korrekt formulieren.`
    );
  }
  const allocations = allocateWholePoints(points, indicators.length);
  return indicators.map((indicatorDE, index) => ({
    id: `${taskId}-k${index + 1}`,
    indicatorDE,
    points: allocations[index],
  }));
}

function getTaskPrompt(
  subject: ExamSubject | string,
  note: ExamNoteCandidate,
  slot: TaskSlot
): { operator: string; promptDE: string; promptZH: string } {
  const topic = note.thema;
  if (normalizeExamSubject(subject) === "Deutsch") {
    if (slot.afb === "AFB I") {
      return {
        operator: "Einordnen",
        promptDE: `Ordnen Sie die in der Lernnotiz formulierte Position zu „${topic}“ nach Textsorte, Intention und zentralen Fachbegriffen ein.`,
        promptZH: "根据学习笔记中的立场，判断其文体、写作目的和核心术语。",
      };
    }
    if (slot.operator === "Vergleichen") {
      return {
        operator: "Vergleichen",
        promptDE: `Vergleichen Sie die Aussage zu „${topic}“ mit einer fachlich benachbarten Position und arbeiten Sie Gemeinsamkeiten sowie Abweichungen heraus.`,
        promptZH: "将该主题的观点与相邻立场比较，说明共同点和差异。",
      };
    }
    if (slot.afb === "AFB III") {
      return {
        operator: "Beurteilen",
        promptDE: `Beurteilen Sie die Position zu „${topic}“ kriteriengeleitet und nehmen Sie zu ihrer Tragfähigkeit Stellung.`,
        promptZH: "依据明确标准评价该立场，并讨论其合理性。",
      };
    }
    return {
      operator: "Analysieren",
      promptDE: `Analysieren Sie Inhalt, argumentative Struktur und sprachliche Gestaltung der Position zu „${topic}“.`,
      promptZH: "分析该主题观点的内容、论证结构和语言表达。",
      };
  }
  if (slot.mathSachgebiet) {
    const area = MATH_SACHGEBIET_LABELS_DE[slot.mathSachgebiet];
    const promptByAfb: Record<AFBLevel, { operator: string; promptDE: string; promptZH: string }> = {
      "AFB I": {
        operator: "Darstellen",
        promptDE: `Stellen Sie die für „${topic}“ relevanten Größen und Zusammenhänge im Sachgebiet ${area} strukturiert dar.`,
        promptZH: `结构化阐述“${topic}”在${area}中的相关量和关系。`,
      },
      "AFB II": {
        operator: "Analysieren",
        promptDE: `Analysieren Sie einen zusammenhängenden Sachverhalt aus „${topic}“ im Sachgebiet ${area} und begründen Sie den Lösungsweg.`,
        promptZH: `围绕“${topic}”分析${area}中的连续情境，并说明解题过程。`,
      },
      "AFB III": {
        operator: "Beurteilen",
        promptDE: `Beurteilen Sie einen Lösungsweg zu „${topic}“ im Sachgebiet ${area} hinsichtlich seiner Konsistenz und Vollständigkeit.`,
        promptZH: `从一致性和完整性角度评价“${topic}”在${area}中的解题过程。`,
      },
    };
    return promptByAfb[slot.afb];
  }
  if (slot.afb === "AFB I") {
    return {
      operator: "Darstellen",
      promptDE: `Stellen Sie den Gegenstand „${topic}“ mit seinen zentralen Fachbegriffen und Merkmalen strukturiert dar.`,
      promptZH: "结构化阐述该主题的核心术语和主要特征。",
    };
  }
  if (slot.afb === "AFB II") {
    return {
      operator: "Analysieren",
      promptDE: `Analysieren Sie die Aussagen, Ursachen und Zusammenhänge zu „${topic}“ mit einem einschlägigen Fachmodell.`,
      promptZH: "运用相关学科模型分析该主题的论述、成因和联系。",
    };
  }
  return {
    operator: "Beurteilen",
    promptDE: `Beurteilen Sie die Position zu „${topic}“ anhand offengelegter Kriterien und formulieren Sie ein begründetes Fazit.`,
    promptZH: "依据明确标准评价该主题立场，并形成有理由的结论。",
  };
}

function buildTask(
  examId: string,
  subject: ExamSubject | string,
  selected: WeightedNote,
  slot: TaskSlot
): ComposedExamTask {
  const taskId = `${examId}-${slot.code.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
  const prompt = getTaskPrompt(subject, selected.note, slot);
  return {
    id: taskId,
    code: slot.code,
    sectionId: slot.sectionId,
    afb: slot.afb,
    operator: prompt.operator,
    promptDE: prompt.promptDE,
    promptZH: prompt.promptZH,
    points: slot.points,
    sourceNotePaths: [selected.note.path],
    topicIds: [selected.topicId],
    criteria: createCriteria(
      taskId,
      slot.points,
      selected.note,
      slot.afb,
      slot.mathSachgebiet
    ),
    mathSachgebiet: slot.mathSachgebiet,
  };
}

function buildBaseRules(subject: string, courseType: ExamCourseType): string[] {
  const rules = [
    "Die ausgewiesene Arbeitszeit umfasst die Auswahlzeit.",
    "Die Arbeitszeit beginnt unmittelbar nach Vorlage der Aufgaben.",
    "Es werden ausschließlich ganze Punkte nach den festen Indikatoren der Aufgabe vergeben.",
  ];
  if (["Bio", "Chemie", "Physik"].includes(normalizeExamSubject(subject) ?? "")) {
    rules.push(
      "Bei Aufgaben mit praktischen Anteilen wird die zusätzliche Zeit im Aufgabentext ausgewiesen."
    );
  }
  if (courseType === "GK") rules.push("Die Zusammenstellung folgt dem gewählten Grundkurs.");
  return rules;
}

function composeGermanExam(
  notes: readonly ExamNoteCandidate[],
  subject: string,
  courseType: ExamCourseType,
  examId: string,
  options: ComposeExamOptions,
  usedTopicIds: Set<string>,
  random: () => number
): Pick<ComposedExam, "tasks" | "sections" | "optionGroups" | "defaultOptionSelections" | "rulesDE"> {
  const weighted = buildWeightedNotes(notes, subject, options);
  const sectionId = "deutsch-aufgabenangebot";
  const afbLevels: AFBLevel[] = ["AFB I", "AFB II", "AFB II", "AFB III"];
  const operators = ["Einordnen", "Analysieren", "Vergleichen", "Beurteilen"];
  const selected = takeWeightedNotes(weighted, 4, usedTopicIds, random);
  const tasks = selected.map((item, index) =>
    buildTask(examId, subject, item, {
      sectionId,
      code: `D${index + 1}`,
      afb: afbLevels[index],
      operator: operators[index],
      points: 100,
    })
  );
  return {
    tasks,
    sections: [
      {
        id: sectionId,
        titleDE: "Aufgabenangebot Deutsch",
        taskIds: tasks.map((task) => task.id),
        instructionDE:
          "Vier Aufgaben liegen vor. Bearbeiten Sie genau eine davon; die ausgewiesenen Punkte gelten für die gewählte Aufgabe.",
      },
    ],
    optionGroups: [
      {
        id: "deutsch-wahl",
        titleDE: "Auswahl aus vier Aufgaben",
        taskIds: tasks.map((task) => task.id),
        choose: 1,
      },
    ],
    defaultOptionSelections: { "deutsch-wahl": [tasks[0].id] },
    rulesDE: [
      ...buildBaseRules(subject, courseType),
      "Deutsch stellt vier Aufgaben bereit; die Prüfungslösung wählt genau eine Aufgabe aus.",
    ],
  };
}

function composeMathExam(
  notes: readonly ExamNoteCandidate[],
  subject: string,
  courseType: ExamCourseType,
  examId: string,
  options: ComposeExamOptions,
  usedTopicIds: Set<string>,
  random: () => number
): Pick<ComposedExam, "tasks" | "sections" | "optionGroups" | "defaultOptionSelections" | "rulesDE"> {
  const weighted = buildWeightedNotes(notes, subject, options);
  const byArea = new Map<MathSachgebiet, WeightedNote[]>();
  const missing: string[] = [];
  for (const area of Object.keys(MATH_SACHGEBIET_LABELS_DE) as MathSachgebiet[]) {
    const areaNotes = weighted.filter((item) =>
      inferMathSachgebiete(item.note).includes(area)
    );
    byArea.set(area, areaNotes);
    if (areaNotes.length === 0) missing.push(MATH_SACHGEBIET_LABELS_DE[area]);
  }
  if (missing.length > 0) {
    throw new Error(`Für Mathe fehlen Notizen für: ${missing.join(", ")}.`);
  }

  const requiredSlots: TaskSlot[] = [
    { sectionId: "mathe-teil-1-pflicht", code: "P1-A1", afb: "AFB I", operator: "Darstellen", points: 6, mathSachgebiet: "analysis" },
    { sectionId: "mathe-teil-1-pflicht", code: "P1-A2", afb: "AFB II", operator: "Analysieren", points: 6, mathSachgebiet: "analysis" },
    { sectionId: "mathe-teil-1-pflicht", code: "P1-G1", afb: "AFB II", operator: "Analysieren", points: 6, mathSachgebiet: "geometry" },
    { sectionId: "mathe-teil-1-pflicht", code: "P1-S1", afb: "AFB III", operator: "Beurteilen", points: 6, mathSachgebiet: "stochastics" },
  ];
  const optionalSlots: TaskSlot[] = (["analysis", "geometry", "stochastics"] as MathSachgebiet[]).flatMap(
    (area, areaIndex) => [
      {
        sectionId: "mathe-teil-1-wahl",
        code: `P1-W${areaIndex + 1}a`,
        afb: "AFB I" as AFBLevel,
        operator: "Darstellen",
        points: 6,
        mathSachgebiet: area,
      },
      {
        sectionId: "mathe-teil-1-wahl",
        code: `P1-W${areaIndex + 1}b`,
        afb: "AFB II" as AFBLevel,
        operator: "Analysieren",
        points: 6,
        mathSachgebiet: area,
      },
    ]
  );
  const toolset = options.mathToolset ?? "WTR";
  const part2Slots: TaskSlot[] = [
    { sectionId: "mathe-teil-2", code: "P2-A1", afb: "AFB I", operator: "Darstellen", points: 6, mathSachgebiet: "analysis" },
    { sectionId: "mathe-teil-2", code: "P2-G1", afb: "AFB II", operator: "Analysieren", points: 6, mathSachgebiet: "geometry" },
    { sectionId: "mathe-teil-2", code: "P2-S1", afb: "AFB III", operator: "Beurteilen", points: 6, mathSachgebiet: "stochastics" },
    { sectionId: "mathe-teil-2", code: "P2-A2", afb: "AFB III", operator: "Beurteilen", points: 6, mathSachgebiet: "analysis" },
  ];
  const tasks = [...requiredSlots, ...optionalSlots, ...part2Slots].map((slot) => {
    const selected = pickWeightedNote(byArea.get(slot.mathSachgebiet!)!, usedTopicIds, random);
    return buildTask(examId, subject, selected, slot);
  });
  const optionalTasks = tasks.filter((task) => task.sectionId === "mathe-teil-1-wahl");
  const optionalAreas: MathSachgebiet[] = ["analysis", "geometry", "stochastics"];
  const optionalStart = (options.seed ?? 0) % optionalAreas.length;
  const defaultOptionalTasks = [0, 1].map(
    (offset) =>
      optionalTasks.find(
        (task) => task.mathSachgebiet === optionalAreas[(optionalStart + offset) % optionalAreas.length]
      )!
  );
  return {
    tasks,
    sections: [
      {
        id: "mathe-teil-1-pflicht",
        titleDE: "Teil 1 A: Pflichtaufgaben",
        taskIds: tasks.filter((task) => task.sectionId === "mathe-teil-1-pflicht").map((task) => task.id),
        instructionDE:
          "Bearbeiten Sie alle vier Aufgaben. Zwei Aufgaben entfallen auf Analysis, eine auf Analytische Geometrie beziehungsweise Lineare Algebra und eine auf Stochastik.",
        aidsDE: "Ohne Hilfsmittel.",
      },
      {
        id: "mathe-teil-1-wahl",
        titleDE: "Teil 1 B: Auswahlaufgaben",
        taskIds: optionalTasks.map((task) => task.id),
        instructionDE:
          "Wählen Sie genau zwei der sechs Aufgaben aus; zu jedem Sachgebiet stehen zwei Aufgaben bereit.",
        aidsDE: "Ohne Hilfsmittel.",
      },
      {
        id: "mathe-teil-2",
        titleDE: `Teil 2: Aufgabensatz ${toolset}`,
        taskIds: tasks.filter((task) => task.sectionId === "mathe-teil-2").map((task) => task.id),
        instructionDE:
          "Bearbeiten Sie die vier Aufgaben des von der Lehrkraft gewählten Satzes: zwei Analysis-, eine Geometrie- und eine Stochastikaufgabe.",
        aidsDE:
          toolset === "WTR"
            ? "Mit WTR und zugelassener Formelsammlung."
            : "Mit CAS/MMS und zugelassener Formelsammlung.",
      },
    ],
    optionGroups: [
      {
        id: "mathe-teil-1-wahl-gruppe",
        titleDE: "Zwei von sechs Aufgaben",
        taskIds: optionalTasks.map((task) => task.id),
        choose: 2,
      },
    ],
    defaultOptionSelections: {
      "mathe-teil-1-wahl-gruppe": defaultOptionalTasks.map((task) => task.id),
    },
    rulesDE: [
      ...buildBaseRules(subject, courseType),
      "Mathe Teil 1 umfasst vier Pflichtaufgaben und eine Auswahl aus sechs optionalen Aufgaben; insgesamt werden dort sechs Aufgaben bearbeitet.",
      "Die Pflichtaufgaben verteilen sich auf zwei Analysis-, eine Geometrie- und eine Stochastikaufgabe.",
      "Von den zwei optionalen Aufgaben je Sachgebiet werden zwei Aufgaben gewählt.",
      "Die Lehrkraft wählt für Teil 2 entweder den WTR- oder den CAS/MMS-Aufgabensatz mit je zwei Analysis-, einer Geometrie- und einer Stochastikaufgabe.",
      "Teil 1 wird ohne Hilfsmittel bearbeitet; für Teil 2 sind das modulare Mathematiksystem und die zugelassene Formelsammlung erlaubt.",
    ],
  };
}

function composeGenericExam(
  notes: readonly ExamNoteCandidate[],
  subject: string,
  courseType: ExamCourseType,
  examId: string,
  options: ComposeExamOptions,
  usedTopicIds: Set<string>,
  random: () => number
): Pick<ComposedExam, "tasks" | "sections" | "optionGroups" | "defaultOptionSelections" | "rulesDE"> {
  const weighted = buildWeightedNotes(notes, subject, options);
  const sectionId = "aufgabenfolge";
  const slots: TaskSlot[] = [
    { sectionId, code: "A", afb: "AFB I", operator: "Darstellen", points: 25 },
    { sectionId, code: "B", afb: "AFB II", operator: "Analysieren", points: 45 },
    { sectionId, code: "C", afb: "AFB III", operator: "Beurteilen", points: 30 },
  ];
  const selected = takeWeightedNotes(weighted, 3, usedTopicIds, random);
  const tasks = selected.map((item, index) => buildTask(examId, subject, item, slots[index]));
  return {
    tasks,
    sections: [
      {
        id: sectionId,
        titleDE: "Dreiteilige Aufgabenfolge",
        taskIds: tasks.map((task) => task.id),
        instructionDE:
          "Die Folge verbindet AFB I, AFB II und AFB III aus unterschiedlichen Lernnotizen.",
      },
    ],
    optionGroups: [],
    defaultOptionSelections: {},
    rulesDE: [
      ...buildBaseRules(subject, courseType),
      "Die Aufgabenfolge verteilt die Anforderungsstufen auf AFB I, AFB II und AFB III.",
    ],
  };
}

export function composeExam(
  pool: readonly ExamNoteCandidate[],
  subject: string,
  courseType: ExamCourseType,
  options: ComposeExamOptions = {}
): ComposedExam {
  const notes = getEligibleNotes(pool, subject);
  if (notes.length === 0) throw new Error(`Keine Lernnotizen für ${subject} vorhanden.`);
  const seed = (options.seed ?? 0) >>> 0;
  const effectiveOptions: ComposeExamOptions = { ...options, seed };
  const normalizedSubject = normalizeExamSubject(subject) ?? subject.trim();
  const examId = `exam-${slug(normalizedSubject)}-${courseType.toLowerCase()}-${seed}`;
  const random = options.random ?? createSeededRandom(seed);
  const usedTopicIds = new Set<string>();
  const composition = normalizeExamSubject(subject) === "Mathe"
    ? composeMathExam(notes, normalizedSubject, courseType, examId, effectiveOptions, usedTopicIds, random)
    : normalizeExamSubject(subject) === "Deutsch"
      ? composeGermanExam(notes, normalizedSubject, courseType, examId, effectiveOptions, usedTopicIds, random)
      : composeGenericExam(notes, normalizedSubject, courseType, examId, effectiveOptions, usedTopicIds, random);
  return {
    id: examId,
    subject: normalizedSubject,
    courseType,
    seed,
    officialWorkingTimeMinutes: getOfficialWorkingTimeMinutes(subject, courseType),
    rulesDE: composition.rulesDE,
    pointBasisDE:
      "Die Übungspunkte sind fest den Indikatoren zugeordnet und werden nur in ganzen Punkten vergeben.",
    tasks: composition.tasks,
    sections: composition.sections,
    optionGroups: composition.optionGroups,
    defaultOptionSelections: composition.defaultOptionSelections,
    sourceNotePaths: Array.from(new Set(composition.tasks.flatMap((task) => task.sourceNotePaths))),
  };
}

export function composeExamVariants(
  pool: readonly ExamNoteCandidate[],
  subject: string,
  courseType: ExamCourseType,
  count: number,
  options: ComposeExamOptions = {}
): ComposedExam[] {
  const safeCount = Math.max(1, Math.min(8, Math.floor(count)));
  const baseSeed = (options.seed ?? 0) >>> 0;
  return Array.from({ length: safeCount }, (_, index) =>
    composeExam(pool, subject, courseType, {
      ...options,
      seed: (baseSeed + Math.imul(index, 0x9e3779b9)) >>> 0,
    })
  );
}

export function getActiveTaskIds(
  exam: ComposedExam,
  optionSelections: ExamOptionSelections = exam.defaultOptionSelections
): string[] {
  const groupedIds = new Set(exam.optionGroups.flatMap((group) => group.taskIds));
  const requiredIds = exam.tasks
    .filter((task) => !groupedIds.has(task.id))
    .map((task) => task.id);
  const selectedOptionIds = exam.optionGroups.flatMap((group) => {
    const selected = optionSelections[group.id] ?? exam.defaultOptionSelections[group.id] ?? [];
    return Array.from(new Set(selected))
      .filter((taskId) => group.taskIds.includes(taskId))
      .slice(0, group.choose);
  });
  return Array.from(new Set([...requiredIds, ...selectedOptionIds]));
}

export function getExamMaxPoints(
  exam: ComposedExam,
  optionSelections: ExamOptionSelections = exam.defaultOptionSelections
): number {
  const activeIds = new Set(getActiveTaskIds(exam, optionSelections));
  return exam.tasks
    .filter((task) => activeIds.has(task.id))
    .reduce((sum, task) => sum + task.points, 0);
}

export function getExamAfbPointTotals(
  exam: ComposedExam,
  optionSelections: ExamOptionSelections = exam.defaultOptionSelections
): Record<AFBLevel, number> {
  const activeIds = new Set(getActiveTaskIds(exam, optionSelections));
  const totals: Record<AFBLevel, number> = { "AFB I": 0, "AFB II": 0, "AFB III": 0 };
  for (const task of exam.tasks) {
    if (activeIds.has(task.id)) totals[task.afb] += task.points;
  }
  return totals;
}

export function gradeComposedTask(
  task: ComposedExamTask,
  satisfiedCriterionIds: readonly string[]
): ComposedTaskGrade {
  const satisfied = new Set(satisfiedCriterionIds);
  const criterionGrades = task.criteria.map((criterion) => ({
    criterionId: criterion.id,
    indicatorDE: criterion.indicatorDE,
    points: satisfied.has(criterion.id) ? criterion.points : 0,
    satisfied: satisfied.has(criterion.id),
  }));
  return {
    taskId: task.id,
    points: criterionGrades.reduce((sum, criterion) => sum + criterion.points, 0),
    maxPoints: task.points,
    criterionGrades,
    missingCriteriaDE: criterionGrades
      .filter((criterion) => !criterion.satisfied)
      .map((criterion) => criterion.indicatorDE),
  };
}

function answerTokens(answer: string): Set<string> {
  const normalized = answer
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
  return new Set(
    (normalized.match(/[a-z0-9]+/g) ?? []).filter(
      (token) => token.length >= 4 && !STOP_WORDS.has(token)
    )
  );
}

function evaluateAnswer(task: ComposedExamTask, answer: string): string[] {
  const tokens = answerTokens(answer);
  if (tokens.size === 0) return [];
  return task.criteria
    .filter((criterion) => {
      const criterionTokens = Array.from(answerTokens(criterion.indicatorDE));
      if (criterionTokens.length === 0) return false;
      const matches = criterionTokens.filter((token) => tokens.has(token)).length;
      return matches >= Math.max(1, Math.ceil(criterionTokens.length * 0.35));
    })
    .map((criterion) => criterion.id);
}

export function gradeComposedExam(
  exam: ComposedExam,
  answersByTaskId: Readonly<Record<string, string>>,
  optionSelections: ExamOptionSelections = exam.defaultOptionSelections
): ComposedExamGrade {
  const activeIds = new Set(getActiveTaskIds(exam, optionSelections));
  const activeTasks = exam.tasks.filter((task) => activeIds.has(task.id));
  const taskGrades = activeTasks.map((task) =>
    gradeComposedTask(task, evaluateAnswer(task, answersByTaskId[task.id] ?? ""))
  );
  const totalPoints = taskGrades.reduce((sum, grade) => sum + grade.points, 0);
  const maxTotalPoints = activeTasks.reduce((sum, task) => sum + task.points, 0);
  return {
    taskGrades,
    totalPoints,
    maxTotalPoints,
    percentage: maxTotalPoints > 0 ? Math.round((totalPoints / maxTotalPoints) * 100) : 0,
  };
}
