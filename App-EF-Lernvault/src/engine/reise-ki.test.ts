import { describe, expect, it } from "vitest";
import {
  buildCheckExplainPrompt,
  buildCheckScorePrompt,
  buildExplainPrompt,
  buildSzenarioScorePrompt,
  buildTryFeedbackPrompt,
  REISE_SYSTEM,
} from "./reise-ki";

describe("reise-ki prompts", () => {
  it("explain: schritt + kontext + sokratik-anweisung", () => {
    const msgs = buildExplainPrompt("SoWi", "Markt", "Entdecken", "Markt regelt.", "Kontext Wettbewerb");
    expect(msgs[0].content).toBe(REISE_SYSTEM);
    expect(msgs[1].content).toContain("Markt regelt.");
    expect(msgs[0].content).toContain("[Pfad#Zeile]");
    expect(msgs[1].content).toContain("Denkanstoß");
  });

  it("try-feedback: fellofish-format (2 staerken + korrektur + impuls)", () => {
    const msgs = buildTryFeedbackPrompt("T", "Aufgabe A", "Punkt1", "Meine Antwort hier.");
    expect(msgs[1].content).toContain("2 Stärken");
    expect(msgs[1].content).toContain("Satzgerüst");
    expect(msgs[1].content).toContain("Meine Antwort hier.");
  });

  it("check-erklaerung: warum + rueckverweis", () => {
    const msgs = buildCheckExplainPrompt("Frage?", "Antwort.", "T");
    expect(msgs[1].content).toContain("zurückgehen");
  });

  it("szenario-score: rubric-punkte + punkte + lehr-saetze", () => {
    const msgs = buildSzenarioScorePrompt("SoWi", "T", "Situation Mindestlohn.", ["These in Satz 1", "zwei Fachbegriffe"], "Mein Plädoyer ist gut.");
    expect(msgs[1].content).toContain("1. These in Satz 1");
    expect(msgs[1].content).toContain("Punkte 0-15");
    expect(msgs[1].content).toContain("Beispielsatz");
    expect(msgs[1].content).toContain("chinesische Zusammenfassung");
  });

  it("check-score: fellofish-vier Relevanz (punkte/fehler/korrektur/lehre)", () => {
    const msgs = buildCheckScorePrompt("Was ist Tarifautonomie?", "Löhne ohne Staat.", "Gewerkschaften machen Löhne.", "T");
    expect(msgs[0].content).toBe(REISE_SYSTEM);
    expect(msgs[1].content).toContain("PUNKTE");
    expect(msgs[1].content).toContain("FEHLERANALYSE");
    expect(msgs[1].content).toContain("KORREKTUR");
    expect(msgs[1].content).toContain("LEHRE");
    expect(msgs[1].content).toContain("Gewerkschaften machen Löhne.");
    expect(msgs[1].content).toContain("chinesische Zusammenfassung");
    expect(msgs[1].content).not.toMatch(/[★☆]/);
  });

  it("lange texte werden gedeckelt (kein prompt-sprengen)", () => {
    const long = "x".repeat(5000);
    const msgs = buildExplainPrompt("F", "T", "S", long, long);
    expect(msgs[1].content.length).toBeLessThan(4000);
  });
});
