// SeeOekologieSim — 富营养化湖泊垂向生态断面与四季翻转互动沙盒 (Ökologie des Sees & Eutrophierung)
// 依据淡水生态学与北威州高级文理中学 (Gymnasium Q1) Ökologie 考纲标准设计
// 严格遵循 Tufte Editorial 学术极简规范：高信息墨水比、学术教科书截面、温度-溶氧双轴曲线

import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";

export interface SeeOekologieSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type SeasonType = "fruehjahr" | "sommer" | "herbst" | "winter";

export function SeeOekologieSim({ lang = "de", onExportFinding }: SeeOekologieSimProps) {
  const isDe = lang === "de";

  const [season, setSeason] = useState<SeasonType>("sommer");
  const [phosphorusLevel, setPhosphorusLevel] = useState<number>(35); // 5 - 95 µg/L 磷输入

  // 生态状态推导与水深剖面计算
  const ecoStatus = useMemo(() => {
    // 0-20: oligotroph (贫营养，清澈)
    // 21-45: mesotroph (中营养)
    // 46-75: eutroph (富营养，藻类暴发，底层缺氧)
    // >75: hypertroph / gekippt (过营养，翻湖窒息)
    const trophic =
      phosphorusLevel < 20
        ? "oligotroph"
        : phosphorusLevel < 45
        ? "mesotroph"
        : phosphorusLevel < 75
        ? "eutroph"
        : "hypertroph";

    const isSummer = season === "sommer";
    const isWinter = season === "winter";
    const isCirculation = season === "fruehjahr" || season === "herbst";

    // 表层溶解氧 (mg/L)
    const surfaceO2 = Math.min(14, +(8.5 + (phosphorusLevel / 100) * 4.5).toFixed(1));

    // 底层溶解氧 (mg/L): 在夏季/冬季分层停滞时，好氧分解耗尽底层O2
    let bottomO2 = 8.0;
    if (isCirculation) {
      bottomO2 = +(8.2 - (phosphorusLevel / 100) * 1.5).toFixed(1);
    } else if (isSummer) {
      bottomO2 = Math.max(0, +(7.0 - (phosphorusLevel / 100) * 8.8).toFixed(1));
    } else {
      // 冬季冰下停滞
      bottomO2 = Math.max(0.8, +(6.5 - (phosphorusLevel / 100) * 4.5).toFixed(1));
    }

    // 表层温度与底层温度 (°C)
    let surfaceTemp = 20.0;
    let bottomTemp = 4.0;
    if (season === "fruehjahr" || season === "herbst") {
      surfaceTemp = 4.0;
      bottomTemp = 4.0;
    } else if (season === "winter") {
      surfaceTemp = 0.5; // 冰层或冷表层
      bottomTemp = 4.0;  // 4°C 水的反常膨胀最密
    } else {
      surfaceTemp = 21.0;
      bottomTemp = 4.0;
    }

    const hasSapropel = isSummer && phosphorusLevel > 60;
    const benthicStatus =
      bottomO2 > 4.0
        ? isDe ? "Intakt (aerob)" : "健康好氧"
        : bottomO2 > 1.5
        ? isDe ? "Gefährdet (hypoxisch)" : "低氧胁迫"
        : isDe ? "Anoxisch (Faulschlamm)" : "完全缺氧 (腐泥化)";

    return {
      trophic,
      surfaceO2,
      bottomO2,
      surfaceTemp,
      bottomTemp,
      hasSapropel,
      benthicStatus,
      isCirculation,
      isSummer,
      isWinter,
    };
  }, [season, phosphorusLevel]);

  const handleExport = () => {
    const text = isDe
      ? `See-Ökologie Akademisches Protokoll:\n- Jahreszeit: ${season.toUpperCase()} (${ecoStatus.isCirculation ? "Vollzirkulation" : "Stagnation"})\n- Phosphat-Belastung: ${phosphorusLevel} µg/L (Zustand: ${ecoStatus.trophic})\n- Epilimnion: ${ecoStatus.surfaceTemp}°C, O2: ${ecoStatus.surfaceO2} mg/L\n- Hypolimnion: ${ecoStatus.bottomTemp}°C, O2: ${ecoStatus.bottomO2} mg/L (${ecoStatus.benthicStatus})\n- Sedimentzustand: ${ecoStatus.hasSapropel ? "Sapropel (H2S-Bildung / anaerob)" : "Aerobes Sediment (Destruenten aktiv)"}\n- Abitur-Fazit: ${
          ecoStatus.hasSapropel
            ? "Kritisches Umkippen: O2-Schwund entlässt rückgelöstes Phosphat aus dem Sediment (Phosphatfalle bricht zusammen)."
            : "Phosphatfalle intakt: Eisen(III)-phosphat bindet Phosphat im aeroben Sediment."
        }`
      : `湖泊生态学与富营养化诊断学报：\n- 季节状态：${season.toUpperCase()}（${ecoStatus.isCirculation ? "全对流翻转期" : "分层停滞期"}）\n- 磷酸盐负荷：${phosphorusLevel} µg/L（营养级：${ecoStatus.trophic}）\n- 表水层 (Epilimnion)：${ecoStatus.surfaceTemp}°C，溶解氧 ${ecoStatus.surfaceO2} mg/L\n- 深水层 (Hypolimnion)：${ecoStatus.bottomTemp}°C，溶解氧 ${ecoStatus.bottomO2} mg/L（底层状态：${ecoStatus.benthicStatus}）\n- 湖底沉积：${ecoStatus.hasSapropel ? "厌氧腐泥 (Sapropel / 释放有毒H2S)" : "好氧健康分解 (好氧分解菌主导)"}\n- 会考核心诊断：${
          ecoStatus.hasSapropel
            ? "恶性翻湖陷阱：底层完全缺氧导致铁磷酸盐络合物还原溶解（磷陷阱崩溃），引发自激强化污染恶性循环。"
            : "铁(III)磷酸盐沉淀锁死磷酸盐（磷陷阱完好），维持水体长期贫/中营养稳态。"
        }`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
    }
  };

  // 生成温度和溶氧曲线在 SVG 剖面上的折线点 (深度 0m - 25m, y: 35 -> 220)
  // 右侧测量图横轴 x: 310 -> 470 (宽 160)
  // 温度 0°C -> 25°C 对应 x: 310 -> 470
  // 溶氧 0mg/L -> 14mg/L 对应 x: 310 -> 470
  const profilePaths = useMemo(() => {
    const depthSteps = 10;
    const tempPoints: Array<[number, number]> = [];
    const o2Points: Array<[number, number]> = [];

    for (let i = 0; i <= depthSteps; i++) {
      const depth = (i / depthSteps) * 25; // 0m to 25m
      const y = 35 + (depth / 25) * 185;

      let temp = 4.0;
      let o2 = 8.0;

      if (ecoStatus.isCirculation) {
        temp = 4.0;
        o2 = ecoStatus.surfaceO2 - (depth / 25) * (ecoStatus.surfaceO2 - ecoStatus.bottomO2);
      } else if (ecoStatus.isSummer) {
        if (depth <= 8) {
          temp = ecoStatus.surfaceTemp - (depth / 8) * 2.0; // 21 -> 19
          o2 = ecoStatus.surfaceO2;
        } else if (depth <= 14) {
          // Sprungschicht 温跃层
          const ratio = (depth - 8) / 6;
          temp = 19.0 - ratio * 15.0; // 19 -> 4
          o2 = ecoStatus.surfaceO2 - ratio * (ecoStatus.surfaceO2 - ecoStatus.bottomO2);
        } else {
          temp = 4.0;
          o2 = ecoStatus.bottomO2;
        }
      } else {
        // 冬季
        if (depth <= 2) {
          temp = ecoStatus.surfaceTemp + (depth / 2) * 3.5; // 0.5 -> 4.0
        } else {
          temp = 4.0;
        }
        o2 = ecoStatus.surfaceO2 - (depth / 25) * (ecoStatus.surfaceO2 - ecoStatus.bottomO2);
      }

      // 映射到坐标
      const tempX = 310 + (Math.max(0, Math.min(25, temp)) / 25) * 150;
      const o2X = 310 + (Math.max(0, Math.min(14, o2)) / 14) * 150;

      tempPoints.push([tempX, y]);
      o2Points.push([o2X, y]);
    }

    const tempD = tempPoints.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
    const o2D = o2Points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

    return { tempD, o2D };
  }, [ecoStatus]);

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[var(--surface)] rounded-xl border border-[var(--line)] shadow-xs font-sans text-[var(--ink)]">
      {/* 顶部标题与控制选项 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-mono rounded bg-[var(--paper-subtle)] text-[var(--accent)] border border-[var(--line)] font-semibold">
              Biologie Q1 · Ökologie stehender Gewässer
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Limnologie: Schichtung & Eutrophierung</span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "Ökosystem See: Schichtung, Zirkulation & Eutrophierung" : "湖泊生态系统：水层温跃、四季对流与富营养化沙盒"}
          </h2>
        </div>

        {/* 季节切换按钮 */}
        <div className="flex items-center gap-1 p-1 bg-[var(--paper-subtle)] rounded-lg border border-[var(--line)] text-xs font-mono">
          <button
            type="button"
            onClick={() => setSeason("fruehjahr")}
            className={`px-2.5 py-1 rounded transition-colors ${
              season === "fruehjahr"
                ? "bg-[var(--surface)] font-bold text-[var(--accent)] shadow-xs border border-[var(--line)]"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "Frühjahr (Zirkulation)" : "春季 (全对流)"}
          </button>
          <button
            type="button"
            onClick={() => setSeason("sommer")}
            className={`px-2.5 py-1 rounded transition-colors ${
              season === "sommer"
                ? "bg-[var(--surface)] font-bold text-[var(--accent)] shadow-xs border border-[var(--line)]"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "Sommer (Stagnation)" : "夏季 (温跃分层)"}
          </button>
          <button
            type="button"
            onClick={() => setSeason("herbst")}
            className={`px-2.5 py-1 rounded transition-colors ${
              season === "herbst"
                ? "bg-[var(--surface)] font-bold text-[var(--accent)] shadow-xs border border-[var(--line)]"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "Herbst (Zirkulation)" : "秋季 (全对流)"}
          </button>
          <button
            type="button"
            onClick={() => setSeason("winter")}
            className={`px-2.5 py-1 rounded transition-colors ${
              season === "winter"
                ? "bg-[var(--surface)] font-bold text-[var(--accent)] shadow-xs border border-[var(--line)]"
                : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "Winter (Invers)" : "冬季 (冰下分层)"}
          </button>
        </div>
      </div>

      {/* 参数调控栏 */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-[var(--paper-subtle)]/40 rounded-lg border border-[var(--line)]">
        <div className="flex-1 min-w-[260px] max-w-xl">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="font-semibold text-[var(--ink)]">
              {isDe ? "Phosphat-Zufuhr (P-Eintrag):" : "磷酸盐外部负荷 (PO₄³⁻ 浓度):"}
            </span>
            <span className="font-bold text-[var(--accent)]">
              {phosphorusLevel} µg/L ({ecoStatus.trophic})
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="95"
            value={phosphorusLevel}
            onChange={(e) => setPhosphorusLevel(Number(e.target.value))}
            className="w-full accent-[var(--accent)] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--gray)] font-mono mt-0.5">
            <span>Oligotroph (&lt; 20)</span>
            <span>Mesotroph (20-45)</span>
            <span>Eutroph (45-75)</span>
            <span className="text-rose-600 font-bold">Hypertroph (&gt; 75)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="px-3 py-1.5 text-xs font-mono rounded border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] transition-colors cursor-pointer"
          >
            {isDe ? "📥 Protokoll kopieren" : "📥 导出生态学报"}
          </button>
        </div>
      </div>

      {/* 核心双视窗：左侧教科书级断面与温度/溶氧曲线，右侧因果机理与会考采分 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：湖泊纵向剖面图与数据曲线图 (7 列) */}
        <div className="lg:col-span-7 flex flex-col gap-2 p-4 bg-[var(--surface)] rounded-xl border border-[var(--line)]">
          <div className="flex justify-between items-center text-xs text-[var(--gray)] font-mono">
            <span>Vertikalschnitt & Tiefenprofile (0m – 25m)</span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-rose-700">
                <span className="w-2.5 h-0.5 bg-rose-700 inline-block"></span>
                <span>T (°C)</span>
              </span>
              <span className="flex items-center gap-1 text-sky-700">
                <span className="w-2.5 h-0.5 bg-sky-700 inline-block"></span>
                <span>O₂ (mg/L)</span>
              </span>
            </span>
          </div>

          {/* Tufte 风格科研矢量图 */}
          <div className="relative w-full aspect-16/11 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] p-2">
            <svg className="w-full h-full select-none" viewBox="0 0 500 260">
              {/* 剖面区域底色划分 (x: 20 -> 270, 宽 250) */}
              {/* 水面基准线 (y: 35) */}
              <line x1="20" y1="35" x2="270" y2="35" stroke="var(--ink)" strokeWidth="1" />

              {/* 1. 表水层 Epilimnion (0 - 8m, y: 35 - 94) */}
              <rect
                x="20"
                y="35"
                width="250"
                height="59"
                fill={phosphorusLevel > 60 ? "#86efac" : phosphorusLevel > 35 ? "#bae6fd" : "#e0f2fe"}
                fillOpacity={phosphorusLevel > 60 ? "0.22" : "0.15"}
              />
              <text x="28" y="52" fill="var(--ink)" fontSize="9" fontWeight="bold" fontFamily="serif">
                Epilimnion (Nährschicht, 0–8m)
              </text>
              <text x="28" y="66" fill="var(--gray)" fontSize="7.5" fontFamily="monospace">
                {season === "sommer"
                  ? "20°C · Hohe Lichtintensität · Fotosynthese > Atmung"
                  : season === "winter"
                  ? "0–3°C · Eisdecke / Invers"
                  : "4°C · Zirkulation & Sauerstoffsättigung"}
              </text>

              {/* 浮游植物小微粒点缀 (高信息密度) */}
              {Array.from({ length: Math.min(30, Math.round(phosphorusLevel / 3)) }).map((_, i) => (
                <circle
                  key={i}
                  cx={35 + ((i * 37) % 220)}
                  cy={45 + ((i * 17) % 40)}
                  r={phosphorusLevel > 50 ? 1.5 : 1}
                  fill={phosphorusLevel > 50 ? "#15803d" : "#0284c7"}
                  opacity="0.6"
                />
              ))}

              {/* 2. 温跃层 Metallimnion / Sprungschicht (8 - 14m, y: 94 - 138) */}
              <rect
                x="20"
                y="94"
                width="250"
                height="44"
                fill="#f1f5f9"
                fillOpacity="0.4"
              />
              <line x1="20" y1="94" x2="270" y2="94" stroke="var(--gray)" strokeWidth="0.8" strokeDasharray="3,3" />
              <line x1="20" y1="138" x2="270" y2="138" stroke="var(--gray)" strokeWidth="0.8" strokeDasharray="3,3" />
              <text x="28" y="112" fill="var(--ink)" fontSize="8.5" fontWeight="bold" fontFamily="serif">
                Metalimnion (Sprungschicht, 8–14m)
              </text>
              <text x="28" y="125" fill="var(--gray)" fontSize="7.5" fontFamily="monospace">
                {season === "sommer" ? "Temperatursturz > 1°C/m (Dichtebarriere)" : "Homogene Dichte / Keine Barriere"}
              </text>

              {/* 3. 深水层 Hypolimnion (14 - 25m, y: 138 - 220) */}
              <rect
                x="20"
                y="138"
                width="250"
                height="82"
                fill="#cbd5e1"
                fillOpacity="0.12"
              />
              <text x="28" y="158" fill="var(--ink)" fontSize="9" fontWeight="bold" fontFamily="serif">
                Hypolimnion (Zehrschicht, 14–25m)
              </text>
              <text x="28" y="172" fill="var(--gray)" fontSize="7.5" fontFamily="monospace">
                4°C (Dichteanomalie) · Lichtlos · Atmung & Zersetzung
              </text>

              {/* 有机碎屑沉降雨 (Detritus-Regen) */}
              {phosphorusLevel > 30 && (
                <g opacity="0.4">
                  {[60, 110, 160, 210].map((x) => (
                    <line key={x} x1={x} y1="96" x2={x} y2="218" stroke="var(--gray)" strokeWidth="1" strokeDasharray="2,4" />
                  ))}
                  <text x="145" y="195" textAnchor="middle" fill="var(--gray)" fontSize="7" fontStyle="italic" fontFamily="serif">
                    Detritus-Sedimentation ↓
                  </text>
                </g>
              )}

              {/* 湖底沉积物与腐泥层 (Sediment, y: 220 - 245) */}
              <rect
                x="20"
                y="220"
                width="250"
                height="25"
                fill={ecoStatus.hasSapropel ? "#1e293b" : "#e2e8f0"}
                stroke="var(--line)"
                strokeWidth="1"
              />
              <text x="28" y="236" fill={ecoStatus.hasSapropel ? "#f87171" : "var(--ink)"} fontSize="8" fontWeight="bold" fontFamily="monospace">
                {ecoStatus.hasSapropel
                  ? "⚠️ Faulschlamm (Sapropel): Anaerob, Freisetzung von H₂S & NH₄⁺"
                  : "Aerobes Sediment: Eisen(III)-Phosphatfalle intakt"}
              </text>

              {/* 深度轴刻度 (左侧, x: 20) */}
              <line x1="20" y1="35" x2="20" y2="245" stroke="var(--ink)" strokeWidth="1" />
              {[0, 8, 14, 25].map((d) => {
                const y = 35 + (d / 25) * 185;
                return (
                  <g key={d}>
                    <line x1="16" y1={y} x2="20" y2={y} stroke="var(--ink)" strokeWidth="1" />
                    <text x="13" y={y + 3} textAnchor="end" fontSize="7.5" fill="var(--gray)" fontFamily="monospace">
                      {d}m
                    </text>
                  </g>
                );
              })}

              {/* ========================================================= */}
              {/* 右侧：科研双轴剖面曲线图 (x: 300 -> 475, 宽 175) */}
              {/* ========================================================= */}
              {/* 边框与网格 */}
              <rect x="310" y="35" width="160" height="185" fill="none" stroke="var(--line)" strokeWidth="0.8" />
              <line x1="310" y1="94" x2="470" y2="94" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="310" y1="138" x2="470" y2="138" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="350" y1="35" x2="350" y2="220" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="390" y1="35" x2="390" y2="220" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="430" y1="35" x2="430" y2="220" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* 顶部横坐标刻度与标签 */}
              <line x1="310" y1="35" x2="470" y2="35" stroke="var(--ink)" strokeWidth="1" />
              <text x="310" y="27" textAnchor="middle" fontSize="7.5" fill="var(--gray)" fontFamily="monospace">0</text>
              <text x="390" y="27" textAnchor="middle" fontSize="7.5" fill="var(--gray)" fontFamily="monospace">12° / 7 mg</text>
              <text x="470" y="27" textAnchor="middle" fontSize="7.5" fill="var(--gray)" fontFamily="monospace">25° / 14 mg</text>

              {/* 温度曲线 (红细线) */}
              <path d={profilePaths.tempD} fill="none" stroke="#b91c1c" strokeWidth="1.8" />

              {/* 溶解氧曲线 (蓝细线) */}
              <path d={profilePaths.o2D} fill="none" stroke="#0284c7" strokeWidth="1.8" strokeDasharray={season === "sommer" ? undefined : "3,1"} />

              {/* 底部指标信息标注 */}
              <text x="315" y="240" fontSize="8" fill="var(--gray)" fontFamily="monospace">
                Tiefen-O₂: <tspan fill={ecoStatus.bottomO2 < 2 ? "#b91c1c" : "var(--ink)"} fontWeight="bold">{ecoStatus.bottomO2} mg/L</tspan> ({ecoStatus.benthicStatus})
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--gray)] font-mono pt-1">
            <span>Epilimnion: {ecoStatus.surfaceTemp}°C | Hypolimnion: {ecoStatus.bottomTemp}°C</span>
            <span className="font-semibold text-[var(--ink)]">
              {ecoStatus.isCirculation ? "Dynamik: Herbst-/Frühjahrs-Vollzirkulation" : "Dynamik: Sommerliche Dichteschichtung"}
            </span>
          </div>
        </div>

        {/* 右侧：因果链推演与会考采分 (5 列) */}
        <div className="lg:col-span-5 flex flex-col gap-3 p-4 bg-[var(--surface)] rounded-xl border border-[var(--line)] shadow-xs text-xs">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <div>
              <span className="font-mono text-[var(--gray)] uppercase tracking-wider text-[10px]">
                {isDe ? "Ökologische Kausalkette" : "生态学因果连锁反应链"}
              </span>
              <h3 className="text-base font-serif font-bold text-[var(--ink)] mt-0.5">
                {ecoStatus.trophic === "oligotroph"
                  ? isDe ? "Oligotropher Gleichgewichtszustand" : "贫营养良性稳态"
                  : ecoStatus.trophic === "mesotroph"
                  ? isDe ? "Mesotrophe Pufferkapazität" : "中营养适度缓冲态"
                  : ecoStatus.trophic === "eutroph"
                  ? isDe ? "Eutrophierung (Kritische Sauerstoffzehrung)" : "富营养化危机（深层缺氧）"
                  : isDe ? "🚨 Umkippen des Sees (Ökologischer Kollaps)" : "🚨 恶性翻湖（生态全盘崩溃）"}
              </h3>
            </div>
          </div>

          {/* 翻湖五步经典因果链 (会考必背) */}
          <div className="space-y-2 leading-relaxed">
            <div className="p-2.5 rounded bg-[var(--paper-subtle)]/50 border border-[var(--line)]/60">
              <span className="font-bold text-[var(--ink)]">1. Überdüngung (Eutrophierung):</span>
              <p className="mt-0.5 text-[var(--gray)]">
                {isDe
                  ? "Phosphat ist der limitierende Faktor. Übermäßiger Eintrag führt zur explosiven Vermehrung von Phytoplankton (Algenblüte)."
                  : "磷酸盐是天然湖泊的限制性因子。农田化肥流失导致水中磷过剩，引发蓝藻与绿藻暴发（水华）。"}
              </p>
            </div>

            <div className="p-2.5 rounded bg-[var(--paper-subtle)]/50 border border-[var(--line)]/60">
              <span className="font-bold text-[var(--ink)]">2. Lichtmangel & Absterben:</span>
              <p className="mt-0.5 text-[var(--gray)]">
                {isDe
                  ? "Die trübe Algendecke absorbiert Licht; tieferliegende Makrophyten sterben mangels Fotosynthese ab und sinken als Detritus ab."
                  : "密集的藻华遮蔽阳光，中深层水生植物因光补偿点上移而枯萎死亡，转化为巨量有机碎屑（Detritus）。"}
              </p>
            </div>

            <div className="p-2.5 rounded bg-[var(--paper-subtle)]/50 border border-[var(--line)]/60">
              <span className="font-bold text-[var(--ink)]">3. Massive Sauerstoffzehrung:</span>
              <p className="mt-0.5 text-[var(--gray)]">
                {isDe
                  ? "Aerobe Destruenten bauen den absinkenden Detritus unter extremem O2-Verbrauch ab. Im Hypolimnion entsteht Sauerstoffnot."
                  : "好氧分解细菌（Destruenten）全力分解沉降碎屑，剧烈消耗深水层本就无法与大气交换的储备溶解氧。"}
              </p>
            </div>

            <div className="p-2.5 rounded bg-[var(--paper-subtle)]/50 border border-[var(--line)]/60">
              <span className="font-bold text-[var(--accent)]">4. Kollaps der Phosphatfalle:</span>
              <p className="mt-0.5 text-[var(--gray)]">
                {isDe
                  ? "Unter anoxischen Bedingungen wird Fe³⁺ zu löslichem Fe²⁺ reduziert. Das gebundene Phosphat wird rückgelöst (interne Düngung)."
                  : "在缺氧条件下，不溶性三价铁 Fe³⁺ 被还原为二价铁 Fe²⁺，原本沉淀在底泥中的磷酸盐大量重新溶出（自激内源污染）。"}
              </p>
            </div>
          </div>

          {/* 会考核心答题规范指导 */}
          <div className="mt-1 p-3 rounded-lg border border-[var(--accent)]/30 bg-[var(--accent)]/5">
            <span className="font-mono font-bold text-[var(--accent)] uppercase text-[10px] block mb-1">
              {isDe ? "Abitur-Kernbegriffe (NRW Q1):" : "北威州高中会考高分术语链："}
            </span>
            <p className="text-[11px] text-[var(--ink)] font-mono">
              Sprungschicht (Metalimnion) · Dichteanomalie des Wassers (4°C) · Zirkulation vs. Stagnation · Biomassepyramide · Sapropel
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeeOekologieSim;
