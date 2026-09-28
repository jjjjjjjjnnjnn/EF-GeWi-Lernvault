import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface DiffusionSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originLeft: boolean;
}

interface UiSnap {
  cL: number;
  cR: number;
  delta: number;
  flux: number;
  mixed: boolean;
}

const N = 110;
const HIST_MAX = 480;

function randDir(): { vx: number; vy: number } {
  const a = Math.random() * Math.PI * 2;
  return { vx: Math.cos(a), vy: Math.sin(a) };
}

/**
 * DiffusionSim: Zwei-Kammer-Teilchendiffusion durch eine Membranblende.
 * Rate ~ 1/sqrt(m), Antrieb ~ -Delta c (Fick, qualitativ), Tempo ~ sqrt(T).
 */
export function DiffusionSim({ lang, studioMode = true, onExportFinding }: DiffusionSimProps) {
  const [leftShare, setLeftShare] = useState<number>(80);
  const [temperature, setTemperature] = useState<number>(300);
  const [heavy, setHeavy] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);
  const [ui, setUi] = useState<UiSnap>({ cL: 80, cR: 20, delta: 60, flux: 0, mixed: false });

  const leftId = useId();
  const tempId = useId();
  const massId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curveRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const lastRef = useRef<number | null>(null);
  const gateDragRef = useRef<{ startX: number; startA: number } | null>(null);

  const physRef = useRef({
    particles: [] as Particle[],
    aperture: 1,
    playing: true,
    leftShare,
    temperature,
    mass: 1,
    hist: [] as { cl: number; cr: number }[],
    prevCl: 80,
    flux: 0,
    normW: 1,
    normH: 1,
  });

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  useEffect(() => {
    const p = physRef.current;
    p.leftShare = leftShare;
    p.temperature = temperature;
    p.mass = heavy ? 4 : 1;
    p.playing = isPlaying;
  }, [leftShare, temperature, heavy, isPlaying]);

  const seedParticles = (share: number) => {
    const p = physRef.current;
    const arr: Particle[] = [];
    const nLeft = Math.round((share / 100) * N);
    for (let i = 0; i < N; i++) {
      const left = i < nLeft;
      const d = randDir();
      arr.push({
        x: left ? 0.08 + Math.random() * 0.36 : 0.56 + Math.random() * 0.36,
        y: 0.08 + Math.random() * 0.84,
        vx: d.vx,
        vy: d.vy,
        originLeft: left,
      });
    }
    p.particles = arr;
    p.hist = [];
    p.prevCl = share;
    p.flux = 0;
    setUi({ cL: share, cR: 100 - share, delta: Math.abs(2 * share - 100), flux: 0, mixed: false });
  };

  useEffect(() => {
    seedParticles(leftShare);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const reseed = () => seedParticles(physRef.current.leftShare);

  const handleReset = () => {
    physRef.current.hist = [];
    physRef.current.flux = 0;
    physRef.current.prevCl = physRef.current.leftShare;
    reseed();
  };

  useEffect(() => {
    let animId = 0;

    const fitCanvas = (canvas: HTMLCanvasElement): { ctx: CanvasRenderingContext2D; w: number; h: number } | null => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const W = Math.max(1, Math.round(rect.width * dpr));
      const H = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w: rect.width, h: rect.height };
    };

    const drawStage = (w: number, h: number, ctx: CanvasRenderingContext2D) => {
      const p = physRef.current;
      ctx.clearRect(0, 0, w, h);
      const m = 14;
      const cx = w / 2;
      const gapH = p.aperture * h * 0.62;
      const cy = h / 2;

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2;
      ctx.strokeRect(m, m, w - 2 * m, h - 2 * m);

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(cx, m);
      ctx.lineTo(cx, cy - gapH / 2);
      ctx.moveTo(cx, cy + gapH / 2);
      ctx.lineTo(cx, h - m);
      ctx.stroke();

      ctx.fillStyle = "#3f3f46";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText("L", m + 16, m + 14);
      ctx.fillText("R", w - m - 16, m + 14);
      ctx.fillText(
        p.aperture < 0.03
          ? lang === "de"
            ? "Blende zu"
            : "隔板关闭"
          : lang === "de"
            ? `Blende ${(p.aperture * 100).toFixed(0)} %`
            : `隔板开度 ${(p.aperture * 100).toFixed(0)}%`,
        cx,
        h - m - 8
      );

      const hx = cx;
      const hy = cy + gapH / 2 + 12;
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(hx, Math.min(h - m - 26, Math.max(m + 26, hy)), 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(hx - 4, Math.min(h - m - 26, Math.max(m + 26, hy)));
      ctx.lineTo(hx + 4, Math.min(h - m - 26, Math.max(m + 26, hy)));
      ctx.stroke();

      for (let i = 0; i < p.particles.length; i++) {
        const pt = p.particles[i];
        const px = m + pt.x * (w - 2 * m);
        const py = m + pt.y * (h - 2 * m);
        ctx.fillStyle = pt.originLeft ? "#4338CA" : "#0e7490";
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const drawCurve = () => {
      const canvas = curveRef.current;
      if (!canvas) return;
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, w, h } = fit;
      const p = physRef.current;
      ctx.clearRect(0, 0, w, h);
      const L = 34;
      const R = 10;
      const T = 8;
      const B = 20;
      ctx.strokeStyle = "rgba(63,63,70,0.25)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g += 1) {
        const y = T + ((h - T - B) / 4) * g;
        ctx.beginPath();
        ctx.moveTo(L, y);
        ctx.lineTo(w - R, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(L, T - 2);
      ctx.lineTo(L, h - B);
      ctx.lineTo(w - 4, h - B);
      ctx.stroke();
      ctx.fillStyle = "#3f3f46";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.fillText("100", L - 4, T + 8);
      ctx.fillText("0", L - 4, h - B);
      ctx.textAlign = "left";
      ctx.fillText("t", w - 14, h - 6);

      const hist = p.hist;
      if (hist.length < 2) return;
      const px = (i: number) => L + (i / (HIST_MAX - 1)) * (w - L - R);
      const py = (v: number) => h - B - (v / 100) * (h - T - B);
      const line = (key: "cl" | "cr", color: string) => {
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < hist.length; i++) {
          const X = px(i + (HIST_MAX - hist.length));
          const Y = py(hist[i][key]);
          if (i === 0) ctx.moveTo(X, Y);
          else ctx.lineTo(X, Y);
        }
        ctx.stroke();
      };
      line("cl", "#4338CA");
      line("cr", "#0e7490");
    };

    const loop = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const p = physRef.current;

      const canvas = canvasRef.current;
      const fit = canvas ? fitCanvas(canvas) : null;

      if (p.playing && fit) {
        const speed = 1.6 * Math.sqrt(p.temperature / 300) / Math.sqrt(p.mass);
        const step = speed * dt * 60 * 0.012;
        const cy = 0.5;
        const gap = (p.aperture * 0.62) / 2;
        let nL = 0;
        for (let i = 0; i < p.particles.length; i++) {
          const pt = p.particles[i];
          let nx = pt.x + pt.vx * step;
          let ny = pt.y + pt.vy * step;
          if (ny < 0.03) {
            ny = 0.03;
            pt.vy = Math.abs(pt.vy);
          } else if (ny > 0.97) {
            ny = 0.97;
            pt.vy = -Math.abs(pt.vy);
          }
          if (nx < 0.03) {
            nx = 0.03;
            pt.vx = Math.abs(pt.vx);
          } else if (nx > 0.97) {
            nx = 0.97;
            pt.vx = -Math.abs(pt.vx);
          }
          const crossed = (pt.x - 0.5) * (nx - 0.5) < 0;
          if (crossed) {
            const open = p.aperture > 0.03 && Math.abs(ny - cy) < gap;
            if (!open) {
              nx = pt.x;
              pt.vx = -pt.vx;
            }
          }
          pt.x = nx;
          pt.y = ny;
          if (pt.x < 0.5) nL += 1;
        }
        const cl = (nL / p.particles.length) * 100;
        p.flux = p.flux * 0.9 + ((p.prevCl - cl) / Math.max(dt, 1e-3)) * 0.1;
        p.prevCl = cl;
        if (frameRef.current % 10 === 0) {
          p.hist.push({ cl, cr: 100 - cl });
          if (p.hist.length > HIST_MAX) p.hist.shift();
        }
        drawStage(fit.w, fit.h, fit.ctx);
      } else if (fit) {
        drawStage(fit.w, fit.h, fit.ctx);
      }
      drawCurve();

      frameRef.current += 1;
      if (frameRef.current % 6 === 0) {
        const last = p.hist.length > 0 ? p.hist[p.hist.length - 1] : null;
        const cl = last ? last.cl : p.prevCl;
        const cr = 100 - cl;
        setUi({
          cL: cl,
          cR: cr,
          delta: Math.abs(cl - cr),
          flux: p.flux,
          mixed: Math.abs(cl - 50) < 4,
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [lang]);

  const handleStageDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const bx = e.clientX - rect.left;
    if (Math.abs(bx - rect.width / 2) > 26) return;
    gateDragRef.current = { startX: e.clientX, startA: physRef.current.aperture };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleStageMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = gateDragRef.current;
    if (!d) return;
    const next = Math.max(0, Math.min(1, d.startA + (e.clientX - d.startX) / 220));
    physRef.current.aperture = Math.round(next * 100) / 100;
  };

  const handleStageUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!gateDragRef.current) return;
    gateDragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const setAperture = (v: number) => {
    physRef.current.aperture = Math.max(0, Math.min(1, v));
  };

  const massFactor = heavy ? 1 / Math.sqrt(4) : 1;
  const speedFactor = Math.sqrt(temperature / 300) * massFactor;

  const handleExport = () => {
    const text =
      lang === "de"
        ? `Diffusions-Befund: Start links ${leftShare} % / rechts ${(100 - leftShare).toFixed(0)} %; T = ${temperature} K; Teilchen ${heavy ? "schwer (m = 4u, v ~ 1/2)" : "leicht (m = 1u)"}; Blende offen. Messung: c_L = ${ui.cL.toFixed(1)} %, c_R = ${ui.cR.toFixed(1)} %, Delta c = ${ui.delta.toFixed(1)} %, Nettofluss J ~ ${Math.abs(ui.flux).toFixed(2)} %/s in Richtung des Gefaelles (J proportional -Delta c). Gleichgewicht bei c_L = c_R = 50 %.`
        : `扩散实验记录：初始左 ${leftShare}% / 右 ${(100 - leftShare).toFixed(0)}%；T = ${temperature} K；分子${heavy ? "重 (m = 4u，速率减半 v∝1/√m)" : "轻 (m = 1u)"}；隔板已打开。测量：c_左 = ${ui.cL.toFixed(1)}%，c_右 = ${ui.cR.toFixed(1)}%，浓度差 Δc = ${ui.delta.toFixed(1)}%，净通量 J ≈ ${Math.abs(ui.flux).toFixed(2)} %/s（沿浓度下降方向，J∝-Δc）。平衡时 c_左 = c_右 = 50%。`;
    if (onExportFinding) {
      onExportFinding(text);
    } else {
      void navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="space-y-4 leading-[1.4]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Diffusionslabor · Teilchen und Gradient" : "扩散实验室 · 粒子与浓度梯度"}
          </span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Konzentrationsausgleich: Fick-Fluss und Mischung" : "浓度趋衡：菲克通量与混合"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 3v10M11 3v10" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 3l8 5-8 5z" strokeLinejoin="round" />
              </svg>
            )}
            <span>{isPlaying ? (lang === "de" ? "Pause" : "暂停") : (lang === "de" ? "Start" : "开始")}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{lang === "de" ? "Reset" : "重置"}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
          >
            <span>{showPanels ? "◧" : "◩"}</span>
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : (lang === "de" ? "Ausklappen" : "展开面板")}</span>
          </button>
        </div>
      </div>

      <div className={`grid gap-5 ${showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        <div className={`flex flex-col space-y-3 ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="border border-[var(--line)] bg-[var(--paper)] rounded-[var(--radius)] overflow-hidden">
            <canvas
              ref={canvasRef}
              onPointerDown={handleStageDown}
              onPointerMove={handleStageMove}
              onPointerUp={handleStageUp}
              className="w-full h-[420px] sm:h-[480px] block cursor-ew-resize touch-none select-none"
            />
          </div>
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de"
              ? "Blende an der Mittelwand seitlich ziehen: Oeffnung regeln (Pointer-Capture)."
              : "横向拖拽中间隔板：调节开度（指针捕获）。"}
          </p>

          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="font-mono text-[11px] text-[var(--gray)] mb-2">
              {lang === "de" ? "Konzentration ueber Zeit: Ausgleich zu 50 % / 50 %" : "浓度-时间曲线：趋向 50% / 50% 平衡"}
            </div>
            <canvas ref={curveRef} className="w-full h-[140px] block touch-none select-none" />
            <div className="flex gap-4 mt-1.5 font-mono text-[11px]">
              <span className="text-[#4338CA]">— c_L</span>
              <span className="text-[#0e7490]">— c_R</span>
              <span className="text-[var(--gray)] tabular-nums">
                {lang === "de" ? "Delta c" : "浓度差"} = {ui.delta.toFixed(1)} %
              </span>
              <span className="text-[var(--gray)] tabular-nums">
                J ~ {Math.abs(ui.flux).toFixed(2)} %/s{ui.mixed ? (lang === "de" ? " · Gleichgewicht" : " · 已平衡") : ""}
              </span>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="border border-[var(--line)] bg-[var(--surface)] p-4 rounded-[var(--radius)] space-y-3.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                {lang === "de" ? "Gradient, Tempo und Masse" : "浓度差、温度与分子质量"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={leftId} className="text-[var(--gray)]">
                    {lang === "de" ? "Start links:" : "初始左室浓度:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{leftShare} %</span>
                </div>
                <input
                  id={leftId}
                  type="range"
                  min={50}
                  max={95}
                  step={5}
                  value={leftShare}
                  onChange={(e) => setLeftShare(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={tempId} className="text-[var(--gray)]">
                    {lang === "de" ? "Temperatur T:" : "温度 T:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{temperature} K</span>
                </div>
                <input
                  id={tempId}
                  type="range"
                  min={250}
                  max={450}
                  step={10}
                  value={temperature}
                  onChange={(e) => setTemperature(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <fieldset className="space-y-1.5" id={massId}>
                <legend className="font-mono text-xs text-[var(--gray)]">
                  {lang === "de" ? "Molekuelmasse m (v proportional 1/sqrt(m)):" : "分子质量 m（速率 v∝1/√m）:"}
                </legend>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setHeavy(false)}
                    className={`flex-1 px-2 py-1 font-mono text-[11px] rounded border ${!heavy ? "border-[var(--accent)] bg-[var(--accent)]/10 font-semibold text-[var(--ink)]" : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--accent)]"}`}
                  >
                    {lang === "de" ? "leicht m = 1u" : "轻分子 m = 1u"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeavy(true)}
                    className={`flex-1 px-2 py-1 font-mono text-[11px] rounded border ${heavy ? "border-[var(--accent)] bg-[var(--accent)]/10 font-semibold text-[var(--ink)]" : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--accent)]"}`}
                  >
                    {lang === "de" ? "schwer m = 4u" : "重分子 m = 4u"}
                  </button>
                </div>
              </fieldset>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setAperture(1)}
                  className="flex-1 px-2 py-1 font-mono text-[11px] rounded border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {lang === "de" ? "Blende auf" : "打开隔板"}
                </button>
                <button
                  type="button"
                  onClick={() => setAperture(0)}
                  className="flex-1 px-2 py-1 font-mono text-[11px] rounded border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {lang === "de" ? "Blende zu" : "关闭隔板"}
                </button>
              </div>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-1.5 font-mono text-xs">
              <div className="font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-1">
                {lang === "de" ? "Live-Messwerte" : "实时读数"}
              </div>
              <div className="flex justify-between">
                <span className="text-[#4338CA]">c_L:</span>
                <span className="font-bold tabular-nums">{ui.cL.toFixed(1)} %</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#0e7490]">c_R:</span>
                <span className="font-bold tabular-nums">{ui.cR.toFixed(1)} %</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Delta c:" : "浓度差:"}</span>
                <span className="font-bold tabular-nums">{ui.delta.toFixed(1)} %</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">J ~ -Delta c:</span>
                <span className="font-bold tabular-nums">{Math.abs(ui.flux).toFixed(2)} %/s</span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">{lang === "de" ? "Tempo sqrt(T/m):" : "速率因子 √(T/m):"}</span>
                <span className="font-bold tabular-nums">{speedFactor.toFixed(2)}x</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[var(--line)] pt-4">
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">01 · Formel</div>
          <MathHtml
            code="J = -D\,\frac{\Delta c}{\Delta x}, \quad D \propto \sqrt{T/m}, \quad \bar{v} \propto \sqrt{T/m}"
            display={true}
            cacheKey="diffusion:formel"
          />
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de" ? "Fluss folgt dem Gefaelle; Gleichgewicht bei Delta c = 0." : "通量沿浓度下降方向；Δc = 0 时平衡。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">02 · KLP / Operator</div>
          <p className="font-serif text-[13px] text-[var(--ink)]">
            {lang === "de"
              ? "NRW EF Waerme und Teilchen: Konzentrationsausgleich beschreiben und den Fick-Fluss mit Operator erlaeutern / begruenden."
              : "NRW EF 热与粒子：描述浓度趋衡，用 Operator 解释并论证菲克通量。"}
          </p>
          <p className="font-mono text-[11px] text-[var(--gray)]">Operatoren: beschreiben · erläutern</p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">03 · CN 方法</div>
          <p className="text-xs text-[var(--ink)]">
            {lang === "de"
              ? "先看浓度差定方向：通量永远从高浓度流向低浓度；升温只加快平衡，重分子减半速率；曲线收敛到 50/50 即动态平衡。"
              : "先看浓度差定方向：通量永远从高浓度流向低浓度；升温只加快平衡，重分子减半速率；曲线收敛到 50/50 即动态平衡。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">04 · Befund</div>
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de" ? "Messung mit Kennzahlen sichern." : "导出本次测量的关键数据。"}
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="w-full py-2 font-mono text-xs bg-[var(--surface)] border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-[var(--radius)] font-medium flex items-center justify-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "de" ? "Befund sichern" : "导出实验结论"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DiffusionSim;
