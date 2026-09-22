// Einheitliche versionierte localStorage-Schicht (Phase A).
// Module greifen nicht mehr direkt auf localStorage zu, sondern ueber
// defineStore: key+version+defaults+validate. Verhalten bleibt kompatibel:
// korrupte/fremde daten -> defaults, nie crash.

export interface StoreDef<T> {
  key: string;
  version: number;
  defaults: () => T;
  validate: (v: unknown) => v is T;
  /** Altdaten ohne version heben: parsed -> normalisiert, oder null (dann defaults). */
  legacy?: (parsed: unknown) => T | null;
}

export interface VersionedStore<T> {
  key: string;
  load: () => T;
  save: (v: T) => void;
  raw: () => string;
  reset: () => void;
}

// Backend-abstraktion (B0): heute localStorage, spaeter cloud-sync —
// module sprechen nur stores, nie das backend direkt an.
export interface StorageBackend {
  get: (key: string) => string | null;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
}

export const localBackend: StorageBackend = {
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // speicher blockiert/voll: stillschweigend ignorieren
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignorieren
    }
  },
};

let activeBackend: StorageBackend = localBackend;

/** Backend tauschen (z.b. cloud-sync, tests-memory). Default: local. */
export function setStorageBackend(b: StorageBackend): void {
  activeBackend = b;
}

export function getStorageBackend(): StorageBackend {
  return activeBackend;
}

export function defineStore<T>(def: StoreDef<T>): VersionedStore<T> {
  const fallback = (): T => def.defaults();
  const store: VersionedStore<T> = {
    key: def.key,
    load: (): T => {
      const raw = getStorageBackend().get(def.key);
      if (!raw) return fallback();
      let parsed: unknown = null;
      try {
        parsed = JSON.parse(raw);
      } catch {
        return fallback(); // korrupt -> defaults
      }
      if (
        parsed &&
        typeof parsed === "object" &&
        (parsed as { version?: unknown }).version === def.version &&
        def.validate(parsed)
      ) {
        return parsed as T;
      }
      // migrationspfad: altdaten ohne version einmalig normalisieren
      if (def.legacy) {
        const migrated = def.legacy(parsed);
        if (migrated) {
          store.save(migrated);
          return migrated;
        }
      }
      return fallback();
    },
    save: (v: T): void => {
      getStorageBackend().set(def.key, JSON.stringify(v));
    },
    raw: (): string => getStorageBackend().get(def.key) ?? "",
    reset: (): void => {
      getStorageBackend().remove(def.key);
    },
  };
  return store;
}

export function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
