import { describe, it, expect } from "vitest";
import { RRFSearchEngine, type HybridSearchDoc } from "./rrfSearch";

describe("RRFSearchEngine", () => {
  const docs: HybridSearchDoc[] = [
    {
      id: "doc-sowi-1",
      fach: "SoWi",
      thema: "Soziale Mobilität",
      text: "Bildungsmobilität und Chancengleichheit in Deutschland nach PISA.",
      tags: ["EF", "SoWi", "Gesellschaft"],
      operatoren: ["darstellen", "analysieren"],
      klausurrelevant: true,
      embedding: [1, 0, 0],
    },
    {
      id: "doc-sowi-2",
      fach: "SoWi",
      thema: "Tarifautonomie",
      text: "Art. 9 Abs. 3 GG schützt Koalitionsfreiheit und Tarifautonomie.",
      tags: ["EF", "SoWi", "Wirtschaft"],
      operatoren: ["darstellen", "beurteilen"],
      klausurrelevant: true,
      embedding: [0, 1, 0],
    },
    {
      id: "doc-philo-1",
      fach: "Philosophie",
      thema: "Kant Pflichtethik",
      text: "Kategorischer Imperativ und Autonomie des Willens.",
      tags: ["EF", "Philosophie", "Ethik"],
      operatoren: ["analysieren", "beurteilen"],
      klausurrelevant: false,
      embedding: [0, 0, 1],
    },
  ];

  it("fuses BM25 and Vector search results correctly", () => {
    const engine = new RRFSearchEngine();
    engine.build(docs);

    // Query matches "Soziale Mobilität" lexically and passes embedding matching doc-sowi-1
    const results = engine.search("Mobilität", [0.95, 0.05, 0]);

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("doc-sowi-1");
    expect(results[0].bm25Rank).toBeDefined();
    expect(results[0].vectorRank).toBeDefined();
    expect(results[0].score).toBeGreaterThan(0);
  });

  it("works gracefully when vector is absent (pure BM25 fallback)", () => {
    const engine = new RRFSearchEngine();
    engine.build(docs);

    const results = engine.search("Koalitionsfreiheit");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("doc-sowi-2");
    expect(results[0].vectorRank).toBeUndefined();
    expect(results[0].bm25Rank).toBe(1);
  });

  it("applies filters (fach, klausurrelevant, operatoren)", () => {
    const engine = new RRFSearchEngine();
    engine.build(docs);

    // Search query that hits doc-philo-1 and doc-sowi-2 with operator beurteilen
    const resFiltered = engine.search(
      "Imperativ Autonomie",
      undefined,
      { fach: "Philosophie", klausurrelevant: false }
    );
    expect(resFiltered.length).toBe(1);
    expect(resFiltered[0].id).toBe("doc-philo-1");

    // Filter by operator
    const resByOp = engine.search("Art. 9", undefined, { operatoren: ["beurteilen"] });
    expect(resByOp.length).toBe(1);
    expect(resByOp[0].id).toBe("doc-sowi-2");
  });

  it("returns empty when query is empty and no vector provided", () => {
    const engine = new RRFSearchEngine();
    engine.build(docs);
    expect(engine.search("")).toEqual([]);
  });
});
