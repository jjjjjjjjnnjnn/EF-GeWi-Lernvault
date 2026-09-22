// Vektor-stufe (B1-L1/L2): kosinus-mathe (rein, testbar), L2-api-embeddings,
// L1-lokale embeddings (transformers.js, lazy, mobil default-aus), hybrid mit
// stillen downgrades L2 -> L1 -> L0. Tests mocken fetch + pipeline (kein
// modell-download in CI).
import { effectiveBaseUrl, getProvider, loadAiConfig } from "../ai/providers";
import { NeedsKeyError } from "../ai/engine";
import { retrieveL0, type TextChunk } from "./rag";

export type VectorLevel = "L2" | "L1" | "L0";

export interface HybridResult {
  chunks: TextChunk[];
  level: VectorLevel;
}

export const LOCAL_EMBED_MODEL = "Xenova/jina-embeddings-v2-base-de";

// ---------- reine mathe ----------

export function cosSim(a: number[], b: number[]): number {
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

export function topByScore<T>(items: T[], score: (t: T) => number, topK: number): T[] {
  return items
    .map((item, i) => ({ item, s: score(item), i }))
    .sort((x, y) => y.s - x.s || x.i - y.i)
    .slice(0, Math.max(0, topK))
    .map((x) => x.item);
}

/** Semantik-stufe des verifiers: max. aehnlichkeit einer behauptung zu chunks. */
export function scoreClaimSupport(claimVec: number[], chunkVecs: number[][]): number {
  let best = 0;
  for (const v of chunkVecs) best = Math.max(best, cosSim(claimVec, v));
  return best;
}

export interface ClaimReport {
  claim: string;
  support: number; // 0-1 (max-kosinus zu chunks)
  backed: boolean; // support >= schwelle
}

export interface SemanticReport {
  claims: ClaimReport[];
  backed: boolean; // alle claims backed (leere antwort = true)
}

/** Antwort -> saetze (claims); kurz-zeilen/gruesse fallen raus. */
export function splitClaims(answer: string): string[] {
  return answer
    .split(/[.!?。！？\n]+/)
    .map((s) => s.trim())
    .filter((s) => s.length >= 15 && !/^\[.*\]$/.test(s));
}

/**
 * Stage-2: jede behauptung gegen chunk-vektoren scoren.
 * embedFn injizierbar (tests ohne modell; runtime: embedLocal/embedViaApi).
 */
export async function verifySemantic(
  answer: string,
  chunkVecs: number[][],
  embedFn: (texts: string[]) => Promise<number[][]>,
  threshold = 0.5
): Promise<SemanticReport> {
  const claims = splitClaims(answer);
  if (claims.length === 0 || chunkVecs.length === 0) return { claims: [], backed: true };
  const vecs = await embedFn(claims);
  const out: ClaimReport[] = claims.map((claim, i) => {
    const support = scoreClaimSupport(vecs[i] ?? [], chunkVecs);
    return { claim, support, backed: support >= threshold };
  });
  return { claims: out, backed: out.every((c) => c.backed) };
}

// ---------- L2: api-embeddings (OpenAI-kompatibel) ----------

export async function embedViaApi(
  texts: string[],
  fetchFn: typeof fetch = fetch
): Promise<number[][]> {
  const cfg = loadAiConfig();
  const base = effectiveBaseUrl(cfg);
  const model = (cfg.embedModel || "").trim();
  if (!base || !model) throw new Error("embedModel fehlt — L2 nicht verfügbar");
  const preset = getProvider(cfg.providerId);
  if (preset.needsKey && !cfg.apiKey.trim()) throw new NeedsKeyError("API-Key fehlt");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cfg.apiKey.trim()) headers.Authorization = `Bearer ${cfg.apiKey.trim()}`;
  const res = await fetchFn(`${base.replace(/\/$/, "")}/embeddings`, {
    method: "POST",
    headers,
    body: JSON.stringify({ model, input: texts }),
  });
  if (!res.ok) throw new Error(`Embeddings HTTP ${res.status}`);
  const data = await res.json();
  const arr = data?.data;
  if (!Array.isArray(arr) || arr.some((d: unknown) => !Array.isArray((d as { embedding?: unknown }).embedding))) {
    throw new Error("Embeddings-antwort ohne vektoren");
  }
  return arr.map((d: { embedding: number[] }) => d.embedding);
}

// ---------- L1: lokal (transformers.js, lazy import, kein bundle-ballast) ----------

type EmbedPipe = (
  texts: string | string[],
  opts: { pooling: string; normalize: boolean }
) => Promise<{ data: number[] | Float32Array } | { data: number[] | Float32Array }[]>;

let localPipe: EmbedPipe | null = null;
let localPipeLoading: Promise<EmbedPipe> | null = null;

export function resetLocalEmbedder(): void {
  localPipe = null;
  localPipeLoading = null;
}

export async function ensureLocalEmbedder(
  onProgress?: (pct: number, text: string) => void
): Promise<EmbedPipe> {
  if (localPipe) return localPipe;
  if (localPipeLoading) return localPipeLoading;
  localPipeLoading = (async () => {
    const tf = await import("@huggingface/transformers");
    const pipe = (await tf.pipeline("feature-extraction", LOCAL_EMBED_MODEL, {
      dtype: "q8",
      progress_callback: (p: { progress?: number; status?: string }) => {
        if (typeof p?.progress === "number") onProgress?.(p.progress / 100, p.status ?? "");
      },
    })) as unknown as EmbedPipe;
    localPipe = pipe;
    return pipe;
  })();
  try {
    return await localPipeLoading;
  } finally {
    localPipeLoading = null;
  }
}

export async function embedLocal(
  texts: string[],
  onProgress?: (pct: number, text: string) => void
): Promise<number[][]> {
  const pipe = await ensureLocalEmbedder(onProgress);
  const out = await pipe(texts.length === 1 ? texts[0] : texts, { pooling: "mean", normalize: true });
  const arr = Array.isArray(out) ? out : [out];
  return arr.map((o) => Array.from(o.data as number[] | Float32Array));
}

// ---------- chunk-vektor cache (sitzung; text-hash invalidiert) ----------

function hashText(s: string): number {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return h;
}

const vecCache = new Map<string, { h: number; v: number[] }>();

export function clearVecCache(): void {
  vecCache.clear();
}

async function vecsFor(
  chunks: TextChunk[],
  embedFn: (texts: string[]) => Promise<number[][]>
): Promise<Map<string, number[]>> {
  const missing: TextChunk[] = [];
  const out = new Map<string, number[]>();
  for (const c of chunks) {
    const hit = vecCache.get(c.id);
    if (hit && hit.h === hashText(c.text)) {
      out.set(c.id, hit.v);
    } else {
      missing.push(c);
    }
  }
  if (missing.length > 0) {
    const vecs = await embedFn(missing.map((c) => c.text));
    missing.forEach((c, i) => {
      vecCache.set(c.id, { h: hashText(c.text), v: vecs[i] });
      out.set(c.id, vecs[i]);
    });
  }
  return out;
}

/** Chunk-vektoren zur stufe (fuer stage-2); wirft wenn embedder fehlt. */
export async function chunkVectors(
  chunks: TextChunk[],
  level: "L2" | "L1",
  onProgress?: (pct: number, text: string) => void
): Promise<Map<string, number[]>> {
  const fn = level === "L2" ? (t: string[]) => embedViaApi(t) : (t: string[]) => embedLocal(t, onProgress);
  return vecsFor(chunks, fn);
}

/** Claim-vektoren zur stufe (fuer stage-2). */
export async function claimVectors(
  claims: string[],
  level: "L2" | "L1",
  onProgress?: (pct: number, text: string) => void
): Promise<number[][]> {
  const fn = level === "L2" ? (t: string[]) => embedViaApi(t) : (t: string[]) => embedLocal(t, onProgress);
  return fn(claims);
}
/** Mobil (coarse pointer) default-aus: modell-download + wasm zu schwer. */
export function isCoarsePointer(): boolean {
  try {
    return typeof window !== "undefined" && window.matchMedia?.("(pointer: coarse)").matches === true;
  } catch {
    return false;
  }
}

export interface HybridOpts {
  /** auto: mobil aus, desktop an. on erzwingt (tests/manuel). */
  vector?: "auto" | "on" | "off";
  onProgress?: (pct: number, text: string) => void;
}

/** Hybrid: L2 (embedModel gesetzt) -> L1 (lokal) -> L0 (keyword). Fehler -> leise runter. */
export async function retrieveHybrid(
  chunks: TextChunk[],
  query: string,
  topK = 8,
  opts: HybridOpts = {}
): Promise<HybridResult> {
  const mode = opts.vector ?? "auto";
  const wantL1 = mode === "on" || (mode === "auto" && !isCoarsePointer());
  // L2 zuerst (cloud/online mit key)
  try {
    const cfg = loadAiConfig();
    if ((cfg.embedModel || "").trim()) {
      const [qv] = await embedViaApi([query]);
      const vecs = await vecsFor(chunks, (t) => embedViaApi(t));
      const ranked = topByScore(chunks, (c) => {
        const v = vecs.get(c.id);
        return v ? cosSim(qv, v) : -1;
      }, topK).filter((c) => vecs.has(c.id));
      if (ranked.length > 0) return { chunks: ranked, level: "L2" };
    }
  } catch {
    // leise weiter
  }
  // L1 lokal
  if (wantL1) {
    try {
      const [qv] = await embedLocal([query], opts.onProgress);
      const vecs = await vecsFor(chunks, (t) => embedLocal(t, opts.onProgress));
      const ranked = topByScore(chunks, (c) => {
        const v = vecs.get(c.id);
        return v ? cosSim(qv, v) : -1;
      }, topK).filter((c) => vecs.has(c.id));
      if (ranked.length > 0) return { chunks: ranked, level: "L1" };
    } catch {
      // leise weiter
    }
  }
  return { chunks: retrieveL0(chunks, query, topK), level: "L0" };
}
