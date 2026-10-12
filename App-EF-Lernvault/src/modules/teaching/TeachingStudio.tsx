import React, { useState, useMemo, useEffect } from "react";
import { BookIngestWorkshopTab } from "./tabs/BookIngestWorkshopTab";
import { QuestMapTab } from "./tabs/QuestMapTab";
import { MicroWorldGalleryTab } from "./tabs/MicroWorldGalleryTab";
import { ActiveLearningWorkshop } from "./components/ActiveLearningWorkshop";
import { InteractiveLessonRunner } from "./components/LessonRunner/InteractiveLessonRunner";
import { repository } from "../../framework";
import { findTopicForNote, getTopicById } from "./engine/topicHub";
import {
  parseBookToQuests,
  BOOK_INGEST_PRESETS,
  matchInteractiveTool,
  inferLessonType,
  generateSocraticPrompt,
  extractKeyConcepts,
  type ParsedBookStructure,
  type ParsedQuestNode,
} from "./engine/bookIngestParser";
import { generatePacingPlan, type PacingPlan } from "./engine/pacingPlanner";
import { teachingStore } from "./engine/teachingStore";

export type TeachingTabId = "loop" | "map" | "workshop" | "labor";

export interface TeachingStudioProps {
  currentFach?: string;
  lang?: "de" | "zh";
  initialTopicId?: string;
  initialNoteId?: string;
  initialTab?: TeachingTabId;
  onSubjectChange?: (fach: string) => void;
  onNavigateToTab?: (tab: string, opts?: Record<string, unknown>) => void;
}

export const TeachingStudio: React.FC<TeachingStudioProps> = ({
  currentFach = "SoWi",
  lang = "de",
  initialTopicId,
  initialNoteId,
  initialTab,
  onSubjectChange,
  onNavigateToTab,
}) => {
  // 核心主视图：默认直接打开动态闭环工坊 (Lern-Loop / Active Workshop)，突出“新知 -> 实验 -> 笔记 -> 刷题 -> 达标”
  const [activeTab, setActiveTab] = useState<TeachingTabId>(initialTab ?? "loop");
  const [selectedQuest, setSelectedQuest] = useState<ParsedQuestNode | null>(null);
  const [selectedTopicTitle, setSelectedTopicTitle] = useState<string>("");

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

  // 当外部学科变更时，若未被用户自定义覆盖，则平滑跟随并重置默认研学节点
  useEffect(() => {
    setActivePlan(initialPresetPlan);
    if (!initialTopicId && !initialNoteId) {
      const defaultNode = initialPresetPlan.book.chapters[0]?.nodes[0] ?? null;
      setSelectedQuest(defaultNode);
      setSelectedTopicTitle(defaultNode?.title || "");
    }
  }, [initialPresetPlan, initialTopicId, initialNoteId]);

  // 当外部传入 topicId 或 noteId 时，平滑匹配课纲节点或全量知识库，直接唤醒动态学习循环
  useEffect(() => {
    if (initialTopicId || initialNoteId) {
      const targetId = initialNoteId || initialTopicId;
      let targetTitle = "";
      let foundNode: ParsedQuestNode | null = null;

      // 1. 尝试从 topicHub 统一中枢匹配
      const hubTopic =
        (initialTopicId ? getTopicById(initialTopicId) : undefined) ||
        (targetId ? findTopicForNote(targetId) : undefined);
      if (hubTopic) {
        targetTitle = lang === "zh" ? hubTopic.titleZH : hubTopic.titleDE;
      }

      // 2. 尝试从当前活跃课纲中检索
      if (activePlan?.book) {
        for (const chap of activePlan.book.chapters) {
          const match = chap.nodes.find(
            (n) =>
              n.id === targetId ||
              n.title.toLowerCase().includes(targetId!.toLowerCase()) ||
              targetId!.toLowerCase().includes(n.id.toLowerCase())
          );
          if (match) {
            foundNode = match;
            if (!targetTitle) targetTitle = match.title;
            break;
          }
        }
      }

      // 3. 尝试从全量知识库中匹配构建
      if (!targetTitle || !foundNode) {
        const allNotes = repository.getAllNotes();
        const matchedNote =
          allNotes.find((n) => n.id === targetId) ||
          allNotes.find(
            (n) =>
              n.id.toLowerCase().includes(targetId!.toLowerCase()) ||
              n.thema.toLowerCase().includes(targetId!.toLowerCase()) ||
              targetId!.toLowerCase().includes(n.id.toLowerCase()) ||
              targetId!.toLowerCase().includes(n.thema.toLowerCase())
          );

        if (matchedNote) {
          if (!targetTitle) targetTitle = matchedNote.thema;
          const lessonType = inferLessonType(matchedNote.thema);
          const tool = matchInteractiveTool(
            matchedNote.thema + " " + matchedNote.blocks.map((b) => b.text).join(" "),
            lessonType
          );
          const socraticPrompt = generateSocraticPrompt(
            matchedNote.thema,
            lessonType,
            matchedNote.fach
          );
          const keyConcepts = extractKeyConcepts(matchedNote.thema, matchedNote.fach);
          const firstParagraph = matchedNote.blocks.find((b) => b.kind === "p")?.text;
          const summary =
            firstParagraph || `${matchedNote.fach} 考纲核心概念深入研学：${matchedNote.thema}`;

          foundNode = {
            id: matchedNote.id,
            chapterId: "vault-import",
            order: 1,
            title: matchedNote.thema,
            lessonType,
            estimatedMinutes: 12,
            prerequisites: [],
            matchedToolId: tool.id,
            matchedToolName: tool.name,
            interactiveType: tool.interactiveType,
            summary,
            socraticPrompt,
            keyConcepts,
            xp: 50,
          };
        }
      }

      if (targetTitle) {
        setSelectedTopicTitle(targetTitle);
      }
      if (foundNode) {
        setSelectedQuest(foundNode);
      }
      setActiveTab("loop"); // 确保切至闭环工坊主视图
    }
  }, [initialTopicId, initialNoteId, currentFach, activePlan, lang]);

  const handleApplyPlan = (book: ParsedBookStructure, plan: PacingPlan) => {
    setActivePlan({ book, plan });
    const firstNode = book.chapters[0]?.nodes[0] ?? null;
    setSelectedQuest(firstNode);
    if (firstNode) setSelectedTopicTitle(firstNode.title);
    setActiveTab("loop"); // 应用新课纲后自动切至闭环工坊
  };

  // 启动沉浸式交互微课运行器
  const handleLaunchQuestRunner = (questNode: ParsedQuestNode) => {
    setSelectedQuest(questNode);
    setSelectedTopicTitle(questNode.title);
    setRunnerQuest(questNode);
  };

  // 关卡研习达成结算闭环
  const handleCompleteQuestInRunner = (questId: string, earnedXp: number) => {
    teachingStore.markQuestCompleted(questId, earnedXp, currentFach);
    setProgressState(teachingStore.getState());
  };

  // 下一关研习流推进
  const handleNextQuest = () => {
    if (!activePlan) return;
    const allNodes = activePlan.book.chapters.flatMap((c) => c.nodes);
    const currentIndex = allNodes.findIndex(
      (n) => n.id === selectedQuest?.id || n.title === selectedTopicTitle
    );
    if (currentIndex >= 0 && currentIndex < allNodes.length - 1) {
      const nextNode = allNodes[currentIndex + 1];
      setSelectedQuest(nextNode);
      setSelectedTopicTitle(nextNode.title);
    }
  };

  const tabs: { id: TeachingTabId; de: string; zh: string }[] = [
    { id: "loop", de: "Lern-Loop (Aktiv-Werkstatt)", zh: "动态闭环工坊" },
    { id: "map", de: "Quest-Landkarte", zh: "关卡探索图谱" },
    { id: "workshop", de: "Zerlegung & Pacing", zh: "书籍拆解与无痛节奏" },
    { id: "labor", de: "Mikrowelten", zh: "仿真教具总台" },
  ];

  return (
    <div className="flex flex-col h-full bg-[var(--paper)] text-[var(--ink)]">
      {/* 顶部副导航与状态指示 */}
      <div className="border-b border-[var(--line)] px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--paper)]">
        <div className="flex items-center gap-3 flex-wrap">
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

          {/* 处于动态闭环工坊时，展示当前活跃节点快速切换 */}
          {activeTab === "loop" && activePlan && (
            <div className="flex items-center gap-1.5 ml-2">
              <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                {lang === "de" ? "Fokus:" : "研习单元:"}
              </span>
              <select
                value={selectedQuest?.id || ""}
                onChange={(e) => {
                  const target = activePlan.book.chapters
                    .flatMap((c) => c.nodes)
                    .find((n) => n.id === e.target.value);
                  if (target) {
                    setSelectedQuest(target);
                    setSelectedTopicTitle(target.title);
                  }
                }}
                aria-label={lang === "de" ? "Lerneinheit wählen" : "选择研习单元"}
                className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] max-w-[220px] truncate cursor-pointer"
              >
                {activePlan.book.chapters.map((chap) => (
                  <optgroup key={chap.id} label={chap.title}>
                    {chap.nodes.map((node) => (
                      <option key={node.id} value={node.id}>
                        {node.order}. {node.title}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
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
        {activeTab === "loop" && (
          <ActiveLearningWorkshop
            currentFach={currentFach}
            topicTitle={selectedTopicTitle || selectedQuest?.title}
            questNode={selectedQuest}
            lang={lang}
            onSubjectChange={onSubjectChange}
            onTopicChange={(newTitle) => setSelectedTopicTitle(newTitle)}
            onNavigateToTab={onNavigateToTab}
            onNextTopic={handleNextQuest}
            onCompleteWorkshop={(summary) => {
              teachingStore.markQuestCompleted(
                selectedQuest?.id || summary.topicTitle,
                summary.earnedXp,
                currentFach
              );
              setProgressState(teachingStore.getState());
            }}
          />
        )}

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
              setSelectedTopicTitle(node.title);
              setActiveTab("loop");
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
