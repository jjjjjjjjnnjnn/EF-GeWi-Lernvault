import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface FaradayInductionSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

const FLUX = "#1e40af";
const EMF = "#065f46";
const LENZ = "#9f1239";
const VECTOR = "#3f3f46";
const INK = "#18181b";
const MUTED = "#71717a";
const HAIR = "#e4e4e7";
const PAPER = "#fafafa";

interface Readout {
  flux: number;
  emf: number;
  current: number;
  bulb: number;
  sign: 1 | -1 | 0;
}

const HIST = 220;

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
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

function IconFlip(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 5.5h8.5M8.5 2.8L11.5 5.5 8.5 8.2M13 10.5H4.5M7.5 7.8L4.5 10.5l3 2.7" />
    </svg>
  );
}

export function FaradayInductionSim({ lang, studioMode: _studioMode = true, onExportFinding }: FaradayInductionSimProps) {
  const isDe = lang === "de";

  const [turns, setTurns] = useState<number>(400);
  const [strength, setStrength] = useState<number>(1.0);
  const [paused, setPaused] = useState<boolean>(false);
  const [autoSweep, setAutoSweep] = useState<boolean>(true);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [showFlux, setShowFlux] = useState<boolean>(true);
  const [showEmf, setShowEmf] = useState<boolean>(true);
  const [showLenz, setShowLenz] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);

  const [readout, setReadout] = useState<Readout>({ flux: 0, emf: 0, current: 0, bulb: 0, sign: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physRef = useRef({
    magX: -1.6,
    phase: 0,
    prevPsi: 0,
    emfSm: 0,
    dragging: false,
    frame: 0,
    init: false,
    fluxHist: new Array<number>(HIST).fill(0),
    emfHist: new Array<number>(HIST).fill(0),
  });
  const paramsRef = useRef({ turns, strength, flipped, autoSweep, paused, showFlux, showEmf, showLenz });
  const langRef = useRef(isDe);

  useEffect(() => {
    paramsRef.current = { turns, strength, flipped, autoSweep, paused, showFlux, showEmf, showLenz };
    langRef.current = isDe;
  }, [turns, strength, flipped, autoSweep, paused, showFlux, showEmf, showLenz, isDe]);

  const shapeOf = (d: number): number => 1 / (1 + (d / 0.45) * (d / 0.45));

  const handleReset = useCallback(() => {
    const p = physRef.current;
    p.magX = -1.6;
    p.phase = 0;
    p.prevPsi = 0;
    p.emfSm = 0;
    p.frame = 0;
    p.fluxHist = new Array<number>(HIST).fill(0);
    p.emfHist = new Array<number>(HIST).fill(0);
  }, []);

  useEffect(() => {
    let animId = 0;
    let lastTs = -1;
    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (lastTs < 0) lastTs = now;
      const dt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;

      const p = physRef.current;
      const prm = paramsRef.current;
      const pol = prm.flipped ? -1 : 1;

      if (!prm.paused && !p.dragging && prm.autoSweep && dt > 0) {
        p.phase += dt * 1.15;
        p.magX = 1.55 * Math.sin(p.phase);
      }

      const d = p.magX;
      const psi = pol * prm.strength * (prm.turns / 200) * 8 * shapeOf(d);

      if (!p.init) {
        p.prevPsi = psi;
        p.init = true;
      }
      let rawEmf = 0;
      if (dt > 0 && !prm.paused) {
        rawEmf = -((psi - p.prevPsi) / dt) * 0.045;
      }
      if (p.dragging && prm.paused) {
        rawEmf = -((psi - p.prevPsi) / Math.max(dt, 1e-3)) * 0.045;
      }
      p.prevPsi = psi;
      p.emfSm += (clamp(rawEmf, -6, 6) - p.emfSm) * (p.dragging ? 0.45 : 0.18);

      p.fluxHist.push(psi);
      if (p.fluxHist.length > HIST) p.fluxHist.shift();
      p.emfHist.push(p.emfSm);
      if (p.emfHist.length > HIST) p.emfHist.shift();

      p.frame += 1;
      if (p.frame % 6 === 0) {
        const current = (Math.abs(p.emfSm) / 20) * 1000;
        setReadout({
          flux: Number(psi.toFixed(2)),
          emf: Number(p.emfSm.toFixed(2)),
          current: Number(current.toFixed(1)),
          bulb: clamp(Math.abs(p.emfSm) / 2.5, 0, 1),
          sign: Math.abs(p.emfSm) < 0.05 ? 0 : p.emfSm > 0 ? 1 : -1,
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

      ctx.fillStyle = PAPER;
      ctx.fillRect(0, 0, dispW, dispH);

      const pad = 26;
      const axisY = dispH * 0.34;
      const simToPx = (x: number): number => pad + ((x + 2.5) / 5) * (dispW - pad * 2);
      const coilX = simToPx(0);
      const magPx = simToPx(clamp(p.magX, -2.5, 2.5));

      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(pad, axisY);
      ctx.lineTo(dispW - pad, axisY);
      ctx.stroke();
      ctx.fillStyle = MUTED;
      ctx.font = "10px ui-monospace, Menlo, monospace";
      for (let gx = -2; gx <= 2; gx += 1) {
        const px = simToPx(gx);
        ctx.beginPath();
        ctx.moveTo(px, axisY - 4);
        ctx.lineTo(px, axisY + 4);
        ctx.stroke();
        ctx.fillText(gx + " LE", px - 12, axisY + 16);
      }

      const nVis = 3 + Math.round(((prm.turns - 100) / 900) * 5);
      const coilHW = 26;
      const coilH = 64;
      ctx.strokeStyle = VECTOR;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(coilX - coilHW, axisY - coilH / 2 - 14);
      ctx.lineTo(coilX - coilHW, axisY - coilH / 2);
      ctx.moveTo(coilX + coilHW, axisY - coilH / 2 - 14);
      ctx.lineTo(coilX + coilHW, axisY - coilH / 2);
      ctx.stroke();
      for (let i = 0; i < nVis; i += 1) {
        const lx = coilX - coilHW + ((2 * coilHW) / Math.max(1, nVis - 1)) * i;
        ctx.strokeStyle = i % 2 === 0 ? FLUX : VECTOR;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(lx, axisY, 7, coilH / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.fillStyle = MUTED;
      ctx.font = "10px ui-monospace, Menlo, monospace";
      ctx.fillText("N = " + prm.turns, coilX - 24, axisY + coilH / 2 + 30);

      const bulbX = coilX + 86;
      const bulbY = axisY - 52;
      ctx.strokeStyle = VECTOR;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(coilX + coilHW, axisY - coilH / 2 - 14);
      ctx.lineTo(bulbX - 14, bulbY);
      ctx.moveTo(coilX - coilHW, axisY - coilH / 2 - 14);
      ctx.lineTo(bulbX - 14, bulbY - 26);
      ctx.stroke();
      const glow = clamp(Math.abs(p.emfSm) / 2.5, 0, 1);
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(bulbX, bulbY, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = VECTOR;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      if (glow > 0.02) {
        ctx.globalAlpha = 0.25 + glow * 0.55;
        ctx.fillStyle = glow > 0.6 ? EMF : "#a1a1aa";
        ctx.beginPath();
        ctx.arc(bulbX, bulbY, 13 * (0.4 + glow * 0.6), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.strokeStyle = VECTOR;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(bulbX - 5, bulbY + 2);
      ctx.lineTo(bulbX - 1, bulbY - 4);
      ctx.lineTo(bulbX + 3, bulbY + 3);
      ctx.lineTo(bulbX + 6, bulbY - 3);
      ctx.stroke();
      ctx.fillStyle = MUTED;
      ctx.font = "10px ui-monospace, Menlo, monospace";
      ctx.fillText(langRef.current ? "Lampe" : "灯泡", bulbX - 14, bulbY + 26);

      const galX = coilX - 92;
      const galY = axisY + 66;
      ctx.strokeStyle = VECTOR;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(coilX - coilHW, axisY + coilH / 2);
      ctx.lineTo(galX + 30, galY - 12);
      ctx.moveTo(coilX + coilHW, axisY + coilH / 2);
      ctx.lineTo(galX - 30, galY - 12);
      ctx.stroke();
      ctx.strokeStyle = VECTOR;
      ctx.beginPath();
      ctx.arc(galX, galY, 26, Math.PI, 0);
      ctx.stroke();
      for (let t = -3; t <= 3; t += 1) {
        const a = -Math.PI / 2 + (t / 3) * 0.9;
        ctx.beginPath();
        ctx.moveTo(galX + Math.cos(a) * 20, galY + Math.sin(a) * 20);
        ctx.lineTo(galX + Math.cos(a) * 26, galY + Math.sin(a) * 26);
        ctx.stroke();
      }
      const needle = clamp(p.emfSm / 3, -1, 1) * 0.9;
      const na = -Math.PI / 2 + needle;
      ctx.strokeStyle = LENZ;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(galX, galY);
      ctx.lineTo(galX + Math.cos(na) * 22, galY + Math.sin(na) * 22);
      ctx.stroke();
      ctx.fillStyle = MUTED;
      ctx.font = "10px ui-monospace, Menlo, monospace";
      ctx.fillText("G", galX - 4, galY + 14);

      const magW = 74;
      const magH = 30;
      const mx = magPx - magW / 2;
      const my = axisY - magH / 2;
      const nLeft = !prm.flipped;
      ctx.fillStyle = nLeft ? "#ffffff" : LENZ;
      ctx.fillRect(mx, my, magW / 2, magH);
      ctx.fillStyle = nLeft ? LENZ : "#ffffff";
      ctx.fillRect(mx + magW / 2, my, magW / 2, magH);
      ctx.strokeStyle = INK;
      ctx.lineWidth = 1.5;
      ctx.strokeRect(mx, my, magW, magH);
      ctx.beginPath();
      ctx.moveTo(mx + magW / 2, my);
      ctx.lineTo(mx + magW / 2, my + magH);
      ctx.stroke();
      ctx.font = "bold 11px ui-monospace, Menlo, monospace";
      ctx.fillStyle = nLeft ? INK : "#ffffff";
      ctx.fillText(nLeft ? "S" : "N", mx + 12, my + 20);
      ctx.fillStyle = nLeft ? "#ffffff" : INK;
      ctx.fillText(nLeft ? "N" : "S", mx + magW - 22, my + 20);
      ctx.fillStyle = MUTED;
      ctx.font = "10px ui-monospace, Menlo, monospace";
      ctx.fillText("B0 x" + prm.strength.toFixed(1), mx + 8, my - 6);

      if (prm.showLenz && Math.abs(p.emfSm) > 0.12) {
        const cw = p.emfSm < 0;
        ctx.strokeStyle = LENZ;
        ctx.lineWidth = 2;
        const r = coilH / 2 + 16;
        const a0 = cw ? -0.6 : Math.PI + 0.6;
        const a1 = cw ? Math.PI + 0.6 : Math.PI * 2 - 0.6;
        ctx.beginPath();
        ctx.ellipse(coilX, axisY, 14, r, 0, a0, a1, !cw);
        ctx.stroke();
        const ae = cw ? a1 : a0;
        const ex = coilX + Math.cos(ae) * 14;
        const ey = axisY + Math.sin(ae) * r;
        ctx.fillStyle = LENZ;
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - 7, ey - 1);
        ctx.lineTo(ex - 1, ey - 7);
        ctx.closePath();
        ctx.fill();
        ctx.font = "bold 10px ui-monospace, Menlo, monospace";
        const label = cw ? (langRef.current ? "Iind: Uhrzeiger" : "感应电流: 顺时针") : (langRef.current ? "Iind: Gegenuhr" : "感应电流: 逆时针");
        ctx.fillText(label, coilX + 24, axisY - r - 4);
        const dPhi = psi - p.fluxHist[Math.max(0, p.fluxHist.length - 12)];
        const lenzTxt =
          dPhi > 0.02
            ? (langRef.current ? "Lenz: Bind hemmt Zunahme" : "楞次: 感应磁场阻碍磁通增大")
            : dPhi < -0.02
              ? (langRef.current ? "Lenz: Bind hemmt Abnahme" : "楞次: 感应磁场阻碍磁通减小")
              : (langRef.current ? "Lenz: kein dPhi/dt" : "楞次: 磁通无变化");
        ctx.fillStyle = LENZ;
        ctx.font = "10px ui-monospace, Menlo, monospace";
        ctx.fillText(lenzTxt, coilX - 110, axisY + coilH / 2 + 44);
      }

      const chartY = dispH * 0.62;
      const chartH = dispH - chartY - 18;
      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 1;
      ctx.strokeRect(pad, chartY, dispW - pad * 2, chartH);
      ctx.strokeStyle = "#d4d4d8";
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pad, chartY + chartH / 2);
      ctx.lineTo(dispW - pad, chartY + chartH / 2);
      ctx.stroke();
      ctx.setLineDash([]);

      const drawSeries = (hist: number[], scale: number, color: string, visible: boolean) => {
        if (!visible) return;
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < hist.length; i += 1) {
          const px = pad + (i / (HIST - 1)) * (dispW - pad * 2);
          const py = chartY + chartH / 2 - clamp(hist[i] / scale, -1, 1) * (chartH / 2 - 6);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
      };
      drawSeries(p.fluxHist, 22, FLUX, prm.showFlux);
      drawSeries(p.emfHist, 4, EMF, prm.showEmf);

      ctx.font = "10px ui-monospace, Menlo, monospace";
      ctx.fillStyle = FLUX;
      ctx.fillText(langRef.current ? "Phi (mWb)" : "磁通 (mWb)", pad + 6, chartY + 14);
      ctx.fillStyle = EMF;
      ctx.fillText(langRef.current ? "Eind (V)" : "电动势 (V)", pad + 110, chartY + 14);
      ctx.fillStyle = MUTED;
      ctx.fillText(langRef.current ? "Magnet ziehen oder Auto-Sweep" : "拖动磁铁或开启自动扫描", dispW - pad - 190, chartY + 14);

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const pxToSim = (clientX: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return physRef.current.magX;
    const rect = canvas.getBoundingClientRect();
    const pad = 26;
    const frac = (clientX - rect.left - pad) / (rect.width - pad * 2);
    return clamp(frac * 5 - 2.5, -2.4, 2.4);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const pad = 26;
    const simToPx = (x: number): number => pad + ((x + 2.5) / 5) * (rect.width - pad * 2);
    const magPx = simToPx(physRef.current.magX);
    if (Math.abs(e.clientX - rect.left - magPx) < 48) {
      physRef.current.dragging = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      physRef.current.magX = pxToSim(e.clientX);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    if (!physRef.current.dragging) return;
    physRef.current.magX = pxToSim(e.clientX);
  };

  const endDrag = (e: React.PointerEvent<HTMLCanvasElement>): void => {
    physRef.current.dragging = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const generateReport = useCallback((): string => {
    if (isDe) {
      return (
        "Labor Faraday-Induktion - Befund:\n" +
        "- Windungszahl N = " + turns + ", Magnetstaerke B0 x" + strength.toFixed(1) + ", Polung: " + (flipped ? "S vorn" : "N vorn") + "\n" +
        "- Flussverkettung Psi = " + readout.flux.toFixed(2) + " mWb, induzierte Spannung E = " + readout.emf.toFixed(2) + " V (" + (readout.sign === 0 ? "kein dPhi/dt" : readout.sign > 0 ? "positiv" : "negativ") + ")\n" +
        "- Schaetzstrom I ~ " + readout.current.toFixed(1) + " mA (R = 20 Ohm), Lampenhelligkeit " + Math.round(readout.bulb * 100) + " %.\n" +
        "Frage an den Tutor: Erklaere Vorzeichen (Lenz-Regel) und warum E mit N und v waechst."
      );
    }
    return (
      "Labor 法拉第电磁感应 - 结论:\n" +
      "- 线圈匝数 N = " + turns + ", 磁铁强度 B0 x" + strength.toFixed(1) + ", 磁极朝向: " + (flipped ? "S 端在前" : "N 端在前") + "\n" +
      "- 磁链 Psi = " + readout.flux.toFixed(2) + " mWb, 感应电动势 E = " + readout.emf.toFixed(2) + " V (" + (readout.sign === 0 ? "磁通无变化" : readout.sign > 0 ? "正向" : "负向") + ")\n" +
      "- 估算电流 I ~ " + readout.current.toFixed(1) + " mA (R = 20 欧), 灯泡亮度 " + Math.round(readout.bulb * 100) + " %。\n" +
      "请助教讲解电动势极性(楞次定律),以及 E 为何随 N 与磁铁速度增大。"
    );
  }, [isDe, turns, strength, flipped, readout]);

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

  const emfColor = readout.sign === 0 ? "text-[var(--ink)]" : readout.sign > 0 ? "text-[#065f46]" : "text-[#9f1239]";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex flex-col">
                <span className="font-serif font-medium text-sm tracking-tight text-[var(--ink)]">
                  {isDe ? "Labor · Faraday-Induktion: Magnet durch Spule" : "Labor · 法拉第电磁感应: 磁铁穿过螺线管"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  {isDe
                    ? "Modellgleichung E = -N · dPhi/dt, handgebautes Canvas-Modell"
                    : "模型方程 E = -N · dΦ/dt, 全手写 Canvas 模型"}
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
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--line)] text-[var(--ink)] flex items-center gap-1.5"
                >
                  <IconReset />
                  {isDe ? "Reset" : "重置"}
                </button>
                <button
                  type="button"
                  onClick={() => setFlipped(!flipped)}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper)] hover:bg-[var(--line)] text-[var(--ink)] flex items-center gap-1.5"
                >
                  <IconFlip />
                  {isDe ? "Pole wenden" : "磁极翻转"}
                </button>
              </div>
              <div className="flex items-center gap-3 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>Psi = <strong className="text-[#1e40af]">{readout.flux.toFixed(2)}</strong> mWb</span>
                <span>E = <strong className={emfColor}>{readout.emf.toFixed(2)}</strong> V</span>
                <span>{isDe ? "Lampe" : "灯泡"} <strong>{Math.round(readout.bulb * 100)} %</strong></span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Spule & Magnet" : "线圈与磁铁参数"}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                  <span>{isDe ? "Windungszahl (N)" : "线圈匝数 (N)"}</span>
                  <span className="font-medium">{turns}</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={turns}
                  onChange={(e) => setTurns(Number(e.target.value))}
                  className="w-full"
                  aria-label={isDe ? "Windungszahl" : "匝数"}
                />
              </div>
              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1 text-[var(--ink)]">
                  <span>{isDe ? "Magnetstaerke (B0)" : "磁铁强度 (B0)"}</span>
                  <span className="font-medium">x{strength.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="2"
                  step="0.1"
                  value={strength}
                  onChange={(e) => setStrength(Number(e.target.value))}
                  className="w-full"
                  aria-label={isDe ? "Magnetstaerke" : "磁铁强度"}
                />
              </div>
              <label className="mt-2 flex items-center gap-1.5 cursor-pointer text-[11px] font-mono text-[var(--ink)]">
                <input type="checkbox" checked={autoSweep} onChange={(e) => setAutoSweep(e.target.checked)} />
                <span>{isDe ? "Auto-Sweep (Sinus)" : "自动扫描 (正弦)"}</span>
              </label>
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {isDe ? "Magnet greifen und durch die Spule ziehen. Schneller = groesseres |E|." : "用指针拖住磁铁穿过线圈,速度越快 |E| 越大。"}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isDe ? "Anzeige" : "显示开关"}
              </div>
              <div className="flex flex-col gap-1.5 text-[11px] font-mono text-[var(--ink)]">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={showFlux} onChange={(e) => setShowFlux(e.target.checked)} />
                  <span className="text-[#1e40af]">Phi(t) {isDe ? "Flusskurve" : "磁通曲线"}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={showEmf} onChange={(e) => setShowEmf(e.target.checked)} />
                  <span className="text-[#065f46]">E(t) {isDe ? "Spannungskurve" : "电动势曲线"}</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" checked={showLenz} onChange={(e) => setShowLenz(e.target.checked)} />
                  <span className="text-[#9f1239]">Lenz {isDe ? "Richtungspfeil" : "方向标注"}</span>
                </label>
              </div>
              <div className="mt-2 border-t border-[var(--line)] pt-2 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <div className="flex justify-between"><span>I ~</span><span className="font-medium">{readout.current.toFixed(1)} mA</span></div>
                <div className="flex justify-between"><span>{isDe ? "Polaritaet" : "极性"}</span><span className={`font-medium ${emfColor}`}>{readout.sign === 0 ? "0" : readout.sign > 0 ? "+" : "−"}</span></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel &amp; Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Faraday & Lenz" : "法拉第与楞次"}
          </div>
          <MathHtml code="E = -N \cdot \frac{d\Phi}{dt}" display={true} cacheKey="faraday:emf" />
          <MathHtml code="\Phi = B \cdot A" display={true} cacheKey="faraday:flux" />
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Minus = Lenz-Regel: I_ind erzeugt ein Feld, das die Flussänderung hemmt. E wächst mit N, B0 und Geschwindigkeit v."
              : "负号即楞次定律:感应电流的磁场总是阻碍磁通变化。E 随匝数 N、磁铁强度 B0 与速度 v 增大。"}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Elektromagnetische Induktion" : "电磁感应"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper)] px-1">darstellen, erklären, beurteilen</code>
            <p className="mt-1">
              {isDe
                ? "Stelle Phi(t) und E(t) beim Durchgang dar, erkläre Polarität und Amplitude mit Faraday und beurteile die Lenz-Richtung."
                : "描述磁铁穿过线圈时的 Φ(t) 与 E(t),用法拉第定律解释极性与幅值,并判断楞次方向。"}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Bremse im Magnetfeld" : "刹车类比法"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Denke an eine Bremse: Das System wehrt sich gegen Veränderung. Schnell rein = starke Gegenwehr (großes |E|), still drin = keine Bremse (E = 0)."
              : "把感应想象成刹车:系统反抗变化。冲得越快刹车越狠(|E|大),停在里面不动则无感应(E=0)。"}
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
                ? "Übertrage N, B0, E und Polarität direkt in den KI-Tutor zur vertieften Analyse."
                : "把匝数、磁强、电动势与极性直接送入 AI 助教做深入分析。"}
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
