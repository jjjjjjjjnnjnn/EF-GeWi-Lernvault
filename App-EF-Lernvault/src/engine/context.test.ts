import { describe, it, expect } from "vitest";
import { estimateTokens, budgetContext } from "./context";
import type { TextChunk } from "./rag";
import type { ChatMsg } from "../ai/engine";

describe("src/engine/context.ts - Token Budgeting & Estimation", () => {
  it("schätzt Tokenanzahl für gemischte deutsche und chinesische Texte sinnvoll", () => {
    const german = "Dies ist ein einfacher Satz zur Prüfung."; // 40 Zeichen -> ~12 Tokens
    const zh = "这是一个测试句子"; // 8 CJK Zeichen -> 12 Tokens
    expect(estimateTokens(german)).toBeGreaterThan(8);
    expect(estimateTokens(german)).toBeLessThan(20);
    expect(estimateTokens(zh)).toBe(12);
  });

  it("schneidet Chunks und Dialoge innerhalb des Budgets ab", () => {
    const dummyChunks: TextChunk[] = Array.from({ length: 10 }, (_, i) => ({
      id: `note-${i}#1`,
      path: `note-${i}.md`,
      fach: "SoWi",
      thema: `Thema ${i}`,
      operatoren: ["darstellen"],
      kind: "text",
      lang: "de",
      text: "Ausführlicher Beispieltext für das Chunken mit einer gewissen Mindestlänge für Token.".repeat(3),
    }));

    const dummyHistory: ChatMsg[] = Array.from({ length: 10 }, (_, i) => ({
      role: i % 2 === 0 ? "user" : "assistant",
      content: `Nachricht ${i} mit weiterem Text zur Erzeugung von Token-Last.`,
    }));

    const budgeted = budgetContext(dummyChunks, dummyHistory, {
      maxContextTokens: 600,
      systemReserve: 100,
      generationReserve: 150,
    });

    // Content-Budget ist 600 - 150 - 100 = 350 Tokens.
    expect(budgeted.fittedChunks.length).toBeLessThan(10);
    expect(budgeted.fittedChunks.length).toBeGreaterThanOrEqual(1);
    expect(budgeted.fittedHistory.length).toBeLessThan(10);
    expect(budgeted.fittedHistory.length).toBeGreaterThanOrEqual(1);
    expect(budgeted.totalTokens).toBeLessThanOrEqual(600);
  });
});
