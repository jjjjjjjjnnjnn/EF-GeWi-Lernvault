import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { MascotFox, type MascotState } from "./MascotFox";

describe("MascotFox Visual Guidelines & UI States", () => {
  const states: MascotState[] = ["avatar", "idle", "levelup", "deficit", "streak"];

  it.each(states)("renders MascotFox with state '%s' properly", (st) => {
    const { container } = render(<MascotFox state={st} size={80} />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg?.getAttribute("width")).toBe("80");
    expect(svg?.getAttribute("height")).toBe("80");
  });

  it("supports animation toggle flag", () => {
    const { container: animated } = render(<MascotFox state="idle" animate={true} />);
    expect(animated.querySelector("text")).toHaveTextContent("Z");

    const { container: staticFox } = render(<MascotFox state="idle" animate={false} />);
    expect(staticFox.querySelector("text")).toBeNull();
  });
});
