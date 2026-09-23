import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import MathHtml from "./MathHtml";

describe("MathHtml (katex-lazy)", () => {
  it("sofort-paint rohtext, dann katex-hydration (inline)", async () => {
    render(<MathHtml code="x^2" display={false} cacheKey="W:I:x^2" />);
    expect(screen.getByText("x^2")).toBeInTheDocument(); // erster paint blockiert nie
    await waitFor(() => {
      expect(document.querySelector(".katex")).not.toBeNull();
    });
  });

  it("display-modus hydriert zu .katex-display", async () => {
    render(<MathHtml code="\\frac{a}{b}" display cacheKey="W:D:frac" />);
    await waitFor(() => {
      expect(document.querySelector(".katex-display")).not.toBeNull();
    });
  });

  it("cache: zweite instanz sofort typeset (kein roh-fallback)", async () => {
    const { unmount } = render(<MathHtml code="y_1" display={false} cacheKey="W:I:y1" />);
    await waitFor(() => {
      expect(document.querySelectorAll(".katex").length).toBeGreaterThan(0);
    });
    unmount();
    document.body.innerHTML = "";
    render(<MathHtml code="y_1" display={false} cacheKey="W:I:y1" />);
    // aus cache: kein rohtext-fallback (font-mono) mehr im DOM
    await waitFor(() => {
      expect(document.querySelector(".katex")).not.toBeNull();
    });
    expect(document.querySelector("span.font-mono")).toBeNull();
  });
});
