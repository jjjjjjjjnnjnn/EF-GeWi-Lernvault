// OrderbuchSimulator — Xetra 订单簿深度撮合与委托类型微实验
// 专为 Lernreise 研习步骤打造的紧凑型交互教具：
// 1. 杜绝整门微课的冗余嵌套，专精于 Xetra 撮合、市价滑点 (Slippage) 与止损单触发
// 2. 深度融入高中经济会考核心考点：Geld/Brief-Spanne (Spread), Ausführungsrisiko, Sondervermögen
import { useState } from "react";
import type { Lang } from "../../i18n";

export interface OrderRecord {
  id: string;
  type: "market" | "limit" | "stop";
  side: "buy" | "sell";
  amount: number;
  limitPrice?: number;
  stopPrice?: number;
  status: "filled" | "pending" | "triggered";
  executionPrice?: number;
  slippageCost?: number;
  messageDE: string;
  messageZH: string;
}

export function OrderbuchSimulator({ lang }: { lang: Lang }) {
  const de = lang === "de";

  // 当前所选委托类型
  const [orderType, setOrderType] = useState<"market" | "limit" | "stop">("limit");
  const [side, setSide] = useState<"buy" | "sell">("buy");
  const [shares, setShares] = useState<number>(1000);
  const [priceInput, setPriceInput] = useState<number>(142.5);
  const [lastOrder, setLastOrder] = useState<OrderRecord | null>(null);
  const [tradeFlash, setTradeFlash] = useState<boolean>(false);

  // 初始订单簿深度档位
  const [bids, setBids] = useState<{ price: number; volume: number }[]>([
    { price: 142.4, volume: 1500 },
    { price: 142.0, volume: 3200 },
    { price: 141.5, volume: 5000 },
  ]);

  const [asks, setAsks] = useState<{ price: number; volume: number }[]>([
    { price: 142.6, volume: 800 },
    { price: 143.0, volume: 2100 },
    { price: 143.8, volume: 4000 },
  ]);

  // 重置订单簿
  const handleReset = () => {
    setBids([
      { price: 142.4, volume: 1500 },
      { price: 142.0, volume: 3200 },
      { price: 141.5, volume: 5000 },
    ]);
    setAsks([
      { price: 142.6, volume: 800 },
      { price: 143.0, volume: 2100 },
      { price: 143.8, volume: 4000 },
    ]);
    setLastOrder(null);
  };

  // 提交并撮合订单
  const executeOrder = () => {
    setTradeFlash(true);
    setTimeout(() => setTradeFlash(false), 500);

    if (orderType === "market") {
      if (side === "buy") {
        // 市价买单（Billigst）：扫卖盘 Ask
        let remaining = shares;
        let totalCost = 0;
        const newAsks = asks.map((a) => ({ ...a }));
        const basePrice = asks[0]?.price ?? 142.6;

        for (let i = 0; i < newAsks.length && remaining > 0; i++) {
          const fill = Math.min(remaining, newAsks[i].volume);
          totalCost += fill * newAsks[i].price;
          newAsks[i].volume -= fill;
          remaining -= fill;
        }

        const avgPrice = totalCost / (shares - remaining);
        const slippage = (avgPrice - basePrice) * (shares - remaining);
        setAsks(newAsks.filter((a) => a.volume > 0));

        setLastOrder({
          id: Math.random().toString(36).substring(2, 7),
          type: "market",
          side: "buy",
          amount: shares - remaining,
          status: "filled",
          executionPrice: Number(avgPrice.toFixed(2)),
          slippageCost: Number(slippage.toFixed(2)),
          messageDE: `Billigst-Kauf ausgeführt! ${shares - remaining} Stk. zu Ø ${avgPrice.toFixed(2)} €.${
            slippage > 0 ? ` Achtung: Slippage betrug ${slippage.toFixed(2)} €!` : ""
          }`,
          messageZH: `市价买入成交！成交 ${shares - remaining} 股，加权均价 ${avgPrice.toFixed(2)} 欧元。${
            slippage > 0 ? ` ⚠️ 滑点劣变产生额外成本: ${slippage.toFixed(2)} 欧元！` : " 无滑点。"
          }`,
        });
      } else {
        // 市价卖单（Bestens）：砸买盘 Bid
        let remaining = shares;
        let totalRevenue = 0;
        const newBids = bids.map((b) => ({ ...b }));
        const basePrice = bids[0]?.price ?? 142.4;

        for (let i = 0; i < newBids.length && remaining > 0; i++) {
          const fill = Math.min(remaining, newBids[i].volume);
          totalRevenue += fill * newBids[i].price;
          newBids[i].volume -= fill;
          remaining -= fill;
        }

        const avgPrice = totalRevenue / (shares - remaining);
        const slippage = (basePrice - avgPrice) * (shares - remaining);
        setBids(newBids.filter((b) => b.volume > 0));

        setLastOrder({
          id: Math.random().toString(36).substring(2, 7),
          type: "market",
          side: "sell",
          amount: shares - remaining,
          status: "filled",
          executionPrice: Number(avgPrice.toFixed(2)),
          slippageCost: Number(slippage.toFixed(2)),
          messageDE: `Bestens-Verkauf ausgeführt! ${shares - remaining} Stk. zu Ø ${avgPrice.toFixed(2)} €.${
            slippage > 0 ? ` Slippage-Verlust: ${slippage.toFixed(2)} €!` : ""
          }`,
          messageZH: `市价卖出成交！成交 ${shares - remaining} 股，加权均价 ${avgPrice.toFixed(2)} 欧元。${
            slippage > 0 ? ` ⚠️ 砸盘滑点亏损: ${slippage.toFixed(2)} 欧元！` : ""
          }`,
        });
      }
    } else if (orderType === "limit") {
      const bestAsk = asks[0]?.price ?? 999;
      const bestBid = bids[0]?.price ?? 0;

      if (side === "buy") {
        if (priceInput >= bestAsk) {
          // 限价买且限价高于等于最佳卖价 -> 立即以最佳卖价成交
          const fillVol = Math.min(shares, asks[0].volume);
          const newAsks = [...asks];
          newAsks[0] = { ...newAsks[0], volume: newAsks[0].volume - fillVol };
          setAsks(newAsks.filter((a) => a.volume > 0));
          setLastOrder({
            id: Math.random().toString(36).substring(2, 7),
            type: "limit",
            side: "buy",
            amount: fillVol,
            status: "filled",
            executionPrice: bestAsk,
            messageDE: `Limit-Kauf (${priceInput.toFixed(2)} €) sofort zum Ask von ${bestAsk.toFixed(2)} € ausgeführt!`,
            messageZH: `限价买单（上限 ${priceInput.toFixed(2)} €）立即按当前卖一价 ${bestAsk.toFixed(2)} € 成交！`,
          });
        } else {
          // 挂单入买盘
          setBids([{ price: priceInput, volume: shares }, ...bids].sort((a, b) => b.price - a.price));
          setLastOrder({
            id: Math.random().toString(36).substring(2, 7),
            type: "limit",
            side: "buy",
            amount: shares,
            limitPrice: priceInput,
            status: "pending",
            messageDE: `Limit-Kauforder (${shares} Stk. à ${priceInput.toFixed(2)} €) ruht im Orderbuch. Schutz vor Überzahlung aktiv!`,
            messageZH: `限价买单（${shares} 股，限价 ${priceInput.toFixed(2)} €）已进入买盘挂单排队。价格保护生效，杜绝追高！`,
          });
        }
      } else {
        if (priceInput <= bestBid) {
          const fillVol = Math.min(shares, bids[0].volume);
          const newBids = [...bids];
          newBids[0] = { ...newBids[0], volume: newBids[0].volume - fillVol };
          setBids(newBids.filter((b) => b.volume > 0));
          setLastOrder({
            id: Math.random().toString(36).substring(2, 7),
            type: "limit",
            side: "sell",
            amount: fillVol,
            status: "filled",
            executionPrice: bestBid,
            messageDE: `Limit-Verkauf (${priceInput.toFixed(2)} €) sofort zum Bid von ${bestBid.toFixed(2)} € ausgeführt!`,
            messageZH: `限价卖单（底价 ${priceInput.toFixed(2)} €）立即按当前买一价 ${bestBid.toFixed(2)} € 成交！`,
          });
        } else {
          setAsks([{ price: priceInput, volume: shares }, ...asks].sort((a, b) => a.price - b.price));
          setLastOrder({
            id: Math.random().toString(36).substring(2, 7),
            type: "limit",
            side: "sell",
            amount: shares,
            limitPrice: priceInput,
            status: "pending",
            messageDE: `Limit-Verkaufsorder (${shares} Stk. à ${priceInput.toFixed(2)} €) ruht im Brief-Buch.`,
            messageZH: `限价卖单（${shares} 股，限价 ${priceInput.toFixed(2)} €）已进入卖盘排队挂单。`,
          });
        }
      }
    } else if (orderType === "stop") {
      // 止损单模拟
      const currentPrice = 142.5;
      const triggered = priceInput >= currentPrice;
      setLastOrder({
        id: Math.random().toString(36).substring(2, 7),
        type: "stop",
        side: "sell",
        amount: shares,
        stopPrice: priceInput,
        status: triggered ? "triggered" : "pending",
        messageDE: triggered
          ? `Stop-Loss bei ${priceInput.toFixed(2)} € ausgelöst! Order wandelte sich in unlimitierten Bestens-Verkauf um.`
          : `Stop-Loss bei ${priceInput.toFixed(2)} € aktiv scharfgeschaltet. Noch nicht ausgelöst (Aktueller Kurs: 142,50 €).`,
        messageZH: triggered
          ? `止损单在 ${priceInput.toFixed(2)} € 被触发！瞬间转化为无价格保护的市价卖单（Bestens）。`
          : `止损单（触发价 ${priceInput.toFixed(2)} €）已预埋监控。当前市价 142,50 € 尚未跌破。`,
      });
    }
  };

  const bestBid = bids[0]?.price ?? 142.4;
  const bestAsk = asks[0]?.price ?? 142.6;
  const spread = Number((bestAsk - bestBid).toFixed(2));

  return (
    <div className="font-sans text-[var(--ink)] space-y-4">
      {/* 顶部行情与机制徽章 */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2.5 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[var(--ink)]">XETRA // SIEMENS AG (SIE.DE)</span>
          <span className="text-[10px] text-[var(--gray)] bg-[var(--paper-subtle)] px-1.5 py-0.5 rounded border border-[var(--line)]">
            Fortlaufender Handel
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[var(--gray)]">
            {de ? "Spanne (Spread):" : "买卖买价差 (Spread):"}{" "}
            <strong className="text-[var(--ink)]">{spread.toFixed(2)} €</strong>
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="text-[11px] text-[var(--gray)] hover:text-[var(--ink)] underline cursor-pointer"
          >
            {de ? "Buch zurücksetzen" : "重置订单簿"}
          </button>
        </div>
      </div>

      {/* 核心双栏：左侧订单簿深度，右侧委托决策面板 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 左栏：Xetra 订单簿深度图 (Geld vs. Brief) */}
        <div className="border border-[var(--line)] rounded-md bg-[var(--surface)] p-3 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-1.5 text-[11px]">
            <span className="font-bold text-[var(--ink)]">
              {de ? "Elektronisches Orderbuch" : "电子撮合订单簿 (Depth)"}
            </span>
            <span className="text-[10px] text-[var(--gray)]">Live Snapshot</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[11px]">
            {/* 买盘 (Bids / Geld) */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-emerald-800 border-b border-emerald-200/50 pb-0.5 font-bold">
                <span>GELD (BID)</span>
                <span>VOLUMEN</span>
              </div>
              {bids.map((b, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between py-0.5 px-1 rounded transition ${
                    tradeFlash && idx === 0 && side === "sell"
                      ? "bg-emerald-200 text-emerald-950 font-bold"
                      : "text-emerald-900 bg-emerald-50/50"
                  }`}
                >
                  <span className="font-bold">{b.price.toFixed(2)} €</span>
                  <span className="text-[var(--gray)]">{b.volume.toLocaleString()} Stk.</span>
                </div>
              ))}
            </div>

            {/* 卖盘 (Asks / Brief) */}
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-rose-800 border-b border-rose-200/50 pb-0.5 font-bold">
                <span>BRIEF (ASK)</span>
                <span>VOLUMEN</span>
              </div>
              {asks.map((a, idx) => (
                <div
                  key={idx}
                  className={`flex justify-between py-0.5 px-1 rounded transition ${
                    tradeFlash && idx === 0 && side === "buy"
                      ? "bg-rose-200 text-rose-950 font-bold"
                      : "text-rose-900 bg-rose-50/50"
                  }`}
                >
                  <span className="font-bold">{a.price.toFixed(2)} €</span>
                  <span className="text-[var(--gray)]">{a.volume.toLocaleString()} Stk.</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-[10px] text-[var(--gray)] font-sans leading-tight pt-1 border-t border-[var(--line)]/50">
            {de
              ? "ℹ️ Im Xetra-System werden Kauf- und Verkaufsaufträge streng nach Preis- und Zeitpriorität automatisch ausgeführt."
              : "ℹ️ Xetra 系统严格按照‘价格优先、时间优先’原则毫秒级撮合。超出第一档深度的市价单将穿透进入更深档位，产生滑点。"}
          </div>
        </div>

        {/* 右栏：委托交互控制台 */}
        <div className="border border-[var(--line)] rounded-md bg-[var(--paper-subtle)] p-3 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-1.5">
            <span className="font-bold text-[var(--ink)]">
              {de ? "Order-Konfigurator" : "委托类型配置与下单测试"}
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                onClick={() => setSide("buy")}
                className={`px-2 py-0.5 text-[11px] font-mono rounded cursor-pointer border ${
                  side === "buy"
                    ? "bg-emerald-800 text-white border-emerald-800 font-bold"
                    : "bg-[var(--surface)] text-[var(--gray)] border-[var(--line)]"
                }`}
              >
                {de ? "Kauf" : "买入"}
              </button>
              <button
                type="button"
                onClick={() => setSide("sell")}
                className={`px-2 py-0.5 text-[11px] font-mono rounded cursor-pointer border ${
                  side === "sell"
                    ? "bg-rose-800 text-white border-rose-800 font-bold"
                    : "bg-[var(--surface)] text-[var(--gray)] border-[var(--line)]"
                }`}
              >
                {de ? "Verkauf" : "卖出"}
              </button>
            </div>
          </div>

          {/* 三大委托类型切换 */}
          <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setOrderType("market")}
              className={`p-1.5 rounded border transition cursor-pointer ${
                orderType === "market"
                  ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-2xs"
                  : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--gray)]"
              }`}
            >
              <div>{side === "buy" ? (de ? "Billigst" : "市价买") : de ? "Bestens" : "市价卖"}</div>
              <div className="text-[9px] opacity-80">{de ? "Sofort" : "即时撮合"}</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setOrderType("limit");
                setPriceInput(side === "buy" ? 142.0 : 143.0);
              }}
              className={`p-1.5 rounded border transition cursor-pointer ${
                orderType === "limit"
                  ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-2xs"
                  : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--gray)]"
              }`}
            >
              <div>{de ? "Limit-Order" : "限价单"}</div>
              <div className="text-[9px] opacity-80">{de ? "Preisgrenze" : "价格保护"}</div>
            </button>

            <button
              type="button"
              onClick={() => {
                setOrderType("stop");
                setPriceInput(140.0);
                setSide("sell");
              }}
              className={`p-1.5 rounded border transition cursor-pointer ${
                orderType === "stop"
                  ? "bg-[var(--ink)] text-white border-[var(--ink)] font-bold shadow-2xs"
                  : "bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--gray)]"
              }`}
            >
              <div>{de ? "Stop-Loss" : "止损单"}</div>
              <div className="text-[9px] opacity-80">{de ? "Absicherung" : "防暴跌"}</div>
            </button>
          </div>

          {/* 股数与价格输入 */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <label className="block text-[10px] text-[var(--gray)] font-mono mb-1">
                {de ? "Stückzahl:" : "下单股数 (Stk.):"}
              </label>
              <input
                type="number"
                min="100"
                step="500"
                value={shares}
                onChange={(e) => setShares(Math.max(100, parseInt(e.target.value) || 100))}
                className="w-full bg-[var(--surface)] border border-[var(--line)] rounded px-2 py-1 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block text-[10px] text-[var(--gray)] font-mono mb-1">
                {orderType === "market"
                  ? de
                    ? "Kurs: Unlimitiert"
                    : "价格: 不限价 (市价)"
                  : orderType === "limit"
                  ? de
                    ? "Limitpreis (€):"
                    : "限价阈值 (€):"
                  : de
                  ? "Stoppreis (€):"
                  : "止损触发价 (€):"}
              </label>
              <input
                type="number"
                step="0.1"
                disabled={orderType === "market"}
                value={orderType === "market" ? (side === "buy" ? bestAsk : bestBid) : priceInput}
                onChange={(e) => setPriceInput(parseFloat(e.target.value) || 0)}
                className={`w-full border border-[var(--line)] rounded px-2 py-1 font-mono text-xs ${
                  orderType === "market"
                    ? "bg-[var(--line)]/40 text-[var(--gray)] cursor-not-allowed"
                    : "bg-[var(--surface)] text-[var(--ink)]"
                }`}
              />
            </div>
          </div>

          {/* 下单按钮 */}
          <button
            type="button"
            onClick={executeOrder}
            className="w-full py-1.5 px-3 rounded bg-[var(--ink)] text-white font-medium text-xs hover:opacity-90 cursor-pointer shadow-xs transition"
          >
            {de ? "Order ins Xetra-Orderbuch übermitteln" : "将委托发送至 Xetra 订单簿撮合"}
          </button>
        </div>
      </div>

      {/* 撮合结果提示条 */}
      {lastOrder && (
        <div
          className={`rounded-md border p-3 text-xs font-mono transition-all ${
            lastOrder.status === "filled"
              ? lastOrder.slippageCost && lastOrder.slippageCost > 0
                ? "border-amber-400 bg-amber-50/80 text-amber-950"
                : "border-emerald-300 bg-emerald-50/80 text-emerald-950"
              : lastOrder.status === "triggered"
              ? "border-rose-400 bg-rose-50 text-rose-950"
              : "border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]"
          }`}
        >
          <div className="font-bold flex items-center justify-between">
            <span>
              STATUS: {lastOrder.status.toUpperCase()} // ID: #{lastOrder.id}
            </span>
            {lastOrder.executionPrice && (
              <span>
                {de ? "Ausführung:" : "实际成交价:"} {lastOrder.executionPrice.toFixed(2)} €
              </span>
            )}
          </div>
          <div className="mt-1 font-sans text-xs">
            {de ? lastOrder.messageDE : lastOrder.messageZH}
          </div>
        </div>
      )}

      {/* 考纲知识点速查与高分句式 */}
      <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-2.5 text-[11px] text-[var(--gray)] leading-relaxed space-y-1">
        <div className="font-bold text-[var(--ink)] font-mono text-[10px] uppercase">
          {de ? "§ Klausur-Wissen: Orderarten im Vergleich" : "§ 考纲解题：委托类型对比要点"}
        </div>
        <ul className="list-disc pl-4 space-y-0.5">
          <li>
            <strong>{de ? "Market-Order (Bestens/Billigst):" : "市价单 (Bestens/Billigst):"}</strong>{" "}
            {de
              ? "Garantiert die sofortige Ausführung, birgt jedoch bei geringer Liquidität erhebliche Slippage-Risiken (ungünstige Kurse)."
              : "保证即时成交，但在流动性不足或大额下单时极易产生滑点劣变风险。"}
          </li>
          <li>
            <strong>{de ? "Limit-Order:" : "限价单 (Limit):"}</strong>{" "}
            {de
              ? "Schützt vor Überzahlung (Kauf) bzw. Unterpreis (Verkauf), garantiert aber keine Ausführung, falls der Markt das Limit nicht erreicht."
              : "提供绝对价格保护，但若市场价格未触及限价，则存在无法成交的执行风险。"}
          </li>
          <li>
            <strong>{de ? "Stop-Loss-Order:" : "止损单 (Stop-Loss):"}</strong>{" "}
            {de
              ? "Dient der Verlustbegrenzung. Nach Unterschreiten der Triggerschwelle wandelt sie sich in eine unlimitierte Bestens-Order um (keine Kursgarantie!)."
              : "旨在控制最大亏损。跌破止损线后立即变身为市价单，在跳空暴跌行情中无法保证按止损线出清。"}
          </li>
        </ul>
      </div>
    </div>
  );
}
