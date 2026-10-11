import React, { useState, useMemo, useEffect } from "react";
import type { ParsedQuestNode, InteractiveToolType } from "../engine/bookIngestParser";
import { distillConcept, type DistilledConcept } from "../engine/conceptDistiller";
import { SocraticDrawer } from "../components/SocraticDrawer";
import {
  VariableSliderBox,
  DilemmaBalanceScale,
  LogicBlockBuilder,
  ScenarioDecisionTree,
  resolveLogicArchetype,
  resolveDecisionScenarioId,
} from "../components/GenericMicroWorlds";

export interface PlayableStudioTabProps {
  questNode: ParsedQuestNode | null;
  currentFach?: string;
  lang?: "de" | "zh";
  onCompleteQuest?: (questId: string, earnedXp: number) => void;
  onNextQuest?: () => void;
  onBackToMap?: () => void;
}

type ViewMode = "steps" | "document";

// Fallback demo quest node if none is provided
const DEFAULT_DEMO_QUEST: ParsedQuestNode = {
  id: "demo_wahlsystem_01",
  chapterId: "chap_bundestag",
  order: 1,
  title: "Wahlsystem & Bundestagswahl (Erst- vs. Zweitstimme)",
  lessonType: "concept",
  estimatedMinutes: 12,
  prerequisites: [],
  matchedToolId: "scenario_tree",
  matchedToolName: "ScenarioDecisionTree & Wahlsystem-Sim",
  interactiveType: "scenario_tree",
  summary:
    "Das deutsche Wahlsystem als personalisierte Verhältniswahl: Erststimme für das Direktmandat im Wahlkreis, Zweitstimme als wahlentscheidende Richtungsstimme für die Machtverteilung im Bundestag.",
  socraticPrompt:
    "Warum kann eine Partei 299 Direktmandate gewinnen, aber dennoch die Kanzlerschaft verfehlen, wenn die Zweitstimmenquote zu gering ist?",
  keyConcepts: [
    {
      term: "Personalisierte Verhältniswahl",
      definitionDE:
        "Wahlsystem, bei dem die Gesamtzahl der Sitze proportional nach Zweitstimmen vergeben wird, ergänzt durch Direktmandate per Erststimme.",
      definitionZH:
        "个性化比例代表制：以政党二票的比例代表制为主导基础，结合选区一票直接当选机制。",
      analogy: "Zweistufige Theaterbuchung: Feste Sitzreihe vs. Parteikontingent.",
      examTrap: "Erststimme für wichtiger als Zweitstimme halten.",
    },
    {
      term: "Zweitstimme",
      definitionDE:
        "Die wahlentscheidende Stimme für die Landesliste einer Partei zur Bestimmung der parlamentarischen Mehrheitsverhältnisse.",
      definitionZH:
        "决定性核心选票：决定各党派在联邦议院中的总体议席比例与多数地位。",
      analogy: "Die Kanzler-Stimme im Gesamtparlament.",
      examTrap: "Verwechslung der Kausalwirkung von Erst- und Zweitstimme in AFB II.",
    },
  ],
  xp: 35,
};

export const PlayableStudioTab: React.FC<PlayableStudioTabProps> = ({
  questNode: externalQuestNode,
  currentFach = "SoWi",
  lang = "de",
  onCompleteQuest,
  onNextQuest,
  onBackToMap,
}) => {
  // If no quest passed, user can load demo quest
  const [internalDemoQuest, setInternalDemoQuest] = useState<ParsedQuestNode | null>(null);
  const activeQuest = externalQuestNode || internalDemoQuest;

  // View mode: 5-step guided flow vs continuous document
  const [viewMode, setViewMode] = useState<ViewMode>("steps");
  const [currentStep, setCurrentStep] = useState<number>(0); // 0 to 4
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Socratic Drawer State
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [mistakeToast, setMistakeToast] = useState<string | null>(null);

  // MicroWorld selection state (defaults to matched tool)
  const [selectedToolOverride, setSelectedToolOverride] = useState<InteractiveToolType | null>(null);

  // Reset completion state on quest change
  useEffect(() => {
    setIsCompleted(false);
    setCurrentStep(0);
    setSelectedToolOverride(null);
  }, [activeQuest?.id]);

  // Concept distillation
  const concept = useMemo<DistilledConcept | null>(() => {
    if (!activeQuest) return null;
    return distillConcept(activeQuest.title, currentFach, activeQuest.summary);
  }, [activeQuest, currentFach]);

  // Determine active interactive micro world
  const effectiveToolType = useMemo<InteractiveToolType>(() => {
    if (selectedToolOverride) return selectedToolOverride;
    if (activeQuest?.interactiveType) return activeQuest.interactiveType;
    return "scenario_tree";
  }, [selectedToolOverride, activeQuest]);

  const handleRecordMistake = (_patchText: string) => {
    setMistakeToast(lang === "de" ? "Fehlerlog-Patch gespeichert!" : "错题补丁已生成并存入！");
    setTimeout(() => setMistakeToast(null), 3000);
  };

  const handleFinishQuest = () => {
    if (!activeQuest) return;
    setIsCompleted(true);
    if (onCompleteQuest) {
      onCompleteQuest(activeQuest.id, activeQuest.xp);
    }
  };

  // 5 Structured Stages definitions
  const stages = [
    {
      num: 1,
      titleDE: "1. Entdecken & Phänomen",
      titleZH: "1. 现象发现与生活直觉",
      subtitleDE: "Alltagsintuition & Kognitives Rätsel",
      subtitleZH: "直觉比喻与核心认知问题",
    },
    {
      num: 2,
      titleDE: "2. Kernkonzept & Definition",
      titleZH: "2. 第一性原理与考纲术语",
      subtitleDE: "Fachtermini & Systemische Kausalität",
      subtitleZH: "北威州考纲定义与概念拆解",
    },
    {
      num: 3,
      titleDE: "3. Mikrowelt Experimentieren",
      titleZH: "3. 仿真微世界与因果推演",
      subtitleDE: "Interaktives Tufte-SVG-Laboratorium",
      subtitleZH: "参数驱动与动态沙盘交互",
    },
    {
      num: 4,
      titleDE: "4. Klausur-Anwendung 15 NP",
      titleZH: "4. 考点实战与 15 NP 作答量规",
      subtitleDE: "Muster-Kausalsatz & Fehlervermeidung",
      subtitleZH: "标准采分短句与考场避坑",
    },
    {
      num: 5,
      titleDE: "5. Meisterschaft & Reflexion",
      titleZH: "5. 掌握通关与认知闭环",
      subtitleDE: "XP-Abschluss & Wissensvernetzung",
      subtitleZH: "经验结算与下一关准备",
    },
  ];

  // Helper to render matched MicroWorld
  const renderMicroWorld = (toolType: InteractiveToolType) => {
    switch (toolType) {
      case "variable_slider":
      case "tangent-slider":
      case "magisches-viereck":
      case "gini-allocator":
      case "orderbuch-sim":
        return (
          <VariableSliderBox
            title={activeQuest ? `${activeQuest.title} · Kausalkurve` : undefined}
            lang={lang}
            xLabel={activeQuest?.keyConcepts[0]?.term || "Impulsgröße (X)"}
            yLabel="Systemreaktion (Y)"
          />
        );

      case "dilemma_balance":
      case "ethik-waage":
      case "dilemma-theatre":
      case "rawls-sim":
        return (
          <DilemmaBalanceScale
            title={activeQuest ? `${activeQuest.title} · Diskurs-Waage` : undefined}
            lang={lang}
          />
        );

      case "logic_blocks":
        return (
          <LogicBlockBuilder
            title={activeQuest ? `${activeQuest.title} · Argumentationsketten` : undefined}
            lang={lang}
            archetypeId={
              activeQuest
                ? resolveLogicArchetype(activeQuest.title, activeQuest.summary)
                : undefined
            }
          />
        );

      case "scenario_tree":
      case "wahlsystem-sim":
      default:
        return (
          <ScenarioDecisionTree
            title={activeQuest ? `${activeQuest.title} · Kaskadenentscheidungen` : undefined}
            lang={lang}
            scenarioId={
              activeQuest
                ? resolveDecisionScenarioId(activeQuest.title, activeQuest.summary)
                : undefined
            }
          />
        );
    }
  };

  // Fallback View if no quest is selected
  if (!activeQuest) {
    return (
      <div className="border border-[var(--line)] p-8 sm:p-12 text-center flex flex-col items-center gap-4 bg-[var(--paper-subtle)] text-[var(--ink)]">
        <svg
          width="32"
          height="32"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          className="text-[var(--ink-muted)]"
          aria-hidden="true"
        >
          <path d="M2.5 3.5h11v9h-11zM2.5 6.5h11M5.5 3.5v9" />
          <circle cx="8" cy="8" r="1.5" />
        </svg>

        <div className="space-y-1">
          <h3 className="text-base font-bold font-mono">
            {lang === "de" ? "Keine aktive Quest ausgewählt" : "暂无选中的研习关卡"}
          </h3>
          <p className="text-xs text-[var(--ink-muted)] max-w-md font-mono leading-relaxed">
            {lang === "de"
              ? "Wähle eine Quest aus der Quest-Landkarte oder zerlege ein Lehrwerk in der Zerlegungswerkstatt, um die 5-Stufen-Mikrowelt zu starten."
              : "请先在【关卡探索图谱】中选取目标关卡，或在【书籍拆解工坊】中导入新书，以启动五阶交互微课演播。"}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {onBackToMap && (
            <button
              type="button"
              onClick={onBackToMap}
              className="px-4 py-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-xs font-mono font-semibold hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              {lang === "de" ? "<- Zur Quest-Landkarte" : "<- 返回关卡探索图谱"}
            </button>
          )}

          <button
            type="button"
            onClick={() => setInternalDemoQuest(DEFAULT_DEMO_QUEST)}
            className="px-4 py-2 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer"
          >
            {lang === "de" ? "Demo-Quest starten (Wahlsystem SoWi)" : "载入演示微课 (联邦大选 SoWi)"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-[var(--ink)]">
      {/* 顶部横幅：关卡元信息与双模式切换 */}
      <header className="border-b border-[var(--line)] pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[var(--paper)]">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold">
              {currentFach}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
              {activeQuest.estimatedMinutes} min
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
              +{activeQuest.xp} XP
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)]">
              ID: {activeQuest.id}
            </span>
          </div>

          <h2 className="text-xl font-bold tracking-tight">
            {activeQuest.title}
          </h2>

          <p className="text-xs text-[var(--ink-muted)] mt-1 font-mono max-w-2xl leading-relaxed">
            {activeQuest.summary}
          </p>
        </div>

        {/* 右侧控制条：苏格拉底伴学开关 + 视图模式切换 */}
        <div className="flex items-center gap-2 self-start lg:self-auto flex-wrap">
          {/* 苏格拉底伴学抽屉触发按钮 */}
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="px-3 py-1.5 border border-[var(--ink)] bg-[var(--paper-subtle)] hover:bg-[var(--ink)] hover:text-[var(--paper)] text-xs font-mono font-bold transition-colors cursor-pointer flex items-center gap-2"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              aria-hidden="true"
            >
              <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3" />
              <circle cx="8" cy="8" r="3" />
            </svg>
            <span>{lang === "de" ? "Sokratischer Begleiter" : "苏格拉底伴学"}</span>
          </button>

          {/* 模式切换：单步闯关 vs 连续文档 */}
          <div className="flex items-center border border-[var(--line)] p-0.5 bg-[var(--paper-subtle)]">
            <button
              type="button"
              onClick={() => setViewMode("steps")}
              className={`px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                viewMode === "steps"
                  ? "bg-[var(--paper)] text-[var(--ink)] font-bold border border-[var(--line)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)] border border-transparent"
              }`}
            >
              {lang === "de" ? "5-Stufen-Pfad" : "五阶微步"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("document")}
              className={`px-2.5 py-1 text-xs font-mono transition-colors cursor-pointer ${
                viewMode === "document"
                  ? "bg-[var(--paper)] text-[var(--ink)] font-bold border border-[var(--line)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)] border border-transparent"
              }`}
            >
              {lang === "de" ? "Langtext-Dokument" : "长卷全景"}
            </button>
          </div>

          {onBackToMap && (
            <button
              type="button"
              onClick={onBackToMap}
              className="px-2.5 py-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer"
            >
              {lang === "de" ? "<- Landkarte" : "<- 地图"}
            </button>
          )}
        </div>
      </header>

      {/* 错题存储提示吐司 */}
      {mistakeToast && (
        <div className="border border-[var(--ink)] bg-[var(--paper-subtle)] p-2.5 text-xs font-mono text-[var(--ink)] flex items-center justify-between">
          <span>{mistakeToast}</span>
          <span className="text-[10px] text-[var(--ink-muted)]">[00_META/Klausur-Training/Fehlerlog.md]</span>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 视图模式 A: 5-Stufen 分步闯关模式 (Steps View) */}
      {/* ---------------------------------------------------- */}
      {viewMode === "steps" && (
        <div className="space-y-6">
          {/* 步骤导航条 (5-Stage Step Bar) */}
          <nav
            className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 border border-[var(--line)] p-1.5 bg-[var(--paper-subtle)]"
            aria-label={lang === "de" ? "Stufenfortschritt" : "学习阶梯进度"}
          >
            {stages.map((st, idx) => {
              const isActive = currentStep === idx;
              const isPast = currentStep > idx;
              return (
                <button
                  key={st.num}
                  type="button"
                  onClick={() => setCurrentStep(idx)}
                  className={`p-2 text-left transition-colors cursor-pointer border ${
                    isActive
                      ? "bg-[var(--paper)] border-[var(--ink)] text-[var(--ink)]"
                      : isPast
                      ? "bg-[var(--paper)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)]"
                      : "border-transparent text-[var(--ink-muted)] hover:text-[var(--ink)]"
                  }`}
                >
                  <div className="flex items-center justify-between font-mono text-[10px] mb-0.5">
                    <span className="font-bold">
                      {isPast ? "[V] " : ""}
                      {lang === "de" ? `Stufe ${st.num}` : `第 ${st.num} 阶`}
                    </span>
                  </div>
                  <strong className="block text-xs truncate">
                    {lang === "de" ? st.titleDE.replace(/^\d+\.\s*/, "") : st.titleZH.replace(/^\d+\.\s*/, "")}
                  </strong>
                </button>
              );
            })}
          </nav>

          {/* 阶梯内容容器 */}
          <div className="border border-[var(--line)] p-5 sm:p-7 bg-[var(--paper)] min-h-[420px] flex flex-col justify-between space-y-6">
            {/* Stage 1: Entdecken & Phänomen */}
            {currentStep === 0 && (
              <div className="space-y-5">
                <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      Stufe 1 · Alltagsphänomen & Kognitive Dissonanz
                    </span>
                    <h3 className="text-base font-bold text-[var(--ink)]">
                      {lang === "de" ? "Entdecken & Phänomen" : "发现真实生活现象与认知谜题"}
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                    Intuition First
                  </span>
                </div>

                {/* 核心设问卡片 */}
                <div className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] space-y-2">
                  <span className="font-mono text-[11px] font-bold text-[var(--ink)] block uppercase">
                    {lang === "de" ? "Sokratische Leitfrage:" : "苏格拉底核心启发设问:"}
                  </span>
                  <p className="text-sm font-semibold text-[var(--ink)] leading-relaxed">
                    {activeQuest.socraticPrompt}
                  </p>
                </div>

                {/* 通俗日常比喻卡片 */}
                {concept && (
                  <div className="border border-[var(--line)] p-4 bg-[var(--paper)] space-y-2">
                    <span className="font-mono text-[11px] font-bold text-[var(--ink-muted)] block uppercase">
                      {lang === "de" ? "Mentales Modell / Alltagsanalogie:" : "第一性原理直觉比喻:"}
                    </span>
                    <h4 className="text-sm font-bold text-[var(--ink)]">
                      {concept.mentalModelAnalogy.analogyTitle}
                    </h4>
                    <p className="text-xs text-[var(--ink)] leading-relaxed">
                      {concept.mentalModelAnalogy.explanationDE}
                    </p>
                    <p className="text-xs text-[var(--ink-muted)] leading-relaxed border-t border-[var(--line)] pt-2">
                      {concept.mentalModelAnalogy.explanationZH}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Stage 2: Kernkonzept & Definition */}
            {currentStep === 1 && (
              <div className="space-y-5">
                <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      Stufe 2 · Erste Prinzipien & KLP NRW
                    </span>
                    <h3 className="text-base font-bold text-[var(--ink)]">
                      {lang === "de" ? "Kernkonzept & Definition" : "核心概念与考纲术语体系"}
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                    KLP Standards
                  </span>
                </div>

                {/* 关卡内置关键词卡片 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {activeQuest.keyConcepts.map((kc, idx) => (
                    <div
                      key={idx}
                      className="border border-[var(--line)] p-3.5 bg-[var(--paper-subtle)] space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-[var(--ink)] font-mono">
                          {kc.term}
                        </strong>
                        <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                          Terminus {idx + 1}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--ink)] leading-relaxed">
                        {kc.definitionDE}
                      </p>
                      <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed border-t border-[var(--line)] pt-1">
                        {kc.definitionZH}
                      </p>
                      <div className="text-[10px] font-mono text-[var(--ink-muted)] pt-1">
                        -&gt; {kc.analogy}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 衍生 KLP 考纲系统术语 */}
                {concept && (
                  <div className="space-y-2">
                    <span className="font-mono text-[11px] font-bold block text-[var(--ink-muted)] uppercase">
                      {lang === "de" ? "Erweiterter Begriffsapparat:" : "扩展考纲核心词库:"}
                    </span>
                    <div className="space-y-2">
                      {concept.klpTermini.map((tm, idx) => (
                        <div
                          key={idx}
                          className="border border-[var(--line)] p-3 bg-[var(--paper)] text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <strong className="font-bold text-[var(--ink)]">{tm.termDE}</strong>
                            <span className="font-mono text-[11px] text-[var(--ink-muted)]">{tm.termZH}</span>
                          </div>
                          <p className="text-[var(--ink)] leading-relaxed">{tm.definitionDE}</p>
                          <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed">{tm.definitionZH}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stage 3: Mikrowelt Experimentieren */}
            {currentStep === 2 && (
              <div className="space-y-5">
                <div className="border-b border-[var(--line)] pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      Stufe 3 · Dynamische Interaktionswerkzeuge
                    </span>
                    <h3 className="text-base font-bold text-[var(--ink)]">
                      {lang === "de" ? "Mikrowelt Experimentieren" : "动态教具仿真与深度探索"}
                    </h3>
                  </div>

                  {/* 工具切换微调器 */}
                  <div className="flex items-center gap-1 font-mono text-[11px]">
                    <span className="text-[var(--ink-muted)] hidden sm:inline">
                      {lang === "de" ? "Labor-Modell:" : "教具模型:"}
                    </span>
                    <select
                      value={effectiveToolType}
                      onChange={(e) => setSelectedToolOverride(e.target.value as InteractiveToolType)}
                      aria-label={lang === "de" ? "Interaktives Werkzeug wechseln" : "切换教具模型"}
                      className="px-2 py-1 border border-[var(--line)] bg-[var(--paper)] text-xs text-[var(--ink)] focus:outline-none cursor-pointer"
                    >
                      <option value="scenario_tree">Szenario-Entscheidungsbaum (Kaskade)</option>
                      <option value="variable_slider">Kausal-Schieberegler (Kennlinie)</option>
                      <option value="dilemma_balance">Diskurs-Waage (Dilemma)</option>
                      <option value="logic_blocks">Logik-Baukasten (Syllogismus)</option>
                    </select>
                  </div>
                </div>

                {/* 动态嵌入的 4 款通用微世界之一 */}
                <div className="border border-[var(--line)] p-4 bg-[var(--paper)]">
                  {renderMicroWorld(effectiveToolType)}
                </div>
              </div>
            )}

            {/* Stage 4: Klausur-Anwendung 15 NP */}
            {currentStep === 3 && (
              <div className="space-y-5">
                <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      Stufe 4 · Abiturrelevante Klausurpraxis
                    </span>
                    <h3 className="text-base font-bold text-[var(--ink)]">
                      {lang === "de" ? "Klausur-Anwendung 15 NP" : "实战应试与 15 NP 高分模版"}
                    </h3>
                  </div>
                  {concept && (
                    <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold">
                      Operator: {concept.klausurSatz15NP.operator}
                    </span>
                  )}
                </div>

                {concept && (
                  <div className="space-y-4">
                    {/* 15 NP 满分示范标杆卡片 */}
                    <div className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[11px] font-bold text-[var(--ink)] uppercase">
                          {lang === "de" ? "15-NP-Mustersatz (Referenzformulierung):" : "15 NP 满分标杆短句:"}
                        </span>
                        <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                          AFB II / III
                        </span>
                      </div>
                      <p className="text-xs font-mono text-[var(--ink)] leading-relaxed p-3 border border-[var(--line)] bg-[var(--paper)]">
                        {concept.klausurSatz15NP.musterSatzDE}
                      </p>
                      <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
                        {concept.klausurSatz15NP.explanationZH}
                      </p>
                    </div>

                    {/* 核心必采要点与关键词 */}
                    <div className="border border-[var(--line)] p-4 bg-[var(--paper)] space-y-2">
                      <span className="font-mono text-[11px] font-bold text-[var(--ink-muted)] block uppercase">
                        {lang === "de" ? "Erwartungshorizont · Schlüsselwörter:" : "考纲赋分点与必背采分关键词:"}
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {concept.klausurSatz15NP.scoringKeywords.map((kw, i) => (
                          <span
                            key={i}
                            className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                          >
                            # {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 高频失分陷阱提示 */}
                    <div className="space-y-2">
                      <span className="font-mono text-[11px] font-bold block text-[var(--ink-muted)] uppercase">
                        {lang === "de" ? "Fehlerquellen-Radar:" : "典型失分陷阱防御:"}
                      </span>
                      {concept.fehlerquellen.map((fq, i) => (
                        <div
                          key={i}
                          className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)] text-xs space-y-1"
                        >
                          <strong className="font-bold text-[var(--ink)]">{fq.trapTitleDE}</strong>
                          <p className="text-[var(--ink-muted)]">{fq.trapDescriptionDE}</p>
                          <div className="pt-1 font-mono text-[11px] text-[var(--ink)]">
                            -&gt; {fq.howToAvoidDE}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Stage 5: Meisterschaft & Reflexion */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
                      Stufe 5 · Kognitiver Abschluss & Reflexion
                    </span>
                    <h3 className="text-base font-bold text-[var(--ink)]">
                      {lang === "de" ? "Meisterschaft & Reflexion" : "掌握通关与认知闭环"}
                    </h3>
                  </div>
                  <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold">
                    +{activeQuest.xp} XP
                  </span>
                </div>

                <div className="border border-[var(--line)] p-6 bg-[var(--paper-subtle)] space-y-4 text-center">
                  <div className="w-12 h-12 border border-[var(--ink)] mx-auto flex items-center justify-center bg-[var(--paper)]">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.75"
                      aria-hidden="true"
                    >
                      <path d="M3 8.5l3.5 3.5 6.5-7" />
                    </svg>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-[var(--ink)]">
                      {lang === "de"
                        ? isCompleted
                          ? "Quest erfolgreich gemeistert!"
                          : "Bereit für den Wissensabschluss?"
                        : isCompleted
                        ? "恭喜！关卡已完成通关！"
                        : "准备好完成本关知识通关了吗？"}
                    </h4>
                    <p className="text-xs text-[var(--ink-muted)] font-mono max-w-md mx-auto leading-relaxed">
                      {lang === "de"
                        ? `Du hast alle 5 Stufen von »${activeQuest.title}« durchdrungen. Schließe die Quest ab, um ${activeQuest.xp} XP zu erhalten und das Thema im Obsidian-Vault zu festigen.`
                        : `你已完整走完《${activeQuest.title}》的五阶研习。点击完成可结算 ${activeQuest.xp} XP 并将进度同步至知识库图谱。`}
                    </p>
                  </div>

                  {/* 完成与导航按钮组 */}
                  <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                    {!isCompleted ? (
                      <button
                        type="button"
                        onClick={handleFinishQuest}
                        className="px-5 py-2.5 bg-[var(--ink)] text-[var(--paper)] text-xs font-mono font-bold border border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors cursor-pointer flex items-center gap-2"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden="true"
                        >
                          <path d="M3 8.5l3.5 3.5 6.5-7" />
                        </svg>
                        <span>
                          {lang === "de"
                            ? `Quest abschließen & +${activeQuest.xp} XP sichern`
                            : `完成关卡并结算 +${activeQuest.xp} XP`}
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs px-3 py-1.5 border border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] font-bold">
                          {lang === "de" ? "[V] Status: Gemeistert" : "[V] 状态：已通关掌握"}
                        </span>
                        {onNextQuest && (
                          <button
                            type="button"
                            onClick={onNextQuest}
                            className="px-4 py-2 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] text-xs font-mono font-semibold hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                          >
                            {lang === "de" ? "Nächste Quest ->" : "前往下一关卡 ->"}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 步骤底部导航控制栏 */}
            <div className="pt-4 border-t border-[var(--line)] flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
                className="px-3 py-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-xs font-mono transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {lang === "de" ? "<- Vorherige Stufe" : "<- 上一步"}
              </button>

              <span className="font-mono text-xs text-[var(--ink-muted)]">
                {currentStep + 1} / {stages.length}
              </span>

              <button
                type="button"
                onClick={() => setCurrentStep((prev) => Math.min(stages.length - 1, prev + 1))}
                disabled={currentStep === stages.length - 1}
                className="px-3 py-1.5 border border-[var(--ink)] bg-[var(--paper)] hover:border-[var(--ink)] text-xs font-mono font-semibold transition-colors cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {lang === "de" ? "Nächste Stufe ->" : "下一步 ->"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* 视图模式 B: 连续长卷文档模式 (Continuous Document) */}
      {/* ---------------------------------------------------- */}
      {viewMode === "document" && (
        <div className="space-y-8 border border-[var(--line)] p-6 sm:p-10 bg-[var(--paper)]">
          {/* 1. 现象与生活直觉 */}
          <section className="space-y-4">
            <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--ink)] font-mono">
                1. Entdecken & Phänomen
              </h3>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">Stage 1</span>
            </div>
            <div className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] space-y-2">
              <span className="font-mono text-xs font-bold block text-[var(--ink)] uppercase">
                {lang === "de" ? "Sokratische Leitfrage:" : "启发设问:"}
              </span>
              <p className="text-sm font-semibold">{activeQuest.socraticPrompt}</p>
            </div>
            {concept && (
              <div className="space-y-2 text-xs">
                <strong className="block font-bold">{concept.mentalModelAnalogy.analogyTitle}</strong>
                <p className="leading-relaxed">{concept.mentalModelAnalogy.explanationDE}</p>
                <p className="leading-relaxed text-[var(--ink-muted)]">{concept.mentalModelAnalogy.explanationZH}</p>
              </div>
            )}
          </section>

          {/* 2. 核心考纲术语体系 */}
          <section className="space-y-4">
            <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--ink)] font-mono">
                2. Kernkonzept & Definition
              </h3>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">Stage 2</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {activeQuest.keyConcepts.map((kc, idx) => (
                <div key={idx} className="border border-[var(--line)] p-3.5 bg-[var(--paper-subtle)] space-y-1.5">
                  <strong className="font-bold font-mono">{kc.term}</strong>
                  <p className="leading-relaxed">{kc.definitionDE}</p>
                  <p className="leading-relaxed text-[var(--ink-muted)]">{kc.definitionZH}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3. 动态教具实验 */}
          <section className="space-y-4">
            <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--ink)] font-mono">
                3. Mikrowelt Experimentieren
              </h3>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">Stage 3</span>
            </div>
            <div className="border border-[var(--line)] p-4 bg-[var(--paper)]">
              {renderMicroWorld(effectiveToolType)}
            </div>
          </section>

          {/* 4. 15 NP 考场规范短句 */}
          <section className="space-y-4">
            <div className="border-b border-[var(--line)] pb-2 flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--ink)] font-mono">
                4. Klausur-Anwendung 15 NP
              </h3>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">Stage 4</span>
            </div>
            {concept && (
              <div className="space-y-3">
                <div className="p-3.5 border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1.5">
                  <span className="font-mono text-[11px] font-bold text-[var(--ink)] block uppercase">
                    Muster-Kausalsatz (Operator: {concept.klausurSatz15NP.operator}):
                  </span>
                  <p className="font-mono text-xs leading-relaxed text-[var(--ink)]">
                    {concept.klausurSatz15NP.musterSatzDE}
                  </p>
                  <p className="text-xs text-[var(--ink-muted)]">
                    {concept.klausurSatz15NP.explanationZH}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {concept.klausurSatz15NP.scoringKeywords.map((kw, i) => (
                    <span key={i} className="font-mono text-[11px] px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)]">
                      #{kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* 5. 结项与通关 */}
          <section className="border-t border-[var(--line)] pt-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[var(--ink)] font-mono">
                5. Meisterschaft & Reflexion
              </h3>
              <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]">
                +{activeQuest.xp} XP
              </span>
            </div>
            <div className="p-4 border border-[var(--line)] bg-[var(--paper-subtle)] flex items-center justify-between flex-wrap gap-3">
              <div>
                <strong className="block text-xs font-bold font-mono">
                  {lang === "de" ? "Dokument-Lernfortschritt sichern" : "保存全卷研习成果"}
                </strong>
                <span className="text-xs text-[var(--ink-muted)] font-mono">
                  {isCompleted
                    ? lang === "de" ? "Diese Quest ist bereits abgeschlossen." : "该关卡已顺利结项。"
                    : lang === "de" ? "Klicke zum Abschließen der Quest." : "点击以完成关卡结算。"}
                </span>
              </div>
              {!isCompleted ? (
                <button
                  type="button"
                  onClick={handleFinishQuest}
                  className="px-4 py-2 bg-[var(--ink)] text-[var(--paper)] text-xs font-mono font-bold border border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors cursor-pointer"
                >
                  {lang === "de" ? `Abschließen (+${activeQuest.xp} XP)` : `完成结项 (+${activeQuest.xp} XP)`}
                </button>
              ) : (
                <span className="font-mono text-xs px-2.5 py-1 border border-[var(--ink)] bg-[var(--paper)] font-bold">
                  [V] Gemeistert
                </span>
              )}
            </div>
          </section>
        </div>
      )}

      {/* 嵌入式苏格拉底伴学抽屉 */}
      <SocraticDrawer
        questNode={activeQuest}
        distilledConcept={concept || undefined}
        lang={lang}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onRecordMistake={handleRecordMistake}
      />
    </div>
  );
};
