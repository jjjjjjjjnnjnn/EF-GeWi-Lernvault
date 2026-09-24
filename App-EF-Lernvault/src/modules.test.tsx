/** Komponenten-rauchtests (RTL/jsdom): module rendern + kern-interaktion. */
import { readFileSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// reise.ts zieht die exemplar-lektion per `?raw` ausserhalb approved-roots:
// fuer render-tests entkoppeln (parser gehoert reise.test-sphaere, hier nur UI).
vi.mock("./reise", () => ({
  exemplarReise: {
    id: "kurs-1",
    path: "Lernreise/kurs-1.md",
    fach: "SoWi",
    thema: "Kurs",
    level: 1,
    ziel: "Klausur",
    xp: 100,
    schritte: [
      { typ: "entdecken", stepNumber: 1, title: "Entdecken", rawText: "Text hier.", blocks: [{ kind: "p", text: "Text hier.", lang: "de" }] },
      { typ: "check", stepNumber: 2, title: "Check", items: [{ id: "q1", frage: "Frage?", antwort: "Antwort." }] },
    ],
  },
}));

vi.mock("./ai/autoDispatch", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./ai/autoDispatch")>();
  return {
    ...actual,
    autoDispatchChat: vi.fn(async () => ({
      reply: "Befund [Ref: #h-deadbeef]",
      source: "llm" as const,
    })),
  };
});

import App from "./App";
import Home from "./modules/Home";
import Library from "./modules/Library";
import Mindmap from "./modules/Mindmap";
import Flashcards from "./modules/Flashcards";
import Settings, { wipePersistedAppData } from "./modules/Settings";
import ReiseModule from "./modules/Reise";
import Tutor from "./modules/Tutor";
import HelpOverlay from "./components/HelpOverlay";
import Palette from "./components/Palette";
import { GLOBAL_SHORTCUTS, MODULE_KEYS } from "./keys";
import {
  FSRS_STORAGE_KEY,
  ONBOARDING_STORAGE_KEY,
  allPersistedKeys,
} from "./engine/storageKeys";
import { clearAllSessions } from "./storage/tutorHistory";
import type { VaultCard, VaultNote } from "./vault/parser";

const note = (thema: string, fach = "SoWi"): VaultNote => ({
  id: `08_SoWi/${thema}.md`,
  path: `08_SoWi/${thema}.md`,
  fach,
  thema,
  operatoren: ["darstellen"],
  klausurrelevant: true,
  datum: "2026-09-01",
  tags: ["EF"],
  blocks: [{ kind: "p", text: `Deutscher Satz zu ${thema}.`, lang: "de" }],
});

const card = (id: string): VaultCard => ({
  id, front: id, back: "x", example: "", fach: "SoWi", thema: "T", source: "s.csv",
});

function completeOnboarding(): void {
  localStorage.setItem(
    ONBOARDING_STORAGE_KEY,
    JSON.stringify({
      version: 1,
      done: true,
      faecher: ["SoWi"],
      klausurDate: "2027-06-30",
      demo: false,
    })
  );
}

function uiSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return uiSourceFiles(path);
    return /\.(ts|tsx|css)$/.test(entry.name) && !/\.(test|spec)\.(ts|tsx)$/.test(entry.name)
      ? [path]
      : [];
  });
}

beforeEach(() => {
  localStorage.clear();
  window.history.replaceState({}, "", "/");
});

describe("UI source contract", () => {
  it("contains no emoji, active shadows, or italic utility", () => {
    const violations = uiSourceFiles(resolve(process.cwd(), "src")).flatMap((file) => {
      const source = readFileSync(file, "utf8");
      return [
        ...Array.from(source.matchAll(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu), (match) => `emoji:${match[0]}`),
        ...Array.from(source.matchAll(/\bshadow-(?!none\b)[\w-]+/g), (match) => `shadow:${match[0]}`),
        ...Array.from(source.matchAll(/\bitalic\b/g), (match) => `italic:${match[0]}`),
      ].map((violation) => `${file}:${violation}`);
    });

    expect(violations).toEqual([]);
  });

  it("keeps Tutor on semantic tokens, compact controls, and the source icon contract", () => {
    const source = readFileSync(resolve(process.cwd(), "src/modules/Tutor.tsx"), "utf8");
    const allowedHex = new Set<string>();
    const hexViolations = Array.from(source.matchAll(/#[0-9a-f]{3,8}/gi))
      .filter((match) => !allowedHex.has(match[0].toLowerCase()))
      .map((match) => `hex:${match[0]}`);
    const violations = [
      ...hexViolations,
      ...Array.from(source.matchAll(/\bshadow-(?!none\b)[\w-]+/g), (match) => `shadow:${match[0]}`),
      ...Array.from(source.matchAll(/\bitalic\b/g), (match) => `italic:${match[0]}`),
      ...Array.from(source.matchAll(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}]/gu), (match) => `emoji:${match[0]}`),
      ...Array.from(source.matchAll(/\bboxShadow\s*[:=]/g), (match) => `box-shadow:${match[0]}`),
      ...Array.from(source.matchAll(/\bborderRadius\s*[:=]/g), (match) => `radius:${match[0]}`),
      ...Array.from(source.matchAll(/\brounded-(?:lg|xl|2xl|3xl)\b/g), (match) => `large-radius:${match[0]}`),
      ...Array.from(source.matchAll(/\brounded-\[(?!\/?var\(--radius\)\])[^\]]+\]/g), (match) => `inline-radius:${match[0]}`),
      ...Array.from(source.matchAll(/\btext-\[(?:9|10|11)px\]/g), (match) => `small-text:${match[0]}`),
      ...Array.from(source.matchAll(/<(?:button|a)\b[^>]*>\s*[+·×✕✓✔←→↑↓⚙]+\s*<\/(?:button|a)>/gu), (match) => `symbol-control:${match[0]}`),
    ];
    const iconRequirements = [
      { label: "width", pattern: /\bwidth="16"/ },
      { label: "height", pattern: /\bheight="16"/ },
      { label: "viewBox", pattern: /\bviewBox="0 0 16 16"/ },
      { label: "fill", pattern: /\bfill="none"/ },
      { label: "stroke", pattern: /\bstroke="currentColor"/ },
      { label: "aria-hidden", pattern: /\baria-hidden="true"/ },
    ];
    const iconViolations = Array.from(source.matchAll(/<svg\b[^>]*>/g)).flatMap((match, index) =>
      iconRequirements
        .filter(({ pattern }) => !pattern.test(match[0]))
        .map(({ label }) => `icon-${index + 1}:${label}`)
    );

    expect([...violations, ...iconViolations]).toEqual([]);
    const politeStatusTags = Array.from(source.matchAll(/<[^>]+\brole="status"[^>]*>/g))
      .map((match) => match[0])
      .filter((tag) => /\baria-live="polite"/.test(tag));

    expect(source).toContain("group-focus-within:opacity-100");
    expect(politeStatusTags.length).toBeGreaterThanOrEqual(3);
    expect(source).toContain("aria-busy={isThinking}");
  });
});

describe("Home", () => {
  it("rendert statistiken + meisterschaft", () => {
    render(<Home lang="zh" cards={[card("a"), card("b")]} />);
    expect(screen.getByText("今日学习")).toBeInTheDocument();
    expect(screen.getByText("各科掌握度")).toBeInTheDocument();
    // 2 neue karten
    expect(screen.getByText("新卡")).toBeInTheDocument();
  });

  it("nextUp ohne faellige -> leer-text", () => {
    render(<Home lang="de" cards={[]} />);
    expect(screen.getByText("Heute lernen")).toBeInTheDocument();
  });
});

describe("Library", () => {
  it("liste + lesen + fach-badge", () => {
    render(<Library query="" vault={[note("ThemaA"), note("ThemaB")]} />);
    // je 1x liste + 1x lese-spalte (erstes thema geoeffnet)
    expect(screen.getAllByText("ThemaA").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("ThemaB")).toBeInTheDocument();
    expect(screen.getByText(/Alle \(2\)/)).toBeInTheDocument();
  });

  it("query filtert + chip-loeschen ruft callback", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();
    render(<Library query="ThemaA" vault={[note("ThemaA"), note("ThemaB")]} onClearQuery={onClear} />);
    expect(screen.queryByText("ThemaB")).not.toBeInTheDocument();
    expect(screen.getByText(/1 Treffer/)).toBeInTheDocument();
    await user.click(screen.getByTitle(/Suche löschen/));
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("propagates subject changes to app-level state", async () => {
    const user = userEvent.setup();
    const onSubjectChange = vi.fn();
    render(
      <Library
        query=""
        vault={[note("ThemaA"), note("ThemaB", "Deutsch")]}
        onSubjectChange={onSubjectChange}
      />
    );

    await user.click(screen.getByTitle("Deutsch / 德语 (1 Notizen)"));
    expect(onSubjectChange).toHaveBeenCalledWith("Deutsch");
  });
});

describe("Mindmap", () => {
  it("renders a single note and many linked notes without crashing", () => {
    const single = note("Einzelthema");
    const { rerender } = render(<Mindmap lang="de" vaultNotes={[single]} />);
    expect(document.querySelector('[data-node-kind="root"]')).not.toBeNull();
    expect(document.querySelector('[data-node-kind="subject"]')).not.toBeNull();
    expect(document.querySelector('[data-node-kind="topic"]')).not.toBeNull();

    const many = Array.from({ length: 30 }, (_, index) => ({
      ...note(`Thema ${index + 1}`),
      blocks: [
        {
          kind: "p" as const,
          text: index === 29 ? "Thema 30" : `[[Thema ${index + 2}]]`,
          lang: "de" as const,
        },
      ],
    }));
    rerender(<Mindmap lang="de" vaultNotes={many} />);
    expect(document.querySelectorAll('[data-node-kind="topic"]')).toHaveLength(30);
    expect(document.querySelectorAll("svg line")).toHaveLength(60);
  });
});

describe("Flashcards recall gate", () => {
  it("keeps rating controls unavailable until the answer is revealed", async () => {
    const user = userEvent.setup();
    render(<Flashcards lang="de" vault={[card("recall-card")]} />);

    expect(screen.queryByRole("button", { name: /Again 1/ })).not.toBeInTheDocument();
    const flipButton = screen.getByRole("button", { name: "Antwort anzeigen" });
    expect(flipButton).toHaveAttribute("aria-pressed", "false");

    await user.click(flipButton);

    expect(screen.getByRole("button", { name: "Antwort verbergen" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /Again 1/ })).toBeEnabled();
    await user.click(screen.getByRole("button", { name: /Easy 4/ }));
    expect(screen.getByText("Fertig für heute")).toBeInTheDocument();
  });

  it("does not grade a card with Alt, Ctrl, or Meta plus a digit", async () => {
    const user = userEvent.setup();
    render(<Flashcards lang="de" vault={[card("modifier-card")]} />);
    await user.click(screen.getByRole("button", { name: "Antwort anzeigen" }));

    for (const modifier of ["altKey", "ctrlKey", "metaKey"] as const) {
      fireEvent.keyDown(window, { key: "1", [modifier]: true });
      expect(screen.getByText("modifier-card")).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /Again 1/ })).toBeEnabled();
    }
  });

  it("routes Alt+2 to Library without grading the active flashcard", async () => {
    const user = userEvent.setup();
    completeOnboarding();
    window.history.replaceState({}, "", "/?tab=flashcards");
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Antwort anzeigen" }));
    fireEvent.keyDown(window, { key: "2", code: "Digit2", altKey: true });

    expect(localStorage.getItem(FSRS_STORAGE_KEY)).toBeNull();
    expect(document.querySelector('input[title="/"]')).not.toBeNull();
  });

  it("focuses Library search after slash switches from another module", async () => {
    completeOnboarding();
    window.history.replaceState({}, "", "/?tab=home");
    render(<App />);

    fireEvent.keyDown(window, { key: "/" });

    const search = document.querySelector<HTMLInputElement>('input[title="/"]');
    expect(search).not.toBeNull();
    await waitFor(() => expect(document.activeElement).toBe(search));
  });
});

describe("Keyboard UI registry", () => {
  it("derives the Settings palette hint as Alt 0", () => {
    const settings = MODULE_KEYS.find((binding) => binding.module === "einstellungen");
    expect(settings).toBeDefined();
    render(
      <Palette
        open
        onClose={() => undefined}
        items={[
          {
            id: "settings",
            shortcutId: settings!.id,
            group: "Aktionen",
            label: "Einstellungen",
            hint: "veraltet",
            run: () => undefined,
          },
        ]}
      />
    );

    expect(screen.getByText("Alt 0")).toBeInTheDocument();
    expect(screen.queryByText("Alt 9")).not.toBeInTheDocument();
  });

  it("renders every help-overlay shortcut from the registry", () => {
    render(<HelpOverlay open onClose={() => undefined} lang="de" />);
    const dialog = screen.getByRole("dialog");
    const expectedModuleHints = MODULE_KEYS.map((binding) => binding.altHint);
    const renderedModuleHints = within(dialog)
      .getAllByText(/^Alt ([0-9]|W|B)$/)
      .map((element) => element.textContent);
    expect(renderedModuleHints).toEqual(expectedModuleHints);
    for (const shortcut of GLOBAL_SHORTCUTS) {
      expect(within(dialog).getAllByText(shortcut.keys).length).toBeGreaterThan(0);
      expect(within(dialog).getAllByText(shortcut.de).length).toBeGreaterThan(0);
    }
  });
});

describe("Tutor overlays", () => {
  afterEach(async () => {
    await clearAllSessions();
  });

  it("gives the CCR reference dialog semantics and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<Tutor lang="de" vaultNotes={[note("Teilhabe")]} />);

    const input = await screen.findByPlaceholderText(/Frage an den KI-Tutor/);
    await user.type(input, "Teilhabe");
    await user.click(screen.getByRole("button", { name: "Senden" }));
    await user.click(await screen.findByRole("button", { name: /\[Ref:/ }));

    const dialog = screen.getByRole("dialog", { name: /CCR #h-deadbeef/ });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
  });

  it("uses real session buttons and reveals their actions during keyboard focus", async () => {
    const user = userEvent.setup();
    render(<Tutor lang="de" />);
    await screen.findByRole("button", { name: "Neue Unterhaltung" });

    await user.click(screen.getByRole("button", { name: "Neuer Chat" }));
    const sessionButtons = await screen.findAllByRole("button", { name: "Neue Unterhaltung" });
    const inactiveSession = sessionButtons.find((button) => button.getAttribute("aria-current") !== "true");
    expect(inactiveSession).toBeInstanceOf(HTMLButtonElement);

    inactiveSession!.focus();
    await user.keyboard("{Enter}");
    await waitFor(() => expect(inactiveSession).toHaveAttribute("aria-current", "true"));

    const row = inactiveSession!.parentElement as HTMLElement;
    const renameButton = within(row).getByRole("button", { name: "Chat umbenennen" });
    renameButton.focus();
    expect(renameButton).toHaveFocus();
    expect(renameButton.parentElement).toHaveClass("group-focus-within:opacity-100");
  });

  it("renders German reading in serif with the smaller Chinese translation beneath it", async () => {
    render(<Tutor lang="de" />);
    const german = await screen.findByText(
      "Willkommen! Ich bin dein lokaler EF-Tutor. Stelle Fragen zu SoWi, Philosophie oder Mathe. Jede Auskunft wird direkt aus deinen Vault-Notizen belegt.",
      { selector: "p.de-reading" }
    );
    const chinese = await screen.findByText(
      "你好！我是你的本地高中助教。支持 SoWi、哲学与核心公式提问，所有实质断言均附带知识库精确出处。",
      { selector: "p.zh-translation" }
    );

    expect(german).toHaveClass("de-reading");
    expect(chinese).toHaveClass("zh-translation");
    expect(german.compareDocumentPosition(chinese)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
  });
});

describe("Reise", () => {
  it("player rendert exemplar-schritt (engine aus -> kein KI-aufruf)", () => {
    render(<ReiseModule lang="zh" />);
    expect(screen.getByText("Text hier.")).toBeInTheDocument();
    expect(screen.getByText(/Kurs/)).toBeInTheDocument();
  });

  it("uses Enter for registered next-step navigation only after unlock", async () => {
    const user = userEvent.setup();
    render(<ReiseModule lang="zh" />);

    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.getByText(/步骤 1 \/ 2/)).toBeInTheDocument();

    await user.click(screen.getByText("已理解，下一步 (+5 XP) →"));
    fireEvent.keyDown(window, { key: "Enter" });
    expect(screen.getByText(/步骤 2 \/ 2/)).toBeInTheDocument();
  });
});
  const props = {
    lang: "zh" as const,
    onLangChange: vi.fn(),
    vaultConnected: false,
    vaultMsg: "",
    onOpenVault: vi.fn(),
    onExportFsrs: vi.fn(),
    onExportXp: vi.fn(),
    onRedoOnboarding: vi.fn(),
    onOpenHelp: vi.fn(),
  };

describe("Settings", () => {
  it("wipes every centrally registered persisted key", () => {
    const removed: string[] = [];
    wipePersistedAppData({
      removeItem: (key) => removed.push(key),
    });

    expect(removed).toEqual(allPersistedKeys());
    expect(new Set(removed).size).toBe(19);
  });

  it("sektionen + sync-felder rendern", () => {
    render(<Settings {...props} />);
    expect(screen.getByText("设置")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://mein-server/sync")).toBeInTheDocument();
  });

  it("vektor-sektion rendert (idle, kein auto-download)", async () => {
    const user = userEvent.setup();
    render(<Settings {...props} />);
    await user.click(screen.getByText("高级检索"));
    expect(screen.getByText("本地向量检索L1")).toBeInTheDocument();
    expect(screen.getByText("未加载·RAG-L0生效中（不会卡死）")).toBeInTheDocument();
    expect(screen.getByText("现在加载向量模型（约300MB）")).toBeInTheDocument();
  });

  it("sync ohne endpoint -> fehlermeldung", async () => {
    const user = userEvent.setup();
    render(<Settings {...props} />);
    await user.click(screen.getByRole("button", { name: "上传" }));
    expect(screen.getByRole("status")).toHaveTextContent("同步失败——检查地址与网络。");
  });
});
