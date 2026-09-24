import { describe, it, expect } from "vitest";
import {
  flacheBaum,
  elternKarte,
  baueSuchIndex,
  sucheBaum,
  findeNotizen,
  masteryFuerKnoten,
  statusFuer,
} from "./engine";
import type { BaumNode, FachBaum, MasteryEintrag, NotizStichwort } from "./types";

function knoten(teil: Partial<BaumNode> & { id: string }): BaumNode {
  return {
    level: 0,
    code: teil.id.toUpperCase(),
    titleDE: teil.id,
    titleZH: teil.id,
    operatoren: [],
    klausurDE: "",
    klausurZH: "",
    leitfrageDE: "",
    leitfrageZH: "",
    noteKeywords: [],
    children: [],
    ...teil,
  };
}

function baumFixture(): FachBaum {
  const blattA1 = knoten({
    id: "a1",
    level: 2,
    code: "SW-1.1.1",
    titleDE: "Soziale Ungleichheit",
    titleZH: "社会不平等",
    operatoren: ["analysieren"],
    leitfrageDE: "Wie misst man Ungleichheit?",
    leitfrageZH: "如何衡量不平等？",
    noteKeywords: ["gini", "ungleichheit"],
  });
  const blattA2 = knoten({
    id: "a2",
    level: 2,
    code: "SW-1.1.2",
    titleDE: "Soziale Mobilitaet",
    titleZH: "社会流动",
    operatoren: ["darstellen"],
    leitfrageDE: "Was foerdert Aufstieg?",
    leitfrageZH: "什么促进上升？",
    noteKeywords: ["mobilitaet"],
  });
  const mitteA = knoten({
    id: "a",
    level: 1,
    code: "SW-1.1",
    titleDE: "Sozialstruktur",
    titleZH: "社会结构",
    operatoren: ["beschreiben"],
    leitfrageDE: "Wie ist Gesellschaft gegliedert?",
    leitfrageZH: "社会如何分层？",
    noteKeywords: ["schicht"],
    children: [blattA1, blattA2],
  });
  const mitteB = knoten({
    id: "b",
    level: 1,
    code: "SW-1.2",
    titleDE: "Wirtschaftspolitik",
    titleZH: "经济政策",
    operatoren: ["beurteilen"],
    leitfrageDE: "Wirkt Mindestlohn?",
    leitfrageZH: "最低工资有效吗？",
    noteKeywords: ["mindestlohn"],
  });
  const root = knoten({
    id: "root",
    level: 0,
    code: "SW-1",
    titleDE: "SoWi EF",
    titleZH: "社会科学",
    operatoren: [],
    leitfrageDE: "Worum geht es?",
    leitfrageZH: "关于什么？",
    noteKeywords: [],
    children: [mitteA, mitteB],
  });
  return {
    fach: "SoWi",
    nameDE: "Sozialwissenschaften",
    nameZH: "社会科学",
    klpReferenz: "KLP-SoWi",
    klausurFokusDE: "Fokus",
    klausurFokusZH: "重点",
    root,
  };
}

describe("baum engine", () => {
  it("flacheBaum traversiert preorder", () => {
    const ids = flacheBaum(baumFixture()).map((n) => n.id);
    expect(ids).toEqual(["root", "a", "a1", "a2", "b"]);
  });

  it("elternKarte bildet root auf null ab", () => {
    const karte = elternKarte(baumFixture());
    expect(karte.get("root")).toBeNull();
    expect(karte.get("a")).toBe("root");
    expect(karte.get("a1")).toBe("a");
    expect(karte.get("a2")).toBe("a");
    expect(karte.get("b")).toBe("root");
    expect(karte.size).toBe(5);
  });

  it("baueSuchIndex baut Pfade mit Trennzeichen", () => {
    const index = baueSuchIndex([baumFixture()]);
    expect(index).toHaveLength(5);
    const a1 = index.find((e) => e.nodeId === "a1");
    expect(a1?.pfadDE).toBe("SoWi EF › Sozialstruktur › Soziale Ungleichheit");
    expect(a1?.pfadZH).toBe("社会科学 › 社会结构 › 社会不平等");
    expect(a1?.level).toBe(2);
    expect(a1?.fach).toBe("SoWi");
  });

  it("baueSuchIndex heuhaufen ist lowercase und enthaelt alle Felder", () => {
    const index = baueSuchIndex([baumFixture()]);
    const a1 = index.find((e) => e.nodeId === "a1")!;
    expect(a1.heuhaufen).toBe(a1.heuhaufen.toLowerCase());
    expect(a1.heuhaufen).toContain("sw-1.1.1");
    expect(a1.heuhaufen).toContain("analysieren");
    expect(a1.heuhaufen).toContain("gini");
    expect(a1.heuhaufen).toContain("wie misst man ungleichheit?");
    expect(a1.heuhaufen).not.toMatch(/\s{2,}/);
  });

  it("sucheBaum gibt bei leerer Query nichts zurueck", () => {
    const index = baueSuchIndex([baumFixture()]);
    expect(sucheBaum(index, "")).toEqual([]);
    expect(sucheBaum(index, "   ")).toEqual([]);
  });

  it("sucheBaum matcht case-insensitiv mit AND-Logik", () => {
    const index = baueSuchIndex([baumFixture()]);
    const treffer = sucheBaum(index, "  SOZIALSTRUKTUR   ungleichheit ");
    expect(treffer.map((e) => e.nodeId)).toEqual(["a1"]);
    expect(sucheBaum(index, "sozialstruktur mindestlohn")).toEqual([]);
  });

  it("sucheBaum sortiert nach level dann pfadDE", () => {
    const index = baueSuchIndex([baumFixture()]);
    const treffer = sucheBaum(index, "sowi");
    const ids = treffer.map((e) => e.nodeId);
    expect(ids[0]).toBe("root");
    expect(ids).toContain("a1");
    const level1 = treffer.filter((e) => e.level === 1).map((e) => e.nodeId);
    expect(level1).toEqual(["a", "b"]);
  });

  it("findeNotizen matcht Keywords case-insensitiv in Thema und Text", () => {
    const baum = baumFixture();
    const a1 = flacheBaum(baum).find((n) => n.id === "a1")!;
    const notizen: NotizStichwort[] = [
      { id: "n1", fach: "SoWi", thema: "Gini-Koeffizient", text: "Mass fuer Ungleichheit", operatoren: [] },
      { id: "n2", fach: "SoWi", thema: "Wahlrecht", text: "Demokratie und Wahlen", operatoren: [] },
      { id: "n3", fach: "SoWi", thema: "Einkommen", text: "Der GINI steigt weiter", operatoren: [] },
    ];
    expect(findeNotizen(a1, notizen)).toEqual(["n1", "n3"]);
  });

  it("findeNotizen ueberspringt leere Keywords und entfernt Duplikate", () => {
    const k = knoten({ id: "x", noteKeywords: ["", "  ", "lohn"] });
    const notizen: NotizStichwort[] = [
      { id: "n1", fach: "SoWi", thema: "Mindestlohn", text: "Debatte", operatoren: [] },
      { id: "n1", fach: "SoWi", thema: "Mindestlohn", text: "Debatte", operatoren: [] },
      { id: "n2", fach: "SoWi", thema: "Freizeit", text: "Sport", operatoren: [] },
    ];
    expect(findeNotizen(k, notizen)).toEqual(["n1"]);
    const leer = knoten({ id: "y", noteKeywords: ["", "   "] });
    expect(findeNotizen(leer, notizen)).toEqual([]);
  });

  it("masteryFuerKnoten matcht Keyword in Thema und gibt Maximum zurueck", () => {
    const k = knoten({ id: "x", noteKeywords: ["gini"] });
    const eintraege: MasteryEintrag[] = [
      { thema: "Gini-Koeffizient anwenden", fach: "SoWi", pMastery: 0.5 },
      { thema: "Gini-Koeffizient erklaeren", fach: "SoWi", pMastery: 0.9 },
      { thema: "Wahlrecht", fach: "SoWi", pMastery: 0.99 },
    ];
    expect(masteryFuerKnoten(k, eintraege)).toBeCloseTo(0.9);
  });

  it("masteryFuerKnoten matcht auch wenn Thema Substring des Keywords ist", () => {
    const k = knoten({ id: "x", noteKeywords: ["gini-koeffizient anwenden"] });
    const eintraege: MasteryEintrag[] = [{ thema: "Gini", fach: "SoWi", pMastery: 0.42 }];
    expect(masteryFuerKnoten(k, eintraege)).toBeCloseTo(0.42);
  });

  it("masteryFuerKnoten gibt null ohne Treffer oder ohne Keywords zurueck", () => {
    const k = knoten({ id: "x", noteKeywords: ["gini"] });
    expect(masteryFuerKnoten(k, [{ thema: "Wahlrecht", fach: "SoWi", pMastery: 0.9 }])).toBeNull();
    expect(masteryFuerKnoten(k, [])).toBeNull();
    const leer = knoten({ id: "y", noteKeywords: [] });
    expect(masteryFuerKnoten(leer, [{ thema: "Gini", fach: "SoWi", pMastery: 0.7 }])).toBeNull();
  });

  it("statusFuer folgt der Schwellenlogik", () => {
    expect(statusFuer(0, null)).toBe("luecke");
    expect(statusFuer(0, 0.95)).toBe("luecke");
    expect(statusFuer(2, 0.8)).toBe("beherrscht");
    expect(statusFuer(2, 0.95)).toBe("beherrscht");
    expect(statusFuer(2, 0.35)).toBe("aktiv");
    expect(statusFuer(2, 0.79)).toBe("aktiv");
    expect(statusFuer(2, null)).toBe("offen");
    expect(statusFuer(3, 0.1)).toBe("offen");
    expect(statusFuer(-1, null)).toBe("luecke");
  });
});
