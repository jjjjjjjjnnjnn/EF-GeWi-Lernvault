import React, { useEffect, useId, useState } from "react";
import type { VaultCard, VaultNote } from "../vault/parser";
import { buildDailySprint, recordStudySprintCompleted, getStudyStreak, type DailySprintSession } from "../engine/dailyMix";
import { gradeCard, type Rating } from "../scheduler";
import { MasteryEngine } from "../engine/mastery";
import { t, type Lang } from "../i18n";
import { useDialogFocus } from "./HelpOverlay";

interface DailySprintModalProps {
  cards: VaultCard[];
  notes: VaultNote[];
  currentFach: string;
  isOpen: boolean;
  onClose: () => void;
  lang?: Lang;
}

function Bilingual({ de, zh }: { de: string; zh: string }) {
  return (
    <span className="bilingual">
      <span>{de}</span>
      <span className="zh-translation">{zh}</span>
    </span>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 4.5V8l2.5 1.5" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 7v4M8 4.7v.2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 8.5l3 3L13 4.5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3 8h9M9 4.5L12.5 8 9 11.5" />
    </svg>
  );
}

export const DailySprintModal: React.FC<DailySprintModalProps> = ({
  cards,
  notes,
  currentFach,
  isOpen,
  onClose,
  lang = "de",
}) => {
  const tr = t(lang);
  const [session, setSession] = useState<DailySprintSession | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [cardIndex, setCardIndex] = useState(0);
  const [showCardBack, setShowCardBack] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState("");
  const [vergleichAnswer, setVergleichAnswer] = useState("");
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60);
  const [streakData, setStreakData] = useState(() => getStudyStreak());
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useDialogFocus(isOpen, onClose);

  useEffect(() => {
    if (isOpen) {
      const sprint = buildDailySprint(cards, notes, currentFach);
      setSession(sprint);
      setStepIndex(0);
      setCardIndex(0);
      setShowCardBack(false);
      setQuizAnswer("");
      setVergleichAnswer("");
      setSecondsRemaining(15 * 60);
      setStreakData(getStudyStreak());
    }
  }, [isOpen, cards, notes, currentFach]);

  useEffect(() => {
    if (!isOpen || stepIndex === 3) return;
    const timer = setInterval(() => {
      setSecondsRemaining((seconds) => (seconds > 0 ? seconds - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, stepIndex]);

  if (!isOpen || !session) return null;

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainder.toString().padStart(2, "0")}`;
  };

  const handleCardRate = (rating: Rating) => {
    const currentCard = session.cards[cardIndex];
    if (currentCard) gradeCard(currentCard.id, rating);
    setShowCardBack(false);
    if (cardIndex + 1 < session.cards.length) setCardIndex(cardIndex + 1);
    else setStepIndex(1);
  };

  const handleCompleteSprint = () => {
    const mastery = new MasteryEngine();
    if (quizAnswer.trim().length > 10) {
      mastery.recordAttempt(session.diagnosticQuiz.id, session.diagnosticQuiz.thema, session.diagnosticQuiz.fach, true);
    }
    setStreakData(recordStudySprintCompleted());
    setStepIndex(3);
  };

  const stepLabel =
    stepIndex === 0
      ? `${tr.dailyPartCards}: ${cardIndex + 1}/${session.cards.length}`
      : stepIndex === 1
        ? tr.dailyPartQuiz
        : stepIndex === 2
          ? tr.dailyPartCompare
          : tr.dailyComplete;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay)] p-4 font-sans text-[var(--ink)]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] bg-[var(--paper-subtle)] px-5 py-3">
          <div className="min-w-0">
            <h2 id={titleId} className="de-heading text-lg text-[var(--ink)]">
              {tr.dailyTitle}
              <span className="zh-translation font-sans text-sm font-normal">{tr.dailyTitleZh}</span>
            </h2>
            <p id={descriptionId} className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
              {stepLabel}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2 py-1 font-mono text-[var(--text-meta)] tabular-nums" aria-label={`${tr.dailyRemaining} ${formatTimer(secondsRemaining)}`}>
              <ClockIcon />
              {formatTimer(secondsRemaining)}
            </span>
            <button
              type="button"
              onClick={onClose}
              data-dialog-initial-focus
              aria-label={tr.dailyClose}
              className="rounded-[var(--radius)] p-1 text-[var(--gray)] hover:text-[var(--ink)]"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="h-1 w-full bg-[var(--line)]" aria-hidden="true">
          <div
            className="h-1 bg-[var(--accent)] transition-transform duration-[var(--dur-view)]"
            style={{ width: `${((stepIndex + 1) / 4) * 100}%` }}
          />
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto p-6">
          {stepIndex === 0 && session.cards[cardIndex] && (
            <div className="space-y-4">
              <div className="exam-reading flex min-h-[180px] flex-col items-center justify-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-6 text-center">
                <span className="mb-2 block font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
                  {session.cards[cardIndex].thema} ({session.cards[cardIndex].fach})
                </span>
                <p className="de-heading text-xl text-[var(--ink)]">{session.cards[cardIndex].front}</p>
                {showCardBack ? (
                  <div className="mt-4 w-full space-y-2 border-t border-[var(--line)] pt-4">
                    <p className="font-sans text-base text-[var(--ink)]">{session.cards[cardIndex].back}</p>
                    {session.cards[cardIndex].example && (
                      <p className="de-reading text-xs text-[var(--gray)]">{session.cards[cardIndex].example}</p>
                    )}
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowCardBack(true)}
                    className="mt-6 rounded-[var(--radius)] border border-[var(--line)] px-4 py-1.5 font-mono text-[var(--text-meta)] hover:bg-[var(--paper-subtle)]"
                  >
                    <Bilingual de={tr.dailyShowAnswer} zh={tr.dailyShowAnswerZh} />
                  </button>
                )}
              </div>

              {showCardBack && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-[var(--line)] pt-3 sm:grid-cols-4">
                  <button type="button" onClick={() => handleCardRate(1)} className="border-t border-[var(--warning)] py-1.5 font-mono text-xs text-[var(--warning)]">
                    <Bilingual de={tr.dailyAgain} zh={tr.dailyAgainZh} />
                  </button>
                  <button type="button" onClick={() => handleCardRate(2)} className="border-t border-[var(--line)] py-1.5 font-mono text-xs text-[var(--ink)]">
                    <Bilingual de={tr.dailyHard} zh={tr.dailyHardZh} />
                  </button>
                  <button type="button" onClick={() => handleCardRate(3)} className="border-t border-[var(--line)] py-1.5 font-mono text-xs text-[var(--ink)]">
                    <Bilingual de={tr.dailyGood} zh={tr.dailyGoodZh} />
                  </button>
                  <button type="button" onClick={() => handleCardRate(4)} className="border-t border-[var(--success)] py-1.5 font-mono text-xs text-[var(--success)]">
                    <Bilingual de={tr.dailyEasy} zh={tr.dailyEasyZh} />
                  </button>
                </div>
              )}
            </div>
          )}

          {stepIndex === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="block font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
                  {tr.dailyTopic}: {session.diagnosticQuiz.thema}
                </span>
                <h3 className="de-heading text-lg text-[var(--ink)]">{session.diagnosticQuiz.questionDE}</h3>
                <p className="flex items-start gap-2 font-sans text-xs text-[var(--gray)]">
                  <InfoIcon />
                  <span className="zh-translation mt-0">{session.diagnosticQuiz.guidanceZH}</span>
                </p>
              </div>
              <textarea
                value={quizAnswer}
                onChange={(event) => setQuizAnswer(event.target.value)}
                placeholder={tr.dailyAnswerPlaceholder}
                aria-label={tr.dailyAnswerLabel}
                className="de-reading h-32 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 text-sm leading-relaxed text-[var(--ink)]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStepIndex(2)}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--accent)] px-4 py-1.5 text-xs text-[var(--accent)] hover:bg-[var(--paper-subtle)]"
                >
                  <Bilingual de={tr.dailyContinue} zh={tr.dailyContinueZh} />
                  <ArrowIcon />
                </button>
              </div>
            </div>
          )}

          {stepIndex === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
                  <span className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-2 py-0.5">{session.vergleich.conceptA}</span>
                  <span className="text-[var(--gray)]">{tr.dailyVersus}</span>
                  <span className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-2 py-0.5">{session.vergleich.conceptB}</span>
                </div>
                <h3 className="de-heading text-lg text-[var(--ink)]">{session.vergleich.promptDE}</h3>
                <p className="flex items-start gap-2 font-sans text-xs text-[var(--gray)]">
                  <InfoIcon />
                  <span className="zh-translation mt-0">{session.vergleich.promptZH}</span>
                </p>
              </div>
              <textarea
                value={vergleichAnswer}
                onChange={(event) => setVergleichAnswer(event.target.value)}
                placeholder={tr.dailyComparePlaceholder}
                aria-label={tr.dailyCompareLabel}
                className="de-reading h-32 w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 text-sm leading-relaxed text-[var(--ink)]"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCompleteSprint}
                  className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--accent)] px-5 py-2 text-xs text-[var(--accent)] hover:bg-[var(--paper-subtle)]"
                >
                  <CheckIcon />
                  <Bilingual de={tr.dailyFinish} zh={tr.dailyFinishZh} />
                </button>
              </div>
            </div>
          )}

          {stepIndex === 3 && (
            <div className="space-y-4 py-8 text-center">
              <div className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--success)] px-4 py-2 font-mono text-sm text-[var(--success)]">
                <CheckIcon />
                <Bilingual de={tr.dailySuccess} zh={tr.dailySuccessZh} />
              </div>
              <h2 className="de-heading text-2xl text-[var(--ink)]">
                {tr.dailyStreak}: {streakData.currentStreak}
                <span className="zh-translation font-sans text-sm font-normal">{tr.dailyStreakZh}</span>
              </h2>
              <p className="mx-auto max-w-md font-sans text-xs text-[var(--gray)]">
                {tr.dailySummary}
                <span className="zh-translation">{tr.dailySummaryZh}</span>
              </p>
              <div className="flex justify-center pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-[var(--radius)] border border-[var(--line)] px-6 py-2 text-xs text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                >
                  <Bilingual de={tr.dailyBack} zh={tr.dailyBackZh} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
