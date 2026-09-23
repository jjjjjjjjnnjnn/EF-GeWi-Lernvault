import { useId, useState } from "react";
import {
  type FehlerlogDraft,
  formatFehlerlogMarkdownRow,
  formatFehlerlogPatch,
  getFachFolderName,
} from "../ai/socratic";
import { useDialogFocus } from "./HelpOverlay";

interface FehlerlogModalProps {
  draft: FehlerlogDraft;
  onClose: () => void;
  lang?: "de" | "zh";
}

function FieldLabel({ htmlFor, de, zh }: { htmlFor: string; de: string; zh: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block font-sans text-[var(--text-meta)] font-medium text-[var(--gray)]">
      <span className="de-reading">{de}</span>
      <span className="zh-translation">{zh}</span>
    </label>
  );
}

export function FehlerlogModal({ draft: initialDraft, onClose, lang = "zh" }: FehlerlogModalProps) {
  const [draft, setDraft] = useState<FehlerlogDraft>(initialDraft);
  const [copied, setCopied] = useState(false);
  const dialogRef = useDialogFocus(true, onClose);

  const fachSelectId = useId();
  const themaInputId = useId();
  const typSelectId = useId();
  const fehlerTextId = useId();
  const korrekturTextId = useId();
  const klausursatzTextId = useId();

  const handleCopy = async () => {
    const patch = formatFehlerlogPatch(draft);
    try {
      await navigator.clipboard.writeText(patch);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = patch;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const folder = getFachFolderName(draft.fach);
  const markdownRow = formatFehlerlogMarkdownRow(draft);
  const inputClass = "w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-sans text-[13px] text-[var(--ink)]";

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--overlay)] p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="fehlerlog-modal-title"
        tabIndex={-1}
        className="flex max-h-[90vh] w-full max-w-[640px] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)]"
      >
        <div className="flex items-center justify-between border-b border-[var(--line)] bg-[var(--paper-subtle)] px-5 py-4">
          <div className="flex items-start gap-2">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="mt-1 text-[var(--accent)]">
              <path d="M4 2.5h5l3 3v8H4z" />
              <path d="M9 2.5v3h3M6 8h4M6 10.5h4" />
            </svg>
            <h2 id="fehlerlog-modal-title" className="de-heading text-base text-[var(--ink)]">
              {lang === "de" ? "In Fehlerlog erfassen (Obsidian-Patch)" : "沉淀为错题补丁 (Fehlerlog Patch)"}
              <span className="zh-translation mt-0.5 font-sans text-xs font-normal">
                {lang === "de" ? "将错题写入 Fehlerlog 补丁" : "In Fehlerlog erfassen (Obsidian-Patch)"}
              </span>
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === "de" ? "Schließen / 关闭" : "关闭 / Schließen"}
            data-dialog-initial-focus
            className="rounded-[var(--radius)] p-1 text-[var(--gray)] hover:text-[var(--ink)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-3 overflow-y-auto p-5">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-2">
            <div>
              <FieldLabel htmlFor={fachSelectId} de="Fach" zh="学科" />
              <select
                id={fachSelectId}
                value={draft.fach}
                onChange={(event) => setDraft({ ...draft, fach: event.target.value })}
                className={inputClass}
              >
                <option value="SoWi">SoWi (08_SoWi)</option>
                <option value="Philosophie">Philosophie (07_Philosophie)</option>
                <option value="Deutsch">Deutsch (01_Deutsch)</option>
                <option value="Englisch">Englisch (02_Englisch)</option>
                <option value="Mathe">Mathe (03_Mathe)</option>
                <option value="Physik">Physik (04_Physik)</option>
                <option value="Chemie">Chemie (05_Chemie)</option>
                <option value="Bio">Bio (06_Bio)</option>
                <option value="Musik">Musik (09_Musik-mündl)</option>
                <option value="Sport">Sport (10_Sport-mündl)</option>
              </select>
            </div>
            <div>
              <FieldLabel htmlFor={themaInputId} de="Thema" zh="主题" />
              <input
                id={themaInputId}
                type="text"
                value={draft.thema}
                onChange={(event) => setDraft({ ...draft, thema: event.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor={typSelectId} de="Fehlertyp" zh="错因类型" />
            <select
              id={typSelectId}
              value={draft.fehlertyp}
              onChange={(event) => setDraft({ ...draft, fehlertyp: event.target.value as FehlerlogDraft["fehlertyp"] })}
              className={inputClass}
            >
              <option value="Wissenslücke">Wissenslücke / 知识盲区</option>
              <option value="Logik/Begründung">Logik/Begründung / 论证漏洞</option>
              <option value="Fachsprache/Ausdruck">Fachsprache/Ausdruck / 术语表达</option>
              <option value="Aufgabenbezug/AFB">Aufgabenbezug/AFB / 审题与AFB</option>
            </select>
          </div>

          <div>
            <FieldLabel htmlFor={fehlerTextId} de="Eigener Fehler / Fehlvorstellung" zh="我的错误理解 / 漏洞点" />
            <textarea
              id={fehlerTextId}
              rows={2}
              value={draft.meinFehler}
              onChange={(event) => setDraft({ ...draft, meinFehler: event.target.value })}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div>
            <FieldLabel htmlFor={korrekturTextId} de="Korrektur / Erkenntnis" zh="纠偏认识 / 核心考点" />
            <textarea
              id={korrekturTextId}
              rows={2}
              value={draft.korrektur}
              onChange={(event) => setDraft({ ...draft, korrektur: event.target.value })}
              className={`${inputClass} resize-y`}
            />
          </div>

          <div>
            <FieldLabel htmlFor={klausursatzTextId} de="Mustergültiger Klausursatz (kopierfertig)" zh="满分德语标准答题句（可复制）" />
            <input
              id={klausursatzTextId}
              type="text"
              value={draft.klausursatz}
              onChange={(event) => setDraft({ ...draft, klausursatz: event.target.value })}
              placeholder="z. B. Die Maßnahme stärkt die Effizienz, gefährdet jedoch die soziale Gerechtigkeit."
              className={inputClass}
            />
          </div>

          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-[var(--text-meta)] text-[var(--gray)]">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <span className="font-medium text-[var(--ink)]">
                {lang === "de" ? "Zielort im Vault" : "目标落盘文件 (Obsidian)"}
                <span className="zh-translation font-sans">
                  {lang === "de" ? "Vault 中的目标文件" : "Zielort im Vault"}
                </span>
              </span>
              <code className="break-all font-mono text-[var(--accent)]">{folder}/Klausur-Training/Fehlerlog.md</code>
            </div>
            <div className="overflow-x-auto whitespace-pre-wrap break-words rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2 font-mono text-[var(--text-meta)] text-[var(--gray)]">
              {markdownRow}
            </div>
            <p className="mt-2 flex items-start gap-2 leading-relaxed">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="mt-0.5 shrink-0">
                <circle cx="8" cy="8" r="6" />
                <path d="M8 7v4M8 4.7v.2" />
              </svg>
              <span>
                {lang === "de"
                  ? "Gemäß AGENTS.md schreibt die App nicht direkt in den Vault. Kopiere den Patch und füge ihn in Obsidian ein."
                  : "遵循 AGENTS.md 规范：App 只读 Vault，不直接修改文件。请复制文本补丁，在 Obsidian 中确认粘贴。"}
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-[var(--line)] bg-[var(--paper-subtle)] px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-sans text-[13px] text-[var(--gray)] hover:text-[var(--ink)]"
          >
            {lang === "de" ? "Abbrechen / 取消" : "取消"}
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className={`inline-flex items-center gap-2 rounded-[var(--radius)] border px-4 py-1.5 font-sans text-[13px] font-medium ${
              copied
                ? "border-[var(--success)] text-[var(--success)]"
                : "border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--paper-subtle)]"
            }`}
          >
            {copied ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 8.5l3 3L13 4.5" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
                <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h2" />
              </svg>
            )}
            {copied
              ? lang === "de" ? "Patch kopiert / 补丁已复制！" : "补丁已复制！"
              : lang === "de" ? "Patch kopieren / 复制 Fehlerlog 补丁" : "复制 Fehlerlog 补丁"}
          </button>
        </div>
      </div>
    </div>
  );
}
