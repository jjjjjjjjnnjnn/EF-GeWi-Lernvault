import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface StatesMatterSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

/* Caloric model (school water at 1 atm, hand-written, qualitative).
 * E in demo units: cs/cl/cg per deg, Lf/Lv latent widths.
 * T(E) inversion yields flat T=0 and T=100 plateaus while E crosses Lf/Lv. */
const CS = 0.021;
const CL = 0.042;
const CG = 0.02;
const LF = 3.34;
const E100 = LF + 100 * CL;
const LV = 22.57;
const T_MIN = -50;
const T_MAX = 300;
const N_PART = 64;
const HIST_MAX = 600;

type Phase = "solid" | "melt" | "liquid" | "boil" | "gas";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface UiSnap {
  t: number;
  phase: Phase;
  melt: number;
  boil: number;
  e: number;
  vrms: number;
}

function energyOf(tC: number): number {
  if (tC <= 0) return tC * CS;
  if (tC < 100) return LF + tC * CL;
  return E100 + LV + (tC - 100) * CG;
}

function stateOf(E: number): { t: number; melt: number; boil: number; phase: Phase } {
  if (E < 0) return { t: E / CS, melt: 0, boil: 0, phase: "solid" };
  if (E <= LF) return { t: 0, melt: E / LF, boil: 0, phase: "melt" };
  if (E < E100) return { t: (E - LF) / CL, melt: 1, boil: 0, phase: "liquid" };
  if (E <= E100 + LV) return { t: 100, melt: 1, boil: (E - E100) / LV, phase: "boil" };
  return { t: 100 + (E - E100 - LV) / CG, melt: 1, boil: 1, phase: "gas" };
}

function makeLattice(): Particle[] {
  const arr: Particle[] = [];
  const n = Math.sqrt(N_PART);
  for (let i = 0; i < N_PART; i++) {
    const cx = (i % n) / n + 0.5 / n;
    const cy = Math.floor(i / n) / n + 0.5 / n;
    arr.push({
      x: 0.08 + cx * 0.72,
      y: 0.08 + cy * 0.84,
      vx: (Math.random() - 0.5) * 0.05,
      vy: (Math.random() - 0.5) * 0.05,
    });
  }
  return arr;
}

function latticeAnchor(i: number): { x: number; y: number } {
  const n = Math.sqrt(N_PART);
  const cx = (i % n) / n + 0.5 / n;
  const cy = Math.floor(i / n) / n + 0.5 / n;
  return { x: 0.08 + cx * 0.72, y: 0.08 + cy * 0.84 };
}

export function StatesMatterSim({ lang, studioMode: _studioMode = true, onExportFinding }: StatesMatterSimProps) {
  const [tempC, setTempC] = useState<number>(20);
  const [power, setPower] = useState<number>(2);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showBonds, setShowBonds] = useState<boolean>(true);
  const [ui, setUi] = useState<UiSnap>({ t: 20, phase: "liquid", melt: 1, boil: 0, e: energyOf(20), vrms: 0 });

  const tempId = useId();
  const powerId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curveRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const lastRef = useRef<number | null>(null);
  const probeDragRef = useRef<boolean>(false);

  const physRef = useRef({
    E: energyOf(20),
    target: energyOf(20),
    power: 2,
    playing: true,
    parts: makeLattice(),
    hist: [] as number[],
    probe: (20 - -50) / 350,
  });

  useEffect(() => {
    physRef.current.target = energyOf(tempC);
  }, [tempC]);

  useEffect(() => {
    physRef.current.power = power;
  }, [power]);

  useEffect(() => {
    physRef.current.playing = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    let animId = 0;

    const fit = (canvas: HTMLCanvasElement): { ctx: CanvasRenderingContext2D; w: number; h: number } | null => {
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

    const stepParticles = (dt: number, tC: number, phase: Phase) => {
      const P = physRef.current.parts;
      const tK = tC + 273.15;
      const vTarget = 0.28 * Math.sqrt(Math.max(tK, 20) / 273);
      const solid = phase === "solid" || phase === "melt";
      const gas = phase === "gas" || phase === "boil";

      // Pairwise qualitative short-range interaction (truncated, capped)
      const sig = 0.055;
      const eps = solid ? 0.0 : gas ? 0.12 : 0.6;
      const fx = new Array<number>(P.length).fill(0);
      const fy = new Array<number>(P.length).fill(0);
      if (eps > 0) {
        const cut = sig * 3;
        for (let i = 0; i < P.length; i++) {
          for (let j = i + 1; j < P.length; j++) {
            const dx = P[i].x - P[j].x;
            const dy = P[i].y - P[j].y;
            const r = Math.hypot(dx, dy);
            if (r > 1e-4 && r < cut) {
              const sr = sig / r;
              const sr6 = sr * sr * sr * sr * sr * sr;
              const sr12 = sr6 * sr6;
              let f = (24 * eps * (2 * sr12 - sr6)) / Math.max(r, 0.02);
              f = Math.max(-6, Math.min(6, f));
              const ux = dx / r;
              const uy = dy / r;
              fx[i] += f * ux;
              fy[i] += f * uy;
              fx[j] -= f * ux;
              fy[j] -= f * uy;
            }
          }
        }
      }

      let sumV2 = 0;
      for (let i = 0; i < P.length; i++) {
        const p = P[i];
        if (solid) {
          const a = latticeAnchor(i);
          const k = phase === "solid" ? 90 : 22;
          const gm = 5;
          const noise = 0.05 * Math.sqrt(Math.max(tK, 30) / 273);
          p.vx += (-k * (p.x - a.x) - gm * p.vx) * dt + (Math.random() - 0.5) * noise * dt * 12;
          p.vy += (-k * (p.y - a.y) - gm * p.vy) * dt + (Math.random() - 0.5) * noise * dt * 12;
        } else {
          const gm = gas ? 0.15 : 1.4;
          const kick = gas ? 0.35 : 0.12;
          p.vx += (fx[i] - gm * p.vx) * dt + (Math.random() - 0.5) * kick * dt * Math.sqrt(Math.max(tK, 40) / 273);
          p.vy += (fy[i] - gm * p.vy) * dt + (Math.random() - 0.5) * kick * dt * Math.sqrt(Math.max(tK, 40) / 273);
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const rest = gas ? 1 : 0.55;
        if (p.x < 0.03) { p.x = 0.03; p.vx = Math.abs(p.vx) * rest; }
        if (p.x > 0.78) { p.x = 0.78; p.vx = -Math.abs(p.vx) * rest; }
        if (p.y < 0.03) { p.y = 0.03; p.vy = Math.abs(p.vy) * rest; }
        if (p.y > 0.97) { p.y = 0.97; p.vy = -Math.abs(p.vy) * rest; }
        sumV2 += p.vx * p.vx + p.vy * p.vy;
      }
      // Weak Berendsen-style thermostat toward target rms (keeps T mapping honest)
      const vrms = Math.sqrt(sumV2 / (2 * P.length));
      if (!solid && vrms > 1e-4) {
        const s = Math.max(0.94, Math.min(1.06, 1 + 0.03 * ((vTarget - vrms) / vrms)));
        for (const p of P) { p.vx *= s; p.vy *= s; }
      }
      return vrms;
    };

    const loop = (ts: number) => {
      if (lastRef.current === null) lastRef.current = ts;
      const dt = Math.min((ts - lastRef.current) / 1000, 0.033);
      lastRef.current = ts;
      const ph = physRef.current;

      if (ph.playing) {
        // Energy relaxes toward slider target with finite heating power:
        // crossing Lf / Lv takes time, so T(t) shows flat melting / boiling plateaus.
        const diff = ph.target - ph.E;
        const maxStep = ph.power * 3 * dt;
        ph.E += Math.max(-maxStep, Math.min(maxStep, diff));
      }
      const st = stateOf(ph.E);
      const vrms = stepParticles(ph.playing ? dt : 0, st.t, st.phase);

      ph.hist.push(st.t);
      if (ph.hist.length > HIST_MAX) ph.hist.splice(0, ph.hist.length - HIST_MAX);
      ph.probe = (Math.max(T_MIN, Math.min(T_MAX, tempC)) - T_MIN) / (T_MAX - T_MIN);

      frameRef.current += 1;
      if (frameRef.current % 6 === 0) {
        setUi({ t: st.t, phase: st.phase, melt: st.melt, boil: st.boil, e: ph.E, vrms });
      }

      // Main stage
      const main = canvasRef.current ? fit(canvasRef.current) : null;
      if (main) {
        const { ctx, w, h } = main;
        ctx.clearRect(0, 0, w, h);
        const padL = 14;
        const padR = 64;
        const padT = 14;
        const padB = 30;
        const bx = padL;
        const by = padT;
        const bw = w - padL - padR;
        const bh = h - padT - padB;

        ctx.fillStyle = "#fafaf9";
        ctx.fillRect(bx, by, bw, bh);
        ctx.strokeStyle = "#57534e";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(bx, by, bw, bh);

        const toPx = (nx: number, ny: number): [number, number] => [bx + nx * bw, by + ny * bh];
        const P = ph.parts;

        // Lattice bonds in solid / melting branch
        if (showBonds && (st.phase === "solid" || st.phase === "melt")) {
          ctx.strokeStyle = "rgba(87,83,110,0.35)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          for (let i = 0; i < P.length; i++) {
            for (let j = i + 1; j < P.length; j++) {
              const dx = P[i].x - P[j].x;
              const dy = P[i].y - P[j].y;
              if (Math.hypot(dx, dy) < 0.11) {
                const [ax, ay] = toPx(P[i].x, P[i].y);
                const [qx, qy] = toPx(P[j].x, P[j].y);
                ctx.moveTo(ax, ay);
                ctx.lineTo(qx, qy);
              }
            }
          }
          ctx.stroke();
        }

        const col = st.phase === "solid" || st.phase === "melt" ? "#1e40af"
          : st.phase === "gas" || st.phase === "boil" ? "#9f1239" : "#0e7490";
        const r = Math.max(3, Math.min(6, bw / 130));
        for (const p of P) {
          const [px, py] = toPx(p.x, p.y);
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "rgba(24,24,27,0.5)";
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Scale bar (5 nm schematic)
        ctx.strokeStyle = "#3f3f46";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(bx + 8, by + bh - 10);
        ctx.lineTo(bx + 58, by + bh - 10);
        ctx.stroke();
        ctx.fillStyle = "#3f3f46";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText("5 nm", bx + 8, by + bh - 14);

        // Draggable temperature probe (vertical thermometer at right)
        const tx = bx + bw + 22;
        const ty0 = by + 6;
        const ty1 = by + bh - 30;
        ctx.strokeStyle = "#57534e";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(tx, ty0);
        ctx.lineTo(tx, ty1);
        ctx.stroke();
        const frac = ph.probe;
        const py = ty1 - frac * (ty1 - ty0);
        ctx.fillStyle = st.t < 0 ? "#1e40af" : st.t < 100 ? "#0e7490" : "#9f1239";
        ctx.beginPath();
        ctx.arc(tx, ty1 + 8, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(tx - 3, py, 6, ty1 - py);
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(tx, py, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = "#3f3f46";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText("300", tx, ty0 - 4);
        ctx.fillText("-50", tx, ty1 + 24);
      }

      // Heating / cooling curve T(t)
      const g = curveRef.current ? fit(curveRef.current) : null;
      if (g) {
        const { ctx, w, h } = g;
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = "#fafaf9";
        ctx.fillRect(0, 0, w, h);
        const L = 44;
        const R = 10;
        const T = 10;
        const B = 20;
        const iw = w - L - R;
        const ih = h - T - B;
        const yOf = (tC: number): number => T + (1 - (tC - T_MIN) / (T_MAX - T_MIN)) * ih;

        ctx.strokeStyle = "rgba(30,64,175,0.55)";
        ctx.setLineDash([4, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(L, yOf(0));
        ctx.lineTo(w - R, yOf(0));
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(L, yOf(100));
        ctx.lineTo(w - R, yOf(100));
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#52525b";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText("100 C", 4, yOf(100) + 3);
        ctx.fillText("0 C", 12, yOf(0) + 3);

        ctx.strokeStyle = "#a8a29e";
        ctx.lineWidth = 1;
        ctx.strokeRect(L, T, iw, ih);

        const H = ph.hist;
        if (H.length > 1) {
          ctx.strokeStyle = "#9f1239";
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          for (let i = 0; i < H.length; i++) {
            const x = L + (i / (HIST_MAX - 1)) * iw;
            const y = yOf(Math.max(T_MIN, Math.min(T_MAX, H[i])));
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.fillStyle = "#57534e";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "right";
        ctx.fillText("T(t)", w - R, T - 2);
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [showBonds, tempC]);

  const probeFromEvent = (e: React.PointerEvent<HTMLCanvasElement>): number => {
    const canvas = canvasRef.current;
    if (!canvas) return tempC;
    const rect = canvas.getBoundingClientRect();
    const padT = 14;
    const padB = 30;
    const frac = 1 - (e.clientY - rect.top - padT) / (rect.height - padT - padB);
    const c = Math.round(T_MIN + Math.max(0, Math.min(1, frac)) * (T_MAX - T_MIN));
    return Math.max(T_MIN, Math.min(T_MAX, c));
  };

  const handleProbeDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    probeDragRef.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setTempC(probeFromEvent(e));
  };

  const handleProbeMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!probeDragRef.current) return;
    setTempC(probeFromEvent(e));
  };

  const handleProbeUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    probeDragRef.current = false;
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const handleReset = () => {
    const E0 = energyOf(20);
    physRef.current.E = E0;
    physRef.current.target = E0;
    physRef.current.hist = [];
    physRef.current.parts = makeLattice();
    setTempC(20);
    setUi({ t: 20, phase: "liquid", melt: 1, boil: 0, e: E0, vrms: 0 });
  };

  const phaseLabel = (p: Phase): string => {
    if (lang === "de") {
      if (p === "solid") return "fest";
      if (p === "melt") return "Schmelzplateau";
      if (p === "liquid") return "fluessig";
      if (p === "boil") return "Siedeplateau";
      return "gasfoermig";
    }
    if (p === "solid") return "固态";
    if (p === "melt") return "熔化平台";
    if (p === "liquid") return "液态";
    if (p === "boil") return "沸腾平台";
    return "气态";
  };

  const handleExport = () => {
    const text =
      lang === "de"
        ? `Aggregatzustand-Befund: T = ${ui.t.toFixed(1)} C (Soll ${tempC} C), Phase: ${phaseLabel(ui.phase)}; Schmelzanteil ${Math.round(ui.melt * 100)} %, Siedechargen-Anteil ${Math.round(ui.boil * 100)} %; E = ${ui.e.toFixed(2)}, v_rms-Index ${ui.vrms.toFixed(3)}. T(t)-Kurve: waagrechte Abschnitte bei T = 0 C (Schmelzen, Q = m L_f) und T = 100 C (Sieden, Q = m L_v); dazwischen Q = m c Delta-T.`
        : `三态实验记录：实测 T = ${ui.t.toFixed(1)} C（目标 ${tempC} C），状态：${phaseLabel(ui.phase)}；熔化进度 ${Math.round(ui.melt * 100)} %，汽化进度 ${Math.round(ui.boil * 100)} %；内能指标 E = ${ui.e.toFixed(2)}，速率指标 v_rms = ${ui.vrms.toFixed(3)}。T(t) 曲线：在 T = 0 C（熔化，Q = m Lf）与 T = 100 C（沸腾，Q = m Lv）出现水平平台段，平台之间满足 Q = m c ΔT。`;
    if (onExportFinding) {
      onExportFinding(text);
    } else {
      void navigator.clipboard.writeText(text);
    }
  };

  const presets: Array<{ t: number; de: string; zh: string }> = [
    { t: -30, de: "Fest (-30)", zh: "固态 (-30)" },
    { t: 0, de: "T_m (0)", zh: "熔点 (0)" },
    { t: 50, de: "Fluessig (50)", zh: "液态 (50)" },
    { t: 100, de: "T_b (100)", zh: "沸点 (100)" },
    { t: 200, de: "Gas (200)", zh: "气态 (200)" },
  ];

  return (
    <div className="space-y-4 leading-[1.4]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Waermelabor · Aggregatzustaende" : "热学实验室 · 物质三态"}
          </span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de"
              ? "Fest, fluessig, gasfoermig: Teilchenbild und Heizkurve mit latenter Waerme"
              : "固态、液态、气态：粒子图像与含潜热平台的加热曲线"}
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
              onPointerDown={handleProbeDown}
              onPointerMove={handleProbeMove}
              onPointerUp={handleProbeUp}
              className="w-full h-[420px] sm:h-[480px] block cursor-grab active:cursor-grabbing touch-none select-none"
            />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-mono text-[11px] text-[var(--gray)]">
              {lang === "de"
                ? "Sonde rechts vertikal ziehen: Soll-Temperatur setzen (Pointer-Capture)."
                : "上下拖动右侧温度探针：设定目标温度（指针捕获）。"}
            </p>
            <span className="px-2 py-0.5 rounded font-mono text-xs font-bold border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]">
              {phaseLabel(ui.phase)} · {ui.t.toFixed(1)} C
            </span>
          </div>

          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="font-mono text-[11px] text-[var(--gray)] mb-2">
              {lang === "de"
                ? "Erwaermungs- / Abkuehlungskurve T(t): Plateaus bei 0 C und 100 C"
                : "加热 / 冷却曲线 T(t)：0 C 与 100 C 处出现平台"}
            </div>
            <canvas ref={curveRef} className="w-full h-[140px] block touch-none select-none" />
          </div>

          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="flex items-center justify-between font-mono text-[11px] mb-1.5">
              <span className="text-[var(--gray)]">{lang === "de" ? "Latente Anteile" : "潜热进度"}</span>
              <span className="font-bold text-[var(--ink)] tabular-nums">
                {lang === "de" ? `Schmelzen ${Math.round(ui.melt * 100)} % · Sieden ${Math.round(ui.boil * 100)} %` : `熔化 ${Math.round(ui.melt * 100)} % · 汽化 ${Math.round(ui.boil * 100)} %`}
              </span>
            </div>
            <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden mb-1.5">
              <div className="h-full bg-[#1e40af]" style={{ width: `${Math.round(ui.melt * 100)}%` }} />
            </div>
            <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
              <div className="h-full bg-[#9f1239]" style={{ width: `${Math.round(ui.boil * 100)}%` }} />
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="border border-[var(--line)] bg-[var(--surface)] p-4 rounded-[var(--radius)] space-y-3.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                {lang === "de" ? "Temperatur und Heizleistung" : "温度与加热功率"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={tempId} className="text-[var(--gray)]">
                    {lang === "de" ? "Soll-Temperatur:" : "目标温度:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{tempC} C</span>
                </div>
                <input
                  id={tempId}
                  type="range"
                  min={T_MIN}
                  max={T_MAX}
                  step={1}
                  value={tempC}
                  onChange={(e) => setTempC(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={powerId} className="text-[var(--gray)]">
                    {lang === "de" ? "Heizleistung P:" : "加热功率 P:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{power.toFixed(1)}</span>
                </div>
                <input
                  id={powerId}
                  type="range"
                  min={0.5}
                  max={4}
                  step={0.5}
                  value={power}
                  onChange={(e) => setPower(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setTempC((t) => Math.max(T_MIN, t - 25))}
                  className="flex-1 px-2 py-1 font-mono text-[11px] rounded border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {lang === "de" ? "Kuehlen (-25)" : "冷却 (-25)"}
                </button>
                <button
                  type="button"
                  onClick={() => setTempC((t) => Math.min(T_MAX, t + 25))}
                  className="flex-1 px-2 py-1 font-mono text-[11px] rounded border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {lang === "de" ? "Heizen (+25)" : "加热 (+25)"}
                </button>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-[11px] font-mono">
                {presets.map((p) => (
                  <button
                    key={p.t}
                    type="button"
                    onClick={() => setTempC(p.t)}
                    className={`p-1.5 border rounded text-center ${
                      tempC === p.t
                        ? "border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-bold"
                        : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
                    }`}
                  >
                    {lang === "de" ? p.de : p.zh}
                  </button>
                ))}
              </div>
              <label className="flex items-center gap-2 cursor-pointer font-mono text-xs text-[var(--ink)]">
                <input
                  type="checkbox"
                  checked={showBonds}
                  onChange={(e) => setShowBonds(e.target.checked)}
                  className="accent-[var(--accent)]"
                />
                <span>{lang === "de" ? "Gitterbindungen im Festkoerper zeigen" : "显示固态晶格连线"}</span>
              </label>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-1.5 font-mono text-xs">
              <div className="font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-1">
                {lang === "de" ? "Live-Messwerte" : "实时读数"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Teilchentemperatur T:" : "粒子温度 T:"}</span>
                <span className="font-bold tabular-nums">{ui.t.toFixed(1)} C</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Aggregatzustand:" : "物态:"}</span>
                <span className="font-bold tabular-nums">{phaseLabel(ui.phase)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1e40af]">{lang === "de" ? "Schmelzanteil:" : "熔化比例:"}</span>
                <span className="font-bold tabular-nums">{Math.round(ui.melt * 100)} %</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#9f1239]">{lang === "de" ? "Siedeanteil:" : "汽化比例:"}</span>
                <span className="font-bold tabular-nums">{Math.round(ui.boil * 100)} %</span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">v_rms:</span>
                <span className="font-bold tabular-nums">{ui.vrms.toFixed(3)}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[var(--line)] pt-4">
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">01 · Formel</div>
          <MathHtml
            code="V(r) = 4\varepsilon\left[\left(\frac{\sigma}{r}\right)^{12} - \left(\frac{\sigma}{r}\right)^{6}\right], \quad Q = mc\Delta T, \quad Q = mL"
            display={true}
            cacheKey="states-matter:formel"
          />
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de"
              ? "Kurz: Abstossung ~ r^-12, Anziehung ~ r^-6. Sensibel: Q = mcT; latent: Q = mL bei T = const."
              : "短程排斥 ~ r^-12，长程吸引 ~ r^-6。显热 Q = mcΔT；潜热段 Q = mL，T 不变。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">02 · KLP / Operator</div>
          <p className="font-serif text-[13px] text-[var(--ink)]">
            {lang === "de"
              ? "NRW EF Waermelehre: Aggregatzustaende am Teilchenmodell unterscheiden und Heizkurven-Plateaus mit Operator beschreiben / erklaeren / berechnen."
              : "NRW EF 热学：用粒子模型区分三态，用 Operator 描述、解释并计算加热曲线平台。"}
          </p>
          <p className="font-mono text-[11px] text-[var(--gray)]">Operatoren: beschreiben · erklaeren · berechnen</p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">03 · CN 方法</div>
          <p className="text-xs text-[var(--ink)]">
            {lang === "de"
              ? "先看平台再列式：水平段按 Q = mL（熔化 / 沸腾），斜坡段按 Q = mcΔT；粒子速率满足 v_rms ~ sqrt(T)。"
              : "先看平台再列式：水平段按 Q = mL（熔化 / 沸腾），斜坡段按 Q = mcΔT；粒子速率满足 v_rms ~ sqrt(T)。"}
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

export default StatesMatterSim;
