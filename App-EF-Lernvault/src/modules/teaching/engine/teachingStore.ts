// Teaching Studio Persistent State Machine & Mastery Bridge
// 教学工坊持久化状态机：管理关卡通关历史、经验值、每日连击、四步研习闭环与 712 节点技能树联动

import type { ParsedBookStructure, ParsedQuestNode } from "./bookIngestParser";
import type { PacingPlan } from "./pacingPlanner";
import { recordStudySprintCompleted, getStudyStreak, type StreakData } from "../../../engine/dailyMix";
import { markNodeMasteredByCourseId, SKILL_TREE_MASTERED_EVENT } from "../../../engine/skillTree";

export const TEACHING_STUDIO_XP_KEY = "teaching_studio_xp";
export const TEACHING_MASTERED_QUESTS_KEY = "teaching_studio_mastered_quests";
export const TEACHING_ACTIVE_BOOK_KEY = "teaching_studio_active_book";
export const TEACHING_ACTIVE_PLAN_KEY = "teaching_studio_active_plan";
export const TEACHING_STUDIO_UPDATED_EVENT = "teaching-studio-updated";

// 新增：四步研习闭环持久化键与事件
export const TEACHING_TOPIC_LOOPS_KEY = "teaching_studio_topic_loops";
export const TEACHING_TOPIC_MASTERY_KEY = "teaching_studio_topic_mastery";
export const TEACHING_TOPIC_LOOP_COMPLETED_EVENT = "teaching-topic-loop-completed";

export type TopicPhaseId = "lecture" | "labor" | "notes" | "quiz";

export interface TopicPhaseCompletionStatus {
  hasReadLecture: boolean;
  hasExploredLabor: boolean;
  hasReviewedNotes: boolean;
  hasPassedQuiz: boolean;
}

export interface TopicLoopProgress extends TopicPhaseCompletionStatus {
  topicId: string;
  completedAt?: string;
  phaseTimestamps?: Partial<Record<TopicPhaseId, string>>;
}

export interface TopicMasteryRecord {
  level: number;
  xpEarned: number;
  lastStudiedAt: string;
  mistakes: string[];
}

export interface QuestMasteryRecord {
  questId?: string;
  completedAt: string;
  xpEarned: number;
  mistakesCount?: number;
}

export interface TeachingStudioState {
  activeBookId: string | null;
  activeBook: ParsedBookStructure | null;
  activePlan: PacingPlan | null;
  masteredQuests: Record<string, QuestMasteryRecord>;
  completedQuestIds: string[];
  totalEarnedXp: number;
  totalXp: number;
  streakDays: number;
  todayCompletedCount: number;
  streak: StreakData;
  lastUpdated: string;
  // 新增：四步研习闭环与学科主题掌握度
  topicLoops: Record<string, TopicLoopProgress>;
  topicMastery: Record<string, TopicMasteryRecord>;
}

const listeners = new Set<(state: TeachingStudioState) => void>();

export function notifyListeners(state: TeachingStudioState): void {
  for (const listener of listeners) {
    try {
      listener(state);
    } catch {
      // 保护性容错
    }
  }
}

/* =========================================================================
   XP Persistence
   ========================================================================= */

export function getTeachingStudioTotalXp(): number {
  if (typeof window === "undefined" || !window.localStorage) return 0;
  const raw = window.localStorage.getItem(TEACHING_STUDIO_XP_KEY);
  if (!raw) return 0;
  const parsed = parseInt(raw, 10);
  return isNaN(parsed) ? 0 : parsed;
}

export function setTeachingStudioTotalXp(xp: number): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  window.localStorage.setItem(TEACHING_STUDIO_XP_KEY, String(Math.max(0, xp)));
}

export function addTeachingStudioXp(delta: number): number {
  const current = getTeachingStudioTotalXp();
  const next = current + Math.max(0, delta);
  setTeachingStudioTotalXp(next);
  return next;
}

/* =========================================================================
   Mastered Quests Persistence
   ========================================================================= */

export function getMasteredQuests(): Record<string, QuestMasteryRecord> {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(TEACHING_MASTERED_QUESTS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function saveMasteredQuests(quests: Record<string, QuestMasteryRecord>): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(TEACHING_MASTERED_QUESTS_KEY, JSON.stringify(quests));
  } catch {
    // 保护性容错
  }
}

export function getCompletedQuestIds(): string[] {
  return Object.keys(getMasteredQuests());
}

export function isQuestMastered(questId: string): boolean {
  const mastered = getMasteredQuests();
  return Boolean(mastered[questId]);
}

/* =========================================================================
   Topic Loops & Mastery Persistence (四步研习闭环持久化)
   ========================================================================= */

export function getTopicLoops(): Record<string, TopicLoopProgress> {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(TEACHING_TOPIC_LOOPS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function saveTopicLoops(loops: Record<string, TopicLoopProgress>): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(TEACHING_TOPIC_LOOPS_KEY, JSON.stringify(loops));
  } catch {
    // 保护性容错
  }
}

export function getTopicMastery(): Record<string, TopicMasteryRecord> {
  if (typeof window === "undefined" || !window.localStorage) return {};
  try {
    const raw = window.localStorage.getItem(TEACHING_TOPIC_MASTERY_KEY);
    if (!raw) return {};
    return JSON.parse(raw) || {};
  } catch {
    return {};
  }
}

export function saveTopicMastery(mastery: Record<string, TopicMasteryRecord>): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    window.localStorage.setItem(TEACHING_TOPIC_MASTERY_KEY, JSON.stringify(mastery));
  } catch {
    // 保护性容错
  }
}

export function getTopicLoopProgress(topicId: string): TopicLoopProgress {
  const loops = getTopicLoops();
  return (
    loops[topicId] || {
      topicId,
      hasReadLecture: false,
      hasExploredLabor: false,
      hasReviewedNotes: false,
      hasPassedQuiz: false,
    }
  );
}

export function isTopicLoopCompleted(topicId: string): boolean {
  const loop = getTopicLoopProgress(topicId);
  return Boolean(
    loop.completedAt ||
      (loop.hasReadLecture && loop.hasExploredLabor && loop.hasReviewedNotes && loop.hasPassedQuiz)
  );
}

/* =========================================================================
   Active Book & Plan Persistence
   ========================================================================= */

export function getActiveBook(): ParsedBookStructure | null {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(TEACHING_ACTIVE_BOOK_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setActiveBook(book: ParsedBookStructure | null): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    if (!book) {
      window.localStorage.removeItem(TEACHING_ACTIVE_BOOK_KEY);
    } else {
      window.localStorage.setItem(TEACHING_ACTIVE_BOOK_KEY, JSON.stringify(book));
    }
  } catch {
    // 保护性容错
  }
}

export function getActiveBookId(): string | null {
  const book = getActiveBook();
  if (!book) return null;
  const id = (book as { id?: unknown }).id;
  return typeof id === "string" && id.length > 0 ? id : book.title;
}

export function setActiveBookId(id: string | null): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    if (!id) {
      window.localStorage.removeItem(TEACHING_ACTIVE_BOOK_KEY);
      return;
    }
    const book = getActiveBook();
    if (book) {
      (book as { id?: string }).id = id;
      window.localStorage.setItem(TEACHING_ACTIVE_BOOK_KEY, JSON.stringify(book));
    } else {
      // 无整书缓存时存 id 垫片，getActiveBookId 仍可按 id 取回
      window.localStorage.setItem(
        TEACHING_ACTIVE_BOOK_KEY,
        JSON.stringify({
          id,
          title: id,
          fach: "SoWi",
          rawInputLength: 0,
          chapters: [],
          totalNodes: 0,
          totalMinutes: 0,
          dagEdgesCount: 0,
          createdAt: new Date().toISOString(),
        })
      );
    }
  } catch {
    // 保护性容错
  }
}

export function getActivePlan(): PacingPlan | null {
  if (typeof window === "undefined" || !window.localStorage) return null;
  try {
    const raw = window.localStorage.getItem(TEACHING_ACTIVE_PLAN_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function setActivePlan(plan: PacingPlan | null): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    if (!plan) {
      window.localStorage.removeItem(TEACHING_ACTIVE_PLAN_KEY);
    } else {
      window.localStorage.setItem(TEACHING_ACTIVE_PLAN_KEY, JSON.stringify(plan));
    }
  } catch {
    // 保护性容错
  }
}

export function clearTeachingProgress(): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  window.localStorage.removeItem(TEACHING_STUDIO_XP_KEY);
  window.localStorage.removeItem(TEACHING_MASTERED_QUESTS_KEY);
  window.localStorage.removeItem(TEACHING_ACTIVE_BOOK_KEY);
  window.localStorage.removeItem(TEACHING_ACTIVE_PLAN_KEY);
  window.localStorage.removeItem(TEACHING_TOPIC_LOOPS_KEY);
  window.localStorage.removeItem(TEACHING_TOPIC_MASTERY_KEY);
  notifyListeners(loadTeachingState());
}

/* =========================================================================
   Unified State Loading
   ========================================================================= */

export function loadTeachingState(): TeachingStudioState {
  const streak = getStudyStreak();
  const masteredQuests = getMasteredQuests();
  const completedQuestIds = Object.keys(masteredQuests);
  const totalXp = getTeachingStudioTotalXp();
  const todayStr = new Date().toISOString().split("T")[0];
  const topicLoops = getTopicLoops();
  const topicMastery = getTopicMastery();

  const todayCompletedCount = completedQuestIds.filter((id) => {
    const record = masteredQuests[id];
    return record && record.completedAt && record.completedAt.startsWith(todayStr);
  }).length;

  return {
    activeBookId: getActiveBookId(),
    activeBook: getActiveBook(),
    activePlan: getActivePlan(),
    masteredQuests,
    completedQuestIds,
    totalEarnedXp: totalXp,
    totalXp,
    streakDays: streak.currentStreak,
    todayCompletedCount,
    streak,
    lastUpdated: todayStr,
    topicLoops,
    topicMastery,
  };
}

export function saveTeachingState(state: TeachingStudioState): void {
  setTeachingStudioTotalXp(state.totalXp);
  saveMasteredQuests(state.masteredQuests);
  if (state.activeBook) setActiveBook(state.activeBook);
  if (state.activePlan) setActivePlan(state.activePlan);
  if (state.topicLoops) saveTopicLoops(state.topicLoops);
  if (state.topicMastery) saveTopicMastery(state.topicMastery);
}

/* =========================================================================
   Complete Quest Workflow
   XP 口径统一（全工坊唯一口径）：首次通关按 quest.xp 全额发放；
   重复温故仅发放 30%（Math.round 下取整口径一致），防刷分。
   ========================================================================= */

export function completeQuest(
  questId: string,
  xpEarned: number,
  fach = "SoWi",
  mistakesCount = 0
): {
  success: boolean;
  questId: string;
  xpEarned: number;
  totalXp: number;
  streak: StreakData;
  firstMastery: boolean;
} {
  const todayStr = new Date().toISOString();
  const currentMastered = getMasteredQuests();
  const firstMastery = !currentMastered[questId];

  // 1. 保存通关记录
  currentMastered[questId] = {
    questId,
    completedAt: todayStr,
    xpEarned: (currentMastered[questId]?.xpEarned || 0) + xpEarned,
    mistakesCount,
  };
  saveMasteredQuests(currentMastered);

  // 2. 累加 XP
  const awardXp = firstMastery ? xpEarned : Math.round(xpEarned * 0.3);
  const totalXp = addTeachingStudioXp(awardXp);

  // 3. 记录连击打卡
  const streak = recordStudySprintCompleted();

  // 4. 技能树穿透联动
  try {
    markNodeMasteredByCourseId(questId);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(SKILL_TREE_MASTERED_EVENT, {
          detail: {
            nodeId: questId,
            courseId: questId,
            source: "teaching-studio",
          },
        })
      );
    }
  } catch {
    // 保护性容错
  }

  // 5. 广播教学工坊更新事件
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(TEACHING_STUDIO_UPDATED_EVENT, {
        detail: {
          questId,
          xpEarned: awardXp,
          fach,
        },
      })
    );
  }

  const newState = loadTeachingState();
  notifyListeners(newState);

  return {
    success: true,
    questId,
    xpEarned: awardXp,
    totalXp,
    streak,
    firstMastery,
  };
}

export function resetQuestMastery(questId: string): boolean {
  const current = getMasteredQuests();
  if (!current[questId]) return false;
  delete current[questId];
  saveMasteredQuests(current);
  notifyListeners(loadTeachingState());
  return true;
}

export function markQuestCompletedInStore(
  questId: string,
  xpEarned: number,
  fach = "SoWi",
  mistakesCount = 0
): TeachingStudioState {
  completeQuest(questId, xpEarned, fach, mistakesCount);
  return loadTeachingState();
}

export function toggleQuestMasteredInStore(
  questId: string,
  xpEarned = 35,
  fach = "SoWi"
): TeachingStudioState {
  if (isQuestMastered(questId)) {
    resetQuestMastery(questId);
  } else {
    completeQuest(questId, xpEarned, fach);
  }
  return loadTeachingState();
}

/* =========================================================================
   Four-Step Topic Loop Workflow (四步闭环研习状态机)
   1. 互动精讲 (lecture)
   2. 仿真教具 (labor)
   3. 知识卡片/笔记 (notes)
   4. 会考过关自测 (quiz)
   ========================================================================= */

export interface MarkPhaseOptions {
  xp?: number;
  fach?: string;
  mistakes?: string[];
}

/**
 * 标记特定主题下的某一阶段（lecture / labor / notes / quiz）完成
 * 自动识别是否达成 4 步全流程闭环，并发放闭环奖励与广播事件
 */
export function markPhaseCompleted(
  topicId: string,
  phase: TopicPhaseId,
  options?: MarkPhaseOptions
): {
  loop: TopicLoopProgress;
  isLoopComplete: boolean;
  totalXp: number;
  xpEarned: number;
  mastery: TopicMasteryRecord;
} {
  const loops = getTopicLoops();
  const existing: TopicLoopProgress = loops[topicId] || {
    topicId,
    hasReadLecture: false,
    hasExploredLabor: false,
    hasReviewedNotes: false,
    hasPassedQuiz: false,
    phaseTimestamps: {},
  };

  const nowIso = new Date().toISOString();
  const phaseMap: Record<TopicPhaseId, keyof TopicPhaseCompletionStatus> = {
    lecture: "hasReadLecture",
    labor: "hasExploredLabor",
    notes: "hasReviewedNotes",
    quiz: "hasPassedQuiz",
  };

  const field = phaseMap[phase];
  const wasAlreadyCompleted = Boolean(existing[field]);
  existing[field] = true;
  existing.phaseTimestamps = {
    ...existing.phaseTimestamps,
    [phase]: nowIso,
  };

  const isAllFourDone =
    existing.hasReadLecture &&
    existing.hasExploredLabor &&
    existing.hasReviewedNotes &&
    existing.hasPassedQuiz;

  const wasCompletedBefore = Boolean(existing.completedAt);
  if (isAllFourDone && !existing.completedAt) {
    existing.completedAt = nowIso;
  }
  loops[topicId] = existing;
  saveTopicLoops(loops);

  // XP 计算：单阶段初次完成 15 XP，若已完成重复温习则 5 XP；若首次形成闭环额外奖励 40 XP
  const phaseBaseXp = options?.xp !== undefined ? options.xp : (wasAlreadyCompleted ? 5 : 15);
  const loopBonusXp = isAllFourDone && !wasCompletedBefore ? 40 : 0;
  const awardXp = phaseBaseXp + loopBonusXp;
  const totalXp = addTeachingStudioXp(awardXp);

  // 记录学习连击
  recordStudySprintCompleted();

  // 更新 topicMastery
  const allMastery = getTopicMastery();
  const currentRecord = allMastery[topicId] || {
    level: 0,
    xpEarned: 0,
    lastStudiedAt: nowIso,
    mistakes: [],
  };

  const nextLevel = isAllFourDone
    ? Math.max(1, currentRecord.level + (wasCompletedBefore ? 0 : 1))
    : currentRecord.level;
  const nextMistakes = options?.mistakes
    ? Array.from(new Set([...currentRecord.mistakes, ...options.mistakes]))
    : currentRecord.mistakes;

  const updatedRecord: TopicMasteryRecord = {
    level: nextLevel,
    xpEarned: currentRecord.xpEarned + awardXp,
    lastStudiedAt: nowIso,
    mistakes: nextMistakes,
  };
  allMastery[topicId] = updatedRecord;
  saveTopicMastery(allMastery);

  // 技能树与系统事件穿透广播
  try {
    markNodeMasteredByCourseId(topicId);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(SKILL_TREE_MASTERED_EVENT, {
          detail: {
            nodeId: topicId,
            courseId: topicId,
            source: "topic-hub-phase",
          },
        })
      );
      if (isAllFourDone && !wasCompletedBefore) {
        window.dispatchEvent(
          new CustomEvent(TEACHING_TOPIC_LOOP_COMPLETED_EVENT, {
            detail: {
              topicId,
              fach: options?.fach || "SoWi",
              xpEarned: awardXp,
            },
          })
        );
      }
      window.dispatchEvent(
        new CustomEvent(TEACHING_STUDIO_UPDATED_EVENT, {
          detail: {
            questId: topicId,
            xpEarned: awardXp,
            fach: options?.fach || "SoWi",
          },
        })
      );
    }
  } catch {
    // 保护性容错
  }

  const newState = loadTeachingState();
  notifyListeners(newState);

  return {
    loop: existing,
    isLoopComplete: isAllFourDone,
    totalXp,
    xpEarned: awardXp,
    mastery: updatedRecord,
  };
}

/**
 * 直接标记整套四步研习闭环达成
 */
export function completeTopicLoop(
  topicId: string,
  options?: { xpEarned?: number; fach?: string; mistakes?: string[] }
): {
  success: boolean;
  topicId: string;
  loop: TopicLoopProgress;
  mastery: TopicMasteryRecord;
  totalXp: number;
} {
  const loops = getTopicLoops();
  const nowIso = new Date().toISOString();
  const loop: TopicLoopProgress = {
    topicId,
    hasReadLecture: true,
    hasExploredLabor: true,
    hasReviewedNotes: true,
    hasPassedQuiz: true,
    completedAt: nowIso,
    phaseTimestamps: {
      lecture: loops[topicId]?.phaseTimestamps?.lecture || nowIso,
      labor: loops[topicId]?.phaseTimestamps?.labor || nowIso,
      notes: loops[topicId]?.phaseTimestamps?.notes || nowIso,
      quiz: loops[topicId]?.phaseTimestamps?.quiz || nowIso,
    },
  };
  loops[topicId] = loop;
  saveTopicLoops(loops);

  const baseXp = options?.xpEarned !== undefined ? options.xpEarned : 80;
  const totalXp = addTeachingStudioXp(baseXp);
  recordStudySprintCompleted();

  const allMastery = getTopicMastery();
  const currentRecord = allMastery[topicId] || {
    level: 0,
    xpEarned: 0,
    lastStudiedAt: nowIso,
    mistakes: [],
  };

  const newRecord: TopicMasteryRecord = {
    level: Math.max(1, currentRecord.level + 1),
    xpEarned: currentRecord.xpEarned + baseXp,
    lastStudiedAt: nowIso,
    mistakes: options?.mistakes
      ? Array.from(new Set([...currentRecord.mistakes, ...options.mistakes]))
      : currentRecord.mistakes,
  };
  allMastery[topicId] = newRecord;
  saveTopicMastery(allMastery);

  try {
    markNodeMasteredByCourseId(topicId);
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent(SKILL_TREE_MASTERED_EVENT, {
          detail: {
            nodeId: topicId,
            courseId: topicId,
            source: "topic-hub-complete",
          },
        })
      );
      window.dispatchEvent(
        new CustomEvent(TEACHING_TOPIC_LOOP_COMPLETED_EVENT, {
          detail: {
            topicId,
            fach: options?.fach || "SoWi",
            xpEarned: baseXp,
          },
        })
      );
      window.dispatchEvent(
        new CustomEvent(TEACHING_STUDIO_UPDATED_EVENT, {
          detail: {
            questId: topicId,
            xpEarned: baseXp,
            fach: options?.fach || "SoWi",
          },
        })
      );
    }
  } catch {
    // 保护性容错
  }

  const newState = loadTeachingState();
  notifyListeners(newState);

  return {
    success: true,
    topicId,
    loop,
    mastery: newRecord,
    totalXp,
  };
}

export function resetTopicLoop(topicId: string): boolean {
  const loops = getTopicLoops();
  if (!loops[topicId]) return false;
  delete loops[topicId];
  saveTopicLoops(loops);
  notifyListeners(loadTeachingState());
  return true;
}

export const teachingStore = {
  getState: loadTeachingState,
  setState: (updater: TeachingStudioState | ((prev: TeachingStudioState) => TeachingStudioState)) => {
    const prev = loadTeachingState();
    const next = typeof updater === "function" ? updater(prev) : updater;
    saveTeachingState(next);
    notifyListeners(next);
  },
  markQuestCompleted: markQuestCompletedInStore,
  toggleQuestMastered: toggleQuestMasteredInStore,
  markPhaseCompleted,
  completeTopicLoop,
  resetTopicLoop,
  getTopicLoopProgress,
  isTopicLoopCompleted,
  subscribe: (listener: (state: TeachingStudioState) => void): (() => void) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

/* =========================================================================
   Helper functions: isQuestAvailable, getTodaysQuest, getSubjectProgress
   ========================================================================= */

function normalizeIdSet(masteredIds: string[] | Set<string>): Set<string> {
  if (masteredIds instanceof Set) return masteredIds;
  if (Array.isArray(masteredIds)) return new Set(masteredIds);
  return new Set();
}

/**
 * 判断关卡是否处于“可攻坚”状态 (所有前置依赖是否均已通关)
 */
export function isQuestAvailable(
  quest: ParsedQuestNode,
  masteredIds: string[] | Set<string>
): boolean {
  const idSet = normalizeIdSet(masteredIds);
  if (idSet.has(quest.id)) return true; // 已通关的关卡随时可重温
  if (quest.prerequisites.length === 0) return true; // 无前置关卡直接解锁
  return quest.prerequisites.every((prereqId) => idSet.has(prereqId));
}

/**
 * 智能获取“今日应该攻坚的第 1 关” (按照 DAG 拓扑排序找到首个解锁但未通关的关卡)
 */
export function getTodaysQuest(
  book: ParsedBookStructure,
  masteredIds: string[] | Set<string>
): ParsedQuestNode | null {
  const idSet = normalizeIdSet(masteredIds);
  for (const chap of book.chapters) {
    for (const node of chap.nodes) {
      if (!idSet.has(node.id) && isQuestAvailable(node, idSet)) {
        return node;
      }
    }
  }
  // 若全部已掌握，返回 null
  return null;
}

/**
 * 获取学科整体通关进度统计
 */
export function getSubjectProgress(
  book: ParsedBookStructure,
  masteredIds: string[] | Set<string>
): {
  totalQuests: number;
  masteredCount: number;
  progressPercent: number;
  totalXp: number;
  earnedXp: number;
  totalMinutesLearned: number;
} {
  const idSet = normalizeIdSet(masteredIds);
  let masteredCount = 0;
  let totalQuests = 0;
  let totalMinutesLearned = 0;
  let totalXp = 0;
  let earnedXp = 0;

  for (const chap of book.chapters) {
    for (const node of chap.nodes) {
      totalQuests++;
      const nodeXp = node.xp || 50;
      totalXp += nodeXp;
      if (idSet.has(node.id)) {
        masteredCount++;
        earnedXp += nodeXp;
        totalMinutesLearned += node.estimatedMinutes;
      }
    }
  }

  const progressPercent = totalQuests > 0 ? Math.round((masteredCount / totalQuests) * 100) : 0;
  return {
    totalQuests,
    masteredCount,
    progressPercent,
    totalXp,
    earnedXp,
    totalMinutesLearned,
  };
}
