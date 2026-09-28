import { useState, useEffect, useRef, useCallback } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface WaveStringSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type EndType = "fixed" | "free";

interface Readout {
  v: number;
  lambda: number;
  nNear: number;
  fNear: number;
  detunePct: number;
  resonant: boolean;
  yProbe: number;
}

const L = 1.0; // string length, m (fixed for EF classroom demo)
const R_END = 0.92; // reflection magnitude (slight loss at the wall)
const BETA = 0.25; // spatial damping, 1/m
const ENV_SLOW = 0.08; // envelope time-lapse factor so the entering front stays visible
const A_MIN = 0.005;
const A_MAX = 0.045;

function clamp01(u: number): number {
  const c = Math.max(0, Math.min(1, u));
  return c * c * (3 - 2 * c);
}

function IconPlay() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4.5 2.8v10.4L13 8 4.5 2.8z" />
    </svg>
  );
}

function IconPause() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M5.5 3v10M10.5 3v10" />
    </svg>
  );
}

function IconReset() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.8v3h-3" />
    </svg>
  );
}

function IconSlow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <circle cx="8" cy="8" r="5.8" />
      <path d="M8 4.8V8l2.2 1.6" />
    </svg>
  );
}

export function WaveStringSim({ lang, studioMode: _studioMode = true, onExportFinding }: WaveStringSimProps) {
  const isZh = lang === "zh";

  // 1. Inquiry variables (user controlled)
  const [tension, setTension] = useState(12); // T, N
  const [muG, setMuG] = useState(60); // linear density, g/m
  const [freq, setFreq] = useState(7); // drive frequency f, Hz
  const [amplitude, setAmplitude] = useState(0.02); // drive amplitude A, m (draggable at left end)
  const [endType, setEndType] = useState<EndType>("fixed");
  const [paused, setPaused] = useState(false);
  const [slowMo, setSlowMo] = useState(false);
  const [showPanels, setShowPanels] = useState(true);
  const [showNodes, setShowNodes] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(true);

  // Derived classroom quantities
  const mu = muG / 1000;
  const v = Math.sqrt(tension / mu);
  const lambda = v / freq;
  const nNear = Math.max(1, Math.round((2 * L * freq) / v));
  const fNear = (nNear * v) / (2 * L);
  const detunePct = Math.abs((freq - fNear) / fNear) * 100;
  const resonant = detunePct < 5;

  // 2. Throttled readout (every 6 frames)
  const [readout, setReadout] = useState<Readout>({
    v,
    lambda,
    nNear,
    fNear,
    detunePct,
    resonant,
    yProbe: 0,
  });

  // 3. Live parameter mirror for the decoupled rAF loop (no per-frame setState)
  const paramsRef = useRef({ tension, muG, freq, amplitude, endType, paused, slowMo, showNodes, showEnvelope, isZh });
  paramsRef.current = { tension, muG, freq, amplitude, endType, paused, slowMo, showNodes, showEnvelope, isZh };

  // 4. Physics clock ref (fully decoupled from React state)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const clockRef = useRef({ tLab: 0, tEnv: 0, frameCount: 0, isDragging: false, dragRestY: 0, dragScale: 1 });

  // 5. Reset callback
  const handleReset = useCallback(() => {
    clockRef.current.tLab = 0;
    clockRef.current.tEnv = 0;
  }, []);

  // Standing-wave marker positions (analytic envelope extrema for the chosen end)
  const markerPositions = useCallback(
    (lam: number, end: EndType): { nodes: number[]; bellies: number[] } => {
      const nodes: number[] = [];
      const bellies: number[] = [];
      if (end === "fixed") {
        for (let m = 0; m * lam <= 2 * L + 1e-9; m++) {
          const xn = L - (m * lam) / 2;
          if (xn >= -1e-9 && xn <= L + 1e-9) nodes.push(Math.max(0, Math.min(L, xn)));
          const xb = L - ((2 * m + 1) * lam) / 4;
          if (xb >= -1e-9 && xb <= L + 1e-9) bellies.push(Math.max(0, Math.min(L, xb)));
        }
      } else {
        for (let m = 0; m * lam <= 2 * L + 1e-9; m++) {
          const xb = L - (m * lam) / 2;
          if (xb >= -1e-9 && xb <= L + 1e-9) bellies.push(Math.max(0, Math.min(L, xb)));
          const xn = L - ((2 * m + 1) * lam) / 4;
          if (xn >= -1e-9 && xn <= L + 1e-9) nodes.push(Math.max(0, Math.min(L, xn)));
        }
      }
      return { nodes: nodes.slice(0, 8), bellies: bellies.slice(0, 8) };
    },
    []
  );

  // 6. 60 FPS field loop with dynamic DPR canvas rendering
  useEffect(() => {
    let animId: number;
    let lastTs = performance.now();

    const fieldAt = (x: number, tLab: number, tEnv: number, vv: number, kk: number, om: number, A: number, end: EndType): number => {
      const eI = clamp01((vv * tEnv - x) / (0.12 * L));
      const eR = clamp01((vv * tEnv - (2 * L - x)) / (0.12 * L));
      const attI = Math.exp(-BETA * x);
      const attR = R_END * Math.exp(-BETA * (2 * L - x));
      const s = end === "fixed" ? -1 : 1;
      const yi = A * Math.sin(om * tLab - kk * x) * eI * attI;
      const yr = s * A * Math.sin(om * tLab + kk * x - 2 * kk * L) * eR * attR;
      return yi + yr;
    };

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dtRaw = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const prm = paramsRef.current;
      const muLive = prm.muG / 1000;
      const vLive = Math.sqrt(prm.tension / muLive);
      const lamLive = vLive / prm.freq;
      const kLive = (2 * Math.PI) / lamLive;
      const omLive = 2 * Math.PI * prm.freq;

      const clk = clockRef.current;
      if (!prm.paused && !clk.isDragging && dtRaw > 0) {
        const rate = prm.slowMo ? 0.3 : 1;
        clk.tLab += dtRaw * rate;
        clk.tEnv += dtRaw * rate * ENV_SLOW;
      }

      // Throttled sync to React DOM (every 6 frames)
      clk.frameCount++;
      if (clk.frameCount % 6 === 0) {
        const nN = Math.max(1, Math.round((2 * L * prm.freq) / vLive));
        const fN = (nN * vLive) / (2 * L);
        const det = Math.abs((prm.freq - fN) / fN) * 100;
        const yP = fieldAt(0.75 * L, clk.tLab, clk.tEnv, vLive, kLive, omLive, prm.amplitude, prm.endType);
        setReadout({
          v: Number(vLive.toFixed(2)),
          lambda: Number(lamLive.toFixed(3)),
          nNear: nN,
          fNear: Number(fN.toFixed(2)),
          detunePct: Number(det.toFixed(1)),
          resonant: det < 5,
          yProbe: Number(yP.toFixed(4)),
        });
      }

      // Dynamic DPR canvas rendering
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

      // Dark strings lab stage
      const BG = "#17171c";
      const PAPER = "#fafaf7";
      const MUTED = "rgba(250,250,247,0.55)";
      const HAIR = "rgba(250,250,247,0.10)";
      const ACCENT = "#a5b4fc";
      const NODE = "#34d399";
      const BELLY = "#fbbf24";
      ctx.fillStyle = BG;
      ctx.fillRect(0, 0, dispW, dispH);

      // Geometry
      const padL = 56;
      const padR = 44;
      const top = 46;
      const bottom = 42;
      const restY = top + (dispH - top - bottom) * 0.46;
      const vertScale = ((dispH - top - bottom) * 0.32) / A_MAX;
      const xToPx = (x: number) => padL + (x / L) * (dispW - padL - padR);

      // Faint grid
      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = padL; gx <= dispW - padR; gx += Math.max(24, (dispW - padL - padR) / 10)) {
        ctx.moveTo(gx, top - 12);
        ctx.lineTo(gx, dispH - bottom + 12);
      }
      for (let q = 0; q <= 4; q++) {
        const xx = padL + ((dispW - padL - padR) * q) / 4;
        ctx.moveTo(xx, top - 12);
        ctx.lineTo(xx, dispH - bottom + 12);
      }
      ctx.stroke();

      // Rest position (dashed)
      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = MUTED;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padL, restY);
      ctx.lineTo(dispW - padR, restY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Scale labels
      ctx.fillStyle = MUTED;
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText("x = 0", padL + 2, dispH - bottom + 22);
      ctx.textAlign = "right";
      ctx.fillText(`x = L = ${L.toFixed(1)} m`, dispW - padR - 2, dispH - bottom + 22);
      ctx.textAlign = "left";
      ctx.fillText(
        prm.isZh ? `A = ${(prm.amplitude * 100).toFixed(1)} cm (拖动左端圆柄)` : `A = ${(prm.amplitude * 100).toFixed(1)} cm (Griff links ziehen)`,
        padL,
        top - 22
      );

      // Propagation arrow (phase travels left to right)
      ctx.strokeStyle = ACCENT;
      ctx.fillStyle = ACCENT;
      ctx.lineWidth = 1.4;
      const ax0 = padL + 8;
      const ax1 = padL + 52;
      const ay = top - 8;
      ctx.beginPath();
      ctx.moveTo(ax0, ay);
      ctx.lineTo(ax1, ay);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax1, ay);
      ctx.lineTo(ax1 - 6, ay - 3.5);
      ctx.lineTo(ax1 - 6, ay + 3.5);
      ctx.closePath();
      ctx.fill();
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText(`v = ${vLive.toFixed(1)} m/s`, ax1 + 6, ay + 3.5);

      // Envelope curves (analytic standing envelope)
      const N = 160;
      if (prm.showEnvelope) {
        const sgn = prm.endType === "fixed" ? -1 : 1;
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = "rgba(165,180,252,0.65)";
        ctx.lineWidth = 1.1;
        for (const side of [1, -1]) {
          ctx.beginPath();
          for (let i = 0; i <= N; i++) {
            const x = (i / N) * L;
            const env =
              prm.amplitude *
              Math.sqrt(Math.max(0, 1 + R_END * R_END + 2 * sgn * R_END * Math.cos(2 * kLive * (L - x))));
            const xx = xToPx(x);
            const yy = restY - side * Math.min(dispH * 0.42, env * vertScale);
            if (i === 0) ctx.moveTo(xx, yy);
            else ctx.lineTo(xx, yy);
          }
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // String field: incident + reflected superposition
      ctx.strokeStyle = PAPER;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i <= N; i++) {
        const x = (i / N) * L;
        const y = fieldAt(x, clk.tLab, clk.tEnv, vLive, kLive, omLive, prm.amplitude, prm.endType);
        const xx = xToPx(x);
        const yy = restY - Math.max(-dispH * 0.44, Math.min(dispH * 0.44, y * vertScale));
        if (i === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      }
      ctx.stroke();

      // Entering front marker (envelope time-lapse position)
      const frontX = vLive * clk.tEnv;
      if (frontX < 2 * L) {
        const fx = xToPx(Math.min(L, frontX > L ? 2 * L - frontX : frontX));
        ctx.strokeStyle = "rgba(251,191,36,0.7)";
        ctx.lineWidth = 1.2;
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        ctx.moveTo(fx, top - 12);
        ctx.lineTo(fx, dispH - bottom + 12);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(251,191,36,0.9)";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText(prm.isZh ? "波前" : "Front", Math.min(fx + 3, dispW - 40), top - 14);
      }

      // Node / belly markers
      if (prm.showNodes) {
        const { nodes, bellies } = ((): { nodes: number[]; bellies: number[] } => {
          const nn: number[] = [];
          const bb: number[] = [];
          const lam = lamLive;
          if (prm.endType === "fixed") {
            for (let m = 0; m * lam <= 2 * L + 1e-9; m++) {
              const xn = L - (m * lam) / 2;
              if (xn >= -1e-9 && xn <= L + 1e-9) nn.push(Math.max(0, Math.min(L, xn)));
              const xb = L - ((2 * m + 1) * lam) / 4;
              if (xb >= -1e-9 && xb <= L + 1e-9) bb.push(Math.max(0, Math.min(L, xb)));
            }
          } else {
            for (let m = 0; m * lam <= 2 * L + 1e-9; m++) {
              const xb = L - (m * lam) / 2;
              if (xb >= -1e-9 && xb <= L + 1e-9) bb.push(Math.max(0, Math.min(L, xb)));
              const xn = L - ((2 * m + 1) * lam) / 4;
              if (xn >= -1e-9 && xn <= L + 1e-9) nn.push(Math.max(0, Math.min(L, xn)));
            }
          }
          return { nodes: nn.slice(0, 8), bellies: bb.slice(0, 8) };
        })();
        const nN = Math.max(1, Math.round((2 * L * prm.freq) / vLive));
        const fN = (nN * vLive) / (2 * L);
        const det = Math.abs((prm.freq - fN) / fN);
        const alpha = det < 0.05 ? 1 : det < 0.15 ? 0.55 : 0.3;
        ctx.globalAlpha = alpha;
        // Nodes: circles on the rest line
        ctx.strokeStyle = NODE;
        ctx.fillStyle = BG;
        ctx.lineWidth = 1.6;
        for (const xn of nodes) {
          const xx = xToPx(xn);
          ctx.beginPath();
          ctx.arc(xx, restY, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
        }
        // Bellies: diamonds on the rest line
        ctx.strokeStyle = BELLY;
        for (const xb of bellies) {
          const xx = xToPx(xb);
          ctx.beginPath();
          ctx.moveTo(xx, restY - 6);
          ctx.lineTo(xx + 5, restY);
          ctx.lineTo(xx, restY + 6);
          ctx.lineTo(xx - 5, restY);
          ctx.closePath();
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
        // Legend
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillStyle = NODE;
        ctx.fillText(prm.isZh ? "○ 节点 Knoten" : "○ Knoten", padL + 2, dispH - bottom + 12);
        ctx.fillStyle = BELLY;
        ctx.fillText(prm.isZh ? "◇ 腹点 Bauch" : "◇ Bauch", padL + 108, dispH - bottom + 12);
        // Resonance badge
        const badge = det < 0.05
          ? prm.isZh
            ? `谐振 n=${nN} Δ=${(det * 100).toFixed(1)}%`
            : `Resonanz n=${nN} Δ=${(det * 100).toFixed(1)}%`
          : prm.isZh
            ? `n=${nN} 失谐 Δ=${(det * 100).toFixed(1)}%`
            : `n=${nN} verstimmt Δ=${(det * 100).toFixed(1)}%`;
        ctx.font = "10px ui-monospace, monospace";
        ctx.textAlign = "right";
        ctx.fillStyle = det < 0.05 ? NODE : MUTED;
        ctx.fillText(badge, dispW - padR - 2, top - 22);
      }

      // Driver block at x = 0 (follows the field)
      const y0 = fieldAt(0, clk.tLab, clk.tEnv, vLive, kLive, omLive, prm.amplitude, prm.endType);
      const drvY = restY - Math.max(-dispH * 0.44, Math.min(dispH * 0.44, y0 * vertScale));
      ctx.fillStyle = "#27272a";
      ctx.strokeStyle = PAPER;
      ctx.lineWidth = 1.4;
      ctx.fillRect(padL - 30, drvY - 11, 22, 22);
      ctx.strokeRect(padL - 30, drvY - 11, 22, 22);
      // Draggable handle ring
      ctx.strokeStyle = ACCENT;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(padL - 19, drvY, 4.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.fillStyle = MUTED;
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(prm.isZh ? "驱动" : "Erreger", padL - 34, drvY + 26);

      // Right end: wall (fixed) or sliding ring on rod (free)
      const yL = fieldAt(L, clk.tLab, clk.tEnv, vLive, kLive, omLive, prm.amplitude, prm.endType);
      const endY = restY - Math.max(-dispH * 0.44, Math.min(dispH * 0.44, yL * vertScale));
      const ex = xToPx(L);
      if (prm.endType === "fixed") {
        ctx.fillStyle = "#3f3f46";
        ctx.fillRect(ex + 2, top - 12, 12, dispH - top - bottom + 24);
        ctx.strokeStyle = PAPER;
        ctx.lineWidth = 1.4;
        ctx.strokeRect(ex + 2, top - 12, 12, dispH - top - bottom + 24);
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let hy = top - 12; hy < dispH - bottom + 12; hy += 9) {
          ctx.moveTo(ex + 14, hy);
          ctx.lineTo(ex + 20, hy + 5);
        }
        ctx.stroke();
        ctx.fillStyle = MUTED;
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "right";
        ctx.fillText(prm.isZh ? "固定端" : "fest", dispW - 4, restY + 3);
      } else {
        ctx.strokeStyle = PAPER;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(ex, top - 12);
        ctx.lineTo(ex, dispH - bottom + 12);
        ctx.stroke();
        ctx.strokeStyle = BELLY;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(ex, endY, 6, 0, Math.PI * 2);
        ctx.stroke();
        ctx.fillStyle = MUTED;
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "right";
        ctx.fillText(prm.isZh ? "自由端" : "lose", dispW - 4, restY + 3);
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  // Pointer drag on the driver handle: sets drive amplitude A
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const padL = 56;
    const top = 46;
    const bottom = 42;
    const restY = top + (rect.height - top - bottom) * 0.46;
    const vertScale = ((rect.height - top - bottom) * 0.32) / A_MAX;
    // Grip zone around the driver block (left edge)
    if (px > padL - 48 && px < padL + 22 && Math.abs(py - restY) < rect.height * 0.45) {
      clockRef.current.isDragging = true;
      clockRef.current.dragRestY = restY;
      clockRef.current.dragScale = vertScale;
      const na = Math.max(A_MIN, Math.min(A_MAX, Math.abs(py - restY) / vertScale || A_MIN));
      setAmplitude(Number(na.toFixed(4)));
      e.currentTarget.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!clockRef.current.isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const py = e.clientY - rect.top;
    const { dragRestY, dragScale } = clockRef.current;
    const na = Math.max(A_MIN, Math.min(A_MAX, Math.abs(py - dragRestY) / dragScale));
    setAmplitude(Number(na.toFixed(4)));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    clockRef.current.isDragging = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* pointer already released */
    }
  };

  const endLabel = (t: EndType) => {
    if (t === "fixed") return isZh ? "固定端 (相位反转)" : "festes Ende (Phasensprung π)";
    return isZh ? "自由端 (无反转)" : "loses Ende (ohne Sprung)";
  };

  const handleExport = () => {
    const summary = isZh
      ? `绳波实验记录 (L = ${L.toFixed(1)} m, ${endLabel(endType)})：\n- 张力 T = ${tension} N，线密度 μ = ${muG} g/m，驱动频率 f = ${freq} Hz，振幅 A = ${(amplitude * 100).toFixed(1)} cm\n- 波速 v = √(T/μ) = ${readout.v} m/s；波长 λ = v/f = ${readout.lambda} m\n- 谐振判据 f_n = nv/2L：最近 n = ${readout.nNear}，f_${readout.nNear} = ${readout.fNear} Hz，失谐 Δ = ${readout.detunePct}% → ${readout.resonant ? "谐振，驻波节点/腹点清晰" : "非谐振，行波成分主导"}\n- 3L/4 处瞬时位移 y = ${(readout.yProbe * 100).toFixed(2)} cm。`
      : `Seilwellen-Protokoll (L = ${L.toFixed(1)} m, ${endLabel(endType)})：\n- Zugkraft T = ${tension} N, lineare Dichte μ = ${muG} g/m, Erregerfrequenz f = ${freq} Hz, Amplitude A = ${(amplitude * 100).toFixed(1)} cm\n- Wellengeschwindigkeit v = √(T/μ) = ${readout.v} m/s; Wellenlänge λ = v/f = ${readout.lambda} m\n- Resonanz f_n = nv/2L: nächstes n = ${readout.nNear}, f_${readout.nNear} = ${readout.fNear} Hz, Verstimmung Δ = ${readout.detunePct} % → ${readout.resonant ? "Resonanz, Knoten/Bäuche scharf" : "keine Resonanz, laufende Welle dominiert"}\n- Momentane Auslenkung bei 3L/4: y = ${(readout.yProbe * 100).toFixed(2)} cm.`;
    if (onExportFinding) {
      onExportFinding(summary);
    } else {
      void navigator.clipboard.writeText(summary);
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Stage + control panel */}
      <div className="grid grid-cols-12 gap-3 items-start">
        {/* Physics stage (8 cols open, 12 cols folded) */}
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            {/* Top title + toolbar */}
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "绳波：传播、反射与驻波" : "Seilwelle: Ausbreitung, Reflexion & stehende Welle"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--ink-muted)] whitespace-nowrap">
                  v = {readout.v.toFixed(1)} m/s | λ = {readout.lambda.toFixed(2)} m
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPanels((s) => !s)}
                className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)] whitespace-nowrap"
                title={showPanels ? (isZh ? "折叠面板" : "Panel einklappen") : (isZh ? "展开面板" : "Panel ausklappen")}
              >
                {showPanels ? "◧ 折叠侧栏" : "◩ 展开侧栏"}
              </button>
            </div>

            {/* Canvas stage */}
            <div className="w-full h-[420px] sm:h-[480px]">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="w-full h-full block cursor-grab active:cursor-grabbing touch-none select-none"
              />
            </div>

            {/* Bottom play / slow / reset bar */}
            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setPaused((s) => !s)}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] font-medium text-[var(--ink)] flex items-center gap-1.5"
                >
                  {paused ? <IconPlay /> : <IconPause />}
                  {paused ? (isZh ? "继续" : "Fortsetzen") : (isZh ? "暂停" : "Pause")}
                </button>
                <button
                  type="button"
                  onClick={() => setSlowMo((s) => !s)}
                  className={`px-2.5 py-1 border border-[var(--line)] font-medium flex items-center gap-1.5 ${
                    slowMo ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--paper-subtle)] text-[var(--ink)]"
                  }`}
                >
                  <IconSlow />
                  {slowMo ? "0.3x" : "1.0x"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] flex items-center gap-1.5"
                >
                  <IconReset />
                  {isZh ? "重置" : "Reset"}
                </button>
                <label className="hidden sm:flex items-center gap-1 text-[11px] text-[var(--ink-muted)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showNodes}
                    onChange={(e) => setShowNodes(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  {isZh ? "节点/腹点" : "Knoten"}
                </label>
                <label className="hidden sm:flex items-center gap-1 text-[11px] text-[var(--ink-muted)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showEnvelope}
                    onChange={(e) => setShowEnvelope(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  {isZh ? "包络" : "Hülle"}
                </label>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>
                  f<sub>{readout.nNear}</sub> = <strong className="text-[var(--accent)]">{readout.fNear.toFixed(2)}</strong> Hz
                </span>
                <span>
                  Δ = <strong>{readout.detunePct.toFixed(1)}</strong> %
                </span>
                <span>{readout.resonant ? (isZh ? "谐振" : "Resonanz") : isZh ? "行波" : "laufend"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right parameter panel (4 cols) */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "物理参数调控" : "Physikalische Parameter"}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink-muted)]">{isZh ? "张力 (T)" : "Zugkraft (T)"}</span>
                  <span className="font-medium tabular-nums text-[var(--accent)]">{tension.toFixed(1)} N</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="60"
                  step="0.5"
                  value={tension}
                  onChange={(e) => setTension(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink-muted)]">{isZh ? "线密度 (μ)" : "Liniendichte (μ)"}</span>
                  <span className="font-medium tabular-nums text-[var(--accent)]">{muG.toFixed(0)} g/m</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="200"
                  step="1"
                  value={muG}
                  onChange={(e) => setMuG(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink-muted)]">{isZh ? "驱动频率 (f)" : "Erregerfrequenz (f)"}</span>
                  <span className="font-medium tabular-nums text-[var(--accent)]">{freq.toFixed(1)} Hz</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="30"
                  step="0.1"
                  value={freq}
                  onChange={(e) => setFreq(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink-muted)]">{isZh ? "驱动振幅 (A)" : "Amplitude (A)"}</span>
                  <span className="font-medium tabular-nums text-[var(--ink)]">{(amplitude * 100).toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min={A_MIN}
                  max={A_MAX}
                  step="0.001"
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
                <p className="text-[11px] font-mono text-[var(--ink-muted)] mt-1">
                  {isZh ? "也可直接上下拖动左端圆柄。" : "Oder den Griff am linken Ende vertikal ziehen."}
                </p>
              </div>

              <div className="mb-1">
                <div className="text-xs font-mono text-[var(--ink-muted)] mb-1.5">
                  {isZh ? "右端边界" : "Rechtes Ende"}
                </div>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                  {(["fixed", "free"] as EndType[]).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setEndType(t)}
                      className={`py-1 border border-[var(--line)] tabular-nums ${
                        endType === t
                          ? "bg-[var(--ink)] text-[var(--paper)] font-medium"
                          : "bg-[var(--paper-subtle)] text-[var(--ink)]"
                      }`}
                    >
                      {t === "fixed" ? (isZh ? "固定端" : "fest") : isZh ? "自由端" : "lose"}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] font-mono tabular-nums text-[var(--ink-muted)] mt-1.5">
                  {endLabel(endType)} · v = {v.toFixed(1)} m/s · λ = {lambda.toFixed(2)} m
                </p>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] mb-2">
                {isZh ? "谐振频率 f_n = nv/2L (Hz)" : "Resonanz f_n = nv/2L (Hz)"}
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                {[1, 2, 3, 4].map((n) => {
                  const fn = (n * v) / (2 * L);
                  const active = n === nNear;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setFreq(Number(fn.toFixed(1)))}
                      title={isZh ? "点击跳到该谐振频率" : "Klicken: Frequenz übernehmen"}
                      className={`w-full flex justify-between tabular-nums px-2 py-1 border border-[var(--line)] ${
                        active
                          ? "bg-[var(--ink)] text-[var(--paper)] font-medium"
                          : "bg-[var(--paper-subtle)] text-[var(--ink)]"
                      }`}
                    >
                      <span>n = {n}</span>
                      <span>{fn.toFixed(2)} Hz</span>
                    </button>
                  );
                })}
                <p className="tabular-nums text-[var(--ink-muted)] pt-1">
                  Δ = {detunePct.toFixed(1)} % → {resonant ? (isZh ? "谐振" : "Resonanz") : isZh ? "失谐" : "verstimmt"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom four-card bilingual pedagogy scaffold */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel &amp; Gesetz</div>
          <div className="font-serif tracking-tight font-medium text-[var(--ink)] mb-1">
            {isZh ? "波速与谐振条件" : "Wellengeschwindigkeit & Resonanz"}
          </div>
          <MathHtml code="v = \sqrt{\frac{T}{\mu}}" display={true} cacheKey="wavestring:speed-formula" />
          <MathHtml code="f_n = n\,\frac{v}{2L}\quad (n = 1, 2, 3, \dots)" display={true} cacheKey="wavestring:resonance-formula" />
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "张力越大波越快，绳越重波越慢；驱动频率命中 f_n 时入射波与反射波叠成驻波。"
              : "Größeres T macht die Welle schneller, größeres μ langsamer; trifft f auf f_n, bilden Hin- und Rückwelle eine stehende Welle."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif tracking-tight font-medium text-[var(--ink)] mb-1">
            {isZh ? "EF 力学：机械波" : "EF Mechanik: Wellen"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">beschreiben, berechnen, beurteilen</code>
            <p className="mt-1">
              {isZh
                ? "描述固定/自由端反射的相位行为，由 T 与 μ 计算 v，再用 f_n = nv/2L 判断谐振并解释节点位置。"
                : "Beschreibe die Reflexion am festen/losen Ende, berechne v aus T und μ und beurteile mit f_n = nv/2L die Resonanz sowie die Knotenlagen."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif tracking-tight font-medium text-[var(--ink)] mb-1">
            {isZh ? "紧则快、重则慢，对上就驻" : "Straff = schnell, Resonanz = stehend"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "绳拉得紧跑得快，绳坠得重跑得慢：v = √(T/μ)。固定端反射翻半个波，自由端不翻；频率对上 f_n，波就定住成驻波，圆圈是节点、菱形是腹点。"
              : "Straffes Seil trägt schnell, schweres Seil trägt langsam: v = √(T/μ). Festes Ende spiegelt mit Phasensprung, loses ohne; trifft f auf f_n, steht die Welle: Kreise sind Knoten, Rauten sind Bäuche."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif tracking-tight font-medium text-[var(--ink)] mb-1">
              {isZh ? "导出实验结论" : "Befunde exportieren"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh
                ? "将当前张力、线密度、波速与谐振判定直接发给 AI 助教深入分析。"
                : "Übertrage T, μ, v und Resonanzurteil direkt in den KI-Tutor zur vertieften Analyse."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors"
          >
            {isZh ? "发送给助教 ↗" : "An Tutor senden ↗"}
          </button>
        </div>
      </div>

      {/* Hidden analytic marker summary for tests (no visual cost) */}
      <span className="hidden" data-testid="wavestring-markers">
        {markerPositions(lambda, endType).nodes.length}:{markerPositions(lambda, endType).bellies.length}
      </span>
    </div>
  );
}

export default WaveStringSim;
