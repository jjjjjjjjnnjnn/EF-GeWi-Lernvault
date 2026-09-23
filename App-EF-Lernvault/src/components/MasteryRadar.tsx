import React, { useState } from "react";
import { MasteryEngine, type TermIdentifier } from "../engine/mastery";
import { t } from "../i18n";

interface MasteryRadarProps {
  fach: string;
  onRefresh?: () => void;
}

export const MasteryRadar: React.FC<MasteryRadarProps> = ({ fach }) => {
  const lang = typeof document !== "undefined" && document.documentElement.lang === "zh" ? "zh" : "de";
  const tr = t(lang);
  const [engine] = useState(() => new MasteryEngine());
  const [termMode, setTermMode] = useState(engine.isTermModeEnabled());
  const [activeTerm, setActiveTerm] = useState<TermIdentifier>(engine.getActiveTerm());
  const [, setTick] = useState(0);

  const refresh = () => setTick((value) => value + 1);
  const stats = engine.getInhaltsfeldStats(fach);
  const overall = engine.getOverallFachMastery(fach);

  const handleToggleTermMode = () => {
    const next = !termMode;
    engine.setTermModeEnabled(next);
    setTermMode(next);
    setActiveTerm(engine.getActiveTerm());
    refresh();
  };

  const handleSwitchTerm = (term: TermIdentifier) => {
    engine.setActiveTerm(term);
    setActiveTerm(term);
    refresh();
  };

  const handleArchive = () => {
    const archive = engine.archiveCurrentTerm();
    alert(tr.termArchiveDone(archive.term, new Date(archive.archivedAt).toLocaleTimeString()));
    refresh();
  };

  const handleReset = () => {
    if (confirm(tr.termResetConfirm(activeTerm))) {
      engine.resetCurrentTerm();
      refresh();
    }
  };

  return (
    <div className="space-y-4 border-y border-[var(--line)] py-4 font-sans text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div>
          <h3 className="de-heading text-base text-[var(--ink)]">
            {tr.masteryTitle}
            <span className="zh-translation font-sans text-sm font-normal">{tr.masteryTitleZh}</span>
          </h3>
          <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">{tr.masteryPercent(overall)}</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleToggleTermMode}
            aria-pressed={termMode}
            className={`rounded-[var(--radius)] border px-2 py-1 font-mono text-[var(--text-meta)] ${
              termMode
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {termMode ? `${tr.termModeOn} / ${tr.termModeOnZh}` : `${tr.termModeOff} / ${tr.termModeOffZh}`}
          </button>

          {termMode && (
            <div className="flex items-center gap-1 border-l border-[var(--line)] pl-2">
              {(["EF.1", "EF.2"] as TermIdentifier[]).map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => handleSwitchTerm(term)}
                  aria-pressed={activeTerm === term}
                  className={`rounded-[var(--radius)] px-2 py-1 font-mono text-[var(--text-meta)] ${
                    activeTerm === term
                      ? "bg-[var(--accent)] text-[var(--paper)]"
                      : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {term}
                </button>
              ))}
              <button
                type="button"
                onClick={handleArchive}
                title={`${tr.termArchiveTitle} / ${tr.termArchiveTitleZh}`}
                className="rounded-[var(--radius)] border border-[var(--line)] px-2 py-1 text-[var(--text-meta)] text-[var(--gray)] hover:text-[var(--ink)]"
              >
                {tr.termArchive} / {tr.termArchiveZh}
              </button>
              <button
                type="button"
                onClick={handleReset}
                title={`${tr.termResetTitle} / ${tr.termResetTitleZh}`}
                className="rounded-[var(--radius)] border border-[var(--line)] px-2 py-1 text-[var(--text-meta)] text-[var(--gray)] hover:text-[var(--warning)]"
              >
                {tr.termReset} / {tr.termResetZh}
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-3">
        {stats.map(({ inhaltsfeld, avgMastery, topicCount, status }) => {
          const statusClass =
            status === "mastered"
              ? "bg-[var(--success)]"
              : status === "progress"
                ? "bg-[var(--warning)]"
                : "bg-[var(--gray)]";
          const statusLabel =
            status === "mastered"
              ? `${tr.masteryMastered} / ${tr.masteryMasteredZh}`
              : status === "progress"
                ? `${tr.masteryProgress} / ${tr.masteryProgressZh}`
                : `${tr.masteryReview} / ${tr.masteryReviewZh}`;

          return (
            <div key={inhaltsfeld.id} className="space-y-1">
              <div className="flex items-center justify-between gap-2 text-[var(--text-meta)]">
                <div className="flex min-w-0 items-center gap-2">
                  <span className="shrink-0 font-mono font-medium text-[var(--gray)]">[{inhaltsfeld.code}]</span>
                  <span className="truncate text-[var(--ink)]" title={inhaltsfeld.titleDE}>
                    {inhaltsfeld.titleDE}
                  </span>
                </div>
                <div className="flex shrink-0 items-center gap-2 font-mono text-[var(--text-meta)]">
                  <span className="text-[var(--gray)]">{tr.masteryNotes(topicCount)}</span>
                  <span className="w-8 text-right font-semibold text-[var(--ink)]">{avgMastery}%</span>
                  <span className="w-28 text-right text-[var(--gray)]">{statusLabel}</span>
                </div>
              </div>
              <div className="h-1.5 w-full overflow-hidden rounded-[var(--radius)] bg-[var(--line)]">
                <div
                  className={`h-full transition-transform duration-[var(--dur-view)] ${statusClass}`}
                  style={{ width: `${avgMastery}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
