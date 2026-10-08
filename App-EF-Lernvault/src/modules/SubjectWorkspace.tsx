import React, { useState, useMemo, useEffect } from "react";
import { getFach } from "../fach";
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

export interface DisplayFachInfo {
  id: string;
  kurz: string;
  nameDE: string;
  nameZH: string;
}

const ALL_FACH_INFO: DisplayFachInfo = {
  id: "alle",
  kurz: "ALL",
  nameDE: "Alle Fächer",
  nameZH: "所有学科",
};

export const SubjectWorkspace: React.FC<SubjectWorkspaceProps> = ({
  currentFach = "alle",
  onSubjectChange: _onSubjectChange,
  onNavigateToTab,
  lang = "zh",
}) => {
  const de = lang === "de";
  const isAllFaecher = !currentFach || currentFach.toLowerCase() === "alle";

  // 1. 当前选中学科解析
  const activeFachInfo: DisplayFachInfo = useMemo(() => {
    if (isAllFaecher) return ALL_FACH_INFO;
    return getFach(currentFach) || ALL_FACH_INFO;
  }, [currentFach, isAllFaecher]);

  // 2. 当前子标签页
  const [subTab, setSubTab] = useState<WorkspaceSubTab>("notes");

  // 3. 从统一知识库获取全量数据，并按学科过滤
  const allNotes: KnowledgeNote[] = useMemo(() => repository.getAllNotes(), []);
  const allCards: KnowledgeCard[] = useMemo(() => repository.getAllCards(), []);

  const subjectNotes = useMemo(() => {
    if (isAllFaecher) return allNotes;
    return allNotes.filter(
      (n) => n.fach.toLowerCase() === activeFachInfo.id.toLowerCase()
    );
  }, [allNotes, activeFachInfo.id, isAllFaecher]);

  const subjectCards = useMemo(() => {
    if (isAllFaecher) return allCards;
    return allCards.filter(
      (c) => c.fach.toLowerCase() === activeFachInfo.id.toLowerCase()
    );
  }, [allCards, activeFachInfo.id, isAllFaecher]);

  const subjectSims: SimEntry[] = useMemo(() => {
    if (isAllFaecher) return SIMULATION_REGISTRY;
    return SIMULATION_REGISTRY.filter(
      (s) => s.fach.toLowerCase() === activeFachInfo.id.toLowerCase()
    );
  }, [activeFachInfo.id, isAllFaecher]);

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
        n.fach.toLowerCase().includes(q) ||
        n.operatoren.some((op) => op.toLowerCase().includes(q)) ||
        n.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [subjectNotes, noteSearchQuery]);

  const activeNote = useMemo(() => {
    return subjectNotes.find((n) => n.id === selectedNoteId) || subjectNotes[0] || null;
  }, [subjectNotes, selectedNoteId]);

  // 5. 交互控制与放大视图状态
  const [flippedCardId, setFlippedCardId] = useState<string | null>(null);
  const [zoomedCard, setZoomedCard] = useState<KnowledgeCard | null>(null);
  const [isCatalogCollapsed, setIsCatalogCollapsed] = useState(false);
  const [isFullWidthReading, setIsFullWidthReading] = useState(true);
  const [fontSizeLevel, setFontSizeLevel] = useState<"sm" | "base" | "lg">("base");

  // 6. 当外部学科改变时，如当前选中笔记不属于该学科则自动同步
  useEffect(() => {
    if (selectedNoteId && subjectNotes.some((n) => n.id === selectedNoteId)) {
      return;
    }
    if (subjectNotes.length > 0) {
      setSelectedNoteId(subjectNotes[0].id);
    } else {
      setSelectedNoteId(null);
    }
  }, [currentFach, subjectNotes]);

  return (
    <div className="flex h-full w-full min-h-0 min-w-0 flex-col overflow-hidden bg-[var(--paper)]">
      {/* 顶部常驻工作台分类与快捷行动条 (精简单栏，消除与全局顶栏功能重复) */}
      <header className="shrink-0 border-b border-[var(--line)] bg-[var(--paper)] px-4 py-2 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          {/* 四大直观分类标签页切换 */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSubTab("notes")}
              className={`rounded px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                subTab === "notes"
                  ? "bg-[var(--ink)] text-[var(--paper)] font-semibold"
                  : "border border-transparent text-[var(--gray)] hover:text-[var(--ink)] hover:bg-[var(--surface)]"
              }`}
            >
              {de ? `1. Wissensnotizen (${subjectNotes.length})` : `1. 知识笔记 (${subjectNotes.length})`}
            </button>
            <button
              type="button"
              onClick={() => setSubTab("cards")}
              className={`rounded px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                subTab === "cards"
                  ? "bg-[var(--ink)] text-[var(--paper)] font-semibold"
                  : "border border-transparent text-[var(--gray)] hover:text-[var(--ink)] hover:bg-[var(--surface)]"
              }`}
            >
              {de ? `2. Karteikarten (${subjectCards.length})` : `2. 抽认卡片 (${subjectCards.length})`}
            </button>
            <button
              type="button"
              onClick={() => setSubTab("sims")}
              className={`rounded px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                subTab === "sims"
                  ? "bg-[var(--ink)] text-[var(--paper)] font-semibold"
                  : "border border-transparent text-[var(--gray)] hover:text-[var(--ink)] hover:bg-[var(--surface)]"
              }`}
            >
              {de ? `3. Labore (${subjectSims.length})` : `3. 实验与教具 (${subjectSims.length})`}
            </button>
            <button
              type="button"
              onClick={() => setSubTab("exam")}
              className={`rounded px-3 py-1 font-mono text-xs transition-colors cursor-pointer ${
                subTab === "exam"
                  ? "bg-[var(--ink)] text-[var(--paper)] font-semibold"
                  : "border border-transparent text-[var(--gray)] hover:text-[var(--ink)] hover:bg-[var(--surface)]"
              }`}
            >
              {de ? "4. Klausur-Training" : "4. 模拟真题"}
            </button>
          </div>

          {/* 快捷行动条 */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onNavigateToTab?.("flashcards", { fach: activeFachInfo.id })}
              className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
            >
              <span>{de ? "Karten drillen (Alt 3)" : "开启词卡背诵 (Alt 3)"}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToTab?.("klausursim", { fach: activeFachInfo.id })}
              className="flex items-center gap-1 rounded border border-[var(--ink)] bg-[var(--ink)] px-2 py-0.5 font-mono text-[11px] text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
            >
              <span>{de ? "45 Min Klausur starten (Alt 5)" : "开始45分钟模考 (Alt 5)"}</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToTab?.("tutor", { fach: activeFachInfo.id })}
              className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
            >
              <span>{de ? "Fach-Tutor fragen (Alt 6)" : "向AI助教请教 (Alt 6)"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 主工作区 (占据剩余 100% 垂直空间) */}
      <main className="flex-1 min-h-0 min-w-0 flex overflow-hidden">
        {/* Tab 1: 知识笔记 —— 现代化独立双栏分屏工作区 */}
        {subTab === "notes" && (
          <div className="flex h-full w-full min-h-0 min-w-0 overflow-hidden">
            {/* 左栏：考点目录抽屉 (具备独立滚动与一键折叠) */}
            <aside
              className={`flex flex-col border-r border-[var(--line)] bg-[var(--surface)] transition-all duration-200 overflow-hidden shrink-0 ${
                isCatalogCollapsed ? "w-0 border-r-0 opacity-0 pointer-events-none" : "w-72 sm:w-80 opacity-100"
              }`}
            >
              {/* 目录搜索头 */}
              <div className="p-3 border-b border-[var(--line)] shrink-0 flex items-center gap-2">
                <input
                  type="text"
                  value={noteSearchQuery}
                  onChange={(e) => setNoteSearchQuery(e.target.value)}
                  placeholder={
                    de
                      ? isAllFaecher
                        ? "Alle Notizen durchsuchen..."
                        : "Thema filtern..."
                      : isAllFaecher
                      ? "搜索全库考点..."
                      : "搜索本学科考点..."
                  }
                  className="w-full rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1 font-sans text-xs text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--accent)] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsCatalogCollapsed(true)}
                  title={de ? "Menü einklappen" : "收起目录"}
                  className="rounded border border-[var(--line)] p-1 text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer shrink-0"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M11 3L5 8l6 5" />
                  </svg>
                </button>
              </div>

              {/* 考点独立滚动列表 */}
              <div className="flex-1 overflow-y-auto divide-y divide-[var(--line)]">
                {filteredNotes.length === 0 ? (
                  <div className="p-6 text-center text-xs text-[var(--gray)] font-mono">
                    {de ? "Keine Notizen gefunden." : "未检索到匹配考点。"}
                  </div>
                ) : (
                  filteredNotes.map((note) => {
                    const isSelected = note.id === selectedNoteId;
                    return (
                      <div
                        key={note.id}
                        onClick={() => setSelectedNoteId(note.id)}
                        className={`cursor-pointer p-3 text-left transition-colors ${
                          isSelected
                            ? "bg-[var(--paper)] border-l-2 border-l-[var(--accent)] text-[var(--ink)] font-medium"
                            : "hover:bg-[var(--paper)]/60 text-[var(--ink)]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="font-serif text-xs leading-snug line-clamp-2">
                            {note.thema}
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            {isAllFaecher && (
                              <span className="rounded border border-[var(--line)] bg-[var(--surface)] px-1 py-0.2 font-mono text-[9px] text-[var(--ink)]">
                                {note.fach}
                              </span>
                            )}
                            {note.klausurrelevant && (
                              <span className="rounded bg-[var(--ink)] px-1 py-0.2 font-mono text-[9px] text-[var(--paper)]">
                                Klausur
                              </span>
                            )}
                          </div>
                        </div>

                        {note.operatoren.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-1 font-mono text-[10px] text-[var(--gray)]">
                            {note.operatoren.slice(0, 3).map((op) => (
                              <span key={op} className="rounded border border-[var(--line)] px-1 py-0.2">
                                {op}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </aside>

            {/* 右栏：长文档精读区 (独立滚动 + 工具栏 + 排版宽度/字号调节) */}
            <section className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[var(--paper)]">
              {activeNote ? (
                <>
                  {/* 阅读器顶部控制条 */}
                  <div className="flex items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--surface)] px-4 py-2 shrink-0">
                    <div className="flex items-center gap-2 min-w-0">
                      {isCatalogCollapsed && (
                        <button
                          type="button"
                          onClick={() => setIsCatalogCollapsed(false)}
                          title={de ? "Menü ausklappen" : "展开目录"}
                          className="rounded border border-[var(--line)] p-1 text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer shrink-0"
                        >
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 3l6 5-6 5" />
                          </svg>
                        </button>
                      )}
                      <span className="font-mono text-[11px] text-[var(--gray)] truncate">
                        {activeNote.path.toUpperCase()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {/* 字号缩放 */}
                      <div className="flex items-center border border-[var(--line)] rounded overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setFontSizeLevel("sm")}
                          className={`px-1.5 py-0.5 text-[10px] font-mono cursor-pointer ${fontSizeLevel === "sm" ? "bg-[var(--ink)] text-[var(--paper)]" : "text-[var(--gray)] hover:text-[var(--ink)]"}`}
                        >
                          A-
                        </button>
                        <button
                          type="button"
                          onClick={() => setFontSizeLevel("base")}
                          className={`px-1.5 py-0.5 text-[10px] font-mono cursor-pointer ${fontSizeLevel === "base" ? "bg-[var(--ink)] text-[var(--paper)]" : "text-[var(--gray)] hover:text-[var(--ink)]"}`}
                        >
                          A
                        </button>
                        <button
                          type="button"
                          onClick={() => setFontSizeLevel("lg")}
                          className={`px-1.5 py-0.5 text-[10px] font-mono cursor-pointer ${fontSizeLevel === "lg" ? "bg-[var(--ink)] text-[var(--paper)]" : "text-[var(--gray)] hover:text-[var(--ink)]"}`}
                        >
                          A+
                        </button>
                      </div>

                      {/* 宽度切换：居中 800px vs 100% 全宽 */}
                      <button
                        type="button"
                        onClick={() => setIsFullWidthReading(!isFullWidthReading)}
                        className="rounded border border-[var(--line)] px-2 py-0.5 font-mono text-[11px] text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                        title={de ? "Breite umschalten" : "切换排版宽度"}
                      >
                        {isFullWidthReading ? (de ? "Breite: 100%" : "全宽排版") : (de ? "Breite: Standard" : "居中排版")}
                      </button>

                      {/* 在文库全屏阅读 */}
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToTab?.("library", {
                            fach: activeNote.fach,
                            noteId: activeNote.id,
                          })
                        }
                        className="rounded border border-[var(--line)] px-2 py-0.5 font-mono text-[11px] text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
                      >
                        {de ? "Im Vollbild-Leser öffnen ->" : "在文库全屏阅读 ->"}
                      </button>
                    </div>
                  </div>

                  {/* 文章正文滚动主区 (独立垂直滚动) */}
                  <div className="flex-1 min-h-0 overflow-y-auto px-6 py-6 sm:px-10 lg:px-14">
                    <div className={`${isFullWidthReading ? "max-w-none" : "max-w-3xl mx-auto"} space-y-4`}>
                      <h2 className="font-serif text-2xl font-bold tracking-tight text-[var(--ink)]">
                        {activeNote.thema}
                      </h2>

                      <div className={`prose max-w-none space-y-3 ${
                        fontSizeLevel === "lg" ? "text-base leading-relaxed" : fontSizeLevel === "sm" ? "text-xs leading-normal" : "text-sm leading-relaxed"
                      }`}>
                        <Blocks blocks={activeNote.blocks} pureGerman={de} />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center p-8 text-center text-xs text-[var(--gray)] font-mono">
                  {de ? "Keine Notiz ausgewählt." : "请在左侧选择需要研读的考点笔记。"}
                </div>
              )}
            </section>
          </div>
        )}

        {/* Tab 2: 抽认卡片 —— 自适应多列网格与大卡放大弹窗 */}
        {subTab === "cards" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-3.5">
              {subjectCards.slice(0, 24).map((card) => {
                const isFlipped = flippedCardId === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => setFlippedCardId(isFlipped ? null : card.id)}
                    className="cursor-pointer rounded border border-[var(--line)] bg-[var(--surface)] p-3.5 hover:border-[var(--gray)] transition-all flex flex-col justify-between min-h-[130px] group"
                  >
                    <div>
                      <div className="font-mono text-[10px] text-[var(--gray)] mb-1 flex justify-between items-center">
                        <span>{card.thema || activeFachInfo.kurz}</span>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setZoomedCard(card);
                            }}
                            title={de ? "Vergrößern" : "放大查看"}
                            className="text-[var(--gray)] hover:text-[var(--ink)] p-0.5"
                          >
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M2 6V2h4M10 2h4v4M14 10v4h-4M6 14H2v-4" />
                            </svg>
                          </button>
                          <span>{isFlipped ? (de ? "Rückseite" : "背面") : (de ? "Klicken zum Aufdecken" : "点击翻转")}</span>
                        </div>
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

            {subjectCards.length > 24 && (
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("flashcards", { fach: activeFachInfo.id })}
                  className="font-mono text-xs text-[var(--accent)] hover:underline cursor-pointer"
                >
                  {de
                    ? `... und ${subjectCards.length - 24} weitere Karten in Flashcards üben`
                    : `... 还有 ${subjectCards.length - 24} 张词卡，前往卡片模块完整复习`}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: 实验与教具 —— 宽屏自适应与全屏入口 */}
        {subTab === "sims" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-4">
            <div className="text-xs text-[var(--gray)] font-mono">
              {de
                ? `${subjectSims.length} interaktive Labore & kognitive Werkzeuge verfügbar.`
                : `收录本学科 ${subjectSims.length} 款专业互动仿真实验室与思维教具。`}
            </div>

            {subjectSims.length === 0 ? (
              <div className="rounded border border-dashed border-[var(--line)] p-8 text-center space-y-2">
                <div className="font-mono text-xs text-[var(--gray)]">
                  {de ? "Für dieses Fach sind vor allem Textanalyse- und Argumentationswerkzeuge vorgesehen." : "该学科目前主要采用文本分析与辩证教具。"}
                </div>
                <button
                  type="button"
                  onClick={() => onNavigateToTab?.("labor")}
                  className="rounded border border-[var(--line)] px-3 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] cursor-pointer"
                >
                  {de ? "Zum allgemeinen Labor-Zentrum ->" : "前往全部实验中心 ->"}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subjectSims.map((sim) => (
                  <div
                    key={sim.id}
                    className="rounded border border-[var(--line)] bg-[var(--surface)] p-4 flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between font-mono text-[10px] text-[var(--gray)]">
                        <span className="uppercase">{sim.fach}</span>
                        <span>{sim.stufe}</span>
                      </div>
                      <div className="font-serif text-base font-semibold text-[var(--ink)] mt-1">
                        {de ? sim.titleDE : sim.titleZH}
                      </div>
                      <div className="font-sans text-xs text-[var(--gray)] mt-1 leading-relaxed">
                        {de ? sim.descDE : sim.descZH}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[var(--line)]">
                      <span className="font-mono text-[10px] text-[var(--gray)]">Canvas / Interactive</span>
                      <button
                        type="button"
                        onClick={() => onNavigateToTab?.("labor", { fach: activeFachInfo.id })}
                        className="rounded border border-[var(--line)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
                      >
                        {de ? "Im Labor öffnen ->" : "在实验室启动 ->"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: 模拟真题 —— NRW 45 分钟会考规范与诊断 */}
        {subTab === "exam" && (
          <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="border border-[var(--line)] rounded bg-[var(--surface)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                  NRW Gymnasium EF · Offizieller Standard
                </span>
                <span className="font-mono text-xs text-[var(--gray)]">45 Min · 26 BE</span>
              </div>
              <h2 className="font-serif text-lg font-bold text-[var(--ink)]">
                {de ? `${activeFachInfo.nameDE} Standardklausur` : `${activeFachInfo.nameZH} 官方标准全真模拟卷`}
              </h2>
              <p className="font-sans text-xs leading-relaxed text-[var(--gray)]">
                {de
                  ? "Vollständige Simulation nach den offiziellen NRW Kernlehrplänen. Beinhaltet AFB I (Darstellung), AFB II (Analyse) und AFB III (Urteil / Gestaltung) mit automatischer D1-D5 Mängelerkennung."
                  : "完全遵循北威州教育部官方核心考纲组卷。覆盖基础再现 (AFB I)、原典剖析 (AFB II) 与辩证评析 (AFB III)，答卷后由智能评分引擎进行 D1~D5 官方采分缺陷精准诊断。"}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="border border-[var(--line)] rounded p-4 bg-[var(--paper)] flex flex-col justify-between space-y-2">
                  <div>
                    <div className="font-serif font-bold text-sm text-[var(--ink)]">
                      {de ? "Modus A: 45 Min Vollsimulation" : "模式 A：45分钟全真模拟考"}
                    </div>
                    <div className="font-sans text-xs text-[var(--gray)] mt-1">
                      {de ? "Offizielles NRW Format (26 BE) mit Zeittimer und automatischer D1-D5 Diagnose." : "官方北威州 26 BE 会考限时计时与智能采分诊断。"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToTab?.("klausursim", { fach: activeFachInfo.id })}
                    className="rounded border border-[var(--ink)] bg-[var(--ink)] px-3 py-1 font-mono text-xs text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
                  >
                    {de ? "45 Min Klausur starten ->" : "立即开始 45 分钟模考 ->"}
                  </button>
                </div>

                <div className="border border-[var(--line)] rounded p-4 bg-[var(--paper)] flex flex-col justify-between space-y-2">
                  <div>
                    <div className="font-serif font-bold text-sm text-[var(--ink)]">
                      {de ? "Modus B: 5 Min Schnelltest" : "模式 B：5分钟考点快测自检"}
                    </div>
                    <div className="font-sans text-xs text-[var(--gray)] mt-1">
                      {de ? "Kompakter Test zur schnellen Wissensstandskontrolle." : "快速检验当前学科核心概念与判断题。"}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToTab?.("quiz", { fach: activeFachInfo.id })}
                    className="rounded border border-[var(--line)] bg-[var(--surface)] px-3 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] cursor-pointer"
                  >
                    {de ? "5 Min Schnelles Quiz ->" : "5 分钟随堂智能小测 ->"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 放大查看词卡沉浸模态框 (Zoomed Card Modal) */}
      {zoomedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4"
          onClick={() => setZoomedCard(null)}
        >
          <div
            className="w-full max-w-lg rounded border border-[var(--line)] bg-[var(--paper)] p-6 space-y-4 shadow-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
              <span className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
                {zoomedCard.thema || activeFachInfo.kurz} · {de ? "Karte vergrößert" : "概念大卡沉浸速测"}
              </span>
              <button
                type="button"
                onClick={() => setZoomedCard(null)}
                className="font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
              >
                Esc / [X]
              </button>
            </div>

            <div
              onClick={() => setFlippedCardId(flippedCardId === zoomedCard.id ? null : zoomedCard.id)}
              className="cursor-pointer rounded border border-[var(--line)] bg-[var(--surface)] p-6 min-h-[180px] flex flex-col justify-between"
            >
              <div className="font-mono text-[11px] text-[var(--gray)] mb-2">
                {flippedCardId === zoomedCard.id ? (de ? "Rückseite (Bedeutung)" : "背面解析") : (de ? "Vorderseite (Begriff) · Klicken zum Umdrehen" : "正面概念 · 点击翻转")}
              </div>
              <div className="font-serif text-lg font-bold text-[var(--ink)] leading-snug">
                {flippedCardId === zoomedCard.id ? zoomedCard.back : zoomedCard.front}
              </div>
              {zoomedCard.example && (
                <div className="mt-4 pt-3 border-t border-[var(--line)]/60 font-mono text-xs text-[var(--gray)]">
                  {zoomedCard.example}
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setZoomedCard(null)}
                className="rounded border border-[var(--line)] px-3 py-1 font-mono text-xs text-[var(--ink)] hover:bg-[var(--surface)] cursor-pointer"
              >
                {de ? "Schließen" : "关闭"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
