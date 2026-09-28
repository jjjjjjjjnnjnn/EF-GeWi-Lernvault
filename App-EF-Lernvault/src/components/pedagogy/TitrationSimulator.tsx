import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface TitrationSimulatorProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type AcidKind = "strong" | "weak";
type Indicator = "phenol" | "methyl";

interface Readout {
  ph: number;
  vol: number;
  vTotal: number;
}

interface PhysState {
  disp: number;
  dropT: number;
  frame: number;
  dragging: boolean;
  dragMode: "knob" | "plot" | null;
  dragStartY: number;
  dragStartVol: number;
}

interface HitGeom {
  knobX: number;
  knobY: number;
  knobR: number;
  plotX: number;
  plotY: number;
  plotW: number;
  plotH: number;
}

const C_ACID = 0.1;
const V0_ML = 20;
const C_BASE = 0.1;
const V_MAX = 40;
const V_EQ = (C_ACID * V0_ML) / C_BASE;
const V_HALF = V_EQ / 2;
const N0_MMOL = C_ACID * V0_ML;
const KA_ACETIC = 1.8e-5;
const PKA_ACETIC = -Math.log10(KA_ACETIC);
const SLOW_FACTOR = 0.3;
const FLOW_FAST = 9;
const EQ_TOL = 0.15;

function clampPh(ph: number): number {
  if (!Number.isFinite(ph)) return 7;
  return Math.min(13.8, Math.max(1.0, ph));
}

/** Simplified pH model: pH = -lg[H+], strong acid vs. weak acid (acetic) with buffer + hydrolysis. */
export function phOf(vbMl: number, acid: AcidKind): number {
  const vb = Math.min(V_MAX, Math.max(0, vbMl));
  const nOH = vb * C_BASE;
  const vTot = V0_ML + vb;
  if (acid === "strong") {
    if (Math.abs(nOH - N0_MMOL) < 1e-9) return 7;
    if (nOH < N0_MMOL) return clampPh(-Math.log10((N0_MMOL - nOH) / vTot));
    return clampPh(14 + Math.log10((nOH - N0_MMOL) / vTot));
  }
  if (Math.abs(vb - V_EQ) < 1e-9) {
    const cSalt = N0_MMOL / vTot;
    const cOH = Math.sqrt((1e-14 / KA_ACETIC) * cSalt);
    return clampPh(14 + Math.log10(cOH));
  }
  if (nOH < N0_MMOL) {
    if (nOH < 1e-9) {
      const cH = Math.sqrt(KA_ACETIC * C_ACID);
      return clampPh(-Math.log10(cH));
    }
    const ratio = nOH / (N0_MMOL - nOH);
    return clampPh(PKA_ACETIC + Math.log10(ratio));
  }
  return clampPh(14 + Math.log10((nOH - N0_MMOL) / vTot));
}

function cssVar(name: string, fallback: string): string {
  try {
    const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  } catch {
    return fallback;
  }
}

export function TitrationSimulator({ lang, studioMode: _studioMode = true, onExportFinding }: TitrationSimulatorProps) {
  void _studioMode;
  const isZh = lang === "zh";

  const [volAdded, setVolAdded] = useState<number>(0);
  const [acidKind, setAcidKind] = useState<AcidKind>("strong");
  const [indicator, setIndicator] = useState<Indicator>("phenol");
  const [paused, setPaused] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [autoDrip, setAutoDrip] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [readout, setReadout] = useState<Readout>({ ph: phOf(0, "strong"), vol: 0, vTotal: V0_ML });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const physRef = useRef<PhysState>({ disp: 0, dropT: 0, frame: 0, dragging: false, dragMode: null, dragStartY: 0, dragStartVol: 0 });
  const targetRef = useRef<number>(0);
  const paramRef = useRef<{ acid: AcidKind; indicator: Indicator }>({ acid: "strong", indicator: "phenol" });
  const ctlRef = useRef<{ paused: boolean; slow: boolean; auto: boolean }>({ paused: false, slow: false, auto: false });
  const geomRef = useRef<HitGeom>({ knobX: 0, knobY: 0, knobR: 12, plotX: 0, plotY: 0, plotW: 1, plotH: 1 });
  const themeRef = useRef({ ink: "#18181B", muted: "#71717A", line: "#E4E4E7", paper: "#FAFAFA" });

  useEffect(() => {
    targetRef.current = volAdded;
  }, [volAdded]);

  useEffect(() => {
    paramRef.current.acid = acidKind;
    paramRef.current.indicator = indicator;
  }, [acidKind, indicator]);

  useEffect(() => {
    ctlRef.current.paused = paused;
    ctlRef.current.slow = slowMo;
    ctlRef.current.auto = autoDrip;
  }, [paused, slowMo, autoDrip]);

  const curve = useMemo(() => {
    const pts: Array<{ v: number; ph: number }> = [];
    for (let v = 0; v <= V_MAX + 1e-9; v += 0.25) pts.push({ v, ph: phOf(v, acidKind) });
    return pts;
  }, [acidKind]);

  const handleReset = useCallback(() => {
    const p = physRef.current;
    p.disp = 0;
    p.dropT = 0;
    targetRef.current = 0;
    setVolAdded(0);
    setAutoDrip(false);
  }, []);

  const setTarget = useCallback((v: number) => {
    const c = Math.min(V_MAX, Math.max(0, Math.round(v * 10) / 10));
    targetRef.current = c;
    setVolAdded(c);
  }, []);

  const regimeOf = useCallback(
    (v: number): { de: string; zh: string } => {
      if (Math.abs(v - V_EQ) <= EQ_TOL)
        return acidKind === "weak"
          ? { de: "Aequivalenzpunkt (basisch, Acetat-Hydrolyse)", zh: "等当点(偏碱, 醋酸根水解)" }
          : { de: "Aequivalenzpunkt (neutral, pH 7)", zh: "等当点(中性, pH 7)" };
      if (acidKind === "weak" && Math.abs(v - V_HALF) <= EQ_TOL)
        return { de: "Halbaequivalenzpunkt (pH = pKa)", zh: "半中和点(pH = pKa)" };
      if (v < V_EQ)
        return acidKind === "weak" && v > 0.5
          ? { de: "Pufferzone (HAc / Ac-)", zh: "缓冲平台区(HAc / Ac-)" }
          : { de: "Saurer Bereich (H3O+ Ueberschuss)", zh: "酸性区(H3O+ 过量)" };
      return { de: "Alkalischer Bereich (OH- Ueberschuss)", zh: "碱性区(OH- 过量)" };
    },
    [acidKind]
  );

  const indicatorColor = useCallback(
    (ph: number): { fill: string; edge: string; de: string; zh: string } => {
      if (indicator === "phenol") {
        if (ph < 8.2) return { fill: "#F4F4F5", edge: "#A1A1AA", de: "Farblos (pH < 8,2)", zh: "无色(pH < 8.2)" };
        return { fill: "#F9A8D4", edge: "#9D174D", de: "Pink (pH > 8,2)", zh: "粉红(pH > 8.2)" };
      }
      if (ph < 3.1) return { fill: "#FECDD3", edge: "#9F1239", de: "Rot (pH < 3,1)", zh: "红色(pH < 3.1)" };
      if (ph <= 4.4) return { fill: "#FED7AA", edge: "#92400E", de: "Orange (pH 3,1-4,4)", zh: "橙色(pH 3.1-4.4)" };
      return { fill: "#FEF08A", edge: "#854D0E", de: "Gelb (pH > 4,4)", zh: "黄色(pH > 4.4)" };
    },
    [indicator]
  );

  const generateReport = useCallback((): string => {
    const p = physRef.current;
    const acid = paramRef.current.acid;
    const ind = paramRef.current.indicator;
    const ph = phOf(p.disp, acid);
    const reg = acid === "weak" && Math.abs(p.disp - V_HALF) <= EQ_TOL ? "Halbaequivalenzpunkt" : Math.abs(p.disp - V_EQ) <= EQ_TOL ? "Aequivalenzpunkt" : p.disp < V_EQ ? "sauer/Puffer" : "alkalisch";
    return isZh
      ? `酸碱滴定记录: ${acid === "strong" ? "强酸HCl" : "弱酸HAc"} 20mL 0.1M + NaOH 0.1M; 已加碱 ${p.disp.toFixed(1)}mL, 总体积 ${(V0_ML + p.disp).toFixed(1)}mL, pH=${ph.toFixed(2)}, 状态=${reg}, 指示剂=${ind === "phenol" ? "酚酞" : "甲基橙"}。`
      : `Titration: ${acid === "strong" ? "starke Saeure HCl" : "schwache Saeure HAc"} 20 mL 0,1 M + NaOH 0,1 M; V(NaOH)=${p.disp.toFixed(1)} mL, V(tot)=${(V0_ML + p.disp).toFixed(1)} mL, pH=${ph.toFixed(2)}, Bereich=${reg}, Indikator=${ind === "phenol" ? "Phenolphthalein" : "Methylorange"}.`;
  }, [isZh]);

  const handleExport = useCallback(() => {
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
  }, [generateReport, onExportFinding]);

  /* Pointer interaction: burette stopcock drag + curve scrub, with pointer capture. */
  const volFromPlotX = (clientX: number, canvas: HTMLCanvasElement): number => {
    const rect = canvas.getBoundingClientRect();
    const g = geomRef.current;
    const x = clientX - rect.left;
    const frac = (x - g.plotX) / Math.max(1, g.plotW);
    return Math.min(V_MAX, Math.max(0, frac * V_MAX));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = e.currentTarget;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const g = geomRef.current;
    const p = physRef.current;
    const dKnob = Math.hypot(x - g.knobX, y - g.knobY);
    if (dKnob <= g.knobR + 6) {
      p.dragging = true;
      p.dragMode = "knob";
      p.dragStartY = e.clientY;
      p.dragStartVol = targetRef.current;
    } else if (x >= g.plotX && x <= g.plotX + g.plotW && y >= g.plotY && y <= g.plotY + g.plotH) {
      p.dragging = true;
      p.dragMode = "plot";
      setAutoDrip(false);
      setTarget(volFromPlotX(e.clientX, canvas));
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = physRef.current;
    if (!p.dragging) return;
    if (p.dragMode === "knob") {
      const dy = e.clientY - p.dragStartY;
      setTarget(p.dragStartVol + dy * 0.2);
    } else if (p.dragMode === "plot") {
      setTarget(volFromPlotX(e.clientX, e.currentTarget));
    }
  };

  const endDrag = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const p = physRef.current;
    p.dragging = false;
    p.dragMode = null;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  /* Decoupled 60fps rAF loop: physics in refs, React sync throttled to every 6th frame. */
  useEffect(() => {
    let animId = 0;
    let lastTs = -1;

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (lastTs < 0) lastTs = now;
      const rawDt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const ctl = ctlRef.current;
      const par = paramRef.current;
      const dt = ctl.slow ? rawDt * SLOW_FACTOR : rawDt;
      const p = physRef.current;

      if (!ctl.paused) {
        if (ctl.auto && targetRef.current < V_MAX) {
          targetRef.current = Math.min(V_MAX, targetRef.current + (ctl.slow ? FLOW_FAST * SLOW_FACTOR : FLOW_FAST) * rawDt);
        }
        const diff = targetRef.current - p.disp;
        if (Math.abs(diff) > 0.0005) {
          const step = (ctl.slow ? FLOW_FAST * SLOW_FACTOR : FLOW_FAST) * rawDt;
          p.disp += Math.abs(diff) < step ? diff : Math.sign(diff) * step;
          p.dropT += dt;
        } else {
          p.disp = targetRef.current;
        }
      }

      p.frame += 1;
      if (p.frame % 30 === 0) {
        themeRef.current = {
          ink: cssVar("--ink", "#18181B"),
          muted: cssVar("--ink-muted", "#71717A"),
          line: cssVar("--line", "#E4E4E7"),
          paper: cssVar("--paper", "#FAFAFA"),
        };
      }
      if (p.frame % 6 === 0) {
        const ph = phOf(p.disp, par.acid);
        setReadout({ ph, vol: p.disp, vTotal: V0_ML + p.disp });
        if (ctl.auto && !ctl.paused) {
          setVolAdded(Math.round(targetRef.current * 10) / 10);
          if (targetRef.current >= V_MAX) setAutoDrip(false);
        }
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
      ctx.clearRect(0, 0, dispW, dispH);

      const T = themeRef.current;
      const acid = par.acid;
      const disp = p.disp;
      const ph = phOf(disp, acid);
      const g = geomRef.current;

      /* Layout: left apparatus col, right titration curve. */
      const pad = 10;
      const leftW = Math.min(250, Math.max(150, dispW * 0.34));
      const plotX = leftW + pad * 2;
      const plotY = 30;
      const plotW = Math.max(80, dispW - plotX - pad);
      const plotH = dispH - plotY - 34;
      g.plotX = plotX;
      g.plotY = plotY;
      g.plotW = plotW;
      g.plotH = plotH;

      const xOf = (v: number) => plotX + (v / V_MAX) * plotW;
      const yOf = (q: number) => plotY + (1 - q / 14) * plotH;

      /* ---- Left: burette + flask ---- */
      const tubeW = 34;
      const tubeX = pad + 22;
      const tubeTop = 26;
      const tubeH = Math.min(dispH * 0.5, 220);
      const tubeBot = tubeTop + tubeH;
      const remaining = V_MAX - disp;
      const lvlY = tubeTop + 6 + (1 - remaining / V_MAX) * (tubeH - 12);

      ctx.fillStyle = "rgba(30,64,175,0.10)";
      ctx.fillRect(tubeX, lvlY, tubeW, tubeBot - 6 - lvlY);
      ctx.strokeStyle = T.muted;
      ctx.lineWidth = 1;
      ctx.strokeRect(tubeX, tubeTop, tubeW, tubeH - 6);
      ctx.fillStyle = T.muted;
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      for (let m = 0; m <= V_MAX; m += 5) {
        const yy = tubeTop + 6 + (m / V_MAX) * (tubeH - 12);
        ctx.beginPath();
        ctx.moveTo(tubeX + tubeW, yy);
        ctx.lineTo(tubeX + tubeW - (m % 10 === 0 ? 9 : 5), yy);
        ctx.stroke();
        if (m % 10 === 0) ctx.fillText(String(m), tubeX + tubeW + 3, yy + 3);
      }
      ctx.fillStyle = T.ink;
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText(isZh ? "滴定管 NaOH" : "Buerette NaOH", pad + 4, 14);
      ctx.fillStyle = T.muted;
      ctx.font = "9px ui-monospace, monospace";
      ctx.fillText("0,1 M", pad + 4, tubeBot + 2);

      /* Stopcock knob (draggable). */
      const knobX = tubeX + tubeW / 2;
      const knobY = tubeBot + 16;
      g.knobX = knobX;
      g.knobY = knobY;
      g.knobR = 12;
      ctx.beginPath();
      ctx.moveTo(knobX, tubeBot - 4);
      ctx.lineTo(knobX, knobY + 12);
      ctx.strokeStyle = T.muted;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(knobX - 5, knobY + 12);
      ctx.lineTo(knobX + 5, knobY + 12);
      ctx.lineTo(knobX, knobY + 20);
      ctx.closePath();
      ctx.fillStyle = "rgba(30,64,175,0.25)";
      ctx.fill();
      ctx.beginPath();
      ctx.arc(knobX, knobY, 9, 0, Math.PI * 2);
      ctx.fillStyle = T.paper;
      ctx.fill();
      ctx.strokeStyle = p.dragging && p.dragMode === "knob" ? "#9F1239" : T.ink;
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(knobX - 5, knobY);
      ctx.lineTo(knobX + 5, knobY);
      ctx.stroke();

      /* Falling drops while pouring. */
      const pouring = Math.abs(targetRef.current - disp) > 0.005 || (ctl.auto && targetRef.current < V_MAX && !ctl.paused);
      const flaskTopY = tubeBot + 62;
      if (pouring && !ctl.paused) {
        const span = flaskTopY - knobY - 22;
        const t = (p.dropT * 2.2) % 1;
        const dy = knobY + 22 + t * span;
        ctx.beginPath();
        ctx.arc(knobX, dy, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = "#1E40AF";
        ctx.fill();
      }

      /* Erlenmeyer flask with indicator colour. */
      const flaskH = 104;
      const flaskTopW = 92;
      const flaskBotW = 62;
      const fx = tubeX + tubeW / 2;
      const fy = flaskTopY;
      const liq = indicatorColor(ph);
      const vTot = V0_ML + disp;
      const fillFrac = Math.min(0.92, vTot / 65);
      const fillTop = fy + flaskH * (1 - fillFrac);
      ctx.beginPath();
      ctx.moveTo(fx - flaskTopW / 2, fy);
      ctx.lineTo(fx + flaskTopW / 2, fy);
      ctx.lineTo(fx + flaskBotW / 2, fy + flaskH);
      ctx.lineTo(fx - flaskBotW / 2, fy + flaskH);
      ctx.closePath();
      ctx.fillStyle = T.paper;
      ctx.fill();
      ctx.save();
      ctx.clip();
      ctx.fillStyle = liq.fill;
      ctx.fillRect(fx - flaskTopW / 2, fillTop, flaskTopW, fy + flaskH - fillTop);
      ctx.strokeStyle = liq.edge;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(fx - flaskTopW / 2, fillTop);
      ctx.lineTo(fx + flaskTopW / 2, fillTop);
      ctx.stroke();
      ctx.restore();
      ctx.beginPath();
      ctx.moveTo(fx - flaskTopW / 2, fy);
      ctx.lineTo(fx + flaskTopW / 2, fy);
      ctx.lineTo(fx + flaskBotW / 2, fy + flaskH);
      ctx.lineTo(fx - flaskBotW / 2, fy + flaskH);
      ctx.closePath();
      ctx.strokeStyle = T.ink;
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.textAlign = "center";
      ctx.fillStyle = T.ink;
      ctx.font = "600 13px ui-monospace, monospace";
      ctx.fillText(`pH ${ph.toFixed(2)}`, fx, fy + flaskH + 18);
      ctx.fillStyle = T.muted;
      ctx.font = "9px ui-monospace, monospace";
      ctx.fillText(`V = ${vTot.toFixed(1)} mL`, fx, fy + flaskH + 31);

      /* ---- Right: pH-V titration curve ---- */
      ctx.strokeStyle = T.line;
      ctx.lineWidth = 1;
      ctx.fillStyle = T.muted;
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      for (let v = 0; v <= V_MAX; v += 5) {
        const xx = xOf(v);
        ctx.beginPath();
        ctx.moveTo(xx, plotY);
        ctx.lineTo(xx, plotY + plotH);
        ctx.stroke();
        ctx.fillText(String(v), xx, plotY + plotH + 12);
      }
      ctx.textAlign = "right";
      for (let q = 0; q <= 14; q += 2) {
        const yy = yOf(q);
        ctx.beginPath();
        ctx.moveTo(plotX, yy);
        ctx.lineTo(plotX + plotW, yy);
        ctx.stroke();
        ctx.fillText(String(q), plotX - 4, yy + 3);
      }
      ctx.textAlign = "left";
      ctx.fillStyle = T.muted;
      ctx.fillText("pH", plotX - 2, plotY - 8);
      ctx.textAlign = "right";
      ctx.fillText(isZh ? "V(NaOH) / mL" : "V(NaOH) / mL", plotX + plotW, plotY + plotH + 24);

      /* Buffer zone tint (weak acid). */
      if (acid === "weak") {
        ctx.fillStyle = "rgba(6,95,70,0.07)";
        ctx.fillRect(xOf(1), plotY, xOf(V_EQ - 1) - xOf(1), plotH);
        ctx.strokeStyle = "#065F46";
        ctx.setLineDash([4, 3]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(xOf(V_HALF), plotY);
        ctx.lineTo(xOf(V_HALF), plotY + plotH);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#065F46";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText(isZh ? "缓冲" : "Puffer", xOf(2), plotY + 11);
        ctx.beginPath();
        ctx.arc(xOf(V_HALF), yOf(PKA_ACETIC), 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#065F46";
        ctx.fill();
        ctx.fillText(`1/2-AP pH${PKA_ACETIC.toFixed(2)}`, xOf(V_HALF) + 6, yOf(PKA_ACETIC) - 5);
      }

      /* Equivalence jump highlight band + line. */
      ctx.fillStyle = "rgba(159,18,57,0.08)";
      ctx.fillRect(xOf(V_EQ - 1), plotY, xOf(V_EQ + 1) - xOf(V_EQ - 1), plotH);
      ctx.strokeStyle = "#9F1239";
      ctx.setLineDash([5, 3]);
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(xOf(V_EQ), plotY);
      ctx.lineTo(xOf(V_EQ), plotY + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#9F1239";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(isZh ? "等当点" : "Aequivalenzpunkt", xOf(V_EQ) + 4, plotY + 11);

      /* Curve polyline. */
      ctx.beginPath();
      curve.forEach((pt, i) => {
        const xx = xOf(pt.v);
        const yy = yOf(pt.ph);
        if (i === 0) ctx.moveTo(xx, yy);
        else ctx.lineTo(xx, yy);
      });
      ctx.strokeStyle = "#1E40AF";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      /* Current point + crosshair. */
      const cx = xOf(Math.min(V_MAX, Math.max(0, disp)));
      const cy = yOf(ph);
      ctx.strokeStyle = T.muted;
      ctx.setLineDash([3, 3]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx, plotY + plotH);
      ctx.stroke();
      ctx.setLineDash([]);
      const nearEq = Math.abs(disp - V_EQ) <= 0.6;
      ctx.beginPath();
      ctx.arc(cx, cy, nearEq ? 5 : 4, 0, Math.PI * 2);
      ctx.fillStyle = nearEq ? "#9F1239" : "#1E40AF";
      ctx.fill();
      ctx.strokeStyle = T.paper;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      ctx.fillStyle = nearEq ? "#9F1239" : T.ink;
      ctx.font = "600 10px ui-monospace, monospace";
      ctx.textAlign = cx > plotX + plotW - 70 ? "right" : "left";
      ctx.fillText(`pH ${ph.toFixed(2)}`, cx + (cx > plotX + plotW - 70 ? -8 : 8), Math.max(plotY + 10, cy - 8));

      /* Frame. */
      ctx.strokeStyle = T.ink;
      ctx.lineWidth = 1;
      ctx.strokeRect(plotX, plotY, plotW, plotH);

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [curve, isZh, setTarget, indicatorColor]);

  const reg = regimeOf(readout.vol);
  const liqNow = indicatorColor(readout.ph);
  const nearEq = Math.abs(readout.vol - V_EQ) <= 0.6;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "酸碱滴定与 pH-V 曲线" : "Saeure-Base-Titration und pH-Kurve"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--ink-muted)] whitespace-nowrap">
                  V={readout.vol.toFixed(1)}mL pH={readout.ph.toFixed(2)}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowPanels(!showPanels)}
                className="shrink-0 px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                title={showPanels ? (isZh ? "折叠侧栏" : "Seitenleiste einklappen") : (isZh ? "展开侧栏" : "Seitenleiste ausklappen")}
              >
                {showPanels ? (isZh ? "◧ 折叠侧栏" : "◧ Seitenleiste") : (isZh ? "◩ 展开侧栏" : "◩ Seitenleiste")}
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
                  0.3x
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M13.2 8 A5.2 5.2 0 1 1 8 2.8" />
                    <path d="M8 1.4 V4.2 H10.8" />
                  </svg>
                  {isZh ? "重置" : "Reset"}
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>
                  pH=<strong className={nearEq ? "text-[#9f1239]" : "text-[#1e40af]"}>{readout.ph.toFixed(2)}</strong>
                </span>
                <span>
                  V=<strong>{readout.vol.toFixed(1)}</strong> mL
                </span>
                <span className="text-[var(--ink-muted)]">{isZh ? reg.zh : reg.de}</span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "滴定参数调控" : "Titrationsparameter"}
              </div>

              <div className="mb-3">
                <div className="text-xs font-mono mb-1.5 text-[var(--ink)]">{isZh ? "底液酸 (20 mL, 0.1 M)" : "Vorlage-Saeure (20 mL, 0,1 M)"}</div>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAcidKind("strong")}
                    className={`py-1 border ${acidKind === "strong" ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                  >
                    {isZh ? "强酸 HCl" : "Stark HCl"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAcidKind("weak")}
                    className={`py-1 border ${acidKind === "weak" ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                  >
                    {isZh ? "弱酸 HAc" : "Schwach HAc"}
                  </button>
                </div>
                <p className="mt-1 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                  {acidKind === "strong"
                    ? isZh
                      ? "强酸起点 pH=1.00, 等当点 pH=7。"
                      : "Starke Saeure: Start-pH 1,00, Aequivalenz bei pH 7."
                    : isZh
                      ? `弱酸起点 pH≈2.87, 半中和点 pH=pKa=${PKA_ACETIC.toFixed(2)}, 等当点 pH≈8.7。`
                      : `Schwache Saeure: Start-pH ca. 2,87, Halb-AP pH=pKa=${PKA_ACETIC.toFixed(2)}, Aequivalenz ca. 8,7.`}
                </p>
              </div>

              <div className="mb-3">
                <div className="text-xs font-mono mb-1.5 text-[var(--ink)]">{isZh ? "指示剂" : "Indikator"}</div>
                <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setIndicator("phenol")}
                    className={`py-1 border ${indicator === "phenol" ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                  >
                    {isZh ? "酚酞 8.2" : "Phenolphth. 8,2"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIndicator("methyl")}
                    className={`py-1 border ${indicator === "methyl" ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                  >
                    {isZh ? "甲基橙 3.1-4.4" : "Methylor. 3,1-4,4"}
                  </button>
                </div>
                <p className="mt-1 font-mono tabular-nums text-[11px] text-[var(--ink-muted)]">
                  {isZh ? `当前: ${liqNow.zh}` : `Aktuell: ${liqNow.de}`}
                </p>
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "已加 NaOH 体积" : "V(NaOH) zugegeben"}</span>
                  <span className="font-medium text-[#1e40af]">{volAdded.toFixed(1)} mL</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={V_MAX}
                  step="0.1"
                  value={volAdded}
                  onChange={(e) => {
                    setAutoDrip(false);
                    setTarget(Number(e.target.value));
                  }}
                  className="w-full accent-[#1e40af]"
                  aria-label={isZh ? "已加碱体积" : "Zugegebenes NaOH-Volumen"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                  <span>0 mL</span>
                  <span>40 mL</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 mt-1.5 font-mono tabular-nums text-[11px]">
                  <button type="button" onClick={() => { setAutoDrip(false); setTarget(0); }} className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">0</button>
                  <button type="button" onClick={() => { setAutoDrip(false); setTarget(acidKind === "weak" ? V_HALF : 10); }} className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">{acidKind === "weak" ? "1/2" : "10"}</button>
                  <button type="button" onClick={() => { setAutoDrip(false); setTarget(V_EQ); }} className={`py-1 border ${Math.abs(volAdded - V_EQ) < 0.05 ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}>AP</button>
                  <button type="button" onClick={() => { setAutoDrip(false); setTarget(V_MAX); }} className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">40</button>
                </div>
                <div className="flex gap-1.5 mt-1.5 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setAutoDrip(!autoDrip)}
                    aria-pressed={autoDrip}
                    className={`flex-1 py-1 border ${autoDrip ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]" : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"}`}
                  >
                    {autoDrip ? (isZh ? "停滴" : "Stopp") : (isZh ? "连续滴加" : "Auto-Tropf")}
                  </button>
                  <button type="button" onClick={() => { setAutoDrip(false); setTarget(volAdded - 0.5); }} className="px-2 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">-0.5</button>
                  <button type="button" onClick={() => { setAutoDrip(false); setTarget(volAdded + 0.5); }} className="px-2 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)]">+0.5</button>
                </div>
              </div>

              <div className="border-t border-[var(--line)] pt-2 font-mono tabular-nums text-[11px] text-[var(--ink)] space-y-1">
                <div className="flex justify-between">
                  <span>pH</span>
                  <span className={nearEq ? "text-[#9f1239]" : "text-[#1e40af]"}>{readout.ph.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "总体积" : "V(tot)"}</span>
                  <span>{readout.vTotal.toFixed(1)} mL</span>
                </div>
                <div className="flex justify-between">
                  <span>{isZh ? "状态" : "Bereich"}</span>
                  <span className="text-right">{isZh ? reg.zh : reg.de}</span>
                </div>
                {acidKind === "weak" && (
                  <div className="flex justify-between">
                    <span>pKa</span>
                    <span className="text-[#065f46]">{PKA_ACETIC.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">
                {isZh ? "操作说明" : "Hinweis Bedienung"}
              </div>
              <p className="text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {isZh
                  ? "拖动滴定管旋钮(纵向)或在右侧曲线上点选, 均可设定加碱体积; 滑杆步长 0.1 mL, 便于捕捉等当点突跃。"
                  : "Hahn am Buettenrohr vertikal ziehen oder direkt in die Kurve klicken, um V(NaOH) zu setzen. Schieber-Schritt 0,1 mL fuer den Aequivalenzsprung."}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel und Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "pH 定义与缓冲公式" : "pH-Definition und Puffer"}</div>
          <div className="mb-1.5">
            <MathHtml code="\mathrm{pH} = -\lg\,[\mathrm{H}^+]" display cacheKey="titration:ph-def" />
            <MathHtml code="\mathrm{pH} = \mathrm{p}K_a + \lg\frac{[\mathrm{A}^-]}{[\mathrm{HA}]}" display cacheKey="titration:henderson" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "强酸按剩余 H+ 除以总体积取负对数; 弱酸滴定前用缓冲公式, 等当点按醋酸根水解计算, 过量后与强酸同式。"
              : "Starke Saeure: Rest-H+ durch Gesamtvolumen, negativer Logarithmus. Schwache Saeure: Pufferformel, am Aequivalenzpunkt Acetat-Hydrolyse."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "中和滴定与指示剂选择" : "Neutralisation und Indikatorwahl"}</div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen, begruenden, auswaehlen</code>
            <p className="mt-1">
              {isZh
                ? "典型任务: 画出滴定曲线并标出突跃, 论证弱酸等当点偏碱, 为强酸/弱酸分别选择酚酞与甲基橙。"
                : "Aufgabe: Kurve skizzieren, Sprung markieren, basischen Aequivalenzpunkt der schwachen Saeure begruenden, Indikator gezielt auswaehlen."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "悬崖口诀: 缓冲平、等当陡" : "Klippen-Regel: Puffer flach, Sprung steil"}</div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "弱酸曲线像走平路再跳崖: 缓冲区 pH 几乎不动, 半中和点 pH 等于 pKa, 等当点一两滴就从酸跳到碱。"
              : "Schwache Saeure: erst flacher Pufferweg, am Halbpunkt gilt pH=pKa, dann ein Tropfen ueber die Klippe vom Sauren ins Basische."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">{isZh ? "导出测量结论" : "Befunde exportieren"}</div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh ? "把当前酸种、指示剂、加碱体积与 pH 读数发给 AI 助教继续分析。" : "Sende Saeure, Indikator, Volumen und pH-Wert an den KI-Tutor zur Analyse."}
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

export default TitrationSimulator;
