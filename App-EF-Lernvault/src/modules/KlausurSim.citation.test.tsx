import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import type { VaultNote } from "../vault/parser";
import { KlausurSim } from "./KlausurSim";

const notes: VaultNote[] = [
  "Sprachwandel",
  "Sturm und Drang",
  "Dürrenmatt",
  "Digitalisierung",
].map((thema) => ({
  id: `01_Deutsch/${thema}.md`,
  path: `01_Deutsch/${thema}.md`,
  fach: "Deutsch",
  thema,
  operatoren: ["darstellen", "analysieren", "beurteilen"],
  klausurrelevant: true,
  datum: "2026-09-23",
  tags: ["EF", "Deutsch"],
  blocks: [
    { kind: "h2", text: "Klausur-Sätze", lang: "de" },
    {
      kind: "li",
      text: `Darstellen: ${thema} wird strukturiert eingeordnet.`,
      lang: "de",
    },
    {
      kind: "li",
      text: `Analysieren: Die Entwicklung von ${thema} wird anhand des Materials begründet.`,
      lang: "de",
    },
    {
      kind: "li",
      text: `Beurteilen: Die Folgen von ${thema} werden nach offengelegten Kriterien bewertet.`,
      lang: "de",
    },
  ],
}));

function forbiddenClaims(text: string): string[] {
  const patterns = [
    /\boriginal(?:e|er|en)?\s+(?:Abitur-?|Prüfungs?|Klausur-?)(?:aufgabe|prüfung|papier)?\b/giu,
    /\bechte[rn]?\s+(?:Abitur-?|Prüfungs?|Klausur-?)(?:aufgabe|prüfung|papier)?\b/giu,
    /\boriginalaufgabe\b/giu,
    /\boriginalabitur\b/giu,
  ];
  return patterns.flatMap((pattern) => Array.from(text.matchAll(pattern), (match) => match[0]));
}

beforeEach(() => {
  localStorage.clear();
});

describe("generated exam citation honesty", () => {
  it("keeps every composed task under a self-composed practice disclosure without real-paper claims", async () => {
    const user = userEvent.setup();
    render(<KlausurSim notes={notes} currentFach="Deutsch" />);
    const disclosure = await screen.findByText(/Selbst zusammengestellte Übungsaufgaben/);

    let root: HTMLElement | null = disclosure;
    while (root && root.querySelector("article") === null) root = root.parentElement;
    expect(root).not.toBeNull();

    const taskArticles = Array.from(root!.querySelectorAll("article"));
    expect(taskArticles.length).toBeGreaterThan(0);
    for (const article of taskArticles) {
      expect(article).toHaveTextContent(/Quelle: 01_Deutsch\//);
      expect(article).toHaveTextContent(/Punkte/);
    }
    expect(root!.textContent).toMatch(/Praxismodus: 45 Minuten, nicht die reale Prüfungszeit/);
    expect(forbiddenClaims(root!.textContent ?? "")).toEqual([]);

    await user.click(screen.getByRole("button", { name: /Abgeben und lokale Indikatorauswertung/ }));
    await screen.findByText("Lokale Übungsauswertung");

    const visibleAfterSubmission = root!.textContent?.replace(/\s+/g, " ") ?? "";
    expect(visibleAfterSubmission).toContain("Diese lokale Heuristik ist keine amtliche Korrektur");
    expect(visibleAfterSubmission).toContain("erzeugten Übungsaufgabe");
    expect(forbiddenClaims(visibleAfterSubmission)).toEqual([]);
  });
});
