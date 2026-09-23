import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import type { VaultCard } from "../vault/parser";
import Flashcards from "./Flashcards";

const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

const card: VaultCard = {
  id: "flip-contract",
  front: "Chancengerechtigkeit",
  back: "机会公平",
  example: "Chancengerechtigkeit sichert faire Startbedingungen.",
  fach: "SoWi",
  thema: "Soziale Ungleichheit",
  source: "08_SoWi/ flashcards.csv",
};

function ruleBody(source: string, selector: string): string {
  const start = source.indexOf(`${selector} {`);
  expect(start).toBeGreaterThanOrEqual(0);
  const open = source.indexOf("{", start);
  const close = source.indexOf("}", open);
  return source.slice(open + 1, close);
}

function mediaBlock(source: string, marker: string): { start: number; body: string } {
  const start = source.indexOf(marker);
  expect(start).toBeGreaterThanOrEqual(0);
  const open = source.indexOf("{", start);
  let depth = 0;
  let close = open;
  for (; close < source.length; close += 1) {
    if (source[close] === "{") depth += 1;
    if (source[close] === "}") depth -= 1;
    if (depth === 0) break;
  }
  expect(depth).toBe(0);
  return { start, body: source.slice(open + 1, close) };
}

beforeEach(() => {
  localStorage.clear();
});

describe("Flashcards motion and reading contract", () => {
  it("declares and uses a card transition of at least 450ms", () => {
    const declared = css.match(/--dur-card\s*:\s*([0-9.]+)s\s*;/);
    expect(declared).not.toBeNull();
    expect(Number(declared![1])).toBeGreaterThanOrEqual(0.45);
    expect(ruleBody(css, ".card-inner")).toMatch(
      /transition\s*:\s*transform\s+var\(--dur-card\)\s+cubic-bezier\(/
    );
  });

  it("keeps duration utilities and inline transitions off the rendered flip element", async () => {
    render(<Flashcards lang="de" vault={[card]} />);
    const flip = await screen.findByRole("button", { name: "Antwort anzeigen" });
    const durationUtilities = Array.from(flip.classList).filter((className) =>
      /(?:^|:)duration-(?:\[[^\]]+\]|[^\s]+)$/.test(className)
    );

    expect(flip).toHaveClass("card-inner");
    expect(durationUtilities).toEqual([]);
    expect(flip.style.transition).toBe("");
    expect(flip.style.transitionDuration).toBe("");
    expect(ruleBody(css, ".card-inner")).toContain("var(--dur-card)");
  });

  it("overrides the card transition duration for reduced-motion users", () => {
    const cardRule = css.indexOf(".card-inner {");
    const reduced = mediaBlock(css, "@media (prefers-reduced-motion: reduce)");
    const selectors = reduced.body.replace(/\s/g, "");
    const duration = reduced.body.match(/transition-duration\s*:\s*([0-9.]+)ms\s*!important/);

    expect(cardRule).toBeGreaterThanOrEqual(0);
    expect(reduced.start).toBeGreaterThan(cardRule);
    expect(selectors).toContain("*,*::before,*::after");
    expect(duration).not.toBeNull();
    expect(Number(duration![1])).toBeLessThan(450);
  });

  it("sets German terms in serif and Chinese answers one type size smaller", async () => {
    render(<Flashcards lang="de" vault={[card]} />);
    await screen.findByText(card.front);
    const german = screen.getByText(card.front);
    const chinese = screen.getByText(card.back);

    expect(german).toHaveClass("font-serif", "text-3xl");
    expect(chinese).toHaveClass("font-sans", "text-2xl");
  });
});
