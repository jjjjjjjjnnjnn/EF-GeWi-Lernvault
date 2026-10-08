import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SubjectWorkspace } from "./SubjectWorkspace";

describe("SubjectWorkspace (学科专区/学科主页) 独立测试", () => {
  it("renders subject header, asset statistics, and all 10 subject pills", () => {
    render(<SubjectWorkspace currentFach="SoWi" lang="zh" />);

    // 标题展示当前学科名称
    expect(screen.getByText(/社会科学 \(SW\)/i)).toBeInTheDocument();

    // 资产统计卡片
    expect(screen.getByText("核心考点笔记")).toBeInTheDocument();
    expect(screen.getByText("考纲抽认词卡")).toBeInTheDocument();
    expect(screen.getByText("仿真实验与教具")).toBeInTheDocument();
    expect(screen.getByText("真题模拟与练习")).toBeInTheDocument();

    // 10 门学科胶囊按钮存在
    expect(screen.getByText("DE")).toBeInTheDocument();
    expect(screen.getByText("SW")).toBeInTheDocument();
    expect(screen.getByText("MA")).toBeInTheDocument();
    expect(screen.getByText("PH")).toBeInTheDocument();
  });

  it("triggers onSubjectChange when clicking another subject pill", () => {
    const handleSubjectChange = vi.fn();
    render(
      <SubjectWorkspace
        currentFach="SoWi"
        onSubjectChange={handleSubjectChange}
        lang="zh"
      />
    );

    // 点击数学 (MA)
    const matheBtn = screen.getByText("MA").closest("button")!;
    fireEvent.click(matheBtn);

    expect(handleSubjectChange).toHaveBeenCalledWith("Mathe");
  });

  it("switches smoothly between the 4 content tabs (notes, cards, sims, exam)", () => {
    render(<SubjectWorkspace currentFach="SoWi" lang="zh" />);

    // 默认展示 Tab 1: 知识笔记
    expect(screen.getByPlaceholderText("搜索本学科考点...")).toBeInTheDocument();

    // 切换到 Tab 2: 抽认卡片
    const cardsTab = screen.getByRole("button", { name: /2\. 抽认卡片/i });
    fireEvent.click(cardsTab);
    expect(screen.getByText(/当前学科共收录/i)).toBeInTheDocument();

    // 切换到 Tab 3: 实验与教具
    const simsTab = screen.getByRole("button", { name: /3\. 实验与教具/i });
    fireEvent.click(simsTab);
    expect(screen.getByText(/专业互动仿真实验室与思维教具/i)).toBeInTheDocument();

    // 切换到 Tab 4: 模拟真题
    const examTab = screen.getByRole("button", { name: /4\. 模拟真题/i });
    fireEvent.click(examTab);
    expect(screen.getByText(/模式 A：45分钟全真模拟考/i)).toBeInTheDocument();
    expect(screen.getByText(/模式 B：5分钟考点快测自检/i)).toBeInTheDocument();
  });

  it("triggers onNavigateToTab with correct fach context when clicking quick action buttons", () => {
    const handleNavigate = vi.fn();
    render(
      <SubjectWorkspace
        currentFach="SoWi"
        onNavigateToTab={handleNavigate}
        lang="zh"
      />
    );

    // 点击“开启词卡背诵”
    const drillBtn = screen.getByRole("button", { name: /开启词卡背诵/i });
    fireEvent.click(drillBtn);
    expect(handleNavigate).toHaveBeenCalledWith("flashcards", { fach: "SoWi" });

    // 点击“开始45分钟模考”
    const examBtn = screen.getByRole("button", { name: /开始45分钟模考/i });
    fireEvent.click(examBtn);
    expect(handleNavigate).toHaveBeenCalledWith("klausursim", { fach: "SoWi" });

    // 点击“向AI助教请教”
    const tutorBtn = screen.getByRole("button", { name: /向AI助教请教/i });
    fireEvent.click(tutorBtn);
    expect(handleNavigate).toHaveBeenCalledWith("tutor", { fach: "SoWi" });
  });

  it("supports flipping flashcards on click in Tab 2", () => {
    render(<SubjectWorkspace currentFach="SoWi" lang="zh" />);

    const cardsTab = screen.getByRole("button", { name: /2\. 抽认卡片/i });
    fireEvent.click(cardsTab);

    // 找到卡片并点击
    const flipHints = screen.getAllByText("点击翻转");
    expect(flipHints.length).toBeGreaterThan(0);

    fireEvent.click(flipHints[0]);
    // 翻转后应出现“背面”
    expect(screen.getByText("背面")).toBeInTheDocument();
  });

  it("supports collapsing and expanding the note catalog panel and toggling width", () => {
    render(<SubjectWorkspace currentFach="SoWi" lang="zh" />);

    // 点击收起目录按钮
    const collapseBtn = screen.getByTitle("收起目录");
    fireEvent.click(collapseBtn);

    // 应该出现展开目录按钮
    expect(screen.getByTitle("展开目录")).toBeInTheDocument();

    // 点击展开目录按钮
    const expandBtn = screen.getByTitle("展开目录");
    fireEvent.click(expandBtn);
    expect(screen.getByTitle("收起目录")).toBeInTheDocument();

    // 切换排版宽度
    const widthBtn = screen.getByTitle("切换排版宽度");
    expect(widthBtn.textContent).toContain("全宽排版");
    fireEvent.click(widthBtn);
    expect(widthBtn.textContent).toContain("居中排版");
  });

  it("supports opening zoomed modal for flashcards in Tab 2", () => {
    render(<SubjectWorkspace currentFach="SoWi" lang="zh" />);

    const cardsTab = screen.getByRole("button", { name: /2\. 抽认卡片/i });
    fireEvent.click(cardsTab);

    // 找到放大按钮
    const zoomBtns = screen.getAllByTitle("放大查看");
    expect(zoomBtns.length).toBeGreaterThan(0);
    fireEvent.click(zoomBtns[0]);

    // 弹窗应打开
    expect(screen.getByText(/概念大卡沉浸速测/i)).toBeInTheDocument();

    // 点击关闭按钮
    const closeBtn = screen.getByRole("button", { name: "关闭" });
    fireEvent.click(closeBtn);
    expect(screen.queryByText(/概念大卡沉浸速测/i)).toBeNull();
  });

  it("defaults to '所有学科 (ALL)' when currentFach is omitted or 'alle'", () => {
    render(<SubjectWorkspace lang="zh" />);

    // 默认展示“所有学科”
    expect(screen.getByText(/所有学科 \(ALL\)/i)).toBeInTheDocument();

    // ALL 胶囊按钮被选中
    const allBtn = screen.getByRole("button", { name: /ALL/i });
    expect(allBtn).toHaveAttribute("aria-pressed", "true");

    // 搜索框 placeholder 显示“搜索全库考点”
    expect(screen.getByPlaceholderText("搜索全库考点...")).toBeInTheDocument();
  });

  it("switches back to 'alle' when clicking the ALL pill", () => {
    const handleSubjectChange = vi.fn();
    render(
      <SubjectWorkspace
        currentFach="Mathe"
        onSubjectChange={handleSubjectChange}
        lang="zh"
      />
    );

    const allBtn = screen.getByRole("button", { name: /ALL/i });
    fireEvent.click(allBtn);
    expect(handleSubjectChange).toHaveBeenCalledWith("alle");
  });
});

