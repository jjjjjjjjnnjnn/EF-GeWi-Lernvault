import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";

interface MarktMechanismusSimProps {
  lang?: Lang;
  onFormulaGenerated?: (sentence: string) => void;
}

export function MarktMechanismusSim({ lang = "zh", onFormulaGenerated }: MarktMechanismusSimProps) {
  // Demand curve intercept (shifts demand curve up/down)
  const [demandShift, setDemandShift] = useState<number>(0); // -20 to +20
  // Supply curve intercept (shifts supply curve left/right)
  const [supplyShift, setSupplyShift] = useState<number>(0); // -20 to +20
  // Price intervention (free market vs floor/ceiling)
  const [priceControlMode, setPriceControlMode] = useState<"free" | "mindestpreis" | "hoechstpreis">("free");
  const [controlPrice, setControlPrice] = useState<number>(50);
  const [copied, setCopied] = useState<boolean>(false);

  // Linear Supply & Demand model:
  // Demand: P = (100 + demandShift) - Q  =>  Q_d = (100 + demandShift) - P
  // Supply: P = (20 + supplyShift) + Q   =>  Q_s = P - (20 + supplyShift)
  const dBase = 100 + demandShift;
  const sBase = 20 + supplyShift;

  // Equilibrium: (100 + dShift) - Q = (20 + sShift) + Q
  // 2Q = (dBase - sBase) => Q* = (dBase - sBase) / 2
  const eqQ = Math.max(5, Math.min(95, (dBase - sBase) / 2));
  const eqP = Math.max(10, Math.min(90, dBase - eqQ));

  // Actual Market Price and Quantities depending on intervention
  const effectivePrice = priceControlMode === "free" ? eqP : controlPrice;
  const qDemanded = Math.max(0, Math.min(100, dBase - effectivePrice));
  const qSupplied = Math.max(0, Math.min(100, effectivePrice - sBase));
  const transactedQ = Math.min(qDemanded, qSupplied);

  // Market condition
  const isEquilibrium = priceControlMode === "free" || Math.abs(qDemanded - qSupplied) < 0.5;
  const isAngebotsueberhang = !isEquilibrium && qSupplied > qDemanded;

  // SVG Chart dimensions
  const svgWidth = 360;
  const svgHeight = 240;
  const margin = { top: 20, right: 25, bottom: 35, left: 35 };

  const toSvgX = (q: number) => {
    return margin.left + (q / 100) * (svgWidth - margin.left - margin.right);
  };

  const toSvgY = (p: number) => {
    return svgHeight - margin.bottom - (p / 100) * (svgHeight - margin.top - margin.bottom);
  };

  // Demand line (Q=-5 to Q=105, un-distorted slope -1, clipped in chart)
  const demandPath = `M ${toSvgX(-5)} ${toSvgY(dBase - (-5))} L ${toSvgX(105)} ${toSvgY(dBase - 105)}`;

  // Supply line (Q=-5 to Q=105, un-distorted slope +1, clipped in chart)
  const supplyPath = `M ${toSvgX(-5)} ${toSvgY(sBase + (-5))} L ${toSvgX(105)} ${toSvgY(sBase + 105)}`;

  // Klausur summary sentence
  const klausursatz = useMemo(() => {
    if (priceControlMode === "free") {
      return lang === "de"
        ? `Im freien Markt bildet sich das Marktgleichgewicht bei p* = ${eqP.toFixed(1)} GE und q* = ${eqQ.toFixed(1)} ME. Hier decken sich Angebot und Nachfrage (Markträumung).`
        : `在自由市场机制下，供求自发在均衡价格 p* = ${eqP.toFixed(1)} 与均衡量 q* = ${eqQ.toFixed(1)} 处达成出清（Markträumung）。`;
    }
    if (priceControlMode === "mindestpreis") {
      return lang === "de"
        ? `Ein Mindestpreis über dem Gleichgewichtspreis (p = ${controlPrice} > ${eqP.toFixed(1)}) schützt Anbieter, führt jedoch zu einem Angebotsüberhang von ${(qSupplied - qDemanded).toFixed(1)} ME.`
        : `高于均衡价的法定最低限价（Mindestpreis = ${controlPrice} > ${eqP.toFixed(1)}）保护生产者，但导致供给过剩（Angebotsüberhang: ${(qSupplied - qDemanded).toFixed(1)}）。`;
    }
    return lang === "de"
      ? `Ein Höchstpreis unter dem Gleichgewichtspreis (p = ${controlPrice} < ${eqP.toFixed(1)}) schützt Verbraucher, verursacht jedoch einen Nachfrageüberhang von ${(qDemanded - qSupplied).toFixed(1)} ME.`
      : `低于均衡价的法定最高限价（Höchstpreis = ${controlPrice} < ${eqP.toFixed(1)}）保护消费者，但造成供不应求的供求短缺（Nachfrageüberhang: ${(qDemanded - qSupplied).toFixed(1)}）。`;
  }, [priceControlMode, eqP, eqQ, controlPrice, qSupplied, qDemanded, lang]);

  const handleCopyOrInsert = () => {
    onFormulaGenerated?.(klausursatz);
    navigator.clipboard?.writeText(klausursatz);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="markt-mechanismus-sim"
      className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--ink)] font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
            className="text-[var(--accent)]"
          >
            <path d="M2 14h12M4 11l4-4 2 2 4-5" />
          </svg>
          <span className="font-serif text-xs font-semibold text-[var(--ink)]">
            {lang === "de" ? "Marktmechanismus & Preisbildung" : "市场价格机制与供求均衡沙盘"}
          </span>
          <span className="font-mono text-xs px-1.5 py-0.5 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--accent)] border border-[var(--line)]">
            SoWi EF · Inhaltsfeld 1
          </span>
        </div>
        <span className="font-mono text-xs text-[var(--gray)]">
          Labor-style Sim
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Diagram */}
        <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] p-2 flex flex-col items-center justify-center relative overflow-hidden">
          <svg width={svgWidth} height={svgHeight} className="overflow-visible select-none">
            <defs>
              <clipPath id="markt-chart-clip">
                <rect
                  x={margin.left}
                  y={margin.top}
                  width={svgWidth - margin.left - margin.right}
                  height={svgHeight - margin.top - margin.bottom}
                />
              </clipPath>
            </defs>

            {/* Coordinate axes */}
            <line
              x1={margin.left}
              y1={toSvgY(0)}
              x2={svgWidth - margin.right}
              y2={toSvgY(0)}
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(0)}
              y1={svgHeight - margin.bottom}
              x2={toSvgX(0)}
              y2={margin.top}
              stroke="var(--line)"
              strokeWidth="1.5"
            />

            {/* Labels */}
            <text x={svgWidth - margin.right + 2} y={toSvgY(0) + 4} fontSize="11" fill="var(--gray)" fontFamily="monospace">
              Menge (Q)
            </text>
            <text x={toSvgX(0) - 16} y={margin.top - 4} fontSize="11" fill="var(--gray)" fontFamily="monospace">
              Preis (P)
            </text>

            {/* Clipped Demand and Supply Curves */}
            <g clipPath="url(#markt-chart-clip)">
              {/* Demand curve (Nachfrage) */}
              <path d={demandPath} fill="none" stroke="var(--ink)" strokeWidth="2" />
              {/* Supply curve (Angebot) */}
              <path d={supplyPath} fill="none" stroke="var(--accent)" strokeWidth="2" />
            </g>

            {/* Curve labels */}
            <text x={toSvgX(Math.min(88, Math.max(10, dBase - 15)))} y={toSvgY(15)} fontSize="11" fill="var(--ink)" fontWeight="bold" fontFamily="monospace">
              N (Demand)
            </text>
            <text x={toSvgX(Math.min(88, Math.max(10, 85 - sBase)))} y={toSvgY(85)} fontSize="11" fill="var(--accent)" fontWeight="bold" fontFamily="monospace">
              A (Supply)
            </text>

            {/* Orthogonal drop lines to axes from equilibrium point */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(eqP)}
              x2={toSvgX(eqQ)}
              y2={toSvgY(eqP)}
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.6"
            />
            <line
              x1={toSvgX(eqQ)}
              y1={toSvgY(0)}
              x2={toSvgX(eqQ)}
              y2={toSvgY(eqP)}
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              strokeOpacity="0.6"
            />

            {/* Effective Price horizontal line if in price control mode */}
            {priceControlMode !== "free" && (
              <line
                x1={toSvgX(0)}
                y1={toSvgY(effectivePrice)}
                x2={toSvgX(100)}
                y2={toSvgY(effectivePrice)}
                stroke="#dc2626"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                strokeOpacity="0.9"
              />
            )}

            {/* Equilibrium Point */}
            <circle cx={toSvgX(eqQ)} cy={toSvgY(eqP)} r="4.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1.5" />
            <text x={toSvgX(eqQ) + 8} y={toSvgY(eqP) - 6} fontSize="11" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
              G* ({eqQ.toFixed(0)}|{eqP.toFixed(0)})
            </text>

            {/* Surplus indicator if not in equilibrium */}
            {!isEquilibrium && (
              <>
                <line
                  x1={toSvgX(transactedQ)}
                  y1={toSvgY(effectivePrice)}
                  x2={toSvgX(Math.max(qDemanded, qSupplied))}
                  y2={toSvgY(effectivePrice)}
                  stroke="var(--ink)"
                  strokeWidth="3"
                />
                <circle cx={toSvgX(qDemanded)} cy={toSvgY(effectivePrice)} r="3.5" fill="var(--ink)" />
                <circle cx={toSvgX(qSupplied)} cy={toSvgY(effectivePrice)} r="3.5" fill="var(--accent)" />
              </>
            )}
          </svg>

          {/* Status badge below SVG */}
          <div className="mt-2 flex items-center justify-between w-full px-2 text-xs font-mono">
            <span className="text-[var(--gray)]">
              {lang === "de" ? "Marktzustand:" : "市场状态："}
            </span>
            <span
              className={`px-1.5 py-0.5 rounded-[var(--radius)] border ${
                isEquilibrium
                  ? "bg-[var(--paper-subtle)] text-[var(--accent)] border-[var(--accent)]/30"
                  : isAngebotsueberhang
                  ? "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"
                  : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"
              }`}
            >
              {isEquilibrium
                ? lang === "de"
                  ? "Gleichgewicht (Markträumung)"
                  : "供求均衡（出清）"
                : isAngebotsueberhang
                ? lang === "de"
                  ? `Angebotsüberhang (+${(qSupplied - qDemanded).toFixed(0)} ME)`
                  : `供给过剩 (+${(qSupplied - qDemanded).toFixed(0)})`
                : lang === "de"
                ? `Nachfrageüberhang (+${(qDemanded - qSupplied).toFixed(0)} ME)`
                : `需求过剩 / 短缺 (+${(qDemanded - qSupplied).toFixed(0)})`}
            </span>
          </div>
        </div>

        {/* Controls Panel */}
        <div className="space-y-3">
          {/* Slider 1: Demand Shift */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span>{lang === "de" ? "Nachfrageverschiebung (Präferenzen/Einkommen)" : "需求曲线平移（偏好/收入变动）"}</span>
              <span className="text-[var(--ink)] font-bold">{demandShift > 0 ? `+${demandShift}` : demandShift}</span>
            </div>
            <input
              type="range"
              min="-25"
              max="25"
              step="1"
              value={demandShift}
              onChange={(e) => setDemandShift(Number(e.target.value))}
              className="w-full accent-[var(--ink)] cursor-pointer"
            />
          </div>

          {/* Slider 2: Supply Shift */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span>{lang === "de" ? "Angebotsverschiebung (Kosten/Technologie)" : "供给曲线平移（生产成本/技术革新）"}</span>
              <span className="text-[var(--accent)] font-bold">{supplyShift > 0 ? `+${supplyShift}` : supplyShift}</span>
            </div>
            <input
              type="range"
              min="-25"
              max="25"
              step="1"
              value={supplyShift}
              onChange={(e) => setSupplyShift(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          {/* State Intervention Toggles */}
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--gray)] mb-1">
              {lang === "de" ? "Staatlicher Eingriff (Ordnungspolitik):" : "政府宏观干预（秩序政策）："}
            </label>
            <div className="grid grid-cols-3 gap-1 text-xs">
              <button
                type="button"
                onClick={() => setPriceControlMode("free")}
                className={`py-1 px-1.5 rounded-[var(--radius)] border text-center transition-colors ${
                  priceControlMode === "free"
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--paper)] font-medium"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {lang === "de" ? "Freier Markt" : "自由市场"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPriceControlMode("mindestpreis");
                  setControlPrice(Math.round(eqP + 15));
                }}
                className={`py-1 px-1.5 rounded-[var(--radius)] border text-center transition-colors ${
                  priceControlMode === "mindestpreis"
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--paper)] font-medium"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {lang === "de" ? "Mindestpreis" : "最低限价"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPriceControlMode("hoechstpreis");
                  setControlPrice(Math.round(eqP - 15));
                }}
                className={`py-1 px-1.5 rounded-[var(--radius)] border text-center transition-colors ${
                  priceControlMode === "hoechstpreis"
                    ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--paper)] font-medium"
                    : "border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {lang === "de" ? "Höchstpreis" : "最高限价"}
              </button>
            </div>
          </div>

          {/* Price intervention slider if active */}
          {priceControlMode !== "free" && (
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[var(--ink)]">
                  {priceControlMode === "mindestpreis"
                    ? lang === "de" ? "Gesetzlicher Mindestpreis (P_min)" : "法定最低售价 (P_min)"
                    : lang === "de" ? "Gesetzlicher Höchstpreis (P_max)" : "法定最高售价 (P_max)"}
                </span>
                <span className="font-bold">{controlPrice} GE</span>
              </div>
              <input
                type="range"
                min="15"
                max="85"
                step="1"
                value={controlPrice}
                onChange={(e) => setControlPrice(Number(e.target.value))}
                className="w-full accent-[var(--ink)] cursor-pointer"
              />
            </div>
          )}
        </div>
      </div>

      {/* Klausur Sentence Export */}
      <div className="mt-3 pt-3 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="font-serif text-xs text-[var(--ink)] leading-relaxed">
          {klausursatz}
        </p>
        <button
          type="button"
          onClick={handleCopyOrInsert}
          className="shrink-0 px-2.5 py-1 text-xs font-mono rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--ink)] transition-colors cursor-pointer"
        >
          {copied
            ? lang === "de" ? "Kopiert!" : "已复制!"
            : lang === "de" ? "Als Klausursatz übernehmen" : "引用至考场论述"}
        </button>
      </div>
    </div>
  );
}

export default MarktMechanismusSim;
