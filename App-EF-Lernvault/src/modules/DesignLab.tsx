// DesignLab: 前沿教学交互实验展厅 (Didaktische Experimentierbühne)
// 专用于孵化、打磨与验证下一代微课动画剧场与文科实验 Demo 的专属沙盒空间。
// 移除了抽象多体碰撞模型与早期静态卡片，专注于高质量场景微课（presentation.html 范式）。

import { useState } from "react";
import type { Lang } from "../i18n";
import { SowiDepotLecture } from "../components/pedagogy/SowiDepotLecture";
import { FaustLectureTheatre } from "../components/pedagogy/FaustLectureTheatre";
import { DilemmaTheatre } from "../components/pedagogy/DilemmaTheatre";

export type DesignDemoId =
  | "sowi-depot"
  | "faust-lecture"
  | "philo-trolley";

interface DemoOption {
  id: DesignDemoId;
  nameDE: string;
  nameZH: string;
  taglineDE: string;
  taglineZH: string;
  category: "lecture" | "gewi-lab";
  status: "verified" | "incubating";
}

const DEMO_OPTIONS: DemoOption[] = [
  {
    id: "sowi-depot",
    nameDE: "Interaktive Vorlesung: Depot & Orderbuch",
    nameZH: "互动微课动画剧场 · 证券存托与订单簿",
    taglineDE: "60FPS Vektor-Animation, Zinskrise, Orderbuch-Tiefe & Sokratischer Dialog",
    taglineZH: "免录制纯代码矢量微课、储蓄危机、订单簿深度撮合与苏格拉底思维卡点",
    category: "lecture",
    status: "verified",
  },
  {
    id: "faust-lecture",
    nameDE: "Vorlesungs-Bühne: Faust I (Erkenntnis vs. Schuld)",
    nameZH: "互动微课动画剧场 · 浮士德悲剧：求知探索 对阵 毁人罪责",
    taglineDE: "Goethe-Pflichtlektüre Abitur: Gelehrtenkrise, Blutpakt, Gretchenfrage & Kerker-Dialektik",
    taglineZH: "德国高考必考原典微课剧场：学者认识论绝望、血字契约、格蕾琴诱惑链与死牢终审之声",
    category: "lecture",
    status: "verified",
  },
  {
    id: "philo-trolley",
    nameDE: "Dilemma-Theater: Trolley (Kant vs. Bentham)",
    nameZH: "辩证剧场 · 电车困境价值天平",
    taglineDE: "Bronze-Waage, Sachurteil vs. Werturteil, Deontologie vs. Utilitarismus",
    taglineZH: "古典青铜价值天平、事实与价值双轨裁决、义务论与功利主义双向权衡",
    category: "gewi-lab",
    status: "incubating",
  },
];

export function DesignLab({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [currentDemo, setCurrentDemo] = useState<DesignDemoId>("faust-lecture");

  const activeDemoMeta = DEMO_OPTIONS.find((d) => d.id === currentDemo) ?? DEMO_OPTIONS[0];

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl space-y-6 pb-20">
      {/* 典雅展馆/实验工坊 Masthead（Tufte 高雅学术风格） */}
      <header className="border-b border-[var(--line)] pb-5 pt-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--gray)]">
              EXPERIMENTELLES DIDAKTIK-ATELIER // TUFTE-EDITION
            </div>
            <h1 className="mt-1 font-serif text-2xl font-normal tracking-tight text-[var(--ink)]">
              {de ? "Didaktische Experimentierbühne" : "前沿教学交互实验展厅"}
            </h1>
            <p className="mt-1 max-w-2xl text-xs text-[var(--gray)] leading-relaxed">
              {de
                ? "Inkubationsraum für innovative Unterrichtsanimationen, Vorlesungs-Theater und Geisteswissenschafts-Labore (GeWi)."
                : "专用于孵化、打磨与验证下一代微课动画剧场与文科实验 Demo 的专属沙盒空间，成熟后正式并入课程与研习工坊。"}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--line)] bg-[var(--paper-subtle)] px-2.5 py-1 text-[11px] font-mono text-[var(--gray)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              {de ? "Inkubation aktiv" : "试验沙盒运行中"}
            </span>
          </div>
        </div>

        {/* 实验 Demo 选项胶囊条 */}
        <div className="mt-5 flex flex-wrap gap-2 pt-3 border-t border-[var(--line)]/60">
          {DEMO_OPTIONS.map((demo) => {
            const isSelected = demo.id === currentDemo;
            return (
              <button
                key={demo.id}
                type="button"
                onClick={() => setCurrentDemo(demo.id)}
                className={`group flex items-center gap-2 rounded-md px-3 py-1.5 text-xs transition cursor-pointer ${
                  isSelected
                    ? "border border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-xs"
                    : "border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:border-[var(--gray)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isSelected
                      ? "bg-[var(--accent)]"
                      : "bg-[var(--line)] group-hover:bg-[var(--gray)]"
                  }`}
                />
                <span>{de ? demo.nameDE : demo.nameZH}</span>
                {demo.status === "verified" && (
                  <span className="text-[10px] font-mono text-[#065f46] bg-[#ecfdf5] border border-[#a7f3d0] px-1 rounded-xs">
                    {de ? "Vorlesungs-Theater" : "动画微课剧场"}
                  </span>
                )}
                {demo.status === "incubating" && (
                  <span className="text-[10px] font-mono text-[#1e40af] bg-[#eff6ff] border border-[#bfdbfe] px-1 rounded-xs">
                    {de ? "Labor-Demo" : "实验试研"}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* 当前选中 Demo 的副标题 */}
        <div className="mt-2.5 text-xs text-[var(--ink-muted)] font-mono">
          ↳ {de ? activeDemoMeta.taglineDE : activeDemoMeta.taglineZH}
        </div>
      </header>

      {/* 动态实验 Demo 舞台 */}
      <div className="transition-all duration-300">
        {currentDemo === "sowi-depot" && <SowiDepotLecture lang={lang} />}
        {currentDemo === "faust-lecture" && <FaustLectureTheatre lang={lang} />}
        {currentDemo === "philo-trolley" && (
          <DilemmaTheatre lang={lang} scenarioId="philo-trolley" />
        )}
      </div>
    </div>
  );
}
