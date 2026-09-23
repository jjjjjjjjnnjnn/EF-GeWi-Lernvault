import { describe, it, expect, beforeEach } from "vitest";
import {
  generateCCRHash,
  saveToCCR,
  retrieveFromCCR,
  getCCREntry,
  pruneCCR,
  clearCCR,
} from "./ccrStore";

describe("CCR Store (Compress-Cache-Retrieve)", () => {
  beforeEach(async () => {
    await clearCCR();
  });

  it("generates deterministic hashes based on content", () => {
    const text = "Art. 9 Abs. 3 GG Koalitionsfreiheit und Tarifautonomie";
    const h1 = generateCCRHash(text);
    const h2 = generateCCRHash(text);
    expect(h1).toMatch(/^h-[0-9a-f]{8}$/);
    expect(h1).toBe(h2);

    const diffHash = generateCCRHash(text + " Unterschied");
    expect(diffHash).not.toBe(h1);
  });

  it("saves and retrieves content losslessly by hash", async () => {
    const rawContent = `
    ## Soziale Ungleichheit
    - Bildungstrichter belegt Vererbung von Bildungschancen.
    - Armutsgefährdungsquote liegt bei ca. 16-17%.
    `;
    const hash = await saveToCCR(rawContent, { noteId: "sowi/ungl" });
    expect(hash).toBeDefined();

    const retrieved = await retrieveFromCCR(hash);
    expect(retrieved).toBe(rawContent);

    const entry = await getCCREntry(hash);
    expect(entry?.metadata?.noteId).toBe("sowi/ungl");
  });

  it("prunes expired entries based on TTL", async () => {
    const text = "Temporärer Zwischentext";
    const hash = await saveToCCR(text);

    // TTL = 1ms (已过期)
    const pruned = await pruneCCR(0);
    expect(pruned).toBe(1);

    const check = await retrieveFromCCR(hash);
    expect(check).toBeNull();
  });
});
