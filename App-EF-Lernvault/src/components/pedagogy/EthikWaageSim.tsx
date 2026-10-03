import { useState, useId } from "react";
import type { Lang } from "../../i18n";
import MathHtml from "../MathHtml";

export interface EthikWaageSimProps {
  lang: Lang;
  studioMode?: boolean;
  onExportFinding?: (text: string) => void;
}

export type DilemmaId = "trolley" | "triage" | "luege" | "autonom";

interface DilemmaConfig {
  id: DilemmaId;
  titleDE: string;
  titleZH: string;
  descDE: string;
  descZH: string;
  maximeDE: string;
  maximeZH: string;
  // Quantitative baseline
  livesAtRiskA: number; // lives saved if action taken
  livesLostA: number;   // lives sacrificed
  livesAtRiskB: number; // if inaction
  // Kantian flags
  widerspruchDenken: boolean; // logical contradiction in universal law
  widerspruchWollen: boolean; // rational contradiction in will
  instrumentalisierung: boolean; // violates Menschheitszweckformel (treated merely as a means)
  // Bentham calculus presets
  intensityA: number; // 1-10
  durationA: number;  // 1-10
  certaintyA: number; // 1-10
}

const DILEMMAS: Record<DilemmaId, DilemmaConfig> = {
  trolley: {
    id: "trolley",
    titleDE: "1. Das Weichen-Dilemma (Trolley Problem)",
    titleZH: "1. 经典电车难题：变道拉杆 vs. 桥上推人",
    descDE: "Ein führerloser Zug rast auf fünf Gleisarbeiter zu. Durch Umlegen einer Weiche wird er auf ein Nebengleis geleitet, wo genau ein Arbeiter getötet wird.",
    descZH: "一辆失控电车正冲向轨道上的五名工人。若扳动道岔，电车将转向侧线，但会轧死侧线上的一名无辜工人。",
    maximeDE: "„Ich will einen unbeteiligten Menschen opfern, um das Leben einer größeren Gruppe zu retten.“",
    maximeZH: "“为了拯救更多人，我可以主动牺牲一名原本不受威胁的无辜者。”",
    livesAtRiskA: 5,
    livesLostA: 1,
    livesAtRiskB: 5,
    widerspruchDenken: false,
    widerspruchWollen: true,
    instrumentalisierung: true, // the one is used merely as a physical instrument
    intensityA: 8,
    durationA: 9,
    certaintyA: 9,
  },
  triage: {
    id: "triage",
    titleDE: "2. Medizinische Notfall-Triage",
    titleZH: "2. 医疗极限分流：紧缺器官与ICU床位分配",
    descDE: "Fünf Intensivpatienten sterben ohne sofortige Organtransplantation. Ein gesunder Patient betritt die Klinik zum Routinecheck. Darf er getötet werden?",
    descZH: "重症监护室五位重病患者急需器官移植以维持生命。一名健康人前来体检，医生是否可以将其器官分配以拯救五人？",
    maximeDE: "„Ein Arzt darf gesunde Menschen töten, um mit ihren Organen mehrere andere Patienten zu heilen.“",
    maximeZH: "“医生可以杀害一名健康的就诊者，用其器官拯救多名其他垂危患者。”",
    livesAtRiskA: 5,
    livesLostA: 1,
    livesAtRiskB: 5,
    widerspruchDenken: true, // Arzt-Patient-Vertrauen and concept of medicine collapses completely
    widerspruchWollen: true,
    instrumentalisierung: true,
    intensityA: 9,
    durationA: 10,
    certaintyA: 8,
  },
  luege: {
    id: "luege",
    titleDE: "3. Das Lügenverbot (Mörder an der Tür)",
    titleZH: "3. 康德恶名昭彰的谎言困境：门口的凶手",
    descDE: "Ein Verfolger sucht deinen Freund, um ihn zu ermorden. Der Freund versteckt sich in deinem Haus. Der Mörder fragt dich direkt, ob er drinnen ist.",
    descZH: "一名持刀凶手追杀你的挚友。挚友藏匿在你的地窖中。凶手敲门质问你朋友是否在屋内。是否可以说一句善意的谎言？",
    maximeDE: "„Ich darf die Unwahrheit sagen, wenn eine Notlüge das Leben meines Freundes schützt.“",
    maximeZH: "“当说谎能挽救挚友生命时，我可以说出善意的谎言。”",
    livesAtRiskA: 1,
    livesLostA: 0,
    livesAtRiskB: 1,
    widerspruchDenken: true, // Wenn Lügen erlaubt ist, gibt es kein Versprechen/Aussage mehr
    widerspruchWollen: true,
    instrumentalisierung: false,
    intensityA: 7,
    durationA: 8,
    certaintyA: 6,
  },
  autonom: {
    id: "autonom",
    titleDE: "4. Autonomes Fahren im Dilemma",
    titleZH: "4. 自动驾驶算法伦理：牺牲车内乘客还是路上行人",
    descDE: "Die Bremsen eines autonomen Fahrzeugs versagen vor einer Schulklasse (10 Kinder). Ausweichen gegen eine Betonwand tötet den einzelnen Insassen.",
    descZH: "自动驾驶汽车刹车失灵，正前方是一队过马路的学生（10人）。若转向撞击水泥护栏，车内单名乘客将当场丧生。",
    maximeDE: "„Ein autonomer Fahr-Algorithmus soll im Zweifel den Insassen opfern, um eine höhere Personenanzahl im Außenraum zu schützen.“",
    maximeZH: "“算法在碰撞不可避免时应优先保护道路多数人，即使这会导致车主乘客当场牺牲。”",
    livesAtRiskA: 10,
    livesLostA: 1,
    livesAtRiskB: 10,
    widerspruchDenken: false,
    widerspruchWollen: true,
    instrumentalisierung: true,
    intensityA: 9,
    durationA: 9,
    certaintyA: 8,
  },
};

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function IconBalance() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="8" y1="2" x2="8" y2="14" />
      <line x1="3" y1="5" x2="13" y2="5" />
      <polygon points="3,5 1,10 5,10" />
      <polygon points="13,5 11,10 15,10" />
      <line x1="5" y1="14" x2="11" y2="14" />
    </svg>
  );
}

function IconPanels() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="12" height="12" rx="1.5" />
      <line x1="10" y1="2" x2="10" y2="14" />
    </svg>
  );
}

export function EthikWaageSim({
  lang,
  studioMode: _studioMode = true,
  onExportFinding,
}: EthikWaageSimProps) {
  void _studioMode;
  const isZh = lang === "zh";

  // Selected dilemma
  const [activeDilemmaId, setActiveDilemmaId] = useState<DilemmaId>("trolley");
  const dilemma = DILEMMAS[activeDilemmaId];

  // Bentham calculus slider state
  const [intensity, setIntensity] = useState<number>(dilemma.intensityA);
  const [duration, setDuration] = useState<number>(dilemma.durationA);
  const [certainty, setCertainty] = useState<number>(dilemma.certaintyA);
  const [showPanels, setShowPanels] = useState<boolean>(true);

  // Active step in Kant's 4-step Maximenprüfung
  const [activeKantStep, setActiveKantStep] = useState<number>(1);

  // Accessible IDs
  const intensityId = useId();
  const durationId = useId();
  const certaintyId = useId();

  // Switch Dilemma handler
  const handleSelectDilemma = (id: DilemmaId) => {
    setActiveDilemmaId(id);
    const d = DILEMMAS[id];
    setIntensity(d.intensityA);
    setDuration(d.durationA);
    setCertainty(d.certaintyA);
    setActiveKantStep(1);
  };

  // Quantitative Bentham calculus calculation
  // Net Utility Delta = (Saved lives * multiplier) - (Sacrificed lives * penalty)
  const hedonistWeight = (intensity * duration * certainty) / 50;
  const utilNetScore = Number(
    ((dilemma.livesAtRiskA - dilemma.livesLostA) * hedonistWeight).toFixed(1)
  );
  const utilVerdict = utilNetScore > 0 ? "Handlung geboten (Opfer gefordert)" : "Unterlassung geboten";
  const utilVerdictZH = utilNetScore > 0 ? "行为在道德上必须执行（功利最大化，允许牺牲少数）" : "禁止干涉（净幸福为负）";

  // Kantian Verdict
  const kantPassed = !dilemma.widerspruchDenken && !dilemma.widerspruchWollen && !dilemma.instrumentalisierung;
  const kantVerdict = kantPassed
    ? "Maxime moralisch zulässig (Freiheit & Pflicht gewahrt)"
    : "Maxime kategorisch verboten (Pflichtverletzung)";
  const kantVerdictZH = kantPassed
    ? "准则通过定言命令检验（符合普遍法则与道德自律）"
    : "准则被绝对命令断然否决！（违背绝对义务，属于不道德行为）";

  // Balance beam rotation angle (-12deg to +12deg)
  // Positive angle = tilting to Utilitarianism (Left down, Right up)
  // Negative angle = tilting to Kantian Duty (Right down, Left up)
  const balanceAngle = kantPassed ? 0 : clamp(utilNetScore * 1.5, 4, 11);

  // Export finding to AI Tutor
  const handleExport = () => {
    const report = isZh
      ? `【哲学伦理道德天平分析结论】
- 分析案例: ${dilemma.titleZH}
- 行为准则(Maxime): ${dilemma.maximeZH}
- 功利主义判决 (Utilitarismus / Bentham):
  * 净幸福值算量: ΔU = +${utilNetScore} (拯救 ${dilemma.livesAtRiskA} 人，牺牲 ${dilemma.livesLostA} 人)
  * 裁定: ${utilVerdictZH}
- 康德义务论判决 (Deontologie / Kant):
  * 思维无矛盾检验: ${dilemma.widerspruchDenken ? "❌ 产生逻辑自相矛盾 (Widerspruch im Denken)" : "✅ 思维逻辑自洽"}
  * 意志无矛盾检验: ${dilemma.widerspruchWollen ? "❌ 理性意志自相矛盾 (Widerspruch im Wollen)" : "✅ 意志可意愿为普遍法则"}
  * 人类目的自身公式: ${dilemma.instrumentalisierung ? "❌ 将他人仅仅作为工具手段 (Instrumentalisierungsverbot)" : "✅ 尊严得到尊重"}
  * 裁定: ${kantVerdictZH}
- 考纲核心冲突: 结果导向的最大多数幸福与康德人的绝对尊严不可侵犯性之间的不可调和矛盾。`
      : `【Ethik-Waage & Dilemma-Analyse】
- Fall: ${dilemma.titleDE}
- Maxime: ${dilemma.maximeDE}
- Utilitarismus (Bentham Kalkül):
  * Netto-Nutzen: ΔU = +${utilNetScore}
  * Urteil: ${utilVerdict}
- Deontologie (Kant Kategorischer Imperativ):
  * Widerspruch im Denken: ${dilemma.widerspruchDenken ? "JA (begrifflicher Widerspruch)" : "NEIN"}
  * Widerspruch im Wollen: ${dilemma.widerspruchWollen ? "JA (Selbstwiderspruch der Vernunft)" : "NEIN"}
  * Instrumentalisierungsverbot: ${dilemma.instrumentalisierung ? "VERLETZT (Mensch als bloßes Mittel)" : "EINGEHALTEN"}
  * Urteil: ${kantVerdict}
- Klausur-Synthese: Unüberbrückbare Antinomie zwischen konsequentialistischer Nutzenmaximierung und deontologischem Menschenwürdeschutz nach Art. 1 GG.`;

    if (onExportFinding) {
      onExportFinding(report);
    } else {
      navigator.clipboard.writeText(report);
      alert(isZh ? "伦理分析结论已复制到剪贴板！" : "Befund in die Zwischenablage kopiert!");
    }
  };

  return (
    <div className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 sm:p-5">
      {/* 1. Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)]">
            Labor 02 · GeWi-Labor · Philosophie IF2 EF/Q1 (KLP NRW)
          </div>
          <h3 className="font-serif text-lg font-semibold text-[var(--ink)] tracking-tight mt-0.5">
            {isZh ? "伦理道德天平与双轨决策工坊 (Ethik-Waage: Utilitarismus vs. Kant)" : "Ethik-Waage: Utilitarismus vs. Kantische Deontologie"}
          </h3>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleSelectDilemma("trolley")}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] rounded cursor-pointer transition-colors"
            title="Reset to Trolley"
          >
            <IconBalance />
            <span>{isZh ? "重置案例" : "Zurücksetzen"}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowPanels(!showPanels)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono border border-[var(--line)] bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] rounded cursor-pointer transition-colors"
            title="Toggle Control Panels"
          >
            <IconPanels />
            <span className="hidden sm:inline">{showPanels ? (isZh ? "折叠决策台" : "Panels verbergen") : (isZh ? "展开决策台" : "Panels anzeigen")}</span>
          </button>
        </div>
      </div>

      {/* 2. Dilemma Selection Bar (Segmented Control) */}
      <div className="flex flex-wrap gap-1.5 p-1 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-[var(--radius)]">
        {(Object.keys(DILEMMAS) as DilemmaId[]).map((id) => {
          const d = DILEMMAS[id];
          const active = activeDilemmaId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleSelectDilemma(id)}
              className={`flex-1 min-w-[140px] px-2.5 py-1.5 rounded text-xs font-serif text-left transition-colors cursor-pointer ${
                active
                  ? "bg-white text-[var(--ink)] font-semibold shadow-2xs border border-[var(--line)]"
                  : "text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-white/60"
              }`}
            >
              {isZh ? d.titleZH : d.titleDE}
            </button>
          );
        })}
      </div>

      {/* 3. Main Stage: Mechanical Balance Scale & Verdict Dual Cards */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Stage Area (Balance Scale SVG + Dilemma Description) */}
        <div className={`${showPanels ? "col-span-12 lg:col-span-7" : "col-span-12"} transition-all duration-300 space-y-3`}>
          {/* SVG Balance Scale Container */}
          <div className="relative border border-[var(--line)] rounded-[var(--radius)] bg-[#fafafa] p-4 flex flex-col items-center justify-center overflow-hidden min-h-[300px]">
            <svg
              width="440"
              height="220"
              viewBox="0 0 440 220"
              className="overflow-visible"
              aria-label="Ethische Waage"
            >
              {/* Stand Base */}
              <path d="M 180 205 L 260 205 L 240 180 L 200 180 Z" fill="#e4e4e7" stroke="#71717a" strokeWidth="1.5" />
              <rect x="216" y="55" width="8" height="125" fill="#a1a1aa" />
              <circle cx="220" cy="55" r="7" fill="#3f3f46" />

              {/* Rotating Balance Beam */}
              <g
                transform={`rotate(${balanceAngle}, 220, 55)`}
                className="transition-transform duration-500 ease-out"
              >
                {/* Horizontal Beam */}
                <rect x="40" y="52" width="360" height="6" rx="2" fill="#3f3f46" />
                <circle cx="60" cy="55" r="4" fill="#18181b" />
                <circle cx="380" cy="55" r="4" fill="#18181b" />

                {/* Left Pan (Utilitarismus: Net Benefit) */}
                <g transform="translate(60, 55)">
                  <line x1="0" y1="0" x2="-25" y2="45" stroke="#71717a" strokeWidth="1.2" />
                  <line x1="0" y1="0" x2="25" y2="45" stroke="#71717a" strokeWidth="1.2" />
                  {/* Pan plate */}
                  <ellipse cx="0" cy="48" rx="35" ry="8" fill="#d1fae5" stroke="#065f46" strokeWidth="1.8" />
                  {/* Weights stacked (Saved lives) */}
                  <rect x="-18" y="30" width="36" height="14" rx="2" fill="#065f46" />
                  <text x="0" y="41" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-bold">
                    +{utilNetScore} Nutzen
                  </text>
                </g>

                {/* Right Pan (Kant: Deontologie & Würde) */}
                <g transform="translate(380, 55)">
                  <line x1="0" y1="0" x2="-25" y2="45" stroke="#71717a" strokeWidth="1.2" />
                  <line x1="0" y1="0" x2="25" y2="45" stroke="#71717a" strokeWidth="1.2" />
                  {/* Pan plate */}
                  <ellipse cx="0" cy="48" rx="35" ry="8" fill={kantPassed ? "#dbeafe" : "#ffe4e6"} stroke={kantPassed ? "#1e40af" : "#9f1239"} strokeWidth="1.8" />
                  {/* Weight (Kantian Pflicht) */}
                  <rect x="-18" y="30" width="36" height="14" rx="2" fill={kantPassed ? "#1e40af" : "#9f1239"} />
                  <text x="0" y="41" textAnchor="middle" fill="#ffffff" className="font-mono text-[9px] font-bold">
                    {kantPassed ? "Pflicht ✓" : "Verbot ✗"}
                  </text>
                </g>
              </g>

              {/* Scale Labels */}
              <text x="60" y="195" textAnchor="middle" className="font-serif text-[11px] fill-[#065f46] font-semibold">
                Utilitarismus (Nutzen)
              </text>
              <text x="380" y="195" textAnchor="middle" className="font-serif text-[11px] fill-[#1e40af] font-semibold">
                Kant (Würde & Pflicht)
              </text>
            </svg>

            {/* Verdict Capsule */}
            <div className="w-full mt-2 p-2.5 bg-white/90 border border-[var(--line)] rounded text-xs space-y-1 shadow-2xs">
              <div className="flex items-center justify-between text-[11px] font-mono text-[var(--ink-muted)]">
                <span>{isZh ? "行为准则 (Maxime)" : "Handlungsmaxime"}</span>
                <span className="font-semibold text-rose-800">
                  {kantPassed ? (isZh ? "康德允许" : "Kantisch zulässig") : (isZh ? "康德严厉禁止" : "Kategorisch verboten")}
                </span>
              </div>
              <p className="font-serif italic text-[var(--ink)] text-[12px] leading-relaxed">
                {isZh ? dilemma.maximeZH : dilemma.maximeDE}
              </p>
            </div>
          </div>

          {/* Dilemma Story Briefing */}
          <div className="p-3 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] text-xs text-[var(--ink)] leading-relaxed">
            <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-muted)] block mb-0.5">
              {isZh ? "考纲案例情境 (Kontext)" : "Fall-Kontext"}
            </span>
            {isZh ? dilemma.descZH : dilemma.descDE}
          </div>
        </div>

        {/* Right Decision & Dialectic Workbench */}
        {showPanels && (
          <div className="col-span-12 lg:col-span-5 space-y-3 font-mono text-xs">
            {/* 1. Track A: Bentham Hedonistisches Kalkül */}
            <div className="p-3 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] space-y-2.5">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                <span className="font-serif font-semibold text-[#065f46] text-xs">
                  {isZh ? "边沁快乐量度法 (Hedonistisches Kalkül)" : "Bentham: Hedonistisches Kalkül"}
                </span>
                <span className="font-mono text-[11px] text-[#065f46] font-bold">
                  ΔU = +{utilNetScore}
                </span>
              </div>

              {/* Sliders */}
              <div className="space-y-2 text-[11px]">
                <div>
                  <div className="flex justify-between items-center text-[var(--ink)] mb-0.5">
                    <label htmlFor={intensityId} className="cursor-pointer">
                      {isZh ? "快乐强度 (Intensität):" : "Intensität der Freude/Leid:"}
                    </label>
                    <span className="font-semibold">{intensity}/10</span>
                  </div>
                  <input
                    id={intensityId}
                    type="range"
                    min="1"
                    max="10"
                    value={intensity}
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full accent-[#065f46] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-[var(--ink)] mb-0.5">
                    <label htmlFor={durationId} className="cursor-pointer">
                      {isZh ? "持续时间 (Dauer):" : "Dauer der Wirkung:"}
                    </label>
                    <span className="font-semibold">{duration}/10</span>
                  </div>
                  <input
                    id={durationId}
                    type="range"
                    min="1"
                    max="10"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full accent-[#065f46] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center text-[var(--ink)] mb-0.5">
                    <label htmlFor={certaintyId} className="cursor-pointer">
                      {isZh ? "发生确定性 (Gewissheit):" : "Gewissheit des Eintretens:"}
                    </label>
                    <span className="font-semibold">{certainty}/10</span>
                  </div>
                  <input
                    id={certaintyId}
                    type="range"
                    min="1"
                    max="10"
                    value={certainty}
                    onChange={(e) => setCertainty(parseInt(e.target.value))}
                    className="w-full accent-[#065f46] cursor-pointer"
                  />
                </div>
              </div>

              {/* Bentham Verdict Box */}
              <div className="p-2 rounded bg-emerald-50/70 border border-emerald-200 text-emerald-950 text-[11px] leading-snug">
                <strong>{isZh ? "功利主义判决: " : "Utilitaristisches Urteil: "}</strong>
                {isZh ? utilVerdictZH : utilVerdict}
              </div>
            </div>

            {/* 2. Track B: Kant 4-Step Maximenprüfung */}
            <div className="p-3 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] space-y-2.5">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                <span className="font-serif font-semibold text-[#1e40af] text-xs">
                  {isZh ? "康德定言命令四步检验 (Maximenprüfung)" : "Kant: 4-Schritt Maximenprüfung"}
                </span>
                <span className={`font-mono text-[11px] font-bold ${kantPassed ? "text-blue-800" : "text-rose-800"}`}>
                  {kantPassed ? "Gültig ✓" : "Verstoßen ✗"}
                </span>
              </div>

              {/* 4 Steps Pills */}
              <div className="grid grid-cols-4 gap-1 text-[10px] text-center">
                {[1, 2, 3, 4].map((step) => (
                  <button
                    key={step}
                    type="button"
                    onClick={() => setActiveKantStep(step)}
                    className={`py-1 rounded border transition-colors cursor-pointer ${
                      activeKantStep === step
                        ? "bg-[#1e40af] text-white border-[#1e40af] font-semibold"
                        : "bg-[var(--paper-subtle)] text-[var(--ink-muted)] border-[var(--line)] hover:bg-[var(--line)]"
                    }`}
                  >
                    Stufe {step}
                  </button>
                ))}
              </div>

              {/* Active Step Content */}
              <div className="p-2.5 rounded bg-[var(--paper-subtle)] border border-[var(--line)] text-[11px] leading-relaxed space-y-1">
                {activeKantStep === 1 && (
                  <div>
                    <div className="font-bold text-[var(--ink)] mb-0.5">Schritt 1: Maxime formulieren</div>
                    <p className="text-[var(--ink-muted)]">
                      {isZh
                        ? "将具体主观行为意图提炼为包含条件、手段与目的的主观行为准则。"
                        : "Handlungsabsicht als subjektiven Grundsatz formulieren."}
                    </p>
                  </div>
                )}
                {activeKantStep === 2 && (
                  <div>
                    <div className="font-bold text-[var(--ink)] mb-0.5">Schritt 2: Universalisierung</div>
                    <p className="text-[var(--ink-muted)]">
                      {isZh
                        ? "将该准则设想为一个所有理性人无条件遵守的普遍自然法则。"
                        : "Die Maxime gedanklich zu einem allgemeinen Naturgesetz erheben."}
                    </p>
                  </div>
                )}
                {activeKantStep === 3 && (
                  <div>
                    <div className="font-bold text-[var(--ink)] mb-0.5">Schritt 3: Widerspruch im Denken?</div>
                    <p className={dilemma.widerspruchDenken ? "text-rose-900 font-medium" : "text-emerald-900 font-medium"}>
                      {dilemma.widerspruchDenken
                        ? (isZh ? "❌ 产生概念矛盾：此法则普遍化会导致该制度自我毁灭（如普遍谎言使得承诺不复存在）。" : "❌ Widerspruch im Denken: Begriff zerstört sich selbst.")
                        : (isZh ? "✅ 无逻辑自相矛盾：在思维中可以被设想为一个自然法则。" : "✅ Denkbar ohne logischen Selbstwiderspruch.")}
                    </p>
                  </div>
                )}
                {activeKantStep === 4 && (
                  <div>
                    <div className="font-bold text-[var(--ink)] mb-0.5">Schritt 4: Widerspruch im Wollen & Würde</div>
                    <p className={!kantPassed ? "text-rose-900 font-medium" : "text-emerald-900 font-medium"}>
                      {dilemma.instrumentalisierung
                        ? (isZh ? "❌ 违反目的自身公式：受害者被仅仅当作了拯救他人的工具手段，践踏了人的尊严。" : "❌ Verstoß gegen Menschheitszweckformel: Mensch nur als Mittel missbraucht.")
                        : (isZh ? "✅ 符合理性意志：不违背人自为目的的道德自律。" : "✅ Mit vernünftigem Willen vereinbar.")}
                    </p>
                  </div>
                )}
              </div>

              {/* Kant Verdict Box */}
              <div className={`p-2 rounded text-[11px] leading-snug border ${
                kantPassed ? "bg-blue-50/70 border-blue-200 text-blue-950" : "bg-rose-50/70 border-rose-200 text-rose-950"
              }`}>
                <strong>{isZh ? "康德义务论判决: " : "Kantisches Urteil: "}</strong>
                {isZh ? kantVerdictZH : kantVerdict}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Four-Card Bilingual Pedagogical Scaffold (PHET SOP Standard) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        {/* 01 / Formel & Maximen */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">01 / Formel & Gesetz</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">Kategorischer Imperativ</div>
          <div className="font-mono text-xs text-blue-900 mb-1.5">
            <MathHtml
              code={"\\text{KI} = \\text{Handle nur nach der Maxime...}"}
              display={false}
              cacheKey="ki_grundformel"
            />
          </div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "绝对命令普遍法则：仅依据你同时能意愿其成为普遍自然法则的准则而行事。"
              : "Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde."}
          </p>
        </div>

        {/* 02 / Abitur KLP NRW */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">02 / Abitur KLP NRW</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">Inhaltsfeld 2: Ethik</div>
          <div className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            <strong>Operator:</strong> <code className="bg-[var(--paper-subtle)] px-1 rounded">beurteilen</code>
            <p className="mt-1">
              {isZh
                ? "必须熟练运用功利主义四原则与定言命令四步检验法对困境做双向判定（AFB III）。"
                : "Ethische Dilemmata kriteriengeleitet aus utilitaristischer und deontologischer Sicht beurteilen."}
            </p>
          </div>
        </div>

        {/* 03 / 🇨🇳 CN-Methode */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)]">
          <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">03 / 🇨🇳 CN-Methode</div>
          <div className="font-serif font-medium text-[var(--ink)] mb-1">义利双轨决策图</div>
          <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
            {isZh
              ? "解题口诀：边沁算账看人数与持续，康德看人是否变工具。只要把人当肉盾垫脚石，康德必定一票否决。"
              : "Merkregel: Bentham zählt Köpfe und Nettofreude, Kant verbietet den Menschen als bloßes Werkzeug."}
          </p>
        </div>

        {/* 04 / KI-Tutor Dialog */}
        <div className="p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] flex flex-col justify-between">
          <div>
            <div className="font-mono text-[10px] text-[var(--ink-muted)] uppercase mb-1">04 / KI-Tutor Dialog</div>
            <div className="font-serif font-medium text-[var(--ink)] mb-1">Befunde exportieren</div>
            <p className="text-[var(--ink-muted)] text-[11px] leading-relaxed">
              {isZh ? "将当前天平裁决数据导出至 AI 助教，生成 14 分满分会考论述题解答。" : "Übertrage die Dilemma-Befunde direkt an den KI-Tutor."}
            </p>
          </div>
          <button
            type="button"
            onClick={handleExport}
            className="mt-2.5 w-full py-1.5 px-2 bg-[var(--paper-subtle)] hover:bg-[var(--line)] text-[var(--ink)] border border-[var(--line)] rounded text-[11px] font-medium transition-colors cursor-pointer"
          >
            {isZh ? "发送给 AI 助教研讨 ↗" : "An Tutor senden ↗"}
          </button>
        </div>
      </div>
    </div>
  );
}
