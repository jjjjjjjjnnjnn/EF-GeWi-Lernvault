import React, { useState } from "react";
import type { ParsedQuestNode } from "../../engine/bookIngestParser";

export interface VictoryRewardScreenProps {
  questNode: ParsedQuestNode;
  earnedXp: number;
  streakDays: number;
  mistakes: string[];
  lang?: "de" | "zh";
  onContinue: () => void;
  onReviewQuest: () => void;
}

export const VictoryRewardScreen: React.FC<VictoryRewardScreenProps> = ({
  questNode,
  earnedXp,
  streakDays,
  mistakes,
  lang = "de",
  onContinue,
  onReviewQuest,
}) => {
  const [copiedPatch, setCopiedPatch] = useState(false);
  const [downloadedPatch, setDownloadedPatch] = useState(false);
  const [showReviewDrawer, setShowReviewDrawer] = useState(false);

  // 生成标准的 Obsidian Fehlerlog Markdown 表格补丁行
  const generateFehlerlogPatch = () => {
    const today = new Date().toISOString().split("T")[0];
    const trap = mistakes[0] || "Fehlerquellen-Verwechslung";
    return `| ${today} | ${questNode.title} | ${trap} | 11 NP -> 15 NP | Begriffsdefinition & AFB II Kausalkette nachgeschlagen |`;
  };

  const handleCopyPatch = () => {
    const patch = generateFehlerlogPatch();
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(patch);
      setCopiedPatch(true);
      setTimeout(() => setCopiedPatch(false), 2500);
    }
  };

  const handleDownloadPatch = () => {
    const patch = generateFehlerlogPatch();
    if (typeof document !== "undefined") {
      const blob = new Blob([patch + "\n"], { type: "text/markdown;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Fehlerlog-${questNode.id}-${new Date().toISOString().split("T")[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setDownloadedPatch(true);
      setTimeout(() => setDownloadedPatch(false), 2500);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[460px] p-6 max-w-xl mx-auto text-[var(--ink)] text-center animate-fadeIn">
      {/* 墨水印章仪式徽标 (Tufte 印章风格) */}
      <div className="relative mb-6 border-2 border-[var(--ink)] px-6 py-2.5 bg-[var(--paper)]">
        <span className="font-mono text-xs uppercase tracking-widest font-bold">
          {lang === "de" ? "MEISTERHAFT ABGESCHLOSSEN" : "关卡圆满达成 · 15 NP 会考认证"}
        </span>
        <div className="text-[10px] font-mono text-[var(--ink-muted)] mt-0.5">
          KLP NRW STANDARDS · VALIDIERT
        </div>
      </div>

      {/* 关卡标题 */}
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight mb-2">
        {questNode.title}
      </h2>
      <p className="text-xs text-[var(--ink-muted)] font-mono mb-8 max-w-md">
        {lang === "de"
          ? "Alle 5 Stufen erfolgreich gemeistert. Die Kausalverknüpfungen wurden im Wissensbaum freigeschaltet."
          : "全部 5 步递进式研习与微世界挑战顺利通关。后置关联知识点与技能树实线已同步点亮。"}
      </p>

      {/* 核心奖赏与多巴胺数字看板 (Tufte 风格) */}
      <div className="grid grid-cols-3 gap-3 w-full mb-8">
        {/* 经验值 XP 奖赏 */}
        <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)] flex flex-col items-center">
          <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase">
            {lang === "de" ? "Erfahrung" : "获得经验"}
          </span>
          <span className="text-xl font-bold font-mono mt-1 text-[var(--ink)]">
            +{earnedXp} <span className="text-xs font-normal">XP</span>
          </span>
        </div>

        {/* 连续学习天数 Streak */}
        <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)] flex flex-col items-center">
          <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase">
            {lang === "de" ? "Streak-Status" : "连击天数"}
          </span>
          <span className="text-xl font-bold font-mono mt-1 flex items-center gap-1 text-[var(--ink)]">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" stroke="none" aria-hidden="true">
              <path d="M8 1c.5 2 2 3.5 2 6 0 2.2-1.8 4-4 4s-4-1.8-4-4c0-2.5 1.5-4 2-6 .5 1.5 1.5 2.5 2 3 .5-.5 1.5-1.5 2-3z" />
            </svg>
            <span>{streakDays} <span className="text-xs font-normal">Tage</span></span>
          </span>
        </div>

        {/* 考纲战力掌握提升 */}
        <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)] flex flex-col items-center">
          <span className="text-[10px] font-mono text-[var(--ink-muted)] uppercase">
            {lang === "de" ? "Status" : "掌握状态"}
          </span>
          <span className="text-sm font-bold font-mono mt-1.5 text-[var(--ink)]">
            100% Gekonnt
          </span>
        </div>
      </div>

      {/* 错题回顾与 Obsidian Fehlerlog.md 一键补丁 (若有错题) */}
      {mistakes.length > 0 && (
        <div className="w-full border border-[var(--line)] p-3.5 bg-[var(--paper-subtle)] mb-8 text-left text-xs font-mono">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <span className="font-bold">
              {lang === "de" ? "Fehlerprotokoll-Patch bereit:" : "已自动生成错题本补丁 (Fehlerlog):"}
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleCopyPatch}
                className="px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] active:translate-y-[1px] transition-all cursor-pointer text-[11px]"
              >
                {copiedPatch
                  ? lang === "de" ? "Kopiert!" : "已复制到剪贴板！"
                  : lang === "de" ? "Patch kopieren" : "复制 Markdown 行"}
              </button>
              <button
                type="button"
                onClick={handleDownloadPatch}
                className="px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] active:translate-y-[1px] transition-all cursor-pointer text-[11px]"
              >
                {downloadedPatch
                  ? lang === "de" ? "Heruntergeladen!" : "已下载！"
                  : lang === "de" ? ".md Herunterladen" : "导出 .md 补丁"}
              </button>
            </div>
          </div>
          <div className="p-2 border border-[var(--line)] bg-[var(--paper)] text-[11px] overflow-x-auto whitespace-pre">
            {generateFehlerlogPatch()}
          </div>
          <p className="text-[10px] text-[var(--ink-muted)] mt-1.5">
            {lang === "de"
              ? "Kopiere diese Zeile in dein Obsidian Vault -> Klausur-Training/Fehlerlog.md."
              : "点击上方按钮复制此行，可直接粘贴进 Obsidian 的 Klausur-Training/Fehlerlog.md 错题本。"}
          </p>

          {/* 迷你内嵌错题审阅抽屉 (Inline Review Drawer) */}
          <div className="mt-2.5 pt-2 border-t border-[var(--line)]">
            <button
              type="button"
              onClick={() => setShowReviewDrawer((prev) => !prev)}
              className="text-[10px] text-[var(--ink)] font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{showReviewDrawer ? "[-]" : "[+]"}</span>
              <span>
                {lang === "de"
                  ? `Fehlerdiagnose im Detail ansehen (${mistakes.length})`
                  : `展开会话错题归因审阅 (${mistakes.length})`}
              </span>
            </button>
            {showReviewDrawer && (
              <div className="mt-2 space-y-1.5 pl-2 border-l-2 border-[var(--ink)] bg-[var(--paper)] p-2">
                {mistakes.map((m, idx) => (
                  <div key={idx} className="text-[11px] text-[var(--ink)]">
                    <span className="font-bold text-[var(--ink-muted)]">#{idx + 1} </span>
                    <span>{m}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 主动线行动按钮 (多邻国式沉浸继续) */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
        <button
          type="button"
          onClick={onReviewQuest}
          className="w-full sm:w-1/3 py-2.5 px-4 border border-[var(--line)] hover:border-[var(--ink)] active:translate-y-[1px] text-xs font-mono transition-all cursor-pointer"
        >
          {lang === "de" ? "Lektion wiederholen" : "温故再练一次"}
        </button>
        <button
          type="button"
          onClick={onContinue}
          className="w-full sm:w-2/3 py-2.5 px-6 bg-[var(--ink)] text-[var(--paper)] text-sm font-bold border-2 border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] active:translate-y-[1px] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <span>{lang === "de" ? "Weiter zum nächsten Quest" : "继续攻坚下一关"}</span>
          <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
    </div>
  );
};
