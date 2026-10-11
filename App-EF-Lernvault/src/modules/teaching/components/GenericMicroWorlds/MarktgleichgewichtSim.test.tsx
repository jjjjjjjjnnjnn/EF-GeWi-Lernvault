import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MarktgleichgewichtSim } from "./MarktgleichgewichtSim";

describe("MarktgleichgewichtSim Component", () => {
  it("renders 40%/60% split workbench with initial state (0%) and math values", () => {
    const onMissionComplete = vi.fn();
    render(
      <MarktgleichgewichtSim
        lang="zh"
        onMissionComplete={onMissionComplete}
      />
    );

    expect(screen.getByTestId("marktgleichgewicht-sim")).toBeInTheDocument();
    expect(screen.getByText(/微观经济学 · 供求平衡实验/i)).toBeInTheDocument();
    expect(screen.getByText(/寒潮爆发与成本冲击/i)).toBeInTheDocument();

    // Initial equilibrium: Q* = 500, P* = 10 €
    expect(screen.getAllByText(/10\.0 €/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/500 kg/i).length).toBeGreaterThan(0);

    // Initial status: searching target range and callback reports false
    expect(screen.getByText(/待探究: 寻找目标区间/i)).toBeInTheDocument();
    expect(screen.getByText(/基础出清状态 \(Markträumung\)/i)).toBeInTheDocument();
    expect(onMissionComplete).toHaveBeenLastCalledWith(false);
  });

  it("updates equilibrium values and triggers onMissionComplete when slider hits target zone (50%)", () => {
    const onMissionComplete = vi.fn();
    render(
      <MarktgleichgewichtSim
        lang="zh"
        onMissionComplete={onMissionComplete}
      />
    );

    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();

    // Drag slider to 30% (below target 48%~52%)
    fireEvent.change(slider, { target: { value: "30" } });
    expect(onMissionComplete).toHaveBeenLastCalledWith(false);
    expect(screen.getByText(/稀缺信号与需求配给 \(Signalfunktion & Rationierung\)/i)).toBeInTheDocument();

    // Drag slider to 50% (exact target)
    fireEvent.change(slider, { target: { value: "50" } });
    expect(onMissionComplete).toHaveBeenCalledWith(true);

    // After +50% cost hike: P* rises to 14 €, Q* drops to 300 kg
    expect(screen.getAllByText(/14\.0 €/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/300 kg/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/已命中: 达成目标 100%/i)).toBeInTheDocument();
    expect(screen.getByText(/稀缺信号与需求配给 \(目标靶心达成\)/i)).toBeInTheDocument();
  });

  it("handles extreme state (+100%) with dynamic ticks and non-default price function", () => {
    const onMissionComplete = vi.fn();
    render(
      <MarktgleichgewichtSim
        lang="zh"
        onMissionComplete={onMissionComplete}
      />
    );

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "100" } });

    expect(onMissionComplete).toHaveBeenLastCalledWith(false);
    expect(screen.getByText(/待探究: 寻找目标区间/i)).toBeInTheDocument();
    expect(screen.getByText(/18\.0 €/i)).toBeInTheDocument();
    expect(screen.getByText(/100 kg/i)).toBeInTheDocument();
    expect(screen.getByText("18.0€")).toBeInTheDocument(); // Dynamic P-axis tick
    expect(screen.getByText("100")).toBeInTheDocument(); // Dynamic Q-axis tick
    expect(screen.getByText(/稀缺信号与需求配给 \(Signalfunktion & Rationierung\)/i)).toBeInTheDocument();
  });

  it("supports German language rendering with proper academic terminology", () => {
    render(<MarktgleichgewichtSim lang="de" />);

    expect(screen.getByText(/Mikroökonomie · Markt-Labor/i)).toBeInTheDocument();
    expect(screen.getByText(/Preismechanismus & Markträumung/i)).toBeInTheDocument();
    expect(screen.getByText(/Kältewelle & Kostenschock/i)).toBeInTheDocument();
    expect(screen.getByText(/Offen: Zielbereich suchen/i)).toBeInTheDocument();
    expect(screen.getByText(/Basis-Räumung \(Markträumung\)/i)).toBeInTheDocument();
  });
});
