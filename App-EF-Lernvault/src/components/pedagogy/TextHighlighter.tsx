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
  autor: string;
  quelle: string;
  spans: TextSpan[];
}

export const PRESET_PASSAGES: TextPassage[] = [
  {
    id: "deutsch-digital-jugend",
    titelDE: "Die Illusion der permanenten Vernetzung",
    autor: "Dr. L. Weimann",
    quelle: "Frankfurter Allgemeine Zeitung (EF-Übungsmaterial)",
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
    bgClass: "bg-[#D1FAE5]",
    borderClass: "border-[#047857]",
    textClass: "text-[#065F46]",
    dotClass: "bg-[#047857]",
  },
  argument: {
    labelDE: "Argument / Beleg",
    labelZH: "② 事实与论据 (Argument)",
    bgClass: "bg-[#FEF3C7]",
    borderClass: "border-[#B45309]",
    textClass: "text-[#92400E]",
    dotClass: "bg-[#B45309]",
  },
  stilmittel: {
    labelDE: "Rhetorisches Stilmittel",
    labelZH: "③ 修辞手法 (Stilmittel)",
    bgClass: "bg-[#FCE7F3]",
    borderClass: "border-[#BE185D]",
    textClass: "text-[#831843]",
    dotClass: "bg-[#BE185D]",
  },
  konnektor: {
    labelDE: "Konnektor / Scharnier",
    labelZH: "④ 关联与转折词 (Konnektor)",
    bgClass: "bg-[#E0E7FF]",
    borderClass: "border-[#4338CA]",
    textClass: "text-[#312E81]",
    dotClass: "bg-[#4338CA]",
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
    <div className="rounded-sm border border-[#E5E1D8] bg-white p-4 sm:p-5 shadow-xs">
      {/* 头部：标题与出处 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E5E1D8] pb-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#BE185D]" />
            <h3 className="font-serif text-base font-semibold text-[#1C1B17]">
              {lang === "de" ? "Text-Dekonstruierer & Markier-Canvas" : "荧光标注解构画板 (Text-Dekonstruierer)"}
            </h3>
            <span className="rounded-xs bg-[#BE185D]/10 text-[#BE185D] px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider">
              Deutsch · Sachtextanalyse
            </span>
          </div>
          <p className="mt-1 font-serif text-xs text-[#1C1B17] font-medium">
            „{passage.titelDE}“ — <span className="font-sans text-[#6B675C]">{passage.autor} ({passage.quelle})</span>
          </p>
        </div>

        <button
          type="button"
          onClick={clearAll}
          className="rounded-xs border border-[#E5E1D8] bg-[#FAF9F6] px-2 py-1 text-xs font-mono text-[#6B675C] hover:text-[#1C1B17] cursor-pointer"
        >
          {lang === "de" ? "Marker leeren" : "清空全部标记"}
        </button>
      </div>

      {/* 荧光笔工具箱 (Highlighter Tool Palette) */}
      <div className="mb-4 flex flex-wrap items-center gap-2 border-b border-[#E5E1D8] pb-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B675C] mr-1">
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
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono rounded-xs border transition-all cursor-pointer ${
                isSelected
                  ? `${cfg.borderClass} ${cfg.bgClass} ${cfg.textClass} font-semibold ring-1 ${cfg.borderClass}/30 shadow-xs`
                  : "border-[#E5E1D8] bg-[#FAF9F6] text-[#1C1B17] hover:border-[#6B675C]"
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
        <div className="lg:col-span-7 rounded-xs border border-[#E5E1D8] bg-[#FAF9F6] p-4 text-justify font-serif text-sm leading-loose">
          <p className="space-x-1">
            {passage.spans.map((span) => {
              const currentType = userHighlights[span.id];
              const cfg = currentType ? HIGHLIGHT_CONFIG[currentType] : null;

              return (
                <span
                  key={span.id}
                  onClick={() => toggleSpan(span.id)}
                  title={span.annotationDE ? `${span.annotationDE} (${span.annotationZH})` : "Klicken zum Markieren"}
                  className={`inline px-1 py-0.5 rounded-xs transition-all cursor-pointer select-none ${
                    cfg
                      ? `${cfg.bgClass} ${cfg.textClass} border-b-2 ${cfg.borderClass} font-medium`
                      : "hover:bg-[#E5E1D8]/60 text-[#1C1B17]"
                  }`}
                >
                  {span.text}
                </span>
              );
            })}
          </p>
          <div className="mt-3 text-[10px] font-mono text-[#6B675C] flex items-center justify-between border-t border-[#E5E1D8] pt-2">
            <span>{lang === "de" ? "Tipp: Klicken zum Umschalten" : "提示：点击句子应用当前选中的荧光笔颜色"}</span>
            <span>{totalMarked}/{passage.spans.length} {lang === "de" ? "Segmente aktiv" : "个片段已标注"}</span>
          </div>
        </div>

        {/* 右侧自动提炼结构树 (5 Spalten) */}
        <div className="lg:col-span-5 rounded-xs border border-[#E5E1D8] bg-white p-3.5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#E5E1D8]">
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#6B675C] font-semibold">
                {lang === "de" ? "Extrahierte Argumentationsstruktur:" : "实时论证层级树 (Gliederung):"}
              </span>
              <span className="text-[10px] font-mono text-[#4338CA]">AFB II</span>
            </div>

            <div className="space-y-3">
              {(["these", "argument", "stilmittel", "konnektor"] as HighlightType[]).map((type) => {
                const cfg = HIGHLIGHT_CONFIG[type];
                const items = groupedSpans[type];
                if (items.length === 0) return null;

                return (
                  <div key={type} className="text-xs">
                    <span className={`inline-flex items-center gap-1 font-mono text-[10px] font-semibold ${cfg.textClass} mb-1`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dotClass}`} />
                      {lang === "de" ? cfg.labelDE : cfg.labelZH} ({items.length})
                    </span>
                    <ul className="space-y-1 pl-2 border-l border-[#E5E1D8]">
                      {items.map((it) => (
                        <li key={it.id} className="text-[11px] font-serif text-[#1C1B17] leading-snug">
                          „{it.text.length > 45 ? `${it.text.slice(0, 42)}…` : it.text}“
                          {it.annotationZH && (
                            <span className="block font-sans text-[10px] text-[#6B675C]">
                              ↳ {it.annotationZH}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {totalMarked === 0 && (
                <div className="py-8 text-center text-xs font-sans text-[#6B675C]">
                  {lang === "de"
                    ? "Wähle oben eine Farbe und markiere die Passagen links."
                    : "在上方挑选高光笔，点击左侧文本片段进行结构解构。"}
                </div>
              )}
            </div>
          </div>

          {/* 自动生成分析陈述句 */}
          {groupedSpans.these.length > 0 && groupedSpans.argument.length > 0 && (
            <div className="mt-4 pt-2.5 border-t border-[#E5E1D8] text-[11px] font-mono text-[#065F46] bg-[#ECFDF5] p-2.5 rounded-xs border border-[#A7F3D0]">
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold block">
                  {lang === "de" ? "✓ Synthese für deine Klausur:" : "✓ 提炼出的考纲分析句雏形:"}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const synth = `Der Autor stützt seine zentrale These („${groupedSpans.these[0].text}“) vor allem durch ${groupedSpans.argument.length} Begründungen sowie bildhafte Rhetorik.`;
                    navigator.clipboard.writeText(synth);
                    onAnalysisGenerated?.(synth);
                  }}
                  className="rounded-xs bg-[#047857] text-white px-2 py-0.5 text-[10px] font-sans hover:bg-[#065F46] transition-colors cursor-pointer"
                >
                  {lang === "de" ? "In Chat übernehmen" : "带入对话框"}
                </button>
              </div>
              <p className="font-serif text-xs text-[#1C1B17] font-medium leading-relaxed">
                Der Autor stützt seine zentrale These („{groupedSpans.these[0].text.slice(0, 30)}…“) vor allem durch {groupedSpans.argument.length} Begründungen sowie bildhafte Rhetorik.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
