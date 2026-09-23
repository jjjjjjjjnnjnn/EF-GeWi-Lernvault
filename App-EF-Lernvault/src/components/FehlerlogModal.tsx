import { useState, useId } from "react";
import {
  type FehlerlogDraft,
  formatFehlerlogMarkdownRow,
  formatFehlerlogPatch,
  getFachFolderName,
} from "../ai/socratic";

interface FehlerlogModalProps {
  draft: FehlerlogDraft;
  onClose: () => void;
  lang?: "de" | "zh";
}

export function FehlerlogModal({ draft: initialDraft, onClose, lang = "zh" }: FehlerlogModalProps) {
  const [draft, setDraft] = useState<FehlerlogDraft>(initialDraft);
  const [copied, setCopied] = useState(false);

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
      // Fallback
      const ta = document.createElement("textarea");
      ta.value = patch;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const folder = getFachFolderName(draft.fach);
  const markdownRow = formatFehlerlogMarkdownRow(draft);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="fehlerlog-modal-title"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(2px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "16px",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          width: "100%",
          maxWidth: "640px",
          maxHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "#f8fafc",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <h2 id="fehlerlog-modal-title" style={{ margin: 0, fontSize: "16px", fontWeight: 600, color: "#0f172a" }}>
              {lang === "de" ? "In Fehlerlog erfassen (Obsidian-Patch)" : "沉淀为错题补丁 (Fehlerlog Patch)"}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Schließen"
            style={{
              border: "none",
              background: "none",
              cursor: "pointer",
              color: "#64748b",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "4px",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form Body */}
        <div style={{ padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
            <div>
              <label htmlFor={fachSelectId} style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#475569", marginBottom: "4px" }}>
                {lang === "de" ? "Fach" : "学科 (Fach)"}
              </label>
              <select
                id={fachSelectId}
                value={draft.fach}
                onChange={(e) => setDraft({ ...draft, fach: e.target.value })}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  backgroundColor: "#ffffff",
                }}
              >
                <option value="SoWi">SoWi (08_SoWi)</option>
                <option value="Philosophie">Philosophie (07_Philosophie)</option>
                <option value="Deutsch">Deutsch (01_Deutsch)</option>
                <option value="Englisch">Englisch (02_Englisch)</option>
                <option value="Mathe">Mathe (03_Mathe)</option>
                <option value="Physik">Physik (04_Physik)</option>
                <option value="Chemie">Chemie (05_Chemie)</option>
                <option value="Bio">Bio (06_Bio)</option>
              </select>
            </div>

            <div>
              <label htmlFor={themaInputId} style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#475569", marginBottom: "4px" }}>
                {lang === "de" ? "Thema" : "主题 (Thema)"}
              </label>
              <input
                id={themaInputId}
                type="text"
                value={draft.thema}
                onChange={(e) => setDraft({ ...draft, thema: e.target.value })}
                style={{
                  width: "100%",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          <div>
            <label htmlFor={typSelectId} style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#475569", marginBottom: "4px" }}>
              {lang === "de" ? "Fehlertyp" : "错因类型 (Fehlertyp)"}
            </label>
            <select
              id={typSelectId}
              value={draft.fehlertyp}
              onChange={(e) => setDraft({ ...draft, fehlertyp: e.target.value as FehlerlogDraft["fehlertyp"] })}
              style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                backgroundColor: "#ffffff",
              }}
            >
              <option value="Wissenslücke">Wissenslücke (知识盲区 / 概念未掌握)</option>
              <option value="Logik/Begründung">Logik/Begründung (论证漏洞 / 缺少因果支撑)</option>
              <option value="Fachsprache/Ausdruck">Fachsprache/Ausdruck (德语表达 / 术语不精确)</option>
              <option value="Aufgabenbezug/AFB">Aufgabenbezug/AFB (审题偏离 / 未达AFB要求)</option>
            </select>
          </div>

          <div>
            <label htmlFor={fehlerTextId} style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#475569", marginBottom: "4px" }}>
              {lang === "de" ? "Eigener Fehler / Fehlvorstellung" : "我的错误理解 / 漏洞点 (Eigener Fehler)"}
            </label>
            <textarea
              id={fehlerTextId}
              rows={2}
              value={draft.meinFehler}
              onChange={(e) => setDraft({ ...draft, meinFehler: e.target.value })}
              style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label htmlFor={korrekturTextId} style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#475569", marginBottom: "4px" }}>
              {lang === "de" ? "Korrektur / Erkenntnis" : "纠偏认识 / 核心考点 (Korrektur)"}
            </label>
            <textarea
              id={korrekturTextId}
              rows={2}
              value={draft.korrektur}
              onChange={(e) => setDraft({ ...draft, korrektur: e.target.value })}
              style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                boxSizing: "border-box",
                resize: "vertical",
              }}
            />
          </div>

          <div>
            <label htmlFor={klausursatzTextId} style={{ display: "block", fontSize: "12px", fontWeight: 500, color: "#475569", marginBottom: "4px" }}>
              {lang === "de" ? "Mustergültiger Klausursatz (kopierfertig)" : "满分德语标准答题句 (Klausursatz)"}
            </label>
            <input
              id={klausursatzTextId}
              type="text"
              value={draft.klausursatz}
              onChange={(e) => setDraft({ ...draft, klausursatz: e.target.value })}
              placeholder="z. B. Die Maßnahme stärkt die Effizienz, gefährdet jedoch die soziale Gerechtigkeit."
              style={{
                width: "100%",
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #cbd5e1",
                fontSize: "13px",
                boxSizing: "border-box",
              }}
            />
          </div>

          {/* Vorschau & Zielort */}
          <div
            style={{
              backgroundColor: "#f8fafc",
              border: "1px solid #e2e8f0",
              borderRadius: "6px",
              padding: "10px 12px",
              fontSize: "12px",
              color: "#334155",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontWeight: 600, color: "#0f172a" }}>
                {lang === "de" ? "Zielort im Vault:" : "目标落盘文件 (Obsidian):"}
              </span>
              <code style={{ color: "#2563eb", backgroundColor: "#eff6ff", padding: "1px 4px", borderRadius: "3px" }}>
                {folder}/Klausur-Training/Fehlerlog.md
              </code>
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "11px",
                backgroundColor: "#ffffff",
                padding: "8px",
                border: "1px solid #e2e8f0",
                borderRadius: "4px",
                overflowX: "auto",
                whiteSpace: "nowrap",
                color: "#475569",
              }}
            >
              {markdownRow}
            </div>
            <p style={{ margin: "6px 0 0 0", fontSize: "11px", color: "#64748b", lineHeight: 1.4 }}>
              {lang === "de"
                ? "💡 Gemäß AGENTS.md schreibt die App nicht direkt in den Vault. Kopiere den Patch und füge ihn in Obsidian ein."
                : "💡 遵循 AGENTS.md 规范：App 只读 Vault，不直接修改文件。请点击下方按钮复制文本补丁，在 Obsidian 中确认粘贴。"}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            padding: "12px 20px",
            borderTop: "1px solid #e2e8f0",
            backgroundColor: "#f8fafc",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "7px 14px",
              borderRadius: "6px",
              border: "1px solid #cbd5e1",
              backgroundColor: "#ffffff",
              fontSize: "13px",
              color: "#475569",
              cursor: "pointer",
            }}
          >
            {lang === "de" ? "Abbrechen" : "取消"}
          </button>

          <button
            onClick={handleCopy}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "7px 16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: copied ? "#16a34a" : "#2563eb",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              transition: "background-color 0.15s ease",
            }}
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {lang === "de" ? "Patch kopiert!" : "补丁已复制！"}
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                {lang === "de" ? "Patch kopieren" : "复制 Fehlerlog 补丁"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
