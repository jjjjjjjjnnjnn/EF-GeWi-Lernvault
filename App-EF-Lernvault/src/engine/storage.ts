// Einheitliche versionierte localStorage-Schicht (Phase A).
// Module greifen nicht mehr direkt auf localStorage zu, sondern ueber
// defineStore: key+version+defaults+validate. Verhalten bleibt kompatibel:
// korrupte/fremde daten -> defaults, nie crash.

export interface StoreDef<T> {
  key: string;
  version: number;
  defaults: () => T;
  validate: (v: unknown) => v is T;
}

export interface VersionedStore<T> {
  key: string;
  load: () => T;
  save: (v: T) => void;
  raw: () => string;
  reset: () => void;
}

function readRaw(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function defineStore<T>(def: StoreDef<T>): VersionedStore<T> {
  const fallback = (): T => def.defaults();
  return {
    key: def.key,
    load: (): T => {
      const raw = readRaw(def.key);
      if (!raw) return fallback();
      try {
        const parsed: unknown = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && (parsed as { version?: unknown }).version === def.version && def.validate(parsed)) {
          return parsed as T;
        }
      } catch {
        // korrupt -> defaults (siehe test)
      }
      return fallback();
    },
    save: (v: T): void => {
      try {
        localStorage.setItem(def.key, JSON.stringify(v));
      } catch {
        // speicher blockiert (privatmodus): stillschweigend ignorieren
      }
    },
    raw: (): string => readRaw(def.key) ?? "",
    reset: (): void => {
      try {
        localStorage.removeItem(def.key);
      } catch {
        // ignorieren
      }
    },
  };
}

export function isRecord(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === "object" && !Array.isArray(v);
}
