// DesignLab: Interaktives UI/UX-Experimentierfeld & Style-Showcase.
// Völlig isoliert von Produktionsmodulen zum sicheren Vergleichen moderner Design-Paradigmen.
// Bietet 19 radikal unterschiedliche UI-Demos (Brilliant, Editorial, Gamified, Linear-Tech, Split-Workbench + 14 DesignStudio-Neuentwürfe).
// Reines Inline-SVG, kein Emoji, Tufte/Modern Token, flüssige Animationen.

import { useState } from "react";
import type { Lang } from "../i18n";
import { DilemmaTheatre } from "../components/pedagogy/DilemmaTheatre";
import { HaberBoschLab } from "../components/pedagogy/HaberBoschLab";
import { OpticsBench } from "../components/pedagogy/OpticsBench";
import { TitrationLab } from "../components/pedagogy/TitrationLab";
import { BoxOptimizerLab } from "../components/pedagogy/BoxOptimizerLab";
import { MarktWelfareLab } from "../components/pedagogy/MarktWelfareLab";
import { EditorialReader } from "../components/pedagogy/EditorialReader";
import { BentoMastery } from "../components/pedagogy/BentoMastery";
import { SowiDepotLecture } from "../components/pedagogy/SowiDepotLecture";

export type DesignStyleId =
  // 5 Golden Archetypes (Produktions-Standards)
  | "g1-optics"
  | "g1-markt"
  | "g1-box"
  | "g2-reader"
  | "g3-haber"
  | "g3-titration"
  | "g4-theatre"
  | "g5-bento"
  | "g6-lecture"
  // Foundation Baselines
  | "brilliant"
  | "editorial"
  | "gamified"
  | "workbench";

interface StyleOption {
  id: DesignStyleId;
  nameDE: string;
  nameZH: string;
  taglineDE: string;
  taglineZH: string;
  group: "archetypes" | "baselines";
  discipline: "mint" | "gewi" | "meta";
}

const STYLE_OPTIONS: StyleOption[] = [
  // --- 核心生产级教学原型 (Produktions-Standards) ---
  {
    id: "g1-optics",
    nameDE: "Optik-Werkbank (Snellius)",
    nameZH: "光学折射台 · Snellius 与全反射",
    taglineDE: "Laserstrahl, Snellius-Brechung, Totalreflexion & Tufte-HUD",
    taglineZH: "准直光束、折射定律连续渐变与临界角全反射机理",
    group: "archetypes",
    discipline: "mint",
  },
  {
    id: "g1-markt",
    nameDE: "Markt & Wohlfahrt (CS/PS/DWL)",
    nameZH: "市场福利调控台 · 剩余积分与死重损失",
    taglineDE: "Mindestpreis-Schieber, CS/PS/DWL-Flächen & AFB-III-Urteil",
    taglineZH: "最低限价动态滑杆、消费者/生产者剩余积分与评价论证",
    group: "archetypes",
    discipline: "gewi",
  },
  {
    id: "g1-box",
    nameDE: "Box-Optimierer (Extremwert)",
    nameZH: "容积极值沙盘 · 铁皮展开与导数求解",
    taglineDE: "2D-Zuschnitt & 3D-Faltung, V(x)-Extremwertkurve & Ableitung",
    taglineZH: "剪角折叠联动、体积函数极大值切线逼近与导数三步法",
    group: "archetypes",
    discipline: "mint",
  },
  {
    id: "g2-reader",
    nameDE: "Editorial Reader (Originaltexte)",
    nameZH: "原典精读画刊 · 德英文学沉浸研读",
    taglineDE: "Magazin-Hero, Sticky-TOC, Vers-Anmerkungen & Stilmittel-Klick",
    taglineZH: "典雅画刊头图、行标导航、词句交互注记与修辞手法自检",
    group: "archetypes",
    discipline: "gewi",
  },
  {
    id: "g3-haber",
    nameDE: "Haber-Bosch (60FPS Kollision)",
    nameZH: "哈伯法活塞动力学 · 微观受力与碰撞",
    taglineDE: "60FPS Teilchenkollision, Piston-Kompression, Le-Chatelier",
    taglineZH: "微观弹性碰撞模拟、活塞位移压缩与勒夏特列平衡移动",
    group: "archetypes",
    discipline: "mint",
  },
  {
    id: "g3-titration",
    nameDE: "Titration (Dekaden-Skala)",
    nameZH: "滴定突跃实验舱 · 离子浓度对数断崖",
    taglineDE: "10⁶-Dekaden-pH-Sprung, Phenolphthalein-Gradient & Rührer",
    taglineZH: "百万倍离子浓度对数跃迁标尺、指示剂显色与滴定突跃",
    group: "archetypes",
    discipline: "mint",
  },
  {
    id: "g4-theatre",
    nameDE: "Dilemma-Theater (4 Akte)",
    nameZH: "辩证剧场 · 价值天平与四幕冲突",
    taglineDE: "Bronze-Waage, Sachurteil vs. Werturteil, Universal Philo/SoWi/DE",
    taglineZH: "古典价值天平、事实与价值双轨裁决，哲学/社科/德语通用",
    group: "archetypes",
    discipline: "gewi",
  },
  {
    id: "g5-bento",
    nameDE: "Bento Mastery (Klausur HUD)",
    nameZH: "考前攻坚总控台 · 限时模考与采分点",
    taglineDE: "Klausur-Countdown, Live-Rubric, XP-Ring & Fehler-Attribution",
    taglineZH: "模考倒计时、点亮式采分点自查核验与错题归因沉淀",
    group: "archetypes",
    discipline: "meta",
  },
  {
    id: "g6-lecture",
    nameDE: "Vorlesungs-Bühne (SoWi Depot)",
    nameZH: "互动微课动画剧场 · 证券存托与订单簿",
    taglineDE: "60FPS Vektor-Animation, Max' Zinskrise, Orderbuch-Tiefe & Sokratik",
    taglineZH: "免录制纯代码矢量微课、储蓄危机、订单簿深度撮合与思维卡点",
    group: "archetypes",
    discipline: "gewi",
  },
  // --- 基础范式对比 (Baselines) ---
  {
    id: "brilliant",
    nameDE: "Brilliant Interactive Flow",
    nameZH: "Brilliant 渐进卡片流",
    taglineDE: "Bite-Sized-Karten, interaktive Regler im Zentrum, ambienter Raum",
    taglineZH: "碎片化步骤卡片、核心交互居中、轻微环境层次",
    group: "baselines",
    discipline: "meta",
  },
  {
    id: "editorial",
    nameDE: "Craft / Notion Magazine",
    nameZH: "Craft 杂志级图文画刊",
    taglineDE: "Großzügiges Banner, schwebende Pill-Navigation, edle Typografie",
    taglineZH: "大幅艺术氛围头图、流式留白、悬浮胶囊导航",
    group: "baselines",
    discipline: "gewi",
  },
  {
    id: "gamified",
    nameDE: "Duolingo Adventure Quest",
    nameZH: "Duolingo 关卡探险图",
    taglineDE: "Isometrischer Pfad, Knotenpunkte, Level-Fortschritt & XP",
    taglineZH: "连线关卡地图、角色微表情对话气泡、进度节点星星",
    group: "baselines",
    discipline: "meta",
  },
  {
    id: "workbench",
    nameDE: "Split-Workbench (Labor Studio)",
    nameZH: "经典双栏实验工作台",
    taglineDE: "Links interaktive Visualisierung, rechts strukturierte Klausur-Konsole",
    taglineZH: "左侧 60% 动态仿真动画大视窗，右侧 40% 答题控制台",
    group: "baselines",
    discipline: "mint",
  },
];

export function DesignLab({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [currentStyle, setCurrentStyle] = useState<DesignStyleId>("g1-optics");
  const [activeGroup, setActiveGroup] = useState<"archetypes" | "baselines">("archetypes");
  const [sliderVal, setSliderVal] = useState<number>(50);
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  const displayedOptions = STYLE_OPTIONS.filter((s) => s.group === activeGroup);

  return (
    <div className="mx-auto w-full min-w-0 max-w-5xl space-y-6 pb-20">
      {/* 典雅展馆/工坊 Masthead（去 AI 荧光质感，纯净学术） */}
      <header className="border-b border-[var(--line)] pb-5 pt-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-baseline sm:justify-between">
          <div>
            <div className="text-[11px] font-mono tracking-widest uppercase text-[var(--gray)]">
              ATELIER FÜR DIDAKTISCHE INTERAKTION // TUFTE-EDITION
            </div>
            <h1 className="mt-1 font-serif text-2xl font-normal tracking-tight text-[var(--ink)]">
              {de ? "Die 5 Didaktischen Interaktions-Archetypen" : "五大教学交互原型工坊"}
            </h1>
            <p className="mt-1 max-w-2xl text-xs text-[var(--gray)] leading-relaxed">
              {de
                ? "Reduziertes Design, authentische physikalische Kausalität und Null-Dekorations-Prinzip für 269 Oberstufen-Lernreisen."
                : "摒弃人工智能生成的过度饱和感与虚饰元素；以克制沉稳的学术排印、真实物理数学因果律与开阔留白呈现。"}
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-[var(--line)] bg-[var(--paper-subtle)] px-2.5 py-1 text-[11px] font-mono text-[var(--gray)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--success)]" />
              {de ? "269 Kurse aktiv" : "已打通 269 门课程"}
            </span>
          </div>
        </div>

        {/* 双层静雅导航：分组选择 + 极简选项条 */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--line)]/60">
          <div className="inline-flex rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-0.5 text-xs">
            <button
              onClick={() => {
                setActiveGroup("archetypes");
                setCurrentStyle("g1-optics");
              }}
              className={`rounded-md px-3 py-1 font-medium transition ${
                activeGroup === "archetypes"
                  ? "bg-[var(--surface)] text-[var(--ink)] shadow-xs"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              {de ? "Kern-Archetypen (8 Module)" : "核心教学原型（8门工坊）"}
            </button>
            <button
              onClick={() => {
                setActiveGroup("baselines");
                setCurrentStyle("brilliant");
              }}
              className={`rounded-md px-3 py-1 font-medium transition ${
                activeGroup === "baselines"
                  ? "bg-[var(--surface)] text-[var(--ink)] shadow-xs"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              {de ? "Basismodelle (Vergleich)" : "基础设计范式对比"}
            </button>
          </div>

          <div className="text-[11px] font-mono text-[var(--gray)]">
            {activeGroup === "archetypes"
              ? de ? "G1 bis G5: Produktionsstandard" : "G1 ~ G5 生产级通用规范"
              : de ? "Design-Exploration Referenzen" : "早期设计参照系"}
          </div>
        </div>

        {/* 单项轻量切换 Pill 列表 */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {displayedOptions.map((style) => {
            const isSelected = style.id === currentStyle;
            return (
              <button
                key={style.id}
                onClick={() => setCurrentStyle(style.id)}
                className={`group flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs transition ${
                  isSelected
                    ? "border border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] font-semibold shadow-xs"
                    : "border border-transparent bg-transparent text-[var(--gray)] hover:border-[var(--line)] hover:bg-[var(--paper-subtle)] hover:text-[var(--ink)]"
                }`}
              >
                <span className={`h-1.5 w-1.5 rounded-full ${isSelected ? "bg-[var(--accent)]" : "bg-[var(--line)] group-hover:bg-[var(--gray)]"}`} />
                <span>{de ? style.nameDE : style.nameZH}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Dynamic Style Viewer Canvas */}
      <div className="transition-all duration-300">
        {/* 5 Golden Archetypes (Produktion) */}
        {currentStyle === "g1-optics" && <OpticsBench lang={lang} />}
        {currentStyle === "g1-markt" && <MarktWelfareLab lang={lang} />}
        {currentStyle === "g1-box" && <BoxOptimizerLab lang={lang} />}
        {currentStyle === "g2-reader" && <EditorialReader lang={lang} />}
        {currentStyle === "g3-haber" && <HaberBoschLab lang={lang} />}
        {currentStyle === "g3-titration" && <TitrationLab lang={lang} />}
        {currentStyle === "g4-theatre" && (
          <DilemmaTheatre lang={lang} scenarioId="philo-trolley" />
        )}
        {currentStyle === "g5-bento" && <BentoMastery lang={lang} />}
        {currentStyle === "g6-lecture" && <SowiDepotLecture lang={lang} />}

        {/* Foundation Baselines */}
        {currentStyle === "brilliant" && (
          <BrilliantStyleDemo
            lang={lang}
            sliderVal={sliderVal}
            setSliderVal={setSliderVal}
            quizAnswer={quizAnswer}
            setQuizAnswer={setQuizAnswer}
          />
        )}
        {currentStyle === "editorial" && <EditorialStyleDemo lang={lang} />}
        {currentStyle === "gamified" && (
          <GamifiedStyleDemo
            lang={lang}
            stepIndex={stepIndex}
            setStepIndex={setStepIndex}
          />
        )}
        {currentStyle === "workbench" && (
          <WorkbenchStyleDemo
            lang={lang}
            sliderVal={sliderVal}
            setSliderVal={setSliderVal}
          />
        )}
      </div>
    </div>
  );
}

// =========================================================================
// DEMO 1: BRILLIANT INTERACTIVE FLOW
// =========================================================================
function BrilliantStyleDemo({
  lang,
  sliderVal,
  setSliderVal,
  quizAnswer,
  setQuizAnswer,
}: {
  lang: Lang;
  sliderVal: number;
  setSliderVal: (v: number) => void;
  quizAnswer: number | null;
  setQuizAnswer: (v: number | null) => void;
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-b from-[#0c1322] via-[#090e17] to-[#060910] p-6 text-white shadow-2xl">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-emerald-600/15 blur-3xl" />

      {/* Header with pill progress */}
      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-blue-400">
              PHYSIK · SCHWINGUNGEN
            </span>
            <span className="text-[11px] text-gray-400">Schritt 3 von 5</span>
          </div>
          <h2 className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
            {lang === "de"
              ? "Wie beeinflusst Masse die Schwingungsdauer?"
              : "质量如何改变简谐振动的周期？"}
          </h2>
        </div>

        {/* Brilliant-style interactive step capsules */}
        <div className="flex items-center gap-1.5 rounded-full bg-white/5 p-1 backdrop-blur-md">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-2 rounded-full transition-all ${
                s === 3
                  ? "w-8 bg-blue-500 shadow-[0_0_10px_#3b82f6]"
                  : s < 3
                  ? "w-2 bg-emerald-500"
                  : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left 7 Cols: High-contrast Interactive Visualization Card */}
        <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md lg:col-span-7">
          <div className="mb-3 flex items-center justify-between text-xs font-mono text-gray-400">
            <span>INTERAKTIVER SIMULATOR</span>
            <span className="text-blue-400">m = {(sliderVal * 0.05 + 0.5).toFixed(2)} kg</span>
          </div>

          {/* Animated Spring SVG with Mass */}
          <div className="relative flex h-52 items-center justify-center overflow-hidden rounded-lg bg-[#04060a]/80 border border-white/5">
            <svg width="280" height="180" viewBox="0 0 280 180" className="overflow-visible">
              {/* Ceiling */}
              <line x1="40" y1="20" x2="240" y2="20" stroke="#4b5563" strokeWidth="4" strokeLinecap="round" />
              {/* Coil spring */}
              <path
                d={`M 140 20 C 120 30, 160 40, 140 50 C 120 60, 160 70, 140 80 C 120 90, 160 100, 140 ${
                  100 + (sliderVal - 50) * 0.6
                }`}
                fill="none"
                stroke="#60a5fa"
                strokeWidth="3"
                className="transition-all duration-150"
              />
              {/* Weight block */}
              <rect
                x={140 - (18 + sliderVal * 0.15)}
                y={100 + (sliderVal - 50) * 0.6}
                width={36 + sliderVal * 0.3}
                height={28 + sliderVal * 0.2}
                rx="6"
                fill="#2563eb"
                stroke="#93c5fd"
                strokeWidth="2"
                className="transition-all duration-150 shadow-lg"
              />
              <text
                x="140"
                y={118 + (sliderVal - 50) * 0.6 + sliderVal * 0.1}
                fill="#ffffff"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                {(sliderVal * 0.05 + 0.5).toFixed(2)} kg
              </text>
            </svg>

            {/* Micro Energy Gauge Overlay */}
            <div className="absolute bottom-2 right-3 flex items-center gap-2 rounded bg-black/60 px-2 py-1 text-[11px] font-mono text-gray-300 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>T = {(2 * Math.PI * Math.sqrt((sliderVal * 0.05 + 0.5) / 25)).toFixed(2)} s</span>
            </div>
          </div>

          {/* Interactive Slider */}
          <div className="mt-4 space-y-1.5">
            <div className="flex justify-between text-xs text-gray-300">
              <span>{lang === "de" ? "Masse variieren" : "拖动调节砝码质量"}</span>
              <span className="font-mono text-blue-400">D = 25 N/m (konstant)</span>
            </div>
            <input
              type="range"
              min="10"
              max="90"
              value={sliderVal}
              onChange={(e) => setSliderVal(Number(e.target.value))}
              className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-800 accent-blue-500"
            />
          </div>
        </div>

        {/* Right 5 Cols: Bite-sized Insight & Active Question Card */}
        <div className="flex flex-col justify-between space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-md lg:col-span-5">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 rounded bg-amber-500/10 px-2 py-0.5 text-[11px] font-medium text-amber-300">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                <path d="M6 1L7.5 4.5H11L8.2 6.8L9.3 10.2L6 8L2.7 10.2L3.8 6.8L1 4.5H4.5L6 1Z" />
              </svg>
              <span>{lang === "de" ? "Schlüsselerkenntnis" : "核心现象直观"}</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              {lang === "de" ? (
                <>
                  Beobachten Sie: Größere Masse hat eine stärkere <strong>Trägheit</strong>. Die Feder benötigt
                  mehr Zeit für einen vollen Zyklus: <span className="font-mono text-blue-400">T ∝ √m</span>.
                </>
              ) : (
                <>
                  观察规律：质量越大，物体<strong>惯性越大</strong>。弹簧回复力改变其运动状态越困难，完整振荡一周耗时更长：
                  <span className="font-mono text-blue-400">T ∝ √m</span>。
                </>
              )}
            </p>

            {/* Multiple Choice Interactive Quiz */}
            <div className="mt-4 space-y-2 border-t border-white/10 pt-3">
              <div className="text-xs font-semibold text-gray-300">
                {lang === "de"
                  ? "Was passiert mit der Periode T, wenn Sie die Masse vervierfachen (4× m)?"
                  : "快速测验：若将质量变为 4 倍 (4m)，周期 T 将如何变化？"}
              </div>

              {[
                { id: 1, text: lang === "de" ? "T verdoppelt sich (2×)" : "T 变为 2 倍（翻倍）", correct: true },
                { id: 2, text: lang === "de" ? "T vervierfacht sich (4×)" : "T 变为 4 倍", correct: false },
                { id: 3, text: lang === "de" ? "T bleibt exakt gleich" : "T 保持不变", correct: false },
              ].map((opt) => {
                const isChosen = quizAnswer === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setQuizAnswer(opt.id)}
                    className={`w-full rounded-lg border p-2.5 text-left text-xs font-medium transition-all ${
                      isChosen
                        ? opt.correct
                          ? "border-emerald-500 bg-emerald-500/20 text-emerald-300"
                          : "border-rose-500 bg-rose-500/20 text-rose-300"
                        : "border-white/10 bg-white/5 text-gray-200 hover:border-white/25 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{opt.text}</span>
                      {isChosen && (
                        <span>{opt.correct ? "✓ Exakt!" : "✗ Nicht ganz"}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-[11px] text-gray-400">
              {quizAnswer === 1 ? "✓ Richtig gelöst! +15 XP" : "Wähle eine Option zur Freischaltung"}
            </span>
            <button
              disabled={quizAnswer !== 1}
              className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-all hover:bg-blue-500 disabled:opacity-40"
            >
              {lang === "de" ? "Nächster Schritt →" : "继续下一步 →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// DEMO 2: EDITORIAL MAGAZINE / CRAFT.DO STYLE
// =========================================================================
function EditorialStyleDemo({ lang }: { lang: Lang }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xl">
      {/* Magazine Full-bleed Cover Banner with SVG Abstract Art */}
      <div className="relative h-48 w-full overflow-hidden bg-gradient-to-r from-violet-900 via-indigo-900 to-slate-900 sm:h-56">
        <svg
          className="absolute inset-0 h-full w-full opacity-30 mix-blend-overlay"
          viewBox="0 0 800 300"
          preserveAspectRatio="none"
        >
          <path d="M0 100 C 200 250, 400 0, 800 200 L 800 300 L 0 300 Z" fill="#c084fc" />
          <circle cx="650" cy="80" r="120" fill="#818cf8" filter="blur(40px)" />
        </svg>

        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[var(--card)] via-[var(--card)]/40 to-transparent p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <span className="rounded bg-violet-500/20 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-violet-300 backdrop-blur">
              SOWI · KAPITEL 09
            </span>
            <span className="text-xs text-gray-300">Lesezeit: 4 Min.</span>
          </div>
          <h1 className="mt-2 text-2xl font-serif font-bold text-[var(--text)] sm:text-3xl">
            {lang === "de"
              ? "Soziale Marktwirtschaft: Die Balance zwischen Freiheit & Gerechtigkeit"
              : "社会市场经济：自由竞争与社会公平的动态天平"}
          </h1>
        </div>
      </div>

      {/* Floating Pill Table of Contents */}
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--line)] bg-[var(--card)]/90 px-6 py-2.5 backdrop-blur-md">
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--gray)] overflow-x-auto">
          {["1. Das Leitbild", "2. Ordoliberalismus", "3. Marktversagen", "4. Klausur-Urteil"].map(
            (sec, idx) => (
              <span
                key={sec}
                className={`cursor-pointer whitespace-nowrap rounded-full px-3 py-1 transition-all ${
                  idx === 0
                    ? "bg-[var(--text)] text-[var(--bg)] font-semibold shadow-sm"
                    : "hover:bg-[var(--line)]"
                }`}
              >
                {sec}
              </span>
            )
          )}
        </div>
        <div className="text-xs font-mono text-[var(--gray)]">AFB I–III</div>
      </div>

      {/* Content Layout with Side-by-side Illustrated Callout */}
      <div className="grid grid-cols-1 gap-8 p-6 sm:p-8 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-8">
          <p className="text-base text-[var(--text)] leading-relaxed font-serif">
            {lang === "de" ? (
              <>
                Die <em>Soziale Marktwirtschaft</em> verbindet das Prinzip der Freiheit auf dem Markt mit dem des
                sozialen Ausgleichs. Begründet durch die Freiburger Schule (Ordoliberalismus) um Walter Eucken und
                politisch realisiert durch Ludwig Erhard, fungiert der Staat als Schiedsrichter, nicht als Mitspieler.
              </>
            ) : (
              <>
                <strong>社会市场经济</strong>是将自由竞争的市场机制与社会公平再分配机制相结合的德国战后经济宪纲。由瓦尔特·欧肯为首的弗莱堡学派（秩序自由主义）奠定理论基石，并由路德维希·艾哈德推向政治实践。国家在其中扮演「严格公正的裁判员」，而非下场竞技的运动员。
              </>
            )}
          </p>

          {/* Illustrated Key Quote Card */}
          <div className="rounded-xl border-l-4 border-violet-500 bg-violet-500/5 p-4 pl-5">
            <div className="text-xs font-bold uppercase tracking-wider text-violet-400">
              {lang === "de" ? "Kernmaxime nach Alfred Müller-Armack" : "核心信条（阿尔弗雷德·米勒-阿尔马克）"}
            </div>
            <p className="mt-1 text-sm italic text-[var(--text)]">
              „So viel Markt wie möglich, so viel Staat wie nötig.“
            </p>
          </div>
        </div>

        {/* Right 4 Cols: Illustrated Visual Diagram Card */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--bg)] p-5 text-center lg:col-span-4">
          <div className="mb-2 text-xs font-mono uppercase tracking-wider text-[var(--gray)]">
            Drei Säulen Modell
          </div>
          <svg width="180" height="120" viewBox="0 0 180 120" className="my-2">
            <rect x="10" y="20" width="45" height="70" rx="4" fill="#8b5cf6" opacity="0.8" />
            <rect x="68" y="10" width="45" height="80" rx="4" fill="#3b82f6" opacity="0.8" />
            <rect x="125" y="30" width="45" height="60" rx="4" fill="#10b981" opacity="0.8" />
            <line x1="5" y1="95" x2="175" y2="95" stroke="currentColor" strokeWidth="2" />
          </svg>
          <div className="text-xs font-semibold text-[var(--text)]">
            Wettbewerb · Sozialstaat · Stabilität
          </div>
          <p className="mt-1 text-[11px] text-[var(--gray)]">
            {lang === "de" ? "Staatlicher Rahmen garantiert faire Spielregeln." : "强国家法律秩序框架保障公平自由竞争"}
          </p>
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// DEMO 3: DUOLINGO ADVENTURE QUEST STYLE
// =========================================================================
function GamifiedStyleDemo({
  lang,
  stepIndex,
  setStepIndex,
}: {
  lang: Lang;
  stepIndex: number;
  setStepIndex: (idx: number) => void;
}) {
  const nodes = [
    { id: 0, title: "1. Das Rätsel", xp: 10, completed: true, color: "#10b981" },
    { id: 1, title: "2. Mechanismus", xp: 20, completed: true, color: "#3b82f6" },
    { id: 2, title: "3. Labor-Duell", xp: 35, current: true, color: "#f59e0b" },
    { id: 3, title: "4. Klausur-Boss", xp: 50, locked: true, color: "#ef4444" },
  ];

  return (
    <div className="rounded-2xl border border-emerald-500/20 bg-gradient-to-b from-[#062016] via-[#04140e] to-[#020a07] p-6 text-white shadow-xl">
      {/* Top Gamification Header with Streak & Hearts */}
      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 font-bold">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14.5 5.5L4 16M14.5 5.5l1.5-1.5a1.4 1.4 0 0 1 2 2L16.5 7.5M14.5 5.5L12 8M4 16l-1 2 2-1M4 16l2.5-2.5" />
            </svg>
          </div>
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              KAMPAGNE: DER BIOLOGIE-PARKOUR
            </div>
            <div className="text-base font-bold text-white">
              {lang === "de" ? "Mission 04: Die Zellmembran-Schlacht" : "关卡 04：细胞膜跨膜防御战"}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-amber-300 border border-amber-500/20">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d="M6 1C6 1 8.5 3.5 8.5 6C8.5 7.4 7.4 8.5 6 8.5C4.6 8.5 3.5 7.4 3.5 6C3.5 5 4.5 3 6 1Z" />
            </svg>
            <span>7 Tage Streak</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-300 border border-emerald-500/20">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <polygon points="6,1 11,4.5 8,11 4,11 1,4.5" />
            </svg>
            <span>420 XP</span>
          </div>
        </div>
      </div>

      {/* Interactive Quest Path / Nodes */}
      <div className="relative my-8 flex flex-col items-center">
        {/* Winding Path Line */}
        <div className="absolute top-6 bottom-6 w-1 bg-emerald-500/20" />

        <div className="relative flex flex-col items-center gap-8 w-full max-w-md">
          {nodes.map((node, i) => {
            const isCurrent = node.id === stepIndex;
            return (
              <div
                key={node.id}
                onClick={() => setStepIndex(node.id)}
                className={`relative flex items-center gap-4 cursor-pointer transition-transform hover:scale-105 ${
                  i % 2 === 0 ? "self-start" : "self-end"
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl font-bold shadow-lg transition-all ${
                    node.completed
                      ? "bg-emerald-500 text-white shadow-emerald-500/30"
                      : isCurrent
                      ? "bg-amber-500 text-white animate-bounce shadow-amber-500/40 ring-4 ring-amber-400/30"
                      : "bg-gray-800 text-gray-500 border border-gray-700"
                  }`}
                >
                  {node.completed ? "✓" : isCurrent ? "★" : (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="6" width="10" height="8" rx="1.5" />
                      <path d="M5 6V4a3 3 0 0 1 6 0v2" />
                    </svg>
                  )}
                </div>

                {/* Node Label Card */}
                <div className="rounded-xl border border-white/10 bg-white/5 p-2.5 backdrop-blur-md">
                  <div className="text-xs font-semibold text-white">{node.title}</div>
                  <div className="text-[10px] text-emerald-400 font-mono">+{node.xp} XP Belohnung</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mascot AI Companion Speech Bubble */}
      <div className="flex items-start gap-4 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 backdrop-blur-md">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="9" />
            <circle cx="9" cy="10" r="1.5" fill="currentColor" />
            <circle cx="15" cy="10" r="1.5" fill="currentColor" />
            <path d="M12 13v2M9 16c1 1 5 1 6 0" />
          </svg>
        </div>
        <div className="space-y-1">
          <div className="text-xs font-bold text-emerald-300">
            TUTOR COMPANION (LEO)
          </div>
          <p className="text-xs text-emerald-100 leading-relaxed">
            {lang === "de"
              ? "Tipp für dein Duell: Vergiss nicht den Turgordruck! Wenn reines Wasser einströmt, verhindert die Zellwand das Platzen der Pflanzenzelle!"
              : "冒险伙伴贴士：别忘了植物细胞壁的膨压（Turgordruck）！当纯水通过渗透涌入时，正是坚固的纤维素细胞壁阻止了细胞涨破！"}
          </p>
        </div>
      </div>
    </div>
  );
}


// =========================================================================
// DEMO 5: SPLIT INTERACTIVE WORKBENCH
// =========================================================================
function WorkbenchStyleDemo({
  lang,
  sliderVal,
  setSliderVal,
}: {
  lang: Lang;
  sliderVal: number;
  setSliderVal: (v: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--card)] shadow-xl lg:grid-cols-12">
      {/* Left 7 Cols: Fullscreen Labor-Style Interactive Canvas */}
      <div className="flex flex-col justify-between border-b border-[var(--line)] bg-[var(--bg)] p-6 lg:col-span-7 lg:border-b-0 lg:border-r">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
            <span className="rounded bg-pink-500/10 px-2 py-0.5 text-pink-500 font-bold">
              CHEMIE · TITRATION
            </span>
            <span>PROBE: 0.1 M HCl + 0.1 M NaOH</span>
          </div>

          <h3 className="mt-2 text-lg font-bold text-[var(--text)]">
            {lang === "de"
              ? "Büretten-Volumen & Äquivalenzpunkt"
              : "滴定管加碱量与等当点突跃"}
          </h3>
        </div>

        {/* Dynamic Beaker Simulation */}
        <div className="my-6 flex flex-col items-center justify-center">
          <svg width="220" height="180" viewBox="0 0 220 180">
            {/* Burette tip */}
            <rect x="105" y="0" width="10" height="40" fill="#94a3b8" />
            <polygon points="105,40 115,40 110,50" fill="#64748b" />
            {/* Drop */}
            <circle cx="110" cy="65" r="3" fill="#38bdf8" className="animate-bounce" />
            {/* Beaker */}
            <path
              d="M 60 70 L 60 160 Q 60 170 70 170 L 150 170 Q 160 170 160 160 L 160 70"
              fill="none"
              stroke="#cbd5e1"
              strokeWidth="3"
            />
            {/* Fluid */}
            <path
              d="M 62 110 L 62 160 Q 62 168 70 168 L 150 168 Q 158 168 158 160 L 158 110 Z"
              fill={sliderVal > 50 ? "#c084fc" : "#fde047"}
              opacity="0.75"
              className="transition-colors duration-300"
            />
          </svg>
          <div className="font-mono text-sm font-bold text-[var(--text)]">
            pH = {(1 + (sliderVal / 100) * 12).toFixed(2)} (
            {sliderVal > 50 ? "Farbumschlag: Basisch" : "Sauer"})
          </div>
        </div>

        {/* Volume Slider */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs text-[var(--gray)]">
            <span>Zugesetztes Volumen V(NaOH):</span>
            <span className="font-mono text-[var(--text)]">{(sliderVal * 0.5).toFixed(1)} mL</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded bg-[var(--line)] accent-pink-500"
          />
        </div>
      </div>

      {/* Right 5 Cols: Klausur-Training & Rubric Console */}
      <div className="flex flex-col justify-between space-y-4 p-6 lg:col-span-5">
        <div className="space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--gray)]">
            KLAUSUR-AUFGABE // OPERATOR: ANALYSIEREN
          </div>
          <p className="text-xs text-[var(--text)] leading-relaxed">
            {lang === "de"
              ? "Erläutern Sie den steilen pH-Sprung im Bereich des Äquivalenzpunktes unter Bezugnahme auf die logarithmische Natur der pH-Skala."
              : "请结合 pH 标度的负对数数学本质，分析化学计量等当点附近发生剧烈 pH 突跃的机理。"}
          </p>

          <div className="rounded-lg border border-[var(--line)] bg-[var(--bg)] p-3 space-y-2">
            <div className="text-[11px] font-bold text-pink-500">MUSTERLÖSUNG (MUSTERBAUSTEIN)</div>
            <p className="text-[11px] text-[var(--gray)] leading-relaxed">
              „Am Äquivalenzpunkt reicht ein minimaler Tropfen NaOH aus, um die winzige Restkonzentration
              an H₃O⁺-Ionen (10⁻⁷ mol/L) schlagartig zu neutralisieren...“
            </p>
          </div>
        </div>

        <button className="w-full rounded-xl bg-[var(--text)] py-2.5 text-xs font-bold text-[var(--bg)] shadow-md transition-transform hover:scale-[1.02]">
          {lang === "de" ? "Erkenntnis in Fehlerlog festhalten" : "沉淀考点至错题集 / Klausur-Training"}
        </button>
      </div>
    </div>
  );
}
