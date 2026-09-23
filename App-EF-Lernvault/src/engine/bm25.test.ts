import { describe, it, expect } from "vitest";
import { BM25Index, tokenize } from "./bm25";

describe("BM25 Tokenizer", () => {
  it("extracts German tokens and filters stop words", () => {
    const text = "Die soziale Ungleichheit in Deutschland und das Grundeinkommen";
    const tokens = tokenize(text);
    expect(tokens).toContain("soziale");
    expect(tokens).toContain("ungleichheit");
    expect(tokens).toContain("deutschland");
    expect(tokens).toContain("grundeinkommen");
    expect(tokens).not.toContain("die");
    expect(tokens).not.toContain("in");
    expect(tokens).not.toContain("und");
    expect(tokens).not.toContain("das");
  });

  it("handles German legal articles and hyphens", () => {
    const text = "Art. 9 Abs. 3 GG Koalitionsfreiheit";
    const tokens = tokenize(text);
    expect(tokens).toContain("art. 9");
    expect(tokens).toContain("abs. 3");
    expect(tokens).toContain("gg");
    expect(tokens).toContain("koalitionsfreiheit");
  });

  it("handles Chinese characters with unigrams and bigrams", () => {
    const text = "机会公平与社会流动";
    const tokens = tokenize(text);
    expect(tokens).toContain("机");
    expect(tokens).toContain("机会");
    expect(tokens).toContain("会公");
    expect(tokens).toContain("社会");
    expect(tokens).toContain("流动");
  });
  it("normalizes German umlauts while preserving CJK and mixed-script retrieval", () => {
    const idx = new BM25Index();
    idx.build([
      {
        id: "de",
        thema: "Größe und Möglichkeiten",
        text: "Straßenverkehr und Größenordnung",
      },
      {
        id: "zh",
        thema: "Chancengerechtigkeit",
        text: "为什么社会流动需要机会公平",
      },
      {
        id: "mixed",
        thema: "Soziale Ungleichheit",
        text: "Ungleichheit 社会流动与机会公平",
      },
    ]);

    expect(idx.search("Groesse", 1)[0]?.id).toBe("de");
    expect(idx.search("Moeglichkeiten", 1)[0]?.id).toBe("de");
    expect(idx.search("为什么社会流动需要机会公平", 1)[0]?.id).toBe("zh");
    expect(idx.search("Ungleichheit 社会", 1)[0]?.id).toBe("mixed");
  });
});

describe("BM25 Index & Search", () => {
  const docs = [
    {
      id: "doc1",
      thema: "Soziale Ungleichheit",
      tags: ["EF", "SoWi", "Gesellschaft"],
      text: "Dimensionen sozialer Ungleichheit: Bildung, Einkommen, Vermögen und Macht.",
    },
    {
      id: "doc2",
      thema: "Tarifautonomie und Streikrecht",
      tags: ["EF", "SoWi", "Wirtschaft"],
      text: "Art. 9 Abs. 3 GG garantiert die Koalitionsfreiheit und Tarifautonomie für Gewerkschaften und Arbeitgeber.",
    },
    {
      id: "doc3",
      thema: "Utilitarismus vs. Kant",
      tags: ["EF", "Philosophie", "Ethik"],
      text: "Kategorischer Imperativ von Immanuel Kant fordert Handeln nach verallgemeinerbaren Maximen.",
    },
  ];

  it("ranks the most relevant document first based on BM25 score", () => {
    const idx = new BM25Index();
    idx.build(docs);

    const res = idx.search("Koalitionsfreiheit");
    expect(res.length).toBeGreaterThan(0);
    expect(res[0].id).toBe("doc2");
  });

  it("prioritizes exact matches in title and text", () => {
    const idx = new BM25Index();
    idx.build(docs);

    const res = idx.search("Soziale Ungleichheit");
    expect(res[0].id).toBe("doc1");
  });

  it("supports Chinese query searching across bilingual docs", () => {
    const idx = new BM25Index();
    idx.build([
      {
        id: "cjk1",
        thema: "Chancengerechtigkeit",
        tags: ["SoWi"],
        text: "机会公平是评价社会流动的重要标准。",
      },
      {
        id: "cjk2",
        thema: "Leistungsgesellschaft",
        tags: ["SoWi"],
        text: "精英成就社会强调个人努力与分配公平。",
      },
    ]);

    const res = idx.search("机会公平");
    expect(res[0].id).toBe("cjk1");
  });

  it("returns empty array for whitespace query or empty index", () => {
    const idx = new BM25Index();
    idx.build([]);
    expect(idx.search("test")).toEqual([]);
    idx.build(docs);
    expect(idx.search("   ")).toEqual([]);
  });
});
