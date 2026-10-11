import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SidebarPet } from "./SidebarPet";

describe("SidebarPet Companion Desk Pet", () => {
  it("renders desk pet with fox mascot and streak information", () => {
    render(<SidebarPet lang="zh" currentStreak={5} xpToday={60} />);
    expect(screen.getByText("学霸小赤狐")).toBeInTheDocument();
    expect(screen.getByText("+60 XP")).toBeInTheDocument();
  });

  it("defaults to zero streak/XP without fabricated fallback", () => {
    render(<SidebarPet lang="zh" />);
    expect(screen.getByText("+0 XP")).toBeInTheDocument();
    expect(screen.getByText("[0d]")).toBeInTheDocument();
  });

  it("changes dialogue and triggers callback upon click interaction", async () => {
    const user = userEvent.setup();
    const onPetClick = vi.fn();
    render(<SidebarPet lang="zh" onPetClick={onPetClick} />);

    const petCard = screen.getByTitle("点击小狐狸互动、切换心语与姿态！");
    await user.click(petCard);

    expect(onPetClick).toHaveBeenCalledOnce();
    // 验证心语已切换到下一句
    expect(screen.getByText("准备好开启今天的下一轮冲刺了吗？")).toBeInTheDocument();
  });
});
