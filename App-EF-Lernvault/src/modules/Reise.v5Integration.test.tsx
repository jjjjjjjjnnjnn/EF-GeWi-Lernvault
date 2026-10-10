import { render, screen, within, fireEvent } from "@testing-library/react";
import { describe, expect, it, beforeEach, vi } from "vitest";
import fs from "fs";
import path from "path";
import { parseReiseFile } from "../reise";
import ReiseModule from "./Reise";

describe("ReiseModule Enterprise-v5 Rendering & Integration", () => {
  const lernreiseDir = path.resolve(__dirname, "../../../Lernreise");
  const sowiFile = "SoWi-Mietendeckel-und-Preisinterventionen-L1.md";
  const rawSowi = fs.readFileSync(path.join(lernreiseDir, sowiFile), "utf-8");
  const sowiCourse = parseReiseFile(sowiFile, rawSowi)!;

  beforeEach(() => {
    localStorage.clear();
    window.alert = vi.fn() as unknown as typeof window.alert;
    window.history.replaceState({}, "", "/?mode=wizard");
  });

  it("parses and extracts v5 structured fields on SchrittSzenario", () => {
    expect(sowiCourse).not.toBeNull();
    const step5 = sowiCourse.schritte[4] as any;
    expect(step5.typ).toBe("szenario");
    expect(step5.aufgabe).toBeDefined();
    expect(step5.aufgabe).toContain("Strompreisdeckel");
    expect(step5.erwartungshorizontData).toBeDefined();
    expect(step5.erwartungshorizontData.rows.length).toBe(3);
    expect(step5.erwartungshorizontData.totalPoints).toBe(15);
    expect(step5.kernsatzData).toBeDefined();
    expect(step5.kernsatzData.text).toContain("Ein staatlicher Hoechstpreis");
  });

  it("renders AufloesungCard in Step 1 (entdecken)", () => {
    render(<ReiseModule lang="zh" vaultReisen={[sowiCourse]} />);

    // Start course via specific course row in table
    const heading = screen.getByText(sowiCourse.thema);
    const row = heading.closest(".grid") as HTMLElement;
    expect(row).not.toBeNull();
    const startBtn = within(row).getByRole("button", { name: /开始学习/ });
    fireEvent.click(startBtn);

    // Step 1 should render AufloesungCard
    expect(screen.getByText(/AUFLÖSUNG · 因果机制复盘/)).toBeInTheDocument();
    expect(screen.getByText("Option A")).toBeInTheDocument();
    expect(screen.getByText("Option B")).toBeInTheDocument();
    expect(screen.getByText(/一句话因果本质/)).toBeInTheDocument();
  });

  it("renders ErwartungshorizontDrawer and KernsatzCard in Step 5 (szenario)", () => {
    render(<ReiseModule lang="zh" vaultReisen={[sowiCourse]} />);

    // Start course via specific course row in table
    const heading = screen.getByText(sowiCourse.thema);
    const row = heading.closest(".grid") as HTMLElement;
    expect(row).not.toBeNull();
    const startBtn = within(row).getByRole("button", { name: /开始学习/ });
    fireEvent.click(startBtn);

    // Switch to Document Mode to see all steps
    const docToggle = screen.getByRole("button", { name: "全文文档" });
    fireEvent.click(docToggle);

    // In document mode, all 5 steps are displayed!
    // Verify ErwartungshorizontDrawer
    expect(screen.getByText(/ERWARTUNGSHORIZONT · 官方会考采分矩阵/)).toBeInTheDocument();
    expect(screen.getByText("15 NP")).toBeInTheDocument();
    expect(screen.getByText(/15 NP MUSTER-KLAUSURSATZ · 考官示范原句/)).toBeInTheDocument();

    // Verify KernsatzCard
    expect(screen.getByText(/KERNSATZ · 考场必背公理/)).toBeInTheDocument();
    expect(screen.getByText(/采分三段解构（考察主体 · 作用机理 · 评价结论）：/)).toBeInTheDocument();
    expect(screen.getByText(/完形自测（主动回忆闭环）：/)).toBeInTheDocument();
  });
});
