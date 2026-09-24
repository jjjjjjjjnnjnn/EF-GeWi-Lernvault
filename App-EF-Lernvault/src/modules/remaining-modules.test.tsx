import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Blocks from "../components/Blocks";
import type { Block, VaultCard, VaultNote } from "../vault/parser";
import Flashcards from "./Flashcards";
import Mindmap from "./Mindmap";
import Planner from "./Planner";

vi.mock("../components/MathHtml", () => ({
  default: ({ code, display }: { code: string; display?: boolean }) => (
    <span data-testid="math">{display ? "display" : "inline"}:{code}</span>
  ),
}));

const COLOR_ALLOWLIST = new Set<string>();
const OWNED_PATHS = [
  "src/modules/Reise.tsx",
  "src/modules/Onboarding.tsx",
  "src/modules/Planner.tsx",
  "src/modules/Home.tsx",
  "src/modules/Flashcards.tsx",
  "src/modules/Settings.tsx",
  "src/modules/Mindmap.tsx",
  "src/components/MasteryRadar.tsx",
  "src/components/Blocks.tsx",
];
const ownedSources = OWNED_PATHS.map((path) => ({
  path,
  source: readFileSync(resolve(process.cwd(), path), "utf8"),
}));
const sourceFor = (path: string) =>
  ownedSources.find((entry) => entry.path === path)?.source ?? "";
const activeShadowPattern = /\bshadow-(?!none\b)[\w-]+/;

const flashcard: VaultCard = {
  id: "design-contract-card",
  front: "Vertrag",
  back: "Vertrag",
  example: "Der Vertrag gilt.",
  fach: "SoWi",
  thema: "Recht",
  source: "Recht.csv",
};

const mindmapNote: VaultNote = {
  id: "08_SoWi/Lernziel.md",
  path: "08_SoWi/Lernziel.md",
  fach: "SoWi",
  thema: "Lernziel",
  operatoren: ["darstellen", "analysieren"],
  klausurrelevant: true,
  datum: "2026-09-23",
  tags: ["EF", "SoWi"],
  blocks: [{ kind: "p", text: "Ein Lernziel.", lang: "de" }],
};

beforeEach(() => {
  localStorage.clear();
});

describe("remaining module source contract", () => {
  it("uses semantic colors and excludes active shadows, oversized radii, tiny text, italics, emoji, and symbol controls", () => {
    const violations = ownedSources.flatMap(({ path, source }) => {
      const colors = Array.from(source.matchAll(/#[0-9a-f]{3,8}\b/gi))
        .map((match) => match[0].toLowerCase())
        .filter((color) => !COLOR_ALLOWLIST.has(color));
      return [
        ...colors.map((value) => `${path}:hex:${value}`),
        ...Array.from(source.matchAll(/\bshadow-(?!none\b)[\w-]+/g), (match) => `${path}:shadow:${match[0]}`),
        ...Array.from(source.matchAll(/\bboxShadow\s*[:=]/g), (match) => `${path}:box-shadow:${match[0]}`),
        ...Array.from(source.matchAll(/\brounded-(?:sm|md|lg|xl|2xl|3xl)\b/g), (match) => `${path}:radius:${match[0]}`),
        ...Array.from(source.matchAll(/\brounded-\[(?!\/?var\(--radius\)\])[^\]]+\]/g), (match) => `${path}:inline-radius:${match[0]}`),
        ...Array.from(source.matchAll(/\bborderRadius\s*[:=]/g), (match) => `${path}:inline-radius:${match[0]}`),
        ...Array.from(source.matchAll(/\btext-\[(?:9|10|11)px\]/g), (match) => `${path}:small-text:${match[0]}`),
        ...Array.from(source.matchAll(/\bfontSize\s*:\s*["'](?:9|10|11)px["']/g), (match) => `${path}:small-text:${match[0]}`),
        ...Array.from(source.matchAll(/\banimate-(?:pulse|spin|bounce|ping)\b/g), (match) => `${path}:decorative-animation:${match[0]}`),
        ...Array.from(source.matchAll(/\bitalic\b/g), (match) => `${path}:italic:${match[0]}`),
        ...Array.from(source.matchAll(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu), (match) => `${path}:emoji:${match[0]}`),
        ...Array.from(source.matchAll(/[●■✓✔✕✖×]/g), (match) => `${path}:symbol-control:${match[0]}`),
        ...Array.from(source.matchAll(/<(?:button|a)\b[^>]*>\s*[+·×✕✓✔←→↑↓⚙●■]+\s*<\/(?:button|a)>/gu), (match) => `${path}:symbol-control:${match[0]}`),
        ...Array.from(source.matchAll(/<button(?![^>]*\btype=)[^>]*>/g), (match) => `${path}:button-type:${match[0]}`),
        ...Array.from(source.matchAll(/<(?:div|span|a|li|label)\b[^>]*\bonClick=/g), (match) => `${path}:non-native-control:${match[0]}`),
      ];
    });

    expect(violations).toEqual([]);
    expect("shadow-none").not.toMatch(activeShadowPattern);
    expect("shadow-md").toMatch(activeShadowPattern);
  });

  it("keeps every icon at 16 by 16 with currentColor and hidden semantics", () => {
    const requirements = [
      { label: "width", pattern: /\bwidth="16"/ },
      { label: "height", pattern: /\bheight="16"/ },
      { label: "viewBox", pattern: /\bviewBox="0 0 16 16"/ },
      { label: "fill", pattern: /\bfill="none"/ },
      { label: "stroke", pattern: /\bstroke="currentColor"/ },
      { label: "aria-hidden", pattern: /\baria-hidden="true"/ },
    ];
    const violations = ownedSources.flatMap(({ path, source }) =>
      Array.from(source.matchAll(/<svg\b[^>]*>/g))
        .filter((match) => !match[0].includes('data-relationship-diagram="true"'))
        .flatMap((match, index) =>
          requirements
            .filter(({ pattern }) => !pattern.test(match[0]))
            .map(({ label }) => `${path}:icon-${index + 1}:${label}`)
        )
    );
    const graphTag = sourceFor("src/modules/Mindmap.tsx").match(
      /<svg\b[^>]*data-relationship-diagram="true"[^>]*>/
    )?.[0];

    expect(violations).toEqual([]);
    expect(graphTag).toMatch(/\bfill="none"/);
    expect(graphTag).toMatch(/\bstroke="currentColor"/);
    expect(graphTag).toMatch(/\baria-hidden="true"/);
  });

  it("keeps quotes upright while routing inline and block mathematics through MathHtml", () => {
    const blocks: Block[] = [
      { kind: "quote", text: "Ein $x$ Zitat", lang: "de" },
      { kind: "math", text: "\\frac{1}{2}", lang: "de" },
    ];
    const { container } = render(<Blocks blocks={blocks} />);
    const quote = container.querySelector(".border-l-2");

    expect(quote?.textContent).toContain("Ein");
    expect(quote?.textContent).toContain("Zitat");
    expect(quote?.className).not.toMatch(/\bitalic\b/);
    expect(screen.getAllByTestId("math").map((node) => node.textContent)).toEqual([
      "inline:x",
      "display:\\frac{1}{2}",
    ]);
    expect(sourceFor("src/components/Blocks.tsx")).toContain('import MathHtml from "./MathHtml"');
  });

  it("keeps the flashcard recall gate before rating and exposes named progress", async () => {
    const user = userEvent.setup();
    render(<Flashcards lang="de" vault={[flashcard]} />);

    fireEvent.keyDown(window, { key: "1", code: "Digit1" });
    expect(screen.getAllByText("Vertrag")).toHaveLength(2);
    expect(screen.queryByRole("button", { name: /Again 1/ })).not.toBeInTheDocument();
    const progress = screen.getByRole("progressbar", { name: "Kartenfortschritt / 卡片进度" });
    expect(progress).toHaveAttribute("aria-valuemin", "0");
    expect(progress).toHaveAttribute("aria-valuemax", "1");
    expect(progress).toHaveAttribute("aria-valuenow", "0");

    await user.click(screen.getByRole("button", { name: "Antwort anzeigen" }));

    expect(screen.getByRole("button", { name: /Again 1/ })).toBeEnabled();
    expect(progress).toHaveAttribute("aria-valuenow", "1");
  });

  it("keeps keyboard focus visible and asynchronous progress updates announced", () => {
    const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

    expect(css).toMatch(/:focus-visible\s*\{[^}]*outline:\s*2px solid var\(--focus\)/s);
    expect(sourceFor("src/modules/Planner.tsx")).toMatch(/role="status"[^>]*aria-live="polite"/s);
    expect(sourceFor("src/modules/Reise.tsx")).toMatch(/role="status"[^>]*aria-live="polite"/s);
    expect(sourceFor("src/modules/Settings.tsx")).toMatch(/role="status"[^>]*aria-live="polite"/s);
  });

  it("keeps the flip token at least 0.45 seconds and reducible by user motion preference", () => {
    const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");
    const seconds = Number(css.match(/--dur-card:\s*([\d.]+)s/)?.[1]);

    expect(seconds).toBeGreaterThanOrEqual(0.45);
    expect(css).toContain("transition: transform var(--dur-card)");
    const reducedMotion = css.slice(css.indexOf("@media (prefers-reduced-motion: reduce)"));
    expect(reducedMotion).toContain("transition-duration: 0.01ms !important");
  });

  it("keeps graph nodes as keyboard-focusable buttons and operator labels as plain text", async () => {
    const user = userEvent.setup();
    const onJumpToLibrary = vi.fn();
    const { container } = render(
      <Mindmap lang="de" vaultNotes={[mindmapNote]} onJumpToLibrary={onJumpToLibrary} />
    );
    const topic = screen.getByRole("button", { name: /Lernziel/ });
    const operator = within(topic).getByText("darstellen · analysieren");

    expect(topic).toBeInstanceOf(HTMLButtonElement);
    expect(topic).not.toHaveAttribute("disabled");
    topic.focus();
    expect(topic).toHaveFocus();
    await user.click(topic);
    expect(onJumpToLibrary).toHaveBeenCalledWith("Lernziel", "SoWi", "08_SoWi/Lernziel.md");
    expect(operator.tagName).toBe("SPAN");
    expect(operator.getAttribute("style")).not.toMatch(/background|border|radius/i);
    expect(container.querySelector("svg[data-relationship-diagram]")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("svg[data-relationship-diagram] line")).toHaveLength(2);
  });

  it("gives Planner tasks a meaningful toggle name, pressed state, and live progress metadata", async () => {
    const user = userEvent.setup();
    render(<Planner lang="de" />);
    const task = screen.getByRole("button", {
      name: /Als erledigt markieren: Mi, Mathe: Formel-Spickzettel/,
    });

    expect(task).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("status")).toHaveAttribute("aria-live", "polite");
    await user.click(task);
    expect(
      screen.getByRole("button", {
        name: /Als offen markieren: Mi, Mathe: Formel-Spickzettel/,
      })
    ).toHaveAttribute("aria-pressed", "true");
  });
});
