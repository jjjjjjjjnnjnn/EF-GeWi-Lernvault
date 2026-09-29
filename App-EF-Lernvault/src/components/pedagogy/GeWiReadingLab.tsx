// GeWiReadingLab — 通用文科学术原典精读与六维会考解剖工坊
// 专为北威州高中会考（Gymnasiale Oberstufe: EF / Q1 Klausur Aufgabentyp 1A / Textanalyse）设计
// 严格遵循 Tufte 纯色沉浸规范：去框化纯色水彩底印、舒朗呼吸双栏、单题聚焦深入解析

import { useState, useRef } from "react";
import type { Lang } from "../../i18n";
import { GEWI_TEXT_REGISTRY } from "../../data/readingLabRegistry";

export interface GeWiReadingLabProps {
  lang: Lang;
  defaultExcerptId?: string;
  filterFach?: "Deutsch" | "Philosophie" | "SoWi" | "Englisch" | "alle";
  compact?: boolean;
}

export function GeWiReadingLab({
  lang,
  defaultExcerptId,
  filterFach = "alle",
  compact = false,
}: GeWiReadingLabProps) {
  const de = lang === "de";

  // 根据学科筛选可用篇目
  const availableExcerpts = GEWI_TEXT_REGISTRY.filter((ex) => {
    if (filterFach === "alle") return true;
    return ex.fach === filterFach;
  });

  // 默认激活选段
  const initialExcerptId =
    defaultExcerptId && availableExcerpts.some((e) => e.id === defaultExcerptId)
      ? defaultExcerptId
      : availableExcerpts[0]?.id || "faust-monolog";

  const [selectedExcerptId, setSelectedExcerptId] = useState<string>(initialExcerptId);
  const activeExcerpt =
    availableExcerpts.find((e) => e.id === selectedExcerptId) ?? availableExcerpts[0] ?? GEWI_TEXT_REGISTRY[0];

  // 当前激活选中的诗行号（用于左侧点亮与右侧详情联动）
  const [activeVerseNum, setActiveVerseNum] = useState<number>(
    activeExcerpt.verses[0]?.lineNum || 1
  );

  // 诗句滚动容器引用与各诗句节点引用
  const verseListRef = useRef<HTMLDivElement | null>(null);
  const verseRefs = useRef<Record<number, HTMLDivElement | null>>({});

  // 诊断面板分段胶囊
  const [activeDiagTab, setActiveDiagTab] = useState<"anchor" | "distractors" | "context" | "muster" | "all">("anchor");

  // 用户的答题记录
  const [answers, setAnswers] = useState<Record<string, string>>({});
  // 复制提示
  const [copiedId, setCopiedId] = useState<string | null>(null);
  // 当前聚焦的考题索引 (0 - N)
  const [focusIndex, setFocusIndex] = useState<number>(0);

  const activeVerse =
    activeExcerpt.verses.find((v) => v.lineNum === activeVerseNum) ?? activeExcerpt.verses[0];
  const currentQ = activeExcerpt.questions[focusIndex] || activeExcerpt.questions[0];

  // 选段切换处理：重置诗行、题目索引并滚动至顶部
  const handleSelectExcerpt = (id: string) => {
    setSelectedExcerptId(id);
    const target = availableExcerpts.find((e) => e.id === id) ?? availableExcerpts[0];
    if (target && target.verses[0]) {
      setActiveVerseNum(target.verses[0].lineNum);
    }
    setFocusIndex(0);
    if (verseListRef.current) {
      verseListRef.current.scrollTop = 0;
    }
  };

  const handleCopySentence = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // 解析长篇诊断文案为结构化区块
  const parseExplanationSections = (text: string) => {
    const anchorMatch = text.match(/【✅ 正解依据与文本锚点】([\s\S]*?)(?=【❌ 干扰项逐项诊断】|$)/);
    const distractorsMatch = text.match(/【❌ 干扰项逐项诊断】([\s\S]*?)(?=【🏛 时代思潮与哲学脉络】|$)/);
    const contextMatch = text.match(/【🏛 时代思潮与哲学脉络】([\s\S]*?)$/);

    return {
      anchor: anchorMatch ? anchorMatch[1].trim() : text,
      distractors: distractorsMatch ? distractorsMatch[1].trim() : "",
      context: contextMatch ? contextMatch[1].trim() : "",
      full: text,
    };
  };

  const diagSections = parseExplanationSections(currentQ?.explanationZH || "");

  // 渲染诗句原著卷轴（去框化纯色高亮、舒朗行间距）
  const renderVerseScroll = (heightClass: string = "h-[500px]") => (
    <div
      ref={verseListRef}
      className={`rounded-xl border border-[var(--line)]/70 bg-[var(--paper)] p-3.5 sm:p-4 shadow-xs font-serif ${heightClass} overflow-y-auto select-none scroll-smooth`}
    >
      {activeExcerpt.verses.map((verse) => {
        const isSelected = verse.lineNum === activeVerseNum;
        const hasStilmittel = !!verse.stilmittel;
        const hasVocab = !!verse.vocab;

        let highlightBg = "";
        if (isSelected) {
          highlightBg = "bg-amber-200/70 text-amber-950 font-medium";
        } else if (hasStilmittel) {
          highlightBg = "bg-amber-100/60 text-stone-900";
        } else if (hasVocab) {
          highlightBg = "bg-sky-100/60 text-stone-900";
        } else {
          highlightBg = "hover:bg-[var(--surface)] text-[var(--ink)]";
        }

        return (
          <div
            key={verse.lineNum}
            ref={(el) => {
              verseRefs.current[verse.lineNum] = el;
            }}
            onClick={() => setActiveVerseNum(verse.lineNum)}
            className={`group py-1.5 px-2.5 rounded transition-colors cursor-pointer flex items-baseline gap-2.5 text-[14px] sm:text-[15px] leading-[1.8] ${highlightBg}`}
          >
            {/* 行号 */}
            <span className="font-mono text-[11px] text-[var(--gray)]/60 w-8 shrink-0 text-right select-none">
              {verse.lineNum % 5 === 0 || isSelected ? verse.lineNum : ""}
            </span>

            {/* 德语原诗 + 纯色微标 (无边框方框) */}
            <div className="flex-1 min-w-0 flex items-baseline justify-between gap-2">
              <div className="min-w-0">
                <span className={`tracking-wide ${hasStilmittel ? "font-serif text-amber-950 font-medium" : "text-[var(--ink)]"}`}>
                  {verse.textDE}
                </span>
                <span className="ml-2.5 font-sans text-xs text-[var(--gray)] opacity-0 group-hover:opacity-100 transition-opacity">
                  // {verse.translationZH}
                </span>
              </div>

              {/* 纯色极简标示：无边框无方框 */}
              <div className="flex items-center gap-2 shrink-0 text-[10px] select-none">
                {hasStilmittel && (
                  <span
                    className="text-amber-800 font-mono text-[10px] font-medium tracking-tight"
                    title={verse.stilmittel?.type}
                  >
                    § {verse.stilmittel?.type.split("(")[0].replace("&", "+").trim()}
                  </span>
                )}
                {hasVocab && (
                  <span
                    className="text-sky-800 font-mono text-[10px] font-medium tracking-tight"
                    title={verse.vocab?.word}
                  >
                    📖 {verse.vocab?.word}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  // 渲染显微镜解析抽屉（舒朗统一单卡，消除嵌套方框）
  const renderMicroscope = () => (
    activeVerse && (
      <div className="rounded-xl border border-[var(--line)]/70 bg-[var(--surface)] p-4 space-y-2.5 shadow-xs font-sans text-xs">
        <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-1.5">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-[var(--ink)]">
              {de ? "Zeile" : "诗行"} {activeVerse.lineNum} // {de ? "Detail-Analyse" : "逐行显微镜精析"}
            </span>
            {activeVerse.toneCategory && (
              <span
                className={`font-mono text-[10px] px-2 py-0.5 rounded border ${
                  activeVerse.toneCategory === "krise" || activeVerse.toneCategory === "existenz"
                    ? "bg-rose-50 text-rose-900 border-rose-200"
                    : activeVerse.toneCategory === "spott"
                    ? "bg-purple-50 text-purple-900 border-purple-200"
                    : activeVerse.toneCategory === "autoritaet"
                    ? "bg-blue-50 text-blue-900 border-blue-200"
                    : "bg-emerald-50 text-emerald-900 border-emerald-200"
                }`}
              >
                {activeVerse.toneCategory === "krise"
                  ? de ? "Krise" : "认知绝望"
                  : activeVerse.toneCategory === "existenz"
                  ? de ? "Existentiell" : "存在危机"
                  : activeVerse.toneCategory === "spott"
                  ? de ? "Spott" : "反讽批判"
                  : activeVerse.toneCategory === "autoritaet"
                  ? de ? "Herrschaft" : "阶级特权"
                  : de ? "Streben" : "精神求索"}
              </span>
            )}
          </div>
        </div>

        {/* 逐句直译与精析 */}
        <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]/50 space-y-1">
          <div className="font-mono text-[9px] text-[var(--gray)] uppercase tracking-wider">
            {de ? "Wortgetreue Übersetzung" : "直译与义理对照"}
          </div>
          <div className="font-serif text-[13px] text-[var(--ink)] leading-relaxed">
            {activeVerse.translationZH}
          </div>
        </div>

        {activeVerse.stilmittel && (
          <div className="p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/70 text-amber-950 space-y-0.5">
            <div className="font-mono text-[10px] uppercase font-bold text-amber-900">
              § {activeVerse.stilmittel.type}
            </div>
            <div className="text-xs leading-relaxed">
              {de ? activeVerse.stilmittel.descDE : activeVerse.stilmittel.descZH}
            </div>
          </div>
        )}

        {activeVerse.vocab && (
          <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/70 text-blue-950 space-y-0.5">
            <div className="font-mono text-[10px] font-bold text-blue-900">
              📖 Glossar: <span className="underline">{activeVerse.vocab.word}</span>
            </div>
            <div className="text-xs leading-relaxed">
              <strong>{activeVerse.vocab.meaningDE}</strong> — {activeVerse.vocab.meaningZH}
            </div>
          </div>
        )}
      </div>
    )
  );

  // 渲染诊断胶囊切换卡（舒展大气，段落分明）
  const renderDiagnosticTabs = () => {
    if (!currentQ) return null;
    const isAnswered = !!answers[currentQ.id];
    if (!isAnswered) return null;
    const isCorr = currentQ.options.find((o) => o.id === answers[currentQ.id])?.isCorrect;

    return (
      <div className="mt-5 pt-5 border-t border-[var(--line)]/70 space-y-3.5 animate-fadeIn">
        {/* 正误提示 */}
        <div
          className={`text-xs font-mono font-bold flex items-center justify-between ${
            isCorr ? "text-emerald-800" : "text-rose-900"
          }`}
        >
          <span className="text-sm">{isCorr ? "✓ 解题命中 // 正确理解" : "✗ 需强化辨析 // 深入思考"}</span>
          <span className="text-[11px] text-[var(--gray)] font-normal">点击胶囊分段阅读深度分析</span>
        </div>

        {/* 诊断分段胶囊选择器 */}
        <div className="flex items-center gap-1.5 flex-wrap border-b border-[var(--line)]/40 pb-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveDiagTab("anchor")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "anchor"
                ? "bg-emerald-700 text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            🎯 正解依据与锚点
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("distractors")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "distractors"
                ? "bg-rose-700 text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            ⚠️ 干扰项深度诊断
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("context")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "context"
                ? "bg-purple-700 text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            🏛 时代思潮哲学
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("muster")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "muster"
                ? "bg-[var(--ink)] text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            ✍️ 高分句与EHZ
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("all")}
            className={`px-3 py-1 rounded-md text-xs transition cursor-pointer ${
              activeDiagTab === "all"
                ? "bg-amber-800 text-white font-bold shadow-2xs"
                : "bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            📑 全景展开
          </button>
        </div>

        {/* 动态分段内容 */}
        <div className="text-[13px] sm:text-[14px] leading-[1.8] text-[var(--ink)] font-sans p-4 sm:p-5 rounded-xl bg-[var(--paper-subtle)] border border-[var(--line)]/60 shadow-2xs">
          {activeDiagTab === "anchor" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-[11px] font-bold text-emerald-800">
                【✅ 正解依据与文本锚点】
              </div>
              <div>{diagSections.anchor}</div>
            </div>
          )}

          {activeDiagTab === "distractors" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-[11px] font-bold text-rose-800">
                【❌ 干扰项逐项诊断】
              </div>
              <div>{diagSections.distractors || "针对错误审题与概念混淆的深度辨析。"}</div>
            </div>
          )}

          {activeDiagTab === "context" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-[11px] font-bold text-purple-800">
                【🏛 时代思潮与哲学脉络】
              </div>
              <div>{diagSections.context || "启蒙时代、狂飙突进与近代知识体系演进。"}</div>
            </div>
          )}

          {activeDiagTab === "all" && (
            <div className="space-y-2.5 whitespace-pre-line">
              {currentQ.explanationZH}
            </div>
          )}

          {activeDiagTab === "muster" && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--gray)]">
                  <span className="font-bold text-[var(--ink)]">
                    § {de ? "Muster-Formulierung für die Klausur" : "德语高分答题句式"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopySentence(currentQ.klausurSatzDE, currentQ.id)}
                    className="text-[var(--ink)] hover:underline cursor-pointer"
                  >
                    {copiedId === currentQ.id ? "✓ Kopiert" : de ? "Kopieren" : "复制德语文案"}
                  </button>
                </div>
                <div className="font-serif italic text-[13px] sm:text-[14px] text-[var(--ink)] leading-relaxed pl-3 border-l-2 border-amber-500/70">
                  „{currentQ.klausurSatzDE}“
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs space-y-1.5">
                <div className="font-mono text-[11px] text-[var(--gray)] font-bold">
                  📋 官方评分期望标准 (EHZ 要点):
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[var(--gray)] font-sans text-xs sm:text-[13px] leading-relaxed">
                  {currentQ.ehzKeyPointsZH.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <span className="text-[var(--ink)]">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* 常驻迷你高分句快捷栏 */}
        {activeDiagTab !== "muster" && (
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] text-xs font-mono">
            <span className="text-[11px] text-[var(--gray)] truncate max-w-[80%]">
              § 考场标准句: „{currentQ.klausurSatzDE.slice(0, 55)}...“
            </span>
            <button
              type="button"
              onClick={() => setActiveDiagTab("muster")}
              className="text-[11px] text-[var(--ink)] font-bold underline cursor-pointer"
            >
              展开完整句式 ▶
            </button>
          </div>
        )}
      </div>
    );
  };

  // 渲染试题设问与选项
  const renderQuestionCard = () => {
    if (!currentQ) return null;
    const isAnswered = !!answers[currentQ.id];
    return (
      <div className="rounded-xl border border-[var(--line)]/70 bg-[var(--surface)] p-6 sm:p-7 shadow-xs space-y-5">
        {/* 题头 */}
        <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)]/60 pb-3">
          <span className="font-bold text-sm text-[var(--ink)]">
            第 {focusIndex + 1} 题：{currentQ.titleZH}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[10px] px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)]">
              {currentQ.afb}
            </span>
            {isAnswered && (
              <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2.5 py-0.8 rounded-md border border-emerald-300">
                ✓ 已作答
              </span>
            )}
          </div>
        </div>

        {/* 设问正文 */}
        <p className="font-serif text-[15px] sm:text-[16px] leading-[1.75] text-[var(--ink)]">
          {currentQ.questionZH}
        </p>

        {/* 选项组 */}
        <div className="space-y-3 pt-1">
          {currentQ.options.map((opt) => {
            const selectedOptionId = answers[currentQ.id];
            const isThisSelected = selectedOptionId === opt.id;
            let btnStyle = "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--gray)] shadow-2xs";

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = "border-emerald-500 bg-emerald-50/90 text-emerald-950 font-medium ring-1 ring-emerald-500 shadow-2xs";
              } else if (isThisSelected && !opt.isCorrect) {
                btnStyle = "border-rose-400 bg-rose-50 text-rose-950 line-through";
              } else {
                btnStyle = "border-[var(--line)]/60 bg-[var(--paper-subtle)] opacity-40";
              }
            }

            return (
              <button
                key={opt.id}
                type="button"
                disabled={isAnswered}
                onClick={() => setAnswers({ ...answers, [currentQ.id]: opt.id })}
                className={`w-full text-left p-3.5 sm:p-4 rounded-lg border text-xs sm:text-[13px] leading-relaxed transition cursor-pointer flex items-start gap-3.5 ${btnStyle}`}
              >
                <span className="h-6 w-6 rounded-md bg-[var(--paper-subtle)] border border-[var(--line)] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {opt.id.toUpperCase()}
                </span>
                <span className="flex-1">{opt.textZH}</span>
              </button>
            );
          })}
        </div>

        {/* 嵌入式诊断 */}
        {isAnswered && renderDiagnosticTabs()}

        {/* 步进器 */}
        <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]/60">
          <button
            type="button"
            disabled={focusIndex === 0}
            onClick={() => setFocusIndex(focusIndex - 1)}
            className="px-4 py-2 rounded-lg border border-[var(--line)] text-xs font-mono cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--paper-subtle)] transition"
          >
            ◀ 上一题
          </button>

          <span className="text-xs font-mono text-[var(--gray)]">
            第 {focusIndex + 1} 题 / 共 {activeExcerpt.questions.length} 题
          </span>

          <button
            type="button"
            disabled={focusIndex === activeExcerpt.questions.length - 1}
            onClick={() => setFocusIndex(focusIndex + 1)}
            className={`px-4 py-2 rounded-lg text-xs font-mono cursor-pointer transition ${
              answers[currentQ.id] && focusIndex < activeExcerpt.questions.length - 1
                ? "bg-[var(--ink)] text-white shadow-2xs font-bold hover:opacity-90"
                : "border border-[var(--line)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--paper-subtle)]"
            }`}
          >
            下一题 ▶
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`font-sans text-[var(--ink)] space-y-4 ${compact ? "max-w-full" : ""}`}>
      {/* 极简学术工坊顶栏：作品名 + 篇目切换 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-serif font-bold text-lg text-[var(--ink)]">
            {activeExcerpt.author}: <span className="italic">{activeExcerpt.workTitleDE}</span>
          </span>
          <span className="text-[10px] font-mono text-[var(--gray)] bg-[var(--paper-subtle)] px-2 py-0.5 rounded border border-[var(--line)]">
            {activeExcerpt.fach} · {activeExcerpt.epochZH}
          </span>
          <span className="text-xs text-[var(--gray)] font-serif italic hidden md:inline">
            {de ? activeExcerpt.sceneTitleDE.split("//")[0] : activeExcerpt.sceneTitleZH}
          </span>
        </div>

        {/* 篇目切换胶囊 */}
        {availableExcerpts.length > 1 && (
          <div className="inline-flex rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-0.5 text-xs font-mono self-start sm:self-auto shadow-2xs flex-wrap gap-0.5">
            {availableExcerpts.map((ex) => {
              const isCurrent = selectedExcerptId === ex.id;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => handleSelectExcerpt(ex.id)}
                  className={`px-3 py-1 rounded-md transition cursor-pointer font-medium ${
                    isCurrent
                      ? "bg-[var(--surface)] text-[var(--ink)] font-bold shadow-2xs border border-[var(--line)]"
                      : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {ex.sceneTitleZH.split("·")[1]?.split("(")[0]?.trim() || ex.workTitleZH.slice(0, 8)}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 宽幅呼吸双栏典雅版面 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10 items-start">
        {/* 左栏 (5列): 诗剧原著正文 + 显微镜 */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)]/60 pb-1.5">
            <span className="font-bold text-[var(--ink)]">
              {de ? "Originaltext" : "原著文献正文"} ({activeExcerpt.versesRange})
            </span>
            <span className="text-[10px] text-[var(--gray)]">
              {de ? "Klick auf Zeile zum Analysieren" : "点击诗行即可深入释义"}
            </span>
          </div>
          {renderVerseScroll(compact ? "h-[420px]" : "h-[500px]")}
          {renderMicroscope()}
        </div>

        {/* 右栏 (7列): 逐题深入 + 诊断分段胶囊 */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2.5">
            <div className="flex items-center gap-2.5">
              <span className="font-mono font-bold text-sm text-[var(--ink)]">
                📖 {de ? "Klausur-Textanalyse" : "会考原典精读 · 逐题深入"}
              </span>
              <span className="text-xs font-mono text-[var(--gray)]">
                (第 {focusIndex + 1} 题 / 共 {activeExcerpt.questions.length} 题)
              </span>
            </div>
            {/* 进度圆点 */}
            <div className="flex items-center gap-2 font-mono text-xs">
              {activeExcerpt.questions.map((q, idx) => {
                const isCurrent = focusIndex === idx;
                const ans = answers[q.id];
                const isCorr = q.options.find((o) => o.id === ans)?.isCorrect;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setFocusIndex(idx)}
                    className={`h-6 w-6 rounded-full text-[11px] flex items-center justify-center font-bold cursor-pointer transition ${
                      isCurrent
                        ? "bg-[var(--ink)] text-white shadow-xs scale-110"
                        : ans
                        ? isCorr
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : "bg-rose-100 text-rose-800 border border-rose-300"
                        : "bg-[var(--paper-subtle)] text-[var(--gray)] border border-[var(--line)] hover:border-[var(--gray)]"
                    }`}
                  >
                    {ans ? (isCorr ? "✓" : "✗") : idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
          {renderQuestionCard()}
        </div>
      </div>
    </div>
  );
}
