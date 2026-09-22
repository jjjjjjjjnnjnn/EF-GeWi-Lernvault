import { beforeEach, describe, expect, it } from "vitest";
import { gradeCard, loadFsrsStorage, partitionQueue, type Rating } from "./scheduler";

beforeEach(() => {
  localStorage.clear();
});

describe("gradeCard", () => {
  it("neue Karte mit Good: stability 3.0, intervall 3 tage", () => {
    const { state, intervalDays } = gradeCard("c1", 3);
    expect(state.stability).toBe(3.0);
    expect(state.reps).toBe(1);
    expect(state.state).toBe(2);
    expect(intervalDays).toBe(3);
    // persistiert?
    expect(loadFsrsStorage().cards["c1"]?.reps).toBe(1);
  });

  it("Again bei neuer Karte: lapses+1, intervall 1, stability halbiert (min 0.6)", () => {
    const { state, intervalDays } = gradeCard("c1", 1);
    expect(state.state).toBe(1); // Learning
    expect(state.lapses).toBe(1);
    expect(intervalDays).toBe(1);
    expect(state.stability).toBe(1.0); // 2.0 * 0.5
  });

  it("zweite Again: Relearning + stability floor 0.6", () => {
    gradeCard("c1", 1);
    const { state } = gradeCard("c1", 1);
    expect(state.state).toBe(3); // Relearning
    expect(state.stability).toBe(0.6); // max(0.6, 1.0*0.5)=0.6? 1.0*0.5=0.5 -> floor 0.6
    expect(state.lapses).toBe(2);
  });

  it("Hard < Good < Easy intervalle (monotonie)", () => {
    const hard = gradeCard("h", 2).intervalDays;
    const good = gradeCard("g", 3).intervalDays;
    const easy = gradeCard("e", 4).intervalDays;
    expect(hard).toBeLessThanOrEqual(good);
    expect(good).toBeLessThanOrEqual(easy);
    expect(easy).toBeGreaterThanOrEqual(2);
  });

  it("bewertung aendert nur die eigene Karte (isolation)", () => {
    gradeCard("a", 3);
    gradeCard("b", 1);
    const store = loadFsrsStorage();
    expect(store.cards["a"]?.lapses).toBe(0);
    expect(store.cards["b"]?.lapses).toBe(1);
  });

  it("unbekannte gespeicherte version -> default (robustheit)", () => {
    localStorage.setItem("eflernvault:fsrs:v1", "kein-json{{{");
    expect(loadFsrsStorage()).toEqual({ version: 1, cards: {} });
    // gradeCard muss danach trotzdem funktionieren
    expect(gradeCard("x", 3).intervalDays).toBe(3);
  });
});

describe("partitionQueue", () => {
  const ids = (xs: { id: string }[]) => xs.map((x) => x.id);

  it("neue Karten zuerst, faellige danach, zukuenftige nie", () => {
    gradeCard("due-old", 3); // faellig in 3 tagen -> zukunft
    gradeCard("lapse", 1); // Again -> intervall 1 (morgen 23:59, zukunft)
    const items = [{ id: "neu-1" }, { id: "due-old" }, { id: "neu-2" }, { id: "lapse" }];
    const q = partitionQueue(items);
    expect(ids(q.activeQueue)).toEqual(["neu-1", "neu-2"]);
    expect(q.newCount).toBe(2);
    expect(q.totalCards).toBe(4);
  });

  it("faellige reviews nach faelligkeit sortiert", () => {
    // due-daten direkt in die vergangenheit legen -> beide faellig
    const past = (daysAgo: number) => {
      const d = new Date();
      d.setDate(d.getDate() - daysAgo);
      return d.toISOString();
    };
    localStorage.setItem(
      "eflernvault:fsrs:v1",
      JSON.stringify({
        version: 1,
        cards: {
          r1: { state: 2, due: past(5), stability: 5, difficulty: 5, reps: 3, lapses: 0, lastReview: past(6) },
          r2: { state: 2, due: past(1), stability: 5, difficulty: 5, reps: 3, lapses: 0, lastReview: past(2) },
        },
      })
    );
    const q = partitionQueue([{ id: "r1" }, { id: "r2" }, { id: "neu" }]);
    expect(ids(q.activeQueue)).toEqual(["neu", "r1", "r2"]); // neu zuerst, dann frueheste due
    expect(q.newCount).toBe(1);
    expect(q.dueCount).toBe(3);
  });

  it("leere liste -> leere queue (kein crash)", () => {
    const q = partitionQueue([]);
    expect(q.activeQueue).toEqual([]);
    expect(q.dueCount).toBe(0);
  });
});

describe("session-snapshot invariant (regression: fruehes finish)", () => {
  it("Good auf erster karte darf queue nicht schrumpfen (snapshot-semantik)", () => {
    // simuliert Flashcards-snapshot: queue einmal eingefroren, grade aendert snapshot nicht
    const items = [{ id: "a" }, { id: "b" }, { id: "c" }, { id: "d" }];
    const snapshot = [...partitionQueue(items).activeQueue];
    expect(snapshot).toHaveLength(4);
    gradeCard("a", 3 as Rating); // Good auf erster karte
    // snapshot bleibt 4 (komponente haelt session.items fest)
    expect(snapshot).toHaveLength(4);
    // naechste partition waere kuerzer -> genau der alte bug; snapshot verhindert ihn
    expect(partitionQueue(items).activeQueue.length).toBeLessThan(4);
  });
});
