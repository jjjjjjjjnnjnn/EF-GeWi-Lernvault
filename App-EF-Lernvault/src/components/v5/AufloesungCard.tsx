import React, { useState } from "react";
import type { AufloesungData } from "./v5Types";
import { renderFormattedText } from "../Blocks";

export interface AufloesungCardProps {
  data: AufloesungData;
  lang?: "de" | "zh";
  defaultRevealed?: boolean;
  className?: string;
}

export const AufloesungCard: React.FC<AufloesungCardProps> = ({
  data,
  lang = "de",
  defaultRevealed = true,
  className = "",
}) => {
  const [isRevealed, setIsRevealed] = useState(defaultRevealed);
  const [copiedSatz, setCopiedSatz] = useState(false);

  const handleCopySatz = () => {
    if (!data.klausurSatz) return;
    navigator.clipboard.writeText(data.klausurSatz);
    setCopiedSatz(true);
    setTimeout(() => setCopiedSatz(false), 2000);
  };

  return (
    <div
      className={`my-5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] shadow-none overflow-hidden ${className}`}
    >
      {/* Top Banner Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-3.5 bg-[var(--paper-subtle)] border-b border-[var(--line)]">
        <div className="flex items-center gap-2">
          {/* Lightbulb / Mechanism Gears SVG */}
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
            <circle cx="8" cy="8" r="3" />
            <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--ink)]">
            {lang === "de" ? "AUFLÖSUNG · KAUSALMECHANISMUS" : "AUFLÖSUNG · 因果机制复盘"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--gray)]">
            {lang === "de" ? "nach der Wahl lesen" : "站队后复盘"}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsRevealed((v) => !v)}
          className="text-xs font-mono text-[var(--gray)] hover:text-[var(--accent)] transition-colors cursor-pointer"
        >
          {isRevealed
            ? lang === "de"
              ? "Einklappen"
              : "折叠"
            : lang === "de"
            ? "Mechanismus aufdecken"
            : "展开机制"}
        </button>
      </div>

      {isRevealed && (
        <div className="p-4 sm:p-5 space-y-4">
          {/* Two-Track Mechanism Comparison (Option A vs Option B) */}
          {(data.mechanismusA || data.mechanismusB) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {/* Option A Box */}
              {data.mechanismusA && (
                <div className="p-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold text-[var(--ink)] bg-[var(--surface)] border border-[var(--line)] px-2 py-0.5 rounded">
                      Option A
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[var(--gray)] tracking-wider">
                      Wirkungskette
                    </span>
                  </div>
                  <div className="font-serif text-[13.5px] leading-relaxed text-[var(--ink)]">
                    {renderFormattedText(data.mechanismusA)}
                  </div>
                </div>
              )}

              {/* Option B Box */}
              {data.mechanismusB && (
                <div className="p-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[11px] font-bold text-[var(--accent)] bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-2 py-0.5 rounded">
                      Option B
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[var(--gray)] tracking-wider">
                      Wirkungskette
                    </span>
                  </div>
                  <div className="font-serif text-[13.5px] leading-relaxed text-[var(--ink)]">
                    {renderFormattedText(data.mechanismusB)}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Kausale Essenz (一句话因果本质) */}
          {data.kausaleEssenz && (
            <div className="p-3.5 rounded-[var(--radius)] border-2 border-[var(--ink)] bg-[var(--surface)] space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-wider font-bold text-[var(--accent)]">
                {lang === "de" ? "KAUSALE ESSENZ · ZUSAMMENFASSUNG" : "一句话因果本质 · KAUSALE ESSENZ"}
              </div>
              <div className="font-serif text-[14.5px] font-medium leading-relaxed text-[var(--ink)]">
                {renderFormattedText(data.kausaleEssenz)}
              </div>
            </div>
          )}

          {/* Klausur-Satz */}
          {data.klausurSatz && (
            <div className="p-3 rounded-[var(--radius)] bg-[var(--accent)]/5 border border-[var(--accent)]/30 flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <span className="inline-block font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">
                  Klausur-Punktegarant
                </span>
                <div className="font-serif text-sm font-semibold text-[var(--ink)] leading-snug">
                  {renderFormattedText(data.klausurSatz)}
                </div>
              </div>
              <button
                type="button"
                onClick={handleCopySatz}
                className="shrink-0 text-xs font-mono px-2 py-1 rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
              >
                {copiedSatz ? (lang === "de" ? "Kopiert!" : "已复制!") : (lang === "de" ? "Kopieren" : "复制")}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AufloesungCard;
