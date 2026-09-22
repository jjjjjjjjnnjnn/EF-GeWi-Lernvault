import { useMemo } from "react";
import { notes as mockNotes } from "../data";
import { getFach } from "../fach";
import type { VaultNote } from "../vault/parser";
import type { Lang } from "../i18n";

interface MindmapNote {
  id: string;
  fach: string;
  thema: string;
  sub: string;
  operatoren: string[];
}

export default function Mindmap({
  lang = "zh",
  vaultNotes = null,
  onJumpToLibrary,
}: {
  lang?: Lang;
  vaultNotes?: VaultNote[] | null;
  onJumpToLibrary?: (query: string) => void;
}) {

  const notesList: MindmapNote[] = useMemo(() => {
    if (vaultNotes && vaultNotes.length > 0) {
      return vaultNotes.map((n) => ({
        id: n.id,
        fach: n.fach,
        thema: n.thema,
        sub: n.path,
        operatoren: n.operatoren,
      }));
    }
    return mockNotes.map((m) => ({
      id: m.id,
      fach: m.fach,
      thema: m.thema,
      sub: m.zh,
      operatoren: m.operatoren,
    }));
  }, [vaultNotes]);

  // Group notes by Fach
  const grouped = useMemo(() => {
    const map = new Map<string, MindmapNote[]>();
    for (const n of notesList) {
      const list = map.get(n.fach) || [];
      list.push(n);
      map.set(n.fach, list);
    }
    return map;
  }, [notesList]);

  if (notesList.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center font-sans text-sm text-[#6B675C]">
        Keine Themen gefunden / 暂无知识树节点 — oben „Vault öffnen“ / 点顶部"打开知识库"
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-3">
        <div>
          <h2 className="font-serif text-xl font-normal text-[#1C1B17]">
            {lang === "de" ? "Wissensnetzwerk · Gymnasium EF" : "学科知识网络 · 高中阶段 (EF)"}
          </h2>
          <p className="font-sans text-xs text-[#6B675C] mt-0.5">
            {lang === "de"
              ? "Fach-Hierarchie aus Notiz-Struktur. Klick auf Thema öffnet Notiz in der Bibliothek."
              : "基于知识库笔记层级自动生成。点击任意主题节点直接跳转笔记库搜索。"}
          </p>
        </div>
        <div className="font-mono text-xs text-[#6B675C]">
          {grouped.size} Fächer · {notesList.length} Themen
        </div>
      </div>

      {/* Mindmap Subject Branches */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from(grouped.entries()).map(([fachName, themen]) => {
          const fachInfo = getFach(fachName);
          const kurz = fachInfo?.kurz || fachName.slice(0, 2).toUpperCase();
          const fullName =
            lang === "de"
              ? fachInfo?.nameDE || fachName
              : fachInfo?.nameZH || fachName;

          return (
            <div
              key={fachName}
              className="border border-[#E5E1D8] bg-white rounded-sm p-4 space-y-3"
            >
              {/* Root Subject Badge */}
              <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-sm border border-[#4338CA]/30 text-[#4338CA] bg-[#4338CA]/5">
                    {kurz}
                  </span>
                  <span className="font-serif text-base font-normal text-[#1C1B17]">
                    {fullName}
                  </span>
                </div>
                <span className="font-mono text-[10px] text-[#6B675C]">
                  {themen.length} Notizen
                </span>
              </div>

              {/* Branch Lines and Thema Leaf Nodes */}
              <div className="pl-3 border-l-2 border-[#E5E1D8] space-y-2.5 py-1">
                {themen.map((item) => (
                  <div key={item.id} className="relative flex items-center gap-2">
                    {/* Horizontal connector hairline */}
                    <div className="w-3 h-px bg-[#E5E1D8] -ml-3" />

                    <button
                      type="button"
                      onClick={() => onJumpToLibrary?.(item.thema)}
                      title={
                        lang === "de"
                          ? `In Bibliothek öffnen: ${item.thema}`
                          : `跳转笔记库: ${item.thema}`
                      }
                      className="group flex-1 flex items-center justify-between p-2.5 rounded-sm border border-[#E5E1D8] bg-[#FAF9F6] hover:border-[#4338CA] hover:bg-white active:scale-[0.98] transition-all text-left cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-serif text-sm font-normal text-[#1C1B17] group-hover:text-[#4338CA] transition-colors truncate">
                          {item.thema}
                        </div>
                        {item.sub && (
                          <div className="font-sans text-[11px] text-[#6B675C] truncate mt-0.2">
                            {item.sub}
                          </div>
                        )}
                      </div>

                      {item.operatoren.length > 0 && (
                        <div className="hidden sm:flex gap-1 shrink-0">
                          {item.operatoren.slice(0, 2).map((op) => (
                            <span
                              key={op}
                              className="font-mono text-[9px] uppercase text-[#6B675C] border border-[#E5E1D8] px-1 py-0.2 rounded-sm bg-white"
                            >
                              {op}
                            </span>
                          ))}
                        </div>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer hint */}
      <div className="border-t border-[#E5E1D8] pt-3 flex items-center justify-between text-xs font-mono text-[#6B675C]">
        <span>Struktur: Fach (Wurzel) → Thema (Blatt) / 学科（根）→ 主题（叶）</span>
        <span>Direktsprung zur Bibliothek aktiv</span>
      </div>
    </div>
  );
}
