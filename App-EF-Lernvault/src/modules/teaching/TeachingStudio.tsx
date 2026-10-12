import React, { useState, useMemo, useEffect } from "react";
import { BookIngestWorkshopTab } from "./tabs/BookIngestWorkshopTab";
import { QuestMapTab } from "./tabs/QuestMapTab";
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
  onSubjectChange,
  onNavigateToTab: _onNavigateToTab,
}) => {
  // 抽屉工坊：[+ 导入/拆解课纲] 模态状态
  const [isIngestDrawerOpen, setIsIngestDrawerOpen] = useState(false);

  // 模态交互微课运行器状态 (全屏沉浸播放器)
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

  // 当外部学科变更时平滑跟随
  useEffect(() => {
    setActivePlan(initialPresetPlan);
  }, [initialPresetPlan]);

  // 当外部传入 topicId 或 noteId（如从学科专区或技能树点击「进入研习」）时，
  // 立即解析对应关卡并全屏唤醒沉浸式微课播放器！
  useEffect(() => {
    if (initialTopicId || initialNoteId) {
      const targetId = initialNoteId || initialTopicId;
      let foundNode: ParsedQuestNode | null = null;

      // 1. 尝试从当前活跃课纲中检索
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
            break;
          }
        }
      }

      // 2. 尝试从全量知识库或 topicHub 匹配合成
      if (!foundNode) {
        const hubTopic =
          (initialTopicId ? getTopicById(initialTopicId) : undefined) ||
          (targetId ? findTopicForNote(targetId) : undefined);

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

        const nodeTitle = hubTopic
          ? lang === "zh"
            ? hubTopic.titleZH
            : hubTopic.titleDE
          : matchedNote?.thema || targetId!;
        const lessonType = inferLessonType(nodeTitle);
        const tool = matchInteractiveTool(nodeTitle, lessonType);

        foundNode = {
          id: matchedNote?.id || targetId!,
          chapterId: "vault-import",
          order: 1,
          title: nodeTitle,
          lessonType,
          estimatedMinutes: 12,
          prerequisites: [],
          matchedToolId: tool.id,
          matchedToolName: tool.name,
          interactiveType: tool.interactiveType,
          summary:
            matchedNote?.blocks.find((b) => b.kind === "p")?.text ||
            `${currentFach} 考纲核心概念深度研学：${nodeTitle}`,
          socraticPrompt: generateSocraticPrompt(nodeTitle, lessonType, currentFach),
          keyConcepts: extractKeyConcepts(nodeTitle, currentFach),
          xp: 50,
        };
      }

      if (foundNode) {
        setRunnerQuest(foundNode);
      }
    }
  }, [initialTopicId, initialNoteId, currentFach, activePlan, lang]);

  // 应用新课纲（抽屉保存后）
  const handleApplyPlan = (book: ParsedBookStructure, plan: PacingPlan) => {
    setActivePlan({ book, plan });
    setIsIngestDrawerOpen(false);
  };

  // 启动沉浸式交互微课运行器 (全屏弹窗)
  const handleLaunchQuestRunner = (questNode: ParsedQuestNode) => {
    setRunnerQuest(questNode);
  };

  // 关卡研习达成结算闭环
  const handleCompleteQuestInRunner = (questId: string, earnedXp: number) => {
    teachingStore.markQuestCompleted(questId, earnedXp, currentFach);
    setProgressState(teachingStore.getState());
  };

  return (
    <div className="flex flex-col h-full bg-[var(--paper)] text-[var(--ink)] relative">
      {/* 唯一定位日常主视图：纯粹的关卡探索图谱河流 (Zero Friction Home Base) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 xl:p-8">
        <QuestMapTab
          book={activePlan?.book}
          plan={activePlan?.plan}
          currentFach={currentFach}
          lang={lang}
          completedQuestIds={progressState.completedQuestIds}
          totalXp={progressState.totalXp}
          streakDays={progressState.streakDays}
          todayCompletedCount={progressState.todayCompletedCount}
          onGoToWorkshop={() => setIsIngestDrawerOpen(true)}
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
            handleLaunchQuestRunner(node);
          }}
          onSubjectChange={(newFach) => {
            if (onSubjectChange) onSubjectChange(newFach);
          }}
          onBookChange={(newBook, newPlan) => {
            setActivePlan({ book: newBook, plan: newPlan });
          }}
        />
      </div>

      {/* 场景 A: 沉浸上课态 (全屏 Modal / Runner - 彻底屏蔽侧边栏与顶栏干扰) */}
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

      {/* 场景 B: 抽屉工坊 (Config Drawer - 平时隐藏，按需呼出) */}
      {isIngestDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 sm:p-6">
          <div className="flex flex-col w-full max-w-5xl max-h-[90vh] bg-[var(--paper)] border border-[var(--ink)] shadow-none overflow-hidden">
            {/* 抽屉顶部条 */}
            <div className="flex items-center justify-between border-b border-[var(--line)] px-4 sm:px-6 py-3 bg-[var(--paper-subtle)] shrink-0">
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                  style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
                >
                  <rect x="2.5" y="3.5" width="11" height="9" rx="1" />
                  <path d="M5.5 3.5v9M2.5 6.5h11" />
                </svg>
                <h2 className="text-sm font-bold tracking-tight text-[var(--ink)] font-mono">
                  {lang === "de"
                    ? "Buch- & Lehrplan-Zerlegungswerkstatt"
                    : "课纲与教材拆解工坊 (配置后台)"}
                </h2>
                <span className="text-[11px] font-mono text-[var(--ink-muted)]">
                  {lang === "de"
                    ? "· Einmalige Lehrplan-Generierung"
                    : "· 高级排程设置"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsIngestDrawerOpen(false)}
                className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-xs font-mono font-bold transition-colors cursor-pointer"
                title={lang === "de" ? "Schließen" : "关闭"}
              >
                {lang === "de" ? "[X] Schließen" : "[X] 关闭"}
              </button>
            </div>

            {/* 抽屉正文内容 */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <BookIngestWorkshopTab
                currentFach={currentFach}
                lang={lang}
                onApplyPlan={handleApplyPlan}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
