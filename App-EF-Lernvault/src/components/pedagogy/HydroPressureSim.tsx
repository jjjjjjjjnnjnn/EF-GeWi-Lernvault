import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface HydroPressureSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type FluidId = "water" | "salt" | "mercury";

const G = 9.81;
const P0 = 101325;
const H_MAX = 10;

const FLUIDS: Record<FluidId, { rho: number; de: string; zh: string }> = {
  water: { rho: 1000, de: "Wasser", zh: "水" },
  salt: { rho: 1030, de: "Salzwasser", zh: "盐水" },
  mercury: { rho: 13534, de: "Quecksilber", zh: "水银" },
};

const PRESSURE_BLUE = "#1e40af";

function formatKpa(pa: number): string {
  return (pa / 1000).toFixed(1);
}

export function HydroPressureSim({ lang, studioMode: _studioMode = true, onExportFinding }: HydroPressureSimProps) {
  void _studioMode;
  const [fluid, setFluid] = useState<FluidId>("water");
  const [depth, setDepth] = useState(4);
  const [showPanels, setShowPanels] = useState(true);
  const [showValues, setShowValues] = useState(true);

  const rho = FLUIDS[fluid].rho;
  const pressure = P0 + rho * G * depth;
  const pMax = P0 + rho * G * H_MAX;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef({ dragging: false });
  const paramsRef = useRef({ depth, rho });
  paramsRef.current = { depth, rho };

  useEffect(() => {
    let raf = 0;

    const layout = (w: number, hgt: number) => {
      const pad = 14;
      const top = 30;
      const bottom = hgt - 34;
      const tankX0 = pad;
      const tankX1 = w * 0.32;
      const tubeX0 = w * 0.38;
      const tubeX1 = w * 0.6;
      const chartX0 = w * 0.66;
      const chartX1 = w - pad;
      return { pad, top, bottom, tankX0, tankX1, tubeX0, tubeX1, chartX0, chartX1 };
    };

    const loop = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          const rect = canvas.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0) {
            if (canvas.width !== Math.round(rect.width * dpr) || canvas.height !== Math.round(rect.height * dpr)) {
              canvas.width = Math.round(rect.width * dpr);
              canvas.height = Math.round(rect.height * dpr);
            }
            ctx.save();
            ctx.scale(dpr, dpr);
            const w = rect.width;
            const hgt = rect.height;
            const { depth: h, rho: r } = paramsRef.current;
            const L = layout(w, hgt);
            const surfY = L.top + 26;
            const yForDepth = (d: number) => surfY + (d / H_MAX) * (L.bottom - surfY);
            const narrow = w < 560;

            ctx.clearRect(0, 0, w, hgt);
            ctx.fillStyle = "#fafaf9";
            ctx.fillRect(0, 0, w, hgt);

            // ---------- Zone A: tank with probe ----------
            const fillColor =
              paramsRef.current.rho > 10000
                ? "rgba(113,113,122,0.40)"
                : paramsRef.current.rho > 1010
                  ? "rgba(13,148,136,0.25)"
                  : "rgba(59,130,246,0.22)";
            const lineColor = paramsRef.current.rho > 10000 ? "#52525b" : PRESSURE_BLUE;
            ctx.fillStyle = fillColor;
            ctx.fillRect(L.tankX0, surfY, L.tankX1 - L.tankX0, L.bottom - surfY);
            ctx.strokeStyle = "#57534e";
            ctx.lineWidth = 2;
            ctx.strokeRect(L.tankX0, L.top, L.tankX1 - L.tankX0, L.bottom - L.top);
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(L.tankX0, surfY);
            ctx.lineTo(L.tankX1, surfY);
            ctx.stroke();

            // depth ticks 0..10 m
            ctx.font = "9px monospace";
            ctx.fillStyle = "#78716c";
            ctx.textAlign = "left";
            for (let d = 0; d <= H_MAX; d += 2) {
              const y = yForDepth(d);
              ctx.strokeStyle = "#d6d3d1";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(L.tankX0, y);
              ctx.lineTo(L.tankX0 + 8, y);
              ctx.stroke();
              ctx.fillText(`${d} m`, L.tankX0 + 10, y - 2);
            }
            ctx.fillStyle = "#57534e";
            ctx.font = "10px monospace";
            ctx.fillText("h = 0", L.tankX0 + 2, surfY - 5);

            // probe at depth h
            const probeY = yForDepth(h);
            const probeX = (L.tankX0 + L.tankX1) / 2;
            ctx.strokeStyle = "#a8a29e";
            ctx.lineWidth = 1.5;
            ctx.setLineDash([4, 3]);
            ctx.beginPath();
            ctx.moveTo(probeX, surfY);
            ctx.lineTo(probeX, probeY);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.fillStyle = PRESSURE_BLUE;
            ctx.beginPath();
            ctx.arc(probeX, probeY, 9, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#1e3a8a";
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 8px monospace";
            ctx.textAlign = "center";
            ctx.fillText("p", probeX, probeY + 3);
            ctx.textAlign = "left";

            // probe readout
            const pNow = P0 + r * G * h;
            ctx.fillStyle = PRESSURE_BLUE;
            ctx.font = "bold 11px monospace";
            ctx.fillText(`${formatKpa(pNow)} kPa`, L.tankX0 + 2, L.bottom + 16);
            ctx.fillStyle = "#78716c";
            ctx.font = "9px monospace";
            ctx.fillText(`h = ${h.toFixed(1)} m`, L.tankX0 + 2, L.bottom + 27);

            if (!narrow) {
              // ---------- Zone B: U-tube (communicating vessels) ----------
              const ux0 = L.tubeX0;
              const ux1 = L.tubeX1;
              const um = (ux0 + ux1) / 2;
              const uTop = surfY;
              const uBot = L.bottom;
              const uLevel = surfY + (uBot - surfY) * 0.45;
              const armW = Math.max(14, (ux1 - ux0) * 0.22);
              ctx.fillStyle = fillColor;
              // left arm liquid
              ctx.fillRect(um - armW * 1.6, uLevel, armW, uBot - uLevel);
              // right arm liquid
              ctx.fillRect(um + armW * 0.6, uLevel, armW, uBot - uLevel);
              // bottom connector
              ctx.fillRect(um - armW * 1.6, uBot - armW, armW * 3.2, armW);
              // glass outline
              ctx.strokeStyle = "#57534e";
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(um - armW * 1.6, uTop);
              ctx.lineTo(um - armW * 1.6, uBot);
              ctx.lineTo(um + armW * 1.6, uBot);
              ctx.lineTo(um + armW * 1.6, uTop);
              ctx.stroke();
              ctx.beginPath();
              ctx.moveTo(um - armW * 0.6, uBot - armW);
              ctx.lineTo(um + armW * 0.6, uBot - armW);
              ctx.stroke();
              // equal-level marker
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.moveTo(um - armW * 1.6, uLevel);
              ctx.lineTo(um - armW * 0.6, uLevel);
              ctx.moveTo(um + armW * 0.6, uLevel);
              ctx.lineTo(um + armW * 1.6, uLevel);
              ctx.stroke();
              ctx.strokeStyle = "#a8a29e";
              ctx.lineWidth = 1;
              ctx.setLineDash([3, 3]);
              ctx.beginPath();
              ctx.moveTo(um - armW * 1.6, uLevel);
              ctx.lineTo(um + armW * 1.6, uLevel);
              ctx.stroke();
              ctx.setLineDash([]);
              ctx.fillStyle = "#57534e";
              ctx.font = "9px monospace";
              ctx.fillText("h1 = h2", um - 20, uTop - 6);
            }

            // ---------- Zone C: p-h line chart ----------
            const cx0 = narrow ? L.tankX1 + 12 : L.chartX0;
            const cx1 = w - 40;
            const cy0 = L.bottom;
            const cy1 = L.top + 8;
            const xFor = (d: number) => cx0 + 24 + (d / H_MAX) * (cx1 - cx0 - 30);
            const yForP = (p: number) => cy0 - ((p - P0) / Math.max(1, pMax - P0)) * (cy0 - cy1);
            // axes
            ctx.strokeStyle = "#57534e";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(cx0 + 24, cy1);
            ctx.lineTo(cx0 + 24, cy0);
            ctx.lineTo(cx1, cy0);
            ctx.stroke();
            // gridlines at 0/5/10 m
            ctx.font = "9px monospace";
            ctx.fillStyle = "#78716c";
            for (let d = 0; d <= H_MAX; d += 5) {
              const x = xFor(d);
              ctx.strokeStyle = "#e7e5e4";
              ctx.lineWidth = 1;
              ctx.beginPath();
              ctx.moveTo(x, cy1);
              ctx.lineTo(x, cy0);
              ctx.stroke();
              ctx.fillText(`${d}`, x - 3, cy0 + 12);
            }
            ctx.fillText("h / m", cx1 - 30, cy0 + 24);
            // p(h) line
            ctx.strokeStyle = PRESSURE_BLUE;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(xFor(0), yForP(P0));
            ctx.lineTo(xFor(H_MAX), yForP(pMax));
            ctx.stroke();
            // operating point
            const pNow2 = P0 + r * G * h;
            const ox = xFor(h);
            const oy = yForP(pNow2);
            ctx.fillStyle = PRESSURE_BLUE;
            ctx.beginPath();
            ctx.arc(ox, oy, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = "#ffffff";
            ctx.lineWidth = 1.5;
            ctx.stroke();
            // slope label
            ctx.fillStyle = PRESSURE_BLUE;
            ctx.font = "10px monospace";
            ctx.fillText(`dp/dh = ${(r * G / 1000).toFixed(2)} kPa/m`, cx0 + 26, cy1 + 2);
            ctx.fillStyle = "#78716c";
            ctx.font = "9px monospace";
            ctx.fillText(`p0 = ${(P0 / 1000).toFixed(1)} kPa`, cx0 + 26, cy1 + 14);

            ctx.restore();
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [pMax]);

  const depthFromPointer = (clientY: number, canvas: HTMLCanvasElement): number => {
    const rect = canvas.getBoundingClientRect();
    const surfY = 30 + 26;
    const bottom = rect.height - 34;
    const rel = (clientY - rect.top - surfY) / Math.max(1, bottom - surfY);
    return Math.max(0, Math.min(H_MAX, rel * H_MAX));
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    dragRef.current.dragging = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDepth(Number(depthFromPointer(e.clientY, canvas).toFixed(1)));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!dragRef.current.dragging) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    setDepth(Number(depthFromPointer(e.clientY, canvas).toFixed(1)));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    dragRef.current.dragging = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  const handleExport = () => {
    const text =
      lang === "de"
        ? `Hydrostatik-Befund: Fluessigkeit ${FLUIDS[fluid].de} (rho = ${rho} kg/m3), Tiefe h = ${depth.toFixed(1)} m, p(h) = p0 + rho*g*h = ${(P0 / 1000).toFixed(1)} + ${(rho * G * depth / 1000).toFixed(1)} = ${formatKpa(pressure)} kPa. Steigung dp/dh = rho*g = ${(rho * G / 1000).toFixed(2)} kPa/m; U-Rohr: h1 = h2.`
        : `静水压强实验结论：液体 ${FLUIDS[fluid].zh}（rho = ${rho} kg/m3），深度 h = ${depth.toFixed(1)} m，p(h) = p0 + rho*g*h = ${(P0 / 1000).toFixed(1)} + ${(rho * G * depth / 1000).toFixed(1)} = ${formatKpa(pressure)} kPa。直线斜率 dp/dh = rho*g = ${(rho * G / 1000).toFixed(2)} kPa/m；U 形管连通器：h1 = h2。`;
    if (onExportFinding) onExportFinding(text);
    else {
      void navigator.clipboard?.writeText(text);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
          {lang === "de" ? "Hydrostatischer Druck: p(h) = p0 + rho g h" : "液体压强与深度：p(h) = p0 + rho g h"}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--surface)] p-0.5 font-mono text-xs">
            <span className="px-1.5 text-[var(--gray)]">{lang === "de" ? "Fluid:" : "液体:"}</span>
            {(Object.keys(FLUIDS) as FluidId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => setFluid(id)}
                className={`cursor-pointer rounded px-2 py-0.5 ${
                  fluid === id
                    ? "bg-[var(--ink)] font-bold text-[var(--paper)]"
                    : "text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                }`}
              >
                {lang === "de" ? FLUIDS[id].de : FLUIDS[id].zh}
              </button>
            ))}
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

      {/* Grid 8:4 -> 12 */}
      <div className={`grid gap-5 ${showPanels ? "grid-cols-1 lg:grid-cols-12" : "grid-cols-1"}`}>
        <div className={`flex flex-col space-y-3 ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              className="block h-[420px] w-full cursor-grab touch-none select-none active:cursor-grabbing sm:h-[480px]"
            />
          </div>
          <div className="flex items-center justify-between rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2.5 font-mono text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-[var(--ink)]">
              <input
                type="checkbox"
                checked={showValues}
                onChange={(e) => setShowValues(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              <span>{lang === "de" ? "Messwerte am Becken einblenden" : "在水槽旁显示测量值"}</span>
            </label>
            {showValues && (
              <span className="font-bold" style={{ color: PRESSURE_BLUE }}>
                h = {depth.toFixed(1)} m · p = {formatKpa(pressure)} kPa
              </span>
            )}
          </div>
        </div>

        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Tiefe & Dichte" : "深度与密度"}
              </h4>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Sondentiefe (h):" : "探针深度 (h):"}</span>
                  <span className="font-bold text-[var(--ink)]">{depth.toFixed(1)} m</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={H_MAX}
                  step={0.1}
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                />
              </div>
              <div className="space-y-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">rho</span>
                  <strong className="text-[var(--ink)]">{rho} kg/m3</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">p0</span>
                  <strong className="text-[var(--ink)]">{(P0 / 1000).toFixed(1)} kPa</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--gray)]">rho·g·h</span>
                  <strong className="text-[var(--ink)]">{((rho * G * depth) / 1000).toFixed(1)} kPa</strong>
                </div>
                <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                  <span className="text-[var(--gray)]">p(h)</span>
                  <strong className="text-base" style={{ color: PRESSURE_BLUE }}>
                    {formatKpa(pressure)} kPa
                  </strong>
                </div>
              </div>
            </div>

            <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5">
              <div className="font-mono text-[10px] font-semibold uppercase text-[var(--accent)]">
                {lang === "de" ? "Pascal-Prinzip" : "帕斯卡原理注记"}
              </div>
              <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
                {lang === "de"
                  ? "Eine Druckaenderung am Kolben breitet sich im ruhenden Fluid nach allen Seiten gleichmaessig aus; im U-Rohr gilt h1 = h2, unabhaengig von der Schenkelweite."
                  : "加在密闭液体上的压强会大小不变地向各个方向传递；U 形管连通器同种液体静止时两侧液面等高（h1 = h2），与管粗细无关。"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Bottom four-track: Formel / KLP-Operator / CN / Export */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "01 · Formel" : "01 · 公式"}
          </div>
          <MathHtml code="p(h) = p_0 + \rho \cdot g \cdot h" display={true} cacheKey="hydro:druck-h" />
          <MathHtml code="\frac{dp}{dh} = \rho \cdot g, \quad \Delta p = \rho g \Delta h" display={true} cacheKey="hydro:steigung" />
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "02 · KLP / Operatoren" : "02 · 考纲 / 算子"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "EF Hydrostatik: Der Schweredruck waechst linear mit der Tiefe; die p-h-Gerade startet bei p0, ihre Steigung ist rho·g."
              : "EF 静水压强：压强随深度线性增大；p-h 直线截距为大气压 p0，斜率为 rho·g。"}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Operatoren: beschreiben (Anlage skizzieren), berechnen (p aus rho, g, h), erklaeren (U-Rohr-Gleichstand)."
              : "算子：beschreiben（画装置示意）、berechnen（由 rho、g、h 算 p）、erklaeren（解释 U 形管等高）。"}
          </p>
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "03 · Verstaendnis (CN)" : "03 · 中文要点"}
          </div>
          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Je dichter das Fluid, desto steiler die Gerade: Quecksilber steigt pro Meter etwa 13,5-mal so stark wie Wasser. Der U-Rohr-Gleichstand zeigt: Nur die Hoehe zaehlt, nicht die Form."
              : "液体密度越大，p-h 直线越陡：水银每米增压约为水的 13.5 倍。U 形管等高说明：压强只与高度差有关，与容器形状无关。"}
          </p>
        </div>
        <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "04 · Befund sichern" : "04 · 导出结论"}
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? `h = ${depth.toFixed(1)} m, rho = ${rho} kg/m3, p = ${formatKpa(pressure)} kPa.`
              : `h = ${depth.toFixed(1)} m，rho = ${rho} kg/m3，p = ${formatKpa(pressure)} kPa。`}
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

export default HydroPressureSim;
