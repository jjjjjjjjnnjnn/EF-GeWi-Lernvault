import type { ReactNode } from "react";
import type { Block } from "../vault/parser";
import MathHtml from "./MathHtml";

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
    // async-hydration: erster paint sofort (rohtext), katex danach aus cache
    parts.push(
      <MathHtml key={`disp-${match.index}`} code={mathCode} display cacheKey={`D:${mathCode}`} />
    );
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
    parts.push(
      <MathHtml key={`inline-${match.index}`} code={mathCode} display={false} cacheKey={`I:${mathCode}`} />
    );
    lastIndex = inlineRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts;
}

// Tufte: ZH (humanist sans, gray) vs DE (old-style serif, ink). KaTeX math integrated.
export default function Blocks({
  blocks,
  renderDiagram,
}: {
  blocks: Block[];
  /** Reise uebergibt LLM-figur; ohne -> statisches ascii-pre (offline-fallback). */
  renderDiagram?: (spec: string, index: number) => ReactNode;
}) {
  return (
    <div>
      {blocks.map((b, i) => {
        if (b.kind === "h2") {
          return (
            <h3 key={i} className="mb-1 mt-4 font-serif text-lg text-[var(--ink)]">
              {renderMathText(b.text)}
            </h3>
          );
        }
        if (b.kind === "h3") {
          return (
            <h4 key={i} className="mb-1 mt-3 font-serif text-base text-[var(--ink)]">
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
                  ? "font-sans text-sm text-[var(--gray)]"
                  : "font-serif text-[15px] text-[var(--ink)]"
              }`}
            >
              <span className="mr-2 text-[var(--gray)]">–</span>
              {renderMathText(b.text)}
            </div>
          );
        }
        if (b.kind === "quote") {
          return (
            <div
              key={i}
              className={`mb-2 border-l-2 border-[var(--line)] pl-3 ${
                b.lang === "zh"
                  ? "font-sans text-sm text-[var(--gray)]"
                  : "font-serif text-[15px] text-[var(--ink)]"
              }`}
            >
              {renderMathText(b.text)}
            </div>
          );
        }
        if (b.kind === "diagram") {
          if (renderDiagram) return <div key={i}>{renderDiagram(b.text, i)}</div>;
          return (
            <pre
              key={i}
              className="my-2 overflow-x-auto rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 font-mono text-xs leading-relaxed text-[var(--ink)]"
            >
              {b.text}
            </pre>
          );
        }
        if (b.kind === "math") {
          return <MathHtml key={i} code={b.text} display cacheKey={`D:${b.text}`} />;
        }
        return (
          <div
            key={i}
            className={`mb-2 ${
              b.lang === "zh"
                ? "font-sans text-sm text-[var(--gray)]"
                : "font-serif text-[15px] leading-relaxed text-[var(--ink)]"
            }`}
          >
            {renderMathText(b.text)}
          </div>
        );
      })}
    </div>
  );
}
