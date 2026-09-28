import { useState, useEffect, useRef, useCallback, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface SchiefeEbeneSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

const G = 9.81;
const RAMP_LEN = 5.0;
const COL_LOCK = "#065f46";
const COL_SLIDE = "#9f1239";
const COL_INFO = "#1e40af";
const COL_VEC = "#3f3f46";

interface RampLayout {
  x0: number;
  groundY: number;
  x1: number;
  topY: number;
  ax: number;
  ay: number;
  bx: number;
  by: number;
  len: number;
}

function computeLayout(w: number, h: number, alphaDeg: number): RampLayout {
  const x0 = 44;
  const x1 = w - 44;
  const groundY = h - 64;
  const rad = (Math.max(0, Math.min(50, alphaDeg)) * Math.PI) / 180;
  const rawH = (x1 - x0) * Math.tan(rad);
  const maxH = groundY - 56;
  const rampH = Math.max(0, Math.min(rawH, maxH));
  const topY = groundY - rampH;
  const dx = x0 - x1;
  const dy = groundY - topY;
  const len = Math.max(1, Math.hypot(dx, dy));
  return { x0, groundY, x1, topY, ax: x1, ay: topY, bx: x0, by: groundY, len };
}

function blockCenter(layout: RampLayout, u: number): { x: number; y: number } {
  const c = Math.max(0, Math.min(1, u));
  return { x: layout.ax + (layout.bx - layout.ax) * c, y: layout.ay + (layout.by - layout.ay) * c };
}

function IconPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 2.8v10.4L12.5 8z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M5 3v10M11 3v10" />
    </svg>
  );
}

function IconReset() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2.8 8a5.2 5.2 0 1 1 1.5 3.7M2.8 8V4.5M2.8 8h3.5" />
    </svg>
  );
}

interface Readout {
  s: number;
  v: number;
  a: number;
}

function forces(alphaDeg: number, muS: number, muK: number, mass: number) {
  const rad = (alphaDeg * Math.PI) / 180;
  const fG = mass * G;
  const fH = fG * Math.sin(rad);
  const fN = fG * Math.cos(rad);
  const sliding = fH > muS * fN;
  const a = sliding ? G * (Math.sin(rad) - muK * Math.cos(rad)) : 0;
  const fR = sliding ? muK * fN : fH;
  const critS = (Math.atan(muS) * 180) / Math.PI;
  const critK = (Math.atan(muK) * 180) / Math.PI;
  return { fG, fH, fN, fR, a, sliding, critS, critK };
}

export function SchiefeEbeneSim({ lang, studioMode: _studioMode = true, onExportFinding }: SchiefeEbeneSimProps) {
  void _studioMode;
  const isZh = lang === "zh";
  const [alphaDeg, setAlphaDeg] = useState(20);
  const [muS, setMuS] = useState(0.4);
  const [muK, setMuK] = useState(0.3);
  const [mass, setMass] = useState(2.0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slowMo, setSlowMo] = useState(false);
  const [showPanels, setShowPanels] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [readout, setReadout] = useState<Readout>({ s: 0.75, v: 0, a: 0 });

  const alphaId = useId();
  const muSId = useId();
  const muKId = useId();
  const massId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const vtRef = useRef<HTMLCanvasElement | null>(null);
  const paramsRef = useRef({ alpha: 20, muS: 0.4, muK: 0.3, mass: 2.0, playing: true, slow: false, vectors: true });
  const physRef = useRef({
    s: 0.75,
    v: 0,
    a: 0,
    t: 0,
    frame: 0,
    sliding: false,
    hitBottom: false,
    dragMode: null as null | "block" | "angle",
    dragStartY: 0,
    dragStartAlpha: 20,
    blockX: 0,
    blockY: 0,
    hist: [] as number[],
  });

  useEffect(() => {
    paramsRef.current.alpha = alphaDeg;
    paramsRef.current.muS = muS;
    paramsRef.current.muK = muK;
    paramsRef.current.mass = mass;
    paramsRef.current.playing = isPlaying;
    paramsRef.current.slow = slowMo;
    paramsRef.current.vectors = showVectors;
  }, [alphaDeg, muS, muK, mass, isPlaying, slowMo, showVectors]);

  const handleReset = useCallback(() => {
    physRef.current.s = 0.15;
    physRef.current.v = 0;
    physRef.current.a = 0;
    physRef.current.t = 0;
    physRef.current.hitBottom = false;
    physRef.current.hist = [];
  }, []);

  const cssVar = useCallback((el: HTMLCanvasElement, name: string, fallback: string) => {
    try {
      const v = getComputedStyle(el).getPropertyValue(name).trim();
      return v || fallback;
    } catch {
      return fallback;
    }
  }, []);

  const fitCanvas = useCallback((canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const dw = Math.max(1, Math.floor(rect.width));
    const dh = Math.max(1, Math.floor(rect.height));
    if (canvas.width !== Math.floor(dw * dpr) || canvas.height !== Math.floor(dh * dpr)) {
      canvas.width = Math.floor(dw * dpr);
      canvas.height = Math.floor(dh * dpr);
    }
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    return { ctx, dw, dh };
  }, []);

  const drawArrow = useCallback((ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, dashed: boolean) => {
    if (Math.hypot(x2 - x1, y2 - y1) < 6) return;
    ctx.save();
    ctx.strokeStyle = COL_VEC;
    ctx.fillStyle = COL_VEC;
    ctx.lineWidth = 1.6;
    if (dashed) ctx.setLineDash([4, 3]);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.setLineDash([]);
    const ang = Math.atan2(y2 - y1, x2 - x1);
    const hs = 7;
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - hs * Math.cos(ang - 0.42), y2 - hs * Math.sin(ang - 0.42));
    ctx.lineTo(x2 - hs * Math.cos(ang + 0.42), y2 - hs * Math.sin(ang + 0.42));
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, []);

  useEffect(() => {
    let animId = 0;
    let lastTs = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dtRaw = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const prm = paramsRef.current;
      const p = physRef.current;
      const dt = prm.slow ? dtRaw * 0.3 : dtRaw;
      const rad = (prm.alpha * Math.PI) / 180;
      const sinA = Math.sin(rad);
      const cosA = Math.cos(rad);

      if (prm.playing && p.dragMode === null) {
        const fGs = prm.mass * G;
        const fHs = fGs * sinA;
        const fNs = fGs * cosA;
        if (Math.abs(p.v) < 0.005) {
          if (fHs > prm.muS * fNs) {
            p.a = G * (sinA - prm.muK * cosA);
            p.sliding = true;
            p.v += p.a * dt;
            p.s += p.v * dt;
          } else {
            p.a = 0;
            p.v = 0;
            p.sliding = false;
          }
        } else {
          p.a = G * sinA - Math.sign(p.v) * prm.muK * G * cosA;
          p.sliding = true;
          p.v += p.a * dt;
          if (p.v * (p.v - p.a * dt) <= 0 && fHs <= prm.muS * fNs) {
            p.v = 0;
            p.a = 0;
            p.sliding = false;
          } else {
            p.s += p.v * dt;
          }
        }
        p.t += dt;
        if (p.s >= RAMP_LEN) {
          p.s = RAMP_LEN;
          p.v = 0;
          p.a = 0;
          p.hitBottom = true;
        } else if (p.s < 0) {
          p.s = 0;
          p.v = 0;
          p.a = 0;
        } else if (p.s < RAMP_LEN - 0.05) {
          p.hitBottom = false;
        }
      } else if (p.dragMode !== null) {
        p.v = 0;
        p.a = 0;
      }

      p.frame += 1;
      const canvas = canvasRef.current;
      if (canvas) {
        const fitted = fitCanvas(canvas);
        const ctx = fitted.ctx;
        if (ctx) {
          const w = fitted.dw;
          const h = fitted.dh;
          const paper = cssVar(canvas, "--paper-subtle", "#F4F4F5");
          const surface = cssVar(canvas, "--surface", "#FFFFFF");
          const line = cssVar(canvas, "--line", "#E4E4E7");
          const ink = cssVar(canvas, "--ink", "#18181B");
          const gray = cssVar(canvas, "--gray", "#71717A");
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = paper;
          ctx.fillRect(0, 0, w, h);

          const L = computeLayout(w, h, prm.alpha);
          const u = Math.max(0, Math.min(1, p.s / RAMP_LEN));
          const bc = blockCenter(L, u);
          p.blockX = bc.x;
          p.blockY = bc.y;

          ctx.fillStyle = surface;
          ctx.strokeStyle = line;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(L.x0, L.groundY);
          ctx.lineTo(L.x1, L.groundY);
          ctx.lineTo(L.x1, L.topY);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();

          ctx.strokeStyle = ink;
          ctx.lineWidth = 1.6;
          ctx.beginPath();
          ctx.moveTo(L.x1, L.topY);
          ctx.lineTo(L.x0, L.groundY);
          ctx.stroke();

          ctx.strokeStyle = ink;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(16, L.groundY);
          ctx.lineTo(w - 12, L.groundY);
          ctx.stroke();
          ctx.strokeStyle = gray;
          ctx.lineWidth = 1;
          for (let x = 20; x < w - 14; x += 12) {
            ctx.beginPath();
            ctx.moveTo(x, L.groundY);
            ctx.lineTo(x - 5, L.groundY + 6);
            ctx.stroke();
          }

          ctx.fillStyle = gray;
          ctx.fillRect(L.x0 - 12, L.groundY - 26, 9, 26);

          if (prm.alpha > 2) {
            ctx.strokeStyle = COL_INFO;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.arc(L.x0, L.groundY, 42, -rad, 0, true);
            ctx.stroke();
            ctx.fillStyle = COL_INFO;
            ctx.font = "11px ui-monospace, Menlo, monospace";
            ctx.fillText("α=" + prm.alpha.toFixed(0) + "°", L.x0 + 48, L.groundY - 8);
          }

          const ux = (L.bx - L.ax) / L.len;
          const uy = (L.by - L.ay) / L.len;
          let nx = -uy;
          let ny = ux;
          if (ny > 0) {
            nx = -nx;
            ny = -ny;
          }
          const lift = 13;
          const cx = bc.x + nx * lift;
          const cy = bc.y + ny * lift;

          ctx.save();
          ctx.translate(cx, cy);
          ctx.rotate(-rad);
          ctx.fillStyle = surface;
          ctx.strokeStyle = ink;
          ctx.lineWidth = 1.6;
          const bw = 46;
          const bh = 30;
          ctx.fillRect(-bw / 2, -bh / 2, bw, bh);
          ctx.strokeRect(-bw / 2, -bh / 2, bw, bh);
          ctx.fillStyle = ink;
          ctx.font = "10px ui-monospace, Menlo, monospace";
          ctx.textAlign = "center";
          ctx.fillText(prm.mass.toFixed(1) + "kg", 0, 4);
          ctx.restore();
          ctx.textAlign = "left";

          if (prm.vectors) {
            const fGv = prm.mass * G;
            const fHv = fGv * sinA;
            const fNv = fGv * cosA;
            const fRv = p.sliding ? prm.muK * fNv : fHv;
            const maxF = Math.max(fGv, fHv, fNv, fRv, 1);
            const k = 78 / maxF;
            const lx = 12;
            ctx.font = "10px ui-monospace, Menlo, monospace";
            ctx.fillStyle = COL_VEC;
            drawArrow(ctx, cx, cy, cx, cy + fGv * k, true);
            ctx.fillText("F_G", cx + 6, cy + fGv * k + 2);
            drawArrow(ctx, cx, cy, cx + ux * fHv * k, cy + uy * fHv * k, false);
            ctx.fillText("F_H", cx + ux * fHv * k + 4, cy + uy * fHv * k - 6);
            drawArrow(ctx, cx, cy, cx + nx * fNv * k, cy + ny * fNv * k, false);
            ctx.fillText("F_N", cx + nx * fNv * k - 26, cy + ny * fNv * k - 4);
            drawArrow(ctx, cx, cy, cx - ux * fRv * k, cy - uy * fRv * k, false);
            ctx.fillText("F_R", cx - ux * fRv * k - 24, cy - uy * fRv * k + lx);
          }

          if (p.hitBottom) {
            ctx.fillStyle = surface;
            ctx.strokeStyle = line;
            ctx.lineWidth = 1;
            ctx.fillRect(L.x0 + 6, L.groundY - 52, 168, 22);
            ctx.strokeRect(L.x0 + 6, L.groundY - 52, 168, 22);
            ctx.fillStyle = ink;
            ctx.font = "10px ui-monospace, Menlo, monospace";
            ctx.fillText(isZhRef.current ? "已滑至底部挡板" : "Boden erreicht (Stopp)", L.x0 + 14, L.groundY - 37);
          }

          ctx.fillStyle = gray;
          ctx.font = "10px ui-monospace, Menlo, monospace";
          ctx.fillText(
            isZhRef.current ? "拖滑块改起点 · 拖空处改倾角" : "Block ziehen: Start · Fläche ziehen: α",
            14,
            18
          );
        }
      }

      const vt = vtRef.current;
      if (vt) {
        const fitted = fitCanvas(vt);
        const ctx = fitted.ctx;
        if (ctx) {
          const w = fitted.dw;
          const h = fitted.dh;
          const paper = cssVar(vt, "--surface", "#FFFFFF");
          const line = cssVar(vt, "--line", "#E4E4E7");
          const gray = cssVar(vt, "--gray", "#71717A");
          ctx.clearRect(0, 0, w, h);
          ctx.fillStyle = paper;
          ctx.fillRect(0, 0, w, h);
          ctx.strokeStyle = line;
          ctx.lineWidth = 1;
          for (let i = 1; i < 4; i++) {
            const y = (h / 4) * i;
            ctx.beginPath();
            ctx.moveTo(30, y);
            ctx.lineTo(w - 8, y);
            ctx.stroke();
          }
          ctx.strokeStyle = gray;
          ctx.beginPath();
          ctx.moveTo(30, 6);
          ctx.lineTo(30, h - 14);
          ctx.lineTo(w - 8, h - 14);
          ctx.stroke();
          const hist = p.hist;
          if (hist.length > 1) {
            const vmax = Math.max(2, ...hist);
            ctx.strokeStyle = COL_INFO;
            ctx.lineWidth = 1.6;
            ctx.beginPath();
            hist.forEach((vv, i) => {
              const x = 30 + (i / Math.max(1, HIST_MAX - 1)) * (w - 40);
              const y = h - 14 - (vv / vmax) * (h - 26);
              if (i === 0) ctx.moveTo(x, y);
              else ctx.lineTo(x, y);
            });
            ctx.stroke();
          }
          ctx.fillStyle = gray;
          ctx.font = "10px ui-monospace, Menlo, monospace";
          ctx.fillText("v-t", 6, 14);
        }
      }

      if (p.frame % 6 === 0) {
        if (p.dragMode === null) {
          p.hist.push(Math.max(0, p.v));
          if (p.hist.length > HIST_MAX) p.hist.shift();
        }
        const fLive = forces(prm.alpha, prm.muS, prm.muK, prm.mass);
        setReadout({
          s: Number(p.s.toFixed(2)),
          v: Number(p.v.toFixed(2)),
          a: Number((p.dragMode === null && fLive.sliding ? fLive.a : 0).toFixed(2)),
        });
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [cssVar, drawArrow, fitCanvas]);

  const isZhRef = useRef(isZh);
  useEffect(() => {
    isZhRef.current = isZh;
  }, [isZh]);

  const canvasPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top, w: rect.width, h: rect.height };
  };

  const handleCanvasDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const pos = canvasPos(e);
    if (!pos) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    const p = physRef.current;
    const dist = Math.hypot(pos.x - p.blockX, pos.y - p.blockY);
    if (dist < 38) {
      p.dragMode = "block";
    } else {
      p.dragMode = "angle";
      p.dragStartY = pos.y;
      p.dragStartAlpha = paramsRef.current.alpha;
    }
    p.v = 0;
  };

  const handleCanvasMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = physRef.current;
    if (p.dragMode === null) return;
    const pos = canvasPos(e);
    if (!pos) return;
    if (p.dragMode === "angle") {
      const next = p.dragStartAlpha + (p.dragStartY - pos.y) * 0.2;
      setAlphaDeg(Math.max(0, Math.min(50, Math.round(next))));
    } else {
      const L = computeLayout(pos.w, pos.h, paramsRef.current.alpha);
      const abx = L.bx - L.ax;
      const aby = L.by - L.ay;
      const len2 = Math.max(1, abx * abx + aby * aby);
      const tt = Math.max(0, Math.min(1, ((pos.x - L.ax) * abx + (pos.y - L.ay) * aby) / len2));
      p.s = tt * RAMP_LEN;
      p.v = 0;
      p.hitBottom = false;
    }
  };

  const handleCanvasUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    physRef.current.dragMode = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* noop */
    }
  };

  const live = forces(alphaDeg, muS, muK, mass);
  const liveTan = Math.tan((alphaDeg * Math.PI) / 180);
  const lampColor = live.sliding ? COL_SLIDE : COL_LOCK;

  const exportText = isZh
    ? "斜面实验记录：α=" + alphaDeg + "°，μs=" + muS.toFixed(2) + "，μk=" + muK.toFixed(2) + "，m=" + mass.toFixed(1) + "kg；F_H=" + live.fH.toFixed(2) + "N，F_N=" + live.fN.toFixed(2) + "N，F_R=" + live.fR.toFixed(2) + "N；临界角arctan(μs)=" + live.critS.toFixed(1) + "°，" + (live.sliding ? "tanα>μs，下滑，a=" + live.a.toFixed(2) + "m/s²，v=" + readout.v + "m/s。" : "tanα≤μs，自锁静止。")
    : "Schiefe-Ebene-Protokoll: α=" + alphaDeg + "°, μs=" + muS.toFixed(2) + ", μk=" + muK.toFixed(2) + ", m=" + mass.toFixed(1) + "kg; F_H=" + live.fH.toFixed(2) + "N, F_N=" + live.fN.toFixed(2) + "N, F_R=" + live.fR.toFixed(2) + "N; α_krit=arctan(μs)=" + live.critS.toFixed(1) + "°, " + (live.sliding ? "tanα>μs: Gleiten mit a=" + live.a.toFixed(2) + "m/s², v=" + readout.v + "m/s." : "tanα≤μs: Selbsthemmung (Haftung).");

  const handleExport = useCallback(() => {
    if (onExportFinding) {
      onExportFinding(exportText);
    } else {
      try {
        void navigator.clipboard?.writeText(exportText);
      } catch {
        /* noop */
      }
    }
  }, [onExportFinding, exportText]);

  return (
    <div className="w-full flex flex-col gap-4 leading-[1.4]">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={"relative " + (showPanels ? "col-span-12 lg:col-span-8" : "col-span-12")}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden rounded-[var(--radius)]">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-mono text-[10px] uppercase tracking-wider font-semibold" style={{ color: COL_INFO }}>
                  W1-B · Mechanik
                </span>
                <span className="font-serif font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "斜面动力学：下滑分力与摩擦阻力动态博弈" : "Schiefe Ebene: Hangabtrieb und Reibung"}
                </span>
                <span className="font-mono text-[10px] text-[var(--gray)] tabular-nums">
                  α={alphaDeg}° | μs={muS.toFixed(2)} μk={muK.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPanels((v) => !v)}
                  className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)] rounded-[var(--radius)]"
                  title={showPanels ? "Panel einklappen" : "Panel ausklappen"}
                >
                  {showPanels ? "◧ " + (isZh ? "折叠侧栏" : "Einklappen") : "◩ " + (isZh ? "展开侧栏" : "Ausklappen")}
                </button>
              </div>
            </div>

            <div className="w-full h-[420px] sm:h-[480px]">
              <canvas
                ref={canvasRef}
                className="w-full h-full block cursor-grab active:cursor-grabbing touch-none select-none"
                onPointerDown={handleCanvasDown}
                onPointerMove={handleCanvasMove}
                onPointerUp={handleCanvasUp}
                onPointerCancel={handleCanvasUp}
              />
            </div>

            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setIsPlaying((v) => !v)}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] font-medium text-[var(--ink)] rounded-[var(--radius)] flex items-center gap-1.5"
                >
                  {isPlaying ? <IconPause /> : <IconPlay />}
                  {isPlaying ? (isZh ? "暂停" : "Pause") : isZh ? "继续" : "Start"}
                </button>
                <button
                  type="button"
                  onClick={() => setSlowMo((v) => !v)}
                  className="px-2.5 py-1 border border-[var(--line)] font-medium rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                >
                  {slowMo ? "0.3x" : "1.0x"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)] rounded-[var(--radius)] flex items-center gap-1.5"
                >
                  <IconReset />
                  {isZh ? "重置" : "Reset"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowVectors((v) => !v)}
                  className="px-2 py-1 text-[11px] font-mono rounded-[var(--radius)] border border-[var(--line)] text-[var(--ink)]"
                >
                  {showVectors ? (isZh ? "矢量开" : "Vektoren an") : isZh ? "矢量关" : "Vektoren aus"}
                </button>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--ink)] tabular-nums">
                <span>
                  s=<strong>{readout.s.toFixed(2)}</strong>m
                </span>
                <span>
                  v=<strong>{readout.v.toFixed(2)}</strong>m/s
                </span>
                <span>
                  a=<strong>{readout.a.toFixed(2)}</strong>m/s²
                </span>
              </div>
            </div>
          </div>

          <div className="mt-2 px-3 py-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] flex items-center gap-2.5 text-xs">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: lampColor }}
              aria-hidden="true"
            />
            <span className="font-mono text-[11px] font-semibold tabular-nums" style={{ color: live.sliding ? COL_SLIDE : COL_LOCK }}>
              {live.sliding
                ? isZh
                  ? "滑块加速滑落！加速度 a = " + live.a.toFixed(2) + " m/s²"
                  : "Gleiten: tanα > μs, a = " + live.a.toFixed(2) + " m/s²"
                : isZh
                  ? "滑块静止（静摩擦阻力平衡下滑分力）"
                  : "Selbsthemmung: tanα ≤ μs, Haftung hält Hangabtrieb"}
            </span>
            <span className="font-mono text-[10px] text-[var(--gray)] tabular-nums ml-auto">
              αkrit,s={live.critS.toFixed(1)}° · αkrit,k={live.critK.toFixed(1)}°
            </span>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "物理参数调控" : "Physikalische Parameter"}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor={alphaId} className="text-[var(--ink)]">
                    {isZh ? "斜面倾角 α：" : "Neigungswinkel α:"}
                  </label>
                  <span className="font-medium tabular-nums" style={{ color: COL_INFO }}>
                    {alphaDeg}°
                  </span>
                </div>
                <input id={alphaId} type="range" min={0} max={50} step={1} value={alphaDeg} onChange={(e) => setAlphaDeg(parseInt(e.target.value, 10))} className="w-full accent-[#1e40af]" />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor={muSId} className="text-[var(--ink)]">
                    {isZh ? "静摩擦 μs" : "Haftreibung μs"}
                  </label>
                  <span className="font-medium tabular-nums" style={{ color: COL_INFO }}>
                    {muS.toFixed(2)}
                  </span>
                </div>
                <input
                  id={muSId}
                  type="range"
                  min={0}
                  max={0.8}
                  step={0.05}
                  value={muS}
                  onChange={(e) => {
                    const v = parseFloat(e.target.value);
                    setMuS(v);
                    if (muK > v) setMuK(v);
                  }}
                  className="w-full accent-[#1e40af]"
                />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor={muKId} className="text-[var(--ink)]">
                    {isZh ? "动摩擦 μk" : "Gleitreibung μk"}
                  </label>
                  <span className="font-medium tabular-nums" style={{ color: COL_INFO }}>
                    {muK.toFixed(2)}
                  </span>
                </div>
                <input
                  id={muKId}
                  type="range"
                  min={0}
                  max={0.8}
                  step={0.05}
                  value={muK}
                  onChange={(e) => setMuK(Math.min(muS, parseFloat(e.target.value)))}
                  className="w-full accent-[#1e40af]"
                />
              </div>
              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <label htmlFor={massId} className="text-[var(--ink)]">
                    {isZh ? "质量 m" : "Masse m"}
                  </label>
                  <span className="font-medium tabular-nums" style={{ color: COL_INFO }}>
                    {mass.toFixed(1)} kg
                  </span>
                </div>
                <input id={massId} type="range" min={0.5} max={5} step={0.5} value={mass} onChange={(e) => setMass(parseFloat(e.target.value))} className="w-full accent-[#1e40af]" />
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] font-mono text-[11px] tabular-nums">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isZh ? "受力分解读数" : "Kräftezerlegung"}
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[var(--gray)]">F_G = m·g</span>
                <strong className="text-[var(--ink)]">{live.fG.toFixed(2)} N</strong>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[var(--gray)]">F_H = m·g·sinα</span>
                <strong className="text-[var(--ink)]">{live.fH.toFixed(2)} N</strong>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[var(--gray)]">F_N = m·g·cosα</span>
                <strong className="text-[var(--ink)]">{live.fN.toFixed(2)} N</strong>
              </div>
              <div className="flex justify-between py-0.5">
                <span className="text-[var(--gray)]">F_R {live.sliding ? "(μk·F_N)" : "(=F_H)"}</span>
                <strong className="text-[var(--ink)]">{live.fR.toFixed(2)} N</strong>
              </div>
              <div className="flex justify-between py-0.5 border-t border-[var(--line)] mt-1 pt-1.5">
                <span className="text-[var(--gray)]">tanα ≷ μs</span>
                <strong style={{ color: lampColor }}>
                  {liveTan.toFixed(3)} ≷ {muS.toFixed(2)}
                </strong>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)] mb-1.5">
                {isZh ? "速度-时间曲线 v-t" : "Geschwindigkeit v-t"}
              </div>
              <div className="w-full h-24">
                <canvas ref={vtRef} className="w-full h-full block" />
              </div>
              <div className="font-mono text-[10px] text-[var(--gray)] mt-1 tabular-nums">
                {isZh ? "下滑积分：a=g(sinα−μk·cosα)，v 由 rAF 逐帧积分" : "Integration: a=g(sinα−μk·cosα), v per rAF integriert"}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">01 / Formel</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "受力分解与下滑加速度" : "Zerlegung und Gleitbeschleunigung"}</div>
          <MathHtml code="F_H = m g \sin\alpha, \quad F_N = m g \cos\alpha" display={true} cacheKey="w1b-schiefe-formel-zerlegung" />
          <MathHtml code="a = g(\sin\alpha - \mu_k\cos\alpha), \quad \tan\alpha_c = \mu_s" display={true} cacheKey="w1b-schiefe-formel-a" />
        </div>
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">02 / KLP · Operator</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "NRW 考纲 EF 力学" : "NRW KLP Physik EF · Mechanik"}</div>
          <div className="text-[var(--ink)] text-[11px]">
            <span className="font-mono text-[10px] bg-[var(--paper-subtle)] px-1 border border-[var(--line)]">darstellen</span>{" "}
            <span className="font-mono text-[10px] bg-[var(--paper-subtle)] px-1 border border-[var(--line)]">berechnen</span>{" "}
            <span className="font-mono text-[10px] bg-[var(--paper-subtle)] px-1 border border-[var(--line)]">beurteilen</span>
          </div>
          <p className="text-[var(--gray)] text-[11px] mt-1.5">
            {isZh
              ? "先画受力图并分解重力，再用 tanα≷μs 判断自锁或下滑，最后计算 a 与 v。注意质量 m 在加速度中消去。"
              : "Erst Kräfteplan und Zerlegung, dann tanα≷μs prüfen (Haftung/Gleiten), dann a und v berechnen. m kürzt sich in a heraus."}
          </p>
        </div>
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "影子法：重力的两道影子" : "Schatten-Trick: zwei Schatten von F_G"}</div>
          <p className="text-[var(--gray)] text-[11px]">
            {isZh
              ? "把重力想象成阳光，斜面是墙：沿坡的影子是下滑力 F_H，压进坡的影子是正压力 F_N。坡越陡，F_H 影子越长。起滑只看 tanα 是否超过 μs，与质量无关。"
              : "F_G wirft zwei Schatten: entlang der Ebene (F_H) und in die Ebene (F_N). Steiler heißt längerer F_H-Schatten. Gleiten hängt nur von tanα > μs ab, nie von m."}
          </p>
        </div>
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">04 / Export</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "导出实验结论" : "Befunde exportieren"}</div>
            <p className="text-[var(--gray)] text-[11px]">{isZh ? "把当前 α、μs、μk 与受力读数发给助教深入分析。" : "Aktuelle Messwerte an den Tutor zur Vertiefung senden."}</p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] rounded-[var(--radius)] text-[11px] font-medium font-mono"
          >
            {isZh ? "发送给助教 →" : "An Tutor senden →"}
          </button>
        </div>
      </div>
    </div>
  );
}

const HIST_MAX = 200;

export default SchiefeEbeneSim;
