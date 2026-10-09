import { describe, it, expect } from "vitest";
import { estimateVisualTextWidth, truncateTextToVisualWidth } from "./svgTypography";

describe("svgTypography Utility (SVG 矢量文字排版度量与防溢出截断)", () => {
  it("accurately differentiates between CJK characters and Latin characters", () => {
    const fontSize = 10;
    // 4 个汉字 (约 4 * 10 = 40px)
    const cjkWidth = estimateVisualTextWidth("价格机制", fontSize, false);
    // 4 个拉丁小写字母 (约 4 * 5.2 = 20.8px)
    const latinWidth = estimateVisualTextWidth("test", fontSize, false);

    expect(cjkWidth).toBeGreaterThan(36);
    expect(cjkWidth).toBeLessThan(45);
    expect(latinWidth).toBeGreaterThan(18);
    expect(latinWidth).toBeLessThan(25);
    // 汉字物理宽度约为英文字母的 1.8~2.0 倍
    expect(cjkWidth).toBeGreaterThan(latinWidth * 1.6);
  });

  it("does not truncate short text that easily fits within maxWidth", () => {
    const text = "价格机制与均衡";
    const truncated = truncateTextToVisualWidth(text, 180, 11, true);
    expect(truncated).toBe(text);
    expect(truncated.endsWith("…")).toBe(false);
  });

  it("safely truncates long Chinese titles exceeding box boundaries and appends ellipsis", () => {
    const longTitle = "系统发育树重建：同源性与原始/衍生性状";
    const maxWidth = 180;
    const fontSize = 11;

    // 原始宽度必然超出 180px
    const rawWidth = estimateVisualTextWidth(longTitle, fontSize, true);
    expect(rawWidth).toBeGreaterThan(200);

    // 截断后的文本
    const truncated = truncateTextToVisualWidth(longTitle, maxWidth, fontSize, true);
    expect(truncated.endsWith("…")).toBe(true);

    // 截断后的物理总宽度必须严格 <= maxWidth
    const truncatedWidth = estimateVisualTextWidth(truncated, fontSize, true);
    expect(truncatedWidth).toBeLessThanOrEqual(maxWidth);
    // 并且保留了大部分内容 (约 13-14 个字符)
    expect(truncated.length).toBeGreaterThanOrEqual(12);
  });

  it("correctly truncates long German technical terms", () => {
    const longDeTitle = "Entwicklungsmechanismen & Populationsgenetik";
    const maxWidth = 180;
    const fontSize = 11;

    const truncated = truncateTextToVisualWidth(longDeTitle, maxWidth, fontSize, true);
    expect(truncated.endsWith("…")).toBe(true);

    const truncatedWidth = estimateVisualTextWidth(truncated, fontSize, true);
    expect(truncatedWidth).toBeLessThanOrEqual(maxWidth);
  });

  it("handles empty or boundary strings gracefully", () => {
    expect(estimateVisualTextWidth("", 12)).toBe(0);
    expect(truncateTextToVisualWidth("", 100, 12)).toBe("");
  });
});
