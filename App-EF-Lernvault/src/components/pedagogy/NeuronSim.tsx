import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface NeuronSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface UiSnap {
  v: number;
  naOpen: number;
  kOpen: number;
  spikes: number;
  peak: number;
  phase: 0 | 1 | 2 | 3;
  refractory: boolean;
  fired: boolean;
  stimEff: number;
  blocked: number;
}

const HIST_MAX = 900;
const V_MIN = -90;
const V_MAX = 50;
const V_REST = -70;
const V_TH = -55;

// Hodgkin-Huxley, reduced hand-written form (m = Na activation,
// h = Na inactivation, n = K activation). Constants follow the
// classic squid-axon parameterization, slowed down for display.
const E_NA = 50;
const E_K = -77;
const E_L = -54.4;
const G_NA = 120;
const G_K = 36;
const G_L = 0.3;
const C_M = 1;

function hhRates(v: number) {
  const x = v + 40;
  const am = Math.abs(x) < 1e-6 ? 1 : (0.1 * x) / (1 - Math.exp(-x / 10));
  const bm = 4 * Math.exp(-(v + 65) / 18);
  const ah = 0.07 * Math.exp(-(v + 65) / 20);
  const bh = 1 / (1 + Math.exp(-(v + 35) / 10));
  const y = v + 55;
  const an = Math.abs(y) < 1e-6 ? 0.1 : (0.01 * y) / (1 - Math.exp(-y / 10));
  const bn = 0.125 * Math.exp(-(v + 65) / 80);
  return { am, bm, ah, bh, an, bn };
}

interface Phys {
  v: number;
  m: number;
  h: number;
  n: number;
  tSim: number;
  prevV: number;
  histV: number[];
  histNa: number[];
  histK: number[];
  stimUntil: number;
  queue: number[];
  spikes: number;
  peak: number;
  lastPeak: number;
  lastSpikeT: number;
  refractoryUntil: number;
  refractoryNoteUntil: number;
  blocked: number;
  electrodeX: number;
  playing: boolean;
  stimAmp: number;
  speed: number;
  phase: 0 | 1 | 2 | 3;
  firedAt: number;
  frame: number;
}

function freshPhys(): Phys {
  return {
    v: V_REST,
    m: 0.05,
    h: 0.6,
    n: 0.32,
    tSim: 0,
    prevV: V_REST,
    histV: [],
    histNa: [],
    histK: [],
    stimUntil: -1,
    queue: [],
    spikes: 0,
    peak: V_REST,
    lastPeak: V_REST,
    lastSpikeT: -1000,
    refractoryUntil: -1,
    refractoryNoteUntil: -1,
    blocked: 0,
    electrodeX: 0.32,
    playing: true,
    stimAmp: 12,
    speed: 1,
    phase: 0,
    firedAt: -1000,
    frame: 0,
  };
}

const PHASE_COLOR = ["#71717a", "#1e40af", "#9f1239", "#065f46"];

function phaseOf(v: number, dv: number, sinceSpike: number): 0 | 1 | 2 | 3 {
  if (v > V_TH && dv > 0.5) return 1;
  if (v > V_TH - 4 && dv <= 0.5 && sinceSpike < 12) return 2;
  if (v <= V_REST - 1 && sinceSpike < 25) return 3;
  return 0;
}

/**
 * NeuronSim: simplified HH action potential lab.
 * Stimulus slider (threshold -55 mV, all-or-none), Na+/K+ gating
 * timing, V(t) trace with four annotated phases, refractory note,
 * draggable stimulus electrode, single + train playback.
 */
export function NeuronSim({ lang, studioMode = true, onExportFinding }: NeuronSimProps) {
  const [stimAmp, setStimAmp] = useState<number>(12);
  const [speed, setSpeed] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);
  const [ui, setUi] = useState<UiSnap>({
    v: V_REST,
    naOpen: 0,
    kOpen: 0,
    spikes: 0,
    peak: V_REST,
    phase: 0,
    refractory: false,
    fired: false,
    stimEff: 1,
    blocked: 0,
  });

  const stimId = useId();
  const speedId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const curveRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef<{ startX: number; startE: number } | null>(null);
  const lastRef = useRef<number | null>(null);
  const physRef = useRef<Phys>(freshPhys());

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  useEffect(() => {
    const p = physRef.current;
    p.playing = isPlaying;
    p.stimAmp = stimAmp;
    p.speed = speed;
  }, [isPlaying, stimAmp, speed]);

  const triggerPulse = (atSim: number) => {
    const p = physRef.current;
    // Absolute refractory: Na inactivation gate h still closed.
    if (atSim < p.refractoryUntil || p.h < 0.25) {
      p.blocked += 1;
      p.refractoryNoteUntil = p.tSim + 30;
      return;
    }
    p.stimUntil = atSim + 1.5;
  };

  const fireSingle = () => {
    const p = physRef.current;
    triggerPulse(p.tSim + 0.4);
  };

  const fireTrain = (freqHz: number, count: number) => {
    const p = physRef.current;
    const interval = 1000 / freqHz;
    for (let i = 0; i < count; i++) {
      p.queue.push(p.tSim + 0.4 + i * interval);
    }
  };

  const handleReset = () => {
    const keep = physRef.current;
    const fresh = freshPhys();
    fresh.electrodeX = keep.electrodeX;
    fresh.playing = keep.playing;
    fresh.stimAmp = keep.stimAmp;
    fresh.speed = keep.speed;
    physRef.current = fresh;
    lastRef.current = null;
    setUi({
      v: V_REST,
      naOpen: 0,
      kOpen: 0,
      spikes: 0,
      peak: V_REST,
      phase: 0,
      refractory: false,
      fired: false,
      stimEff: 1,
      blocked: 0,
    });
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

    const stepModel = (p: Phys, dtMs: number) => {
      const eff = 1 - 0.45 * Math.abs(p.electrodeX - 0.32);
      const stimOn = p.tSim < p.stimUntil;
      const inj = stimOn ? p.stimAmp * eff : 0;
      const r = hhRates(p.v);
      const mInf = r.am / (r.am + r.bm);
      const hInf = r.ah / (r.ah + r.bh);
      const nInf = r.an / (r.an + r.bn);
      const tm = 1 / (r.am + r.bm);
      const th = 1 / (r.ah + r.bh);
      const tn = 1 / (r.an + r.bn);
      p.m += (mInf - p.m) * (dtMs / tm);
      p.h += (hInf - p.h) * (dtMs / th);
      p.n += (nInf - p.n) * (dtMs / tn);
      const iNa = G_NA * Math.pow(p.m, 3) * p.h * (p.v - E_NA);
      const iK = G_K * Math.pow(p.n, 4) * (p.v - E_K);
      const iL = G_L * (p.v - E_L);
      p.prevV = p.v;
      p.v += ((inj - iNa - iK - iL) / C_M) * dtMs;
      // Spike onset: fast Na upstroke crossing 0 mV.
      if (p.prevV < 0 && p.v >= 0) {
        p.spikes += 1;
        p.peak = p.v;
        p.lastSpikeT = p.tSim;
        p.refractoryUntil = p.tSim + 3;
        p.firedAt = p.frame;
      }
      if (p.v > p.peak && p.tSim - p.lastSpikeT < 8) p.peak = p.v;
      if (p.tSim - p.lastSpikeT >= 8 && p.peak > V_TH) p.lastPeak = p.peak;
      const dv = (p.v - p.prevV) / Math.max(dtMs, 1e-6);
      p.phase = phaseOf(p.v, dv, p.tSim - p.lastSpikeT);
    };

    const drawStage = (w: number, h: number, ctx: CanvasRenderingContext2D) => {
      const p = physRef.current;
      ctx.clearRect(0, 0, w, h);
      const m = 14;
      const iw = w - 2 * m;
      const cy = h * 0.52;
      const half = Math.min(30, h * 0.09);

      // Intracellular band.
      ctx.fillStyle = "rgba(30,64,175,0.05)";
      ctx.fillRect(m, cy - half, iw, half * 2);
      // Membrane double line.
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(m, cy - half);
      ctx.lineTo(m + iw, cy - half);
      ctx.moveTo(m, cy + half);
      ctx.lineTo(m + iw, cy + half);
      ctx.stroke();

      // Channel glyphs: Na squares on top membrane, K circles below.
      const naOpen = Math.pow(p.m, 3) * p.h;
      const kOpen = Math.pow(p.n, 4);
      const nCh = 6;
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      for (let i = 0; i < nCh; i++) {
        const fx = 0.08 + (i / (nCh - 1)) * 0.84;
        const x = m + fx * iw;
        const naIsOpen = naOpen > 0.25;
        ctx.fillStyle = naIsOpen ? "#1e40af" : "#ffffff";
        ctx.strokeStyle = "#1e40af";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.rect(x - 6, cy - half - 7, 12, 12);
        ctx.fill();
        ctx.stroke();
        if (naIsOpen) {
          ctx.strokeStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(x, cy - half - 7);
          ctx.lineTo(x, cy - half + 5);
          ctx.stroke();
        }
        const kIsOpen = kOpen > 0.2;
        ctx.fillStyle = kIsOpen ? "#065f46" : "#ffffff";
        ctx.strokeStyle = "#065f46";
        ctx.beginPath();
        ctx.arc(x, cy + half + 2, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        if (kIsOpen) {
          ctx.strokeStyle = "#ffffff";
          ctx.beginPath();
          ctx.moveTo(x, cy + half - 4);
          ctx.lineTo(x, cy + half + 8);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "#1e40af";
      ctx.fillText("Na+", m + 22, cy - half - 12);
      ctx.fillStyle = "#065f46";
      ctx.fillText("K+", m + 22, cy + half + 20);

      // Ion drift dots: Na inward while open, K outward while open.
      const drift = (p.tSim * 0.05) % 1;
      for (let i = 0; i < 8; i++) {
        const fx = (i / 8 + drift * 0.06) % 1;
        const x = m + (0.06 + fx * 0.88) * iw;
        if (naOpen > 0.15) {
          const y = cy - half - 26 + drift * 30;
          ctx.fillStyle = "#1e40af";
          ctx.beginPath();
          ctx.arc(x, Math.min(cy - half + 4, y), 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
        if (kOpen > 0.15) {
          const y = cy + half + 26 - drift * 30;
          ctx.fillStyle = "#065f46";
          ctx.beginPath();
          ctx.arc(x, Math.max(cy + half - 4, y), 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Stimulus electrode (draggable).
      const ex = m + p.electrodeX * iw;
      const stimOn = p.tSim < p.stimUntil;
      ctx.strokeStyle = stimOn ? "#9f1239" : "#3f3f46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(ex, m + 6);
      ctx.lineTo(ex, cy - half - 10);
      ctx.stroke();
      ctx.fillStyle = stimOn ? "#9f1239" : "#ffffff";
      ctx.strokeStyle = stimOn ? "#9f1239" : "#3f3f46";
      ctx.beginPath();
      ctx.moveTo(ex - 8, m + 2);
      ctx.lineTo(ex + 8, m + 2);
      ctx.lineTo(ex, m + 14);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#3f3f46";
      ctx.fillText(lang === "de" ? "Reiz" : "刺激电极", ex, m + 26);

      // V readout bar (right side).
      const bx = w - m - 46;
      const by0 = m + 34;
      const by1 = h - m - 10;
      const frac = Math.max(0, Math.min(1, (p.v - V_MIN) / (V_MAX - V_MIN)));
      const yv = by1 - frac * (by1 - by0);
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(bx, by0, 14, by1 - by0);
      ctx.fillStyle = PHASE_COLOR[p.phase];
      ctx.fillRect(bx, yv, 14, by1 - yv);
      const yth = by1 - ((V_TH - V_MIN) / (V_MAX - V_MIN)) * (by1 - by0);
      ctx.strokeStyle = "#9f1239";
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(bx - 6, yth);
      ctx.lineTo(bx + 20, yth);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#3f3f46";
      ctx.textAlign = "left";
      ctx.fillText(`${p.v.toFixed(0)} mV`, bx - 52, yv + 3);
      ctx.fillStyle = "#9f1239";
      ctx.fillText("-55", bx + 20, yth + 3);

      // Refractory banner.
      if (p.tSim < p.refractoryNoteUntil) {
        ctx.fillStyle = "#9f1239";
        ctx.textAlign = "center";
        ctx.fillText(
          lang === "de" ? "Refraktaer: Reiz blockiert" : "不应期：刺激被阻断",
          w / 2,
          h - m - 4
        );
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
      const L = 40;
      const R = 12;
      const T = 10;
      const B = 22;
      const py = (v: number) => h - B - ((v - V_MIN) / (V_MAX - V_MIN)) * (h - T - B);
      // Grid + threshold/rest lines.
      ctx.lineWidth = 1;
      const grid: Array<[number, string, boolean]> = [
        [30, "rgba(63,63,70,0.25)", false],
        [V_TH, "#9f1239", true],
        [V_REST, "rgba(63,63,70,0.45)", true],
        [-80, "rgba(63,63,70,0.25)", false],
      ];
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "right";
      for (const [gv, col, dashed] of grid) {
        ctx.strokeStyle = col;
        ctx.setLineDash(dashed ? [4, 3] : []);
        ctx.beginPath();
        ctx.moveTo(L, py(gv));
        ctx.lineTo(w - R, py(gv));
        ctx.stroke();
        ctx.fillStyle = gv === V_TH ? "#9f1239" : "#3f3f46";
        ctx.fillText(`${gv}`, L - 4, py(gv) + 3);
      }
      ctx.setLineDash([]);
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(L, T - 2);
      ctx.lineTo(L, h - B);
      ctx.lineTo(w - 4, h - B);
      ctx.stroke();
      ctx.fillStyle = "#3f3f46";
      ctx.textAlign = "left";
      ctx.fillText("t", w - 14, h - 6);

      const hist = p.histV;
      if (hist.length >= 2) {
        const px = (i: number) => L + (i / (HIST_MAX - 1)) * (w - L - R);
        const off = HIST_MAX - hist.length;
        // Phase-colored trace segments.
        for (let i = 1; i < hist.length; i++) {
          const dv = hist[i] - hist[i - 1];
          const v = hist[i];
          let seg: 0 | 1 | 2 | 3 = 0;
          if (v > V_TH && dv > 0.05) seg = 1;
          else if (v > V_TH - 4 && dv <= 0.05 && v > V_REST) seg = 2;
          else if (v <= V_REST - 1 && v < V_REST + 6 && hist.slice(Math.max(0, i - 120), i).some((q) => q > 0)) seg = 3;
          ctx.strokeStyle = PHASE_COLOR[seg];
          ctx.lineWidth = seg === 0 ? 1.5 : 2;
          ctx.beginPath();
          ctx.moveTo(px(off + i - 1), py(hist[i - 1]));
          ctx.lineTo(px(off + i), py(v));
          ctx.stroke();
        }
        // Gating overlay (0..1 mapped to lower third).
        const pg = (f: number) => h - B - f * (h - T - B) * 0.35;
        const overlay = (arr: number[], color: string) => {
          ctx.strokeStyle = color;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          for (let i = 0; i < arr.length; i++) {
            const X = px(off + i);
            const Y = pg(arr[i]);
            if (i === 0) ctx.moveTo(X, Y);
            else ctx.lineTo(X, Y);
          }
          ctx.stroke();
        };
        overlay(p.histNa, "#1e40af");
        overlay(p.histK, "#065f46");
      }
    };

    const loop = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dtReal = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const p = physRef.current;
      void dtReal;

      const canvas = canvasRef.current;
      const fit = canvas ? fitCanvas(canvas) : null;

      if (p.playing) {
        // Sim advance: ~24 ms sim per real second at speed 1 (slow motion).
        const budget = p.speed * 0.4;
        const sub = 0.02;
        const steps = Math.max(1, Math.round(budget / sub));
        for (let s = 0; s < steps; s++) {
          // Scheduled train pulses fire when sim time arrives.
          while (p.queue.length > 0 && p.tSim >= p.queue[0]) {
            p.queue.shift();
            triggerPulse(p.tSim);
          }
          stepModel(p, sub);
          p.tSim += sub;
        }
        const naOpen = Math.pow(p.m, 3) * p.h;
        const kOpen = Math.pow(p.n, 4);
        p.histV.push(p.v);
        p.histNa.push(naOpen);
        p.histK.push(kOpen);
        if (p.histV.length > HIST_MAX) {
          p.histV.shift();
          p.histNa.shift();
          p.histK.shift();
        }
      }

      if (fit) drawStage(fit.w, fit.h, fit.ctx);
      drawCurve();

      p.frame += 1;
      if (p.frame % 6 === 0) {
        const naOpen = Math.pow(p.m, 3) * p.h;
        const kOpen = Math.pow(p.n, 4);
        setUi({
          v: p.v,
          naOpen,
          kOpen,
          spikes: p.spikes,
          peak: p.lastPeak,
          phase: p.phase,
          refractory: p.tSim < p.refractoryUntil || p.tSim < p.refractoryNoteUntil,
          fired: p.frame - p.firedAt < 30,
          stimEff: 1 - 0.45 * Math.abs(p.electrodeX - 0.32),
          blocked: p.blocked,
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
    const m = 14;
    const ex = m + physRef.current.electrodeX * (rect.width - 2 * m);
    const bx = e.clientX - rect.left;
    const by = e.clientY - rect.top;
    if (Math.abs(bx - ex) > 30 || by > rect.height * 0.4) return;
    dragRef.current = { startX: e.clientX, startE: physRef.current.electrodeX };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleStageMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    const canvas = canvasRef.current;
    if (!d || !canvas) return;
    const rect = canvas.getBoundingClientRect();
    const iw = Math.max(1, rect.width - 28);
    const next = d.startE + (e.clientX - d.startX) / iw;
    physRef.current.electrodeX = Math.max(0.05, Math.min(0.95, Math.round(next * 100) / 100));
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

  const phaseText =
    ui.phase === 0
      ? lang === "de"
        ? "Ruhe (polarisiert, ca. -70 mV)"
        : "静息（极化，约 -70 mV）"
      : ui.phase === 1
        ? lang === "de"
          ? "Depolarisation (Na+ ein, Aufstrich)"
          : "去极化（Na+ 内流，上升支）"
        : ui.phase === 2
          ? lang === "de"
            ? "Repolarisation (K+ aus, Abstrich)"
            : "复极化（K+ 外流，下降支）"
          : lang === "de"
            ? "Hyperpolarisation (Nachpotenzial)"
            : "超极化（后电位）";

  const handleExport = () => {
    const text =
      lang === "de"
        ? `Aktionspotenzial-Befund (HH, vereinfacht): Ruhe ${V_REST} mV, Schwelle ${V_TH} mV (Alles-oder-nichts); Reiz ${stimAmp.toFixed(1)} uA/cm2 (Effektiv ${(stimAmp * ui.stimEff).toFixed(1)}); APs: ${ui.spikes}, Gipfel ca. ${ui.peak.toFixed(0)} mV; Na+-Kanaele (m3h) offen ${ui.naOpen.toFixed(2)}, K+-Kanaele (n4) offen ${ui.kOpen.toFixed(2)}; Phase: ${phaseText}; blockierte Reize (Refraktaerzeit): ${ui.blocked}.`
        : `动作电位实验记录（HH 简化模型）：静息 ${V_REST} mV，阈值 ${V_TH} mV（全或无）；刺激 ${stimAmp.toFixed(1)} uA/cm2（有效 ${(stimAmp * ui.stimEff).toFixed(1)}）；AP 个数 ${ui.spikes}，峰值约 ${ui.peak.toFixed(0)} mV；Na+ 通道开放 (m3h) ${ui.naOpen.toFixed(2)}，K+ 通道开放 (n4) ${ui.kOpen.toFixed(2)}；当前相：${phaseText}；不应期被阻断刺激数：${ui.blocked}。`;
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
            {lang === "de" ? "Neuronlabor · Aktionspotenzial" : "神经元实验室 · 动作电位"}
          </span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Schwelle, Na+/K+-Kinetik und Refraktaerzeit" : "阈值、Na+/K+ 通道时序与不应期"}
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
            <span>{isPlaying ? (lang === "de" ? "Pause" : "暂停") : lang === "de" ? "Start" : "开始"}</span>
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
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : lang === "de" ? "Ausklappen" : "展开面板"}</span>
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
              ? "Reizelektrode (Dreieck) seitlich ziehen: Naehe zum Ausloesepunkt regelt die Reizwirkung (Pointer-Capture)."
              : "横向拖拽刺激电极（三角）：距触发点越近，有效刺激越强（指针捕获）。"}
          </p>

          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="font-mono text-[11px] text-[var(--gray)] mb-2">
              {lang === "de"
                ? "V(t) in mV: Phasen farbig, Schwelle -55 mV rot, Na-Offenung blau, K-Offenung gruen"
                : "V(t) 曲线（mV）：四相分色，阈值 -55 mV 红色，Na 开放蓝色，K 开放绿色"}
            </div>
            <canvas ref={curveRef} className="w-full h-[140px] block touch-none select-none" />
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 font-mono text-[11px]">
              <span className="text-[#71717a]">{lang === "de" ? "0 Ruhe" : "0 静息"}</span>
              <span className="text-[#1e40af]">{lang === "de" ? "1 Depolarisation" : "1 去极化"}</span>
              <span className="text-[#9f1239]">{lang === "de" ? "2 Repolarisation" : "2 复极化"}</span>
              <span className="text-[#065f46]">{lang === "de" ? "3 Hyperpolarisation" : "3 超极化"}</span>
              <span className="text-[var(--gray)] tabular-nums">
                V = {ui.v.toFixed(1)} mV · APs {ui.spikes}
                {ui.fired ? (lang === "de" ? " · AP laeuft" : " · 动作电位发放中") : ""}
              </span>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="border border-[var(--line)] bg-[var(--surface)] p-4 rounded-[var(--radius)] space-y-3.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                {lang === "de" ? "Reizstaerke und Salve" : "刺激强度与刺激序列"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={stimId} className="text-[var(--gray)]">
                    {lang === "de" ? "Reizstrom I:" : "刺激电流 I:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{stimAmp.toFixed(1)} uA/cm2</span>
                </div>
                <input
                  id={stimId}
                  type="range"
                  min={0}
                  max={25}
                  step={0.5}
                  value={stimAmp}
                  onChange={(e) => setStimAmp(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
                <p className="font-mono text-[11px] text-[var(--gray)]">
                  {lang === "de"
                    ? "Schwelle -55 mV: darunter nichts, darueber volles AP (Alles-oder-nichts)."
                    : "阈值 -55 mV：阈下无反应，阈上发放完整 AP（全或无）。"}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={fireSingle}
                  className="px-2 py-1.5 font-mono text-[11px] rounded border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10"
                >
                  {lang === "de" ? "Einzelreiz" : "单次刺激"}
                </button>
                <button
                  type="button"
                  onClick={() => fireTrain(20, 5)}
                  className="px-2 py-1.5 font-mono text-[11px] rounded border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {lang === "de" ? "Salve 20 Hz" : "序列 20 Hz"}
                </button>
                <button
                  type="button"
                  onClick={() => fireTrain(100, 5)}
                  className="px-2 py-1.5 font-mono text-[11px] rounded border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {lang === "de" ? "Salve 100 Hz" : "序列 100 Hz"}
                </button>
              </div>
              <p className="font-mono text-[11px] text-[var(--gray)]">
                {lang === "de"
                  ? "100-Hz-Salve faellt in die Refraktaerzeit: Reize werden blockiert (Zaehler unten)."
                  : "100 Hz 序列落入不应期：部分刺激被阻断（见下方计数）."}
              </p>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={speedId} className="text-[var(--gray)]">
                    {lang === "de" ? "Zeitlupe:" : "慢放速度:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{speed}x</span>
                </div>
                <div className="flex gap-2" id={speedId}>
                  {[0.5, 1, 2].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSpeed(s)}
                      className={`flex-1 px-2 py-1 font-mono text-[11px] rounded border ${speed === s ? "border-[var(--accent)] bg-[var(--accent)]/10 font-semibold text-[var(--ink)]" : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--accent)]"}`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-1.5 font-mono text-xs">
              <div className="font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-1">
                {lang === "de" ? "Live-Messwerte" : "实时读数"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">V:</span>
                <span className="font-bold tabular-nums">{ui.v.toFixed(1)} mV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1e40af]">Na (m3h):</span>
                <span className="font-bold tabular-nums">{ui.naOpen.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#065f46]">K (n4):</span>
                <span className="font-bold tabular-nums">{ui.kOpen.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "APs / Gipfel:" : "AP 数 / 峰值:"}</span>
                <span className="font-bold tabular-nums">
                  {ui.spikes} / {ui.peak.toFixed(0)} mV
                </span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">{lang === "de" ? "Phase:" : "当前相:"}</span>
                <span className="font-bold">{["0", "1", "2", "3"][ui.phase]}</span>
              </div>
              <div className="text-[11px] text-[var(--gray)]">{phaseText}</div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[var(--gray)]">{lang === "de" ? "Blockiert (refraktaer):" : "不应期阻断:"}</span>
                <span className="font-bold tabular-nums text-[#9f1239]">{ui.blocked}</span>
              </div>
              <div className="text-[11px] text-[var(--gray)]">
                {lang === "de"
                  ? "Refraktaerzeit: solange h (Na-Inaktivierung) geschlossen ist, loest kein Reiz ein AP aus."
                  : "不应期：只要 h（Na 失活门）未恢复，刺激就不能触发 AP。"}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[var(--line)] pt-4">
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">01 · Formel</div>
          <MathHtml
            code="I = C_M \frac{dV}{dt} + g_{Na}m^3h\,(V-E_{Na}) + g_K n^4\,(V-E_K) + g_L\,(V-E_L), \quad V_{th} = -55\,\mathrm{mV}"
            display={true}
            cacheKey="neuron:formel"
          />
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de" ? "Erst Na+ (m3h) auf, dann K+ (n4): Aufstrich, Abstrich, Nachpotenzial." : "先 Na+ (m3h) 开、后 K+ (n4) 开：上升支、下降支、后电位。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">02 · KLP / Operator</div>
          <p className="font-serif text-[13px] text-[var(--ink)]">
            {lang === "de"
              ? "NRW EF Neurobiologie: Ruhepotenzial und Aktionspotenzial beschreiben, Ionenkanaele erlaeutern und Refraktaerzeit begruenden."
              : "NRW EF 神经生物学：描述静息电位与动作电位，解释离子通道并论证不应期。"}
          </p>
          <p className="font-mono text-[11px] text-[var(--gray)]">Operatoren: beschreiben · erläutern · begründen</p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">03 · CN 方法</div>
          <p className="text-xs text-[var(--ink)]">
            {lang === "de"
              ? "Schwach spurten, stark feuern: unter -55 mV passiert nichts, darueber immer das gleiche AP. 100-Hz-Salve zeigt die absolute Refraktaerzeit."
              : "弱刺激无反应、强刺激发完整波：-55 mV 以下无事，以上每次波形相同。100 Hz 序列演示绝对不应期。"}
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

export default NeuronSim;
