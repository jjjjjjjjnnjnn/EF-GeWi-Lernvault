import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { PER_MODULE_KEYS, isTyping, matchesKey } from "../keys";
import { t, type Lang } from "../i18n";
import { setFeedbackContext } from "../components/FeedbackBox";
import type { VaultNote, VaultCard } from "../vault/parser";
import { chat } from "../ai/engine";
import { isInterleaveOn, orderMixed, setInterleave } from "../engine/interleave";
import { prioritizeThema } from "../scheduler";
import { KORREKTOR_SYSTEM } from "../engine/rag";
import {
  parseKlausurEvaluation,
  buildKlausurJsonPrompt,
  buildVergleichJsonPrompt,
} from "../ai/schema";
import {
  generateQuizFromNote,
  getAvailableThemen,
  getVergleichItems,
  buildKlausurFehlerlogPatch,
  buildVergleichFehlerlogPatch,
  MOCK_QUIZ,
  RUBRIC_CRITERIA,
  type FehlerlogDefizit,
  type GeneratedQuiz,
  type RubricCriterion,
  type VergleichItem,
} from "../quizgen";

export function formatTimerSeconds(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const seconds = String(safeSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function calculateQuizTimerSeconds(baseSeconds: number, startedAt: number, now: number): number {
  const elapsed = Math.max(0, Math.floor((now - startedAt) / 1000));
  return baseSeconds + elapsed;
}

export function useQuizTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const secondsRef = useRef(0);
  const baseSecondsRef = useRef(0);
  const startedAtRef = useRef(0);
  const runningRef = useRef(false);

  const publish = useCallback((nextSeconds: number) => {
    secondsRef.current = nextSeconds;
    setSeconds(nextSeconds);
  }, []);

  const start = useCallback(() => {
    baseSecondsRef.current = secondsRef.current;
    startedAtRef.current = Date.now();
    runningRef.current = true;
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    if (!runningRef.current) return;
    publish(calculateQuizTimerSeconds(baseSecondsRef.current, startedAtRef.current, Date.now()));
    runningRef.current = false;
    setRunning(false);
  }, [publish]);

  const toggle = useCallback(() => {
    if (runningRef.current) stop();
    else start();
  }, [start, stop]);

  const reset = useCallback(() => {
    baseSecondsRef.current = 0;
    startedAtRef.current = Date.now();
    publish(0);
  }, [publish]);

  useEffect(() => {
    if (!running) return;
    let timeoutId = 0;

    const scheduleDeadline = () => {
      const now = Date.now();
      const elapsed = Math.max(0, Math.floor((now - startedAtRef.current) / 1000));
      publish(calculateQuizTimerSeconds(baseSecondsRef.current, startedAtRef.current, now));
      const nextDeadline = startedAtRef.current + (elapsed + 1) * 1000;
      timeoutId = window.setTimeout(scheduleDeadline, Math.max(0, nextDeadline - Date.now()));
    };

    scheduleDeadline();
    return () => window.clearTimeout(timeoutId);
  }, [publish, running]);

  return {
    seconds,
    running,
    formatted: formatTimerSeconds(seconds),
    start,
    stop,
    toggle,
    reset,
  };
}

const primaryTextActionClass =
  "px-1 py-1 font-mono text-xs text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40";
const secondaryTextActionClass =
  "px-1 py-1 font-sans text-sm text-[var(--gray)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:text-[var(--ink)] hover:decoration-[var(--ink)]";
const quietActionClass =
  "px-1 py-1 font-mono text-xs text-[var(--gray)] underline decoration-transparent underline-offset-4 transition-colors hover:text-[var(--accent)] hover:decoration-[var(--accent)]";
const rubricControlClass =
  "px-2 py-1 font-mono text-xs border-b-2 transition-colors";

interface QuizProps {
  lang?: Lang;
  vault?: VaultNote[] | null;
  cards?: VaultCard[] | null;
  preselectedFach?: string;
  onJumpToLibrary?: (query: string, fach?: string) => void;
}

type QuizStep = 1 | 2 | 3 | 4 | 5;

interface RubricEvaluation extends FehlerlogDefizit {
  feedbackDE: string;
  feedbackZH: string;
  citation: string;
  points: number;
}

import { vergleichStore } from "../engine/stores";

export default function Quiz({ lang = "zh", vault = null, cards = null, preselectedFach, onJumpToLibrary }: QuizProps) {
  const tr = t(lang);
  const essayTimer = useQuizTimer();
  const vergleichTimer = useQuizTimer();
  const [patchDate] = useState(() => new Date().toISOString().slice(0, 10));

  // Sub-mode switcher: "klausur" (5-step essay drill) vs. "vergleich" (discrimination & contrast)
  const [drillMode, setDrillMode] = useState<"klausur" | "vergleich">(() => {
    if (typeof window !== "undefined") {
      const m = new URLSearchParams(window.location.search).get("mode");
      if (m === "vergleich") return "vergleich";
    }
    return "klausur";
  });

  // ==================== KLAUSUR-DRILL STATE (V3) ====================
  const availableThemen = useMemo(() => {
    const all = getAvailableThemen(vault);
    if (!preselectedFach || preselectedFach === "alle") return all;
    const filtered = all.filter((t) => t.fach.toLowerCase() === preselectedFach.toLowerCase());
    return filtered.length > 0 ? filtered : all;
  }, [vault, preselectedFach]);

  const [step, setStep] = useState<QuizStep>(1);
  const [selectedThema, setSelectedThema] = useState<string>(
    availableThemen.length > 0 ? availableThemen[0].thema : MOCK_QUIZ.thema
  );

  useEffect(() => {
    if (availableThemen.length > 0 && !availableThemen.some((t) => t.thema === selectedThema)) {
      setSelectedThema(availableThemen[0].thema);
    }
  }, [availableThemen, selectedThema]);

  const currentQuiz: GeneratedQuiz = useMemo(() => {
    if (availableThemen.length > 0) {
      const match = availableThemen.find((t) => t.thema === selectedThema);
      if (match) return generateQuizFromNote(match.note);
      return generateQuizFromNote(availableThemen[0].note);
    }
    return MOCK_QUIZ;
  }, [availableThemen, selectedThema]);

  // Step 3 state: User answers and Timer
  const [answers, setAnswers] = useState<string[]>(["", "", ""]);

  // Step 4 state: Evaluation & rubric pills
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [lmDegraded, setLmDegraded] = useState(false);
  const [evaluations, setEvaluations] = useState<RubricEvaluation[]>([
    {
      operatorVerfehlt: false,
      fachbegriffFalsch: false,
      belegFehlt: false,
      vorgehenFalsch: false,
      feedbackDE: "Ausführliche Analyse mit Fachterminologie und Textbezug.",
      feedbackZH: "回答结构清晰，术语使用准确，有较明确的材料依据。",
      citation: currentQuiz.tasks[0]?.sourceRef || `${currentQuiz.notePath}#1`,
      points: 13,
    },
    {
      operatorVerfehlt: false,
      fachbegriffFalsch: false,
      belegFehlt: false,
      vorgehenFalsch: false,
      feedbackDE: "Ursachen und Wirkungskette nachvollziehbar dargestellt.",
      feedbackZH: "因果关系与机制推演完整。",
      citation: currentQuiz.tasks[1]?.sourceRef || `${currentQuiz.notePath}#2`,
      points: 12,
    },
    {
      operatorVerfehlt: false,
      fachbegriffFalsch: false,
      belegFehlt: false,
      vorgehenFalsch: false,
      feedbackDE: "Kriterienorientierte Abwägung mit begründetem Schlusssatz.",
      feedbackZH: "评价标准明确，给出了有力的论据支撑。",
      citation: currentQuiz.tasks[2]?.sourceRef || `${currentQuiz.notePath}#3`,
      points: 13,
    },
  ]);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setAnswers((prev) => {
      if (prev.length === currentQuiz.tasks.length) return prev;
      return currentQuiz.tasks.map((_, i) => prev[i] ?? "");
    });
    setEvaluations((prev) => {
      if (prev.length === currentQuiz.tasks.length) return prev;
      return currentQuiz.tasks.map(
        (task, i) =>
          prev[i] ?? {
            operatorVerfehlt: false,
            fachbegriffFalsch: false,
            belegFehlt: false,
            vorgehenFalsch: false,
            feedbackDE: "Noch nicht bewertet.",
            feedbackZH: "尚未批改。",
            citation: task.sourceRef || `${currentQuiz.notePath}#${i + 1}`,
            points: 12,
          }
      );
    });
  }, [currentQuiz]);

  const evaluateAnswers = async () => {
    setIsEvaluating(true);
    setLmDegraded(false);

    try {
      const prompt = buildKlausurJsonPrompt(
        currentQuiz.thema,
        currentQuiz.materialQuote,
        currentQuiz.notePath,
        currentQuiz.tasks,
        answers
      );

      const content = await chat(
        [
          {
            role: "system",
            content: KORREKTOR_SYSTEM,
          },
          { role: "user", content: prompt },
        ],
        { temperature: 0.2, maxTokens: 800 }
      );

      const parsed = parseKlausurEvaluation(content, `${currentQuiz.notePath}#1`);

      setEvaluations([
        {
          operatorVerfehlt: parsed.operatorVerfehlt,
          fachbegriffFalsch: parsed.fachbegriffFalsch,
          belegFehlt: parsed.belegFehlt,
          vorgehenFalsch: parsed.vorgehenFalsch,
          feedbackDE: parsed.feedbackDE,
          feedbackZH: parsed.feedbackZH,
          citation: parsed.citation,
          points: parsed.points,
        },
        ...evaluations.slice(1),
      ]);
    } catch {
      setLmDegraded(true);
      setEvaluations((prev) =>
        prev.map((item, idx) => {
          const userAns = answers[idx] || "";
          const opHit = userAns.length < 20;
          const belegHit = !userAns.includes("„") && !userAns.includes('"') && !userAns.includes("Material");
          return {
            ...item,
            operatorVerfehlt: opHit,
            belegFehlt: belegHit,
            feedbackDE: opHit
              ? "Antwort ist zu kurz oder Operator wurde nicht differenziert entfaltet."
              : "Solider Ansatz, bitte Kriteriengeleitetheit und Begriffsschärfe nachschärfen.",
            feedbackZH: opHit
              ? "作答篇幅不足或动词指示未充分展开。"
              : "回答方向正确，建议补充关键论据与准则对比。",
          };
        })
      );
    } finally {
      setIsEvaluating(false);
    }
  };

  const togglePill = (taskIdx: number, criterion: RubricCriterion) => {
    setEvaluations((prev) =>
      prev.map((ev, i) => {
        if (i !== taskIdx) return ev;
        if (criterion === "operator") return { ...ev, operatorVerfehlt: !ev.operatorVerfehlt };
        if (criterion === "fachbegriff") return { ...ev, fachbegriffFalsch: !ev.fachbegriffFalsch };
        if (criterion === "vorgehen") return { ...ev, vorgehenFalsch: !ev.vorgehenFalsch };
        return { ...ev, belegFehlt: !ev.belegFehlt };
      })
    );
  };

  const klausurPatch = useMemo(
    () =>
      buildKlausurFehlerlogPatch({
        fach: currentQuiz.fach,
        thema: currentQuiz.thema,
        notePath: currentQuiz.notePath,
        date: patchDate,
        time: essayTimer.formatted,
        evaluations,
      }),
    [currentQuiz, essayTimer.formatted, evaluations, patchDate]
  );

  const copyPatch = () => {
    void navigator.clipboard.writeText(klausurPatch);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const totalScore = evaluations.reduce((sum, e) => {
    let pts = 15;
    if (e.operatorVerfehlt) pts -= 3;
    if (e.fachbegriffFalsch) pts -= 2;
    if (e.belegFehlt) pts -= 2;
    if (e.vorgehenFalsch) pts -= 2;
    return sum + Math.max(0, pts);
  }, 0);
  const maxScore = currentQuiz.tasks.length * 15;

  const stepsList: { num: QuizStep; labelDE: string; labelZH: string }[] = [
    { num: 1, labelDE: "Thema", labelZH: "主题" },
    { num: 2, labelDE: "Aufgabe", labelZH: "题目" },
    { num: 3, labelDE: "Antwort", labelZH: "作答" },
    { num: 4, labelDE: "Korrektur", labelZH: "批改" },
    { num: 5, labelDE: "Fehlerlog", labelZH: "错题" },
  ];

  // ==================== VERGLEICH-DRILL STATE (V4) ====================
  const vergleichItems = useMemo(() => getVergleichItems(vault), [vault]);

  const [activeVergleichIdx, setActiveVergleichIdx] = useState(0);

  // B2-interleave: sortierung folgt dem schalter des aktuellen fach (default je fach-evidenz).
  const [ilOn, setIlOn] = useState<boolean | null>(null);
  const [ilBackMsg, setIlBackMsg] = useState("");
  const quizFachGuess =
    drillMode === "klausur"
      ? currentQuiz.fach
      : (vergleichItems[activeVergleichIdx] || vergleichItems[0])?.fach ?? "";
  const ilEffective = ilOn ?? isInterleaveOn(quizFachGuess);
  const orderedThemen = orderMixed(availableThemen, (t) => t.fach, ilEffective, quizFachGuess);
  const orderedVergleichItems = orderMixed(vergleichItems, (i) => i.fach, ilEffective, quizFachGuess);
  const currentVergleich: VergleichItem = orderedVergleichItems[activeVergleichIdx] || orderedVergleichItems[0];

  const toggleIl = () => {
    const next = !ilEffective;
    if (quizFachGuess) setInterleave(quizFachGuess, next);
    setIlOn(next);
  };

  const sendBack = (thema: string) => {
    const n = prioritizeThema(cards ?? [], thema);
    setIlBackMsg(tr.ilBackDone(n));
  };
  // Report live position to the global feedback float
  useEffect(() => {
    if (drillMode === "klausur") {
      setFeedbackContext(`quiz:${currentQuiz?.notePath ?? "mock"}`);
    } else {
      setFeedbackContext(
        `vergleich:${currentVergleich?.id ?? currentVergleich?.thema ?? "?"}`
      );
    }
  }, [drillMode, currentQuiz, currentVergleich]);

  const [selectedOption, setSelectedOption] = useState<"A" | "B" | null>(() => {
    if (typeof window !== "undefined") {
      const opt = new URLSearchParams(window.location.search).get("opt");
      if (opt === "A" || opt === "B") return opt;
    }
    return null;
  });
  const [warumText, setWarumText] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("sub") === "1";
    }
    return false;
  });
  const [showL2, setShowL2] = useState(() => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search).get("l2") === "1";
    }
    return false;
  });
  const [nextTimeText, setNextTimeText] = useState("");
  const [copiedVergleichPatch, setCopiedVergleichPatch] = useState(false);

  const prevVergleichId = useRef(currentVergleich.id);

  // Load "下次先…" when changing item
  useEffect(() => {
    const store = vergleichStore.load();
    setNextTimeText(store.nextTimes[currentVergleich.id] || "");
    if (prevVergleichId.current !== currentVergleich.id) {
      prevVergleichId.current = currentVergleich.id;
      setSelectedOption(null);
      setWarumText("");
      setIsSubmitted(false);
      setShowL2(false);
    }
  }, [currentVergleich.id]);

  const saveNextTime = (text: string) => {
    setNextTimeText(text);
    const store = vergleichStore.load();
    store.nextTimes[currentVergleich.id] = text;
    vergleichStore.save(store);
  };

  const isCorrect = selectedOption === currentVergleich.correctOption;
  const vergleichPatch = useMemo(
    () =>
      buildVergleichFehlerlogPatch({
        fach: currentVergleich.fach,
        thema: currentVergleich.thema,
        sourceRef: currentVergleich.sourceRef,
        date: patchDate,
        isCorrect,
        selectedOption,
        justification: warumText,
        nextTime: nextTimeText,
      }),
    [currentVergleich, isCorrect, nextTimeText, patchDate, selectedOption, warumText]
  );

  // V4 Vergleich evaluation: v3-aligned 4-dim rubric, manually toggleable + LM-graded with same 4 regexes.
  const [vergleichEval, setVergleichEval] = useState({
    operatorVerfehlt: currentVergleich.rubrics.operatorVerfehlt,
    fachbegriffFalsch: currentVergleich.rubrics.fachbegriffFalsch,
    belegFehlt: currentVergleich.rubrics.belegFehlt,
    vorgehenFalsch: currentVergleich.rubrics.vorgehenFalsch,
  });
  const [vLmDegraded, setVLmDegraded] = useState(false);

  useEffect(() => {
    setVergleichEval({ ...currentVergleich.rubrics });
    setVLmDegraded(false);
  }, [currentVergleich.id]);

  const toggleVergleichPill = (criterion: RubricCriterion) => {
    setVergleichEval((prev) => {
      if (criterion === "operator") return { ...prev, operatorVerfehlt: !prev.operatorVerfehlt };
      if (criterion === "fachbegriff") return { ...prev, fachbegriffFalsch: !prev.fachbegriffFalsch };
      if (criterion === "vorgehen") return { ...prev, vorgehenFalsch: !prev.vorgehenFalsch };
      return { ...prev, belegFehlt: !prev.belegFehlt };
    });
  };

  const evaluateVergleichLM = async () => {
    const begruendung = warumText.trim();
    setVLmDegraded(false);
    try {
      const prompt = buildVergleichJsonPrompt(
        currentVergleich.fach,
        currentVergleich.thema,
        selectedOption,
        currentVergleich.correctOption,
        begruendung,
        currentVergleich.sourceRef
      );
      const content: string = await chat(
        [
          {
            role: "system",
            content: KORREKTOR_SYSTEM,
          },
          { role: "user", content: prompt },
        ],
        { temperature: 0.2, maxTokens: 400 }
      );
      const parsed = parseKlausurEvaluation(content, currentVergleich.sourceRef);
      setVergleichEval({
        operatorVerfehlt: parsed.operatorVerfehlt,
        fachbegriffFalsch: parsed.fachbegriffFalsch,
        belegFehlt: parsed.belegFehlt,
        vorgehenFalsch: parsed.vorgehenFalsch,
      });
    } catch {
      setVLmDegraded(true);
      setVergleichEval({
        operatorVerfehlt: begruendung.length < 10,
        fachbegriffFalsch: false,
        belegFehlt: !(/[„"“]|Material|Art\.|§|#/.test(begruendung)),
        vorgehenFalsch: selectedOption !== currentVergleich.correctOption && begruendung.length < 20,
      });
    }
  };

  // Space toggles timer; 1/2 selects A/B in Vergleich; D/V switch modes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping()) return;

      if (matchesKey(e, PER_MODULE_KEYS.quiz[0])) {
        e.preventDefault();
        if (drillMode === "klausur") essayTimer.toggle();
        else vergleichTimer.toggle();
      } else if (drillMode === "vergleich" && matchesKey(e, PER_MODULE_KEYS.quiz[1])) {
        e.preventDefault();
        setSelectedOption(e.key === "1" ? "A" : "B");
      } else if (
        drillMode === "klausur" &&
        (matchesKey(e, PER_MODULE_KEYS.quiz[2]) || matchesKey(e, PER_MODULE_KEYS.quiz[3]))
      ) {
        setDrillMode("vergleich");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drillMode, essayTimer.toggle, vergleichTimer.toggle]);

  const copyVergleichPatch = () => {
    void navigator.clipboard.writeText(vergleichPatch);
    setCopiedVergleichPatch(true);
    setTimeout(() => setCopiedVergleichPatch(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top Drill-Mode Switcher: Klausur-Drill vs. Vergleich-Training */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-2">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setDrillMode("klausur")}
            aria-pressed={drillMode === "klausur"}
            className={`border-b-2 pb-1 font-serif text-sm transition-colors ${
              drillMode === "klausur"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {tr.klausurDrill}
          </button>
          <button
            type="button"
            onClick={() => setDrillMode("vergleich")}
            aria-pressed={drillMode === "vergleich"}
            className={`border-b-2 pb-1 font-serif text-sm transition-colors ${
              drillMode === "vergleich"
                ? "border-[var(--accent)] text-[var(--accent)]"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {tr.vergleichDrill}
          </button>
        </div>

        <span className="font-mono meta-text text-[var(--accent)]">
          {drillMode === "klausur" ? "AFB I–III, 5 Schritte" : "AFB II–III, Kontrast"}
        </span>
        <button
          type="button"
          onClick={toggleIl}
          title={`${quizFachGuess}: ${ilEffective ? tr.ilOn : tr.ilOff}`}
          aria-pressed={ilEffective}
          className={`${quietActionClass} ${ilEffective ? "text-[var(--accent)]" : ""}`}
        >
          {quizFachGuess}: {ilEffective ? tr.ilOn : tr.ilOff}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: KLAUSUR-DRILL (V3 5-Step Stepper + V4 Desirable Difficulty Texts) */}
      {/* ========================================================================= */}
      {drillMode === "klausur" && (
        <div className="space-y-6">
          {/* 5-Step Progress Hairline */}
          <div className="space-y-2 border-b border-[var(--line)] pb-3">
            <div className="flex items-center justify-between">
              {stepsList.map((s) => {
                const isActive = step === s.num;
                const isDone = step > s.num;
                return (
                  <button
                    key={s.num}
                    type="button"
                    onClick={() => setStep(s.num)}
                    aria-current={isActive ? "step" : undefined}
                    className={`flex items-center gap-1.5 font-mono text-xs transition-colors ${
                      isActive
                        ? "text-[var(--accent)]"
                        : isDone
                        ? "text-[var(--ink)] hover:text-[var(--accent)]"
                        : "text-[var(--gray)] hover:text-[var(--ink)]"
                    }`}
                  >
                    <span
                      className={`meta-text flex h-5 w-5 items-center justify-center border-b text-center ${
                        isActive
                          ? "border-[var(--accent)] text-[var(--accent)]"
                          : isDone
                          ? "border-[var(--ink)] text-[var(--ink)]"
                          : "border-[var(--line)] text-[var(--gray)]"
                      }`}
                    >
                      {s.num}
                    </span>
                    <span>{lang === "de" ? s.labelDE : `${s.labelDE} ${s.labelZH}`}</span>
                  </button>
                );
              })}
            </div>

            {/* V4 ddHard mounting: below step hairline, permanent mono 11px gray */}
            <div className="meta-text font-mono text-[var(--gray)]">
              {tr.ddHard}
            </div>
          </div>

          {/* Step 1: Thema */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-lg font-normal text-[var(--ink)]">
                  {lang === "de" ? "1. Klausur-Thema wählen" : "1. 选择自测模考主题"}
                </h2>
                <span className="font-mono meta-text text-[var(--accent)]">
                  AFB I–III, Klausurrelevant
                </span>
              </div>

              <p className="zh-translation">
                {lang === "de"
                  ? "Auswahl basiert ausschließlich auf Notizen mit klausurrelevant: true (Lehrplan EF)."
                  : "题目严格基于标记为 klausurrelevant: true 的 EF 大纲知识库笔记生成。"}
              </p>

              <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] divide-y divide-[var(--line)] overflow-hidden">
                {(orderedThemen.length > 0
                  ? orderedThemen
                  : [{ thema: MOCK_QUIZ.thema, fach: MOCK_QUIZ.fach, note: null }]
                ).map((item) => {
                  const isSelected = selectedThema === item.thema;
                  return (
                    <button
                      key={item.thema}
                      type="button"
                      onClick={() => setSelectedThema(item.thema)}
                      aria-pressed={isSelected}
                      className={`flex w-full items-center justify-between border-l-2 py-3 px-4 text-left transition-colors ${
                        isSelected
                          ? "border-[var(--accent)] bg-[var(--paper-subtle)]"
                          : "border-transparent hover:bg-[var(--paper-subtle)]/50"
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif text-base font-normal text-[var(--ink)]">
                            {item.thema}
                          </span>
                          <span className="font-mono meta-text uppercase text-[var(--gray)]">
                            {item.fach}
                          </span>
                        </div>
                        <div className="zh-translation mt-0.5">
                          {lang === "de"
                            ? "Selbst zusammengestellte Übungsaufgabe (darstellen · analysieren · beurteilen)"
                            : "自编三段式练习大题（概述 · 分析 · 评价）"}
                        </div>
                      </div>
                      <span className="font-mono meta-text text-[var(--gray)]">AFB II</span>
                    </button>
                  );
                })}
              </div>

              {/* V4 ddInterleave mounting: below topics list, permanent mono 11px gray */}
              <div className="font-mono meta-text text-[var(--gray)] pt-1">
                {tr.ddInterleave}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={primaryTextActionClass}
                >
                  {lang === "de" ? "Aufgabe anzeigen" : "查看题目"}
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Aufgabe */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                <div>
                  <span className="font-mono meta-text uppercase text-[var(--gray)]">
                    {currentQuiz.fach} · Klausurteil
                  </span>
                  <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
                    {currentQuiz.thema}
                  </h2>
                </div>
                <span className="font-mono meta-text text-[var(--accent)]">
                  {currentQuiz.tasks.length} Teilaufgaben, {maxScore} Pkt.
                </span>
              </div>

              {/* Material block */}
              <div className="space-y-1.5">
                {/* V4 ddExample mounting: one line above quote block, permanent mono 11px gray */}
                <div className="font-mono meta-text text-[var(--gray)]">
                  {tr.ddExample}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
                  <span>MATERIAL / 原始素材</span>
                  <button
                    type="button"
                    onClick={() => onJumpToLibrary?.(currentQuiz.thema, currentQuiz.fach)}
                    className="meta-text text-[var(--accent)] hover:underline"
                  >
                    [{currentQuiz.notePath}]
                  </button>
                </div>
                <blockquote className="de-reading border-l-2 border-[var(--line)] pl-4 text-sm leading-relaxed text-[var(--ink)]">
                  {currentQuiz.materialQuote}
                </blockquote>
              </div>

              {/* Tasks List */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[var(--gray)]">
                  AUFGABENSTELLUNG / 题目指令
                </div>
                <ol className="divide-y divide-[var(--line)]">
                  {currentQuiz.tasks.map((task, idx) => (
                    <li key={task.operator + idx} className="space-y-1.5 py-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[var(--ink)]">
                            {idx + 1}.
                          </span>
                          <span className="font-mono text-xs font-semibold uppercase text-[var(--accent)]">
                            {task.operator}
                          </span>
                          <span className="font-mono meta-text text-[var(--gray)]">
                            {task.afb}
                          </span>
                        </div>
                        <span className="font-mono meta-text text-[var(--gray)]">
                          [{task.sourceRef}]
                        </span>
                      </div>
                      <p className="de-reading text-sm leading-relaxed text-[var(--ink)]">
                        {task.promptDE}
                      </p>
                      <p className="zh-translation">{task.promptZH}</p>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={secondaryTextActionClass}
                >
                  {lang === "de" ? "Zurück" : "上一步"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={primaryTextActionClass}
                >
                  {lang === "de" ? "Zur Antwort & Timer" : "开始作答与计时"}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Antwort */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
                <div className="flex items-baseline gap-3">
                  <span
                    role="timer"
                    aria-label={`Bearbeitungszeit ${essayTimer.formatted}`}
                    className="font-mono text-3xl font-normal tabular-nums tracking-tight text-[var(--ink)]"
                  >
                    {essayTimer.formatted}
                  </span>
                  <span className="font-mono text-xs text-[var(--gray)]">
                    / 45:00 Klausurziel, Space zum Starten oder Stoppen
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button type="button" onClick={essayTimer.reset} className={quietActionClass}>
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={essayTimer.toggle}
                    aria-pressed={essayTimer.running}
                    className={`${quietActionClass} ${essayTimer.running ? "text-[var(--accent)]" : ""}`}
                  >
                    {essayTimer.running ? "Stopp" : "Start"}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {currentQuiz.tasks.map((task, idx) => (
                  <div key={task.operator + idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[var(--ink)]">Teil {idx + 1}:</span>
                        <span className="font-mono uppercase text-[var(--accent)]">{task.operator}</span>
                        <span className="font-mono meta-text text-[var(--gray)]">({task.afb})</span>
                      </div>
                      <span className="font-mono meta-text text-[var(--gray)]">
                        [{task.sourceRef}]
                      </span>
                    </div>
                    <label
                      htmlFor={`quiz-answer-${idx}`}
                      className="de-reading block text-sm leading-relaxed text-[var(--ink)]"
                    >
                      {task.promptDE}
                    </label>
                    <p className="zh-translation">{task.promptZH}</p>
                    <textarea
                      id={`quiz-answer-${idx}`}
                      rows={4}
                      value={answers[idx]}
                      onChange={(e) => {
                        const val = e.target.value;
                        setAnswers((prev) => prev.map((a, i) => (i === idx ? val : a)));
                      }}
                      placeholder={
                        lang === "de"
                          ? `Ihre Ausarbeitung zu „${task.operator}“ hier eingeben…`
                          : `在此输入针对“${task.operator}”的作答文本…`
                      }
                      className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 font-serif text-sm text-[var(--ink)] placeholder:font-sans placeholder:text-xs placeholder:text-[var(--gray)] focus:border-[var(--accent)] transition-colors leading-relaxed"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className={secondaryTextActionClass}
                >
                  {lang === "de" ? "Zurück" : "上一步"}
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    setStep(4);
                    await evaluateAnswers();
                  }}
                  className={primaryTextActionClass}
                >
                  {lang === "de" ? "Zur Korrektur & Bewertung" : "提交批改与评分"}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Korrektur */}
          {step === 4 && (
            <div className="space-y-6" aria-live="polite">
              {lmDegraded && (
                <div className="border-l-2 border-[var(--warning)] pl-3 text-sm text-[var(--warning)]">
                  <div className="font-mono font-semibold">{tr.lmDown}</div>
                  <div className="zh-translation mt-0.5">
                    {lang === "de"
                      ? "KI-Engine ist nicht verbunden. Die Bewertung erfolgt im Selbstprüf-Modus anhand der offiziellen AFB-Rubriken (Engine in den KI-Einstellungen des KI-Tutors wählen)."
                      : "AI引擎未连接。当前已降级为依据官方评分标准自检模式，绝不虚构评分（去KI-Tutor的AI设置里选引擎）。"}
                  </div>
                </div>
              )}

              {isEvaluating && (
                <div className="py-6 text-center font-mono text-xs text-[var(--gray)]">
                  denkt nach… / 智能批改评估中…
                </div>
              )}

              {/* V4 ddError mounting in Step 4 Header if flaws exist */}
              {evaluations.some(
                (e) => e.operatorVerfehlt || e.fachbegriffFalsch || e.belegFehlt || e.vorgehenFalsch
              ) && (
                <div className="flex items-center justify-between border-y border-[var(--line)] py-2 font-mono meta-text text-[var(--gray)]">
                  <span>{tr.ddError}</span>
                  <span className="meta-text text-[var(--warning)]">Defizite erkannt / 发现待优化项</span>
                </div>
              )}

              {/* Total score summary header */}
              <div className="flex items-center justify-between border-y border-[var(--line)] py-3">
                <div>
                  <div className="font-mono text-xs text-[var(--gray)] uppercase">
                    Gesamturteil / 总体成绩
                  </div>
                  <div className="font-serif text-2xl font-normal text-[var(--ink)] mt-0.5">
                    {totalScore} / {maxScore} Punkte{" "}
                    <span className="font-mono text-xs text-[var(--gray)]">
                      ({Math.round((totalScore / maxScore) * 100)}%)
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono text-xs text-[var(--gray)]">Bearbeitungszeit / 用时</span>
                  <div className="font-mono text-base text-[var(--ink)]">{essayTimer.formatted}</div>
                </div>
              </div>

              {/* Rubric evaluation per task */}
              <div className="space-y-4">
                {currentQuiz.tasks.map((task, idx) => {
                  const ev = evaluations[idx];
                  return (
                    <div
                      key={task.operator + idx}
                      className="space-y-3 border-t border-[var(--line)] pt-4"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-[var(--ink)]">
                            Teil {idx + 1}:
                          </span>
                          <span className="font-mono text-xs uppercase text-[var(--accent)]">
                            {task.operator}
                          </span>
                          <span className="font-mono meta-text text-[var(--gray)]">
                            ({task.afb})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => onJumpToLibrary?.(currentQuiz.thema)}
                          className="font-mono meta-text text-[var(--accent)] hover:underline"
                        >
                          [{ev?.citation || currentQuiz.notePath}]
                        </button>
                      </div>

                      {/* Rubric Pills */}
                      <div className="flex flex-wrap gap-2">
                        {RUBRIC_CRITERIA.map((criterion) => {
                          const isHit =
                            criterion.id === "operator"
                              ? ev?.operatorVerfehlt
                              : criterion.id === "fachbegriff"
                              ? ev?.fachbegriffFalsch
                              : criterion.id === "vorgehen"
                              ? ev?.vorgehenFalsch
                              : ev?.belegFehlt;
                          return (
                            <button
                              key={criterion.id}
                              type="button"
                              onClick={() => togglePill(idx, criterion.id)}
                              title={criterion.descriptionDE}
                              aria-pressed={Boolean(isHit)}
                              className={`${rubricControlClass} ${
                                isHit
                                  ? "border-[var(--warning)] text-[var(--warning)]"
                                  : "border-transparent text-[var(--gray)] hover:border-[var(--line)]"
                              }`}
                            >
                              {criterion.name}
                              <span className="zh-translation ml-1">
                                {criterion.labelZH}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-1 border-l-2 border-[var(--line)] pl-3">
                        <p className="de-reading text-sm leading-relaxed text-[var(--ink)]">
                          {ev?.feedbackDE}
                        </p>
                        <p className="zh-translation">{ev?.feedbackZH}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className={secondaryTextActionClass}
                >
                  {lang === "de" ? "Zurück zur Antwort" : "返回作答"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(5)}
                  className={primaryTextActionClass}
                >
                  {lang === "de" ? "Zum Fehlerlog-Entwurf" : "生成错题补丁"}
                </button>
              </div>
            </div>
          )}

          {/* Step 5: Fehlerlog */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                <div>
                  <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
                    {lang === "de" ? "5. Fehlerlog-Eintrag" : "5. 错题日志标本与同步"}
                  </h2>
                  <div
                    className={
                      lang === "de"
                        ? "de-reading mt-0.5 text-sm text-[var(--gray)]"
                        : "zh-translation mt-0.5"
                    }
                  >
                    {lang === "de"
                      ? "Reines Text-Patch zum Einfügen in Obsidian (00_META/Klausur-Training/Fehlerlog.md)."
                      : "纯文本补丁，可一键复制并无缝粘入 Obsidian 对应错题日志。"}
                  </div>
                </div>
                <span className="flex items-center gap-2">
                  {/* B2-rueckfluss: thema zurueck in den kartenstapel */}
                  <button
                    type="button"
                    onClick={() => sendBack(currentQuiz.thema)}
                    title={tr.ilBack}
                    className={quietActionClass}
                  >
                    {tr.ilBack}
                  </button>
                  <button
                    type="button"
                    onClick={copyPatch}
                    className={`${primaryTextActionClass} ${copied ? "text-[var(--ink)]" : ""}`}
                  >
                    {copied ? tr.copied : tr.copyPatch}
                  </button>
                </span>
              </div>

              {ilBackMsg && (
                <div className="font-mono meta-text text-[var(--accent)]">
                  {ilBackMsg}
                </div>
              )}

              {/* V4 ddRetrieval mounting: inside Fehlerlog view */}
              <div className="font-mono meta-text text-[var(--gray)]">
                {tr.ddRetrieval}
              </div>

              <div className="space-y-2 border-t border-[var(--line)] pt-4">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
                  <span>DIFF-PATCH / 增量文本</span>
                  <span>Obsidian Format</span>
                </div>
                <pre className="block overflow-x-auto border-l-2 border-[var(--line)] pl-3 font-mono text-xs leading-relaxed text-[var(--ink)] select-all">
                  {klausurPatch}
                </pre>
              </div>

              <div className="flex justify-between pt-2">
                <button
                  type="button"
                  onClick={() => setStep(4)}
                  className={secondaryTextActionClass}
                >
                  {lang === "de" ? "Zurück zur Korrektur" : "返回批改"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    essayTimer.stop();
                    essayTimer.reset();
                    setAnswers(["", "", ""]);
                  }}
                  className={primaryTextActionClass}
                >
                  {lang === "de" ? "Neuen Durchlauf starten" : "开始新一轮自测"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: VERGLEICH & UNTERSCHEIDUNG (V4 §1 Vergleich + §2 Feedback-Schichten) */}
      {/* ========================================================================= */}
      {drillMode === "vergleich" && (
        <div className="space-y-6">
          {/* Header & Sub-Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[var(--ink)]">
                  {currentVergleich.fach}
                </span>
                <span className="font-serif text-lg font-normal text-[var(--ink)]">
                  {currentVergleich.thema}
                </span>
                <span className="font-mono meta-text text-[var(--accent)]">
                  {currentVergleich.afb}
                </span>
              </div>
              <div className="font-mono meta-text text-[var(--gray)] mt-1">
                {tr.ddHard}
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-3">
              <span
                role="timer"
                aria-label={`Vergleichszeit ${vergleichTimer.formatted}`}
                className="font-mono text-2xl font-normal tabular-nums text-[var(--ink)]"
              >
                {vergleichTimer.formatted}
              </span>
              <button
                type="button"
                onClick={vergleichTimer.toggle}
                aria-pressed={vergleichTimer.running}
                className={`${quietActionClass} ${vergleichTimer.running ? "text-[var(--accent)]" : ""}`}
              >
                {vergleichTimer.running ? "Stopp" : "Start"}
              </button>
            </div>
          </div>

          {/* Topic Selector Tabs for Vergleich items (B2-sortiert) */}
          <nav aria-label="Vergleichsaufgaben" className="flex overflow-x-auto border-b border-[var(--line)]">
            {orderedVergleichItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveVergleichIdx(idx)}
                aria-current={activeVergleichIdx === idx ? true : undefined}
                className={`-mb-px shrink-0 border-b-2 px-3 py-2 font-mono text-xs transition-colors ${
                  activeVergleichIdx === idx
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {idx + 1}. {item.fach}, {item.thema}
              </button>
            ))}
          </nav>

          {/* §1.1 辨别题展示: 题干区 (DE serif 上 / ZH sans 小灰下) + Operator 高亮 */}
          <div className="space-y-4 border-b border-[var(--line)] pb-5">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
                <div className="flex items-center gap-2">
                  <span className="font-semibold uppercase text-[var(--accent)]">
                    {currentVergleich.operator}
                  </span>
                  <span>AUFGABE / 辨别任务</span>
                </div>
                <button
                  type="button"
                  onClick={() => onJumpToLibrary?.(currentVergleich.thema)}
                  className="meta-text text-[var(--accent)] hover:underline"
                >
                  [{currentVergleich.sourceRef}]
                </button>
              </div>

              <div className="de-reading text-base leading-relaxed text-[var(--ink)]">
                {currentVergleich.promptDE}
              </div>
              <div className="zh-translation">{currentVergleich.promptZH}</div>
            </div>

            {/* Material Quote Block */}
            <blockquote className="de-reading border-l-2 border-[var(--line)] pl-4 text-sm leading-relaxed text-[var(--ink)]">
              {currentVergleich.materialQuote}
            </blockquote>

            {/* 二选一程序按钮 (A/B 文字按钮，下划线/细线分隔，不是两色大按钮，键盘 1/2 可选) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
                <span>VERFAHRENSWAHL / 程序概念选择 (1 / 2)</span>
                <span>{selectedOption ? `Gewählt: Option ${selectedOption}` : "Bitte wählen"}</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-[var(--line)] rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSelectedOption("A")}
                  aria-pressed={selectedOption === "A"}
                  className={`px-4 py-3 text-left font-serif text-sm transition-colors ${
                    selectedOption === "A"
                      ? "bg-[var(--paper-subtle)] text-[var(--accent)]"
                      : "text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--paper-subtle)]/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{currentVergleich.optionA.labelDE}</span>
                    <kbd className="font-mono meta-text text-[var(--gray)]">1</kbd>
                  </div>
                  <div className="zh-translation mt-0.5">{currentVergleich.optionA.labelZH}</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOption("B")}
                  aria-pressed={selectedOption === "B"}
                  className={`px-4 py-3 text-left font-serif text-sm transition-colors ${
                    selectedOption === "B"
                      ? "bg-[var(--paper-subtle)] text-[var(--accent)]"
                      : "text-[var(--ink)] hover:text-[var(--accent)] hover:bg-[var(--paper-subtle)]/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span>{currentVergleich.optionB.labelDE}</span>
                    <kbd className="font-mono meta-text text-[var(--gray)]">2</kbd>
                  </div>
                  <div className="zh-translation mt-0.5">{currentVergleich.optionB.labelZH}</div>
                </button>
              </div>
            </div>

            {/* "为什么" 输入框 (textarea 2行，hairline 框，聚焦时单键不劫持) */}
            <div className="space-y-1.5 pt-1">
              <label htmlFor="vergleich-begruendung" className="block font-mono text-xs text-[var(--gray)]">
                BEGRÜNDUNG / 为什么选它？
              </label>
              <textarea
                id="vergleich-begruendung"
                rows={2}
                value={warumText}
                onChange={(e) => setWarumText(e.target.value)}
                placeholder={tr.warumPlaceholder}
                className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2.5 font-serif text-sm text-[var(--ink)] placeholder:font-sans placeholder:text-xs placeholder:text-[var(--gray)] focus:border-[var(--accent)] transition-colors"
              />
            </div>

            {/* 提交行: 主按钮 Vergleichen / 对照看看 (选错也可提交进解析，不锁死) */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]/70">
              <span className="font-mono meta-text text-[var(--gray)]">
                {selectedOption ? "Bereit zum Vergleich" : "Wählen Sie A oder B"}
              </span>
              <button
                type="button"
                disabled={!selectedOption}
                onClick={() => {
                  setIsSubmitted(true);
                  void evaluateVergleichLM();
                }}
                className={primaryTextActionClass}
              >
                {tr.vergleichen}
              </button>
            </div>
          </div>

          {/* §1.2 对比题 AB 并排 (Tufte 小多组图风格: 两列并排，差异高亮≤3处加粗底线，<900px自动堆叠) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
              <span>KONTRAST-VERGLEICH / 双向对照（Tufte 多重并排）</span>
              <span className="meta-text">Max 3 Differenz-Markierungen</span>
            </div>

            <div className="grid grid-cols-1 gap-y-4 divide-y divide-[var(--line)] md:grid-cols-2 md:divide-x md:divide-y-0">
              {/* Column A */}
              <div className="space-y-2.5 pr-0 md:pr-4">
                <div>
                  <h3 className="de-reading border-b border-[var(--line)] pb-1 text-sm text-[var(--ink)]">
                    {currentVergleich.optionA.column.titleDE}
                  </h3>
                  <p className="zh-translation">{currentVergleich.optionA.column.titleZH}</p>
                </div>
                <div className="de-reading border-l-2 border-[var(--line)] pl-4 text-sm leading-relaxed text-[var(--ink)]">
                  {currentVergleich.optionA.column.quoteSegments.map((seg, sIdx) =>
                    seg.highlight ? (
                      <span
                        key={sIdx}
                        className="font-medium underline decoration-[var(--accent)] underline-offset-2"
                      >
                        {seg.text}
                      </span>
                    ) : (
                      <span key={sIdx}>{seg.text}</span>
                    )
                  )}
                </div>
                <div className="pt-1">
                  <div className="de-reading text-sm text-[var(--ink)]">
                    {currentVergleich.optionA.column.conclusionDE}
                  </div>
                  <div className="zh-translation mt-0.5">
                    {currentVergleich.optionA.column.conclusionZH}
                  </div>
                </div>
              </div>

              {/* Column B */}
              <div className="space-y-2.5 pt-4 md:pt-0 pl-0 md:pl-4">
                <div>
                  <h3 className="de-reading border-b border-[var(--line)] pb-1 text-sm text-[var(--ink)]">
                    {currentVergleich.optionB.column.titleDE}
                  </h3>
                  <p className="zh-translation">{currentVergleich.optionB.column.titleZH}</p>
                </div>
                <div className="de-reading border-l-2 border-[var(--line)] pl-4 text-sm leading-relaxed text-[var(--ink)]">
                  {currentVergleich.optionB.column.quoteSegments.map((seg, sIdx) =>
                    seg.highlight ? (
                      <span
                        key={sIdx}
                        className="font-medium underline decoration-[var(--accent)] underline-offset-2"
                      >
                        {seg.text}
                      </span>
                    ) : (
                      <span key={sIdx}>{seg.text}</span>
                    )
                  )}
                </div>
                <div className="pt-1">
                  <div className="de-reading text-sm text-[var(--ink)]">
                    {currentVergleich.optionB.column.conclusionDE}
                  </div>
                  <div className="zh-translation mt-0.5">
                    {currentVergleich.optionB.column.conclusionZH}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* §1.3 Gating & §2 反馈三层 (L1 即时 KR, L2 延迟展开, L3 过程+元认知) */}
          {isSubmitted && (
            <div className="space-y-5 border-y border-[var(--line)] py-5" aria-live="polite">
              {/* L1 — 即时 KR (Knowledge of Result) */}
              <div className="space-y-2 border-b border-[var(--line)] pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isCorrect ? (
                      <span className="font-mono text-sm font-semibold text-[var(--accent)]">
                        {tr.richtig}
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-[var(--warning)]">
                          {tr.falsch}
                        </span>
                        {/* ddError: Fehler sind gute Signale / 选错是好信号 */}
                        <span className="font-mono meta-text text-[var(--gray)]">
                          {tr.ddError}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Zur Erklärung 永远可点，不锁死 */}
                  <button
                    type="button"
                    onClick={() => setShowL2(true)}
                    className={primaryTextActionClass}
                  >
                    {tr.zurErklaerung}
                  </button>
                </div>

                <div className="pt-1">
                  <p className="de-reading text-sm text-[var(--ink)]">{currentVergleich.krFeedbackDE}</p>
                  <p className="zh-translation">{currentVergleich.krFeedbackZH}</p>
                </div>
              </div>

              {/* L2 — 延迟展开 (check步后折叠区，用户主动展开) */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowL2((prev) => !prev)}
                  aria-expanded={showL2}
                  aria-controls="vergleich-loesung"
                  className="flex items-center gap-2 font-mono text-xs text-[var(--ink)] transition-colors hover:text-[var(--accent)]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                    className={`transition-transform duration-150 ${showL2 ? "rotate-90" : ""}`}
                  >
                    <path d="M6 3.5l5 4.5-5 4.5" />
                  </svg>
                  <span>{tr.loesungVergleichen}</span>
                  <span className="meta-text text-[var(--gray)]">
                    ({showL2 ? "geöffnet / 已展开" : "klicken zum Aufklappen / 点击展开"})
                  </span>
                </button>

                {showL2 && (
                  <div id="vergleich-loesung" className="space-y-3 border-l-2 border-[var(--line)] py-2 pl-4">
                    {/* Rubric Pills (v3-aligned 4-dim, manually toggleable) */}
                    <div className="flex flex-wrap gap-2">
                      {RUBRIC_CRITERIA.map((criterion) => {
                        const isHit =
                          criterion.id === "operator"
                            ? vergleichEval.operatorVerfehlt
                            : criterion.id === "fachbegriff"
                            ? vergleichEval.fachbegriffFalsch
                            : criterion.id === "vorgehen"
                            ? vergleichEval.vorgehenFalsch
                            : vergleichEval.belegFehlt;
                        return (
                          <button
                            key={criterion.id}
                            type="button"
                            onClick={() => toggleVergleichPill(criterion.id)}
                            title={criterion.descriptionDE}
                            aria-pressed={isHit}
                            className={`${rubricControlClass} ${
                              isHit
                                ? "border-[var(--warning)] text-[var(--warning)]"
                                : "border-transparent text-[var(--gray)] hover:border-[var(--line)]"
                            }`}
                          >
                            {criterion.name}
                            <span className="zh-translation ml-1">
                              {criterion.labelZH}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Zitierpflicht chip */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-mono text-xs text-[var(--gray)]">Belegnachweis:</span>
                      <button
                        type="button"
                        onClick={() => onJumpToLibrary?.(currentVergleich.thema)}
                        className="font-mono meta-text text-[var(--accent)] underline decoration-[var(--line)] underline-offset-4 transition-colors hover:decoration-[var(--accent)]"
                        title={lang === "de" ? "In Bibliothek öffnen" : "在笔记库中查看"}
                      >
                        [{currentVergleich.sourceRef}]
                      </button>
                    </div>

                    {/* 笔记原文对照 quote */}
                    <blockquote className="de-reading border-l-2 border-[var(--line)] pl-4 text-sm leading-relaxed text-[var(--ink)]">
                      {currentVergleich.explanationQuote}
                    </blockquote>
                  </div>
                )}
              </div>

              {/* L3 — 过程 + 元认知 (过程维 pills + "下次先…" + 文本补丁预览) */}
              <div className="space-y-4 pt-4 border-t border-[var(--line)]">
                {/* 过程维展示 pill: v3 Vorgehen-dim (manually toggleable, same tokens) */}
                <div className="flex items-center gap-3">
                  <span className="font-mono meta-text text-[var(--gray)]">PROZESSDIMENSION / 过程维:</span>
                  <div className="flex gap-2">
                    {(() => {
                      const criterion = RUBRIC_CRITERIA.find((c) => c.id === "vorgehen")!;
                      const isHit = vergleichEval.vorgehenFalsch;
                      return (
                        <button
                          type="button"
                          onClick={() => toggleVergleichPill("vorgehen")}
                          title={criterion.descriptionDE}
                          aria-pressed={isHit}
                          className={`${rubricControlClass} ${
                            isHit
                              ? "border-[var(--warning)] text-[var(--warning)]"
                              : "border-transparent text-[var(--gray)] hover:border-[var(--line)]"
                          }`}
                        >
                          {criterion.name}
                          <span className="zh-translation ml-1">{criterion.labelZH}</span>
                        </button>
                      );
                    })()}
                    {vLmDegraded && (
                      <span className="px-2 py-0.5 meta-text font-mono text-[var(--warning)]">
                        Vorlagen-Modus
                      </span>
                    )}
                  </div>
                </div>

                {/* "下次先…" 单行输入框 (store: eflernvault:vergleich:v1) */}
                <div className="space-y-1">
                  <label htmlFor="vergleich-naechstes-mal" className="block font-mono text-xs text-[var(--gray)]">
                    {tr.naechstesMal}
                  </label>
                  <input
                    id="vergleich-naechstes-mal"
                    type="text"
                    value={nextTimeText}
                    onChange={(e) => saveNextTime(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveNextTime((e.target as HTMLInputElement).value);
                      }
                    }}
                    placeholder={tr.naechstesMalPlaceholder}
                    className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-serif text-sm text-[var(--ink)] placeholder:font-sans placeholder:text-xs placeholder:text-[var(--gray)] focus:border-[var(--accent)] transition-colors"
                  />
                  <div className="meta-text font-mono text-[var(--gray)]">
                    {lang === "de"
                      ? "Gespeichert in eflernvault:vergleich:v1 · Bleibt beim nächsten Durchlauf erhalten"
                      : "自动保存至 eflernvault:vergleich:v1 · 刷新与再次打开同主题时保留"}
                  </div>
                </div>

                {/* 文本补丁预览与复制按钮 */}
                <div className="space-y-2 border-t border-[var(--line)] pt-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
                    <span>FEHLERLOG-PATCH / 错题补丁</span>
                    <span className="flex items-center gap-2">
                      {/* B2-rueckfluss: thema zurueck in den kartenstapel */}
                      <button
                        type="button"
                        onClick={() => sendBack(currentVergleich.thema)}
                        title={tr.ilBack}
                        className={quietActionClass}
                      >
                        {tr.ilBack}
                      </button>
                      <button
                        type="button"
                        onClick={copyVergleichPatch}
                        className={`${primaryTextActionClass} ${copiedVergleichPatch ? "text-[var(--ink)]" : ""}`}
                      >
                        {copiedVergleichPatch ? tr.copied : tr.copyPatch}
                      </button>
                    </span>
                  </div>
                  <pre className="block overflow-x-auto border-l-2 border-[var(--line)] pl-3 font-mono text-xs leading-relaxed text-[var(--ink)] select-all">
                    {vergleichPatch}
                  </pre>
                  {ilBackMsg && (
                    <div className="font-mono meta-text text-[var(--accent)]">
                      {ilBackMsg}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Dev-Feedback lives in the global bottom-right float. */}
    </div>
  );
}
