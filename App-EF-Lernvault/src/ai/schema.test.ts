import { describe, it, expect } from "vitest";
import {
  parseKlausurEvaluation,
  buildKlausurJsonPrompt,
  buildVergleichJsonPrompt,
} from "./schema";

describe("src/ai/schema.ts - Klausur Evaluation Schema & Parser", () => {
  it("erkennt valides JSON im Markdown-Codeblock korrekt", () => {
    const raw = `Hier ist die Korrektur:
\`\`\`json
{
  "operatorVerfehlt": false,
  "fachbegriffFalsch": false,
  "belegFehlt": false,
  "vorgehenFalsch": false,
  "points": 14,
  "feedbackDE": "Vorbildliche Bearbeitung des Operators.",
  "feedbackZH": "完成出色。",
  "citation": "SoWi/Soziale-Ungleichheit.md#12"
}
\`\`\``;

    const res = parseKlausurEvaluation(raw, "fallback#1");
    expect(res.operatorVerfehlt).toBe(false);
    expect(res.fachbegriffFalsch).toBe(false);
    expect(res.belegFehlt).toBe(false);
    expect(res.vorgehenFalsch).toBe(false);
    expect(res.points).toBe(14);
    expect(res.feedbackDE).toContain("Vorbildliche Bearbeitung");
    expect(res.citation).toBe("SoWi/Soziale-Ungleichheit.md#12");
  });

  it("verhindert fatale falsch-positive Treffer bei Verneinungen ('Operator nicht verfehlt')", () => {
    const raw = `1. Operator: Der Operator wurde nicht verfehlt, sondern präzise analysiert.
2. Fachbegriffe: Alle Begriffe wurden korrekt verwendet.
3. Belege: Der Beleg fehlt nicht, sondern stützt die These [SoWi/Soziale-Mobilitaet.md#5].
4. Vorgehen: Das Vorgehen ist nicht falsch.
Punkte: 13/15.`;

    const res = parseKlausurEvaluation(raw, "fallback#1");
    expect(res.operatorVerfehlt).toBe(false);
    expect(res.fachbegriffFalsch).toBe(false);
    expect(res.belegFehlt).toBe(false);
    expect(res.vorgehenFalsch).toBe(false);
    expect(res.points).toBe(13);
    expect(res.citation).toBe("SoWi/Soziale-Mobilitaet.md#5");
  });

  it("erkennt tatsächliche Fehler sicher", () => {
    const raw = `Kritik:
- Der Operator wurde verfehlt (nur beschrieben statt analysiert).
- Ein Fachbegriff ist falsch definiert.
- Ein Beleg fehlt leider komplett.
- Das Vorgehen ist methodisch falsch.
Punkte: 5/15.`;

    const res = parseKlausurEvaluation(raw, "fallback#1");
    expect(res.operatorVerfehlt).toBe(true);
    expect(res.fachbegriffFalsch).toBe(true);
    expect(res.belegFehlt).toBe(true);
    expect(res.vorgehenFalsch).toBe(true);
    expect(res.points).toBe(5);
  });

  it("begrenzt Punkte auf das Intervall [0, 15]", () => {
    const rawHigh = `\`\`\`json
{ "operatorVerfehlt": false, "fachbegriffFalsch": false, "belegFehlt": false, "vorgehenFalsch": false, "points": 99 }
\`\`\``;
    expect(parseKlausurEvaluation(rawHigh, "fb#1").points).toBe(15);

    const rawLow = `\`\`\`json
{ "operatorVerfehlt": true, "fachbegriffFalsch": true, "belegFehlt": true, "vorgehenFalsch": true, "points": -5 }
\`\`\``;
    expect(parseKlausurEvaluation(rawLow, "fb#1").points).toBe(0);
  });

  it("Prompt-Builder enthalten die Schlüsselwörter und JSON-Struktur", () => {
    const p1 = buildKlausurJsonPrompt(
      "Soziale Ungleichheit",
      "Material 1 Text",
      "SoWi/Soziale-Ungleichheit.md",
      [{ promptDE: "Analysieren Sie..." }],
      ["Meine Antwort..."]
    );
    expect(p1).toContain("Soziale Ungleichheit");
    expect(p1).toContain("```json");
    expect(p1).toContain("operatorVerfehlt");

    const p2 = buildVergleichJsonPrompt(
      "SoWi",
      "Klassenmodell",
      "A",
      "B",
      "Weil...",
      "SoWi/Modell.md#3"
    );
    expect(p2).toContain("Option A");
    expect(p2).toContain("```json");
  });
});
