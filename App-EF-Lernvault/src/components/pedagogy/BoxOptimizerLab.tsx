// BoxOptimizerLab — G1 Brilliant-Workbench: 铁皮最优化折叠盒与导数极值分析
// 纯净学术工坊风格：工程毫米方格绘图图纸、精准微积分极值标注与考纲三步求导法
import { useState } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export function BoxOptimizerLab({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [cut, setCut] = useState<number>(3.3); // 剪裁边长 x (0 - 9.5 cm)
  const a = 20; // 铁皮边长 20 cm
  const vol = Math.max(0, cut * Math.pow(a - 2 * cut, 2));
  const optimalX = a / 6; // ~3.33 cm
  const maxVol = optimalX * Math.pow(a - 2 * optimalX, 2); // ~592.6 cm³

  // 坐标映射：x 轴 0..10 映射到 svg 30..220；V 轴 0..650 映射到 svg 125..20
  const curX = 30 + (cut / 10) * 190;
  const curY = 125 - (vol / 650) * 105;
  const optX = 30 + (optimalX / 10) * 190;
  const optY = 125 - (maxVol / 650) * 105;

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      {/* 左侧 50% 二维展开与折叠网格 */}
      <section className="flex flex-col rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 lg:w-1/2">
        <div className="mb-3 flex items-center justify-between border-b border-[var(--line)] pb-2.5">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              {de ? "Blech-Zuschnitt (Netz 20×20 cm)" : "铁皮剪裁与折叠样纸（20×20 cm）"}
            </h4>
            <span className="font-mono text-[10px] text-[var(--gray)]">
              {de ? "Quadratische Ecken ausschneiden" : "四角切除正方形并向上折叠"}
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-[#2563eb]">
            x = {cut.toFixed(2)} cm
          </span>
        </div>

        {/* 绘图台画布 */}
        <div className="relative flex items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-3">
          <svg viewBox="0 0 200 200" className="h-48 w-48 select-none">
            <defs>
              <pattern id="box-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" className="text-[var(--line)]" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="200" height="200" fill="url(#box-grid)" />

            {/* 铁皮外轮廓 20x20cm 映射为 160x160px */}
            <rect
              x="20"
              y="20"
              width="160"
              height="160"
              fill="rgba(0,0,0,0.02)"
              stroke="var(--ink)"
              strokeWidth="1.2"
            />

            {/* 四角切除区域 (随 x 动态变大，使用柔和红赭网状虚线) */}
            {(() => {
              const c = (cut / 10) * 80;
              return (
                <>
                  <rect x="20" y="20" width={c} height={c} fill="rgba(180, 83, 9, 0.08)" stroke="#b45309" strokeDasharray="3 2" strokeWidth="1" />
                  <rect x={180 - c} y="20" width={c} height={c} fill="rgba(180, 83, 9, 0.08)" stroke="#b45309" strokeDasharray="3 2" strokeWidth="1" />
                  <rect x="20" y={180 - c} width={c} height={c} fill="rgba(180, 83, 9, 0.08)" stroke="#b45309" strokeDasharray="3 2" strokeWidth="1" />
                  <rect x={180 - c} y={180 - c} width={c} height={c} fill="rgba(180, 83, 9, 0.08)" stroke="#b45309" strokeDasharray="3 2" strokeWidth="1" />

                  {/* 折痕中心底面 */}
                  <rect
                    x={20 + c}
                    y={20 + c}
                    width={Math.max(0, 160 - 2 * c)}
                    height={Math.max(0, 160 - 2 * c)}
                    fill="rgba(37, 99, 235, 0.08)"
                    stroke="#2563eb"
                    strokeWidth="1.2"
                  />

                  {/* 尺寸标注 */}
                  <text x={20 + c / 2} y="15" textAnchor="middle" fill="#b45309" fontSize="9" fontFamily="monospace">x</text>
                  <text x="15" y={20 + c / 2} textAnchor="middle" fill="#b45309" fontSize="9" fontFamily="monospace">x</text>
                  <text x="100" y="105" textAnchor="middle" fill="var(--ink)" fontSize="9" fontFamily="monospace" opacity={c > 65 ? 0 : 1}>
                    {de ? "Grundfläche" : "底面"} (20-2x)²
                  </text>
                </>
              );
            })()}
          </svg>
        </div>

        {/* 剪裁滑杆 */}
        <div className="mt-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3">
          <div className="flex justify-between text-xs">
            <span className="font-mono text-[11px] text-[var(--gray)]">{de ? "Schnitttiefe x" : "切角边长 x"}</span>
            <span className="font-mono font-bold text-[#2563eb]">{cut.toFixed(2)} cm</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={9.8}
            step={0.05}
            value={cut}
            onChange={(e) => setCut(Number(e.target.value))}
            className="mt-2 h-1.5 w-full cursor-pointer accent-[var(--ink)]"
          />
          <div className="mt-1 flex justify-between font-mono text-[10px] text-[var(--gray)]">
            <span>0 cm</span>
            <span className="font-semibold text-[#b45309]">x* = 3,33 cm (Optimum)</span>
            <span>10 cm</span>
          </div>
        </div>
      </section>

      {/* 右侧 50% 体积函数曲线与考场求导 */}
      <section className="flex flex-col rounded-xl border border-[var(--line)] bg-[var(--surface)] p-4 lg:w-1/2">
        <div className="mb-3 flex items-center justify-between border-b border-[var(--line)] pb-2.5">
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              {de ? "Volumenfunktion V(x) in cm³" : "容积函数与导数极值曲线"}
            </h4>
            <span className="font-mono text-[10px] text-[var(--gray)]">
              V(x) = x · (20 - 2x)²
            </span>
          </div>
          <span className="font-mono text-xs font-bold text-[var(--ink)]">
            V = {vol.toFixed(1)} cm³ <span className="font-normal text-[var(--gray)]">({((vol / maxVol) * 100).toFixed(0)}%)</span>
          </span>
        </div>

        {/* 连续体积曲线图 */}
        <div className="relative flex items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--paper-subtle)] p-2">
          <svg viewBox="0 0 240 140" className="h-44 w-full select-none">
            <defs>
              <pattern id="curve-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" className="text-[var(--line)]" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="240" height="140" fill="url(#curve-grid)" />

            {/* 坐标轴与刻度 */}
            <line x1="30" y1="125" x2="230" y2="125" stroke="var(--ink)" strokeWidth="1" />
            <line x1="30" y1="15" x2="30" y2="125" stroke="var(--ink)" strokeWidth="1" />

            {/* 轴刻度文字 */}
            <text x="30" y="135" fill="var(--gray)" fontSize="8" fontFamily="monospace" textAnchor="middle">0</text>
            <text x="125" y="135" fill="var(--gray)" fontSize="8" fontFamily="monospace" textAnchor="middle">5</text>
            <text x="220" y="135" fill="var(--gray)" fontSize="8" fontFamily="monospace" textAnchor="middle">10 cm</text>
            <text x="25" y="25" fill="var(--gray)" fontSize="8" fontFamily="monospace" textAnchor="end">600</text>

            {/* V(x) 真实多项式取样路径 */}
            {(() => {
              const pts: string[] = [];
              for (let i = 0; i <= 40; i++) {
                const xi = (i / 40) * 10;
                const vi = Math.max(0, xi * Math.pow(20 - 2 * xi, 2));
                const sx = 30 + (xi / 10) * 190;
                const sy = 125 - (vi / 650) * 105;
                pts.push(`${i === 0 ? "M" : "L"} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
              }
              return (
                <path
                  d={pts.join(" ")}
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.8"
                />
              );
            })()}

            {/* 极值顶点标注 */}
            <line x1={optX} y1="125" x2={optX} y2={optY} stroke="#b45309" strokeDasharray="2 2" strokeWidth="0.8" />
            <circle cx={optX} cy={optY} r="3" fill="#b45309" />
            <text x={optX + 5} y={optY - 4} fill="#b45309" fontSize="8" fontFamily="monospace" fontWeight="bold">
              Max: 592,6 cm³
            </text>

            {/* 当前 x 点的位置与垂线 */}
            <line x1={curX} y1="125" x2={curX} y2={curY} stroke="var(--ink)" strokeDasharray="2 2" strokeWidth="1" />
            <circle cx={curX} cy={curY} r="3.5" fill="var(--ink)" />
          </svg>
        </div>

        {/* 考场三步求导得分卡 */}
        <div className="mt-3 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-3 text-xs text-[var(--ink)]">
          <p className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--gray)]">
            {de ? "Klausur-Lösungsschritte (Abitur-Standard):" : "考场三步得分法（导数极值）："}
          </p>
          <div className="mt-2 space-y-1.5 font-mono text-[11px] leading-relaxed">
            <p>1. 目标函数：<MathHtml code="V(x) = x(20 - 2x)^2 = 4x^3 - 80x^2 + 400x" display={false} cacheKey="box-fx" /></p>
            <p>2. 一阶导数置零：<MathHtml code="V'(x) = 12x^2 - 160x + 400 = 0 \implies x^* = \frac{20}{6} \approx 3{,}33\text{ cm}" display={false} cacheKey="box-deriv" /></p>
            <p>3. 二阶导数检验：<MathHtml code="V''(3{,}33) = 24(3{,}33) - 160 = -80 < 0 \implies \text{Hochpunkt (Max)}" display={false} cacheKey="box-sec-deriv" /></p>
          </div>
        </div>
      </section>
    </div>
  );
}
