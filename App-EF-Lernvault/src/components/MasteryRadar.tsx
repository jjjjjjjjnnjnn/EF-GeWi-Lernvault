import React, { useState } from "react";
import { MasteryEngine, type TermIdentifier } from "../engine/mastery";

interface MasteryRadarProps {
  fach: string;
  onRefresh?: () => void;
}

export const MasteryRadar: React.FC<MasteryRadarProps> = ({ fach }) => {
  const [engine] = useState(() => new MasteryEngine());
  const [termMode, setTermMode] = useState(engine.isTermModeEnabled());
  const [activeTerm, setActiveTerm] = useState<TermIdentifier>(engine.getActiveTerm());
  const [, setTick] = useState(0);

  const refresh = () => setTick((t) => t + 1);

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
    alert(`Semesterstand archiviert (${archive.term}, ${new Date(archive.archivedAt).toLocaleTimeString()})`);
    refresh();
  };

  const handleReset = () => {
    if (confirm(`Möchten Sie die Daten für ${activeTerm} wirklich zurücksetzen?`)) {
      engine.resetCurrentTerm();
      refresh();
    }
  };

  return (
    <div className="border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/40 p-4 rounded text-xs space-y-4 font-sans">
      {/* 顶部标题与学期管理控制栏 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
        <div className="flex items-center gap-2">
          <span className="font-serif font-semibold text-sm text-stone-900 dark:text-stone-100">
            Kompetenz-Radar (NRW Lehrplan)
          </span>
          <span className="text-stone-500 font-mono text-[11px]">
            {overall}% Beherrschung
          </span>
        </div>

        {/* 自主开启/关闭学期管理 */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleToggleTermMode}
            className={`px-2 py-0.5 border rounded text-[11px] font-mono transition-colors ${
              termMode
                ? "border-stone-800 bg-stone-800 text-white dark:border-stone-200 dark:bg-stone-200 dark:text-stone-900"
                : "border-stone-300 text-stone-600 hover:border-stone-500 dark:border-stone-700 dark:text-stone-400"
            }`}
          >
            {termMode ? "Semester-Modus: AN" : "Semester-Modus: AUS"}
          </button>

          {termMode && (
            <div className="flex items-center gap-1 ml-1 border-l border-stone-300 dark:border-stone-700 pl-2">
              <button
                onClick={() => handleSwitchTerm("EF.1")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  activeTerm === "EF.1"
                    ? "bg-stone-700 text-white dark:bg-stone-300 dark:text-stone-900 font-semibold"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                EF.1
              </button>
              <button
                onClick={() => handleSwitchTerm("EF.2")}
                className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                  activeTerm === "EF.2"
                    ? "bg-stone-700 text-white dark:bg-stone-300 dark:text-stone-900 font-semibold"
                    : "text-stone-500 hover:text-stone-800"
                }`}
              >
                EF.2
              </button>
              <button
                onClick={handleArchive}
                title="Aktuellen Stand archivieren"
                className="px-1.5 py-0.5 border border-stone-300 dark:border-stone-700 rounded text-[10px] text-stone-600 hover:bg-stone-200 dark:text-stone-400 dark:hover:bg-stone-800"
              >
                Archivieren
              </button>
              <button
                onClick={handleReset}
                title="Diesen Semesterstand zurücksetzen"
                className="px-1.5 py-0.5 border border-stone-300 dark:border-stone-700 rounded text-[10px] text-stone-600 hover:bg-stone-200 dark:text-stone-400 dark:hover:bg-stone-800"
              >
                Reset
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 考纲 Inhaltsfelder 掌握度进度条列表 */}
      <div className="space-y-3">
        {stats.map(({ inhaltsfeld, avgMastery, topicCount, status }) => {
          const statusBg =
            status === "mastered"
              ? "bg-emerald-600 dark:bg-emerald-500"
              : status === "progress"
              ? "bg-amber-500 dark:bg-amber-400"
              : "bg-stone-400 dark:bg-stone-500";

          const statusText =
            status === "mastered"
              ? "Gefestigt"
              : status === "progress"
              ? "Im Aufbau"
              : "Wiederholen";

          return (
            <div key={inhaltsfeld.id} className="space-y-1">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 truncate pr-2">
                  <span className="font-mono font-medium text-stone-700 dark:text-stone-300">
                    [{inhaltsfeld.code}]
                  </span>
                  <span className="text-stone-900 dark:text-stone-100 truncate" title={inhaltsfeld.titleDE}>
                    {inhaltsfeld.titleDE}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 font-mono text-[10px]">
                  <span className="text-stone-400">({topicCount} Notizen)</span>
                  <span className="font-semibold text-stone-800 dark:text-stone-200 w-8 text-right">
                    {avgMastery}%
                  </span>
                  <span className="text-stone-500 text-[10px] w-16 text-right">
                    {statusText}
                  </span>
                </div>
              </div>

              {/* Tufte 纯色进度条 */}
              <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-sm overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${statusBg}`}
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
