import { describe, it, expect } from "vitest";
import { compileLessonSteps } from "./lessonStepFlow";
import type { ParsedQuestNode } from "./bookIngestParser";

describe("Duolingo-style Lesson Step Flow Compiler", () => {
  const sampleQuest: ParsedQuestNode = {
    id: "q-1-1",
    chapterId: "chap-1",
    order: 1,
    title: "Wahlsystem der BRD: Erst- und Zweitstimme",
    lessonType: "concept",
    estimatedMinutes: 10,
    prerequisites: [],
    matchedToolId: "wahlsystem-sim",
    matchedToolName: "Wahlsystem-Sim",
    interactiveType: "wahlsystem-sim",
    summary: "Einführung in die personalisierte Verhältniswahl und Zweitstimmenmechanik.",
    socraticPrompt: "Warum ist die Zweitstimme wichtiger als die Erststimme?",
    keyConcepts: [],
    xp: 100,
  };

  it("compiles a quest into exactly 5 progressive Duolingo-style steps", () => {
    const result = compileLessonSteps(sampleQuest, "SoWi");
    expect(result.steps.length).toBe(5);

    const types = result.steps.map((s) => s.type);
    expect(types).toEqual(["intuition", "concept", "microworld", "trap", "quiz"]);
  });

  it("provides options with exactly one correct answer for multiple-choice steps", () => {
    const result = compileLessonSteps(sampleQuest, "SoWi");
    const choiceSteps = result.steps.filter((s) => s.type !== "microworld");

    for (const step of choiceSteps) {
      expect(step.options).toBeDefined();
      expect(step.options!.length).toBeGreaterThanOrEqual(2);
      const correctOpts = step.options!.filter((o) => o.isCorrect);
      expect(correctOpts.length).toBe(1);
    }
  });

  it("embeds microworld challenge payload with tool details", () => {
    const result = compileLessonSteps(sampleQuest, "SoWi");
    const microStep = result.steps.find((s) => s.type === "microworld")!;

    expect(microStep.microWorldPayload).toBeDefined();
    expect(microStep.microWorldPayload?.toolId).toBe("wahlsystem-sim");
    expect(microStep.microWorldPayload?.targetCriteriaDE).toBeDefined();
  });

  it("sums up total step XP rewards to >= 120 XP", () => {
    const result = compileLessonSteps(sampleQuest, "SoWi");
    const totalXp = result.steps.reduce((acc, s) => acc + s.xpReward, 0);
    expect(totalXp).toBeGreaterThanOrEqual(120);
  });
});
