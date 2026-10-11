import { useState, useEffect, useId } from "react";
import type { Lang } from "../../../../i18n";

export interface MarktgleichgewichtSimProps {
  lang?: Lang;
  onMissionComplete?: (completed: boolean) => void;
}

/**
 * MarktgleichgewichtSim (2D 供求平衡与价格出清微世界沙盒)
 * 严格承接微观经济学完全竞争市场导学 (SoWi Inhaltsfeld 2)
 *
 * 挑战情境：极端寒潮冲击捕捞成本（供给侧负向成本冲击）
 * 目标：将生产成本滑块调节至 +50% 靶心区间 (48% ~ 52%)
 * 观察：P* 从 10 € 自发攀升至 14 €，Q* 从 500 kg 降至 300 kg
 * 设计哲学：Tufte 纯黑白学术纸墨风，一屏零滚动（Zero-Scroll Layout），严禁幽灵状态与剧透
 */
export function MarktgleichgewichtSim({
  lang = "zh",
  onMissionComplete,
}: MarktgleichgewichtSimProps) {
  const de = lang === "de";
  const sliderId = useId();

  // 生产成本冲击百分比 (0% ~ 100%)
  const [costPercent, setCostPercent] = useState<number>(0);

  // 严格绑定当前滑块位置：48% ~ 52% 靶心区间为达成状态
  const isTargetAchieved = costPercent >= 48 && costPercent <= 52;

  // 动态联动外部门控：滑入靶心解锁下一步，滑出靶心锁定下一步
  useEffect(() => {
    onMissionComplete?.(isTargetAchieved);
  }, [isTargetAchieved, onMissionComplete]);

  // 数理推导模型:
  // 需求曲线: P = 20 - 0.02 * Q
  // 供给曲线: P = 0.02 * Q + costShift (costShift = (costPercent / 50) * 8 €)
  const costShift = (costPercent / 50) * 8;
  const eqQ = Math.max(50, Math.min(550, 500 - 25 * costShift));
  const eqP = Math.max(10, Math.min(19, 10 + 0.5 * costShift));

  // 紧凑 SVG 坐标转换 (宽高 460 x 210，紧凑无滚动)
  const svgWidth = 460;
  const svgHeight = 210;
  const margin = { top: 22, right: 30, bottom: 32, left: 45 };

  const toSvgX = (q: number) => {
    return margin.left + (q / 600) * (svgWidth - margin.left - margin.right);
  };

  const toSvgY = (p: number) => {
    return svgHeight - margin.bottom - (p / 20) * (svgHeight - margin.top - margin.bottom);
  };

  // 均衡点坐标
  const eqSvgX = toSvgX(eqQ);
  const eqSvgY = toSvgY(eqP);

  // 需求曲线 D: (20, 19.6) 到 (580, 8.4)
  const dX1 = toSvgX(20);
  const dY1 = toSvgY(19.6);
  const dX2 = toSvgX(580);
  const dY2 = toSvgY(8.4);

  // 初始基准供给曲线 S0 (0% 时): (40, 0.8) 到 (580, 11.6)
  const s0X1 = toSvgX(40);
  const s0Y1 = toSvgY(0.8);
  const s0X2 = toSvgX(580);
  const s0Y2 = toSvgY(11.6);

  // 当前位移供给曲线 S': 向上平移 costShift
  const sX1 = toSvgX(40);
  const sY1 = toSvgY(0.8 + costShift);
  const sX2 = toSvgX(580);
  const sY2 = toSvgY(11.6 + costShift);

  return (
    <div
      data-testid="marktgleichgewicht-sim"
      className="border border-[var(--line)] bg-[var(--paper)] p-3 sm:p-4 text-[var(--ink)] flex flex-col gap-3 animate-fadeIn"
    >
      {/* 顶部学术标识与实时状态条 */}
      <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[var(--ink)] text-[var(--paper)]">
            {de ? "Mikroökonomie · Markt-Labor" : "微观经济学 · 供求平衡实验"}
          </span>
          <span className="text-[11px] text-[var(--ink-muted)]">
            {de ? "Preismechanismus & Markträumung" : "价格机制、供求交叉与自发出清"}
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[var(--ink-muted)]">
            {de ? "Status:" : "当前状态:"}
          </span>
          <span
            className={`px-2 py-0.5 border font-bold ${
              isTargetAchieved
                ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink-muted)]"
            }`}
          >
            {isTargetAchieved
              ? de
                ? "[ Getroffen: Ziel 100% ]"
                : "[ 已命中: 达成目标 100% ]"
              : de
              ? "[ Offen: Zielbereich suchen ]"
              : "[ 待探究: 寻找目标区间 ]"}
          </span>
        </div>
      </div>

      {/* 核心双栏工作台 (左 38% 单一任务观察卡，右 62% 坐标沙盒与控制器) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
        {/* 左栏: 单一整合任务卡 (彻底消除框套框) */}
        <div className="lg:col-span-5 border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 flex flex-col justify-between gap-3 text-xs font-mono leading-relaxed">
          {/* 上半部分：任务情境与操作指引 */}
          <div className="space-y-2">
            <div className="font-bold text-xs sm:text-sm text-[var(--ink)] border-b border-[var(--line)] pb-1">
              {de
                ? "[ Labor-Mission: Kältewelle & Kostenschock ]"
                : "[ 挑战使命 ] 寒潮爆发与成本冲击"}
            </div>
            <p className="font-serif text-[11px] sm:text-xs text-[var(--ink)] leading-relaxed">
              {de
                ? "Aufgrund einer extremen Kältewelle verdoppeln sich die Ausfahrtskosten der Fangflotte. Dies erzeugt einen angebotsseitigen Kostenschock auf dem Markt für Lachs."
                : "由于海面极端寒潮爆发，捕鱼船出海燃油与设备维修成本暴涨，整个大西洋三文鱼市场的供给端受到严重负向冲击。"}
            </p>
            <div className="pt-0.5 text-[11px] font-sans">
              <span className="font-bold text-[var(--ink)]">
                {de ? "[ Aufgabe ] " : "[ 操作指令 ] "}
              </span>
              <span className="text-[var(--ink)]">
                {de
                  ? "Verschiebe den Schieberegler rechts auf die Zielmarke von +50%."
                  : "将右侧【生产成本】滑块平移至 +50% 靶心区间。"}
              </span>
            </div>

            <div className="pt-1 border-t border-[var(--line)] space-y-1">
              <div className="font-bold text-[10px] text-[var(--ink)]">
                {de ? "[ Fokus ] Beobachtungs-Kriterien:" : "[ 观察指标 ]"}
              </div>
              <ol className="list-decimal pl-4 space-y-0.5 text-[10px] text-[var(--ink)] font-serif">
                <li>
                  {de
                    ? "Wie verschiebt sich die Angebotskurve S?"
                    : "供给曲线 S 如何发生位移？"}
                </li>
                <li>
                  {de
                    ? "Wie steuert der Preismechanismus P* und Q* ohne Eingriff?"
                    : "市场均衡价格 P* 与成交量 Q* 如何自发调整？"}
                </li>
              </ol>
            </div>
          </div>

          {/* 下半部分：达成状态与原理解析 (未达成隐藏结论，达成动态展现) */}
          <div className="border-t border-[var(--line)] pt-2.5">
            {!isTargetAchieved ? (
              <div className="p-2 border border-dashed border-[var(--line)] bg-[var(--paper)] space-y-1">
                <div className="flex items-center justify-between font-bold text-[11px]">
                  <span className="text-[var(--ink-muted)]">
                    {de ? "[ Noch offen ]" : "[ 待完成 ]"}
                  </span>
                  <span className="text-[var(--ink-muted)]">
                    {de
                      ? `Soll: +50% | Ist: +${costPercent}%`
                      : `目标: +50% | 当前: +${costPercent}%`}
                  </span>
                </div>
                <p className="text-[10px] font-serif text-[var(--ink-muted)] leading-relaxed">
                  {de
                    ? "Bediene den Schieberegler rechts auf +50% (48%~52%), um die Auswirkung auf P* und Q* freizuschalten."
                    : "请在右侧拖动滑块至 +50% 靶心刻度，亲眼见证价格自发调节供求的微观动力学。"}
                </p>
              </div>
            ) : (
              <div className="p-2.5 border-2 border-[var(--ink)] bg-[var(--paper)] space-y-1.5 animate-fadeIn">
                <div className="flex items-center justify-between font-bold text-[11px]">
                  <span className="text-[var(--ink)]">
                    {de ? "[ Ziel erreicht! ]" : "[ 达成 ] 探究目标圆满达成！"}
                  </span>
                  <span className="text-[10px] text-[var(--ink-muted)]">
                    {de ? `Ist: +${costPercent}%` : `当前位移: +${costPercent}%`}
                  </span>
                </div>
                <p className="font-serif text-[11px] text-[var(--ink)] leading-relaxed">
                  {de
                    ? "Erkenntnis: Der Kostenschock verschiebt die Angebotskurve S nach links-oben. Ohne staatliche Zuteilung steigt der Gleichgewichtspreis auf 14 € und die Menge sinkt auf 300 kg (Signal- & Allokationsfunktion)!"
                    : "核心规律验证：成本上升驱动 S 左移。在无行政命令干预下，价格机制自发将均衡价推高至 14 €，成交量收缩至 300 kg，完全出清市场（Signal- & Allokationsfunktion）！"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 右栏: 紧凑 2D 坐标图与控制台 */}
        <div className="lg:col-span-7 border border-[var(--line)] bg-[var(--paper)] p-2.5 sm:p-3 flex flex-col gap-2.5">
          {/* 坐标图顶部状态 */}
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5 text-[10px] font-mono">
            <span className="font-bold text-[var(--ink)]">
              {de ? "2D-Marktgleichgewicht (P-Q-Diagramm)" : "2D 供求平衡动态坐标系"}
            </span>
            <span
              className={
                isTargetAchieved
                  ? "font-bold text-[var(--ink)]"
                  : "text-[var(--ink-muted)]"
              }
            >
              {isTargetAchieved
                ? `[ ■ ${de ? "Neues Marktgleichgewicht erreicht" : "目标出清点达成"} ]`
                : `[ ○ ${de ? "Gleichgewichtspfad dynamisch" : "动态均衡演化中"} ]`}
            </span>
          </div>

          {/* 紧凑纯 SVG 供求曲线 */}
          <div className="w-full flex justify-center py-0.5">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full max-w-lg h-auto text-[var(--ink)]"
              style={{
                transformOrigin: "230px 105px",
                transformBox: "view-box",
              }}
              aria-label="2D Marktgleichgewicht Simulation"
            >
              {/* 坐标轴线 */}
              <line
                x1={margin.left}
                y1={svgHeight - margin.bottom}
                x2={svgWidth - margin.right}
                y2={svgHeight - margin.bottom}
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1={margin.left}
                y1={svgHeight - margin.bottom}
                x2={margin.left}
                y2={margin.top}
                stroke="currentColor"
                strokeWidth="1.5"
              />

              {/* 轴箭头 */}
              <polygon
                points={`${svgWidth - margin.right},${svgHeight - margin.bottom - 3} ${svgWidth - margin.right + 7},${svgHeight - margin.bottom} ${svgWidth - margin.right},${svgHeight - margin.bottom + 3}`}
                fill="currentColor"
              />
              <polygon
                points={`${margin.left - 3},${margin.top} ${margin.left},${margin.top - 7} ${margin.left + 3},${margin.top}`}
                fill="currentColor"
              />

              {/* 轴标签 */}
              <text
                x={margin.left - 32}
                y={margin.top - 4}
                fontSize="10"
                fontFamily="serif"
                fontWeight="bold"
                fill="currentColor"
              >
                P (€)
              </text>
              <text
                x={svgWidth - margin.right - 15}
                y={svgHeight - margin.bottom + 18}
                fontSize="10"
                fontFamily="serif"
                fontWeight="bold"
                fill="currentColor"
              >
                Q (kg)
              </text>

              {/* 价格基准刻度 10 € 与 14 € */}
              <line
                x1={margin.left - 3}
                y1={toSvgY(10)}
                x2={margin.left}
                y2={toSvgY(10)}
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x={margin.left - 28}
                y={toSvgY(10) + 3}
                fontSize="9"
                fontFamily="monospace"
                fontWeight={costPercent === 0 ? "bold" : "normal"}
                fill="currentColor"
              >
                10 €
              </text>

              <line
                x1={margin.left - 3}
                y1={toSvgY(14)}
                x2={margin.left}
                y2={toSvgY(14)}
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x={margin.left - 28}
                y={toSvgY(14) + 3}
                fontSize="9"
                fontFamily="monospace"
                fontWeight={isTargetAchieved ? "bold" : "normal"}
                fill="currentColor"
              >
                14 €
              </text>

              {/* 动态价格投影刻度 (当偏离基准刻度时实时渲染) */}
              {Math.abs(eqP - 10) > 0.8 && Math.abs(eqP - 14) > 0.8 && (
                <>
                  <line
                    x1={margin.left - 4}
                    y1={eqSvgY}
                    x2={margin.left}
                    y2={eqSvgY}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text
                    x={margin.left - 32}
                    y={eqSvgY + 3}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="currentColor"
                  >
                    {eqP.toFixed(1)}€
                  </text>
                </>
              )}

              {/* 数量基准刻度 300 与 500 */}
              <line
                x1={toSvgX(300)}
                y1={svgHeight - margin.bottom}
                x2={toSvgX(300)}
                y2={svgHeight - margin.bottom + 3}
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x={toSvgX(300) - 8}
                y={svgHeight - margin.bottom + 14}
                fontSize="9"
                fontFamily="monospace"
                fontWeight={isTargetAchieved ? "bold" : "normal"}
                fill="currentColor"
              >
                300
              </text>

              <line
                x1={toSvgX(500)}
                y1={svgHeight - margin.bottom}
                x2={toSvgX(500)}
                y2={svgHeight - margin.bottom + 3}
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text
                x={toSvgX(500) - 8}
                y={svgHeight - margin.bottom + 14}
                fontSize="9"
                fontFamily="monospace"
                fontWeight={costPercent === 0 ? "bold" : "normal"}
                fill="currentColor"
              >
                500
              </text>

              {/* 动态数量投影刻度 (当偏离基准刻度时实时渲染) */}
              {Math.abs(eqQ - 300) > 25 && Math.abs(eqQ - 500) > 25 && (
                <>
                  <line
                    x1={eqSvgX}
                    y1={svgHeight - margin.bottom}
                    x2={eqSvgX}
                    y2={svgHeight - margin.bottom + 4}
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <text
                    x={eqSvgX - 10}
                    y={svgHeight - margin.bottom + 14}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="currentColor"
                  >
                    {Math.round(eqQ)}
                  </text>
                </>
              )}

              {/* 需求曲线 D */}
              <line
                x1={dX1}
                y1={dY1}
                x2={dX2}
                y2={dY2}
                stroke="currentColor"
                strokeWidth="2"
                style={{
                  transformOrigin: `${(dX1 + dX2) / 2}px ${(dY1 + dY2) / 2}px`,
                  transformBox: "view-box",
                }}
              />
              <text
                x={dX2 - 60}
                y={dY2 + 13}
                fontSize="10"
                fontFamily="sans-serif"
                fontWeight="bold"
                fill="currentColor"
              >
                Nachfrage D
              </text>

              {/* 初始供给曲线 S0 (基准虚线) */}
              <line
                x1={s0X1}
                y1={s0Y1}
                x2={s0X2}
                y2={s0Y2}
                stroke="currentColor"
                strokeWidth="1.2"
                strokeDasharray="4,3"
                opacity={costPercent > 5 ? 0.35 : 0.8}
                style={{
                  transformOrigin: `${(s0X1 + s0X2) / 2}px ${(s0Y1 + s0Y2) / 2}px`,
                  transformBox: "view-box",
                }}
              />
              <text
                x={s0X2 - 45}
                y={s0Y2 - 5}
                fontSize="9"
                fontFamily="monospace"
                fill="currentColor"
                opacity={costPercent > 5 ? 0.45 : 0.9}
              >
                S (Basis)
              </text>

              {/* 当前位移供给曲线 S' */}
              {costPercent > 0 && (
                <>
                  <line
                    x1={sX1}
                    y1={sY1}
                    x2={sX2}
                    y2={sY2}
                    stroke="currentColor"
                    strokeWidth={isTargetAchieved ? "2.5" : "2"}
                    style={{
                      transformOrigin: `${(sX1 + sX2) / 2}px ${(sY1 + sY2) / 2}px`,
                      transformBox: "view-box",
                    }}
                  />
                  <text
                    x={sX2 - 50}
                    y={sY2 - 5}
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                    fill="currentColor"
                  >
                    S' (Kosten)
                  </text>
                </>
              )}

              {/* 均衡点水平和垂直虚线投影 */}
              <line
                x1={margin.left}
                y1={eqSvgY}
                x2={eqSvgX}
                y2={eqSvgY}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3,3"
                opacity="0.6"
              />
              <line
                x1={eqSvgX}
                y1={svgHeight - margin.bottom}
                x2={eqSvgX}
                y2={eqSvgY}
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3,3"
                opacity="0.6"
              />

              {/* 均衡交点圆点 G* */}
              <circle
                cx={eqSvgX}
                cy={eqSvgY}
                r={isTargetAchieved ? "5.5" : "4.5"}
                fill="currentColor"
                style={{
                  transformOrigin: `${eqSvgX}px ${eqSvgY}px`,
                  transformBox: "view-box",
                }}
              />
              {isTargetAchieved && (
                <circle
                  cx={eqSvgX}
                  cy={eqSvgY}
                  r="9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="2,2"
                  style={{
                    transformOrigin: `${eqSvgX}px ${eqSvgY}px`,
                    transformBox: "view-box",
                  }}
                />
              )}
              <text
                x={eqSvgX + 8}
                y={eqP >= 16 ? eqSvgY + 14 : eqSvgY - 7}
                fontSize="9"
                fontFamily="monospace"
                fontWeight="bold"
                fill="currentColor"
              >
                {isTargetAchieved
                  ? "G*' (14€, 300kg)"
                  : `G* (${eqP.toFixed(1)}€, ${Math.round(eqQ)}kg)`}
              </text>
            </svg>
          </div>

          {/* 实时出清状态栏 (Compact Metric Bar) */}
          <div className="grid grid-cols-3 gap-2 p-2 border border-[var(--line)] bg-[var(--paper-subtle)] text-center font-mono text-xs">
            <div>
              <span className="text-[10px] text-[var(--ink-muted)] block uppercase">
                {de ? "Gleichgewichtspreis P*" : "均衡价格 P*"}
              </span>
              <span className="font-bold text-xs sm:text-sm">
                {eqP.toFixed(1)} €
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--ink-muted)] block uppercase">
                {de ? "Gleichgewichtsmenge Q*" : "出清数量 Q*"}
              </span>
              <span className="font-bold text-xs sm:text-sm">
                {Math.round(eqQ)} kg
              </span>
            </div>
            <div>
              <span className="text-[10px] text-[var(--ink-muted)] block uppercase">
                {de ? "Preisfunktion" : "价格职能"}
              </span>
              <span className="font-bold text-[11px]">
                {costPercent === 0
                  ? de
                    ? "Basis-Räumung (Markträumung)"
                    : "基础出清状态 (Markträumung)"
                  : isTargetAchieved
                  ? de
                    ? "Signal & Rationierung (Ziel erreicht)"
                    : "稀缺信号与需求配给 (目标靶心达成)"
                  : de
                  ? "Signal & Rationierung (Kostenanstieg)"
                  : "稀缺信号与需求配给 (Signalfunktion & Rationierung)"}
              </span>
            </div>
          </div>

          {/* 核心调控拉杆 (紧临数据栏，绝不截断) */}
          <div className="p-2 sm:p-2.5 border border-[var(--line)] bg-[var(--paper-subtle)] flex flex-col gap-1.5 font-mono text-xs">
            <div className="flex items-center justify-between">
              <label htmlFor={sliderId} className="font-bold text-[11px] text-[var(--ink)]">
                {de
                  ? "Produktionskosten / Angebotsverschiebung (S):"
                  : "生产成本 / 供给位移 (S):"}
              </label>
              <span className="px-1.5 py-0.5 border border-[var(--ink)] bg-[var(--paper)] font-bold text-xs">
                +{costPercent}%
              </span>
            </div>

            {/* 滑块 */}
            <div className="space-y-0.5">
              <input
                id={sliderId}
                type="range"
                min="0"
                max="100"
                step="1"
                value={costPercent}
                onChange={(e) => setCostPercent(Number(e.target.value))}
                className="w-full accent-[var(--ink)] cursor-pointer"
                aria-label="Produktionskosten Schieberegler"
              />
              <div className="flex justify-between text-[10px] font-mono text-[var(--ink-muted)]">
                <span>0% ({de ? "Basis" : "基准"})</span>
                <span
                  className={
                    isTargetAchieved
                      ? "font-bold text-[var(--ink)] underline"
                      : ""
                  }
                >
                  [ {de ? "Ziel" : "目标"}: +50% ]
                </span>
                <span>+100% ({de ? "Extrem" : "极限"})</span>
              </div>
            </div>

            {/* 快捷预设按钮组 */}
            <div className="flex items-center gap-2 pt-1 border-t border-[var(--line)]">
              <span className="text-[10px] font-mono text-[var(--ink-muted)]">
                {de ? "Voreinstellungen:" : "快捷场景:"}
              </span>
              <button
                type="button"
                onClick={() => setCostPercent(0)}
                className="px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[10px] font-mono transition-colors cursor-pointer"
              >
                [ 0% {de ? "Basis" : "基准"} ]
              </button>
              <button
                type="button"
                onClick={() => setCostPercent(50)}
                className={`px-2 py-0.5 border text-[10px] font-mono transition-colors cursor-pointer font-bold ${
                  isTargetAchieved
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)]"
                    : "border-[var(--ink)] bg-[var(--paper)] hover:bg-[var(--paper-subtle)]"
                }`}
              >
                [ +50% {de ? "Kältewelle" : "寒潮目标"} ]
              </button>
              <button
                type="button"
                onClick={() => setCostPercent(100)}
                className="px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[10px] font-mono transition-colors cursor-pointer"
              >
                [ +100% {de ? "Extrem" : "极限"} ]
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
