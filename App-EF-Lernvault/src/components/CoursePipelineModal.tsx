import React, { useState } from "react";
import type { Lang } from "../i18n";
import { FAECHER } from "../fach";
import {
  runCourseSeriesPipeline,
  type BookInput,
  type CoursePack,
  type GeneratedEpisode,
  type GamificationStyle,
} from "../engine/coursePipeline";

export interface CoursePipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Lang;
  onLaunchCourse?: (rawMarkdown: string) => void;
}

const PRESET_BOOKS: { labelZH: string; labelDE: string; input: BookInput }[] = [
  {
    labelZH: "SoWi 经济政策与市场 (EF)",
    labelDE: "SoWi Wirtschaftspolitik EF",
    input: {
      title: "Wirtschaftspolitik und Soziale Marktwirtschaft",
      fach: "SoWi",
      level: 1,
      gamificationStyle: "adventure",
      rawText: `
## Kapitel 1: Markt und Staat
- Das Magische Viereck im Zielkonflikt
- Marktversagen und externe Effekte
## Kapitel 2: Geldpolitik und Finanzkrisen
- EZB-Leitzins und Transmission
- Inflationsbekämpfung und Preisstabilität
## Kapitel 3: Sozialstaat und Umverteilung
- Gini-Koeffizient und Ungleichheit
- Steuerreform und Transferleistungen
      `,
    },
  },
  {
    labelZH: "Philosophie 实践理性与道德 (EF)",
    labelDE: "Philosophie Praktische Vernunft EF",
    input: {
      title: "Einführung in die praktische Philosophie",
      fach: "Philosophie",
      level: 2,
      gamificationStyle: "investigation",
      rawText: `
## Kapitel 1: Das Gewissen und die Freiheit
- Willensfreiheit vs. Determinismus
- Der kategorische Imperativ nach Kant
## Kapitel 2: Utilitarismus und Gemeinwohl
- Bentham und Mill: Das größte Glück
- Das Trolley-Dilemma in der modernen Ethik
      `,
    },
  },
  {
    labelZH: "Mathe 微积分与导数入门 (EF)",
    labelDE: "Mathematik Differentialrechnung EF",
    input: {
      title: "Analysis: Differentialrechnung verstehen",
      fach: "Mathe",
      level: 1,
      gamificationStyle: "sandbox",
      rawText: `
## Kapitel 1: Von der Sekante zur Tangente
- Differenzenquotient und mittlere Steigung
- Ableitung an einer Stelle und Tangentengleichung
## Kapitel 2: Kurvendiskussion und Optimierung
- Kriterien für Extremstellen
- Extremwertprobleme mit Nebenbedingungen
      `,
    },
  },
  {
    labelZH: "Bio 细胞与物质运输 (EF)",
    labelDE: "Biologie Zellbiologie & Transport EF",
    input: {
      title: "Zellbiologie: Membranen und Stoffwechsel",
      fach: "Bio",
      level: 1,
      gamificationStyle: "adventure",
      rawText: `
## Kapitel 1: Die Biomembran als dynamische Barriere
- Das Flüssig-Mosaik-Modell
- Diffusion und Carrier-Transport
## Kapitel 2: Wasserhaushalt und osmotische Systeme
- Osmose und Turgor im Experiment
- Grenzplasmolyse und Wasserpotenzial
      `,
    },
  },
];

export const CoursePipelineModal: React.FC<CoursePipelineModalProps> = ({
  isOpen,
  onClose,
  lang = "zh",
  onLaunchCourse,
}) => {
  const de = lang === "de";

  const [bookTitle, setBookTitle] = useState("Soziale Marktwirtschaft & Wirtschaftspolitik");
  const [fach, setFach] = useState("SoWi");
  const [level, setLevel] = useState(1);
  const [style, setStyle] = useState<GamificationStyle>("adventure");
  const [rawText, setRawText] = useState(`## Kapitel 1: Grundlagen
- Magisches Viereck im Zielkonflikt
- Marktversagen und Staat
## Kapitel 2: Krisenmanagement
- EZB-Leitzinspolitik
- Staatsverschuldung und Schuldenbremse`);

  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPack, setGeneratedPack] = useState<CoursePack | null>(null);
  const [selectedEpisode, setSelectedEpisode] = useState<GeneratedEpisode | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  if (!isOpen) return null;

  const handleApplyPreset = (preset: (typeof PRESET_BOOKS)[0]) => {
    setBookTitle(preset.input.title);
    setFach(preset.input.fach);
    setLevel(preset.input.level || 1);
    setStyle(preset.input.gamificationStyle || "adventure");
    setRawText(preset.input.rawText || "");
  };

  const handleRunPipeline = () => {
    setIsGenerating(true);
    try {
      const pack = runCourseSeriesPipeline({
        title: bookTitle.trim() || `Lehrbuch ${fach}`,
        fach,
        level,
        gamificationStyle: style,
        rawText,
      });
      setGeneratedPack(pack);
      setSelectedEpisode(pack.episodes[0] || null);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyMarkdown = (content: string) => {
    navigator.clipboard?.writeText(content);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex h-[92vh] w-full max-w-6xl flex-col rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] shadow-none overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 顶部标题栏 */}
        <header className="flex shrink-0 items-center justify-between border-b border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
              Course-Series Pipeline
            </span>
            <span className="text-[var(--line)]">|</span>
            <h2 className="font-serif text-base font-bold text-[var(--ink)]">
              {de ? "Kurs-Generator & Buch-Pipeline" : "书本 ➔ 趣味互动课程集生成流水线"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-[var(--line)] px-2.5 py-1 font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
          >
            {de ? "Schließen" : "关闭 (ESC)"}
          </button>
        </header>

        {/* 主工作区 */}
        <div className="flex flex-1 min-h-0 divide-x divide-[var(--line)] overflow-hidden">
          {/* 左栏：书本输入与流水线参数配置 (380px) */}
          <div className="w-80 sm:w-96 shrink-0 flex flex-col min-h-0 bg-[var(--surface)] overflow-y-auto p-4 space-y-4">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)]">
                {de ? "SCHNELLVORLAGEN" : "经典教材样例预设"}
              </div>
              <div className="mt-1.5 flex flex-wrap gap-1">
                {PRESET_BOOKS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(p)}
                    className="rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-[11px] font-sans text-[var(--ink)] hover:border-[var(--accent)] cursor-pointer"
                  >
                    {de ? p.labelDE : p.labelZH}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-2 border-t border-[var(--line)]">
              <div>
                <label className="block font-mono text-[11px] text-[var(--gray)]">
                  {de ? "Buchtitel / Lehrwerk:" : "书名 / 讲义名称："}
                </label>
                <input
                  type="text"
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  className="mt-1 w-full rounded border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1.5 font-sans text-xs text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
                  placeholder="z. B. SoWi EF Wirtschaftspolitik"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-mono text-[11px] text-[var(--gray)]">
                    {de ? "Fach:" : "对应学科："}
                  </label>
                  <select
                    value={fach}
                    onChange={(e) => setFach(e.target.value)}
                    className="mt-1 w-full rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1.5 font-sans text-xs text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none cursor-pointer"
                  >
                    {FAECHER.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.kurz} · {de ? f.nameDE : f.nameZH}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] text-[var(--gray)]">
                    {de ? "Gamification-Stil:" : "趣味化风格："}
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value as GamificationStyle)}
                    className="mt-1 w-full rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1.5 font-sans text-xs text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none cursor-pointer"
                  >
                    <option value="adventure">{de ? "Abenteuer / Krise" : "剧情危机冒险型"}</option>
                    <option value="investigation">{de ? "Ermittlung / Debatte" : "审判探案辩证型"}</option>
                    <option value="sandbox">{de ? "Labor / Sandkasten" : "沙盘实验探索型"}</option>
                    <option value="speedrun">{de ? "Klausur-Speedrun" : "会考满分速通型"}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-mono text-[11px] text-[var(--gray)]">
                  {de ? "Inhaltsverzeichnis / Buch-Auszug:" : "书籍目录提纲 / 章节核心大纲："}
                </label>
                <textarea
                  rows={9}
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  placeholder="## Kapitel 1: ...&#10;- Lektion 1.1&#10;- Lektion 1.2"
                  className="mt-1 w-full rounded border border-[var(--line)] bg-[var(--paper)] p-2.5 font-mono text-xs text-[var(--ink)] leading-relaxed focus:border-[var(--accent)] focus:outline-none resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleRunPipeline}
                disabled={isGenerating}
                className="w-full rounded border border-[var(--ink)] bg-[var(--ink)] px-4 py-2 font-mono text-xs font-medium text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer disabled:opacity-50"
              >
                {isGenerating
                  ? de
                    ? "Pipeline läuft..."
                    : "流水线编译中..."
                  : de
                  ? "-> Vollständige Kursserie generieren"
                  : "-> 启动流水线生成全套课程集"}
              </button>
            </div>
          </div>

          {/* 右栏：生成的课程集成果大厅与战役闯关地图 */}
          <div className="flex-1 min-w-0 flex flex-col min-h-0 bg-[var(--paper)] overflow-hidden">
            {generatedPack ? (
              <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* 课程集战役横幅 */}
                <div className="shrink-0 border-b border-[var(--line)] bg-[var(--paper)] px-6 py-4 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[var(--accent)] font-semibold uppercase">
                      Campaign: {generatedPack.campaignTitle}
                    </span>
                    <span className="font-mono text-xs text-[var(--gray)]">
                      {generatedPack.totalEpisodes} {de ? "Episoden" : "个关卡"} · {generatedPack.totalXp} XP
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-bold text-[var(--ink)]">
                    {generatedPack.bookTitle}
                  </h3>
                  <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[11px] text-[var(--gray)]">
                    <span className="rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5">
                      {de ? "Fach:" : "学科:"} {generatedPack.fach}
                    </span>
                    <span className="rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5">
                      {de ? "Stil:" : "风格:"} {generatedPack.gamificationStyle}
                    </span>
                    <span className="rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5">
                      {generatedPack.targetAudience}
                    </span>
                  </div>
                </div>

                {/* 下部双栏：左边关卡战役地图，右边关卡剧本与教具详情 */}
                <div className="flex-1 flex min-h-0 divide-x divide-[var(--line)] overflow-hidden">
                  {/* 关卡列表 (Quest Map) */}
                  <div className="w-72 sm:w-80 shrink-0 overflow-y-auto divide-y divide-[var(--line)] bg-[var(--surface)]">
                    {generatedPack.episodes.map((ep) => {
                      const isSelected = selectedEpisode?.id === ep.id;
                      return (
                        <div
                          key={ep.id}
                          onClick={() => setSelectedEpisode(ep)}
                          className={`p-3 cursor-pointer text-left transition-colors ${
                            isSelected
                              ? "bg-[var(--paper)] border-l-2 border-l-[var(--accent)]"
                              : "hover:bg-[var(--paper)]/60"
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono text-[var(--gray)]">
                            <span>Episode {ep.episodeNumber}</span>
                            <span>+{ep.xp} XP</span>
                          </div>
                          <div className="mt-1 font-serif text-xs font-semibold text-[var(--ink)] line-clamp-1">
                            {ep.episodeTitle}
                          </div>
                          <div className="mt-1 flex items-center gap-1 font-mono text-[10px] text-[var(--accent)]">
                            <span className="truncate">Werkzeug: {ep.matchedToolId}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 选中关卡详情视窗 */}
                  {selectedEpisode ? (
                    <div className="flex-1 min-w-0 flex flex-col min-h-0 overflow-hidden bg-[var(--paper)]">
                      {/* 关卡行动头 */}
                      <div className="shrink-0 border-b border-[var(--line)] bg-[var(--surface)] px-6 py-3 flex items-center justify-between gap-3">
                        <div>
                          <div className="font-mono text-[10px] text-[var(--gray)] uppercase">
                            Episode {selectedEpisode.episodeNumber} · {selectedEpisode.matchedToolName}
                          </div>
                          <h4 className="font-serif text-base font-bold text-[var(--ink)] mt-0.5">
                            {selectedEpisode.episodeTitle}
                          </h4>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleCopyMarkdown(selectedEpisode.markdownContent)}
                            className="rounded border border-[var(--line)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] cursor-pointer"
                          >
                            {copiedNotification ? (de ? "Kopiert!" : "已复制!") : (de ? "Markdown kopieren" : "复制脚本")}
                          </button>
                          {onLaunchCourse && (
                            <button
                              type="button"
                              onClick={() => {
                                onLaunchCourse(selectedEpisode.markdownContent);
                                onClose();
                              }}
                              className="rounded border border-[var(--ink)] bg-[var(--ink)] px-3 py-1 font-mono text-xs text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
                            >
                              {de ? "Im Lernstudio starten ->" : "在研习室启动这节课 ->"}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* 关卡内容滚动区 */}
                      <div className="flex-1 min-h-0 overflow-y-auto p-6 space-y-4">
                        {/* 危机 Hook 卡片 */}
                        <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
                          <div className="flex items-center justify-between font-mono text-[11px] text-[var(--accent)] font-semibold">
                            <span>{de ? "KRISEN-SITUATION (HOOK)" : "[CRISIS-HOOK] 关卡危机情境"}</span>
                            <span>{de ? "Rolle:" : "扮演角色:"} {selectedEpisode.role}</span>
                          </div>
                          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
                            {selectedEpisode.crisisHook}
                          </p>
                        </div>

                        {/* 匹配的互动教具 */}
                        <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
                          <div className="font-mono text-[11px] text-[var(--gray)] uppercase">
                            {de ? "Interaktives Werkzeug" : "匹配的互动实验沙盘 / 思维教具"}
                          </div>
                          <div className="font-serif text-sm font-semibold text-[var(--ink)]">
                            {selectedEpisode.matchedToolName} ({selectedEpisode.matchedToolId})
                          </div>
                          <p className="font-sans text-xs text-[var(--gray)] leading-relaxed">
                            {de
                              ? "Dieses Modul wird im 4. Schritt direkt eingebunden und liefert handlungsorientierte Parameterjustierung für Schüler."
                              : "该教具已在第 4 步无缝嵌入，学生可以通过滑块参数调节直接推演理论模型。"}
                          </p>
                        </div>

                        {/* 8 步完整脚本概览 */}
                        <div className="space-y-2 pt-2 border-t border-[var(--line)]">
                          <div className="font-mono text-[11px] text-[var(--gray)] uppercase">
                            {de ? "8-Schritte-Lernreise-Struktur (Vorschau)" : "8步互动微课脚本规范 (Lesson-v3 预览)"}
                          </div>
                          <pre className="rounded border border-[var(--line)] bg-[var(--surface)] p-4 font-mono text-[11px] leading-relaxed text-[var(--ink)] overflow-x-auto max-h-80 whitespace-pre-wrap">
                            {selectedEpisode.markdownContent}
                          </pre>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ) : (
              /* 空状态占位引导 */
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full border border-[var(--line)] flex items-center justify-center text-[var(--gray)] font-mono text-xs">
                  <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v6M5 8h6" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg font-semibold text-[var(--ink)]">
                  {de ? "Keine Kursserie generiert" : "准备好你的第一套互动课程集"}
                </h3>
                <p className="font-sans text-xs text-[var(--gray)] max-w-md leading-relaxed">
                  {de
                    ? "Wähle links eine Schnellvorlage oder trage dein eigenes Lehrwerk ein. Die Pipeline erzeugt automatisch voll interaktive Episoden inklusive Werkzeuge, Krisen-Hooks und Klausurtransfer."
                    : "在左侧选择经典教材样例或粘贴任意书本提纲。流水线将自动解构章节，赋予沉浸式危机世界观，装配互动实验教具，并编译为 8 步闯关微课。"}
                </p>
                <button
                  type="button"
                  onClick={handleRunPipeline}
                  className="rounded border border-[var(--ink)] bg-[var(--ink)] px-4 py-2 font-mono text-xs text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer"
                >
                  {de ? "Demo-Pipeline mit SoWi starten" : "体验生成一套 SoWi 课程集 ->"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
