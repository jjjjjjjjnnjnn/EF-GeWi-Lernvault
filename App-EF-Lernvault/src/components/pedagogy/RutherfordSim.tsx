import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface RutherfordSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

// ---- Physik: alpha-Streuung am Au-Kern (Z = 79), abstossendes Coulomb-Potential ----
// V(r) = 2·Z·e² / (4·pi·eps0·r) = K / r,  K = k_e · 2·Z·e²  (J·m)
const KE = 8.988e9; // N·m²/C²
const ELEM = 1.602176634e-19; // C
const M_ALPHA = 6.644657e-27; // kg
const Z_AU = 79;
const K_C = KE * 2 * Z_AU * ELEM * ELEM; // J·m
const MEV_J = 1.602176634e-13; // J
const FM = 1e-15; // m

const B_MIN = 0;
const B_MAX = 40; // fm
const E_MIN = 4; // MeV
const E_MAX = 10; // MeV
const X0 = -320; // fm, Startposition links
const X_EXIT = 360; // fm, Abbruch rechts
const DT = 1.5e-24; // s, feste Schrittweite (Velocity-Verlet)
const MAX_STEPS = 42000;
const STRIDE = 28; // nur jeder n-te Punkt wird gezeichnet

// Tufte-Semantik, dunkel lesbar im Light- und Dark-Mode ueber var(--*).
const ALPHA = "#3f3f46";
const NUCLEUS = "#b91c1c";
const GOLD = "#92400e";

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

function thetaAnalyticDeg(bFm: number, eMeV: number): number {
  const bM = Math.max(bFm, 1e-6) * FM;
  const eJ = eMeV * MEV_J;
  return (2 * Math.atan(K_C / (2 * eJ * bM)) * 180) / Math.PI;
}

function closestApproachFm(eMeV: number): number {
  return K_C / (eMeV * MEV_J) / FM;
}

interface PathPoint {
  x: number; // fm
  y: number; // fm
}

interface Integrated {
  pts: PathPoint[];
  thetaDeg: number; // numerisch aus Endgeschwindigkeit
}

// Hyperbelbahn per Velocity-Verlet unter F = K/r² (abstossend, Zentralkraft).
function integrate(bFm: number, eMeV: number): Integrated {
  const eJ = eMeV * MEV_J;
  const v0 = Math.sqrt((2 * eJ) / M_ALPHA);
  let x = X0 * FM;
  let y = bFm * FM;
  let vx = v0;
  let vy = 0;
  const acc = (px: number, py: number): { ax: number; ay: number } => {
    const r2 = px * px + py * py;
    const r = Math.sqrt(r2);
    const f = K_C / (M_ALPHA * r2 * r); // (K/m)·r_vec/r³
    return { ax: f * px, ay: f * py };
  };
  let { ax, ay } = acc(x, y);
  const pts: PathPoint[] = [{ x: x / FM, y: y / FM }];
  for (let i = 0; i < MAX_STEPS; i++) {
    vx += 0.5 * ax * DT;
    vy += 0.5 * ay * DT;
    x += vx * DT;
    y += vy * DT;
    const n = acc(x, y);
    ax = n.ax;
    ay = n.ay;
    vx += 0.5 * ax * DT;
    vy += 0.5 * ay * DT;
    if (i % STRIDE === 0) {
      pts.push({ x: x / FM, y: y / FM });
      if (pts.length > 1400) break;
    }
    const r = Math.sqrt(x * x + y * y);
    const outbound = vx > 0 && x > 0 && (x * vx + y * vy) > 0;
    if (x / FM > X_EXIT && outbound) break;
    if (r / FM > 900 && outbound) break;
  }
  const last = pts[pts.length - 1];
  if (!last || Math.abs(last.x - x / FM) > 1e-9) pts.push({ x: x / FM, y: y / FM });
  const thetaDeg = (Math.atan2(vy, vx) * 180) / Math.PI;
  return { pts, thetaDeg };
}

function randomImpactFm(): number {
  return B_MAX * Math.sqrt(Math.random());
}

export function RutherfordSim({ lang, studioMode = true, onExportFinding }: RutherfordSimProps) {
  const [b, setB] = useState(8); // fm, Stossparameter
  const [energy, setEnergy] = useState(7.7); // MeV, wie Geiger–Marsden mit Au-Folie
  const [playing, setPlaying] = useState(true);
  const [showPanels, setShowPanels] = useState(studioMode);
  const [hud, setHud] = useState({ hx: X0, hy: 8 });
  const [stats, setStats] = useState({ n: 0, big: 0 });

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  // ---- Entkoppelter Simulationskern (SOP §2.3): alles in Refs, kein setState pro Frame ----
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const paramsRef = useRef({ b, energy });
  useEffect(() => {
    paramsRef.current = { b, energy };
  });
  const pathRef = useRef<Integrated>(integrate(8, 7.7));
  const flightRef = useRef({ prog: 0, playing: true });
  const dragRef = useRef(false);
  const frameRef = useRef(0);
  const playRef = useRef(playing);
  useEffect(() => {
    playRef.current = playing;
    flightRef.current.playing = playing;
  }, [playing]);

  // Neuberechnung der Hyperbelbahn bei Parameterwechsel + Neustart des Laufs.
  useEffect(() => {
    pathRef.current = integrate(b, energy);
    flightRef.current.prog = 0;
    flightRef.current.playing = true;
    setPlaying(true);
  }, [b, energy]);

  useEffect(() => {
    let raf = 0;
    const PAD = 14;
    const X_SPAN = 760; // fm Weltbreite
    const Y_SPAN = 300; // fm Welthoehe
    const toCanvas = (w: number, h: number) => {
      const s = Math.min((w - 2 * PAD) / X_SPAN, (h - 2 * PAD) / Y_SPAN);
      const cx0 = w * 0.56; // Kern leicht rechts der Mitte
      const cy0 = h * 0.52;
      return {
        s,
        X: (xFm: number) => cx0 + xFm * s,
        Y: (yFm: number) => cy0 - yFm * s,
      };
    };

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      // Dynamisches DPR (§2.3): scharf bei Zoom und HiDPI.
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const bw = Math.max(1, Math.round(rect.width * dpr));
      const bh = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== bw || canvas.height !== bh) {
        canvas.width = bw;
        canvas.height = bh;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;
      const m = toCanvas(w, h);
      const css = getComputedStyle(document.documentElement);
      const paper = css.getPropertyValue("--paper").trim() || "#ffffff";
      const line = css.getPropertyValue("--line").trim() || "#e4e4e7";
      const gray = css.getPropertyValue("--gray").trim() || "#71717a";
      const ink = css.getPropertyValue("--ink").trim() || "#18181b";
      const accent = css.getPropertyValue("--accent").trim() || "#b91c1c";

      ctx.fillStyle = paper;
      ctx.fillRect(0, 0, w, h);

      // Goldfolien-Markierung (vertikale Linie am Kernort).
      const xn = m.X(0);
      ctx.strokeStyle = line;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(xn, 10);
      ctx.lineTo(xn, h - 10);
      ctx.stroke();
      ctx.fillStyle = gray;
      ctx.font = "10px ui-monospace, SFMono-Regular, Menlo, monospace";
      ctx.fillText("Au", xn + 5, 22);

      // Abstands-Raster alle 100 fm.
      ctx.fillStyle = gray;
      for (let gx = -300; gx <= 300; gx += 100) {
        const px = m.X(gx);
        ctx.strokeStyle = line;
        ctx.beginPath();
        ctx.moveTo(px, h - 26);
        ctx.lineTo(px, h - 18);
        ctx.stroke();
        ctx.fillText(`${gx}`, px - 10, h - 6);
      }
      ctx.fillText("fm", w - 28, h - 6);

      const { b: bb } = paramsRef.current;
      const path = pathRef.current;
      const fl = flightRef.current;

      // Zielentfernung d (naechste Annaeherung frontal) als gestrichelter Kreis.
      const dFm = closestApproachFm(paramsRef.current.energy);
      ctx.strokeStyle = gray;
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(xn, m.Y(0), Math.max(2, dFm * m.s), 0, 2 * Math.PI);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = gray;
      ctx.fillText(`d = ${dFm.toFixed(1)} fm`, xn + dFm * m.s * 0.72 + 4, m.Y(0) - dFm * m.s * 0.72);

      // Ziellinie (dragbar): Einfallsachse bei y = b.
      const aimY = m.Y(bb);
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 4]);
      ctx.beginPath();
      ctx.moveTo(8, aimY);
      ctx.lineTo(xn, aimY);
      ctx.stroke();
      ctx.setLineDash([]);
      // Griff am linken Rand.
      ctx.fillStyle = paper;
      ctx.strokeStyle = accent;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(16, aimY, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.moveTo(13, aimY - 3.5);
      ctx.lineTo(13, aimY + 3.5);
      ctx.moveTo(19, aimY - 3.5);
      ctx.lineTo(19, aimY + 3.5);
      ctx.stroke();
      ctx.fillStyle = gray;
      ctx.fillText(`b = ${bb.toFixed(1)} fm`, 30, aimY - 10);

      // Geflogene Bahn (voll, fahl) + aktiver Kopf (kräftig).
      const pts = path.pts;
      if (pts.length > 1) {
        ctx.strokeStyle = gray;
        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.55;
        ctx.beginPath();
        pts.forEach((p, i) => {
          const px = m.X(p.x);
          const py = m.Y(p.y);
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.stroke();
        ctx.globalAlpha = 1;
        const head = clamp(Math.floor(fl.prog), 0, pts.length - 1);
        if (head > 1) {
          ctx.strokeStyle = accent;
          ctx.lineWidth = 2;
          ctx.beginPath();
          for (let i = 0; i <= head; i++) {
            const px = m.X(pts[i].x);
            const py = m.Y(pts[i].y);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.stroke();
        }
        // Alpha-Teilchen am Kopf.
        const hp = pts[head];
        const hx = m.X(hp.x);
        const hy = m.Y(hp.y);
        ctx.fillStyle = ALPHA;
        ctx.beginPath();
        ctx.arc(hx, hy, 5, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = paper;
        ctx.font = "bold 7px ui-monospace, monospace";
        ctx.fillText("α", hx - 3.5, hy + 2.5);
        // Asymptoten-Winkel am Ausgang.
        if (head > pts.length - 4) {
          const tail = pts[Math.max(0, pts.length - 60)];
          const ang = Math.atan2(m.Y(tail.y) - m.Y(hp.y), m.X(hp.x) - m.X(tail.x));
          const lx = hx + 44 * Math.cos(ang);
          const ly = hy + 44 * Math.sin(ang);
          ctx.strokeStyle = accent;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(hx + 8, hy);
          ctx.lineTo(lx, ly);
          ctx.stroke();
        }
      }

      // Kern: massiv, mit Ladungslabel.
      ctx.fillStyle = NUCLEUS;
      ctx.beginPath();
      ctx.arc(xn, m.Y(0), 11, 0, 2 * Math.PI);
      ctx.fill();
      ctx.strokeStyle = paper;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(xn, m.Y(0), 11, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 8px ui-monospace, monospace";
      ctx.fillText("+79", xn - 9, m.Y(0) + 3);
      ctx.fillStyle = ink;
      ctx.font = "10px ui-monospace, monospace";
      ctx.fillText("Au-Kern", xn - 24, m.Y(0) + 26);

      // Einfallspfeil links unten.
      ctx.strokeStyle = gray;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(34, h - 44);
      ctx.lineTo(74, h - 44);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(74, h - 48);
      ctx.lineTo(82, h - 44);
      ctx.lineTo(74, h - 40);
      ctx.closePath();
      ctx.fillStyle = gray;
      ctx.fill();
      ctx.fillText("α (v₀)", 36, h - 50);
    };

    const loop = () => {
      const fl = flightRef.current;
      const n = pathRef.current.pts.length;
      if (playRef.current && n > 1) {
        fl.prog += Math.max(0.6, n / 160); // ~2.5 s pro Durchlauf
        if (fl.prog >= n - 1) {
          fl.prog = n - 1;
          fl.playing = false;
          playRef.current = false;
          setPlaying(false);
        }
      }
      draw();
      frameRef.current += 1;
      // 6-Frame-Drossel: HUD nur alle 6 Frames synchronisieren.
      if (frameRef.current % 6 === 0) {
        const pts = pathRef.current.pts;
        const head = pts[clamp(Math.floor(fl.prog), 0, pts.length - 1)];
        if (head) setHud({ hx: head.x, hy: head.y });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  // ---- Abgeleitete Messgroessen (exakt aus State, nicht aus Frames) ----
  const thetaA = thetaAnalyticDeg(b, energy);
  const thetaN = pathRef.current?.thetaDeg ?? thetaA;
  const dFm = closestApproachFm(energy);
  const isBig = thetaA > 90;
  const quote = stats.n > 0 ? (100 * stats.big) / stats.n : 0;

  // Ziellinie per Zeiger vertikal ziehen (Pointer-Capture haelt die Geste).
  const bFromClientY = (clientY: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return b;
    const rect = canvas.getBoundingClientRect();
    const h = rect.height;
    const PAD = 14;
    const s = Math.min((rect.width - 2 * PAD) / 760, (h - 2 * PAD) / 300);
    const cy0 = h * 0.52;
    const yFm = (cy0 - (clientY - rect.top)) / s;
    return clamp(Math.round(yFm * 10) / 10, B_MIN, B_MAX);
  };

  const handleAimDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setB(bFromClientY(e.clientY));
  };
  const handleAimMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    setB(bFromClientY(e.clientY));
  };
  const handleAimUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Zeiger bereits freigegeben.
    }
  };

  const countShot = (thDeg: number) =>
    setStats((s) => ({ n: s.n + 1, big: s.big + (thDeg > 90 ? 1 : 0) }));

  const handleFire = () => {
    flightRef.current.prog = 0;
    flightRef.current.playing = true;
    playRef.current = true;
    setPlaying(true);
    countShot(thetaAnalyticDeg(b, energy));
  };

  const handleSeries = () => {
    let add = 0;
    for (let i = 0; i < 200; i++) {
      if (thetaAnalyticDeg(randomImpactFm(), energy) > 90) add++;
    }
    setStats((s) => ({ n: s.n + 200, big: s.big + add }));
    handleFire();
  };

  const handleResetStats = () => setStats({ n: 0, big: 0 });

  const handleExport = () => {
    const summary =
      lang === "de"
        ? `Rutherford-Streuung (Au, Z=79): b = ${b.toFixed(1)} fm, E = ${energy.toFixed(1)} MeV. ` +
          `Streuwinkel θ = 2·arctan(K/2Eb) = ${thetaA.toFixed(1)}° (numerisch ${thetaN.toFixed(1)}°); ` +
          `frontaler Naechstabstand d = K/E = ${dFm.toFixed(1)} fm. ` +
          `Statistik: ${stats.n} Schuss, davon ${stats.big} mit θ > 90° (${quote.toFixed(1)} %). ` +
          `Deutung (Kernmodell): Grosswinkel-Rueckstreuung verlangt eine winzige, massive, positive Kernladung — das Plum-Pudding-Modell scheidet aus.`
        : `卢瑟福散射（Au 金核，Z=79）：瞄准距离 b = ${b.toFixed(1)} fm，入射能量 E = ${energy.toFixed(1)} MeV。` +
          `散射角 θ = 2·arctan(K/2Eb) = ${thetaA.toFixed(1)}°（数值积分 ${thetaN.toFixed(1)}°）；` +
          `正碰最近距离 d = K/E = ${dFm.toFixed(1)} fm。` +
          `统计：共 ${stats.n} 发，其中 ${stats.big} 发 θ > 90°（${quote.toFixed(1)}%）。` +
          `结论（核式结构）：大角度反弹要求原子质量与正电荷集中于微小原子核——排除枣糕模型。`;
    if (onExportFinding) {
      onExportFinding(summary);
    } else {
      try {
        void navigator.clipboard.writeText(summary);
      } catch {
        // Zwischenablage nicht verfuegbar.
      }
    }
  };

  // θ(b)-Kennlinie fuer den Arbeitspunkt (zustandsgesteuert, kein rAF).
  const PLOT = { x0: 44, x1: 524, y0: 14, y1: 118 };
  const gx = (bb: number) => PLOT.x0 + (bb / B_MAX) * (PLOT.x1 - PLOT.x0);
  const gy = (th: number) => PLOT.y1 - clamp(th / 180, 0, 1) * (PLOT.y1 - PLOT.y0);
  const curvePts: string[] = [];
  for (let i = 0; i <= 60; i++) {
    const bb = (B_MAX * i) / 60;
    curvePts.push(`${i === 0 ? "M" : "L"} ${gx(bb).toFixed(1)} ${gy(thetaAnalyticDeg(bb, energy)).toFixed(1)}`);
  }
  const opX = gx(clamp(b, 0, B_MAX));
  const opY = gy(thetaA);

  return (
    <div className="space-y-4">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Kernphysik · Streuexperiment" : "核物理 · 散射实验"}
          </span>
          <span className="text-[var(--gray)]">/</span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Rutherford-Streuung: Kernmodell & Grosswinkel" : "卢瑟福散射：核式结构与大角度反弹"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] p-0.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => {
                setB(25);
              }}
              className="cursor-pointer rounded px-2 py-0.5 text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)]"
            >
              {lang === "de" ? "Streifschuss" : "擦边掠射"}
            </button>
            <button
              type="button"
              onClick={() => {
                setB(8);
              }}
              className="cursor-pointer rounded px-2 py-0.5 text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)]"
            >
              {lang === "de" ? "Mittel" : "中等"}
            </button>
            <button
              type="button"
              onClick={() => {
                setB(0.5);
              }}
              className="cursor-pointer rounded px-2 py-0.5 text-[var(--ink)] transition-colors hover:bg-[var(--paper-subtle)]"
            >
              {lang === "de" ? "Zentral" : "正碰"}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 font-mono text-xs text-[var(--ink)] transition-colors hover:border-[var(--accent)]"
          >
            <span>{showPanels ? "◧" : "◩"}</span>
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : lang === "de" ? "Ausklappen" : "展开面板"}</span>
          </button>
        </div>
      </div>

      {/* Hauptgitter: Buehne 8 / Steuerung 4 */}
      <div className={`grid gap-5 ${showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        {/* Buehne */}
        <div className={`flex flex-col ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="relative flex h-[420px] flex-col overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] sm:h-[480px]">
            <canvas
              ref={canvasRef}
              onPointerDown={handleAimDown}
              onPointerMove={handleAimMove}
              onPointerUp={handleAimUp}
              onPointerCancel={handleAimUp}
              className="block min-h-0 w-full flex-1 cursor-grab touch-none select-none active:cursor-grabbing"
              role="img"
              aria-label={lang === "de" ? "Rutherford-Streubuehne mit ziehbarer Ziellinie" : "卢瑟福散射台与可拖拽瞄准线"}
            />
            {/* Messwert-HUD */}
            <div className="pointer-events-none absolute right-3 top-3 w-52 space-y-1 rounded border border-[var(--line)] bg-[var(--surface)] p-2 font-mono text-[11px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Streuwinkel θ(b)" : "散射角 θ(b)"}
              </div>
              <div className="text-lg font-bold leading-tight text-[var(--ink)]">{thetaA.toFixed(1)}°</div>
              <div className="text-[var(--gray)]">
                {lang === "de" ? `numerisch ${thetaN.toFixed(1)}° · d = ${dFm.toFixed(1)} fm` : `数值 ${thetaN.toFixed(1)}° · d = ${dFm.toFixed(1)} fm`}
              </div>
              <div
                className="border-t border-[var(--line)] pt-1 font-bold"
                style={{ color: isBig ? "var(--accent)" : "var(--gray)" }}
              >
                {isBig
                  ? lang === "de"
                    ? "Rückstreuung θ > 90°"
                    : "反弹 θ > 90°"
                  : lang === "de"
                    ? "Vorwärtsstreuung"
                    : "前向散射"}
              </div>
              <div className="text-[var(--gray)]">
                α ({hud.hx.toFixed(0)}, {hud.hy.toFixed(0)}) fm
              </div>
            </div>
            <div className="pointer-events-none absolute left-3 top-3 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
              {lang === "de" ? "Ziellinie (Ring) vertikal ziehen" : "上下拖动圆环瞄准线改变 b"}
            </div>

            {/* θ(b)-Pruefstreifen */}
            <div className="border-t border-[var(--line)]">
              <svg viewBox="0 0 560 150" className="h-[118px] w-full shrink-0 font-mono sm:h-[132px]" role="img" aria-label="theta-b-Kennlinie">
                {[0.25, 0.5, 0.75].map((t) => (
                  <line key={t} x1={PLOT.x0} y1={PLOT.y1 - t * (PLOT.y1 - PLOT.y0)} x2={PLOT.x1} y2={PLOT.y1 - t * (PLOT.y1 - PLOT.y0)} stroke="var(--line)" strokeWidth="1" />
                ))}
                <line x1={PLOT.x0} y1={gy(90)} x2={PLOT.x1} y2={gy(90)} stroke="var(--accent)" strokeWidth="1" strokeDasharray="5 4" />
                <text x={PLOT.x1 - 52} y={gy(90) - 4} fontSize="9" fill="var(--accent)">
                  90°
                </text>
                <path d={curvePts.join(" ")} fill="none" stroke="var(--ink)" strokeWidth="2" />
                <line x1={opX} y1={opY} x2={opX} y2={PLOT.y1} stroke="var(--gray)" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx={opX} cy={opY} r="4.5" fill="var(--accent)" stroke="var(--paper)" strokeWidth="1.5" />
                <line x1={PLOT.x0} y1="4" x2={PLOT.x0} y2={PLOT.y1 + 8} stroke="var(--gray)" strokeWidth="1" />
                <line x1={PLOT.x0 - 6} y1={PLOT.y1} x2={PLOT.x1 + 14} y2={PLOT.y1} stroke="var(--gray)" strokeWidth="1" />
                <text x="6" y="16" fontSize="9" fill="var(--gray)">
                  θ/°
                </text>
                <text x={PLOT.x1 - 8} y={PLOT.y1 + 22} fontSize="9" fill="var(--gray)">
                  b/fm
                </text>
                {[10, 20, 30, 40].map((bb) => (
                  <text key={bb} x={gx(bb)} y={PLOT.y1 + 22} textAnchor="middle" fontSize="8" fill="var(--gray)">
                    {bb}
                  </text>
                ))}
                <text x={PLOT.x0 + 8} y={PLOT.y0 + 14} fontSize="10" fontWeight="bold" fill="var(--ink)">
                  {`θ = ${thetaA.toFixed(1)}° @ b = ${b.toFixed(1)} fm`}
                </text>
                <text x={PLOT.x0 + 8} y={PLOT.y0 + 28} fontSize="9" fill="var(--gray)">
                  {lang === "de" ? "kleines b -> grosser Winkel (1/sin⁴(θ/2))" : "b 越小 -> 散射角越大（1/sin⁴(θ/2)）"}
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Steuerpanel */}
        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Stoss & Energie" : "瞄准与能量"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Stossparameter b:" : "瞄准距离 b:"}</span>
                  <span className="font-bold text-[var(--ink)]">{b.toFixed(1)} fm</span>
                </div>
                <input
                  type="range"
                  min={B_MIN}
                  max={B_MAX}
                  step={0.5}
                  value={b}
                  onChange={(e) => setB(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                  aria-label="b"
                />
              </div>
              <div className="space-y-1 border-t border-[var(--line)] pt-3">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Energie E:" : "入射能量 E:"}</span>
                  <span className="font-bold text-[var(--ink)]">{energy.toFixed(1)} MeV</span>
                </div>
                <input
                  type="range"
                  min={E_MIN}
                  max={E_MAX}
                  step={0.1}
                  value={energy}
                  onChange={(e) => setEnergy(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                  aria-label="E"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleFire}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--accent)] py-1.5 font-mono text-xs font-medium text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <path d="M4.5 2.5l8 5.5-8 5.5z" strokeLinejoin="round" />
                  </svg>
                  {lang === "de" ? "Schiessen" : "发射"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = !playing;
                    setPlaying(next);
                    flightRef.current.playing = next;
                    if (next && flightRef.current.prog >= pathRef.current.pts.length - 1) {
                      flightRef.current.prog = 0;
                    }
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] py-1.5 font-mono text-xs text-[var(--gray)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                    {playing ? <path d="M4.5 2.5v11M11.5 2.5v11" strokeLinecap="round" /> : <path d="M4.5 2.5l8 5.5-8 5.5z" strokeLinejoin="round" />}
                  </svg>
                  {playing ? (lang === "de" ? "Pause" : "暂停") : lang === "de" ? "Weiter" : "继续"}
                </button>
              </div>
              <button
                type="button"
                onClick={handleSeries}
                className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] py-1.5 font-mono text-xs text-[var(--gray)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {lang === "de" ? "Serie: 200 Schuss (Zufalls-b)" : "连发：200 次随机 b"}
              </button>
            </div>

            <div className="space-y-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">θ(b, E)</span>
                <strong className="text-[var(--ink)]">{thetaA.toFixed(1)}°</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">d = K/E</span>
                <strong className="text-[var(--ink)]">{dFm.toFixed(1)} fm</strong>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                <span className="text-[var(--gray)]">{lang === "de" ? "Serie (θ > 90°)" : "统计 (θ > 90°)"}</span>
                <strong style={{ color: GOLD }}>
                  {stats.big} / {stats.n}{stats.n > 0 ? ` (${quote.toFixed(1)} %)` : ""}
                </strong>
              </div>
              <button
                type="button"
                onClick={handleResetStats}
                className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] py-1 font-mono text-[11px] text-[var(--gray)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {lang === "de" ? "Statistik loeschen" : "清零统计"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Untere Viererzeile: Formel / KLP-Operator / CN / Export */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "01 · Formel" : "01 · 公式"}
          </div>
          <MathHtml code="V(r) = \frac{2Ze^2}{4\pi\varepsilon_0\,r} = \frac{K}{r}" display={true} cacheKey="rutherford:potential" />
          <MathHtml code="\cot\frac{\theta}{2} = \frac{2Eb}{K}, \quad \theta = 2\arctan\frac{K}{2Eb}" display={true} cacheKey="rutherford:theta" />
          <MathHtml code="d = \frac{K}{E}, \quad \frac{dN}{d\Omega} \propto \frac{1}{\sin^4(\theta/2)}" display={true} cacheKey="rutherford:rutherford-formel" />
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "02 · KLP / Operatoren" : "02 · 考纲 / 算子"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Q1 Atom- & Kernphysik (NRW-KLP): Streuversuch von Geiger–Marsden, Coulomb-Abstossung und Kernmodell. Grosswinkel-Ereignisse widerlegen die verteilte Ladung."
              : "Q1 原子与核物理（NRW 考纲）：盖革–马斯登散射实验、库仑排斥与核式模型。大角度事件证伪电荷弥散分布。"}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Operatoren: beschreiben (Bahn bei b, E), erklaeren (θ(b)-Abhaengigkeit), beurteilen (Kern- vs. Pudding-Modell anhand θ > 90°)."
              : "算子：beschreiben（描述不同 b、E 下轨道）、erklaeren（解释 θ(b) 依赖）、beurteilen（用 θ > 90° 评判核式 vs 枣糕模型）。"}
          </p>
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "03 · Verstaendnis (CN)" : "03 · 中文要点"}
          </div>
          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Kleines b heisst naher Vorbeiflug und starke Abstossung: θ waechst bis zur Rueckstreuung. Grosswinkel ist selten (kleine Trefferflaeche ~ Kernquerschnitt), aber entscheidend: Nur ein winziger, massiver Kern kann α-Teilchen zurueckwerfen."
              : "b 越小，飞掠越近、排斥越强：θ 增大直至反弹。大角度很稀有（命中截面小，正比于原子核截面），却是关键证据：只有微小而致密的原子核才能把 α 粒子弹回。"}
          </p>
        </div>
        <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "04 · Befund sichern" : "04 · 导出结论"}
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? `θ = ${thetaA.toFixed(1)}° (b = ${b.toFixed(1)} fm, E = ${energy.toFixed(1)} MeV), Serie ${stats.big}/${stats.n}.`
              : `θ = ${thetaA.toFixed(1)}°（b = ${b.toFixed(1)} fm，E = ${energy.toFixed(1)} MeV），统计 ${stats.big}/${stats.n}。`}
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="flex w-full items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--accent)] py-2 font-mono text-xs font-medium uppercase text-[var(--accent)] transition-colors hover:bg-[var(--accent)]/10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "de" ? "Befund uebernehmen" : "导出实验结论"}
          </button>
        </div>
      </div>
    </div>
  );
}
