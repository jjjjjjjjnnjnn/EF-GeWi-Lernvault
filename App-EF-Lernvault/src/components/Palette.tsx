import { useEffect, useMemo, useRef, useState } from "react";
import { MODULE_KEYS } from "../keys";
import { useDialogFocus } from "./HelpOverlay";

export interface PaletteItem {
  id: string;
  group: string;
  label: string;
  sub?: string;
  hint?: string;
  shortcutId?: string;
  run: () => void;
}

export default function Palette({ open, onClose, items }: { open: boolean; onClose: () => void; items: PaletteItem[] }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useDialogFocus(open, onClose);

  const filtered = useMemo(() => {
    const search = q.trim().toLowerCase();
    if (!search) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(search) ||
        (item.sub ?? "").toLowerCase().includes(search) ||
        item.group.toLowerCase().includes(search)
    );
  }, [q, items]);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
    }
  }, [open]);

  useEffect(() => setActive(0), [q]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive((current) => Math.min(current + 1, filtered.length - 1));
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive((current) => Math.max(current - 1, 0));
      } else if (event.key === "Enter") {
        event.preventDefault();
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
      className="fixed inset-0 z-50 flex justify-center bg-[var(--overlay)] pt-[14vh]"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="palette-enter h-fit w-full max-w-xl rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]"
        role="dialog"
        aria-modal="true"
        aria-label="Befehlspalette / 命令面板"
        tabIndex={-1}
      >
        <input
          ref={inputRef}
          data-dialog-initial-focus
          value={q}
          onChange={(event) => setQ(event.target.value)}
          placeholder="Befehl oder Notiz suchen… / 搜索命令或笔记…"
          className="w-full border-b border-[var(--line)] bg-transparent px-4 py-3 font-sans text-sm text-[var(--ink)] placeholder:text-[var(--gray)]"
        />
        <div className="max-h-80 overflow-y-auto py-1">
          {filtered.map((item, index) => {
            const shortcut = item.shortcutId
              ? MODULE_KEYS.find((binding) => binding.id === item.shortcutId)
              : undefined;
            const hint = shortcut?.altHint ?? item.hint;
            const heading =
              item.group !== lastGroup ? (
                <div className="px-4 pb-1 pt-2 font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
                  {item.group}
                </div>
              ) : null;
            lastGroup = item.group;
            return (
              <div key={item.id}>
                {heading}
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    item.run();
                  }}
                  onMouseEnter={() => setActive(index)}
                  aria-current={index === active ? "true" : undefined}
                  className={`flex w-full items-center justify-between px-4 py-2 text-left ${
                    index === active ? "bg-[var(--paper-subtle)]" : ""
                  }`}
                >
                  <span>
                    <span className="block font-sans text-sm text-[var(--ink)]">{item.label}</span>
                    {item.sub && <span className="block font-sans text-xs text-[var(--gray)]">{item.sub}</span>}
                  </span>
                  {hint && <span className="font-mono text-[var(--text-meta)] text-[var(--gray)]">{hint}</span>}
                </button>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <div className="px-4 py-6 text-center font-sans text-sm text-[var(--gray)]">
              Keine Treffer / 无结果
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
