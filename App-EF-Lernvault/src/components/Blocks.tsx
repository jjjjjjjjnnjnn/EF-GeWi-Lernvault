import { useState, type ReactNode } from "react";
import type { Block } from "../vault/parser";
import MathHtml from "./MathHtml";
import { filterBlocksForGermanNative } from "../config/audience";
import { restoreGermanUmlauts } from "../utils/germanOrthography";

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
        className="inline-block text-xs font-mono font-semibold text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-2 py-0.5 rounded-[var(--radius)] mr-2 align-baseline"
      >
        {p}
      </span>
    );
  }
  if (p === "ZIELE" || p === "VORAUSSETZUNG" || p === "VORGAENGER-VERWEIS" || p === "REFLEXION") {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-medium text-[var(--gray)] bg-[var(--paper-subtle)] border border-[var(--line)] px-2 py-0.5 rounded-[var(--radius)] mr-2 align-baseline"
      >
        {p}
      </span>
    );
  }
  if (p === "PRETRAINING" || p === "BEISPIEL" || p === "VERGLEICH" || p === "CHECK" || p === "TAKEAWAY") {
    return (
      <span
        key={key}
        className="inline-block text-xs font-mono font-semibold text-[var(--ink)] bg-[var(--paper-subtle)] border border-[var(--line)] px-2 py-0.5 rounded-[var(--radius)] mr-2 align-baseline"
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
  const prefixMatch = /^(?:(中文理解|中文|Klausur-Satz|Korrektur-Satz|Takeaway-Satz|ENTDECKEN|AUFGABE(?:\s*\([^)]*\))?|HILFE|MUSTERLÖSUNG|MUSTERLOESUNG|ANTWORT|口诀|判据\s*\/\s*决策点|来源|技法内容|ZIELE|VORAUSSETZUNG|VORGAENGER-VERWEIS|PRETRAINING|BEISPIEL|VERGLEICH|CHECK|TAKEAWAY|REFLEXION)[:：]\s*)/.exec(text);

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
      parts.push(restoreGermanUmlauts(remainingText.slice(lastIndex, match.index)));
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
          {restoreGermanUmlauts(boldContent)}
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
    parts.push(restoreGermanUmlauts(remainingText.slice(lastIndex)));
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

/**
 * Interactive active recall card for practice questions:
 * Conceals the answer behind an elegant tap-to-reveal button.
 */
function InteractiveQuestionCard({ text, lang }: { text: string; lang?: string }) {
  const [revealed, setRevealed] = useState(false);
  const match = /^(?:FRAGE[:：]?\s*)(.*?)\s*(?:[\|｜]|\s+ANTWORT[:：]\s*)\s*(?:ANTWORT[:：]?\s*)?(.*)$/i.exec(text);
  if (!match) return <div>{renderFormattedText(text)}</div>;

  const frage = match[1].trim();
  const antwort = match[2].trim();

  return (
    <div className="my-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 transition-all hover:border-[var(--accent)]/40 shadow-none">
      <div className="flex items-start gap-2.5">
        <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded border border-[var(--accent)]/20 mt-0.5">
          FRAGE
        </span>
        <div className="font-serif text-[15px] font-medium text-[var(--ink)] flex-1 leading-snug">
          {renderFormattedText(frage)}
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-[var(--line)]/60">
        {!revealed ? (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="text-xs font-mono text-[var(--gray)] hover:text-[var(--accent)] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="w-3.5 h-3.5 text-current shrink-0"
            >
              <path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" />
              <circle cx="8" cy="8" r="2" />
            </svg>
            <span>{lang === "de" ? "Antwort aufdecken" : "查看权威采分解答 · Aufdecken"}</span>
          </button>
        ) : (
          <div className="flex items-start gap-2.5 animate-in fade-in duration-200">
            <span className="shrink-0 font-mono text-xs font-bold uppercase tracking-wider text-[var(--success)] bg-[var(--success)]/10 px-2 py-0.5 rounded border border-[var(--success)]/20 mt-0.5">
              ANTWORT
            </span>
            <div className="font-serif text-[14.5px] text-[var(--ink)] leading-relaxed flex-1">
              {renderFormattedText(antwort)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function isTableRow(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.startsWith("|") && (trimmed.endsWith("|") || trimmed.includes("|", 1)) && trimmed.split("|").length >= 3;
}

function isTableDivider(text: string): boolean {
  const trimmed = text.trim();
  if (!isTableRow(trimmed)) return false;
  const cells = trimmed.split("|").slice(1, -1);
  return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c.trim()));
}

function MarkdownTable({ lines }: { lines: string[] }) {
  if (!lines || lines.length === 0) return null;
  const parsedRows: string[][] = [];
  let headerIndex = -1;

  for (let idx = 0; idx < lines.length; idx++) {
    const line = lines[idx].trim();
    if (isTableDivider(line)) {
      if (idx > 0 && headerIndex === -1) {
        headerIndex = idx - 1;
      }
      continue;
    }
    const rawCells = line.split("|");
    const cells = rawCells.slice(1, rawCells[rawCells.length - 1] === "" ? -1 : undefined).map((c) => c.trim());
    if (cells.length > 0) {
      parsedRows.push(cells);
    }
  }

  if (parsedRows.length === 0) return null;

  const headers = headerIndex >= 0 && headerIndex < parsedRows.length ? parsedRows[headerIndex] : parsedRows[0];
  const bodyRows = headerIndex >= 0 ? parsedRows.filter((_, i) => i !== headerIndex) : parsedRows.slice(1);

  return (
    <div className="my-4 overflow-x-auto rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] shadow-none">
      <table className="w-full border-collapse font-sans text-xs">
        {headers && headers.length > 0 && (
          <thead>
            <tr className="border-b border-[var(--line)] bg-[var(--paper-subtle)] text-left font-mono font-semibold text-[var(--ink)]">
              {headers.map((th, thIdx) => (
                <th
                  key={thIdx}
                  className="p-2.5 font-medium border-r border-[var(--line)] last:border-r-0"
                >
                  {renderFormattedText(th)}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-[var(--line)]">
          {bodyRows.map((row, rIdx) => (
            <tr key={rIdx} className="hover:bg-[var(--paper-subtle)]/50 transition-colors">
              {row.map((cell, cIdx) => (
                <td
                  key={cIdx}
                  className="p-2.5 text-[var(--ink)] align-top leading-relaxed border-r border-[var(--line)] last:border-r-0"
                >
                  {renderFormattedText(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function renderSingleBlock(
  b: Block,
  i: number,
  renderDiagram?: (spec: string, index: number) => ReactNode,
  pureGerman?: boolean
): ReactNode {
  if (b.kind === "h2") {
          const isAnekdote = b.text.toLowerCase().includes("anekdote");
          return (
            <div
              key={i}
              className={
                isAnekdote
                  ? "mt-6 mb-3 p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]"
                  : "mb-1 mt-5"
              }
            >
              <h3 className="font-serif text-lg text-[var(--ink)] flex items-center gap-2">
                {isAnekdote && (
                  <span className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-[var(--radius)] border border-[var(--accent)]/40 text-[var(--accent)] font-semibold flex items-center gap-1.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className="w-3.5 h-3.5 text-current shrink-0"
                    >
                      <circle cx="8" cy="8" r="6.5" />
                      <line x1="8" y1="11" x2="8" y2="8" />
                      <line x1="8" y1="5.5" x2="8.01" y2="5.5" />
                    </svg>
                    <span>Exkurs & Historischer Kontext</span>
                  </span>
                )}
                <span>{renderFormattedText(b.text)}</span>
              </h3>
            </div>
          );
        }
        if (b.kind === "h3") {
          const lower = b.text.toLowerCase();
          let chipLabel = "";
          let chipClass = "";
          if (lower.includes("hook") || lower.includes("phaenomen") || lower.includes("phänomen") || lower.includes("alltagsbezug")) {
            chipLabel = pureGerman ? "ENTDECKUNG · PHÄNOMEN" : "ENTDECKUNG · 探究引入";
            chipClass = "border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)]";
          } else if (lower.includes("fachbegriff") || lower.includes("definition")) {
            chipLabel = pureGerman ? "KERNKONZEPT · DEFINITION" : "KERNKONZEPT · 核心概念";
            chipClass = "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]";
          } else if (lower.includes("wirkungsgefuege") || lower.includes("wirkungsgefüge") || lower.includes("modell") || lower.includes("kausalkette")) {
            chipLabel = pureGerman ? "MODELL · WIRKUNGSGEFÜGE" : "MODELL · 逻辑传导";
            chipClass = "border-[var(--accent)]/30 bg-[var(--paper-subtle)] text-[var(--accent)]";
          }

          return (
            <div key={i} className="mb-2 mt-5">
              {chipLabel && (
                <div className="mb-1">
                  <span className={`inline-block font-mono text-xs uppercase tracking-wider px-1.5 py-0.5 rounded-[var(--radius)] border ${chipClass} font-semibold`}>
                    {chipLabel}
                  </span>
                </div>
              )}
              <h4 className="font-serif text-base font-semibold text-[var(--ink)]">
                {renderFormattedText(b.text)}
              </h4>
            </div>
          );
        }
        if (b.kind === "li") {
          // Question card: "FRAGE: ..."
          if (/^FRAGE[:：]/i.test(b.text.trim())) {
            return <InteractiveQuestionCard key={i} text={b.text} lang={b.lang} />;
          }

          // Structured definition: "**Term:** Definition..."
          const defMatch = /^(\*\*[^*]+\*\*|[A-Za-z0-9äöüÄÖÜß\s\-\/\(\)]+)[:：]\s*(.*)$/.exec(b.text);
          if (defMatch && defMatch[1].length < 45 && !/^\d+[\.\)]/.test(b.text)) {
            const rawTerm = defMatch[1].replace(/\*\*/g, "").trim();
            const rawDef = defMatch[2].trim();
            return (
              <div
                key={i}
                className="my-2 p-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)]/40 transition-colors shadow-none"
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-1.5">
                  <span className="font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-[var(--radius)] bg-[var(--accent)]/10 text-[var(--accent)] font-semibold border border-[var(--accent)]/30">
                    {rawTerm}
                  </span>
                </div>
                <div className={b.lang === "zh" ? "font-sans text-sm text-[var(--gray)]" : "font-serif text-[14.5px] leading-relaxed text-[var(--ink)]"}>
                  {renderFormattedText(rawDef)}
                </div>
              </div>
            );
          }

          // Numbered milestone item: "1. ..."
          const numMatch = /^(\d+[\.\)])\s*(.*)$/.exec(b.text);
          if (numMatch) {
            return (
              <div key={i} className="my-2 flex items-start gap-2.5 pl-1">
                <span className="shrink-0 font-mono text-xs font-bold text-[var(--accent)] bg-[var(--accent)]/10 px-2 py-0.5 rounded-[var(--radius)] mt-0.5 border border-[var(--accent)]/20">
                  {numMatch[1]}
                </span>
                <div className={b.lang === "zh" ? "font-sans text-sm text-[var(--gray)]" : "font-serif text-[15px] leading-relaxed text-[var(--ink)]"}>
                  {renderFormattedText(numMatch[2])}
                </div>
              </div>
            );
          }

          return (
            <div
              key={i}
              className={`mb-1.5 pl-3 flex items-start gap-2 ${
                b.lang === "zh"
                  ? "font-sans text-sm text-[var(--gray)]"
                  : "font-serif text-[15px] text-[var(--ink)]"
              }`}
            >
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-2 shrink-0" />
              <div className="flex-1">{renderFormattedText(b.text)}</div>
            </div>
          );
        }
        if (b.kind === "quote") {
          return (
            <div
              key={i}
              className={`my-3 border-l-2 border-[var(--accent)] pl-4 py-1.5 bg-[var(--paper-subtle)] rounded-r-[var(--radius)] ${
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
            <div key={i} className="my-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden shadow-none">
              <div className="px-3.5 py-1.5 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[var(--gray)]">
                <div className="flex items-center gap-1.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-[var(--accent)] shrink-0"
                  >
                    <polyline points="14.5 8 12 8 10 14 6 2 4 8 1.5 8" />
                  </svg>
                  <span>Wirkungsmodell & Kausalkette</span>
                </div>
                <span className="text-xs text-[var(--accent)] font-mono font-medium">Flow</span>
              </div>
              <pre className="p-3.5 overflow-x-auto font-mono text-xs leading-relaxed text-[var(--ink)] whitespace-pre-wrap">
                {b.text}
              </pre>
            </div>
          );
        }
        if (b.kind === "math") {
          return <MathHtml key={i} code={b.text} display cacheKey={`D:${b.text}`} />;
        }

        const isExamMasterSentence = /^(?:Klausur-Satz|Korrektur-Satz|Takeaway-Satz)[:：]/.test(b.text);
        if (isExamMasterSentence) {
          return (
            <div
              key={i}
              className="my-4 rounded-[var(--radius)] border border-[var(--accent)]/30 bg-[var(--accent)]/5 p-4 border-l-4 border-l-[var(--accent)] shadow-none"
            >
              <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-[var(--accent)]/20">
                <div className="flex items-center gap-1.5">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-[var(--accent)] shrink-0"
                  >
                    <polygon points="8 1.5 10 5.5 14.5 6 11 9.5 12 14 8 11.5 4 14 5 9.5 1.5 6 6 5.5 8 1.5" />
                  </svg>
                  <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--accent)]">
                    Klausur-Punktegarant · 考点采分原句
                  </span>
                </div>
                <span className="text-xs font-mono text-[var(--gray)]">NRW Standard</span>
              </div>
              <div className="font-serif text-[15px] font-medium leading-relaxed text-[var(--ink)]">
                {renderFormattedText(b.text)}
              </div>
            </div>
          );
        }

        // Special paragraph cards
        const trimmed = b.text.trim();

        // Question paragraph: "FRAGE: ..."
        if (/^FRAGE[:：]/i.test(trimmed)) {
          return <InteractiveQuestionCard key={i} text={b.text} lang={b.lang} />;
        }

        const isZiele = /^(?:ZIELE|(?:\u{1F3AF}\s*)?LERNZIELE)/u.test(trimmed);
        if (isZiele) {
          return (
            <div
              key={i}
              className="my-3.5 p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-[var(--ink)] font-bold mb-2 flex items-center gap-2 pb-1.5 border-b border-[var(--line)]">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="w-4 h-4 text-[var(--accent)] shrink-0"
                >
                  <circle cx="8" cy="8" r="6.5" />
                  <circle cx="8" cy="8" r="4" />
                  <circle cx="8" cy="8" r="1.5" />
                </svg>
                <span>Lernziele & Klausur-Fokus (3 Meilensteine)</span>
              </div>
              <div className="font-serif text-[14.5px] leading-relaxed text-[var(--ink)]">
                {renderFormattedText(b.text)}
              </div>
            </div>
          );
        }

        const isHook = /^(?:HOOK[:：]|Hook\s*[\/:]\s*Ph[aä]nomen|Stell dir vor|Um drei Uhr|Um Mitternacht|Mitten in der Nacht|Sol-\d+|In einer Welt)/i.test(trimmed);
        if (isHook) {
          return (
            <div
              key={i}
              className="my-4 p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] border-l-3 border-l-[var(--gray)] shadow-none"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-[var(--gray)] font-semibold mb-2 flex items-center gap-1.5 pb-1.5 border-b border-[var(--line)]/60">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="w-3.5 h-3.5 text-current shrink-0"
                >
                  <path d="M2.5 13A1.5 1.5 0 0 1 4 11.5H13.5" />
                  <path d="M4 1.5H13.5v13H4A1.5 1.5 0 0 1 2.5 13v-10A1.5 1.5 0 0 1 4 1.5z" />
                </svg>
                <span>Alltagsphänomen & Ausgangslage (Hook)</span>
              </div>
              <div className="font-serif text-[15px] leading-relaxed text-[var(--ink)]">
                {renderFormattedText(b.text)}
              </div>
            </div>
          );
        }

        return (
          <div
            key={i}
            className={`mb-2.5 ${
              b.lang === "zh"
                ? "font-sans text-sm text-[var(--gray)]"
                : "font-serif text-[15px] leading-relaxed text-[var(--ink)]"
            }`}
          >
            {renderFormattedText(b.text)}
          </div>
        );
}

type RenderItem =
  | { type: "block"; block: Block; index: number }
  | { type: "table"; lines: string[]; index: number };

// Tufte: ZH (humanist sans, gray) vs DE (old-style serif, ink). KaTeX math & rich typography integrated.
export default function Blocks({
  blocks,
  renderDiagram,
  pureGerman = false,
}: {
  blocks: Block[];
  /** Reise uebergibt LLM-figur; ohne -> statisches ascii-pre (offline-fallback). */
  renderDiagram?: (spec: string, index: number) => ReactNode;
  pureGerman?: boolean;
}) {
  const safeBlocks = Array.isArray(blocks) ? blocks : [];
  const filtered = pureGerman ? filterBlocksForGermanNative(safeBlocks) : safeBlocks;
  const displayBlocks = filtered.length > 0 ? filtered : safeBlocks;

  const items: RenderItem[] = [];
  let tableBuffer: string[] = [];
  let tableStartIndex = 0;

  const flushTable = () => {
    if (tableBuffer.length > 0) {
      items.push({ type: "table", lines: tableBuffer, index: tableStartIndex });
      tableBuffer = [];
    }
  };

  displayBlocks.forEach((b, i) => {
    if ((b.kind === "p" || b.kind === "quote") && isTableRow(b.text)) {
      if (tableBuffer.length === 0) tableStartIndex = i;
      tableBuffer.push(b.text);
    } else if (b.kind === "p" && b.text.includes("\n") && b.text.split("\n").some(isTableRow)) {
      flushTable();
      const lines = b.text.split("\n").map((l) => l.trim()).filter(Boolean);
      items.push({ type: "table", lines, index: i });
    } else {
      flushTable();
      items.push({ type: "block", block: b, index: i });
    }
  });
  flushTable();

  return (
    <div>
      {items.map((item) => {
        if (item.type === "table") {
          return <MarkdownTable key={`tbl-${item.index}`} lines={item.lines} />;
        }
        return renderSingleBlock(item.block, item.index, renderDiagram, pureGerman);
      })}
    </div>
  );
}
