import * as React from "react";
import type { Lang } from "../i18n";
import { FAECHER, getFach } from "../fach";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

export interface AppHeaderProps {
  tab: string;
  currentWorkspace: "home" | "lernen" | "wiederholen" | "ueben" | "einstellungen";
  tabLabel?: string;
  selectedFach: string;
  onSelectFach: (fach: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchRef?: React.RefObject<HTMLInputElement | null>;
  lang: Lang;
  onToggleLang?: () => void;
  onOpenKnowledgeManager: () => void;
  onOpenCoursePipeline: () => void;
  onOpenSkillTree: () => void;
  onOpenDailySprint: () => void;
  onOpenHelp: () => void;
  vaultMsg?: string | null;
  currentStreak?: number;
}

export function AppHeader({
  tab,
  currentWorkspace,
  tabLabel,
  selectedFach,
  onSelectFach,
  searchQuery,
  onSearchChange,
  searchRef,
  lang,
  onToggleLang,
  onOpenKnowledgeManager,
  onOpenCoursePipeline,
  onOpenSkillTree,
  onOpenDailySprint,
  onOpenHelp,
  vaultMsg,
  currentStreak = 0,
}: AppHeaderProps) {
  const de = lang === "de";

  const workspaceLabel =
    currentWorkspace === "lernen"
      ? de ? "Lernen" : "新知"
      : currentWorkspace === "wiederholen"
      ? de ? "Wiederholen" : "复习"
      : currentWorkspace === "ueben"
      ? de ? "Üben" : "实战"
      : currentWorkspace === "einstellungen"
      ? de ? "System" : "系统"
      : "Abitur";

  const currentFachObj = selectedFach !== "alle" ? getFach(selectedFach) : null;

  return (
    <header className="sticky top-0 z-40 flex min-h-12 w-full shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] bg-[var(--surface)]/95 px-4 py-2 backdrop-blur-[4px] sm:px-6">
      {/* 1. 左侧：高层级产品路径面包屑 (Breadcrumb) */}
      <div className="flex items-center gap-2">
        <Badge variant="secondary" className="font-mono text-[10px] tracking-wider uppercase">
          Gymnasium EF
        </Badge>
        <span className="text-slate-300 font-light text-xs">/</span>
        <span className="font-mono text-xs text-[var(--gray)] font-semibold">
          {workspaceLabel}
        </span>
        <span className="text-slate-300 font-light text-xs">/</span>
        <div className="flex items-center gap-1.5 font-serif text-xs sm:text-sm font-bold text-[var(--ink)]">
          <span>{tabLabel || tab}</span>
          {currentFachObj && (
            <Badge variant="outline" className="font-mono text-[10px] ml-1 bg-[var(--paper-subtle)] font-bold">
              {de ? currentFachObj.nameDE : currentFachObj.nameZH}
            </Badge>
          )}
        </div>
      </div>

      {/* 2. 中间：shadcn-style 全局命令与搜索触发框 (Global Command Bar) */}
      <div className="flex min-w-[200px] flex-1 items-center justify-center max-w-sm">
        <div className="relative w-full">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" />
          </svg>
          <input
            ref={searchRef}
            title="/"
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={de ? "Notiz, Begriff suchen..." : "全域检索考点、笔记或微课..."}
            className="w-full rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] pl-8 pr-8 py-1.5 font-sans text-xs text-[var(--ink)] placeholder:text-slate-400 focus:border-[var(--ink)] focus:bg-[var(--surface)] focus:outline-none transition-all"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-[var(--line)] bg-[var(--surface)] px-1.5 py-0.5 text-[9px] font-mono font-bold text-slate-400 select-none">
            /
          </kbd>
        </div>
      </div>

      {/* 3. 右侧：功能总线与快捷操作区 */}
      <div className="flex flex-wrap items-center justify-end gap-2 text-xs">
        {/* 学科快速切换胶囊 */}
        <div className="flex items-center gap-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-2 py-1">
          <label htmlFor="header-fach-select" className="font-mono text-[10px] text-[var(--gray)] font-bold">
            Fach:
          </label>
          <select
            id="header-fach-select"
            value={selectedFach}
            onChange={(e) => onSelectFach(e.target.value)}
            aria-label={de ? "Fach auswählen" : "选择学科"}
            className="border-none bg-transparent font-sans text-xs text-[var(--ink)] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="alle">{de ? "Alle Fächer (10)" : "所有学科 (10)"}</option>
            {FAECHER.map((f) => (
              <option key={f.id} value={f.id}>
                {f.kurz} · {de ? f.nameDE : f.nameZH}
              </option>
            ))}
          </select>
        </div>

        <Separator orientation="vertical" className="h-5 hidden sm:block" />

        {/* 技能树主入口 */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenSkillTree}
          title={de ? "Kompetenzbaum (Skill-Tree) öffnen" : "打开知识图谱与技能树"}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="8" cy="3.5" r="2" />
            <circle cx="4" cy="12.5" r="2" />
            <circle cx="12" cy="12.5" r="2" />
            <path d="M8 5.5v3M8 8.5L4 10.5M8 8.5l4 2" />
          </svg>
          <span className="hidden sm:inline">{de ? "Skill-Tree" : "技能树"}</span>
        </Button>

        {/* 课程工坊 */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenCoursePipeline}
          title={de ? "Kurs-Pipeline öffnen" : "书本到微课生成工坊"}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 3.5h5a2 2 0 0 1 2 2v7.5a1.5 1.5 0 0 0-1.5-1.5H2.5z" />
            <path d="M13.5 3.5h-5a2 2 0 0 0-2 2v7.5a1.5 1.5 0 0 1 1.5-1.5h5.5z" />
          </svg>
          <span className="hidden sm:inline">{de ? "Pipeline" : "微课工坊"}</span>
        </Button>

        {/* 知识库管理 */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenKnowledgeManager}
          title={de ? "Wissensbasis & Framework verwalten" : "知识库与数据资产"}
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M2.5 3.5h11M2.5 8h11M2.5 12.5h11" />
            <circle cx="5" cy="3.5" r="1" fill="currentColor" />
            <circle cx="10" cy="8" r="1" fill="currentColor" />
            <circle cx="7" cy="12.5" r="1" fill="currentColor" />
          </svg>
          <span className="hidden sm:inline">{de ? "Vault" : "知识库"}</span>
        </Button>

        {/* 每日专注冲刺 (带连打徽章) */}
        <Button
          variant="outline"
          size="sm"
          onClick={onOpenDailySprint}
          className="border-amber-300 bg-amber-50/50 hover:bg-amber-100/50 text-amber-950 font-bold"
        >
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 2.5v3M8 10.5v3M2.5 8h3M10.5 8h3" />
            <circle cx="8" cy="8" r="3.2" />
          </svg>
          <span>{de ? "Sprint" : "冲刺"}</span>
          {currentStreak > 0 && (
            <span className="ml-0.5 rounded px-1 py-0.2 font-mono text-[10px] font-extrabold text-amber-800 bg-amber-200/60">
              {currentStreak}d
            </span>
          )}
        </Button>

        <Separator orientation="vertical" className="h-5" />

        {/* 语言一键快速切换 */}
        {onToggleLang && (
          <button
            type="button"
            onClick={onToggleLang}
            className="flex items-center gap-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-subtle)] px-2 py-1 font-mono text-xs font-bold text-[var(--ink)] cursor-pointer select-none transition-all"
            title={de ? "Sprache umschalten (DE / 中文)" : "切换界面语言 (DE / 中文)"}
          >
            <span>{de ? "DE" : "中"}</span>
          </button>
        )}

        {/* 快捷键帮助 */}
        <button
          type="button"
          onClick={onOpenHelp}
          className="flex h-7 w-7 items-center justify-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-subtle)] text-xs font-mono font-bold text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer select-none transition-all"
          title={de ? "Tastaturkürzel (?)" : "键盘快捷键帮助 (?)"}
          aria-label="Help"
        >
          ?
        </button>

        {vaultMsg && (
          <span className="hidden font-mono text-[10px] text-[var(--gray)] lg:inline ml-1 truncate max-w-[120px]">
            {vaultMsg}
          </span>
        )}
      </div>
    </header>
  );
}

export default AppHeader;
