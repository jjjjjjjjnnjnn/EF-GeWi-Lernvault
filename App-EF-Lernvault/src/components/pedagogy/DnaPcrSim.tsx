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

          {/* DNA 复制微观动画画布 */}
          <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] p-3">
            <svg className="w-full h-full" viewBox="0 0 500 280">
              {/* 阶段 1：95°C 变性解链 */}
              {phase === "denaturation" && (
                <g className="transition-all duration-300">
                  <text x="250" y="30" textAnchor="middle" fill="#dc2626" fontSize="11" fontWeight="bold">
                    95°C: Thermische Trennung der Wasserstoffbrücken (Helikase entfällt)
                  </text>

                  {/* 上单链 5' -> 3' */}
                  <path d="M 60 80 L 440 80" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />
                  <text x="45" y="84" fontSize="9" fontWeight="bold" fill="#2563eb" fontFamily="monospace">5'</text>
                  <text x="448" y="84" fontSize="9" fontWeight="bold" fill="#2563eb" fontFamily="monospace">3'</text>
                  <text x="250" y="70" textAnchor="middle" fontSize="9" fill="#2563eb" fontFamily="monospace">
                    Template Strand A (Matrizenstrang)
                  </text>

                  {/* 正在断裂散开的氢键虚线 */}
                  {[100, 140, 180, 220, 260, 300, 340, 380, 420].map((x) => (
                    <line key={x} x1={x} y1="90" x2={x} y2="150" stroke="#dc2626" strokeWidth="1.5" strokeDasharray="3,3" strokeOpacity="0.4" />
                  ))}

                  {/* 下单链 3' -> 5' */}
                  <path d="M 60 160 L 440 160" stroke="#059669" strokeWidth="4" strokeLinecap="round" />
                  <text x="45" y="164" fontSize="9" fontWeight="bold" fill="#059669" fontFamily="monospace">3'</text>
                  <text x="448" y="164" fontSize="9" fontWeight="bold" fill="#059669" fontFamily="monospace">5'</text>
                  <text x="250" y="180" textAnchor="middle" fontSize="9" fill="#059669" fontFamily="monospace">
                    Template Strand B (Matrizenstrang)
                  </text>

                  <text x="250" y="240" textAnchor="middle" fontSize="9" fill="var(--gray)" fontStyle="italic">
                    {isDe ? "Keine Reißverschluss-Öffnung nötig: Hitze bricht die H-Brücken instantan!" : "无需解旋酶开路：纯物理高温瞬间破坏碱基间氢键！"}
                  </text>
                </g>
              )}

              {/* 阶段 2：55°C 引物特异结合 */}
              {phase === "annealing" && (
                <g className="transition-all duration-300">
                  <text x="250" y="30" textAnchor="middle" fill="#0284c7" fontSize="11" fontWeight="bold">
                    55°C: Spezifische Primer-Hybridisierung (Forward & Reverse)
                  </text>

                  {/* 上链 */}
                  <path d="M 60 70 L 440 70" stroke="#2563eb" strokeWidth="3.5" />
                  <text x="45" y="74" fontSize="9" fontWeight="bold" fill="#2563eb" fontFamily="monospace">5'</text>
                  <text x="448" y="74" fontSize="9" fontWeight="bold" fill="#2563eb" fontFamily="monospace">3'</text>

                  {/* 上链对应的 Reverse Primer (在 3' 端附着) */}
                  <rect x="360" y="80" width="70" height="8" fill="#e11d48" rx="2" />
                  <text x="395" y="102" textAnchor="middle" fontSize="8" fill="#e11d48" fontWeight="bold">
                    Reverse Primer (3' 结合)
                  </text>

                  {/* 下链 */}
                  <path d="M 60 170 L 440 170" stroke="#059669" strokeWidth="3.5" />
                  <text x="45" y="174" fontSize="9" fontWeight="bold" fill="#059669" fontFamily="monospace">3'</text>
                  <text x="448" y="174" fontSize="9" fontWeight="bold" fill="#059669" fontFamily="monospace">5'</text>

                  {/* 下链对应的 Forward Primer (在 3' 端附着) */}
                  <rect x="70" y="152" width="70" height="8" fill="#e11d48" rx="2" />
                  <text x="105" y="145" textAnchor="middle" fontSize="8" fill="#e11d48" fontWeight="bold">
                    Forward Primer (3' 结合)
                  </text>

                  <text x="250" y="240" textAnchor="middle" fontSize="9" fill="var(--gray)" fontStyle="italic">
                    {isDe ? "Sequenzspezifische Oligonukleotide definieren die Grenzen des Zielamplikons." : "人工合成寡核苷酸特异性锚定目的基因片段边界。"}
                  </text>
                </g>
              )}

              {/* 阶段 3：72°C Taq 延伸合成 */}
              {phase === "elongation" && (
                <g className="transition-all duration-300">
                  <text x="250" y="30" textAnchor="middle" fill="#059669" fontSize="11" fontWeight="bold">
                    72°C: Synthese durch hitzestabile Taq-Polymerase (5' → 3')
                  </text>

                  {/* 上链 */}
                  <path d="M 60 70 L 440 70" stroke="#2563eb" strokeWidth="3" />
                  {/* 新合成的互补链沿 5' -> 3' 延伸 */}
                  <path d="M 430 84 L 200 84" stroke="#e11d48" strokeWidth="3" strokeDasharray="4,2" />
                  {/* Taq 酶示意图 */}
                  <circle cx="200" cy="77" r="14" fill="#10b981" fillOpacity="0.8" stroke="#047857" strokeWidth="1.5" />
                  <text x="200" y="80" textAnchor="middle" fontSize="7" fill="#ffffff" fontWeight="bold">Taq</text>
                  <text x="180" y="60" fontSize="8" fill="#10b981" fontWeight="bold">◀ 5' → 3'</text>

                  {/* 下链 */}
                  <path d="M 60 170 L 440 170" stroke="#059669" strokeWidth="3" />
                  {/* 下链新合成互补链 */}
                  <path d="M 70 156 L 300 156" stroke="#e11d48" strokeWidth="3" strokeDasharray="4,2" />
                  {/* 下链 Taq 酶 */}
                  <circle cx="300" cy="163" r="14" fill="#10b981" fillOpacity="0.8" stroke="#047857" strokeWidth="1.5" />
                  <text x="300" y="166" textAnchor="middle" fontSize="7" fill="#ffffff" fontWeight="bold">Taq</text>
                  <text x="320" y="185" fontSize="8" fill="#10b981" fontWeight="bold">5' → 3' ▶</text>

                  <text x="250" y="240" textAnchor="middle" fontSize="9" fill="var(--gray)" fontStyle="italic">
                    {isDe ? "Thermus aquaticus Polymerase: Denaturiert selbst bei 95°C nicht!" : "水生栖热菌聚合酶：耐受 95°C 高温而不失活！"}
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

        {/* 右侧：紫外琼脂糖凝胶电泳检测槽 (5 列) */}
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
              className="px-2.5 py-1 text-xs font-bold rounded bg-sky-600 text-white hover:bg-sky-500 transition-colors shadow-xs"
            >
              {isDe ? "⚡ Strom AN (100V)" : "⚡ 通电跑胶"}
            </button>
          </div>

          {/* 紫外暗箱与凝胶槽 */}
          <div className="relative w-full aspect-3/4 rounded-lg overflow-hidden border-2 border-slate-700 bg-slate-950 p-3 flex flex-col justify-between">
            {/* 负极顶部 (Kathode -) */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-b border-slate-800 pb-1">
              <span className="text-red-400 font-bold">Kathode (-) 点样端</span>
              <span>100V · 1.5% Agarose</span>
            </div>

            {/* 点样孔 (Wells) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="h-3 rounded-xs bg-slate-800 border border-slate-600 flex items-center justify-center text-[8px] font-mono text-slate-400">
                Well 1: Marker
              </div>
              <div className="h-3 rounded-xs bg-slate-800 border border-slate-600 flex items-center justify-center text-[8px] font-mono text-slate-400">
                Well 2: PCR-Produkt
              </div>
            </div>

            {/* 凝胶泳动区 */}
            <div className="relative flex-1 my-2">
              {/* 标准 Marker 梯级 (已固定跑开) */}
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
                    className="absolute inset-x-0 h-1 bg-cyan-400/90 rounded-xs shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    style={{ top: `${band.y}%` }}
                  >
                    <span className="absolute -left-7 -top-1.5 text-[8px] font-mono text-slate-500">
                      {band.bp}
                    </span>
                  </div>
                ))}
              </div>

              {/* 样本泳动带 (随 gelProgress 动态向下迁移) */}
              {cycleCount > 0 && (
                <div
                  className="absolute right-6 w-12 h-1.5 rounded-xs transition-all duration-100"
                  style={{
                    top: `${Math.min(70, 10 + (gelProgress / 100) * 60)}%`,
                    backgroundColor: "#38bdf8",
                    boxShadow: "0 0 12px #38bdf8",
                    opacity: cycleCount >= 15 ? 1 : cycleCount >= 5 ? 0.6 : 0.25
                  }}
                >
                  <span className="absolute -right-16 -top-1.5 text-[8px] font-mono text-cyan-300 font-bold whitespace-nowrap">
                    500 bp Amplikon
                  </span>
                </div>
              )}
            </div>

            {/* 正极底部 (Anode +) */}
            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 border-t border-slate-800 pt-1">
              <span className="text-emerald-400 font-bold">Anode (+) 阳极端</span>
              <span className="text-[9px] text-slate-500">DNA migriert zu (+)</span>
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
