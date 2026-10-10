import React, { useState, useMemo, useEffect } from "react";
import { BookIngestWorkshopTab } from "./tabs/BookIngestWorkshopTab";
import { QuestMapTab } from "./tabs/QuestMapTab";
import { PlayableStudioTab } from "./tabs/PlayableStudioTab";
import { MicroWorldGalleryTab } from "./tabs/MicroWorldGalleryTab";
import { InteractiveLessonRunner } from "./components/LessonRunner/InteractiveLessonRunner";
import {
  parseBookToQuests,
  BOOK_INGEST_PRESETS,
  type ParsedBookStructure,
  type ParsedQuestNode,
} from "./engine/bookIngestParser";
import { generatePacingPlan, type PacingPlan } from "./engine/pacingPlanner";
import { teachingStore } from "./engine/teachingStore";

export type TeachingTabId = "map" | "workshop" | "studio" | "labor";

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
  // 核心主视图：默认直接打开 Duolingo 风格关卡探索河流 (Zero Friction)
  const [activeTab, setActiveTab] = useState<TeachingTabId>("map");
  const [selectedQuest, setSelectedQuest] = useState<ParsedQuestNode | null>(null);

  // 模态交互微课运行器状态
  const [runnerQuest, setRunnerQuest] = useState<ParsedQuestNode | null>(null);

  // 游戏化与学习进度状态机
  const [progressState, setProgressState] = useState(() => teachingStore.getState());

  useEffect(() => {
    const unsubscribe = teachingStore.subscribe((next) => {
      setProgressState(next);
    });
    return unsubscribe;
  }, []);

  // 默认根据当前学科自动装配经典课纲，杜绝空状态白屏
  const initialPresetPlan = useMemo(() => {
    const preset =
      BOOK_INGEST_PRESETS.find(
        (p) => p.fach.toLowerCase() === currentFach.toLowerCase()
      ) || BOOK_INGEST_PRESETS[0];
    const book = parseBookToQuests(preset.title, preset.fach, preset.rawContent);
    const plan = generatePacingPlan(book, {
      mode: "balanced",
      customDailyMinutes: 12,
      includeSpacedRepetition: true,
    });
    return { book, plan };
  }, [currentFach]);

  // 当前活跃的拆解课纲与排程
  const [activePlan, setActivePlan] = useState<{
    book: ParsedBookStructure;
    plan: PacingPlan;
  } | null>(initialPresetPlan);

  // 当外部学科变更时，若未被用户自定义覆盖，则平滑跟随
  useEffect(() => {
    setActivePlan(initialPresetPlan);
  }, [initialPresetPlan]);

  const handleApplyPlan = (book: ParsedBookStructure, plan: PacingPlan) => {
    setActivePlan({ book, plan });
    setActiveTab("map"); // 应用新课纲后自动切至关卡探索河流
  };

  // 启动沉浸式交互微课运行器
  const handleLaunchQuestRunner = (questNode: ParsedQuestNode) => {
    setSelectedQuest(questNode);
    setRunnerQuest(questNode);
  };

  // 关卡研习达成结算闭环
  const handleCompleteQuestInRunner = (questId: string, earnedXp: number) => {
    teachingStore.markQuestCompleted(questId, earnedXp, currentFach);
    setProgressState(teachingStore.getState());
  };

  const tabs: { id: TeachingTabId; de: string; zh: string }[] = [
    { id: "map", de: "Quest-Landkarte", zh: "关卡探索图谱" },
    { id: "workshop", de: "Zerlegung & Pacing", zh: "书籍拆解与无痛节奏" },
    { id: "studio", de: "Interaktives Studio", zh: "微课演播厅" },
    { id: "labor", de: "Mikrowelten", zh: "仿真教具总台" },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--paper)] text-[var(--ink)]">
      {/* 顶部副导航与状态指示 */}
      <div className="border-b border-[var(--line)] px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--paper)]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
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
        {activeTab === "map" && (
          <QuestMapTab
            book={activePlan?.book}
            plan={activePlan?.plan}
            currentFach={currentFach}
            lang={lang}
            completedQuestIds={progressState.completedQuestIds}
            totalXp={progressState.totalXp}
            streakDays={progressState.streakDays}
            todayCompletedCount={progressState.todayCompletedCount}
            onGoToWorkshop={() => setActiveTab("workshop")}
            onStartQuest={handleLaunchQuestRunner}
            onStartTodayQuest={() => {
              const firstAvailable =
                activePlan?.book.chapters[0]?.nodes.find(
                  (n) => !progressState.completedQuestIds.includes(n.id)
                ) || activePlan?.book.chapters[0]?.nodes[0];
              if (firstAvailable) {
                handleLaunchQuestRunner(firstAvailable);
              }
            }}
            onSelectQuest={(node) => {
              setSelectedQuest(node);
              setActiveTab("studio");
            }}
            onSubjectChange={(newFach) => {
              if (onSubjectChange) onSubjectChange(newFach);
            }}
            onBookChange={(newBook, newPlan) => {
              setActivePlan({ book: newBook, plan: newPlan });
            }}
          />
        )}

        {activeTab === "workshop" && (
          <BookIngestWorkshopTab
            currentFach={currentFach}
            lang={lang}
            onApplyPlan={handleApplyPlan}
          />
        )}

        {activeTab === "studio" && (
          <PlayableStudioTab
            questNode={selectedQuest || (activePlan?.book.chapters[0]?.nodes[0] ?? null)}
            currentFach={currentFach}
            lang={lang}
            onCompleteQuest={handleCompleteQuestInRunner}
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

      {/* 全屏模态交互微课运行器 (InteractiveLessonRunner) */}
      {runnerQuest && (
        <InteractiveLessonRunner
          questNode={runnerQuest}
          currentFach={currentFach}
          lang={lang}
          isOpen={true}
          onClose={() => setRunnerQuest(null)}
          onComplete={handleCompleteQuestInRunner}
        />
      )}
    </div>
  );
};
