import { describe, it, expect } from "vitest";
import {
  normalizeSearchString,
  matchToken,
  fuzzyMatchFields,
  fuzzyMatchNode,
  fuzzyFilterAndRankNodes,
} from "./fuzzySearch";
import type { KnowledgeNode } from "../engine/skillTree";

describe("fuzzySearch (全语言模糊检索引擎测试)", () => {
  it("normalizes German umlauts and punctuation properly", () => {
    expect(normalizeSearchString("Überhang")).toBe("ueberhang");
    expect(normalizeSearchString("Märkte & Preise")).toBe("maerkte preise");
    expect(normalizeSearchString("Groß-Buchstabe")).toBe("gross buchstabe");
  });

  it("matches tokens with exact, prefix, subsequence, and typo tolerance", () => {
    // 1. Exact match
    expect(matchToken("preismechanismus", "preis")).toBeGreaterThan(0);
    // 2. Prefix match
    expect(matchToken("soziale marktwirtschaft", "soz")).toBeGreaterThan(0);
    // 3. Subsequence match
    expect(matchToken("preismechanismus", "prmech")).toBeGreaterThan(0);
    // 4. Minor typo (Levenshtein close for words >= 4 chars)
    expect(matchToken("beduerfnis", "bedurfnis")).toBeGreaterThan(0);
  });

  it("supports multi-token matching across multiple fields with AND logic", () => {
    const fields = [
      "价格形成机制与市场均衡十字",
      "Preismechanismus & Marktgleichgewicht",
      "Mikrooekonomie",
      "Markt Allmende",
    ];

    // 德文 + 中文混合词
    expect(fuzzyMatchFields(fields, "preis 市场").matched).toBe(true);
    // 变音符号容错 (Markte statt Märkte)
    expect(fuzzyMatchFields(fields, "markte gleichgewicht").matched).toBe(true);
    // 错别字或子序列
    expect(fuzzyMatchFields(fields, "prmech 均衡").matched).toBe(true);
    // 不匹配词
    expect(fuzzyMatchFields(fields, "philosophie kant").matched).toBe(false);
  });

  const dummyNode: KnowledgeNode = {
    id: "sowi-preismechanismus",
    fach: "SoWi",
    titleDE: "Preismechanismus & Marktgleichgewicht",
    titleZH: "价格形成机制与市场均衡十字",
    summaryDE: "Zusammenspiel von Angebot und Nachfrage bestimmt Gleichgewichtspreis.",
    summaryZH: "供求双方在市场上通过价格机制实现出清与资源配置。",
    category: "Mikrooekonomie",
    curriculumTier: "EF",
    stage: "einfuehrung",
    level: 2,
    xpReward: 100,
    estimatedMinutes: 10,
    prerequisites: ["sowi-beduerfnis-knappheit"],
    tags: ["Markt", "Preisbildung", "Modell"],
    keyFormulaOrSentence: "Der Gleichgewichtspreis erfüllt Signalfunktion.",
    commonFallacy: "Annahme, dass Höchstpreise das Angebot ausweiten.",
    layerIndex: 1,
  };

  it("matches knowledge node using any language or field", () => {
    // 匹配中文标题
    expect(fuzzyMatchNode(dummyNode, "价格形成").matched).toBe(true);
    // 匹配德语标题
    expect(fuzzyMatchNode(dummyNode, "preismechanismus").matched).toBe(true);
    // 匹配变音符号
    expect(fuzzyMatchNode(dummyNode, "hoechstpreise").matched).toBe(true);
    // 匹配英文/kebab ID
    expect(fuzzyMatchNode(dummyNode, "sowi-preis").matched).toBe(true);
    // 匹配考点金句
    expect(fuzzyMatchNode(dummyNode, "signalfunktion").matched).toBe(true);
    // 匹配标签
    expect(fuzzyMatchNode(dummyNode, "Preisbildung").matched).toBe(true);
  });

  it("filters and ranks nodes by relevance score", () => {
    const otherNode: KnowledgeNode = {
      ...dummyNode,
      id: "sowi-soziale-marktwirtschaft",
      titleDE: "Soziale Marktwirtschaft & Ordnungspolitik",
      titleZH: "社会市场经济秩序与国家干预",
      summaryDE: "Das Konzept der Sozialen Marktwirtschaft verbindet Wettbewerb mit sozialem Ausgleich.",
      category: "Ordnungspolitik",
      tags: ["Ordnungspolitik", "Sozialstaat"],
    };

    const results = fuzzyFilterAndRankNodes([otherNode, dummyNode], "Marktgleichgewicht");
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe("sowi-preismechanismus");

    const bothResults = fuzzyFilterAndRankNodes([otherNode, dummyNode], "Markt");
    expect(bothResults).toHaveLength(2);
  });
});
