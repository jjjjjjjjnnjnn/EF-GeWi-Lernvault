// TitrationLab — G3 Socratic-Lab: 酸碱滴定与微观离子浓度断崖跃迁实验舱
// 具备玻璃锥形瓶涡旋、酚酞颜色渐变、微观离子十进位对数标尺与百万倍跃迁直观解析
import { useState } from "react";
import type { Lang } from "../../i18n";

const STEPS = [
  {
    v: 0,
    qDE: "Warum ist pH bei 0 mL HCl = 1.0 (rein Salzsäure c = 0,1 mol/L)?",
    qZH: "为什么未滴加 NaOH 时 pH 严格等于 1.0（HCl 浓度 0.1 mol/L）？",
    opts: [
      { id: "a", de: "pH = -log₁₀(0,1) = 1, weil HCl vollständig protolysiert", zh: "pH = -lg(0.1) = 1，因强酸在水中完全电离，[H₃O⁺] = 0.1 mol/L" },
      { id: "b", de: "Weil Wasser bei 25°C stets einen Basis-pH von 1 hat", zh: "因为水在常温下的基准酸度恒为 1" },
    ],
    correctId: "a",
    explainDE: "Starke Säuren protolysieren zu 100%. [H₃O⁺] = 10⁻¹ mol/L → pH = 1.",
    explainZH: "强酸在稀水溶液中 100% 解离，[H₃O⁺] = 0.1 = 10⁻¹ mol/L，根据定义 pH = 1。",
  },
  {
    v: 24.5,
    qDE: "Bei 24,5 mL NaOH (kurz vor 25 mL): Warum steigt pH nur langsam auf ca. 3?",
    qZH: "滴加到 24.5 mL（距 25 mL 等当点仅差 0.5 mL），为何 pH 仅缓升到 3 左右？",
    opts: [
      { id: "a", de: "Logarithmische Natur: 98% der H₃O⁺ sind weg, aber [H₃O⁺] = 10⁻³ mol/L ist immer noch hoch", zh: "对数尺效应：虽然 98% 的酸已被中和，但残留的 10⁻³ mol/L 仍是极大浓度" },
      { id: "b", de: "Weil NaOH sich noch nicht im Wasser gelöst hat", zh: "因为滴下的碱还未在溶液中充分溶解" },
    ],
    correctId: "a",
    explainDE: "Der pH-Wert ist logarithmisch! Um von pH 1 auf pH 3 zu kommen, müssen 99% der Protonen weg sein.",
    explainZH: "pH 标尺是对数尺！从 1 到 3 必须消灭 99% 的水合氢离子，此时依然由过量盐酸牢牢控制体系。",
  },
  {
    v: 25.0,
    qDE: "Äquivalenzpunkt (25,0 mL): Warum springt der pH-Wert schlagartig von 4 auf 10?",
    qZH: "等当点（25.0 mL）：为什么仅仅半滴滴定液，pH 就会发生 4 到 10 的剧烈垂直突跃？",
    opts: [
      { id: "a", de: "Ionen-Kollaps: Die letzten H₃O⁺ sind neutralisiert; 1 Überschusstropfen OH⁻ lässt [H₃O⁺] um den Faktor 1.000.000 abstürzen!", zh: "离子浓度雪崩：强酸强碱恰好中和，仅仅一滴过量碱液就让 [H₃O⁺] 发生百万倍（10⁶）断崖式崩溃！" },
      { id: "b", de: "Weil der Indikator Phenolphthalein selbst Säure produziert", zh: "因为酚酞指示剂本身突然产生了大量强酸" },
    ],
    correctId: "a",
    explainDE: "Phänomenaler pH-Sprung: Von [H₃O⁺] = 10⁻⁴ (pH 4) zu 10⁻¹⁰ (pH 10) beträgt der Faktor 10⁶ = eine Million! Deshalb ist der Sprung im Diagramm senkrecht.",
    explainZH: "百万倍离子雪崩：从 pH 4（10⁻⁴）跨越到 pH 10（10⁻¹⁰），离子浓度被稀释/沉降了一百万倍！这就是滴定曲线上那道标志性的陡峭垂直突跃！",
  },
];

export function TitrationLab({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [vol, setVol] = useState<number>(0);
  const [picked, setPicked] = useState<string | null>(null);

  // 严格根据 25 mL 0.1M HCl 滴定计算理论 pH 与离子浓度指数
  let calcPH = 1.0;
  if (vol < 24.8) {
    const rem = (25 * 0.1 - vol * 0.1) / (25 + vol);
    calcPH = Math.max(1.0, -Math.log10(Math.max(1e-6, rem)));
  } else if (vol <= 25.2) {
    calcPH = 4.0 + ((vol - 24.8) / 0.4) * 6.0;
  } else {
    const ohExcess = ((vol - 25) * 0.1) / (25 + vol);
    calcPH = Math.min(13.0, 14 + Math.log10(Math.max(1e-6, ohExcess)));
  }

  // 酚酞颜色过渡 (pH < 8.2 无色，8.2 - 10 逐渐变粉红，>10 浓艳紫红)
  let flaskColor = "rgba(224, 242, 254, 0.25)";
  if (calcPH >= 8.2) {
    const alpha = Math.min(0.85, (calcPH - 8.2) / 1.8);
    flaskColor = `rgba(244, 63, 94, ${alpha.toFixed(2)})`;
  }

  const curStep = vol < 12 ? STEPS[0] : vol < 24.9 ? STEPS[1] : STEPS[2];
  const correct = picked === curStep.correctId;

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* 左侧 58% 高保真玻璃仪器视窗 */}
      <section className="flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:w-[58%]">
        <div className="mb-3 flex items-center justify-between border-b border-[var(--line)] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--ink)]" />
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--ink)]">
              {de ? "Säure-Base-Titration // pH-Sprung" : "酸碱滴定化学分析台"}
            </h4>
          </div>
          <span className="font-mono text-xs text-[var(--ink)]">
            V(NaOH) = {vol.toFixed(1)} mL · pH = <strong className="font-bold">{calcPH.toFixed(2)}</strong>
          </span>
        </div>

        <div className="flex flex-col gap-3 rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-3 sm:flex-row dark:bg-[#18181b]">
          {/* 玻璃锥形瓶 SVG */}
          <div className="flex-1">
            <svg viewBox="0 0 200 200" className="h-44 w-full select-none font-mono">
              {/* 滴定管下嘴 */}
              <rect x="96" y="0" width="8" height="35" fill="currentColor" className="text-[var(--gray)]" />
              <path d="M 96 35 L 100 45 L 104 35 Z" fill="currentColor" className="text-[var(--ink)]" />
              {/* 滴下的液滴 */}
              <circle cx="100" cy="58" r="2.5" fill="#2563eb" />

              {/* 锥形瓶玻璃外壁 */}
              <path
                d="M 85 70 L 115 70 L 115 90 L 165 175 C 170 185 160 190 150 190 L 50 190 C 40 190 30 185 35 175 L 85 90 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--gray)]"
              />
              {/* 溶液液面 (动态染色) */}
              <path
                d="M 44 175 L 156 175 L 150 188 L 50 188 Z"
                fill={flaskColor}
              />
              {/* 磁力搅拌子与涡流 */}
              <ellipse cx="100" cy="184" rx="9" ry="2" fill="currentColor" className="text-[var(--paper)]" />
              <path d="M 92 178 Q 100 174 108 178" fill="none" stroke="currentColor" strokeWidth="0.8" className="text-[var(--gray)]" />
            </svg>
          </div>

          {/* 右侧微观离子十进位对数标尺 */}
          <div className="flex w-full flex-col justify-center rounded border border-[var(--line)] bg-[var(--surface)] p-2.5 sm:w-44 font-mono">
            <p className="text-[10px] font-medium uppercase text-[var(--gray)]">
              {de ? "[H₃O⁺]-Dekaden-Skala" : "离子浓度对数标尺"}
            </p>
            <div className="my-2 space-y-1 text-[11px]">
              <div className={`flex justify-between px-2 py-0.5 rounded ${calcPH < 3 ? "bg-[var(--line)] text-[var(--ink)] font-bold" : "text-[var(--gray)]"}`}>
                <span>10⁻¹ mol/L</span>
                <span>pH 1</span>
              </div>
              <div className={`flex justify-between px-2 py-0.5 rounded ${calcPH >= 3 && calcPH < 5 ? "bg-[var(--line)] text-[var(--ink)] font-bold" : "text-[var(--gray)]"}`}>
                <span>10⁻⁴ mol/L</span>
                <span>pH 4</span>
              </div>
              <div className={`flex justify-between px-2 py-0.5 rounded ${calcPH >= 6.5 && calcPH <= 7.5 ? "bg-[var(--line)] text-[var(--ink)] font-bold" : "text-[var(--gray)]"}`}>
                <span>10⁻⁷ mol/L</span>
                <span>pH 7 (ÄP)</span>
              </div>
              <div className={`flex justify-between px-2 py-0.5 rounded ${calcPH > 9 ? "bg-[var(--line)] text-[var(--ink)] font-bold" : "text-[var(--gray)]"}`}>
                <span>10⁻¹⁰ mol/L</span>
                <span>pH 10</span>
              </div>
            </div>
            <p className="text-[9px] text-[var(--gray)] leading-tight">
              {de ? "10⁻⁴ → 10⁻¹⁰: 10⁶-facher Konzentrationssprung" : "10⁻⁴ → 10⁻¹⁰：浓度发生百万倍跃迁"}
            </p>
          </div>
        </div>

        {/* 滴定管排液滑杆 */}
        <div className="mt-4 rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-3">
          <div className="flex justify-between text-xs font-mono">
            <span className="font-medium text-[var(--ink)]">{de ? "NaOH Zugabe V" : "滴加 NaOH 体积"}</span>
            <span className="font-bold text-[var(--accent)]">{vol.toFixed(1)} / 30.0 mL</span>
          </div>
          <input
            type="range"
            min={0}
            max={30}
            step={0.1}
            value={vol}
            onChange={(e) => setVol(Number(e.target.value))}
            className="mt-2 h-1 w-full cursor-pointer appearance-none rounded bg-[var(--line)] accent-[var(--ink)]"
          />
          <div className="mt-1.5 flex justify-between text-[10px] font-mono text-[var(--gray)]">
            <span>0 mL (Start)</span>
            <span className="font-semibold text-[var(--ink)]">25.0 mL (ÄP)</span>
            <span>30 mL (Überschuss)</span>
          </div>
        </div>
      </section>

      {/* 右侧 42% 苏格拉底追问 */}
      <section className="flex flex-col justify-between rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:w-[42%]">
        <div>
          <div className="mb-2 text-xs font-mono text-[var(--gray)]">
            {de ? "Sokratische Reflexion" : "微观突跃机理提问"}
          </div>
          <h4 className="text-sm font-medium text-[var(--ink)] leading-snug">
            {de ? curStep.qDE : curStep.qZH}
          </h4>

          <div className="mt-4 space-y-2">
            {curStep.opts.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setPicked(opt.id)}
                className={`w-full rounded border p-2.5 text-left text-xs transition ${
                  picked === opt.id
                    ? opt.id === curStep.correctId
                      ? "border-emerald-600 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-medium"
                      : "border-rose-600 bg-rose-500/10 text-rose-900 dark:text-rose-300"
                    : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                }`}
              >
                <span className="font-mono font-bold">{opt.id.toUpperCase()}. </span>
                <span>{de ? opt.de : opt.zh}</span>
              </button>
            ))}
          </div>

          {correct && (
            <div className="mt-4 rounded border border-emerald-600/30 bg-emerald-500/10 p-3 text-xs text-emerald-950 dark:text-emerald-200">
              <p className="font-semibold">{de ? "Exakt erkannt!" : "切中微观对数本质！"}</p>
              <p className="mt-1 leading-relaxed text-[var(--ink)]">{de ? curStep.explainDE : curStep.explainZH}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
