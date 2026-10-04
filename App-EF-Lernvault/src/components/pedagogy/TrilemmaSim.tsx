// TrilemmaSim — 蒙代尔-弗莱明国际金融三元悖论 (Mundell-Fleming-Trilemma) 交互几何张力沙盒
// 依据宏观经济学第一性原理与北威州高级文理中学 (Gymnasium Q1/Q2) SoWi 考纲标准设计
// 包含三大核心沉浸机制：
// 1. 📐 等边张力三角交互沙盒 (Spannungs-Dreieck)：点击点亮任意两条边，第三边断裂并触发经济学代价警报
// 2. 🏛️ 三大经典历史制度模式一键重演 (Historische Regime)：浮动汇率 (EZB)、布雷顿森林 (Bretton Woods)、金本位 (Goldstandard)
// 3. 💥 黑色星期三 1992 索罗斯狙击战推演 (Schwarzer Mittwoch)：英镑脱锚与资本外逃危机沙盒

import { useState } from "react";
import type { Lang } from "../../i18n";

export interface TrilemmaSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type TrilemmaRegimeId = "floating" | "union" | "controls" | "soros";

export function TrilemmaSim({ lang = "de", onExportFinding }: TrilemmaSimProps) {
  const isDe = lang === "de";

  // 当前激活的制度或自选状态
  // 目标状态：true 为选择，false 为牺牲
  const [goalGeldpolitik, setGoalGeldpolitik] = useState<boolean>(true); // 独立货币政策
  const [goalKapital, setGoalKapital] = useState<boolean>(true); // 资本自由流动
  const [goalWechselkurs, setGoalWechselkurs] = useState<boolean>(false); // 固定汇率

  const [activeRegime, setActiveRegime] = useState<TrilemmaRegimeId>("floating");
  const [shockSeverity, setShockSeverity] = useState<number>(50); // 外生投机冲击强度 0 - 100

  // 快捷切换预设制度
  const handleSelectRegime = (regime: TrilemmaRegimeId) => {
    setActiveRegime(regime);
    if (regime === "floating") {
      setGoalGeldpolitik(true);
      setGoalKapital(true);
      setGoalWechselkurs(false);
    } else if (regime === "union") {
      setGoalGeldpolitik(false);
      setGoalKapital(true);
      setGoalWechselkurs(true);
    } else if (regime === "controls") {
      setGoalGeldpolitik(true);
      setGoalKapital(false);
      setGoalWechselkurs(true);
    } else if (regime === "soros") {
      // 索罗斯危机情境：强行想要三者兼得的崩溃态
      setGoalGeldpolitik(true);
      setGoalKapital(true);
      setGoalWechselkurs(true);
    }
  };

  // 用户点击某个目标进行切换（最多只能同时选 2 个，若选第 3 个则需警示或自动关闭最早的一个）
  const toggleGoal = (goal: "geldpolitik" | "kapital" | "wechselkurs") => {
    setActiveRegime("floating"); // 进入自定义探索
    if (goal === "geldpolitik") {
      if (!goalGeldpolitik && goalKapital && goalWechselkurs) {
        // 已经有两个，必须放弃一个
        setGoalWechselkurs(false);
      }
      setGoalGeldpolitik(!goalGeldpolitik);
    } else if (goal === "kapital") {
      if (!goalKapital && goalGeldpolitik && goalWechselkurs) {
        setGoalWechselkurs(false);
      }
      setGoalKapital(!goalKapital);
    } else if (goal === "wechselkurs") {
      if (!goalWechselkurs && goalGeldpolitik && goalKapital) {
        setGoalGeldpolitik(false);
      }
      setGoalWechselkurs(!goalWechselkurs);
    }
  };

  // 状态诊断
  const selectedCount = [goalGeldpolitik, goalKapital, goalWechselkurs].filter(Boolean).length;
  const isImpossibleState = selectedCount === 3;

  const handleExport = () => {
    const text = isDe
      ? `Mundell-Fleming-Trilemma Analyse:\n- Autonome Geldpolitik: ${goalGeldpolitik ? "JA" : "NEIN"}\n- Freier Kapitalverkehr: ${goalKapital ? "JA" : "NEIN"}\n- Fester Wechselkurs: ${goalWechselkurs ? "JA" : "NEIN"}\nDiagnose: ${
          isImpossibleState
            ? "KRITISCH! Dreifache Bindung unmöglich (Marktzwang erzwingt Währungskollaps)."
            : "Konsistentes makroökonomisches Währungsregime."
        }`
      : `蒙代尔-弗莱明不可能三角诊断报告：\n- 独立自主货币政策：${goalGeldpolitik ? "启用" : "牺牲"}\n- 资本完全自由流动：${goalKapital ? "启用" : "牺牲"}\n- 汇率绝对固定稳定：${goalWechselkurs ? "启用" : "牺牲"}\n系统判定：${
          isImpossibleState
            ? "违背物理不可能三角！市场投机与外汇储备枯竭将引爆强制脱锚危机。"
            : "符合一致性宏观经济学制度设计。"
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
      {/* 顶部标题栏 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
              SoWi EF / Q2 · Internationale Wirtschaftspolitik
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Modell: Robert Mundell & Marcus Fleming (Nobelpreis)</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "Das geldpolitische Trilemma (Unmögliche Dreifaltigkeit)" : "蒙代尔-弗莱明国际金融三元悖论（不可能三角沙盒）"}
          </h2>
        </div>

        {/* 预设制度快速按钮 */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--paper-subtle)] rounded-lg border border-[var(--line)] text-xs">
          <button
            type="button"
            onClick={() => handleSelectRegime("floating")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeRegime === "floating"
                ? "bg-[var(--paper)] text-[var(--accent)] shadow-xs font-bold"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "1. Flexibler Wechselkurs (EZB / USA)" : "1. 浮动汇率 (欧洲央行/美国)"}
          </button>
          <button
            type="button"
            onClick={() => handleSelectRegime("union")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeRegime === "union"
                ? "bg-[var(--paper)] text-[var(--accent)] shadow-xs font-bold"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "2. Währungsunion (Euro-Zone)" : "2. 货币联盟 (欧元区内部)"}
          </button>
          <button
            type="button"
            onClick={() => handleSelectRegime("controls")}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeRegime === "controls"
                ? "bg-[var(--paper)] text-[var(--accent)] shadow-xs font-bold"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "3. Bretton Woods (Kapitalkontrollen)" : "3. 布雷顿森林 (资本管制)"}
          </button>
          <button
            type="button"
            onClick={() => handleSelectRegime("soros")}
            className={`px-2.5 py-1 rounded text-red-600 dark:text-red-400 font-bold transition-colors ${
              activeRegime === "soros"
                ? "bg-red-500/10 border border-red-500/30"
                : "hover:bg-red-500/5"
            }`}
          >
            {isDe ? "💥 Schwarzer Mittwoch (1992 Soros)" : "💥 1992索罗斯狙击战"}
          </button>
        </div>
      </div>

      {/* 核心工作区：左侧等边三角形几何图，右侧经济学代价与机制解析 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：等边张力三角 SVG 画布 */}
        <div className="lg:col-span-6 flex flex-col gap-3 p-4 bg-[var(--paper-subtle)]/40 rounded-xl border border-[var(--line)]">
          <div className="flex items-center justify-between text-xs text-[var(--gray)] font-mono">
            <span>Geometrischer Spannungsraum</span>
            <span>Regel: Max. 2 Ziele gleichzeitig!</span>
          </div>

          <div className="relative w-full aspect-4/3 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] flex items-center justify-center p-2">
            <svg className="w-full h-full" viewBox="0 0 400 340">
              {/* 顶点坐标定义：
                  顶：(200, 45) -> 独立货币政策
                  左下：(65, 275) -> 资本自由流动
                  右下：(335, 275) -> 固定汇率制
              */}

              {/* 连线与张力状态 */}
              {/* 边 1：顶到左下（独立货币政策 + 资本自由流动 = 浮动汇率） */}
              <line
                x1="200"
                y1="45"
                x2="65"
                y2="275"
                stroke={goalGeldpolitik && goalKapital ? "#2563eb" : "var(--line)"}
                strokeWidth={goalGeldpolitik && goalKapital ? "4" : "1.5"}
                strokeDasharray={goalGeldpolitik && goalKapital ? "none" : "4,4"}
                className="transition-all duration-300"
              />

              {/* 边 2：底边（资本自由流动 + 固定汇率 = 放弃货币主权） */}
              <line
                x1="65"
                y1="275"
                x2="335"
                y2="275"
                stroke={goalKapital && goalWechselkurs ? "#10b981" : "var(--line)"}
                strokeWidth={goalKapital && goalWechselkurs ? "4" : "1.5"}
                strokeDasharray={goalKapital && goalWechselkurs ? "none" : "4,4"}
                className="transition-all duration-300"
              />

              {/* 边 3：右下到顶（固定汇率 + 独立货币政策 = 资本管制） */}
              <line
                x1="335"
                y1="275"
                x2="200"
                y2="45"
                stroke={goalWechselkurs && goalGeldpolitik ? "#d97706" : "var(--line)"}
                strokeWidth={goalWechselkurs && goalGeldpolitik ? "4" : "1.5"}
                strokeDasharray={goalWechselkurs && goalGeldpolitik ? "none" : "4,4"}
                className="transition-all duration-300"
              />

              {/* 中心危险警报（如果试图三全其美） */}
              {isImpossibleState && (
                <g className="animate-pulse">
                  <polygon
                    points="200,85 110,245 290,245"
                    fill="#ef4444"
                    fillOpacity="0.18"
                    stroke="#dc2626"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                  <text x="200" y="165" textAnchor="middle" fill="#dc2626" fontSize="13" fontWeight="bold">
                    ⚠️ UNMÖGLICH!
                  </text>
                  <text x="200" y="185" textAnchor="middle" fill="#dc2626" fontSize="9" fontFamily="monospace">
                    Währungskollaps erzwingt Bruch
                  </text>
                </g>
              )}

              {/* 边的标签说明 */}
              <text x="110" y="150" textAnchor="middle" fontSize="9" fill="#2563eb" fontWeight="bold" transform="rotate(-60 110 150)">
                Regime 1: Floating
              </text>
              <text x="200" y="295" textAnchor="middle" fontSize="9" fill="#10b981" fontWeight="bold">
                Regime 2: Währungsunion
              </text>
              <text x="290" y="150" textAnchor="middle" fontSize="9" fill="#d97706" fontWeight="bold" transform="rotate(60 290 150)">
                Regime 3: Bretton Woods
              </text>

              {/* 顶点 1：独立货币政策 (Top) */}
              <g onClick={() => toggleGoal("geldpolitik")} className="cursor-pointer group">
                <circle
                  cx="200"
                  cy="45"
                  r="24"
                  fill={goalGeldpolitik ? "#2563eb" : "var(--paper)"}
                  stroke="#2563eb"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:scale-110"
                />
                <text x="200" y="49" textAnchor="middle" fontSize="12" fill={goalGeldpolitik ? "#ffffff" : "#2563eb"} fontWeight="bold">
                  🏛️
                </text>
                <text x="200" y="18" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)">
                  {isDe ? "Autonome Geldpolitik" : "独立自主货币政策"}
                </text>
                <text x="200" y="82" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
                  {goalGeldpolitik ? (isDe ? "[AKTIV: EZB setzt Leitzins]" : "[已启用: 自主决定基准利率]") : (isDe ? "[GEOPFERT: Zinsdiktat]" : "[已牺牲: 失去利率自主权]")}
                </text>
              </g>

              {/* 顶点 2：资本完全自由流动 (Bottom-Left) */}
              <g onClick={() => toggleGoal("kapital")} className="cursor-pointer group">
                <circle
                  cx="65"
                  cy="275"
                  r="24"
                  fill={goalKapital ? "#10b981" : "var(--paper)"}
                  stroke="#10b981"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:scale-110"
                />
                <text x="65" y="279" textAnchor="middle" fontSize="12" fill={goalKapital ? "#ffffff" : "#10b981"} fontWeight="bold">
                  💸
                </text>
                <text x="65" y="315" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)">
                  {isDe ? "Freier Kapitalverkehr" : "资本完全自由流动"}
                </text>
                <text x="65" y="327" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
                  {goalKapital ? (isDe ? "[AKTIV: Kein Stopp]" : "[已启用: 资金无障碍出入]") : (isDe ? "[KONTROLLEN: Zensur]" : "[已牺牲: 严厉资本出境管制]")}
                </text>
              </g>

              {/* 顶点 3：固定汇率 (Bottom-Right) */}
              <g onClick={() => toggleGoal("wechselkurs")} className="cursor-pointer group">
                <circle
                  cx="335"
                  cy="275"
                  r="24"
                  fill={goalWechselkurs ? "#d97706" : "var(--paper)"}
                  stroke="#d97706"
                  strokeWidth="2.5"
                  className="transition-transform group-hover:scale-110"
                />
                <text x="335" y="279" textAnchor="middle" fontSize="12" fill={goalWechselkurs ? "#ffffff" : "#d97706"} fontWeight="bold">
                  🔒
                </text>
                <text x="335" y="315" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)">
                  {isDe ? "Fester Wechselkurs" : "固定汇率稳定"}
                </text>
                <text x="335" y="327" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="monospace">
                  {goalWechselkurs ? (isDe ? "[AKTIV: 1:1 Kursgarantie]" : "[已启用: 刚性钉住固定汇率]") : (isDe ? "[FLEXIBEL: Schwankt]" : "[已牺牲: 承受汇率剧烈波动]")}
                </text>
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--gray)] pt-1">
            <span>💡 提示：点击任意圆环顶点可独立开关目标，观察三角形受力平衡。</span>
            <button
              type="button"
              onClick={handleExport}
              className="px-2.5 py-1 text-xs font-medium rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)] transition-colors"
            >
              {isDe ? "📥 Trilemma-Bericht" : "📥 导出悖论诊断"}
            </button>
          </div>
        </div>

        {/* 右侧：经济学深度因果剖析与考场破局 */}
        <div className="lg:col-span-6 flex flex-col gap-3 p-4 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs">
          {/* 状态徽标与诊断 */}
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <div>
              <span className="text-xs font-mono text-[var(--gray)] uppercase tracking-wider">
                {isDe ? "Aktuelle makroökonomische Diagnose" : "当前宏观金融制度研判"}
              </span>
              <h3 className="text-base font-bold text-[var(--ink)] mt-0.5">
                {isImpossibleState
                  ? isDe
                    ? "🚨 Trilemma-Bruch: Das Unmögliche System"
                    : "🚨 三元悖论断裂：物理不可行系统"
                  : goalGeldpolitik && goalKapital
                  ? isDe
                    ? "Regime 1: Autonome Geldpolitik + Freier Kapitalverkehr"
                    : "模式一：自主货币政策 + 资本自由流动 (欧美范式)"
                  : goalKapital && goalWechselkurs
                  ? isDe
                    ? "Regime 2: Fester Wechselkurs + Freier Kapitalverkehr"
                    : "模式二：固定汇率 + 资本自由流动 (欧元区/联系汇率)"
                  : isDe
                  ? "Regime 3: Fester Wechselkurs + Autonome Geldpolitik"
                  : "模式三：固定汇率 + 自主货币政策 (布雷顿森林)"}
              </h3>
            </div>
          </div>

          {/* 核心牺牲代价 (Das unausweichliche Opfer) */}
          <div className={`p-3 rounded-lg text-xs leading-relaxed border ${
            isImpossibleState
              ? "bg-red-500/10 border-red-500/30 text-red-900 dark:text-red-200"
              : "bg-[var(--paper-subtle)] border-[var(--line)] text-[var(--ink)]"
          }`}>
            <span className="font-bold block mb-1">
              {isImpossibleState
                ? isDe ? "💥 Warum dieser Zustand kollabiert:" : "💥 为什么这种状态必然爆炸崩溃："
                : isDe ? "⚖️ Der unausweichliche Preis (Das Opfer):" : "⚖️ 必然支付的制度代价（被牺牲的目标）："}
            </span>
            <p>
              {isImpossibleState
                ? isDe
                  ? "Wenn eine Zentralbank versucht, gleichzeitig den Wechselkurs festzuhalten, die Zinsen autonom zu senken und Kapital frei fließen zu lassen, arbitragefähige Händler leihen sich die billige Währung und stoßen sie auf dem Devisenmarkt ab. Die Notenbank muss Devisenreserven verkaufen, bis diese erschöpft sind – danach bricht die Währung schlagartig ein!"
                  : "若央行既想钉住汇率、又想自主降息刺激经济，同时还允许资本自由进出，国际套利资本必然会在本国低息借款后无情抛售本币并出境！央行只能被迫抛洒外汇储备干预汇市，一旦储备见底，固定汇率防线瞬间被击穿造成毁灭性贬值（1992索罗斯英镑案原貌）！"
                : goalGeldpolitik && goalKapital
                ? isDe
                  ? "Opfer: Der Wechselkurs schwankt frei am Devisenmarkt. Exporteure und Importeure tragen Währungsrisiken (Hedging erforderlich). Deutschland profitiert innerhalb der Eurozone, trägt aber das Dollar-Wechselkursrisiko."
                  : "牺牲目标：汇率由外汇市场供求自由浮动。进出口贸易商必须自担汇率波动风险并购买套期保值金融衍生品。"
                : goalKapital && goalWechselkurs
                ? isDe
                  ? "Opfer: Vollständige Aufgabe der nationalen Zinspolitik. Die Zinsen werden extern bestimmt (z. B. diktiert die EZB den Zins für ganz Europa; Griechenland konnte in der Schuldenkrise nicht abwerten oder autonom Zinsen senken)."
                  : "牺牲目标：彻底丧失本国利率自主权与印钞权。基准利率由外部强行决定（例如欧债危机中希腊因身处欧元区无法通过自主货币贬值自救）。"
                : isDe
                ? "Opfer: Der freie internationale Kapitalverkehr wird unterbunden. Bürokratische Devisenverkehrskontrollen schränken internationale Investitionen ein und führen zu Schwarzmärkten."
                : "牺牲目标：扼杀资本完全自由流动。必须设置繁复严密的资本管制外汇审查，阻碍跨国投资并容易滋生黑市地下套利。"}
            </p>
          </div>

          {/* 1992 索罗斯黑色星期三推演沙盘 */}
          <div className="p-3 rounded-lg bg-[var(--paper-subtle)]/50 border border-[var(--line)] text-xs flex flex-col gap-2">
            <span className="font-bold text-amber-700 dark:text-amber-300">
              {isDe ? "🕵️ Historischer Stresstest: Schwarzer Mittwoch (16. Sept 1992)" : "🕵️ 历史极限推演：1992 黑色星期三索罗斯阻击英镑"}
            </span>
            <p className="text-[var(--ink)] leading-relaxed">
              {isDe
                ? "Großbritannien war im EWS an die D-Mark gebunden (fester Wechselkurs) und hatte freien Kapitalverkehr. Wegen einer Rezession wollte London die Zinsen senken, doch die Bundesbank hielt ihre Zinsen inflationsbedingt extrem hoch. George Soros wettete 10 Mrd. Dollar gegen das Pfund."
                : "英国当时加入了欧洲汇率机制（ERM），英镑钉住德国马克（固定汇率），资本自由流动。面对国内严重衰退，伦敦急需降息救市，但德国央行因统一后的通胀压力坚持维持极高利率。索罗斯看准英国无法承受持续加息维稳的死穴，动用百亿美元做空英镑。"}
            </p>
            <div className="pt-2">
              <div className="flex justify-between text-[11px] mb-1">
                <span>{isDe ? "Spekulativer Druck (Wettvolumen):" : "做空资本冲击抛售烈度："}</span>
                <span className="font-mono text-red-600 font-bold">{shockSeverity * 200} Mio. £ / Stunde</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={shockSeverity}
                onChange={(e) => setShockSeverity(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>
          </div>

          {/* 会考高分答题点拨 */}
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-200 text-xs">
            <span className="font-bold block mb-1">
              {isDe ? "✍️ SoWi-Klausur Merksatz (EHZ-Kern):" : "✍️ 北威州会考采分高频考点点拨："}
            </span>
            <p className="leading-relaxed">
              {isDe
                ? "„Im internationalen Währungssystem ist es einer Volkswirtschaft strukturell unmöglich, alle drei Ziele des Mundell-Fleming-Trilemmas simultan zu realisieren. Die Wahl des Regimes ist stets eine politische Grundsatzentscheidung über die Priorität von Souveränität, Stabilität oder Marktintegration.“"
                : "‘在国际货币金融体系中，任何主权经济体都绝对无法同时达成蒙代尔三元悖论的全部三个目标。制度的选择本质上是在货币主权、汇率稳定性与跨国资本市场一体化之间的终极政治抉择。’"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
