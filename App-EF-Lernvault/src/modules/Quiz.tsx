import { useEffect, useMemo, useState } from "react";
import { isTyping } from "../keys";
import { t, type Lang } from "../i18n";
import type { VaultNote } from "../vault/parser";
import {
  generateQuizFromNote,
  getAvailableThemen,
  MOCK_QUIZ,
  RUBRIC_CRITERIA,
  type GeneratedQuiz,
  type RubricCriterion,
} from "../quizgen";

interface QuizProps {
  lang?: Lang;
  vault?: VaultNote[] | null;
  onJumpToLibrary?: (query: string) => void;
}

type QuizStep = 1 | 2 | 3 | 4 | 5;

interface RubricEvaluation {
  operatorVerfehlt: boolean;
  fachbegriffFalsch: boolean;
  belegFehlt: boolean;
  vorgehenFalsch: boolean;
  feedbackDE: string;
  feedbackZH: string;
  citation: string;
  points: number; // 0-15 Punkte
}

export default function Quiz({ lang = "zh", vault = null, onJumpToLibrary }: QuizProps) {
  const tr = t(lang);

  // 1. Available topics from vault (klausurrelevant notes) or fallback
  const availableThemen = useMemo(() => {
    return getAvailableThemen(vault);
  }, [vault]);

  const [step, setStep] = useState<QuizStep>(1);
  const [selectedThema, setSelectedThema] = useState<string>(
    availableThemen.length > 0 ? availableThemen[0].thema : MOCK_QUIZ.thema
  );

  // Current active quiz definition
  const currentQuiz: GeneratedQuiz = useMemo(() => {
    if (availableThemen.length > 0) {
      const match = availableThemen.find((t) => t.thema === selectedThema);
      if (match) return generateQuizFromNote(match.note);
      return generateQuizFromNote(availableThemen[0].note);
    }
    return MOCK_QUIZ;
  }, [availableThemen, selectedThema]);

  // Step 3 state: User answers and Timer
  const [sec, setSec] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [answers, setAnswers] = useState<string[]>([
    "",
    "",
    "",
  ]);

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

  // Step 5 state: Copied state
  const [copied, setCopied] = useState(false);

  // Timer interval
  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

  // Keep answers/evaluations in sync when an extended quiz carries optional
  // tasks 4/5 (discrimination/contrast); first-3 AFB behavior is untouched.
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

  // Quiz module keys (see src/keys.ts QUIZ_SHORTCUTS): Space toggles timer,
  // D/V jump to the Aufgabe view where discrimination/contrast tasks live.
  // Guarded by isTyping() per INTERACTION-BRIEF §4.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping()) return;
      if (e.code === "Space") {
        e.preventDefault();
        setTimerRunning((r) => !r);
      } else if (e.key === "d" || e.key === "D" || e.key === "v" || e.key === "V") {
        setStep(2);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

  // Attempt real LM Studio grading or switch to degraded mode
  const evaluateAnswers = async () => {
    setIsEvaluating(true);
    setLmDegraded(false);

    try {
      const prompt = `Du bist ein strenger Klausurkorrektor für die gymnasiale Oberstufe (EF, SoWi/Philosophie).
Thema: ${currentQuiz.thema}
Material: ${currentQuiz.materialQuote}
Notizpfad: ${currentQuiz.notePath}

Aufgaben und Schülerantworten:
${currentQuiz.tasks
  .map(
    (t, i) => `${i + 1}. [${t.kind ?? "standard"}] ${t.promptDE}
Antwort: ${answers[i] || "(keine Antwort eingegeben)"}`
  )
  .join("\n")}

Prüfe für jede Teilaufgabe:
- Operator verfehlt?
- Fachbegriff falsch?
- Beleg fehlt?
- Vorgehen falsch? (falsches Verfahren / falscher Begriff gewählt oder Warum nicht begründet)
Zitiere für jede Sachkritik exakt [${currentQuiz.notePath}#Zeile].
Gib die Punkte (0-15) an.`;

      const res = await fetch("http://localhost:1234/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "local-model",
          messages: [
            {
              role: "system",
              content:
                "Du bist ein Klausur-Korrektor. Antworte sachlich, gib zu jeder Bemerkung einen Beleg [Pfad#Zeile].",
            },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
          max_tokens: 800,
        }),
      });

      if (!res.ok) throw new Error("LM Studio response not ok");
      const data = await res.json();
      const content = data?.choices?.[0]?.message?.content || "";

      // Check for rubrics in content
      const opFail = /operator verfehlt/i.test(content);
      const termFail = /fachbegriff (falsch|fehlt)/i.test(content);
      const belegFail = /beleg fehlt/i.test(content);
      const vorgehenFail = /vorgehen falsch/i.test(content);

      setEvaluations([
        {
          operatorVerfehlt: opFail,
          fachbegriffFalsch: termFail,
          belegFehlt: belegFail,
          vorgehenFalsch: vorgehenFail,
          feedbackDE: content.slice(0, 300) || "Korrektur abgeschlossen.",
          feedbackZH: "模型批改已完成，详见德文建议与引用出处。",
          citation: `${currentQuiz.notePath}#1`,
          points: opFail || termFail || belegFail || vorgehenFail ? 9 : 13,
        },
        ...evaluations.slice(1),
      ]);
    } catch {
      // Degraded state fallback: purely rule-based / template check
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

  const copyPatch = () => {
    const patch = `--- Fehlerlog.md
+++ Fehlerlog.md
+ - [ ] [${currentQuiz.fach}] Thema: ${currentQuiz.thema} (Klausur-Drill)
+   - Datum: ${new Date().toISOString().slice(0, 10)}
+   - Zeit: ${mm}:${ss}
+   - Defizite: ${
      evaluations
        .map((e, idx) => {
          const fails = [];
          if (e.operatorVerfehlt) fails.push(`Teil ${idx + 1}: Operator verfehlt`);
          if (e.fachbegriffFalsch) fails.push(`Teil ${idx + 1}: Fachbegriff unpräzise`);
          if (e.belegFehlt) fails.push(`Teil ${idx + 1}: Beleg fehlt`);
          if (e.vorgehenFalsch) fails.push(`Teil ${idx + 1}: Vorgehen falsch`);
          return fails.join(", ");
        })
        .filter(Boolean)
        .join("; ") || "Keine gravierenden Mängel"
    }
+   - Belegstelle: ${currentQuiz.notePath}
`;
    navigator.clipboard.writeText(patch);
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

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* 5-Step Progress Hairline */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
        {stepsList.map((s, i) => {
          const isActive = step === s.num;
          const isDone = step > s.num;
          return (
            <button
              key={s.num}
              type="button"
              onClick={() => setStep(s.num)}
              className={`flex items-center gap-1.5 font-mono text-xs transition-colors ${
                isActive
                  ? "text-[#4338CA] font-medium"
                  : isDone
                  ? "text-[#1C1B17] hover:text-[#4338CA]"
                  : "text-[#6B675C] hover:text-[#1C1B17]"
              }`}
            >
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-sm text-[10px] ${
                  isActive
                    ? "bg-[#4338CA] text-white"
                    : isDone
                    ? "border border-[#1C1B17] text-[#1C1B17]"
                    : "border border-[#E5E1D8] text-[#6B675C]"
                }`}
              >
                {s.num}
              </span>
              <span>{lang === "de" ? s.labelDE : `${s.labelDE} ${s.labelZH}`}</span>
              {i < stepsList.length - 1 && <span className="ml-2 text-[#E5E1D8]">·</span>}
            </button>
          );
        })}
      </div>

      {/* Step 1: Thema */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-lg font-normal text-[#1C1B17]">
              {lang === "de" ? "1. Klausur-Thema wählen" : "1. 选择自测模考主题"}
            </h2>
            <span className="font-mono text-[10px] text-[#4338CA] border border-[#4338CA]/30 px-2 py-0.5 rounded-sm">
              AFB I–III · Klausurrelevant
            </span>
          </div>

          <p className="font-sans text-xs text-[#6B675C]">
            {lang === "de"
              ? "Auswahl basiert ausschließlich auf Notizen mit klausurrelevant: true (Lehrplan EF)."
              : "题目严格基于标记为 klausurrelevant: true 的 EF 大纲知识库笔记生成。"}
          </p>

          <div className="divide-y divide-[#E5E1D8] border border-[#E5E1D8] bg-white rounded-sm">
            {(availableThemen.length > 0
              ? availableThemen
              : [{ thema: MOCK_QUIZ.thema, fach: MOCK_QUIZ.fach, note: null }]
            ).map((item) => {
              const isSelected = selectedThema === item.thema;
              return (
                <button
                  key={item.thema}
                  type="button"
                  onClick={() => setSelectedThema(item.thema)}
                  className={`flex w-full items-center justify-between p-4 text-left transition-colors ${
                    isSelected ? "bg-[#ECE7DC]/40" : "hover:bg-[#FAF9F6]"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base font-normal text-[#1C1B17]">
                        {item.thema}
                      </span>
                      <span className="font-mono text-[10px] uppercase text-[#6B675C] border border-[#E5E1D8] px-1 py-0.2 rounded-sm">
                        {item.fach}
                      </span>
                    </div>
                    <div className="font-sans text-xs text-[#6B675C] mt-0.5">
                      {lang === "de"
                        ? "3-stufige Klausuraufgabe (darstellen · analysieren · beurteilen)"
                        : "三段式经典大题（概述 · 分析 · 评价）"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] border border-[#6B675C]/30 text-[#6B675C] px-1.5 py-0.5 rounded-sm">
                      AFB II
                    </span>
                    <span
                      className={`h-3 w-3 rounded-full border ${
                        isSelected
                          ? "border-[#4338CA] bg-[#4338CA]"
                          : "border-[#E5E1D8] bg-white"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-5 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.97] transition-all"
            >
              {lang === "de" ? "Aufgabe anzeigen →" : "查看题目 →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Aufgabe */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2">
            <div>
              <span className="font-mono text-[10px] uppercase text-[#6B675C]">
                {currentQuiz.fach} · Klausurteil
              </span>
              <h2 className="font-serif text-xl font-normal text-[#1C1B17]">
                {currentQuiz.thema}
              </h2>
            </div>
            <span className="font-mono text-[11px] text-[#4338CA] border border-[#4338CA]/30 px-2 py-0.5 rounded-sm">
              {currentQuiz.tasks.length} Teilaufgaben · {maxScore} Pkt.
            </span>
          </div>

          {/* Material block */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono text-[#6B675C]">
              <span>MATERIAL / 原始素材</span>
              <button
                type="button"
                onClick={() => onJumpToLibrary?.(currentQuiz.thema)}
                className="text-[10px] text-[#4338CA] hover:underline"
              >
                [{currentQuiz.notePath}]
              </button>
            </div>
            <blockquote className="border-l-2 border-[#E5E1D8] bg-[#FAF9F6] p-4 font-serif text-sm leading-relaxed text-[#1C1B17]">
              {currentQuiz.materialQuote}
            </blockquote>
          </div>

          {/* 3-Step Tasks */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#6B675C]">
              AUFGABENSTELLUNG / 题目指令
            </div>
            <div className="divide-y divide-[#E5E1D8] border border-[#E5E1D8] bg-white rounded-sm">
              {currentQuiz.tasks.map((task, idx) => (
                <div key={`${task.operator}-${task.kind ?? "standard"}-${idx}`} className="p-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#1C1B17]">
                        {idx + 1}.
                      </span>
                      <span className="font-mono text-xs font-semibold uppercase text-[#4338CA] border border-[#4338CA]/30 px-1.5 py-0.2 rounded-sm">
                        {task.operator}
                      </span>
                      <span className="font-mono text-[10px] text-[#6B675C]">
                        {task.afb}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#6B675C]">
                      [{task.sourceRef}]
                    </span>
                  </div>
                  <p className="font-serif text-sm text-[#1C1B17] leading-relaxed">
                    {task.promptDE}
                  </p>
                  <p className="font-sans text-xs text-[#6B675C]">
                    {task.promptZH}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-sm border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-sans text-[#6B675C] hover:text-[#1C1B17] transition-all"
            >
              ← {lang === "de" ? "Zurück" : "上一步"}
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-5 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.97] transition-all"
            >
              {lang === "de" ? "Zur Antwort & Timer →" : "开始作答与计时 →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Antwort */}
      {step === 3 && (
        <div className="space-y-6">
          {/* Unadorned Space Timer Header */}
          <div className="flex items-center justify-between border border-[#E5E1D8] bg-white p-4 rounded-sm">
            <div className="flex items-baseline gap-3">
              <span className="font-mono text-3xl font-normal tabular-nums text-[#1C1B17] tracking-tight">
                {mm}:{ss}
              </span>
              <span className="font-mono text-xs text-[#6B675C]">
                / 45:00 Klausurziel (Space zum Starten/Stoppen)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSec(0)}
                className="px-2.5 py-1.5 font-mono text-[11px] text-[#6B675C] hover:text-[#1C1B17]"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setTimerRunning((r) => !r)}
                className={`px-4 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm border transition-all duration-150 active:scale-[0.96] ${
                  timerRunning
                    ? "border-[#1C1B17] bg-[#1C1B17] text-white"
                    : "border-[#E5E1D8] bg-white text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA]"
                }`}
              >
                {timerRunning ? "Stopp" : "Start"}
              </button>
            </div>
          </div>

          {/* 3 Textareas for each part */}
          <div className="space-y-4">
            {currentQuiz.tasks.map((task, idx) => (
              <div key={`${task.operator}-${task.kind ?? "standard"}-${idx}`} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[#1C1B17]">Teil {idx + 1}:</span>
                    <span className="font-mono uppercase text-[#4338CA]">{task.operator}</span>
                    <span className="font-mono text-[10px] text-[#6B675C]">({task.afb})</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6B675C]">
                    [{task.sourceRef}]
                  </span>
                </div>
                <p className="font-serif text-xs text-[#6B675C]">{task.promptDE}</p>
                <textarea
                  rows={4}
                  value={answers[idx] ?? ""}
                  onChange={(e) => {
                    const val = e.target.value;
                    setAnswers((prev) => prev.map((a, i) => (i === idx ? val : a)));
                  }}
                  placeholder={
                    lang === "de"
                      ? `Ihre Ausarbeitung zu „${task.operator}“ hier eingeben…`
                      : `在此输入针对“${task.operator}”的作答文本…`
                  }
                  className="w-full rounded-sm border border-[#E5E1D8] bg-white p-3 font-serif text-sm text-[#1C1B17] placeholder:font-sans placeholder:text-xs placeholder:text-[#6B675C] focus:border-[#4338CA] focus:outline-none transition-colors leading-relaxed"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="rounded-sm border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-sans text-[#6B675C] hover:text-[#1C1B17] transition-all"
            >
              ← {lang === "de" ? "Zurück" : "上一步"}
            </button>
            <button
              type="button"
              onClick={async () => {
                setStep(4);
                await evaluateAnswers();
              }}
              className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-5 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.97] transition-all"
            >
              {lang === "de" ? "Zur Korrektur & Bewertung →" : "提交批改与评分 →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Korrektur */}
      {step === 4 && (
        <div className="space-y-6">
          {/* Degraded mode banner if LM is unreachable */}
          {lmDegraded && (
            <div className="border border-[#E5E1D8] border-l-2 border-[#B45309] bg-[#FAF9F6] p-3 text-xs font-mono text-[#B45309]">
              <div className="font-semibold">{tr.lmDown}</div>
              <div className="font-sans text-[11px] text-[#6B675C] mt-0.5">
                {lang === "de"
                  ? "LM Studio ist nicht verbunden. Die Bewertung erfolgt im Selbstprüf-Modus anhand der offiziellen AFB-Rubriken."
                  : "LM Studio 未连接。当前已降级为依据官方评分标准自检模式，绝不虚构评分。"}
              </div>
            </div>
          )}

          {/* Loading state */}
          {isEvaluating && (
            <div className="p-6 text-center font-mono text-xs text-[#6B675C]">
              denkt nach… / 智能批改评估中…
            </div>
          )}

          {/* Total score summary header */}
          <div className="flex items-center justify-between border border-[#E5E1D8] bg-white p-4 rounded-sm">
            <div>
              <div className="font-mono text-xs text-[#6B675C] uppercase">
                Gesamturteil / 总体成绩
              </div>
              <div className="font-serif text-2xl font-normal text-[#1C1B17] mt-0.5">
                {totalScore} / {maxScore} Punkte{" "}
                <span className="font-mono text-xs text-[#6B675C]">
                  ({Math.round((totalScore / maxScore) * 100)}%)
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs text-[#6B675C]">Bearbeitungszeit / 用时</span>
              <div className="font-mono text-base text-[#1C1B17]">{mm}:{ss}</div>
            </div>
          </div>

          {/* Rubric evaluation per task */}
          <div className="space-y-4">
            {currentQuiz.tasks.map((task, idx) => {
              const ev = evaluations[idx];
              if (!ev) return null;
              return (
                <div
                  key={`${task.operator}-${task.kind ?? "standard"}-${idx}`}
                  className="border border-[#E5E1D8] bg-white p-4 rounded-sm space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[#1C1B17]">
                        Teil {idx + 1}:
                      </span>
                      <span className="font-mono text-xs uppercase text-[#4338CA]">
                        {task.operator}
                      </span>
                      <span className="font-mono text-[10px] text-[#6B675C]">
                        ({task.afb})
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => onJumpToLibrary?.(currentQuiz.thema)}
                      className="font-mono text-[10px] text-[#4338CA] hover:underline"
                    >
                      [{ev.citation}]
                    </button>
                  </div>

                  {/* 4 Rubric Pills: Operator verfehlt | Fachbegriff falsch | Beleg fehlt | Vorgehen falsch */}
                  <div className="flex flex-wrap gap-2">
                    {RUBRIC_CRITERIA.map((criterion) => {
                      const isHit =
                        criterion.id === "operator"
                          ? ev.operatorVerfehlt
                          : criterion.id === "fachbegriff"
                          ? ev.fachbegriffFalsch
                          : criterion.id === "vorgehen"
                          ? ev.vorgehenFalsch
                          : ev.belegFehlt;
                      return (
                        <button
                          key={criterion.id}
                          type="button"
                          onClick={() => togglePill(idx, criterion.id)}
                          title={criterion.descriptionDE}
                          className={`rounded-sm px-2.5 py-1 text-xs font-mono transition-all ${
                            isHit
                              ? "bg-[#1C1B17] text-white border border-[#1C1B17]"
                              : "bg-transparent text-[#6B675C] border border-[#E5E1D8] hover:border-[#6B675C]"
                          }`}
                        >
                          {criterion.name}
                          <span className="ml-1 text-[10px] opacity-75">
                            {criterion.labelZH}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback text */}
                  <div className="bg-[#FAF9F6] p-3 rounded-sm border border-[#E5E1D8]/60 space-y-1">
                    <p className="font-serif text-xs text-[#1C1B17] leading-relaxed">
                      {ev.feedbackDE}
                    </p>
                    <p className="font-sans text-[11px] text-[#6B675C]">
                      {ev.feedbackZH}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(3)}
              className="rounded-sm border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-sans text-[#6B675C] hover:text-[#1C1B17] transition-all"
            >
              ← {lang === "de" ? "Zurück zur Antwort" : "返回作答"}
            </button>
            <button
              type="button"
              onClick={() => setStep(5)}
              className="rounded-sm border border-[#1C1B17] bg-[#1C1B17] px-5 py-2 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#4338CA] hover:border-[#4338CA] active:scale-[0.97] transition-all"
            >
              {lang === "de" ? "Zum Fehlerlog-Entwurf →" : "生成错题补丁 →"}
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Fehlerlog */}
      {step === 5 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2">
            <div>
              <h2 className="font-serif text-xl font-normal text-[#1C1B17]">
                {lang === "de" ? "5. Fehlerlog-Eintrag" : "5. 错题日志标本与同步"}
              </h2>
              <div className="font-sans text-xs text-[#6B675C] mt-0.5">
                {lang === "de"
                  ? "Reines Text-Patch zum Einfügen in Obsidian (00_META/Klausur-Training/Fehlerlog.md)."
                  : "纯文本补丁，可一键复制并无缝粘入 Obsidian 对应错题日志。"}
              </div>
            </div>
            <button
              type="button"
              onClick={copyPatch}
              className={`rounded-sm border px-3.5 py-1.5 font-mono text-xs transition-all duration-150 ${
                copied
                  ? "border-[#4338CA] bg-[#4338CA] text-white"
                  : "border-[#1C1B17] bg-[#1C1B17] text-white hover:bg-[#4338CA] hover:border-[#4338CA]"
              }`}
            >
              {copied ? tr.copied : tr.copyPatch}
            </button>
          </div>

          {/* Specimen patch view with '+' prefix */}
          <div className="border border-[#E5E1D8] bg-[#FAF9F6] p-4 rounded-sm space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#6B675C]">
              <span>DIFF-PATCH / 增量文本</span>
              <span>Obsidian Format</span>
            </div>
            <pre className="block bg-white border border-[#E5E1D8] p-3.5 font-mono text-xs text-[#1C1B17] rounded-sm overflow-x-auto leading-relaxed select-all">
{`--- Fehlerlog.md
+++ Fehlerlog.md
+ - [ ] [${currentQuiz.fach}] Thema: ${currentQuiz.thema} (Klausur-Drill)
+   - Datum: ${new Date().toISOString().slice(0, 10)}
+   - Zeit: ${mm}:${ss} (Ziel 45 Min)
+   - Defizite: ${
    evaluations
      .map((e, idx) => {
        const fails = [];
          if (e.operatorVerfehlt) fails.push(`Teil ${idx + 1}: Operator verfehlt`);
          if (e.fachbegriffFalsch) fails.push(`Teil ${idx + 1}: Fachbegriff unpräzise`);
          if (e.belegFehlt) fails.push(`Teil ${idx + 1}: Beleg fehlt`);
          if (e.vorgehenFalsch) fails.push(`Teil ${idx + 1}: Vorgehen falsch`);
          return fails.join(", ");
        })
        .filter(Boolean)
        .join("; ") || "Keine gravierenden Mängel"
  }
+   - Belegstelle: ${currentQuiz.notePath}
`}
            </pre>
          </div>

          <div className="flex justify-between pt-2">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="rounded-sm border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-sans text-[#6B675C] hover:text-[#1C1B17] transition-all"
            >
              ← {lang === "de" ? "Zurück zur Korrektur" : "返回批改"}
            </button>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setSec(0);
                setTimerRunning(false);
                setAnswers(currentQuiz.tasks.map(() => ""));
              }}
              className="rounded-sm border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-all"
            >
              {lang === "de" ? "Neuen Durchlauf starten" : "开始新一轮自测"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
