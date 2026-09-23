import { describe, expect, it } from "vitest";
import { VaultGraph, extractLinks, normalizeLinkTarget } from "./vaultGraph";

describe("VaultGraph Link Extraction", () => {
  it("extracts wiki-links with and without alias", () => {
    const text = `
    In der Bundesrepublik gilt das Prinzip der [[Soziale-Marktwirtschaft]].
    Siehe auch [[Grundgesetz-Art-20|Art. 20 GG]] und [[Tarifautonomie]].
    `;
    const links = extractLinks(text);
    expect(links).toHaveLength(3);
    expect(links[0]).toEqual({ target: "Soziale-Marktwirtschaft" });
    expect(links[1]).toEqual({ target: "Grundgesetz-Art-20", alias: "Art. 20 GG" });
    expect(links[2]).toEqual({ target: "Tarifautonomie" });
  });

  it("extracts markdown links ending in .md", () => {
    const text = `
    Weitere Informationen in [Ungleichheit](08_SoWi/Soziale-Ungleichheit.md) sowie [Philosophie](07_Philosophie/Utilitarismus.md#kant).
    `;
    const links = extractLinks(text);
    expect(links).toHaveLength(2);
    expect(links[0].target).toBe("08_SoWi/Soziale-Ungleichheit.md");
    expect(links[1].target).toBe("07_Philosophie/Utilitarismus.md#kant");
  });

  it("normalizes link targets as case-insensitive paths", () => {
    expect(normalizeLinkTarget("08_SoWi/Soziale-Ungleichheit.md")).toBe("08_sowi/soziale-ungleichheit");
    expect(normalizeLinkTarget("Utilitarismus.md#kant")).toBe("utilitarismus");
    expect(normalizeLinkTarget("Soziale Marktwirtschaft")).toBe("soziale marktwirtschaft");
  });
});

describe("VaultGraph Adjacency & Topology", () => {
  const notes = [
    {
      id: "sowi/markt",
      thema: "Soziale Marktwirtschaft",
      fach: "SoWi",
      content: "Verbindet Markt und Sozialstaat. Basiert auf [[Grundgesetz-Art-20]] und regelt [[Tarifautonomie]].",
    },
    {
      id: "sowi/gg20",
      thema: "Grundgesetz-Art-20",
      fach: "SoWi",
      content: "Bundesstaat, Sozialstaat, Demokratie. Verweist auf nichts.",
    },
    {
      id: "sowi/tarif",
      thema: "Tarifautonomie",
      fach: "SoWi",
      content: "Gewerkschaften handeln Tarifverträge aus. Siehe [[Grundgesetz-Art-20]].",
    },
    {
      id: "philo/kant",
      thema: "Kant Pflichtethik",
      fach: "Philosophie",
      content: "Kategorischer Imperativ. Reine Vernunft ohne externe Links.",
    },
  ];

  it("builds bidirectional edges correctly", () => {
    const graph = new VaultGraph();
    graph.build(notes);

    const fwdMarkt = graph.getForwardLinks("sowi/markt");
    expect(fwdMarkt.map((node) => node.id)).toContain("sowi/gg20");
    expect(fwdMarkt.map((node) => node.id)).toContain("sowi/tarif");

    const backGg = graph.getBacklinks("sowi/gg20");
    expect(backGg.map((node) => node.id)).toContain("sowi/markt");
    expect(backGg.map((node) => node.id)).toContain("sowi/tarif");
  });

  it("detects orphan nodes", () => {
    const graph = new VaultGraph();
    graph.build(notes);

    const orphans = graph.getOrphanNodes();
    expect(orphans).toHaveLength(1);
    expect(orphans[0].id).toBe("philo/kant");
  });

  it("calculates hub nodes with highest degree centrality", () => {
    const graph = new VaultGraph();
    graph.build(notes);

    const hubs = graph.getHubNodes(2);
    expect(hubs[0].degree).toBeGreaterThanOrEqual(2);
  });

  it("traverses neighborhood subgraphs up to given depth", () => {
    const graph = new VaultGraph();
    graph.build(notes);

    const sub1 = graph.getNeighborhood("sowi/tarif", 1);
    const subNodeIds = sub1.nodes.map((node) => node.id);
    expect(subNodeIds).toContain("sowi/tarif");
    expect(subNodeIds).toContain("sowi/gg20");
    expect(subNodeIds).toContain("sowi/markt");
  });

  it("keeps same-named files in different folders as separate nodes", () => {
    const graph = new VaultGraph();
    graph.build([
      {
        id: "03_Mathe/Formel-Spickzettel.md",
        thema: "Formel-Spickzettel Mathematik",
        fach: "Mathe",
        content: "[[Formel-Spickzettel]]",
      },
      {
        id: "04_Physik/Formel-Spickzettel.md",
        thema: "Formel-Spickzettel Physik",
        fach: "Physik",
        content: "unverbunden",
      },
      {
        id: "08_SoWi/Verweis.md",
        thema: "Verweis",
        fach: "SoWi",
        content: "[[04_Physik/Formel-Spickzettel.md]]",
      },
    ]);

    const exported = graph.exportFullGraph();
    expect(exported.nodes.filter((node) => node.id.endsWith("Formel-Spickzettel.md"))).toHaveLength(2);
    expect(graph.getForwardLinks("08_SoWi/Verweis.md").map((node) => node.id)).toEqual([
      "04_Physik/Formel-Spickzettel.md",
    ]);
    expect(graph.getForwardLinks("03_Mathe/Formel-Spickzettel.md")).toEqual([]);
  });

  it("resolves relative paths while refusing ambiguous basename links", () => {
    const graph = new VaultGraph();
    graph.build([
      {
        id: "08_SoWi/Verweis.md",
        thema: "Verweis",
        fach: "SoWi",
        content: "[Physik](../04_Physik/Formel-Spickzettel.md) [Mathematik](Formel-Spickzettel.md)",
      },
      {
        id: "03_Mathe/Formel-Spickzettel.md",
        thema: "Formel-Spickzettel Mathematik",
        fach: "Mathe",
        content: "",
      },
      {
        id: "04_Physik/Formel-Spickzettel.md",
        thema: "Formel-Spickzettel Physik",
        fach: "Physik",
        content: "",
      },
    ]);

    expect(graph.getForwardLinks("08_SoWi/Verweis.md").map((node) => node.id)).toEqual([
      "04_Physik/Formel-Spickzettel.md",
    ]);
    expect(graph.getForwardLinks("03_Mathe/Formel-Spickzettel.md")).toEqual([]);
    expect(graph.getForwardLinks("04_Physik/Formel-Spickzettel.md")).toEqual([]);
  });
});
