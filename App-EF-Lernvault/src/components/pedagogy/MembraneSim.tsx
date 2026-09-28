import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface MembraneSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type Mode = "channel" | "pump";

interface Solute {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** 0 = aussen (oben), 1 = innen (unten) */
  side: 0 | 1;
  /** Kanal-/Pumpentransit 0..1, -1 = frei diffundierend */
  transit: number;
}

interface UiSnap {
  cOut: number;
  cIn: number;
  delta: number;
  rate: number;
  atp: number;
  saturated: boolean;
}

const N = 120;
const KM = 2.5; // mmol/L, Halbwert (carrier saturation)
const K_PER_TRANSPORTER = 5; // /s, single-carrier turnover scale
const VOL = 10; // arbitrary compartment volume for dc/dt scaling

function rand(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

/**
 * MembraneSim: Carrier-vermittelter Transport durch eine Phospholipid-Doppelschicht.
 * Kanal (erleichterte Diffusion, passiv, entlang Gradient) vs. ATP-Pumpe (aktiv,
 * gegen Gradient, 1 ATP je Solut). Rate folgt Saettigungskinetik v = Vmax*S/(Km+S).
 */
export function MembraneSim({ lang, studioMode = true, onExportFinding }: MembraneSimProps) {
  const [cOutInit, setCOutInit] = useState<number>(8);
  const [cInInit, setCInInit] = useState<number>(2);
  const [mode, setMode] = useState<Mode>("channel");
  const [transporters, setTransporters] = useState<number>(4);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);
  const [ui, setUi] = useState<UiSnap>({ cOut: 8, cIn: 2, delta: 6, rate: 0, atp: 0, saturated: false });

  const outId = useId();
  const inId = useId();
  const nId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curveRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const lastRef = useRef<number | null>(null);
  const dragRef = useRef<{ zone: "out" | "in"; startX: number; startC: number } | null>(null);

  const physRef = useRef({
    particles: [] as Solute[],
    cOut: 8,
    cIn: 2,
    total: 10,
    mode: "channel" as Mode,
    n: 4,
    playing: true,
    rate: 0,
    atp: 0,
    carry: 0,
  });

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  useEffect(() => {
    const p = physRef.current;
    p.mode = mode;
  }, [mode]);

  useEffect(() => {
    const p = physRef.current;
    p.n = transporters;
  }, [transporters]);

  useEffect(() => {
    physRef.current.playing = isPlaying;
  }, [isPlaying]);

  const seedParticles = (co: number, ci: number) => {
    const p = physRef.current;
    p.cOut = co;
    p.cIn = ci;
    p.total = co + ci;
    p.rate = 0;
    p.atp = 0;
    p.carry = 0;
    const arr: Solute[] = [];
    const fracOut = p.total > 0 ? co / p.total : 0.5;
    const nOut = Math.round(fracOut * N);
    for (let i = 0; i < N; i++) {
      const side = (i < nOut ? 0 : 1) as 0 | 1;
      arr.push({
        x: rand(0.06, 0.94),
        y: side === 0 ? rand(0.06, 0.34) : rand(0.62, 0.94),
        vx: rand(-1, 1),
        vy: rand(-1, 1),
        side,
        transit: -1,
      });
    }
    p.particles = arr;
    setUi({ cOut: co, cIn: ci, delta: co - ci, rate: 0, atp: 0, saturated: co >= 2 * KM });
  };

  useEffect(() => {
    seedParticles(cOutInit, cInInit);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReset = () => {
    const p = physRef.current;
    p.total = cOutInit + cInInit;
    p.cOut = cOutInit;
    p.cIn = cInInit;
    seedParticles(cOutInit, cInInit);
  };

  const applySlider = (which: "out" | "in", v: number) => {
    if (which === "out") {
      setCOutInit(v);
      const p = physRef.current;
      p.total = v + p.cIn;
      p.cOut = v;
      resyncCounts();
    } else {
      setCInInit(v);
      const p = physRef.current;
      p.total = p.cOut + v;
      p.cIn = v;
      resyncCounts();
    }
  };

  const resyncCounts = () => {
    const p = physRef.current;
    const fracOut = p.total > 0 ? p.cOut / p.total : 0.5;
    const nOut = Math.round(fracOut * N);
    let countOut = 0;
    for (let i = 0; i < p.particles.length; i++) {
      const pt = p.particles[i];
      if (pt.transit >= 0) continue;
      if (countOut < nOut && pt.side === 1 && Math.random() < 0.5) {
        pt.side = 0;
        pt.y = rand(0.06, 0.34);
        countOut += 1;
      } else if (pt.side === 0) {
        countOut += 1;
      }
    }
    // fix exact count
    let cur = p.particles.filter((q) => q.transit < 0 && q.side === 0).length;
    for (let i = 0; i < p.particles.length && cur !== nOut; i++) {
      const pt = p.particles[i];
      if (pt.transit >= 0) continue;
      if (cur < nOut && pt.side === 1) {
        pt.side = 0;
        pt.y = rand(0.06, 0.34);
        cur += 1;
      } else if (cur > nOut && pt.side === 0) {
        pt.side = 1;
        pt.y = rand(0.62, 0.94);
        cur -= 1;
      }
    }
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

    const drawBilayer = (ctx: CanvasRenderingContext2D, w: number, yTop: number, thick: number, n: number, seed: number) => {
      // two head rows + tail strokes, restrained technical line style
      const headR = 4.5;
      for (let i = 0; i < n; i++) {
        const x = 14 + ((w - 28) / Math.max(1, n - 1)) * i;
        if (Math.abs(x - w / 2) < 26) continue; // transporter gap
        const j = Math.sin(i * 12.9898 + seed) * 1.5;
        // outer heads
        ctx.fillStyle = "#52525b";
        ctx.beginPath();
        ctx.arc(x + j, yTop, headR, 0, Math.PI * 2);
        ctx.arc(x - j, yTop + thick, headR, 0, Math.PI * 2);
        ctx.fill();
        // tails
        ctx.strokeStyle = "rgba(82,82,91,0.55)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x + j - 2, yTop + headR);
        ctx.lineTo(x + j - 1, yTop + thick / 2 + 2);
        ctx.moveTo(x + j + 2, yTop + headR);
        ctx.lineTo(x + j + 3, yTop + thick / 2 + 2);
        ctx.moveTo(x - j - 2, yTop + thick - headR);
        ctx.lineTo(x - j - 1, yTop + thick / 2 - 2);
        ctx.moveTo(x - j + 2, yTop + thick - headR);
        ctx.lineTo(x - j + 3, yTop + thick / 2 - 2);
        ctx.stroke();
      }
    };

    const drawTransporter = (
      ctx: CanvasRenderingContext2D,
      cx: number,
      yTop: number,
      thick: number,
      m: Mode,
      t: number
    ) => {
      const open = m === "channel" ? 10 + Math.sin(t * 2.2) * 1.5 : 7;
      ctx.fillStyle = m === "channel" ? "#0e7490" : "#4338CA";
      ctx.strokeStyle = "#27272a";
      ctx.lineWidth = 1.5;
      // two barrel walls
      for (const s of [-1, 1]) {
        const x = cx + s * open;
        ctx.beginPath();
        ctx.rect(Math.min(x, cx + s * (open + 9)), yTop - 8, 9, thick + 16);
        ctx.fill();
        ctx.stroke();
      }
      // ATP badge for pump
      if (m === "pump") {
        ctx.fillStyle = "#4338CA";
        ctx.beginPath();
        ctx.arc(cx + 24, yTop + thick + 16, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fafafa";
        ctx.font = "7px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText("ATP", cx + 24, yTop + thick + 18.5);
      }
    };

    const drawStage = (w: number, h: number, ctx: CanvasRenderingContext2D, t: number) => {
      const p = physRef.current;
      ctx.clearRect(0, 0, w, h);
      const m = 14;
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(m, m, w - 2 * m, h - 2 * m);

      const yTop = h * 0.44;
      const thick = 34;
      const midY = yTop + thick / 2;

      // zone labels with live concentrations
      ctx.fillStyle = "#3f3f46";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(lang === "de" ? `AUSSEN c=${p.cOut.toFixed(1)}` : `膜外 c=${p.cOut.toFixed(1)}`, m + 8, m + 16);
      ctx.fillText(lang === "de" ? `INNEN c=${p.cIn.toFixed(1)}` : `膜内 c=${p.cIn.toFixed(1)}`, m + 8, h - m - 26);
      ctx.textAlign = "right";
      ctx.fillText(p.mode === "channel" ? (lang === "de" ? "Kanal · passiv" : "通道 · 被动") : "ATP-Pumpe · aktiv", w - m - 8, m + 16);

      // gradient arrow (passive direction)
      const grad = p.cOut - p.cIn;
      ctx.strokeStyle = "rgba(63,63,70,0.6)";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      if (Math.abs(grad) > 0.15) {
        const down = grad > 0;
        const x = w - m - 40;
        if (down) {
          ctx.moveTo(x, yTop - 44);
          ctx.lineTo(x, yTop - 12);
          ctx.moveTo(x - 4, yTop - 18);
          ctx.lineTo(x, yTop - 12);
          ctx.lineTo(x + 4, yTop - 18);
        } else {
          ctx.moveTo(x, midY + thick + 12);
          ctx.lineTo(x, midY + thick + 44);
          ctx.moveTo(x - 4, midY + thick + 38);
          ctx.lineTo(x, midY + thick + 44);
          ctx.lineTo(x + 4, midY + thick + 38);
        }
      }
      ctx.stroke();

      drawBilayer(ctx, w, yTop, thick, 30, 3.7);
      drawTransporter(ctx, w / 2, yTop, thick, p.mode, t);

      // solutes
      for (let i = 0; i < p.particles.length; i++) {
        const pt = p.particles[i];
        let px: number;
        let py: number;
        if (pt.transit >= 0) {
          px = w / 2 + (pt.x - 0.5) * 10;
          py = yTop - 10 + pt.transit * (thick + 20);
        } else {
          px = m + pt.x * (w - 2 * m);
          const top = pt.side === 0;
          const lo = top ? m + 24 : midY + thick / 2 + 12;
          const hi = top ? yTop - 14 : h - m - 40;
          const span = Math.max(1, hi - lo);
          py = lo + ((pt.y % 1 + 1) % 1) * span;
          void hi;
        }
        ctx.fillStyle = pt.side === 0 ? "#0e7490" : "#4338CA";
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // ATP counter + saturation flag
      ctx.fillStyle = "#3f3f46";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`ATP ${p.atp.toFixed(0)}`, m + 8, h - m - 10);
      ctx.textAlign = "right";
      ctx.fillText(
        `v=${p.rate.toFixed(2)}/s ${p.cOut >= 2 * KM || p.cIn >= 2 * KM ? (lang === "de" ? "· gesaettigt" : "· 已饱和") : ""}`,
        w - m - 8,
        h - m - 10
      );
    };

    const drawCurve = () => {
      const canvas = curveRef.current;
      if (!canvas) return;
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, w, h } = fit;
      const p = physRef.current;
      ctx.clearRect(0, 0, w, h);
      const L = 36;
      const R = 12;
      const T = 10;
      const B = 22;
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
      const vmax = K_PER_TRANSPORTER * p.n;
      ctx.fillText(vmax.toFixed(0), L - 4, T + 8);
      ctx.fillText("0", L - 4, h - B);
      ctx.textAlign = "center";
      ctx.fillText("S [mmol/L]", (L + w - R) / 2, h - 6);
      ctx.textAlign = "left";
      ctx.fillText("v", 4, T + 8);

      const SMAX = 10;
      const px = (s: number) => L + (s / SMAX) * (w - L - R);
      const py = (v: number) => h - B - (v / Math.max(0.01, vmax * 1.15)) * (h - T - B);
      // Vmax asymptote
      ctx.strokeStyle = "rgba(63,63,70,0.4)";
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(L, py(vmax));
      ctx.lineTo(w - R, py(vmax));
      ctx.stroke();
      ctx.setLineDash([]);
      // MM curve
      ctx.strokeStyle = p.mode === "channel" ? "#0e7490" : "#4338CA";
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let s = 0; s <= SMAX + 1e-6; s += 0.1) {
        const v = (vmax * s) / (KM + s);
        const X = px(s);
        const Y = py(v);
        if (s === 0) ctx.moveTo(X, Y);
        else ctx.lineTo(X, Y);
      }
      ctx.stroke();
      // operating point: donor substrate
      const sOp = p.mode === "channel" ? Math.max(p.cOut, p.cIn) : p.cOut;
      const vOp = (vmax * sOp) / (KM + sOp);
      ctx.fillStyle = "#27272a";
      ctx.beginPath();
      ctx.arc(px(sOp), py(vOp), 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3f3f46";
      ctx.textAlign = "left";
      ctx.fillText(`S=${sOp.toFixed(1)} v=${vOp.toFixed(2)}`, Math.min(px(sOp) + 7, w - 92), py(vOp) - 6);
    };

    const loop = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const p = physRef.current;
      const t = now / 1000;

      const canvas = canvasRef.current;
      const fit = canvas ? fitCanvas(canvas) : null;

      if (p.playing && fit) {
        const vmax = K_PER_TRANSPORTER * p.n;
        let v = 0;
        let dir = 0; // +1 out->in, -1 in->out
        if (p.mode === "channel") {
          // facilitated diffusion: only down gradient, MM-limited by donor side
          if (p.cOut > p.cIn + 1e-6) {
            v = (vmax * p.cOut) / (KM + p.cOut);
            dir = 1;
          } else if (p.cIn > p.cOut + 1e-6) {
            v = (vmax * p.cIn) / (KM + p.cIn);
            dir = -1;
          }
        } else {
          // ATP pump: out->in against or with gradient, costs 1 ATP per unit
          v = (vmax * p.cOut) / (KM + p.cOut);
          dir = p.cOut > 1e-6 ? 1 : 0;
          if (dir === 0) v = 0;
        }
        // low-pass rate display
        p.rate = p.rate * 0.92 + v * 0.08;
        const dc = (v * dt) / VOL;
        if (dir === 1) {
          const move = Math.min(dc, p.cOut);
          p.cOut -= move;
          p.cIn += move;
          if (p.mode === "pump") {
            p.atp += move * VOL; // count pumped solutes
            p.carry += move * VOL;
          } else {
            p.carry += 0;
          }
        } else if (dir === -1) {
          const move = Math.min(dc, p.cIn);
          p.cIn -= move;
          p.cOut += move;
        }

        // visual transit: launch particles matching flux
        const expected = v * dt * 2.2;
        let launched = 0;
        for (let i = 0; i < p.particles.length && launched < 4; i++) {
          const pt = p.particles[i];
          if (pt.transit >= 0) continue;
          const wantOut = dir === 1 && pt.side === 0;
          const wantIn = dir === -1 && pt.side === 1;
          if ((wantOut || wantIn) && Math.random() < expected / Math.max(1, N / 4)) {
            pt.transit = 0;
            launched += 1;
          }
        }
        // advance particles
        for (let i = 0; i < p.particles.length; i++) {
          const pt = p.particles[i];
          if (pt.transit >= 0) {
            pt.transit += dt * 1.6;
            if (pt.transit >= 1) {
              pt.transit = -1;
              if (dir === 1 && pt.side === 0) {
                pt.side = 1;
                pt.y = rand(0.62, 0.94);
              } else if (dir === -1 && pt.side === 1) {
                pt.side = 0;
                pt.y = rand(0.06, 0.34);
              }
              pt.x = rand(0.35, 0.65);
            }
            continue;
          }
          // Brownian jiggle in compartment
          pt.x += pt.vx * dt * 0.12;
          pt.y += pt.vy * dt * 0.12;
          if (pt.x < 0.03 || pt.x > 0.97) pt.vx = -pt.vx;
          if (pt.y < 0.02 || pt.y > 0.98) pt.vy = -pt.vy;
          pt.x = Math.max(0.02, Math.min(0.98, pt.x));
          pt.y = Math.max(0.02, Math.min(0.98, pt.y));
          if (Math.random() < dt * 0.6) {
            const a = Math.random() * Math.PI * 2;
            pt.vx = Math.cos(a);
            pt.vy = Math.sin(a);
          }
        }
        drawStage(fit.w, fit.h, fit.ctx, t);
      } else if (fit) {
        drawStage(fit.w, fit.h, fit.ctx, t);
      }
      drawCurve();

      frameRef.current += 1;
      if (frameRef.current % 8 === 0) {
        const sRef = p.mode === "channel" ? Math.max(p.cOut, p.cIn) : p.cOut;
        setUi({
          cOut: p.cOut,
          cIn: p.cIn,
          delta: p.cOut - p.cIn,
          rate: p.rate,
          atp: p.atp,
          saturated: sRef >= 2 * KM,
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [lang]);

  // drag concentration directly on stage: upper half = aussen, lower half = innen
  const zoneOf = (e: React.PointerEvent<HTMLCanvasElement>): "out" | "in" | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y < rect.height * 0.4) return "out";
    if (y > rect.height * 0.6) return "in";
    return null;
  };

  const handleStageDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const zone = zoneOf(e);
    if (!zone) return;
    const p = physRef.current;
    dragRef.current = { zone, startX: e.clientX, startC: zone === "out" ? p.cOut : p.cIn };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleStageMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const p = physRef.current;
    const next = Math.max(0, Math.min(10, d.startC + (e.clientX - d.startX) / 24));
    const r = Math.round(next * 10) / 10;
    if (d.zone === "out") {
      p.cOut = r;
      setCOutInit(r);
    } else {
      p.cIn = r;
      setCInInit(r);
    }
    p.total = p.cOut + p.cIn;
    resyncCounts();
  };

  const handleStageUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const vmax = K_PER_TRANSPORTER * transporters;

  const handleExport = () => {
    const text =
      lang === "de"
        ? `Membran-Befund (${mode === "channel" ? "Kanal, passiv" : "ATP-Pumpe, aktiv"}): c_aussen = ${ui.cOut.toFixed(2)} mmol/L, c_innen = ${ui.cIn.toFixed(2)} mmol/L, Delta c = ${ui.delta.toFixed(2)} mmol/L; n = ${transporters}, Vmax = ${vmax.toFixed(1)}/s, Km = ${KM} mmol/L, v = Vmax*S/(Km+S) = ${ui.rate.toFixed(2)}/s${ui.saturated ? " (gesaettigt)" : ""}; ATP verbraucht = ${ui.atp.toFixed(0)}. ${mode === "channel" ? "Kanal transportiert nur entlang des Gradienten bis Delta c = 0." : "Pumpe transportiert gegen den Gradienten (1 ATP je Solut)."}`
        : `膜转运实验记录（${mode === "channel" ? "通道蛋白·被动协助扩散" : "ATP 泵·主动逆梯度"}）：膜外 c = ${ui.cOut.toFixed(2)} mmol/L，膜内 c = ${ui.cIn.toFixed(2)} mmol/L，浓度差 Δc = ${ui.delta.toFixed(2)} mmol/L；转运体 n = ${transporters}，Vmax = ${vmax.toFixed(1)}/s，Km = ${KM} mmol/L，v = Vmax·S/(Km+S) = ${ui.rate.toFixed(2)}/s${ui.saturated ?"（已饱和）" : ""}；ATP 累计消耗 ${ui.atp.toFixed(0)}。${mode === "channel" ? "通道只能顺梯度转运，Δc = 0 时停止。" : "泵可逆梯度转运，每个溶质消耗 1 ATP。"}`;
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
            {lang === "de" ? "Membranlabor · Transport und Sättigung" : "膜转运实验室 · 通道与泵"}
          </span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Carrier-Transport: Kanal gegen Pumpe, ATP-Kosten" : "载体转运：通道协助扩散 vs ATP 泵主动转运"}
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
              ? "Oben/unten seitlich ziehen: c_aussen / c_innen regeln (Pointer-Capture). Mitte = Doppelschicht + Transporter."
              : "在上半区/下半区横向拖拽：调节膜外 / 膜内浓度（指针捕获）。中部为磷脂双层与转运体。"}
          </p>

          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="font-mono text-[11px] text-[var(--gray)] mb-2">
              {lang === "de" ? "Rate gegen Substrat: Saettigungskinetik v = Vmax·S/(Km+S)" : "速率-浓度曲线：饱和动力学 v = Vmax·S/(Km+S)"}
            </div>
            <canvas ref={curveRef} className="w-full h-[140px] block touch-none select-none" />
            <div className="flex flex-wrap gap-4 mt-1.5 font-mono text-[11px]">
              <span className="text-[var(--gray)] tabular-nums">
                Vmax = {vmax.toFixed(1)}/s · Km = {KM.toFixed(1)}
              </span>
              <span className="text-[var(--gray)] tabular-nums">v = {ui.rate.toFixed(2)}/s</span>
              <span className="text-[var(--gray)] tabular-nums">
                ATP = {ui.atp.toFixed(0)}
                {ui.saturated ? (lang === "de" ? " · gesaettigt" : " · 已饱和") : ""}
              </span>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="border border-[var(--line)] bg-[var(--surface)] p-4 rounded-[var(--radius)] space-y-3.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                {lang === "de" ? "Gradient, Modus und Besatz" : "浓度、模式与转运体数量"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={outId} className="text-[var(--gray)]">
                    {lang === "de" ? "c_aussen:" : "膜外浓度:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{cOutInit.toFixed(1)} mmol/L</span>
                </div>
                <input
                  id={outId}
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={cOutInit}
                  onChange={(e) => applySlider("out", Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={inId} className="text-[var(--gray)]">
                    {lang === "de" ? "c_innen:" : "膜内浓度:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{cInInit.toFixed(1)} mmol/L</span>
                </div>
                <input
                  id={inId}
                  type="range"
                  min={0}
                  max={10}
                  step={0.5}
                  value={cInInit}
                  onChange={(e) => applySlider("in", Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <fieldset className="space-y-1.5">
                <legend className="font-mono text-xs text-[var(--gray)]">
                  {lang === "de" ? "Transportmodus:" : "转运模式:"}
                </legend>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setMode("channel")}
                    className={`flex-1 px-2 py-1 font-mono text-[11px] rounded border ${mode === "channel" ? "border-[var(--accent)] bg-[var(--accent)]/10 font-semibold text-[var(--ink)]" : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--accent)]"}`}
                  >
                    {lang === "de" ? "Kanal · passiv" : "通道 · 被动"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("pump")}
                    className={`flex-1 px-2 py-1 font-mono text-[11px] rounded border ${mode === "pump" ? "border-[var(--accent)] bg-[var(--accent)]/10 font-semibold text-[var(--ink)]" : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--accent)]"}`}
                  >
                    {lang === "de" ? "Pumpe · ATP" : "泵 · 耗 ATP"}
                  </button>
                </div>
              </fieldset>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={nId} className="text-[var(--gray)]">
                    {lang === "de" ? "Transporter n (Vmax prop. n):" : "转运体数量 n（Vmax∝n）:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{transporters}</span>
                </div>
                <input
                  id={nId}
                  type="range"
                  min={1}
                  max={8}
                  step={1}
                  value={transporters}
                  onChange={(e) => setTransporters(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-1.5 font-mono text-xs">
              <div className="font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-1">
                {lang === "de" ? "Live-Messwerte" : "实时读数"}
              </div>
              <div className="flex justify-between">
                <span className="text-[#0e7490]">c_out:</span>
                <span className="font-bold tabular-nums">{ui.cOut.toFixed(2)} mmol/L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#4338CA]">c_in:</span>
                <span className="font-bold tabular-nums">{ui.cIn.toFixed(2)} mmol/L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Delta c:" : "浓度差:"}</span>
                <span className="font-bold tabular-nums">{ui.delta.toFixed(2)} mmol/L</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">v:</span>
                <span className="font-bold tabular-nums">{ui.rate.toFixed(2)}/s</span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">ATP:</span>
                <span className="font-bold tabular-nums">{ui.atp.toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[var(--line)] pt-4">
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">01 · Formel</div>
          <MathHtml
            code="v = V_{\max}\,\frac{S}{K_m + S}, \quad V_{\max} \propto n, \quad \text{Kanal: } v \parallel -\Delta c, \quad \text{Pumpe: } 1\,\mathrm{ATP}/\mathrm{Solut}"
            display={true}
            cacheKey="membrane:formel"
          />
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de" ? "Carrier saettigt: mehr Substrat hilft jenseits Km kaum." : "载体可饱和：底物超过 Km 后增速放缓。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">02 · KLP / Operator</div>
          <p className="font-serif text-[13px] text-[var(--ink)]">
            {lang === "de"
              ? "NRW EF Zelle und Transport: passiven und aktiven Transport unterscheiden und die Saettigung mit Operator erklaeren / vergleichen."
              : "NRW EF 细胞与转运：区分被动与主动转运，用 Operator 解释并比较饱和现象。"}
          </p>
          <p className="font-mono text-[11px] text-[var(--gray)]">Operatoren: unterscheiden · erklären · vergleichen</p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">03 · CN 方法</div>
          <p className="text-xs text-[var(--ink)]">
            {lang === "de"
              ? "先看方向再看能量：顺梯度免费走通道，逆梯度必须花 ATP；曲线走平即载体占满，加转运体才提 Vmax。"
              : "先看方向再看能量：顺梯度免费走通道，逆梯度必须花 ATP；曲线走平即载体占满，加转运体才提 Vmax。"}
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

export default MembraneSim;
