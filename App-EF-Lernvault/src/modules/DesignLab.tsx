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
    nameDE: "Faust I: Textanalyse",
    nameZH: "歌德《浮士德 I》原著精读",
    taglineDE: "Originaltext & 6 Klausur-Dimensionen",
    taglineZH: "原著诗剧细读与六维会考真题",
  },
  {
    id: "sowi-depot",
    nameDE: "SoWi: Depot & Orderbuch",
    nameZH: "经济微课 · 订单簿撮合",
    taglineDE: "Zinskrise & Orderbuch-Tiefe",
    taglineZH: "通胀危机与 Xetra 订单簿撮合",
  },
];

export function DesignLab({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [currentDemo, setCurrentDemo] = useState<DesignDemoId>("faust-reading");

  const activeDemoMeta = DEMO_OPTIONS.find((d) => d.id === currentDemo) ?? DEMO_OPTIONS[0];

  return (
    <div
      className={`mx-auto w-full min-w-0 space-y-4 pb-16 transition-all duration-300 ${
        currentDemo === "faust-reading" ? "max-w-[1440px] px-2 sm:px-4" : "max-w-6xl px-4"
      }`}
    >
      {/* 极简 Tufte 学术工坊顶栏 */}
      <header className="border-b border-[var(--line)] pb-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="font-serif text-lg font-bold text-[var(--ink)] whitespace-nowrap">
            {de ? "Didaktische Experimentierbühne" : "教学交互实验展厅"}
          </h1>
          <span className="text-[11px] font-mono text-[var(--gray)] border-l border-[var(--line)] pl-2 hidden md:inline truncate">
            {de ? activeDemoMeta.taglineDE : activeDemoMeta.taglineZH}
          </span>
        </div>

        {/* 核心工坊切换胶囊 */}
        <div className="inline-flex rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-0.5 shadow-2xs shrink-0">
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
