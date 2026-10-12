import React, { useState } from "react";
import type { DistilledConcept } from "../../engine/conceptDistiller";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";

export interface PhaseLectureViewProps {
  concept: DistilledConcept;
  questNode?: ParsedQuestNode | null;
  fach: string;
  lang?: "de" | "zh";
  onAdvance: () => void;
}

export const PhaseLectureView: React.FC<PhaseLectureViewProps> = ({
  concept,
  questNode,
  fach,
  lang = "de",
  onAdvance,
}) => {
  const [selectedDilemmaChoice, setSelectedDilemmaChoice] = useState<"A" | "B" | null>(null);
  const [activeTab, setActiveTab] = useState<"deduktion" | "termini" | "brillen">("deduktion");
  const [isNoteUnderstood, setIsNoteUnderstood] = useState(false);

  const dilemma = concept.intuitionDilemma;
  const storyHook = concept.storyHook;
  const analogy = concept.mentalModelAnalogy;
  const twoBrillen = concept.twoBrillen;

  // Build causal chain from concept data
  const causalChain = React.useMemo(() => {
    if (concept.topicTitle.toLowerCase().includes("markt") || concept.topicTitle.toLowerCase().includes("preis")) {
      return [
        {
          step: "1. Impuls",
          stepZH: "1. 初始扰动",
          textDE: "Kostenschock oder Präferenzverschiebung verändert relative Knappheiten.",
          textZH: "成本外生冲击或消费者偏好转移改变了商品的相对稀缺性程度。",
        },
        {
          step: "2. Signalfunktion",
          stepZH: "2. 价格信号",
          textDE: "Preisanstieg signalisiert Knappheit; Konsumenten schränken Nachfrage ein.",
          textZH: "市场价格迅速走高释放稀缺信号，边际消费者削减需求，实现配给调节。",
        },
        {
          step: "3. Allokation",
          stepZH: "3. 资源配置",
          textDE: "Gewinnchancen lenken zusätzliche Produktionsfaktoren in den Markt.",
          textZH: "超额利润预期引导资本与生产要素从过剩部门迅速跨行业转入本市场。",
        },
        {
          step: "4. Markträumung",
          stepZH: "4. 市场出清",
          textDE: "Angebot und Nachfrage schneiden sich im neuen stabilen Gleichgewicht P*.",
          textZH: "微观供求双向收敛于新的均衡价格 P*，无强制行政干预下重获出清。",
        },
      ];
    }

    if (concept.topicTitle.toLowerCase().includes("wahl") || concept.topicTitle.toLowerCase().includes("bundestag")) {
      return [
        {
          step: "1. Stimmabgabe",
          stepZH: "1. 投票意愿",
          textDE: "Wähler vergibt Erststimme im Wahlkreis und Zweitstimme für die Landesliste.",
          textZH: "选民在选区投出第一票决定直选议员，同时投出第二票选定政党州候选人名单。",
        },
        {
          step: "2. Proportionalität",
          stepZH: "2. 比例基准",
          textDE: "Zweitstimmenanteil bestimmt die exakte Gesamtsitzquote der Partei im Parlament.",
          textZH: "第二票全国得票率严格决定该政党在联邦议院应当享有的总席位法定比例。",
        },
        {
          step: "3. Mandatsverrechnung",
          stepZH: "3. 议席结算",
          textDE: "Gewonnene Direktmandate werden vorrangig auf das Gesamtkontingent angerechnet.",
          textZH: "选区直接胜出的一票议员优先入座，剩余应得席位由政党名单按序补齐。",
        },
        {
          step: "4. Machtverteilung",
          stepZH: "4. 权力结构",
          textDE: "Reine Direktmandate genügen nicht; Regierungsmehrheit erfordert Zweitstimmenquote.",
          textZH: "仅赢选区无法组阁，决定能否主导大选与总理人选的核心命脉始终是第二票。",
        },
      ];
    }

    // Default universal causal chain
    return [
      {
        step: "1. Prämisse",
        stepZH: "1. 理论公理",
        textDE: `Grundlegendes Systemmodell für ${concept.topicTitle} mit KLP-NRW Kernfokus.`,
        textZH: `立足北威州考纲，确立 ${concept.topicTitle} 的初始模型假定与核心考点边界。`,
      },
      {
        step: "2. Mechanismus",
        stepZH: "2. 传导机制",
        textDE: "Kausale Verknüpfung von Akteurshandeln, Restriktionen und Wechselwirkungen.",
        textZH: "微观行动者在约束条件下的理性互动，触发系统内部的动态链条传导。",
      },
      {
        step: "3. Konsequenz",
        stepZH: "3. 综合效应",
        textDE: "Verändertes Systemgleichgewicht messbar an ökonomischen und sozialen Indikatoren.",
        textZH: "在可观测的学术指标与考场标准中，形成稳定可归纳的确定性结论。",
      },
    ];
  }, [concept.topicTitle]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* 顶部阶段徽章与课题核心导语 */}
      <header className="border-b border-[var(--line)] pb-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)] font-bold">
              {lang === "de" ? "Phase 1: Vorlesung & Kausalitaet" : "阶段 1 · 新知微课与因果推演"}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] text-[var(--ink-muted)]">
              {fach} · Gymnasium EF/Q1
            </span>
          </div>
          <span className="font-mono text-xs text-[var(--ink-muted)]">
            Operator: {concept.klausurSatz15NP.operator}
          </span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
          {concept.topicTitle}
        </h2>
        <p className="text-sm font-serif text-[var(--ink-muted)] leading-relaxed">
          {questNode?.summary ||
            (lang === "de"
              ? "Systematische Erschliessung der Kausalkette, Modell-Praemissen und Fachtermini nach KLP NRW Standards."
              : "基于北威州考纲标准，系统拆解模型公理前提、因果逻辑传导链与专业学术术语。")}
        </p>
      </header>

      {/* 1. 情景化启发导入 / 认知交锋 (Intuition Dilemma / Story Hook) */}
      {(dilemma || storyHook) && (
        <section className="border border-[var(--line)] p-4 sm:p-5 bg-[var(--paper-subtle)] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--ink)]">
              {lang === "de" ? "[ 1. Kognitiver Einstieg & Problemstellung ]" : "[ 1. 认知启发导入与真实博弈 ]"}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-muted)]">
              {dilemma ? (lang === "de" ? "Interaktives Szenario" : "互动思辨") : (lang === "de" ? "Fallbeispiel" : "典型案例")}
            </span>
          </div>

          {/* 情境描述 */}
          <div className="space-y-2">
            <div className="font-serif text-sm leading-relaxed text-[var(--ink)]">
              {dilemma
                ? (lang === "de" ? dilemma.scenarioDE : dilemma.scenarioZH)
                : (storyHook ? (lang === "de" ? storyHook.scenarioDE : storyHook.scenarioZH) : "")}
            </div>

            {dilemma && (
              <div className="font-bold text-sm text-[var(--ink)] border-l-2 border-[var(--ink)] pl-3 py-0.5">
                {lang === "de" ? dilemma.questionDE : dilemma.questionZH}
              </div>
            )}
          </div>

          {/* 若有两难选择，渲染高对比度站队按钮 */}
          {dilemma && (
            <div className="space-y-3 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedDilemmaChoice("A")}
                  className={`p-3.5 border-2 text-left transition-colors cursor-pointer flex items-start gap-3 ${
                    selectedDilemmaChoice === "A"
                      ? "border-[var(--ink)] bg-[var(--paper)] font-medium shadow-none"
                      : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)]"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold px-1.5 py-0.5 border shrink-0 ${
                      selectedDilemmaChoice === "A"
                        ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                        : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"
                    }`}
                  >
                    [ A ]
                  </span>
                  <span className="text-xs sm:text-sm leading-snug text-[var(--ink)]">
                    {lang === "de" ? dilemma.choiceA.textDE : dilemma.choiceA.textZH}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDilemmaChoice("B")}
                  className={`p-3.5 border-2 text-left transition-colors cursor-pointer flex items-start gap-3 ${
                    selectedDilemmaChoice === "B"
                      ? "border-[var(--ink)] bg-[var(--paper)] font-medium shadow-none"
                      : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)]"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold px-1.5 py-0.5 border shrink-0 ${
                      selectedDilemmaChoice === "B"
                        ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                        : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"
                    }`}
                  >
                    [ B ]
                  </span>
                  <span className="text-xs sm:text-sm leading-snug text-[var(--ink)]">
                    {lang === "de" ? dilemma.choiceB.textDE : dilemma.choiceB.textZH}
                  </span>
                </button>
              </div>

              {/* 站队后的机制剖析 */}
              {selectedDilemmaChoice && (
                <div className="p-3 border border-[var(--ink)] bg-[var(--paper)] space-y-1.5">
                  <div className="flex items-center justify-between pb-1 border-b border-[var(--line)]">
                    <span className="font-mono text-[10px] font-bold uppercase text-[var(--ink)]">
                      {lang === "de" ? "Deduktions-Feedback:" : "机制推导剖析："}
                    </span>
                    <span className="font-mono text-[9px] text-[var(--ink-muted)]">
                      KLP NRW EF
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-[var(--ink)] leading-relaxed">
                    {selectedDilemmaChoice === "A"
                      ? (lang === "de" ? dilemma.choiceA.reactionDE : dilemma.choiceA.reactionZH)
                      : (lang === "de" ? dilemma.choiceB.reactionDE : dilemma.choiceB.reactionZH)}
                  </p>
                  <div className="text-[11px] font-mono text-[var(--ink-muted)] pt-1 border-t border-[var(--line)]">
                    <span className="font-bold text-[var(--ink)]">
                      {lang === "de" ? "Kernmechanismus: " : "核心机制: "}
                    </span>
                    {lang === "de" ? dilemma.mechanismTakeawayDE : dilemma.mechanismTakeawayZH}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* 2. 微观子选项卡：因果链条 / 核心考纲术语 / 双重视角 */}
      <section className="space-y-3">
        <div className="flex items-center gap-1 border-b border-[var(--line)] pb-1">
          <button
            type="button"
            onClick={() => setActiveTab("deduktion")}
            className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer border ${
              activeTab === "deduktion"
                ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold"
                : "bg-[var(--paper-subtle)] text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]"
            }`}
          >
            {lang === "de" ? "1. Kausalkette" : "① 因果推演链条"}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("termini")}
            className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer border ${
              activeTab === "termini"
                ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold"
                : "bg-[var(--paper-subtle)] text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]"
            }`}
          >
            {lang === "de" ? "2. Fachbegriffe" : "② 考纲核心术语"}
          </button>
          {twoBrillen && (
            <button
              type="button"
              onClick={() => setActiveTab("brillen")}
              className={`px-3 py-1 text-xs font-mono transition-colors cursor-pointer border ${
                activeTab === "brillen"
                  ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)] font-bold"
                  : "bg-[var(--paper-subtle)] text-[var(--ink-muted)] border-transparent hover:text-[var(--ink)]"
              }`}
            >
              {lang === "de" ? "3. Zwei Brillen" : "③ 辩证双重视角"}
            </button>
          )}
        </div>

        {/* Tab 1: 因果链条 (Kausalkette) */}
        {activeTab === "deduktion" && (
          <div className="border border-[var(--line)] p-4 sm:p-5 bg-[var(--paper)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                {lang === "de" ? "Kausaler Gang der Argumentation" : "逻辑推理完整链条 (Schritt für Schritt)"}
              </span>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                AFB II / AFB III
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
              {causalChain.map((node, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] font-bold uppercase px-1.5 py-0.2 border border-[var(--ink)] bg-[var(--paper)] inline-block">
                      {lang === "de" ? node.step : node.stepZH}
                    </span>
                    <p className="text-xs font-serif leading-relaxed text-[var(--ink)] pt-1">
                      {lang === "de" ? node.textDE : node.textZH}
                    </p>
                  </div>
                  {idx < causalChain.length - 1 && (
                    <div className="pt-2 text-right font-mono text-[10px] text-[var(--ink-muted)]">
                      {"->"}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 心智模型类比卡片 */}
            {analogy && (
              <div className="border-t border-[var(--line)] pt-3 mt-2 flex flex-col sm:flex-row sm:items-start gap-3">
                <span className="font-mono text-[10px] font-bold uppercase px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] shrink-0">
                  {lang === "de" ? "Alltagsanalogie:" : "生活化通俗比喻:"}
                </span>
                <div className="space-y-0.5 text-xs text-[var(--ink)]">
                  <div className="font-bold">{analogy.analogyTitle}</div>
                  <p className="text-[var(--ink-muted)] font-serif leading-relaxed">
                    {lang === "de" ? analogy.explanationDE : analogy.explanationZH}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: 核心考纲术语 (KLP-Fachbegriffe) */}
        {activeTab === "termini" && (
          <div className="border border-[var(--line)] p-4 sm:p-5 bg-[var(--paper)] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                {lang === "de" ? "Obligatorische KLP-Fachtermini" : "北威州考纲核心专业术语表"}
              </span>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                {concept.klpTermini.length} {lang === "de" ? "Begriffe" : "个关键考纲概念"}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {concept.klpTermini.map((term, tIdx) => (
                <div
                  key={tIdx}
                  className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs font-mono text-[var(--ink)]">
                      {term.termDE}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--ink-muted)]">
                      {term.termZH}
                    </span>
                  </div>
                  <p className="text-xs font-serif text-[var(--ink)] leading-relaxed">
                    {term.definitionDE}
                  </p>
                  <p className="text-[11px] font-serif text-[var(--ink-muted)] leading-relaxed pt-1 border-t border-[var(--line)]">
                    {term.definitionZH}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 辩证双重视角 (Zwei-Brillen-Modell) */}
        {activeTab === "brillen" && twoBrillen && (
          <div className="border border-[var(--line)] p-4 sm:p-5 bg-[var(--paper)] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                {lang === "de" ? "Zwei-Brillen-Modell (AFB III Dialektik)" : "辩证双轨审视模型 (AFB III 必备)"}
              </span>
              <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                Sachurteil vs. Werturteil
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 border border-[var(--ink)] bg-[var(--paper)]">
                  [ Brille A ] {lang === "de" ? twoBrillen.perspectiveA.titleDE : twoBrillen.perspectiveA.titleZH}
                </span>
                <p className="text-xs font-serif leading-relaxed text-[var(--ink)] pt-1">
                  {lang === "de" ? twoBrillen.perspectiveA.corePointDE : twoBrillen.perspectiveA.corePointZH}
                </p>
              </div>

              <div className="p-3 border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                <span className="font-mono text-[10px] font-bold px-1.5 py-0.2 border border-[var(--ink)] bg-[var(--paper)]">
                  [ Brille B ] {lang === "de" ? twoBrillen.perspectiveB.titleDE : twoBrillen.perspectiveB.titleZH}
                </span>
                <p className="text-xs font-serif leading-relaxed text-[var(--ink)] pt-1">
                  {lang === "de" ? twoBrillen.perspectiveB.corePointDE : twoBrillen.perspectiveB.corePointZH}
                </p>
              </div>
            </div>

            <div className="p-3 border border-[var(--ink)] bg-[var(--paper)] space-y-1">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink)]">
                {lang === "de" ? "Synthese & Urteilsbildung:" : "辩证综合与考场裁决要求："}
              </span>
              <p className="text-xs font-serif leading-relaxed text-[var(--ink)]">
                {lang === "de" ? twoBrillen.synthesisDE : twoBrillen.synthesisZH}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* 3. 学习确认与进入下一阶段 */}
      <footer className="border-t border-[var(--line)] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label className="flex items-center gap-2 cursor-pointer select-none text-xs font-mono text-[var(--ink)]">
          <input
            type="checkbox"
            checked={isNoteUnderstood}
            onChange={(e) => setIsNoteUnderstood(e.target.checked)}
            className="w-4 h-4 border border-[var(--line)] accent-[var(--ink)]"
          />
          <span>
            {lang === "de"
              ? "Kausalkette und Grundbegriffe erfasst (Bereit für Labor-Exploration)"
              : "已理解因果链条与核心术语（准备进入交互实验探究）"}
          </span>
        </label>

        <button
          type="button"
          onClick={onAdvance}
          className="px-4 py-2 border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] font-mono text-xs font-bold tracking-tight transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{lang === "de" ? "Weiter zur Phase 2: Labor-Exploration" : "进入阶段 2 · 仿真探究"}</span>
          <span aria-hidden="true">{"->"}</span>
        </button>
      </footer>
    </div>
  );
};
