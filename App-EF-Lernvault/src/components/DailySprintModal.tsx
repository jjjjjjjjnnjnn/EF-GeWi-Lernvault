import React, { useState, useEffect } from "react";
import type { VaultCard, VaultNote } from "../vault/parser";
import {
  buildDailySprint,
  recordStudySprintCompleted,
  getStudyStreak,
  type DailySprintSession,
} from "../engine/dailyMix";
import { gradeCard, type Rating } from "../scheduler";
import { MasteryEngine } from "../engine/mastery";

interface DailySprintModalProps {
  cards: VaultCard[];
  notes: VaultNote[];
  currentFach: string;
  isOpen: boolean;
  onClose: () => void;
}

export const DailySprintModal: React.FC<DailySprintModalProps> = ({
  cards,
  notes,
  currentFach,
  isOpen,
  onClose,
}) => {
  const [session, setSession] = useState<DailySprintSession | null>(null);
  const [stepIndex, setStepIndex] = useState<number>(0); // 0: cards, 1: quiz, 2: vergleich, 3: summary
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [showCardBack, setShowCardBack] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<string>("");
  const [vergleichAnswer, setVergleichAnswer] = useState<string>("");
  const [secondsRemaining, setSecondsRemaining] = useState<number>(15 * 60);
  const [streakData, setStreakData] = useState(() => getStudyStreak());

  useEffect(() => {
    if (isOpen) {
      const s = buildDailySprint(cards, notes, currentFach);
      setSession(s);
      setStepIndex(0);
      setCardIndex(0);
      setShowCardBack(false);
      setQuizAnswer("");
      setVergleichAnswer("");
      setSecondsRemaining(15 * 60);
      setStreakData(getStudyStreak());
    }
  }, [isOpen, cards, notes, currentFach]);

  // 15分钟极速倒计时
  useEffect(() => {
    if (!isOpen || stepIndex === 3) return;
    const timer = setInterval(() => {
      setSecondsRemaining((sec) => (sec > 0 ? sec - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, stepIndex]);

  if (!isOpen || !session) return null;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleCardRate = (rating: Rating) => {
    const currentCard = session.cards[cardIndex];
    if (currentCard) {
      gradeCard(currentCard.id, rating);
    }
    setShowCardBack(false);
    if (cardIndex + 1 < session.cards.length) {
      setCardIndex(cardIndex + 1);
    } else {
      // 卡片复习完毕，进入诊断题
      setStepIndex(1);
    }
  };

  const handleCompleteSprint = () => {
    // 记录掌握度与打卡天数
    const mastery = new MasteryEngine();
    if (quizAnswer.trim().length > 10) {
      mastery.recordAttempt(
        session.diagnosticQuiz.id,
        session.diagnosticQuiz.thema,
        session.diagnosticQuiz.fach,
        true
      );
    }
    const updated = recordStudySprintCompleted();
    setStreakData(updated);
    setStepIndex(3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 font-sans text-stone-800 dark:text-stone-200">
      <div className="w-full max-w-2xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-lg shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* 顶部标题栏与进度 */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-800/40">
          <div className="flex items-center gap-3">
            <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100">
              Heute lernen (15-Min-Sprint)
            </span>
            <span className="font-mono text-xs text-stone-500">
              {stepIndex === 0 && `Teil 1/3: Wortschatz (${cardIndex + 1}/${session.cards.length})`}
              {stepIndex === 1 && "Teil 2/3: Diagnose-Frage"}
              {stepIndex === 2 && "Teil 3/3: Konzept-Vergleich"}
              {stepIndex === 3 && "Sprint abgeschlossen!"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs px-2 py-0.5 border border-stone-300 dark:border-stone-700 rounded bg-white dark:bg-stone-900">
              ⏳ {formatTimer(secondsRemaining)}
            </span>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 text-lg leading-none"
            >
              ✕
            </button>
          </div>
        </div>

        {/* 步骤条 */}
        <div className="w-full bg-stone-200 dark:bg-stone-800 h-1">
          <div
            className="bg-stone-800 dark:bg-stone-200 h-1 transition-all duration-300"
            style={{ width: `${((stepIndex + 1) / 4) * 100}%` }}
          />
        </div>

        {/* 正文区域 */}
        <div className="p-6 flex-1 overflow-y-auto space-y-4">
          {/* Step 0: 卡片快速复习 */}
          {stepIndex === 0 && session.cards[cardIndex] && (
            <div className="space-y-4">
              <div className="border border-stone-200 dark:border-stone-800 rounded p-6 bg-stone-50 dark:bg-stone-900/50 min-h-[180px] flex flex-col justify-center items-center text-center">
                <span className="text-[10px] font-mono text-stone-400 uppercase tracking-widest block mb-2">
                  {session.cards[cardIndex].thema} ({session.cards[cardIndex].fach})
                </span>
                <p className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  {session.cards[cardIndex].front}
                </p>

                {showCardBack ? (
                  <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 w-full space-y-2">
                    <p className="font-sans text-base text-stone-800 dark:text-stone-200">
                      {session.cards[cardIndex].back}
                    </p>
                    {session.cards[cardIndex].example && (
                      <p className="font-serif italic text-xs text-stone-500">
                        {session.cards[cardIndex].example}
                      </p>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCardBack(true)}
                    className="mt-6 px-4 py-1.5 border border-stone-300 dark:border-stone-700 rounded text-xs font-mono hover:bg-stone-200 dark:hover:bg-stone-800"
                  >
                    Antwort zeigen (Leertaste)
                  </button>
                )}
              </div>

              {showCardBack && (
                <div className="grid grid-cols-4 gap-2 pt-2">
                  <button
                    onClick={() => handleCardRate(1)}
                    className="py-1.5 border border-red-300 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 text-xs font-mono rounded"
                  >
                    Nochmal (1)
                  </button>
                  <button
                    onClick={() => handleCardRate(2)}
                    className="py-1.5 border border-amber-300 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 text-amber-800 dark:text-amber-300 text-xs font-mono rounded"
                  >
                    Schwer (2)
                  </button>
                  <button
                    onClick={() => handleCardRate(3)}
                    className="py-1.5 border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-mono rounded"
                  >
                    Gut (3)
                  </button>
                  <button
                    onClick={() => handleCardRate(4)}
                    className="py-1.5 border border-emerald-300 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono rounded"
                  >
                    Einfach (4)
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 1: 核心概念诊断题 */}
          {stepIndex === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                  Thema: {session.diagnosticQuiz.thema}
                </span>
                <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                  {session.diagnosticQuiz.questionDE}
                </h3>
                <p className="text-xs text-stone-500">
                  💡 {session.diagnosticQuiz.guidanceZH}
                </p>
              </div>

              <textarea
                value={quizAnswer}
                onChange={(e) => setQuizAnswer(e.target.value)}
                placeholder="Stichpunkte oder Formulierung in deutscher Fachsprache eingeben..."
                className="w-full h-32 p-3 border border-stone-300 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800/40 text-xs font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-stone-500"
              />

              <div className="flex justify-end">
                <button
                  onClick={() => setStepIndex(2)}
                  className="px-4 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded font-semibold text-xs hover:opacity-90"
                >
                  Weiter zum Konzept-Vergleich →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 概念对比题 */}
          {stepIndex === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
                    {session.vergleich.conceptA}
                  </span>
                  <span className="text-stone-400">vs.</span>
                  <span className="px-2 py-0.5 bg-stone-100 dark:bg-stone-800 rounded border border-stone-300 dark:border-stone-700">
                    {session.vergleich.conceptB}
                  </span>
                </div>
                <h3 className="font-serif text-base font-semibold text-stone-900 dark:text-stone-100">
                  {session.vergleich.promptDE}
                </h3>
                <p className="text-xs text-stone-500">
                  💡 {session.vergleich.promptZH}
                </p>
              </div>

              <textarea
                value={vergleichAnswer}
                onChange={(e) => setVergleichAnswer(e.target.value)}
                placeholder="Gemeinsamkeiten und zentrale Unterschiede kurz gegenüberstellen..."
                className="w-full h-32 p-3 border border-stone-300 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800/40 text-xs font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-stone-500"
              />

              <div className="flex justify-end">
                <button
                  onClick={handleCompleteSprint}
                  className="px-5 py-2 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded font-semibold text-xs hover:opacity-90 shadow-sm"
                >
                  Sprint abschließen & Streak sichern ✓
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 完成页面与打卡连续记录 */}
          {stepIndex === 3 && (
            <div className="text-center py-8 space-y-4">
              <div className="inline-block px-4 py-2 border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 rounded-full font-mono text-sm text-emerald-800 dark:text-emerald-300">
                🎉 Tages-Sprint erfolgreich gemeistert!
              </div>

              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                Lernserie: {streakData.currentStreak} Tage in Folge!
              </h2>

              <p className="text-xs text-stone-600 dark:text-stone-400 max-w-md mx-auto">
                Sie haben heute 4 Vokabeln wiederholt, eine Diagnoseaufgabe bearbeitet und ein zentrales Konzept vertieft.
                Ihre BKT-Wissensbeherrschung wurde aktualisiert.
              </p>

              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900 rounded text-xs font-semibold hover:opacity-90"
                >
                  Zurück zur Übersicht
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
