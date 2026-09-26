import { useState, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface SchiefeEbeneSimProps {
  lang: Lang;
}

/**
 * SchiefeEbeneSim: Interaktives Physik-Labor zur Vektorzerlegung und Reibungsdynamik
 * (NRW EF Physik: Newtonsche Gesetze, Kraeftezerlegung & Reibung).
 *
 * Zerlegung der Gewichtskraft F_G in Hangabtriebskraft F_GH und Normalkraft F_N:
 * F_GH = m * g * sin(alpha)
 * F_N  = m * g * cos(alpha)
 * F_R  = mu * F_N
 * Gleitbedingung: tan(alpha) > mu -> Beschleunigung a = g * (sin(alpha) - mu * cos(alpha))
 */
export function SchiefeEbeneSim({ lang }: SchiefeEbeneSimProps) {
  const [alphaGrad, setAlphaGrad] = useState<number>(25); // Neigungswinkel in Grad (0 - 60)
  const [mu, setMu] = useState<number>(0.35); // Reibungszahl (0.05 - 0.8)
  const [masse, setMasse] = useState<number>(2.0); // Masse in kg (0.5 - 5.0)

  const angleSliderId = useId();
  const muSliderId = useId();
  const massSliderId = useId();

  const g = 9.81; // m/s^2
  const alphaRad = (alphaGrad * Math.PI) / 180;

  const fG = Number((masse * g).toFixed(2));
  const fGH = Number((fG * Math.sin(alphaRad)).toFixed(2));
  const fN = Number((fG * Math.cos(alphaRad)).toFixed(2));
  const fRMax = Number((mu * fN).toFixed(2));

  const rutscht = fGH > fRMax;
  const beschleunigung = rutscht
    ? Number((g * (Math.sin(alphaRad) - mu * Math.cos(alphaRad))).toFixed(2))
    : 0;

  const kritischerWinkelGrad = Number(((Math.atan(mu) * 180) / Math.PI).toFixed(1));

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
            {lang === "de" ? "Didaktisches Labor: Kraeftezerlegung" : "学科教具：牛顿力学斜面受力矢量分解沙盘"}
          </div>
          <h4 className="font-serif text-base text-[var(--ink)] font-semibold mt-0.5">
            {lang === "de" ? "Die Schiefe Ebene: Hangabtrieb vs. Reibung" : "斜面动力学：下滑分力与摩擦阻力动态博弈"}
          </h4>
        </div>
        <div className="font-mono text-xs text-[var(--gray)]">
          {lang === "de" ? "g = 9,81 m/s²" : "重力加速度 g = 9.81 m/s²"}
        </div>
      </div>

      {/* Formel-Header */}
      <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-center">
        <span className="font-mono text-xs text-[var(--gray)] block mb-1">
          {lang === "de" ? "Vektorielle Zerlegung & Bewegungsgleichung:" : "矢量分解与运动方程："}
        </span>
        <MathHtml
          code="F_{\mathrm{GH}} = m \cdot g \cdot \sin(\alpha), \quad F_{\mathrm{N}} = m \cdot g \cdot \cos(\alpha), \quad F_{\mathrm{R}} = \mu \cdot F_{\mathrm{N}}"
          display
          cacheKey="schiefe-ebene-formula"
        />
      </div>

      {/* Visualisierung: Interaktiver Vektorschnitt */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Skizze */}
        <div className="flex flex-col items-center justify-center p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)]">
          <svg viewBox="0 0 280 180" className="w-full max-w-[280px] h-40">
            {/* Schiefe Ebene Dreieck */}
            <polygon
              points={`30,150 250,150 250,${150 - Math.tan(alphaRad) * 220}`}
              fill="var(--paper-subtle)"
              stroke="var(--line)"
              strokeWidth="2"
            />
            {/* Bodenlinie */}
            <line x1="20" y1="150" x2="260" y2="150" stroke="var(--ink)" strokeWidth="2" />

            {/* Winkel alpha Kreisbogen */}
            <path
              d="M 70,150 A 40,40 0 0,0 67,136"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
            />
            <text x="80" y="145" fontSize="11" fontFamily="monospace" fill="var(--accent)" fontWeight="bold">
              α = {alphaGrad}°
            </text>

            {/* Koerper auf schiefer Ebene (Zentrum) */}
            <g transform={`translate(140, ${150 - Math.tan(alphaRad) * 110}) rotate(${-alphaGrad})`}>
              {/* Masse-Klotz */}
              <rect x="-20" y="-30" width="40" height="30" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
              <text x="-12" y="-12" fontSize="10" fontFamily="monospace" fill="var(--ink)" fontWeight="bold">
                {masse} kg
              </text>

              {/* Vektor F_N (senkrecht zur Ebene nach oben) */}
              <line x1="0" y1="-15" x2="0" y2={-15 - fN * 1.5} stroke="#0284c7" strokeWidth="2" markerEnd="url(#arrow)" />
              {/* Vektor F_R (entlang der Ebene nach oben/rechts) */}
              <line x1="0" y1="-15" x2={fRMax * 2} y2="-15" stroke="#d97706" strokeWidth="2" />
              {/* Vektor F_GH (entlang der Ebene nach unten/links) */}
              <line x1="0" y1="-15" x2={-fGH * 2} y2="-15" stroke="#dc2626" strokeWidth="2" />
            </g>
          </svg>

          {/* Dynamischer Status */}
          <div className="mt-2 text-center">
            {rutscht ? (
              <span className="inline-block px-3 py-1 rounded font-mono text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
                {lang === "de"
                  ? `Klotz rutscht! Beschleunigung a = ${beschleunigung} m/s²`
                  : `滑块加速滑落！加速度 a = ${beschleunigung} m/s²`}
              </span>
            ) : (
              <span className="inline-block px-3 py-1 rounded font-mono text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {lang === "de"
                  ? "Klotz in Ruhe (Haftreibung gleicht Hangabtrieb aus)"
                  : "滑块静止（静摩擦阻力平衡下滑分力）"}
              </span>
            )}
          </div>
        </div>

        {/* Steuerung & Kraefte-Tabelle */}
        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <label htmlFor={angleSliderId} className="text-[var(--ink)] font-medium">
                {lang === "de" ? "Neigungswinkel α:" : "斜面倾角 α："}
              </label>
              <span className="text-[var(--accent)] font-semibold">{alphaGrad}°</span>
            </div>
            <input
              id={angleSliderId}
              type="range"
              min={0}
              max={60}
              step={1}
              value={alphaGrad}
              onChange={(e) => setAlphaGrad(parseInt(e.target.value, 10))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <label htmlFor={muSliderId} className="text-[var(--ink)] font-medium">
                {lang === "de" ? "Reibungszahl μ:" : "摩擦系数 μ："}
              </label>
              <span className="text-[var(--accent)] font-semibold">{mu.toFixed(2)}</span>
            </div>
            <input
              id={muSliderId}
              type="range"
              min={0.05}
              max={0.8}
              step={0.05}
              value={mu}
              onChange={(e) => setMu(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <label htmlFor={massSliderId} className="text-[var(--ink)] font-medium">
                {lang === "de" ? "Masse m:" : "物体质量 m："}
              </label>
              <span className="text-[var(--accent)] font-semibold">{masse.toFixed(1)} kg</span>
            </div>
            <input
              id={massSliderId}
              type="range"
              min={0.5}
              max={5.0}
              step={0.5}
              value={masse}
              onChange={(e) => setMasse(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          {/* Kraefte-Uebersicht */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-2.5 space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-red-700 font-medium">{lang === "de" ? "Hangabtriebskraft F_GH:" : "下滑分力 F_GH："}</span>
              <span className="font-bold">{fGH} N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-amber-700 font-medium">{lang === "de" ? "Max. Reibungskraft F_R:" : "最大静摩擦力 F_R："}</span>
              <span className="font-bold">{fRMax} N</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sky-700 font-medium">{lang === "de" ? "Normalkraft F_N:" : "垂直正压力 F_N："}</span>
              <span className="font-bold">{fN} N</span>
            </div>
            <div className="flex justify-between border-t border-[var(--line)] pt-1 text-[var(--gray)]">
              <span>{lang === "de" ? "Kritischer Gleitwinkel:" : "临界起滑角 arctan(μ)："}</span>
              <span className="font-semibold text-[var(--accent)]">{kritischerWinkelGrad}°</span>
            </div>
          </div>

          {/* Klausur-Takeaway */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5 text-xs leading-relaxed text-[var(--ink)]">
            <div className="font-mono font-semibold text-[var(--accent)] mb-0.5">
              {lang === "de" ? "Didaktischer Aha-Moment:" : "探究核心启示 (Aha-Moment)："}
            </div>
            <p>
              {lang === "de"
                ? `Das Rutschen haengt ausschliesslich von tan(α) > μ ab! Die Masse m kuerzt sich in der Beschleunigungsgleichung vollstaendig heraus: a = g·(sin α - μ·cos α).`
                : `滑块是否开始滑动完全由 tan(α) > μ 决定！物体质量 m 在加速度方程中被完全消去，决定滑动的唯一因素是斜面倾角与摩擦系数！`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchiefeEbeneSim;
