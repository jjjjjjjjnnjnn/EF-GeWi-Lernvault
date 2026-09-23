import React, { useState, useEffect } from "react";
import type { VaultNote } from "../vault/parser";
import type { KlausurExam, KlausurGradingResult } from "../types/klausur";
import { extractKlausurFromNote, evaluateKlausurLocally } from "../engine/klausurExtractor";
import { MasteryEngine } from "../engine/mastery";
import { MasteryRadar } from "../components/MasteryRadar";

interface KlausurSimProps {
  notes: VaultNote[];
  currentFach: string;
}

export const KlausurSim: React.FC<KlausurSimProps> = ({ notes, currentFach }) => {
  const [selectedNotePath, setSelectedNotePath] = useState<string>("");
  const [exam, setExam] = useState<KlausurExam | null>(null);
  const [activeStep, setActiveStep] = useState<0 | 1 | 2>(0);
  const [answers, setAnswers] = useState<[string, string, string]>(["", "", ""]);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(45 * 60);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [gradingResult, setGradingResult] = useState<KlausurGradingResult | null>(null);
  const [copiedPatch, setCopiedPatch] = useState<boolean>(false);
  const [masterySaved, setMasterySaved] = useState<boolean>(false);
  const [showRadar, setShowRadar] = useState<boolean>(false);

  // 筛选属于当前学科的有效笔记
  const fachNotes = notes.filter(
    (n) => n.fach.toLowerCase() === currentFach.toLowerCase() && n.blocks.length > 0
  );

  // 默认加载首篇笔记
  useEffect(() => {
    if (fachNotes.length > 0 && !selectedNotePath) {
      setSelectedNotePath(fachNotes[0].path);
    }
  }, [fachNotes, selectedNotePath]);

  // 当选择笔记改变时，算法动态提取考卷
  useEffect(() => {
    if (!selectedNotePath) {
      setExam(null);
      return;
    }
    const note = notes.find((n) => n.path === selectedNotePath);
    if (!note) return;

    // 重构原文纯文本供抽取
    const content = note.blocks.map((b) => b.text).join("\n");
    const extracted = extractKlausurFromNote({
      path: note.path,
      fach: note.fach,
      thema: note.thema,
      content,
      operatoren: note.operatoren,
      klausurrelevant: note.klausurrelevant,
    });
    setExam(extracted);
    setAnswers(["", "", ""]);
    setActiveStep(0);
    setGradingResult(null);
    setMasterySaved(false);
    setCopiedPatch(false);
    setSecondsRemaining(extracted.recommendedMinutes * 60);
    setIsTimerRunning(false);
  }, [selectedNotePath, notes]);

  // 考场倒计时
  useEffect(() => {
    if (!isTimerRunning) return;
    const timer = setInterval(() => {
      setSecondsRemaining((sec) => {
        if (sec <= 1) {
          clearInterval(timer);
          setIsTimerRunning(false);
          return 0;
        }
        return sec - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleAnswerChange = (text: string) => {
    const updated = [...answers] as [string, string, string];
    updated[activeStep] = text;
    setAnswers(updated);
  };

  const handleSubmitExam = () => {
    if (!exam) return;
    setIsTimerRunning(false);
    const result = evaluateKlausurLocally(exam, answers);
    setGradingResult(result);
  };

  const handleRecordToMastery = () => {
    if (!exam || !gradingResult) return;
    const engine = new MasteryEngine();
    // 达到 4+ (50%+) 及以上即视为该考点通过本次考核
    const isPassing = gradingResult.percentage >= 50;
    engine.recordAttempt(
      exam.sourceNotePath,
      exam.thema,
      exam.fach,
      isPassing,
      [exam.fach]
    );
    setMasterySaved(true);
  };

  const handleCopyFehlerlogPatch = () => {
    if (!gradingResult) return;
    const patch = gradingResult.fehlerlogPatch.join("\n");
    navigator.clipboard.writeText(patch);
    setCopiedPatch(true);
    setTimeout(() => setCopiedPatch(false), 2500);
  };

  if (fachNotes.length === 0) {
    return (
      <div className="p-6 text-center text-stone-500 font-mono text-sm">
        Keine Klausur-Notizen für das Fach {currentFach} vorhanden. Bitte wählen Sie ein anderes Fach.
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto p-2 font-sans text-stone-800 dark:text-stone-200">
      {/* 顶部控制栏与考卷选择 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 dark:border-stone-800 pb-3">
        <div className="flex items-center gap-3">
          <label className="font-serif font-semibold text-sm">Fallstudie / Thema:</label>
          <select
            value={selectedNotePath}
            onChange={(e) => setSelectedNotePath(e.target.value)}
            className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 px-2 py-1 rounded text-xs"
          >
            {fachNotes.map((n) => (
              <option key={n.path} value={n.path}>
                {n.thema} ({n.path.split("/").pop()})
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3">
          {/* 倒计时器 */}
          <div className="flex items-center gap-1.5 font-mono text-xs border border-stone-300 dark:border-stone-700 px-2 py-1 rounded bg-stone-100 dark:bg-stone-800">
            <span className="text-stone-500">Zeit:</span>
            <span className={secondsRemaining < 300 ? "text-red-600 font-bold" : "text-stone-800 dark:text-stone-100"}>
              {formatTimer(secondsRemaining)}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="ml-1 text-[10px] text-stone-600 dark:text-stone-400 hover:text-stone-900"
            >
              {isTimerRunning ? "Pause" : "Start"}
            </button>
          </div>

          <button
            onClick={() => setShowRadar(!showRadar)}
            className="px-2 py-1 border border-stone-300 dark:border-stone-700 rounded text-xs hover:bg-stone-100 dark:hover:bg-stone-800"
          >
            {showRadar ? "Radar verbergen" : "Kompetenz-Radar"}
          </button>
        </div>
      </div>

      {/* 可折叠考纲掌握度雷达 */}
      {showRadar && (
        <div className="mb-4">
          <MasteryRadar fach={currentFach} />
        </div>
      )}

      {exam && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 左栏：Textgrundlage / Material */}
          <div className="border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50 p-4 rounded text-xs space-y-3">
            <div className="border-b border-stone-200 dark:border-stone-800 pb-2">
              <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider block">
                {exam.material.authorOrSource}
              </span>
              <h2 className="font-serif font-semibold text-sm text-stone-900 dark:text-stone-100">
                {exam.material.title}
              </h2>
            </div>

            <div className="prose dark:prose-invert max-w-none text-stone-700 dark:text-stone-300 leading-relaxed font-serif text-[13px] whitespace-pre-wrap max-h-96 overflow-y-auto pr-1">
              {exam.material.text}
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-stone-800 text-[11px] text-stone-500">
              <span className="font-semibold">Schlüsselbegriffe: </span>
              {exam.material.keywords.join(", ")}
            </div>
          </div>

          {/* 右栏：三段式答题区 (AFB I - II - III) 或 评分报告 */}
          <div className="border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 p-4 rounded text-xs space-y-4 flex flex-col justify-between">
            {!gradingResult ? (
              <>
                {/* AFB 切换 Tabs */}
                <div className="flex border-b border-stone-200 dark:border-stone-800 pb-2 gap-2">
                  {exam.aufgaben.map((aufg, i) => (
                    <button
                      key={aufg.afb}
                      onClick={() => setActiveStep(i as 0 | 1 | 2)}
                      className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                        activeStep === i
                          ? "bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900 font-semibold"
                          : "text-stone-600 hover:bg-stone-100 dark:text-stone-400 dark:hover:bg-stone-800"
                      }`}
                    >
                      {aufg.afb} ({aufg.maxPoints}P)
                    </button>
                  ))}
                </div>

                {/* 当前 Aufgabe 题目与引导 */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[11px] text-stone-500 uppercase">
                      Operator: <strong className="text-stone-800 dark:text-stone-200">{exam.aufgaben[activeStep].operator}</strong>
                    </span>
                    <span className="text-[11px] text-stone-400">
                      Max. {exam.aufgaben[activeStep].maxPoints} Punkte
                    </span>
                  </div>

                  <p className="font-serif text-sm font-medium text-stone-900 dark:text-stone-100">
                    {exam.aufgaben[activeStep].promptDE}
                  </p>
                  <p className="text-[11px] text-stone-500">
                    💡 {exam.aufgaben[activeStep].promptZH}
                  </p>
                </div>

                {/* 作答输入区 */}
                <div className="space-y-1 flex-1 flex flex-col">
                  <textarea
                    value={answers[activeStep]}
                    onChange={(e) => handleAnswerChange(e.target.value)}
                    placeholder="Formulieren Sie Ihre Antwort hier in präziser deutscher Fachsprache..."
                    className="w-full flex-1 min-h-[160px] p-2.5 border border-stone-300 dark:border-stone-700 rounded bg-stone-50 dark:bg-stone-800/40 text-xs font-serif leading-relaxed focus:outline-none focus:ring-1 focus:ring-stone-500"
                  />
                  <div className="flex justify-between items-center text-[10px] text-stone-400 font-mono">
                    <span>
                      Wortanzahl: {answers[activeStep].split(/\s+/).filter(Boolean).length} Wörter
                    </span>
                    <span>
                      Erwartete Punkte: {exam.aufgaben[activeStep].expectedPoints.length} Aspekte
                    </span>
                  </div>
                </div>

                {/* 底部导航与提交按钮 */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex gap-1">
                    {activeStep > 0 && (
                      <button
                        onClick={() => setActiveStep((activeStep - 1) as 0 | 1 | 2)}
                        className="px-2.5 py-1 border border-stone-300 dark:border-stone-700 rounded text-xs"
                      >
                        ← Zurück
                      </button>
                    )}
                    {activeStep < 2 && (
                      <button
                        onClick={() => setActiveStep((activeStep + 1) as 0 | 1 | 2)}
                        className="px-2.5 py-1 border border-stone-300 dark:border-stone-700 rounded text-xs"
                      >
                        Weiter →
                      </button>
                    )}
                  </div>

                  <button
                    onClick={handleSubmitExam}
                    className="px-4 py-1.5 bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 rounded font-semibold text-xs hover:opacity-90 transition-opacity"
                  >
                    Klausur abgeben & nach EPA bewerten
                  </button>
                </div>
              </>
            ) : (
              /* 评分报告视图 */
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-stone-200 dark:border-stone-800 pb-2">
                  <div>
                    <span className="text-[10px] font-mono text-stone-400 uppercase">EPA Klausurergebnis</span>
                    <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-stone-100">
                      {gradingResult.notenpunkte} Notenpunkte ({gradingResult.deutscheNote})
                    </h3>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-sm font-semibold">{gradingResult.percentage}%</span>
                    <span className="text-xs text-stone-400 block">
                      {gradingResult.totalPoints} / {gradingResult.maxTotalPoints} P.
                    </span>
                  </div>
                </div>

                {/* 各 AFB 成绩列表 */}
                <div className="space-y-2">
                  {gradingResult.afbScores.map((score, i) => (
                    <div key={score.afb} className="border border-stone-200 dark:border-stone-800 p-2 rounded text-xs space-y-1">
                      <div className="flex justify-between font-mono">
                        <span className="font-semibold">{score.afb}</span>
                        <span>{score.points} / {score.maxPoints} P.</span>
                      </div>
                      <p className="text-[11px] text-stone-600 dark:text-stone-400">{score.feedbackDE}</p>
                      {score.missingKeyPoints.length > 0 && (
                        <div className="text-[10px] text-amber-700 dark:text-amber-400">
                          <span className="font-semibold">Fehlende Aspekte: </span>
                          {score.missingKeyPoints.join("; ")}
                        </div>
                      )}
                      <div className="text-[10px] text-stone-500 font-serif pt-1 border-t border-stone-100 dark:border-stone-800">
                        <span className="font-semibold font-mono">Muster: </span>
                        {exam.aufgaben[i].sampleSolution}
                      </div>
                    </div>
                  ))}

                  <div className="border border-stone-200 dark:border-stone-800 p-2 rounded text-xs">
                    <div className="flex justify-between font-mono">
                      <span className="font-semibold">Darstellungsleistung</span>
                      <span>{gradingResult.darstellungScore.points} / 20 P.</span>
                    </div>
                    <p className="text-[11px] text-stone-600 dark:text-stone-400">
                      {gradingResult.darstellungScore.feedbackDE}
                    </p>
                  </div>
                </div>

                {/* 联动操作按钮 */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex gap-2">
                    <button
                      onClick={handleCopyFehlerlogPatch}
                      className="px-2.5 py-1 border border-stone-300 dark:border-stone-700 rounded text-xs hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      {copiedPatch ? "✓ Patch kopiert" : "Fehlerlog-Patch kopieren"}
                    </button>
                    <button
                      onClick={handleRecordToMastery}
                      disabled={masterySaved}
                      className={`px-2.5 py-1 rounded text-xs font-semibold ${
                        masterySaved
                          ? "bg-emerald-700 text-white"
                          : "bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-900"
                      }`}
                    >
                      {masterySaved ? "✓ In Radar gespeichert" : "In Kompetenz-Radar eintragen"}
                    </button>
                  </div>

                  <button
                    onClick={() => setGradingResult(null)}
                    className="px-2.5 py-1 text-xs text-stone-500 hover:text-stone-800 underline"
                  >
                    Klausur erneut bearbeiten
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
