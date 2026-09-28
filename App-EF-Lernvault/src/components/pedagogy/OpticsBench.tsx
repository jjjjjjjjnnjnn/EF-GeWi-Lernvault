// OpticsBench — G1 Brilliant-Workbench: 斯涅尔光学台（折射、全反射与相干光波脉冲）
// 具备激光机芯转角、相干光脉冲流动、菲涅尔光强分配与 Tufte 纯净学术排版
import { useEffect, useRef, useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

interface MediumPreset {
  id: string;
  de: string;
  zh: string;
  n: number;
  color: string;
}

const PRESETS: MediumPreset[] = [
  { id: "luft", de: "Luft", zh: "空气", n: 1.0, color: "rgba(255,255,255,0.02)" },
  { id: "wasser", de: "Wasser", zh: "水", n: 1.33, color: "rgba(56,189,248,0.06)" },
  { id: "glas", de: "Glas", zh: "玻璃", n: 1.5, color: "rgba(99,102,241,0.09)" },
  { id: "diamant", de: "Diamant", zh: "金刚石", n: 2.42, color: "rgba(168,85,247,0.12)" },
];

const OX = 200;
const OY = 125;
const RAY_LEN = 110;
const QUIZ_CORRECT = 1;

export function OpticsBench({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [n1, setN1] = useState(1.5);
  const [n2, setN2] = useState(1.0);
  const [sliderVal, setSliderVal] = useState(55);
  const [dashOffset, setDashOffset] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setDashOffset((prev) => (prev - dt * 28) % 32);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const theta1 = Math.min(88, Math.max(1, (sliderVal / 100) * 88));
  const rad1 = (theta1 * Math.PI) / 180;

  const sinTheta2 = (n1 / n2) * Math.sin(rad1);
  const isTIR = sinTheta2 >= 1.0;
  const theta2 = isTIR ? null : (Math.asin(Math.min(0.9999, sinTheta2)) * 180) / Math.PI;
  const rad2 = theta2 === null ? 0 : (theta2 * Math.PI) / 180;
  const thetaC = n1 > n2 ? (Math.asin(n2 / n1) * 180) / Math.PI : null;

  const ix = OX - RAY_LEN * Math.sin(rad1);
  const iy = OY - RAY_LEN * Math.cos(rad1);
  const rx = OX + RAY_LEN * Math.sin(rad1);
  const ry = OY - RAY_LEN * Math.cos(rad1);
  const tx = OX + RAY_LEN * Math.sin(rad2);
  const ty = OY + RAY_LEN * Math.cos(rad2);

  const rPower = isTIR
    ? 100
    : Math.round(
        Math.pow((n1 * Math.cos(rad1) - n2 * Math.cos(rad2)) / (n1 * Math.cos(rad1) + n2 * Math.cos(rad2)), 2) *
          100
      );
  const tPower = isTIR ? 0 : 100 - rPower;

  const currentM1 = PRESETS.find((p) => Math.abs(p.n - n1) < 0.05) || PRESETS[2];
  const currentM2 = PRESETS.find((p) => Math.abs(p.n - n2) < 0.05) || PRESETS[0];

  const quizOpts = de
    ? [
        "Licht bricht zum Lot (Transmissionsstrahl bleibt erhalten)",
        "Totalreflexion: 100% Reflexion, kein Strahl dringt in Luft ein",
        "Licht läuft ohne Richtungsänderung geradlinig weiter",
      ]
    : [
        "向法线偏折（透射光束依然存在并增强）",
        "全反射：100% 反射，没有任何透射光折射入空气中",
        "光线不发生任何偏折，沿原直线穿透传播",
      ];

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* 左侧 60% 激光导轨视窗 */}
      <section className="flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:w-[60%]">
        <div className="mb-3 flex items-center justify-between border-b border-[var(--line)] pb-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--ink)]" />
            <h4 className="text-xs font-mono font-medium uppercase tracking-wider text-[var(--ink)]">
              {de ? "Snellius-Optikbank // Messung" : "Snellius 激光光学测角仪"}
            </h4>
          </div>
          {isTIR ? (
            <span className="flex items-center gap-1.5 rounded-sm border border-amber-300/40 bg-amber-500/10 px-2 py-0.5 text-xs font-mono font-medium text-amber-700 dark:text-amber-400">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              100% Totalreflexion
            </span>
          ) : (
            <span className="font-mono text-xs text-[var(--gray)]">
              θ₂ = {theta2?.toFixed(1)}° · T={tPower}% / R={rPower}%
            </span>
          )}
        </div>

        {/* 绘图台视窗：工程制图网格 (Graph Paper / Blueprint) */}
        <div className="overflow-hidden rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-1 dark:bg-[#18181b]">
          <svg viewBox="0 0 400 250" className="h-60 w-full select-none font-mono">
            {/* 毫米格坐标系参考底纹 */}
            {[50, 100, 150, 200].map((y) => (
              <line key={y} x1="10" y1={y} x2="390" y2={y} stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" className="text-[var(--line)] opacity-60" />
            ))}
            {[80, 140, 260, 320].map((x) => (
              <line key={x} x1={x} y1="10" x2={x} y2="240" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 4" className="text-[var(--line)] opacity-60" />
            ))}

            {/* 介质区域微着色 */}
            <rect x="0" y="0" width="400" height={OY} fill="currentColor" className="text-[var(--paper)] opacity-50" />
            <rect x="0" y={OY} width="400" height={250 - OY} fill="currentColor" className="text-[var(--paper-subtle)] opacity-80" />

            {/* 介质界面线与法线 */}
            <line x1="10" y1={OY} x2="390" y2={OY} stroke="currentColor" strokeWidth="1.2" className="text-[var(--gray)]" />
            <line x1={OX} y1="12" x2={OX} y2="238" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-[var(--gray)]" />
            <text x={OX + 6} y="22" fill="currentColor" fontSize="8" className="text-[var(--gray)]">Lot / 法线 (90°)</text>

            {/* 介质标度标签 */}
            <g transform="translate(16, 26)">
              <text x="0" y="0" fill="currentColor" fontSize="11" fontWeight="600" className="text-[var(--ink)]">
                {de ? currentM1.de : currentM1.zh}
              </text>
              <text x="0" y="14" fill="currentColor" fontSize="9" className="text-[var(--gray)]">
                n₁ = {n1.toFixed(2)}
              </text>
            </g>
            <g transform="translate(16, 218)">
              <text x="0" y="0" fill="currentColor" fontSize="11" fontWeight="600" className="text-[var(--ink)]">
                {de ? currentM2.de : currentM2.zh}
              </text>
              <text x="0" y="14" fill="currentColor" fontSize="9" className="text-[var(--gray)]">
                n₂ = {n2.toFixed(2)}
              </text>
            </g>

            {/* 入射角量角弧 */}
            <path
              d={`M ${OX} ${OY - 32} A 32 32 0 0 0 ${OX - 32 * Math.sin(rad1)} ${OY - 32 * Math.cos(rad1)}`}
              fill="none"
              stroke="#2563eb"
              strokeWidth="1.2"
            />
            <text x={OX - 44 * Math.sin(rad1 / 2) - 10} y={OY - 44 * Math.cos(rad1 / 2)} fill="#2563eb" fontSize="10" fontWeight="600">
              θ₁={theta1.toFixed(0)}°
            </text>

            {/* 折射角量角弧 */}
            {!isTIR && theta2 !== null && (
              <>
                <path
                  d={`M ${OX} ${OY + 32} A 32 32 0 0 1 ${OX + 32 * Math.sin(rad2)} ${OY + 32 * Math.cos(rad2)}`}
                  fill="none"
                  stroke="#059669"
                  strokeWidth="1.2"
                />
                <text x={OX + 44 * Math.sin(rad2 / 2) + 6} y={OY + 44 * Math.cos(rad2 / 2) + 4} fill="#059669" fontSize="10" fontWeight="600">
                  θ₂={theta2.toFixed(0)}°
                </text>
              </>
            )}

            {/* 入射光束：克制钴蓝 */}
            <line x1={ix} y1={iy} x2={OX} y2={OY} stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" />
            <line x1={ix} y1={iy} x2={OX} y2={OY} stroke="#ffffff" strokeWidth="1" strokeDasharray="5 10" strokeDashoffset={dashOffset} strokeLinecap="round" opacity="0.8" />

            {/* 精密金属激光管发射机 */}
            <g transform={`translate(${ix}, ${iy}) rotate(${theta1 - 90})`}>
              <rect x="-18" y="-7" width="22" height="14" rx="2" fill="currentColor" stroke="currentColor" strokeWidth="1" className="text-[var(--paper)] text-[var(--ink)]" />
              <rect x="4" y="-4" width="6" height="8" rx="1" fill="#2563eb" />
            </g>

            {/* 反射光束：克制暖琥珀 */}
            <line
              x1={OX}
              y1={OY}
              x2={rx}
              y2={ry}
              stroke={isTIR ? "#d97706" : "#2563eb"}
              strokeWidth={isTIR ? "2.5" : "1.4"}
              strokeOpacity={isTIR ? 1 : Math.max(0.2, rPower / 100)}
              strokeLinecap="round"
            />
            <line
              x1={OX}
              y1={OY}
              x2={rx}
              y2={ry}
              stroke="#ffffff"
              strokeWidth="1"
              strokeOpacity={isTIR ? 0.8 : 0.3}
              strokeDasharray="5 10"
              strokeDashoffset={-dashOffset}
              strokeLinecap="round"
            />

            {/* 折射光束：克制深翠绿 */}
            {!isTIR && theta2 !== null && (
              <>
                <line x1={OX} y1={OY} x2={tx} y2={ty} stroke="#059669" strokeWidth="2.2" strokeOpacity={Math.max(0.25, tPower / 100)} strokeLinecap="round" />
                <line x1={OX} y1={OY} x2={tx} y2={ty} stroke="#ffffff" strokeWidth="1" strokeOpacity="0.7" strokeDasharray="5 10" strokeDashoffset={dashOffset * 0.8} strokeLinecap="round" />
              </>
            )}

            {/* 界面入射点 */}
            <circle cx={OX} cy={OY} r="2.5" fill="currentColor" className="text-[var(--ink)]" />
          </svg>
        </div>

        {/* 角度滑杆控制条 */}
        <div className="mt-4 rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-3">
          <div className="flex justify-between text-xs font-mono">
            <span className="font-medium text-[var(--ink)]">
              {de ? "Einfallswinkel θ₁ (Grad)" : "入射角调节 θ₁"}
            </span>
            <span className="font-bold text-[var(--accent)]">{theta1.toFixed(1)}°</span>
          </div>
          <input
            type="range"
            min={1}
            max={88}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            className="mt-2 h-1 w-full cursor-pointer appearance-none rounded bg-[var(--line)] accent-[var(--ink)]"
          />
        </div>

        {/* 介质预设选择 */}
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="mb-1.5 font-mono text-[11px] text-[var(--gray)]">{de ? "Medium 1 (Oben)" : "上层介质 n₁"}</p>
            <div className="flex flex-wrap gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setN1(p.n)}
                  className={`rounded border px-2 py-1 text-xs transition ${
                    Math.abs(n1 - p.n) < 0.05
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-medium shadow-xs"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {de ? p.de : p.zh} ({p.n.toFixed(2)})
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1.5 font-mono text-[11px] text-[var(--gray)]">{de ? "Medium 2 (Unten)" : "下层介质 n₂"}</p>
            <div className="flex flex-wrap gap-1">
              {PRESETS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setN2(p.n)}
                  className={`rounded border px-2 py-1 text-xs transition ${
                    Math.abs(n2 - p.n) < 0.05
                      ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-medium shadow-xs"
                      : "border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {de ? p.de : p.zh} ({p.n.toFixed(2)})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 右侧 40% 快检与公式卡 */}
      <section className="flex flex-col gap-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:w-[40%]">
        <div className="rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-3 text-xs">
          <p className="font-mono font-medium text-[var(--ink)]">
            {de ? "Snellius-Brechungsgesetz" : "折射与全反射公式"}
          </p>
          <div className="my-2 rounded border border-[var(--line)] bg-[var(--surface)] p-2 text-center text-xs">
            <MathHtml
              code="n_1 \cdot \sin(\theta_1) = n_2 \cdot \sin(\theta_2)"
              display={false}
              cacheKey="prod-optics-snell"
            />
          </div>
          {thetaC !== null && (
            <p className="font-mono text-[11px] text-[var(--gray)]">
              {de ? `Kritischer Winkel θc = ${thetaC.toFixed(1)}°` : `临界角 θc = ${thetaC.toFixed(1)}°`}
            </p>
          )}
        </div>

        <div className="flex-1 rounded-md border border-[var(--line)] bg-[var(--surface)] p-3">
          <p className="text-xs font-medium text-[var(--ink)]">
            {de ? "Quick-Check: Glas nach Luft, θ₁ = 50°" : "随堂快检：玻璃射向空气，θ₁ = 50°"}
          </p>
          <div className="mt-3 space-y-1.5">
            {quizOpts.map((opt, i) => (
              <button
                key={i}
                onClick={() => setQuizAnswer(i)}
                className={`w-full rounded border p-2 text-left text-xs transition ${
                  quizAnswer === i
                    ? i === QUIZ_CORRECT
                      ? "border-emerald-600 bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 font-medium"
                      : "border-rose-600 bg-rose-500/10 text-rose-900 dark:text-rose-300"
                    : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)] hover:border-[var(--ink)]"
                }`}
              >
                <span className="font-mono font-bold">{String.fromCharCode(65 + i)}. </span>
                <span>{opt}</span>
              </button>
            ))}
          </div>

          {quizAnswer !== null && (
            <p className="mt-3 text-xs leading-relaxed text-[var(--gray)]">
              {quizAnswer === QUIZ_CORRECT
                ? (de ? "Richtig: 50° > θc (ca. 41,8°), daher tritt Totalreflexion ein." : "正确：50° 越过临界角 41.8°，发生全反射。")
                : (de ? "Falsch: Berechne θc = arcsin(1/1,5)." : "错误：请计算 θc = arcsin(1/1.50) ≈ 41.8°。")}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
