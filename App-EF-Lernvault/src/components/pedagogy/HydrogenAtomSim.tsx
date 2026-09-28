import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface HydrogenAtomSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type Mode = "emission" | "absorption";

const E0_EV = 13.6;
const HC_EVNM = 1240;
const EV_TO_HZ = 2.417989242e14;

const energy = (n: number): number => -E0_EV / (n * n);
const orbitR = (n: number): number => 34 + 22 * (n - 1);

// Ladder geometry (SVG viewBox 0 0 640 460)
const Y_TOP = 70;
const Y_BOT = 380;
const E_MIN = -E0_EV;
const E_MAX = -E0_EV / 36;

const yFor = (n: number): number =>
  Y_TOP + ((energy(n) - E_MAX) / (E_MIN - E_MAX)) * (Y_BOT - Y_TOP);

const levelFromY = (y: number): number => {
  let best = 1;
  let bestD = Infinity;
  for (let n = 1; n <= 6; n += 1) {
    const d = Math.abs(yFor(n) - y);
    if (d < bestD) {
      bestD = d;
      best = n;
    }
  }
  return best;
};

function spectralColor(lambdaNm: number): string {
  const l = lambdaNm;
  if (l < 380 || l > 780) return "#94a3b8";
  let r = 0;
  let g = 0;
  let b = 0;
  if (l < 440) {
    r = -(l - 440) / 60;
    b = 1;
  } else if (l < 490) {
    g = (l - 440) / 50;
    b = 1;
  } else if (l < 510) {
    g = 1;
    b = -(l - 510) / 20;
  } else if (l < 580) {
    r = (l - 510) / 70;
    g = 1;
  } else if (l < 645) {
    r = 1;
    g = -(l - 645) / 65;
  } else {
    r = 1;
  }
  let f = 1;
  if (l < 420) f = 0.3 + (0.7 * (l - 380)) / 40;
  else if (l > 700) f = 0.3 + (0.7 * (780 - l)) / 80;
  const c = (x: number): number => Math.round(255 * Math.min(1, Math.max(0, x)) * f);
  return `rgb(${c(r)},${c(g)},${c(b)})`;
}

type SeriesKey = "lyman" | "balmer" | "paschen" | "brackett";

function seriesOf(lower: number): SeriesKey {
  if (lower === 1) return "lyman";
  if (lower === 2) return "balmer";
  if (lower === 3) return "paschen";
  return "brackett";
}

const SERIES_LABEL: Record<SeriesKey, { de: string; zh: string }> = {
  lyman: { de: "Lyman-Serie (UV)", zh: "莱曼系（紫外）" },
  balmer: { de: "Balmer-Serie (sichtbar)", zh: "巴尔末系（可见光）" },
  paschen: { de: "Paschen-Serie (IR)", zh: "帕邢系（红外）" },
  brackett: { de: "Brackett-Serie (IR)", zh: "布拉开系（红外）" },
};

interface Star {
  x: number;
  y: number;
  r: number;
  ph: number;
  sp: number;
}

const NUC_X = 170;
const NUC_Y = 250;
const LAD_X0 = 400;
const LAD_X1 = 600;
const ARROW_X = 500;

export function HydrogenAtomSim({ lang, studioMode: _studioMode = true, onExportFinding }: HydrogenAtomSimProps) {
  void _studioMode;
  const [upper, setUpper] = useState(3);
  const [lower, setLower] = useState(2);
  const [mode, setMode] = useState<Mode>("emission");
  const [electronLevel, setElectronLevel] = useState(3);
  const [showPanels, setShowPanels] = useState(true);
  const [showStars, setShowStars] = useState(true);
  const [showLabels, setShowLabels] = useState(true);

  const hi = Math.max(upper, lower);
  const lo = Math.min(upper, lower);
  const valid = upper !== lower;
  const deltaE = valid ? energy(hi) - energy(lo) : 0;
  const lambda = valid && deltaE > 0 ? HC_EVNM / deltaE : 0;
  const freqPHz = valid ? (deltaE * EV_TO_HZ) / 1e15 : 0;
  const visible = valid && lambda >= 380 && lambda <= 780;
  const photonColor = valid ? spectralColor(lambda) : "#94a3b8";
  const series = seriesOf(lo);
  const startLevel = mode === "emission" ? hi : lo;
  const endLevel = mode === "emission" ? lo : hi;

  // ---- Decoupled motion core (SOP: useRef + rAF, kein setState pro Frame) ----
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const orbitElRef = useRef<SVGCircleElement | null>(null);
  const photonElRef = useRef<SVGCircleElement | null>(null);
  const dragRef = useRef({ dragging: false });
  const angleRef = useRef(0.6);
  const lastRef = useRef(0);
  const animRef = useRef({ t: 1, active: false, from: startLevel, to: endLevel });
  const paramsRef = useRef({ showStars, electronLevel, startLevel, endLevel });
  paramsRef.current = { showStars, electronLevel, startLevel, endLevel };

  // Fire photon animation on transition change (quasi-static state trigger)
  useEffect(() => {
    setElectronLevel(startLevel);
    animRef.current = { t: 0, active: valid, from: startLevel, to: endLevel };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [upper, lower, mode]);

  useEffect(() => {
    let raf = 0;
    const stars: Star[] = [];
    for (let i = 0; i < 140; i += 1) {
      stars.push({
        x: Math.random() * 640,
        y: Math.random() * 460,
        r: 0.4 + Math.random() * 1.3,
        ph: Math.random() * Math.PI * 2,
        sp: 0.6 + Math.random() * 2.2,
      });
    }

    const loop = (ts: number) => {
      const dt = Math.min(0.05, lastRef.current === 0 ? 0.016 : (ts - lastRef.current) / 1000);
      lastRef.current = ts;
      const p = paramsRef.current;
      const a = animRef.current;

      // Starfield canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          const rect = canvas.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
              canvas.width = Math.round(rect.width * dpr);
              canvas.height = Math.round(rect.height * dpr);
            }
            ctx.save();
            ctx.scale(dpr, dpr);
            const w = rect.width;
            const hgt = rect.height;
            ctx.fillStyle = "#0b1126";
            ctx.fillRect(0, 0, w, hgt);
            if (p.showStars) {
              const sx = w / 640;
              const sy = hgt / 460;
              for (const s of stars) {
                const tw = 0.35 + 0.65 * Math.abs(Math.sin(ts / 1000 * s.sp + s.ph));
                ctx.globalAlpha = tw;
                ctx.fillStyle = "#e2e8f0";
                ctx.beginPath();
                ctx.arc(s.x * sx, s.y * sy, s.r, 0, Math.PI * 2);
                ctx.fill();
              }
              ctx.globalAlpha = 1;
            }
            ctx.restore();
          }
        }
      }

      // Bohr electron on circular orbit (direct DOM, no setState)
      angleRef.current += dt * (2.4 / Math.max(1, p.electronLevel));
      const orb = orbitElRef.current;
      if (orb) {
        const r = orbitR(p.electronLevel);
        orb.setAttribute("cx", String(NUC_X + r * Math.cos(angleRef.current)));
        orb.setAttribute("cy", String(NUC_Y + r * Math.sin(angleRef.current) * 0.62));
      }

      // Photon packet along transition arrow (direct DOM, single setState at arrival)
      const ph = photonElRef.current;
      if (a.active) {
        a.t += dt / 1.4;
        if (a.t >= 1) {
          a.t = 1;
          a.active = false;
          if (ph) ph.setAttribute("opacity", "0");
          setElectronLevel(a.to);
        } else if (ph) {
          const yA = yFor(a.from);
          const yB = yFor(a.to);
          const y = yA + (yB - yA) * a.t;
          const x = ARROW_X + Math.sin(a.t * Math.PI * 4) * 7;
          ph.setAttribute("cx", String(x));
          ph.setAttribute("cy", String(y));
          ph.setAttribute("opacity", "1");
        }
      } else if (ph && ph.getAttribute("opacity") !== "0") {
        ph.setAttribute("opacity", "0");
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const fireAgain = () => {
    if (!valid) return;
    setElectronLevel(startLevel);
    animRef.current = { t: 0, active: true, from: startLevel, to: endLevel };
  };

  const commitLevel = (n: number) => {
    if (mode === "emission") {
      const loNext = lower === n ? (n > 1 ? n - 1 : n + 1) : lower;
      setUpper(n);
      setLower(loNext);
    } else {
      const hiNext = upper === n ? (n < 6 ? n + 1 : n - 1) : upper;
      setLower(n);
      setUpper(hiNext);
    }
  };

  const yToLevel = (clientY: number): number => {
    const svg = svgRef.current;
    if (!svg) return electronLevel;
    const rect = svg.getBoundingClientRect();
    const ySvg = ((clientY - rect.top) / Math.max(1, rect.height)) * 460;
    return levelFromY(ySvg);
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current.dragging = true;
    const n = yToLevel(e.clientY);
    setElectronLevel(n);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current.dragging) return;
    const n = yToLevel(e.clientY);
    setElectronLevel(n);
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    const n = yToLevel(e.clientY);
    commitLevel(n);
  };

  const handleExport = () => {
    const text =
      lang === "de"
        ? `Wasserstoff-Befund (${mode === "emission" ? "Emission" : "Absorption"}): Uebergang m = ${hi} -> n = ${lo}, E_m = ${energy(hi).toFixed(2)} eV, E_n = ${energy(lo).toFixed(2)} eV, Delta_E = ${deltaE.toFixed(2)} eV, lambda = ${lambda.toFixed(1)} nm (${SERIES_LABEL[series].de}).`
        : `氢原子跃迁结论（${mode === "emission" ? "发射" : "吸收"}）：m = ${hi} -> n = ${lo}，E_m = ${energy(hi).toFixed(2)} eV，E_n = ${energy(lo).toFixed(2)} eV，ΔE = ${deltaE.toFixed(2)} eV，λ = ${lambda.toFixed(1)} nm（${SERIES_LABEL[series].zh}）。`;
    if (onExportFinding) onExportFinding(text);
    else {
      void navigator.clipboard?.writeText(text);
    }
  };

  const levelBtn = (n: number, active: boolean, onClick: () => void, key: string) => (
    <button
      key={key}
      type="button"
      onClick={onClick}
      className={`cursor-pointer rounded px-2 py-1 font-mono text-xs ${
        active
          ? "bg-[var(--ink)] font-bold text-[var(--paper)]"
          : "border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
      }`}
    >
      {`n=${n}`}
    </button>
  );

  const arrowDown = mode === "emission";
  const yHi = yFor(hi);
  const yLo = yFor(lo);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
          {lang === "de" ? "Wasserstoffatom: Bohr-Niveaus & Spektrallinien" : "氢原子：玻尔能级与光谱线系"}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] p-0.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setMode("emission")}
              className={`cursor-pointer rounded px-2 py-0.5 ${
                mode === "emission"
                  ? "bg-[var(--ink)] font-bold text-[var(--paper)]"
                  : "text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
              }`}
            >
              {lang === "de" ? "Emission" : "发射"}
            </button>
            <button
              type="button"
              onClick={() => setMode("absorption")}
              className={`cursor-pointer rounded px-2 py-0.5 ${
                mode === "absorption"
                  ? "bg-[var(--ink)] font-bold text-[var(--paper)]"
                  : "text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
              }`}
            >
              {lang === "de" ? "Absorption" : "吸收"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
          >
            <span>{showPanels ? "[◧]" : "[◩]"}</span>
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : lang === "de" ? "Ausklappen" : "展开面板"}</span>
          </button>
        </div>
      </div>

      {/* Grid 8:4 -> 12 */}
      <div className={`grid gap-5 ${showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        <div className={`flex flex-col space-y-3 ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)]">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
            <svg
              ref={svgRef}
              viewBox="0 0 640 460"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="relative block h-[420px] w-full cursor-grab touch-none select-none active:cursor-grabbing sm:h-[480px]"
            >
              {/* Bohr atom (schematic, nicht massstabsgetreu) */}
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <ellipse
                  key={n}
                  cx={NUC_X}
                  cy={NUC_Y}
                  rx={orbitR(n)}
                  ry={orbitR(n) * 0.62}
                  fill="none"
                  stroke={n === electronLevel ? "#7dd3fc" : "#334155"}
                  strokeWidth={n === electronLevel ? 1.6 : 1}
                />
              ))}
              <circle cx={NUC_X} cy={NUC_Y} r={10} fill="#fbbf24" stroke="#f8fafc" strokeWidth={1.5} />
              <text x={NUC_X} y={NUC_Y + 3.5} textAnchor="middle" fontSize={9} fontFamily="monospace" fill="#0b1126">
                p+
              </text>
              <circle ref={orbitElRef} cx={NUC_X + orbitR(electronLevel)} cy={NUC_Y} r={6} fill="#38bdf8" stroke="#f8fafc" strokeWidth={1.5} />
              {showLabels && (
                <text x={NUC_X} y={418} textAnchor="middle" fontSize={10} fontFamily="monospace" fill="#94a3b8">
                  {lang === "de" ? `Bohr-Bahn n = ${electronLevel} (Schema)` : `玻尔轨道 n = ${electronLevel}（示意）`}
                </text>
              )}

              {/* Energy ladder n = 1..6 */}
              {[6, 5, 4, 3, 2, 1].map((n) => {
                const y = yFor(n);
                const isBalmerLine = n === 2;
                return (
                  <g key={n}>
                    <line
                      x1={LAD_X0}
                      y1={y}
                      x2={LAD_X1}
                      y2={y}
                      stroke={isBalmerLine && series === "balmer" && valid ? "#4ade80" : "#e2e8f0"}
                      strokeWidth={n === electronLevel || (isBalmerLine && valid) ? 3 : 1.6}
                    />
                    {showLabels && (
                      <text x={LAD_X0 - 8} y={y + 3.5} textAnchor="end" fontSize={10} fontFamily="monospace" fill="#cbd5e1">
                        {`n=${n} ${energy(n).toFixed(2)}`}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Electron marker on ladder */}
              <circle cx={ARROW_X} cy={yFor(electronLevel)} r={8} fill="#38bdf8" stroke="#f8fafc" strokeWidth={1.5} />
              <text x={ARROW_X} y={yFor(electronLevel) + 3.5} textAnchor="middle" fontSize={9} fontFamily="monospace" fill="#0b1126">
                e-
              </text>

              {/* Transition arrow + photon trail */}
              {valid && (
                <g>
                  <line
                    x1={ARROW_X}
                    y1={arrowDown ? yHi : yLo}
                    x2={ARROW_X}
                    y2={arrowDown ? yLo : yHi}
                    stroke={photonColor}
                    strokeWidth={3}
                    strokeDasharray={visible ? "none" : "6 4"}
                    opacity={0.9}
                  />
                  <polygon
                    points={
                      arrowDown
                        ? `${ARROW_X - 6},${yLo - 12} ${ARROW_X + 6},${yLo - 12} ${ARROW_X},${yLo}`
                        : `${ARROW_X - 6},${yHi + 12} ${ARROW_X + 6},${yHi + 12} ${ARROW_X},${yHi}`
                    }
                    fill={photonColor}
                  />
                  <circle ref={photonElRef} cx={ARROW_X} cy={yHi} r={7} fill={photonColor} stroke="#f8fafc" strokeWidth={1.5} opacity="0" />
                </g>
              )}

              {/* Series annotations */}
              {showLabels && (
                <g fontFamily="monospace" fontSize={10}>
                  <text x={LAD_X1 + 6} y={yFor(1) + 3.5} fill="#94a3b8">
                    Lyman·UV
                  </text>
                  <text x={LAD_X1 + 6} y={yFor(2) + 3.5} fill="#4ade80">
                    Balmer
                  </text>
                  <text x={LAD_X1 + 6} y={yFor(3) + 3.5} fill="#94a3b8">
                    Paschen·IR
                  </text>
                </g>
              )}
            </svg>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2.5 font-mono text-xs">
            <span className="text-[var(--ink)]">
              {valid
                ? `ΔE = ${deltaE.toFixed(2)} eV · λ = ${lambda.toFixed(1)} nm · ν = ${freqPHz.toFixed(2)}×10¹⁵ Hz`
                : lang === "de"
                  ? "Bitte m ≠ n waehlen."
                  : "请选择 m ≠ n。"}
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="inline-block h-3.5 w-8 rounded-sm border border-[var(--line)]"
                style={{ backgroundColor: valid ? photonColor : "transparent" }}
              />
              <span className="text-[var(--gray)]">
                {valid ? (visible ? (lang === "de" ? "sichtbar" : "可见光") : lang === "de" ? "unsichtbar" : "不可见") : "—"}
              </span>
            </span>
          </div>
        </div>

        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Niveaus waehlen" : "选择能级"}
              </h4>
              <div className="space-y-1.5">
                <div className="font-mono text-xs text-[var(--gray)]">
                  {lang === "de" ? `Oberes Niveau (m = ${hi}):` : `高能级（m = ${hi}）：`}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((n) =>
                    levelBtn(n, hi === n, () => (mode === "emission" ? setUpper(n) : (n === lower ? setLower(Math.max(1, n - 1)) : setUpper(n))), `hi-${n}`)
                  )}
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="font-mono text-xs text-[var(--gray)]">
                  {lang === "de" ? `Unteres Niveau (n = ${lo}):` : `低能级（n = ${lo}）：`}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[1, 2, 3, 4, 5, 6].map((n) =>
                    levelBtn(n, lo === n, () => (mode === "emission" ? (n === upper ? setUpper(Math.min(6, n + 1)) : setLower(n)) : setLower(n)), `lo-${n}`)
                  )}
                </div>
              </div>
              {!valid && (
                <p className="font-mono text-[11px] text-[var(--accent)]">
                  {lang === "de" ? "m = n: kein Photon. Bitte verschiedene Niveaus waehlen." : "m = n：无光子，请选择不同能级。"}
                </p>
              )}
              <button
                type="button"
                onClick={fireAgain}
                disabled={!valid}
                className="w-full cursor-pointer rounded-[var(--radius)] border border-[var(--accent)] py-1.5 font-mono text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {lang === "de"
                  ? mode === "emission"
                    ? "Photon emittieren"
                    : "Photon absorbieren"
                  : mode === "emission"
                    ? "发射光子"
                    : "吸收光子"}
              </button>
            </div>

            <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 font-mono text-xs">
              <div className="font-mono text-[10px] font-semibold uppercase text-[var(--accent)]">
                {lang === "de" ? "Photon & Serie" : "光子与线系"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">ΔE = hν</span>
                <strong className="text-[var(--ink)]">{valid ? `${deltaE.toFixed(2)} eV` : "—"}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">λ = hc/ΔE</span>
                <strong className="text-[var(--ink)]">{valid ? `${lambda.toFixed(1)} nm` : "—"}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">ν</span>
                <strong className="text-[var(--ink)]">{valid ? `${freqPHz.toFixed(2)}×10¹⁵ Hz` : "—"}</strong>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                <span className="text-[var(--gray)]">{lang === "de" ? "Serie" : "线系"}</span>
                <strong className="text-[var(--ink)]">{lang === "de" ? SERIES_LABEL[series].de : SERIES_LABEL[series].zh}</strong>
              </div>
              <div className="flex items-center gap-2 pt-1">
                <label className="flex cursor-pointer items-center gap-1.5 text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={showStars}
                    onChange={(e) => setShowStars(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  <span>{lang === "de" ? "Sternenhimmel" : "星空"}</span>
                </label>
                <label className="flex cursor-pointer items-center gap-1.5 text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={showLabels}
                    onChange={(e) => setShowLabels(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  <span>{lang === "de" ? "Labels" : "标注"}</span>
                </label>
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
          <MathHtml code="E_n = -\dfrac{13{,}6\,\mathrm{eV}}{n^2}" display={true} cacheKey="hatom:en" />
          <MathHtml
            code="\Delta E = 13{,}6\,\mathrm{eV}\,\left(\frac{1}{n^2}-\frac{1}{m^2}\right) = h\nu = \frac{hc}{\lambda}"
            display={true}
            cacheKey="hatom:delta"
          />
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "02 · KLP / Operatoren" : "02 · 考纲 / 算子"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "EF Quantenphysik: Diskrete Bohr-Niveaus erklaeren das Linienspektrum; Uebergaenge nach n = 2 (Balmer) liegen im sichtbaren Bereich, nach n = 1 (Lyman) im UV, nach n = 3 (Paschen) im IR."
              : "EF 量子物理：分立的玻尔能级解释线状光谱；跃迁到 n = 2（巴尔末系）落在可见光区，到 n = 1（莱曼系）为紫外，到 n = 3（帕邢系）为红外。"}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Operatoren: darstellen (Niveauschema skizzieren), berechnen (Delta_E, lambda), erklaeren (Serienzugehoerigkeit)."
              : "算子：darstellen（画能级示意）、berechnen（算 ΔE、λ）、erklaeren（判断所属线系）。"}
          </p>
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "03 · Verstaendnis (CN)" : "03 · 中文要点"}
          </div>
          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Emission: Elektron faellt von hoch nach tief und sendet ein Photon mit Delta_E; Absorption: Photon hebt es nach oben. Nur Balmer (n = 2) sieht man mit blossem Auge."
              : "发射：电子从高能级掉到低能级，放出能量为 ΔE 的光子；吸收反之。只有巴尔末系（回到 n = 2）落在肉眼可见区，其余在紫外或红外。"}
          </p>
        </div>
        <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "04 · Befund sichern" : "04 · 导出结论"}
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {valid
              ? lang === "de"
                ? `m = ${hi} -> n = ${lo}, Delta_E = ${deltaE.toFixed(2)} eV, lambda = ${lambda.toFixed(1)} nm.`
                : `m = ${hi} -> n = ${lo}，ΔE = ${deltaE.toFixed(2)} eV，λ = ${lambda.toFixed(1)} nm。`
              : lang === "de"
                ? "Kein gueltiger Uebergang."
                : "当前不是有效跃迁。"}
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--accent)] py-2 font-mono text-xs font-medium uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "de" ? "Befund uebernehmen" : "导出实验结论"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default HydrogenAtomSim;
