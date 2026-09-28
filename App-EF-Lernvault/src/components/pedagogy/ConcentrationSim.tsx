import { useCallback, useRef, useState } from "react";
import type { JSX } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface ConcentrationSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type ConcentrationSimType = ConcentrationSimProps;

const C_MIN = 0;
const C_MAX = 300;
const C_STEP = 5;
const D_MIN = 0.5;
const D_MAX = 2.0;
const D_STEP = 0.05;
const E_MIN = 0;
const E_MAX = 8;
const E_STEP = 0.1;
const A_AXIS_MAX = 2.5;

const COL_BEAM = "#B45309";
const COL_SOL = "#0E7490";
const COL_WORK = "#1D4ED8";
const COL_OK = "#166534";
const COL_WARN = "#991B1B";

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function absorbance(cMm: number, eps: number, dCm: number): number {
  return eps * (cMm / 1000) * dCm;
}

function IconExport(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8h10M9 3.5L13.5 8 9 12.5" />
    </svg>
  );
}

function IconDrop(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.8C8 1.8 3.4 7.2 3.4 10a4.6 4.6 0 0 0 9.2 0c0-2.8-4.6-8.2-4.6-8.2z" />
      <path d="M5.8 10.2a2.3 2.3 0 0 0 1.6 2.2" />
    </svg>
  );
}

function IconCuvette(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 2.5h9v9.5a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5z" />
      <path d="M3.5 6.5h9" />
    </svg>
  );
}

export function ConcentrationSim({ lang, studioMode: _studioMode = true, onExportFinding }: ConcentrationSimProps) {
  void _studioMode;
  const isDe = lang === "de";

  const [cMm, setCMm] = useState<number>(120);
  const [dCm, setDCm] = useState<number>(1.0);
  const [eps, setEps] = useState<number>(4.0);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const dragRef = useRef<{ mode: "path" | "conc" | null }>({ mode: null });

  const A = absorbance(cMm, eps, dCm);
  const T = Math.pow(10, -A);
  const pct = T * 100;
  const saturated = A > 2.0;
  const cM = cMm / 1000;

  const cuvW = 60 + ((dCm - D_MIN) / (D_MAX - D_MIN)) * 120;
  const cuvL = 120;
  const cuvR = cuvL + cuvW;
  const cuvT = 70;
  const cuvB = 200;
  const beamY = 132;
  const solAlpha = clamp(A / 2.0, 0.05, 0.92);
  const outAlpha = clamp(T, 0.04, 1);

  const dotCount = Math.round((cMm / C_MAX) * 36);
  const dots: Array<{ x: number; y: number }> = [];
  const innerW = Math.max(12, cuvW - 16);
  for (let i = 0; i < dotCount; i += 1) {
    dots.push({
      x: cuvL + 8 + ((i * 47) % Math.floor(innerW)),
      y: cuvT + 14 + ((i * 31) % 104),
    });
  }

  const gx0 = 372;
  const gy1 = 220;
  const gpw = 150;
  const gph = 160;
  const aEnd = eps * (C_MAX / 1000) * dCm;
  const aEndClip = Math.min(aEnd, A_AXIS_MAX);
  const lx1 = gx0 + gpw;
  const ly1 = gy1 - (aEndClip / A_AXIS_MAX) * gph;
  const wx = gx0 + (cMm / C_MAX) * gpw;
  const wy = gy1 - (Math.min(A, A_AXIS_MAX) / A_AXIS_MAX) * gph;

  const svgToUnit = (clientX: number, rect: DOMRect): number =>
    ((clientX - rect.left) / Math.max(1, rect.width)) * 560;

  const unitToPath = (ux: number): number => {
    const w = clamp(ux - cuvL, 60, 180);
    const d = D_MIN + ((w - 60) / 120) * (D_MAX - D_MIN);
    return clamp(Math.round(d / D_STEP) * D_STEP, D_MIN, D_MAX);
  };

  const unitToConc = (ux: number): number => {
    const c = ((ux - gx0) / gpw) * C_MAX;
    return clamp(Math.round(c / C_STEP) * C_STEP, C_MIN, C_MAX);
  };

  const beginDrag = (mode: "path" | "conc") => (e: React.PointerEvent<SVGElement>): void => {
    dragRef.current.mode = mode;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const moveDrag = (e: React.PointerEvent<SVGSVGElement>): void => {
    const mode = dragRef.current.mode;
    if (!mode) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ux = svgToUnit(e.clientX, rect);
    if (mode === "path") setDCm(unitToPath(ux));
    else setCMm(unitToConc(ux));
  };

  const endDrag = (e: React.PointerEvent<SVGElement>): void => {
    dragRef.current.mode = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* pointer already released */
    }
  };

  const generateReport = useCallback((): string => {
    const a = absorbance(cMm, eps, dCm);
    const t = Math.pow(10, -a);
    if (isDe) {
      return (
        "Labor Lambert-Beer-Gesetz - Befund:\n" +
        "- Ansatz: c = " + cMm + " mmol/L (" + (cMm / 1000).toFixed(3) + " mol/L), d = " + dCm.toFixed(2) + " cm, epsilon = " + eps.toFixed(1) + " L/(mol·cm)\n" +
        "- Messwerte: A = " + a.toFixed(3) + ", T = " + t.toFixed(3) + " (" + (t * 100).toFixed(1) + " %)\n" +
        "- Gesetz: A = epsilon · c · d; A proportional zu c (Kalibriergerade durch den Ursprung, Steigung = epsilon · d).\n" +
        (a > 2.0 ? "- Hinweis: A > 2, Detektor im Saettigungsbereich, linearer Bereich verlassen.\n" : "") +
        "Frage an den Tutor: Pruefe die Rechnung und erklaere, warum die Gerade bei sehr hoher Konzentration abknickt."
      );
    }
    return (
      "Labor 比尔定律实验 - 结论:\n" +
      "- 条件: 浓度 c = " + cMm + " mmol/L (" + (cMm / 1000).toFixed(3) + " mol/L)，光程 d = " + dCm.toFixed(2) + " cm，摩尔吸光系数 epsilon = " + eps.toFixed(1) + " L/(mol·cm)\n" +
      "- 测量: 吸光度 A = " + a.toFixed(3) + "，透射比 T = " + t.toFixed(3) + " (" + (t * 100).toFixed(1) + " %)\n" +
      "- 规律: A = epsilon·c·d；吸光度与浓度成正比，校准直线过原点，斜率 = epsilon·d。\n" +
      (a > 2.0 ? "- 提示: A > 2，检测器进入饱和区，偏离线性范围。\n" : "") +
      "请助教核对计算并解释高浓度下直线偏折的原因。"
    );
  }, [cMm, dCm, eps, isDe]);

  const handleExport = useCallback(() => {
    const text = generateReport();
    if (onExportFinding) {
      onExportFinding(text);
      return;
    }
    try {
      void navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [generateReport, onExportFinding]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"}`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-serif font-medium text-sm tracking-tight text-[var(--ink)]">
                  {isDe ? "Labor · Lambert-Beer-Gesetz und Konzentration" : "Labor · 比尔定律与溶液浓度"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  {isDe ? "A = epsilon · c · d, Transmission T = 10^{-A}" : "吸光度 A = epsilon·c·d，透射比 T = 10^{-A}"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPanels(!showPanels)}
                className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--surface)] text-[var(--ink)]"
                title={showPanels ? (isDe ? "Seitenleiste einklappen" : "折叠侧栏") : (isDe ? "Seitenleiste einblenden" : "展开侧栏")}
              >
                {showPanels ? (isDe ? "◧ Leiste einklappen" : "◧ 折叠侧栏") : (isDe ? "◩ Leiste einblenden" : "◩ 展开侧栏")}
              </button>
            </div>

            <div className="w-full h-[420px] sm:h-[480px]">
              <svg
                viewBox="0 0 560 340"
                preserveAspectRatio="xMidYMid meet"
                className="w-full h-full block touch-none select-none"
                onPointerMove={moveDrag}
                role="img"
                aria-label={isDe ? "Kuevette mit Loesung und Kalibriergerade" : "比色皿溶液与校准直线图"}
              >
                <rect x="0" y="0" width="560" height="340" style={{ fill: "var(--paper)" }} />

                <text x="24" y="30" className="font-mono" fontSize="10" style={{ fill: "var(--ink-muted)" }}>
                  {isDe ? "Strahlengang (Transmission)" : "光路（透射）"}
                </text>

                <rect x="24" y="108" width="44" height="48" style={{ fill: "var(--surface)", stroke: "var(--ink)" }} strokeWidth="1.5" />
                <circle cx="46" cy="132" r="7" style={{ fill: "none", stroke: "var(--ink)" }} strokeWidth="1.5" />
                <circle cx="46" cy="132" r="2.5" style={{ fill: "var(--ink)" }} />
                <text x="24" y="172" className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                  {isDe ? "Lichtquelle" : "光源"}
                </text>

                <rect x="68" y={beamY - 5} width={cuvL - 68} height="10" opacity="0.95" fill={COL_BEAM} />
                <rect x={cuvL} y={beamY - 5} width={cuvW} height="10" opacity={clamp(0.55 + outAlpha * 0.4, 0, 1)} fill={COL_BEAM} />
                <rect x={cuvR} y={beamY - 5} width="30" height="10" opacity={outAlpha} fill={COL_BEAM} />

                <rect x={cuvL} y={cuvT} width={cuvW} height={cuvB - cuvT} style={{ fill: "var(--surface)", stroke: "var(--ink)" }} strokeWidth="1.5" />
                <rect x={cuvL + 4} y={cuvT + 8} width={Math.max(4, cuvW - 8)} height={cuvB - cuvT - 14} fill={COL_SOL} opacity={solAlpha} />
                {dots.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="2.2" style={{ fill: "var(--surface)" }} opacity="0.85" />
                ))}
                <line x1={cuvL} y1={cuvT} x2={cuvL + cuvW} y2={cuvT} style={{ stroke: "var(--ink-muted)" }} strokeWidth="1" strokeDasharray="4 3" />

                <rect
                  x={cuvR - 7}
                  y={cuvT - 14}
                  width="14"
                  height={cuvB - cuvT + 28}
                  style={{ fill: "var(--surface)", stroke: "var(--ink)", cursor: "ew-resize" }}
                  strokeWidth="1.5"
                  onPointerDown={beginDrag("path")}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                >
                  <title>{isDe ? "Kuevettenwand ziehen (d)" : "拖动比色皿壁（光程 d）"}</title>
                </rect>
                <line x1={cuvR} y1={cuvT - 6} x2={cuvR} y2={cuvB + 6} style={{ stroke: "var(--ink)" }} strokeWidth="1" />
                <text x={(cuvL + cuvR) / 2} y={cuvB + 34} textAnchor="middle" className="font-mono" fontSize="11" style={{ fill: "var(--ink)" }}>
                  {"d = " + dCm.toFixed(2) + " cm"}
                </text>
                <text x={(cuvL + cuvR) / 2} y={cuvB + 48} textAnchor="middle" className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                  {isDe ? "rechte Wand ziehen" : "拖动右壁调光程"}
                </text>

                <rect x={cuvR + 30} y="102" width="48" height="60" style={{ fill: "var(--surface)", stroke: "var(--ink)" }} strokeWidth="1.5" />
                <rect x={cuvR + 38} y="128" width="32" height="12" style={{ fill: "var(--ink)" }} opacity={clamp(0.15 + outAlpha * 0.85, 0, 1)} />
                <text x={cuvR + 54} y="156" textAnchor="middle" className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                  {isDe ? "Detektor" : "检测器"}
                </text>
                <text x={cuvR + 54} y="182" textAnchor="middle" className="font-mono" fontSize="11" fontWeight="700" style={{ fill: saturated ? COL_WARN : "var(--ink)" }}>
                  {"A = " + A.toFixed(2)}
                </text>
                <text x={cuvR + 54} y="196" textAnchor="middle" className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                  {"T = " + pct.toFixed(1) + " %"}
                </text>

                <text x={gx0} y="30" className="font-mono" fontSize="10" style={{ fill: "var(--ink-muted)" }}>
                  {isDe ? "Kalibriergerade A(c)" : "校准直线 A(c)"}
                </text>
                {[0.5, 1.0, 1.5, 2.0].map((g) => {
                  const gy = gy1 - (g / A_AXIS_MAX) * gph;
                  return (
                    <g key={g}>
                      <line x1={gx0} y1={gy} x2={gx0 + gpw} y2={gy} style={{ stroke: "var(--line)" }} strokeWidth="1" />
                      <text x={gx0 - 6} y={gy + 3} textAnchor="end" className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                        {g.toFixed(1)}
                      </text>
                    </g>
                  );
                })}
                <line x1={gx0} y1={gy1 - gph} x2={gx0} y2={gy1} style={{ stroke: "var(--ink-muted)" }} strokeWidth="1" />
                <line x1={gx0} y1={gy1} x2={gx0 + gpw} y2={gy1} style={{ stroke: "var(--ink-muted)" }} strokeWidth="1" />
                <line x1={gx0} y1={gy1} x2={lx1} y2={ly1} style={{ stroke: "var(--ink)" }} strokeWidth="2" />
                {aEnd > A_AXIS_MAX && (
                  <text x={lx1 - 4} y={ly1 + 14} textAnchor="end" className="font-mono" fontSize="9" style={{ fill: COL_WARN }}>
                    {isDe ? "Saettigung" : "饱和"}
                  </text>
                )}
                <line x1={wx} y1={wy} x2={wx} y2={gy1} style={{ stroke: "var(--line)" }} strokeWidth="1" strokeDasharray="3 3" />
                <line x1={gx0} y1={wy} x2={wx} y2={wy} style={{ stroke: "var(--line)" }} strokeWidth="1" strokeDasharray="3 3" />
                <circle
                  cx={wx}
                  cy={wy}
                  r="7"
                  style={{ fill: COL_WORK, stroke: "var(--paper)", cursor: "grab" }}
                  strokeWidth="2"
                  onPointerDown={beginDrag("conc")}
                  onPointerUp={endDrag}
                  onPointerCancel={endDrag}
                >
                  <title>{isDe ? "Arbeitspunkt ziehen (c)" : "拖动工作点（浓度 c）"}</title>
                </circle>
                <text x={gx0} y={gy1 + 18} className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                  {"0"}
                </text>
                <text x={gx0 + gpw} y={gy1 + 18} textAnchor="end" className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                  {C_MAX + (isDe ? " mmol/L" : " 毫摩/升")}
                </text>
                <text x={gx0 + gpw / 2} y={gy1 + 32} textAnchor="middle" className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                  {isDe ? "c (Punkt ziehen)" : "浓度 c（可拖工作点）"}
                </text>
                <text x={gx0 - 10} y={gy1 - gph - 6} textAnchor="start" className="font-mono" fontSize="9" style={{ fill: "var(--ink-muted)" }}>
                  {"A"}
                </text>

                <text x="24" y="262" className="font-mono" fontSize="10" style={{ fill: "var(--ink)" }}>
                  {(isDe ? "Loesung: c = " : "溶液：c = ") + cMm + (isDe ? " mmol/L" : " mmol/L") + "  ·  epsilon = " + eps.toFixed(1) + " L/(mol·cm)"}
                </text>
                <text x="24" y="280" className="font-mono" fontSize="10" style={{ fill: saturated ? COL_WARN : COL_OK }}>
                  {saturated
                    ? (isDe ? "A > 2: Detektor gesaettigt, linearer Bereich verlassen." : "A > 2：检测器饱和，已偏离线性范围。")
                    : (isDe ? "Linearer Bereich: A proportional zu c." : "线性范围内：吸光度与浓度成正比。")}
                </text>
                <text x="24" y="298" className="font-mono" fontSize="10" style={{ fill: "var(--ink-muted)" }}>
                  {isDe
                    ? "Je dunkler die Loesung, desto kleiner T, desto groesser A."
                    : "溶液颜色越深，透射比越小，吸光度越大。"}
                </text>
              </svg>
            </div>

            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-mono text-[11px] text-[var(--ink)]">
                <span className="inline-flex items-center gap-1.5">
                  <IconDrop />
                  <span>{"c = " + cMm + " mmol/L"}</span>
                </span>
                <span className="inline-flex items-center gap-1.5 ml-3">
                  <IconCuvette />
                  <span>{"d = " + dCm.toFixed(2) + " cm"}</span>
                </span>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>A = <strong>{A.toFixed(3)}</strong></span>
                <span>T = <strong>{T.toFixed(3)}</strong></span>
                <span>{pct.toFixed(1)} <strong>%</strong></span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Konzentration der Loesung" : "溶液浓度调控"}
              </div>
              <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                <span>{isDe ? "Konzentration (c)" : "浓度 (c)"}</span>
                <span className="font-medium">{cMm} mmol/L</span>
              </div>
              <input
                type="range"
                min={C_MIN}
                max={C_MAX}
                step={C_STEP}
                value={cMm}
                onChange={(e) => setCMm(Number(e.target.value))}
                className="w-full"
                aria-label={isDe ? "Konzentration" : "浓度"}
              />
              <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                <span>{cM.toFixed(3)} mol/L</span>
                <span>{C_MAX} mmol/L</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {isDe ? "Arbeitspunkt auch direkt im Diagramm ziehen." : "也可直接在右侧图中拖动工作点。"}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Schichtdicke (Kuevette)" : "液层厚度（比色皿）"}
              </div>
              <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                <span>{isDe ? "Lichtweg (d)" : "光程 (d)"}</span>
                <span className="font-medium">{dCm.toFixed(2)} cm</span>
              </div>
              <input
                type="range"
                min={D_MIN}
                max={D_MAX}
                step={D_STEP}
                value={dCm}
                onChange={(e) => setDCm(Number(e.target.value))}
                className="w-full"
                aria-label={isDe ? "Schichtdicke" : "光程"}
              />
              <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {isDe ? "Rechte Kuevettenwand direkt im Bild ziehen." : "可直接在图中拖动比色皿右壁。"}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Stoff und Spektrometer" : "物质与分光光度计"}
              </div>
              <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                <span>{isDe ? "Molarer Absorptionskoeffizient" : "摩尔吸光系数"}</span>
                <span className="font-medium">{eps.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={E_MIN}
                max={E_MAX}
                step={E_STEP}
                value={eps}
                onChange={(e) => setEps(Number(e.target.value))}
                className="w-full"
                aria-label={isDe ? "Absorptionskoeffizient" : "摩尔吸光系数"}
              />
              <div className="mt-3 border border-[var(--line)] bg-[var(--paper)] p-2.5">
                <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">
                  {isDe ? "Anzeige des Spektrometers" : "分光光度计读数"}
                </div>
                <div className="font-mono tabular-nums text-[13px] text-[var(--ink)]">
                  A = <strong>{A.toFixed(3)}</strong>
                </div>
                <div className="font-mono tabular-nums text-[11px] text-[var(--ink-muted)]">
                  T = {T.toFixed(3)} · {pct.toFixed(1)} %
                </div>
                <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden mt-2">
                  <div className="h-full" style={{ width: clamp((A / A_AXIS_MAX) * 100, 0, 100) + "%", backgroundColor: saturated ? COL_WARN : COL_SOL }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel &amp; Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Lambert-Beer-Gesetz" : "比尔定律"}
          </div>
          <MathHtml code="A = \varepsilon \cdot c \cdot d" display={true} cacheKey="beer:gesetz" />
          <MathHtml code="T = 10^{-A} = \frac{I}{I_0}" display={true} cacheKey="beer:transmission" />
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Bei festem epsilon und d waechst A linear mit c: Kalibriergerade durch den Ursprung."
              : "系数与光程一定时，吸光度随浓度线性增大，校准直线过原点。"}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Quantitative Analyse" : "定量分析"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper)] px-1">darstellen, berechnen</code>
            <p className="mt-1">
              {isDe
                ? "Stelle die Abhaengigkeit A(c) dar und berechne: Kalibriergerade, Steigung epsilon · d, Konzentrationsbestimmung aus A."
                : "描述吸光度随浓度的变化并计算：校准直线、斜率 epsilon·d、由吸光度反求浓度。"}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Tinten-Modell" : "墨水类比法"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Denke an Tinte im Wasser: mehr Tropfen (c) oder breiteres Glas (d) machen das Wasser dunkler. A zaehlt die Dunkelheit, T das durchgelassene Licht."
              : "把溶液想成墨水：墨滴越多（浓度大）或杯子越宽（光程长），水色越深；吸光度计量“暗”，透射比计量“透过的光”。"}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isDe ? "Befunde exportieren" : "导出结论"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isDe
                ? "Uebertrage die aktuellen Messwerte direkt in den KI-Tutor zur vertieften Analyse."
                : "把当前测量值直接送入 AI 助教做深入分析。"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <IconExport />
            {copied ? (isDe ? "Kopiert" : "已复制") : (isDe ? "An Tutor senden" : "发送给助教")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConcentrationSim;
