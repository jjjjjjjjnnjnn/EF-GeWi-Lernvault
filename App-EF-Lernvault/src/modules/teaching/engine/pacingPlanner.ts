// Adaptive Pacing Planner Engine (自适应无痛学习节奏规划器)
// 将 DAG 微关卡按拓扑排序、每日 10-15 分钟无痛负荷与艾宾浩斯遗忘曲线排定日程

import type { ParsedBookStructure, ParsedQuestNode } from "./bookIngestParser";

export type PacingPreset = "sprint" | "balanced" | "marathon" | "custom";

export interface ReviewSlot {
  questId: string;
  questTitle: string;
  intervalTag: "D+1 Blitz" | "D+3 Tief" | "D+7 Transfer";
  reviewMinutes: number;
}

export interface DailyPacingSlot {
  dayIndex: number;
  dayLabel: string;
  newQuests: ParsedQuestNode[];
  reviewQuests: ReviewSlot[];
  totalMinutes: number;
  isRestOrBufferDay: boolean;
  focusGoal: string;
  targetXp: number;
}

export interface PacingPlan {
  pacingMode: PacingPreset;
  targetDays: number;
  targetDailyMinutes: number;
  totalQuests: number;
  totalEstimatedMinutes: number;
  totalReviewSlots: number;
  dailySlots: DailyPacingSlot[];
  feasibility: "optimal" | "dense" | "light";
  motivationalTip: {
    de: string;
    zh: string;
  };
}

export interface PacingOptions {
  mode: PacingPreset;
  customDays?: number;
  customDailyMinutes?: number;
  includeSpacedRepetition?: boolean;
}

/**
 * 拓扑排序：确保满足 DAG 前置依赖关系
 */
export function topologicalSortQuests(chapters: ParsedBookStructure["chapters"]): ParsedQuestNode[] {
  const allNodes: ParsedQuestNode[] = [];
  const nodeMap = new Map<string, ParsedQuestNode>();
  const inDegree = new Map<string, number>();
  const dependents = new Map<string, string[]>();

  for (const chap of chapters) {
    for (const node of chap.nodes) {
      allNodes.push(node);
      nodeMap.set(node.id, node);
      inDegree.set(node.id, 0);
      dependents.set(node.id, []);
    }
  }

  for (const node of allNodes) {
    for (const prereqId of node.prerequisites) {
      if (nodeMap.has(prereqId)) {
        inDegree.set(node.id, (inDegree.get(node.id) || 0) + 1);
        const depList = dependents.get(prereqId) || [];
        depList.push(node.id);
        dependents.set(prereqId, depList);
      }
    }
  }

  const queue: ParsedQuestNode[] = [];
  for (const node of allNodes) {
    if ((inDegree.get(node.id) || 0) === 0) {
      queue.push(node);
    }
  }

  const sorted: ParsedQuestNode[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    sorted.push(current);

    const deps = dependents.get(current.id) || [];
    for (const depId of deps) {
      const deg = (inDegree.get(depId) || 1) - 1;
      inDegree.set(depId, deg);
      if (deg === 0) {
        queue.push(nodeMap.get(depId)!);
      }
    }
  }

  // 若存在孤立或环形遗漏，追加剩余节点防止丢失
  if (sorted.length < allNodes.length) {
    const sortedIds = new Set(sorted.map((n) => n.id));
    for (const node of allNodes) {
      if (!sortedIds.has(node.id)) {
        sorted.push(node);
      }
    }
  }

  return sorted;
}

/**
 * 核心节奏规划算法
 */
export function generatePacingPlan(
  book: ParsedBookStructure,
  options: PacingOptions = { mode: "balanced", includeSpacedRepetition: true }
): PacingPlan {
  const sortedQuests = topologicalSortQuests(book.chapters);
  const totalQuests = sortedQuests.length;

  let targetDays = 14;
  let targetDailyMinutes = 12;

  switch (options.mode) {
    case "sprint":
      targetDays = Math.max(3, Math.min(7, Math.ceil(totalQuests / 2)));
      targetDailyMinutes = 18;
      break;
    case "marathon":
      targetDays = Math.max(14, totalQuests * 2);
      targetDailyMinutes = 9;
      break;
    case "custom":
      if (options.customDays && options.customDays > 0) {
        targetDays = options.customDays;
      }
      if (options.customDailyMinutes && options.customDailyMinutes > 0) {
        targetDailyMinutes = options.customDailyMinutes;
      }
      break;
    case "balanced":
    default:
      targetDays = Math.max(5, Math.ceil(totalQuests * 1.2));
      targetDailyMinutes = 12;
      break;
  }

  const dailySlots: DailyPacingSlot[] = [];
  for (let d = 1; d <= targetDays; d++) {
    dailySlots.push({
      dayIndex: d,
      dayLabel: `Tag ${d}`,
      newQuests: [],
      reviewQuests: [],
      totalMinutes: 0,
      isRestOrBufferDay: false,
      focusGoal: "",
      targetXp: 0,
    });
  }

  // 1. 无痛均匀分布主线关卡
  let currentDay = 0;
  for (const quest of sortedQuests) {
    // 寻找负荷尚未超标的日程
    while (
      currentDay < dailySlots.length - 1 &&
      dailySlots[currentDay].totalMinutes + quest.estimatedMinutes > targetDailyMinutes &&
      dailySlots[currentDay].newQuests.length > 0
    ) {
      currentDay++;
    }

    const slot = dailySlots[currentDay];
    slot.newQuests.push(quest);
    slot.totalMinutes += quest.estimatedMinutes;
    slot.targetXp += quest.xp;
  }

  // 2. 插入艾宾浩斯复习槽 (D+1, D+3)
  let totalReviewsCount = 0;
  if (options.includeSpacedRepetition !== false) {
    for (let dayIdx = 0; dayIdx < dailySlots.length; dayIdx++) {
      const slot = dailySlots[dayIdx];
      for (const quest of slot.newQuests) {
        // D+1 闪电回顾 (3分钟)
        const d1 = dayIdx + 1;
        if (d1 < dailySlots.length) {
          dailySlots[d1].reviewQuests.push({
            questId: quest.id,
            questTitle: quest.title,
            intervalTag: "D+1 Blitz",
            reviewMinutes: 3,
          });
          dailySlots[d1].totalMinutes += 3;
          dailySlots[d1].targetXp += 30;
          totalReviewsCount++;
        }

        // D+3 深度回顾 (4分钟)
        const d3 = dayIdx + 3;
        if (d3 < dailySlots.length) {
          dailySlots[d3].reviewQuests.push({
            questId: quest.id,
            questTitle: quest.title,
            intervalTag: "D+3 Tief",
            reviewMinutes: 4,
          });
          dailySlots[d3].totalMinutes += 4;
          dailySlots[d3].targetXp += 40;
          totalReviewsCount++;
        }
      }
    }
  }

  // 3. 润色每日目标文案与缓冲日判定
  for (const slot of dailySlots) {
    if (slot.newQuests.length === 0 && slot.reviewQuests.length === 0) {
      slot.isRestOrBufferDay = true;
      slot.focusGoal = "Ruhetag / Puffer (休息与消化缓冲)";
    } else if (slot.newQuests.length > 0) {
      const primaryQuest = slot.newQuests[0];
      slot.focusGoal = `${primaryQuest.title}${slot.newQuests.length > 1 ? ` (+${slot.newQuests.length - 1})` : ""}`;
    } else {
      slot.focusGoal = `Wiederholungs-Sprint (${slot.reviewQuests.length} Stationen)`;
    }
  }

  // 4. 评估节奏适宜度
  const maxMinutesInDay = Math.max(...dailySlots.map((s) => s.totalMinutes), 0);
  const avgMinutesInDay = dailySlots.reduce((acc, s) => acc + s.totalMinutes, 0) / dailySlots.length;

  let feasibility: "optimal" | "dense" | "light" = "optimal";
  if (maxMinutesInDay > 25 || avgMinutesInDay > 18) {
    feasibility = "dense";
  } else if (avgMinutesInDay < 7) {
    feasibility = "light";
  }

  const motivationalTip =
    feasibility === "dense"
      ? {
          de: "Intensiver Lernpfad: Empfohlen für direkte Klausurphasen. Achte auf gezielte Pausen!",
          zh: "高能冲刺路径：适合考前 1-2 周突击。每学完一节记得动一动手边的仿真沙盘放松大脑！",
        }
      : feasibility === "light"
      ? {
          de: "Sehr entspannter Rhythmus: Ideal für langfristigen Wissensaufbau ohne jeglichen Druck.",
          zh: "超惬意微步慢跑：每天几分钟即可稳步推进，零压力建立长期记忆连击。",
        }
      : {
          de: "Perfekte Balance (Flow-Zustand): Täglich ~10–14 Min. Maximale Behaltensleistung dank Spaced Repetition.",
          zh: "黄金无痛节奏（心流区间）：每日仅需 10–14 分钟，结合艾宾浩斯轻量温故，毫不费力达成 100% 掌握。",
        };

  return {
    pacingMode: options.mode,
    targetDays,
    targetDailyMinutes,
    totalQuests,
    totalEstimatedMinutes: book.totalMinutes,
    totalReviewSlots: totalReviewsCount,
    dailySlots,
    feasibility,
    motivationalTip,
  };
}
