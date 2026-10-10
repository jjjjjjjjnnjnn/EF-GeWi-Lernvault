import React, { useState } from "react";
import type { ErwartungshorizontData } from "./v5Types";
import { renderFormattedText } from "../Blocks";

export interface ErwartungshorizontDrawerProps {
  data: ErwartungshorizontData;
  lang?: "de" | "zh";
  defaultOpen?: boolean;
  className?: string;
  onScoreChange?: (score: number) => void;
}

export const ErwartungshorizontDrawer: React.FC<ErwartungshorizontDrawerProps> = ({
  data,
  lang = "de",
  defaultOpen = true,
  className = "",
  onScoreChange,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [checkedRows, setCheckedRows] = useState<Record<number, boolean>>({});
  const [copiedMuster, setCopiedMuster] = useState(false);

  const totalPoints = data.totalPoints || 15;

  const earnedPoints = data.rows.reduce((sum, row, idx) => {
    return checkedRows[idx] ? sum + row.punkteNum : sum;
  }, 0);

  const toggleRow = (idx: number) => {
    const nextChecked = { ...checkedRows, [idx]: !checkedRows[idx] };
    setCheckedRows(nextChecked);
    if (onScoreChange) {
      const nextScore = data.rows.reduce((sum, r, i) => (nextChecked[i] ? sum + r.punkteNum : sum), 0);
      onScoreChange(nextScore);
    }
  };

  const handleCopyMuster = () => {
    if (!data.musterKlausursatz) return;
    navigator.clipboard.writeText(data.musterKlausursatz);
    setCopiedMuster(true);
    setTimeout(() => setCopiedMuster(false), 2000);
  };

  const getGradeRating = (pts: number) => {
    if (pts >= 13) return { grade: "1 (Sehr gut)", note: lang === "de" ? "Abitur-Spitzenleistung" : "拔尖满分水准" };
    if (pts >= 10) return { grade: "2 (Gut)", note: lang === "de" ? "Solide Klausurleistung" : "良好达标水准" };
    if (pts >= 7) return { grade: "3 (Befriedigend)", note: lang === "de" ? "Basiskriterien erfüllt" : "中等基础水准" };
    if (pts >= 5) return { grade: "4 (Ausreichend)", note: lang === "de" ? "Knapp bestanden" : "及格及格线" };
    return { grade: "5 (Mangelhaft)", note: lang === "de" ? "Nacharbeit erforderlich" : "需对标重练" };
  };

  const rating = getGradeRating(earnedPoints);

  return (
    <div
      className={`my-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] shadow-none overflow-hidden ${className}`}
    >
      {/* Header Drawer Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between p-3.5 bg-[var(--paper-subtle)] text-left hover:bg-[var(--line)]/30 transition-colors cursor-pointer select-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5">
          {/* Balance Scale SVG */}
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
            <path d="M8 2v12" />
            <path d="M4 5l4-2 4 2" />
            <path d="M4 5l-2 5h4l-2-5z" />
            <path d="M12 5l-2 5h4l-2-5z" />
            <path d="M5 14h6" />
          </svg>
          <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--ink)]">
            {lang === "de"
              ? "ERWARTUNGSHORIZONT · AMTLICHE BEWERTUNGSMATRIX"
              : "ERWARTUNGSHORIZONT · 官方会考采分矩阵"}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] font-semibold">
            {totalPoints} NP
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Score Counter Pill */}
          <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]">
            {earnedPoints} / {totalPoints} NP
          </span>
          {/* Chevron SVG */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`w-3.5 h-3.5 text-[var(--gray)] transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          >
            <path d="M4 6l4 4 4-4" />
          </svg>
        </div>
      </button>

      {/* Collapsible Content Body */}
      {isOpen && (
        <div className="p-4 sm:p-5 space-y-4 border-t border-[var(--line)]">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--gray)]">
            <span>
              {lang === "de"
                ? "Kriterien anklicken zur Selbstprüfung deiner Ausarbeitung:"
                : "点击勾选对应采分点，进行考官视角自评："}
            </span>
            <span className="text-[var(--accent)] font-semibold">
              Note: {rating.grade} ({rating.note})
            </span>
          </div>

          {/* Criteria List */}
          <div className="divide-y divide-[var(--line)] border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)]">
            {data.rows.map((row, idx) => {
              const isChecked = !!checkedRows[idx];
              return (
                <div
                  key={idx}
                  onClick={() => toggleRow(idx)}
                  className={`p-3 flex items-start gap-3 transition-colors cursor-pointer select-none ${
                    isChecked ? "bg-[var(--accent)]/5" : "hover:bg-[var(--paper-subtle)]"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // handled by parent onClick
                    className="mt-1 h-4 w-4 rounded border-[var(--line)] accent-[var(--accent)] shrink-0 cursor-pointer"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex flex-wrap items-baseline gap-2">
                      {row.afb && (
                        <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] font-semibold">
                          AFB {row.afb}
                        </span>
                      )}
                      <span className="font-serif text-sm font-medium text-[var(--ink)] leading-snug">
                        {renderFormattedText(row.teilleistung)}
                      </span>
                      <span className="font-mono text-xs font-bold text-[var(--accent)] shrink-0 ml-auto">
                        +{row.punkte}
                      </span>
                    </div>

                    {row.alternativweg && (
                      <div className="text-xs font-mono text-[var(--gray)] pl-2 border-l border-[var(--line)] mt-1">
                        <span className="font-semibold text-[var(--ink)] mr-1">Alternativweg:</span>
                        {renderFormattedText(row.alternativweg)}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 15 NP MUSTER-KLAUSURSATZ */}
          {data.musterKlausursatz && (
            <div className="p-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs uppercase tracking-wider font-bold text-[var(--accent)] flex items-center gap-1.5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-3.5 h-3.5 text-current shrink-0"
                  >
                    <path d="M12 2H4a2 2 0 0 0-2 2v10l6-3 6 3V4a2 2 0 0 0-2-2z" />
                  </svg>
                  <span>15 NP MUSTER-KLAUSURSATZ · 考官示范原句</span>
                </span>

                <button
                  type="button"
                  onClick={handleCopyMuster}
                  className="text-xs font-mono text-[var(--gray)] hover:text-[var(--accent)] transition-colors cursor-pointer"
                >
                  {copiedMuster ? (lang === "de" ? "Kopiert!" : "已复制!") : (lang === "de" ? "Kopieren" : "复制原句")}
                </button>
              </div>

              <div className="font-serif text-[14.5px] leading-relaxed text-[var(--ink)] pl-3 border-l-2 border-[var(--accent)]">
                {renderFormattedText(data.musterKlausursatz)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ErwartungshorizontDrawer;
