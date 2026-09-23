import type { ClaimReport } from "../embed";

export interface BatchVerifyResponse {
  claims: ClaimReport[];
  backed: boolean;
}

export type ComputeWorkerRequest =
  | {
      id: number;
      kind: "semantic";
      claims: string[];
      claimVecs: number[][];
      chunkVecs: number[][];
      threshold: number;
    }
  | {
      id: number;
      kind: "rank";
      queryVec: number[];
      entries: { id: string; vec: number[] }[];
      topK: number;
    };

export type ComputeWorkerResponse = {
  id: number;
  result: BatchVerifyResponse | { id: string; score: number }[];
};

function cosSim(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  if (na === 0 || nb === 0) return 0;
  return dot / (Math.sqrt(na) * Math.sqrt(nb));
}

export function computeSemanticBatchInWorker(
  claims: string[],
  claimVecs: number[][],
  chunkVecs: number[][],
  threshold: number
): BatchVerifyResponse {
  const reports: ClaimReport[] = claims.map((claim, i) => {
    const claimVec = claimVecs[i] ?? [];
    let support = 0;
    for (const chunkVec of chunkVecs) support = Math.max(support, cosSim(claimVec, chunkVec));
    return { claim, support, backed: support >= threshold };
  });
  return { claims: reports, backed: reports.every((report) => report.backed) };
}

export function rankChunksBySimilarityInWorker(
  queryVec: number[],
  chunkEntries: { id: string; vec: number[] }[],
  topK: number
): { id: string; score: number }[] {
  const scored = chunkEntries.map((entry) => ({
    id: entry.id,
    score: cosSim(queryVec, entry.vec),
  }));
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, Math.max(1, topK));
}

type WorkerScope = {
  onmessage: ((event: MessageEvent<ComputeWorkerRequest>) => void) | null;
  postMessage: (message: ComputeWorkerResponse) => void;
};

const workerScope = globalThis as unknown as WorkerScope;

workerScope.onmessage = (event) => {
  const request = event.data;
  const result = request.kind === "semantic"
    ? computeSemanticBatchInWorker(request.claims, request.claimVecs, request.chunkVecs, request.threshold)
    : rankChunksBySimilarityInWorker(request.queryVec, request.entries, request.topK);
  workerScope.postMessage({ id: request.id, result });
};
