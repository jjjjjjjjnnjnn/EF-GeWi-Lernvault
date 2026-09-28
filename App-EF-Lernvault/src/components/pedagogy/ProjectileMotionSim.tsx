import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface ProjectileMotionSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface FlightState {
  inFlight: boolean;
  x: number;
  y: number;
  vx: number;
  vy: number;
  t: number;
  points: { x: number; y: number }[];
  maxHeight: number;
  range: number;
  landed: boolean;
}

interface Metrics {
  range: number;
  maxHeight: number;
  flightTime: number;
  hit: boolean;
  diff: number;
  flying: boolean;
}

const G = 9.81;
const K_QUAD = 0.0035;
const X_MAX = 48;
const Y_MAX = 26;
const HIT_TOL = 1.0;
const ML = 46;
const MR = 24;
const MB = 34;
const MT = 24;

function toCanvas(simX: number, simY: number, w: number, h: number): { cx: number; cy: number } {
  const sx = (w - ML - MR) / X_MAX;
  const sy = (h - MB - MT) / Y_MAX;
  return { cx: ML + simX * sx, cy: h - MB - simY * sy };
}

export function ProjectileMotionSim({ lang, studioMode = true, onExportFinding }: ProjectileMotionSimProps) {
  const [angleDeg, setAngleDeg] = useState<number>(45);
  const [v0, setV0] = useState<number>(18);
  const [h0, setH0] = useState<number>(0);
  const [dragOn, setDragOn] = useState<boolean>(false);
  const [targetDist, setTargetDist] = useState<number>(25);
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);
  const [metrics, setMetrics] = useState<Metrics>({
    range: 0,
    maxHeight: 0,
    flightTime: 0,
    hit: false,
    diff: 0,
    flying: false,
  });

  const angleId = useId();
  const v0Id = useId();
  const h0Id = useId();
  const targetId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paramsRef = useRef({ angleDeg: 45, v0: 18, h0: 0, dragOn: false, targetDist: 25 });
  const flightRef = useRef<FlightState>({
    inFlight: false,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    t: 0,
    points: [],
    maxHeight: 0,
    range: 0,
    landed: false,
  });
  const dragModeRef = useRef<"angle" | "target" | null>(null);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    paramsRef.current = { angleDeg, v0, h0, dragOn, targetDist };
  }, [angleDeg, v0, h0, dragOn, targetDist]);

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  const handleFire = () => {
    const p = paramsRef.current;
    const th = (p.angleDeg * Math.PI) / 180;
    flightRef.current = {
      inFlight: true,
      x: 0,
      y: p.h0,
      vx: p.v0 * Math.cos(th),
      vy: p.v0 * Math.sin(th),
      t: 0,
      points: [{ x: 0, y: p.h0 }],
      maxHeight: p.h0,
      range: 0,
      landed: false,
    };
    setMetrics({ range: 0, maxHeight: p.h0, flightTime: 0, hit: false, diff: Math.abs(p.targetDist), flying: true });
  };

  const handleClear = () => {
    flightRef.current = {
      inFlight: false,
      x: 0,
      y: paramsRef.current.h0,
      vx: 0,
      vy: 0,
      t: 0,
      points: [],
      maxHeight: 0,
      range: 0,
      landed: false,
    };
    setMetrics({ range: 0, maxHeight: 0, flightTime: 0, hit: false, diff: 0, flying: false });
  };

  useEffect(() => {
    let animId = 0;
    let last: number | null = null;

    const loop = (ts: number) => {
      if (last === null) last = ts;
      const dt = Math.min((ts - last) / 1000, 0.025);
      last = ts;
      frameRef.current += 1;

      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(loop);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animId = requestAnimationFrame(loop);
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const bw = Math.max(1, Math.round(rect.width * dpr));
      const bh = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;
      const p = paramsRef.current;
      const f = flightRef.current;

      if (f.inFlight) {
        const sub = 4;
        const sdt = dt / sub;
        for (let s = 0; s < sub; s++) {
          if (!f.inFlight) break;
          let ax = 0;
          let ay = -G;
          if (p.dragOn) {
            const v = Math.sqrt(f.vx * f.vx + f.vy * f.vy);
            ax += -K_QUAD * v * f.vx;
            ay += -K_QUAD * v * f.vy;
          }
          f.vx += ax * sdt;
          f.vy += ay * sdt;
          f.x += f.vx * sdt;
          f.y += f.vy * sdt;
          f.t += sdt;
          if (f.y > f.maxHeight) f.maxHeight = f.y;
          f.points.push({ x: f.x, y: Math.max(0, f.y) });
          if (f.points.length > 2400) f.points.splice(0, f.points.length - 2400);
          if (f.y <= 0) {
            f.y = 0;
            f.inFlight = false;
            f.landed = true;
            f.range = Math.max(0, f.x);
            const diff = Math.abs(f.range - p.targetDist);
            setMetrics({
              range: Number(f.range.toFixed(2)),
              maxHeight: Number(f.maxHeight.toFixed(2)),
              flightTime: Number(f.t.toFixed(2)),
              hit: diff <= HIT_TOL,
              diff: Number(diff.toFixed(2)),
              flying: false,
            });
            break;
          }
        }
        if (f.inFlight && frameRef.current % 6 === 0) {
          const diff = Math.abs(f.x - p.targetDist);
          setMetrics({
            range: Number(Math.max(0, f.x).toFixed(2)),
            maxHeight: Number(f.maxHeight.toFixed(2)),
            flightTime: Number(f.t.toFixed(2)),
            hit: false,
            diff: Number(diff.toFixed(2)),
            flying: true,
          });
        }
      }

      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(113,113,122,0.22)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(113,113,122,0.75)";
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      for (let xm = 10; xm <= 40; xm += 10) {
        const a = toCanvas(xm, 0, w, h);
        const b = toCanvas(xm, Y_MAX, w, h);
        ctx.beginPath();
        ctx.moveTo(a.cx, a.cy);
        ctx.lineTo(b.cx, b.cy);
        ctx.stroke();
        ctx.fillText(xm + " m", a.cx - 10, a.cy + 14);
      }
      for (let ym = 5; ym <= 25; ym += 5) {
        const a = toCanvas(0, ym, w, h);
        const b = toCanvas(X_MAX, ym, w, h);
        ctx.beginPath();
        ctx.moveTo(a.cx, a.cy);
        ctx.lineTo(b.cx, b.cy);
        ctx.stroke();
        ctx.fillText(ym + " m", 6, a.cy + 3);
      }

      const g0 = toCanvas(0, 0, w, h);
      const g1 = toCanvas(X_MAX, 0, w, h);
      ctx.strokeStyle = "#3F3F46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(g0.cx - 16, g0.cy);
      ctx.lineTo(g1.cx + 8, g1.cy);
      ctx.stroke();

      if (p.h0 > 0) {
        const base = toCanvas(0, 0, w, h);
        const top = toCanvas(0, p.h0, w, h);
        ctx.fillStyle = "rgba(113,113,122,0.20)";
        ctx.fillRect(base.cx - 14, top.cy, 28, base.cy - top.cy);
        ctx.strokeStyle = "#71717A";
        ctx.lineWidth = 1;
        ctx.strokeRect(base.cx - 14, top.cy, 28, base.cy - top.cy);
      }

      const tp = toCanvas(p.targetDist, 0, w, h);
      ctx.fillStyle = "#991B1B";
      ctx.fillRect(tp.cx - 11, tp.cy - 3, 22, 6);
      ctx.fillStyle = "#FAFAF7";
      ctx.fillRect(tp.cx - 5, tp.cy - 3, 10, 6);
      ctx.fillStyle = "#991B1B";
      ctx.fillRect(tp.cx - 1.5, tp.cy - 3, 3, 6);
      ctx.strokeStyle = "#991B1B";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(tp.cx, tp.cy - 3);
      ctx.lineTo(tp.cx, tp.cy - 26);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(tp.cx, tp.cy - 26);
      ctx.lineTo(tp.cx + 13, tp.cy - 20);
      ctx.lineTo(tp.cx, tp.cy - 14);
      ctx.closePath();
      ctx.fillStyle = "#991B1B";
      ctx.fill();

      if (f.points.length > 1) {
        ctx.strokeStyle = p.dragOn ? "#B45309" : "#1D4ED8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < f.points.length; i++) {
          const q = toCanvas(f.points[i].x, f.points[i].y, w, h);
          if (i === 0) ctx.moveTo(q.cx, q.cy);
          else ctx.lineTo(q.cx, q.cy);
        }
        ctx.stroke();
        const apexMark = toCanvas(f.points[Math.floor(f.points.length / 2)]?.x ?? 0, f.maxHeight, w, h);
        ctx.fillStyle = p.dragOn ? "#B45309" : "#1D4ED8";
        ctx.beginPath();
        ctx.arc(apexMark.cx, apexMark.cy, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.fillText("h_max=" + f.maxHeight.toFixed(1) + " m", apexMark.cx - 30, apexMark.cy - 9);
      }

      const th = (p.angleDeg * Math.PI) / 180;
      const pivot = toCanvas(0, p.h0, w, h);
      ctx.save();
      ctx.translate(pivot.cx, pivot.cy);
      ctx.rotate(-th);
      ctx.fillStyle = "#18181B";
      ctx.fillRect(0, -7, 34, 14);
      ctx.strokeStyle = "#52525B";
      ctx.lineWidth = 1;
      ctx.strokeRect(0, -7, 34, 14);
      ctx.restore();
      ctx.fillStyle = "#52525B";
      ctx.beginPath();
      ctx.arc(pivot.cx, pivot.cy, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#27272A";
      ctx.lineWidth = 2;
      ctx.stroke();

      if (f.inFlight) {
        const qp = toCanvas(f.x, f.y, w, h);
        ctx.fillStyle = "#18181B";
        ctx.beginPath();
        ctx.arc(qp.cx, qp.cy, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#047857";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(qp.cx, qp.cy);
        ctx.lineTo(qp.cx + f.vx * 1.4, qp.cy - f.vy * 1.4);
        ctx.stroke();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const simFromPx = (px: number, rectW: number): number => {
    const sx = (rectW - ML - MR) / X_MAX;
    return (px - ML) / sx;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const p = paramsRef.current;
    const pivot = toCanvas(0, p.h0, rect.width, rect.height);
    const tp = toCanvas(p.targetDist, 0, rect.width, rect.height);
    const dPivot = Math.hypot(px - pivot.cx, py - pivot.cy);
    if (dPivot < 44) {
      dragModeRef.current = "angle";
      e.currentTarget.setPointerCapture(e.pointerId);
    } else if (Math.abs(px - tp.cx) < 30 && py > rect.height - 110) {
      dragModeRef.current = "target";
      e.currentTarget.setPointerCapture(e.pointerId);
    } else {
      dragModeRef.current = null;
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const mode = dragModeRef.current;
    if (!mode) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    if (mode === "angle") {
      const p = paramsRef.current;
      const pivot = toCanvas(0, p.h0, rect.width, rect.height);
      const dx = px - pivot.cx;
      const dy = -(py - pivot.cy);
      let deg = (Math.atan2(dy, dx) * 180) / Math.PI;
      if (Number.isNaN(deg)) return;
      deg = Math.max(0, Math.min(90, Math.round(deg)));
      setAngleDeg(deg);
    } else {
      const simX = simFromPx(px, rect.width);
      setTargetDist(Math.max(5, Math.min(46, Math.round(simX))));
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragModeRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const handleExport = () => {
    const summary =
      lang === "de"
        ? "Wurf-Labor Messprotokoll:\n- Winkel: " +
          angleDeg +
          " deg, v0: " +
          v0 +
          " m/s, h0: " +
          h0 +
          " m\n- Luftwiderstand: " +
          (dragOn ? "quadratisch (k=0.0035 /m)" : "aus (Vakuum)") +
          "\n- Ziel: " +
          targetDist +
          " m, Reichweite: " +
          metrics.range +
          " m (Abweichung: " +
          metrics.diff +
          " m)\n- Scheitelhoehe: " +
          metrics.maxHeight +
          " m, Flugzeit: " +
          metrics.flightTime +
          " s\n- Trefferstatus: " +
          (metrics.hit ? "Volltreffer" : "Vorbei") +
          "."
        : "抛体实验测量记录：\n- 仰角：" +
          angleDeg +
          "°，初速 v0：" +
          v0 +
          " m/s，发射高度 h0：" +
          h0 +
          " m\n- 空气阻力：" +
          (dragOn ? "开启（二次阻力 k=0.0035 /m）" : "关闭（真空）") +
          "\n- 靶标距离：" +
          targetDist +
          " m，实测射程：" +
          metrics.range +
          " m（偏差：" +
          metrics.diff +
          " m）\n- 射高：" +
          metrics.maxHeight +
          " m，飞行时间：" +
          metrics.flightTime +
          " s\n- 命中判定：" +
          (metrics.hit ? "Volltreffer（命中）" : "未命中") +
          "。";
    if (onExportFinding) {
      onExportFinding(summary);
    } else {
      void navigator.clipboard.writeText(summary);
    }
  };

  const statusText =
    metrics.flying
      ? lang === "de"
        ? "Flug laeuft ..."
        : "飞行中 ..."
      : metrics.range > 0
        ? metrics.hit
          ? "Volltreffer"
          : lang === "de"
            ? "Vorbei"
            : "未命中"
        : lang === "de"
          ? "Bereit"
          : "就绪";

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Wurf-Labor Mechanik" : "抛体实验室 · 力学"}
          </span>
          <span className="font-mono text-xs text-[var(--gray)]">/</span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Schraeger Wurf: Reichweite, Scheitelhoehe, Flugzeit" : "斜抛运动：射程、射高与飞行时间"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] p-0.5 font-mono text-xs">
            <span className="px-1.5 text-[var(--gray)]">{lang === "de" ? "Winkel:" : "预设角度:"}</span>
            {[30, 45, 60, 75].map((deg) => (
              <button
                key={deg}
                type="button"
                onClick={() => setAngleDeg(deg)}
                className={
                  angleDeg === deg
                    ? "rounded bg-[var(--ink)] px-2 py-0.5 font-bold text-[var(--paper)]"
                    : "rounded px-2 py-0.5 text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                }
              >
                {deg}°
              </button>
            ))}
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

      <div className={"grid gap-5 " + (showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1")}>
        <div className={"flex flex-col space-y-3 " + (showPanels ? "lg:col-span-8" : "col-span-12")}>
          <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className="block h-[420px] w-full cursor-grab touch-none select-none active:cursor-grabbing sm:h-[480px]"
            />
            <div className="pointer-events-none absolute right-3 top-3 w-52 rounded border border-[var(--line)] bg-[var(--surface)] p-3 font-mono text-xs">
              <div className="text-[10px] uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Flugergebnis" : "落点判定"}
              </div>
              <div className="text-base font-bold text-[var(--ink)]">{statusText}</div>
              <div className="mt-1 space-y-0.5 text-[11px] text-[var(--gray)]">
                <div>
                  R = <span className="font-bold text-[var(--ink)]">{metrics.range.toFixed(2)} m</span>
                </div>
                <div>
                  h_max = <span className="font-bold text-[var(--ink)]">{metrics.maxHeight.toFixed(2)} m</span>
                </div>
                <div>
                  T = <span className="font-bold text-[var(--ink)]">{metrics.flightTime.toFixed(2)} s</span>
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute bottom-2 left-3 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
              {lang === "de"
                ? "Hinweis: Rohr zum Zielen ziehen, Zielmarke zum Verschieben ziehen"
                : "提示：拖炮管调仰角，拖靶标改距离"}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2.5">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleFire}
                className="flex items-center gap-1.5 rounded bg-[var(--ink)] px-5 py-1.5 font-mono text-xs font-bold uppercase text-[var(--paper)] hover:opacity-90 active:scale-95"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M4 2.5v11l9-5.5z" />
                </svg>
                {lang === "de" ? "Feuer" : "发射"}
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-1.5 rounded border border-[var(--line)] px-3 py-1 font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <path d="M2.5 8a5.5 5.5 0 1 1 1.6 3.9M2.5 8V4.5M2.5 8h3.5" />
                </svg>
                {lang === "de" ? "Zuruecksetzen" : "清除"}
              </button>
            </div>
            <label className="flex cursor-pointer items-center gap-1.5 font-mono text-xs text-[var(--gray)]">
              <input
                type="checkbox"
                checked={dragOn}
                onChange={(e) => setDragOn(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              <span>{lang === "de" ? "Quadratischer Luftwiderstand" : "二次空气阻力"}</span>
            </label>
          </div>
        </div>

        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Abschussparameter" : "发射参数"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={angleId} className="text-[var(--gray)]">
                    {lang === "de" ? "Winkel (Theta):" : "发射仰角 (θ):"}
                  </label>
                  <span className="font-bold text-[var(--ink)]">{angleDeg}°</span>
                </div>
                <input
                  id={angleId}
                  type="range"
                  min={0}
                  max={90}
                  step={1}
                  value={angleDeg}
                  onChange={(e) => setAngleDeg(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
                <span className="block font-mono text-[10px] text-[var(--gray)]">
                  {lang === "de" ? "Vakuum-Reichweitenmaximum bei 45 Grad." : "真空平抛：45° 射程最大。"}
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={v0Id} className="text-[var(--gray)]">
                    {lang === "de" ? "Anfangsgeschwindigkeit (v0):" : "初速度 (v0):"}
                  </label>
                  <span className="font-bold text-[var(--ink)]">{v0} m/s</span>
                </div>
                <input
                  id={v0Id}
                  type="range"
                  min={5}
                  max={28}
                  step={1}
                  value={v0}
                  onChange={(e) => setV0(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={h0Id} className="text-[var(--gray)]">
                    {lang === "de" ? "Starthoehe (h0):" : "发射高度 (h0):"}
                  </label>
                  <span className="font-bold text-[var(--ink)]">{h0} m</span>
                </div>
                <input
                  id={h0Id}
                  type="range"
                  min={0}
                  max={15}
                  step={1}
                  value={h0}
                  onChange={(e) => setH0(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
              <div className="space-y-1 border-t border-[var(--line)] pt-3">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={targetId} className="text-[var(--gray)]">
                    {lang === "de" ? "Zieldistanz:" : "靶标距离:"}
                  </label>
                  <span className="font-bold text-[var(--ink)]">{targetDist} m</span>
                </div>
                <input
                  id={targetId}
                  type="range"
                  min={5}
                  max={46}
                  step={1}
                  value={targetDist}
                  onChange={(e) => setTargetDist(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
            </div>

            <div className="space-y-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3.5 font-mono text-xs">
              <div className="border-b border-[var(--line)] pb-1 font-semibold text-[var(--ink)]">
                {lang === "de" ? "Messwerte (6-Frame-Abtastung):" : "测量读数（6 帧节流同步）:"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Reichweite R:" : "射程 R:"}</span>
                <span className="font-bold text-[var(--ink)]">{metrics.range.toFixed(2)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Scheitelhoehe h_max:" : "射高 h_max:"}</span>
                <span className="font-bold text-[var(--ink)]">{metrics.maxHeight.toFixed(2)} m</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Flugzeit T:" : "飞行时间 T:"}</span>
                <span className="font-bold text-[var(--ink)]">{metrics.flightTime.toFixed(2)} s</span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">{lang === "de" ? "Zielabweichung:" : "脱靶量:"}</span>
                <span className="font-bold text-[var(--ink)]">{metrics.diff.toFixed(2)} m</span>
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
            code="x(t)=v_0\cos\theta\cdot t,\quad y(t)=h_0+v_0\sin\theta\cdot t-\frac{1}{2}gt^2"
            display={true}
            cacheKey="projectile:vacuum-traj"
          />
          <MathHtml
            code="\ddot{x}=-k\,v\,v_x,\quad \ddot{y}=-g-k\,v\,v_y"
            display={true}
            cacheKey="projectile:quad-drag"
          />
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            02 · {lang === "de" ? "KLP / Operator" : "考纲 / Operator"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "NRW EF Mechanik: Wurfzerlegung. Operatoren: darstellen (Bahnkurve skizzieren), berechnen (R, h_max, T), beurteilen (Einfluss von k und h0)."
              : "NRW EF 力学：抛体分解。Operator：darstellen（描轨迹）、berechnen（求 R、h_max、T）、beurteilen（评价 k 与 h0 的影响）。"}
          </p>
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Satzbaustein: Die horizontale Bewegung ist kraeftefrei, die vertikale ist gleichmaessig beschleunigt."
              : "答题句式：水平方向不受力做匀速运动，竖直方向做匀加速运动。"}
          </p>
        </div>
        <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            03 · {lang === "de" ? "Verstehen (CN)" : "中文理解"}
          </div>
          <p className="text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Unabhaengigkeitsprinzip: x gleichfoermig, y beschleunigt. Mit Widerstand (k>0) werden Bahn und Reichweite kuerzer; hoehere Startlage h0 verlaengert die Flugzeit."
              : "运动独立性：水平匀速、竖直匀变速。开启二次阻力（k>0）后轨迹压低、射程缩短；抬高 h0 则延长飞行时间、增大射程。"}
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

export default ProjectileMotionSim;
