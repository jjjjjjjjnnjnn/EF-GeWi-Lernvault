// LibetExperimentSim — 李贝特脑神经电生理与自由意志交互实验台 (Libet-Experiment 1983)
// 依据认知神经科学第一性原理与北威州高级文理中学 (Gymnasium Q2) Philosophie 人论与自由意志考纲标准设计
// 严格遵循 Tufte Editorial 规范：学术极简示波器刻度盘、真实电生理时间轴（-550ms, -200ms, 0ms, Free Won't 否决窗口）

import { useState, useEffect, useRef } from "react";
import type { Lang } from "../../i18n";

export interface LibetExperimentSimProps {
  lang?: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export function LibetExperimentSim({ lang = "de", onExportFinding }: LibetExperimentSimProps) {
  const isDe = lang === "de";

  // 实验状态机
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [clockAngle, setClockAngle] = useState<number>(0); // 0 - 360 度
  const [isVetoTriggered, setIsVetoTriggered] = useState<boolean>(false);
  const [experimentStep, setExperimentStep] = useState<"idle" | "bp_started" | "will_felt" | "action_fired" | "veto_blocked">("idle");

  // 受试者自测打点记录
  const [userWilleAngle, setUserWilleAngle] = useState<number | null>(null);
  const animRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());

  // 2.56 秒一圈 (360度 / 2560ms = 0.140625 度/ms)
  useEffect(() => {
    if (!isRunning) return;

    const loop = (now: number) => {
      const dt = now - lastTimeRef.current;
      lastTimeRef.current = now;

      setClockAngle((prev) => (prev + dt * 0.140625) % 360);
      animRef.current = requestAnimationFrame(loop);
    };

    lastTimeRef.current = performance.now();
    animRef.current = requestAnimationFrame(loop);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isRunning]);

  // 模拟标准李贝特电生理序列演进
  const handleSimulateStandardTrial = () => {
    setIsVetoTriggered(false);
    setExperimentStep("bp_started");

    // -550ms: 准备电位启动
    setTimeout(() => {
      setExperimentStep("will_felt");
    }, 700);

    // -200ms -> 0ms: 动作击发
    setTimeout(() => {
      setExperimentStep("action_fired");
    }, 1300);
  };

  // 触发意识否决权 (Free Won't / Veto)
  const handleTriggerVeto = () => {
    setIsVetoTriggered(true);
    setExperimentStep("veto_blocked");
  };

  // 用户亲自扮演受试者：按下“现在产生动意”
  const handleUserCaptureW = () => {
    setUserWilleAngle(Math.round(clockAngle));
    setExperimentStep("will_felt");
  };

  const handleReset = () => {
    setUserWilleAngle(null);
    setIsVetoTriggered(false);
    setExperimentStep("idle");
  };

  const handleExport = () => {
    const text = isDe
      ? `Libet-Experiment 1983 Analyseprotokoll:\n- Bereitschaftspotenzial (BP): ca. -550 ms vor Handlung\n- Bewusster Willensentschluss (W-Urteil): ca. -200 ms vor Handlung\n- Zeitlicher Vorlauf des Gehirns: ca. 350 ms (Gehirn entscheidet vor dem Bewusstsein)\n- Veto-Fenster (Free Won't): ca. -100 ms bis 0 ms (Handlungsabbruch: ${isVetoTriggered ? "ERFOLGREICH AUSGEÜBT" : "NICHT GENUTZT"})\n- Philosophisches Fazit: Neurobiologische Befunde widerlegen nicht die Freiheit zur rationalen Handlungshemmung (Habermas / Libet).`
      : `李贝特 1983 自由意志实验学术诊断报告：\n- 脑神经准备电位 (BP)：动作前约 -550 ms 出现（大脑潜意识活动）\n- 主观自觉动作意愿 (W判决)：动作前约 -200 ms 自觉意识到\n- 大脑神经领先时间差：约 350 ms（电生理启动先于自觉意识）\n- 自由否决权窗口 (Free Won't)：动作前 -100 ms 至 0 ms（意识踩刹车阻断：${isVetoTriggered ? "成功阻断" : "未阻断"})\n- 哲学裁决结论：哈贝马斯指出随意动手指属于无思虑本能肌肉反射，不能等同于基于道德理性考量的人生复杂决断；自由否决权保障了刑法罪责（Schuldfähigkeit）与人的尊严。`;

    if (onExportFinding) {
      onExportFinding(text);
    } else {
      navigator.clipboard.writeText(text);
      alert(isDe ? "In die Zwischenablage kopiert!" : "已复制到剪贴板！");
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 sm:p-6 bg-[var(--surface)] rounded-xl border border-[var(--line)] shadow-xs font-sans text-[var(--ink)]">
      {/* 顶部标题与时钟控制 */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-xs font-mono rounded bg-[var(--paper-subtle)] text-[var(--accent)] border border-[var(--line)] font-semibold">
              Philosophie Q2 · Anthropologie & Willensfreiheit
            </span>
            <span className="text-xs font-mono text-[var(--gray)]">Benjamin Libet (1983) · Bereitschaftspotenzial</span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif font-bold tracking-tight mt-1 text-[var(--ink)]">
            {isDe ? "Libet-Experiment: Bereitschaftspotenzial & Willensfreiheit" : "李贝特脑电实验：准备电位、自由意志与意识否决权沙盒"}
          </h2>
        </div>

        {/* 控制按钮组 */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleSimulateStandardTrial}
            className="px-3 py-1.5 text-xs font-mono font-bold rounded bg-[var(--accent)] text-white hover:opacity-90 shadow-xs transition-opacity cursor-pointer"
          >
            {isDe ? "▶ Standard-Versuch" : "▶ 演示标准脑电过程"}
          </button>
          <button
            type="button"
            onClick={handleTriggerVeto}
            className="px-3 py-1.5 text-xs font-mono font-bold rounded border border-rose-300 bg-rose-50 text-rose-800 dark:bg-rose-950/40 dark:text-rose-300 hover:bg-rose-100 transition-colors cursor-pointer"
          >
            {isDe ? "🚨 VETO (Free Won't)" : "🚨 行使否决权 (Veto)"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-2.5 py-1.5 text-xs font-mono rounded border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--accent)] transition-colors cursor-pointer"
          >
            {isDe ? "🔄 Reset" : "🔄 重置"}
          </button>
        </div>
      </div>

      {/* 核心双视窗：左侧李贝特示波器光斑旋转时钟，右侧脑电准备电位示波图 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* 左侧：李贝特 2.56s 旋转光斑示波器时钟 (5 列) */}
        <div className="lg:col-span-5 flex flex-col gap-3 p-4 bg-[var(--paper-subtle)]/40 rounded-xl border border-[var(--line)] text-[var(--ink)]">
          <div className="flex justify-between items-center text-xs font-mono text-[var(--gray)]">
            <span>Oszilloskop-Zifferblatt (2,56 s / U)</span>
            <button
              type="button"
              onClick={() => setIsRunning(!isRunning)}
              className="text-[var(--accent)] hover:underline text-[11px] cursor-pointer"
            >
              {isRunning ? "⏸ Pause" : "▶ Weiter"}
            </button>
          </div>

          {/* 示波器刻度盘 SVG (Tufte 学术仪表风格) */}
          <div className="relative w-full aspect-square rounded-lg border border-[var(--line)] bg-[var(--paper)] flex items-center justify-center p-3 overflow-hidden shadow-2xs">
            <svg className="w-full h-full select-none" viewBox="0 0 260 260">
              {/* 外圈与内圈精细刻度环 */}
              <circle cx="130" cy="130" r="105" fill="none" stroke="var(--ink)" strokeWidth="1" strokeOpacity="0.8" />
              <circle cx="130" cy="130" r="98" fill="none" stroke="var(--line)" strokeWidth="0.8" strokeDasharray="2,4" />

              {/* 12 个主要刻度与 60 个细分刻度 */}
              {Array.from({ length: 60 }).map((_, i) => {
                const deg = i * 6;
                const rad = (deg * Math.PI) / 180;
                const isMajor = i % 5 === 0;
                const rInner = isMajor ? 92 : 96;
                return (
                  <line
                    key={deg}
                    x1={130 + rInner * Math.sin(rad)}
                    y1={130 - rInner * Math.cos(rad)}
                    x2={130 + 104 * Math.sin(rad)}
                    y2={130 - 104 * Math.cos(rad)}
                    stroke="var(--ink)"
                    strokeWidth={isMajor ? "1.2" : "0.6"}
                    strokeOpacity={isMajor ? "0.85" : "0.35"}
                  />
                );
              })}

              {/* 刻度数字 0, 15, 30, 45 */}
              <text x="130" y="40" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace" fontWeight="bold">0</text>
              <text x="222" y="133" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace" fontWeight="bold">15</text>
              <text x="130" y="226" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace" fontWeight="bold">30</text>
              <text x="38" y="133" textAnchor="middle" fontSize="9" fill="var(--ink)" fontFamily="monospace" fontWeight="bold">45</text>

              {/* 用户自己捕捉的 W 打点标记 */}
              {userWilleAngle !== null && (
                <g>
                  <line
                    x1="130"
                    y1="130"
                    x2={130 + 88 * Math.sin((userWilleAngle * Math.PI) / 180)}
                    y2={130 - 88 * Math.cos((userWilleAngle * Math.PI) / 180)}
                    stroke="#0284c7"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                  />
                  <circle
                    cx={130 + 88 * Math.sin((userWilleAngle * Math.PI) / 180)}
                    cy={130 - 88 * Math.cos((userWilleAngle * Math.PI) / 180)}
                    r="4.5"
                    fill="#0284c7"
                  />
                  <text
                    x={130 + 70 * Math.sin((userWilleAngle * Math.PI) / 180)}
                    y={130 - 70 * Math.cos((userWilleAngle * Math.PI) / 180)}
                    fill="#0284c7"
                    fontSize="9"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    W
                  </text>
                </g>
              )}

              {/* 顺时针旋转的高亮光斑 */}
              <circle
                cx={130 + 88 * Math.sin((clockAngle * Math.PI) / 180)}
                cy={130 - 88 * Math.cos((clockAngle * Math.PI) / 180)}
                r="5"
                fill="var(--accent)"
              />

              <circle cx="130" cy="130" r="2.5" fill="var(--ink)" />
              <text x="130" y="126" textAnchor="middle" fontSize="8" fill="var(--gray)" fontFamily="serif" fontStyle="italic">
                Libet 1983
              </text>
            </svg>
          </div>

          {/* 自主打点测试按钮 */}
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleUserCaptureW}
              className="w-full py-2 px-3 rounded-lg border border-[var(--accent)] bg-[var(--surface)] text-[var(--accent)] hover:bg-[var(--accent)] hover:text-white font-mono font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              {isDe ? "⚡ Jetzt! Willensentschluss fassen (W)" : "⚡ 我现在产生了动意！(记录 W 点)"}
            </button>
            <div className="flex justify-between items-center text-[10px] text-[var(--gray)] font-mono">
              <span>{userWilleAngle !== null ? `W-Position: ${userWilleAngle}°` : "Uhr beobachten..."}</span>
              <span>1 Periode = 2560 ms</span>
            </div>
          </div>
        </div>

        {/* 右侧：脑电准备电位 (BP) 示波波形与时间轴 (7 列) */}
        <div className="lg:col-span-7 flex flex-col gap-3 p-4 bg-[var(--surface)] rounded-xl border border-[var(--line)] shadow-xs">
          <div className="flex justify-between items-center border-b border-[var(--line)] pb-3">
            <div>
              <span className="font-mono text-[var(--gray)] uppercase tracking-wider text-[10px]">
                {isDe ? "Elektrophysiologisches EEG-Signal (µV)" : "脑电图 (EEG) 与肌电图 (EMG) 时间轴"}
              </span>
              <h3 className="text-base font-serif font-bold text-[var(--ink)] mt-0.5">
                {isVetoTriggered
                  ? isDe ? "🚨 Handlung durch Veto abgebrochen (Free Won't)" : "🚨 意识否决权生效：动作被主动踩刹车阻断！"
                  : experimentStep === "action_fired"
                  ? isDe ? "⚡ Handlung ausgeführt (Tastendruck)" : "⚡ 肌肉动作击发（按键完成）"
                  : experimentStep === "will_felt"
                  ? isDe ? "🧠 Bewusster Willensakt aufgetreten (W)" : "🧠 自觉动作意愿产生 (W)"
                  : experimentStep === "bp_started"
                  ? isDe ? "📈 Bereitschaftspotenzial baut sich auf..." : "📈 脑神经准备电位正在积聚..."
                  : isDe ? "Ruhezustand (Klicken Sie 'Standard-Versuch')" : "静息等待（点击上方‘演示标准脑电过程’）"}
              </h3>
            </div>
          </div>

          {/* 脑电波形画布 SVG (Tufte 论文级曲线图) */}
          <div className="relative w-full aspect-16/10 rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper)] p-2">
            <svg className="w-full h-full select-none" viewBox="0 0 500 280">
              {/* 网格参考线 */}
              <line x1="50" y1="160" x2="470" y2="160" stroke="var(--ink)" strokeWidth="1" />
              <text x="475" y="164" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">t (ms)</text>

              {/* 关键时间刻度标尺 */}
              {/* 0ms: 动作发生 (Aktion / EMG) */}
              <line x1="420" y1="30" x2="420" y2="240" stroke="#b91c1c" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="420" y="255" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#b91c1c" fontFamily="monospace">
                0 ms (Aktion)
              </text>

              {/* -200ms: 意识产生 (Wille / W-Urteil) */}
              <line x1="280" y1="30" x2="280" y2="240" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2,2" />
              <text x="280" y="255" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0284c7" fontFamily="monospace">
                -200 ms (W)
              </text>

              {/* -550ms: 准备电位启动 (Bereitschaftspotenzial) */}
              <line x1="120" y1="30" x2="120" y2="240" stroke="var(--ink)" strokeWidth="1" strokeDasharray="2,2" />
              <text x="120" y="255" textAnchor="middle" fontSize="9" fontWeight="bold" fill="var(--ink)" fontFamily="monospace">
                -550 ms (BP)
              </text>

              {/* 自由否决权窗口 (Veto-Fenster: -100ms bis 0ms) */}
              <rect x="350" y="40" width="70" height="110" fill="rgba(34, 197, 94, 0.12)" stroke="var(--line)" strokeWidth="0.8" rx="3" />
              <text x="385" y="52" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#15803d" fontFamily="monospace">
                Veto-Fenster (100ms)
              </text>

              {/* 脑电波形曲线 (Bereitschaftspotenzial nach Kornhuber & Deecke) */}
              <path
                d={
                  isVetoTriggered
                    ? "M 50 160 L 120 160 C 180 160, 240 100, 280 90 C 320 80, 360 85, 370 160 L 470 160"
                    : "M 50 160 L 120 160 C 180 160, 240 100, 280 90 C 330 80, 400 60, 420 50 L 425 210 L 440 160 L 470 160"
                }
                fill="none"
                stroke={isVetoTriggered ? "#b91c1c" : "var(--accent)"}
                strokeWidth="2.5"
                className="transition-all duration-300"
              />

              {/* 关键节点圆圈 */}
              <circle cx="120" cy="160" r="4" fill="var(--ink)" />
              <circle cx="280" cy="90" r="4.5" fill="#0284c7" />
              {!isVetoTriggered && <circle cx="420" cy="50" r="4.5" fill="#b91c1c" />}

              {/* 标注与时间差 */}
              <text x="200" y="70" textAnchor="middle" fontSize="9" fill="var(--accent)" fontWeight="bold" fontFamily="monospace">
                ▲ 350 ms Vorlauf: Gehirn aktiv VOR dem Willen!
              </text>
            </svg>
          </div>

          {/* 哲学双翼裁决与会考标准点拨 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs leading-relaxed">
            <div className="p-3 rounded-lg bg-[var(--paper-subtle)]/60 border border-[var(--line)]">
              <span className="font-bold text-[var(--ink)] block mb-1">
                {isDe ? "🔥 Harter Determinismus (Roth / Singer):" : "🔥 硬决定论立场（脑科学家 Roth / Singer）："}
              </span>
              <p className="text-[var(--gray)] font-sans">
                {isDe
                  ? "„Wir tun nicht, was wir wollen, sondern wir wollen, was wir tun.“ Das Gefühl der Willensfreiheit ist eine nachträgliche Illusion des Gehirns."
                  : "‘我们不是在做我们所意愿的，而是在意愿我们不得不做的。’自由意志感是大脑在神经活动启动后编造的事后合理化幻觉。"}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-[var(--paper-subtle)]/60 border border-[var(--line)]">
              <span className="font-bold text-[var(--accent)] block mb-1">
                {isDe ? "🛡️ Kompatibilismus & Veto (Habermas / Libet):" : "🛡️ 相容论与批判（哈贝马斯 / 李贝特否决权）："}
              </span>
              <p className="text-[var(--gray)] font-sans">
                {isDe
                  ? "1. Free Won't: Das Bewusstsein kann Impulse im Veto-Fenster stoppen.\n2. Habermas: Willkürliches Tastendrücken ist kein rationales Lebensurteil!"
                  : "1. 意识否决权：在击发前 100ms 意识拥有踩刹车阻止冲动的能力；\n2. 哈贝马斯：毫无理由的随意敲手指是肌肉反射，绝不等于基于道德反思的人生抉择！"}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center pt-1 text-[11px] text-[var(--gray)] font-mono">
            <span>💡 提示：点击“行使否决权 (Veto)”，观察脑电波形如何在最后 100ms 窗口内被强制平抑阻断。</span>
            <button
              type="button"
              onClick={handleExport}
              className="px-2.5 py-1 text-xs font-mono font-medium rounded border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--accent)] transition-colors cursor-pointer"
            >
              {isDe ? "📥 Befund exportieren" : "📥 导出脑电学报"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LibetExperimentSim;
