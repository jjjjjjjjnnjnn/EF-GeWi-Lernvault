import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface BuoyancyDensitySimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type FluidId = "water" | "oil" | "salt";
type MaterialId = "wood" | "ice" | "iron" | "custom";
type SwimStatus = "float" | "suspend" | "sink";

const G = 9.81; // m/s^2
const EPS = 0.02; // kg/L, Dichtetoleranz fuer Schweben
const SURF_Y = 0.72; // Fluessigkeitsoberflaeche als Anteil der Beckenhoehe
const Y_MAX = 1.35;

const FLUIDS: { id: FluidId; rho: number; de: string; zh: string }[] = [
  { id: "water", rho: 1.0, de: "Wasser", zh: "纯水" },
  { id: "oil", rho: 0.85, de: "Oel", zh: "食用油" },
  { id: "salt", rho: 1.03, de: "Salzwasser", zh: "盐水" },
];

const PRESETS: { id: MaterialId; m: number; v: number; de: string; zh: string }[] = [
  { id: "wood", m: 2.5, v: 5.0, de: "Holz (0,50)", zh: "木块 (0.50)" },
  { id: "ice", m: 4.6, v: 5.0, de: "Eis (0,92)", zh: "冰块 (0.92)" },
  { id: "iron", m: 7.9, v: 1.0, de: "Eisen (7,87)", zh: "铁块 (7.87)" },
];

// Semantikfarben (tufte-nah, entsaettigt): Gewicht tiefrot, Auftrieb tiefblau.
const C_GRAV = "#b91c1c";
const C_BUOY = "#1e40af";
const C_SUSPEND = "#b45309";
const C_INK = "#292524";

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, v));
}

// Lineare Pfeillaenge (Vergleich F_A vs F_G bleibt ablesbar), begrenzt auf die Buehne.
function arrowLen(f: number): number {
  if (!(f > 0)) return 0;
  return clamp(f * 1.1, 6, 100);
}

export function BuoyancyDensitySim({ lang, studioMode = true, onExportFinding }: BuoyancyDensitySimProps) {
  const [fluid, setFluid] = useState<FluidId>("water");
  const [material, setMaterial] = useState<MaterialId>("wood");
  const [mass, setMass] = useState(2.5); // kg
  const [volume, setVolume] = useState(5.0); // L
  const [showVectors, setShowVectors] = useState(true);
  const [showPanels, setShowPanels] = useState(studioMode);

  useEffect(() => {
    setShowPanels(studioMode);
  }, [studioMode]);

  const rhoF = FLUIDS.find((f) => f.id === fluid)?.rho ?? 1.0;
  const rhoK = mass / Math.max(0.5, volume);

  const status: SwimStatus =
    Math.abs(rhoK - rhoF) <= EPS ? "suspend" : rhoK < rhoF ? "float" : "sink";

  const applyPreset = (id: MaterialId) => {
    const p = PRESETS.find((x) => x.id === id);
    if (!p) return;
    setMaterial(p.id);
    setMass(p.m);
    setVolume(p.v);
    stateRef.current.y = 1.1;
    stateRef.current.vy = 0;
  };

  const handleReset = () => {
    setFluid("water");
    setMaterial("wood");
    setMass(2.5);
    setVolume(5.0);
    stateRef.current.y = 1.1;
    stateRef.current.vy = 0;
  };

  // ---- Entkoppelter Bewegungskern (SOP: useRef + rAF, kein setState pro Frame) ----
  // Physik (y, vy, Eintauchtiefe) lebt im Ref und wird direkt auf Canvas gezeichnet.
  // React erhaelt nur alle 6 Frames gerundete Messwerte (V_sub, F_A, F_G, Waage).
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef({ y: 1.1, vy: 0, dragging: false, grabOff: 0 });
  const paramsRef = useRef({ rhoF, mass, volume, showVectors });
  useEffect(() => {
    paramsRef.current = { rhoF, mass, volume, showVectors };
  });

  const [metrics, setMetrics] = useState({ vSub: 0, fG: 0, fA: 0, scale: 0, frac: 0 });
  const frameRef = useRef(0);

  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) {
        raf = requestAnimationFrame(loop);
        return;
      }
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        raf = requestAnimationFrame(loop);
        return;
      }
      // Dynamische DPR: jede Bohrung prueft Groesse gegen CSS-Box.
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const wantW = Math.max(1, Math.round(rect.width * dpr));
      const wantH = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== wantW || canvas.height !== wantH) {
        canvas.width = wantW;
        canvas.height = wantH;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = rect.width;
      const h = rect.height;

      const p = paramsRef.current;
      const st = stateRef.current;

      // Beckengeometrie (proportional, folgt der Buehnenhoehe)
      const mL = 56;
      const mR = w - 56;
      const tankBottom = h - 64;
      const tankH = Math.max(180, h - 64 - 30);
      const tankTop = tankBottom - tankH;
      const surface = tankBottom - SURF_Y * tankH;

      // Blockkante aus Volumen (1 … 10 L -> ca. 56 … 83 px)
      const size = 34 + Math.cbrt(Math.max(0.5, p.volume)) * 22;

      // Eintauchtiefe aus Blocklage
      const bottomPix = tankBottom - st.y * tankH;
      const topPix = bottomPix - size;
      let frac = 0;
      if (bottomPix > surface && topPix < surface) frac = (bottomPix - surface) / size;
      else if (topPix >= surface) frac = 1;
      frac = clamp(frac, 0, 1);

      const vSub = frac * p.volume;
      const fG = p.mass * G;
      const fA = p.rhoF * vSub * G;

      if (!st.dragging) {
        const dt = 1 / 60;
        const damp = frac > 0 ? 6.0 : 0.6;
        const fNet = fA - fG - st.vy * damp;
        if (st.y <= 0 && fNet < 0) {
          st.y = 0;
          st.vy = Math.abs(st.vy) < 0.08 ? 0 : -st.vy * 0.15;
        } else {
          st.vy += (fNet / Math.max(0.2, p.mass)) * dt;
          st.vy = clamp(st.vy, -2.5, 2.5);
          st.y += st.vy * dt;
        }
        if (st.y > Y_MAX) {
          st.y = Y_MAX;
          st.vy = 0;
        }
      }

      const onGround = st.y <= 0.02;
      const scale = onGround ? Math.max(0, fG - fA) : 0;

      frameRef.current += 1;
      if (frameRef.current % 6 === 0) {
        setMetrics({
          vSub: Number(vSub.toFixed(2)),
          fG: Number(fG.toFixed(1)),
          fA: Number(fA.toFixed(1)),
          scale: Number(scale.toFixed(1)),
          frac: Number(frac.toFixed(3)),
        });
      }

      // ---- Zeichnung (Handarbeit, keine Abhaengigkeiten) ----
      ctx.clearRect(0, 0, w, h);

      // Fluessigkeit
      ctx.fillStyle =
        fluid === "water"
          ? "rgba(147, 197, 253, 0.35)"
          : fluid === "oil"
            ? "rgba(253, 224, 71, 0.30)"
            : "rgba(153, 246, 228, 0.35)";
      ctx.fillRect(mL, surface, mR - mL, tankBottom - surface);

      // Beckenkontur
      ctx.strokeStyle = "var(--gray)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mL, tankTop);
      ctx.lineTo(mL, tankBottom);
      ctx.lineTo(mR, tankBottom);
      ctx.lineTo(mR, tankTop);
      ctx.stroke();

      // Oberflaeche
      ctx.strokeStyle = fluid === "water" ? "#0369a1" : fluid === "oil" ? "#a16207" : "#0f766e";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mL, surface);
      ctx.lineTo(mR, surface);
      ctx.stroke();

      // Tiefenskala links (cm-Markierung der Eintauchtiefe)
      ctx.fillStyle = "var(--gray)";
      ctx.font = "9px ui-monospace, monospace";
      ctx.textAlign = "left";
      for (let i = 0; i <= 10; i++) {
        const yy = tankBottom - (i / 10) * tankH;
        ctx.fillRect(mL - (i % 5 === 0 ? 10 : 5), yy, i % 5 === 0 ? 10 : 5, 1);
        if (i % 5 === 0) ctx.fillText(`${i * 10}`, mL - 30, yy + 3);
      }

      // Waage am Beckenboden
      ctx.fillStyle = "var(--surface)";
      ctx.strokeStyle = "var(--gray)";
      ctx.lineWidth = 1.5;
      ctx.fillRect(mL + 24, tankBottom - 9, mR - mL - 48, 9);
      ctx.strokeRect(mL + 24, tankBottom - 9, mR - mL - 48, 9);
      ctx.fillStyle = C_INK;
      ctx.font = "bold 11px ui-monospace, monospace";
      ctx.textAlign = "center";
      ctx.fillText(`${scale.toFixed(1)} N`, (mL + mR) / 2, tankBottom + 18);

      // Block
      const bx = (mL + mR) / 2 - size / 2;
      const by = tankBottom - st.y * tankH - size;
      ctx.fillStyle =
        material === "wood" ? "#b45309" : material === "ice" ? "#bae6fd" : material === "iron" ? "#57534c" : "#4338ca";
      ctx.fillRect(bx, by, size, size);
      ctx.strokeStyle = C_INK;
      ctx.lineWidth = 2;
      ctx.strokeRect(bx, by, size, size);
      // Wasserlinie auf dem Block
      if (frac > 0 && frac < 1) {
        ctx.strokeStyle = fluid === "water" ? "#0369a1" : fluid === "oil" ? "#a16207" : "#0f766e";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 3]);
        ctx.beginPath();
        ctx.moveTo(bx - 8, surface);
        ctx.lineTo(bx + size + 8, surface);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      ctx.fillStyle = material === "ice" ? "#0c4a6e" : "#ffffff";
      ctx.font = "bold 11px ui-monospace, monospace";
      ctx.fillText(`${p.mass.toFixed(1)}kg`, bx + size / 2, by + size / 2 - 3);
      ctx.font = "9px ui-monospace, monospace";
      ctx.fillText(`${p.volume.toFixed(1)}L`, bx + size / 2, by + size / 2 + 10);

      // Kraftvektoren F_G (abwaerts) vs F_A (aufwaerts)
      if (p.showVectors) {
        const cx = bx + size / 2;
        const cy = by + size / 2;
        const gLen = arrowLen(fG);
        ctx.strokeStyle = C_GRAV;
        ctx.fillStyle = C_GRAV;
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, cy + gLen);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy + gLen);
        ctx.lineTo(cx - 5, cy + gLen - 9);
        ctx.lineTo(cx + 5, cy + gLen - 9);
        ctx.closePath();
        ctx.fill();
        ctx.font = "10px ui-monospace, monospace";
        ctx.textAlign = "left";
        ctx.fillText(`F_G=${fG.toFixed(1)}N`, cx + 9, cy + gLen / 2 + 3);

        if (fA > 0.3) {
          const aLen = arrowLen(fA);
          ctx.strokeStyle = C_BUOY;
          ctx.fillStyle = C_BUOY;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(cx, cy - aLen);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx, cy - aLen);
          ctx.lineTo(cx - 5, cy - aLen + 9);
          ctx.lineTo(cx + 5, cy - aLen + 9);
          ctx.closePath();
          ctx.fill();
          ctx.fillText(`F_A=${fA.toFixed(1)}N`, cx + 9, cy - aLen / 2 + 3);
        }
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fluid, material]);

  // Koerper per Zeiger in der Tiefe verschieben (Pointer-Capture haelt die Geste).
  const simYFromClientY = (clientY: number): number => {
    const canvas = canvasRef.current;
    if (!canvas) return 1;
    const rect = canvas.getBoundingClientRect();
    const tankBottom = rect.height - 64;
    const tankH = Math.max(180, rect.height - 64 - 30);
    return clamp((tankBottom - (clientY - rect.top)) / tankH, 0, Y_MAX);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const st = stateRef.current;
    st.dragging = true;
    st.grabOff = simYFromClientY(e.clientY) - st.y;
    st.vy = 0;
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const st = stateRef.current;
    if (!st.dragging) return;
    st.y = clamp(simYFromClientY(e.clientY) - st.grabOff, 0, Y_MAX);
    st.vy = 0;
  };
  const endDrag = (e: React.PointerEvent<HTMLCanvasElement>) => {
    stateRef.current.dragging = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Zeiger bereits freigegeben.
    }
  };

  const handleExport = () => {
    const fluidName = FLUIDS.find((f) => f.id === fluid);
    const statusDE =
      status === "float" ? "schwimmt (rho_K < rho_Fl)" : status === "suspend" ? "schwebt (rho_K = rho_Fl)" : "sinkt (rho_K > rho_Fl)";
    const statusZH = status === "float" ? "漂浮 (rho_物 < rho_液)" : status === "suspend" ? "悬浮 (rho_物 = rho_液)" : "下沉 (rho_物 > rho_液)";
    const summary =
      lang === "de"
        ? `Auftrieb-Versuch: Fluessigkeit ${fluidName?.de} (rho_Fl = ${rhoF.toFixed(2)} kg/L), Koerper ${material} (m = ${mass.toFixed(1)} kg, V = ${volume.toFixed(1)} L, rho_K = ${rhoK.toFixed(2)} kg/L). V_sub = ${metrics.vSub} L, F_G = ${metrics.fG} N, F_A = ${metrics.fA} N, Waage = ${metrics.scale} N. Befund: Koerper ${statusDE}; F_A = rho_Fl * V_sub * g.`
        : `浮力实验：液体${fluidName?.zh}（rho_液 = ${rhoF.toFixed(2)} kg/L），物体${material}（m = ${mass.toFixed(1)} kg，V = ${volume.toFixed(1)} L，rho_物 = ${rhoK.toFixed(2)} kg/L）。V_排 = ${metrics.vSub} L，F_G = ${metrics.fG} N，F_A = ${metrics.fA} N，秤读数 = ${metrics.scale} N。结论：物体${statusZH}；F_A = rho_液 · V_排 · g。`;
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

  const lamps: { id: SwimStatus; de: string; zh: string; color: string }[] = [
    { id: "float", de: "Schwimmt", zh: "漂浮", color: C_BUOY },
    { id: "suspend", de: "Schwebt", zh: "悬浮", color: C_SUSPEND },
    { id: "sink", de: "Sinkt", zh: "下沉", color: C_GRAV },
  ];

  return (
    <div className="space-y-4">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "Hydrostatik · Auftrieb" : "流体静力学 · 浮力"}
          </span>
          <span className="text-[var(--gray)]">/</span>
          <h3 className="font-serif text-base font-semibold text-[var(--ink)]">
            {lang === "de" ? "Auftrieb & Dichte: Archimedisches Prinzip" : "浮力与密度：阿基米德原理"}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 rounded border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1 font-mono text-xs text-[var(--gray)] transition-colors hover:border-[var(--ink)] hover:text-[var(--ink)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5v3h-3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {lang === "de" ? "Zuruecksetzen" : "重置"}
          </button>
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
        <div className={`flex flex-col space-y-3 ${showPanels ? "lg:col-span-8" : "col-span-12"}`}>
          <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)]">
            <canvas
              ref={canvasRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
              className="block h-[420px] w-full cursor-grab touch-none select-none active:cursor-grabbing sm:h-[480px]"
              role="img"
              aria-label={lang === "de" ? "Auftriebsbecken mit ziehbarem Koerper" : "浮力水槽与可拖动物体"}
            />
            {/* Messwert-HUD */}
            <div className="pointer-events-none absolute right-3 top-3 w-48 space-y-1 rounded border border-[var(--line)] bg-[var(--surface)] p-2 font-mono text-[11px]">
              <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--gray)]">
                {lang === "de" ? "Eintauchvolumen" : "排开液体体积"}
              </div>
              <div className="text-lg font-bold leading-tight text-[var(--ink)]">{metrics.vSub.toFixed(2)} L</div>
              <div className="text-[var(--gray)]">
                F_A = {metrics.fA.toFixed(1)} N · F_G = {metrics.fG.toFixed(1)} N
              </div>
              <div className="border-t border-[var(--line)] pt-1 text-[var(--gray)]">
                {lang === "de" ? `Waage: ${metrics.scale.toFixed(1)} N` : `底部秤：${metrics.scale.toFixed(1)} N`}
              </div>
            </div>
            <div className="pointer-events-none absolute left-3 top-3 rounded border border-[var(--line)] bg-[var(--surface)] px-2 py-0.5 font-mono text-[10px] text-[var(--gray)]">
              {lang === "de" ? "Koerper ziehen & loslassen" : "拖动物体改变浸没深度后释放"}
            </div>
          </div>

          {/* Vektorenschalter + Schwimmampel */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2.5 font-mono text-xs">
            <label className="flex cursor-pointer items-center gap-2 text-[var(--ink)]">
              <input
                type="checkbox"
                checked={showVectors}
                onChange={(e) => setShowVectors(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              <span>{lang === "de" ? "Kraeftevergleich F_A vs F_G" : "受力对比 F_A 与 F_G"}</span>
            </label>
            <div className="flex items-center gap-2" role="status">
              {lamps.map((l) => {
                const active = status === l.id;
                return (
                  <span
                    key={l.id}
                    className={`flex items-center gap-1.5 rounded border px-2 py-0.5 ${active ? "font-bold" : ""}`}
                    style={{
                      borderColor: active ? l.color : "var(--line)",
                      color: active ? l.color : "var(--gray)",
                    }}
                  >
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ backgroundColor: active ? l.color : "transparent", border: `1px solid ${l.color}` }}
                    />
                    {lang === "de" ? l.de : `${l.de} ${l.zh}`}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        {/* Steuerpanel */}
        {showPanels && (
          <div className="flex flex-col space-y-4 lg:col-span-4">
            <div className="space-y-3.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {lang === "de" ? "Fluessigkeit & Koerper" : "液体与物体"}
              </h4>
              <div className="space-y-1">
                <span className="block font-mono text-xs text-[var(--gray)]">
                  {lang === "de" ? "Fluessigkeit (rho_Fl):" : "液体 (rho_液):"}
                </span>
                <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                  {FLUIDS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => setFluid(f.id)}
                      className={`cursor-pointer rounded border p-1.5 text-center transition-colors ${
                        fluid === f.id
                          ? "border-[var(--accent)] font-bold text-[var(--accent)]"
                          : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {lang === "de" ? f.de : f.zh}
                      <span className="block text-[10px]">{f.rho.toFixed(2)}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-xs text-[var(--gray)]">
                  {lang === "de" ? "Material (rho_K):" : "材质 (rho_物):"}
                </span>
                <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                  {PRESETS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => applyPreset(m.id)}
                      className={`cursor-pointer rounded border p-1.5 text-center transition-colors ${
                        material === m.id
                          ? "border-[var(--accent)] font-bold text-[var(--accent)]"
                          : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
                      }`}
                    >
                      {lang === "de" ? m.de : m.zh}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Masse (m):" : "质量 (m):"}</span>
                  <span className="font-bold text-[var(--ink)]">{mass.toFixed(1)} kg</span>
                </div>
                <input
                  type="range"
                  min={0.5}
                  max={10.0}
                  step={0.1}
                  value={mass}
                  onChange={(e) => {
                    setMaterial("custom");
                    setMass(Number(e.target.value));
                  }}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                  aria-label="mass"
                />
              </div>
              <div className="space-y-1">
                <div className="flex justify-between font-mono text-xs">
                  <span className="text-[var(--gray)]">{lang === "de" ? "Volumen (V):" : "体积 (V):"}</span>
                  <span className="font-bold text-[var(--ink)]">{volume.toFixed(1)} L</span>
                </div>
                <input
                  type="range"
                  min={1.0}
                  max={10.0}
                  step={0.5}
                  value={volume}
                  onChange={(e) => {
                    setMaterial("custom");
                    setVolume(Number(e.target.value));
                  }}
                  className="w-full cursor-pointer accent-[var(--accent)]"
                  aria-label="volume"
                />
              </div>
              <div className="flex items-center justify-between rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2 font-mono text-xs">
                <span className="text-[var(--gray)]">{lang === "de" ? "rho_K = m/V:" : "rho_物 = m/V:"}</span>
                <span className="text-base font-bold text-[var(--ink)]">{rhoK.toFixed(2)} kg/L</span>
              </div>
            </div>

            <div className="space-y-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">V_sub</span>
                <strong className="text-[var(--ink)]">{metrics.vSub.toFixed(2)} L</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">F_G = m·g</span>
                <strong style={{ color: C_GRAV }}>{metrics.fG.toFixed(1)} N</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--gray)]">F_A = rho·V_sub·g</span>
                <strong style={{ color: C_BUOY }}>{metrics.fA.toFixed(1)} N</strong>
              </div>
              <div className="flex justify-between border-t border-[var(--line)] pt-1.5">
                <span className="text-[var(--gray)]">{lang === "de" ? "Waage (Boden)" : "底部秤读数"}</span>
                <strong className="text-[var(--ink)]">{metrics.scale.toFixed(1)} N</strong>
              </div>
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
          <MathHtml code="F_A = \rho_{\mathrm{Fl}} \cdot V_{\mathrm{sub}} \cdot g" display={true} cacheKey="buoyancy:fa" />
          <MathHtml code="F_G = m \cdot g" display={true} cacheKey="buoyancy:fg" />
          <MathHtml
            code="\rho_K < \rho_{\mathrm{Fl}}: \mathrm{schwimmt};\; =: \mathrm{schwebt};\; >: \mathrm{sinkt}"
            display={true}
            cacheKey="buoyancy:criterion"
          />
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "02 · KLP / Operatoren" : "02 · 考纲 / 算子"}
          </div>
          <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "NRW EF Mechanik: Hydrostatik, Dichte und Archimedisches Prinzip. Die Waage am Boden zeigt F_G − F_A."
              : "NRW EF 力学：流体静力学、密度与阿基米德原理。底部秤读数为 F_G − F_A。"}
          </p>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? "Operatoren: beschreiben (Schwimmbedingung an Dichten), berechnen (F_A aus rho, V_sub, g), begruenden (Schweben als Kraeftegleichgewicht F_A = F_G)."
              : "算子：beschreiben（由密度关系描述沉浮条件）、berechnen（由 rho、V_排、g 算 F_A）、begruenden（以 F_A = F_G 论证悬浮为受力平衡）。"}
          </p>
        </div>
        <div className="space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "03 · Verstaendnis (CN)" : "03 · 中文要点"}
          </div>
          <p className="font-sans text-xs leading-relaxed text-[var(--ink)]">
            {lang === "de"
              ? "Der Auftrieb haengt nur von Fluessigkeit und Eintauchtiefe ab, nicht vom Koerpermaterial. Schwimmen heisst: F_A traegt F_G bereits bei Teil-Eintauchen; Schweben heisst: erst bei vollem Eintauchen gilt F_A = F_G; Sinken heisst: selbst voll eingetaucht reicht F_A nicht, der Rest drueckt auf die Waage."
              : "浮力只取决于液体密度与浸没体积，与物体材质无关：漂浮指部分浸没时 F_A 已托起 F_G；悬浮指完全浸没时恰好 F_A = F_G；下沉指完全浸没 F_A 仍不足，差值压在底部秤上。拖动盐水对比纯水，可直观看到同一物体 V_排变小仍能漂浮。"}
          </p>
        </div>
        <div className="flex flex-col justify-between space-y-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3.5">
          <div className="font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--accent)]">
            {lang === "de" ? "04 · Befund sichern" : "04 · 导出结论"}
          </div>
          <p className="font-mono text-[11px] leading-relaxed text-[var(--gray)]">
            {lang === "de"
              ? `V_sub = ${metrics.vSub.toFixed(2)} L, F_A = ${metrics.fA.toFixed(1)} N, F_G = ${metrics.fG.toFixed(1)} N, Waage = ${metrics.scale.toFixed(1)} N.`
              : `V_排 = ${metrics.vSub.toFixed(2)} L，F_A = ${metrics.fA.toFixed(1)} N，F_G = ${metrics.fG.toFixed(1)} N，秤 = ${metrics.scale.toFixed(1)} N。`}
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
