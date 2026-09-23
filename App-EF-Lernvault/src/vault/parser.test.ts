import { describe, expect, it } from "vitest";
import { parseBody, parseCsv, parseFrontmatter, parseNoteFile } from "./parser";

describe("parseFrontmatter", () => {
  it("liest fach/thema/listen/bool", () => {
    const raw = `---
fach: SoWi
thema: "Ungleichheit"
operatoren: [darstellen, analysieren]
klausurrelevant: true
tags: [EF, SoWi]
---
Body`;
    const { meta, body } = parseFrontmatter(raw);
    expect(meta.fach).toBe("SoWi");
    expect(meta.thema).toBe("Ungleichheit"); // anfuehrungszeichen gestrippt
    expect(meta.operatoren).toBe("[darstellen, analysieren]");
    expect(body.trim()).toBe("Body");
  });

  it("ohne frontmatter -> leer + vollbody", () => {
    const { meta, body } = parseFrontmatter("# Nur Text");
    expect(meta).toEqual({});
    expect(body).toBe("# Nur Text");
  });

  it("unclosed --- -> vollbody (robustheit)", () => {
    const raw = "---\nfach: SoWi\nkein ende";
    const { meta, body } = parseFrontmatter(raw);
    expect(meta).toEqual({});
    expect(body).toBe(raw);
  });
});

describe("parseBody", () => {
  it("h2/h3/li/quote/p + zh/de-erkennung", () => {
    const blocks = parseBody("## Titel\nEin deutscher Satz.\n这是中文句子。\n- Punkt eins\n> Zitat hier");
    expect(blocks.map((b) => b.kind)).toEqual(["h2", "p", "p", "li", "quote"]);
    expect(blocks[0]).toMatchObject({ kind: "h2", text: "Titel" });
    expect(blocks[0].text).not.toContain("##");
    expect(blocks[1].lang).toBe("de");
    expect(blocks[2].lang).toBe("zh"); // >=2 CJK
    expect(blocks[4].lang).toBe("de");
  });

  it("einzelnes CJK-zeichen zaehlt nicht als zh", () => {
    const blocks = parseBody("Der Mensch 人 lernt.");
    expect(blocks[0].lang).toBe("de");
  });

  it("code-fence -> math-block, inline-markdown gestrippt", () => {
    const blocks = parseBody("```\nE = mc^2\n```\n**fett** und #hashtag");
    expect(blocks[0]).toMatchObject({ kind: "math", text: "E = mc^2" });
    expect(blocks[1].text).toBe("fett und #hashtag");
  });

  it("```diagram -> diagram-block (kein katex-futter)", () => {
    const blocks = parseBody("Text\n```diagram\nA --> B\n```\nDanach");
    expect(blocks.map((b) => b.kind)).toEqual(["p", "diagram", "p"]);
    expect(blocks[1].text).toBe("A --> B");
  });

  it("```Diagram (gross) + leerer diagram-block faellt raus", () => {
    const blocks = parseBody("```Diagram\nX\n```\n```diagram\n```");
    expect(blocks.map((b) => b.kind)).toEqual(["diagram"]);
  });

  it("normale fences bleiben math (keine regression)", () => {
    const blocks = parseBody("```python\nprint(1)\n```");
    expect(blocks[0]).toMatchObject({ kind: "math" });
  });

  it("leere zeilen + einzelne # -> ignoriert", () => {
    expect(parseBody("\n\n# kein header\n\n")).toEqual([]);
  });
});

describe("parseNoteFile", () => {
  const FMT = (fach: string) => `---\nfach: ${fach}\nthema: "T"\n---\nText`;

  it("ungueltiges fach -> null (tuersteher)", () => {
    expect(parseNoteFile("x.md", FMT("Kunst"))).toBeNull();
    expect(parseNoteFile("x.md", "ohne frontmatter")).toBeNull();
  });

  it("alle 10 faecher passieren", () => {
    for (const f of ["Deutsch", "Englisch", "Mathe", "Physik", "Chemie", "Bio", "Philosophie", "SoWi", "Musik", "Sport"]) {
      expect(parseNoteFile(`${f}/n.md`, FMT(f))?.fach).toBe(f);
    }
  });

  it("thema-fallback = dateiname", () => {
    const n = parseNoteFile("08_SoWi/Mein-Thema.md", "---\nfach: SoWi\n---\nHi");
    expect(n?.thema).toBe("Mein-Thema");
  });
});

describe("parseCsv", () => {
  it("header uebersprungen, 5 spalten -> karte", () => {
    const cards = parseCsv(
      "08_SoWi/k.csv",
      "Deutsch;Chinesisch;Beispielsatz;Fach;Thema\nStaat;国家;Der Staat regelt.;SoWi;Verfassung"
    );
    expect(cards).toHaveLength(1);
    expect(cards[0]).toMatchObject({ front: "Staat", back: "国家", fach: "SoWi", thema: "Verfassung" });
    expect(cards[0].id).toBe("08_SoWi/k.csv#1");
  });

  it("kaputte zeilen (falsche spaltenzahl) werden gedroppt, felder nie verschoben", () => {
    const cards = parseCsv("d.csv", "A;B;C;D\nGut;好;Ex;SoWi;T");
    expect(cards).toHaveLength(1);
    expect(cards[0].front).toBe("Gut");
  });

  it("leeres fach -> verzeichnis als fallback", () => {
    const cards = parseCsv("Musik/k.csv", "Ton;音;Ex;;Gehör");
    expect(cards[0].fach).toBe("Musik");
  });
});
