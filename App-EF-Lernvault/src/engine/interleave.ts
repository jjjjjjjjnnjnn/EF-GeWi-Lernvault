// Interleaving-steuerung (B2): evidenz-basierte defaults (mathe/naturwiss. an,
// wort-/text-lastige faecher aus/blocked), pro-fach override im store,
// listen-sortierung round-robin vs. geblockt.
import { defineStore, type VersionedStore } from "./storage";

const KEY = "eflernvault:interleave:v1";

export interface InterleaveData {
  version: 1;
  byFach: Record<string, boolean>;
}

const store: VersionedStore<InterleaveData> = defineStore<InterleaveData>({
  key: KEY,
  version: 1,
  defaults: () => ({ version: 1, byFach: {} }),
  validate: (v: unknown): v is InterleaveData => {
    if (!v || typeof v !== "object") return false;
    const b = (v as { byFach?: unknown }).byFach;
    return !!b && typeof b === "object" && !Array.isArray(b);
  },
});

/** Default: rechen-/bild-lastig an (g~0.3-0.4), wort-/text-lastig aus. */
export function defaultInterleave(fach: string): boolean {
  return fach === "Mathe" || fach === "Physik" || fach === "Chemie" || fach === "Bio";
}

export function isInterleaveOn(fach: string): boolean {
  const s = store.load();
  return s.byFach[fach] ?? defaultInterleave(fach);
}

export function setInterleave(fach: string, on: boolean): void {
  const s = store.load();
  store.save({ version: 1, byFach: { ...s.byFach, [fach]: on } });
}

/**
 * Listen-sortierung: an = round-robin ueber faecher (stabil je fach),
 * aus = geblockt (aktuelles fach zuerst, rest alphabetisch).
 */
export function orderMixed<T>(items: T[], fachOf: (t: T) => string, on: boolean, currentFach = ""): T[] {
  if (on) {
    const groups = new Map<string, T[]>();
    for (const it of items) {
      const f = fachOf(it);
      if (!groups.has(f)) groups.set(f, []);
      groups.get(f)!.push(it);
    }
    const lists = [...groups.values()];
    const out: T[] = [];
    let i = 0;
    let progress = true;
    while (progress) {
      progress = false;
      for (const l of lists) {
        if (i < l.length) {
          out.push(l[i]);
          progress = true;
        }
      }
      i++;
    }
    return out;
  }
  const cur = items.filter((t) => fachOf(t) === currentFach);
  const rest = items.filter((t) => fachOf(t) !== currentFach);
  rest.sort((a, b) => fachOf(a).localeCompare(fachOf(b)));
  return [...cur, ...rest];
}
