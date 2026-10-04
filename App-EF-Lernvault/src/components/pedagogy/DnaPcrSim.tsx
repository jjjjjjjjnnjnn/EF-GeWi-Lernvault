// DnaPcrSim — 聚合酶链式反应 (PCR) 与琼脂糖凝胶电泳 (Gelelektrophorese) 动态微观实验台
// 依据分子遗传学与北威州高级文理中学 (Gymnasium Q1) Genetik 考纲标准设计
// 包含三大核心沉浸机制：
// 1. 🧬 三温阶梯热循环仪微观动画 (Thermocycler)：95°C 变性解链 → 55°C 引物结合 → 72°C Taq 酶 5'→3' 延伸
// 2. ⚡ 紫外凝胶电泳跑带槽 (Agarose-Gel-Kammer)：负电荷向正极迁移、分子筛效应、荧光条带发光对比 Marker
// 3. 📝 北威州遗传学考题与 EHZ 评分标准：DNA复制与体内/体外对比、引物特异性

import { useState, useEffect } from "react";
import type { Lang } from "../../i18n";

export interface DnaPcrSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type PcrPhase = "denaturation" | "annealing" | "elongation";

export function DnaPcrSim({ lang = "de", onExportFinding }: DnaPcrSimProps) {
  const isDe = lang === "de";

  const [cycleCount, setCycleCount] = useState<number>(0);
  const [phase, setPhase] = useState<PcrPhase>("denaturation");
  const [temp, setTemp] = useState<number>(95);
  const [isRunningAuto, setIsRunningAuto] = useState<boolean>(false);

  // 电泳状态
  const [isGelRunning, setIsGelRunning] = useState<boolean>(false);
  const [gelProgress, setGelProgress] = useState<number>(0); // 0 - 100%

  // 理论扩增产物数量
  const moleculeCount = Math.pow(2, cycleCount);

  // 变温与阶段联动
  const setStepPhase = (targetPhase: PcrPhase) => {
    setPhase(targetPhase);
    if (targetPhase === "denaturation") {
      setTemp(95);
    } else if (targetPhase === "annealing") {
      setTemp(55);
    } else if (targetPhase === "elongation") {
      setTemp(72);
    }
  };

  // 单步执行一步
  const handleNextStep = () => {
    if (phase === "denaturation") {
      setStepPhase("annealing");
    } else if (phase === "annealing") {
      setStepPhase("elongation");
    } else {
      // elongation 结束，循环数 + 1 并回到 denaturation
      setCycleCount((c) => Math.min(35, c + 1));
      setStepPhase("denaturation");
    }
  };

  // 重置 PCR
  const handleReset = () => {
    setIsRunningAuto(false);
    setCycleCount(0);
    setStepPhase("denaturation");
    setGelProgress(0);
    setIsGelRunning(false);
  };

  // 自动循环计时器
  useEffect(() => {
    if (!isRunningAuto) return;

    const timer = setInterval(() => {
      setPhase((prevPhase) => {
        if (prevPhase === "denaturation") {
          setTemp(55);
          return "annealing";
        } else if (prevPhase === "annealing") {
          setTemp(72);
          return "elongation";
        } else {
          setCycleCount((c) => {
            if (c >= 30) {
              setIsRunningAuto(false);
              return 30;
            }
            return c + 1;
          });
          setTemp(95);
          return "denaturation";
        }
      });
    }, 1200);

    return () => clearInterval(timer);
  }, [isRunningAuto]);

  // 电泳计时器
  useEffect(() => {
    if (!isGelRunning) return;

    const timer = setInterval(() => {
      setGelProgress((p) => {
        if (p >= 100) {
          setIsGelRunning(false);
          return 100;
        }
        return p + 2;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isGelRunning]);

  const handleExport = () => {
    const text = isDe
      ? `PCR & Gelelektrophorese Labor-Protokoll:\n- Zyklen: ${cycleCount} (Theoretische Moleküle: ${moleculeCount.toLocaleString()})\n- Aktuelle Phase: ${phase} bei ${temp}°C\n- Gel-Migration: ${gelProgress}%\n- EHZ-Kern: Taq-Polymerase arbeitet 5'->3', benötigt hitzestabile Primer ohne Helikase/Topoisomerase.`
      : `PCR 与琼脂糖凝胶电泳实验学术报告：\n- 扩增循环轮数：${cycleCount} 轮（理论扩增 DNA 拷贝数：${moleculeCount.toLocaleString()}）\n- 当前阶段：${phase}（${temp}°C）\n- 凝胶电泳迁移度：${gelProgress}%\n- 采分核心：体外 PCR 无需解旋酶/拓扑异构酶，利用 95°C 物理热解旋；Taq 耐热聚合酶沿 5'→3' 延伸互补链。`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs font-sans text-[var(--ink)]">
      {/* 顶部标题与控制工具条 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              Biologie Q1 · Molekulargenetik
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Methodik: Kary Mullis 1983 (Nobelpreis)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "Polymerase-Kettenreaktion (PCR) & Agarose-Gel-Kammer" : "聚合酶链式反应 (PCR) 变温扩增与琼脂糖凝胶电泳跑带工坊"}
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleNextStep}
            className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[var(--accent)] text-white shadow-xs hover:opacity-90 transition-opacity"
          >
            {isDe ? "⏭️ Nächster Schritt" : "⏭️ 单步推演"}
          </button>
          <button
            type="button"
            onClick={() => setIsRunningAuto(!isRunningAuto)}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${
              isRunningAuto
                ? "bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300"
                : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] hover:border-[var(--accent)]"
            }`}
          >
            {isRunningAuto ? (isDe ? "⏸️ Pause" : "⏸️ 暂停自动循环") : (isDe ? "▶️ Auto-Zyklus (30x)" : "▶️ 启动30轮连环扩增")}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1.5 text-xs rounded-lg border border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)] transition-colors"
          >
            {isDe ? "🔄 Reset" : "🔄 重置"}
          </button>
        </div>
      </div>

      {/* 核心双视窗：左侧 PCR 热循环仪微观视图，右侧琼脂糖凝胶电泳槽 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：PCR 热循环仪与 DNA 微观链反应 (7 列) */}
        <div className="lg:col-span-7 flex flex-col gap-3 p-4 bg-[var(--paper-subtle)]/40 rounded-xl border border-[var(--line)]">
          {/* 热循环仪状态仪表盘 */}
          <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-[var(--paper)] border border-[var(--line)]">
            <div className="flex items-center gap-3">
              <div className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold flex items-center gap-1.5 ${
                temp >= 90
                  ? "bg-red-500/15 text-red-600 border border-red-500/30"
                  : temp <= 60
                  ? "bg-sky-500/15 text-sky-600 border border-sky-500/30"
                  : "bg-emerald-500/15 text-emerald-600 border border-emerald-500/30"
              }`}>
                <span>🌡️ {temp} °C</span>
                <span className="text-[10px] uppercase font-sans">
                  {phase === "denaturation" ? (isDe ? "Denaturierung" : "变性解链") : phase === "annealing" ? (isDe ? "Primer-Annealing" : "引物复性结合") : (isDe ? "Taq-Elongation" : "聚合酶延伸")}
                </span>
              </div>
              <span className="text-xs font-mono text-[var(--gray)]">
                {isDe ? `Zyklus: ${cycleCount} / 30` : `当前循环：第 ${cycleCount} / 30 轮`}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-[var(--gray)] font-mono block">Theoretische DNA-Kopien (2ⁿ):</span>
              <span className="text-xs font-mono font-bold text-[var(--accent)]">
                {moleculeCount > 1_000_000_000 ? `${(moleculeCount / 1_000_000_000).toFixed(2)} Mrd.` : moleculeCount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* 3步微观温控阶段快捷导航条 */}
          <div className="grid grid-cols-3 gap-2 text-xs font-mono text-center">
            <button
              type="button"
              onClick={() => setStepPhase("denaturation")}
              className={`p-2 rounded border transition-colors cursor-pointer ${
                phase === "denaturation"
                  ? "bg-rose-50 dark:bg-rose-950/30 border-rose-400 text-rose-800 dark:text-rose-200 font-bold shadow-2xs"
                  : "bg-[var(--paper)] border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="block text-[10px] text-[var(--gray)]">Schritt 1 (95°C)</span>
              {isDe ? "1. Denaturierung" : "1. 热变性解链"}
            </button>
            <button
              type="button"
              onClick={() => setStepPhase("annealing")}
              className={`p-2 rounded border transition-colors cursor-pointer ${
                phase === "annealing"
                  ? "bg-sky-50 dark:bg-sky-950/30 border-sky-400 text-sky-800 dark:text-sky-200 font-bold shadow-2xs"
                  : "bg-[var(--paper)] border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="block text-[10px] text-[var(--gray)]">Schritt 2 (55°C)</span>
              {isDe ? "2. Primer-Hybridisierung" : "2. 引物特异结合"}
            </button>
            <button
              type="button"
              onClick={() => setStepPhase("elongation")}
              className={`p-2 rounded border transition-colors cursor-pointer ${
                phase === "elongation"
                  ? "bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400 text-emerald-800 dark:text-emerald-200 font-bold shadow-2xs"
                  : "bg-[var(--paper)] border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="block text-[10px] text-[var(--gray)]">Schritt 3 (72°C)</span>
              {isDe ? "3. Taq-Elongation" : "3. Taq 酶延伸"}
            </button>
          </div>

          {/* DNA 复制微观动画画布 */}
          <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] p-3">
            <svg className="w-full h-full" viewBox="0 0 500 280">
              {/* 阶段 1：95°C 变性解链 */}
              {phase === "denaturation" && (
                <g className="transition-all duration-300">
                  <rect x="50" y="12" width="400" height="24" rx="4" fill="#fee2e2" stroke="#f87171" strokeWidth="1" />
                  <text x="250" y="28" textAnchor="middle" fill="#b91c1c" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                    95°C: Thermische Trennung der Wasserstoffbrücken (Helikase entfällt)
                  </text>

                  {/* 上单链 5' -> 3' */}
                  <path d="M 60 75 L 440 75" stroke="#1d4ed8" strokeWidth="4" strokeLinecap="round" />
                  <text x="44" y="79" fontSize="10" fontWeight="bold" fill="#1d4ed8" fontFamily="monospace">5'</text>
                  <text x="448" y="79" fontSize="10" fontWeight="bold" fill="#1d4ed8" fontFamily="monospace">3'</text>
                  <text x="250" y="65" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#1d4ed8" fontFamily="monospace">
                    Matrizenstrang A (5' → 3')
                  </text>

                  {/* 正在断裂散开的氢键虚线与碱基 */}
                  {[90, 130, 170, 210, 250, 290, 330, 370, 410].map((x) => (
                    <g key={x}>
                      <line x1={x} y1="80" x2={x} y2="100" stroke="#1d4ed8" strokeWidth="2" />
                      <line x1={x} y1="102" x2={x} y2="148" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" strokeOpacity="0.6" />
                      <line x1={x} y1="150" x2={x} y2="170" stroke="#047857" strokeWidth="2" />
                      <text x={x} y="128" textAnchor="middle" fontSize="8" fill="#b91c1c" fontFamily="monospace">✕</text>
                    </g>
                  ))}

                  {/* 下单链 3' -> 5' */}
                  <path d="M 60 175 L 440 175" stroke="#047857" strokeWidth="4" strokeLinecap="round" />
                  <text x="44" y="179" fontSize="10" fontWeight="bold" fill="#047857" fontFamily="monospace">3'</text>
                  <text x="448" y="179" fontSize="10" fontWeight="bold" fill="#047857" fontFamily="monospace">5'</text>
                  <text x="250" y="195" textAnchor="middle" fontSize="9.5" fontWeight="bold" fill="#047857" fontFamily="monospace">
                    Matrizenstrang B (3' → 5')
                  </text>

                  <rect x="70" y="225" width="360" height="24" rx="4" fill="var(--paper-subtle)" stroke="var(--line)" />
                  <text x="250" y="241" textAnchor="middle" fontSize="9.5" fill="var(--ink)" fontStyle="italic">
                    {isDe ? "Keine Helikase/Topoisomerase nötig: 95°C Hitze trennt H-Brücken physikalisch." : "无需解旋酶开路：纯物理高温瞬间破坏碱基间氢键！"}
                  </text>
                </g>
              )}

              {/* 阶段 2：55°C 引物特异结合 */}
              {phase === "annealing" && (
                <g className="transition-all duration-300">
                  <rect x="50" y="12" width="400" height="24" rx="4" fill="#e0f2fe" stroke="#38bdf8" strokeWidth="1" />
                  <text x="250" y="28" textAnchor="middle" fill="#0369a1" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                    55°C: Spezifische Primer-Hybridisierung an den flankierenden 3'-Enden
                  </text>

                  {/* 上链 */}
                  <path d="M 60 70 L 440 70" stroke="#1d4ed8" strokeWidth="3.5" />
                  <text x="44" y="74" fontSize="10" fontWeight="bold" fill="#1d4ed8" fontFamily="monospace">5'</text>
                  <text x="448" y="74" fontSize="10" fontWeight="bold" fill="#1d4ed8" fontFamily="monospace">3'</text>

                  {/* 上链对应的 Reverse Primer (在 3' 端附着，延伸方向朝左 5'->3') */}
                  <rect x="350" y="80" width="80" height="12" fill="#be123c" rx="2" />
                  <text x="390" y="89" textAnchor="middle" fontSize="8" fill="#ffffff" fontWeight="bold" fontFamily="monospace">
                    ◀ Reverse Primer (5'→3')
                  </text>

                  {/* 下链 */}
                  <path d="M 60 170 L 440 170" stroke="#047857" strokeWidth="3.5" />
                  <text x="44" y="174" fontSize="10" fontWeight="bold" fill="#047857" fontFamily="monospace">3'</text>
                  <text x="448" y="174" fontSize="10" fontWeight="bold" fill="#047857" fontFamily="monospace">5'</text>

                  {/* 下链对应的 Forward Primer (在 3' 端附着，延伸方向朝右 5'->3') */}
                  <rect x="70" y="148" width="80" height="12" fill="#be123c" rx="2" />
                  <text x="110" y="157" textAnchor="middle" fontSize="8" fill="#ffffff" fontWeight="bold" fontFamily="monospace">
                    Forward Primer (5'→3') ▶
                  </text>

                  <rect x="70" y="225" width="360" height="24" rx="4" fill="var(--paper-subtle)" stroke="var(--line)" />
                  <text x="250" y="241" textAnchor="middle" fontSize="9.5" fill="var(--ink)" fontStyle="italic">
                    {isDe ? "Künstliche DNA-Primer (ca. 20 nt) definieren die Grenzen des Zielgens exakt." : "人工合成寡核苷酸引物（约20bp）精准锚定目的基因边界。"}
                  </text>
                </g>
              )}

              {/* 阶段 3：72°C Taq 延伸合成 */}
              {phase === "elongation" && (
                <g className="transition-all duration-300">
                  <rect x="50" y="12" width="400" height="24" rx="4" fill="#dcfce7" stroke="#4ade80" strokeWidth="1" />
                  <text x="250" y="28" textAnchor="middle" fill="#15803d" fontSize="10.5" fontWeight="bold" fontFamily="monospace">
                    72°C: Synthese durch hitzestabile Taq-Polymerase (immer 5' → 3')
                  </text>

                  {/* 上链 */}
                  <path d="M 60 70 L 440 70" stroke="#1d4ed8" strokeWidth="3.5" />
                  <text x="44" y="74" fontSize="10" fontWeight="bold" fill="#1d4ed8" fontFamily="monospace">5'</text>
                  <text x="448" y="74" fontSize="10" fontWeight="bold" fill="#1d4ed8" fontFamily="monospace">3'</text>

                  {/* 新合成的互补链沿 5' -> 3' 延伸 */}
                  <path d="M 430 84 L 190 84" stroke="#be123c" strokeWidth="3" strokeDasharray="5,2" />
                  {/* Taq 酶示意图 */}
                  <circle cx="190" cy="84" r="13" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
                  <text x="190" y="87" textAnchor="middle" fontSize="7.5" fill="#ffffff" fontWeight="bold" fontFamily="monospace">Taq</text>
                  <text x="165" y="66" fontSize="8.5" fill="#15803d" fontWeight="bold" fontFamily="monospace">◀ 5' → 3'</text>

                  {/* 下链 */}
                  <path d="M 60 170 L 440 170" stroke="#047857" strokeWidth="3.5" />
                  <text x="44" y="174" fontSize="10" fontWeight="bold" fill="#047857" fontFamily="monospace">3'</text>
                  <text x="448" y="174" fontSize="10" fontWeight="bold" fill="#047857" fontFamily="monospace">5'</text>

                  {/* 下链新合成互补链 */}
                  <path d="M 70 156 L 310 156" stroke="#be123c" strokeWidth="3" strokeDasharray="5,2" />
                  {/* 下链 Taq 酶 */}
                  <circle cx="310" cy="156" r="13" fill="#15803d" stroke="#166534" strokeWidth="1.5" />
                  <text x="310" y="159" textAnchor="middle" fontSize="7.5" fill="#ffffff" fontWeight="bold" fontFamily="monospace">Taq</text>
                  <text x="330" y="178" fontSize="8.5" fill="#15803d" fontWeight="bold" fontFamily="monospace">5' → 3' ▶</text>

                  <rect x="70" y="225" width="360" height="24" rx="4" fill="var(--paper-subtle)" stroke="var(--line)" />
                  <text x="250" y="241" textAnchor="middle" fontSize="9.5" fill="var(--ink)" fontStyle="italic">
                    {isDe ? "Thermus aquaticus Polymerase: Optimale Elongation bei 72°C mit freien dNTPs." : "水生栖热菌聚合酶：耐 95°C 高温，在 72°C 快速将游离 dNTP 链入新链。"}
                  </text>
                </g>
              )}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--gray)] pt-1">
            <span>💡 提示：按“单步推演”可分步观察 95°C/55°C/72°C 循环分子机理。</span>
            <button
              type="button"
              onClick={handleExport}
              className="px-2.5 py-1 text-xs font-medium rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)] transition-colors"
            >
              {isDe ? "📥 PCR-Befund exportieren" : "📥 导出PCR学报"}
            </button>
          </div>
        </div>

        {/* 右侧：琼脂糖凝胶电泳学术检测槽 (5 列) */}
        <div className="lg:col-span-5 flex flex-col gap-3 p-4 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <div>
              <span className="text-xs font-mono text-[var(--gray)] uppercase tracking-wider">
                {isDe ? "Qualitätskontrolle" : "实验终点质检"}
              </span>
              <h3 className="text-base font-bold text-[var(--ink)] mt-0.5">
                {isDe ? "Agarose-Gelelektrophorese" : "琼脂糖凝胶电泳跑带槽"}
              </h3>
            </div>
            <button
              type="button"
              onClick={() => {
                setGelProgress(0);
                setIsGelRunning(true);
              }}
              className="px-2.5 py-1 text-xs font-bold rounded bg-[var(--accent)] text-white hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
            >
              {isDe ? "⚡ Strom AN (100V)" : "⚡ 通电跑胶"}
            </button>
          </div>

          {/* 学术级凝胶槽 (Tufte 极简素描风) */}
          <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper-subtle)]/50 p-3 flex flex-col justify-between">
            {/* 负极顶部 (Kathode -) */}
            <div className="flex justify-between items-center text-[10px] font-mono border-b border-[var(--line)] pb-1.5">
              <span className="text-rose-700 dark:text-rose-400 font-bold">Kathode (-) 点样端</span>
              <span className="text-[var(--gray)]">100V · 1.5% Agarose-Gel</span>
            </div>

            {/* 点样孔 (Wells) */}
            <div className="grid grid-cols-2 gap-4 pt-1">
              <div className="h-4 rounded-xs bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center text-[9px] font-mono text-[var(--ink)]">
                Well 1: Marker
              </div>
              <div className="h-4 rounded-xs bg-[var(--paper)] border border-[var(--line)] flex items-center justify-center text-[9px] font-mono text-[var(--ink)]">
                Well 2: PCR-Produkt
              </div>
            </div>

            {/* 凝胶基质板 (Slab) */}
            <div className="relative flex-1 my-2 rounded bg-slate-100 dark:bg-slate-800/40 border border-slate-300 dark:border-slate-700">
              {/* 标准 Marker 梯级 (分子量阶梯) */}
              <div className="absolute left-6 inset-y-0 w-8 flex flex-col justify-between py-2">
                {[
                  { bp: "2000 bp", y: 15 },
                  { bp: "1500 bp", y: 30 },
                  { bp: "1000 bp", y: 48 },
                  { bp: "500 bp", y: 70 },
                  { bp: "250 bp", y: 88 }
                ].map((band) => (
                  <div
                    key={band.bp}
                    className="absolute inset-x-0 h-1.5 bg-slate-800 dark:bg-slate-200 rounded-xs"
                    style={{ top: `${band.y}%` }}
                  >
                    <span className="absolute -left-12 -top-1 text-[8.5px] font-mono font-medium text-[var(--gray)] whitespace-nowrap">
                      {band.bp}
                    </span>
                  </div>
                ))}
              </div>

              {/* 样本泳动带 (随 gelProgress 动态向下迁移) */}
              {cycleCount > 0 && (
                <div
                  className="absolute right-6 w-12 h-2 rounded-xs transition-all duration-100"
                  style={{
                    top: `${Math.min(70, 10 + (gelProgress / 100) * 60)}%`,
                    backgroundColor: "#4338ca",
                    opacity: cycleCount >= 15 ? 1 : cycleCount >= 5 ? 0.75 : 0.4
                  }}
                >
                  <span className="absolute -right-22 -top-1 text-[8.5px] font-mono text-indigo-800 dark:text-indigo-300 font-bold whitespace-nowrap">
                    500 bp Amplikon
                  </span>
                </div>
              )}
            </div>

            {/* 正极底部 (Anode +) */}
            <div className="flex justify-between items-center text-[10px] font-mono border-t border-[var(--line)] pt-1.5">
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">Anode (+) 阳极端</span>
              <span className="text-[9px] text-[var(--gray)] font-mono">DNA (PO₄³⁻) wandert zu (+)</span>
            </div>
          </div>

          {/* 会考考点点拨 */}
          <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] text-xs text-[var(--ink)] leading-relaxed">
            <span className="font-bold text-[var(--accent)] block mb-0.5">
              {isDe ? "🏛️ Klausur-Schwerpunkt (EF/Q1):" : "🏛️ 北威州会考核心采分点："}
            </span>
            <p>
              {isDe
                ? "Warum wandert DNA im elektrischen Feld zur Anode? Durch die negativ geladenen Phosphatgruppen im Zucker-Phosphat-Rückgrat. Kürzere Fragmente erfahren weniger Reibung in den Poren der Agarose und wandern schneller."
                : "DNA 为何通电后必然向正极（Anode）迁移？因为脱氧核糖-磷酸骨架带大量负电荷（PO₄³⁻）。短片段受琼脂糖网孔阻滞阻力小，迁移速率远快于长片段。"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
