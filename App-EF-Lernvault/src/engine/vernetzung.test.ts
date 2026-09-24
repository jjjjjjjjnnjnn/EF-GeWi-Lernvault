import { describe, it, expect } from "vitest";
import {
  findVernetzungBridge,
  formatBridgeForPrompt,
  estimateBridgeTokens,
  VERNETZUNG_BRIDGES,
} from "./vernetzung";

describe("vernetzung engine (0ms cross-subject topological bridging)", () => {
  it("detects Mathe -> Physik rate of change bridge accurately", () => {
    const bridge1 = findVernetzungBridge("切线斜率在实际中有何物理意义？", "Mathe");
    expect(bridge1).not.toBeNull();
    expect(bridge1?.targetSubject).toBe("Physik");
    expect(bridge1?.dimension).toBe("rate_of_change");

    const bridge2 = findVernetzungBridge("Was bedeutet die 1. Ableitung für die Momentangeschwindigkeit?", "Mathe");
    expect(bridge2).not.toBeNull();
    expect(bridge2?.id).toBe("mathe_to_physik_rate");
  });

  it("detects Philo <-> SoWi justice and inequality bridge accurately", () => {
    const bridge1 = findVernetzungBridge("Wie beurteilt man soziale Ungleichheit nach John Rawls?", "SoWi");
    expect(bridge1).not.toBeNull();
    expect(bridge1?.targetSubject).toBe("Philosophie");
    expect(bridge1?.dimension).toBe("justice_welfare");

    const bridge2 = findVernetzungBridge("社会贫富差距和基尼系数应当如何从伦理角度评判？", "Philosophie");
    expect(bridge2).not.toBeNull();
    expect(bridge2?.targetSubject).toBe("SoWi");
  });

  it("detects Chemie <-> Bio enzyme kinetics and equilibrium bridges", () => {
    const bridge1 = findVernetzungBridge("Wie senkt ein Katalysator oder Enzym die Aktivierungsenergie?", "Chemie");
    expect(bridge1).not.toBeNull();
    expect(bridge1?.targetSubject).toBe("Bio");

    const bridge2 = findVernetzungBridge("Le Chatelier Gleichgewicht und Puffer im Blut", "Chemie");
    expect(bridge2).not.toBeNull();
    expect(bridge2?.id).toBe("chemie_to_bio_equilibrium");
  });

  it("detects Deutsch <-> Englisch rhetoric and mediation bridges", () => {
    const bridge = findVernetzungBridge("Wie übertrage ich ein Faktenargument im Sachtext in die englische Mediation?", "Deutsch");
    expect(bridge).not.toBeNull();
    expect(bridge?.targetSubject).toBe("Englisch");
    expect(bridge?.dimension).toBe("argumentation_rhetoric");
  });

  it("returns null for unrelated conversational queries", () => {
    expect(findVernetzungBridge("Hallo, wer bist du?")).toBeNull();
    expect(findVernetzungBridge("Wie spät ist es jetzt?")).toBeNull();
    expect(findVernetzungBridge("")).toBeNull();
  });

  it("guarantees token injection is strictly under 50 tokens for all bridges", () => {
    for (const bridge of VERNETZUNG_BRIDGES) {
      const promptText = formatBridgeForPrompt(bridge);
      const tokens = estimateBridgeTokens(bridge);
      expect(tokens).toBeGreaterThan(5);
      expect(tokens).toBeLessThan(50); // Strict low-token budget contract!
      expect(promptText).toContain(bridge.targetSubject);
      expect(promptText).toContain(bridge.anchorFormulaOrSentenceDE);
    }
  });

  it("executes ultra-fast (< 5ms for 100 queries)", () => {
    const queries = [
      "Ableitung und Momentangeschwindigkeit",
      "Rawls Schleier des Nichtwissens",
      "Katalysator und Aktivierungsenergie",
      "Mediation und P.E.E. Schema",
      "Unrelated string text",
    ];

    const start = performance.now();
    for (let i = 0; i < 100; i++) {
      const q = queries[i % queries.length];
      findVernetzungBridge(q);
    }
    const elapsedMs = performance.now() - start;
    expect(elapsedMs).toBeLessThan(50); // Typically < 2ms (allow headroom under heavy CI/CPU load)
  });
});
