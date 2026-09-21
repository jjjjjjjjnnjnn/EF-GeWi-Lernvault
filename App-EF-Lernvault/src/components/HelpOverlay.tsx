import { useEffect } from "react";
import { GLOBAL_SHORTCUTS, CARD_SHORTCUTS, QUIZ_SHORTCUTS, LIBRARY_SHORTCUTS, REISE_SHORTCUTS, type Shortcut } from "../keys";
import type { Lang } from "../i18n";

function Rows({ rows, lang }: { rows: Shortcut[]; lang: Lang }) {
  return (
    <div className="divide-y divide-[#E5E1D8]/70">
      {rows.map((s) => (
        <div key={s.keys} className="flex items-center justify-between py-1.5">
          <span className="font-sans text-sm text-[#1C1B17]">{lang === "de" ? s.de : s.zh}</span>
          <kbd className="border border-[#E5E1D8] bg-white px-1.5 py-0.5 font-mono text-[11px] text-[#6B675C]">
            {s.keys}
          </kbd>
        </div>
      ))}
    </div>
  );
}

export default function HelpOverlay({
  open,
  onClose,
  lang,
}: {
  open: boolean;
  onClose: () => void;
  lang: Lang;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1B17]/20" onClick={onClose}>
      <div
        className="palette-enter max-h-[80vh] w-full max-w-lg overflow-y-auto border border-[#E5E1D8] bg-[#FAFAF7] p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Tastaturhilfe / 快捷键帮助"
      >
        <h2 className="mb-4 font-serif text-xl text-[#1C1B17]">
          {lang === "de" ? "Tastaturkürzel" : "快捷键"}
        </h2>
        <h3 className="mb-1 font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">Global / 全局</h3>
        <Rows rows={GLOBAL_SHORTCUTS} lang={lang} />
        <h3 className="mb-1 mt-4 font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">Karteikarten / 背卡</h3>
        <Rows rows={CARD_SHORTCUTS} lang={lang} />
        <h3 className="mb-1 mt-4 font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">Quiz / 刷题</h3>
        <Rows rows={QUIZ_SHORTCUTS} lang={lang} />
        <h3 className="mb-1 mt-4 font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">Bibliothek / 笔记库</h3>
        <Rows rows={LIBRARY_SHORTCUTS} lang={lang} />
        <h3 className="mb-1 mt-4 font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">Lernreise / 互动旅程</h3>
        <Rows rows={REISE_SHORTCUTS} lang={lang} />
      </div>
    </div>
  );
}
