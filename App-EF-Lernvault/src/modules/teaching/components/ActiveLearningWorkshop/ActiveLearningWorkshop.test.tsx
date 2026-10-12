import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ActiveLearningWorkshop } from "./ActiveLearningWorkshop";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";

const MOCK_QUEST: ParsedQuestNode = {
  id: "test-workshop-quest-01",
  chapterId: "chap-01",
  order: 1,
  title: "Modell des vollkommenen Marktes (Angebot & Nachfrage)",
  lessonType: "concept",
  estimatedMinutes: 15,
  prerequisites: [],
  matchedToolId: "markt-sim",
  matchedToolName: "MarktgleichgewichtSim",
  interactiveType: "markt-sim",
  summary: "Analyse der vollkommenen Konkurrenz, Preismechanismus und Allokationseffizienz.",
  socraticPrompt: "Warum räumt der Markt selbst bei starken Schocks ohne staatliche Festpreise?",
  keyConcepts: [
    {
      term: "Preismechanismus",
      definitionDE: "Die Koordination von Angebot und Nachfrage über den Gleichgewichtspreis.",
      definitionZH: "供求双方通过均衡价格自发出清与配置资源的机制。",
      analogy: "Die unsichtbare Hand des Marktes.",
      examTrap: "Preisfixierung für wohlfahrtsoptimal halten.",
    },
  ],
  xp: 50,
};

describe("ActiveLearningWorkshop Component", () => {
  it("renders with top navigation rail containing all 5 phases and default Phase 1", () => {
    render(
      <ActiveLearningWorkshop
        currentFach="SoWi"
        questNode={MOCK_QUEST}
        lang="de"
      />
    );

    // 检查标题与主工作台导航
    expect(screen.getByText(/Active Learning Workshop/i)).toBeInTheDocument();

    // 检查 5 个阶段轨按键
    expect(screen.getByRole("button", { name: /1\. Vorlesung/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /2\. Labor/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /3\. Notiz/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /4\. Klausur-Drill/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /5\. Abschluss/i })).toBeInTheDocument();

    // 检查当前默认 Phase 1 内容
    expect(screen.getByText(/Phase 1: Vorlesung & Kausalitaet/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Weiter zur Phase 2/i })).toBeInTheDocument();
  });

  it("navigates through phases sequentially via advance buttons", () => {
    render(
      <ActiveLearningWorkshop
        currentFach="SoWi"
        questNode={MOCK_QUEST}
        lang="de"
      />
    );

    // 1. 在 Phase 1 点击推进到 Phase 2
    const toPhase2Btn = screen.getByRole("button", { name: /Weiter zur Phase 2/i });
    fireEvent.click(toPhase2Btn);
    expect(screen.getByText(/Phase 2: Interaktives Labor/i)).toBeInTheDocument();

    // 2. 在 Phase 2 点击推进到 Phase 3
    const toPhase3Btn = screen.getByRole("button", { name: /Weiter zur Phase 3/i });
    fireEvent.click(toPhase3Btn);
    expect(screen.getByText(/Phase 3: KLP-Wissensnotiz/i)).toBeInTheDocument();

    // 3. 在 Phase 3 点击推进到 Phase 4
    const toPhase4Btn = screen.getByRole("button", { name: /Weiter zur Phase 4/i });
    fireEvent.click(toPhase4Btn);
    expect(screen.getByText(/Phase 4: Klausur-Drill/i)).toBeInTheDocument();
  });

  it("allows direct phase navigation via progress rail buttons", () => {
    render(
      <ActiveLearningWorkshop
        currentFach="SoWi"
        questNode={MOCK_QUEST}
        lang="zh"
      />
    );

    // 点击第 3 阶段轨按钮直接跳转
    const phase3TabBtn = screen.getByRole("button", { name: /③ 笔记精练/i });
    fireEvent.click(phase3TabBtn);
    expect(screen.getByText(/阶段 3 · 笔记精练/i)).toBeInTheDocument();

    // 点击第 5 阶段轨按钮直接查看结算
    const phase5TabBtn = screen.getByRole("button", { name: /⑤ 闭环达标/i });
    fireEvent.click(phase5TabBtn);
    expect(screen.getByText(/阶段 5 · 掌握度结算/i)).toBeInTheDocument();
  });

  it("supports keyboard shortcuts (1-5) to switch phases", () => {
    render(
      <ActiveLearningWorkshop
        currentFach="SoWi"
        questNode={MOCK_QUEST}
        lang="de"
      />
    );

    // 按数字键 '2' 跳转到 Phase 2
    fireEvent.keyDown(window, { key: "2" });
    expect(screen.getByText(/Phase 2: Interaktives Labor/i)).toBeInTheDocument();

    // 按数字键 '5' 跳转到 Phase 5
    fireEvent.keyDown(window, { key: "5" });
    expect(screen.getByText(/Phase 5: Meisterschaft/i)).toBeInTheDocument();
  });

  it("interacts with quiz questions in Phase 4 and tracks answers", () => {
    render(
      <ActiveLearningWorkshop
        currentFach="SoWi"
        questNode={MOCK_QUEST}
        lang="de"
      />
    );

    // 直接跳转至 Phase 4
    fireEvent.click(screen.getByRole("button", { name: /4\. Klausur-Drill/i }));
    expect(screen.getByText(/Phase 4: Klausur-Drill/i)).toBeInTheDocument();

    // 选择第一个选项并提交检查
    const option1Btn = screen.getByRole("button", { name: /\[1\]/i });
    fireEvent.click(option1Btn);

    const checkBtn = screen.getByRole("button", { name: /Antwort prüfen/i });
    expect(checkBtn).not.toBeDisabled();
    fireEvent.click(checkBtn);

    // 检查核验反馈出现，并且出现“下一道题目”按钮
    expect(screen.getByRole("button", { name: /Nächste Aufgabe/i })).toBeInTheDocument();
  });

  it("renders radar chart with center coordinates and transform style in Phase 5", () => {
    render(
      <ActiveLearningWorkshop
        currentFach="SoWi"
        questNode={MOCK_QUEST}
        lang="de"
      />
    );

    // 跳转至 Phase 5
    fireEvent.click(screen.getByRole("button", { name: /5\. Abschluss/i }));
    expect(screen.getByText(/5-Dimensionen-Kompetenzradar/i)).toBeInTheDocument();

    // 检查 SVG 雷达图节点存在且严格带 transformOrigin 属性
    const svgEl = screen.getByRole("img", { name: /Kompetenzradar Chart/i });
    expect(svgEl).toBeInTheDocument();

    const circles = svgEl.querySelectorAll("g circle");
    expect(circles.length).toBeGreaterThan(0);
    const firstCircle = circles[0] as SVGCircleElement;
    expect(firstCircle.style.transformOrigin).toBeDefined();
    expect(firstCircle.style.transformBox).toBe("view-box");
  });

  it("handles subject and topic changes smoothly", () => {
    const handleSubjectChange = vi.fn();
    render(
      <ActiveLearningWorkshop
        currentFach="Physik"
        questNode={null}
        lang="zh"
        onSubjectChange={handleSubjectChange}
      />
    );

    // 检查学科下拉框
    const selectEl = screen.getByLabelText(/选择研习学科/i);
    expect(selectEl).toHaveValue("Physik");

    fireEvent.change(selectEl, { target: { value: "Philosophie" } });
    expect(handleSubjectChange).toHaveBeenCalledWith("Philosophie");
  });
});
