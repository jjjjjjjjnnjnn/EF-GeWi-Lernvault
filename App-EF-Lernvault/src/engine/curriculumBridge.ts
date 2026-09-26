import type { Reise } from "../reise";

export type UnitStage = "grundlagen" | "kern" | "vertiefung" | "abitur";

export interface CurriculumNode {
  id: string;
  fach: string;
  thema: string;
  stage: UnitStage;
  stageNumber: number; // 1, 2, 3, 4
  level: number;
  xp: number;
  ziel: string;
  afb: "AFB I" | "AFB II" | "AFB III";
  status: "offen" | "in_arbeit" | "gemeistert";
  prerequisites: string[]; // names of prerequisite nodes
  reiseId?: string; // id of matching Lernreise if available
  noteId?: string; // path or id of matching Wissensnotiz
  klausurThema?: string; // topic of matching mock exam if available
  summaryDE: string;
  summaryZH: string;
}

export interface CurriculumUnit {
  stage: UnitStage;
  stageNumber: number;
  titleDE: string;
  titleZH: string;
  descriptionDE: string;
  descriptionZH: string;
  nodes: CurriculumNode[];
}

export const STAGE_CONFIG: Record<
  UnitStage,
  {
    number: number;
    titleDE: string;
    titleZH: string;
    descriptionDE: string;
    descriptionZH: string;
    afbDefault: "AFB I" | "AFB II" | "AFB III";
  }
> = {
  grundlagen: {
    number: 1,
    titleDE: "Unit 1: Grundlagen & Vorbereitung",
    titleZH: "第 1 单元：前置基础 · 概念筑基",
    descriptionDE: "Fachtermini, elementare Definitionen und Vorwissen sichern (AFB I).",
    descriptionZH: "夯实学科核心术语定义与前置常识，扫清专业语言障碍。",
    afbDefault: "AFB I",
  },
  kern: {
    number: 2,
    titleDE: "Unit 2: Kernkompetenzen & Modelle",
    titleZH: "第 2 单元：核心主干 · 模型推导",
    descriptionDE: "Zusammenhänge, Kausalmechanismen und zentrale Fachmodelle beherrschen (AFB II).",
    descriptionZH: "深入因果机制与学科经典理论模型，掌握核心论证逻辑。",
    afbDefault: "AFB II",
  },
  vertiefung: {
    number: 3,
    titleDE: "Unit 3: Vertiefung & Klausur-Training",
    titleZH: "第 3 单元：深化实战 · 算子突破",
    descriptionDE: "Komplexe Materialanalyse, Klausur-Operatoren und CN-Methoden (AFB II-III).",
    descriptionZH: "攻克长难材料分析与真题标准算子，熟练运用 CN-Methode 技巧。",
    afbDefault: "AFB II",
  },
  abitur: {
    number: 4,
    titleDE: "Unit 4: Abitur-Transfer & Vollsimulation",
    titleZH: "第 4 单元：全真冲刺 · 模考闭环",
    descriptionDE: "Eigenständiges begründetes Urteil, 90-Min-Vollklausur und mündliche Prüfung (AFB III).",
    descriptionZH: "形成有理据的独立学术判语，完成 90 分钟全真模考与口试推演。",
    afbDefault: "AFB III",
  },
};

/**
 * Normalizes subject names for matching.
 */
function normFach(fach: string): string {
  const f = fach.toLowerCase().trim();
  if (f.startsWith("sowi") || f.includes("sozial")) return "SoWi";
  if (f.startsWith("deutsch")) return "Deutsch";
  if (f.startsWith("englisch") || f.startsWith("english")) return "Englisch";
  if (f.startsWith("mathe")) return "Mathe";
  if (f.startsWith("physik") || f.startsWith("physics")) return "Physik";
  if (f.startsWith("chemie") || f.startsWith("chemistry")) return "Chemie";
  if (f.startsWith("bio")) return "Bio";
  if (f.startsWith("philo")) return "Philosophie";
  if (f.startsWith("musik")) return "Musik";
  if (f.startsWith("sport")) return "Sport";
  return fach;
}

/**
 * Builds structured Curriculum Units for a specific subject (or all subjects)
 * by dynamically weaving real Lernreise courses, Wissensnotizen, and Mockklausuren.
 */
export function buildCurriculumMap(
  fach: string,
  reisen?: Reise[] | null,
  notes?: Array<{ id: string; fach: string; thema: string; path?: string }> | null
): CurriculumUnit[] {
  const normalizedTargetFach = normFach(fach);
  const isAll = fach === "alle" || !fach;
  const safeReisen = reisen ?? [];
  const safeNotes = notes ?? [];

  // Filter reisen for the given subject
  const subjectReisen = isAll
    ? safeReisen
    : safeReisen.filter((r) => normFach(r.fach) === normalizedTargetFach);

  // Filter notes for the given subject
  const subjectNotes = isAll
    ? safeNotes
    : safeNotes.filter((n) => normFach(n.fach) === normalizedTargetFach);

  // Helper to categorize a course or note into one of the 4 units
  const units: Record<UnitStage, CurriculumNode[]> = {
    grundlagen: [],
    kern: [],
    vertiefung: [],
    abitur: [],
  };

  // 1. Map all real Lernreise courses
  subjectReisen.forEach((r, idx) => {
    let stage: UnitStage = "kern";
    let afb: "AFB I" | "AFB II" | "AFB III" = "AFB II";

    if (r.level <= 1 || r.thema.toLowerCase().includes("grundlagen") || r.thema.toLowerCase().includes("basis")) {
      stage = "grundlagen";
      afb = "AFB I";
    } else if (r.level >= 3 || r.thema.toLowerCase().includes("analyse") || r.thema.toLowerCase().includes("klausur")) {
      stage = "vertiefung";
      afb = "AFB III";
    }

    // Try finding matching note
    const matchedNote = subjectNotes.find(
      (n) =>
        n.thema.toLowerCase().includes(r.thema.toLowerCase().slice(0, 8)) ||
        r.thema.toLowerCase().includes(n.thema.toLowerCase().slice(0, 8))
    );

    const prevCourse = idx > 0 ? subjectReisen[idx - 1]?.thema : undefined;

    units[stage].push({
      id: r.id,
      fach: r.fach,
      thema: r.thema,
      stage,
      stageNumber: STAGE_CONFIG[stage].number,
      level: r.level,
      xp: r.xp || 100,
      ziel: r.ziel || "Klausur",
      afb,
      status: idx === 0 ? "in_arbeit" : "offen",
      prerequisites: prevCourse ? [prevCourse] : [],
      reiseId: r.id,
      noteId: matchedNote?.id,
      summaryDE: `${r.schritte?.length ?? 4} Schritte von Entdecken bis Klausurszenario.`,
      summaryZH: `包含 ${r.schritte?.length ?? 4} 步渐进教学（发现、操练、自检、情景模拟）。`,
    });
  });

  // 2. Add high-value Wissensnotizen that aren't already represented by a Reise
  const existingThemen = new Set(subjectReisen.map((r) => r.thema.toLowerCase()));
  const extraNotes = subjectNotes.filter((n) => {
    const t = n.thema.toLowerCase();
    return !Array.from(existingThemen).some((ex) => t.includes(ex.slice(0, 8)));
  });

  extraNotes.slice(0, 8).forEach((n) => {
    const isAdvanced =
      (n.path ?? "").includes("Texte-Analyse") ||
      n.thema.toLowerCase().includes("analyse") ||
      n.thema.toLowerCase().includes("klausur");
    const stage: UnitStage = isAdvanced ? "vertiefung" : "kern";
    units[stage].push({
      id: n.id,
      fach: n.fach,
      thema: n.thema,
      stage,
      stageNumber: STAGE_CONFIG[stage].number,
      level: isAdvanced ? 3 : 2,
      xp: 80,
      ziel: "Klausur",
      afb: isAdvanced ? "AFB II" : "AFB I",
      status: "offen",
      prerequisites: [],
      noteId: n.id,
      summaryDE: "Klausurrelevante Wissensnotiz mit Begriffsnetz und Musterformulierungen.",
      summaryZH: "八段式考纲知识精讲，含概念网络、解题方法与满分句型。",
    });
  });

  // 3. Add Unit 4: Abitur-Transfer & Vollsimulation (Mock Exam & Oral QA node)
  const examFach = isAll ? (subjectReisen[0]?.fach ?? "SoWi") : normalizedTargetFach;
  units.abitur.push({
    id: `exam-${examFach.toLowerCase()}`,
    fach: examFach,
    thema: `${examFach} · NRW Klausur-Simulation & Erwartungshorizont`,
    stage: "abitur",
    stageNumber: 4,
    level: 4,
    xp: 250,
    ziel: "Abitur / Klausur",
    afb: "AFB III",
    status: "offen",
    prerequisites: units.vertiefung.slice(0, 2).map((n) => n.thema),
    klausurThema: examFach,
    summaryDE: "Vollständige 90-Minuten-Klausur nach NRW-Standard mit 100 BE und Punkteschlüssel.",
    summaryZH: "北威州标准 90 分钟全真模考大题，配齐 100 BE 采分点与 15 分制换算表。",
  });

  // If subject has oral exams (Musik, Sport, Englisch, Deutsch, Philo), add oral milestone
  if (["Musik", "Sport", "Englisch", "Deutsch", "Philosophie"].includes(examFach)) {
    units.abitur.push({
      id: `oral-${examFach.toLowerCase()}`,
      fach: examFach,
      thema: `${examFach} · Mündliche Prüfungssimulation (20 Min.)`,
      stage: "abitur",
      stageNumber: 4,
      level: 4,
      xp: 200,
      ziel: "Mündlich",
      afb: "AFB III",
      status: "offen",
      prerequisites: [`${examFach} · NRW Klausur-Simulation & Erwartungshorizont`],
      klausurThema: examFach,
      summaryDE: "20-Minuten-Prüfungsgespräch mit Schülervortrag und 5 Prüfer-Nachfragen.",
      summaryZH: "20 分钟口试全真推演：考生自主陈述 + 5 组考官深挖追问与防卡壳急救词。",
    });
  }

  // Construct return units array
  return (["grundlagen", "kern", "vertiefung", "abitur"] as UnitStage[]).map((stage) => ({
    stage,
    stageNumber: STAGE_CONFIG[stage].number,
    titleDE: STAGE_CONFIG[stage].titleDE,
    titleZH: STAGE_CONFIG[stage].titleZH,
    descriptionDE: STAGE_CONFIG[stage].descriptionDE,
    descriptionZH: STAGE_CONFIG[stage].descriptionZH,
    nodes: units[stage],
  }));
}
