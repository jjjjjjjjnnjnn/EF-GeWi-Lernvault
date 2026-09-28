import { useState, useEffect, useRef, useCallback } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface ChargesFieldsSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface ChargeN {
  nx: number;
  ny: number;
}

interface ProbeN {
  nx: number;
  ny: number;
}

interface ProbeReadout {
  ex: number;
  ey: number;
  emag: number;
  v: number;
}

const K_E = 8.98755e9;
const WORLD_W = 4;
// canvas width corresponds to WORLD_W meters; q sliders use nC
const Q_MIN = -10;
const Q_MAX = 10;
const FIELD_VEC = "#3f3f46";
const GRID_LINE = "rgba(63, 63, 70, 0.10)";
const EQUI_LINE = "rgba(63, 63, 70, 0.55)";
const EQUI_NEG_DASH: number[] = [5, 4];
// fixed equipotential levels in volts (symmetric, tuned for nC charges on 4 m stage)
const EQUI_LEVELS = [-200, -100, -50, -25, 25, 50, 100, 200];
const STEP_PX = 7;
const MAX_STEPS = 260;
const ABSORB_R = 11;
const SOFT_R = 10;

const DEFAULT_CHARGES: ChargeN[] = [
  { nx: -0.17, ny: 0 },
  { nx: 0.17, ny: 0 },
  { nx: 0, ny: -0.2 },
];
const DEFAULT_Q = [5, -5, 4];
const DEFAULT_PROBE: ProbeN = { nx: 0.05, ny: 0.18 };

function chargeRadius(q: number): number {
  return 13 + Math.abs(q) * 0.7;
}

function chargeFill(q: number): string {
  if (q > 0) return "#991b1b";
  if (q < 0) return "#1e40af";
  return "#71717a";
}

export function ChargesFieldsSim({ lang, studioMode = true, onExportFinding }: ChargesFieldsSimProps) {
  const isZh = lang === "zh";

  const [qArr, setQArr] = useState<number[]>(DEFAULT_Q.slice(0, 3));
  const [count, setCount] = useState<number>(2);
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);
  const [showField, setShowField] = useState<boolean>(true);
  const [showEqui, setShowEqui] = useState<boolean>(true);
  const [showProbeVec, setShowProbeVec] = useState<boolean>(true);
  const [readout, setReadout] = useState<ProbeReadout>({ ex: 0, ey: 0, emag: 0, v: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physRef = useRef<{ charges: ChargeN[]; probe: ProbeN }>({
    charges: DEFAULT_CHARGES.map((c) => ({ ...c })),
    probe: { ...DEFAULT_PROBE },
  });
  const paramRef = useRef<{ q: number[]; count: number }>({
    q: DEFAULT_Q.slice(0, 3),
    count: 2,
  });
  const ctlRef = useRef<{
    showField: boolean;
    showEqui: boolean;
    showVec: boolean;
    drag: null | { kind: "charge"; i: number } | { kind: "probe" };
  }>({ showField: true, showEqui: true, showVec: true, drag: null });
  const sizeRef = useRef<{ w: number; h: number }>({ w: 800, h: 480 });

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  useEffect(() => {
    paramRef.current.q = qArr.slice(0, 3);
  }, [qArr]);

  useEffect(() => {
    paramRef.current.count = count;
  }, [count]);

  useEffect(() => {
    ctlRef.current.showField = showField;
    ctlRef.current.showEqui = showEqui;
    ctlRef.current.showVec = showProbeVec;
  }, [showField, showEqui, showProbeVec]);

  const setChargeQ = useCallback((i: number, val: number) => {
    setQArr((prev) => {
      const next = prev.slice(0, 3);
      next[i] = Math.max(Q_MIN, Math.min(Q_MAX, Math.round(val)));
      return next;
    });
  }, []);

  const resetPositions = useCallback(() => {
    physRef.current.charges = DEFAULT_CHARGES.map((c) => ({ ...c }));
    physRef.current.probe = { ...DEFAULT_PROBE };
  }, []);

  const applyPreset = useCallback(
    (kind: "dipole" | "repulse" | "triple") => {
      if (kind === "dipole") {
        setCount(2);
        setQArr([5, -5, DEFAULT_Q[2]]);
        physRef.current.charges[0] = { nx: -0.16, ny: 0 };
        physRef.current.charges[1] = { nx: 0.16, ny: 0 };
      } else if (kind === "repulse") {
        setCount(2);
        setQArr([6, 6, DEFAULT_Q[2]]);
        physRef.current.charges[0] = { nx: -0.16, ny: 0 };
        physRef.current.charges[1] = { nx: 0.16, ny: 0 };
      } else {
        setCount(3);
        setQArr([6, -5, 4]);
        physRef.current.charges[0] = { nx: -0.17, ny: 0.08 };
        physRef.current.charges[1] = { nx: 0.17, ny: 0.08 };
        physRef.current.charges[2] = { nx: 0, ny: -0.2 };
      }
      physRef.current.probe = { ...DEFAULT_PROBE };
    },
    []
  );

  // ---- 60 FPS decoupled loop: physics + canvas in refs, React sync every 6th frame ----
  useEffect(() => {
    let animId = 0;
    let frame = 0;

    const loop = () => {
      animId = requestAnimationFrame(loop);
      frame += 1;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dispW = Math.max(1, Math.floor(rect.width));
      const dispH = Math.max(1, Math.floor(rect.height));
      const dpr = window.devicePixelRatio || 1;
      const needW = Math.max(1, Math.floor(dispW * dpr));
      const needH = Math.max(1, Math.floor(dispH * dpr));
      if (canvas.width !== needW || canvas.height !== needH) {
        canvas.width = needW;
        canvas.height = needH;
      }
      sizeRef.current = { w: dispW, h: dispH };

      const par = paramRef.current;
      const ctl = ctlRef.current;
      const phys = physRef.current;
      const n = Math.max(2, Math.min(3, par.count));

      const toPx = (p: ChargeN | ProbeN) => ({
        x: (p.nx + 0.5) * dispW,
        y: (p.ny + 0.5) * dispH,
      });
      const cp = phys.charges.slice(0, n).map(toPx);
      const pp = toPx(phys.probe);
      const qs = par.q.slice(0, n);

      // relative field evaluator (pixel space, softened core)
      const fieldAt = (x: number, y: number): { ex: number; ey: number; mag: number } => {
        let ex = 0;
        let ey = 0;
        for (let i = 0; i < n; i += 1) {
          const dx = x - cp[i].x;
          const dy = y - cp[i].y;
          const r2 = dx * dx + dy * dy;
          const r = Math.sqrt(r2);
          const rs = Math.max(r, SOFT_R);
          const f = qs[i] / (rs * rs * rs);
          ex += f * dx;
          ey += f * dy;
        }
        return { ex, ey, mag: Math.hypot(ex, ey) };
      };
      // physical potential in volts at pixel point
      const voltAt = (x: number, y: number): number => {
        let v = 0;
        for (let i = 0; i < n; i += 1) {
          const dx = x - cp[i].x;
          const dy = y - cp[i].y;
          const rPx = Math.max(Math.hypot(dx, dy), SOFT_R);
          const rM = Math.max((rPx / dispW) * WORLD_W, 0.05);
          v += (K_E * qs[i] * 1e-9) / rM;
        }
        return v;
      };
      // physical E vector in V/m at pixel point
      const physEAt = (x: number, y: number): { ex: number; ey: number } => {
        let ex = 0;
        let ey = 0;
        for (let i = 0; i < n; i += 1) {
          const dx = x - cp[i].x;
          const dy = y - cp[i].y;
          const rPx = Math.max(Math.hypot(dx, dy), SOFT_R);
          const rM = (rPx / dispW) * WORLD_W;
          const rMc = Math.max(rM, 0.05);
          const f = (K_E * qs[i] * 1e-9) / (rMc * rMc * rMc);
          // pixel +x maps to +x meters, pixel +y maps to -y meters; report Ex,Ey in math convention
          ex += f * (dx / dispW) * WORLD_W;
          ey += f * (-(dy / dispW)) * WORLD_W;
        }
        return { ex, ey };
      };

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.fillStyle = "#F4F4F5";
      ctx.fillRect(0, 0, dispW, dispH);

      // faint reference grid
      ctx.strokeStyle = GRID_LINE;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let gx = dispW / 8; gx < dispW; gx += dispW / 8) {
        ctx.moveTo(gx + 0.5, 0);
        ctx.lineTo(gx + 0.5, dispH);
      }
      for (let gy = dispH / 6; gy < dispH; gy += dispH / 6) {
        ctx.moveTo(0, gy + 0.5);
        ctx.lineTo(dispW, gy + 0.5);
      }
      ctx.stroke();

      // ---- equipotentials: coarse V grid + marching-squares iso-lines ----
      if (ctl.showEqui) {
        const NX = 72;
        const NY = 48;
        const grid = new Float64Array((NX + 1) * (NY + 1));
        for (let j = 0; j <= NY; j += 1) {
          for (let i = 0; i <= NX; i += 1) {
            grid[j * (NX + 1) + i] = voltAt((i / NX) * dispW, (j / NY) * dispH);
          }
        }
        ctx.lineWidth = 1;
        for (const level of EQUI_LEVELS) {
          const neg = level < 0;
          ctx.strokeStyle = EQUI_LINE;
          ctx.setLineDash(neg ? EQUI_NEG_DASH : []);
          ctx.beginPath();
          for (let j = 0; j < NY; j += 1) {
            const y0 = (j / NY) * dispH;
            const y1 = ((j + 1) / NY) * dispH;
            for (let i = 0; i < NX; i += 1) {
              const x0 = (i / NX) * dispW;
              const x1 = ((i + 1) / NX) * dispW;
              const a = grid[j * (NX + 1) + i];
              const b = grid[j * (NX + 1) + i + 1];
              const c = grid[(j + 1) * (NX + 1) + i + 1];
              const d = grid[(j + 1) * (NX + 1) + i];
              const pts: Array<{ x: number; y: number }> = [];
              const cross = (v0: number, v1: number): number | null => {
                if ((v0 < level) === (v1 < level)) return null;
                if (v1 === v0) return null;
                return (level - v0) / (v1 - v0);
              };
              const tTop = cross(a, b);
              if (tTop !== null) pts.push({ x: x0 + tTop * (x1 - x0), y: y0 });
              const tRight = cross(b, c);
              if (tRight !== null) pts.push({ x: x1, y: y0 + tRight * (y1 - y0) });
              const tBottom = cross(d, c);
              if (tBottom !== null) pts.push({ x: x0 + tBottom * (x1 - x0), y: y1 });
              const tLeft = cross(a, d);
              if (tLeft !== null) pts.push({ x: x0, y: y0 + tLeft * (y1 - y0) });
              if (pts.length === 2) {
                ctx.moveTo(pts[0].x, pts[0].y);
                ctx.lineTo(pts[1].x, pts[1].y);
              } else if (pts.length === 4) {
                const center = (a + b + c + d) / 4;
                if ((center < level && a < level) || (center >= level && a >= level)) {
                  ctx.moveTo(pts[0].x, pts[0].y);
                  ctx.lineTo(pts[3].x, pts[3].y);
                  ctx.moveTo(pts[1].x, pts[1].y);
                  ctx.lineTo(pts[2].x, pts[2].y);
                } else {
                  ctx.moveTo(pts[0].x, pts[0].y);
                  ctx.lineTo(pts[1].x, pts[1].y);
                  ctx.moveTo(pts[2].x, pts[2].y);
                  ctx.lineTo(pts[3].x, pts[3].y);
                }
              }
            }
          }
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // ---- electric field lines: seeded at positive charges, RK2 midpoint stepping ----
      if (ctl.showField) {
        const hasPos = qs.some((q) => q > 0);
        const seedIdx: number[] = [];
        if (hasPos) {
          for (let i = 0; i < n; i += 1) if (qs[i] > 0) seedIdx.push(i);
        } else {
          for (let i = 0; i < n; i += 1) if (qs[i] < 0) seedIdx.push(i);
        }
        const dir = hasPos ? 1 : -1;
        ctx.strokeStyle = FIELD_VEC;
        ctx.fillStyle = FIELD_VEC;
        ctx.lineWidth = 1;
        for (const si of seedIdx) {
          const seeds = Math.max(8, Math.min(16, 8 + Math.round(Math.abs(qs[si]))));
          const r0 = chargeRadius(qs[si]) + 5;
          for (let s = 0; s < seeds; s += 1) {
            const ang = (s / seeds) * Math.PI * 2 + (si * 0.35);
            let px = cp[si].x + Math.cos(ang) * r0;
            let py = cp[si].y + Math.sin(ang) * r0;
            const trail: Array<{ x: number; y: number }> = [{ x: px, y: py }];
            for (let st = 0; st < MAX_STEPS; st += 1) {
              const e1 = fieldAt(px, py);
              if (e1.mag < 1e-9) break;
              const ux1 = (e1.ex / e1.mag) * dir;
              const uy1 = (e1.ey / e1.mag) * dir;
              const mx = px + ux1 * (STEP_PX / 2);
              const my = py + uy1 * (STEP_PX / 2);
              const e2 = fieldAt(mx, my);
              if (e2.mag < 1e-9) break;
              px += (e2.ex / e2.mag) * dir * STEP_PX;
              py += (e2.ey / e2.mag) * dir * STEP_PX;
              trail.push({ x: px, y: py });
              if (px < 4 || px > dispW - 4 || py < 4 || py > dispH - 4) break;
              let absorbed = false;
              for (let k = 0; k < n; k += 1) {
                if (k === si) continue;
                const sink = dir > 0 ? qs[k] < 0 : qs[k] > 0;
                if (!sink) continue;
                if (Math.hypot(px - cp[k].x, py - cp[k].y) < ABSORB_R) {
                  absorbed = true;
                  break;
                }
              }
              if (absorbed) break;
            }
            if (trail.length < 3) continue;
            ctx.beginPath();
            ctx.moveTo(trail[0].x, trail[0].y);
            for (let p = 1; p < trail.length; p += 1) ctx.lineTo(trail[p].x, trail[p].y);
            ctx.stroke();
            // direction chevron at 55% of the trace
            const mi = Math.floor(trail.length * 0.55);
            if (mi > 0 && mi + 1 < trail.length) {
              const ax = trail[mi].x;
              const ay = trail[mi].y;
              const ta = Math.atan2(trail[mi + 1].y - trail[mi - 1].y, trail[mi + 1].x - trail[mi - 1].x);
              const L = 7;
              const spread = 0.45;
              ctx.beginPath();
              ctx.moveTo(ax, ay);
              ctx.lineTo(ax - L * Math.cos(ta - spread), ay - L * Math.sin(ta - spread));
              ctx.moveTo(ax, ay);
              ctx.lineTo(ax - L * Math.cos(ta + spread), ay - L * Math.sin(ta + spread));
              ctx.stroke();
            }
          }
        }
      }

      // ---- charges ----
      for (let i = 0; i < n; i += 1) {
        const r = chargeRadius(qs[i]);
        ctx.fillStyle = chargeFill(qs[i]);
        ctx.beginPath();
        ctx.arc(cp[i].x, cp[i].y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 12px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(qs[i] > 0 ? `+${qs[i]}` : `${qs[i]}`, cp[i].x, cp[i].y);
        ctx.fillStyle = "#3f3f46";
        ctx.font = "10px ui-monospace, monospace";
        ctx.fillText(`q${i + 1}`, cp[i].x, cp[i].y + r + 11);
        ctx.textAlign = "left";
        ctx.textBaseline = "alphabetic";
      }

      // ---- probe cross + E vector ----
      const pe = physEAt(pp.x, pp.y);
      const pv = voltAt(pp.x, pp.y);
      const pmag = Math.hypot(pe.ex, pe.ey);
      ctx.strokeStyle = "#18181b";
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.arc(pp.x, pp.y, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(pp.x - 11, pp.y);
      ctx.lineTo(pp.x - 4, pp.y);
      ctx.moveTo(pp.x + 4, pp.y);
      ctx.lineTo(pp.x + 11, pp.y);
      ctx.moveTo(pp.x, pp.y - 11);
      ctx.lineTo(pp.x, pp.y - 4);
      ctx.moveTo(pp.x, pp.y + 4);
      ctx.lineTo(pp.x, pp.y + 11);
      ctx.stroke();
      if (ctl.showVec && pmag > 1e-6) {
        const len = Math.max(14, Math.min(72, 14 + 22 * Math.log10(1 + pmag / 50)));
        const ux = pe.ex / pmag;
        const uy = -pe.ey / pmag;
        const ex2 = pp.x + ux * len;
        const ey2 = pp.y + uy * len;
        ctx.strokeStyle = FIELD_VEC;
        ctx.fillStyle = FIELD_VEC;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(pp.x, pp.y);
        ctx.lineTo(ex2, ey2);
        ctx.stroke();
        const ha = Math.atan2(ey2 - pp.y, ex2 - pp.x);
        ctx.beginPath();
        ctx.moveTo(ex2, ey2);
        ctx.lineTo(ex2 - 8 * Math.cos(ha - 0.4), ey2 - 8 * Math.sin(ha - 0.4));
        ctx.lineTo(ex2 - 8 * Math.cos(ha + 0.4), ey2 - 8 * Math.sin(ha + 0.4));
        ctx.closePath();
        ctx.fill();
      }

      ctx.fillStyle = "#71717a";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`|E|=${pmag >= 1000 ? `${(pmag / 1000).toFixed(2)}k` : pmag.toFixed(1)} V/m  V=${pv >= 0 ? "+" : ""}${pv.toFixed(1)} V`, 12, dispH - 12);
      ctx.restore();

      // ---- throttled React readout: every 6th frame ----
      if (frame % 6 === 0) {
        const eNow = physEAt(pp.x, pp.y);
        const vNow = voltAt(pp.x, pp.y);
        const mNow = Math.hypot(eNow.ex, eNow.ey);
        setReadout({
          ex: Number(eNow.ex.toFixed(1)),
          ey: Number(eNow.ey.toFixed(1)),
          emag: Number(mNow.toFixed(1)),
          v: Number(vNow.toFixed(1)),
        });
      }
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toNorm = (clientX: number, clientY: number): ProbeN => {
    const canvas = canvasRef.current;
    if (!canvas) return { nx: 0, ny: 0 };
    const rect = canvas.getBoundingClientRect();
    const px = Math.max(20, Math.min(rect.width - 20, clientX - rect.left));
    const py = Math.max(20, Math.min(rect.height - 20, clientY - rect.top));
    return { nx: px / rect.width - 0.5, ny: py / rect.height - 0.5 };
  };

  const hitCharge = (clientX: number, clientY: number): number | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const n = Math.max(2, Math.min(3, paramRef.current.count));
    for (let i = n - 1; i >= 0; i -= 1) {
      const c = physRef.current.charges[i];
      const cx = (c.nx + 0.5) * rect.width;
      const cy = (c.ny + 0.5) * rect.height;
      if (Math.hypot(clientX - rect.left - cx, clientY - rect.top - cy) <= 22) return i;
    }
    return null;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    const ci = hitCharge(e.clientX, e.clientY);
    if (ci !== null) {
      ctlRef.current.drag = { kind: "charge", i: ci };
      return;
    }
    // empty canvas click moves the probe there and starts probe drag
    const p = toNorm(e.clientX, e.clientY);
    physRef.current.probe = p;
    ctlRef.current.drag = { kind: "probe" };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = ctlRef.current.drag;
    if (!drag) return;
    const p = toNorm(e.clientX, e.clientY);
    if (drag.kind === "charge") {
      physRef.current.charges[drag.i] = p;
    } else {
      physRef.current.probe = p;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    ctlRef.current.drag = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* noop */
    }
  };

  const generateReport = (): string => {
    const qs = paramRef.current.q.slice(0, Math.max(2, Math.min(3, paramRef.current.count)));
    const w = Math.max(1, sizeRef.current.w);
    const posM = physRef.current.charges.slice(0, qs.length).map((c) => ({
      x: Number((((c.nx + 0.5) * w) / w) * WORLD_W - WORLD_W / 2).toFixed(2),
      y: Number((((0.5 - c.ny) * sizeRef.current.h) / w) * WORLD_W).toFixed(2),
    }));
    const qStr = qs.map((q, i) => `q${i + 1}=${q > 0 ? `+${q}` : q} nC @ (${posM[i].x}, ${posM[i].y}) m`).join(", ");
    if (isZh) {
      return (
        `点电荷电场实验记录:\n` +
        `- 电荷配置 (${qs.length} 个): ${qStr}\n` +
        `- 探针读数: |E|=${readout.emag} V/m (Ex=${readout.ex}, Ey=${readout.ey}), V=${readout.v >= 0 ? `+${readout.v}` : readout.v} V\n` +
        `- 结论: 电场线由正电荷出发终止于负电荷, 线密处场强大; 等势线与电场线处处正交, 沿电场线方向电势降低 (E=-grad V); 偶极子中垂线上场强反向、电势为零.`
      );
    }
    return (
      `Messprotokoll Punktladungen:\n` +
      `- Konfiguration (${qs.length}): ${qStr}\n` +
      `- Sondenwerte: |E|=${readout.emag} V/m (Ex=${readout.ex}, Ey=${readout.ey}), V=${readout.v >= 0 ? `+${readout.v}` : readout.v} V\n` +
      `- Befund: Feldlinien starten an positiven und enden an negativen Ladungen, dichte Linien heissen starkes E; Aequipotenziallinien stehen senkrecht auf E, das Potenzial faellt entlang E (E=-grad V); auf der Dipol-Mittelsenkrechten ist V=0.`
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

  const visCount = count;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "点电荷电场与等势线" : "Punktladungen: Feld und Potenzial"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--gray)] whitespace-nowrap">
                  |E|={readout.emag} V/m V={readout.v} V
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPanels(!showPanels)}
                  className="shrink-0 px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                  title={showPanels ? (isZh ? "折叠侧栏" : "Seitenleiste einklappen") : (isZh ? "展开侧栏" : "Seitenleiste ausklappen")}
                >
                  {showPanels ? (isZh ? "◧ 折叠侧栏" : "◧ Seitenleiste") : (isZh ? "◩ 展开侧栏" : "◩ Seitenleiste")}
                </button>
              </div>
            </div>

            <div className="w-full h-[420px] sm:h-[480px] relative">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                className="w-full h-full block cursor-crosshair touch-none select-none"
              />
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-[var(--gray)] bg-[var(--surface)]/80 px-2 py-0.5 rounded border border-[var(--line)] pointer-events-none">
                {isZh ? "拖电荷改位置，点击空白处移动探针" : "Ladung ziehen = Position, Klick = Sonde versetzen"}
              </div>
            </div>

            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-mono">
                <button
                  type="button"
                  onClick={() => applyPreset("dipole")}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] font-medium text-[var(--ink)]"
                >
                  {isZh ? "电偶极子" : "Dipol"}
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("repulse")}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                >
                  {isZh ? "同号排斥" : "Abstossung"}
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset("triple")}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                >
                  {isZh ? "三电荷" : "Drei Ladungen"}
                </button>
                <button
                  type="button"
                  onClick={resetPositions}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M13.2 8 A5.2 5.2 0 1 1 8 2.8" />
                    <path d="M8 1.4 V4.2 H10.8" />
                  </svg>
                  {isZh ? "重置" : "Reset"}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setShowField(!showField)}
                  aria-pressed={showField}
                  className={`px-2 py-1 border ${showField ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]" : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"}`}
                >
                  {isZh ? "电场线" : "Feldlinien"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEqui(!showEqui)}
                  aria-pressed={showEqui}
                  className={`px-2 py-1 border ${showEqui ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]" : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"}`}
                >
                  {isZh ? "等势线" : "Aequipotenzial"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowProbeVec(!showProbeVec)}
                  aria-pressed={showProbeVec}
                  className={`px-2 py-1 border ${showProbeVec ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]" : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"}`}
                >
                  {isZh ? "探针矢量" : "Sondenvektor"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "电量与电荷数量" : "Ladungen und Anzahl"}
              </div>

              <div className="mb-3">
                <div className="text-xs font-mono text-[var(--ink)] mb-1.5">{isZh ? "电荷数量" : "Anzahl Ladungen"}</div>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  {[2, 3].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setCount(n)}
                      className={`px-2 py-1 border ${visCount === n ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {Array.from({ length: visCount }, (_, i) => (
                <div className="mb-3" key={i}>
                  <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                    <span className="text-[var(--ink)]">{isZh ? `电荷 q${i + 1}` : `Ladung q${i + 1}`}</span>
                    <span className="font-medium" style={{ color: qArr[i] > 0 ? "#991b1b" : qArr[i] < 0 ? "#1e40af" : "#3f3f46" }}>
                      {qArr[i] > 0 ? `+${qArr[i]}` : qArr[i]} nC
                    </span>
                  </div>
                  <input
                    type="range"
                    min={Q_MIN}
                    max={Q_MAX}
                    step={1}
                    value={qArr[i]}
                    onChange={(e) => setChargeQ(i, Number(e.target.value))}
                    className="w-full cursor-pointer"
                    aria-label={isZh ? `电荷${i + 1}电量` : `Ladung q${i + 1}`}
                  />
                  <div className="flex justify-between font-mono text-[10px] text-[var(--gray)]">
                    <span>-10</span>
                    <span>+10 nC</span>
                  </div>
                </div>
              ))}

              <div className="border-t border-[var(--line)] pt-2 font-mono tabular-nums text-[11px] text-[var(--ink)] space-y-1">
                <div className="flex justify-between">
                  <span>|E| {isZh ? "探针" : "Sonde"}</span>
                  <span>{readout.emag} V/m</span>
                </div>
                <div className="flex justify-between">
                  <span>Ex</span>
                  <span>{readout.ex} V/m</span>
                </div>
                <div className="flex justify-between">
                  <span>Ey</span>
                  <span>{readout.ey} V/m</span>
                </div>
                <div className="flex justify-between">
                  <span>V {isZh ? "探针" : "Sonde"}</span>
                  <span>
                    {readout.v >= 0 ? `+${readout.v}` : readout.v} V
                  </span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">
                {isZh ? "操作说明" : "Hinweis Bedienung"}
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--gray)]">
                {isZh
                  ? "按住电荷圆球拖动改变位置；点击画布空白处移动十字探针，读数每 6 帧同步一次。实线为正等势线，虚线为负等势线。"
                  : "Ladungskugeln ziehen veraendert die Position; Klick auf freie Flaeche versetzt die Kreuzsonde, Werte folgen alle 6 Frames. Durchgezogen = positives, gestrichelt = negatives Potenzial."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">01 / Formel und Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "点电荷场强与电势" : "Feldstaerke und Potenzial"}</div>
          <div className="mb-1.5">
            <MathHtml code="\vec{E} = k\frac{q}{r^2}\,\hat{r}" display={true} cacheKey="charges-fields:E" />
            <MathHtml code="V = k\frac{q}{r}, \quad \vec{E} = -\mathrm{grad}\,V" display={true} cacheKey="charges-fields:V" />
            <MathHtml code="\vec{E} = \sum_i \vec{E}_i, \quad V = \sum_i V_i" display={true} cacheKey="charges-fields:super" />
          </div>
          <p className="text-[var(--gray)] text-[11px] leading-relaxed">
            {isZh
              ? "场线由正电荷出发，以中点法 Runge-Kutta 步进追踪切向；等势线用 marching-squares 求交绘制，与场线正交。"
              : "Feldlinien starten an Plusladungen, verfolgt per Runge-Kutta-Mittelpunkt entlang E; Aequipotenziale per Marching-Squares, stets senkrecht zu E."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "EF 静电学：场与电势" : "EF Elektrostatik: Feld und Potenzial"}</div>
          <div className="text-[var(--gray)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen, begruenden, beurteilen</code>
            <p className="mt-1">
              {isZh
                ? "典型任务：由场线疏密判断场强大小；由等势线间距论证电势变化率；用 E=-grad V 判定偶极子中垂线电势为零。"
                : "Aufgabe: Lies E aus der Liniendichte ab; begruende den Potenzialverlauf aus Aequipotenzial-Abstaenden; beurteile V=0 auf der Dipol-Senkrechten mit E=-grad V."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "口诀：密大疏小，正出负入" : "Regel: dicht heisst stark, plus raus minus rein"}</div>
          <p className="text-[var(--gray)] text-[11px] leading-relaxed">
            {isZh
              ? "场线密处场强大，电荷越大出发线越多；顺场线走电势必降，等势线密处降得快；偶极子中间电势为零但场强不为零，别混淆。"
              : "Dichte Linien heissen starkes Feld, mehr Ladung heisst mehr Linien; entlang E faellt V, dichtes V-Gefaelle heisst starkes E; in Dipolmitte gilt V=0, aber E ungleich null."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "导出测量结论" : "Befunde exportieren"}</div>
            <p className="text-[var(--gray)] text-[11px] leading-relaxed">
              {isZh ? "把当前电荷配置与探针 E、V 读数发给 AI 助教继续分析。" : "Sende Konfiguration sowie E- und V-Sondenwerte an den KI-Tutor zur Analyse."}
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

export default ChargesFieldsSim;
