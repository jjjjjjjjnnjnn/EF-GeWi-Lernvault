//主页数据层 (B3): rein + testbar. UI (Home.tsx) rendert nur diese werte.
// quellen: fsrs-store (faelligkeit/stability), xp-store (xp/streak),
// plan-store (tasks/klausurtermin). vault-cards liefern fach/thema/id.
import { loadFsrsStorage } from "../scheduler";
import { planStore, xpStore } from "./stores";
import type { VaultCard } from "../vault/parser";

export interface FachMastery {
  fach: string;
  mastery: number; // 0-100
  reviewed: number;
  total: number;
}

export interface NextItem {
  id: string;
  thema: string;
  fach: string;
}

export interface Overview {
  dueToday: number;
  newToday: number;
  totalCards: number;
  xp: number;
  streakDays: number;
  masteryByFach: FachMastery[];
  /** erledigte plan-tasks anteil 0-1, -1 wenn kein plan */
  weekRate: number;
  /** tage bis klausur, null wenn kein termin */
  klausurInDays: number | null;
  /** naechste faellige (max 5, quellreihenfolge) */
  nextUp: NextItem[];
}

/** stability (tage) -> 0-100: s=1 ~3, s=10 ~28, s=30 =100. */
export function masteryFromStability(s: number): number {
  if (!Number.isFinite(s) || s <= 0) return 0;
  return Math.min(100, Math.round((s / 30) * 100));
}

export function buildOverview(cards: VaultCard[] | null, nowMs = Date.now()): Overview {
  const list = cards ?? [];
  const fsrs = loadFsrsStorage();
  const xp = xpStore.load();
  const plan = planStore.load();

  const now = new Date(nowMs);
  const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

  let dueToday = 0;
  let newToday = 0;
  const nextUp: NextItem[] = [];
  const byFach = new Map<string, { sum: number; reviewed: number; total: number }>();

  for (const c of list) {
    const st = fsrs.cards[c.id];
    const agg = byFach.get(c.fach) ?? { sum: 0, reviewed: 0, total: 0 };
    agg.total++;
    if (!st) {
      newToday++;
    } else {
      agg.sum += st.stability;
      agg.reviewed++;
      if (new Date(st.due).getTime() <= endOfToday) {
        dueToday++;
        if (nextUp.length < 5) nextUp.push({ id: c.id, thema: c.thema, fach: c.fach });
      }
    }
    byFach.set(c.fach, agg);
  }

  const masteryByFach: FachMastery[] = [...byFach.entries()]
    .map(([fach, a]) => ({
      fach,
      mastery: a.reviewed === 0 ? 0 : masteryFromStability(a.sum / a.reviewed),
      reviewed: a.reviewed,
      total: a.total,
    }))
    .sort((a, b) => a.fach.localeCompare(b.fach));

  const tasks = plan.tasks;
  const weekRate = tasks.length === 0 ? -1 : tasks.filter((t) => t.done).length / tasks.length;

  let klausurInDays: number | null = null;
  if (plan.klausurDate) {
    const diff = Math.ceil((new Date(plan.klausurDate).getTime() - nowMs) / 86400000);
    if (Number.isFinite(diff)) klausurInDays = Math.max(0, diff);
  }

  return {
    dueToday,
    newToday,
    totalCards: list.length,
    xp: xp.xp,
    streakDays: xp.streak.length,
    masteryByFach,
    weekRate,
    klausurInDays,
    nextUp,
  };
}
