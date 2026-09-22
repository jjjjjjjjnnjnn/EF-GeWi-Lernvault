import { beforeEach, describe, expect, it } from "vitest";
import { gradeCard } from "../scheduler";
import { buildOverview, masteryFromStability } from "./overview";
import type { VaultCard } from "../vault/parser";

const card = (id: string, fach = "SoWi", thema = "T"): VaultCard => ({
  id, front: id, back: "x", example: "", fach, thema, source: "s.csv",
});

const NOW = new Date("2026-09-23T12:00:00").getTime();

beforeEach(() => {
  localStorage.clear();
});

describe("masteryFromStability", () => {
  it("monoton, 0-sicher, deckel 100", () => {
    expect(masteryFromStability(0)).toBe(0);
    expect(masteryFromStability(-3)).toBe(0);
    expect(masteryFromStability(NaN)).toBe(0);
    expect(masteryFromStability(1)).toBe(3);
    expect(masteryFromStability(15)).toBeGreaterThan(masteryFromStability(3));
    expect(masteryFromStability(30)).toBe(100);
    expect(masteryFromStability(300)).toBe(100);
  });
});

describe("buildOverview", () => {
  it("leer/null -> nullen, weekRate -1, klausur null", () => {
    const o = buildOverview(null, NOW);
    expect(o).toMatchObject({ dueToday: 0, newToday: 0, totalCards: 0, xp: 0, streakDays: 0, weekRate: -1, klausurInDays: null });
    expect(o.masteryByFach).toEqual([]);
    expect(o.nextUp).toEqual([]);
  });

  it("neu vs. faellig vs. zukunft", () => {
    gradeCard("due", 3); // +3 tage -> zukunft
    const cards = [card("neu"), card("due")];
    // due per hand faellig stellen: grade + manuell? -> ueber due-tomorrow logik:
    // einfacher: beide neu ausser eine review in vergangenheit via speicher
    const raw = JSON.parse(localStorage.getItem("eflernvault:fsrs:v1")!);
    raw.cards["due"].due = new Date(NOW - 86400000).toISOString();
    localStorage.setItem("eflernvault:fsrs:v1", JSON.stringify(raw));
    const o = buildOverview(cards, NOW);
    expect(o.newToday).toBe(1);
    expect(o.dueToday).toBe(1);
    expect(o.totalCards).toBe(2);
    expect(o.nextUp.map((n) => n.id)).toEqual(["due"]);
  });

  it("mastery je fach + nextUp deckel 5", () => {
    const cards = Array.from({ length: 7 }, (_, i) => card(`m${i}`, "Mathe", "T"));
    cards.forEach((c) => gradeCard(c.id, 3)); // stability 3.0 each
    const raw = JSON.parse(localStorage.getItem("eflernvault:fsrs:v1")!);
    for (const c of cards) raw.cards[c.id].due = new Date(NOW - 1000).toISOString();
    localStorage.setItem("eflernvault:fsrs:v1", JSON.stringify(raw));
    const o = buildOverview(cards, NOW);
    expect(o.masteryByFach).toEqual([{ fach: "Mathe", mastery: masteryFromStability(3), reviewed: 7, total: 7 }]);
    expect(o.nextUp).toHaveLength(5);
    expect(o.dueToday).toBe(7);
  });

  it("xp/streak/plan-rate/klausur aus stores", () => {
    localStorage.setItem("eflernvault:xp:v1", JSON.stringify({ version: 1, xp: 40, streak: ["2026-09-22", "2026-09-23"], badges: {}, done: {} }));
    localStorage.setItem(
      "eflernvault:plan:v1",
      JSON.stringify({ klausurDate: "2026-10-03", tasks: [{ id: "a", day: "Mo", fach: "SoWi", task: "x", done: true }, { id: "b", day: "Di", fach: "M", task: "y", done: false }] })
    );
    const o = buildOverview([], NOW);
    expect(o.xp).toBe(40);
    expect(o.streakDays).toBe(2);
    expect(o.weekRate).toBe(0.5);
    expect(o.klausurInDays).toBe(10);
  });

  it("klausur vergangen -> 0, nie negativ", () => {
    localStorage.setItem("eflernvault:plan:v1", JSON.stringify({ klausurDate: "2026-01-01", tasks: [] }));
    expect(buildOverview([], NOW).klausurInDays).toBe(0);
  });
});
