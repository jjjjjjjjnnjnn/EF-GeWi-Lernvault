import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SocraticDrawer } from "./components/SocraticDrawer";
import { PlayableStudioTab } from "./tabs/PlayableStudioTab";
import type { ParsedQuestNode } from "./engine/bookIngestParser";

const MOCK_QUEST: ParsedQuestNode = {
  id: "test_quest_01",
  chapterId: "test_chap_01",
  order: 1,
  title: "Wahlsystem & Bundestagswahl (Erst- vs Zweitstimme)",
  lessonType: "concept",
  estimatedMinutes: 10,
  prerequisites: [],
  matchedToolId: "scenario_tree",
  matchedToolName: "ScenarioDecisionTree",
  interactiveType: "scenario_tree",
  summary: "Personalisierte Verhältniswahl mit Erst- und Zweitstimme.",
  socraticPrompt: "Welche Stimme entscheidet wirklich über die Kanzlermehrheit?",
  keyConcepts: [
    {
      term: "Zweitstimme",
      definitionDE: "Die wahlentscheidende Richtungsstimme für die Sitzverteilung.",
      definitionZH: "决定政党议席分配的核心关键选票。",
      analogy: "Die Sitzplatzkontingentierung im Bundestag.",
      examTrap: "Erststimme als wichtiger ansehen.",
    },
  ],
  xp: 35,
};

describe("SocraticDrawer Component", () => {
  it("does not render when isOpen is false", () => {
    const { container } = render(
      <SocraticDrawer
        questNode={MOCK_QUEST}
        isOpen={false}
        onClose={() => {}}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders when isOpen is true with header and mode tabs", () => {
    render(
      <SocraticDrawer
        questNode={MOCK_QUEST}
        isOpen={true}
        onClose={() => {}}
        lang="de"
      />
    );

    expect(screen.getByText("Sokratischer Begleiter")).toBeDefined();
    expect(screen.getByText("1. Hier hakt es")).toBeDefined();
    expect(screen.getByText("2. Zu einfach")).toBeDefined();
    expect(screen.getByText("3. Teste mich")).toBeDefined();
  });

  it("calls onClose when close button is clicked", () => {
    const closeSpy = vi.fn();
    render(
      <SocraticDrawer
        questNode={MOCK_QUEST}
        isOpen={true}
        onClose={closeSpy}
        lang="de"
      />
    );

    const closeBtn = screen.getByLabelText("Schublade schließen");
    fireEvent.click(closeBtn);
    expect(closeSpy).toHaveBeenCalledTimes(1);
  });

  it("switches to 'Zu einfach' mode and displays dialectical probes", () => {
    render(
      <SocraticDrawer
        questNode={MOCK_QUEST}
        isOpen={true}
        onClose={() => {}}
        lang="de"
      />
    );

    const challengeBtn = screen.getByText("2. Zu einfach");
    fireEvent.click(challengeBtn);

    expect(screen.getByText("Sokratische Dialektik & Vertiefung")).toBeDefined();
    expect(screen.getByText("Dialektische Prüffragen")).toBeDefined();
  });

  it("switches to 'Teste mich' mode and evaluates text input against 15 NP rubric", () => {
    const recordMistakeSpy = vi.fn();
    render(
      <SocraticDrawer
        questNode={MOCK_QUEST}
        isOpen={true}
        onClose={() => {}}
        onRecordMistake={recordMistakeSpy}
        lang="de"
      />
    );

    // Switch to Teste mich
    const testModeBtn = screen.getByText("3. Teste mich");
    fireEvent.click(testModeBtn);

    // Find input textarea
    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, {
      target: {
        value: "Die Zweitstimme ist die wahlentscheidende Stimme fuer die personalisierte Verhaeltniswahl im Deutschen Bundestag.",
      },
    });

    // Click evaluate
    const evalBtn = screen.getByText("Antwort prüfen (15 NP)");
    fireEvent.click(evalBtn);

    // Score breakdown should appear
    expect(screen.getAllByText(/15 NP/).length).toBeGreaterThan(0);
    expect(screen.getByText("15-NP-Musterlösung:")).toBeDefined();

    // In Fehlerlog erfassen button
    const mistakeBtn = screen.getByText("In Fehlerlog erfassen");
    fireEvent.click(mistakeBtn);
    expect(recordMistakeSpy).toHaveBeenCalledTimes(1);
    expect(recordMistakeSpy.mock.calls[0][0]).toContain("<!-- EF-Lernvault Fehlerlog & Diagnose-Patch -->");
  });
});

describe("PlayableStudioTab Component", () => {
  it("renders empty state fallback when no quest is provided, with option to load demo", () => {
    const backToMapSpy = vi.fn();
    render(
      <PlayableStudioTab
        questNode={null}
        onBackToMap={backToMapSpy}
        lang="de"
      />
    );

    expect(screen.getByText("Keine aktive Quest ausgewählt")).toBeDefined();
    const demoBtn = screen.getByText("Demo-Quest starten (Wahlsystem SoWi)");
    fireEvent.click(demoBtn);

    // Now demo quest should be loaded
    expect(screen.getByText("Wahlsystem & Bundestagswahl (Erst- vs. Zweitstimme)")).toBeDefined();
  });

  it("renders quest details and navigates through 5 stages in steps mode", () => {
    const completeSpy = vi.fn();
    render(
      <PlayableStudioTab
        questNode={MOCK_QUEST}
        onCompleteQuest={completeSpy}
        lang="de"
      />
    );

    expect(screen.getByText("Wahlsystem & Bundestagswahl (Erst- vs Zweitstimme)")).toBeDefined();
    expect(screen.getByText("Stufe 1 · Alltagsphänomen & Kognitive Dissonanz")).toBeDefined();

    // Next step -> Stage 2
    const nextBtn = screen.getByText("Nächste Stufe ->");
    fireEvent.click(nextBtn);
    expect(screen.getByText("Stufe 2 · Erste Prinzipien & KLP NRW")).toBeDefined();

    // Next step -> Stage 3 (Mikrowelt)
    fireEvent.click(screen.getByText("Nächste Stufe ->"));
    expect(screen.getByText("Stufe 3 · Dynamische Interaktionswerkzeuge")).toBeDefined();

    // Next step -> Stage 4 (Klausur 15 NP)
    fireEvent.click(screen.getByText("Nächste Stufe ->"));
    expect(screen.getByText("Stufe 4 · Abiturrelevante Klausurpraxis")).toBeDefined();

    // Next step -> Stage 5 (Meisterschaft)
    fireEvent.click(screen.getByText("Nächste Stufe ->"));
    expect(screen.getByText("Stufe 5 · Kognitiver Abschluss & Reflexion")).toBeDefined();

    // Complete quest
    const finishBtn = screen.getByText("Quest abschließen & +35 XP sichern");
    fireEvent.click(finishBtn);
    expect(completeSpy).toHaveBeenCalledWith("test_quest_01", 35);
  });

  it("toggles between 5-stage steps mode and continuous document view", () => {
    render(
      <PlayableStudioTab
        questNode={MOCK_QUEST}
        lang="de"
      />
    );

    const docToggle = screen.getByText("Langtext-Dokument");
    fireEvent.click(docToggle);

    expect(screen.getByText("Stage 1")).toBeDefined();
    expect(screen.getByText("Stage 2")).toBeDefined();
    expect(screen.getByText("Stage 3")).toBeDefined();
    expect(screen.getByText("Stage 4")).toBeDefined();
  });

  it("opens and closes Socratic Drawer via trigger button", () => {
    render(
      <PlayableStudioTab
        questNode={MOCK_QUEST}
        lang="de"
      />
    );

    const socraticBtn = screen.getByText("Sokratischer Begleiter");
    fireEvent.click(socraticBtn);

    expect(screen.getByText("1. Hier hakt es")).toBeDefined();

    const closeBtn = screen.getByLabelText("Schublade schließen");
    fireEvent.click(closeBtn);
  });
});
