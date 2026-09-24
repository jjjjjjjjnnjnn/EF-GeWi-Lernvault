import { useEffect, useMemo, useState } from "react";
import { notes as mockNotes, type Note as MockNote } from "../data";
import { PER_MODULE_KEYS, isTyping, matchesKey } from "../keys";
import Blocks from "../components/Blocks";
import type { Block, VaultNote } from "../vault/parser";
import { buildSearchIndex } from "../engine/index";
import { MasteryEngine } from "../engine/mastery";
import { FAECHER } from "../fach";

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
  return { id: m.id, fach: m.fach, thema: m.thema, sub: m.zh, operatoren: m.operatoren, klausurrelevant: true, datum: "", tags: [], blocks };
}

function fromVault(n: VaultNote): Shown {
  return { id: n.id, fach: n.fach, thema: n.thema, sub: n.path, operatoren: n.operatoren, klausurrelevant: n.klausurrelevant, datum: n.datum, tags: n.tags, blocks: n.blocks };
}

interface LibraryProps {
  query: string;
  vault: VaultNote[] | null;
  selectedFach?: string;
  selectedNoteId?: string;
  onClearQuery?: () => void;
  onSubjectChange?: (fach: string) => void;
}

export default function Library({ query, vault, selectedFach, selectedNoteId, onClearQuery, onSubjectChange }: LibraryProps) {
  const shown: Shown[] = useMemo(
    () => (vault ? vault.map(fromVault) : mockNotes.map(fromMock)),
    [vault]
  );
  const [fach, setFach] = useState(selectedFach ?? "alle");
  const [openId, setOpenId] = useState(shown[0]?.id ?? "");
  const [masteryEngine] = useState(() => new MasteryEngine());

  // Subject counts for the 10-Fach badge system
  const fachCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    FAECHER.forEach((f) => {
      counts[f.id] = shown.filter((n) => n.fach === f.id).length;
    });
    return counts;
  }, [shown]);

  useEffect(() => {
    if (selectedFach) setFach(selectedFach);
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
    onSubjectChange?.(nextFach);
  };

  // Reset selection when the source switches (mock <-> real vault).
  useEffect(() => {
    setOpenId(shown[0]?.id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault]);

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
  const list = useMemo(() => {
    const byId = new Map(shown.map((note) => [note.id, note]));
    return rankedIds
      .map((id) => byId.get(id))
      .filter((note): note is Shown => {
        if (!note) return false;
        return fach === "alle" || note.fach === fach;
      });
  }, [rankedIds, shown, fach]);

  const open =
    list.find((n) => n.id === openId) ??
    shown.find((n) => n.id === openId) ??
    list[0];

  useEffect(() => {
    const qTrim = query.trim().toLowerCase();
    if (!qTrim) return;

    // 1. If query is an exact subject name (e.g. from clicking subject node in Mindmap)
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
      return;
    }

    // 2. If query matches a note's thema or id
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

    // 3. If query returns ranked results and the current subject has 0 matches:
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

  // j/k + arrows walk the filtered list (when search input is not focused).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping() || list.length === 0) return;
      const currentIndex = Math.max(0, list.findIndex((note) => note.id === open?.id));
      if (matchesKey(e, PER_MODULE_KEYS.library[0])) {
        e.preventDefault();
        setOpenId(list[Math.min(currentIndex + 1, list.length - 1)].id);
      } else if (matchesKey(e, PER_MODULE_KEYS.library[1])) {
        e.preventDefault();
        setOpenId(list[Math.max(currentIndex - 1, 0)].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 xl:flex-row xl:gap-8">
      {/* Left Column: Subject Filter + Topic List */}
      <div className="w-full shrink-0 space-y-4 xl:w-80">
        {/* 10-Subject Filter Badges (Tufte hairline badges + counts) */}
        <div className="flex flex-wrap gap-1 border-b border-[var(--line)] pb-2">
          <button
            onClick={() => selectFach("alle")}
            className={`px-2 py-1 text-xs font-mono rounded-sm transition-all duration-150 active:scale-95 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--focus)] ${
              fach === "alle"
                ? "font-medium text-[var(--accent)] border-b-2 border-[var(--accent)]"
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
                key={f.id}
                onClick={() => selectFach(isSelected ? "alle" : f.id)}
                className={`px-1.5 py-0.5 text-xs font-mono rounded-sm transition-all duration-150 active:scale-95 border ${
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

        {/* Aktiver Suchfilter: sichtbar + ein Klick zum Löschen.
            (Früher filterte eine vergessene Suche aus Palette/Zitaten die
            Liste unsichtbar — „Alle (4), aber nur 1 Karte".) */}
        {q && (
          <div className="flex items-center justify-between gap-2 border border-[var(--accent)]/40 bg-[var(--accent)]/5 px-2 py-1.5 rounded-sm">
            <span className="truncate font-mono text-[11px] text-[var(--accent)]">
              Filter: “{query.trim()}” · {list.length} Treffer
            </span>
            <button
              onClick={() => onClearQuery?.()}
              title="Suche löschen / 清除搜索"
              className="shrink-0 rounded-sm border border-[var(--line)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[11px] text-[var(--gray)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              ×
            </button>
          </div>
        )}

        {/* Notes List */}
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-sm divide-y divide-[var(--line)]">
          {list.length === 0 ? (
            <div className="p-4 text-xs font-sans text-[var(--gray)]">
              Keine Notizen gefunden / 未找到相关笔记
            </div>
          ) : (
            list.map((n) => {
              const isSelected = open?.id === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setOpenId(n.id)}
                  className={`w-full p-3 text-left transition-colors block border-l-2 active:bg-[var(--paper-subtle)]/50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--focus)] ${
                    isSelected
                      ? "border-l-[var(--accent)] bg-[var(--paper)]"
                      : "border-l-transparent hover:bg-[var(--paper)]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--gray)] mb-1">
                    <span>{n.fach}</span>
                    {n.klausurrelevant && (
                      <span className="text-[10px] text-[var(--accent)] border border-[var(--accent)]/40 px-1 rounded-sm">
                        Klausur
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-sm font-semibold text-[var(--ink)] break-words leading-snug">
                    {n.thema}
                  </div>
                  <div className="text-xs font-sans text-[var(--gray)] mt-0.5 break-words">
                    {n.sub}
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Centered Reading Column (~46rem) */}
      <div className="flex-1 min-w-0">
        <div key={open?.id} className="tab-enter mx-auto max-w-[46rem] bg-[var(--surface)] border border-[var(--line)] rounded-sm p-5 sm:p-8">
          {open ? (
            <article>
              {/* Header Metadata */}
              <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono text-[var(--gray)]">
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
                {open.klausurrelevant && (
                  <>
                    <span>·</span>
                    <span className="border border-[var(--accent)] text-[var(--accent)] text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm">
                      Klausurrelevant
                    </span>
                  </>
                )}
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
