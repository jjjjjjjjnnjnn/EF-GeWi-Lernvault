import { useRef, useEffect, useState, useCallback } from "react";
import type { PointerEvent as RPE } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface GasPropertiesSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface Particle {
  x: number;
  y: number;
  ux: number;
  uy: number;
  f: number;
}

interface Measured {
  rate: number;
  pStoss: number;
  simTime: number;
}

interface PhysState {
  parts: Particle[];
  hits: number;
  impulse: number;
  winDt: number;
  emaP: number;
  time: number;
  frame: number;
  flash: number;
  dragging: boolean;
}

interface BoylePoint {
  v: number;
  p: number;
}

const T0 = 300;
const BASE_V = 95;
const SLOW_FACTOR = 0.3;
const K_GAS = 0.02;
const K_CAL = 84;
const R_UNIV = 8.314;
const M_N2 = 0.028;
const V_MIN = 0.5;
const V_MAX = 2.5;
const T_MIN = 150;
const T_MAX = 600;
const N_MIN = 10;
const N_MAX = 80;

function theoryP(n: number, t: number, v: number): number {
  if (v <= 0) return 0;
  return (n * K_GAS * t) / v;
}

function vrmsN2(t: number): number {
  return Math.sqrt((3 * R_UNIV * t) / M_N2);
}

function clampNum(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

export function GasPropertiesSim({ lang, studioMode = true, onExportFinding }: GasPropertiesSimProps) {
  void studioMode;
  const isZh = lang === "zh";

  const [volumeL, setVolumeL] = useState<number>(1.5);
  const [tempK, setTempK] = useState<number>(300);
  const [countN, setCountN] = useState<number>(40);
  const [mode, setMode] = useState<"explore" | "boyle">("explore");
  const [paused, setPaused] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [points, setPoints] = useState<BoylePoint[]>([]);

  const [measured, setMeasured] = useState<Measured>({ rate: 0, pStoss: 0, simTime: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isZhRef = useRef(isZh);
  useEffect(() => {
    isZhRef.current = isZh;
  }, [isZh]);
  const physRef = useRef<PhysState>({
    parts: [],
    hits: 0,
    impulse: 0,
    winDt: 0,
    emaP: 0,
    time: 0,
    frame: 0,
    flash: 0,
    dragging: false,
  });
  const paramRef = useRef({ V: 1.5, T: 300, N: 40 });
  const ctlRef = useRef({ paused: false, slow: false });

  useEffect(() => {
    paramRef.current.V = volumeL;
    paramRef.current.T = tempK;
    paramRef.current.N = countN;
  }, [volumeL, tempK, countN]);

  useEffect(() => {
    ctlRef.current.paused = paused;
    ctlRef.current.slow = slowMo;
  }, [paused, slowMo]);

  const pTheory = theoryP(countN, tempK, volumeL);
  const pvProd = pTheory * volumeL;
  const vRms = vrmsN2(tempK);

  const handleReset = useCallback(() => {
    const p = physRef.current;
    p.hits = 0;
    p.impulse = 0;
    p.winDt = 0;
    p.emaP = 0;
    p.time = 0;
    p.flash = 0;
    p.dragging = false;
    setVolumeL(1.5);
    setTempK(300);
    setCountN(40);
    setMeasured({ rate: 0, pStoss: 0, simTime: 0 });
  }, []);

  const enterBoyle = useCallback(() => {
    setMode("boyle");
    setTempK(300);
  }, []);

  const recordPoint = useCallback(() => {
    const v = paramRef.current.V;
    const n = paramRef.current.N;
    const t = paramRef.current.T;
    const p = theoryP(n, t, v);
    setPoints((prev) => [...prev.slice(-7), { v: Number(v.toFixed(2)), p: Number(p.toFixed(1)) }]);
  }, []);

  useEffect(() => {
    let animId = 0;
    let lastTs = -1;

    const spawn = (lx: number, px: number, ty: number, by: number): Particle => {
      const r = 3.2;
      const x = lx + r + Math.random() * Math.max(1, px - lx - 2 * r);
      const y = ty + r + Math.random() * Math.max(1, by - ty - 2 * r);
      const a = Math.random() * Math.PI * 2;
      return { x, y, ux: Math.cos(a), uy: Math.sin(a), f: 0.65 + Math.random() * 0.7 };
    };

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (lastTs < 0) lastTs = now;
      const rawDt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const ctl = ctlRef.current;
      const par = paramRef.current;
      const dt = ctl.slow ? rawDt * SLOW_FACTOR : rawDt;
      const phys = physRef.current;

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

      const LX = 56;
      const TY = 40;
      const BY = dispH - 52;
      const trackW = Math.max(60, dispW - LX - 24 - 120);
      const frac = (par.V - V_MIN) / (V_MAX - V_MIN);
      const PX = LX + 24 + frac * trackW;
      const CH = Math.max(40, BY - TY);
      const r = 3.2;

      if (!ctl.paused) {
        const target = Math.round(par.N);
        while (phys.parts.length < target) {
          let added = 0;
          while (phys.parts.length < target && added < 5) {
            phys.parts.push(spawn(LX, PX, TY, BY));
            added += 1;
          }
          break;
        }
        if (phys.parts.length > target) {
          phys.parts.length = target;
        }

        const vScale = BASE_V * Math.sqrt(par.T / T0);
        for (let i = 0; i < phys.parts.length; i += 1) {
          const q = phys.parts[i];
          const vx = q.ux * q.f * vScale;
          const vy = q.uy * q.f * vScale;
          q.x += vx * dt;
          q.y += vy * dt;
          if (q.x - r <= LX) {
            q.x = LX + r;
            q.ux = Math.abs(q.ux);
          }
          if (q.x + r >= PX) {
            q.x = PX - r;
            q.ux = -Math.abs(q.ux);
            phys.hits += 1;
            phys.impulse += 2 * Math.abs(vx);
            phys.flash = 1;
          }
          if (q.y - r <= TY) {
            q.y = TY + r;
            q.uy = Math.abs(q.uy);
          }
          if (q.y + r >= BY) {
            q.y = BY - r;
            q.uy = -Math.abs(q.uy);
          }
        }
        phys.time += dt;
        phys.winDt += dt;
        phys.flash = Math.max(0, phys.flash - rawDt * 5);
      } else {
        for (let i = 0; i < phys.parts.length; i += 1) {
          const q = phys.parts[i];
          q.x = clampNum(q.x, LX + r, Math.max(LX + r, PX - r));
          q.y = clampNum(q.y, TY + r, Math.max(TY + r, BY - r));
        }
      }

      phys.frame += 1;
      if (phys.frame % 6 === 0) {
        const wdt = Math.max(1e-6, phys.winDt);
        const rate = phys.hits / wdt;
        const rawP = (phys.impulse / (CH * wdt)) * K_CAL;
        phys.emaP = phys.emaP === 0 ? rawP : phys.emaP + 0.35 * (rawP - phys.emaP);
        setMeasured({
          rate: Number(rate.toFixed(1)),
          pStoss: Number(phys.emaP.toFixed(1)),
          simTime: Number(phys.time.toFixed(1)),
        });
        phys.hits = 0;
        phys.impulse = 0;
        phys.winDt = 0;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, dispW, dispH);

      ctx.fillStyle = "#FAFAFA";
      ctx.fillRect(0, 0, dispW, dispH);

      ctx.strokeStyle = "#E4E4E7";
      ctx.lineWidth = 1;
      for (let gx = 12; gx < dispW; gx += 24) {
        ctx.beginPath();
        ctx.moveTo(gx, 8);
        ctx.lineTo(gx, dispH - 8);
        ctx.stroke();
      }
      for (let gy = 12; gy < dispH; gy += 24) {
        ctx.beginPath();
        ctx.moveTo(8, gy);
        ctx.lineTo(dispW - 8, gy);
        ctx.stroke();
      }

      const hot = par.T > 400;
      const cold = par.T < 230;
      const gasCol = hot ? "#9f1239" : cold ? "#1e40af" : "#065f46";

      ctx.fillStyle = "rgba(228, 228, 231, 0.55)";
      ctx.fillRect(LX, TY, Math.max(0, PX - LX), CH);

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(LX, TY);
      ctx.lineTo(PX, TY);
      ctx.moveTo(LX, BY);
      ctx.lineTo(PX, BY);
      ctx.moveTo(LX, TY);
      ctx.lineTo(LX, BY);
      ctx.stroke();

      ctx.fillStyle = "#3f3f46";
      ctx.fillRect(PX, TY - 6, 14, CH + 12);
      ctx.fillStyle = `rgba(159, 18, 57, ${(phys.flash * 0.55).toFixed(3)})`;
      ctx.fillRect(PX - 3, TY - 6, 5, CH + 12);
      ctx.fillStyle = "#71717A";
      ctx.fillRect(PX + 14, TY + CH / 2 - 4, Math.max(0, dispW - PX - 22), 8);
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      for (let hy = TY - 2; hy < BY + 4; hy += 8) {
        ctx.beginPath();
        ctx.moveTo(PX + 3, hy);
        ctx.lineTo(PX + 11, hy + 5);
        ctx.stroke();
      }

      ctx.fillStyle = "#3f3f46";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(isZhRef.current ? "活塞 (拖动)" : "Kolben (ziehen)", PX - 4, TY - 12);

      for (let i = 0; i < phys.parts.length; i += 1) {
        const q = phys.parts[i];
        ctx.fillStyle = gasCol;
        ctx.beginPath();
        ctx.arc(q.x, q.y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const th = 120;
      const tx = 14;
      const tyTop = TY;
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(tx, tyTop, 12, th);
      const tFrac = (par.T - T_MIN) / (T_MAX - T_MIN);
      const fillH = Math.max(2, tFrac * (th - 4));
      ctx.fillStyle = gasCol;
      ctx.fillRect(tx + 2, tyTop + th - 2 - fillH, 8, fillH);
      ctx.fillStyle = "#3f3f46";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`${Math.round(par.T)} K`, tx - 2, tyTop + th + 14);

      ctx.strokeStyle = "#71717A";
      ctx.lineWidth = 1;
      const dimY = BY + 26;
      ctx.beginPath();
      ctx.moveTo(LX, dimY);
      ctx.lineTo(PX, dimY);
      ctx.moveTo(LX, dimY - 4);
      ctx.lineTo(LX, dimY + 4);
      ctx.moveTo(PX, dimY - 4);
      ctx.lineTo(PX, dimY + 4);
      ctx.stroke();
      ctx.fillStyle = "#3f3f46";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(`V = ${par.V.toFixed(2)} L`, (LX + PX) / 2, dimY + 16);

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const pistonGeom = (clientX: number, clientY: number): { over: boolean; v: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { over: false, v: volumeL };
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const LX = 56;
    const TY = 40;
    const BY = rect.height - 52;
    const trackW = Math.max(60, rect.width - LX - 24 - 120);
    const frac = (paramRef.current.V - V_MIN) / (V_MAX - V_MIN);
    const PX = LX + 24 + frac * trackW;
    const over = x >= PX - 22 && x <= PX + 48 && y >= TY - 16 && y <= BY + 16;
    const nv = V_MIN + ((x - (LX + 24)) / trackW) * (V_MAX - V_MIN);
    return { over, v: clampNum(nv, V_MIN, V_MAX) };
  };

  const handlePointerDown = (e: RPE<HTMLCanvasElement>) => {
    const hit = pistonGeom(e.clientX, e.clientY);
    if (!hit.over) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    physRef.current.dragging = true;
    setVolumeL(Number(hit.v.toFixed(2)));
  };

  const handlePointerMove = (e: RPE<HTMLCanvasElement>) => {
    if (!physRef.current.dragging) return;
    const hit = pistonGeom(e.clientX, e.clientY);
    setVolumeL(Number(hit.v.toFixed(2)));
  };

  const handlePointerUp = (e: RPE<HTMLCanvasElement>) => {
    physRef.current.dragging = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* noop */
    }
  };

  const boyleC = countN * K_GAS * tempK;
  const boyleMean = points.length > 0 ? points.reduce((s, q) => s + q.p * q.v, 0) / points.length : 0;
  const boyleDev =
    points.length > 0 && boyleMean > 0
      ? Math.max(...points.map((q) => Math.abs(q.p * q.v - boyleMean))) / boyleMean
      : 0;
  const boyleOk = points.length >= 3 && boyleDev <= 0.1;

  const chartW = 260;
  const chartH = 150;
  const padL = 32;
  const padB = 20;
  const padT = 10;
  const padR = 8;
  const pMax = Math.max(10, (boyleC / V_MIN) * 1.15);
  const chartX = (v: number) => padL + ((v - V_MIN) / (V_MAX - V_MIN)) * (chartW - padL - padR);
  const chartY = (p: number) => chartH - padB - (clampNum(p, 0, pMax) / pMax) * (chartH - padT - padB);
  let curvePath = "";
  for (let i = 0; i <= 40; i += 1) {
    const v = V_MIN + ((V_MAX - V_MIN) * i) / 40;
    const p = boyleC / v;
    curvePath += `${i === 0 ? "M" : "L"}${chartX(v).toFixed(1)} ${chartY(p).toFixed(1)} `;
  }

  const generateReport = (): string => {
    const pts =
      points.length > 0
        ? points.map((q) => `(V=${q.v.toFixed(2)}L,p=${q.p.toFixed(1)}kPa,pV=${(q.p * q.v).toFixed(1)})`).join("; ")
        : isZh
          ? "无记录点"
          : "keine Punkte";
    if (isZh) {
      return (
        `气体性质实验记录:\n` +
        `- V=${volumeL.toFixed(2)} L, T=${tempK} K, N=${countN}\n` +
        `- 理论压强 p=nRT/V=${pTheory.toFixed(1)} kPa, pV=${pvProd.toFixed(1)} kPa*L\n` +
        `- 碰撞模型压强约 ${measured.pStoss.toFixed(1)} kPa, 器壁碰撞率 ${measured.rate.toFixed(1)}/s\n` +
        `- 氮气分子方均根速率 v_rms=${vRms.toFixed(0)} m/s (∝√T)\n` +
        `- 等温记录点: ${pts}\n` +
        `- 结论: T 恒定时 p 与 V 成反比, pV 近似为常量; 升温使分子速率按 √T 增大, 碰撞更频繁则压强升高.`
      );
    }
    return (
      `Gas-Messprotokoll:\n` +
      `- V=${volumeL.toFixed(2)} L, T=${tempK} K, N=${countN}\n` +
      `- Theorie p=nRT/V=${pTheory.toFixed(1)} kPa, pV=${pvProd.toFixed(1)} kPa*L\n` +
      `- Stossmodell p=${measured.pStoss.toFixed(1)} kPa, Wandrate=${measured.rate.toFixed(1)}/s\n` +
      `- v_rms(N2)=${vRms.toFixed(0)} m/s (skaliert mit sqrt(T))\n` +
      `- Isotherme Punkte: ${pts}\n` +
      `- Befund: Bei konstantem T gilt p proportional zu 1/V, pV bleibt konstant; hoehere T erhoeht v und damit p.`
    );
  };

  const handleExport = () => {
    const text = generateReport();
    if (onExportFinding) {
      onExportFinding(text);
      return;
    }
    try {
      void navigator.clipboard?.writeText(text);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "理想气体状态方程与活塞实验室" : "Ideales Gasgesetz und Kolbenlabor"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--ink-muted)] whitespace-nowrap">
                  V={volumeL.toFixed(2)}L T={tempK}K N={countN} p={pTheory.toFixed(1)}kPa
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPanels(!showPanels)}
                className="shrink-0 px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                title={showPanels ? (isZh ? "折叠侧栏" : "Seitenleiste einklappen") : (isZh ? "展开侧栏" : "Seitenleiste ausklappen")}
              >
                {showPanels ? (isZh ? "◧ 折叠侧栏" : "◧ Seitenleiste") : (isZh ? "◩ 展开侧栏" : "◩ Seitenleiste")}
              </button>
            </div>

            <div className="w-full h-[420px] sm:h-[480px]">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="w-full h-full block cursor-grab active:cursor-grabbing touch-none select-none"
              />
            </div>

            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-mono">
                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] font-medium text-[var(--ink)]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {paused ? <path d="M4.5 3.5 L11.5 8 L4.5 12.5 Z" /> : <path d="M5 3.5 V12.5 M11 3.5 V12.5" />}
                  </svg>
                  {paused ? (isZh ? "继续" : "Start") : (isZh ? "暂停" : "Pause")}
                </button>
                <button
                  type="button"
                  onClick={() => setSlowMo(!slowMo)}
                  aria-pressed={slowMo}
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 border font-medium ${
                    slowMo
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                      : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                  }`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="8" cy="8" r="5.2" />
                    <path d="M8 5.2 V8 L9.8 9.2" />
                  </svg>
                  0.3x
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M13.2 8 A5.2 5.2 0 1 1 8 2.8" />
                    <path d="M8 1.4 V4.2 H10.8" />
                  </svg>
                  {isZh ? "重置" : "Reset"}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>
                  p<span className="text-[var(--ink-muted)]">{isZh ? "理论" : "th"}</span>=
                  <strong className="text-[#1e40af]">{pTheory.toFixed(1)}</strong>kPa
                </span>
                <span>
                  p<span className="text-[var(--ink-muted)]">{isZh ? "碰撞" : "st"}</span>=
                  <strong className="text-[#9f1239]">{measured.pStoss.toFixed(1)}</strong>kPa
                </span>
                <span>
                  {isZh ? "碰撞率" : "Rate"}=<strong className="text-[#3f3f46]">{measured.rate.toFixed(1)}</strong>/s
                </span>
                <span>
                  pV=<strong className="text-[#065f46]">{pvProd.toFixed(1)}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isZh ? "探究模式" : "Untersuchungsmodus"}
              </div>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setMode("explore")}
                  className={`py-1 border ${mode === "explore" ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                >
                  {isZh ? "自由探索" : "Erkunden"}
                </button>
                <button
                  type="button"
                  onClick={enterBoyle}
                  className={`py-1 border ${mode === "boyle" ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                >
                  {isZh ? "等温验证" : "Boyle-Nachweis"}
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {mode === "boyle"
                  ? isZh
                    ? "等温线 T=300K 已锁定, n 锁定。拖动活塞改变 V, 记录至少 3 个点, 检验 pV 是否为常量。"
                    : "Isotherme T=300K und n fixiert. Kolben ziehen, V aendern, mindestens 3 Punkte speichern, pV auf Konstanz pruefen."
                  : isZh
                    ? "自由调节 V、T、n, 观察分子速率与压强变化。活塞可直接在画布中拖动。"
                    : "V, T und n frei variieren und Rate sowie Druck beobachten. Kolben direkt in der Szene ziehen."}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "物理参数调控" : "Physikalische Parameter"}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "活塞容积 V" : "Kolbenvolumen V"}</span>
                  <span className="font-medium text-[#065f46]">{volumeL.toFixed(2)} L</span>
                </div>
                <input
                  type="range"
                  min={V_MIN}
                  max={V_MAX}
                  step="0.05"
                  value={volumeL}
                  onChange={(e) => setVolumeL(Number(e.target.value))}
                  className="w-full accent-[#065f46]"
                  aria-label={isZh ? "活塞容积" : "Kolbenvolumen"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                  <span>0.50 L</span>
                  <span>2.50 L</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "分子数 N" : "Teilchenzahl N"}</span>
                  <span className="font-medium text-[#1e40af]">{countN}</span>
                </div>
                <input
                  type="range"
                  min={N_MIN}
                  max={N_MAX}
                  step="5"
                  value={countN}
                  disabled={mode === "boyle"}
                  onChange={(e) => setCountN(Number(e.target.value))}
                  className="w-full accent-[#1e40af] disabled:opacity-40"
                  aria-label={isZh ? "分子数" : "Teilchenzahl"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                  <span>10</span>
                  <span>80</span>
                </div>
              </div>

              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "绝对温度 T" : "Temperatur T"}</span>
                  <span className="font-medium text-[#9f1239]">{tempK} K</span>
                </div>
                <input
                  type="range"
                  min={T_MIN}
                  max={T_MAX}
                  step="10"
                  value={tempK}
                  disabled={mode === "boyle"}
                  onChange={(e) => setTempK(Number(e.target.value))}
                  className="w-full accent-[#9f1239] disabled:opacity-40"
                  aria-label={isZh ? "绝对温度" : "Temperatur"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                  <span>150 K</span>
                  <span>600 K</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    disabled={mode === "boyle"}
                    onClick={() => setTempK(200)}
                    className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] disabled:opacity-40"
                  >
                    {isZh ? "低温" : "kalt"} 200
                  </button>
                  <button
                    type="button"
                    disabled={mode === "boyle"}
                    onClick={() => setTempK(300)}
                    className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] disabled:opacity-40"
                  >
                    300
                  </button>
                  <button
                    type="button"
                    disabled={mode === "boyle"}
                    onClick={() => setTempK(500)}
                    className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] disabled:opacity-40"
                  >
                    {isZh ? "高温" : "heiss"} 500
                  </button>
                </div>
              </div>

              <div className="border-t border-[var(--line)] mt-3 pt-2 font-mono tabular-nums text-[11px] text-[var(--ink)] space-y-1">
                <div className="flex justify-between">
                  <span>p = nRT/V</span>
                  <span className="text-[#1e40af]">{pTheory.toFixed(1)} kPa</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "碰撞模型压强" : "Stossmodell p"}</span>
                  <span className="text-[#9f1239]">{measured.pStoss.toFixed(1)} kPa</span>
                </div>
                <div className="flex justify-between">
                  <span>v_rms (N2)</span>
                  <span className="text-[#065f46]">{vRms.toFixed(0)} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "仿真时间" : "Simzeit"}</span>
                  <span>{measured.simTime.toFixed(1)} s</span>
                </div>
              </div>
            </div>

            {mode === "boyle" && (
              <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
                <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">
                  {isZh ? "Boyle-Mariotte 等温验证" : "Boyle-Mariotte Nachweis"}
                </div>
                <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full text-[var(--ink-muted)]" role="img" aria-label={isZh ? "压强体积等温曲线" : "p-V-Isotherme"}>
                  <line x1={padL} y1={padT} x2={padL} y2={chartH - padB} stroke="currentColor" strokeWidth="1" />
                  <line x1={padL} y1={chartH - padB} x2={chartW - padR} y2={chartH - padB} stroke="currentColor" strokeWidth="1" />
                  <path d={curvePath} fill="none" stroke="#1e40af" strokeWidth="1.5" />
                  {[0.5, 1.0, 1.5, 2.0, 2.5].map((v) => (
                    <text key={v} x={chartX(v)} y={chartH - 6} fontSize="8" textAnchor="middle" fill="currentColor" fontFamily="ui-monospace, monospace">
                      {v.toFixed(1)}
                    </text>
                  ))}
                  {[0, pMax / 2, pMax].map((p) => (
                    <text key={p} x={padL - 3} y={chartY(p) + 3} fontSize="8" textAnchor="end" fill="currentColor" fontFamily="ui-monospace, monospace">
                      {p.toFixed(0)}
                    </text>
                  ))}
                  <text x={chartW - padR} y={chartH - 6} fontSize="8" textAnchor="end" fill="currentColor" fontFamily="ui-monospace, monospace">
                    V/L
                  </text>
                  <text x={padL - 3} y={padT + 4} fontSize="8" textAnchor="end" fill="currentColor" fontFamily="ui-monospace, monospace">
                    kPa
                  </text>
                  {points.map((q, i) => (
                    <circle key={i} cx={chartX(q.v)} cy={chartY(q.p)} r="3" fill="#9f1239" />
                  ))}
                  <circle cx={chartX(volumeL)} cy={chartY(pTheory)} r="3.5" fill="none" stroke="#065f46" strokeWidth="1.5" />
                </svg>
                <div className="mt-2 flex items-center gap-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={recordPoint}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M8 2.5 V13.5 M2.5 8 H13.5" />
                    </svg>
                    {isZh ? "记录测点" : "Punkt speichern"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setPoints([])}
                    className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                  >
                    {isZh ? "清除" : "Loeschen"}
                  </button>
                  <span className="tabular-nums text-[var(--ink)]">
                    n={points.length} {isZh ? "偏差" : "Abw"}={(boyleDev * 100).toFixed(1)}%
                  </span>
                </div>
                {points.length > 0 && (
                  <div className="mt-1.5 font-mono tabular-nums text-[10px] text-[var(--ink-muted)] leading-relaxed">
                    {points.map((q, i) => (
                      <span key={i} className="mr-2">
                        P{i + 1}:{q.v.toFixed(2)}L/{q.p.toFixed(0)}kPa
                      </span>
                    ))}
                  </div>
                )}
                <p className={`mt-1.5 text-[11px] font-mono ${boyleOk ? "text-[#065f46]" : "text-[var(--ink-muted)]"}`}>
                  {boyleOk
                    ? isZh
                      ? "状态: 已验证 pV 为常量 (偏差<10%)"
                      : "Status: pV konstant verifiziert (Abw < 10%)"
                    : isZh
                      ? "状态: 需至少 3 个测点且偏差<10%"
                      : "Status: mind. 3 Punkte, Abw < 10% noetig"}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel und Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "理想气体状态方程" : "Ideale Gasgleichung"}
          </div>
          <div className="mb-1.5">
            <MathHtml code="p \cdot V = n \cdot R \cdot T" display={true} cacheKey="gas:ideal-pVnRT" />
            <MathHtml code="p \propto 1/V \;\; (T = const)" display={true} cacheKey="gas:boyle-pV" />
            <MathHtml code="v_{rms} = \sqrt{3RT/M}" display={true} cacheKey="gas:vrms-kinetic" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "分子速率按 √T 缩放; 压强来自器壁碰撞动量流, 体积减半则碰撞率倍增, 压强倍增。"
              : "Teilchengeschwindigkeit skaliert mit sqrt(T); Druck ist Impulsstrom der Wandstoesse, halbiertes V verdoppelt die Rate und damit p."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "热力学: 气体定律探究" : "Thermodynamik: Gasgesetze"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen, berechnen, begruenden</code>
            <p className="mt-1">
              {isZh
                ? "典型任务: 用测点数据论证等温下 pV 为常量, 由 p-V 双曲线求 nRT, 并解释升温增压的分子碰撞机制。"
                : "Aufgabe: Weise mit Messpunkten pV=const bei fester T nach, bestimme nRT aus der Hyperbel und erklaere den Druckanstieg mit T kinetisch."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "压强就是撞墙" : "Druck heisst Wandstoesse"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "人多撞得多, 天热跑得快撞得狠, 屋小转不开撞得勤。记作: 多、快、小则压强涨; 等温压体积, 乘积 pV 不动。"
              : "Mehr Teilchen, schnellere Teilchen, kleinerer Raum: alles erhoeht die Stossrate und damit p. Isotherm bleibt das Produkt pV konstant."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isZh ? "导出测量结论" : "Befunde exportieren"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh
                ? "把当前 V、T、N 与理论/碰撞压强、等温测点发给 AI 助教继续分析。"
                : "Sende V, T, N sowie Theorie- und Stosswerte plus Isothermen-Punkte an den KI-Tutor zur Analyse."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 8 H13" />
              <path d="M9 4 L13 8 L9 12" />
            </svg>
            {isZh ? "发送给助教" : "An Tutor senden"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default GasPropertiesSim;
