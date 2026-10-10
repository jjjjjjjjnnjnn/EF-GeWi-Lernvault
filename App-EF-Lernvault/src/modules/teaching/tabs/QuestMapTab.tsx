import React, { useState, useMemo, useEffect } from "react";
import {
  parseBookToQuests,
  BOOK_INGEST_PRESETS,
  type ParsedBookStructure,
  type ParsedQuestNode,
  type LessonType,
} from "../engine/bookIngestParser";
import {
  generatePacingPlan,
  type PacingPlan,
} from "../engine/pacingPlanner";

export interface QuestMapTabProps {
  book?: ParsedBookStructure | null;
  plan?: PacingPlan | null;
  currentFach?: string;
  lang?: "de" | "zh";
  completedQuestIds?: string[];
  onSelectQuest?: (questNode: ParsedQuestNode) => void;
  onStartTodayQuest?: () => void;
  onGoToWorkshop?: () => void;
}

type QuestStatus = "mastered" | "available" | "locked";
type FilterMode = "all" | "unmastered" | "mastered";

/* =========================================================================
   Inline Minimalist Tufte Hand-crafted SVG Icons (16x16, stroke, no emoji)
   ========================================================================= */

const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <rect x="3" y="6.5" width="10" height="7" rx="1" />
    <path d="M5.5 6.5V4.5a2.5 2.5 0 0 1 5 0v2" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
);

const CompassIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <circle cx="8" cy="8" r="6" />
    <circle cx="8" cy="8" r="1.5" />
    <path d="M8 2v2M8 12v2M2 8h2M12 8h2" />
  </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <circle cx="8" cy="8" r="6" />
    <path d="M8 5v3.5l2.5 1.5" />
  </svg>
);

const StreakIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <path d="M8 2c.5 2-1 3.5-1 5 1.5-1 2-2.5 2-3.5 2.5 1.5 3.5 4 2 6.5-1 1.7-2.5 2-3 2s-4-1-4-4c0-2.5 2-4.5 4-6z" />
  </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <path d="M8 2l1.8 3.8 4.2.6-3 3 .7 4.2L8 11.6l-3.7 2 .7-4.2-3-3 4.2-.6L8 2z" />
  </svg>
);

const ToolIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <path d="M10 2a3 3 0 0 0-2.5 4.6L2.8 11.3a1 1 0 0 0 0 1.4l.5.5a1 1 0 0 0 1.4 0l4.7-4.7A3 3 0 1 0 10 2z" />
  </svg>
);

const BulbIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <circle cx="8" cy="6" r="3.5" />
    <path d="M6 10.5h4M6.5 12h3M7 13.5h2" />
  </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
  </svg>
);

const BookMapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <path d="M2 3.5h5a1 1 0 0 1 1 1V13a1 1 0 0 0-1-1H2V3.5zM14 3.5H9a1 1 0 0 0-1 1V13a1 1 0 0 1 1-1h5V3.5z" />
  </svg>
);

export const QuestMapTab: React.FC<QuestMapTabProps> = ({
  book: initialBook,
  plan: initialPlan,
  currentFach = "SoWi",
  lang = "de",
  completedQuestIds,
  onSelectQuest,
  onStartTodayQuest,
  onGoToWorkshop,
}) => {
  // 本地预设切换支持：若外部未传 book，允许一键体验预设课纲
  const [localPresetIndex, setLocalPresetIndex] = useState<number | null>(null);

  const activeBook: ParsedBookStructure | null = useMemo(() => {
    if (initialBook) return initialBook;
    if (localPresetIndex !== null && BOOK_INGEST_PRESETS[localPresetIndex]) {
      const preset = BOOK_INGEST_PRESETS[localPresetIndex];
      return parseBookToQuests(preset.title, preset.fach, preset.rawContent);
    }
    return null;
  }, [initialBook, localPresetIndex]);

  const activePlan: PacingPlan | null = useMemo(() => {
    if (initialPlan) return initialPlan;
    if (activeBook) {
      return generatePacingPlan(activeBook, {
        mode: "balanced",
        customDailyMinutes: 12,
        includeSpacedRepetition: true,
      });
    }
    return null;
  }, [initialPlan, activeBook]);

  // 本地已通关关卡集合（外部传入优先，支持在图谱中直接打卡交互）
  const [completedSet, setCompletedSet] = useState<Set<string>>(() => {
    if (completedQuestIds && completedQuestIds.length > 0) {
      return new Set(completedQuestIds);
    }
    return new Set<string>();
  });

  useEffect(() => {
    if (completedQuestIds) {
      setCompletedSet(new Set(completedQuestIds));
    }
  }, [completedQuestIds]);

  // 筛选与详情预览弹窗状态
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [inspectNode, setInspectNode] = useState<ParsedQuestNode | null>(null);

  // 扁平化所有节点与节点查找索引
  const allNodes = useMemo<ParsedQuestNode[]>(() => {
    if (!activeBook) return [];
    return activeBook.chapters.flatMap((c) => c.nodes);
  }, [activeBook]);

  const nodeMap = useMemo(() => {
    const map = new Map<string, ParsedQuestNode>();
    for (const node of allNodes) {
      map.set(node.id, node);
    }
    return map;
  }, [allNodes]);

  // 计算每个关卡的状态：mastered / available / locked
  const getQuestStatus = (node: ParsedQuestNode): QuestStatus => {
    if (completedSet.has(node.id)) {
      return "mastered";
    }
    if (!node.prerequisites || node.prerequisites.length === 0) {
      return "available";
    }
    const allMet = node.prerequisites.every((pid) => completedSet.has(pid));
    return allMet ? "available" : "locked";
  };

  // 打卡 / 取消打卡本地切换
  const handleToggleCompletion = (questId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCompletedSet((prev) => {
      const next = new Set(prev);
      if (next.has(questId)) {
        next.delete(questId);
      } else {
        next.add(questId);
      }
      return next;
    });
  };

  // 今日任务：定位首个可挑战但尚未通关的关卡
  const todayQuest = useMemo<ParsedQuestNode | null>(() => {
    if (allNodes.length === 0) return null;
    const availableNode = allNodes.find((n) => getQuestStatus(n) === "available");
    if (availableNode) return availableNode;
    // 若全部通关或因依赖阻断，返回首个未完成的
    const uncompletedNode = allNodes.find((n) => !completedSet.has(n.id));
    return uncompletedNode || null;
  }, [allNodes, completedSet]);

  // RPG 积分与进度指标
  const totalQuests = allNodes.length;
  const masteredCount = useMemo(() => {
    return allNodes.filter((n) => completedSet.has(n.id)).length;
  }, [allNodes, completedSet]);

  const totalXp = useMemo(() => {
    return allNodes.reduce((sum, n) => sum + (n.xp || 100), 0);
  }, [allNodes]);

  const gainedXp = useMemo(() => {
    return allNodes
      .filter((n) => completedSet.has(n.id))
      .reduce((sum, n) => sum + (n.xp || 100), 0);
  }, [allNodes, completedSet]);

  const progressPercent = totalQuests > 0 ? Math.round((masteredCount / totalQuests) * 100) : 0;
  const dailyTargetMinutes = activePlan?.targetDailyMinutes || 12;

  // 课型国际化标签
  const getLessonTypeLabel = (type: LessonType) => {
    if (lang === "de") {
      switch (type) {
        case "concept":
          return "Konzept";
        case "practice":
          return "Anwendung";
        case "experiment":
          return "Experiment";
      }
    } else {
      switch (type) {
        case "concept":
          return "核心概念";
        case "practice":
          return "考试真题";
        case "experiment":
          return "仿真探究";
      }
    }
  };

  // 1. 空状态兜底：尚未载入教材与规划
  if (!activeBook || activeBook.chapters.length === 0) {
    return (
      <div className="flex flex-col gap-6 text-[var(--ink)]">
        <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-6 sm:p-10 flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 border border-[var(--line)] bg-[var(--paper)] flex items-center justify-center">
            <BookMapIcon className="w-6 h-6 text-[var(--ink)]" />
          </div>

          <div className="max-w-md">
            <h2 className="text-base font-bold tracking-tight font-mono">
              {lang === "de"
                ? "Keine aktive Quest-Landkarte vorhanden"
                : "尚未载入关卡探索图谱"}
            </h2>
            <p className="text-xs text-[var(--ink-muted)] mt-2 font-mono leading-relaxed">
              {lang === "de"
                ? "Die Quest-Landkarte visualisiert dein Buch als schrittweisen RPG-Pfad mit DAG-Voraussetzungen, taeglichem 12-Minuten-Zeitbudget und Duolingo-inspiriertem Meisterungsfortschritt."
                : "关卡探索图谱将教材大纲解构为类似 Duolingo 的 RPG 渐进式闯关流，附带 DAG 前置依赖校验、每日 12 分钟无痛负荷与经验值结算。"}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
            {onGoToWorkshop && (
              <button
                type="button"
                onClick={onGoToWorkshop}
                className="text-xs font-mono px-4 py-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 cursor-pointer"
              >
                {lang === "de"
                  ? "<- Zur Zerlegungswerkstatt"
                  : "<- 前往书籍拆解工坊"}
              </button>
            )}
          </div>

          <div className="w-full max-w-xl border-t border-[var(--line)] pt-6 mt-4">
            <p className="text-xs font-mono text-[var(--ink-muted)] mb-3">
              {lang === "de"
                ? "Oder lade direkt ein Vorzeige-Buch zum Kennenlernen:"
                : "或直接载入一本经典示范课纲即刻体验："}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
              {BOOK_INGEST_PRESETS.map((preset, idx) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => setLocalPresetIndex(idx)}
                  className="p-2.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] transition-colors text-left cursor-pointer flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="font-bold border border-[var(--line)] px-1">
                      {preset.fach}
                    </span>
                    <span className="text-[var(--ink-muted)]">Preset #{idx + 1}</span>
                  </div>
                  <div className="text-xs font-bold truncate text-[var(--ink)]">
                    {preset.title}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-[var(--ink)]">
      {/* =========================================================================
          HERO BANNER: Heutige Mission & Gamified Scaffolding Focus
          ========================================================================= */}
      <section className="border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-6 flex flex-col gap-5">
        {/* 顶部指标条 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
          <div className="flex items-center gap-2">
            <CompassIcon className="w-5 h-5 text-[var(--ink)]" />
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono tracking-wider uppercase text-[var(--ink-muted)]">
                <span>{lang === "de" ? "Heutige Mission" : "今日聚焦任务"}</span>
                <span className="border border-[var(--line)] px-1 py-0.2 bg-[var(--paper-subtle)] text-[10px]">
                  {activeBook.fach || currentFach}
                </span>
              </div>
              <h2 className="text-base font-bold tracking-tight text-[var(--ink)]">
                {activeBook.title}
              </h2>
            </div>
          </div>

          {/* 右侧微量规：Streak, XP, Tagesziel */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {/* Streak 徽章 */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)]">
              <StreakIcon className="w-3.5 h-3.5 text-[var(--ink)]" />
              <span>{lang === "de" ? "Streak: 5 Tage" : "连续 5 天"}</span>
            </div>

            {/* 今日无痛时间预算 */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)]">
              <ClockIcon className="w-3.5 h-3.5 text-[var(--ink)]" />
              <span>~{dailyTargetMinutes} min / {lang === "de" ? "Tag" : "日"}</span>
            </div>

            {/* XP 累计 */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold">
              <StarIcon className="w-3.5 h-3.5 text-[var(--paper)]" />
              <span>
                {gainedXp} / {totalXp} XP ({progressPercent}%)
              </span>
            </div>
          </div>
        </div>

        {/* 进度百分比细线进度条 */}
        <div className="w-full bg-[var(--paper-subtle)] border border-[var(--line)] h-2 overflow-hidden">
          <div
            className="bg-[var(--ink)] h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* 今日核心关卡卡片 Focus Card */}
        {todayQuest ? (
          <div className="border border-[var(--ink)] bg-[var(--paper-subtle)] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] uppercase">
                  {lang === "de" ? "Empfohlen fuer heute" : "今日推荐进阶"}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)]">
                  {getLessonTypeLabel(todayQuest.lessonType)}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)]">
                  ~{todayQuest.estimatedMinutes} min
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)]">
                  +{todayQuest.xp} XP
                </span>
              </div>

              <div className="text-sm font-bold text-[var(--ink)] mt-0.5">
                {todayQuest.title}
              </div>

              <p className="text-xs text-[var(--ink-muted)] font-mono line-clamp-1">
                {todayQuest.summary}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={() => setInspectNode(todayQuest)}
                className="text-xs font-mono px-3 py-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] transition-colors cursor-pointer"
              >
                {lang === "de" ? "Vorschau" : "前置导学"}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (onStartTodayQuest) {
                    onStartTodayQuest();
                  } else if (onSelectQuest) {
                    onSelectQuest(todayQuest);
                  }
                }}
                className="text-xs font-mono font-bold px-4 py-1.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
              >
                <span>{lang === "de" ? "Starten" : "开启通关"}</span>
                <span aria-hidden="true">-&gt;</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 text-center">
            <span className="text-xs font-mono font-bold text-[var(--ink)]">
              {lang === "de"
                ? "Alle Quests meisterhaft absolviert! (100% gemeistert)"
                : "全书关卡已圆满通关！(100% 达成)"}
            </span>
          </div>
        )}
      </section>

      {/* =========================================================================
          CONTROLS & FILTER BAR
          ========================================================================= */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-[var(--ink-muted)]">
            {lang === "de" ? "Filter:" : "关卡过滤:"}
          </span>
          {(["all", "unmastered", "mastered"] as FilterMode[]).map((mode) => {
            const isSel = filterMode === mode;
            const labels = {
              all: lang === "de" ? "Alle Quests" : "全部关卡",
              unmastered: lang === "de" ? "Offen" : "待通关",
              mastered: lang === "de" ? "Gemeistert" : "已掌握",
            };
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setFilterMode(mode)}
                className={`px-2 py-0.5 border transition-colors cursor-pointer ${
                  isSel
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold"
                    : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                }`}
              >
                {labels[mode]}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-[var(--ink-muted)]">
          <span>
            {masteredCount} / {totalQuests} {lang === "de" ? "gemeistert" : "个已掌握"}
          </span>
          {onGoToWorkshop && (
            <button
              type="button"
              onClick={onGoToWorkshop}
              className="hover:text-[var(--ink)] underline cursor-pointer"
            >
              {lang === "de" ? "Buch wechseln" : "更换课纲"}
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          CHAPTER MILESTONES & RPG PROGRESSION STREAM
          ========================================================================= */}
      <div className="flex flex-col gap-8">
        {activeBook.chapters.map((chap) => {
          const chapMastered = chap.nodes.filter((n) => completedSet.has(n.id)).length;
          const chapTotal = chap.nodes.length;
          const chapPercent = chapTotal > 0 ? Math.round((chapMastered / chapTotal) * 100) : 0;

          // 筛选节点
          const filteredNodes = chap.nodes.filter((node) => {
            const isCompleted = completedSet.has(node.id);
            if (filterMode === "mastered") return isCompleted;
            if (filterMode === "unmastered") return !isCompleted;
            return true;
          });

          if (filteredNodes.length === 0 && filterMode !== "all") {
            return null;
          }

          return (
            <section
              key={chap.id}
              className="border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-6 flex flex-col gap-6"
            >
              {/* 章节里程碑阶段头 (Chapter Milestone Header) */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] font-bold">
                      {lang === "de" ? `ETAPPE ${chap.order}` : `第 ${chap.order} 阶段`}
                    </span>
                    <h3 className="text-sm font-bold tracking-tight text-[var(--ink)]">
                      {chap.title}
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--ink-muted)]">
                    {chapTotal} {lang === "de" ? "Quests" : "个关卡"} · ~{chap.totalMinutes} min {lang === "de" ? "Lernaufwand" : "总时长"}
                  </div>
                </div>

                {/* 章节完成度 Badge & 微进度条 */}
                <div className="flex items-center gap-3">
                  <div className="w-24 sm:w-32 bg-[var(--paper-subtle)] border border-[var(--line)] h-1.5 overflow-hidden">
                    <div
                      className="bg-[var(--ink)] h-full transition-all duration-300"
                      style={{ width: `${chapPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-bold">
                    {chapMastered}/{chapTotal} {lang === "de" ? "gemeistert" : "完成"}
                  </span>
                </div>
              </div>

              {/* 节点序列流 (Quest Progression Stream) */}
              <div className="relative pl-6 sm:pl-8 flex flex-col gap-6">
                {/* 贯穿全章节的垂直进度主轴线 */}
                <div
                  className="absolute left-[15px] sm:left-[19px] top-4 bottom-4 w-px bg-[var(--line)]"
                  aria-hidden="true"
                />

                {filteredNodes.map((node) => {
                  const status = getQuestStatus(node);
                  const isMastered = status === "mastered";
                  const isAvailable = status === "available";
                  const isLocked = status === "locked";

                  // 获取前置关卡名称列表供 Tooltip / 提示展示
                  const prereqTitles = (node.prerequisites || [])
                    .map((pid) => nodeMap.get(pid)?.title)
                    .filter(Boolean) as string[];

                  return (
                    <div key={node.id} className="relative flex items-start gap-4 sm:gap-5">
                      {/* 节点锚点图标 (Checkpoint Anchor) */}
                      <div className="relative -ml-[25px] sm:-ml-[29px] mt-2 z-10">
                        {isMastered && (
                          <div
                            className="w-[18px] h-[18px] border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center cursor-pointer"
                            title={lang === "de" ? "Gemeistert" : "已掌握"}
                            onClick={(e) => handleToggleCompletion(node.id, e)}
                          >
                            <CheckIcon className="w-3.5 h-3.5 text-[var(--paper)]" />
                          </div>
                        )}

                        {isAvailable && (
                          <div
                            className="w-[18px] h-[18px] border-2 border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] flex items-center justify-center cursor-pointer animate-pulse"
                            title={lang === "de" ? "Bereit zum Start" : "可挑战"}
                            onClick={() => onSelectQuest?.(node)}
                          >
                            <div className="w-1.5 h-1.5 bg-[var(--ink)]" />
                          </div>
                        )}

                        {isLocked && (
                          <div
                            className="w-[18px] h-[18px] border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)] flex items-center justify-center cursor-not-allowed"
                            title={lang === "de" ? "Gesperrt" : "已锁定"}
                          >
                            <LockIcon className="w-3 h-3 text-[var(--ink-muted)]" />
                          </div>
                        )}
                      </div>

                      {/* 关卡详情主卡片 */}
                      <div
                        className={`flex-1 border p-3.5 sm:p-4 transition-colors ${
                          isAvailable
                            ? "border-[var(--ink)] bg-[var(--paper)]"
                            : isMastered
                            ? "border-[var(--line)] bg-[var(--paper-subtle)]"
                            : "border-dashed border-[var(--line)] bg-[var(--paper-subtle)] opacity-75"
                        }`}
                      >
                        {/* 卡片头部元数据 */}
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2 mb-2">
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-[10px] font-mono px-1.5 py-0.2 border border-[var(--line)] bg-[var(--paper)]">
                              #{chap.order}.{node.order}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 border border-[var(--line)] bg-[var(--paper)] font-bold">
                              {getLessonTypeLabel(node.lessonType)}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 border border-[var(--line)] bg-[var(--paper)] flex items-center gap-1">
                              <ClockIcon className="w-3 h-3 text-[var(--ink-muted)]" />
                              {node.estimatedMinutes} min
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.2 border border-[var(--line)] bg-[var(--paper)]">
                              +{node.xp} XP
                            </span>
                          </div>

                          {/* 关联教具微标 */}
                          {node.matchedToolName && (
                            <div className="flex items-center gap-1 text-[10px] font-mono text-[var(--ink-muted)]">
                              <ToolIcon className="w-3 h-3" />
                              <span className="truncate max-w-[140px] sm:max-w-[200px]">
                                {node.matchedToolName.split("(")[0].trim()}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* 关卡标题与摘要 */}
                        <div className="flex flex-col gap-1">
                          <h4 className="text-sm font-bold text-[var(--ink)] tracking-tight">
                            {node.title}
                          </h4>
                          <p className="text-xs text-[var(--ink-muted)] font-mono leading-relaxed line-clamp-2">
                            {node.summary}
                          </p>
                        </div>

                        {/* 若锁定，显示前置关卡依赖说明 */}
                        {isLocked && prereqTitles.length > 0 && (
                          <div className="mt-2.5 p-2 border border-dashed border-[var(--line)] bg-[var(--paper)] text-[11px] font-mono text-[var(--ink-muted)] flex items-start gap-1.5">
                            <LockIcon className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                            <div>
                              <span className="font-bold text-[var(--ink)]">
                                {lang === "de" ? "Voraussetzung: " : "解锁依赖: "}
                              </span>
                              {prereqTitles.join(" -> ")}
                            </div>
                          </div>
                        )}

                        {/* 卡片底部操作按钮 */}
                        <div className="mt-3 pt-2.5 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setInspectNode(node)}
                              className="text-xs font-mono px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] transition-colors cursor-pointer"
                            >
                              {lang === "de" ? "Details & Fragen" : "导学剖析"}
                            </button>

                            {/* 本地状态快速打卡/取消切换 */}
                            <button
                              type="button"
                              onClick={(e) => handleToggleCompletion(node.id, e)}
                              className="text-[11px] font-mono px-2 py-1 border border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)] hover:underline cursor-pointer"
                            >
                              {isMastered
                                ? lang === "de"
                                  ? "Zuruecksetzen"
                                  : "重置为未掌握"
                                : lang === "de"
                                ? "Als gemeistert markieren"
                                : "手动标记为掌握"}
                            </button>
                          </div>

                          <div className="flex items-center gap-2">
                            {isAvailable && (
                              <button
                                type="button"
                                onClick={() => onSelectQuest?.(node)}
                                className="text-xs font-mono font-bold px-3 py-1 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1"
                              >
                                <span>{lang === "de" ? "Starten" : "挑战"}</span>
                                <span aria-hidden="true">-&gt;</span>
                              </button>
                            )}

                            {isMastered && (
                              <button
                                type="button"
                                onClick={() => onSelectQuest?.(node)}
                                className="text-xs font-mono px-3 py-1 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <span>{lang === "de" ? "Wiederholen" : "温故复习"}</span>
                                <span aria-hidden="true">-&gt;</span>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* =========================================================================
          INSPECTION MODAL / DRAWER: Socratic Guidance & Key Concepts
          ========================================================================= */}
      {inspectNode && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
          onClick={() => setInspectNode(null)}
        >
          <div
            className="w-full max-w-lg border border-[var(--ink)] bg-[var(--paper)] p-5 sm:p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 模态框顶部 */}
            <div className="flex items-start justify-between gap-3 border-b border-[var(--line)] pb-3">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                    #{inspectNode.id}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] font-bold">
                    {getLessonTypeLabel(inspectNode.lessonType)}
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                    ~{inspectNode.estimatedMinutes} min
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--ink)]">
                  {inspectNode.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectNode(null)}
                aria-label={lang === "de" ? "Schliessen" : "关闭"}
                className="p-1 border border-[var(--line)] hover:border-[var(--ink)] cursor-pointer"
              >
                <CloseIcon className="w-4 h-4 text-[var(--ink)]" />
              </button>
            </div>

            {/* 苏格拉底启发式导学设问 */}
            {inspectNode.socraticPrompt && (
              <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-3 flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--ink)]">
                  <BulbIcon className="w-3.5 h-3.5 text-[var(--ink)]" />
                  <span>
                    {lang === "de"
                      ? "Sokratische Leitfrage"
                      : "苏格拉底导学启发设问"}
                  </span>
                </div>
                <p className="text-xs font-mono text-[var(--ink)] leading-relaxed">
                  {inspectNode.socraticPrompt}
                </p>
              </div>
            )}

            {/* 核心概念与高频考点陷阱 */}
            {inspectNode.keyConcepts && inspectNode.keyConcepts.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--ink-muted)]">
                  {lang === "de" ? "Kernbegriffe & Klausurfallen" : "核心术语与应试陷阱"}
                </div>
                <div className="flex flex-col gap-2">
                  {inspectNode.keyConcepts.map((kc, idx) => (
                    <div
                      key={idx}
                      className="border border-[var(--line)] bg-[var(--paper)] p-2.5 text-xs font-mono flex flex-col gap-1"
                    >
                      <div className="font-bold text-[var(--ink)]">{kc.term}</div>
                      <div className="text-[var(--ink-muted)]">
                        DE: {kc.definitionDE}
                      </div>
                      <div className="text-[var(--ink-muted)]">
                        ZH: {kc.definitionZH}
                      </div>
                      {kc.analogy && (
                        <div className="text-[11px] text-[var(--ink)] mt-1 border-t border-[var(--line)] pt-1">
                          <span className="font-bold">
                            {lang === "de" ? "Intuition: " : "直觉通俗比喻: "}
                          </span>
                          {kc.analogy}
                        </div>
                      )}
                      {kc.examTrap && (
                        <div className="text-[11px] text-[var(--ink)] border-t border-[var(--line)] pt-1">
                          <span className="font-bold">
                            {lang === "de" ? "Fehlerfalle: " : "常见失分陷阱: "}
                          </span>
                          {kc.examTrap}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 匹配教具说明 */}
            {inspectNode.matchedToolName && (
              <div className="border border-[var(--line)] p-2.5 text-xs font-mono flex items-center justify-between">
                <span className="text-[var(--ink-muted)]">
                  {lang === "de" ? "Interaktives Werkzeug: " : "匹配互动仿真教具: "}
                </span>
                <span className="font-bold text-[var(--ink)]">
                  {inspectNode.matchedToolName}
                </span>
              </div>
            )}

            {/* 弹窗底部操作 */}
            <div className="flex items-center justify-end gap-2 border-t border-[var(--line)] pt-3 mt-1">
              <button
                type="button"
                onClick={() => setInspectNode(null)}
                className="text-xs font-mono px-3 py-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] cursor-pointer"
              >
                {lang === "de" ? "Schliessen" : "关闭"}
              </button>
              <button
                type="button"
                onClick={() => {
                  const node = inspectNode;
                  setInspectNode(null);
                  onSelectQuest?.(node);
                }}
                className="text-xs font-mono font-bold px-4 py-1.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 cursor-pointer flex items-center gap-1"
              >
                <span>{lang === "de" ? "Jetzt starten" : "立即进入"}</span>
                <span aria-hidden="true">-&gt;</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
