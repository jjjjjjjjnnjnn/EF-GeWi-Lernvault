import { describe, it, expect, beforeEach, vi } from "vitest";
import { executeChatWithRouting } from "./router";
import * as endpoints from "./endpoints";
import * as streamClient from "./streamClient";
import { getTokenSummary, clearTokenLedger } from "./tokenLedger";
import type { VaultNote } from "../vault/parser";
import type { TextChunk } from "../engine/rag";

describe("src/ai/router.ts - CC-Switch Style Intelligent Routing and Failover", () => {
  beforeEach(() => {
    localStorage.clear();
    clearTokenLedger();
    vi.restoreAllMocks();
  });

  const dummyNotes: VaultNote[] = [
    {
      id: "08_SoWi/Soziale-Ungleichheit.md",
      fach: "SoWi",
      thema: "Soziale Ungleichheit",
      klausurrelevant: true,
      operatoren: ["darstellen"],
      datum: "2026-09-23",
      tags: ["EF", "SoWi"],
      blocks: [{ kind: "p", lang: "de", text: "Ungleichheit beschreibt ungleiche Ressourcenverteilung." }],
      path: "08_SoWi/Soziale-Ungleichheit.md",
    },
  ];

  const dummyChunks: TextChunk[] = [
    {
      id: "08_SoWi/Soziale-Ungleichheit.md#1",
      path: "08_SoWi/Soziale-Ungleichheit.md",
      fach: "SoWi",
      thema: "Soziale Ungleichheit",
      operatoren: ["darstellen"],
      kind: "p",
      lang: "de",
      text: "Ungleichheit beschreibt ungleiche Ressourcenverteilung.",
    },
  ];

  it("executes primary route successfully and records tokens", async () => {
    vi.spyOn(streamClient, "chatStream").mockImplementation(async (_, opts) => {
      opts?.onUsage?.({
        promptTokens: 100,
        completionTokens: 40,
        totalTokens: 140,
      });
      return "Primäre Antwort vom Modell";
    });

    const res = await executeChatWithRouting(
      [{ role: "user", content: "Was ist soziale Ungleichheit?" }],
      "Was ist soziale Ungleichheit?",
      dummyNotes,
      dummyChunks,
      { savedTokensCCR: 25 }
    );

    expect(res.source).toBe("primary");
    expect(res.reply).toBe("Primäre Antwort vom Modell");

    const summary = getTokenSummary();
    expect(summary.allTimeTotal).toBe(140);
    expect(summary.savedTotalCCR).toBe(25);
  });

  it("fails over to secondary route when primary fails", async () => {
    // 设置活跃端点与备用端点
    endpoints.setActiveEndpointId("ep-lmstudio");
    endpoints.setFallbackEndpointId("ep-openrouter");

    let callCount = 0;
    vi.spyOn(streamClient, "chatStream").mockImplementation(async (_, opts) => {
      callCount++;
      if (opts?.endpoint?.id === "ep-lmstudio") {
        throw new Error("Connection refused on 1234");
      }
      opts?.onUsage?.({
        promptTokens: 80,
        completionTokens: 30,
        totalTokens: 110,
      });
      return "Antwort vom Fallback-Server";
    });

    let failoverNotice = "";
    const res = await executeChatWithRouting(
      [{ role: "user", content: "Test" }],
      "Test",
      dummyNotes,
      dummyChunks,
      {
        onFailover: (from, to) => {
          failoverNotice = `${from} -> ${to}`;
        }
      }
    );

    expect(callCount).toBe(2);
    expect(res.source).toBe("fallback");
    expect(res.reply).toBe("Antwort vom Fallback-Server");
    expect(failoverNotice).toContain("->");
  });

  it("gracefully falls back to vault native when all endpoints fail", async () => {
    vi.spyOn(streamClient, "chatStream").mockRejectedValue(new Error("Network completely down"));

    const res = await executeChatWithRouting(
      [{ role: "user", content: "Was ist soziale Ungleichheit?" }],
      "Was ist soziale Ungleichheit?",
      dummyNotes,
      dummyChunks
    );

    expect(res.source).toBe("vault-autofallback");
    expect(res.reply).toContain("Soziale Ungleichheit");
    expect(res.reply).toContain("08_SoWi/Soziale-Ungleichheit.md");
  });
});
