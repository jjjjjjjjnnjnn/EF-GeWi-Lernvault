import { useEffect, useRef, useState, useCallback } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface VectorAdditionSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

const VEC_A = "#3f3f46";
const VEC_B = "#92400e";
const RANGE = 8;
const SNAP = 0.5;

function snap(v: number): number {
  const s = Math.round(v / SNAP) * SNAP;
  return Math.max(-RANGE, Math.min(RANGE, s));
}

function fmt(n: number, digits = 2): string {
  const s = n.toFixed(digits);
  return s === "-0.00" || s === "-0.0" ? s.slice(1) : s;
}

export function VectorAdditionSim({ lang, studioMode: _studioMode = true, onExportFinding }: VectorAdditionSimProps) {
  void _studioMode;
  const isZh = lang === "zh";

  const [ax, setAx] = useState<number>(4);
  const [ay, setAy] = useState<number>(3);
  const [bx, setBx] = useState<number>(-2);
  const [by, setBy] = useState<number>(4);
  const [showPanels, setShowPanels] = useState<boolean>(true);
  const [showParallelogram, setShowParallelogram] = useState<boolean>(true);
  const [showProjection, setShowProjection] = useState<boolean>(true);

  // ---- derived first-principles quantities (pure, no animation loop) ----
  const cx = ax + bx;
  const cy = ay + by;
  const magA = Math.hypot(ax, ay);
  const magB = Math.hypot(bx, by);
  const magC = Math.hypot(cx, cy);
  const angleC = (Math.atan2(cy, cx) * 180) / Math.PI;
  const dot = ax * bx + ay * by;
  const cosPhi = magA > 0 && magB > 0 ? Math.max(-1, Math.min(1, dot / (magA * magB))) : 0;
  const phiDeg = magA > 0 && magB > 0 ? (Math.acos(cosPhi) * 180) / Math.PI : 0;
  // orthogonal projection of a onto b: p = ((a.b)/|b|^2) b
  const projScalar = magB > 0 ? dot / magB : 0;
  const projX = magB > 0 ? (dot / (magB * magB)) * bx : 0;
  const projY = magB > 0 ? (dot / (magB * magB)) * by : 0;

  // ---- measured stage size (ResizeObserver, event-driven only) ----
  const stageRef = useRef<HTMLDivElement | null>(null);
  const [stageSize, setStageSize] = useState({ w: 640, h: 440 });
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const update = () => {
      const r = el.getBoundingClientRect();
      if (r.width > 0 && r.height > 0) {
        setStageSize((prev) =>
          Math.abs(prev.w - r.width) < 0.5 && Math.abs(prev.h - r.height) < 0.5
            ? prev
            : { w: r.width, h: r.height },
        );
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const { w: stageW, h: stageH } = stageSize;
  const originX = stageW / 2;
  const originY = stageH / 2;
  const pxPerUnit = Math.min(stageW, stageH) / (2 * RANGE + 2);
  const toPx = useCallback(
    (x: number, y: number): [number, number] => [originX + x * pxPerUnit, originY - y * pxPerUnit],
    [originX, originY, pxPerUnit],
  );

  // ---- drag vector tips with pointer capture (event-driven, no rAF) ----
  const dragTarget = useRef<"a" | "b" | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const eventToUnits = useCallback(
    (clientX: number, clientY: number): [number, number] => {
      const svg = svgRef.current;
      if (!svg) return [0, 0];
      const r = svg.getBoundingClientRect();
      const px = clientX - r.left;
      const py = clientY - r.top;
      const ox = stageW / 2;
      const oy = stageH / 2;
      const ppu = Math.min(stageW, stageH) / (2 * RANGE + 2);
      return [snap((px - ox) / ppu), snap((oy - py) / ppu)];
    },
    [stageW, stageH],
  );

  const handleTipDown = (target: "a" | "b") => (e: React.PointerEvent<SVGGElement>) => {
    dragTarget.current = target;
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };
  const handleTipMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!dragTarget.current) return;
    const [ux, uy] = eventToUnits(e.clientX, e.clientY);
    if (dragTarget.current === "a") {
      setAx(ux);
      setAy(uy);
    } else {
      setBx(ux);
      setBy(uy);
    }
  };
  const handleTipUp = (e: React.PointerEvent<SVGGElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    dragTarget.current = null;
  };

  const handleReset = useCallback(() => {
    setAx(4);
    setAy(3);
    setBx(-2);
    setBy(4);
  }, []);

  const generateReport = useCallback((): string => {
    if (isZh) {
      return (
        `向量合成实验记录：a=(${fmt(ax, 1)}, ${fmt(ay, 1)})，b=(${fmt(bx, 1)}, ${fmt(by, 1)})；` +
        `合向量 c=a+b=(${fmt(cx, 1)}, ${fmt(cy, 1)})，模 |c|=${fmt(magC)}，方向角 ${fmt(angleC, 1)}°；` +
        `点积 a·b=${fmt(dot)}，夹角 ${fmt(phiDeg, 1)}°；a 在 b 上的投影分量=${fmt(projScalar)}。`
      );
    }
    return (
      `Vektor-Labor: a=(${fmt(ax, 1)}, ${fmt(ay, 1)}), b=(${fmt(bx, 1)}, ${fmt(by, 1)}); ` +
      `Resultierende c=a+b=(${fmt(cx, 1)}, ${fmt(cy, 1)}), Betrag |c|=${fmt(magC)}, Richtung ${fmt(angleC, 1)}°; ` +
      `Skalarprodukt a·b=${fmt(dot)}, Zwischenwinkel ${fmt(phiDeg, 1)}°; Projektion von a auf b = ${fmt(projScalar)}.`
    );
  }, [isZh, ax, ay, bx, by, cx, cy, magC, angleC, dot, phiDeg, projScalar]);

  const [aTipX, aTipY] = toPx(ax, ay);
  const [bTipX, bTipY] = toPx(bx, by);
  const [cTipX, cTipY] = toPx(cx, cy);
  const [pTipX, pTipY] = toPx(projX, projY);

  const gridLines: number[] = [];
  for (let g = -RANGE; g <= RANGE; g++) gridLines.push(g);

  const sliderRow = (
    label: string,
    value: number,
    onChange: (v: number) => void,
    accentClass: string,
  ) => (
    <div className="flex items-center gap-2">
      <span className="w-7 shrink-0 font-mono text-[11px] text-[var(--ink-muted)]">{label}</span>
      <input
        type="range"
        min={-RANGE}
        max={RANGE}
        step={SNAP}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className={`w-full ${accentClass}`}
        aria-label={label}
      />
      <span className="w-10 shrink-0 text-right font-mono text-[11px] tabular-nums text-[var(--ink)]">
        {fmt(value, 1)}
      </span>
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="grid grid-cols-12 gap-3 items-start">
        {/* stage */}
        <div
          className={`${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}
        >
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            {/* toolbar */}
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="font-serif font-medium text-xs text-[var(--ink)] truncate">
                  {isZh ? "二维向量合成与分解" : "Vektor-Addition 2D & Parallelogrammregel"}
                </span>
                <span className="font-mono text-[10px] tabular-nums text-[var(--ink-muted)] whitespace-nowrap">
                  |c| = {fmt(magC)} · {fmt(angleC, 1)}°
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPanels(!showPanels)}
                  className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                  title={isZh ? "折叠侧栏" : "Seitenleiste umschalten"}
                >
                  {showPanels ? (isZh ? "◧ 折叠侧栏" : "◧ Seitenleiste") : isZh ? "◩ 展开侧栏" : "◩ Seitenleiste"}
                </button>
              </div>
            </div>

            {/* drawing stage */}
            <div ref={stageRef} className="w-full h-[420px] sm:h-[480px]">
              <svg ref={svgRef} width={stageW} height={stageH} className="block select-none">
                {/* grid */}
                {gridLines.map((g) => {
                  const [gx] = toPx(g, 0);
                  const [, gy] = toPx(0, g);
                  return (
                    <g key={g}>
                      <line x1={gx} y1={0} x2={gx} y2={stageH} stroke="var(--line)" strokeWidth={g === 0 ? 1.4 : 0.6} opacity={g === 0 ? 1 : 0.7} />
                      <line x1={0} y1={gy} x2={stageW} y2={gy} stroke="var(--line)" strokeWidth={g === 0 ? 1.4 : 0.6} opacity={g === 0 ? 1 : 0.7} />
                      {g !== 0 && g % 2 === 0 && (
                        <g fontFamily="monospace" fontSize="9" fill="var(--ink-muted)">
                          <text x={gx + 3} y={originY + 11}>{g}</text>
                          <text x={originX + 4} y={gy - 3}>{-g}</text>
                        </g>
                      )}
                    </g>
                  );
                })}
                <text x={stageW - 14} y={originY - 6} fontFamily="monospace" fontSize="11" fill="var(--ink)">x</text>
                <text x={originX + 6} y={14} fontFamily="monospace" fontSize="11" fill="var(--ink)">y</text>

                {/* parallelogram (a shifted to tip of b, b shifted to tip of a) */}
                {showParallelogram && (
                  <g stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="4 3" opacity="0.85">
                    <line x1={bTipX} y1={bTipY} x2={cTipX} y2={cTipY} />
                    <line x1={aTipX} y1={aTipY} x2={cTipX} y2={cTipY} />
                  </g>
                )}

                {/* projection of a onto b */}
                {showProjection && magB > 0 && (
                  <g>
                    <line x1={originX} y1={originY} x2={pTipX} y2={pTipY} stroke={VEC_B} strokeWidth="4" opacity="0.28" strokeLinecap="round" />
                    <line x1={aTipX} y1={aTipY} x2={pTipX} y2={pTipY} stroke="var(--ink-muted)" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx={pTipX} cy={pTipY} r="3" fill="var(--surface)" stroke={VEC_B} strokeWidth="1.4" />
                  </g>
                )}

                {/* vector a */}
                <line x1={originX} y1={originY} x2={aTipX} y2={aTipY} stroke={VEC_A} strokeWidth="2.4" strokeLinecap="round" />
                <polygon
                  points="0,-4.5 10,0 0,4.5"
                  fill={VEC_A}
                  transform={`translate(${aTipX},${aTipY}) rotate(${(Math.atan2(-(aTipY - originY), aTipX - originX) * 180) / Math.PI})`}
                />
                <g
                  onPointerDown={handleTipDown("a")}
                  onPointerMove={handleTipMove}
                  onPointerUp={handleTipUp}
                  onPointerCancel={handleTipUp}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <circle cx={aTipX} cy={aTipY} r="11" fill="transparent" />
                  <circle cx={aTipX} cy={aTipY} r="5" fill={VEC_A} stroke="var(--surface)" strokeWidth="1.4" />
                </g>
                <text x={aTipX + 9} y={aTipY - 7} fontFamily="monospace" fontSize="12" fontWeight="bold" fill={VEC_A}>a</text>

                {/* vector b */}
                <line x1={originX} y1={originY} x2={bTipX} y2={bTipY} stroke={VEC_B} strokeWidth="2.4" strokeLinecap="round" />
                <polygon
                  points="0,-4.5 10,0 0,4.5"
                  fill={VEC_B}
                  transform={`translate(${bTipX},${bTipY}) rotate(${(Math.atan2(-(bTipY - originY), bTipX - originX) * 180) / Math.PI})`}
                />
                <g
                  onPointerDown={handleTipDown("b")}
                  onPointerMove={handleTipMove}
                  onPointerUp={handleTipUp}
                  onPointerCancel={handleTipUp}
                  className="cursor-grab active:cursor-grabbing"
                >
                  <circle cx={bTipX} cy={bTipY} r="11" fill="transparent" />
                  <circle cx={bTipX} cy={bTipY} r="5" fill={VEC_B} stroke="var(--surface)" strokeWidth="1.4" />
                </g>
                <text x={bTipX + 9} y={bTipY - 7} fontFamily="monospace" fontSize="12" fontWeight="bold" fill={VEC_B}>b</text>

                {/* resultant c */}
                {(cx !== 0 || cy !== 0) && (
                  <g>
                    <line x1={originX} y1={originY} x2={cTipX} y2={cTipY} stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                    <polygon
                      points="0,-5 11,0 0,5"
                      fill="var(--accent)"
                      transform={`translate(${cTipX},${cTipY}) rotate(${(Math.atan2(-(cTipY - originY), cTipX - originX) * 180) / Math.PI})`}
                    />
                    <text x={cTipX + 9} y={cTipY - 7} fontFamily="monospace" fontSize="12" fontWeight="bold" fill="var(--accent)">c</text>
                  </g>
                )}

                <circle cx={originX} cy={originY} r="3" fill="var(--ink)" />
              </svg>
            </div>

            {/* readout bar */}
            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] font-mono text-[11px]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
                    <path d="M13.5 1.8v2.6h-2.6" />
                  </svg>
                  <span>{isZh ? "重置" : "Reset"}</span>
                </button>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  {isZh ? "拖拽端点 a / b" : "Tipps a / b ziehen"}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tabular-nums text-[var(--ink)]">
                <span>|a| = <strong>{fmt(magA)}</strong></span>
                <span>|b| = <strong>{fmt(magB)}</strong></span>
                <span className="text-[var(--accent)]">|c| = <strong>{fmt(magC)}</strong></span>
                <span>a·b = <strong>{fmt(dot)}</strong></span>
              </div>
            </div>
          </div>
        </div>

        {/* control panel */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "分量调控" : "Komponenten-Steuerung"}
              </div>
              <div className="mb-3">
                <div className="font-mono text-[11px] mb-1.5" style={{ color: VEC_A }}>
                  {isZh ? "向量 a (ax, ay)" : "Vektor a (ax, ay)"} · ({fmt(ax, 1)}, {fmt(ay, 1)})
                </div>
                <div className="flex flex-col gap-1.5">
                  {sliderRow("ax", ax, setAx, "accent-[#3f3f46]")}
                  {sliderRow("ay", ay, setAy, "accent-[#3f3f46]")}
                </div>
              </div>
              <div className="mb-3">
                <div className="font-mono text-[11px] mb-1.5" style={{ color: VEC_B }}>
                  {isZh ? "向量 b (bx, by)" : "Vektor b (bx, by)"} · ({fmt(bx, 1)}, {fmt(by, 1)})
                </div>
                <div className="flex flex-col gap-1.5">
                  {sliderRow("bx", bx, setBx, "accent-[#92400e]")}
                  {sliderRow("by", by, setBy, "accent-[#92400e]")}
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-2 border-t border-[var(--line)]">
                <label className="flex items-center gap-2 cursor-pointer font-mono text-[11px] text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={showParallelogram}
                    onChange={(e) => setShowParallelogram(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  {isZh ? "平行四边形定则作图" : "Parallelogrammregel einblenden"}
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-mono text-[11px] text-[var(--ink)]">
                  <input
                    type="checkbox"
                    checked={showProjection}
                    onChange={(e) => setShowProjection(e.target.checked)}
                    className="accent-[var(--accent)]"
                  />
                  {isZh ? "正交投影分量 (a 在 b 上)" : "Orthogonalprojektion (a auf b)"}
                </label>
              </div>
            </div>

            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-2 pb-1 border-b border-[var(--line)]">
                {isZh ? "测量读数" : "Messwerte"}
              </div>
              <dl className="font-mono text-[11px] tabular-nums text-[var(--ink)] flex flex-col gap-1">
                <div className="flex justify-between">
                  <dt className="text-[var(--ink-muted)]">{isZh ? "合向量 c" : "Resultierende c"}</dt>
                  <dd>({fmt(cx, 1)}, {fmt(cy, 1)})</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--ink-muted)]">{isZh ? "模 |c|" : "Betrag |c|"}</dt>
                  <dd className="text-[var(--accent)] font-bold">{fmt(magC)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--ink-muted)]">{isZh ? "方向角" : "Richtungswinkel"}</dt>
                  <dd>{fmt(angleC, 1)}°</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--ink-muted)]">{isZh ? "点积 a·b" : "Skalarprodukt a·b"}</dt>
                  <dd>{fmt(dot)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--ink-muted)]">{isZh ? "夹角 a–b" : "Winkel a–b"}</dt>
                  <dd>{fmt(phiDeg, 1)}°</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--ink-muted)]">{isZh ? "投影分量" : "Projektion"}</dt>
                  <dd>{fmt(projScalar)}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>

      {/* bilingual pedagogy scaffold */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel &amp; Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "向量合成与平行四边形定则" : "Vektoraddition & Parallelogrammregel"}
          </div>
          <div className="mb-1.5">
            <MathHtml code="\vec{c}=\vec{a}+\vec{b}" display={true} cacheKey="vector-addition-c" />
          </div>
          <div className="mb-1.5">
            <MathHtml code="a\cdot b=a_xb_x+a_yb_y=|a||b|\cos\varphi" display={true} cacheKey="vector-addition-dot" />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "分量相加得合向量；虚线为平行四边形；a 在 b 上的投影长度为 (a·b)/|b|。"
              : "Komponentenweise Addition ergibt die Resultierende; gestrichelt das Parallelogramm; Projektion von a auf b: (a·b)/|b|."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "力与运动：力的矢量性" : "Mechanik: Kräfte als Vektoren"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">darstellen</code>{" "}
            <code className="bg-[var(--paper-subtle)] px-1">berechnen</code>
            <p className="mt-1">
              {isZh
                ? "用平行四边形定则作图求合力，并由分量计算模与方向角；注意角度制与分量符号。"
                : "Resultierende per Parallelogrammregel zeichnen und per Komponenten Betrag und Richtungswinkel berechnen; auf Vorzeichen und Gradmaß achten."}
            </p>
          </div>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "首尾相接，影子投影" : "Aneinanderhängen und Schattenwurf"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "把 b 的尾巴接到 a 的头上，从起点到终点就是 c。点积是“一个向量在另一个影子上的长度乘积”：垂直时点积为零，这是判断正交最快的方法。"
              : "Lege den Anfang von b an die Spitze von a: Vom Start zum Ende zeigt c. Das Skalarprodukt misst die Schattenlänge des einen Vektors auf dem anderen: Bei 90° ist es null — der schnellste Orthogonalitätstest."}
          </p>
        </div>

        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isZh ? "导出结论" : "Befunde exportieren"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh ? "把当前测量值直接发给 AI 助教，深入分析。" : "Übertrage die aktuellen Messwerte direkt in den KI-Tutor zur vertieften Analyse."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onExportFinding?.(generateReport())}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors"
          >
            {isZh ? "发给助教 →" : "An Tutor senden →"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VectorAdditionSim;
