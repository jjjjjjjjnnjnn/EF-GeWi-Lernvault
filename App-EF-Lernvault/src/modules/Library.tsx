import { useEffect, useMemo, useState } from "react";
import { notes as mockNotes, type Note as MockNote } from "../data";
import { PER_MODULE_KEYS, isTyping, matchesKey } from "../keys";
import Blocks from "../components/Blocks";
import type { Block, VaultNote } from "../vault/parser";
import { buildSearchIndex } from "../engine/index";
import { MasteryEngine } from "../engine/mastery";
import { FAECHER } from "../fach";
import { Pagination } from "../components/Pagination";
import type { Lang } from "../i18n";

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

interface LibraryProps {
  query: string;
  vault: VaultNote[] | null;
  selectedFach?: string;
  selectedNoteId?: string;
  onClearQuery?: () => void;
  onSubjectChange?: (fach: string) => void;
  lang?: Lang;
}

export default function Library({
  query,
  vault,
  selectedFach,
  selectedNoteId,
  onClearQuery,
  onSubjectChange,
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
    if (viewMode === "gallery") {
      setViewMode("split");
    }
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
                  <span>·</span>
                  <div className="flex flex-wrap gap-1.5">
                    {open.operatoren.map((op) => (
                      <span
                        key={op}
                        className="border border-[var(--line)] px-1.5 py-0.5 text-[11px] text-[var(--gray)] rounded-sm"
                      >
                        {op}
                      </span>
                    ))}
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

              {/* Title & source line */}
              <h1 className="font-serif text-2xl font-normal text-[var(--ink)] tracking-tight mb-1 break-words">
                {open.thema}
              </h1>
              <p className="font-sans text-sm text-[var(--gray)] mb-6 pb-4 border-b border-[var(--line)] break-words">
                {open.sub}
              </p>

              <Blocks blocks={open.blocks} />
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
