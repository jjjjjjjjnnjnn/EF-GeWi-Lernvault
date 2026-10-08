import { useEffect } from "react";
import type { Lang } from "../i18n";
import { SkillTreeCanvas } from "./SkillTreeCanvas";
import type { SubjectKey } from "../engine/skillTree";

export interface SkillTreeModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly lang?: Lang;
  readonly initialFach?: SubjectKey;
  readonly onStartCourse?: (reiseId: string) => void;
  readonly onOpenNote?: (noteId: string) => void;
  readonly onOpenTool?: (toolId: string) => void;
}

export function SkillTreeModal({
  isOpen,
  onClose,
  lang = "zh",
  initialFach = "SoWi",
  onStartCourse,
  onOpenNote,
  onOpenTool,
}: SkillTreeModalProps) {
  const de = lang === "de";

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-[var(--surface)] text-[var(--ink)] animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-label={de ? "Kompetenz- & Wissensbaum" : "学科知识图谱与技能树"}
      data-testid="skill-tree-modal"
    >
      {/* 极简 Tufte 顶栏 */}
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-2.5 bg-[var(--surface)] shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
            Knowledge Graph & Skill Tree
          </span>
          <span className="text-[var(--line)]">|</span>
          <h2 className="font-serif text-base font-bold text-[var(--ink)]">
            {de ? "Fächerübergreifender Wissens- & Kompetenzbaum" : "学科知识图谱与前置解锁技能树"}
          </h2>
          <span className="hidden md:inline-block font-mono text-xs text-[var(--gray)]">
            {de
              ? "Prerequisite DAG • Hot-Pluggable • NRW Oberstufe"
              : "前置解锁状态机 • 节点随时拼插 • 北威州考纲"}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline font-mono text-[11px] text-[var(--gray)]">
            [ESC {de ? "zum Schließen" : "退出"}]
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex items-center justify-center w-7 h-7 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--paper-subtle)] transition-colors cursor-pointer"
            aria-label={de ? "Schließen" : "关闭"}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 3l10 10M13 3L3 13" />
            </svg>
          </button>
        </div>
      </div>

      {/* 技能树主画布区域 */}
      <div className="flex-1 w-full h-full overflow-hidden">
        <SkillTreeCanvas
          lang={lang}
          initialFach={initialFach}
          onStartCourse={(courseId) => {
            onClose();
            onStartCourse?.(courseId);
          }}
          onOpenNote={(noteId) => {
            onClose();
            onOpenNote?.(noteId);
          }}
          onOpenTool={(toolId) => {
            onClose();
            onOpenTool?.(toolId);
          }}
          className="h-full"
        />
      </div>
    </div>
  );
}
