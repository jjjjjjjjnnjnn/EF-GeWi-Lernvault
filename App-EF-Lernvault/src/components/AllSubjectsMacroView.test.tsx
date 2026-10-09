import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import { AllSubjectsMacroView, CROSS_SUBJECT_SYNERGY_TRACKS } from "./AllSubjectsMacroView";

describe("AllSubjectsMacroView Component (所有学科宏观星图与跨学科聚合总台)", () => {
  it("renders macro astrolabe and global KPIs by default", () => {
    const handleSelectSubject = vi.fn();
    const handleSelectNode = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="zh"
        nodeLangMode="zh"
        onSelectSubject={handleSelectSubject}
        onSelectNode={handleSelectNode}
        masteredIds={new Set(["sowi-beduerfnis-knappheit"])}
      />
    );

    expect(screen.getByTestId("all-subjects-macro-view")).toBeInTheDocument();
    expect(screen.getByTestId("all-subjects-astrolabe")).toBeInTheDocument();

    // 默认展示全科中心太阳标识与德国会考年份
    expect(screen.getByText("ABITUR 2027")).toBeInTheDocument();
    expect(screen.getByText("GYMNASIUM NRW")).toBeInTheDocument();

    // 验证顶栏 Tab 存在
    expect(screen.getByRole("button", { name: /全科引力星盘/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /学阶矩阵阵列/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /跨学科融通战役/i })).toBeInTheDocument();
  });

  it("switches to matrix tab and jumps into specific subject on button click", () => {
    const handleSelectSubject = vi.fn();
    const handleSelectNode = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="zh"
        nodeLangMode="zh"
        onSelectSubject={handleSelectSubject}
        onSelectNode={handleSelectNode}
        masteredIds={new Set()}
      />
    );

    // 点击切换至矩阵视图
    const matrixTabBtn = screen.getByRole("button", { name: /学阶矩阵阵列/i });
    fireEvent.click(matrixTabBtn);

    expect(screen.getByTestId("all-subjects-matrix")).toBeInTheDocument();
    expect(screen.getByText("全学科考阶阵列矩阵与备考总台")).toBeInTheDocument();

    // 验证学科卡片存在并可点击深入
    const sowiJumpBtn = screen.getByTestId("jump-to-fach-SoWi");
    expect(sowiJumpBtn).toBeInTheDocument();
    fireEvent.click(sowiJumpBtn);

    expect(handleSelectSubject).toHaveBeenCalledWith("SoWi");
  });

  it("switches to synergy tracks tab and renders 4 interdisciplinary battle clusters with 4-stage causal chains", () => {
    const handleSelectSubject = vi.fn();
    const handleSelectNode = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="zh"
        nodeLangMode="zh"
        onSelectSubject={handleSelectSubject}
        onSelectNode={handleSelectNode}
        masteredIds={new Set()}
      />
    );

    // 切换至跨学科战役
    const synergyTabBtn = screen.getByRole("button", { name: /跨学科融通战役/i });
    fireEvent.click(synergyTabBtn);

    expect(screen.getByTestId("all-subjects-synergy-tracks")).toBeInTheDocument();

    // 验证四大跨学科黄金融通战役存在
    expect(
      screen.getByText(/异化劳动与资本 · 现代异化劳动、主体物化与资本主义批判全景沙盘/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/社哲辨析 · 经济理性人假设与正义分配伦理/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/数理融通 · 微积分极限定理到牛顿动力学方程/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/德哲思辨 · 论说修辞结构与认识论批判标准/i)
    ).toBeInTheDocument();

    // 验证四大战役数据完整性
    expect(CROSS_SUBJECT_SYNERGY_TRACKS).toHaveLength(4);
    for (const track of CROSS_SUBJECT_SYNERGY_TRACKS) {
      expect(track.stages).toHaveLength(4);
      expect(track.linkedNotePath).toBeTruthy();
      expect(track.operator).toBeTruthy();
      expect(track.szenarioQuestionZH).toBeTruthy();
      expect(track.szenarioQuestionDE).toBeTruthy();
      expect(track.methodischeBrueckeZH).toBeTruthy();
      expect(track.klausurSynthese15NP_ZH).toBeTruthy();
    }

    // 检查阶段流标识 (Schritt 1 到 Schritt 4)
    expect(screen.getAllByText(/Schritt 1/i).length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByText(/Schritt 2/i).length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByText(/Schritt 3/i).length).toBeGreaterThanOrEqual(4);
    expect(screen.getAllByText(/Schritt 4/i).length).toBeGreaterThanOrEqual(4);
  });

  it("renders SVG Bezier gravitational bridges (inter-subject-bridge-link) and activates HUD on pill click", () => {
    const handleSelectSubject = vi.fn();
    const handleSelectNode = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="zh"
        nodeLangMode="zh"
        onSelectSubject={handleSelectSubject}
        onSelectNode={handleSelectNode}
        masteredIds={new Set()}
      />
    );

    // 验证纯 SVG 贝塞尔引力桥连线存在
    const bridgeLinks = screen.getAllByTestId("inter-subject-bridge-link");
    expect(bridgeLinks.length).toBeGreaterThan(0);

    // 点击星盘顶部的战役筛选胶囊激活变化率战役
    const rateOfChangePill = screen.getByTestId(
      `astrolabe-synergy-pill-cluster_rate_of_change`
    );
    expect(rateOfChangePill).toBeInTheDocument();
    fireEvent.click(rateOfChangePill);

    // 验证星盘浮动战役 HUD 显现
    const hud = screen.getByTestId("astrolabe-active-synergy-hud");
    expect(hud).toBeInTheDocument();
    expect(within(hud).getByText(/数理融通 · 微积分极限定理到牛顿动力学方程/i)).toBeInTheDocument();

    // 检查激活的引力桥连线具备 active-bridge 类
    const activeBridges = bridgeLinks.filter((el) => el.classList.contains("active-bridge"));
    expect(activeBridges.length).toBeGreaterThan(0);
  });

  it("triggers onStartSzenario and opens interactive simulation modal on button click", () => {
    const handleStartSzenario = vi.fn();
    const handleOpenNote = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="zh"
        nodeLangMode="zh"
        onSelectSubject={vi.fn()}
        onSelectNode={vi.fn()}
        onStartSzenario={handleStartSzenario}
        onOpenNote={handleOpenNote}
        masteredIds={new Set()}
      />
    );

    // 切换至跨学科战役
    fireEvent.click(screen.getByRole("button", { name: /跨学科融通战役/i }));

    // 点击异化劳动战役的大题模拟按钮
    const startBtn = screen.getByTestId("start-szenario-btn-cluster_alienation_labor");
    expect(startBtn).toBeInTheDocument();
    fireEvent.click(startBtn);

    // 回调必须被正确触发，并携带完整的战役配置对象
    expect(handleStartSzenario).toHaveBeenCalledTimes(1);
    expect(handleStartSzenario).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "cluster_alienation_labor",
        operator: "beurteilen (AFB III)",
      })
    );

    // 验证交互式大题模拟沙盒模态框弹出
    const modal = screen.getByTestId("afb3-simulation-modal");
    expect(modal).toBeInTheDocument();
    expect(within(modal).getByText(/AFB III 满分作答规范指引/i)).toBeInTheDocument();
    expect(within(modal).getByText(/15 NP 踩分话术示范/i)).toBeInTheDocument();

    // 点击填入示范话术
    const pasteSampleBtn = within(modal).getByRole("button", { name: /填入示范话术/i });
    fireEvent.click(pasteSampleBtn);
    const textarea = within(modal).getByRole("textbox") as HTMLTextAreaElement;
    expect(textarea.value).toContain("在会考最高评价阶（AFB III）中");

    // 点击完成退出模态框
    const finishBtn = within(modal).getByRole("button", { name: /完成退出/i });
    fireEvent.click(finishBtn);
    expect(screen.queryByTestId("afb3-simulation-modal")).not.toBeInTheDocument();
  });

  it("triggers onOpenNote callback when clicking Vernetzungsnotiz öffnen", () => {
    const handleOpenNote = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="zh"
        nodeLangMode="zh"
        onSelectSubject={vi.fn()}
        onSelectNode={vi.fn()}
        onOpenNote={handleOpenNote}
        masteredIds={new Set()}
      />
    );

    // 切换至跨学科战役
    fireEvent.click(screen.getByRole("button", { name: /跨学科融通战役/i }));

    // 点击研读考纲笔记按钮
    const openNoteBtn = screen.getByTestId("open-note-btn-cluster_justice_welfare");
    expect(openNoteBtn).toBeInTheDocument();
    fireEvent.click(openNoteBtn);

    // 验证回调携带关联的八段式考纲笔记路径
    expect(handleOpenNote).toHaveBeenCalledWith(
      "07_Philosophie/Gerechtigkeit-Wirtschaftsethik-Vernetzung.md"
    );
  });

  it("supports real-time cross-subject node search and selection", () => {
    const handleSelectSubject = vi.fn();
    const handleSelectNode = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="zh"
        nodeLangMode="zh"
        onSelectSubject={handleSelectSubject}
        onSelectNode={handleSelectNode}
        masteredIds={new Set()}
      />
    );

    // 在搜索框输入市场均衡
    const searchInput = screen.getByTestId("all-subjects-search-input");
    fireEvent.change(searchInput, { target: { value: "市场均衡" } });

    // 应该匹配并弹出候选列表
    expect(screen.getByText(/匹配考点清单/i)).toBeInTheDocument();
    const matchedNodeItem = screen.getByText("价格形成机制与市场均衡十字");
    expect(matchedNodeItem).toBeInTheDocument();

    // 点击匹配考点
    fireEvent.click(matchedNodeItem);
    expect(handleSelectNode).toHaveBeenCalled();
  });

  it("adapts language mode to German (DE) without Chinese leakage in synergy cards", () => {
    const handleSelectSubject = vi.fn();
    const handleSelectNode = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="de"
        nodeLangMode="de"
        onSelectSubject={handleSelectSubject}
        onSelectNode={handleSelectNode}
        masteredIds={new Set()}
      />
    );

    // 德语标签
    expect(screen.getByText("Kosmos-Astrolabium")).toBeInTheDocument();
    expect(screen.getByText("Fächer-Matrix")).toBeInTheDocument();
    expect(screen.getByText("Vernetzungs-Pfade")).toBeInTheDocument();

    // 切换至战役
    fireEvent.click(screen.getByRole("button", { name: /Vernetzungs-Pfade/i }));

    // 验证德语核心标题与描述
    expect(
      screen.getByText("Entfremdete Arbeit, Verdinglichung & Kapitalismuskritik")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Gerechtigkeit, Institutionen & Wohlfahrtsstaat")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Dynamische Änderungsraten & Erhaltungssätze")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Argumentation, Leserlenkung & Sprachmittlung")
    ).toBeInTheDocument();

    // 检查按钮文本完全德语化
    expect(screen.getAllByText("Klausur-Szenario starten").length).toBe(4);
    expect(screen.getAllByText("Vernetzungsnotiz öffnen").length).toBe(4);
    expect(screen.getAllByText(/Methodische Brücke:/i).length).toBe(4);
  });

  it("calls onDeselectNode when clicking on blank astrolabe space, but not when panning", () => {
    const handleSelectSubject = vi.fn();
    const handleSelectNode = vi.fn();
    const handleDeselectNode = vi.fn();

    render(
      <AllSubjectsMacroView
        lang="zh"
        nodeLangMode="zh"
        onSelectSubject={handleSelectSubject}
        onSelectNode={handleSelectNode}
        onDeselectNode={handleDeselectNode}
        masteredIds={new Set()}
      />
    );

    const astrolabeSvg = screen.getByTestId("all-subjects-astrolabe");
    const astrolabeBg = screen.getByTestId("all-subjects-astrolabe-bg");

    // 1. 拖拽平移操作 (位移 50px) 绝不能触发取消选择！
    fireEvent.pointerDown(astrolabeSvg, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerMove(astrolabeSvg, { clientX: 150, clientY: 150, pointerId: 1 });
    fireEvent.pointerUp(astrolabeSvg, { clientX: 150, clientY: 150, pointerId: 1 });
    fireEvent.click(astrolabeBg);

    expect(handleDeselectNode).not.toHaveBeenCalled();

    // 2. 纯单点空白背景 (位移 <= 8px) 必须精确触发取消选择！
    fireEvent.pointerDown(astrolabeSvg, { clientX: 100, clientY: 100, pointerId: 1 });
    fireEvent.pointerUp(astrolabeSvg, { clientX: 100, clientY: 100, pointerId: 1 });
    expect(handleDeselectNode).toHaveBeenCalledTimes(1);

    // 3. 点击背景 rect 也触发取消选择
    fireEvent.click(astrolabeBg);
    expect(handleDeselectNode).toHaveBeenCalledTimes(2);
  });
});
