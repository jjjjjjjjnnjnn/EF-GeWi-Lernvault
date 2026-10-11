// Teaching Studio Persistent State Machine & Mastery Bridge
// 教学工坊持久化状态机：管理关卡通关历史、经验值、每日连击与 712 节点技能树联动

import type { ParsedBookStructure, ParsedQuestNode } from "./bookIngestParser";
import type { PacingPlan } from "./pacingPlanner";
import { recordStudySprintCompleted, getStudyStreak, type StreakData } from "../../../engine/dailyMix";
import { markNodeMasteredByCourseId, SKILL_TREE_MASTERED_EVENT } from "../../../engine/skillTree";

export const TEACHING_STUDIO_XP_KEY = "teaching_studio_xp";
export const TEACHING_MASTERED_QUESTS_KEY = "teaching_studio_mastered_quests";
export const TEACHING_ACTIVE_BOOK_KEY = "teaching_studio_active_book";
export const TEACHING_ACTIVE_PLAN_KEY = "teaching_studio_active_plan";
export const TEACHING_STUDIO_UPDATED_EVENT = "teaching-studio-updated";

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
        JSON.stringify({ id, title: id, fach: "SoWi", rawInputLength: 0, chapters: [], totalNodes: 0, totalMinutes: 0, dagEdgesCount: 0, createdAt: new Date().toISOString() })
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
  };
}

export function saveTeachingState(state: TeachingStudioState): void {
  setTeachingStudioTotalXp(state.totalXp);
  saveMasteredQuests(state.masteredQuests);
  if (state.activeBook) setActiveBook(state.activeBook);
  if (state.activePlan) setActivePlan(state.activePlan);
}

/* =========================================================================
   Complete Quest Workflow
   XP 口径统一（全工坊唯一口径）：首次通关按 quest.xp 全额发放；
   重复温故仅发放 30%（Math.round 下取整口径一致），防刷分。
   与 InteractiveLessonRunner.completedStepIndices（localStorage 持久化、
   单步仅结算一次）配合，杜绝同一 step 重复领取 XP。
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
