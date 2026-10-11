import React, { useState, useMemo, useEffect } from "react";
import type { ParsedQuestNode } from "../engine/bookIngestParser";
import { distillConcept, type DistilledConcept } from "../engine/conceptDistiller";

export interface SocraticDrawerProps {
  questNode: ParsedQuestNode;
  distilledConcept?: DistilledConcept;
  lang?: "de" | "zh";
  isOpen: boolean;
  onClose: () => void;
  onRecordMistake?: (mistakeNote: string) => void;
}

export type SocraticMode = "stuck" | "challenge" | "test";

export const SocraticDrawer: React.FC<SocraticDrawerProps> = ({
  questNode,
  distilledConcept,
  lang = "de",
  isOpen,
  onClose,
  onRecordMistake,
}) => {
  const [activeMode, setActiveMode] = useState<SocraticMode>("stuck");

  // Mode 3: Teste mich state
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [hasEvaluated, setHasEvaluated] = useState<boolean>(false);
  const [copiedPatch, setCopiedPatch] = useState<boolean>(false);
  const [recordedNotice, setRecordedNotice] = useState<boolean>(false);

  // Close on ESC key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset interactive test state when questNode changes
  useEffect(() => {
    setUserAnswer("");
    setHasEvaluated(false);
    setCopiedPatch(false);
    setRecordedNotice(false);
  }, [questNode?.id]);

  // Resolve distilled concept (fallback to dynamic distillation if not provided)
  const concept = useMemo<DistilledConcept>(() => {
    if (distilledConcept) return distilledConcept;
    return distillConcept(questNode.title, "SoWi", questNode.summary);
  }, [distilledConcept, questNode]);

  // Mode 3: Evaluation logic against 15 NP Rubric
  const evaluation = useMemo(() => {
    const keywords = concept.klausurSatz15NP.scoringKeywords || [];
    const lowerAnswer = userAnswer.toLowerCase();

    const matchedKeywords = keywords.filter((kw) =>
      lowerAnswer.includes(kw.toLowerCase())
    );

    const hitRatio = keywords.length > 0 ? matchedKeywords.length / keywords.length : 0;
    const lengthScore = Math.min(1, userAnswer.trim().length / 120);

    // Compute estimated points (0-15 NP)
    let scoreNP = Math.round(hitRatio * 10 + lengthScore * 5);
    if (userAnswer.trim().length === 0) scoreNP = 0;
    scoreNP = Math.min(15, Math.max(0, scoreNP));

    // Rubric breakdown
    const afb1 = Math.min(5, Math.round(hitRatio * 5));
    const afb2 = Math.min(5, Math.round(lengthScore * 3 + hitRatio * 2));
    const afb3 = Math.min(5, Math.max(0, scoreNP - afb1 - afb2));

    return {
      scoreNP,
      matchedKeywords,
      missingKeywords: keywords.filter((kw) => !lowerAnswer.includes(kw.toLowerCase())),
      afb1,
      afb2,
      afb3,
    };
  }, [concept, userAnswer]);

  // Generate standardized Obsidian Fehlerlog patch
  const generateFehlerlogPatch = () => {
    const today = new Date().toISOString().slice(0, 10);
    const fach = concept.fach || "SoWi";
    const thema = questNode.title.replace(/[|]/g, "/");
    const trap = concept.fehlerquellen[0]?.trapTitleDE || "Begriffs- und Kausaldefizit";
    const userClean = (userAnswer.trim() || "Keine Eingabe").replace(/\n/g, " ").replace(/[|]/g, "/");
    const musterClean = concept.klausurSatz15NP.musterSatzDE.replace(/\n/g, " ").replace(/[|]/g, "/");

    return [
      `<!-- EF-Lernvault Fehlerlog & Diagnose-Patch -->`,
      `<!-- Fach: ${fach} | Datum: ${today} | Thema: ${thema} -->`,
      `| Datum | Fach | Thema | Fehlertyp | Eigener Ansatz | 15NP-Muster |`,
      `| :--- | :--- | :--- | :--- | :--- | :--- |`,
      `| ${today} | ${fach} | ${thema} | ${trap} | ${userClean} | ${musterClean} |`,
    ].join("\n");
  };

  const handleCopyPatch = () => {
    const patch = generateFehlerlogPatch();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(patch);
    }
    setCopiedPatch(true);
    setTimeout(() => setCopiedPatch(false), 2500);
  };

  const handleRecordMistake = () => {
    const patch = generateFehlerlogPatch();
    if (onRecordMistake) {
      onRecordMistake(patch);
    }
    setRecordedNotice(true);
    setTimeout(() => setRecordedNotice(false), 2500);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* 遮罩背景 (Backdrop) */}
      <div
        className="fixed inset-0 bg-black/25 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 伴学抽屉主面板 (Tufte Paper Drawer) */}
      <aside
        className="fixed inset-y-0 right-0 z-50 w-full sm:max-w-xl md:max-w-2xl bg-[var(--paper)] text-[var(--ink)] border-l border-[var(--line)] flex flex-col focus:outline-none"
        role="dialog"
        aria-modal="true"
        aria-label={lang === "de" ? "Sokratischer Lernbegleiter" : "苏格拉底自适应调频伴学"}
      >
        {/* 顶部标题栏 */}
        <header className="border-b border-[var(--line)] px-5 py-3.5 flex items-center justify-between bg-[var(--paper)]">
          <div className="flex items-center gap-2.5">
            <svg
              width="18"
              height="18"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3" />
              <circle cx="8" cy="8" r="3" />
            </svg>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold tracking-tight">
                  {lang === "de" ? "Sokratischer Begleiter" : "苏格拉底伴学导师"}
                </h2>
                <span className="font-mono text-[10px] px-1.5 py-0.2 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)]">
                  {concept.fach} · Adaptive Frequenz
                </span>
              </div>
              <p className="text-[11px] text-[var(--ink-muted)] font-mono truncate max-w-sm sm:max-w-md">
                {questNode.title}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={lang === "de" ? "Schublade schließen" : "关闭伴学抽屉"}
            className="p-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] transition-colors cursor-pointer text-[var(--ink)]"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </header>

        {/* 调频模式切换标签栏 (3 Adaptive Frequency Modes) */}
        <nav
          className="grid grid-cols-3 border-b border-[var(--line)] bg-[var(--paper-subtle)] p-1 gap-1 text-xs font-mono"
          aria-label={lang === "de" ? "Begleitungsmodus" : "伴学调频模式"}
        >
          <button
            type="button"
            onClick={() => setActiveMode("stuck")}
            className={`py-2 px-2 text-center transition-colors cursor-pointer border ${
              activeMode === "stuck"
                ? "bg-[var(--paper)] text-[var(--ink)] font-bold border-[var(--ink)]"
                : "text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]"
            }`}
          >
            <span className="block font-semibold">
              {lang === "de" ? "1. Hier hakt es" : "1. 这里没懂"}
            </span>
            <span className="block text-[10px] text-[var(--ink-muted)] mt-0.5 font-normal">
              {lang === "de" ? "Intuition & Fallen" : "直觉比喻与避坑"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("challenge")}
            className={`py-2 px-2 text-center transition-colors cursor-pointer border ${
              activeMode === "challenge"
                ? "bg-[var(--paper)] text-[var(--ink)] font-bold border-[var(--ink)]"
                : "text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]"
            }`}
          >
            <span className="block font-semibold">
              {lang === "de" ? "2. Zu einfach" : "2. 太简单了"}
            </span>
            <span className="block text-[10px] text-[var(--ink-muted)] mt-0.5 font-normal">
              {lang === "de" ? "Dialektik & AFB III" : "极限反例与质询"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveMode("test")}
            className={`py-2 px-2 text-center transition-colors cursor-pointer border ${
              activeMode === "test"
                ? "bg-[var(--paper)] text-[var(--ink)] font-bold border-[var(--ink)]"
                : "text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]"
            }`}
          >
            <span className="block font-semibold">
              {lang === "de" ? "3. Teste mich" : "3. 考考我"}
            </span>
            <span className="block text-[10px] text-[var(--ink-muted)] mt-0.5 font-normal">
              {lang === "de" ? "15-NP-Check" : "即时量规与错题"}
            </span>
          </button>
        </nav>

        {/* 抽屉滚动内容主体 */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* 模式 1: 这里没懂 (Hier hakt es) */}
          {activeMode === "stuck" && (
            <div className="space-y-5">
              {/* 直觉生活比喻 (Mental Model Analogy) */}
              <section className="border border-[var(--line)] bg-[var(--paper-subtle)] p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-[var(--ink-muted)] uppercase">
                    {lang === "de" ? "Alltagsanalogie / Mentales Modell" : "第一性原理 · 直觉比喻"}
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.2 border border-[var(--line)] bg-[var(--paper)]">
                    Intuition
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[var(--ink)]">
                  {concept.mentalModelAnalogy.analogyTitle}
                </h3>
                <p className="text-xs text-[var(--ink)] leading-relaxed">
                  {concept.mentalModelAnalogy.explanationDE}
                </p>
                <div className="pt-2 border-t border-[var(--line)] text-xs text-[var(--ink-muted)] leading-relaxed">
                  <span className="font-mono text-[10px] block text-[var(--ink-muted)] mb-0.5">
                    [ZH Verständnis]:
                  </span>
                  {concept.mentalModelAnalogy.explanationZH}
                </div>
              </section>

              {/* 核心考纲术语体系 (KLP Termini Clarity) */}
              <section className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    {lang === "de" ? "Schlüsselbegriffe & Definitionen" : "考纲标准术语体系"}
                  </h4>
                  <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                    {concept.klpTermini.length} Termini
                  </span>
                </div>

                <div className="space-y-2">
                  {concept.klpTermini.map((term, idx) => (
                    <div
                      key={idx}
                      className="border border-[var(--line)] p-3 bg-[var(--paper)] space-y-1.5"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <strong className="text-xs font-bold text-[var(--ink)]">
                          {term.termDE}
                        </strong>
                        <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                          {term.termZH}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--ink)] leading-relaxed">
                        {term.definitionDE}
                      </p>
                      <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed border-t border-[var(--line)] pt-1">
                        {term.definitionZH}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* 常见认知误区与高频失分陷阱 (Cognitive Traps) */}
              <section className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-[var(--ink)]">
                    {lang === "de" ? "Fehlerquellen & Klausurfallen" : "高频认知陷阱与避坑防线"}
                  </h4>
                  <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                    Fehlerlog-Prävention
                  </span>
                </div>

                <div className="space-y-2.5">
                  {concept.fehlerquellen.map((trap, idx) => (
                    <div
                      key={idx}
                      className="border border-[var(--line)] p-3.5 bg-[var(--paper-subtle)] space-y-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] px-1 py-0.2 bg-[var(--ink)] text-[var(--paper)] font-bold">
                          Falle {idx + 1}
                        </span>
                        <h5 className="text-xs font-bold text-[var(--ink)]">
                          {trap.trapTitleDE}
                        </h5>
                      </div>
                      <p className="text-xs text-[var(--ink)] leading-relaxed">
                        {trap.trapDescriptionDE}
                      </p>
                      <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
                        {trap.trapDescriptionZH}
                      </p>
                      <div className="pt-2 border-t border-[var(--line)] text-xs font-mono text-[var(--ink)]">
                        <strong className="block text-[10px] text-[var(--ink-muted)] uppercase mb-0.5">
                          {lang === "de" ? "Prävention in Klausuren (15 NP):" : "考场避坑准则:"}
                        </strong>
                        <span>-&gt; {trap.howToAvoidDE}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* 模式 2: 太简单了 (Zu einfach) */}
          {activeMode === "challenge" && (
            <div className="space-y-5">
              <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono leading-relaxed">
                <span className="font-bold block text-[var(--ink)] mb-1">
                  {lang === "de" ? "Sokratische Dialektik & Vertiefung" : "苏格拉底产婆术深入追问"}
                </span>
                <span>
                  {lang === "de"
                    ? "Du beherrschst die Grundlagen? Teste die Belastbarkeit deines Wissens an Randbedingungen, Antinomien und KLP-AFB-III-Spannungsfeldern."
                    : "已经彻底理解基础定义？尝试在严苛边界条件、价值冲突与考纲 AFB III 评判框架下检验知识的极限鲁棒性。"}
                </span>
              </div>

              {/* 深入质询问题与对立视角 (Socratic Probes) */}
              <section className="space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
                  <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                    {lang === "de" ? "Dialektische Prüffragen" : "辩证质询题与反例视角"}
                  </h4>
                  <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                    AFB III · Diskurs
                  </span>
                </div>

                <div className="space-y-3">
                  {concept.socraticProbes.map((probe, idx) => (
                    <div
                      key={idx}
                      className="border border-[var(--line)] p-4 bg-[var(--paper)] space-y-3"
                    >
                      <div className="space-y-1">
                        <span className="font-mono text-[10px] px-1 py-0.2 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)]">
                          Sokratische Frage {idx + 1}
                        </span>
                        <h5 className="text-xs font-bold text-[var(--ink)] leading-snug">
                          {probe.questionDE}
                        </h5>
                        <p className="text-[11px] text-[var(--ink-muted)] font-mono leading-relaxed">
                          {probe.questionZH}
                        </p>
                      </div>

                      <div className="border-t border-[var(--line)] pt-2.5 bg-[var(--paper-subtle)] p-2.5">
                        <span className="font-mono text-[10px] font-bold block text-[var(--ink)] uppercase mb-1">
                          {lang === "de" ? "Gegenperspektive / Antithese:" : "对立立场与反命题视角:"}
                        </span>
                        <p className="text-xs text-[var(--ink)] leading-relaxed">
                          {probe.counterPerspectiveDE}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 结构化评析标准 (AFB III Kriterienrahmen) */}
              <section className="border border-[var(--line)] p-4 bg-[var(--paper)] space-y-2">
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider">
                  {lang === "de" ? "Kriterienorientiertes Urteil (Sach- vs. Werturteil)" : "事实判断 vs. 价值判断标准架构"}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                    <strong className="font-mono text-[11px] block mb-1">
                      1. Sachurteil (事实判断)
                    </strong>
                    <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
                      Effizienz, Machbarkeit, Zielerreichung, Nebenwirkungen & Kausalität.
                    </p>
                  </div>
                  <div className="p-2.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                    <strong className="font-mono text-[11px] block mb-1">
                      2. Werturteil (价值判断)
                    </strong>
                    <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
                      Legitimität, Gerechtigkeit, Grundwerte des Grundgesetzes (GG), ethische Normen.
                    </p>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* 模式 3: 考考我 (Teste mich) */}
          {activeMode === "test" && (
            <div className="space-y-5">
              {/* 考查任务提示 */}
              <section className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold tracking-wider text-[var(--ink-muted)] uppercase">
                    {lang === "de" ? "Live-Check · Klausur-Transfer" : "15 NP 即时应试诊断"}
                  </span>
                  <span className="font-mono text-[10px] px-1.5 py-0.2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]">
                    Operator: {concept.klausurSatz15NP.operator}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[var(--ink)]">
                  {questNode.socraticPrompt || `Formulieren Sie eine präzise Kausalanalyse zu: »${questNode.title}«.`}
                </h4>
                <p className="text-xs text-[var(--ink-muted)] font-mono leading-relaxed">
                  {lang === "de"
                    ? "Formuliere deine Antwort mit präzisen Fachtermini und logischer Verknüpfung. Die Engine prüft live die Kriterienabdeckung."
                    : "请使用德语考纲专业术语与因果逻辑撰写分析短句。引擎将即时核对关键词覆盖率与 15 NP 量规。"}
                </p>
              </section>

              {/* 输入区域 */}
              <div className="space-y-2">
                <label
                  htmlFor="socratic-answer-input"
                  className="text-xs font-mono font-bold block text-[var(--ink)]"
                >
                  {lang === "de" ? "Deine Antwort (Klausur-Entwurf):" : "你的作答文本 (草稿):"}
                </label>
                <textarea
                  id="socratic-answer-input"
                  rows={4}
                  value={userAnswer}
                  onChange={(e) => {
                    setUserAnswer(e.target.value);
                    if (hasEvaluated) setHasEvaluated(false);
                  }}
                  placeholder={
                    lang === "de"
                      ? "Z.B.: Das Wahlsystem der Bundesrepublik Deutschland zeichnet sich durch..."
                      : "例如：Das Wahlsystem der Bundesrepublik Deutschland..."
                  }
                  className="w-full p-3 border border-[var(--line)] bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] font-mono resize-y leading-relaxed"
                />

                <div className="flex items-center justify-between pt-1">
                  <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                    {userAnswer.trim().length} {lang === "de" ? "Zeichen" : "字符"}
                  </span>
                  <button
                    type="button"
                    onClick={() => setHasEvaluated(true)}
                    disabled={userAnswer.trim().length === 0}
                    className="px-3 py-1.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-xs font-mono font-semibold hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {lang === "de" ? "Antwort prüfen (15 NP)" : "即时评估核对"}
                  </button>
                </div>
              </div>

              {/* 即时评估反馈结果 */}
              {hasEvaluated && (
                <section className="border border-[var(--line)] p-4 bg-[var(--paper)] space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-sm font-bold text-[var(--ink)]">
                        {lang === "de" ? "Klausur-Rating:" : "评估得分:"}
                      </span>
                      <span className="font-mono text-base font-bold px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)]">
                        {evaluation.scoreNP} / 15 NP
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[var(--ink-muted)]">
                      {evaluation.scoreNP >= 13
                        ? "Sehr gut (1)"
                        : evaluation.scoreNP >= 10
                        ? "Gut (2)"
                        : evaluation.scoreNP >= 7
                        ? "Befriedigend (3)"
                        : "Nachbessern"}
                    </span>
                  </div>

                  {/* AFB 1/2/3 分数细项 */}
                  <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                    <div className="p-2 border border-[var(--line)] bg-[var(--paper-subtle)]">
                      <span className="block text-[10px] text-[var(--ink-muted)]">AFB I (Termini)</span>
                      <strong className="text-xs">{evaluation.afb1} / 5 NP</strong>
                    </div>
                    <div className="p-2 border border-[var(--line)] bg-[var(--paper-subtle)]">
                      <span className="block text-[10px] text-[var(--ink-muted)]">AFB II (Kausalität)</span>
                      <strong className="text-xs">{evaluation.afb2} / 5 NP</strong>
                    </div>
                    <div className="p-2 border border-[var(--line)] bg-[var(--paper-subtle)]">
                      <span className="block text-[10px] text-[var(--ink-muted)]">AFB III (Urteil)</span>
                      <strong className="text-xs">{evaluation.afb3} / 5 NP</strong>
                    </div>
                  </div>

                  {/* 核心赋分词命中情况 */}
                  <div className="space-y-1.5">
                    <span className="font-mono text-[11px] text-[var(--ink-muted)] block">
                      {lang === "de" ? "Erkannte Schlüsselbegriffe:" : "关键词匹配诊断:"}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {concept.klausurSatz15NP.scoringKeywords.map((kw, i) => {
                        const isHit = evaluation.matchedKeywords.includes(kw);
                        return (
                          <span
                            key={i}
                            className={`font-mono text-[11px] px-2 py-0.5 border ${
                              isHit
                                ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold"
                                : "bg-[var(--paper-subtle)] text-[var(--ink-muted)] border-[var(--line)] line-through"
                            }`}
                          >
                            {isHit ? "+ " : "- "}
                            {kw}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* 15 NP 满分参考示范 */}
                  <div className="border-t border-[var(--line)] pt-3 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <strong className="text-xs font-mono font-bold text-[var(--ink)]">
                        {lang === "de" ? "15-NP-Musterlösung:" : "15 NP 满分高分模范短句:"}
                      </strong>
                      <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                        KLP NRW Referenz
                      </span>
                    </div>
                    <p className="text-xs text-[var(--ink)] leading-relaxed p-2.5 border border-[var(--line)] bg-[var(--paper-subtle)] font-mono">
                      {concept.klausurSatz15NP.musterSatzDE}
                    </p>
                    <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">
                      {concept.klausurSatz15NP.explanationZH}
                    </p>
                  </div>

                  {/* 错题沉淀与 Fehlerlog 导出行动条 */}
                  <div className="border-t border-[var(--line)] pt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyPatch}
                        className="px-2.5 py-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <svg
                          width="13"
                          height="13"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          aria-hidden="true"
                        >
                          <rect x="5.5" y="5.5" width="8" height="8" />
                          <path d="M10.5 5.5v-3h-8v8h3" />
                        </svg>
                        <span>
                          {copiedPatch
                            ? lang === "de"
                              ? "Patch kopiert!"
                              : "补丁已复制!"
                            : lang === "de"
                            ? "Fehlerlog-Patch kopieren"
                            : "复制错题补丁"}
                        </span>
                      </button>

                      {onRecordMistake && (
                        <button
                          type="button"
                          onClick={handleRecordMistake}
                          className="px-2.5 py-1.5 border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>
                            {recordedNotice
                              ? lang === "de"
                                ? "Erfasst!"
                                : "已录入!"
                              : lang === "de"
                              ? "In Fehlerlog erfassen"
                              : "存入错题防线"}
                          </span>
                        </button>
                      )}
                    </div>

                    <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                      00_META/Klausur-Training/Fehlerlog.md
                    </span>
                  </div>
                </section>
              )}
            </div>
          )}
        </div>

        {/* 抽屉底部状态栏 */}
        <footer className="border-t border-[var(--line)] px-5 py-2.5 bg-[var(--paper-subtle)] flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)]">
          <span>{lang === "de" ? "EF-Lernvault · Tufte Socratic" : "EF-Lernvault · 苏格拉底研习"}</span>
          <button
            type="button"
            onClick={onClose}
            className="hover:text-[var(--ink)] transition-colors cursor-pointer"
          >
            {lang === "de" ? "[Schließen]" : "[关闭]"}
          </button>
        </footer>
      </aside>
    </>
  );
};
