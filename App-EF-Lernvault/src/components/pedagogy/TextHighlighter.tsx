// TextHighlighter: Pädagogischer Text-Marker & Struktur-Dekonstruierer für Deutsch & Englisch.
// Ermöglicht das visuelle Zerlegen von dichten Sachtexten, Dramen-Szenen und Reden.
// 4 Farb-Klassen (These, Argument, Stilmittel, Konnektor) generieren automatisch einen Argumentationsbaum.
// Reines Inline-SVG, kein Emoji, Tufte-Design-Token.

import { useState } from "react";

export type HighlightType = "these" | "argument" | "stilmittel" | "konnektor";

export interface TextSpan {
  id: string;
  text: string;
  type?: HighlightType;
  annotationDE?: string;
  annotationZH?: string;
}

export interface TextPassage {
  id: string;
  titelDE: string;
  titelZH?: string;
  autor: string;
  quelle: string;
  quelleZH?: string;
  spans: TextSpan[];
}

export const PRESET_PASSAGES: TextPassage[] = [
  {
    id: "deutsch-digital-jugend",
    titelDE: "Die Illusion der permanenten Vernetzung",
    titelZH: "永久在线的幻象",
    autor: "Dr. L. Weimann",
    quelle: "Frankfurter Allgemeine Zeitung (EF-Übungsmaterial)",
    quelleZH: "《法兰克福汇报》EF练习材料",
    spans: [
      { id: "s1", text: "Die zunehmende Digitalisierung der jugendlichen Lebenswelt führt zu einer tiefgreifenden Transformation der Kommunikationskultur.", type: "these", annotationDE: "Zentrale Ausgangsthese", annotationZH: "核心论点：数字化深刻改变青少年交流文化" },
      { id: "s2", text: "Denn", type: "konnektor", annotationDE: "Kausale Begründungseinleitung", annotationZH: "因果逻辑衔接词" },
      { id: "s3", text: "aktuelle Erhebungen belegen, dass über 80 Prozent der Heranwachsenden mehr als vier Stunden täglich in sozialen Netzwerken interagieren.", type: "argument", annotationDE: "Faktenargument (Statistik)", annotationZH: "事实论据：80%以上青少年每日在社交网络互动超4小时" },
      { id: "s4", text: "Diese Schein-Nähe wirkt jedoch wie ein digitales Trugbild,", type: "stilmittel", annotationDE: "Metapher / Bildhafter Vergleich", annotationZH: "隐喻修辞：虚拟的亲密感如同‘数字幻影’" },
      { id: "s5", text: "wohingegen", type: "konnektor", annotationDE: "Adversative Gegenüberstellung", annotationZH: "转折对照关联词" },
      { id: "s6", text: "die Fähigkeit zur echten Empathie im realen Dialog messbar verkümmert.", type: "argument", annotationDE: "Plausibilitätsargument", annotationZH: "推理论据：真实对话中的同理心能力退化" },
      { id: "s7", text: "Wer ständig online ist, droht sich selbst im Datenstrom zu verlieren.", type: "these", annotationDE: "Zuspitzende Schlussfolgerung", annotationZH: "警示性结论：时刻在线者恐迷失在数据洪流之中" },
    ],
  },
];

const HIGHLIGHT_CONFIG: Record<
  HighlightType,
  { labelDE: string; labelZH: string; bgClass: string; borderClass: string; textClass: string; dotClass: string }
> = {
  these: {
    labelDE: "These / Kernbehauptung",
    labelZH: "① 核心论点 (These)",
    bgClass: "bg-[var(--paper-subtle)]",
    borderClass: "border-[var(--accent)]",
    textClass: "text-[var(--ink)]",
    dotClass: "bg-[var(--accent)]",
  },
  argument: {
    labelDE: "Argument / Beleg",
    labelZH: "② 事实与论据 (Argument)",
    bgClass: "bg-[var(--paper)]",
    borderClass: "border-[var(--gray)]",
    textClass: "text-[var(--ink)]",
    dotClass: "bg-[var(--gray)]",
  },
  stilmittel: {
    labelDE: "Rhetorisches Stilmittel",
    labelZH: "③ 修辞手法 (Stilmittel)",
    bgClass: "bg-[var(--paper)]",
    borderClass: "border-[var(--line)]",
    textClass: "text-[var(--gray)]",
    dotClass: "bg-[var(--gray)]",
  },
  konnektor: {
    labelDE: "Konnektor / Scharnier",
    labelZH: "④ 关联与转折词 (Konnektor)",
    bgClass: "bg-[var(--paper-subtle)]",
    borderClass: "border-[var(--line)]",
    textClass: "text-[var(--ink)]",
    dotClass: "bg-[var(--gray)]",
  },
};

export interface TextHighlighterProps {
  passage?: TextPassage;
  lang?: "de" | "zh";
  onAnalysisGenerated?: (summaryDE: string) => void;
}

export function TextHighlighter({
  passage = PRESET_PASSAGES[0],
  lang = "zh",
  onAnalysisGenerated,
}: TextHighlighterProps) {
  // Aktiver Marker (Typ, mit dem geklickt wird)
  const [activeTool, setActiveTool] = useState<HighlightType>("these");

  // Zustand der markierten Spans (id -> HighlightType)
  const [userHighlights, setUserHighlights] = useState<Record<string, HighlightType>>(() => {
    const init: Record<string, HighlightType> = {};
    passage.spans.forEach((s) => {
      if (s.type) init[s.id] = s.type;
    });
    return init;
  });

  const toggleSpan = (spanId: string) => {
    setUserHighlights((prev) => {
      const current = prev[spanId];
      if (current === activeTool) {
        const next = { ...prev };
        delete next[spanId];
        return next;
      }
      return { ...prev, [spanId]: activeTool };
    });
  };

  const clearAll = () => {
    setUserHighlights({});
  };

  // Gruppierung für die Struktur-Baumansicht
  const groupedSpans: Record<HighlightType, TextSpan[]> = {
    these: [],
    argument: [],
    stilmittel: [],
    konnektor: [],
  };

  passage.spans.forEach((span) => {
    const type = userHighlights[span.id];
    if (type) {
      groupedSpans[type].push(span);
    }
  });

  const totalMarked = Object.keys(userHighlights).length;

  return (
    <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 ">
      {/* 头部：标题与出处 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--gray)]" />
            <h3 className="font-serif text-base  text-[var(--ink)]">
              {lang === "de" ? "Text-Dekonstruierer & Markier-Canvas" : "荧光标注解构画板 (Text-Dekonstruierer)"}
            </h3>
            <span className="rounded-[var(--radius)] bg-[var(--gray)]/10 text-[var(--gray)] px-2 py-0.5 text-[var(--text-meta)] font-mono uppercase tracking-wider">
              Deutsch · Sachtextanalyse / 德语 · 议论文分析
            </span>
          </div>
          <p className="mt-1 text-xs">
            <span className="de-reading block text-[var(--ink)]">
              „{passage.titelDE}“ — <span className="font-sans text-[var(--gray)]">{passage.autor} ({passage.quelle})</span>
            </span>
            <span className="zh-translation">{passage.titelZH} — {passage.quelleZH}</span>
          </p>
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] px-2 py-1 text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
        >
          {lang === "de" ? "Marker leeren" : "清空全部标记"}
        </button>
      </div>

      {/* 荧光笔工具箱 (Highlighter Tool Palette) */}
      <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-3">
        <span className="text-[var(--text-meta)] font-mono uppercase tracking-wider text-[var(--gray)] mr-1">
          {lang === "de" ? "Stift wählen:" : "选择高光笔:"}
        </span>
        {(["these", "argument", "stilmittel", "konnektor"] as HighlightType[]).map((type) => {
          const cfg = HIGHLIGHT_CONFIG[type];
          const isSelected = activeTool === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => setActiveTool(type)}
              aria-pressed={isSelected}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-[var(--radius)] border transition-colors cursor-pointer ${
                isSelected
                  ? `${cfg.borderClass} ${cfg.bgClass} ${cfg.textClass}  ring-1 ${cfg.borderClass}/30 `
                  : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--gray)]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${cfg.dotClass}`} />
              <span>{lang === "de" ? cfg.labelDE : cfg.labelZH}</span>
            </button>
          );
        })}
      </div>

      {/* 主体：左侧交互文本区，右侧实时论证骨架树 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* 左侧可点击文本材料 (7 Spalten) */}
        <div className="lg:col-span-7 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-4 text-justify font-serif text-sm leading-loose">
          <p className="space-x-1">
            {passage.spans.map((span) => {
              const currentType = userHighlights[span.id];
              const cfg = currentType ? HIGHLIGHT_CONFIG[currentType] : null;

              return (
                <span
                  key={span.id}
                  onClick={() => toggleSpan(span.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      toggleSpan(span.id);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  aria-pressed={Boolean(currentType)}
                  aria-label={`${span.text}. ${span.annotationDE ?? "Markieren"} / ${span.annotationZH ?? "标记"}`}
                  title={span.annotationDE ? `${span.annotationDE} / ${span.annotationZH}` : "Klicken oder Enter zum Markieren / 点击或按 Enter 标记"}
                  className={`inline px-1 py-0.5 rounded-[var(--radius)] transition-colors cursor-pointer select-none ${
                    cfg
                      ? `${cfg.bgClass} ${cfg.textClass} border-b-2 ${cfg.borderClass} font-medium`
                      : "hover:bg-[var(--paper-subtle)] text-[var(--ink)]"
                  }`}
                >
                  {span.text}
                </span>
              );
            })}
          </p>
          <div className="mt-3 text-[var(--text-meta)] font-mono text-[var(--gray)] flex items-center justify-between border-t border-[var(--line)] pt-2">
            <span>{lang === "de" ? "Tipp: Klicken oder Enter zum Umschalten / 点击或按 Enter 切换标记" : "提示：点击句子或按 Enter 应用当前标记"}</span>
            <span>{totalMarked}/{passage.spans.length} {lang === "de" ? "Segmente aktiv" : "个片段已标注"}</span>
          </div>
        </div>

        {/* 右侧自动提炼结构树 (5 Spalten) */}
        <div className="lg:col-span-5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[var(--line)]">
              <span className="text-[var(--text-meta)] font-mono uppercase tracking-wider text-[var(--gray)] ">
                {lang === "de" ? "Extrahierte Argumentationsstruktur:" : "实时论证层级树 (Gliederung):"}
              </span>
              <span className="text-[var(--text-meta)] font-mono text-[var(--accent)]">AFB II</span>
            </div>

            <div className="space-y-3">
              {(["these", "argument", "stilmittel", "konnektor"] as HighlightType[]).map((type) => {
                const cfg = HIGHLIGHT_CONFIG[type];
                const items = groupedSpans[type];
                if (items.length === 0) return null;

                return (
                  <div key={type} className="text-xs">
                    <span className={`inline-flex items-center gap-1 font-mono text-[var(--text-meta)]  ${cfg.textClass} mb-1`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
                      {lang === "de" ? cfg.labelDE : cfg.labelZH} ({items.length})
                    </span>
                    <ul className="space-y-1 pl-2 border-l border-[var(--line)]">
                      {items.map((it) => (
                        <li key={it.id} className="text-[var(--text-meta)] font-serif text-[var(--ink)] leading-snug">
                          „{it.text.length > 45 ? `${it.text.slice(0, 42)}…` : it.text}“
                          {it.annotationZH && (
                            <span className="block font-sans text-[var(--text-meta)] text-[var(--gray)]">
                              {it.annotationZH}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {totalMarked === 0 && (
                <div className="py-8 text-center text-xs font-sans text-[var(--gray)]">
                  {lang === "de"
                    ? "Wähle oben eine Farbe und markiere die Passagen links."
                    : "在上方挑选高光笔，点击左侧文本片段进行结构解构。"}
                </div>
              )}
            </div>
          </div>

          {/* 自动生成分析陈述句 */}
          {groupedSpans.these.length > 0 && groupedSpans.argument.length > 0 && (
            <div className="mt-4 pt-2.5 border-t border-[var(--line)] text-[var(--text-meta)] font-mono text-[var(--success)] bg-[var(--paper-subtle)] p-2.5 rounded-[var(--radius)] border border-[var(--success)]">
              <div className="flex items-center justify-between mb-1">
                <span className=" block">
                  {lang === "de" ? "Synthese für deine Klausur / 考纲分析句雏形" : "考纲分析句雏形 / Synthese für deine Klausur"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const synth = `Der Autor stützt seine zentrale These („${groupedSpans.these[0].text}“) vor allem durch ${groupedSpans.argument.length} Begründungen sowie bildhafte Rhetorik.`;
                    navigator.clipboard.writeText(synth);
                    onAnalysisGenerated?.(synth);
                  }}
                  className="rounded-[var(--radius)] border border-[var(--success)] px-2 py-0.5 font-sans text-[var(--text-meta)] text-[var(--success)] transition-colors"
                >
                  {lang === "de" ? "In Chat übernehmen / 带入对话框" : "带入对话框 / In Chat übernehmen"}
                </button>
              </div>
              <p className="de-reading text-xs leading-relaxed text-[var(--ink)]">
                Der Autor stützt seine zentrale These („{groupedSpans.these[0].text.slice(0, 30)}…“) vor allem durch {groupedSpans.argument.length} Begründungen sowie bildhafte Rhetorik.
                <span className="zh-translation font-sans">作者主要通过{groupedSpans.argument.length}项论证与形象修辞来支撑其核心论点。</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
