import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getTeachingStudioTotalXp,
  setTeachingStudioTotalXp,
  addTeachingStudioXp,
  getMasteredQuests,
  saveMasteredQuests,
  getCompletedQuestIds,
  isQuestMastered,
  getActiveBookId,
  getActiveBook,
  setActiveBook,
  getActivePlan,
  setActivePlan,
  clearTeachingProgress,
  completeQuest,
  resetQuestMastery,
  isQuestAvailable,
  getTodaysQuest,
  getSubjectProgress,
  TEACHING_STUDIO_XP_KEY,
  TEACHING_STUDIO_UPDATED_EVENT,
} from "./teachingStore";
import { SKILL_TREE_MASTERED_EVENT } from "../../../engine/skillTree";
import type { ParsedBookStructure } from "./bookIngestParser";
import type { PacingPlan } from "./pacingPlanner";

describe("Teaching Studio State Management: teachingStore", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  const sampleBook: ParsedBookStructure = {
    title: "NRW SoWi EF Grundkurs",
    fach: "SoWi",
    rawInputLength: 500,
    chapters: [
      {
        id: "chap_1",
        order: 1,
        title: "Kapitel 1: Wahlen & Partizipation",
        totalMinutes: 30,
        nodes: [
          {
            id: "node_1",
            chapterId: "chap_1",
            order: 1,
            title: "Wahlsystem & Erststimme",
            lessonType: "concept",
            estimatedMinutes: 10,
            prerequisites: [],
            matchedToolId: "scenario_tree",
            matchedToolName: "ScenarioDecisionTree",
            interactiveType: "scenario_tree",
            summary: "Einfuehrung Erststimme",
            socraticPrompt: "Was bewirkt die Erststimme?",
            keyConcepts: [],
            xp: 50,
          },
          {
            id: "node_2",
            chapterId: "chap_1",
            order: 2,
            title: "Zweitstimme & Sitzverteilung",
            lessonType: "concept",
            estimatedMinutes: 12,
            prerequisites: ["node_1"],
            matchedToolId: "wahlsystem-sim",
            matchedToolName: "Wahlsystem-Sim",
            interactiveType: "wahlsystem-sim",
            summary: "Zweitstimmen-Verhaeltniswahl",
            socraticPrompt: "Warum bestimmt die Zweitstimme die Mehrheit?",
            keyConcepts: [],
            xp: 60,
          },
          {
            id: "node_3",
            chapterId: "chap_1",
            order: 3,
            title: "Ueberhang- und Ausgleichsmandate",
            lessonType: "practice",
            estimatedMinutes: 15,
            prerequisites: ["node_2"],
            matchedToolId: "wahlsystem-sim",
            matchedToolName: "Wahlsystem-Sim",
            interactiveType: "wahlsystem-sim",
            summary: "Mandatsausgleich",
            socraticPrompt: "Warum waechst der Bundestag an?",
            keyConcepts: [],
            xp: 70,
          },
        ],
      },
    ],
    totalNodes: 3,
    totalMinutes: 37,
    dagEdgesCount: 2,
    createdAt: "2026-10-10T12:00:00.000Z",
  };

  it("handles Teaching Studio XP persistence correctly", () => {
    expect(getTeachingStudioTotalXp()).toBe(0);

    setTeachingStudioTotalXp(120);
    expect(getTeachingStudioTotalXp()).toBe(120);
    expect(window.localStorage.getItem(TEACHING_STUDIO_XP_KEY)).toBe("120");

    const updated = addTeachingStudioXp(50);
    expect(updated).toBe(170);
    expect(getTeachingStudioTotalXp()).toBe(170);
  });

  it("handles mastered quests persistence correctly", () => {
    expect(getMasteredQuests()).toEqual({});
    expect(getCompletedQuestIds()).toEqual([]);
    expect(isQuestMastered("node_1")).toBe(false);

    saveMasteredQuests({
      node_1: { completedAt: "2026-10-10T12:00:00.000Z", xpEarned: 50 },
    });

    expect(isQuestMastered("node_1")).toBe(true);
    expect(getCompletedQuestIds()).toEqual(["node_1"]);
    expect(getMasteredQuests().node_1.xpEarned).toBe(50);
  });

  it("handles active book and active plan persistence", () => {
    expect(getActiveBookId()).toBeNull();
    expect(getActiveBook()).toBeNull();
    expect(getActivePlan()).toBeNull();

    setActiveBook(sampleBook);
    expect(getActiveBookId()).toBe(sampleBook.title);
    expect(getActiveBook()?.title).toBe(sampleBook.title);

    const dummyPlan: PacingPlan = {
      pacingMode: "balanced",
      targetDays: 7,
      targetDailyMinutes: 12,
      totalQuests: 3,
      totalEstimatedMinutes: 37,
      totalReviewSlots: 0,
      dailySlots: [],
      feasibility: "optimal",
      motivationalTip: { de: "Tipp", zh: "提示" },
    };

    setActivePlan(dummyPlan);
    expect(getActivePlan()?.pacingMode).toBe("balanced");

    clearTeachingProgress();
    expect(getActiveBook()).toBeNull();
    expect(getActivePlan()).toBeNull();
    expect(getTeachingStudioTotalXp()).toBe(0);
    expect(getMasteredQuests()).toEqual({});
  });

  it("executes completeQuest workflow: records quest, updates streak, adds XP, and dispatches events", () => {
    const skillEventListener = vi.fn();
    const studioEventListener = vi.fn();

    window.addEventListener(SKILL_TREE_MASTERED_EVENT, skillEventListener);
    window.addEventListener(TEACHING_STUDIO_UPDATED_EVENT, studioEventListener);

    const result = completeQuest("node_1", 50, "SoWi");

    expect(result.success).toBe(true);
    expect(result.questId).toBe("node_1");
    expect(result.xpEarned).toBe(50);
    expect(result.totalXp).toBe(50);
    expect(result.streak).toBeDefined();
    expect(result.streak.currentStreak).toBeGreaterThanOrEqual(1);

    // Verify localStorage updates
    expect(isQuestMastered("node_1")).toBe(true);
    expect(getTeachingStudioTotalXp()).toBe(50);

    // Verify events were dispatched
    expect(skillEventListener).toHaveBeenCalled();
    expect(studioEventListener).toHaveBeenCalled();

    window.removeEventListener(SKILL_TREE_MASTERED_EVENT, skillEventListener);
    window.removeEventListener(TEACHING_STUDIO_UPDATED_EVENT, studioEventListener);
  });

  it("resets quest mastery with resetQuestMastery", () => {
    completeQuest("node_1", 50, "SoWi");
    expect(isQuestMastered("node_1")).toBe(true);

    const resetSuccess = resetQuestMastery("node_1");
    expect(resetSuccess).toBe(true);
    expect(isQuestMastered("node_1")).toBe(false);

    expect(resetQuestMastery("non_existent")).toBe(false);
  });

  describe("Helper functions: isQuestAvailable, getTodaysQuest, getSubjectProgress", () => {
    const [node1, node2, node3] = sampleBook.chapters[0].nodes;

    it("evaluates isQuestAvailable based on prerequisites and completed IDs", () => {
      // Node 1 has no prerequisites -> always available
      expect(isQuestAvailable(node1, [])).toBe(true);

      // Node 2 requires node 1
      expect(isQuestAvailable(node2, [])).toBe(false);
      expect(isQuestAvailable(node2, ["node_1"])).toBe(true);

      // Node 3 requires node 2
      expect(isQuestAvailable(node3, ["node_1"])).toBe(false);
      expect(isQuestAvailable(node3, ["node_1", "node_2"])).toBe(true);
    });

    it("evaluates getTodaysQuest progressing along DAG", () => {
      // Initially, node 1 is the first available uncompleted quest
      const today1 = getTodaysQuest(sampleBook, []);
      expect(today1?.id).toBe("node_1");

      // Once node 1 is completed, node 2 becomes available and today's quest
      const today2 = getTodaysQuest(sampleBook, ["node_1"]);
      expect(today2?.id).toBe("node_2");

      // Once node 1 and 2 are completed, node 3 becomes today's quest
      const today3 = getTodaysQuest(sampleBook, ["node_1", "node_2"]);
      expect(today3?.id).toBe("node_3");

      // Once all are completed, today's quest is null
      const todayDone = getTodaysQuest(sampleBook, ["node_1", "node_2", "node_3"]);
      expect(todayDone).toBeNull();
    });

    it("calculates accurate getSubjectProgress statistics", () => {
      // 0 completed
      const prog0 = getSubjectProgress(sampleBook, []);
      expect(prog0.totalQuests).toBe(3);
      expect(prog0.masteredCount).toBe(0);
      expect(prog0.progressPercent).toBe(0);
      expect(prog0.totalXp).toBe(180); // 50 + 60 + 70
      expect(prog0.earnedXp).toBe(0);

      // 1 completed (node_1: 50 xp)
      const prog1 = getSubjectProgress(sampleBook, ["node_1"]);
      expect(prog1.masteredCount).toBe(1);
      expect(prog1.progressPercent).toBe(33);
      expect(prog1.earnedXp).toBe(50);

      // 2 completed (node_1 + node_2: 110 xp)
      const prog2 = getSubjectProgress(sampleBook, ["node_1", "node_2"]);
      expect(prog2.masteredCount).toBe(2);
      expect(prog2.progressPercent).toBe(67);
      expect(prog2.earnedXp).toBe(110);

      // 3 completed (all 180 xp)
      const prog3 = getSubjectProgress(sampleBook, ["node_1", "node_2", "node_3"]);
      expect(prog3.masteredCount).toBe(3);
      expect(prog3.progressPercent).toBe(100);
      expect(prog3.earnedXp).toBe(180);
    });
  });
});
