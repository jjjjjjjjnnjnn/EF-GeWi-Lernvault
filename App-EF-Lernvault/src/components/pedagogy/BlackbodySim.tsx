import { useEffect, useId, useRef, useState } from "react";
import type { PointerEvent as RPE } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface BlackbodySimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

/* Hand-written school model (no external sim code reused).
 * Planck spectral exitance B_lambda(T) = 2 h c^2 / lambda^5 / (exp(h c / (lambda k T)) - 1).
 * Wien: lambda_max * T = b. Stefan-Boltzmann: P = sigma T^4.
 * Plot range lambda = 100..3000 nm, curves normalised to their own maximum
 * (global normalisation would squash 1000 K curves by ~1e-5 since B_max ~ T^5);
 * total power is shown separately as sigma T^4 readout plus bar. */
const H_PLANCK = 6.62607015e-34;
const C_LIGHT = 2.99792458e8;
const K_BOLTZ = 1.380649e-23;
const WIEN_B = 2.897771955e-3;
const SIGMA = 5.670374419e-8;
const T_SUN = 5778;
const T_MIN = 1000;
const T_MAX = 10000;
const LAM_MIN = 100;
const LAM_MAX = 3000;
const VIS_LO = 380;
const VIS_HI = 780;

interface UiSnap {
  t: number;
  lamMax: number;
  power: number;
}

function planckB(lamNm: number, tK: number): number {
  const lam = lamNm * 1e-9;
  const x = (H_PLANCK * C_LIGHT) / (lam * K_BOLTZ * tK);
  if (x > 60) return 0;
  const denom = Math.exp(x) - 1;
  if (denom <= 0) return 0;
  return (2 * H_PLANCK * C_LIGHT * C_LIGHT) / Math.pow(lam, 5) / denom;
}

function wienMaxNm(tK: number): number {
  return (WIEN_B / tK) * 1e9;
}

function clampNum(x: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, x));
}

function waveRGB(w: number): [number, number, number] {
  let r = 0;
  let g = 0;
  let b = 0;
  if (w < 380 || w > 780) return [0, 0, 0];
  if (w < 440) {
    r = -(w - 440) / 60;
    b = 1;
  } else if (w < 490) {
    g = (w - 440) / 50;
    b = 1;
  } else if (w < 510) {
    g = 1;
    b = -(w - 510) / 20;
  } else if (w < 580) {
    r = (w - 510) / 70;
    g = 1;
  } else if (w < 645) {
    r = 1;
    g = -(w - 645) / 65;
  } else {
    r = 1;
  }
  let f = 1;
  if (w < 420) f = 0.3 + (0.7 * (w - 380)) / 40;
  else if (w > 700) f = 0.3 + (0.7 * (780 - w)) / 80;
  return [Math.round(r * 255 * f), Math.round(g * 255 * f), Math.round(b * 255 * f)];
}

/* Compact blackbody glow tint (Tanner Helland style approximation), for the preview disc. */
function glowRGB(tK: number): [number, number, number] {
  const t = clampNum(tK / 100, 10, 100);
  let r: number;
  let g: number;
  let b: number;
  if (t <= 66) {
    r = 255;
    g = 99.4708025861 * Math.log(t) - 161.1195681661;
    b = t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
  } else {
    r = 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = 255;
  }
  return [Math.round(clampNum(r, 0, 255)), Math.round(clampNum(g, 0, 255)), Math.round(clampNum(b, 0, 255))];
}

function fmtPower(p: number): string {
  if (p >= 1e6) return `${(p / 1e6).toFixed(1)} MW/m2`;
  return `${(p / 1e3).toFixed(1)} kW/m2`;
}

export function BlackbodySim({ lang, studioMode = true, onExportFinding }: BlackbodySimProps) {
  void studioMode;
  const isZh = lang === "zh";

  const [tempK, setTempK] = useState<number>(T_SUN);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showSun, setShowSun] = useState<boolean>(true);
  const [showVis, setShowVis] = useState<boolean>(true);
  const [ui, setUi] = useState<UiSnap>(() => ({
    t: T_SUN,
    lamMax: wienMaxNm(T_SUN),
    power: SIGMA * Math.pow(T_SUN, 4),
  }));

  const tempId = useId();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef<number>(T_SUN);
  const curRef = useRef<number>(T_SUN);
  const flagRef = useRef<{ sun: boolean; vis: boolean }>({ sun: true, vis: true });
  const dragRef = useRef<boolean>(false);
  const frameRef = useRef<number>(0);
  const lastRef = useRef<number>(-1);

  useEffect(() => {
    targetRef.current = tempK;
  }, [tempK]);

  useEffect(() => {
    flagRef.current.sun = showSun;
    flagRef.current.vis = showVis;
  }, [showSun, showVis]);

  useEffect(() => {
    let animId = 0;

    const tempColor = (t: number): string => {
      const f = (t - T_MIN) / (T_MAX - T_MIN);
      if (f < 0.5) return "#f59e0b";
      if (f < 0.8) return "#fbbf24";
      return "#e0f2fe";
    };

    const curvePeak = (t: number): number => {
      let m = 0;
      for (let l = LAM_MIN; l <= LAM_MAX; l += 25) {
        const v = planckB(l, t);
        if (v > m) m = v;
      }
      return m > 0 ? m : 1;
    };

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      if (lastRef.current < 0) lastRef.current = now;
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;

      const target = targetRef.current;
      const cur0 = curRef.current;
      const diff = target - cur0;
      const cur = Math.abs(diff) < 0.6 ? target : cur0 + diff * Math.min(1, dt * 5);
      curRef.current = cur;

      frameRef.current += 1;
      if (frameRef.current % 8 === 0) {
        setUi({ t: cur, lamMax: wienMaxNm(cur), power: SIGMA * Math.pow(cur, 4) });
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const dw = Math.max(1, Math.floor(rect.width));
      const dh = Math.max(1, Math.floor(rect.height));
      if (canvas.width !== Math.floor(dw * dpr) || canvas.height !== Math.floor(dh * dpr)) {
        canvas.width = Math.floor(dw * dpr);
        canvas.height = Math.floor(dh * dpr);
      }

      const L = 56;
      const R = 16;
      const T = 30;
      const B = 36;
      const iw = Math.max(40, dw - L - R);
      const ih = Math.max(40, dh - T - B);
      const xOf = (lam: number): number => L + ((lam - LAM_MIN) / (LAM_MAX - LAM_MIN)) * iw;
      const yOf = (v: number): number => T + (1 - clampNum(v, 0, 1.06)) * ih;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, dw, dh);
      ctx.fillStyle = "#111827";
      ctx.fillRect(0, 0, dw, dh);

      /* Visible band wash + top rainbow bar */
      const flags = flagRef.current;
      if (flags.vis) {
        const vx0 = xOf(VIS_LO);
        const vx1 = xOf(VIS_HI);
        for (let px = Math.floor(vx0); px <= vx1; px += 2) {
          const lam = LAM_MIN + ((px - L) / iw) * (LAM_MAX - LAM_MIN);
          const [r, g, b] = waveRGB(lam);
          ctx.fillStyle = `rgba(${r},${g},${b},0.20)`;
          ctx.fillRect(px, T, 2, ih);
        }
        for (let px = Math.floor(vx0); px <= vx1; px += 2) {
          const lam = LAM_MIN + ((px - L) / iw) * (LAM_MAX - LAM_MIN);
          const [r, g, b] = waveRGB(lam);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.fillRect(px, T - 12, 2, 8);
        }
        ctx.fillStyle = "#9ca3af";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "center";
        ctx.fillText(isZh ? "可见光 380-780 nm" : "sichtbar 380-780 nm", (vx0 + vx1) / 2, T - 16);
      }

      /* Grid + axes */
      ctx.strokeStyle = "rgba(156,163,175,0.25)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "#9ca3af";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      for (let lam = 0; lam <= LAM_MAX; lam += 500) {
        const x = xOf(Math.max(lam, LAM_MIN));
        ctx.beginPath();
        ctx.moveTo(x, T);
        ctx.lineTo(x, T + ih);
        ctx.stroke();
        ctx.fillText(`${lam}`, x, T + ih + 14);
      }
      ctx.textAlign = "right";
      for (const v of [0, 0.5, 1]) {
        const y = yOf(v);
        ctx.beginPath();
        ctx.moveTo(L, y);
        ctx.lineTo(L + iw, y);
        ctx.stroke();
        ctx.fillText(v.toFixed(1), L - 6, y + 3);
      }
      ctx.strokeStyle = "#6b7280";
      ctx.lineWidth = 1.2;
      ctx.strokeRect(L, T, iw, ih);
      ctx.fillStyle = "#d1d5db";
      ctx.textAlign = "center";
      ctx.fillText(isZh ? "波长 λ / nm" : "Wellenlaenge λ / nm", L + iw / 2, dh - 6);
      ctx.save();
      ctx.translate(12, T + ih / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText(isZh ? "相对辐射 Bλ" : "Bλ normiert", 0, 0);
      ctx.restore();

      const drawCurve = (t: number, color: string, dashed: boolean, width: number) => {
        const peak = curvePeak(t);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.setLineDash(dashed ? [5, 4] : []);
        ctx.beginPath();
        for (let i = 0; i <= 240; i += 1) {
          const lam = LAM_MIN + ((LAM_MAX - LAM_MIN) * i) / 240;
          const v = planckB(lam, t) / peak;
          const x = xOf(lam);
          const y = yOf(v);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      };

      if (flags.sun && Math.abs(cur - T_SUN) > 5) {
        drawCurve(T_SUN, "rgba(148,163,184,0.85)", true, 1.2);
        ctx.fillStyle = "#94a3b8";
        ctx.font = "9px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText(isZh ? "太阳 5778 K" : "Sonne 5778 K", xOf(LAM_MAX) - 92, yOf(0.94));
      }
      drawCurve(cur, tempColor(cur), false, 2);

      /* Wien peak line */
      const lamP = wienMaxNm(cur);
      if (lamP >= LAM_MIN && lamP <= LAM_MAX) {
        const xp = xOf(lamP);
        ctx.strokeStyle = "rgba(248,250,252,0.75)";
        ctx.setLineDash([4, 3]);
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(xp, T);
        ctx.lineTo(xp, T + ih);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "#f8fafc";
        ctx.font = "10px ui-monospace, monospace";
        ctx.textAlign = lamP > 2400 ? "right" : "left";
        ctx.fillText(`λmax ${lamP.toFixed(0)} nm`, xp + (lamP > 2400 ? -5 : 5), T + 16);
      }

      /* Glow preview disc */
      const [gr, gg, gb] = glowRGB(cur);
      ctx.fillStyle = `rgb(${gr},${gg},${gb})`;
      ctx.beginPath();
      ctx.arc(L + iw - 26, T + 26, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "rgba(248,250,252,0.6)";
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.fillStyle = "#f8fafc";
      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.fillText(`${Math.round(cur)} K`, L + iw - 46, T + 30);

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isZh]);

  const tempFromClient = (clientX: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return tempK;
    const rect = canvas.getBoundingClientRect();
    const L = 56;
    const R = 16;
    const iw = Math.max(40, rect.width - L - R);
    const frac = clampNum((clientX - rect.left - L) / iw, 0, 1);
    const t = Math.pow(10, 3 + frac);
    return Math.round(clampNum(t, T_MIN, T_MAX) / 10) * 10;
  };

  const handlePointerDown = (e: RPE<HTMLCanvasElement>) => {
    dragRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
    setTempK(tempFromClient(e.clientX));
  };

  const handlePointerMove = (e: RPE<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    setTempK(tempFromClient(e.clientX));
  };

  const handlePointerUp = (e: RPE<HTMLCanvasElement>) => {
    dragRef.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      /* noop */
    }
  };

  const handleReset = () => {
    setTempK(T_SUN);
    setShowSun(true);
    setShowVis(true);
  };

  const powerSun = SIGMA * Math.pow(T_SUN, 4);

  const handleExport = () => {
    const text = isZh
      ? `黑体辐射实验记录：T = ${Math.round(ui.t)} K，维恩峰值 λmax = ${ui.lamMax.toFixed(0)} nm（λmax·T = b），总辐射功率 P = σT⁴ = ${fmtPower(ui.power)}（约为太阳表面功率的 ${(ui.power / powerSun).toFixed(2)} 倍）。结论：T 升高时峰值向短波方向移动，总功率按 T⁴ 快速增长。`
      : `Schwarzkörper-Befund: T = ${Math.round(ui.t)} K, Wien-Maximum λmax = ${ui.lamMax.toFixed(0)} nm (λmax·T = b), Gesamtleistung P = σT⁴ = ${fmtPower(ui.power)} (Faktor ${(ui.power / powerSun).toFixed(2)} zur Sonne). Befund: Mit steigendem T wandert das Maximum zu kurzen Wellen, die Leistung wächst mit T⁴.`;
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

  const presets: Array<{ t: number; de: string; zh: string }> = [
    { t: 2800, de: "Gluehfaden 2800 K", zh: "灯丝 2800 K" },
    { t: 5778, de: "Sonne 5778 K", zh: "太阳 5778 K" },
    { t: 10000, de: "Heisser Stern 10000 K", zh: "热星 10000 K" },
  ];

  return (
    <div className="w-full flex flex-col gap-4 leading-[1.4]">
      <div className="grid grid-cols-12 gap-3 items-start">
        <div className={`${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"}`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex min-w-0 items-baseline gap-2">
                <span className="font-serif tracking-tight font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "黑体辐射：温度、峰值与总功率" : "Schwarzkörperstrahlung: Temperatur, Maximum und Leistung"}
                </span>
                <span className="font-mono tabular-nums text-[10px] text-[var(--ink-muted)] whitespace-nowrap">
                  T={Math.round(ui.t)}K λmax={ui.lamMax.toFixed(0)}nm
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
              <span className="font-mono text-[11px] text-[var(--ink-muted)]">
                {isZh ? "左右拖动曲线：调节温度（对数刻度，指针捕获）" : "Kurve seitlich ziehen: Temperatur stellen (log-Skala, Pointer-Capture)"}
              </span>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono tabular-nums text-[11px] text-[var(--ink)]">
                <span>
                  λmax=<strong className="text-[#1e40af]">{ui.lamMax.toFixed(0)}</strong>nm
                </span>
                <span>
                  P=<strong className="text-[#9f1239]">{fmtPower(ui.power)}</strong>
                </span>
                <span>
                  P/P<span className="text-[var(--ink-muted)]">{isZh ? "太阳" : "So"}</span>=
                  <strong className="text-[#065f46]">{(ui.power / powerSun).toFixed(2)}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "温度调控" : "Temperatursteuerung"}
              </div>
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono tabular-nums mb-1">
                  <label htmlFor={tempId} className="text-[var(--ink)]">
                    {isZh ? "黑体温度 T" : "Temperatur T"}
                  </label>
                  <span className="font-medium text-[#9f1239]">{tempK} K</span>
                </div>
                <input
                  id={tempId}
                  type="range"
                  min={T_MIN}
                  max={T_MAX}
                  step={10}
                  value={tempK}
                  onChange={(e) => setTempK(Number(e.target.value))}
                  className="w-full accent-[#9f1239]"
                  aria-label={isZh ? "黑体温度" : "Temperatur"}
                />
                <div className="flex justify-between font-mono text-[10px] text-[var(--ink-muted)]">
                  <span>1000 K</span>
                  <span>10000 K</span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-1.5 font-mono text-[11px]">
                {presets.map((p) => (
                  <button
                    key={p.t}
                    type="button"
                    onClick={() => setTempK(p.t)}
                    className={`py-1 px-2 border text-left ${
                      tempK === p.t
                        ? "bg-[var(--ink)] text-[var(--paper)] border-[var(--ink)]"
                        : "bg-[var(--paper-subtle)] text-[var(--ink)] border-[var(--line)]"
                    }`}
                  >
                    {isZh ? p.zh : p.de}
                  </button>
                ))}
              </div>
              <div className="mt-3 flex flex-col gap-1.5 font-mono text-[11px]">
                <label className="flex items-center gap-2 text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={showSun}
                    onChange={(e) => setShowSun(e.target.checked)}
                    className="accent-[#1e40af]"
                  />
                  {isZh ? "显示太阳参考曲线 (5778 K)" : "Sonnen-Referenzkurve zeigen (5778 K)"}
                </label>
                <label className="flex items-center gap-2 text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={showVis}
                    onChange={(e) => setShowVis(e.target.checked)}
                    className="accent-[#065f46]"
                  />
                  {isZh ? "标注可见光区 (380-780 nm)" : "Sichtbaren Bereich markieren (380-780 nm)"}
                </label>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--paper)] text-[var(--ink)] font-mono text-[11px]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M13.2 8 A5.2 5.2 0 1 1 8 2.8" />
                  <path d="M8 1.4 V4.2 H10.8" />
                </svg>
                {isZh ? "重置" : "Reset"}
              </button>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)] font-mono tabular-nums text-[11px] text-[var(--ink)] space-y-1">
              <div className="font-serif font-medium text-xs text-[var(--ink)] pb-1 border-b border-[var(--line)]">
                {isZh ? "实时读数" : "Live-Messwerte"}
              </div>
              <div className="flex justify-between">
                <span>{isZh ? "维恩峰值 λmax" : "Wien-Maximum λmax"}</span>
                <span className="text-[#1e40af]">{ui.lamMax.toFixed(0)} nm</span>
              </div>
              <div className="flex justify-between">
                <span>P = σT⁴</span>
                <span className="text-[#9f1239]">{fmtPower(ui.power)}</span>
              </div>
              <div className="flex justify-between">
                <span>{isZh ? "相对太阳功率" : "Relativ zur Sonne"}</span>
                <span className="text-[#065f46]">{(ui.power / powerSun).toFixed(2)}x</span>
              </div>
              <div className="h-2 w-full bg-[var(--paper-subtle)] border border-[var(--line)] overflow-hidden">
                <div
                  className="h-full bg-[#9f1239]"
                  style={{ width: `${Math.round(clampNum(ui.power / (SIGMA * Math.pow(T_MAX, 4)), 0, 1) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "普朗克、维恩与斯忒藩定律" : "Planck, Wien und Stefan-Boltzmann"}
          </div>
          <div className="mb-1.5">
            <MathHtml
              code="B_{\lambda}(T)=\frac{2hc^{2}}{\lambda^{5}}\frac{1}{e^{hc/(\lambda kT)}-1}"
              display={true}
              cacheKey="blackbody:planck-law"
            />
            <MathHtml
              code="\lambda_{\max}\cdot T = b,\; b=2{,}898\times 10^{-3}\,\mathrm{m\,K}"
              display={true}
              cacheKey="blackbody:wien-law"
            />
            <MathHtml
              code="P=\sigma T^{4},\; \sigma=5{,}67\times 10^{-8}\,\mathrm{W\,m^{-2}\,K^{-4}}"
              display={true}
              cacheKey="blackbody:stefan-law"
            />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "曲线已按各自峰值归一化，便于比较形状与峰位；总功率另按 σT⁴ 单独读数。"
              : "Kurven sind auf ihr eigenes Maximum normiert (Form und Lage vergleichbar); die Leistung folgt separat aus σT⁴."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "量子物理：热辐射与光量子" : "Quantenphysik: Waermestrahlung"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen, erklaeren, berechnen</code>
            <p className="mt-1">
              {isZh
                ? "典型任务：由 T 计算峰值波长，由 σT⁴ 比较辐射功率，并解释峰值随温度向短波移动的原因。"
                : "Aufgabe: Berechne λmax aus T, vergleiche Strahlungsleistungen mit σT⁴ und erklaere die Blauverschiebung des Maximums mit T."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "越热越偏蓝，功率按四次方涨" : "Heisser heisst blauer, Leistung T hoch vier"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "记住两句：峰值左移看维恩（λmax·T=b）；总账看四次方（T 翻倍功率涨 16 倍）。灯丝 2800K 峰在红外故偏红，太阳 5778K 峰在可见区。"
              : "Zwei Saetze: Maximum wandert links nach Wien (λmax·T=b); die Bilanz folgt T hoch vier (doppeltes T, 16-fache Leistung). 2800 K glimmt rot, 5778 K trifft das Sichtbare."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / Befund</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isZh ? "导出测量结论" : "Befunde exportieren"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh
                ? "把当前温度、峰值波长与总功率发给 AI 助教继续分析。"
                : "Sende T, λmax und P an den KI-Tutor zur Analyse."}
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

export default BlackbodySim;
