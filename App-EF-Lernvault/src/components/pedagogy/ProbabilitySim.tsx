import { useEffect, useId, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface ProbabilitySimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

interface Ball {
  x: number;
  y: number;
  vy: number;
  row: number;
  off: number[];
  k: number;
}

interface UiSnap {
  total: number;
  counts: number[];
  mean: number;
  sd: number;
  maxDev: number;
  dropX: number;
}

function binom(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let c = 1;
  const m = Math.min(k, n - k);
  for (let i = 0; i < m; i += 1) {
    c = (c * (n - i)) / (i + 1);
  }
  return c;
}

function binomProb(n: number, k: number, p: number): number {
  const q = 1 - p;
  if (p <= 0) return k === 0 ? 1 : 0;
  if (p >= 1) return k === n ? 1 : 0;
  return binom(n, k) * Math.pow(p, k) * Math.pow(q, n - k);
}

function normalPdf(x: number, mu: number, sigma: number): number {
  if (sigma <= 1e-9) return 0;
  const z = (x - mu) / sigma;
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI));
}

/**
 * ProbabilitySim: Galton-Brett — Binomialverteilung live stapeln,
 * Normal-Approximation (mu = np, sigma^2 = npq) ueberlagern,
 * Gesetz der grossen Zahlen an der Konvergenz ablesen.
 */
export function ProbabilitySim({ lang, studioMode = true, onExportFinding }: ProbabilitySimProps) {
  const [layers, setLayers] = useState<number>(9);
  const [targetN, setTargetN] = useState<number>(500);
  const [batch, setBatch] = useState<number>(50);
  const [prob, setProb] = useState<number>(0.5);
  const [dropX, setDropX] = useState<number>(0.5);
  const [showNorm, setShowNorm] = useState<boolean>(true);
  const [showTheory, setShowTheory] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPanels, setShowPanels] = useState<boolean>(studioMode);
  const [ui, setUi] = useState<UiSnap>({ total: 0, counts: [], mean: 0, sd: 0, maxDev: 0, dropX: 0.5 });

  const layersId = useId();
  const targetId = useId();
  const batchId = useId();
  const probId = useId();
  const dropId = useId();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const histRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number>(0);
  const lastRef = useRef<number | null>(null);
  const dragRef = useRef<{ pointerId: number } | null>(null);

  const physRef = useRef({
    balls: [] as Ball[],
    queue: 0,
    counts: new Array<number>(10).fill(0),
    total: 0,
    n: 9,
    p: 0.5,
    target: 500,
    dropX: 0.5,
    playing: true,
    showNorm: true,
    showTheory: true,
  });

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  useEffect(() => {
    const p = physRef.current;
    p.n = layers;
    p.p = prob;
    p.target = targetN;
    p.dropX = dropX;
    p.playing = isPlaying;
    p.showNorm = showNorm;
    p.showTheory = showTheory;
  }, [layers, prob, targetN, dropX, isPlaying, showNorm, showTheory]);

  const resetBoard = (n: number) => {
    const p = physRef.current;
    p.balls = [];
    p.queue = 0;
    p.counts = new Array<number>(n + 1).fill(0);
    p.total = 0;
    setUi({ total: 0, counts: new Array<number>(n + 1).fill(0), mean: 0, sd: 0, maxDev: 0, dropX: p.dropX });
  };

  const handleLayers = (v: number) => {
    setLayers(v);
    physRef.current.n = v;
    resetBoard(v);
  };

  const handleProb = (v: number) => {
    const r = Math.round(v * 100) / 100;
    setProb(r);
    physRef.current.p = r;
    resetBoard(physRef.current.n);
  };

  const handleReset = () => resetBoard(physRef.current.n);

  const handleDrop = () => {
    const p = physRef.current;
    const remaining = Math.max(0, p.target - p.total - p.balls.length - p.queue);
    const add = Math.min(batch, remaining);
    if (add > 0) p.queue += add;
  };

  const spawnBall = () => {
    const p = physRef.current;
    const n = p.n;
    const off: number[] = [0];
    let k = 0;
    for (let r = 0; r < n; r += 1) {
      const right = Math.random() < p.p;
      if (right) k += 1;
      off.push(off[r] + (right ? 0.5 : -0.5));
    }
    p.balls.push({ x: p.dropX, y: 0.055, vy: 0.5 + Math.random() * 0.12, row: 0, off, k });
  };

  useEffect(() => {
    resetBoard(physRef.current.n);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    const boardGeom = (w: number, h: number, n: number) => {
      const m = 12;
      const topY = h * 0.1;
      const pinBottom = h * 0.58;
      const binTop = h * 0.62;
      const rowH = n > 1 ? (pinBottom - topY) / n : 0;
      const dx = Math.min((w - 2 * m - 24) / (n + 1), 34);
      const cx = w / 2;
      return { m, topY, pinBottom, binTop, rowH, dx, cx };
    };

    const targetX = (ball: Ball, dropXv: number, cx: number, dx: number): number => {
      const fall = Math.max(0, 1 - ball.row * 0.09);
      return cx + (dropXv * 2 - 1) * 46 * fall + ball.off[Math.min(ball.row, ball.off.length - 1)] * dx;
    };

    const drawBoard = (w: number, h: number, ctx: CanvasRenderingContext2D) => {
      const p = physRef.current;
      const n = p.n;
      const g = boardGeom(w, h, n);
      ctx.clearRect(0, 0, w, h);

      ctx.strokeStyle = "rgba(63,63,70,0.35)";
      ctx.lineWidth = 1;
      ctx.strokeRect(g.m, 8, w - 2 * g.m, h - 16);

      const funnelY = 10;
      const dropPx = g.cx + (p.dropX * 2 - 1) * 46;
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(dropPx - 26, funnelY);
      ctx.lineTo(dropPx - 9, funnelY + 16);
      ctx.moveTo(dropPx + 26, funnelY);
      ctx.lineTo(dropPx + 9, funnelY + 16);
      ctx.stroke();
      ctx.fillStyle = "#18181b";
      ctx.beginPath();
      ctx.arc(dropPx, funnelY + 4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fafafa";
      ctx.beginPath();
      ctx.arc(dropPx, funnelY + 4, 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3f3f46";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(lang === "de" ? "ziehen" : "拖动", dropPx, funnelY + 30);

      ctx.fillStyle = "#3f3f46";
      for (let r = 0; r < n; r += 1) {
        const y = g.topY + r * g.rowH + g.rowH * 0.5;
        for (let i = 0; i <= r; i += 1) {
          const x = g.cx + (i - r / 2) * g.dx;
          ctx.beginPath();
          ctx.arc(x, y, 2.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      const maxC = Math.max(1, ...p.counts);
      const binW = g.dx * 0.86;
      const binAreaH = h - g.binTop - 14;
      for (let k = 0; k <= n; k += 1) {
        const cxk = g.cx + (k - n / 2) * g.dx;
        const frac = p.counts[k] / maxC;
        const bh = Math.max(p.counts[k] > 0 ? 3 : 0, frac * binAreaH * 0.92);
        ctx.fillStyle = "rgba(37,99,235,0.78)";
        ctx.fillRect(cxk - binW / 2, h - 10 - bh, binW, bh);
        ctx.strokeStyle = "#3f3f46";
        ctx.lineWidth = 1;
        ctx.strokeRect(cxk - binW / 2, h - 10 - bh, Math.max(1, binW), Math.max(1, bh));
        if (n <= 12) {
          ctx.fillStyle = "#71717a";
          ctx.font = "8px ui-monospace, monospace";
          ctx.fillText(String(p.counts[k]), cxk, h - 14 - bh);
        }
        ctx.strokeStyle = "rgba(63,63,70,0.6)";
        ctx.beginPath();
        ctx.moveTo(cxk - g.dx / 2, g.binTop);
        ctx.lineTo(cxk - g.dx / 2, h - 10);
        ctx.stroke();
      }
      ctx.strokeStyle = "#3f3f46";
      ctx.beginPath();
      ctx.moveTo(g.cx - ((n + 1) / 2) * g.dx, g.binTop);
      ctx.lineTo(g.cx + ((n + 1) / 2) * g.dx, g.binTop);
      ctx.stroke();

      for (let i = 0; i < p.balls.length; i += 1) {
        const b = p.balls[i];
        const px = b.x;
        const py = b.y * h;
        ctx.fillStyle = "#dc2626";
        ctx.beginPath();
        ctx.arc(px, py, 3.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      ctx.fillStyle = "#71717a";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      ctx.fillText(`n=${n}  N=${p.total}/${p.target}`, g.m + 6, h - 14);
      ctx.textAlign = "right";
      ctx.fillText(`p=${p.p.toFixed(2)}`, w - g.m - 6, h - 14);
    };

    const drawHist = () => {
      const canvas = histRef.current;
      if (!canvas) return;
      const fit = fitCanvas(canvas);
      if (!fit) return;
      const { ctx, w, h } = fit;
      const p = physRef.current;
      const n = p.n;
      ctx.clearRect(0, 0, w, h);
      const L = 30;
      const R = 10;
      const T = 10;
      const B = 22;
      ctx.strokeStyle = "rgba(63,63,70,0.25)";
      ctx.lineWidth = 1;
      for (let gi = 0; gi <= 3; gi += 1) {
        const y = T + ((h - T - B) / 3) * gi;
        ctx.beginPath();
        ctx.moveTo(L, y);
        ctx.lineTo(w - R, y);
        ctx.stroke();
      }
      ctx.strokeStyle = "#3f3f46";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(L, T - 2);
      ctx.lineTo(L, h - B);
      ctx.lineTo(w - 4, h - B);
      ctx.stroke();

      const mu = n * p.p;
      const sigma = Math.sqrt(n * p.p * (1 - p.p));
      const probs: number[] = [];
      for (let k = 0; k <= n; k += 1) probs.push(binomProb(n, k, p.p));
      const peak = Math.max(0.05, ...probs, p.total > 0 ? Math.max(...p.counts) / p.total : 0);
      const px = (k: number) => L + ((k + 0.5) / (n + 1)) * (w - L - R);
      const bw = ((w - L - R) / (n + 1)) * 0.72;
      const py = (v: number) => h - B - (v / (peak * 1.15)) * (h - T - B);

      for (let k = 0; k <= n; k += 1) {
        const rel = p.total > 0 ? p.counts[k] / p.total : 0;
        const X = px(k);
        const Y = py(rel);
        ctx.fillStyle = "rgba(37,99,235,0.8)";
        ctx.fillRect(X - bw / 2, Y, bw, h - B - Y);
        ctx.strokeStyle = "#18181b";
        ctx.lineWidth = 1;
        ctx.strokeRect(X - bw / 2, Y, bw, Math.max(1, h - B - Y));
        if (p.showTheory) {
          const TY = py(probs[k]);
          ctx.strokeStyle = "#71717a";
          ctx.setLineDash([3, 2]);
          ctx.beginPath();
          ctx.moveTo(X - bw / 2, TY);
          ctx.lineTo(X + bw / 2, TY);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      if (p.showNorm && sigma > 1e-9) {
        ctx.strokeStyle = "#dc2626";
        ctx.lineWidth = 2;
        ctx.beginPath();
        const steps = Math.max(48, (n + 1) * 6);
        for (let s = 0; s <= steps; s += 1) {
          const x = (s / steps) * n;
          const y = normalPdf(x, mu, sigma);
          const X = L + ((x + 0.5) / (n + 1)) * (w - L - R);
          const Y = py(y);
          if (s === 0) ctx.moveTo(X, Y);
          else ctx.lineTo(X, Y);
        }
        ctx.stroke();
      }

      ctx.fillStyle = "#3f3f46";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText("k", w - R - 2, h - 8);
      ctx.textAlign = "left";
      ctx.fillText(lang === "de" ? "rel. Haeufigkeit" : "相对频率", 4, T + 2);
    };

    const loop = (now: number) => {
      if (lastRef.current === null) lastRef.current = now;
      const dt = Math.min((now - lastRef.current) / 1000, 0.05);
      lastRef.current = now;
      const p = physRef.current;
      const canvas = canvasRef.current;
      const fit = canvas ? fitCanvas(canvas) : null;

      if (p.playing && fit) {
        let spawnBudget = 4;
        while (p.queue > 0 && spawnBudget > 0) {
          spawnBall();
          p.queue -= 1;
          spawnBudget -= 1;
        }
        const g = boardGeom(fit.w, fit.h, p.n);
        const binTopN = g.binTop / fit.h;
        for (let i = p.balls.length - 1; i >= 0; i -= 1) {
          const b = p.balls[i];
          b.y += (b.vy * dt * 60 * 0.011 * 60) / 60;
          const rowFloat = (b.y * fit.h - g.topY) / Math.max(1, g.rowH);
          const targetRow = Math.max(0, Math.min(p.n, Math.floor(rowFloat) + 1));
          if (targetRow > b.row) b.row = targetRow;
          const tx = targetX(b, p.dropX, g.cx, g.dx);
          b.x += (tx - b.x) * Math.min(1, dt * 7);
          if (b.y >= binTopN || b.row >= p.n + 2) {
            const k = Math.max(0, Math.min(p.n, b.k));
            p.counts[k] += 1;
            p.total += 1;
            p.balls.splice(i, 1);
          }
        }
        drawBoard(fit.w, fit.h, fit.ctx);
      } else if (fit) {
        drawBoard(fit.w, fit.h, fit.ctx);
      }
      drawHist();

      frameRef.current += 1;
      if (frameRef.current % 8 === 0) {
        const n = p.n;
        let mean = 0;
        if (p.total > 0) {
          let s = 0;
          for (let k = 0; k <= n; k += 1) s += k * p.counts[k];
          mean = s / p.total;
        }
        let v = 0;
        if (p.total > 0) {
          for (let k = 0; k <= n; k += 1) v += p.counts[k] * (k - mean) * (k - mean);
          v /= p.total;
        }
        let maxDev = 0;
        for (let k = 0; k <= n; k += 1) {
          const rel = p.total > 0 ? p.counts[k] / p.total : 0;
          const th = binomProb(n, k, p.p);
          maxDev = Math.max(maxDev, Math.abs(rel - th));
        }
        setUi({
          total: p.total,
          counts: [...p.counts],
          mean,
          sd: Math.sqrt(Math.max(0, v)),
          maxDev,
          dropX: p.dropX,
        });
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [lang]);

  const dropPxToNorm = (clientX: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return physRef.current.dropX;
    const rect = canvas.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const v = 0.5 + (clientX - cx) / 92;
    return Math.max(0.15, Math.min(0.85, Math.round(v * 200) / 200));
  };

  const handleStageDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const y = e.clientY - rect.top;
    if (y > rect.height * 0.14) return;
    const v = dropPxToNorm(e.clientX);
    physRef.current.dropX = v;
    setDropX(v);
    dragRef.current = { pointerId: e.pointerId };
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const handleStageMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    const v = dropPxToNorm(e.clientX);
    physRef.current.dropX = v;
    setDropX(v);
  };

  const handleStageUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const mu = layers * prob;
  const sigma = Math.sqrt(Math.max(0, layers * prob * (1 - prob)));
  const done = ui.total >= targetN && ui.total > 0;
  const converged = ui.total >= 200 && ui.maxDev < 0.03;

  const handleExport = () => {
    const text =
      lang === "de"
        ? `Galton-Befund: n = ${layers}, N = ${ui.total}/${targetN}, p = ${prob.toFixed(2)}, Einlass x = ${ui.dropX.toFixed(2)}. Theorie: P(k) = C(n,k) p^k q^(n-k), mu = np = ${mu.toFixed(2)}, sigma^2 = npq = ${(sigma * sigma).toFixed(2)}, sigma = ${sigma.toFixed(2)}. Messung: Mittel = ${ui.mean.toFixed(2)}, s = ${ui.sd.toFixed(2)}, max |rel - P| = ${ui.maxDev.toFixed(3)}. ${converged ? "Histogramm konvergiert gegen Binomialform und Normalkurve (Gesetz der grossen Zahlen)." : "Bei kleinem N dominiert Zufallsstreuung; N erhoehen, dann naehert sich das Histogramm der Theorie."}`
        : `高尔顿板记录：钉层 n = ${layers}，小球 N = ${ui.total}/${targetN}，p = ${prob.toFixed(2)}，投放口 x = ${ui.dropX.toFixed(2)}。理论：P(k) = C(n,k) p^k q^(n-k)，μ = np = ${mu.toFixed(2)}，σ² = npq = ${(sigma * sigma).toFixed(2)}，σ = ${sigma.toFixed(2)}。实测：均值 = ${ui.mean.toFixed(2)}，s = ${ui.sd.toFixed(2)}，最大 |频率 - 理论| = ${ui.maxDev.toFixed(3)}。${converged ? "直方图已收敛到二项分布与正态曲线（大数定律）。" : "N 较小时涨落主导；增大 N，直方图向理论收敛。"}`;
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
            {lang === "de" ? "Galton-Brett · Binomial und Normal" : "高尔顿板 · 二项分布与正态拟合"}
          </span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Vom Zufallspfad zur Glockenkurve" : "从随机小球到钟形曲线"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
          >
            {isPlaying ? (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 3v10M11 3v10" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M5 3l8 5-8 5z" strokeLinejoin="round" />
              </svg>
            )}
            <span>{isPlaying ? (lang === "de" ? "Pause" : "暂停") : lang === "de" ? "Start" : "开始"}</span>
          </button>
          <button
            type="button"
            onClick={handleDrop}
            className="flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs rounded border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--ink)] hover:bg-[var(--accent)]/20"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M8 2v9M4.5 7.5L8 11l3.5-3.5M2.5 13.5h11" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>{lang === "de" ? `+${batch} Kugeln` : `投放 ${batch} 球`}</span>
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
            <span>{showPanels ? (lang === "de" ? "Einklappen" : "折叠面板") : lang === "de" ? "Ausklappen" : "展开面板"}</span>
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
              className="w-full h-[420px] sm:h-[480px] block cursor-ew-resize touch-none select-none"
            />
          </div>
          <p className="font-mono text-[11px] text-[var(--gray)]">
            {lang === "de"
              ? "Einlass oben seitlich ziehen (Pointer-Capture); roter Punkt = fallende Kugel, blau = gestapelte Treffer."
              : "横向拖拽顶部投放口（指针捕获）；红点为下落小球，蓝色为堆积计数。"}
          </p>
          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-[var(--gray)] mb-2">
              <span>{lang === "de" ? "Binomial-Histogramm + Normalkurve" : "二项直方图 + 正态拟合曲线"}</span>
              <span className="tabular-nums">
                {lang === "de" ? "N" : "样本"} = {ui.total}/{targetN}
                {" · "}
                {lang === "de" ? "max-Abw." : "最大偏差"} = {ui.maxDev.toFixed(3)}
                {converged ? (lang === "de" ? " · konvergiert" : " · 已收敛") : ""}
                {done ? (lang === "de" ? " · Ziel erreicht" : " · 已达目标") : ""}
              </span>
            </div>
            <canvas ref={histRef} className="w-full h-[160px] block touch-none select-none" />
            <div className="flex flex-wrap gap-4 mt-1.5 font-mono text-[11px]">
              <span className="text-[var(--accent)]">{lang === "de" ? "Balken rel. Haeufigkeit" : "柱体＝相对频率"}</span>
              <span className="text-[var(--gray)]">{lang === "de" ? "gestrichelt P(k) Theorie" : "虚线＝理论 P(k)"}</span>
              <span className="text-[#dc2626]">{lang === "de" ? "rot Normalkurve" : "红色＝正态曲线"}</span>
            </div>
          </div>
        </div>

        {showPanels && (
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="border border-[var(--line)] bg-[var(--surface)] p-4 rounded-[var(--radius)] space-y-3.5">
              <h4 className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] font-semibold">
                {lang === "de" ? "Schichten, Kugeln und p" : "钉层数、小球数与概率 p"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={layersId} className="text-[var(--gray)]">
                    {lang === "de" ? "Nagelschichten n:" : "钉层数 n:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{layers}</span>
                </div>
                <input
                  id={layersId}
                  type="range"
                  min={4}
                  max={16}
                  step={1}
                  value={layers}
                  onChange={(e) => handleLayers(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={targetId} className="text-[var(--gray)]">
                    {lang === "de" ? "Kugelzahl N (Ziel):" : "小球总数 N（目标）:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{targetN}</span>
                </div>
                <input
                  id={targetId}
                  type="range"
                  min={100}
                  max={2000}
                  step={50}
                  value={targetN}
                  onChange={(e) => setTargetN(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={batchId} className="text-[var(--gray)]">
                    {lang === "de" ? "Abwurf-Batch:" : "单次投放批量:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{batch}</span>
                </div>
                <input
                  id={batchId}
                  type="range"
                  min={10}
                  max={200}
                  step={10}
                  value={batch}
                  onChange={(e) => setBatch(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={probId} className="text-[var(--gray)]">
                    {lang === "de" ? "Rechts-Wahrsch. p:" : "右偏概率 p:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{prob.toFixed(2)}</span>
                </div>
                <input
                  id={probId}
                  type="range"
                  min={0.1}
                  max={0.9}
                  step={0.05}
                  value={prob}
                  onChange={(e) => handleProb(Number(e.target.value))}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <label htmlFor={dropId} className="text-[var(--gray)]">
                    {lang === "de" ? "Einlass x:" : "投放口 x:"}
                  </label>
                  <span className="font-bold text-[var(--ink)] tabular-nums">{dropX.toFixed(2)}</span>
                </div>
                <input
                  id={dropId}
                  type="range"
                  min={0.15}
                  max={0.85}
                  step={0.01}
                  value={dropX}
                  onChange={(e) => {
                    const v = Number(e.target.value);
                    setDropX(v);
                    physRef.current.dropX = v;
                  }}
                  className="w-full accent-[var(--accent)] cursor-pointer"
                />
              </div>
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowTheory(!showTheory)}
                  className={`flex-1 px-2 py-1 font-mono text-[11px] rounded border ${showTheory ? "border-[var(--accent)] bg-[var(--accent)]/10 font-semibold text-[var(--ink)]" : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--accent)]"}`}
                >
                  {lang === "de" ? "P(k)" : "理论 P(k)"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowNorm(!showNorm)}
                  className={`flex-1 px-2 py-1 font-mono text-[11px] rounded border ${showNorm ? "border-[var(--accent)] bg-[var(--accent)]/10 font-semibold text-[var(--ink)]" : "border-[var(--line)] text-[var(--gray)] hover:border-[var(--accent)]"}`}
                >
                  {lang === "de" ? "Normalkurve" : "正态曲线"}
                </button>
              </div>
            </div>

            <div className="border border-[var(--line)] bg-[var(--surface)] p-3.5 rounded-[var(--radius)] space-y-1.5 font-mono text-xs">
              <div className="font-semibold text-[var(--ink)] border-b border-[var(--line)] pb-1">
                {lang === "de" ? "Live-Messwerte" : "实时读数"}
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">mu = np:</span>
                <span className="font-bold tabular-nums">{mu.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">sigma:</span>
                <span className="font-bold tabular-nums">{sigma.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "Mittel (emp.):" : "实测均值:"}</span>
                <span className="font-bold tabular-nums">{ui.mean.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">{lang === "de" ? "max |rel - P|:" : "最大偏差:"}</span>
                <span className="font-bold tabular-nums">{ui.maxDev.toFixed(3)}</span>
              </div>
              <div className="border-t border-[var(--line)] pt-1.5 text-[11px] text-[var(--gray)]">
                {ui.total < 50
                  ? lang === "de"
                    ? "N klein: Streuung dominiert, Form noch zufaellig."
                    : "N 很小：涨落主导，形状仍随机。"
                  : converged
                    ? lang === "de"
                      ? "Gesetz der grossen Zahlen: rel. Haeufigkeit -> P(k), Kurve sitzt."
                      : "大数定律：相对频率趋向 P(k)，曲线贴合。"
                    : lang === "de"
                      ? "N waechst: Balken wandern Richtung Theorie."
                      : "N 增大：柱体向理论值靠拢。"}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-[var(--line)] pt-4">
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">01 · Formel</div>
          <MathHtml
            code="P(k)=\binom{n}{k}p^k q^{\,n-k},\;\;\mu=np,\;\;\sigma^2=npq"
            display={true}
            cacheKey="prob:formel-binom"
          />
          <MathHtml
            code="f(x)=\frac{1}{\sigma\sqrt{2\pi}}\,e^{-\frac{(x-\mu)^2}{2\sigma^2}},\;\;q=1-p"
            display={true}
            cacheKey="prob:formel-normal"
          />
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">02 · KLP / Operator</div>
          <p className="font-serif text-[13px] text-[var(--ink)]">
            {lang === "de"
              ? "NRW Mathe EF Stochastik: Binomialverteilung darstellen, Erwartungswert und Streuung berechnen, Normal-Approximation beurteilen."
              : "NRW 数学 EF 随机：呈现二项分布，计算期望与离散度，评价正态近似。"}
          </p>
          <p className="font-mono text-[11px] text-[var(--gray)]">Operatoren: darstellen · berechnen · beurteilen</p>
        </div>
        <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] p-3.5 space-y-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold">03 · CN 方法</div>
          <p className="text-xs text-[var(--ink)]">
            {lang === "de"
              ? "Jede Kugel sammelt n Links-Rechts-Entscheide; jede Schicht ist ein Bernoulli-Versuch. Klein-N wackelt, Gross-N sitzt: erst werfen, dann Kurve lesen."
              : "每个小球经历 n 次左右抉择，每层钉子就是一次伯努利试验。N 小则晃动、N 大则贴合：先投球堆数，再读曲线。"}
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
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M2.5 8h11M9.5 3.5L14 8l-4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "de" ? "Befund sichern" : "导出实验结论"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProbabilitySim;
