import React, { useState, useMemo } from "react";
import {
  parseBookToQuests,
  BOOK_INGEST_PRESETS,
  type ParsedBookStructure,
  type ParsedQuestNode,
  type LessonType,
} from "../engine/bookIngestParser";
import {
  generatePacingPlan,
  type PacingPlan,
  type PacingPreset,
} from "../engine/pacingPlanner";

interface BookIngestWorkshopTabProps {
  currentFach?: string;
  lang?: "de" | "zh";
  onApplyPlan?: (book: ParsedBookStructure, plan: PacingPlan) => void;
}

const FACH_OPTIONS = ["SoWi", "Deutsch", "Philosophie", "Physik", "Mathe", "Geschichte", "Englisch"];

export const BookIngestWorkshopTab: React.FC<BookIngestWorkshopTabProps> = ({
  currentFach = "SoWi",
  lang = "de",
  onApplyPlan,
}) => {
  // 表单状态
  const [selectedFach, setSelectedFach] = useState<string>(currentFach);
  const [bookTitle, setBookTitle] = useState<string>(BOOK_INGEST_PRESETS[0].title);
  const [rawText, setRawText] = useState<string>(BOOK_INGEST_PRESETS[0].rawContent);

  // 节奏规划状态
  const [pacingMode, setPacingMode] = useState<PacingPreset>("balanced");
  const [customDays, setCustomDays] = useState<number>(10);
  const [customMinutes, setCustomMinutes] = useState<number>(12);
  const [includeSpacedRepetition, setIncludeSpacedRepetition] = useState<boolean>(true);

  // 选中查看的关卡节点
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  // 解析书籍结构
  const parsedBook = useMemo(() => {
    return parseBookToQuests(bookTitle, selectedFach, rawText);
  }, [bookTitle, selectedFach, rawText]);

  // 生成节奏规划
  const pacingPlan = useMemo(() => {
    return generatePacingPlan(parsedBook, {
      mode: pacingMode,
      customDays,
      customDailyMinutes: customMinutes,
      includeSpacedRepetition,
    });
  }, [parsedBook, pacingMode, customDays, customMinutes, includeSpacedRepetition]);

  // 找到当前选中的关卡
  const selectedNode = useMemo<ParsedQuestNode | null>(() => {
    if (!selectedNodeId) return null;
    for (const chap of parsedBook.chapters) {
      for (const n of chap.nodes) {
        if (n.id === selectedNodeId) return n;
      }
    }
    return null;
  }, [selectedNodeId, parsedBook]);

  // 载入预设
  const handleLoadPreset = (presetId: string) => {
    const preset = BOOK_INGEST_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setBookTitle(preset.title);
    setSelectedFach(preset.fach);
    setRawText(preset.rawContent);
    setSelectedNodeId(null);
    setAppliedNotice(false);
  };

  const handleApply = () => {
    if (onApplyPlan) {
      onApplyPlan(parsedBook, pacingPlan);
    }
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  // 课型标记辅助
  const renderLessonTypeBadge = (type: LessonType) => {
    const label =
      type === "experiment"
        ? lang === "de" ? "Experiment" : "实验探索"
        : type === "practice"
        ? lang === "de" ? "Anwendung" : "应用演练"
        : lang === "de" ? "Konzept" : "核心概念";

    return (
      <span className="font-mono text-xs px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">
        {label}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6 text-[var(--ink)]">
      {/* 顶部横幅：工坊定位与无痛理念 */}
      <header className="border-b border-[var(--line)] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {lang === "de" ? "Buch- & Lehrplan-Zerlegungswerkstatt" : "书籍与考纲智能拆解工坊"}
          </h2>
          <p className="text-xs text-[var(--ink-muted)] mt-1 font-mono">
            {lang === "de"
              ? "Automatische DAG-Gliederung, Simulation-Matching & schmerzfreier 12-Minuten-Tagesplan."
              : "第一性原理 DAG 依赖解构 · 原生教具与微世界智能匹配 · 每日 10–15 分钟无痛节奏排程。"}
          </p>
        </div>

        {/* 预设典籍快速加载 */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-[var(--ink-muted)] font-mono mr-1">
            {lang === "de" ? "Vorlagen:" : "经典范本:"}
          </span>
          {BOOK_INGEST_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => handleLoadPreset(preset.id)}
              className="text-xs px-2 py-1 border border-[var(--line)] hover:bg-[var(--paper-subtle)] transition-colors cursor-pointer"
            >
              {preset.fach}
            </button>
          ))}
        </div>
      </header>

      {/* 主工作区：左侧输入录入，右侧拆解成果与排程 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* 左栏 (5列)：教材元数据与大纲录入 */}
        <section className="lg:col-span-5 flex flex-col gap-4 border border-[var(--line)] p-4 bg-[var(--paper)]">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider">
              {lang === "de" ? "Quelle / Eingabe" : "教材与大纲录入"}
            </span>
            <span className="text-xs font-mono text-[var(--ink-muted)]">
              {rawText.length} {lang === "de" ? "Zeichen" : "字符"}
            </span>
          </div>

          {/* 书名与学科 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col gap-1">
              <label htmlFor="book-title-input" className="text-xs font-mono text-[var(--ink-muted)]">
                {lang === "de" ? "Titel des Lehrwerks / Themas" : "书名 / 讲义主题"}
              </label>
              <input
                id="book-title-input"
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="text-sm px-2.5 py-1.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] focus:outline-none"
                placeholder={lang === "de" ? "z.B. SoWi Gesamtband EF" : "例如: 德国经济与社会总论"}
              />
            </div>
            <div className="col-span-1 flex flex-col gap-1">
              <label htmlFor="fach-select" className="text-xs font-mono text-[var(--ink-muted)]">
                {lang === "de" ? "Fach" : "所属学科"}
              </label>
              <select
                id="fach-select"
                value={selectedFach}
                onChange={(e) => setSelectedFach(e.target.value)}
                className="text-sm px-2 py-1.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] focus:outline-none"
              >
                {FACH_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 大纲与文本内容输入框 */}
          <div className="flex flex-col gap-1">
            <label htmlFor="raw-outline-textarea" className="text-xs font-mono text-[var(--ink-muted)] flex justify-between">
              <span>{lang === "de" ? "Inhaltsverzeichnis oder Textauszug" : "目录大纲或文本节选"}</span>
              <span className="text-[10px]">{lang === "de" ? "Unterstuetzt Markdown # / 1.1 / Listen" : "支持 # / 1.1 / 缩进"}</span>
            </label>
            <textarea
              id="raw-outline-textarea"
              rows={14}
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              className="text-xs font-mono p-2.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] focus:outline-none leading-relaxed resize-y"
              placeholder={
                lang === "de"
                  ? "# Kapitel 1: Thema\n## 1.1 Unterthema...\n## 1.2 Simulation..."
                  : "# 第一章: 核心主题\n## 1.1 基础概念...\n## 1.2 仿真探究..."
              }
            />
          </div>

          {/* 格式提示 */}
          <div className="p-2.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono text-[var(--ink-muted)] leading-relaxed">
            {lang === "de"
              ? "Tipp: Unser Parser erkennt automatisch Kapitel, leitet logische DAG-Voraussetzungen ab und weist jedem Schritt ein interaktives Lernwerkzeug zu."
              : "提示：解析器自动识别章节边界、构建拓扑先修关系，并为每一小节动态挂载仿真沙盘或可动逻辑组件。"}
          </div>
        </section>

        {/* 右栏 (7列)：拆解概览、无痛节奏排程与 DAG 树 */}
        <section className="lg:col-span-7 flex flex-col gap-5">
          {/* 拆解指标统计卡片 (Tufte 纸墨精简看板) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border border-[var(--line)] p-3 bg-[var(--paper)]">
            <div className="flex flex-col">
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                {lang === "de" ? "Kapitel" : "章节数"}
              </span>
              <span className="text-lg font-bold font-mono">{parsedBook.chapters.length}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                {lang === "de" ? "Mikro-Quests" : "微关卡数"}
              </span>
              <span className="text-lg font-bold font-mono">{parsedBook.totalNodes}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                {lang === "de" ? "Gesamtzeit" : "总学时"}
              </span>
              <span className="text-lg font-bold font-mono">
                {parsedBook.totalMinutes} <span className="text-xs font-normal font-sans">min</span>
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                {lang === "de" ? "DAG-Kanten" : "前置连线"}
              </span>
              <span className="text-lg font-bold font-mono">{parsedBook.dagEdgesCount}</span>
            </div>
          </div>

          {/* 无痛学习节奏规划器 (Pacing Controls) */}
          <div className="border border-[var(--line)] p-4 bg-[var(--paper)] flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                {lang === "de" ? "Lernrhythmus & Spaced Repetition" : "无痛学习节奏规划"}
              </span>
              <span className="text-xs font-mono px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
                {pacingPlan.feasibility === "optimal"
                  ? lang === "de" ? "Optimal (Flow)" : "黄金心流节奏"
                  : pacingPlan.feasibility === "dense"
                  ? lang === "de" ? "Intensiv" : "紧凑冲刺"
                  : lang === "de" ? "Leicht" : "微步慢跑"}
              </span>
            </div>

            {/* 节奏模式切换 */}
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "balanced" as const, de: "14 Tage (Balance)", zh: "14天 黄金平衡" },
                { id: "sprint" as const, de: "7 Tage (Sprint)", zh: "7天 考前冲刺" },
                { id: "marathon" as const, de: "30 Tage (Pacing)", zh: "30天 轻松精读" },
                { id: "custom" as const, de: "Benutzerdefiniert", zh: "自定义天数" },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPacingMode(m.id)}
                  className={`text-xs py-1.5 px-2 border transition-colors cursor-pointer text-center font-mono ${
                    pacingMode === m.id
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold"
                      : "border-[var(--line)] hover:bg-[var(--paper-subtle)] text-[var(--ink)]"
                  }`}
                >
                  {lang === "de" ? m.de : m.zh}
                </button>
              ))}
            </div>

            {/* 自定义参数滑块 (若为 custom) */}
            {pacingMode === "custom" && (
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[var(--line)]">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-mono">
                    <label htmlFor="custom-days-slider">{lang === "de" ? "Zieltage:" : "目标总天数:"}</label>
                    <span>{customDays} d</span>
                  </div>
                  <input
                    id="custom-days-slider"
                    type="range"
                    min={3}
                    max={45}
                    value={customDays}
                    onChange={(e) => setCustomDays(Number(e.target.value))}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between text-xs font-mono">
                    <label htmlFor="custom-minutes-slider">{lang === "de" ? "Tageslimit:" : "每日专注上限:"}</label>
                    <span>{customMinutes} min</span>
                  </div>
                  <input
                    id="custom-minutes-slider"
                    type="range"
                    min={6}
                    max={30}
                    value={customMinutes}
                    onChange={(e) => setCustomMinutes(Number(e.target.value))}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            )}

            {/* 艾宾浩斯复习插槽开关 */}
            <div className="flex items-center justify-between text-xs font-mono pt-1">
              <label htmlFor="spaced-repetition-checkbox" className="flex items-center gap-2 cursor-pointer">
                <input
                  id="spaced-repetition-checkbox"
                  type="checkbox"
                  checked={includeSpacedRepetition}
                  onChange={(e) => setIncludeSpacedRepetition(e.target.checked)}
                  className="cursor-pointer"
                />
                <span>
                  {lang === "de"
                    ? "Ebbinghaus Spaced Repetition (D+1, D+3 Blitz-Wiederholungen einweben)"
                    : "艾宾浩斯记忆强化 (自动穿插 D+1、D+3 轻量温故槽位)"}
                </span>
              </label>
              <span className="text-[var(--ink-muted)]">
                {pacingPlan.totalReviewSlots} {lang === "de" ? "Reviews" : "温故插槽"}
              </span>
            </div>

            {/* 节奏心理引导与反馈 */}
            <div className="text-xs p-2.5 border border-[var(--line)] bg-[var(--paper-subtle)] leading-relaxed">
              <span className="font-semibold">{lang === "de" ? "Pacing-Guidance: " : "节奏自适应建议: "}</span>
              <span>{lang === "de" ? pacingPlan.motivationalTip.de : pacingPlan.motivationalTip.zh}</span>
            </div>
          </div>

          {/* 每日日程预览横轴卡片 (Daily Slots Preview) */}
          <div className="border border-[var(--line)] p-4 bg-[var(--paper)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                {lang === "de"
                  ? `Zeitplan-Vorschau (${pacingPlan.targetDays} Tage)`
                  : `日程计划预览 (共 ${pacingPlan.targetDays} 天)`}
              </span>
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                {lang === "de" ? "Durchschnitt: " : "平均每日: "}
                {Math.round(parsedBook.totalMinutes / pacingPlan.targetDays)} min
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 max-h-48 overflow-y-auto pr-1">
              {pacingPlan.dailySlots.map((slot) => (
                <div
                  key={slot.dayIndex}
                  className={`border p-2 flex flex-col justify-between text-xs font-mono transition-colors ${
                    slot.isRestOrBufferDay
                      ? "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)]"
                      : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{slot.dayLabel}</span>
                    <span className="text-[10px]">{slot.totalMinutes}m</span>
                  </div>
                  <div className="mt-1 text-[11px] truncate text-[var(--ink)]" title={slot.focusGoal}>
                    {slot.newQuests.length > 0 ? slot.newQuests[0].title : slot.focusGoal}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[10px] text-[var(--ink-muted)]">
                    <span>{slot.newQuests.length} {lang === "de" ? "neu" : "新"}</span>
                    {slot.reviewQuests.length > 0 && (
                      <span className="border-b border-[var(--line)]">+{slot.reviewQuests.length} rev</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 结构化章节与关卡 DAG 列表 */}
          <div className="border border-[var(--line)] p-4 bg-[var(--paper)] flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                {lang === "de" ? "Strukturierte Kapitel & Lernpfad" : "结构化章节与微关卡网络"}
              </span>
              <span className="text-xs font-mono text-[var(--ink-muted)]">
                {lang === "de" ? "Klicke einen Knoten fuer Details" : "点击节点查看教具匹配与设问"}
              </span>
            </div>

            <div className="flex flex-col gap-4 max-h-80 overflow-y-auto pr-1">
              {parsedBook.chapters.map((chap) => (
                <div key={chap.id} className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)]">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xs font-bold font-mono tracking-wide">{chap.title}</h3>
                    <span className="text-xs font-mono text-[var(--ink-muted)]">
                      {chap.nodes.length} {lang === "de" ? "Quests" : "关卡"} · {chap.totalMinutes} min
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {chap.nodes.map((node) => {
                      const isSelected = selectedNodeId === node.id;
                      return (
                        <div
                          key={node.id}
                          onClick={() => setSelectedNodeId(node.id)}
                          className={`p-2 border text-xs cursor-pointer transition-colors ${
                            isSelected
                              ? "border-[var(--ink)] bg-[var(--paper)] ring-1 ring-[var(--ink)]"
                              : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)]"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-1 mb-1">
                            <span className="font-mono font-semibold truncate text-[var(--ink)]">
                              {node.title}
                            </span>
                            {renderLessonTypeBadge(node.lessonType)}
                          </div>
                          <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)] mt-1.5">
                            <span>{node.estimatedMinutes} min</span>
                            <span className="truncate max-w-[140px]" title={node.matchedToolName}>
                              {node.matchedToolName.split("(")[0]}
                            </span>
                          </div>
                          {node.prerequisites.length > 0 && (
                            <div className="text-[10px] font-mono text-[var(--ink-muted)] mt-1 truncate">
                              ← {lang === "de" ? "Vorwissen:" : "先修:"} {node.prerequisites.join(", ")}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 选中节点详情抽屉 (若有选中) */}
          {selectedNode && (
            <div className="border border-[var(--line)] p-4 bg-[var(--paper-subtle)] flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm">{selectedNode.title}</span>
                  {renderLessonTypeBadge(selectedNode.lessonType)}
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedNodeId(null)}
                  className="font-mono text-xs px-2 py-0.5 border border-[var(--line)] hover:bg-[var(--paper)] cursor-pointer"
                >
                  {lang === "de" ? "Schliessen" : "收起"}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div>
                  <span className="text-[var(--ink-muted)] block mb-1">
                    {lang === "de" ? "Zugeordnetes Werkzeug:" : "匹配教具/微世界:"}
                  </span>
                  <div className="p-2 border border-[var(--line)] bg-[var(--paper)] font-semibold">
                    {selectedNode.matchedToolName}
                  </div>
                </div>
                <div>
                  <span className="text-[var(--ink-muted)] block mb-1">
                    {lang === "de" ? "Sokratische Leitfrage:" : "苏格拉底导学设问:"}
                  </span>
                  <div className="p-2 border border-[var(--line)] bg-[var(--paper)] leading-relaxed">
                    {selectedNode.socraticPrompt}
                  </div>
                </div>
              </div>

              {selectedNode.keyConcepts.length > 0 && (
                <div className="mt-1 text-xs">
                  <span className="font-mono text-[var(--ink-muted)] block mb-1">
                    {lang === "de" ? "Konzept & Klausurfalle:" : "核心概念与失分陷阱:"}
                  </span>
                  <div className="p-2 border border-[var(--line)] bg-[var(--paper)] leading-relaxed flex flex-col gap-1">
                    <div>
                      <strong className="font-mono">{selectedNode.keyConcepts[0].term}: </strong>
                      <span>{selectedNode.keyConcepts[0].definitionDE}</span>
                    </div>
                    <div className="text-[var(--ink-muted)] text-[11px] font-mono">
                      ↳ {selectedNode.keyConcepts[0].analogy}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 确认导入与应用行动栏 */}
          <div className="flex items-center justify-between pt-2">
            <div>
              {appliedNotice && (
                <span className="font-mono text-xs text-[var(--ink)] border border-[var(--line)] px-2 py-1 bg-[var(--paper-subtle)]">
                  {lang === "de" ? "Plan erfolgreich übernommen!" : "计划已成功载入研习专区！"}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={handleApply}
              className="px-4 py-2 bg-[var(--ink)] text-[var(--paper)] text-sm font-semibold border border-[var(--ink)] hover:bg-[var(--paper)] hover:text-[var(--ink)] transition-colors cursor-pointer flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M3 8.5l3.5 3.5 6.5-7" />
              </svg>
              <span>
                {lang === "de"
                  ? "In Lehrplan & Quest-Map übernehmen"
                  : "载入研习计划与探索图谱"}
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};
