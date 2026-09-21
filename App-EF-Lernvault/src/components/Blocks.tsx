import type { ReactNode } from "react";
import katex from "katex";
import type { Block } from "../vault/parser";

export function renderMathText(text: string): ReactNode {
  if (!text || !text.includes("$")) return text;

  const parts: ReactNode[] = [];
  const displayRegex = /\$\$([\s\S]+?)\$\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = displayRegex.exec(text)) !== null) {
    const preText = text.slice(lastIndex, match.index);
    if (preText) {
      parts.push(renderInlineMath(preText));
    }
    const mathCode = match[1].trim();
    try {
      const html = katex.renderToString(mathCode, { displayMode: true, throwOnError: false });
      parts.push(
        <div
          key={`disp-${match.index}`}
          className="my-2 overflow-x-auto text-center font-serif text-[#1C1B17]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      parts.push(
        <code key={`disp-err-${match.index}`} className="block text-center font-mono text-sm text-[#1C1B17]">
          {mathCode}
        </code>
      );
    }
    lastIndex = displayRegex.lastIndex;
  }

  const remaining = text.slice(lastIndex);
  if (remaining) {
    parts.push(renderInlineMath(remaining));
  }

  return parts.length === 1 ? parts[0] : parts;
}

function renderInlineMath(text: string): ReactNode {
  if (!text.includes("$")) return text;
  const parts: ReactNode[] = [];
  const inlineRegex = /\$([^\$\n]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const mathCode = match[1].trim();
    try {
      const html = katex.renderToString(mathCode, { displayMode: false, throwOnError: false });
      parts.push(
        <span
          key={`inline-${match.index}`}
          className="font-serif text-[#1C1B17]"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      );
    } catch {
      parts.push(
        <code key={`inline-err-${match.index}`} className="font-mono text-xs text-[#1C1B17]">
          {mathCode}
        </code>
      );
    }
    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// Tufte: ZH (humanist sans, gray) vs DE (old-style serif, ink). KaTeX math integrated.
export default function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.kind === "h2") {
          return (
            <h3 key={i} className="mb-1 mt-4 font-serif text-lg text-[#1C1B17]">
              {renderMathText(b.text)}
            </h3>
          );
        }
        if (b.kind === "h3") {
          return (
            <h4 key={i} className="mb-1 mt-3 font-serif text-base text-[#1C1B17]">
              {renderMathText(b.text)}
            </h4>
          );
        }
        if (b.kind === "li") {
          return (
            <div
              key={i}
              className={`mb-1 pl-3 ${
                b.lang === "zh"
                  ? "font-sans text-sm text-[#6B675C]"
                  : "font-serif text-[15px] text-[#1C1B17]"
              }`}
            >
              <span className="mr-2 text-[#6B675C]">–</span>
              {renderMathText(b.text)}
            </div>
          );
        }
        return (
          <div
            key={i}
            className={`mb-2 ${
              b.lang === "zh"
                ? "font-sans text-sm text-[#6B675C]"
                : "font-serif text-[15px] leading-relaxed text-[#1C1B17]"
            }`}
          >
            {renderMathText(b.text)}
          </div>
        );
      })}
    </div>
  );
}
