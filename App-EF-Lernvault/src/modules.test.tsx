/** Komponenten-rauchtests (RTL/jsdom): module rendern + kern-interaktion. */
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
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

import Home from "./modules/Home";
import Library from "./modules/Library";
import Settings from "./modules/Settings";
import ReiseModule from "./modules/Reise";
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
});

describe("Reise", () => {
  it("player rendert exemplar-schritt (engine aus -> kein KI-aufruf)", () => {
    render(<ReiseModule lang="zh" />);
    expect(screen.getByText("Text hier.")).toBeInTheDocument();
    expect(screen.getByText(/Kurs/)).toBeInTheDocument();
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
    await user.click(screen.getByText("↑ 上传"));
    expect(screen.getByText("同步失败——检查地址与网络。")).toBeInTheDocument();
  });
});
