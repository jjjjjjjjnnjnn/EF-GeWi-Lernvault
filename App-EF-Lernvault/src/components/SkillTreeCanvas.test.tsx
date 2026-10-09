import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
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
    const { rerender } = render(
      <SkillTreeCanvas
        lang="zh"
        initialFach="SoWi"
        onSubjectChange={handleSubjectChange}
      />
    );

    // 外部顶栏切换学科至数学 (Mathe)
    rerender(
      <SkillTreeCanvas
        lang="zh"
        initialFach="Mathe"
        onSubjectChange={handleSubjectChange}
      />
    );

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
    const preismechanismusNode = screen.getByTestId("skill-node-sowi-preismechanismus");
    fireEvent.click(preismechanismusNode);

    // 抽屉展开
    const drawer = screen.getByTestId("skill-tree-node-drawer");
    expect(drawer).toBeInTheDocument();
    expect(within(drawer).getByRole("heading", { name: "价格形成机制与市场均衡十字" })).toBeInTheDocument();

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

    // 通过 JSON 导入导出面板打开新增学科弹窗
    const jsonBtn = screen.getByRole("button", { name: "JSON" });
    fireEvent.click(jsonBtn);
    const openSubBtn = screen.getByRole("button", { name: "+ 新增学科" });
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

    // 验证新学科太阳核心已渲染
    expect(screen.getByText("计算机科学")).toBeInTheDocument();
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

  it("filters nodes by expandable category and tag dropdowns and opens JSON export modal", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    // 通过点击展开式下拉框选择微观经济分类
    const catSelect = screen.getByTestId("filter-category-select");
    expect(catSelect).toBeInTheDocument();
    fireEvent.change(catSelect, { target: { value: "Mikrooekonomie" } });
    expect(catSelect).toHaveValue("Mikrooekonomie");

    // 打开 JSON 导入导出弹窗
    const jsonBtn = screen.getByRole("button", { name: "JSON" });
    fireEvent.click(jsonBtn);

    expect(screen.getByText("知识图谱与技能树 JSON 导入与导出中心")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "校验并导入图谱" })).toBeInTheDocument();
  });

  it("supports multilingual fuzzy search with typo and cross-language tolerance", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    const searchInput = screen.getByPlaceholderText(/模糊检索/i);
    expect(searchInput).toBeInTheDocument();

    // 1. 输入德语模糊检索词 "preismech"
    fireEvent.change(searchInput, { target: { value: "preismech" } });
    expect(screen.getByTestId("skill-node-sowi-preismechanismus")).toBeInTheDocument();

    // 2. 输入中文检索词
    fireEvent.change(searchInput, { target: { value: "稀缺性" } });
    expect(screen.getByTestId("skill-node-sowi-beduerfnis-knappheit")).toBeInTheDocument();

    // 3. 清空检索
    const clearBtn = screen.getByTitle("清空");
    fireEvent.click(clearBtn);
    expect(searchInput).toHaveValue("");
  });

  it("supports free node dragging, displays reset indicator, and resets back to default", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    const nodeEl = screen.getByTestId("skill-node-sowi-beduerfnis-knappheit");
    expect(nodeEl).toBeInTheDocument();

    // 模拟拖拽动作 (pointerdown -> pointermove -> pointerup)
    fireEvent.pointerDown(nodeEl, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(nodeEl, { clientX: 180, clientY: 220, pointerId: 1 });
    fireEvent.pointerUp(nodeEl, { clientX: 180, clientY: 220, pointerId: 1 });

    // 应该出现移动提示与复位按钮
    expect(screen.getByText(/已自定义移动 1 个节点位置/)).toBeInTheDocument();
    const resetBtn = screen.getByRole("button", { name: "复位默认" });
    expect(resetBtn).toBeInTheDocument();

    // 点击复位
    fireEvent.click(resetBtn);
    expect(screen.queryByText(/已自定义移动/)).not.toBeInTheDocument();
  });

  it("supports mouse wheel zooming on SVG canvas", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    const svg = screen.getByTestId("skill-tree-svg");
    expect(svg).toBeInTheDocument();

    // 滚轮缩小
    fireEvent.wheel(svg, { deltaY: 100, clientX: 500, clientY: 400 });
    // 滚轮放大
    fireEvent.wheel(svg, { deltaY: -100, clientX: 500, clientY: 400 });

    expect(svg).toBeInTheDocument();
  });

  it("supports subject navigation smoothly via initialFach", () => {
    const handleSubjectChange = vi.fn();
    const { rerender } = render(
      <SkillTreeCanvas
        lang="zh"
        initialFach="SoWi"
        onSubjectChange={handleSubjectChange}
      />
    );

    expect(screen.getByTestId("skill-node-sowi-beduerfnis-knappheit")).toBeInTheDocument();

    // 外部顶栏切换到德语学科
    rerender(
      <SkillTreeCanvas
        lang="zh"
        initialFach="Deutsch"
        onSubjectChange={handleSubjectChange}
      />
    );
    expect(handleSubjectChange).toHaveBeenCalledWith("Deutsch");
    expect(screen.getByTestId("skill-node-deutsch-sachtext-textsorten-bericht-inhaltsangabe")).toBeInTheDocument();
  });

  it("supports causal focus on hover and renders laned tech tree milestones", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    // 悬停在价格机制节点上触发因果链路聚焦
    const preismechanismusNode = screen.getByTestId("skill-node-sowi-preismechanismus");
    fireEvent.pointerEnter(preismechanismusNode);

    // 验证因果链前置指示徽章出现 (上游前置链路全部高亮标记)
    expect(screen.getAllByText("← 前置").length).toBeGreaterThan(0);

    fireEvent.pointerLeave(preismechanismusNode);

    // 切换到科技树网格模式
    const treeBtn = screen.getByRole("button", { name: "认知阶梯树" });
    fireEvent.click(treeBtn);

    // 验证 5 纵深阶段里程碑标题卡正常渲染
    expect(screen.getByText("SEK I · 基础认知 (AFB I)")).toBeInTheDocument();
    expect(screen.getByText("EF · 核心奠基 (AFB II)")).toBeInTheDocument();
    expect(screen.getByText("Q1 · 进阶机制 (AFB II)")).toBeInTheDocument();
  });

  it("supports closing and retracting drawer via same-node toggle, close button, Escape key, and empty canvas click", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    const preismechanismusNode = screen.getByTestId("skill-node-sowi-preismechanismus");

    // 1. 点击节点，抽屉抽拉展开 (open)
    fireEvent.click(preismechanismusNode);
    const drawer = screen.getByTestId("skill-tree-node-drawer");
    expect(drawer).toHaveAttribute("data-state", "open");
    expect(drawer).toHaveClass("translate-x-0");

    // 2. 再次点击同一节点，抽屉反选平滑收回 (closed)，右边缘悬浮小拉手出现
    fireEvent.click(preismechanismusNode);
    expect(drawer).toHaveAttribute("data-state", "closed");
    expect(drawer).toHaveClass("translate-x-full");
    expect(screen.getByTestId("skill-tree-drawer-open-handle")).toBeInTheDocument();

    // 3. 点击节点再次展开，然后点击右上角小叉收回
    fireEvent.click(preismechanismusNode);
    expect(drawer).toHaveAttribute("data-state", "open");
    const closeBtn = screen.getByTestId("skill-tree-drawer-close");
    fireEvent.click(closeBtn);
    expect(drawer).toHaveAttribute("data-state", "closed");
    expect(screen.getByTestId("skill-tree-drawer-open-handle")).toBeInTheDocument();

    // 4. 点击小拉手重新抽拉展开，按 ESC 键收回
    const openHandle = screen.getByTestId("skill-tree-drawer-open-handle");
    fireEvent.click(openHandle);
    expect(drawer).toHaveAttribute("data-state", "open");
    fireEvent.keyDown(window, { key: "Escape" });
    expect(drawer).toHaveAttribute("data-state", "closed");

    // 5. 点击节点再次展开，点击空白画布背景收回
    fireEvent.click(preismechanismusNode);
    expect(drawer).toHaveAttribute("data-state", "open");
    const canvasBg = screen.getByTestId("skill-tree-canvas-bg");
    fireEvent.click(canvasBg);
    expect(drawer).toHaveAttribute("data-state", "closed");
  });

  it("automatically re-opens drawer when clicking any node from collapsed state", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    const preismechanismusNode = screen.getByTestId("skill-node-sowi-preismechanismus");
    const knappheitNode = screen.getByTestId("skill-node-sowi-beduerfnis-knappheit");

    // 1. 打开抽屉
    fireEvent.click(preismechanismusNode);
    const drawer = screen.getByTestId("skill-tree-node-drawer");
    expect(drawer).toHaveAttribute("data-state", "open");

    // 2. 点击关闭按钮收回抽屉
    const closeBtn = screen.getByTestId("skill-tree-drawer-close");
    fireEvent.click(closeBtn);
    expect(drawer).toHaveAttribute("data-state", "closed");

    // 3. 抽屉收回状态下，点击同一个节点，必须自动弹出 (不能因为同一节点而不触发或反选)
    fireEvent.click(preismechanismusNode);
    expect(drawer).toHaveAttribute("data-state", "open");

    // 4. 再次按 ESC 收回
    fireEvent.keyDown(window, { key: "Escape" });
    expect(drawer).toHaveAttribute("data-state", "closed");

    // 5. 抽屉收回状态下，点击另一个节点，也必须自动弹出
    fireEvent.click(knappheitNode);
    expect(drawer).toHaveAttribute("data-state", "open");
  });

  it("adapts canvas and drawer text dynamically based on unified global language", () => {
    const { rerender } = render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    // 中文模式下 Sun Nucleus 与考点胶囊展示中文
    expect(screen.getByText("社会科学 (SoWi)")).toBeInTheDocument();
    expect(screen.getAllByText("价格形成机制与市场均衡十字").length).toBeGreaterThan(0);

    // 切换至纯德语模式
    rerender(<SkillTreeCanvas lang="de" initialFach="SoWi" />);

    // 纯德语模式下 Sun Nucleus 与考点完全以德语考纲规范术语呈现，零中文泄漏
    expect(screen.getByText("Sozialwissenschaften")).toBeInTheDocument();
    expect(screen.getAllByText("Preismechanismus & Marktgleichgewicht").length).toBeGreaterThan(0);
  });

  it("switches to '所有学科' (Alle Fächer) macro view and allows cross-subject drilldown", () => {
    const handleSubjectChange = vi.fn();
    render(
      <SkillTreeCanvas
        lang="zh"
        initialFach="ALL"
        onSubjectChange={handleSubjectChange}
      />
    );

    // 应当展示所有学科宏观星盘视图
    expect(screen.getByTestId("all-subjects-macro-view")).toBeInTheDocument();
    expect(screen.getByTestId("all-subjects-astrolabe")).toBeInTheDocument();

    // 2. 在全科搜索框中检索考点并选择
    const searchInput = screen.getByTestId("all-subjects-search-input");
    fireEvent.change(searchInput, { target: { value: "价格形成机制" } });

    const searchResultItem = screen.getByTestId("search-result-sowi-preismechanismus");
    expect(searchResultItem).toBeInTheDocument();
    fireEvent.click(searchResultItem);

    // 3. 研习抽屉展开并显示该知识点信息，同时出现学科穿梭胶囊
    const drawer = screen.getByTestId("skill-tree-node-drawer");
    expect(drawer).toHaveAttribute("data-state", "open");
    expect(within(drawer).getByRole("heading", { name: "价格形成机制与市场均衡十字" })).toBeInTheDocument();

    // 4. 点击学科穿梭按钮，一键进入该学科单科精细图谱
    const jumpBtn = screen.getByTestId("drawer-jump-to-fach");
    expect(jumpBtn).toBeInTheDocument();
    fireEvent.click(jumpBtn);

    // 验证成功切入单科
    expect(handleSubjectChange).toHaveBeenCalledWith("SoWi");
    expect(screen.getByTestId("skill-node-sowi-preismechanismus")).toBeInTheDocument();
  });

  it("does not close drawer when dragging or panning canvas with mouse move", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    const preismechanismusNode = screen.getByTestId("skill-node-sowi-preismechanismus");
    fireEvent.click(preismechanismusNode);

    const drawer = screen.getByTestId("skill-tree-node-drawer");
    expect(drawer).toHaveAttribute("data-state", "open");

    const svg = screen.getByTestId("skill-tree-svg");
    const canvasBg = screen.getByTestId("skill-tree-canvas-bg");

    // 模拟鼠标左键在画布空白区域按下并平移拖拽 (位移 50px)
    fireEvent.pointerDown(svg, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(svg, { clientX: 150, clientY: 150, pointerId: 1 });
    fireEvent.pointerUp(svg, { clientX: 150, clientY: 150, pointerId: 1 });
    fireEvent.click(canvasBg);

    // 抽屉和选中节点绝不能因为平移移动而误关闭！
    expect(drawer).toHaveAttribute("data-state", "open");
    expect(within(drawer).getByRole("heading", { name: "价格形成机制与市场均衡十字" })).toBeInTheDocument();

    // 验证真正的静止空白点击依然可以正确关闭抽屉
    fireEvent.click(canvasBg);
    expect(drawer).toHaveAttribute("data-state", "closed");
  });

  it("retracts drawer when single-clicking empty canvas via pointer events without dragging", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="SoWi" />);

    const preismechanismusNode = screen.getByTestId("skill-node-sowi-preismechanismus");
    fireEvent.click(preismechanismusNode);

    const drawer = screen.getByTestId("skill-tree-node-drawer");
    expect(drawer).toHaveAttribute("data-state", "open");

    const svg = screen.getByTestId("skill-tree-svg");

    // 纯单点指针事件 (位移 0px)
    fireEvent.pointerDown(svg, { clientX: 200, clientY: 200, pointerId: 1 });
    fireEvent.pointerUp(svg, { clientX: 200, clientY: 200, pointerId: 1 });

    // 抽屉应当立即平滑收回！
    expect(drawer).toHaveAttribute("data-state", "closed");
  });

  it("retracts drawer when clicking empty canvas in '所有学科' macro view", () => {
    render(<SkillTreeCanvas lang="zh" initialFach="ALL" />);

    // 1. 搜索并选择考点展开抽屉
    const searchInput = screen.getByTestId("all-subjects-search-input");
    fireEvent.change(searchInput, { target: { value: "价格形成机制" } });
    const searchResultItem = screen.getByTestId("search-result-sowi-preismechanismus");
    fireEvent.click(searchResultItem);

    const drawer = screen.getByTestId("skill-tree-node-drawer");
    expect(drawer).toHaveAttribute("data-state", "open");

    // 2. 点击宏观星盘空白背景
    const astrolabeBg = screen.getByTestId("all-subjects-astrolabe-bg");
    fireEvent.click(astrolabeBg);

    // 抽屉应当被成功收回！
    expect(drawer).toHaveAttribute("data-state", "closed");
  });
});



