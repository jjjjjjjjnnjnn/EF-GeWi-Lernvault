import { useState, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface BoxOptimizerSimProps {
  lang: Lang;
}

/**
 * BoxOptimizerSim: Interaktives Mathe-Labor zu Extremwertproblemen (NRW EF/Q1 Analysis).
 *
 * Klassische Abitur-Aufgabe:
 * Aus einem quadratischen Karton (a = 24 cm) werden an den Ecken Quadrate mit Seitenlaenge x
 * ausgeschnitten. Die Seiten werden hochgeklappt, um eine offene Schachtel mit maximalem Volumen zu bilden.
 *
 * V(x) = x * (24 - 2x)^2
 * V'(x) = 12x^2 - 192x + 576 = 12*(x - 4)*(x - 12)
 * Lokales Maximum bei x = 4 cm (V = 1024 cm^3).
 */
export function BoxOptimizerSim({ lang }: BoxOptimizerSimProps) {
  const a = 24; // Feste Kantenlaenge in cm
  const [x, setX] = useState<number>(2.0); // Schnittgroesse x in cm (0 bis 11.9)
  const sliderId = useId();

  // Berechnungen
  const b = Math.max(0, a - 2 * x); // Grundseitenlaenge
  const volumen = Math.max(0, Number((x * b * b).toFixed(2))); // V(x) = x * (a-2x)^2
  const ableitung = Number((12 * x * x - 8 * a * x + a * a).toFixed(2)); // V'(x)

  const isOptimum = Math.abs(x - 4.0) < 0.15;

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
            {lang === "de" ? "Didaktisches Labor: Extremwertaufgabe" : "学科教具：极值应用题与导数优化沙盘"}
          </div>
          <h4 className="font-serif text-base text-[var(--ink)] font-semibold mt-0.5">
            {lang === "de" ? "Das Schachtel-Problem: Maximierung des Volumens" : "折纸盒问题：无盖盒子容积极大化探索"}
          </h4>
        </div>
        <div className="font-mono text-xs text-[var(--gray)]">
          {lang === "de" ? "Ausgangskarton: 24 cm × 24 cm" : "原始纸板：24 cm × 24 cm"}
        </div>
      </div>

      {/* Zielfunktion und Ableitung */}
      <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-center">
        <span className="font-mono text-xs text-[var(--gray)] block mb-1">
          {lang === "de" ? "Zielfunktion & Ableitung:" : "目标函数与导数："}
        </span>
        <MathHtml
          code="V(x) = x \cdot (24 - 2x)^2 = 4x^3 - 96x^2 + 576x \quad \Longrightarrow \quad V'(x) = 12x^2 - 192x + 576"
          display
          cacheKey="box-optimizer-formula"
        />
      </div>

      {/* Interaktive Visualisierung */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* 2D Karton-Skizze mit Eckausschnitt */}
        <div className="flex flex-col items-center justify-center p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)]">
          <div className="font-mono text-xs text-[var(--gray)] mb-3">
            {lang === "de" ? "Karton-Zuschnitt (Ecken der Laenge x entnommen)" : "展开图裁剪（4角剪去边长 x 的正方形）"}
          </div>

          <div className="relative w-48 h-48 border-2 border-[var(--ink)] bg-[var(--paper-subtle)] flex items-center justify-center">
            {/* Eckausschnitte (4 Ecken) */}
            <div
              style={{ width: `${(x / 24) * 100}%`, height: `${(x / 24) * 100}%` }}
              className="absolute top-0 left-0 bg-red-100/80 border-r border-b border-dashed border-red-400 flex items-center justify-center font-mono text-[10px] text-red-700"
            >
              x
            </div>
            <div
              style={{ width: `${(x / 24) * 100}%`, height: `${(x / 24) * 100}%` }}
              className="absolute top-0 right-0 bg-red-100/80 border-l border-b border-dashed border-red-400 flex items-center justify-center font-mono text-[10px] text-red-700"
            >
              x
            </div>
            <div
              style={{ width: `${(x / 24) * 100}%`, height: `${(x / 24) * 100}%` }}
              className="absolute bottom-0 left-0 bg-red-100/80 border-r border-t border-dashed border-red-400 flex items-center justify-center font-mono text-[10px] text-red-700"
            >
              x
            </div>
            <div
              style={{ width: `${(x / 24) * 100}%`, height: `${(x / 24) * 100}%` }}
              className="absolute bottom-0 right-0 bg-red-100/80 border-l border-t border-dashed border-red-400 flex items-center justify-center font-mono text-[10px] text-red-700"
            >
              x
            </div>

            {/* Schachtelboden */}
            <div
              style={{ width: `${(b / 24) * 100}%`, height: `${(b / 24) * 100}%` }}
              className="border border-[var(--accent)] bg-[var(--accent)]/10 flex flex-col items-center justify-center text-center p-1"
            >
              <span className="font-mono text-xs font-semibold text-[var(--ink)]">
                {b.toFixed(1)} cm
              </span>
              <span className="font-mono text-[9px] text-[var(--gray)]">
                {lang === "de" ? "Boden" : "底面"}
              </span>
            </div>
          </div>

          <div className="mt-3 text-center space-y-1">
            <div className="font-mono text-xs text-[var(--ink)]">
              {lang === "de"
                ? `Masse: Hoehe h = ${x.toFixed(1)} cm | Grundseite = ${b.toFixed(1)} cm`
                : `尺寸：高 h = ${x.toFixed(1)} cm | 底边长 = ${b.toFixed(1)} cm`}
            </div>
            <div className="font-mono text-sm font-bold text-[var(--accent)]">
              {lang === "de" ? `Volumen V(x) = ${volumen} cm³` : `盒子容积 V(x) = ${volumen} cm³`}
            </div>
          </div>
        </div>

        {/* Steuerung & Analyse */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <label htmlFor={sliderId} className="text-[var(--ink)] font-medium">
                {lang === "de" ? "Schnittkante x:" : "剪切边长 x："}
              </label>
              <span className="text-[var(--accent)] font-semibold">{x.toFixed(2)} cm / 12.00 cm</span>
            </div>
            <input
              id={sliderId}
              type="range"
              min={0.1}
              max={11.9}
              step={0.1}
              value={x}
              onChange={(e) => setX(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          {/* Momentane Steigung (V') */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-[var(--gray)]">{lang === "de" ? "Momentane Steigung V'(x):" : "导数值（变化率）V'(x)："}</span>
              <span className={`font-bold ${ableitung > 5 ? "text-emerald-700" : ableitung < -5 ? "text-red-700" : "text-amber-700"}`}>
                {ableitung > 0 ? `+${ableitung}` : ableitung} cm²/cm
              </span>
            </div>
            <div className="text-xs font-mono">
              {isOptimum ? (
                <span className="inline-block px-2 py-0.5 rounded font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                  {lang === "de" ? "Notwendige Bedingung erfuellt: V'(x) = 0! (Maximales Volumen)" : "满足必要极值条件：V'(x) = 0！（容积达到极大值）"}
                </span>
              ) : ableitung > 0 ? (
                <span className="text-emerald-700">
                  {lang === "de" ? "V'(x) > 0: Volumen steigt bei groesserem Schnitt noch weiter an." : "V'(x) > 0：随 x 增大，容积仍在持续上升。"}
                </span>
              ) : (
                <span className="text-red-700">
                  {lang === "de" ? "V'(x) < 0: Schnitt ist zu gross, Schachtelboden schrumpft zu stark!" : "V'(x) < 0：切口过大，底面积急剧缩水导致容积下降！"}
                </span>
              )}
            </div>
          </div>

          {/* Schnell-Knopf für Optimum */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setX(4.0)}
              className="px-3 py-1.5 font-mono text-xs rounded border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-semibold hover:bg-[var(--accent)]/20 transition-colors"
            >
              {lang === "de" ? "Exaktes Optimum waehlen (x = 4 cm)" : "直接跳转理论极值点 (x = 4 cm)"}
            </button>
          </div>

          {/* Didaktischer Klausur-Satz */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs leading-relaxed text-[var(--ink)]">
            <div className="font-mono font-semibold text-[var(--accent)] mb-1">
              {lang === "de" ? "NRW Abitur Klausur-Muster:" : "北威州考纲满分答题链："}
            </div>
            <p className="font-serif text-xs">
              {lang === "de"
                ? "„Aus der notwendigen Bedingung V'(x) = 12(x-4)(x-12) = 0 folgt im Definitionsbereich D = ]0; 12[ die einzige Extremstelle x = 4 cm. Wegen V''(4) = -96 < 0 liegt ein relatives und zugleich absolutes Maximum mit V(4) = 1024 cm³ vor.“"
                : "“由极值必要条件 V'(x) = 12(x-4)(x-12) = 0，在定义域 D = ]0; 12[ 内得到唯一驻点 x = 4 cm。结合二阶导判据 V''(4) = -96 < 0，判定此点为全局极大值，此时容积达到最大值 V(4) = 1024 cm³。”"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BoxOptimizerSim;
