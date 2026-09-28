import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface CoulombLawSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

// Coulomb-Konstante k_e = 1 / (4 * pi * eps0), exakt ueber die Elementarladung definiert.
const KE = 8.988e9; // N·m²/C²
const Q_MAX = 10; // μC, symmetrischer Stellbereich ±10 μC
const POS_MIN = 5; // cm
const POS_MAX = 95; // cm
const MIN_SEP = 10; // cm, minimale Laenge der Ladungstraeger-Distanz
const R_SLIDER_MIN = 10; // cm
const R_SLIDER_MAX = 80; // cm

// Tufte-Semantik: Kraefte neutral dunkel, Ladung positiv tiefrot / negativ tiefblau.
const VEC = "#3f3f46";
const POS = "#b91c1c";
const NEG = "#1e40af";

// Buehnengeometrie (viewBox 560 x 300, Handarbeit ohne Abhaengigkeiten).
const VB_W = 560;
const VB_H = 300;
const RULER_L = 40;
const RULER_R = 520;
const RULER_Y = 210;
const Y_C = 128;
const BRACKET_Y = 190;

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function xOfCm(cm: number): number {
  return RULER_L + (cm / 100) * (RULER_R - RULER_L);
}

function radiusOf(q: number): number {
  return 15 + Math.abs(q) * 0.9;
}

// Log-Darstellung der Kraftpfeillaenge (F spannt ~0.05 N … ~90 N auf).
function lenOf(F: number): number {
  if (!(F > 0)) return 0;
  return clamp(16 + 22 * Math.log10(F + 1), 10, 110);
}

const SUP: Record<string, string> = {
  "-": "⁻",
  "+": "⁺",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

function sup(exp: string): string {
  return exp
    .split("")
    .map((c) => SUP[c] ?? c)
    .join("");
}

// Wissenschaftliche Notation, z. B. 3.59×10¹ N.
function fmtSci(v: number, digits = 2): string {
  if (!Number.isFinite(v)) return "–";
  if (v === 0) return "0 N";
  const parts = v.toExponential(digits).split("e");
  return `${parts[0]}×10${sup(parts[1])} N`;
}

function fmtSciUnit(v: number, unit: string, digits = 2): string {
  if (!Number.isFinite(v)) return "–";
  if (v === 0) return `0 ${unit}`;
  const parts = v.toExponential(digits).split("e");
  return `${parts[0]}×10${sup(parts[1])} ${unit}`;
}

function chargeColor(q: number): string {
  if (q > 0) return POS;
  if (q < 0) return NEG;
  return "var(--gray)";
}

export function CoulombLawSim({ lang, studioMode = true, onExportFinding }: CoulombLawSimProps) {
  const [q1, setQ1] = useState(4); // μC, -10 … +10
  const [q2, setQ2] = useState(-6); // μC, -10 … +10
  const [pos1, setPos1] = useState(30); // cm auf dem Massstab
  const [pos2, setPos2] = useState(70); // cm auf dem Massstab
  const [showPanels, setShowPanels] = useState(studioMode);

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  // ---- Exakte Physik aus dem React-State (quasistatisch, keine Frame-State) ----
  const rCm = Math.max(MIN_SEP, Math.abs(pos2 - pos1));
  const rM = rCm / 100;
  const q1C = q1 * 1e-6;
  const q2C = q2 * 1e-6;
  const force = (KE * Math.abs(q1C * q2C)) / (rM * rM); // F = k_e |q1 q2| / r²
  const isZero = q1 === 0 || q2 === 0;
  const isRepulsive = (q1 > 0 && q2 > 0) || (q1 < 0 && q2 < 0);
  // 1/r²-Kontrollgroesse: C = F · r² = k_e |q1 q2| (bei festen Ladungen konstant).
  const cVal = force * rM * rM;
  const cTheory = KE * Math.abs(q1C * q2C);

  const natureDE = isZero ? "keine Kraft (neutrale Teilladung)" : isRepulsive ? "abstossend (gleichnamig)" : "anziehend (ungleichnamig)";
  const natureZH = isZero ? "无作用力（含零电荷）" : isRepulsive ? "互斥（同种电荷）" : "相吸（异种电荷）";

  // ---- Entkoppelter Bewegungskern (SOP: useRef + rAF, kein setState pro Frame) ----
  // Der State traegt die exakte Physik; rAF glaettet nur Anzeigepositionen und
  // schreibt SVG-Attribute direkt ueber Refs. Messwerte rendern aus dem State.
  const paramsRef = useRef({ pos1, pos2, q1, q2 });
  useEffect(() => {
    paramsRef.current = { pos1, pos2, q1, q2 };
  });
  const shownRef = useRef({ p1: pos1, p2: pos2, len: lenOf(force) });
  const dragRef = useRef<{ target: 1 | 2 | null }>({ target: null });
  const svgRef = useRef<SVGSVGElement | null>(null);

  const g1Ref = useRef<SVGGElement | null>(null);
  const g2Ref = useRef<SVGGElement | null>(null);
  const proj1Ref = useRef<SVGLineElement | null>(null);
  const proj2Ref = useRef<SVGLineElement | null>(null);
  const bracketRef = useRef<SVGLineElement | null>(null);
  const bracketTick1Ref = useRef<SVGLineElement | null>(null);
  const bracketTick2Ref = useRef<SVGLineElement | null>(null);
  const bracketLabelRef = useRef<SVGTextElement | null>(null);
  const v1LineRef = useRef<SVGLineElement | null>(null);
  const v1HeadRef = useRef<SVGPolygonElement | null>(null);
  const v1LabelRef = useRef<SVGTextElement | null>(null);
  const v2LineRef = useRef<SVGLineElement | null>(null);
  const v2HeadRef = useRef<SVGPolygonElement | null>(null);
  const v2LabelRef = useRef<SVGTextElement | null>(null);

  useEffect(() => {
    let raf = 0;
    const frame = () => {
      const p = paramsRef.current;
      const s = shownRef.current;
      const rNow = Math.max(MIN_SEP, Math.abs(p.pos2 - p.pos1));
      const rMNow = rNow / 100;
      const fNow = (KE * Math.abs(p.q1 * 1e-6 * (p.q2 * 1e-6))) / (rMNow * rMNow);
      const lenTarget = p.q1 === 0 || p.q2 === 0 ? 0 : lenOf(fNow);
      s.p1 += (p.pos1 - s.p1) * 0.25;
      s.p2 += (p.pos2 - s.p2) * 0.25;
      s.len += (lenTarget - s.len) * 0.2;
      if (Math.abs(p.pos1 - s.p1) < 0.02) s.p1 = p.pos1;
      if (Math.abs(p.pos2 - s.p2) < 0.02) s.p2 = p.pos2;
      if (Math.abs(lenTarget - s.len) < 0.05) s.len = lenTarget;

      const x1 = xOfCm(s.p1);
      const x2 = xOfCm(s.p2);
      const r1 = radiusOf(p.q1);
      const r2 = radiusOf(p.q2);
      g1Ref.current?.setAttribute("transform", `translate(${x1.toFixed(1)} ${Y_C})`);
      g2Ref.current?.setAttribute("transform", `translate(${x2.toFixed(1)} ${Y_C})`);
      proj1Ref.current?.setAttribute("x1", x1.toFixed(1));
      proj1Ref.current?.setAttribute("x2", x1.toFixed(1));
      proj2Ref.current?.setAttribute("x1", x2.toFixed(1));
      proj2Ref.current?.setAttribute("x2", x2.toFixed(1));
      bracketRef.current?.setAttribute("x1", x1.toFixed(1));
      bracketRef.current?.setAttribute("x2", x2.toFixed(1));
      bracketTick1Ref.current?.setAttribute("x1", x1.toFixed(1));
      bracketTick1Ref.current?.setAttribute("x2", x1.toFixed(1));
      bracketTick2Ref.current?.setAttribute("x1", x2.toFixed(1));
      bracketTick2Ref.current?.setAttribute("x2", x2.toFixed(1));
      if (bracketLabelRef.current) {
        bracketLabelRef.current.setAttribute("x", ((x1 + x2) / 2).toFixed(1));
        bracketLabelRef.current.textContent = `r = ${rNow.toFixed(1)} cm`;
      }

      // Kraftpfeile: Actio = Reactio, betragsgleich, entgegengesetzt.
      const rep = (p.q1 > 0 && p.q2 > 0) || (p.q1 < 0 && p.q2 < 0);
      const left1 = x1 < x2;
      const dir1 = rep ? (left1 ? -1 : 1) : left1 ? 1 : -1;
      const dir2 = -dir1;
      const len = s.len;
      const s1x = x1 + dir1 * (r1 + 3);
      const e1x = x1 + dir1 * (r1 + 3 + len);
      const s2x = x2 + dir2 * (r2 + 3);
      const e2x = x2 + dir2 * (r2 + 3 + len);
      v1LineRef.current?.setAttribute("x1", s1x.toFixed(1));
      v1LineRef.current?.setAttribute("x2", e1x.toFixed(1));
      v1HeadRef.current?.setAttribute(
        "points",
        `${e1x.toFixed(1)},${Y_C - 6} ${e1x.toFixed(1)},${Y_C + 6} ${(e1x + dir1 * 10).toFixed(1)},${Y_C}`
      );
      v1LabelRef.current?.setAttribute("x", ((s1x + e1x) / 2).toFixed(1));
      v2LineRef.current?.setAttribute("x1", s2x.toFixed(1));
      v2LineRef.current?.setAttribute("x2", e2x.toFixed(1));
      v2HeadRef.current?.setAttribute(
        "points",
        `${e2x.toFixed(1)},${Y_C - 6} ${e2x.toFixed(1)},${Y_C + 6} ${(e2x + dir2 * 10).toFixed(1)},${Y_C}`
      );
      v2LabelRef.current?.setAttribute("x", ((s2x + e2x) / 2).toFixed(1));

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Ladungen per Zeiger entlang des Massstabs ziehen (Pointer-Capture haelt die Geste).
  const cmFromClientX = (clientX: number): number => {
    const svg = svgRef.current;
    if (!svg) return 50;
    const rect = svg.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * VB_W;
    return clamp(((px - RULER_L) / (RULER_R - RULER_L)) * 100, POS_MIN, POS_MAX);
  };

  const handleChargeDown = (which: 1 | 2) => (e: React.PointerEvent<SVGGElement>) => {
    dragRef.current.target = which;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handleChargeMove = (e: React.PointerEvent<SVGGElement>) => {
    const t = dragRef.current.target;
    if (!t) return;
    const cm = Math.round(cmFromClientX(e.clientX));
    if (t === 1) {
      if (Math.abs(cm - pos2) >= MIN_SEP) setPos1(cm);
    } else {
      if (Math.abs(cm - pos1) >= MIN_SEP) setPos2(cm);
    }
  };
  const handleChargeUp = (e: React.PointerEvent<SVGGElement>) => {
    dragRef.current.target = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Zeiger bereits freigegeben.
    }
  };

  const applyDistance = (newR: number) => {
    const r = clamp(newR, R_SLIDER_MIN, R_SLIDER_MAX);
    const c = 50;
    setPos1(clamp(Math.round(c - r / 2), POS_MIN, POS_MAX - MIN_SEP));
    setPos2(clamp(Math.round(c + r / 2), POS_MIN + MIN_SEP, POS_MAX));
  };

  const handleReset = () => {
    setQ1(4);
    setQ2(-6);
    setPos1(30);
    setPos2(70);
  };

  const handleExport = () => {
    const summary =
      lang === "de"
        ? `Coulomb-Versuch: q1 = ${q1} μC, q2 = ${q2} μC, r = ${rCm.toFixed(1)} cm (${rM.toFixed(3)} m). ` +
          `F = k_e·|q1·q2|/r² = ${fmtSci(force)} (${force.toFixed(3)} N). ` +
          `Wechselwirkung: ${natureDE}. ` +
          `1/r²-Nachweis: C = F·r² = ${fmtSciUnit(cVal, "N·m²")} ≈ k_e·|q1·q2| = ${fmtSciUnit(cTheory, "N·m²")} (konstant bei variablem r).`
        : `库仑定律实验：q1 = ${q1} μC，q2 = ${q2} μC，间距 r = ${rCm.toFixed(1)} cm（${rM.toFixed(3)} m）。` +
          `静电力 F = k·|q1·q2|/r² = ${fmtSci(force)}（${force.toFixed(3)} N）。` +
          `相互作用：${natureZH}。` +
          `反平方律验证：C = F·r² = ${fmtSciUnit(cVal, "N·m²")} ≈ k·|q1·q2| = ${fmtSciUnit(cTheory, "N·m²")}（改变 r 时 C 保持恒定）。`;
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

  // ---- Erster Paint aus exaktem State (rAF uebernimmt danach die Glaettung) ----
  const x1 = xOfCm(pos1);
  const x2 = xOfCm(pos2);
  const r1 = radiusOf(q1);
  const r2 = radiusOf(q2);
  const vecLen = isZero ? 0 : lenOf(force);
  const left1 = x1 < x2;
  const dir1 = isRepulsive ? (left1 ? -1 : 1) : left1 ? 1 : -1;
  const dir2 = -dir1;
  const v1s = x1 + dir1 * (r1 + 3);
  const v1e = x1 + dir1 * (r1 + 3 + vecLen);
  const v2s = x2 + dir2 * (r2 + 3);
  const v2e = x2 + dir2 * (r2 + 3 + vecLen);

  // ---- F–r-Kennlinie fuer den 1/r²-Nachweis (zustandsgesteuert) ----
  const PLOT = { x0: 40, x1: 520, y0: 12, y1: 120 };
  const plotRMin = R_SLIDER_MIN;
  const plotRMax = R_SLIDER_MAX;
  const gx = (r: number) => PLOT.x0 + ((r - plotRMin) / (plotRMax - plotRMin)) * (PLOT.x1 - PLOT.x0);
  const fMaxPlot = cTheory > 0 ? cTheory / Math.pow(plotRMin / 100, 2) : 1;
  const gy = (f: number) => PLOT.y1 - clamp(f / fMaxPlot, 0, 1) * (PLOT.y1 - PLOT.y0);
  let curve = "";
  if (cTheory > 0) {
    const pts: string[] = [];
    for (let i = 0; i <= 48; i++) {
      const r = plotRMin + ((plotRMax - plotRMin) * i) / 48;
      const f = cTheory / Math.pow(r / 100, 2);
      pts.push(`${i === 0 ? "M" : "L"} ${gx(r).toFixed(1)} ${gy(f).toFixed(1)}`);
    }
    curve = pts.join(" ");
  }
  const opX = gx(clamp(rCm, plotRMin, plotRMax));
  const opY = gy(force);

  return (
    <div className="space-y-4">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Elektrostatik · Coulomb-Wechselwirkung" : "静电学 · 库仑相互作用"}
          </span>
          <span className="text-[var(--gray)]">/</span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de"
              ? "Coulomb-Gesetz: Ladung, Abstand & 1/r²-Nachweis"
              : "库仑定律：电荷、间距与反平方律验证"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] p-0.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setQ1(5);
                setQ2(-5);
                setPos1(30);
                setPos2(70);
              }}
              className="cursor-pointer rounded px-2 py-0.5 text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)]"
            >
              {lang === "de" ? "Dipol (+/−)" : "偶极相吸 (+/−)"}
            </button>
            <button
              type="button"
              onClick={() => {
                setQ1(6);
                setQ2(6);
                setPos1(30);
                setPos2(70);
              }}
              className="cursor-pointer rounded px-2 py-0.5 text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)]"
            >
              {lang === "de" ? "Abstossung (+/+)" : "同号排斥 (+/+)"}
            </button>
          </div>
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
              ref={svgRef}
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="min-h-0 w-full flex-1 font-mono"
              role="img"
              aria-label={lang === "de" ? "Coulomb-Buehne mit Massstab" : "库仑实验台与刻度尺"}
            >
              {/* Projektionslinien Ladung -> Massstab */}
              <line ref={proj1Ref} x1={x1} y1={Y_C + r1} x2={x1} y2={RULER_Y} stroke="var(--gray)" strokeWidth="1" strokeDasharray="3 3" />
              <line ref={proj2Ref} x1={x2} y1={Y_C + r2} x2={x2} y2={RULER_Y} stroke="var(--gray)" strokeWidth="1" strokeDasharray="3 3" />

              {/* Abstandsklammer */}
              <line ref={bracketRef} x1={x1} y1={BRACKET_Y} x2={x2} y2={BRACKET_Y} stroke="var(--accent)" strokeWidth="1.5" />
              <line ref={bracketTick1Ref} x1={x1} y1={BRACKET_Y - 5} x2={x1} y2={BRACKET_Y + 5} stroke="var(--accent)" strokeWidth="1.5" />
              <line ref={bracketTick2Ref} x1={x2} y1={BRACKET_Y - 5} x2={x2} y2={BRACKET_Y + 5} stroke="var(--accent)" strokeWidth="1.5" />
              <text ref={bracketLabelRef} x={(x1 + x2) / 2} y={BRACKET_Y - 8} textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--accent)">
                {`r = ${rCm.toFixed(1)} cm`}
              </text>

              {/* Kraftpfeile (Actio = Reactio) */}
              {!isZero && (
                <g>
                  <line ref={v1LineRef} x1={v1s} y1={Y_C} x2={v1e} y2={Y_C} stroke={VEC} strokeWidth="2.5" />
                  <polygon
                    ref={v1HeadRef}
                    points={`${v1e},${Y_C - 6} ${v1e},${Y_C + 6} ${v1e + dir1 * 10},${Y_C}`}
                    fill={VEC}
                  />
                  <text ref={v1LabelRef} x={(v1s + v1e) / 2} y={Y_C - 12} textAnchor="middle" fontSize="10" fontWeight="bold" fill={VEC}>
                    F₁₂
                  </text>
                  <line ref={v2LineRef} x1={v2s} y1={Y_C} x2={v2e} y2={Y_C} stroke={VEC} strokeWidth="2.5" />
                  <polygon
                    ref={v2HeadRef}
                    points={`${v2e},${Y_C - 6} ${v2e},${Y_C + 6} ${v2e + dir2 * 10},${Y_C}`}
                    fill={VEC}
                  />
                  <text ref={v2LabelRef} x={(v2s + v2e) / 2} y={Y_C - 12} textAnchor="middle" fontSize="10" fontWeight="bold" fill={VEC}>
                    F₂₁
                  </text>
                </g>
              )}

              {/* Ladungstraeger (ziehbar) */}
              <g
                ref={g1Ref}
                transform={`translate(${x1} ${Y_C})`}
                onPointerDown={handleChargeDown(1)}
                onPointerMove={handleChargeMove}
                onPointerUp={handleChargeUp}
                onPointerCancel={handleChargeUp}
                className="cursor-grab touch-none select-none active:cursor-grabbing"
              >
                <circle r={r1 + 6} fill="transparent" />
                <circle r={r1} fill={chargeColor(q1)} stroke="var(--ink)" strokeWidth="2" />
                <text textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="bold" fill="#ffffff">
                  {q1 > 0 ? `+${q1}` : `${q1}`}
                </text>
                <text y={r1 + 16} textAnchor="middle" fontSize="11" fill="var(--ink)">
                  q₁
                </text>
              </g>
              <g
                ref={g2Ref}
                transform={`translate(${x2} ${Y_C})`}
                onPointerDown={handleChargeDown(2)}
                onPointerMove={handleChargeMove}
                onPointerUp={handleChargeUp}
                onPointerCancel={handleChargeUp}
                className="cursor-grab touch-none select-none active:cursor-grabbing"
              >
                <circle r={r2 + 6} fill="transparent" />
                <circle r={r2} fill={chargeColor(q2)} stroke="var(--ink)" strokeWidth="2" />
                <text textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="bold" fill="#ffffff">
                  {q2 > 0 ? `+${q2}` : `${q2}`}
                </text>
                <text y={r2 + 16} textAnchor="middle" fontSize="11" fill="var(--ink)">
                  q₂
                </text>
              </g>

              {/* Massstab 0 … 100 cm */}
              <rect x={RULER_L} y={RULER_Y} width={RULER_R - RULER_L} height="26" fill="var(--surface)" stroke="var(--gray)" strokeWidth="1" />
              {Array.from({ length: 101 }).map((_, cm) => {
                const px = xOfCm(cm);
                const major = cm % 10 === 0;
                const mid = cm % 5 === 0;
                const tickH = major ? 12 : mid ? 8 : 4;
                return (
                  <g key={cm}>
                    <line x1={px} y1={RULER_Y} x2={px} y2={RULER_Y + tickH} stroke="var(--gray)" strokeWidth="1" />
                    {major && (
                      <text x={px} y={RULER_Y + 23} textAnchor="middle" fontSize="8" fill="var(--gray)">
                        {cm}
                      </text>
                    )}
                  </g>
                );
              })}
              <text x={RULER_R + 4} y={RULER_Y + 16} fontSize="9" fill="var(--gray)">
                cm
              </text>
            </svg>

            {/* 1/r²-Pruefstreifen: F–r-Kennlinie + Arbeitspunkt */}
            <div className="border-t border-[var(--line)]">
              <svg viewBox="0 0 560 150" className="h-[118px] w-full shrink-0 font-mono sm:h-[132px]" role="img" aria-label="F-r-Kennlinie">
                {[0.25, 0.5, 0.75].map((t) => (
                  <line key={t} x1={PLOT.x0} y1={PLOT.y1 - t * (PLOT.y1 - PLOT.y0)} x2={PLOT.x1} y2={PLOT.y1 - t * (PLOT.y1 - PLOT.y0)} stroke="var(--line)" strokeWidth="1" />
                ))}
                {curve !== "" && <path d={curve} fill="none" stroke={VEC} strokeWidth="2" />}
                {!isZero && (
                  <g>
                    <line x1={opX} y1={opY} x2={opX} y2={PLOT.y1} stroke="var(--gray)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx={opX} cy={opY} r="4.5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="1.5" />
                  </g>
                )}
                <line x1={PLOT.x0} y1="4" x2={PLOT.x0} y2={PLOT.y1 + 8} stroke="var(--gray)" strokeWidth="1" />
                <line x1={PLOT.x0 - 6} y1={PLOT.y1} x2={PLOT.x1 + 14} y2={PLOT.y1} stroke="var(--gray)" strokeWidth="1" />
                <text x="6" y="16" fontSize="9" fill="var(--gray)">
                  F/N
                </text>
                <text x={PLOT.x1 - 8} y={PLOT.y1 + 22} fontSize="9" fill="var(--gray)">
                  r/cm
                </text>
                {[20, 40, 60, 80].map((r) => (
                  <text key={r} x={gx(r)} y={PLOT.y1 + 22} textAnchor="middle" fontSize="8" fill="var(--gray)">
                    {r}
                  </text>
                ))}
                <text x={PLOT.x0 + 8} y={PLOT.y0 + 14} fontSize="10" fontWeight="bold" fill="var(--ink)">
                  {`C = F·r² = ${fmtSciUnit(cVal, "N·m²")}`}
                </text>
                <text x={PLOT.x0 + 8} y={PLOT.y0 + 28} fontSize="9" fill="var(--gray)">
                  {lang === "de" ? "konstant bei variablem r → 1/r²-Gesetz" : "r 变化时 C 恒定 → 反平方律成立"}
                </text>
              </svg>
            </div>

            {/* Messwert-HUD */}
            <div className="pointer-events-none absolute right-3 top-3 w-48 space-y-1 rounded border border-[var(--line)] bg-[var(--surface)] p-2 font-mono text-[11px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Coulomb-Kraft" : "库仑静电力"}
              </div>
              <div className="text-lg font-bold leading-tight text-[var(--ink)]">{fmtSci(force)}</div>
              <div className="text-[var(--gray)]">{force.toFixed(3)} N · r = {rCm.toFixed(1)} cm</div>
              <div className="border-t border-[var(--line)] pt-1 font-bold" style={{ color: isZero ? "var(--gray)" : isRepulsive ? POS : NEG }}>
                {lang === "de" ? natureDE : natureZH}
              </div>
            </div>
            <div className="pointer-events-none absolute left-3 top-3 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
              {lang === "de" ? "Ladungen zum Verschieben ziehen" : "拖动电荷球沿刻度尺改变间距"}
            </div>
          </div>
        </div>

        {/* Steuerpanel */}
        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Ladungen & Abstand" : "电荷与间距"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Ladung q₁:" : "电荷 q₁:"}</span>
                  <span className="font-bold" style={{ color: q1 === 0 ? "var(--gray)" : q1 > 0 ? POS : NEG }}>
                    {q1 > 0 ? `+${q1}` : q1} μC
                  </span>
                </div>
                <input
                  type="range"
                  min={-Q_MAX}
                  max={Q_MAX}
                  step={1}
                  value={q1}
                  onChange={(e) => setQ1(Number(e.target.value))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: POS }}
                  aria-label="q1"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Ladung q₂:" : "电荷 q₂:"}</span>
                  <span className="font-bold" style={{ color: q2 === 0 ? "var(--gray)" : q2 > 0 ? POS : NEG }}>
                    {q2 > 0 ? `+${q2}` : q2} μC
                  </span>
                </div>
                <input
                  type="range"
                  min={-Q_MAX}
                  max={Q_MAX}
                  step={1}
                  value={q2}
                  onChange={(e) => setQ2(Number(e.target.value))}
                  className="w-full cursor-pointer"
                  style={{ accentColor: NEG }}
                  aria-label="q2"
                />
              </div>
              <div className="space-y-1 border-t border-[var(--line)] pt-3">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Abstand r:" : "间距 r:"}</span>
                  <span className="font-bold text-[var(--ink)]">{rCm.toFixed(1)} cm</span>
                </div>
                <input
                  type="range"
                  min={R_SLIDER_MIN}
                  max={R_SLIDER_MAX}
                  step={1}
                  value={clamp(Math.round(rCm), R_SLIDER_MIN, R_SLIDER_MAX)}
                  onChange={(e) => applyDistance(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                  aria-label="r"
                />
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] py-1.5 font-mono text-xs text-[var(--gray)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {lang === "de" ? "Zuruecksetzen" : "重置"}
              </button>
            </div>

            <div className="space-y-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">F = k·|q₁·q₂|/r²</span>
                <strong className="text-[var(--ink)]">{fmtSci(force)}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">C = F·r²</span>
                <strong className="text-[var(--ink)]">{fmtSciUnit(cVal, "N·m²")}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">k·|q₁·q₂|</span>
                <strong className="text-[var(--ink)]">{fmtSciUnit(cTheory, "N·m²")}</strong>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                <span className="text-[var(--gray)]">{lang === "de" ? "Wechselwirkung" : "相互作用"}</span>
                <strong style={{ color: isZero ? "var(--gray)" : isRepulsive ? POS : NEG }}>
                  {lang === "de" ? natureDE : natureZH}
                </strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Untere Viererzeile: Formel / KLP-Operator / CN / Export */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "01 · Formel" : "01 · 公式"}
          </div>
          <MathHtml code="F = \frac{1}{4\pi\varepsilon_0} \frac{|q_1 \cdot q_2|}{r^2}" display={true} cacheKey="coulomb:force" />
          <MathHtml code="k_e = 8{,}988 \times 10^{9}\ \mathrm{N·m^2/C^2}" display={true} cacheKey="coulomb:ke" />
          <MathHtml code="C = F \cdot r^2 = k_e |q_1 q_2| = \mathrm{const.}" display={true} cacheKey="coulomb:control" />
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "02 · KLP / Operatoren" : "02 · 考纲 / 算子"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "EF E-Lehre: elektrische Ladung, Coulomb-Wechselwirkung und Abstandsquadrat-Gesetz. F₁₂ und F₂₁ sind stets betragsgleich und entgegengesetzt (Wechselwirkungsprinzip)."
              : "EF 电学：电荷、库仑相互作用与距离平方律。F₁₂ 与 F₂₁ 大小恒相等、方向恒相反（相互作用原理）。"}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Operatoren: beschreiben (Anziehung / Abstossung an Vorzeichen), berechnen (F aus q₁, q₂, r), ueberpruefen (C = F·r² konstant → 1/r²)."
              : "算子：beschreiben（由正负号描述相吸/相斥）、berechnen（由 q₁、q₂、r 算 F）、ueberpruefen（C = F·r² 恒定即验证 1/r²）。"}
          </p>
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "03 · Verstaendnis (CN)" : "03 · 中文要点"}
          </div>
          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Gleichnamige Ladungen stossen sich ab, ungleichnamige ziehen sich an; die Kraft folgt dem Abstandsquadrat: halber Abstand → vierfache Kraft. Zum Nachweis r veraendern und C = F·r² beobachten — C bleibt konstant, weil es nur von den Ladungen abhaengt."
              : "同种电荷相斥、异种电荷相吸；库仑力服从距离平方律：间距减半，力变为四倍。验证时只改变 r 并监视 C = F·r²——C 只由电荷量决定，保持恒定即证明 F ∝ 1/r²。"}
          </p>
        </div>
        <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "04 · Befund sichern" : "04 · 导出结论"}
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? `F = ${fmtSci(force)}, r = ${rCm.toFixed(1)} cm, C = ${fmtSciUnit(cVal, "N·m²")}.`
              : `F = ${fmtSci(force)}，r = ${rCm.toFixed(1)} cm，C = ${fmtSciUnit(cVal, "N·m²")}。`}
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
