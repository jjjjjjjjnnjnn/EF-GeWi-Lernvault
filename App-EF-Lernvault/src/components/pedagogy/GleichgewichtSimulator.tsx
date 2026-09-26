import { useState, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface GleichgewichtSimulatorProps {
  lang: Lang;
}

/**
 * GleichgewichtSimulator: Interaktives chemisches Labor zum dynamischen Gleichgewicht
 * und dem Prinzip von Le Chatelier (NRW EF Chemie: MWG & Kinetik).
 *
 * Ermöglicht Schülern die interaktive Entdeckung:
 * Störung des Gleichgewichts (Druck, Temperatur, Konzentration) -> Beobachtung der Ausweichreaktion!
 */
export function GleichgewichtSimulator({ lang }: GleichgewichtSimulatorProps) {
  // Modell-Reaktion: N2 + 3 H2 <=> 2 NH3 (exotherm, Delta H < 0)
  const [temperatur, setTemperatur] = useState<number>(300); // Kelvin: 300K - 800K
  const [druck, setDruck] = useState<number>(1); // bar: 1 - 50
  const [cEdukte, setCEdukte] = useState<number>(1.0); // mol/L

  const tempSliderId = useId();
  const druckSliderId = useId();
  const eduktSliderId = useId();

  // Berechnete Gleichgewichtslage nach Le Chatelier:
  // Höhere Temperatur begünstigt endotherme Rückreaktion (weniger NH3)
  // Höherer Druck begünstigt Seite mit weniger Gasteilchen (4 mol Gas -> 2 mol Gas, mehr NH3)
  // Mehr Edukte begünstigen Hinreaktion
  const ausbeute = Math.min(
    95,
    Math.max(5, Math.round(50 + (druck - 1) * 0.8 - (temperatur - 300) * 0.08 + (cEdukte - 1.0) * 15))
  );

  let richtungDE = "Im Gleichgewicht";
  let richtungZH = "处于平衡状态";
  let pfeilRichtung = "⇌";

  if (ausbeute > 55) {
    richtungDE = "Verschiebung nach rechts (Hinreaktion / Produktbildung)";
    richtungZH = "平衡向右移动（正反应 / 生成产物）";
    pfeilRichtung = "→";
  } else if (ausbeute < 45) {
    richtungDE = "Verschiebung nach links (Rückreaktion / Eduktzerfall)";
    richtungZH = "平衡向左移动（逆反应 / 分解为反应物）";
    pfeilRichtung = "←";
  }

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
      {/* Kopfzeile */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
            {lang === "de" ? "Didaktisches Labor: Chemisches Gleichgewicht" : "学科教具：化学反应平衡与勒夏特列原理沙盘"}
          </div>
          <h4 className="font-serif text-base text-[var(--ink)] font-semibold mt-0.5">
            {lang === "de" ? "Prinzip vom kleinsten Zwang (Le Chatelier)" : "最小约束原理沙盘 (Le Chatelier)"}
          </h4>
        </div>
        <span className="font-mono text-xs px-2 py-0.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)]">
          Chemie · EF MWG
        </span>
      </div>

      {/* Reaktionsgleichung */}
      <div className="text-center p-3 rounded-[var(--radius)] bg-[var(--paper-subtle)] border border-[var(--line)]">
        <div className="font-mono text-[10px] text-[var(--gray)] uppercase tracking-wider mb-1">
          {lang === "de" ? "Modell-Gleichgewicht (Exotherm)" : "典型平衡反应（放热反应）"}
        </div>
        <MathHtml
          code="\text{N}_2\text{(g)} + 3\,\text{H}_2\text{(g)} \;\rightleftharpoons\; 2\,\text{NH}_3\text{(g)} \quad (\Delta H < 0)"
          display
          cacheKey="le-chatelier-reaktion"
        />
        <div className="mt-2 font-mono text-xs font-semibold text-[var(--accent)]">
          {pfeilRichtung} {lang === "de" ? richtungDE : richtungZH}
        </div>
      </div>

      {/* Parameter-Regler */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
        {/* Temperatur */}
        <div className="p-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
          <div className="flex justify-between items-center text-[var(--ink)]">
            <label htmlFor={tempSliderId} className="cursor-pointer">
              {lang === "de" ? "Temperatur T:" : "温度 T:"}
            </label>
            <span className="font-semibold text-[var(--accent)]">{temperatur} K</span>
          </div>
          <input
            id={tempSliderId}
            type="range"
            min="300"
            max="800"
            step="20"
            value={temperatur}
            onChange={(e) => setTemperatur(parseInt(e.target.value, 10))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
          <div className="text-[10px] text-[var(--gray)]">
            {lang === "de" ? "Wärmezufuhr begünstigt endotherme Rückreaktion" : "吸热方向抵消升温"}
          </div>
        </div>

        {/* Druck */}
        <div className="p-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
          <div className="flex justify-between items-center text-[var(--ink)]">
            <label htmlFor={druckSliderId} className="cursor-pointer">
              {lang === "de" ? "Druck p:" : "总压强 p:"}
            </label>
            <span className="font-semibold text-[var(--ink)]">{druck} bar</span>
          </div>
          <input
            id={druckSliderId}
            type="range"
            min="1"
            max="50"
            step="1"
            value={druck}
            onChange={(e) => setDruck(parseInt(e.target.value, 10))}
            className="w-full accent-[var(--ink)] cursor-pointer"
          />
          <div className="text-[10px] text-[var(--gray)]">
            {lang === "de" ? "Druckerhöhung weicht auf weniger Gasteilchen aus" : "加压偏向气体分子数少的一侧"}
          </div>
        </div>

        {/* Konzentration Edukte */}
        <div className="p-3 rounded border border-[var(--line)] bg-[var(--paper-subtle)] space-y-1">
          <div className="flex justify-between items-center text-[var(--ink)]">
            <label htmlFor={eduktSliderId} className="cursor-pointer">
              {lang === "de" ? "Edukt c(N2, H2):" : "反应物浓度:"}
            </label>
            <span className="font-semibold text-[var(--success)]">{cEdukte} mol/L</span>
          </div>
          <input
            id={eduktSliderId}
            type="range"
            min="0.2"
            max="3.0"
            step="0.1"
            value={cEdukte}
            onChange={(e) => setCEdukte(parseFloat(e.target.value))}
            className="w-full accent-[var(--success)] cursor-pointer"
          />
          <div className="text-[10px] text-[var(--gray)]">
            {lang === "de" ? "Eduktzugabe erzwingt Hinreaktion" : "增加反应物促使正向移动"}
          </div>
        </div>
      </div>

      {/* Ausbeute-Balken */}
      <div className="p-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]">
        <div className="flex justify-between font-mono text-xs mb-1.5">
          <span className="text-[var(--gray)]">{lang === "de" ? "Gleichgewichtsausbeute an NH3 (Produkt):" : "平衡产率 NH3:"}</span>
          <span className="font-bold text-[var(--ink)]">{ausbeute}%</span>
        </div>
        <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--accent)] transition-all duration-300"
            style={{ width: `${ausbeute}%` }}
          />
        </div>
      </div>

      {/* Klausur-Formel-Box */}
      <div className="rounded-[var(--radius)] border-l-4 border-[var(--accent)] bg-[var(--paper-subtle)] p-3 text-xs font-serif leading-relaxed text-[var(--ink)]">
        <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--accent)] font-semibold mb-1">
          Klausur-Merksatz · 考试核心结论
        </div>
        <p>
          {lang === "de"
            ? "Wird auf ein im dynamischen Gleichgewicht befindliches System ein äußerer Zwang (Druck, Temperatur, Konzentration) ausgeübt, so weicht das System diesem Zwang aus, indem diejenige Reaktion bevorzugt abläuft, die den Zwang mindert."
            : "对处于动态平衡的体系施加外部约束（温度、压强、浓度变化）时，体系将沿着减弱此种外部约束的方向移动，直至建立新的动态平衡。"}
        </p>
      </div>
    </div>
  );
}
