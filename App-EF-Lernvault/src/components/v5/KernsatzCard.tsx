import React, { useState } from "react";
import type { KernsatzData } from "./v5Types";
import { renderFormattedText } from "../Blocks";

export interface KernsatzCardProps {
  data: KernsatzData;
  lang?: "de" | "zh";
  className?: string;
}

export const KernsatzCard: React.FC<KernsatzCardProps> = ({
  data,
  lang = "de",
  className = "",
}) => {
  const [copied, setCopied] = useState(false);
  const [showClozeAnswer, setShowClozeAnswer] = useState(false);

  const handleCopy = () => {
    if (!data.text) return;
    navigator.clipboard.writeText(data.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const hasZerlegung = !!(data.subjekt || data.mechanismus || data.urteil);

  return (
    <div
      className={`my-5 rounded-[var(--radius)] border-2 border-[var(--ink)] bg-[var(--surface)] p-4 sm:p-5 shadow-none ${className}`}
    >
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[var(--line)]">
        <div className="flex items-center gap-2">
          {/* Axiom bookmark stamp SVG */}
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
            <path d="M3 2h10v12l-5-3-5 3V2z" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--ink)]">
            {lang === "de" ? "KERNSATZ · KLAUSUR-AXIOM" : "KERNSATZ · 考场必背公理"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)]">
            Abitur-Standard
          </span>
        </div>

        {/* Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          aria-label={lang === "de" ? "Klausur-Satz kopieren" : "复制公理原句"}
          className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] active:scale-95 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 text-[var(--accent)]"
              >
                <path d="M3 8.5l3.5 3.5L13 5" />
              </svg>
              <span className="text-[var(--accent)] font-medium">
                {lang === "de" ? "Kopiert!" : "已复制!"}
              </span>
            </>
          ) : (
            <>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-3.5 h-3.5 text-current"
              >
                <rect x="5" y="5" width="8" height="8" rx="1.5" />
                <path d="M3 11V3h8" />
              </svg>
              <span>{lang === "de" ? "Kopieren" : "复制"}</span>
            </>
          )}
        </button>
      </div>

      {/* Main Axiom Sentence */}
      <div className="my-3.5 p-3.5 rounded-[var(--radius)] bg-[var(--paper-subtle)] border-l-4 border-l-[var(--accent)]">
        <div className="font-serif text-[15px] sm:text-base font-semibold leading-relaxed text-[var(--ink)]">
          {renderFormattedText(data.text)}
        </div>
      </div>

      {/* 3-Part Klausur Breakdown (Subjekt | Mechanismus | Urteil) */}
      {hasZerlegung && (
        <div className="mt-3 pt-3 border-t border-[var(--line)]">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--gray)] mb-2">
            {lang === "de"
              ? "Dreisatz-Zerlegung (Subjekt · Mechanismus · Urteil):"
              : "采分三段解构（考察主体 · 作用机理 · 评价结论）："}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {/* 1. Subjekt */}
            <div className="p-2.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] space-y-1">
              <span className="inline-block font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--paper-subtle)] text-[var(--gray)] font-semibold">
                1. Subjekt / 主体
              </span>
              <div className="font-serif text-xs sm:text-[13px] text-[var(--ink)] leading-snug">
                {renderFormattedText(data.subjekt || "—")}
              </div>
            </div>

            {/* 2. Mechanismus */}
            <div className="p-2.5 rounded-[var(--radius)] border border-[var(--accent)]/30 bg-[var(--accent)]/5 space-y-1">
              <span className="inline-block font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] font-semibold">
                2. Mechanismus / 机理
              </span>
              <div className="font-serif text-xs sm:text-[13px] text-[var(--ink)] leading-snug">
                {renderFormattedText(data.mechanismus || "—")}
              </div>
            </div>

            {/* 3. Urteil */}
            <div className="p-2.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] space-y-1">
              <span className="inline-block font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-[var(--paper-subtle)] text-[var(--gray)] font-semibold">
                3. Urteil / 结论
              </span>
              <div className="font-serif text-xs sm:text-[13px] text-[var(--ink)] leading-snug">
                {renderFormattedText(data.urteil || "—")}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selbsttest Cloze Section */}
      {data.selbsttest && (
        <div className="mt-3 pt-3 border-t border-[var(--line)]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--gray)]">
              {lang === "de" ? "Selbsttest (Gedächtnisprüfung):" : "完形自测（主动回忆闭环）："}
            </span>
            <button
              type="button"
              onClick={() => setShowClozeAnswer((v) => !v)}
              className="text-[11px] font-mono text-[var(--accent)] hover:underline cursor-pointer"
            >
              {showClozeAnswer
                ? lang === "de"
                  ? "Lücke wieder verdecken"
                  : "隐藏答案"
                : lang === "de"
                ? "Lösung einblenden"
                : "揭晓填空答案"}
            </button>
          </div>

          <div className="p-2.5 rounded-[var(--radius)] border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] font-serif text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
            {!showClozeAnswer ? (
              renderFormattedText(data.selbsttest)
            ) : (
              <div className="space-y-1.5">
                <div>{renderFormattedText(data.selbsttest)}</div>
                <div className="pt-1.5 border-t border-[var(--line)]/60 text-xs font-mono text-[var(--accent)]">
                  <span className="font-bold mr-1">Vollständiger Satz:</span>
                  {data.text}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default KernsatzCard;
