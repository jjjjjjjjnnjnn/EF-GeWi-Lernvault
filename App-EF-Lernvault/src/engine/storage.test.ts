import { beforeEach, describe, expect, it } from "vitest";
import { defineStore, isRecord } from "./storage";

interface Demo {
  version: 1;
  n: number;
}

const def = {
  key: "test:demo:v1",
  version: 1,
  defaults: (): Demo => ({ version: 1, n: 0 }),
  validate: (v: unknown): v is Demo => isRecord(v) && typeof (v as Record<string, unknown>).n === "number",
};

beforeEach(() => {
  localStorage.clear();
});

describe("defineStore", () => {
  it("roundtrip save/load", () => {
    const s = defineStore(def);
    s.save({ version: 1, n: 42 });
    expect(s.load()).toEqual({ version: 1, n: 42 });
    expect(s.raw()).toContain("42");
  });

  it("leer -> defaults", () => {
    expect(defineStore(def).load()).toEqual({ version: 1, n: 0 });
  });

  it("korrupt -> defaults, nie crash", () => {
    localStorage.setItem(def.key, "{{{kaputt");
    expect(defineStore(def).load()).toEqual({ version: 1, n: 0 });
  });

  it("fremde version -> defaults (migration-safe)", () => {
    localStorage.setItem(def.key, JSON.stringify({ version: 2, n: 9 }));
    expect(defineStore(def).load()).toEqual({ version: 1, n: 0 });
  });

  it("validate-fehlschlag -> defaults", () => {
    localStorage.setItem(def.key, JSON.stringify({ version: 1, n: "kein-number" }));
    expect(defineStore(def).load()).toEqual({ version: 1, n: 0 });
  });

  it("reset loescht key", () => {
    const s = defineStore(def);
    s.save({ version: 1, n: 7 });
    s.reset();
    expect(s.raw()).toBe("");
    expect(s.load()).toEqual({ version: 1, n: 0 });
  });

  it("isRecord typwaechter", () => {
    expect(isRecord({})).toBe(true);
    expect(isRecord([])).toBe(false);
    expect(isRecord(null)).toBe(false);
    expect(isRecord("x")).toBe(false);
  });
});
