import { describe, it, expect, beforeEach } from "vitest";
import {
  extractInstantSnippet,
  lookupQaCache,
  saveQaCache,
  clearQaCache,
} from "./instantGrounding";
import type { VaultNote } from "../vault/parser";

describe("src/engine/instantGrounding.ts - Instant Snippet & QA Cache", () => {
  const mockNotes: VaultNote[] = [
    {
      id: "08_SoWi/Soziale-Ungleichheit.md",
      fach: "SoWi",
      thema: "Soziale Ungleichheit",
      tags: ["EF", "SoWi", "Ungleichheit"],
      datum: "2026-09-22",
      klausurrelevant: true,
      operatoren: ["analysieren"],
      path: "08_SoWi/Soziale-Ungleichheit.md",
      blocks: [
        {
          kind: "p",
          lang: "de",
          text: "Soziale Ungleichheit bezeichnet ungleiche Lebensbedingungen.",
        },
      ],
    },
  ];

  beforeEach(() => {
    clearQaCache();
  });

  it("liefert in wenigen Millisekunden ein passendes Vault-Snippet", () => {
    const start = performance.now();
    const snippet = extractInstantSnippet(mockNotes, "Was bedeutet soziale Ungleichheit?");
    const elapsed = performance.now() - start;

    expect(elapsed).toBeLessThan(15);
    expect(snippet).not.toBeNull();
    expect(snippet?.thema).toBe("Soziale Ungleichheit");
    expect(snippet?.notePath).toContain("Soziale-Ungleichheit.md#1");
    expect(snippet?.excerpt).toContain("ungleiche Lebensbedingungen");
  });

  it("liefert null bei unpassenden Fragen ohne Treffer", () => {
    const snippet = extractInstantSnippet(mockNotes, "Etwas völlig Fremdes wie Quantenphysik");
    expect(snippet).toBeNull();
  });

  it("speichert und liest Antworten im QA-Cache nach Normalisierung", () => {
    saveQaCache("Was ist soziale Ungleichheit?", "Antwort A");
    // Unterschiedliche Interpunktion und Groß/Kleinschreibung
    const hit = lookupQaCache("was ist soziale ungleichheit!");
    expect(hit).toBe("Antwort A");
  });
});
