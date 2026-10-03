import { useRef, useEffect, useState, useCallback, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface OsmoseSimulatorProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
  initialPsiSInnen?: number;
  initialPsiSAussen?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  kind: "water" | "solute"; // water = blue, solute = amber/larger
  side: "left" | "right"; // left = innen (Zelle), right = aussen (Medium)
}

interface OsmoseReadout {
  psiInnen: number;
  psiAussen: number;
  deltaPsi: number;
  turgor: number;
  waterFlowRate: number; // net particles crossing per sec
  plasmolyseQuote: number;
}

const COL_WATER = "#1e40af"; // Deep sea blue
const COL_SOLUTE = "#b45309"; // Amber-700
const COL_WALL = "#3f3f46"; // Zinc-700
const COL_MEMBRANE = "#0284c7"; // Sky-600
const COL_TURGOR_GOOD = "#065f46"; // Emerald-800
const COL_PLASMOLYSE = "#9f1239"; // Rose-800
const COL_INK = "#18181b";

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
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

function IconPanels() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
      <line x1="10" y1="2" x2="10" y2="14" />
    </svg>
  );
}

export function OsmoseSimulator({
  lang,
  studioMode: _studioMode = true,
  onExportFinding,
  initialPsiSInnen = -0.8,
  initialPsiSAussen = -0.3,
}: OsmoseSimulatorProps) {
  void _studioMode;
  const isZh = lang === "zh";

  // State
  const [psiSInnen, setPsiSInnen] = useState<number>(initialPsiSInnen);
  const [psiPInnen, setPsiPInnen] = useState<number>(0.3);
  const [psiSAussen, setPsiSAussen] = useState<number>(initialPsiSAussen);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isCellTypePlant, setIsCellTypePlant] = useState<boolean>(true); // true = plant (with wall), false = erythrocyte (no wall)
  const [showPanels, setShowPanels] = useState<boolean>(true);

  // Accessible IDs
  const innenId = useId();
  const aussenId = useId();
  const turgorId = useId();

  // Canvas refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Physical calculation
  const psiInnen = Number((psiSInnen + psiPInnen).toFixed(2));
  const psiAussen = Number(psiSAussen.toFixed(2));
  const deltaPsi = Number((psiAussen - psiInnen).toFixed(2));

  // Turgor & Plasmolyse state
  let statusTextDE = "Normaler Turgor (Dynamisches Gleichgewicht)";
  let statusTextZH = "正常细胞膨压（动态平衡）";
  let statusCol = COL_INK;

  if (deltaPsi > 0.05) {
    if (!isCellTypePlant && deltaPsi > 0.35) {
      statusTextDE = "Hämolyse-Alarm! (Tierische Zelle platzt ohne Zellwand)";
      statusTextZH = "红细胞溶血破裂！（无细胞壁保护导致过度吸水胀破）";
      statusCol = COL_PLASMOLYSE;
    } else {
      statusTextDE = "Wasser-Einstrom (Deplasmolyse / Turgoraufbau)";
      statusTextZH = "水分净内流（质壁分离复原 / 膨压上升）";
      statusCol = COL_TURGOR_GOOD;
    }
  } else if (deltaPsi < -0.05) {
    if (psiPInnen <= 0.05 || deltaPsi < -0.3) {
      statusTextDE = "Plasmolyse! (Protoplast löst sich von der Zellwand)";
      statusTextZH = "质壁分离！（原生质体脱水皱缩、脱离细胞壁）";
      statusCol = COL_PLASMOLYSE;
    } else {
      statusTextDE = "Wasser-Ausstrom (Turgorverlust)";
      statusTextZH = "水分净外流（细胞膨压下降）";
      statusCol = COL_SOLUTE;
    }
  }

  // Readout state for UI (throttled)
  const [readout, setReadout] = useState<OsmoseReadout>({
    psiInnen,
    psiAussen,
    deltaPsi,
    turgor: psiPInnen,
    waterFlowRate: 0,
    plasmolyseQuote: deltaPsi < -0.15 ? Math.min(100, Math.round(Math.abs(deltaPsi) * 120)) : 0,
  });

  // Simulation Particle Engine in useRef (Decoupled 60FPS)
  const simRef = useRef<{
    particles: Particle[];
    frame: number;
    netCrossCounter: number;
    membraneX: number; // normalized
    poreYPositions: number[];
  }>({
    particles: [],
    frame: 0,
    netCrossCounter: 0,
    membraneX: 0.5,
    poreYPositions: [0.2, 0.35, 0.5, 0.65, 0.8],
  });

  // Initialize particles
  const initParticles = useCallback((sInnen: number, sAussen: number) => {
    const pts: Particle[] = [];
    // Number of water particles (constant base)
    const N_WATER_LEFT = 40;
    const N_WATER_RIGHT = 40;

    // Number of solute particles corresponds to negative solute potential (concentration)
    const nSoluteLeft = Math.round(Math.abs(sInnen) * 35);
    const nSoluteRight = Math.round(Math.abs(sAussen) * 35);

    // Left compartment (Cell / Innen)
    for (let i = 0; i < N_WATER_LEFT; i++) {
      pts.push({
        x: 0.05 + Math.random() * 0.42,
        y: 0.08 + Math.random() * 0.84,
        vx: (Math.random() - 0.5) * 0.006,
        vy: (Math.random() - 0.5) * 0.006,
        kind: "water",
        side: "left",
      });
    }
    for (let i = 0; i < nSoluteLeft; i++) {
      pts.push({
        x: 0.05 + Math.random() * 0.42,
        y: 0.08 + Math.random() * 0.84,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        kind: "solute",
        side: "left",
      });
    }

    // Right compartment (Medium / Aussen)
    for (let i = 0; i < N_WATER_RIGHT; i++) {
      pts.push({
        x: 0.53 + Math.random() * 0.42,
        y: 0.08 + Math.random() * 0.84,
        vx: (Math.random() - 0.5) * 0.006,
        vy: (Math.random() - 0.5) * 0.006,
        kind: "water",
        side: "right",
      });
    }
    for (let i = 0; i < nSoluteRight; i++) {
      pts.push({
        x: 0.53 + Math.random() * 0.42,
        y: 0.08 + Math.random() * 0.84,
        vx: (Math.random() - 0.5) * 0.003,
        vy: (Math.random() - 0.5) * 0.003,
        kind: "solute",
        side: "right",
      });
    }

    simRef.current.particles = pts;
  }, []);

  // Reset or re-init on parameter jump
  useEffect(() => {
    initParticles(psiSInnen, psiSAussen);
  }, [psiSInnen, psiSAussen, initParticles]);

  // Main 60FPS rAF Simulation Loop
  useEffect(() => {
    let animId: number;

    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        animId = requestAnimationFrame(render);
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Dynamic DPR scaling
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

      // Clean background (Tufte Paper subtle)
      ctx.fillStyle = "#fafafa";
      ctx.fillRect(0, 0, dispW, dispH);

      const memX = dispW * 0.5;
      const sim = simRef.current;
      sim.frame++;

      // Physical drift bias based on Delta_Psi (Water moves to more negative Psi side)
      // deltaPsi = Psi_aussen - Psi_innen. If deltaPsi > 0 -> flow inward (right to left). If < 0 -> left to right.
      const driftVx = isPlaying ? clamp(-deltaPsi * 0.0018, -0.004, 0.004) : 0;

      // Update particles
      for (const p of sim.particles) {
        if (isPlaying) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.kind === "water") {
            p.x += driftVx;
          }

          // Boundary bouncing (left, right, top, bottom)
          if (p.x < 0.03) { p.x = 0.03; p.vx = Math.abs(p.vx); }
          if (p.x > 0.97) { p.x = 0.97; p.vx = -Math.abs(p.vx); }
          if (p.y < 0.05) { p.y = 0.05; p.vy = Math.abs(p.vy); }
          if (p.y > 0.95) { p.y = 0.95; p.vy = -Math.abs(p.vy); }

          // Semi-permeable membrane interaction at x = 0.50
          const distToMem = Math.abs(p.x - 0.5);
          if (distToMem < 0.015) {
            if (p.kind === "solute") {
              // Solute can NEVER cross (100% bounce)
              if (p.x < 0.5) {
                p.x = 0.485;
                p.vx = -Math.abs(p.vx);
              } else {
                p.x = 0.515;
                p.vx = Math.abs(p.vx);
              }
            } else {
              // Water can cross if aligned with aquaporin pores
              const nearPore = sim.poreYPositions.some((py) => Math.abs(p.y - py) < 0.04);
              if (nearPore) {
                // cross membrane
                if (p.x < 0.5 && p.vx > 0) {
                  sim.netCrossCounter++;
                } else if (p.x > 0.5 && p.vx < 0) {
                  sim.netCrossCounter--;
                }
              } else {
                // bounce on lipid barrier
                p.vx = p.x < 0.5 ? -Math.abs(p.vx) : Math.abs(p.vx);
              }
            }
          }
        }
      }

      // Draw Membrane barrier at center
      ctx.strokeStyle = COL_WALL;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(memX, 16);
      ctx.lineTo(memX, dispH - 16);
      ctx.stroke();

      // Draw Aquaporin Pores (openings)
      ctx.fillStyle = COL_MEMBRANE;
      for (const py of sim.poreYPositions) {
        const poreCenterY = dispH * py;
        // clear gap
        ctx.clearRect(memX - 4, poreCenterY - 10, 8, 20);
        ctx.fillStyle = "#fafafa";
        ctx.fillRect(memX - 4, poreCenterY - 10, 8, 20);

        // draw pore ring
        ctx.strokeStyle = COL_MEMBRANE;
        ctx.lineWidth = 2.5;
        ctx.strokeRect(memX - 5, poreCenterY - 10, 10, 20);
      }

      // Draw Chamber Labels & Headers
      ctx.font = "600 11px system-ui, -apple-system, sans-serif";
      ctx.fillStyle = COL_INK;
      ctx.fillText(isZh ? "【细胞内液】Protoplast (Zellinneres)" : "【Zellinneres】Protoplast (Vakuole)", 24, 28);
      ctx.fillText(isZh ? "【外界介质】Aussenmedium" : "【Außenmedium】Lösung", memX + 20, 28);

      // Draw Particles
      for (const p of sim.particles) {
        const px = p.x * dispW;
        const py = p.y * dispH;

        if (p.kind === "water") {
          ctx.fillStyle = COL_WATER;
          ctx.beginPath();
          ctx.arc(px, py, 3.2, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = COL_SOLUTE;
          ctx.beginPath();
          ctx.arc(px, py, 6.0, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#78350f";
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw Net Flow Velocity Vector in Center
      if (Math.abs(deltaPsi) > 0.05) {
        const arrowY = dispH * 0.5;
        const arrowDir = deltaPsi > 0 ? -1 : 1; // -1: right to left (Einstrom), 1: left to right (Ausstrom)
        const arrowStart = memX + (arrowDir > 0 ? -40 : 40);
        const arrowEnd = memX + (arrowDir > 0 ? 40 : -40);

        ctx.strokeStyle = deltaPsi > 0 ? COL_TURGOR_GOOD : COL_PLASMOLYSE;
        ctx.fillStyle = ctx.strokeStyle;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(arrowStart, arrowY);
        ctx.lineTo(arrowEnd, arrowY);
        ctx.stroke();

        // Arrow head
        ctx.beginPath();
        ctx.moveTo(arrowEnd, arrowY);
        ctx.lineTo(arrowEnd - arrowDir * 8, arrowY - 6);
        ctx.lineTo(arrowEnd - arrowDir * 8, arrowY + 6);
        ctx.closePath();
        ctx.fill();

        ctx.font = "bold 11px monospace";
        ctx.textAlign = "center";
        ctx.fillText(
          deltaPsi > 0 ? "NETTO-EINSTROM (Deplasmolyse)" : "NETTO-AUSSTROM (Plasmolyse)",
          memX,
          arrowY - 14
        );
        ctx.textAlign = "start";
      }

      // Throttled React state update (every 10 frames)
      if (sim.frame % 10 === 0) {
        setReadout({
          psiInnen,
          psiAussen,
          deltaPsi,
          turgor: psiPInnen,
          waterFlowRate: Number((deltaPsi * 12.5).toFixed(1)),
          plasmolyseQuote: deltaPsi < -0.15 ? Math.min(100, Math.round(Math.abs(deltaPsi) * 120)) : 0,
        });
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animId);
  }, [psiInnen, psiAussen, deltaPsi, psiPInnen, isPlaying, isCellTypePlant, isZh]);

  // Preset Scenario Handlers
  const handlePreset = (preset: "normal" | "hyperton" | "hypoton" | "haemolyse") => {
    switch (preset) {
      case "normal":
        setIsCellTypePlant(true);
        setPsiSInnen(-0.8);
        setPsiPInnen(0.5);
        setPsiSAussen(-0.3); // Delta_Psi = 0.0
        break;
      case "hyperton":
        setIsCellTypePlant(true);
        setPsiSInnen(-0.5);
        setPsiPInnen(0.0);
        setPsiSAussen(-1.2); // Delta_Psi = -0.7 (Plasmolyse!)
        break;
      case "hypoton":
        setIsCellTypePlant(true);
        setPsiSInnen(-0.9);
        setPsiPInnen(0.6);
        setPsiSAussen(-0.05); // Delta_Psi = +0.25 (Prall / Wanddruck)
        break;
      case "haemolyse":
        setIsCellTypePlant(false); // Tierische Blutzelle
        setPsiSInnen(-0.7);
        setPsiPInnen(0.0);
        setPsiSAussen(0.0); // Reinwasser -> Burst
        break;
    }
  };

  // Export finding to AI Tutor
  const handleExport = () => {
    const report = isZh
      ? `【生物膜渗透与水势实验数据】
- 细胞内水势: Ψ_innen = ${psiInnen} MPa (溶质势 Ψs=${psiSInnen}, 膨压 Ψp=${psiPInnen})
- 外界介质水势: Ψ_aussen = ${psiAussen} MPa
- 水势驱动差值: ΔΨ = ${deltaPsi} MPa
- 细胞形态判定: ${statusTextZH} (脱壁率/膨胀: ${readout.plasmolyseQuote} %)
- 结论: 水分子顺水势梯度被动扩散，永远流向水势更低（负值更大）的一侧。`
      : `【Osmose & Wasserpotenzial Befund】
- Ψ(innen) = ${psiInnen} MPa (Ψs = ${psiSInnen}, Ψp = ${psiPInnen})
- Ψ(aussen) = ${psiAussen} MPa
- ΔΨ = ${deltaPsi} MPa
- Zustand: ${statusTextDE}
- Befund: Wasser folgt passiv dem Potenzialgefälle zur Seite des stärker negativen Psi-Werts.`;

    if (onExportFinding) {
      onExportFinding(report);
    } else {
      navigator.clipboard.writeText(report);
      alert(isZh ? "实验结论已复制至剪贴板！" : "Befund in die Zwischenablage kopiert!");
    }
  };

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
      {/* 1. Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
            Labor 01 · Bio IF1 EF (KLP NRW) · 60FPS Micro-Dynamics
          </div>
          <h3 className="font-serif text-lg font-semibold text-[var(--ink)] tracking-tight mt-0.5">
            {isZh ? "渗透作用与水势物理沙盘 (Osmose & Wasserpotenzial-Labor)" : "Osmose-Labor: Wasserpotenzial & Plasmolyse"}
          </h3>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] rounded cursor-pointer transition-colors"
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <IconPause /> : <IconPlay />}
            <span>{isPlaying ? (isZh ? "暂停" : "Pause") : (isZh ? "运行" : "Start")}</span>
          </button>

          <button
            type="button"
            onClick={() => handlePreset("normal")}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] rounded cursor-pointer transition-colors"
            title="Reset"
          >
            <IconReset />
          </button>

          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] rounded cursor-pointer transition-colors"
            title="Toggle Control Panels"
          >
            <IconPanels />
            <span className="hidden sm:inline">{showPanels ? (isZh ? "折叠面板" : "Panels verbergen") : (isZh ? "展开面板" : "Panels anzeigen")}</span>
          </button>
        </div>
      </div>

      {/* 2. Main Lab Stage (Dual Scale: Canvas + Control Panel) */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Stage Canvas Area */}
        <div className={`${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-300`}>
          <div className="relative border border-[var(--line)] rounded-[var(--radius)] overflow-hidden bg-[#fafafa]">
            <canvas
              ref={canvasRef}
              className="w-full h-[320px] sm:h-[380px] block cursor-crosshair"
              aria-label="Osmose-Molekularsimulation"
            />

            {/* Stage Status Capsule */}
            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-white/90 backdrop-blur border border-[var(--line)] rounded text-xs font-mono shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: statusCol }} />
                <span className="font-semibold" style={{ color: statusCol }}>
                  {isZh ? statusTextZH : statusTextDE}
                </span>
              </div>
              <div className="text-[var(--ink-muted)] text-[11px]">
                ΔΨ = <strong className="font-mono text-[var(--ink)]">{deltaPsi > 0 ? `+${deltaPsi}` : deltaPsi} MPa</strong>
                {" · "}
                {deltaPsi > 0 ? (isZh ? "水分子净流入" : "Wasser strömt ein") : deltaPsi < 0 ? (isZh ? "水分子净流出" : "Wasser strömt aus") : (isZh ? "净流速为零" : "Kein Nettofluss")}
              </div>
            </div>
          </div>
        </div>

        {/* Right Parameters & Presets Panel */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-4 space-y-3 font-mono text-xs">
            {/* Presets */}
            <div className="p-3 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper-subtle)] space-y-2">
              <div className="text-[11px] font-sans font-semibold text-[var(--ink)]">
                {isZh ? "⚡️ 考纲典型实验情境" : "⚡️ Klausur-typische Szenarien"}
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePreset("normal")}
                  className="px-2 py-1 text-left border border-[var(--line)] bg-white hover:bg-[var(--line)] text-[11px] rounded transition-colors"
                >
                  {isZh ? "1. 正常膨压态" : "1. Normal-Turgor"}
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset("hyperton")}
                  className="px-2 py-1 text-left border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-900 text-[11px] rounded transition-colors font-medium"
                >
                  {isZh ? "2. 质壁分离!" : "2. Plasmolyse!"}
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset("hypoton")}
                  className="px-2 py-1 text-left border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-emerald-900 text-[11px] rounded transition-colors font-medium"
                >
                  {isZh ? "3. 去质壁复原" : "3. Deplasmolyse"}
                </button>
                <button
                  type="button"
                  onClick={() => handlePreset("haemolyse")}
                  className="px-2 py-1 text-left border border-amber-200 bg-amber-50/60 hover:bg-amber-100 text-amber-900 text-[11px] rounded transition-colors font-medium"
                >
                  {isZh ? "4. 红细胞溶血" : "4. Hämolyse (Tier)"}
                </button>
              </div>
            </div>

            {/* Sliders */}
            <div className="p-3 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] space-y-3">
              {/* Außenlösung Solutpotenzial */}
              <div>
                <div className="flex justify-between items-center text-[var(--ink)] mb-1">
                  <label htmlFor={aussenId} className="cursor-pointer text-[11px]">
                    {isZh ? "外界溶质势 Ψs(aussen):" : "Außenmedium Ψs(aussen):"}
                  </label>
                  <span className="font-semibold text-amber-800">{psiSAussen} MPa</span>
                </div>
                <input
                  id={aussenId}
                  type="range"
                  min="-1.5"
                  max="0"
                  step="0.05"
                  value={psiSAussen}
                  onChange={(e) => setPsiSAussen(parseFloat(e.target.value))}
                  className="w-full accent-amber-700 cursor-pointer"
                />
              </div>

              {/* Innenlösung Solutpotenzial */}
              <div>
                <div className="flex justify-between items-center text-[var(--ink)] mb-1">
                  <label htmlFor={innenId} className="cursor-pointer text-[11px]">
                    {isZh ? "细胞溶质势 Ψs(innen):" : "Zellsaft Ψs(innen):"}
                  </label>
                  <span className="font-semibold text-amber-800">{psiSInnen} MPa</span>
                </div>
                <input
                  id={innenId}
                  type="range"
                  min="-1.5"
                  max="-0.1"
                  step="0.05"
                  value={psiSInnen}
                  onChange={(e) => setPsiSInnen(parseFloat(e.target.value))}
                  className="w-full accent-amber-700 cursor-pointer"
                />
              </div>

              {/* Turgor / Druckpotenzial */}
              {isCellTypePlant && (
                <div>
                  <div className="flex justify-between items-center text-[var(--ink)] mb-1">
                    <label htmlFor={turgorId} className="cursor-pointer text-[11px]">
                      {isZh ? "细胞壁膨压 Ψp(Turgor):" : "Wandgegendruck Ψp(Turgor):"}
                    </label>
                    <span className="font-semibold text-emerald-800">+{psiPInnen} MPa</span>
                  </div>
                  <input
                    id={turgorId}
                    type="range"
                    min="0"
                    max="0.8"
                    step="0.05"
                    value={psiPInnen}
                    onChange={(e) => setPsiPInnen(parseFloat(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Dynamic Formula Display Box */}
            <div className="p-3 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--paper-subtle)] space-y-1.5 text-[11px]">
              <div className="text-[var(--ink-muted)] uppercase tracking-wider text-[10px]">Wasserpotenzial-Bilanz</div>
              <div className="text-[var(--ink)]">
                <MathHtml
                  code={`\\Psi_{\\text{innen}} = ${psiSInnen} + (${psiPInnen}) = ${psiInnen}\\,\\text{MPa}`}
                  display={false}
                  cacheKey={`psi_in_${psiSInnen}_${psiPInnen}`}
                />
              </div>
              <div className="text-[var(--ink)]">
                <MathHtml
                  code={`\\Delta\\Psi = \\Psi_{\\text{aussen}} - \\Psi_{\\text{innen}} = ${deltaPsi}\\,\\text{MPa}`}
                  display={false}
                  cacheKey={`delta_psi_${deltaPsi}`}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Four-Card Bilingual Pedagogical Scaffold (PHET SOP Standard) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 01 / Formel & Gesetz */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel & Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">Wasserpotenzial & van't Hoff</div>
          <div className="font-mono text-xs text-blue-900 mb-1.5">
            <MathHtml
              code={"\\Psi = \\Psi_s + \\Psi_p \\quad \\pi = i\\cdot c\\cdot R\\cdot T"}
              display={false}
              cacheKey="osmose_main_formula"
            />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "水势包含溶质势（负值吸水）与膨压势（正值顶壁）；范特霍夫公式决定渗透压大小。"
              : "Wasserpotenzial addiert osmotischen Anteil und Druckpotenzial; van 't Hoff bestimmt den osmotischen Druck."}
          </p>
        </div>

        {/* 02 / Abitur KLP NRW */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">Inhaltsfeld 1: Biomembran</div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1 rounded">erklären</code>
            <p className="mt-1">
              {isZh
                ? "必须熟练解释洋葱表皮质壁分离与Deplasmolyse；比较动植物细胞在低渗介质下的不同表现。"
                : "Plasmolyse und Deplasmolyse anhand von Wasserpotenzialdifferenzen und Turgor fachgerecht erklären."}
            </p>
          </div>
        </div>

        {/* 03 / 🇨🇳 CN-Methode */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / 🇨🇳 CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">水势十字与一吸一顶</div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "速记诀窍：水永远往低处流（更负的一侧）。溶质势越负吸水力越强，细胞壁膨压向外顶，两者相加定流向。"
              : "Merkregel: Wasser strömt stets zum stärker negativen Psi-Wert. Konzentriertere Lösung saugt, Turgor drückt dagegen."}
          </p>
        </div>

        {/* 04 / KI-Tutor Dialog */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">Befunde exportieren</div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh ? "将当前水势读数与渗透结论导出至 AI 助教，进行高阶考题推演。" : "Aktuelle Messwerte direkt an den KI-Tutor übertragen."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] rounded text-[11px] font-medium transition-colors cursor-pointer"
          >
            {isZh ? "发送给 AI 助教研讨 ↗" : "An Tutor senden ↗"}
          </button>
        </div>
      </div>
    </div>
  );
}
