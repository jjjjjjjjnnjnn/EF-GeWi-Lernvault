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
