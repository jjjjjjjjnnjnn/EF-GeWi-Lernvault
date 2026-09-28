import { useRef, useEffect, useState, useCallback } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface CollisionLabSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

const TRACK_L = 10; // Welt-Laenge der Fahrbahn in m
const DT_STEP = 1 / 60;
const V_MAX = 5;
const SLOW_FACTOR = 0.3;

interface Readout {
  x1: number;
  x2: number;
  v1: number;
  v2: number;
  p: number;
  e: number;
  vcm: number;
  collisions: number;
  wallTouched: boolean;
  dp: number;
  de: number;
}

function halfWidth(m: number): number {
  return 0.3 + 0.12 * m;
}

/**
 * CollisionLabSim: 1D elastic collision laboratory (EF Mechanik, Impulserhaltung).
 * Two carts on a frictionless track. At contact the post-collision velocities
 * follow analytically from momentum + kinetic-energy conservation:
 *   v1' = ((m1-m2)*v1 + 2*m2*v2) / (m1+m2)
 *   v2' = ((m2-m1)*v2 + 2*m1*v1) / (m1+m2)
 * Physics runs decoupled in a rAF loop (useRef), React readout throttled 6 frames.
 */
export function CollisionLabSim({ lang, studioMode: _studioMode = true, onExportFinding }: CollisionLabSimProps) {
  const isDe = lang === "de";

  // ---- Inquiry parameters (sliders) ----
  const [m1, setM1] = useState<number>(1.0);
  const [m2, setM2] = useState<number>(1.0);
  const [v1Set, setV1Set] = useState<number>(2.0);
  const [v2Set, setV2Set] = useState<number>(0.0);

  // ---- Transport ----
  const [playing, setPlaying] = useState<boolean>(true);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showVt, setShowVt] = useState<boolean>(true);

  const [readout, setReadout] = useState<Readout>({
    x1: 3, x2: 7, v1: 2, v2: 0, p: 2, e: 2, vcm: 1,
    collisions: 0, wallTouched: false, dp: 0, de: 0,
  });

  // ---- Decoupled physics state (never triggers React renders) ----
  const phys = useRef({
    x1: 3, x2: 7, v1: 2.0, v2: 0.0,
    m1: 1.0, m2: 1.0,
    t: 0, frame: 0, collisions: 0, flash: 0,
    dragCart: 0 as 0 | 1 | 2,
    lastPX: 0, lastPT: 0, dragV: 0,
    p0: 2.0, e0: 2.0,
    dp: 0, de: 0, wallTouched: false,
    histT: [] as number[], histV1: [] as number[], histV2: [] as number[],
  });

  // Mirror mass params into physics ref (sliders stay live for next collision)
  const vSetRef = useRef({ v1: 2.0, v2: 2.0 });
  useEffect(() => {
    phys.current.m1 = m1;
    phys.current.m2 = m2;
    // Reference values follow the slider-defined system
    phys.current.p0 = m1 * phys.current.v1 + m2 * phys.current.v2;
    phys.current.e0 = 0.5 * m1 * phys.current.v1 * phys.current.v1 + 0.5 * m2 * phys.current.v2 * phys.current.v2;
    phys.current.wallTouched = false;
  }, [m1, m2]);

  const applyVelocitySlider = useCallback((cart: 1 | 2, v: number) => {
    if (cart === 1) {
      setV1Set(v);
      vSetRef.current.v1 = v;
      const p = phys.current;
      if (p.dragCart !== 1) p.v1 = v;
      p.p0 = phys.current.m1 * v + phys.current.m2 * p.v2;
      p.e0 = 0.5 * phys.current.m1 * v * v + 0.5 * phys.current.m2 * p.v2 * p.v2;
      p.wallTouched = false;
    } else {
      setV2Set(v);
      vSetRef.current.v2 = v;
      const p = phys.current;
      if (p.dragCart !== 2) p.v2 = v;
      p.p0 = phys.current.m1 * p.v1 + phys.current.m2 * v;
      p.e0 = 0.5 * phys.current.m1 * p.v1 * p.v1 + 0.5 * phys.current.m2 * v * v;
      p.wallTouched = false;
    }
  }, []);

  const handleReset = useCallback(() => {
    const p = phys.current;
    const vv1 = vSetRef.current.v1;
    const vv2 = vSetRef.current.v2;
    p.x1 = 3; p.x2 = 7;
    p.v1 = vv1; p.v2 = vv2;
    p.collisions = 0; p.flash = 0; p.t = 0;
    p.histT = []; p.histV1 = []; p.histV2 = [];
    p.wallTouched = false; p.dp = 0; p.de = 0;
    p.p0 = p.m1 * vv1 + p.m2 * vv2;
    p.e0 = 0.5 * p.m1 * vv1 * vv1 + 0.5 * p.m2 * vv2 * vv2;
    setPlaying(true);
  }, []);

  const resetToPreset = useCallback((pm1: number, pm2: number, pv1: number, pv2: number) => {
    setM1(pm1); setM2(pm2); setV1Set(pv1); setV2Set(pv2);
    vSetRef.current.v1 = pv1; vSetRef.current.v2 = pv2;
    const p = phys.current;
    p.m1 = pm1; p.m2 = pm2;
    p.x1 = 3; p.x2 = 7; p.v1 = pv1; p.v2 = pv2;
    p.t = 0; p.collisions = 0; p.flash = 0;
    p.histT = []; p.histV1 = []; p.histV2 = [];
    p.wallTouched = false; p.dp = 0; p.de = 0;
    p.p0 = pm1 * pv1 + pm2 * pv2;
    p.e0 = 0.5 * pm1 * pv1 * pv1 + 0.5 * pm2 * pv2 * pv2;
    setPlaying(true);
  }, []);

  // ---- Single physics step (shared by rAF loop and step button) ----
  const stepPhysics = useCallback((dt: number) => {
    const p = phys.current;
    if (p.dragCart !== 0) return;
    p.x1 += p.v1 * dt;
    p.x2 += p.v2 * dt;
    p.t += dt;
    if (p.flash > 0) p.flash -= dt;

    // Wall reflection (external impulse: breaks p-conservation, flagged)
    const h1 = halfWidth(p.m1);
    const h2 = halfWidth(p.m2);
    if (p.x1 < h1) { p.x1 = h1; p.v1 = Math.abs(p.v1); p.wallTouched = true; }
    if (p.x1 > TRACK_L - h1) { p.x1 = TRACK_L - h1; p.v1 = -Math.abs(p.v1); p.wallTouched = true; }
    if (p.x2 < h2) { p.x2 = h2; p.v2 = Math.abs(p.v2); p.wallTouched = true; }
    if (p.x2 > TRACK_L - h2) { p.x2 = TRACK_L - h2; p.v2 = -Math.abs(p.v2); p.wallTouched = true; }

    // Cart-cart elastic collision (analytic, momentum + kinetic energy)
    const gap = p.x2 - p.x1;
    const touch = h1 + h2;
    if (Math.abs(gap) < touch) {
      const sgn = gap >= 0 ? 1 : -1;
      const closing = sgn * (p.v1 - p.v2);
      // Separate overlap first
      const overlap = touch - Math.abs(gap);
      p.x1 -= sgn * overlap / 2;
      p.x2 += sgn * overlap / 2;
      if (closing > 1e-9) {
        const M = p.m1 + p.m2;
        const pB = p.m1 * p.v1 + p.m2 * p.v2;
        const eB = 0.5 * p.m1 * p.v1 * p.v1 + 0.5 * p.m2 * p.v2 * p.v2;
        const nv1 = ((p.m1 - p.m2) * p.v1 + 2 * p.m2 * p.v2) / M;
        const nv2 = ((p.m2 - p.m1) * p.v2 + 2 * p.m1 * p.v1) / M;
        p.v1 = nv1; p.v2 = nv2;
        const pA = p.m1 * p.v1 + p.m2 * p.v2;
        const eA = 0.5 * p.m1 * p.v1 * p.v1 + 0.5 * p.m2 * p.v2 * p.v2;
        p.dp = pA - pB;
        p.de = eA - eB;
        p.collisions += 1;
        p.flash = 0.6;
      }
    }

    // v-t history (capped ring)
    p.histT.push(p.t); p.histV1.push(p.v1); p.histV2.push(p.v2);
    if (p.histT.length > 900) {
      p.histT.splice(0, p.histT.length - 900);
      p.histV1.splice(0, p.histV1.length - 900);
      p.histV2.splice(0, p.histV2.length - 900);
    }
  }, []);

  const handleStep = useCallback(() => {
    stepPhysics(DT_STEP);
    const p = phys.current;
    const vcm = (p.m1 * p.v1 + p.m2 * p.v2) / (p.m1 + p.m2);
    setReadout({
      x1: p.x1, x2: p.x2, v1: p.v1, v2: p.v2,
      p: p.m1 * p.v1 + p.m2 * p.v2,
      e: 0.5 * p.m1 * p.v1 * p.v1 + 0.5 * p.m2 * p.v2 * p.v2,
      vcm, collisions: p.collisions, wallTouched: p.wallTouched, dp: p.dp, de: p.de,
    });
  }, [stepPhysics]);

  // ---- 60 FPS rAF loop with dynamic DPR ----
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const slowRef = useRef(slowMo);
  const playRef = useRef(playing);
  slowRef.current = slowMo;
  playRef.current = playing;

  useEffect(() => {
    let animId = 0;
    let lastTs = performance.now();
    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dtRaw = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const dt = slowRef.current ? dtRaw * SLOW_FACTOR : dtRaw;
      const p = phys.current;
      if (playRef.current) stepPhysics(dt);

      // Throttled React readout: every 6th frame
      p.frame += 1;
      if (p.frame % 6 === 0) {
        const vcm = (p.m1 * p.v1 + p.m2 * p.v2) / (p.m1 + p.m2);
        setReadout({
          x1: p.x1, x2: p.x2, v1: p.v1, v2: p.v2,
          p: p.m1 * p.v1 + p.m2 * p.v2,
          e: 0.5 * p.m1 * p.v1 * p.v1 + 0.5 * p.m2 * p.v2 * p.v2,
          vcm, collisions: p.collisions, wallTouched: p.wallTouched, dp: p.dp, de: p.de,
        });
      }

      // Canvas render with dynamic DPR
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

      const padL = 18, padR = 18;
      const toPx = (x: number) => padL + (x / TRACK_L) * (dispW - padL - padR);
      const splitY = showVt ? Math.floor(dispH * 0.6) : dispH;
      const trackY = Math.floor(splitY * 0.52);

      // Backdrop grid (Tufte hairlines)
      ctx.strokeStyle = "#E4E4E7";
      ctx.lineWidth = 0.5;
      for (let gx = padL; gx <= dispW - padR + 0.5; gx += (dispW - padL - padR) / 10) {
        ctx.beginPath(); ctx.moveTo(gx, 8); ctx.lineTo(gx, splitY - 6); ctx.stroke();
      }

      // Track rail + metre ticks
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(padL, trackY + 26); ctx.lineTo(dispW - padR, trackY + 26); ctx.stroke();
      ctx.fillStyle = "#71717A";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      for (let m = 0; m <= TRACK_L; m += 1) {
        const px = toPx(m);
        ctx.strokeStyle = "#71717A";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(px, trackY + 26); ctx.lineTo(px, trackY + (m % 2 === 0 ? 34 : 31)); ctx.stroke();
        if (m % 2 === 0) ctx.fillText(m + " m", px, trackY + 44);
      }

      // Centre-of-mass marker (rose diamond + dashed guide)
      const xcm = (p.m1 * p.x1 + p.m2 * p.x2) / (p.m1 + p.m2);
      const xcmPx = toPx(xcm);
      ctx.save();
      ctx.strokeStyle = "#9f1239";
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath(); ctx.moveTo(xcmPx, 10); ctx.lineTo(xcmPx, trackY + 26); ctx.stroke();
      ctx.restore();
      ctx.fillStyle = "#9f1239";
      ctx.beginPath();
      ctx.moveTo(xcmPx, trackY + 14); ctx.lineTo(xcmPx + 5, trackY + 20);
      ctx.lineTo(xcmPx, trackY + 26); ctx.lineTo(xcmPx - 5, trackY + 20);
      ctx.closePath(); ctx.fill();

      // Carts
      const carts = [
        { x: p.x1, v: p.v1, m: p.m1, c: "#065f46", label: "1" },
        { x: p.x2, v: p.v2, m: p.m2, c: "#1e40af", label: "2" },
      ];
      carts.forEach((cart, idx) => {
        const cx = toPx(cart.x);
        const wPx = 40 + cart.m * 12;
        const hPx = 26 + cart.m * 8;
        const top = trackY + 26 - hPx;
        const isDrag = p.dragCart === idx + 1;
        ctx.fillStyle = cart.c;
        if (p.flash > 0) {
          ctx.strokeStyle = cart.c;
          ctx.lineWidth = 2;
          ctx.strokeRect(cx - wPx / 2 - 4, top - 4, wPx + 8, hPx + 8);
        }
        ctx.globalAlpha = isDrag ? 0.75 : 1;
        ctx.fillRect(cx - wPx / 2, top, wPx, hPx);
        ctx.globalAlpha = 1;
        ctx.strokeStyle = "#18181B";
        ctx.lineWidth = 1.2;
        ctx.strokeRect(cx - wPx / 2, top, wPx, hPx);
        // Wheels
        ctx.fillStyle = "#18181B";
        [-wPx / 4, wPx / 4].forEach((off) => {
          ctx.beginPath(); ctx.arc(cx + off, trackY + 26, 3.4, 0, Math.PI * 2); ctx.fill();
        });
        // Mass + velocity label
        ctx.fillStyle = "#FAFAFA";
        ctx.font = "bold 10px ui-monospace, monospace";
        ctx.fillText("m" + cart.label + "=" + cart.m.toFixed(1), cx, top + 13);
        ctx.fillStyle = "#3f3f46";
        ctx.font = "10px ui-monospace, monospace";
        ctx.fillText("v" + cart.label + "=" + (cart.v >= 0 ? "+" : "") + cart.v.toFixed(2), cx, top - 22);
        // Velocity vector arrow
        const av = Math.max(-V_MAX, Math.min(V_MAX, cart.v));
        if (Math.abs(av) > 0.03) {
          const len = av * 16;
          const ay = top - 12;
          ctx.strokeStyle = "#3f3f46";
          ctx.lineWidth = 1.6;
          ctx.beginPath(); ctx.moveTo(cx, ay); ctx.lineTo(cx + len, ay); ctx.stroke();
          const hd = av > 0 ? -6 : 6;
          ctx.beginPath();
          ctx.moveTo(cx + len, ay); ctx.lineTo(cx + len + hd, ay - 3.4); ctx.lineTo(cx + len + hd, ay + 3.4);
          ctx.closePath(); ctx.fillStyle = "#3f3f46"; ctx.fill();
        }
      });

      // COM text tag
      ctx.fillStyle = "#9f1239";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      const vcmLive = (p.m1 * p.v1 + p.m2 * p.v2) / (p.m1 + p.m2);
      ctx.fillText("S v_cm=" + (vcmLive >= 0 ? "+" : "") + vcmLive.toFixed(2) + " m/s", Math.min(xcmPx + 8, dispW - 130), 20);

      // v-t sketch (bottom strip)
      if (showVt) {
        ctx.strokeStyle = "#E4E4E7";
        ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(padL, splitY); ctx.lineTo(dispW - padR, splitY); ctx.stroke();
        ctx.fillStyle = "#71717A";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText("v-t", padL + 2, splitY + 12);
        const vtTop = splitY + 18;
        const vtH = dispH - vtTop - 14;
        const vMid = vtTop + vtH / 2;
        const vScale = (vtH / 2 - 4) / (V_MAX + 0.5);
        // Zero line + frame
        ctx.strokeStyle = "#a1a1aa";
        ctx.lineWidth = 0.8;
        ctx.beginPath(); ctx.moveTo(padL, vMid); ctx.lineTo(dispW - padR, vMid); ctx.stroke();
        ctx.strokeStyle = "#E4E4E7";
        ctx.strokeRect(padL, vtTop, dispW - padL - padR, vtH);
        const n = p.histT.length;
        if (n > 1) {
          const t0 = p.histT[0];
          const span = Math.max(1e-6, p.histT[n - 1] - t0);
          const plot = (arr: number[], color: string) => {
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            for (let i = 0; i < n; i++) {
              const px = padL + ((p.histT[i] - t0) / span) * (dispW - padL - padR);
              const py = vMid - arr[i] * vScale;
              if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
            }
            ctx.stroke();
          };
          plot(p.histV1, "#065f46");
          plot(p.histV2, "#1e40af");
        }
        // Legend
        ctx.font = "10px ui-monospace, monospace";
        ctx.fillStyle = "#065f46";
        ctx.fillText("v1", dispW - padR - 52, vtTop + 12);
        ctx.fillStyle = "#1e40af";
        ctx.fillText("v2", dispW - padR - 28, vtTop + 12);
      }

      ctx.restore();
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [stepPhysics, showVt]);

  // ---- Pointer drag: move cart, release velocity becomes its initial speed ----
  const xFromClient = (clientX: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return 0;
    const rect = canvas.getBoundingClientRect();
    const frac = (clientX - rect.left - 18) / Math.max(1, rect.width - 36);
    return Math.max(0, Math.min(TRACK_L, frac * TRACK_L));
  };

  const pickCart = (wx: number): 0 | 1 | 2 => {
    const p = phys.current;
    const d1 = Math.abs(wx - p.x1);
    const d2 = Math.abs(wx - p.x2);
    const tol = Math.max(halfWidth(p.m1), halfWidth(p.m2)) + 0.45;
    if (d1 < tol && d2 < tol) return d1 <= d2 ? 1 : 2;
    if (d1 < tol) return 1;
    if (d2 < tol) return 2;
    return 0;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    const wx = xFromClient(e.clientX);
    const hit = pickCart(wx);
    const p = phys.current;
    if (hit !== 0) {
      p.dragCart = hit;
      p.lastPX = wx;
      p.lastPT = performance.now();
      p.dragV = 0;
      if (hit === 1) { p.x1 = wx; p.v1 = 0; } else { p.x2 = wx; p.v2 = 0; }
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = phys.current;
    if (p.dragCart === 0) return;
    const wx = xFromClient(e.clientX);
    const now = performance.now();
    const dt = Math.max(1, now - p.lastPT) / 1000;
    const instV = (wx - p.lastPX) / dt;
    p.dragV = 0.65 * p.dragV + 0.35 * Math.max(-V_MAX, Math.min(V_MAX, instV));
    p.lastPX = wx;
    p.lastPT = now;
    if (p.dragCart === 1) { p.x1 = wx; p.v1 = 0; } else { p.x2 = wx; p.v2 = 0; }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = phys.current;
    if (p.dragCart !== 0) {
      const v = Math.max(-V_MAX, Math.min(V_MAX, p.dragV));
      if (p.dragCart === 1) { p.v1 = v; vSetRef.current.v1 = v; setV1Set(Number(v.toFixed(1))); }
      else { p.v2 = v; vSetRef.current.v2 = v; setV2Set(Number(v.toFixed(1))); }
      p.p0 = p.m1 * p.v1 + p.m2 * p.v2;
      p.e0 = 0.5 * p.m1 * p.v1 * p.v1 + 0.5 * p.m2 * p.v2 * p.v2;
      p.dragCart = 0;
      p.dragV = 0;
    }
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch { /* noop */ }
  };

  // ---- Conservation monitor ----
  const eRef = Math.max(1e-6, phys.current.e0);
  const eFrac = Math.max(0, Math.min(1.2, readout.e / eRef));
  const pScale = Math.max(0.5, Math.abs(phys.current.p0), Math.abs(readout.p));
  const pFrac = readout.p / pScale;

  const handleExport = () => {
    const text = isDe
      ? "Stoss-Labor (1D, elastisch) Messprotokoll:\n"
        + "- m1 = " + m1.toFixed(1) + " kg, m2 = " + m2.toFixed(1) + " kg\n"
        + "- x1 = " + readout.x1.toFixed(2) + " m, x2 = " + readout.x2.toFixed(2) + " m\n"
        + "- v1 = " + readout.v1.toFixed(2) + " m/s, v2 = " + readout.v2.toFixed(2) + " m/s\n"
        + "- v_cm = " + readout.vcm.toFixed(2) + " m/s (Schwerpunktsgeschwindigkeit)\n"
        + "- p_ges = " + readout.p.toFixed(2) + " kg m/s, E_kin = " + readout.e.toFixed(2) + " J\n"
        + "- Stoesse: " + readout.collisions + ", Delta_p = " + readout.dp.toExponential(1)
        + ", Delta_E = " + readout.de.toExponential(1)
        + (readout.wallTouched ? "\n- Hinweis: Wandberuehrung = aeusserer Impuls (p nicht erhalten)." : "")
      : "一维弹性碰撞实验记录：\n"
        + "- m1 = " + m1.toFixed(1) + " kg, m2 = " + m2.toFixed(1) + " kg\n"
        + "- x1 = " + readout.x1.toFixed(2) + " m, x2 = " + readout.x2.toFixed(2) + " m\n"
        + "- v1 = " + readout.v1.toFixed(2) + " m/s, v2 = " + readout.v2.toFixed(2) + " m/s\n"
        + "- 质心速度 v_cm = " + readout.vcm.toFixed(2) + " m/s\n"
        + "- 总动量 p = " + readout.p.toFixed(2) + " kg m/s, 总动能 E_kin = " + readout.e.toFixed(2) + " J\n"
        + "- 已发生碰撞 " + readout.collisions + " 次, Delta_p = " + readout.dp.toExponential(1)
        + ", Delta_E = " + readout.de.toExponential(1)
        + (readout.wallTouched ? "\n- 提示：小车触壁 = 外冲量，触壁前后总动量不守恒。" : "");
    if (onExportFinding) onExportFinding(text);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        {/* Stage */}
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif font-medium text-xs text-[var(--ink)]">
                  {isDe ? "Stoss-Labor: Elastischer Stoss in 1D" : "碰撞实验室：一维双车弹性碰撞"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)] tabular-nums">
                  m1={m1.toFixed(1)} m2={m2.toFixed(1)} | v1={v1Set.toFixed(1)} v2={v2Set.toFixed(1)}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPanels(!showPanels)}
                  className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                  title={showPanels ? (isDe ? "Seitenleiste einklappen" : "折叠侧栏") : (isDe ? "Seitenleiste ausklappen" : "展开侧栏")}
                >
                  {showPanels ? "[◧]" : "[◩]"}
                  <span className="ml-1">{showPanels ? (isDe ? "Einklappen" : "折叠侧栏") : (isDe ? "Ausklappen" : "展开侧栏")}</span>
                </button>
              </div>
            </div>

            <div className="w-full h-[420px] sm:h-[480px]">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                className="w-full h-full block cursor-grab active:cursor-grabbing touch-none select-none"
              />
            </div>

            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex items-center justify-between text-xs flex-wrap gap-2">
              <div className="flex items-center gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setPlaying(!playing)}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] font-medium text-[var(--ink)] flex items-center gap-1.5"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    {playing
                      ? (<><path d="M5.5 3.5v9M10.5 3.5v9" /></>)
                      : (<><path d="M5 3.5l8 4.5-8 4.5z" /></>)}
                  </svg>
                  {playing ? (isDe ? "Pause" : "暂停") : (isDe ? "Start" : "开始")}
                </button>
                <button
                  type="button"
                  onClick={() => setSlowMo(!slowMo)}
                  className={`px-2.5 py-1 border border-[var(--line)] font-medium flex items-center gap-1.5 ${slowMo ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--paper-subtle)] text-[var(--ink)]"}`}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <circle cx="8" cy="8" r="5.2" />
                    <path d="M8 5.4V8l1.8 1.4" />
                  </svg>
                  0.3x
                </button>
                <button
                  type="button"
                  onClick={handleStep}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] flex items-center gap-1.5"
                  title={isDe ? "Einzelner Zeitschritt (1/60 s)" : "单步进 (1/60 s)"}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M3.5 3.5l6.5 4.5-6.5 4.5z" />
                    <path d="M12 3.5v9" />
                  </svg>
                  {isDe ? "Schritt" : "单步"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] flex items-center gap-1.5"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                    <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
                    <path d="M13.5 2.5v3h-3" />
                  </svg>
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--ink)] tabular-nums">
                <span>p = <strong className="text-[#065f46]">{readout.p.toFixed(2)}</strong> kg m/s</span>
                <span>E = <strong className="text-[#1e40af]">{readout.e.toFixed(2)}</strong> J</span>
                <span>n = <strong>{readout.collisions}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* Control panel */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Massen & Anfangsgeschwindigkeiten" : "质量与初速调控"}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink)]">m1</span>
                  <span className="font-medium text-[#065f46] tabular-nums">{m1.toFixed(1)} kg</span>
                </div>
                <input type="range" min="0.5" max="3" step="0.1" value={m1}
                  onChange={(e) => setM1(Number(e.target.value))}
                  className="w-full accent-[#065f46]" aria-label="m1" />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink)]">m2</span>
                  <span className="font-medium text-[#1e40af] tabular-nums">{m2.toFixed(1)} kg</span>
                </div>
                <input type="range" min="0.5" max="3" step="0.1" value={m2}
                  onChange={(e) => setM2(Number(e.target.value))}
                  className="w-full accent-[#1e40af]" aria-label="m2" />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink)]">v1</span>
                  <span className="font-medium text-[#065f46] tabular-nums">{v1Set.toFixed(1)} m/s</span>
                </div>
                <input type="range" min={-V_MAX} max={V_MAX} step="0.1" value={v1Set}
                  onChange={(e) => applyVelocitySlider(1, Number(e.target.value))}
                  className="w-full accent-[#065f46]" aria-label="v1" />
              </div>
              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink)]">v2</span>
                  <span className="font-medium text-[#1e40af] tabular-nums">{v2Set.toFixed(1)} m/s</span>
                </div>
                <input type="range" min={-V_MAX} max={V_MAX} step="0.1" value={v2Set}
                  onChange={(e) => applyVelocitySlider(2, Number(e.target.value))}
                  className="w-full accent-[#1e40af]" aria-label="v2" />
              </div>
              <div className="grid grid-cols-2 gap-1.5 mt-3 font-mono text-[11px]">
                <button type="button" onClick={() => resetToPreset(1, 1, 2, 0)}
                  className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)]">
                  {isDe ? "m1=m2, Ziel ruht" : "等质量撞静止"}
                </button>
                <button type="button" onClick={() => resetToPreset(2, 1, 2, -1)}
                  className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)]">
                  {isDe ? "Frontalstoss" : "迎面对撞"}
                </button>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isDe ? "Erhaltungs-Monitor" : "守恒监视条"}
              </div>
              <div className="font-mono text-[11px] text-[var(--ink)] tabular-nums space-y-2">
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>p_ges ({readout.p.toFixed(2)})</span>
                    <span className="text-[var(--ink-muted)]">ref {phys.current.p0.toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-[var(--paper-subtle)] border border-[var(--line)] relative">
                    <div className="absolute inset-y-0 left-1/2 w-px bg-[var(--ink-muted)]" />
                    <div className="absolute inset-y-0 bg-[#065f46]"
                      style={{ left: pFrac < 0 ? `${50 + pFrac * 50}%` : "50%", width: `${Math.abs(pFrac) * 50}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>E_kin ({readout.e.toFixed(2)} J)</span>
                    <span className="text-[var(--ink-muted)]">ref {phys.current.e0.toFixed(2)} J</span>
                  </div>
                  <div className="h-2 bg-[var(--paper-subtle)] border border-[var(--line)]">
                    <div className="h-full bg-[#1e40af]" style={{ width: `${Math.min(100, eFrac * 100)}%` }} />
                  </div>
                </div>
                <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                  <span>v_cm</span>
                  <strong className="text-[#9f1239]">{readout.vcm.toFixed(2)} m/s</strong>
                </div>
                <div className="text-[10px] text-[var(--ink-muted)] leading-relaxed">
                  {isDe
                    ? "Letzter Stoss: Delta_p = " + readout.dp.toExponential(1) + ", Delta_E = " + readout.de.toExponential(1)
                      + (readout.wallTouched ? " | Wand = aeusserer Impuls." : "")
                    : "最近一次碰撞: Delta_p = " + readout.dp.toExponential(1) + ", Delta_E = " + readout.de.toExponential(1)
                      + (readout.wallTouched ? " | 已触壁(外冲量)。" : "")}
                </div>
                <label className="flex items-center gap-2 cursor-pointer text-[var(--ink)]">
                  <input type="checkbox" checked={showVt} onChange={(e) => setShowVt(e.target.checked)} className="accent-[var(--ink)]" />
                  <span>{isDe ? "v-t-Diagramm einblenden" : "显示 v-t 简图"}</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom pedagogy scaffold: 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel &amp; Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Elastischer Stoss (1D)" : "一维弹性碰撞公式"}
          </div>
          <div className="font-mono text-xs text-[var(--ink)] mb-1.5">
            <MathHtml code="p_1+p_2=p_1'+p_2', \quad E_{kin}=E_{kin}'" display={false} cacheKey="collision:conservation" />
          </div>
          <div className="font-mono text-xs text-[var(--ink)] mb-1.5">
            <MathHtml code="v_1'=\frac{(m_1-m_2)v_1+2m_2v_2}{m_1+m_2}" display={false} cacheKey="collision:v1" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Impuls- und Energieerhaltung liefern zwei Gleichungen fuer v1' und v2'. Spezialfall m1 = m2: Geschwindigkeiten werden getauscht."
              : "动量守恒 + 动能守恒联立解出碰后速度。特例 m1 = m2 时两车交换速度；轻车撞重静止车会被反弹。"}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Mechanik: Impulserhaltung" : "力学：动量守恒 (EF)"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">beschreiben</code>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">berechnen</code>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">begruenden</code>
            <p className="mt-1">
              {isDe
                ? "Aufgabe: Berechne v1', v2' aus m1, m2, v1, v2. Begruende, warum v_cm konstant bleibt und wann p_ges nicht erhalten ist (Wand = aeussere Kraft)."
                : "典型考题：已知 m1、m2、碰前速度求碰后速度；论证质心速度为何不变；说明触壁时总动量为何不再守恒（壁为外力）。"}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Schwerpunkt-Trick" : "质心不动速记法"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Stelle dich auf den Schwerpunkt (v_cm): Dort kommen beide Wagen symmetrisch an und fliegen symmetrisch auseinander. Zurueck in Laborsicht addierst du nur v_cm. Gleiche Massen = Tausch der Geschwindigkeiten."
              : "站在质心上看：两车对称飞来、对称弹开，再加回质心速度即得实验室系结果。等质量必交换速度；先算质心速度 v_cm，心中有数再列方程，考场不慌。"}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isDe ? "Befunde exportieren" : "导出结论"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isDe
                ? "Uebertrage die aktuellen Messwerte direkt in den KI-Tutor zur vertieften Analyse."
                : "把当前测量值直接发给 AI 助教，深入分析碰撞前后守恒量。"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            {isDe ? "An Tutor senden" : "发送给助教"}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CollisionLabSim;
