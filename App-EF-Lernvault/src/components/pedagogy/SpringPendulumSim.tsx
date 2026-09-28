import { useState, useEffect, useRef, useCallback } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface SpringPendulumSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface Readout {
  x: number;
  v: number;
  eKin: number;
  eSpann: number;
  eTherm: number;
  eTot: number;
  tTheo: number;
  tMeas: number;
  cycles: number;
  eqCm: number;
}

const G_PRESETS = [
  { id: "erde", g: 9.81 },
  { id: "mond", g: 1.62 },
  { id: "mars", g: 3.71 },
  { id: "orbit", g: 0.0 },
] as const;

type GravityId = (typeof G_PRESETS)[number]["id"];

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

export function SpringPendulumSim({ lang, studioMode: _studioMode = true, onExportFinding }: SpringPendulumSimProps) {
  const isZh = lang === "zh";

  // 1. Inquiry variables (user controlled)
  const [mass, setMass] = useState(0.25); // kg
  const [springK, setSpringK] = useState(25); // N/m (Federhaerte D)
  const [damping, setDamping] = useState(0.05); // 1/s, equation: x'' = -(D/m)x - c*v
  const [gravityId, setGravityId] = useState<GravityId>("erde");
  const [paused, setPaused] = useState(false);
  const [slowMo, setSlowMo] = useState(false);
  const [showPanels, setShowPanels] = useState(true);
  const [showVectors, setShowVectors] = useState(true);
  const [showTrace, setShowTrace] = useState(true);

  const gravity = G_PRESETS.find((p) => p.id === gravityId)?.g ?? 9.81;
  const tTheo = 2 * Math.PI * Math.sqrt(mass / springK);
  const eqM = gravity > 0 ? (mass * gravity) / springK : 0;

  // 2. Throttled readout (every 6 frames)
  const [readout, setReadout] = useState<Readout>({
    x: 0.1,
    v: 0,
    eKin: 0,
    eSpann: 0.125,
    eTherm: 0,
    eTot: 0.125,
    tTheo,
    tMeas: 0,
    cycles: 0,
    eqCm: eqM * 100,
  });

  // 3. Physics engine ref (fully decoupled from React state)
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physicsRef = useRef({
    x: 0.1, // displacement from equilibrium, m (positive = down)
    v: 0,
    time: 0,
    eTherm: 0,
    frameCount: 0,
    trace: [] as number[],
    prevX: 0.1,
    lastCrossT: -1,
    measPeriod: 0,
    cycles: 0,
    isDragging: false,
  });

  // 4. Reset callback
  const handleReset = useCallback(() => {
    const p = physicsRef.current;
    p.x = 0.1;
    p.v = 0;
    p.time = 0;
    p.eTherm = 0;
    p.trace = [];
    p.prevX = 0.1;
    p.lastCrossT = -1;
    p.measPeriod = 0;
    p.cycles = 0;
  }, []);

  // 5. 60 FPS physics loop with dynamic DPR canvas rendering
  useEffect(() => {
    let animId: number;
    let lastTs = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dtRaw = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const dt = slowMo ? dtRaw * 0.3 : dtRaw;

      const p = physicsRef.current;
      if (!paused && !p.isDragging && dt > 0) {
        // First-principle ODE: x'' = -(D/m)*x - c*v, semi-implicit Euler with substeps
        const omega2 = springK / mass;
        const sub = Math.max(1, Math.ceil(dt / 0.002));
        const h = dt / sub;
        for (let i = 0; i < sub; i++) {
          const a = -omega2 * p.x - damping * p.v;
          p.v += a * h;
          p.x += p.v * h;
          p.time += h;
          p.eTherm += mass * damping * p.v * p.v * h;
        }
        const maxAmp = 0.22;
        if (Math.abs(p.x) > maxAmp) {
          p.x = Math.sign(p.x) * maxAmp;
          p.v *= -0.25;
        }
        // Period measurement: upward zero crossing through equilibrium
        if (p.prevX < 0 && p.x >= 0 && p.v > 0) {
          if (p.lastCrossT >= 0 && p.time - p.lastCrossT > 0.25) {
            p.measPeriod = p.time - p.lastCrossT;
            p.cycles += 1;
          }
          p.lastCrossT = p.time;
        }
        p.prevX = p.x;
        p.trace.push(p.x);
        if (p.trace.length > 360) p.trace.shift();
      }

      // Throttled sync to React DOM (every 6 frames ~10 FPS)
      p.frameCount++;
      if (p.frameCount % 6 === 0) {
        const eKin = 0.5 * mass * p.v * p.v;
        const eSpann = 0.5 * springK * p.x * p.x;
        const eTot = eKin + eSpann + p.eTherm;
        setReadout({
          x: Number(p.x.toFixed(4)),
          v: Number(p.v.toFixed(3)),
          eKin: Number(eKin.toFixed(4)),
          eSpann: Number(eSpann.toFixed(4)),
          eTherm: Number(p.eTherm.toFixed(4)),
          eTot: Number(eTot.toFixed(4)),
          tTheo: Number((2 * Math.PI * Math.sqrt(mass / springK)).toFixed(3)),
          tMeas: Number(p.measPeriod.toFixed(3)),
          cycles: p.cycles,
          eqCm: Number((((gravity > 0 ? (mass * gravity) / springK : 0) * 100)).toFixed(1)),
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
      ctx.clearRect(0, 0, dispW, dispH);

      const INK = "#3f3f46";
      const HAIR = "rgba(161,161,170,0.35)";
      const KIN = "#065f46";
      const SPANN = "#1e40af";
      const THERM = "#9f1239";
      const FORCE = "#92400e";

      // Layout: left apparatus, right x-t trace
      const splitX = Math.max(150, Math.min(260, dispW * 0.38));
      const ax = splitX / 2;
      const ceilingY = 34;
      const pxPerM = Math.min(560, (dispH - 150) / 0.42);
      const eqOffPx = Math.min(dispH * 0.3, eqM * pxPerM);
      const eqY = ceilingY + 64 + eqOffPx;
      const massY = eqY + p.x * pxPerM;
      const blockW = 40 + mass * 40;
      const blockH = 26 + mass * 40;

      // Faint grid
      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = 8; gx < dispW; gx += 28) {
        ctx.moveTo(gx, 8);
        ctx.lineTo(gx, dispH - 8);
      }
      for (let gy = 8; gy < dispH; gy += 28) {
        ctx.moveTo(8, gy);
        ctx.lineTo(dispW - 8, gy);
      }
      ctx.stroke();

      // Ceiling mount + hatching
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(ax - 46, ceilingY);
      ctx.lineTo(ax + 46, ceilingY);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let i = -4; i <= 4; i++) {
        ctx.moveTo(ax + i * 11, ceilingY);
        ctx.lineTo(ax + i * 11 + 7, ceilingY - 8);
      }
      ctx.stroke();

      // Unstretched length marker L0
      const l0Y = ceilingY + 64;
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = HAIR;
      ctx.beginPath();
      ctx.moveTo(10, l0Y);
      ctx.lineTo(splitX - 8, l0Y);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#71717a";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(isZh ? "L0 原长" : "L0 Ruhelänge", 12, l0Y - 4);

      // Equilibrium line x = 0
      ctx.setLineDash([5, 3]);
      ctx.strokeStyle = SPANN;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(10, eqY);
      ctx.lineTo(splitX - 8, eqY);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = SPANN;
      ctx.fillText("x = 0", 12, eqY + 11);

      // Spring zigzag from ceiling to mass top
      const topY = ceilingY + 4;
      const botY = Math.max(topY + 14, massY - 4);
      const coils = 9;
      const amp = 13;
      ctx.strokeStyle = INK;
      ctx.lineWidth = 2;
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(ax, topY);
      ctx.lineTo(ax, topY + 8);
      const spanY = botY - topY - 12;
      for (let i = 0; i <= coils * 2; i++) {
        const yy = topY + 8 + (spanY * i) / (coils * 2);
        const xx = i === 0 || i === coils * 2 ? ax : ax + (i % 2 === 0 ? -amp : amp);
        ctx.lineTo(xx, yy);
      }
      ctx.lineTo(ax, botY);
      ctx.stroke();

      // Mass block (draggable)
      ctx.fillStyle = "#3f3f46";
      ctx.fillRect(ax - blockW / 2, massY, blockW, blockH);
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(ax - blockW / 2, massY, blockW, blockH);
      ctx.fillStyle = "#fafafa";
      ctx.font = "bold 10px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${Math.round(mass * 1000)} g`, ax, massY + blockH / 2 + 3.5);

      // Vectors: velocity (green) and restoring force (amber)
      if (showVectors) {
        const vy = massY + blockH / 2;
        if (Math.abs(p.v) > 0.03) {
          const len = Math.max(-70, Math.min(70, p.v * 46));
          ctx.strokeStyle = KIN;
          ctx.fillStyle = KIN;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ax + blockW / 2 + 8, vy);
          ctx.lineTo(ax + blockW / 2 + 8, vy + len);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ax + blockW / 2 + 8, vy + len);
          ctx.lineTo(ax + blockW / 2 + 4, vy + len - Math.sign(len) * 6);
          ctx.lineTo(ax + blockW / 2 + 12, vy + len - Math.sign(len) * 6);
          ctx.closePath();
          ctx.fill();
          ctx.font = "10px ui-monospace, monospace";
          ctx.textAlign = "left";
          ctx.fillText("v", ax + blockW / 2 + 14, vy + len / 2);
        }
        if (Math.abs(p.x) > 0.008) {
          const len = Math.max(-64, Math.min(64, -p.x * 300));
          const fx = ax - blockW / 2 - 10;
          ctx.strokeStyle = FORCE;
          ctx.fillStyle = FORCE;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(fx, vy);
          ctx.lineTo(fx, vy + len);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(fx, vy + len);
          ctx.lineTo(fx - 4, vy + len - Math.sign(len) * 6);
          ctx.lineTo(fx + 4, vy + len - Math.sign(len) * 6);
          ctx.closePath();
          ctx.fill();
          ctx.font = "10px ui-monospace, monospace";
          ctx.textAlign = "right";
          ctx.fillText("F_R", fx - 5, vy + len / 2);
        }
      }

      // Gravity + elongation label
      ctx.fillStyle = "#71717a";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`g = ${gravity.toFixed(2)} m/s²`, 12, dispH - 26);
      ctx.fillText(
        isZh ? `平衡伸长 ${(eqM * 100).toFixed(1)} cm` : `Gleichgewicht ${(eqM * 100).toFixed(1)} cm`,
        12,
        dispH - 12
      );

      // Right: displacement-time trace x(t)
      if (showTrace) {
        const tx0 = splitX + 12;
        const tx1 = dispW - 12;
        const ty0 = 30;
        const ty1 = dispH - 46;
        const midY = (ty0 + ty1) / 2;
        const ampPx = (ty1 - ty0) / 2 - 10;
        const scale = ampPx / 0.16;
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.2;
        ctx.strokeRect(tx0, ty0, tx1 - tx0, ty1 - ty0);
        ctx.setLineDash([4, 3]);
        ctx.strokeStyle = HAIR;
        ctx.beginPath();
        ctx.moveTo(tx0, midY);
        ctx.lineTo(tx1, midY);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#71717a";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText(isZh ? "位移-时间曲线 x(t) [cm]" : "Auslenkung-Zeit x(t) [cm]", tx0 + 4, ty0 + 12);
        const tr = p.trace;
        if (tr.length > 1) {
          ctx.strokeStyle = SPANN;
          ctx.lineWidth = 1.8;
          ctx.beginPath();
          const n = tr.length;
          for (let i = 0; i < n; i++) {
            const xx = tx1 - ((n - 1 - i) / 359) * (tx1 - tx0);
            const yy = midY + tr[i] * 100 * (scale / 100);
            if (i === 0) ctx.moveTo(xx, yy);
            else ctx.lineTo(xx, yy);
          }
          ctx.stroke();
          const lastY = midY + tr[n - 1] * 100 * (scale / 100);
          ctx.fillStyle = SPANN;
          ctx.beginPath();
          ctx.arc(tx1 - 1, lastY, 3, 0, Math.PI * 2);
          ctx.fill();
        }
        // y-axis ticks ±10 cm
        ctx.fillStyle = "#71717a";
        ctx.textAlign = "right";
        ctx.fillText("+10", tx1 - 3, midY - 0.1 * 100 * (scale / 100) - 3);
        ctx.fillText("-10", tx1 - 3, midY + 0.1 * 100 * (scale / 100) + 10);
      } else {
        ctx.fillStyle = "#71717a";
        ctx.font = "10px ui-monospace, monospace";
        ctx.textAlign = "left";
        const eKinLive = 0.5 * mass * p.v * p.v;
        const eSpannLive = 0.5 * springK * p.x * p.x;
        ctx.fillText(`E_kin = ${eKinLive.toFixed(3)} J`, splitX + 16, 60);
        ctx.fillStyle = SPANN;
        ctx.fillText(`E_spann = ${eSpannLive.toFixed(3)} J`, splitX + 16, 78);
        ctx.fillStyle = THERM;
        ctx.fillText(`E_therm = ${p.eTherm.toFixed(3)} J`, splitX + 16, 96);
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [mass, springK, damping, gravity, eqM, paused, slowMo, showVectors, showTrace, isZh]);

  // Pointer drag on the mass: sets initial displacement
  const massGeomRef = useRef({ ax: 0, massY: 0, blockW: 0, blockH: 0, eqY: 0, pxPerM: 400 });
  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const splitX = Math.max(150, Math.min(260, rect.width * 0.38));
    const ax = splitX / 2;
    const pxPerM = Math.min(560, (rect.height - 150) / 0.42);
    const eqOffPx = Math.min(rect.height * 0.3, eqM * pxPerM);
    const eqY = 34 + 64 + eqOffPx;
    const massY = eqY + physicsRef.current.x * pxPerM;
    const blockW = 40 + mass * 40;
    const blockH = 26 + mass * 40;
    const inside = px > ax - blockW / 2 - 18 && px < ax + blockW / 2 + 18 && py > massY - 22 && py < massY + blockH + 22;
    if (!inside) return;
    physicsRef.current.isDragging = true;
    physicsRef.current.v = 0;
    massGeomRef.current = { ax, massY, blockW, blockH, eqY, pxPerM };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!physicsRef.current.isDragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const py = e.clientY - rect.top;
    const { eqY, pxPerM } = massGeomRef.current;
    const nx = Math.max(-0.2, Math.min(0.2, (py - eqY) / pxPerM));
    physicsRef.current.x = nx;
    physicsRef.current.v = 0;
    physicsRef.current.prevX = nx;
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    physicsRef.current.isDragging = false;
    physicsRef.current.lastCrossT = -1;
    physicsRef.current.measPeriod = 0;
    physicsRef.current.cycles = 0;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* pointer already released */
    }
  };

  const eMax = Math.max(0.05, 0.5 * springK * 0.0225 + 0.02);
  const kinPct = Math.min(100, (readout.eKin / eMax) * 100);
  const spannPct = Math.min(100, (readout.eSpann / eMax) * 100);
  const thermPct = Math.min(100, (readout.eTherm / eMax) * 100);

  const presetLabel = (id: GravityId) => {
    if (id === "erde") return isZh ? "地球 9.81" : "Erde 9.81";
    if (id === "mond") return isZh ? "月球 1.62" : "Mond 1.62";
    if (id === "mars") return isZh ? "火星 3.71" : "Mars 3.71";
    return isZh ? "轨道 0" : "Orbit 0";
  };

  const handleExport = () => {
    const summary = isZh
      ? `弹簧振子实验记录：\n- 质量 m = ${(mass * 1000).toFixed(0)} g，劲度系数 D = ${springK} N/m，阻尼 c = ${damping.toFixed(2)} 1/s，重力场 g = ${gravity.toFixed(2)} m/s²\n- 理论周期 T = 2π√(m/D) = ${readout.tTheo} s；实测周期 ${readout.tMeas > 0 ? readout.tMeas + " s" : "测定中"}（${readout.cycles} 周期）\n- 平衡伸长 ΔL = mg/D = ${readout.eqCm} cm；当前位移 x = ${(readout.x * 100).toFixed(1)} cm，速度 v = ${readout.v} m/s\n- 能量：动能 E_kin = ${readout.eKin} J，弹性势能 E_spann = ${readout.eSpann} J，耗散 E_therm = ${readout.eTherm} J。`
      : `Federpendel-Protokoll:\n- Masse m = ${(mass * 1000).toFixed(0)} g, Federhärte D = ${springK} N/m, Dämpfung c = ${damping.toFixed(2)} 1/s, Schwerefeld g = ${gravity.toFixed(2)} m/s²\n- Theorie T = 2π√(m/D) = ${readout.tTheo} s; Messung ${readout.tMeas > 0 ? readout.tMeas + " s" : "läuft"} (${readout.cycles} Zyklen)\n- Gleichgewicht ΔL = mg/D = ${readout.eqCm} cm; Auslenkung x = ${(readout.x * 100).toFixed(1)} cm, v = ${readout.v} m/s\n- Energie: E_kin = ${readout.eKin} J, E_spann = ${readout.eSpann} J, E_therm = ${readout.eTherm} J.`;
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
                  {isZh ? "弹簧振子与简谐振动" : "Federpendel & harmonische Schwingung"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--ink-muted)] whitespace-nowrap">
                  m = {(mass * 1000).toFixed(0)} g | D = {springK} N/m
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
                    checked={showVectors}
                    onChange={(e) => setShowVectors(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  {isZh ? "矢量" : "Vektoren"}
                </label>
                <label className="hidden sm:flex items-center gap-1 text-[11px] text-[var(--ink-muted)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTrace}
                    onChange={(e) => setShowTrace(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  {isZh ? "曲线" : "Kurve"}
                </label>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>
                  x = <strong>{(readout.x * 100).toFixed(1)}</strong> cm
                </span>
                <span>
                  T<sub>th</sub> = <strong className="text-[var(--accent)]">{readout.tTheo.toFixed(2)}</strong> s
                </span>
                <span>
                  T<sub>exp</sub> = <strong>{readout.tMeas > 0 ? readout.tMeas.toFixed(2) : "--"}</strong> s
                </span>
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
                  <span className="text-[var(--ink-muted)]">{isZh ? "质量 (m)" : "Masse (m)"}</span>
                  <span className="font-medium tabular-nums text-[var(--accent)]">{(mass * 1000).toFixed(0)} g</span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="0.8"
                  step="0.01"
                  value={mass}
                  onChange={(e) => setMass(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink-muted)]">{isZh ? "劲度系数 (D)" : "Federhärte (D)"}</span>
                  <span className="font-medium tabular-nums text-[var(--accent)]">{springK} N/m</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="80"
                  step="1"
                  value={springK}
                  onChange={(e) => setSpringK(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink-muted)]">{isZh ? "阻尼 (c)" : "Dämpfung (c)"}</span>
                  <span className="font-medium tabular-nums text-[var(--ink)]">
                    {damping === 0 ? (isZh ? "0 理想" : "0 ideal") : damping.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={damping}
                  onChange={(e) => setDamping(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </div>

              <div className="mb-1">
                <div className="text-xs font-mono text-[var(--ink-muted)] mb-1.5">
                  {isZh ? "行星重力场 (g)" : "Schwerefeld (g)"}
                </div>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                  {G_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setGravityId(p.id)}
                      className={`py-1 border border-[var(--line)] tabular-nums ${
                        gravityId === p.id
                          ? "bg-[var(--ink)] text-[var(--paper)] font-medium"
                          : "bg-[var(--paper-subtle)] text-[var(--ink)]"
                      }`}
                    >
                      {presetLabel(p.id)}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] font-mono tabular-nums text-[var(--ink-muted)] mt-1.5">
                  ΔL = mg/D = {readout.eqCm.toFixed(1)} cm
                </p>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] mb-2">
                {isZh ? "能量分布 (J)" : "Energie (J)"}
              </div>
              <div className="space-y-2 font-mono text-[11px]">
                <div>
                  <div className="flex justify-between tabular-nums text-[#065f46]">
                    <span>E_kin</span>
                    <span className="font-medium">{readout.eKin.toFixed(3)} J</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full bg-[#065f46]" style={{ width: `${kinPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between tabular-nums text-[#1e40af]">
                    <span>E_spann</span>
                    <span className="font-medium">{readout.eSpann.toFixed(3)} J</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full bg-[#1e40af]" style={{ width: `${spannPct}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between tabular-nums text-[#9f1239]">
                    <span>E_therm</span>
                    <span className="font-medium">{readout.eTherm.toFixed(3)} J</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full bg-[#9f1239]" style={{ width: `${thermPct}%` }} />
                  </div>
                </div>
                <div className="border-t border-[var(--line)] pt-1 flex justify-between tabular-nums font-medium text-[var(--ink)]">
                  <span>E_ges</span>
                  <span>{readout.eTot.toFixed(3)} J</span>
                </div>
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
            {isZh ? "简谐振动周期" : "Harmonische Schwingung"}
          </div>
          <MathHtml code="T = 2\pi\sqrt{\frac{m}{D}}" display={true} cacheKey="spring:period-formula" />
          <MathHtml code="m\ddot{x} = -D\,x - c\,m\,\dot{x}" display={true} cacheKey="spring:ode-formula" />
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "周期只由质量 m 与劲度 D 决定，与振幅和重力 g 无关；重力只移动平衡位置 ΔL = mg/D。"
              : "T hängt nur von m und D ab, nicht von Amplitude oder g; g verschiebt nur die Ruhelage ΔL = mg/D."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif tracking-tight font-medium text-[var(--ink)] mb-1">
            {isZh ? "EF 力学：机械振动" : "EF Mechanik: Schwingungen"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen, berechnen</code>
            <p className="mt-1">
              {isZh
                ? "用 x-t 图像描述振动，由 m 与 D 计算周期 T，并判断阻尼对振幅的影响。"
                : "Stelle x(t) dar, berechne T aus m und D und beurteile den Einfluss der Dämpfung auf die Amplitude."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif tracking-tight font-medium text-[var(--ink)] mb-1">
            {isZh ? "周期只看 m/D，能量来回倒" : "Nur m/D bestimmt T"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "质量越大越慢，弹簧越硬越快：T = 2π√(m/D)。换星球只改变平衡伸长，不改变周期；能量在动能与弹性势能之间来回倒，阻尼每天漏一点给热能。"
              : "Größeres m wird langsamer, härteres D wird schneller: T = 2π√(m/D). Ein Planet ändert nur ΔL, nie T; Energie pendelt zwischen E_kin und E_spann, Dämpfung speist E_therm."}
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
                ? "将当前质量、劲度、理论与实测周期直接发给 AI 助教深入分析。"
                : "Übertrage die aktuellen Messwerte direkt in den KI-Tutor zur vertieften Analyse."}
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
    </div>
  );
}

export default SpringPendulumSim;
