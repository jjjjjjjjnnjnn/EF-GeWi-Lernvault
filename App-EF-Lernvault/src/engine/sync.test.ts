import { beforeEach, describe, expect, it } from "vitest";
import {
  httpAccess,
  pullAll,
  pullKey,
  pushAll,
  pushKey,
  stampSync,
  syncStore,
  type HttpAccess,
} from "./sync";
import {
  DAILY_STREAK_STORAGE_KEY,
  FEEDBACK_STORAGE_KEY,
  FSRS_STORAGE_KEY,
  INTERLEAVE_STORAGE_KEY,
  LANG_STORAGE_KEY,
  LOCAL_ONLY_STORAGE_KEYS,
  MASTERY_STORAGE_KEY,
  ONBOARDING_STORAGE_KEY,
  PLAN_STORAGE_KEY,
  SYNC_STORAGE_ALLOWLIST,
  SYNCED_STORAGE_KEYS,
  THINKING_INTENSITY_STORAGE_KEY,
  TUTOR_PEDAGOGY_MODE_STORAGE_KEY,
  VERGLEICH_STORAGE_KEY,
  XP_STORAGE_KEY,
} from "./storageKeys";

const EXPECTED_SYNCED_KEYS = [
  FSRS_STORAGE_KEY,
  XP_STORAGE_KEY,
  VERGLEICH_STORAGE_KEY,
  FEEDBACK_STORAGE_KEY,
  PLAN_STORAGE_KEY,
  ONBOARDING_STORAGE_KEY,
  LANG_STORAGE_KEY,
  MASTERY_STORAGE_KEY,
  DAILY_STREAK_STORAGE_KEY,
  INTERLEAVE_STORAGE_KEY,
  TUTOR_PEDAGOGY_MODE_STORAGE_KEY,
  THINKING_INTENSITY_STORAGE_KEY,
];

const EXPECTED_LOCAL_ONLY_KEYS = [
  "eflernvault:sync:v1",
  "eflernvault:ai:v1",
  "eflernvault:endpoints:v1",
  "eflernvault:active_endpoint:v1",
  "eflernvault:fallback_endpoint:v1",
  "eflernvault:token_ledger:v1",
  "eflernvault:token_budget:v1",
];

// In-memory fake-server: key -> value
function fakeServer(initial: Record<string, string> = {}, failAt?: string) {
  const db = new Map(Object.entries(initial));
  const calls: { method: string; key: string }[] = [];
  const fetchFn = (async (url: string, init?: RequestInit) => {
    const key = decodeURIComponent(String(url).split("/").pop() ?? "");
    const method = init?.method ?? "GET";
    calls.push({ method, key });
    if (failAt === key) return { ok: false, status: 500, json: async () => ({}) };
    if (method === "PUT") {
      db.set(key, (JSON.parse(String(init?.body)) as { value: string }).value);
      return { ok: true, status: 200, json: async () => ({}) };
    }
    if (!db.has(key)) return { ok: false, status: 404, json: async () => ({}) };
    return { ok: true, status: 200, json: async () => ({ value: db.get(key) }) };
  }) as unknown as typeof fetch;
  return { db, calls, fetchFn };
}

beforeEach(() => {
  localStorage.clear();
});

describe("pullKey/pushKey", () => {
  it("roundtrip + 404-null + fehler-wirft", async () => {
    const f = fakeServer();
    const h = httpAccess("https://sync.example/s", "tok", f.fetchFn);
    expect(await pullKey(h, "eflernvault:xp:v1")).toBeNull();
    await pushKey(h, "eflernvault:xp:v1", '{"version":1}');
    expect(await pullKey(h, "eflernvault:xp:v1")).toBe('{"version":1}');
    expect(f.calls[0]).toMatchObject({ method: "GET" });
    const bad = fakeServer({}, "eflernvault:xp:v1");
    const hb = httpAccess("https://x", "", bad.fetchFn);
    await expect(pullKey(hb, "eflernvault:xp:v1")).rejects.toThrow(/500/);
  });

  it("token -> Authorization-header, base-slash normalisiert", () => {
    const h = httpAccess("https://x/sync/", "abc");
    expect(h.headers.Authorization).toBe("Bearer abc");
    expect(h.base).toBe("https://x/sync");
    expect(httpAccess("https://x", "").headers.Authorization).toBeUndefined();
  });
});

describe("pushAll/pullAll", () => {
  it("nur befuellte keys hoch, server gewinnt beim holen", async () => {
    localStorage.setItem("eflernvault:xp:v1", JSON.stringify({ version: 1, xp: 9, streak: [], badges: {}, done: {} }));
    const f = fakeServer();
    const h: HttpAccess = httpAccess("https://x", "", f.fetchFn);
    expect(await pushAll(h)).toBe(1); // nur xp befuellt
    // server aendert xp, client zieht
    f.db.set("eflernvault:xp:v1", JSON.stringify({ version: 1, xp: 42, streak: [], badges: {}, done: {} }));
    expect(await pullAll(h)).toEqual(["eflernvault:xp:v1"]);
    expect(JSON.parse(localStorage.getItem("eflernvault:xp:v1")!).xp).toBe(42);
  });

  it("iterates the complete allowlist and excludes local-only keys in both directions", async () => {
    expect(SYNCED_STORAGE_KEYS).toEqual(EXPECTED_SYNCED_KEYS);
    expect(SYNC_STORAGE_ALLOWLIST.map(({ key }) => key)).toEqual(EXPECTED_SYNCED_KEYS);
    expect(LOCAL_ONLY_STORAGE_KEYS).toEqual(EXPECTED_LOCAL_ONLY_KEYS);
    for (const key of EXPECTED_SYNCED_KEYS) localStorage.setItem(key, `local:${key}`);
    for (const key of EXPECTED_LOCAL_ONLY_KEYS) localStorage.setItem(key, `local-only:${key}`);
    const server = fakeServer();
    const access = httpAccess("https://x", "", server.fetchFn);

    expect(await pushAll(access)).toBe(EXPECTED_SYNCED_KEYS.length);
    expect(server.calls.filter((call) => call.method === "PUT").map((call) => call.key)).toEqual(
      EXPECTED_SYNCED_KEYS
    );
    expect(server.calls.some((call) => EXPECTED_LOCAL_ONLY_KEYS.includes(call.key))).toBe(false);

    for (const key of EXPECTED_LOCAL_ONLY_KEYS) server.db.set(key, `remote:${key}`);
    for (const key of EXPECTED_SYNCED_KEYS) server.db.set(key, `remote:${key}`);
    expect(await pullAll(access)).toEqual(EXPECTED_SYNCED_KEYS);
    expect(EXPECTED_SYNCED_KEYS.map((key) => localStorage.getItem(key))).toEqual(
      EXPECTED_SYNCED_KEYS.map((key) => `remote:${key}`)
    );
    expect(EXPECTED_LOCAL_ONLY_KEYS.map((key) => localStorage.getItem(key))).toEqual(
      EXPECTED_LOCAL_ONLY_KEYS.map((key) => `local-only:${key}`)
    );
  });

  it("leerer server -> pull [] ohne schreiben", async () => {
    const f = fakeServer();
    const h = httpAccess("https://x", "", f.fetchFn);
    expect(await pullAll(h)).toEqual([]);
  });
});

describe("syncStore", () => {
  it("defaults + stampSync setzt zeit", () => {
    expect(syncStore.load().endpoint).toBe("");
    stampSync();
    expect(syncStore.load().lastSync.length).toBeGreaterThan(0);
  });
});
