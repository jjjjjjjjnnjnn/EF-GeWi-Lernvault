import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";

export interface MarktMechanismusSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onFormulaGenerated?: (sentence: string) => void;
}

export function MarktMechanismusSim({
  lang = "zh",
  onFormulaGenerated,
}: MarktMechanismusSimProps) {
  const de = lang === "de";

  // 1. 供求曲线位移参数 (Shift)
  const [demandShift, setDemandShift] = useState<number>(0); // -25 to +25
  const [supplyShift, setSupplyShift] = useState<number>(0); // -25 to +25

  // 2. 价格管制模式: free (自由市场) | mindestpreis (最低限价) | hoechstpreis (最高限价)
  const [priceControlMode, setPriceControlMode] = useState<"free" | "mindestpreis" | "hoechstpreis">("free");
  const [controlPrice, setControlPrice] = useState<number>(65);

  // 3. 利益攸关方视点选项卡 (AFB III 评析)
  const [activeTab, setActiveTab] = useState<"wohlfahrt" | "anbieter" | "nachfrager">("wohlfahrt");
  const [copied, setCopied] = useState<boolean>(false);

  // 线性供求数学模型:
  // 需求曲线: P = (100 + demandShift) - Q  =>  Q_d = (100 + demandShift) - P
  // 供给曲线: P = (20 + supplyShift) + Q   =>  Q_s = P - (20 + supplyShift)
  const dBase = 100 + demandShift;
  const sBase = 20 + supplyShift;

  // 市场自发均衡点 G*(Q*, P*):
  // (dBase) - Q = (sBase) + Q  =>  2Q = dBase - sBase  =>  Q* = (dBase - sBase) / 2
  const eqQ = Math.max(5, Math.min(95, (dBase - sBase) / 2));
  const eqP = Math.max(10, Math.min(90, dBase - eqQ));

  // 有效价格与成交量
  const effectivePrice = priceControlMode === "free" ? eqP : controlPrice;
  const qDemanded = Math.max(0, Math.min(100, dBase - effectivePrice));
  const qSupplied = Math.max(0, Math.min(100, effectivePrice - sBase));
  const transactedQ = Math.min(qDemanded, qSupplied);

  // 市场非均衡状态判定
  const isIntervention = priceControlMode !== "free" && Math.abs(effectivePrice - eqP) >= 0.5;
  const isAngebotsueberhang = isIntervention && qSupplied > qDemanded;

  // 供给曲线与需求曲线在成交量 transactedQ 处的对应价格
  const pSupplyAtTransacted = sBase + transactedQ;
  const pDemandAtTransacted = dBase - transactedQ;

  // ==========================================
  // 福利经济学几何剖析 (Wohlfahrtsgeometrie)
  // ==========================================
  // CS: 消费者剩余 (Konsumentenrente)
  // PS: 生产者剩余 (Produzentenrente)
  // DWL: 社会总福利死重损失 (Deadweight Loss / Wohlfahrtsverlust)
  const welfare = useMemo(() => {
    if (!isIntervention) {
      // 自由市场均衡: 无无谓损失，社会总福利最大化
      const cs = Math.round(0.5 * (dBase - eqP) * eqQ);
      const ps = Math.round(0.5 * (eqP - sBase) * eqQ);
      return { cs, ps, total: cs + ps, dwl: 0 };
    }

    if (priceControlMode === "mindestpreis") {
      // 最低限价 (P_min > P*):
      // 消费者剩余缩水为上方小三角: 0.5 * (dBase - P_min) * Q_trans
      const cs = Math.round(0.5 * Math.max(0, dBase - effectivePrice) * transactedQ);
      // 生产者剩余为下方面积: (P_min - P_supp) * Q_trans + 0.5 * (P_supp - sBase) * Q_trans
      const ps = Math.round(
        Math.max(0, effectivePrice - pSupplyAtTransacted) * transactedQ +
          0.5 * Math.max(0, pSupplyAtTransacted - sBase) * transactedQ
      );
      // 死重损失 (DWL): 0.5 * (P_min - P_supp) * (Q* - Q_trans)
      const dwl = Math.round(
        0.5 * Math.max(0, effectivePrice - pSupplyAtTransacted) * Math.max(0, eqQ - transactedQ)
      );
      return { cs, ps, total: cs + ps, dwl };
    }

    // 最高限价 (P_max < P*):
    // 生产者剩余缩水为下方小三角: 0.5 * (P_max - sBase) * Q_trans
    const ps = Math.round(0.5 * Math.max(0, effectivePrice - sBase) * transactedQ);
    // 消费者剩余为上方面积: (P_dem - P_max) * Q_trans + 0.5 * (dBase - P_dem) * Q_trans
    const cs = Math.round(
      Math.max(0, pDemandAtTransacted - effectivePrice) * transactedQ +
        0.5 * Math.max(0, dBase - pDemandAtTransacted) * transactedQ
    );
    // 死重损失 (DWL): 0.5 * (P_dem - P_max) * (Q* - Q_trans)
    const dwl = Math.round(
      0.5 * Math.max(0, pDemandAtTransacted - effectivePrice) * Math.max(0, eqQ - transactedQ)
    );
    return { cs, ps, total: cs + ps, dwl };
  }, [
    isIntervention,
    priceControlMode,
    dBase,
    sBase,
    eqP,
    eqQ,
    effectivePrice,
    transactedQ,
    pSupplyAtTransacted,
    pDemandAtTransacted,
  ]);

  // SVG 坐标系几何变换 (420 x 260)
  const svgWidth = 420;
  const svgHeight = 260;
  const margin = { top: 25, right: 35, bottom: 40, left: 45 };

  const toSvgX = (q: number) => {
    return margin.left + (q / 100) * (svgWidth - margin.left - margin.right);
  };

  const toSvgY = (p: number) => {
    return svgHeight - margin.bottom - (p / 100) * (svgHeight - margin.top - margin.bottom);
  };

  // 供需线路径 (从 Q=-5 到 Q=105 保持真实斜率 +-1)
  const demandPath = `M ${toSvgX(-5)} ${toSvgY(dBase - -5)} L ${toSvgX(105)} ${toSvgY(dBase - 105)}`;
  const supplyPath = `M ${toSvgX(-5)} ${toSvgY(sBase + -5)} L ${toSvgX(105)} ${toSvgY(sBase + 105)}`;

  // 几何多边形顶点计算
  // 1. 消费者剩余 CS 区域
  const csPolygonPoints = useMemo(() => {
    if (!isIntervention) {
      // 三角形: (0, dBase) -> (0, eqP) -> (eqQ, eqP)
      return `${toSvgX(0)},${toSvgY(dBase)} ${toSvgX(0)},${toSvgY(eqP)} ${toSvgX(eqQ)},${toSvgY(eqP)}`;
    }
    if (priceControlMode === "mindestpreis") {
      // 三角形: (0, dBase) -> (0, effectivePrice) -> (transactedQ, effectivePrice)
      return `${toSvgX(0)},${toSvgY(dBase)} ${toSvgX(0)},${toSvgY(effectivePrice)} ${toSvgX(transactedQ)},${toSvgY(effectivePrice)}`;
    }
    // 最高限价: 梯形 (0, dBase) -> (0, effectivePrice) -> (transactedQ, effectivePrice) -> (transactedQ, pDemandAtTransacted)
    return `${toSvgX(0)},${toSvgY(dBase)} ${toSvgX(0)},${toSvgY(effectivePrice)} ${toSvgX(transactedQ)},${toSvgY(effectivePrice)} ${toSvgX(transactedQ)},${toSvgY(pDemandAtTransacted)}`;
  }, [isIntervention, priceControlMode, dBase, eqP, eqQ, effectivePrice, transactedQ, pDemandAtTransacted]);

  // 2. 生产者剩余 PS 区域
  const psPolygonPoints = useMemo(() => {
    if (!isIntervention) {
      // 三角形: (0, sBase) -> (0, eqP) -> (eqQ, eqP)
      return `${toSvgX(0)},${toSvgY(sBase)} ${toSvgX(0)},${toSvgY(eqP)} ${toSvgX(eqQ)},${toSvgY(eqP)}`;
    }
    if (priceControlMode === "mindestpreis") {
      // 最低限价: 梯形 (0, sBase) -> (0, effectivePrice) -> (transactedQ, effectivePrice) -> (transactedQ, pSupplyAtTransacted)
      return `${toSvgX(0)},${toSvgY(sBase)} ${toSvgX(0)},${toSvgY(effectivePrice)} ${toSvgX(transactedQ)},${toSvgY(effectivePrice)} ${toSvgX(transactedQ)},${toSvgY(pSupplyAtTransacted)}`;
    }
    // 最高限价: 三角形 (0, sBase) -> (0, effectivePrice) -> (transactedQ, effectivePrice)
    return `${toSvgX(0)},${toSvgY(sBase)} ${toSvgX(0)},${toSvgY(effectivePrice)} ${toSvgX(transactedQ)},${toSvgY(effectivePrice)}`;
  }, [isIntervention, priceControlMode, sBase, eqP, eqQ, effectivePrice, transactedQ, pSupplyAtTransacted]);

  // 3. 死重损失 DWL 区域 (透光三角)
  const dwlPolygonPoints = useMemo(() => {
    if (!isIntervention || welfare.dwl <= 0) return "";
    if (priceControlMode === "mindestpreis") {
      // 顶点: (transactedQ, effectivePrice) -> (eqQ, eqP) -> (transactedQ, pSupplyAtTransacted)
      return `${toSvgX(transactedQ)},${toSvgY(effectivePrice)} ${toSvgX(eqQ)},${toSvgY(eqP)} ${toSvgX(transactedQ)},${toSvgY(pSupplyAtTransacted)}`;
    }
    // 最高限价: (transactedQ, pDemandAtTransacted) -> (eqQ, eqP) -> (transactedQ, effectivePrice)
    return `${toSvgX(transactedQ)},${toSvgY(pDemandAtTransacted)} ${toSvgX(eqQ)},${toSvgY(eqP)} ${toSvgX(transactedQ)},${toSvgY(effectivePrice)}`;
  }, [isIntervention, welfare.dwl, priceControlMode, transactedQ, effectivePrice, eqQ, eqP, pSupplyAtTransacted, pDemandAtTransacted]);

  // 考场评分标准核心陈述句 (Klausursatz)
  const klausursatz = useMemo(() => {
    if (!isIntervention) {
      return de
        ? `Im freien Markt bildet sich das Marktgleichgewicht bei p* = ${eqP.toFixed(1)} GE und q* = ${eqQ.toFixed(1)} ME. Die Summe aus Konsumentenrente (${welfare.cs} GE) und Produzentenrente (${welfare.ps} GE) maximiert die gesellschaftliche Gesamtwohlfahrt (${welfare.total} GE; DWL = 0).`
        : `在自由价格机制下，供求自发在 p* = ${eqP.toFixed(1)} 与 q* = ${eqQ.toFixed(1)} 达成出清。消费者剩余（${welfare.cs} GE）与生产者剩余（${welfare.ps} GE）之和使社会总福利达到帕累托最优最大值（${welfare.total} GE，无谓损失 DWL = 0）。`;
    }

    if (priceControlMode === "mindestpreis") {
      const ueberhang = (qSupplied - qDemanded).toFixed(0);
      return de
        ? `Ein staatlicher Mindestpreis (p = ${controlPrice} > ${eqP.toFixed(1)} GE) schützt Anbieter, erzeugt jedoch einen Angebotsüberhang von ${ueberhang} ME. Durch die Kontraktion der Nachfrage auf ${transactedQ.toFixed(0)} ME entsteht ein Wohlfahrtsverlust (Deadweight Loss) von ${welfare.dwl} GE.`
        : `高于均衡水平的法定最低限价（P_min = ${controlPrice} > ${eqP.toFixed(1)}）旨在保护生产者，但诱发了 ${ueberhang} 单位的供给过剩（Angebotsüberhang）。成交量萎缩至 ${transactedQ.toFixed(0)}，造成社会总福利净死重损失（DWL = ${welfare.dwl} GE）。`;
    }

    const mangel = (qDemanded - qSupplied).toFixed(0);
    return de
      ? `Ein gesetzlicher Höchstpreis (p = ${controlPrice} < ${eqP.toFixed(1)} GE) entlastet Verbraucher, verursacht jedoch einen Nachfrageüberhang (Güterknappheit) von ${mangel} ME. Die Marktallokation wird verzerrt, was zu einem Deadweight Loss von ${welfare.dwl} GE führt.`
      : `低于均衡水平的法定最高限价（P_max = ${controlPrice} < ${eqP.toFixed(1)}）意在平抑物价保护买方，但导致市场出现 ${mangel} 单位的供不应求短缺（Nachfrageüberhang）。配给机制扭曲造成社会福利死重损失（DWL = ${welfare.dwl} GE）。`;
  }, [isIntervention, priceControlMode, eqP, eqQ, controlPrice, qSupplied, qDemanded, transactedQ, welfare, de]);

  const handleCopyOrInsert = () => {
    onFormulaGenerated?.(klausursatz);
    navigator.clipboard?.writeText(klausursatz);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      data-testid="markt-mechanismus-sim"
      className="flex flex-col gap-4 rounded-xl border border-[var(--line)] bg-[var(--paper)] p-4 sm:p-5 font-sans text-[var(--ink)] shadow-xs"
    >
      {/* 1. 顶部学术标头与知识点所属 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded border border-[var(--accent)]/30 bg-[var(--paper-subtle)] px-2 py-0.5 font-mono text-xs font-bold text-[var(--accent)]">
              SoWi EF / Q1 · Inhaltsfeld 1
            </span>
            <span className="font-mono text-xs text-[var(--gray)]">
              {de ? "Allokation & Wohlfahrtsökonomie" : "资源配置、福利几何与政府干预"}
            </span>
          </div>
          <h2 className="mt-1 text-lg font-bold tracking-tight text-[var(--ink)] sm:text-xl">
            {de
              ? "Marktmechanismus, Preisbildung & Wohlfahrtsökonomie"
              : "供求曲线、市场价格机制与福利经济学沙盘"}
          </h2>
        </div>

        {/* 状态徽章 */}
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] px-2.5 py-1 font-mono text-xs font-semibold text-[var(--ink)]">
            {!isIntervention
              ? de ? "⚖️ Markträumung (Optimal)" : "⚖️ 市场出清（帕累托最优）"
              : isAngebotsueberhang
              ? de ? `⚠️ Angebotsüberhang (+${(qSupplied - qDemanded).toFixed(0)})` : `⚠️ 供给过剩 (+${(qSupplied - qDemanded).toFixed(0)})`
              : de ? `❄️ Nachfrageüberhang (+${(qDemanded - qSupplied).toFixed(0)})` : `❄️ 供不应求短缺 (+${(qDemanded - qSupplied).toFixed(0)})`}
          </span>
        </div>
      </div>

      {/* 2. 顶部 4 栏 Tufte KPI 仪表盘 (CS · PS · Total · DWL) */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 font-mono text-center">
        <div className="rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5">
          <span className="text-[10px] text-[var(--gray)] block uppercase tracking-wider">
            {de ? "Effektiver Preis & Menge" : "有效价格 P / 成交量 Q"}
          </span>
          <p className="mt-0.5 text-sm font-bold text-[var(--ink)]">
            {effectivePrice.toFixed(0)} GE · {transactedQ.toFixed(0)} ME
          </p>
        </div>

        <div className="rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5">
          <span className="text-[10px] text-[var(--gray)] block uppercase tracking-wider">
            {de ? "CS Konsumentenrente" : "CS 消费者剩余"}
          </span>
          <p className="mt-0.5 text-sm font-bold text-[var(--ink)]">
            {welfare.cs} GE
          </p>
        </div>

        <div className="rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5">
          <span className="text-[10px] text-[var(--gray)] block uppercase tracking-wider">
            {de ? "PS Produzentenrente" : "PS 生产者剩余"}
          </span>
          <p className="mt-0.5 text-sm font-bold text-[var(--ink)]">
            {welfare.ps} GE
          </p>
        </div>

        <div className="rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-2.5">
          <span className="text-[10px] text-[var(--gray)] block uppercase tracking-wider">
            {de ? "DWL Wohlfahrtsverlust" : "DWL 死重损失 (无谓损失)"}
          </span>
          <p className={`mt-0.5 text-sm font-bold ${welfare.dwl > 0 ? "text-[#dc2626]" : "text-[var(--ink)]"}`}>
            {welfare.dwl > 0 ? `-${welfare.dwl} GE ⚠️` : "0 GE (Optimal)"}
          </p>
        </div>
      </div>

      {/* 3. 核心沙盒：左侧 SVG 几何图谱 (60%) + 右侧控制与推演 (40%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：完整几何透光多边形坐标图 */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center rounded-xl border border-[var(--line)] bg-[var(--surface)] p-3">
          <svg width={svgWidth} height={svgHeight} className="w-full h-auto overflow-visible select-none font-mono">
            <defs>
              <clipPath id="markt-chart-clip-main">
                <rect
                  x={margin.left}
                  y={margin.top}
                  width={svgWidth - margin.left - margin.right}
                  height={svgHeight - margin.top - margin.bottom}
                />
              </clipPath>
            </defs>

            {/* 背景格线 (Grid) */}
            {[25, 50, 75].map((p) => (
              <line
                key={p}
                x1={margin.left}
                y1={toSvgY(p)}
                x2={svgWidth - margin.right}
                y2={toSvgY(p)}
                stroke="var(--line)"
                strokeWidth="0.5"
                strokeDasharray="2 3"
                strokeOpacity="0.5"
              />
            ))}
            {[25, 50, 75].map((q) => (
              <line
                key={q}
                x1={toSvgX(q)}
                y1={toSvgY(0)}
                x2={toSvgX(q)}
                y2={margin.top}
                stroke="var(--line)"
                strokeWidth="0.5"
                strokeDasharray="2 3"
                strokeOpacity="0.5"
              />
            ))}

            {/* 坐标轴 */}
            <line
              x1={margin.left}
              y1={toSvgY(0)}
              x2={svgWidth - margin.right + 15}
              y2={toSvgY(0)}
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <line
              x1={toSvgX(0)}
              y1={toSvgY(0)}
              x2={toSvgX(0)}
              y2={margin.top - 12}
              stroke="var(--ink)"
              strokeWidth="1.5"
            />

            {/* 轴标签 */}
            <text x={svgWidth - margin.right + 18} y={toSvgY(0) + 4} fontSize="10" fill="var(--ink)" fontWeight="bold">
              Q
            </text>
            <text x={toSvgX(0) - 10} y={margin.top - 14} fontSize="10" fill="var(--ink)" fontWeight="bold">
              P
            </text>

            {/* 透光福利几何区域 (CS / PS / DWL) */}
            <g clipPath="url(#markt-chart-clip-main)">
              {/* CS 消费者剩余多边形 */}
              <polygon points={csPolygonPoints} fill="var(--ink)" fillOpacity="0.06" stroke="var(--ink)" strokeWidth="0.8" strokeDasharray="3 3" />
              {/* PS 生产者剩余多边形 */}
              <polygon points={psPolygonPoints} fill="var(--ink)" fillOpacity="0.12" stroke="var(--ink)" strokeWidth="0.8" />
              {/* DWL 死重损失多边形 */}
              {isIntervention && welfare.dwl > 0 && (
                <polygon
                  points={dwlPolygonPoints}
                  fill="#dc2626"
                  fillOpacity="0.18"
                  stroke="#dc2626"
                  strokeWidth="1.2"
                />
              )}

              {/* 需求曲线 D 与 供给曲线 S */}
              <path d={demandPath} fill="none" stroke="var(--ink)" strokeWidth="2.2" />
              <path d={supplyPath} fill="none" stroke="var(--accent)" strokeWidth="2.2" />
            </g>

            {/* 曲线名称标注 */}
            <text
              x={toSvgX(Math.min(92, Math.max(8, dBase - 15)))}
              y={toSvgY(15)}
              fontSize="10"
              fill="var(--ink)"
              fontWeight="bold"
            >
              N (Demand)
            </text>
            <text
              x={toSvgX(Math.min(92, Math.max(8, 88 - sBase)))}
              y={toSvgY(88)}
              fontSize="10"
              fill="var(--accent)"
              fontWeight="bold"
            >
              A (Supply)
            </text>

            {/* 均衡点 G*(Q*, P*) 及正交投影虚线 */}
            <line
              x1={toSvgX(0)}
              y1={toSvgY(eqP)}
              x2={toSvgX(eqQ)}
              y2={toSvgY(eqP)}
              stroke="var(--gray)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <line
              x1={toSvgX(eqQ)}
              y1={toSvgY(0)}
              x2={toSvgX(eqQ)}
              y2={toSvgY(eqP)}
              stroke="var(--gray)"
              strokeWidth="1"
              strokeDasharray="2 2"
            />
            <circle cx={toSvgX(eqQ)} cy={toSvgY(eqP)} r="4" fill="var(--ink)" stroke="var(--paper)" strokeWidth="1.5" />
            <text
              x={toSvgX(eqQ) + 6}
              y={toSvgY(eqP) - 6}
              fontSize="9"
              fontWeight="bold"
              fill="var(--ink)"
            >
              G* ({eqQ.toFixed(0)}|{eqP.toFixed(0)})
            </text>

            {/* 若存在价格干预：绘制干预价格横线与成交量垂线 */}
            {isIntervention && (
              <>
                {/* 干预红虚线 */}
                <line
                  x1={toSvgX(0)}
                  y1={toSvgY(effectivePrice)}
                  x2={toSvgX(95)}
                  y2={toSvgY(effectivePrice)}
                  stroke="#dc2626"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                />
                <text
                  x={toSvgX(95)}
                  y={toSvgY(effectivePrice) - 4}
                  textAnchor="end"
                  fontSize="8.5"
                  fontWeight="bold"
                  fill="#dc2626"
                >
                  {priceControlMode === "mindestpreis" ? `P_min = ${effectivePrice}€` : `P_max = ${effectivePrice}€`}
                </text>

                {/* 实际成交量垂线 */}
                <line
                  x1={toSvgX(transactedQ)}
                  y1={toSvgY(0)}
                  x2={toSvgX(transactedQ)}
                  y2={toSvgY(effectivePrice)}
                  stroke="#dc2626"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <text
                  x={toSvgX(transactedQ)}
                  y={toSvgY(0) + 12}
                  textAnchor="middle"
                  fontSize="8"
                  fontWeight="bold"
                  fill="#dc2626"
                >
                  Q_trans ({transactedQ.toFixed(0)})
                </text>

                {/* 供需缺口指示线段 */}
                <line
                  x1={toSvgX(transactedQ)}
                  y1={toSvgY(effectivePrice)}
                  x2={toSvgX(Math.max(qDemanded, qSupplied))}
                  y2={toSvgY(effectivePrice)}
                  stroke="#dc2626"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />

                {/* DWL 文字标示 */}
                {welfare.dwl > 0 && (
                  <text
                    x={toSvgX((eqQ + transactedQ) / 2)}
                    y={toSvgY(eqP) + 3}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="bold"
                    fill="#e11d48"
                  >
                    DWL
                  </text>
                )}
              </>
            )}

            {/* 区域文字水印 */}
            <text x={toSvgX(transactedQ * 0.35)} y={toSvgY(effectivePrice + (dBase - effectivePrice) * 0.35)} fontSize="9" fontWeight="bold" fill="var(--ink)" fillOpacity="0.5" fontFamily="monospace">
              CS
            </text>
            <text x={toSvgX(transactedQ * 0.35)} y={toSvgY(effectivePrice - (effectivePrice - sBase) * 0.35)} fontSize="9" fontWeight="bold" fill="var(--ink)" fillOpacity="0.5" fontFamily="monospace">
              PS
            </text>
          </svg>

          {/* 图例 */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-4 text-[11px] font-mono text-[var(--ink)]">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-3.5 rounded-xs bg-[var(--ink)]/10 border border-[var(--ink)]/30" />
              <span>{de ? "Konsumentenrente (CS)" : "消费者剩余 (CS)"}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-3.5 rounded-xs bg-[var(--ink)]/25 border border-[var(--ink)]/50" />
              <span>{de ? "Produzentenrente (PS)" : "生产者剩余 (PS)"}</span>
            </span>
            {isIntervention && welfare.dwl > 0 && (
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-3.5 rounded-xs bg-red-500/20 border border-red-500" />
                <span className="font-bold text-red-600 dark:text-red-400">
                  {de ? "Wohlfahrtsverlust (DWL)" : "无谓损失 (DWL)"}
                </span>
              </span>
            )}
          </div>
        </div>

        {/* 右侧：调控面板与多视角考场分析 (5 列) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {/* 控制模块 A: 供求曲线位移 */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)] block mb-2">
              {de ? "1. Marktkräfte & Kurvenverschiebung" : "1. 市场基本面（供求曲线平移）"}
            </span>

            {/* 需求移动 */}
            <div className="space-y-1 mb-2.5">
              <div className="flex justify-between font-mono">
                <span>{de ? "Nachfrageverschiebung ΔD:" : "需求平移（收入/偏好）ΔD:"}</span>
                <span className="font-bold text-[var(--ink)]">{demandShift > 0 ? `+${demandShift}` : demandShift}</span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="1"
                value={demandShift}
                onChange={(e) => setDemandShift(Number(e.target.value))}
                className="w-full accent-[var(--ink)] cursor-pointer"
              />
            </div>

            {/* 供给移动 */}
            <div className="space-y-1">
              <div className="flex justify-between font-mono">
                <span>{de ? "Angebotsverschiebung ΔS:" : "供给平移（技术/成本）ΔS:"}</span>
                <span className="font-bold text-[var(--accent)]">{supplyShift > 0 ? `+${supplyShift}` : supplyShift}</span>
              </div>
              <input
                type="range"
                min="-25"
                max="25"
                step="1"
                value={supplyShift}
                onChange={(e) => setSupplyShift(Number(e.target.value))}
                className="w-full accent-[var(--accent)] cursor-pointer"
              />
            </div>
          </div>

          {/* 控制模块 B: 政府价格干预模式 */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)] block mb-2">
              {de ? "2. Staatliche Intervention (Ordnungspolitik)" : "2. 国家价格干预与管制模式"}
            </span>

            <div className="grid grid-cols-3 gap-1.5 mb-3">
              <button
                type="button"
                onClick={() => setPriceControlMode("free")}
                className={`py-1.5 px-1 rounded border text-center transition-colors text-xs font-mono ${
                  priceControlMode === "free"
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold shadow-xs"
                    : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? "🕊️ Freier Markt" : "🕊️ 自由市场"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPriceControlMode("mindestpreis");
                  setControlPrice(Math.round(eqP + 12));
                }}
                className={`py-1.5 px-1 rounded border text-center transition-colors text-xs font-mono ${
                  priceControlMode === "mindestpreis"
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold shadow-xs"
                    : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? "🛡️ Mindestpreis" : "🛡️ 最低限价"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setPriceControlMode("hoechstpreis");
                  setControlPrice(Math.round(eqP - 12));
                }}
                className={`py-1.5 px-1 rounded border text-center transition-colors text-xs font-mono ${
                  priceControlMode === "hoechstpreis"
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-bold shadow-xs"
                    : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? "🏠 Höchstpreis" : "🏠 最高限价"}
              </button>
            </div>

            {/* 限价滑块 */}
            {priceControlMode !== "free" && (
              <div className="rounded border border-[var(--line)] bg-[var(--paper)] p-2.5 space-y-1">
                <div className="flex justify-between font-mono">
                  <span className="font-semibold text-red-600 dark:text-red-400">
                    {priceControlMode === "mindestpreis"
                      ? de ? "Gesetzlicher Mindestpreis P_min:" : "法定最低限价 P_min:"
                      : de ? "Gesetzlicher Höchstpreis P_max:" : "法定最高限价 P_max:"}
                  </span>
                  <span className="font-bold text-red-600">{controlPrice} GE</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="80"
                  step="1"
                  value={controlPrice}
                  onChange={(e) => setControlPrice(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-[var(--gray)]">
                  <span>20 GE</span>
                  <span className="text-[var(--ink)] font-bold">P* = {eqP.toFixed(0)} GE</span>
                  <span>80 GE</span>
                </div>
              </div>
            )}
          </div>

          {/* 选项卡：AFB III 考场评价与利益攸关方视角 */}
          <div className="rounded-lg border border-[var(--line)] bg-[var(--paper)] p-3 text-xs">
            <div className="flex items-center gap-1 border-b border-[var(--line)] pb-2 mb-2 font-mono text-[11px]">
              <button
                type="button"
                onClick={() => setActiveTab("wohlfahrt")}
                className={`px-2 py-1 rounded transition-colors ${
                  activeTab === "wohlfahrt"
                    ? "bg-[var(--ink)] text-[var(--paper)] font-bold"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? "🏛️ Gesamtwohlfahrt" : "🏛️ 社会总福利"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("anbieter")}
                className={`px-2 py-1 rounded transition-colors ${
                  activeTab === "anbieter"
                    ? "bg-[var(--ink)] text-[var(--paper)] font-bold"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? "🏭 Anbieter" : "🏭 生产者/企业"}
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("nachfrager")}
                className={`px-2 py-1 rounded transition-colors ${
                  activeTab === "nachfrager"
                    ? "bg-[var(--ink)] text-[var(--paper)] font-bold"
                    : "text-[var(--gray)] hover:text-[var(--ink)]"
                }`}
              >
                {de ? "🛒 Nachfrager" : "🛒 消费者/买方"}
              </button>
            </div>

            <div className="leading-relaxed text-[var(--ink)]/90 min-h-[75px]">
              {activeTab === "wohlfahrt" && (
                <p>
                  {!isIntervention
                    ? de
                      ? "Im unregulierten Gleichgewicht decken sich Angebot und Nachfrage. Die Allokationseffizienz ist maximal: Jeder Handel, bei dem Zahlungsbereitschaft ≥ Grenzkosten ist, wird realisiert. Deadweight Loss ist exakt null."
                      : "在自由均衡下，供求出清。只要买方支付意愿 ≥ 卖方边际成本的互利交易均全部实现，社会总福利（CS + PS）达到帕累托最优最大值，无谓损失 DWL = 0。"
                    : de
                      ? `Preiskontrollen verzerren das Preissignal. Bei p=${effectivePrice} schrumpft das Handelsvolumen auf ${transactedQ} Einheiten. Potenziell wohlfahrtssteigernde Tauschakte werden verhindert; der DWL beträgt ${welfare.dwl} GE.`
                      : `价格管制扭曲了价格信号。当法定价格偏离均衡时，实际交易量被短边截断在 ${transactedQ.toFixed(0)} 单位。未实现的互利交易构成红色的社会总福利死重损失（DWL = ${welfare.dwl} GE）。`}
                </p>
              )}

              {activeTab === "anbieter" && (
                <p>
                  {priceControlMode === "mindestpreis"
                    ? de
                      ? `Mindestpreise (z. B. Mindestlohn, EU-Agrarmarktgarantien) sichern Anbietern hohe Erlöse pro Einheit, verursachen jedoch einen Angebotsüberhang von ${(qSupplied - qDemanded).toFixed(0)} Einheiten (Überproduktion / Arbeitslosigkeit der Geringqualifizierten).`
                      : `最低限价（如法定最低工资 Mindestlohn、欧盟农业保价收购）提高了单位售价，但造成了 ${(qSupplied - qDemanded).toFixed(0)} 单位的供给过剩（农产品积压滞销、低技能群体非自愿失业）。除非政府全额财政收购，否则供给方无法全部变现。`
                    : de
                      ? "Im freien Markt oder bei Höchstpreisen werden Produzenten durch sinkende Margen unter Wettbewerbsdruck gesetzt."
                      : "在最高限价管制下，生产者利润空间被极度压缩，边缘企业因无法弥补边际成本而被挤出市场，导致行业供给收缩。"}
                </p>
              )}

              {activeTab === "nachfrager" && (
                <p>
                  {priceControlMode === "hoechstpreis"
                    ? de
                      ? `Höchstpreise (z. B. Mietendeckel / Mietpreisbremse) senken die Kosten für verbleibende Mieter, führen jedoch zu einem Nachfrageüberhang von ${(qDemanded - qSupplied).toFixed(0)} Einheiten (Wohnungsmangel, Wartelisten, Schwarzmärkte).`
                      : `最高限价（如柏林房租封顶 Mietendeckel、物价上限）虽然降低了抢购成功者的开支，但造成了 ${(qDemanded - qSupplied).toFixed(0)} 单位的供不应求短缺（租房排队长龙、房东修缮动力不足、黑市溢价交易）。`
                    : de
                      ? "Bei Mindestpreisen werden einkommensschwache Konsumenten durch überhöhte Preise vom Markt ausgeschlossen."
                      : "在最低限价管制下，高昂的售价将低预算消费者直接逐出市场，消费者剩余被大幅挤压削减。"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. 底部会考满分标准句导出 (Klausursatz) */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-[var(--line)] pt-3">
        <p className="font-serif text-xs leading-relaxed text-[var(--ink)]">
          <span className="font-sans font-bold text-[var(--accent)] mr-1">
            {de ? "✍️ Abitur-Fazit:" : "✍️ 北威州会考标准采分句："}
          </span>
          {klausursatz}
        </p>
        <button
          type="button"
          onClick={handleCopyOrInsert}
          className="shrink-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 font-mono text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--surface-hover)] cursor-pointer"
        >
          {copied
            ? de ? "✓ Kopiert!" : "✓ 已复制到剪贴板!"
            : de ? "Als Klausursatz kopieren" : "引用至考场论述"}
        </button>
      </div>
    </div>
  );
}

export default MarktMechanismusSim;
