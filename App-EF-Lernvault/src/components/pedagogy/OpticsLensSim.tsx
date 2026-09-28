import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface OpticsLensSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

// World model (clean-room, first principles only):
// Thin converging lens, school sign convention (Schulphysik):
//   1/f = 1/g + 1/b,  transverse scale B/G = |b|/g.
//   g > f  -> real inverted image on far side (b > 0)
//   g = f  -> image at infinity
//   g < f  -> virtual upright image on object side (|b|, dashed construction)
const WORLD_CM = 40;
const VB_W = 720;
const VB_H = 400;
const PAD = 30;
const SX = (VB_W - PAD * 2) / WORLD_CM; // px per cm, identical on both axes
const AXIS_Y = 262;
const OBJ_H_CM = 3.0;
const INF_B_CM = 80; // |b| beyond this counts as "at infinity" for drawing

const X = (cm: number): number => PAD + cm * SX;
const Y = (cmAboveAxis: number): number => AXIS_Y - cmAboveAxis * SX;

const clamp = (v: number, lo: number, hi: number): number =>
  Math.min(hi, Math.max(lo, v));

function fmtSigned(v: number, digits: number): string {
  return v.toFixed(digits);
}

export function OpticsLensSim({
  lang,
  studioMode: _studioMode = true,
  onExportFinding,
}: OpticsLensSimProps) {
  const isZh = lang === "zh";
  void _studioMode;

  // Inquiry variables (user controlled)
  const [focal, setFocal] = useState<number>(8); // f in cm
  const [gegenstand, setGegenstand] = useState<number>(18); // g in cm
  const [lensAt, setLensAt] = useState<number>(24); // lens world position in cm
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showR1, setShowR1] = useState<boolean>(true);
  const [showR2, setShowR2] = useState<boolean>(true);
  const [showR3, setShowR3] = useState<boolean>(true);

  const fSliderId = useId();
  const gSliderId = useId();

  // Live mirrors for pointer handlers (avoid stale closures, no per-frame state)
  const gRef = useRef(gegenstand);
  const lensRef = useRef(lensAt);
  gRef.current = gegenstand;
  lensRef.current = lensAt;

  // Derived imaging state (pure memo, zero animation setState)
  const imaging = useMemo(() => {
    const f = focal;
    const g = gegenstand;
    const eps = 1e-9;
    const denom = g - f;
    if (Math.abs(denom) < 0.05) {
      return { kind: "inf" as const, b: Number.POSITIVE_INFINITY, mag: Number.POSITIVE_INFINITY, imgH: 0, imgAt: 0 };
    }
    const b = (f * g) / (denom + (Math.abs(denom) < eps ? eps : 0));
    if (b > 0) {
      return { kind: "real" as const, b, mag: b / g, imgH: (-OBJ_H_CM * b) / g, imgAt: lensRef.current + b };
    }
    return { kind: "virtual" as const, b, mag: Math.abs(b) / g, imgH: (OBJ_H_CM * Math.abs(b)) / g, imgAt: lensRef.current + b };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focal, gegenstand]);

  const objAt = lensAt - gegenstand;
  const isInf = imaging.kind === "inf" || Math.abs(imaging.b) > INF_B_CM;

  // ---- rAF loop: photon flow along rays via direct DOM writes only ----
  // Quasi-static scene, throttle doctrine: animation phase lives in a ref,
  // dash offsets are written straight to SVG nodes, never via setState.
  const svgRef = useRef<SVGSVGElement | null>(null);
  const phaseRef = useRef(0);
  useEffect(() => {
    let animId = 0;
    let last = performance.now();
    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      phaseRef.current = (phaseRef.current + dt * 26) % 1000;
      const svg = svgRef.current;
      if (!svg) return;
      const rays = svg.querySelectorAll<SVGLineElement | SVGPathElement>(".flow-ray");
      rays.forEach((el) => {
        el.style.strokeDashoffset = String(-phaseRef.current);
      });
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // ---- Pointer drag with setPointerCapture + rAF-throttled commit ----
  // Moves are stored in a pending ref; at most one commit per frame.
  const dragModeRef = useRef<"obj" | "lens" | null>(null);
  const pendingCmRef = useRef<number | null>(null);
  const dragRafRef = useRef(0);

  const svgCmFromClientX = (clientX: number): number => {
    const svg = svgRef.current;
    if (!svg) return 0;
    const rect = svg.getBoundingClientRect();
    const px = ((clientX - rect.left) / Math.max(1, rect.width)) * VB_W;
    return (px - PAD) / SX;
  };

  const commitDrag = () => {
    dragRafRef.current = 0;
    const cm = pendingCmRef.current;
    pendingCmRef.current = null;
    if (cm === null) return;
    const mode = dragModeRef.current;
    if (mode === "obj") {
      const g = clamp(lensRef.current - cm, 4.5, 32);
      setGegenstand(Math.round(g * 2) / 2);
    } else if (mode === "lens") {
      const g = gRef.current;
      const lo = Math.max(0.5 + g, 6);
      const hi = Math.min(WORLD_CM - 6, 34);
      setLensAt(clamp(cm, lo, hi));
    }
  };

  const scheduleCommit = () => {
    if (dragRafRef.current !== 0) return;
    dragRafRef.current = requestAnimationFrame(commitDrag);
  };

  useEffect(() => () => cancelAnimationFrame(dragRafRef.current), []);

  const handleObjDown = (e: React.PointerEvent<SVGGElement>) => {
    dragModeRef.current = "obj";
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleLensDown = (e: React.PointerEvent<SVGGElement>) => {
    dragModeRef.current = "lens";
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleDragMove = (e: React.PointerEvent<SVGGElement>) => {
    if (dragModeRef.current === null) return;
    pendingCmRef.current = svgCmFromClientX(e.clientX);
    scheduleCommit();
  };
  const handleDragUp = (e: React.PointerEvent<SVGGElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragModeRef.current = null;
    pendingCmRef.current = null;
    if (dragRafRef.current !== 0) {
      cancelAnimationFrame(dragRafRef.current);
      dragRafRef.current = 0;
    }
  };

  const handleReset = () => {
    setFocal(8);
    setGegenstand(18);
    setLensAt(24);
  };
  const jumpTo2F = () => {
    setGegenstand(clamp(Math.round(focal * 2 * 2) / 2, 4.5, 32));
  };
  const jumpToF = () => {
    setGegenstand(clamp(Math.round(focal * 2) / 2, 4.5, 32));
  };

  // ---- SVG geometry ----
  const lensX = X(lensAt);
  const tipX = X(objAt);
  const tipY = Y(OBJ_H_CM);
  const centerX = lensX;
  const centerY = AXIS_Y;
  const XR = VB_W - 12;
  const nearFpx = X(lensAt - focal);
  const farFpx = X(lensAt + focal);

  const imgTip = !isInf
    ? { x: X(imaging.imgAt), y: Y(imaging.imgH) }
    : null;

  // R1: parallel -> far focal point
  const r1End = useMemo(() => {
    const dx = farFpx - lensX;
    if (Math.abs(dx) < 1e-6) return { x: XR, y: tipY };
    const t = (XR - lensX) / dx;
    return { x: XR, y: tipY + (centerY - tipY) * t };
  }, [farFpx, lensX, tipY, centerY]);

  // R2: central ray through lens middle, extended
  const r2End = useMemo(() => {
    const dx = centerX - tipX;
    if (Math.abs(dx) < 1e-6) return { x: XR, y: centerY };
    const t = (XR - tipX) / dx;
    return { x: XR, y: tipY + (centerY - tipY) * t };
  }, [centerX, tipX, tipY, centerY]);

  // R3: through near focal point -> parallel out
  const r3LensY = useMemo(() => {
    const dx = nearFpx - tipX;
    if (Math.abs(dx) < 1e-6) return null;
    const t = (lensX - tipX) / dx;
    return tipY + (centerY - tipY) * t;
  }, [nearFpx, tipX, lensX, tipY, centerY]);

  const kindLabel =
    imaging.kind === "real"
      ? isZh
        ? "实像 · 倒立 · 异侧"
        : "reell · umgekehrt · Gegenseite"
      : imaging.kind === "virtual"
        ? isZh
          ? "虚像 · 正立 · 同侧"
          : "virtuell · aufrecht · Objektseite"
        : isZh
          ? "像在无穷远"
          : "Bild im Unendlichen";

  const bText =
    imaging.kind === "inf" || isInf
      ? (isZh ? "无穷远" : "unendlich")
      : `${fmtSigned(Math.abs(imaging.b), 1)} cm`;
  const magText =
    imaging.kind === "inf" || !Number.isFinite(imaging.mag)
      ? "--"
      : `${fmtSigned(imaging.mag, 2)}x`;

  const generateReport = (): string => {
    if (isZh) {
      return (
        `薄透镜成像记录：f=${fmtSigned(focal, 1)}cm，g=${fmtSigned(gegenstand, 1)}cm，` +
        `判定=${kindLabel}，像距|b|=${bText}，横向放大率=${magText}。` +
        `满足 1/f=1/g+1/b。`
      );
    }
    return (
      `Duenne Linse: f=${fmtSigned(focal, 1)}cm, g=${fmtSigned(gegenstand, 1)}cm, ` +
      `Befund=${kindLabel}, |b|=${bText}, Massstab=${magText}. ` +
      `Es gilt 1/f=1/g+1/b.`
    );
  };

  const markInWorld = (cm: number): boolean => cm >= 0.2 && cm <= WORLD_CM - 0.2;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        {/* Stage */}
        <div
          className={`relative ${
            showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"
          } transition-all duration-200`}
        >
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            {/* Toolbar */}
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif font-medium text-xs text-[var(--ink)]">
                  {isZh ? "薄透镜成像 · 三条特殊光线" : "Duenne Sammellinse & Bildkonstruktion"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  f = {fmtSigned(focal, 1)} cm | g = {fmtSigned(gegenstand, 1)} cm | {kindLabel}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPanels(!showPanels)}
                  className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                  title={showPanels ? "Seitenleiste einklappen" : "Seitenleiste einblenden"}
                >
                  {showPanels
                    ? isZh
                      ? "◧ 折叠侧栏"
                      : "◧ Panel aus"
                    : isZh
                      ? "◩ 展开侧栏"
                      : "◩ Panel an"}
                </button>
              </div>
            </div>

            {/* SVG stage */}
            <div className="w-full h-[420px] sm:h-[480px]">
              <svg
                ref={svgRef}
                viewBox={`0 0 ${VB_W} ${VB_H}`}
                className="w-full h-full block select-none"
                role="img"
                aria-label={isZh ? "薄透镜成像光路图" : "Strahlengang an der duennen Linse"}
              >
                <defs>
                  <clipPath id="lens-stage-clip">
                    <rect x="8" y="8" width={VB_W - 16} height={VB_H - 16} />
                  </clipPath>
                </defs>

                {/* backdrop + axis */}
                <rect x="0" y="0" width={VB_W} height={VB_H} fill="var(--paper-subtle)" />
                {[40, 90, 140, 190, 320, 370].map((y) => (
                  <line key={y} x1="8" y1={y} x2={VB_W - 8} y2={y} stroke="var(--line)" strokeWidth="1" opacity="0.6" />
                ))}
                <line x1="8" y1={AXIS_Y} x2={VB_W - 8} y2={AXIS_Y} stroke="var(--ink)" strokeWidth="1.4" />
                <text x={VB_W - 14} y={AXIS_Y - 6} textAnchor="end" fontSize="10" fontFamily="monospace" fill="var(--ink-muted)">
                  {isZh ? "主光轴" : "opt. Achse"}
                </text>

                {/* 2F / F markers */}
                <g fontFamily="monospace" fontSize="10" fill="var(--ink-muted)">
                  {markInWorld(lensAt - focal) && (
                    <g>
                      <line x1={nearFpx} y1={AXIS_Y - 7} x2={nearFpx} y2={AXIS_Y + 7} stroke="var(--ink)" strokeWidth="1.4" />
                      <text x={nearFpx} y={AXIS_Y + 20} textAnchor="middle">F</text>
                    </g>
                  )}
                  {markInWorld(lensAt + focal) && (
                    <g>
                      <line x1={farFpx} y1={AXIS_Y - 7} x2={farFpx} y2={AXIS_Y + 7} stroke="var(--ink)" strokeWidth="1.4" />
                      <text x={farFpx} y={AXIS_Y + 20} textAnchor="middle">F&apos;</text>
                    </g>
                  )}
                  {markInWorld(lensAt - 2 * focal) && (
                    <g>
                      <line x1={X(lensAt - 2 * focal)} y1={AXIS_Y - 5} x2={X(lensAt - 2 * focal)} y2={AXIS_Y + 5} stroke="var(--ink-muted)" strokeWidth="1.2" />
                      <text x={X(lensAt - 2 * focal)} y={AXIS_Y + 20} textAnchor="middle">2F</text>
                    </g>
                  )}
                  {markInWorld(lensAt + 2 * focal) && (
                    <g>
                      <line x1={X(lensAt + 2 * focal)} y1={AXIS_Y - 5} x2={X(lensAt + 2 * focal)} y2={AXIS_Y + 5} stroke="var(--ink-muted)" strokeWidth="1.2" />
                      <text x={X(lensAt + 2 * focal)} y={AXIS_Y + 20} textAnchor="middle">2F&apos;</text>
                    </g>
                  )}
                </g>

                <g clipPath="url(#lens-stage-clip)">
                  {/* R1 parallel -> focal */}
                  {showR1 && (
                    <g>
                      <line x1={tipX} y1={tipY} x2={lensX} y2={tipY} stroke="#065f46" strokeWidth="2" strokeLinecap="round" />
                      <line
                        x1={lensX}
                        y1={tipY}
                        x2={isInf ? r1End.x : Math.min(r1End.x, imgTip ? imgTip.x : r1End.x)}
                        y2={isInf ? r1End.y : imgTip ? imgTip.y : r1End.y}
                        stroke="#065f46"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="7 4"
                        className="flow-ray"
                      />
                      {imaging.kind === "virtual" && imgTip && (
                        <line x1={lensX} y1={tipY} x2={imgTip.x} y2={imgTip.y} stroke="#065f46" strokeWidth="1.4" strokeDasharray="5 4" opacity="0.75" />
                      )}
                    </g>
                  )}
                  {/* R2 central straight */}
                  {showR2 && (
                    <g>
                      <line
                        x1={tipX}
                        y1={tipY}
                        x2={isInf ? r2End.x : imgTip ? imgTip.x : r2End.x}
                        y2={isInf ? r2End.y : imgTip ? imgTip.y : r2End.y}
                        stroke="#1e40af"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray={imaging.kind === "virtual" ? undefined : "7 4"}
                        className={imaging.kind === "virtual" ? undefined : "flow-ray"}
                      />
                      {imaging.kind === "virtual" && imgTip && (
                        <line x1={centerX} y1={centerY} x2={imgTip.x} y2={imgTip.y} stroke="#1e40af" strokeWidth="1.4" strokeDasharray="5 4" opacity="0.75" />
                      )}
                    </g>
                  )}
                  {/* R3 focal -> parallel */}
                  {showR3 && r3LensY !== null && (
                    <g>
                      <line x1={tipX} y1={tipY} x2={lensX} y2={r3LensY} stroke="#9f1239" strokeWidth="2" strokeLinecap="round" />
                      <line
                        x1={lensX}
                        y1={r3LensY}
                        x2={isInf ? XR : imgTip ? imgTip.x : XR}
                        y2={isInf ? r3LensY : imgTip ? imgTip.y : r3LensY}
                        stroke="#9f1239"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="7 4"
                        className="flow-ray"
                      />
                      {imaging.kind === "virtual" && imgTip && (
                        <line x1={lensX} y1={r3LensY} x2={imgTip.x} y2={imgTip.y} stroke="#9f1239" strokeWidth="1.4" strokeDasharray="5 4" opacity="0.75" />
                      )}
                    </g>
                  )}
                </g>

                {/* lens body */}
                <g
                  onPointerDown={handleLensDown}
                  onPointerMove={handleDragMove}
                  onPointerUp={handleDragUp}
                  onPointerCancel={handleDragUp}
                  style={{ touchAction: "none", cursor: "ew-resize" }}
                >
                  <rect x={lensX - 12} y={AXIS_Y - 150} width="24" height="220" fill="transparent" />
                  <line x1={lensX} y1={AXIS_Y - 140} x2={lensX} y2={AXIS_Y + 60} stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${lensX - 6} ${AXIS_Y - 140} L ${lensX} ${AXIS_Y - 152} L ${lensX + 6} ${AXIS_Y - 140} Z`} fill="var(--ink)" />
                  <path d={`M ${lensX - 6} ${AXIS_Y + 60} L ${lensX} ${AXIS_Y + 72} L ${lensX + 6} ${AXIS_Y + 60} Z`} fill="var(--ink)" />
                  <circle cx={lensX} cy={centerY} r="4" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.4" />
                  <text x={lensX} y={AXIS_Y + 92} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--ink-muted)">
                    {isZh ? "透镜(拖拽)" : "Linse (ziehen)"}
                  </text>
                </g>

                {/* object arrow (draggable) */}
                <g
                  onPointerDown={handleObjDown}
                  onPointerMove={handleDragMove}
                  onPointerUp={handleDragUp}
                  onPointerCancel={handleDragUp}
                  style={{ touchAction: "none", cursor: "grab" }}
                >
                  <rect x={tipX - 14} y={tipY - 16} width="28" height={AXIS_Y - tipY + 32} fill="transparent" />
                  <line x1={tipX} y1={AXIS_Y} x2={tipX} y2={tipY} stroke="#3f3f46" strokeWidth="2.4" strokeLinecap="round" />
                  <path d={`M ${tipX - 6} ${tipY + 10} L ${tipX} ${tipY} L ${tipX + 6} ${tipY + 10} Z`} fill="#3f3f46" />
                  <circle cx={tipX} cy={tipY} r="8" fill="var(--accent)" opacity="0.9" />
                  <circle cx={tipX} cy={tipY} r="8" fill="none" stroke="var(--surface)" strokeWidth="1.4" />
                  <text x={tipX} y={AXIS_Y + 36} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="var(--ink-muted)">
                    {isZh ? "物体(拖拽)" : "Objekt (ziehen)"}
                  </text>
                </g>

                {/* image arrow */}
                {!isInf && imgTip && imaging.kind === "real" && (
                  <g>
                    <line x1={imgTip.x} y1={AXIS_Y} x2={imgTip.x} y2={imgTip.y} stroke="#92400e" strokeWidth="2.4" strokeLinecap="round" />
                    <path d={`M ${imgTip.x - 6} ${imgTip.y - 10} L ${imgTip.x} ${imgTip.y} L ${imgTip.x + 6} ${imgTip.y - 10} Z`} fill="#92400e" />
                    <circle cx={imgTip.x} cy={imgTip.y} r="3.5" fill="#92400e" />
                    <text x={imgTip.x} y={AXIS_Y + 36} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#92400e">
                      {isZh ? "实像" : "Bild reell"}
                    </text>
                  </g>
                )}
                {!isInf && imgTip && imaging.kind === "virtual" && (
                  <g opacity="0.9">
                    <line x1={imgTip.x} y1={AXIS_Y} x2={imgTip.x} y2={imgTip.y} stroke="#92400e" strokeWidth="2" strokeDasharray="6 4" strokeLinecap="round" />
                    <path d={`M ${imgTip.x - 6} ${imgTip.y + 10} L ${imgTip.x} ${imgTip.y} L ${imgTip.x + 6} ${imgTip.y + 10} Z`} fill="none" stroke="#92400e" strokeWidth="1.4" />
                    <text x={imgTip.x} y={AXIS_Y + 36} textAnchor="middle" fontSize="10" fontFamily="monospace" fill="#92400e">
                      {isZh ? "虚像(同侧)" : "Bild virtuell"}
                    </text>
                  </g>
                )}
                {isInf && (
                  <text x={XR - 6} y={AXIS_Y - 90} textAnchor="end" fontSize="11" fontFamily="monospace" fill="var(--ink-muted)">
                    {isZh ? "出射光近似平行 · 像在无穷远" : "Strahlen fast parallel: Bild im Unendlichen"}
                  </text>
                )}

                {/* legend */}
                <g fontFamily="monospace" fontSize="10">
                  <line x1="16" y1="20" x2="40" y2="20" stroke="#065f46" strokeWidth="2.4" strokeLinecap="round" />
                  <text x="46" y="23" fill="var(--ink)">{isZh ? "平行→焦点" : "parallel zu F'"}</text>
                  <line x1="16" y1="36" x2="40" y2="36" stroke="#1e40af" strokeWidth="2.4" strokeLinecap="round" />
                  <text x="46" y="39" fill="var(--ink)">{isZh ? "过中心直进" : "durch Mitte"}</text>
                  <line x1="16" y1="52" x2="40" y2="52" stroke="#9f1239" strokeWidth="2.4" strokeLinecap="round" />
                  <text x="46" y="55" fill="var(--ink)">{isZh ? "过焦点→平行" : "durch F parallel"}</text>
                </g>
              </svg>
            </div>

            {/* readout bar */}
            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 font-mono">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)] flex items-center gap-1.5"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M 2.5 8 A 5.5 5.5 0 1 1 8 13.5" />
                    <path d="M 2.5 3.5 L 2.5 8 L 7 8" />
                  </svg>
                  {isZh ? "重置" : "Reset"}
                </button>
                <button
                  type="button"
                  onClick={jumpTo2F}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                  title={isZh ? "物距设为二倍焦距" : "g = 2f setzen"}
                >
                  {isZh ? "2F 快捷" : "2F-Shortcut"}
                </button>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--ink)]">
                <span>b = <strong className="text-[var(--accent)]">{bText}</strong></span>
                <span>B/G = <strong>{magText}</strong></span>
                <span className="px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">{kindLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control panel */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "物理参数调控" : "Physikalische Parameter"}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor={fSliderId}>{isZh ? "焦距 (f)" : "Brennweite (f)"}</label>
                  <span className="font-medium text-[var(--accent)]">{fmtSigned(focal, 1)} cm</span>
                </div>
                <input
                  id={fSliderId}
                  type="range"
                  min="4"
                  max="14"
                  step="0.5"
                  value={focal}
                  onChange={(e) => setFocal(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
                  <span>4 cm</span>
                  <span>14 cm</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor={gSliderId}>{isZh ? "物距 (g)" : "Gegenstandsweite (g)"}</label>
                  <span className="font-medium text-[var(--accent)]">{fmtSigned(gegenstand, 1)} cm</span>
                </div>
                <input
                  id={gSliderId}
                  type="range"
                  min="4.5"
                  max="32"
                  step="0.5"
                  value={gegenstand}
                  onChange={(e) => setGegenstand(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
                  <span>4.5 cm</span>
                  <span>32 cm</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px] mb-3">
                <button
                  type="button"
                  onClick={jumpTo2F}
                  className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] hover:bg-[var(--line)]"
                >
                  {isZh ? "g = 2f 等大" : "g = 2f (gleich)"}
                </button>
                <button
                  type="button"
                  onClick={jumpToF}
                  className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] hover:bg-[var(--line)]"
                >
                  {isZh ? "g = f 极限" : "g = f (Grenze)"}
                </button>
              </div>

              <div className="border-t border-[var(--line)] pt-2.5 flex flex-col gap-1.5 text-xs font-mono text-[var(--ink)]">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showR1} onChange={(e) => setShowR1(e.target.checked)} className="accent-[var(--accent)]" />
                  <span className="inline-block w-4 h-0.5" style={{ background: "#065f46" }} />
                  {isZh ? "平行光线" : "Parallelstrahl"}
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showR2} onChange={(e) => setShowR2(e.target.checked)} className="accent-[var(--accent)]" />
                  <span className="inline-block w-4 h-0.5" style={{ background: "#1e40af" }} />
                  {isZh ? "中心光线" : "Mittelpunktstrahl"}
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showR3} onChange={(e) => setShowR3(e.target.checked)} className="accent-[var(--accent)]" />
                  <span className="inline-block w-4 h-0.5" style={{ background: "#9f1239" }} />
                  {isZh ? "焦点光线" : "Brennpunktstrahl"}
                </label>
              </div>

              <p className="mt-2.5 text-[11px] font-mono text-[var(--ink-muted)] leading-relaxed">
                {isZh
                  ? "提示：直接拖拽透镜或物体（蓝色圆点），滑杆同步跟随。"
                  : "Tipp: Linse oder Objekt (blauer Punkt) direkt ziehen."}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom four-up bilingual scaffold */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel &amp; Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "薄透镜成像公式" : "Abbildungsgleichung"}
          </div>
          <div className="mb-1.5">
            <MathHtml code="\frac{1}{f} = \frac{1}{g} + \frac{1}{b}\quad,\quad \frac{B}{G} = \frac{b}{g}" display={true} cacheKey="OpticsLens:ThinLens" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "f 焦距、g 物距、b 像距；B 像高、G 物高。g 大于 f 得倒立实像，g 小于 f 得正立虚像。"
              : "f Brennweite, g Gegenstandsweite, b Bildweite; B Bildgroesse, G Gegenstandsgrösse. g groesser f: reelles Bild; g kleiner f: virtuelles Bild."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "会聚透镜成像" : "Bildentstehung an der Sammellinse"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">darstellen</code>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">berechnen</code>
            <p className="mt-1">
              {isZh
                ? "用三条特殊光线作图并计算像距与放大率，判断实像/虚像，讨论 g=2f 与 g=f 的特殊情况。"
                : "Konstruiere den Strahlengang mit den drei ausgezeichneten Strahlen, berechne Bildweite und Abbildungsmassstab und beurteile reell gegen virtuell (Sonderfaelle g=2f und g=f)."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "一倍分虚实，二倍分大小" : "Zwei Merkregeln"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "一倍焦距分虚实：F 以内是放大镜（正立虚像，同侧）；F 以外是投影仪/照相机（倒立实像，异侧）。二倍焦距分大小：2F 处等大，2F 外缩小，F 与 2F 之间放大。"
              : "Faustregel eins: f trennt virtuell (innen, Lupe) von reell (aussen). Faustregel zwei: 2f trennt verkleinert (aussen) von vergroessert (innen); bei g=2f ist das Bild gleich gross."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isZh ? "导出结论" : "Befunde exportieren"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh
                ? "把当前焦距、物距与成像判定传给 AI 助教，继续追问作图与计算。"
                : "Uebertrage die aktuellen Messwerte direkt in den KI-Tutor zur vertieften Analyse."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onExportFinding?.(generateReport())}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
              <path d="M 3 8 L 13 8" />
              <path d="M 9 4 L 13 8 L 9 12" />
            </svg>
            {isZh ? "发送给助教" : "An Tutor senden"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpticsLensSim;
