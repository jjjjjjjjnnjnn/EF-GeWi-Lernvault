// SowiDepotLecture — 经济视频微课《证券存托账户与委托类型》
// 遵循 Tufte Data-Ink / 探究式解释（Explorable Explanations）设计原则：
// 1. 彻底去除刺眼/发虚的黄色，采用深墨、海军蓝、砖红与森林绿的高对比度克制配色
// 2. 交互与动效内生于知识模型（滑块实时运算、走廊清算动画、订单簿撮合闪烁）
// 3. 严格对齐德语文理中学 Gymnasium 经济（SoWi / WiWi）会考核心考纲
import { useState, useEffect } from "react";
import type { Lang } from "../../i18n";
import { LectureTheatre, type LectureScene } from "./LectureTheatre";

// ============================================================================
// 幕 1: 储蓄危机与通胀剪刀差 (交互式时间轴滑块 + 实时动态计算)
// ============================================================================
function Scene1Stage({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [year, setYear] = useState(5); // 0 ~ 5 年
  const [animating, setAnimating] = useState(true);

  // 初次进入时平滑从 0 年演化至 5 年
  useEffect(() => {
    let start: number | null = null;
    let animId: number;
    const duration = 1400;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min(1, (ts - start) / duration);
      setYear(Number((progress * 5).toFixed(1)));
      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setAnimating(false);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const nominal = Math.round(10000 * Math.pow(1 + 0.005, year));
  const real = Math.round(10000 * Math.pow(1 - 0.025, year));
  const diff = nominal - real;

  return (
    <div className="flex flex-col justify-between gap-4 font-mono select-none">
      {/* 顶部交互滑块：让用户亲手拖动时间线体会购买力缩水 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)]/60 pb-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-[var(--ink)]">
            {de ? "Anlagehorizont:" : "投资时间维度:"}
          </span>
          <span className="font-bold text-[var(--ink)] bg-[var(--paper-subtle)] px-2 py-0.5 rounded border border-[var(--line)]">
            {year} {de ? "Jahre" : "年"}
          </span>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-56">
          <span className="text-[10px] text-[var(--gray)]">0 J.</span>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={year}
            onChange={(e) => {
              if (animating) setAnimating(false);
              setYear(parseFloat(e.target.value));
            }}
            className="w-full accent-[var(--ink)] cursor-pointer h-1.5 bg-[var(--line)] rounded-lg appearance-none"
          />
          <span className="text-[10px] text-[var(--gray)]">5 J.</span>
        </div>
      </div>

      {/* 双栏数字账簿：名义世界 vs 真实购买力 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* 名义账面 */}
        <div className="rounded border border-[var(--line)] bg-[var(--paper)] p-3.5">
          <div className="flex items-center justify-between text-xs text-[var(--gray)] mb-1">
            <span>{de ? "Nominaler Kontostand" : "银行账面名义金额"}</span>
            <span className="font-semibold text-blue-900">+0,5 % Zins</span>
          </div>
          <div className="text-2xl font-serif font-bold text-[var(--ink)]">
            {nominal.toLocaleString()} €
          </div>
          <div className="mt-2 text-[11px] text-[var(--gray)] leading-tight">
            {de
              ? `Zuwachs auf dem Papier: +${nominal - 10000} €`
              : `纸面收益增加: +${nominal - 10000} 欧元`}
          </div>
        </div>

        {/* 实际购买力 */}
        <div className="rounded border border-rose-300 bg-rose-50/70 p-3.5">
          <div className="flex items-center justify-between text-xs text-rose-950 mb-1">
            <span>{de ? "Reale Güter-Kaufkraft" : "扣除通胀实际购买力"}</span>
            <span className="font-bold text-rose-950">-3,0 % Inflation</span>
          </div>
          <div className="text-2xl font-serif font-bold text-rose-950">
            {real.toLocaleString()} €
          </div>
          <div className="mt-2 text-[11px] font-semibold text-rose-950 leading-tight">
            {de
              ? `Realer Kaufkraftverlust: -${10000 - real} € (-${((1 - real / 10000) * 100).toFixed(1)} %)`
              : `实际财富缩水: -${10000 - real} 欧元 (-${((1 - real / 10000) * 100).toFixed(1)} %)`}
          </div>
        </div>
      </div>

      {/* 5 年剪刀差走势图 (The Scissors Curve) */}
      <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-3">
        <div className="flex items-center justify-between text-xs text-[var(--gray)] mb-1">
          <span className="font-bold text-[var(--ink)]">
            {de ? "Die Inflationsschere im Zeitverlauf" : "通胀剪刀差演化曲线"}
          </span>
          <span className="text-rose-950 font-bold">
            {de ? `Kaufkraft-Schwund: -${diff} €` : `净亏损差额: -${diff} €`}
          </span>
        </div>

        <svg viewBox="0 0 460 110" className="w-full h-24">
          <line x1="30" y1="20" x2="430" y2="20" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="30" y1="55" x2="430" y2="55" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="3 3" />
          <line x1="30" y1="90" x2="430" y2="90" stroke="var(--ink)" strokeWidth="1" />

          {/* 剪刀差阴影 */}
          {year > 0 && (
            <polygon
              points={`30,55 ${30 + (year / 5) * 400},${55 - (year / 5) * 10} ${30 + (year / 5) * 400},${55 + (year / 5) * 32} 30,55`}
              fill="rgba(225, 29, 72, 0.1)"
            />
          )}

          {/* 名义走势线 */}
          <line
            x1="30"
            y1="55"
            x2={30 + (year / 5) * 400}
            y2={55 - (year / 5) * 10}
            stroke="#1d4ed8"
            strokeWidth="2"
          />
          <circle cx={30 + (year / 5) * 400} cy={55 - (year / 5) * 10} r="3.5" fill="#1d4ed8" />

          {/* 实际走势线 */}
          <line
            x1="30"
            y1="55"
            x2={30 + (year / 5) * 400}
            y2={55 + (year / 5) * 32}
            stroke="#991b1b"
            strokeWidth="2"
          />
          <circle cx={30 + (year / 5) * 400} cy={55 + (year / 5) * 32} r="3.5" fill="#991b1b" />

          {/* 刻度文字 */}
          {[0, 1, 2, 3, 4, 5].map((y) => (
            <text
              key={y}
              x={30 + (y / 5) * 400}
              y="104"
              fontSize="9"
              fill="var(--gray)"
              textAnchor="middle"
            >
              J.{y}
            </text>
          ))}
        </svg>
      </div>

      {/* 底部考点公式条 */}
      <div className="flex items-center justify-between border-t border-[var(--line)]/60 pt-2 text-[11px]">
        <span className="font-bold text-[var(--ink)]">
          {de ? "Kernaussage für die Klausur:" : "会考核心公式："}
        </span>
        <span className="font-bold text-rose-950">
          Realzins ≈ Nominalzins - Inflation = 0,5 % - 3,0 % = -2,5 % p.a.
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// 幕 2: 什么是 Wertpapierdepot (独立托管与清算走廊)
// ============================================================================
function Scene2Stage({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 45);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex flex-col justify-between gap-4 font-mono select-none">
      {/* 顶栏概念 */}
      <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2 text-xs">
        <span className="font-bold text-[var(--ink)]">
          {de ? "Zwei-Säulen-Architektur" : "银行业双支柱独立托管架构"}
        </span>
        <span className="text-[10px] text-[var(--gray)]">
          {de ? "Funktionstrennung" : "现金流与证券严格分立"}
        </span>
      </div>

      {/* 左右支柱与中间清算通道 */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 items-stretch text-xs">
        {/* 左柱 (2/5): Girokonto */}
        <div className="sm:col-span-2 rounded border border-[var(--line)] bg-[var(--paper)] p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-1">
              <span className="font-bold text-[var(--ink)]">GIROKONTO</span>
              <span className="text-[10px] text-[var(--gray)]">Liquidität</span>
            </div>
            <div className="mt-2 text-lg font-serif font-bold text-[var(--ink)]">1.250,00 €</div>
            <p className="mt-1 text-[11px] text-[var(--gray)] leading-tight">
              {de
                ? "Dient als Verrechnungskonto für Kaufabbuchungen und Gutschriften."
                : "日常往来账户，作为买卖证券的资金划转与清算通道。"}
            </p>
          </div>
          <div className="mt-3 rounded border border-[var(--line)] bg-[var(--surface)] p-1.5 text-[10px] text-[var(--gray)]">
            Einlagensicherung: Bis 100.000 € gesetzlich
          </div>
        </div>

        {/* 中间通道 (1/5): 清算动态 */}
        <div className="sm:col-span-1 flex flex-col items-center justify-center rounded border border-dashed border-[var(--line)] p-2 text-center text-xs">
          <span className="text-[10px] font-bold text-[var(--gray)]">CLEARING</span>
          <div className="my-2 flex flex-col items-center gap-1 text-[var(--ink)]">
            <span className="text-xs">➔</span>
            <div className="h-1 w-10 bg-[var(--line)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--ink)] transition-all duration-75"
                style={{ width: `${pulse}%` }}
              />
            </div>
            <span className="text-[9px] text-[var(--gray)]">Kaufauftrag</span>
          </div>
          <span className="text-[9px] text-emerald-950 font-bold">
            Dividenden ⬅
          </span>
        </div>

        {/* 右柱 (2/5): Wertpapierdepot */}
        <div className="sm:col-span-2 rounded border border-[var(--line)] bg-[var(--paper)] p-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-1">
              <span className="font-bold text-[var(--ink)]">DEPOT</span>
              <span className="text-[10px] font-bold text-emerald-950 bg-emerald-100/80 px-1 rounded">
                Sondervermögen
              </span>
            </div>
            <div className="mt-2 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-bold text-[var(--ink)]">10× MSCI World</span>
                <span className="text-[var(--gray)]">920 €</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className="font-bold text-[var(--ink)]">5× Siemens AG</span>
                <span className="text-[var(--gray)]">712 €</span>
              </div>
            </div>
          </div>
          <div className="mt-3 rounded border border-emerald-600/40 bg-emerald-50/90 p-1.5 text-[10px] font-bold text-emerald-950">
            [Sondervermögen] 100% geschützt bei Bankpleite (§ 92 KAGB)
          </div>
        </div>
      </div>

      {/* 底部矩阵对照 */}
      <div className="grid grid-cols-3 gap-2 border-t border-[var(--line)]/60 pt-2 text-[11px]">
        <div>
          <span className="text-[var(--gray)] block text-[10px]">Inhalt:</span>
          <span className="font-bold text-[var(--ink)]">Bargeld vs. Wertpapiere</span>
        </div>
        <div>
          <span className="text-[var(--gray)] block text-[10px]">Rechtsnatur:</span>
          <span className="font-bold text-[var(--ink)]">Forderung vs. Sondereigentum</span>
        </div>
        <div>
          <span className="text-[var(--gray)] block text-[10px]">Risiko:</span>
          <span className="font-bold text-[var(--ink)]">Kaufkraft vs. Marktkurs</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 幕 3: 规范开户流程 (三阶段合规阶梯)
// ============================================================================
function Scene3Stage({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [selectedStep, setSelectedStep] = useState(1);

  return (
    <div className="flex flex-col justify-between gap-3 font-mono select-none">
      <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2 text-xs">
        <span className="font-bold text-[var(--ink)]">
          {de ? "Verfahrensablauf & Compliance" : "开户实操合规三阶段"}
        </span>
        <span className="text-[10px] text-[var(--gray)]">§ Geldwäschegesetz (GWG)</span>
      </div>

      {/* 3 步横向/纵向进度选项卡 */}
      <div className="space-y-2">
        {/* 步骤 1 */}
        <div
          onClick={() => setSelectedStep(1)}
          className={`cursor-pointer rounded border p-2.5 transition ${
            selectedStep === 1
              ? "border-[var(--ink)] bg-[var(--surface)] shadow-2xs"
              : "border-[var(--line)] bg-[var(--paper)] opacity-70 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)]">
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--ink)] text-[10px] text-[var(--paper)]">
                1
              </span>
              <span>{de ? "Anbietervergleich" : "机构对比与费率甄别"}</span>
            </div>
            <span className="text-[10px] text-[var(--gray)]">Filialbank vs. Neobroker</span>
          </div>
          <p className="mt-1.5 text-[11px] text-[var(--gray)] leading-tight pl-6">
            {de
              ? "Orderprovisionen prüfen (0-1 € Neobroker vs. 15-30 € Filialbank) & Depotführungsgebühr beachten."
              : "对比交易佣金（网点银行单笔 15-30€ vs 新型互联网券商 0-1€）及年托管费。"}
          </p>
        </div>

        {/* 步骤 2 */}
        <div
          onClick={() => setSelectedStep(2)}
          className={`cursor-pointer rounded border p-2.5 transition ${
            selectedStep === 2
              ? "border-[var(--ink)] bg-[var(--surface)] shadow-2xs"
              : "border-[var(--line)] bg-[var(--paper)] opacity-70 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)]">
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--ink)] text-[10px] text-[var(--paper)]">
                2
              </span>
              <span>{de ? "Gesetzliche Legitimation (GWG)" : "法定实名认证 (反洗钱审查)"}</span>
            </div>
            <span className="text-[10px] text-[var(--gray)]">VideoIdent / PostIdent</span>
          </div>
          <p className="mt-1.5 text-[11px] text-[var(--gray)] leading-tight pl-6">
            {de
              ? "Verpflichtende Identitätsprüfung nach dem Geldwäschegesetz via Webcam oder Filiale der Deutschen Post."
              : "《反洗钱法》法定强制实名流程：通过视频连线核验护照全息防伪，或前往邮局柜台认证。"}
          </p>
        </div>

        {/* 步骤 3 */}
        <div
          onClick={() => setSelectedStep(3)}
          className={`cursor-pointer rounded border p-2.5 transition ${
            selectedStep === 3
              ? "border-[var(--ink)] bg-[var(--surface)] shadow-2xs"
              : "border-[var(--line)] bg-[var(--paper)] opacity-70 hover:opacity-100"
          }`}
        >
          <div className="flex items-center justify-between text-xs font-bold text-[var(--ink)]">
            <div className="flex items-center gap-2">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--ink)] text-[10px] text-[var(--paper)]">
                3
              </span>
              <span>{de ? "Freischaltung & Steuer-Setup" : "账户激活与免税额度申请"}</span>
            </div>
            <span className="text-[10px] text-[var(--gray)]">1.000 € Freibetrag</span>
          </div>
          <p className="mt-1.5 text-[11px] text-[var(--gray)] leading-tight pl-6">
            {de
              ? "Freistellungsauftrag einrichten: 1.000 € Sparer-Pauschbetrag pro Person steuerfrei nach § 20 EStG!"
              : "激活清算通道并配置免税额：单人每年 1.000 欧元资本利得免征德国预扣税（Abgeltungsteuer）。"}
          </p>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// 幕 4: 核心委托类型 · 市价单、限价单与止损单 (订单簿撮合实验)
// ============================================================================
function Scene4Stage({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [activeType, setActiveType] = useState<"market" | "limit" | "stop">("limit");
  const [tradeFlash, setTradeFlash] = useState(false);

  const triggerMatch = () => {
    setActiveType("market");
    setTradeFlash(true);
    setTimeout(() => setTradeFlash(false), 600);
  };

  return (
    <div className="flex flex-col justify-between gap-3 font-mono select-none">
      {/* 行情看板顶栏 */}
      <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2 text-xs">
        <div>
          <span className="font-bold text-[var(--ink)]">SIEMENS AG (SIE.DE)</span>
          <span className="ml-2 text-[var(--gray)]">XETRA</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-bold text-[var(--ink)]">142,50 €</span>
          <span className="text-[10px] text-[var(--gray)]">Spread: 0,20 €</span>
        </div>
      </div>

      {/* 订单簿深度梯级 */}
      <div className="rounded border border-[var(--line)] bg-[var(--paper)] p-2.5 text-xs">
        <div className="grid grid-cols-2 gap-3">
          {/* 买盘 (Bids) */}
          <div>
            <div className="flex justify-between text-[10px] text-[var(--gray)] border-b border-[var(--line)]/60 pb-1 mb-1">
              <span>GELD (BID)</span>
              <span>VOLUMEN</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-[#065f46] font-bold">
                <span>142,40 €</span>
                <span className="text-[var(--gray)]">1.500 Stk.</span>
              </div>
              <div className="flex justify-between text-[#065f46] font-bold">
                <span>142,00 €</span>
                <span className="text-[var(--gray)]">3.200 Stk.</span>
              </div>
              <div className="flex justify-between font-bold text-[var(--ink)] bg-[var(--surface)] px-1 rounded border border-[var(--line)]">
                <span>140,00 € (Limit)</span>
                <span>500 Stk.</span>
              </div>
            </div>
          </div>

          {/* 卖盘 (Asks) */}
          <div>
            <div className="flex justify-between text-[10px] text-[var(--gray)] border-b border-[var(--line)]/60 pb-1 mb-1">
              <span>BRIEF (ASK)</span>
              <span>VOLUMEN</span>
            </div>
            <div className="space-y-1">
              <div
                className={`flex justify-between font-bold transition ${
                  tradeFlash
                    ? "bg-rose-200 text-rose-950 px-1 rounded"
                    : "text-rose-950"
                }`}
              >
                <span>142,60 €</span>
                <span>{tradeFlash ? "AUSGEFÜHRT!" : "800 Stk."}</span>
              </div>
              <div className="flex justify-between text-rose-950 font-bold">
                <span>143,00 €</span>
                <span className="text-[var(--gray)]">2.100 Stk.</span>
              </div>
              <div className="flex justify-between text-[var(--gray)]">
                <span>143,50 €</span>
                <span>4.000 Stk.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 三大委托类型交互切换 */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <button
          onClick={triggerMatch}
          className={`rounded border p-2 text-left transition ${
            activeType === "market"
              ? "border-[var(--ink)] bg-[var(--surface)] shadow-2xs font-bold"
              : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)]"
          }`}
        >
          <div className="text-[11px] text-[var(--ink)]">1. {de ? "Billigst" : "市价单"}</div>
          <div className="text-[9px] text-[var(--gray)] leading-tight mt-0.5">
            {de ? "Sofort zum Ask (142,60 €)" : "立即以卖一价成交"}
          </div>
        </button>

        <button
          onClick={() => setActiveType("limit")}
          className={`rounded border p-2 text-left transition ${
            activeType === "limit"
              ? "border-[var(--ink)] bg-[var(--surface)] shadow-2xs font-bold"
              : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)]"
          }`}
        >
          <div className="text-[11px] text-[var(--ink)]">2. {de ? "Limit-Order" : "限价单"}</div>
          <div className="text-[9px] text-[var(--gray)] leading-tight mt-0.5">
            {de ? "Max. 140,00 € (Wartet)" : "最高140€ (挂单等待)"}
          </div>
        </button>

        <button
          onClick={() => setActiveType("stop")}
          className={`rounded border p-2 text-left transition ${
            activeType === "stop"
              ? "border-[var(--ink)] bg-[var(--surface)] shadow-2xs font-bold"
              : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)]"
          }`}
        >
          <div className="text-[11px] text-[var(--ink)]">3. {de ? "Stop-Loss" : "止损单"}</div>
          <div className="text-[9px] text-[var(--gray)] leading-tight mt-0.5">
            {de ? "Trigger bei 135,00 €" : "跌破135€触发止损"}
          </div>
        </button>
      </div>

      {/* 机制解读条 */}
      <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-2 text-[11px] text-[var(--gray)] leading-tight">
        {activeType === "market" && (
          <span>
            <strong className="text-[var(--ink)]">Billigst-Order:</strong> Führt zum
            nächstverfügbaren Preis im Orderbuch aus. Bei illiquidem Markt droht{" "}
            <span className="text-rose-950 font-bold">Slippage!</span>
          </span>
        )}
        {activeType === "limit" && (
          <span>
            <strong className="text-[var(--ink)]">Limit-Order:</strong> Schützt vor bösen
            Überraschungen. Kauf erfolgt nur, wenn Kurs ≤ Limit.
          </span>
        )}
        {activeType === "stop" && (
          <span>
            <strong className="text-[var(--ink)]">Stop-Loss-Order:</strong> Ruht unsichtbar. Fällt
            der Kurs auf 135 €, wird sofort ein Bestens-Verkauf ausgelöst.
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 幕 5: 投资不可能三角 (几何模型与资产映射)
// ============================================================================
function Scene5Stage({ lang }: { lang: Lang }) {
  const de = lang === "de";
  const [selectedAsset, setSelectedAsset] = useState<"giro" | "aktie" | "etf">("etf");

  return (
    <div className="flex flex-col justify-between gap-3 font-mono select-none">
      <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2 text-xs">
        <span className="font-bold text-[var(--ink)]">
          {de ? "Das Magische Dreieck der Vermögensanlage" : "投资不可能三角 (Magisches Dreieck)"}
        </span>
        <span className="text-[10px] text-[var(--gray)]">Abitur-Modell</span>
      </div>

      {/* 几何三角 SVG */}
      <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-2">
        <svg viewBox="0 0 420 160" className="w-full h-36">
          {/* 大三角 */}
          <polygon
            points="210,20 50,140 370,140"
            fill="var(--paper)"
            stroke="var(--ink)"
            strokeWidth="1.2"
          />

          {/* 顶点 1: 收益 */}
          <circle cx="210" cy="20" r="4.5" fill="var(--ink)" />
          <text x="210" y="11" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)">
            RENTABILITÄT
          </text>

          {/* 顶点 2: 安全 */}
          <circle cx="50" cy="140" r="4.5" fill="var(--ink)" />
          <text x="50" y="154" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)">
            SICHERHEIT
          </text>

          {/* 顶点 3: 流动性 */}
          <circle cx="370" cy="140" r="4.5" fill="var(--ink)" />
          <text x="370" y="154" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--ink)">
            LIQUIDITÄT
          </text>

          {/* 资产点位 */}
          {/* Tagesgeld */}
          <circle
            cx="210"
            cy="140"
            r={selectedAsset === "giro" ? "6" : "4"}
            fill={selectedAsset === "giro" ? "#1d4ed8" : "var(--gray)"}
            className="cursor-pointer"
            onClick={() => setSelectedAsset("giro")}
          />
          <text x="210" y="132" textAnchor="middle" fontSize="9" fill="var(--ink)" fontWeight="bold">
            Tagesgeld
          </text>

          {/* Einzelaktie */}
          <circle
            cx="140"
            cy="60"
            r={selectedAsset === "aktie" ? "6" : "4"}
            fill={selectedAsset === "aktie" ? "#991b1b" : "var(--gray)"}
            className="cursor-pointer"
            onClick={() => setSelectedAsset("aktie")}
          />
          <text x="140" y="52" textAnchor="middle" fontSize="9" fill="var(--ink)" fontWeight="bold">
            Einzelaktie
          </text>

          {/* MSCI World ETF (Zentrum) */}
          <circle
            cx="210"
            cy="95"
            r={selectedAsset === "etf" ? "7" : "5"}
            fill={selectedAsset === "etf" ? "#065f46" : "var(--ink)"}
            className="cursor-pointer"
            onClick={() => setSelectedAsset("etf")}
          />
          <text x="210" y="86" textAnchor="middle" fontSize="10" fill="#065f46" fontWeight="bold">
            Welt-ETF
          </text>
        </svg>
      </div>

      {/* 资产类别解析条 */}
      <div className="grid grid-cols-3 gap-2 text-xs">
        <button
          onClick={() => setSelectedAsset("giro")}
          className={`rounded border p-1.5 text-left transition ${
            selectedAsset === "giro"
              ? "border-[var(--ink)] bg-[var(--surface)] shadow-2xs font-bold"
              : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)]"
          }`}
        >
          <div className="text-[11px] text-[var(--ink)]">Tagesgeld</div>
          <div className="text-[9px] text-[var(--gray)]">Hohe Sicherheit, 0 Rendite</div>
        </button>

        <button
          onClick={() => setSelectedAsset("aktie")}
          className={`rounded border p-1.5 text-left transition ${
            selectedAsset === "aktie"
              ? "border-[var(--ink)] bg-[var(--surface)] shadow-2xs font-bold"
              : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)]"
          }`}
        >
          <div className="text-[11px] text-[var(--ink)]">Einzelaktie</div>
          <div className="text-[9px] text-[var(--gray)]">Hohe Rendite, Klumpenrisiko</div>
        </button>

        <button
          onClick={() => setSelectedAsset("etf")}
          className={`rounded border p-1.5 text-left transition ${
            selectedAsset === "etf"
              ? "border-emerald-700 bg-emerald-100/90 text-emerald-950 font-bold"
              : "border-[var(--line)] bg-[var(--paper)] text-[var(--gray)]"
          }`}
        >
          <div className="text-[11px] text-emerald-950 font-bold">Welt-ETF</div>
          <div className="text-[9px] text-emerald-900 font-medium">Der goldene Kompromiss</div>
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// 课程主入口
// ============================================================================
export function SowiDepotLecture({ lang }: { lang: Lang }) {
  const scenes: LectureScene[] = [
    // 幕 1
    {
      id: "sc-1-intro",
      titleDE: "Max' Geldkrise — Zinsen vs. Inflation",
      titleZH: "储蓄危机 · 名义负利率与通胀剪刀差",
      durationSecs: 8,
      badgeDE: "Problemaufriss",
      badgeZH: "问题缘起",
      narrationDE:
        "Hallo, ich bin Max! Auf meinem Sparkonto liegen 10.000 € Erspartes. Die Bank bietet mir mickrige 0,5 % Zinsen — doch im Alltag steigen die Preise mit 3,0 % Inflation. Auf dem Papier wächst mein Kontostand leicht an, aber meine reale Kaufkraft schmilzt Jahr für Jahr dahin. Wie funktioniert diese schleichende Geldentwertung?",
      narrationZH:
        "你好，我是 Max！我在银行储蓄账户里存了 10.000 欧元。银行给的名义利息仅有 0.5%，但在日常消费中，物价却以每年 3.0% 的通胀率攀升。账面数字看似在增加，但我能买到的实际商品却越来越少。这种‘隐形财富缩水’背后的经济学机制究竟是什么？",
      theory: {
        summaryDE:
          "In der Volkswirtschaftslehre unterscheidet man strikt zwischen nominalen Geldwerten und realer Güterkaufkraft. Wer die Inflation ignoriert, unterliegt der klassischen „Geldillusion“ (Money Illusion). Entscheidend für jeden Sparer und Anleger ist der Realzins nach Irving Fisher.",
        summaryZH:
          "在经济学中，必须严格区分名义货币面值（Nominalwert）与实际购买力（Kaufkraft）。如果仅看账面数字增加而忽视通胀，就会陷入经典的‘货币幻觉（Geldillusion）’。决定储蓄者实际财富增减的核心指标是欧文·费雪提出的实际利率。",
        keyPointsDE: [
          "Fisher-Gleichung: Realzins r ≈ Nominalzins i - Inflationsrate π. Bei i = 0,5 % und π = 3,0 % ergibt sich ein negativer Realzins von r ≈ -2,5 % pro Jahr.",
          "Geldillusion: Die psychologische Tendenz von Privathaushalten, Geld in rein nominalen Beträgen zu bewerten, anstatt in der Gütermenge, die man damit tatsächlich kaufen kann.",
          "Inflationsschere (The Scissors Effect): Während das Sparguthaben nominal langsam wächst, schrumpft die reale Güterkaufkraft exponentiell — nach 5 Jahren fehlen bereits über 1.100 € Kaufkraft.",
          "Geldpolitik der EZB: Das offizielle Inflationsziel der Europäischen Zentralbank liegt bei 2,0 % mittelfristig; liegt der Zins darunter, verliert uninvestiertes Bankguthaben kontinuierlich an Substanz.",
        ],
        keyPointsZH: [
          "费雪方程式：实际利率 r ≈ 名义利率 i - 通胀率 π。在名义利率 0.5%、通胀率 3.0% 时，实际利率为负 -2.5%/年。",
          "货币幻觉：居民往往只看到银行账户名义数字在微涨，却忽视了货币所能兑换的实际商品篮子正在萎缩的心理认知偏差。",
          "通胀剪刀差效应：名义账面微幅上涨，实际购买力却呈指数型向下脱钩；5 年后购买力净缩水将超过 1.100 欧元。",
          "欧洲央行（EZB）货币政策：中期通胀目标为 2.0%；只要商业银行存款利率低于通胀率，银行活期/定期存款就注定面临真实购买力缩水。",
        ],
        formulaOrRuleDE: "Klausur-Formel: Realzins ≈ Nominalzins - Inflationsrate (r ≈ i - π)",
        formulaOrRuleZH: "会考得分公式：实际利率 ≈ 名义利率 - 通胀率 (r ≈ i - π)",
      },
      renderStage: () => <Scene1Stage lang={lang} />,
      checkpoint: {
        questionDE: "Was beschreibt der Begriff „Reale Negativrendite“ im Kontext von Max' Ersparnissen?",
        questionZH: "在宏观经济与个人理财中，‘实际负收益率（Reale Negativrendite）’指的是什么？",
        options: [
          {
            id: "a",
            textDE: "Die Inflationsrate übersteigt den Nominalzins, wodurch die Kaufkraft real schrumpft",
            textZH: "通胀率高于名义存款利率，导致持有货币的实际购买力持续萎缩",
          },
          {
            id: "b",
            textDE: "Die Bank zieht heimlich Kontoführungsgebühren ohne Benachrichtigung ab",
            textZH: "商业银行无故扣除秘密账户管理费",
          },
          {
            id: "c",
            textDE: "Aktienkurse an der Börse fallen pauschal an jedem Handelstag",
            textZH: "股票交易所的所有股票在每个交易日全面无差别下跌",
          },
        ],
        correctId: "a",
        explainDE:
          "Realzins = Nominalzins - Inflationsrate. Wenn der Nominalzins 0 % beträgt und die Inflation 3 % frisst, beträgt der Realzins -3 %. Genau hierfür wird das Depot zur Anlagealternative.",
        explainZH:
          "实际利率 = 名义利率 - 通胀率。当名义利率接近 0% 而通胀达到 3% 时，资金在银行以每年 -3% 的速率实际缩水。因此建立投资组合成为必然选项。",
      },
    },

    // 幕 2
    {
      id: "sc-2-depot-concept",
      titleDE: "Girokonto vs. Wertpapierdepot",
      titleZH: "存托凭证账户 · 现金流与证券隔离体系",
      durationSecs: 8,
      badgeDE: "System-Architektur",
      badgeZH: "账户架构",
      narrationDE:
        "Wenn mein Girokonto Kaufkraft verliert, warum kaufe ich dann nicht einfach Aktien? Kann ich die nicht einfach auf mein Bankkonto buchen? Nein! Denn Aktien sind verbriefte Eigentumsanteile, kein Bargeld. Banken müssen Geld- und Wertpapierkreisläufe gesetzlich strikt voneinander trennen.",
      narrationZH:
        "既然活期账户持续缩水，那我为什么不直接买股票或 ETF？难道不能直接存在我的普通银行卡（Girokonto）里吗？绝对不行！因为股票是企业所有权凭证而不是法定现金。法律强制要求金融机构将现金流与证券存托实施物理与法律双重分立。",
      theory: {
        summaryDE:
          "Ein Bankguthaben auf dem Girokonto ist rechtlich gesehen kein Eigentum im Tresor, sondern eine schuldrechtliche Forderung (Darlehen) des Kunden an die Bank. Bei einer Bankinsolvenz haftet zunächst die gesetzliche Einlagensicherung bis 100.000 €. Ein Wertpapierdepot hingegen unterliegt dem Sondervermögen-Schutz nach § 92 KAGB.",
        summaryZH:
          "储蓄在法律层面并非存放在保险柜里的专属物，而是客户向银行提供的无担保债权。若银行破产，仅能由法定存款保障基金在 100.000 欧元限额内赔付。而证券存托账户中的资产依法属于‘独立特种资产（Sondervermögen）’，享有 100% 破产隔离保护。",
        keyPointsDE: [
          "Girokonto / Tagesgeld: Ist Buchgeld der Bank. Fällt bei einer Bankenpleite grundsätzlich in die Insolvenzmasse (geschützt nur bis 100.000 € gesetzlich nach § 4 EinSiG / EdB).",
          "Wertpapierdepot als Sondervermögen (§ 92 KAGB & DepotG): Aktien, ETFs und Fondsanteile bleiben zu 100 % Eigentum des Kunden. Die Bank ist lediglich Verwahrstelle (Treuhänder) und darf die Wertpapiere niemals zur Befriedigung eigener Gläubiger nutzen.",
          "Zwei-Säulen-Architektur: Ein Depot kann kein Bargeld halten. Käufe belasten das Verrechnungskonto (Referenzkonto), Verkäufe und Dividendenzuflüsse fließen dorthin zurück.",
        ],
        keyPointsZH: [
          "活期账户/通知存款：属于银行的账面资产。若银行破产，理论上列入破产清算财产，仅由《存款保障法》（§ 4 EinSiG）在最高 10 万欧元额度内法定兜底。",
          "存托账户作为特种资产（§ 92 KAGB & 德国《存托法》）：股票、ETF 和基金份额 100% 属于投资者个人所有权。银行仅为记名代管机构，破产清算人无权扣押变卖。",
          "双支柱结算走廊：存托账户本身不能直接存放流动现金。所有买入必须从绑定的清算账户（Verrechnungskonto）划转，卖出收益与股息也原路退回清算账户。",
        ],
        formulaOrRuleDE:
          "Klausur-Merksatz: Depotwerte = Sondervermögen (100 % insolvenzsicher nach § 92 KAGB). Giroguthaben = Gläubigerforderung (Einlagensicherung max. 100.000 € nach § 4 EinSiG).",
        formulaOrRuleZH:
          "会考得分准则：存托资产 = 特种财产（100% 破产隔离）；活期存款 = 普通银行债权（受限 10 万欧元法定保障）。",
      },
      renderStage: () => <Scene2Stage lang={lang} />,
      checkpoint: {
        questionDE: "Welche Funktion erfüllt das Verrechnungskonto (Referenzkonto) im Verhältnis zum Depot?",
        questionZH: "结算关联账户（Verrechnungskonto）与证券存托账户（Depot）之间是何种清算关系？",
        options: [
          {
            id: "a",
            textDE: "Über das Verrechnungskonto fließen die Barbeträge für Kauf und Verkauf der Wertpapiere",
            textZH: "所有买入与卖出股票的现金收付必须经由清算账户流转，证券留在存托账户",
          },
          {
            id: "b",
            textDE: "Aktien werden physisch als Urkunden per Post dorthin versendet",
            textZH: "股票凭证会被打印成实体纸质文件邮寄到该账户",
          },
          {
            id: "c",
            textDE: "Es verhindert gesetzlich jegliche Kursverluste an der Börse",
            textZH: "它由法律强制兜底，彻底消除股市一切下跌亏损风险",
          },
        ],
        correctId: "a",
        explainDE:
          "Richtig! Ein Depot kann kein Bargeld aufnehmen. Jeder Kauf belastet das Verrechnungskonto, Verkaufserlöse und Dividenden werden dort gutgeschrieben.",
        explainZH:
          "完全正确！存托账户只记录证券份额而不存储现金。买入扣款、卖出变现及股息派发全部实时结算至关联的清算现金账户上。",
      },
    },

    // 幕 3
    {
      id: "sc-3-three-steps",
      titleDE: "Drei Schritte zur Depoteröffnung",
      titleZH: "规范开户流程 · 机构筛选与身份认证体系",
      durationSecs: 8,
      badgeDE: "Verfahrensablauf",
      badgeZH: "操作合规",
      narrationDE:
        "Ein Depot eröffnet man heute per Smartphone in wenigen Minuten. Doch Vorsicht vor versteckten Gebühren! Und warum verlangen Banken zwingend meinen Ausweis vor der Webcam und meine Steuer-Identifikationsnummer? Dahinter stecken strenge gesetzliche Pflichten des Staates.",
      narrationZH:
        "如今用手机开通证券账户仅需几分钟。但不同机构的交易手续费相差数十倍！此外，为什么银行必须通过摄像头核对身份证原件，并要求登记个人的税号（Steuer-ID）？这背后有着极为严密的国家监管与反洗钱法规。",
      theory: {
        summaryDE:
          "Die Depoteröffnung verläuft in drei standardisierten Regelschritten: Kostenvergleich der Broker-Typen, gesetzliche Personenprüfung nach Geldwäschegesetz (GWG) und steuerliches Onboarding mit Freistellungsauftrag nach dem Einkommensteuergesetz (EStG).",
        summaryZH:
          "证券开户遵循严格的三级合规流程：券商费率体系横向尽调、反洗钱法（GWG）实名核验，以及资本利得税税控与免税额度（Freistellungsauftrag）申报。",
        keyPointsDE: [
          "Schritt 1: Broker-Kostenmodell vergleichen: Filialbanken (15–35 € pro Trade + Depotgebühr) vs. Direktbanken (moderat, breites Angebot) vs. Neobroker (0–1 € Fremdkostenpauschale, refinanzieren sich über PFOF - Payment for Order Flow).",
          "Schritt 2: Gesetzliche Identifikation (§ 10 Geldwäschegesetz - GWG): Finanzinstitute sind gesetzlich verpflichtet, die Identität zweifelsfrei via VideoIdent (verschlüsselte Webkonferenz) oder PostIdent (in der Postfiliale) festzustellen.",
          "Schritt 3: Steuer-Setup & Freistellungsauftrag (§ 20 EStG): Kursgewinne und Dividenden unterliegen der Abgeltungsteuer (25 % + Soli 5,5 % = 26,375 %). Durch einen Freistellungsauftrag bleiben bis zu 1.000 € (Alleinstehende) bzw. 2.000 € (Ehepaare) pro Jahr steuerfrei.",
        ],
        keyPointsZH: [
          "第 1 步：券商佣金模式对比：传统网点银行（单笔 15–35 欧 + 账户保管费）vs 直销银行（中等费率、标的全面）vs 互联网新兴券商（单笔 0–1 欧，依靠订单流回扣 PFOF 盈利）。",
          "第 2 步：反洗钱法强制核验（§ 10 GWG）：金融机构必须执行严格的“了解你的客户（KYC）”原则，通过高清晰度视频认证（VideoIdent）或邮局实体网点（PostIdent）查验防伪证件。",
          "第 3 步：税务申报与免税申请（§ 20 EStG）：德国对股息与资本利得征收 25% 资本利得税（加团结附加税后为 26.375%）。开户时必须配置免税申请（Freistellungsauftrag），单身享有每年 1.000 欧元（夫妻 2.000 欧元）的合法免税额度。",
        ],
        formulaOrRuleDE:
          "Klausur-Merksatz: Abgeltungsteuer = 25 % + 5,5 % Soli = 26,375 %. Sparer-Pauschbetrag per Freistellungsauftrag (§ 20 EStG): 1.000 € p.a. steuerfrei.",
        formulaOrRuleZH:
          "会考得分准则：资本利得税基准税率 26.375%；必须配置每年 1.000 欧元的储蓄者免税额（Freistellungsauftrag）。",
      },
      renderStage: () => <Scene3Stage lang={lang} />,
      checkpoint: {
        questionDE: "Warum ist bei der Depoteröffnung eine gesetzliche Identitätsprüfung (VideoIdent / PostIdent) zwingend vorgeschrieben?",
        questionZH: "开立证券存托账户时，为何法律强制要求必须进行身份认证（VideoIdent / PostIdent）？",
        options: [
          {
            id: "a",
            textDE: "Gesetzliche Pflicht nach dem Geldwäschegesetz (GWG) und zur steuerlichen Erfassung",
            textZH: "德国《反洗钱法》（GWG）法定实名监管要求，以及用于资本利得税申报核验",
          },
          {
            id: "b",
            textDE: "Damit Broker geheime Gebühren ohne Vorwarnung abbuchen können",
            textZH: "方便券商在不通知的情况下暗中扣收隐性佣金",
          },
          {
            id: "c",
            textDE: "Um Aktienkäufe grundsätzlich auf staatliche Unternehmen zu beschränken",
            textZH: "用于将投资标的强制限定在国有控股企业范围之内",
          },
        ],
        correctId: "a",
        explainDE:
          "Exakt! Finanzinstitute unterliegen strengen gesetzlichen Auflagen (Know Your Customer / Geldwäschegesetz). Erst nach verifizierter Legitimation darf das Depot freigeschaltet werden.",
        explainZH:
          "完全正确！金融托管机构受严格的反洗钱（GWG）与客户身份识别（KYC）法定监管约束。必须完成合法身份校验后，资金与托管通道才被准许激活。",
      },
    },

    // 幕 4
    {
      id: "sc-4-orders",
      titleDE: "Orderarten: Billigst, Limit & Stop-Loss",
      titleZH: "核心委托类型 · 市价单、限价单与止损单",
      durationSecs: 9,
      badgeDE: "Börsenmechanik",
      badgeZH: "撮合深度",
      narrationDE:
        "Wer an der Börse einfach auf 'Kaufen' klickt, kann eine böse Überraschung erleben! An der Börse Xetra treffen Kaufangebote (Geld / Bid) und Verkaufsangebote (Brief / Ask) im elektronischen Orderbuch aufeinander. Wer die falschen Orderzusätze wählt, riskiert teure Ausführungsfehler.",
      narrationZH:
        "在证券交易所如果只是随手点击‘买入’，可能会遭遇严重的买贵爆亏！在德意志交易所 Xetra 系统中，买方报价（Geld / Bid）与卖方报价（Brief / Ask）在公开订单簿中实时撮合。如果不懂委托风控机制，极易因滑点遭受重大亏损。",
      theory: {
        summaryDE:
          "Die Börse funktioniert nach dem Auktionsprinzip mit strenger Preis-Zeit-Priorität: Kaufaufträge mit dem höchsten Preis und Verkaufsaufträge mit dem niedrigsten Preis werden zuerst bedient. Bei gleichem Preis entscheidet der Zeitpunkt der Orderaufgabe.",
        summaryZH:
          "现代电子交易所遵循严格的‘价格优先、时间优先（Preis-Zeit-Priorität）’连续竞价规则：出价最高的买单与要价最低的卖单享有优先撮合权；报价相同时按挂单时间先后排队。",
        keyPointsDE: [
          "Spread (Geld-Brief-Spanne): Differenz zwischen dem niedrigsten Verkaufspreis (Brief / Ask) und dem höchsten Kaufpreis (Geld / Bid). Zu Xetra-Haupthandelszeiten (9:00–17:30 Uhr) ist der Spread minimal.",
          "Billigst / Bestens (Market Order): Garantiert sofortige Ausführung, birgt jedoch in volatilen oder marktarmen Phasen extremes Slippage-Risiko (Ausführung zu unkontrollierten Preisen).",
          "Limit-Order (Kauf- / Verkaufslimit): Setzt einen Maximalpreis beim Kauf bzw. Mindestpreis beim Verkauf fest. Schützt vor bösen Überraschungen, birgt jedoch das Risiko der Nicht- oder Teilausführung.",
          "Stop-Loss-Order: Ruht im Handelssystem. Fällt der Kurs auf oder unter die Stop-Marke, wird der Auftrag automatisch zu einer unlimitierten Market-Order umgewandelt (Vorsicht vor Fehlausbrüchen).",
        ],
        keyPointsZH: [
          "买卖价差（Spread）：最低卖价（Brief / Ask）与最高买价（Geld / Bid）之间的差额。在 Xetra 核心交易时段（早 9 点至下午 5 点半）市场流动性最充沛，价差最窄。",
          "市价单（Billigst/Bestens）：不设价格上限的即时买入/卖出委托。保证 100% 撮合成交，但在市场流动性骤降时存在巨大的滑点风险（Slippage）。",
          "限价单（Limit-Order）：设定最高买入上限价或最低卖出下限价。完全杜绝不可控价格风险，但若价格未能触及限价，可能无法成交或部分成交。",
          "止损单（Stop-Loss-Order）：作为防御性策略在后台静默运行。一旦价格跌穿止损触发价，立刻转为市价单强制割肉，防止本金发生灾难性巨亏。",
        ],
        formulaOrRuleDE:
          "Klausur-Merksatz: Limit-Order = Preisschutz (keine Ausführungsgarantie). Market-Order = Ausführungsgarantie (kein Preisschutz, Slippage-Gefahr).",
        formulaOrRuleZH:
          "会考得分准则：限价单保价格（不保成交）；市价单保成交（不保价格，存在滑点风险）。",
      },
      renderStage: () => <Scene4Stage lang={lang} />,
      checkpoint: {
        questionDE: "Welches Risiko geht ein Anleger ein, wenn er eine Verkaufs-Order mit dem Zusatz „Bestens“ (Market Order) erteilt?",
        questionZH: "当投资者在股市发出无附加限制的‘市价卖单（Bestens-Order）’时，将面临何种典型风险？",
        options: [
          {
            id: "a",
            textDE: "In illiquiden Marktphasen wird die Aktie zu einem unerwartet niedrigen Spottpreis ausgeführt",
            textZH: "在市场流动性匮乏或闪崩时，可能被撮合在极其低廉的‘地板价’割肉甩卖",
          },
          {
            id: "b",
            textDE: "Die Börse behält die Aktien ein und verweigert die Auszahlung des Geldes",
            textZH: "证券交易所将强行扣押该股票并拒绝向结算账户转账",
          },
          {
            id: "c",
            textDE: "Der Auftrag wird automatisch für 365 Tage blockiert",
            textZH: "该订单将被系统强制锁定冻结 365 天不可撤回",
          },
        ],
        correctId: "a",
        explainDE:
          "Sehr wichtig! 'Bestens' bedeutet sofortige Ausführung zum nächstbesten Preis im Orderbuch. Wenn das Orderbuch leer ist, kann der Verkaufspreis weit unter dem fairen Wert liegen. Daher empfiehlt sich stets ein Limit!",
        explainZH:
          "极其核心的考场风控得分点！市价卖单意味着‘无论对方出价多低，立即全部成交’。若遇买盘撤单或流动性断裂，成交价将被打穿。规范操作中应始终设定最低卖出限价（Verkaufslimit）！",
      },
    },

    // 幕 5
    {
      id: "sc-5-summary",
      titleDE: "Klausur-Erkenntnis: Das magische Dreieck",
      titleZH: "会考要点提炼 · 投资理财不可能三角体系",
      durationSecs: 7,
      badgeDE: "Synthese",
      badgeZH: "理论升华",
      narrationDE:
        "Zusammenfassend: Kein Investment der Welt vereint hohe Rendite, absolute Sicherheit und ständige Liquidität. Das 'Magische Dreieck' zeigt die unüberwindbaren Zielkonflikte jeder Anlageform.",
      narrationZH:
        "总结归纳：世界上没有任何理财产品能同时占尽‘高收益、绝对安全、随时变现’。著名的‘投资理财不可能三角’揭示了所有资产类别之间永恒的竞争性目标冲突。",
      theory: {
        summaryDE:
          "Jede wirtschaftliche Vermögensentscheidung bewegt sich in einem dreidimensionalen Spannungsfeld konkurrierender Ziele: Rentabilität (Ertrag / Zinsen / Kursgewinne), Sicherheit (Erhalt des eingesetzten Kapitals) und Liquidität (Verfügbarkeit des Geldes ohne Zeitverlust und Wertabschlag).",
        summaryZH:
          "任何经济投资决策都必须在三个相互排斥的目标极点中权衡取舍：收益性（Rentabilität）、安全性（Sicherheit）与流动性（Liquidität）。三者不可能同时达到最优。",
        keyPointsDE: [
          "Zielkonflikt 1 (Rentabilität vs. Sicherheit): Hohe Renditen sind ökonomisch immer die Prämie für das Tragen von Risiken (z. B. Einzelaktien mit Kurschwankungen und Insolvenzrisiko).",
          "Zielkonflikt 2 (Rentabilität vs. Liquidität): Langfristig gebundenes Kapital (z. B. Immobilien) erzielt oft Illiquiditätsprämien, kann aber nicht kurzfristig ohne Abschläge zu barem Geld gemacht werden.",
          "Zielkonflikt 3 (Sicherheit vs. Rentabilität bei Sparguthaben): Tagesgeld bietet hohe Sicherheit und tägliche Liquidität, erleidet jedoch durch Inflation eine garantierte reale Negativrendite.",
          "Der rationale Kompromiss: Breit gestreute Welt-ETFs (z. B. MSCI World mit 1.500+ Aktien aus 23 Ländern) kombinieren tägliche Börsenliquidität mit soliden historischen Marktrenditen (ca. 7 % p.a.) und minimieren das unsystematische Einzelwertrisiko durch maximale Diversifikation.",
        ],
        keyPointsZH: [
          "目标冲突 1（收益 vs 安全）：高收益在经济学本质上是对承担风险的补偿（例如个股承担破产归零与剧烈波动风险）。",
          "目标冲突 2（收益 vs 流动性）：长期锁定的资产（例如房地产）享有非流动性溢价，但在急需用钱时无法迅速变现。",
          "目标冲突 3（安全 vs 收益）：活期/通知存款具备高安全性和随时取现的流动性，但在通胀环境下必然遭遇实际购买力持续缩水。",
          "理性资产配置方案：全球分散的指数基金（如覆盖 23 个发达国家 1500 多家龙头企业的 MSCI World ETF），通过极致的分散化消除个股特异风险，以极低的持有费率捕获全球经济增长长期平均收益（约 7% 年化）。",
        ],
        formulaOrRuleDE:
          "Klausur-Merksatz: Magisches Dreieck = Drei konkurrierende Zieldimensionen (Rentabilität, Sicherheit, Liquidität). Kein Finanzprodukt kann alle drei Ziele maximieren!",
        formulaOrRuleZH:
          "会考核心结论：投资不可能三角（收益、安全、流动性）存在必然冲突；没有任何金融工具能同时最大化三项指标！",
      },
      renderStage: () => <Scene5Stage lang={lang} />,
      checkpoint: {
        questionDE: "Welcher Zielkonflikt des „Magischen Dreiecks der Vermögensanlage“ wird durch ein reines Girokonto am deutlichsten veranschaulicht?",
        questionZH: "纯储蓄账户（Girokonto）在‘投资理财不可能三角’中，最典型地牺牲了哪一个维度？",
        options: [
          {
            id: "a",
            textDE: "Hohe Sicherheit und hohe Liquidität bei nahezu vollständigem Verzicht auf Rentabilität",
            textZH: "具备高安全性与随时可支取的流动性，但几乎彻底牺牲了实际盈利能力（Rentabilität）",
          },
          {
            id: "b",
            textDE: "Hohe Rendite bei völligem Verlust der Einlagensicherung",
            textZH: "获得极高年化收益，但彻底失去了法定存款保障",
          },
          {
            id: "c",
            textDE: "Das Geld ist für 30 Jahre unwiderruflich gesperrt",
            textZH: "资金被不可撤销地锁定 30 年无法变现",
          },
        ],
        correctId: "a",
        explainDE:
          "Klassische Klausuraufgabe! Girokonten bieten tägliche Verfügbarkeit (Liquidität) und gesetzliche Einlagensicherung (Sicherheit), werfen jedoch reale Negativzinsen ab (fehlende Rentabilität).",
        explainZH:
          "经典会考原题思维！活期账户满足了即时消费（高流动性）与国家兜底（高安全性），但面对通胀其真实收益率为负（牺牲盈利性）。因此必须引入宽基投资组合。",
      },
    },
  ];

  return (
    <LectureTheatre
      lang={lang}
      courseTitleDE="Wertpapierdepot & Orderarten: Von Negativzinsen bis zur Orderbuch-Tiefe"
      courseTitleZH="证券存托账户与委托类型：从负利率困局到订单簿撮合深度"
      courseDescDE="Eine systematische Lehrstrecke von den makroökonomischen Ursachen der Realzinsfalle über die Trennung von Giro- und Wertpapierdepot (§ 92 KAGB / GWG) bis hin zu Xetra-Orderbuchmechanismen und dem magischen Anlagedreieck."
      courseDescZH="本微课涵盖德国经济学科考纲核心体系：从负利率与通胀剪刀差的宏观成因，到德国《资本投资法》（KAGB）与《反洗钱法》（GWG）监管下的存托分立体系，再到 Xetra 交易所订单簿撮合机制与投资理财不可能三角。"
      subject="SoWi"
      scenes={scenes}
    />
  );
}
