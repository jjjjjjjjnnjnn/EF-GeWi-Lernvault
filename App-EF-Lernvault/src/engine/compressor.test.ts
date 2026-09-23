import { describe, it, expect, beforeEach } from "vitest";
import {
  compressStructuredData,
  compressRAGChunks,
  compressDialogHistory,
} from "./compressor";
import { clearCCR, retrieveFromCCR } from "../storage/ccrStore";
import type { TextChunk } from "./rag";
import type { ChatMsg } from "../ai/engine";

describe("src/engine/compressor.ts - Headroom-Inspired Token Compressor", () => {
  beforeEach(async () => {
    await clearCCR();
  });

  describe("compressStructuredData (SmartCrusher Lossless Tabular Fold)", () => {
    it("folds repetitive JSON objects into tabular schema and saves tokens", () => {
      const records = [
        { fach: "SoWi", thema: "Soziale Ungleichheit", relevance: "high", operator: "darstellen" },
        { fach: "SoWi", thema: "Wirtschaftspolitik", relevance: "high", operator: "analysieren" },
        { fach: "Philosophie", thema: "Erkenntnistheorie", relevance: "medium", operator: "erörtern" },
        { fach: "Deutsch", thema: "Kommunikation", relevance: "high", operator: "analysieren" },
      ];

      const res = compressStructuredData(records);
      expect(res.header).toEqual(["fach", "thema", "relevance", "operator"]);
      expect(res.rows.length).toBe(4);
      expect(res.schemaString).toContain("| fach | thema | relevance | operator |");
      expect(res.schemaString).toContain("| SoWi | Soziale Ungleichheit | high | darstellen |");
      expect(res.savedTokens).toBeGreaterThan(0);
      expect(res.ratio).toBeLessThan(1.0);
    });

    it("handles empty records gracefully", () => {
      const res = compressStructuredData([]);
      expect(res.header).toEqual([]);
      expect(res.rows).toEqual([]);
      expect(res.savedTokens).toBe(0);
      expect(res.ratio).toBe(1);
    });
  });

  describe("compressRAGChunks (Extractive RAG with CCR)", () => {
    it("preserves Top-1 chunk completely and extracts Klausur-Satz for subsequent chunks", async () => {
      const chunks: TextChunk[] = [
        {
          id: "sowi/ungl#1",
          path: "08_SoWi/Soziale-Ungleichheit.md",
          fach: "SoWi",
          thema: "Soziale Ungleichheit",
          operatoren: ["darstellen"],
          kind: "text",
          lang: "de",
          text: "Top-1 Chunk mit ausführlicher Einführung und Definition des Gini-Koeffizienten.",
        },
        {
          id: "sowi/bildung#1",
          path: "08_SoWi/Bildung.md",
          fach: "SoWi",
          thema: "Bildungschancen",
          operatoren: ["analysieren"],
          kind: "text",
          lang: "de",
          text: `
          Hier ist eine lange Einleitung, die viel Platz wegnimmt und für die Klausur irrelevant ist.
          Noch mehr Füllwörter und allgemeines Gerede über Schulformen in Deutschland im 20. Jahrhundert.
          Klausur-Satz: Der Bildungstrichter belegt die Schichtspezifik des Hochschulzugangs empirisch.
          Ein weiterer unwichtiger Absatz ohne Klausurrelevanz.
          `
        },
      ];

      const res = await compressRAGChunks(chunks, "Bildungstrichter");

      // Top 1 ist unverändert
      expect(res.compressed[0].text).toBe(chunks[0].text);

      // Chunk 2 ist extrahiert und enthält Klausursatz + CCR Ref
      const c2 = res.compressed[1];
      expect(c2.text).toContain("Klausur-Satz: Der Bildungstrichter belegt die Schichtspezifik");
      expect(c2.text).not.toContain("Hier ist eine lange Einleitung");
      expect(c2.text).toMatch(/\[Ref: #h-[0-9a-f]{8}\]/);

      // Originaltext ist im CCR abrufbar
      const hashMatch = c2.text.match(/\[Ref: #(h-[0-9a-f]{8})\]/);
      expect(hashMatch).not.toBeNull();
      const originalRecovered = await retrieveFromCCR(hashMatch![1]);
      expect(originalRecovered).toBe(chunks[1].text);

      expect(res.savedTokens).toBeGreaterThan(0);
    });
  });

  describe("compressDialogHistory (5D Scoring Principles)", () => {
    it("preserves Anchor 1, Recency, and 100% of error/correction turns", async () => {
      const history: ChatMsg[] = [
        // Turn 0: Anchor 1
        { role: "user", content: "Was bedeutet das Magische Sechseck in der Wirtschaftspolitik?" },
        // Turn 1: Lange Assistentenantwort (kann komprimiert werden)
        {
          role: "assistant",
          content: "Das Stabilitätsgesetz von 1967 definiert die vier ursprünglichen Ziele. Später kamen Umweltschutz und Verteilungsgerechtigkeit hinzu. Es gibt Zielharmonien wie Vollbeschäftigung und Wirtschaftswachstum, aber auch Zielkonflikte wie Inflation und Beschäftigung gemäß der Phillips-Kurve. Dies ist ein sehr langer Text mit vielen Beispielen und Erläuterungen."
        },
        // Turn 2: Nutzer macht Fehler
        { role: "user", content: "Ist Preisniveaustabilität erreicht, wenn die Inflation bei 10 Prozent liegt?" },
        // Turn 3: Assistent korrigiert Fehler (muss 100% erhalten bleiben!)
        {
          role: "assistant",
          content: "Das ist falsch! Laut EZB-Definition gilt Preisstabilität bei einer Inflationsrate von mittelfristig nahe, aber unter 2%. Bei 10% liegt eine schwere Korrektur-Notwendigkeit vor (Punktabzug bei Falschdarstellung)."
        },
        // Turn 4: Neueste Nutzerfrage (Rezenz - erhalten)
        { role: "user", content: "Und was ist mit Vollbeschäftigung?" },
        // Turn 5: Neueste Antwort (Rezenz - erhalten)
        { role: "assistant", content: "Vollbeschäftigung wird bei einer Arbeitslosenquote unter 3 Prozent angenommen." },
      ];

      const res = await compressDialogHistory(history);

      // 1. Anchor 1 bleibt unverändert
      expect(res.compressed[0].content).toBe(history[0].content);

      // 2. Turn 1 (langer Mittelteil ohne Fehler) wird komprimiert mit CCR-Ref
      expect(res.compressed[1].content).toContain("[Ref: #h-");
      expect(res.compressed[1].content.length).toBeLessThan(history[1].content.length);

      // 3. Turn 2 & Turn 3 (Fehler / Korrektur) müssen 100% erhalten bleiben
      expect(res.compressed[2].content).toBe(history[2].content);
      expect(res.compressed[3].content).toBe(history[3].content);
      expect(res.compressed[3].content).toContain("Das ist falsch!");

      // 4. Letzte 2 Nachrichten (Rezenz) bleiben 100% erhalten
      expect(res.compressed[4].content).toBe(history[4].content);
      expect(res.compressed[5].content).toBe(history[5].content);

      // 5. Ersparnis vorhanden
      expect(res.savedTokens).toBeGreaterThan(0);
    });
  });
});
