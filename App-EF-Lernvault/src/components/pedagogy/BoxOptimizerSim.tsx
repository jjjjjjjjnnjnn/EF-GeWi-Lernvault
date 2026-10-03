import { useState, useMemo, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface BoxOptimizerSimProps {
  lang?: Lang;
  studioMode?: boolean;
}

type ModelType = "box-square" | "box-rect" | "can" | "fence";

interface ModelPreset {
  id: ModelType;
  titleDe: string;
  titleZh: string;
  descDe: string;
  descZh: string;
  targetUnit: string;
}

const MODELS: ModelPreset[] = [
  {
    id: "box-square",
    titleDe: "Quadratische Schachtel (a = 24 cm)",
    titleZh: "正方形纸板折盒 (a = 24 cm)",
    descDe: "V(x) = x · (a - 2x)². Maximierung des Volumens durch optimalen Eckenausschnitt x.",
    descZh: "在 24×24 cm 铁皮四角剪去边长为 x 的正方形，折成无盖长方体盒子，求容积极大值。",
    targetUnit: "cm³",
  },
  {
    id: "box-rect",
    titleDe: "Rechteckiger Karton (30 × 20 cm)",
    titleZh: "长方形纸板折盒 (30 × 20 cm)",
    descDe: "V(x) = x · (a - 2x) · (b - 2x). Unsymmetrischer Zuschnitt mit quadratischer Ableitungsgleichung.",
    descZh: "在 30×20 cm 纸板剪去四角折盒，一阶导数方程需利用求根公式求驻点。",
    targetUnit: "cm³",
  },
  {
    id: "can",
    titleDe: "Getränkedose (Zylinder V = 500 cm³)",
    titleZh: "圆柱形易拉罐材料最小化 (V = 500 cm³)",
    descDe: "O(r) = 2πr² + 2V/r. Minimierung der Blechoberfläche bei festem Füllvolumen.",
    descZh: "容积固定为 500 cm³，通过优化底面半径 r 使得铁皮总表面积 O(r) 达到极小值。",
    targetUnit: "cm²",
  },
  {
    id: "fence",
    titleDe: "Weidezaun am Fluss (Umfang L = 60 m)",
    titleZh: "靠河牧场围栏面积最大化 (L = 60 m)",
    descDe: "A(x) = x · (L - 2x). Einseitig durch Fluss begrenzt; Maximierung der Weidefläche.",
    descZh: "一边靠河不需围栏，现有总长 60 m 围栏三面合围，求所能围成矩形的最大面积。",
    targetUnit: "m²",
  },
];

export function BoxOptimizerSim({ lang = "de" }: BoxOptimizerSimProps) {
  const isDe = lang === "de";
  const sliderId = useId();

  // Active geometry model
  const [model, setModel] = useState<ModelType>("box-square");
  const [activeTab, setActiveTab] = useState<"ableitung" | "operatoren" | "cn" | "ki">("ableitung");
  const [copiedQuery, setCopiedQuery] = useState(false);

  // Model-specific parameter state
  // For box-square: x in [0.2, 11.8]
  const [xSquare, setXSquare] = useState<number>(3.0);
  // For box-rect: x in [0.2, 9.8]
  const [xRect, setXRect] = useState<number>(3.0);
  // For can: radius r in [1.5, 8.0]
  const [rCan, setRCan] = useState<number>(3.5);
  // For fence: width x in [1.0, 29.0]
  const [xFence, setXFence] = useState<number>(10.0);

  // Analytical calculations for active model
  const calc = useMemo(() => {
    if (model === "box-square") {
      const a = 24;
      const x = xSquare;
      const b = Math.max(0, a - 2 * x);
      const val = Math.max(0, x * b * b);
      // V'(x) = 12x^2 - 8ax + a^2 = 12(x - 4)(x - 12)
      const deriv = 12 * x * x - 8 * a * x + a * a;
      // V''(x) = 24x - 8a
      const deriv2 = 24 * x - 8 * a;
      const optX = a / 6; // 4.0 cm
      const maxVal = optX * Math.pow(a - 2 * optX, 2); // 1024 cm³
      const xMin = 0.2;
      const xMax = 11.8;
      const yMaxPlot = 1200;

      // Sample points for curve plotting (50 steps)
      const curvePts: { x: number; y: number }[] = [];
      const derivPts: { x: number; y: number }[] = [];
      for (let s = 0.2; s <= 11.8; s += 0.25) {
        const v = s * Math.pow(a - 2 * s, 2);
        const d = 12 * s * s - 8 * a * s + a * a;
        curvePts.push({ x: s, y: v });
        derivPts.push({ x: s, y: d });
      }

      return {
        paramName: "x",
        paramUnit: "cm",
        valName: "V(x)",
        valUnit: "cm³",
        currentParam: x,
        currentVal: Number(val.toFixed(1)),
        currentDeriv: Number(deriv.toFixed(1)),
        currentDeriv2: Number(deriv2.toFixed(1)),
        optParam: optX,
        optVal: Number(maxVal.toFixed(1)),
        isOptimum: Math.abs(x - optX) < 0.15,
        isMax: true,
        xMin,
        xMax,
        yMaxPlot,
        curvePts,
        derivPts,
        dim1: b,
        dim2: b,
        height: x,
      };
    }

    if (model === "box-rect") {
      const a = 30;
      const b0 = 20;
      const x = xRect;
      const sideA = Math.max(0, a - 2 * x);
      const sideB = Math.max(0, b0 - 2 * x);
      const val = Math.max(0, x * sideA * sideB);
      // V(x) = 4x^3 - 2(a+b)x^2 + ab*x = 4x^3 - 100x^2 + 600x
      // V'(x) = 12x^2 - 200x + 600
      const deriv = 12 * x * x - 200 * x + 600;
      const deriv2 = 24 * x - 200;
      // Optimum via quadratic formula: (200 - sqrt(40000 - 28800)) / 24 = (200 - 105.83) / 24 ≈ 3.924 cm
      const optX = (200 - Math.sqrt(40000 - 28800)) / 24;
      const maxVal = optX * (a - 2 * optX) * (b0 - 2 * optX);
      const xMin = 0.2;
      const xMax = 9.8;
      const yMaxPlot = 1300;

      const curvePts: { x: number; y: number }[] = [];
      const derivPts: { x: number; y: number }[] = [];
      for (let s = 0.2; s <= 9.8; s += 0.2) {
        const v = s * (a - 2 * s) * (b0 - 2 * s);
        const d = 12 * s * s - 200 * s + 600;
        curvePts.push({ x: s, y: v });
        derivPts.push({ x: s, y: d });
      }

      return {
        paramName: "x",
        paramUnit: "cm",
        valName: "V(x)",
        valUnit: "cm³",
        currentParam: x,
        currentVal: Number(val.toFixed(1)),
        currentDeriv: Number(deriv.toFixed(1)),
        currentDeriv2: Number(deriv2.toFixed(1)),
        optParam: Number(optX.toFixed(2)),
        optVal: Number(maxVal.toFixed(1)),
        isOptimum: Math.abs(x - optX) < 0.15,
        isMax: true,
        xMin,
        xMax,
        yMaxPlot,
        curvePts,
        derivPts,
        dim1: sideA,
        dim2: sideB,
        height: x,
      };
    }

    if (model === "can") {
      const V0 = 500; // cm³
      const r = rCan;
      const h = V0 / (Math.PI * r * r);
      // O(r) = 2*pi*r^2 + 2*V0/r
      const val = 2 * Math.PI * r * r + (2 * V0) / r;
      // O'(r) = 4*pi*r - 2*V0 / r^2
      const deriv = 4 * Math.PI * r - (2 * V0) / (r * r);
      // O''(r) = 4*pi + 4*V0 / r^3
      const deriv2 = 4 * Math.PI + (4 * V0) / (r * r * r);
      // Optimum: r = (V0 / (2*pi))^(1/3) ≈ 4.30 cm
      const optR = Math.cbrt(V0 / (2 * Math.PI));
      const minO = 2 * Math.PI * optR * optR + (2 * V0) / optR;
      const xMin = 1.5;
      const xMax = 8.0;
      const yMaxPlot = 800;

      const curvePts: { x: number; y: number }[] = [];
      const derivPts: { x: number; y: number }[] = [];
      for (let s = 1.5; s <= 8.0; s += 0.15) {
        const v = 2 * Math.PI * s * s + (2 * V0) / s;
        const d = 4 * Math.PI * s - (2 * V0) / (s * s);
        curvePts.push({ x: s, y: v });
        derivPts.push({ x: s, y: d });
      }

      return {
        paramName: "r",
        paramUnit: "cm",
        valName: "O(r)",
        valUnit: "cm²",
        currentParam: r,
        currentVal: Number(val.toFixed(1)),
        currentDeriv: Number(deriv.toFixed(1)),
        currentDeriv2: Number(deriv2.toFixed(1)),
        optParam: Number(optR.toFixed(2)),
        optVal: Number(minO.toFixed(1)),
        isOptimum: Math.abs(r - optR) < 0.15,
        isMax: false, // Minimization!
        xMin,
        xMax,
        yMaxPlot,
        curvePts,
        derivPts,
        dim1: Number(h.toFixed(1)),
        dim2: r * 2,
        height: Number(h.toFixed(1)),
      };
    }

    // Model: fence (Weidezaun)
    const L = 60; // m
    const x = xFence;
    const ySide = Math.max(0, L - 2 * x);
    const val = Math.max(0, x * ySide);
    // A(x) = 60x - 2x^2
    // A'(x) = 60 - 4x
    // A''(x) = -4
    const deriv = 60 - 4 * x;
    const deriv2 = -4;
    const optX = 15.0; // m
    const maxVal = 15 * 30; // 450 m²
    const xMin = 1.0;
    const xMax = 29.0;
    const yMaxPlot = 500;

    const curvePts: { x: number; y: number }[] = [];
    const derivPts: { x: number; y: number }[] = [];
    for (let s = 1.0; s <= 29.0; s += 0.5) {
      const v = s * (L - 2 * s);
      const d = 60 - 4 * s;
      curvePts.push({ x: s, y: v });
      derivPts.push({ x: s, y: d });
    }

    return {
      paramName: "x",
      paramUnit: "m",
      valName: "A(x)",
      valUnit: "m²",
      currentParam: x,
      currentVal: Number(val.toFixed(1)),
      currentDeriv: Number(deriv.toFixed(1)),
      currentDeriv2: Number(deriv2.toFixed(1)),
      optParam: optX,
      optVal: maxVal,
      isOptimum: Math.abs(x - optX) < 0.25,
      isMax: true,
      xMin,
      xMax,
      yMaxPlot,
      curvePts,
      derivPts,
      dim1: ySide,
      dim2: x,
      height: 0,
    };
  }, [model, xSquare, xRect, rCan, xFence]);

  // Jump to analytical optimum
  const handleJumpOptimum = () => {
    if (model === "box-square") setXSquare(calc.optParam);
    else if (model === "box-rect") setXRect(calc.optParam);
    else if (model === "can") setRCan(calc.optParam);
    else if (model === "fence") setXFence(calc.optParam);
  };

  // SVG Plotter scaling coordinates
  // Plot Box: 280 x 180 px
  // Padding: left 35, right 15, top 15, bottom 25
  const plotW = 230;
  const plotH = 140;
  const plotOriginX = 35;
  const plotOriginY = 155;

  const mapToPlot = (paramX: number, valY: number) => {
    const normX = (paramX - calc.xMin) / (calc.xMax - calc.xMin);
    const normY = Math.max(0, Math.min(1.0, valY / calc.yMaxPlot));
    return {
      x: plotOriginX + normX * plotW,
      y: plotOriginY - normY * plotH,
    };
  };

  const curvePolylineStr = useMemo(() => {
    return calc.curvePts
      .map((p) => {
        const pt = mapToPlot(p.x, p.y);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(" ");
  }, [calc, mapToPlot]);

  const currentMarker = useMemo(() => {
    return mapToPlot(calc.currentParam, calc.currentVal);
  }, [calc, mapToPlot]);

  const optMarker = useMemo(() => {
    return mapToPlot(calc.optParam, calc.optVal);
  }, [calc, mapToPlot]);

  // Copy prompt for AI tutor
  const handleCopyTutorPrompt = () => {
    const prompt = isDe
      ? `[Mathe Klausur-Training: Extremwertaufgabe mit Nebenbedingung]
Modell: ${MODELS.find((m) => m.id === model)?.titleDe}
Aktueller Zustand:
- Parameter ${calc.paramName} = ${calc.currentParam} ${calc.paramUnit}
- Zielfunktionswert ${calc.valName} = ${calc.currentVal} ${calc.valUnit}
- Erste Ableitung ${calc.valName}'(${calc.paramName}) = ${calc.currentDeriv}
- Zweite Ableitung ${calc.valName}''(${calc.paramName}) = ${calc.currentDeriv2}
- Analytisches Optimum: ${calc.paramName}* = ${calc.optParam} ${calc.paramUnit} mit ${calc.valName}* = ${calc.optVal} ${calc.valUnit}

Aufgabe: Formuliere den mathematischen Beweis für dieses Extremum nach den Operatoren „Bestimmen“ und „Ermitteln“ (AFB I & II). Führe die notwendige Bedingung f'(x)=0 und das hinreichende Kriterium (f''(x) ≠ 0 bzw. VZW) formal sauber durch.`
      : `[数学 德国高中微积分极值训练：带约束条件最优化问题]
模型：${MODELS.find((m) => m.id === model)?.titleZh}
当前状态参数：
- 自变量 ${calc.paramName} = ${calc.currentParam} ${calc.paramUnit}
- 目标函数值 ${calc.valName} = ${calc.currentVal} ${calc.valUnit}
- 一阶导数值 ${calc.valName}'(${calc.paramName}) = ${calc.currentDeriv}
- 二阶导数值 ${calc.valName}''(${calc.paramName}) = ${calc.currentDeriv2}
- 理论解析极值：${calc.paramName}* = ${calc.optParam} ${calc.paramUnit}, ${calc.valName}* = ${calc.optVal} ${calc.valUnit}

答题任务：依据北威州考纲操作符 Bestimmen / Ermitteln，完整规范书写该题解答链：目标函数建立、必要条件求驻点、二阶导符号判定极值性质，以及实际定义域端点对比。`;

    navigator.clipboard.writeText(prompt);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2500);
  };

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 text-[var(--ink)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
            {isDe ? "Analysis MINT-Labor: Extremwertprobleme" : "数理数字工坊：微积分极值应用与几何最优化沙盒"}
          </div>
          <h4 className="font-serif text-lg font-semibold mt-0.5">
            {isDe ? "Extremwert- & Optimierungslabor (Analysis EF/Q1)" : "导数极值与约束条件最优化实验室"}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--line)] bg-[var(--paper)] font-mono text-xs">
            <span className="text-[var(--gray)]">{isDe ? "Status:" : "状态："}</span>
            {calc.isOptimum ? (
              <span className="font-bold text-emerald-700">✓ {isDe ? "Optimum erreicht!" : "达成极值！"}</span>
            ) : calc.currentDeriv > 0 ? (
              <span className="font-bold text-blue-700">↗ {isDe ? "Steigend (f' > 0)" : "持续增长"}</span>
            ) : (
              <span className="font-bold text-rose-700">↘ {isDe ? "Fallend (f' < 0)" : "持续下降"}</span>
            )}
          </div>
        </div>
      </div>

      {/* Model Selection Tabs */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[var(--paper-subtle)] p-2 rounded-[var(--radius)] border border-[var(--line)]">
        <span className="font-mono text-xs text-[var(--gray)] mr-1">
          {isDe ? "Geometrisches Modell:" : "几何模型："}
        </span>
        {MODELS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setModel(m.id)}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              model === m.id
                ? "bg-[var(--accent)] text-white font-semibold shadow-sm"
                : "bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--line)]/30"
            }`}
          >
            {isDe ? m.titleDe.split("(")[0] : m.titleZh.split("(")[0]}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Dynamic Geometry, Right Dual-Plot Function & Levers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (Geometric Visualization Canvas) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 sm:p-4 flex flex-col items-center">
            <div className="w-full flex justify-between items-center text-xs font-mono text-[var(--gray)] mb-2">
              <span>{isDe ? "Geometrische Rekonstruktion & Zuschnitt" : "几何图形裁剪与折叠展开图"}</span>
              <span className="text-[var(--accent)] font-semibold">
                {calc.paramName} = {calc.currentParam.toFixed(2)} {calc.paramUnit}
              </span>
            </div>

            {/* SVG Visualizer Canvas */}
            <div className="w-full max-w-[340px] aspect-square flex items-center justify-center relative">
              <svg viewBox="0 0 240 240" className="w-full h-full select-none overflow-visible">
                {/* Millimeter grid background */}
                <defs>
                  <pattern id="opt-grid" width="12" height="12" patternUnits="userSpaceOnUse">
                    <path d="M 12 0 L 0 0 0 12" fill="none" stroke="currentColor" className="text-stone-200" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="240" height="240" fill="url(#opt-grid)" rx="6" />

                {/* Model 1 & 2: Box Sheet Unfolding */}
                {(model === "box-square" || model === "box-rect") && (
                  <g transform="translate(30, 30)">
                    {/* Full Sheet (180 x 180 or 180 x 120) */}
                    {(() => {
                      const totalW = 180;
                      const totalH = model === "box-square" ? 180 : 120;
                      const maxParam = model === "box-square" ? 12 : 10;
                      const cutPx = (calc.currentParam / maxParam) * (totalH / 2);
                      const baseW = Math.max(0, totalW - 2 * cutPx);
                      const baseH = Math.max(0, totalH - 2 * cutPx);

                      return (
                        <>
                          {/* Base sheet */}
                          <rect
                            x="0"
                            y="0"
                            width={totalW}
                            height={totalH}
                            fill="#f8fafc"
                            stroke="#0f172a"
                            strokeWidth="1.5"
                          />

                          {/* 4 Cutout corners (amber dashed fill) */}
                          <rect x="0" y="0" width={cutPx} height={cutPx} fill="#fef3c7" stroke="#b45309" strokeDasharray="3,2" strokeWidth="1" />
                          <rect x={totalW - cutPx} y="0" width={cutPx} height={cutPx} fill="#fef3c7" stroke="#b45309" strokeDasharray="3,2" strokeWidth="1" />
                          <rect x="0" y={totalH - cutPx} width={cutPx} height={cutPx} fill="#fef3c7" stroke="#b45309" strokeDasharray="3,2" strokeWidth="1" />
                          <rect x={totalW - cutPx} y={totalH - cutPx} width={cutPx} height={cutPx} fill="#fef3c7" stroke="#b45309" strokeDasharray="3,2" strokeWidth="1" />

                          {/* Fold lines (dashed blue) */}
                          <line x1={cutPx} y1="0" x2={cutPx} y2={totalH} stroke="#2563eb" strokeDasharray="3,3" strokeWidth="1" />
                          <line x1={totalW - cutPx} y1="0" x2={totalW - cutPx} y2={totalH} stroke="#2563eb" strokeDasharray="3,3" strokeWidth="1" />
                          <line x1="0" y1={cutPx} x2={totalW} y2={cutPx} stroke="#2563eb" strokeDasharray="3,3" strokeWidth="1" />
                          <line x1="0" y1={totalH - cutPx} x2={totalW} y2={totalH - cutPx} stroke="#2563eb" strokeDasharray="3,3" strokeWidth="1" />

                          {/* Box Bottom area */}
                          <rect
                            x={cutPx}
                            y={cutPx}
                            width={baseW}
                            height={baseH}
                            fill="#3b82f6"
                            fillOpacity="0.15"
                            stroke="#1d4ed8"
                            strokeWidth="1.5"
                          />

                          {/* Dimension labels */}
                          <text x={cutPx / 2} y={cutPx / 2 + 3} textAnchor="middle" className="font-mono text-[9px] fill-[#b45309] font-bold">
                            x
                          </text>
                          <text x={totalW / 2} y={totalH / 2} textAnchor="middle" className="font-mono text-[10px] fill-[#1e40af] font-semibold">
                            {isDe ? "Boden" : "底面"}: {calc.dim1.toFixed(1)} × {calc.dim2.toFixed(1)} cm
                          </text>
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* Model 3: Can (Zylinder) */}
                {model === "can" && (
                  <g transform="translate(120, 120)">
                    {(() => {
                      const rScale = (calc.currentParam / 8.0) * 55;
                      const hScale = Math.min(85, (calc.height / 35) * 85);

                      return (
                        <>
                          {/* Cylinder Body (Side view) */}
                          <rect
                            x={-rScale}
                            y={-hScale / 2}
                            width={rScale * 2}
                            height={hScale}
                            fill="#e0e7ff"
                            stroke="#1e40af"
                            strokeWidth="1.5"
                          />
                          {/* Bottom Ellipse */}
                          <ellipse
                            cx="0"
                            cy={hScale / 2}
                            rx={rScale}
                            ry={rScale * 0.3}
                            fill="#c7d2fe"
                            stroke="#1e40af"
                            strokeWidth="1.5"
                          />
                          {/* Top Ellipse */}
                          <ellipse
                            cx="0"
                            cy={-hScale / 2}
                            rx={rScale}
                            ry={rScale * 0.3}
                            fill="#e0e7ff"
                            stroke="#1e40af"
                            strokeWidth="1.5"
                          />
                          {/* Radius indicator */}
                          <line x1="0" y1={-hScale / 2} x2={rScale} y2={-hScale / 2} stroke="#b45309" strokeWidth="1.5" />
                          <circle cx={rScale} cy={-hScale / 2} r="2.5" fill="#b45309" />
                          <text x={rScale / 2} y={-hScale / 2 - 5} textAnchor="middle" className="font-mono text-[9px] fill-[#b45309] font-bold">
                            r = {calc.currentParam.toFixed(1)} cm
                          </text>

                          {/* Height indicator */}
                          <text x={-rScale - 10} y="3" textAnchor="end" className="font-mono text-[9px] fill-[#1e40af] font-bold">
                            h = {calc.height.toFixed(1)} cm
                          </text>
                        </>
                      );
                    })()}
                  </g>
                )}

                {/* Model 4: Fence (Weidezaun am Fluss) */}
                {model === "fence" && (
                  <g transform="translate(30, 30)">
                    {(() => {
                      // River on top (wavy blue band)
                      const wMax = 180;
                      const hMax = 140;
                      const xNorm = (calc.currentParam / 30.0) * hMax;
                      const yNorm = (calc.dim1 / 60.0) * wMax;

                      return (
                        <>
                          {/* River */}
                          <rect x="0" y="0" width="180" height="25" fill="#bae6fd" stroke="#0284c7" strokeWidth="1" />
                          <text x="90" y="16" textAnchor="middle" className="font-serif italic text-[11px] fill-[#0369a1] font-semibold">
                            Fluss / 河流 (Kein Zaun nötig)
                          </text>

                          {/* Pasture area */}
                          <rect
                            x={(180 - yNorm) / 2}
                            y="25"
                            width={yNorm}
                            height={xNorm}
                            fill="#dcfce7"
                            stroke="#15803d"
                            strokeWidth="2"
                            strokeDasharray="0,0"
                          />
                          {/* River border is open, so clear top border of rectangle */}
                          <line
                            x1={(180 - yNorm) / 2}
                            y1="25"
                            x2={(180 + yNorm) / 2}
                            y2="25"
                            stroke="#dcfce7"
                            strokeWidth="2.5"
                          />

                          {/* Labels */}
                          <text x={90} y={25 + xNorm / 2 + 4} textAnchor="middle" className="font-mono text-[10px] fill-[#15803d] font-bold">
                            A = {calc.currentVal} m²
                          </text>
                          <text x={(180 - yNorm) / 2 - 8} y={25 + xNorm / 2} textAnchor="end" className="font-mono text-[9px] fill-[#b45309] font-bold">
                            x = {calc.currentParam} m
                          </text>
                          <text x={90} y={25 + xNorm + 14} textAnchor="middle" className="font-mono text-[9px] fill-[#1e40af] font-bold">
                            y = {calc.dim1} m
                          </text>
                        </>
                      );
                    })()}
                  </g>
                )}
              </svg>
            </div>

            {/* Geometry info bar */}
            <div className="w-full grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-[var(--line)] text-center font-mono">
              <div className="p-1.5 rounded bg-[var(--paper-subtle)] border border-[var(--line)]">
                <span className="text-[10px] text-[var(--gray)] block">{calc.paramName}</span>
                <span className="text-xs font-bold text-[#b45309]">{calc.currentParam.toFixed(2)} {calc.paramUnit}</span>
              </div>
              <div className="p-1.5 rounded bg-[var(--paper-subtle)] border border-[var(--line)]">
                <span className="text-[10px] text-[var(--gray)] block">{calc.valName}</span>
                <span className="text-xs font-bold text-[var(--accent)]">{calc.currentVal} {calc.valUnit}</span>
              </div>
              <div className="p-1.5 rounded bg-[var(--paper-subtle)] border border-[var(--line)]">
                <span className="text-[10px] text-[var(--gray)] block">{isDe ? "Optimum" : "理论极值"}</span>
                <span className="text-xs font-bold text-emerald-700">{calc.optVal} {calc.valUnit}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Dual-Plot Curve Canvas & Interactive Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Curve Visualization */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 sm:p-4">
            <div className="flex justify-between items-center text-xs font-mono text-[var(--gray)] mb-1">
              <span>{isDe ? "Analysis-Graph & Tangentensteigung" : "目标函数曲线与极值驻点跟踪"}</span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-0.5 bg-[#2563eb]" />
                  {calc.valName}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-0.5 bg-emerald-600 border-t border-dashed" />
                  {isDe ? "Optimum" : "极值点"}
                </span>
              </div>
            </div>

            {/* SVG Function Plotter */}
            <div className="w-full aspect-[16/10] flex items-center justify-center relative select-none">
              <svg viewBox="0 0 280 180" className="w-full h-full overflow-visible">
                {/* Axes */}
                <line x1={plotOriginX} y1={plotOriginY} x2={plotOriginX + plotW} y2={plotOriginY} stroke="#94a3b8" strokeWidth="1.2" />
                <line x1={plotOriginX} y1={plotOriginY} x2={plotOriginX} y2={plotOriginY - plotH} stroke="#94a3b8" strokeWidth="1.2" />

                {/* Axis Labels */}
                <text x={plotOriginX + plotW} y={plotOriginY + 14} textAnchor="end" className="font-mono text-[9px] fill-[#64748b]">
                  {calc.paramName} ({calc.paramUnit})
                </text>
                <text x={plotOriginX - 6} y={plotOriginY - plotH} textAnchor="end" className="font-mono text-[9px] fill-[#64748b]">
                  {calc.valName}
                </text>

                {/* Target Function Curve */}
                <polyline
                  points={curvePolylineStr}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="2.2"
                />

                {/* Optimal Point Marker */}
                <circle cx={optMarker.x} cy={optMarker.y} r="4" fill="#059669" stroke="#ffffff" strokeWidth="1.5" />
                <line
                  x1={optMarker.x}
                  y1={plotOriginY}
                  x2={optMarker.x}
                  y2={optMarker.y}
                  stroke="#059669"
                  strokeDasharray="2,2"
                  strokeWidth="1"
                />

                {/* Current Point Marker & Crosshair */}
                <line
                  x1={currentMarker.x}
                  y1={plotOriginY}
                  x2={currentMarker.x}
                  y2={currentMarker.y}
                  stroke="#b45309"
                  strokeDasharray="2,2"
                  strokeWidth="1"
                />
                <circle cx={currentMarker.x} cy={currentMarker.y} r="5" fill="#b45309" stroke="#ffffff" strokeWidth="1.5" />

                {/* Tangent Line at Current Point */}
                {(() => {
                  const slope = (calc.currentDeriv / calc.yMaxPlot) * (plotH / (plotW / (calc.xMax - calc.xMin)));
                  const tLen = 25;
                  const dx = tLen / Math.sqrt(1 + slope * slope);
                  const dy = slope * dx;
                  return (
                    <line
                      x1={currentMarker.x - dx}
                      y1={currentMarker.y + dy}
                      x2={currentMarker.x + dx}
                      y2={currentMarker.y - dy}
                      stroke="#dc2626"
                      strokeWidth="1.5"
                    />
                  );
                })()}
              </svg>
            </div>
          </div>

          {/* Controls & Calculus Sliders */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-4 space-y-3.5">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1">
                <label htmlFor={sliderId} className="font-semibold text-[var(--ink)]">
                  {isDe ? `Schnittkante / Parameter ${calc.paramName}:` : `自变量参数 ${calc.paramName}：`}
                </label>
                <span className="font-bold text-[#b45309]">
                  {calc.currentParam.toFixed(2)} {calc.paramUnit}
                </span>
              </div>
              <input
                id={sliderId}
                type="range"
                min={calc.xMin}
                max={calc.xMax}
                step={model === "fence" ? 0.5 : 0.05}
                value={calc.currentParam}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  if (model === "box-square") setXSquare(val);
                  else if (model === "box-rect") setXRect(val);
                  else if (model === "can") setRCan(val);
                  else if (model === "fence") setXFence(val);
                }}
                className="w-full accent-[#b45309] cursor-pointer"
              />
            </div>

            {/* Differential Info Pill & Jump Button */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--line)] text-xs font-mono">
              <div className="space-y-0.5">
                <div>
                  <span className="text-[var(--gray)]">f'({calc.paramName}) = </span>
                  <span className={`font-bold ${Math.abs(calc.currentDeriv) < 5 ? "text-emerald-700" : "text-[var(--ink)]"}`}>
                    {calc.currentDeriv > 0 ? `+${calc.currentDeriv}` : calc.currentDeriv}
                  </span>
                </div>
                <div>
                  <span className="text-[var(--gray)]">f''({calc.paramName}) = </span>
                  <span className="font-bold text-[#1e40af]">{calc.currentDeriv2}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleJumpOptimum}
                className="px-3 py-1.5 rounded border border-emerald-600 bg-emerald-50 text-emerald-800 font-semibold hover:bg-emerald-100 transition-colors text-xs font-mono"
              >
                {isDe ? `Exaktes Optimum (${calc.optParam} ${calc.paramUnit})` : `跳转理论极值点 (${calc.optParam} ${calc.paramUnit})`}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scaffolding Tabs */}
      <div className="mt-4 pt-3 border-t border-[var(--line)] space-y-3">
        <div className="flex border-b border-[var(--line)]">
          <button
            type="button"
            onClick={() => setActiveTab("ableitung")}
            className={`px-3 py-1.5 font-mono text-xs border-b-2 transition-colors ${
              activeTab === "ableitung"
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            01 Ableitung & Rechnung
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("operatoren")}
            className={`px-3 py-1.5 font-mono text-xs border-b-2 transition-colors ${
              activeTab === "operatoren"
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            02 KLP NRW Operatoren
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cn")}
            className={`px-3 py-1.5 font-mono text-xs border-b-2 transition-colors ${
              activeTab === "cn"
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            03 🇨🇳 CN-Methode
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ki")}
            className={`px-3 py-1.5 font-mono text-xs border-b-2 transition-colors ${
              activeTab === "ki"
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            04 Diskurs & KI-Tutor
          </button>
        </div>

        {/* Tab 01: Ableitung */}
        {activeTab === "ableitung" && (
          <div className="p-3 bg-[var(--paper-subtle)] rounded-[var(--radius)] text-xs leading-relaxed space-y-2">
            <div className="font-mono font-semibold text-[var(--accent)]">
              {isDe ? "Formale Herleitung des Extremums:" : "微积分极值形式化解析推导过程："}
            </div>
            {model === "box-square" && (
              <MathHtml
                code="V(x) = x(24-2x)^2 = 4x^3 - 96x^2 + 576x \quad \Longrightarrow \quad V'(x) = 12x^2 - 192x + 576 = 12(x-4)(x-12)"
                display
                cacheKey="box-square-deriv"
              />
            )}
            {model === "box-rect" && (
              <MathHtml
                code="V(x) = x(30-2x)(20-2x) = 4x^3 - 100x^2 + 600x \quad \Longrightarrow \quad V'(x) = 12x^2 - 200x + 600 = 0"
                display
                cacheKey="box-rect-deriv"
              />
            )}
            {model === "can" && (
              <MathHtml
                code="O(r) = 2\pi r^2 + \frac{2\cdot 500}{r} \quad \Longrightarrow \quad O'(r) = 4\pi r - \frac{1000}{r^2} = 0 \iff r^* = \sqrt[3]{\frac{500}{2\pi}} \approx 4{,}30\text{ cm}"
                display
                cacheKey="can-deriv"
              />
            )}
            {model === "fence" && (
              <MathHtml
                code="A(x) = x(60-2x) = 60x - 2x^2 \quad \Longrightarrow \quad A'(x) = 60 - 4x = 0 \iff x^* = 15\text{ m}"
                display
                cacheKey="fence-deriv"
              />
            )}
            <p className="font-serif text-[11px] text-[var(--gray)]">
              {isDe
                ? "Notwendige Bedingung: Erste Ableitung nullsetzen f'(x) = 0. Hinreichende Bedingung: Zweite Ableitung f''(x*) ≠ 0 (Vorzeichen entscheidet über Maximum/Minimum)."
                : "必要条件：一阶导数置零 f'(x) = 0 求驻点。充分条件：二阶导数 f''(x*) ≠ 0（负值为极大值，正值为极小值）。"}
            </p>
          </div>
        )}

        {/* Tab 02: Operatoren */}
        {activeTab === "operatoren" && (
          <div className="p-3 bg-[var(--paper-subtle)] rounded-[var(--radius)] text-xs leading-relaxed space-y-2">
            <div className="font-mono font-semibold text-[var(--accent)]">
              {isDe ? "Abitur-Musterstruktur: Operatoren „Bestimmen / Optimieren“ (AFB II)" : "北威州考纲操作符解题三部曲：Bestimmen / Ermitteln (AFB II)"}
            </div>
            <div className="space-y-1.5 font-serif text-[11px]">
              <div>
                <strong>1. Zielfunktion & Definitionsbereich:</strong>{" "}
                {isDe
                  ? "Hauptbedingung formulieren, Nebenbedingung einsetzen und ökonomisch/geometrisch sinnvollen Definitionsbereich D angeben."
                  : "确立主目标函数，代入几何几何约束消除多余变量，并写明实际几何意义定义域 D。"}
              </div>
              <div>
                <strong>2. Notwendige Bedingung (f'(x) = 0):</strong>{" "}
                {isDe
                  ? "Ableitung bilden, gleich null setzen und Kandidatenstellen x_i innerhalb von D bestimmen."
                  : "求一阶导数并置零，解方程求得驻点，剔除定义域外的增根。"}
              </div>
              <div>
                <strong>3. Hinreichende Bedingung & Randvergleich:</strong>{" "}
                {isDe
                  ? "Prüfung über f''(x) oder Vorzeichenwechsel (VZW). Randwerte berechnen zum Nachweis des globalen Maximums."
                  : "代入二阶导或运用一阶导变号法则判定极值，并比对定义域端点值，确认全局最优解。"}
              </div>
            </div>
          </div>
        )}

        {/* Tab 03: CN-Methode */}
        {activeTab === "cn" && (
          <div className="p-3 bg-[var(--paper-subtle)] rounded-[var(--radius)] text-xs leading-relaxed space-y-2">
            <div className="font-mono font-semibold text-[var(--accent)]">
              {isDe ? "🇨🇳 CN-Methode: Das 4-Schritte-Extremwert-Protokoll" : "🇨🇳 CN-Methode：极值最优化“四步定乾坤”解题法"}
            </div>
            <div className="space-y-1 text-[11px]">
              <p><strong>一设立：</strong> 设自变量，确立目标函数（主条件）与几何等式（副条件/Nebenbedingung），写出单变量显函数与定义域。</p>
              <p><strong>二求导：</strong> 稳健求出一阶导数与二阶导数，严防多项式符号展开笔误。</p>
              <p><strong>三求驻：</strong> 解方程 $f'(x) = 0$ 揪出可能候选极值点（Kandidaten）。</p>
              <p><strong>四验真：</strong> 代入二阶导（负大正小）或端点极限，写下标准总结句（Antwortsatz）。</p>
            </div>
          </div>
        )}

        {/* Tab 04: KI-Tutor */}
        {activeTab === "ki" && (
          <div className="p-3 bg-[var(--paper-subtle)] rounded-[var(--radius)] text-xs leading-relaxed space-y-2.5">
            <div className="font-mono font-semibold text-[var(--accent)]">
              {isDe ? "MINT-Kolloquium & KI-Tutor Diskurs:" : "一键回流 AI 助教微积分研讨："}
            </div>
            <p className="font-serif text-[11px] text-[var(--gray)]">
              {isDe
                ? "Kopiere die aktuellen geometrischen Maße und Ableitungswerte als strukturierte Frage für deinen KI-Tutor."
                : "将当前几何参数与导数检验数据一键复制，随时提交给 AI 助教进行深入推导质询或会考压轴题变式训练。"}
            </p>
            <button
              type="button"
              onClick={handleCopyTutorPrompt}
              className="px-3 py-1.5 rounded font-mono text-xs font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              {copiedQuery
                ? isDe ? "✓ In Zwischenablage kopiert!" : "✓ 已复制到剪贴板！"
                : isDe ? "Kolloquiums-Prompt kopieren" : "复制当前极值研讨 Prompt"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BoxOptimizerSim;
