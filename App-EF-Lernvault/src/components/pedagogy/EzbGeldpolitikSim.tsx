// EzbGeldpolitikSim — 欧洲央行 (EZB) 货币政策利率走廊与传导机制微观动态沙盒
// 依据欧洲央行货币政策两支柱框架 (Zwei-Säulen-Strategie) 与北威州高级文理中学 SoWi 考纲标准设计
// 包含三大核心沉浸机制：
// 1. 🏛️ 法定三大基准利率走廊 (Zinskorridor): 存款便利、主再融资、边际贷款实时阶梯升降
// 2. ⚡ 传导机制粒子动态 (Transmissionsmechanismus): 央行 ➔ 商业银行 ➔ 实体企业/居民信贷 ➔ 需求与通胀
// 3. 🎯 调和消费者物价 (HVPI) 目标 2% 仪表盘与菲利普斯曲线短期两难博弈

import { useState, useMemo, useEffect } from "react";
import type { Lang } from "../../i18n";

export interface EzbGeldpolitikSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export function EzbGeldpolitikSim({ lang = "de", onExportFinding }: EzbGeldpolitikSimProps) {
  const isDe = lang === "de";

  // 主再融资利率 (0.0% - 6.0%)
  const [leitzins, setLeitzins] = useState<number>(3.5);
  // 广义货币供应量 M3 增长率 (-2% bis +12%)
  const [m3Growth, setM3Growth] = useState<number>(4.5);
  // 外生宏观冲击
  const [activeShock, setActiveShock] = useState<"none" | "energie" | "nachfrage">("none");

  // 粒子流动动画计数器
  const [particleTick, setParticleTick] = useState<number>(0);

  // 利率走廊三大利率自动对齐 (走廊宽度通常各差 0.25%)
  const spitzenzins = +(leitzins + 0.25).toFixed(2); // 边际贷款便利 (上限)
  const einlagezins = Math.max(0, +(leitzins - 0.25).toFixed(2)); // 存款便利 (下限)

  // 宏观经济推演计算
  const macro = useMemo(() => {
    // 冲击修正
    let shockInflation = 0;
    let shockWachstum = 0;
    if (activeShock === "energie") {
      shockInflation = 3.5; // 供给侧滞胀冲击
      shockWachstum = -1.8;
    } else if (activeShock === "nachfrage") {
      shockInflation = -2.0; // 需求萎缩通缩冲击
      shockWachstum = -2.5;
    }

    // 通胀率计算: 基准通胀受货币 M3 驱动，受高利率紧缩压制
    const baseInflation = 2.0 + (m3Growth - 4.5) * 0.4 - (leitzins - 2.5) * 0.85 + shockInflation;
    const hvpi = +Math.max(0.1, baseInflation).toFixed(1);

    // GDP 增长率推算
    const bipWachstum = +(2.0 - (leitzins - 2.0) * 0.6 + (m3Growth - 4.0) * 0.25 + shockWachstum).toFixed(1);

    // 短期失业率推算 (奥肯定律/菲利普斯曲线)
    const arbeitslosigkeit = +Math.max(3.0, 5.0 + (leitzins - 2.5) * 0.5 - bipWachstum * 0.4).toFixed(1);

    // 目标偏离度 (EZB Ziel: symmetrisch 2.0%)
    const zielAbweichung = +(hvpi - 2.0).toFixed(1);

    return {
      hvpi,
      bipWachstum,
      arbeitslosigkeit,
      zielAbweichung
    };
  }, [leitzins, m3Growth, activeShock]);

  // 动态粒子流动时钟 (利率越高，经济信贷流动越迟缓；利率越低，流动越狂暴)
  useEffect(() => {
    const speed = Math.max(20, Math.round(80 - (6.0 - leitzins) * 10));
    const timer = setInterval(() => {
      setParticleTick((t) => (t + 1) % 100);
    }, speed);
    return () => clearInterval(timer);
  }, [leitzins]);

  const handleExport = () => {
    const text = isDe
      ? `EZB-Geldpolitik Analyseprotokoll:\n- Hauptrefinanzierungssatz: ${leitzins}% (Zinskorridor: ${einlagezins}% - ${spitzenzins}%)\n- M3-Geldmengenwachstum: ${m3Growth}%\n- Inflation (HVPI): ${macro.hvpi}% (Ziel: 2.0%, Abweichung: ${macro.zielAbweichung > 0 ? "+" : ""}${macro.zielAbweichung}%)\n- BIP-Wachstum: ${macro.bipWachstum}%\n- Arbeitslosenquote: ${macro.arbeitslosigkeit}%\n- Fazit: ${
          macro.hvpi > 3.0
            ? "Restriktive Zinspolitik zwingend erforderlich zur Preisstabilisierung."
            : macro.hvpi < 1.0
            ? "Expansive Geldpolitik / Zinssenkung zur Vermeidung von Deflationsrisiken."
            : "Optimale Preisstabilität im Einklang mit dem EZB-Mandat (Art. 127 AEUV)."
        }`
      : `欧洲央行 (EZB) 货币政策实验诊断报告：\n- 核心主再融资利率：${leitzins}%（利率走廊：存款便利 ${einlagezins}% ~ 边际贷款 ${spitzenzins}%）\n- 广义货币 M3 增速：${m3Growth}%\n- 调和消费者通胀率 (HVPI)：${macro.hvpi}%（法定义务目标 2.0%，偏离度：${macro.zielAbweichung > 0 ? "+" : ""}${macro.zielAbweichung}%）\n- 实际 GDP 增长率：${macro.bipWachstum}%\n- 宏观失业率：${macro.arbeitslosigkeit}%\n- 政策研判：${
          macro.hvpi > 3.0
            ? "通胀显著过热，必须执行加息紧缩并收缩再融资额度。"
            : macro.hvpi < 1.0
            ? "面临流动性陷阱与通缩停滞，需启动降息降准与资产购买。"
            : "完美契合欧盟运作条约第127条物价稳定黄金目标。"
        }`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs font-sans text-[var(--ink)]">
      {/* 顶部标题与外生冲击选择栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              SoWi EF / Q1 · Geldpolitik der EZB
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Art. 127 Abs. 1 AEUV: Primärziel Preisstabilität</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "EZB-Zinskorridor & Transmissionsmechanismus" : "欧洲央行利率走廊、货币传导链与物价稳定动态沙盒"}
          </h2>
        </div>

        {/* 外生冲击推演选择 */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--paper-subtle)] rounded-lg border border-[var(--line)] text-xs">
          <button
            type="button"
            onClick={() => setActiveShock("none")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeShock === "none"
                ? "bg-[var(--paper)] text-[var(--accent)] font-bold shadow-xs"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "🕊️ Normalzustand" : "🕊️ 常态基准"}
          </button>
          <button
            type="button"
            onClick={() => setActiveShock("energie")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeShock === "energie"
                ? "bg-red-500/15 border border-red-500/30 text-red-600 font-bold"
                : "text-[var(--gray)] hover:text-red-600"
            }`}
          >
            {isDe ? "⚡ Energiekrise (Stagflation)" : "⚡ 能源危机(滞胀冲击)"}
          </button>
          <button
            type="button"
            onClick={() => setActiveShock("nachfrage")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeShock === "nachfrage"
                ? "bg-sky-500/15 border border-sky-500/30 text-sky-600 font-bold"
                : "text-[var(--gray)] hover:text-sky-600"
            }`}
          >
            {isDe ? "❄️ Nachfragekrise (Deflation)" : "❄️ 需求冰冻(通缩风险)"}
          </button>
        </div>
      </div>

      {/* 控制台：主再融资利率滑块与 M3 增速 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-[var(--paper-subtle)]/50 rounded-xl border border-[var(--line)] text-xs">
        <div>
          <div className="flex justify-between items-center mb-1 font-semibold">
            <span>
              {isDe ? "EZB-Hauptrefinanzierungssatz (Leitzins):" : "欧洲央行核心主再融资基准利率："}
            </span>
            <span className="font-mono text-blue-700 dark:text-blue-300 font-bold text-sm">
              {leitzins.toFixed(2)} %
            </span>
          </div>
          <input
            type="range"
            min="0.0"
            max="6.0"
            step="0.25"
            value={leitzins}
            onChange={(e) => setLeitzins(Number(e.target.value))}
            className="w-full accent-blue-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--gray)] font-mono mt-0.5">
            <span>0.0% (Nullzinspolitik)</span>
            <span>2.5% (Neutraler Zins)</span>
            <span>6.0% (Restriktiv / Hochzins)</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1 font-semibold">
            <span>
              {isDe ? "Geldmengenwachstum M3 (Monetäre Säule):" : "广义货币供应量 M3 增长率（货币支柱）："}
            </span>
            <span className="font-mono text-[var(--accent)] font-bold text-sm">
              {m3Growth.toFixed(1)} %
            </span>
          </div>
          <input
            type="range"
            min="-1.0"
            max="12.0"
            step="0.5"
            value={m3Growth}
            onChange={(e) => setM3Growth(Number(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--gray)] font-mono mt-0.5">
            <span>-1.0% (Geldverknappung)</span>
            <span>4.5% (EZB-Referenzwert)</span>
            <span>12.0% (Liquiditätsschwemme)</span>
          </div>
        </div>
      </div>

      {/* 核心双视窗：左侧利率走廊与传导粒子流，右侧通胀仪表盘与宏观响应 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：法兰克福欧央行三大利率走廊与资金粒子流动 (7 列) */}
        <div className="lg:col-span-7 flex flex-col gap-2 p-4 bg-[var(--paper-subtle)]/40 rounded-xl border border-[var(--line)]">
          <div className="flex justify-between items-center text-xs text-[var(--gray)] font-mono">
            <span>Zinskorridor & Geldstrom-Transmission</span>
            <span className="text-blue-600 dark:text-blue-400 font-bold">
              EZB ➔ Bankensektor ➔ Realwirtschaft
            </span>
          </div>

          <div className="relative w-full aspect-16/11 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] p-2">
            <svg className="w-full h-full" viewBox="0 0 500 320">
              {/* 1. 左侧：利率走廊阶梯 (Zinskorridor) */}
              <rect x="25" y="40" width="135" height="240" rx="6" fill="var(--paper-subtle)" stroke="var(--line)" />
              <text x="92" y="58" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)">
                Zinskorridor
              </text>

              {/* 利率标尺刻度 (0%, 2%, 4%, 6%) */}
              {[0, 2, 4, 6].map((rate) => {
                const y = 230 - (rate / 6) * 155;
                return (
                  <g key={rate}>
                    <line x1="28" y1={y} x2="35" y2={y} stroke="var(--line)" strokeWidth="1" />
                    <line x1="35" y1={y} x2="150" y2={y} stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2,2" strokeOpacity="0.4" />
                    <text x="26" y={y + 2.5} textAnchor="end" fontSize="7" fill="var(--gray)" fontFamily="monospace">
                      {rate}%
                    </text>
                  </g>
                );
              })}

              {(() => {
                const ySpitze = 230 - (spitzenzins / 6) * 155;
                const yLeit = 230 - (leitzins / 6) * 155;
                const yEinlage = 230 - (einlagezins / 6) * 155;

                return (
                  <>
                    {/* 走廊通带半透明阴影 */}
                    <rect
                      x="35"
                      y={ySpitze}
                      width="115"
                      height={Math.max(4, yEinlage - ySpitze)}
                      fill="#2563eb"
                      fillOpacity="0.08"
                    />

                    {/* 边际贷款便利 Spitzenrefinanzierungsfazilität (上限) */}
                    <line x1="35" y1={ySpitze} x2="150" y2={ySpitze} stroke="#dc2626" strokeWidth="2" strokeDasharray="4,2" />
                    <text x="38" y={ySpitze - 4} fontSize="7.5" fill="#dc2626" fontWeight="bold" fontFamily="monospace">
                      ▲ Spitzen: {spitzenzins}%
                    </text>

                    {/* 主再融资利率 Hauptrefinanzierungssatz (核心基准) */}
                    <line x1="35" y1={yLeit} x2="150" y2={yLeit} stroke="#2563eb" strokeWidth="3" />
                    <circle cx="85" cy={yLeit} r="4" fill="#2563eb" />
                    {/* 浮动中央基准徽章 */}
                    <rect x="94" y={yLeit - 7} width="52" height="14" rx="2" fill="var(--paper)" stroke="#2563eb" strokeWidth="1" />
                    <text x="120" y={yLeit + 3.5} textAnchor="middle" fontSize="7.5" fill="#2563eb" fontWeight="bold" fontFamily="monospace">
                      Leit: {leitzins}%
                    </text>

                    {/* 存款便利 Einlagefazilität (下限) */}
                    <line x1="35" y1={yEinlage} x2="150" y2={yEinlage} stroke="#16a34a" strokeWidth="2" strokeDasharray="4,2" />
                    <text x="38" y={yEinlage + 11} fontSize="7.5" fill="#16a34a" fontWeight="bold" fontFamily="monospace">
                      ▼ Einlage: {einlagezins}%
                    </text>
                  </>
                );
              })()}

              <text x="92" y="268" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
                EZB-Geldmarkt
              </text>

              {/* 2. 中间：传导连线与商业银行中介 (Geschäftsbanken) */}
              {/* 传导导管 1 */}
              <path d="M 155 120 L 220 120" stroke="var(--line)" strokeWidth="3" fill="none" />
              <path d="M 155 180 L 220 180" stroke="var(--line)" strokeWidth="3" fill="none" />

              {/* 商业银行中控盒 */}
              <rect x="220" y="80" width="100" height="140" rx="6" fill="#f1f5f9" stroke="var(--ink)" strokeWidth="1.5" />
              <text x="270" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0f172a">
                Geschäftsbanken
              </text>
              <text x="270" y="120" textAnchor="middle" fontSize="8" fill="#475569">
                (Kreditvergabe)
              </text>

              <text x="270" y="150" textAnchor="middle" fontSize="8" fill="var(--ink)">
                Kreditzins: ~{(leitzins + 2.2).toFixed(2)}%
              </text>
              <text x="270" y="165" textAnchor="middle" fontSize="8" fill="var(--ink)">
                Sparzins: ~{Math.max(0, leitzins - 0.8).toFixed(2)}%
              </text>

              <text x="270" y="195" textAnchor="middle" fontSize="8" fill="#0284c7" fontWeight="bold">
                {leitzins > 4 ? "Kreditklemme ⚠️" : leitzins < 1.5 ? "Boom 🚀" : "Neutral ⚖️"}
              </text>

              {/* 3. 右侧：实体经济 (Realwirtschaft: Konsum & Investitionen) */}
              <path d="M 320 120 L 380 120" stroke="var(--line)" strokeWidth="3" fill="none" />
              <path d="M 320 180 L 380 180" stroke="var(--line)" strokeWidth="3" fill="none" />

              <rect x="380" y="80" width="100" height="140" rx="6" fill="var(--paper-subtle)" stroke="var(--ink)" strokeWidth="1.5" />
              <text x="430" y="105" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)">
                Realwirtschaft
              </text>
              <text x="430" y="125" textAnchor="middle" fontSize="8" fill="var(--gray)">
                Unternehmen (I)
              </text>
              <text x="430" y="140" textAnchor="middle" fontSize="8" fill="var(--gray)">
                Verbraucher (C)
              </text>

              <text x="430" y="175" textAnchor="middle" fontSize="9" fontWeight="bold" fill={macro.bipWachstum >= 2 ? "#16a34a" : macro.bipWachstum < 0 ? "#dc2626" : "#d97706"}>
                BIP: {macro.bipWachstum > 0 ? `+${macro.bipWachstum}` : macro.bipWachstum}%
              </text>
              <text x="430" y="195" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
                AL-Quote: {macro.arbeitslosigkeit}%
              </text>

              {/* 资金流粒子动画 (小金球沿信贷导管流动) */}
              <g>
                <circle cx={160 + (particleTick % 60)} cy="120" r="3" fill="#2563eb" />
                <circle cx={220 - (particleTick % 60)} cy="180" r="3" fill="#16a34a" />
                <circle cx={325 + (particleTick % 55)} cy="120" r="3.5" fill="#facc15" />
                <circle cx={380 - (particleTick % 55)} cy="180" r="3.5" fill="#f59e0b" />
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--gray)] pt-1">
            <span>
              {isDe
                ? "Transmission: Leitzinsänderung steuert über Marktzinsen die Kreditnachfrage der Realwirtschaft."
                : "传导逻辑：基准利率变动通过银行同业拆借利差，直接决定实体企业投资与居民购房消费信贷成本。"}
            </span>
            <button
              type="button"
              onClick={handleExport}
              className="px-2.5 py-1 text-xs font-medium rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)] transition-colors"
            >
              {isDe ? "📥 EZB-Bericht" : "📥 导出央行研报"}
            </button>
          </div>
        </div>

        {/* 右侧：调和消费者通胀率 (HVPI) 仪表盘与宏观诊断 (5 列) */}
        <div className="lg:col-span-5 flex flex-col gap-3 p-4 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs text-xs">
          <div className="border-b border-[var(--line)] pb-3">
            <span className="font-mono text-[var(--gray)] uppercase tracking-wider text-[10px]">
              {isDe ? "Mandat der Preisstabilität" : "法定首要使命：价格稳定性"}
            </span>
            <h3 className="text-base font-bold text-[var(--ink)] mt-0.5">
              {isDe ? "HVPI-Inflationsrate (Ziel: genau 2,0%)" : "调和消费者物价指数 (HVPI 目标 2.0%)"}
            </h3>
          </div>

          {/* 通胀仪表盘 (HVPI-Tacho) */}
          <div className="p-4 rounded-xl bg-[var(--paper-subtle)]/60 border border-[var(--line)] flex flex-col items-center justify-center">
            <div className="text-3xl font-mono font-bold tracking-tight mb-1 text-[var(--ink)]">
              {macro.hvpi.toFixed(1)} %
            </div>
            <div className={`px-2 py-0.5 rounded text-[11px] font-bold ${
              Math.abs(macro.zielAbweichung) <= 0.3
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                : macro.hvpi > 2.3
                ? "bg-red-500/15 text-red-600 border border-red-500/30"
                : "bg-sky-500/15 text-sky-600 border border-sky-500/30"
            }`}>
              {Math.abs(macro.zielAbweichung) <= 0.3
                ? (isDe ? "✓ ZIELKONFORM (Preisstabilität)" : "✓ 契合目标（物价稳定黄金区间）")
                : macro.hvpi > 2.3
                ? (isDe ? `⚠️ ZU HOCH (+${macro.zielAbweichung}% über Ziel)` : `⚠️ 通胀过热（超出目标 +${macro.zielAbweichung}%）`)
                : (isDe ? `❄️ DEFLATIONSGEFAHR (${macro.zielAbweichung}%)` : `❄️ 通缩低迷（偏离目标 ${macro.zielAbweichung}%）`)}
            </div>

            {/* 视觉刻度进度条 */}
            <div className="w-full mt-4">
              <div className="relative w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                {/* 2% 黄金目标区绿色标记 */}
                <div className="absolute left-[20%] w-[10%] inset-y-0 bg-emerald-500/60" />
                {/* 实际通胀指针 */}
                <div
                  className={`h-full transition-all duration-300 ${
                    macro.hvpi > 3 ? "bg-red-500" : macro.hvpi < 1 ? "bg-sky-500" : "bg-emerald-500"
                  }`}
                  style={{ width: `${Math.min(100, (macro.hvpi / 8) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] font-mono text-[var(--gray)] mt-1">
                <span>0.0% (Deflation)</span>
                <span className="text-emerald-600 font-bold">2.0% (Ziel)</span>
                <span>4.0%</span>
                <span className="text-red-600">8.0% (Galoppierend)</span>
              </div>
            </div>
          </div>

          {/* 菲利普斯曲线与宏观两难诊断 */}
          <div className="p-3 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] space-y-1.5 leading-relaxed">
            <span className="font-bold text-[var(--accent)] block">
              {isDe ? "⚖️ Zielkonflikte & Phillips-Kurve:" : "⚖️ 宏观目标冲突与菲利普斯两难："}
            </span>
            <p>
              {macro.hvpi > 3.0
                ? isDe
                  ? "Hohe Inflation erfordert kräftige Zinserhöhungen. Dies dämpft jedoch Investitionen, bremst das BIP-Wachstum und lässt die Arbeitslosigkeit steigen."
                  : "过热通胀迫使央行必须大力加息；但加息必然推高企业借贷门槛，挫伤固定资产投资，抑制 GDP 增速并推高失业率。"
                : macro.hvpi < 1.0
                ? isDe
                  ? "Niedrigzinsen und quantitative Lockerung stützen Konjunktur und Beschäftigung, bergen jedoch Gefahren von Immobilien- und Aktienblasen."
                  : "低利率与量化宽松能够托底就业与景气回升，但极易诱发房地产与金融资产价格泡沫，加剧贫富分化。"
                : isDe
                ? "Ideale Balance: Das monetäre Mandat ist erfüllt. Die Realwirtschaft operiert nahe dem Produktionspotenzial."
                : "理想均衡：物价稳定首要使命达成，实体经济在无通胀压力下贴近潜在产出水平运行。"}
            </p>
          </div>

          {/* 会考满分点拨 */}
          <div className="p-3 rounded-lg bg-[var(--paper-subtle)] border-l-4 border-l-emerald-600 border border-[var(--line)] text-[var(--ink)] leading-relaxed">
            <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
              {isDe ? "✍️ SoWi-Abitur Merksatz (Art. 127 AEUV):" : "✍️ 北威州会考采分核心规范："}
            </span>
            <p className="text-xs text-[var(--ink)]/90">
              {isDe
                ? "„Das vorrangige Ziel des Eurosystems ist die Gewährleistung der Preisstabilität (Art. 127 Abs. 1 AEUV). Soweit dies ohne Beeinträchtigung des Ziels der Preisstabilität möglich ist, unterstützt das ESZB die allgemeine Wirtschaftspolitik in der Union.“"
                : "‘欧洲中央银行体系的首要目标是维持物价稳定（欧盟运行条约第127条第1款）。在绝不损害物价稳定目标的前提下，欧洲央行才兼顾支持欧盟的整体经济政策（如充分就业与经济增长）。’"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
