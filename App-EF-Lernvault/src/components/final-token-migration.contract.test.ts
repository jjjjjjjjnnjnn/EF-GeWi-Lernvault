import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const COLOR_ALLOWLIST = new Set<string>();
const OWNED_PATHS = [
  "src/modules/Library.tsx",
  "src/components/MathHtml.tsx",
  "src/components/Diagram.tsx",
];
const ownedSources = OWNED_PATHS.map((path) => ({
  path,
  source: readFileSync(resolve(process.cwd(), path), "utf8"),
}));
const sourceFor = (path: string) =>
  ownedSources.find((entry) => entry.path === path)?.source ?? "";
const activeShadowPattern = /\bshadow-(?!none\b)[\w-]+/;
const hexPattern = /#[0-9a-f]{3,8}\b/gi;
const emojiPattern = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;
const italicPattern = /\bitalic\b/g;

describe("final token migration source contract", () => {
  it("keeps the three owned files token-only and free of visual-contract violations", () => {
    const violations = ownedSources.flatMap(({ path, source }) => {
      const colors = (source.match(hexPattern) ?? [])
        .map((color) => color.toLowerCase())
        .filter((color) => !COLOR_ALLOWLIST.has(color));
      return [
        ...colors.map((color) => `${path}:hex:${color}`),
        ...(source.match(activeShadowPattern) ?? []).map((value) => `${path}:shadow:${value}`),
        ...Array.from(source.matchAll(italicPattern), (match) => `${path}:italic:${match[0]}`),
        ...Array.from(source.matchAll(emojiPattern), (match) => `${path}:emoji:${match[0]}`),
      ];
    });

    expect(violations).toEqual([]);
    expect("shadow-none").not.toMatch(activeShadowPattern);
    expect("shadow-md").toMatch(activeShadowPattern);
    expect(sourceFor("src/modules/Library.tsx")).toContain("max-w-[46rem]");
    expect(sourceFor("src/modules/Library.tsx")).toContain(
      'className="border border-[var(--line)] px-1.5 py-0.5 text-[11px] text-[var(--gray)] rounded-sm"'
    );
    expect(sourceFor("src/modules/Library.tsx")).toContain("text-[var(--ink)]");
    expect(sourceFor("src/components/MathHtml.tsx")).toContain('import("katex")');
    expect(sourceFor("src/components/Diagram.tsx")).toContain("sanitizeSvg(raw)");
  });
});
