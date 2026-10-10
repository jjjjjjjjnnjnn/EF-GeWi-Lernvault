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

  it("renders Study-Mate elements and supports toggling adaptive probes", () => {
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

    // Verify Story Hook & Intuitions-Check presence
    expect(screen.getByText(/Story-Szenario & Rolle/i)).toBeInTheDocument();
    expect(screen.getByText(/Intuitions-Check/i)).toBeInTheDocument();

    // Select Option A to reveal Feynman-Klartext mechanism breakdown
    const optionABtn = screen.getByRole("button", { name: /\[ A \]/i });
    fireEvent.click(optionABtn);
    expect(screen.getByText(/Feynman-Klartext/i)).toBeInTheDocument();
    expect(screen.getByText(/Zwei Brillen/i)).toBeInTheDocument();

    // Verify Study-Mate 3 adaptive probes are rendered
    const simplerBtn = screen.getByRole("button", { name: /Einfacher \/ Klartext/i });
    const deeperBtn = screen.getByRole("button", { name: /Vertiefung \/ Edge Case/i });
    const quizBtn = screen.getByRole("button", { name: /Check \/ Schnelltest/i });

    expect(simplerBtn).toBeInTheDocument();
    expect(deeperBtn).toBeInTheDocument();
    expect(quizBtn).toBeInTheDocument();

    // 1. Click "Einfacher" -> expands simpler probe
    fireEvent.click(simplerBtn);
    expect(screen.getByText(/Feynman-Abstraktion senken/i)).toBeInTheDocument();

    // 2. Click "Vertiefung" -> switches to deeper probe
    fireEvent.click(deeperBtn);
    expect(screen.getByText(/Kritischer Grenzfall & Paradoxon/i)).toBeInTheDocument();

    // 3. Click "Check" -> switches to quick quiz probe
    fireEvent.click(quizBtn);
    expect(screen.getByText(/Sofortige Verständniskontrolle/i)).toBeInTheDocument();

    // Reveal quick quiz answer
    const revealAnswerBtn = screen.getByRole("button", { name: /Antwort einblenden/i });
    fireEvent.click(revealAnswerBtn);
    expect(screen.getByText(/Musterantwort:/i)).toBeInTheDocument();
  });

  it("opens, displays and closes attached knowledge note drawer", () => {
    const writeTextMock = vi.fn();
    Object.assign(navigator, {
      clipboard: {
        writeText: writeTextMock,
      },
    });

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

    // Click [Notiz] button in header
    const openNoteBtn = screen.getByTitle("Wissensnotiz öffnen");
    fireEvent.click(openNoteBtn);

    // Note drawer should be visible with 5 sections
    expect(screen.getByText(/1\. Feynman-Essenz/i)).toBeInTheDocument();
    expect(screen.getByText(/2\. Zwei Brillen & Kontroverse/i)).toBeInTheDocument();
    expect(screen.getByText(/3\. Klausur-Lösungsansatz/i)).toBeInTheDocument();
    expect(screen.getByText(/4\. 15 NP Klausur-Formulierungen/i)).toBeInTheDocument();
    expect(screen.getByText(/5\. Typische Klausur-Fallen/i)).toBeInTheDocument();

    // Test clipboard copy
    const copyBtn = screen.getByRole("button", { name: /\[Kopieren\]/i });
    fireEvent.click(copyBtn);
    expect(writeTextMock).toHaveBeenCalled();
    expect(screen.getByText(/\[Kopiert!\]/i)).toBeInTheDocument();

    // Close note drawer
    const closeBtn = screen.getByTitle("Schließen");
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/1\. Feynman-Essenz/i)).not.toBeInTheDocument();
  });

  it("interactively runs Intuitions-Check: choosing Option A or B reveals authentic KLP mechanism feedback", () => {
    const marketQuest: ParsedQuestNode = {
      id: "q-market-1",
      chapterId: "chap-market",
      order: 1,
      title: "Das Modell des vollkommenen Marktes (Angebot & Nachfrage)",
      lessonType: "concept",
      estimatedMinutes: 10,
      prerequisites: [],
      matchedToolId: "magisches-viereck",
      matchedToolName: "Markt-Labor",
      interactiveType: "variable_slider",
      summary: "Einführung in Angebot, Nachfrage, Marktgleichgewicht und Preismechanismus.",
      socraticPrompt: "Warum räumt der freie Preis den Markt, ignoriert aber soziale Gerechtigkeit?",
      keyConcepts: [],
      xp: 100,
    };

    render(
      <InteractiveLessonRunner
        questNode={marketQuest}
        fach="SoWi"
        lang="zh"
        currentStreak={3}
        onComplete={vi.fn()}
        onClose={vi.fn()}
      />
    );

    // Verify Blizzard scenario is rendered in Step 1
    expect(screen.getByText(/暴风雪导致全城取暖煤气供应中断/i)).toBeInTheDocument();
    expect(screen.getByText(/如果完全交给‘自由市场（Markt）’，会发生什么？/i)).toBeInTheDocument();

    // Click Choice A
    const choiceABtn = screen.getByRole("button", { name: /商家疯狂涨价/i });
    fireEvent.click(choiceABtn);

    // Verify instant mechanism card appears with authentic KLP termini
    expect(screen.getByText(/这就是完全竞争市场冷酷而高效的本质！/i)).toBeInTheDocument();
    expect(screen.getByText(/稀缺信号（Knappheitssignal）/i)).toBeInTheDocument();
    expect(screen.getByText(/Allokationsfunktion/i)).toBeInTheDocument();

    // Switch to Choice B
    const choiceBBtn = screen.getByRole("button", { name: /政府限价 50 欧/i });
    fireEvent.click(choiceBBtn);

    // Verify reaction updates to Choice B
    expect(screen.getByText(/政府限价虽然维持了平价，却直接引发严重的‘超额需求/i)).toBeInTheDocument();

    // Advance to next step
    const advanceBtn = screen.getByRole("button", { name: /进入互动实验探索/i });
    fireEvent.click(advanceBtn);

    expect(screen.getByText(/第 2 步/i)).toBeInTheDocument();
  });
});
