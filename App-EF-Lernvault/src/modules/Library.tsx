import { useEffect, useMemo, useState } from "react";
import { notes as mockNotes, type Note as MockNote } from "../data";
import { isTyping } from "../keys";
import Blocks from "../components/Blocks";
import type { Block, VaultNote } from "../vault/parser";
import { buildSearchIndex } from "../engine/index";
import { FAECHER } from "../fach";

interface Shown {
  id: string;
  fach: string;
  thema: string;
  sub: string;
  operatoren: string[];
  klausurrelevant: boolean;
  blocks: Block[];
}

function fromMock(m: MockNote): Shown {
  const blocks: Block[] = [];
  m.bodyZH.forEach((z, i) => {
    blocks.push({ kind: "p", text: z, lang: "zh" });
    if (m.bodyDE[i]) blocks.push({ kind: "p", text: m.bodyDE[i], lang: "de" });
  });
  return { id: m.id, fach: m.fach, thema: m.thema, sub: m.zh, operatoren: m.operatoren, klausurrelevant: true, blocks };
}

function fromVault(n: VaultNote): Shown {
  return { id: n.id, fach: n.fach, thema: n.thema, sub: n.path, operatoren: n.operatoren, klausurrelevant: n.klausurrelevant, blocks: n.blocks };
}

export default function Library({ query, vault, selectedFach, onClearQuery }: { query: string; vault: VaultNote[] | null; selectedFach?: string; onClearQuery?: () => void }) {
  const shown: Shown[] = useMemo(
    () => (vault ? vault.map(fromVault) : mockNotes.map(fromMock)),
    [vault]
  );
  const [fach, setFach] = useState(selectedFach ?? "alle");
  const [openId, setOpenId] = useState(shown[0]?.id ?? "");

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

  // Reset selection when the source switches (mock <-> real vault).
  useEffect(() => {
    setOpenId(shown[0]?.id ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vault]);

  const q = query.trim().toLowerCase();
  // Einheitliche retrieval-schicht (engine/index): exakt zuerst, fuzzy fallback.
  const searchIndex = useMemo(
    () =>
      buildSearchIndex(
        shown.map((n) => ({
          id: n.id,
          thema: n.thema,
          sub: n.sub,
          text: n.blocks.map((b) => b.text).join(" "),
        }))
      ),
    [shown]
  );
  const hitIds = useMemo(() => new Set(searchIndex.query(query)), [searchIndex, query]);
  const list = shown.filter((n) => (fach === "alle" || n.fach === fach) && (!q || hitIds.has(n.id)));

  const open = list.find((n) => n.id === openId) ?? list[0];

  // j/k + arrows walk the filtered list (when search input is not focused).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isTyping() || list.length === 0) return;
      const i = Math.max(0, list.findIndex((n) => n.id === open?.id));
      if (e.key === "j" || e.key === "ArrowDown") {
        e.preventDefault();
        setOpenId(list[Math.min(i + 1, list.length - 1)].id);
      } else if (e.key === "k" || e.key === "ArrowUp") {
        e.preventDefault();
        setOpenId(list[Math.max(i - 1, 0)].id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div className="flex gap-8 max-w-6xl mx-auto">
      {/* Left Column: Subject Filter + Topic List */}
      <div className="w-80 shrink-0 space-y-4">
        {/* 10-Subject Filter Badges (Tufte hairline badges + counts) */}
        <div className="flex flex-wrap gap-1 border-b border-[#E5E1D8] pb-2">
          <button
            onClick={() => setFach("alle")}
            className={`px-2 py-1 text-xs font-mono rounded-sm transition-all duration-150 active:scale-95 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#4338CA] ${
              fach === "alle"
                ? "font-medium text-[#4338CA] border-b-2 border-[#4338CA]"
                : "text-[#6B675C] hover:text-[#1C1B17]"
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
                onClick={() => setFach(isSelected ? "alle" : f.id)}
                className={`px-1.5 py-0.5 text-xs font-mono rounded-sm transition-all duration-150 active:scale-95 border ${
                  isSelected
                    ? "font-medium text-[#4338CA] border-[#4338CA] bg-[#ECE7DC]/40"
                    : "border-[#E5E1D8] text-[#6B675C] hover:text-[#1C1B17] hover:border-[#1C1B17]"
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
          <div className="flex items-center justify-between gap-2 border border-[#4338CA]/40 bg-[#4338CA]/5 px-2 py-1.5 rounded-sm">
            <span className="truncate font-mono text-[11px] text-[#4338CA]">
              Filter: “{query.trim()}” · {list.length} Treffer
            </span>
            <button
              onClick={() => onClearQuery?.()}
              title="Suche löschen / 清除搜索"
              className="shrink-0 rounded-sm border border-[#E5E1D8] bg-white px-1.5 py-0.5 font-mono text-[11px] text-[#6B675C] hover:border-[#4338CA] hover:text-[#4338CA]"
            >
              ×
            </button>
          </div>
        )}

        {/* Notes List */}
        <div className="border border-[#E5E1D8] bg-white rounded-sm divide-y divide-[#E5E1D8]">
          {list.length === 0 ? (
            <div className="p-4 text-xs font-sans text-[#6B675C]">
              Keine Notizen gefunden / 未找到相关笔记
            </div>
          ) : (
            list.map((n) => {
              const isSelected = open?.id === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setOpenId(n.id)}
                  className={`w-full p-3 text-left transition-colors block border-l-2 active:bg-[#ECE7DC]/50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#4338CA] ${
                    isSelected
                      ? "border-l-[#4338CA] bg-[#FAF9F6]"
                      : "border-l-transparent hover:bg-[#FAF9F6]"
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#6B675C] mb-1">
                    <span>{n.fach}</span>
                    {n.klausurrelevant && (
                      <span className="text-[10px] text-[#4338CA] border border-[#4338CA]/40 px-1 rounded-sm">
                        Klausur
                      </span>
                    )}
                  </div>
                  <div className="font-serif text-sm font-semibold text-[#1C1B17] break-words leading-snug">
                    {n.thema}
                  </div>
                  <div className="text-xs font-sans text-[#6B675C] mt-0.5 break-words">
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
        <div key={open?.id} className="tab-enter max-w-[46rem] bg-white border border-[#E5E1D8] rounded-sm p-8 mx-auto">
          {open ? (
            <article>
              {/* Header Metadata */}
              <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono text-[#6B675C]">
                <span className="font-medium text-[#1C1B17]">{open.fach}</span>
                <span>·</span>
                <div className="flex flex-wrap gap-1.5">
                  {open.operatoren.map((op) => (
                    <span
                      key={op}
                      className="border border-[#E5E1D8] px-1.5 py-0.5 text-[11px] text-[#6B675C] rounded-sm"
                    >
                      {op}
                    </span>
                  ))}
                </div>
                {open.klausurrelevant && (
                  <>
                    <span>·</span>
                    <span className="border border-[#4338CA] text-[#4338CA] text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-sm">
                      Klausurrelevant
                    </span>
                  </>
                )}
              </div>

              {/* Title & source line */}
              <h1 className="font-serif text-2xl font-normal text-[#1C1B17] tracking-tight mb-1 break-words">
                {open.thema}
              </h1>
              <p className="font-sans text-sm text-[#6B675C] mb-6 pb-4 border-b border-[#E5E1D8] break-words">
                {open.sub}
              </p>

              <Blocks blocks={open.blocks} />
            </article>
          ) : (
            <div className="py-12 text-center text-sm font-sans text-[#6B675C]">
              Keine Treffer / 无结果
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
