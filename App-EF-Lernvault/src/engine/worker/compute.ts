import { cosSim, scoreClaimSupport, type ClaimReport, splitClaims } from "../embed";
import type { BatchVerifyResponse, ComputeWorkerRequest } from "./compute.worker";

export type { BatchVerifyResponse } from "./compute.worker";

export interface BatchVerifyRequest {
  answer: string;
  chunkVecs: number[][];
  threshold?: number;
}

type WorkerPayload =
  | {
      kind: "semantic";
      claims: string[];
      claimVecs: number[][];
      chunkVecs: number[][];
      threshold: number;
    }
  | {
      kind: "rank";
      queryVec: number[];
      entries: { id: string; vec: number[] }[];
      topK: number;
    };

let nextWorkerId = 0;

function runWorker<T>(payload: WorkerPayload): Promise<T> {
  const worker = new Worker(new URL("./compute.worker.ts", import.meta.url), { type: "module" });
  const id = ++nextWorkerId;
  return new Promise<T>((resolve, reject) => {
    worker.onmessage = (event: MessageEvent<{ id: number; result: unknown }>) => {
      if (event.data.id !== id) return;
      worker.terminate();
      resolve(event.data.result as T);
    };
    worker.onerror = (event) => {
      worker.terminate();
      reject(new Error(event.message || "Worker-Rechenfehler"));
    };
    worker.postMessage({ ...payload, id } satisfies ComputeWorkerRequest);
  });
}

function computeSemanticBatchLocally(
  claims: string[],
  claimVecs: number[][],
  chunkVecs: number[][],
  threshold: number
): Promise<BatchVerifyResponse> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const reports: ClaimReport[] = [];
      for (let i = 0; i < claims.length; i++) {
        const claimVec = claimVecs[i] ?? [];
        const support = scoreClaimSupport(claimVec, chunkVecs);
        reports.push({ claim: claims[i], support, backed: support >= threshold });
      }
      resolve({ claims: reports, backed: reports.every((report) => report.backed) });
    }, 0);
  });
}

function rankChunksBySimilarityLocally(
  queryVec: number[],
  chunkEntries: { id: string; vec: number[] }[],
  topK: number
): Promise<{ id: string; score: number }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const scored = chunkEntries.map((entry) => ({
        id: entry.id,
        score: cosSim(queryVec, entry.vec),
      }));
      scored.sort((a, b) => b.score - a.score);
      resolve(scored.slice(0, Math.max(1, topK)));
    }, 0);
  });
}

export async function computeSemanticBatch(
  answer: string,
  chunkVecs: number[][],
  embedFn: (texts: string[]) => Promise<number[][]>,
  threshold = 0.5
): Promise<BatchVerifyResponse> {
  const claims = splitClaims(answer);
  if (claims.length === 0 || chunkVecs.length === 0) {
    return { claims: [], backed: true };
  }

  const claimVecs = await embedFn(claims);
  if (typeof Worker === "undefined") {
    return computeSemanticBatchLocally(claims, claimVecs, chunkVecs, threshold);
  }
  return runWorker<BatchVerifyResponse>({
    kind: "semantic",
    claims,
    claimVecs,
    chunkVecs,
    threshold,
  });
}

export async function rankChunksBySimilarity(
  queryVec: number[],
  chunkEntries: { id: string; vec: number[] }[],
  topK = 8
): Promise<{ id: string; score: number }[]> {
  if (typeof Worker === "undefined") {
    return rankChunksBySimilarityLocally(queryVec, chunkEntries, topK);
  }
  return runWorker({ kind: "rank", queryVec, entries: chunkEntries, topK });
}
