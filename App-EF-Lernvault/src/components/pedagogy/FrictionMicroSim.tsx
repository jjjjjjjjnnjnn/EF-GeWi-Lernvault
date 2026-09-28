import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface FrictionMicroSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

const G = 9.81;
const TRACK_HALF = 3.5;
const F_APP_MAX = 40;
const E_SCALE = 250;

interface UiSnap {
  x: number;
  v: number;
  fFric: number;
  sliding: boolean;
  eTherm: number;
}

function teethPoints(yBase: number, amp: number, x0: number, x1: number, step: number, up: boolean): string {
  const pts: string[] = [];
  let i = 0;
  for (let x = x0; x <= x1; x += step) {
    const y = i % 2 === 0 ? yBase : yBase + (up ? -amp : amp);
    pts.push(`${x},${y}`);
    i += 1;
  }
  return pts.join(" ");
}

/**
 * FrictionMicroSim: horizontal pull vs. static / kinetic friction.
 * F_app below mu_s*N -> block sticks (F_R = F_app, 45 deg line).
 * F_app above mu_s*N -> block slides (F_R = mu_k*N plateau, heat E_therm grows).
 */
export function FrictionMicroSim({ lang, studioMode: _studioMode = true, onExportFinding }: FrictionMicroSimProps) {
  const [fApp, setFApp] = useState<number>(8);
  const [mass, setMass] = useState<number>(2);
  const [muS, setMuS] = useState<number>(0.5);
  const [muK, setMuK] = useState<number>(0.3);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [ui, setUi] = useState<UiSnap>({ x: 0, v: 0, fFric: 0, sliding: false, eTherm: 0 });

  const fAppId = useId();
  const massId = useId();
  const muSId = useId();
  const muKId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const graphRef = useRef<HTMLCanvasElement | null>(null);
  const blockRectRef = useRef<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 });
  const dragRef = useRef<{ startX: number; startF: number } | null>(null);
  const frameRef = useRef<number>(0);
  const lastRef = useRef<number | null>(null);

  const physRef = useRef({
    x: 0,
    v: 0,
    fFric: 0,
    sliding: false,
    eTherm: 0,
    dragging: false,
    fApp,
    mass,
    muS,
    muK,
    playing: true,
  });

  useEffect(() => {
    const p = physRef.current;
    p.fApp = fApp;
    p.mass = mass;
    p.muS = muS;
    p.muK = muK;
    p.playing = isPlaying;
  }, [fApp, mass, muS, muK, isPlaying]);

  useEffect(() => {
    let animId = 0;

    const fitCanvas = (canvas: HTMLCanvasElement): { ctx: CanvasRenderingContext2D; w: number; h: number } | null => {
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const W = Math.max(1, Math.round(rect.width * dpr));
      const H = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== W || canvas.height !== H) {
        canvas.width = W;
        canvas.height = H;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { ctx, w: rect.width, h: rect.height };
    };

    const drawStage = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, w, h } = fit;
      const p = physRef.current;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const scale = (w - 90) / (TRACK_HALF * 2 + 1);
      const groundY = h * 0.58;
      const toPx = (xm: number) => cx + xm * scale;

      ctx.strokeStyle = "rgba(63,63,70,0.25)";
      ctx.lineWidth = 1;
      ctx.fillStyle = "#3f3f46";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      for (let m = -4; m <= 4; m += 1) {
        const px = toPx(m);
        ctx.beginPath();
        ctx.moveTo(px, groundY - 4);
        ctx.lineTo(px, groundY + 4);
        ctx.stroke();
        ctx.fillText(`${m} m`, px, groundY + 16);
      }

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(14, groundY);
      ctx.lineTo(w - 14, groundY);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(63,63,70,0.35)";
      for (let hx = 20; hx < w - 14; hx += 14) {
        ctx.beginPath();
        ctx.moveTo(hx, groundY);
        ctx.lineTo(hx - 7, groundY + 8);
        ctx.stroke();
      }

      const bw = 76;
      const bh = 50;
      const bx = toPx(p.x) - bw / 2;
      const by = groundY - bh;
      blockRectRef.current = { x: bx, y: by, w: bw, h: bh };

      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.rect(bx, by, bw, bh);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = "#3f3f46";
      ctx.font = "bold 11px ui-monospace, monospace";
      ctx.fillText(`${p.mass.toFixed(1)} kg`, bx + bw / 2, by + bh / 2 + 4);

      const midY = by + bh / 2;
      const arrowLen = (f: number) => Math.min(120, 14 + Math.abs(f) * 3.2);
      const head = (x: number, y: number, dir: 1 | -1, color: string) => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(x + dir * 8, y);
        ctx.lineTo(x, y - 5);
        ctx.lineTo(x, y + 5);
        ctx.closePath();
        ctx.fill();
      };

      ctx.strokeStyle = "#1e40af";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx + bw / 2, midY);
      ctx.lineTo(bx + bw / 2 + arrowLen(p.fApp), midY);
      ctx.stroke();
      head(bx + bw / 2 + arrowLen(p.fApp), midY, 1, "#1e40af");

      ctx.strokeStyle = "#065f46";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(bx + bw / 2, midY);
      ctx.lineTo(bx + bw / 2 - arrowLen(p.fFric), midY);
      ctx.stroke();
      head(bx + bw / 2 - arrowLen(p.fFric), midY, -1, "#065f46");

      ctx.font = "10px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillStyle = "#1e40af";
      ctx.fillText(`F_app = ${p.fApp.toFixed(1)} N`, bx + bw / 2 + 6, midY - 10);
      ctx.textAlign = "right";
      ctx.fillStyle = "#065f46";
      ctx.fillText(`F_R = ${p.fFric.toFixed(1)} N`, bx + bw / 2 - 6, midY + 20);

      if (Math.abs(p.v) > 0.05) {
        const dir: 1 | -1 = p.v > 0 ? 1 : -1;
        const vy = by - 18;
        ctx.strokeStyle = "#3f3f46";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 3]);
        ctx.beginPath();
        ctx.moveTo(bx + bw / 2, vy);
        ctx.lineTo(bx + bw / 2 + dir * 54, vy);
        ctx.stroke();
        ctx.setLineDash([]);
        head(bx + bw / 2 + dir * 54, vy, dir, "#3f3f46");
        ctx.fillStyle = "#3f3f46";
        ctx.textAlign = dir === 1 ? "left" : "right";
        ctx.fillText(`v = ${p.v.toFixed(2)} m/s`, bx + bw / 2 + dir * 60, vy + 3);
      }

      ctx.textAlign = "left";
      ctx.font = "bold 11px ui-monospace, monospace";
      if (p.sliding) {
        ctx.fillStyle = "#9f1239";
        ctx.fillText(lang === "de" ? "GLEITET (kinetisch)" : "滑动中 (动摩擦)", 14, 22);
      } else {
        ctx.fillStyle = "#065f46";
        ctx.fillText(lang === "de" ? "HAFTET (statisch)" : "静止 (静摩擦平衡)", 14, 22);
      }
    };

    const drawGraph = () => {
      const canvas = graphRef.current;
      if (!canvas) return;
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, w, h } = fit;
      const p = physRef.current;
      ctx.clearRect(0, 0, w, h);

      const N = p.mass * G;
      const fsMax = p.muS * N;
      const fk = Math.min(p.muK, p.muS) * N;
      const fLim = Math.max(20, fsMax * 1.6, p.fApp * 1.25, fk * 2);

      const L = 36;
      const R = 12;
      const T = 10;
      const B = 22;
      const px = (f: number) => L + (f / fLim) * (w - L - R);
      const py = (f: number) => h - B - (f / fLim) * (h - T - B);

      ctx.strokeStyle = "rgba(63,63,70,0.2)";
      ctx.lineWidth = 1;
      for (let g = 0; g <= 4; g += 1) {
        const f = (fLim / 4) * g;
        ctx.beginPath();
        ctx.moveTo(px(f), T);
        ctx.lineTo(px(f), h - B);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(L, py(f));
        ctx.lineTo(w - R, py(f));
        ctx.stroke();
      }

      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(L, T - 2);
      ctx.lineTo(L, h - B);
      ctx.lineTo(w - 6, h - B);
      ctx.stroke();
      ctx.fillStyle = "#3f3f46";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "right";
      ctx.fillText("F_R", L - 4, T + 2);
      ctx.textAlign = "left";
      ctx.fillText("F_app", w - 44, h - 8);

      ctx.strokeStyle = "#065f46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px(0), py(0));
      ctx.lineTo(px(fsMax), py(fsMax));
      ctx.stroke();

      ctx.strokeStyle = "#9f1239";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(px(fsMax), py(fsMax));
      ctx.lineTo(px(fsMax), py(fk));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.strokeStyle = "#065f46";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(px(fsMax), py(fk));
      ctx.lineTo(px(fLim), py(fk));
      ctx.stroke();

      ctx.fillStyle = "#3f3f46";
      ctx.textAlign = "center";
      ctx.fillText("µsN", px(fsMax), h - 8);
      ctx.textAlign = "right";
      ctx.fillText("µkN", L - 4, py(fk) + 3);

      const dotX = px(Math.min(p.fApp, fLim));
      const dotY = py(Math.min(p.fFric, fLim));
      ctx.fillStyle = "#3f3f46";
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(dotX, dotY, 4.5, 0, Math.PI * 2);
      ctx.stroke();
    };

    const loop = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const p = physRef.current;

      if (p.playing && !p.dragging) {
        const N = p.mass * G;
        const fsMax = p.muS * N;
        const fk = Math.min(p.muK, p.muS) * N;
        const F = p.fApp;
        const atRest = Math.abs(p.v) < 0.02;
        if (atRest && Math.abs(F) <= fsMax) {
          p.v = 0;
          p.fFric = F;
          p.sliding = false;
        } else {
          p.sliding = true;
          const dir = atRest ? Math.sign(F) || 1 : Math.sign(p.v);
          const fric = fk * dir;
          p.v += ((F - fric) / p.mass) * dt;
          if (!atRest && Math.sign(p.v) !== dir && Math.abs(F) <= fsMax) {
            p.v = 0;
            p.fFric = F;
            p.sliding = false;
          } else {
            p.x += p.v * dt;
            p.fFric = Math.abs(p.v) < 0.02 && Math.abs(F) <= fsMax ? F : fk * (Math.sign(p.v) || Math.sign(F) || 1);
            p.eTherm += Math.abs(fk * p.v) * dt;
          }
          if (p.x > TRACK_HALF) {
            p.x = TRACK_HALF;
            p.v = 0;
          } else if (p.x < -TRACK_HALF) {
            p.x = -TRACK_HALF;
            p.v = 0;
          }
        }
      } else if (p.dragging) {
        const N = p.mass * G;
        const fsMax = p.muS * N;
        p.fFric = Math.min(Math.abs(p.fApp), fsMax) * (p.fApp === 0 ? 0 : 1);
        p.sliding = Math.abs(p.fApp) > fsMax;
      }

      drawStage();
      drawGraph();

      frameRef.current += 1;
      if (frameRef.current % 6 === 0) {
        setUi({ x: p.x, v: p.v, fFric: p.fFric, sliding: p.sliding, eTherm: p.eTherm });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [lang]);

  const handleStageDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const bx = e.clientX - rect.left;
    const by = e.clientY - rect.top;
    const r = blockRectRef.current;
    const inside = bx >= r.x - 12 && bx <= r.x + r.w + 12 && by >= r.y - 12 && by <= r.y + r.h + 12;
    if (!inside) return;
    dragRef.current = { startX: e.clientX, startF: physRef.current.fApp };
    physRef.current.dragging = true;
    physRef.current.v = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handleStageMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const d = dragRef.current;
    if (!d) return;
    const next = Math.max(0, Math.min(F_APP_MAX, d.startF + ((e.clientX - d.startX) * 0.12)));
    setFApp(Math.round(next * 2) / 2);
  };

  const handleStageUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    physRef.current.dragging = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const handleReset = () => {
    const p = physRef.current;
    p.x = 0;
    p.v = 0;
    p.eTherm = 0;
    p.fFric = 0;
    p.sliding = false;
    setUi({ x: 0, v: 0, fFric: 0, sliding: false, eTherm: 0 });
  };

  const massNow = physRef.current.mass;
  const nNow = massNow * G;
  const fsMaxNow = muS * nNow;
  const fkNow = Math.min(muK, muS) * nNow;
  const slip = ui.sliding ? ((ui.x * 24) % 16 + 16) % 16 : 0;
  const thermPct = Math.max(0, Math.min(100, (ui.eTherm / E_SCALE) * 100));

  const handleExport = () => {
    const text =
      lang === "de"
        ? `Reibungslabor-Befund: m = ${mass} kg (N = ${nNow.toFixed(1)} N), µs = ${muS.toFixed(2)}, µk = ${muK.toFixed(2)}; F_app = ${fApp.toFixed(1)} N, Haftgrenze µsN = ${fsMaxNow.toFixed(1)} N, Gleitplateau µkN = ${fkNow.toFixed(1)} N; Zustand: ${ui.sliding ? "gleitet" : "haftet"} (F_R = ${ui.fFric.toFixed(1)} N, v = ${ui.v.toFixed(2)} m/s); dissipierte Wärme E_therm = ${ui.eTherm.toFixed(1)} J. Unterhalb der Grenze gilt F_R = F_app (45°-Gerade), darüber fällt F_R auf das Plateau µkN.`
        : `摩擦实验记录：m = ${mass} kg (正压力 N = ${nNow.toFixed(1)} N)，µs = ${muS.toFixed(2)}，µk = ${muK.toFixed(2)}；拉力 F_app = ${fApp.toFixed(1)} N，最大静摩 µsN = ${fsMaxNow.toFixed(1)} N，动摩平台 µkN = ${fkNow.toFixed(1)} N；状态：${ui.sliding ? "滑动" : "静止"} (F_R = ${ui.fFric.toFixed(1)} N，v = ${ui.v.toFixed(2)} m/s)；耗散热 E_therm = ${ui.eTherm.toFixed(1)} J。临界以下 F_R = F_app（45°直线），超过后突降至动摩平台 µkN。`;
    if (onExportFinding) {
      onExportFinding(text);
    } else {
      void navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="space-y-4 leading-[1.4]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Reibungslabor · Statik und Dynamik" : "摩擦实验室 · 静摩与动摩"}
          </span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Haftreibung kippt in Gleitreibung: Grenze und Dissipation" : "静摩突变为动摩：临界条件与能量耗散"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 3v10M11 3v10" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M5 3l8 5-8 5z" strokeLinejoin="round" />
              </svg>
            )}
            <span>{isPlaying ? (lang === "de" ? "Pause" : "暂停") : (lang === "de" ? "Start" : "开始")}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{lang === "de" ? "Reset" : "重置"}</span>
          </button>
          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
          >
            <span>{showPanels ? "◧" : "◩"}</span>
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : (lang === "de" ? "Ausklappen" : "展开面板")}</span>
          </button>
        </div>
      </div>

      <div className={`grid gap-5 ${showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        <div className={`flex flex-col space-y-3 ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="border border-[var(--line)] bg-[var(--paper)] rounded-[var(--radius)] overflow-hidden">
            <canvas
              ref={canvasRef}
              onPointerDown={handleStageDown}
              onPointerMove={handleStageMove}
              onPointerUp={handleStageUp}
              className="w-full h-[420px] sm:h-[480px] block cursor-grab active:cursor-grabbing touch-none select-none"
            />
          </div>
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de"
              ? "Klotz seitlich ziehen: Zugkraft F_app direkt aufprägen (Pointer-Capture)."
              : "横向拖拽物块：直接施加拉力 F_app（指针捕获）。"}
          </p>

          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="font-mono text-[11px] text-[var(--gray)] mb-2">
              {lang === "de" ? "F_R über F_app: Haftgerade (45°) bricht auf das µkN-Plateau ein" : "F_R–F_app 关系：静摩 45° 直线突降至 µkN 平台"}
            </div>
            <canvas ref={graphRef} className="w-full h-[140px] block touch-none select-none" />
          </div>

          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="flex items-center justify-between font-mono text-[11px] mb-1.5">
              <span className="text-[var(--gray)]">{lang === "de" ? "Dissipierte Wärme E_therm (Skala 250 J)" : "耗散热 E_therm（量程 250 J）"}</span>
              <span className="font-bold text-[#9f1239] tabular-nums">{ui.eTherm.toFixed(1)} J</span>
            </div>
            <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
              <div className="h-full bg-[#9f1239]" style={{ width: `${thermPct}%` }} />
            </div>
          </div>

          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="font-mono text-[11px] text-[var(--gray)] mb-2">
              {lang === "de" ? "Kontaktzone (Mikroverzahnung, schematisch)" : "接触面微观示意（几何锯齿，非写实）"}
            </div>
            <svg viewBox="0 0 320 96" className="w-full h-[110px] block select-none" role="img">
              <rect x="8" y="4" width="304" height="24" fill="#ffffff" stroke="#3f3f46" strokeWidth="1.5" />
              <g transform={`translate(${-slip},0)`}>
                <polyline
                  points={teethPoints(44, 12, -16, 336, 16, true)}
                  fill="none"
                  stroke="#3f3f46"
                  strokeWidth="1.5"
                  strokeLinejoin="miter"
                />
              </g>
              <polyline
                points={teethPoints(60, 12, 8, 312, 16, false)}
                fill="none"
                stroke="#3f3f46"
                strokeWidth="1.5"
                strokeLinejoin="miter"
              />
              <rect x="8" y="72" width="304" height="20" fill="var(--paper-subtle)" stroke="#3f3f46" strokeWidth="1.5" />
              <text x="160" y="20" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#3f3f46">
                {lang === "de" ? "Klotz (Asperiten)" : "物块底面（微凸体）"}
              </text>
              <text x="160" y="86" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fill="#3f3f46">
                {lang === "de" ? "Unterlage" : "支撑面"}
              </text>
            </svg>
          </div>
        </div>

        {showPanels && (
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="border border-[var(--line)] bg-[var(--surface)] p-4 rounded-[var(--radius)] space-y-3.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                {lang === "de" ? "Zugkraft und Material" : "拉力与接触面参数"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={fAppId} className="text-[var(--gray)]">
                    {lang === "de" ? "Zugkraft F_app:" : "水平拉力 F_app:"}
                  </label>
                  <span className="font-bold text-[#1e40af] tabular-nums">{fApp.toFixed(1)} N</span>
                </div>
                <input
                  id={fAppId}
                  type="range"
                  min={0}
                  max={F_APP_MAX}
                  step={0.5}
                  value={fApp}
                  onChange={(e) => setFApp(Number(e.target.value))}
                  className="w-full accent-[#1e40af] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={massId} className="text-[var(--gray)]">
                    {lang === "de" ? "Masse m:" : "质量 m:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{mass.toFixed(1)} kg</span>
                </div>
                <input
                  id={massId}
                  type="range"
                  min={0.5}
                  max={8}
                  step={0.5}
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={muSId} className="text-[var(--gray)]">
                    {lang === "de" ? "Haftzahl µs:" : "静摩因数 µs:"}
                  </label>
                  <span className="font-bold text-[#065f46] tabular-nums">{muS.toFixed(2)}</span>
                </div>
                <input
                  id={muSId}
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={muS}
                  onChange={(e) => setMuS(Number(e.target.value))}
                  className="w-full accent-[#065f46] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={muKId} className="text-[var(--gray)]">
                    {lang === "de" ? "Gleitzahl µk:" : "动摩因数 µk:"}
                  </label>
                  <span className="font-bold text-[#065f46] tabular-nums">{muK.toFixed(2)}</span>
                </div>
                <input
                  id={muKId}
                  type="range"
                  min={0.05}
                  max={0.9}
                  step={0.05}
                  value={muK}
                  onChange={(e) => setMuK(Number(e.target.value))}
                  className="w-full accent-[#065f46] cursor-pointer"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setFApp(Math.round(Math.min(F_APP_MAX, fsMaxNow) * 2) / 2)}
                  className="flex-1 px-2 py-1 font-mono text-[11px] rounded border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {lang === "de" ? "F = µsN (Kipppunkt)" : "F = µsN（临界点）"}
                </button>
                <button
                  type="button"
                  onClick={() => setFApp(0)}
                  className="flex-1 px-2 py-1 font-mono text-[11px] rounded border border-[var(--line)] text-[var(--ink)] hover:border-[var(--accent)]"
                >
                  {lang === "de" ? "F = 0" : "F = 0"}
                </button>
              </div>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-1.5 font-mono text-xs">
              <div className="font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-1">
                {lang === "de" ? "Live-Messwerte" : "实时读数"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Normalkraft N:" : "正压力 N:"}</span>
                <span className="font-bold tabular-nums">{nNow.toFixed(1)} N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#065f46]">{lang === "de" ? "Haftgrenze µsN:" : "最大静摩 µsN:"}</span>
                <span className="font-bold tabular-nums">{fsMaxNow.toFixed(1)} N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#065f46]">{lang === "de" ? "Gleitplateau µkN:" : "动摩平台 µkN:"}</span>
                <span className="font-bold tabular-nums">{fkNow.toFixed(1)} N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#1e40af]">{lang === "de" ? "Reibung F_R:" : "摩擦力 F_R:"}</span>
                <span className="font-bold tabular-nums">{ui.fFric.toFixed(1)} N</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Tempo v:" : "速度 v:"}</span>
                <span className="font-bold tabular-nums">{ui.v.toFixed(2)} m/s</span>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1">
                <span className="text-[#9f1239]">E_therm:</span>
                <span className="font-bold tabular-nums">{ui.eTherm.toFixed(1)} J</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[var(--line)] pt-4">
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">01 · Formel</div>
          <MathHtml
            code="F_{s,\max} = \mu_s N, \quad F_k = \mu_k N, \quad E_{\mathrm{therm}} = \int F_k \, ds"
            display={true}
            cacheKey="friction-micro:formel"
          />
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de" ? "N = m·g. Statik: F_R = F_app bis µsN." : "N = m·g。静止段 F_R = F_app，直至 µsN。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">02 · KLP / Operator</div>
          <p className="font-serif text-[13px] text-[var(--ink)]">
            {lang === "de"
              ? "NRW EF Mechanik: Haft- vs. Gleitreibung unterscheiden und den Bruch der F_R-Kurve mit Operator beschreiben / erläutern."
              : "NRW EF 力学：区分静摩与动摩，用 Operator 描述并解释 F_R 曲线突变。"}
          </p>
          <p className="font-mono text-[11px] text-[var(--gray)]">Operatoren: beschreiben · erläutern</p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">03 · CN 方法</div>
          <p className="text-xs text-[var(--ink)]">
            {lang === "de"
              ? "先算正压力与上限：N = mg，临界 µsN。拉力未超上限时静摩二力平衡；超过后按 µkN 滑动，摩擦做功全部耗散为热。"
              : "先算正压力与上限：N = mg，临界 µsN。拉力未超上限时静摩二力平衡；超过后按 µkN 滑动，摩擦做功全部耗散为热。"}
          </p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">04 · Befund</div>
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de" ? "Messung mit Kennzahlen sichern." : "导出本次测量的关键数据。"}
          </p>
          <button
            type="button"
            onClick={handleExport}
            className="w-full py-2 font-mono text-xs bg-[var(--surface)] border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent)]/10 rounded-[var(--radius)] font-medium flex items-center justify-center gap-1.5"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "de" ? "Befund sichern" : "导出实验结论"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FrictionMicroSim;
