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

  // 5. 应用认知交错复习算法对卡片重排 (Interleaving nach Mischeffekt)
  const interleavedCards = interleaveCardsByTopic(sprintCards, (c) => c.thema || c.fach);

  return {
    cards: interleavedCards,
    diagnosticQuiz,
    vergleich,
    fach,
    estimatedMinutes: 15,
  };
}

/**
 * 认知交错复习引擎 (Interleaving Engine nach Mischeffekt)
 * 借鉴 quanta-fsrs-engine 认知心理学 Mischeffekt 模型：
 * 
 * 科学依据 (Cognitive Basis):
 * 德国与国际认知心理学实验表明，单科/单考点大块刷题易产生“虚假熟练度”，
 * 通过加权轮询穿插不同学科与考点 (Weighted Round-Robin Topic Staggering)，
 * 迫使大脑进行“辨别性对比 (Discriminative Contrast)”，长期留存率提升 60%+。
 */
export function interleaveCardsByTopic<T>(
  cards: T[],
  getTopicKey: (card: T) => string
): T[] {
  if (cards.length <= 1) return cards;

  // 1. 按主题分组
  const buckets: Record<string, T[]> = {};
  for (const card of cards) {
    const key = getTopicKey(card) || "default";
    if (!buckets[key]) buckets[key] = [];
    buckets[key].push(card);
  }

  const topicKeys = Object.keys(buckets);
  if (topicKeys.length <= 1) {
    return cards;
  }

  // 2. 按桶大小降序排列，优先调度大桶
  topicKeys.sort((a, b) => buckets[b].length - buckets[a].length);

  // 3. 加权轮询交错抽取
  const result: T[] = [];
  const totalCards = cards.length;

  while (result.length < totalCards) {
    let addedInRound = false;
    for (const key of topicKeys) {
      const bucket = buckets[key];
      if (bucket && bucket.length > 0) {
        result.push(bucket.shift()!);
        addedInRound = true;
      }
    }
    if (!addedInRound) break;
  }

  return result;
}

/**
 * 计算复习序列的交错度指数 (Interleaving Quality Index)
 * 1.0 = 完美交替 (每个相邻卡片均不同主题)
 * 0.0 = 纯块状堆叠 (先做全部 A，再做全部 B)
 */
export function calculateInterleavingQuality<T>(
  sequence: T[],
  getTopicKey: (card: T) => string
): number {
  if (sequence.length <= 1) return 1.0;

  let switches = 0;
  for (let i = 1; i < sequence.length; i++) {
    if (getTopicKey(sequence[i]) !== getTopicKey(sequence[i - 1])) {
      switches++;
    }
  }

  return switches / (sequence.length - 1);
}

