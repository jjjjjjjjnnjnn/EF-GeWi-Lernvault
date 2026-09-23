import { useState, useMemo } from "react";

interface TangentSliderProps {
  lang?: "de" | "zh";
  onFormulaGenerated?: (formula: string) => void;
}

export function TangentSlider({ lang = "zh", onFormulaGenerated }: TangentSliderProps) {
  // Basispunkt x0 (wählbar zwischen 0.5 und 2.5)
  const [x0, setX0] = useState<number>(1.0);
  // Abstand deltaX (h)
  const [deltaX, setDeltaX] = useState<number>(1.5);
  // Zoom/Skalierung für SVG
  const [copied, setCopied] = useState<boolean>(false);

  // Mathematische Werte für f(x) = x^2
  const f = (x: number) => x * x;
  const y0 = f(x0);
  const x1 = x0 + deltaX;
  const y1 = f(x1);

  // Sekantensteigung (Differenzenquotient)
  const deltaY = y1 - y0;
  const sekantenSteigung = deltaX !== 0 ? deltaY / deltaX : 2 * x0;

  // Tangentensteigung (Differentialquotient f'(x0) = 2*x0)
  const tangentenSteigung = 2 * x0;

  // SVG-Koordinatensystem Parameter
  // Mathematischer Bereich: x in [-0.5, 3.5], y in [-1, 10]
  const svgWidth = 360;
  const svgHeight = 260;
  const margin = { top: 20, right: 20, bottom: 30, left: 35 };

  const xMin = -0.5;
  const xMax = 3.5;
  const yMin = -0.5;
  const yMax = 9.5;

  const toSvgX = (x: number) => {
    return margin.left + ((x - xMin) / (xMax - xMin)) * (svgWidth - margin.left - margin.right);
  };

  const toSvgY = (y: number) => {
    return svgHeight - margin.bottom - ((y - yMin) / (yMax - yMin)) * (svgHeight - margin.top - margin.bottom);
  };

  // Kurvenpunkte für f(x) = x^2
  const curvePath = useMemo(() => {
    const points: string[] = [];
    const steps = 40;
    for (let i = 0; i <= steps; i++) {
      const curX = xMin + (i / steps) * (xMax - xMin);
      const curY = f(curX);
      const sx = toSvgX(curX);
      const sy = toSvgY(curY);
      points.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
    return points.join(" ");
  }, []);

  // Sekante Geradenpunkte (von xMin bis xMax)
  const secantPath = useMemo(() => {
    const p1X = xMin;
    const p1Y = y0 + sekantenSteigung * (xMin - x0);
    const p2X = xMax;
    const p2Y = y0 + sekantenSteigung * (xMax - x0);
    return `M ${toSvgX(p1X)} ${toSvgY(p1Y)} L ${toSvgX(p2X)} ${toSvgY(p2Y)}`;
  }, [x0, y0, sekantenSteigung]);

  // Tangente Geradenpunkte
  const tangentPath = useMemo(() => {
    const p1X = xMin;
    const p1Y = y0 + tangentenSteigung * (xMin - x0);
    const p2X = xMax;
    const p2Y = y0 + tangentenSteigung * (xMax - x0);
    return `M ${toSvgX(p1X)} ${toSvgY(p1Y)} L ${toSvgX(p2X)} ${toSvgY(p2Y)}`;
  }, [x0, y0, tangentenSteigung]);

  const klausursatzDE = `Der Differenzenquotient Δy/Δx = (${y1.toFixed(2)} - ${y0.toFixed(2)}) / ${deltaX.toFixed(2)} = ${sekantenSteigung.toFixed(2)} beschreibt die mittlere Änderungsrate (Sekante). Im Grenzwert Δx → 0 konvergiert er gegen den Differentialquotienten f'(${x0.toFixed(1)}) = ${tangentenSteigung.toFixed(1)} (momentane Änderungsrate der Tangente).`;
  const klausursatzZH = `差商 Δy/Δx = (${y1.toFixed(2)} - ${y0.toFixed(2)}) / ${deltaX.toFixed(2)} = ${sekantenSteigung.toFixed(2)} 描述割线的平均变化率。当割线步长 Δx → 0 时，割线逐渐与切线重合，收敛于瞬时变化率（导数）f'(${x0.toFixed(1)}) = ${tangentenSteigung.toFixed(1)}。`;
  const klausursatz = lang === "de" ? klausursatzDE : klausursatzZH;

  const handleCopyOrInsert = () => {
    onFormulaGenerated?.(klausursatz);
    navigator.clipboard?.writeText(klausursatz);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="tangent-slider"
      className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--ink)] font-sans"
    >
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <svg width="16" height="16" className="text-[var(--accent)]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M2.5 13.5l11-11M2.5 13.5h11M2.5 13.5v-11" />
          </svg>
          <span className="de-heading bilingual text-xs text-[var(--ink)]">
            <span>{lang === "de" ? "Dynamischer Tangenten-Simulator (Δx → 0)" : "割线逼近切线沙盘：直观理解导数 (Δx → 0)"}</span>
            <span className="zh-translation font-sans">{lang === "de" ? "割线逼近切线沙盘：直观理解导数 (Δx → 0)" : "Dynamischer Tangenten-Simulator (Δx → 0)"}</span>
          </span>
          <span className="text-[var(--text-meta)] font-mono px-1.5 py-0.2 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--accent)] border border-[var(--line)]">
            f(x) = x²
          </span>
        </div>
        <span className="text-[var(--text-meta)] font-mono text-[var(--gray)]">
          NRW EF Mathe · Differentialrechnung / 微积分
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Visualisierung */}
        <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] p-2 flex flex-col items-center justify-center relative overflow-hidden">
          <svg width={svgWidth} height={svgHeight} className="overflow-visible select-none">
            {/* Koordinatengitter */}
            <line
              x1={margin.left}
              y1={toSvgY(0)}
              x2={svgWidth - margin.right}
              y2={toSvgY(0)}
              stroke="var(--line)"
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(0)}
              y1={svgHeight - margin.bottom}
              x2={toSvgX(0)}
              y2={margin.top}
              stroke="var(--line)"
              strokeWidth="1.5"
            />

            {/* Achsenbeschriftung */}
            <text x={svgWidth - margin.right + 2} y={toSvgY(0) + 4} fontSize="12" fill="var(--gray)" fontFamily="monospace">
              x
            </text>
            <text x={toSvgX(0) - 12} y={margin.top - 4} fontSize="12" fill="var(--gray)" fontFamily="monospace">
              y
            </text>

            {/* Funktion f(x) = x^2 */}
            <path d={curvePath} fill="none" stroke="var(--gray)" strokeWidth="2" strokeLinecap="round" />

            {/* Tangente (Grün, f'(x0)) */}
            <path d={tangentPath} fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeOpacity="0.75" />

            {/* Sekante (Blau gestrichelt) */}
            <path d={secantPath} fill="none" stroke="var(--ink)" strokeWidth="2" strokeDasharray="4 2" />

            {/* Steigungsdreieck */}
            {deltaX > 0.05 && (
              <>
                {/* Horizontal Δx */}
                <line
                  x1={toSvgX(x0)}
                  y1={toSvgY(y0)}
                  x2={toSvgX(x1)}
                  y2={toSvgY(y0)}
                  stroke="var(--gray)"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                {/* Vertikal Δy */}
                <line
                  x1={toSvgX(x1)}
                  y1={toSvgY(y0)}
                  x2={toSvgX(x1)}
                  y2={toSvgY(y1)}
                  stroke="var(--accent)"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              </>
            )}

            {/* Basispunkt P(x0, y0) */}
            <circle cx={toSvgX(x0)} cy={toSvgY(y0)} r="4.5" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1.5" />
            <text x={toSvgX(x0) - 18} y={toSvgY(y0) - 8} fontSize="12" fontWeight="bold" fill="var(--accent)">
              P({x0.toFixed(1)}|{y0.toFixed(1)})
            </text>

            {/* Sekantenpunkt Q(x1, y1) */}
            <circle cx={toSvgX(x1)} cy={toSvgY(y1)} r="4.5" fill="var(--ink)" stroke="var(--surface)" strokeWidth="1.5" />
            <text x={toSvgX(x1) + 6} y={toSvgY(y1) + 4} fontSize="12" fontWeight="bold" fill="var(--ink)">
              Q
            </text>
          </svg>

          {/* Legende */}
          <div className="flex items-center gap-3 text-[var(--text-meta)] font-mono mt-1 text-[var(--gray)]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-[var(--gray)]" /> f(x)
            </span>
            <span className="flex items-center gap-1 text-[var(--ink)]">
              <span className="w-2.5 h-0.5 bg-[var(--ink)] border-b border-dashed" /> Sekante / 割线 (m={sekantenSteigung.toFixed(2)})
            </span>
            <span className="flex items-center gap-1 text-[var(--accent)]">
              <span className="w-2.5 h-0.5 bg-[var(--accent)]" /> Tangente / 切线 (f'={tangentenSteigung.toFixed(1)})
            </span>
          </div>
        </div>

        {/* Steuerung & Numerische Auswertung */}
        <div className="space-y-3">
          {/* Slider 1: Basispunkt x0 */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-[var(--gray)]">
                {lang === "de" ? "Basispunkt x₀:" : "基准点 x₀:"}
              </span>
              <span className=" text-[var(--ink)]">{x0.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={x0}
              onChange={(e) => setX0(parseFloat(e.target.value))}
              aria-label={lang === "de" ? "Basispunkt x₀ / 基准点 x₀" : "基准点 x₀ / Basispunkt x₀"}
              className="w-full h-1.5 bg-[var(--line)] rounded-[var(--radius)] appearance-none cursor-pointer accent-[var(--accent)]"
            />
          </div>

          {/* Slider 2: Δx Annäherung */}
          <div className="bg-[var(--paper-subtle)] p-2.5 rounded-[var(--radius)] border border-[var(--line)]">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className=" text-[var(--accent)]">
                {lang === "de" ? "Intervallbreite Δx (Schrittweite h):" : "步长 Δx (拖动逼近 0):"}
              </span>
              <span className=" text-[var(--accent)] text-sm">{deltaX.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="2.0"
              step="0.02"
              value={deltaX}
              onChange={(e) => setDeltaX(parseFloat(e.target.value))}
              aria-label={lang === "de" ? "Intervallbreite Δx / 步长 Δx" : "步长 Δx / Intervallbreite Δx"}
              className="w-full h-2 bg-[var(--paper-subtle)] rounded-[var(--radius)] appearance-none cursor-pointer accent-[var(--accent)]"
            />
            <div className="flex justify-between text-[var(--text-meta)] font-mono text-[var(--gray)] mt-1">
              <span>0.02 (fast Tangente / 接近切线)</span>
              <span>2.00 (große Sekante / 大步长割线)</span>
            </div>
          </div>

          {/* Mathematische Formelbox */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2.5 font-mono text-xs space-y-1.5">
            <div className="flex justify-between items-center text-[var(--gray)] text-[var(--text-meta)]">
              <span>Differenzenquotient / 差商 (Sekantensteigung / 割线斜率):</span>
              <span className=" text-[var(--accent)] text-sm">{sekantenSteigung.toFixed(3)}</span>
            </div>
            <div className="text-[var(--text-meta)] text-[var(--gray)] bg-[var(--paper)] p-1.5 rounded-[var(--radius)] border border-[var(--line)]">
              m = Δy / Δx = ({y1.toFixed(2)} - {y0.toFixed(2)}) / {deltaX.toFixed(2)} = 2·{x0.toFixed(1)} + {deltaX.toFixed(2)}
            </div>

            <div className="flex justify-between items-center text-[var(--accent)] text-[var(--text-meta)] pt-1 border-t border-[var(--line)]">
              <span>Differentialquotient / 微分商 (Tangente f' / 切线斜率):</span>
              <span className=" text-sm">{tangentenSteigung.toFixed(2)}</span>
            </div>
            <div className="text-[var(--text-meta)] text-[var(--accent)]">
              lim(Δx→0) [2·{x0.toFixed(1)} + Δx] = <strong>{tangentenSteigung.toFixed(1)}</strong>
            </div>
          </div>

          {/* Klausursatz einfügen */}
          <div className="exam-reading border-t border-[var(--line)] pt-2 text-xs leading-relaxed text-[var(--ink)]">
            <p className="de-reading">{klausursatzDE}</p>
            <p className="zh-translation font-sans">{klausursatzZH}</p>
          </div>
          <button
            type="button"
            onClick={handleCopyOrInsert}
            className="flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-[var(--radius)] border border-[var(--accent)] px-3 py-1.5 text-xs text-[var(--accent)] transition-colors"
          >
            <svg width="16" height="16" aria-hidden="true" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
              <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
            </svg>
            <span className="bilingual">
              <span>
                {copied
                  ? (lang === "de" ? "In Chat & Zwischenablage übernommen" : "已带入对话框并复制")
                  : (lang === "de" ? "Erkenntnis in Klausursatz übernehmen" : "带入此导数分析结论与 Klausursatz")}
              </span>
              <span className="zh-translation font-sans">
                {copied
                  ? (lang === "de" ? "已带入对话框并复制" : "In Chat & Zwischenablage übernommen")
                  : (lang === "de" ? "带入此导数分析结论与 Klausursatz" : "Erkenntnis in Klausursatz übernehmen")}
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
