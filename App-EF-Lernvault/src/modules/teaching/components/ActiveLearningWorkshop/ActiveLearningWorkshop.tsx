import React, { useState, useMemo, useEffect, useCallback } from "react";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";
import { distillConcept, type DistilledConcept } from "../../engine/conceptDistiller";
import {
  WORKSHOP_PHASES,
  type WorkshopPhase,
  type WorkshopQuizResult,
  type WorkshopSummary,
} from "./types";
import { PhaseLectureView } from "./PhaseLectureView";
import { PhaseLaborView } from "./PhaseLaborView";
import { PhaseNotesView } from "./PhaseNotesView";
import { PhaseQuizView } from "./PhaseQuizView";
import { PhaseMasteryView } from "./PhaseMasteryView";

export interface ActiveLearningWorkshopProps {
  currentFach?: string;
  topicTitle?: string;
  questNode?: ParsedQuestNode | null;
  lang?: "de" | "zh";
  onSubjectChange?: (fach: string) => void;
  onTopicChange?: (topicTitle: string) => void;
  onCompleteWorkshop?: (summary: WorkshopSummary) => void;
  onNextTopic?: () => void;
  onNavigateToTab?: (tab: string, opts?: Record<string, unknown>) => void;
}

// 缺省预置学科与主题目录（杜绝任何白屏空状态）
const TOPIC_PRESETS_BY_FACH: Record<string, string[]> = {
  SoWi: [
    "Modell des vollkommenen Marktes (Angebot & Nachfrage)",
    "Wahlsystem & Bundestagswahl (Erst- vs. Zweitstimme)",
    "Magisches Viereck & Wirtschaftspolitische Zielbeziehungen",
    "Soziale Ungleichheit & Wohlfahrtsmodelle",
  ],
  Deutsch: [
    "Sachtextanalyse & Rhetorische Leserlenkung",
    "Dramenanalyse & Kommunikationsmodelle (Schulz von Thun)",
    "Epische Texte: Erzählperspektiven & Figurenkonstellation",
  ],
  Philosophie: [
    "Utilitarismus (Bentham/Mill) vs. Deontologie (Kant)",
    "Rawls Theorie der Gerechtigkeit (Schleier des Nichtwissens)",
    "Willensfreiheit & Libet-Experiment",
  ],
  Physik: [
    "Gleichförmige & gleichmäßig beschleunigte Bewegung (Kinematik)",
    "Energieerhaltung & Potentielle/Kinetische Energie",
    "Optische Brechung & Snellius-Brechungsgesetz",
  ],
  Mathe: [
    "Kurvendiskussion & Extremwertprobleme",
    "Integralrechnung & Rotationskörper",
    "Stochastik: Bedingte Wahrscheinlichkeit & Bayes-Satz",
  ],
};

export const ActiveLearningWorkshop: React.FC<ActiveLearningWorkshopProps> = ({
  currentFach = "SoWi",
  topicTitle: externalTopicTitle,
  questNode: externalQuestNode,
  lang = "de",
  onSubjectChange,
  onTopicChange,
  onCompleteWorkshop,
  onNextTopic,
  onNavigateToTab,
}) => {
  // 当前学科
  const [internalFach, setInternalFach] = useState(currentFach);
  const effectiveFach = currentFach || internalFach;

  // 当前课题标题
  const availableTopics = TOPIC_PRESETS_BY_FACH[effectiveFach] || TOPIC_PRESETS_BY_FACH.SoWi;
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);

  const effectiveTopicTitle =
    externalTopicTitle ||
    externalQuestNode?.title ||
    availableTopics[selectedTopicIndex] ||
    availableTopics[0];

  // 当前研学阶段 (1 ~ 5)
  const [currentPhase, setCurrentPhase] = useState<WorkshopPhase>("lecture");
  const [completedPhases, setCompletedPhases] = useState<Set<WorkshopPhase>>(new Set());

  // 累积积分与测试成果
  const [accumulatedXp, setAccumulatedXp] = useState(0);
  const [lastQuizResult, setLastQuizResult] = useState<WorkshopQuizResult | null>(null);

  // 当外部学科或课题变化时重置/适应
  useEffect(() => {
    setSelectedTopicIndex(0);
  }, [effectiveFach]);

  // 第一性原理概念知识萃取（确定性纯函数，绝无白屏）
  const concept = useMemo<DistilledConcept>(() => {
    return distillConcept(effectiveTopicTitle, effectiveFach);
  }, [effectiveTopicTitle, effectiveFach]);

  // 阶段推进索引映射
  const currentPhaseIndex = WORKSHOP_PHASES.findIndex((p) => p.id === currentPhase);

  // 键盘快捷键流转支持 (1-5 切换阶段, Alt+Left / Alt+Right 步进)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 避免在输入框中触发快捷键
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === "input" || targetTag === "textarea" || targetTag === "select") {
        return;
      }

      // 数字键 1-5 快速跳转阶段
      if (e.key >= "1" && e.key <= "5" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const targetPhase = WORKSHOP_PHASES[parseInt(e.key, 10) - 1];
        if (targetPhase) {
          setCurrentPhase(targetPhase.id);
        }
      }

      // Alt + Left 箭头后退
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        if (currentPhaseIndex > 0) {
          setCurrentPhase(WORKSHOP_PHASES[currentPhaseIndex - 1].id);
        }
      }

      // Alt + Right 箭头前进
      if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        if (currentPhaseIndex < WORKSHOP_PHASES.length - 1) {
          setCurrentPhase(WORKSHOP_PHASES[currentPhaseIndex + 1].id);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPhaseIndex]);

  // 切换阶段并登记已完成状态
  const goToPhase = useCallback((phase: WorkshopPhase) => {
    setCurrentPhase(phase);
  }, []);

  const handleAdvanceFromLecture = () => {
    setCompletedPhases((prev) => new Set(prev).add("lecture"));
    setAccumulatedXp((prev) => prev + 25);
    setCurrentPhase("labor");
  };

  const handleAdvanceFromLabor = () => {
    setCompletedPhases((prev) => new Set(prev).add("labor"));
    setAccumulatedXp((prev) => prev + 35);
    setCurrentPhase("notes");
  };

  const handleAdvanceFromNotes = () => {
    setCompletedPhases((prev) => new Set(prev).add("notes"));
    setAccumulatedXp((prev) => prev + 20);
    setCurrentPhase("quiz");
  };

  const handleQuizFinish = (result: WorkshopQuizResult) => {
    setLastQuizResult(result);
    setCompletedPhases((prev) => new Set(prev).add("quiz"));
    setAccumulatedXp((prev) => prev + result.score);
    if (onCompleteWorkshop) {
      onCompleteWorkshop({
        topicTitle: effectiveTopicTitle,
        fach: effectiveFach,
        earnedXp: accumulatedXp + result.score,
        quizResult: result,
        radarData: {
          konzeptScore: 0.9,
          laborScore: 0.95,
          notizScore: 0.9,
          operatorScore: 0.85,
          urteilScore: 0.85,
        },
        completedPhases: ["lecture", "labor", "notes", "quiz"],
        completedAt: new Date().toISOString(),
      });
    }
  };

  const handleAdvanceFromQuiz = () => {
    setCompletedPhases((prev) => new Set(prev).add("quiz"));
    setCurrentPhase("mastery");
  };

  const handleRestartWorkshop = () => {
    setCurrentPhase("lecture");
  };

  const handleNextTopicAction = () => {
    if (onNextTopic) {
      onNextTopic();
      return;
    }
    // 内部轮换到下一个预置课题
    const nextIdx = (selectedTopicIndex + 1) % availableTopics.length;
    setSelectedTopicIndex(nextIdx);
    setCurrentPhase("lecture");
    setCompletedPhases(new Set());
    if (onTopicChange) {
      onTopicChange(availableTopics[nextIdx]);
    }
  };

  const handleSubjectChangeInternal = (newFach: string) => {
    setInternalFach(newFach);
    setSelectedTopicIndex(0);
    setCurrentPhase("lecture");
    setCompletedPhases(new Set());
    if (onSubjectChange) {
      onSubjectChange(newFach);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[var(--paper)] text-[var(--ink)]">
      {/* 顶部主工作台控制头：课题信息、学科选择、闭环进度轨 */}
      <header className="border-b border-[var(--line)] px-4 sm:px-6 py-3 bg-[var(--paper)] shrink-0 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
                <circle cx="8" cy="8" r="6" />
                <path d="M8 2v6l4 2" />
              </svg>
              <h1 className="text-base font-bold tracking-tight">
                {lang === "de"
                  ? "Active Learning Workshop · Dynamischer Lernzyklus"
                  : "动态研学闭环核心工作台"}
              </h1>
            </div>

            {/* 学科选择下拉框 */}
            <select
              value={effectiveFach}
              onChange={(e) => handleSubjectChangeInternal(e.target.value)}
              aria-label={lang === "de" ? "Fach wählen" : "选择研习学科"}
              className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] focus:outline-none cursor-pointer"
            >
              {["SoWi", "Deutsch", "Philosophie", "Physik", "Mathe"].map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            {/* 课题切换下拉框 */}
            <select
              value={selectedTopicIndex}
              onChange={(e) => {
                const idx = parseInt(e.target.value, 10);
                setSelectedTopicIndex(idx);
                setCurrentPhase("lecture");
                if (onTopicChange) onTopicChange(availableTopics[idx]);
              }}
              aria-label={lang === "de" ? "Thema wählen" : "选择研习课题"}
              className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] focus:outline-none cursor-pointer max-w-[200px] truncate"
            >
              {availableTopics.map((top, idx) => (
                <option key={idx} value={idx}>
                  {top}
                </option>
              ))}
            </select>
          </div>

          {/* 右侧 XP 积分与快捷键提示 */}
          <div className="flex items-center gap-3 font-mono text-xs">
            <span className="text-[var(--ink-muted)] hidden md:inline">
              [1-5] {lang === "de" ? "Phase springen" : "阶段跳转"}
            </span>
            <span className="px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] font-bold text-[var(--ink)]">
              +{accumulatedXp} XP
            </span>
          </div>
        </div>

        {/* 动态研学闭环 5 步进度轨 (①新知课程 -> ②交互实验 -> ③笔记提炼 -> ④闯关自测 -> ⑤闭环达标) */}
        <nav
          aria-label={lang === "de" ? "Lernzyklus Fortschritt" : "研习闭环进度轨"}
          className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 pt-1"
        >
          {WORKSHOP_PHASES.map((phase) => {
            const isActive = currentPhase === phase.id;
            const isCompleted = completedPhases.has(phase.id);

            return (
              <button
                key={phase.id}
                type="button"
                onClick={() => goToPhase(phase.id)}
                className={`p-2 border text-left transition-colors cursor-pointer flex flex-col gap-0.5 ${
                  isActive
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold"
                    : isCompleted
                    ? "border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                    : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink-muted)] hover:border-[var(--ink)]"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span>
                    {lang === "de" ? phase.shortLabelDE : phase.shortLabelZH}
                  </span>
                  <span>
                    {isCompleted ? "[[OK]]" : isActive ? "[●]" : "[ ]"}
                  </span>
                </div>
                <div className="text-xs truncate font-medium">
                  {lang === "de" ? phase.titleDE.split(": ")[1] : phase.titleZH.split(" · ")[1]}
                </div>
              </button>
            );
          })}
        </nav>
      </header>

      {/* 中部核心阶段研学工作区 */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6">
        {currentPhase === "lecture" && (
          <PhaseLectureView
            concept={concept}
            questNode={externalQuestNode}
            fach={effectiveFach}
            lang={lang}
            onAdvance={handleAdvanceFromLecture}
          />
        )}

        {currentPhase === "labor" && (
          <PhaseLaborView
            concept={concept}
            questNode={externalQuestNode}
            fach={effectiveFach}
            lang={lang}
            onAdvance={handleAdvanceFromLabor}
          />
        )}

        {currentPhase === "notes" && (
          <PhaseNotesView
            concept={concept}
            questNode={externalQuestNode}
            fach={effectiveFach}
            lang={lang}
            onAdvance={handleAdvanceFromNotes}
          />
        )}

        {currentPhase === "quiz" && (
          <PhaseQuizView
            concept={concept}
            questNode={externalQuestNode}
            fach={effectiveFach}
            lang={lang}
            onQuizFinish={handleQuizFinish}
            onAdvance={handleAdvanceFromQuiz}
          />
        )}

        {currentPhase === "mastery" && (
          <PhaseMasteryView
            concept={concept}
            fach={effectiveFach}
            earnedXp={accumulatedXp}
            quizResult={lastQuizResult || undefined}
            lang={lang}
            onRestartWorkshop={handleRestartWorkshop}
            onNextTopic={handleNextTopicAction}
            onBackToMap={() => {
              if (onNavigateToTab) {
                onNavigateToTab("map");
              }
            }}
          />
        )}
      </main>

      {/* 底部全局控制栏：前后步流转与阶段定位 */}
      <footer className="border-t border-[var(--line)] px-4 sm:px-6 py-2.5 bg-[var(--paper-subtle)] flex items-center justify-between text-xs font-mono shrink-0">
        <button
          type="button"
          disabled={currentPhaseIndex === 0}
          onClick={() => goToPhase(WORKSHOP_PHASES[currentPhaseIndex - 1].id)}
          className="px-3 py-1 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1.5"
        >
          <span aria-hidden="true">{"<-"}</span>
          <span>{lang === "de" ? "Vorherige Phase" : "上一阶段"}</span>
        </button>

        <span className="text-[var(--ink-muted)]">
          {lang === "de"
            ? `Phase ${currentPhaseIndex + 1} von ${WORKSHOP_PHASES.length}`
            : `第 ${currentPhaseIndex + 1} 步 / 共 ${WORKSHOP_PHASES.length} 阶段`}
        </span>

        <button
          type="button"
          disabled={currentPhaseIndex === WORKSHOP_PHASES.length - 1}
          onClick={() => goToPhase(WORKSHOP_PHASES[currentPhaseIndex + 1].id)}
          className="px-3 py-1 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-1.5 font-bold"
        >
          <span>{lang === "de" ? "Nächste Phase" : "下一阶段"}</span>
          <span aria-hidden="true">{"->"}</span>
        </button>
      </footer>
    </div>
  );
};
