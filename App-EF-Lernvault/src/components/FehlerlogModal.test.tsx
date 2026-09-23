import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { FehlerlogModal } from "./FehlerlogModal";
import type { FehlerlogDraft } from "../ai/socratic";

describe("FehlerlogModal.tsx - Interaktiver Fehler-Erfassungs-Dialog", () => {
  const mockDraft: FehlerlogDraft = {
    id: "test-err",
    fach: "SoWi",
    thema: "Mindestlohn",
    fehlertyp: "Logik/Begründung",
    frage: "Führt ein Mindestlohn immer zu Arbeitsplatzverlust?",
    meinFehler: "Monopson-Modell vernachlässigt.",
    korrektur: "Auf unvollkommenen Arbeitsmärkten kann Mindestlohn Beschäftigung stabilisieren.",
    klausursatz: "In monopsonistischen Marktstrukturen steigert ein moderater Mindestlohn die Allokationseffizienz ohne Beschäftigungsabbau.",
    datum: "2026-09-23",
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("rendert alle Eingabefelder mit initialen Werten", () => {
    render(<FehlerlogModal draft={mockDraft} onClose={() => {}} lang="zh" />);

    expect(screen.getByDisplayValue("Mindestlohn")).toBeTruthy();
    expect(screen.getByDisplayValue("Monopson-Modell vernachlässigt.")).toBeTruthy();
    expect(screen.getByDisplayValue(/In monopsonistischen Marktstrukturen/)).toBeTruthy();
    expect(screen.getByText(/08_SoWi\/Klausur-Training\/Fehlerlog\.md/)).toBeTruthy();
  });

  it("aktualisiert die Ziel-Datei dynamisch bei Fach-Wechsel", () => {
    render(<FehlerlogModal draft={mockDraft} onClose={() => {}} lang="zh" />);

    const fachSelect = screen.getByDisplayValue("SoWi (08_SoWi)");
    fireEvent.change(fachSelect, { target: { value: "Philosophie" } });

    expect(screen.getByText(/07_Philosophie\/Klausur-Training\/Fehlerlog\.md/)).toBeTruthy();
  });

  it("kopiert den generierten Patch in die Zwischenablage und zeigt Feedback", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    render(<FehlerlogModal draft={mockDraft} onClose={() => {}} lang="zh" />);

    const copyBtn = screen.getByText("复制 Fehlerlog 补丁");
    fireEvent.click(copyBtn);

    await waitFor(() => {
      expect(writeTextMock).toHaveBeenCalled();
      const copiedText = writeTextMock.mock.calls[0][0];
      expect(copiedText).toContain("08_SoWi/Klausur-Training/Fehlerlog.md");
      expect(copiedText).toContain("Mindestlohn");
      expect(screen.getByText("补丁已复制！")).toBeTruthy();
    });
  });

  it("ruft onClose beim Klick auf Schließen / Abbrechen auf", () => {
    const closeSpy = vi.fn();
    render(<FehlerlogModal draft={mockDraft} onClose={closeSpy} lang="zh" />);

    const cancelBtn = screen.getByText("取消");
    fireEvent.click(cancelBtn);

    expect(closeSpy).toHaveBeenCalledTimes(1);
  });
});
