import { beforeEach, describe, expect, it, vi } from "vitest";

const tfState = vi.hoisted(() => ({ fail: false, calls: 0 }));

vi.mock("@huggingface/transformers", () => ({
  pipeline: async () => {
    if (tfState.fail) throw new Error("modell-download kaputt");
    const pipe = async (texts: string | string[]) => {
      tfState.calls++;
      const vec = (t: string) => ({ data: [t.length % 7, (t.length * 2) % 5, 1] });
      return Array.isArray(texts) ? texts.map(vec) : vec(texts);
    };
    return pipe;
  },
}));

import {
  clearVecCache,
  cosSim,
  embedViaApi,
  resetLocalEmbedder,
  retrieveHybrid,
  scoreClaimSupport,
  topByScore,
} from "./embed";
import type { TextChunk } from "./rag";

const AI_KEY = "eflernvault:ai:v1";
const chunk = (id: string, text: string): TextChunk => ({
  id, path: "08_SoWi/t.md", fach: "SoWi", thema: "T", operatoren: [], kind: "p", lang: "de", text,
});
const CHUNKS = [chunk("08_SoWi/t.md#1", "Der Staat regelt den Ausgleich."), chunk("08_SoWi/t.md#2", "Armut ist messbar."), chunk("08_SoWi/t.md#3", "这是中文。")];

function setAi(over: Record<string, unknown> = {}) {
  localStorage.setItem(
    AI_KEY,
    JSON.stringify({ version: 1, engine: "api", providerId: "openrouter", apiKey: "sk-test", model: "m", baseUrl: "", embedModel: "", ...over })
  );
}

beforeEach(() => {
  localStorage.clear();
  tfState.fail = false;
  tfState.calls = 0;
  resetLocalEmbedder();
  clearVecCache();
  setAi();
});

describe("mathe", () => {
  it("cosSim: identisch 1, orthogonal 0, nullvektor 0", () => {
    expect(cosSim([1, 0], [1, 0])).toBeCloseTo(1);
    expect(cosSim([1, 0], [0, 1])).toBeCloseTo(0);
    expect(cosSim([0, 0], [1, 1])).toBe(0);
  });

  it("topByScore: reihenfolge + stabil + clamp", () => {
    expect(topByScore([1, 2, 3], (x) => x, 2)).toEqual([3, 2]);
    expect(topByScore([2, 2, 1], (x) => x, 3)).toEqual([2, 2, 1]);
    expect(topByScore([1], (x) => x, 0)).toEqual([]);
  });

  it("scoreClaimSupport: max ueber chunks", () => {
    expect(scoreClaimSupport([1, 0], [[0, 1], [1, 0]])).toBeCloseTo(1);
    expect(scoreClaimSupport([1, 0], [])).toBe(0);
  });
});

describe("embedViaApi (L2)", () => {
  it("ohne embedModel -> throw (L2 aus)", async () => {
    await expect(embedViaApi(["x"])).rejects.toThrow(/embedModel/);
  });

  it("ok -> vektoren", async () => {
    setAi({ embedModel: "text-embedding-3-small" });
    const fetchFn = (async () => ({
      ok: true,
      json: async () => ({ data: [{ embedding: [0.1, 0.2] }, { embedding: [0.3, 0.4] }] }),
    })) as unknown as typeof fetch;
    expect(await embedViaApi(["a", "b"], fetchFn)).toEqual([[0.1, 0.2], [0.3, 0.4]]);
  });

  it("http-fehler / falsche form -> throw", async () => {
    setAi({ embedModel: "e" });
    const bad = (async () => ({ ok: false, status: 401 })) as unknown as typeof fetch;
    await expect(embedViaApi(["a"], bad)).rejects.toThrow(/401/);
    const shapeless = (async () => ({ ok: true, json: async () => ({ data: [{ nix: 1 }] }) })) as unknown as typeof fetch;
    await expect(embedViaApi(["a"], shapeless)).rejects.toThrow(/vektoren/);
  });
});

describe("retrieveHybrid", () => {
  it("vector off -> L0 (exakt, kein modell-kontakt)", async () => {
    const r = await retrieveHybrid(CHUNKS, "Staat", 8, { vector: "off" });
    expect(r.level).toBe("L0");
    expect(r.chunks.map((c) => c.id)).toEqual(["08_SoWi/t.md#1"]);
    expect(tfState.calls).toBe(0);
  });

  it("L1 mit gemockter pipeline -> level L1", async () => {
    const r = await retrieveHybrid(CHUNKS, "Staat Ausgleich", 2, { vector: "on" });
    expect(r.level).toBe("L1");
    expect(r.chunks.length).toBeLessThanOrEqual(2);
    expect(tfState.calls).toBeGreaterThan(0);
  });

  it("L1 kaputt -> leise L0-downgrade", async () => {
    tfState.fail = true;
    const r = await retrieveHybrid(CHUNKS, "Staat", 8, { vector: "on" });
    expect(r.level).toBe("L0");
    expect(r.chunks.map((c) => c.id)).toEqual(["08_SoWi/t.md#1"]);
  });

  it("vec-cache: zweite abfrage ohne re-embed", async () => {
    await retrieveHybrid(CHUNKS, "Staat", 3, { vector: "on" });
    const first = tfState.calls;
    await retrieveHybrid(CHUNKS, "Armut", 3, { vector: "on" });
    // nur query-vektor neu (1 call), chunks aus cache
    expect(tfState.calls).toBe(first + 1);
  });
});
