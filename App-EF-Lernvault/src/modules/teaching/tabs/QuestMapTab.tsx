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
import { teachingStore } from "../engine/teachingStore";

export interface QuestMapTabProps {
  book?: ParsedBookStructure | null;
  plan?: PacingPlan | null;
  currentFach?: string;
  lang?: "de" | "zh";
  completedQuestIds?: string[];
  totalXp?: number;
  streakDays?: number;
  todayCompletedCount?: number;
  onSelectQuest?: (questNode: ParsedQuestNode) => void;
  onStartQuest?: (questNode: ParsedQuestNode) => void;
  onStartTodayQuest?: () => void;
  onGoToWorkshop?: () => void;
  onSubjectChange?: (fach: string) => void;
  onBookChange?: (book: ParsedBookStructure, plan: PacingPlan) => void;
}

type QuestStatus = "mastered" | "available" | "locked";
type FilterMode = "all" | "unmastered" | "mastered";

/* =========================================================================
   Inline Minimalist Tufte Hand-crafted SVG Icons (16x16 / 18x18, stroke)
   Strictly Zero Emojis, Zero Shadows, Zero Italic
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
    strokeWidth="2"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <path d="M3.5 8.5l3 3 6-7" />
  </svg>
);

const PlayIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <polygon points="4,2 14,8 4,14" />
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

const FlameIcon: React.FC<{ className?: string }> = ({ className }) => (
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

const ChestIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    className={className}
    style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
  >
    <rect x="2" y="3" width="12" height="10" rx="1" />
    <line x1="2" y1="6.5" x2="14" y2="6.5" />
    <rect x="6.5" y="5.5" width="3" height="2" />
  </svg>
);

export const QuestMapTab: React.FC<QuestMapTabProps> = ({
  book: initialBook,
  plan: initialPlan,
  currentFach = "SoWi",
  lang = "de",
  completedQuestIds,
  totalXp: propTotalXp,
  streakDays: propStreakDays,
  todayCompletedCount: propTodayCompletedCount,
  onSelectQuest,
  onStartQuest,
  onStartTodayQuest,
  onGoToWorkshop,
  onSubjectChange,
  onBookChange,
}) => {
  // 查找与当前学科匹配的预设索引
  const defaultPresetIndex = useMemo(() => {
    const idx = BOOK_INGEST_PRESETS.findIndex(
      (p) => p.fach.toLowerCase() === currentFach.toLowerCase()
    );
    return idx >= 0 ? idx : 0;
  }, [currentFach]);

  // 本地选中的预设索引：若 initialBook 为 undefined，默认零摩擦自动加载当前学科预设
  const [selectedPresetIndex, setSelectedPresetIndex] = useState<number | null>(() => {
    if (initialBook === undefined) {
      return defaultPresetIndex;
    }
    return null;
  });

  // 当外部学科变化且未传入固定 initialBook 时，同步预设
  useEffect(() => {
    if (initialBook === undefined) {
      setSelectedPresetIndex(defaultPresetIndex);
    }
  }, [currentFach, defaultPresetIndex, initialBook]);

  // 解析并确定当前活跃的教材结构
  const activeBook: ParsedBookStructure | null = useMemo(() => {
    if (initialBook !== undefined) return initialBook;
    if (selectedPresetIndex !== null && BOOK_INGEST_PRESETS[selectedPresetIndex]) {
      const preset = BOOK_INGEST_PRESETS[selectedPresetIndex];
      return parseBookToQuests(preset.title, preset.fach, preset.rawContent);
    }
    return null;
  }, [initialBook, selectedPresetIndex]);

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

  // 进度状态同步：外部传入优先，其次从 teachingStore 订阅读取
  const [storeState, setStoreState] = useState(() => teachingStore.getState());

  useEffect(() => {
    const unsubscribe = teachingStore.subscribe((next) => {
      setStoreState(next);
    });
    return unsubscribe;
  }, []);

  const [completedSet, setCompletedSet] = useState<Set<string>>(() => {
    if (completedQuestIds !== undefined) {
      return new Set(completedQuestIds);
    }
    return new Set(storeState.completedQuestIds);
  });

  useEffect(() => {
    if (completedQuestIds !== undefined) {
      setCompletedSet(new Set(completedQuestIds));
    }
  }, [completedQuestIds]);

  useEffect(() => {
    if (completedQuestIds === undefined) {
      setCompletedSet(new Set(storeState.completedQuestIds));
    }
  }, [completedQuestIds, storeState.completedQuestIds]);

  // 过滤与详情检视弹窗
  const [filterMode, setFilterMode] = useState<FilterMode>("all");
  const [inspectNode, setInspectNode] = useState<ParsedQuestNode | null>(null);

  // 扁平化节点列表
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

  // 节点状态推断
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

  // 本地打卡切换
  const handleToggleCompletion = (questId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    teachingStore.toggleQuestMastered(questId, 35, activeBook?.fach || currentFach);
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

  // 统一的开启研习事件触发器
  const handleStartQuest = (node: ParsedQuestNode) => {
    if (onStartQuest) {
      onStartQuest(node);
    } else if (onStartTodayQuest) {
      onStartTodayQuest();
    } else if (onSelectQuest) {
      onSelectQuest(node);
    }
  };

  // 定位今日优先关卡 (首个可攻坚未掌握节点)
  const todayQuest = useMemo<ParsedQuestNode | null>(() => {
    if (allNodes.length === 0) return null;
    const availableNode = allNodes.find((n) => getQuestStatus(n) === "available");
    if (availableNode) return availableNode;
    const uncompletedNode = allNodes.find((n) => !completedSet.has(n.id));
    return uncompletedNode || null;
  }, [allNodes, completedSet]);

  // 统计指标
  const totalQuests = allNodes.length;
  const masteredCount = useMemo(() => {
    return allNodes.filter((n) => completedSet.has(n.id)).length;
  }, [allNodes, completedSet]);

  const displayStreak = propStreakDays ?? (storeState.streakDays > 0 ? storeState.streakDays : 5);
  const displayTotalXp = propTotalXp ?? (storeState.totalXp > 0 ? storeState.totalXp : 480);
  const displayTodayCompleted = propTodayCompletedCount ?? (masteredCount > 0 ? 1 : storeState.todayCompletedCount);
  const dailyTargetMinutes = activePlan?.targetDailyMinutes || 12;

  const progressPercent = totalQuests > 0 ? Math.round((masteredCount / totalQuests) * 100) : 0;

  // 预设切换处理
  const handlePresetSelect = (idxStr: string) => {
    const idx = parseInt(idxStr, 10);
    if (!isNaN(idx) && BOOK_INGEST_PRESETS[idx]) {
      setSelectedPresetIndex(idx);
      const preset = BOOK_INGEST_PRESETS[idx];
      const parsed = parseBookToQuests(preset.title, preset.fach, preset.rawContent);
      const plan = generatePacingPlan(parsed, {
        mode: "balanced",
        customDailyMinutes: 12,
        includeSpacedRepetition: true,
      });
      if (onSubjectChange) onSubjectChange(preset.fach);
      if (onBookChange) onBookChange(parsed, plan);
    }
  };

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

  // 兜底空状态：若明确传入 null 且无选定预设
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
                : "关卡探索河流将教材大纲解构为类似 Duolingo 的 RPG 渐进式闯关流，附带 DAG 前置依赖校验、每日 12 分钟无痛负荷与经验值结算。"}
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
                  onClick={() => handlePresetSelect(String(idx))}
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
          TOP SCHOLARLY HUD: ZERO FRICTION DUAL CONTROL & GAMIFICATION METRICS
          ========================================================================= */}
      <header className="border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-5 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* 左侧：学科/教材下拉选择器 */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <CompassIcon className="w-5 h-5 text-[var(--ink)]" />
              <div>
                <h2 className="text-sm sm:text-base font-bold tracking-tight text-[var(--ink)]">
                  {lang === "de" ? "Quest-Landkarte" : "关卡探索图谱"}
                </h2>
                <div className="text-xs font-bold text-[var(--ink-muted)] font-mono">
                  {activeBook.title}
                </div>
              </div>
            </div>

            {/* 学科/课本快捷切换下拉 */}
            <div className="flex items-center gap-1.5 ml-0 sm:ml-2">
              <span className="text-[11px] font-mono text-[var(--ink-muted)] hidden sm:inline">
                {lang === "de" ? "Kurs:" : "课程:"}
              </span>
              <select
                aria-label={lang === "de" ? "Kurs oder Lehrwerk waehlen" : "选择课程或课纲"}
                value={
                  selectedPresetIndex !== null
                    ? String(selectedPresetIndex)
                    : "custom"
                }
                onChange={(e) => {
                  if (e.target.value === "custom") return;
                  handlePresetSelect(e.target.value);
                }}
                className="font-mono text-xs px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] cursor-pointer focus:outline-none focus:border-[var(--ink)]"
              >
                {initialBook && (
                  <option value="custom">
                    {initialBook.fach}: {initialBook.title}
                  </option>
                )}
                {BOOK_INGEST_PRESETS.map((p, idx) => (
                  <option key={p.id} value={String(idx)}>
                    {p.fach}: {p.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 右侧微量规：Streak, XP, Tagesziel & [+ Neues Buch zerlegen] 快捷抽屉按钮 */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            {/* Streak 徽章 */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)]"
              title={lang === "de" ? "Taegliche Lernserie" : "连续学习天数"}
            >
              <FlameIcon className="w-3.5 h-3.5 text-[var(--ink)]" />
              <span>
                {lang === "de" ? `Streak: ${displayStreak} Tage` : `连续 ${displayStreak} 天`}
              </span>
            </div>

            {/* Total XP 徽章 */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold"
              title={lang === "de" ? "Gesamte Erfahrungspunkte" : "总研习经验值"}
            >
              <StarIcon className="w-3.5 h-3.5 text-[var(--paper)]" />
              <span>{displayTotalXp} XP</span>
            </div>

            {/* 今日 12-Min Target Pill */}
            <div
              className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)]"
              title={lang === "de" ? "Heutiges Lernzeitbudget" : "今日微专注目标"}
            >
              <ClockIcon className="w-3.5 h-3.5 text-[var(--ink)]" />
              <span>
                {lang === "de"
                  ? `~${dailyTargetMinutes} min / Tag · ${displayTodayCompleted}/1 abgeschlossen`
                  : `~${dailyTargetMinutes} 分钟 / 日 · ${displayTodayCompleted}/1 完成`}
              </span>
            </div>

            {/* [+ Neues Buch zerlegen] 快捷按钮 */}
            {onGoToWorkshop && (
              <button
                type="button"
                onClick={onGoToWorkshop}
                className="flex items-center gap-1 px-3 py-1 border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] transition-colors text-xs font-mono font-bold cursor-pointer ml-1"
              >
                <span>{lang === "de" ? "+ Neues Buch zerlegen" : "+ 拆解新书"}</span>
              </button>
            )}
          </div>
        </div>

        {/* 课本总体完成度细线进度条 */}
        <div className="flex items-center gap-3 pt-1">
          <div className="flex-1 bg-[var(--paper-subtle)] border border-[var(--line)] h-2 overflow-hidden">
            <div
              className="bg-[var(--ink)] h-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-[var(--ink-muted)] shrink-0">
            {masteredCount} / {totalQuests} {lang === "de" ? "gemeistert" : "已掌握"} ({progressPercent}%)
          </span>
        </div>
      </header>

      {/* =========================================================================
          HERO FOCUS CARD: Heutige Mission / Today's Priority Quest Node
          ========================================================================= */}
      {todayQuest ? (
        <section className="border-2 border-[var(--ink)] bg-[var(--paper)] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col gap-2 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] uppercase font-bold">
                {lang === "de" ? "Heutige Mission" : "今日聚焦任务"}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                {getLessonTypeLabel(todayQuest.lessonType)}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] flex items-center gap-1">
                <ClockIcon className="w-3 h-3 text-[var(--ink-muted)]" />
                ~{todayQuest.estimatedMinutes} min / {lang === "de" ? "Tag" : "日"}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                +{todayQuest.xp} XP
              </span>
              {todayQuest.matchedToolName && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] flex items-center gap-1">
                  <ToolIcon className="w-3 h-3 text-[var(--ink-muted)]" />
                  {todayQuest.matchedToolName.split("(")[0].trim()}
                </span>
              )}
            </div>

            <div className="text-base font-bold text-[var(--ink)] tracking-tight">
              {todayQuest.title}
            </div>

            <p className="text-xs text-[var(--ink-muted)] font-mono leading-relaxed line-clamp-2">
              {todayQuest.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setInspectNode(todayQuest)}
              className="text-xs font-mono px-3 py-2 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              {lang === "de" ? "Vorschau" : "前置导学"}
            </button>

            <button
              type="button"
              onClick={() => handleStartQuest(todayQuest)}
              className="text-xs font-mono font-bold px-4 py-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
            >
              <span>
                {lang === "de"
                  ? `Lektion starten (${todayQuest.estimatedMinutes} min)`
                  : `开启今日研习 (${todayQuest.estimatedMinutes} 分钟)`}
              </span>
              <span aria-hidden="true">-&gt;</span>
            </button>
          </div>
        </section>
      ) : (
        <section className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 text-center">
          <span className="text-xs font-mono font-bold text-[var(--ink)]">
            {lang === "de"
              ? "Alle Quests meisterhaft absolviert! (100% gemeistert)"
              : "全书关卡已圆满通关！(100% 达成)"}
          </span>
        </section>
      )}

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
                className={`px-2.5 py-0.5 border transition-colors cursor-pointer ${
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
          DUOLINGO-STYLE VERTICAL QUEST RIVER (UNITS & CIRCULAR BADGE NODES)
          ========================================================================= */}
      <div className="flex flex-col gap-10">
        {activeBook.chapters.map((chap) => {
          const chapMastered = chap.nodes.filter((n) => completedSet.has(n.id)).length;
          const chapTotal = chap.nodes.length;
          const chapPercent = chapTotal > 0 ? Math.round((chapMastered / chapTotal) * 100) : 0;
          const isUnitFullyMastered = chapMastered === chapTotal && chapTotal > 0;

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
              className="border border-[var(--line)] bg-[var(--paper)] flex flex-col"
            >
              {/* DISTINCT UNIT BANNER (Duolingo-style Unit Section Header) */}
              <div className="border-b border-[var(--line)] bg-[var(--paper-subtle)] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold uppercase">
                      {lang === "de" ? `Unit ${chap.order}` : `第 ${chap.order} 单元`}
                    </span>
                    <h3 className="text-base font-bold tracking-tight text-[var(--ink)]">
                      {chap.title}
                    </h3>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--ink-muted)]">
                    {chapTotal} {lang === "de" ? "Quests" : "个关卡"} · ~{chap.totalMinutes} min {lang === "de" ? "Lernaufwand" : "总学时"}
                  </div>
                </div>

                {/* 单元完成度 Badge & 微进度条 */}
                <div className="flex items-center gap-3">
                  <div className="w-24 sm:w-32 bg-[var(--paper)] border border-[var(--line)] h-2 overflow-hidden">
                    <div
                      className="bg-[var(--ink)] h-full transition-all duration-300"
                      style={{ width: `${chapPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] font-bold">
                    {chapMastered}/{chapTotal} {lang === "de" ? "gemeistert" : "已掌握"}
                  </span>
                </div>
              </div>

              {/* DUOLINGO VERTICAL RIVER CANVAS */}
              <div className="p-4 sm:p-8 flex flex-col gap-6 relative">
                {/* 纵贯单元的主轴引导演示线 */}
                <div
                  className="absolute left-7 sm:left-10 top-6 bottom-6 w-0.5 bg-[var(--line)] pointer-events-none"
                  aria-hidden="true"
                />

                {/* 关卡圆点列表 */}
                {filteredNodes.map((node) => {
                  const status = getQuestStatus(node);
                  const isMastered = status === "mastered";
                  const isAvailable = status === "available";
                  const isLocked = status === "locked";

                  const prereqTitles = (node.prerequisites || [])
                    .map((pid) => nodeMap.get(pid)?.title)
                    .filter(Boolean) as string[];

                  return (
                    <div
                      key={node.id}
                      className="relative flex items-start gap-4 sm:gap-6 z-10"
                    >
                      {/* DUOLINGO-STYLE CIRCULAR BADGE NODE */}
                      <div className="shrink-0 pt-1">
                        {isMastered && (
                          <button
                            type="button"
                            onClick={() => handleStartQuest(node)}
                            title={lang === "de" ? "Gemeistert · Klicken zum Wiederholen" : "已掌握 · 点击复习"}
                            className="w-12 h-12 rounded-full border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
                          >
                            <CheckIcon className="w-5 h-5 text-[var(--paper)]" />
                          </button>
                        )}

                        {isAvailable && (
                          <button
                            type="button"
                            onClick={() => handleStartQuest(node)}
                            title={lang === "de" ? "Aktuell verfuegbar · Jetzt starten" : "当前可挑战 · 立即进入"}
                            className="w-12 h-12 rounded-full border-4 border-double border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] flex items-center justify-center cursor-pointer animate-pulse transition-transform hover:scale-105"
                          >
                            <PlayIcon className="w-4 h-4 text-[var(--ink)] ml-0.5" />
                          </button>
                        )}

                        {isLocked && (
                          <div
                            title={
                              prereqTitles.length > 0
                                ? `${lang === "de" ? "Gesperrt · Voraussetzung: " : "已锁定 · 需先通关: "}${prereqTitles.join(", ")}`
                                : lang === "de" ? "Gesperrt" : "已锁定"
                            }
                            className="w-12 h-12 rounded-full border-2 border-dashed border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)] flex items-center justify-center cursor-not-allowed"
                          >
                            <LockIcon className="w-4 h-4 text-[var(--ink-muted)]" />
                          </div>
                        )}
                      </div>

                      {/* 关卡详情卡片 */}
                      <div
                        className={`flex-1 border p-3.5 sm:p-4 transition-colors ${
                          isAvailable
                            ? "border-2 border-[var(--ink)] bg-[var(--paper)]"
                            : isMastered
                            ? "border-[var(--line)] bg-[var(--paper-subtle)]"
                            : "border-dashed border-[var(--line)] bg-[var(--paper-subtle)] opacity-75"
                        }`}
                      >
                        {/* 头部元数据 */}
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

                        {/* 若锁定，显示前置关卡依赖提示 */}
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
                                onClick={() => handleStartQuest(node)}
                                className="text-xs font-mono font-bold px-3 py-1 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1"
                              >
                                <span>{lang === "de" ? "Starten" : "挑战"}</span>
                                <span aria-hidden="true">-&gt;</span>
                              </button>
                            )}

                            {isMastered && (
                              <button
                                type="button"
                                onClick={() => handleStartQuest(node)}
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

                {/* MILESTONE UNIT CHEST (Unit Capstone Exam Badge at River End) */}
                <div className="relative flex items-center gap-4 sm:gap-6 z-10 pt-2 border-t border-[var(--line)]">
                  <div className="shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
                        isUnitFullyMastered
                          ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                          : "border-dashed border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)]"
                      }`}
                      title={
                        isUnitFullyMastered
                          ? lang === "de"
                            ? "Unit-Meilenstein freigeschaltet! Klausur-Check bereit"
                            : "单元结业宝箱已解锁！综合测验就绪"
                          : lang === "de"
                          ? "Unit-Meilenstein gesperrt · Erst alle Quests abschliessen"
                          : "单元结业宝箱未解锁 · 需先通关本单元全部关卡"
                      }
                    >
                      <ChestIcon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border border-[var(--line)] p-3 bg-[var(--paper-subtle)]">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-1.5 py-0.2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold uppercase">
                          {lang === "de" ? "Meilenstein" : "单元宝箱"}
                        </span>
                        <span className="text-xs font-bold text-[var(--ink)]">
                          {chap.title} · {lang === "de" ? "Klausur-Check" : "阶段结业考"}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-[var(--ink-muted)] mt-0.5">
                        {isUnitFullyMastered
                          ? lang === "de"
                            ? "+50 XP Meilenstein-Bonus freigeschaltet!"
                            : "+50 XP 单元里程碑积分已结算！"
                          : lang === "de"
                          ? `Noch ${chapTotal - chapMastered} Quests bis zum Meilenstein`
                          : `还需通关 ${chapTotal - chapMastered} 个关卡`}
                      </span>
                    </div>

                    <div className="text-xs font-mono">
                      {isUnitFullyMastered ? (
                        <span className="px-2.5 py-1 border border-[var(--ink)] bg-[var(--paper)] font-bold text-[var(--ink)]">
                          {lang === "de" ? "Gekonnt" : "已圆满达成"}
                        </span>
                      ) : (
                        <span className="text-[var(--ink-muted)] border border-dashed border-[var(--line)] px-2 py-0.5">
                          {lang === "de" ? "Gesperrt" : "待解锁"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
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

            {/* 关卡研习架构：新知精讲 -> 动手实验 -> 考场冲刺 */}
            <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5 text-xs font-mono flex flex-col gap-1.5">
              <div className="font-bold text-[10px] uppercase text-[var(--ink-muted)]">
                [ {lang === "de" ? "Didaktischer Ablauf" : "关卡研习流程架构"} ]
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--ink)] flex-wrap">
                <span className="px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--paper)] font-bold">
                  1. {lang === "de" ? "Theorie & Konzept" : "新知精讲微课"}
                </span>
                <span className="text-[var(--ink-muted)]" aria-hidden="true">-&gt;</span>
                <span className="px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--paper)] font-bold">
                  2. {lang === "de" ? "Labor-Experiment" : "动手实验微世界"}
                </span>
                <span className="text-[var(--ink-muted)]" aria-hidden="true">-&gt;</span>
                <span className="px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--paper)] font-bold">
                  3. {lang === "de" ? "Klausur-Challenge" : "考场通关挑战"}
                </span>
              </div>
            </div>

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
                  handleStartQuest(node);
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
