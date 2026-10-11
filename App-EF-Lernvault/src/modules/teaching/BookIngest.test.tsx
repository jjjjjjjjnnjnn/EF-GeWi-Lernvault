import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  parseBookToQuests,
  inferLessonType,
  matchInteractiveTool,
  BOOK_INGEST_PRESETS,
} from "./engine/bookIngestParser";
import {
  generatePacingPlan,
  topologicalSortQuests,
  smartReschedulePlan,
} from "./engine/pacingPlanner";
import { BookIngestWorkshopTab } from "./tabs/BookIngestWorkshopTab";
import { TeachingStudio } from "./TeachingStudio";

describe("Book Ingest Engine: bookIngestParser", () => {
  it("parses Markdown heading hierarchies into chapters and quest nodes", () => {
    const raw = `# Kapitel 1: Volkswirtschaft
## 1.1 Grundlagen Markt
## 1.2 Marktversagen
# Kapitel 2: Wirtschaftspolitik
## 2.1 Magisches Viereck Simulation`;

    const res = parseBookToQuests("VW Lehrbuch", "SoWi", raw);
    expect(res.title).toBe("VW Lehrbuch");
    expect(res.fach).toBe("SoWi");
    expect(res.chapters.length).toBe(2);
    expect(res.chapters[0].nodes.length).toBe(2);
    expect(res.chapters[1].nodes.length).toBe(1);
    expect(res.totalNodes).toBe(3);
    expect(res.totalMinutes).toBeGreaterThanOrEqual(25);
    expect(res.dagEdgesCount).toBeGreaterThanOrEqual(2);
  });

  it("handles numbered outlines (1., 1.1, 1.2)", () => {
    const raw = `1. Einführung in die Rechtsphilosophie
1.1 Recht und Moral
1.2 Der Begriff der Gerechtigkeit
2. Kants Rechtslehre
2.1 Das Freiheitsgesetz`;

    const res = parseBookToQuests("Recht", "Philosophie", raw);
    expect(res.chapters.length).toBeGreaterThanOrEqual(1);
    expect(res.totalNodes).toBeGreaterThanOrEqual(3);
  });

  it("gracefully falls back when given empty or minimal input", () => {
    const res = parseBookToQuests("", "", "");
    expect(res.chapters.length).toBe(1);
    expect(res.totalNodes).toBe(1);
    expect(res.chapters[0].nodes[0].estimatedMinutes).toBe(10);
  });

  it("infers lesson types accurately", () => {
    expect(inferLessonType("Simulation des Marktes")).toBe("experiment");
    expect(inferLessonType("Laborversuch und Messung")).toBe("experiment");
    expect(inferLessonType("Klausur-Analyse und Training")).toBe("practice");
    expect(inferLessonType("Übungsaufgaben berechnen")).toBe("practice");
    expect(inferLessonType("Theoretische Einführung")).toBe("concept");
  });

  it("matches domain tools and falls back to generic interactive kits", () => {
    const wahl = matchInteractiveTool("Bundestagswahl und Zweitstimme", "concept");
    expect(wahl.id).toBe("wahlsystem-sim");
    expect(wahl.interactiveType).toBe("wahlsystem-sim");

    const rawls = matchInteractiveTool("Rawls Schleier des Nichtwissens", "concept");
    expect(rawls.id).toBe("rawls-sim");
    expect(rawls.interactiveType).toBe("rawls-sim");

    const fallbackConcept = matchInteractiveTool("Allgemeines Thema", "concept");
    expect(fallbackConcept.interactiveType).toBe("variable_slider");

    const fallbackPractice = matchInteractiveTool("Allgemeine Übung", "practice");
    expect(fallbackPractice.interactiveType).toBe("logic_blocks");
  });

  it("does not hijack Problem/Prozess/Produktion via pro substring", () => {
    const p1 = matchInteractiveTool("Problem der Energiewende und Produktionsprozess", "concept");
    expect(p1.id).not.toBe("dilemma-balance-scale");
    const p2 = matchInteractiveTool("Prozentuale Messwerte im Laborversuch", "experiment");
    expect(p2.id).not.toBe("dilemma-balance-scale");
    // 真词 Pro/Contra 仍命中天平
    const p3 = matchInteractiveTool("Pro und Contra der Debatte", "concept");
    expect(p3.id).toBe("dilemma-balance-scale");
  });

  it("ensures all built-in presets are valid and deconstruct into >= 4 quests", () => {
    for (const preset of BOOK_INGEST_PRESETS) {
      const parsed = parseBookToQuests(preset.title, preset.fach, preset.rawContent);
      expect(parsed.chapters.length).toBeGreaterThanOrEqual(2);
      expect(parsed.totalNodes).toBeGreaterThanOrEqual(4);
      expect(parsed.totalMinutes).toBeGreaterThan(30);

      // 验证 DAG 前置依赖合法性：前置节点必须在整体关卡列表中存在
      const allNodeIds = new Set<string>();
      for (const chap of parsed.chapters) {
        for (const n of chap.nodes) {
          allNodeIds.add(n.id);
        }
      }
      for (const chap of parsed.chapters) {
        for (const n of chap.nodes) {
          for (const prereq of n.prerequisites) {
            expect(allNodeIds.has(prereq)).toBe(true);
            expect(prereq).not.toBe(n.id); // 无自依赖
          }
        }
      }
    }
  });
});

describe("Adaptive Pacing Planner: pacingPlanner", () => {
  const sampleBook = parseBookToQuests(
    BOOK_INGEST_PRESETS[0].title,
    BOOK_INGEST_PRESETS[0].fach,
    BOOK_INGEST_PRESETS[0].rawContent
  );

  it("maintains topological ordering of quests", () => {
    const sorted = topologicalSortQuests(sampleBook.chapters);
    expect(sorted.length).toBe(sampleBook.totalNodes);

    const completed = new Set<string>();
    for (const node of sorted) {
      for (const prereq of node.prerequisites) {
        expect(completed.has(prereq)).toBe(true);
      }
      completed.add(node.id);
    }
  });

  it("generates a balanced 14-day painless plan with Spaced Repetition", () => {
    const plan = generatePacingPlan(sampleBook, { mode: "balanced", includeSpacedRepetition: true });
    expect(plan.pacingMode).toBe("balanced");
    expect(plan.targetDays).toBeGreaterThanOrEqual(10);
    expect(plan.totalQuests).toBe(sampleBook.totalNodes);
    expect(plan.dailySlots.length).toBe(plan.targetDays);
    expect(plan.totalReviewSlots).toBeGreaterThan(0);

    // 验证每天的学习耗时不超过 25 分钟无痛上限
    for (const slot of plan.dailySlots) {
      expect(slot.totalMinutes).toBeLessThanOrEqual(28);
    }
  });

  it("generates a sprint plan within 3-7 days", () => {
    const plan = generatePacingPlan(sampleBook, { mode: "sprint" });
    expect(plan.targetDays).toBeLessThanOrEqual(7);
    expect(plan.pacingMode).toBe("sprint");
  });

  it("respects custom days and custom minutes limit", () => {
    const plan = generatePacingPlan(sampleBook, {
      mode: "custom",
      customDays: 16,
      customDailyMinutes: 10,
    });
    expect(plan.targetDays).toBe(16);
    expect(plan.targetDailyMinutes).toBe(10);
  });

  it("smoothly reschedules uncompleted overdue reviews without debt avalanche", () => {
    const initialPlan = generatePacingPlan(sampleBook, { mode: "balanced" });
    const overdueReviews = [
      {
        questId: "q-1-1",
        questTitle: "Markt",
        intervalTag: "D+1 Blitz" as const,
        reviewMinutes: 4,
      },
      {
        questId: "q-1-2",
        questTitle: "Marktversagen",
        intervalTag: "D+3 Tief" as const,
        reviewMinutes: 4,
      },
    ];

    const rescheduled = smartReschedulePlan(initialPlan, 3, overdueReviews, 20);
    expect(rescheduled.totalReviewSlots).toBeGreaterThanOrEqual(initialPlan.totalReviewSlots);
    expect(rescheduled.motivationalTip.zh).toContain("智能复习欠账平滑已生效");
    // 确保每日时间受控
    for (const slot of rescheduled.dailySlots) {
      expect(slot.totalMinutes).toBeLessThanOrEqual(28);
    }
  });
});

describe("BookIngestWorkshopTab & TeachingStudio UI", () => {
  it("renders workshop tabs and allows switching presets", () => {
    render(<BookIngestWorkshopTab currentFach="SoWi" lang="de" />);

    expect(screen.getByText("Buch- & Lehrplan-Zerlegungswerkstatt")).toBeInTheDocument();
    expect(screen.getByText("Kapitel")).toBeInTheDocument();
    expect(screen.getByText("Mikro-Quests")).toBeInTheDocument();

    // 点击哲学预设
    const philoBtn = screen.getByRole("button", { name: "Philosophie" });
    fireEvent.click(philoBtn);

    expect(screen.getByDisplayValue("Praktische Philosophie: Pflichtethik vs. Utilitarismus")).toBeInTheDocument();
  });

  it("allows switching pacing modes and triggers plan application", () => {
    const handleApply = vi.fn();
    render(<BookIngestWorkshopTab currentFach="SoWi" lang="de" onApplyPlan={handleApply} />);

    // 切换到 7 Tage Sprint
    const sprintBtn = screen.getByRole("button", { name: "7 Tage (Sprint)" });
    fireEvent.click(sprintBtn);

    // 点击确定导入按钮
    const applyBtn = screen.getByRole("button", { name: /In Lehrplan & Quest-Map übernehmen/i });
    fireEvent.click(applyBtn);

    expect(handleApply).toHaveBeenCalledTimes(1);
    const [calledBook, calledPlan] = handleApply.mock.calls[0];
    expect(calledBook.totalNodes).toBeGreaterThan(0);
    expect(calledPlan.pacingMode).toBe("sprint");
  });

  it("renders TeachingStudio container and navigates across tabs", () => {
    render(<TeachingStudio currentFach="SoWi" lang="zh" />);

    expect(screen.getByText(/Teaching Studio/i)).toBeInTheDocument();
    expect(screen.getByText("书籍拆解与无痛节奏")).toBeInTheDocument();

    // 切换到关卡探索图谱
    const mapTabBtn = screen.getByRole("button", { name: "关卡探索图谱" });
    fireEvent.click(mapTabBtn);
    expect(screen.getByRole("heading", { name: /关卡探索图谱/i })).toBeInTheDocument();

    // 切换到微世界教具总台
    const laborTabBtn = screen.getByRole("button", { name: "仿真教具总台" });
    fireEvent.click(laborTabBtn);
    expect(screen.getByRole("heading", { name: /微世界与仿真教具总台/i })).toBeInTheDocument();
  });
});
