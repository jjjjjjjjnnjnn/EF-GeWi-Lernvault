import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DashboardCockpit } from "./DashboardCockpit";

describe("DashboardCockpit UI Demo", () => {
  it("renders Stufenleiter, Radar metrics and missions in ZH", () => {
    render(<DashboardCockpit lang="zh" />);

    expect(screen.getByText("会考战力与升阶总台")).toBeInTheDocument();
    expect(screen.getByText(/11 Notenpunkte/)).toBeInTheDocument();
    expect(screen.getByText("核心失分点几何雷达图")).toBeInTheDocument();
    expect(screen.getByText(/文科 D1-D5 表达雷达/)).toBeInTheDocument();
    expect(screen.getByText(/理科 BE 采分步进雷达/)).toBeInTheDocument();
    expect(screen.getByText(/靶向弱项消除处方/)).toBeInTheDocument();
    expect(screen.getByText(/清空 12 张 \[D4\]/)).toBeInTheDocument();
  });

  it("renders correctly in DE language mode", () => {
    render(<DashboardCockpit lang="de" />);

    expect(screen.getByText("Klausur-Leistungszentrale")).toBeInTheDocument();
    expect(screen.getByText("Klausur-Kompetenznetz")).toBeInTheDocument();
    expect(screen.getByText(/GeWi D1-D5/)).toBeInTheDocument();
    expect(screen.getByText(/MINT BE-Exaktheit/)).toBeInTheDocument();
  });

  it("handles toggling mission completion and triggers navigation callback", async () => {
    const user = userEvent.setup();
    const onNavigate = vi.fn();
    render(<DashboardCockpit lang="zh" onNavigateToTab={onNavigate} />);

    // Click execute on first mission
    const execBtns = screen.getAllByRole("button", { name: "去执行 ->" });
    expect(execBtns.length).toBeGreaterThan(0);
    await user.click(execBtns[0]);
    expect(onNavigate).toHaveBeenCalledWith("flashcards", undefined);

    // Click toggle check on mission 1
    const checkBoxes = screen.getAllByTitle("勾选标记完成");
    await user.click(checkBoxes[0]);
    expect(screen.getByText(/1 \/ 3 已完成/)).toBeInTheDocument();
  });

  it("supports interactive radar node selection and Stufen inspection", async () => {
    const user = userEvent.setup();
    render(<DashboardCockpit lang="zh" />);

    // Click on Stufe 1 (EF)
    const efBtn = screen.getByText("第一阶 · 高一导入");
    await user.click(efBtn);
    expect(screen.getByText(/已解锁基础术语词典/)).toBeInTheDocument();

    // Click on MINT radar toggle
    const mintTabBtn = screen.getByText(/理科 BE 采分步进雷达/);
    await user.click(mintTabBtn);
    expect(screen.getAllByText(/BE-Genauigkeit/).length).toBeGreaterThan(0);
  });
});
