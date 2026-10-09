import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CoursePipelineModal } from "./CoursePipelineModal";

describe("CoursePipelineModal (书本-课程集生成流水线工坊测试)", () => {
  it("renders modal with header and preset book selectors when open", () => {
    render(<CoursePipelineModal isOpen={true} onClose={vi.fn()} lang="zh" />);

    expect(screen.getByText("书本 -> 趣味互动课程集生成流水线")).toBeInTheDocument();
    expect(screen.getByText("SoWi 经济政策与市场 (EF)")).toBeInTheDocument();
    expect(screen.getByText("Philosophie 实践理性与道德 (EF)")).toBeInTheDocument();
    expect(screen.getByText("Mathe 微积分与导数入门 (EF)")).toBeInTheDocument();
  });

  it("applies book preset and updates form fields", () => {
    render(<CoursePipelineModal isOpen={true} onClose={vi.fn()} lang="zh" />);

    const philoPreset = screen.getByText("Philosophie 实践理性与道德 (EF)");
    fireEvent.click(philoPreset);

    const titleInput = screen.getByPlaceholderText("z. B. SoWi EF Wirtschaftspolitik") as HTMLInputElement;
    expect(titleInput.value).toBe("Einführung in die praktische Philosophie");
  });

  it("executes the pipeline and displays the resulting quest map and episodes", async () => {
    const handleLaunch = vi.fn();
    render(
      <CoursePipelineModal
        isOpen={true}
        onClose={vi.fn()}
        lang="zh"
        onLaunchCourse={handleLaunch}
      />
    );

    // 点击生成全套课程集
    const runBtn = screen.getByRole("button", { name: /启动流水线生成全套课程集/i });
    fireEvent.click(runBtn);

    // 等待生成完成
    await waitFor(() => {
      const campaignBadges = screen.getAllByText(/Campaign:/i);
      expect(campaignBadges.length).toBeGreaterThan(0);
    });

    // 验证关卡列表呈现
    expect(screen.getByText("Episode 1")).toBeInTheDocument();
    expect(screen.getByText("[CRISIS-HOOK] 关卡危机情境")).toBeInTheDocument();
    expect(screen.getByText(/8步互动微课脚本规范/i)).toBeInTheDocument();
  });

  it("calls onClose when clicking close button", () => {
    const handleClose = vi.fn();
    render(<CoursePipelineModal isOpen={true} onClose={handleClose} lang="zh" />);

    const closeBtn = screen.getByRole("button", { name: /关闭/i });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
