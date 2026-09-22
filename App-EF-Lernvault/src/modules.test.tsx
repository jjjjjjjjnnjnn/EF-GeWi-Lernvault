/** Komponenten-rauchtests (RTL/jsdom): module rendern + kern-interaktion. */
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Home from "./modules/Home";
import Library from "./modules/Library";
import Settings from "./modules/Settings";
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

describe("Settings", () => {
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

  it("sektionen + sync-felder rendern", () => {
    render(<Settings {...props} />);
    expect(screen.getByText("设置")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("https://mein-server/sync")).toBeInTheDocument();
  });

  it("sync ohne endpoint -> fehlermeldung", async () => {
    const user = userEvent.setup();
    render(<Settings {...props} />);
    await user.click(screen.getByText("↑ 上传"));
    expect(screen.getByText("同步失败——检查地址与网络。")).toBeInTheDocument();
  });
});
