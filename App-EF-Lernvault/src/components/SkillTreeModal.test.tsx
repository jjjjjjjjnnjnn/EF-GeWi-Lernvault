import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SkillTreeModal } from "./SkillTreeModal";

describe("SkillTreeModal Component", () => {
  it("renders when isOpen is true and closes upon close button click or Escape key", () => {
    const handleClose = vi.fn();
    const { rerender } = render(
      <SkillTreeModal isOpen={true} onClose={handleClose} lang="zh" />
    );

    expect(screen.getByTestId("skill-tree-modal")).toBeInTheDocument();
    expect(
      screen.getByText("学科知识图谱与前置解锁技能树")
    ).toBeInTheDocument();

    // 点击关闭按钮
    const closeBtn = screen.getByRole("button", { name: "关闭" });
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalledTimes(1);

    // 测试 Escape 快捷键
    fireEvent.keyDown(window, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(2);

    // 当 isOpen 为 false 时不渲染
    rerender(<SkillTreeModal isOpen={false} onClose={handleClose} lang="zh" />);
    expect(screen.queryByTestId("skill-tree-modal")).not.toBeInTheDocument();
  });
});
