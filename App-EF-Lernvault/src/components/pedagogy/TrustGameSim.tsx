import React, { useRef, useEffect, useState, useCallback } from "react";
import type { Lang } from "../../i18n";

export interface StandardSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

type StrategyType = "tft" | "coop" | "cheat" | "grudge";

interface AgentNode {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  strategy: StrategyType;
  score: number;
  historyScore: number[];
}

export const TrustGameSim: React.FC<StandardSimProps> = ({
  lang,
  studioMode: _studioMode = true,
  onExportFinding,
}) => {
  const isZh = lang === "zh";

  // 1. 模拟环境参数
  const [sanktionCost, setSanktionCost] = useState<number>(1.5); // 法治对背叛者的惩罚成本 (0 ~ 3.5)
  const [noiseRate, setNoiseRate] = useState<number>(0.05); // 沟通误解率 (0 ~ 0.2)
  const [paused, setPaused] = useState<boolean>(false);
  const [showPanels, setShowPanels] = useState<boolean>(true);

  // 2. 测量指标节流状态 (每 6 帧同步一次给 React)
  const [metrics, setMetrics] = useState({
    round: 0,
    trustIndex: 75,
    avgWealth: 120,
    dominantStrategy: "Tit-for-Tat (Wie du mir)",
    coopRatio: 0.75,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // 3. 智能体物理与博弈引擎 Ref (60FPS 解耦)
  const engineRef = useRef({
    agents: [] as AgentNode[],
    roundCount: 0,
    frameCount: 0,
    trustHistory: [] as number[],
  });

  // 初始化或重置社群群体
  const initPopulation = useCallback(() => {
    const agents: AgentNode[] = [];
    const count = 36;
    const strategies: StrategyType[] = ["tft", "coop", "cheat", "grudge"];

    for (let i = 0; i < count; i++) {
      // 初始均衡分配 4 种典型社会博弈策略
      const strat = strategies[i % 4];
      agents.push({
        id: i,
        x: Math.random() * 0.8 + 0.1,
        y: Math.random() * 0.8 + 0.1,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08,
        strategy: strat,
        score: 100,
        historyScore: [100],
      });
    }

    engineRef.current.agents = agents;
    engineRef.current.roundCount = 0;
    engineRef.current.trustHistory = [75];
  }, []);

  useEffect(() => {
    initPopulation();
  }, [initPopulation]);

  // 4. 60 FPS 物理与博弈演化循环
  useEffect(() => {
    let animId: number;
    let lastTs = performance.now();

    const loop = (now: number) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTs) / 1000, 0.04);
      lastTs = now;

      const engine = engineRef.current;
      const agents = engine.agents;
      if (agents.length === 0) return;

      if (!paused) {
        // A. 空间布朗运动与碰撞反弹
        for (const a of agents) {
          a.x += a.vx * dt;
          a.y += a.vy * dt;

          if (a.x < 0.05) { a.x = 0.05; a.vx = Math.abs(a.vx); }
          if (a.x > 0.95) { a.x = 0.95; a.vx = -Math.abs(a.vx); }
          if (a.y < 0.05) { a.y = 0.05; a.vy = Math.abs(a.vy); }
          if (a.y > 0.95) { a.y = 0.95; a.vy = -Math.abs(a.vy); }
        }

        // B. 定期举行邻近博弈配对 (每 15 帧模拟一轮微观经济互动)
        engine.frameCount++;
        if (engine.frameCount % 15 === 0) {
          engine.roundCount++;
          let roundCoopCount = 0;
          let roundInteractions = 0;

          // 寻找距离最近的邻居进行博弈
          for (let i = 0; i < agents.length; i++) {
            const a1 = agents[i];
            // 挑一个距离近的伙伴
            let bestDist = 999;
            let partner: AgentNode | null = null;
            for (let j = 0; j < agents.length; j++) {
              if (i === j) continue;
              const a2 = agents[j];
              const d = Math.hypot(a1.x - a2.x, a1.y - a2.y);
              if (d < 0.25 && d < bestDist) {
                bestDist = d;
                partner = a2;
              }
            }

            if (partner && i < partner.id) {
              roundInteractions++;
              // 策略决策判定
              let move1: "C" | "D" = "C";
              let move2: "C" | "D" = "C";

              if (a1.strategy === "cheat") move1 = "D";
              else if (a1.strategy === "coop") move1 = "C";
              else if (a1.strategy === "tft") {
                // 针锋相对：默认合作，对方上一轮背叛则反击
                move1 = (partner.score < 90) ? "D" : "C";
              } else if (a1.strategy === "grudge") {
                // 宽容但记仇：一旦对方得分有剥削记录就永不合作
                move1 = (partner.strategy === "cheat") ? "D" : "C";
              }

              if (partner.strategy === "cheat") move2 = "D";
              else if (partner.strategy === "coop") move2 = "C";
              else if (partner.strategy === "tft") {
                move2 = (a1.score < 90) ? "D" : "C";
              } else if (partner.strategy === "grudge") {
                move2 = (a1.strategy === "cheat") ? "D" : "C";
              }

              // 沟通噪音注入 (误判)
              if (Math.random() < noiseRate) move1 = move1 === "C" ? "D" : "C";
              if (Math.random() < noiseRate) move2 = move2 === "C" ? "D" : "C";

              if (move1 === "C") roundCoopCount++;
              if (move2 === "C") roundCoopCount++;

              // 收益矩阵结算
              if (move1 === "C" && move2 === "C") {
                // 双赢 (+3, +3)
                a1.score += 3;
                partner.score += 3;
              } else if (move1 === "D" && move2 === "C") {
                // a1 剥削 partner (+5 - 罚没, -1)
                a1.score += Math.max(0, 5 - sanktionCost);
                partner.score -= 1;
              } else if (move1 === "C" && move2 === "D") {
                // partner 剥削 a1
                a1.score -= 1;
                partner.score += Math.max(0, 5 - sanktionCost);
              } else {
                // 互不信任 (0, 0)
                a1.score += 0;
                partner.score += 0;
              }
            }
          }

          // 适者生存与观念模仿 (每 10 轮淘汰末位、模仿榜样策略)
          if (engine.roundCount % 10 === 0) {
            agents.sort((a, b) => b.score - a.score);
            const best = agents[0];
            const worst = agents[agents.length - 1];
            // 末位学习榜样策略
            worst.strategy = best.strategy;
            worst.score = Math.round((best.score + worst.score) / 2);
          }

          // 记录信任率与财富指标
          const totalScore = agents.reduce((acc, a) => acc + a.score, 0);
          const coopRatio = roundInteractions > 0 ? (roundCoopCount / (roundInteractions * 2)) : 0.5;
          const trustIndex = Math.round(coopRatio * 100);

          engine.trustHistory.push(trustIndex);
          if (engine.trustHistory.length > 60) engine.trustHistory.shift();

          // 统计主流策略
          const counts: Record<StrategyType, number> = { tft: 0, coop: 0, cheat: 0, grudge: 0 };
          for (const a of agents) counts[a.strategy]++;
          let dominant: StrategyType = "tft";
          let maxCount = -1;
          for (const [k, v] of Object.entries(counts)) {
            if (v > maxCount) {
              maxCount = v;
              dominant = k as StrategyType;
            }
          }

          const dominantLabel = {
            tft: isZh ? "以德报怨 (Tit-for-Tat / 针锋相对)" : "Wie du mir (Tit-for-Tat)",
            coop: isZh ? "绝对善良 (Immer kooperieren)" : "Bedingungslose Kooperation",
            cheat: isZh ? "恶意剥削 (Immer betrügen)" : "Opportunistische Defektion",
            grudge: isZh ? "冷酷记仇 (Grollheger / Grudger)" : "Unnachgiebiger Groll",
          }[dominant];

          setMetrics({
            round: engine.roundCount,
            trustIndex,
            avgWealth: Math.round(totalScore / agents.length),
            dominantStrategy: dominantLabel,
            coopRatio,
          });
        }
      }

      // C. 动态 DPR 画布渲染 (Tufte 高对比度学术工坊风格)
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const dispW = Math.max(1, Math.floor(rect.width));
      const dispH = Math.max(1, Math.floor(rect.height));

      if (canvas.width !== Math.floor(dispW * dpr) || canvas.height !== Math.floor(dispH * dpr)) {
        canvas.width = Math.floor(dispW * dpr);
        canvas.height = Math.floor(dispH * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, dispW, dispH);

      // 背景与网格
      ctx.fillStyle = "#fafaf9";
      ctx.fillRect(0, 0, dispW, dispH);
      ctx.strokeStyle = "#e7e5e4";
      ctx.lineWidth = 0.5;

      const gridSize = 40;
      for (let x = 0; x < dispW; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, dispH);
        ctx.stroke();
      }
      for (let y = 0; y < dispH; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(dispW, y);
        ctx.stroke();
      }

      // 绘制智能体相互连接与博弈场域
      ctx.lineWidth = 1;
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const a1 = agents[i];
          const a2 = agents[j];
          const dist = Math.hypot(a1.x - a2.x, a1.y - a2.y);
          if (dist < 0.2) {
            const alpha = Math.max(0, 1 - dist / 0.2) * 0.25;
            ctx.strokeStyle = `rgba(120, 113, 108, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a1.x * dispW, a1.y * dispH);
            ctx.lineTo(a2.x * dispW, a2.y * dispH);
            ctx.stroke();
          }
        }
      }

      // 绘制智能体节点
      for (const a of agents) {
        const px = a.x * dispW;
        const py = a.y * dispH;

        // 根据策略设置高雅学术色
        // tft: 藏青深蓝, coop: 翡翠深绿, cheat: 宝石深红, grudge: 琥珀金棕
        let color = "#1e40af";
        if (a.strategy === "coop") color = "#065f46";
        if (a.strategy === "cheat") color = "#9f1239";
        if (a.strategy === "grudge") color = "#92400e";

        // 外光晕与圆点
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(px, py, 6, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 左下角：实时全社会信任度历史波形曲线
      const hist = engine.trustHistory;
      if (hist.length > 1) {
        const gw = 140;
        const gh = 45;
        const gx = 16;
        const gy = dispH - gh - 16;

        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.fillRect(gx - 4, gy - 12, gw + 8, gh + 16);
        ctx.strokeStyle = "#e4e4e7";
        ctx.strokeRect(gx - 4, gy - 12, gw + 8, gh + 16);

        ctx.fillStyle = "#71717a";
        ctx.font = "9px ui-monospace, monospace";
        ctx.fillText(isZh ? "信任度动态趋势" : "Vertrauensindex t(s)", gx, gy - 3);

        ctx.strokeStyle = "#065f46";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let k = 0; k < hist.length; k++) {
          const vx = gx + (k / (hist.length - 1)) * gw;
          const vy = gy + gh - (hist[k] / 100) * gh;
          if (k === 0) ctx.moveTo(vx, vy);
          else ctx.lineTo(vx, vy);
        }
        ctx.stroke();
      }

      ctx.restore();
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [paused, sanktionCost, noiseRate, isZh]);

  // 一键生成学术报告导出至 AI 助教
  const handleExportFinding = () => {
    const text = isZh
      ? `【SoWi 信任博弈与社会资本实测报告】\n- 当前法治惩罚成本 (Sanktionskosten): ${sanktionCost.toFixed(2)} (范围 0~3.5)\n- 沟通误解率 (Noise): ${(noiseRate * 100).toFixed(1)}%\n- 经过演化第 ${metrics.round} 轮博弈：\n  * 全社会信任指数: ${metrics.trustIndex}%\n  * 人均社会财富总和: ${metrics.avgWealth} 点\n  * 主导演化策略: ${metrics.dominantStrategy}\n- 核心结论：在法治违约惩罚健全（>${sanktionCost > 1.2 ? "高" : "低"}）环境下，以德报怨与合作机制能否成功抵御恶意搭便车？`
      : `[SoWi Vertrauens-Dilemma & Sozialkapital Analyse]\n- Sanktionskosten: ${sanktionCost.toFixed(2)}\n- Rausch-/Missverständnisrate: ${(noiseRate * 100).toFixed(1)}%\n- Simulationsergebnisse Runde ${metrics.round}:\n  * Vertrauensindex: ${metrics.trustIndex}%\n  * Durchschnittliches Sozialvermögen: ${metrics.avgWealth}\n  * Dominante Strategie: ${metrics.dominantStrategy}\n- Klausurrelevante Fragestellung zur institutionellen Vertrauensbildung.`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isZh ? "实验结论已复制到剪贴板！" : "Befunde in Zwischenablage kopiert!");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* 实验舞台与控制面板主体 */}
      <div className="grid grid-cols-12 gap-3 items-start">
        {/* 物理画布舞台 (折叠时占满 12 列，展开时占 8 列) */}
        <div className={`relative ${showPanels ? "col-span-12 lg:col-span-8" : "col-span-12"} transition-all duration-200`}>
          <div className="relative border border-[var(--line)] bg-[var(--paper-subtle)] overflow-hidden">
            {/* 顶层实验标题与操作栏 */}
            <div className="px-3 py-2 border-b border-[var(--line)] bg-[var(--surface)] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-serif font-medium text-xs text-[var(--ink)]">
                  {isZh ? "社会信任博弈与资本演化实验室" : "Vertrauens-Dilemma & Sozialkapital Labor"}
                </span>
                <span className="font-mono text-[10px] text-[var(--ink-muted)]">
                  Runde {metrics.round} | {metrics.dominantStrategy}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setShowPanels(!showPanels)}
                  className="px-2 py-0.5 text-[11px] font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                  title={showPanels ? "折叠控制板" : "展开控制板"}
                >
                  {showPanels ? "◧ 折叠侧栏" : "◩ 展开侧栏"}
                </button>
              </div>
            </div>

            {/* 60FPS 画布容器 (自适应 Studio 高度) */}
            <div className="w-full h-[420px] sm:h-[480px]">
              <canvas ref={canvasRef} className="w-full h-full block" />
            </div>

            {/* 底部播放/暂停/重置控制条 */}
            <div className="px-3 py-2 border-t border-[var(--line)] bg-[var(--surface)] flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setPaused(!paused)}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] font-medium text-[var(--ink)]"
                >
                  {paused ? "▶ Fortsetzen" : "⏸ Pause"}
                </button>
                <button
                  type="button"
                  onClick={initPopulation}
                  className="px-2.5 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--surface)] text-[var(--ink)]"
                >
                  ↺ Reset
                </button>
              </div>

              {/* 实时量化指标 (等宽数字) */}
              <div className="flex items-center gap-3 font-mono text-[11px] text-[var(--ink)]">
                <span>
                  {isZh ? "信任指数: " : "Vertrauensindex: "}
                  <strong className={metrics.trustIndex > 60 ? "text-[#065f46]" : "text-[#9f1239]"}>
                    {metrics.trustIndex}%
                  </strong>
                </span>
                <span>
                  {isZh ? "人均财富: " : "Sozialkapital: "}
                  <strong>{metrics.avgWealth}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧参数控制面板 (当 showPanels 为 false 时隐藏) */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-3">
            <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
              <div className="font-serif font-medium text-xs text-[var(--ink)] mb-3 pb-1 border-b border-[var(--line)]">
                {isZh ? "社会制度与法律调控" : "Institutionelle Stellschrauben"}
              </div>

              {/* 滑块 1: 法治惩罚力度 (Sanktionskosten) */}
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>{isZh ? "法治违约惩罚成本 (Sanktion)" : "Sanktionskosten bei Betrug"}</span>
                  <span className="font-medium text-[var(--accent)]">{sanktionCost.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="3.5"
                  step="0.1"
                  value={sanktionCost}
                  onChange={(e) => setSanktionCost(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
                <div className="text-[10px] text-[var(--ink-muted)] mt-0.5">
                  {sanktionCost < 1
                    ? (isZh ? "⚠️ 惩罚过低，搭便车者与欺诈者迅速占优并瓦解信任" : "⚠️ Schwacher Rechtsstaat: Defektion dominiert")
                    : (isZh ? "✓ 强法治威慑：以德报怨策略群体胜出，信任自我巩固" : "✓ Starker Rechtsstaat: Kooperation stabilisiert sich")}
                </div>
              </div>

              {/* 滑块 2: 沟通误解与信息噪音 (Noise) */}
              <div className="mb-3">
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span>{isZh ? "社会信息噪音/误解率" : "Missverständnis-Quote"}</span>
                  <span className="font-medium text-[var(--accent)]">{(noiseRate * 100).toFixed(0)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="0.20"
                  step="0.01"
                  value={noiseRate}
                  onChange={(e) => setNoiseRate(parseFloat(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
                <div className="text-[10px] text-[var(--ink-muted)] mt-0.5">
                  {isZh ? "高噪音会触发冤冤相报的信任雪崩" : "Falschmeldungen zerstören reziproke Kooperation"}
                </div>
              </div>

              {/* 策略图例与学术说明 */}
              <div className="border-t border-[var(--line)] pt-2.5 mt-2 space-y-1.5 font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#1e40af]" />
                  <span>Tit-for-Tat (以德报怨，法治先驱)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#065f46]" />
                  <span>Immer Kooperieren (盲目善良)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#9f1239]" />
                  <span>Immer Betrügen (恶意搭便车)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#92400e]" />
                  <span>Grollheger (冷酷记仇)</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 底部四列双语学术脚手架 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 1. 第一性原理与博弈模型 */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Spieltheorie</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "重复囚徒困境与收益矩阵" : "Iteriertes Gefangenendilemma"}
          </div>
          <div className="font-mono text-[11px] text-[var(--accent)] mb-1">
            T &gt; R &gt; P &gt; S (5 &gt; 3 &gt; 0 &gt; -1)
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "单次博弈中纳什均衡是互相背叛 (P, P)；而在未知轮数的重复博弈中，带有宽容与反击机制的策略方能实现帕累托最优。"
              : "Im Einzelspiel ist Defektion dominant; im wiederholten Spiel etabliert der Schatten der Zukunft (Shadow of the Future) dauerhafte Kooperation."}
          </p>
        </div>

        {/* 2. 北威州高中 KLP 考纲点 */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "社会整合与罗伯特·帕特南社会资本" : "Sozialkapital & Integration"}
          </div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1">erörtern / beurteilen</code>
            <p className="mt-1">
              {isZh
                ? "评析制度信任（Institutionenvertrauen）如何降低交易成本并促进现代法治社会的凝聚力。"
                : "Beurteilung der Rolle von Institutionenvertrauen und Brückenkapital (Bridging Social Capital) für den Zusammenhalt."}
            </p>
          </div>
        </div>

        {/* 3. 中国留学生直觉速记法（CN-Methode） */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / 🇨🇳 CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">
            {isZh ? "以德报德，以直报怨四字诀" : "Reziprozitäts-Methode"}
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "《论语》‘以直报怨，以德报德’是博弈论的最优数学解：先示好、绝不率先背叛、被侵犯时即刻报复、对方改过后立即恢复宽容。"
              : "孔夫子直报思想与 Axelrod 最优策略完全重合：Klarheit, Vergeltung bei Betrug und sofortige Vergebung bei Kooperation."}
          </p>
        </div>

        {/* 4. 一键回流至 AI 助教研讨 */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">
              {isZh ? "导出实验数据至助教" : "Befunde übergeben"}
            </div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh
                ? "将当前法治惩罚与信任演化实测数据带入 AI 助教，生成德国考纲深度论述题。"
                : "Übertrage die aktuellen Parameter direkt in den KI-Tutor zur vertieften Klausuranalyse."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExportFinding}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] text-[11px] font-medium transition-colors cursor-pointer"
          >
            {isZh ? "带入助教讨论 ↗" : "An Tutor senden ↗"}
          </button>
        </div>
      </div>
    </div>
  );
};
