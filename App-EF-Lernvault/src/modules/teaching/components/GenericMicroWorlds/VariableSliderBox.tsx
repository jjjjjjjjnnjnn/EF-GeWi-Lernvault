import React, { useState, useId, useMemo, useEffect } from "react";

export interface VariableSliderBoxProps {
  title?: string;
  xLabel?: string;
  yLabel?: string;
  initialX?: number;
  initialK?: number;
  formulaName?: string;
  lang?: "de" | "zh";
  targetY?: number;
  tolerancePercent?: number; // default 5%
  enableMagneticSnap?: boolean; // default true
  onParameterChange?: (x: number, y: number) => void;
  onTargetReached?: () => void;
}

type CurveModel = "linear" | "quadratic" | "diminishing" | "exponential";

interface ModelDefinition {
  id: CurveModel;
  nameDE: string;
  nameZH: string;
  formulaText: string;
  calculateY: (x: number, k: number) => number;
  derivative: (x: number, k: number) => number;
  explanationDE: string;
  explanationZH: string;
}

const MODELS: Record<CurveModel, ModelDefinition> = {
  linear: {
    id: "linear",
    nameDE: "Linearer Zusammenhang",
    nameZH: "线性传导模型",
    formulaText: "Y = 3.0 · K · X",
    calculateY: (x, k) => Math.min(100, Math.max(0, 3.0 * k * x)),
    derivative: (_x, k) => 3.0 * k,
    explanationDE: "Gleichmäßige proportionale Übersetzung: Jede Einheit ΔX erzeugt eine konstante Reaktion ΔY.",
    explanationZH: "恒定比例传导：输入变量的每一单位增量 ΔX 带来完全恒定的输出响应 ΔY。",
  },
  quadratic: {
    id: "quadratic",
    nameDE: "Quadratisch / Progressiv",
    nameZH: "二次累进响应模型",
    formulaText: "Y = 0.35 · K · X²",
    calculateY: (x, k) => Math.min(100, Math.max(0, 0.35 * k * Math.pow(x, 2))),
    derivative: (x, k) => 0.7 * k * x,
    explanationDE: "Progressive Wirkung: Bei steigendem X wächst der Zuwachs von Y überproportional an (Skaleneffekte).",
    explanationZH: "累进加速效应：随着 X 提高，Y 的响应边际增量呈加速放大趋势（递增规模效应）。",
  },
  diminishing: {
    id: "diminishing",
    nameDE: "Sättigung / Grenznutzen",
    nameZH: "边际递减饱和模型",
    formulaText: "Y = 100 · (1 - e^(-K·X/4))",
    calculateY: (x, k) => Math.min(100, Math.max(0, 100 * (1 - Math.exp((-k * x) / 4)))),
    derivative: (x, k) => 25 * k * Math.exp((-k * x) / 4),
    explanationDE: "Ertragsgesetzlicher Verlauf: Frühe Impulse haben maximale Hebelwirkung, flachen jedoch zur Sättigung ab.",
    explanationZH: "边际效用递减规律：初始阶段扰动的传导杠杆极大，接近上限后逐步进入饱和平台期。",
  },
  exponential: {
    id: "exponential",
    nameDE: "Exponentielles Wachstum",
    nameZH: "指数级连锁爆发模型",
    formulaText: "Y = 4.0 · e^(K·X / 3.6)",
    calculateY: (x, k) => Math.min(100, Math.max(0, 4.0 * Math.exp((k * x) / 3.6))),
    derivative: (x, k) => (4.0 * k / 3.6) * Math.exp((k * x) / 3.6),
    explanationDE: "Selbstverstärkende Rückkopplung: Kleine Eingangsimpulse führen nach Schwellenwerten zu exponentiellem Sprung.",
    explanationZH: "正向自增强回路：输入越过特定阈值后将诱发系统级指数爆发式跳跃。",
  },
};

interface PresetTopic {
  id: string;
  labelDE: string;
  labelZH: string;
  xLabel: string;
  yLabel: string;
  model: CurveModel;
  defaultX: number;
  defaultK: number;
}

const PRESET_TOPICS: PresetTopic[] = [
  {
    id: "sowi_zins",
    labelDE: "SoWi: Leitzins -> Investitionsvolumen",
    labelZH: "社科: 基准利率 -> 企业投资总额",
    xLabel: "Zinsniveau X (%)",
    yLabel: "Investitionsreaktion Y",
    model: "diminishing",
    defaultX: 3.5,
    defaultK: 1.2,
  },
  {
    id: "physik_kraft",
    labelDE: "Physik: Beschleunigung -> Kraft (F = m·a)",
    labelZH: "物理: 加速度 -> 综合作用力 (F = m·a)",
    xLabel: "Beschleunigung a (m/s²)",
    yLabel: "Kraft F (N)",
    model: "linear",
    defaultX: 6.0,
    defaultK: 1.5,
  },
  {
    id: "ethik_nutzen",
    labelDE: "Philosophie: Hedonistischer Gesamtnutzen",
    labelZH: "哲学: 边沁功利效用累积",
    xLabel: "Betroffene Personenanzahl X",
    yLabel: "Nutzenbilanz Y (Utils)",
    model: "quadratic",
    defaultX: 5.0,
    defaultK: 1.8,
  },
  {
    id: "mathe_wachstum",
    labelDE: "Mathe: Zinseszins & Exponentielles Modell",
    labelZH: "数学: 复利与指数倍增模型",
    xLabel: "Laufzeit t (Perioden)",
    yLabel: "Kapitalendwert Y",
    model: "exponential",
    defaultX: 4.5,
    defaultK: 1.0,
  },
];

export const VariableSliderBox: React.FC<VariableSliderBoxProps> = ({
  title,
  xLabel = "Parameter X",
  yLabel = "Systemantwort Y",
  initialX = 5.0,
  initialK = 1.5,
  formulaName,
  lang = "de",
  targetY,
  tolerancePercent = 5,
  enableMagneticSnap = true,
  onParameterChange,
  onTargetReached,
}) => {
  const isZh = lang === "zh";
  const sliderXId = useId();
  const sliderKId = useId();

  const [activeModel, setActiveModel] = useState<CurveModel>("diminishing");
  const [xVal, setXVal] = useState<number>(initialX);
  const [kVal, setKVal] = useState<number>(initialK);
  const [baseX, setBaseX] = useState<number>(initialX);
  const [currentXLabel, setCurrentXLabel] = useState<string>(xLabel);
  const [currentYLabel, setCurrentYLabel] = useState<string>(yLabel);

  const modelDef = MODELS[activeModel];
  const currentY = useMemo(() => modelDef.calculateY(xVal, kVal), [modelDef, xVal, kVal]);
  const baseY = useMemo(() => modelDef.calculateY(baseX, kVal), [modelDef, baseX, kVal]);
  const slope = useMemo(() => modelDef.derivative(xVal, kVal), [modelDef, xVal, kVal]);

  const deltaX = xVal - baseX;
  const deltaY = currentY - baseY;

  const isTargetActive = typeof targetY === "number";
  const toleranceDelta = isTargetActive ? (targetY! * tolerancePercent) / 100 : 0;
  const isWithinTolerance =
    isTargetActive && Math.abs(currentY - targetY!) <= toleranceDelta;

  const [hasSnapped, setHasSnapped] = useState(false);
  const [showSocraticScaffold, setShowSocraticScaffold] = useState(false);
  const [hasReachedTarget, setHasReachedTarget] = useState(false);

  useEffect(() => {
    onParameterChange?.(xVal, currentY);
  }, [xVal, currentY, onParameterChange]);

  useEffect(() => {
    if (isWithinTolerance && !hasReachedTarget) {
      setHasReachedTarget(true);
      onTargetReached?.();
    }
  }, [isWithinTolerance, hasReachedTarget, onTargetReached]);

  useEffect(() => {
    if (isTargetActive && !hasReachedTarget) {
      const timer = setTimeout(() => {
        setShowSocraticScaffold(true);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isTargetActive, hasReachedTarget]);

  // 直接查看推导：自动求解最优 X
  const handleDirectDerivation = () => {
    if (!isTargetActive) return;
    let bestX = xVal;
    let minDiff = Infinity;
    for (let testX = 0; testX <= 10; testX += 0.05) {
      const testY = modelDef.calculateY(testX, kVal);
      const diff = Math.abs(testY - targetY!);
      if (diff < minDiff) {
        minDiff = diff;
        bestX = parseFloat(testX.toFixed(2));
      }
    }
    setXVal(bestX);
    setShowSocraticScaffold(true);
  };

  const handleSliderXChange = (newX: number) => {
    if (enableMagneticSnap && isTargetActive) {
      const candidateY = modelDef.calculateY(newX, kVal);
      if (Math.abs(candidateY - targetY!) <= toleranceDelta * 0.4) {
        setHasSnapped(true);
        setTimeout(() => setHasSnapped(false), 1200);
      }
    }
    setXVal(newX);
  };

  // Coordinate Geometry: 520x280 viewBox
  const viewW = 520;
  const viewH = 260;
  const padLeft = 55;
  const padRight = 30;
  const padTop = 25;
  const padBottom = 40;
  const plotW = viewW - padLeft - padRight;
  const plotH = viewH - padTop - padBottom;

  const mapX = (x: number) => padLeft + (Math.max(0, Math.min(10, x)) / 10) * plotW;
  const mapY = (y: number) => padTop + plotH - (Math.max(0, Math.min(100, y)) / 100) * plotH;

  const currentPxX = mapX(xVal);
  const currentPxY = mapY(currentY);
  const basePxX = mapX(baseX);
  const basePxY = mapY(baseY);

  // Generate smooth SVG curve path
  const curvePoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const sampleX = (i / steps) * 10;
      const sampleY = modelDef.calculateY(sampleX, kVal);
      pts.push({ x: mapX(sampleX), y: mapY(sampleY) });
    }
    return pts;
  }, [modelDef, kVal]);

  const curvePath = useMemo(() => {
    if (curvePoints.length === 0) return "";
    return curvePoints.reduce(
      (acc, pt, idx) => (idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`),
      ""
    );
  }, [curvePoints]);

  const areaUnderCurve = useMemo(() => {
    if (!curvePath) return "";
    const rightX = mapX(10);
    const bottomY = padTop + plotH;
    const leftX = mapX(0);
    return `${curvePath} L ${rightX.toFixed(1)} ${bottomY.toFixed(1)} L ${leftX.toFixed(1)} ${bottomY.toFixed(1)} Z`;
  }, [curvePath]);

  const handleApplyPreset = (p: PresetTopic) => {
    setActiveModel(p.model);
    setXVal(p.defaultX);
    setKVal(p.defaultK);
    setBaseX(p.defaultX);
    setCurrentXLabel(p.xLabel);
    setCurrentYLabel(p.yLabel);
  };

  const handleSetBaseline = () => {
    setBaseX(xVal);
  };

  const handleReset = () => {
    setXVal(initialX);
    setKVal(initialK);
    setBaseX(initialX);
  };

  const deltaXSign = deltaX >= 0 ? `+${deltaX.toFixed(2)}` : deltaX.toFixed(2);
  const deltaYSign = deltaY >= 0 ? `+${deltaY.toFixed(2)}` : deltaY.toFixed(2);

  return (
    <div className="flex flex-col border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] font-mono text-xs">
      {/* 顶部标题与功能栏 */}
      <div className="border-b border-[var(--line)] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 bg-[var(--paper-subtle)]">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2 14h12M4 14V8M8 14V4M12 14v-6" />
          </svg>
          <span className="font-bold tracking-tight text-sm">
            {title || (isZh ? "变量滑块与动态因果链" : "Variable Slider & Kausalketten-Box")}
          </span>
          <span className="px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[10px] text-[var(--ink-muted)]">
            {formulaName || modelDef.formulaText}
          </span>
        </div>

        {/* 预设场景切换 */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-[var(--ink-muted)] mr-1">
            {isZh ? "学科预设:" : "Themen-Presets:"}
          </span>
          <select
            aria-label={isZh ? "选择学科预设" : "Themen-Preset auswählen"}
            onChange={(e) => {
              const found = PRESET_TOPICS.find((p) => p.id === e.target.value);
              if (found) handleApplyPreset(found);
            }}
            className="text-[11px] px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] focus:outline-none cursor-pointer"
          >
            {PRESET_TOPICS.map((p) => (
              <option key={p.id} value={p.id}>
                {isZh ? p.labelZH : p.labelDE}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 主体交互区：左侧 2D 坐标图，右侧动态控制器 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 border-b border-[var(--line)]">
        {/* 左侧：纯 SVG 坐标图 (High Data-Ink) */}
        <div className="lg:col-span-7 p-3 sm:p-4 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-[var(--line)] bg-[var(--paper)]">
          <div className="flex items-center justify-between mb-1 text-[11px] text-[var(--ink-muted)]">
            <span>{currentYLabel} f(X)</span>
            <span>{currentXLabel}</span>
          </div>

          <div className="w-full flex items-center justify-center">
            <svg
              viewBox={`0 0 ${viewW} ${viewH}`}
              className="w-full h-auto select-none"
              role="img"
              aria-label={isZh ? "二维坐标因果动力曲线图" : "2D-Koordinatensystem der Kausalwirkung"}
            >
              {/* 背景微网格线 */}
              {[20, 40, 60, 80].map((tickY) => {
                const py = mapY(tickY);
                return (
                  <g key={`grid-y-${tickY}`}>
                    <line
                      x1={padLeft}
                      y1={py}
                      x2={padLeft + plotW}
                      y2={py}
                      stroke="var(--line)"
                      strokeWidth="1"
                      strokeDasharray="2,3"
                    />
                    <text
                      x={padLeft - 8}
                      y={py + 3}
                      textAnchor="end"
                      fill="var(--ink-muted)"
                      className="font-mono text-[9px]"
                    >
                      {tickY}
                    </text>
                  </g>
                );
              })}

              {[2, 4, 6, 8].map((tickX) => {
                const px = mapX(tickX);
                return (
                  <g key={`grid-x-${tickX}`}>
                    <line
                      x1={px}
                      y1={padTop}
                      x2={px}
                      y2={padTop + plotH}
                      stroke="var(--line)"
                      strokeWidth="1"
                      strokeDasharray="2,3"
                    />
                    <text
                      x={px}
                      y={padTop + plotH + 14}
                      textAnchor="middle"
                      fill="var(--ink-muted)"
                      className="font-mono text-[9px]"
                    >
                      {tickX}
                    </text>
                  </g>
                );
              })}

              {/* 曲线下方纸墨学术阴影区域 */}
              {areaUnderCurve && (
                <path
                  d={areaUnderCurve}
                  fill="var(--paper-subtle)"
                  stroke="none"
                />
              )}

              {/* 动态主函数曲线 */}
              {curvePath && (
                <path
                  d={curvePath}
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}

              {/* 坐标轴线 */}
              <line
                x1={padLeft}
                y1={padTop + plotH}
                x2={padLeft + plotW + 15}
                y2={padTop + plotH}
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              <line
                x1={padLeft}
                y1={padTop + plotH}
                x2={padLeft}
                y2={padTop - 10}
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              {/* 坐标轴端点箭头 (ASCII / Pure SVG) */}
              <polygon
                points={`${padLeft + plotW + 18},${padTop + plotH} ${padLeft + plotW + 12},${padTop + plotH - 3} ${padLeft + plotW + 12},${padTop + plotH + 3}`}
                fill="var(--ink)"
              />
              <polygon
                points={`${padLeft},${padTop - 14} ${padLeft - 3},${padTop - 8} ${padLeft + 3},${padTop - 8}`}
                fill="var(--ink)"
              />

              {/* 基准对照虚点 (Baseline Reference Ghost) */}
              {Math.abs(deltaX) > 0.05 && (
                <g>
                  <line
                    x1={basePxX}
                    y1={padTop + plotH}
                    x2={basePxX}
                    y2={basePxY}
                    stroke="var(--ink-muted)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <line
                    x1={padLeft}
                    y1={basePxY}
                    x2={basePxX}
                    y2={basePxY}
                    stroke="var(--ink-muted)"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <circle
                    cx={basePxX}
                    cy={basePxY}
                    r="4"
                    fill="var(--paper)"
                    stroke="var(--ink-muted)"
                    strokeWidth="1.5"
                    style={{
                      transformOrigin: `${basePxX}px ${basePxY}px`,
                      transformBox: "view-box",
                    }}
                  />
                  <text
                    x={basePxX}
                    y={basePxY - 8}
                    textAnchor="middle"
                    fill="var(--ink-muted)"
                    className="font-mono text-[9px]"
                  >
                    (X0={baseX.toFixed(1)})
                  </text>
                </g>
              )}

              {/* 当前点十字准星 (Coordinate Crosshairs) */}
              <line
                x1={currentPxX}
                y1={padTop + plotH}
                x2={currentPxX}
                y2={currentPxY}
                stroke="var(--ink)"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />
              <line
                x1={padLeft}
                y1={currentPxY}
                x2={currentPxX}
                y2={currentPxY}
                stroke="var(--ink)"
                strokeWidth="1.2"
                strokeDasharray="3,3"
              />

              {/* 当前工作点 (Centric SVG Transformation) */}
              <g
                style={{
                  transformOrigin: `${currentPxX}px ${currentPxY}px`,
                  transformBox: "view-box",
                }}
              >
                <circle
                  cx={currentPxX}
                  cy={currentPxY}
                  r="9"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <circle
                  cx={currentPxX}
                  cy={currentPxY}
                  r="4.5"
                  fill="var(--ink)"
                  stroke="var(--paper)"
                  strokeWidth="1.5"
                />
              </g>

              {/* 坐标轴刻度数值标注 */}
              <g>
                <rect
                  x={currentPxX - 18}
                  y={padTop + plotH + 3}
                  width="36"
                  height="14"
                  fill="var(--paper)"
                  stroke="var(--line)"
                  strokeWidth="1"
                />
                <text
                  x={currentPxX}
                  y={padTop + plotH + 13}
                  textAnchor="middle"
                  fill="var(--ink)"
                  className="font-mono text-[9px] font-bold"
                >
                  {xVal.toFixed(1)}
                </text>

                <rect
                  x={padLeft - 38}
                  y={currentPxY - 7}
                  width="34"
                  height="14"
                  fill="var(--paper)"
                  stroke="var(--line)"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 21}
                  y={currentPxY + 3}
                  textAnchor="middle"
                  fill="var(--ink)"
                  className="font-mono text-[9px] font-bold"
                >
                  {currentY.toFixed(1)}
                </text>
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] text-[var(--ink-muted)] pt-2 border-t border-[var(--line)]">
            <span>
              {isZh ? "当前坐标: " : "Aktueller Punkt: "}
              <strong className="text-[var(--ink)]">
                ({xVal.toFixed(1)}, {currentY.toFixed(1)})
              </strong>
            </span>
            <span>
              {isZh ? "局部切线斜率 (dY/dX): " : "Lokale Grenzreagibilität: "}
              <strong className="text-[var(--ink)]">+{slope.toFixed(2)}</strong>
            </span>
          </div>
        </div>

        {/* 右侧：滑块调节与模型选择台 */}
        <div className="lg:col-span-5 p-4 flex flex-col justify-between space-y-4 bg-[var(--paper-subtle)]">
          <div className="space-y-4">
            {/* 函数形态切换单选钮 */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-bold text-[var(--ink)] block">
                {isZh ? "传导响应函数类型:" : "Mathematische Kausalform:"}
              </span>
              <div className="grid grid-cols-2 gap-1">
                {(Object.keys(MODELS) as CurveModel[]).map((mKey) => {
                  const m = MODELS[mKey];
                  const isActive = activeModel === mKey;
                  return (
                    <button
                      key={mKey}
                      type="button"
                      onClick={() => setActiveModel(mKey)}
                      className={`px-2 py-1.5 text-left border text-[11px] transition-colors cursor-pointer ${
                        isActive
                          ? "border-[var(--ink)] bg-[var(--paper)] text-[var(--ink)] font-bold"
                          : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)] hover:text-[var(--ink)]"
                      }`}
                    >
                      <div className="truncate">{isZh ? m.nameZH : m.nameDE}</div>
                      <div className="text-[9px] text-[var(--ink-muted)] truncate">{m.formulaText}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 输入变量 X 滑块 */}
            <div className="space-y-1 border border-[var(--line)] p-2.5 bg-[var(--paper)]">
              <div className="flex justify-between items-center text-[11px]">
                <label htmlFor={sliderXId} className="font-bold text-[var(--ink)] cursor-pointer">
                  {currentXLabel}:
                </label>
                <div className="flex items-center gap-1">
                  <span className="font-bold px-1.5 py-0.2 bg-[var(--paper-subtle)] border border-[var(--line)]">
                    {xVal.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-[var(--ink-muted)]">/ 10.0</span>
                </div>
              </div>
              <input
                id={sliderXId}
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={xVal}
                onChange={(e) => handleSliderXChange(parseFloat(e.target.value))}
                className="w-full accent-[var(--ink)] cursor-pointer h-1.5 bg-[var(--line)]"
              />
              <div className="flex justify-between text-[9px] text-[var(--ink-muted)]">
                <span>0.0 (Min)</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleSliderXChange(Math.max(0, parseFloat((xVal - 0.5).toFixed(1))))}
                    className="px-1 border border-[var(--line)] hover:bg-[var(--paper-subtle)] cursor-pointer"
                  >
                    -0.5
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSliderXChange(Math.min(10, parseFloat((xVal + 0.5).toFixed(1))))}
                    className="px-1 border border-[var(--line)] hover:bg-[var(--paper-subtle)] cursor-pointer"
                  >
                    +0.5
                  </button>
                </div>
                <span>10.0 (Max)</span>
              </div>
            </div>

            {/* 目标平衡容错带与推导直达控制 (Target Corridor & Snapping) */}
            {isTargetActive && (
              <div className="border border-[var(--line)] p-2 bg-[var(--paper)] space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold">
                    {isZh ? "目标平衡指标:" : "Zielwert:"} Y={targetY!.toFixed(1)} (±{tolerancePercent}%)
                  </span>
                  <span
                    className={`font-mono px-1 border text-[9px] ${
                      isWithinTolerance
                        ? "border-[var(--ink)] bg-[var(--paper-subtle)] font-bold"
                        : "border-[var(--line)] text-[var(--ink-muted)]"
                    }`}
                  >
                    {isWithinTolerance
                      ? isZh ? "[OK] 已达成稳态" : "[OK] Ziel erreicht"
                      : isZh ? "未入稳态带" : "Außerhalb Korridor"}
                  </span>
                </div>
                {hasSnapped && (
                  <div className="text-[9px] font-bold text-[var(--ink)]">
                    {isZh ? "» 磁性吸附已对准目标平衡点" : "» Magnetischer Fang aktiv"}
                  </div>
                )}
                {showSocraticScaffold && (
                  <div className="pt-1 border-t border-[var(--line)] flex items-center justify-between gap-1 text-[9px]">
                    <span className="text-[var(--ink-muted)]">
                      {isZh ? "提示: 调整 X 可直接控制 Y 响应" : "Tipp: Nutze Grenzreagibilität"}
                    </span>
                    <button
                      type="button"
                      onClick={handleDirectDerivation}
                      className="px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--paper-subtle)] hover:bg-[var(--ink)] hover:text-[var(--paper)] text-[9px] font-bold cursor-pointer"
                    >
                      {isZh ? "直接推导" : "Zur Herleitung"}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 传导敏感度 K 滑块 */}
            <div className="space-y-1 border border-[var(--line)] p-2.5 bg-[var(--paper)]">
              <div className="flex justify-between items-center text-[11px]">
                <label htmlFor={sliderKId} className="font-bold text-[var(--ink)] cursor-pointer">
                  {isZh ? "敏感度系数 K (传导弹性):" : "Sensitivität K (Elastizität):"}
                </label>
                <div className="flex items-center gap-1">
                  <span className="font-bold px-1.5 py-0.2 bg-[var(--paper-subtle)] border border-[var(--line)]">
                    {kVal.toFixed(1)}
                  </span>
                  <span className="text-[10px] text-[var(--ink-muted)]">x</span>
                </div>
              </div>
              <input
                id={sliderKId}
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={kVal}
                onChange={(e) => setKVal(parseFloat(e.target.value))}
                className="w-full accent-[var(--ink)] cursor-pointer h-1.5 bg-[var(--line)]"
              />
              <div className="flex justify-between text-[9px] text-[var(--ink-muted)]">
                <span>0.2 (Träge)</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setKVal((v) => Math.max(0.2, parseFloat((v - 0.2).toFixed(1))))}
                    className="px-1 border border-[var(--line)] hover:bg-[var(--paper-subtle)] cursor-pointer"
                  >
                    -0.2
                  </button>
                  <button
                    type="button"
                    onClick={() => setKVal((v) => Math.min(3.0, parseFloat((v + 0.2).toFixed(1))))}
                    className="px-1 border border-[var(--line)] hover:bg-[var(--paper-subtle)] cursor-pointer"
                  >
                    +0.2
                  </button>
                </div>
                <span>3.0 (Elastisch)</span>
              </div>
            </div>
          </div>

          {/* 基准点操作栏 */}
          <div className="pt-2 border-t border-[var(--line)] flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={handleSetBaseline}
              className="flex-1 py-1 px-2 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[10px] font-bold transition-colors cursor-pointer text-center"
            >
              {isZh ? "锁定当前为对比基准 (Δ=0)" : "Als Referenz fixieren (Δ=0)"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-1 px-2 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[10px] text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            >
              {isZh ? "重置" : "Reset"}
            </button>
          </div>
        </div>
      </div>

      {/* 底部因果传导链条 (Interactive Causation Chain Cards) */}
      <div className="p-4 space-y-3 bg-[var(--paper)]">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[11px] tracking-tight uppercase">
            {isZh ? "动态因果链三段论 (Kausalkette)" : "Kausalketten-Analyse (Ursache -> Hebel -> Wirkung)"}
          </span>
          <span className="text-[10px] text-[var(--ink-muted)]">
            {isZh ? "基准对照: X0=" : "Basis: X0="}
            {baseX.toFixed(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Card 1: 扰动输入 */}
          <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)] space-y-1.5">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
              <span className="text-[10px] font-bold text-[var(--ink-muted)]">1. IMPULS (ΔX)</span>
              <span className="font-bold text-[11px] text-[var(--ink)]">{deltaXSign}</span>
            </div>
            <p className="text-[10px] text-[var(--ink)] leading-snug">
              {isZh
                ? `输入量 ${currentXLabel} 从 ${baseX.toFixed(1)} 调整至 ${xVal.toFixed(1)}。`
                : `Verschiebung von ${currentXLabel} von ${baseX.toFixed(1)} auf ${xVal.toFixed(1)}.`}
            </p>
            <div className="h-1 bg-[var(--line)] w-full overflow-hidden">
              <div
                className="h-full bg-[var(--ink)] transition-all"
                style={{ width: `${(xVal / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Card 2: 传导杠杆 */}
          <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)] space-y-1.5">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
              <span className="text-[10px] font-bold text-[var(--ink-muted)]">2. HEBEL (K={kVal.toFixed(1)})</span>
              <span className="font-bold text-[11px] text-[var(--ink)]">
                dY/dX={slope.toFixed(2)}
              </span>
            </div>
            <p className="text-[10px] text-[var(--ink)] leading-snug">
              {isZh ? modelDef.explanationZH : modelDef.explanationDE}
            </p>
            <div className="text-[9px] text-[var(--ink-muted)] border-t border-[var(--line)] pt-0.5">
              {modelDef.formulaText}
            </div>
          </div>

          {/* Card 3: 最终效应 */}
          <div className="border border-[var(--line)] p-3 bg-[var(--paper-subtle)] space-y-1.5">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-1">
              <span className="text-[10px] font-bold text-[var(--ink-muted)]">3. WIRKUNG (ΔY)</span>
              <span className="font-bold text-[11px] text-[var(--ink)]">{deltaYSign}</span>
            </div>
            <p className="text-[10px] text-[var(--ink)] leading-snug">
              {isZh
                ? `终态 ${currentYLabel} 响应至 ${currentY.toFixed(1)} (初始 ${baseY.toFixed(1)})。`
                : `Reaktion von ${currentYLabel} auf ${currentY.toFixed(1)} (Basis ${baseY.toFixed(1)}).`}
            </p>
            <div className="h-1 bg-[var(--line)] w-full overflow-hidden">
              <div
                className="h-full bg-[var(--ink)] transition-all"
                style={{ width: `${Math.min(100, currentY)}%` }}
              />
            </div>
          </div>
        </div>

        {/* 综合学术结论条 */}
        <div className="border border-[var(--line)] p-2.5 bg-[var(--paper)] text-[11px] leading-relaxed flex items-start gap-2">
          <span className="font-bold px-1.5 py-0.5 bg-[var(--paper-subtle)] border border-[var(--line)] text-[10px] shrink-0">
            {isZh ? "因果推论" : "FAZIT"}
          </span>
          <span className="text-[var(--ink)]">
            {isZh
              ? `在【${modelDef.nameZH}】下，输入变量 ${currentXLabel} 变动 ΔX=${deltaXSign}。经敏感系数 K=${kVal.toFixed(1)} 传导后，系统产出 ${currentYLabel} 变动 ΔY=${deltaYSign}，当前局部边际响应率为 ${slope.toFixed(2)}。`
              : `Unter dem Modell »${modelDef.nameDE}« induziert ein Impuls von ΔX=${deltaXSign} über den Hebel K=${kVal.toFixed(1)} eine Verschiebung von ΔY=${deltaYSign}. Die Grenzreagibilität liegt bei ${slope.toFixed(2)}.`}
          </span>
        </div>
      </div>
    </div>
  );
};
