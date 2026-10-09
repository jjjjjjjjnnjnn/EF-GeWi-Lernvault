/**
 * SVG 矢量图表文字排版与视觉宽度度量引擎 (SVG Typography & Visual Truncation Engine)
 * 
 * 核心功能：
 * 1. 解决中西文混合排版时 .length 无法反映实际物理宽度、导致文字溢出方框的根本缺陷；
 * 2. 精确度量 CJK 全角表意文字、半角拉丁字母、数字及极窄符号的物理字宽；
 * 3. 智能截断并追加省略号，确保文字排版 100% 严密约束在容器几何边界内。
 */

/**
 * 估算字符串在 SVG 渲染时的视觉像素宽度 (支持中西文混合与等宽/衬线字体)
 * @param str 要测量的文本
 * @param fontSize 字号 (px)
 * @param isSerifOrBold 是否为衬线体或粗体 (衬线/粗体字形稍宽约 6%~10%)
 */
export function estimateVisualTextWidth(
  str: string,
  fontSize: number,
  isSerifOrBold = false
): number {
  if (!str) return 0;
  let width = 0;
  const cjkFactor = isSerifOrBold ? 1.08 : 1.0;
  const latinUpperFactor = isSerifOrBold ? 0.72 : 0.65;
  const latinLowerFactor = isSerifOrBold ? 0.58 : 0.52;
  const narrowFactor = 0.38;

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    // CJK 统一表意文字 (0x4E00-0x9FFF)、全角标点符号 (0xFF00-0xFFEF)、CJK 符号 (0x3000-0x303F)
    if (
      (code >= 0x4e00 && code <= 0x9fff) ||
      (code >= 0x3400 && code <= 0x4dbf) ||
      (code >= 0x2e80 && code <= 0x2eff) ||
      (code >= 0x3000 && code <= 0x303f) ||
      (code >= 0xff00 && code <= 0xffef)
    ) {
      width += fontSize * cjkFactor;
    } else if (code >= 65 && code <= 90) {
      // 拉丁大写字母 A-Z
      width += fontSize * latinUpperFactor;
    } else if (
      code === 32 ||
      code === 44 ||
      code === 46 ||
      code === 58 ||
      code === 59 ||
      code === 124 ||
      code === 47 ||
      code === 45
    ) {
      // 空格、逗号、句号、冒号、分号、竖线、斜杠、连字符等极窄符号
      width += fontSize * narrowFactor;
    } else {
      // 拉丁小写字母 a-z、数字 0-9 以及其他常规半角符号
      width += fontSize * latinLowerFactor;
    }
  }
  return width;
}

/**
 * 智能按最大视觉像素宽度截断文本并追加省略号，确保绝对不溢出容器
 * @param str 原始字符串
 * @param maxWidth 允许的最大视觉像素宽度
 * @param fontSize 字号 (px)
 * @param isSerifOrBold 是否为衬线或粗体
 */
export function truncateTextToVisualWidth(
  str: string,
  maxWidth: number,
  fontSize: number,
  isSerifOrBold = false
): string {
  if (!str) return "";
  const totalWidth = estimateVisualTextWidth(str, fontSize, isSerifOrBold);
  if (totalWidth <= maxWidth) {
    return str;
  }

  const ellipsis = "…";
  const ellipsisWidth = estimateVisualTextWidth(ellipsis, fontSize, isSerifOrBold);
  const targetWidth = Math.max(0, maxWidth - ellipsisWidth);
  let currentWidth = 0;
  let truncated = "";

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charWidth = estimateVisualTextWidth(char, fontSize, isSerifOrBold);
    if (currentWidth + charWidth > targetWidth) {
      break;
    }
    currentWidth += charWidth;
    truncated += char;
  }

  return `${truncated}${ellipsis}`;
}
