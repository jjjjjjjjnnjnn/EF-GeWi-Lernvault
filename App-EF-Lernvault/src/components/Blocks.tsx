import type { ReactNode } from "react";
import type { Block } from "../vault/parser";
import MathHtml from "./MathHtml";

/**
 * Checks if an inline code snippet resembles a mathematical formula
 * e.g. `(x^n)' = n * x^(n-1)`, `f'(x) = 12x^2`, `x0 = 2`, `a^2 + b^2 = c^2`
 */
function isMathSnippet(code: string): boolean {
  if (code.length < 2) return false;
  // Common math indicators
  if (/^(?:f|g|h|k|y|C|G|E|K|V)\s*\(.*?\)\s*=|^\(.*?\)'\s*=|[\^]|\\cdot|\\times|\\frac|\\int|\\sum|f'\(|g'\(|h'\(|\b(?:x0|x_0|f\(x\)|f'\(x\))\b/.test(code)) {
    return true;
  }
  if (/\b(?:[a-zA-Z]\s*=\s*[\d\-+]|[\d]\s*[\*\/+-]\s*[\d])/i.test(code)) {
    return true;
  }
  return false;
}

/**
 * Converts loose ASCII math into standard LaTeX for KaTeX
 */
function toLatex(raw: string): string {
  return raw
    .replace(/\s*\*\s*/g, " \\cdot ")
    .replace(/\b([a-zA-Z])_?0\b/g, "$1_0")
    .replace(/->/g, " \\to ")
    .replace(/<=/g, " \\le ")
    .replace(/>=/g, " \\ge ")
    .replace(/!=/g, " \\ne ");
}

/**
 * Renders key section prefixes (e.g. Klausur-Satz:, 中文理解：) as semantic callout chips
 */
function renderPrefixBadge(prefix: string, key: string): ReactNode {
  const p = prefix.replace(/[:：]$/, "").trim();
  if (p === "中文理解" || p === "中文") {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
      >
        {p}
      </span>
    );
  }
  if (p === "Klausur-Satz" || p === "Korrektur-Satz" || p === "Takeaway-Satz") {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--ink)] bg-[var(--paper-subtle)] border border-[var(--line)] px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
      >
        {p}
      </span>
    );
  }
  if (p.includes("口诀")) {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
      >
        口诀
      </span>
    );
  }
  if (p.includes("判据") || p.includes("决策点")) {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--ink)] bg-[var(--paper-subtle)] border border-[var(--line)] px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
      >
        决策点
      </span>
    );
  }
  if (p.startsWith("AUFGABE")) {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
      >
        {p}
      </span>
    );
  }
  if (p === "HILFE") {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--gray)] bg-[var(--paper-subtle)] border border-[var(--line)] px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
      >
        HILFE
      </span>
    );
  }
  if (p === "MUSTERLÖSUNG" || p === "MUSTERLOESUNG") {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--ink)] bg-[var(--accent)]/15 border border-[var(--accent)]/40 px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
      >
        MUSTERLÖSUNG
      </span>
    );
  }
  if (p === "ANTWORT") {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--ink)] bg-[var(--paper-subtle)] border border-[var(--line)] px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
      >
        ANTWORT
      </span>
    );
  }
  return (
    <span
      key={key}
      className="inline-block text-xs font-mono font-medium text-[var(--gray)] bg-[var(--paper-subtle)] border border-[var(--line)] px-1.5 py-0.5 rounded-[var(--radius)] mr-1.5 align-baseline"
    >
      {p}
    </span>
  );
}

/**
 * Tokenizes non-math chunks into styled bold highlights, code chips, status badges, and text
 */
function renderRichTextTokens(text: string, keyPrefix: string): ReactNode {
  // Check if string begins with a known structural prefix
  const prefixMatch = /^(?:(中文理解|中文|Klausur-Satz|Korrektur-Satz|Takeaway-Satz|ENTDECKEN|AUFGABE(?:\s*\([^)]*\))?|HILFE|MUSTERLÖSUNG|MUSTERLOESUNG|ANTWORT|口诀|判据\s*\/\s*决策点|来源|技法内容)[:：]\s*)/.exec(text);

  let prefixNode: ReactNode = null;
  let remainingText = text;

  if (prefixMatch) {
    prefixNode = renderPrefixBadge(prefixMatch[0], `${keyPrefix}-pfx`);
    remainingText = text.slice(prefixMatch[0].length);
  }

  // Tokenize bold **...**, inline code `...`, and verification badges [已验证]
  const tokenRegex = /(\*\*([^*]+)\*\*|`([^`]+)`|\[已验证\]|\[据推断\]|\[原创\])/g;
  const parts: ReactNode[] = [];
  if (prefixNode) parts.push(prefixNode);

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(remainingText)) !== null) {
    if (match.index > lastIndex) {
      parts.push(remainingText.slice(lastIndex, match.index));
    }

    const fullMatch = match[0];
    const boldContent = match[2];
    const codeContent = match[3];

    if (boldContent !== undefined) {
      // Bold emphasis with subtle background highlight and contrast
      parts.push(
        <strong
          key={`${keyPrefix}-b-${match.index}`}
          className="font-semibold text-[var(--ink)] bg-[var(--accent)]/10 px-1 py-0.5 rounded-[var(--radius)]"
        >
          {boldContent}
        </strong>
      );
    } else if (codeContent !== undefined) {
      if (isMathSnippet(codeContent)) {
        // Typeset math formula inside KaTeX
        const mathCode = toLatex(codeContent);
        parts.push(
          <MathHtml
            key={`${keyPrefix}-mc-${match.index}`}
            code={mathCode}
            display={false}
            cacheKey={`MC:${mathCode}`}
          />
        );
      } else {
        parts.push(
          <code
            key={`${keyPrefix}-c-${match.index}`}
            className="font-mono text-xs bg-[var(--paper-subtle)] text-[var(--accent)] px-1.5 py-0.5 rounded-[var(--radius)] border border-[var(--line)]"
          >
            {codeContent}
          </code>
        );
      }
    } else if (fullMatch === "[已验证]") {
      parts.push(
        <span
          key={`${keyPrefix}-v-${match.index}`}
          className="inline-flex items-center text-xs font-mono px-1.5 py-0.5 rounded border border-[var(--accent)]/40 text-[var(--accent)] bg-[var(--accent)]/5 mx-1 font-normal align-middle"
        >
          已验证
        </span>
      );
    } else if (fullMatch === "[原创]") {
      parts.push(
        <span
          key={`${keyPrefix}-o-${match.index}`}
          className="inline-flex items-center text-xs font-mono px-1.5 py-0.5 rounded border border-[var(--ink)]/30 text-[var(--ink)] bg-[var(--paper-subtle)] mx-1 font-normal align-middle"
        >
          原创
        </span>
      );
    } else if (fullMatch === "[据推断]") {
      parts.push(
        <span
          key={`${keyPrefix}-p-${match.index}`}
          className="inline-flex items-center text-xs font-mono px-1.5 py-0.5 rounded border border-[var(--gray)]/40 text-[var(--gray)] mx-1 font-normal align-middle"
        >
          据推断
        </span>
      );
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < remainingText.length) {
    parts.push(remainingText.slice(lastIndex));
  }

  if (parts.length === 0) return remainingText;
  if (parts.length === 1 && typeof parts[0] === "string") return parts[0];
  return parts;
}

/**
 * Handles inline math ($...$) segments
 */
function renderInlineSegment(text: string, keyPrefix: string): ReactNode {
  if (!text.includes("$")) {
    return renderRichTextTokens(text, keyPrefix);
  }

  const parts: ReactNode[] = [];
  const inlineMathRegex = /\$([^\$\n]+?)\$/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = inlineMathRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const chunk = text.slice(lastIndex, match.index);
      parts.push(renderRichTextTokens(chunk, `${keyPrefix}-pre-${match.index}`));
    }
    const mathCode = match[1].trim();
    parts.push(
      <MathHtml
        key={`${keyPrefix}-math-${match.index}`}
        code={mathCode}
        display={false}
        cacheKey={`I:${mathCode}`}
      />
    );
    lastIndex = inlineMathRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    const chunk = text.slice(lastIndex);
    parts.push(renderRichTextTokens(chunk, `${keyPrefix}-post-${lastIndex}`));
  }

  return parts.length === 1 ? parts[0] : parts;
}

/**
 * Universal rich formatter for vault content and interactive courses:
 * - Typesets math formulas via KaTeX ($$...$$ and $...$)
 * - Renders bold **...** with high-contrast accent highlights (no raw asterisks)
 * - Renders inline code and math snippets
 * - Badges status markers ([已验证], [据推断], [原创])
 * - Emphasizes pedagogical headers (Klausur-Satz, 中文理解, etc.)
 */
export function renderFormattedText(text: string): ReactNode {
  if (!text) return text;

  // Fast path: if string contains none of our markup delimiters, return raw string
  const hasFormatting =
    text.includes("$") ||
    text.includes("**") ||
    text.includes("`") ||
    text.includes("[已验证]") ||
    text.includes("[据推断]") ||
    text.includes("[原创]") ||
    /^(?:中文理解|中文|Klausur-Satz|Korrektur-Satz|Takeaway-Satz|ENTDECKEN|AUFGABE|HILFE|MUSTERLÖSUNG|MUSTERLOESUNG|ANTWORT|口诀|判据\s*\/\s*决策点|来源|技法内容)[:：]/.test(
      text.trim()
    );

  if (!hasFormatting) return text;

  // Split by display math ($$...$$) first
  const displayRegex = /\$\$([\s\S]+?)\$\$/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = displayRegex.exec(text)) !== null) {
    const preText = text.slice(lastIndex, match.index);
    if (preText) {
      parts.push(renderInlineSegment(preText, `disp-pre-${match.index}`));
    }
    const mathCode = match[1].trim();
    parts.push(
      <MathHtml
        key={`disp-${match.index}`}
        code={mathCode}
        display
        cacheKey={`D:${mathCode}`}
      />
    );
    lastIndex = displayRegex.lastIndex;
  }

  const remaining = text.slice(lastIndex);
  if (remaining) {
    parts.push(renderInlineSegment(remaining, `disp-post-${lastIndex}`));
  }

  return parts.length === 1 ? parts[0] : parts;
}

// Backwards-compatible alias for existing imports
export const renderMathText = renderFormattedText;

// Tufte: ZH (humanist sans, gray) vs DE (old-style serif, ink). KaTeX math & rich typography integrated.
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
          const isAnekdote = b.text.toLowerCase().includes("anekdote");
          return (
            <div
              key={i}
              className={
                isAnekdote
                  ? "mt-6 mb-3 p-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]"
                  : "mb-1 mt-4"
              }
            >
              <h3 className="font-serif text-lg text-[var(--ink)] flex items-center gap-2">
                {isAnekdote && (
                  <span className="font-mono text-xs uppercase tracking-wider px-1.5 py-0.5 rounded-[var(--radius)] border border-[var(--accent)]/40 text-[var(--accent)] font-medium">
                    Exkurs
                  </span>
                )}
                <span>{renderFormattedText(b.text)}</span>
              </h3>
            </div>
          );
        }
        if (b.kind === "h3") {
          return (
            <h4 key={i} className="mb-1 mt-3 font-serif text-base text-[var(--ink)]">
              {renderFormattedText(b.text)}
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
              {renderFormattedText(b.text)}
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
              {renderFormattedText(b.text)}
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
            {renderFormattedText(b.text)}
          </div>
        );
      })}
    </div>
  );
}
