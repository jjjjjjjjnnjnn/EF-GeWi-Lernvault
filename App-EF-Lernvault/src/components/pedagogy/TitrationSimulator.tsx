import { useState, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface TitrationSimulatorProps {
  lang: Lang;
}

/**
 * TitrationSimulator: Interaktives Chemielabor zur Säure-Base-Titration
 * (NRW EF/Q1 Chemie: Autoprotolyse, Neutralisation & Titrationskurven).
 *
 * Simuliert die tropfenweise Zugabe von Natronlauge (NaOH) zu Salzsäure (HCl)
 * mit Indikatorumschlag (Bromthymolblau / Phenolphthalein) und pH-Kurve.
 */
export function TitrationSimulator({ lang }: TitrationSimulatorProps) {
  // Ausgangsbedingungen: 20 mL 0.1 M HCl (starke Säure)
  // Zugabe von 0.1 M NaOH (starke Base)
  const [zugabeML, setZugabeML] = useState<number>(0);
  const [indikator, setIndikator] = useState<"bromthymol" | "phenolphthalein">("bromthymol");

  const sliderId = useId();

  // pH-Berechnung (starke Säure / starke Base Näherung)
  // n_H+ initial = 20 mL * 0.1 mmol/mL = 2.0 mmol
  // n_OH- zugegeben = zugabeML * 0.1 mmol/mL
  // Gesamtvolumen = 20 + zugabeML mL
  const nH0 = 2.0; // mmol
  const nOH = zugabeML * 0.1; // mmol
  const vTotal = 20 + zugabeML; // mL

  let ph = 7.0;
  if (nOH < nH0) {
    const cAcid = (nH0 - nOH) / vTotal;
    ph = -Math.log10(cAcid);
  } else if (nOH > nH0) {
    const cBase = (nOH - nH0) / vTotal;
    const pOH = -Math.log10(cBase);
    ph = 14.0 - pOH;
  } else {
    ph = 7.0; // Äquivalenzpunkt
  }
  ph = Math.min(13.8, Math.max(1.0, Number(ph.toFixed(2))));

  // Indikatorfarbe
  let flussigkeitsFarbe = "bg-amber-100/40 text-amber-900 border-amber-300";
  let farbNameDE = "Gelb (sauer)";
  let farbNameZH = "黄色（酸性）";

  if (indikator === "bromthymol") {
    if (ph < 6.0) {
      flussigkeitsFarbe = "bg-amber-100 text-amber-900 border-amber-300";
      farbNameDE = "Gelb (pH < 6,0)";
      farbNameZH = "黄色 (pH < 6.0)";
    } else if (ph <= 7.6) {
      flussigkeitsFarbe = "bg-emerald-100 text-emerald-900 border-emerald-400";
      farbNameDE = "Grün (Neutralbereich, pH 6,0–7,6)";
      farbNameZH = "绿色（中性突跃区, pH 6.0–7.6）";
    } else {
      flussigkeitsFarbe = "bg-sky-100 text-sky-900 border-sky-400";
      farbNameDE = "Blau (pH > 7,6)";
      farbNameZH = "蓝色 (pH > 7.6)";
    }
  } else {
    // Phenolphthalein: farblos bis pH 8.2, pink ab pH 8.2
    if (ph < 8.2) {
      flussigkeitsFarbe = "bg-slate-50 text-slate-800 border-slate-300";
      farbNameDE = "Farblos (pH < 8,2)";
      farbNameZH = "无色透明 (pH < 8.2)";
    } else {
      flussigkeitsFarbe = "bg-pink-100 text-pink-900 border-pink-400";
      farbNameDE = "Magenta / Pink (pH > 8,2)";
      farbNameZH = "洋红色 / 粉红 (pH > 8.2)";
    }
  }

  // Ist Äquivalenzpunkt erreicht?
  const isAequiv = Math.abs(zugabeML - 20) <= 0.5;

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
            {lang === "de" ? "Didaktisches Labor: Säure-Base-Titration" : "学科教具：酸碱滴定中和反应与指示剂沙盘"}
          </div>
          <h4 className="font-serif text-base text-[var(--ink)] font-semibold mt-0.5">
            {lang === "de" ? "Titrationskurve & Indikatorumschlag" : "滴定曲线与指示剂变色突跃 (HCl + NaOH)"}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-mono text-xs text-[var(--gray)]">
            {lang === "de" ? "Indikator:" : "指示剂："}
          </label>
          <select
            value={indikator}
            onChange={(e) => setIndikator(e.target.value as "bromthymol" | "phenolphthalein")}
            className="rounded border border-[var(--line)] bg-[var(--paper)] px-2 py-1 font-mono text-xs text-[var(--ink)] focus:border-[var(--accent)] focus:outline-none"
          >
            <option value="bromthymol">{lang === "de" ? "Bromthymolblau (pH 6,0–7,6)" : "溴百里酚蓝 (pH 6.0–7.6)"}</option>
            <option value="phenolphthalein">{lang === "de" ? "Phenolphthalein (pH 8,2–10,0)" : "酚酞 (pH 8.2–10.0)"}</option>
          </select>
        </div>
      </div>

      {/* Reaktionsgleichung */}
      <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-center">
        <span className="font-mono text-xs text-[var(--gray)] block mb-1">
          {lang === "de" ? "Neutralisationsreaktion:" : "中和反应方程式："}
        </span>
        <MathHtml
          code="\mathrm{HCl} + \mathrm{NaOH} \longrightarrow \mathrm{NaCl} + \mathrm{H_2O} \quad (\mathrm{H_3O^+} + \mathrm{OH^-} \rightleftharpoons 2\,\mathrm{H_2O})"
          display
          cacheKey="titration-reaction"
        />
      </div>

      {/* Labor-Simulation: Bürette & Erlenmeyerkolben */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* Kolben & Farbe */}
        <div className="flex flex-col items-center justify-center p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)]">
          <div className="font-mono text-xs text-[var(--gray)] mb-2">
            {lang === "de" ? "Erlenmeyerkolben (Vorlage: 20 mL 0,1 M HCl)" : "锥形瓶（底液：20 mL 0.1 M HCl）"}
          </div>

          <div
            className={`w-36 h-36 rounded-b-3xl border-2 flex flex-col items-center justify-center p-3 text-center transition-colors duration-300 ${flussigkeitsFarbe}`}
          >
            <span className="font-mono text-xl font-bold tracking-tight">pH = {ph.toFixed(2)}</span>
            <span className="font-mono text-xs mt-1 font-medium">
              {lang === "de" ? farbNameDE : farbNameZH}
            </span>
            <span className="font-mono text-[10px] opacity-80 mt-1">
              V = {vTotal.toFixed(1)} mL
            </span>
          </div>

          <div className="mt-3 text-center">
            {isAequiv ? (
              <span className="inline-block px-2 py-0.5 rounded font-mono text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
                {lang === "de" ? "Aequivalenzpunkt erreicht! (pH = 7,00)" : "已达到化学计量等当点！(pH = 7.00)"}
              </span>
            ) : ph < 7 ? (
              <span className="font-mono text-xs text-amber-700">
                {lang === "de" ? "Saurer Bereich (Ueberschuss an H3O+)" : "酸性区域（H3O+ 过量）"}
              </span>
            ) : (
              <span className="font-mono text-xs text-sky-700">
                {lang === "de" ? "Alkalischer Bereich (Ueberschuss an OH-)" : "碱性区域（OH- 过量）"}
              </span>
            )}
          </div>
        </div>

        {/* Steuerung & Titrations-Schritte */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-1">
              <label htmlFor={sliderId} className="text-[var(--ink)] font-medium">
                {lang === "de" ? "Zugegebenes NaOH (0,1 M):" : "滴定管滴入 NaOH 体积 (0.1 M)："}
              </label>
              <span className="text-[var(--accent)] font-semibold">{zugabeML.toFixed(1)} mL / 40.0 mL</span>
            </div>
            <input
              id={sliderId}
              type="range"
              min={0}
              max={40}
              step={0.5}
              value={zugabeML}
              onChange={(e) => setZugabeML(parseFloat(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          {/* Schnell-Buttons zum Tropfen */}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setZugabeML(0)}
              className="px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[var(--ink)] transition-colors"
            >
              {lang === "de" ? "Start (0 mL)" : "重置 (0 mL)"}
            </button>
            <button
              type="button"
              onClick={() => setZugabeML((v) => Math.max(0, Number((v - 1).toFixed(1))))}
              className="px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[var(--ink)] transition-colors"
            >
              - 1.0 mL
            </button>
            <button
              type="button"
              onClick={() => setZugabeML((v) => Math.min(40, Number((v + 1).toFixed(1))))}
              className="px-2.5 py-1 font-mono text-xs rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[var(--ink)] transition-colors"
            >
              + 1.0 mL
            </button>
            <button
              type="button"
              onClick={() => setZugabeML(20)}
              className="px-2.5 py-1 font-mono text-xs rounded border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] font-semibold hover:bg-[var(--accent)]/20 transition-colors"
            >
              {lang === "de" ? "Aequivalenzpunkt (20 mL)" : "等当点 (20 mL)"}
            </button>
          </div>

          {/* Didaktische Erkenntnis */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs leading-relaxed text-[var(--ink)]">
            <div className="font-mono font-semibold text-[var(--accent)] mb-1">
              {lang === "de" ? "Didaktischer Aha-Moment:" : "探究核心启示 (Aha-Moment)："}
            </div>
            {lang === "de" ? (
              <p>
                Beachte den steilen <strong>pH-Sprung</strong> um 20 mL: Wenige Tropfen verändern den pH-Wert
                schlagartig von 3 auf 11, da die logarithmische Konzentration der freien Hydronium-Ionen
                an der Neutralisation infinitesimal klein wird!
              </p>
            ) : (
              <p>
                观察在 <strong>20 mL 处剧烈的滴定突跃</strong>：只需极少量的几滴强碱，pH 就会瞬间由 3 飙升至 11，
                因为游离的氢离子浓度在完全中和瞬间发生了数量级塌陷！
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TitrationSimulator;
