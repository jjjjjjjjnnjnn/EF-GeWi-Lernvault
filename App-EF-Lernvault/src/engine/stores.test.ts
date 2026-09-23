import { beforeEach, describe, expect, it } from "vitest";
import { getStorageBackend, localBackend, setStorageBackend, type StorageBackend } from "./storage";
import {
  DAILY_STREAK_STORAGE_KEY,
  INTERLEAVE_STORAGE_KEY,
  LANG_STORAGE_KEY,
  MASTERY_STORAGE_KEY,
} from "./storageKeys";
import {
  allStoreKeys,
  feedbackStore,
  onboardingStore,
  planStore,
  vergleichStore,
  xpStore,
} from "./stores";

const memBackend = (): StorageBackend => {
  const m = new Map<string, string>();
  return {
    get: (k) => m.get(k) ?? null,
    set: (k, v) => void m.set(k, v),
    remove: (k) => void m.delete(k),
  };
};

beforeEach(() => {
  localStorage.clear();
  setStorageBackend(localBackend);
});

describe("stores migration (legacy ohne version)", () => {
  it("xp-altdaten werden gehoben + zurueckgeschrieben mit version", () => {
    localStorage.setItem("eflernvault:xp:v1", JSON.stringify({ xp: 30, streak: ["2026-09-01"], badges: { SoWi: 1 }, done: {} }));
    const d = xpStore.load();
    expect(d).toMatchObject({ version: 1, xp: 30 });
    expect(JSON.parse(xpStore.raw()).version).toBe(1); // migration persistiert
  });

  it("xp-altdaten mit muell werden koerziert, nie crash", () => {
    localStorage.setItem("eflernvault:xp:v1", JSON.stringify({ xp: "viel", streak: "kein-array", badges: null }));
    expect(xpStore.load()).toEqual({ version: 1, xp: 0, streak: [], badges: {}, done: {} });
  });

  it("plan-altdaten (Planner + Onboarding format) werden gehoben", () => {
    localStorage.setItem(
      "eflernvault:plan:v1",
      JSON.stringify({ klausurDate: "2027-06-30", tasks: [{ id: "p1", day: "Mo", fach: "SoWi", task: "x", done: true }] })
    );
    const d = planStore.load();
    expect(d.version).toBe(1);
    expect(d.tasks).toHaveLength(1);
  });

  it("plan mit kaputten tasks: nur gueltige ueberleben", () => {
    localStorage.setItem(
      "eflernvault:plan:v1",
      JSON.stringify({ klausurDate: "2027-06-30", tasks: [{ id: "ok", day: "Mo", fach: "SoWi", task: "x", done: false }, { id: 1 }, null] })
    );
    expect(planStore.load().tasks.map((t) => t.id)).toEqual(["ok"]);
  });

  it("fremde version -> defaults (alle stores)", () => {
    for (const s of [xpStore, vergleichStore, feedbackStore, planStore, onboardingStore]) {
      localStorage.setItem(s.key, JSON.stringify({ version: 999 }));
      expect(s.load()).toEqual(s.load()); // stabil
      s.reset();
    }
    expect(xpStore.load().xp).toBe(0);
    expect(planStore.load().klausurDate).toBe("");
    expect(onboardingStore.load().done).toBe(false);
  });

  it("feedback: kaputte entries -> defaults", () => {
    localStorage.setItem("eflernvault:feedback:v1", JSON.stringify({ version: 1, entries: [{ id: "x" }] }));
    expect(feedbackStore.load()).toEqual({ version: 1, entries: [] });
  });
});

describe("backend-swap (cloud-vorbereitung)", () => {
  it("memory-backend funktioniert transparent", () => {
    setStorageBackend(memBackend());
    xpStore.save({ version: 1, xp: 5, streak: [], badges: {}, done: {} });
    expect(xpStore.load().xp).toBe(5);
    expect(localStorage.getItem("eflernvault:xp:v1")).toBeNull(); // nicht lokal gelandet
    expect(getStorageBackend()).not.toBe(localBackend);
  });
});

describe("allStoreKeys", () => {
  it("enthaelt alle 12 synchronisierten state-keys, eindeutig", () => {
    const keys = allStoreKeys();
    expect(keys).toHaveLength(12);
    expect(new Set(keys).size).toBe(12);
    expect(keys).toEqual(expect.arrayContaining([
      LANG_STORAGE_KEY,
      MASTERY_STORAGE_KEY,
      DAILY_STREAK_STORAGE_KEY,
      INTERLEAVE_STORAGE_KEY,
    ]));
  });
});
