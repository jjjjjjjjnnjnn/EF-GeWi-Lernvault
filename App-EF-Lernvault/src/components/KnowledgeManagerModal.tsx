import React, { useState, useEffect } from "react";
import {
  repository,
  FachRegistry,
  downloadFile,
  exportToJsonPackage,
  exportCardsToAnkiCsv,
  exportNoteToMarkdown,
  type KnowledgeStats,
} from "../framework";
import type { Lang } from "../i18n";
import { FAECHER } from "../fach";

interface KnowledgeManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Lang;
  onRefreshNeeded?: () => void;
}

type TabKey = "overview" | "add" | "import" | "export" | "dev";

export const KnowledgeManagerModal: React.FC<KnowledgeManagerModalProps> = ({
  isOpen,
  onClose,
  lang = "zh",
  onRefreshNeeded,
}) => {
  const de = lang === "de";
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [stats, setStats] = useState<KnowledgeStats>(() => repository.getStats());

  // Form states for Add Note
  const [newNoteFach, setNewNoteFach] = useState<string>("SoWi");
  const [newNoteThema, setNewNoteThema] = useState<string>("");
  const [newNoteOperatoren, setNewNoteOperatoren] = useState<string>("darstellen, analysieren");
  const [newNoteContentZH, setNewNoteContentZH] = useState<string>("");
  const [newNoteContentDE, setNewNoteContentDE] = useState<string>("");

  // Form states for Add Card
  const [newCardFach, setNewCardFach] = useState<string>("SoWi");
  const [newCardFront, setNewCardFront] = useState<string>("");
  const [newCardBack, setNewCardBack] = useState<string>("");
  const [newCardExample, setNewCardExample] = useState<string>("");

  // Import states
  const [importText, setImportText] = useState<string>("");
  const [importFileName, setImportFileName] = useState<string>("custom-import.md");
  const [importFach, setImportFach] = useState<string>("SoWi");
  const [importStatusMsg, setImportStatusMsg] = useState<string | null>(null);

  // Export states
  const [exportFach, setExportFach] = useState<string>("alle");

  // Success message timer
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStats(repository.getStats());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const showNotification = (msg: string) => {
    setActionSuccess(msg);
    setStats(repository.getStats());
    onRefreshNeeded?.();
    window.setTimeout(() => setActionSuccess(null), 3500);
  };

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteThema.trim()) return;

    const opList = newNoteOperatoren
      .split(/[,/]+/)
      .map((s) => s.trim())
      .filter(Boolean);

    repository.addCustomNote({
      fach: newNoteFach,
      thema: newNoteThema.trim(),
      operatoren: opList,
      contentZH: newNoteContentZH.trim(),
      contentDE: newNoteContentDE.trim(),
    });

    setNewNoteThema("");
    setNewNoteContentZH("");
    setNewNoteContentDE("");
    showNotification(de ? "Wissensnotiz erfolgreich gespeichert." : "考点笔记已成功添加到知识库。");
  };

  const handleSaveCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCardFront.trim() || !newCardBack.trim()) return;

    repository.addCustomCard({
      fach: newCardFach,
      front: newCardFront.trim(),
      back: newCardBack.trim(),
      example: newCardExample.trim(),
    });

    setNewCardFront("");
    setNewCardBack("");
    setNewCardExample("");
    showNotification(de ? "Lernkarte erfolgreich hinzugefügt." : "核心概念卡片已成功加入。");
  };

  const handleImportText = () => {
    if (!importText.trim()) return;
    const res = repository.importFromText(importFileName, importText, importFach);
    setImportText("");
    setImportStatusMsg(
      de
        ? `Import abgeschlossen: ${res.notesCount} Notizen, ${res.cardsCount} Karten übernommen.`
        : `导入完成：已收录 ${res.notesCount} 篇笔记、${res.cardsCount} 张概念卡。`
    );
    showNotification(de ? "Daten erfolgreich importiert." : "数据已成功导入。");
  };

  const handleExportJson = () => {
    const allNotes = repository.getAllNotes();
    const allCards = repository.getAllCards();
    const pkg = exportToJsonPackage(allNotes, allCards, { fach: exportFach });
    downloadFile(`ef-lernvault-package-${exportFach}-${Date.now()}.json`, JSON.stringify(pkg, null, 2), "application/json");
  };

  const handleExportCsv = () => {
    const allCards = repository.getAllCards();
    const filtered = exportFach === "alle" ? allCards : allCards.filter((c) => c.fach.toLowerCase() === exportFach.toLowerCase());
    const csvContent = exportCardsToAnkiCsv(filtered);
    downloadFile(`ef-lernvault-anki-${exportFach}-${Date.now()}.csv`, csvContent, "text/csv;charset=utf-8");
  };

  const handleExportMarkdownBundle = () => {
    const allNotes = repository.getAllNotes();
    const filtered = exportFach === "alle" ? allNotes : allNotes.filter((n) => n.fach.toLowerCase() === exportFach.toLowerCase());
    const bundleText = filtered.map((n) => exportNoteToMarkdown(n)).join("\n\n---\n\n");
    downloadFile(`ef-lernvault-notes-${exportFach}-${Date.now()}.md`, bundleText, "text/markdown;charset=utf-8");
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      de
        ? "Möchten Sie wirklich alle benutzerdefinierten Notizen und Karten zurücksetzen?"
        : "确认要清除所有自定义导入与添加的笔记/卡片并恢复官方初始状态吗？"
    );
    if (confirmed) {
      repository.resetCustomData();
      showNotification(de ? "Benutzerdaten zurückgesetzt." : "已重置为官方预设。");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl max-h-[90vh] bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-xl shadow-none flex flex-col overflow-hidden">
        {/* Header */}
        <header className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between gap-3 bg-[var(--paper-subtle)]">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[var(--accent)] border border-[var(--accent)]/40 px-1.5 py-0.5 rounded">
                Framework · V1.0
              </span>
              <h2 className="font-serif text-lg font-bold tracking-tight text-[var(--ink)]">
                {de ? "Wissensbasis & Modul-Manager" : "知识库架构与模块化管理总台"}
              </h2>
            </div>
            <p className="text-xs text-[var(--gray)]">
              {de
                ? "Modulare Verwaltung: Standardlehrplan, Import, Export und Entwickler-Erweiterungen."
                : "解耦模块化架构：内置官方考纲知识，支持导入、导出、自定义扩充与开发者插件骨架。"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 rounded text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink)] transition-colors cursor-pointer"
            aria-label="Schließen"
          >
            [ESC]
          </button>
        </header>

        {/* Tab Navigation */}
        <nav className="flex flex-wrap gap-1 border-b border-[var(--line)] px-4 sm:px-5 pt-2 bg-[var(--surface)] text-xs font-mono">
          {[
            { key: "overview" as const, labelDE: "Übersicht & Status", labelZH: "概览与统计" },
            { key: "add" as const, labelDE: "Hinzufügen", labelZH: "新建内容" },
            { key: "import" as const, labelDE: "Importieren", labelZH: "导入知识库" },
            { key: "export" as const, labelDE: "Exportieren", labelZH: "导出知识库" },
            { key: "dev" as const, labelDE: "Entwickler-Skelett", labelZH: "开发者扩充骨架" },
          ].map((item) => {
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                type="button"
                onClick={() => setActiveTab(item.key)}
                className={`px-3 py-2 border-b-2 font-medium transition-all cursor-pointer ${
                  active
                    ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--paper-subtle)]"
                    : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? item.labelDE : item.labelZH}
              </button>
            );
          })}
        </nav>

        {/* Action Feedback Banner */}
        {actionSuccess && (
          <div className="bg-[var(--accent)]/10 text-[var(--accent)] border-b border-[var(--accent)]/30 px-4 py-2 text-xs font-mono flex items-center justify-between">
            <span>[OK] {actionSuccess}</span>
            <span className="text-[10px] opacity-75">Auto-Refresh aktiv</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: ÜBERSICHT */}
          {activeTab === "overview" && (
            <div className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                  <div className="font-mono text-[10px] uppercase text-[var(--gray)]">Gesamt-Notizen</div>
                  <div className="font-mono text-2xl font-bold text-[var(--ink)]">{stats.totalNotes}</div>
                  <div className="text-[11px] text-[var(--gray)]">
                    {stats.presetNotes} {de ? "Standard" : "内置"} · {stats.userNotes} {de ? "Benutzer" : "自定义"}
                  </div>
                </div>

                <div className="p-3.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                  <div className="font-mono text-[10px] uppercase text-[var(--gray)]">Gesamt-Karten</div>
                  <div className="font-mono text-2xl font-bold text-[var(--ink)]">{stats.totalCards}</div>
                  <div className="text-[11px] text-[var(--gray)]">
                    {stats.presetCards} {de ? "Standard" : "内置"} · {stats.userCards} {de ? "Benutzer" : "自定义"}
                  </div>
                </div>

                <div className="p-3.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                  <div className="font-mono text-[10px] uppercase text-[var(--gray)]">Fächer & Module</div>
                  <div className="font-mono text-2xl font-bold text-[var(--ink)]">{stats.subjectsCount}</div>
                  <div className="text-[11px] text-[var(--gray)]">10 kanonische Fächer</div>
                </div>

                <div className="p-3.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                  <div className="font-mono text-[10px] uppercase text-[var(--gray)]">Speicher-Schicht</div>
                  <div className="font-mono text-sm font-bold text-[var(--ink)] pt-1">
                    {stats.hasExternalVault ? "Obsidian Vault" : "Lokal & Offline"}
                  </div>
                  <div className="text-[11px] text-[var(--gray)]">
                    {stats.hasExternalVault ? "Dateisystem verbunden" : "Browser IndexedDB / LS"}
                  </div>
                </div>
              </div>

              {/* Subject Breakdown Table */}
              <div className="rounded border border-[var(--line)] bg-[var(--surface)] overflow-hidden">
                <div className="p-3 border-b border-[var(--line)] bg-[var(--paper-subtle)] font-serif text-xs font-semibold">
                  {de ? "Registrierte Schulfächer (Kanonisch & Erweiterbar)" : "已注册学科模块分布（官方标准与可扩展）"}
                </div>
                <div className="divide-y divide-[var(--line)] text-xs font-mono">
                  {FachRegistry.getAllSubjects().map((fach) => {
                    const noteCount = repository.getAllNotes().filter((n) => n.fach.toLowerCase() === fach.id.toLowerCase()).length;
                    const cardCount = repository.getAllCards().filter((c) => c.fach.toLowerCase() === fach.id.toLowerCase()).length;
                    return (
                      <div key={fach.id} className="p-2.5 flex items-center justify-between hover:bg-[var(--paper-subtle)]/50">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[var(--accent)] w-8">[{fach.kurz}]</span>
                          <span className="text-[var(--ink)] font-sans font-medium">{de ? fach.nameDE : `${fach.nameDE} / ${fach.nameZH}`}</span>
                          <span className="text-[10px] text-[var(--gray)] border border-[var(--line)] px-1 rounded">
                            {fach.category.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-[var(--gray)] space-x-3 text-[11px]">
                          <span>{noteCount} {de ? "Notizen" : "考点"}</span>
                          <span>{cardCount} {de ? "Karten" : "卡片"}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <p className="text-xs text-[var(--gray)]">
                  {de ? "Benutzerdaten werden lokal im Browser persistiert." : "自定义知识库数据安全存储于本地浏览器存储中，永不外传。"}
                </p>
                {stats.userNotes > 0 || stats.userCards > 0 ? (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs font-mono text-[var(--gray)] hover:text-red-700 underline cursor-pointer"
                  >
                    {de ? "Benutzerdaten zurücksetzen" : "清除自定义数据并复位"}
                  </button>
                ) : null}
              </div>
            </div>
          )}

          {/* TAB 2: HINZUFÜGEN */}
          {activeTab === "add" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 1. Formular: Neue Wissensnotiz */}
                <form onSubmit={handleSaveNote} className="p-4 rounded border border-[var(--line)] bg-[var(--surface)] space-y-3.5">
                  <div className="border-b border-[var(--line)] pb-2">
                    <h3 className="font-serif font-semibold text-sm text-[var(--ink)]">
                      {de ? "1. Neue Wissensnotiz verfassen" : "1. 新建考点知识笔记"}
                    </h3>
                    <p className="text-xs text-[var(--gray)] mt-0.5">
                      {de ? "Erstellt eine standardisierte Wissensnotiz mit Block-Struktur." : "快速新建符合八段论考纲规范的学科知识点。"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <label className="space-y-1">
                      <span className="font-mono text-[11px] text-[var(--gray)]">Fach:</span>
                      <select
                        value={newNoteFach}
                        onChange={(e) => setNewNoteFach(e.target.value)}
                        className="w-full p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-sans"
                      >
                        {FAECHER.map((f) => (
                          <option key={f.id} value={f.id}>{f.kurz} - {f.nameDE}</option>
                        ))}
                      </select>
                    </label>

                    <label className="space-y-1">
                      <span className="font-mono text-[11px] text-[var(--gray)]">Operatoren:</span>
                      <input
                        type="text"
                        value={newNoteOperatoren}
                        onChange={(e) => setNewNoteOperatoren(e.target.value)}
                        placeholder="darstellen, analysieren"
                        className="w-full p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-mono text-xs"
                      />
                    </label>
                  </div>

                  <label className="block text-xs space-y-1">
                    <span className="font-mono text-[11px] text-[var(--gray)]">Thema (Kurztitel):</span>
                    <input
                      type="text"
                      required
                      value={newNoteThema}
                      onChange={(e) => setNewNoteThema(e.target.value)}
                      placeholder="z.B. Soziale Mobilität & Bildungsexpansion"
                      className="w-full p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-sans text-xs"
                    />
                  </label>

                  <label className="block text-xs space-y-1">
                    <span className="font-mono text-[11px] text-[var(--gray)]">Deutscher Klausur-Absatz (DE):</span>
                    <textarea
                      rows={3}
                      value={newNoteContentDE}
                      onChange={(e) => setNewNoteContentDE(e.target.value)}
                      placeholder="Präziser Fachtext in deutscher Fachsprache (Nominalstil)..."
                      className="w-full p-2 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-serif text-xs leading-relaxed"
                    />
                  </label>

                  <label className="block text-xs space-y-1">
                    <span className="font-mono text-[11px] text-[var(--gray)]">Chinesische Konzept-Erklärung (ZH):</span>
                    <textarea
                      rows={3}
                      value={newNoteContentZH}
                      onChange={(e) => setNewNoteContentZH(e.target.value)}
                      placeholder="中文原理解析与易错辨析..."
                      className="w-full p-2 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-sans text-xs leading-relaxed"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full py-2 px-3 rounded bg-[var(--accent)] text-[var(--paper)] font-mono text-xs font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                  >
                    {de ? "+ Wissensnotiz speichern" : "+ 保存至考点库"}
                  </button>
                </form>

                {/* 2. Formular: Neue Lernkarte */}
                <form onSubmit={handleSaveCard} className="p-4 rounded border border-[var(--line)] bg-[var(--surface)] space-y-3.5">
                  <div className="border-b border-[var(--line)] pb-2">
                    <h3 className="font-serif font-semibold text-sm text-[var(--ink)]">
                      {de ? "2. Neue Lernkarte hinzufügen" : "2. 新建核心概念抽认卡"}
                    </h3>
                    <p className="text-xs text-[var(--gray)] mt-0.5">
                      {de ? "Erweitert den FSRS-Stapel um eine benutzerdefinierte Karte." : "添加至该学科智能抽认卡复习队列。"}
                    </p>
                  </div>

                  <label className="block text-xs space-y-1">
                    <span className="font-mono text-[11px] text-[var(--gray)]">Fach:</span>
                    <select
                      value={newCardFach}
                      onChange={(e) => setNewCardFach(e.target.value)}
                      className="w-full p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-sans"
                    >
                      {FAECHER.map((f) => (
                        <option key={f.id} value={f.id}>{f.kurz} - {f.nameDE}</option>
                      ))}
                    </select>
                  </label>

                  <label className="block text-xs space-y-1">
                    <span className="font-mono text-[11px] text-[var(--gray)]">Vorderseite / Begriff (DE):</span>
                    <input
                      type="text"
                      required
                      value={newCardFront}
                      onChange={(e) => setNewCardFront(e.target.value)}
                      placeholder="z.B. Meritokratie"
                      className="w-full p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-serif text-xs font-medium"
                    />
                  </label>

                  <label className="block text-xs space-y-1">
                    <span className="font-mono text-[11px] text-[var(--gray)]">Rückseite / Definition (ZH / DE):</span>
                    <textarea
                      rows={3}
                      required
                      value={newCardBack}
                      onChange={(e) => setNewCardBack(e.target.value)}
                      placeholder="Leistungsgesellschaftliches Prinzip, wonach sozialer Status primär..."
                      className="w-full p-2 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-sans text-xs leading-relaxed"
                    />
                  </label>

                  <label className="block text-xs space-y-1">
                    <span className="font-mono text-[11px] text-[var(--gray)]">Beispielsatz / Klausur-Kontext:</span>
                    <input
                      type="text"
                      value={newCardExample}
                      onChange={(e) => setNewCardExample(e.target.value)}
                      placeholder="Das meritokratische Versprechen steht im Konflikt mit..."
                      className="w-full p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-serif text-xs"
                    />
                  </label>

                  <button
                    type="submit"
                    className="w-full py-2 px-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] text-[var(--ink)] font-mono text-xs font-semibold cursor-pointer transition-colors"
                  >
                    {de ? "+ Lernkarte in Stapel einfügen" : "+ 录入抽认卡队列"}
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: IMPORTIEREN */}
          {activeTab === "import" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                <h3 className="font-serif font-semibold text-sm text-[var(--ink)]">
                  {de ? "Markdown-, CSV- oder JSON-Paket importieren" : "导入知识库（支持 Markdown / Anki CSV / JSON 知识包）"}
                </h3>
                <p className="text-xs text-[var(--gray)] leading-relaxed">
                  {de
                    ? "Fügen Sie Text direkt ein oder wählen Sie eine Datei aus. Das System erkennt Dateiendungen automatisch (.md für Notizen, .csv für Karten, .json für Komplettpakete)."
                    : "可直接粘贴文本或上传文件。系统会自动解析（.md 识别为考点笔记，.csv 识别为概念卡片，.json 识别为完整备份包）。"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <label className="space-y-1">
                  <span className="font-mono text-[11px] text-[var(--gray)]">Dateiname:</span>
                  <input
                    type="text"
                    value={importFileName}
                    onChange={(e) => setImportFileName(e.target.value)}
                    placeholder="import.md oder cards.csv"
                    className="w-full p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-mono text-xs"
                  />
                </label>

                <label className="space-y-1">
                  <span className="font-mono text-[11px] text-[var(--gray)]">Standard-Fach:</span>
                  <select
                    value={importFach}
                    onChange={(e) => setImportFach(e.target.value)}
                    className="w-full p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-sans"
                  >
                    {FAECHER.map((f) => (
                      <option key={f.id} value={f.id}>{f.kurz} - {f.nameDE}</option>
                    ))}
                  </select>
                </label>

                <div className="flex items-end">
                  <label className="w-full py-1.5 px-3 rounded border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink)] text-center text-xs font-mono cursor-pointer transition-colors block">
                    <span>{de ? "Datei auswählen..." : "选择本地文件..."}</span>
                    <input
                      type="file"
                      accept=".md,.csv,.json"
                      className="sr-only"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setImportFileName(file.name);
                          const reader = new FileReader();
                          reader.onload = (evt) => {
                            setImportText(String(evt.target?.result ?? ""));
                          };
                          reader.readAsText(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <label className="block space-y-1 text-xs">
                <span className="font-mono text-[11px] text-[var(--gray)]">Inhalt (Markdown / CSV / JSON):</span>
                <textarea
                  rows={8}
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  placeholder={`# Beispiel Markdown:\n---\nfach: SoWi\nthema: "Soziale Ungleichheit"\n---\nDeutscher Fachtext hier...\n\n# Oder Anki CSV:\nDeutsch;Chinesisch;Beispielsatz;SoWi;Thema`}
                  className="w-full p-2.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-mono text-xs leading-relaxed"
                />
              </label>

              {importStatusMsg && (
                <div className="p-3 rounded border border-[var(--line)] bg-[var(--surface)] text-xs font-mono text-[var(--ink)]">
                  {importStatusMsg}
                </div>
              )}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={handleImportText}
                  disabled={!importText.trim()}
                  className={`py-2 px-4 rounded font-mono text-xs font-semibold cursor-pointer transition-colors ${
                    importText.trim()
                      ? "bg-[var(--accent)] text-[var(--paper)] hover:opacity-90"
                      : "opacity-40 cursor-not-allowed bg-[var(--paper-subtle)] text-[var(--gray)]"
                  }`}
                >
                  {de ? "Import jetzt ausführen" : "执行导入"}
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: EXPORTIEREN */}
          {activeTab === "export" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                <h3 className="font-serif font-semibold text-sm text-[var(--ink)]">
                  {de ? "Wissensbasis exportieren & sichern" : "知识库导出与备份"}
                </h3>
                <p className="text-xs text-[var(--gray)] leading-relaxed">
                  {de
                    ? "Wählen Sie ein Fach oder exportieren Sie alle Notizen und Karten zur Weiterverwendung in Obsidian, Anki oder zur Sicherung."
                    : "支持按学科筛选或全量导出。导出的 Markdown 与 Obsidian 原生兼容，CSV 与 Anki 原生兼容。"}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <label className="space-y-1">
                  <span className="font-mono text-[11px] text-[var(--gray)]">Fach-Filter:</span>
                  <select
                    value={exportFach}
                    onChange={(e) => setExportFach(e.target.value)}
                    className="p-1.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-sans"
                  >
                    <option value="alle">{de ? "Alle Fächer" : "全部学科"}</option>
                    {FAECHER.map((f) => (
                      <option key={f.id} value={f.id}>{f.kurz} - {f.nameDE}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[var(--accent)] font-bold">[JSON BUNDLE]</span>
                    <h4 className="font-serif font-semibold text-sm">Vollständiges Lernpaket</h4>
                    <p className="text-xs text-[var(--gray)]">
                      Enthält alle Metadaten, Notizen und Karten in einem maschinenlesbaren Schema.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportJson}
                    className="w-full py-1.5 px-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] font-mono text-xs cursor-pointer"
                  >
                    JSON herunterladen -&gt;
                  </button>
                </div>

                <div className="p-4 rounded border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[var(--accent)] font-bold">[MARKDOWN BUNDLE]</span>
                    <h4 className="font-serif font-semibold text-sm">Obsidian-Notizen (.md)</h4>
                    <p className="text-xs text-[var(--gray)]">
                      Notizen mit sauberem YAML-Frontmatter für direkten Import in Obsidian-Vaults.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportMarkdownBundle}
                    className="w-full py-1.5 px-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] font-mono text-xs cursor-pointer"
                  >
                    Markdown exportieren -&gt;
                  </button>
                </div>

                <div className="p-4 rounded border border-[var(--line)] bg-[var(--surface)] flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <span className="font-mono text-[10px] text-[var(--accent)] font-bold">[ANKI CSV]</span>
                    <h4 className="font-serif font-semibold text-sm">Anki-Kartenstapel (.csv)</h4>
                    <p className="text-xs text-[var(--gray)]">
                      Semikolon-separiertes Anki-Format (Front, Back, Example, Fach, Thema).
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleExportCsv}
                    className="w-full py-1.5 px-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] font-mono text-xs cursor-pointer"
                  >
                    Anki CSV exportieren -&gt;
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: ENTWICKLER-SKELETT */}
          {activeTab === "dev" && (
            <div className="space-y-4">
              <div className="p-3.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
                <h3 className="font-serif font-semibold text-sm text-[var(--ink)]">
                  {de ? "Modulare Architektur & Entwickler-Erweiterung (BiliNote-Architekturmuster)" : "模块化骨架与开发者扩展规范 (对标 BiliNote 插件架构)"}
                </h3>
                <p className="text-xs text-[var(--gray)] leading-relaxed">
                  {de
                    ? "Entwickler können neue Schulfächer, Bewertungsoperatoren oder interaktive Labore über die Plugin-Registrierung hinzufügen, ohne die Kern-App zu verändern."
                    : "系统采用高内聚低耦合的分层架构。开发者可通过 FachRegistry 轻松注册全新学科、实验工坊或评分准则，无需侵入核心业务代码。"}
                </p>
              </div>

              <div className="p-4 rounded border border-[var(--line)] bg-[var(--surface)] space-y-3 font-mono text-xs">
                <div className="text-[var(--accent)] font-bold">// Beispiel: Neues Schulfach (z. B. Informatik) registrieren</div>
                <pre className="p-3 rounded bg-[var(--paper-subtle)] text-[var(--ink)] overflow-x-auto text-[11px] leading-relaxed">
{`import { FachRegistry } from "../framework";

FachRegistry.registerSubject({
  id: "Informatik",
  kurz: "IF",
  nameDE: "Informatik",
  nameZH: "计算机科学",
  category: "mint",
  operators: ["modellieren", "implementieren", "analysieren", "bewerten"],
  isDefault: false,
  descriptionDE: "Algorithmen, Datenstrukturen, Automatentheorie und Kryptographie.",
  descriptionZH: "算法复杂度、数据结构、有限自动机与公钥密码学。",
});`}
                </pre>
                <div className="text-[var(--gray)] text-[11px]">
                  {de
                    ? "Nach der Registrierung steht das Fach automatisch in allen Filtern, der Bibliothek und im Klausur-Simulator bereit."
                    : "注册后，新学科将自动接入导航过滤器、考点文献库、卡片背诵及会考模拟系统。"}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="p-3 sm:p-4 border-t border-[var(--line)] bg-[var(--paper-subtle)] flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--gray)]">
            {de ? "EF-GeWi-Lernvault · Modulares Framework" : "EF-GeWi-Lernvault · 模块化知识库框架"}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
          >
            {de ? "Schließen" : "完成"}
          </button>
        </footer>
      </div>
    </div>
  );
};
