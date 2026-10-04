// RotationskoerperSim — 定积分立体旋转体与黎曼圆盘切片微元工坊 (Rotationskörper & Scheibenintegration)
// 依据微积分第一性原理与北威州高级文理中学 (Gymnasium Q1) Analysis 考纲标准设计
// 包含三大核心沉浸机制：
// 1. 🏺 3D 立体旋转母线与多模型库 (Kurven-Profile)：抛物面体 (Sektglas)、艺术花瓶 (Vase)、圆台 (Kegelstumpf)
// 2. 💽 黎曼圆盘微元切片逼近 (Scheiben-Integration): 拖动 N (4 -> 40)，观察离散薄圆盘如何逼近定积分极限 V = π ∫ [f(x)]² dx
// 3. 📝 北威州数学会考 Analysis 大题与 EHZ 评分细则

import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";

export interface RotationskoerperSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type ProfileModelId = "parabel" | "vase" | "kegel" | "exp";

export interface ProfileModel {
  id: ProfileModelId;
  nameDE: string;
  nameZH: string;
  formulaTex: string;
  fn: (x: number) => number;
  a: number; // 积分下限
  b: number; // 积分上限
  exactVolume: number; // 理论精确体积
  descDE: string;
  descZH: string;
}

export const PROFILE_MODELS: ProfileModel[] = [
  {
    id: "parabel",
    nameDE: "Paraboloid (Sektglas-Kelch)",
    nameZH: "抛物面体 (香槟酒杯)",
    formulaTex: "f(x) = \\sqrt{x}",
    fn: (x) => Math.sqrt(Math.max(0, x)),
    a: 0,
    b: 4,
    exactVolume: 8 * Math.PI, // 25.1327
    descDE: "Klassisches Abitur-Beispiel: f(x)=√x rotiert um die x-Achse. Stammfunktion F(x) = π·(x²/2).",
    descZH: "北威州数学会考经典题：f(x)=√x 绕 x 轴旋转，原函数为 F(x) = π·(x²/2)。"
  },
  {
    id: "vase",
    nameDE: "Design-Vase (Sinus-Kurve)",
    nameZH: "艺术花瓶体 (正弦波)",
    formulaTex: "f(x) = 0.5\\sin(x) + 1.5",
    fn: (x) => 0.5 * Math.sin(x) + 1.5,
    a: 0,
    b: 6,
    exactVolume: +(Math.PI * (2.25 * 6 - 1.5 * (Math.cos(6) - 1) + (6 / 8 - Math.sin(12) / 16))).toFixed(2), // 约 45.3
    descDE: "Organisch geschwungenes Gefäß: Veranschaulicht wellenförmige Querschnittsradien.",
    descZH: "波浪曲线旋转体：生动展示起伏半径变化与切片累加求和。"
  },
  {
    id: "kegel",
    nameDE: "Kegelstumpf (Linear)",
    nameZH: "圆台体 (线性母线)",
    formulaTex: "f(x) = 0.3x + 1",
    fn: (x) => 0.3 * x + 1,
    a: 0,
    b: 5,
    exactVolume: +(Math.PI * (0.09 * (125 / 3) + 0.3 * 25 + 5)).toFixed(2), // 约 50.79
    descDE: "Linear ansteigender Querschnitt. Vergleichbar mit der geometrischen Formel V = π/3·h·(R²+Rr+r²).",
    descZH: "线性增长截面：可直接与初等立体几何圆台体积公式相互验证！"
  },
  {
    id: "exp",
    nameDE: "Exponentialtrichter (Trompete)",
    nameZH: "指数号角体 (指数衰减)",
    formulaTex: "f(x) = 2.5 \\cdot e^{-0.4x}",
    fn: (x) => 2.5 * Math.exp(-0.4 * x),
    a: 0,
    b: 5,
    exactVolume: +(Math.PI * (6.25 / 0.8) * (1 - Math.exp(-0.8 * 5))).toFixed(2),
    descDE: "Exponentieller Trichter (Gabriel-Horn Typ): Schnelles Abklingen der Querschnittsflächen.",
    descZH: "指数漏斗型：截面面积随 x 快速衰减，微积分广义积分的前置模型。"
  }
];

export function RotationskoerperSim({ lang = "de", onExportFinding }: RotationskoerperSimProps) {
  const isDe = lang === "de";

  const [activeModelId, setActiveModelId] = useState<ProfileModelId>("parabel");
  const [sliceCount, setSliceCount] = useState<number>(8); // 切片数量 N: 4 - 40
  const [showWireframe, setShowWireframe] = useState<boolean>(true);
  const [tiltAngle, setTiltAngle] = useState<number>(20); // 3D 仰角视线

  const currentModel = useMemo(() => {
    return PROFILE_MODELS.find((m) => m.id === activeModelId) ?? PROFILE_MODELS[0];
  }, [activeModelId]);

  // 计算黎曼圆盘切片和 (Riemann-Summe der Scheiben)
  const calculation = useMemo(() => {
    const { a, b, fn, exactVolume } = currentModel;
    const dx = (b - a) / sliceCount;
    let approxVol = 0;
    const slices = [];

    for (let i = 0; i < sliceCount; i++) {
      const xi = a + i * dx;
      const xMid = xi + dx / 2;
      const r = fn(xMid);
      const dV = Math.PI * r * r * dx;
      approxVol += dV;
      slices.push({
        x: xi,
        xMid,
        dx,
        r,
        dV
      });
    }

    const approxRounded = +approxVol.toFixed(2);
    const errorPct = +Math.abs(((approxRounded - exactVolume) / exactVolume) * 100).toFixed(1);

    return {
      dx: +dx.toFixed(2),
      approxVol: approxRounded,
      exactVol: exactVolume,
      errorPct,
      slices
    };
  }, [currentModel, sliceCount]);

  const handleExport = () => {
    const text = isDe
      ? `Rotationskörper Analysis-Protokoll:\n- Modell: ${currentModel.nameDE} (${currentModel.formulaTex})\n- Intervall: [${currentModel.a}, ${currentModel.b}]\n- Exaktes Integral-Volumen V = π ∫ [f(x)]² dx: ${calculation.exactVol} VE\n- Riemann-Scheibensumme (N=${sliceCount}): ${calculation.approxVol} VE (Fehler: ${calculation.errorPct}%)\n- EHZ: Bei N->∞ konvergiert die Zylinderscheiben-Summe exakt gegen das bestimmte Integral.`
      : `定积分立体旋转体实验诊断报告：\n- 几何模型：${currentModel.nameZH}（母线方程 ${currentModel.formulaTex}）\n- 积分区间：[${currentModel.a}, ${currentModel.b}]\n- 精确微积分理论体积 V = π ∫ [f(x)]² dx：${calculation.exactVol} 体积单位\n- 黎曼圆盘切片求和 (N=${sliceCount})：${calculation.approxVol} 体积单位（相对误差：${calculation.errorPct}%）\n- 考点核心：当圆盘厚度 Δx->0 (N->∞) 时，有限柱体体积和严格收敛为定积分极限。`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs font-sans text-[var(--ink)]">
      {/* 顶部标题栏与模型切换 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-bold font-mono rounded bg-purple-500/10 text-purple-700 dark:text-purple-300 border border-purple-500/20">
              Mathematik Q1 · Integralrechnung
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Analysis: V = π · ∫ [f(x)]² dx</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "Rotationskörper & Scheibenintegration (3D-Studio)" : "立体旋转体体积：母线旋转与黎曼圆盘微元切片工坊"}
          </h2>
        </div>

        {/* 模型选择按钮 */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[var(--paper-subtle)] rounded-lg border border-[var(--line)] text-xs">
          {PROFILE_MODELS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActiveModelId(m.id)}
              className={`px-2.5 py-1 rounded transition-colors ${
                activeModelId === m.id
                  ? "bg-[var(--paper)] text-[var(--accent)] font-bold shadow-xs"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              {isDe ? m.nameDE : m.nameZH}
            </button>
          ))}
        </div>
      </div>

      {/* 切片数量 N 与 3D 视角滑块控制 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 bg-[var(--paper-subtle)]/50 rounded-xl border border-[var(--line)] text-xs">
        <div>
          <div className="flex justify-between items-center mb-1 font-semibold">
            <span>
              {isDe ? "Anzahl Riemann-Zylinderscheiben (N):" : "黎曼积分微元圆盘切片数 (N)："}
            </span>
            <span className="font-mono text-purple-700 dark:text-purple-300 font-bold">
              N = {sliceCount} Scheiben · Δx = {calculation.dx}
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="40"
            step="2"
            value={sliceCount}
            onChange={(e) => setSliceCount(Number(e.target.value))}
            className="w-full accent-purple-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-[var(--gray)] font-mono mt-0.5">
            <span>N=4 (Grob / Stufenform)</span>
            <span>N=16 (Gute Näherung)</span>
            <span>N=40 (Fast glatte Fläche)</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1 font-semibold">
              <span>{isDe ? "3D-Blickwinkel (Neigung):" : "3D 观察视线仰角："}</span>
              <span className="font-mono text-[var(--gray)]">{tiltAngle}°</span>
            </div>
            <input
              type="range"
              min="0"
              max="45"
              value={tiltAngle}
              onChange={(e) => setTiltAngle(Number(e.target.value))}
              className="w-full accent-[var(--accent)] cursor-pointer"
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <label className="flex items-center gap-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showWireframe}
                onChange={(e) => setShowWireframe(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              <span className="text-xs">{isDe ? "Drahtgitter" : "网格"}</span>
            </label>
            <button
              type="button"
              onClick={handleExport}
              className="px-2.5 py-1 text-xs rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)] transition-colors whitespace-nowrap"
            >
              {isDe ? "📥 Protokoll" : "📥 导出学报"}
            </button>
          </div>
        </div>
      </div>

      {/* 核心双视窗：左侧 3D 旋转体立体透视切片，右侧微积分理论与精度收敛 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：3D 真实旋转体切片透视 (7 列) */}
        <div className="lg:col-span-7 flex flex-col gap-2 p-4 bg-[var(--paper-subtle)]/40 rounded-xl border border-[var(--line)]">
          <div className="flex justify-between items-center text-xs text-[var(--gray)] font-mono">
            <span>Perspektivische 3D-Rotationsdarstellung</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">
              {currentModel.formulaTex} um x-Achse
            </span>
          </div>

          <div className="relative w-full aspect-16/11 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] p-2">
            <svg className="w-full h-full" viewBox="0 0 500 320">
              {/* x 轴中心对称线 (y = 160) */}
              <line x1="40" y1="160" x2="460" y2="160" stroke="var(--ink)" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.5" />
              <text x="465" y="164" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">x</text>

              {/* 绘制 N 个三维透视黎曼薄圆盘 */}
              {calculation.slices.map((slice, idx) => {
                // 投影坐标映射：
                // x: [0, currentModel.b] -> [60, 420]
                const xStart = 60 + (slice.x / currentModel.b) * 360;
                const xWidth = (slice.dx / currentModel.b) * 360;
                const radiusPx = slice.r * 28; // 半径像素高度
                const ry = radiusPx * Math.sin(((90 - tiltAngle) * Math.PI) / 180); // 椭圆短半轴

                return (
                  <g key={idx} className="transition-all duration-150">
                    {/* 圆盘圆柱柱身 */}
                    <rect
                      x={xStart}
                      y={160 - radiusPx}
                      width={xWidth}
                      height={radiusPx * 2}
                      fill="#8b5cf6"
                      fillOpacity={0.25 + (idx / sliceCount) * 0.35}
                      stroke={showWireframe ? "#7c3aed" : "none"}
                      strokeWidth="1"
                    />

                    {/* 圆盘右端椭圆截面 (透视展现立体厚度) */}
                    <ellipse
                      cx={xStart + xWidth}
                      cy={160}
                      rx={ry * 0.25}
                      ry={radiusPx}
                      fill="#7c3aed"
                      fillOpacity="0.6"
                      stroke="#6d28d9"
                      strokeWidth="1.2"
                    />
                  </g>
                );
              })}

              {/* 真实连续母线轮廓线 f(x) 与 -f(x) */}
              <path
                d={Array.from({ length: 50 }).reduce<string>((acc, _, i) => {
                  const xVal = currentModel.a + (i / 49) * (currentModel.b - currentModel.a);
                  const px = 60 + (xVal / currentModel.b) * 360;
                  const py = 160 - currentModel.fn(xVal) * 28;
                  return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
                }, "")}
                fill="none"
                stroke="#d97706"
                strokeWidth="2.5"
              />
              <path
                d={Array.from({ length: 50 }).reduce<string>((acc, _, i) => {
                  const xVal = currentModel.a + (i / 49) * (currentModel.b - currentModel.a);
                  const px = 60 + (xVal / currentModel.b) * 360;
                  const py = 160 + currentModel.fn(xVal) * 28;
                  return i === 0 ? `M ${px} ${py}` : `${acc} L ${px} ${py}`;
                }, "")}
                fill="none"
                stroke="#d97706"
                strokeWidth="2.5"
                strokeDasharray="4,2"
              />

              <text x="80" y="50" fill="#d97706" fontSize="10" fontWeight="bold">
                Rotierende Randkurve f(x)
              </text>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] text-[var(--gray)] pt-1">
            <span>
              {isDe
                ? `Scheibenradius r = f(x) · Einzelvolumen dV = π · [f(x)]² · Δx`
                : `单个微元薄圆盘半径 r = f(x)，微元体积 dV = π · [f(x)]² · Δx`}
            </span>
          </div>
        </div>

        {/* 右侧：定积分推导与误差收敛计算 (5 列) */}
        <div className="lg:col-span-5 flex flex-col gap-3 p-4 bg-[var(--paper)] rounded-xl border border-[var(--line)] shadow-xs text-xs">
          <div className="border-b border-[var(--line)] pb-3">
            <span className="font-mono text-[var(--gray)] uppercase tracking-wider text-[10px]">
              {isDe ? "Konvergenz & Fehleranalyse" : "定积分极限收敛与误差分析"}
            </span>
            <h3 className="text-base font-bold text-[var(--ink)] mt-0.5">
              {isDe ? currentModel.nameDE : currentModel.nameZH}
            </h3>
          </div>

          {/* 体积数值对比看板 */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-900 dark:text-purple-200">
              <span className="font-bold text-[10px] block opacity-80 uppercase">
                {isDe ? "Exaktes Integral (Theorie):" : "理论精确微积分值："}
              </span>
              <span className="text-lg font-mono font-bold">
                {calculation.exactVol} <span className="text-xs font-normal">VE</span>
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)] border border-[var(--line)]">
              <span className="font-bold text-[10px] text-[var(--gray)] block uppercase">
                {isDe ? `Riemann-Summe (N=${sliceCount}):` : `黎曼切片近似求和：`}
              </span>
              <span className="text-lg font-mono font-bold text-[var(--accent)]">
                {calculation.approxVol} <span className="text-xs font-normal">VE</span>
              </span>
            </div>
          </div>

          {/* 相对误差指示条 */}
          <div className="p-2.5 rounded-lg bg-[var(--paper-subtle)]/60 border border-[var(--line)]">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold">{isDe ? "Relativer Approximationsfehler:" : "切片近似相对误差："}</span>
              <span className={`font-mono font-bold ${calculation.errorPct < 2 ? "text-emerald-600" : "text-amber-600"}`}>
                {calculation.errorPct}% {calculation.errorPct < 2 ? "✓ Hochpräzise" : ""}
              </span>
            </div>
            <div className="w-full bg-[var(--line)] h-2 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${calculation.errorPct < 2 ? "bg-emerald-500" : "bg-amber-500"}`}
                style={{ width: `${Math.min(100, calculation.errorPct * 10)}%` }}
              />
            </div>
          </div>

          {/* 考前必背公式与采分点 */}
          <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200 leading-relaxed">
            <span className="font-bold block mb-0.5">
              {isDe ? "✍️ Abitur-Standardverfahren (NRW):" : "✍️ 北威州会考微积分必背标准解题步骤："}
            </span>
            <ol className="list-decimal list-inside space-y-0.5 text-[11px]">
              <li>
                {isDe
                  ? "Quadrierung der Randfunktion: [f(x)]² berechnen."
                  : "第一步：先求出母线函数的平方 [f(x)]²；"}
              </li>
              <li>
                {isDe
                  ? "Faktor π vor das Integral ziehen: V = π · ∫ [f(x)]² dx."
                  : "第二步：务必将圆周率常数 π 提到定积分号前面；"}
              </li>
              <li>
                {isDe
                  ? "Stammfunktion bestimmen und Hauptsatz (F(b) - F(a)) anwenden."
                  : "第三步：求原函数并代入上下限应用牛顿-莱布尼茨公式计算！"}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
