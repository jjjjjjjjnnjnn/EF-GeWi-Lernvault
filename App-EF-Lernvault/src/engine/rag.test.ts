import { describe, expect, it } from "vitest";
import {
  buildKlausurPrompt,
  buildTutorSystem,
  buildVergleichPrompt,
  chunkNote,
  chunkNotes,
  findFallbackNote,
  KORREKTOR_SYSTEM,
  parseRubricFlags,
  retrieveL0,
  TUTOR_SYSTEM,
  verifySupport,
  type TextChunk,
} from "./rag";
import type { VaultNote } from "../vault/parser";

const note = (over: Partial<VaultNote> = {}): VaultNote => ({
  id: "08_SoWi/t.md",
  path: "08_SoWi/t.md",
  fach: "SoWi",
  thema: "Testthema",
  operatoren: ["darstellen"],
  klausurrelevant: true,
  datum: "2026-09-01",
  tags: ["EF", "Staat"],
  blocks: [
    { kind: "h2", text: "Armut und Reichtum", lang: "de" },
    { kind: "p", text: "这是中文解释。", lang: "zh" },
    { kind: "p", text: "Der Staat regelt den Ausgleich.", lang: "de" },
  ],
  ...over,
});

describe("chunkNote", () => {
  it("ein chunk pro block, id = path#zeile (1-basiert), meta vererbt", () => {
    const cs = chunkNote(note());
    expect(cs.map((c) => c.id)).toEqual(["08_SoWi/t.md#1", "08_SoWi/t.md#2", "08_SoWi/t.md#3"]);
    expect(cs[0]).toMatchObject({ fach: "SoWi", thema: "Testthema", kind: "h2", lang: "de" });
    expect(cs[1].lang).toBe("zh");
  });

  it("pfad-fallback fach/thema.md", () => {
    const cs = chunkNote(note({ path: "" }));
    expect(cs[0].id).toBe("SoWi/Testthema.md#1");
  });

  it("chunkNotes flacht mehrere notizen ab", () => {
    expect(chunkNotes([note(), note({ path: "x.md", thema: "Z" })])).toHaveLength(6);
  });
});

describe("retrieveL0", () => {
  const chunks = chunkNotes([note(), note({ path: "08_SoWi/a.md", thema: "Armut", blocks: [{ kind: "p", text: "Armut ist messbar.", lang: "de" }] })]);

  it("leere query -> erste topK in reihenfolge", () => {
    expect(retrieveL0(chunks, "  ", 2)).toHaveLength(2);
  });

  it("exakte treffer, topK schneidet ab", () => {
    const r = retrieveL0(chunks, "Staat", 10);
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((c) => c.id.startsWith("08_SoWi/t.md"))).toBe(true);
    expect(retrieveL0(chunks, "Staat", 1)).toHaveLength(1);
  });

  it("fuzzy tippfehler findet trotzdem", () => {
    expect(retrieveL0(chunks, "Reichtuum", 10).length).toBeGreaterThan(0);
  });

  it("ohne treffer -> leer, nie null", () => {
    expect(retrieveL0(chunks, "XYZQ", 8)).toEqual([]);
  });
});

describe("tutor-bau", () => {
  it("system enthaelt pflicht + chunk-refs", () => {
    const s = buildTutorSystem(chunkNote(note()).slice(0, 2));
    expect(s.startsWith(TUTOR_SYSTEM)).toBe(true);
    expect(s).toContain("[08_SoWi/t.md#1]");
    expect(s).toContain("[08_SoWi/t.md#2]");
  });

  it("findFallbackNote: thema/tags/fach (null wenn nichts)", () => {
    expect(findFallbackNote([note()], "was ist testthema?")?.thema).toBe("Testthema");
    expect(findFallbackNote([note()], "frage zum staat")?.thema).toBe("Testthema"); // tag
    expect(findFallbackNote([note()], "sowi frage")?.thema).toBe("Testthema"); // fach
    expect(findFallbackNote([note()], "mathe integral")).toBeNull();
  });
});

describe("korrektor-bau", () => {
  it("klausur-prompt: leere antwort markiert, zitierpflicht drin", () => {
    const p = buildKlausurPrompt("T", "Quote", "08_SoWi/t.md", [{ promptDE: "P1" }, { kind: "contrast", promptDE: "P2" }], ["Antwort"]);
    expect(p).toContain("(keine Antwort eingegeben)");
    expect(p).toContain("[08_SoWi/t.md#Zeile]");
    expect(p).toContain("0-15");
  });

  it("vergleich-prompt: quelle exakt", () => {
    const p = buildVergleichPrompt("SoWi", "T", "A", "B", "weil", "08_SoWi/t.md#4");
    expect(p).toContain("[08_SoWi/t.md#4]");
    expect(p).toContain("korrekt: Option B");
  });

  it("system-konstante stabil", () => {
    expect(KORREKTOR_SYSTEM).toContain("[Pfad#Zeile]");
  });

  it("parseRubricFlags: 4 regeln", () => {
    expect(parseRubricFlags("Operator verfehlt, Fachbegriff falsch. Beleg fehlt! Vorgehen falsch.")).toEqual({
      operatorVerfehlt: true,
      fachbegriffFalsch: true,
      belegFehlt: true,
      vorgehenFalsch: true,
    });
    expect(parseRubricFlags("Alles in Ordnung, gut belegt.")).toEqual({
      operatorVerfehlt: false,
      fachbegriffFalsch: false,
      belegFehlt: false,
      vorgehenFalsch: false,
    });
  });
});

describe("verifySupport", () => {
  const chunks: TextChunk[] = [
    { id: "08_SoWi/t.md#1", path: "08_SoWi/t.md", fach: "SoWi", thema: "T", operatoren: [], kind: "p", lang: "de", text: "x" },
    { id: "08_SoWi/t.md#3", path: "08_SoWi/t.md", fach: "SoWi", thema: "T", operatoren: [], kind: "p", lang: "de", text: "y" },
  ];

  it("alle refs vorhanden -> supported", () => {
    const r = verifySupport("Siehe [08_SoWi/t.md#1] und [08_SoWi/t.md#3].", chunks);
    expect(r).toEqual({ supported: true, refs: ["08_SoWi/t.md#1", "08_SoWi/t.md#3"], missing: [] });
  });

  it("fremde ref -> missing (unsicher-signal)", () => {
    const r = verifySupport("Siehe [08_SoWi/fremd.md#9].", chunks);
    expect(r.supported).toBe(false);
    expect(r.missing).toEqual(["08_SoWi/fremd.md#9"]);
  });

  it("[Thema]-refs ohne pfad sind nicht verifizierbar -> ignoriert", () => {
    const r = verifySupport("Siehe [Testthema].", chunks);
    expect(r).toEqual({ supported: true, refs: [], missing: [] });
  });

  it("doppelte refs nur einmal gezaehlt", () => {
    const r = verifySupport("[08_SoWi/t.md#1] und nochmal [08_SoWi/t.md#1].", chunks);
    expect(r.refs).toEqual(["08_SoWi/t.md#1"]);
  });
});
