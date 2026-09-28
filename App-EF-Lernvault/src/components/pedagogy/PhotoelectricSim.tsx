import { useCallback, useEffect, useRef, useState } from "react";
import type { JSX } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface PhotoelectricSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

// ---------- First-principles constants ----------
const H_EV_S = 4.135667696e-15; // Planck constant (eV s)
const C_LIGHT = 2.99792458e8; // vacuum light speed (m/s)
const HC_EV_NM = 1239.84193; // h*c in eV*nm

interface Cathode {
  id: "Cs" | "K" | "Zn";
  workFn: number; // W_A in eV
  label: string;
}

const CATHODES: Cathode[] = [
  { id: "Cs", workFn: 2.14, label: "Cs-2.14 eV" },
  { id: "K", workFn: 2.3, label: "K-2.30 eV" },
  { id: "Zn", workFn: 4.3, label: "Zn-4.30 eV" },
];

const LAM_MIN = 200; // nm
const LAM_MAX = 700; // nm
const U_MIN = -3; // V
const U_MAX = 3; // V
const I_SAT_MAX = 8; // µA at 100 % intensity

const COL_EMIT = "#065f46";
const COL_PHOTON = "#1e40af";
const COL_STOP = "#9f1239";
const COL_VECTOR = "#3f3f46";
const INK = "#18181b";
const MUTED = "#71717a";
const HAIR = "#e4e4e7";
const STAGE_BG = "#fafafa";

interface Readout {
  nu14: number; // frequency in 1e14 Hz
  eph: number; // photon energy eV
  ekin: number; // max kinetic energy eV
  u0: number; // stopping voltage V
  iPhoto: number; // photocurrent µA
  emits: boolean;
}

interface Electron {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function photonEV(lambdaNm: number): number {
  return HC_EV_NM / Math.max(1, lambdaNm);
}

function freqHz(lambdaNm: number): number {
  return C_LIGHT / (Math.max(1, lambdaNm) * 1e-9);
}

function stoppingV(ekinEV: number): number {
  return Math.max(0, ekinEV);
}

/** Retarding-potential characteristic: accelerating branch saturates, retarding branch falls to U0. */
function photoCurrent(iSat: number, u: number, u0: number, emits: boolean): number {
  if (!emits || iSat <= 0) return 0;
  if (u <= 0) return iSat;
  if (u >= u0) return 0;
  return iSat * (1 - u / u0);
}

/** Cheap visible-spectrum tint for the incident beam; UV shown as muted violet. */
function beamColor(lambdaNm: number): string {
  const l = lambdaNm;
  if (l < 380) return "#7c7cb4";
  if (l < 440) return "#4f46e5";
  if (l < 490) return "#1e40af";
  if (l < 510) return "#0e7490";
  if (l < 560) return "#047857";
  if (l < 590) return "#a16207";
  if (l < 620) return "#c2410c";
  return "#9f1239";
}

function IconPlayPause({ paused }: { paused: boolean }): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      {paused ? <path d="M5 3.5l8 4.5-8 4.5z" /> : <path d="M5.5 3.5v9M10.5 3.5v9" />}
    </svg>
  );
}

function IconSlow(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="8" r="5.2" />
      <path d="M8 5.4V8l1.8 1.4" />
    </svg>
  );
}

function IconReset(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
      <path d="M13.5 2.5v3h-3" />
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

export function PhotoelectricSim({ lang, studioMode = true, onExportFinding }: PhotoelectricSimProps) {
  const isDe = lang === "de";

  const [cathodeId, setCathodeId] = useState<"Cs" | "K" | "Zn">("K");
  const [lambdaNm, setLambdaNm] = useState<number>(450);
  const [intensity, setIntensity] = useState<number>(70);
  const [voltage, setVoltage] = useState<number>(0);
  const [playing, setPlaying] = useState<boolean>(true);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showCurve, setShowCurve] = useState<boolean>(true);
  const [showElectrons, setShowElectrons] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);

  const [readout, setReadout] = useState<Readout>({ nu14: 0, eph: 0, ekin: 0, u0: 0, iPhoto: 0, emits: false });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physRef = useRef({ electrons: [] as Electron[], phase: 0, time: 0, frame: 0 });
  const paramsRef = useRef({ cathodeId, lambdaNm, intensity, voltage, playing, slowMo, showCurve, showElectrons });
  const railRef = useRef({ x0: 0, x1: 1, dragging: false });
  const isDeRef = useRef(isDe);
  isDeRef.current = isDe;

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  useEffect(() => {
    paramsRef.current = { cathodeId, lambdaNm, intensity, voltage, playing, slowMo, showCurve, showElectrons };
  }, [cathodeId, lambdaNm, intensity, voltage, playing, slowMo, showCurve, showElectrons]);

  const cathode = CATHODES.find((c) => c.id === cathodeId) ?? CATHODES[1];

  const handleReset = useCallback(() => {
    const p = physRef.current;
    p.electrons = [];
    p.phase = 0;
    p.time = 0;
    p.frame = 0;
  }, []);

  // ---- Canvas pointer: drag the retarding-voltage knob on the U rail ----
  const uFromClient = (clientX: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return paramsRef.current.voltage;
    const rect = canvas.getBoundingClientRect();
    const r = railRef.current;
    const frac = (clientX - rect.left - r.x0) / Math.max(1, r.x1 - r.x0);
    return clamp(U_MIN + frac * (U_MAX - U_MIN), U_MIN, U_MAX);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    railRef.current.dragging = true;
    setVoltage(Number(uFromClient(e.clientX).toFixed(2)));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!railRef.current.dragging) return;
    setVoltage(Number(uFromClient(e.clientX).toFixed(2)));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    railRef.current.dragging = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  // ---- 60 FPS decoupled loop: physics in ref, DOM readout every 6th frame ----
  useEffect(() => {
    let animId = 0;
    let lastTs = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dtRaw = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const prm = paramsRef.current;
      const dt = prm.slowMo ? dtRaw * 0.3 : dtRaw;
      const p = physRef.current;

      const W = CATHODES.find((c) => c.id === prm.cathodeId)?.workFn ?? 2.3;
      const eph = photonEV(prm.lambdaNm);
      const ekin = eph - W;
      const emits = ekin > 0;
      const u0 = stoppingV(ekin);
      const iSat = (prm.intensity / 100) * I_SAT_MAX;
      const iPhoto = photoCurrent(iSat, prm.voltage, u0, emits);

      if (prm.playing) {
        p.time += dt;
        p.phase += dt * 6;
        // Spawn photoelectrons: rate scales with current fraction.
        if (prm.showElectrons && emits && iPhoto > 0.02 && p.electrons.length < 150) {
          const frac = iSat > 0 ? iPhoto / iSat : 0;
          const spawnN = Math.min(4, Math.floor(frac * 3 * (prm.intensity / 40)) + (p.frame % 6 === 0 ? 1 : 0));
          for (let k = 0; k < spawnN && p.electrons.length < 150; k++) {
            const speed = 60 + 160 * Math.sqrt(Math.max(0.02, ekin) / 3);
            p.electrons.push({ x: -1, y: -1, vx: speed * (0.85 + Math.random() * 0.3), vy: (Math.random() - 0.5) * 26 });
          }
        }
        for (const el of p.electrons) {
          el.x += el.vx * dt;
          el.y += el.vy * dt;
        }
        p.electrons = p.electrons.filter((el) => el.x < 4 && Math.abs(el.y) < 3);
      }

      p.frame += 1;
      if (p.frame % 6 === 0) {
        setReadout({
          nu14: Number((freqHz(prm.lambdaNm) / 1e14).toFixed(2)),
          eph: Number(eph.toFixed(3)),
          ekin: Number(Math.max(0, ekin).toFixed(3)),
          u0: Number(u0.toFixed(3)),
          iPhoto: Number(iPhoto.toFixed(2)),
          emits,
        });
      }

      // ---- Dynamic-DPR render ----
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
      ctx.fillStyle = STAGE_BG;
      ctx.fillRect(0, 0, dispW, dispH);

      // Geometry: tube occupies top, U rail + I-V strip at bottom.
      const pad = 12;
      const curveW = prm.showCurve ? Math.min(228, Math.max(150, dispW * 0.4)) : 0;
      const tubeH = dispH - 132;
      const tubeX = pad;
      const tubeY = 10;
      const tubeW = dispW - pad * 2;
      const cathX = tubeX + tubeW * 0.3;
      const anodX = tubeX + tubeW * 0.72;
      const topY = tubeY + 30;
      const botY = tubeY + tubeH - 46;

      // Tube frame.
      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 1;
      ctx.strokeRect(tubeX, tubeY, tubeW, tubeH);

      // Lamp (top-left) + beam to cathode.
      const lampX = tubeX + 44;
      const lampY = tubeY + 26;
      const beam = beamColor(prm.lambdaNm);
      ctx.strokeStyle = beam;
      ctx.lineWidth = 1.4;
      for (let k = -1; k <= 1; k++) {
        ctx.beginPath();
        const steps = 24;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          const bx = lampX + t * (cathX - lampX);
          const by = lampY + 18 + t * ((topY + botY) / 2 - lampY - 18) + k * 12 * t + Math.sin(t * 9 + p.phase + k) * 3 * t;
          if (s === 0) ctx.moveTo(bx, by);
          else ctx.lineTo(bx, by);
        }
        ctx.stroke();
      }
      // Lamp body.
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = COL_VECTOR;
      ctx.beginPath();
      ctx.arc(lampX, lampY, 11, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = beam;
      ctx.beginPath();
      ctx.arc(lampX, lampY, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = MUTED;
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText("hν", lampX - 8, lampY - 15);

      // Cathode plate + anode mesh.
      ctx.fillStyle = COL_VECTOR;
      ctx.fillRect(cathX - 3, topY, 6, botY - topY);
      ctx.fillStyle = MUTED;
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText(isDeRef.current ? "Kathode" : "阴极", cathX - 20, botY + 13);
      // Anode as vertical mesh.
      ctx.strokeStyle = COL_VECTOR;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(anodX, topY);
      ctx.lineTo(anodX, botY);
      ctx.stroke();
      ctx.lineWidth = 1;
      for (let gy = topY + 6; gy < botY; gy += 9) {
        ctx.beginPath();
        ctx.moveTo(anodX - 7, gy);
        ctx.lineTo(anodX + 7, gy);
        ctx.stroke();
      }
      ctx.fillStyle = MUTED;
      ctx.fillText(isDeRef.current ? "Anode" : "阳极", anodX - 14, botY + 13);

      // Retarding-field arrow between plates.
      const fieldDir = prm.voltage >= 0 ? 1 : -1;
      const midY = topY + 22;
      ctx.strokeStyle = COL_PHOTON;
      ctx.fillStyle = COL_PHOTON;
      ctx.lineWidth = 1.4;
      const ax0 = fieldDir === 1 ? cathX + 12 : anodX - 12;
      const ax1 = fieldDir === 1 ? anodX - 12 : cathX + 12;
      ctx.beginPath();
      ctx.moveTo(ax0, midY);
      ctx.lineTo(ax1, midY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(ax1, midY);
      ctx.lineTo(ax1 - fieldDir * 6, midY - 3.5);
      ctx.lineTo(ax1 - fieldDir * 6, midY + 3.5);
      ctx.closePath();
      ctx.fill();
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText("E (" + (prm.voltage >= 0 ? "-" : "+") + ")", (ax0 + ax1) / 2 - 16, midY - 6);

      // Photoelectrons: map normalized coords to plate gap.
      if (prm.showElectrons) {
        for (const el of p.electrons) {
          if (el.x < 0) {
            el.x = 0.02;
            el.y = Math.random() * 0.9 + 0.05;
          }
          const px = cathX + 6 + el.x * (anodX - cathX - 14);
          const py = topY + 8 + el.y * (botY - topY - 16);
          ctx.fillStyle = COL_EMIT;
          ctx.beginPath();
          ctx.arc(px, py, 2.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Threshold lamp (top-right inside tube).
      const lampOn = emits;
      const dotX = tubeX + tubeW - 88;
      const dotY = tubeY + 22;
      ctx.fillStyle = lampOn ? COL_EMIT : COL_STOP;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = INK;
      ctx.font = "11px ui-monospace, monospace";
      ctx.fillText(lampOn ? (isDeRef.current ? "ν > ν0 : Emission" : "ν > ν0 有发射") : (isDeRef.current ? "ν ≤ ν0 : kein Effekt" : "ν ≤ ν0 无发射"), dotX + 11, dotY + 4);

      // Meters row under tube.
      ctx.fillStyle = INK;
      ctx.font = "11px ui-monospace, monospace";
      const meterY = tubeY + tubeH + 20;
      ctx.fillStyle = COL_PHOTON;
      ctx.fillText("U = " + prm.voltage.toFixed(2) + " V", tubeX + 4, meterY);
      ctx.fillStyle = COL_EMIT;
      ctx.fillText("I = " + iPhoto.toFixed(2) + " µA", tubeX + 130, meterY);
      ctx.fillStyle = COL_STOP;
      ctx.fillText("U0 = " + u0.toFixed(2) + " V", tubeX + 256, meterY);

      // U rail (draggable knob).
      const railY = dispH - 76;
      const railX0 = tubeX + 4;
      const railX1 = dispW - pad - curveW - (prm.showCurve ? 12 : 4);
      railRef.current.x0 = railX0;
      railRef.current.x1 = Math.max(railX0 + 1, railX1);
      ctx.strokeStyle = HAIR;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(railX0, railY);
      ctx.lineTo(Math.max(railX0 + 1, railX1), railY);
      ctx.stroke();
      // U0 tick.
      if (emits && u0 <= U_MAX) {
        const tx = railX0 + ((u0 - U_MIN) / (U_MAX - U_MIN)) * (Math.max(railX0 + 1, railX1) - railX0);
        ctx.strokeStyle = COL_STOP;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(tx, railY - 9);
        ctx.lineTo(tx, railY + 9);
        ctx.stroke();
        ctx.fillStyle = COL_STOP;
        ctx.font = "9px ui-monospace, monospace";
        ctx.fillText("U0", tx - 6, railY + 21);
      }
      const kx = railX0 + ((prm.voltage - U_MIN) / (U_MAX - U_MIN)) * (Math.max(railX0 + 1, railX1) - railX0);
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = COL_PHOTON;
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.arc(kx, railY, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = COL_PHOTON;
      ctx.beginPath();
      ctx.arc(kx, railY, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = MUTED;
      ctx.font = "9px ui-monospace, monospace";
      ctx.fillText("-3 V", railX0, railY + 21);
      ctx.fillText("+3 V", Math.max(railX0 + 1, railX1) - 24, railY + 21);

      // I-V characteristic inset.
      if (prm.showCurve && curveW > 0) {
        const cx = dispW - pad - curveW;
        const cy = dispH - 118;
        const cw = curveW;
        const chh = 106;
        ctx.fillStyle = "#ffffff";
        ctx.strokeStyle = HAIR;
        ctx.lineWidth = 1;
        ctx.fillRect(cx, cy, cw, chh);
        ctx.strokeRect(cx, cy, cw, chh);
        const ax = cx + 26;
        const ay = cy + chh - 16;
        const aw = cw - 34;
        const ah = chh - 26;
        ctx.strokeStyle = COL_VECTOR;
        ctx.beginPath();
        ctx.moveTo(ax, cy + 6);
        ctx.lineTo(ax, ay);
        ctx.lineTo(ax + aw, ay);
        ctx.stroke();
        ctx.fillStyle = MUTED;
        ctx.font = "9px ui-monospace, monospace";
        ctx.fillText("I", ax - 12, cy + 12);
        ctx.fillText("U", ax + aw - 8, ay + 11);
        const uToX = (u: number) => ax + ((u - U_MIN) / (U_MAX - U_MIN)) * aw;
        const iToY = (i: number) => ay - (clamp(i, 0, I_SAT_MAX) / I_SAT_MAX) * ah;
        // U0 dashed marker.
        if (emits && u0 <= U_MAX) {
          ctx.strokeStyle = COL_STOP;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(uToX(Math.min(u0, U_MAX)), ay);
          ctx.lineTo(uToX(Math.min(u0, U_MAX)), iToY(0));
          ctx.stroke();
          ctx.setLineDash([]);
        }
        // Curve path.
        ctx.strokeStyle = COL_EMIT;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        for (let s = 0; s <= 60; s++) {
          const u = U_MIN + (s / 60) * (U_MAX - U_MIN);
          const ii = photoCurrent(iSat, u, u0, emits);
          const px = uToX(u);
          const py = iToY(ii);
          if (s === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.stroke();
        ctx.lineWidth = 1;
        // Operating point.
        ctx.fillStyle = COL_PHOTON;
        ctx.beginPath();
        ctx.arc(uToX(prm.voltage), iToY(iPhoto), 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const generateReport = useCallback((): string => {
    const r = readout;
    if (isDe) {
      return (
        "Photoeffekt-Labor Messprotokoll:\n" +
        "- Kathode: " + cathode.id + " (W_A = " + cathode.workFn.toFixed(2) + " eV)\n" +
        "- lambda = " + lambdaNm.toFixed(0) + " nm, nu = " + r.nu14.toFixed(2) + " x 1e14 Hz\n" +
        "- E_photon = " + r.eph.toFixed(3) + " eV, E_kin,max = " + r.ekin.toFixed(3) + " eV\n" +
        "- U_0 = " + r.u0.toFixed(3) + " V, U = " + voltage.toFixed(2) + " V\n" +
        "- I_photo = " + r.iPhoto.toFixed(2) + " µA bei Intensitaet " + intensity.toFixed(0) + " %\n" +
        (r.emits ? "- Befund: nu > nu_0, Emission findet statt." : "- Befund: nu <= nu_0, keine Emission (Schwelle nicht erreicht).")
      );
    }
    return (
      "光电效应实验记录：\n" +
      "- 阴极：" + cathode.id + "（逸出功 W_A = " + cathode.workFn.toFixed(2) + " eV）\n" +
      "- 波长 lambda = " + lambdaNm.toFixed(0) + " nm，频率 nu = " + r.nu14.toFixed(2) + " x 1e14 Hz\n" +
      "- 光子能量 E = " + r.eph.toFixed(3) + " eV，最大动能 E_kin = " + r.ekin.toFixed(3) + " eV\n" +
      "- 截止电压 U_0 = " + r.u0.toFixed(3) + " V，外加电压 U = " + voltage.toFixed(2) + " V\n" +
      "- 光电流 I = " + r.iPhoto.toFixed(2) + " µA（光强 " + intensity.toFixed(0) + " %）\n" +
      (r.emits ? "- 结论：nu > nu_0，有光电子发射。" : "- 结论：nu <= nu_0，未达阈值，无发射。")
    );
  }, [readout, cathode, lambdaNm, voltage, intensity, isDe]);

  const handleExport = useCallback(() => {
    if (onExportFinding) onExportFinding(generateReport());
  }, [onExportFinding, generateReport]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        {/* Stage */}
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif font-medium text-xs text-[var(--ink)]">
                  {isDe ? "Photoeffekt-Labor: hν, W_A und Gegenspannung" : "光电效应实验室：光频率、逸出功与截止电压"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)] tabular-nums">
                  λ={lambdaNm.toFixed(0)} nm | U={voltage.toFixed(2)} V
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
                  <IconPlayPause paused={playing} />
                  {playing ? (isDe ? "Pause" : "暂停") : (isDe ? "Start" : "开始")}
                </button>
                <button
                  type="button"
                  onClick={() => setSlowMo(!slowMo)}
                  className={`px-2.5 py-1 border border-[var(--line)] font-medium flex items-center gap-1.5 ${slowMo ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--paper-subtle)] text-[var(--ink)]"}`}
                >
                  <IconSlow />
                  0.3x
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] flex items-center gap-1.5"
                >
                  <IconReset />
                  Reset
                </button>
              </div>
              <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--ink)] tabular-nums">
                <span>E_kin = <strong className="text-[#065f46]">{readout.ekin.toFixed(2)}</strong> eV</span>
                <span>U0 = <strong className="text-[#9f1239]">{readout.u0.toFixed(2)}</strong> V</span>
                <span>I = <strong className="text-[#1e40af]">{readout.iPhoto.toFixed(2)}</strong> µA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Control panel */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Kathode & Lichtquelle" : "阴极与光源调控"}
              </div>
              <div className="grid grid-cols-3 gap-1.5 mb-3 font-mono text-[11px]">
                {CATHODES.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCathodeId(c.id)}
                    className={`py-1 border border-[var(--line)] ${cathodeId === c.id ? "bg-[var(--ink)] text-[var(--paper)]" : "bg-[var(--paper-subtle)] text-[var(--ink)]"}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink)]">{isDe ? "Wellenlänge (λ)" : "波长 (λ)"}</span>
                  <span className="font-medium text-[#1e40af] tabular-nums">{lambdaNm.toFixed(0)} nm</span>
                </div>
                <input
                  type="range"
                  min={LAM_MIN}
                  max={LAM_MAX}
                  step="5"
                  value={lambdaNm}
                  onChange={(e) => setLambdaNm(Number(e.target.value))}
                  className="w-full accent-[#1e40af]"
                  aria-label="wavelength"
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)] tabular-nums">
                  <span>ν = {readout.nu14.toFixed(2)}×10¹⁴ Hz</span>
                  <span>E_ph = {readout.eph.toFixed(2)} eV</span>
                </div>
              </div>
              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-[var(--ink)]">{isDe ? "Intensität (I)" : "光强 (I)"}</span>
                  <span className="font-medium text-[#065f46] tabular-nums">{intensity.toFixed(0)} %</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={intensity}
                  onChange={(e) => setIntensity(Number(e.target.value))}
                  className="w-full accent-[#065f46]"
                  aria-label="intensity"
                />
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isDe ? "Gegenspannung (U)" : "反向电压 (U)"}
              </div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-[var(--ink)]">U</span>
                <span className="font-medium text-[#1e40af] tabular-nums">{voltage.toFixed(2)} V</span>
              </div>
              <input
                type="range"
                min={U_MIN}
                max={U_MAX}
                step="0.05"
                value={voltage}
                onChange={(e) => setVoltage(Number(e.target.value))}
                className="w-full accent-[#1e40af]"
                aria-label="voltage"
              />
              <p className="font-mono text-[10px] text-[var(--ink-muted)] leading-relaxed mt-1">
                {isDe
                  ? "Tipp: Knopf auf der U-Schiene im Bild ziehen. Bei U = U0 verschwindet I."
                  : "提示：可直接拖拽画布 U 轨道旋钮；当 U = U0 时光电流归零。"}
              </p>
              <div className="font-mono text-[11px] text-[var(--ink)] tabular-nums space-y-1.5 mt-2">
                <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                  <span>ν0 = W_A/h</span>
                  <strong className="text-[#9f1239]">{((cathode.workFn / H_EV_S) / 1e14).toFixed(2)}×10¹⁴ Hz</strong>
                </div>
                <div className="flex justify-between">
                  <span>U0 = E_kin/e</span>
                  <strong className="text-[#9f1239]">{readout.u0.toFixed(2)} V</strong>
                </div>
                <label className="flex items-center gap-2 cursor-pointer pt-1">
                  <input type="checkbox" checked={showCurve} onChange={(e) => setShowCurve(e.target.checked)} className="accent-[var(--ink)]" />
                  <span>{isDe ? "I-U-Kennlinie einblenden" : "显示 I-U 特性曲线"}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={showElectrons} onChange={(e) => setShowElectrons(e.target.checked)} className="accent-[var(--ink)]" />
                  <span>{isDe ? "Photoelektronen einblenden" : "显示光电子流"}</span>
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
            {isDe ? "Einsteins Photoeffekt-Gleichung" : "爱因斯坦光电方程"}
          </div>
          <div className="font-mono text-xs text-[var(--ink)] mb-1.5">
            <MathHtml code="E_{kin,max} = h\nu - W_A" display={false} cacheKey="photoelectric:einstein" />
          </div>
          <div className="font-mono text-xs text-[var(--ink)] mb-1.5">
            <MathHtml code="e\,U_0 = E_{kin,max}, \quad \nu_0 = W_A / h" display={false} cacheKey="photoelectric:u0" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "Nur Photonen mit ν > ν0 lösen Elektronen aus. U0 misst E_kin direkt; die Intensität steuert nur die Stromstärke, nicht U0."
              : "仅当 ν > ν0 才有电子逸出；截止电压 U0 直接量出最大动能；光强只改变电流大小，不改变 U0。"}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Quantenphysik: Photonenmodell" : "量子物理：光子模型 (EF/Q1)"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">beschreiben</code>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">bestimmen</code>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">begründen</code>
            <p className="mt-1">
              {isDe
                ? "Aufgabe: Bestimme U0 aus der I-U-Kennlinie und berechne h bzw. W_A. Begründe, warum I mit der Intensität wächst, U0 aber nicht."
                : "典型考题：从 I-U 曲线读出 U0，求 h 或逸出功；论证电流随光强增大而 U0 不变（波粒二象证据）。"}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isDe ? "Schwellen-Trick" : "门票速记法"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isDe
              ? "W_A ist der Eintrittspreis, hν das Geld in der Tasche. Reicht es nicht (ν ≤ ν0), bleibst du draussen — egal, wie viele Freunde (Intensität) du mitbringst. Der Restbetrag ist E_kin, in Volt gemessen also U0."
              : "把逸出功记成门票钱、光子能量记成零花钱：钱不够（ν ≤ ν0）带再多朋友（光强）也进不了门；找回的零钱就是动能，换算成电压即 U0。"}
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
                : "把当前测量值一键发给 AI 助教做深入分析。"}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <IconExport />
            {isDe ? "An Tutor senden" : "发送给助教"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PhotoelectricSim;
