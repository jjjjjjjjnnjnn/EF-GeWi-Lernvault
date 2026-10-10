import React, { useState, useMemo, useEffect, useId } from "react";

export interface WeightArgument {
  id: string;
  label: string;
  weight: number;
}

export interface DilemmaBalanceScaleProps {
  title?: string;
  leftTitle?: string;
  rightTitle?: string;
  initialLeftWeights?: Array<{ label: string; weight: number }>;
  initialRightWeights?: Array<{ label: string; weight: number }>;
  lang?: "de" | "zh";
  onBalanceChange?: (angle: number, verdict: string) => void;
}

interface ScalePreset {
  id: string;
  titleDE: string;
  titleZH: string;
  leftTitleDE: string;
  leftTitleZH: string;
  rightTitleDE: string;
  rightTitleZH: string;
  leftWeights: Array<{ label: string; weight: number }>;
  rightWeights: Array<{ label: string; weight: number }>;
}

const SCALE_PRESETS: ScalePreset[] = [
  {
    id: "philo_kant_bentham",
    titleDE: "Ethik: Deontologische Würde vs. Utilitaristische Schadensminimierung",
    titleZH: "伦理学: 康德道义论尊严 vs. 边际功利最小化损害",
    leftTitleDE: "Deontologie (Kant: Würde & Pflicht)",
    leftTitleZH: "道义论 (康德: 绝对命令与尊严)",
    rightTitleDE: "Utilitarismus (Bentham: Größtes Wohl)",
    rightTitleZH: "功利主义 (边沁: 多数人最大福祉)",
    leftWeights: [
      { label: "Menschenwürde unantastbar", weight: 10 },
      { label: "Instrumentalisierungsverbot", weight: 8 },
    ],
    rightWeights: [
      { label: "Rettung von 5 Menschenleben", weight: 9 },
      { label: "Leidminimierung Kollektiv", weight: 7 },
    ],
  },
  {
    id: "sowi_markt_staat",
    titleDE: "SoWi: Marktallokation vs. Staatlicher Sozialausgleich",
    titleZH: "社会经济学: 自由市场效率 vs. 国家福利干预",
    leftTitleDE: "Sozialstaatsprinzip (Chancengleichheit)",
    leftTitleZH: "社会福利国家原则 (公平与兜底保障)",
    rightTitleDE: "Marktliberalismus (Effizienz)",
    rightTitleZH: "自由市场机制 (配置效率与创新动力)",
    leftWeights: [
      { label: "Existenzsicherung Bürgergeld", weight: 8 },
      { label: "Soziale Abfederung Ungleichheit", weight: 7 },
    ],
    rightWeights: [
      { label: "Allokationseffizienz Preissignal", weight: 8 },
      { label: "Leistungs- und Innovationsanreiz", weight: 6 },
    ],
  },
  {
    id: "recht_radbruch",
    titleDE: "Recht: Radbruchsche Formel (Rechtssicherheit vs. Gerechtigkeit)",
    titleZH: "法哲学: 拉德布鲁赫公式 (法律确定性 vs. 实质正义)",
    leftTitleDE: "Rechtssicherheit (Positives Gesetz)",
    leftTitleZH: "法律确定性 (实证制定法效力)",
    rightTitleDE: "Materiale Gerechtigkeit (Menschenrechte)",
    rightTitleZH: "实质正义 (超实证人权底线)",
    leftWeights: [
      { label: "Gesetzestreue & Institution", weight: 7 },
      { label: "Vermeidung von Willkür", weight: 6 },
    ],
    rightWeights: [
      { label: "Unerträgliche Ungerechtigkeit", weight: 10 },
      { label: "Elementarer Lebensschutz", weight: 9 },
    ],
  },
];

export const DilemmaBalanceScale: React.FC<DilemmaBalanceScaleProps> = ({
  title,
  leftTitle = "Pro / Deontologie",
  rightTitle = "Contra / Utilitarismus",
  initialLeftWeights,
  initialRightWeights,
  lang = "de",
  onBalanceChange,
}) => {
  const isZh = lang === "zh";

  // IDs for accessibility
  const newLeftLabelId = useId();
  const newRightLabelId = useId();

  // Internal weight list states
  const [leftWeights, setLeftWeights] = useState<WeightArgument[]>(() => {
    const seed = initialLeftWeights || [
      { label: "Menschenwürde (Art. 1 GG)", weight: 9 },
      { label: "Kategorisches Verbot", weight: 7 },
    ];
    return seed.map((w, idx) => ({ id: `lw-${idx}-${Date.now()}`, ...w }));
  });

  const [rightWeights, setRightWeights] = useState<WeightArgument[]>(() => {
    const seed = initialRightWeights || [
      { label: "Nutzen für die Mehrheit", weight: 8 },
      { label: "Schadensbegrenzung", weight: 6 },
    ];
    return seed.map((w, idx) => ({ id: `rw-${idx}-${Date.now()}`, ...w }));
  });

  const [currentLeftTitle, setCurrentLeftTitle] = useState<string>(leftTitle);
  const [currentRightTitle, setCurrentRightTitle] = useState<string>(rightTitle);

  // New argument input states
  const [newLeftLabel, setNewLeftLabel] = useState<string>("");
  const [newLeftWeight, setNewLeftWeight] = useState<number>(6);
  const [newRightLabel, setNewRightLabel] = useState<string>("");
  const [newRightWeight, setNewRightWeight] = useState<number>(6);

  // Totals & Torque
  const totalLeft = useMemo(
    () => leftWeights.reduce((sum, item) => sum + item.weight, 0),
    [leftWeights]
  );
  const totalRight = useMemo(
    () => rightWeights.reduce((sum, item) => sum + item.weight, 0),
    [rightWeights]
  );

  const netDiff = totalRight - totalLeft; // Positive = Right side is heavier

  // Smooth Angle mapping: Clamped to [-25, 25] degrees
  const angle = useMemo(() => {
    const totalMass = totalLeft + totalRight;
    if (totalMass === 0) return 0;
    const baseScale = Math.max(totalLeft, totalRight, 8);
    const ratio = netDiff / baseScale;
    const computed = ratio * 24;
    return Math.max(-25, Math.min(25, parseFloat(computed.toFixed(2))));
  }, [totalLeft, totalRight, netDiff]);

  // Dynamic Verdict Evaluation
  const verdict = useMemo(() => {
    const absAngle = Math.abs(angle);
    if (absAngle < 1.2) {
      return isZh
        ? "辩证均势 (Aporie / 僵局)：两造论据分值完全相当，处于反思平衡未决状态。"
        : "Im Gleichgewicht (Aporie / Patt): Keine Seite besitzt ein hinreichendes Übergewicht für eine eindeutige Deduktion.";
    }
    if (angle < 0) {
      const lead = (totalLeft - totalRight).toFixed(1);
      return isZh
        ? `【${currentLeftTitle}】占据显著主导（净胜分值 +${lead}，偏转 ${absAngle.toFixed(1)}°）。道义约束或原则优先律生效。`
        : `»${currentLeftTitle}« überwiegt mit ΔW = +${lead} Pkt. (Neigung: ${absAngle.toFixed(1)}° links). Die deontologische Schutzregel greift.`;
    } else {
      const lead = (totalRight - totalLeft).toFixed(1);
      return isZh
        ? `【${currentRightTitle}】占据显著主导（净胜分值 +${lead}，偏转 ${absAngle.toFixed(1)}°）。后果效用权衡压倒原则约束。`
        : `»${currentRightTitle}« überwiegt mit ΔW = +${lead} Pkt. (Neigung: ${absAngle.toFixed(1)}° rechts). Die teleologische Nutzenabwägung dominiert.`;
    }
  }, [angle, totalLeft, totalRight, currentLeftTitle, currentRightTitle, isZh]);

  useEffect(() => {
    onBalanceChange?.(angle, verdict);
  }, [angle, verdict, onBalanceChange]);

  // Handlers
  const handleAddLeft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeftLabel.trim()) return;
    setLeftWeights((prev) => [
      ...prev,
      { id: `lw-${Date.now()}`, label: newLeftLabel.trim(), weight: newLeftWeight },
    ]);
    setNewLeftLabel("");
    setNewLeftWeight(6);
  };

  const handleAddRight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRightLabel.trim()) return;
    setRightWeights((prev) => [
      ...prev,
      { id: `rw-${Date.now()}`, label: newRightLabel.trim(), weight: newRightWeight },
    ]);
    setNewRightLabel("");
    setNewRightWeight(6);
  };

  const handleUpdateWeight = (
    side: "left" | "right",
    id: string,
    delta: number
  ) => {
    const setter = side === "left" ? setLeftWeights : setRightWeights;
    setter((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, weight: Math.max(1, Math.min(20, item.weight + delta)) }
          : item
      )
    );
  };

  const handleRemoveWeight = (side: "left" | "right", id: string) => {
    const setter = side === "left" ? setLeftWeights : setRightWeights;
    setter((prev) => prev.filter((item) => item.id !== id));
  };

  const handleApplyPreset = (preset: ScalePreset) => {
    setCurrentLeftTitle(isZh ? preset.leftTitleZH : preset.leftTitleDE);
    setCurrentRightTitle(isZh ? preset.rightTitleZH : preset.rightTitleDE);
    setLeftWeights(
      preset.leftWeights.map((w, idx) => ({ id: `lw-preset-${idx}-${Date.now()}`, ...w }))
    );
    setRightWeights(
      preset.rightWeights.map((w, idx) => ({ id: `rw-preset-${idx}-${Date.now()}`, ...w }))
    );
  };

  const handleReset = () => {
    setLeftWeights([
      { id: `lw-res-1`, label: "Menschenwürde (Art. 1 GG)", weight: 9 },
      { id: `lw-res-2`, label: "Kategorisches Verbot", weight: 7 },
    ]);
    setRightWeights([
      { id: `rw-res-1`, label: "Nutzen für die Mehrheit", weight: 8 },
      { id: `rw-res-2`, label: "Schadensbegrenzung", weight: 6 },
    ]);
    setCurrentLeftTitle(leftTitle);
    setCurrentRightTitle(rightTitle);
  };

  // SVG Geometry Settings
  const viewW = 620;
  const viewH = 300;
  const pivotX = 310;
  const pivotY = 75;
  const leftPinX = 90;
  const leftPinY = 75;
  const rightPinX = 530;
  const rightPinY = 75;
  const panBaseY = 175;

  return (
    <div className="flex flex-col border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] font-mono text-xs">
      {/* 顶部标题与预设栏 */}
      <div className="border-b border-[var(--line)] px-4 py-2.5 flex flex-wrap items-center justify-between gap-2 bg-[var(--paper-subtle)]">
        <div className="flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M8 2v12M2 5l6-3 6 3M3 10l-1-5 2 1 1 4H3zM13 10l-1-5 2 1 1 4h-2z" />
          </svg>
          <span className="font-bold tracking-tight text-sm">
            {title || (isZh ? "价值与论证对决天平" : "Dilemma- & Argumentationswaage")}
          </span>
          <span className="px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[10px] text-[var(--ink-muted)]">
            Hebelwaage ±25°
          </span>
        </div>

        {/* 经典论辩预设选择 */}
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-[var(--ink-muted)] mr-1">
            {isZh ? "经典辩题:" : "Dilemma-Presets:"}
          </span>
          <select
            aria-label={isZh ? "选择经典辩题预设" : "Dilemma-Preset auswählen"}
            onChange={(e) => {
              const found = SCALE_PRESETS.find((p) => p.id === e.target.value);
              if (found) handleApplyPreset(found);
            }}
            className="text-[11px] px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] focus:outline-none cursor-pointer"
          >
            {SCALE_PRESETS.map((p) => (
              <option key={p.id} value={p.id}>
                {isZh ? p.titleZH : p.titleDE}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 核心机械天平 SVG 渲染区 (Pure Mechanical Beam Balance) */}
      <div className="p-3 sm:p-5 border-b border-[var(--line)] bg-[var(--paper)] flex flex-col items-center select-none">
        <div className="w-full max-w-2xl">
          <svg
            viewBox={`0 0 ${viewW} ${viewH}`}
            className="w-full h-auto"
            role="img"
            aria-label={isZh ? "物理机械力矩天平" : "Mechanische Hebelwaage"}
          >
            {/* 1. 底座与立柱支架 (Fixed Fulcrum Stand) */}
            {/* 底盘基座 */}
            <rect
              x="220"
              y="245"
              width="180"
              height="12"
              fill="var(--paper-subtle)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            {/* 梯形实心立柱 */}
            <path
              d={`M ${pivotX} ${pivotY} L 265 245 L 355 245 Z`}
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            {/* 内部工程加固细线 */}
            <line
              x1={pivotX}
              y1={pivotY + 12}
              x2={pivotX}
              y2={245}
              stroke="var(--line)"
              strokeWidth="1"
            />
            <line
              x1="285"
              y1="165"
              x2="335"
              y2="165"
              stroke="var(--line)"
              strokeWidth="1"
            />

            {/* 角度刻度盘 (Protractor Arc from -25° to +25°) */}
            <path
              d="M 272 125 A 58 58 0 0 1 348 125"
              fill="none"
              stroke="var(--ink)"
              strokeWidth="1.2"
              strokeDasharray="2,3"
            />
            {/* 刻度线 */}
            {[-20, -10, 0, 10, 20].map((deg) => {
              const rad = ((90 + deg) * Math.PI) / 180;
              const r1 = 54;
              const r2 = 62;
              const x1 = pivotX + r1 * Math.cos(rad);
              const y1 = pivotY + r1 * Math.sin(rad);
              const x2 = pivotX + r2 * Math.cos(rad);
              const y2 = pivotY + r2 * Math.sin(rad);
              return (
                <line
                  key={`deg-tick-${deg}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="var(--ink)"
                  strokeWidth={deg === 0 ? "1.5" : "1"}
                />
              );
            })}
            <text
              x={pivotX}
              y="142"
              textAnchor="middle"
              fill="var(--ink-muted)"
              className="font-mono text-[8px]"
            >
              0°
            </text>

            {/* 2. 旋转横梁体系 (Rotating Beam Assembly with Centered Transform) */}
            <g
              transform={`rotate(${angle}, ${pivotX}, ${pivotY})`}
              style={{
                transformOrigin: `${pivotX}px ${pivotY}px`,
                transformBox: "view-box",
                transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            >
              {/* 主横梁金属杆 */}
              <rect
                x="80"
                y={pivotY - 4}
                width="460"
                height="8"
                rx="2"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              {/* 横梁几何中轴细线 */}
              <line
                x1="82"
                y1={pivotY}
                x2="538"
                y2={pivotY}
                stroke="var(--line)"
                strokeWidth="1"
              />

              {/* 刚性固定在横梁上的指针 (Rigid Pointer Needle) */}
              <line
                x1={pivotX}
                y1={pivotY}
                x2={pivotX}
                y2={pivotY + 54}
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              <polygon
                points={`${pivotX},${pivotY + 58} ${pivotX - 3},${pivotY + 51} ${pivotX + 3},${pivotY + 51}`}
                fill="var(--ink)"
              />

              {/* 左右横梁悬挂销孔 */}
              <circle
                cx={leftPinX}
                cy={leftPinY}
                r="4.5"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />
              <circle
                cx={rightPinX}
                cy={rightPinY}
                r="4.5"
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth="1.5"
              />

              {/* 3. 左盘装配体 (Left Suspended Pan with Gravity Counter-Rotation) */}
              <g
                transform={`rotate(${-angle}, ${leftPinX}, ${leftPinY})`}
                style={{
                  transformOrigin: `${leftPinX}px ${leftPinY}px`,
                  transformBox: "view-box",
                  transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* 吊索 */}
                <line
                  x1={leftPinX}
                  y1={leftPinY}
                  x2="52"
                  y2={panBaseY}
                  stroke="var(--ink)"
                  strokeWidth="1.2"
                />
                <line
                  x1={leftPinX}
                  y1={leftPinY}
                  x2="128"
                  y2={panBaseY}
                  stroke="var(--ink)"
                  strokeWidth="1.2"
                />
                {/* 盘身承托碟 */}
                <path
                  d={`M 46 ${panBaseY} Q ${leftPinX} ${panBaseY + 16} 134 ${panBaseY} Z`}
                  fill="var(--paper-subtle)"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />

                {/* 左盘堆叠砝码块 (Stacked Weight Blocks) */}
                {leftWeights.slice(0, 5).map((w, idx) => {
                  const bH = 15;
                  const bW = 68;
                  const bX = leftPinX - bW / 2;
                  const bY = panBaseY - (idx + 1) * (bH + 1);
                  return (
                    <g key={w.id}>
                      <rect
                        x={bX}
                        y={bY}
                        width={bW}
                        height={bH}
                        fill="var(--paper)"
                        stroke="var(--ink)"
                        strokeWidth="1.2"
                      />
                      <text
                        x={leftPinX}
                        y={bY + 11}
                        textAnchor="middle"
                        fill="var(--ink)"
                        className="font-mono text-[8.5px] font-bold"
                      >
                        {w.weight} Pkt
                      </text>
                    </g>
                  );
                })}
                {leftWeights.length === 0 && (
                  <text
                    x={leftPinX}
                    y={panBaseY - 6}
                    textAnchor="middle"
                    fill="var(--ink-muted)"
                    className="font-mono text-[8px]"
                  >
                    (leer)
                  </text>
                )}
              </g>

              {/* 4. 右盘装配体 (Right Suspended Pan with Gravity Counter-Rotation) */}
              <g
                transform={`rotate(${-angle}, ${rightPinX}, ${rightPinY})`}
                style={{
                  transformOrigin: `${rightPinX}px ${rightPinY}px`,
                  transformBox: "view-box",
                  transition: "transform 400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {/* 吊索 */}
                <line
                  x1={rightPinX}
                  y1={rightPinY}
                  x2="492"
                  y2={panBaseY}
                  stroke="var(--ink)"
                  strokeWidth="1.2"
                />
                <line
                  x1={rightPinX}
                  y1={rightPinY}
                  x2="568"
                  y2={panBaseY}
                  stroke="var(--ink)"
                  strokeWidth="1.2"
                />
                {/* 盘身承托碟 */}
                <path
                  d={`M 486 ${panBaseY} Q ${rightPinX} ${panBaseY + 16} 574 ${panBaseY} Z`}
                  fill="var(--paper-subtle)"
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />

                {/* 右盘堆叠砝码块 */}
                {rightWeights.slice(0, 5).map((w, idx) => {
                  const bH = 15;
                  const bW = 68;
                  const bX = rightPinX - bW / 2;
                  const bY = panBaseY - (idx + 1) * (bH + 1);
                  return (
                    <g key={w.id}>
                      <rect
                        x={bX}
                        y={bY}
                        width={bW}
                        height={bH}
                        fill="var(--paper)"
                        stroke="var(--ink)"
                        strokeWidth="1.2"
                      />
                      <text
                        x={rightPinX}
                        y={bY + 11}
                        textAnchor="middle"
                        fill="var(--ink)"
                        className="font-mono text-[8.5px] font-bold"
                      >
                        {w.weight} Pkt
                      </text>
                    </g>
                  );
                })}
                {rightWeights.length === 0 && (
                  <text
                    x={rightPinX}
                    y={panBaseY - 6}
                    textAnchor="middle"
                    fill="var(--ink-muted)"
                    className="font-mono text-[8px]"
                  >
                    (leer)
                  </text>
                )}
              </g>
            </g>

            {/* 中心主转轴承 (Center Bearing Pin on Top) */}
            <circle
              cx={pivotX}
              cy={pivotY}
              r="7"
              fill="var(--paper)"
              stroke="var(--ink)"
              strokeWidth="1.5"
            />
            <circle cx={pivotX} cy={pivotY} r="2.5" fill="var(--ink)" />

            {/* 左右盘侧指示标语 */}
            <text
              x={leftPinX}
              y="280"
              textAnchor="middle"
              fill="var(--ink)"
              className="font-mono text-[10px] font-bold"
            >
              W_L = {totalLeft} Pkt
            </text>
            <text
              x={rightPinX}
              y="280"
              textAnchor="middle"
              fill="var(--ink)"
              className="font-mono text-[10px] font-bold"
            >
              W_R = {totalRight} Pkt
            </text>
            <text
              x={pivotX}
              y="278"
              textAnchor="middle"
              fill="var(--ink-muted)"
              className="font-mono text-[9px]"
            >
              {isZh ? "倾角" : "Neigung"}: {angle >= 0 ? `+${angle.toFixed(1)}°` : `${angle.toFixed(1)}°`} (ΔW={netDiff >= 0 ? `+${netDiff}` : netDiff})
            </text>
          </svg>
        </div>

        {/* 动态哲学与论证判决横幅 (Tufte Verdict Banner) */}
        <div className="w-full mt-2 border border-[var(--line)] p-2.5 bg-[var(--paper-subtle)] text-[11px] leading-relaxed flex items-start gap-2">
          <span className="font-bold px-1.5 py-0.5 bg-[var(--paper)] border border-[var(--line)] text-[10px] shrink-0">
            {isZh ? "天平判决" : "WAAGEN-URTEIL"}
          </span>
          <span className="text-[var(--ink)]">{verdict}</span>
        </div>
      </div>

      {/* 两造辩护工作台 (Dual Argument Adjustment Workbench) */}
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[var(--line)]">
        {/* 左侧阵营 (Left Column: e.g. Deontologie / Pro) */}
        <div className="p-4 space-y-3 bg-[var(--paper)]">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <div>
              <span className="text-[10px] text-[var(--ink-muted)] block uppercase">
                {isZh ? "左盘论据立场" : "Linke Waagschale"}
              </span>
              <h3 className="text-xs font-bold text-[var(--ink)]">{currentLeftTitle}</h3>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
              Σ {totalLeft}
            </span>
          </div>

          {/* 论据砝码卡片列表 */}
          <div className="space-y-2">
            {leftWeights.map((w) => (
              <div
                key={w.id}
                className="border border-[var(--line)] p-2 bg-[var(--paper-subtle)] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-[var(--ink)] truncate max-w-[200px]">
                    {w.label}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[10px] font-bold px-1.5 bg-[var(--paper)] border border-[var(--line)]">
                      {w.weight}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveWeight("left", w.id)}
                      className="px-1 text-[10px] text-[var(--ink-muted)] hover:text-[var(--ink)] border border-[var(--line)] bg-[var(--paper)] cursor-pointer"
                      title={isZh ? "移除此论据" : "Entfernen"}
                    >
                      [X]
                    </button>
                  </div>
                </div>

                {/* 权重微调器 */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--line)]">
                  <span className="text-[9px] text-[var(--ink-muted)]">
                    {isZh ? "论证权重 (Gewicht):" : "Gewichtung:"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleUpdateWeight("left", w.id, -1)}
                      className="px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] cursor-pointer text-[10px]"
                    >
                      -1
                    </button>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={w.weight}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setLeftWeights((prev) =>
                          prev.map((item) => (item.id === w.id ? { ...item, weight: val } : item))
                        );
                      }}
                      className="w-24 accent-[var(--ink)] cursor-pointer h-1.5 bg-[var(--line)]"
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdateWeight("left", w.id, 1)}
                      className="px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] cursor-pointer text-[10px]"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 新增论据表单 */}
          <form onSubmit={handleAddLeft} className="border border-[var(--line)] p-2.5 bg-[var(--paper)] space-y-2">
            <span className="text-[10px] font-bold text-[var(--ink-muted)] block">
              {isZh ? "+ 添加左侧论据砝码" : "+ Neues Argument hinzufügen"}
            </span>
            <div className="flex gap-2">
              <input
                id={newLeftLabelId}
                type="text"
                value={newLeftLabel}
                onChange={(e) => setNewLeftLabel(e.target.value)}
                placeholder={isZh ? "论点描述 (如: 无辜生命绝对保护)" : "Argument (z.B. Schutzpflicht)"}
                className="flex-1 px-2 py-1 text-[11px] border border-[var(--line)] bg-[var(--paper-subtle)] focus:outline-none focus:border-[var(--ink)]"
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newLeftWeight}
                  onChange={(e) => setNewLeftWeight(parseInt(e.target.value) || 1)}
                  className="w-12 px-1.5 py-1 text-[11px] border border-[var(--line)] bg-[var(--paper-subtle)] text-center focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] hover:bg-[var(--paper)] text-[10px] font-bold cursor-pointer transition-colors"
                >
                  {isZh ? "放入" : "Auflegen"}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* 右侧阵营 (Right Column: e.g. Utilitarismus / Contra) */}
        <div className="p-4 space-y-3 bg-[var(--paper)]">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
            <div>
              <span className="text-[10px] text-[var(--ink-muted)] block uppercase">
                {isZh ? "右盘论据立场" : "Rechte Waagschale"}
              </span>
              <h3 className="text-xs font-bold text-[var(--ink)]">{currentRightTitle}</h3>
            </div>
            <span className="font-mono text-xs font-bold px-2 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)]">
              Σ {totalRight}
            </span>
          </div>

          {/* 论据砝码卡片列表 */}
          <div className="space-y-2">
            {rightWeights.map((w) => (
              <div
                key={w.id}
                className="border border-[var(--line)] p-2 bg-[var(--paper-subtle)] space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[11px] text-[var(--ink)] truncate max-w-[200px]">
                    {w.label}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[10px] font-bold px-1.5 bg-[var(--paper)] border border-[var(--line)]">
                      {w.weight}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveWeight("right", w.id)}
                      className="px-1 text-[10px] text-[var(--ink-muted)] hover:text-[var(--ink)] border border-[var(--line)] bg-[var(--paper)] cursor-pointer"
                      title={isZh ? "移除此论据" : "Entfernen"}
                    >
                      [X]
                    </button>
                  </div>
                </div>

                {/* 权重微调器 */}
                <div className="flex items-center justify-between gap-2 pt-1 border-t border-[var(--line)]">
                  <span className="text-[9px] text-[var(--ink-muted)]">
                    {isZh ? "论证权重 (Gewicht):" : "Gewichtung:"}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleUpdateWeight("right", w.id, -1)}
                      className="px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] cursor-pointer text-[10px]"
                    >
                      -1
                    </button>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={w.weight}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setRightWeights((prev) =>
                          prev.map((item) => (item.id === w.id ? { ...item, weight: val } : item))
                        );
                      }}
                      className="w-24 accent-[var(--ink)] cursor-pointer h-1.5 bg-[var(--line)]"
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdateWeight("right", w.id, 1)}
                      className="px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] cursor-pointer text-[10px]"
                    >
                      +1
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 新增论据表单 */}
          <form onSubmit={handleAddRight} className="border border-[var(--line)] p-2.5 bg-[var(--paper)] space-y-2">
            <span className="text-[10px] font-bold text-[var(--ink-muted)] block">
              {isZh ? "+ 添加右侧论据砝码" : "+ Neues Argument hinzufügen"}
            </span>
            <div className="flex gap-2">
              <input
                id={newRightLabelId}
                type="text"
                value={newRightLabel}
                onChange={(e) => setNewRightLabel(e.target.value)}
                placeholder={isZh ? "论点描述 (如: 最大多数人的最大快乐)" : "Argument (z.B. Nutzenbilanz)"}
                className="flex-1 px-2 py-1 text-[11px] border border-[var(--line)] bg-[var(--paper-subtle)] focus:outline-none focus:border-[var(--ink)]"
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={newRightWeight}
                  onChange={(e) => setNewRightWeight(parseInt(e.target.value) || 1)}
                  className="w-12 px-1.5 py-1 text-[11px] border border-[var(--line)] bg-[var(--paper-subtle)] text-center focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2 py-1 border border-[var(--line)] bg-[var(--paper-subtle)] hover:border-[var(--ink)] hover:bg-[var(--paper)] text-[10px] font-bold cursor-pointer transition-colors"
                >
                  {isZh ? "放入" : "Auflegen"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* 底部重置与说明条 */}
      <div className="border-t border-[var(--line)] px-4 py-2 bg-[var(--paper-subtle)] flex items-center justify-between text-[10px] text-[var(--ink-muted)]">
        <span>
          {isZh
            ? "力矩法则: 杠杆偏角取决于两端力矩差 (ΔW = W_R - W_L)，支持实证辩论与反思平衡 (Reflective Equilibrium)。"
            : "Hebelgesetz: Die Neigung bildet das argumentative Übergewicht ab. Fördert das sokratische Überlegungsgleichgewicht."}
        </span>
        <button
          type="button"
          onClick={handleReset}
          className="px-2 py-0.5 border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--ink)] text-[var(--ink)] cursor-pointer"
        >
          {isZh ? "恢复初始配置" : "Zurücksetzen"}
        </button>
      </div>
    </div>
  );
};
