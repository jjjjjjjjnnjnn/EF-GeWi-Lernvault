import { useState } from "react";
import type { Lang } from "../i18n";

// Dev-Feedback: lets the learner drop in-place notes ("卡住了/看不懂/按钮没反应")
// with exact context attached. Stored locally, one-click copy to paste back
// to the developer. No network, no new shortcuts.
export const FEEDBACK_STORAGE_KEY = "eflernvault:feedback:v1";

export interface FeedbackEntry {
  id: string;
  ts: string;
  ctx: string;
  text: string;
}

interface FeedbackStore {
  version: 1;
  entries: FeedbackEntry[];
}

function loadStore(): FeedbackStore {
  try {
    const raw = localStorage.getItem(FEEDBACK_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.version === 1 && Array.isArray(parsed.entries)) {
        return parsed as FeedbackStore;
      }
    }
  } catch {
    // corrupted storage -> start fresh
  }
  return { version: 1, entries: [] };
}

function saveStore(store: FeedbackStore) {
  try {
    localStorage.setItem(FEEDBACK_STORAGE_KEY, JSON.stringify(store));
  } catch {
    // quota/full -> keep in-memory only
  }
}

export default function FeedbackBox({
  lang,
  context,
}: {
  lang: Lang;
  context: string;
}) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [entries, setEntries] = useState<FeedbackEntry[]>(
    () => loadStore().entries
  );
  const [copied, setCopied] = useState(false);

  const persist = (next: FeedbackEntry[]) => {
    setEntries(next);
    saveStore({ version: 1, entries: next });
  };

  const saveDraft = () => {
    const text = draft.trim();
    if (!text) return;
    const entry: FeedbackEntry = {
      id: `${Date.now().toString(36)}-${Math.floor(Math.random() * 1e4)}`,
      ts: new Date().toISOString(),
      ctx: context,
      text,
    };
    persist([entry, ...entries]);
    setDraft("");
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

  return (
    <div className="border border-dashed border-[#E5E1D8] bg-[#F7F5F0] p-4 rounded-sm">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-xs font-mono text-[#6B675C] hover:text-[#4338CA]"
        >
          {open
            ? "[- DEV-FEEDBACK / 收起反馈]"
            : `[+ DEV-FEEDBACK / 写反馈${entries.length > 0 ? ` (${entries.length})` : ""}]`}
        </button>
        {entries.length > 0 && (
          <button
            type="button"
            onClick={copyAll}
            className="text-xs font-mono text-[#4338CA] hover:underline"
          >
            {copied
              ? "✓ Kopiert!"
              : lang === "de"
              ? "Alle kopieren"
              : "复制全部"}
          </button>
        )}
      </div>

      {open && (
        <div className="mt-3 space-y-3">
          <div className="text-xs font-mono text-[#6B675C]">
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
            className="w-full border border-[#E5E1D8] bg-white p-2.5 text-xs font-sans rounded-sm focus:border-[#4338CA] focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={saveDraft}
              disabled={!draft.trim()}
              className={`px-4 py-1.5 font-mono text-xs uppercase rounded-sm transition-colors ${
                draft.trim()
                  ? "bg-[#1C1B17] text-white hover:bg-[#4338CA]"
                  : "bg-[#E5E1D8] text-[#6B675C] cursor-not-allowed"
              }`}
            >
              {lang === "de" ? "Speichern" : "保存反馈"}
            </button>
          </div>
          {entries.length > 0 && (
            <ul className="space-y-1.5">
              {entries.slice(0, 5).map((e) => (
                <li
                  key={e.id}
                  className="flex items-start justify-between gap-2 bg-white border border-[#E5E1D8] p-2 rounded-sm text-xs font-mono text-[#1C1B17]"
                >
                  <span className="flex-1">
                    <span className="text-[#6B675C]">
                      [{e.ts.slice(0, 16).replace("T", " ")}] {e.ctx}:
                    </span>{" "}
                    {e.text}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeEntry(e.id)}
                    className="text-[#6B675C] hover:text-[#C62828] shrink-0"
                    aria-label="Eintrag löschen"
                  >
                    ×
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
