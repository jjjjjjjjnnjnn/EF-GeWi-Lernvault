import { useEffect, useMemo, useState } from "react";
import { notes as mockNotes, cards as mockCards, type Note as MockNote } from "../data";
import { PER_MODULE_KEYS, isTyping, matchesKey } from "../keys";
import Blocks from "../components/Blocks";
import type { Block, VaultNote } from "../vault/parser";
import { buildSearchIndex } from "../engine/index";
import { MasteryEngine } from "../engine/mastery";
import { FAECHER } from "../fach";
import { Pagination } from "../components/Pagination";
import type { Lang } from "../i18n";
import { getHighestAfb, getOperatorInfo } from "../config/audience";

interface Shown {
  id: string;
  fach: string;
  thema: string;
  sub: string;
  operatoren: string[];
  klausurrelevant: boolean;
  datum: string;
  tags: string[];
  blocks: Block[];
}

function fromMock(m: MockNote): Shown {
  const blocks: Block[] = [];
  m.bodyZH.forEach((z, i) => {
    blocks.push({ kind: "p", text: z, lang: "zh" });
    if (m.bodyDE[i]) blocks.push({ kind: "p", text: m.bodyDE[i], lang: "de" });
  });
  return {
    id: m.id,
    fach: m.fach,
    thema: m.thema,
    sub: m.zh,
    operatoren: m.operatoren,
    klausurrelevant: true,
    datum: "",
    tags: [],
    blocks,
  };
}

function fromVault(n: VaultNote): Shown {
  return {
    id: n.id,
    fach: n.fach,
    thema: n.thema,
    sub: n.path,
    operatoren: n.operatoren,
    klausurrelevant: n.klausurrelevant,
    datum: n.datum,
    tags: n.tags,
    blocks: n.blocks,
  };
}

export interface LibraryLinkedCard {
  id: string;
  front: string;
  back: string;
  example?: string;
  fach: string;
  thema?: string;
}

interface LibraryProps {
  query: string;
  vault: VaultNote[] | null;
  cards?: LibraryLinkedCard[] | null;
  selectedFach?: string;
  selectedNoteId?: string;
  onClearQuery?: () => void;
  onSubjectChange?: (fach: string) => void;
  onNavigateToTab?: (
    tab: "klausursim" | "flashcards" | "quiz",
    opts?: { fach?: string; query?: string; noteId?: string }
  ) => void;
  lang?: Lang;
}

export default function Library({
  query,
  vault,
  cards,
  selectedFach,
  selectedNoteId,
  onClearQuery,
  onSubjectChange,
  onNavigateToTab,
  lang = "zh",
}: LibraryProps) {
  const shown: Shown[] = useMemo(
    () => (vault ? vault.map(fromVault) : mockNotes.map(fromMock)),
    [vault]
  );
  const [fach, setFach] = useState(selectedFach ?? "alle");
  const [openId, setOpenId] = useState(shown[0]?.id ?? "");
  const [masteryEngine] = useState(() => new MasteryEngine());

  // Pagination & Filtering state
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(8);
  const [filterAfb, setFilterAfb] = useState<"all" | "afb1" | "afb2" | "afb3">("all");
  const [klausurOnly, setKlausurOnly] = useState<boolean>(false);
  const [readingMode, setReadingMode] = useState<"de-native" | "bilingual">(() =>
    lang === "de" ? "de-native" : "bilingual"
  );
  const [activeOperatorTip, setActiveOperatorTip] = useState<string | null>(null);

  useEffect(() => {
    setReadingMode(lang === "de" ? "de-native" : "bilingual");
  }, [lang]);

  // Subject counts for the 10-Fach badge system
  const fachCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FAECHER.forEach((f) => {
      counts[f.id] = shown.filter((n) => n.fach === f.id).length;
    });
    return counts;
  }, [shown]);

  useEffect(() => {
    if (selectedFach) {
      setFach(selectedFach);
      setPage(1);
    }
  }, [selectedFach]);

  useEffect(() => {
    if (selectedNoteId) {
      setOpenId(selectedNoteId);
      const target = shown.find((n) => n.id === selectedNoteId);
      if (target) {
        setFach(target.fach);
        onSubjectChange?.(target.fach);
      }
    }
  }, [selectedNoteId, shown, onSubjectChange]);

  const selectFach = (nextFach: string) => {
    setFach(nextFach);
    setPage(1);
    onSubjectChange?.(nextFach);
  };

  // Reset selection when source switches
  useEffect(() => {
    setOpenId(shown[0]?.id ?? "");
    setPage(1);
  }, [vault, shown]);

  const q = query.trim();
  const searchIndex = useMemo(
    () =>
      buildSearchIndex(
        shown.map((n) => ({
          id: n.id,
          thema: n.thema,
          sub: n.sub,
          text: n.blocks.map((b) => b.text).join(" "),
          fach: n.fach,
          tags: n.tags,
          datum: n.datum,
        })),
        {
          rankingWeight: (doc) => masteryEngine.getRankingWeight(doc.id, doc.datum),
        }
      ),
    [shown, masteryEngine]
  );

  const rankedIds = useMemo(() => searchIndex.query(query), [searchIndex, query]);

  useEffect(() => {
    setPage(1);
  }, [query, filterAfb, klausurOnly]);

  const list = useMemo(() => {
    const byId = new Map(shown.map((note) => [note.id, note]));
    return rankedIds
      .map((id) => byId.get(id))
      .filter((note): note is Shown => {
        if (!note) return false;
        if (fach !== "alle" && note.fach !== fach) return false;
        if (klausurOnly && !note.klausurrelevant) return false;
        if (filterAfb !== "all") {
          const ops = note.operatoren.map((o) => o.toLowerCase());
          if (filterAfb === "afb1") {
            const afb1Keywords = ["darstellen", "nennen", "beschreiben", "wiedergeben", "definieren"];
            if (!ops.some((o) => afb1Keywords.some((kw) => o.includes(kw)))) return false;
          } else if (filterAfb === "afb2") {
            const afb2Keywords = ["analysieren", "erläutern", "erlaeutern", "vergleichen", "charakterisieren", "einordnen"];
            if (!ops.some((o) => afb2Keywords.some((kw) => o.includes(kw)))) return false;
          } else if (filterAfb === "afb3") {
            const afb3Keywords = ["beurteilen", "bewerten", "erörtern", "eroertern", "diskutieren", "stellung"];
            if (!ops.some((o) => afb3Keywords.some((kw) => o.includes(kw)))) return false;
          }
        }
        return true;
      });
  }, [rankedIds, shown, fach, klausurOnly, filterAfb]);

  const paginatedList = useMemo(() => {
    const start = (page - 1) * pageSize;
    return list.slice(start, start + pageSize);
  }, [list, page, pageSize]);

  const open =
    list.find((n) => n.id === openId) ??
    shown.find((n) => n.id === openId) ??
    paginatedList[0] ??
    list[0];

  const [showPracticePanel, setShowPracticePanel] = useState<boolean>(true);
  const [revealedCardId, setRevealedCardId] = useState<string | null>(null);

  const linkedCards = useMemo(() => {
    if (!open) return [];
    const pool = cards && cards.length > 0 ? cards : mockCards;
    const sameFach = pool.filter(
      (c) => c.fach.toLowerCase() === open.fach.toLowerCase()
    );
    if (sameFach.length === 0) return [];

    const keywords = [
      ...open.thema.toLowerCase().split(/[\s,&/.-]+/).filter((t) => t.length >= 3),
      ...open.tags.map((t) => t.toLowerCase()).filter((t) => t !== "ef" && t.length >= 2),
    ];

    const matched = sameFach.filter((c) => {
      const themaStr = "thema" in c && typeof c.thema === "string" ? c.thema : "";
      const text = `${c.front} ${c.back} ${c.example ?? ""} ${themaStr}`.toLowerCase();
      return keywords.some((kw) => text.includes(kw));
    });

    return (matched.length > 0 ? matched : sameFach).slice(0, 3);
  }, [cards, open]);

  const operatorPhrases = useMemo(() => {
    if (!open) return [];
    const phrases: Array<{ op: string; phraseDE: string; hintZH: string }> = [];
    const ops = open.operatoren.map((o) => o.toLowerCase());

    if (ops.some((o) => o.includes("darstell") || o.includes("nenn") || o.includes("beschreib"))) {
      phrases.push({
        op: "Darstellen (AFB I)",
        phraseDE: `Im Kern lässt sich ${open.thema} dahingehend definieren, dass die konstitutiven Merkmale...`,
        hintZH: "客观定义与维度梳理，中立陈述",
      });
    }
    if (ops.some((o) => o.includes("analys") || o.includes("erlaeut") || o.includes("vergleich"))) {
      phrases.push({
        op: "Analysieren (AFB II)",
        phraseDE: `Am vorliegenden Material wird ersichtlich, dass [Ursache] unmittelbar zu [Wirkung] führt (vgl. Z. ...).`,
        hintZH: "因果链条闭环与行号实证嵌套",
      });
    }
    if (ops.some((o) => o.includes("beurteil") || o.includes("bewert") || o.includes("eroert"))) {
      phrases.push({
        op: "Beurteilen (AFB III)",
        phraseDE: `Unter Abwägung der Kriterien Effizienz und Legitimität überwiegt der Befund, dass...`,
        hintZH: "标准先行，再作权衡与独立价值裁决",
      });
    }

    if (phrases.length === 0) {
      phrases.push({
        op: "Klausur-Basissatz",
        phraseDE: `Im Rahmen der ${open.fach}-Klausur ist das Phänomen ${open.thema} theoriegeleitet zu verorten.`,
        hintZH: "学术入题主旨句规范",
      });
    }
    return phrases;
  }, [open]);

  useEffect(() => {
    const qTrim = query.trim().toLowerCase();
    if (!qTrim) return;

    const matchingSubject = FAECHER.find(
      (f) =>
        f.id.toLowerCase() === qTrim ||
        f.kurz.toLowerCase() === qTrim ||
        f.nameDE.toLowerCase() === qTrim ||
        f.nameZH.toLowerCase() === qTrim
    );
    if (matchingSubject) {
      setFach(matchingSubject.id);
      onSubjectChange?.(matchingSubject.id);
      setPage(1);
      return;
    }

    const exactNote = shown.find(
      (n) => n.thema.toLowerCase() === qTrim || n.id.toLowerCase() === qTrim
    );
    if (exactNote) {
      setOpenId(exactNote.id);
      if (fach !== "alle" && fach.toLowerCase() !== exactNote.fach.toLowerCase()) {
        setFach(exactNote.fach);
        onSubjectChange?.(exactNote.fach);
      }
      return;
    }

    if (rankedIds.length > 0) {
      const topNote = shown.find((n) => n.id === rankedIds[0]);
      if (topNote) {
        setOpenId(topNote.id);
        const hasCurrentSubjectMatch = shown.some(
          (n) => n.fach.toLowerCase() === fach.toLowerCase() && rankedIds.includes(n.id)
        );
        if (fach !== "alle" && !hasCurrentSubjectMatch) {
          setFach(topNote.fach);
          onSubjectChange?.(topNote.fach);
        }
      }
    }
  }, [query, shown, rankedIds, fach, onSubjectChange]);

  const handleSelectNote = (id: string) => {
    setOpenId(id);
  };

  const handlePrevNote = () => {
    if (!open || list.length === 0) return;
    const curIdx = list.findIndex((n) => n.id === open.id);
    if (curIdx > 0) {
      const prevNote = list[curIdx - 1];
      setOpenId(prevNote.id);
      setPage(Math.floor((curIdx - 1) / pageSize) + 1);
    }
  };

  const handleNextNote = () => {
    if (!open || list.length === 0) return;
    const curIdx = list.findIndex((n) => n.id === open.id);
    if (curIdx >= 0 && curIdx < list.length - 1) {
      const nextNote = list[curIdx + 1];
      setOpenId(nextNote.id);
      setPage(Math.floor((curIdx + 1) / pageSize) + 1);
    }
  };

  // j/k + arrows walk the list; [ and ] switch pages
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping() || list.length === 0) return;

      if (e.key === "[" || e.key === "【") {
        e.preventDefault();
        setPage((p) => Math.max(1, p - 1));
        return;
      }
      if (e.key === "]" || e.key === "】") {
        e.preventDefault();
        setPage((p) => Math.min(Math.ceil(list.length / pageSize), p + 1));
        return;
      }

      const currentIndex = Math.max(0, list.findIndex((note) => note.id === open?.id));
      if (matchesKey(e, PER_MODULE_KEYS.library[0])) {
        e.preventDefault();
        const nextIdx = Math.min(currentIndex + 1, list.length - 1);
        setOpenId(list[nextIdx].id);
        setPage(Math.floor(nextIdx / pageSize) + 1);
      } else if (matchesKey(e, PER_MODULE_KEYS.library[1])) {
        e.preventDefault();
        const prevIdx = Math.max(currentIndex - 1, 0);
        setOpenId(list[prevIdx].id);
        setPage(Math.floor(prevIdx / pageSize) + 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [list, open, pageSize]);

  const currentNoteIndex = open ? list.findIndex((n) => n.id === open.id) : -1;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 xl:flex-row xl:gap-8">
      {/* Left Column: Sidebar with Filter & Paginated List */}
      <div className="w-full shrink-0 space-y-4 xl:w-80">
        {/* 10-Subject Filter Badges */}
        <div className="flex flex-wrap gap-1 border-b border-[var(--line)] pb-2">
          <button
            type="button"
            onClick={() => selectFach("alle")}
            className={`px-2 py-1 text-xs font-mono rounded-[var(--radius)] transition-all cursor-pointer ${
              fach === "alle"
                ? "font-medium text-[var(--accent)] border-b-2 border-[var(--accent)] bg-[var(--paper-subtle)]/40"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
            title="Alle Fächer / 全部学科"
          >
            Alle ({shown.length})
          </button>
          {FAECHER.map((f) => {
            const isSelected = fach === f.id;
            const count = fachCounts[f.id] ?? 0;
            return (
              <button
                type="button"
                key={f.id}
                onClick={() => selectFach(isSelected ? "alle" : f.id)}
                className={`px-1.5 py-0.5 text-xs font-mono rounded-[var(--radius)] transition-all cursor-pointer border ${
                  isSelected
                    ? "font-medium text-[var(--accent)] border-[var(--accent)] bg-[var(--paper-subtle)]/40"
                    : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                }`}
                title={`${f.nameDE} / ${f.nameZH} (${count} Notizen)`}
              >
                {f.kurz} <span className="text-[10px] opacity-75">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Faceted Filters Toolbar: AFB & Klausur & ViewMode */}
        <div className="flex flex-wrap items-center justify-between gap-1.5 text-xs font-mono">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setKlausurOnly(!klausurOnly)}
              className={`px-1.5 py-0.5 rounded-[var(--radius)] border transition-colors cursor-pointer ${
                klausurOnly
                  ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--paper)] font-bold"
                  : "border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title={lang === "de" ? "Nur Klausurrelevante" : "仅考纲考点"}
            >
              * Klausur
            </button>

            <div className="flex items-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-0.5">
              <button
                type="button"
                onClick={() => setFilterAfb("all")}
                className={`px-1.5 py-0.2 rounded-[var(--radius)] transition-colors cursor-pointer ${
                  filterAfb === "all"
                    ? "bg-[var(--paper)] text-[var(--ink)] font-bold"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setFilterAfb("afb1")}
                className={`px-1 py-0.2 rounded-[var(--radius)] transition-colors cursor-pointer ${
                  filterAfb === "afb1"
                    ? "bg-[var(--paper)] text-[var(--ink)] font-bold"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
                title="AFB I"
              >
                I
              </button>
              <button
                type="button"
                onClick={() => setFilterAfb("afb2")}
                className={`px-1 py-0.2 rounded-[var(--radius)] transition-colors cursor-pointer ${
                  filterAfb === "afb2"
                    ? "bg-[var(--paper)] text-[var(--ink)] font-bold"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
                title="AFB II"
              >
                II
              </button>
              <button
                type="button"
                onClick={() => setFilterAfb("afb3")}
                className={`px-1 py-0.2 rounded-[var(--radius)] transition-colors cursor-pointer ${
                  filterAfb === "afb3"
                    ? "bg-[var(--paper)] text-[var(--ink)] font-bold"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
                title="AFB III"
              >
                III
              </button>
            </div>
          </div>

        </div>

        {/* Active Search Filter */}
        {q && (
          <div className="flex items-center justify-between gap-2 border border-[var(--accent)]/40 bg-[var(--accent)]/5 px-2 py-1.5 rounded-[var(--radius)]">
            <span className="truncate font-mono text-[11px] text-[var(--accent)]">
              Filter: “{query.trim()}” · {list.length} Treffer
            </span>
            <button
              type="button"
              onClick={() => onClearQuery?.()}
              title="Suche löschen / 清除搜索"
              className="shrink-0 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--gray)] hover:border-[var(--accent)] hover:text-[var(--accent)] cursor-pointer"
            >
              x
            </button>
          </div>
        )}

        {/* Notes List (Paginated) */}
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] divide-y divide-[var(--line)] overflow-hidden">
          {paginatedList.length === 0 ? (
            <div className="p-4 text-xs font-sans text-[var(--gray)] text-center">
              Keine Notizen gefunden / 未找到相关笔记
            </div>
          ) : (
            paginatedList.map((n) => {
              const isSelected = open?.id === n.id;
              return (
                <button
                  type="button"
                  key={n.id}
                  onClick={() => handleSelectNote(n.id)}
                  className={`w-full p-3 text-left transition-colors block border-l-2 cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "border-l-[var(--accent)] bg-[var(--paper)]"
                      : "border-l-transparent hover:bg-[var(--paper)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--gray)] mb-1">
                    <span className="font-semibold text-[var(--accent)]">{n.fach}</span>
                    {n.klausurrelevant && (
                      <span className="text-[10px] text-[var(--accent)] border border-[var(--accent)]/40 px-1 rounded-[var(--radius)]">
                        Klausur
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-sm font-semibold text-[var(--ink)] break-words leading-snug">
                    {n.thema}
                  </div>
                  <div className="text-xs font-sans text-[var(--gray)] mt-0.5 break-words line-clamp-1">
                    {n.sub}
                  </div>
                  {n.operatoren.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {n.operatoren.map((op) => (
                        <span
                          key={op}
                          className="border border-[var(--line)] px-1 py-0.2 text-[10px] font-mono text-[var(--gray)] rounded-[var(--radius)]"
                        >
                          {op}
                        </span>
                      ))}
                    </div>
                  )}
                </button>
              );
            })
          )}
        </div>

        {/* Pagination bar */}
        <Pagination
          currentPage={page}
          totalItems={list.length}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          lang={lang}
          pageSizeOptions={[8, 12, 20]}
        />
      </div>

      {/* Right Column: Centered Reading Column (~46rem) */}
      <div className="flex-1 min-w-0">
        <div key={open?.id} className="tab-enter mx-auto max-w-[46rem] bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] p-5 sm:p-8">
          {open ? (
            <article>
              {/* Header Metadata with Next/Prev Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3 mb-4 text-xs font-mono text-[var(--gray)]">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="font-medium text-[var(--ink)]">{open.fach}</span>
                  {open.operatoren && open.operatoren.length > 0 && (
                    <span
                      className="border border-[var(--accent)]/40 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[var(--radius)] font-medium"
                      title="Anforderungsbereich nach NRW Kernlehrplan"
                    >
                      {getHighestAfb(open.operatoren)}
                    </span>
                  )}
                  <span>·</span>
                  <div className="flex flex-wrap gap-1.5">
                    {open.operatoren.map((op) => {
                      const info = getOperatorInfo(op);
                      return (
                        <button
                          key={op}
                          type="button"
                          onClick={() => setActiveOperatorTip((cur) => (cur === op ? null : op))}
                          className="border border-[var(--line)] px-1.5 py-0.5 text-[11px] text-[var(--gray)] rounded-sm"
                          style={activeOperatorTip === op ? { borderColor: "var(--accent)", color: "var(--accent)" } : undefined}
                          title={info ? `${info.afb}: ${info.definitionDe}` : op}
                        >
                          {op}
                        </button>
                      );
                    })}
                  </div>
                  {open.tags && open.tags.length > 0 && (
                    <>
                      <span>·</span>
                      <div className="flex flex-wrap gap-1">
                        {open.tags.map((tg) => (
                          <span
                            key={tg}
                            className="border border-[var(--line)] bg-[var(--paper)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--gray)] rounded-[var(--radius)]"
                          >
                            #{tg}
                          </span>
                        ))}
                      </div>
                    </>
                  )}
                  {open.klausurrelevant && (
                    <>
                      <span>·</span>
                      <span className="border border-[var(--accent)] text-[var(--accent)] text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-[var(--radius)]">
                        Klausurrelevant
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 border border-[var(--line)] bg-[var(--paper)] rounded-[var(--radius)] p-0.5 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setReadingMode("de-native")}
                      className={`px-2 py-0.5 rounded-[var(--radius)] transition-colors cursor-pointer ${
                        readingMode === "de-native"
                          ? "bg-[var(--surface)] text-[var(--accent)] font-semibold border border-[var(--line)]"
                          : "text-[var(--gray)] hover:text-[var(--ink)]"
                      }`}
                      title={lang === "de" ? "Schlanker Modus für deutsche Schüler (ohne chinesische Übersetzungen)" : "精简德语（适合本地高中生，无中文干扰）"}
                    >
                      {lang === "de" ? "DE rein" : "精简德语"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setReadingMode("bilingual")}
                      className={`px-2 py-0.5 rounded-[var(--radius)] transition-colors cursor-pointer ${
                        readingMode === "bilingual"
                          ? "bg-[var(--surface)] text-[var(--ink)] font-semibold border border-[var(--line)]"
                          : "text-[var(--gray)] hover:text-[var(--ink)]"
                      }`}
                      title={lang === "de" ? "Zweisprachiger Modus (DE + ZH)" : "中德双语（含中文理解与对比）"}
                    >
                      {lang === "de" ? "Bilingual" : "中德双语"}
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[11px] mr-1">
                      {currentNoteIndex >= 0 ? `${currentNoteIndex + 1}/${list.length}` : ""}
                    </span>
                    <button
                      type="button"
                      onClick={handlePrevNote}
                      disabled={currentNoteIndex <= 0}
                      className={`px-1.5 py-0.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] text-xs transition-colors ${
                        currentNoteIndex <= 0
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:border-[var(--ink)] cursor-pointer text-[var(--ink)]"
                      }`}
                      title="Vorherige (j/k)"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNextNote}
                      disabled={currentNoteIndex >= list.length - 1}
                      className={`px-1.5 py-0.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] text-xs transition-colors ${
                        currentNoteIndex >= list.length - 1
                          ? "opacity-30 cursor-not-allowed"
                          : "hover:border-[var(--ink)] cursor-pointer text-[var(--ink)]"
                      }`}
                      title="Nächste (j/k)"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>

              {activeOperatorTip && (() => {
                const opInfo = getOperatorInfo(activeOperatorTip);
                if (!opInfo) return null;
                return (
                  <div className="mb-4 p-3 rounded-[var(--radius)] border border-[var(--accent)]/30 bg-[var(--paper-subtle)] text-xs font-mono space-y-1">
                    <div className="flex items-center justify-between text-[var(--ink)]">
                      <span className="font-bold uppercase tracking-wider text-[var(--accent)]">
                        Operator: {opInfo.operator} ({opInfo.afb})
                      </span>
                      <button
                        type="button"
                        onClick={() => setActiveOperatorTip(null)}
                        className="text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer px-1 font-mono text-xs"
                        aria-label="Schließen"
                      >
                        x
                      </button>
                    </div>
                    <p className="text-[var(--ink)] font-sans text-xs">
                      {lang === "de" ? opInfo.definitionDe : `${opInfo.definitionDe} · ${opInfo.definitionZh}`}
                    </p>
                    <div className="text-[11px] text-[var(--accent)] pt-1">
                      Klausur-Tipp: {opInfo.klausurTippDe}
                    </div>
                  </div>
                );
              })()}

              {/* Title & source line */}
              <h1 className="font-serif text-2xl font-normal text-[var(--ink)] tracking-tight mb-1 break-words">
                {open.thema}
              </h1>
              <p className="font-sans text-sm text-[var(--gray)] mb-6 pb-4 border-b border-[var(--line)] break-words">
                {open.sub}
              </p>

              {/* Klausur-Fokus Action Toolbar */}
              <div className="mb-6 p-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] flex flex-wrap items-center justify-between gap-2.5">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-mono text-[10px] font-bold text-[var(--accent)] uppercase tracking-wider">
                    {lang === "de" ? "Prüfungsfokus" : "考点穿透"}
                  </span>
                  <span className="text-[var(--gray)]">·</span>
                  <span className="text-[var(--ink)] font-sans text-xs">
                    {open.fach} · {getHighestAfb(open.operatoren)}
                  </span>
                  {linkedCards.length > 0 && (
                    <span className="text-[var(--gray)] font-mono text-[11px]">
                      ({linkedCards.length} {lang === "de" ? "Karten" : "关联卡片"})
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {onNavigateToTab && (
                    <button
                      type="button"
                      onClick={() =>
                        onNavigateToTab("klausursim", {
                          fach: open.fach,
                          query: open.thema,
                          noteId: open.id,
                        })
                      }
                      className="px-2.5 py-1 rounded-[var(--radius)] text-xs font-mono font-medium border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-[var(--paper)] transition-all cursor-pointer flex items-center gap-1.5"
                      title={lang === "de" ? "In Vollsimulation üben" : "在会考模拟中实战演练"}
                    >
                      <span>[In KlausurSim üben -&gt;]</span>
                    </button>
                  )}
                  {onNavigateToTab && (
                    <button
                      type="button"
                      onClick={() => onNavigateToTab("flashcards", { fach: open.fach })}
                      className="px-2.5 py-1 rounded-[var(--radius)] text-xs font-mono border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)] transition-all cursor-pointer"
                      title={lang === "de" ? "Im Vokabeltrainer drillen" : "在抽认卡中攻坚术语"}
                    >
                      <span>{lang === "de" ? "Karten drillen" : "抽认卡攻坚"}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowPracticePanel((v) => !v)}
                    className="px-2 py-1 rounded-[var(--radius)] text-xs font-mono border border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)] transition-all cursor-pointer"
                  >
                    {showPracticePanel
                      ? (lang === "de" ? "Werkzeuge verbergen" : "收起练习工具")
                      : (lang === "de" ? "Werkzeuge anzeigen" : "展开配套练习")}
                  </button>
                </div>
              </div>

              <Blocks blocks={open.blocks} pureGerman={readingMode === "de-native"} />

              {/* Begleitende Klausurpraxis & Veredelung (Contextual Practice & Flashcard Consolidation) */}
              {showPracticePanel && (
                <section className="mt-8 pt-6 border-t border-[var(--line)] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-serif text-base font-semibold text-[var(--ink)]">
                        {lang === "de" ? "Begleitende Klausurpraxis & Veredelung" : "配套考点攻坚与学术句型"}
                      </h2>
                      <p className="text-xs text-[var(--gray)] mt-0.5">
                        {lang === "de"
                          ? "Verknüpfte Lernkarten und offizielle Abitur-Satzbausteine zu diesem Thema."
                          : "针对本考点关联的德语核心卡片与 15 NP 学术表达模板。"}
                      </p>
                    </div>
                    {onNavigateToTab && (
                      <button
                        type="button"
                        onClick={() =>
                          onNavigateToTab("klausursim", {
                            fach: open.fach,
                            query: open.thema,
                            noteId: open.id,
                          })
                        }
                        className="font-mono text-xs text-[var(--accent)] hover:underline cursor-pointer"
                      >
                        {lang === "de" ? "Zur Vollsimulation ->" : "直达全真模拟 ->"}
                      </button>
                    )}
                  </div>

                  {/* 1. Verknüpfte Lernkarten */}
                  {linkedCards.length > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono font-medium text-[var(--ink)]">
                        <span>{lang === "de" ? "Verknüpfte Begriffskarten (Klicken zum Aufdecken)" : "关联核心卡片 (点击翻转查看释义)"}</span>
                        {onNavigateToTab && (
                          <button
                            type="button"
                            onClick={() => onNavigateToTab("flashcards", { fach: open.fach })}
                            className="text-[11px] text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                          >
                            {lang === "de" ? "Alle Fachkarten üben ->" : "查看全部学科卡片 ->"}
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {linkedCards.map((cardItem) => {
                          const isRevealed = revealedCardId === cardItem.id;
                          return (
                            <button
                              key={cardItem.id}
                              type="button"
                              onClick={() => setRevealedCardId(isRevealed ? null : cardItem.id)}
                              className="p-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] text-left hover:border-[var(--ink)] transition-colors cursor-pointer space-y-1 block w-full"
                            >
                              <div className="flex items-center justify-between text-[10px] font-mono text-[var(--gray)]">
                                <span>{cardItem.fach}</span>
                                <span className="text-[var(--accent)] font-semibold">
                                  {isRevealed ? "[Definition]" : "[Aufdecken]"}
                                </span>
                              </div>
                              <div className="font-serif text-xs font-semibold text-[var(--ink)] leading-snug">
                                {cardItem.front}
                              </div>
                              {isRevealed ? (
                                <div className="text-xs font-sans text-[var(--ink)] pt-1 border-t border-[var(--line)] leading-relaxed">
                                  {cardItem.back}
                                </div>
                              ) : (
                                <div className="text-[11px] font-sans text-[var(--gray)] line-clamp-1">
                                  {cardItem.example || "Klicken zum Einblenden"}
                                </div>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 2. 15 NP Akademische Klausur-Satzbausteine */}
                  <div className="p-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-[var(--ink)]">
                        {lang === "de" ? "15-Notenpunkte Satzbausteine (EHZ-Muster)" : "15 NP 满分学术句型 (官方 EHZ 采分句式)"}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--accent)] font-bold uppercase">
                        {open.operatoren.join(" · ") || "Operatoren"}
                      </span>
                    </div>
                    <div className="space-y-2">
                      {operatorPhrases.map((phrase, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded bg-[var(--paper-subtle)] border border-[var(--line)] space-y-1 text-xs"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-semibold text-[11px] text-[var(--accent)]">
                              {phrase.op}
                            </span>
                            <span className="text-[11px] text-[var(--gray)] font-sans">
                              {phrase.hintZH}
                            </span>
                          </div>
                          <p className="font-serif text-xs text-[var(--ink)] leading-relaxed selection:bg-[var(--accent)] selection:text-[var(--paper)]">
                            „{phrase.phraseDE}“
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>
              )}
            </article>
          ) : (
            <div className="py-12 text-center text-sm font-sans text-[var(--gray)]">
              Keine Treffer / 无结果
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
