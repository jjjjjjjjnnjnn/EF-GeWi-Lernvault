import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { Block, VaultNote } from "../vault/parser";
import Library from "../modules/Library";

function note(blocks: Block[]): VaultNote {
  return {
    id: "08_SoWi/Lesetest.md",
    path: "08_SoWi/Lesetest.md",
    fach: "SoWi",
    thema: "Bilinguales Lesen",
    operatoren: ["analysieren"],
    klausurrelevant: true,
    datum: "2026-09-23",
    tags: ["EF", "SoWi"],
    blocks,
  };
}

describe("Blocks bilingual reading contract", () => {
  it("renders each German paragraph in serif before its smaller muted Chinese translation", () => {
    const germanOne = "Soziale Ungleichheit betrifft die ungleiche Verteilung von Bildungschancen.";
    const chineseOne = "社会不平等影响教育机会的不平等分配。";
    const germanTwo = "Chancengerechtigkeit sichert faire Startbedingungen, aber noch keine Ergebnisse.";
    const chineseTwo = "机会公平保障公平的起点条件，但尚不能保障结果平等。";
    const blocks: Block[] = [
      { kind: "p", text: germanOne, lang: "de" },
      { kind: "p", text: chineseOne, lang: "zh" },
      { kind: "p", text: germanTwo, lang: "de" },
      { kind: "p", text: chineseTwo, lang: "zh" },
    ];

    render(<Library query="" vault={[note(blocks)]} />);

    const deOne = screen.getByText(germanOne);
    const zhOne = screen.getByText(chineseOne);
    const deTwo = screen.getByText(germanTwo);
    const zhTwo = screen.getByText(chineseTwo);
    const article = deOne.closest("article");

    expect(deOne).toHaveClass("font-serif", "text-[15px]", "text-[var(--ink)]");
    expect(zhOne).toHaveClass("font-sans", "text-sm", "text-[var(--gray)]");
    expect(deTwo).toHaveClass("font-serif", "text-[15px]", "text-[var(--ink)]");
    expect(zhTwo).toHaveClass("font-sans", "text-sm", "text-[var(--gray)]");
    expect(deOne.compareDocumentPosition(zhOne) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(zhOne.compareDocumentPosition(deTwo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(deTwo.compareDocumentPosition(zhTwo) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(article).not.toBeNull();
    expect(article!.querySelector("em, i")).toBeNull();
    expect(article!.querySelector(".italic")).toBeNull();
  });

  it("sends a parsed math block through lazy KaTeX instead of leaving raw source", async () => {
    const math = String.raw`\frac{7}{13}`;
    const blocks: Block[] = [{ kind: "math", text: math, lang: "de" }];

    const { container } = render(<Library query="" vault={[note(blocks)]} />);
    const article = container.querySelector("article")!;
    const hasRawMath = () =>
      Array.from(article.querySelectorAll(".font-mono")).some((element) => element.textContent === math);
    expect(hasRawMath()).toBe(true);

    await waitFor(() => expect(article.querySelector(".katex-display")).not.toBeNull());
    expect(hasRawMath()).toBe(false);
  });
});
