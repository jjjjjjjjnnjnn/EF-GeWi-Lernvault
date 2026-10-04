// GalvanischeZelleSim — 丹尼尔原电池与微观电化学反应器 (Galvanische Zelle & Nernst-Potenzial)
// 依据物理化学与北威州高级文理中学 (Gymnasium EF/Q1) Elektrochemie 考纲标准设计
// 包含三大核心沉浸机制：
// 1. ⚡ 自由切换电极金属对 (Metalle & Redox-Reihe)：Mg, Zn, Fe, Cu, Ag 自由组合、实时计算标准电极电势差 ΔE° 与能斯特方程
// 2. 🔬 微观粒子动态与盐桥离子迁移 (Elektronenfluss & Salzbrücke)：导线电子流、负极溶解/正极沉积微观放大
// 3. 📝 北威州化学会考满分 EHZ 采分点拨 (Redox-Teilreaktionen, Donator-Akzeptor)

import { useState, useMemo, useEffect } from "react";
import type { Lang } from "../../i18n";

export interface GalvanischeZelleSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export interface MetalHalfCell {
  symbol: string;
  nameDE: string;
  nameZH: string;
  standardPotential: number; // in Volt (V)
  color: string;
  solutionColor: string;
  ionSymbol: string;
  valence: number; // 转移电子数
}

export const METAL_OPTIONS: MetalHalfCell[] = [
  {
    symbol: "Mg",
    nameDE: "Magnesium (Mg/Mg²⁺)",
    nameZH: "镁电极 (Mg/Mg²⁺)",
    standardPotential: -2.37,
    color: "#cbd5e1",
    solutionColor: "#f1f5f9",
    ionSymbol: "Mg²⁺",
    valence: 2
  },
  {
    symbol: "Zn",
    nameDE: "Zink (Zn/Zn²⁺)",
    nameZH: "锌电极 (Zn/Zn²⁺)",
    standardPotential: -0.76,
    color: "#94a3b8",
    solutionColor: "#f8fafc",
    ionSymbol: "Zn²⁺",
    valence: 2
  },
  {
    symbol: "Fe",
    nameDE: "Eisen (Fe/Fe²⁺)",
    nameZH: "铁电极 (Fe/Fe²⁺)",
    standardPotential: -0.44,
    color: "#64748b",
    solutionColor: "#ecfdf5",
    ionSymbol: "Fe²⁺",
    valence: 2
  },
  {
    symbol: "Cu",
    nameDE: "Kupfer (Cu/Cu²⁺)",
    nameZH: "铜电极 (Cu/Cu²⁺)",
    standardPotential: 0.34,
    color: "#d97706",
    solutionColor: "#0284c7",
    ionSymbol: "Cu²⁺",
    valence: 2
  },
  {
    symbol: "Ag",
    nameDE: "Silber (Ag/Ag⁺)",
    nameZH: "银电极 (Ag/Ag⁺)",
    standardPotential: 0.80,
    color: "#e2e8f0",
    solutionColor: "#fafafa",
    ionSymbol: "Ag⁺",
    valence: 1
  }
];

export function GalvanischeZelleSim({ lang = "de", onExportFinding }: GalvanischeZelleSimProps) {
  const isDe = lang === "de";

  // 两侧半电池选择
  const [leftMetalIdx, setLeftMetalIdx] = useState<number>(1); // 默认 Zn
  const [rightMetalIdx, setRightMetalIdx] = useState<number>(3); // 默认 Cu

  // 溶液浓度 (mol/L)
  const [leftConc, setLeftConc] = useState<number>(1.0);
  const [rightConc, setRightConc] = useState<number>(1.0);

  // 动画电子步进
  const [electronTick, setElectronTick] = useState<number>(0);
  const [isCircuitClosed, setIsCircuitClosed] = useState<boolean>(true);

  const leftMetal = METAL_OPTIONS[leftMetalIdx];
  const rightMetal = METAL_OPTIONS[rightMetalIdx];

  // 计算哪一侧是 Anode (氧化/电势更负)，哪一侧是 Kathode (还原/电势更正)
  // 根据能斯特方程计算单电极电势: E = E0 + (0.059 / z) * log10(c)
  const leftE = useMemo(() => {
    return +(leftMetal.standardPotential + (0.059 / leftMetal.valence) * Math.log10(Math.max(0.001, leftConc))).toFixed(3);
  }, [leftMetal, leftConc]);

  const rightE = useMemo(() => {
    return +(rightMetal.standardPotential + (0.059 / rightMetal.valence) * Math.log10(Math.max(0.001, rightConc))).toFixed(3);
  }, [rightMetal, rightConc]);

  // 判断极性
  const leftIsAnode = leftE <= rightE;
  const deltaE = Math.abs(+(rightE - leftE).toFixed(3));

  // 电子流动计时器
  useEffect(() => {
    if (!isCircuitClosed || deltaE === 0) return;
    const timer = setInterval(() => {
      setElectronTick((t) => (t + 1) % 100);
    }, 50);
    return () => clearInterval(timer);
  }, [isCircuitClosed, deltaE]);

  const handleExport = () => {
    const text = isDe
      ? `Galvanische Zelle Protokoll:\n- Halbzelle Links: ${leftMetal.symbol} (E = ${leftE} V, c = ${leftConc} mol/L)\n- Halbzelle Rechts: ${rightMetal.symbol} (E = ${rightE} V, c = ${rightConc} mol/L)\n- Zellspannung ΔE: ${deltaE} V\n- Anode (Oxidation): ${leftIsAnode ? leftMetal.symbol : rightMetal.symbol}\n- Kathode (Reduktion): ${leftIsAnode ? rightMetal.symbol : leftMetal.symbol}`
      : `原电池电化学实验诊断报告：\n- 左侧半电池：${leftMetal.symbol}（实际电势 E = ${leftE} V，浓度 ${leftConc} mol/L）\n- 右侧半电池：${rightMetal.symbol}（实际电势 E = ${rightE} V，浓度 ${rightConc} mol/L）\n- 原电池端电压 ΔE：${deltaE} V\n- 负极（发生氧化/失电子）：${leftIsAnode ? leftMetal.symbol : rightMetal.symbol}\n- 正极（发生还原/得电子）：${leftIsAnode ? rightMetal.symbol : leftMetal.symbol}`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs font-sans text-[var(--ink)]">
      {/* 顶部标题栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20">
              Chemie EF / Q1 · Elektrochemie
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Modell: Daniell-Element & Nernst-Gleichung</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "Galvanische Zelle: Daniell-Element & Redox-Reihe" : "丹尼尔原电池：双半电池、能斯特电动势与微观粒子沙盒"}
          </h2>
        </div>

        {/* 回路开关联动 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsCircuitClosed(!isCircuitClosed)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
              isCircuitClosed
                ? "bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300"
                : "bg-red-500/15 border-red-500 text-red-600"
            }`}
          >
            {isCircuitClosed ? (isDe ? "⚡ Stromkreis: GESCHLOSSEN" : "⚡ 电路：闭合导通") : (isDe ? "🔌 Stromkreis: OFFEN" : "🔌 电路：断开")}
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--accent)] transition-colors"
          >
            {isDe ? "📥 Protokoll" : "📥 导出学报"}
          </button>
        </div>
      </div>

      {/* 电极材料与浓度选择器面板 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-[var(--paper-subtle)]/50 rounded-xl border border-[var(--line)] text-xs">
        {/* 左半电池控制器 */}
        <div className="flex flex-col gap-2 p-3 bg-[var(--paper)] rounded-lg border border-[var(--line)]">
          <span className="font-bold text-[var(--accent)] flex items-center justify-between">
            <span>{isDe ? "Linke Halbzelle (Halbelement 1):" : "左侧半电池（电极 1）："}</span>
            <span className="font-mono text-[10px] text-[var(--gray)]">E = {leftE} V</span>
          </span>
          <div className="flex items-center gap-2">
            <select
              value={leftMetalIdx}
              onChange={(e) => setLeftMetalIdx(Number(e.target.value))}
              className="flex-1 p-1.5 rounded border border-[var(--line)] bg-[var(--paper)] font-medium"
            >
              {METAL_OPTIONS.map((m, idx) => (
                <option key={m.symbol} value={idx}>
                  {isDe ? m.nameDE : m.nameZH} (E° = {m.standardPotential > 0 ? `+${m.standardPotential}` : m.standardPotential} V)
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-[var(--gray)] mb-0.5">
              <span>{isDe ? "Konzentration c(Mⁿ⁺):" : "金属阳离子浓度 c："}</span>
              <span className="font-mono font-bold">{leftConc} mol/L</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="2.0"
              step="0.05"
              value={leftConc}
              onChange={(e) => setLeftConc(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>
        </div>

        {/* 右半电池控制器 */}
        <div className="flex flex-col gap-2 p-3 bg-[var(--paper)] rounded-lg border border-[var(--line)]">
          <span className="font-bold text-sky-600 dark:text-sky-400 flex items-center justify-between">
            <span>{isDe ? "Rechte Halbzelle (Halbelement 2):" : "右侧半电池（电极 2）："}</span>
            <span className="font-mono text-[10px] text-[var(--gray)]">E = {rightE} V</span>
          </span>
          <div className="flex items-center gap-2">
            <select
              value={rightMetalIdx}
              onChange={(e) => setRightMetalIdx(Number(e.target.value))}
              className="flex-1 p-1.5 rounded border border-[var(--line)] bg-[var(--paper)] font-medium"
            >
              {METAL_OPTIONS.map((m, idx) => (
                <option key={m.symbol} value={idx}>
                  {isDe ? m.nameDE : m.nameZH} (E° = {m.standardPotential > 0 ? `+${m.standardPotential}` : m.standardPotential} V)
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex justify-between text-[11px] text-[var(--gray)] mb-0.5">
              <span>{isDe ? "Konzentration c(Mⁿ⁺):" : "金属阳离子浓度 c："}</span>
              <span className="font-mono font-bold">{rightConc} mol/L</span>
            </div>
            <input
              type="range"
              min="0.01"
              max="2.0"
              step="0.05"
              value={rightConc}
              onChange={(e) => setRightConc(Number(e.target.value))}
              className="w-full accent-sky-600 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 核心双视窗：左侧原电池物理可视化与微观粒子流，右侧能斯特方程与化学反应式 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：原电池物理模型 SVG (7 列) */}
        <div className="lg:col-span-7 flex flex-col gap-2 p-4 bg-[var(--paper-subtle)]/40 rounded-xl border border-[var(--line)]">
          <div className="flex justify-between items-center text-xs text-[var(--gray)] font-mono">
            <span>Mikroskopischer Elektronen- & Ionentransport</span>
            <span className="text-[var(--accent)] font-bold">
              ΔE = {isCircuitClosed ? `${deltaE} V` : "0.000 V (Offen)"}
            </span>
          </div>

          <div className="relative w-full aspect-16/11 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] p-2">
            <svg className="w-full h-full" viewBox="0 0 500 320">
              {/* 外电路导线 (Top) */}
              <path
                d="M 110 140 L 110 50 L 220 50"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />
              <path
                d="M 280 50 L 390 50 L 390 140"
                fill="none"
                stroke="var(--ink)"
                strokeWidth="2.5"
              />

              {/* 中间电压表 (Voltmeter) */}
              <circle cx="250" cy="50" r="24" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2" />
              <text x="250" y="44" textAnchor="middle" fontSize="11" fontWeight="bold" fill="var(--accent)" fontFamily="monospace">
                {isCircuitClosed ? `${deltaE}V` : "0.0V"}
              </text>
              <text x="250" y="58" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
                Voltmeter
              </text>

              {/* 导线上流动的电子粒子动画 (小黄球 e⁻) */}
              {isCircuitClosed && deltaE > 0 && (
                <g>
                  {/* 沿导线从 Anode 流向 Kathode */}
                  {leftIsAnode ? (
                    // 从左向右流
                    <>
                      <circle cx={110} cy={140 - (electronTick % 90)} r="3" fill="#facc15" />
                      <circle cx={110 + ((electronTick * 2) % 110)} cy={50} r="3" fill="#facc15" />
                      <circle cx={280 + ((electronTick * 2) % 110)} cy={50} r="3" fill="#facc15" />
                      <circle cx={390} cy={50 + (electronTick % 90)} r="3" fill="#facc15" />
                    </>
                  ) : (
                    // 从右向左流
                    <>
                      <circle cx={390} cy={140 - (electronTick % 90)} r="3" fill="#facc15" />
                      <circle cx={390 - ((electronTick * 2) % 110)} cy={50} r="3" fill="#facc15" />
                      <circle cx={220 - ((electronTick * 2) % 110)} cy={50} r="3" fill="#facc15" />
                      <circle cx={110} cy={50 + (electronTick % 90)} r="3" fill="#facc15" />
                    </>
                  )}
                </g>
              )}

              {/* 左烧杯 Beaker 1 */}
              <rect x="60" y="150" width="130" height="140" rx="6" fill={leftMetal.solutionColor} fillOpacity="0.4" stroke="var(--ink)" strokeWidth="2" />
              <text x="125" y="275" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)">
                {leftMetal.symbol}SO₄ ({leftConc} mol/L)
              </text>

              {/* 左电极棒 (Metal Rod) */}
              <rect x="95" y="100" width="30" height="120" rx="3" fill={leftMetal.color} stroke="var(--ink)" strokeWidth="1.5" />
              <text x="110" y="135" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">
                {leftMetal.symbol}
              </text>
              <text x="110" y="235" textAnchor="middle" fontSize="9" fontWeight="bold" fill={leftIsAnode ? "#dc2626" : "#16a34a"}>
                {leftIsAnode ? "Anode (-)" : "Kathode (+)"}
              </text>

              {/* 右烧杯 Beaker 2 */}
              <rect x="310" y="150" width="130" height="140" rx="6" fill={rightMetal.solutionColor} fillOpacity="0.4" stroke="var(--ink)" strokeWidth="2" />
              <text x="375" y="275" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)">
                {rightMetal.symbol}SO₄ ({rightConc} mol/L)
              </text>

              {/* 右电极棒 (Metal Rod) */}
              <rect x="375" y="100" width="30" height="120" rx="3" fill={rightMetal.color} stroke="var(--ink)" strokeWidth="1.5" />
              <text x="390" y="135" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">
                {rightMetal.symbol}
              </text>
              <text x="390" y="235" textAnchor="middle" fontSize="9" fontWeight="bold" fill={!leftIsAnode ? "#dc2626" : "#16a34a"}>
                {!leftIsAnode ? "Anode (-)" : "Kathode (+)"}
              </text>

              {/* 盐桥 U形管 (Salzbrücke mit KNO3) */}
              <path
                d="M 155 190 L 155 140 C 155 125, 345 125, 345 140 L 345 190"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="18"
                strokeLinecap="round"
              />
              <path
                d="M 155 190 L 155 140 C 155 125, 345 125, 345 140 L 345 190"
                fill="none"
                stroke="#94a3b8"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <text x="250" y="133" textAnchor="middle" fontSize="8" fontWeight="bold" fill="var(--ink)">
                Salzbrücke (KNO₃ / Agar)
              </text>
              {/* 盐桥离子迁移箭头 */}
              <text x="200" y="148" textAnchor="middle" fontSize="8" fill="#2563eb" fontWeight="bold">
                {leftIsAnode ? "NO₃⁻ ◀" : "▶ K⁺"}
              </text>
              <text x="300" y="148" textAnchor="middle" fontSize="8" fill="#10b981" fontWeight="bold">
                {leftIsAnode ? "▶ K⁺" : "NO₃⁻ ◀"}
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--gray)] pt-1">
            <span>
              {isDe
                ? `Elektronenfluss: von ${leftIsAnode ? leftMetal.symbol : rightMetal.symbol} (Anode) zu ${leftIsAnode ? rightMetal.symbol : leftMetal.symbol} (Kathode)`
                : `电子流向：从负极 ${leftIsAnode ? leftMetal.symbol : rightMetal.symbol} 自发流向正极 ${leftIsAnode ? rightMetal.symbol : leftMetal.symbol}`}
            </span>
          </div>
        </div>

        {/* 右侧：氧化还原半反应式与能斯特方程推导 (5 列) */}
        <div className="lg:col-span-5 flex flex-col gap-3 p-4 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs text-xs">
          <div className="border-b border-[var(--line)] pb-3">
            <span className="font-mono text-[var(--gray)] uppercase tracking-wider text-[10px]">
              {isDe ? "Redox-Kinetik & Thermodynamik" : "氧化还原反应动力学与热力学"}
            </span>
            <h3 className="text-base font-bold text-[var(--ink)] mt-0.5">
              {leftIsAnode ? `${leftMetal.symbol} / ${rightMetal.symbol}` : `${rightMetal.symbol} / ${leftMetal.symbol}`} Galvanisches Element
            </h3>
          </div>

          {/* 氧化半反应 (Anode) */}
          <div className="p-2.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-900 dark:text-red-200">
            <span className="font-bold block mb-0.5">
              {isDe ? "🔥 Anode (Minuspol) · Oxidation / Elektronenabgabe:" : "🔥 负极（阳极 Anode）· 氧化反应 / 释放电子："}
            </span>
            <div className="font-mono text-xs font-bold pl-2">
              {leftIsAnode
                ? `${leftMetal.symbol} (s) ➔ ${leftMetal.ionSymbol} (aq) + ${leftMetal.valence} e⁻`
                : `${rightMetal.symbol} (s) ➔ ${rightMetal.ionSymbol} (aq) + ${rightMetal.valence} e⁻`}
            </div>
            <p className="text-[11px] mt-1 opacity-90">
              {isDe ? "Die Metallelektrode löst sich allmählich auf (Masseverlust)." : "金属电极因氧化逐渐变细溶解，质量持续减轻。"}
            </p>
          </div>

          {/* 还原半反应 (Kathode) */}
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200">
            <span className="font-bold block mb-0.5">
              {isDe ? "⚡ Kathode (Pluspol) · Reduktion / Elektronenaufnahme:" : "⚡ 正极（阴极 Kathode）· 还原反应 / 夺得电子："}
            </span>
            <div className="font-mono text-xs font-bold pl-2">
              {leftIsAnode
                ? `${rightMetal.ionSymbol} (aq) + ${rightMetal.valence} e⁻ ➔ ${rightMetal.symbol} (s)`
                : `${leftMetal.ionSymbol} (aq) + ${leftMetal.valence} e⁻ ➔ ${leftMetal.symbol} (s)`}
            </div>
            <p className="text-[11px] mt-1 opacity-90">
              {isDe ? "Metallkationen scheiden sich als elementares Metall ab (Massenzuwachs)." : "溶液中的金属阳离子在电极表面还原析出，电极质量增加。"}
            </p>
          </div>

          {/* 盐桥的不可替代性 (会考大题必考点) */}
          <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]">
            <span className="font-bold text-[var(--accent)] block mb-0.5">
              {isDe ? "🏛️ Funktion der Salzbrücke (Klausur-Kern):" : "🏛️ 盐桥的核心功能（北威州会考标准采分点）："}
            </span>
            <p className="leading-relaxed">
              {isDe
                ? "1. Schließt den Stromkreis ohne Vermischung der Lösungen.\n2. Verhindert Ladungsakkumulation: Anionen (NO3⁻) wandern zur Anode (neutralisieren Kationenüberschuss), Kationen (K⁺) zur Kathode."
                : "1. 在不混合两杯电解质溶液的前提下闭合电路回路；\n2. 防止电荷局部极化累积：阴离子（NO₃⁻）移向负极中和过剩金属离子，阳离子（K⁺）移向正极中和过剩酸根，确保电动势持续稳定输出。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
