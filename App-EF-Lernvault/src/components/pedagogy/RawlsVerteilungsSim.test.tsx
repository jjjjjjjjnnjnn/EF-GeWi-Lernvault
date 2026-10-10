import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  RawlsVerteilungsSim,
  computeAllocation,
  PRESET_MODELS,
} from "./RawlsVerteilungsSim";

describe("RawlsVerteilungsSim Allocation Engine", () => {
  it("computes allocation under Rawls preset satisfying the Maximin rule", () => {
    const rawlsPreset = PRESET_MODELS.find((p) => p.id === "rawls")!;
    const res = computeAllocation(
      rawlsPreset.taxRatePercent,
      rawlsPreset.basicFloorPercent
    );

    expect(res.classes.length).toBe(5);
    // Under Rawls (44% tax, 55% floor), least advantaged receives adequate floor
    expect(res.minIncome).toBeGreaterThanOrEqual(1200);
    expect(res.maximinSatisfied).toBe(true);
    expect(res.giniCoefficient).toBeGreaterThan(0);
    expect(res.giniCoefficient).toBeLessThan(0.5);
  });

  it("reflects lower minimum protection under Utilitarismus", () => {
    const utilPreset = PRESET_MODELS.find((p) => p.id === "utilitarismus")!;
    const res = computeAllocation(
      utilPreset.taxRatePercent,
      utilPreset.basicFloorPercent
    );

    const rawlsPreset = PRESET_MODELS.find((p) => p.id === "rawls")!;
    const rawlsRes = computeAllocation(
      rawlsPreset.taxRatePercent,
      rawlsPreset.basicFloorPercent
    );

    // Utilitarismus has higher overall productivity due to lower deadweight loss,
    // but the poorest segment has significantly lower income
    expect(res.minIncome).toBeLessThan(rawlsRes.minIncome);
  });

  it("reflects extreme market inequality under Libertarismus", () => {
    const libPreset = PRESET_MODELS.find((p) => p.id === "libertarismus")!;
    const res = computeAllocation(
      libPreset.taxRatePercent,
      libPreset.basicFloorPercent
    );

    // Nightwatchman state has minimal transfers, poorest 10% receive minimal
    expect(res.minIncome).toBeLessThan(600);
    expect(res.maximinSatisfied).toBe(false);
    expect(res.giniCoefficient).toBeGreaterThan(0.38);
  });

  it("produces valid Lorenz curve points between (0,0) and (100,100)", () => {
    const res = computeAllocation(30, 40);
    expect(res.lorenzPoints[0]).toEqual({ p: 0, l: 0 });
    const lastPoint = res.lorenzPoints[res.lorenzPoints.length - 1];
    expect(lastPoint.p).toBe(100);
    expect(lastPoint.l).toBe(100);
  });
});

describe("RawlsVerteilungsSim Component", () => {
  it("renders with default German settings in veil mode", () => {
    render(<RawlsVerteilungsSim lang="de" />);

    expect(
      screen.getByText("Rawls-Verteilungssimulator & Schleier des Nichtwissens")
    ).toBeInTheDocument();
    expect(screen.getByText("Schleier aktiv")).toBeInTheDocument();
    expect(screen.getByText(/John Rawls: A Theory of Justice/i)).toBeInTheDocument();
    expect(screen.getByText("1. Moralische Waage")).toBeInTheDocument();
  });

  it("renders with Chinese settings without issue", () => {
    render(<RawlsVerteilungsSim lang="zh" />);

    expect(
      screen.getByText(/罗尔斯正义论与无知之幕分配天平/i)
    ).toBeInTheDocument();
    expect(screen.getByText("无知之幕生效中")).toBeInTheDocument();
    expect(screen.getByText("1. 道德天平 (Moralische Waage)")).toBeInTheDocument();
  });

  it("switches tabs smoothly (Moralische Waage, Nettoeinkommen, Lorenz, Abitur)", () => {
    render(<RawlsVerteilungsSim lang="de" />);

    // Switch to Nettoeinkommen
    fireEvent.click(screen.getByText("2. Nettoeinkommen"));
    expect(
      screen.getByText(/Verteilung der Nettoeinkommen nach Steuern/i)
    ).toBeInTheDocument();

    // Switch to Lorenz
    fireEvent.click(screen.getByText("3. Lorenz-Kurve & Gini"));
    expect(
      screen.getByText(/Gini-Koeffizient \(Ungleichheitsmaß\)/i)
    ).toBeInTheDocument();

    // Switch to Abitur
    fireEvent.click(screen.getByText("4. Abitur-Analyse"));
    expect(
      screen.getByText(/Operator: \*Beurteilen\*/i)
    ).toBeInTheDocument();
  });

  it("switches presets to Utilitarismus and updates models", () => {
    render(<RawlsVerteilungsSim lang="de" />);

    const utilBtn = screen.getByText("Utilitarismus: Nutzensummen-Maximierung");
    fireEvent.click(utilBtn);

    // Verify tax rate input updated to 22%
    const taxInput = screen.getByLabelText(/Umverteilungs-Steuersatz/i) as HTMLInputElement;
    expect(taxInput.value).toBe("22");
  });

  it("lifts the veil of ignorance and displays assigned identity", () => {
    render(<RawlsVerteilungsSim lang="de" />);

    const liftBtn = screen.getByText(/Schleier lüften \(Rolle ziehen\)/i);
    fireEvent.click(liftBtn);

    // Veil status updates
    expect(screen.getByText("Schleier gelüftet")).toBeInTheDocument();
    expect(
      screen.getByText(/Ihre gezogene gesellschaftliche Identität/i)
    ).toBeInTheDocument();

    // Reset veil
    const resetBtn = screen.getByText(/Schleier wieder absenken/i);
    fireEvent.click(resetBtn);
    expect(screen.getByText("Schleier aktiv")).toBeInTheDocument();
  });

  it("exports findings when onExportFinding is provided", () => {
    const onExport = vi.fn();
    render(<RawlsVerteilungsSim lang="zh" onExportFinding={onExport} />);

    const exportBtn = screen.getByTitle("导出核心考点结论");
    fireEvent.click(exportBtn);

    expect(onExport).toHaveBeenCalledTimes(1);
    expect(onExport.mock.calls[0][0]).toContain("【罗尔斯《正义论》无知之幕分配分析】");
  });
});
