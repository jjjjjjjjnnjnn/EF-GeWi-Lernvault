import { useState, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface OsmoseSimulatorProps {
  lang: Lang;
  initialPsiSInnen?: number;
  initialPsiSAussen?: number;
}

/**
 * OsmoseSimulator: Interaktives biologisches Labor zur quantitativen Osmose
 * und Wasserpotenzial-Steuerung (NRW EF Inhaltsfeld 1: Biomembran & Osmose).
 *
 * Ermöglicht Schülern die interaktive Entdeckung (Discovery Learning nach Bruner):
 * Parameter verändern -> Zelle beobachten -> Psi berechnen -> Aha-Effekt!
 */
export function OsmoseSimulator({
  lang,
  initialPsiSInnen = -0.8,
  initialPsiSAussen = -0.3,
}: OsmoseSimulatorProps) {
  const [psiSInnen, setPsiSInnen] = useState<number>(initialPsiSInnen);
  const [psiPInnen, setPsiPInnen] = useState<number>(0.3);
  const [psiSAussen, setPsiSAussen] = useState<number>(initialPsiSAussen);
  const [hypothese, setHypothese] = useState<"einstrom" | "ausstrom" | "ruhe" | null>(null);

  const innenSliderId = useId();
  const aussenSliderId = useId();
  const turgorSliderId = useId();

  // Berechnungen nach NRW Kernlehrplan:
  // Psi = Psi_s + Psi_p
  // Delta_Psi = Psi_aussen - Psi_innen
  const psiInnen = Number((psiSInnen + psiPInnen).toFixed(2));
  const psiAussen = Number(psiSAussen.toFixed(2));
  const deltaPsi = Number((psiAussen - psiInnen).toFixed(2));

  // Zustand der Zelle:
  let zustandDE = "Normaler Turgor";
  let zustandZH = "正常细胞膨压";
  let zustandFarbe = "var(--ink)";

  if (deltaPsi > 0.05) {
    zustandDE = "Wasser-Einstrom (Deplasmolyse / Zelle schwillt an)";
    zustandZH = "水分内流（质壁分离复原 / 细胞膨胀）";
    zustandFarbe = "var(--success)";
  } else if (deltaPsi < -0.05) {
    if (psiPInnen <= 0.05) {
      zustandDE = "Plasmolyse! (Protoplast löst sich von der Zellwand)";
      zustandZH = "质壁分离！（原生质体脱离细胞壁）";
      zustandFarbe = "var(--accent)";
    } else {
      zustandDE = "Wasser-Ausstrom (Turgor sinkt)";
      zustandZH = "水分外流（膨压下降）";
      zustandFarbe = "var(--ink)";
    }
  } else {
    zustandDE = "Dynamisches Gleichgewicht (Nettofluss = 0)";
    zustandZH = "动态平衡（净流速为零）";
    zustandFarbe = "var(--ink)";
  }

  // Zellform-Radius basierend auf Turgor / DeltaPsi
  const zellSkalierung = Math.min(1.15, Math.max(0.75, 0.95 + deltaPsi * 0.2 + psiPInnen * 0.1));

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
            {lang === "de" ? "Didaktisches Labor: Biomembran & Osmose" : "学科教具：生物膜跨膜渗透压实验室"}
          </div>
          <h4 className="font-serif text-base text-[var(--ink)] font-semibold mt-0.5">
            {lang === "de" ? "Wasserpotenzial-Simulator (Ψ = Ψs + Ψp)" : "水势定量模拟沙盘 (Ψ = Ψs + Ψp)"}
          </h4>
        </div>
        <span className="font-mono text-xs px-2 py-0.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)]">
          Bio · IF1 EF
        </span>
      </div>

      {/* Interaktive Hypothese / Bruner Discovery Schritt */}
      <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs">
        <div className="font-sans font-medium text-[var(--ink)] mb-1">
          {lang === "de"
            ? "1. Entdeckungsfrage: Wohin strömt das Wasser, wenn die Außenlösung konzentrierter wird (Ψaussen sinkt)?"
            : "1. 探究猜想：当外界溶液变浓（Ψ外界下降），水分会流向何处？"}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <button
            type="button"
            onClick={() => setHypothese("ausstrom")}
            className={`px-2.5 py-1 rounded-[var(--radius)] border font-mono text-xs transition-colors cursor-pointer ${
              hypothese === "ausstrom"
                ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--ink)] font-semibold"
                : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper)]"
            }`}
          >
            {lang === "de" ? "Aus der Zelle hinaus (Ausstrom)" : "流出细胞（水分外流）"}
          </button>
          <button
            type="button"
            onClick={() => setHypothese("einstrom")}
            className={`px-2.5 py-1 rounded-[var(--radius)] border font-mono text-xs transition-colors cursor-pointer ${
              hypothese === "einstrom"
                ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--ink)] font-semibold"
                : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper)]"
            }`}
          >
            {lang === "de" ? "In die Zelle hinein (Einstrom)" : "流入细胞（水分内流）"}
          </button>
          <button
            type="button"
            onClick={() => setHypothese("ruhe")}
            className={`px-2.5 py-1 rounded-[var(--radius)] border font-mono text-xs transition-colors cursor-pointer ${
              hypothese === "ruhe"
                ? "border-[var(--accent)] bg-[var(--accent)]/15 text-[var(--ink)] font-semibold"
                : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper)]"
            }`}
          >
            {lang === "de" ? "Keine Veränderung (Stillstand)" : "不流动（完全静止）"}
          </button>
        </div>
        {hypothese && (
          <div className="mt-2 text-xs font-sans text-[var(--ink)] border-t border-[var(--line)] pt-1.5">
            {hypothese === "ausstrom" ? (
              <span className="text-[var(--success)] font-medium">
                {lang === "de"
                  ? "Richtig! Wasser folgt passiv dem Potenzialgefälle zur Seite mit dem niedrigeren Ψ-Wert."
                  : "猜想正确！水分子顺水势梯度被动扩散，永远流向水势 Ψ 更低的一侧。"}
              </span>
            ) : (
              <span className="text-[var(--accent)]">
                {lang === "de"
                  ? "Prüfe mit den Schiebereglern unten: Was passiert, wenn Ψaussen negativer wird?"
                  : "请拨动下方滑块检验：当外界 Ψ变得更负时，水流向何处？"}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Labor-Visualisierung & Parameter-Kontrolle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Zelle & Osmose Visualisierung */}
        <div className="flex flex-col items-center justify-center p-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] min-h-[180px]">
          <svg
            width="180"
            height="140"
            viewBox="0 0 180 140"
            className="overflow-visible"
            aria-label="Osmose Zelle Diagramm"
          >
            {/* Feste Zellwand (Pflanzenzelle) */}
            <rect
              x="20"
              y="15"
              width="140"
              height="110"
              rx="8"
              fill="none"
              stroke="var(--gray)"
              strokeWidth="3"
            />
            {/* Protoplast / Biomembran (veränderbar) */}
            <rect
              x={90 - 60 * zellSkalierung}
              y={70 - 45 * zellSkalierung}
              width={120 * zellSkalierung}
              height={90 * zellSkalierung}
              rx={6 * zellSkalierung}
              fill="var(--accent)"
              fillOpacity={0.15}
              stroke="var(--accent)"
              strokeWidth="2"
              className="transition-all duration-300 ease-out"
            />
            {/* Pfeilrichtung Wasserstrom */}
            {deltaPsi > 0.05 && (
              <g stroke="var(--success)" strokeWidth="2.5" fill="none">
                <path d="M 5 70 L 40 70 M 32 63 L 40 70 L 32 77" />
                <path d="M 175 70 L 140 70 M 148 63 L 140 70 L 148 77" />
              </g>
            )}
            {deltaPsi < -0.05 && (
              <g stroke="var(--accent)" strokeWidth="2.5" fill="none">
                <path d="M 40 70 L 5 70 M 13 63 L 5 70 L 13 77" />
                <path d="M 140 70 L 175 70 M 167 63 L 175 70 L 167 77" />
              </g>
            )}
            <text
              x="90"
              y="74"
              textAnchor="middle"
              className="font-mono text-[11px] fill-[var(--ink)] font-semibold"
            >
              {deltaPsi < -0.2 && psiPInnen <= 0.05 ? "Plasmolyse" : "Protoplast"}
            </text>
          </svg>

          {/* Zustandstext */}
          <div
            className="mt-2 text-center text-xs font-mono font-medium"
            style={{ color: zustandFarbe }}
          >
            {lang === "de" ? zustandDE : zustandZH}
          </div>
        </div>

        {/* Schieberegler für Parameter */}
        <div className="space-y-3 font-mono text-xs">
          {/* Außenlösung Solutpotenzial */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[var(--ink)]">
              <label htmlFor={aussenSliderId} className="cursor-pointer">
                {lang === "de" ? "Außenlösung Ψs (Solut):" : "外界溶质势 Ψs (浓度):"}
              </label>
              <span className="font-semibold text-[var(--accent)]">{psiSAussen} MPa</span>
            </div>
            <input
              id={aussenSliderId}
              type="range"
              min="-1.5"
              max="0"
              step="0.05"
              value={psiSAussen}
              onChange={(e) => setPsiSAussen(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-[var(--gray)]">
              <span>{lang === "de" ? "Hyperton (-1.5)" : "高渗浓溶液 (-1.5)"}</span>
              <span>{lang === "de" ? "Reinwasser (0.0)" : "纯水 (0.0)"}</span>
            </div>
          </div>

          {/* Zelle Solutpotenzial */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[var(--ink)]">
              <label htmlFor={innenSliderId} className="cursor-pointer">
                {lang === "de" ? "Zelle innen Ψs (Solut):" : "细胞内溶质势 Ψs:"}
              </label>
              <span className="font-semibold">{psiSInnen} MPa</span>
            </div>
            <input
              id={innenSliderId}
              type="range"
              min="-1.5"
              max="-0.1"
              step="0.05"
              value={psiSInnen}
              onChange={(e) => setPsiSInnen(parseFloat(e.target.value))}
              className="w-full accent-[var(--ink)] cursor-pointer"
            />
          </div>

          {/* Turgor / Druckpotenzial */}
          <div className="space-y-1">
            <div className="flex justify-between items-center text-[var(--ink)]">
              <label htmlFor={turgorSliderId} className="cursor-pointer">
                {lang === "de" ? "Turgordruck Ψp (Druck):" : "细胞膨压 Ψp (反压):"}
              </label>
              <span className="font-semibold text-[var(--success)]">{psiPInnen} MPa</span>
            </div>
            <input
              id={turgorSliderId}
              type="range"
              min="0"
              max="1.0"
              step="0.05"
              value={psiPInnen}
              onChange={(e) => setPsiPInnen(parseFloat(e.target.value))}
              className="w-full accent-[var(--success)] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Formel-Auswertung & Klausur-Ergebnis */}
      <div className="border-t border-[var(--line)] pt-3 grid grid-cols-1 sm:grid-cols-3 gap-2 text-center text-xs font-mono">
        <div className="p-2 rounded bg-[var(--paper-subtle)] border border-[var(--line)]">
          <div className="text-[var(--gray)]">{lang === "de" ? "Ψ innen" : "细胞水势 Ψ内"}</div>
          <div className="font-semibold text-[var(--ink)] mt-0.5">
            {psiSInnen} + {psiPInnen} = {psiInnen} MPa
          </div>
        </div>
        <div className="p-2 rounded bg-[var(--paper-subtle)] border border-[var(--line)]">
          <div className="text-[var(--gray)]">{lang === "de" ? "Ψ aussen" : "外界水势 Ψ外"}</div>
          <div className="font-semibold text-[var(--ink)] mt-0.5">{psiAussen} MPa</div>
        </div>
        <div className="p-2 rounded bg-[var(--accent)]/10 border border-[var(--accent)]/30">
          <div className="text-[var(--accent)] font-medium">
            {lang === "de" ? "ΔΨ (Richtung)" : "ΔΨ (驱动力与流向)"}
          </div>
          <div className="font-semibold text-[var(--ink)] mt-0.5">
            {deltaPsi > 0 ? `+${deltaPsi}` : `${deltaPsi}`} MPa
          </div>
        </div>
      </div>

      {/* Klausur-Formel-Box */}
      <div className="rounded-[var(--radius)] border-l-4 border-[var(--accent)] bg-[var(--paper-subtle)] p-3 text-xs font-serif leading-relaxed text-[var(--ink)]">
        <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
          Klausur-Merksatz · 考试核心结论
        </div>
        <MathHtml
          code="\Psi = \Psi_s + \Psi_p \quad \text{mit} \quad \Delta\Psi = \Psi_{\text{außen}} - \Psi_{\text{innen}}"
          display
          cacheKey="osmose-formel"
        />
        <p className="mt-1">
          {lang === "de"
            ? "Wasser strömt stets passiv in Richtung des niedrigeren (negativeren) Wasserpotenzials. Der Turgor Ψp wirkt als elastischer Gegendruck und bremst den Einstrom, bis ein dynamisches Gleichgewicht (ΔΨ = 0) erreicht ist."
            : "水分子总是沿着水势梯度自发扩散至水势更低（更负）的一侧。细胞膨压 Ψp 作为弹性反作用力阻碍水分进一步进入，直至达到动态平衡（ΔΨ = 0）。"}
        </p>
      </div>
    </div>
  );
}
