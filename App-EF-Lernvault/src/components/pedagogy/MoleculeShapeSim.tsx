import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface MoleculeShapeSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

// ---- VSEPR-Modell (handgeschrieben, SVG-Projektion, keine 3D-Bibliothek) ----
// Sterikzahl SN = m (Bindungen) + n (freie Paare) legt die Elektronen­
// geometrie fest; freie Paare stauchen den Bindungswinkel (LP-LP > LP-BP > BP-BP).
interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function norm(v: Vec3): Vec3 {
  const l = Math.hypot(v.x, v.y, v.z) || 1;
  return { x: v.x / l, y: v.y / l, z: v.z / l };
}

function angleDeg(a: Vec3, b: Vec3): number {
  const c = Math.min(1, Math.max(-1, a.x * b.x + a.y * b.y + a.z * b.z));
  return (Math.acos(c) * 180) / Math.PI;
}

// AX3E (NH3, trigonal-pyramidal): drei Bindungen symmetrisch um die -z-Achse,
// Halbwinkel alpha so gewaehlt, dass der Paarwinkel 107,0° betraegt:
// cos(beta) = cos²(alpha) - 0,5·sin²(alpha)  =>  cos²(alpha) = (cos(beta)+0,5)/1,5.
const BETA_AX3E = (107.0 * Math.PI) / 180;
const COS_A3E = Math.sqrt((Math.cos(BETA_AX3E) + 0.5) / 1.5);
const SIN_A3E = Math.sqrt(Math.max(0, 1 - COS_A3E * COS_A3E));

// AX2E2 (H2O, gewinkelt): zwei Bindungen in der xz-Ebene, Oeffnung 104,5°.
const HALF_AX2E2 = ((104.5 / 2) * Math.PI) / 180;

interface VseprConfig {
  id: string;
  axe: string;
  example: string;
  central: string;
  ligand: string;
  shapeDE: string;
  shapeZH: string;
  electronDE: string;
  electronZH: string;
  idealDeg: number;
  bonds: Vec3[];
  lonePairs: Vec3[];
}

const CONFIGS: VseprConfig[] = [
  {
    id: "ax2",
    axe: "AX2",
    example: "CO2",
    central: "C",
    ligand: "O",
    shapeDE: "linear",
    shapeZH: "直线形",
    electronDE: "linear",
    electronZH: "直线",
    idealDeg: 180,
    bonds: [
      { x: 1, y: 0, z: 0 },
      { x: -1, y: 0, z: 0 },
    ],
    lonePairs: [],
  },
  {
    id: "ax3",
    axe: "AX3",
    example: "BF3",
    central: "B",
    ligand: "F",
    shapeDE: "trigonal-planar",
    shapeZH: "平面三角形",
    electronDE: "trigonal-planar",
    electronZH: "平面三角",
    idealDeg: 120,
    bonds: [
      { x: 1, y: 0, z: 0 },
      { x: -0.5, y: Math.sqrt(3) / 2, z: 0 },
      { x: -0.5, y: -Math.sqrt(3) / 2, z: 0 },
    ],
    lonePairs: [],
  },
  {
    id: "ax4",
    axe: "AX4",
    example: "CH4",
    central: "C",
    ligand: "H",
    shapeDE: "tetraedrisch",
    shapeZH: "正四面体",
    electronDE: "tetraedrisch",
    electronZH: "正四面体",
    idealDeg: 109.5,
    bonds: [
      norm({ x: 1, y: 1, z: 1 }),
      norm({ x: 1, y: -1, z: -1 }),
      norm({ x: -1, y: 1, z: -1 }),
      norm({ x: -1, y: -1, z: 1 }),
    ],
    lonePairs: [],
  },
  {
    id: "ax3e",
    axe: "AX3E",
    example: "NH3",
    central: "N",
    ligand: "H",
    shapeDE: "trigonal-pyramidal",
    shapeZH: "三角锥形",
    electronDE: "tetraedrisch",
    electronZH: "正四面体",
    idealDeg: 109.5,
    bonds: [90, 210, 330].map((deg) => {
      const p = (deg * Math.PI) / 180;
      return { x: SIN_A3E * Math.cos(p), y: SIN_A3E * Math.sin(p), z: -COS_A3E };
    }),
    lonePairs: [{ x: 0, y: 0, z: 1 }],
  },
  {
    id: "ax2e2",
    axe: "AX2E2",
    example: "H2O",
    central: "O",
    ligand: "H",
    shapeDE: "gewinkelt",
    shapeZH: "V 形（折线形）",
    electronDE: "tetraedrisch",
    electronZH: "正四面体",
    idealDeg: 109.5,
    bonds: [
      { x: Math.sin(HALF_AX2E2), y: 0, z: -Math.cos(HALF_AX2E2) },
      { x: -Math.sin(HALF_AX2E2), y: 0, z: -Math.cos(HALF_AX2E2) },
    ],
    lonePairs: [
      { x: 0, y: Math.sqrt(3) / 2, z: 0.5 },
      { x: 0, y: -Math.sqrt(3) / 2, z: 0.5 },
    ],
  },
];

const YAW0 = -28;
const PITCH0 = -18;
const CX = 280;
const CY = 160;
const R = 104;

interface Proj {
  sx: number;
  sy: number;
  depth: number;
}

// Orthografische Projektion: Rotation um Y (yaw), dann um X (pitch).
function project(v: Vec3, yawDeg: number, pitchDeg: number): Proj {
  const y = (yawDeg * Math.PI) / 180;
  const p = (pitchDeg * Math.PI) / 180;
  const x1 = v.x * Math.cos(y) + v.z * Math.sin(y);
  const z1 = -v.x * Math.sin(y) + v.z * Math.cos(y);
  const y1 = v.y * Math.cos(p) - z1 * Math.sin(p);
  const z2 = v.y * Math.sin(p) + z1 * Math.cos(p);
  return { sx: CX + R * x1, sy: CY - R * y1, depth: z2 };
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

export function MoleculeShapeSim({ lang, studioMode = true, onExportFinding }: MoleculeShapeSimProps) {
  const [cfgId, setCfgId] = useState("ax4");
  const [yaw, setYaw] = useState(YAW0);
  const [pitch, setPitch] = useState(PITCH0);
  const [showLone, setShowLone] = useState(true);
  const [showArc, setShowArc] = useState(true);
  const [showPanels, setShowPanels] = useState(studioMode);

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  // ---- Zieh-Rotation (SOP: kein setState pro Frame — kein rAF, nur Gesten) ----
  const dragRef = useRef<{ x: number; y: number } | null>(null);

  const handleViewDown = (e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleViewMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const d = dragRef.current;
    if (!d) return;
    setYaw((v) => v + (e.clientX - d.x) * 0.5);
    setPitch((v) => clamp(v + (e.clientY - d.y) * 0.4, -75, 75));
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  const handleViewUp = (e: React.PointerEvent<SVGSVGElement>) => {
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Zeiger bereits freigegeben.
    }
  };
  const handleViewKey = (e: React.KeyboardEvent<SVGSVGElement>) => {
    const step = 6;
    if (e.key === "ArrowLeft") setYaw((v) => v - step);
    else if (e.key === "ArrowRight") setYaw((v) => v + step);
    else if (e.key === "ArrowUp") setPitch((v) => clamp(v - step, -75, 75));
    else if (e.key === "ArrowDown") setPitch((v) => clamp(v + step, -75, 75));
    else return;
    e.preventDefault();
  };

  const cfg = CONFIGS.find((c) => c.id === cfgId) ?? CONFIGS[2];
  const m = cfg.bonds.length;
  const n = cfg.lonePairs.length;
  const measured = cfg.bonds.length > 1 ? angleDeg(cfg.bonds[0], cfg.bonds[1]) : 0;
  const delta = measured - cfg.idealDeg;
  const compressed = n > 0;

  // Tiefensortierung: ferne Objekte zuerst zeichnen.
  interface Drawable {
    depth: number;
    kind: "bond" | "ligand" | "lone";
    idx: number;
    p: Proj;
  }
  const drawables: Drawable[] = [];
  cfg.bonds.forEach((v, idx) => drawables.push({ depth: project(v, yaw, pitch).depth, kind: "bond", idx, p: project(v, yaw, pitch) }));
  cfg.bonds.forEach((v, idx) => drawables.push({ depth: project(v, yaw, pitch).depth + 0.01, kind: "ligand", idx, p: project(v, yaw, pitch) }));
  if (showLone) {
    cfg.lonePairs.forEach((v, idx) => {
      const q = project(v, yaw, pitch);
      drawables.push({ depth: q.depth - 0.01, kind: "lone", idx, p: { sx: CX + R * 0.62 * ((q.sx - CX) / R), sy: CY + R * 0.62 * ((q.sy - CY) / R), depth: q.depth } });
    });
  }
  drawables.sort((a, b) => a.depth - b.depth);

  // Winkelbogen zwischen den ersten beiden projizierten Bindungen.
  const u0 = project(cfg.bonds[0], yaw, pitch);
  const u1 = cfg.bonds.length > 1 ? project(cfg.bonds[1], yaw, pitch) : u0;
  const au = (Math.atan2(u0.sy - CY, u0.sx - CX) * 180) / Math.PI;
  const av = (Math.atan2(u1.sy - CY, u1.sx - CX) * 180) / Math.PI;
  const diff = ((av - au + 540) % 360) - 180;
  const amid = (((au + diff / 2) * Math.PI) / 180);
  const arcR = 42;
  const arcStart = { x: CX + arcR * Math.cos((au * Math.PI) / 180), y: CY + arcR * Math.sin((au * Math.PI) / 180) };
  const arcEnd = { x: CX + arcR * Math.cos((av * Math.PI) / 180), y: CY + arcR * Math.sin((av * Math.PI) / 180) };
  const arcLabel = { x: CX + 62 * Math.cos(amid), y: CY + 62 * Math.sin(amid) };

  const handleResetView = () => {
    setYaw(YAW0);
    setPitch(PITCH0);
  };

  const handleExport = () => {
    const summary =
      lang === "de"
        ? `VSEPR ${cfg.axe} (${cfg.example}): SN = ${m} + ${n} = ${m + n}, Elektronen­geometrie ${cfg.electronDE}, Molekuelform ${cfg.shapeDE}. ` +
          `Bindungswinkel gemessen ${measured.toFixed(1)}°, ideal ${cfg.idealDeg.toFixed(1)}° (Delta ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}°). ` +
          (compressed
            ? `Stauchung durch ${n === 1 ? "ein freies Paar" : "zwei freie Paare"}: LP-LP > LP-BP > BP-BP — freies Paar beansprucht mehr Raum.`
            : `Keine Stauchung: keine freien Paare, Idealwinkel bleibt erhalten.`)
        : `VSEPR ${cfg.axe}（${cfg.example}）：SN = ${m} + ${n} = ${m + n}，电子对几何${cfg.electronZH}，分子构型${cfg.shapeZH}。` +
          `键角实测 ${measured.toFixed(1)}°，理想 ${cfg.idealDeg.toFixed(1)}°（偏差 ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}°）。` +
          (compressed
            ? `压缩来自${n === 1 ? "一对孤对" : "两对孤对"}：孤对–孤对 > 孤对–成键 > 成键–成键，孤对占据更大空间。`
            : `无压缩：没有孤对电子，理想键角保持。`);
    if (onExportFinding) {
      onExportFinding(summary);
    } else {
      try {
        void navigator.clipboard.writeText(summary);
      } catch {
        // Zwischenablage nicht verfuegbar.
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Chemie · Molekuelgeometrie" : "化学 · 分子构型"}
          </span>
          <span className="text-[var(--gray)]">/</span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "VSEPR-Modell: Gestalt aus Abstossung" : "VSEPR 模型：排斥决定形状"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
          >
            <span>{showPanels ? "◧" : "◩"}</span>
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : lang === "de" ? "Ausklappen" : "展开面板"}</span>
          </button>
        </div>
      </div>

      {/* Hauptgitter: Buehne 8 / Steuerung 4 */}
      <div className={`grid gap-5 ${showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        {/* Buehne */}
        <div className={`flex flex-col ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="relative flex h-[420px] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] sm:h-[480px]">
            <svg
              viewBox="0 0 560 330"
              onPointerDown={handleViewDown}
              onPointerMove={handleViewMove}
              onPointerUp={handleViewUp}
              onPointerCancel={handleViewUp}
              onKeyDown={handleViewKey}
              tabIndex={0}
              className="block min-h-0 w-full flex-1 cursor-grab touch-none select-none active:cursor-grabbing"
              role="img"
              aria-label={lang === "de" ? "Molekuelansicht, per Ziehen drehbar" : "分子视图，可拖拽旋转"}
            >
              {/* Achsenkreuz */}
              <g fontFamily="ui-monospace, monospace" fontSize="9" fill="var(--gray)">
                <line x1={CX - 150} y1={CY + 118} x2={CX + 150} y2={CY + 118} stroke="var(--line)" strokeWidth="1" />
                <text x={CX + 154} y={CY + 121}>x</text>
                <line x1={CX - 168} y1={CY + 100} x2={CX - 168} y2={CY - 100} stroke="var(--line)" strokeWidth="1" />
                <text x={CX - 172} y={CY - 104}>y</text>
              </g>

              {/* Bindungen / Liganden / freie Paare, nach Tiefe sortiert */}
              {drawables.map((d, k) => {
                if (d.kind === "bond") {
                  const behind = d.depth < 0;
                  return (
                    <line
                      key={`b-${k}`}
                      x1={CX}
                      y1={CY}
                      x2={d.p.sx}
                      y2={d.p.sy}
                      stroke="var(--ink)"
                      strokeWidth={behind ? 1.2 : 2.5}
                      strokeDasharray={behind ? "5 4" : undefined}
                      opacity={behind ? 0.55 : 1}
                      strokeLinecap="round"
                    />
                  );
                }
                if (d.kind === "ligand") {
                  const r = 19 * (1 + 0.16 * d.depth);
                  return (
                    <g key={`l-${k}`}>
                      <circle cx={d.p.sx} cy={d.p.sy} r={r} fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.5" />
                      <text
                        x={d.p.sx}
                        y={d.p.sy + 4}
                        textAnchor="middle"
                        fontFamily="ui-monospace, monospace"
                        fontWeight="bold"
                        fontSize="11"
                        fill="var(--ink)"
                      >
                        {cfg.ligand}
                      </text>
                    </g>
                  );
                }
                const r = 13 * (1 + 0.1 * d.depth);
                return (
                  <g key={`lp-${k}`} opacity="0.9">
                    <circle cx={d.p.sx} cy={d.p.sy} r={r} fill="var(--paper-subtle)" stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="4 3" />
                    <text
                      x={d.p.sx}
                      y={d.p.sy + 3.5}
                      textAnchor="middle"
                      fontFamily="ui-monospace, monospace"
                      fontSize="9"
                      fill="var(--gray)"
                    >
                      LP
                    </text>
                  </g>
                );
              })}

              {/* Winkelbogen */}
              {showArc && cfg.bonds.length > 1 && (
                <g>
                  <path
                    d={`M ${arcStart.x.toFixed(1)} ${arcStart.y.toFixed(1)} A ${arcR} ${arcR} 0 ${Math.abs(diff) >= 180 ? 1 : 0} ${diff >= 0 ? 1 : 0} ${arcEnd.x.toFixed(1)} ${arcEnd.y.toFixed(1)}`}
                    fill="none"
                    stroke="var(--warning)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={arcLabel.x}
                    y={arcLabel.y}
                    textAnchor="middle"
                    fontFamily="ui-monospace, monospace"
                    fontWeight="bold"
                    fontSize="12"
                    fill="var(--warning)"
                  >
                    {measured.toFixed(1)}°
                  </text>
                </g>
              )}

              {/* Zentralatom (immer obenauf) */}
              <g>
                <circle cx={CX} cy={CY} r="25" fill="var(--accent)" stroke="var(--paper)" strokeWidth="2" />
                <text
                  x={CX}
                  y={CY + 5}
                  textAnchor="middle"
                  fontFamily="ui-monospace, monospace"
                  fontWeight="bold"
                  fontSize="14"
                  fill="var(--surface)"
                >
                  {cfg.central}
                </text>
              </g>

              {/* Typenschild */}
              <text x={CX} y={CY + 152} textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="11" fill="var(--gray)">
                {`${cfg.axe} · ${cfg.example} · ${lang === "de" ? cfg.shapeDE : cfg.shapeZH}`}
              </text>
            </svg>

            {/* Messwert-HUD */}
            <div className="pointer-events-none absolute right-3 top-3 w-56 space-y-1 rounded border border-[var(--line)] bg-[var(--surface)] p-2 font-mono text-[11px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Bindungswinkel X–A–X" : "键角 X–A–X"}
              </div>
              <div className="text-lg font-bold leading-tight text-[var(--ink)]">{measured.toFixed(1)}°</div>
              <div className="text-[var(--gray)]">
                {lang === "de" ? `ideal ${cfg.idealDeg.toFixed(1)}° · Delta ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}°` : `理想 ${cfg.idealDeg.toFixed(1)}° · 偏差 ${delta >= 0 ? "+" : ""}${delta.toFixed(1)}°`}
              </div>
              <div
                className="border-t border-[var(--line)] pt-1 font-bold"
                style={{ color: compressed ? "var(--warning)" : "var(--success)" }}
              >
                {compressed
                  ? lang === "de"
                    ? `gestaucht (${n}× LP)`
                    : `被压缩（${n} 对孤对）`
                  : lang === "de"
                    ? "keine Stauchung"
                    : "无压缩"}
              </div>
              <div className="text-[var(--gray)]">
                {lang === "de" ? `SN = ${m} + ${n} = ${m + n}` : `SN = ${m} + ${n} = ${m + n}`}
              </div>
            </div>
            <div className="pointer-events-none absolute left-3 top-3 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
              {lang === "de" ? "Ziehen: Ansicht drehen (Pfeiltasten auch)" : "拖拽旋转视角（方向键亦可）"}
            </div>

            {/* Legendenstreifen */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-[var(--line)] px-3 py-1.5 font-mono text-[10px] text-[var(--gray)]">
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="2" y1="8" x2="14" y2="8" strokeLinecap="round" />
                </svg>
                {lang === "de" ? "vorn: Bindung" : "前方：成键"}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <line x1="2" y1="8" x2="14" y2="8" strokeDasharray="3 2" strokeLinecap="round" />
                </svg>
                {lang === "de" ? "hinten: Bindung" : "后方：成键"}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <circle cx="8" cy="8" r="5" strokeDasharray="3 2" />
                </svg>
                {lang === "de" ? "LP: freies Paar" : "LP：孤对"}
              </span>
              <span className="flex items-center gap-1.5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M3 13 A 10 10 0 0 1 13 13" strokeLinecap="round" />
                </svg>
                {lang === "de" ? "Bogen: Messwert" : "弧线：实测值"}
              </span>
            </div>
          </div>
        </div>

        {/* Steuerpanel */}
        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "AXE-Konfiguration" : "AXE 构型选择"}
              </h4>
              <div className="grid grid-cols-1 gap-1.5">
                {CONFIGS.map((c) => {
                  const active = c.id === cfgId;
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCfgId(c.id)}
                      aria-pressed={active}
                      className={`flex items-center justify-between rounded border px-2.5 py-1.5 font-mono text-xs transition-colors ${
                        active
                          ? "border-[var(--accent)] bg-[var(--accent)]/10 font-bold text-[var(--ink)]"
                          : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                      }`}
                    >
                      <span>{`${c.axe} · ${c.example}`}</span>
                      <span>{lang === "de" ? c.shapeDE : c.shapeZH}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Ansicht" : "视图"}
              </h4>
              <label className="flex cursor-pointer items-center gap-2 font-mono text-xs text-[var(--ink)]">
                <input type="checkbox" checked={showLone} onChange={(e) => setShowLone(e.target.checked)} className="accent-[var(--accent)]" />
                {lang === "de" ? "Freie Paare (LP) zeigen" : "显示孤对电子（LP）"}
              </label>
              <label className="flex cursor-pointer items-center gap-2 font-mono text-xs text-[var(--ink)]">
                <input type="checkbox" checked={showArc} onChange={(e) => setShowArc(e.target.checked)} className="accent-[var(--accent)]" />
                {lang === "de" ? "Winkelbogen zeigen" : "显示键角弧线"}
              </label>
              <button
                type="button"
                onClick={handleResetView}
                className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] py-1.5 font-mono text-xs text-[var(--gray)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {lang === "de" ? "Ansicht zuruecksetzen" : "重置视角"}
              </button>
            </div>

            <div className="space-y-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">SN = m + n</span>
                <strong className="text-[var(--ink)]">{`${m} + ${n} = ${m + n}`}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Elektronen­geo." : "电子对几何"}</span>
                <strong className="text-[var(--ink)]">{lang === "de" ? cfg.electronDE : cfg.electronZH}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Molekuelform" : "分子构型"}</span>
                <strong className="text-[var(--ink)]">{lang === "de" ? cfg.shapeDE : cfg.shapeZH}</strong>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                <span className="text-[var(--gray)]">{lang === "de" ? "Winkel (Mess / Ideal)" : "键角（实测 / 理想）"}</span>
                <strong style={{ color: compressed ? "var(--warning)" : "var(--success)" }}>
                  {`${measured.toFixed(1)}° / ${cfg.idealDeg.toFixed(1)}°`}
                </strong>
              </div>
            </div>

            {compressed && (
              <div className="space-y-1.5 rounded-[var(--radius)] border border-[var(--warning)] p-3.5">
                <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--warning)]">
                  {lang === "de" ? "Stauchung durch freie Paare" : "孤对排斥压缩注记"}
                </div>
                <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
                  {lang === "de"
                    ? `LP–LP > LP–BP > BP–BP: Das freie Paar beansprucht mehr Raum und drueckt die Bindungen zusammen — 109,5° → ${measured.toFixed(1)}° (Δ ${delta.toFixed(1)}°).`
                    : `孤对–孤对 > 孤对–成键 > 成键–成键：孤对占据更大空间，把成键往一起挤 —— 109.5° → ${measured.toFixed(1)}°（压缩 ${delta.toFixed(1)}°）。`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Untere Viererzeile: Formel / KLP-Operator / CN / Export */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "01 · Formel" : "01 · 公式"}
          </div>
          <MathHtml code="SN = m + n" display={true} cacheKey="molshape:sn" />
          <MathHtml code="\theta_{\mathrm{tet}} = \arccos\left(-\frac{1}{3}\right) \approx 109{,}5^{\circ}" display={true} cacheKey="molshape:tetra" />
          <MathHtml code="\theta(AX_2) = 180^{\circ}, \quad \theta(AX_3) = 120^{\circ}" display={true} cacheKey="molshape:ideal" />
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "02 · KLP / Operatoren" : "02 · 考纲 / 算子"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Chemie EF/Q1 (NRW-KLP): Raeumlicher Bau kleiner Molekuele aus der Abzaehlregel SN = m + n; Elektronenpaarabstossung formt die Molekuelgestalt."
              : "化学 EF/Q1（NRW 考纲）：用计数规则 SN = m + n 判断小分子的空间构型；电子对互斥决定分子形状。"}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Operatoren: benennen (AXE-Typ), beschreiben (Geometrie & Winkel), erklaeren (Stauchung durch freie Paare), vorhersagen (Form aus SN)."
              : "算子：benennen（命名 AXE 类型）、beschreiben（描述构型与键角）、erklaeren（解释孤对压缩）、vorhersagen（由 SN 预测构型）。"}
          </p>
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "03 · Verstaendnis (CN)" : "03 · 中文要点"}
          </div>
          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Erst SN = Bindungen + freie Paare zaehlen (Elektronen­geo­metrie), dann freie Paare abziehen (Molekuelform). Freie Paare draengen staerker: CH4 109,5° ohne Stauchung, NH3 107,0°, H2O 104,5°."
              : "先数 SN = 成键数 + 孤对数定电子对几何，再去掉孤对看分子构型。孤对排斥更强：CH4 109.5° 无压缩，NH3 107.0°，H2O 104.5°，越挤越小。"}
          </p>
        </div>
        <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "04 · Befund sichern" : "04 · 导出结论"}
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? `${cfg.axe} (${cfg.example}): ${measured.toFixed(1)}° statt ${cfg.idealDeg.toFixed(1)}°, SN = ${m + n}.`
              : `${cfg.axe}（${cfg.example}）：${measured.toFixed(1)}°（理想 ${cfg.idealDeg.toFixed(1)}°），SN = ${m + n}。`}
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--accent)] py-2 font-mono text-xs font-medium uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "de" ? "Befund uebernehmen" : "导出实验结论"}
          </button>
        </div>
      </div>
    </div>
  );
}
