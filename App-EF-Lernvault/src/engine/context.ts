// Intelligente Token-Budgetierung und mehrzonige Kontextfenster-Verwaltung.
// Verhindert Context Overflow bei lokalen Modellen (z.B. LM Studio / WebLLM)
// und implementiert Headroom-inspirierte Hot/Warm/Live-Zonen für maximale KV-Cache-Treffer.

import type { TextChunk } from "./rag";
import { TUTOR_SYSTEM } from "./rag";
import type { ChatMsg } from "../ai/engine";
import { compressRAGChunks, compressDialogHistory } from "./compressor";

/**
 * Schätzt die Token-Anzahl für gemischten Text (Deutsch + Chinesisch + Code).
 * Für lateinische Schriftzeichen ca. 3.5 Zeichen pro Token, für CJK Zeichen ca. 1.5 Zeichen pro Token.
 */
export function estimateTokens(text: string): number {
  if (!text) return 0;
  let cjkCount = 0;
  let otherCount = 0;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    // CJK Unified Ideographs
    if (code >= 0x4e00 && code <= 0x9fff) {
      cjkCount++;
    } else {
      otherCount++;
    }
  }

  return Math.ceil(otherCount / 3.5 + cjkCount * 1.5);
}

export interface BudgetConfig {
  maxContextTokens?: number; // Standard: 2400-3000 Tokens
  systemReserve?: number;    // Feste System-Instruktionen
  generationReserve?: number;// Raum für Antwort (z.B. 600 Tokens)
}

export interface BudgetedContext {
  fittedChunks: TextChunk[];
  fittedHistory: ChatMsg[];
  totalTokens: number;
}

/**
 * Schneidet Vault-Chunks und Historie synchron zu, sodass das Token-Budget garantiert nicht überschritten wird.
 * (Bestehende synchrone Basisfunktion für Abwärtskompatibilität)
 */
export function budgetContext(
  chunks: TextChunk[],
  history: ChatMsg[],
  opts?: BudgetConfig
): BudgetedContext {
  const maxTotal = opts?.maxContextTokens ?? 2400;
  const genReserve = opts?.generationReserve ?? 600;
  const sysReserve = opts?.systemReserve ?? 300;

  const availableForContent = Math.max(100, maxTotal - genReserve - sysReserve);
  const chunkBudget = Math.floor(availableForContent * 0.6);
  const historyBudget = availableForContent - chunkBudget;

  // 1. Chunks einpassen (von oben nach unten entsprechend Relevanz)
  const fittedChunks: TextChunk[] = [];
  let chunkTokensUsed = 0;

  for (const c of chunks) {
    const chunkTokens = estimateTokens(`[${c.id}]: ${c.thema} - ${c.text}`);
    if (chunkTokensUsed + chunkTokens <= chunkBudget || fittedChunks.length === 0) {
      fittedChunks.push(c);
      chunkTokensUsed += chunkTokens;
    } else {
      break;
    }
  }

  // 2. Chat-Historie einpassen (rückwärts von den neuesten Nachrichten)
  const fittedHistory: ChatMsg[] = [];
  let historyTokensUsed = 0;

  for (let i = history.length - 1; i >= 0; i--) {
    const msg = history[i];
    const msgTokens = estimateTokens(msg.content);
    if (historyTokensUsed + msgTokens <= historyBudget || fittedHistory.length === 0) {
      fittedHistory.unshift(msg);
      historyTokensUsed += msgTokens;
    } else {
      break;
    }
  }

  return {
    fittedChunks,
    fittedHistory,
    totalTokens: chunkTokensUsed + historyTokensUsed + sysReserve,
  };
}

export interface OptimizedContextOptions extends BudgetConfig {
  query: string;
  intensityModifier?: string;
  enableCCR?: boolean;
}

export interface ContextStats {
  totalTokens: number;
  savedTokens: number;
  hotTokens: number;
  warmTokens: number;
  liveTokens: number;
  compressionRatio: number;
  ccrRefsCount: number;
}

export interface OptimizedContext {
  messages: ChatMsg[];
  compressedChunks: TextChunk[];
  stats: ContextStats;
}

/**
 * Headroom-inspirierter dreizoniger Kontext-Assembler:
 * 1. Hot-Zone (KV Cache hit): Byte-invariante TUTOR_SYSTEM Prompt-Basis
 * 2. Warm-Zone (Knowledge Grounding): Extraktiv verdichtete RAG-Chunks mit CCR-Hinterlegung
 * 3. Live-Zone (Dynamic Turns): 5D-optimierter Dialogverlauf + aktuelle Nutzeranfrage
 */
export async function assembleOptimizedContext(
  chunks: TextChunk[],
  rawHistory: ChatMsg[],
  opts: OptimizedContextOptions
): Promise<OptimizedContext> {
  const maxTotal = opts.maxContextTokens ?? 3000;
  const genReserve = opts.generationReserve ?? 600;
  const sysReserve = opts.systemReserve ?? 400;

  const availableTokens = Math.max(200, maxTotal - genReserve - sysReserve);
  const chunkBudget = Math.floor(availableTokens * 0.55);
  const historyBudget = availableTokens - chunkBudget;

  // 1. Hot-Zone: Unveränderlicher System-Prefix (für Provider-KV-Cache)
  const hotPrompt = TUTOR_SYSTEM;
  const hotTokens = estimateTokens(hotPrompt);

  // 2. Warm-Zone: RAG-Chunk Kompression & CCR-Verankerung
  const ragComp = await compressRAGChunks(chunks, opts.query, chunkBudget);
  const warmChunksText = ragComp.compressed
    .map((c) => `[${c.id}]: ${c.thema} (${c.fach}) - ${c.text}`)
    .join("\n");
  const warmTokens = estimateTokens(warmChunksText);

  const systemContent = [
    hotPrompt,
    "\n\nAktuell im Vault verfügbar:\n" + warmChunksText,
    opts.intensityModifier ? `\n\nModus-Vorgabe: ${opts.intensityModifier}` : "",
  ].join("");

  // 3. Live-Zone: Dialoghistorie (5D: Anchor 1, Fehlererhalt, Rezenz)
  const validHistory = rawHistory.filter((m) => m.content && m.content.trim().length > 0);
  const histComp = await compressDialogHistory(validHistory, historyBudget);

  const messages: ChatMsg[] = [
    { role: "system", content: systemContent },
    ...histComp.compressed,
    { role: "user", content: opts.query },
  ];

  const liveTokens = histComp.compressed.reduce((acc, m) => acc + estimateTokens(m.content), 0) +
    estimateTokens(opts.query);

  const totalTokens = estimateTokens(systemContent) + liveTokens;
  const totalSaved = ragComp.savedTokens + histComp.savedTokens;
  const originalTotal = totalTokens + totalSaved;
  const ratio = originalTotal > 0 ? Number((totalTokens / originalTotal).toFixed(2)) : 1;
  const ccrRefsCount = Object.keys(ragComp.ccrRefs).length + Object.keys(histComp.ccrRefs).length;

  return {
    messages,
    compressedChunks: ragComp.compressed,
    stats: {
      totalTokens,
      savedTokens: totalSaved,
      hotTokens,
      warmTokens,
      liveTokens,
      compressionRatio: ratio,
      ccrRefsCount,
    },
  };
}
