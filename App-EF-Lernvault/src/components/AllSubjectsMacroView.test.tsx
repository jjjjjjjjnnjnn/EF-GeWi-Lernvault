import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
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

  it("switches to synergy tracks tab and renders interdisciplinary progression sequences", () => {
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

    // 验证核心跨学科黄金融通战役存在
    expect(
      screen.getByText(/数理融通 · 微积分极限定理到牛顿动力学方程/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/社哲辨析 · 经济理性人假设与正义分配伦理/i)
    ).toBeInTheDocument();

    // 点击某关卡节点触发查看
    const firstTrack = CROSS_SUBJECT_SYNERGY_TRACKS[0];
    expect(firstTrack.nodeIds.length).toBeGreaterThan(0);
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

  it("adapts language mode to German (DE)", () => {
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
  });
});
