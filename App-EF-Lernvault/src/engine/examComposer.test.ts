import { describe, expect, it, vi } from "vitest";
import {
  composeExam,
  composeExamVariants,
  getActiveTaskIds,
  getExamAfbPointTotals,
  getExamMaxPoints,
  getExamTopicId,
  gradeComposedTask,
  getOfficialPracticalExtensionRule,
  MATH_SACHGEBIET_LABELS_DE,
  NRW_2026_EXAM_RULES,
  NRW_2026_WORKING_TIMES,
  NRW_2026_WORKING_TIME_SOURCE,
  UNKNOWN_SUBJECT_WORKING_TIME_MINUTES,
  getOfficialWorkingTimeMinutes,
  type ExamSourceNote,
  type MathSachgebiet,
} from "./examComposer";
import type { TopicMastery } from "./mastery";
import { parseNoteFile } from "../vault/parser";

function note(
  path: string,
  fach: string,
  thema: string,
  mathSachgebiete?: MathSachgebiet[]
): ExamSourceNote {
  return {
    path,
    subject: fach,
    title: thema,
    blocks: [
      { headingLevel: 2, text: "Grundlagen" },
      { headingLevel: null, text: thema },
      { headingLevel: 2, text: "Klausur-Sätze" },
      { headingLevel: null, text: `- Darstellen: ${thema} wird fachlich eingeordnet.` },
      { headingLevel: null, text: "- Analysieren: Zusammenhänge werden begründet." },
      { headingLevel: null, text: "- Beurteilen: Kriterien werden abgewogen." },
    ],
    examRelevant: true,
    mathSachgebiete,
  };
}

function parsedGermanNote(path: string, thema: string, marker: string) {
  return parseNoteFile(
    path,
    `---
fach: Deutsch
thema: ${thema}
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
tags: [EF, Deutsch]
---
## Klausur-Sätze
- Darstellen: ${marker} wird strukturiert eingeordnet.
- Analysieren: ${marker} wird anhand des Textes begründet.
- Beurteilen: ${marker} wird nach offengelegten Kriterien bewertet.`
  )!;
}

function mastery(topicId: string, pMastery: number): TopicMastery {
  return {
    topicId,
    thema: topicId,
    fach: "SoWi",
    inhaltsfeldId: "sowi-if1",
    pMastery,
    totalAttempts: 1,
    correctAttempts: pMastery >= 0.5 ? 1 : 0,
    lastUpdated: "2026-01-01T00:00:00.000Z",
  };
}

function mathPool(): ExamSourceNote[] {
  return [
    note("03_Mathe/Analysis-1.md", "Mathe", "Differenzierbarkeit", ["analysis"]),
    note("03_Mathe/Analysis-2.md", "Mathe", "Funktionsuntersuchung", ["analysis"]),
    note("03_Mathe/Geometrie-1.md", "Mathe", "Vektorrechnung", ["geometry"]),
    note("03_Mathe/Geometrie-2.md", "Mathe", "Lineare Algebra", ["geometry"]),
    note("03_Mathe/Stochastik-1.md", "Mathe", "Wahrscheinlichkeitsmodell", ["stochastics"]),
    note("03_Mathe/Stochastik-2.md", "Mathe", "Erwartungswert", ["stochastics"]),
  ];
}

describe("NRW 2026 exam composer", () => {
  it("locks the Gymnasium VVzAPO-GOSt source citation", () => {
    expect(NRW_2026_WORKING_TIME_SOURCE).toBe(
      "BASS 13-32 Nr. 3.2 (VVzAPO-GOSt), Fassung 2026/2027"
    );
    expect(NRW_2026_EXAM_RULES.source).toBe(NRW_2026_WORKING_TIME_SOURCE);
    expect(NRW_2026_WORKING_TIME_SOURCE).not.toContain("19-11");
    expect(NRW_2026_WORKING_TIME_SOURCE).not.toContain("Weiterbildungskolleg");
    expect(
      Object.values(NRW_2026_WORKING_TIMES).every(
        (entry) => entry.source === NRW_2026_WORKING_TIME_SOURCE
      )
    ).toBe(true);
  });

  it("preserves getOfficialWorkingTimeMinutes for previously supported subjects", () => {
    const expected = [
      ["Deutsch", "GK", 255],
      ["Deutsch", "LK", 315],
      ["Englisch", "GK", 285],
      ["Englisch", "LK", 315],
      ["Mathe", "GK", 255],
      ["Mathe", "LK", 300],
      ["Bio", "GK", 255],
      ["Bio", "LK", 300],
      ["Chemie", "GK", 255],
      ["Chemie", "LK", 300],
      ["Physik", "GK", 255],
      ["Physik", "LK", 300],
      ["SoWi", "GK", 240],
      ["SoWi", "LK", 300],
      ["Religion", "GK", 240],
      ["Religion", "LK", 300],
      ["Kunst", "GK", 240],
      ["Kunst", "LK", 300],
      ["Musik", "GK", 240],
      ["Musik", "LK", 300],
      ["Sport", "GK", null],
      ["Sport", "LK", 300],
    ] as const;
    for (const [subject, courseType, minutes] of expected) {
      expect(getOfficialWorkingTimeMinutes(subject, courseType)).toBe(minutes);
    }
    expect(getOfficialWorkingTimeMinutes("Unbekanntes Fach", "LK")).toBe(
      UNKNOWN_SUBJECT_WORKING_TIME_MINUTES
    );
  });

  it("represents every modern and ancient language phase explicitly", () => {
    expect(NRW_2026_WORKING_TIMES.Englisch).toMatchObject({
      kind: "language",
      languageFamily: "modern",
      languageScope: "all-modern-languages",
      courseTimes: {
        continued: {
          GK: { kind: "written", minutes: 285 },
          LK: { kind: "written", minutes: 315 },
        },
        newlyBegun: {
          GK: { kind: "written", minutes: 255 },
          LK: { kind: "not-in-written-exam" },
        },
      },
    });
    expect(NRW_2026_WORKING_TIMES.Latein).toMatchObject({
      kind: "language",
      languageFamily: "ancient",
      languageScope: "ancient-languages",
      subjects: ["Latein", "Griechisch", "Hebräisch"],
      courseTimes: {
        continued: {
          GK: { kind: "written", minutes: 240 },
          LK: { kind: "written", minutes: 300 },
        },
        newlyBegun: {
          GK: { kind: "written", minutes: 210 },
          LK: { kind: "not-in-written-exam" },
        },
      },
    });
    expect(getOfficialWorkingTimeMinutes("Englisch (neu einsetzend)", "GK")).toBe(255);
    expect(getOfficialWorkingTimeMinutes("Englisch (neu einsetzend)", "LK")).toBeNull();
    expect(getOfficialWorkingTimeMinutes("Englisch", "GK", "newlyBegun")).toBe(255);
    expect(getOfficialWorkingTimeMinutes("moderne fremdsprache neu einsetzend", "GK")).toBe(255);
    for (const subject of ["Latein", "Griechisch", "Hebräisch"]) {
      expect(getOfficialWorkingTimeMinutes(subject, "GK")).toBe(240);
      expect(getOfficialWorkingTimeMinutes(subject, "LK")).toBe(300);
      expect(getOfficialWorkingTimeMinutes(`${subject} (neu einsetzend)`, "GK")).toBe(210);
      expect(getOfficialWorkingTimeMinutes(`${subject} (neu einsetzend)`, "LK")).toBeNull();
    }
  });

  it("makes the Religion-Kunst-Musik group, practical rule, and Sport context explicit", () => {
    const group = NRW_2026_WORKING_TIMES.Religion;
    expect(group.kind).toBe("subject-group");
    if (group.kind === "subject-group") {
      expect(group.groupId).toBe("religion-kunst-musik");
      expect(group.subjects).toEqual(["Religion", "Kunst", "Musik"]);
      expect(group.taskExtensions.Kunst).toEqual({
        kind: "fixed-addition",
        minutes: 60,
        appliesWhen: "aufgabenart-i",
      });
      expect(group.taskExtensions.Musik).toEqual({
        kind: "fixed-addition",
        minutes: 60,
        appliesWhen: "gestaltungsaufgabe",
      });
    }
    expect(getOfficialPracticalExtensionRule("Bio")).toEqual({
      kind: "task-indicated",
      trigger: "practical-components",
      additionalTime: "indicated-in-task",
      description: "Die zusätzliche Zeit wird im Aufgabentext ausgewiesen.",
    });
    expect(getOfficialPracticalExtensionRule("Mathe")).toBeNull();
    const sport = NRW_2026_WORKING_TIMES.Sport;
    expect(sport.kind).toBe("sport-lk-only");
    if (sport.kind === "sport-lk-only") {
      expect(sport.courseTimes.GK).toEqual({ kind: "not-in-written-exam" });
      expect(sport.courseTimes.LK).toEqual({ kind: "written", minutes: 300 });
      expect(sport.oralFourthExam).toEqual({ kind: "separate", workingTimeStatus: "not-defined" });
    }
  });

  it("enforces all Mathe Sachgebiet quotas in Teil 1 and Teil 2", () => {
    const exam = composeExam(mathPool(), "Mathe", "LK", { seed: 42, mathToolset: "WTR" });
    const required = exam.tasks.filter((task) => task.sectionId === "mathe-teil-1-pflicht");
    const optional = exam.tasks.filter((task) => task.sectionId === "mathe-teil-1-wahl");
    const part2 = exam.tasks.filter((task) => task.sectionId === "mathe-teil-2");
    const countAreas = (tasks: typeof exam.tasks) =>
      tasks.reduce<Record<MathSachgebiet, number>>(
        (counts, task) => {
          const area = task.mathSachgebiet!;
          counts[area] += 1;
          return counts;
        },
        { analysis: 0, geometry: 0, stochastics: 0 }
      );

    expect(required).toHaveLength(4);
    expect(countAreas(required)).toEqual({ analysis: 2, geometry: 1, stochastics: 1 });
    expect(optional).toHaveLength(6);
    expect(countAreas(optional)).toEqual({ analysis: 2, geometry: 2, stochastics: 2 });
    expect(part2).toHaveLength(4);
    expect(countAreas(part2)).toEqual({ analysis: 2, geometry: 1, stochastics: 1 });
    expect(getActiveTaskIds(exam)).toHaveLength(10);
    expect(
      new Set(
        exam.tasks
          .filter((task) => getActiveTaskIds(exam).includes(task.id) && task.sectionId === "mathe-teil-1-wahl")
          .map((task) => task.mathSachgebiet)
      ).size
    ).toBe(2);
    expect(getExamMaxPoints(exam)).toBe(60);
    expect(
      exam.tasks.every(
        (task) =>
          task.criteria.reduce((sum, criterion) => sum + criterion.points, 0) === task.points &&
          task.criteria.every((criterion) => Number.isInteger(criterion.points))
      )
    ).toBe(true);
    expect(Object.keys(MATH_SACHGEBIET_LABELS_DE)).toHaveLength(3);
  });

  it("refuses to relax Mathe quotas when a Sachgebiet has no note", () => {
    expect(() =>
      composeExam(
        [
          note("03_Mathe/Analysis.md", "Mathe", "Analysis", ["analysis"]),
          note("03_Mathe/Geometrie.md", "Mathe", "Geometrie", ["geometry"]),
        ],
        "Mathe",
        "LK",
        { seed: 42 }
      )
    ).toThrow(/Stochastik/);
  });

  it("offers exactly four German tasks with a one-task selection", () => {
    const pool = [
      note("01_Deutsch/Sprache.md", "Deutsch", "Sprachwandel"),
      note("01_Deutsch/Lyrik.md", "Deutsch", "Lyrik"),
      note("01_Deutsch/Drama.md", "Deutsch", "Drama"),
      note("01_Deutsch/Medien.md", "Deutsch", "Medien"),
    ];
    const exam = composeExam(pool, "Deutsch", "LK", { seed: 7 });

    expect(exam.tasks).toHaveLength(4);
    expect(exam.optionGroups).toHaveLength(1);
    expect(exam.optionGroups[0].taskIds).toHaveLength(4);
    expect(exam.optionGroups[0].choose).toBe(1);
    expect(getActiveTaskIds(exam)).toHaveLength(1);
    expect(getExamMaxPoints(exam)).toBe(100);
  });

  it("composes note-specific criteria from real VaultNote blocks", () => {
    const pool = [
      parsedGermanNote("01_Deutsch/Sprachwandel.md", "Sprache", "Sprachwandel"),
      parsedGermanNote("01_Deutsch/Sturm-und-Drang.md", "Lyrik", "Sturm und Drang"),
      parsedGermanNote("01_Deutsch/Duerrenmatt.md", "Drama", "Dürrenmatt"),
      parsedGermanNote("01_Deutsch/Digitalisierung.md", "Medien", "Digitalisierung"),
    ];
    const exam = composeExam(pool, "Deutsch", "LK", { seed: 17 });
    const markers: Record<string, string> = {
      "01_Deutsch/Sprachwandel.md": "Sprachwandel",
      "01_Deutsch/Sturm-und-Drang.md": "Sturm und Drang",
      "01_Deutsch/Duerrenmatt.md": "Dürrenmatt",
      "01_Deutsch/Digitalisierung.md": "Digitalisierung",
    };

    for (const task of exam.tasks) {
      expect(
        task.criteria.some((criterion) => criterion.indicatorDE.includes(markers[task.sourceNotePaths[0]]))
      ).toBe(true);
    }
  });

  it("composes identically from a real parsed note and an equivalent ExamSourceNote fixture", () => {
    const parsed = parsedGermanNote("01_Deutsch/Sprachwandel.md", "Sprache", "Sprachwandel");
    const fixture: ExamSourceNote = {
      path: parsed.path,
      subject: parsed.fach,
      title: parsed.thema,
      blocks: parsed.blocks.map((block) => ({
        headingLevel: block.kind === "h2" ? 2 : block.kind === "h3" ? 3 : null,
        text: block.text,
      })),
      examRelevant: parsed.klausurrelevant,
    };

    expect(composeExam([fixture], "Deutsch", "LK", { seed: 17 })).toEqual(
      composeExam([parsed], "Deutsch", "LK", { seed: 17 })
    );
  });

  it("weights low BKT mastery above high mastery", () => {
    const low = note("08_SoWi/Schwach.md", "SoWi", "Beteiligung");
    const high = note("08_SoWi/Stark.md", "SoWi", "Marktwirtschaft");
    const neutral = note("08_SoWi/Neutral.md", "SoWi", "Verfassung");
    const pool = [low, high, neutral];
    const lowId = getExamTopicId("SoWi", low.path);
    const highId = getExamTopicId("SoWi", high.path);
    const exam = composeExam(pool, "SoWi", "LK", {
      seed: 1,
      random: () => 0.5,
      weakTopicBoost: 4,
      masteryLookup: (topicId) => {
        if (topicId === lowId) return mastery(topicId, 0.05);
        if (topicId === highId) return mastery(topicId, 0.95);
        return null;
      },
    });

    expect(exam.tasks[0].sourceNotePaths).toEqual([low.path]);
    expect(exam.tasks.map((task) => task.afb)).toEqual(["AFB I", "AFB II", "AFB III"]);
    expect(new Set(exam.tasks.map((task) => task.sourceNotePaths[0])).size).toBe(3);
  });

  it("is reproducible for a fixed seed and supports distinct variants", () => {
    const pool = mathPool();
    const first = composeExam(pool, "Mathe", "LK", { seed: 123, mathToolset: "CAS" });
    const second = composeExam(pool, "Mathe", "LK", { seed: 123, mathToolset: "CAS" });
    const variants = composeExamVariants(pool, "Mathe", "LK", 3, {
      seed: 123,
      mathToolset: "WTR",
    });

    expect(second).toEqual(first);
    expect(variants).toHaveLength(3);
    expect(new Set(variants.map((exam) => JSON.stringify(exam.tasks)))).toHaveLength(3);
    expect(variants.every((exam) => exam.tasks.length === 14)).toBe(true);
  });

  it("never reaches Math.random on the default deterministic path", () => {
    const random = vi.spyOn(Math, "random");
    try {
      composeExam(mathPool(), "Mathe", "LK", { seed: 77 });
      expect(random).not.toHaveBeenCalled();
    } finally {
      random.mockRestore();
    }
  });

  it("awards only fixed whole criterion points", () => {
    const exam = composeExam(
      [note("08_SoWi/Teilhabe.md", "SoWi", "Teilhabe")],
      "SoWi",
      "GK",
      { seed: 9 }
    );
    const task = exam.tasks[0];
    const allIds = task.criteria.map((criterion) => criterion.id);
    const empty = gradeComposedTask(task, []);
    const full = gradeComposedTask(task, allIds);
    const unknown = gradeComposedTask(task, ["nicht-vorhanden"]);

    expect(task.criteria.reduce((sum, criterion) => sum + criterion.points, 0)).toBe(task.points);
    expect(empty.points).toBe(0);
    expect(full.points).toBe(task.points);
    expect(unknown.points).toBe(0);
    expect(Number.isInteger(full.points)).toBe(true);
    expect(getExamAfbPointTotals(exam)["AFB I"]).toBe(25);
  });
});
