// GeWiReadingLab — 通用文科学术原典精读与六维会考解剖工坊
// 专为北威州高中会考（Gymnasiale Oberstufe: EF / Q1 Klausur Aufgabentyp 1A / Textanalyse）设计
// 严格遵循 Tufte 纯黑白纸墨规范：舒朗呼吸双栏、单题聚焦深度诊断、诗歌格律音步透镜与戏剧冲突透镜

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
      : availableExcerpts[0]?.id || "faust-nacht";

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

  // 诗歌格律音步透镜开关
  const [showMetrumLens, setShowMetrumLens] = useState<boolean>(true);

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
    const anchorMatch = text.match(/[【\[](?:正解依据与文本锚点|Textanker)[】\]]([\s\S]*?)(?=[【\[](?:干扰项逐项诊断|Distraktoren)[】\]]|$)/);
    const distractorsMatch = text.match(/[【\[](?:干扰项逐项诊断|Distraktoren)[】\]]([\s\S]*?)(?=[【\[](?:时代思潮与哲学脉络|Kontext|Epoche)[】\]]|$)/);
    const contextMatch = text.match(/[【\[](?:时代思潮与哲学脉络|Kontext|Epoche)[】\]]([\s\S]*?)$/);

    return {
      anchor: anchorMatch ? anchorMatch[1].trim() : text,
      distractors: distractorsMatch ? distractorsMatch[1].trim() : "",
      context: contextMatch ? contextMatch[1].trim() : "",
      full: text,
    };
  };

  const diagSections = parseExplanationSections(currentQ?.explanationZH || "");

  const hasMetrumData = activeExcerpt.verses.some((v) => !!v.metrumMarkup);
  const isDrama = activeExcerpt.genre === "Drama" || activeExcerpt.verses.some((v) => !!v.speaker);

  // 渲染诗句原著卷轴（Tufte 纸墨高对比度、舒朗行间距、格律与戏剧透镜）
  const renderVerseScroll = (heightClass: string = "h-[500px]") => (
    <div className="space-y-2">
      {/* 诗歌格律全局概览条与透镜开关 */}
      {hasMetrumData && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[var(--ink)]">
              {de ? "Metrik-Schema:" : "格律形制:"}
            </span>
            <span className="text-[var(--ink)]">
              {de ? activeExcerpt.meterOverviewDE : activeExcerpt.meterOverviewZH}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setShowMetrumLens(!showMetrumLens)}
            className={`px-2.5 py-1 rounded border text-xs cursor-pointer transition ${
              showMetrumLens
                ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-none"
                : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)] shadow-none"
            }`}
          >
            {de
              ? `Metrik-Linse: ${showMetrumLens ? "Aktiv" : "Inaktiv"}`
              : `音步透镜: ${showMetrumLens ? "开启" : "关闭"}`}
          </button>
        </div>
      )}

      {/* 戏剧冲突态势条 */}
      {isDrama && (activeExcerpt.dramaticConflictZH || activeExcerpt.dramaticConflictDE) && (
        <div className="p-2.5 rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono">
          <div className="font-bold text-[var(--ink)] mb-0.5">
            {de ? "Dramatischer Konflikt & Konstellation:" : "戏剧冲突态势与人物博弈:"}
          </div>
          <div className="text-[var(--ink)] leading-relaxed">
            {de ? activeExcerpt.dramaticConflictDE : activeExcerpt.dramaticConflictZH}
          </div>
        </div>
      )}

      <div
        ref={verseListRef}
        className={`rounded-xl border border-[var(--line)] bg-[var(--paper)] p-3.5 sm:p-4 shadow-none font-serif ${heightClass} overflow-y-auto select-none scroll-smooth`}
      >
        {activeExcerpt.verses.map((verse) => {
          const isSelected = verse.lineNum === activeVerseNum;
          const hasStilmittel = !!verse.stilmittel;
          const hasVocab = !!verse.vocab;
          const hasSpeaker = !!verse.speaker;
          const showVerseMetrum = showMetrumLens && !!verse.metrumMarkup;

          let highlightBg = "";
          if (isSelected) {
            highlightBg = "bg-[var(--paper-subtle)] text-[var(--ink)] font-medium border-l-2 border-[var(--ink)]";
          } else {
            highlightBg = "hover:bg-[var(--paper-subtle)] text-[var(--ink)] border-l-2 border-transparent";
          }

          return (
            <div
              key={verse.lineNum}
              ref={(el) => {
                verseRefs.current[verse.lineNum] = el;
              }}
              onClick={() => setActiveVerseNum(verse.lineNum)}
              className={`group py-2 px-2.5 rounded transition-colors cursor-pointer text-xs sm:text-sm leading-relaxed ${highlightBg}`}
            >
              {/* 说话者行 (若是戏剧) */}
              {hasSpeaker && (
                <div className="font-mono font-bold text-xs text-[var(--ink)] tracking-wider mb-1">
                  {`[${verse.speaker}]`}
                </div>
              )}

              {/* 格律标注行 (若开启音步透镜且有数据) */}
              {showVerseMetrum && (
                <div className="flex items-center gap-3 font-mono text-xs text-[var(--gray)] mb-1">
                  <span className="tracking-widest font-semibold text-[var(--ink)]">
                    {verse.metrumMarkup}
                  </span>
                  {verse.reimschema && (
                    <span className="border border-[var(--line)] px-1 rounded text-xs bg-[var(--surface)]">
                      {`[${verse.reimschema}]`}
                    </span>
                  )}
                  {verse.kadenz && (
                    <span className="text-xs">
                      {`(${verse.kadenz})`}
                    </span>
                  )}
                </div>
              )}

              {/* 文本主体与行号 */}
              <div className="flex items-baseline gap-2.5">
                {/* 行号 */}
                <span className="font-mono text-xs text-[var(--gray)] w-8 shrink-0 text-right select-none">
                  {verse.lineNum % 5 === 0 || isSelected ? verse.lineNum : ""}
                </span>

                {/* 德语原诗 + 中文释义提示 */}
                <div className="flex-1 min-w-0 flex items-baseline justify-between gap-2">
                  <div className="min-w-0">
                    <span className={`tracking-wide font-serif ${isSelected ? "font-bold text-[var(--ink)]" : "text-[var(--ink)]"}`}>
                      {verse.textDE}
                    </span>
                    <span className="ml-2.5 font-sans text-xs text-[var(--gray)] opacity-0 group-hover:opacity-100 transition-opacity">
                      // {verse.translationZH}
                    </span>
                  </div>

                  {/* 修辞与词汇微标 */}
                  <div className="flex items-center gap-2 shrink-0 text-xs font-mono select-none">
                    {hasStilmittel && (
                      <span
                        className="text-[var(--ink)] border border-[var(--line)] px-1.5 py-0.5 rounded bg-[var(--surface)] font-medium tracking-tight"
                        title={verse.stilmittel?.type}
                      >
                        § {verse.stilmittel?.type.split("(")[0].replace("&", "+").trim()}
                      </span>
                    )}
                    {hasVocab && (
                      <span
                        className="text-[var(--ink)] border border-[var(--line)] px-1.5 py-0.5 rounded bg-[var(--surface)] font-medium tracking-tight"
                        title={verse.vocab?.word}
                      >
                        [Wort] {verse.vocab?.word}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // 渲染显微镜解析抽屉（Tufte 高对比单卡）
  const renderMicroscope = () => (
    activeVerse && (
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 space-y-3 shadow-none font-sans text-xs">
        <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-xs text-[var(--ink)]">
              {de ? "Zeile" : "诗行"} {activeVerse.lineNum} // {de ? "Detail-Analyse" : "逐行显微镜精析"}
            </span>
            {activeVerse.speaker && (
              <span className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-bold">
                {activeVerse.speaker}
              </span>
            )}
            {activeVerse.toneCategory && (
              <span className="font-mono text-xs px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">
                {activeVerse.toneCategory === "krise"
                  ? de ? "Krise" : "认知绝望"
                  : activeVerse.toneCategory === "existenz"
                  ? de ? "Existentiell" : "存在危机"
                  : activeVerse.toneCategory === "spott"
                  ? de ? "Spott" : "反讽批判"
                  : activeVerse.toneCategory === "autoritaet"
                  ? de ? "Herrschaft" : "阶级特权"
                  : activeVerse.toneCategory === "leidenschaft"
                  ? de ? "Leidenschaft" : "狂飙激情"
                  : activeVerse.toneCategory === "sehnsucht"
                  ? de ? "Sehnsucht" : "挚烈向往"
                  : activeVerse.toneCategory === "moral"
                  ? de ? "Moral" : "宽容道德"
                  : de ? "Streben" : "精神求索"}
              </span>
            )}
          </div>
        </div>

        {/* 格律微观分析 (若有数据) */}
        {(activeVerse.metrumMarkup || activeVerse.reimschema || activeVerse.kadenz) && (
          <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] space-y-1 font-mono text-xs">
            <div className="font-bold text-[var(--ink)]">
              {de ? "Metrische Feinanalyse:" : "格律与音步微观标注:"}
            </div>
            {activeVerse.metrumMarkup && (
              <div className="text-[var(--ink)]">
                {de ? "Hebungen/Senkungen:" : "扬抑音步:"} <span className="font-bold">{activeVerse.metrumMarkup}</span>
              </div>
            )}
            <div className="flex items-center gap-3 text-[var(--gray)]">
              {activeVerse.reimschema && (
                <span>
                  {de ? "Reimschema:" : "韵脚:"} <strong className="text-[var(--ink)]">[{activeVerse.reimschema}]</strong>
                </span>
              )}
              {activeVerse.kadenz && (
                <span>
                  {de ? "Kadenz:" : "韵尾:"} <strong className="text-[var(--ink)]">{activeVerse.kadenz}</strong>
                </span>
              )}
            </div>
          </div>
        )}

        {/* 逐句直译与精析 */}
        <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] space-y-1">
          <div className="font-mono text-xs text-[var(--gray)] uppercase tracking-wider">
            {de ? "Wortgetreue Übersetzung" : "直译与义理对照"}
          </div>
          <div className="font-serif text-xs sm:text-sm text-[var(--ink)] leading-relaxed">
            {activeVerse.translationZH}
          </div>
        </div>

        {activeVerse.stilmittel && (
          <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] text-[var(--ink)] space-y-1">
            <div className="font-mono text-xs uppercase font-bold text-[var(--ink)]">
              § {activeVerse.stilmittel.type}
            </div>
            <div className="text-xs leading-relaxed text-[var(--ink)]">
              {de ? activeVerse.stilmittel.descDE : activeVerse.stilmittel.descZH}
            </div>
          </div>
        )}

        {activeVerse.vocab && (
          <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] text-[var(--ink)] space-y-1">
            <div className="font-mono text-xs font-bold text-[var(--ink)]">
              [Glossar] <span className="underline">{activeVerse.vocab.word}</span>
            </div>
            <div className="text-xs leading-relaxed text-[var(--ink)]">
              <strong>{activeVerse.vocab.meaningDE}</strong> — {activeVerse.vocab.meaningZH}
            </div>
          </div>
        )}
      </div>
    )
  );

  // 渲染诊断胶囊切换卡（Tufte 高对比度纯黑白分段阅读）
  const renderDiagnosticTabs = () => {
    if (!currentQ) return null;
    const isAnswered = !!answers[currentQ.id];
    if (!isAnswered) return null;
    const isCorr = currentQ.options.find((o) => o.id === answers[currentQ.id])?.isCorrect;

    return (
      <div className="mt-5 pt-5 border-t border-[var(--line)] space-y-3.5">
        {/* 正误提示 */}
        <div
          className={`text-xs font-mono font-bold flex items-center justify-between ${
            isCorr ? "text-[var(--ink)]" : "text-[var(--ink)]"
          }`}
        >
          <span className="text-xs sm:text-sm border-l-2 border-[var(--ink)] pl-2">
            {isCorr
              ? de ? "[Richtig] Korrekte Textinterpretation" : "[正确] 解题命中 · 准确理解"
              : de ? "[Korrekturbedarf] Vertiefte Differenzierung nötig" : "[偏差] 需强化辨析 · 深入思考"}
          </span>
          <span className="text-xs text-[var(--gray)] font-normal">
            {de ? "Diagnoseabschnitte wählen" : "点击选择诊断板块"}
          </span>
        </div>

        {/* 诊断分段胶囊选择器 */}
        <div className="flex items-center gap-1.5 flex-wrap border-b border-[var(--line)] pb-2 text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveDiagTab("anchor")}
            className={`px-3 py-1 rounded border text-xs transition cursor-pointer ${
              activeDiagTab === "anchor"
                ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-none"
                : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
            }`}
          >
            {de ? "Textanker" : "正解依据与锚点"}
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("distractors")}
            className={`px-3 py-1 rounded border text-xs transition cursor-pointer ${
              activeDiagTab === "distractors"
                ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-none"
                : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
            }`}
          >
            {de ? "Distraktoren" : "干扰项深度诊断"}
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("context")}
            className={`px-3 py-1 rounded border text-xs transition cursor-pointer ${
              activeDiagTab === "context"
                ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-none"
                : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
            }`}
          >
            {de ? "Epoche & Philosophie" : "时代思潮与哲学"}
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("muster")}
            className={`px-3 py-1 rounded border text-xs transition cursor-pointer ${
              activeDiagTab === "muster"
                ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-none"
                : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
            }`}
          >
            {de ? "EHZ & Klausursatz" : "高分句与EHZ"}
          </button>
          <button
            type="button"
            onClick={() => setActiveDiagTab("all")}
            className={`px-3 py-1 rounded border text-xs transition cursor-pointer ${
              activeDiagTab === "all"
                ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-none"
                : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--ink)]"
            }`}
          >
            {de ? "Vollansicht" : "全景展开"}
          </button>
        </div>

        {/* 动态分段内容 */}
        <div className="text-xs sm:text-sm leading-relaxed text-[var(--ink)] font-sans p-4 rounded-xl bg-[var(--paper-subtle)] border border-[var(--line)] shadow-none">
          {activeDiagTab === "anchor" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-xs font-bold text-[var(--ink)]">
                【{de ? "Textanker & Begründung" : "正解依据与文本锚点"}】
              </div>
              <div className="leading-relaxed">{diagSections.anchor}</div>
            </div>
          )}

          {activeDiagTab === "distractors" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-xs font-bold text-[var(--ink)]">
                【{de ? "Diagnose der Distraktoren" : "干扰项逐项诊断"}】
              </div>
              <div className="leading-relaxed">{diagSections.distractors || (de ? "Detaillierte Analyse zu Fehlannahmen." : "针对错误审题与概念混淆的深度辨析。")}</div>
            </div>
          )}

          {activeDiagTab === "context" && (
            <div className="space-y-2 whitespace-pre-line">
              <div className="font-mono text-xs font-bold text-[var(--ink)]">
                【{de ? "Epochenkontext & Ideengeschichte" : "时代思潮与哲学脉络"}】
              </div>
              <div className="leading-relaxed">{diagSections.context || (de ? "Kontextualisierung in der Geistesgeschichte." : "启蒙时代、狂飙突进与近代知识体系演进。")}</div>
            </div>
          )}

          {activeDiagTab === "all" && (
            <div className="space-y-2.5 whitespace-pre-line leading-relaxed">
              {currentQ.explanationZH}
            </div>
          )}

          {activeDiagTab === "muster" && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
                  <span className="font-bold text-[var(--ink)]">
                    § {de ? "Muster-Formulierung für die Klausur" : "德语高分答题句式 (15 NP)"}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopySentence(currentQ.klausurSatzDE, currentQ.id)}
                    className="text-[var(--ink)] hover:underline cursor-pointer font-bold"
                  >
                    {copiedId === currentQ.id ? (de ? "[Kopiert]" : "[已复制]") : (de ? "Kopieren" : "复制德语文案")}
                  </button>
                </div>
                <div className="font-serif text-xs sm:text-sm text-[var(--ink)] leading-relaxed pl-3 border-l-2 border-[var(--ink)]">
                  „{currentQ.klausurSatzDE}“
                </div>
                <div className="text-xs text-[var(--gray)] font-sans pl-3 pt-1">
                  // {currentQ.klausurSatzZH}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[var(--surface)] border border-[var(--line)] text-xs space-y-1.5">
                <div className="font-mono text-xs text-[var(--ink)] font-bold">
                  [EHZ] {de ? "Erwartungshorizont Kriterien:" : "官方评分期望标准 (EHZ 要点):"}
                </div>
                <ul className="list-disc pl-4 space-y-1 text-[var(--ink)] font-sans text-xs sm:text-sm leading-relaxed">
                  {currentQ.ehzKeyPointsZH.map((pt, pIdx) => (
                    <li key={pIdx}>
                      <span>{pt}</span>
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
            <span className="text-xs text-[var(--gray)] truncate max-w-[75%]">
              § {de ? "Klausursatz:" : "会考标准句:"} „{currentQ.klausurSatzDE.slice(0, 55)}...“
            </span>
            <button
              type="button"
              onClick={() => setActiveDiagTab("muster")}
              className="text-xs text-[var(--ink)] font-bold underline cursor-pointer shrink-0"
            >
              {de ? "Muster öffnen »" : "展开完整句式 »"}
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
      <div className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-6 shadow-none space-y-4">
        {/* 题头 */}
        <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)] pb-3">
          <span className="font-bold text-xs sm:text-sm text-[var(--ink)]">
            {de ? `Aufgabe ${focusIndex + 1}:` : `第 ${focusIndex + 1} 题：`} {de ? currentQ.titleDE : currentQ.titleZH}
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] font-bold">
              {currentQ.afb}
            </span>
            {isAnswered && (
              <span className="text-xs text-[var(--ink)] font-bold bg-[var(--paper-subtle)] px-2 py-0.5 rounded border border-[var(--line)]">
                {de ? "Beantwortet" : "已作答"}
              </span>
            )}
          </div>
        </div>

        {/* 设问正文 */}
        <div className="space-y-1.5">
          <p className="font-serif text-sm sm:text-base leading-relaxed text-[var(--ink)]">
            {currentQ.questionZH}
          </p>
          <p className="font-serif text-xs text-[var(--gray)] leading-relaxed">
            // {currentQ.questionDE}
          </p>
        </div>

        {/* 选项组 */}
        <div className="space-y-2.5 pt-1">
          {currentQ.options.map((opt) => {
            const selectedOptionId = answers[currentQ.id];
            const isThisSelected = selectedOptionId === opt.id;
            let btnStyle = "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--ink)]";

            if (isAnswered) {
              if (opt.isCorrect) {
                btnStyle = "border-[var(--ink)] bg-[var(--paper-subtle)] text-[var(--ink)] font-bold ring-1 ring-[var(--ink)]";
              } else if (isThisSelected && !opt.isCorrect) {
                btnStyle = "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] line-through";
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
                className={`w-full text-left p-3.5 rounded-lg border text-xs sm:text-sm leading-relaxed transition cursor-pointer flex items-start gap-3 shadow-none ${btnStyle}`}
              >
                <span className="h-5 w-5 rounded bg-[var(--paper-subtle)] border border-[var(--line)] font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
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
        <div className="flex items-center justify-between pt-4 border-t border-[var(--line)]">
          <button
            type="button"
            disabled={focusIndex === 0}
            onClick={() => setFocusIndex(focusIndex - 1)}
            className="px-3.5 py-1.5 rounded border border-[var(--line)] text-xs font-mono cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--ink)] transition"
          >
            {de ? "« Vorherige" : "« 上一题"}
          </button>

          <span className="text-xs font-mono text-[var(--gray)]">
            {focusIndex + 1} / {activeExcerpt.questions.length}
          </span>

          <button
            type="button"
            disabled={focusIndex === activeExcerpt.questions.length - 1}
            onClick={() => setFocusIndex(focusIndex + 1)}
            className={`px-3.5 py-1.5 rounded text-xs font-mono cursor-pointer transition ${
              answers[currentQ.id] && focusIndex < activeExcerpt.questions.length - 1
                ? "bg-[var(--ink)] text-white border border-[var(--ink)] font-bold shadow-none hover:opacity-90"
                : "border border-[var(--line)] disabled:opacity-30 disabled:cursor-not-allowed hover:border-[var(--ink)]"
            }`}
          >
            {de ? "Nächste »" : "下一题 »"}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`font-sans text-[var(--ink)] space-y-4 ${compact ? "max-w-full" : ""}`}>
      {/* 顶栏：作品名 + 篇目切换 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="font-serif font-bold text-base sm:text-lg text-[var(--ink)]">
            {activeExcerpt.author}: <span>{activeExcerpt.workTitleDE}</span>
          </span>
          <span className="text-xs font-mono text-[var(--gray)] bg-[var(--paper-subtle)] px-2 py-0.5 rounded border border-[var(--line)]">
            {activeExcerpt.fach} · {activeExcerpt.epochZH}
          </span>
          <span className="text-xs text-[var(--gray)] font-serif hidden md:inline">
            {de ? activeExcerpt.sceneTitleDE.split("//")[0] : activeExcerpt.sceneTitleZH}
          </span>
        </div>

        {/* 篇目切换胶囊 */}
        {availableExcerpts.length > 1 && (
          <div className="inline-flex rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-0.5 text-xs font-mono self-start sm:self-auto shadow-none flex-wrap gap-0.5">
            {availableExcerpts.map((ex) => {
              const isCurrent = selectedExcerptId === ex.id;
              return (
                <button
                  key={ex.id}
                  type="button"
                  onClick={() => handleSelectExcerpt(ex.id)}
                  className={`px-2.5 py-1 rounded transition cursor-pointer font-medium ${
                    isCurrent
                      ? "bg-[var(--surface)] text-[var(--ink)] font-bold border border-[var(--line)] shadow-none"
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

      {/* 宽幅呼吸双栏版面 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">
        {/* 左栏 (5列): 诗剧原著正文 + 显微镜 */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--line)] pb-1.5">
            <span className="font-bold text-[var(--ink)]">
              {de ? "Originaltext" : "原著文献正文"} ({activeExcerpt.versesRange})
            </span>
            <span className="text-xs text-[var(--gray)]">
              {de ? "Zeile anklicken" : "点击诗行深入释义"}
            </span>
          </div>
          {renderVerseScroll(compact ? "h-[420px]" : "h-[500px]")}
          {renderMicroscope()}
        </div>

        {/* 右栏 (7列): 逐题深入 + 诊断分段胶囊 */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2.5">
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-xs sm:text-sm text-[var(--ink)]">
                {de ? "Klausur-Textanalyse" : "会考原典精读 · 逐题深入"}
              </span>
              <span className="text-xs font-mono text-[var(--gray)]">
                ({focusIndex + 1} / {activeExcerpt.questions.length})
              </span>
            </div>
            {/* 进度圆点 */}
            <div className="flex items-center gap-1.5 font-mono text-xs">
              {activeExcerpt.questions.map((q, idx) => {
                const isCurrent = focusIndex === idx;
                const ans = answers[q.id];
                const isCorr = q.options.find((o) => o.id === ans)?.isCorrect;
                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setFocusIndex(idx)}
                    className={`h-6 w-6 rounded text-xs flex items-center justify-center font-bold cursor-pointer transition ${
                      isCurrent
                        ? "bg-[var(--ink)] text-white border border-[var(--ink)]"
                        : ans
                        ? isCorr
                          ? "bg-[var(--paper-subtle)] text-[var(--ink)] border-2 border-[var(--ink)]"
                          : "bg-[var(--paper-subtle)] text-[var(--gray)] border border-[var(--line)] line-through"
                        : "bg-[var(--paper-subtle)] text-[var(--gray)] border border-[var(--line)] hover:border-[var(--ink)]"
                    }`}
                  >
                    {idx + 1}
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
