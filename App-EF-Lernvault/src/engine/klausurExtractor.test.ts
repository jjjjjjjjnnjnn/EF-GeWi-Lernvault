import { describe, it, expect } from "vitest";
import { extractKlausurFromNote, evaluateKlausurLocally } from "./klausurExtractor";
import { parseBody, parseNoteFile } from "../vault/parser";
import { percentToNotenpunkte } from "../types/klausur";

describe("percentToNotenpunkte", () => {
  it("converts percentages to German Notenpunkte (0-15) according to KMK standard", () => {
    expect(percentToNotenpunkte(96).notenpunkte).toBe(15);
    expect(percentToNotenpunkte(90).notenpunkte).toBe(14);
    expect(percentToNotenpunkte(80).notenpunkte).toBe(12);
    expect(percentToNotenpunkte(65).notenpunkte).toBe(9);
    expect(percentToNotenpunkte(50).notenpunkte).toBe(6);
    expect(percentToNotenpunkte(40).notenpunkte).toBe(4); // schwach ausreichend
    expect(percentToNotenpunkte(20).notenpunkte).toBe(1);
    expect(percentToNotenpunkte(10).notenpunkte).toBe(0);
  });
});

describe("KlausurExtractor", () => {
  const sampleMarkdown = `---
fach: SoWi
thema: "Soziale Ungleichheit"
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-22
tags: [EF, SoWi, Ungleichheit]
---

# Soziale Ungleichheit

## 1. 中文讲一遍 (Feynman)
- 三维度：ökonomisch（收入/财富）、politisch（权力/话语）、sozial（学历/关系）。

## 2. 争议/辨析
### Pro
- Leistung muss sich lohnen (Davis-Moore).
### Contra
- Bildungstrichter zeigt ungleiche Startchancen.

## 3. 德语 Klausur-Sätze (用Operatoren)
- Darstellen: \`Soziale Ungleichheit bezeichnet die ungleiche Verteilung von Ressourcen.\`
- Analysieren: \`Der Bildungstrichter zeigt die Vererbung von Bildungschancen.\`
- Beurteilen: \`Nach dem Kriterium der Chancengerechtigkeit ist staatliche Umverteilung legitim.\`
`;

  it("extracts exam with material and 3 AFB steps from note markdown", () => {
    const exam = extractKlausurFromNote({
      path: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
      fach: "SoWi",
      thema: "Soziale Ungleichheit",
      content: sampleMarkdown,
    });

    expect(exam.thema).toBe("Soziale Ungleichheit");
    expect(exam.material.text).toContain("Davis-Moore");
    expect(exam.aufgaben).toHaveLength(3);

    expect(exam.aufgaben[0].afb).toBe("AFB I");
    expect(exam.aufgaben[0].operator).toBe("Darstellen");
    expect(exam.aufgaben[0].maxPoints).toBe(25);
    expect(exam.aufgaben[0].sampleSolution).toContain("Soziale Ungleichheit bezeichnet");

    expect(exam.aufgaben[1].afb).toBe("AFB II");
    expect(exam.aufgaben[1].operator).toBe("Analysieren");
    expect(exam.aufgaben[1].maxPoints).toBe(45);

    expect(exam.aufgaben[2].afb).toBe("AFB III");
    expect(exam.aufgaben[2].operator).toBe("Beurteilen");
    expect(exam.aufgaben[2].maxPoints).toBe(30);
  });

  it("extracts Pro/Contra material and operator sentences from stripped parser-block text", () => {
    const blocks = parseBody(`## 2. 争议/辨析
### Pro
- Leistung muss sich lohnen (Davis-Moore).
### Contra
- Bildungstrichter zeigt ungleiche Startchancen.
## 3. 德语 Klausur-Sätze (用Operatoren)
- Darstellen: \`Soziale Ungleichheit bezeichnet die ungleiche Verteilung von Ressourcen.\`
- Analysieren: \`Der Bildungstrichter zeigt die Vererbung von Bildungschancen.\`
- Beurteilen: \`Nach dem Kriterium der Chancengerechtigkeit ist staatliche Umverteilung legitim.\``);
    const strippedContent = blocks.map((block) => block.text).join("\n");

    const exam = extractKlausurFromNote({
      path: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
      fach: "SoWi",
      thema: "Soziale Ungleichheit",
      content: strippedContent,
    });

    expect(exam.material.text).toContain("Davis-Moore");
    expect(exam.material.text).toContain("Bildungstrichter");
    expect(exam.aufgaben[0].sampleSolution).toBe(
      "Soziale Ungleichheit bezeichnet die ungleiche Verteilung von Ressourcen."
    );
    expect(exam.aufgaben[1].sampleSolution).toBe(
      "Der Bildungstrichter zeigt die Vererbung von Bildungschancen."
    );
    expect(exam.aufgaben[2].sampleSolution).toBe(
      "Nach dem Kriterium der Chancengerechtigkeit ist staatliche Umverteilung legitim."
    );
  });

  it("retains non-empty Pro/Contra and operator criteria for stripped parser blocks", () => {
    const blocks = parseBody(`## 2. 争议/辨析
### Pro
- Chancengerechtigkeit stärkt gesellschaftliche Teilhabe.
### Contra
- Fördermaßnahmen können Fehlsteuerungen verstärken.
## 3. 德语 Klausur-Sätze
- Darstellen: Teilhabe bezeichnet die Möglichkeiten gesellschaftlicher Beteiligung.
- Analysieren: Förderung kann Hindernisse abbauen oder neue schaffen.
- Beurteilen: Wirksamkeit ist nach Zielgenauigkeit und Nebenfolgen zu prüfen.`);
    const exam = extractKlausurFromNote({
      path: "08_SoWi/Teilhabe.md",
      fach: "SoWi",
      thema: "Teilhabe",
      content: blocks.map((block) => block.text).join("\n"),
    });

    expect(exam.material.text).toContain("### Pro");
    expect(exam.material.text).toContain("### Contra");
    expect(exam.aufgaben[0].expectedPoints).toEqual([
      "Teilhabe bezeichnet die Möglichkeiten gesellschaftlicher Beteiligung.",
    ]);
    expect(exam.aufgaben[1].expectedPoints).toEqual([
      "Förderung kann Hindernisse abbauen oder neue schaffen.",
    ]);
    expect(exam.aufgaben[2].expectedPoints).toEqual([
      "Wirksamkeit ist nach Zielgenauigkeit und Nebenfolgen zu prüfen.",
    ]);
  });

  it("extracts a complete exam from the real VaultNote block shape", () => {
    const parsed = parseNoteFile(
      "08_SoWi/Teilhabe.md",
      `---
fach: SoWi
thema: Teilhabe
operatoren: [darstellen, analysieren, beurteilen]
klausurrelevant: true
datum: 2026-09-23
tags: [EF, SoWi]
---
## 2. 争议/辨析
### Pro
- Teilhabe stärkt gesellschaftliche Beteiligung.
### Contra
- Förderung kann neue Barrieren erzeugen.
## 3. Klausur-Sätze
- Darstellen: Teilhabe bezeichnet die Möglichkeiten gesellschaftlicher Beteiligung.
- Analysieren: Fördermaßnahmen können Hindernisse abbauen oder neu erzeugen.
- Beurteilen: Wirksamkeit ist anhand von Zielgenauigkeit und Nebenfolgen zu prüfen.`
    );
    expect(parsed).not.toBeNull();

    const exam = extractKlausurFromNote({
      path: parsed!.path,
      fach: parsed!.fach,
      thema: parsed!.thema,
      content: parsed!.blocks.map((block) => block.text).join("\n"),
      operatoren: parsed!.operatoren,
      klausurrelevant: parsed!.klausurrelevant,
    });

    expect(exam.material.text).toContain("gesellschaftliche Beteiligung");
    expect(exam.material.text).toContain("neue Barrieren");
    expect(exam.aufgaben[0].sampleSolution).toContain("gesellschaftlicher Beteiligung");
    expect(exam.aufgaben[1].sampleSolution).toContain("Hindernisse");
    expect(exam.aufgaben[2].sampleSolution).toContain("Nebenfolgen");
  });

  it("evaluates student response and generates EPA scores and Fehlerlog patches", () => {
    const exam = extractKlausurFromNote({
      path: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
      fach: "SoWi",
      thema: "Soziale Ungleichheit",
      content: sampleMarkdown,
    });

    const studentAnswers: [string, string, string] = [
      "Soziale Ungleichheit bezeichnet die ungleiche Verteilung von Ressourcen wie Einkommen und Bildung auf verschiedene soziale Gruppen in der Gesellschaft.",
      "Der Bildungstrichter belegt eindeutig, dass Arbeiterkinder seltener die Hochschule erreichen und soziale Herkunft maßgeblich bleibt.",
      "Nach dem Kriterium der Chancengerechtigkeit ist diese Vererbung von Chancen ungerecht, weswegen staatliche Umverteilung legitim ist.",
    ];

    const result = evaluateKlausurLocally(exam, studentAnswers);

    expect(result.totalPoints).toBeGreaterThan(60);
    expect(result.notenpunkte).toBeGreaterThanOrEqual(7);
    expect(result.afbScores).toHaveLength(3);
    expect(result.darstellungScore.points).toBeGreaterThan(10);
  });
});
