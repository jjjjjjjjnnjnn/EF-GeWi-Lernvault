import { useRef, useEffect, useState, useCallback } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface PendulumLabSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface Readout {
  angleDeg: number;
  theory: number;
  measured: number;
  cycles: number;
  speed: number;
  eKin: number;
  ePot: number;
  eTotal: number;
  simTime: number;
}

interface PhysState {
  theta: number;
  omega: number;
  time: number;
  lastPass: number;
  measuredPeriod: number;
  cycles: number;
  gateFlash: number;
  isDragging: boolean;
  trail: Array<{ x: number; y: number }>;
}

const INIT_ANGLE = (30 * Math.PI) / 180;
const MAX_ANGLE = (80 * Math.PI) / 180;
const SLOW_FACTOR = 0.3;

function theoryPeriod(L: number, g: number): number {
  if (L <= 0 || g <= 0) return 0;
  return 2 * Math.PI * Math.sqrt(L / g);
}

export function PendulumLabSim({ lang, studioMode: _studioMode = true, onExportFinding }: PendulumLabSimProps) {
  void _studioMode;
  const isZh = lang === "zh";

  const [length, setLength] = useState<number>(1.0);
  const [gravity, setGravity] = useState<number>(9.81);
  const [mass, setMass] = useState<number>(1.0);
  const [paused, setPaused] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);

  const [readout, setReadout] = useState<Readout>({
    angleDeg: 30,
    theory: theoryPeriod(1.0, 9.81),
    measured: 0,
    cycles: 0,
    speed: 0,
    eKin: 0,
    ePot: 0,
    eTotal: 0,
    simTime: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physRef = useRef<PhysState>({
    theta: INIT_ANGLE,
    omega: 0,
    time: 0,
    lastPass: 0,
    measuredPeriod: 0,
    cycles: 0,
    gateFlash: 0,
    isDragging: false,
    trail: [],
  });
  const paramRef = useRef({ L: 1.0, g: 9.81, m: 1.0 });
  const ctlRef = useRef({ paused: false, slow: false });

  useEffect(() => {
    paramRef.current.L = length;
    paramRef.current.g = gravity;
    paramRef.current.m = mass;
  }, [length, gravity, mass]);

  useEffect(() => {
    ctlRef.current.paused = paused;
    ctlRef.current.slow = slowMo;
  }, [paused, slowMo]);

  const handleReset = useCallback((deg = 30) => {
    const p = physRef.current;
    p.theta = (deg * Math.PI) / 180;
    p.omega = 0;
    p.time = 0;
    p.lastPass = 0;
    p.measuredPeriod = 0;
    p.cycles = 0;
    p.gateFlash = 0;
    p.isDragging = false;
    p.trail = [];
  }, []);

  useEffect(() => {
    let animId = 0;
    let lastTs = -1;
    let frame = 0;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (lastTs < 0) lastTs = now;
      const rawDt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const ctl = ctlRef.current;
      const par = paramRef.current;
      const dt = ctl.slow ? rawDt * SLOW_FACTOR : rawDt;
      const p = physRef.current;

      if (!ctl.paused && !p.isDragging && dt > 0) {
        const prevTheta = p.theta;
        const alpha = -(par.g / par.L) * Math.sin(p.theta);
        p.omega += alpha * dt;
        p.theta += p.omega * dt;
        p.time += dt;
        if (p.gateFlash > 0) p.gateFlash -= dt;
        if (prevTheta < 0 && p.theta >= 0 && p.omega > 0) {
          if (p.lastPass > 0) {
            const span = p.time - p.lastPass;
            if (span > 0.25) {
              p.measuredPeriod = span;
              p.cycles += 1;
              p.gateFlash = 0.6;
            }
          }
          p.lastPass = p.time;
        }
      }

      const L = par.L;
      const g = par.g;
      const m = par.m;
      const hgt = L * (1 - Math.cos(p.theta));
      const v = p.omega * L;
      const ePot = m * g * hgt;
      const eKin = 0.5 * m * v * v;

      frame += 1;
      if (frame % 6 === 0) {
        setReadout({
          angleDeg: Math.round((p.theta * 180) / Math.PI),
          theory: Number(theoryPeriod(L, g).toFixed(3)),
          measured: Number(p.measuredPeriod.toFixed(3)),
          cycles: p.cycles,
          speed: Number(Math.abs(v).toFixed(2)),
          eKin: Number(eKin.toFixed(2)),
          ePot: Number(ePot.toFixed(2)),
          eTotal: Number((eKin + ePot).toFixed(2)),
          simTime: Number(p.time.toFixed(1)),
        });
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const dispW = Math.max(1, Math.floor(rect.width));
      const dispH = Math.max(1, Math.floor(rect.height));
      const needW = Math.max(1, Math.floor(dispW * dpr));
      const needH = Math.max(1, Math.floor(dispH * dpr));
      if (canvas.width !== needW || canvas.height !== needH) {
        canvas.width = needW;
        canvas.height = needH;
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, dispW, dispH);

      ctx.fillStyle = "#FAFAFA";
      ctx.fillRect(0, 0, dispW, dispH);
      ctx.strokeStyle = "#E4E4E7";
      ctx.lineWidth = 0.5;
      for (let gx = 0; gx <= dispW; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx + 0.5, 0);
        ctx.lineTo(gx + 0.5, dispH);
        ctx.stroke();
      }
      for (let gy = 0; gy <= dispH; gy += 40) {
        ctx.beginPath();
        ctx.moveTo(0, gy + 0.5);
        ctx.lineTo(dispW, gy + 0.5);
        ctx.stroke();
      }

      const pivotX = dispW / 2;
      const pivotY = 56;
      const avail = Math.min(dispW * 0.42, dispH - 170);
      const pxLen = Math.max(60, Math.min(300, avail));
      const bobX = pivotX + Math.sin(p.theta) * pxLen;
      const bobY = pivotY + Math.cos(p.theta) * pxLen;

      p.trail.push({ x: bobX, y: bobY });
      if (p.trail.length > 42) p.trail.shift();
      for (let i = 0; i < p.trail.length; i += 1) {
        const t = p.trail[i];
        const a = (i / p.trail.length) * 0.22;
        ctx.fillStyle = `rgba(30, 64, 175, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(63, 63, 70, 0.35)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, pxLen * 0.72, Math.PI / 2 - 1.1, Math.PI / 2 + 1.1);
      ctx.stroke();
      ctx.fillStyle = "#71717A";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (let d = -60; d <= 60; d += 15) {
        const a = (d * Math.PI) / 180;
        const r1 = pxLen * 0.72 - 4;
        const r2 = pxLen * 0.72 + (d % 30 === 0 ? 6 : 3);
        const x1 = pivotX + Math.sin(a) * r1;
        const y1 = pivotY + Math.cos(a) * r1;
        const x2 = pivotX + Math.sin(a) * r2;
        const y2 = pivotY + Math.cos(a) * r2;
        ctx.strokeStyle = "#3f3f46";
        ctx.lineWidth = d % 30 === 0 ? 1.2 : 0.6;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        if (d % 30 === 0) {
          const lx = pivotX + Math.sin(a) * (pxLen * 0.72 + 14);
          const ly = pivotY + Math.cos(a) * (pxLen * 0.72 + 14);
          ctx.fillStyle = "#71717A";
          ctx.fillText(`${d}`, lx, ly - 5);
        }
      }

      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(63, 63, 70, 0.45)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(pivotX, pivotY + pxLen + 26);
      ctx.stroke();
      ctx.setLineDash([]);

      const gateOn = p.gateFlash > 0;
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = "#9f1239";
      ctx.fillStyle = gateOn ? "rgba(159, 18, 57, 0.22)" : "rgba(159, 18, 57, 0.08)";
      ctx.strokeRect(pivotX - 17, pivotY + pxLen - 11, 34, 22);
      ctx.fillRect(pivotX - 17, pivotY + pxLen - 11, 34, 22);
      ctx.fillStyle = "#9f1239";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("GATE", pivotX, pivotY + pxLen);

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(pivotX, pivotY);
      ctx.lineTo(bobX, bobY);
      ctx.stroke();

      ctx.fillStyle = "#3f3f46";
      ctx.fillRect(pivotX - 22, pivotY - 8, 44, 5);
      ctx.beginPath();
      ctx.arc(pivotX, pivotY, 4.5, 0, Math.PI * 2);
      ctx.fill();

      const bobR = 11 + Math.min(2, m) * 5;
      ctx.fillStyle = "#1e40af";
      ctx.beginPath();
      ctx.arc(bobX, bobY, bobR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#1e3a8a";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.fillStyle = "#FAFAFA";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`${m.toFixed(1)}kg`, bobX, bobY);

      if (Math.abs(p.omega) > 0.04) {
        const vt = p.omega * L;
        const dir = vt >= 0 ? 1 : -1;
        const ax = -Math.cos(p.theta) * dir;
        const ay = Math.sin(p.theta) * dir;
        const alen = Math.min(64, 14 + Math.abs(vt) * 16);
        const ex = bobX + ax * alen;
        const ey = bobY + ay * alen;
        ctx.strokeStyle = "#065f46";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(bobX, bobY);
        ctx.lineTo(ex, ey);
        ctx.stroke();
        ctx.fillStyle = "#065f46";
        ctx.beginPath();
        ctx.arc(ex, ey, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = "10px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText("v", ex + 5, ey - 4);
      }

      ctx.fillStyle = "#3f3f46";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(`theta = ${((p.theta * 180) / Math.PI).toFixed(1)} deg`, 12, dispH - 34);
      ctx.fillText(`t = ${p.time.toFixed(1)} s`, 12, dispH - 18);

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const angleFromEvent = (clientX: number, clientY: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return physRef.current.theta;
    const rect = canvas.getBoundingClientRect();
    const pivotX = rect.width / 2;
    const pivotY = 56;
    const dx = clientX - rect.left - pivotX;
    const dy = clientY - rect.top - pivotY;
    const raw = Math.atan2(dx, dy);
    return Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, raw));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    const p = physRef.current;
    p.isDragging = true;
    p.theta = angleFromEvent(e.clientX, e.clientY);
    p.omega = 0;
    p.trail = [];
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!physRef.current.isDragging) return;
    const p = physRef.current;
    p.theta = angleFromEvent(e.clientX, e.clientY);
    p.omega = 0;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    physRef.current.isDragging = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* noop */
    }
  };

  const generateReport = (): string => {
    const m = readout;
    const meas = m.measured > 0 ? `${m.measured.toFixed(3)} s (${m.cycles}x)` : isZh ? "仍在计时" : "laeuft noch";
    if (isZh) {
      return (
        `单摆实验记录:\n` +
        `- 摆长 L=${length.toFixed(2)} m, 重力 g=${gravity.toFixed(2)} m/s2, 质量 m=${mass.toFixed(1)} kg\n` +
        `- 理论周期 T=2*pi*sqrt(L/g)=${m.theory.toFixed(3)} s\n` +
        `- 光电门实测周期=${meas}\n` +
        `- 当前偏角=${m.angleDeg} deg, 线速度=${m.speed.toFixed(2)} m/s\n` +
        `- 能量 Ekin=${m.eKin.toFixed(2)} J, Epot=${m.ePot.toFixed(2)} J, Eges=${m.eTotal.toFixed(2)} J\n` +
        `- 结论: 周期与质量无关, 摆长增大则周期按 sqrt(L) 增大.`
      );
    }
    return (
      `Pendel-Messprotokoll:\n` +
      `- Fadenlaenge L=${length.toFixed(2)} m, g=${gravity.toFixed(2)} m/s2, Masse m=${mass.toFixed(1)} kg\n` +
      `- Theorie T=2*pi*sqrt(L/g)=${m.theory.toFixed(3)} s\n` +
      `- Photogate-Messwert=${meas}\n` +
      `- Winkel=${m.angleDeg} deg, Bahngeschwindigkeit=${m.speed.toFixed(2)} m/s\n` +
      `- Energie Ekin=${m.eKin.toFixed(2)} J, Epot=${m.ePot.toFixed(2)} J, Eges=${m.eTotal.toFixed(2)} J\n` +
      `- Befund: T ist unabhaengig von m und skaliert mit sqrt(L).`
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

  const presetActive = (g: number) => Math.abs(gravity - g) < 0.01;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "单摆实验室与振动周期" : "Pendel-Labor und Schwingungsdauer"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--ink-muted)] whitespace-nowrap">
                  L={length.toFixed(2)}m g={gravity.toFixed(2)} T={readout.theory.toFixed(2)}s
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
                  onClick={() => handleReset(30)}
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
                  T<span className="text-[var(--ink-muted)]">{isZh ? "理论" : "th"}</span>=<strong className="text-[#1e40af]">{readout.theory.toFixed(3)}</strong>s
                </span>
                <span>
                  T<span className="text-[var(--ink-muted)]">{isZh ? "实测" : "mess"}</span>=<strong className="text-[#9f1239]">{readout.measured > 0 ? readout.measured.toFixed(3) : "--.--"}</strong>s
                </span>
                <span>
                  E=<strong className="text-[#065f46]">{readout.eTotal.toFixed(2)}</strong>J
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
                  <span className="text-[var(--ink)]">{isZh ? "摆长 L" : "Fadenlaenge L"}</span>
                  <span className="font-medium text-[#1e40af]">{length.toFixed(2)} m</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.05"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full accent-[#1e40af]"
                  aria-label={isZh ? "摆长" : "Fadenlaenge"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                  <span>0.20 m</span>
                  <span>2.00 m</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "重力场 g" : "Schwerefeld g"}</span>
                  <span className="font-medium text-[#1e40af]">{gravity.toFixed(2)} m/s2</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="25"
                  step="0.01"
                  value={gravity}
                  onChange={(e) => setGravity(Number(e.target.value))}
                  className="w-full accent-[#1e40af]"
                  aria-label={isZh ? "重力加速度" : "Fallbeschleunigung"}
                />
                <div className="grid grid-cols-3 gap-1.5 mt-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setGravity(9.81)}
                    className={`py-1 border ${presetActive(9.81) ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                  >
                    {isZh ? "地球" : "Erde"} 9.81
                  </button>
                  <button
                    type="button"
                    onClick={() => setGravity(1.62)}
                    className={`py-1 border ${presetActive(1.62) ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                  >
                    {isZh ? "月球" : "Mond"} 1.62
                  </button>
                  <button
                    type="button"
                    onClick={() => setGravity(3.71)}
                    className={`py-1 border ${presetActive(3.71) ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                  >
                    {isZh ? "火星" : "Mars"} 3.71
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "摆球质量 m" : "Pendelmasse m"}</span>
                  <span className="font-medium text-[#1e40af]">{mass.toFixed(1)} kg</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="2"
                  step="0.1"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full accent-[#065f46]"
                  aria-label={isZh ? "摆球质量" : "Pendelmasse"}
                />
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                  {isZh ? "考点: 周期与质量无关, 拖动验证 T 不变, 仅能量 E 随 m 变化。" : "Kontrolle: T ist unabhaengig von m. Nur E skaliert mit m."}
                </p>
              </div>

              <div className="border-t border-[var(--line)] pt-2 font-mono tabular-nums text-[11px] text-[var(--ink)] space-y-1">
                <div className="flex justify-between">
                  <span>{isZh ? "偏角" : "Winkel"}</span>
                  <span>{readout.angleDeg} deg</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "线速度" : "Tempo"}</span>
                  <span className="text-[#065f46]">{readout.speed.toFixed(2)} m/s</span>
                </div>
                <div className="flex justify-between">
                  <span>E_kin</span>
                  <span className="text-[#065f46]">{readout.eKin.toFixed(2)} J</span>
                </div>
                <div className="flex justify-between">
                  <span>E_pot</span>
                  <span className="text-[#1e40af]">{readout.ePot.toFixed(2)} J</span>
                </div>
                <div className="flex justify-between">
                  <span>E_ges</span>
                  <span>{readout.eTotal.toFixed(2)} J</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "仿真时间" : "Simzeit"}</span>
                  <span>{readout.simTime.toFixed(1)} s</span>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <span className="text-[var(--ink-muted)]">{isZh ? "初偏角:" : "Start:"}</span>
                  {[15, 30, 45].map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => handleReset(deg)}
                      className="px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                    >
                      {deg} deg
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">
                {isZh ? "拖拽说明" : "Hinweis Bedienung"}
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {isZh
                  ? "用鼠标直接拖动摆球到任意偏角后释放, 摆即开始振动。光电门在最低点过零计时, 满一整周后给出实测周期。"
                  : "Kugel mit gedrueckter Maustaste auslenken und loslassen. Das Photogate misst am Nulldurchgang die volle Schwingungsdauer."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel und Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "非线性单摆与小角周期" : "Nichtlineares Pendel, Kleinwinkel-T"}</div>
          <div className="mb-1.5">
            <MathHtml code="T = 2\pi\sqrt{L/g}" display={true} cacheKey="pendulum:period-T" />
            <MathHtml code="\ddot{\theta} = -\frac{g}{L}\sin\theta" display={true} cacheKey="pendulum:ode-theta" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "半隐式 Euler 逐步积分上述方程。小角时 sinθ≈θ, 周期收敛到理论值; 大摆角实测周期略大于理论值。"
              : "Semi-implizites Euler integriert obige Gleichung. Fuer kleine Winkel gilt sinθ≈θ und T konvergiert gegen den Theoriewert."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "EF 力学: 振动周期探究" : "EF Mechanik: Schwingungsdauer"}</div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen, untersuchen, begruenden</code>
            <p className="mt-1">
              {isZh
                ? "典型任务: 用光电门数据论证 T 与 m 无关、T 正比于 sqrt(L)、g 越小 T 越大, 并计算 Erde/Mond/Mars 下的周期比。"
                : "Aufgabe: Weise mit Gate-Daten nach, dass T unabhaengig von m ist, mit sqrt(L) waechst und bei kleinerem g steigt."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "秋千口诀: 长慢重无关" : "Schaukel-Regel: lang = langsam"}</div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "绳越长荡得越慢, 月球上荡得更慢; 胖瘦坐秋千周期一样, 只是能量不同。记作: 长慢、月慢、质量只管能量不管钟。"
              : "Laengeres Seil heisst langsamere Schaukel, auf dem Mond noch langsamer. Schwere oder leichte Kugel: gleiche Uhr, nur mehr Energie."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "导出测量结论" : "Befunde exportieren"}</div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh ? "把当前 L、g、m 与理论/实测周期、能量读数发给 AI 助教继续分析。" : "Sende L, g, m sowie Theorie- und Messwerte an den KI-Tutor zur Analyse."}
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
