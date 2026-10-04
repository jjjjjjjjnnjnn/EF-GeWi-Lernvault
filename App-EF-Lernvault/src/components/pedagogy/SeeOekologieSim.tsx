// SeeOekologieSim — 富营养化湖泊垂向生态断面与四季翻转互动沙盒 (Ökologie des Sees & Eutrophierung)
// 依据淡水生态学与北威州高级文理中学 (Gymnasium Q1) Ökologie 考纲标准设计
// 包含三大核心沉浸机制：
// 1. 🌊 四季水温分层与全对流翻转 (Jahreszeitliche Zirkulation & Stagnation)：春/秋全对流 vs 夏/冬停滞分层
// 2. 🧪 磷氮营养盐输入与湖泊翻湖连锁反应 (Eutrophierung & Umkippen)：藻华爆发 → 遮光 → 好氧分解耗竭O₂ → 厌氧腐泥 (Sapropel)
// 3. 📝 北威州会考经典生态学大题与 EHZ 评分细则 (15 Pkt)

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
  const [phosphorusLevel, setPhosphorusLevel] = useState<number>(30); // 0 - 100 µg/L 磷输入

  // 生态状态推导
  const ecoStatus = useMemo(() => {
    // 0-15: oligotroph (贫营养，清澈)
    // 16-40: mesotroph (中营养)
    // 41-75: eutroph (富营养，藻类丰富，底层缺氧)
    // >75: hypertroph / gekippt (严重过营养，翻湖窒息)
    const trophic =
      phosphorusLevel < 20
        ? "oligotroph"
        : phosphorusLevel < 45
        ? "mesotroph"
        : phosphorusLevel < 75
        ? "eutroph"
        : "hypertroph";

    const isSummer = season === "sommer";
    const isCirculation = season === "fruehjahr" || season === "herbst";

    // 表层溶解氧 (mg/L)
    const surfaceO2 = Math.min(14, +(8 + (phosphorusLevel / 100) * 5).toFixed(1));

    // 底层溶解氧 (mg/L): 在夏季且富营养化时剧烈耗尽
    let bottomO2 = 8;
    if (isCirculation) {
      bottomO2 = +(8 - (phosphorusLevel / 100) * 2).toFixed(1);
    } else if (isSummer) {
      bottomO2 = Math.max(0, +(7 - (phosphorusLevel / 100) * 9).toFixed(1));
    } else {
      // 冬季
      bottomO2 = Math.max(1, +(6 - (phosphorusLevel / 100) * 4).toFixed(1));
    }

    const hasSapropel = isSummer && phosphorusLevel > 65;
    const fishSurvival = bottomO2 > 3.0 ? "gut" : bottomO2 > 1.0 ? "bedroht" : "erstickt";

    return {
      trophic,
      surfaceO2,
      bottomO2,
      hasSapropel,
      fishSurvival
    };
  }, [season, phosphorusLevel]);

  const handleExport = () => {
    const text = isDe
      ? `See-Ökologie Analyse:\n- Jahreszeit: ${season}\n- Phosphat-Belastung: ${phosphorusLevel} µg/L (Zustand: ${ecoStatus.trophic})\n- O2-Profil: Oberfläche ${ecoStatus.surfaceO2} mg/L | Tiefenzone ${ecoStatus.bottomO2} mg/L\n- Zustand Tiefenfauna: ${ecoStatus.fishSurvival}\n- Faulschlamm (Sapropel): ${ecoStatus.hasSapropel ? "JA (H2S-Bildung)" : "NEIN"}`
      : `湖泊生态学与富营养化诊断报告：\n- 季节状态：${season}\n- 磷酸盐负荷：${phosphorusLevel} µg/L（富营养化级别：${ecoStatus.trophic}）\n- 垂向溶氧剖面：表水层 ${ecoStatus.surfaceO2} mg/L | 深水层 ${ecoStatus.bottomO2} mg/L\n- 鱼类生存状态：${ecoStatus.fishSurvival}\n- 厌氧腐泥 (Sapropel) 生成：${ecoStatus.hasSapropel ? "是 (产生剧毒硫化氢)" : "否 (好氧健康分解)"}`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs font-sans text-[var(--ink)]">
      {/* 顶部标题与控制选项 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-teal-500/10 text-teal-700 dark:text-teal-300 border border-teal-500/20">
              Biologie Q1 · Ökologie stehender Gewässer
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Limnologie: Schichtung & Eutrophierung</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "Ökosystem See: Schichtung, Zirkulation & Eutrophierung" : "湖泊生态系统：水层温跃、四季对流与富营养化沙盒"}
          </h2>
        </div>

        {/* 季节切换按钮 */}
        <div className="flex items-center gap-1 p-1 bg-[var(--paper-subtle)] rounded-lg border border-[var(--line)] text-xs">
          <button
            type="button"
            onClick={() => setSeason("fruehjahr")}
            className={`px-2.5 py-1 rounded transition-colors ${
              season === "fruehjahr" ? "bg-[var(--paper)] text-[var(--accent)] font-bold shadow-xs" : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "🌱 Frühjahr (Zirkulation)" : "🌱 春季全对流"}
          </button>
          <button
            type="button"
            onClick={() => setSeason("sommer")}
            className={`px-2.5 py-1 rounded transition-colors ${
              season === "sommer" ? "bg-[var(--paper)] text-[var(--accent)] font-bold shadow-xs" : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "☀️ Sommer (Stagnation)" : "☀️ 夏季温跃停滞"}
          </button>
          <button
            type="button"
            onClick={() => setSeason("herbst")}
            className={`px-2.5 py-1 rounded transition-colors ${
              season === "herbst" ? "bg-[var(--paper)] text-[var(--accent)] font-bold shadow-xs" : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "🍂 Herbst (Zirkulation)" : "🍂 秋季全对流"}
          </button>
          <button
            type="button"
            onClick={() => setSeason("winter")}
            className={`px-2.5 py-1 rounded transition-colors ${
              season === "winter" ? "bg-[var(--paper)] text-[var(--accent)] font-bold shadow-xs" : "text-[var(--gray)] hover:text-[var(--ink)]"
            }`}
          >
            {isDe ? "❄️ Winter (Inversion)" : "❄️ 冬季逆温停滞"}
          </button>
        </div>
      </div>

      {/* 营养盐输入滑块控制面板 */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 bg-[var(--paper-subtle)]/50 rounded-xl border border-[var(--line)] text-xs">
        <div className="flex-1 min-w-[240px]">
          <div className="flex justify-between items-center mb-1 font-semibold">
            <span>
              {isDe ? "Nährstoffeintrag (Phosphat-Konzentration P):" : "磷酸盐/硝酸盐农业化肥输入负荷："}
            </span>
            <span className="font-mono text-teal-700 dark:text-teal-300 font-bold">
              {phosphorusLevel} µg/L · {isDe ? ecoStatus.trophic.toUpperCase() : ecoStatus.trophic === "oligotroph" ? "贫营养" : ecoStatus.trophic === "mesotroph" ? "中营养" : ecoStatus.trophic === "eutroph" ? "富营养" : "极度过营养(翻湖)"}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="95"
            value={phosphorusLevel}
            onChange={(e) => setPhosphorusLevel(Number(e.target.value))}
            className="w-full accent-teal-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--gray)] font-mono mt-0.5">
            <span>Oligotroph (Bergsee, klar)</span>
            <span>Mesotroph (Ausgewogen)</span>
            <span>Eutroph (Algenblüte)</span>
            <span className="text-red-500 font-bold">Hypertroph (Umkippen)</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExport}
            className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)] transition-colors"
          >
            {isDe ? "📥 Protokoll exportieren" : "📥 导出生态学报"}
          </button>
        </div>
      </div>

      {/* 核心双视窗：左侧湖泊纵断面水层剖面，右侧生态因果机理解析 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：湖泊纵向剖面图 (7 列) */}
        <div className="lg:col-span-7 flex flex-col gap-2 p-4 bg-[var(--paper-subtle)]/40 rounded-xl border border-[var(--line)]">
          <div className="flex justify-between items-center text-xs text-[var(--gray)] font-mono">
            <span>Vertikalschnitt durch den See (Tiefe 0m bis 25m)</span>
            <span>O₂- & Temperatur-Gradient</span>
          </div>

          <div className="relative w-full aspect-16/11 rounded-lg overflow-hidden border border-[var(--line)] bg-sky-950 p-2">
            <svg className="w-full h-full" viewBox="0 0 500 320">
              {/* 天空与太阳 */}
              <rect x="0" y="0" width="500" height="40" fill="#38bdf8" fillOpacity="0.2" />
              {season === "sommer" && <circle cx="450" cy="20" r="14" fill="#facc15" />}
              {season === "winter" && (
                <rect x="0" y="38" width="500" height="5" fill="#f8fafc" fillOpacity="0.9" />
              )}

              {/* 表水层 Epilimnion (0 - 8m, y: 40 - 130) */}
              <rect
                x="0"
                y="40"
                width="500"
                height="90"
                fill={
                  phosphorusLevel > 60
                    ? "#14532d" // 浓厚绿藻水华
                    : phosphorusLevel > 35
                    ? "#065f46"
                    : "#0284c7"
                }
                fillOpacity="0.75"
              />
              <text x="20" y="65" fill="#ffffff" fontSize="10" fontWeight="bold">
                Epilimnion (Nährschicht, 0–8m)
              </text>
              <text x="20" y="80" fill="#ffffff" fillOpacity="0.8" fontSize="8" fontFamily="monospace">
                {season === "sommer" ? "20°C · Stark belichtet · Fotosynthese > Atmung" : "4°C · Zirkulation"}
              </text>

              {/* 浮游藻类小微粒 */}
              {Array.from({ length: Math.min(60, phosphorusLevel) }).map((_, i) => (
                <circle
                  key={i}
                  cx={30 + ((i * 37) % 440)}
                  cy={50 + ((i * 19) % 75)}
                  r={phosphorusLevel > 50 ? 3 : 2}
                  fill="#86efac"
                  fillOpacity="0.8"
                />
              ))}

              {/* 温跃层 Metallimnion / Sprungschicht (8 - 14m, y: 130 - 190) */}
              <rect
                x="0"
                y="130"
                width="500"
                height="60"
                fill="#0f172a"
                fillOpacity="0.5"
              />
              <line x1="0" y1="130" x2="500" y2="130" stroke="#facc15" strokeWidth="1" strokeDasharray="3,3" />
              <line x1="0" y1="190" x2="500" y2="190" stroke="#facc15" strokeWidth="1" strokeDasharray="3,3" />
              <text x="20" y="155" fill="#facc15" fontSize="10" fontWeight="bold">
                Metallimnion (Sprungschicht, 8–14m)
              </text>
              <text x="20" y="170" fill="#facc15" fontSize="8" fontFamily="monospace">
                Dramatischer Temperatursturz (20°C → 4°C, Sprung &gt; 1°C/m)
              </text>

              {/* 深水层 Hypolimnion (14 - 25m, y: 190 - 280) */}
              <rect
                x="0"
                y="190"
                width="500"
                height="90"
                fill="#020617"
                fillOpacity="0.8"
              />
              <text x="20" y="215" fill="#94a3b8" fontSize="10" fontWeight="bold">
                Hypolimnion (Zehrschicht, 14–25m)
              </text>
              <text x="20" y="230" fill="#94a3b8" fontSize="8" fontFamily="monospace">
                Konstant 4°C (Dichteanomalie des Wassers) · Lichtlos · Hoher O2-Zehr
              </text>

              {/* 沉底死亡有机碎屑雨 (Detritus-Regen) */}
              {phosphorusLevel > 30 && (
                <g>
                  {[80, 160, 240, 320, 400].map((x) => (
                    <line key={x} x1={x} y1="135" x2={x} y2="280" stroke="#475569" strokeWidth="1.5" strokeDasharray="2,5" />
                  ))}
                  <text x="250" y="250" textAnchor="middle" fill="#64748b" fontSize="8" fontStyle="italic">
                    Detritus-Regen (Abgestorbene Algen sinken ab)
                  </text>
                </g>
              )}

              {/* 湖底沉积层 (Sediment & Faulschlamm, y: 280 - 320) */}
              <rect
                x="0"
                y="280"
                width="500"
                height="40"
                fill={ecoStatus.hasSapropel ? "#000000" : "#451a03"}
              />
              <text x="20" y="302" fill={ecoStatus.hasSapropel ? "#ef4444" : "#d97706"} fontSize="9" fontWeight="bold">
                {ecoStatus.hasSapropel
                  ? "⚠️ Faulschlamm (Sapropel): Anaerobe Fäulnis & H2S-Bildung!"
                  : "Aerobes Sediment (Destruenten bauen Detritus mit O2 ab)"}
              </text>

              {/* 鱼类与生态状态 */}
              {ecoStatus.fishSurvival === "gut" ? (
                <text x="420" y="100" fontSize="16">🐟 🐟</text>
              ) : ecoStatus.fishSurvival === "bedroht" ? (
                <text x="420" y="70" fontSize="16">⚠️ 🐟</text>
              ) : (
                <text x="420" y="55" fontSize="16">☠️ 🐟 (Kippen)</text>
              )}
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--gray)] pt-1">
            <span>
              {isDe
                ? `O2-Status Tiefenzone: ${ecoStatus.bottomO2} mg/L (${ecoStatus.fishSurvival})`
                : `深水层溶解氧：${ecoStatus.bottomO2} mg/L（鱼类存活：${ecoStatus.fishSurvival === "gut" ? "优良" : ecoStatus.fishSurvival === "bedroht" ? "濒危" : "窒息翻塘"}）`}
            </span>
          </div>
        </div>

        {/* 右侧：因果链推演与会考采分 (5 列) */}
        <div className="lg:col-span-5 flex flex-col gap-3 p-4 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs text-xs">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-3">
            <div>
              <span className="font-mono text-[var(--gray)] uppercase tracking-wider text-[10px]">
                {isDe ? "Ökologische Kausalkette" : "生态学因果连锁反应链"}
              </span>
              <h3 className="text-base font-bold text-[var(--ink)] mt-0.5">
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
            <div className="p-2 rounded bg-[var(--paper-subtle)]/60 border border-[var(--line)]/60">
              <span className="font-bold text-teal-700 dark:text-teal-300">1. Überdüngung (Eutrophierung):</span>
              <p className="mt-0.5">
                {isDe
                  ? "Phosphat ist der Minimumfaktor. Ein Überangebot führt zur Massenvermehrung von Phytoplankton (Algenblüte)."
                  : "磷酸盐是天然湖泊的限制性因子。农田化肥流失导致水中磷过剩，引发蓝藻与绿藻几何级数暴发（水华）。"}
              </p>
            </div>

            <div className="p-2 rounded bg-[var(--paper-subtle)]/60 border border-[var(--line)]/60">
              <span className="font-bold text-sky-700 dark:text-sky-300">2. Lichtmangel & Absterben:</span>
              <p className="mt-0.5">
                {isDe
                  ? "Die trübe Algenschicht absorbiert das Sonnenlicht; tiefere Makrophyten sterben mangels Licht ab."
                  : "密集的藻华遮蔽阳光直射，导致中深层水生植物失去光合能力，大量枯萎沉降。"}
              </p>
            </div>

            <div className="p-2 rounded bg-[var(--paper-subtle)]/60 border border-[var(--line)]/60">
              <span className="font-bold text-amber-700 dark:text-amber-300">3. Massive Sauerstoffzehrung:</span>
              <p className="mt-0.5">
                {isDe
                  ? "Aerobe Destruenten (Bakterien) zersetzen den Detritus-Regen im Hypolimnion und verbrauchen dabei den gesamten Sauerstoff."
                  : "深水层好氧细菌剧烈分解如雨点般下沉的死亡藻类残体，耗尽深层所有储备溶解氧（O₂ $\to$ 0）。"}
              </p>
            </div>

            <div className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-900 dark:text-red-200">
              <span className="font-bold">4. Anaerobe Fäulnis & Umkippen:</span>
              <p className="mt-0.5">
                {isDe
                  ? "Anaerobe Bakterien übernehmen die Zersetzung. Es entstehen giftige Gase (H2S, NH3, CH4) und schwarzer Faulschlamm (Sapropel) – Fische ersticken."
                  : "缺氧使厌氧细菌接管分解，生成剧毒硫化氢（H₂S）、氨气与沼气，形成黑臭腐泥（Sapropel），底栖生物与鱼类大面积窒息死亡。"}
              </p>
            </div>
          </div>

          {/* 会考得分锦囊 */}
          <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)] leading-relaxed">
            <span className="font-bold text-[var(--accent)] block mb-0.5">
              {isDe ? "✍️ Klausur-Tipp (Abitur NRW):" : "✍️ 北威州会考采分得分要领："}
            </span>
            <p>
              {isDe
                ? "Unterscheiden Sie zwingend zwischen epilimnischer Sauerstoffübersättigung (durch Algen-Fotosynthese) und hypolimnischem Sauerstoffmangel (durch bakterielle Zehrung)!"
                : "作答时必须严密区分：富营养化湖泊在夏季‘表水层光合过饱和富氧’与‘深水层细菌分解绝对缺氧’的双极矛盾现象！"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
