import { useEffect, useMemo, useRef, useState } from "react";
import {
  type Reise,
  type SchrittEntdecken,
  type SchrittAusprobieren,
  type SchrittCheck,
  type SchrittSzenario,
  type SchrittMuendlich,
  exemplarReise,
} from "../reise";
import { FAECHER } from "../fach";
import Blocks from "../components/Blocks";
import FeedbackBox from "../components/FeedbackBox";
import { isTyping } from "../keys";
import type { Lang } from "../i18n";

interface ProgressData {
  xp: number;
  streak: string[];
  badges: Record<string, number>;
  done: Record<string, number>;
}

const STORAGE_KEY = "eflernvault:xp:v1";

function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const p = JSON.parse(raw);
      return {
        xp: Number(p.xp) || 0,
        streak: Array.isArray(p.streak) ? p.streak : [],
        badges: typeof p.badges === "object" && p.badges ? p.badges : {},
        done: typeof p.done === "object" && p.done ? p.done : {},
      };
    }
  } catch {
    // fallback
  }
  return { xp: 0, streak: [], badges: {}, done: {} };
}

function saveProgress(p: ProgressData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch {
    // ignore
  }
}

function updateStreak(streak: string[]): string[] {
  const today = new Date().toISOString().slice(0, 10);
  if (streak.includes(today)) return streak;
  const next = [...streak, today];
  return next.sort();
}

export default function ReiseModule({
  lang,
  vaultReisen,
}: {
  lang: Lang;
  vaultReisen?: Reise[] | null;
}) {
  // Aggregate available courses: exemplar course + any courses from vault
  const allReisen = useMemo(() => {
    const map = new Map<string, Reise>();
    if (exemplarReise) map.set(exemplarReise.id, exemplarReise);
    if (vaultReisen) {
      vaultReisen.forEach((r) => map.set(r.id, r));
    }
    return Array.from(map.values());
  }, [vaultReisen]);

  // Mode: wizard vs player
  const initialCourse =
    typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("mode") === "wizard"
      ? null
      : exemplarReise;

  const [activeCourse, setActiveCourse] = useState<Reise | null>(initialCourse);
  const [stepIdx, setStepIdx] = useState(0);

  // Wizard filters
  const [wizardFach, setWizardFach] = useState<string>("SoWi");
  const [wizardZiel, setWizardZiel] = useState<string>("alle");

  // Gamification progress state
  const [progress, setProgress] = useState<ProgressData>(loadProgress);

  // Per-course step gating unlock state: set of unlocked step indices
  const [unlocked, setUnlocked] = useState<number[]>([0]);

  // Step 2 (Ausprobieren) state
  const [tryInput, setTryInput] = useState("");
  const [tryShowHelp, setTryShowHelp] = useState(false);
  const [tryFeedback, setTryFeedback] = useState<string | null>(null);

  // Step 3 (Check) state: checks per item
  const [checkPassed, setCheckPassed] = useState<Record<string, boolean>>({});
  const [checkRevealed, setCheckRevealed] = useState<Record<string, boolean>>({});
  const [copiedPatch, setCopiedPatch] = useState(false);

  // Step 4 (Szenario) state
  const [szenarioText, setSzenarioText] = useState("");
  const [szenarioSec, setSzenarioSec] = useState(0);
  const [szenarioRunning, setSzenarioRunning] = useState(false);
  const [rubricChecks, setRubricChecks] = useState<boolean[]>([]);

  // Step 5 (Mündlich) state
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const [oralSec, setOralSec] = useState(180);
  const [oralRunning, setOralRunning] = useState(false);
  const [oralChecks, setOralChecks] = useState<boolean[]>([]);

  // Reset step states when activeCourse changes
  useEffect(() => {
    if (activeCourse) {
      setStepIdx(0);
      setUnlocked([0]);
      setTryInput("");
      setTryShowHelp(false);
      setTryFeedback(null);
      setCheckPassed({});
      setCheckRevealed({});
      setSzenarioText("");
      setSzenarioSec(0);
      setSzenarioRunning(false);
      const step4 = activeCourse.schritte.find((s) => s.typ === "szenario") as
        | SchrittSzenario
        | undefined;
      setRubricChecks(step4 ? step4.rubricPoints.map(() => false) : []);
      const step5 = activeCourse.schritte.find((s) => s.typ === "muendlich") as
        | SchrittMuendlich
        | undefined;
      setOralChecks(step5 ? step5.selbstcheck.map(() => false) : []);
    }
  }, [activeCourse]);

  // Scenario timer tick
  useEffect(() => {
    if (!szenarioRunning) return;
    const id = setInterval(() => setSzenarioSec((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [szenarioRunning]);

  // Oral countdown tick
  useEffect(() => {
    if (!oralRunning) return;
    const id = setInterval(() => setOralSec((s) => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, [oralRunning]);

  // Award XP and sync streak
  const addXP = (amount: number, stepIndex: number) => {
    setProgress((prev) => {
      const newDone = {
        ...prev.done,
        [activeCourse?.id ?? "default"]: Math.max(
          prev.done[activeCourse?.id ?? "default"] ?? 0,
          stepIndex + 1
        ),
      };
      const newStreak = updateStreak(prev.streak);
      const fachId = activeCourse?.fach ?? "Allgemein";
      const newBadges = {
        ...prev.badges,
        [fachId]: Math.max(prev.badges[fachId] ?? 0, activeCourse?.level ?? 1),
      };
      const updated: ProgressData = {
        xp: prev.xp + amount,
        streak: newStreak,
        badges: newBadges,
        done: newDone,
      };
      saveProgress(updated);
      return updated;
    });
  };

  const unlockNextStep = (nextIdx: number, xpReward: number) => {
    if (!unlocked.includes(nextIdx)) {
      setUnlocked((prev) => [...prev, nextIdx]);
      addXP(xpReward, nextIdx - 1);
    }
  };

  // Relative navigation: works for any course layout (v3 courses have
  // 8 steps with repeated typs, so fixed indices 1/2/3 are wrong).
  // Advances to stepIdx+1, or finishes the course on the last step.
  const isLastStep =
    !!activeCourse && stepIdx + 1 >= activeCourse.schritte.length;
  const goNextOrFinish = (xpReward: number) => {
    if (!activeCourse) return;
    if (stepIdx + 1 < activeCourse.schritte.length) {
      unlockNextStep(stepIdx + 1, xpReward);
      setStepIdx(stepIdx + 1);
    } else {
      addXP(xpReward, stepIdx);
      alert(
        lang === "de"
          ? `Kurs abgeschlossen! +${xpReward} XP`
          : `恭喜完成本课程！+${xpReward} XP`
      );
      setActiveCourse(null);
    }
  };

  // Keyboard navigation: Enter to submit/advance, ArrowRight to next step (when unlocked)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping() && e.key !== "Enter") return;

      if (e.key === "ArrowRight") {
        if (activeCourse && stepIdx < activeCourse.schritte.length - 1) {
          if (unlocked.includes(stepIdx + 1)) {
            e.preventDefault();
            setStepIdx((i) => i + 1);
          }
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeCourse, stepIdx, unlocked]);

  // Audio recording handlers for oral step
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mr = new MediaRecorder(stream);
      mr.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
      setOralRunning(true);
    } catch {
      alert(
        lang === "de"
          ? "Mikrofon-Zugriff nicht verfügbar oder verweigert."
          : "无法访问麦克风或权限被拒绝。"
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setOralRunning(false);
    }
  };

  // Filtered courses for wizard
  const wizardCourses = useMemo(() => {
    return allReisen.filter(
      (r) =>
        r.fach.toLowerCase() === wizardFach.toLowerCase() &&
        (wizardZiel === "alle" || r.ziel.toLowerCase() === wizardZiel.toLowerCase())
    );
  }, [allReisen, wizardFach, wizardZiel]);

  const currentSchritt = activeCourse?.schritte[stepIdx];

  // Helper formatting for seconds to mm:ss
  const formatTime = (total: number) => {
    const mm = String(Math.floor(total / 60)).padStart(2, "0");
    const ss = String(total % 60).padStart(2, "0");
    return `${mm}:${ss}`;
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Header: Navigation between wizard & course, plus XP and streak */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#E5E1D8] pb-3 text-xs font-mono text-[#6B675C]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveCourse(null)}
            className={`transition-colors ${
              !activeCourse
                ? "font-semibold text-[#4338CA] border-b border-[#4338CA]"
                : "text-[#6B675C] hover:text-[#1C1B17]"
            }`}
          >
            ← {lang === "de" ? "Kurskatalog & Assistent" : "课程向导 / 目录"}
          </button>
          {activeCourse && (
            <>
              <span>/</span>
              <span className="font-serif text-[#1C1B17] font-medium">
                {activeCourse.fach} · {activeCourse.thema}
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-4">
          <span>
            XP: <strong className="text-[#1C1B17]">{progress.xp}</strong>
          </span>
          <span>·</span>
          <span>
            连击: <strong className="text-[#1C1B17]">{progress.streak.length}</strong>{" "}
            {lang === "de" ? "Tage" : "天"}
          </span>
        </div>
      </div>

      {/* VIEW 1: 3-QUESTION WIZARD (Katalog & Assistent) */}
      {!activeCourse ? (
        <div className="border border-[#E5E1D8] bg-white p-8 rounded-sm space-y-8">
          <div>
            <h2 className="font-serif text-2xl text-[#1C1B17] tracking-tight">
              Lernreise · {lang === "de" ? "Kurs-Assistent" : "互动学习向导"}
            </h2>
            <p className="font-sans text-xs text-[#6B675C] mt-1">
              {lang === "de"
                ? "Wähle Fach, Thema und Ziel — direkte, interaktive Begleitung durch das EF-Curriculum."
                : "选择学科、主题与学习目标——沉浸式探索 Gymnasium EF 知识点。"}
            </p>
          </div>

          {/* Question 1: Fach Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#6B675C]">
              1. Fach / 目标学科
            </label>
            <div className="flex flex-wrap gap-1.5">
              {FAECHER.map((f) => {
                const count = allReisen.filter(
                  (r) => r.fach.toLowerCase() === f.id.toLowerCase()
                ).length;
                const isSelected = wizardFach.toLowerCase() === f.id.toLowerCase();
                return (
                  <button
                    key={f.id}
                    onClick={() => setWizardFach(f.id)}
                    className={`px-2.5 py-1 text-xs font-mono rounded-sm border transition-all ${
                      isSelected
                        ? "border-[#4338CA] text-[#4338CA] bg-[#ECE7DC]/40 font-medium"
                        : "border-[#E5E1D8] text-[#6B675C] hover:text-[#1C1B17] hover:border-[#1C1B17]"
                    }`}
                  >
                    {f.kurz} · {lang === "de" ? f.nameDE : f.nameZH}{" "}
                    <span className="text-[10px] opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Question 2: Ziel Filter */}
          <div className="space-y-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#6B675C]">
              2. Lernziel / 学习目标
            </label>
            <div className="flex gap-2">
              {[
                { id: "alle", de: "Alle Ziele", zh: "全部目标" },
                { id: "klausur", de: "Klausur (笔试)", zh: "Klausur 笔试" },
                { id: "verstehen", de: "Verstehen (基础)", zh: "Verstehen 概念理解" },
                { id: "muendlich", de: "Mündlich (口试)", zh: "Mündlich 口语表达" },
              ].map((z) => (
                <button
                  key={z.id}
                  onClick={() => setWizardZiel(z.id)}
                  className={`px-3 py-1 text-xs font-sans rounded-sm border transition-all ${
                    wizardZiel === z.id
                      ? "border-[#4338CA] text-[#4338CA] font-medium"
                      : "border-[#E5E1D8] text-[#6B675C] hover:text-[#1C1B17]"
                  }`}
                >
                  {lang === "de" ? z.de : z.zh}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3: Thema / Course List */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-mono uppercase tracking-wider text-[#6B675C]">
              3. Thema / 可选课程清单 ({wizardCourses.length})
            </label>

            {wizardCourses.length === 0 ? (
              <div className="border border-dashed border-[#E5E1D8] bg-[#FAF9F6] p-6 text-center text-xs font-mono text-[#6B675C] rounded-sm leading-relaxed">
                {lang === "de"
                  ? "Für dieses Thema gibt es noch keine Lernreise. Lies zuerst die Notizen in der Bibliothek."
                  : "该学科/主题暂无互动旅程文件，去 Bibliothek 先读笔记。"}
              </div>
            ) : (
              <div className="divide-y divide-[#E5E1D8] border border-[#E5E1D8] rounded-sm bg-white">
                {wizardCourses.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-4 hover:bg-[#FAF9F6] transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-xs uppercase text-[#4338CA] border border-[#4338CA]/30 px-1.5 py-0.2 rounded-sm">
                          Level {c.level}
                        </span>
                        <span className="font-mono text-xs text-[#6B675C]">
                          Ziel: {c.ziel}
                        </span>
                        <span className="text-xs font-mono text-[#6B675C]">
                          · +{c.xp} XP
                        </span>
                      </div>
                      <div className="font-serif text-base text-[#1C1B17] font-medium">
                        {c.thema}
                      </div>
                      <div className="font-mono text-[11px] text-[#6B675C] mt-0.5">
                        {c.schritte.length} Schritte (
                        {c.schritte.map((s) => s.typ).join(" → ")})
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveCourse(c)}
                      className="px-4 py-1.5 font-mono text-xs uppercase tracking-wider border border-[#1C1B17] bg-[#1C1B17] text-white hover:bg-[#4338CA] hover:border-[#4338CA] rounded-sm transition-colors"
                    >
                      {lang === "de" ? "Starten →" : "开始学习 →"}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        /* VIEW 2: 5-STEP INTERACTIVE COURSE PLAYER */
        <div className="space-y-6">
          {/* Step Navigation Rail (Tufte hairline step line) */}
          <div className="border border-[#E5E1D8] bg-white p-4 rounded-sm flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {activeCourse.schritte.map((s, idx) => {
                const isCurrent = stepIdx === idx;
                const isUnlocked = unlocked.includes(idx);
                const isPast = idx < stepIdx;

                return (
                  <button
                    key={idx}
                    disabled={!isUnlocked}
                    onClick={() => setStepIdx(idx)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-sm transition-all border ${
                      isCurrent
                        ? "border-[#4338CA] text-[#4338CA] bg-[#ECE7DC]/40 font-semibold"
                        : isUnlocked
                        ? "border-[#E5E1D8] text-[#1C1B17] hover:border-[#1C1B17]"
                        : "border-[#E5E1D8]/50 text-[#6B675C]/40 cursor-not-allowed"
                    }`}
                  >
                    <span>0{s.stepNumber}</span>
                    <span className="font-sans uppercase text-[11px] tracking-wider">
                      {s.typ}
                    </span>
                    {isPast && <span className="text-[#2E7D32]">✓</span>}
                  </button>
                );
              })}
            </div>

            <div className="text-xs font-mono text-[#6B675C]">
              {lang === "de" ? "Schritt" : "步骤"} {stepIdx + 1} /{" "}
              {activeCourse.schritte.length}
            </div>
          </div>

          {/* Current Step Body */}
          <div className="border border-[#E5E1D8] bg-white p-8 rounded-sm space-y-6">
            <div className="border-b border-[#E5E1D8] pb-3 flex items-baseline justify-between">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#4338CA]">
                  Schritt {currentSchritt?.stepNumber} · {currentSchritt?.typ}
                </span>
                <h3 className="font-serif text-xl text-[#1C1B17] mt-0.5">
                  {currentSchritt?.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-[#6B675C]">
                Ziel: +
                {currentSchritt?.typ === "entdecken"
                  ? 5
                  : currentSchritt?.typ === "ausprobieren"
                  ? 15
                  : currentSchritt?.typ === "check"
                  ? 20
                  : 30}{" "}
                XP
              </span>
            </div>

            {/* STEP 1: ENTDECKEN (讲解) */}
            {currentSchritt?.typ === "entdecken" && (
              <div className="space-y-6">
                <div className="prose max-w-none">
                  <Blocks blocks={(currentSchritt as SchrittEntdecken).blocks} />
                </div>

                <div className="pt-4 border-t border-[#E5E1D8] flex justify-end">
                  <button
                    onClick={() => goNextOrFinish(5)}
                    className="px-5 py-2 font-mono text-xs uppercase tracking-wider bg-[#1C1B17] text-white hover:bg-[#4338CA] rounded-sm transition-colors"
                  >
                    {isLastStep
                      ? lang === "de"
                        ? "Abschließen (+5 XP) ✓"
                        : "完成课程 (+5 XP) ✓"
                      : lang === "de"
                      ? "Verstanden & Weiter (+5 XP) →"
                      : "已理解，下一步 (+5 XP) →"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: AUSPROBIEREN (动手) */}
            {currentSchritt?.typ === "ausprobieren" && (
              <div className="space-y-5">
                <div className="border border-[#E5E1D8] bg-[#FAF9F6] p-4 rounded-sm font-serif text-base text-[#1C1B17] leading-relaxed">
                  {(currentSchritt as SchrittAusprobieren).aufgabe}
                </div>

                {(currentSchritt as SchrittAusprobieren).hilfe && (
                  <div>
                    <button
                      type="button"
                      onClick={() => setTryShowHelp((h) => !h)}
                      className="text-xs font-mono text-[#4338CA] hover:underline"
                    >
                      {tryShowHelp
                        ? "[- Hilfe verbergen / 隐藏提示]"
                        : "[+ Hilfe anzeigen / 显示解题提示]"}
                    </button>
                    {tryShowHelp && (
                      <div className="mt-2 p-3 border border-dashed border-[#E5E1D8] bg-[#F7F5F0] text-xs font-sans text-[#6B675C] rounded-sm">
                        {(currentSchritt as SchrittAusprobieren).hilfe}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-[#6B675C]">
                    Deine Antwort / 你的作答：
                  </label>
                  <textarea
                    rows={3}
                    value={tryInput}
                    onChange={(e) => setTryInput(e.target.value)}
                    placeholder="Hier zuordnen oder Stichpunkte eingeben..."
                    className="w-full border border-[#E5E1D8] p-3 text-sm font-sans rounded-sm focus:border-[#4338CA] focus:outline-none"
                  />
                </div>

                {tryFeedback && (
                  <div className="border border-[#4338CA]/30 bg-[#FAF9F6] p-3 text-xs font-mono text-[#1C1B17] rounded-sm">
                    {tryFeedback}
                  </div>
                )}

                <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      if (!tryInput.trim()) {
                        setTryFeedback("Bitte zuerst einen Antwortversuch eingeben.");
                        return;
                      }
                      setTryFeedback(
                        "Versuch notiert — prüfe dich mit der Musterlösung / 已记录作答，对照解析自查。"
                      );
                      unlockNextStep(stepIdx + 1, 15);
                    }}
                    className="px-4 py-2 font-mono text-xs uppercase border border-[#E5E1D8] hover:border-[#1C1B17] rounded-sm transition-colors text-[#1C1B17]"
                  >
                    {lang === "de" ? "Antwort prüfen" : "检查答案"}
                  </button>

                  <button
                    disabled={!unlocked.includes(stepIdx + 1)}
                    onClick={() => goNextOrFinish(15)}
                    className={`px-5 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                      unlocked.includes(stepIdx + 1)
                        ? "bg-[#1C1B17] text-white hover:bg-[#4338CA]"
                        : "bg-[#E5E1D8] text-[#6B675C] cursor-not-allowed"
                    }`}
                  >
                    {isLastStep
                      ? lang === "de"
                        ? "Abschließen (+15 XP) ✓"
                        : "完成课程 (+15 XP) ✓"
                      : lang === "de"
                      ? "Weiter (+15 XP) →"
                      : "下一步 (+15 XP) →"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CHECK (过关题) */}
            {currentSchritt?.typ === "check" && (
              <div className="space-y-6">
                <div className="divide-y divide-[#E5E1D8] border border-[#E5E1D8] rounded-sm bg-white">
                  {(currentSchritt as SchrittCheck).items.map((item, idx) => {
                    const isPassed = checkPassed[item.id];
                    const isRevealed = checkRevealed[item.id];

                    return (
                      <div key={item.id} className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <span className="font-mono text-xs font-semibold text-[#1C1B17] mr-2">
                              Frage {idx + 1}:
                            </span>
                            <span className="font-serif text-sm text-[#1C1B17]">
                              {item.frage}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setCheckRevealed((prev) => ({
                                ...prev,
                                [item.id]: !prev[item.id],
                              }))
                            }
                            className="text-xs font-mono text-[#6B675C] hover:text-[#4338CA]"
                          >
                            {isRevealed ? "[Antwort]" : "[Lösung zeigen]"}
                          </button>
                        </div>

                        {isRevealed && (
                          <div className="border-l-2 border-[#4338CA] pl-3 text-xs font-mono text-[#6B675C] bg-[#FAF9F6] py-1.5">
                            Erwartete Punkte: {item.antwort}
                          </div>
                        )}

                        <div className="flex items-center justify-end gap-2 pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              setCheckPassed((prev) => ({
                                ...prev,
                                [item.id]: !prev[item.id],
                              }));
                            }}
                            className={`px-2.5 py-1 text-xs font-mono rounded-sm border ${
                              isPassed
                                ? "border-[#2E7D32] bg-[#2E7D32]/10 text-[#2E7D32] font-semibold"
                                : "border-[#E5E1D8] text-[#6B675C] hover:border-[#1C1B17]"
                            }`}
                          >
                            {isPassed ? "✓ Bestanden / 已掌握" : "Selbstcheck / 标为通过"}
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Fehlerlog Draft Specimen with Copy Button */}
                <div className="border border-dashed border-[#E5E1D8] bg-[#F7F5F0] p-4 rounded-sm">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6B675C] mb-2">
                    <span>FEHLERLOG-ENTWURF / 错题补丁</span>
                    <button
                      type="button"
                      onClick={() => {
                        const patch = `- [ ] [${activeCourse.fach}] ${activeCourse.thema}: Check-Fehler nacharbeiten`;
                        navigator.clipboard.writeText(patch);
                        setCopiedPatch(true);
                        setTimeout(() => setCopiedPatch(false), 2000);
                      }}
                      className="text-xs font-mono text-[#4338CA] hover:underline"
                    >
                      {copiedPatch ? "✓ Kopiert!" : "Kopieren / 复制补丁"}
                    </button>
                  </div>
                  <code className="block bg-white border border-[#E5E1D8] p-2.5 font-mono text-xs text-[#1C1B17] rounded-sm">
                    - [ ] [{activeCourse.fach}] {activeCourse.thema}: Check-Fehler nacharbeiten
                  </code>
                </div>

                {/* Gating Lock check */}
                {(() => {
                  const checkItems = (currentSchritt as SchrittCheck).items;
                  const allDone =
                    checkItems.length > 0 &&
                    checkItems.every((item) => checkPassed[item.id]);

                  return (
                    <div className="pt-4 border-t border-[#E5E1D8] flex items-center justify-between">
                      <span className="text-xs font-mono text-[#6B675C]">
                        {allDone
                          ? "✓ Alle 3 Fragen gemeistert / 3 题已全部掌握"
                          : "3 Fragen müssen als bestanden markiert sein."}
                      </span>
                      <button
                        disabled={!allDone}
                        onClick={() => goNextOrFinish(20)}
                        className={`px-5 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                          allDone
                            ? "bg-[#1C1B17] text-white hover:bg-[#4338CA]"
                            : "bg-[#E5E1D8] text-[#6B675C] cursor-not-allowed"
                        }`}
                      >
                        {isLastStep
                          ? lang === "de"
                            ? "Abschließen (+20 XP) ✓"
                            : "完成课程 (+20 XP) ✓"
                          : lang === "de"
                          ? "Weiter (+20 XP) →"
                          : "下一步 (+20 XP) →"}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* STEP 4: SZENARIO (场景实战) */}
            {currentSchritt?.typ === "szenario" && (
              <div className="space-y-5">
                <div className="border border-[#E5E1D8] bg-[#FAF9F6] p-4 rounded-sm space-y-2">
                  <div className="text-xs font-mono uppercase text-[#4338CA]">
                    Rolle: {(currentSchritt as SchrittSzenario).rolle}
                  </div>
                  <div className="font-serif text-base text-[#1C1B17] leading-relaxed">
                    {(currentSchritt as SchrittSzenario).situation}
                  </div>
                </div>

                {/* Timer row */}
                <div className="flex items-center justify-between border border-[#E5E1D8] p-3 rounded-sm bg-white">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-normal tabular-nums text-[#1C1B17]">
                      {formatTime(szenarioSec)}
                    </span>
                    <span className="font-mono text-xs text-[#6B675C]">
                      / 02:00 Zielzeit
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSzenarioRunning((r) => !r)}
                    className="px-3 py-1 font-mono text-xs uppercase border border-[#1C1B17] rounded-sm hover:bg-[#FAF9F6]"
                  >
                    {szenarioRunning ? "Stopp" : "Start"}
                  </button>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase text-[#6B675C]">
                    Plädoyer verfassen / 撰写辩论发言：
                  </label>
                  <textarea
                    rows={4}
                    value={szenarioText}
                    onChange={(e) => setSzenarioText(e.target.value)}
                    placeholder="Beginne mit einer klaren These..."
                    className="w-full border border-[#E5E1D8] p-3 text-sm font-serif rounded-sm focus:border-[#4338CA] focus:outline-none"
                  />
                </div>

                {/* Rubric Checklist */}
                <div className="border border-[#E5E1D8] rounded-sm bg-[#FAF9F6] p-4 space-y-2">
                  <div className="text-xs font-mono uppercase text-[#6B675C] tracking-wider mb-1">
                    Rubric / 自评检查点（勾选核对）：
                  </div>
                  {(currentSchritt as SchrittSzenario).rubricPoints.map((p, i) => (
                    <label key={i} className="flex items-start gap-2.5 text-xs font-mono text-[#1C1B17] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rubricChecks[i] ?? false}
                        onChange={() =>
                          setRubricChecks((prev) =>
                            prev.map((v, j) => (j === i ? !v : v))
                          )
                        }
                        className="mt-0.5 h-3.5 w-3.5 accent-[#4338CA]"
                      />
                      <span>{p}</span>
                    </label>
                  ))}
                </div>

                {(() => {
                  const passedRubrics = rubricChecks.filter(Boolean).length >= 2;
                  return (
                    <div className="pt-4 border-t border-[#E5E1D8] flex justify-end">
                      <button
                        disabled={!passedRubrics}
                        onClick={() => {
                          if (stepIdx + 1 < activeCourse.schritte.length) {
                            unlockNextStep(stepIdx + 1, 30);
                            setStepIdx(stepIdx + 1);
                          } else {
                            addXP(30, stepIdx);
                            alert(lang === "de" ? "Kurs abgeschlossen! +30 XP" : "恭喜完成本课程！+30 XP");
                            setActiveCourse(null);
                          }
                        }}
                        className={`px-5 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                          passedRubrics
                            ? "bg-[#1C1B17] text-white hover:bg-[#4338CA]"
                            : "bg-[#E5E1D8] text-[#6B675C] cursor-not-allowed"
                        }`}
                      >
                        {stepIdx + 1 < activeCourse.schritte.length
                          ? lang === "de"
                            ? "Weiter (+30 XP) →"
                            : "下一步 (+30 XP) →"
                          : lang === "de"
                          ? "Abschließen (+30 XP) ✓"
                          : "完成课程 (+30 XP) ✓"}
                      </button>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* STEP 5: MÜNDLICH (口试模拟 - 仅音频本地流) */}
            {currentSchritt?.typ === "muendlich" && (
              <div className="space-y-5">
                <div className="border border-[#E5E1D8] bg-[#FAF9F6] p-4 rounded-sm">
                  <span className="font-mono text-xs uppercase text-[#4338CA] block mb-1">
                    Ziehung / 抽选题干
                  </span>
                  <p className="font-serif text-base text-[#1C1B17]">
                    {(currentSchritt as SchrittMuendlich).ziehung}
                  </p>
                </div>

                <div className="flex items-center justify-between border border-[#E5E1D8] p-4 rounded-sm bg-white">
                  <div>
                    <span className="font-mono text-2xl font-normal tabular-nums text-[#1C1B17]">
                      {formatTime(oralSec)}
                    </span>
                    <span className="font-mono text-xs text-[#6B675C] ml-2">
                      Verbleibend / 倒计时
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {!recording ? (
                      <button
                        type="button"
                        onClick={startRecording}
                        className="px-4 py-1.5 font-mono text-xs uppercase border border-[#C62828] text-[#C62828] hover:bg-[#C62828]/10 rounded-sm"
                      >
                        ● Aufnahme starten
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={stopRecording}
                        className="px-4 py-1.5 font-mono text-xs uppercase bg-[#C62828] text-white rounded-sm animate-pulse"
                      >
                        ■ Aufnahme stoppen
                      </button>
                    )}
                  </div>
                </div>

                {audioUrl && (
                  <div className="border border-[#E5E1D8] p-3 bg-[#FAF9F6] rounded-sm flex items-center justify-between gap-4">
                    <audio controls src={audioUrl} className="h-8 max-w-sm" />
                    <a
                      href={audioUrl}
                      download={`muendlich-${activeCourse.thema}.webm`}
                      className="font-mono text-xs text-[#4338CA] hover:underline"
                    >
                      Audio herunterladen (Lokal)
                    </a>
                  </div>
                )}

                <div className="border border-[#E5E1D8] bg-[#FAF9F6] p-4 rounded-sm space-y-2">
                  <div className="text-xs font-mono uppercase text-[#6B675C] mb-1">
                    Selbstcheck / 自评准则：
                  </div>
                  {(currentSchritt as SchrittMuendlich).selbstcheck.map((sc, i) => (
                    <label key={i} className="flex items-start gap-2.5 text-xs font-mono text-[#1C1B17] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={oralChecks[i] ?? false}
                        onChange={() =>
                          setOralChecks((prev) =>
                            prev.map((v, j) => (j === i ? !v : v))
                          )
                        }
                        className="mt-0.5 h-3.5 w-3.5 accent-[#4338CA]"
                      />
                      <span>{sc}</span>
                    </label>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E5E1D8] flex justify-end">
                  <button
                    disabled={oralChecks.filter(Boolean).length === 0}
                    onClick={() => {
                      addXP(30, stepIdx);
                      alert(lang === "de" ? "Mündliche Prüfung abgeschlossen! +30 XP" : "口试模拟完成！+30 XP");
                      setActiveCourse(null);
                    }}
                    className={`px-5 py-2 font-mono text-xs uppercase tracking-wider rounded-sm transition-colors ${
                      oralChecks.filter(Boolean).length > 0
                        ? "bg-[#1C1B17] text-white hover:bg-[#4338CA]"
                        : "bg-[#E5E1D8] text-[#6B675C] cursor-not-allowed"
                    }`}
                  >
                    Abschließen (+30 XP) ✓
                  </button>
                </div>
              </div>
            )}

            {/* Dev-Feedback: in-place notes with exact step context */}
            {activeCourse && currentSchritt && (
              <FeedbackBox
                lang={lang}
                context={`${activeCourse.id}#Schritt${currentSchritt.stepNumber}`}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
