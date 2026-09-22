// Alle versionierten app-stores an einem ort (B0).
// fach-spezifische typen (karten/plaene) gehoeren hierher, damit module
// duenne huelsen bleiben. lang/ai bleiben vorerst direkt (kein versionsbedarf).
import { defineStore, isRecord, type VersionedStore } from "./storage";
import { FSRS_STORAGE_KEY } from "../scheduler";

// ---------- XP / Reise-fortschritt ----------
export interface XpData {
  version: 1;
  xp: number;
  streak: string[];
  badges: Record<string, number>;
  done: Record<string, number>;
}

function num(v: unknown, fb = 0): number {
  const n = Number(v);
  return Number.isFinite(n) ? n : fb;
}

function strArr(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function numRec(v: unknown): Record<string, number> {
  if (!isRecord(v)) return {};
  const out: Record<string, number> = {};
  for (const [k, x] of Object.entries(v)) {
    if (typeof x === "number" && Number.isFinite(x)) out[k] = x;
  }
  return out;
}

export const xpStore: VersionedStore<XpData> = defineStore<XpData>({
  key: "eflernvault:xp:v1",
  version: 1,
  defaults: () => ({ version: 1, xp: 0, streak: [], badges: {}, done: {} }),
  validate: (v: unknown): v is XpData =>
    isRecord(v) &&
    typeof v.xp === "number" &&
    Array.isArray(v.streak) &&
    isRecord(v.badges) &&
    isRecord(v.done),
  // altdaten (Reise.saveProgress ohne version) einmalig heben
  legacy: (parsed: unknown): XpData | null => {
    if (!isRecord(parsed) || parsed.version !== undefined) return null;
    return {
      version: 1,
      xp: num(parsed.xp),
      streak: strArr(parsed.streak),
      badges: numRec(parsed.badges),
      done: numRec(parsed.done),
    };
  },
});

// ---------- Vergleich naechste-zeiten ----------
export interface VergleichData {
  version: 1;
  nextTimes: Record<string, string>;
}

export const vergleichStore: VersionedStore<VergleichData> = defineStore<VergleichData>({
  key: "eflernvault:vergleich:v1",
  version: 1,
  defaults: () => ({ version: 1, nextTimes: {} }),
  validate: (v: unknown): v is VergleichData => isRecord(v) && isRecord(v.nextTimes),
});

// ---------- Dev-feedback ----------
export interface FeedbackEntry {
  id: string;
  ts: string;
  ctx: string;
  text: string;
}

export interface FeedbackData {
  version: 1;
  entries: FeedbackEntry[];
}

function isEntry(v: unknown): v is FeedbackEntry {
  return (
    isRecord(v) &&
    typeof v.id === "string" &&
    typeof v.ts === "string" &&
    typeof v.ctx === "string" &&
    typeof v.text === "string"
  );
}

export const feedbackStore: VersionedStore<FeedbackData> = defineStore<FeedbackData>({
  key: "eflernvault:feedback:v1",
  version: 1,
  defaults: () => ({ version: 1, entries: [] }),
  validate: (v: unknown): v is FeedbackData =>
    isRecord(v) && Array.isArray(v.entries) && v.entries.every(isEntry),
});

// ---------- Lernplan ----------
export interface PlanTask {
  id: string;
  day: string;
  fach: string;
  task: string;
  done: boolean;
}

export interface PlanData {
  version: 1;
  klausurDate: string;
  tasks: PlanTask[];
}

function isPlanTask(v: unknown): v is PlanTask {
  return (
    isRecord(v) &&
    typeof v.id === "string" &&
    typeof v.day === "string" &&
    typeof v.fach === "string" &&
    typeof v.task === "string" &&
    typeof v.done === "boolean"
  );
}

function planTasks(v: unknown): PlanTask[] {
  return Array.isArray(v) ? v.filter(isPlanTask) : [];
}

export const planStore: VersionedStore<PlanData> = defineStore<PlanData>({
  key: "eflernvault:plan:v1",
  version: 1,
  defaults: () => ({ version: 1, klausurDate: "", tasks: [] }),
  validate: (v: unknown): v is PlanData =>
    isRecord(v) && typeof v.klausurDate === "string" && Array.isArray(v.tasks) && v.tasks.every(isPlanTask),
  // altdaten (Planner/Onboarding ohne version) einmalig heben
  legacy: (parsed: unknown): PlanData | null => {
    if (!isRecord(parsed) || parsed.version !== undefined) return null;
    if (typeof parsed.klausurDate !== "string") return null;
    return { version: 1, klausurDate: parsed.klausurDate, tasks: planTasks(parsed.tasks) };
  },
});

// ---------- Onboarding ----------
export interface OnboardingData {
  version: 1;
  done: boolean;
  faecher: string[];
  klausurDate: string;
  demo: boolean;
}

export const onboardingStore: VersionedStore<OnboardingData> = defineStore<OnboardingData>({
  key: "eflernvault:onboarding:v1",
  version: 1,
  defaults: () => ({ version: 1, done: false, faecher: [], klausurDate: "", demo: false }),
  validate: (v: unknown): v is OnboardingData =>
    isRecord(v) &&
    typeof v.done === "boolean" &&
    Array.isArray(v.faecher) &&
    typeof v.klausurDate === "string" &&
    typeof v.demo === "boolean",
});

/** Alle verwalteten keys (fuer wipe/export-snapshot). lang/ai bleiben separat. */
export function allStoreKeys(): string[] {
  return [FSRS_STORAGE_KEY, xpStore.key, vergleichStore.key, feedbackStore.key, planStore.key, onboardingStore.key];
}
