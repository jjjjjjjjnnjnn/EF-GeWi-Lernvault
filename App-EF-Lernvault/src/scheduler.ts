// FSRS Spaced Repetition Engine (Local, Zero-Dependency)
// Storage key: eflernvault:fsrs:v1

export type Rating = 1 | 2 | 3 | 4; // 1: Again, 2: Hard, 3: Good, 4: Easy

export interface CardState {
  state: number; // 0: New, 1: Learning, 2: Review, 3: Relearning
  due: string; // ISO string
  stability: number;
  difficulty: number;
  reps: number;
  lapses: number;
  lastReview: string;
}

import { defineStore, isRecord } from "./engine/storage";
import { FSRS_STORAGE_KEY as CENTRAL_FSRS_STORAGE_KEY } from "./engine/storageKeys";

export interface FSRSStorage {
  version: 1;
  cards: Record<string, CardState>;
}

const STORAGE_KEY = CENTRAL_FSRS_STORAGE_KEY;

export { CENTRAL_FSRS_STORAGE_KEY as FSRS_STORAGE_KEY };

const fsrsStore = defineStore<FSRSStorage>({
  key: STORAGE_KEY,
  version: 1,
  defaults: () => ({ version: 1, cards: {} }),
  validate: (v: unknown): v is FSRSStorage =>
    isRecord(v) && isRecord((v as Record<string, unknown>).cards),
});

export function loadFsrsStorage(): FSRSStorage {
  return fsrsStore.load();
}

export function saveFsrsStorage(storage: FSRSStorage): void {
  fsrsStore.save(storage);
}

export function getCardState(cardId: string): CardState | undefined {
  const store = loadFsrsStorage();
  return store.cards[cardId];
}

/**
 * Fehler-rueckfluss (B2): karte sofort faellig stellen (heute).
 * Neue karten sind ohnehin in der queue; nur review-karten brauchen das.
 */
export function prioritizeCard(cardId: string): void {
  const store = loadFsrsStorage();
  const prev = store.cards[cardId];
  if (!prev) return;
  const now = new Date();
  store.cards[cardId] = { ...prev, due: new Date(now.getTime() - 1000).toISOString() };
  saveFsrsStorage(store);
}

/** Alle review-karten eines themas zurueck in den stapel; rueckgabe = anzahl. */
export function prioritizeThema<T extends { id: string; thema: string }>(cards: T[], thema: string): number {
  const store = loadFsrsStorage();
  const now = new Date().toISOString();
  let n = 0;
  for (const c of cards) {
    if (c.thema === thema && store.cards[c.id]) {
      store.cards[c.id] = { ...store.cards[c.id], due: now };
      n++;
    }
  }
  if (n > 0) saveFsrsStorage(store);
  return n;
}

/**
 * Grade a card and return the updated CardState and scheduled interval in days.
 */
export function gradeCard(
  cardId: string,
  rating: Rating
): { state: CardState; intervalDays: number } {
  const store = loadFsrsStorage();
  const now = new Date();
  const prev = store.cards[cardId] ?? {
    state: 0,
    due: now.toISOString(),
    stability: 2.0,
    difficulty: 5.0,
    reps: 0,
    lapses: 0,
    lastReview: now.toISOString(),
  };

  let stability = prev.stability;
  let difficulty = prev.difficulty;
  let reps = prev.reps + 1;
  let lapses = prev.lapses;
  let state = prev.state;
  let intervalDays = 1;

  if (rating === 1) {
    // Again: lapse
    state = prev.state === 0 ? 1 : 3;
    stability = Math.max(0.6, stability * 0.5);
    difficulty = Math.min(10, difficulty + 0.8);
    lapses += 1;
    intervalDays = 1;
  } else if (rating === 2) {
    // Hard: small interval increase
    state = 2;
    difficulty = Math.min(10, difficulty + 0.2);
    stability = Math.max(1.2, stability * 1.2);
    intervalDays = Math.max(1, Math.round(stability * 0.9));
  } else if (rating === 3) {
    // Good: normal progression
    state = 2;
    difficulty = Math.max(1.0, difficulty - 0.1);
    stability = prev.state === 0 ? 3.0 : Math.max(2.0, stability * 2.2);
    intervalDays = Math.max(1, Math.round(stability));
  } else {
    // Easy: accelerated progression
    state = 2;
    difficulty = Math.max(1.0, difficulty - 0.4);
    stability = prev.state === 0 ? 6.0 : Math.max(4.0, stability * 3.5);
    intervalDays = Math.max(2, Math.round(stability * 1.3));
  }

  const dueDate = new Date(now.getTime() + intervalDays * 24 * 60 * 60 * 1000);
  // Normalize due date to the end of that day or 00:00 to keep it consistent
  dueDate.setHours(23, 59, 59, 999);

  const updated: CardState = {
    state,
    due: dueDate.toISOString(),
    stability: Math.round(stability * 100) / 100,
    difficulty: Math.round(difficulty * 100) / 100,
    reps,
    lapses,
    lastReview: now.toISOString(),
  };

  store.cards[cardId] = updated;
  saveFsrsStorage(store);

  return { state: updated, intervalDays };
}

/**
 * Filter and sort card IDs for the study session:
 * - Unreviewed (new) cards first
 * - Due review cards (due date <= end of today) sorted by earliest due
 * - Returns { dueItems, newCount, totalDue, allItemsSorted }
 */
export function partitionQueue<T extends { id: string }>(items: T[]): {
  activeQueue: T[];
  dueCount: number;
  newCount: number;
  totalCards: number;
} {
  const store = loadFsrsStorage();
  const now = new Date();
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

  const newCards: T[] = [];
  const dueReviews: { item: T; dueTime: number }[] = [];
  const futureCards: { item: T; dueTime: number }[] = [];

  for (const item of items) {
    const cs = store.cards[item.id];
    if (!cs) {
      newCards.push(item);
    } else {
      const dueTime = new Date(cs.due).getTime();
      if (dueTime <= endOfToday.getTime()) {
        dueReviews.push({ item, dueTime });
      } else {
        futureCards.push({ item, dueTime });
      }
    }
  }

  dueReviews.sort((a, b) => a.dueTime - b.dueTime);
  futureCards.sort((a, b) => a.dueTime - b.dueTime);

  // Active queue for today = new cards + due reviews
  const activeQueue = [...newCards, ...dueReviews.map((d) => d.item)];
  const dueCount = activeQueue.length;
  const newCount = newCards.length;
  const totalCards = items.length;

  return {
    activeQueue,
    dueCount,
    newCount,
    totalCards,
  };
}
