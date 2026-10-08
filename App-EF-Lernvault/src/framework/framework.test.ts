import { describe, it, expect, beforeEach } from "vitest";
import {
  FachRegistry,
  importMarkdownNote,
  importCsvCards,
  importKnowledgePackage,
  exportToJsonPackage,
  exportNoteToMarkdown,
  exportCardsToAnkiCsv,
  KnowledgeRepository,
  type KnowledgeNote,
  type KnowledgeCard,
} from "./index";

describe("Framework - FachRegistry", () => {
  beforeEach(() => {
    FachRegistry.resetToDefaults();
  });

  it("should have all 10 canonical subjects pre-registered", () => {
    const subjects = FachRegistry.getAllSubjects();
    expect(subjects.length).toBe(10);
    expect(subjects.map((s) => s.id)).toEqual(
      expect.arrayContaining(["Deutsch", "Englisch", "Mathe", "Physik", "Chemie", "Bio", "Philosophie", "SoWi", "Musik", "Sport"])
    );
  });

  it("should find subject by id or short code case-insensitively", () => {
    const sowiById = FachRegistry.getSubject("sowi");
    expect(sowiById).toBeDefined();
    expect(sowiById?.kurz).toBe("SW");

    const sowiByKurz = FachRegistry.getSubject("sw");
    expect(sowiByKurz).toBeDefined();
    expect(sowiByKurz?.id).toBe("SoWi");
  });

  it("should allow registering a custom plugin and query it", () => {
    FachRegistry.registerSubject({
      id: "Informatik",
      kurz: "IF",
      nameDE: "Informatik",
      nameZH: "计算机科学",
      category: "mint",
      operators: ["implementieren", "modellieren", "analysieren"],
      isDefault: false,
      descriptionDE: "Algorithmen, Datenstrukturen und Automatentheorie.",
      descriptionZH: "算法、数据结构与自动机理论。",
    });

    const info = FachRegistry.getSubject("if");
    expect(info).toBeDefined();
    expect(info?.nameZH).toBe("计算机科学");

    const customs = FachRegistry.getCustomSubjects();
    expect(customs.length).toBe(1);
    expect(customs[0].id).toBe("Informatik");
  });
});

describe("Framework - Importer", () => {
  it("should import markdown with YAML frontmatter correctly", () => {
    const raw = `---
fach: SoWi
thema: "Soziale Ungleichheit"
operatoren: [darstellen, analysieren]
klausurrelevant: true
datum: 2026-10-08
tags: [EF, SoWi]
---

## 核心概念
Soziale Ungleichheit beschreibt ungleiche Ressourcenausstattung.
`;
    const note = importMarkdownNote("Soziale-Ungleichheit.md", raw, "SoWi");
    expect(note).toBeDefined();
    expect(note.fach).toBe("SoWi");
    expect(note.thema).toBe("Soziale Ungleichheit");
    expect(note.operatoren).toContain("darstellen");
    expect(note.blocks.length).toBeGreaterThan(0);
    expect(note.isCustom).toBe(true);
  });

  it("should import plain markdown without frontmatter using sensible defaults", () => {
    const raw = `## Dynamik und Kraft
Das zweite Newtonsche Axiom lautet F = m * a.
- Kraft in Newton
- Masse in Kilogramm
`;
    const note = importMarkdownNote("Dynamik.md", raw, "Physik");
    expect(note.fach).toBe("Physik");
    expect(note.thema).toBe("Dynamik");
    expect(note.blocks.length).toBeGreaterThanOrEqual(3);
  });

  it("should import Anki CSV cards", () => {
    const csvContent = `Front 1;Back 1;Beispiel 1;SoWi;Thema A\nFront 2;Back 2;;SoWi;Thema B`;
    const cards = importCsvCards("test.csv", csvContent, "SoWi");
    expect(cards.length).toBe(2);
    expect(cards[0].front).toBe("Front 1");
    expect(cards[0].back).toBe("Back 1");
    expect(cards[0].example).toBe("Beispiel 1");
    expect(cards[1].front).toBe("Front 2");
    expect(cards[1].isCustom).toBe(true);
  });

  it("should validate knowledge package json", () => {
    const invalidJson = JSON.stringify({ version: "wrong" });
    const result = importKnowledgePackage(invalidJson);
    expect(result.success).toBe(false);
    expect(result.errors.length).toBeGreaterThan(0);

    const validPackage = JSON.stringify({
      schemaVersion: 1,
      appVersion: "0.2.0",
      exportedAt: new Date().toISOString(),
      name: "Test Package",
      subjects: ["SoWi"],
      notes: [
        {
          id: "pkg-note-1",
          path: "SoWi/Test.md",
          fach: "SoWi",
          thema: "Test Thema",
          operatoren: ["darstellen"],
          klausurrelevant: true,
          datum: "2026-10-08",
          tags: ["EF"],
          blocks: [],
        },
      ],
      cards: [],
    });
    const validResult = importKnowledgePackage(validPackage);
    expect(validResult.success).toBe(true);
    expect(validResult.importedNotesCount).toBe(1);
  });
});

describe("Framework - Exporter", () => {
  const sampleNote: KnowledgeNote = {
    id: "sample-note-1",
    path: "custom/SoWi/Test.md",
    fach: "SoWi",
    thema: "BIP und Wohlstand",
    operatoren: ["darstellen", "beurteilen"],
    klausurrelevant: true,
    datum: "2026-10-08",
    tags: ["EF", "SoWi"],
    blocks: [
      { kind: "h2", text: "BIP Definition", lang: "de" },
      { kind: "p", text: "Das Bruttoinlandsprodukt misst den Wert aller Gueter.", lang: "de" },
      { kind: "li", text: "Kritik: Verteilung unberuecksichtigt", lang: "de" },
    ],
    isCustom: true,
  };

  const sampleCard: KnowledgeCard = {
    id: "sample-card-1",
    front: "BIP",
    back: "Bruttoinlandsprodukt",
    example: "Das reale BIP stieg um 1.2%.",
    fach: "SoWi",
    thema: "Wirtschaftspolitik",
    source: "custom",
    isCustom: true,
  };

  it("should export to json package with schemaVersion 1", () => {
    const pkg = exportToJsonPackage([sampleNote], [sampleCard], { name: "Wirtschafts-Paket" });
    expect(pkg.schemaVersion).toBe(1);
    expect(pkg.name).toBe("Wirtschafts-Paket");
    expect(pkg.notes.length).toBe(1);
    expect(pkg.cards.length).toBe(1);
    expect(pkg.subjects).toContain("SoWi");
  });

  it("should export note to markdown with valid frontmatter", () => {
    const md = exportNoteToMarkdown(sampleNote);
    expect(md).toContain("---");
    expect(md).toContain("fach: SoWi");
    expect(md).toContain('thema: "BIP und Wohlstand"');
    expect(md).toContain("## BIP Definition");
    expect(md).toContain("- Kritik: Verteilung unberuecksichtigt");
  });

  it("should export cards to semicolon-delimited Anki CSV", () => {
    const csv = exportCardsToAnkiCsv([sampleCard]);
    const lines = csv.trim().split("\n");
    expect(lines[0]).toBe("Deutsch;Chinesisch;Beispielsatz;Fach;Thema");
    expect(lines[1]).toBe("BIP;Bruttoinlandsprodukt;Das reale BIP stieg um 1.2%.;SoWi;Wirtschaftspolitik");
  });
});

describe("Framework - KnowledgeRepository", () => {
  let repo: KnowledgeRepository;

  beforeEach(() => {
    // Clear localStorage mock if available
    if (typeof localStorage !== "undefined") {
      localStorage.clear();
    }
    repo = new KnowledgeRepository();
    repo.resetCustomData();
  });

  it("should add, retrieve and delete custom notes", () => {
    const initialCount = repo.getAllNotes().length;
    const added = repo.addCustomNote({
      fach: "SoWi",
      thema: "Modell der sozialen Milieus",
      operatoren: ["analysieren"],
      contentZH: "Sinus-Milieus erfassen Wertorientierungen.",
      contentDE: "Sinus-Milieus gruppieren Menschen nach Lebensauffassung.",
      tags: ["Milieus"],
    });

    expect(added.id).toBeDefined();
    expect(added.thema).toBe("Modell der sozialen Milieus");
    expect(repo.getAllNotes().length).toBe(initialCount + 1);

    repo.updateCustomNote(added.id, { thema: "Sinus-Milieus 2026" });
    const found = repo.getAllNotes().find((n) => n.id === added.id);
    expect(found?.thema).toBe("Sinus-Milieus 2026");

    repo.deleteCustomNote(added.id);
    expect(repo.getAllNotes().length).toBe(initialCount);
  });

  it("should add, retrieve and delete custom cards", () => {
    const initialCardCount = repo.getAllCards().length;
    const addedCard = repo.addCustomCard({
      front: "Meritokratie",
      back: "Leistungsgesellschaft",
      example: "Status beruht auf individueller Leistung.",
      fach: "SoWi",
    });

    expect(addedCard.front).toBe("Meritokratie");
    expect(repo.getAllCards().length).toBe(initialCardCount + 1);

    repo.deleteCustomCard(addedCard.id);
    expect(repo.getAllCards().length).toBe(initialCardCount);
  });

  it("should notify subscribers when changes occur", () => {
    let triggered = 0;
    const unsubscribe = repo.subscribe(() => {
      triggered++;
    });

    repo.addCustomNote({ fach: "Philosophie", thema: "Utilitarismus" });
    expect(triggered).toBe(1);

    repo.addCustomCard({ front: "Hedonismus", back: "Lustprinzip", fach: "Philosophie" });
    expect(triggered).toBe(2);

    unsubscribe();
    repo.addCustomCard({ front: "Deontologie", back: "Pflichtethik", fach: "Philosophie" });
    expect(triggered).toBe(2); // no further triggers
  });

  it("should return consistent stats", () => {
    const stats = repo.getStats();
    expect(stats.totalNotes).toBeGreaterThan(0);
    expect(stats.presetNotes).toBeGreaterThan(0);
    expect(stats.userNotes).toBe(0);

    repo.addCustomNote({ fach: "Sport", thema: "Ausdauer" });
    const updatedStats = repo.getStats();
    expect(updatedStats.userNotes).toBe(1);
    expect(updatedStats.totalNotes).toBe(stats.totalNotes + 1);
  });
});
