import React, { useState, useMemo } from "react";
import { FAECHER, getFach, type FachInfo } from "../fach";
import { repository, type KnowledgeNote, type KnowledgeCard } from "../framework";
import { SIMULATION_REGISTRY, type SimEntry } from "./laborRegistry";
import Blocks from "../components/Blocks";
import type { Lang } from "../i18n";

export interface SubjectWorkspaceProps {
  currentFach?: string;
  onSubjectChange?: (fach: string) => void;
  onNavigateToTab?: (
    tab: "library" | "flashcards" | "klausursim" | "quiz" | "labor" | "tutor" | "reise",
    opts?: { fach?: string; query?: string; noteId?: string }
  ) => void;
  lang?: Lang;
}

type WorkspaceSubTab = "notes" | "cards" | "sims" | "exam";

export const SubjectWorkspace: React.FC<SubjectWorkspaceProps> = ({
  currentFach = "SoWi",
  onSubjectChange,
  onNavigateToTab,
  lang = "zh",
}) => {
  const de = lang === "de";

  // 1. 当前选中学科解析
  const activeFachInfo: FachInfo = useMemo(() => {
    return getFach(currentFach) || FAECHER[7]; // 默认 SoWi
  }, [currentFach]);

  // 2. 当前子标签页
  const [subTab, setSubTab] = useState<WorkspaceSubTab>("notes");

  // 3. 从统一知识库获取全量数据，并按学科过滤
  const allNotes: KnowledgeNote[] = useMemo(() => repository.getAllNotes(), []);
  const allCards: KnowledgeCard[] = useMemo(() => repository.getAllCards(), []);

  const subjectNotes = useMemo(() => {
    return allNotes.filter(
      (n) => n.fach.toLowerCase() === activeFachInfo.id.toLowerCase()
    );
  }, [allNotes, activeFachInfo.id]);

  const subjectCards = useMemo(() => {
    return allCards.filter(
      (c) => c.fach.toLowerCase() === activeFachInfo.id.toLowerCase()
    );
  }, [allCards, activeFachInfo.id]);

  const subjectSims: SimEntry[] = useMemo(() => {
    return SIMULATION_REGISTRY.filter(
      (s) => s.fach.toLowerCase() === activeFachInfo.id.toLowerCase()
    );
  }, [activeFachInfo.id]);

  // 4. 笔记阅读选定状态
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(() => {
    return subjectNotes.length > 0 ? subjectNotes[0].id : null;
  });
  const [noteSearchQuery, setNoteSearchQuery] = useState("");

  const filteredNotes = useMemo(() => {
    if (!noteSearchQuery.trim()) return subjectNotes;
    const q = noteSearchQuery.toLowerCase();
    return subjectNotes.filter(
      (n) =>
        n.thema.toLowerCase().includes(q) ||
        n.operatoren.some((op) => op.toLowerCase().includes(q)) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [subjectNotes, noteSearchQuery]);

  const activeNote = useMemo(() => {
    return subjectNotes.find((n) => n.id === selectedNoteId) || subjectNotes[0] || null;
  }, [subjectNotes, selectedNoteId]);

  // 5. 卡片快速测试翻转状态
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);

  // 6. 切换学科处理
  const handleSelectFach = (fachId: string) => {
    onSubjectChange?.(fachId);
    setNoteSearchQuery("");
    const nextNotes = allNotes.filter((n) => n.fach.toLowerCase() === fachId.toLowerCase());
    if (nextNotes.length > 0) {
      setSelectedNoteId(nextNotes[0].id);
    } else {
      setSelectedNoteId(null);
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* 顶部：学科横向切换条 (直观胶囊列表) */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
            {de ? "Fach-Bereich wählen" : "选择学科专区"}
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-[var(--ink)]">
            {de ? activeFachInfo.nameDE : activeFachInfo.nameZH} ({activeFachInfo.kurz})
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Fächer">
          {FAECHER.map((f) => {
            const isSelected = f.id.toLowerCase() === activeFachInfo.id.toLowerCase();
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => handleSelectFach(f.id)}
                aria-pressed={isSelected}
                className={`rounded-[var(--radius)] px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer ${
                  isSelected
                    ? "bg-[var(--ink)] text-[var(--paper)] font-medium"
                    : "border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--gray)]"
                }`}
              >
                <span>{f.kurz}</span>
                <span className="hidden sm:inline ml-1 font-sans opacity-80">
                  {de ? f.nameDE : f.nameZH}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 学科核心资产看板 (4个统计指标卡) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3">
          <div className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
            {de ? "Wissensnotizen" : "核心考点笔记"}
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-mono text-xl font-bold text-[var(--ink)]">
              {subjectNotes.length}
            </span>
            <span className="text-[var(--text-meta)] text-[var(--gray)] font-sans">
              {de ? "KLP-Konzepte" : "篇标准笔记"}
            </span>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3">
          <div className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
            {de ? "Karteikarten" : "考纲抽认词卡"}
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-mono text-xl font-bold text-[var(--ink)]">
              {subjectCards.length}
            </span>
            <span className="text-[var(--text-meta)] text-[var(--gray)] font-sans">
              {de ? "FSRS-Begriffe" : "张双语卡片"}
            </span>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3">
          <div className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
            {de ? "Simulationen & Werkzeuge" : "仿真实验与教具"}
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-mono text-xl font-bold text-[var(--ink)]">
              {subjectSims.length}
            </span>
            <span className="text-[var(--text-meta)] text-[var(--gray)] font-sans">
              {de ? "Labore" : "个交互沙盘"}
            </span>
          </div>
        </div>

        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3">
          <div className="font-mono text-[var(--text-meta)] text-[var(--gray)]">
            {de ? "Klausur & Training" : "真题模拟与练习"}
          </div>
          <div className="mt-1 flex items-baseline justify-between">
            <span className="font-mono text-xl font-bold text-[var(--ink)]">
              NRW EF
            </span>
            <span className="text-[var(--text-meta)] text-[var(--gray)] font-sans">
              {de ? "45 Min / 26 BE" : "全真会考卷"}
            </span>
          </div>
        </div>
      </div>

      {/* 快捷行动推荐条 */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5 px-3.5">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-mono font-medium text-[var(--ink)]">
            {de ? "Schnellaktionen:" : "本学科快捷操作："}
          </span>
          <span className="text-[var(--gray)] hidden md:inline">
            {de ? "Direkt in spezialisierte Trainingswerkzeuge einsteigen." : "一键直达专门训练模式。"}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigateToTab?.("flashcards", { fach: activeFachInfo.id })}
            className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
          >
            <span>{de ? "Karten drillen (Alt 2)" : "开启词卡背诵 (Alt 2)"}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateToTab?.("klausursim", { fach: activeFachInfo.id })}
            className="flex items-center gap-1 rounded border border-[var(--ink)] bg-[var(--ink)] px-2.5 py-1 font-mono text-xs text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
          >
            <span>{de ? "45 Min Klausur starten (Alt 3)" : "开始45分钟模考 (Alt 3)"}</span>
          </button>
          <button
            type="button"
            onClick={() => onNavigateToTab?.("tutor", { fach: activeFachInfo.id })}
            className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
          >
            <span>{de ? "Fach-Tutor fragen (Alt 6)" : "向AI助教请教 (Alt 6)"}</span>
          </button>
        </div>
      </div>

      {/* 四个直观的内容 Tab 栏 */}
      <div className="space-y-4">
        <div className="flex border-b border-[var(--line)]">
          <button
            type="button"
            onClick={() => setSubTab("notes")}
            className={`border-b-2 px-4 py-2 font-mono text-xs transition-colors cursor-pointer ${
              subTab === "notes"
                ? "border-[var(--ink)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {de ? `1. Wissensnotizen (${subjectNotes.length})` : `1. 知识笔记 (${subjectNotes.length})`}
          </button>
          <button
            type="button"
            onClick={() => setSubTab("cards")}
            className={`border-b-2 px-4 py-2 font-mono text-xs transition-colors cursor-pointer ${
              subTab === "cards"
                ? "border-[var(--ink)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {de ? `2. Karteikarten (${subjectCards.length})` : `2. 抽认卡片 (${subjectCards.length})`}
          </button>
          <button
            type="button"
            onClick={() => setSubTab("sims")}
            className={`border-b-2 px-4 py-2 font-mono text-xs transition-colors cursor-pointer ${
              subTab === "sims"
                ? "border-[var(--ink)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {de ? `3. Experimente & Labore (${subjectSims.length})` : `3. 实验与教具 (${subjectSims.length})`}
          </button>
          <button
            type="button"
            onClick={() => setSubTab("exam")}
            className={`border-b-2 px-4 py-2 font-mono text-xs transition-colors cursor-pointer ${
              subTab === "exam"
                ? "border-[var(--ink)] font-bold text-[var(--ink)]"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {de ? "4. Klausur & Prüfung" : "4. 模拟真题"}
          </button>
        </div>

        {/* Tab 1: 知识笔记 */}
        {subTab === "notes" && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
            {/* 笔记目录与检索 (占4列) */}
            <div className="md:col-span-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 space-y-3">
              <input
                type="text"
                placeholder={de ? "Notiz suchen..." : "搜索本学科考点..."}
                value={noteSearchQuery}
                onChange={(e) => setNoteSearchQuery(e.target.value)}
                className="w-full rounded border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1.5 font-sans text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)] focus:outline-none"
              />

              <div className="max-h-[600px] overflow-y-auto space-y-1.5 pr-1">
                {filteredNotes.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[var(--gray)] font-mono">
                    {de ? "Keine Notizen gefunden." : "未找到匹配笔记。"}
                  </div>
                ) : (
                  filteredNotes.map((note) => {
                    const isSelected = activeNote?.id === note.id;
                    return (
                      <button
                        key={note.id}
                        type="button"
                        onClick={() => setSelectedNoteId(note.id)}
                        className={`w-full text-left p-2.5 rounded transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[var(--paper)] border border-[var(--ink)] shadow-none"
                            : "border border-transparent hover:border-[var(--line)] hover:bg-[var(--paper)]"
                        }`}
                      >
                        <div className="font-serif text-xs font-semibold text-[var(--ink)] line-clamp-1">
                          {note.thema}
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-1 font-mono text-[10px] text-[var(--gray)]">
                          {note.operatoren.slice(0, 2).map((op) => (
                            <span key={op} className="rounded border border-[var(--line)] px-1">
                              {op}
                            </span>
                          ))}
                          {note.klausurrelevant && (
                            <span className="rounded bg-[var(--ink)] text-[var(--paper)] px-1">
                              Klausur
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>
            </div>

            {/* 笔记八段式详情与精读 (占8列) */}
            <div className="md:col-span-8 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-5 space-y-4">
              {activeNote ? (
                <>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[var(--line)] pb-3">
                    <div>
                      <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
                        {activeNote.fach} · {activeNote.path}
                      </span>
                      <h2 className="font-serif text-xl font-bold text-[var(--ink)] mt-0.5">
                        {activeNote.thema}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToTab?.("library", {
                            fach: activeNote.fach,
                            noteId: activeNote.id,
                          })
                        }
                        className="rounded border border-[var(--line)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
                      >
                        {de ? "Im Vollbild-Leser öffnen ->" : "在文库全屏阅读 ->"}
                      </button>
                    </div>
                  </div>

                  <div className="prose max-w-none text-xs leading-relaxed space-y-3">
                    <Blocks blocks={activeNote.blocks} pureGerman={de} />
                  </div>
                </>
              ) : (
                <div className="p-8 text-center text-xs text-[var(--gray)] font-mono">
                  {de ? "Keine Notiz ausgewählt." : "请在左侧选择需要研读的考点笔记。"}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: 抽认卡片 */}
        {subTab === "cards" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-xs text-[var(--gray)] font-mono">
                {de
                  ? `Insgesamt ${subjectCards.length} Vokabeln / Fachbegriffe in ${activeFachInfo.nameDE}`
                  : `当前学科共收录 ${subjectCards.length} 张核心考纲概念卡`}
              </div>
              <button
                type="button"
                onClick={() => onNavigateToTab?.("flashcards", { fach: activeFachInfo.id })}
                className="rounded border border-[var(--ink)] bg-[var(--ink)] px-3 py-1 font-mono text-xs text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
              >
                {de ? "Vollbild-Lernsession starten ->" : "开始全屏 FSRS 记忆轮次 ->"}
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {subjectCards.slice(0, 18).map((card) => {
                const isFlipped = flippedCardId === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                    className="cursor-pointer rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5 hover:border-[var(--gray)] transition-all flex flex-col justify-between min-h-[120px]"
                  >
                    <div>
                      <div className="font-mono text-[10px] text-[var(--gray)] mb-1 flex justify-between">
                        <span>{card.thema || activeFachInfo.kurz}</span>
                        <span>{isFlipped ? (de ? "Rückseite" : "背面") : (de ? "Klicken zum Aufdecken" : "点击翻转")}</span>
                      </div>
                      <div className="font-serif text-sm font-semibold text-[var(--ink)]">
                        {isFlipped ? card.back : card.front}
                      </div>
                      {card.example && !isFlipped && (
                        <div className="mt-2 font-mono text-[11px] text-[var(--gray)] line-clamp-2">
                          {card.example}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {subjectCards.length > 18 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("flashcards", { fach: activeFachInfo.id })}
                  className="font-mono text-xs text-[var(--accent)] hover:underline cursor-pointer"
                >
                  {de
                    ? `... und ${subjectCards.length - 18} weitere Karten in Flashcards üben`
                    : `... 还有 ${subjectCards.length - 18} 张词卡，前往卡片模块完整复习`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: 实验与教具 */}
        {subTab === "sims" && (
          <div className="space-y-4">
            <div className="text-xs text-[var(--gray)] font-mono">
              {de
                ? `${subjectSims.length} interaktive Labore & kognitive Werkzeuge verfügbar.`
                : `收录本学科 ${subjectSims.length} 款专业互动仿真实验室与思维教具。`}
            </div>

            {subjectSims.length === 0 ? (
              <div className="rounded-[var(--radius)] border border-dashed border-[var(--line)] p-8 text-center space-y-2">
                <div className="font-mono text-xs text-[var(--gray)]">
                  {de ? "Für dieses Fach sind vor allem Textanalyse- und Argumentationswerkzeuge vorgesehen." : "该学科目前主要采用文本分析与辩证教具。"}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("labor")}
                  className="rounded border border-[var(--line)] px-3 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] cursor-pointer"
                >
                  {de ? "Alle 42 Simulationen im Labor durchstöbern ->" : "浏览全学科 42 款仿真实验室 ->"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {subjectSims.map((sim) => (
                  <div
                    key={sim.id}
                    className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5 flex flex-col justify-between"
                  >
                    <div>
                      <div className="font-mono text-[10px] text-[var(--gray)] uppercase tracking-wider">
                        {sim.stufe} · {sim.fach}
                      </div>
                      <div className="font-serif text-sm font-bold text-[var(--ink)] mt-0.5">
                        {de ? sim.titleDE : sim.titleZH}
                      </div>
                      <div className="font-sans text-xs text-[var(--gray)] mt-1.5 leading-snug line-clamp-2">
                        {de ? sim.descDE : sim.descZH}
                      </div>
                    </div>

                    <div className="mt-4 pt-2 border-t border-[var(--line)] flex justify-end">
                      <button
                        type="button"
                        onClick={() => onNavigateToTab?.("labor")}
                        className="font-mono text-xs text-[var(--ink)] hover:text-[var(--accent)] cursor-pointer"
                      >
                        {de ? "Labor betreten ->" : "进入实验沙盘 ->"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: 模拟真题与会考 */}
        {subTab === "exam" && (
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6 space-y-5">
            <div>
              <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
                Gymnasium Oberstufe EF · NRW Klausurstandard
              </span>
              <h3 className="font-serif text-lg font-bold text-[var(--ink)] mt-1">
                {de
                  ? `${activeFachInfo.nameDE} Klausurphase 1 Prüfungstraining`
                  : `${activeFachInfo.nameZH} 会考第一阶段实战真题训练`}
              </h3>
              <p className="font-sans text-xs text-[var(--gray)] mt-1 max-w-2xl leading-relaxed">
                {de
                  ? "Standardisierte 45-Minuten-Klausursimulation nach KLP-NRW-Richtlinien (26/24/26 BE Erwartungshorizont mit D1-D5 Diagnostik)."
                  : "依据北威州会考标准命制，45分钟限时组卷，配备官方采分点细则与失分缺陷诊断。"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="border border-[var(--line)] rounded p-4 bg-[var(--paper)] space-y-2">
                <div className="font-mono text-xs font-semibold text-[var(--ink)]">
                  {de ? "Option A: 45 Min Vollsimulation" : "模式 A：45分钟全真模拟考"}
                </div>
                <div className="text-xs text-[var(--gray)] leading-snug">
                  {de
                    ? "Inklusive Material-Texten, Operatoren-Aufgaben und automatischer Erwartungshorizont-Korrektur."
                    : "包含完整原材料阅读、动词规范设问、倒计时并给出逐题采分对照。"}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("klausursim", { fach: activeFachInfo.id })}
                  className="mt-2 w-full rounded border border-[var(--ink)] bg-[var(--ink)] py-1.5 font-mono text-xs text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
                >
                  {de ? "Klausur jetzt starten ->" : "立即进入该科模拟考场 ->"}
                </button>
              </div>

              <div className="border border-[var(--line)] rounded p-4 bg-[var(--paper)] space-y-2">
                <div className="font-mono text-xs font-semibold text-[var(--ink)]">
                  {de ? "Option B: 5 Min Schnell-Quiz" : "模式 B：5分钟考点快测自检"}
                </div>
                <div className="text-xs text-[var(--gray)] leading-snug">
                  {de
                    ? "Kompakte Multiple-Choice und Vergleichsfragen zum sofortigen Wissens-Check."
                    : "针对核心定义的快速自测，即时纠错并计入掌握度积分。"}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("quiz", { fach: activeFachInfo.id })}
                  className="mt-2 w-full rounded border border-[var(--line)] bg-[var(--surface)] py-1.5 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
                >
                  {de ? "Quiz starten ->" : "开启该科随堂测验 ->"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectWorkspace;
