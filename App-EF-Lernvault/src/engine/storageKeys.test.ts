import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { wipePersistedAppData } from "../modules/Settings";
import {
  AI_CONFIG_STORAGE_KEY,
  DAILY_STREAK_STORAGE_KEY,
  INTERLEAVE_STORAGE_KEY,
  LANG_STORAGE_KEY,
  LOCAL_ONLY_STORAGE_KEYS,
  LOCAL_ONLY_STORAGE_POLICIES,
  MASTERY_STORAGE_KEY,
  PERSISTED_STORAGE_KEYS,
  STORAGE_SYNC_POLICIES,
  SYNC_STORAGE_ALLOWLIST,
  SYNCED_STORAGE_KEYS,
  allPersistedKeys,
} from "./storageKeys";

function sourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return sourceFiles(path);
    if (!/\.(ts|tsx)$/.test(entry.name) || /\.(test|spec)\.(ts|tsx)$/.test(entry.name)) return [];
    return [path];
  });
}

describe("storageKeys", () => {
  it("lists every persisted localStorage key exactly once", () => {
    const keys = allPersistedKeys();
    expect(keys).toHaveLength(19);
    expect(new Set(keys).size).toBe(keys.length);
    expect(new Set(Object.values(PERSISTED_STORAGE_KEYS))).toEqual(new Set(keys));
    expect(keys).toEqual(expect.arrayContaining([MASTERY_STORAGE_KEY, DAILY_STREAK_STORAGE_KEY, INTERLEAVE_STORAGE_KEY, LANG_STORAGE_KEY]));
  });

  it("keeps the cloud allowlist an explicit strict subset of persisted keys", () => {
    const persisted = allPersistedKeys();
    expect(SYNC_STORAGE_ALLOWLIST).toHaveLength(12);
    expect(SYNCED_STORAGE_KEYS).toEqual(SYNC_STORAGE_ALLOWLIST.map(({ key }) => key));
    expect(new Set(SYNCED_STORAGE_KEYS).size).toBe(SYNCED_STORAGE_KEYS.length);
    expect(SYNCED_STORAGE_KEYS.every((key) => persisted.includes(key))).toBe(true);
    expect(SYNCED_STORAGE_KEYS.length).toBeLessThan(persisted.length);
    expect(SYNCED_STORAGE_KEYS).toEqual(
      expect.arrayContaining([
        MASTERY_STORAGE_KEY,
        DAILY_STREAK_STORAGE_KEY,
        INTERLEAVE_STORAGE_KEY,
        LANG_STORAGE_KEY,
      ])
    );
    expect(SYNCED_STORAGE_KEYS).not.toContain(AI_CONFIG_STORAGE_KEY);
  });

  it("records exactly the local-only exclusions required by policy", () => {
    expect(LOCAL_ONLY_STORAGE_KEYS).toEqual([
      PERSISTED_STORAGE_KEYS.sync,
      PERSISTED_STORAGE_KEYS.aiConfig,
      PERSISTED_STORAGE_KEYS.aiEndpoints,
      PERSISTED_STORAGE_KEYS.activeAiEndpoint,
      PERSISTED_STORAGE_KEYS.fallbackAiEndpoint,
      PERSISTED_STORAGE_KEYS.tokenLedger,
      PERSISTED_STORAGE_KEYS.tokenBudget,
    ]);
    expect(LOCAL_ONLY_STORAGE_POLICIES).toHaveLength(LOCAL_ONLY_STORAGE_KEYS.length);
    expect(
      LOCAL_ONLY_STORAGE_POLICIES.every(
        (policy) => policy.decision === "local-only" && policy.reason.trim().length > 0
      )
    ).toBe(true);
    expect(SYNCED_STORAGE_KEYS).not.toEqual(expect.arrayContaining(LOCAL_ONLY_STORAGE_KEYS));
  });

  it("classifies every persisted key exactly once with a non-empty reason", () => {
    const policyKeys = STORAGE_SYNC_POLICIES.map(({ key }) => key);
    expect(policyKeys).toHaveLength(allPersistedKeys().length);
    expect(new Set(policyKeys)).toEqual(new Set(allPersistedKeys()));
    expect(
      STORAGE_SYNC_POLICIES.every(
        (policy) =>
          (policy.decision === "sync" || policy.decision === "local-only") &&
          policy.reason.trim().length > 0
      )
    ).toBe(true);
  });

  it("wipes the full persisted registry, including local-only keys", () => {
    const preservedUnregisteredKey = "eflernvault:test:unregistered";
    for (const key of allPersistedKeys()) localStorage.setItem(key, `value:${key}`);
    localStorage.setItem(preservedUnregisteredKey, "preserve");
    expect(LOCAL_ONLY_STORAGE_KEYS.every((key) => localStorage.getItem(key) !== null)).toBe(true);

    wipePersistedAppData();

    expect(allPersistedKeys().every((key) => localStorage.getItem(key) === null)).toBe(true);
    expect(LOCAL_ONLY_STORAGE_KEYS.every((key) => localStorage.getItem(key) === null)).toBe(true);
    expect(localStorage.getItem(preservedUnregisteredKey)).toBe("preserve");
    localStorage.removeItem(preservedUnregisteredKey);
  });

  it("registers every persisted key literal used by production source", () => {
    const registered = new Set(allPersistedKeys());
    const keyPattern = /["'`](eflernvault:[^"'`\r\n]+|ef_lernvault_[^"'`\r\n]+)["'`]/g;
    const unregistered = sourceFiles(resolve(process.cwd(), "src")).flatMap((file) => {
      const source = readFileSync(file, "utf8");
      return Array.from(source.matchAll(keyPattern))
        .map((match) => match[1])
        .filter((key) => !registered.has(key));
    });

    expect(Array.from(new Set(unregistered))).toEqual([]);
  });
});
