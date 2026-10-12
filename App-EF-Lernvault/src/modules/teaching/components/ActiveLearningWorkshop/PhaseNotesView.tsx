import React, { useState, useMemo } from "react";
import type { DistilledConcept } from "../../engine/conceptDistiller";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";
import { allVaultNotesWithBlocks } from "../../../../generatedVaultNotes";

export interface PhaseNotesViewProps {
  concept: DistilledConcept;
  questNode?: ParsedQuestNode | null;
  fach: string;
  lang?: "de" | "zh";
  onSaveBookmark?: () => void;
  onAdvance: () => void;
}

export const PhaseNotesView: React.FC<PhaseNotesViewProps> = ({
  concept,
  questNode,
  fach,
  lang = "de",
  onSaveBookmark,
  onAdvance,
}) => {
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [absorbedItems, setAbsorbedItems] = useState<Record<string, boolean>>({
    cn: true,
    muster: false,
    traps: false,
    op: false,
  });

  // 匹配底层 Library Vault 笔记
  const matchingVaultNote = useMemo(() => {
    const topicKeywords = (questNode?.title || concept.topicTitle || "")
      .toLowerCase()
      .split(/[\s,()/-]+/)
      .filter((w) => w.length > 3);

    return allVaultNotesWithBlocks.find((n) => {
      const nFachMatch = n.fach.toLowerCase() === fach.toLowerCase();
      if (!nFachMatch) return false;
      const nText = (n.thema + " " + n.path).toLowerCase();
      return topicKeywords.some((kw) => nText.includes(kw));
    });
  }, [questNode, concept, fach]);

  // 复制完整 Markdown 结构化笔记
  const handleCopyNote = () => {
    const text = `# ${concept.topicTitle} (${fach})

## 1. CN 中文理解与解题底层认知
${concept.feynmanExplanation?.summaryZH || concept.mentalModelAnalogy.explanationZH}

## 2. DE 15 NP 会考标答核心金句 (Operator: ${concept.klausurSatz15NP.operator})
»${concept.klausurSatz15NP.musterSatzDE}«
得分关键词: ${concept.klausurSatz15NP.scoringKeywords.join(", ")}

## 3. [!]️ 考场致命陷阱与排雷指南
${concept.fehlerquellen
  .map(
    (f, idx) =>
      `### [${idx + 1}] ${f.trapTitleDE}\n- 陷阱说明: ${f.trapDescriptionZH}\n- 应对策略: ${f.howToAvoidDE}`
  )
  .join("\n\n")}

## 4. 辩证考场评价依据 (AFB III)
${concept.twoBrillen ? `${concept.twoBrillen.synthesisDE}\n${concept.twoBrillen.synthesisZH}` : "Sachurteil vs. Werturteil"}
`;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleToggleBookmark = () => {
    setBookmarked(!bookmarked);
    if (onSaveBookmark) onSaveBookmark();
  };

  const toggleAbsorbed = (key: string) => {
    setAbsorbedItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto">
      {/* 顶部阶段信息与工具按钮 */}
      <header className="border-b border-[var(--line)] pb-4 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)] font-bold">
              {lang === "de" ? "Phase 3: KLP-Wissensnotiz" : "阶段 3 · 笔记精练与解题提炼"}
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] text-[var(--ink-muted)]">
              {fach} · Wissenssicherung
            </span>
            <span className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] font-bold">
              15 NP Standard
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleBookmark}
              className="px-2.5 py-1 text-xs font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            >
              {bookmarked
                ? (lang === "de" ? "* Gespeichert" : "* 已收藏")
                : (lang === "de" ? " Lesezeichen" : " 收藏笔记")}
            </button>
            <button
              type="button"
              onClick={handleCopyNote}
              className="px-2.5 py-1 text-xs font-mono border border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)] transition-colors cursor-pointer font-bold"
            >
              {copied
                ? (lang === "de" ? "[OK] Kopiert" : "[OK] 已复制")
                : (lang === "de" ? "Notiz kopieren" : "一键复制笔记")}
            </button>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--ink)]">
          {concept.topicTitle} · {lang === "de" ? "Repetitorium & Klausur-Kern" : "高分笔记专栏"}
        </h2>
      </header>

      {/* 1. CN 中文理解与解题底层认知 (CN-Methode) */}
      <section className="border border-[var(--line)] p-4 sm:p-5 bg-[var(--paper)] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            [ 1. CN CN-Methode: 第一性原理降维解题法 ]
          </span>
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">
            Intuitiver Zugang
          </span>
        </div>

        <div className="space-y-2 text-xs sm:text-sm font-serif leading-relaxed text-[var(--ink)]">
          <p className="font-medium">
            {concept.feynmanExplanation?.summaryZH ||
              concept.mentalModelAnalogy.explanationZH}
          </p>
          {concept.attachedNote?.methodSnippetZH && (
            <div className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] font-mono text-xs">
              <span className="font-bold text-[var(--ink)]">解题手筋导引: </span>
              {concept.attachedNote.methodSnippetZH}
            </div>
          )}
        </div>
      </section>

      {/* 2. DE 15 NP 会考标答核心金句 (15-NP-Meistersatz) */}
      <section className="border-2 border-[var(--ink)] p-4 sm:p-5 bg-[var(--paper)] space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] uppercase font-bold px-2 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
              {lang === "de" ? "[ 15-NP-Meistersatz ]" : "[ 15 NP 考场标准高分核心金句 ]"}
            </span>
            <span className="font-mono text-xs text-[var(--ink-muted)]">
              Operator: <strong className="text-[var(--ink)]">{concept.klausurSatz15NP.operator}</strong>
            </span>
          </div>
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">
            Gymnasium EF/Q1
          </span>
        </div>

        {/* 满分德语金句 */}
        <blockquote className="text-sm sm:text-base font-serif leading-relaxed text-[var(--ink)] pl-3 border-l-2 border-[var(--ink)]">
          »{concept.klausurSatz15NP.musterSatzDE}«
        </blockquote>

        {/* 中文翻译与评分要点 */}
        <p className="text-xs font-serif text-[var(--ink-muted)] leading-relaxed">
          {concept.klausurSatz15NP.explanationZH}
        </p>

        {/* 满分踩分关键词标牌 */}
        <div className="space-y-1.5 pt-2 border-t border-[var(--line)]">
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink-muted)]">
            {lang === "de" ? "Erwartungshorizont-Schlagwörter:" : "评分细则必踩核心关键词:"}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {concept.klausurSatz15NP.scoringKeywords.map((kw, kwIdx) => (
              <span
                key={kwIdx}
                className="font-mono text-xs px-2 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] font-semibold"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. [!]️ 考场致命陷阱与 0 分排雷 (Klausurfallen) */}
      <section className="border border-[var(--line)] p-4 sm:p-5 bg-[var(--paper-subtle)] space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
            {lang === "de" ? "[ 3. Klausurfallen & Fehlerquellen-Abwehr ]" : "[ 3. [!]️ 考场致命陷阱与排雷剖析 ]"}
          </span>
          <span className="font-mono text-[10px] text-[var(--ink-muted)]">
            Punktabzug vermeiden
          </span>
        </div>

        <div className="space-y-3">
          {concept.fehlerquellen.map((trap, tIdx) => (
            <div
              key={tIdx}
              className="p-3 border border-[var(--line)] bg-[var(--paper)] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[var(--ink)]">
                  [{tIdx + 1}] {trap.trapTitleDE}
                </span>
                <span className="font-mono text-[9px] px-1.5 py-0.2 border border-[var(--line)] bg-[var(--paper-subtle)]">
                  Typischer Fehler
                </span>
              </div>
              <p className="text-xs font-serif text-[var(--ink)] leading-relaxed">
                {trap.trapDescriptionDE}
              </p>
              <p className="text-[11px] font-serif text-[var(--ink-muted)] leading-relaxed">
                {trap.trapDescriptionZH}
              </p>
              <div className="text-[10px] font-mono text-[var(--ink)] pt-1 border-t border-[var(--line)]">
                <span className="font-bold">
                  {lang === "de" ? "Gegenstrategie: " : "正确破解: "}
                </span>
                {trap.howToAvoidDE}
              </div>
            </div>
          ))}

          {/* 典型考场 0 分学生错答实例 */}
          {concept.examTrapCorrection && (
            <div className="p-3.5 border border-dashed border-[var(--ink)] bg-[var(--paper)] space-y-2">
              <div className="font-mono text-[10px] font-bold uppercase text-[var(--ink)]">
                {lang === "de" ? "Reales Klausur-Negativbeispiel (0 Notenpunkte):" : "真实考场扣分反例对比 (0分作答)："}
              </div>
              <blockquote className="text-xs font-serif text-[var(--ink)] pl-2 border-l border-[var(--ink)]">
                »{concept.examTrapCorrection.studentAnswerDE}«
              </blockquote>
              <div className="text-[11px] font-mono text-[var(--ink-muted)]">
                <span className="font-bold text-[var(--ink)]">
                  {lang === "de" ? "Fataler Fehler: " : "致命漏洞: "}
                </span>
                {concept.examTrapCorrection.fatalFlawPointDE}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. 底层 Library 真实笔记挂接展台 */}
      {matchingVaultNote && (
        <section className="border border-[var(--line)] p-4 bg-[var(--paper)] space-y-3">
          <div className="flex items-center justify-between pb-1.5 border-b border-[var(--line)]">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              {lang === "de" ? "[ Vault-Notiz Quelle: " + matchingVaultNote.path + " ]" : "[ 底层知识库联动: " + matchingVaultNote.path + " ]"}
            </span>
            <span className="font-mono text-[10px] text-[var(--ink-muted)]">
              {matchingVaultNote.blocks.length} Abschnitte
            </span>
          </div>

          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {matchingVaultNote.blocks.slice(0, 5).map((b, bIdx) => (
              <div key={bIdx} className="text-xs font-serif text-[var(--ink)] leading-relaxed">
                {b.kind === "h2" || b.kind === "h3" ? (
                  <h4 className="font-bold font-mono mt-1 pt-1 border-t border-[var(--line)]">
                    {b.text}
                  </h4>
                ) : (
                  <p>{b.text}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. 吸收确认勾选台 */}
      <section className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] space-y-2">
        <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--ink)] block">
          {lang === "de" ? "Absorption-Check vor dem Klausur-Drill:" : "进入刷题挑战前要点核实:"}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={absorbedItems.cn}
              onChange={() => toggleAbsorbed("cn")}
              className="accent-[var(--ink)]"
            />
            <span>{lang === "de" ? "Intuitiver Zugang verstanden" : "中文第一性原理透彻理解"}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={absorbedItems.muster}
              onChange={() => toggleAbsorbed("muster")}
              className="accent-[var(--ink)]"
            />
            <span>{lang === "de" ? "15-NP-Meistersatz eingeprägt" : "15分标答核心句及关键词背记"}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={absorbedItems.traps}
              onChange={() => toggleAbsorbed("traps")}
              className="accent-[var(--ink)]"
            />
            <span>{lang === "de" ? "Klausurfallen isoliert" : "典型 0 分错答陷阱已排雷"}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={absorbedItems.op}
              onChange={() => toggleAbsorbed("op")}
              className="accent-[var(--ink)]"
            />
            <span>{lang === "de" ? "Operatoren-Logik bereit" : "解题动词（AFB I-III）准备就绪"}</span>
          </label>
        </div>
      </section>

      {/* 6. 底部进入下一阶段 */}
      <footer className="border-t border-[var(--line)] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="text-xs font-mono text-[var(--ink-muted)]">
          {lang === "de"
            ? "Phase 3 abgeschlossen: Notiz verinnerlicht."
            : "阶段 3 提炼完成：考纲要点已内化于胸。"}
        </div>

        <button
          type="button"
          onClick={onAdvance}
          className="px-4 py-2 border-2 border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--paper)] hover:text-[var(--ink)] font-mono text-xs font-bold tracking-tight transition-colors cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{lang === "de" ? "Weiter zur Phase 4: Klausur-Drill" : "进入阶段 4 · 刷题挑战"}</span>
          <span aria-hidden="true">{"->"}</span>
        </button>
      </footer>
    </div>
  );
};
