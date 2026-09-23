import { describe, it, expect, beforeEach } from "vitest";
import {
  loadTutorPedagogyMode,
  saveTutorPedagogyMode,
  buildPedagogyModeModifier,
  formatFehlerlogMarkdownRow,
  formatFehlerlogPatch,
  getFachFolderName,
  extractFehlerDraftFromMessage,
  type FehlerlogDraft,
} from "./socratic";

describe("socratic.ts - Didaktische Lehrmodi & Fehlerlog-Erfassung", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("lädt und speichert den Lehrmodus persistent", () => {
    expect(loadTutorPedagogyMode()).toBe("socratic"); // Standard

    saveTutorPedagogyMode("direct");
    expect(loadTutorPedagogyMode()).toBe("direct");

    saveTutorPedagogyMode("socratic");
    expect(loadTutorPedagogyMode()).toBe("socratic");
  });

  it("erzeugt differenzierte System-Modifier für Sokratisch vs. Klausur-Direkt", () => {
    const socraticMod = buildPedagogyModeModifier("socratic");
    expect(socraticMod).toContain("SOKRATISCH");
    expect(socraticMod).toContain("Leitfragen");
    expect(socraticMod).toContain("NICHT sofort die fertige Musterlösung");

    const directMod = buildPedagogyModeModifier("direct");
    expect(directMod).toContain("KLAUSUR-DIREKT");
    expect(directMod).toContain("Erwartungshorizont");
    expect(directMod).toContain("Muster-Klausursatz");
  });

  it("formatiert Markdown-Zeile für Fehlerlog.md streng tabellarisch", () => {
    const draft: FehlerlogDraft = {
      id: "err-1",
      datum: "2026-09-23",
      fach: "SoWi",
      thema: "Soziale Ungleichheit",
      fehlertyp: "Logik/Begründung",
      frage: "Warum ist Chancengleichheit nicht gleich Ergebnisgleichheit?",
      meinFehler: "Habe beides gleichgesetzt.",
      korrektur: "Chancengleichheit betrifft den Start, Ergebnisgleichheit den Ausgang.",
      klausursatz: "Chancengleichheit garantiert faire Startbedingungen, nivelliert jedoch nicht ungleiche Ergebnisse.",
    };

    const row = formatFehlerlogMarkdownRow(draft);
    expect(row).toBe(
      "| 2026-09-23 | Soziale Ungleichheit | Logik/Begründung | Habe beides gleichgesetzt. | Chancengleichheit betrifft den Start, Ergebnisgleichheit den Ausgang. — *Merksatz:* Chancengleichheit garantiert faire Startbedingungen, nivelliert jedoch nicht ungleiche Ergebnisse. |"
    );
  });

  it("erzeugt vollständigen Obsidian-Patch mit Metadaten und Pfad", () => {
    const draft: FehlerlogDraft = {
      id: "err-2",
      datum: "2026-09-23",
      fach: "Philosophie",
      thema: "Kategorischer Imperativ",
      fehlertyp: "Fachsprache/Ausdruck",
      frage: "Was besagt die Universalisierungsformel?",
      meinFehler: "Formel mit goldener Regel verwechselt.",
      korrektur: "Die Maxime muss zum allgemeinen Gesetz taugen, unabhängig von Neigung.",
      klausursatz: "Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde.",
    };

    const patch = formatFehlerlogPatch(draft);
    expect(patch).toContain("07_Philosophie/Klausur-Training/Fehlerlog.md");
    expect(patch).toContain("| Datum | Thema | Fehlertyp | Eigener Fehler / Fehlvorstellung | Korrektur & Klausursatz |");
    expect(patch).toContain("Kategorischer Imperativ");
  });

  it("mappt alle Fachnamen sauber auf das Vault-Verzeichnis", () => {
    expect(getFachFolderName("Deutsch")).toBe("01_Deutsch");
    expect(getFachFolderName("Englisch")).toBe("02_Englisch");
    expect(getFachFolderName("Mathe")).toBe("03_Mathe");
    expect(getFachFolderName("Physik")).toBe("04_Physik");
    expect(getFachFolderName("Chemie")).toBe("05_Chemie");
    expect(getFachFolderName("Bio")).toBe("06_Bio");
    expect(getFachFolderName("Philosophie")).toBe("07_Philosophie");
    expect(getFachFolderName("SoWi")).toBe("08_SoWi");
  });

  it("extrahiert treffsicher Fehlerlog-Entwürfe aus Q&A-Turns", () => {
    const q = "Erkläre den Unterschied zwischen Utilitarismus und Kants Pflichtethik im Trolley-Problem";
    const r = 'Im Gegensatz zum Utilitarismus lehnt Kant die Aufrechnung von Menschenleben ab. „Der Mensch darf niemals bloß als Mittel zum Zweck gebraucht werden.“';

    const draft = extractFehlerDraftFromMessage(q, r, "Philosophie");
    expect(draft.fach).toBe("Philosophie");
    expect(draft.thema).toContain("Trolley-Problem");
    expect(draft.klausursatz).toContain("Der Mensch darf niemals bloß als Mittel zum Zweck");
  });
});
