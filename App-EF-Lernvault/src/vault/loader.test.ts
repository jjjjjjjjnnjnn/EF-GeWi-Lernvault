import { beforeEach, describe, expect, it, vi } from "vitest";

// reise- parsing gehoert reise.ts, nicht loader: entkoppeln, damit der
// `?raw`-import der exemplar-lektion den test-sandbox nicht bricht.
vi.mock("../reise", () => ({
  parseReiseFile: (rel: string, text: string) =>
    text.includes("fach:") ? ({ id: rel, thema: rel } as unknown) : null,
}));

import { pickVault } from "./loader";

// Minimal File-System-Access fakes: nur was walk() braucht.
const file = (name: string, text: string) => ({
  name,
  kind: "file",
  getFile: async () => ({ text: async () => text }),
});

const dir = (name: string, entries: unknown[]) => ({
  name,
  kind: "directory",
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async *values(): AsyncGenerator<any, void, void> {
    for (const e of entries) yield e;
  },
});

const NOTE = `---
fach: SoWi
thema: "T1"
klausurrelevant: true
datum: 2026-09-01
---
Deutscher Satz zum Thema.`;

beforeEach(() => {
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("pickVault (walk-regeln)", () => {
  it("md/csv/lernreise landen richtig, SKIP + dotfiles + leere notes fallen raus", async () => {
    const root = dir("vault", [
      dir("08_SoWi", [
        file("T1.md", NOTE),
        file("Leer.md", "---\nfach: SoWi\n---\n"), // keine bloecke -> drop
        file("w.csv", "Deutsch;Chinesisch;Beispielsatz;Fach;Thema\nStaat;国家;Ex;SoWi;V"),
      ]),
      dir("_Downloads", [file("Geheim.md", NOTE)]), // SKIP
      dir("Journal", [file("J.md", NOTE)]), // SKIP
      dir("Lernreise", [file("K-L1.md", "---\nfach: SoWi\nthema: K\n---\n## Schritt 1 — entdecken\nText")]),
      file(".hidden.md", NOTE), // dotfile -> skip
      file("Kunst.md", "---\nfach: Kunst\n---\nText"), // fach unguelting -> drop
    ]);
    vi.stubGlobal("showDirectoryPicker", async () => root);
    const v = await pickVault();
    expect(v.rootName).toBe("vault");
    expect(v.notes.map((n) => n.path)).toEqual(["08_SoWi/T1.md"]);
    expect(v.cards).toHaveLength(1);
    expect(v.cards[0].front).toBe("Staat");
    expect(v.reisen).toHaveLength(1);
  });

  it("sortierung: fach aufsteigend, datum absteigend", async () => {
    const n = (fach: string, datum: string, thema: string) =>
      file(`${thema}.md`, `---\nfach: ${fach}\nthema: ${thema}\ndatum: ${datum}\n---\nDeutscher Text hier.`);
    const root = dir("v", [dir("08_SoWi", [n("SoWi", "2026-01-01", "Alt"), n("SoWi", "2026-09-01", "Neu")]), dir("01_Deutsch", [n("Deutsch", "2026-01-01", "D")])]);
    Object.defineProperty(window, "showDirectoryPicker", {
      value: async () => root,
      configurable: true,
    });
    const v = await pickVault();
    expect(v.notes.map((x) => x.thema)).toEqual(["D", "Neu", "Alt"]);
  });
});
