import { useEffect, useMemo, useRef, useState } from "react";
import { isTyping } from "../keys";
import { t, type Lang } from "../i18n";
import type { VaultNote } from "../vault/parser";
import {
  generateQuizFromNote,
  getAvailableThemen,
  getVergleichItems,
  MOCK_QUIZ,
  RUBRIC_CRITERIA,
  type GeneratedQuiz,
  type RubricCriterion,
  type VergleichItem,
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

const VERGLEICH_STORAGE_KEY = "eflernvault:vergleich:v1";

interface VergleichStorage {
  version: 1;
  nextTimes: Record<string, string>;
}

function loadVergleichStorage(): VergleichStorage {
  try {
    const raw = localStorage.getItem(VERGLEICH_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === 1 && typeof parsed.nextTimes === "object") {
        return parsed as VergleichStorage;
      }
    }
  } catch (err) {
    console.warn("Failed to load vergleich storage", err);
  }
  return { version: 1, nextTimes: {} };
}

function saveVergleichStorage(storage: VergleichStorage) {
  try {
    localStorage.setItem(VERGLEICH_STORAGE_KEY, JSON.stringify(storage));
  } catch (err) {
    console.error("Failed to save vergleich storage", err);
  }
}

export default function Quiz({ lang = "zh", vault = null, onJumpToLibrary }: QuizProps) {
  const tr = t(lang);

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
    return getAvailableThemen(vault);
  }, [vault]);

  const [step, setStep] = useState<QuizStep>(1);
  const [selectedThema, setSelectedThema] = useState<string>(
    availableThemen.length > 0 ? availableThemen[0].thema : MOCK_QUIZ.thema
  );

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

  // Timer interval for Klausur-drill
  useEffect(() => {
    if (!timerRunning) return;
    const id = setInterval(() => setSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [timerRunning]);

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

  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");

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

  // ==================== VERGLEICH-DRILL STATE (V4) ====================
  const vergleichItems = useMemo(() => getVergleichItems(vault), [vault]);
  const [activeVergleichIdx, setActiveVergleichIdx] = useState(0);
  const currentVergleich: VergleichItem = vergleichItems[activeVergleichIdx] || vergleichItems[0];

  const [vSec, setVSec] = useState(0);
  const [vTimerRunning, setVTimerRunning] = useState(false);
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

  // Timer interval for Vergleich
  useEffect(() => {
    if (!vTimerRunning) return;
    const id = setInterval(() => setVSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [vTimerRunning]);

  const prevVergleichId = useRef(currentVergleich.id);

  // Load "下次先…" when changing item
  useEffect(() => {
    const store = loadVergleichStorage();
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
    const store = loadVergleichStorage();
    store.nextTimes[currentVergleich.id] = text;
    saveVergleichStorage(store);
  };

  const vMm = String(Math.floor(vSec / 60)).padStart(2, "0");
  const vSs = String(vSec % 60).padStart(2, "0");

  const isCorrect = selectedOption === currentVergleich.correctOption;

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
      const prompt = `Du bist ein strenger Klausurkorrektor für die gymnasiale Oberstufe (EF, ${currentVergleich.fach}).
Thema: ${currentVergleich.thema}
Wahl: Option ${selectedOption ?? "-"} (korrekt: Option ${currentVergleich.correctOption})
Begründung: ${begruendung || "(keine Angabe)"}
Beleg: ${currentVergleich.sourceRef}

Prüfe:
- Operator verfehlt?
- Fachbegriff falsch?
- Beleg fehlt?
- Vorgehen falsch? (falsches Verfahren / falscher Begriff gewählt oder Warum nicht begründet)
Zitiere für jede Sachkritik exakt [${currentVergleich.sourceRef}].`;
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
          max_tokens: 400,
        }),
      });
      if (!res.ok) throw new Error("LM Studio response not ok");
      const data = await res.json();
      const content: string = data?.choices?.[0]?.message?.content || "";
      setVergleichEval({
        operatorVerfehlt: /operator verfehlt/i.test(content),
        fachbegriffFalsch: /fachbegriff (falsch|fehlt)/i.test(content),
        belegFehlt: /beleg fehlt/i.test(content),
        vorgehenFalsch: /vorgehen falsch/i.test(content),
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

      if (e.code === "Space") {
        e.preventDefault();
        if (drillMode === "klausur") {
          setTimerRunning((r) => !r);
        } else {
          setVTimerRunning((r) => !r);
        }
      } else if (drillMode === "vergleich") {
        if (e.key === "1") {
          e.preventDefault();
          setSelectedOption("A");
        } else if (e.key === "2") {
          e.preventDefault();
          setSelectedOption("B");
        }
      } else if (drillMode === "klausur") {
        if (e.key === "d" || e.key === "D" || e.key === "v" || e.key === "V") {
          setDrillMode("vergleich");
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drillMode]);

  const copyVergleichPatch = () => {
    const patch = `--- Fehlerlog.md
+++ Fehlerlog.md
+ - [ ] [${currentVergleich.fach}] Vergleich: ${currentVergleich.thema}
+   - Datum: ${new Date().toISOString().slice(0, 10)}
+   - Ergebnis: ${isCorrect ? "Richtig" : "Falsch (gute Signale zur Schärfung)"}
+   - Gewählt: Option ${selectedOption || "-"}
+   - Begründung: ${warumText.trim() || "(keine Angabe)"}
+   - Nächstes Mal: ${nextTimeText.trim() || "Erst Operator markieren"}
+   - Belegstelle: ${currentVergleich.sourceRef}
`;
    navigator.clipboard.writeText(patch);
    setCopiedVergleichPatch(true);
    setTimeout(() => setCopiedVergleichPatch(false), 1500);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Top Drill-Mode Switcher: Klausur-Drill vs. Vergleich-Training */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setDrillMode("klausur")}
            className={`font-serif text-sm transition-all pb-1 border-b-2 ${
              drillMode === "klausur"
                ? "border-[#4338CA] text-[#4338CA] font-medium"
                : "border-transparent text-[#6B675C] hover:text-[#1C1B17]"
            }`}
          >
            {tr.klausurDrill}
          </button>
          <button
            type="button"
            onClick={() => setDrillMode("vergleich")}
            className={`font-serif text-sm transition-all pb-1 border-b-2 ${
              drillMode === "vergleich"
                ? "border-[#4338CA] text-[#4338CA] font-medium"
                : "border-transparent text-[#6B675C] hover:text-[#1C1B17]"
            }`}
          >
            {tr.vergleichDrill}
          </button>
        </div>

        <span className="font-mono text-[10px] text-[#4338CA] border border-[#4338CA]/30 px-2 py-0.5 rounded-sm">
          {drillMode === "klausur" ? "AFB I–III · 5 Schritte" : "AFB II–III · Kontrast"}
        </span>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: KLAUSUR-DRILL (V3 5-Step Stepper + V4 Desirable Difficulty Texts) */}
      {/* ========================================================================= */}
      {drillMode === "klausur" && (
        <div className="space-y-6">
          {/* 5-Step Progress Hairline */}
          <div className="space-y-2 border-b border-[#E5E1D8] pb-3">
            <div className="flex items-center justify-between">
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

            {/* V4 ddHard mounting: below step hairline, permanent mono 11px gray */}
            <div className="text-[11px] font-mono text-[#6B675C]">
              {tr.ddHard}
            </div>
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

              {/* V4 ddInterleave mounting: below topics list, permanent mono 11px gray */}
              <div className="font-mono text-[11px] text-[#6B675C] pt-1">
                {tr.ddInterleave}
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
                {/* V4 ddExample mounting: one line above quote block, permanent mono 11px gray */}
                <div className="font-mono text-[11px] text-[#6B675C]">
                  {tr.ddExample}
                </div>

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

              {/* Tasks List */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#6B675C]">
                  AUFGABENSTELLUNG / 题目指令
                </div>
                <div className="divide-y divide-[#E5E1D8] border border-[#E5E1D8] bg-white rounded-sm">
                  {currentQuiz.tasks.map((task, idx) => (
                    <div key={task.operator + idx} className="p-4 space-y-1.5">
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

              <div className="space-y-4">
                {currentQuiz.tasks.map((task, idx) => (
                  <div key={task.operator + idx} className="space-y-1.5">
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

              {isEvaluating && (
                <div className="p-6 text-center font-mono text-xs text-[#6B675C]">
                  denkt nach… / 智能批改评估中…
                </div>
              )}

              {/* V4 ddError mounting in Step 4 Header if flaws exist */}
              {evaluations.some(
                (e) => e.operatorVerfehlt || e.fachbegriffFalsch || e.belegFehlt || e.vorgehenFalsch
              ) && (
                <div className="font-mono text-[11px] text-[#6B675C] bg-[#FAF9F6] border border-[#E5E1D8] p-2 rounded-sm flex items-center justify-between">
                  <span>{tr.ddError}</span>
                  <span className="text-[10px] text-[#B45309]">Defizite erkannt / 发现待优化项</span>
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
                  return (
                    <div
                      key={task.operator + idx}
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

                      <div className="bg-[#FAF9F6] p-3 rounded-sm border border-[#E5E1D8]/60 space-y-1">
                        <p className="font-serif text-xs text-[#1C1B17] leading-relaxed">
                          {ev?.feedbackDE}
                        </p>
                        <p className="font-sans text-[11px] text-[#6B675C]">
                          {ev?.feedbackZH}
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

              {/* V4 ddRetrieval mounting: inside Fehlerlog view */}
              <div className="font-mono text-[11px] text-[#6B675C]">
                {tr.ddRetrieval}
              </div>

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
                    setAnswers(["", "", ""]);
                  }}
                  className="rounded-sm border border-[#E5E1D8] bg-white px-4 py-2 text-xs font-sans text-[#1C1B17] hover:border-[#4338CA] hover:text-[#4338CA] transition-all"
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
          <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-[#1C1B17]">
                  {currentVergleich.fach}
                </span>
                <span className="text-[#E5E1D8]">·</span>
                <span className="font-serif text-lg font-normal text-[#1C1B17]">
                  {currentVergleich.thema}
                </span>
                <span className="font-mono text-[10px] text-[#4338CA] border border-[#4338CA]/30 px-1.5 py-0.2 rounded-sm">
                  {currentVergleich.afb}
                </span>
              </div>
              <div className="font-mono text-[11px] text-[#6B675C] mt-1">
                {tr.ddHard}
              </div>
            </div>

            {/* Timer */}
            <div className="flex items-center gap-3">
              <span className="font-mono text-2xl font-normal tabular-nums text-[#1C1B17]">
                {vMm}:{vSs}
              </span>
              <button
                type="button"
                onClick={() => setVTimerRunning((r) => !r)}
                className={`px-3 py-1 font-mono text-xs uppercase tracking-wider rounded-sm border transition-all ${
                  vTimerRunning
                    ? "border-[#1C1B17] bg-[#1C1B17] text-white"
                    : "border-[#E5E1D8] bg-white text-[#1C1B17] hover:border-[#4338CA]"
                }`}
              >
                {vTimerRunning ? "Stopp" : "Start"}
              </button>
            </div>
          </div>

          {/* Topic Selector Tabs for Vergleich items */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {vergleichItems.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveVergleichIdx(idx)}
                className={`px-3 py-1 rounded-sm text-xs font-mono transition-all border ${
                  activeVergleichIdx === idx
                    ? "border-[#4338CA] text-[#4338CA] bg-[#4338CA]/5 font-medium"
                    : "border-[#E5E1D8] text-[#6B675C] hover:text-[#1C1B17] bg-white"
                }`}
              >
                {idx + 1}. {item.fach} · {item.thema}
              </button>
            ))}
          </div>

          {/* §1.1 辨别题展示: 题干区 (DE serif 上 / ZH sans 小灰下) + Operator 高亮 */}
          <div className="border border-[#E5E1D8] bg-white p-5 rounded-sm space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#6B675C]">
                <div className="flex items-center gap-2">
                  <span className="uppercase text-[#4338CA] font-semibold border border-[#4338CA]/30 px-1.5 py-0.2 rounded-sm">
                    {currentVergleich.operator}
                  </span>
                  <span>AUFGABE / 辨别任务</span>
                </div>
                <button
                  type="button"
                  onClick={() => onJumpToLibrary?.(currentVergleich.thema)}
                  className="text-[10px] text-[#4338CA] hover:underline"
                >
                  [{currentVergleich.sourceRef}]
                </button>
              </div>

              <div className="font-serif text-base text-[#1C1B17] leading-relaxed">
                {currentVergleich.promptDE}
              </div>
              <div className="font-sans text-xs text-[#6B675C]">
                {currentVergleich.promptZH}
              </div>
            </div>

            {/* Material Quote Block */}
            <blockquote className="border-l-2 border-[#E5E1D8] bg-[#FAF9F6] p-3.5 font-serif text-xs leading-relaxed text-[#1C1B17]">
              {currentVergleich.materialQuote}
            </blockquote>

            {/* 二选一程序按钮 (A/B 文字按钮，下划线/细线分隔，不是两色大按钮，键盘 1/2 可选) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-xs font-mono text-[#6B675C]">
                <span>VERFAHRENSWAHL / 程序概念选择 (1 / 2)</span>
                <span>{selectedOption ? `Gewählt: Option ${selectedOption}` : "Bitte wählen"}</span>
              </div>
              <div className="grid grid-cols-2 divide-x divide-[#E5E1D8] border border-[#E5E1D8] rounded-sm bg-white overflow-hidden">
                <button
                  type="button"
                  onClick={() => setSelectedOption("A")}
                  className={`py-3 px-4 text-left font-serif text-sm transition-colors cursor-pointer ${
                    selectedOption === "A"
                      ? "bg-[#1C1B17] text-white"
                      : "bg-white text-[#1C1B17] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{currentVergleich.optionA.labelDE}</span>
                    <kbd className={`font-mono text-[10px] px-1 py-0.2 rounded-sm border ${
                      selectedOption === "A"
                        ? "border-white/40 text-white/80"
                        : "border-[#E5E1D8] text-[#6B675C]"
                    }`}>
                      1
                    </kbd>
                  </div>
                  <div className={`font-sans text-xs mt-0.5 ${
                    selectedOption === "A" ? "text-white/70" : "text-[#6B675C]"
                  }`}>
                    {currentVergleich.optionA.labelZH}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedOption("B")}
                  className={`py-3 px-4 text-left font-serif text-sm transition-colors cursor-pointer ${
                    selectedOption === "B"
                      ? "bg-[#1C1B17] text-white"
                      : "bg-white text-[#1C1B17] hover:bg-[#FAF9F6]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{currentVergleich.optionB.labelDE}</span>
                    <kbd className={`font-mono text-[10px] px-1 py-0.2 rounded-sm border ${
                      selectedOption === "B"
                        ? "border-white/40 text-white/80"
                        : "border-[#E5E1D8] text-[#6B675C]"
                    }`}>
                      2
                    </kbd>
                  </div>
                  <div className={`font-sans text-xs mt-0.5 ${
                    selectedOption === "B" ? "text-white/70" : "text-[#6B675C]"
                  }`}>
                    {currentVergleich.optionB.labelZH}
                  </div>
                </button>
              </div>
            </div>

            {/* "为什么" 输入框 (textarea 2行，hairline 框，聚焦时单键不劫持) */}
            <div className="space-y-1.5 pt-1">
              <label className="block text-xs font-mono text-[#6B675C]">
                BEGRÜNDUNG / 为什么选它？
              </label>
              <textarea
                rows={2}
                value={warumText}
                onChange={(e) => setWarumText(e.target.value)}
                placeholder={tr.warumPlaceholder}
                className="w-full rounded-sm border border-[#E5E1D8] bg-white p-2.5 font-serif text-sm text-[#1C1B17] placeholder:font-sans placeholder:text-xs placeholder:text-[#6B675C] focus:border-[#4338CA] focus:outline-none transition-colors"
              />
            </div>

            {/* 提交行: 主按钮 Vergleichen / 对照看看 (选错也可提交进解析，不锁死) */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E5E1D8]/70">
              <span className="font-mono text-[11px] text-[#6B675C]">
                {selectedOption ? "Bereit zum Vergleich" : "Wählen Sie A oder B"}
              </span>
              <button
                type="button"
                disabled={!selectedOption}
                onClick={() => {
                  setIsSubmitted(true);
                  void evaluateVergleichLM();
                }}
                className="rounded-sm border border-[#4338CA] bg-white px-5 py-2 text-xs font-mono uppercase tracking-wider text-[#4338CA] hover:bg-[#4338CA] hover:text-white disabled:opacity-40 active:scale-[0.97] transition-all"
              >
                {tr.vergleichen}
              </button>
            </div>
          </div>

          {/* §1.2 对比题 AB 并排 (Tufte 小多组图风格: 两列并排，差异高亮≤3处加粗底线，<900px自动堆叠) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-[#6B675C]">
              <span>KONTRAST-VERGLEICH / 双向对照（Tufte 多重并排）</span>
              <span className="text-[10px]">Max 3 Differenz-Markierungen</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-[#E5E1D8] bg-white rounded-sm p-4 divide-y md:divide-y-0 md:divide-x divide-[#E5E1D8]">
              {/* Column A */}
              <div className="space-y-2.5 pr-0 md:pr-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C] border-b border-[#E5E1D8] pb-1">
                  {currentVergleich.optionA.column.titleDE}
                  <div className="font-sans text-[10px] text-[#6B675C]">
                    {currentVergleich.optionA.column.titleZH}
                  </div>
                </div>
                <div className="font-serif text-xs leading-relaxed text-[#1C1B17] bg-[#FAF9F6] p-3 rounded-sm border border-[#E5E1D8]/60">
                  {currentVergleich.optionA.column.quoteSegments.map((seg, sIdx) =>
                    seg.highlight ? (
                      <span
                        key={sIdx}
                        className="font-medium underline decoration-[#4338CA] underline-offset-2"
                      >
                        {seg.text}
                      </span>
                    ) : (
                      <span key={sIdx}>{seg.text}</span>
                    )
                  )}
                </div>
                <div className="pt-1">
                  <div className="font-serif text-xs text-[#1C1B17]">
                    {currentVergleich.optionA.column.conclusionDE}
                  </div>
                  <div className="font-sans text-[11px] text-[#6B675C] mt-0.5">
                    {currentVergleich.optionA.column.conclusionZH}
                  </div>
                </div>
              </div>

              {/* Column B */}
              <div className="space-y-2.5 pt-4 md:pt-0 pl-0 md:pl-4">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[#6B675C] border-b border-[#E5E1D8] pb-1">
                  {currentVergleich.optionB.column.titleDE}
                  <div className="font-sans text-[10px] text-[#6B675C]">
                    {currentVergleich.optionB.column.titleZH}
                  </div>
                </div>
                <div className="font-serif text-xs leading-relaxed text-[#1C1B17] bg-[#FAF9F6] p-3 rounded-sm border border-[#E5E1D8]/60">
                  {currentVergleich.optionB.column.quoteSegments.map((seg, sIdx) =>
                    seg.highlight ? (
                      <span
                        key={sIdx}
                        className="font-medium underline decoration-[#4338CA] underline-offset-2"
                      >
                        {seg.text}
                      </span>
                    ) : (
                      <span key={sIdx}>{seg.text}</span>
                    )
                  )}
                </div>
                <div className="pt-1">
                  <div className="font-serif text-xs text-[#1C1B17]">
                    {currentVergleich.optionB.column.conclusionDE}
                  </div>
                  <div className="font-sans text-[11px] text-[#6B675C] mt-0.5">
                    {currentVergleich.optionB.column.conclusionZH}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* §1.3 Gating & §2 反馈三层 (L1 即时 KR → L2 延迟展开 → L3 过程+元认知) */}
          {isSubmitted && (
            <div className="border border-[#E5E1D8] bg-white p-5 rounded-sm space-y-5 animate-fade-in">
              {/* L1 — 即时 KR (Knowledge of Result) */}
              <div className="space-y-2 border-b border-[#E5E1D8] pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {isCorrect ? (
                      <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-sm bg-[#1C1B17] text-white border border-[#1C1B17]">
                        {tr.richtig}
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold px-2.5 py-1 rounded-sm bg-transparent text-[#991B1B] border border-[#991B1B]">
                          {tr.falsch}
                        </span>
                        {/* ddError: Fehler sind gute Signale / 选错是好信号 */}
                        <span className="font-mono text-[11px] text-[#6B675C]">
                          {tr.ddError}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Zur Erklärung 永远可点，不锁死 */}
                  <button
                    type="button"
                    onClick={() => setShowL2(true)}
                    className="font-mono text-xs text-[#4338CA] hover:underline cursor-pointer"
                  >
                    {tr.zurErklaerung} →
                  </button>
                </div>

                <div className="font-mono text-[11px] text-[#6B675C] pt-1">
                  {lang === "de"
                    ? currentVergleich.krFeedbackDE
                    : currentVergleich.krFeedbackZH}
                </div>
              </div>

              {/* L2 — 延迟展开 (check步后折叠区，用户主动展开) */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => setShowL2((prev) => !prev)}
                  className="flex items-center gap-2 font-mono text-xs text-[#1C1B17] hover:text-[#4338CA] transition-colors cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    className={`transition-transform duration-200 ${showL2 ? "rotate-90" : ""}`}
                  >
                    <path d="M6 3.5l5 4.5-5 4.5" />
                  </svg>
                  <span>{tr.loesungVergleichen}</span>
                  <span className="text-[10px] text-[#6B675C]">
                    ({showL2 ? "geöffnet / 已展开" : "klicken zum Aufklappen / 点击展开"})
                  </span>
                </button>

                {showL2 && (
                  <div className="space-y-3 pt-2 pl-4 border-l-2 border-[#E5E1D8] animate-fade-in">
                    {/* ① Rubric Pills (v3-aligned 4-dim, manually toggleable) */}
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
                            className={`px-2.5 py-1 text-xs font-mono rounded-sm border transition-all ${
                              isHit
                                ? "bg-[#1C1B17] text-white border-[#1C1B17]"
                                : "border-[#E5E1D8] text-[#6B675C] hover:border-[#6B675C]"
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

                    {/* ② Zitierpflicht chip */}
                    <div className="flex items-center gap-2 pt-1">
                      <span className="font-mono text-xs text-[#6B675C]">Belegnachweis:</span>
                      <button
                        type="button"
                        onClick={() => onJumpToLibrary?.(currentVergleich.thema)}
                        className="font-mono text-[10px] text-[#4338CA] bg-[#4338CA]/10 hover:bg-[#4338CA]/20 px-1.5 py-0.5 rounded-sm transition-colors cursor-pointer"
                        title={lang === "de" ? "In Bibliothek öffnen" : "在笔记库中查看"}
                      >
                        [{currentVergleich.sourceRef}]
                      </button>
                    </div>

                    {/* ③ 笔记原文对照 quote */}
                    <blockquote className="border-l-2 border-[#E5E1D8] bg-[#FAF9F6] p-3 font-serif text-xs leading-relaxed text-[#1C1B17]">
                      {currentVergleich.explanationQuote}
                    </blockquote>
                  </div>
                )}
              </div>

              {/* L3 — 过程 + 元认知 (过程维 pills + "下次先…" + 文本补丁预览) */}
              <div className="space-y-4 pt-4 border-t border-[#E5E1D8]">
                {/* 过程维展示 pill: v3 Vorgehen-dim (manually toggleable, same tokens) */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[11px] text-[#6B675C]">PROZESSDIMENSION / 过程维:</span>
                  <div className="flex gap-2">
                    {(() => {
                      const criterion = RUBRIC_CRITERIA.find((c) => c.id === "vorgehen")!;
                      const isHit = vergleichEval.vorgehenFalsch;
                      return (
                        <button
                          type="button"
                          onClick={() => toggleVergleichPill("vorgehen")}
                          title={criterion.descriptionDE}
                          className={`px-2 py-0.5 text-[10px] font-mono rounded-sm border transition-all ${
                            isHit
                              ? "bg-[#1C1B17] text-white border-[#1C1B17]"
                              : "border-[#E5E1D8] text-[#6B675C] hover:border-[#6B675C]"
                          }`}
                        >
                          {criterion.name}
                          <span className="ml-1 opacity-75">{criterion.labelZH}</span>
                        </button>
                      );
                    })()}
                    {vLmDegraded && (
                      <span className="px-2 py-0.5 text-[10px] font-mono text-[#B45309]">
                        Vorlagen-Modus
                      </span>
                    )}
                  </div>
                </div>

                {/* "下次先…" 单行输入框 (存 localStorage: eflernvault:vergleich:v1) */}
                <div className="space-y-1">
                  <label className="block text-xs font-mono text-[#6B675C]">
                    {tr.naechstesMal}
                  </label>
                  <input
                    type="text"
                    value={nextTimeText}
                    onChange={(e) => saveNextTime(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveNextTime((e.target as HTMLInputElement).value);
                      }
                    }}
                    placeholder={tr.naechstesMalPlaceholder}
                    className="w-full rounded-sm border border-[#E5E1D8] bg-white px-3 py-1.5 font-serif text-xs text-[#1C1B17] placeholder:font-sans placeholder:text-[#6B675C] focus:border-[#4338CA] focus:outline-none transition-colors"
                  />
                  <div className="text-[10px] font-mono text-[#6B675C]">
                    {lang === "de"
                      ? "Gespeichert in eflernvault:vergleich:v1 · Bleibt beim nächsten Durchlauf erhalten"
                      : "自动保存至 eflernvault:vergleich:v1 · 刷新与再次打开同主题时保留"}
                  </div>
                </div>

                {/* 文本补丁预览与复制按钮 */}
                <div className="border border-[#E5E1D8] bg-[#FAF9F6] p-3 rounded-sm space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6B675C]">
                    <span>FEHLERLOG-PATCH / 错题补丁</span>
                    <button
                      type="button"
                      onClick={copyVergleichPatch}
                      className={`px-2.5 py-0.5 rounded-sm border font-mono text-[11px] transition-all ${
                        copiedVergleichPatch
                          ? "border-[#4338CA] bg-[#4338CA] text-white"
                          : "border-[#1C1B17] bg-[#1C1B17] text-white hover:bg-[#4338CA]"
                      }`}
                    >
                      {copiedVergleichPatch ? tr.copied : tr.copyPatch}
                    </button>
                  </div>
                  <pre className="block bg-white border border-[#E5E1D8] p-2.5 font-mono text-[11px] text-[#1C1B17] rounded-sm overflow-x-auto select-all leading-relaxed">
{`--- Fehlerlog.md
+++ Fehlerlog.md
+ - [ ] [${currentVergleich.fach}] Vergleich: ${currentVergleich.thema}
+   - Datum: ${new Date().toISOString().slice(0, 10)}
+   - Ergebnis: ${isCorrect ? "Richtig" : "Falsch (gute Signale zur Schärfung)"}
+   - Gewählt: Option ${selectedOption || "-"}
+   - Begründung: ${warumText.trim() || "(keine Angabe)"}
+   - Nächstes Mal: ${nextTimeText.trim() || "Erst Operator markieren"}
+   - Belegstelle: ${currentVergleich.sourceRef}
`}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
