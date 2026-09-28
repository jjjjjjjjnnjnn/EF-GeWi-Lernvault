import { useRef, useEffect, useState, useCallback, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface WaveInterferenceLabSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

const INK_EMERALD = "#065f46";
const INK_BLUE = "#1e40af";
const INK_ROSE = "#9f1239";
const INK_ZINC = "#3f3f46";

function waveInkFor(lambdaNm: number): string {
  if (lambdaNm < 500) return INK_BLUE;
  if (lambdaNm <= 580) return INK_EMERALD;
  return INK_ROSE;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

interface Readout {
  theoryMm: number;
  measMm: number;
  devPct: number;
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3.2v9.6L12.2 8 5 3.2z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5.5 3.5v9M10.5 3.5v9" />
    </svg>
  );
}

function SlowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="8" cy="8" r="5.2" />
      <path d="M8 5.4V8l1.8 1.2" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.2 8a4.8 4.8 0 1 1 1.4 3.4" />
      <path d="M3.2 8.2V5.4h2.8" />
    </svg>
  );
}

export function WaveInterferenceLabSim({ lang, studioMode = true, onExportFinding }: WaveInterferenceLabSimProps) {
  const isZh = lang === "zh";

  const [lambdaNm, setLambdaNm] = useState<number>(532);
  const [slitMm, setSlitMm] = useState<number>(0.25);
  const [screenL, setScreenL] = useState<number>(1.0);
  const [slitDy, setSlitDy] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);
  const [showRings, setShowRings] = useState<boolean>(true);
  const [showCurve, setShowCurve] = useState<boolean>(true);
  const [readout, setReadout] = useState<Readout>({ theoryMm: 2.13, measMm: 2.13, devPct: 0 });

  const lambdaId = useId();
  const slitId = useId();
  const screenId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const simRef = useRef({ phase: 0, time: 0, frames: 0 });
  const dragRef = useRef<"screen" | "slits" | null>(null);
  const isZhRef = useRef(isZh);
  isZhRef.current = isZh;
  const paramsRef = useRef({ lambdaNm, slitMm, screenL, slitDy, paused, slowMo, showRings, showCurve });

  useEffect(() => {
    paramsRef.current = { lambdaNm, slitMm, screenL, slitDy, paused, slowMo, showRings, showCurve };
  });

  const handleReset = useCallback(() => {
    simRef.current = { phase: 0, time: 0, frames: 0 };
    setLambdaNm(532);
    setSlitMm(0.25);
    setScreenL(1.0);
    setSlitDy(0);
    setPaused(false);
    setSlowMo(false);
  }, []);

  const layoutOf = useCallback(
    (dispW: number, dispH: number) => {
      const barX = 108;
      const plotBottom = dispH - 44;
      const plotTop = 10;
      const centerY = plotTop + (plotBottom - plotTop) / 2;
      const slitC = centerY + slitDy;
      const normL = clamp((screenL - 0.5) / 1.5, 0, 1);
      const minSX = barX + 110;
      let maxSX = dispW - (showCurve ? 152 : 48);
      if (maxSX < minSX + 60) maxSX = minSX + 60;
      const screenX = minSX + normL * (maxSX - minSX);
      return { barX, plotTop, plotBottom, centerY, slitC, screenX, minSX, maxSX };
    },
    [screenL, slitDy, showCurve]
  );

  const canvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0, w: 1, h: 1 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width, h: rect.height };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const { x, y, w, h } = canvasPos(e);
    const L = layoutOf(w, h);
    if (Math.abs(x - L.screenX) < 18) {
      dragRef.current = "screen";
      e.currentTarget.style.cursor = "ew-resize";
    } else if (Math.abs(x - L.barX) < 22) {
      dragRef.current = "slits";
      setSlitDy(clamp(y - L.centerY, -80, 80));
      e.currentTarget.style.cursor = "ns-resize";
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const mode = dragRef.current;
    const { x, y, w, h } = canvasPos(e);
    if (mode === "screen") {
      const L = layoutOf(w, h);
      const norm = clamp((x - L.minSX) / Math.max(1, L.maxSX - L.minSX), 0, 1);
      setScreenL(Math.round((0.5 + norm * 1.5) * 20) / 20);
    } else if (mode === "slits") {
      const L = layoutOf(w, h);
      setSlitDy(clamp(y - L.centerY, -80, 80));
    } else {
      const L = layoutOf(w, h);
      if (Math.abs(x - L.screenX) < 18) e.currentTarget.style.cursor = "ew-resize";
      else if (Math.abs(x - L.barX) < 22) e.currentTarget.style.cursor = "ns-resize";
      else e.currentTarget.style.cursor = "default";
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragRef.current = null;
    e.currentTarget.style.cursor = "default";
  };

  useEffect(() => {
    let animId = 0;
    let lastTs = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dtRaw = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const P = paramsRef.current;
      const sim = simRef.current;

      if (!P.paused) {
        const speed = P.slowMo ? 22 : 92;
        sim.phase += dtRaw * speed;
        sim.time += dtRaw * (P.slowMo ? 0.25 : 1);
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const dispW = Math.max(1, Math.floor(rect.width));
      const dispH = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== Math.floor(dispW * dpr) || canvas.height !== Math.floor(dispH * dpr)) {
        canvas.width = Math.floor(dispW * dpr);
        canvas.height = Math.floor(dispH * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const waveInk = waveInkFor(P.lambdaNm);
      const normL = clamp((P.screenL - 0.5) / 1.5, 0, 1);
      const barX = 108;
      const plotTop = 10;
      const plotBottom = dispH - 44;
      const centerY = plotTop + (plotBottom - plotTop) / 2;
      const slitC = centerY + P.slitDy;
      const minSX = barX + 110;
      let maxSX = dispW - (P.showCurve ? 152 : 48);
      if (maxSX < minSX + 60) maxSX = minSX + 60;
      const screenX = minSX + normL * (maxSX - minSX);

      const sepPx = clamp(P.slitMm * 130, 14, 110);
      const s1 = slitC - sepPx / 2;
      const s2 = slitC + sepPx / 2;
      const lambdaPx = 12 + ((P.lambdaNm - 400) / 300) * 14;

      const theoryMm = ((P.screenL * P.lambdaNm) / Math.max(0.05, P.slitMm)) * 1e-3;
      const periodRaw = theoryMm * 20;
      const periodPx = clamp(periodRaw, 12, 160);

      ctx.fillStyle = "#FAFAF9";
      ctx.fillRect(0, 0, dispW, dispH);
      ctx.strokeStyle = "#E4E4E7";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let gx = 0; gx <= dispW; gx += 28) {
        ctx.moveTo(gx + 0.5, 0);
        ctx.lineTo(gx + 0.5, dispH);
      }
      for (let gy = 0; gy <= dispH; gy += 28) {
        ctx.moveTo(0, gy + 0.5);
        ctx.lineTo(dispW, gy + 0.5);
      }
      ctx.stroke();

      ctx.strokeStyle = "#A1A1AA";
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(barX, slitC);
      ctx.lineTo(screenX + 60, slitC);
      ctx.stroke();
      ctx.setLineDash([]);

      const srcX = 54;
      const range = barX - 10 - (srcX - 34);
      ctx.strokeStyle = waveInk;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.55;
      const off = sim.phase % lambdaPx;
      for (let k = 0; k * lambdaPx < range + lambdaPx; k++) {
        const lx = srcX - 34 + ((k * lambdaPx + off) % range);
        ctx.beginPath();
        ctx.moveTo(lx, plotTop);
        ctx.lineTo(lx, plotBottom);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = INK_ZINC;
      ctx.fillRect(srcX - 16, slitC - 20, 14, 40);
      ctx.fillStyle = waveInk;
      ctx.fillRect(srcX - 4, slitC - 6, 5, 12);
      ctx.fillStyle = INK_ZINC;
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText(isZhRef.current ? "激光" : "Laser", srcX - 18, plotTop + 12);

      if (P.showRings) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(barX + 7, plotTop, Math.max(1, screenX - barX - 8), plotBottom - plotTop);
        ctx.clip();
        const maxR = Math.hypot(screenX - barX + 60, plotBottom - plotTop);
        const r0 = sim.phase % lambdaPx;
        ctx.lineWidth = 1;
        for (const sy of [s1, s2]) {
          let rr = r0 < 2 ? r0 + lambdaPx : r0;
          for (; rr < maxR; rr += lambdaPx) {
            const fade = 1 - rr / maxR;
            ctx.globalAlpha = 0.12 + 0.4 * fade;
            ctx.strokeStyle = waveInk;
            ctx.beginPath();
            ctx.arc(barX, sy, rr, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
        ctx.restore();
        ctx.globalAlpha = 1;
      }

      ctx.fillStyle = INK_ZINC;
      ctx.fillRect(barX - 5, plotTop, 10, Math.max(0, s1 - 5 - plotTop));
      ctx.fillRect(barX - 5, s1 + 5, 10, Math.max(0, s2 - 5 - (s1 + 5)));
      ctx.fillRect(barX - 5, s2 + 5, 10, Math.max(0, plotBottom - (s2 + 5)));
      ctx.fillStyle = waveInk;
      ctx.fillRect(barX - 2, s1 - 4, 4, 8);
      ctx.fillRect(barX - 2, s2 - 4, 4, 8);
      ctx.fillStyle = INK_ZINC;
      ctx.fillText(isZhRef.current ? "双缝" : "Spalt", barX - 14, plotBottom + 14);

      const fringe = (y: number) => {
        const v = Math.cos((Math.PI * (y - slitC)) / periodPx);
        return v * v;
      };

      ctx.fillStyle = "#E4E4E7";
      ctx.fillRect(screenX, plotTop, 10, plotBottom - plotTop);
      ctx.strokeStyle = INK_ZINC;
      ctx.lineWidth = 1;
      ctx.strokeRect(screenX + 0.5, plotTop + 0.5, 9, plotBottom - plotTop - 1);
      for (let py = plotTop + 1; py < plotBottom; py += 2) {
        const iv = fringe(py);
        if (iv > 0.04) {
          ctx.globalAlpha = Math.min(1, iv);
          ctx.fillStyle = waveInk;
          ctx.fillRect(screenX + 2, py, 6, 2);
        }
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = INK_ZINC;
      ctx.fillText(isZhRef.current ? "光屏" : "Schirm", screenX - 8, plotTop - 2 + 10);

      if (P.showCurve) {
        const gx = screenX + 20;
        const gw = Math.min(118, dispW - gx - 12);
        if (gw > 30) {
          ctx.strokeStyle = "#A1A1AA";
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(gx, slitC);
          ctx.lineTo(gx + gw, slitC);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.strokeStyle = INK_BLUE;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          let first = true;
          for (let py = plotTop; py <= plotBottom; py += 2) {
            const cx = gx + fringe(py) * gw;
            if (first) {
              ctx.moveTo(cx, py);
              first = false;
            } else {
              ctx.lineTo(cx, py);
            }
          }
          ctx.stroke();
          ctx.lineWidth = 1;
          ctx.fillStyle = INK_BLUE;
          ctx.fillText("I(y)", gx + 4, plotTop + 12);
        }
      }

      const dimY = dispH - 16;
      ctx.strokeStyle = INK_ZINC;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(barX, plotBottom + 6);
      ctx.lineTo(barX, dimY);
      ctx.moveTo(screenX, plotBottom + 6);
      ctx.lineTo(screenX, dimY);
      ctx.moveTo(barX, dimY);
      ctx.lineTo(screenX, dimY);
      ctx.stroke();
      ctx.fillStyle = INK_ZINC;
      ctx.beginPath();
      ctx.moveTo(barX, dimY);
      ctx.lineTo(barX + 6, dimY - 3);
      ctx.lineTo(barX + 6, dimY + 3);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(screenX, dimY);
      ctx.lineTo(screenX - 6, dimY - 3);
      ctx.lineTo(screenX - 6, dimY + 3);
      ctx.closePath();
      ctx.fill();
      const dimText = `L = ${P.screenL.toFixed(2)} m`;
      ctx.font = "11px ui-monospace, monospace";
      const tw = ctx.measureText(dimText).width;
      const txx = (barX + screenX) / 2;
      ctx.fillStyle = "#FAFAF9";
      ctx.fillRect(txx - tw / 2 - 4, dimY - 8, tw + 8, 15);
      ctx.fillStyle = INK_BLUE;
      ctx.fillText(dimText, txx - tw / 2, dimY + 4);

      sim.frames += 1;
      if (sim.frames % 6 === 0) {
        const n = Math.floor(plotBottom - plotTop);
        const vals: number[] = new Array(n);
        for (let i = 0; i < n; i++) {
          const v = Math.cos((Math.PI * (plotTop + i - slitC)) / periodPx);
          vals[i] = v * v;
        }
        const peaks: number[] = [];
        for (let i = 1; i < n - 1; i++) {
          if (vals[i] >= vals[i - 1] && vals[i] > vals[i + 1] && vals[i] > 0.6) {
            const y = plotTop + i;
            if (Math.abs(y - slitC) < periodPx * 2.5) peaks.push(y);
          }
        }
        let measMm = theoryMm;
        if (peaks.length >= 2) {
          let sum = 0;
          for (let i = 1; i < peaks.length; i++) sum += peaks[i] - peaks[i - 1];
          const meanPx = sum / (peaks.length - 1);
          measMm = meanPx / 20;
        }
        const dev = theoryMm > 0 ? (Math.abs(measMm - theoryMm) / theoryMm) * 100 : 0;
        setReadout({
          theoryMm: Number(theoryMm.toFixed(3)),
          measMm: Number(measMm.toFixed(3)),
          devPct: Number(dev.toFixed(1)),
        });
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const generateReport = useCallback(() => {
    const header = isZh ? "双缝干涉测量记录" : "Doppelspalt-Messprotokoll";
    const body = isZh
      ? `波长 λ = ${lambdaNm} nm，缝距 d = ${slitMm.toFixed(2)} mm，屏距 L = ${screenL.toFixed(2)} m。理论条纹间距 Δy = Lλ/d = ${readout.theoryMm.toFixed(3)} mm；屏上曲线实测 ${readout.measMm.toFixed(3)} mm；偏差 ${readout.devPct.toFixed(1)}%。光强满足 I(y) ∝ cos²。`
      : `λ = ${lambdaNm} nm, d = ${slitMm.toFixed(2)} mm, L = ${screenL.toFixed(2)} m. Theorie Δy = Lλ/d = ${readout.theoryMm.toFixed(3)} mm; Kurvenmessung ${readout.measMm.toFixed(3)} mm; Abweichung ${readout.devPct.toFixed(1)} %. Intensität I(y) ∝ cos².`;
    return `${header}: ${body}`;
  }, [isZh, lambdaNm, slitMm, screenL, readout]);

  const waveInk = waveInkFor(lambdaNm);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-serif font-medium text-xs text-[var(--ink)]">
                  {isZh ? "Labor · 杨氏双缝干涉" : "Labor · Doppelspalt-Interferenz"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  {isZh
                    ? "圆形波前 1:1 演化，可拖动双缝与光屏 (Inspiriert von offenen Modellen der University of Colorado Boulder)"
                    : "Kreisförmige Wellenfronten 1:1, Spalt und Schirm per Drag verschiebbar (Inspiriert von offenen Modellen der University of Colorado Boulder)"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="font-mono tabular-nums text-[10px] text-[var(--ink-muted)] hidden sm:inline">
                  λ = {lambdaNm} nm | L = {screenL.toFixed(2)} m
                </span>
                <button
                  type="button"
                  onClick={() => setShowPanels(!showPanels)}
                  className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                  title={isZh ? "折叠或展开侧栏" : "Seitenleiste ein- oder ausklappen"}
                >
                  {showPanels ? "◧ 折叠侧栏" : "◩ 展开侧栏"}
                </button>
              </div>
            </div>

            <div className="w-full h-[420px] sm:h-[480px]">
              <canvas
                ref={canvasRef}
                className="w-full h-full block touch-none select-none"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
              />
            </div>

            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] font-medium text-[var(--ink)] flex items-center gap-1.5"
                >
                  {paused ? <PlayIcon /> : <PauseIcon />}
                  <span>{paused ? (isZh ? "继续" : "Start") : isZh ? "暂停" : "Pause"}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSlowMo(!slowMo)}
                  className={`px-2.5 py-1 border font-medium flex items-center gap-1.5 ${
                    slowMo
                      ? "border-[#1e40af] text-[#1e40af] bg-[var(--paper-subtle)]"
                      : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                  }`}
                >
                  <SlowIcon />
                  <span>0.25x {isZh ? "慢速" : "Slow"}</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)] flex items-center gap-1.5"
                >
                  <ResetIcon />
                  <span>{isZh ? "重置" : "Reset"}</span>
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-3 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>
                  Δy<sub>th</sub> = <strong className="text-[#1e40af]">{readout.theoryMm.toFixed(3)}</strong> mm
                </span>
                <span>
                  Δy<sub>meas</sub> = <strong className="text-[#065f46]">{readout.measMm.toFixed(3)}</strong> mm
                </span>
                <span>
                  {isZh ? "偏差" : "Abw."} = <strong className="text-[#9f1239]">{readout.devPct.toFixed(1)}</strong> %
                </span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "物理参数调控" : "Physikalische Parameter"}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <label htmlFor={lambdaId} className="text-[var(--ink)]">
                    {isZh ? "波长 (λ)" : "Wellenlänge (λ)"}
                  </label>
                  <span className="font-medium" style={{ color: waveInk }}>
                    {lambdaNm} nm
                  </span>
                </div>
                <input
                  id={lambdaId}
                  type="range"
                  min={400}
                  max={700}
                  step={5}
                  value={lambdaNm}
                  onChange={(e) => setLambdaNm(parseInt(e.target.value, 10))}
                  className="w-full accent-[#1e40af]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
                  <span>400</span>
                  <span>700 nm</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <label htmlFor={slitId} className="text-[var(--ink)]">
                    {isZh ? "缝距 (d)" : "Spaltabstand (d)"}
                  </label>
                  <span className="font-medium text-[#065f46]">{slitMm.toFixed(2)} mm</span>
                </div>
                <input
                  id={slitId}
                  type="range"
                  min={0.1}
                  max={0.8}
                  step={0.05}
                  value={slitMm}
                  onChange={(e) => setSlitMm(parseFloat(e.target.value))}
                  className="w-full accent-[#065f46]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
                  <span>0.10</span>
                  <span>0.80 mm</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <label htmlFor={screenId} className="text-[var(--ink)]">
                    {isZh ? "屏距 (L)" : "Schirmabstand (L)"}
                  </label>
                  <span className="font-medium text-[#1e40af]">{screenL.toFixed(2)} m</span>
                </div>
                <input
                  id={screenId}
                  type="range"
                  min={0.5}
                  max={2.0}
                  step={0.05}
                  value={screenL}
                  onChange={(e) => setScreenL(parseFloat(e.target.value))}
                  className="w-full accent-[#1e40af]"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
                  <span>0.50</span>
                  <span>2.00 m</span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 font-mono text-[11px]">
                <label className="flex items-center gap-2 text-[var(--ink)]">
                  <input type="checkbox" checked={showRings} onChange={(e) => setShowRings(e.target.checked)} className="accent-[#065f46]" />
                  {isZh ? "显示圆形波前" : "Wellenfronten zeigen"}
                </label>
                <label className="flex items-center gap-2 text-[var(--ink)]">
                  <input type="checkbox" checked={showCurve} onChange={(e) => setShowCurve(e.target.checked)} className="accent-[#1e40af]" />
                  {isZh ? "显示 I(y) 光强曲线" : "I(y)-Kurve zeigen"}
                </label>
              </div>

              <p className="mt-3 text-[11px] leading-relaxed font-mono text-[var(--ink-muted)]">
                {isZh
                  ? "画布内直接拖动：左右拖光屏改 L，上下拖双缝整体平移。"
                  : "Direkt im Bild ziehen: Schirm waagerecht (L), Doppelspalt senkrecht."}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isZh ? "测量读数" : "Messwerte"}
              </div>
              <div className="font-mono tabular-nums text-[11px] text-[var(--ink)] flex flex-col gap-1">
                <div className="flex justify-between">
                  <span>{isZh ? "理论 Δy = Lλ/d" : "Theorie Δy = Lλ/d"}</span>
                  <strong className="text-[#1e40af]">{readout.theoryMm.toFixed(3)} mm</strong>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "曲线实测 Δy" : "Kurvenmessung Δy"}</span>
                  <strong className="text-[#065f46]">{readout.measMm.toFixed(3)} mm</strong>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "相对偏差" : "Relative Abweichung"}</span>
                  <strong className="text-[#9f1239]">{readout.devPct.toFixed(1)} %</strong>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel und Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "杨氏双缝干涉" : "Doppelspalt-Interferenz nach Young"}
          </div>
          <div className="mb-1.5">
            <MathHtml code="\Delta y = \frac{L\,\lambda}{d}" display={true} cacheKey="wave-deltay" />
            <MathHtml code="I(y) = I_0\,\cos^2\!\left(\frac{\pi d\,y}{\lambda L}\right)" display={true} cacheKey="wave-intensity" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "两列相干波程差 δ = d·sinθ；亮纹条件 δ = kλ。屏上相邻亮纹间距 Δy = Lλ/d，光强包络为 cos²。"
              : "Gangunterschied δ = d·sinθ; Maxima bei δ = kλ. Streifenabstand Δy = Lλ/d, Einhüllende der Intensität cos²-förmig."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "波动光学：干涉与测量" : "Wellenoptik: Interferenz und Messung"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen</code>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">berechnen</code>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">beurteilen</code>
            <p className="mt-1">
              {isZh
                ? "EF 波动光学必考：由测得 Δy 反推 λ 或 d；论证 L 增大条纹变疏、d 增大条纹变密；评价测量误差来源。"
                : "EF-Wellenoptik: aus gemessenem Δy auf λ oder d schließen; begründen, warum größere L bzw. kleinere d breitere Streifen geben; Messfehler beurteilen."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "三字诀：屏远疏、缝宽密" : "Merkregel: fern-weit, eng-dicht"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "分子 Lλ 越大条纹越疏，分母 d 越大条纹越密。光强曲线数峰定间距：中央亮纹两侧第一暗纹之间最亮，实测峰距对比理论值即可验算。"
              : "Zähler Lλ groß heißt weite Streifen, Nenner d groß heißt dichte Streifen. Peakabstand der I(y)-Kurve ablesen und mit Lλ/d vergleichen."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isZh ? "导出测量结论" : "Befunde exportieren"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh ? "把当前 λ、d、L 与理论实测 Δy 对比送入 AI 助教深入分析。" : "Aktuelle λ-, d-, L-Werte samt Theorie-Mess-Vergleich an den KI-Tutor übergeben."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onExportFinding?.(generateReport())}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors"
          >
            {isZh ? "发送给助教" : "An Tutor senden"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default WaveInterferenceLabSim;
