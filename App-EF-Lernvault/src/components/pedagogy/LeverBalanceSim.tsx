import { useState, useEffect, useRef, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface LeverBalanceSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

const G = 9.81; // m/s^2
const BEAM_HALF_M = 4; // beam half length in meters
const MAX_TILT_RAD = 0.16; // visual tilt clamp (~9 deg)
const TILT_GAIN = 0.012; // rad per N*m of torque imbalance
const BALANCE_TOL_NM = 1.0; // |M_net| below this counts as balanced

/**
 * LeverBalanceSim: Einseitiger / zweiseitiger Hebel im Drehmoment-Gleichgewicht
 * (NRW EF Physik, Mechanik: Hebelgesetz).
 *
 * Gleichgewichtsbedingung um den Drehpunkt:
 *   Summe M = Summe (F_i * l_i) = 0  =>  m_L * l_L = m_R * l_R
 * Die Neigung des Balkens folgt dem resultierenden Drehmoment gedaempft.
 */
export function LeverBalanceSim({ lang, studioMode: _studioMode = true, onExportFinding }: LeverBalanceSimProps) {
  void _studioMode;

  // Adjustable parameters (sliders + canvas drag)
  const [massL, setMassL] = useState<number>(8); // kg, 1..20
  const [armL, setArmL] = useState<number>(2.0); // m, 0.5..3.5 (Drehpunkt -> linke Masse)
  const [massR, setMassR] = useState<number>(5); // kg, 1..20
  const [armR, setArmR] = useState<number>(3.0); // m, 0.5..3.5 (Drehpunkt -> rechte Masse)
  const [fulcrum, setFulcrum] = useState<number>(0); // m, -1.5..1.5 (Drehpunktlage auf dem Balken)

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);

  // Throttled UI readout (synced every 6 frames from the physics loop)
  const [metrics, setMetrics] = useState({
    thetaDeg: 0,
    torqueL: 0,
    torqueR: 0,
    torqueNet: 0,
    balanced: false,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Physics core: tilt angle + angular velocity (never in React state per frame)
  const physicsRef = useRef({ theta: 0, omega: 0 });
  // Mirror of adjustable params for the rAF loop (avoids effect restarts)
  const paramsRef = useRef({ massL, armL, massR, armR, fulcrum, isPlaying });
  useEffect(() => {
    paramsRef.current = { massL, armL, massR, armR, fulcrum, isPlaying };
  }, [massL, armL, massR, armR, fulcrum, isPlaying]);

  // Which handle is currently dragged: left mass / right mass / fulcrum
  const dragRef = useRef<"massL" | "massR" | "fulcrum" | null>(null);

  const massLSliderId = useId();
  const armLSliderId = useId();
  const massRSliderId = useId();
  const armRSliderId = useId();
  const fulcrumSliderId = useId();

  // Live values flow via throttled `metrics` from the rAF loop below.

  // 60 FPS decoupled render + dynamics loop (dynamic DPR, 6-frame UI throttle)
  useEffect(() => {
    let animId: number;
    let frameCount = 0;

    const loop = (timestamp: number) => {
      void timestamp;
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

      // Dynamic DPR sync: internal buffer always matches CSS display size
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const dispW = Math.max(300, Math.floor(rect.width));
      const dispH = Math.max(200, Math.floor(rect.height));
      if (canvas.width !== Math.floor(dispW * dpr) || canvas.height !== Math.floor(dispH * dpr)) {
        canvas.width = Math.floor(dispW * dpr);
        canvas.height = Math.floor(dispH * dpr);
      }
      ctx.save();
      ctx.scale(dpr, dpr);
      const w = dispW;
      const h = dispH;

      const p = paramsRef.current;
      const phys = physicsRef.current;

      // --- Dynamics: tilt follows net torque with damping toward equilibrium ---
      const mL = p.massL * G * p.armL;
      const mR = p.massR * G * p.armR;
      const mNet = mL - mR;
      const target = Math.max(-MAX_TILT_RAD, Math.min(MAX_TILT_RAD, (mR - mL) * TILT_GAIN));
      if (p.isPlaying) {
        const dt = 1 / 60;
        const stiffness = 22;
        const damping = 6.5;
        phys.omega += ((target - phys.theta) * stiffness - phys.omega * damping) * dt;
        phys.theta += phys.omega * dt;
      }

      // --- Throttled React sync (every 6 frames) ---
      frameCount += 1;
      if (frameCount % 6 === 0) {
        setMetrics({
          thetaDeg: Math.round((phys.theta * 180) / Math.PI * 10) / 10,
          torqueL: Math.round(mL * 10) / 10,
          torqueR: Math.round(mR * 10) / 10,
          torqueNet: Math.round(mNet * 10) / 10,
          balanced: Math.abs(mNet) <= BALANCE_TOL_NM,
        });
      }

      // --- Scene (dark stage, Tufte hairlines) ---
      ctx.fillStyle = "#0b0f1a";
      ctx.fillRect(0, 0, w, h);

      const pxPerM = Math.min(w / (BEAM_HALF_M * 2 + 1.6), (h - 170) / 3.2);
      const fulcrumX = w / 2 + p.fulcrum * pxPerM;
      const beamY = h - 130;

      // Ground line
      ctx.strokeStyle = "rgba(148,163,184,0.55)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(16, h - 34);
      ctx.lineTo(w - 16, h - 34);
      ctx.stroke();
      // Ground hatch
      ctx.strokeStyle = "rgba(148,163,184,0.3)";
      ctx.lineWidth = 1;
      for (let x = 24; x < w - 16; x += 14) {
        ctx.beginPath();
        ctx.moveTo(x, h - 34);
        ctx.lineTo(x - 7, h - 26);
        ctx.stroke();
      }

      // Support column + fulcrum triangle
      ctx.fillStyle = "#334155";
      ctx.fillRect(fulcrumX - 7, h - 96, 14, 62);
      ctx.beginPath();
      ctx.moveTo(fulcrumX - 22, beamY + 4);
      ctx.lineTo(fulcrumX + 22, beamY + 4);
      ctx.lineTo(fulcrumX, beamY - 22);
      ctx.closePath();
      ctx.fillStyle = "#64748b";
      ctx.fill();
      ctx.strokeStyle = "#cbd5e1";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      // Fulcrum pivot pin (drag handle)
      ctx.beginPath();
      ctx.arc(fulcrumX, beamY - 6, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#e2e8f0";
      ctx.fill();
      ctx.strokeStyle = "#0b0f1a";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Beam (rotated by theta around fulcrum)
      const beamHalfPx = BEAM_HALF_M * pxPerM;
      ctx.save();
      ctx.translate(fulcrumX, beamY - 26);
      ctx.rotate(phys.theta);
      const beamTop = -8;
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(-beamHalfPx, beamTop, beamHalfPx * 2, 12);
      ctx.strokeStyle = "#94a3b8";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-beamHalfPx, beamTop, beamHalfPx * 2, 12);
      // Meter ticks every 0.5 m (beam-local coords)
      ctx.strokeStyle = "rgba(148,163,184,0.6)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(148,163,184,0.85)";
      ctx.font = "9px monospace";
      ctx.textAlign = "center";
      for (let m = -BEAM_HALF_M; m <= BEAM_HALF_M + 1e-6; m += 0.5) {
        const x = m * pxPerM;
        const major = Math.abs(m - Math.round(m)) < 1e-6;
        ctx.beginPath();
        ctx.moveTo(x, beamTop + 12);
        ctx.lineTo(x, beamTop + (major ? 4 : 8));
        ctx.stroke();
        if (major) ctx.fillText(m === 0 ? "0" : `${m > 0 ? "+" : ""}${m}`, x, beamTop - 3);
      }

      // Mass positions in beam-local coords (derived from fulcrum + arms)
      const posL = p.fulcrum - p.armL;
      const posR = p.fulcrum + p.armR;
      const xL = (posL - p.fulcrum) * pxPerM;
      const xR = (posR - p.fulcrum) * pxPerM;

      const drawMass = (x: number, mass: number, side: "L" | "R") => {
        const size = 20 + Math.min(22, mass * 1.4);
        // Hanger line
        ctx.strokeStyle = side === "L" ? "#38bdf8" : "#fbbf24";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, beamTop);
        ctx.lineTo(x, beamTop - 10 - size);
        ctx.stroke();
        // Block
        ctx.fillStyle = side === "L" ? "#0c4a6e" : "#713f12";
        ctx.fillRect(x - size / 2, beamTop - 10 - size * 2, size, size);
        ctx.strokeStyle = side === "L" ? "#38bdf8" : "#fbbf24";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x - size / 2, beamTop - 10 - size * 2, size, size);
        // Label
        ctx.fillStyle = "#f1f5f9";
        ctx.font = "bold 10px monospace";
        ctx.fillText(`${mass.toFixed(1)} kg`, x, beamTop - 12 - size * 2);
        // Arm dimension: fulcrum (x=0) to mass
        ctx.strokeStyle = "rgba(226,232,240,0.5)";
        ctx.lineWidth = 1;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.moveTo(0, beamTop + 20);
        ctx.lineTo(x, beamTop + 20);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(226,232,240,0.9)";
        ctx.font = "9px monospace";
        ctx.fillText(`l=${(side === "L" ? p.armL : p.armR).toFixed(1)} m`, x / 2, beamTop + 30);
      };
      drawMass(xL, p.massL, "L");
      drawMass(xR, p.massR, "R");
      ctx.restore();

      // Torque direction arrows at fulcrum
      if (showVectors) {
        const arrowLen = (t: number) => Math.min(64, 14 + Math.abs(t) * 0.35);
        // Left torque: counterclockwise arc
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(fulcrumX, beamY - 26, 34, Math.PI * 0.9, Math.PI * 1.5);
        ctx.stroke();
        // Right torque: clockwise arc
        ctx.strokeStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(fulcrumX, beamY - 26, 46, Math.PI * 1.5, Math.PI * 2.1);
        ctx.stroke();
        ctx.fillStyle = "#94a3b8";
        ctx.font = "9px monospace";
        ctx.textAlign = "left";
        ctx.fillText(`M_L ${arrowLen(mL).toFixed(0)}px`, 12, 22);
        ctx.fillText(`M_R ${arrowLen(mR).toFixed(0)}px`, 12, 36);
      }

      ctx.restore();
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [showVectors]);

  // --- Pointer drag: masses along beam + fulcrum shift (with capture) ---
  const beamMetrics = () => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const pxPerM = Math.min(rect.width / (BEAM_HALF_M * 2 + 1.6), (rect.height - 170) / 3.2);
    const fulcrumX = rect.width / 2 + fulcrum * pxPerM;
    const beamY = rect.height - 130 - 26;
    return { rect, pxPerM, fulcrumX, beamY };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const m = beamMetrics();
    if (!m) return;
    const px = e.clientX - m.rect.left;
    const py = e.clientY - m.rect.top;
    const xL = m.fulcrumX - armL * m.pxPerM;
    const xR = m.fulcrumX + armR * m.pxPerM;
    const dL = Math.hypot(px - xL, py - (m.beamY - 40));
    const dR = Math.hypot(px - xR, py - (m.beamY - 40));
    const dF = Math.hypot(px - m.fulcrumX, py - (m.beamY + 20));
    const best = Math.min(dL, dR, dF);
    if (best > 44) return;
    dragRef.current = best === dL ? "massL" : best === dR ? "massR" : "fulcrum";
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    const m = beamMetrics();
    if (!m) return;
    const px = e.clientX - m.rect.left;
    const beamLocal = (px - m.rect.width / 2) / m.pxPerM; // meters in beam coords
    if (dragRef.current === "fulcrum") {
      const next = Math.max(-1.5, Math.min(1.5, Math.round(beamLocal * 10) / 10));
      setFulcrum(next);
    } else if (dragRef.current === "massL") {
      const next = Math.max(0.5, Math.min(3.5, Math.round((fulcrum - beamLocal) * 10) / 10));
      setArmL(next);
    } else {
      const next = Math.max(0.5, Math.min(3.5, Math.round((beamLocal - fulcrum) * 10) / 10));
      setArmR(next);
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore missing capture
    }
  };

  const handleReset = () => {
    physicsRef.current = { theta: 0, omega: 0 };
    setMassL(8);
    setArmL(2.0);
    setMassR(5);
    setArmR(3.0);
    setFulcrum(0);
  };

  const buildFinding = () => {
    const mNetAbs = Math.abs(metrics.torqueNet);
    return lang === "de"
      ? `Hebel-Befund (Drehpunktbilanz):\n- Links: m_L = ${massL} kg an l_L = ${armL} m -> M_L = ${metrics.torqueL} N*m\n- Rechts: m_R = ${massR} kg an l_R = ${armR} m -> M_R = ${metrics.torqueR} N*m\n- Bedingung Summe M = 0 ${mNetAbs <= BALANCE_TOL_NM ? "erfuellt" : "nicht erfuellt"} (|M_net| = ${mNetAbs} N*m, Neigung ${metrics.thetaDeg} Grad).\n- Merksatz: Gleichgewicht gilt genau bei m_L * l_L = m_R * l_R.`
      : `杠杆平衡实验记录（支点力矩平衡）：\n- 左侧：m_L = ${massL} kg，力臂 l_L = ${armL} m，力矩 M_L = ${metrics.torqueL} N*m\n- 右侧：m_R = ${massR} kg，力臂 l_R = ${armR} m，力矩 M_R = ${metrics.torqueR} N*m\n- 平衡条件 ΣM = 0${mNetAbs <= BALANCE_TOL_NM ? "成立" : "不成立"}（|M_net| = ${mNetAbs} N*m，横梁倾角 ${metrics.thetaDeg}°）。\n- 结论：平衡当且仅当 m_L · l_L = m_R · l_R。`;
  };

  const handleExport = () => {
    const text = buildFinding();
    if (onExportFinding) {
      onExportFinding(text);
    } else {
      void navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-medium uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Mechanik · Drehmoment-Labor" : "力学 · 力矩平衡实验"}
          </span>
          <span className="text-[var(--gray)]">/</span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Hebel im Gleichgewicht: Drehmoment-Bilanz" : "杠杆平衡：合力矩决定横梁倾角"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowVectors(!showVectors)}
            className={`px-2 py-1 text-xs font-mono rounded border transition-colors ${
              showVectors
                ? "border-[var(--accent)] bg-[var(--paper-subtle)] text-[var(--accent)] font-medium"
                : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)]"
            }`}
            title={lang === "de" ? "Drehmomentpfeile einblenden" : "显示力矩方向箭头"}
          >
            {showVectors
              ? lang === "de" ? "Momentpfeile an" : "力矩箭头开"
              : lang === "de" ? "Momentpfeile aus" : "力矩箭头关"}
          </button>
          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="px-2.5 py-1 text-xs font-mono rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)] transition-colors flex items-center gap-1"
            title={lang === "de" ? "Bedienfeld einklappen / ausklappen" : "折叠/展开侧栏参数面板"}
          >
            <span>{showPanels ? "◧" : "◩"}</span>
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠侧栏") : (lang === "de" ? "Ausklappen" : "展开侧栏")}</span>
          </button>
        </div>
      </div>

      {/* Main grid: 8:4 expanded, full width collapsed */}
      <div className={`grid gap-5 ${showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        {/* Canvas stage */}
        <div className={`flex flex-col space-y-3 ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] rounded-[var(--radius)] overflow-hidden">
            {/* Balance lamp + telemetry */}
            <div className="absolute top-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
              <div
                className={`flex items-center gap-2 px-2.5 py-1 rounded border font-mono text-xs font-semibold ${
                  metrics.balanced
                    ? "border-emerald-500/50 bg-emerald-950/60 text-emerald-300"
                    : "border-amber-500/50 bg-amber-950/60 text-amber-300"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${metrics.balanced ? "bg-emerald-400" : "bg-amber-400"}`} />
                <span>
                  {metrics.balanced
                    ? lang === "de" ? "Gleichgewicht: Summe M = 0" : "平衡：合力矩 ΣM = 0"
                    : lang === "de" ? `Kippt: M_net = ${metrics.torqueNet} N·m` : `倾斜：M_net = ${metrics.torqueNet} N·m`}
                </span>
              </div>
              <div className="font-mono text-[11px] text-slate-300 tabular-nums">
                <span>θ = {metrics.thetaDeg}°</span>
                <span className="ml-3">M_L = {metrics.torqueL} N·m</span>
                <span className="ml-3">M_R = {metrics.torqueR} N·m</span>
              </div>
            </div>
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="w-full h-[420px] sm:h-[480px] block cursor-grab active:cursor-grabbing touch-none select-none pt-12"
            />
            <div className="absolute bottom-2 left-3 text-[10px] font-mono text-slate-400 bg-[#0b0f1a]/80 px-2 py-0.5 rounded border border-slate-700 pointer-events-none">
              {lang === "de"
                ? "Hinweis: Massen und Drehpunkt mit Zeiger direkt ziehen"
                : "提示：可直接拖拽两侧砝码与支点"}
            </div>
          </div>

          {/* Transport bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-[var(--surface)] p-2.5 rounded-[var(--radius)] border border-[var(--line)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1 font-mono text-xs uppercase bg-[var(--ink)] text-[var(--paper)] rounded hover:opacity-90 cursor-pointer"
              >
                {isPlaying ? (lang === "de" ? "Pause" : "暂停") : (lang === "de" ? "Start" : "开始")}
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-2.5 py-1 font-mono text-xs border border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)] rounded cursor-pointer"
              >
                {lang === "de" ? "Zurücksetzen" : "重置"}
              </button>
            </div>
            <div className="text-[11px] font-mono text-[var(--gray)] tabular-nums">
              {lang === "de" ? "Neigung folgt gedaempft dem Drehmoment" : "横梁倾角按合力矩阻尼趋衡"}
            </div>
          </div>
        </div>

        {/* Side panel: sliders + torque table */}
        {showPanels && (
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="border border-[var(--line)] bg-[var(--surface)] p-4 rounded-[var(--radius)] space-y-3.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                {lang === "de" ? "Massen & Hebelarme" : "砝码质量与力臂"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor={massLSliderId} className="text-[var(--gray)]">
                    {lang === "de" ? "Masse links m_L:" : "左侧质量 m_L："}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{massL.toFixed(1)} kg</span>
                </div>
                <input
                  id={massLSliderId}
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={massL}
                  onChange={(e) => setMassL(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor={armLSliderId} className="text-[var(--gray)]">
                    {lang === "de" ? "Hebelarm links l_L:" : "左侧力臂 l_L："}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{armL.toFixed(1)} m</span>
                </div>
                <input
                  id={armLSliderId}
                  type="range"
                  min={0.5}
                  max={3.5}
                  step={0.1}
                  value={armL}
                  onChange={(e) => setArmL(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor={massRSliderId} className="text-[var(--gray)]">
                    {lang === "de" ? "Masse rechts m_R:" : "右侧质量 m_R："}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{massR.toFixed(1)} kg</span>
                </div>
                <input
                  id={massRSliderId}
                  type="range"
                  min={1}
                  max={20}
                  step={0.5}
                  value={massR}
                  onChange={(e) => setMassR(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor={armRSliderId} className="text-[var(--gray)]">
                    {lang === "de" ? "Hebelarm rechts l_R:" : "右侧力臂 l_R："}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{armR.toFixed(1)} m</span>
                </div>
                <input
                  id={armRSliderId}
                  type="range"
                  min={0.5}
                  max={3.5}
                  step={0.1}
                  value={armR}
                  onChange={(e) => setArmR(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <label htmlFor={fulcrumSliderId} className="text-[var(--gray)]">
                    {lang === "de" ? "Drehpunktlage:" : "支点位置："}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">
                    {fulcrum > 0 ? "+" : ""}{fulcrum.toFixed(1)} m
                  </span>
                </div>
                <input
                  id={fulcrumSliderId}
                  type="range"
                  min={-1.5}
                  max={1.5}
                  step={0.1}
                  value={fulcrum}
                  onChange={(e) => setFulcrum(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
            </div>

            {/* Torque comparison table */}
            <div className="border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 rounded-[var(--radius)] space-y-2">
              <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
                {lang === "de" ? "Drehmoment-Bilanz (N·m)" : "力矩数值对照表 (N·m)"}
              </div>
              <div className="font-mono text-xs space-y-1.5 tabular-nums">
                <div className="flex justify-between border-b border-[var(--line)] pb-1">
                  <span className="text-sky-700">M_L = m_L · g · l_L</span>
                  <span className="font-bold text-[var(--ink)]">{metrics.torqueL}</span>
                </div>
                <div className="flex justify-between border-b border-[var(--line)] pb-1">
                  <span className="text-amber-700">M_R = m_R · g · l_R</span>
                  <span className="font-bold text-[var(--ink)]">{metrics.torqueR}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">M_net = M_L − M_R</span>
                  <span className={`font-bold ${metrics.balanced ? "text-emerald-700" : "text-red-700"}`}>
                    {metrics.torqueNet}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom four-card row: formula / curriculum / method / export */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-2">
          <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
            01 · {lang === "de" ? "Formel" : "公式"}
          </div>
          <MathHtml
            code="\sum M = \sum F_i \cdot l_i = 0 \;\Rightarrow\; m_L \cdot l_L = m_R \cdot l_R"
            display={true}
            cacheKey="lever-balance:formel"
          />
          <p className="text-[11px] font-serif text-[var(--gray)] leading-relaxed">
            {lang === "de"
              ? "Am Drehpunkt heben sich linksdrehende und rechtsdrehende Momente auf."
              : "以支点为转轴，左侧逆时针力矩与右侧顺时针力矩相互抵消。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-2">
          <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
            02 · {lang === "de" ? "KLP / Operatoren" : "考纲 / 作答指令"}
          </div>
          <p className="text-[11px] font-serif text-[var(--ink)] leading-relaxed">
            {lang === "de"
              ? "NRW EF Physik, Mechanik: Hebelgesetz. Operatoren: beschreiben (Anordnung), berechnen (M = F · l), beurteilen (Gleichgewichtslage begründen)."
              : "NRW EF 物理考纲（力学 · 杠杆定律）。作答指令：beschreiben（描述装置）、berechnen（计算 M = F · l）、beurteilen（论证平衡状态）。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-2">
          <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
            03 · {lang === "de" ? "Verständnis (CN)" : "中文理解"}
          </div>
          <p className="text-[11px] font-serif text-[var(--ink)] leading-relaxed">
            {lang === "de"
              ? "Gleiches Produkt aus Masse und Arm auf beiden Seiten hält den Balken waagerecht; jede Differenz kippt ihn gedaempft zur schweren Seite."
              : "两侧“质量 × 力臂”乘积相等横梁才水平；乘积差驱动横梁向重侧阻尼倾斜，差为零即平衡。解题三步：定支点、算两侧 M、比大小判方向。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-2 flex flex-col">
          <div className="font-mono text-[10px] uppercase text-[var(--accent)] font-semibold">
            04 · {lang === "de" ? "Befund exportieren" : "导出结论"}
          </div>
          <p className="text-[11px] font-serif text-[var(--gray)] leading-relaxed flex-1">
            {lang === "de"
              ? `Aktuell: M_L = ${metrics.torqueL} N·m, M_R = ${metrics.torqueR} N·m.`
              : `当前：M_L = ${metrics.torqueL} N·m，M_R = ${metrics.torqueR} N·m。`}
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="w-full py-1.5 text-center text-xs font-mono border border-[var(--line)] rounded-[var(--radius)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "de" ? "Befund übernehmen" : "导出实验结论"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeverBalanceSim;
