import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

// Quasi-static optic bench: pure SVG, no Canvas (DPR-exempt).
// Drag uses useRef + rAF throttle: pointer events only write to a
// pending ref, one setState per frame max. No per-frame setState loop.

export interface OpticsRefractionSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

const N_AIR = 1.0;
const N_WATER = 1.33;
const N_GLASS = 1.5;
const N_FIBER = 1.46;

const TARGET_CRITICAL = 41.8;
const CHALLENGE_TOL = 0.8;
const ALPHA_MAX = 85;

const CX = 240;
const CY = 170;
const RAY = 140;
const VB_W = 480;
const VB_H = 340;

function clampAlpha(deg: number): number {
  if (Number.isNaN(deg)) return 0;
  return Math.max(0, Math.min(ALPHA_MAX, deg));
}

export function OpticsRefractionSim({ lang, studioMode = true, onExportFinding }: OpticsRefractionSimProps) {
  const [alphaDeg, setAlphaDeg] = useState<number>(45);
  const [n1, setN1] = useState<number>(N_GLASS);
  const [n2, setN2] = useState<number>(N_AIR);
  const [mode, setMode] = useState<"explore" | "challenge">("explore");
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);

  const alphaId = useId();
  const n1Id = useId();
  const n2Id = useId();

  const svgRef = useRef<SVGSVGElement | null>(null);
  const draggingRef = useRef<boolean>(false);
  const pendingRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scheduleAlpha = (deg: number) => {
    pendingRef.current = clampAlpha(Math.round(deg * 2) / 2);
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      const next = pendingRef.current;
      pendingRef.current = null;
      if (next !== null) setAlphaDeg(next);
    });
  };

  const svgPoint = (clientX: number, clientY: number): { x: number; y: number } | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) return null;
    return {
      x: ((clientX - rect.left) / rect.width) * VB_W,
      y: ((clientY - rect.top) / rect.height) * VB_H,
    };
  };

  const angleFromPoint = (x: number, y: number): number | null => {
    // Angle measured from the normal (Lot); incident side lives above interface.
    if (y >= CY) return null;
    const dx = CX - x;
    const dy = CY - y;
    if (dx < 0 || dy <= 0) return dx < 0 ? 0 : null;
    return (Math.atan2(dx, dy) * 180) / Math.PI;
  };

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    const p = svgPoint(e.clientX, e.clientY);
    if (!p) return;
    // Start drag from the laser handle or anywhere in the upper medium.
    const alphaRad = (alphaDeg * Math.PI) / 180;
    const hx = CX - RAY * Math.sin(alphaRad);
    const hy = CY - RAY * Math.cos(alphaRad);
    const nearHandle = Math.hypot(p.x - hx, p.y - hy) < 46;
    if (nearHandle || p.y < CY) {
      draggingRef.current = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      const deg = angleFromPoint(p.x, p.y);
      if (deg !== null) scheduleAlpha(deg);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!draggingRef.current) return;
    const p = svgPoint(e.clientX, e.clientY);
    if (!p) return;
    const deg = angleFromPoint(p.x, p.y);
    if (deg !== null) scheduleAlpha(deg);
  };

  const endDrag = (e: React.PointerEvent<SVGSVGElement>) => {
    draggingRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const alphaRad = (alphaDeg * Math.PI) / 180;
  const sinBeta = (n1 / n2) * Math.sin(alphaRad);
  const isTotalReflection = sinBeta > 1;
  const betaRad = isTotalReflection ? 0 : Math.asin(Math.min(1, sinBeta));
  const betaDeg = isTotalReflection ? 0 : (betaRad * 180) / Math.PI;

  const criticalAngleDeg = useMemo(() => {
    if (n1 <= n2) return null;
    return (Math.asin(n2 / n1) * 180) / Math.PI;
  }, [n1, n2]);

  const criticalRad = criticalAngleDeg !== null ? (criticalAngleDeg * Math.PI) / 180 : 0;
  const challengeSolved =
    mode === "challenge" && Math.abs(alphaDeg - TARGET_CRITICAL) < CHALLENGE_TOL;

  const incidentX = CX - RAY * Math.sin(alphaRad);
  const incidentY = CY - RAY * Math.cos(alphaRad);
  const reflectedX = CX + RAY * Math.sin(alphaRad);
  const reflectedY = CY - RAY * Math.cos(alphaRad);
  const refractedX = CX + RAY * Math.sin(betaRad);
  const refractedY = CY + RAY * Math.cos(betaRad);
  const critX = CX + 96 * Math.sin(criticalRad);
  const critY = CY - 96 * Math.cos(criticalRad);
  const speedRatio = n1 / n2;

  const applyPreset = (a: number, b: number) => {
    setN1(a);
    setN2(b);
  };

  const enterChallenge = () => {
    setMode("challenge");
    setN1(N_GLASS);
    setN2(N_AIR);
  };

  const handleExport = () => {
    const summary =
      lang === "de"
        ? "Optik-Protokoll (Snellius):\n- n1: " +
          n1.toFixed(2) +
          ", n2: " +
          n2.toFixed(2) +
          ", Einfallswinkel alpha: " +
          alphaDeg.toFixed(1) +
          " deg\n- Ergebnis: " +
          (isTotalReflection
            ? "Totalreflexion (kein gebrochener Strahl)"
            : "Brechungswinkel beta: " + betaDeg.toFixed(1) + " deg") +
          "\n- Grenzwinkel: " +
          (criticalAngleDeg !== null ? criticalAngleDeg.toFixed(1) + " deg" : "entfaellt (n1 <= n2)") +
          "\n- Lichtgeschwindigkeit: v1/v2 = n2/n1 = " +
          (n2 / n1).toFixed(3) +
          "."
        : "光学折射实验记录（Snellius）：\n- 介质1 n1：" +
          n1.toFixed(2) +
          "，介质2 n2：" +
          n2.toFixed(2) +
          "，入射角 alpha：" +
          alphaDeg.toFixed(1) +
          "°\n- 结果：" +
          (isTotalReflection ? "全反射（折射光消失）" : "折射角 beta：" + betaDeg.toFixed(1) + "°") +
          "\n- 临界角：" +
          (criticalAngleDeg !== null ? criticalAngleDeg.toFixed(1) + "°" : "不存在（n1 <= n2）") +
          "\n- 光速比：v1/v2 = n2/n1 = " +
          (n2 / n1).toFixed(3) +
          "。";
    if (onExportFinding) {
      onExportFinding(summary);
    } else {
      void navigator.clipboard.writeText(summary);
    }
  };

  const statusText = isTotalReflection
    ? lang === "de"
      ? "Totalreflexion"
      : "全反射"
    : lang === "de"
      ? "Gebrochen"
      : "折射";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Labor · Geometrische Optik" : "光学实验室 · 几何光学"}
          </span>
          <span className="font-mono text-xs text-[var(--gray)]">/</span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de"
              ? "Snellius-Brechung und Totalreflexion"
              : "斯涅尔折射定律与全反射"}
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] p-0.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setMode("explore")}
              className={
                mode === "explore"
                  ? "rounded bg-[var(--ink)] px-2 py-0.5 font-bold text-[var(--paper)]"
                  : "rounded px-2 py-0.5 text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
              }
            >
              {lang === "de" ? "Labor" : "自由实验"}
            </button>
            <button
              type="button"
              onClick={enterChallenge}
              className={
                mode === "challenge"
                  ? "rounded bg-[var(--accent)] px-2 py-0.5 font-bold text-white"
                  : "rounded px-2 py-0.5 text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
              }
            >
              {lang === "de" ? "Mission" : "挑战"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)]"
          >
            <span>{showPanels ? "◧" : "◩"}</span>
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : lang === "de" ? "Ausklappen" : "展开面板"}</span>
          </button>
        </div>
      </div>

      {mode === "challenge" && (
        <div
          className={
            "flex flex-wrap items-center justify-between gap-2 rounded-[var(--radius)] border border-[var(--line)] px-3 py-2 font-mono text-xs " +
            (challengeSolved
              ? "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-100"
              : "bg-[var(--surface)] text-[var(--ink)]")
          }
        >
          <span>
            {lang === "de"
              ? "Mission: Glas (n1=1.50) nach Luft (n2=1.00). Stelle alpha auf den Grenzwinkel 41.8 deg ein (Toleranz 0.8 deg)."
              : "挑战：玻璃 (n1=1.50) 到空气 (n2=1.00)，把入射角 alpha 调到临界角 41.8°（容差 0.8°）。"}
          </span>
          <span className="font-bold">
            {lang === "de" ? "Aktuell alpha = " : "当前 alpha = "}
            {alphaDeg.toFixed(1)}°
            {challengeSolved ? (lang === "de" ? " · Treffer" : " · 命中") : ""}
          </span>
        </div>
      )}

      <div className={"grid gap-5 " + (showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1")}>
        <div className={"flex flex-col space-y-3 " + (showPanels ? "lg:col-span-8" : "col-span-12")}>
          <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]">
            <svg
              ref={svgRef}
              viewBox={"0 0 " + VB_W + " " + VB_H}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="block h-[420px] w-full cursor-grab touch-none select-none active:cursor-grabbing sm:h-[480px]"
              role="img"
              aria-label={lang === "de" ? "Laser-Brechungsdiagramm" : "激光折射示意图"}
            >
              <rect x="24" y="30" width={VB_W - 48} height={CY - 30} fill="var(--paper-subtle)" fillOpacity="0.45" />
              <rect x="24" y={CY} width={VB_W - 48} height={VB_H - CY - 24} fill="var(--paper-subtle)" fillOpacity="0.9" />
              <text x="36" y="56" fill="var(--ink)" fontSize="11" fontFamily="monospace" fontWeight="bold">
                {"n1 = " + n1.toFixed(2)}
              </text>
              <text x="36" y={CY + 26} fill="var(--ink)" fontSize="11" fontFamily="monospace" fontWeight="bold">
                {"n2 = " + n2.toFixed(2)}
              </text>
              <line x1="24" y1={CY} x2={VB_W - 24} y2={CY} stroke="var(--ink)" strokeWidth="2" />
              <text x={VB_W - 30} y={CY - 8} textAnchor="end" fill="var(--gray)" fontSize="10" fontFamily="monospace">
                {lang === "de" ? "Grenzflaeche" : "分界面"}
              </text>
              <line x1={CX} y1="30" x2={CX} y2={VB_H - 24} stroke="var(--gray)" strokeWidth="1" strokeDasharray="5 4" opacity="0.8" />
              <text x={CX + 6} y="44" fill="var(--gray)" fontSize="10" fontFamily="monospace">
                Lot
              </text>

              {criticalAngleDeg !== null && (
                <g opacity="0.9">
                  <line x1={CX} y1={CY} x2={critX} y2={critY} stroke="var(--accent)" strokeWidth="1" strokeDasharray="3 3" />
                  <text x={critX + 6} y={critY + 4} fill="var(--accent)" fontSize="10" fontFamily="monospace">
                    {"c=" + criticalAngleDeg.toFixed(1) + " deg"}
                  </text>
                </g>
              )}

              {alphaDeg > 2 && (
                <path
                  d={
                    "M " + CX + " " + (CY - 34) + " A 34 34 0 0 0 " + (CX - 34 * Math.sin(alphaRad)) + " " + (CY - 34 * Math.cos(alphaRad))
                  }
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                />
              )}
              <text x={CX - 22} y={CY - 40} fill="var(--accent)" fontSize="11" fontFamily="monospace">
                a
              </text>

              <line x1={incidentX} y1={incidentY} x2={CX} y2={CY} stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
              <line
                x1={CX}
                y1={CY}
                x2={reflectedX}
                y2={reflectedY}
                stroke="#dc2626"
                strokeWidth={isTotalReflection ? 3 : 1.8}
                strokeOpacity={isTotalReflection ? 1 : 0.45}
                strokeLinecap="round"
                strokeDasharray={isTotalReflection ? undefined : "6 3"}
              />

              {!isTotalReflection && (
                <g>
                  {betaDeg > 2 && (
                    <path
                      d={
                        "M " + CX + " " + (CY + 34) + " A 34 34 0 0 1 " + (CX + 34 * Math.sin(betaRad)) + " " + (CY + 34 * Math.cos(betaRad))
                      }
                      fill="none"
                      stroke="#047857"
                      strokeWidth="1.5"
                    />
                  )}
                  <text x={CX + 14} y={CY + 48} fill="#047857" fontSize="11" fontFamily="monospace">
                    b
                  </text>
                  <line x1={CX} y1={CY} x2={refractedX} y2={refractedY} stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              )}

              <circle cx={CX} cy={CY} r="3.5" fill="var(--ink)" />
              <circle
                cx={incidentX}
                cy={incidentY}
                r="9"
                fill="#dc2626"
                fillOpacity="0.9"
                stroke="var(--paper)"
                strokeWidth="2"
              />
              <circle cx={incidentX} cy={incidentY} r="2.5" fill="var(--paper)" />
            </svg>

            <div className="pointer-events-none absolute right-3 top-3 w-56 rounded border border-[var(--line)] bg-[var(--surface)] p-3 font-mono text-xs">
              <div className="text-[10px] uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Messwerte (rAF-gedrosselt)" : "测量读数（rAF 节流）"}
              </div>
              <div className="text-base font-bold text-[var(--ink)]">{statusText}</div>
              <div className="mt-1 space-y-0.5 text-[11px] text-[var(--gray)]">
                <div>
                  alpha = <span className="font-bold text-[var(--ink)]">{alphaDeg.toFixed(1)} deg</span>
                </div>
                <div>
                  beta ={" "}
                  <span className="font-bold text-[var(--ink)]">
                    {isTotalReflection ? "--" : betaDeg.toFixed(1) + " deg"}
                  </span>
                </div>
                <div>
                  v1/v2 = <span className="font-bold text-[var(--ink)]">{speedRatio.toFixed(3)}</span>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-2 left-3 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
              {lang === "de"
                ? "Hinweis: roten Laserpunkt ziehen (Pointer-Capture, 0.5-deg-Raster)"
                : "提示：拖动红色激光头（指针捕获，0.5° 步长）"}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2.5 font-mono text-xs">
            <span className="mr-1 text-[var(--gray)]">{lang === "de" ? "Medien:" : "介质预设:"}</span>
            <button
              type="button"
              onClick={() => applyPreset(N_AIR, N_WATER)}
              className="rounded border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--ink)] hover:border-[var(--accent)]"
            >
              Luft-Wasser
            </button>
            <button
              type="button"
              onClick={() => applyPreset(N_AIR, N_GLASS)}
              className="rounded border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--ink)] hover:border-[var(--accent)]"
            >
              Luft-Glas
            </button>
            <button
              type="button"
              onClick={() => applyPreset(N_GLASS, N_AIR)}
              className="rounded border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--ink)] hover:border-[var(--accent)]"
            >
              Glas-Luft
            </button>
            <button
              type="button"
              onClick={() => applyPreset(N_FIBER, N_AIR)}
              className="rounded border border-[var(--line)] px-2 py-0.5 text-[11px] text-[var(--ink)] hover:border-[var(--accent)]"
            >
              Faser-Luft
            </button>
          </div>
        </div>

        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Strahlparameter" : "光路参数"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={alphaId} className="text-[var(--gray)]">
                    {lang === "de" ? "Einfallswinkel (alpha):" : "入射角 (alpha):"}
                  </label>
                  <span className="font-bold text-[var(--ink)]">{alphaDeg.toFixed(1)} deg</span>
                </div>
                <input
                  id={alphaId}
                  type="range"
                  min={0}
                  max={ALPHA_MAX}
                  step={0.5}
                  value={alphaDeg}
                  onChange={(e) => setAlphaDeg(clampAlpha(Number(e.target.value)))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
                <span className="block font-mono text-[10px] text-[var(--gray)]">
                  {lang === "de"
                    ? "Ziehen am Laser oder Schieber; Anzeige folgt mit einem Frame Versatz."
                    : "可拖激光头或滑杆；读数经单帧节流同步。"}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={n1Id} className="text-[var(--gray)]">
                    {lang === "de" ? "Brechzahl Medium 1 (n1):" : "介质1折射率 (n1):"}
                  </label>
                  <span className="font-bold text-[var(--ink)]">{n1.toFixed(2)}</span>
                </div>
                <input
                  id={n1Id}
                  type="range"
                  min={1}
                  max={2.42}
                  step={0.01}
                  value={n1}
                  onChange={(e) => setN1(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={n2Id} className="text-[var(--gray)]">
                    {lang === "de" ? "Brechzahl Medium 2 (n2):" : "介质2折射率 (n2):"}
                  </label>
                  <span className="font-bold text-[var(--ink)]">{n2.toFixed(2)}</span>
                </div>
                <input
                  id={n2Id}
                  type="range"
                  min={1}
                  max={2.42}
                  step={0.01}
                  value={n2}
                  onChange={(e) => setN2(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
            </div>

            <div className="space-y-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3.5 font-mono text-xs">
              <div className="border-b border-[var(--line)] pb-1 font-semibold text-[var(--ink)]">
                {lang === "de" ? "Bilanz:" : "光路结算:"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Brechungswinkel beta:" : "折射角 beta:"}</span>
                <span className="font-bold text-[var(--ink)]">
                  {isTotalReflection ? "--" : betaDeg.toFixed(1) + " deg"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Grenzwinkel:" : "临界角:"}</span>
                <span className="font-bold text-[var(--ink)]">
                  {criticalAngleDeg !== null ? criticalAngleDeg.toFixed(1) + " deg" : "--"}
                </span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">{lang === "de" ? "Geschwindigkeit v1/v2:" : "光速比 v1/v2:"}</span>
                <span className="font-bold text-[var(--ink)]">{speedRatio.toFixed(3)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            01 · {lang === "de" ? "Formel" : "公式"}
          </div>
          <MathHtml
            code="n_1\cdot\sin(\alpha)=n_2\cdot\sin(\beta)"
            display={true}
            cacheKey="optics:snellius"
          />
          <MathHtml
            code="\sin(\theta_c)=\frac{n_2}{n_1},\quad v=\frac{c}{n}"
            display={true}
            cacheKey="optics:critical-speed"
          />
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            02 · {lang === "de" ? "KLP / Operator" : "考纲 / Operator"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "NRW EF Optik: Brechung an der Grenzflaeche. Operatoren: darstellen (Strahlengang mit Lot skizzieren), berechnen (Beta und Grenzwinkel), beurteilen (Bedingung der Totalreflexion)."
              : "NRW EF 光学：分界面折射。Operator：darstellen（画带法线的光路）、berechnen（求 beta 与临界角）、beurteilen（判断全反射条件）。"}
          </p>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Satzbaustein: Der Vergleich von Einfalls- und Grenzwinkel entscheidet, ob Brechung oder Totalreflexion vorliegt."
              : "答题句式：比较入射角与临界角大小，判定发生折射还是全反射。"}
          </p>
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            03 · {lang === "de" ? "Verstehen (CN)" : "中文理解"}
          </div>
          <p className="text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Von duenn nach dicht bricht der Strahl zum Lot, umgekehrt vom Lot weg. Nur bei n1>n2 existiert ein Grenzwinkel; darueber bleibt alle Energie im oberen Medium. Die Brechzahl haengt schwach von der Farbe ab (Dispersion): blaues Licht wird staerker gebrochen, seine Geschwindigkeit v=c/n ist kleiner."
              : "光疏到光密向法线偏折，光密到光疏偏离法线。只有 n1>n2 才有临界角；超过临界角能量全部留在上层介质。折射率随颜色略有变化（色散）：蓝光偏折更大，在介质中的速度 v=c/n 更小。"}
          </p>
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            04 · {lang === "de" ? "Export" : "导出"}
          </div>
          <p className="mb-2 font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de" ? "Messung als Klausurbeleg sichern." : "将本次测量存为考试证据。"}
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--accent)] bg-[var(--surface)] py-2 font-mono text-xs font-medium uppercase text-[var(--accent)] hover:bg-[var(--accent)]/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" />
            </svg>
            {lang === "de" ? "Befund exportieren" : "导出结论"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpticsRefractionSim;
