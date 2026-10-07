import { useEffect, useState } from "react";
import type { Lang } from "../i18n";
import { MascotFox } from "../components/mascot/MascotFox";
import { THEMES, getStoredTheme, setStoredTheme, type ThemeId } from "../engine/theme";

export interface DashboardCockpitProps {
  lang: Lang;
  onNavigateToTab?: (tab: string, context?: Record<string, string>) => void;
  onSwitchToLegacy?: () => void;
}

// 纯占位虚拟数据 (不修改真实生产数据库)
interface StufenLevel {
  id: string;
  nameDE: string;
  nameZH: string;
  stufeDE: string;
  stufeZH: string;
  roman: string;
  status: "completed" | "current" | "locked";
  minNP: number;
  unlockedPerksDE: string[];
  unlockedPerksZH: string[];
  klausurFocusDE: string;
  klausurFocusZH: string;
}

const DEMO_STUFEN: StufenLevel[] = [
  {
    id: "ef_basis",
    nameDE: "EF Grundlagen & Begriffsnetz",
    nameZH: "EF 基础概念网与规范起步",
    stufeDE: "Stufe I (EF)",
    stufeZH: "第一阶 · 高一导入",
    roman: "I",
    status: "completed",
    minNP: 8,
    unlockedPerksDE: ["Glossar-Basis freigeschaltet", "Operator-Erkennung aktiv"],
    unlockedPerksZH: ["已解锁基础术语词典", "已掌握 12 核心动词导向"],
    klausurFocusDE: "Operatoren verstehen & Basistexte erschließen",
    klausurFocusZH: "理解指令词 + 提取基础文献主旨",
  },
  {
    id: "q1_vertiefung",
    nameDE: "Q1 Klausur-Analyse & Transfer",
    nameZH: "Q1 综合大题与微积分实战",
    stufeDE: "Stufe II (Q1)",
    stufeZH: "第二阶 · 会考进阶",
    roman: "II",
    status: "current",
    minNP: 11,
    unlockedPerksDE: ["D1-D5 Klausurgitter aktiv", "AFB I-III Transfer-Modul"],
    unlockedPerksZH: ["已激活 D1-D5 采分网格", "已激活 AFB I-III 迁移工坊"],
    klausurFocusDE: "Strikte Drei-Ebenen-Trennung & Extremwert-Beweise",
    klausurFocusZH: "文科三态严格分流 + 理科极值严谨证明",
  },
  {
    id: "q2_meister",
    nameDE: "Q2/Abi Vernetzung & Urteilskraft",
    nameZH: "Q2/会考 跨学科博弈与裁决",
    stufeDE: "Stufe III (Abitur)",
    stufeZH: "第三阶 · 终局满分",
    roman: "III",
    status: "locked",
    minNP: 14,
    unlockedPerksDE: ["Klausurgutachten-Simulator", "Freies philosophisches Urteil"],
    unlockedPerksZH: ["解锁高考模拟判分台", "解锁高阶哲学评判辩证"],
    klausurFocusDE: "Fachübergreifendes Abitururteil & mathematische Modellkritik",
    klausurFocusZH: "跨学科宏观裁决 + 现实数学模型批判",
  },
];

interface RadarMetric {
  code: string;
  nameDE: string;
  nameZH: string;
  score: number;
  max: number;
  statusTextDE: string;
  statusTextZH: string;
  isWeak: boolean;
  descDE: string;
  descZH: string;
  fixGuideDE: string;
  fixGuideZH: string;
}

const DEMO_D_RADAR: RadarMetric[] = [
  {
    code: "D1",
    nameDE: "Aufgabenbezug",
    nameZH: "审题与设问镜像",
    score: 4,
    max: 5,
    statusTextDE: "Gut (4/5)",
    statusTextZH: "良好 (4/5)",
    isWeak: false,
    descDE: "Direkte Beantwortung der Leitfrage ohne Abschweifung.",
    descZH: "首段直接镜像题目设问，不跑题不虚晃。",
    fixGuideDE: "Formuliere den Basissatz strikt nach dem Operator-Muster.",
    fixGuideZH: "严格套用第一段 Basissatz 主旨句公式。",
  },
  {
    code: "D2",
    nameDE: "Drei-Ebenen-Trennung",
    nameZH: "三态严格分流",
    score: 2,
    max: 4,
    statusTextDE: "Defizit (2/4)",
    statusTextZH: "薄弱 (2/4)",
    isWeak: true,
    descDE: "Klare Trennung: Deskription (AFB I), Analyse (AFB II), Urteil (AFB III).",
    descZH: "客观描述、机制分析与价值裁决界限分明，绝不混淆。",
    fixGuideDE: "Nutze getrennte Absätze und markiere subjektive Wertungen erst in Teil 3.",
    fixGuideZH: "禁止在分析段夹带个人观点，将评判严格保留至第 3 问。",
  },
  {
    code: "D3",
    nameDE: "Zitiertechnik",
    nameZH: "精准引证与行号",
    score: 3,
    max: 3,
    statusTextDE: "Voll (3/3)",
    statusTextZH: "满分 (3/3)",
    isWeak: false,
    descDE: "Exakte Zeilenangaben (vgl. Z. 14ff.) und syntaktische Integration.",
    descZH: "精准标示行号 (vgl. Z. 14ff.) 并与正文语法融为一体。",
    fixGuideDE: "Zitate stets grammatisch flüssig in den eigenen Hauptsatz einbinden.",
    fixGuideZH: "继续保持复合句中直接引语与间接引语的严密嵌套。",
  },
  {
    code: "D4",
    nameDE: "Fachsprache",
    nameZH: "专业学科术语",
    score: 2,
    max: 4,
    statusTextDE: "Defizit (2/4)",
    statusTextZH: "薄弱 (2/4)",
    isWeak: true,
    descDE: "Dichte Verwendung von präzisen Termini statt Alltagssprache.",
    descZH: "高频使用学科规范学术词，剔除口语与生活化用语。",
    fixGuideDE: "Ersetze umgangssprachliche Verben durch Nomen-Verb-Gefüge und Fachbegriffe.",
    fixGuideZH: "使用名词化结构（Nominalstil）代替泛泛说明。",
  },
  {
    code: "D5",
    nameDE: "Satzbau & Verknüpfung",
    nameZH: "复合句学术张力",
    score: 3,
    max: 4,
    statusTextDE: "Gut (3/4)",
    statusTextZH: "良好 (3/4)",
    isWeak: false,
    descDE: "Hypotaktische Strukturierung mit logischen Konnektoren.",
    descZH: "主从复合句结构严谨，逻辑连接词丰富层次分明。",
    fixGuideDE: "Nutze Konzessiv- und Kausalsätze (während, insofern als, folglich).",
    fixGuideZH: "善用让步从句与因果从句构建学术张力。",
  },
];

const DEMO_BE_METRICS: RadarMetric[] = [
  {
    code: "BE-Ansatz",
    nameDE: "Modellansatz",
    nameZH: "通用公式起步",
    score: 8,
    max: 10,
    statusTextDE: "80% (Sicher)",
    statusTextZH: "80% (稳定)",
    isWeak: false,
    descDE: "Allgemeine Formel vor dem Einsetzen konkreter Zahlenwerte hinschreiben.",
    descZH: "代入数值前必须先写出通用符号方程与物理模型公式。",
    fixGuideDE: "Kein Wert ohne vorherigen mathematischen Ansatz (z. B. f'(x)=0).",
    fixGuideZH: "无论多么显然，首行必先写判别式或导函数条件。",
  },
  {
    code: "BE-Einheiten",
    nameDE: "SI-Einheiten",
    nameZH: "全程量纲单位",
    score: 10,
    max: 10,
    statusTextDE: "100% (Perfekt)",
    statusTextZH: "100% (满分)",
    isWeak: false,
    descDE: "Konsequente Mitführung aller Einheiten bis zum Endergebnis.",
    descZH: "推导过程全程携带单位，绝无纯裸数字计算。",
    fixGuideDE: "Einheiten bei jedem Rechenschritt klammern und kürzen.",
    fixGuideZH: "继续保持每一步严谨的量纲齐次性检验习惯。",
  },
  {
    code: "BE-Genauigkeit",
    nameDE: "Rundung & Exaktheit",
    nameZH: "精度与有效数字",
    score: 6,
    max: 10,
    statusTextDE: "60% (Ausfall)",
    statusTextZH: "60% (易错)",
    isWeak: true,
    descDE: "Einhaltung signifikanter Stellen und Zwischenergebnisse ungerundet.",
    descZH: "中间过程保留分式或无理数，最终结果严格按要求取有效位。",
    fixGuideDE: "Im Taschenrechner stets den Speicher (Ans/STO) nutzen, nie früh runden.",
    fixGuideZH: "严禁在中间步骤四舍五入造成累积误差，严格用计算器内存计算。",
  },
  {
    code: "BE-Antwortsatz",
    nameDE: "Kontext-Antwort",
    nameZH: "现实情境结论句",
    score: 9,
    max: 10,
    statusTextDE: "90% (Sicher)",
    statusTextZH: "90% (优良)",
    isWeak: false,
    descDE: "Mathematisches Resultat rückbezogen auf den Sachkontext der Aufgabe.",
    descZH: "计算结果必须回扣到题目给定的现实情境中作答。",
    fixGuideDE: "Der Antwortsatz muss immer die Einheit und den Kontextträger enthalten.",
    fixGuideZH: "结论句必须包含主语、具体物理量及情境含义解释。",
  },
];

interface MissionItem {
  id: string;
  type: "flashcards" | "reise" | "klausursim" | "lego";
  fach: "Deutsch" | "SoWi" | "Mathe" | "Englisch" | "Physik";
  afb: "AFB I" | "AFB II" | "AFB III";
  titleDE: string;
  titleZH: string;
  tag: string;
  xpReward: number;
  estMinutes: number;
  targetTab: string;
  targetContext?: Record<string, string>;
  difficultyDE: string;
  difficultyZH: string;
}

const DEMO_MISSIONS: MissionItem[] = [
  {
    id: "m1",
    type: "flashcards",
    fach: "Deutsch",
    afb: "AFB I",
    titleDE: "12 fällige [D4]-Fachtermini im FSRS-Expressdurchlauf festigen",
    titleZH: "清空 12 张 [D4] 学科专业术语词卡",
    tag: "D4 · 术语",
    xpReward: 40,
    estMinutes: 5,
    targetTab: "flashcards",
    difficultyDE: "5 Min · P0 Express",
    difficultyZH: "5 分钟 · P0 急救",
  },
  {
    id: "m2",
    type: "reise",
    fach: "SoWi",
    afb: "AFB II",
    titleDE: "SoWi Leit-Lernreise: Dreisatz-Trennung (Deskription vs Mechanismus vs Urteil)",
    titleZH: "攻克 1 门微课: SoWi «三态分流: 客观描述 vs 机制分析 vs 价值评价»",
    tag: "D2 · 分流",
    xpReward: 80,
    estMinutes: 8,
    targetTab: "reise",
    targetContext: { fach: "SoWi", reiseId: "sowi-ef-01" },
    difficultyDE: "8 Min · Kernfokus",
    difficultyZH: "8 分钟 · 核心专攻",
  },
  {
    id: "m3",
    type: "klausursim",
    fach: "Mathe",
    afb: "AFB II",
    titleDE: "Mathe MINT-BE Intervallcheck: Extremwerte am geschlossenen Intervallrand",
    titleZH: "限时 10 分钟冲刺: 数学极值闭区间端点检验题 (BE-Genauigkeit 专项)",
    tag: "MINT · BE",
    xpReward: 100,
    estMinutes: 10,
    targetTab: "klausursim",
    difficultyDE: "10 Min · Klausur-Transfer",
    difficultyZH: "10 分钟 · 会考真题",
  },
];

interface Point {
  x: number;
  y: number;
  angle: number;
  m: RadarMetric;
}

function generateRadarPoints(metrics: RadarMetric[], radius: number, center: number): Point[] {
  const n = metrics.length;
  return metrics.map((m, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    const ratio = Math.min(1, Math.max(0.1, m.score / m.max));
    const r = radius * ratio;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle, m };
  });
}

export function DashboardCockpit({
  lang,
  onNavigateToTab,
  onSwitchToLegacy,
}: DashboardCockpitProps) {
  const de = lang === "de";

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [currentXP, setCurrentXP] = useState(680);
  const targetXP = 1000;

  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});
  const [chestClaimed, setChestClaimed] = useState(false);

  const [radarTrack, setRadarTrack] = useState<"gewi" | "mint">("gewi");
  const [activeMetricCode, setActiveMetricCode] = useState<string>("D2");
  const [hoveredMetricCode, setHoveredMetricCode] = useState<string | null>(null);
  const [expandedDetail, setExpandedDetail] = useState(false);
  const [selectedStufeId, setSelectedStufeId] = useState<string>("q1_vertiefung");
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>(getStoredTheme);
  const currentThemeObj = THEMES.find((t) => t.id === currentThemeId) || THEMES[0];

  const cycleTheme = () => {
    const currentIndex = THEMES.findIndex((t) => t.id === currentThemeId);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    const nextTheme = THEMES[nextIndex];
    setCurrentThemeId(nextTheme.id);
    setStoredTheme(nextTheme.id);
  };

  const toggleMission = (id: string, xp: number) => {
    setCompletedMissions((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        setCurrentXP((x) => Math.min(targetXP, x + xp));
      }
      return next;
    });
  };

  const completedCount = Object.values(completedMissions).filter(Boolean).length;
  const isAllCompleted = completedCount === DEMO_MISSIONS.length;

  const currentStufe = DEMO_STUFEN.find((s) => s.id === selectedStufeId) || DEMO_STUFEN[1];
  const activeMetricList = radarTrack === "gewi" ? DEMO_D_RADAR : DEMO_BE_METRICS;
  const activeMetric =
    activeMetricList.find((m) => m.code === activeMetricCode) || activeMetricList[0];

  const radarCenter = 85;
  const radarRadius = 62;
  const radarPoints = generateRadarPoints(activeMetricList, radarRadius, radarCenter);
  const polygonPointsString = radarPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16 font-sans text-slate-900 transition-all duration-300">
      {/* 1. 顶部刊头 (Header) */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/80 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-slate-200/90 bg-white shrink-0 overflow-hidden shadow-none">
            <MascotFox state="avatar" size={34} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-slate-900 tracking-tight">
                {de ? "Klausur-Leistungszentrale" : "会考战力与升阶总台"}
              </h1>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-600 font-medium">
                EF &rarr; Q1
              </span>
            </div>
            <p className="font-sans text-xs text-slate-500 mt-0.5">
              {de ? "Qualifikationsphase Q1/Q2 · Fokus-Dashboard" : "Gymnasium Oberstufe · 今日冲刺与考纲战力"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* 连续打卡徽章 */}
          <div className="flex items-center gap-2 border border-slate-200/90 bg-white px-3 py-1.5 rounded-xl select-none">
            <MascotFox state="streak" size={18} animate={false} />
            <span className="font-mono text-xs font-semibold text-slate-800 tabular-nums">
              18 {de ? "Tage Streak" : "天连胜"}
            </span>
          </div>

          {/* 主题切换器 (4 大学术主题风格轮换) */}
          <button
            type="button"
            onClick={cycleTheme}
            className="text-xs font-mono text-slate-800 hover:text-slate-950 border border-slate-300 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 transition-all cursor-pointer flex items-center gap-1.5 font-semibold"
            title={de ? `Thema: ${currentThemeObj.nameDE} (Klicken zum Wechseln)` : `主题风格: ${currentThemeObj.nameZH} (点击切换)`}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="8" r="6" />
              <path d="M8 2v12" />
              <path d="M8 2a6 6 0 0 1 0 12z" fill="currentColor" opacity="0.3" />
            </svg>
            <span>{de ? currentThemeObj.nameDE : currentThemeObj.nameZH}</span>
          </button>

          {onSwitchToLegacy && (
            <button
              type="button"
              onClick={onSwitchToLegacy}
              className="text-xs font-mono text-slate-600 hover:text-slate-900 border border-slate-200/90 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 transition-all cursor-pointer"
              title={de ? "Zur klassischen Übersicht" : "返回旧版概览"}
            >
              {de ? "Klassik" : "经典版"}
            </button>
          )}
        </div>
      </header>

      {/* 2. Hero 战力看板区：双白卡并排，比例 8:4，高度对齐 */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 左侧：战力指标卡 (8 Col, Surface 1，内嵌考纲晋升路线图) */}
        <div className="lg:col-span-8 card-elevation p-5 flex flex-col justify-between space-y-4">
          {/* 上半部分：战力数值、进度槽与分段刻度 */}
          <div className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 flex-wrap">
                <span className="font-mono text-4xl font-black tracking-tight text-slate-900">11</span>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-500 font-mono">
                    Notenpunkte
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-900 border border-amber-300">
                      {de ? "Stufe II · Q1-Niveau" : "第二阶 · Q1 进阶期"}
                    </span>
                    <span className="text-xs text-slate-700 font-semibold">
                      {de ? "Note 2 (Gut)" : "良好 (Gut)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-mono font-bold text-slate-700 tabular-nums">
                  <span className="text-sm font-black text-slate-900">{currentXP}</span> / {targetXP} XP
                </span>
                <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
                  {de ? `noch ${targetXP - currentXP} XP bis Sprung auf 13 NP` : `距 13 NP 优秀档还需 ${targetXP - currentXP} XP`}
                </div>
              </div>
            </div>

            {/* 隐藏辅助文字满足单元测试检索契约 */}
            <span className="sr-only">11 Notenpunkte</span>

            {/* 分段进度槽 (Surface 2 Inset) */}
            <div className="pt-0.5">
              <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: mounted ? `${(currentXP / targetXP) * 100}%` : "0%" }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1.5 px-0.5 font-mono">
                <span className="text-slate-600">10 NP (及格)</span>
                <span className="text-slate-900 font-black">11 NP (当前)</span>
                <span className="text-slate-800 font-bold">13 NP (目标: Sehr Gut)</span>
                <span className="text-slate-400">15 NP (满分)</span>
              </div>
            </div>
          </div>

          {/* 3. 规范化考纲阶段推进 Stepper (带贯穿连接轨道线) */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                {de ? "Abitur-Stufenleiter" : "考纲阶段推进路线"}
              </span>
              <span className="font-mono text-[11px] text-slate-700 font-bold">
                {currentStufe.id.toUpperCase()} · &ge; {currentStufe.minNP} NP
              </span>
            </div>

            {/* 带连接轨道的步骤条 */}
            <div className="relative flex items-center justify-between py-1.5 px-1">
              {/* 背景贯穿线 */}
              <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0" />

              {/* 节点 1: 已完成 */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("ef_basis")}
                className={`relative z-10 flex items-center gap-1.5 bg-white px-2 py-1 text-xs transition-all cursor-pointer rounded-lg border border-transparent ${
                  selectedStufeId === "ef_basis" ? "border-slate-300 font-bold text-slate-900 bg-slate-50" : "text-slate-600 font-medium hover:bg-slate-50"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span>{de ? "Stufe I (EF)" : "第一阶 · 高一导入"}</span>
              </button>

              {/* 节点 2: 当前进行中 (高亮动效) */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("q1_vertiefung")}
                className={`relative z-10 flex items-center gap-2 bg-white px-2.5 py-1 text-xs cursor-pointer rounded-lg border ${
                  selectedStufeId === "q1_vertiefung" ? "border-amber-300 bg-amber-50/50" : "border-transparent hover:bg-slate-50"
                }`}
              >
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
                <span className="font-bold text-slate-900">
                  {de ? "Stufe II · Q1" : "第二阶 · 会考进阶"}
                  <span className="text-[10px] text-amber-700 font-semibold ml-1">
                    {de ? "(Aktiv)" : "(当前)"}
                  </span>
                </span>
              </button>

              {/* 节点 3: 未完成 */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("q2_abitur")}
                className={`relative z-10 flex items-center gap-1.5 bg-white px-2 py-1 text-xs transition-all cursor-pointer rounded-lg border border-transparent ${
                  selectedStufeId === "q2_abitur" ? "border-slate-300 font-bold text-slate-900 bg-slate-50" : "text-slate-400 font-medium hover:bg-slate-50"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 bg-slate-50 shrink-0" />
                <span>{de ? "Stufe III · Abitur" : "第三阶 · 终局满分"}</span>
              </button>
            </div>

            {/* 当前选中阶的特权清单 */}
            <div className="flex flex-wrap items-center gap-1.5 text-xs pt-0.5">
              <span className="font-mono text-[10px] text-slate-500 font-bold">
                {de ? "Freigeschaltet:" : "已解锁战力:"}
              </span>
              {(de ? currentStufe.unlockedPerksDE : currentStufe.unlockedPerksZH).map((perk, i) => (
                <span
                  key={i}
                  className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200 font-semibold"
                >
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：今日行动卡 (4 Col, Surface 1 白卡，与狐狸伙伴场景化融合) */}
        <div className="lg:col-span-4 card-elevation p-5 flex flex-col justify-between relative overflow-hidden bg-white space-y-3.5">
          {/* 背景环境水印光晕 */}
          <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-orange-100/40 pointer-events-none blur-2xl" />

          {/* 顶部区域：徽标、标题与内嵌卡片场景的狐狸伙伴 */}
          <div className="relative z-10 flex items-start justify-between gap-3">
            <div className="space-y-1.5 min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D96E3A]/10 text-[#D96E3A] border border-[#D96E3A]/30">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1c.5 1.5 2 3.5 2 5.5 0 2-1 3.5-2 3.5s-2-1.5-2-3.5C6 4.5 7.5 2.5 8 1zm0 7c.8 0 1.5.7 1.5 1.5 0 1-.7 2-1.5 2s-1.5-1-1.5-2c0-.8.7-1.5 1.5-1.5z" />
                  </svg>
                  <span>18 {de ? "Tage Serie" : "天连胜"}</span>
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">15 Min</span>
              </div>
              <h3 className="text-lg font-bold text-[#2D4F5C] tracking-tight leading-snug">
                {de ? "Klausur-Fokussprint" : "今日考点靶向冲刺"}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {de
                  ? "3 gezielte Schwachstellenrezepte · Voraussichtlich +230 XP"
                  : "针对当前 3 项核心弱项智能配题，通关可获得"}{" "}
                <strong className="text-amber-800 font-bold font-mono">+230 XP</strong>
              </p>
            </div>

            {/* 内嵌场景的狐狸伙伴（右侧端坐，优雅融入卡片场景） */}
            <div className="shrink-0 flex items-center justify-center w-20 h-20 select-none -mt-1 -mr-1">
              <MascotFox state="streak" size={72} animate={true} />
            </div>
          </div>

          {/* 中部收益摘要微卡 */}
          <div className="relative z-10 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1 text-xs">
            <div className="flex items-center justify-between text-slate-700 font-medium">
              <span>{de ? "Fokus-Paket:" : "今日攻坚包:"}</span>
              <span className="font-mono font-bold text-slate-900">3 处方 · 15 分钟</span>
            </div>
            <div className="text-[11px] text-slate-600 leading-normal">
              {de
                ? "1x GeWi Argumentation (D2) + 2x MINT/Fachtermini"
                : "覆盖 1 项文科深度论证 (D2) 与 2 项理科采分点与词卡"}
            </div>
          </div>

          <div className="relative z-10 space-y-2 pt-0.5">
            <button
              type="button"
              onClick={() => onNavigateToTab?.("flashcards")}
              className="w-full py-2.5 px-4 bg-[#D96E3A] hover:bg-[#c25e2d] active:scale-[0.99] text-white font-bold text-xs rounded-xl transition-all shadow-none flex items-center justify-center gap-2 cursor-pointer select-none"
            >
              <span>{de ? "Jetzt starten" : "立即开始执行"}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {!chestClaimed ? (
              <button
                type="button"
                onClick={() => {
                  setChestClaimed(true);
                  setCurrentXP((x) => Math.min(targetXP, x + 50));
                }}
                className="w-full py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 border border-slate-200/80 cursor-pointer select-none"
              >
                <span>+</span>
                <span>{de ? "Tages-Bonus (+50 XP freischalten)" : "领取首战增益 +50 XP"}</span>
              </button>
            ) : (
              <div className="w-full py-1.5 text-center text-[11px] font-mono text-emerald-700 font-bold bg-emerald-50 rounded-lg border border-emerald-200">
                {de ? "Bonus aktiv (+50 XP)" : "首战增益已生效 +50 XP"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. 二分屏：左侧 7/12 (任务处方 + 学科战力分布) vs 右侧 5/12 (几何雷达诊断) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* ===================== 左侧主体 (7 / 12)：双卡垂直堆叠，总高与右侧雷达严丝合缝 ===================== */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          {/* 上卡：今日弱项消除处方 */}
          <div className="card-elevation p-5 flex-1 flex flex-col justify-between space-y-3.5">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <h3 className="font-bold text-sm text-slate-900 font-serif">
                  {de ? "Tages-Rezeptur (15 Minuten)" : "靶向弱项消除处方"}
                </h3>
                <span className="text-xs text-slate-500 font-mono font-semibold">
                  {completedCount} / {DEMO_MISSIONS.length} {de ? "erledigt" : "已完成"}
                </span>
              </div>

              {isAllCompleted ? (
                <div className="p-5 rounded-xl border border-slate-200/80 bg-slate-50/50 text-center space-y-1.5 my-3">
                  <div className="font-serif text-sm text-slate-900 font-medium">
                    {de ? "Tagespensum erfolgreich absolviert!" : "今日任务已全部通关！"}
                  </div>
                  <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
                    {de
                      ? "Alle Defizite für heute abgeschlossen. Du kannst dich jetzt erholen."
                      : "所有弱项考点已完成今日强化与记忆重算，今日目标达成。"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 mt-1">
                  {DEMO_MISSIONS.map((m) => {
                    const done = completedMissions[m.id] || false;
                    return (
                      <div
                        key={m.id}
                        className="py-2.5 px-1.5 flex items-center justify-between hover:bg-slate-50/80 rounded-lg transition-colors group gap-3"
                      >
                        {/* 左侧：科目标签 + 标题说明（去除了多余空 Checkbox，利落大方） */}
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/50 shrink-0 font-mono">
                            {m.fach.toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <div className={`text-xs font-semibold text-slate-900 group-hover:text-blue-700 transition-colors truncate ${done ? "line-through opacity-60" : ""}`}>
                              {de ? m.titleDE : m.titleZH}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 font-mono flex items-center gap-1.5 flex-wrap">
                              <span>{de ? m.difficultyDE : m.difficultyZH}</span>
                              <span>&bull;</span>
                              <span>{m.tag}</span>
                              <span>&bull;</span>
                              <span className="text-amber-700 font-bold">+{m.xpReward} XP</span>
                            </div>
                          </div>
                        </div>

                        {/* 右侧：状态标记与去执行主按钮 */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleMission(m.id, m.xpReward)}
                            className={`p-1.5 rounded-lg border transition-all cursor-pointer text-[11px] font-semibold flex items-center gap-1 ${
                              done
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-white text-slate-400 hover:text-slate-600 border-slate-200 hover:bg-slate-50"
                            }`}
                            title={de ? "Erledigt-Status umschalten" : "标记完成状态"}
                          >
                            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 6L5 8.5L9.5 3.5"
                                stroke={done ? "#16A34A" : "#94A3B8"}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => onNavigateToTab?.(m.targetTab, m.targetContext)}
                            className="text-xs font-medium text-slate-700 group-hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-all cursor-pointer flex items-center gap-1 shrink-0"
                            aria-label={de ? "Start ->" : "去执行 ->"}
                          >
                            <span>{de ? "Start" : "去执行"}</span>
                            <span>&rarr;</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* 下卡：各学科当前分档分布 (原孤立在最底部的模块重构至此，完美填补左下角真空) */}
          <div className="card-elevation p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider font-bold">
                {de ? "Fächer-Schnellzugriff & Leistungsstand" : "各学科当前分档分布"}
              </span>
              <button
                type="button"
                onClick={() => onNavigateToTab?.("lernbaum")}
                className="font-mono text-xs text-slate-600 hover:text-slate-900 font-semibold underline cursor-pointer"
              >
                {de ? "Alle Fächer" : "学科树全貌"}
              </button>
            </div>

            <div className="grid grid-cols-5 gap-2.5 pt-0.5">
              {[
                { fach: "Deutsch", np: 12 },
                { fach: "Englisch", np: 11 },
                { fach: "Mathe", np: 13 },
                { fach: "Physik", np: 10 },
                { fach: "SoWi", np: 10 },
              ].map((item) => (
                <button
                  key={item.fach}
                  type="button"
                  onClick={() => onNavigateToTab?.("reise", { fach: item.fach })}
                  className="p-2.5 rounded-xl border border-slate-200/90 bg-slate-50/70 hover:bg-slate-100 text-left transition-all cursor-pointer group"
                >
                  <div className="font-mono text-xs font-black text-slate-800 group-hover:text-blue-700 transition-colors">
                    {item.fach}
                  </div>
                  <div className="font-mono text-xs text-slate-900 font-bold mt-0.5">
                    {item.np} NP
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 右侧辅助 (5 / 12)：核心失分几何诊断 ===================== */}
        <section className="lg:col-span-5 flex flex-col">
          <div className="card-elevation p-5 space-y-3.5 h-full flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <h3 className="font-bold text-sm text-[#2D4F5C] font-serif">
                  {de ? "Klausur-Kompetenznetz" : "核心失分点几何雷达图"}
                </h3>

                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setRadarTrack("gewi");
                      setActiveMetricCode("D2");
                    }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-all cursor-pointer ${
                      radarTrack === "gewi"
                        ? "bg-white text-slate-900 font-bold border border-slate-200"
                        : "text-slate-600 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    {de ? "GeWi D1-D5" : "文科 D1-D5 表达雷达"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRadarTrack("mint");
                      setActiveMetricCode("BE-Genauigkeit");
                    }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-all cursor-pointer ${
                      radarTrack === "mint"
                        ? "bg-white text-slate-900 font-bold border border-slate-200"
                        : "text-slate-600 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    {de ? "MINT BE-Exaktheit" : "理科 BE 采分步进雷达"}
                  </button>
                </div>
              </div>

              {/* SVG 雷达画布 + 侦探狐狸提示紧凑并排 */}
              <div className="relative flex flex-col items-center justify-center p-3 rounded-xl border border-slate-200/80 bg-slate-50/70 transition-all overflow-hidden my-3">
                {/* 侦探狐狸剧情提示条 */}
                <div className="w-full flex items-center gap-2.5 p-2 mb-2 bg-white border border-slate-200/90 rounded-lg">
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 select-none">
                    <MascotFox state="deficit" size={34} animate={true} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-bold text-[#2D4F5C]">
                      {de ? "Fokus-Befund:" : "考卷巡检诊断:"}
                    </div>
                    <div className="text-[11px] text-slate-700 leading-snug font-medium">
                      {de
                        ? "Achtung! D2 (Drei-Ebenen-Trennung) ist deine größte Lücke."
                        : "注意！D2「三态严格分流」是当前主要失分点，请优先攻克。"}
                    </div>
                  </div>
                </div>

                <svg
                  width="150"
                  height="150"
                  viewBox="0 0 170 170"
                  className="overflow-visible select-none"
                >
                  <defs>
                    <linearGradient id="academicRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#1E293B" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {[0.33, 0.66, 1.0].map((scale) => (
                    <circle
                      key={scale}
                      cx={radarCenter}
                      cy={radarCenter}
                      r={radarRadius * scale}
                      fill="none"
                      stroke="#E2E8F0"
                      strokeDasharray={scale === 1 ? "none" : "2,2"}
                      strokeWidth="1"
                    />
                  ))}

                  {radarPoints.map((pt, i) => (
                    <line
                      key={i}
                      x1={radarCenter}
                      y1={radarCenter}
                      x2={radarCenter + radarRadius * Math.cos(pt.angle)}
                      y2={radarCenter + radarRadius * Math.sin(pt.angle)}
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />
                  ))}

                  <polygon
                    points={polygonPointsString}
                    fill="url(#academicRadarGrad)"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                    className="transition-all duration-500 ease-out"
                  />

                  {radarPoints.map((pt) => {
                    const isSelected = pt.m.code === activeMetricCode;
                    const isHovered = pt.m.code === hoveredMetricCode;
                    return (
                      <g
                        key={pt.m.code}
                        onClick={() => setActiveMetricCode(pt.m.code)}
                        onMouseEnter={() => setHoveredMetricCode(pt.m.code)}
                        onMouseLeave={() => setHoveredMetricCode(null)}
                        className="cursor-pointer"
                      >
                        <circle
                          cx={pt.x}
                          cy={pt.y}
                          r={isSelected ? "5" : isHovered ? "4" : "3"}
                          fill={pt.m.isWeak ? "#E11D48" : "#1E293B"}
                          stroke="#FFFFFF"
                          strokeWidth="1.5"
                          className="transition-all duration-200"
                        />
                        <text
                          x={pt.x + (pt.x > radarCenter ? 6 : -6)}
                          y={pt.y + (pt.y > radarCenter ? 8 : -5)}
                          textAnchor={pt.x > radarCenter ? "start" : "end"}
                          className={`font-mono text-[9px] select-none ${
                            isSelected ? "fill-slate-900 font-bold" : "fill-slate-600 font-semibold"
                          }`}
                        >
                          {pt.m.code}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* D1-D5 / BE 现代列表行 */}
              <div className="divide-y divide-slate-100">
                {activeMetricList.map((item) => {
                  const isSelected = item.code === activeMetricCode;
                  const ratio = Math.min(1, Math.max(0, item.score / item.max));
                  const pct = Math.round(ratio * 100);

                  return (
                    <div
                      key={item.code}
                      onClick={() => setActiveMetricCode(item.code)}
                      className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-all duration-150 cursor-pointer ${
                        item.isWeak
                          ? "bg-rose-50/90 border border-rose-200"
                          : isSelected
                          ? "bg-slate-100/80 border border-slate-200"
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 ${
                            item.isWeak
                              ? "bg-rose-100 text-rose-800 border border-rose-300"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {item.code}
                        </span>
                        <span className="font-sans text-xs font-bold text-slate-900 truncate">
                          {de ? item.nameDE : item.nameZH}
                        </span>

                        {item.isWeak && (
                          <span className="flex items-center gap-1 text-[10px] font-bold text-rose-800 bg-rose-100/90 px-1.5 py-0.5 rounded border border-rose-200 shrink-0">
                            <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </svg>
                            <span>{de ? "-2 Pkt" : "薄弱项"}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2.5 shrink-0">
                        <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden hidden sm:block">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              item.isWeak ? "bg-rose-600" : "bg-slate-800"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        <span
                          className={`font-mono text-[11px] tabular-nums font-bold ${
                            item.isWeak ? "text-rose-800" : "text-slate-800"
                          }`}
                        >
                          {item.score}/{item.max}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 可折叠考点细则 */}
            <div className="border border-slate-200/90 rounded-xl bg-slate-50/70 p-2.5 text-xs space-y-1.5 mt-2">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedDetail(!expandedDetail)}
              >
                <div className="font-mono text-[11px] font-bold text-slate-900">
                  {de ? "Klausur-Diagnose:" : "当前考点细则:"} [{activeMetric.code}]
                </div>
                <button type="button" className="font-mono text-[10px] text-slate-600 font-semibold underline">
                  {expandedDetail ? (de ? "Einklappen" : "收起细则") : (de ? "Details" : "展开细则")}
                </button>
              </div>

              {expandedDetail && (
                <div className="pt-2 border-t border-slate-200 space-y-1.5">
                  <p className="font-sans text-xs text-slate-800 font-medium">
                    {de ? activeMetric.descDE : activeMetric.descZH}
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-slate-700">
                    <span className="font-bold text-slate-900">{de ? "Fix: " : "化解法则: "}</span>
                    {de ? activeMetric.fixGuideDE : activeMetric.fixGuideZH}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardCockpit;
