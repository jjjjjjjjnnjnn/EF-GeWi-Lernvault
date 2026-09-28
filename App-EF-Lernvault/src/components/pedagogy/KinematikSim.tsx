import { useState, useEffect, useRef, useMemo } from "react";
import type { Lang } from "../../i18n";

interface KinematikSimProps {
  lang?: Lang;
  onFormulaGenerated?: (sentence: string) => void;
}

export function KinematikSim({ lang = "zh", onFormulaGenerated }: KinematikSimProps) {
  // Parameters
  const [s0] = useState<number>(0); // m
  const [v0, setV0] = useState<number>(2); // m/s (-5 to 10)
  const [a, setA] = useState<number>(1.5); // m/s² (-4 to 6)

  // Simulation state
  const [t, setT] = useState<number>(0); // current time in seconds (0 to 10)
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Animation frame loop
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      lastTimeRef.current = null;
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      return;
    }

    const animate = (now: number) => {
      if (lastTimeRef.current != null) {
        const deltaSec = (now - lastTimeRef.current) / 1000;
        setT((prevT) => {
          const nextT = prevT + deltaSec;
          if (nextT >= 10) {
            setIsPlaying(false);
            return 10;
          }
          return nextT;
        });
      }
      lastTimeRef.current = now;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying]);

  // Current physical values at time t
  const currentS = s0 + v0 * t + 0.5 * a * t * t;
  const currentV = v0 + a * t;
  const currentA = a;

  // Max track distance (0 to 100 meters)
  const maxTrackMeters = 100;
  const clampedTrackPos = Math.max(0, Math.min(maxTrackMeters, currentS));
  const trackPercentage = (clampedTrackPos / maxTrackMeters) * 100;

  // Graph plotting: s(t) curve from t=0 to 10
  const svgWidth = 360;
  const svgHeight = 160;
  const margin = { top: 15, right: 20, bottom: 25, left: 35 };

  const toSvgX = (timeVal: number) => {
    return margin.left + (timeVal / 10) * (svgWidth - margin.left - margin.right);
  };

  const toSvgY = (posVal: number) => {
    const clampedY = Math.max(0, Math.min(maxTrackMeters, posVal));
    return svgHeight - margin.bottom - (clampedY / maxTrackMeters) * (svgHeight - margin.top - margin.bottom);
  };

  const pathPoints = useMemo(() => {
    const pts: string[] = [];
    for (let curT = 0; curT <= 10; curT += 0.25) {
      const pos = s0 + v0 * curT + 0.5 * a * curT * curT;
      const sx = toSvgX(curT);
      const sy = toSvgY(pos);
      pts.push(`${curT === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
    return pts.join(" ");
  }, [s0, v0, a]);

  // Klausur summary sentence
  const klausursatz = useMemo(() => {
    if (Math.abs(a) < 0.05) {
      return lang === "de"
        ? `Für die gleichförmige Bewegung gilt a = 0 m/s² und v(t) = konst. = ${v0.toFixed(1)} m/s. Nach t = ${t.toFixed(1)} s beträgt der zurückgelegte Weg s(t) = ${currentS.toFixed(1)} m (lineare Zeit-Weg-Funktion).`
        : `匀速直线运动中加速度 a = 0 m/s²，速度恒为 v = ${v0.toFixed(1)} m/s。在 t = ${t.toFixed(1)} s 时的位移为 s(t) = ${currentS.toFixed(1)} m，位移-时间图为一条直线。`;
    }
    return lang === "de"
      ? `Für die gleichmäßig beschleunigte Bewegung mit a = ${a.toFixed(2)} m/s² und v₀ = ${v0.toFixed(1)} m/s lauten die Bewegungsgleichungen s(t) = ½at² + v₀t und v(t) = at + v₀. Bei t = ${t.toFixed(1)} s ist v = ${currentV.toFixed(1)} m/s und s = ${currentS.toFixed(1)} m.`
      : `匀变速直线运动中，加速度 a = ${a.toFixed(2)} m/s²，初速度 v₀ = ${v0.toFixed(1)} m/s。运动方程为 s(t) = ½at² + v₀t 与 v(t) = at + v₀。在 t = ${t.toFixed(1)} s 时，瞬时速度为 ${currentV.toFixed(1)} m/s，位移为 ${currentS.toFixed(1)} m。`;
  }, [a, v0, t, currentS, currentV, lang]);

  const handleCopyOrInsert = () => {
    onFormulaGenerated?.(klausursatz);
    navigator.clipboard?.writeText(klausursatz);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setT(0);
  };

  return (
    <div
      data-testid="kinematik-sim"
      className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 text-[var(--ink)] font-sans"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 mb-3">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            aria-hidden="true"
            className="text-[var(--accent)]"
          >
            <path d="M2 13.5h12M4 9l3-3 3 3 4-5" />
          </svg>
          <span className="font-serif text-xs font-semibold text-[var(--ink)]">
            {lang === "de" ? "Kinematik-Labor (Bewegungsgleichungen)" : "运动学物理实验室（直线运动方程与沙盘）"}
          </span>
          <span className="font-mono text-xs px-1.5 py-0.5 rounded-[var(--radius)] bg-[var(--paper-subtle)] text-[var(--accent)] border border-[var(--line)]">
            Physik EF · Mechanik
          </span>
        </div>
        <span className="font-mono text-xs text-[var(--gray)]">
          Labor-style Sim
        </span>
      </div>

      {/* Track & Runner Animation */}
      <div className="mb-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-3 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-[var(--gray)]">
            {lang === "de" ? "Strecke / 运动轨道 (0 - 100 m)" : "运动轨道 (0 - 100 m)"}
          </span>
          <div className="flex items-center gap-3">
            <span>t = <strong className="text-[var(--ink)]">{t.toFixed(2)} s</strong></span>
            <span>v = <strong className="text-[var(--accent)]">{currentV.toFixed(2)} m/s</strong></span>
            <span>a = <strong className="text-[var(--accent)]">{currentA.toFixed(2)} m/s²</strong></span>
            <span>s = <strong className="text-[var(--ink)]">{currentS.toFixed(1)} m</strong></span>
          </div>
        </div>

        {/* Visual Track */}
        <div className="relative h-9 rounded-[var(--radius)] bg-[var(--paper)] border border-[var(--line)] overflow-hidden flex items-center px-2">
          {/* Tick marks */}
          <div className="absolute inset-0 flex justify-between px-3 items-end pb-1 text-[9px] font-mono text-[var(--gray)] select-none pointer-events-none">
            <span>0m</span>
            <span>25m</span>
            <span>50m</span>
            <span>75m</span>
            <span>100m</span>
          </div>

          {/* Progress fill */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-[var(--paper-subtle)] border-r border-[var(--line)]"
            style={{ width: `${trackPercentage}%` }}
          />

          {/* Vehicle / Runner Indicator */}
          <div
            className="absolute -translate-x-1/2 flex flex-col items-center transition-transform duration-75"
            style={{ left: `${Math.max(2, Math.min(98, trackPercentage))}%` }}
          >
            <div className="w-4 h-4 rounded-full bg-[var(--ink)] text-[var(--paper)] flex items-center justify-center font-mono text-[9px] font-bold">
              K
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* s(t) Graph */}
        <div className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--line)] p-2 flex flex-col items-center justify-center relative overflow-hidden">
          <svg width={svgWidth} height={svgHeight} className="overflow-visible select-none">
            {/* Axes */}
            <line x1={margin.left} y1={toSvgY(0)} x2={svgWidth - margin.right} y2={toSvgY(0)} stroke="var(--line)" strokeWidth="1.5" />
            <line x1={toSvgX(0)} y1={svgHeight - margin.bottom} x2={toSvgX(0)} y2={margin.top} stroke="var(--line)" strokeWidth="1.5" />

            {/* Labels */}
            <text x={svgWidth - margin.right + 2} y={toSvgY(0) + 4} fontSize="10" fill="var(--gray)" fontFamily="monospace">
              t (s)
            </text>
            <text x={toSvgX(0) - 20} y={margin.top - 4} fontSize="10" fill="var(--gray)" fontFamily="monospace">
              s (m)
            </text>

            {/* Path curve */}
            <path d={pathPoints} fill="none" stroke="var(--gray)" strokeWidth="2" strokeLinecap="round" />

            {/* Current point */}
            <circle cx={toSvgX(t)} cy={toSvgY(currentS)} r="4" fill="var(--accent)" stroke="var(--surface)" strokeWidth="1.5" />
          </svg>
          <div className="text-[10px] font-mono text-[var(--gray)] mt-1">
            s(t) = ½at² + v₀t
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-3">
          {/* Slider 1: v0 */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span>{lang === "de" ? "Anfangsgeschwindigkeit (v₀)" : "初速度 (v₀)"}</span>
              <span className="text-[var(--ink)] font-bold">{v0.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min="-2"
              max="8"
              step="0.5"
              value={v0}
              onChange={(e) => {
                setV0(Number(e.target.value));
                setT(0);
              }}
              className="w-full accent-[var(--ink)] cursor-pointer"
            />
          </div>

          {/* Slider 2: a */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span>{lang === "de" ? "Beschleunigung (a)" : "加速度 (a)"}</span>
              <span className="text-[var(--accent)] font-bold">{a.toFixed(1)} m/s²</span>
            </div>
            <input
              type="range"
              min="-2"
              max="4"
              step="0.25"
              value={a}
              onChange={(e) => {
                setA(Number(e.target.value));
                setT(0);
              }}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          {/* Action buttons: Play/Pause, Reset, Zero Acceleration */}
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="flex-1 py-1.5 px-3 rounded-[var(--radius)] border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] hover:bg-[var(--accent)] hover:border-[var(--accent)] font-mono text-xs transition-colors cursor-pointer"
            >
              {isPlaying ? (lang === "de" ? "Pause" : "暂停") : (lang === "de" ? "Start ▶" : "开始运动 ▶")}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-1.5 px-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-hover)] font-mono text-xs transition-colors cursor-pointer"
            >
              {lang === "de" ? "Reset" : "重置"}
            </button>
            <button
              type="button"
              onClick={() => setA(0)}
              className="py-1.5 px-2 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)] font-mono text-[11px] transition-colors cursor-pointer"
              title="a = 0 (Gleichförmige Bewegung)"
            >
              a = 0
            </button>
          </div>
        </div>
      </div>

      {/* Klausur Sentence */}
      <div className="mt-3 pt-3 border-t border-[var(--line)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <p className="font-serif text-xs text-[var(--ink)] leading-relaxed">
          {klausursatz}
        </p>
        <button
          type="button"
          onClick={handleCopyOrInsert}
          className="shrink-0 px-2.5 py-1 text-xs font-mono rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--ink)] transition-colors cursor-pointer"
        >
          {copied
            ? lang === "de" ? "Kopiert!" : "已复制!"
            : lang === "de" ? "Als Klausursatz übernehmen" : "引用至考场论述"}
        </button>
      </div>
    </div>
  );
}

export default KinematikSim;
