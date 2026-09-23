import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { act, render, renderHook, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Quiz, { calculateQuizTimerSeconds, formatTimerSeconds, useQuizTimer } from "./Quiz";

vi.mock("../ai/engine", () => ({ chat: vi.fn() }));

const COLOR_ALLOWLIST = new Set<string>();
const ownedSources = ["src/modules/Quiz.tsx", "src/quizgen.ts"].map((path) => ({
  path,
  source: readFileSync(resolve(process.cwd(), path), "utf8"),
}));
const quizSource = ownedSources.find(({ path }) => path.endsWith("Quiz.tsx"))!.source;

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});

afterEach(() => {
  vi.useRealTimers();
  window.history.replaceState({}, "", "/");
});

describe("Quiz timer", () => {
  it("uses absolute deadlines without drifting across delayed callbacks", () => {
    const startedAt = 1_789_000_000_000;
    const delayedSamples = [1_000, 4_000, 7_000, 12_450].map((elapsed) =>
      calculateQuizTimerSeconds(0, startedAt, startedAt + elapsed)
    );
    expect(delayedSamples).toEqual([1, 4, 7, 12]);
    expect(delayedSamples[delayedSamples.length - 1]).not.toBe(delayedSamples.length);

    vi.useFakeTimers();
    vi.setSystemTime(new Date(startedAt));
    const { result, unmount } = renderHook(() => useQuizTimer());

    act(() => result.current.start());
    expect(result.current.running).toBe(true);
    expect(result.current.formatted).toBe("00:00");

    vi.setSystemTime(startedAt + 3_400);
    act(() => result.current.stop());
    expect(result.current.running).toBe(false);
    expect(result.current.formatted).toBe("00:03");

    vi.setSystemTime(startedAt + 13_400);
    expect(result.current.formatted).toBe("00:03");

    act(() => result.current.start());
    vi.setSystemTime(startedAt + 19_800);
    act(() => result.current.stop());
    expect(result.current.formatted).toBe("00:09");
    expect(formatTimerSeconds(125)).toBe("02:05");
    unmount();
  });
});

describe("Quiz shortcuts", () => {
  it("suppresses Space while typing and rejects any modifier on Space plus Alt, Ctrl, or Meta on option keys", () => {
    window.history.replaceState({}, "", "/?mode=vergleich");
    render(<Quiz lang="de" />);

    const dispatchKey = (init: KeyboardEventInit) => {
      const event = new KeyboardEvent("keydown", { ...init, cancelable: true });
      act(() => {
        window.dispatchEvent(event);
      });
      return event;
    };

    const justification = screen.getByLabelText(/BEGRÜNDUNG/);
    justification.focus();
    const typingSpace = dispatchKey({ key: " ", code: "Space" });
    expect(typingSpace.defaultPrevented).toBe(false);
    expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    justification.blur();

    for (const modifier of ["altKey", "ctrlKey", "metaKey", "shiftKey"] as const) {
      const modifiedSpace = dispatchKey({
        key: " ",
        code: "Space",
        [modifier]: true,
      });
      expect(modifiedSpace.defaultPrevented).toBe(false);
      expect(screen.getByRole("button", { name: "Start" })).toBeInTheDocument();
    }

    const plainSpace = dispatchKey({ key: " ", code: "Space" });
    expect(plainSpace.defaultPrevented).toBe(true);
    expect(screen.getByRole("button", { name: "Stopp" })).toBeInTheDocument();

    const optionA = screen.getByRole("button", { name: /A: Freie Marktwirtschaft/ });
    const optionB = screen.getByRole("button", { name: /B: Soziale Marktwirtschaft/ });
    expect(optionA).toHaveAttribute("aria-pressed", "false");

    for (const modifier of ["altKey", "ctrlKey", "metaKey"] as const) {
      const modifiedOne = dispatchKey({
        key: "1",
        code: "Digit1",
        [modifier]: true,
      });
      expect(modifiedOne.defaultPrevented).toBe(false);
      expect(optionA).toHaveAttribute("aria-pressed", "false");
    }

    const plainOne = dispatchKey({ key: "1", code: "Digit1" });
    expect(plainOne.defaultPrevented).toBe(true);
    expect(optionA).toHaveAttribute("aria-pressed", "true");

    for (const modifier of ["altKey", "ctrlKey", "metaKey"] as const) {
      const modifiedTwo = dispatchKey({
        key: "2",
        code: "Digit2",
        [modifier]: true,
      });
      expect(modifiedTwo.defaultPrevented).toBe(false);
      expect(optionB).toHaveAttribute("aria-pressed", "false");
    }
  });
});

describe("Quiz accessibility", () => {
  it("keeps German prompts in serif reading style with smaller Chinese understanding beneath", () => {
    window.history.replaceState({}, "", "/?mode=vergleich");
    render(<Quiz lang="de" />);

    const german = screen.getByText(/Welche Wirtschaftsordnung kombiniert/);
    const chinese = screen.getByText(/哪种经济秩序将自由市场竞争/);
    expect(german).toHaveClass("de-reading");
    expect(chinese).toHaveClass("zh-translation");
    expect(german.compareDocumentPosition(chinese) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    const optionA = screen.getByRole("button", { name: /A: Freie Marktwirtschaft/ });
    expect(optionA).toHaveClass("font-serif");
    expect(optionA.querySelector(".zh-translation")).not.toBeNull();
  });
});

describe("Quiz source contract", () => {
  it("uses design tokens and excludes hardcoded colors, active shadows, large radii, tiny text, italics, and emoji", () => {
    const violations = ownedSources.flatMap(({ path, source }) => {
      const colors = (source.match(/#[0-9A-Fa-f]{3,8}\b/g) ?? []).filter(
        (color) => !COLOR_ALLOWLIST.has(color)
      );
      return [
        ...colors.map((value) => `${path}:color:${value}`),
        ...Array.from(source.matchAll(/\bshadow-(?!none\b)[\w-]+/g), (match) => `${path}:shadow:${match[0]}`),
        ...Array.from(source.matchAll(/\bboxShadow\s*:/g), (match) => `${path}:${match[0]}`),
        ...Array.from(source.matchAll(/\brounded-(?:lg|xl|2xl)\b/g), (match) => `${path}:${match[0]}`),
        ...Array.from(source.matchAll(/\btext-\[(?:9|10|11)px\]/g), (match) => `${path}:${match[0]}`),
        ...Array.from(source.matchAll(/\bitalic\b/g), (match) => `${path}:${match[0]}`),
        ...Array.from(
          source.matchAll(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu),
          (match) => `${path}:emoji:${match[0]}`
        ),
      ];
    });

    expect(violations).toEqual([]);
    expect("shadow-none").not.toMatch(/\bshadow-(?!none\b)[\w-]+/);
    expect("shadow-md").toMatch(/\bshadow-(?!none\b)[\w-]+/);
    expect(quizSource).toContain("var(--ink)");
    expect(quizSource).toContain("var(--gray)");
    expect(quizSource).toContain("var(--line)");
    expect(quizSource).toContain("var(--accent)");
  });

  it("keeps interactive controls native, bilingual reading styles, and both polite live regions", () => {
    expect(quizSource).not.toMatch(/<(?:div|span)[^>]*\bonClick=/);
    expect(quizSource).not.toMatch(/<button(?![^>]*\btype=)/);
    expect(quizSource.match(/aria-live="polite"/g)).toHaveLength(2);
    expect(quizSource).toContain("de-reading");
    expect(quizSource).toContain("zh-translation");
    expect(quizSource).toContain('stroke="currentColor"');
    expect(quizSource).toContain('aria-hidden="true"');
    expect(quizSource).toContain('width="16"');
    expect(quizSource).toContain('height="16"');
  });

  it("routes copy and preview through one pure Fehlerlog builder for each drill", () => {
    expect(quizSource).not.toContain("--- Fehlerlog.md");
    expect(quizSource.match(/buildKlausurFehlerlogPatch\(/g)).toHaveLength(1);
    expect(quizSource.match(/buildVergleichFehlerlogPatch\(/g)).toHaveLength(1);
    expect(quizSource).toContain("navigator.clipboard.writeText(klausurPatch)");
    expect(quizSource).toContain("navigator.clipboard.writeText(vergleichPatch)");
    expect(quizSource).toContain("{klausurPatch}");
    expect(quizSource).toContain("{vergleichPatch}");
  });
});
