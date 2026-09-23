// Cloud-sync (C2): schlankes REST-protokoll pro key —
//   GET  {endpoint}/{key}          -> { "value": "<raw-json-string>" } (404 = fehlt)
//   PUT  {endpoint}/{key}          { "value": "<raw-json-string>" }
// Modell: lokal bleibt immer aktiv (offline-faehig), cloud ist explizites
// push/pull (button), kein transparenter backend-swap (sync-interface ist
// synchron, http nicht). Server-seitig beliebig — doku LEARNING-ENGINE § cloud.
import { defineStore, getStorageBackend, type VersionedStore } from "./storage";
import { SYNC_STORAGE_ALLOWLIST, SYNC_STORAGE_KEY } from "./storageKeys";

export interface SyncData {
  version: 1;
  endpoint: string;
  token: string;
  lastSync: string;
}

export const syncStore: VersionedStore<SyncData> = defineStore<SyncData>({
  key: SYNC_STORAGE_KEY,
  version: 1,
  defaults: () => ({ version: 1, endpoint: "", token: "", lastSync: "" }),
  validate: (v: unknown): v is SyncData => {
    if (!v || typeof v !== "object") return false;
    const o = v as Record<string, unknown>;
    return (
      typeof o.endpoint === "string" && typeof o.token === "string" && typeof o.lastSync === "string"
    );
  },
});

export interface HttpAccess {
  base: string;
  headers: Record<string, string>;
  fetchFn: typeof fetch;
}

export function httpAccess(endpoint: string, token: string, fetchFn: typeof fetch = fetch): HttpAccess {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token.trim()) headers.Authorization = `Bearer ${token.trim()}`;
  return { base: endpoint.replace(/\/$/, ""), headers, fetchFn };
}

/** Einzel-key vom server holen (null wenn 404/fehlt). */
export async function pullKey(h: HttpAccess, key: string): Promise<string | null> {
  const res = await h.fetchFn(`${h.base}/${encodeURIComponent(key)}`, { headers: h.headers });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Sync GET ${res.status}`);
  const data = await res.json();
  return typeof data?.value === "string" ? data.value : null;
}

/** Einzel-key zum server schieben. */
export async function pushKey(h: HttpAccess, key: string, value: string): Promise<void> {
  const res = await h.fetchFn(`${h.base}/${encodeURIComponent(key)}`, {
    method: "PUT",
    headers: h.headers,
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error(`Sync PUT ${res.status}`);
}

/** Alle lokalen verwalteten keys hochladen; rueckgabe = anzahl. */
export async function pushAll(h: HttpAccess): Promise<number> {
  const local = getStorageBackend();
  let n = 0;
  for (const { key } of SYNC_STORAGE_ALLOWLIST) {
    const raw = local.get(key);
    if (raw) {
      await pushKey(h, key, raw);
      n++;
    }
  }
  return n;
}

/** Alle keys herunterladen (server gewinnt); rueckgabe = uebernommene keys. */
export async function pullAll(h: HttpAccess): Promise<string[]> {
  const local = getStorageBackend();
  const done: string[] = [];
  for (const { key } of SYNC_STORAGE_ALLOWLIST) {
    const remote = await pullKey(h, key);
    if (remote !== null) {
      local.set(key, remote);
      done.push(key);
    }
  }
  return done;
}

export function stampSync(): void {
  const s = syncStore.load();
  syncStore.save({ ...s, lastSync: new Date().toISOString() });
}
