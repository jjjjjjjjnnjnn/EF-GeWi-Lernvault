import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  AI_CONFIG_STORAGE_KEY,
  DAILY_STREAK_STORAGE_KEY,
  INTERLEAVE_STORAGE_KEY,
  LANG_STORAGE_KEY,
  MASTERY_STORAGE_KEY,
  PERSISTED_STORAGE_KEYS,
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

  it("keeps synced state keys complete and unique", () => {
    expect(SYNCED_STORAGE_KEYS).toHaveLength(10);
    expect(new Set(SYNCED_STORAGE_KEYS).size).toBe(10);
    expect(SYNCED_STORAGE_KEYS).toEqual(expect.arrayContaining([MASTERY_STORAGE_KEY, DAILY_STREAK_STORAGE_KEY, INTERLEAVE_STORAGE_KEY, LANG_STORAGE_KEY]));
    expect(SYNCED_STORAGE_KEYS).not.toContain(AI_CONFIG_STORAGE_KEY);
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
