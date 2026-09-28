import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface StandardSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type EnergySkateParkSimProps = StandardSimProps;

type TrackId = "u" | "rampe";

interface Readout {
  eKin: number;
  ePot: number;
  eTherm: number;
  eGes: number;
  v: number;
  h: number;
}

const KIN = "#065f46";
const POT = "#1e40af";
const THERM = "#9f1239";
const VECTOR = "#3f3f46";
const INK = "#18181b";
const MUTED = "#71717a";
const HAIR = "#e4e4e7";
const PAPER = "#fafafa";

const U_START = -2.6;
const RAMP_START = 4.8;

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function trackLimits(track: TrackId): { lo: number; hi: number } {
  return track === "u" ? { lo: -3.1, hi: 3.1 } : { lo: 0.3, hi: 5.7 };
}

function trackStart(track: TrackId): number {
  return track === "u" ? U_START : RAMP_START;
}

function trackPoint(s: number, track: TrackId): { x: number; y: number; angle: number } {
  if (track === "u") {
    const c = clamp(s, -3.2, 3.2);
    return { x: c, y: 0.45 * c * c + 0.5, angle: Math.atan(0.9 * c) };
  }
  const c = clamp(s, 0.2, 5.8);
  return { x: c - 3, y: 0.9 * (5.8 - c) + 0.5, angle: Math.atan(-0.9) };
}

function viewTransform(w: number, h: number): { unit: number; cx0: number; groundY: number } {
  const unit = Math.max(1, Math.min(w / 9.0, (h - 16) / 6.9));
  return { unit, cx0: w / 2, groundY: h - 20 };
}

function IconPlay(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 2.8v10.4L13 8 4.5 2.8z" />
    </svg>
  );
}

function IconPause(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 3v10M10.5 3v10" />
    </svg>
  );
}

function IconSlow(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 5v3.2l2.2 1.3" />
    </svg>
  );
}

function IconReset(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8a5 5 0 1 1 1.5 3.6M3 8V4.5M3 8h3.5" />
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

export function EnergySkateParkSim({ lang, studioMode: _studioMode = true, onExportFinding }: StandardSimProps) {
  const isDe = lang === "de";

  const [track, setTrack] = useState<TrackId>("u");
  const [mass, setMass] = useState<number>(60);
  const [mu, setMu] = useState<number>(0);
  const [gravity, setGravity] = useState<number>(9.81);
  const [paused, setPaused] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showPie, setShowPie] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const [readout, setReadout] = useState<Readout>({
    eKin: 0,
    ePot: 1790,
    eTherm: 0,
    eGes: 1790,
    v: 0,
    h: 3.54,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physicsRef = useRef({ s: U_START, v: 0, eTherm: 0, dragging: false, frame: 0 });
  const paramsRef = useRef({ track: track as TrackId, mass, mu, gravity });

  useEffect(() => {
    paramsRef.current = { track, mass, mu, gravity };
  }, [track, mass, mu, gravity]);

  const handleReset = useCallback(() => {
    const t = paramsRef.current.track;
    physicsRef.current.s = trackStart(t);
    physicsRef.current.v = 0;
    physicsRef.current.eTherm = 0;
    physicsRef.current.frame = 0;
  }, []);

  const selectTrack = useCallback((t: TrackId) => {
    setTrack(t);
    physicsRef.current.s = trackStart(t);
    physicsRef.current.v = 0;
    physicsRef.current.eTherm = 0;
    physicsRef.current.frame = 0;
  }, []);

  useEffect(() => {
    let animId = 0;
    let lastTs = -1;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (lastTs < 0) lastTs = now;
      const rawDt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const dt = slowMo ? rawDt * 0.3 : rawDt;

      const p = physicsRef.current;
      const prm = paramsRef.current;

      if (!paused && !p.dragging && dt > 0) {
        const tp = trackPoint(p.s, prm.track);
        const gT = -prm.gravity * Math.sin(tp.angle);
        const gN = prm.gravity * Math.cos(tp.angle);
        const fMax = prm.mu * gN;
        if (Math.abs(p.v) < 0.05 && Math.abs(gT) <= fMax) {
          p.v = 0;
        } else {
          const dir = p.v !== 0 ? Math.sign(p.v) : Math.sign(gT);
          const a = gT - dir * fMax;
          p.v += a * dt;
          p.eTherm += prm.mu * prm.mass * gN * Math.abs(p.v) * dt;
        }
        p.s += p.v * dt;
        const lim = trackLimits(prm.track);
        if (p.s > lim.hi || p.s < lim.lo) {
          const rest = 0.7;
          p.eTherm += 0.5 * prm.mass * p.v * p.v * (1 - rest * rest);
          p.s = clamp(p.s, lim.lo, lim.hi);
          p.v = -p.v * rest;
        }
      }

      const cur = trackPoint(p.s, prm.track);
      const ePot = prm.mass * prm.gravity * Math.max(0, cur.y - 0.5);
      const eKin = 0.5 * prm.mass * p.v * p.v;
      const eTherm = Math.max(0, p.eTherm);
      const eGes = ePot + eKin + eTherm;

      p.frame += 1;
      if (p.frame % 6 === 0) {
        setReadout({
          eKin: Math.round(eKin),
          ePot: Math.round(ePot),
          eTherm: Math.round(eTherm),
          eGes: Math.round(eGes),
          v: Number(Math.abs(p.v).toFixed(2)),
          h: Number(cur.y.toFixed(2)),
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
      if (canvas.width !== Math.floor(dispW * dpr) || canvas.height !== Math.floor(dispH * dpr)) {
        canvas.width = Math.floor(dispW * dpr);
        canvas.height = Math.floor(dispH * dpr);
      }
      ctx.save();
      ctx.scale(dpr, dpr);

      const { unit, cx0, groundY } = viewTransform(dispW, dispH);
      const tx = (x: number): number => cx0 + x * unit;
      const ty = (y: number): number => groundY - y * unit;

      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, dispW, dispH);

      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.lineWidth = 1;
      for (let ys = 0; ys <= 6; ys += 1) {
        ctx.strokeStyle = HAIR;
        ctx.beginPath();
        ctx.moveTo(tx(-4.4), ty(ys));
        ctx.lineTo(tx(4.4), ty(ys));
        ctx.stroke();
        ctx.fillStyle = MUTED;
        ctx.fillText(ys + " m", tx(-4.4) + 4, ty(ys) - 3);
      }

      ctx.strokeStyle = MUTED;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tx(-4.4), ty(0));
      ctx.lineTo(tx(4.4), ty(0));
      ctx.stroke();

      const lim = trackLimits(prm.track);
      const posts = prm.track === "u" ? [-3, -1.5, 0, 1.5, 3] : [0.5, 2, 3.5, 5];
      ctx.strokeStyle = HAIR;
      for (const sp of posts) {
        const q = trackPoint(sp, prm.track);
        ctx.beginPath();
        ctx.moveTo(tx(q.x), ty(q.y));
        ctx.lineTo(tx(q.x), ty(0));
        ctx.stroke();
      }

      ctx.strokeStyle = VECTOR;
      ctx.lineWidth = 3;
      ctx.lineJoin = "round";
      ctx.lineCap = "round";
      ctx.beginPath();
      const steps = 90;
      for (let i = 0; i <= steps; i += 1) {
        const sv = lim.lo - 0.1 + (lim.hi - lim.lo + 0.2) * (i / steps);
        const q = trackPoint(sv, prm.track);
        if (i === 0) ctx.moveTo(tx(q.x), ty(q.y));
        else ctx.lineTo(tx(q.x), ty(q.y));
      }
      ctx.stroke();

      const px = tx(cur.x);
      const py = ty(cur.y);

      ctx.save();
      ctx.strokeStyle = MUTED;
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(tx(-4.4), py);
      ctx.lineTo(px, py);
      ctx.stroke();
      ctx.restore();

      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(cur.angle);

      ctx.fillStyle = INK;
      ctx.fillRect(-16, -3, 32, 4);
      ctx.beginPath();
      ctx.arc(-10, 1.5, 2.6, 0, Math.PI * 2);
      ctx.arc(10, 1.5, 2.6, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = INK;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo(-5, -3);
      ctx.lineTo(0, -16);
      ctx.lineTo(5, -3);
      ctx.moveTo(0, -16);
      ctx.lineTo(0, -28);
      ctx.moveTo(-8, -23);
      ctx.lineTo(8, -23);
      ctx.stroke();
      ctx.fillStyle = INK;
      ctx.beginPath();
      ctx.arc(0, -32, 4.4, 0, Math.PI * 2);
      ctx.fill();

      if (showVectors && Math.abs(p.v) > 0.15) {
        const dir = Math.sign(p.v);
        const len = clamp(Math.abs(p.v) * 6, 10, 88);
        const y0 = -20;
        ctx.strokeStyle = VECTOR;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, y0);
        ctx.lineTo(dir * len, y0);
        ctx.stroke();
        ctx.fillStyle = VECTOR;
        ctx.beginPath();
        ctx.moveTo(dir * len, y0);
        ctx.lineTo(dir * len - dir * 6, y0 - 3.5);
        ctx.lineTo(dir * len - dir * 6, y0 + 3.5);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      if (showVectors) {
        const fLen = clamp(prm.mass * prm.gravity * 0.08, 12, 64);
        ctx.strokeStyle = VECTOR;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(px + 22, py - 44);
        ctx.lineTo(px + 22, py - 44 + fLen);
        ctx.stroke();
        ctx.fillStyle = VECTOR;
        ctx.beginPath();
        ctx.moveTo(px + 22, py - 44 + fLen);
        ctx.lineTo(px + 18.5, py - 44 + fLen - 6);
        ctx.lineTo(px + 25.5, py - 44 + fLen - 6);
        ctx.closePath();
        ctx.fill();
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.fillText(isDe ? "Fg" : "重力", px + 27, py - 44 + fLen);
        if (showVectors && Math.abs(p.v) > 0.15) {
          ctx.fillText("v", px + Math.sign(p.v) * clamp(Math.abs(p.v) * 6, 10, 88) + 4, py - 18);
        }
      }

      if (showPie && eGes > 1) {
        const pieX = px;
        const pieY = py - 62;
        const pieR = 14;
        let ang = -Math.PI / 2;
        const parts: Array<{ frac: number; color: string }> = [
          { frac: ePot / eGes, color: POT },
          { frac: eKin / eGes, color: KIN },
          { frac: eTherm / eGes, color: THERM },
        ];
        for (const part of parts) {
          if (part.frac > 0.002) {
            ctx.fillStyle = part.color;
            ctx.beginPath();
            ctx.moveTo(pieX, pieY);
            ctx.arc(pieX, pieY, pieR, ang, ang + part.frac * Math.PI * 2);
            ctx.closePath();
            ctx.fill();
            ang += part.frac * Math.PI * 2;
          }
        }
        ctx.strokeStyle = MUTED;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(pieX, pieY, pieR, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [paused, slowMo, isDe, showPie, showVectors]);

  const pixelToS = (clientX: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return physicsRef.current.s;
    const rect = canvas.getBoundingClientRect();
    const { unit, cx0 } = viewTransform(Math.max(1, rect.width), Math.max(1, rect.height));
    const simX = (clientX - rect.left - cx0) / unit;
    const t = paramsRef.current.track;
    const raw = t === "u" ? simX : simX + 3;
    const l = trackLimits(t);
    return clamp(raw, l.lo, l.hi);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    e.currentTarget.setPointerCapture(e.pointerId);
    physicsRef.current.dragging = true;
    physicsRef.current.s = pixelToS(e.clientX);
    physicsRef.current.v = 0;
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    if (!physicsRef.current.dragging) return;
    physicsRef.current.s = pixelToS(e.clientX);
    physicsRef.current.v = 0;
  };

  const endDrag = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    physicsRef.current.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const generateReport = useCallback((): string => {
    const t = paramsRef.current.track;
    if (isDe) {
      return (
        "Labor Energie-Skaterpark - Befund:\n" +
        "- Bahn: " + (t === "u" ? "U-Bahn" : "Rampe") + ", m = " + mass + " kg, Reibung mu = " + mu.toFixed(3) + ", g = " + gravity.toFixed(2) + " m/s2\n" +
        "- Energiebilanz: E_ges = " + readout.eGes + " J (E_pot = " + readout.ePot + " J, E_kin = " + readout.eKin + " J, E_therm = " + readout.eTherm + " J)\n" +
        "- Momentanwerte: v = " + readout.v.toFixed(2) + " m/s bei h = " + readout.h.toFixed(2) + " m.\n" +
        "Frage an den Tutor: Erklaere die Umwandlungsschritte und pruefe die Erhaltung von E_ges."
      );
    }
    return (
      "Labor 能量滑板实验 - 结论:\n" +
      "- 轨道: " + (t === "u" ? "U 形槽" : "斜坡") + ", 质量 m = " + mass + " kg, 摩擦 mu = " + mu.toFixed(3) + ", 重力 g = " + gravity.toFixed(2) + " m/s2\n" +
      "- 能量账单: 总能量 E = " + readout.eGes + " J (势能 " + readout.ePot + " J, 动能 " + readout.eKin + " J, 内能 " + readout.eTherm + " J)\n" +
      "- 瞬时值: v = " + readout.v.toFixed(2) + " m/s, 高度 h = " + readout.h.toFixed(2) + " m。\n" +
      "请助教讲解每一步能量转化,并验证总能量守恒。"
    );
  }, [isDe, mass, mu, gravity, readout]);

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

  const total = Math.max(1, readout.eGes);
  const kinPct = (readout.eKin / total) * 100;
  const potPct = (readout.ePot / total) * 100;
  const thermPct = (readout.eTherm / total) * 100;

  const bar = (pct: number, color: string): JSX.Element => (
    <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden">
      <div className="h-full" style={{ width: Math.max(0, Math.min(100, pct)) + "%", backgroundColor: color }} />
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-serif font-medium text-sm tracking-tight text-[var(--ink)]">
                  {isDe ? "Labor · Energie-Skaterpark" : "Labor · 能量滑板实验"}
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
                  onClick={() => setPaused(!paused)}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--line)] font-medium text-[var(--ink)] flex items-center gap-1.5"
                >
                  {paused ? <IconPlay /> : <IconPause />}
                  {paused ? (isDe ? "Start" : "开始") : (isDe ? "Pause" : "暂停")}
                </button>
                <button
                  type="button"
                  onClick={() => setSlowMo(!slowMo)}
                  className={`px-2.5 py-1 border border-[var(--line)] font-medium flex items-center gap-1.5 ${
                    slowMo ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"
                  }`}
                >
                  <IconSlow />
                  0.3x
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--line)] text-[var(--ink)] flex items-center gap-1.5"
                >
                  <IconReset />
                  {isDe ? "Reset" : "重置"}
                </button>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>v = <strong>{readout.v.toFixed(2)}</strong> m/s</span>
                <span>h = <strong>{readout.h.toFixed(2)}</strong> m</span>
                <span>E = <strong>{readout.eGes}</strong> J</span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isDe ? "Bahnprofil" : "轨道预设"}
              </div>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => selectTrack("u")}
                  className={`py-1.5 border border-[var(--line)] ${track === "u" ? "bg-[var(--ink)] text-[var(--paper)] font-medium" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"}`}
                >
                  {isDe ? "U-Bahn" : "U 形槽"}
                </button>
                <button
                  type="button"
                  onClick={() => selectTrack("rampe")}
                  className={`py-1.5 border border-[var(--line)] ${track === "rampe" ? "bg-[var(--ink)] text-[var(--paper)] font-medium" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"}`}
                >
                  {isDe ? "Rampe" : "斜坡"}
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {isDe ? "Fahrer auf der Bahn greifen und auf Starthoehe ziehen." : "用指针拖住滑板可放到任意起始高度后释放。"}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Physikalische Parameter" : "物理参数调控"}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                  <span>{isDe ? "Masse (m)" : "质量 (m)"}</span>
                  <span className="font-medium">{mass} kg</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full"
                  aria-label={isDe ? "Masse" : "质量"}
                />
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                  <span>{isDe ? "Reibung (μ)" : "摩擦 (μ)"}</span>
                  <span className="font-medium">{mu === 0 ? (isDe ? "reibungsfrei" : "无摩擦") : mu.toFixed(3)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.08"
                  step="0.005"
                  value={mu}
                  onChange={(e) => setMu(Number(e.target.value))}
                  className="w-full"
                  aria-label={isDe ? "Reibung" : "摩擦"}
                />
                <div className="flex justify-between text-[10px] font-mono mt-1">
                  <button type="button" onClick={() => setMu(0)} className="text-[var(--ink-muted)] hover:text-[var(--ink)] hover:underline">
                    {isDe ? "μ = 0" : "μ 置零"}
                  </button>
                  <button type="button" onClick={() => setMu(0.03)} className="text-[var(--ink-muted)] hover:text-[var(--ink)] hover:underline">
                    {isDe ? "μ = 0.03" : "μ 中档"}
                  </button>
                </div>
              </div>
              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                  <span>{isDe ? "Gravitation (g)" : "重力场 (g)"}</span>
                  <span className="font-medium">{gravity.toFixed(2)} m/s²</span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setGravity(1.62)}
                    className={`py-1 border border-[var(--line)] ${Math.abs(gravity - 1.62) < 0.01 ? "bg-[var(--ink)] text-[var(--paper)] font-medium" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"}`}
                  >
                    {isDe ? "Mond" : "月球"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGravity(9.81)}
                    className={`py-1 border border-[var(--line)] ${Math.abs(gravity - 9.81) < 0.01 ? "bg-[var(--ink)] text-[var(--paper)] font-medium" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"}`}
                  >
                    {isDe ? "Erde" : "地球"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setGravity(24.79)}
                    className={`py-1 border border-[var(--line)] ${Math.abs(gravity - 24.79) < 0.01 ? "bg-[var(--ink)] text-[var(--paper)] font-medium" : "bg-[var(--paper)] text-[var(--ink)] hover:bg-[var(--line)]"}`}
                  >
                    Jupiter
                  </button>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isDe ? "Energiebilanz live" : "能量实时账单"}
              </div>
              <div className="flex flex-col gap-2 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>E_kin</span>
                    <span className="font-medium">{readout.eKin} J</span>
                  </div>
                  {bar(kinPct, KIN)}
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>E_pot</span>
                    <span className="font-medium">{readout.ePot} J</span>
                  </div>
                  {bar(potPct, POT)}
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>E_therm</span>
                    <span className="font-medium">{readout.eTherm} J</span>
                  </div>
                  {bar(thermPct, THERM)}
                </div>
                <div className="flex justify-between border-t border-[var(--line)] pt-1.5 font-medium">
                  <span>E_ges</span>
                  <span>{readout.eGes} J</span>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-4 text-[11px] font-mono text-[var(--ink)]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={showPie} onChange={(e) => setShowPie(e.target.checked)} />
                  <span>{isDe ? "Kreisdiagramm" : "饼图"}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={showVectors} onChange={(e) => setShowVectors(e.target.checked)} />
                  <span>{isDe ? "Vektoren" : "速度矢量"}</span>
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
            {isDe ? "Energieerhaltung auf der Bahn" : "轨道能量守恒"}
          </div>
          <MathHtml code="E_{\mathrm{ges}} = E_{\mathrm{pot}} + E_{\mathrm{kin}} + E_{\mathrm{therm}} = \mathrm{konst.}" display={true} cacheKey="esp:eges" />
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "E_pot = m·g·h, E_kin = ½·m·v². Reibungsfrei gilt am Tiefpunkt v = √(2·g·h). Reibung bucht Arbeit in E_therm um."
              : "势能 E_pot = mgh，动能 E_kin = ½mv²。无摩擦时最低点 v = √(2gh)；摩擦做功转为内能 E_therm。"}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Mechanik: Energiebilanzen" : "力学：能量关系"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper)] px-1">darstellen, berechnen</code>
            <p className="mt-1">
              {isDe
                ? "Stelle die Umwandlung E_pot → E_kin → E_therm entlang der Bahn dar und berechne v am Tiefpunkt aus der Starthöhe."
                : "描述滑板沿轨道 E_pot → E_kin → E_therm 的转化，并由起始高度计算最低点速度。"}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Energie-Konto" : "能量记账法"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Denke in Konten: Das Startguthaben E_pot wird unterwegs in E_kin umgebucht, Reibung zweigt eine Gebühr E_therm ab. Der Kontostand E_ges bleibt gleich."
              : "把能量当记账：起点存入势能，下滑转成动能，摩擦收走手续费变成内能，总账 E_ges 永远不变。"}
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
