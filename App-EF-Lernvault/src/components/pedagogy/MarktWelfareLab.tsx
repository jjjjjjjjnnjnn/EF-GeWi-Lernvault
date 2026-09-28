// MarktWelfareLab — G1 Brilliant-Workbench: 市场干预、福利几何与无谓损失沙盘
// 具备 4 栏紧凑 Tufte 仪表、透光几何多边形（CS/PS/DWL）与 AFB III 考场评价卡
import { useState } from "react";
import type { Lang } from "../../i18n";

export function MarktWelfareLab({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [minPrice, setMinPrice] = useState<number>(60); // 最低限价 P_min (20 - 100 EUR, 均衡价为 60)
  const [activeTab, setActiveTab] = useState<"anbieter" | "nachfrager">("anbieter");

  const eqP = 60;
  const eqQ = 40;

  // 供需函数: Qd = 100 - P, Qs = P - 20
  const isIntervention = minPrice > eqP;
  const qD = Math.max(0, 100 - minPrice);
  const qS = Math.max(0, minPrice - 20);
  const transactedQ = isIntervention ? qD : eqQ;
  const surplusSupply = isIntervention ? qS - qD : 0;

  // 福利计算
  const cs = Math.round(0.5 * (100 - minPrice) * qD);
  const ps = isIntervention
    ? Math.round((minPrice - (20 + (minPrice - 20) * (qD / qS))) * qD + 0.5 * (20 + (minPrice - 20) * (qD / qS) - 20) * qD)
    : Math.round(0.5 * (eqP - 20) * eqQ);
  const dwl = isIntervention ? Math.round(0.5 * (minPrice - (20 + qD)) * (eqQ - qD)) : 0;

  return (
    <div className="flex flex-col gap-5 lg:flex-row">
      {/* 左侧 58% 市场几何沙盘 */}
      <section className="flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:w-[58%]">
        {/* 顶部 4 栏 Tufte KPI 仪表 */}
        <div className="mb-3 grid grid-cols-4 gap-2 border-b border-[var(--line)] pb-3 text-center font-mono">
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2">
            <span className="text-[10px] text-[var(--gray)]">{de ? "Preis P" : "市场价格 P"}</span>
            <p className="mt-0.5 text-xs font-bold text-[var(--ink)]">{minPrice} €</p>
          </div>
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2">
            <span className="text-[10px] text-[var(--gray)]">CS 消费剩余</span>
            <p className="mt-0.5 text-xs font-bold text-[var(--ink)]">{cs} €</p>
          </div>
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2">
            <span className="text-[10px] text-[var(--gray)]">PS 生产剩余</span>
            <p className="mt-0.5 text-xs font-bold text-[var(--ink)]">{ps} €</p>
          </div>
          <div className="rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-2">
            <span className="text-[10px] text-[var(--gray)]">DWL 死重损失</span>
            <p className="mt-0.5 text-xs font-bold text-rose-700 dark:text-rose-400">{dwl} €</p>
          </div>
        </div>

        {/* 供需几何曲线 SVG */}
        <div className="overflow-hidden rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-2 dark:bg-[#18181b]">
          <svg viewBox="0 0 240 160" className="h-48 w-full select-none font-mono">
            {/* 毫米格坐标系背景 */}
            {[45, 75, 105].map((y) => (
              <line key={y} x1="30" y1={y} x2="225" y2={y} stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="text-[var(--line)] opacity-60" />
            ))}
            {[70, 110, 150, 190].map((x) => (
              <line key={x} x1={x} y1="15" x2={x} y2="135" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" className="text-[var(--line)] opacity-60" />
            ))}

            {/* 坐标轴 */}
            <line x1="30" y1="135" x2="225" y2="135" stroke="currentColor" strokeWidth="1" className="text-[var(--gray)]" />
            <line x1="30" y1="15" x2="30" y2="135" stroke="currentColor" strokeWidth="1" className="text-[var(--gray)]" />
            <text x="215" y="146" fill="currentColor" fontSize="8" className="text-[var(--gray)]">Q</text>
            <text x="14" y="22" fill="currentColor" fontSize="8" className="text-[var(--gray)]">P</text>

            {/* 供给曲线 S 与 需求曲线 D */}
            <line x1="30" y1="115" x2="190" y2="35" stroke="#2563eb" strokeWidth="1.8" />
            <line x1="30" y1="35" x2="190" y2="115" stroke="#b45309" strokeWidth="1.8" />
            <text x="195" y="38" fill="#2563eb" fontSize="9" fontWeight="bold">S</text>
            <text x="195" y="118" fill="#b45309" fontSize="9" fontWeight="bold">D</text>

            {/* 市场自发均衡点 (P*=60, Q*=40) */}
            <circle cx="110" cy="75" r="2.5" fill="currentColor" className="text-[var(--ink)]" />
            <line x1="110" y1="75" x2="110" y2="135" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" className="text-[var(--gray)]" />
            <line x1="30" y1="75" x2="110" y2="75" stroke="currentColor" strokeWidth="0.8" strokeDasharray="2 2" className="text-[var(--gray)]" />

            {/* 最低限价线 P_min */}
            {(() => {
              const yP = 135 - ((minPrice - 20) / 80) * 100;
              return (
                <>
                  <line x1="30" y1={yP} x2="215" y2={yP} stroke="#b91c1c" strokeWidth="1.2" strokeDasharray="3 2" />
                  <text x="175" y={yP - 4} fill="#b91c1c" fontSize="8" fontWeight="600">P_min = {minPrice}€</text>
                </>
              );
            })()}

            {/* 无谓损失阴影多边形 (DWL) */}
            {isIntervention && (
              <polygon
                points={`110,75 ${30 + (qD / 40) * 80},${135 - ((minPrice - 20) / 80) * 100} ${30 + (qD / 40) * 80},${135 - ((20 + qD - 20) / 80) * 100}`}
                fill="rgba(185, 28, 28, 0.15)"
                stroke="#b91c1c"
                strokeWidth="1"
              />
            )}
          </svg>
        </div>

        {/* 限价滑杆控制条 */}
        <div className="mt-4 rounded-md border border-[var(--line)] bg-[var(--paper-subtle)] p-3">
          <div className="flex justify-between text-xs font-mono">
            <span className="font-medium text-[var(--ink)]">{de ? "Mindestpreis P_min" : "国家干预最低限价 P_min"}</span>
            <span className="font-bold text-[var(--accent)]">{minPrice} €</span>
          </div>
          <input
            type="range"
            min={40}
            max={90}
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="mt-2 h-1 w-full cursor-pointer appearance-none rounded bg-[var(--line)] accent-[var(--ink)]"
          />
          <div className="mt-1.5 flex justify-between text-[10px] font-mono text-[var(--gray)]">
            <span>40 €</span>
            <span className="font-medium text-[var(--ink)]">60 € (P* 市场自发均衡)</span>
            <span>90 €</span>
          </div>
        </div>
      </section>

      {/* 右侧 42% AFB III 考场评价推演 */}
      <section className="flex flex-col justify-between rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:w-[42%]">
        <div>
          <div className="mb-2 text-xs font-mono uppercase tracking-wider text-[var(--gray)]">
            {de ? "AFB III: Urteilskompetenz" : "AFB III 考场评价双重视角"}
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("anbieter")}
              className={`rounded border p-2 text-xs font-medium transition ${
                activeTab === "anbieter"
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-xs"
                  : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              {de ? "Anbieter-Perspektive" : "供给方/企业视角"}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("nachfrager")}
              className={`rounded border p-2 text-xs font-medium transition ${
                activeTab === "nachfrager"
                  ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] shadow-xs"
                  : "border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              {de ? "Nachfrager-Perspektive" : "需求方/买方视角"}
            </button>
          </div>

          <div className="mt-4 flex-1 rounded border border-[var(--line)] bg-[var(--paper-subtle)] p-3.5 text-xs leading-relaxed text-[var(--ink)]">
            {activeTab === "anbieter" ? (
              <div>
                <p className="font-semibold text-[var(--ink)]">
                  {de ? "Vorteil vs. Absatzkrise:" : "超额利润 vs 滞销积压："}
                </p>
                <p className="mt-1 text-[var(--gray)]">
                  {isIntervention
                    ? `限价使价格上抬至 ${minPrice}€，但实际成交量被买方需求卡死在 ${transactedQ} 单位。产生了 ${surplusSupply} 单位的供给过剩（Angebotsüberschuss）。除非国家全额财政兜底收购，否则将导致高库存危机与资源错配！`
                    : "在自由市场均衡点 60€，供给量与需求量完全契合，没有滞销积压，市场配置效率最大化。"}
                </p>
              </div>
            ) : (
              <div>
                <p className="font-semibold text-[var(--ink)]">
                  {de ? "Wohlfahrtseinbuße der Konsumenten:" : "消费者剩余挤压与福利损失："}
                </p>
                <p className="mt-1 text-[var(--gray)]">
                  {isIntervention
                    ? `消费者必须支付高于市场自发价格的 ${minPrice}€，部分低预算买方被直接驱逐出市场（需求量缩减至 ${transactedQ}）。消费者剩余大幅缩水，产生红色的净社会福利无谓损失（DWL = ${dwl}€）！`
                    : "消费者按 60€ 支付，享受最大的消费者剩余空间，全社会总福利达到帕累托最优状态。"}
                </p>
              </div>
            )}

            <div className="mt-4 border-t border-[var(--line)] pt-2.5 text-[11px] text-[var(--gray)]">
              <span className="font-semibold text-[var(--ink)]">考场得分句：</span>
              <span>
                {isIntervention
                  ? " „Ein staatlicher Mindestpreis über dem Marktgleichgewicht verzerrt das Preissignal und verursacht einen Wohlfahrtsverlust (Deadweight Loss).“"
                  : " „Im Marktgleichgewicht stimmen Allokationseffizienz und soziale Gesamtwohlfahrt optimal überein.“"}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
