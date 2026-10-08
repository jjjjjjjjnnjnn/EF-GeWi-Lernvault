import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SkillTreeCanvas } from "./SkillTreeCanvas";

describe("SkillTreeCanvas Component (可插拔知识图谱与技能树画布测试)", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders canvas with default subject and builtin knowledge nodes", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    expect(screen.getByTestId("skill-tree-canvas-container")).toBeInTheDocument();
    expect(screen.getByTestId("skill-tree-svg")).toBeInTheDocument();

    // 默认 SoWi 学科知识点应该正常呈现在画布中
    expect(screen.getByTestId("skill-node-sowi-beduerfnis-knappheit")).toBeInTheDocument();
    expect(screen.getByTestId("skill-node-sowi-preismechanismus")).toBeInTheDocument();
    expect(screen.getByTestId("skill-node-sowi-magisches-viereck")).toBeInTheDocument();
  });

  it("switches subject to Mathe and renders mathematical progression nodes", () => {
    const handleSubjectChange = vi.fn();
    render(
      <SkillTreeCanvas
        lang="zh"
        initialFach="SoWi"
        onSubjectChange={handleSubjectChange}
      />
    );

    // 点击切换至数学
    const matheButton = screen.getByRole("button", { name: "数学 (Mathe)" });
    fireEvent.click(matheButton);

    expect(handleSubjectChange).toHaveBeenCalledWith("Mathe");
    expect(screen.getByTestId("skill-node-mathe-aenderungsrate-sekante")).toBeInTheDocument();
    expect(screen.getByText("瞬时导数定义与切线极限逼近")).toBeInTheDocument();
    expect(screen.getByText("实际几何与经济最优化建模")).toBeInTheDocument();
  });

  it("opens knowledge drawer when clicking a node and renders detailed scoring tips", () => {
    const handleStartCourse = vi.fn();
    render(
      <SkillTreeCanvas
        lang="zh"
        initialFach="SoWi"
        onStartCourse={handleStartCourse}
      />
    );

    // 点击价格机制节点
    const preismechanismusNode = screen.getByText("价格形成机制与市场均衡十字");
    fireEvent.click(preismechanismusNode);

    // 抽屉展开
    const drawer = screen.getByTestId("skill-tree-node-drawer");
    expect(drawer).toBeInTheDocument();
    expect(screen.getByText("Preismechanismus & Marktgleichgewicht")).toBeInTheDocument();

    // 验证得分核心句
    expect(
      screen.getByText(/Der Gleichgewichtspreis erfüllt Signalfunktion/i)
    ).toBeInTheDocument();

    // 验证关联微课按钮直达
    const reiseButton = screen.getByRole("button", { name: /启动探究式微课/i });
    expect(reiseButton).toBeInTheDocument();
    fireEvent.click(reiseButton);
    expect(handleStartCourse).toHaveBeenCalledWith("Sowi-Preismechanismus-Markt-L1");
  });

  it("toggles node mastery status and persists in state", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    // 点击起始稀缺性节点
    fireEvent.click(screen.getByTestId("skill-node-sowi-beduerfnis-knappheit"));

    // 点击标记已掌握
    const masterBtn = screen.getByRole("button", { name: /标记已掌握/i });
    fireEvent.click(masterBtn);

    // 状态切换为已精通
    expect(screen.getByText(/已精通掌握/i)).toBeInTheDocument();
  });

  it("opens add-node modal and dynamically inserts hot-pluggable knowledge node", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    // 打开拼插知识点弹窗
    const openAddBtn = screen.getByRole("button", { name: /拼插知识点/i });
    fireEvent.click(openAddBtn);

    expect(screen.getByText("拼插新知识点 (Hot-Pluggable Node)")).toBeInTheDocument();

    // 输入表单
    const zhInput = screen.getByPlaceholderText(/货币传导机制与凯恩斯陷阱/i);
    const deInput = screen.getByPlaceholderText(/Transmissionsmechanismus/i);

    fireEvent.change(zhInput, { target: { value: "货币传导机制与通胀" } });
    fireEvent.change(deInput, { target: { value: "Transmissionsmechanismus" } });

    // 提交拼插
    const submitBtn = screen.getByRole("button", { name: "确认拼插" });
    fireEvent.click(submitBtn);

    // 验证新知识点已即时渲染到画布上
    expect(screen.getByText("货币传导机制与通胀")).toBeInTheDocument();
  });

  it("creates and registers a new custom subject dynamically", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    // 打开新增学科弹窗
    const openSubBtn = screen.getByRole("button", { name: "+ 学科" });
    fireEvent.click(openSubBtn);

    expect(screen.getByText("开辟新学科板块 (Fach-Erweiterung)")).toBeInTheDocument();

    // 填写新学科信息 (Informatik)
    const idInput = screen.getByPlaceholderText("z.B. Informatik");
    const deInput = screen.getByPlaceholderText("Informatik");
    const zhInput = screen.getByPlaceholderText("计算机科学");

    fireEvent.change(idInput, { target: { value: "Informatik" } });
    fireEvent.change(deInput, { target: { value: "Informatik" } });
    fireEvent.change(zhInput, { target: { value: "计算机科学" } });

    // 提交创建
    const createBtn = screen.getByRole("button", { name: "创建学科" });
    fireEvent.click(createBtn);

    // 验证顶部已切换并高亮选中新学科
    expect(screen.getByRole("button", { name: "计算机科学", pressed: true })).toBeInTheDocument();
  });

  it("toggles between planetary orbit and progression tree view modes", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    // 默认应该是行星引力星系模式
    const planetaryBtn = screen.getByRole("button", { name: "行星引力星系" });
    expect(planetaryBtn).toHaveAttribute("aria-pressed", "true");

    // 切换到认知阶梯树模式
    const treeBtn = screen.getByRole("button", { name: "认知阶梯树" });
    fireEvent.click(treeBtn);
    expect(treeBtn).toHaveAttribute("aria-pressed", "true");
    expect(planetaryBtn).toHaveAttribute("aria-pressed", "false");
  });

  it("filters nodes by category chip and opens JSON export modal", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    // 点击微观经济分类
    const mikroChip = screen.getByRole("button", { name: "Mikrooekonomie" });
    fireEvent.click(mikroChip);

    // 打开 JSON 导入导出弹窗
    const jsonBtn = screen.getByRole("button", { name: "JSON" });
    fireEvent.click(jsonBtn);

    expect(screen.getByText("知识图谱与技能树 JSON 导入与导出中心")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "校验并导入图谱" })).toBeInTheDocument();
  });
});

