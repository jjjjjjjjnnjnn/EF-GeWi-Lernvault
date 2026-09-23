import { describe, expect, it } from "vitest";
import {
  buildContrastTask,
  buildDiscriminationTask,
  buildKlausurFehlerlogPatch,
  buildVergleichFehlerlogPatch,
  generateExtendedQuiz,
  generateQuizFromNote,
  getAvailableThemen,
  getVergleichItems,
  MOCK_VERGLEICH_ITEMS,
} from "./quizgen";
import type { VaultNote } from "./vault/parser";

const note = (over: Partial<VaultNote> = {}): VaultNote => ({
  id: "08_SoWi/t.md",
  path: "08_SoWi/t.md",
  fach: "SoWi",
  thema: "Testthema",
  operatoren: ["darstellen", "analysieren"],
  klausurrelevant: true,
  datum: "2026-09-01",
  tags: ["EF"],
  blocks: [
    { kind: "p", text: "这是中文。", lang: "zh" },
    { kind: "p", text: "Deutscher Materialsatz zum Thema.", lang: "de" },
  ],
  ...over,
});

describe("generateQuizFromNote", () => {
  it("AFB-dreifach mit sourceRef Zitierpflicht (#1/#2/#3)", () => {
    const q = generateQuizFromNote(note());
    expect(q.tasks.map((t) => t.operator)).toEqual(["darstellen", "analysieren", "beurteilen"]);
    expect(q.tasks.map((t) => t.afb)).toEqual(["AFB I", "AFB II", "AFB III"]);
    expect(q.tasks.map((t) => t.sourceRef)).toEqual(["08_SoWi/t.md#1", "08_SoWi/t.md#2", "08_SoWi/t.md#3"]);
    expect(q.materialQuote).toContain("Deutscher Materialsatz");
  });

  it("ohne de-block -> fallback-quote, nie leer", () => {
    const q = generateQuizFromNote(note({ blocks: [{ kind: "p", text: "只有中文。", lang: "zh" }] }));
    expect(q.materialQuote.length).toBeGreaterThan(0);
  });
});

describe("builder Zitierpflicht", () => {
  it("leere sourceRef wirft (discrimination + contrast)", () => {
    expect(() => buildDiscriminationTask("T", "A", "B", "")).toThrow(/sourceRef/);
    expect(() => buildDiscriminationTask("T", "A", "B", "   ")).toThrow(/sourceRef/);
    expect(() => buildContrastTask("T", "A", "B", "")).toThrow(/sourceRef/);
  });
});

describe("generateExtendedQuiz", () => {
  it("AFB triple bleibt [0..2], extras appenden mit #4/#5", () => {
    const q = generateExtendedQuiz(note(), {
      discrimination: { optionA: "A", optionB: "B" },
      contrast: { loesungA: "A", loesungB: "B" },
    });
    expect(q.tasks).toHaveLength(5);
    expect(q.tasks[3].kind).toBe("discrimination");
    expect(q.tasks[3].sourceRef).toBe("08_SoWi/t.md#4");
    expect(q.tasks[4].kind).toBe("contrast");
    expect(q.tasks[4].sourceRef).toBe("08_SoWi/t.md#5");
  });

  it("ohne opts -> nur triple", () => {
    expect(generateExtendedQuiz(note()).tasks).toHaveLength(3);
  });
});

describe("getVergleichItems", () => {
  it("null/leer -> MOCK fallback", () => {
    expect(getVergleichItems(null)).toBe(MOCK_VERGLEICH_ITEMS);
    expect(getVergleichItems([])).toBe(MOCK_VERGLEICH_ITEMS);
  });

  it("klausurrelevant bevorzugt, ids eindeutig, correctOption alterniert", () => {
    const items = getVergleichItems([
      note({ path: "08_SoWi/a.md", thema: "A" }),
      note({ path: "08_SoWi/b.md", thema: "B", klausurrelevant: false }),
      note({ path: "08_SoWi/c.md", thema: "C" }),
    ]);
    expect(items).toHaveLength(2); // nur klausurrelevante
    expect(new Set(items.map((i) => i.id)).size).toBe(2);
    expect(items[0].correctOption).toBe("B");
    expect(items[1].correctOption).toBe("A");
    for (const i of items) expect(i.sourceRef).toMatch(/\.md#4$/);
  });

  it("ohne klausurrelevante -> alle notes", () => {
    const items = getVergleichItems([note({ klausurrelevant: false })]);
    expect(items).toHaveLength(1);
  });
});

describe("Fehlerlog patch builders", () => {
  it("builds deterministic Klausur und Vergleich payloads once for copy and preview consumers", () => {
    const klausur = buildKlausurFehlerlogPatch({
      fach: "SoWi",
      thema: "Teilhabe",
      notePath: "08_SoWi/Teilhabe.md",
      date: "2026-09-23",
      time: "01:02",
      evaluations: [
        {
          operatorVerfehlt: true,
          fachbegriffFalsch: false,
          belegFehlt: true,
          vorgehenFalsch: false,
        },
        {
          operatorVerfehlt: false,
          fachbegriffFalsch: false,
          belegFehlt: false,
          vorgehenFalsch: false,
        },
      ],
    });

    expect(klausur).toContain("- Zeit: 01:02 (Ziel 45 Min)");
    expect(klausur).toContain(
      "Teil 1: Operator verfehlt, Teil 1: Beleg fehlt"
    );
    expect(klausur).toContain("08_SoWi/Teilhabe.md\n");

    const vergleich = buildVergleichFehlerlogPatch({
      fach: "SoWi",
      thema: "Teilhabe",
      sourceRef: "08_SoWi/Teilhabe.md#4",
      date: "2026-09-23",
      isCorrect: true,
      selectedOption: "A",
      justification: "  Gleicher Ausgang  ",
      nextTime: "  Operator präzisieren  ",
    });

    expect(vergleich).toContain("- Ergebnis: Richtig");
    expect(vergleich).toContain("- Gewählt: Option A");
    expect(vergleich).toContain("- Begründung: Gleicher Ausgang");
    expect(vergleich).toContain("- Nächstes Mal: Operator präzisieren");
  });
});

describe("getAvailableThemen", () => {
  it("filtert nicht-klausurrelevante", () => {
    const ts = getAvailableThemen([note(), note({ thema: "X", klausurrelevant: false })]);
    expect(ts.map((t) => t.thema)).toEqual(["Testthema"]);
  });

  it("null -> []", () => {
    expect(getAvailableThemen(null)).toEqual([]);
  });
});
