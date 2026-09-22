import { describe, it, expect, beforeEach } from "vitest";
import {
  idbGetVector,
  idbSetManyVectors,
  idbGetManyVectors,
  idbClearVectors,
} from "./idb";

describe("src/storage/idb.ts - Persistent Vector Storage", () => {
  beforeEach(async () => {
    await idbClearVectors();
  });

  it("speichert und liest einen Vektor über die Schnittstelle", async () => {
    await idbSetManyVectors([
      { id: "note-1#1", h: 12345, v: [0.1, 0.2, 0.3] },
    ]);

    const res = await idbGetVector("note-1#1");
    expect(res).not.toBeNull();
    expect(res?.h).toBe(12345);
    expect(res?.v).toEqual([0.1, 0.2, 0.3]);
  });

  it("unterstützt Batch-Abfragen für mehrere Chunks", async () => {
    await idbSetManyVectors([
      { id: "chunk#1", h: 100, v: [0.5, 0.5] },
      { id: "chunk#2", h: 200, v: [0.9, 0.1] },
    ]);

    const batch = await idbGetManyVectors(["chunk#1", "chunk#2", "chunk#missing"]);
    expect(batch.size).toBe(2);
    expect(batch.get("chunk#1")?.h).toBe(100);
    expect(batch.get("chunk#2")?.v).toEqual([0.9, 0.1]);
    expect(batch.has("chunk#missing")).toBe(false);
  });

  it("leert den Cache zuverlässig bei clear", async () => {
    await idbSetManyVectors([
      { id: "chunk#1", h: 100, v: [0.5, 0.5] },
    ]);

    await idbClearVectors();
    const res = await idbGetVector("chunk#1");
    expect(res).toBeNull();
  });
});
