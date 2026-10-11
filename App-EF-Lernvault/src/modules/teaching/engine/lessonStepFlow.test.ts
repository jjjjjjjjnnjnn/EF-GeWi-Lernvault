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

  it("compiles a quest into exactly 5 progressive steps with Phase 1 Lecture & Lab first", () => {
    const result = compileLessonSteps(sampleQuest, "SoWi");
    expect(result.steps.length).toBe(5);

    const types = result.steps.map((s) => s.type);
    expect(types).toEqual(["lecture", "microworld", "concept", "trap", "quiz"]);

    // 验证阶段架构：前两步为研习与实验，后三步为考场挑战
    expect(result.steps[0].phase).toBe("learn");
    expect(result.steps[1].phase).toBe("learn");
    expect(result.steps[2].phase).toBe("challenge");
    expect(result.steps[3].phase).toBe("challenge");
    expect(result.steps[4].phase).toBe("challenge");
  });

  it("embeds comprehensive lecture payload in step 1", () => {
    const result = compileLessonSteps(sampleQuest, "SoWi");
    const lectureStep = result.steps[0];

    expect(lectureStep.type).toBe("lecture");
    expect(lectureStep.lecturePayload).toBeDefined();
    expect(lectureStep.lecturePayload?.hookDE).toBeDefined();
    expect(lectureStep.lecturePayload?.klpTermini.length).toBeGreaterThan(0);
    expect(lectureStep.lecturePayload?.causalChainDE.length).toBe(4);
    expect(lectureStep.lecturePayload?.socraticPromptDE).toBeDefined();
  });

  it("provides options with exactly one correct answer for challenge steps", () => {
    const result = compileLessonSteps(sampleQuest, "SoWi");
    const challengeSteps = result.steps.filter((s) => s.phase === "challenge");

    for (const step of challengeSteps) {
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

  it("compiles into a lightweight 3-step flow with lecture first in concept_light mode", () => {
    const lightResult = compileLessonSteps(sampleQuest, "SoWi", "concept_light");
    expect(lightResult.flowMode).toBe("concept_light");
    expect(lightResult.steps.length).toBe(3);

    const types = lightResult.steps.map((s) => s.type);
    expect(types).toEqual(["lecture", "concept", "quiz"]);
    expect(lightResult.steps[0].type).toBe("lecture");
    expect(lightResult.steps[0].phase).toBe("learn");
    expect(lightResult.steps[2].stepNumber).toBe(3);
    expect(lightResult.steps[2].xpReward).toBe(45);
  });

  it("serializes markt-sim into 5 sequential steps including dedicated puzzle and trap steps", () => {
    const marketQuest: ParsedQuestNode = {
      ...sampleQuest,
      id: "q-market",
      title: "Das Modell des vollkommenen Marktes (Angebot & Nachfrage)",
      interactiveType: "markt-sim",
      matchedToolId: "markt-sim",
    };

    const result = compileLessonSteps(marketQuest, "SoWi");
    expect(result.steps.length).toBe(5);
    expect(result.steps.map((s) => s.type)).toEqual([
      "lecture",
      "microworld",
      "puzzle",
      "trap",
      "quiz",
    ]);
    expect(result.steps[2].titleZH).toContain("四大假设现实对决拼图");
    expect(result.steps[2].stepNumber).toBe(3);
    expect(result.steps[3].stepNumber).toBe(4);
    expect(result.steps[4].stepNumber).toBe(5);
  });
});
