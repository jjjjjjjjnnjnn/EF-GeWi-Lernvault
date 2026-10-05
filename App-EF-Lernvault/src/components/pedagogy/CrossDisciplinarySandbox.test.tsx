import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { CrossDisciplinarySandbox } from "./CrossDisciplinarySandbox";

describe("CrossDisciplinarySandbox (Interdisziplinäres Wissens-Radar)", () => {
  it("renders with default alienation cluster and shows all 4 subject nodes", () => {
    render(<CrossDisciplinarySandbox lang="zh" />);

    expect(screen.getByTestId("cross-disciplinary-sandbox")).toBeInTheDocument();
    expect(screen.getByText("跨学科联动树形图与考点全景沙盘")).toBeInTheDocument();

    // Check cluster tabs
    expect(screen.getByText("异化劳动与资本")).toBeInTheDocument();
    expect(screen.getByText("正义论与福利国家")).toBeInTheDocument();
    expect(screen.getByText("变化率与守恒")).toBeInTheDocument();
    expect(screen.getByText("论辩修辞与中继")).toBeInTheDocument();

    // In default alienation cluster, Deutsch, Philosophie, SoWi, and Englisch are present
    expect(screen.getAllByText(/Deutsch/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Philosophie/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/SoWi/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Englisch/i).length).toBeGreaterThan(0);
  });

  it("switches to justice & welfare cluster and updates content", () => {
    render(<CrossDisciplinarySandbox lang="de" />);

    const justiceTab = screen.getByText("Gerechtigkeit & Staat");
    fireEvent.click(justiceTab);

    expect(screen.getAllByText(/John Rawls/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Mindestlohn-Kontroverse/i).length).toBeGreaterThan(0);
  });

  it("triggers onJumpToSubject and onJumpToLibrary callbacks properly", () => {
    const onJumpToSubject = vi.fn();
    const onJumpToLibrary = vi.fn();

    render(
      <CrossDisciplinarySandbox
        lang="zh"
        onJumpToSubject={onJumpToSubject}
        onJumpToLibrary={onJumpToLibrary}
      />
    );

    // Click jump button in detail panel or table
    const jumpButtons = screen.getAllByRole("button", { name: /直达【Deutsch】知识树/i });
    expect(jumpButtons.length).toBeGreaterThan(0);
    fireEvent.click(jumpButtons[0]!);

    expect(onJumpToSubject).toHaveBeenCalledWith("Deutsch", "deutsch/if2/erzaehltexte");

    const noteButtons = screen.getAllByRole("button", { name: /查阅研习笔记/i });
    expect(noteButtons.length).toBeGreaterThan(0);
    fireEvent.click(noteButtons[0]!);

    expect(onJumpToLibrary).toHaveBeenCalledWith(
      expect.stringContaining("Kafka"),
      "Deutsch",
      "01_Deutsch/Texte-Analyse/Kafka-Die-Verwandlung-Epik.md"
    );
  });
});
