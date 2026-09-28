import { useRef, useEffect, useState, useMemo } from "react";
import type { PointerEvent as RPE } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface GleichgewichtSimulatorProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface Particle {
  x: number;
  y: number;
  ux: number;
  uy: number;
  f: number;
  kind: 0 | 1 | 2;
}

interface UiSnap {
  xi: number;
  q: number;
  k: number;
  yNH3: number;
  rate: number;
  simTime: number;
}

interface PhysState {
  parts: Particle[];
  xi: number;
  hits: number;
  winDt: number;
  time: number;
  frame: number;
  flash: number;
  dragging: boolean;
}

const R_J = 8.314;
const R_BAR = 0.08314;
const DH = -92400;
const T_REF = 723.15;
const KC_REF = 0.69;
const EA = 60000;
const K_RATE_REF = 0.4;
const P_MIN = 10;
const P_MAX = 200;
const T_MIN_C = 200;
const T_MAX_C = 600;
const N_PART = 56;
const XI_LO = 0.004;
const XI_HI = 0.996;

function clampNum(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

function kcOf(tK: number): number {
  return KC_REF * Math.exp((-DH / R_J) * (1 / tK - 1 / T_REF));
}

function qcOf(xi: number, pBar: number, tK: number): number {
  const x = clampNum(xi, XI_LO, XI_HI);
  const nN2 = 1 - x;
  const nH2 = 3 * (1 - x);
  const nNH3 = 2 * x;
  const tot = nN2 + nH2 + nNH3;
  const cTot = pBar / (R_BAR * tK);
  const cNH3 = ((nNH3 / tot) * cTot) + 1e-12;
  const cN2 = ((nN2 / tot) * cTot) + 1e-12;
  const cH2 = ((nH2 / tot) * cTot) + 1e-12;
  return (cNH3 * cNH3) / (cN2 * cH2 * cH2 * cH2);
}

function eqXiOf(pBar: number, tK: number): number {
  const K = kcOf(tK);
  let lo = XI_LO;
  let hi = XI_HI;
  for (let i = 0; i < 28; i += 1) {
    const mid = (lo + hi) / 2;
    if (qcOf(mid, pBar, tK) < K) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

function rateOf(tK: number): number {
  return K_RATE_REF * Math.exp((-EA / R_J) * (1 / tK - 1 / T_REF));
}

function yieldOf(xi: number): number {
  const x = clampNum(xi, XI_LO, XI_HI);
  return (2 * x) / (4 - 2 * x);
}

function fmtSci(v: number): string {
  if (!isFinite(v) || v <= 0) return "0";
  return v.toExponential(2).replace("e", "E");
}

export function GleichgewichtSimulator({ lang, studioMode = true, onExportFinding }: GleichgewichtSimulatorProps) {
  void studioMode;
  const isZh = lang === "zh";

  const [pressure, setPressure] = useState<number>(120);
  const [tempC, setTempC] = useState<number>(450);
  const [paused, setPaused] = useState<boolean>(false);
  const [slowMo, setSlowMo] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [ui, setUi] = useState<UiSnap>({ xi: 0.2, q: 0, k: 0, yNH3: 0, rate: 0, simTime: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isZhRef = useRef(isZh);
  useEffect(() => {
    isZhRef.current = isZh;
  }, [isZh]);

  const physRef = useRef<PhysState>({ parts: [], xi: 0.2, hits: 0, winDt: 0, time: 0, frame: 0, flash: 0, dragging: false });
  const paramRef = useRef({ P: 120, T: 450 });
  const ctlRef = useRef({ paused: false, slow: false });

  useEffect(() => {
    paramRef.current.P = pressure;
    paramRef.current.T = tempC;
  }, [pressure, tempC]);

  useEffect(() => {
    ctlRef.current.paused = paused;
    ctlRef.current.slow = slowMo;
  }, [paused, slowMo]);

  const tK = tempC + 273.15;
  const kcNow = kcOf(tK);
  const kNow = rateOf(tK);
  const eqXi = useMemo(() => eqXiOf(pressure, tempC + 273.15), [pressure, tempC]);
  const eqYield = yieldOf(eqXi);

  const curve = useMemo(() => {
    const pts: { p: number; y: number }[] = [];
    const TK = tempC + 273.15;
    for (let i = 0; i <= 24; i += 1) {
      const p = P_MIN * Math.pow(P_MAX / P_MIN, i / 24);
      pts.push({ p, y: yieldOf(eqXiOf(p, TK)) * 100 });
    }
    return pts;
  }, [tempC]);

  const ratio = ui.q > 0 && kcNow > 0 ? ui.q / kcNow : 1;
  const lnR = Math.log(clampNum(ratio, 1e-9, 1e9));
  const dir: "right" | "left" | "eq" = lnR < -0.12 ? "right" : lnR > 0.12 ? "left" : "eq";
  const arrow = dir === "right" ? "→" : dir === "left" ? "←" : "⇌";

  const tempoPct = (kNow / K_RATE_REF) * 100;

  useEffect(() => {
    const phys = physRef.current;
    for (let i = 0; i < N_PART; i += 1) {
      const a = Math.random() * Math.PI * 2;
      phys.parts.push({
        x: 80 + Math.random() * 200,
        y: 120 + Math.random() * 80,
        ux: Math.cos(a),
        uy: Math.sin(a),
        f: 0.65 + Math.random() * 0.7,
        kind: 1,
      });
    }
  }, []);

  useEffect(() => {
    let animId = 0;
    let lastTs = -1;

    const layoutOf = (W: number, H: number, pBar: number) => {
      const LX = 64;
      const RX = Math.max(LX + 80, W - 30);
      const IT = 54;
      const BY = Math.max(IT + 120, H - 58);
      const minH = 62;
      const maxH = Math.max(minH + 20, BY - IT - 18);
      const frac = (pBar - P_MIN) / (P_MAX - P_MIN);
      const gasH = maxH - (maxH - minH) * clampNum(frac, 0, 1);
      const PY = BY - gasH;
      return { LX, RX, IT, BY, PY, gasH };
    };

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (lastTs < 0) lastTs = now;
      const rawDt = Math.min((now - lastTs) / 1000, 0.05);
      lastTs = now;
      const ctl = ctlRef.current;
      const par = paramRef.current;
      const phys = physRef.current;
      const dt = ctl.paused ? 0 : ctl.slow ? rawDt * 0.3 : rawDt;
      const TK = par.T + 273.15;

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

      const L = layoutOf(dispW, dispH, par.P);
      const r = 3.4;
      const gasTop = L.PY + 16 + r;
      const gasBot = L.BY - r;

      if (dt > 0) {
        const K = kcOf(TK);
        const Q = qcOf(phys.xi, par.P, TK);
        const kk = rateOf(TK);
        const drive = Math.tanh(0.35 * Math.log(K / Math.max(Q, 1e-12)));
        phys.xi = clampNum(phys.xi + kk * drive * dt, XI_LO, XI_HI);

        const vBase = 95 * Math.sqrt(TK / T_REF);
        for (let i = 0; i < phys.parts.length; i += 1) {
          const q = phys.parts[i];
          q.x += q.ux * q.f * vBase * dt;
          q.y += q.uy * q.f * vBase * dt;
          if (q.x - r <= L.LX) {
            q.x = L.LX + r;
            q.ux = Math.abs(q.ux);
            phys.hits += 1;
          } else if (q.x + r >= L.RX) {
            q.x = L.RX - r;
            q.ux = -Math.abs(q.ux);
            phys.hits += 1;
          }
          if (q.y - r <= gasTop) {
            q.y = gasTop + r;
            q.uy = Math.abs(q.uy);
            phys.hits += 2;
            phys.flash = 1;
          } else if (q.y + r >= gasBot) {
            q.y = gasBot - r;
            q.uy = -Math.abs(q.uy);
            phys.hits += 1;
          }
        }
        phys.time += dt;
        phys.winDt += dt;
        phys.flash = Math.max(0, phys.flash - rawDt * 5);
      } else {
        for (let i = 0; i < phys.parts.length; i += 1) {
          const q = phys.parts[i];
          q.x = clampNum(q.x, L.LX + r, Math.max(L.LX + r, L.RX - r));
          q.y = clampNum(q.y, gasTop + r, Math.max(gasTop + r, gasBot - r));
        }
      }

      phys.frame += 1;
      if (phys.frame % 6 === 0) {
        const wdt = Math.max(1e-6, phys.winDt);
        const rate = phys.hits / wdt;
        const x = phys.xi;
        const y = yieldOf(x);
        const TK2 = paramRef.current.T + 273.15;
        setUi({
          xi: Number(x.toFixed(4)),
          q: qcOf(x, paramRef.current.P, TK2),
          k: kcOf(TK2),
          yNH3: Number((y * 100).toFixed(1)),
          rate: Number(rate.toFixed(1)),
          simTime: Number(phys.time.toFixed(1)),
        });
        const tot = phys.parts.length;
        const tNH3 = Math.round(y * tot);
        const rest = tot - tNH3;
        const tN2 = Math.round(rest / 4);
        let needNH3 = tNH3 - phys.parts.filter((p) => p.kind === 2).length;
        let guard = 0;
        while (needNH3 !== 0 && guard < 12) {
          guard += 1;
          if (needNH3 > 0) {
            const cand = phys.parts.find((p) => p.kind !== 2);
            if (!cand) break;
            cand.kind = 2;
            needNH3 -= 1;
          } else {
            const cand = phys.parts.find((p) => p.kind === 2);
            if (!cand) break;
            const n2count = phys.parts.filter((p) => p.kind === 0).length;
            cand.kind = n2count < tN2 ? 0 : 1;
            needNH3 += 1;
          }
        }
        phys.hits = 0;
        phys.winDt = 0;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, dispW, dispH);
      ctx.fillStyle = "#FAFAFA";
      ctx.fillRect(0, 0, dispW, dispH);
      ctx.strokeStyle = "#E4E4E7";
      ctx.lineWidth = 1;
      for (let gx = 12; gx < dispW; gx += 24) {
        ctx.beginPath();
        ctx.moveTo(gx, 8);
        ctx.lineTo(gx, dispH - 8);
        ctx.stroke();
      }
      for (let gy = 12; gy < dispH; gy += 24) {
        ctx.beginPath();
        ctx.moveTo(8, gy);
        ctx.lineTo(dispW - 8, gy);
        ctx.stroke();
      }

      ctx.fillStyle = "rgba(228, 228, 231, 0.55)";
      ctx.fillRect(L.LX, L.PY + 16, Math.max(0, L.RX - L.LX), Math.max(0, L.BY - (L.PY + 16)));

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(L.LX, L.PY + 16);
      ctx.lineTo(L.LX, L.BY);
      ctx.lineTo(L.RX, L.BY);
      ctx.lineTo(L.RX, L.PY + 16);
      ctx.stroke();

      const hot = par.T > 480;
      const cold = par.T < 300;
      void hot;
      void cold;
      ctx.fillStyle = "#3f3f46";
      ctx.fillRect(L.LX - 4, L.PY, L.RX - L.LX + 8, 14);
      ctx.fillRect((L.LX + L.RX) / 2 - 9, 8, 18, Math.max(0, L.PY - 8));
      ctx.fillStyle = `rgba(159, 18, 57, ${(phys.flash * 0.55).toFixed(3)})`;
      ctx.fillRect(L.LX - 4, L.PY + 12, L.RX - L.LX + 8, 4);
      ctx.strokeStyle = "#71717A";
      ctx.lineWidth = 1.5;
      for (let hy = L.PY + 2; hy < L.PY + 12; hy += 4) {
        ctx.beginPath();
        ctx.moveTo(L.LX, hy);
        ctx.lineTo(L.LX + 8, hy + 2);
        ctx.stroke();
      }

      ctx.fillStyle = "#3f3f46";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillText(isZhRef.current ? "活塞 (拖动)" : "Kolben (ziehen)", L.LX - 4, L.PY - 8);

      for (let i = 0; i < phys.parts.length; i += 1) {
        const q = phys.parts[i];
        if (q.kind === 2) {
          ctx.fillStyle = "#047857";
          ctx.beginPath();
          ctx.arc(q.x, q.y, 3.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#10b981";
          ctx.beginPath();
          ctx.arc(q.x - 2.6, q.y + 2.6, 1.5, 0, Math.PI * 2);
          ctx.arc(q.x + 2.6, q.y + 2.6, 1.5, 0, Math.PI * 2);
          ctx.arc(q.x, q.y - 3, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (q.kind === 0) {
          ctx.fillStyle = "#2563eb";
          ctx.beginPath();
          ctx.arc(q.x - 2.3, q.y, 2.9, 0, Math.PI * 2);
          ctx.arc(q.x + 2.3, q.y, 2.9, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = "#64748b";
          ctx.beginPath();
          ctx.arc(q.x - 1.6, q.y, 1.9, 0, Math.PI * 2);
          ctx.arc(q.x + 1.6, q.y, 1.9, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const flameH = 6 + ((par.T - T_MIN_C) / (T_MAX_C - T_MIN_C)) * 26;
      if (par.T > T_MIN_C) {
        ctx.fillStyle = par.T > 480 ? "#c2410c" : "#2563eb";
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.moveTo((L.LX + L.RX) / 2 - 30, L.BY + 8);
        ctx.quadraticCurveTo((L.LX + L.RX) / 2, L.BY + 8 - flameH * 1.6, (L.LX + L.RX) / 2 + 30, L.BY + 8);
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = "#71717A";
      ctx.fillRect((L.LX + L.RX) / 2 - 36, L.BY + 8, 72, 4);

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(14, L.IT, 12, 110);
      const tFrac = (par.T - T_MIN_C) / (T_MAX_C - T_MIN_C);
      const fillH = Math.max(2, tFrac * 106);
      ctx.fillStyle = par.T > 480 ? "#9f1239" : par.T < 300 ? "#1e40af" : "#065f46";
      ctx.fillRect(16, L.IT + 110 - 2 - fillH, 8, fillH);
      ctx.fillStyle = "#3f3f46";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`${Math.round(par.T)} C`, 8, L.IT + 126);

      ctx.strokeStyle = "#71717A";
      ctx.lineWidth = 1;
      const dimY = L.BY + 30;
      if (dimY < dispH - 8) {
        ctx.beginPath();
        ctx.moveTo(L.LX, dimY);
        ctx.lineTo(L.RX, dimY);
        ctx.stroke();
        ctx.fillStyle = "#3f3f46";
        ctx.font = "10px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText(`p = ${par.P.toFixed(0)} bar`, (L.LX + L.RX) / 2, dimY + 14);
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const pistonGeom = (clientX: number, clientY: number): { over: boolean; p: number } => {
    const canvas = canvasRef.current;
    if (!canvas) return { over: false, p: pressure };
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const LX = 64;
    const RX = Math.max(LX + 80, rect.width - 30);
    const IT = 54;
    const BY = Math.max(IT + 120, rect.height - 58);
    const minH = 62;
    const maxH = Math.max(minH + 20, BY - IT - 18);
    const frac = (paramRef.current.P - P_MIN) / (P_MAX - P_MIN);
    const gasH = maxH - (maxH - minH) * clampNum(frac, 0, 1);
    const PY = BY - gasH;
    const over = x >= LX - 16 && x <= RX + 16 && y >= PY - 22 && y <= PY + 30;
    const newGasH = clampNum(BY - y, minH, maxH);
    const newFrac = (maxH - newGasH) / (maxH - minH);
    return { over, p: clampNum(P_MIN + newFrac * (P_MAX - P_MIN), P_MIN, P_MAX) };
  };

  const handlePointerDown = (e: RPE<HTMLCanvasElement>) => {
    const hit = pistonGeom(e.clientX, e.clientY);
    if (!hit.over) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    physRef.current.dragging = true;
    setPressure(Math.round(hit.p));
  };

  const handlePointerMove = (e: RPE<HTMLCanvasElement>) => {
    if (!physRef.current.dragging) return;
    const hit = pistonGeom(e.clientX, e.clientY);
    setPressure(Math.round(hit.p));
  };

  const handlePointerUp = (e: RPE<HTMLCanvasElement>) => {
    physRef.current.dragging = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* noop */
    }
  };

  const handleReset = () => {
    const phys = physRef.current;
    phys.xi = 0.2;
    phys.hits = 0;
    phys.winDt = 0;
    phys.time = 0;
    phys.flash = 0;
    phys.dragging = false;
    setPressure(120);
    setTempC(450);
    setPaused(false);
  };

  const applyPreset = (p: number, t: number) => {
    setPressure(p);
    setTempC(t);
    setPaused(false);
  };

  const generateReport = (): string => {
    const dirTxt = dir === "right" ? "Hinreaktion (→)" : dir === "left" ? "Rueckreaktion (←)" : "Gleichgewicht (⇌)";
    if (isZh) {
      return (
        `哈伯平衡实验记录:\n` +
        `- 条件: p=${pressure} bar, T=${tempC} °C\n` +
        `- Qc=${fmtSci(ui.q)} (mol/L)^-2, Kc(${tempC}°C)=${fmtSci(ui.k)} (mol/L)^-2, Q/K=${fmtSci(ratio)}\n` +
        `- 判据: Q<Kc → ${dirTxt}, 当前NH3体积分数 ${ui.yNH3}%, 平衡值 ${(eqYield * 100).toFixed(1)}%\n` +
        `- 器壁碰撞率约 ${ui.rate.toFixed(1)}/s, 相对速率 ${tempoPct.toFixed(0)}% (以450°C为100%)\n` +
        `- 结论: 加压偏向气体分子数少的一侧(4→2); 升温偏向吸热逆反应(Kc骤降); 低温高压产率高但速率冻结, 工业取200 bar/450°C左右的妥协并加铁催化剂.`
      );
    }
    return (
      `Haber-Protokoll:\n` +
      `- Zustand: p=${pressure} bar, T=${tempC} °C\n` +
      `- Qc=${fmtSci(ui.q)} (mol/L)^-2, Kc(${tempC}C)=${fmtSci(ui.k)} (mol/L)^-2, Q/K=${fmtSci(ratio)}\n` +
      `- Kriterium: ${dirTxt}, y(NH3)=${ui.yNH3} %, Gleichgewicht ${(eqYield * 100).toFixed(1)} %\n` +
      `- Wandrate ca. ${ui.rate.toFixed(1)}/s, Relativtempo ${tempoPct.toFixed(0)} % (450 C = 100 %)\n` +
      `- Befund: Druck bevorzugt die Seite mit weniger Gasteilchen (4->2); Heizen bevorzugt die endotherme Rueckreaktion (K bricht ein); tiefes T + hohes p geben Lage, aber eingefrorene Kinetik, Industrie waehlt ca. 200 bar/450 C mit Fe-Katalysator.`
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

  const chartW = 260;
  const chartH = 150;
  const padL = 34;
  const padB = 20;
  const padT = 10;
  const padR = 10;
  const logMin = Math.log(P_MIN);
  const logMax = Math.log(P_MAX);
  const chartX = (p: number) => padL + ((Math.log(p) - logMin) / (logMax - logMin)) * (chartW - padL - padR);
  const chartY = (y: number) => chartH - padB - (clampNum(y, 0, 100) / 100) * (chartH - padT - padB);
  let curvePath = "";
  curve.forEach((q, i) => {
    curvePath += `${i === 0 ? "M" : "L"}${chartX(q.p).toFixed(1)} ${chartY(q.y).toFixed(1)} `;
  });

  const verdict = tempC <= 300
    ? isZh
      ? "低温陷阱: 平衡产率接近峰值, 但速率冻结, 无催化剂时工业不可行。"
      : "Tieftemperatur-Falle: maximale Lage, aber eingefrorene Kinetik, ohne Katalysator unwirtschaftlich."
    : tempC >= 520
      ? isZh
        ? "高温陷阱: 速率拉满, 但 Kc 崩塌, 逆反应吃掉几乎全部 NH3。"
        : "Hochtemperatur-Falle: maximales Tempo, aber K kollabiert, die Rueckreaktion frisst fast alles NH3."
      : pressure >= 150
        ? isZh
          ? "工业妥协区: 高压保住产率, 中温保住速率, 再加铁催化剂加速。"
          : "Industrie-Kompromiss: Hochdruck sichert die Lage, Mitteltemperatur das Tempo, Fe-Katalysator den Rest."
        : isZh
          ? "低压低效区: 分子数 4→2 的优势无法发挥, 产率与速率双输。"
          : "Niederdruck-Zone: der 4->2-Vorteil greift nicht, Lage und Tempo verlieren beide.";

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "哈伯平衡与勒夏特列活塞实验室" : "Haber-Gleichgewicht und Kolbenlabor"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--ink-muted)] whitespace-nowrap">
                  {arrow} NH3 {ui.yNH3.toFixed(1)}% Q/K={fmtSci(ratio)}
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
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
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
                  Qc=<strong className="text-[#1e40af]">{fmtSci(ui.q)}</strong>
                </span>
                <span>
                  Kc=<strong className="text-[#9f1239]">{fmtSci(ui.k)}</strong>
                </span>
                <span>
                  {arrow} <strong className="text-[#065f46]">{ui.yNH3.toFixed(1)}%</strong> NH3
                </span>
                <span>
                  {isZh ? "碰撞" : "Rate"}=<strong>{ui.rate.toFixed(1)}</strong>/s
                </span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isZh ? "扰动预设" : "Stoerungs-Presets"}
              </div>
              <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                <button
                  type="button"
                  onClick={() => applyPreset(200, 450)}
                  className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] hover:border-[var(--ink)]"
                >
                  {isZh ? "工业妥协" : "Industrie"} 200/450
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(200, 250)}
                  className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] hover:border-[var(--ink)]"
                >
                  {isZh ? "低温美梦" : "Kaltetraum"} 200/250
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(20, 450)}
                  className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] hover:border-[var(--ink)]"
                >
                  {isZh ? "低压对照" : "Niederdruck"} 20/450
                </button>
                <button
                  type="button"
                  onClick={() => applyPreset(120, 600)}
                  className="py-1 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] hover:border-[var(--ink)]"
                >
                  {isZh ? "高温对照" : "Hoch-T"} 120/600
                </button>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink-muted)]">
                {isZh
                  ? "先点预设制造扰动, 再看 Q/K 箭头与粒子群如何避抗, 最后读等温产率曲线。"
                  : "Preset waehlen, Q/K-Pfeil und Teilchen beim Ausweichen beobachten, dann die Isotherme lesen."}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "物理参数调控" : "Physikalische Parameter"}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "总压强 p (活塞)" : "Gesamtdruck p (Kolben)"}</span>
                  <span className="font-medium text-[#065f46]">{pressure} bar</span>
                </div>
                <input
                  type="range"
                  min={P_MIN}
                  max={P_MAX}
                  step="5"
                  value={pressure}
                  onChange={(e) => setPressure(Number(e.target.value))}
                  className="w-full accent-[#065f46]"
                  aria-label={isZh ? "总压强" : "Gesamtdruck"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                  <span>10 bar</span>
                  <span>200 bar</span>
                </div>
              </div>
              <div className="mb-1">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <span className="text-[var(--ink)]">{isZh ? "温度 T" : "Temperatur T"}</span>
                  <span className="font-medium text-[#9f1239]">{tempC} °C</span>
                </div>
                <input
                  type="range"
                  min={T_MIN_C}
                  max={T_MAX_C}
                  step="10"
                  value={tempC}
                  onChange={(e) => setTempC(Number(e.target.value))}
                  className="w-full accent-[#9f1239]"
                  aria-label={isZh ? "温度" : "Temperatur"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                  <span>200 °C</span>
                  <span>600 °C</span>
                </div>
              </div>
              <div className="border-t border-[var(--line)] mt-3 pt-2 font-mono tabular-nums text-[11px] text-[var(--ink)] space-y-1">
                <div className="flex justify-between">
                  <span>Qc</span>
                  <span className="text-[#1e40af]">{fmtSci(ui.q)} (mol/L)^-2</span>
                </div>
                <div className="flex justify-between">
                  <span>Kc({tempC} °C)</span>
                  <span className="text-[#9f1239]">{fmtSci(ui.k)} (mol/L)^-2</span>
                </div>
                <div className="flex justify-between">
                  <span>{arrow} {isZh ? "判据" : "Kriterium"}</span>
                  <span className="text-[#065f46]">
                    {dir === "right" ? (isZh ? "Q<Kc 正向" : "Q<K vorwaerts") : dir === "left" ? (isZh ? "Q>Kc 逆向" : "Q>K rueckwaerts") : (isZh ? "Q=Kc 平衡" : "Q=K Gleichgewicht")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>y(NH3)</span>
                  <span>{ui.yNH3.toFixed(1)} % / GG {(eqYield * 100).toFixed(1)} %</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">
                {isZh ? "NH3 平衡产率等温线" : "NH3-Isotherme"}
              </div>
              <svg viewBox={`0 0 ${chartW} ${chartH}`} className="w-full text-[var(--ink-muted)]" role="img" aria-label={isZh ? "产率压力等温曲线" : "Ausbeute-p-Isotherme"}>
                <line x1={padL} y1={padT} x2={padL} y2={chartH - padB} stroke="currentColor" strokeWidth="1" />
                <line x1={padL} y1={chartH - padB} x2={chartW - padR} y2={chartH - padB} stroke="currentColor" strokeWidth="1" />
                <path d={curvePath} fill="none" stroke="#065f46" strokeWidth="1.5" />
                {[10, 50, 100, 200].map((p) => (
                  <text key={p} x={chartX(p)} y={chartH - 6} fontSize="8" textAnchor="middle" fill="currentColor" fontFamily="ui-monospace, monospace">
                    {p}
                  </text>
                ))}
                {[0, 50, 100].map((y) => (
                  <text key={y} x={padL - 3} y={chartY(y) + 3} fontSize="8" textAnchor="end" fill="currentColor" fontFamily="ui-monospace, monospace">
                    {y}
                  </text>
                ))}
                <text x={chartW - padR} y={chartH - 6} fontSize="8" textAnchor="end" fill="currentColor" fontFamily="ui-monospace, monospace">
                  bar
                </text>
                <text x={padL - 3} y={padT + 4} fontSize="8" textAnchor="end" fill="currentColor" fontFamily="ui-monospace, monospace">
                  %
                </text>
                <circle cx={chartX(pressure)} cy={chartY(eqYield * 100)} r="3" fill="#065f46" />
                <circle cx={chartX(pressure)} cy={chartY(ui.yNH3)} r="3.5" fill="none" stroke="#9f1239" strokeWidth="1.5" />
              </svg>
              <p className="mt-1.5 font-mono tabular-nums text-[10px] text-[var(--ink-muted)] leading-relaxed">
                {isZh
                  ? `实线为 ${tempC}°C 平衡线; 绿点为平衡目标 ${(eqYield * 100).toFixed(1)}%, 红圈为当前 ${ui.yNH3.toFixed(1)}%。`
                  : `Linie: GG bei ${tempC} C; Gruen: Ziel ${(eqYield * 100).toFixed(1)} %, Rot: aktuell ${ui.yNH3.toFixed(1)} %.`}
              </p>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">
                {isZh ? "工业两难结论卡" : "Industrie-Dilemma"}
              </div>
              <div className="font-mono tabular-nums text-[11px] text-[var(--ink)] space-y-1.5">
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>{isZh ? "位置 Lage" : "Lage"}</span>
                    <span className="text-[#065f46]">{(eqYield * 100).toFixed(1)} %</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full bg-[#065f46]" style={{ width: `${clampNum(eqYield * 100, 0, 100).toFixed(1)}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-0.5">
                    <span>{isZh ? "速率 Tempo" : "Tempo"}</span>
                    <span className="text-[#9f1239]">{tempoPct >= 100 ? tempoPct.toFixed(0) : tempoPct.toFixed(1)} %</span>
                  </div>
                  <div className="h-1.5 w-full bg-[var(--line)] overflow-hidden">
                    <div className="h-full bg-[#9f1239]" style={{ width: `${clampNum((tempoPct / 555) * 100, 1, 100).toFixed(1)}%` }} />
                  </div>
                </div>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[var(--ink)]">{verdict}</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel und Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "质量作用定律与反应商" : "Massenwirkungsgesetz"}
          </div>
          <div className="mb-1.5">
            <MathHtml code="N_2 + 3H_2 \rightleftharpoons 2NH_3 \quad \Delta H = -92{,}4\,\text{kJ/mol}" display={true} cacheKey="gg:haber-eq" />
            <MathHtml code="Q_c = \frac{[NH_3]^2}{[N_2]\,[H_2]^3}" display={true} cacheKey="gg:reaction-quotient" />
            <MathHtml code="Q_c < K_c \to \; Q_c > K_c \gets \; Q_c = K_c \rightleftharpoons" display={true} cacheKey="gg:q-k-criterion" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "Kc 只随温度变, Qc 随组成与压强变; 加压用 1/p 方项压低 Qc, 升温用范特霍夫项压垮 Kc。"
              : "K haengt nur von T ab, Q von Zusammensetzung und p; Druck senkt Q ueber 1/p, Heizen laesst K nach van't Hoff einbrechen."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "化学平衡: 勒夏特列" : "Chemisches Gleichgewicht"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">beschreiben, begruenden, beurteilen</code>
            <p className="mt-1">
              {isZh
                ? "标准三段: 定性扰动(p/T/c)→用 Q/K 与分子数或吸放热论证避抗方向→给出产率与速率结论, 并评价工业妥协。"
                : "Dreiklang: Zwang (p/T/c) benennen, mit Q/K plus Teilchenzahl oder Reaktionswaerme die Ausweichrichtung begruenden, Lage und Tempo beurteilen."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "压小热退冻得慢" : "Wenig, heiss, kalt"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "分子多变少爱加压, 放热反应怕加热, 又冷又压产率高、但分子冻住跑不动。记作: 小、退、冻三字诀。"
              : "Weniger Teilchen lieben Druck, exotherme Systeme hassen Hitze, kalt plus Druck gibt Lage, aber die Kinetik friert ein."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isZh ? "导出平衡结论" : "Befunde exportieren"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh
                ? "把当前 p、T、Qc/Kc、产率与两难 verdict 发给 AI 助教继续追问。"
                : "Sende p, T, Qc/Kc, Ausbeute und Dilemma-Verdikt an den KI-Tutor zur Vertiefung."}
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
