import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  UNIFIED_TOPIC_REGISTRY,
  getTopicsForFach,
  getTopicById,
  getAllTopics,
  findTopicForLaborSim,
  findTopicForReiseCourse,
  findTopicForNote,
  filterTopicsByDifficulty,
  findTopicsByTag,
} from "./topicHub";
import {
  teachingStore,
  markPhaseCompleted,
  completeTopicLoop,
  getTopicLoopProgress,
  isTopicLoopCompleted,
  resetTopicLoop,
  clearTeachingProgress,
  loadTeachingState,
  TEACHING_TOPIC_LOOP_COMPLETED_EVENT,
  TEACHING_STUDIO_UPDATED_EVENT,
} from "./teachingStore";
import { SKILL_TREE_MASTERED_EVENT } from "../../../engine/skillTree";
import { SIMULATION_REGISTRY } from "../../laborRegistry";

describe("Topic Hub Registry & Closed-Loop Engine: topicHub & teachingStore", () => {
  beforeEach(() => {
    window.localStorage.clear();
    clearTeachingProgress();
    vi.restoreAllMocks();
  });

  describe("1. UNIFIED_TOPIC_REGISTRY Validation", () => {
    it("should have pre-registered topics covering all core subjects", () => {
      const all = getAllTopics();
      expect(all.length).toBeGreaterThan(15);

      const subjects = new Set(all.map((t) => t.fach));
      expect(subjects.has("SoWi")).toBe(true);
      expect(subjects.has("Deutsch")).toBe(true);
      expect(subjects.has("Philosophie")).toBe(true);
      expect(subjects.has("Physik")).toBe(true);
      expect(subjects.has("Mathe")).toBe(true);
      expect(subjects.has("Chemie")).toBe(true);
      expect(subjects.has("Bio")).toBe(true);
      expect(subjects.has("Englisch")).toBe(true);
    });

    it("every topic should have non-empty required fields and valid difficulty", () => {
      const validDifficulties = new Set(["grundlagen", "vertiefung", "klausur"]);
      const registeredSimIds = new Set(SIMULATION_REGISTRY.map((s) => s.id));

      for (const topic of UNIFIED_TOPIC_REGISTRY) {
        expect(topic.id).toBeTruthy();
        expect(topic.fach).toBeTruthy();
        expect(topic.titleDE).toBeTruthy();
        expect(topic.titleZH).toBeTruthy();
        expect(topic.descriptionDE).toBeTruthy();
        expect(topic.descriptionZH).toBeTruthy();
        expect(validDifficulties.has(topic.difficulty)).toBe(true);

        // If laborSimId is declared, verify it exists in SIMULATION_REGISTRY
        if (topic.laborSimId) {
          expect(
            registeredSimIds.has(topic.laborSimId),
            `Topic ${topic.id} has unregistered laborSimId: ${topic.laborSimId}`
          ).toBe(true);
        }
      }
    });
  });

  describe("2. Subject Filtering and Dynamic Topic Synthesis", () => {
    it("retrieves topics for SoWi case-insensitively", () => {
      const sowiLower = getTopicsForFach("sowi");
      const sowiUpper = getTopicsForFach("SoWi");
      expect(sowiLower.length).toBeGreaterThanOrEqual(4);
      expect(sowiLower).toEqual(sowiUpper);
      expect(sowiLower.every((t) => t.fach === "SoWi")).toBe(true);
    });

    it("retrieves topics for Deutsch, Physik and Mathe", () => {
      const deutsch = getTopicsForFach("Deutsch");
      expect(deutsch.length).toBeGreaterThanOrEqual(3);
      expect(deutsch.some((t) => t.id === "deutsch-sachtext-leserlenkung")).toBe(true);

      const physik = getTopicsForFach("Physik");
      expect(physik.length).toBeGreaterThanOrEqual(3);
      expect(physik.some((t) => t.laborSimId === "kinematik")).toBe(true);

      const mathe = getTopicsForFach("Mathe");
      expect(mathe.length).toBeGreaterThanOrEqual(3);
      expect(mathe.some((t) => t.laborSimId === "tangent")).toBe(true);
    });

    it("handles subject aliases correctly (e.g. math -> mathe, physics -> physik)", () => {
      const math = getTopicsForFach("math");
      expect(math.some((t) => t.fach === "Mathe")).toBe(true);

      const physics = getTopicsForFach("physics");
      expect(physics.some((t) => t.fach === "Physik")).toBe(true);
    });

    it("gracefully generates a synthetic fallback topic for unknown subjects", () => {
      const fallback = getTopicsForFach("Astronomie");
      expect(fallback.length).toBe(1);
      expect(fallback[0].fach).toBe("Astronomie");
      expect(fallback[0].id).toBe("astronomie-grundlagen-loop");
      expect(fallback[0].titleDE).toContain("Astronomie");
    });
  });

  describe("3. Lookup and Cross-Module Linking", () => {
    it("finds topic by unique id", () => {
      const topic = getTopicById("sowi-soziale-marktwirtschaft");
      expect(topic).toBeDefined();
      expect(topic?.fach).toBe("SoWi");
      expect(topic?.laborSimId).toBe("markt");
      expect(topic?.reiseCourseId).toBe("Lernreise/Sowi-Soziale-Marktwirtschaft-L1.md");
    });

    it("finds topic for a specific laborSimId", () => {
      const topic = findTopicForLaborSim("wahlsystem-sim");
      expect(topic).toBeDefined();
      expect(topic?.id).toBe("sowi-wahlsystem-bundestag");
    });

    it("finds topic for a specific reiseCourseId", () => {
      const topic = findTopicForReiseCourse("Lernreise/SoWi-Wertpapierdepot-Orderarten-L1.md");
      expect(topic).toBeDefined();
      expect(topic?.id).toBe("sowi-wertpapierdepot-orderarten");
    });

    it("finds topic for a specific noteId", () => {
      const topic = findTopicForNote("philo-kant-kategorischer");
      expect(topic).toBeDefined();
      expect(topic?.fach).toBe("Philosophie");
    });

    it("filters topics by difficulty", () => {
      const sowiTopics = getTopicsForFach("SoWi");
      const grundlagen = filterTopicsByDifficulty(sowiTopics, "grundlagen");
      const klausur = filterTopicsByDifficulty(sowiTopics, "klausur");

      expect(grundlagen.every((t) => t.difficulty === "grundlagen")).toBe(true);
      expect(klausur.every((t) => t.difficulty === "klausur")).toBe(true);
    });

    it("searches topics by tag keyword", () => {
      const ethikTopics = findTopicsByTag("Ethik");
      expect(ethikTopics.length).toBeGreaterThanOrEqual(1);
      expect(ethikTopics.some((t) => t.fach === "Philosophie")).toBe(true);
    });
  });

  describe("4. Four-Phase Closed Loop Progression & Store Updates", () => {
    it("starts with clean unstudied state", () => {
      const progress = getTopicLoopProgress("sowi-soziale-marktwirtschaft");
      expect(progress.hasReadLecture).toBe(false);
      expect(progress.hasExploredLabor).toBe(false);
      expect(progress.hasReviewedNotes).toBe(false);
      expect(progress.hasPassedQuiz).toBe(false);
      expect(progress.completedAt).toBeUndefined();
      expect(isTopicLoopCompleted("sowi-soziale-marktwirtschaft")).toBe(false);
    });

    it("progresses step-by-step through lecture, labor, notes, and quiz", () => {
      const topicId = "sowi-soziale-marktwirtschaft";
      const eventsDispatched: string[] = [];

      const onLoopCompleted = () => eventsDispatched.push(TEACHING_TOPIC_LOOP_COMPLETED_EVENT);
      const onStudioUpdated = () => eventsDispatched.push(TEACHING_STUDIO_UPDATED_EVENT);
      const onSkillTreeMastered = () => eventsDispatched.push(SKILL_TREE_MASTERED_EVENT);

      window.addEventListener(TEACHING_TOPIC_LOOP_COMPLETED_EVENT, onLoopCompleted);
      window.addEventListener(TEACHING_STUDIO_UPDATED_EVENT, onStudioUpdated);
      window.addEventListener(SKILL_TREE_MASTERED_EVENT, onSkillTreeMastered);

      // Phase 1: Lecture
      const p1 = markPhaseCompleted(topicId, "lecture", { xp: 20 });
      expect(p1.loop.hasReadLecture).toBe(true);
      expect(p1.loop.hasExploredLabor).toBe(false);
      expect(p1.isLoopComplete).toBe(false);
      expect(p1.xpEarned).toBe(20);
      expect(p1.mastery.level).toBe(0);

      // Phase 2: Labor
      const p2 = markPhaseCompleted(topicId, "labor", { xp: 20 });
      expect(p2.loop.hasReadLecture).toBe(true);
      expect(p2.loop.hasExploredLabor).toBe(true);
      expect(p2.isLoopComplete).toBe(false);

      // Phase 3: Notes
      const p3 = markPhaseCompleted(topicId, "notes", { xp: 15 });
      expect(p3.loop.hasReviewedNotes).toBe(true);
      expect(p3.isLoopComplete).toBe(false);

      // Phase 4: Quiz (Triggers completion and bonus XP)
      const p4 = markPhaseCompleted(topicId, "quiz", {
        xp: 25,
        mistakes: ["operator-verfehlt"],
      });
      expect(p4.loop.hasPassedQuiz).toBe(true);
      expect(p4.isLoopComplete).toBe(true);
      expect(p4.loop.completedAt).toBeDefined();
      expect(p4.xpEarned).toBe(25 + 40); // 25 base + 40 loop bonus
      expect(p4.mastery.level).toBe(1);
      expect(p4.mastery.mistakes).toContain("operator-verfehlt");

      // Verify events triggered
      expect(eventsDispatched).toContain(TEACHING_TOPIC_LOOP_COMPLETED_EVENT);
      expect(eventsDispatched).toContain(TEACHING_STUDIO_UPDATED_EVENT);
      expect(eventsDispatched).toContain(SKILL_TREE_MASTERED_EVENT);

      // Verify query methods reflect state
      expect(isTopicLoopCompleted(topicId)).toBe(true);
      const state = loadTeachingState();
      expect(state.topicLoops[topicId]?.completedAt).toBeDefined();
      expect(state.topicMastery[topicId]?.level).toBe(1);

      window.removeEventListener(TEACHING_TOPIC_LOOP_COMPLETED_EVENT, onLoopCompleted);
      window.removeEventListener(TEACHING_STUDIO_UPDATED_EVENT, onStudioUpdated);
      window.removeEventListener(SKILL_TREE_MASTERED_EVENT, onSkillTreeMastered);
    });

    it("allows repeating an already completed phase with diminished XP without resetting other phases", () => {
      const topicId = "physik-kinematik-newton";
      markPhaseCompleted(topicId, "lecture", { xp: 15 });
      const initialTotalXp = teachingStore.getState().totalXp;

      // Repeat lecture without specifying custom xp (defaults to repeat rate = 5 XP)
      const repeatResult = markPhaseCompleted(topicId, "lecture");
      expect(repeatResult.xpEarned).toBe(5);
      expect(repeatResult.totalXp).toBe(initialTotalXp + 5);
      expect(repeatResult.loop.hasReadLecture).toBe(true);
    });

    it("supports one-shot completeTopicLoop", () => {
      const topicId = "deutsch-sachtext-leserlenkung";
      const res = completeTopicLoop(topicId, {
        xpEarned: 100,
        fach: "Deutsch",
        mistakes: ["TATTE-Zeilenangabe"],
      });

      expect(res.success).toBe(true);
      expect(res.loop.hasReadLecture).toBe(true);
      expect(res.loop.hasExploredLabor).toBe(true);
      expect(res.loop.hasReviewedNotes).toBe(true);
      expect(res.loop.hasPassedQuiz).toBe(true);
      expect(res.loop.completedAt).toBeDefined();
      expect(res.mastery.level).toBe(1);
      expect(res.mastery.mistakes).toEqual(["TATTE-Zeilenangabe"]);

      expect(isTopicLoopCompleted(topicId)).toBe(true);
    });

    it("supports resetTopicLoop and clearTeachingProgress", () => {
      const topicId = "mathe-differentialrechnung-tangente";
      completeTopicLoop(topicId);
      expect(isTopicLoopCompleted(topicId)).toBe(true);

      const resetSuccess = resetTopicLoop(topicId);
      expect(resetSuccess).toBe(true);
      expect(isTopicLoopCompleted(topicId)).toBe(false);

      // Re-complete then clear all
      completeTopicLoop(topicId);
      clearTeachingProgress();
      const freshState = teachingStore.getState();
      expect(freshState.totalXp).toBe(0);
      expect(freshState.topicLoops[topicId]).toBeUndefined();
      expect(freshState.topicMastery[topicId]).toBeUndefined();
    });
  });
});
