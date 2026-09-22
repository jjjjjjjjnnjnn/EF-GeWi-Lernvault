import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  autoDispatchChat,
  applyQuickPreset,
  loadThinkingIntensity,
  saveThinkingIntensity,
  INTENSITY_PRESETS,
} from "./autoDispatch";
import * as streamClient from "./streamClient";
import type { VaultNote } from "../vault/parser";

describe("src/ai/autoDispatch.ts - Thinking Intensity & Failover Auto-Dispatch", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("verwaltet die Denkintensitätsstufen (fast, balanced, deep)", () => {
    expect(loadThinkingIntensity()).toBe("balanced");

    saveThinkingIntensity("deep");
    expect(loadThinkingIntensity()).toBe("deep");
    expect(INTENSITY_PRESETS.deep.maxTokens).toBeGreaterThan(INTENSITY_PRESETS.fast.maxTokens);
  });

  it("wendet Ein-Klick-Schnellkonfigurationen an", () => {
    const cfg = applyQuickPreset("local-fast");
    expect(cfg.baseUrl).toContain("1234");
    expect(loadThinkingIntensity()).toBe("fast");
  });

  it("leitet automatisch auf Vault-Synthese um, wenn das lokale Modell nicht erreichbar ist", async () => {
    // Simuliere Verbindungsabbruch von LM Studio
    vi.spyOn(streamClient, "chatStream").mockRejectedValue(new Error("Failed to fetch"));

    const mockNotes: VaultNote[] = [
      {
        id: "08_SoWi/Konsum-Wirtschaften.md",
        fach: "SoWi",
        thema: "Konsum & Wirtschaften",
        tags: ["EF", "SoWi"],
        datum: "2026-09-22",
        klausurrelevant: true,
        operatoren: ["darstellen"],
        path: "08_SoWi/Konsum-Wirtschaften.md",
        blocks: [
          {
            kind: "p",
            lang: "de",
            text: "Das Magische Sechseck beschreibt wirtschaftspolitische Zielkonflikte.",
          },
        ],
      },
    ];

    const deltas: string[] = [];
    const res = await autoDispatchChat(
      [{ role: "user", content: "Was ist das Magische Sechseck?" }],
      "Was ist das Magische Sechseck?",
      mockNotes,
      [],
      {
        onChunk: (c) => deltas.push(c.delta),
      }
    );

    expect(res.source).toBe("vault-autofallback");
    expect(res.reply).toContain("Magische Sechseck");
    expect(res.reply).toContain("Konsum-Wirtschaften.md#1");
    expect(deltas.length).toBeGreaterThan(0);
  });
});
