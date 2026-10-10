import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { InteractiveLessonRunner } from "./InteractiveLessonRunner";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";

describe("InteractiveLessonRunner Component", () => {
  const sampleQuest: ParsedQuestNode = {
    id: "q-1-1",
    chapterId: "chap-1",
    order: 1,
    title: "Wahlsystem der BRD: Erst- und Zweitstimme",
    lessonType: "concept",
    estimatedMinutes: 10,
    prerequisites: [],
    matchedToolId: "wahlsystem-sim",
    matchedToolName: "Wahlsystem-Sim",
    interactiveType: "variable_slider",
    summary: "Einführung in die personalisierte Verhältniswahl und Zweitstimmenmechanik.",
    socraticPrompt: "Warum ist die Zweitstimme wichtiger als die Erststimme?",
    keyConcepts: [],
    xp: 100,
  };

  it("renders first step as Phase 1 theory lecture with progress bar and continue button", () => {
    render(
      <InteractiveLessonRunner
        questNode={sampleQuest}
        fach="SoWi"
        lang="de"
        currentStreak={5}
        onComplete={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText(/Schritt 1:/i)).toBeInTheDocument();
    expect(screen.getByText("1 / 5")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Weiter zum Experiment/i })
    ).toBeInTheDocument();
  });

  it("advances through Phase 1 (Lecture -> MicroWorld) to Phase 2 (Challenge)", () => {
    render(
      <InteractiveLessonRunner
        questNode={sampleQuest}
        fach="SoWi"
        lang="de"
        currentStreak={5}
        onComplete={vi.fn()}
        onClose={vi.fn()}
      />
    );

    // 1. 在第 1 步 (新知精讲微课)，阅读后点击进入实验
    const toExperimentBtn = screen.getByRole("button", {
      name: /Weiter zum Experiment/i,
    });
    fireEvent.click(toExperimentBtn);

    // 2. 进入第 2 步 (动手探究实验微世界)
    expect(screen.getByText(/Schritt 2:/i)).toBeInTheDocument();
    expect(screen.getByText("2 / 5")).toBeInTheDocument();

    const toChallengeBtn = screen.getByRole("button", {
      name: /Jetzt zur Challenge/i,
    });
    fireEvent.click(toChallengeBtn);

    // 3. 进入第 3 步 (考场挑战第一关：核心机制对决)
    expect(screen.getByText(/Schritt 3:/i)).toBeInTheDocument();
    expect(screen.getByText("3 / 5")).toBeInTheDocument();

    // 选择第一项 (正确选项)
    const options = screen
      .getAllByRole("button")
      .filter((b) => b.textContent?.includes("●") || b.textContent?.includes("○"));
    expect(options.length).toBeGreaterThanOrEqual(2);
    fireEvent.click(options[0]);

    // 点击 Überprüfen
    const checkBtn = screen.getByRole("button", { name: "Überprüfen" });
    fireEvent.click(checkBtn);

    // 应该显示正确反馈
    expect(screen.getAllByText(/Richtig!/i).length).toBeGreaterThan(0);

    // 点击 Weiter 进入第 4 步
    const nextBtn = screen.getByRole("button", { name: /Weiter/i });
    fireEvent.click(nextBtn);

    expect(screen.getByText(/Schritt 4:/i)).toBeInTheDocument();
    expect(screen.getByText("4 / 5")).toBeInTheDocument();
  });

  it("supports cancelling lesson and prompts confirmation dialog", () => {
    const handleClose = vi.fn();
    render(
      <InteractiveLessonRunner
        questNode={sampleQuest}
        fach="SoWi"
        lang="de"
        currentStreak={5}
        onComplete={vi.fn()}
        onClose={handleClose}
      />
    );

    const exitBtn = screen.getByTitle("Lektion beenden");
    fireEvent.click(exitBtn);

    expect(screen.getByText(/Lektion wirklich abbrechen\?/i)).toBeInTheDocument();

    const confirmExit = screen.getByRole("button", { name: "Beenden" });
    fireEvent.click(confirmExit);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("resumes session progress from localStorage when present", () => {
    localStorage.setItem(
      "lernvault_session_q-1-1",
      JSON.stringify({
        stepIndex: 1,
        accumulatedXp: 45,
        comboCount: 2,
        mistakes: [],
      })
    );

    render(
      <InteractiveLessonRunner
        questNode={sampleQuest}
        fach="SoWi"
        lang="de"
        currentStreak={5}
        onComplete={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(screen.getByText("2 / 5")).toBeInTheDocument();
    expect(screen.getByText("+45 XP")).toBeInTheDocument();
    localStorage.removeItem("lernvault_session_q-1-1");
  });
});
