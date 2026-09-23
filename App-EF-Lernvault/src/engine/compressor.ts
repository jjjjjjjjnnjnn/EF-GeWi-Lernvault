// Intelligente Token- und Kontext-Kompression (Clean-Room-Implementierung).
// Inspiriert von den Architekturprinzipien von Headroom (Apache-2.0):
// 1. Lossless Tabular Schema Folding (SmartCrusher-Prinzip)
// 2. Extractive RAG Compression mit CCR (Compress-Cache-Retrieve) Verankerung
// 3. 5D Scoring für Dialoghistorie: Anchor 1, Rezenz, Fehlererhalt (100% Error Preservation)

import type { TextChunk } from "./rag";
import type { ChatMsg } from "../ai/engine";
import { estimateTokens } from "./context";
import { saveToCCR } from "../storage/ccrStore";

export interface CompressionResult<T> {
  compressed: T;
  originalTokens: number;
  compressedTokens: number;
  savedTokens: number;
  ratio: number;
  ccrRefs: Record<string, string>;
}

export interface StructuredCompressionResult {
  header: string[];
  rows: (string | number | boolean | null)[][];
  schemaString: string;
  originalTokens: number;
  compressedTokens: number;
  savedTokens: number;
  ratio: number;
}

/**
 * 1. Lossless Tabular Schema Folding (SmartCrusher-Prinzip)
 * Reduziert repetitive Schlüssel in JSON-Arrays auf ein einheitliches Schema mit Tabellenzeilen.
 */
export function compressStructuredData<T extends Record<string, unknown>>(
  records: T[]
): StructuredCompressionResult {
  if (!records || records.length === 0) {
    return {
      header: [],
      rows: [],
      schemaString: "",
      originalTokens: 0,
      compressedTokens: 0,
      savedTokens: 0,
      ratio: 1,
    };
  }

  // 1. Eindeutige Spaltenschlüssel sammeln
  const keySet = new Set<string>();
  for (const r of records) {
    for (const k of Object.keys(r)) {
      keySet.add(k);
    }
  }
  const header = Array.from(keySet);

  // 2. Zeilen als Werte-Arrays abbilden
  const rows: (string | number | boolean | null)[][] = records.map((r) =>
    header.map((k) => {
      const val = r[k];
      if (val === undefined || val === null) return null;
      if (typeof val === "object") return JSON.stringify(val);
      return val as string | number | boolean;
    })
  );

  // 3. Kompaktes Schema-Format erzeugen (Markdown-Tabelle)
  const headerLine = `| ${header.join(" | ")} |`;
  const sepLine = `| ${header.map(() => "---").join(" | ")} |`;
  const rowLines = rows.map(
    (row) => `| ${row.map((v) => (v === null ? "" : String(v))).join(" | ")} |`
  );
  const schemaString = [headerLine, sepLine, ...rowLines].join("\n");

  const originalJson = JSON.stringify(records, null, 2);
  const originalTokens = estimateTokens(originalJson);
  const compressedTokens = estimateTokens(schemaString);
  const savedTokens = Math.max(0, originalTokens - compressedTokens);
  const ratio = originalTokens > 0 ? Number((compressedTokens / originalTokens).toFixed(2)) : 1;

  return {
    header,
    rows,
    schemaString,
    originalTokens,
    compressedTokens,
    savedTokens,
    ratio,
  };
}

/** Signalwörter für Klausur-Kerninhalte & Definitionen */
const ESSENTIAL_LINE_REGEX =
  /(klausur-satz|klausursatz|definition|lehrsatz|fazit|merkregel|merke|zentral|wichtig:|operator|beispiel|::|\*\*)/i;

/**
 * 2. Extraktive RAG-Chunk-Kompression mit CCR-Referenzen
 * - Top-1 Chunk bleibt unangetastet (höchste Relevanz)
 * - Chunks 2+ werden extraktiv gestrafft (Klausursätze & Trefferzeilen)
 * - Das Original wird im CCR-Store hinterlegt und mit [Ref: #hash] verknüpft
 */
export async function compressRAGChunks(
  chunks: TextChunk[],
  query: string,
  targetBudgetTokens?: number
): Promise<CompressionResult<TextChunk[]>> {
  const originalTokens = chunks.reduce(
    (acc, c) => acc + estimateTokens(`[${c.id}]: ${c.thema} - ${c.text}`),
    0
  );

  if (chunks.length === 0) {
    return {
      compressed: [],
      originalTokens: 0,
      compressedTokens: 0,
      savedTokens: 0,
      ratio: 1,
      ccrRefs: {},
    };
  }

  const queryTerms = query
    .toLowerCase()
    .split(/[\s,.;:!?]+/)
    .filter((w) => w.length >= 3);

  const compressedChunks: TextChunk[] = [];
  const ccrRefs: Record<string, string> = {};
  let currentTokens = 0;

  for (let idx = 0; idx < chunks.length; idx++) {
    const chunk = chunks[idx];
    const chunkHeader = `[${chunk.id}]: ${chunk.thema} - `;

    // Top-1 Chunk wird stets vollständig beibehalten
    if (idx === 0) {
      compressedChunks.push(chunk);
      currentTokens += estimateTokens(chunkHeader + chunk.text);
      continue;
    }

    // Wenn Budget vorgegeben und bereits überschritten:
    if (targetBudgetTokens && currentTokens >= targetBudgetTokens) {
      break;
    }

    const lines = chunk.text.split("\n");
    const extractedLines: string[] = [];

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      const isHeading = line.startsWith("#");
      const isEssential = ESSENTIAL_LINE_REGEX.test(line);
      const matchesQuery = queryTerms.some((q) => line.toLowerCase().includes(q));

      if (isHeading || isEssential || matchesQuery) {
        extractedLines.push(rawLine);
      }
    }

    // Falls nichts extrahiert werden konnte, nimm die ersten 2 aussagekräftigen Zeilen
    if (extractedLines.length === 0) {
      const nonEmpty = lines.filter((l) => l.trim().length > 0);
      extractedLines.push(...nonEmpty.slice(0, 2));
    }

    const extractedText = extractedLines.join("\n");

    // Falls die Extraktion merklich kürzer ist als das Original (>20% Ersparnis):
    if (extractedText.length < chunk.text.length * 0.8) {
      const hash = await saveToCCR(chunk.text, {
        chunkId: chunk.id,
        thema: chunk.thema,
      });
      ccrRefs[hash] = chunk.id;

      const compressedText = `${extractedText}\n[Ref: #${hash}]`;
      const compressedChunk: TextChunk = {
        ...chunk,
        text: compressedText,
      };

      compressedChunks.push(compressedChunk);
      currentTokens += estimateTokens(chunkHeader + compressedText);
    } else {
      compressedChunks.push(chunk);
      currentTokens += estimateTokens(chunkHeader + chunk.text);
    }
  }

  const finalTokens = compressedChunks.reduce(
    (acc, c) => acc + estimateTokens(`[${c.id}]: ${c.thema} - ${c.text}`),
    0
  );
  const savedTokens = Math.max(0, originalTokens - finalTokens);
  const ratio = originalTokens > 0 ? Number((finalTokens / originalTokens).toFixed(2)) : 1;

  return {
    compressed: compressedChunks,
    originalTokens,
    compressedTokens: finalTokens,
    savedTokens,
    ratio,
    ccrRefs,
  };
}

/** Signalwörter für Fehler, Korrekturen und Notenabzug (100% Erhaltung nach 5D-Scoring) */
const ERROR_ANOMALY_REGEX =
  /(falsch|korrektur|fehler|nicht ganz|punktabzug|operator|defizit|missverst|ungena|note|错|纠正|批改|扣分|注意|不对)/i;

/**
 * 3. Dialoghistorie-Kompression (Headroom 5D-Prinzipien)
 * - Anchor 1: Turn 0 (Erste Nutzerfrage) bleibt erhalten
 * - Rezenz: Letzte 2 Nachrichten bleiben 100% erhalten
 * - Fehler & Korrekturen: Werden zu 100% unverändert bewahrt
 * - Mittlere Runden: Lange Assistentenantworten werden verdichtet und im CCR hinterlegt
 */
export async function compressDialogHistory(
  history: ChatMsg[],
  targetBudgetTokens?: number
): Promise<CompressionResult<ChatMsg[]>> {
  const originalTokens = history.reduce((acc, m) => acc + estimateTokens(m.content), 0);

  if (history.length <= 3 || (targetBudgetTokens && originalTokens <= targetBudgetTokens)) {
    return {
      compressed: history,
      originalTokens,
      compressedTokens: originalTokens,
      savedTokens: 0,
      ratio: 1,
      ccrRefs: {},
    };
  }

  const ccrRefs: Record<string, string> = {};
  const compressed: ChatMsg[] = [];
  const totalMsgs = history.length;

  for (let i = 0; i < totalMsgs; i++) {
    const msg = history[i];

    // 1. Anchor 1: Erste Nachricht (Themenanker) bleibt stets erhalten
    if (i === 0) {
      compressed.push(msg);
      continue;
    }

    // 2. Rezenz: Die letzten 2 Nachrichten bleiben stets unberührt
    if (i >= totalMsgs - 2) {
      compressed.push(msg);
      continue;
    }

    // 3. Fehler / Fehlkonzepte / Korrekturen: 100% Erhaltungsgarantie
    if (ERROR_ANOMALY_REGEX.test(msg.content)) {
      compressed.push(msg);
      continue;
    }

    // 4. Mittlere Assistenten-Antworten: Bei Bedarf verdichten
    if (msg.role === "assistant" && msg.content.length > 180) {
      const hash = await saveToCCR(msg.content, { role: "assistant", turnIndex: i });
      ccrRefs[hash] = `turn-${i}`;

      // Extrahiere Kernaussagen (Erste 2 Sätze)
      const sentences = msg.content
        .split(/(?<=[.!?。！？])\s+/)
        .map((s) => s.trim())
        .filter(Boolean);

      const coreExcerpt = sentences.slice(0, 2).join(" ");
      const compactedText = `${coreExcerpt} ... [Ref: #${hash}]`;

      compressed.push({
        role: "assistant",
        content: compactedText,
      });
    } else {
      compressed.push(msg);
    }
  }

  const compressedTokens = compressed.reduce((acc, m) => acc + estimateTokens(m.content), 0);
  const savedTokens = Math.max(0, originalTokens - compressedTokens);
  const ratio = originalTokens > 0 ? Number((compressedTokens / originalTokens).toFixed(2)) : 1;

  return {
    compressed,
    originalTokens,
    compressedTokens,
    savedTokens,
    ratio,
    ccrRefs,
  };
}
