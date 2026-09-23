// 自适应每日 15 分钟混合极速冲刺生成器 (Heute lernen)
// 结合 FSRS 到期复习、BKT 薄弱考点诊断、理论对比训练与连续学习天数 (Streak)

import type { VaultCard, VaultNote } from "../vault/parser";
import { partitionQueue } from "../scheduler";
import { MasteryEngine } from "./mastery";
import { DAILY_STREAK_STORAGE_KEY } from "./storageKeys";

export interface DailySprintQuizItem {
  id: string;
  thema: string;
  fach: string;
  questionDE: string;
  guidanceZH: string;
  sampleKeypoint: string;
}

export interface DailySprintVergleichItem {
  id: string;
  thema: string;
  fach: string;
  conceptA: string;
  conceptB: string;
  promptDE: string;
  promptZH: string;
}

export interface DailySprintSession {
  cards: VaultCard[];
  diagnosticQuiz: DailySprintQuizItem;
  vergleich: DailySprintVergleichItem;
  fach: string;
  estimatedMinutes: number;
}

const STREAK_KEY = DAILY_STREAK_STORAGE_KEY;

export interface StreakData {
  currentStreak: number;
  lastCompletedDate: string; // YYYY-MM-DD
}

export function getStudyStreak(): StreakData {
  try {
    if (typeof window !== "undefined" && window.localStorage) {
      const raw = window.localStorage.getItem(STREAK_KEY);
      if (raw) return JSON.parse(raw);
    }
  } catch {
    // 忽略异常
  }
  return { currentStreak: 0, lastCompletedDate: "" };
}

export function recordStudySprintCompleted(): StreakData {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  const prev = getStudyStreak();

  if (prev.lastCompletedDate === todayStr) {
    return prev; // 今天已经打卡过
  }

  // 检查是否是连续昨天打卡
  const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  let nextStreak = 1;
  if (prev.lastCompletedDate === yesterdayStr) {
    nextStreak = prev.currentStreak + 1;
  }

  const updated: StreakData = {
    currentStreak: nextStreak,
    lastCompletedDate: todayStr,
  };

  try {
    if (typeof window !== "undefined" && window.localStorage) {
      window.localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
    }
  } catch {
    // 忽略异常
  }

  return updated;
}

/** 生成今日 15 分钟自适应学习混合队列 */
export function buildDailySprint(
  cards: VaultCard[],
  notes: VaultNote[],
  selectedFach?: string
): DailySprintSession | null {
  if (cards.length === 0 && notes.length === 0) return null;

  const fach = selectedFach || (notes.length > 0 ? notes[0].fach : "SoWi");
  const filteredCards = cards.filter((c) => !fach || c.fach.toLowerCase() === fach.toLowerCase());
  const filteredNotes = notes.filter((n) => !fach || n.fach.toLowerCase() === fach.toLowerCase());

  // 1. 抽取 4 张到期/新卡片 (利用 FSRS 分区队列)
  const queue = partitionQueue(filteredCards.length > 0 ? filteredCards : cards);
  const sprintCards = queue.activeQueue.slice(0, 4);

  // 2. 利用 BKT 获取当前薄弱考点或首篇重要笔记
  const masteryEngine = new MasteryEngine();
  const weakTopics = masteryEngine.getWeakestTopics(3, fach);

  let targetNote = filteredNotes[0] || notes[0];
  if (weakTopics.length > 0) {
    const matched = filteredNotes.find((n) => n.path === weakTopics[0].topicId || n.thema === weakTopics[0].thema);
    if (matched) targetNote = matched;
  }

  // 3. 构建诊断题
  const diagnosticQuiz: DailySprintQuizItem = {
    id: `diag-${targetNote?.id || "fallback"}`,
    thema: targetNote?.thema || "Soziale Ungleichheit",
    fach: targetNote?.fach || fach,
    questionDE: `Erklären Sie die zentralen Wirkungszusammenhänge von „${targetNote?.thema || "Soziale Ungleichheit"}“ am konkreten Fall.`,
    guidanceZH: "用精准德语术语回答核心定义与因果链，先中文理清思路，再写德语答题要点。",
    sampleKeypoint: targetNote?.blocks?.[0]?.text || "Strukturierte Merkmale und institutionelle Rahmenbedingungen.",
  };

  // 4. 构建对比题 (Vergleich)
  const vergleich: DailySprintVergleichItem = {
    id: `vergleich-${targetNote?.id || "fallback"}`,
    thema: targetNote?.thema || "Utilitarismus vs. Kant",
    fach: targetNote?.fach || fach,
    conceptA: "Meritokratie / Utilitarismus",
    conceptB: "Chancengerechtigkeit / Pflichtethik",
    promptDE: `Vergleichen Sie die Grundannahmen der beiden Ansätze hinsichtlich ihrer ethischen bzw. politischen Legitimität.`,
    promptZH: "对比两派的核心假设：先列出共同关注点，再分点论证其根本分歧（如后果导向 vs. 义务原则）。",
  };

  return {
    cards: sprintCards,
    diagnosticQuiz,
    vergleich,
    fach,
    estimatedMinutes: 15,
  };
}
