// DesignLab: 前沿教学交互实验展厅 (Didaktische Experimentierbühne)
// 专用于孵化、打磨与验证下一代微课动画剧场与文科实验 Demo 的专属沙盒空间。
// 移除了抽象多体碰撞模型与早期静态卡片，专注于高质量场景微课（presentation.html 范式）。

import { useState } from "react";
import type { Lang } from "../i18n";
import { SowiDepotLecture } from "../components/pedagogy/SowiDepotLecture";
import { FaustReadingLab } from "../components/pedagogy/FaustReadingLab";

export type DesignDemoId = "faust-reading" | "sowi-depot";

interface DemoOption {
  id: DesignDemoId;
  nameDE: string;
  nameZH: string;
  taglineDE: string;
  taglineZH: string;
}

const DEMO_OPTIONS: DemoOption[] = [
  {
    id: "faust-reading",
    nameDE: "Klausur-Labor: Faust I (6 Dimensionen)",
    nameZH: "歌德《浮士德 I》文本细读与六维会考解剖工坊",
    taglineDE: "Originaltext mit Zeilen-Analyse, 6 Klausur-Dimensionen & EHZ-Erwartungshorizont",
    taglineZH: "带行号原著诗剧文本、逐行显微镜、六大考试维度与官方评分标准 (EHZ)",
  },
  {
    id: "sowi-depot",
    nameDE: "Interaktive Vorlesung: Depot & Orderbuch",
    nameZH: "经济微课动画剧场 · 证券存托与订单簿撮合",
    taglineDE: "Zinskrise, Orderbuch-Tiefe & Sokratischer Dialog",
    taglineZH: "通胀剪刀差危机、Xetra 订单簿撮合与苏格拉底思维互动",
  },
];

export function DesignLab({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [currentDemo, setCurrentDemo] = useState<DesignDemoId>("faust-reading");

  const activeDemoMeta = DEMO_OPTIONS.find((d) => d.id === currentDemo) ?? DEMO_OPTIONS[0];

  return (
    <div className="mx-auto w-full min-w-0 max-w-6xl space-y-4 pb-16">
      {/* 极简 Tufte 学术工坊顶栏 */}
      <header className="border-b border-[var(--line)] pb-3 pt-1 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-serif text-xl font-bold tracking-tight text-[var(--ink)]">
            {de ? "Didaktische Experimentierbühne" : "教学交互实验展厅"}
          </h1>
          <span className="text-[11px] font-mono text-[var(--gray)] border-l border-[var(--line)] pl-3 hidden sm:inline">
            {de ? activeDemoMeta.taglineDE : activeDemoMeta.taglineZH}
          </span>
        </div>

        {/* 核心工坊切换胶囊 */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-md">
          {DEMO_OPTIONS.map((demo) => {
            const isSelected = demo.id === currentDemo;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => setCurrentDemo(demo.id)}
                className={`flex items-center gap-1.5 rounded px-2.5 py-1 text-xs transition cursor-pointer ${
                  isSelected
                    ? "bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-2xs border border-[var(--line)]"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isSelected ? "bg-[var(--accent)]" : "bg-[var(--line)]"
                  }`}
                />
                <span>{de ? demo.nameDE : demo.nameZH}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* 动态实验 Demo 舞台 */}
      <div className="transition-all duration-200">
        {currentDemo === "faust-reading" && <FaustReadingLab lang={lang} />}
        {currentDemo === "sowi-depot" && <SowiDepotLecture lang={lang} />}
      </div>
    </div>
  );
}
