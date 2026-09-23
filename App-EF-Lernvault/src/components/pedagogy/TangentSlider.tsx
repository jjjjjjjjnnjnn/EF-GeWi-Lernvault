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

  const klausursatz = lang === "de"
    ? `Der Differenzenquotient Δy/Δx = (${y1.toFixed(2)} - ${y0.toFixed(2)}) / ${deltaX.toFixed(2)} = ${sekantenSteigung.toFixed(2)} beschreibt die mittlere Änderungsrate (Sekante). Im Grenzwert Δx → 0 konvergiert er gegen den Differentialquotienten f'(${x0.toFixed(1)}) = ${tangentenSteigung.toFixed(1)} (momentane Änderungsrate der Tangente).`
    : `差商 Δy/Δx = (${y1.toFixed(2)} - ${y0.toFixed(2)}) / ${deltaX.toFixed(2)} = ${sekantenSteigung.toFixed(2)} 描述割线的平均变化率。当割线步长 Δx → 0 时，割线逐渐与切线重合，收敛于瞬时变化率 (导数) f'(${x0.toFixed(1)}) = ${tangentenSteigung.toFixed(1)}。`;

  const handleCopyOrInsert = () => {
    onFormulaGenerated?.(klausursatz);
    navigator.clipboard?.writeText(klausursatz);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="tangent-slider"
      className="rounded-sm border border-[#E5E1D8] bg-[#FAF9F6] p-3 text-[#1C1B17] font-sans"
    >
      <div className="flex items-center justify-between border-b border-[#E5E1D8] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-[#2563eb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19L20 5M4 19h16M4 19V5" />
          </svg>
          <span className="font-semibold text-xs text-[#0f172a]">
            {lang === "de" ? "Dynamischer Tangenten-Simulator (Δx → 0)" : "割线逼近切线沙盘：直观理解导数 (Δx → 0)"}
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-xs bg-[#eff6ff] text-[#2563eb] border border-[#bfdbfe]">
            f(x) = x²
          </span>
        </div>
        <span className="text-[10px] font-mono text-[#64748b]">
          NRW EF Mathe · Differentialrechnung
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Visualisierung */}
        <div className="bg-white rounded-sm border border-[#E5E1D8] p-2 flex flex-col items-center justify-center relative overflow-hidden">
          <svg width={svgWidth} height={svgHeight} className="overflow-visible select-none">
            {/* Koordinatengitter */}
            <line
              x1={margin.left}
              y1={toSvgY(0)}
              x2={svgWidth - margin.right}
              y2={toSvgY(0)}
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(0)}
              y1={svgHeight - margin.bottom}
              x2={toSvgX(0)}
              y2={margin.top}
              stroke="#cbd5e1"
              strokeWidth="1.5"
            />

            {/* Achsenbeschriftung */}
            <text x={svgWidth - margin.right + 2} y={toSvgY(0) + 4} fontSize="10" fill="#64748b" fontFamily="monospace">
              x
            </text>
            <text x={toSvgX(0) - 12} y={margin.top - 4} fontSize="10" fill="#64748b" fontFamily="monospace">
              y
            </text>

            {/* Funktion f(x) = x^2 */}
            <path d={curvePath} fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />

            {/* Tangente (Grün, f'(x0)) */}
            <path d={tangentPath} fill="none" stroke="#16a34a" strokeWidth="1.5" strokeOpacity="0.75" />

            {/* Sekante (Blau gestrichelt) */}
            <path d={secantPath} fill="none" stroke="#2563eb" strokeWidth="2" strokeDasharray="4 2" />

            {/* Steigungsdreieck */}
            {deltaX > 0.05 && (
              <>
                {/* Horizontal Δx */}
                <line
                  x1={toSvgX(x0)}
                  y1={toSvgY(y0)}
                  x2={toSvgX(x1)}
                  y2={toSvgY(y0)}
                  stroke="#0284c7"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                {/* Vertikal Δy */}
                <line
                  x1={toSvgX(x1)}
                  y1={toSvgY(y0)}
                  x2={toSvgX(x1)}
                  y2={toSvgY(y1)}
                  stroke="#9333ea"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
              </>
            )}

            {/* Basispunkt P(x0, y0) */}
            <circle cx={toSvgX(x0)} cy={toSvgY(y0)} r="4.5" fill="#16a34a" stroke="#ffffff" strokeWidth="1.5" />
            <text x={toSvgX(x0) - 18} y={toSvgY(y0) - 8} fontSize="10" fontWeight="bold" fill="#16a34a">
              P({x0.toFixed(1)}|{y0.toFixed(1)})
            </text>

            {/* Sekantenpunkt Q(x1, y1) */}
            <circle cx={toSvgX(x1)} cy={toSvgY(y1)} r="4.5" fill="#2563eb" stroke="#ffffff" strokeWidth="1.5" />
            <text x={toSvgX(x1) + 6} y={toSvgY(y1) + 4} fontSize="10" fontWeight="bold" fill="#2563eb">
              Q
            </text>
          </svg>

          {/* Legende */}
          <div className="flex items-center gap-3 text-[10px] font-mono mt-1 text-[#64748b]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-0.5 bg-[#64748b]" /> f(x)
            </span>
            <span className="flex items-center gap-1 text-[#2563eb]">
              <span className="w-2.5 h-0.5 bg-[#2563eb] border-b border-dashed" /> Sekante (m={sekantenSteigung.toFixed(2)})
            </span>
            <span className="flex items-center gap-1 text-[#16a34a]">
              <span className="w-2.5 h-0.5 bg-[#16a34a]" /> Tangente (f'={tangentenSteigung.toFixed(1)})
            </span>
          </div>
        </div>

        {/* Steuerung & Numerische Auswertung */}
        <div className="space-y-3">
          {/* Slider 1: Basispunkt x0 */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-[#475569]">
                {lang === "de" ? "Basispunkt x₀:" : "基准点 x₀:"}
              </span>
              <span className="font-bold text-[#0f172a]">{x0.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={x0}
              onChange={(e) => setX0(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-[#e2e8f0] rounded-lg appearance-none cursor-pointer accent-[#16a34a]"
            />
          </div>

          {/* Slider 2: Δx Annäherung */}
          <div className="bg-[#eff6ff] p-2.5 rounded-sm border border-[#bfdbfe]">
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="font-semibold text-[#1e40af]">
                {lang === "de" ? "Intervallbreite Δx (Schrittweite h):" : "步长 Δx (拖动逼近 0):"}
              </span>
              <span className="font-bold text-[#1e40af] text-sm">{deltaX.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="2.0"
              step="0.02"
              value={deltaX}
              onChange={(e) => setDeltaX(parseFloat(e.target.value))}
              className="w-full h-2 bg-[#bfdbfe] rounded-lg appearance-none cursor-pointer accent-[#2563eb]"
            />
            <div className="flex justify-between text-[10px] font-mono text-[#60a5fa] mt-1">
              <span>0.02 (fast Tangente)</span>
              <span>2.00 (große Sekante)</span>
            </div>
          </div>

          {/* Mathematische Formelbox */}
          <div className="rounded-sm border border-[#E5E1D8] bg-white p-2.5 font-mono text-xs space-y-1.5">
            <div className="flex justify-between items-center text-[#475569] text-[11px]">
              <span>Differenzenquotient (Sekantensteigung):</span>
              <span className="font-bold text-[#2563eb] text-sm">{sekantenSteigung.toFixed(3)}</span>
            </div>
            <div className="text-[10px] text-[#64748b] bg-[#f8fafc] p-1.5 rounded-xs border border-[#e2e8f0]">
              m = Δy / Δx = ({y1.toFixed(2)} - {y0.toFixed(2)}) / {deltaX.toFixed(2)} = 2·{x0.toFixed(1)} + {deltaX.toFixed(2)}
            </div>

            <div className="flex justify-between items-center text-[#16a34a] text-[11px] pt-1 border-t border-[#f1f5f9]">
              <span>Differentialquotient (Tangente f'):</span>
              <span className="font-bold text-sm">{tangentenSteigung.toFixed(2)}</span>
            </div>
            <div className="text-[10px] text-[#16a34a]">
              lim(Δx→0) [2·{x0.toFixed(1)} + Δx] = <strong>{tangentenSteigung.toFixed(1)}</strong>
            </div>
          </div>

          {/* Klausursatz einfügen */}
          <button
            type="button"
            onClick={handleCopyOrInsert}
            className="w-full py-1.5 px-3 rounded-sm bg-[#1C1B17] text-white hover:bg-[#4338CA] transition-colors text-xs font-sans flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
            <span>
              {copied
                ? (lang === "de" ? "✓ In Chat & Zwischenablage übernommen!" : "✓ 已带入对话框并复制！")
                : (lang === "de" ? "Erkenntnis in Klausursatz übernehmen" : "带入此导数分析结论与 Klausursatz")}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
