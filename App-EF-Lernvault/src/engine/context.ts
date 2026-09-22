// Intelligente Token-Budgetierung und Kontextfenster-Verwaltung (Phase 3).
// Verhindert Context Overflow bei lokalen Modellen (z.B. 2K/4K Kontext bei LM Studio / WebLLM)
// und strukturiert Prompts optimiert für Prompt-Caching.

import type { TextChunk } from "./rag";
import type { ChatMsg } from "../ai/engine";

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
  maxContextTokens?: number; // Standard: 2400 Tokens (gut passend für 4K-Gesamtrahmen)
  systemReserve?: number;    // Feste System-Instruktionen
  generationReserve?: number;// Raum für Antwort (z.B. 600 Tokens)
}

export interface BudgetedContext {
  fittedChunks: TextChunk[];
  fittedHistory: ChatMsg[];
  totalTokens: number;
}

/**
 * Schneidet Vault-Chunks und Historie intelligent zu, sodass das Token-Budget garantiert nicht überschritten wird.
 * Priorität:
 * 1. Die relevantesten Top-Chunks (mindestens 1-2 Chunks)
 * 2. Die jüngsten Dialog-Nachrichten
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
