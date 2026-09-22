// 10ms Instant Grounding & Lokaler Antwort-Cache (Phase 5).
// 100% lokal: Erzeugt sofortige substantielle Inhaltsauszüge aus dem Notiz-Vault
// noch bevor das LLM das erste Token generiert (Zero-Perceived Latency).

import type { VaultNote } from "../vault/parser";
import type { InstantSnippet } from "../storage/tutorHistory";
import { findFallbackNote } from "./rag";

const qaCache = new Map<string, { reply: string; ts: number }>();
const MAX_CACHE_SIZE = 100;

function normalizeQuery(q: string): string {
  return q
    .toLowerCase()
    .replace(/[?!.,;:，。？！]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function findMatchingVaultNote(notes: VaultNote[], query: string): VaultNote | null {
  const match = findFallbackNote(notes, query);
  if (match) return match;

  const needle = query.toLowerCase();
  const words = needle.split(/\s+/).filter((w) => w.length >= 4);
  if (words.length === 0) return null;

  for (const n of notes) {
    for (const b of n.blocks) {
      const bText = b.text.toLowerCase();
      if (words.some((w) => bText.includes(w))) {
        return n;
      }
    }
  }
  return null;
}

/**
 * Holt in unter 5ms einen passenden Zitat- und Merksatzauszug aus dem Notizen-Vault.
 * Bietet dem Schüler sofortigen Leseerfolg während das LLM im Hintergrund den Stream vorbereitet.
 */
export function extractInstantSnippet(
  vaultNotes: VaultNote[],
  query: string
): InstantSnippet | null {
  if (!query || !query.trim() || !vaultNotes || vaultNotes.length === 0) return null;

  const match = findMatchingVaultNote(vaultNotes, query);
  if (!match) return null;

  let notePath = match.path || `${match.fach}/${match.thema}.md`;
  if (!notePath.includes("#")) {
    notePath = `${notePath}#1`;
  }

  // Ersten Textblock oder Definitionsblock finden
  const leadBlock =
    match.blocks.find((b) => b.kind === "p" || b.kind === "quote") || match.blocks[0];

  const rawExcerpt = leadBlock?.text || "Kernkonzept und Beleg aus dem Vault.";
  const cleanExcerpt =
    rawExcerpt.length > 220 ? `${rawExcerpt.slice(0, 215)}…` : rawExcerpt;

  return {
    notePath,
    thema: match.thema,
    excerpt: cleanExcerpt,
  };
}

/**
 * Sucht nach einer bereits zwischengespeicherten Antwort für wiederholte oder gleichartige Fragen.
 */
export function lookupQaCache(query: string): string | null {
  const norm = normalizeQuery(query);
  const hit = qaCache.get(norm);
  if (!hit) return null;
  // Cache gültig für 7 Tage
  if (Date.now() - hit.ts > 7 * 86400000) {
    qaCache.delete(norm);
    return null;
  }
  return hit.reply;
}

/**
 * Speichert eine verifizierte KI-Antwort im lokalen Speicher.
 */
export function saveQaCache(query: string, reply: string): void {
  if (!query.trim() || !reply.trim()) return;
  const norm = normalizeQuery(query);
  if (qaCache.size >= MAX_CACHE_SIZE) {
    // Ältesten Eintrag entfernen
    const oldestKey = qaCache.keys().next().value;
    if (oldestKey) qaCache.delete(oldestKey);
  }
  qaCache.set(norm, { reply, ts: Date.now() });
}

export function clearQaCache(): void {
  qaCache.clear();
}
