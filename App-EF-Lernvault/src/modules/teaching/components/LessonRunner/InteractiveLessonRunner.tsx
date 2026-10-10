import React, { useState, useMemo, useEffect } from "react";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";
import { compileLessonSteps, type LessonStep, type LessonOption } from "../../engine/lessonStepFlow";
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

  // 编译生成 5 个多邻国式课步
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
          if (typeof parsed.stepIndex === "number" && parsed.stepIndex < steps.length) {
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
  }, [currentStepIndex, comboCount, accumulatedXp, mistakes, isFinished, sessionKey]);

  const currentStep: LessonStep = steps[currentStepIndex] || steps[0];
  const progressPercent = Math.round((currentStepIndex / steps.length) * 100);

  // 选项选择与核验
  const handleSelectOption = (option: LessonOption) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(option.id);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId && currentStep.type !== "microworld") return;

    if (currentStep.type === "microworld") {
      // 微世界挑战：完成即判定为满分
      setIsCorrect(true);
      setIsAnswerChecked(true);
      setComboCount((prev) => prev + 1);
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
      setActiveFeedback(
        lang === "de"
          ? "Hervorragend experimentiert! Das Wirkungsprinzip wurde praktisch verinnerlicht."
          : "非常棒的探索实践！你已在可动微世界中验证了底层机理。"
      );
      return;
    }

    const selectedOpt = currentStep.options?.find((o) => o.id === selectedOptionId);
    if (!selectedOpt) return;

    setIsAnswerChecked(true);
    if (selectedOpt.isCorrect) {
      setIsCorrect(true);
      setComboCount((prev) => prev + 1);
      setAccumulatedXp((prev) => prev + currentStep.xpReward);
      setActiveFeedback(lang === "de" ? selectedOpt.explanationDE : selectedOpt.explanationZH);
    } else {
      setIsCorrect(false);
      setComboCount(0); // 连击中断
      setMistakes((prev) => [...prev, `${currentStep.titleDE}: ${selectedOpt.textDE}`]);
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
        {/* 退出按钮 */}
        <button
          type="button"
          onClick={() => setShowExitConfirm(true)}
          className="p-1 border border-[var(--line)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer"
          title={lang === "de" ? "Lektion beenden" : "退出本次课程"}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        {/* 增强型 3px 几何阶段刻度进度条 (Step Ticks) */}
        <div className="flex-1 max-w-xl mx-auto flex flex-col gap-1">
          <div className="flex items-center gap-3">
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
            {steps.map((_, sIdx) => (
              <span
                key={sIdx}
                className={`inline-block w-1.5 h-1 border transition-colors ${
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
            <span className="px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] font-bold animate-pulse">
              Combo x{comboCount}
            </span>
          )}
          <span className="text-[var(--ink-muted)]">
            +{accumulatedXp} XP
          </span>
        </div>
      </header>

      {/* 中间核心交互卡片工作区 */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 max-w-2xl mx-auto w-full flex flex-col justify-center">
        <div className="border border-[var(--line)] p-5 sm:p-7 bg-[var(--paper)]">
          {/* 步骤类别徽章 */}
          <div className="flex items-center justify-between mb-3 border-b border-[var(--line)] pb-2">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink-muted)] font-semibold">
              {lang === "de" ? currentStep.titleDE : currentStep.titleZH}
            </span>
            <span className="font-mono text-xs border border-[var(--line)] px-1.5 py-0.5 bg-[var(--paper-subtle)]">
              +{currentStep.xpReward} XP
            </span>
          </div>

          {/* 核心问题引导语 */}
          <h3 className="text-base sm:text-lg font-bold mb-4 tracking-tight leading-snug">
            {lang === "de" ? currentStep.promptDE : currentStep.promptZH}
          </h3>

          {/* 若为微世界动手挑战 */}
          {currentStep.type === "microworld" ? (
            <div className="flex flex-col gap-4">
              <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono leading-relaxed">
                <span className="font-bold">
                  {lang === "de" ? "Interaktionsziel: " : "操作目标："}
                </span>
                <span>
                  {lang === "de"
                    ? currentStep.microWorldPayload?.missionPromptDE
                    : currentStep.microWorldPayload?.missionPromptZH}
                </span>
              </div>
              <div className="border border-[var(--line)] p-3 bg-[var(--paper)]">
                {renderEmbeddedMicroWorld()}
              </div>
            </div>
          ) : (
            /* 若为选择题 / 填空配对题 */
            <div className="flex flex-col gap-2.5">
              {currentStep.options?.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                let optionStyle = "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)]";

                if (isAnswerChecked) {
                  if (opt.isCorrect) {
                    optionStyle = "border-[var(--ink)] bg-[var(--paper-subtle)] ring-1 ring-[var(--ink)] font-semibold";
                  } else if (isSelected && !opt.isCorrect) {
                    optionStyle = "border-dashed border-[var(--ink)] bg-[var(--paper-subtle)] opacity-70";
                  }
                } else if (isSelected) {
                  optionStyle = "border-[var(--ink)] bg-[var(--paper-subtle)] ring-1 ring-[var(--ink)]";
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

      {/* 底部多邻国即时正向反馈栏 */}
      <footer className="border-t border-[var(--line)] p-4 sm:px-8 bg-[var(--paper)]">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* 即时反馈文本 */}
          <div className="text-xs font-mono flex-1">
            {isAnswerChecked && activeFeedback && (
              <div className="flex items-start gap-2 animate-fadeIn">
                <span className="font-bold shrink-0 flex items-center gap-1">
                  {isCorrect ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="inline">
                        <path d="M3.5 8.5l3 3 6-7" />
                      </svg>
                      <span>{lang === "de" ? "Richtig! " : "正确！"}</span>
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className="inline">
                        <path d="M4 4l8 8M12 4l-8 8" />
                      </svg>
                      <span>{lang === "de" ? "Noch nicht ganz: " : "暂未命中: "}</span>
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
                {currentStep.type === "microworld"
                  ? lang === "de" ? "Bediene die Parameter oben und klicke auf Überprüfen." : "动手操作上方教具，完成后点击核验。"
                  : lang === "de" ? "Wähle eine Option aus und klicke auf Überprüfen." : "选择一个选项，点击核验答案。"}
              </span>
            )}
          </div>

          {/* 主动作按钮 */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            {!isAnswerChecked ? (
              <button
                type="button"
                onClick={handleCheckAnswer}
                disabled={!selectedOptionId && currentStep.type !== "microworld"}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {lang === "de" ? "Überprüfen" : "核验答案"}
              </button>
            ) : isCorrect ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="w-full sm:w-auto px-6 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-bold border-2 border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{currentStepIndex + 1 < steps.length ? (lang === "de" ? "Weiter" : "继续下一步") : (lang === "de" ? "Zur Belohnung" : "查看通关战果")}</span>
                <span aria-hidden="true">-&gt;</span>
              </button>
            ) : (
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
              {lang === "de" ? "Lektion wirklich abbrechen?" : "确定中途退出当前微课？"}
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
    </div>
  );
};
