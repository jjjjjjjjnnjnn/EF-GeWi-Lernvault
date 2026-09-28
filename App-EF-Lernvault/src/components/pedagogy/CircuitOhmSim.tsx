import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface CircuitOhmSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type CircuitOhmSimType = CircuitOhmSimProps;

type Topo = "serie" | "parallel";

interface Readout {
  iTot: number;
  i1: number;
  i2: number;
  pBulb: number;
  rTot: number;
  rRheo: number;
}

const COL_I = "#065f46";
const COL_U = "#1e40af";
const COL_P = "#9f1239";
const COL_WIRE = "#3f3f46";
const INK = "#18181b";
const MUTED = "#71717a";
const HAIR = "#e4e4e7";
const PAPER = "#fafafa";

const U_MIN = 0;
const U_MAX = 24;
const RFIX_MIN = 10;
const RFIX_MAX = 200;
const RHEO_MIN = 5;
const RHEO_MAX = 100;

function rheoOf(w: number): number {
  const c = Math.max(0, Math.min(1, w));
  return RHEO_MIN + c * (RHEO_MAX - RHEO_MIN);
}

function solve(U: number, rFix: number, w: number, topo: Topo, closed: boolean): Readout {
  const rRheo = rheoOf(w);
  if (!closed || U <= 0) {
    const rTot = topo === "serie" ? rFix + rRheo : (rFix * rRheo) / (rFix + rRheo);
    return { iTot: 0, i1: 0, i2: 0, pBulb: 0, rTot, rRheo };
  }
  if (topo === "serie") {
    const rTot = rFix + rRheo;
    const i = U / rTot;
    return { iTot: i, i1: i, i2: i, pBulb: i * i * rFix, rTot, rRheo };
  }
  const i1 = U / rFix;
  const i2 = U / rRheo;
  return { iTot: i1 + i2, i1, i2, pBulb: (U * U) / rFix, rTot: (rFix * rRheo) / (rFix + rRheo), rRheo };
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function IconSwitch(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="3.5" cy="8" r="1.4" />
      <circle cx="12.5" cy="8" r="1.4" />
      <path d="M4.9 8L11 4.5" />
    </svg>
  );
}

function IconExport(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 8h10M9 3.5L13.5 8 9 12.5" />
    </svg>
  );
}

export function CircuitOhmSim({ lang, studioMode: _studioMode = true, onExportFinding }: CircuitOhmSimProps) {
  const isDe = lang === "de";

  const [U, setU] = useState<number>(12);
  const [rFix, setRFix] = useState<number>(48);
  const [wiper, setWiper] = useState<number>(0.5);
  const [topo, setTopo] = useState<Topo>("serie");
  const [closed, setClosed] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showFlow, setShowFlow] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const init = solve(12, 48, 0.5, "serie", true);
  const [readout, setReadout] = useState<Readout>(init);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physicsRef = useRef({ phase: 0, frame: 0, dragWiper: false });
  const paramsRef = useRef({ U, rFix, wiper, topo, closed, showFlow });
  const geomRef = useRef({
    wiperX: 0,
    wiperY: 0,
    wiperVertical: false,
    coilX0: 0,
    coilX1: 0,
    coilY: 0,
    branchX: 0,
    railTop: 0,
    railBot: 0,
    switchX0: 0,
    switchX1: 0,
    switchY: 0,
  });

  useEffect(() => {
    paramsRef.current = { U, rFix, wiper, topo, closed, showFlow };
  }, [U, rFix, wiper, topo, closed, showFlow]);

  useEffect(() => {
    let animId = 0;
    let lastTs = -1;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (lastTs < 0) lastTs = now;
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      const p = physicsRef.current;
      const prm = paramsRef.current;
      const sol = solve(prm.U, prm.rFix, prm.wiper, prm.topo, prm.closed);

      p.phase = (p.phase + dt * (0.05 + sol.iTot * 0.22)) % 1;
      p.frame += 1;
      if (p.frame % 6 === 0) {
        setReadout(sol);
      }

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

      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, dispW, dispH);

      const railTop = 66;
      const railBot = dispH - 196;
      const x0 = 64;
      const x1 = dispW - 44;
      const midY = (railTop + railBot) / 2;
      const cx = (x0 + x1) / 2;
      const g = geomRef.current;
      g.railTop = railTop;
      g.railBot = railBot;

      const drawWire = (ax: number, ay: number, bx: number, by: number) => {
        ctx.strokeStyle = COL_WIRE;
        ctx.lineWidth = 2.5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      };

      const drawFlow = (ax: number, ay: number, bx: number, by: number, current: number, offset: number) => {
        if (!prm.showFlow || !prm.closed || current <= 0.0005) return;
        const n = clamp(Math.round(current * 14), 1, 26);
        ctx.fillStyle = COL_U;
        for (let k = 0; k < n; k += 1) {
          const t = (p.phase + offset + k / n) % 1;
          const px = ax + (bx - ax) * t;
          const py = ay + (by - ay) * t;
          ctx.beginPath();
          ctx.arc(px, py, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      };

      const drawBattery = (x: number, y: number) => {
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.5;
        ctx.fillStyle = PAPER;
        ctx.fillRect(x - 13, y - 26, 26, 52);
        ctx.strokeRect(x - 13, y - 26, 26, 52);
        ctx.beginPath();
        ctx.moveTo(x - 13, y - 9);
        ctx.lineTo(x + 13, y - 9);
        ctx.moveTo(x - 13, y + 9);
        ctx.lineTo(x + 13, y + 9);
        ctx.stroke();
        ctx.fillStyle = COL_U;
        ctx.font = "bold 10px ui-monospace, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText("+", x, y - 13);
        ctx.fillStyle = MUTED;
        ctx.fillText("−", x, y + 21);
        ctx.fillStyle = INK;
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.fillText(prm.U.toFixed(1) + " V", x, y + 42);
        ctx.textAlign = "left";
      };

      const drawSwitch = (sx0: number, sx1: number, sy: number) => {
        g.switchX0 = sx0;
        g.switchX1 = sx1;
        g.switchY = sy;
        ctx.fillStyle = INK;
        ctx.beginPath();
        ctx.arc(sx0, sy, 2.6, 0, Math.PI * 2);
        ctx.arc(sx1, sy, 2.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = prm.closed ? INK : COL_P;
        ctx.lineWidth = 2.2;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(sx0, sy);
        if (prm.closed) ctx.lineTo(sx1, sy);
        else ctx.lineTo(sx1 - 8, sy - 20);
        ctx.stroke();
      };

      const drawBulb = (bx: number, by: number, power: number) => {
        const glow = clamp(power / 12, 0, 1);
        if (glow > 0.01) {
          for (let r = 0; r < 3; r += 1) {
            ctx.fillStyle = "rgba(217,119,6," + (0.1 * glow * (3 - r)).toFixed(3) + ")";
            ctx.beginPath();
            ctx.arc(bx, by, 20 + r * 9 + glow * 8, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.fillStyle = PAPER;
        ctx.strokeStyle = INK;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(bx, by, 17, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.strokeStyle = COL_P;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        ctx.moveTo(bx - 6, by + 6);
        ctx.lineTo(bx - 2, by - 6);
        ctx.lineTo(bx + 2, by + 6);
        ctx.lineTo(bx + 6, by - 6);
        ctx.stroke();
        ctx.fillStyle = MUTED;
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText(prm.rFix + " Ω", bx, by + 32);
        ctx.textAlign = "left";
      };

      const drawRheoCoilH = (rx0: number, rx1: number, ry: number, wpos: number) => {
        const turns = 8;
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        const seg = (rx1 - rx0) / turns;
        ctx.moveTo(rx0, ry);
        for (let k = 0; k < turns; k += 1) {
          ctx.lineTo(rx0 + seg * (k + 0.5), ry - 10);
          ctx.lineTo(rx0 + seg * (k + 1), ry);
        }
        ctx.stroke();
        const wx = rx0 + wpos * (rx1 - rx0);
        ctx.strokeStyle = COL_I;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(wx, ry - 10);
        ctx.lineTo(wx, ry - 26);
        ctx.stroke();
        ctx.fillStyle = COL_I;
        ctx.beginPath();
        ctx.moveTo(wx - 6, ry - 32);
        ctx.lineTo(wx + 6, ry - 32);
        ctx.lineTo(wx, ry - 24);
        ctx.closePath();
        ctx.fill();
        g.wiperX = wx;
        g.wiperY = ry - 28;
        g.wiperVertical = false;
        g.coilX0 = rx0;
        g.coilX1 = rx1;
        g.coilY = ry;
        ctx.fillStyle = MUTED;
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText(sol.rRheo.toFixed(0) + " Ω", (rx0 + rx1) / 2, ry + 26);
        ctx.textAlign = "left";
      };

      const drawRheoCoilV = (vx: number, vy0: number, vy1: number, wpos: number) => {
        const turns = 8;
        ctx.strokeStyle = INK;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        const seg = (vy1 - vy0) / turns;
        ctx.moveTo(vx, vy0);
        for (let k = 0; k < turns; k += 1) {
          ctx.lineTo(vx + 12, vy0 + seg * (k + 0.5));
          ctx.lineTo(vx, vy0 + seg * (k + 1));
        }
        ctx.stroke();
        const wy = vy0 + wpos * (vy1 - vy0);
        ctx.strokeStyle = COL_I;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(vx + 12, wy);
        ctx.lineTo(vx + 26, wy);
        ctx.stroke();
        ctx.fillStyle = COL_I;
        ctx.beginPath();
        ctx.moveTo(vx + 32, wy - 6);
        ctx.lineTo(vx + 32, wy + 6);
        ctx.lineTo(vx + 24, wy);
        ctx.closePath();
        ctx.fill();
        g.wiperX = vx + 28;
        g.wiperY = wy;
        g.wiperVertical = true;
        g.branchX = vx;
        ctx.fillStyle = MUTED;
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.textAlign = "left";
        ctx.fillText(sol.rRheo.toFixed(0) + " Ω", vx + 34, wy + 3);
      };

      if (prm.topo === "serie") {
        drawWire(x0, railTop, x1, railTop);
        drawWire(x1, railTop, x1, railBot);
        drawWire(x1, railBot, x0, railBot);
        drawWire(x0, railBot, x0, railTop);
        drawBattery(x0, midY);
        drawSwitch(x0 + 60, x0 + 130, railTop);
        drawBulb(x1, midY, sol.pBulb);
        drawRheoCoilH(cx - 95, cx + 95, railBot, prm.wiper);
        const n = 1;
        void n;
        drawFlow(x0, railTop, x1, railTop, sol.iTot, 0);
        drawFlow(x1, railTop, x1, railBot, sol.iTot, 0.1);
        drawFlow(x1, railBot, x0, railBot, sol.iTot, 0.2);
        drawFlow(x0, railBot, x0, railTop, sol.iTot, 0.3);
      } else {
        const xb1 = x0 + (x1 - x0) * 0.42;
        const xb2 = x0 + (x1 - x0) * 0.72;
        drawWire(x0, railTop, x1, railTop);
        drawWire(x0, railBot, x1, railBot);
        drawWire(x0, railBot, x0, railTop);
        drawWire(xb1, railTop, xb1, railBot);
        drawWire(xb2, railTop, xb2, railTop + 2);
        drawWire(xb1, railBot - 2, xb1, railBot);
        drawBattery(x0, midY);
        drawSwitch(x0 + 30, x0 + 100, railTop);
        drawBulb(xb1, midY, sol.pBulb);
        drawRheoCoilV(xb2, railTop, railBot, prm.wiper);
        ctx.fillStyle = MUTED;
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.textAlign = "center";
        ctx.fillText("I1", xb1, railTop - 8);
        ctx.fillText("I2", xb2 + 22, railTop - 8);
        ctx.textAlign = "left";
        drawFlow(x0, railBot, x0, railTop, sol.iTot, 0.3);
        drawFlow(x0, railTop, xb2, railTop, sol.iTot, 0);
        drawFlow(xb2, railBot, x0, railBot, sol.iTot, 0.2);
        drawFlow(xb1, railTop, xb1, railBot, sol.i1, 0);
        drawFlow(xb2, railTop, xb2, railBot, sol.i2, 0.5);
      }

      ctx.fillStyle = MUTED;
      ctx.font = "10px ui-monospace, Menlo, monospace";
      ctx.textAlign = "left";
      const hint = prm.topo === "serie"
        ? (isDe ? "Serie: R_ges = R + R_schieber" : "串联：总电阻 R = R 定值 + R 滑变")
        : (isDe ? "Parallel: U1 = U2 = U, I = I1 + I2" : "并联：各支路电压相等，总电流为支路之和");
      ctx.fillText(hint, x0, railTop - 34);
      ctx.fillStyle = prm.closed ? COL_I : COL_P;
      ctx.font = "bold 11px ui-monospace, Menlo, monospace";
      const status = prm.closed
        ? (isDe ? "Elektronenfluss aktiv, I = " + (sol.iTot * 1000).toFixed(0) + " mA" : "电子定向移动中，I = " + (sol.iTot * 1000).toFixed(0) + " mA")
        : (isDe ? "Schalter offen, I = 0" : "开关断开，I = 0");
      ctx.fillText(status, x0, railTop - 20);

      const bw = Math.min(300, dispW * 0.52);
      const bx = 16;
      const by = railBot + 16;
      const bh = 158;
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      ctx.fillRect(bx, by, bw, bh);
      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 1;
      ctx.strokeRect(bx, by, bw, bh);
      const ox = bx + 40;
      const oy = by + bh - 26;
      const pw = bw - 56;
      const ph = bh - 48;
      const iMaxA = Math.max(0.5, sol.iTot * 1.35);
      ctx.strokeStyle = MUTED;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(ox, by + 12);
      ctx.lineTo(ox, oy);
      ctx.lineTo(ox + pw, oy);
      ctx.stroke();
      ctx.fillStyle = MUTED;
      ctx.font = "9px ui-monospace, Menlo, monospace";
      ctx.fillText("I/mA", ox - 32, by + 18);
      ctx.fillText("U/V", ox + pw - 24, oy + 16);
      ctx.fillText("24", ox + pw - 6, oy + 12);
      ctx.fillText(((iMaxA * 1000)).toFixed(0), ox - 30, oy - ph + 6);
      const rT = Math.max(1e-6, sol.rTot);
      ctx.strokeStyle = COL_U;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let s = 0; s <= 40; s += 1) {
        const uu = (s / 40) * U_MAX;
        const ii = prm.closed ? uu / rT : 0;
        const px = ox + (uu / U_MAX) * pw;
        const py = oy - (ii / iMaxA) * ph;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      const opx = ox + (prm.U / U_MAX) * pw;
      const opy = oy - (sol.iTot / iMaxA) * ph;
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(opx, opy);
      ctx.lineTo(opx, oy);
      ctx.moveTo(opx, opy);
      ctx.lineTo(ox, opy);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = COL_P;
      ctx.beginPath();
      ctx.arc(opx, opy, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.font = "9px ui-monospace, Menlo, monospace";
      ctx.fillText(isDe ? "Kennlinie I = U/R" : "伏安特性 I = U/R", ox + 4, by + 22);
      ctx.fillStyle = MUTED;
      ctx.fillText((isDe ? "Steigung 1/R, R = " : "斜率 1/R，R = ") + sol.rTot.toFixed(1) + " Ω", ox + 4, by + 34);

      if (prm.topo === "parallel") {
        const sx = bx + bw + 12;
        const sw = Math.max(60, dispW - sx - 16);
        if (sw > 90) {
          const tot = Math.max(1e-9, sol.i1 + sol.i2);
          const f1 = sol.i1 / tot;
          ctx.fillStyle = MUTED;
          ctx.font = "10px ui-monospace, Menlo, monospace";
          ctx.fillText(isDe ? "Stromaufteilung" : "支路电流分配", sx, by + 14);
          ctx.fillStyle = HAIR;
          ctx.fillRect(sx, by + 22, sw, 12);
          ctx.fillStyle = COL_U;
          ctx.fillRect(sx, by + 22, sw * (prm.closed ? f1 : 0), 12);
          ctx.fillStyle = COL_I;
          ctx.fillRect(sx + sw * (prm.closed ? f1 : 0), by + 22, sw * (prm.closed ? 1 - f1 : 0), 12);
          ctx.fillStyle = INK;
          ctx.font = "10px ui-monospace, Menlo, monospace";
          ctx.fillText("I1 = " + (sol.i1 * 1000).toFixed(0) + " mA", sx, by + 52);
          ctx.fillText("I2 = " + (sol.i2 * 1000).toFixed(0) + " mA", sx, by + 68);
          ctx.fillStyle = MUTED;
          ctx.fillText(isDe ? "Abzweigregel I = I1 + I2" : "节点电流定律 I = I1 + I2", sx, by + 86);
        }
      } else {
        const sx = bx + bw + 12;
        if (dispW - sx > 150) {
          ctx.fillStyle = MUTED;
          ctx.font = "10px ui-monospace, Menlo, monospace";
          ctx.fillText(isDe ? "Schieber ziehen:" : "拖动滑片：", sx, by + 14);
          ctx.fillText(isDe ? "verändert R_schieber" : "改变接入电阻", sx, by + 30);
          ctx.fillText(isDe ? "und damit I = U/R_ges." : "从而改变 I = U/R。", sx, by + 46);
          ctx.fillStyle = COL_P;
          ctx.fillText("P = " + sol.pBulb.toFixed(2) + " W", sx, by + 66);
        }
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isDe]);

  const canvasToWiper = (clientX: number, clientY: number): number | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const g = geomRef.current;
    if (g.wiperVertical) {
      if (Math.abs(px - g.wiperX) > 30) return null;
      return clamp((py - g.railTop) / Math.max(1, g.railBot - g.railTop), 0, 1);
    }
    if (Math.abs(py - g.wiperY) > 30) return null;
    return clamp((px - g.coilX0) / Math.max(1, g.coilX1 - g.coilX0), 0, 1);
  };

  const nearSwitch = (clientX: number, clientY: number): boolean => {
    const canvas = canvasRef.current;
    if (!canvas) return false;
    const rect = canvas.getBoundingClientRect();
    const px = clientX - rect.left;
    const py = clientY - rect.top;
    const g = geomRef.current;
    return px > g.switchX0 - 16 && px < g.switchX1 + 16 && Math.abs(py - g.switchY) < 24;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    const w = canvasToWiper(e.clientX, e.clientY);
    if (w !== null) {
      physicsRef.current.dragWiper = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      setWiper(Number(w.toFixed(3)));
      return;
    }
    if (nearSwitch(e.clientX, e.clientY)) {
      setClosed((c) => !c);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    if (!physicsRef.current.dragWiper) return;
    const w = canvasToWiper(e.clientX, e.clientY);
    if (w !== null) setWiper(Number(w.toFixed(3)));
  };

  const endDrag = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    physicsRef.current.dragWiper = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* pointer already released */
    }
  };

  const generateReport = useCallback((): string => {
    const s = solve(U, rFix, wiper, topo, closed);
    if (isDe) {
      return (
        "Labor Gleichstromkreis - Befund:\n" +
        "- Aufbau: " + (topo === "serie" ? "Reihenschaltung" : "Parallelschaltung") + ", Schalter " + (closed ? "geschlossen" : "offen") + ", U = " + U.toFixed(1) + " V\n" +
        "- Widerstände: R_Last = " + rFix + " Ω, R_Schieber = " + s.rRheo.toFixed(1) + " Ω, R_ges = " + s.rTot.toFixed(1) + " Ω\n" +
        "- Messwerte: I_ges = " + (s.iTot * 1000).toFixed(1) + " mA" + (topo === "parallel" ? " (I1 = " + (s.i1 * 1000).toFixed(1) + " mA, I2 = " + (s.i2 * 1000).toFixed(1) + " mA)" : "") + ", P_Lampe = " + s.pBulb.toFixed(2) + " W\n" +
        "- Gesetze: I = U/R, P = U·I; Kennlinie I(U) ist eine Ursprungsgerade mit Steigung 1/R.\n" +
        "Frage an den Tutor: Prüfe die Rechnung und erkläre die Helligkeitsänderung der Lampe."
      );
    }
    return (
      "Labor 直流电路实验 - 结论:\n" +
      "- 连接方式: " + (topo === "serie" ? "串联" : "并联") + ", 开关" + (closed ? "闭合" : "断开") + ", 电压 U = " + U.toFixed(1) + " V\n" +
      "- 电阻: 定值电阻 R = " + rFix + " Ω, 滑变接入 R = " + s.rRheo.toFixed(1) + " Ω, 总电阻 R = " + s.rTot.toFixed(1) + " Ω\n" +
      "- 测量: 总电流 I = " + (s.iTot * 1000).toFixed(1) + " mA" + (topo === "parallel" ? " (支路 I1 = " + (s.i1 * 1000).toFixed(1) + " mA, I2 = " + (s.i2 * 1000).toFixed(1) + " mA)" : "") + ", 灯泡功率 P = " + s.pBulb.toFixed(2) + " W\n" +
      "- 规律: I = U/R, P = UI; 伏安特性 I-U 图线为过原点直线，斜率 1/R。\n" +
      "请助教核对计算并解释灯泡亮度变化原因。"
    );
  }, [U, rFix, wiper, topo, closed, isDe]);

  const handleExport = useCallback(() => {
    const text = generateReport();
    if (onExportFinding) {
      onExportFinding(text);
      return;
    }
    try {
      void navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }, [generateReport, onExportFinding]);

  const pMax = Math.max(1, readout.pBulb, 12);
  const pPct = (readout.pBulb / pMax) * 100;
  const iMaxRef = Math.max(0.2, readout.iTot);
  const iPct = (readout.iTot / Math.max(iMaxRef, 0.001)) * 100;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-serif font-medium text-sm tracking-tight text-[var(--ink)]">
                  {isDe ? "Labor · Gleichstromkreis und Ohmsches Gesetz" : "Labor · 直流电路与欧姆定律"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  {isDe
                    ? "Inspiriert von Modellen der University of Colorado Boulder"
                    : "模型灵感源自 University of Colorado Boulder 开放教育资源"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPanels(!showPanels)}
                className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--surface)] text-[var(--ink)]"
                title={showPanels ? (isDe ? "Seitenleiste einklappen" : "折叠侧栏") : (isDe ? "Seitenleiste einblenden" : "展开侧栏")}
              >
                {showPanels ? (isDe ? "◧ Leiste einklappen" : "◧ 折叠侧栏") : (isDe ? "◩ Leiste einblenden" : "◩ 展开侧栏")}
              </button>
            </div>

            <div className="w-full h-[420px] sm:h-[480px]">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={endDrag}
                onPointerCancel={endDrag}
                className="w-full h-full block cursor-grab active:cursor-grabbing touch-none select-none"
              />
            </div>

            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1.5 font-mono">
                <button
                  type="button"
                  onClick={() => setClosed((c) => !c)}
                  className={`px-2.5 py-1 border border-[var(--line)] font-medium flex items-center gap-1.5 ${
                    closed ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"
                  }`}
                >
                  <IconSwitch />
                  {closed ? (isDe ? "Schalter öffnen" : "断开开关") : (isDe ? "Schalter schließen" : "闭合开关")}
                </button>
                <button
                  type="button"
                  onClick={() => setTopo((t) => (t === "serie" ? "parallel" : "serie"))}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--line)] text-[var(--ink)] font-medium"
                >
                  {topo === "serie" ? (isDe ? "Serie → Parallel" : "串联 → 并联") : (isDe ? "Parallel → Serie" : "并联 → 串联")}
                </button>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>U = <strong>{U.toFixed(1)}</strong> V</span>
                <span>I = <strong>{(readout.iTot * 1000).toFixed(1)}</strong> mA</span>
                <span>R = <strong>{readout.rTot.toFixed(1)}</strong> Ω</span>
                <span>P = <strong>{readout.pBulb.toFixed(2)}</strong> W</span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isDe ? "Schaltungsart" : "电路连接方式"}
              </div>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => setTopo("serie")}
                  className={`py-1.5 border border-[var(--line)] ${topo === "serie" ? "bg-[var(--ink)] text-[var(--paper)] font-medium" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"}`}
                >
                  {isDe ? "Serie" : "串联"}
                </button>
                <button
                  type="button"
                  onClick={() => setTopo("parallel")}
                  className={`py-1.5 border border-[var(--line)] ${topo === "parallel" ? "bg-[var(--ink)] text-[var(--paper)] font-medium" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"}`}
                >
                  {isDe ? "Parallel" : "并联"}
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {isDe
                  ? "Serie: R_ges = R + R_Schieber. Parallel: U1 = U2 = U, I = I1 + I2."
                  : "串联总电阻相加；并联各支路电压相等，干路电流等于支路之和。"}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Spannung und Widerstände" : "电压与电阻调控"}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                  <span>{isDe ? "Spannung (U)" : "电源电压 (U)"}</span>
                  <span className="font-medium">{U.toFixed(1)} V</span>
                </div>
                <input
                  type="range"
                  min={U_MIN}
                  max={U_MAX}
                  step={0.5}
                  value={U}
                  onChange={(e) => setU(Number(e.target.value))}
                  className="w-full"
                  aria-label={isDe ? "Spannung" : "电压"}
                />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                  <span>{isDe ? "Lastwiderstand (R)" : "定值电阻 (R)"}</span>
                  <span className="font-medium">{rFix} Ω</span>
                </div>
                <input
                  type="range"
                  min={RFIX_MIN}
                  max={RFIX_MAX}
                  step={1}
                  value={rFix}
                  onChange={(e) => setRFix(Number(e.target.value))}
                  className="w-full"
                  aria-label={isDe ? "Widerstand" : "电阻"}
                />
              </div>
              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                  <span>{isDe ? "Schiebewiderstand" : "滑动变阻器"}</span>
                  <span className="font-medium">{readout.rRheo.toFixed(0)} Ω</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={wiper}
                  onChange={(e) => setWiper(Number(e.target.value))}
                  className="w-full"
                  aria-label={isDe ? "Schiebewiderstand" : "滑动变阻器"}
                />
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                  {isDe ? "Schieber auch direkt auf der Spule ziehen." : "也可直接在画布线圈上拖动滑片。"}
                </p>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isDe ? "Messwerte live" : "实时测量"}
              </div>
              <div className="flex flex-col gap-2 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>I_ges</span>
                    <span className="font-medium">{(readout.iTot * 1000).toFixed(1)} mA</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full" style={{ width: Math.max(0, Math.min(100, iPct)) + "%", backgroundColor: COL_I }} />
                  </div>
                </div>
                {topo === "parallel" && (
                  <div className="flex justify-between text-[var(--ink-muted)]">
                    <span>I1 = {(readout.i1 * 1000).toFixed(0)} mA</span>
                    <span>I2 = {(readout.i2 * 1000).toFixed(0)} mA</span>
                  </div>
                )}
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>P_Lampe</span>
                    <span className="font-medium">{readout.pBulb.toFixed(2)} W</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full" style={{ width: Math.max(0, Math.min(100, pPct)) + "%", backgroundColor: COL_P }} />
                  </div>
                </div>
                <div className="flex justify-between border-t border-[var(--line)] pt-1.5 font-medium">
                  <span>R_ges</span>
                  <span>{readout.rTot.toFixed(1)} Ω</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-[11px] font-mono text-[var(--ink)]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={showFlow} onChange={(e) => setShowFlow(e.target.checked)} />
                  <span>{isDe ? "Elektronenstrom" : "电子流"}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={closed} onChange={(e) => setClosed(e.target.checked)} />
                  <span>{isDe ? "Schalter zu" : "开关闭合"}</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel &amp; Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Ohmsches Gesetz und Leistung" : "欧姆定律与电功率"}
          </div>
          <MathHtml code="I = \frac{U}{R} \quad \Longleftrightarrow \quad U = R \cdot I" display={true} cacheKey="ohm:gesetz" />
          <MathHtml code="P = U \cdot I = I^2 \cdot R = \frac{U^2}{R}" display={true} cacheKey="ohm:leistung" />
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Bei festem R ist I proportional zu U: Die Kennlinie I(U) ist eine Ursprungsgerade mit Steigung 1/R."
              : "电阻一定时电流与电压成正比，伏安特性 I-U 图线为过原点的直线，斜率为 1/R。"}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Reihen- und Parallelschaltung" : "串并联电路"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper)] px-1">darstellen, berechnen</code>
            <p className="mt-1">
              {isDe
                ? "Stelle die Stromaufteilung dar und berechne: Serie R_ges = R1 + R2; parallel 1/R_ges = 1/R1 + 1/R2, Knotenregel I = I1 + I2."
                : "描述电流分配并计算：串联 R = R1 + R2；并联 1/R = 1/R1 + 1/R2，节点定律 I = I1 + I2。"}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Wasser-Modell" : "水流类比法"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Denke an Wasser: Spannung ist der Pumpendruck, Widerstand die Rohrverengung, Strom die Durchflussmenge. Der Schieber dreht den Hahn weiter auf oder zu."
              : "把电路想成水路：电压是水泵压力，电阻是管道收窄，电流是水流量；滑动变阻器就是可以直接拧的水龙头。"}
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
                ? "Übertrage die aktuellen Messwerte direkt in den KI-Tutor zur vertieften Analyse."
                : "把当前测量值直接送入 AI 助教做深入分析。"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <IconExport />
            {copied ? (isDe ? "Kopiert" : "已复制") : (isDe ? "An Tutor senden" : "发送给助教")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CircuitOhmSim;
