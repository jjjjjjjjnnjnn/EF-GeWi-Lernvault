import { beforeEach, describe, expect, it } from "vitest";
import { defaultInterleave, isInterleaveOn, orderMixed, setInterleave } from "./interleave";
import { gradeCard, loadFsrsStorage, partitionQueue, prioritizeCard, prioritizeThema } from "../scheduler";

beforeEach(() => {
  localStorage.clear();
});

describe("defaults", () => {
  it("rechen-faecher an, wort-/text-faecher aus", () => {
    for (const f of ["Mathe", "Physik", "Chemie", "Bio"]) expect(defaultInterleave(f)).toBe(true);
    for (const f of ["Deutsch", "Englisch", "SoWi", "Philosophie", "Musik", "Sport"]) expect(defaultInterleave(f)).toBe(false);
  });

  it("override gewinnt, bleibt bestehen", () => {
    expect(isInterleaveOn("Englisch")).toBe(false);
    setInterleave("Englisch", true);
    expect(isInterleaveOn("Englisch")).toBe(true);
    setInterleave("Mathe", false);
    expect(isInterleaveOn("Mathe")).toBe(false);
  });
});

describe("orderMixed", () => {
  const items = [
    { f: "SoWi", t: "s1" },
    { f: "SoWi", t: "s2" },
    { f: "Mathe", t: "m1" },
    { f: "Mathe", t: "m2" },
    { f: "Philo", t: "p1" },
  ];
  const fachOf = (x: { f: string }) => x.f;

  it("an: round-robin, stabil je fach", () => {
    expect(orderMixed(items, fachOf, true).map((x) => x.t)).toEqual(["s1", "m1", "p1", "s2", "m2"]);
  });

  it("aus: aktuelles fach zuerst, rest nach fach gruppiert", () => {
    expect(orderMixed(items, fachOf, false, "Mathe").map((x) => x.t)).toEqual(["m1", "m2", "p1", "s1", "s2"]);
  });

  it("leer -> leer", () => {
    expect(orderMixed([], fachOf, true)).toEqual([]);
  });
});

describe("fehler-rueckfluss", () => {
  it("prioritizeCard: review-karte sofort faellig, rest unberuehrt", () => {
    gradeCard("a", 3); // Good -> due in 3 tagen (zukunft)
    gradeCard("b", 3);
    expect(partitionQueue([{ id: "a" }, { id: "b" }]).activeQueue).toEqual([]);
    prioritizeCard("a");
    expect(partitionQueue([{ id: "a" }, { id: "b" }]).activeQueue.map((x) => x.id)).toEqual(["a"]);
    expect(loadFsrsStorage().cards["a"]?.reps).toBe(1); // keine neue wertung
  });

  it("prioritizeCard ohne state: no-op, nie crash", () => {
    prioritizeCard("neu");
    expect(loadFsrsStorage().cards["neu"]).toBeUndefined();
  });

  it("prioritizeThema: nur review-karten des themas, zaehlt", () => {
    gradeCard("a1", 3);
    gradeCard("a2", 3);
    gradeCard("b1", 3);
    const cards = [
      { id: "a1", thema: "T-A" },
      { id: "a2", thema: "T-A" },
      { id: "neu", thema: "T-A" }, // neu -> schon in queue, zaehlt nicht
      { id: "b1", thema: "T-B" },
    ];
    expect(prioritizeThema(cards, "T-A")).toBe(2);
    const q = partitionQueue(cards).activeQueue.map((x) => x.id);
    expect(q).toContain("a1");
    expect(q).toContain("a2");
    expect(q).toContain("neu");
    expect(q).not.toContain("b1");
  });
});
