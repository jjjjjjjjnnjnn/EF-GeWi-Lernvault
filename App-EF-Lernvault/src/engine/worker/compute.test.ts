import { describe, it, expect } from "vitest";
import { computeSemanticBatch, rankChunksBySimilarity } from "./compute";

describe("src/engine/worker/compute.ts - Asynchronous Batch Compute", () => {
  it("berechnet Semantik-Scoring asynchron ohne Fehler", async () => {
    const answer = "Dies ist eine erste valide Sachbehauptung. Dies ist eine zweite differenzierte Behauptung.";
    const chunkVecs = [
      [1, 0, 0],
      [0, 1, 0],
    ];

    const mockEmbedFn = async (texts: string[]) => {
      // Liefert Dummy-Vektoren
      return texts.map((_, i) => (i === 0 ? [1, 0, 0] : [0, 0, 1]));
    };

    const res = await computeSemanticBatch(answer, chunkVecs, mockEmbedFn, 0.5);
    expect(res.claims.length).toBe(2);
    expect(res.claims[0].backed).toBe(true);
    expect(res.claims[1].backed).toBe(false);
    expect(res.backed).toBe(false);
  });

  it("sortiert Chunks nach Vektorähnlichkeit absteigend", async () => {
    const query = [1, 0, 0];
    const entries = [
      { id: "c1", vec: [0, 1, 0] },     // score 0
      { id: "c2", vec: [0.9, 0.1, 0] }, // high score
      { id: "c3", vec: [0.5, 0.5, 0] }, // mid score
    ];

    const ranked = await rankChunksBySimilarity(query, entries, 2);
    expect(ranked.length).toBe(2);
    expect(ranked[0].id).toBe("c2");
    expect(ranked[1].id).toBe("c3");
  });
});
