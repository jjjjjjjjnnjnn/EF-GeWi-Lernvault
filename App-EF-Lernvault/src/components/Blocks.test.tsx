import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Blocks, { renderFormattedText } from "./Blocks";
import type { Block } from "../vault/parser";

describe("Blocks rich typography & formula formatting", () => {
  it("renders bold markers without raw asterisks and applies emphasis styling", () => {
    const raw = "多阶段随机试验有两种标准表征——**树图（Baumdiagramm）**按阶段展开，适合**多步**。";
    const { container } = render(<div>{renderFormattedText(raw)}</div>);

    // Raw asterisks must never appear in DOM text content
    expect(container.textContent).not.toContain("**");
    expect(container.textContent).toContain("树图（Baumdiagramm）");
    expect(container.textContent).toContain("多步");

    // Strong elements must be present for bold highlights
    const strongs = container.querySelectorAll("strong");
    expect(strongs.length).toBe(2);
    expect(strongs[0].textContent).toBe("树图（Baumdiagramm）");
    expect(strongs[0]).toHaveClass("font-semibold", "text-[var(--ink)]");
    expect(strongs[1].textContent).toBe("多步");

    // No forbidden italic elements or classes
    expect(container.querySelector("em, i")).toBeNull();
    expect(container.querySelector(".italic")).toBeNull();
  });

  it("converts verification status tags to semantic badges", () => {
    const raw = "二者可以**互相译写** [已验证] 与 [据推断]。";
    const { container } = render(<div>{renderFormattedText(raw)}</div>);

    expect(container.textContent).toContain("已验证");
    expect(container.textContent).toContain("据推断");
    expect(container.textContent).not.toContain("[已验证]");
    expect(container.textContent).not.toContain("[据推断]");

    const badges = container.querySelectorAll("span.font-mono");
    expect(badges.length).toBeGreaterThanOrEqual(2);
  });

  it("renders pedagogical callouts for structural prefixes", () => {
    const raw = "中文理解：多项式求导是一条流水线。";
    const { container } = render(<div>{renderFormattedText(raw)}</div>);

    expect(container.textContent).toContain("中文理解");
    expect(container.textContent).toContain("多项式求导是一条流水线。");
    // Ensure prefix is rendered as a badge
    const badge = container.querySelector("span.font-mono");
    expect(badge).not.toBeNull();
    expect(badge!.textContent).toBe("中文理解");
  });

  it("renders math formulas and inline math without crashing", () => {
    const raw = "Gegeben ist $f(x) = 4x^3 - 5x^2 + 7x - 2$ mit $x_0 = 2$.";
    const { container } = render(<div>{renderFormattedText(raw)}</div>);

    expect(container.textContent).toContain("f(x) = 4x^3 - 5x^2 + 7x - 2");
    expect(container.textContent).toContain("x_0 = 2");
  });

  it("renders blocks through the full Blocks component", () => {
    const blocks: Block[] = [
      {
        kind: "h2",
        text: "## Schritt 3 — entdecken",
        lang: "de",
      },
      {
        kind: "p",
        text: "**树图（Baumdiagramm）**按阶段展开，适合**多步** [已验证]。",
        lang: "zh",
      },
      {
        kind: "math",
        text: "f'(x) = 12x^2 - 10x + 7",
        lang: "de",
      },
    ];

    const { container } = render(<Blocks blocks={blocks} />);
    expect(container.textContent).not.toContain("**");
    expect(container.querySelector("strong")).not.toBeNull();
    expect(container.querySelector("em, i")).toBeNull();
    expect(container.querySelector(".italic")).toBeNull();
  });

  it("renders markdown table rows into semantic HTML table", () => {
    const blocks: Block[] = [
      { kind: "h2", text: "1. Prüfungsrahmen", lang: "de" },
      { kind: "p", text: "| Merkmal | Angabe |", lang: "de" },
      { kind: "p", text: "|---|---|", lang: "de" },
      { kind: "p", text: "| Fach | SoWi / Sozialwissenschaften |", lang: "de" },
      { kind: "p", text: "| Gesamt-BE | 100 BE |", lang: "de" },
    ];
    const { container } = render(<Blocks blocks={blocks} />);
    const table = container.querySelector("table");
    expect(table).not.toBeNull();
    const ths = container.querySelectorAll("th");
    expect(ths.length).toBe(2);
    expect(ths[0].textContent).toContain("Merkmal");
    expect(ths[1].textContent).toContain("Angabe");
    const tds = container.querySelectorAll("td");
    expect(tds.length).toBe(4);
    expect(tds[0].textContent).toContain("Fach");
    expect(tds[1].textContent).toContain("SoWi");
    expect(tds[2].textContent).toContain("Gesamt-BE");
    expect(tds[3].textContent).toContain("100 BE");
  });
});
