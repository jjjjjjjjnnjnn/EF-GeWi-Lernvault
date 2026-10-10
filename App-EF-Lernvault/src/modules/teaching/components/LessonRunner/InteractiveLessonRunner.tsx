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
} from "../GenericMicroWorlds";

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
  const [activeStudyMateProbe, setActiveStudyMateProbe] = useState<
    "simpler" | "deeper" | "quiz" | null
  >(null);
  const [showQuizAnswer, setShowQuizAnswer] = useState(false);

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
    isFinished,
    sessionKey,
  ]);

  const currentStep: LessonStep = steps[currentStepIndex] || steps[0];
  const progressPercent = Math.round((currentStepIndex / steps.length) * 100);

  // 选项选择与核验
  const handleSelectOption = (option: LessonOption) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(option.id);
  };

  // Phase 1 Step 1: 新知精讲微课学习完毕，推进到 Step 2 动手实验
  const handleAdvanceLecture = () => {
    setActiveStudyMateProbe(null);
    setShowQuizAnswer(false);
    setAccumulatedXp((prev) => prev + currentStep.xpReward);
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

  // Phase 1 Step 2: 动手探究实验完成，进入 Phase 2 考场挑战
  const handleAdvanceMicroWorld = () => {
    setActiveStudyMateProbe(null);
    setShowQuizAnswer(false);
    setComboCount((prev) => Math.max(1, prev + 1));
    setAccumulatedXp((prev) => prev + currentStep.xpReward);
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

    if (!selectedOptionId) return;

    const selectedOpt = currentStep.options?.find((o) => o.id === selectedOptionId);
    if (!selectedOpt) return;

    setIsAnswerChecked(true);
    if (selectedOpt.isCorrect) {
      setIsCorrect(true);
      setComboCount((prev) => prev + 1);
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
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
    setActiveStudyMateProbe(null);
    setShowQuizAnswer(false);
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
      setIsCorrect(false);
      setActiveFeedback(null);
    } else {
      // 5 步全部达成，进入胜利结算屏
      setIsFinished(true);
      onComplete(questNode.id, accumulatedXp, mistakes);
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
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setActiveFeedback(null);
    setActiveStudyMateProbe(null);
    setShowQuizAnswer(false);
    setShowNoteDrawer(false);
    setComboCount(0);
    setAccumulatedXp(0);
    setMistakes([]);
    setIsFinished(false);
  };

  // 动态渲染微世界
  const renderEmbeddedMicroWorld = () => {
    switch (questNode.interactiveType) {
      case "dilemma_balance":
      case "ethik-waage":
        return <DilemmaBalanceScale title={questNode.title} lang={lang} />;
      case "logic_blocks":
        return <LogicBlockBuilder title={questNode.title} lang={lang} />;
      case "scenario_tree":
      case "dilemma-theatre":
        return <ScenarioDecisionTree title={questNode.title} lang={lang} />;
      case "variable_slider":
      case "tangent-slider":
      case "magisches-viereck":
      default:
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
          lang={lang}
          onContinue={onClose}
          onReviewQuest={handleReviewQuest}
        />
      </div>
    );
  }

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
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-2xl mx-auto w-full flex flex-col justify-start">
        <div className="border border-[var(--line)] p-5 sm:p-7 bg-[var(--paper)]">
          {/* 步骤类别徽章与阶段说明 */}
          <div className="flex items-center justify-between mb-3 border-b border-[var(--line)] pb-2">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)] font-bold">
                {currentStep.phase === "learn"
                  ? currentStep.type === "lecture"
                    ? lang === "de"
                      ? "Theorie-Vorlesung"
                      : "新知精讲"
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
          <h3 className="text-base sm:text-lg font-bold mb-4 tracking-tight leading-snug">
            {lang === "de" ? currentStep.promptDE : currentStep.promptZH}
          </h3>

          {/* 1. 若为第一阶段：新知精讲微课 (Phase 1 Lecture) */}
          {currentStep.type === "lecture" && currentStep.lecturePayload && (
            <div className="flex flex-col gap-4 text-xs leading-relaxed">
              {/* A. 战役情景剧情与角色代入 (Story Hook & Drama) */}
              {currentStep.lecturePayload.storyHook && (
                <div className="border border-[var(--ink)] bg-[var(--paper-subtle)] p-3.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-[10px] uppercase font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
                      [ {lang === "de" ? "Story-Szenario & Rolle" : "战役情境与角色代入"} ]
                    </span>
                    <span className="font-mono text-[10px] font-bold text-[var(--ink)] border border-[var(--line)] px-2 py-0.5 bg-[var(--paper)]">
                      {lang === "de"
                        ? currentStep.lecturePayload.storyHook.roleDE
                        : currentStep.lecturePayload.storyHook.roleZH}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--ink)] leading-snug font-serif border-l-2 border-[var(--ink)] pl-2 my-1.5 bg-[var(--paper)] py-1">
                    {lang === "de"
                      ? currentStep.lecturePayload.storyHook.scenarioDE
                      : currentStep.lecturePayload.storyHook.scenarioZH}
                  </p>
                </div>
              )}

              {/* B. 费曼大白话 · 一句话本质 (Feynman-Klartext) */}
              {currentStep.lecturePayload.feynmanExplanation && (
                <div className="border-l-2 border-[var(--ink)] bg-[var(--paper-subtle)] p-3.5">
                  <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-1">
                    [ {lang === "de" ? "Feynman-Klartext · Die Essenz" : "费曼大白话 · 一句话本质"} ]
                  </div>
                  <div className="font-bold text-xs sm:text-sm text-[var(--ink)] mb-1 leading-snug">
                    {lang === "de"
                      ? currentStep.lecturePayload.feynmanExplanation.summaryDE
                      : currentStep.lecturePayload.feynmanExplanation.summaryZH}
                  </div>
                </div>
              )}

              {/* C. 生活心智模型与现象引言 (Alltagsphänomen & Hook) */}
              <div className="border border-[var(--line)] bg-[var(--paper)] p-3.5">
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-1">
                  [ {lang === "de" ? "Denkmodell & Phänomen" : "生活心智模型与现象直觉"} ]
                </div>
                <div className="font-bold text-xs mb-1 text-[var(--ink)]">
                  {currentStep.lecturePayload.analogyTitle}
                </div>
                <p className="text-[11px] text-[var(--ink)]">
                  {lang === "de"
                    ? currentStep.lecturePayload.analogyExplanationDE
                    : currentStep.lecturePayload.analogyExplanationZH}
                </p>
              </div>

              {/* D. 辩证双轨 · 两副眼镜对照 (Zwei Brillen / Kontroverse) */}
              {currentStep.lecturePayload.twoBrillen && (
                <div className="border border-[var(--line)] p-3.5 bg-[var(--paper)]">
                  <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-2.5 flex items-center justify-between">
                    <span>
                      [ {lang === "de" ? "Zwei Brillen · Dialektischer Kontrast" : "辩证双轨 · 两副眼镜视角"} ]
                    </span>
                    <span className="text-[10px] font-mono text-[var(--ink-muted)]">
                      {lang === "de" ? "Perspektivenwechsel" : "正反辩证"}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2.5">
                    {/* Brille A */}
                    <div className="border border-[var(--line)] p-2.5 bg-[var(--paper-subtle)] flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-xs mb-1 text-[var(--ink)]">
                          {lang === "de"
                            ? currentStep.lecturePayload.twoBrillen.perspectiveA.titleDE
                            : currentStep.lecturePayload.twoBrillen.perspectiveA.titleZH}
                        </div>
                        <p className="text-[11px] text-[var(--ink)] leading-snug">
                          {lang === "de"
                            ? currentStep.lecturePayload.twoBrillen.perspectiveA.corePointDE
                            : currentStep.lecturePayload.twoBrillen.perspectiveA.corePointZH}
                        </p>
                      </div>
                    </div>
                    {/* Brille B */}
                    <div className="border border-[var(--line)] p-2.5 bg-[var(--paper-subtle)] flex flex-col justify-between">
                      <div>
                        <div className="font-bold text-xs mb-1 text-[var(--ink)]">
                          {lang === "de"
                            ? currentStep.lecturePayload.twoBrillen.perspectiveB.titleDE
                            : currentStep.lecturePayload.twoBrillen.perspectiveB.titleZH}
                        </div>
                        <p className="text-[11px] text-[var(--ink)] leading-snug">
                          {lang === "de"
                            ? currentStep.lecturePayload.twoBrillen.perspectiveB.corePointDE
                            : currentStep.lecturePayload.twoBrillen.perspectiveB.corePointZH}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* 合题综述 */}
                  <div className="p-2 border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] text-[11px] text-[var(--ink)]">
                    <span className="font-bold font-mono text-[10px]">
                      [ {lang === "de" ? "Synthese / Abwägung" : "合题辩证"} ]:
                    </span>{" "}
                    {lang === "de"
                      ? currentStep.lecturePayload.twoBrillen.synthesisDE
                      : currentStep.lecturePayload.twoBrillen.synthesisZH}
                  </div>
                </div>
              )}

              {/* E. 考纲核心专业术语矩阵卡片 (KLP-Fachbegriffe) */}
              <div className="border border-[var(--line)] p-3.5 bg-[var(--paper)]">
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-2">
                  [ {lang === "de" ? "KLP-Fachbegriffe & Definitionen" : "考纲核心专业术语与规范定义"} ]
                </div>
                <div className="flex flex-col gap-2.5">
                  {currentStep.lecturePayload.klpTermini.map((term, tIdx) => (
                    <div
                      key={tIdx}
                      className="border border-[var(--line)] p-2.5 bg-[var(--paper-subtle)]"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs">
                          {term.termDE}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                          {term.termZH}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--ink)] leading-snug">
                        {lang === "de" ? term.definitionDE : term.definitionZH}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* F. 底层因果运行链推演 (Kausalkette) */}
              <div className="border border-[var(--line)] p-3.5 bg-[var(--paper)]">
                <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-2">
                  [ {lang === "de" ? "Kausalkette & Mechanismus" : "底层因果运行机制推演链"} ]
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                  {(lang === "de"
                    ? currentStep.lecturePayload.causalChainDE
                    : currentStep.lecturePayload.causalChainZH
                  ).map((stepText, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="px-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <span className="flex-1 text-[var(--ink)]">
                        {stepText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* G. 趣味历史轶事与真实冷知识 (Fun-Fact & Anekdote) */}
              {currentStep.lecturePayload.funFact && (
                <div className="border border-[var(--line)] p-3.5 bg-[var(--paper-subtle)]">
                  <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink-muted)] mb-1">
                    [ {lang === "de" ? "Anekdote & Fun-Fact" : "趣味历史轶事 & 冷知识"} ]
                  </div>
                  <div className="font-bold text-xs mb-1 text-[var(--ink)]">
                    {lang === "de"
                      ? currentStep.lecturePayload.funFact.titleDE
                      : currentStep.lecturePayload.funFact.titleZH}
                  </div>
                  <p className="text-[11px] text-[var(--ink)] leading-relaxed">
                    {lang === "de"
                      ? currentStep.lecturePayload.funFact.factDE
                      : currentStep.lecturePayload.funFact.factZH}
                  </p>
                </div>
              )}

              {/* H. Study-Mate 三维自适应调频探针 (Adaptive Probes: [Einfacher] [Vertiefung] [Check]) */}
              {currentStep.lecturePayload.studyMateProbes && (
                <div className="border border-[var(--ink)] p-3.5 bg-[var(--paper)]">
                  <div className="font-mono text-[10px] uppercase font-bold text-[var(--ink)] mb-2 flex items-center justify-between">
                    <span>
                      [ Study-Mate {lang === "de" ? "Interaktive Sonden" : "互动调频探针"} ]
                    </span>
                    <span className="text-[10px] font-mono text-[var(--ink-muted)]">
                      {lang === "de" ? "Wähle deine Ebene" : "按需点击探究"}
                    </span>
                  </div>
                  {/* 三个探针按钮 */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStudyMateProbe(
                          activeStudyMateProbe === "simpler" ? null : "simpler"
                        );
                      }}
                      className={`px-2.5 py-1 text-xs font-mono border transition-all cursor-pointer ${
                        activeStudyMateProbe === "simpler"
                          ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold"
                          : "bg-[var(--paper-subtle)] border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)]"
                      }`}
                    >
                      [ {lang === "de" ? "Einfacher / Klartext" : "这里没懂 · 费曼白话"} ]
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStudyMateProbe(
                          activeStudyMateProbe === "deeper" ? null : "deeper"
                        );
                      }}
                      className={`px-2.5 py-1 text-xs font-mono border transition-all cursor-pointer ${
                        activeStudyMateProbe === "deeper"
                          ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold"
                          : "bg-[var(--paper-subtle)] border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)]"
                      }`}
                    >
                      [ {lang === "de" ? "Vertiefung / Edge Case" : "太简单了 · 极客反例"} ]
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (activeStudyMateProbe === "quiz") {
                          setActiveStudyMateProbe(null);
                          setShowQuizAnswer(false);
                        } else {
                          setActiveStudyMateProbe("quiz");
                          setShowQuizAnswer(false);
                        }
                      }}
                      className={`px-2.5 py-1 text-xs font-mono border transition-all cursor-pointer ${
                        activeStudyMateProbe === "quiz"
                          ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold"
                          : "bg-[var(--paper-subtle)] border-[var(--line)] hover:border-[var(--ink)] text-[var(--ink)]"
                      }`}
                    >
                      [ {lang === "de" ? "Check / Schnelltest" : "考考我 · 现场快测"} ]
                    </button>
                  </div>

                  {/* 探针展开卡片 */}
                  {activeStudyMateProbe === "simpler" && (
                    <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs leading-relaxed animate-fadeIn">
                      <div className="font-bold font-mono text-[10px] text-[var(--ink-muted)] mb-1">
                        [ {lang === "de" ? "Feynman-Abstraktion senken" : "通俗生活类比与大白话"} ]
                      </div>
                      <p className="text-[11px] text-[var(--ink)] font-medium leading-relaxed">
                        {lang === "de"
                          ? currentStep.lecturePayload.studyMateProbes.simplerHintDE
                          : currentStep.lecturePayload.studyMateProbes.simplerHintZH}
                      </p>
                    </div>
                  )}

                  {activeStudyMateProbe === "deeper" && (
                    <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs leading-relaxed animate-fadeIn">
                      <div className="font-bold font-mono text-[10px] text-[var(--ink-muted)] mb-1">
                        [ {lang === "de" ? "Kritischer Grenzfall & Paradoxon" : "现实极端反例与批判质问"} ]
                      </div>
                      <p className="text-[11px] text-[var(--ink)] font-medium leading-relaxed">
                        {lang === "de"
                          ? currentStep.lecturePayload.studyMateProbes.deeperChallengeDE
                          : currentStep.lecturePayload.studyMateProbes.deeperChallengeZH}
                      </p>
                    </div>
                  )}

                  {activeStudyMateProbe === "quiz" && (
                    <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs leading-relaxed animate-fadeIn">
                      <div className="font-bold font-mono text-[10px] text-[var(--ink-muted)] mb-1">
                        [ {lang === "de" ? "Sofortige Verständniskontrolle" : "核心得分点现场快测"} ]
                      </div>
                      <p className="mb-2 text-[var(--ink)] font-semibold">
                        {lang === "de"
                          ? currentStep.lecturePayload.studyMateProbes.quizQuestionDE
                          : currentStep.lecturePayload.studyMateProbes.quizQuestionZH}
                      </p>
                      {!showQuizAnswer ? (
                        <button
                          type="button"
                          onClick={() => setShowQuizAnswer(true)}
                          className="px-2.5 py-1 text-[11px] font-mono border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--ink)] hover:text-[var(--paper)] cursor-pointer transition-colors"
                        >
                          [ {lang === "de" ? "Antwort einblenden" : "查看参考答案与关键采分点"} ]
                        </button>
                      ) : (
                        <div className="border-t border-[var(--line)] pt-2 text-[11px] text-[var(--ink)]">
                          <span className="font-bold font-mono text-[10px]">
                            [ {lang === "de" ? "Musterantwort: " : "标准答法: "} ]
                          </span>
                          <p className="mt-1">
                            {lang === "de"
                              ? currentStep.lecturePayload.studyMateProbes.quizAnswerDE
                              : currentStep.lecturePayload.studyMateProbes.quizAnswerZH}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* I. 苏格拉底导学引思 (Sokratischer Denkanstoß) */}
              <div className="border border-dashed border-[var(--ink)] p-3 bg-[var(--paper-subtle)] font-mono text-xs">
                <span className="font-bold">
                  {lang === "de" ? "Sokratische Leitfrage: " : "实验探索思考指引："}
                </span>
                <span>
                  {lang === "de"
                    ? currentStep.lecturePayload.socraticPromptDE
                    : currentStep.lecturePayload.socraticPromptZH}
                </span>
              </div>
            </div>
          )}

          {/* 2. 若为第一阶段：动手探究实验微世界 (Phase 1 MicroWorld) */}
          {currentStep.type === "microworld" && (
            <div className="flex flex-col gap-4">
              {/* 实验任务指南 */}
              <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono leading-relaxed">
                <div className="font-bold text-[var(--ink)] mb-0.5">
                  [ {lang === "de" ? "Forschungsauftrag & Entdeckungsaufgabe" : "实验探究任务与操作指引"} ]
                </div>
                <div className="text-[var(--ink)]">
                  {lang === "de"
                    ? currentStep.microWorldPayload?.missionPromptDE
                    : currentStep.microWorldPayload?.missionPromptZH}
                </div>
                <div className="text-[10px] text-[var(--ink-muted)] mt-1">
                  {lang === "de" ? "Zielkriterium: " : "达成指标："}
                  {lang === "de"
                    ? currentStep.microWorldPayload?.targetCriteriaDE
                    : currentStep.microWorldPayload?.targetCriteriaZH}
                </div>
              </div>

              {/* 活体仿真教具画布 */}
              <div className="border border-[var(--line)] p-3 bg-[var(--paper)]">
                {renderEmbeddedMicroWorld()}
              </div>

              {/* 实验规律备忘录 */}
              {currentStep.microWorldPayload?.learningTakeawayDE && (
                <div className="p-2.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[11px] font-mono leading-relaxed">
                  <span className="font-bold">
                    {lang === "de" ? "Labor-Notiz: " : "实验规律备忘："}
                  </span>
                  <span>
                    {lang === "de"
                      ? currentStep.microWorldPayload.learningTakeawayDE
                      : currentStep.microWorldPayload.learningTakeawayZH}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 3. 若为第二阶段：考场闯关与达标实测 (Phase 2 Challenge Cards) */}
          {currentStep.type !== "lecture" &&
            currentStep.type !== "microworld" && (
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
                        {lang === "de" ? opt.textDE : opt.textZH}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
        </div>
      </main>

      {/* 底部即时操作与反馈栏 */}
      <footer className="border-t border-[var(--line)] p-4 sm:px-8 bg-[var(--paper)]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* 即时反馈文本 */}
          <div className="text-xs font-mono flex-1">
            {/* 新知精讲微课底部提示 */}
            {currentStep.type === "lecture" && (
              <span className="text-[var(--ink-muted)]">
                {lang === "de"
                  ? "Lies das Konzept aufmerksam durch und gehe zum interaktiven Experiment."
                  : "掌握上述考纲新知与因果机理，准备进入下一步动手实验。"}
              </span>
            )}

            {/* 动手实验底部提示 */}
            {currentStep.type === "microworld" && (
              <span className="text-[var(--ink-muted)]">
                {lang === "de"
                  ? "Bediene die Parameter oben, um die Systemeffekte praktisch zu erfahren."
                  : "在上方教具中动手操作，观察因果反应，随后进入考场挑战。"}
              </span>
            )}

            {/* 答题阶段即时反馈 */}
            {currentStep.type !== "lecture" &&
              currentStep.type !== "microworld" && (
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
                        {activeFeedback}
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
            {/* Step 1 Lecture 操作按钮 */}
            {currentStep.type === "lecture" ? (
              <button
                type="button"
                onClick={handleAdvanceLecture}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border-2 border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {lang === "de"
                    ? "Konzept verstanden -> Weiter zum Experiment"
                    : "我已理解核心机理 -> 进入互动实验探索"}
                </span>
                <span aria-hidden="true">-&gt;</span>
              </button>
            ) : currentStep.type === "microworld" ? (
              /* Step 2 MicroWorld 操作按钮 */
              <button
                type="button"
                onClick={handleAdvanceMicroWorld}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border-2 border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>
                  {lang === "de"
                    ? "Experiment abgeschlossen -> Jetzt zur Challenge"
                    : "动手实验探究完毕 -> 前往考场通关挑战"}
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
