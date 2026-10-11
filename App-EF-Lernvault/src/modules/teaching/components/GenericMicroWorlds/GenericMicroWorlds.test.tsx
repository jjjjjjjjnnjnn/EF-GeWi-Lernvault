import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { VariableSliderBox } from "./VariableSliderBox";
import { DilemmaBalanceScale } from "./DilemmaBalanceScale";
import { LogicBlockBuilder, resolveLogicArchetype } from "./LogicBlockBuilder";
import { ScenarioDecisionTree, resolveDecisionScenarioId } from "./ScenarioDecisionTree";

describe("Generic MicroWorld: VariableSliderBox", () => {
  it("renders with default properties in German and displays formula", () => {
    render(<VariableSliderBox />);
    expect(screen.getByText("Variable Slider & Kausalketten-Box")).toBeInTheDocument();
    expect(screen.getByText(/Kausalketten-Analyse/i)).toBeInTheDocument();
  });

  it("renders in Chinese when lang='zh'", () => {
    render(<VariableSliderBox lang="zh" title="自定义因果滑块" />);
    expect(screen.getByText("自定义因果滑块")).toBeInTheDocument();
    expect(screen.getByText("动态因果链三段论 (Kausalkette)")).toBeInTheDocument();
    expect(screen.getByText(/因果推论/i)).toBeInTheDocument();
  });

  it("invokes onParameterChange when slider X changes", () => {
    const handleParamChange = vi.fn();
    render(<VariableSliderBox onParameterChange={handleParamChange} initialX={4.0} initialK={1.5} />);

    // Initial render callback
    expect(handleParamChange).toHaveBeenCalled();

    // Trigger slider change
    const inputs = screen.getAllByRole("slider");
    const sliderX = inputs[0];
    fireEvent.change(sliderX, { target: { value: "7.0" } });

    expect(handleParamChange).toHaveBeenLastCalledWith(7.0, expect.any(Number));
  });

  it("switches curve model and updates formula display", () => {
    render(<VariableSliderBox lang="de" />);
    const quadraticBtn = screen.getByText("Quadratisch / Progressiv");
    fireEvent.click(quadraticBtn);

    const matches = screen.getAllByText(/Y = 0.35 · K · X²/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("supports target corridor tolerance and onTargetReached callback", () => {
    const handleTarget = vi.fn();
    render(
      <VariableSliderBox
        targetY={50}
        tolerancePercent={10}
        initialX={2.0}
        initialK={1.5}
        onTargetReached={handleTarget}
      />
    );

    expect(screen.getByText(/Zielwert:/i)).toBeInTheDocument();
  });
});

describe("Generic MicroWorld: DilemmaBalanceScale", () => {
  it("renders with default mechanical scale and arguments", () => {
    render(<DilemmaBalanceScale />);
    expect(screen.getByText("Dilemma- & Argumentationswaage")).toBeInTheDocument();
    expect(screen.getByText("Pro / Deontologie")).toBeInTheDocument();
    expect(screen.getByText("Contra / Utilitarismus")).toBeInTheDocument();
    expect(screen.getByText(/WAAGEN-URTEIL/i)).toBeInTheDocument();
  });

  it("renders in Chinese when lang='zh'", () => {
    render(
      <DilemmaBalanceScale
        lang="zh"
        title="伦理天平"
        leftTitle="原则底线"
        rightTitle="效用考量"
      />
    );
    expect(screen.getByText("伦理天平")).toBeInTheDocument();
    expect(screen.getByText("原则底线")).toBeInTheDocument();
    expect(screen.getByText("效用考量")).toBeInTheDocument();
    expect(screen.getByText(/天平判决/i)).toBeInTheDocument();
  });

  it("invokes onBalanceChange callback with calculated angle and verdict", () => {
    const handleBalanceChange = vi.fn();
    render(<DilemmaBalanceScale onBalanceChange={handleBalanceChange} />);

    expect(handleBalanceChange).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(String)
    );
  });

  it("allows adding and modifying weights on both sides", () => {
    render(<DilemmaBalanceScale lang="zh" />);

    // Add weight to left side
    const inputs = screen.getAllByPlaceholderText(/论点描述/i);
    expect(inputs.length).toBe(2);
    fireEvent.change(inputs[0], { target: { value: "绝对人权保障" } });

    const submitBtns = screen.getAllByText("放入");
    fireEvent.click(submitBtns[0]);

    expect(screen.getByText("绝对人权保障")).toBeInTheDocument();
  });

  it("supports direct balance derivation button to resolve cognitive deadlock", () => {
    render(<DilemmaBalanceScale lang="zh" />);
    const derivationBtn = screen.getByRole("button", { name: "平衡推导直达" });
    fireEvent.click(derivationBtn);

    expect(screen.getByText(/反思平衡调节项/i)).toBeInTheDocument();
  });
});

describe("Generic MicroWorld: LogicBlockBuilder", () => {
  it("renders with default Modus Ponens in German", () => {
    render(<LogicBlockBuilder />);
    expect(screen.getByText("Logik-Block-Baukasten (Argumentationsanalyse)")).toBeInTheDocument();
    expect(screen.getByText(/SYNTHESE-VEKTOR/i)).toBeInTheDocument();
    expect(screen.getByText(/LOGISCH VALIDE/i)).toBeInTheDocument();
    expect(screen.getAllByText(/15 NP/i).length).toBeGreaterThan(0);
  });

  it("renders in Chinese when lang='zh'", () => {
    render(<LogicBlockBuilder lang="zh" title="论证推理积木台" />);
    expect(screen.getByText("论证推理积木台")).toBeInTheDocument();
    expect(screen.getByText(/演绎向量路径图/i)).toBeInTheDocument();
    expect(screen.getByText(/大前提 \(普遍公理\)/i)).toBeInTheDocument();
    expect(screen.getByText(/小前提 \(具体案例\)/i)).toBeInTheDocument();
    expect(screen.getByText(/推导结论 \(逻辑推断\)/i)).toBeInTheDocument();
  });

  it("detects formal fallacy and invokes onValidate with invalid status", () => {
    const handleValidate = vi.fn();
    render(<LogicBlockBuilder lang="de" onValidate={handleValidate} />);

    // Switch archetype dropdown to Affirming the Consequent
    const select = screen.getByRole("combobox", { name: /archetyp auswählen/i });
    fireEvent.change(select, { target: { value: "affirming_consequent" } });

    expect(handleValidate).toHaveBeenCalledWith(false, expect.any(String));
    expect(screen.getAllByText(/FEHLSCHLUSS/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Bejahung des Konsequens/i).length).toBeGreaterThan(0);
  });

  it("clears slots and shows warning upon validation of incomplete argument", () => {
    render(<LogicBlockBuilder lang="zh" />);
    const clearBtn = screen.getByText("重置全部槽位");
    fireEvent.click(clearBtn);

    const validateBtn = screen.getByText(/执行逻辑验证/i);
    fireEvent.click(validateBtn);

    expect(screen.getByText("论证结构不完整")).toBeInTheDocument();
  });

  it("mounts distinct presets per course instead of one modus-ponens", () => {
    // Ethik quest preselects Widerlegung archetype with its own mission
    render(<LogicBlockBuilder lang="zh" archetypeId="modus_tollens" />);
    expect(screen.getByText(/反证检验/)).toBeInTheDocument();
    // Default stays modus_ponens (zero regression)
    render(<LogicBlockBuilder lang="zh" title="默认对照" />);
    expect(screen.getByText(/涵摄推演/)).toBeInTheDocument();
    // Resolver routing
    expect(resolveLogicArchetype("Kants Kategorischer Imperativ", "")).toBe("modus_tollens");
    expect(resolveLogicArchetype("Faust Gretchenfrage Szenenanalyse", "")).toBe("disjunctive_syllogism");
    expect(resolveLogicArchetype("Soziale Marktwirtschaft", "")).toBe("modus_ponens");
  });
});

describe("Generic MicroWorld: ScenarioDecisionTree", () => {
  it("renders default fiscal policy scenario in German", () => {
    render(<ScenarioDecisionTree />);
    expect(screen.getByText(/Szenario-Entscheidungsbaum/i)).toBeInTheDocument();
    expect(screen.getByText(/INTERAKTIVER ENTSCHEIDUNGS-GRAPH/i)).toBeInTheDocument();
    expect(screen.getByText(/Fiskalpolitik: Schuldenbremse/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Investitionsstau/i).length).toBeGreaterThan(0);
  });

  it("renders in Chinese when lang='zh'", () => {
    render(<ScenarioDecisionTree lang="zh" title="决策抉择树测试" />);
    expect(screen.getByText("决策抉择树测试")).toBeInTheDocument();
    expect(screen.getByText(/交互式因果分支拓扑图/i)).toBeInTheDocument();
    expect(screen.getByText(/短期直接效应/i)).toBeInTheDocument();
    expect(screen.getByText(/长期未预期副作用/i)).toBeInTheDocument();
  });

  it("invokes onNodeSelect when switching scenario and selecting tree node", () => {
    const handleNodeSelect = vi.fn();
    render(<ScenarioDecisionTree onNodeSelect={handleNodeSelect} />);

    // Switch to Philosophy Trolley scenario
    const trolleyBtn = screen.getByText(/Philosophie · Trolley/i);
    fireEvent.click(trolleyBtn);

    expect(handleNodeSelect).toHaveBeenCalledWith("trolley_root", expect.any(Number));
    expect(screen.getAllByText(/Das Weichensteller-Dilemma/i).length).toBeGreaterThan(0);

    // Click on Strategy Option A node in SVG
    const nodeA = screen.getByText("A");
    fireEvent.click(nodeA);

    expect(handleNodeSelect).toHaveBeenLastCalledWith("trolley_opt_a", expect.any(Number));
    expect(screen.getAllByText(/Option A: Weiche aktiv umlegen/i).length).toBeGreaterThan(0);
  });

  it("displays AFB III evaluation with Notenpunkte", () => {
    render(<ScenarioDecisionTree lang="de" />);
    expect(screen.getByText(/Abitur-Urteil \(AFB III\)/i)).toBeInTheDocument();
    expect(screen.getByText(/SACHURTEIL/i)).toBeInTheDocument();
    expect(screen.getByText(/WERTURTEIL/i)).toBeInTheDocument();
    expect(screen.getByText(/ABITUR-KLAUSURSATZ/i)).toBeInTheDocument();
  });

  it("mounts preset scenario per course instead of always fiskalpolitik", () => {
    render(<ScenarioDecisionTree lang="zh" scenarioId="mindestlohn" />);
    expect(screen.queryByText(/债务刹车/)).not.toBeInTheDocument();
    // Resolver routing
    expect(resolveDecisionScenarioId("Mindestlohn und Tarifautonomie", "")).toBe("mindestlohn");
    expect(resolveDecisionScenarioId("Trolley-Dilemma Kant vs Utilitarismus", "")).toBe("trolley");
    expect(resolveDecisionScenarioId("Konjunktur und Wachstum", "")).toBe("fiskalpolitik");
  });
});

