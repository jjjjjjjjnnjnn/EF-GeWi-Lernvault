import { useEffect, useState } from "react";
import type { Lang } from "../i18n";
import { feedbackStore, type FeedbackEntry, type FeedbackData } from "../engine/stores";

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M3 8.5l3 3L13 4.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </svg>
  );
}

// Dev-Feedback: lets the learner drop in-place notes ("卡住了/看不懂/按钮没反应")
// with exact context attached. Stored locally, one-click copy to paste back
// to the developer. No network, no new shortcuts.
export const FEEDBACK_STORAGE_KEY = feedbackStore.key;

export type { FeedbackEntry };

interface FeedbackStore extends FeedbackData {}

function loadStore(): FeedbackStore {
  return feedbackStore.load();
}

function saveStore(store: FeedbackStore) {
  feedbackStore.save(store);
}

// Live context bus: modules report where the learner is
// (e.g. "courseId#Schritt5", "quiz:notePath"), the floating widget
// attaches it automatically. No props drilling needed.
let liveContext = "";
const ctxListeners = new Set<(ctx: string) => void>();

export function setFeedbackContext(ctx: string) {
  if (ctx === liveContext) return;
  liveContext = ctx;
  ctxListeners.forEach((fn) => fn(ctx));
}

export function useFeedbackContext() {
  const [ctx, setCtx] = useState(liveContext);
  useEffect(() => {
    ctxListeners.add(setCtx);
    return () => {
      ctxListeners.delete(setCtx);
    };
  }, []);
  return ctx;
}

function useFeedbackEntries() {
  const [entries, setEntries] = useState<FeedbackEntry[]>(
    () => loadStore().entries
  );
  const [copied, setCopied] = useState(false);

  const persist = (next: FeedbackEntry[]) => {
    setEntries(next);
    saveStore({ version: 1, entries: next });
  };

  const saveText = (text: string, ctx: string): boolean => {
    const trimmed = text.trim();
    if (!trimmed) return false;
    const entry: FeedbackEntry = {
      id: `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e4)}`,
      ts: new Date().toISOString(),
      ctx,
      text: trimmed,
    };
    persist([entry, ...entries]);
    return true;
  };

  const removeEntry = (id: string) => {
    persist(entries.filter((e) => e.id !== id));
  };

  const copyAll = () => {
    const lines = entries.map((e) => `[${e.ts}] ${e.ctx}: ${e.text}`);
    navigator.clipboard.writeText(lines.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return { entries, copied, saveText, removeEntry, copyAll };
}

// Inline variant (kept for embedding inside a module if ever needed).
export default function FeedbackBox({
  lang,
  context,
}: {
  lang: Lang;
  context: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const { entries, copied, saveText, removeEntry, copyAll } =
    useFeedbackEntries();

  const saveDraft = () => {
    if (saveText(draft, context)) setDraft("");
  };

  return (
    <div className="border border-dashed border-[var(--line)] bg-[var(--paper-subtle)] p-4 rounded-[var(--radius)]">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-xs font-mono text-[var(--gray)] hover:text-[var(--accent)]"
        >
          {open
            ? "DEV-FEEDBACK schließen / 收起反馈"
            : `DEV-FEEDBACK öffnen / 写反馈${entries.length > 0 ? ` (${entries.length})` : ""}`}
        </button>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={copyAll}
            className="text-xs font-mono text-[var(--accent)] hover:underline"
          >
            {copied ? (
              <span className="inline-flex items-center gap-1 text-[var(--success)]">
                <CheckIcon />
                {lang === "de" ? "Kopiert / 已复制" : "已复制 / Kopiert"}
              </span>
            ) : lang === "de" ? (
              "Alle kopieren / 复制全部"
            ) : (
              "复制全部 / Alle kopieren"
            )}
          </button>
        )}
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          <div className="text-xs font-mono text-[var(--gray)]">
            {lang === "de"
              ? `Kontext: ${context} — kurz schreiben, was klemmt.`
              : `位置：${context} —— 哪卡住了/看不懂，直接写一句。`}
          </div>
          <textarea
            rows={2}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={
              lang === "de"
                ? "z.B. Button reagiert nicht / Satz unklar / ..."
                : "如：按钮点不动 / 这句看不懂 / …"
            }
            className="w-full border border-[var(--line)] bg-[var(--surface)] p-2.5 text-xs font-sans rounded-[var(--radius)] focus:border-[var(--accent)]"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={saveDraft}
              disabled={!draft.trim()}
              className={`px-4 py-1.5 font-mono text-xs uppercase rounded-[var(--radius)] transition-colors ${
                draft.trim()
                  ? "bg-[var(--ink)] text-white hover:bg-[var(--accent)]"
                  : "bg-[var(--line)] text-[var(--gray)] cursor-not-allowed"
              }`}
            >
              <span className="bilingual">
                <span>{lang === "de" ? "Speichern" : "保存反馈"}</span>
                <span className="zh-translation">{lang === "de" ? "保存反馈" : "Speichern"}</span>
              </span>
            </button>
          </div>
          {entries.length > 0 && (
            <ul className="space-y-1.5">
              {entries.slice(0, 5).map((e) => (
                <li
                  key={e.id}
                  className="flex items-start justify-between gap-2 bg-[var(--surface)] border border-[var(--line)] p-2 rounded-[var(--radius)] text-xs font-mono text-[var(--ink)]"
                >
                  <span className="flex-1">
                    <span className="text-[var(--gray)]">
                      [{e.ts.slice(0, 16).replace("T", " ")}] {e.ctx}:
                    </span>{" "}
                    {e.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEntry(e.id)}
                    className="shrink-0 text-[var(--gray)] hover:text-[var(--warning)] focus-visible:opacity-100"
                    aria-label={lang === "de" ? "Eintrag löschen / 删除反馈" : "删除反馈 / Eintrag löschen"}
                  >
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

// Floating variant: bottom-right pill, opens anywhere, auto-attaches the
// live context reported by modules via setFeedbackContext().
export function FeedbackFloat({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const ctx = useFeedbackContext();
  const { entries, copied, saveText, removeEntry, copyAll } =
    useFeedbackEntries();

  const saveDraft = () => {
    if (saveText(draft, ctx || "global")) setDraft("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      {open && (
        <div id="feedback-float-panel" className="w-80 max-h-[60vh] space-y-3 overflow-y-auto rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--ink)]">
              Dev-Feedback / 反馈
            </span>
            {entries.length > 0 && (
              <button
                type="button"
                onClick={copyAll}
                className="text-xs font-mono text-[var(--accent)] hover:underline"
              >
                {copied ? (
                  <span className="inline-flex items-center gap-1 text-[var(--success)]">
                    <CheckIcon />
                    {lang === "de" ? "Kopiert / 已复制" : "已复制 / Kopiert"}
                  </span>
                ) : lang === "de" ? (
                  "Alle kopieren / 复制全部"
                ) : (
                  "复制全部 / Alle kopieren"
                )}
              </button>
            )}
          </div>
          <div className="text-xs font-mono text-[var(--gray)] break-words">
            {lang === "de"
              ? `Kontext: ${ctx || "global"}`
              : `位置：${ctx || "global"}`}
          </div>
          <textarea
            rows={3}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={
              lang === "de"
                ? "Was klemmt? Kurz schreiben …"
                : "哪卡住了？直接写一句 …"
            }
            className="w-full border border-[var(--line)] bg-[var(--paper)] p-2.5 text-xs font-sans rounded-[var(--radius)] focus:border-[var(--accent)]"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={saveDraft}
              disabled={!draft.trim()}
              className={`px-4 py-1.5 font-mono text-xs uppercase rounded-[var(--radius)] transition-colors ${
                draft.trim()
                  ? "bg-[var(--ink)] text-white hover:bg-[var(--accent)]"
                  : "bg-[var(--line)] text-[var(--gray)] cursor-not-allowed"
              }`}
            >
              <span className="bilingual">
                <span>{lang === "de" ? "Speichern" : "保存反馈"}</span>
                <span className="zh-translation">{lang === "de" ? "保存反馈" : "Speichern"}</span>
              </span>
            </button>
          </div>
          {entries.length > 0 && (
            <ul className="space-y-1.5">
              {entries.slice(0, 5).map((e) => (
                <li
                  key={e.id}
                  className="flex items-start justify-between gap-2 bg-[var(--paper)] border border-[var(--line)] p-2 rounded-[var(--radius)] text-xs font-mono text-[var(--ink)]"
                >
                  <span className="flex-1 break-words">
                    <span className="text-[var(--gray)]">
                      [{e.ts.slice(0, 16).replace("T", " ")}] {e.ctx}:
                    </span>{" "}
                    {e.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEntry(e.id)}
                    className="shrink-0 text-[var(--gray)] hover:text-[var(--warning)] focus-visible:opacity-100"
                    aria-label={lang === "de" ? "Eintrag löschen / 删除反馈" : "删除反馈 / Eintrag löschen"}
                  >
                    <CloseIcon />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls="feedback-float-panel"
        className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-4 py-2 font-mono text-xs uppercase tracking-wider text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)] focus-visible:opacity-100"
      >
        {open && <CloseIcon />}
        {`Feedback / 反馈${entries.length > 0 ? ` (${entries.length})` : ""}`}
      </button>
    </div>
  );
}
