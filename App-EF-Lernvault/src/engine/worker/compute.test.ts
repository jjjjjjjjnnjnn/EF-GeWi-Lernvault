import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computeSemanticBatch, rankChunksBySimilarity } from "./compute";
import {
  computeSemanticBatchInWorker,
  rankChunksBySimilarityInWorker,
  type ComputeWorkerRequest,
} from "./compute.worker";

type WorkerResponse = { id: number; result: unknown };
let workers: TestWorker[] = [];

class TestWorker {
  onmessage: ((event: MessageEvent<WorkerResponse>) => void) | null = null;
  onerror: ((event: ErrorEvent) => void) | null = null;
  terminated = false;

  constructor(public url: URL | string, public options?: WorkerOptions) {
    workers.push(this);
  }

  postMessage(request: ComputeWorkerRequest) {
    const result = request.kind === "semantic"
      ? computeSemanticBatchInWorker(request.claims, request.claimVecs, request.chunkVecs, request.threshold)
      : rankChunksBySimilarityInWorker(request.queryVec, request.entries, request.topK);
    queueMicrotask(() => {
      this.onmessage?.({ data: { id: request.id, result } } as unknown as MessageEvent<WorkerResponse>);
    });
  }

  terminate() {
    this.terminated = true;
  }
}

beforeEach(() => {
  workers = [];
  vi.stubGlobal("Worker", TestWorker);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("src/engine/worker/compute.ts - Asynchronous Batch Compute", () => {
  it("berechnet Semantik-Scoring asynchron ohne Fehler", async () => {
    const answer = "Dies ist eine erste valide Sachbehauptung. Dies ist eine zweite differenzierte Behauptung.";
    const chunkVecs = [
      [1, 0, 0],
      [0, 1, 0],
    ];
    const mockEmbedFn = async (texts: string[]) => {
      return texts.map((_, i) => (i === 0 ? [1, 0, 0] : [0, 0, 1]));
    };

    const res = await computeSemanticBatch(answer, chunkVecs, mockEmbedFn, 0.5);
    expect(res.claims.length).toBe(2);
    expect(res.claims[0].backed).toBe(true);
    expect(res.claims[1].backed).toBe(false);
    expect(res.backed).toBe(false);
    expect(workers).toHaveLength(1);
  });

  it("sortiert Chunks nach Vektorähnlichkeit absteigend", async () => {
    const query = [1, 0, 0];
    const entries = [
      { id: "c1", vec: [0, 1, 0] },
      { id: "c2", vec: [0.9, 0.1, 0] },
      { id: "c3", vec: [0.5, 0.5, 0] },
    ];

    const ranked = await rankChunksBySimilarity(query, entries, 2);
    expect(ranked.length).toBe(2);
    expect(ranked[0].id).toBe("c2");
    expect(ranked[1].id).toBe("c3");
  });

  it("verwendet für die Berechnung einen echten Web Worker", async () => {
    await computeSemanticBatch(
      "Dies ist eine ausreichend lange Behauptung.",
      [[1, 0]],
      async () => [[1, 0]]
    );
    expect(workers[0]?.options?.type).toBe("module");
    expect(workers[0]?.terminated).toBe(true);
  });
});
