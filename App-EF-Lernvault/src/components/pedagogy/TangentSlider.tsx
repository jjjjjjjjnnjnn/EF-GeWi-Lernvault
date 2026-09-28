import { useEffect, useMemo, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface TangentSliderProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
  /** Legacy hook used by Labor.tsx — kept for compatibility, do not remove. */
  onFormulaGenerated?: (formula: string) => void;
}

type FnId = "square" | "cubic" | "sin";

interface FnCfg {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
  f: (x: number) => number;
  fp: (x: number) => number;
  badge: string;
  short: string;
  katexFn: string;
  dMin: number;
  dMax: number;
}

const FN: Record<FnId, FnCfg> = {
  square: {
    xMin: -0.5, xMax: 3.5, yMin: -0.5, yMax: 9.5,
    f: (x) => x * x,
    fp: (x) => 2 * x,
    badge: "f(x) = x²",
    short: "x²",
    katexFn: "f(x)=x^2,\\ f'(x)=2x",
    dMin: -1.2, dMax: 7.2,
  },
  cubic: {
    xMin: -2.0, xMax: 2.2, yMin: -8, yMax: 10,
    f: (x) => x * x * x,
    fp: (x) => 3 * x * x,
    badge: "f(x) = x³",
    short: "x³",
    katexFn: "f(x)=x^3,\\ f'(x)=3x^2",
    dMin: -0.8, dMax: 13,
  },
  sin: {
    xMin: -1.0, xMax: 6.5, yMin: -2, yMax: 2.5,
    f: (x) => Math.sin(x),
    fp: (x) => Math.cos(x),
    badge: "f(x) = sin x",
    short: "sin x",
    katexFn: "f(x)=\\sin x,\\ f'(x)=\\cos x",
    dMin: -1.3, dMax: 1.3,
  },
};

const X0_RANGE: Record<FnId, { min: number; max: number; step: number }> = {
  square: { min: 0.5, max: 2.0, step: 0.1 },
  cubic: { min: -1.0, max: 2.0, step: 0.1 },
  sin: { min: -1.0, max: 6.0, step: 0.1 },
};

// Main stage viewBox geometry (fixed; data ranges map into it).
const VB_W = 560;
const VB_H = 330;
const ML = 46;
const MR = 16;
const MT = 16;
const MB = 30;

// Derivative strip geometry.
const D_W = 560;
const D_H = 150;
const D_ML = 46;
const D_MR = 16;
const D_MT = 12;
const D_MB = 24;

const H_MIN = 0.02;
const H_MAX = 2.0;
const ACCENT_DEEP = "#1e40af";

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function mapX(x: number, cfg: FnCfg): number {
  return ML + ((x - cfg.xMin) / (cfg.xMax - cfg.xMin)) * (VB_W - ML - MR);
}

function mapY(y: number, cfg: FnCfg): number {
  return VB_H - MB - ((y - cfg.yMin) / (cfg.yMax - cfg.yMin)) * (VB_H - MT - MB);
}

function unmapX(px: number, cfg: FnCfg): number {
  return cfg.xMin + ((px - ML) / (VB_W - ML - MR)) * (cfg.xMax - cfg.xMin);
}

function mapDX(x: number, cfg: FnCfg): number {
  return D_ML + ((x - cfg.xMin) / (cfg.xMax - cfg.xMin)) * (D_W - D_ML - D_MR);
}

function mapDY(v: number, cfg: FnCfg): number {
  return D_H - D_MB - ((v - cfg.dMin) / (cfg.dMax - cfg.dMin)) * (D_H - D_MT - D_MB);
}

function curvePath(cfg: FnCfg): string {
  const parts: string[] = [];
  const steps = 140;
  for (let i = 0; i <= steps; i++) {
    const x = cfg.xMin + (i / steps) * (cfg.xMax - cfg.xMin);
    const y = clamp(cfg.f(x), cfg.yMin - 4, cfg.yMax + 4);
    parts.push(`${i === 0 ? "M" : "L"} ${mapX(x, cfg).toFixed(1)} ${mapY(y, cfg).toFixed(1)}`);
  }
  return parts.join(" ");
}

function derivPath(cfg: FnCfg): string {
  const parts: string[] = [];
  const steps = 140;
  for (let i = 0; i <= steps; i++) {
    const x = cfg.xMin + (i / steps) * (cfg.xMax - cfg.xMin);
    const v = clamp(cfg.fp(x), cfg.dMin - 1, cfg.dMax + 1);
    parts.push(`${i === 0 ? "M" : "L"} ${mapDX(x, cfg).toFixed(1)} ${mapDY(v, cfg).toFixed(1)}`);
  }
  return parts.join(" ");
}

/** Infinite line through (x0,y0) with slope m, clipped to the data range. */
function linePath(cfg: FnCfg, x0: number, y0: number, m: number): string {
  const yA = clamp(y0 + m * (cfg.xMin - x0), cfg.yMin - 4, cfg.yMax + 4);
  const yB = clamp(y0 + m * (cfg.xMax - x0), cfg.yMin - 4, cfg.yMax + 4);
  return `M ${mapX(cfg.xMin, cfg).toFixed(1)} ${mapY(yA, cfg).toFixed(1)} L ${mapX(cfg.xMax, cfg).toFixed(1)} ${mapY(yB, cfg).toFixed(1)}`;
}

function secantSlope(cfg: FnCfg, x0: number, h: number): number {
  if (Math.abs(h) < 1e-6) return cfg.fp(x0);
  return (cfg.f(x0 + h) - cfg.f(x0)) / h;
}

export function TangentSlider({ lang, studioMode = true, onExportFinding, onFormulaGenerated }: TangentSliderProps) {
  const [fn, setFn] = useState<FnId>("square");
  const [x0, setX0] = useState<number>(1.0);
  const [h, setH] = useState<number>(1.5);
  const [showPanels, setShowPanels] = useState(studioMode);
  const [showSecant, setShowSecant] = useState(true);
  const [showTangent, setShowTangent] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  const cfg = FN[fn];
  const y0 = cfg.f(x0);
  const x1 = x0 + h;
  const y1 = cfg.f(x1);
  const mSec = secantSlope(cfg, x0, h);
  const mTan = cfg.fp(x0);
  const err = Math.abs(mSec - mTan);

  const mainCurve = useMemo(() => curvePath(cfg), [cfg]);
  const dCurve = useMemo(() => derivPath(cfg), [cfg]);
  const secantD = useMemo(() => linePath(cfg, x0, y0, mSec), [cfg, x0, y0, mSec]);
  const tangentD = useMemo(() => linePath(cfg, x0, y0, mTan), [cfg, x0, y0, mTan]);

  // ---- Decoupled motion core: refs + rAF, no per-frame setState ----
  // React state carries exact physics; rAF only (a) eases the h→0 secant
  // approach by writing SVG attributes directly, with a throttled state
  // sync every 8th frame, and (b) advances a purely visual tracer dot
  // along the derivative waveform. Readouts render from state.
  const paramsRef = useRef({ fn, x0, h });
  useEffect(() => {
    paramsRef.current = { fn, x0, h };
  });
  const animRef = useRef({ active: false, from: 1.5, t0: 0, frame: 0 });
  const shownHRef = useRef(1.5);

  const secantPathRef = useRef<SVGPathElement | null>(null);
  const qDotRef = useRef<SVGCircleElement | null>(null);
  const qLabelRef = useRef<SVGTextElement | null>(null);
  const dhRef = useRef<SVGLineElement | null>(null);
  const dvRef = useRef<SVGLineElement | null>(null);
  const tracerRef = useRef<SVGCircleElement | null>(null);
  const animHudRef = useRef<HTMLSpanElement | null>(null);

  // h → 0 approach animation (writes DOM directly; throttled state sync).
  const startApproach = () => {
    if (animRef.current.active) return;
    const from = paramsRef.current.h <= H_MIN + 1e-9 ? 1.0 : paramsRef.current.h;
    if (paramsRef.current.h <= H_MIN + 1e-9) setH(1.0);
    shownHRef.current = from;
    animRef.current = { active: true, from, t0: performance.now(), frame: 0 };
    setAnimating(true);
  };

  useEffect(() => {
    let raf = 0;
    const DUR = 2400;
    const frame = (now: number) => {
      const p = paramsRef.current;
      const c = FN[p.fn];
      // Visual tracer along the derivative waveform (time-driven, ref-only).
      const tt = now / 1400;
      const tx = c.xMin + ((tt % 1) * (c.xMax - c.xMin));
      const tv = c.fp(tx);
      tracerRef.current?.setAttribute("cx", mapDX(tx, c).toFixed(1));
      tracerRef.current?.setAttribute("cy", mapDY(clamp(tv, c.dMin - 1, c.dMax + 1), c).toFixed(1));

      // Secant approach animation.
      const a = animRef.current;
      if (a.active) {
        const t = clamp((now - a.t0) / DUR, 0, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        const hc = a.from + (H_MIN - a.from) * eased;
        shownHRef.current = hc;
        const y0c = c.f(p.x0);
        const mc = secantSlope(c, p.x0, hc);
        const x1c = p.x0 + hc;
        const y1c = c.f(x1c);
        secantPathRef.current?.setAttribute("d", linePath(c, p.x0, y0c, mc));
        qDotRef.current?.setAttribute("cx", mapX(x1c, c).toFixed(1));
        qDotRef.current?.setAttribute("cy", mapY(clamp(y1c, c.yMin - 4, c.yMax + 4), c).toFixed(1));
        qLabelRef.current?.setAttribute("x", (mapX(x1c, c) + 7).toFixed(1));
        qLabelRef.current?.setAttribute("y", (mapY(clamp(y1c, c.yMin - 4, c.yMax + 4), c) + 4).toFixed(1));
        dhRef.current?.setAttribute("x2", mapX(x1c, c).toFixed(1));
        dvRef.current?.setAttribute("x1", mapX(x1c, c).toFixed(1));
        dvRef.current?.setAttribute("x2", mapX(x1c, c).toFixed(1));
        dvRef.current?.setAttribute("y2", mapY(clamp(y1c, c.yMin - 4, c.yMax + 4), c).toFixed(1));
        const hud = animHudRef.current;
        if (hud) hud.textContent = `h = ${hc.toFixed(3)} · m = ${mc.toFixed(3)}`;
        a.frame += 1;
        if (a.frame % 8 === 0) setH(Math.max(H_MIN, Math.round(hc * 100) / 100));
        if (t >= 1) {
          a.active = false;
          setH(H_MIN);
          setAnimating(false);
        }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Draggable tangent point P (pointer capture keeps the gesture alive).
  const x0Range = X0_RANGE[fn];
  const handlePDown = (e: React.PointerEvent<SVGGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!e.currentTarget.hasPointerCapture(e.pointerId)) return;
    const svg = e.currentTarget.ownerSVGElement;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width <= 0) return;
    const px = ((e.clientX - rect.left) / rect.width) * VB_W;
    const x = unmapX(px, FN[paramsRef.current.fn]);
    const r = X0_RANGE[paramsRef.current.fn];
    const stepped = Math.round(x / r.step) * r.step;
    setX0(clamp(stepped, r.min, r.max));
  };

  const handleFnChange = (next: FnId) => {
    setFn(next);
    const r = X0_RANGE[next];
    setX0((prev) => clamp(prev, r.min, r.max));
  };

  const handleReset = () => {
    animRef.current.active = false;
    setAnimating(false);
    setFn("square");
    setX0(1.0);
    setH(1.5);
    setShowSecant(true);
    setShowTangent(true);
  };

  const klausursatzDE = `Der Differenzenquotient Δy/Δx = (${y1.toFixed(2)} - ${y0.toFixed(2)}) / ${h.toFixed(2)} = ${mSec.toFixed(2)} beschreibt die mittlere Änderungsrate (Sekante). Im Grenzwert h → 0 konvergiert er gegen den Differentialquotienten f'(${x0.toFixed(1)}) = ${mTan.toFixed(1)} (momentane Änderungsrate der Tangente).`;
  const klausursatzZH = `差商 Δy/Δx = (${y1.toFixed(2)} - ${y0.toFixed(2)}) / ${h.toFixed(2)} = ${mSec.toFixed(2)} 描述割线的平均变化率。当割线步长 h → 0 时，割线逐渐与切线重合，收敛于瞬时变化率（导数）f'(${x0.toFixed(1)}) = ${mTan.toFixed(1)}。`;
  const klausursatz = lang === "de" ? klausursatzDE : klausursatzZH;

  const handleExport = () => {
    if (onExportFinding) {
      onExportFinding(klausursatz);
    } else if (onFormulaGenerated) {
      onFormulaGenerated(klausursatz);
    } else {
      try {
        void navigator.clipboard?.writeText(klausursatz);
      } catch {
        // clipboard unavailable
      }
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  const px0 = mapX(x0, cfg);
  const py0 = mapY(clamp(y0, cfg.yMin - 4, cfg.yMax + 4), cfg);
  const px1 = mapX(x1, cfg);
  const py1 = mapY(clamp(y1, cfg.yMin - 4, cfg.yMax + 4), cfg);
  const showTriangle = h > 0.05;
  const zeroY = clamp(0, cfg.yMin, cfg.yMax);

  return (
    <div data-testid="tangent-slider" className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true" className="text-[var(--accent)]">
            <path d="M2.5 13.5l11-11M2.5 13.5h11M2.5 13.5v-11" />
          </svg>
          <span className="font-serif text-base font-semibold text-[var(--ink)]">
            <span>{lang === "de" ? "Dynamischer Tangenten-Simulator (Δx → 0)" : "割线逼近切线沙盘：直观理解导数 (Δx → 0)"}</span>
          </span>
          <span className="border border-[var(--line)] bg-[var(--paper-subtle)] px-1.5 py-0.5 font-mono text-xs text-[var(--accent)]">
            {cfg.badge}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[var(--gray)]">NRW EF Mathe · Differentialrechnung / 微积分</span>
          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
          >
            <span>{showPanels ? "◧" : "◩"}</span>
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : lang === "de" ? "Ausklappen" : "展开面板"}</span>
          </button>
        </div>
      </div>

      {/* Main grid: stage 8 / controls 4 */}
      <div className={`grid gap-5 ${showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        {/* Stage */}
        <div className={`flex flex-col ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="relative flex h-[420px] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] sm:h-[480px]">
            {/* Main plot */}
            <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="min-h-0 w-full flex-1 font-mono" role="img" aria-label="Sekante-Tangente-Diagramm">
              <line x1={ML} y1={mapY(zeroY, cfg)} x2={VB_W - MR} y2={mapY(zeroY, cfg)} stroke="var(--line)" strokeWidth="1.5" />
              <line x1={mapX(clamp(0, cfg.xMin, cfg.xMax), cfg)} y1={VB_H - MB} x2={mapX(clamp(0, cfg.xMin, cfg.xMax), cfg)} y2={MT} stroke="var(--line)" strokeWidth="1.5" />
              <text x={VB_W - MR + 2} y={mapY(zeroY, cfg) + 4} fontSize="12" fill="var(--gray)">x</text>
              <text x={mapX(clamp(0, cfg.xMin, cfg.xMax), cfg) - 12} y={MT - 4} fontSize="12" fill="var(--gray)">y</text>

              <path d={mainCurve} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" />

              {showTangent && (
                <path d={tangentD} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.8" />
              )}
              {showSecant && (
                <path ref={secantPathRef} d={secantD} fill="none" stroke={ACCENT_DEEP} strokeWidth="2" strokeDasharray="5 3" opacity="0.85" />
              )}

              {showTriangle && (
                <>
                  <line ref={dhRef} x1={px0} y1={py0} x2={px1} y2={py0} stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="2 2" />
                  <line ref={dvRef} x1={px1} y1={py0} x2={px1} y2={py1} stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="2 2" />
                </>
              )}

              {/* Secant point Q */}
              {showSecant && (
                <>
                  <circle ref={qDotRef} cx={px1} cy={py1} r="4.5" fill={ACCENT_DEEP} stroke="var(--surface)" strokeWidth="1.5" />
                  <text ref={qLabelRef} x={px1 + 7} y={py1 + 4} fontSize="12" fontWeight="bold" fill={ACCENT_DEEP}>Q</text>
                </>
              )}

              {/* Draggable tangent point P */}
              <g
                onPointerDown={handlePDown}
                onPointerMove={handlePMove}
                className="cursor-grab touch-none select-none active:cursor-grabbing"
              >
                <circle cx={px0} cy={py0} r="13" fill="transparent" />
                <circle cx={px0} cy={py0} r="5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1.5" />
                <text x={px0 - 20} y={py0 - 10} fontSize="12" fontWeight="bold" fill="var(--accent)">
                  P({x0.toFixed(1)}|{y0.toFixed(1)})
                </text>
              </g>
            </svg>

            {/* Derivative waveform strip */}
            <div className="border-t border-[var(--line)]">
              <svg viewBox={`0 0 ${D_W} ${D_H}`} className="h-[128px] w-full shrink-0 font-mono sm:h-[140px]" role="img" aria-label="Ableitungskurve">
                {[0.25, 0.5, 0.75].map((t) => (
                  <line key={t} x1={D_ML} y1={D_MT + t * (D_H - D_MT - D_MB)} x2={D_W - D_MR} y2={D_MT + t * (D_H - D_MT - D_MB)} stroke="var(--line)" strokeWidth="1" />
                ))}
                {cfg.dMin < 0 && cfg.dMax > 0 && (
                  <line x1={D_ML} y1={mapDY(0, cfg)} x2={D_W - D_MR} y2={mapDY(0, cfg)} stroke="var(--gray)" strokeWidth="1" strokeDasharray="3 3" />
                )}
                <path d={dCurve} fill="none" stroke={ACCENT_DEEP} strokeWidth="2" strokeLinecap="round" />
                <circle ref={tracerRef} cx={mapDX(cfg.xMin, cfg)} cy={mapDY(clamp(cfg.fp(cfg.xMin), cfg.dMin - 1, cfg.dMax + 1), cfg)} r="3" fill="none" stroke="var(--gray)" strokeWidth="1.5" />
                <circle cx={mapDX(x0, cfg)} cy={mapDY(clamp(mTan, cfg.dMin - 1, cfg.dMax + 1), cfg)} r="4.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1.5" />
                <text x={D_ML + 6} y={D_MT + 12} fontSize="10" fill="var(--gray)">
                  {lang === "de" ? "Ableitungskurve f′(x) — Punkt folgt x₀" : "导函数波形 f′(x) —— 圆点跟随 x₀ 描记"}
                </text>
                <text x={D_W - D_MR - 6} y={D_MT + 12} fontSize="10" fontWeight="bold" textAnchor="end" fill="var(--accent)">
                  {`f′(${x0.toFixed(1)}) = ${mTan.toFixed(2)}`}
                </text>
              </svg>
            </div>

            {/* HUD readout */}
            <div className="pointer-events-none absolute right-3 top-3 w-48 space-y-1 rounded border border-[var(--line)] bg-[var(--surface)] p-2 font-mono text-[11px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Messwerte" : "测量读数"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">m_sec</span>
                <strong style={{ color: ACCENT_DEEP }}>m = {mSec.toFixed(3)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">f′(x₀)</span>
                <strong className="text-[var(--accent)]">f′ = {mTan.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">|Δ|</span>
                <strong className="text-[var(--ink)]">{err.toFixed(3)}</strong>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-2 left-3 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
              {lang === "de" ? "Punkt P ziehen: x₀ direkt verschieben" : "拖动 P 点：直接移动切点 x₀"}
            </div>
            <span ref={animHudRef} className="hidden">{`h = ${h.toFixed(3)}`}</span>
          </div>

          {/* Legend */}
          <div className="mt-1 flex flex-wrap items-center gap-3 font-mono text-[11px] text-[var(--gray)]">
            <span className="flex items-center gap-1">
              <span className="h-0.5 w-2.5 bg-[var(--ink)]" /> f(x)
            </span>
            <span className="flex items-center gap-1">
              <span className="h-0.5 w-2.5" style={{ backgroundColor: ACCENT_DEEP }} /> {lang === "de" ? "Sekante" : "割线"} (m={mSec.toFixed(2)})
            </span>
            <span className="flex items-center gap-1 text-[var(--accent)]">
              <span className="h-0.5 w-2.5 bg-[var(--accent)]" /> {lang === "de" ? "Tangente" : "切线"} (f′={mTan.toFixed(1)})
            </span>
          </div>
        </div>

        {/* Control panel */}
        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Parameter" : "参数调节"}
              </h4>
              {/* Function selector */}
              <div className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] p-0.5 font-mono text-xs">
                {(["square", "cubic", "sin"] as FnId[]).map((id) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleFnChange(id)}
                    className={`flex-1 rounded px-2 py-1 transition-colors ${
                      fn === id ? "bg-[var(--ink)] font-medium text-[var(--paper)]" : "text-[var(--gray)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {FN[id].short}
                  </button>
                ))}
              </div>
              {/* x0 slider */}
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Basispunkt x₀:" : "基准点 x₀:"}</span>
                  <span className="font-bold text-[var(--ink)]">{x0.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min={x0Range.min}
                  max={x0Range.max}
                  step={x0Range.step}
                  value={x0}
                  onChange={(e) => setX0(parseFloat(e.target.value))}
                  aria-label={lang === "de" ? "Basispunkt x₀ / 基准点 x₀" : "基准点 x₀ / Basispunkt x₀"}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
              {/* h slider */}
              <div className="space-y-1 border-t border-[var(--line)] pt-3">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--accent)]">{lang === "de" ? "Schrittweite h:" : "步长 h:"}</span>
                  <span className="text-sm font-bold text-[var(--accent)]">{h.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min={H_MIN}
                  max={H_MAX}
                  step="0.02"
                  value={h}
                  onChange={(e) => setH(parseFloat(e.target.value))}
                  aria-label={lang === "de" ? "Intervallbreite Δx / 步长 Δx" : "步长 Δx / Intervallbreite Δx"}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--gray)]">
                  <span>0.02 ({lang === "de" ? "fast Tangente" : "接近切线"})</span>
                  <span>2.00 ({lang === "de" ? "große Sekante" : "大步长割线"})</span>
                </div>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={startApproach}
                    disabled={animating}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--accent)] px-2 py-1.5 font-mono text-xs text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10 disabled:opacity-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M3 8h10M9 3.5L13.5 8 9 12.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {animating
                      ? lang === "de" ? "h → 0 laeuft …" : "h → 0 逼近中…"
                      : lang === "de" ? "h → 0 Animation" : "h → 0 逼近动画"}
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="flex items-center justify-center gap-1 rounded-[var(--radius)] border border-[var(--line)] px-2 py-1.5 font-mono text-xs text-[var(--gray)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                      <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {lang === "de" ? "Reset" : "重置"}
                  </button>
                </div>
              </div>
              {/* Layer toggles */}
              <div className="flex gap-4 border-t border-[var(--line)] pt-3 font-mono text-xs text-[var(--gray)]">
                <label className="flex cursor-pointer items-center gap-1.5">
                  <input type="checkbox" checked={showSecant} onChange={(e) => setShowSecant(e.target.checked)} className="accent-[var(--accent)]" />
                  {lang === "de" ? "Sekante" : "割线"}
                </label>
                <label className="flex cursor-pointer items-center gap-1.5">
                  <input type="checkbox" checked={showTangent} onChange={(e) => setShowTangent(e.target.checked)} className="accent-[var(--accent)]" />
                  {lang === "de" ? "Tangente" : "切线"}
                </label>
              </div>
            </div>

            {/* Numeric comparison: secant vs analytic */}
            <div className="space-y-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Sekante Δy/Δx" : "割线斜率 Δy/Δx"}</span>
                <strong style={{ color: ACCENT_DEEP }}>{mSec.toFixed(3)}</strong>
              </div>
              <div className="text-[11px] text-[var(--gray)]">
                m = ({y1.toFixed(2)} − {y0.toFixed(2)}) / {h.toFixed(2)}
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                <span className="text-[var(--gray)]">{lang === "de" ? "Analytisch f′(x₀)" : "解析导数 f′(x₀)"}</span>
                <strong className="text-[var(--accent)]">{mTan.toFixed(2)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Fehler |m − f′|" : "误差 |m − f′|"}</span>
                <strong className="text-[var(--ink)]">{err.toFixed(3)}</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom four-track: Formel / KLP-Operator / CN / Export */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "01 · Formel" : "01 · 公式"}
          </div>
          <MathHtml code="f'(x_0) = \lim_{h \to 0} \frac{f(x_0+h)-f(x_0)}{h}" display={true} cacheKey="tangent:limit" />
          <MathHtml code={cfg.katexFn} display={true} cacheKey={`tangent:fn:${fn}`} />
          <MathHtml code="t(x) = f(x_0)+f'(x_0)(x-x_0)" display={true} cacheKey="tangent:line" />
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "02 · KLP / Operatoren" : "02 · 考纲 / 算子"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "EF Analysis IF1: lokale Änderungsrate als Grenzwert der Sekantensteigungen. Der Differenzenquotient geht für h → 0 in den Differentialquotienten über."
              : "EF 分析 IF1：局部变化率即割线斜率的极限。h → 0 时差商过渡为微分商。"}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Operatoren: darstellen (Sekante/Tangente skizzieren), berechnen (m, f′(x₀)), begruenden (Grenzuebergang h → 0)."
              : "算子：darstellen（画割线/切线）、berechnen（算 m 与 f′(x₀)）、begruenden（论证 h → 0 的极限过渡）。"}
          </p>
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "03 · Verstaendnis (CN)" : "03 · 中文要点"}
          </div>
          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Sekante misst Durchschnitt (Δy/Δx über Intervall h); Tangente misst Augenblick (f′ an x₀). Verkleinert man h, rückt Q nach P und die Sekantensteigung stabilisiert sich auf f′(x₀). Die Ableitungskurve unten zeichnet f′ als Funktion von x₀ nach."
              : "割线量平均（区间 h 上的 Δy/Δx），切线量瞬间（x₀ 处的 f′）。h 越小，Q 越贴近 P，割线斜率稳定到 f′(x₀)。下方波形把 f′ 随 x₀ 的变化描记成导函数曲线。"}
          </p>
        </div>
        <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "04 · Befund sichern" : "04 · 导出结论"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">{klausursatz}</p>
          <button
            type="button"
            onClick={handleExport}
            className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--accent)] py-2 font-mono text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {copied
              ? lang === "de" ? "Uebernommen & kopiert" : "已导出并复制"
              : lang === "de" ? "Erkenntnis in Klausursatz übernehmen" : "带入此导数分析结论与 Klausursatz"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TangentSlider;
