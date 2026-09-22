import { describe, expect, it } from "vitest";
import { buildSearchIndex, type IndexDoc } from "./index";

const docs: IndexDoc[] = [
  { id: "a", thema: "Soziale Ungleichheit", sub: "08_SoWi/u.md", text: "Einkommen Vermögen Bildung Macht" },
  { id: "b", thema: "Verfassungsorgane", sub: "08_SoWi/v.md", text: "Bundestag Bundesrat Regierung" },
  { id: "c", thema: "社会市场经济", sub: "08_SoWi/s.md", text: "竞争与社会平衡" },
];

describe("buildSearchIndex", () => {
  it("leer -> alle ids in reihenfolge", () => {
    expect(buildSearchIndex(docs).query("  ")).toEqual(["a", "b", "c"]);
  });

  it("exakt: thema/sub/volltext treffen (altes verhalten)", () => {
    const idx = buildSearchIndex(docs);
    expect(idx.query("ungleichheit")).toEqual(["a"]);
    expect(idx.query("bundestag")).toEqual(["b"]);
    expect(idx.query("08_SoWi/v.md")).toEqual(["b"]);
    expect(idx.query("XYZQ")).toEqual([]); // kein treffer -> leer, nie crash
  });

  it("fuzzy: tippfehler findet trotzdem (fuse-anteil)", () => {
    expect(buildSearchIndex(docs).query("Ungleichhet")).toContain("a");
    expect(buildSearchIndex(docs).query("Verfasungsorgane")).toContain("b");
  });

  it("cjk-teilstring trifft", () => {
    expect(buildSearchIndex(docs).query("社会")).toContain("c");
    expect(buildSearchIndex(docs).query("竞争")).toContain("c");
  });

  it("reihenfolge = quellreihenfolge, ids eindeutig", () => {
    const ids = buildSearchIndex(docs).query("SoWi");
    expect(ids).toEqual(["a", "b", "c"]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("leerer index -> immer leer", () => {
    expect(buildSearchIndex([]).query("x")).toEqual([]);
  });
});
