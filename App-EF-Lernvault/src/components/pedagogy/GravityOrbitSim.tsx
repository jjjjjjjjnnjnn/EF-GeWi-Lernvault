import { useRef, useEffect, useState, useCallback } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface GravityOrbitSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type BodyStatus = "orbiting" | "escaped" | "collided";

interface TrailPt {
  x: number;
  y: number;
}

interface BodyState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  trail: TrailPt[];
  status: BodyStatus;
  prevAngle: number;
  totalAngle: number;
  lastRevT: number;
  measuredT: number;
  revs: number;
  t: number;
}

interface Readout {
  r: number;
  v: number;
  vk: number;
  vesc: number;
  energy: number;
  status: BodyStatus;
  semiAxis: number;
  periodRef: number;
  k0: number;
  measuredT: number;
  revs: number;
  simTime: number;
}

const G = 1;
const WARP = 40;
const SLOW_FACTOR = 0.25;
const VSCALE = 26;
const MAX_TRAIL = 500;
const MAX_SPEED = 9;

const BODY_COLORS = ["#7dd3fc", "#5eead4", "#f0abfc"];
const VEL_COLOR = "#34d399";
const GRAV_COLOR = "#f87171";

function starRadius(m: number): number {
  return 11 + ((m - 400) / 1600) * 9;
}

function circSpeed(m: number, r: number): number {
  if (r <= 1 || m <= 0) return 0;
  return Math.sqrt((G * m) / r);
}

function wrapPi(a: number): number {
  while (a > Math.PI) a -= 2 * Math.PI;
  while (a < -Math.PI) a += 2 * Math.PI;
  return a;
}

function makeBody(r0: number, vFac: number, m: number): BodyState {
  const vk = circSpeed(m, r0);
  const v0 = vFac * vk;
  return {
    x: 0,
    y: -r0,
    vx: v0,
    vy: 0,
    trail: [],
    status: "orbiting",
    prevAngle: Math.atan2(-r0, 0),
    totalAngle: 0,
    lastRevT: 0,
    measuredT: 0,
    revs: 0,
    t: 0,
  };
}

function statusColor(s: BodyStatus): string {
  if (s === "orbiting") return "#10b981";
  if (s === "escaped") return "#f59e0b";
  return "#ef4444";
}

export function GravityOrbitSim({ lang, studioMode: _studioMode = true, onExportFinding }: GravityOrbitSimProps) {
  void _studioMode;
  const isZh = lang === "zh";

  const [starMass, setStarMass] = useState<number>(1000);
  const [bodyCount, setBodyCount] = useState<number>(2);
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [r0Arr, setR0Arr] = useState<number[]>([130, 185, 95]);
  const [vFacArr, setVFacArr] = useState<number[]>([1.0, 0.8, 1.0]);
  const [paused, setPaused] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showTrail, setShowTrail] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);

  const [readout, setReadout] = useState<Readout>({
    r: 130,
    v: circSpeed(1000, 130),
    vk: circSpeed(1000, 130),
    vesc: Math.SQRT2 * circSpeed(1000, 130),
    energy: -1000 / 130 / 2,
    status: "orbiting",
    semiAxis: 130,
    periodRef: 2 * Math.PI * Math.sqrt(Math.pow(130, 3) / 1000),
    k0: (4 * Math.PI * Math.PI) / 1000,
    measuredT: 0,
    revs: 0,
    simTime: 0,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physRef = useRef<{ bodies: BodyState[] }>({
    bodies: [makeBody(130, 1.0, 1000), makeBody(185, 0.8, 1000), makeBody(95, 1.0, 1000)],
  });
  const paramRef = useRef({ M: 1000, r0: [130, 185, 95], vFac: [1.0, 0.8, 1.0] });
  const ctlRef = useRef({
    paused: false,
    slow: false,
    count: 2,
    showTrail: true,
    showVec: true,
    drag: null as null | { i: number; mode: "pos" | "vel" },
  });
  const activeRef = useRef(0);

  useEffect(() => {
    paramRef.current.M = starMass;
  }, [starMass]);

  useEffect(() => {
    paramRef.current.r0 = r0Arr.slice(0, 3);
    paramRef.current.vFac = vFacArr.slice(0, 3);
  }, [r0Arr, vFacArr]);

  useEffect(() => {
    ctlRef.current.paused = paused;
    ctlRef.current.slow = slowMo;
    ctlRef.current.count = bodyCount;
    ctlRef.current.showTrail = showTrail;
    ctlRef.current.showVec = showVectors;
  }, [paused, slowMo, bodyCount, showTrail, showVectors]);

  useEffect(() => {
    activeRef.current = activeIdx;
  }, [activeIdx]);

  const resetBody = useCallback((i: number, oR0?: number, oVFac?: number) => {
    const M = paramRef.current.M;
    const r0 = oR0 ?? paramRef.current.r0[i] ?? 130;
    const vf = oVFac ?? paramRef.current.vFac[i] ?? 1;
    physRef.current.bodies[i] = makeBody(r0, vf, M);
  }, []);

  const resetAll = useCallback(() => {
    resetBody(0);
    resetBody(1);
    resetBody(2);
  }, [resetBody]);

  const applyPreset = useCallback(
    (fac: number) => {
      const i = activeRef.current;
      const next = vFacArr.slice(0, 3);
      next[i] = fac;
      setVFacArr(next);
      resetBody(i, undefined, fac);
    },
    [resetBody, vFacArr]
  );

  const handleCount = useCallback(
    (n: number) => {
      setBodyCount(n);
      if (activeIdx >= n) setActiveIdx(n - 1);
      for (let i = 0; i < n; i += 1) resetBody(i);
    },
    [activeIdx, resetBody]
  );

  const handleR0 = useCallback(
    (val: number) => {
      const i = activeRef.current;
      const next = r0Arr.slice(0, 3);
      next[i] = val;
      setR0Arr(next);
      resetBody(i, val, undefined);
    },
    [resetBody, r0Arr]
  );

  const handleVFac = useCallback(
    (val: number) => {
      const i = activeRef.current;
      const next = vFacArr.slice(0, 3);
      next[i] = val;
      setVFacArr(next);
      resetBody(i, undefined, val);
    },
    [resetBody, vFacArr]
  );

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
      const M = par.M;
      const sR = starRadius(M);
      const dtSim = rawDt * WARP * (ctl.slow ? SLOW_FACTOR : 1);
      const bodies = physRef.current.bodies;

      for (let i = 0; i < ctl.count; i += 1) {
        const st = bodies[i];
        const dragging = ctl.drag !== null && ctl.drag.i === i;
        if (!ctl.paused && !dragging && dtSim > 0 && st.status !== "collided") {
          const nSub = Math.max(1, Math.ceil(dtSim / 0.05));
          const h = dtSim / nSub;
          for (let k = 0; k < nSub; k += 1) {
            const r = Math.hypot(st.x, st.y);
            if (r < sR) {
              st.status = "collided";
              break;
            }
            const inv = (G * M) / (r * r * r);
            st.vx += -inv * st.x * h;
            st.vy += -inv * st.y * h;
            st.x += st.vx * h;
            st.y += st.vy * h;
            st.t += h;
          }
          if (st.status !== "collided") {
            const r = Math.hypot(st.x, st.y);
            const v = Math.hypot(st.vx, st.vy);
            const e = (v * v) / 2 - (G * M) / Math.max(r, 0.001);
            if (e >= 0 || r > 1400) st.status = "escaped";
            const ang = Math.atan2(st.y, st.x);
            const d = wrapPi(ang - st.prevAngle);
            st.prevAngle = ang;
            if (st.status === "orbiting") {
              st.totalAngle += d;
              if (Math.abs(st.totalAngle) >= 2 * Math.PI) {
                const span = st.t - st.lastRevT;
                if (span > 0.5) {
                  st.measuredT = span;
                  st.revs += 1;
                }
                st.lastRevT = st.t;
                st.totalAngle = 0;
              }
            }
            st.trail.push({ x: st.x, y: st.y });
            if (st.trail.length > MAX_TRAIL) st.trail.splice(0, st.trail.length - MAX_TRAIL);
          }
        }
      }

      frame += 1;
      if (frame % 6 === 0) {
        const ai = Math.min(activeRef.current, 2);
        const st = bodies[ai];
        const r = Math.hypot(st.x, st.y);
        const v = Math.hypot(st.vx, st.vy);
        const vk = circSpeed(M, r);
        const e = (v * v) / 2 - (G * M) / Math.max(r, 0.001);
        const a = e < -1e-9 ? (-(G * M)) / (2 * e) : NaN;
        const r0 = par.r0[ai] ?? 130;
        setReadout({
          r: Number(r.toFixed(1)),
          v: Number(v.toFixed(3)),
          vk: Number(vk.toFixed(3)),
          vesc: Number((Math.SQRT2 * vk).toFixed(3)),
          energy: Number(e.toFixed(3)),
          status: st.status,
          semiAxis: Number.isFinite(a) ? Number(a.toFixed(1)) : NaN,
          periodRef: Number((2 * Math.PI * Math.sqrt(Math.pow(r0, 3) / (G * M))).toFixed(2)),
          k0: Number(((4 * Math.PI * Math.PI) / (G * M)).toFixed(5)),
          measuredT: Number(st.measuredT.toFixed(2)),
          revs: st.revs,
          simTime: Number(st.t.toFixed(1)),
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
      ctx.fillStyle = "#0B1220";
      ctx.fillRect(0, 0, dispW, dispH);

      const cx = dispW / 2;
      const cy = dispH / 2;

      ctx.strokeStyle = "rgba(148, 163, 184, 0.16)";
      ctx.lineWidth = 1;
      for (const rr of [70, 130, 190]) {
        ctx.beginPath();
        ctx.arc(cx, cy, rr, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(148, 163, 184, 0.10)";
      ctx.beginPath();
      ctx.moveTo(0, cy + 0.5);
      ctx.lineTo(dispW, cy + 0.5);
      ctx.moveTo(cx + 0.5, 0);
      ctx.lineTo(cx + 0.5, dispH);
      ctx.stroke();

      const ai = Math.min(activeRef.current, 2);
      const ringR = par.r0[ai] ?? 130;
      ctx.setLineDash([6, 5]);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.75)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, ringR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText("v_k", cx + ringR * 0.72, cy - ringR * 0.72);

      if (ctlRef.current.count > 0) {
        for (let i = 0; i < ctlRef.current.count; i += 1) {
          const st = bodies[i];
          if (ctl.showTrail && st.trail.length > 1) {
            ctx.strokeStyle = BODY_COLORS[i % BODY_COLORS.length];
            ctx.globalAlpha = 0.85;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            for (let p = 0; p < st.trail.length; p += 1) {
              const px = cx + st.trail[p].x;
              const py = cy + st.trail[p].y;
              if (p === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      ctx.fillStyle = "rgba(245, 158, 11, 0.18)";
      ctx.beginPath();
      ctx.arc(cx, cy, sR * 2.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fcd34d";
      ctx.beginPath();
      ctx.arc(cx, cy, sR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#b45309";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      for (let i = 0; i < ctl.count; i += 1) {
        const st = bodies[i];
        const px = cx + st.x;
        const py = cy + st.y;
        const col = BODY_COLORS[i % BODY_COLORS.length];
        const pr = i === ai ? 6 : 5;
        ctx.fillStyle = col;
        ctx.beginPath();
        ctx.arc(px, py, pr, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(2, 6, 23, 0.65)";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = "#e2e8f0";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText(`P${i + 1}`, px + 8, py - 6);

        const showVec = ctl.showVec;
        if (showVec && st.status !== "collided") {
          const vl = Math.hypot(st.vx, st.vy);
          if (vl > 0.01) {
            const ex = px + st.vx * VSCALE;
            const ey = py + st.vy * VSCALE;
            ctx.strokeStyle = VEL_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(ex, ey);
            ctx.stroke();
            ctx.fillStyle = VEL_COLOR;
            ctx.beginPath();
            ctx.arc(ex, ey, 3, 0, Math.PI * 2);
            ctx.fill();
            if (i === ai) {
              ctx.font = "10px ui-monospace, monospace";
              ctx.fillText("v0", ex + 5, ey - 4);
            }
          }
          const r = Math.max(Math.hypot(st.x, st.y), 1);
          const glen = Math.min(46, (M / (r * r)) * 380);
          if (glen > 3) {
            const gx = px - (st.x / r) * glen;
            const gy = py - (st.y / r) * glen;
            ctx.strokeStyle = GRAV_COLOR;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(gx, gy);
            ctx.stroke();
            ctx.fillStyle = GRAV_COLOR;
            ctx.beginPath();
            ctx.arc(gx, gy, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      if (ctl.drag !== null) {
        const st = bodies[ctl.drag.i];
        const px = cx + st.x;
        const py = cy + st.y;
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "#e2e8f0";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + st.vx * VSCALE, py + st.vy * VSCALE);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`M=${M}  t=${bodies[ai].t.toFixed(1)}s`, 12, dispH - 18);
      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toSim = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { sx: 0, sy: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      sx: clientX - rect.left - rect.width / 2,
      sy: clientY - rect.top - rect.height / 2,
    };
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    const i = activeRef.current;
    const st = physRef.current.bodies[i];
    const { sx, sy } = toSim(e.clientX, e.clientY);
    const dPos = Math.hypot(sx - st.x, sy - st.y);
    const tx = st.x + st.vx * VSCALE;
    const ty = st.y + st.vy * VSCALE;
    const dTip = Math.hypot(sx - tx, sy - ty);
    if (dPos <= 18) {
      ctlRef.current.drag = { i, mode: "pos" };
      moveBodyTo(i, sx, sy);
    } else if (dTip <= 16) {
      ctlRef.current.drag = { i, mode: "vel" };
      setVelTo(i, sx, sy);
    }
  };

  const moveBodyTo = (i: number, sx: number, sy: number) => {
    const M = paramRef.current.M;
    const sR = starRadius(M);
    let r = Math.hypot(sx, sy);
    const minR = sR + 10;
    const maxR = 320;
    if (r < 0.001) return;
    const cl = Math.max(minR, Math.min(maxR, r));
    r = cl;
    const st = physRef.current.bodies[i];
    st.x = (sx / Math.hypot(sx, sy)) * r;
    st.y = (sy / Math.hypot(sx, sy)) * r;
    st.trail = [];
    st.status = "orbiting";
    st.prevAngle = Math.atan2(st.y, st.x);
    st.totalAngle = 0;
    st.lastRevT = st.t;
    st.measuredT = 0;
    st.revs = 0;
  };

  const setVelTo = (i: number, sx: number, sy: number) => {
    const st = physRef.current.bodies[i];
    let vx = (sx - st.x) / VSCALE;
    let vy = (sy - st.y) / VSCALE;
    const sp = Math.hypot(vx, vy);
    if (sp > MAX_SPEED) {
      vx = (vx / sp) * MAX_SPEED;
      vy = (vy / sp) * MAX_SPEED;
    }
    st.vx = vx;
    st.vy = vy;
    if (st.status === "collided") st.status = "orbiting";
    st.lastRevT = st.t;
    st.measuredT = 0;
    st.revs = 0;
    st.totalAngle = 0;
    st.prevAngle = Math.atan2(st.y, st.x);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = ctlRef.current.drag;
    if (!drag) return;
    const { sx, sy } = toSim(e.clientX, e.clientY);
    if (drag.mode === "pos") moveBodyTo(drag.i, sx, sy);
    else setVelTo(drag.i, sx, sy);
  };

  const syncArraysFromBody = useCallback((i: number) => {
    const M = paramRef.current.M;
    const st = physRef.current.bodies[i];
    const r = Math.hypot(st.x, st.y);
    const v = Math.hypot(st.vx, st.vy);
    const vk = circSpeed(M, Math.max(r, 1));
    const fac = vk > 0 ? Math.max(0, Math.min(1.7, v / vk)) : 0;
    setR0Arr((prev) => {
      const next = prev.slice(0, 3);
      next[i] = Number(r.toFixed(0));
      return next;
    });
    setVFacArr((prev) => {
      const next = prev.slice(0, 3);
      next[i] = Number(fac.toFixed(2));
      return next;
    });
  }, []);

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const drag = ctlRef.current.drag;
    ctlRef.current.drag = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* noop */
    }
    if (drag) syncArraysFromBody(drag.i);
  };

  const generateReport = (): string => {
    const m = readout;
    const ai = activeIdx;
    const bound = m.status === "orbiting";
    if (isZh) {
      return (
        `引力轨道实验记录:\n` +
        `- 恒星质量 M=${starMass}, 行星数=${bodyCount}, 当前行星=P${ai + 1}\n` +
        `- 当前半径 r=${m.r}, 速率 v=${m.v}, 第一宇宙速度 v_k=${m.vk}, 逃逸速度 v_esc=${m.vesc}\n` +
        `- 比机械能 E=${m.energy} (${bound ? "E<0 束缚轨道" : m.status === "escaped" ? "E>=0 已逃逸" : "撞上恒星"})\n` +
        `- 半长轴 a=${Number.isFinite(m.semiAxis) ? m.semiAxis : "开放轨道无定义"}\n` +
        `- 开普勒常数 T^2/a^3=${m.k0} (理论 4pi^2/GM), 参考周期 T_ref=${m.periodRef}s, 实测周期=${m.measuredT > 0 ? `${m.measuredT}s (已转${m.revs}周)` : "尚未满一周"}\n` +
        `- 结论: v<v_k 则坠向内侧成椭圆, v=v_k 为圆轨道, v>=v_esc 则逃逸; T^2/a^3 与行星无关, 只由中心质量决定.`
      );
    }
    return (
      `Gravitations-Messprotokoll:\n` +
      `- Sternmasse M=${starMass}, Koerper=${bodyCount}, aktiv=P${ai + 1}\n` +
      `- Radius r=${m.r}, Tempo v=${m.v}, Kreisgeschwindigkeit v_k=${m.vk}, Fluchtgeschwindigkeit v_esc=${m.vesc}\n` +
      `- Spez. Energie E=${m.energy} (${bound ? "E<0 gebunden" : m.status === "escaped" ? "E>=0 entkommen" : "Kollision"})\n` +
      `- Halbachse a=${Number.isFinite(m.semiAxis) ? m.semiAxis : "offen, undefiniert"}\n` +
      `- Kepler-Konstante T^2/a^3=${m.k0} (Theorie 4pi^2/GM), Referenzperiode T_ref=${m.periodRef}s, Messwert=${m.measuredT > 0 ? `${m.measuredT}s (${m.revs}x)` : "noch kein Umlauf"}\n` +
      `- Befund: v<v_k ergibt enge Ellipse, v=v_k einen Kreis, v>=v_esc Flucht; T^2/a^3 haengt nur von M ab.`
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

  const statusLabel =
    readout.status === "orbiting"
      ? isZh
        ? "束缚轨道运行"
        : "gebunden im Orbit"
      : readout.status === "escaped"
        ? isZh
          ? "已逃逸 (E>=0)"
          : "entkommen (E>=0)"
        : isZh
          ? "撞上恒星"
          : "Kollision mit Stern";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "万有引力与开普勒轨道" : "Gravitation und Kepler-Orbits"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--gray)] whitespace-nowrap">
                  P{activeIdx + 1} r={readout.r} v={readout.v} E={readout.energy}
                </span>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span
                  className="inline-block w-2 h-2 rounded-full"
                  style={{ background: statusColor(readout.status) }}
                  title={statusLabel}
                />
                <span className="font-mono text-[10px] text-[var(--gray)] hidden sm:inline">{statusLabel}</span>
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
                {isZh
                  ? "拖行星设起点，拖绿色箭头端点设初速度"
                  : "Planet ziehen = Startort, grüne Pfeilspitze ziehen = Startgeschwindigkeit"}
              </div>
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
                  0.25x
                </button>
                <button
                  type="button"
                  onClick={resetAll}
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
                  onClick={() => applyPreset(1.0)}
                  className="px-2 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                >
                  {isZh ? "圆轨道" : "Kreisbahn"}
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(0.75)}
                  className="px-2 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                >
                  {isZh ? "椭圆" : "Ellipse"}
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(1.6)}
                  className="px-2 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                >
                  {isZh ? "逃逸" : "Flucht"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowTrail(!showTrail)}
                  aria-pressed={showTrail}
                  className={`px-2 py-1 border ${
                    showTrail
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                      : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                  }`}
                >
                  {isZh ? "拖尾" : "Spur"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowVectors(!showVectors)}
                  aria-pressed={showVectors}
                  className={`px-2 py-1 border ${
                    showVectors
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                      : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]"
                  }`}
                >
                  {isZh ? "矢量" : "Vektoren"}
                </button>
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
                  <span className="text-[var(--ink)]">{isZh ? "恒星质量 M" : "Sternmasse M"}</span>
                  <span className="font-medium text-[#1e40af]">{starMass}</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2000"
                  step="50"
                  value={starMass}
                  onChange={(e) => setStarMass(Number(e.target.value))}
                  className="w-full accent-[#1e40af]"
                  aria-label={isZh ? "恒星质量" : "Sternmasse"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--gray)]">
                  <span>400</span>
                  <span>2000</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-xs font-mono text-[var(--ink)] mb-1.5">
                  {isZh ? "行星数量与当前行星" : "Koerper und Auswahl"}
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => handleCount(n)}
                      className={`px-2 py-1 border ${
                        bodyCount === n
                          ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                          : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <span className="mx-1 text-[var(--gray)]">|</span>
                  {Array.from({ length: bodyCount }, (_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveIdx(i)}
                      className={`inline-flex items-center gap-1 px-2 py-1 border ${
                        activeIdx === i
                          ? "border-[var(--ink)] bg-[var(--paper-subtle)]"
                          : "border-[var(--line)] bg-[var(--paper)]"
                      }`}
                    >
                      <span
                        className="inline-block w-2 h-2 rounded-full"
                        style={{ background: BODY_COLORS[i % BODY_COLORS.length] }}
                      />
                      P{i + 1}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "起点半径 r0" : "Startradius r0"}</span>
                  <span className="font-medium text-[#1e40af]">{r0Arr[activeIdx]}</span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="220"
                  step="2"
                  value={r0Arr[activeIdx]}
                  onChange={(e) => handleR0(Number(e.target.value))}
                  className="w-full accent-[#1e40af]"
                  aria-label={isZh ? "起点半径" : "Startradius"}
                />
              </div>

              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "初速比 v/v_k" : "Starttempo v/v_k"}</span>
                  <span className="font-medium text-[#065f46]">{vFacArr[activeIdx].toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.7"
                  step="0.01"
                  value={vFacArr[activeIdx]}
                  onChange={(e) => handleVFac(Number(e.target.value))}
                  className="w-full accent-[#065f46]"
                  aria-label={isZh ? "初速比" : "Starttempo"}
                />
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--gray)]">
                  {isZh
                    ? "1.00 为圆轨道 (第一宇宙速度)，1.41 以上逃逸。绝对初速可直接拖绿色箭头端点设定。"
                    : "1.00 = Kreisbahn (v_k), ab 1.41 Flucht. Absolutwert auch per Ziehen der grünen Pfeilspitze."}
                </p>
              </div>

              <div className="border-t border-[var(--line)] pt-2 font-mono tabular-nums text-[11px] text-[var(--ink)] space-y-1">
                <div className="flex justify-between">
                  <span>{isZh ? "半径 r" : "Radius r"}</span>
                  <span>{readout.r}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "速率 v" : "Tempo v"}</span>
                  <span className="text-[#065f46]">{readout.v}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "圆轨道 v_k" : "Kreis v_k"}</span>
                  <span className="text-[#1e40af]">{readout.vk}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "逃逸 v_esc" : "Flucht v_esc"}</span>
                  <span>{readout.vesc}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "比能量 E" : "Energie E"}</span>
                  <span>{readout.energy}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "半长轴 a" : "Halbachse a"}</span>
                  <span>{Number.isFinite(readout.semiAxis) ? readout.semiAxis : isZh ? "开放" : "offen"}</span>
                </div>
                <div className="flex justify-between">
                  <span>T_ref</span>
                  <span className="text-[#1e40af]">{readout.periodRef}s</span>
                </div>
                <div className="flex justify-between">
                  <span>T_mess</span>
                  <span className="text-[#9f1239]">{readout.measuredT > 0 ? `${readout.measuredT}s` : "--.--"}</span>
                </div>
                <div className="flex justify-between">
                  <span>T^2/a^3</span>
                  <span>{readout.k0}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "已转周数" : "Umlaeufe"}</span>
                  <span>{readout.revs}x</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">
                {isZh ? "拖拽说明" : "Hinweis Bedienung"}
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--gray)]">
                {isZh
                  ? "按住行星本体拖动可改起点半径；按住绿色速度箭头端点拖动可任意设定初速矢量（含方向），松开后比值自动回写滑杆。"
                  : "Planet am Koerper ziehen veraendert r0. Gruene Pfeilspitze ziehen setzt den vollen v0-Vektor inklusive Richtung; das Verhaeltnis wird danach in den Regler zurueckgeschrieben."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">01 / Formel und Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "中心引力与宇宙速度" : "Zentralkraft, Kreis- und Fluchtgeschwindigkeit"}</div>
          <div className="mb-1.5">
            <MathHtml code="F = G\frac{M m}{r^2}" display={true} cacheKey="orbit:force-F" />
            <MathHtml code="v_k = \sqrt{GM/r}, \quad v_{esc} = \sqrt{2}\,v_k" display={true} cacheKey="orbit:speed-vk" />
            <MathHtml code="\frac{T^2}{a^3} = \frac{4\pi^2}{G M}" display={true} cacheKey="orbit:kepler-T" />
          </div>
          <p className="text-[var(--gray)] text-[11px] leading-relaxed">
            {isZh
              ? "半隐式 Euler 先更新速度再更新位置，子步积分保证圆轨道稳定；束缚判据为比能量 E<0。"
              : "Semi-implizites Euler aktualisiert erst v, dann x, mit Unter-Schritten; gebunden heisst E<0."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "EF 力学：引力与开普勒定律" : "EF Mechanik: Gravitation und Kepler-Gesetze"}</div>
          <div className="text-[var(--gray)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen, untersuchen, begruenden</code>
            <p className="mt-1">
              {isZh
                ? "典型任务：由 T^2/a^3 读数论证常数只与中心质量有关；用 E>=0 判定逃逸并计算 v_k 与 v_esc。"
                : "Aufgabe: Weise mit T^2/a^3 nach, dass die Konstante nur von M abhaengt; beurteile Flucht mit E>=0 und berechne v_k und v_esc."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "大炮口诀：够快就掉不下来" : "Kanonen-Regel: schnell genug heisst nie landen"}</div>
          <p className="text-[var(--gray)] text-[11px] leading-relaxed">
            {isZh
              ? "牛顿大炮：炮弹够快，落地曲率追不上地球曲率，就成了卫星；再快 1.41 倍，直接出走不回。记作：等速画圆，慢速坠椭，超速出走。"
              : "Newtons Kanone: schnell genug verfehlt das Geschoss den Boden für immer und wird zum Satelliten; Faktor 1.41 darüber heisst Flucht ohne Wiederkehr."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--gray)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "导出测量结论" : "Befunde exportieren"}</div>
            <p className="text-[var(--gray)] text-[11px] leading-relaxed">
              {isZh ? "把当前 M、r、v、能量与开普勒读数发给 AI 助教继续分析。" : "Sende M, r, v, Energie und Kepler-Werte an den KI-Tutor zur Analyse."}
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

export default GravityOrbitSim;
