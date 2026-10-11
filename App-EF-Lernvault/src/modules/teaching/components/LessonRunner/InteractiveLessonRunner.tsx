import React, { useState, useMemo, useEffect } from "react";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";
import {
  compileLessonSteps,
  type LessonStep,
  type LessonOption,
} from "../../engine/lessonStepFlow";
import { VictoryRewardScreen } from "./VictoryRewardScreen";
import {
  VariableSliderBox,
  DilemmaBalanceScale,
  LogicBlockBuilder,
  ScenarioDecisionTree,
  KonzeptPuzzle,
  MarktgleichgewichtSim,
  MARKT_SCENARIOS,
  resolveMarktScenarioId,
  resolveLogicArchetype,
  resolveDecisionScenarioId,
} from "../GenericMicroWorlds";
import { KinematikSim } from "../../../../components/pedagogy/KinematikSim";
import { MagischesViereckSim } from "../../../../components/pedagogy/MagischesViereckSim";
import FormulaScaffold from "../../../../components/pedagogy/FormulaScaffold";

export interface InteractiveLessonRunnerProps {
  questNode: ParsedQuestNode;
  fach?: string;
  currentFach?: string;
  lang?: "de" | "zh";
  isOpen?: boolean;
  currentStreak?: number;
  onComplete: (questId: string, earnedXp: number, mistakes?: string[]) => void;
  onClose: () => void;
}

export const InteractiveLessonRunner: React.FC<InteractiveLessonRunnerProps> = ({
  questNode,
  fach,
  currentFach,
  lang = "de",
  isOpen = true,
  currentStreak = 1,
  onComplete,
  onClose,
}) => {
  const effectiveFach = currentFach || fach || "SoWi";

  // 编译生成前置新知课+动手实验+后置考场挑战的递进课步
  const { distilled, steps } = useMemo(() => {
    return compileLessonSteps(questNode, effectiveFach);
  }, [questNode, effectiveFach]);

  const sessionKey = `lernvault_session_${questNode.id}`;

  const [currentStepIndex, setCurrentStepIndex] = useState<number>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(sessionKey);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (
            typeof parsed.stepIndex === "number" &&
            parsed.stepIndex < steps.length
          ) {
            return parsed.stepIndex;
          }
        }
      } catch {
        // ignore
      }
    }
    return 0;
  });

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeFeedback, setActiveFeedback] = useState<string | null>(null);

  // 连击与奖赏状态
  const [comboCount, setComboCount] = useState<number>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(sessionKey);
        if (raw) return JSON.parse(raw).comboCount || 0;
      } catch {
        // ignore
      }
    }
    return 0;
  });
  const [accumulatedXp, setAccumulatedXp] = useState<number>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(sessionKey);
        if (raw) return JSON.parse(raw).accumulatedXp || 0;
      } catch {
        // ignore
      }
    }
    return 0;
  });
  const [mistakes, setMistakes] = useState<string[]>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(sessionKey);
        if (raw) return JSON.parse(raw).mistakes || [];
      } catch {
        // ignore
      }
    }
    return [];
  });
  const [isFinished, setIsFinished] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showNoteDrawer, setShowNoteDrawer] = useState(false);
  const [copiedNote, setCopiedNote] = useState(false);
  const [selectedIntuitionChoice, setSelectedIntuitionChoice] = useState<
    "A" | "B" | null
  >(null);
  const [isMicroWorldCompleted, setIsMicroWorldCompleted] = useState<boolean>(false);
  const [isPuzzleCompleted, setIsPuzzleCompleted] = useState<boolean>(false);
  const [completedStepIndices, setCompletedStepIndices] = useState<Set<number>>(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        const raw = window.localStorage.getItem(sessionKey);
        if (raw) {
          const arr = JSON.parse(raw).completedStepIndices;
          if (Array.isArray(arr)) return new Set(arr.filter((n) => typeof n === "number"));
        }
      } catch {
        // ignore
      }
    }
    return new Set();
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        if (!isFinished && currentStepIndex > 0) {
          window.localStorage.setItem(
            sessionKey,
            JSON.stringify({
              stepIndex: currentStepIndex,
              comboCount,
              accumulatedXp,
              mistakes,
              completedStepIndices: Array.from(completedStepIndices),
            })
          );
        } else if (isFinished) {
          window.localStorage.removeItem(sessionKey);
        }
      } catch {
        // ignore
      }
    }
  }, [
    currentStepIndex,
    comboCount,
    accumulatedXp,
    mistakes,
    completedStepIndices,
    isFinished,
    sessionKey,
  ]);

  const currentStep: LessonStep = steps[currentStepIndex] || steps[0];
  const progressPercent = Math.round((currentStepIndex / steps.length) * 100);

  const isMicroWorldGated =
    currentStep.type === "microworld" && questNode.interactiveType === "markt-sim";

  // 市场仿真情境选路：同一 markt-sim 引擎按课程主题挂载不同使命（默认寒潮供给冲击，社会市场经济主题走能源冲击与社会补偿）
  const marktScenarioId = resolveMarktScenarioId(questNode.title, questNode.summary);
  const marktScenario = MARKT_SCENARIOS[marktScenarioId];

  // 选项选择与核验
  const handleSelectOption = (option: LessonOption) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(option.id);
  };

  // Phase 1 Step 1: 新知精讲微课学习完毕，推进到 Step 2 动手实验
  // A2 Gentle gating: lecture 步未直觉站队时不推进、不扣 XP（仅门控 lecture，microworld/challenge 不动）
  const handleAdvanceLecture = () => {
    if (currentStep.type === "lecture" && selectedIntuitionChoice === null) return;
    setSelectedIntuitionChoice(null);
    setIsMicroWorldCompleted(false);
    if (!completedStepIndices.has(currentStepIndex)) {
      setCompletedStepIndices((prev) => new Set(prev).add(currentStepIndex));
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
    }
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setActiveFeedback(null);
    } else {
      setIsFinished(true);
      onComplete(questNode.id, accumulatedXp + currentStep.xpReward, mistakes);
    }
  };

  // Phase 1 Step 2: 动手探究实验完成，进入后续阶段 (拼图或考场挑战)
  const handleAdvanceMicroWorld = () => {
    if (isMicroWorldGated && !isMicroWorldCompleted) return;
    setSelectedIntuitionChoice(null);
    setComboCount((prev) => Math.max(1, prev + 1));
    if (!completedStepIndices.has(currentStepIndex)) {
      setCompletedStepIndices((prev) => new Set(prev).add(currentStepIndex));
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
    }
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setActiveFeedback(null);
    } else {
      setIsFinished(true);
      onComplete(questNode.id, accumulatedXp + currentStep.xpReward, mistakes);
    }
  };

  // Phase 1 Step 3: 四大假设拼图完成，推进到 Phase 2 考场挑战
  const handleAdvancePuzzle = () => {
    if (!isPuzzleCompleted) return;
    setComboCount((prev) => Math.max(1, prev + 1));
    if (!completedStepIndices.has(currentStepIndex)) {
      setCompletedStepIndices((prev) => new Set(prev).add(currentStepIndex));
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
    }
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setActiveFeedback(null);
    } else {
      setIsFinished(true);
      onComplete(questNode.id, accumulatedXp + currentStep.xpReward, mistakes);
    }
  };

  // Phase 2: 挑战答题核验
  const handleCheckAnswer = () => {
    if (currentStep.type === "lecture") {
      handleAdvanceLecture();
      return;
    }
    if (currentStep.type === "microworld") {
      handleAdvanceMicroWorld();
      return;
    }
    if (currentStep.type === "puzzle") {
      handleAdvancePuzzle();
      return;
    }

    if (!selectedOptionId) return;

    const selectedOpt = currentStep.options?.find((o) => o.id === selectedOptionId);
    if (!selectedOpt) return;

    setIsAnswerChecked(true);
    if (selectedOpt.isCorrect) {
      setIsCorrect(true);
      setComboCount((prev) => prev + 1);
      if (!completedStepIndices.has(currentStepIndex)) {
        setCompletedStepIndices((prev) => new Set(prev).add(currentStepIndex));
        setAccumulatedXp((prev) => prev + currentStep.xpReward);
      }
      setActiveFeedback(
        lang === "de" ? selectedOpt.explanationDE : selectedOpt.explanationZH
      );
    } else {
      setIsCorrect(false);
      setComboCount(0); // 连击中断
      setMistakes((prev) => [
        ...prev,
        `${currentStep.titleDE}: ${selectedOpt.textDE}`,
      ]);
      // 苏格拉底降维点拨
      const hint =
        lang === "de"
          ? `${selectedOpt.explanationDE} (Denk an die Analogie: ${distilled.mentalModelAnalogy.analogyTitle})`
          : `${selectedOpt.explanationZH} (不妨联想生活比喻: ${distilled.mentalModelAnalogy.analogyTitle})`;
      setActiveFeedback(hint);
    }
  };

  // 步进到下一步或结算
  const handleNextStep = () => {
    setSelectedIntuitionChoice(null);
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setActiveFeedback(null);
    } else {
      // 全部达成，进入胜利结算屏
      setIsFinished(true);
      onComplete(questNode.id, accumulatedXp, mistakes);
    }
  };

  // 允许随时回退到上一步查看
  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setActiveFeedback(null);
    }
  };

  const handleRetryStep = () => {
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setActiveFeedback(null);
  };

  // 重玩本关
  const handleReviewQuest = () => {
    setCurrentStepIndex(0);
    setSelectedOptionId(null);
    setSelectedIntuitionChoice(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setActiveFeedback(null);
    setShowNoteDrawer(false);
    setIsMicroWorldCompleted(false);
    setIsPuzzleCompleted(false);
    setCompletedStepIndices(new Set());
    setComboCount(0);
    setAccumulatedXp(0);
    setMistakes([]);
    setIsFinished(false);
  };

  // 动态渲染微世界（A3: 按 interactiveType 精确映射领域仿真；highlighter/tangent-slider/balance 保持现状）
  const renderEmbeddedMicroWorld = () => {
    switch (questNode.interactiveType as string) {
      case "konzept_puzzle":
      case "puzzle":
        return (
          <KonzeptPuzzle
            puzzleData={distilled.konzeptPuzzle}
            title={questNode.title}
            lang={lang}
            fach={effectiveFach}
          />
        );
      case "dilemma_balance":
      case "ethik-waage":
      case "rawls-sim":
        return <DilemmaBalanceScale title={questNode.title} lang={lang} />;
      case "logic_blocks":
        return (
          <LogicBlockBuilder
            title={questNode.title}
            lang={lang}
            archetypeId={resolveLogicArchetype(questNode.title, questNode.summary)}
          />
        );
      case "scenario_tree":
      case "dilemma-theatre":
      case "wahlsystem-sim":
        return (
          <ScenarioDecisionTree
            title={questNode.title}
            lang={lang}
            scenarioId={resolveDecisionScenarioId(questNode.title, questNode.summary)}
          />
        );
      case "gini-allocator":
      case "orderbuch-sim":
        return <VariableSliderBox title={questNode.title} lang={lang} />;
      case "markt-sim":
        return (
          <MarktgleichgewichtSim
            lang={lang}
            scenarioId={marktScenarioId}
            onMissionComplete={(completed) => setIsMicroWorldCompleted(completed)}
          />
        );
      case "kinematik":
        return <KinematikSim lang={lang} />;
      case "magisches-viereck":
        return <MagischesViereckSim lang={lang} />;
      case "formula":
        return (
          <FormulaScaffold
            lang={lang}
            fach={effectiveFach}
            thema={questNode.title}
          />
        );
      case "variable_slider":
      case "tangent-slider":
      default:
        if (distilled.konzeptPuzzle) {
          return (
            <KonzeptPuzzle
              puzzleData={distilled.konzeptPuzzle}
              title={questNode.title}
              lang={lang}
              fach={effectiveFach}
            />
          );
        }
        return <VariableSliderBox title={questNode.title} lang={lang} />;
    }
  };

  if (!isOpen) return null;

  if (isFinished) {
    return (
      <div className="fixed inset-0 z-50 bg-[var(--paper)] flex flex-col justify-center overflow-y-auto">
        <VictoryRewardScreen
          questNode={questNode}
          earnedXp={accumulatedXp}
          streakDays={currentStreak}
          mistakes={mistakes}
          fach={effectiveFach}
          lang={lang}
          onContinue={onClose}
          onReviewQuest={handleReviewQuest}
        />
      </div>
    );
  }

  const containerMaxWidth = currentStep.type === "lecture" ? "max-w-7xl" : "max-w-4xl";

  return (
    <div className="fixed inset-0 z-50 bg-[var(--paper)] text-[var(--ink)] flex flex-col justify-between overflow-hidden">
      {/* 顶部多邻国发丝线进度条与连击 HUD */}
      <header className="px-4 sm:px-8 py-3 border-b border-[var(--line)] bg-[var(--paper)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          {/* 退出按钮 */}
          <button
            type="button"
            onClick={() => setShowExitConfirm(true)}
            className="p-1 border border-[var(--line)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer"
            title={lang === "de" ? "Lektion beenden" : "退出本次课程"}
          >
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
              <path d="M4 4l8 8M12 4l-8 8" />
            </svg>
          </button>

          {/* 搭载笔记抽屉切换按钮 */}
          {distilled.attachedNote && (
            <button
              type="button"
              onClick={() => setShowNoteDrawer(true)}
              className="px-2 py-1 border border-[var(--ink)] bg-[var(--paper-subtle)] hover:bg-[var(--ink)] hover:text-[var(--paper)] text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1.5"
              title={lang === "de" ? "Wissensnotiz öffnen" : "打开搭载知识笔记"}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
                style={{ transformOrigin: "8px 8px", transformBox: "view-box" }}
              >
                <path d="M3 2h7l3 3v9H3V2z" />
                <path d="M10 2v3h3" />
                <path d="M5 8h6M5 11h4" />
              </svg>
              <span>{lang === "de" ? "[Notiz]" : "[搭载笔记]"}</span>
            </button>
          )}
        </div>

        {/* 增强型几何阶段刻度进度条 (Step Ticks) 与阶段徽章 */}
        <div className="flex-1 max-w-xl mx-auto flex flex-col gap-1">
          <div className="flex items-center gap-3">
            {/* 阶段指示胶囊 */}
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] font-bold shrink-0">
              {currentStep.phase === "learn"
                ? lang === "de"
                  ? "Phase 1: Wissen & Labor"
                  : "第一阶段：新知与实验"
                : lang === "de"
                ? "Phase 2: Klausur-Challenge"
                : "第二阶段：考场通关"}
            </span>

            <div className="flex-1 h-2 bg-[var(--paper-subtle)] border border-[var(--line)] overflow-hidden relative">
              <div
                className="h-full bg-[var(--ink)] transition-all duration-300 ease-out"
                style={{ width: `${Math.max(4, progressPercent)}%` }}
              />
            </div>
            <span className="text-[10px] font-mono text-[var(--ink-muted)] shrink-0">
              {currentStepIndex + 1} / {steps.length}
            </span>
          </div>

          {/* 阶段刻度断点微指示器 */}
          <div className="flex justify-between px-0.5">
            {steps.map((s, sIdx) => (
              <span
                key={sIdx}
                title={`${s.phase}: ${s.titleDE}`}
                className={`inline-block w-2 h-1 border transition-colors ${
                  sIdx <= currentStepIndex
                    ? "bg-[var(--ink)] border-[var(--ink)]"
                    : "bg-[var(--paper-subtle)] border-[var(--line)]"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Combo 连击与即时 XP 计数 */}
        <div className="flex items-center gap-3 font-mono text-xs">
          {comboCount > 1 && (
            <span className="px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] font-bold">
              Combo x{comboCount}
            </span>
          )}
          <span className="text-[var(--ink-muted)]">
            +{accumulatedXp} XP
          </span>
        </div>
      </header>

      {/* 中间核心交互卡片工作区 */}
      <main className="flex-1 overflow-y-auto px-3 sm:px-8 pt-3 sm:pt-4 pb-5 sm:pb-6 w-full flex flex-col justify-start">
        <div className={`${containerMaxWidth} mx-auto w-full border border-[var(--line)] p-3.5 sm:p-5 bg-[var(--paper)]`}>
          {/* 步骤类别徽章与阶段说明 */}
          <div className="flex items-center justify-between mb-2.5 border-b border-[var(--line)] pb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)] font-bold">
                {currentStep.phase === "learn"
                  ? currentStep.type === "lecture"
                    ? lang === "de"
                      ? "Theorie-Vorlesung"
                      : "新知精讲"
                    : currentStep.type === "puzzle"
                    ? lang === "de"
                      ? "Konzept-Puzzle"
                      : "概念拼图"
                    : lang === "de"
                    ? "Mikrowelt-Labor"
                    : "动手实验"
                  : lang === "de"
                  ? "Klausur-Prüfung"
                  : "考场实测"}
              </span>
              <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink-muted)] font-semibold">
                {lang === "de" ? currentStep.titleDE : currentStep.titleZH}
              </span>
            </div>
            <span className="font-mono text-xs border border-[var(--line)] px-1.5 py-0.5 bg-[var(--paper-subtle)]">
              +{currentStep.xpReward} XP
            </span>
          </div>

          {/* 核心标题引导语 */}
          <h3 className={`font-bold tracking-tight leading-snug ${currentStep.type === "microworld" ? "text-xs sm:text-sm mb-2 text-[var(--ink-muted)] font-mono" : "text-base sm:text-lg mb-4"}`}>
            {lang === "de" ? currentStep.promptDE : currentStep.promptZH}
          </h3>

          {/* 1. 若为第一阶段：直觉碰撞与场景博弈 (Phase 1 Intuitions-Konflikt: Desktop-Split-Workbench) */}
          {currentStep.type === "lecture" && currentStep.lecturePayload && (() => {
            const dilemma = currentStep.lecturePayload.intuitionDilemma;
            const scenarioText = dilemma
              ? (lang === "de" ? dilemma.scenarioDE : dilemma.scenarioZH)
              : (currentStep.lecturePayload.storyHook
                  ? (lang === "de" ? currentStep.lecturePayload.storyHook.scenarioDE : currentStep.lecturePayload.storyHook.scenarioZH)
                  : (lang === "de" ? currentStep.promptDE : currentStep.promptZH));
            const questionText = dilemma
              ? (lang === "de" ? dilemma.questionDE : dilemma.questionZH)
              : (lang === "de" ? currentStep.promptDE : currentStep.promptZH);
            const isMarketDilemma =
              questNode.title.toLowerCase().includes("markt") ||
              (effectiveFach === "SoWi" && (questNode.matchedToolId === "markt-sim" || questNode.title.toLowerCase().includes("preis")));

            return (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fadeIn">
                {/* 左栏 (45%): 微观博弈场域与直觉站队卡片 */}
                <div className="lg:col-span-5 flex flex-col gap-5">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
                        {lang === "de" ? "Reales Alltags-Dilemma" : "真实生活微观博弈"}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                        {lang === "de" ? "Wähle deine intuitive Haltung:" : "凭直觉做出你的抉择："}
                      </span>
                    </div>

                    <p className="text-sm font-serif text-[var(--ink)] leading-relaxed">
                      {scenarioText}
                    </p>

                    <div className="font-bold text-sm text-[var(--ink)] border-l-2 border-[var(--ink)] pl-3 py-0.5">
                      {questionText}
                    </div>
                  </div>

                  {/* 两个大尺寸直觉卡片 (Option A vs Option B) */}
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedIntuitionChoice("A")}
                      className={`text-left p-4 border-2 transition-all cursor-pointer ${
                        selectedIntuitionChoice === "A"
                          ? "border-[var(--ink)] bg-[var(--paper)] font-medium"
                          : "border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] text-[var(--ink)]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 border shrink-0 ${
                            selectedIntuitionChoice === "A"
                              ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                              : "bg-[var(--paper)] text-[var(--ink)] border-[var(--line)]"
                          }`}
                        >
                          [ A ]
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed text-[var(--ink)]">
                          {dilemma
                            ? (lang === "de" ? dilemma.choiceA.textDE : dilemma.choiceA.textZH)
                            : "Option A"}
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedIntuitionChoice("B")}
                      className={`text-left p-4 border-2 transition-all cursor-pointer ${
                        selectedIntuitionChoice === "B"
                          ? "border-[var(--ink)] bg-[var(--paper)] font-medium"
                          : "border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] text-[var(--ink)]"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 border shrink-0 ${
                            selectedIntuitionChoice === "B"
                              ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                              : "bg-[var(--paper)] text-[var(--ink)] border-[var(--line)]"
                          }`}
                        >
                          [ B ]
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed text-[var(--ink)]">
                          {dilemma
                            ? (lang === "de" ? dilemma.choiceB.textDE : dilemma.choiceB.textZH)
                            : "Option B"}
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* 右栏 (55%): Tufte 纯黑白学术解构工作台 (Split Workbench) */}
                <div className="lg:col-span-7 flex flex-col gap-4 border-t lg:border-t-0 lg:border-l border-[var(--line)] pt-6 lg:pt-0 pl-0 lg:pl-8">
                  {!selectedIntuitionChoice ? (
                    /* 待命待激活线框态 (Dormant State) */
                    <div className="p-8 border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] text-center flex flex-col items-center justify-center min-h-[360px] gap-3">
                      <div className="font-mono text-xs uppercase tracking-widest text-[var(--ink-muted)] font-bold">
                        [ {lang === "de" ? "Theorie-Dekodierung inaktiv" : "理论解析工作台待命"} ]
                      </div>
                      <p className="font-serif text-sm text-[var(--ink-muted)] max-w-md leading-relaxed">
                        {lang === "de"
                          ? "Wähle links deine Position zu Option [ A ] oder [ B ], um das ökonomische Kausaldiagramm, die 5 Prämissen und den Fachsprache-Musterbaustein zu aktivieren."
                          : "在左侧选定你的初始立场 [ A ] 或 [ B ]，即刻激活微观需求弹性曲线、公理化前提校验与德语会考学科规范金句。"}
                      </p>
                    </div>
                  ) : (
                    /* 激活后的 Tufte 墨黑学术解构看板 */
                    <div className="flex flex-col gap-4 animate-fadeIn">
                      {/* 1. 学术结果与立场标签 */}
                      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
                        <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
                          {selectedIntuitionChoice === "B"
                            ? (lang === "de" ? "[ Fachlich Präzise ] Mengenanpasser-Logik" : "[ 严密推导 ] 价格接受者逻辑闭环")
                            : (lang === "de" ? "[ Kognitive Reibung ] Vollkommene Preiselastizität" : "[ 认知交锋 ] 完全价格弹性悖论")}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                          {selectedIntuitionChoice === "B" ? "E = ∞ · P* = 10 €" : "ΔP > 0 → q = 0"}
                        </span>
                      </div>

                      {/* 2. 即时因果深度推演文本 (通俗易懂精炼解构) */}
                      <div className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)]">
                        <div className="font-mono text-[10px] font-bold uppercase text-[var(--ink-muted)] mb-1">
                          {lang === "de" ? "Deduktions-Analyse:" : "机制推导剖析："}
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-[var(--ink)] leading-relaxed">
                          {dilemma
                            ? (selectedIntuitionChoice === "A"
                                ? (lang === "de" ? dilemma.choiceA.reactionDE : dilemma.choiceA.reactionZH)
                                : (lang === "de" ? dilemma.choiceB.reactionDE : dilemma.choiceB.reactionZH))
                            : ""}
                        </p>
                      </div>

                      {/* 3. 针对市场主题的水平需求弹性曲线 SVG 图表 */}
                      {isMarketDilemma && (
                        <div className="border border-[var(--line)] bg-[var(--paper)] p-3">
                          <div className="flex items-center justify-between pb-1 mb-2 border-b border-[var(--line)]">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]">
                              {lang === "de"
                                ? "Individuelle Preisabsatzfunktion (E = ∞)"
                                : "个体需求曲线：完全价格弹性 (E = ∞)"}
                            </span>
                            <span className="font-mono text-[9px] text-[var(--ink-muted)]">
                              {"P = 10 € → q ∈ [0, q_max] | P > 10 € → q = 0"}
                            </span>
                          </div>

                          <div className="w-full flex justify-center py-1">
                            <svg
                              viewBox="0 0 460 170"
                              className="w-full max-w-lg h-auto text-[var(--ink)]"
                              style={{ transformOrigin: "230px 85px", transformBox: "view-box" }}
                              aria-label="Vollkommen elastische Nachfragekurve"
                            >
                              {/* 坐标轴 */}
                              <line x1="50" y1="140" x2="430" y2="140" stroke="currentColor" strokeWidth="1.5" />
                              <line x1="50" y1="140" x2="50" y2="20" stroke="currentColor" strokeWidth="1.5" />
                              {/* 轴箭头 */}
                              <polygon points="430,137 438,140 430,143" fill="currentColor" />
                              <polygon points="47,20 50,12 53,20" fill="currentColor" />
                              {/* 轴标签 */}
                              <text x="30" y="24" fontSize="11" fontFamily="serif" fill="currentColor">P (€)</text>
                              <text x="390" y="155" fontSize="11" fontFamily="serif" fill="currentColor">q (Menge)</text>

                              {/* 均衡价 P* = 10 € 刻度与虚线辅助 */}
                              <line x1="45" y1="80" x2="50" y2="80" stroke="currentColor" strokeWidth="1.5" />
                              <text x="10" y="84" fontSize="10" fontFamily="monospace" fill="currentColor">P*=10€</text>
                              
                              {/* 水平完全弹性需求线 (E = ∞) */}
                              <line
                                x1="50"
                                y1="80"
                                x2="410"
                                y2="80"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                style={{ transformOrigin: "230px 80px", transformBox: "view-box" }}
                              />
                              <text x="180" y="72" fontSize="10" fontFamily="sans-serif" fontWeight="bold" fill="currentColor">
                                Nachfrage d (E = ∞)
                              </text>

                              {/* 提价 P = 11 € 时的骤降点 */}
                              <line x1="45" y1="45" x2="50" y2="45" stroke="currentColor" strokeWidth="1.5" />
                              <text x="22" y="49" fontSize="10" fontFamily="monospace" fill="currentColor">11€</text>
                              <circle cx="50" cy="45" r="4" fill="currentColor" />
                              <line x1="50" y1="45" x2="140" y2="45" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
                              
                              {/* 标注跌落至 0 */}
                              <text x="148" y="48" fontSize="10" fontFamily="sans-serif" fill="currentColor">
                                {"P = 11 € → q = 0 (Kein Absatz)"}
                              </text>
                            </svg>
                          </div>
                          <div className="text-[10px] font-mono text-[var(--ink-muted)] pt-1 border-t border-[var(--line)]">
                            {lang === "de"
                              ? "Erkenntnis: Für den einzelnen Mengenanpasser verläuft die Nachfragekurve horizontal. Jede Preiserhöhung führt zum Totalverlust des Marktes."
                              : "核心结论：对于单个微观商贩，需求曲线呈绝对水平状态。任何私自涨价将导致客户全部流失，销量归零。"}
                          </div>
                        </div>
                      )}

                      {/* 4. 针对市场主题的 5 大公理前提校验清单 */}
                      {isMarketDilemma && (
                        <div className="border border-[var(--line)] p-3 bg-[var(--paper)] space-y-2">
                          <div className="flex items-center justify-between pb-1 border-b border-[var(--line)]">
                            <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]">
                              {lang === "de" ? "5 Konstitutive Modell-Prämissen" : "完全竞争市场 5 大公理前提"}
                            </span>
                            <span className="font-mono text-[9px] px-1.5 py-0.2 border border-[var(--ink)]">
                              KLP NRW EF
                            </span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                            <div className="p-1.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                              <span className="font-bold text-[var(--ink)]">[1] Homogene Güter:</span>
                              <p className="text-[10px] text-[var(--ink-muted)]">
                                {lang === "de" ? "Keine qualitativen oder sachlichen Unterschiede" : "完全同质无任何品质与包装差别"}
                              </p>
                            </div>
                            <div className="p-1.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                              <span className="font-bold text-[var(--ink)]">[2] Markttransparenz:</span>
                              <p className="text-[10px] text-[var(--ink-muted)]">
                                {lang === "de" ? "Vollständige Echtzeit-Information über alle Preise" : "所有参与者享有完全实时的全市场价格信息"}
                              </p>
                            </div>
                            <div className="p-1.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                              <span className="font-bold text-[var(--ink)]">[3] Keine Präferenzen:</span>
                              <p className="text-[10px] text-[var(--ink-muted)]">
                                {lang === "de" ? "Weder persönliche, räumliche noch zeitliche Vorlieben" : "无任何个人人情、地理距离或等待时间偏好"}
                              </p>
                            </div>
                            <div className="p-1.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                              <span className="font-bold text-[var(--ink)]">[4] Sofortige Reaktion:</span>
                              <p className="text-[10px] text-[var(--ink-muted)]">
                                {lang === "de" ? "Unendlich schnelle Anpassungsgeschwindigkeit der Akteure" : "买卖双方具备无限快的瞬时迁移与反应速度"}
                              </p>
                            </div>
                          </div>
                          <div className="p-1.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[11px] font-mono">
                            <span className="font-bold text-[var(--ink)]">[5] Freier Marktzutritt & Atomistische Struktur:</span>
                            <p className="text-[10px] text-[var(--ink-muted)]">
                              {lang === "de" ? "Hunderte Kleinstanbieter ohne Marktmacht als reine Preisnehmer" : "海量小商贩无任何垄断势力，完全充当价格接受者与产量调整者"}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* 5. 德国文理高中会考标准应试金句 (NRW Klausur-Musterbaustein) */}
                      {dilemma && (
                        <div className="border-2 border-[var(--ink)] p-3.5 bg-[var(--paper)] space-y-2">
                          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line)]">
                            <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
                              {lang === "de" ? "[ Klausur-Musterbaustein · 15 NP ]" : "[ 会考德语标准论述金句 · 15 NP ]"}
                            </span>
                            <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                              Gymnasium EF/Q1 · AFB II/III
                            </span>
                          </div>

                          {/* 德语原版高分论述句，核心术语高亮 */}
                          <blockquote className="text-xs sm:text-sm font-serif leading-relaxed text-[var(--ink)] pl-2.5 border-l-2 border-[var(--ink)]">
                            {isMarketDilemma ? (
                              <span>
                                »Da im Modell die Güter <strong className="font-bold underline decoration-[var(--line)]">völlig homogen</strong> sind und <strong className="font-bold underline decoration-[var(--line)]">vollständige Markttransparenz</strong> herrscht, besitzt der einzelne Anbieter keine Preissetzungsmacht und agiert als <strong className="font-bold underline decoration-[var(--line)]">reiner Preisnehmer (Mengenanpasser)</strong>.«
                              </span>
                            ) : (
                              <span>»{dilemma.mechanismTakeawayDE}«</span>
                            )}
                          </blockquote>

                          {/* 通俗易懂中文释义 */}
                          <p className="text-[11px] font-serif text-[var(--ink-muted)] leading-relaxed">
                            {dilemma.mechanismTakeawayZH}
                          </p>

                          <div className="text-[10px] font-mono text-[var(--ink)] pt-1.5 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-1">
                            <div>
                              <span className="font-bold">
                                {lang === "de" ? "Kausale Essenz: " : "因果本质: "}
                              </span>
                              <span>
                                {lang === "de" ? "Horizontale Nachfrage (E = ∞) zwingt zur Preisübernahme" : "水平需求曲线 E = ∞ 迫使商贩完全丧失定价权"}
                              </span>
                            </div>
                            <div className="text-[var(--ink-muted)]">
                              <span className="font-bold">
                                {lang === "de" ? "KLP-Prüfungskern: " : "考纲要点: "}
                              </span>
                              <span>
                                {lang === "de" ? dilemma.klpCoreLogicDE : dilemma.klpCoreLogicZH}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 6. 辅助笔记入口链接 */}
                      {distilled.attachedNote && (
                        <div className="pt-1 flex items-center justify-between">
                          <button
                            type="button"
                            onClick={() => setShowNoteDrawer(true)}
                            className="text-[11px] font-mono text-[var(--ink-muted)] hover:text-[var(--ink)] underline cursor-pointer"
                          >
                            {lang === "de"
                              ? "→ KLP-Wissensnotiz & Zwei Brillen öffnen"
                              : "→ 打开搭载知识笔记与辩证双轨小抄"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })()}

          {/* 2. 若为第一阶段：动手探究实验微世界 (Phase 1 MicroWorld) */}
          {currentStep.type === "microworld" && (
            <div className="w-full">
              {renderEmbeddedMicroWorld()}
            </div>
          )}

          {/* 3. 若为概念/公理对决拼图 (Phase 1 Puzzle) */}
          {currentStep.type === "puzzle" && (
            <div className="w-full">
              <KonzeptPuzzle
                puzzleData={distilled.konzeptPuzzle}
                title={questNode.title}
                lang={lang}
                fach={effectiveFach}
                onAllMatched={() => setIsPuzzleCompleted(true)}
              />
            </div>
          )}

          {/* 4. 若为第二阶段：考场闯关与达标实测 (Phase 2 Challenge Cards) */}
          {currentStep.type !== "lecture" &&
            currentStep.type !== "microworld" &&
            currentStep.type !== "puzzle" && (
              <div className="flex flex-col gap-3">
                {/* 针对 Step 4 (trap) 的真实考场 0 分错答展台 */}
                {currentStep.type === "trap" && distilled.examTrapCorrection && (
                  <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line)]">
                      <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--paper)]">
                        [ {lang === "de" ? "Auszug aus einer Schülerklausur (AFB II)" : "真实考场学生作答摘录 (AFB II)"} ]
                      </span>
                      <span className="font-mono text-xs font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
                        0 / 15 NP
                      </span>
                    </div>
                    {distilled.examTrapCorrection.taskPromptDE && (
                      <div className="text-[11px] font-mono text-[var(--ink-muted)] border-b border-[var(--line)] pb-1.5">
                        <span className="font-bold text-[var(--ink)]">
                          {lang === "de" ? "Aufgabenstellung: " : "题目设问: "}
                        </span>
                        {lang === "de"
                          ? distilled.examTrapCorrection.taskPromptDE
                          : distilled.examTrapCorrection.taskPromptZH}
                      </div>
                    )}
                    <blockquote className="text-xs font-serif leading-relaxed pl-2.5 border-l-2 border-[var(--ink)] text-[var(--ink)] space-y-1">
                      <div className="font-medium text-[var(--ink)]">
                        {distilled.examTrapCorrection.studentAnswerDE}
                      </div>
                      {distilled.examTrapCorrection.studentAnswerZH && (
                        <div className="text-[11px] text-[var(--ink-muted)]">
                          {distilled.examTrapCorrection.studentAnswerZH}
                        </div>
                      )}
                    </blockquote>
                    <div className="text-[10px] font-mono text-[var(--ink-muted)]">
                      {lang === "de"
                        ? "Prüfer-Frage: Warum wird diese Argumentation mit 0 Notenpunkten bewertet? Worin liegt die fatale Fehlannahme?"
                        : "考官提问：该论述为何被直接判 0 分？最致命的认知漏洞是？"}
                    </div>
                  </div>
                )}

                {/* 针对 Step 5 (quiz) 的 Operator 与满分导向说明 */}
                {currentStep.type === "quiz" && (
                  <div className="flex items-center justify-between pb-1 border-b border-[var(--line)]">
                    <span className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)]">
                      [ AFB III Operator: {distilled.klausurSatz15NP.operator} ]
                    </span>
                    <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                      {lang === "de" ? "15 Notenpunkte Standard" : "15 分满分踩分标准"}
                    </span>
                  </div>
                )}

                {/* 选项列表 */}
                <div className="flex flex-col gap-2.5">
                  {currentStep.options?.map((opt) => {
                    const isSelected = selectedOptionId === opt.id;
                    let optionStyle =
                      "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)]";

                    if (isAnswerChecked) {
                      if (opt.isCorrect) {
                        optionStyle =
                          "border-[var(--ink)] bg-[var(--paper-subtle)] ring-1 ring-[var(--ink)] font-semibold";
                      } else if (isSelected && !opt.isCorrect) {
                        optionStyle =
                          "border-dashed border-[var(--ink)] bg-[var(--paper-subtle)] opacity-70";
                      }
                    } else if (isSelected) {
                      optionStyle =
                        "border-[var(--ink)] bg-[var(--paper-subtle)] ring-1 ring-[var(--ink)]";
                    }

                    return (
                      <button
                        key={opt.id}
                        type="button"
                        disabled={isAnswerChecked}
                        onClick={() => handleSelectOption(opt)}
                        className={`p-3.5 border text-left text-xs leading-relaxed transition-all cursor-pointer flex items-start gap-2.5 active:translate-y-[1px] ${optionStyle}`}
                      >
                        <span className="font-mono text-[10px] border border-[var(--line)] px-1.5 py-0.5 mt-0.5 shrink-0">
                          {isSelected ? "●" : "○"}
                        </span>
                        <span className="flex-1">
                          {currentStep.type === "quiz" ? (
                            lang === "de" ? (
                              <span className="font-serif leading-relaxed block">
                                »{opt.textDE}«
                              </span>
                            ) : (
                              <span className="block space-y-1">
                                <span className="font-serif leading-relaxed block text-[var(--ink)]">
                                  »{opt.textDE}«
                                </span>
                                {opt.textZH && (
                                  <span className="font-sans text-[11px] text-[var(--ink-muted)] block">
                                    {opt.textZH.startsWith("（") || opt.textZH.startsWith("(")
                                      ? opt.textZH
                                      : `（${opt.textZH}）`}
                                  </span>
                                )}
                              </span>
                            )
                          ) : (
                            lang === "de" ? opt.textDE : opt.textZH
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Step 4 核验正确后的考官订正与雷区深入诊断 */}
                {isAnswerChecked && isCorrect && currentStep.type === "trap" && distilled.examTrapCorrection && (
                  <div className="p-3.5 border-2 border-[var(--ink)] bg-[var(--paper)] animate-fadeIn space-y-2 mt-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
                        {lang === "de" ? "[ Muster-Korrektur ]" : "[ 考官订正示范 ]"}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                        {lang === "de" ? "Klausur-Standard AFB II" : "会考标准作答思路"}
                      </span>
                    </div>
                    <div className="text-xs font-serif text-[var(--ink)] leading-relaxed">
                      {lang === "de"
                        ? distilled.examTrapCorrection.examinerVerdictDE
                        : distilled.examTrapCorrection.examinerVerdictZH}
                    </div>
                    <div className="text-[11px] font-mono text-[var(--ink)] border-t border-[var(--line)] pt-1.5">
                      <span className="font-bold">
                        {lang === "de" ? "Fataler Denkfehler: " : "致命失分症结: "}
                      </span>
                      {lang === "de"
                        ? distilled.examTrapCorrection.fatalFlawPointDE
                        : distilled.examTrapCorrection.fatalFlawPointZH}
                    </div>
                  </div>
                )}

                {/* Step 5 核验正确后的 15 NP 会考金句终局勋章 */}
                {isAnswerChecked && isCorrect && currentStep.type === "quiz" && (
                  <div className="p-3.5 border-2 border-[var(--ink)] bg-[var(--paper)] animate-fadeIn space-y-2 mt-1">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line)]">
                      <span className="font-mono text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
                        {lang === "de" ? "[ 15-NP-Meistersatz ]" : "[ 15 NP 满分金句 ]"}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                        {distilled.klausurSatz15NP.operator} · AFB III
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm font-serif font-bold text-[var(--ink)] leading-relaxed">
                      »{distilled.klausurSatz15NP.musterSatzDE}«
                    </div>
                    <div className="text-xs font-serif text-[var(--ink-muted)] leading-relaxed">
                      （{distilled.klausurSatz15NP.explanationZH}）
                    </div>
                    <div className="text-[10px] font-mono text-[var(--ink)] border-t border-[var(--line)] pt-1.5 flex flex-wrap items-center gap-1.5">
                      <span className="font-bold">
                        {lang === "de" ? "Schlüssel-Begriffe: " : "踩分要件: "}
                      </span>
                      <span>
                        {distilled.klausurSatz15NP.scoringKeywords.join(", ")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
        </div>
      </main>

      {/* 底部即时操作与反馈栏 */}
      <footer className="border-t border-[var(--line)] p-4 sm:px-8 bg-[var(--paper)]">
        <div className={`${containerMaxWidth} mx-auto flex flex-col sm:flex-row items-center justify-between gap-3`}>
          {/* 即时反馈文本 */}
          <div className="text-xs font-mono flex-1">
            {/* 新知精讲微课底部提示 */}
            {currentStep.type === "lecture" && (
              <span className="text-[var(--ink-muted)]">
                {selectedIntuitionChoice
                  ? (lang === "de"
                      ? `Option [ ${selectedIntuitionChoice} ] gewählt. Starte jetzt das interaktive Experiment.`
                      : `已选择立场 [ ${selectedIntuitionChoice} ]。理清机制后，点击进入实验探索。`)
                  : (lang === "de"
                      ? "Wähle zuerst A oder B - es gibt kein Richtig oder Falsch."
                      : "先凭直觉选 A 或 B，没有对错，选后可见机制剖析。")}
              </span>
            )}

            {/* 动手实验底部提示（目标值跟随当前市场情境，不再硬编码 +50%） */}
            {currentStep.type === "microworld" && (
              <span className="text-[var(--ink-muted)]">
                {isMicroWorldGated && !isMicroWorldCompleted
                  ? (lang === "de"
                      ? `Bewege den Schieberegler auf die Zielmarke (+${marktScenario.targetPct}%), um die nächste Stufe freizuschalten.`
                      : `请将滑块调整至 +${marktScenario.targetPct}% 靶心目标区间，以解锁下一环节。`)
                  : (lang === "de"
                      ? "Zielkriterium erfüllt! Klicke auf den Button, um fortzufahren."
                      : "实验目标已达成！点击按钮前往下一环节。")}
              </span>
            )}

            {/* 概念拼图底部提示（数量跟随真实puzzle数据，不再硬编码4组/完全竞争市场） */}
            {currentStep.type === "puzzle" && (
              <span className="text-[var(--ink-muted)]">
                {!isPuzzleCompleted
                  ? (lang === "de"
                      ? `Ordne alle ${distilled.konzeptPuzzle?.pairs?.length ?? 4} Begriffspaare auf der linken und rechten Seite zu.`
                      : `请将左侧与右侧的 ${distilled.konzeptPuzzle?.pairs?.length ?? 4} 组概念配对完成。`)
                  : (lang === "de"
                      ? "Alle Begriffspaare erfolgreich zugeordnet! Klicke auf den Button, um zur Challenge zu wechseln."
                      : "概念配对全部完成！点击前往考场挑战。")}
              </span>
            )}

            {/* 答题阶段即时反馈 */}
            {currentStep.type !== "lecture" &&
              currentStep.type !== "microworld" &&
              currentStep.type !== "puzzle" && (
                <>
                  {isAnswerChecked && activeFeedback && (
                    <div className="flex items-start gap-2">
                      <span className="font-bold shrink-0 flex items-center gap-1">
                        {isCorrect ? (
                          <>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                              className="inline"
                              style={{
                                transformOrigin: "8px 8px",
                                transformBox: "view-box",
                              }}
                            >
                              <path d="M3.5 8.5l3 3 6-7" />
                            </svg>
                            <span>{lang === "de" ? "Richtig! " : "正确！"}</span>
                          </>
                        ) : (
                          <>
                            <svg
                              width="14"
                              height="14"
                              viewBox="0 0 16 16"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              aria-hidden="true"
                              className="inline"
                              style={{
                                transformOrigin: "8px 8px",
                                transformBox: "view-box",
                              }}
                            >
                              <path d="M4 4l8 8M12 4l-8 8" />
                            </svg>
                            <span>
                              {lang === "de" ? "Noch nicht ganz: " : "暂未命中: "}
                            </span>
                          </>
                        )}
                      </span>
                      <span className="leading-relaxed text-[var(--ink)]">
                        {currentStep.type === "trap" && isCorrect
                          ? (lang === "de"
                              ? `Diagnose korrekt (+${currentStep.xpReward} XP)! Siehe Prüfer-Musterkorrektur oben.`
                              : `诊断正确 (+${currentStep.xpReward} XP)！请查看上方考官标准订正示范与失分剖析。`)
                          : activeFeedback}
                      </span>
                    </div>
                  )}
                  {!isAnswerChecked && (
                    <span className="text-[var(--ink-muted)]">
                      {lang === "de"
                        ? "Wähle eine Option aus und klicke auf Überprüfen."
                        : "选择一个选项，点击核验答案。"}
                    </span>
                  )}
                </>
              )}
          </div>

          {/* 主动作按钮 */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {/* 允许随时回退到上一步查看 */}
            {currentStepIndex > 0 && (
              <button
                type="button"
                onClick={handlePrevStep}
                className="w-full sm:w-auto px-4 py-2 border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] text-xs font-mono active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-1.5 text-[var(--ink)]"
              >
                <span aria-hidden="true">&lt;-</span>
                <span>{lang === "de" ? "Zurück" : "上一步"}</span>
              </button>
            )}

            {/* Step 1 Lecture 操作按钮 */}
            {currentStep.type === "lecture" ? (
              <button
                type="button"
                onClick={handleAdvanceLecture}
                disabled={selectedIntuitionChoice === null}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border-2 border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {lang === "de"
                    ? "Weiter zum Experiment"
                    : "进入互动实验探索"}
                </span>
                <span aria-hidden="true">-&gt;</span>
              </button>
            ) : currentStep.type === "microworld" ? (
              /* Step 2 MicroWorld 操作按钮 */
              <button
                type="button"
                onClick={handleAdvanceMicroWorld}
                disabled={isMicroWorldGated && !isMicroWorldCompleted}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border-2 border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {steps[currentStepIndex + 1]?.type === "puzzle"
                    ? lang === "de"
                      ? "Experiment abgeschlossen -> Weiter zum Puzzle"
                      : "动手实验探究完毕 -> 前往四大假设拼图"
                    : lang === "de"
                    ? "Experiment abgeschlossen -> Jetzt zur Challenge"
                    : "动手实验探究完毕 -> 前往考场通关挑战"}
                </span>
                <span aria-hidden="true">-&gt;</span>
              </button>
            ) : currentStep.type === "puzzle" ? (
              /* Step 3 Puzzle 操作按钮 */
              <button
                type="button"
                onClick={handleAdvancePuzzle}
                disabled={!isPuzzleCompleted}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border-2 border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {lang === "de"
                    ? "Puzzle gelöst -> Jetzt zur Challenge"
                    : "四大假设拼图完成 -> 前往考场通关挑战"}
                </span>
                <span aria-hidden="true">-&gt;</span>
              </button>
            ) : !isAnswerChecked ? (
              /* Phase 2 Challenge 未核验 */
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={!selectedOptionId}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {lang === "de" ? "Überprüfen" : "核验答案"}
              </button>
            ) : isCorrect ? (
              /* Phase 2 Challenge 核验正确 */
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border-2 border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {currentStepIndex + 1 < steps.length
                    ? lang === "de"
                      ? "Weiter"
                      : "继续下一步"
                    : lang === "de"
                    ? "Zur Belohnung"
                    : "查看通关战果"}
                </span>
                <span aria-hidden="true">-&gt;</span>
              </button>
            ) : (
              /* Phase 2 Challenge 核验错误，重试 */
              <button
                type="button"
                onClick={handleRetryStep}
                className="w-full sm:w-auto px-5 py-2 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono hover:border-[var(--ink)] active:translate-y-[1px] transition-all cursor-pointer"
              >
                {lang === "de" ? "Nochmals versuchen" : "重新尝试"}
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* 中途退出确认弹窗 */}
      {showExitConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="border-2 border-[var(--ink)] bg-[var(--paper)] p-5 max-w-sm w-full text-center">
            <h4 className="font-bold text-sm mb-2">
              {lang === "de"
                ? "Lektion wirklich abbrechen?"
                : "确定中途退出当前微课？"}
            </h4>
            <p className="text-xs text-[var(--ink-muted)] font-mono mb-4 leading-relaxed">
              {lang === "de"
                ? "Dein aktueller Fortschritt dieser Sitzung geht verloren."
                : "尚未保存的进度将会丢失，建议一鼓作气完成今日微课！"}
            </p>
            <div className="flex items-center gap-2 justify-center">
              <button
                type="button"
                onClick={() => setShowExitConfirm(false)}
                className="px-4 py-1.5 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border border-[var(--ink)] active:translate-y-[1px] cursor-pointer"
              >
                {lang === "de" ? "Weitermachen" : "继续学习"}
              </button>
              <button
                type="button"
                onClick={() => {
                  if (typeof window !== "undefined" && window.localStorage) {
                    window.localStorage.removeItem(sessionKey);
                  }
                  onClose();
                }}
                className="px-4 py-1.5 border border-[var(--line)] text-xs font-mono hover:border-[var(--ink)] active:translate-y-[1px] cursor-pointer"
              >
                {lang === "de" ? "Beenden" : "确认退出"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 搭载知识笔记抽屉 (Wissensnotiz-Schublade) */}
      {showNoteDrawer && distilled.attachedNote && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-end">
          <div className="w-full max-w-lg bg-[var(--paper)] text-[var(--ink)] h-full border-l-2 border-[var(--ink)] flex flex-col overflow-hidden">
            {/* 抽屉头部 */}
            <div className="p-4 border-b border-[var(--line)] bg-[var(--paper-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
                  {distilled.attachedNote.fach}
                </span>
                <h4 className="font-bold text-xs sm:text-sm tracking-tight truncate max-w-[220px]">
                  {distilled.attachedNote.title}
                </h4>
              </div>
              <div className="flex items-center gap-2">
                {/* 一键复制小抄到剪贴板 */}
                <button
                  type="button"
                  onClick={() => {
                    if (navigator.clipboard) {
                      const noteMd = [
                        `---`,
                        `fach: ${distilled.attachedNote!.fach}`,
                        `thema: "${distilled.attachedNote!.title}"`,
                        `operatoren: [${(distilled.attachedNote!.operatoren || []).join(", ")}]`,
                        `klausurrelevant: true`,
                        `tags: [${(distilled.attachedNote!.tags || []).join(", ")}]`,
                        `---`,
                        ``,
                        `# ${distilled.attachedNote!.title}`,
                        ``,
                        `## 1. Feynman-Essenz`,
                        distilled.attachedNote!.feynmanSummaryZH,
                        ``,
                        `## 2. Klausur-Lösungsansatz`,
                        distilled.attachedNote!.methodSnippetZH,
                        ``,
                        `## 3. 15 NP Klausursatz`,
                        `> ${distilled.attachedNote!.klausurSatzbausteinDE}`,
                        ``,
                        `## 4. Typische Klausurfallen`,
                        ...distilled.fehlerquellen.map(
                          (f) => `- **${f.trapTitleDE}**: ${f.trapDescriptionZH} (Lösung: ${f.howToAvoidDE})`
                        ),
                      ].join("\n");
                      navigator.clipboard.writeText(noteMd);
                      setCopiedNote(true);
                      setTimeout(() => setCopiedNote(false), 2000);
                    }
                  }}
                  className="px-2 py-1 border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--paper)] text-[11px] font-mono transition-colors cursor-pointer"
                  title={
                    lang === "de"
                      ? "Notiz als Markdown kopieren"
                      : "一键复制完整笔记"
                  }
                >
                  {copiedNote
                    ? lang === "de"
                      ? "[Kopiert!]"
                      : "[已复制!]"
                    : lang === "de"
                    ? "[Kopieren]"
                    : "[复制小抄]"}
                </button>
                {/* 关闭抽屉按钮 */}
                <button
                  type="button"
                  onClick={() => setShowNoteDrawer(false)}
                  className="p-1 border border-[var(--line)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer"
                  title={lang === "de" ? "Schließen" : "关闭抽屉"}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                    style={{
                      transformOrigin: "8px 8px",
                      transformBox: "view-box",
                    }}
                  >
                    <path d="M4 4l8 8M12 4l-8 8" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 抽屉滚动内容 */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 text-xs leading-relaxed">
              {/* 1. 费曼大白话 · 核心概念 */}
              <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)]">
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-1">
                  [ {lang === "de" ? "1. Feynman-Essenz" : "1. 费曼核心概念白话"} ]
                </div>
                <p className="font-medium text-[var(--ink)]">
                  {distilled.attachedNote.feynmanSummaryZH}
                </p>
              </div>

              {/* 2. 辩证双轨 · 考场争议点 */}
              {distilled.twoBrillen && (
                <div className="border border-[var(--line)] p-3 bg-[var(--paper)]">
                  <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-1">
                    [ {lang === "de" ? "2. Zwei Brillen & Kontroverse" : "2. 两副眼镜与考点争议"} ]
                  </div>
                  <div className="space-y-1.5 text-[11px] text-[var(--ink)]">
                    <div>
                      <span className="font-bold">
                        {lang === "de"
                          ? distilled.twoBrillen.perspectiveA.titleDE
                          : distilled.twoBrillen.perspectiveA.titleZH}
                        :
                      </span>{" "}
                      <span>
                        {lang === "de"
                          ? distilled.twoBrillen.perspectiveA.corePointDE
                          : distilled.twoBrillen.perspectiveA.corePointZH}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold">
                        {lang === "de"
                          ? distilled.twoBrillen.perspectiveB.titleDE
                          : distilled.twoBrillen.perspectiveB.titleZH}
                        :
                      </span>{" "}
                      <span>
                        {lang === "de"
                          ? distilled.twoBrillen.perspectiveB.corePointDE
                          : distilled.twoBrillen.perspectiveB.corePointZH}
                      </span>
                    </div>
                    <div className="pt-1 text-[10px] text-[var(--ink-muted)] border-t border-[var(--line)]">
                      {lang === "de"
                        ? distilled.twoBrillen.synthesisDE
                        : distilled.twoBrillen.synthesisZH}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. 解题三步法 */}
              <div className="border border-[var(--line)] p-3 bg-[var(--paper)]">
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-2">
                  [ {lang === "de" ? "3. Klausur-Lösungsansatz" : "3. 考场解题三步法"} ]
                </div>
                <p className="font-mono text-[11px] text-[var(--ink)]">
                  {distilled.attachedNote.methodSnippetZH}
                </p>
              </div>

              {/* 4. 15 NP 极品答题句式库 */}
              <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)]">
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-2">
                  [ {lang === "de" ? "4. 15 NP Klausur-Formulierungen" : "4. 满分采分点德语高频句式"} ]
                </div>
                <div className="p-2 border border-[var(--line)] bg-[var(--paper)] font-mono text-[11px] text-[var(--ink)] leading-snug">
                  &ldquo;{distilled.attachedNote.klausurSatzbausteinDE}&rdquo;
                </div>
              </div>

              {/* 5. 常见失分雷区 */}
              <div className="border border-dashed border-[var(--line)] p-3 bg-[var(--paper)]">
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-2">
                  [ {lang === "de" ? "5. Typische Klausur-Fallen" : "5. 常见失分雷区与对策"} ]
                </div>
                <ul className="list-disc list-inside space-y-1.5 text-[11px] text-[var(--ink)]">
                  {distilled.fehlerquellen.map((f, fIdx) => (
                    <li key={fIdx}>
                      <span className="font-bold">{f.trapTitleDE}: </span>
                      <span>
                        {lang === "de" ? f.trapDescriptionDE : f.trapDescriptionZH}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
