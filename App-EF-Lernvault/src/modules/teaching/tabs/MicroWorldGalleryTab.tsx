import React, { useState } from "react";
import {
  VariableSliderBox,
  DilemmaBalanceScale,
  LogicBlockBuilder,
  ScenarioDecisionTree,
} from "../components/GenericMicroWorlds";

interface MicroWorldGalleryTabProps {
  lang?: "de" | "zh";
  onNavigateToTab?: (tab: string, opts?: Record<string, unknown>) => void;
}

type GenericToolId = "slider" | "balance" | "logic" | "tree";

export const MicroWorldGalleryTab: React.FC<MicroWorldGalleryTabProps> = ({
  lang = "de",
  onNavigateToTab,
}) => {
  const [selectedTool, setSelectedTool] = useState<GenericToolId>("slider");

  const tools: Array<{
    id: GenericToolId;
    de: string;
    zh: string;
    subtitleDE: string;
    subtitleZH: string;
    archetype: string;
  }> = [
    {
      id: "slider",
      de: "Kausal-Schieberegler",
      zh: "因果变量滑块",
      subtitleDE: "2D-Koordinatensystem mit Live-Kennlinien & Ursache-Wirkungs-Analyse",
      subtitleZH: "2D 坐标曲线与参数驱动因果链推演",
      archetype: "Variable / Elastizitaet / Dynamik",
    },
    {
      id: "balance",
      de: "Diskurs-Waage",
      zh: "价值对决天平",
      subtitleDE: "Physikalische Hebelwaage mit Drehmoment-Kalkuel & Urteilsfindung",
      subtitleZH: "双臂杠杆物理力矩解算与道德权重权衡",
      archetype: "Dilemma / Ethik / Pro & Contra",
    },
    {
      id: "logic",
      de: "Logik-Baukasten",
      zh: "论证推理积木",
      subtitleDE: "Formale Syllogismen, Fehlschluss-Detektor & 15-NP-Bewertungsmatrix",
      subtitleZH: "形式三段论、谬误检测器与 15 NP 作答量规",
      archetype: "Deduktion / Argumentation / Fehlschluesse",
    },
    {
      id: "tree",
      de: "Entscheidungsbaum",
      zh: "情境决策抉择树",
      subtitleDE: "Mehrstufige Szenarien, Pfadverfolgung & AFB-III-Wirkungsanalyse",
      subtitleZH: "多阶分支拓扑、活跃路径高亮与次生影响评估",
      archetype: "Szenario / Kettenreaktion / AFB III",
    },
  ];

  return (
    <div className="flex flex-col gap-6 text-[var(--ink)]">
      {/* 顶部介绍与切换条 */}
      <header className="border-b border-[var(--line)] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            {lang === "de" ? "Mikrowelten-Laboratorium" : "微世界与仿真教具总台"}
          </h2>
          <p className="text-xs text-[var(--ink-muted)] mt-1 font-mono">
            {lang === "de"
              ? "4 universelle Tufte-SVG-Interaktionsbausteine fuer jedes beliebige Buch & 24 native Fachsimulatoren."
              : "4 款通用可动 Tufte 纯 SVG 互动微世界，适配任意教材概念；与 24 款高性能原生教具无缝贯通。"}
          </p>
        </div>

        {/* 快捷跳转至原生 Labor */}
        {onNavigateToTab && (
          <button
            type="button"
            onClick={() => onNavigateToTab("labor")}
            className="text-xs font-mono px-3 py-1.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] transition-colors cursor-pointer flex items-center gap-1.5 self-start md:self-auto"
          >
            <span>{lang === "de" ? "Alle 24 Fach-Werkzeuge öffnen" : "浏览全部 24 款原生专业教具"}</span>
            <span aria-hidden="true">-&gt;</span>
          </button>
        )}
      </header>

      {/* 4 大通用教具选择标签栏 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {tools.map((t) => {
          const isSelected = selectedTool === t.id;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setSelectedTool(t.id)}
              className={`p-3 border text-left flex flex-col justify-between transition-colors cursor-pointer ${
                isSelected
                  ? "border-[var(--ink)] bg-[var(--paper)] ring-1 ring-[var(--ink)]"
                  : "border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] hover:bg-[var(--paper)]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-1 mb-1">
                  <span className="font-bold text-xs tracking-tight">
                    {lang === "de" ? t.de : t.zh}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--ink-muted)] border border-[var(--line)] px-1 py-0.2">
                    SVG
                  </span>
                </div>
                <p className="text-[11px] text-[var(--ink-muted)] leading-relaxed line-clamp-2">
                  {lang === "de" ? t.subtitleDE : t.subtitleZH}
                </p>
              </div>
              <div className="mt-2.5 pt-2 border-t border-[var(--line)] text-[10px] font-mono text-[var(--ink-muted)]">
                {t.archetype}
              </div>
            </button>
          );
        })}
      </div>

      {/* 活跃教具展示与可交互演练工作台 */}
      <section className="border border-[var(--line)] p-4 sm:p-6 bg-[var(--paper)] flex flex-col gap-4">
        {selectedTool === "slider" && (
          <VariableSliderBox
            title={lang === "de" ? "Kausal-Schieberegler: Interaktive Kennlinie" : "因果变量滑块：动态响应曲线沙盘"}
            lang={lang}
          />
        )}

        {selectedTool === "balance" && (
          <DilemmaBalanceScale
            title={lang === "de" ? "Diskurs-Waage: Dialektisches Urteil" : "价值对决天平：辩证权衡沙盘"}
            lang={lang}
          />
        )}

        {selectedTool === "logic" && (
          <LogicBlockBuilder
            title={lang === "de" ? "Argumentations- & Logik-Baukasten" : "论证推理与因果积木工坊"}
            lang={lang}
          />
        )}

        {selectedTool === "tree" && (
          <ScenarioDecisionTree
            title={lang === "de" ? "Szenario-Entscheidungsbaum & Kettenreaktion" : "情境决策树与次生因果推演沙盘"}
            lang={lang}
          />
        )}
      </section>
    </div>
  );
};
