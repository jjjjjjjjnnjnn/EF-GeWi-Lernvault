import { useEffect, useMemo, useRef, useState } from "react";

export interface PaletteItem {
  id: string;
  group: string;
  label: string;
  sub?: string;
  hint?: string;
  run: () => void;
}

export default function Palette({
  open,
  onClose,
  items,
}: {
  open: boolean;
  onClose: () => void;
  items: PaletteItem[];
}) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter(
      (i) =>
        i.label.toLowerCase().includes(s) ||
        (i.sub ?? "").toLowerCase().includes(s) ||
        i.group.toLowerCase().includes(s)
    );
  }, [q, items]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open ]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(a + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(a - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[active];
        if (item) {
          onClose();
          item.run();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, active, onClose]);

  if (!open) return null;
  let lastGroup = "";
  return (
    <div
      className="fixed inset-0 z-50 flex justify-center bg-[#1C1B17]/20 pt-[14vh]"
      onClick={onClose}
    >
      <div
        className="palette-enter h-fit w-full max-w-xl border border-[#E5E1D8] bg-[#FAFAF7]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Befehlspalette / 命令面板"
      >
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Befehl oder Notiz suchen… / 搜索命令或笔记…"
          className="w-full border-b border-[#E5E1D8] bg-transparent px-4 py-3 font-sans text-sm text-[#1C1B17] placeholder:text-[#6B675C] focus:outline-none"
        />
        <div className="max-h-80 overflow-y-auto py-1">
          {filtered.map((item, i) => {
            const head =
              item.group !== lastGroup ? (
                <div className="px-4 pb-1 pt-2 font-mono text-[11px] uppercase tracking-wider text-[#6B675C]">
                  {item.group}
                </div>
              ) : null;
            lastGroup = item.group;
            return (
              <div key={item.id}>
                {head}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    item.run();
                  }}
                  onMouseEnter={() => setActive(i)}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left ${
                    i === active ? "bg-[#ECE7DC]/50" : ""
                  }`}
                >
                  <span>
                    <span className="block font-sans text-sm text-[#1C1B17]">{item.label}</span>
                    {item.sub && <span className="block font-sans text-xs text-[#6B675C]">{item.sub}</span>}
                  </span>
                  {item.hint && <span className="font-mono text-[11px] text-[#6B675C]">{item.hint}</span>}
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center font-sans text-sm text-[#6B675C]">
              Keine Treffer / 无结果
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
