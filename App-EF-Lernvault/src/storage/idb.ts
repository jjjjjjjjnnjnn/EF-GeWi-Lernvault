// Leichtgewichtige, native IndexedDB-Schicht für EF-GeWi-Lernvault (Phase 2).
// Keine externen npm-Abhängigkeiten. Bietet asynchrone, nicht-blockierende
// Persistenz für hochdimensionale Vektoren (Float32Array / number[]) und Quiz-Verlauf.
// Bei Umgebungen ohne IndexedDB (z.B. manchen Testläufern) erfolgt stilles Fallback auf Memory.

const DB_NAME = "eflernvault_db";
const DB_VERSION = 1;
const STORE_VECTORS = "vector_cache";

interface VectorRecord {
  id: string;      // z.B. "08_SoWi/Soziale-Ungleichheit.md#2"
  h: number;       // Hash des Textes zur Invalidierung
  v: number[];     // Embedding-Vektor
  ts: number;      // Zeitstempel
}

let dbInstance: IDBDatabase | null = null;
let dbPromise: Promise<IDBDatabase | null> | null = null;
const memoryFallback = new Map<string, { h: number; v: number[] }>();

function hasIndexedDB(): boolean {
  return typeof indexedDB !== "undefined" && indexedDB !== null;
}

export function openIdb(): Promise<IDBDatabase | null> {
  if (dbInstance) return Promise.resolve(dbInstance);
  if (dbPromise) return dbPromise;
  if (!hasIndexedDB()) return Promise.resolve(null);

  dbPromise = new Promise((resolve) => {
    try {
      const req = indexedDB.open(DB_NAME, DB_VERSION);
      req.onupgradeneeded = (e) => {
        const db = (e.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains(STORE_VECTORS)) {
          db.createObjectStore(STORE_VECTORS, { keyPath: "id" });
        }
      };
      req.onsuccess = (e) => {
        dbInstance = (e.target as IDBOpenDBRequest).result;
        resolve(dbInstance);
      };
      req.onerror = () => {
        resolve(null);
      };
    } catch {
      resolve(null);
    }
  });

  return dbPromise;
}

/**
 * Liest einen Vektor aus IndexedDB (oder Memory-Fallback).
 */
export async function idbGetVector(id: string): Promise<{ h: number; v: number[] } | null> {
  const db = await openIdb();
  if (!db) {
    return memoryFallback.get(id) ?? null;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_VECTORS, "readonly");
      const store = tx.objectStore(STORE_VECTORS);
      const req = store.get(id);
      req.onsuccess = () => {
        const res = req.result as VectorRecord | undefined;
        if (res && typeof res.h === "number" && Array.isArray(res.v)) {
          resolve({ h: res.h, v: res.v });
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    } catch {
      resolve(memoryFallback.get(id) ?? null);
    }
  });
}

/**
 * Liest mehrere Vektoren in einem Rutsch (Batch-Lesung).
 */
export async function idbGetManyVectors(
  ids: string[]
): Promise<Map<string, { h: number; v: number[] }>> {
  const out = new Map<string, { h: number; v: number[] }>();
  if (ids.length === 0) return out;

  const db = await openIdb();
  if (!db) {
    for (const id of ids) {
      const hit = memoryFallback.get(id);
      if (hit) out.set(id, hit);
    }
    return out;
  }

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_VECTORS, "readonly");
      const store = tx.objectStore(STORE_VECTORS);
      let count = 0;

      for (const id of ids) {
        const req = store.get(id);
        req.onsuccess = () => {
          const res = req.result as VectorRecord | undefined;
          if (res && typeof res.h === "number" && Array.isArray(res.v)) {
            out.set(id, { h: res.h, v: res.v });
          }
          count++;
          if (count === ids.length) resolve(out);
        };
        req.onerror = () => {
          count++;
          if (count === ids.length) resolve(out);
        };
      }
    } catch {
      for (const id of ids) {
        const hit = memoryFallback.get(id);
        if (hit) out.set(id, hit);
      }
      resolve(out);
    }
  });
}

/**
 * Speichert Vektoren im Hintergrund dauerhaft ab.
 */
export async function idbSetManyVectors(
  entries: { id: string; h: number; v: number[] }[]
): Promise<void> {
  if (entries.length === 0) return;

  // Stets auch ins Memory-Fallback schreiben
  for (const e of entries) {
    memoryFallback.set(e.id, { h: e.h, v: e.v });
  }

  const db = await openIdb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_VECTORS, "readwrite");
      const store = tx.objectStore(STORE_VECTORS);
      const now = Date.now();

      for (const e of entries) {
        store.put({ id: e.id, h: e.h, v: e.v, ts: now });
      }

      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}

/**
 * Leert den gesamten persistenten Vektor-Cache.
 */
export async function idbClearVectors(): Promise<void> {
  memoryFallback.clear();
  const db = await openIdb();
  if (!db) return;

  return new Promise((resolve) => {
    try {
      const tx = db.transaction(STORE_VECTORS, "readwrite");
      const store = tx.objectStore(STORE_VECTORS);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    } catch {
      resolve();
    }
  });
}
