import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { QuestMapTab } from "./tabs/QuestMapTab";
import { parseBookToQuests } from "./engine/bookIngestParser";
import { generatePacingPlan } from "./engine/pacingPlanner";

describe("QuestMapTab Component", () => {
  const sampleMarkdown = `# Kapitel 1: Wirtschaftsordnung
## 1.1 Marktdynamik und Preisbildung
## 1.2 Staatliche Eingriffe und Mindestpreise
# Kapitel 2: Sozialpolitik
## 2.1 Das Solidarprinzip`;

  const parsedBook = parseBookToQuests("SoWi EF Testbuch", "SoWi", sampleMarkdown);
  const pacingPlan = generatePacingPlan(parsedBook, {
    mode: "balanced",
    customDailyMinutes: 12,
  });

  it("renders clean fallback empty state card when book is null", () => {
    const handleWorkshop = vi.fn();
    render(
      <QuestMapTab
        book={null}
        plan={null}
        lang="de"
        onGoToWorkshop={handleWorkshop}
      />
    );

    expect(screen.getByText("Keine aktive Quest-Landkarte vorhanden")).toBeDefined();
    const workshopBtn = screen.getByText("<- Zur Zerlegungswerkstatt");
    fireEvent.click(workshopBtn);
    expect(handleWorkshop).toHaveBeenCalledTimes(1);
  });

  it("renders Hero Banner, Chapter Milestones and quests when book is provided", () => {
    render(
      <QuestMapTab
        book={parsedBook}
        plan={pacingPlan}
        lang="de"
      />
    );

    // Hero Banner
    expect(screen.getByText("Heutige Mission")).toBeDefined();
    expect(screen.getByText("SoWi EF Testbuch")).toBeDefined();
    expect(screen.getByText("Streak: 5 Tage")).toBeDefined();
    expect(screen.getByText(/~12 min \/ Tag/)).toBeDefined();

    // Chapters
    expect(screen.getByText("Kapitel 1: Wirtschaftsordnung")).toBeDefined();
    expect(screen.getByText("Kapitel 2: Sozialpolitik")).toBeDefined();

    // Quest Nodes (can appear in both hero focus banner and quest stream)
    expect(screen.getAllByText("1.1 Marktdynamik und Preisbildung").length).toBeGreaterThan(0);
    expect(screen.getAllByText("1.2 Staatliche Eingriffe und Mindestpreise").length).toBeGreaterThan(0);
    expect(screen.getAllByText("2.1 Das Solidarprinzip").length).toBeGreaterThan(0);
  });

  it("correctly identifies available and locked quests based on prerequisites", () => {
    render(
      <QuestMapTab
        book={parsedBook}
        plan={pacingPlan}
        lang="de"
        completedQuestIds={[]}
      />
    );

    // 1.1 has no prerequisites -> available ("Starten" button present)
    const startButtons = screen.getAllByText("Starten");
    expect(startButtons.length).toBeGreaterThan(0);

    // 1.2 requires 1.1 -> locked indicator present
    expect(screen.getAllByText(/Voraussetzung:/).length).toBeGreaterThan(0);
  });

  it("triggers onSelectQuest when clicking Starten on an available quest", () => {
    const handleSelect = vi.fn();
    render(
      <QuestMapTab
        book={parsedBook}
        plan={pacingPlan}
        lang="de"
        onSelectQuest={handleSelect}
      />
    );

    const startButtons = screen.getAllByText("Starten");
    fireEvent.click(startButtons[0]);
    expect(handleSelect).toHaveBeenCalled();
  });

  it("allows toggling quest completion locally and updates unlocked quests", () => {
    render(
      <QuestMapTab
        book={parsedBook}
        plan={pacingPlan}
        lang="de"
        completedQuestIds={[]}
      />
    );

    // Initially 0 / 3 gemeistert
    expect(screen.getByText(/0 \/ 3 gemeistert/)).toBeDefined();

    // Click "Als gemeistert markieren" on 1.1
    const markButtons = screen.getAllByText("Als gemeistert markieren");
    fireEvent.click(markButtons[0]);

    // Now 1 quest is mastered
    expect(screen.getByText(/1 \/ 3 gemeistert/)).toBeDefined();
    expect(screen.getAllByText("Wiederholen").length).toBeGreaterThan(0);
  });

  it("opens Socratic guidance and key concepts modal when clicking Details", () => {
    render(
      <QuestMapTab
        book={parsedBook}
        plan={pacingPlan}
        lang="de"
      />
    );

    const detailButtons = screen.getAllByText("Details & Fragen");
    fireEvent.click(detailButtons[0]);

    // Modal is opened
    expect(screen.getByText("Sokratische Leitfrage")).toBeDefined();
    expect(screen.getByText("Jetzt starten")).toBeDefined();

    // Close modal
    const closeBtn = screen.getByLabelText("Schliessen");
    fireEvent.click(closeBtn);
    expect(screen.queryByText("Sokratische Leitfrage")).toBeNull();
  });

  it("filters quests by completion state", () => {
    render(
      <QuestMapTab
        book={parsedBook}
        plan={pacingPlan}
        lang="de"
        completedQuestIds={["q-1-1"]}
      />
    );

    // Click "Offen" filter
    const openFilter = screen.getByText("Offen");
    fireEvent.click(openFilter);

    // q-1-1 should not be displayed in filtered stream
    const headingsAfterOpen = screen.queryAllByRole("heading", { level: 4 });
    const titlesAfterOpen = headingsAfterOpen.map((h) => h.textContent);
    expect(titlesAfterOpen).not.toContain("1.1 Marktdynamik und Preisbildung");
    expect(titlesAfterOpen).toContain("1.2 Staatliche Eingriffe und Mindestpreise");

    // Click "Gemeistert" filter
    const masteredFilter = screen.getByText("Gemeistert");
    fireEvent.click(masteredFilter);

    const headingsAfterMastered = screen.queryAllByRole("heading", { level: 4 });
    const titlesAfterMastered = headingsAfterMastered.map((h) => h.textContent);
    expect(titlesAfterMastered).toContain("1.1 Marktdynamik und Preisbildung");
    expect(titlesAfterMastered).not.toContain("1.2 Staatliche Eingriffe und Mindestpreise");
  });
});
