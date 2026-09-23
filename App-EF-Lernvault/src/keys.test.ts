import { afterEach, describe, expect, it } from "vitest";
import {
  GLOBAL_KEYS,
  MODULE_KEYS,
  ONBOARDING_KEYS,
  PER_MODULE_KEYS,
  matchesKey,
  type KeyBinding,
} from "./keys";

function event(init: KeyboardEventInit): KeyboardEvent {
  return new KeyboardEvent("keydown", init);
}

function binding(id: string, bindings: readonly KeyBinding[]): KeyBinding {
  const found = bindings.find((candidate) => candidate.id === id);
  if (!found) throw new Error(`Missing key binding: ${id}`);
  return found;
}

afterEach(() => {
  document.body.replaceChildren();
});

describe("matchesKey", () => {
  const gradeHard = binding("cards-rate-hard", PER_MODULE_KEYS.flashcards);
  const moduleLibrary = binding("module-library", MODULE_KEYS);
  const libraryNext = binding("library-next", PER_MODULE_KEYS.library);
  const help = binding("help", GLOBAL_KEYS);

  it("matches a plain digit only without modifiers", () => {
    expect(matchesKey(event({ key: "2" }), gradeHard)).toBe(true);
    expect(matchesKey(event({ key: "2", altKey: true }), gradeHard)).toBe(false);
    expect(matchesKey(event({ key: "2", ctrlKey: true }), gradeHard)).toBe(false);
    expect(matchesKey(event({ key: "2", metaKey: true }), gradeHard)).toBe(false);
  });

  it("matches Alt+digit only for the module binding", () => {
    expect(matchesKey(event({ key: "2", altKey: true }), moduleLibrary)).toBe(true);
    expect(matchesKey(event({ key: "2", ctrlKey: true }), moduleLibrary)).toBe(false);
    expect(matchesKey(event({ key: "2" }), moduleLibrary)).toBe(false);
  });

  it("rejects Ctrl+digit for plain and Alt bindings", () => {
    expect(matchesKey(event({ key: "2", ctrlKey: true }), gradeHard)).toBe(false);
    expect(matchesKey(event({ key: "2", ctrlKey: true }), moduleLibrary)).toBe(false);
  });

  it("suppresses keyboard bindings while typing", () => {
    const input = document.createElement("input");
    document.body.append(input);
    input.focus();
    expect(matchesKey(event({ key: "2" }), gradeHard)).toBe(false);
    expect(matchesKey(event({ key: "2", altKey: true }), moduleLibrary)).toBe(false);
    expect(matchesKey(event({ key: "ArrowDown" }), libraryNext)).toBe(false);
  });

  it("allows registered primary shortcuts while typing without weakening typing guards", () => {
    const input = document.createElement("input");
    document.body.append(input);
    input.focus();
    const commandPalette = binding("command-palette", GLOBAL_KEYS);
    const event = new KeyboardEvent("keydown", { key: "k", ctrlKey: true });

    expect(matchesKey(event, commandPalette)).toBe(false);
    expect(matchesKey(event, commandPalette, { allowWhileTyping: true })).toBe(true);
  });

  it("matches arrow keys without modifiers", () => {
    expect(matchesKey(event({ key: "ArrowDown" }), libraryNext)).toBe(true);
    expect(matchesKey(event({ key: "ArrowDown", altKey: true }), libraryNext)).toBe(false);
    expect(matchesKey(event({ key: "ArrowUp" }), libraryNext)).toBe(false);
  });

  it("honors an explicitly required Shift modifier", () => {
    expect(matchesKey(event({ key: "?" }), help)).toBe(false);
    expect(matchesKey(event({ key: "?", shiftKey: true }), help)).toBe(true);
  });
});

describe("keyboard registry", () => {
  it("maps Alt 1..9 to learning modules and Alt 0 to settings", () => {
    expect(MODULE_KEYS.map(({ module }) => module)).toEqual([
      "home",
      "library",
      "flashcards",
      "quiz",
      "klausursim",
      "tutor",
      "planner",
      "mindmap",
      "reise",
      "einstellungen",
    ]);
    expect(MODULE_KEYS.map(({ altHint }) => altHint)).toEqual([
      "Alt 1",
      "Alt 2",
      "Alt 3",
      "Alt 4",
      "Alt 5",
      "Alt 6",
      "Alt 7",
      "Alt 8",
      "Alt 9",
      "Alt 0",
    ]);
  });

  it("exports Reise and onboarding actions as explicit bindings", () => {
    expect(PER_MODULE_KEYS.reise.map(({ keys }) => keys)).toEqual(["Enter / →", "Space"]);
    expect(ONBOARDING_KEYS[0].keys).toBe("Enter");
  });
});
