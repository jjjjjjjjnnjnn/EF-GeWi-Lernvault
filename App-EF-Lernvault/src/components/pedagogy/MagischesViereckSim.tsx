import { useState, useMemo, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface MagischesViereckSimProps {
  lang?: Lang;
}

interface MacroState {
  wachstum: number;        // BIP-Wachstum in % (Ziel: 2.0 bis 3.0)
  arbeitslosigkeit: number;// Arbeitslosenquote in % (Ziel: < 4.0)
  inflation: number;       // Inflationsrate in % (Ziel: ca. 2.0)
  aussenbeitrag: number;   // Leistungsbilanzsaldo in % des BIP (Ziel: -1.5 bis +2.0)
}

interface ScenarioPreset {
  id: string;
  nameDe: string;
  nameZh: string;
  descDe: string;
  descZh: string;
  leitzins: number;         // % (0.5 bis 6.0)
  staatsausgaben: number;   // Mrd € (-40 bis +40)
  steuersatz: number;       // % (20 bis 40)
  lohnzuwachs: number;      // % (0 bis 6)
  schock: "none" | "oel" | "export";
}

const PRESETS: ScenarioPreset[] = [
  {
    id: "goldilocks",
    nameDe: "Magisches Gleichgewicht (Optimal)",
    nameZh: "四角理想稳态（黄金平衡）",
    descDe: "Harmonisches Zusammenspiel von moderatem Wachstum, Preisstabilität und Vollbeschäftigung.",
    descZh: "增长适度、物价稳定、充分就业与外贸均衡的黄金状态。",
    leitzins: 2.5,
    staatsausgaben: 0,
    steuersatz: 30,
    lohnzuwachs: 2.5,
    schock: "none",
  },
  {
    id: "boom",
    nameDe: "Hochkonjunktur & Überhitzung (Boom)",
    nameZh: "经济过热繁荣（需求拉动型通胀）",
    descDe: "Starke Gesamtnachfrage treibt Löhne und Preise; Kapazitätsgrenzen werden erreicht.",
    descZh: "总需求极度旺盛，产能见顶，失业率极低但通货膨胀大幅抬头。",
    leitzins: 1.0,
    staatsausgaben: 30,
    steuersatz: 24,
    lohnzuwachs: 5.2,
    schock: "none",
  },
  {
    id: "rezession",
    nameDe: "Rezession & Deflationsgefahr",
    nameZh: "经济深度衰退（需求萎缩与失业激增）",
    descDe: "Einbruch der Nachfrage, Investitionszurückhaltung, steigende Arbeitslosigkeit und Preisverfall.",
    descZh: "民间消费与投资意愿冰冻，失业率陡升，陷入负增长与通缩威胁。",
    leitzins: 4.5,
    staatsausgaben: -30,
    steuersatz: 36,
    lohnzuwachs: 0.8,
    schock: "none",
  },
  {
    id: "stagflation",
    nameDe: "Stagflation (Angebotsschock / Energiekrise)",
    nameZh: "恶性滞胀危机（供给侧能源冲击）",
    descDe: "Dramatischer Zielkonflikt: Stagnierendes BIP und hohe Arbeitslosigkeit treffen auf massive Inflation.",
    descZh: "经典大考难点：经济停滞与失业攀升的同时遭遇输入型恶性通胀（如1973石油危机）。",
    leitzins: 3.5,
    staatsausgaben: 10,
    steuersatz: 30,
    lohnzuwachs: 4.0,
    schock: "oel",
  },
];

export function MagischesViereckSim({ lang = "de" }: MagischesViereckSimProps) {
  const isDe = lang === "de";

  // Policy & environment inputs
  const [leitzins, setLeitzins] = useState<number>(2.5); // 0.5% - 6.0%
  const [staatsausgaben, setStaatsausgaben] = useState<number>(0); // -40 Mrd € bis +40 Mrd €
  const [steuersatz, setSteuersatz] = useState<number>(30); // 20% - 40%
  const [lohnzuwachs, setLohnzuwachs] = useState<number>(2.5); // 0% - 6%
  const [schock, setSchock] = useState<"none" | "oel" | "export">("none");

  // Active scenario preset id
  const [activePreset, setActivePreset] = useState<string>("goldilocks");
  const [activeTab, setActiveTab] = useState<"gesetz" | "operatoren" | "cn" | "ki">("gesetz");
  const [copiedQuery, setCopiedQuery] = useState(false);

  // Form IDs for a11y
  const zinsId = useId();
  const ausgabenId = useId();
  const steuerId = useId();
  const lohnId = useId();

  // Load preset
  const applyPreset = (preset: ScenarioPreset) => {
    setActivePreset(preset.id);
    setLeitzins(preset.leitzins);
    setStaatsausgaben(preset.staatsausgaben);
    setSteuersatz(preset.steuersatz);
    setLohnzuwachs(preset.lohnzuwachs);
    setSchock(preset.schock);
  };

  // Macro model engine
  const macro: MacroState = useMemo(() => {
    // Baseline state: growth = 2.4%, ALQ = 3.6%, inflation = 2.0%, balance = 1.0%
    // Fiscal impulse: Staatsausgaben (+40 = +1.0% BIP), Steuern (30% is neutral)
    const fiskalImpuls = (staatsausgaben / 40) * 1.1 - ((steuersatz - 30) / 10) * 0.7;

    // Monetary impulse: lower interest rate spurs investment & consumption (neutral = 2.5%)
    const monetarImpuls = (2.5 - leitzins) * 0.65;

    // Supply shock adjustment
    let schockWachstum = 0;
    let schockInflation = 0;
    let schockSaldo = 0;
    if (schock === "oel") {
      schockWachstum = -1.6;
      schockInflation = 3.8;
      schockSaldo = -1.8;
    } else if (schock === "export") {
      schockWachstum = -1.2;
      schockInflation = -0.6;
      schockSaldo = -2.5;
    }

    // Cost-push from wages (neutral = 2.5%)
    const lohnDruck = (lohnzuwachs - 2.5) * 0.55;

    // Aggregate demand & Growth
    const calcWachstum = 2.4 + fiskalImpuls + monetarImpuls + schockWachstum;
    const boundedWachstum = Math.max(-4.0, Math.min(6.5, calcWachstum));

    // Unemployment (Okun's law dynamic: growth > 1.8% reduces ALQ)
    const growthDelta = boundedWachstum - 2.0;
    const calcALQ = 3.8 - growthDelta * 0.75 + (schock === "oel" ? 1.2 : 0);
    const boundedALQ = Math.max(1.5, Math.min(12.0, calcALQ));

    // Inflation (Phillips curve + cost-push + shocks)
    const demandDruck = (boundedWachstum - 2.2) * 0.6;
    const calcInflation = 2.0 + demandDruck + lohnDruck + schockInflation - (leitzins - 2.5) * 0.4;
    const boundedInflation = Math.max(-1.5, Math.min(10.0, calcInflation));

    // Current account balance (Leistungsbilanz)
    // High domestic demand increases imports -> lowers surplus
    // High exchange rate pressure from high interest rates -> lowers surplus
    const inlandsNachfrage = fiskalImpuls + monetarImpuls;
    const calcSaldo = 1.2 - inlandsNachfrage * 0.65 + schockSaldo + (leitzins - 2.5) * 0.2;
    const boundedSaldo = Math.max(-5.0, Math.min(6.0, calcSaldo));

    return {
      wachstum: Number(boundedWachstum.toFixed(1)),
      arbeitslosigkeit: Number(boundedALQ.toFixed(1)),
      inflation: Number(boundedInflation.toFixed(1)),
      aussenbeitrag: Number(boundedSaldo.toFixed(1)),
    };
  }, [leitzins, staatsausgaben, steuersatz, lohnzuwachs, schock]);

  // Goal achievement scores (0 - 100)
  const goalScores = useMemo(() => {
    // 1. Wachstum (Ideal: 2.0% bis 3.0%)
    const wDist = macro.wachstum >= 2.0 && macro.wachstum <= 3.0
      ? 0
      : macro.wachstum < 2.0 ? 2.0 - macro.wachstum : macro.wachstum - 3.0;
    const wScore = Math.max(0, Math.min(100, Math.round(100 - wDist * 30)));

    // 2. Vollbeschäftigung (Ideal: < 4.0%, Optimal 2.0-3.5%)
    const alqDist = macro.arbeitslosigkeit <= 3.8 ? 0 : macro.arbeitslosigkeit - 3.8;
    const alqScore = Math.max(0, Math.min(100, Math.round(100 - alqDist * 22)));

    // 3. Preisstabilität (Ideal: 1.8% bis 2.2%)
    const infDist = Math.abs(macro.inflation - 2.0);
    const infScore = Math.max(0, Math.min(100, Math.round(100 - infDist * 25)));

    // 4. Außenwirtschaft (Ideal: -1.0% bis +2.0%)
    const saldoDist = macro.aussenbeitrag >= -1.0 && macro.aussenbeitrag <= 2.0
      ? 0
      : macro.aussenbeitrag < -1.0 ? -1.0 - macro.aussenbeitrag : macro.aussenbeitrag - 2.0;
    const saldoScore = Math.max(0, Math.min(100, Math.round(100 - saldoDist * 25)));

    const gesamtScore = Math.round((wScore + alqScore + infScore + saldoScore) / 4);

    return {
      wachstum: wScore,
      vollbeschaeftigung: alqScore,
      preisstabilitaet: infScore,
      aussenwirtschaft: saldoScore,
      gesamt: gesamtScore,
    };
  }, [macro]);

  // Radar plot coordinates
  // Center: (170, 160), Radius: 110 px
  // 4 Axes:
  // Top (0 deg): Wirtschaftswachstum
  // Right (90 deg): Preisstabilität (Inverse distance to 2%)
  // Bottom (180 deg): Hohe Beschäftigung (Inverse ALQ)
  // Left (270 deg): Außenwirtschaftliches Gleichgewicht
  const radarCoords = useMemo(() => {
    const cx = 170;
    const cy = 160;
    const rMax = 110;

    // Normalizer functions to 0.15 .. 1.0 radius fraction
    // Top: Wachstum (-2% -> 0.15, 2.5% -> 0.75 [target], 6% -> 1.0)
    const normW = Math.max(0.12, Math.min(1.0, 0.45 + (macro.wachstum / 6.0) * 0.5));
    // Right: Preisstabilität (Goal is 2.0%. 2% -> 0.8. Extreme inf/def -> close to 0.2)
    const normInf = Math.max(0.12, Math.min(1.0, 0.9 - Math.min(0.78, Math.abs(macro.inflation - 2.0) * 0.14)));
    // Bottom: Beschäftigung (ALQ = 2% -> 0.95. ALQ = 10% -> 0.15)
    const normALQ = Math.max(0.12, Math.min(1.0, 1.0 - (macro.arbeitslosigkeit / 12.0) * 0.85));
    // Left: Außenwirtschaft (Saldo: near +1% is 0.8. -4% or +6% degrades)
    const normSaldo = Math.max(0.12, Math.min(1.0, 0.85 - Math.min(0.7, Math.abs(macro.aussenbeitrag - 0.8) * 0.15)));

    // Points
    const pTop = { x: cx, y: cy - normW * rMax };
    const pRight = { x: cx + normInf * rMax, y: cy };
    const pBottom = { x: cx, y: cy + normALQ * rMax };
    const pLeft = { x: cx - normSaldo * rMax, y: cy };

    // Target polygon (ideal corridor zone, constant)
    const tTop = { x: cx, y: cy - 0.75 * rMax };
    const tRight = { x: cx + 0.82 * rMax, y: cy };
    const tBottom = { x: cx, y: cy + 0.82 * rMax };
    const tLeft = { x: cx - 0.82 * rMax, y: cy };

    return {
      cx,
      cy,
      rMax,
      currentPoints: `${pTop.x},${pTop.y} ${pRight.x},${pRight.y} ${pBottom.x},${pBottom.y} ${pLeft.x},${pLeft.y}`,
      targetPoints: `${tTop.x},${tTop.y} ${tRight.x},${tRight.y} ${tBottom.x},${tBottom.y} ${tLeft.x},${tLeft.y}`,
      pTop,
      pRight,
      pBottom,
      pLeft,
    };
  }, [macro]);

  // Detected key target conflicts
  const activeConflicts = useMemo(() => {
    const list: { titleDe: string; titleZh: string; descDe: string; descZh: string; severity: "critical" | "warning" }[] = [];

    // 1. Phillips-Kurve: Low ALQ vs High Inflation
    if (macro.arbeitslosigkeit < 3.5 && macro.inflation > 3.5) {
      list.push({
        titleDe: "Zielkonflikt: Phillips-Kurven-Dilemma",
        titleZh: "目标冲突：菲利普斯曲线两难（低失业 vs 高通胀）",
        descDe: "Die Annäherung an Vollbeschäftigung führt zu Engpässen am Arbeitsmarkt und treibt die Inflation drastisch an.",
        descZh: "充分就业导致劳动力市场趋紧并推高工薪，需求过热引发严峻通胀挑战。",
        severity: "critical",
      });
    }

    // 2. Stagflation: High Inflation + Stagnation/High ALQ
    if (macro.inflation > 4.5 && (macro.wachstum < 1.0 || macro.arbeitslosigkeit > 5.0)) {
      list.push({
        titleDe: "Klassische Stagflation (Gefährlichster Konflikt)",
        titleZh: "经典滞胀困境（最严峻的宏观经济学考试题型）",
        descDe: "Gleichzeitige Stagnation/Arbeitslosigkeit und hohe Inflation! Zinsanhebungen würgen das Wachstum ab, Steuersenkungen heizen die Preise weiter an.",
        descZh: "增长停滞与通胀并存！紧缩加息会窒息实体经济，而扩张财政则会给通胀火上浇油。",
        severity: "critical",
      });
    }

    // 3. Exportüberschuss vs Außenwirtschaftliches Gleichgewicht
    if (macro.aussenbeitrag > 3.0) {
      list.push({
        titleDe: "Zielkonflikt: Chronischer Leistungsbilanzüberschuss",
        titleZh: "目标冲突：慢性经常账户过高顺差（德国真实国情难题）",
        descDe: "Hohe Exportüberschüsse bedrohen das internationale Gleichgewicht und führen zu außenpolitischen Handelskonflikten.",
        descZh: "长期的结构性巨额顺差挤压贸易伙伴国生存空间，破坏外部经济动态平衡并引发关税制裁压力。",
        severity: "warning",
      });
    }

    // 4. Deflationsspirale
    if (macro.inflation < 0.5 && macro.wachstum < 0.5) {
      list.push({
        titleDe: "Deflationsgefahr & Abwärtsspirale",
        titleZh: "通货紧缩螺旋与需求悬崖",
        descDe: "Sinkende Preise verleiten Konsumenten zum Aufschub von Anschaffungen. Klassisches keynesianisches Marktversagen.",
        descZh: "物价低迷阻滞消费与投资开支，企业因预期悲观削减雇佣，滑向经典凯恩斯流动性陷阱。",
        severity: "critical",
      });
    }

    return list;
  }, [macro]);

  // Copy structured prompt for AI tutor
  const handleCopyTutorPrompt = () => {
    const prompt = isDe
      ? `[SoWi Klausur-Training: Magisches Viereck]
Aktuelle Makrolage:
- BIP-Wachstum: ${macro.wachstum}% (Ziel: 2.0-3.0%)
- Arbeitslosenquote: ${macro.arbeitslosigkeit}% (Ziel: <4.0%)
- Inflationsrate: ${macro.inflation}% (Ziel: ca. 2.0%)
- Leistungsbilanzsaldo: ${macro.aussenbeitrag}% des BIP (Ziel: -1.5 bis +2.0%)

Eingesetzte Hebel:
- EZB Leitzins: ${leitzins}%
- Fiskalimpuls Staatsausgaben: ${staatsausgaben > 0 ? `+${staatsausgaben}` : staatsausgaben} Mrd. €
- Steuersatz: ${steuersatz}%
- Lohnzuwachs: ${lohnzuwachs}%
- Exogener Schock: ${schock}

Aufgabe: Beurteile diese wirtschaftspolitische Konstellation gemäß § 1 Stabilitätsgesetz (1967) aus keynesianischer (angebotsorientierter vs. nachfrageorientierter) Perspektive (AFB III). Welche Zielkonflikte dominieren?`
      : `[SoWi 德国高中会考训练：宏观经济魔术四角形]
当前宏观经济指标：
- 经济增长率 (BIP): ${macro.wachstum}% (目标: 2.0-3.0%)
- 失业率 (ALQ): ${macro.arbeitslosigkeit}% (目标: <4.0%)
- 通货膨胀率: ${macro.inflation}% (目标: 约 2.0%)
- 经常账户差额: ${macro.aussenbeitrag}% (目标: -1.5% 至 +2.0%)

政策调控参数：
- 央行基准利率: ${leitzins}%
- 财政支出净变动: ${staatsausgaben > 0 ? `+${staatsausgaben}` : staatsausgaben} 亿欧元
- 宏观所得税率: ${steuersatz}%
- 工资协议涨幅: ${lohnzuwachs}%
- 外部冲击模式: ${schock}

答题任务：依据 1967 年《稳定与增长法》§1，分别从凯恩斯需求学派与弗里德曼供给学派视角评判上述政策组合（AFB III 评判题），分析主导的目标冲突并提出纠偏方案。`;

    navigator.clipboard.writeText(prompt);
    setCopiedQuery(true);
    setTimeout(() => setCopiedQuery(false), 2500);
  };

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5 text-[var(--ink)]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider">
            {isDe ? "SoWi GeWi-Labor: Wirtschaftspolitik & Konjunktur" : "社科数字工坊：宏观经济政策与魔术四角形博弈沙盘"}
          </div>
          <h4 className="font-serif text-lg font-semibold mt-0.5">
            {isDe ? "Das Magische Viereck (§ 1 Stabilitätsgesetz 1967)" : "魔术四角形：四大目标博弈与宏观调控动态沙盘"}
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-[var(--line)] bg-[var(--paper)] font-mono text-xs">
            <span className="text-[var(--gray)]">{isDe ? "Gesamt-Zielerreichung:" : "综合达成度："}</span>
            <span className={`font-bold ${goalScores.gesamt >= 80 ? "text-emerald-700" : goalScores.gesamt >= 55 ? "text-amber-700" : "text-rose-700"}`}>
              {goalScores.gesamt}%
            </span>
          </div>
        </div>
      </div>

      {/* Preset bar */}
      <div className="flex flex-wrap items-center gap-1.5 bg-[var(--paper-subtle)] p-2 rounded-[var(--radius)] border border-[var(--line)]">
        <span className="font-mono text-xs text-[var(--gray)] mr-1">
          {isDe ? "Abitur-Szenarien:" : "会考考题预设："}
        </span>
        {PRESETS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => applyPreset(p)}
            className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
              activePreset === p.id
                ? "bg-[var(--accent)] text-white font-semibold shadow-sm"
                : "bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] hover:bg-[var(--line)]/30"
            }`}
          >
            {isDe ? p.nameDe : p.nameZh}
          </button>
        ))}
      </div>

      {/* Main Grid: Left Radar + Scoreboards, Right Levers */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column (SVG Radar + Conflict Monitor) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Radar Visualization Card */}
          <div className="relative rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 sm:p-4 flex flex-col items-center">
            <div className="w-full flex justify-between items-center text-xs font-mono text-[var(--gray)] mb-1">
              <span>{isDe ? "Dynamisches Zielerreichungs-Polygon" : "动态目标达成多边形"}</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-emerald-600/30 border border-emerald-600" />
                  {isDe ? "Zielkorridor (Gesetz)" : "法定目标区"}
                </span>
                <span className="flex items-center gap-1">
                  <span className="inline-block w-2.5 h-2.5 rounded-sm bg-[#1e40af]/30 border border-[#1e40af]" />
                  {isDe ? "Aktuelle Lage" : "实际调控状态"}
                </span>
              </div>
            </div>

            {/* SVG Radar */}
            <div className="w-full max-w-[380px] aspect-square flex items-center justify-center relative">
              <svg viewBox="0 0 340 320" className="w-full h-full overflow-visible select-none">
                {/* Background coordinate circles */}
                <circle cx="170" cy="160" r="110" fill="none" stroke="currentColor" strokeDasharray="3,3" className="text-stone-300" />
                <circle cx="170" cy="160" r="75" fill="none" stroke="currentColor" strokeDasharray="2,2" className="text-stone-200" />
                <circle cx="170" cy="160" r="40" fill="none" stroke="currentColor" strokeDasharray="2,2" className="text-stone-200" />

                {/* 4 Cardinal Axes */}
                <line x1="170" y1="20" x2="170" y2="300" stroke="currentColor" strokeWidth="1.2" className="text-stone-300" />
                <line x1="30" y1="160" x2="310" y2="160" stroke="currentColor" strokeWidth="1.2" className="text-stone-300" />

                {/* Constant Target Zone Polygon (Green dashed border, light green fill) */}
                <polygon
                  points={radarCoords.targetPoints}
                  fill="#059669"
                  fillOpacity="0.12"
                  stroke="#059669"
                  strokeWidth="1.5"
                  strokeDasharray="4,3"
                />

                {/* Active Situation Polygon (Blue fill, dark blue solid stroke) */}
                <polygon
                  points={radarCoords.currentPoints}
                  fill="#1e40af"
                  fillOpacity="0.22"
                  stroke="#1e40af"
                  strokeWidth="2.2"
                  className="transition-all duration-300 ease-out"
                />

                {/* Vertex markers for current position */}
                <circle cx={radarCoords.pTop.x} cy={radarCoords.pTop.y} r="4.5" fill="#1e40af" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx={radarCoords.pRight.x} cy={radarCoords.pRight.y} r="4.5" fill="#1e40af" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx={radarCoords.pBottom.x} cy={radarCoords.pBottom.y} r="4.5" fill="#1e40af" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx={radarCoords.pLeft.x} cy={radarCoords.pLeft.y} r="4.5" fill="#1e40af" stroke="#ffffff" strokeWidth="1.5" />

                {/* Axis Labels */}
                {/* TOP: Wirtschaftswachstum */}
                <text x="170" y="16" textAnchor="middle" className="font-mono text-[11px] font-bold fill-[var(--ink)]">
                  {isDe ? "Wirtschaftswachstum (BIP)" : "经济增长率 (BIP)"}
                </text>
                <text x="170" y="30" textAnchor="middle" className="font-mono text-[10px] fill-[var(--accent)] font-semibold">
                  {macro.wachstum > 0 ? `+${macro.wachstum}` : macro.wachstum}% (Ziel: 2-3%)
                </text>

                {/* RIGHT: Preisniveaustabilität */}
                <text x="315" y="156" textAnchor="end" className="font-mono text-[11px] font-bold fill-[var(--ink)]">
                  {isDe ? "Preisniveaustabilität" : "物价水平稳定"}
                </text>
                <text x="315" y="170" textAnchor="end" className="font-mono text-[10px] fill-[var(--accent)] font-semibold">
                  {macro.inflation}% (Ziel: 2.0%)
                </text>

                {/* BOTTOM: Hohe Beschäftigung */}
                <text x="170" y="305" textAnchor="middle" className="font-mono text-[11px] font-bold fill-[var(--ink)]">
                  {isDe ? "Hohe Beschäftigung" : "高就业率 (充分就业)"}
                </text>
                <text x="170" y="318" textAnchor="middle" className="font-mono text-[10px] fill-[var(--accent)] font-semibold">
                  ALQ: {macro.arbeitslosigkeit}% (Ziel: &lt;4%)
                </text>

                {/* LEFT: Außenwirtschaftliches Gleichgewicht */}
                <text x="25" y="156" textAnchor="start" className="font-mono text-[11px] font-bold fill-[var(--ink)]">
                  {isDe ? "Außenwirtschaft" : "对外贸易平衡"}
                </text>
                <text x="25" y="170" textAnchor="start" className="font-mono text-[10px] fill-[var(--accent)] font-semibold">
                  Saldo: {macro.aussenbeitrag > 0 ? `+${macro.aussenbeitrag}` : macro.aussenbeitrag}%
                </text>
              </svg>
            </div>

            {/* Score pill grid under radar */}
            <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-[var(--line)]">
              <div className="p-2 rounded bg-[var(--paper-subtle)] border border-[var(--line)] text-center">
                <div className="font-mono text-[10px] text-[var(--gray)]">Wachstum</div>
                <div className="font-mono text-xs font-bold text-[var(--ink)]">{goalScores.wachstum}%</div>
              </div>
              <div className="p-2 rounded bg-[var(--paper-subtle)] border border-[var(--line)] text-center">
                <div className="font-mono text-[10px] text-[var(--gray)]">Inflation</div>
                <div className="font-mono text-xs font-bold text-[var(--ink)]">{goalScores.preisstabilitaet}%</div>
              </div>
              <div className="p-2 rounded bg-[var(--paper-subtle)] border border-[var(--line)] text-center">
                <div className="font-mono text-[10px] text-[var(--gray)]">Beschäftigung</div>
                <div className="font-mono text-xs font-bold text-[var(--ink)]">{goalScores.vollbeschaeftigung}%</div>
              </div>
              <div className="p-2 rounded bg-[var(--paper-subtle)] border border-[var(--line)] text-center">
                <div className="font-mono text-[10px] text-[var(--gray)]">Außenbeitrag</div>
                <div className="font-mono text-xs font-bold text-[var(--ink)]">{goalScores.aussenwirtschaft}%</div>
              </div>
            </div>
          </div>

          {/* Conflict Monitor Card */}
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3 space-y-2">
            <div className="flex items-center justify-between text-xs font-mono font-semibold">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                {isDe ? "Zielbeziehungen & Konflikt-Monitor:" : "目标关联与冲突监测器："}
              </span>
              <span className="text-[var(--gray)]">
                {activeConflicts.length} {isDe ? "Konflikt(e) aktiv" : "项冲突正在显现"}
              </span>
            </div>

            {activeConflicts.length === 0 ? (
              <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-serif">
                {isDe
                  ? "Alle vier Ziele befinden sich in harmonischer Balance (Magisches Gleichgewicht erreicht)."
                  : "四大宏观目标处于协调平衡区间，未触发严重结构性目标冲突（达成魔术四角平衡态）。"}
              </div>
            ) : (
              <div className="space-y-2">
                {activeConflicts.map((c, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded text-xs border ${
                      c.severity === "critical"
                        ? "bg-rose-50 border-rose-200 text-rose-900"
                        : "bg-amber-50 border-amber-200 text-amber-900"
                    }`}
                  >
                    <div className="font-mono font-bold">{isDe ? c.titleDe : c.titleZh}</div>
                    <p className="font-serif text-[11px] mt-0.5 leading-relaxed">{isDe ? c.descDe : c.descZh}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Policy Levers & Shocks */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-4 space-y-4">
            <div className="border-b border-[var(--line)] pb-2">
              <h5 className="font-serif text-sm font-semibold text-[var(--ink)]">
                {isDe ? "Wirtschaftspolitische Hebel (Instrumente)" : "宏观经济调控杠杆与政策工具箱"}
              </h5>
              <p className="text-[11px] text-[var(--gray)] font-mono mt-0.5">
                {isDe ? "Verändere Geld- und Fiskalpolitik zur Steuerung:" : "实时调节货币政策、财政政策与供给侧参数："}
              </p>
            </div>

            {/* Lever 1: Leitzins (Geldpolitik EZB) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={zinsId} className="font-semibold text-[var(--ink)]">
                  {isDe ? "EZB-Leitzins (Geldpolitik):" : "央行基准利率 (货币政策)："}
                </label>
                <span className="font-bold text-[#1e40af]">{leitzins.toFixed(1)}%</span>
              </div>
              <input
                id={zinsId}
                type="range"
                min="0.5"
                max="6.0"
                step="0.25"
                value={leitzins}
                onChange={(e) => {
                  setLeitzins(parseFloat(e.target.value));
                  setActivePreset("custom");
                }}
                className="w-full accent-[#1e40af] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[var(--gray)]">
                <span>0.5% ({isDe ? "Expansiv" : "极度宽松"})</span>
                <span>2.5% ({isDe ? "Neutral" : "中性"})</span>
                <span>6.0% ({isDe ? "Restriktiv" : "强力紧缩"})</span>
              </div>
            </div>

            {/* Lever 2: Staatsausgaben (Fiskalpolitik) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={ausgabenId} className="font-semibold text-[var(--ink)]">
                  {isDe ? "Staatsausgaben G (Konjunkturpaket):" : "财政支出 G (经济景气刺激计划)："}
                </label>
                <span className="font-bold text-[#065f46]">
                  {staatsausgaben > 0 ? `+${staatsausgaben}` : staatsausgaben} Mrd. €
                </span>
              </div>
              <input
                id={ausgabenId}
                type="range"
                min="-40"
                max="40"
                step="5"
                value={staatsausgaben}
                onChange={(e) => {
                  setStaatsausgaben(parseInt(e.target.value, 10));
                  setActivePreset("custom");
                }}
                className="w-full accent-[#065f46] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[var(--gray)]">
                <span>-40 Mrd. ({isDe ? "Sparpolitik" : "紧缩节流"})</span>
                <span>0 Mrd. ({isDe ? "Ausgeglichen" : "黑零预算"})</span>
                <span>+40 Mrd. ({isDe ? "Deficit Spending" : "赤字刺激"})</span>
              </div>
            </div>

            {/* Lever 3: Steuersatz */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={steuerId} className="font-semibold text-[var(--ink)]">
                  {isDe ? "Durchschnittssteuersatz T:" : "宏观平均税负水平 T："}
                </label>
                <span className="font-bold text-[var(--accent)]">{steuersatz}%</span>
              </div>
              <input
                id={steuerId}
                type="range"
                min="20"
                max="40"
                step="1"
                value={steuersatz}
                onChange={(e) => {
                  setSteuersatz(parseInt(e.target.value, 10));
                  setActivePreset("custom");
                }}
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[var(--gray)]">
                <span>20% ({isDe ? "Entlastung" : "轻税刺激"})</span>
                <span>30% ({isDe ? "Status Quo" : "现状基准"})</span>
                <span>40% ({isDe ? "Dämpfung" : "重税降温"})</span>
              </div>
            </div>

            {/* Lever 4: Lohnpolitik */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-mono">
                <label htmlFor={lohnId} className="font-semibold text-[var(--ink)]">
                  {isDe ? "Tariflohnzuwachs (Lohnpolitik):" : "工会薪资协议涨幅 (工资政策)："}
                </label>
                <span className="font-bold text-stone-700">+{lohnzuwachs.toFixed(1)}%</span>
              </div>
              <input
                id={lohnId}
                type="range"
                min="0.0"
                max="6.0"
                step="0.2"
                value={lohnzuwachs}
                onChange={(e) => {
                  setLohnzuwachs(parseFloat(e.target.value));
                  setActivePreset("custom");
                }}
                className="w-full accent-stone-700 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[var(--gray)]">
                <span>0.0% ({isDe ? "Lohnzurückhaltung" : "温和克制"})</span>
                <span>2.5% ({isDe ? "Produktivitätsorientiert" : "生产率匹配"})</span>
                <span>6.0% ({isDe ? "Kaufkrafttheorie" : "购买力激增"})</span>
              </div>
            </div>

            {/* Exogenous Shocks Toggle */}
            <div className="pt-2 border-t border-[var(--line)]">
              <div className="text-xs font-mono font-semibold mb-2 text-[var(--ink)]">
                {isDe ? "Exogene Angebotsschocks (Krisen):" : "外生供给侧冲击（宏观外部危机模拟）："}
              </div>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setSchock("none");
                    setActivePreset("custom");
                  }}
                  className={`py-1.5 px-2 rounded border text-center transition-colors ${
                    schock === "none"
                      ? "bg-stone-800 text-white font-semibold border-stone-800"
                      : "bg-[var(--surface)] text-[var(--gray)] border-[var(--line)] hover:bg-[var(--line)]/20"
                  }`}
                >
                  {isDe ? "Kein Schock" : "无冲击"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSchock("oel");
                    setActivePreset("custom");
                  }}
                  className={`py-1.5 px-2 rounded border text-center transition-colors ${
                    schock === "oel"
                      ? "bg-rose-800 text-white font-semibold border-rose-800"
                      : "bg-[var(--surface)] text-[var(--gray)] border-[var(--line)] hover:bg-[var(--line)]/20"
                  }`}
                >
                  {isDe ? "Energiekrise" : "能源大危机"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSchock("export");
                    setActivePreset("custom");
                  }}
                  className={`py-1.5 px-2 rounded border text-center transition-colors ${
                    schock === "export"
                      ? "bg-amber-800 text-white font-semibold border-amber-800"
                      : "bg-[var(--surface)] text-[var(--gray)] border-[var(--line)] hover:bg-[var(--line)]/20"
                  }`}
                >
                  {isDe ? "Exportkrise" : "外贸断崖"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scaffolding Tabs */}
      <div className="mt-4 pt-3 border-t border-[var(--line)] space-y-3">
        <div className="flex border-b border-[var(--line)]">
          <button
            type="button"
            onClick={() => setActiveTab("gesetz")}
            className={`px-3 py-1.5 font-mono text-xs border-b-2 transition-colors ${
              activeTab === "gesetz"
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            01 Stabilitätsgesetz § 1
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("operatoren")}
            className={`px-3 py-1.5 font-mono text-xs border-b-2 transition-colors ${
              activeTab === "operatoren"
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            02 KLP NRW Operatoren
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cn")}
            className={`px-3 py-1.5 font-mono text-xs border-b-2 transition-colors ${
              activeTab === "cn"
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            03 🇨🇳 CN-Methode
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("ki")}
            className={`px-3 py-1.5 font-mono text-xs border-b-2 transition-colors ${
              activeTab === "ki"
                ? "border-[var(--accent)] text-[var(--accent)] font-semibold"
                : "border-transparent text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            04 Diskurs & KI-Tutor
          </button>
        </div>

        {/* Tab 01: Gesetz */}
        {activeTab === "gesetz" && (
          <div className="p-3 bg-[var(--paper-subtle)] rounded-[var(--radius)] text-xs leading-relaxed space-y-2">
            <div className="font-mono font-semibold text-[var(--accent)]">
              {isDe ? "Gesetz zur Förderung der Stabilität und des Wachstums der Wirtschaft (StabG 1967):" : "德国《促进经济稳定与增长法》(1967) 核心条文："}
            </div>
            <p className="font-serif italic">
              {isDe
                ? "„(1) Bund und Länder haben bei ihren wirtschafts- und finanzpolitischen Maßnahmen die Erfordernisse des gesamtwirtschaftlichen Gleichgewichts zu beachten. Die Maßnahmen sind so zu treffen, dass sie im Rahmen der marktwirtschaftlichen Ordnung gleichzeitig zur Stabilität des Preisniveaus, zu einem hohen Beschäftigungsstand und außenwirtschaftlichem Gleichgewicht bei stetigem und angemessenem Wirtschaftswachstum beitragen.“"
                : "“（1）联邦与各州在采取经济与财政政策措施时，必须顾及全经济整体均衡之要求。措施之施行，应当在市场经济体制框架内，同时促进物价水平稳定、高就业水平、对外经济平衡，以及持续适度之经济增长。”"}
            </p>
            <div className="pt-2 border-t border-[var(--line)]">
              <span className="font-mono text-[11px] text-[var(--gray)] block mb-1">
                {isDe ? "Makroökonomische Fundamentalgleichung (Gesamtnachfrage):" : "宏观经济总需求恒等式："}
              </span>
              <MathHtml
                code="Y = C(Y - T) + I(r) + G + (X - M)"
                display
                cacheKey="magisches-viereck-eq"
              />
            </div>
            <div className="text-[11px] text-[var(--gray)] font-mono">
              {isDe
                ? "Warum „magisch“? Weil die gleichzeitige Verwirklichung aller vier Ziele wegen inhärenter Zielkonflikte (z.B. Phillips-Kurve) fast unmöglich ist."
                : "为什么被称为“魔术”？因为四大目标之间存在天然的目标冲突（如菲利普斯曲线两难），四者同时达到理论极限近乎于施展魔法。"}
            </div>
          </div>
        )}

        {/* Tab 02: Operatoren */}
        {activeTab === "operatoren" && (
          <div className="p-3 bg-[var(--paper-subtle)] rounded-[var(--radius)] text-xs leading-relaxed space-y-2">
            <div className="font-mono font-semibold text-[var(--accent)]">
              {isDe ? "Abitur-Musterstruktur: Operator „Beurteilen“ (AFB III, 15 Punkte)" : "北威州大考满分范式：AFB III 评判题 (Beurteilen / Bewerten, 15分)"}
            </div>
            <div className="space-y-1.5 font-serif text-[11px]">
              <div>
                <strong>1. Sachurteil (Effizienz & Machbarkeit):</strong>{" "}
                {isDe
                  ? "Reichen die vorgeschlagenen Maßnahmen (z.B. Zinssenkung oder Konjunkturpaket) aus, um das Hauptproblem zu lösen? Welche Nebeneffekte treten auf?"
                  : "政策工具（如降息或财政刺激）是否能够有效对冲当前主要矛盾？会导致哪些次生副作用（如赤字飙升或输入型通胀）？"}
              </div>
              <div>
                <strong>2. Werturteil (Grundwerte & Legitimität):</strong>{" "}
                {isDe
                  ? "Welches Ziel wird priorisiert? Keynesianer betonen Bekämpfung der Arbeitslosigkeit; Angebotspolitiker fordern Preisstabilität und Schuldenbremse."
                  : "哪项价值被置于优先地位？凯恩斯需求学派主张优先保障就业与民生兜底；弗里德曼供给学派强调物价稳定、削减官僚干预与守护债务刹车（Schuldenbremse）。"}
              </div>
            </div>
          </div>
        )}

        {/* Tab 03: CN-Methode */}
        {activeTab === "cn" && (
          <div className="p-3 bg-[var(--paper-subtle)] rounded-[var(--radius)] text-xs leading-relaxed space-y-2">
            <div className="font-mono font-semibold text-[var(--accent)]">
              {isDe ? "🇨🇳 CN-Methode: Das Makro-Koordinatenkreuz" : "🇨🇳 CN-Methode：宏观经济“三板斧与相生相克”解构法"}
            </div>
            <div className="space-y-1 text-[11px]">
              <p>
                <strong>相克（Zielkonflikt）：</strong> 增长拉失业（奥肯法则反向），就业冲物价（菲利普斯曲线）；顺差招关税，降息推通胀。
              </p>
              <p>
                <strong>破局（Wirtschaftspolitische Strategien）：</strong>
              </p>
              <ul className="list-disc pl-5 space-y-0.5">
                <li>
                  <strong>需求派（Keynesianismus）：</strong> 衰退时“反周期（Antizyklisch）”大搞赤字刺激（Deficit Spending），繁荣时增税降温提防过热。
                </li>
                <li>
                  <strong>供给派（Angebotsorientierung）：</strong> 减税降费、放松行业管制（Deregulierung）、盯紧货币供应量（Monetarismus）。
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 04: KI-Tutor */}
        {activeTab === "ki" && (
          <div className="p-3 bg-[var(--paper-subtle)] rounded-[var(--radius)] text-xs leading-relaxed space-y-2.5">
            <div className="font-mono font-semibold text-[var(--accent)]">
              {isDe ? "Wissenschaftlicher Diskurs & Klausur-Training:" : "一键回流 AI 助教学术研讨："}
            </div>
            <p className="font-serif text-[11px] text-[var(--gray)]">
              {isDe
                ? "Kopiere die aktuellen Simulator-Daten direkt als Klausur-Frage an deinen KI-Tutor für eine tiefgreifende Kontroversen-Analyse."
                : "将当前沙盘调控数据与活跃的目标冲突一键打包为德语学术提问，随时提交给 AI 助教进行模拟考官级深度对决。"}
            </p>
            <button
              type="button"
              onClick={handleCopyTutorPrompt}
              className="px-3 py-1.5 rounded font-mono text-xs font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-opacity flex items-center gap-1.5"
            >
              {copiedQuery
                ? isDe ? "✓ Kopiert in Zwischenablage!" : "✓ 已复制到剪贴板！"
                : isDe ? "Klausur-Prompt kopieren" : "复制当前沙盘会考研讨 Prompt"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MagischesViereckSim;
