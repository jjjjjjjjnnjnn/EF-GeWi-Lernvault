import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface HookeLawSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type Coupling = "series" | "parallel";

// Display-only scale: pixel per metre of extension (visual travel is clamped).
const PX_PER_M = 460;
const MAX_TRAVEL_PX = 150;
const WALL_X = 56;
const REST_X = 276; // block left edge at F = 0
const L0_SER = 110; // natural pixel length of each spring in series mode
const Y_SER = 130;
const Y_PAR_A = 104;
const Y_PAR_B = 158;
const F_MAX = 40;
const K_MIN = 20;
const K_MAX = 200;

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function eqStiffness(k1: number, k2: number, mode: Coupling): number {
  return mode === "series" ? (k1 * k2) / (k1 + k2) : k1 + k2;
}

// Zigzag coil between two x positions at height y (pure schematic, Tufte-flat).
function coilPath(x1: number, y: number, x2: number, coils: number, amp: number): string {
  const span = Math.max(24, x2 - x1);
  const lead = Math.min(10, span * 0.15);
  const seg = (span - 2 * lead) / coils;
  let d = `M ${x1.toFixed(1)} ${y} L ${(x1 + lead).toFixed(1)} ${y}`;
  for (let i = 0; i < coils; i++) {
    const xm = x1 + lead + seg * (i + 0.5);
    const xe = x1 + lead + seg * (i + 1);
    const ym = y + (i % 2 === 0 ? -amp : amp);
    d += ` L ${xm.toFixed(1)} ${ym.toFixed(1)} L ${xe.toFixed(1)} ${y}`;
  }
  d += ` L ${x2.toFixed(1)} ${y}`;
  return d;
}

export function HookeLawSim({ lang, studioMode = true, onExportFinding }: HookeLawSimProps) {
  const [k1, setK1] = useState(80); // N/m
  const [k2, setK2] = useState(120); // N/m
  const [fExt, setFExt] = useState(16); // N, externally applied force
  const [mode, setMode] = useState<Coupling>("series");
  const [showPanels, setShowPanels] = useState(studioMode);

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  // Quasi-static equilibrium: F_ext = k_eq * dx  (Hooke, F_R = -k * dx)
  const kEq = eqStiffness(k1, k2, mode);
  const dx = fExt / kEq; // m
  const ePot = 0.5 * kEq * dx * dx; // J

  // ---- Decoupled motion core (SOP: useRef + rAF, no per-frame setState) ----
  // React state carries the exact physics; rAF only eases a display value and
  // writes SVG attributes directly through refs. Readouts render from state.
  const paramsRef = useRef({ k1, k2, fExt, mode });
  useEffect(() => {
    paramsRef.current = { k1, k2, fExt, mode };
  });
  const shownRef = useRef(0); // eased display extension in metres
  const dragRef = useRef({ active: false, startX: 0, startF: 0 });

  const dSerARef = useRef<SVGPathElement | null>(null);
  const dSerBRef = useRef<SVGPathElement | null>(null);
  const nodeRef = useRef<SVGCircleElement | null>(null);
  const dParARef = useRef<SVGPathElement | null>(null);
  const dParBRef = useRef<SVGPathElement | null>(null);
  const blockRef = useRef<SVGGElement | null>(null);
  const bracketRef = useRef<SVGLineElement | null>(null);
  const bracketLabelRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const frame = () => {
      const p = paramsRef.current;
      const ke = eqStiffness(p.k1, p.k2, p.mode);
      const target = ke > 0 ? p.fExt / ke : 0;
      shownRef.current += (target - shownRef.current) * 0.18;
      if (Math.abs(target - shownRef.current) < 1e-5) shownRef.current = target;
      const shown = shownRef.current;

      const s = clamp(shown * PX_PER_M, 0, MAX_TRAVEL_PX);
      const blockLeft = REST_X + s;
      const r1 = ke / p.k1;
      const nodeX = WALL_X + L0_SER + s * r1;

      dSerARef.current?.setAttribute("d", coilPath(WALL_X, Y_SER, nodeX, 7, 9));
      dSerBRef.current?.setAttribute("d", coilPath(nodeX, Y_SER, blockLeft, 7, 9));
      nodeRef.current?.setAttribute("cx", nodeX.toFixed(1));
      dParARef.current?.setAttribute("d", coilPath(WALL_X, Y_PAR_A, blockLeft, 9, 8));
      dParBRef.current?.setAttribute("d", coilPath(WALL_X, Y_PAR_B, blockLeft, 9, 8));
      blockRef.current?.setAttribute("transform", `translate(${blockLeft.toFixed(1)} 0)`);
      bracketRef.current?.setAttribute("x2", blockLeft.toFixed(1));
      const lbl = bracketLabelRef.current;
      if (lbl) {
        lbl.setAttribute("x", ((REST_X + blockLeft) / 2).toFixed(1));
        lbl.textContent = `Δx = ${(shown * 100).toFixed(1)} cm`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Drag the block to apply force (pointer capture keeps the gesture alive).
  const handleBlockDown = (e: React.PointerEvent<SVGGElement>) => {
    dragRef.current = { active: true, startX: e.clientX, startF: fExt };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleBlockMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!dragRef.current.active) return;
    const dF = (e.clientX - dragRef.current.startX) / 5; // 5 px per newton
    setFExt(clamp(dragRef.current.startF + dF, 0, F_MAX));
  };
  const handleBlockUp = (e: React.PointerEvent<SVGGElement>) => {
    dragRef.current.active = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // pointer already released
    }
  };

  const handleReset = () => {
    setK1(80);
    setK2(120);
    setFExt(16);
    setMode("series");
  };

  const handleExport = () => {
    const summary =
      lang === "de"
        ? `Hooke-Versuch (${mode === "series" ? "Reihenschaltung" : "Parallelschaltung"}): k1 = ${k1} N/m, k2 = ${k2} N/m -> k_eq = ${kEq.toFixed(1)} N/m. F_ext = ${fExt.toFixed(1)} N -> Δx = ${(dx * 100).toFixed(1)} cm, E_spann = ${ePot.toFixed(2)} J. Nachweis: F-x-Gerade durch den Ursprung, Steigung = k_eq.`
        : `胡克定律实验（${mode === "series" ? "串联" : "并联"}）：k1 = ${k1} N/m，k2 = ${k2} N/m，得 k_eq = ${kEq.toFixed(1)} N/m。外力 F = ${fExt.toFixed(1)} N，伸长 Δx = ${(dx * 100).toFixed(1)} cm，弹性势能 E = ${ePot.toFixed(2)} J。结论：F-x 图线为过原点直线，斜率即 k_eq。`;
    if (onExportFinding) {
      onExportFinding(summary);
    } else {
      try {
        void navigator.clipboard.writeText(summary);
      } catch {
        // clipboard unavailable
      }
    }
  };

  // First-paint geometry from exact state (rAF takes over smoothing after mount).
  const s0 = clamp(dx * PX_PER_M, 0, MAX_TRAVEL_PX);
  const blockLeft0 = REST_X + s0;
  const nodeX0 = WALL_X + L0_SER + s0 * (kEq / k1);
  const arrowLen = 14 + fExt * 1.5;

  // F-x diagram geometry (state-driven, updates only on control change).
  const xMax = Math.max(0.5, dx * 1.25);
  const fMax = Math.max(F_MAX, fExt * 1.15);
  const gx = (v: number) => 40 + (v / xMax) * 250;
  const gy = (f: number) => 168 - (f / fMax) * 156;
  const lineEndX = Math.min(xMax, fMax / kEq);
  const dxC = Math.min(dx, xMax);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Mechanik · Elastizitaet" : "力学 · 弹性"}
          </span>
          <span className="text-[var(--gray)]">/</span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de"
              ? "Hooke'sches Gesetz: Kraft, Dehnung & Federkombination"
              : "胡克定律：弹力、形变与弹簧串并联"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
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
            {/* Spring bench (smoothed by rAF through refs) */}
            <svg viewBox="0 0 560 250" className="min-h-0 w-full flex-1 font-mono" role="img" aria-label="Federbank">
              {/* Wall */}
              <line x1={WALL_X} y1="60" x2={WALL_X} y2="200" stroke="var(--ink)" strokeWidth="4" />
              {Array.from({ length: 8 }).map((_, i) => (
                <line
                  key={i}
                  x1={WALL_X - 10}
                  y1={66 + i * 18}
                  x2={WALL_X}
                  y2={74 + i * 18}
                  stroke="var(--gray)"
                  strokeWidth="1"
                />
              ))}
              {/* Rest position marker */}
              <line x1={REST_X} y1="86" x2={REST_X} y2="182" stroke="var(--gray)" strokeWidth="1" strokeDasharray="3 3" />
              <text x={REST_X - 4} y="80" textAnchor="end" fontSize="9" fill="var(--gray)">
                {lang === "de" ? "Ruhelage" : "平衡位置"}
              </text>
              {/* Series pair */}
              {mode === "series" && (
                <g>
                  <path ref={dSerARef} d={coilPath(WALL_X, Y_SER, nodeX0, 7, 9)} fill="none" stroke="var(--ink)" strokeWidth="2" />
                  <path ref={dSerBRef} d={coilPath(nodeX0, Y_SER, blockLeft0, 7, 9)} fill="none" stroke="var(--ink)" strokeWidth="2" />
                  <circle ref={nodeRef} cx={nodeX0} cy={Y_SER} r="4" fill="var(--ink)" />
                  <text x={WALL_X + 6} y={Y_SER - 16} fontSize="9" fill="var(--gray)">
                    k1
                  </text>
                  <text x={(nodeX0 + blockLeft0) / 2 - 30} y={Y_SER - 16} fontSize="9" fill="var(--gray)">
                    k2
                  </text>
                </g>
              )}
              {/* Parallel pair */}
              {mode === "parallel" && (
                <g>
                  <path ref={dParARef} d={coilPath(WALL_X, Y_PAR_A, blockLeft0, 9, 8)} fill="none" stroke="var(--ink)" strokeWidth="2" />
                  <path ref={dParBRef} d={coilPath(WALL_X, Y_PAR_B, blockLeft0, 9, 8)} fill="none" stroke="var(--ink)" strokeWidth="2" />
                  <text x={WALL_X + 6} y={Y_PAR_A - 12} fontSize="9" fill="var(--gray)">
                    k1
                  </text>
                  <text x={WALL_X + 6} y={Y_PAR_B + 20} fontSize="9" fill="var(--gray)">
                    k2
                  </text>
                </g>
              )}
              {/* Extension bracket */}
              <line ref={bracketRef} x1={REST_X} y1="192" x2={blockLeft0} y2="192" stroke="var(--accent)" strokeWidth="1.5" />
              <line x1={REST_X} y1="187" x2={REST_X} y2="197" stroke="var(--accent)" strokeWidth="1.5" />
              <text ref={bracketLabelRef} x={(REST_X + blockLeft0) / 2} y="186" textAnchor="middle" fontSize="10" fill="var(--accent)">
                {`Δx = ${(dx * 100).toFixed(1)} cm`}
              </text>
              {/* Draggable block + force arrow */}
              <g
                ref={blockRef}
                transform={`translate(${blockLeft0} 0)`}
                onPointerDown={handleBlockDown}
                onPointerMove={handleBlockMove}
                onPointerUp={handleBlockUp}
                onPointerCancel={handleBlockUp}
                className="cursor-grab touch-none select-none active:cursor-grabbing"
              >
                <rect x="-8" y="86" width="58" height="92" fill="transparent" />
                <rect x="0" y="96" width="42" height="72" rx="3" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
                <line x1="8" y1="110" x2="34" y2="110" stroke="var(--line)" strokeWidth="1" />
                <line x1="8" y1="154" x2="34" y2="154" stroke="var(--line)" strokeWidth="1" />
                <line x1="46" y1="132" x2={46 + arrowLen} y2="132" stroke="var(--accent)" strokeWidth="2.5" />
                <polygon
                  points={`${46 + arrowLen},126 ${46 + arrowLen + 9},132 ${46 + arrowLen},138`}
                  fill="var(--accent)"
                />
                <text x={50 + arrowLen / 2} y="120" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--accent)">
                  {`F = ${fExt.toFixed(1)} N`}
                </text>
              </g>
              {/* Ruler (10 cm steps at 460 px/m) */}
              <line x1="40" y1="216" x2="524" y2="216" stroke="var(--gray)" strokeWidth="1" />
              {Array.from({ length: 11 }).map((_, i) => (
                <g key={i}>
                  <line x1={WALL_X + i * 46} y1="216" x2={WALL_X + i * 46} y2="224" stroke="var(--gray)" strokeWidth="1" />
                  <text x={WALL_X + i * 46} y="236" textAnchor="middle" fontSize="8" fill="var(--gray)">
                    {i * 10}
                  </text>
                </g>
              ))}
              <text x="528" y="226" fontSize="8" fill="var(--gray)">
                cm
              </text>
            </svg>

            {/* F-x diagram: slope = k_eq, shaded area = E */}
            <div className="border-t border-[var(--line)]">
              <svg viewBox="0 0 300 200" className="h-[150px] w-full shrink-0 font-mono sm:h-[165px]" role="img" aria-label="F-x-Diagramm">
                {[0.25, 0.5, 0.75].map((t) => (
                  <line key={t} x1="40" y1={168 - t * 156} x2="290" y2={168 - t * 156} stroke="var(--line)" strokeWidth="1" />
                ))}
                <polygon
                  points={`40,168 ${gx(dxC).toFixed(1)},168 ${gx(dxC).toFixed(1)},${gy(fExt).toFixed(1)}`}
                  fill="#1e40af"
                  opacity="0.12"
                />
                <line
                  x1={gx(0)}
                  y1={gy(0)}
                  x2={gx(lineEndX).toFixed(1)}
                  y2={gy(kEq * lineEndX).toFixed(1)}
                  stroke="var(--ink)"
                  strokeWidth="2"
                />
                <circle cx={gx(dxC).toFixed(1)} cy={gy(fExt).toFixed(1)} r="4" fill="#1e40af" />
                <line x1="40" y1="8" x2="40" y2="176" stroke="var(--gray)" strokeWidth="1" />
                <line x1="34" y1="168" x2="292" y2="168" stroke="var(--gray)" strokeWidth="1" />
                <text x="8" y="20" fontSize="9" fill="var(--gray)">
                  F/N
                </text>
                <text x="262" y="184" fontSize="9" fill="var(--gray)">
                  Δx/m
                </text>
                <text x="52" y="30" fontSize="10" fill="var(--ink)">
                  {`k = ${kEq.toFixed(1)} N/m`}
                </text>
                <text x="52" y="44" fontSize="10" fontWeight="bold" fill="#1e40af">
                  {`E = ${ePot.toFixed(2)} J`}
                </text>
              </svg>
            </div>

            {/* HUD readout */}
            <div className="pointer-events-none absolute right-3 top-3 w-44 space-y-1 rounded border border-[var(--line)] bg-[var(--surface)] p-2 font-mono text-[11px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Messwerte" : "测量读数"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">F</span>
                <strong className="text-[var(--ink)]">{fExt.toFixed(1)} N</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">Δx</span>
                <strong className="text-[var(--ink)]">{(dx * 100).toFixed(1)} cm</strong>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">E</span>
                <strong style={{ color: "#1e40af" }}>{ePot.toFixed(2)} J</strong>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-2 left-3 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
              {lang === "de" ? "Block ziehen: aeussere Kraft direkt aufpraegen" : "拖动滑块：直接施加外力"}
            </div>
          </div>
        </div>

        {/* Control panel */}
        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Parameter" : "参数调节"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Feder k1:" : "弹簧 k1:"}</span>
                  <span className="font-bold text-[var(--ink)]">{k1} N/m</span>
                </div>
                <input
                  type="range"
                  min={K_MIN}
                  max={K_MAX}
                  step={5}
                  value={k1}
                  onChange={(e) => setK1(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Feder k2:" : "弹簧 k2:"}</span>
                  <span className="font-bold text-[var(--ink)]">{k2} N/m</span>
                </div>
                <input
                  type="range"
                  min={K_MIN}
                  max={K_MAX}
                  step={5}
                  value={k2}
                  onChange={(e) => setK2(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
              <div className="space-y-1 border-t border-[var(--line)] pt-3">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Aeussere Kraft F:" : "外力 F:"}</span>
                  <span className="font-bold text-[var(--ink)]">{fExt.toFixed(1)} N</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={F_MAX}
                  step={0.5}
                  value={fExt}
                  onChange={(e) => setFExt(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
              <div className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] p-0.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setMode("series")}
                  className={`flex-1 rounded px-2 py-1 transition-colors ${
                    mode === "series" ? "bg-[var(--ink)] font-medium text-[var(--paper)]" : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {lang === "de" ? "Reihe" : "串联"}
                </button>
                <button
                  type="button"
                  onClick={() => setMode("parallel")}
                  className={`flex-1 rounded px-2 py-1 transition-colors ${
                    mode === "parallel" ? "bg-[var(--ink)] font-medium text-[var(--paper)]" : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {lang === "de" ? "Parallel" : "并联"}
                </button>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] py-1.5 font-mono text-xs text-[var(--gray)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {lang === "de" ? "Zuruecksetzen" : "重置"}
              </button>
            </div>

            <div className="space-y-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">k_eq</span>
                <strong className="text-[var(--ink)]">{kEq.toFixed(1)} N/m</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">Δx = F/k</span>
                <strong className="text-[var(--ink)]">{(dx * 100).toFixed(2)} cm</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">F_R = -k·Δx</span>
                <strong className="text-[var(--ink)]">{fExt.toFixed(1)} N</strong>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                <span className="text-[var(--gray)]">E = 1/2·k·Δx²</span>
                <strong style={{ color: "#1e40af" }}>{ePot.toFixed(3)} J</strong>
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
          <MathHtml code="F_R = -k \cdot \Delta x" display={true} cacheKey="hooke:force" />
          <MathHtml code="k_{\mathrm{ser}} = \frac{k_1 k_2}{k_1+k_2} \quad k_{\mathrm{par}} = k_1+k_2" display={true} cacheKey="hooke:combo" />
          <MathHtml code="E_{\mathrm{spann}} = \frac{1}{2} k (\Delta x)^2" display={true} cacheKey="hooke:energy" />
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "02 · KLP / Operatoren" : "02 · 考纲 / 算子"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "EF Mechanik: elastische Verformung im Gueltigkeitsbereich des Hooke'schen Gesetzes. Die F-x-Gerade geht durch den Ursprung; ihre Steigung ist die Federhaerte k."
              : "EF 力学：胡克定律适用范围内的弹性形变。F-x 图线过原点，斜率即劲度系数 k。"}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Operatoren: darstellen (Anordnung skizzieren), berechnen (k_eq, Δx, E), begruenden (Reihe weicher, parallel haerter)."
              : "算子：darstellen（画装置示意）、berechnen（算 k_eq、Δx、E）、begruenden（论证串联变软、并联变硬）。"}
          </p>
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "03 · Verstaendnis (CN)" : "03 · 中文要点"}
          </div>
          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Reihe: gleiche Kraft in beiden Federn, Dehnungen addieren sich — die Kombination wird weicher. Parallel: gleiche Dehnung, Kraefte addieren sich — die Kombination wird haerter. Die Dreiecksflaeche unter der F-x-Gerade ist die gespeicherte Spannenergie."
              : "串联：两弹簧受力相同、伸长相加，等效变软（k_ser < min(k1,k2)）；并联：伸长相同、弹力相加，等效变硬（k_par = k1+k2）。F-x 图线下的三角形面积就是储存的弹性势能。"}
          </p>
        </div>
        <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "04 · Befund sichern" : "04 · 导出结论"}
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? `k_eq = ${kEq.toFixed(1)} N/m, Δx = ${(dx * 100).toFixed(1)} cm, E = ${ePot.toFixed(2)} J.`
              : `k_eq = ${kEq.toFixed(1)} N/m，Δx = ${(dx * 100).toFixed(1)} cm，E = ${ePot.toFixed(2)} J。`}
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

export default HookeLawSim;
