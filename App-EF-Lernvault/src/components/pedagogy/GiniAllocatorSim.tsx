import { useState, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface GiniAllocatorSimProps {
  lang: Lang;
}

/**
 * GiniAllocatorSim: Interaktives SoWi-Labor zur Lorenz-Kurve und Einkommensumverteilung
 * (NRW EF/Q1 SoWi: Soziale Ungleichheit, Verteilungsgerechtigkeit & Soziale Marktwirtschaft).
 *
 * Simuliert die primaere (Markt-) und sekundaere (Netto-) Einkommensverteilung
 * in 5 Bevoelkerungsquintilen und berechnet dynamisch die Lorenz-Kurve sowie den Gini-Koeffizienten.
 */
export function GiniAllocatorSim({ lang }: GiniAllocatorSimProps) {
  // Umverteilungsgrad ueber Steuern & Transfers (0% bis 60%)
  const [transferRate, setTransferRate] = useState<number>(25); // Prozent
  const sliderId = useId();

  // Primaere Marktverteilung der 5 Quintile (vor Steuern/Transfers)
  // [Q1: aermste 20%, Q2: 20-40%, Q3: 40-60%, Q4: 60-80%, Q5: reichste 20%]
  const primaryShares = [3.5, 9.5, 16.0, 23.0, 48.0]; // Summe = 100%

  // Sekundaere Verteilung nach progressiver Besteuerung und Transfer
  // Je hoeher transferRate, desto mehr wird vom 5. und 4. Quintil zu Q1 und Q2 transferiert
  const tFrac = transferRate / 100;
  const secondaryShares = [
    primaryShares[0] + primaryShares[0] * tFrac * 1.8 + tFrac * 4.0,
    primaryShares[1] + primaryShares[1] * tFrac * 0.8 + tFrac * 2.0,
    primaryShares[2] + primaryShares[2] * tFrac * 0.1,
    primaryShares[3] - primaryShares[3] * tFrac * 0.3,
    primaryShares[4] - primaryShares[4] * tFrac * 0.6,
  ];

  // Normalisieren auf 100%
  const sumSec = secondaryShares.reduce((a, b) => a + b, 0);
  const normalizedSec = secondaryShares.map((s) => Number(((s / sumSec) * 100).toFixed(1)));

  // Kumulierte Anteile fuer Lorenz-Kurve
  const kumuliert = [0];
  let acc = 0;
  for (const s of normalizedSec) {
    acc += s;
    kumuliert.push(Math.min(100, Number(acc.toFixed(1))));
  }

  // Gini-Koeffizient Approximation (Diskrete Trapezregel auf 5 Quintilen)
  // Flaeche unter der Kurve B = sum( (y_i + y_{i-1}) / 2 * 20 ) / 10000
  let flaecheB = 0;
  for (let i = 1; i <= 5; i++) {
    flaecheB += ((kumuliert[i] + kumuliert[i - 1]) / 2) * 20;
  }
  // Max Flaeche unter Diagonale = 100 * 100 / 2 = 5000
  const gini = Number(((5000 - flaecheB) / 5000).toFixed(2));

  // Primaerer Gini zum Vergleich (ca. 0.44)
  const primaryGini = 0.44;

  // SVG Punkte fuer Lorenz-Kurve (Skaliert auf 200x200)
  // X: 0% -> 0, 20% -> 40, 40% -> 80, 60% -> 120, 80% -> 160, 100% -> 200
  // Y: invertiert: 200 - (kumuliert * 2)
  const svgPoints = kumuliert
    .map((val, idx) => `${idx * 40},${200 - val * 2}`)
    .join(" ");

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
            {lang === "de" ? "Didaktisches Labor: Verteilungspolitik" : "学科教具：分配政策与洛伦兹曲线沙盘"}
          </div>
          <h4 className="font-serif text-base text-[var(--ink)] font-semibold mt-0.5">
            {lang === "de" ? "Lorenz-Kurve & Gini-Koeffizient" : "洛伦兹曲线与基尼系数动态再分配"}
          </h4>
        </div>
        <div className="font-mono text-xs text-[var(--gray)]">
          {lang === "de" ? "EF SoWi: Soziale Marktwirtschaft" : "北威州 EF SoWi：社会市场经济"}
        </div>
      </div>

      {/* Definition & Formel */}
      <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-center">
        <span className="font-mono text-xs text-[var(--gray)] block mb-1">
          {lang === "de" ? "Gini-Koeffizient Definition:" : "基尼系数定义公式："}
        </span>
        <MathHtml
          code="G = \frac{\text{Fläche } A}{\text{Fläche } (A + B)} \in [0; 1] \quad (0 = \text{vollkommene Gleichheit}, \quad 1 = \text{maximale Ungleichheit})"
          display
          cacheKey="gini-definition-formula"
        />
      </div>

      {/* Interaktive Simulation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Lorenz-Kurve */}
        <div className="flex flex-col items-center justify-center p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)]">
          <div className="font-mono text-xs text-[var(--gray)] mb-2">
            {lang === "de" ? "Lorenz-Diagramm (Bevoelkerung vs. Einkommen)" : "洛伦兹图（人口累计% vs 财富累计%）"}
          </div>

          <svg viewBox="0 0 240 240" className="w-56 h-56">
            {/* Achsen */}
            <line x1="30" y1="210" x2="230" y2="210" stroke="var(--ink)" strokeWidth="1.5" />
            <line x1="30" y1="210" x2="30" y2="10" stroke="var(--ink)" strokeWidth="1.5" />

            {/* Diagonale der vollkommenen Gleichverteilung */}
            <line x1="30" y1="210" x2="230" y2="10" stroke="var(--gray)" strokeWidth="1.5" strokeDasharray="4 4" />

            {/* Lorenz-Kurve Polygon */}
            <g transform="translate(30, 10)">
              {/* Flaeche A (zwischen Diagonale und Kurve) */}
              <polygon
                points={`0,200 ${svgPoints} 200,0`}
                fill="rgba(194, 65, 12, 0.15)"
              />
              {/* Lorenz-Linie */}
              <polyline
                points={svgPoints}
                fill="none"
                stroke="var(--accent)"
                strokeWidth="2.5"
              />
              {/* Datenpunkte */}
              {kumuliert.map((val, idx) => (
                <circle
                  key={idx}
                  cx={idx * 40}
                  cy={200 - val * 2}
                  r="3.5"
                  fill="var(--paper)"
                  stroke="var(--accent)"
                  strokeWidth="2"
                />
              ))}
            </g>

            {/* Beschriftungen */}
            <text x="120" y="230" fontSize="10" fontFamily="monospace" textAnchor="middle" fill="var(--gray)">
              {lang === "de" ? "Bevoelkerung kumuliert (%)" : "人口累计份额 (%)"}
            </text>
            <text x="15" y="100" fontSize="10" fontFamily="monospace" textAnchor="middle" transform="rotate(-90, 15, 100)" fill="var(--gray)">
              {lang === "de" ? "Einkommen (%)" : "收入累计 (%)"}
            </text>
          </svg>

          {/* Gini Kennzahl */}
          <div className="mt-3 flex items-center justify-center gap-4 text-center">
            <div className="font-mono text-xs">
              <span className="text-[var(--gray)] block">{lang === "de" ? "Markteinkommen (vor Transfers)" : "市场原始分配"}</span>
              <span className="font-bold text-red-700">G = {primaryGini}</span>
            </div>
            <div className="text-[var(--line)]">→</div>
            <div className="font-mono text-xs">
              <span className="text-[var(--gray)] block">{lang === "de" ? "Nettoeinkommen (nach Transfers)" : "再分配后净收入"}</span>
              <span className="font-bold text-emerald-700 text-sm">G = {gini}</span>
            </div>
          </div>
        </div>

        {/* Steuerung & Quintil-Balken */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <label htmlFor={sliderId} className="text-[var(--ink)] font-medium">
                {lang === "de" ? "Staatliche Umverteilungsintensitaet:" : "国家税收与转移支付调控力度："}
              </label>
              <span className="text-[var(--accent)] font-semibold">{transferRate}%</span>
            </div>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={60}
              step={5}
              value={transferRate}
              onChange={(e) => setTransferRate(parseInt(e.target.value, 10))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          {/* Quintile Balkendiagramm */}
          <div className="space-y-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3">
            <div className="text-xs font-mono text-[var(--gray)] font-medium mb-1">
              {lang === "de" ? "Einkommensanteil nach Quintilen:" : "各五等分层人群收入占比："}
            </div>
            {normalizedSec.map((share, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                <span className="w-16 text-[var(--gray)] text-[11px]">
                  Q{idx + 1} ({idx * 20}–{(idx + 1) * 20}%)
                </span>
                <div className="flex-1 bg-[var(--paper-subtle)] h-4 rounded-sm overflow-hidden border border-[var(--line)]">
                  <div
                    style={{ width: `${share * 2}%` }}
                    className={`h-full transition-all duration-300 ${
                      idx === 0 ? "bg-emerald-500" : idx === 4 ? "bg-amber-600" : "bg-sky-500"
                    }`}
                  />
                </div>
                <span className="w-12 text-right font-medium text-[var(--ink)]">{share}%</span>
              </div>
            ))}
          </div>

          {/* Klausur-Satz */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs leading-relaxed text-[var(--ink)]">
            <div className="font-mono font-semibold text-[var(--accent)] mb-1">
              {lang === "de" ? "Abitur-Argumentationskette (Soziale Sicherung):" : "考场论证逻辑链 (AFB II/III)："}
            </div>
            <p className="font-serif text-xs">
              {lang === "de"
                ? `„Durch progressive Besteuerung und Sozialtransfers wird die primäre Einkommensungleichheit (Gini = ${primaryGini}) wirksam auf Gini = ${gini} abgefedert. Dies stabilisiert die Massenkaufkraft und sichert den sozialen Frieden gemäss dem Sozialstaatsgebot (Art. 20 Abs. 1 GG).“`
                : `“通过累进所得税与社会转移支付，原始市场分配的不平等（基尼系数由 ${primaryGini} 降至 ${gini}）得到有效平抑，这不仅依据基本法第20条社会国家原则保障了社会公平，同时夯实了大众有效购买力。”`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GiniAllocatorSim;
