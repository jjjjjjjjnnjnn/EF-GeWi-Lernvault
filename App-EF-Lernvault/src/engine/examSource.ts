export type MathSachgebiet = "analysis" | "geometry" | "stochastics";

export type ExamSourceHeadingLevel = 2 | 3 | 4 | null;

export interface ExamSourceBlock {
  headingLevel: ExamSourceHeadingLevel;
  text: string;
}

export interface ExamSourceNote {
  path: string;
  subject: string;
  title: string;
  blocks: readonly ExamSourceBlock[];
  examRelevant: boolean;
  mathSachgebiete?: readonly MathSachgebiet[];
}

interface CompatibleExamNoteBlock {
  kind: "h2" | "h3" | "p" | "li" | "quote" | "math" | "diagram";
  text: string;
  lang?: "zh" | "de";
}

interface CompatibleExamNote {
  path: string;
  fach: string;
  thema: string;
  operatoren?: readonly string[];
  klausurrelevant?: boolean;
  datum?: string;
  tags?: readonly string[];
  content?: string;
  blocks?: readonly (CompatibleExamNoteBlock | ExamSourceBlock)[];
  mathSachgebiete?: readonly MathSachgebiet[];
}

export type ExamNoteCandidate = ExamSourceNote | CompatibleExamNote;

function toExamSourceBlock(
  block: CompatibleExamNoteBlock | ExamSourceBlock
): ExamSourceBlock {
  if ("headingLevel" in block) return block;
  const headingLevel = block.kind === "h2" ? 2 : block.kind === "h3" ? 3 : null;
  return { headingLevel, text: block.text };
}

export function toExamSourceNote(note: ExamNoteCandidate): ExamSourceNote {
  if ("subject" in note) return note;
  const blocks = note.content?.trim()
    ? [{ headingLevel: null, text: note.content } satisfies ExamSourceBlock]
    : (note.blocks ?? []).map(toExamSourceBlock);
  return {
    path: note.path,
    subject: note.fach,
    title: note.thema,
    blocks,
    examRelevant: note.klausurrelevant !== false,
    mathSachgebiete: note.mathSachgebiete,
  };
}
