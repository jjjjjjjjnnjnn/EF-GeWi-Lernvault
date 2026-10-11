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

    // 1. 在第 1 步 (新知精讲微课)：未站队时按钮置灰（温和门控），选择 A 后解锁
    const toExperimentBtn = screen.getByRole("button", {
      name: /Weiter zum Experiment/i,
    });
    expect(toExperimentBtn).toBeDisabled();
    const intuitionABtn = screen.getByRole("button", { name: /\[ A \]/i });
    fireEvent.click(intuitionABtn);
    expect(toExperimentBtn).not.toBeDisabled();
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

  it("renders flat Intuitions-Konflikt and reveals instant causal mechanism upon choice", () => {
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

    // Verify flat unnested scenario presence
    expect(screen.getByText(/Reales Alltags-Dilemma/i)).toBeInTheDocument();

    // Select Option A to reveal instant causal feedback panel
    const optionABtn = screen.getByRole("button", { name: /\[ A \]/i });
    fireEvent.click(optionABtn);

    expect(screen.getByText(/Kausale Essenz/i)).toBeInTheDocument();
    expect(screen.getByText(/KLP-Prüfungskern/i)).toBeInTheDocument();
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

    // Verify Atlantic Salmon scenario is rendered in Step 1
    expect(screen.getByText(/大西洋三文鱼/i)).toBeInTheDocument();
    expect(screen.getByText(/擅自把售价从 10 欧提高到 11 欧/i)).toBeInTheDocument();

    // Click Choice A
    const choiceABtn = screen.getByRole("button", { name: /温和下滑/i });
    fireEvent.click(choiceABtn);

    // Verify instant mechanism card appears with authentic KLP termini, 5 premises, SVG curve, and golden sentence
    expect(screen.getByText(/现实生活中完全符合常理/i)).toBeInTheDocument();
    expect(screen.getAllByText(/完全价格弹性/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/完全竞争市场 5 大公理前提/i)).toBeInTheDocument();
    expect(screen.getByText(/reiner Preisnehmer \(Mengenanpasser\)/i)).toBeInTheDocument();

    // Switch to Choice B
    const choiceBBtn = screen.getByRole("button", { name: /暴跌至 0/i });
    fireEvent.click(choiceBBtn);

    // Verify reaction updates to Choice B
    expect(screen.getByText(/完全正确！这就是完全竞争模型的冰冷法则/i)).toBeInTheDocument();

    // Advance to next step
    const advanceBtn = screen.getByRole("button", { name: /进入互动实验探索/i });
    fireEvent.click(advanceBtn);

    expect(screen.getByText(/第 2 步/i)).toBeInTheDocument();
  });

  it("walks through all 6 constructivist steps with serialized MicroWorld, Konzept-Puzzle, 0-NP Klausurfalle, and 15-NP Meistersatz", () => {
    const onComplete = vi.fn();
    const sampleMarketQuest: ParsedQuestNode = {
      id: "q-market-walkthrough",
      chapterId: "chap-sowi-markt",
      order: 1,
      title: "Das Modell des vollkommenen Marktes (Angebot & Nachfrage)",
      lessonType: "concept",
      estimatedMinutes: 10,
      prerequisites: [],
      matchedToolId: "markt-sim",
      matchedToolName: "Markt-Labor",
      interactiveType: "markt-sim",
      summary: "Einführung in Angebot, Nachfrage, Marktgleichgewicht und Preismechanismus.",
      socraticPrompt: "Warum räumt der freie Preis den Markt, ignoriert aber soziale Gerechtigkeit?",
      keyConcepts: [],
      xp: 100,
    };

    render(
      <InteractiveLessonRunner
        questNode={sampleMarketQuest}
        currentFach="SoWi"
        lang="zh"
        isOpen={true}
        onComplete={onComplete}
        onClose={vi.fn()}
      />
    );

    // Step 1: Intuitions-Konflikt
    const choiceB = screen.getByRole("button", { name: /暴跌至 0/i });
    fireEvent.click(choiceB);
    const advanceBtn1 = screen.getByRole("button", { name: /进入互动实验探索/i });
    fireEvent.click(advanceBtn1);

    // Step 2: MicroWorld (Pure Curve Sim without distracting sub-tabs)
    expect(screen.getByText(/第 2 步/i)).toBeInTheDocument();
    expect(screen.getByTestId("marktgleichgewicht-sim")).toBeInTheDocument();
    const advanceBtn2 = screen.getByRole("button", { name: /动手实验探究完毕/i });
    expect(advanceBtn2).toBeDisabled();

    // Adjust cost slider to 50% target to fulfill mission
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "50" } });
    expect(advanceBtn2).not.toBeDisabled();
    fireEvent.click(advanceBtn2);

    // Step 3: Standalone 4-Premise Puzzle (Konzept-Puzzle)
    expect(screen.getByText(/第 3 步/i)).toBeInTheDocument();
    expect(screen.getByText(/四大假设现实对决拼图/i)).toBeInTheDocument();
    expect(screen.getByText(/概念机制拼图/i)).toBeInTheDocument();
    const advanceBtn3 = screen.getByRole("button", { name: /四大假设拼图完成/i });
    expect(advanceBtn3).toBeDisabled();

    // Match all 4 pairs
    fireEvent.click(screen.getByText(/完全同质商品/i));
    fireEvent.click(screen.getByText(/品牌营销/i));

    fireEvent.click(screen.getByText(/完全市场透明度/i));
    fireEvent.click(screen.getByText(/信息不对称/i));

    fireEvent.click(screen.getByText(/无个人与空间偏好/i));
    fireEvent.click(screen.getByText(/熟人熟脸信任感/i));

    fireEvent.click(screen.getByText(/自由进出无门槛/i));
    fireEvent.click(screen.getByText(/高额初始投资/i));

    expect(advanceBtn3).not.toBeDisabled();
    fireEvent.click(advanceBtn3);

    // Step 4: 0-NP Klausur Error Diagnosis (Absturz-Falle)
    expect(screen.getByText(/第 4 步/i)).toBeInTheDocument();
    expect(screen.getByText(/真实考场学生作答摘录/i)).toBeInTheDocument();
    expect(screen.getByText(/0 \/ 15 NP/i)).toBeInTheDocument();
    expect(screen.getByText(/生活必需品/i)).toBeInTheDocument();

    const step4DiagnosticOption = screen.getAllByRole("button").find(b => b.textContent?.includes("出清效率") || b.textContent?.includes("社会公正") || b.textContent?.includes("Effizienz"));
    expect(step4DiagnosticOption).toBeDefined();
    fireEvent.click(step4DiagnosticOption!);
    const checkBtn4 = screen.getByRole("button", { name: /核验答案/i });
    fireEvent.click(checkBtn4);

    expect(screen.getByText(/考官订正示范/i)).toBeInTheDocument();
    expect(screen.getByText(/致命失分症结/i)).toBeInTheDocument();
    const advanceBtn4 = screen.getByRole("button", { name: /继续下一步/i });
    fireEvent.click(advanceBtn4);

    // Step 5: 15-NP Meistersatz
    expect(screen.getByText(/第 5 步/i)).toBeInTheDocument();
    expect(screen.getByText(/15 分满分踩分标准/i)).toBeInTheDocument();
    const step5Option = screen.getAllByRole("button").find(b => b.textContent?.includes("帕累托") || b.textContent?.includes("社会国家原则") || b.textContent?.includes("15 NP"));
    expect(step5Option).toBeDefined();
    fireEvent.click(step5Option!);
    const checkBtn5 = screen.getByRole("button", { name: /核验答案/i });
    fireEvent.click(checkBtn5);
    expect(screen.getByText(/15 NP 满分金句/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Preismechanismus/i).length).toBeGreaterThan(0);
  });

  it("mounts a distinct sozial mission for Soziale-Marktwirtschaft quests instead of the kaelte default", () => {
    const sozialQuest: ParsedQuestNode = {
      id: "q-sowi-sozial",
      chapterId: "chap-sowi-sozial",
      order: 1,
      title: "Soziale Marktwirtschaft: Markt und sozialer Ausgleich",
      lessonType: "concept",
      estimatedMinutes: 10,
      prerequisites: [],
      matchedToolId: "markt-sim",
      matchedToolName: "Markt-Labor",
      interactiveType: "markt-sim",
      summary: "Mindestlohn, Tarifautonomie und sozialer Ausgleich im Ordnungsrahmen.",
      socraticPrompt: "Warum verzichtet der Staat auf den Höchstpreis?",
      keyConcepts: [],
      xp: 100,
    };

    render(
      <InteractiveLessonRunner
        questNode={sozialQuest}
        currentFach="SoWi"
        lang="zh"
        isOpen={true}
        onComplete={vi.fn()}
        onClose={vi.fn()}
      />
    );

    // Step 1 -> advance (choice buttons depend on distilled dilemma; pick first available)
    const choiceBtns = screen.getAllByRole("button").filter((b) =>
      /\[ A \]|\[ B \]/i.test(b.textContent || "")
    );
    fireEvent.click(choiceBtns[0]);
    fireEvent.click(screen.getByRole("button", { name: /进入互动实验探索|动手实验/i }));

    // Step 2: sozial mission, NOT the kaelte cold-wave mission
    expect(screen.getByText(/第 2 步/i)).toBeInTheDocument();
    expect(screen.getByText(/能源冲击与社会补偿之问/i)).toBeInTheDocument();
    expect(screen.queryByText(/寒潮爆发与成本冲击/i)).not.toBeInTheDocument();

    // +30% unlocks, +50% does not
    const advanceBtn = screen.getByRole("button", { name: /动手实验探究完毕/i });
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "50" } });
    expect(advanceBtn).toBeDisabled();
    fireEvent.change(slider, { target: { value: "30" } });
    expect(advanceBtn).not.toBeDisabled();
  });

  it("routes logic_blocks/tree quests to per-course presets via Runner", () => {
    const kantQuest: ParsedQuestNode = {
      id: "q-kant",
      chapterId: "chap-kant",
      order: 1,
      title: "Kants Kategorischer Imperativ und Maximenprüfung",
      lessonType: "concept",
      estimatedMinutes: 10,
      prerequisites: [],
      matchedToolId: "logic_blocks",
      matchedToolName: "Logik-Baukasten",
      interactiveType: "logic_blocks",
      summary: "Kategorischer Imperativ, Widerlegung und Maximenprüfung.",
      socraticPrompt: "Warum gilt die Menschenwürde absolut?",
      keyConcepts: [],
      xp: 100,
    };

    render(
      <InteractiveLessonRunner
        questNode={kantQuest}
        currentFach="Philosophie"
        lang="zh"
        isOpen={true}
        onComplete={vi.fn()}
        onClose={vi.fn()}
      />
    );

    const choiceBtns = screen.getAllByRole("button").filter((b) =>
      /\[ A \]|\[ B \]/i.test(b.textContent || "")
    );
    fireEvent.click(choiceBtns[0]);
    fireEvent.click(screen.getByRole("button", { name: /进入互动实验探索|动手实验/i }));

    // Kant quest gets Widerlegung mission, not the SoWi Subsumtion default
    expect(screen.getByText(/反证检验/)).toBeInTheDocument();
    expect(screen.queryByText(/涵摄推演/)).not.toBeInTheDocument();
  });

  it("allows going back to previous step via Zurück / 上一步 button without losing state", () => {
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

    // Step 1: No Zurück button should be present initially
    expect(screen.queryByRole("button", { name: /Zurück/i })).not.toBeInTheDocument();

    // Advance to Step 2
    fireEvent.click(screen.getByRole("button", { name: /\[ A \]/i }));
    fireEvent.click(screen.getByRole("button", { name: /Weiter zum Experiment/i }));

    expect(screen.getByText(/Schritt 2:/i)).toBeInTheDocument();

    // Step 2: Zurück button is present
    const backBtn = screen.getByRole("button", { name: /Zurück/i });
    expect(backBtn).toBeInTheDocument();

    // Click Zurück to return to Step 1
    fireEvent.click(backBtn);
    expect(screen.getByText(/Schritt 1:/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Weiter zum Experiment/i })).toBeInTheDocument();
  });
});

