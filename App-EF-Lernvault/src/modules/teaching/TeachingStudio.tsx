import React, { useState } from "react";
import { BookIngestWorkshopTab } from "./tabs/BookIngestWorkshopTab";
import { QuestMapTab } from "./tabs/QuestMapTab";
import { PlayableStudioTab } from "./tabs/PlayableStudioTab";
import { MicroWorldGalleryTab } from "./tabs/MicroWorldGalleryTab";
import type { ParsedBookStructure, ParsedQuestNode } from "./engine/bookIngestParser";
import type { PacingPlan } from "./engine/pacingPlanner";

export type TeachingTabId = "workshop" | "map" | "studio" | "labor";

interface TeachingStudioProps {
  currentFach?: string;
  lang?: "de" | "zh";
  onSubjectChange?: (fach: string) => void;
  onNavigateToTab?: (tab: string, opts?: Record<string, unknown>) => void;
}

export const TeachingStudio: React.FC<TeachingStudioProps> = ({
  currentFach = "SoWi",
  lang = "de",
  onSubjectChange,
  onNavigateToTab,
}) => {
  const [activeTab, setActiveTab] = useState<TeachingTabId>("workshop");
  const [selectedQuest, setSelectedQuest] = useState<ParsedQuestNode | null>(null);
  const [activePlan, setActivePlan] = useState<{
    book: ParsedBookStructure;
    plan: PacingPlan;
  } | null>(null);

  const handleApplyPlan = (book: ParsedBookStructure, plan: PacingPlan) => {
    setActivePlan({ book, plan });
  };

  const tabs: { id: TeachingTabId; de: string; zh: string }[] = [
    { id: "workshop", de: "Zerlegung & Pacing", zh: "书籍拆解与无痛节奏" },
    { id: "map", de: "Quest-Landkarte", zh: "关卡探索图谱" },
    { id: "studio", de: "Interaktives Studio", zh: "微课演播厅" },
    { id: "labor", de: "Mikrowelten", zh: "仿真教具总台" },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--paper)] text-[var(--ink)]">
      {/* 顶部副导航与状态指示 */}
      <div className="border-b border-[var(--line)] px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--paper)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2.5 3.5h11v9h-11zM2.5 6.5h11M5.5 3.5v9" />
            </svg>
            <h1 className="text-base font-bold tracking-tight">
              {lang === "de" ? "Teaching Studio · Lehr- & Lernwerkstatt" : "Teaching Studio · 互动研习工坊"}
            </h1>
          </div>
          {onSubjectChange ? (
            <select
              value={currentFach}
              onChange={(e) => onSubjectChange(e.target.value)}
              aria-label={lang === "de" ? "Fach wechseln" : "切换学科"}
              className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] focus:outline-none cursor-pointer"
            >
              {["SoWi", "Deutsch", "Philosophie", "Physik", "Mathe"].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          ) : (
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)]">
              {currentFach}
            </span>
          )}
          {activePlan && (
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]">
              {activePlan.book.totalNodes} {lang === "de" ? "Quests aktiv" : "个关卡在案"}
            </span>
          )}
        </div>

        {/* 子模块 Tab 切换 */}
        <div className="flex items-center gap-1 border border-[var(--line)] p-0.5 bg-[var(--paper-subtle)]">
          {tabs.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id)}
              className={`px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                activeTab === t.id
                  ? "bg-[var(--paper)] text-[var(--ink)] font-bold border border-[var(--line)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)] border border-transparent"
              }`}
            >
              {lang === "de" ? t.de : t.zh}
            </button>
          ))}
        </div>
      </div>

      {/* 主工作内容展示区 */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        {activeTab === "workshop" && (
          <BookIngestWorkshopTab
            currentFach={currentFach}
            lang={lang}
            onApplyPlan={handleApplyPlan}
          />
        )}

        {activeTab === "map" && (
          <QuestMapTab
            book={activePlan?.book}
            plan={activePlan?.plan}
            currentFach={currentFach}
            lang={lang}
            onGoToWorkshop={() => setActiveTab("workshop")}
            onStartTodayQuest={() => {
              if (activePlan?.book.chapters[0]?.nodes[0]) {
                setSelectedQuest(activePlan.book.chapters[0].nodes[0]);
              }
              setActiveTab("studio");
            }}
            onSelectQuest={(node) => {
              setSelectedQuest(node);
              setActiveTab("studio");
            }}
          />
        )}

        {activeTab === "studio" && (
          <PlayableStudioTab
            questNode={selectedQuest || (activePlan?.book.chapters[0]?.nodes[0] ?? null)}
            currentFach={currentFach}
            lang={lang}
            onBackToMap={() => setActiveTab("map")}
          />
        )}

        {activeTab === "labor" && (
          <MicroWorldGalleryTab
            lang={lang}
            onNavigateToTab={onNavigateToTab}
          />
        )}
      </div>
    </div>
  );
};
