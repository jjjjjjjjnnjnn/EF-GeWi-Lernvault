import { describe, expect, it } from "vitest";
import { MasteryEngine, getTopicRankingWeight } from "./mastery";
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

  it("exakt: thema/sub/volltext treffen", () => {
    const idx = buildSearchIndex(docs);
    expect(idx.query("ungleichheit")).toEqual(["a"]);
    expect(idx.query("bundestag")).toEqual(["b"]);
    expect(idx.query("08_SoWi/v.md")).toEqual(["b"]);
    expect(idx.query("XYZQ")).toEqual([]);
  });

  it("fuzzy: tippfehler findet trotzdem", () => {
    expect(buildSearchIndex(docs).query("Ungleichhet")).toContain("a");
    expect(buildSearchIndex(docs).query("Verfasungsorgane")).toContain("b");
  });

  it("cjk-teilstring trifft", () => {
    expect(buildSearchIndex(docs).query("社会")).toContain("c");
    expect(buildSearchIndex(docs).query("竞争")).toContain("c");
  });

  it("rankt exakte treffer nach feldpriorität", () => {
    const idx = buildSearchIndex([
      { id: "body", thema: "Anderes Thema", sub: "Dokument/anders.md", text: "SoWi" },
      { id: "subject", thema: "Anderes Thema", sub: "Dokument/SoWi.md", text: "ohne Treffer" },
      { id: "title", thema: "SoWi", sub: "Dokument/anders.md", text: "ohne Treffer" },
    ]);
    expect(idx.query("SoWi")).toEqual(["title", "subject", "body"]);
  });

  it("normalisiert deutsche umlaut- und ss-schreibweisen", () => {
    const idx = buildSearchIndex([
      { id: "umlaut", thema: "Größe", sub: "08_SoWi/groesse.md", text: "Straße" },
      { id: "translit", thema: "Groesse", sub: "08_SoWi/groesse.md", text: "Strasse" },
    ]);
    expect(idx.query("Größe")).toEqual(["umlaut", "translit"]);
    expect(idx.query("Groesse")).toEqual(["umlaut", "translit"]);
    expect(idx.query("Strasse")).toEqual(["umlaut", "translit"]);
  });

  it("findet eine natürliche chinesische frage über bm25", () => {
    const idx = buildSearchIndex([
      { id: "zh", thema: "Chancengerechtigkeit", sub: "08_SoWi/chance.md", text: "机会公平是评价社会流动的重要标准。" },
      { id: "other", thema: "Verfassungsorgane", sub: "08_SoWi/org.md", text: "Bundestag und Bundesrat" },
    ]);
    expect(idx.query("为什么社会流动需要机会公平？")[0]).toBe("zh");
  });

  it("findet gemischte deutsch-chinesische fragen", () => {
    const idx = buildSearchIndex([
      { id: "mixed", thema: "Soziale Ungleichheit", sub: "08_SoWi/ungleichheit.md", text: "社会流动与机会公平" },
      { id: "other", thema: "Kant", sub: "07_Philosophie/kant.md", text: "Categorical imperative" },
    ]);
    expect(idx.query("Ungleichheit 社会")).toContain("mixed");
  });

  it("boostet schwächere mastery-themen bei aktivem weighting", () => {
    const mastery = new MasteryEngine();
    mastery.clearAll();
    for (let i = 0; i < 4; i++) {
      mastery.recordAttempt("weak", "Gleiches Thema", "SoWi", false);
      mastery.recordAttempt("strong", "Gleiches Thema", "SoWi", true);
    }
    const weightedDocs: IndexDoc[] = [
      { id: "strong", thema: "Gleiches Thema", sub: "", text: "Identischer Inhalt" },
      { id: "weak", thema: "Gleiches Thema", sub: "", text: "Identischer Inhalt" },
    ];
    const idx = buildSearchIndex(weightedDocs, {
      rankingWeight: (doc) => mastery.getRankingWeight(doc.id, doc.datum),
    });
    expect(mastery.getTopicMastery("weak")!.pMastery).toBeLessThan(
      mastery.getTopicMastery("strong")!.pMastery
    );
    expect(idx.query("Gleiches Thema")[0]).toBe("weak");
  });

  it("bleibt ohne weighting in der ausgangsreihenfolge", () => {
    const unweightedDocs: IndexDoc[] = [
      { id: "strong", thema: "Gleiches Thema", sub: "", text: "Identischer Inhalt" },
      { id: "weak", thema: "Gleiches Thema", sub: "", text: "Identischer Inhalt" },
    ];
    expect(buildSearchIndex(unweightedDocs).query("Gleiches Thema")).toEqual(["strong", "weak"]);
  });

  it("gibt neueren notizen einen kleinen boost", () => {
    const now = new Date("2026-09-23T00:00:00Z").getTime();
    const idx = buildSearchIndex(
      [
        { id: "old", thema: "Gleiches Thema", sub: "", text: "Identischer Inhalt", datum: "2025-09-23" },
        { id: "new", thema: "Gleiches Thema", sub: "", text: "Identischer Inhalt", datum: "2026-09-23" },
      ],
      { rankingWeight: (doc) => getTopicRankingWeight(null, doc.datum, { now }) }
    );
    expect(idx.query("Gleiches Thema")[0]).toBe("new");
  });

  it("leerer index -> immer leer", () => {
    expect(buildSearchIndex([]).query("x")).toEqual([]);
  });
});
