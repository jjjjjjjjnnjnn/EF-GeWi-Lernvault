import { useEffect, useRef } from "react";
import {
  GLOBAL_KEYS,
  GLOBAL_SHORTCUTS,
  CARD_SHORTCUTS,
  QUIZ_SHORTCUTS,
  LIBRARY_SHORTCUTS,
  REISE_SHORTCUTS,
  LERNBAUM_SHORTCUTS,
  ONBOARDING_SHORTCUTS,
  matchesKey,
  type Shortcut,
} from "../keys";
import { t, type Lang } from "../i18n";

const focusableSelector = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[contenteditable='true']",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

export function useDialogFocus(open: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const container = containerRef.current;
    if (!container) return;
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
        (element) => element.getAttribute("aria-hidden") !== "true"
      );
    const frame = window.requestAnimationFrame(() => {
      const preferred = container.querySelector<HTMLElement>("[data-dialog-initial-focus]");
      const target = preferred ?? getFocusable()[0] ?? container;
      target.focus();
    });
    const escapeBinding = GLOBAL_KEYS.find((binding) => binding.id === "escape")!;
    const onKeyDown = (event: KeyboardEvent) => {
      if (matchesKey(event, escapeBinding, { allowWhileTyping: true })) {
        event.preventDefault();
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !container.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    container.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      container.removeEventListener("keydown", onKeyDown);
      previous?.focus();
    };
  }, [open]);

  return containerRef;
}

function Rows({ rows, lang }: { rows: Shortcut[]; lang: Lang }) {
  return (
    <div className="divide-y divide-[var(--line)]">
      {rows.map((shortcut) => (
        <div key={shortcut.keys} className="flex items-center justify-between gap-4 py-2">
          <span className="font-sans text-sm text-[var(--ink)]">
            {lang === "de" ? shortcut.de : shortcut.zh}
          </span>
          <kbd className="shrink-0 border border-[var(--line)] bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[var(--text-meta)] text-[var(--gray)]">
            {shortcut.keys}
          </kbd>
        </div>
      ))}
    </div>
  );
}

function SectionTitle({ de, zh }: { de: string; zh: string }) {
  return (
    <h3 className="mb-1 mt-4 font-mono text-[var(--text-meta)] uppercase tracking-wider text-[var(--gray)]">
      {de}
      <span className="zh-translation normal-case tracking-normal">{zh}</span>
    </h3>
  );
}

export default function HelpOverlay({ open, onClose, lang }: { open: boolean; onClose: () => void; lang: Lang }) {
  const tr = t(lang);
  const dialogRef = useDialogFocus(open, onClose);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--overlay)] p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="palette-enter max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-overlay-title"
        tabIndex={-1}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id="help-overlay-title" className="de-heading text-[1.3rem] text-[var(--ink)]">
            {tr.helpTitle}
            <span className="zh-translation mt-1 font-sans text-sm font-normal">{tr.helpTitleZh}</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={tr.closeHelp}
            className="shrink-0 rounded-[var(--radius)] p-1 text-[var(--gray)] hover:text-[var(--ink)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </div>
        <SectionTitle de="Global" zh="全局" />
        <Rows rows={GLOBAL_SHORTCUTS} lang={lang} />
        <SectionTitle de="Karteikarten" zh="背卡" />
        <Rows rows={CARD_SHORTCUTS} lang={lang} />
        <SectionTitle de="Quiz" zh="刷题" />
        <Rows rows={QUIZ_SHORTCUTS} lang={lang} />
        <SectionTitle de="Bibliothek" zh="笔记库" />
        <Rows rows={LIBRARY_SHORTCUTS} lang={lang} />
        <SectionTitle de="Lernreise" zh="互动旅程" />
        <Rows rows={REISE_SHORTCUTS} lang={lang} />
        <SectionTitle de="Lernbaum" zh="学习树" />
        <Rows rows={LERNBAUM_SHORTCUTS} lang={lang} />
        <SectionTitle de="Start" zh="引导" />
        <Rows rows={ONBOARDING_SHORTCUTS} lang={lang} />
      </div>
    </div>
  );
}
