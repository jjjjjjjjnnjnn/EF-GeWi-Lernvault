import { describe, it, expect, beforeEach } from "vitest";
import { buildDailySprint, getStudyStreak, recordStudySprintCompleted } from "./dailyMix";
import type { VaultCard, VaultNote } from "../vault/parser";

describe("DailySprint & Streak System", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const mockCards: VaultCard[] = [
    { id: "c1", front: "Ungleichheit", back: "不平等", example: "", fach: "SoWi", thema: "Soziale Ungleichheit", source: "" },
    { id: "c2", front: "Chancengerechtigkeit", back: "机会公平", example: "", fach: "SoWi", thema: "Soziale Ungleichheit", source: "" },
    { id: "c3", front: "Bildungstrichter", back: "教育漏斗", example: "", fach: "SoWi", thema: "Soziale Ungleichheit", source: "" },
    { id: "c4", front: "Armut", back: "贫困", example: "", fach: "SoWi", thema: "Soziale Ungleichheit", source: "" },
    { id: "c5", front: "Gini", back: "基尼系数", example: "", fach: "SoWi", thema: "Soziale Ungleichheit", source: "" },
  ];

  const mockNotes: VaultNote[] = [
    {
      id: "note-1",
      path: "08_SoWi/Ungleichheit.md",
      fach: "SoWi",
      thema: "Soziale Ungleichheit",
      operatoren: ["darstellen", "analysieren"],
      klausurrelevant: true,
      datum: "2026-09-22",
      tags: ["EF", "SoWi"],
      blocks: [{ kind: "p", text: "Definition von Ungleichheit.", lang: "de" }],
    },
  ];

  it("builds a 15-minute adaptive daily sprint combining cards, quiz, and vergleich", () => {
    const session = buildDailySprint(mockCards, mockNotes, "SoWi");
    expect(session).not.toBeNull();
    expect(session?.cards.length).toBeLessThanOrEqual(4);
    expect(session?.cards.length).toBeGreaterThan(0);
    expect(session?.diagnosticQuiz.thema).toBe("Soziale Ungleichheit");
    expect(session?.vergleich.conceptA).toBeDefined();
    expect(session?.estimatedMinutes).toBe(15);
  });

  it("tracks and increments study streak on daily completion", () => {
    const s0 = getStudyStreak();
    expect(s0.currentStreak).toBe(0);

    const s1 = recordStudySprintCompleted();
    expect(s1.currentStreak).toBe(1);

    // Calling again on the same day should not double count
    const s2 = recordStudySprintCompleted();
    expect(s2.currentStreak).toBe(1);
  });
});
