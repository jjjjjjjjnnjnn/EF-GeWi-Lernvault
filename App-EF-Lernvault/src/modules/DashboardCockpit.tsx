import { useEffect, useState } from "react";
import type { Lang } from "../i18n";
import { MascotFox } from "../components/mascot/MascotFox";

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
    stufeZH: "第二阶 · 会考进阶 (当前)",
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
    titleZH: "清空 12 张 [D4] 学科专业术语薄弱词卡 (FSRS 智能提权)",
    tag: "Vokabeln · D4",
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
    tag: "Lernreise · D2",
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
    tag: "Klausur · MINT-BE",
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
  const [mascotMood, setMascotMood] = useState<"focus" | "cheer" | "proud">("focus");

  const [radarTrack, setRadarTrack] = useState<"gewi" | "mint">("gewi");
  const [activeMetricCode, setActiveMetricCode] = useState<string>("D2");
  const [hoveredMetricCode, setHoveredMetricCode] = useState<string | null>(null);
  const [expandedDetail, setExpandedDetail] = useState(false);
  const [selectedStufeId, setSelectedStufeId] = useState<string>("q1_vertiefung");

  const toggleMission = (id: string, xp: number) => {
    setCompletedMissions((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        setCurrentXP((x) => Math.min(targetXP, x + xp));
        setMascotMood("cheer");
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
    <div className="mx-auto max-w-6xl space-y-6 pb-16 transition-all duration-300">
      {/* 1. 顶部刊头与极简工具栏 (Linear Header) */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/80 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl border border-slate-200/90 bg-white shrink-0 overflow-hidden shadow-none">
            <MascotFox state="avatar" size={34} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-semibold text-slate-900 tracking-tight">
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
          {/* 连续打卡动量徽章 */}
          <div className="flex items-center gap-2 border border-slate-200/90 bg-white px-3 py-1.5 rounded-xl select-none">
            <MascotFox state="streak" size={18} animate={false} />
            <span className="font-mono text-xs font-semibold text-slate-800 tabular-nums">
              18 {de ? "Tage Streak" : "天连胜"}
            </span>
          </div>

          {/* 主题切换器 */}
          <button
            type="button"
            onClick={() => {
              const current = document.documentElement.getAttribute("data-theme") || "academic";
              const nextTheme = current === "cyber" ? "academic" : "cyber";
              document.documentElement.setAttribute("data-theme", nextTheme);
              try {
                localStorage.setItem("ef_lernstyle_theme", nextTheme);
              } catch {
                // ignore
              }
            }}
            className="text-xs font-mono text-slate-600 hover:text-slate-900 border border-slate-200/90 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 transition-all cursor-pointer"
            title={de ? "Theme wechseln (Cyber / Academic)" : "切换主题 (暗黑精锐 / 极简学术)"}
          >
            {de ? "Theme" : "暗黑/浅色"}
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

      {/* 2. 核心战力驾驶舱 (8:4 黄金分栏结构) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        {/* 左侧：战力指标看板 (8 Col) */}
        <div className="lg:col-span-8 card-elevation p-6 flex flex-col justify-between space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-serif text-4xl font-extrabold tracking-tight text-slate-900">
                11 Notenpunkte
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200/70">
                {de ? "Stufe II · Q1-Niveau" : "第二阶 · Q1 进阶期"} &bull; {de ? "Gut (2-)" : "良好 (Gut)"}
              </span>
            </div>
            <div className="font-mono text-xs text-slate-500 tabular-nums">
              {currentXP} / {targetXP} XP
            </div>
          </div>

          {/* 精致刻度进度槽：双层轨道 + 渐变琥珀橙填充 + 无下垂蓝点 */}
          <div className="space-y-2">
            <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700 ease-out"
                style={{ width: mounted ? `${(currentXP / targetXP) * 100}%` : "0%" }}
              />
            </div>
            <div className="flex justify-between text-[11px] font-medium text-slate-400 px-0.5">
              <span>10 NP (及格)</span>
              <span className="text-slate-900 font-bold">11 NP (当前)</span>
              <span className="text-slate-600 font-semibold">13 NP (目标: Sehr Gut)</span>
              <span>15 NP (满分)</span>
            </div>
          </div>

          {/* 伴学助手微状态 */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => {
                setMascotMood((m) => (m === "focus" ? "cheer" : m === "cheer" ? "proud" : "focus"));
              }}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer select-none"
              title={de ? "Klick mich für Feedback" : "点击伴学伙伴互动"}
            >
              <div className="w-5 h-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 overflow-hidden">
                <MascotFox
                  state={mascotMood === "focus" ? "avatar" : mascotMood === "cheer" ? "levelup" : "streak"}
                  size={18}
                />
              </div>
              <span className="font-sans text-xs">
                {mascotMood === "focus"
                  ? (de ? "Fokus bereit: Bereit für die nächste Lerneinheit" : "伴学状态: 保持专注 · 冲刺下一学习单元")
                  : mascotMood === "cheer"
                  ? (de ? "Du schaffst das! Klausur-Boost aktiv" : "伴学状态: 备考势头极佳 · 今日冲刺！")
                  : (de ? "18 Tage stark! Spitzenleistung" : "伴学状态: 18天连续打卡 · 战力持续稳步攀升！")}
              </span>
            </button>
            <span className="font-mono text-xs text-slate-400">
              {de ? `noch ${targetXP - currentXP} XP` : `还差 ${targetXP - currentXP} XP 跃升`}
            </span>
          </div>
        </div>

        {/* 右侧：今日冲刺行动卡 (4 Col, 深色高质感焦糖/曜石黑 + 主动聚焦) */}
        <div className="lg:col-span-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white rounded-xl p-6 border border-slate-800 flex flex-col justify-between space-y-4">
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-400">
                DAILY SPRINT
              </span>
              <MascotFox state="streak" size={20} animate={false} />
            </div>
            <h3 className="text-lg font-bold tracking-tight text-white font-serif">
              {de ? "Klausur-Fokussprint" : "今日考点靶向冲刺"}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {de
                ? "3 gezielte Schwachstellenrezepte · Voraussichtlich +220 XP"
                : "包含 3 项弱项处方 · 预估获得 +220 XP"}
            </p>
          </div>

          <div className="space-y-2 pt-2">
            {!chestClaimed ? (
              <button
                type="button"
                onClick={() => {
                  setChestClaimed(true);
                  setCurrentXP((x) => Math.min(targetXP, x + 50));
                }}
                className="w-full py-1.5 px-3 rounded-lg border border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 text-xs font-mono text-amber-300 font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all select-none"
              >
                <span>+</span>
                <span>{de ? "Tages-Bonus (+50 XP freischalten)" : "领取今日首战增益 (+50 XP)"}</span>
              </button>
            ) : (
              <div className="w-full py-1 text-center font-mono text-[11px] text-emerald-400 select-none">
                {de ? "Bonus bereits aktiviert" : "首战增益已生效 (+50 XP)"}
              </div>
            )}

            <button
              type="button"
              onClick={() => onNavigateToTab?.("flashcards")}
              className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-sans font-semibold text-xs rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer select-none group"
            >
              <span>{de ? "Jetzt starten (15 Min.)" : "立即开始执行 (15分钟)"}</span>
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform group-hover:translate-x-0.5"
              >
                <path
                  d="M6 3.5L10.5 8L6 12.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* 3. 二分屏核心动线：左侧 7/12 今日战场 vs 右侧 5/12 战力与弱项诊断 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===================== 左侧主体 (7 / 12)：今日战场 ===================== */}
        <section className="lg:col-span-7 space-y-5">
          {/* 今日任务卡片容器 */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  {de ? "Aktionsplan · Heute fällig" : "今日战场 · 靶向处方"}
                </div>
                <h2 className="font-serif text-lg text-slate-900 font-medium">
                  {de ? "Tages-Rezeptur (15 Minuten)" : "靶向弱项消除处方"}
                </h2>
              </div>
              <span className="font-mono text-xs text-slate-500 border border-slate-200 px-2 py-0.5 rounded-md bg-slate-50 font-medium">
                {completedCount} / {DEMO_MISSIONS.length} {de ? "erledigt" : "已完成"}
              </span>
            </div>

            {isAllCompleted ? (
              <div className="p-6 rounded-xl border border-slate-200/80 bg-slate-50/50 text-center space-y-2">
                <div className="font-serif text-base text-slate-900 font-medium">
                  {de ? "Tagespensum erfolgreich absolviert!" : "今日任务已全部通关！"}
                </div>
                <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
                  {de
                    ? "Alle Defizite für heute abgeschlossen. Du kannst dich jetzt erholen."
                    : "所有弱项考点已完成今日强化与记忆重算，今日目标达成。"}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {DEMO_MISSIONS.map((m) => {
                  const done = completedMissions[m.id] || false;
                  return (
                    <div
                      key={m.id}
                      className={`group flex items-start justify-between p-3.5 rounded-xl border transition-all duration-200 gap-3 ${
                        done
                          ? "border-slate-200 bg-slate-50/50 opacity-60"
                          : "border-slate-200/80 bg-white hover:border-slate-300"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleMission(m.id, m.xpReward)}
                          className="mt-0.5 w-4 h-4 rounded border border-slate-300 bg-white flex items-center justify-center text-xs font-mono cursor-pointer hover:border-slate-500 transition-all shrink-0"
                          title={de ? "Als erledigt markieren" : "勾选标记完成"}
                        >
                          {done && (
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                              <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#16A34A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </button>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-700 font-semibold">
                              {m.fach}
                            </span>
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-500 font-medium">
                              {m.afb}
                            </span>
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded border border-slate-200 bg-slate-50 text-slate-500 font-medium">
                              {m.tag}
                            </span>
                            <span className="font-mono text-xs text-blue-600 font-bold tabular-nums">
                              +{m.xpReward} XP
                            </span>
                            <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                              &bull; {de ? m.difficultyDE : m.difficultyZH}
                            </span>
                          </div>
                          <div
                            className={`font-sans text-xs font-medium transition-colors ${
                              done ? "line-through text-slate-400" : "text-slate-800"
                            }`}
                          >
                            {de ? m.titleDE : m.titleZH}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigateToTab?.(m.targetTab, m.targetContext)}
                        className="shrink-0 font-mono text-xs text-slate-700 border border-slate-200 hover:border-slate-400 px-2.5 py-1 rounded-lg bg-white transition-all cursor-pointer font-medium flex items-center gap-1"
                        aria-label={de ? "Start ->" : "去执行 ->"}
                      >
                        <span>{de ? "Start" : "去执行"}</span>
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path d="M4.5 2.5L8 6L4.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 4. 底部三阶晋升路线：水平时间线步进器 (Horizontal Stepper) */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {de ? "Abitur-Stufenleiter" : "年级战役路线"}
              </span>
              <span className="font-mono text-xs text-slate-700 font-semibold">
                {currentStufe.id.toUpperCase()}
              </span>
            </div>

            {/* 水平时间线步进器 */}
            <div className="relative py-2">
              {/* 连接轨线 */}
              <div className="absolute top-5 left-10 right-10 h-0.5 bg-slate-200 -translate-y-1/2 z-0" />
              <div
                className="absolute top-5 left-10 h-0.5 bg-slate-800 -translate-y-1/2 z-0 transition-all duration-500"
                style={{
                  width:
                    selectedStufeId === "ef_basis"
                      ? "0%"
                      : selectedStufeId === "q1_vertiefung"
                      ? "50%"
                      : "100%",
                }}
              />

              <div className="relative z-10 grid grid-cols-3 gap-2">
                {DEMO_STUFEN.map((s) => {
                  const isDone = s.status === "completed";
                  const isCurr = s.status === "current";
                  const isSelected = s.id === selectedStufeId;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setSelectedStufeId(s.id)}
                      className={`flex flex-col items-center text-center p-2 rounded-xl transition-all cursor-pointer ${
                        isSelected
                          ? "bg-slate-50 ring-1 ring-slate-300"
                          : "hover:bg-slate-50/60"
                      }`}
                    >
                      {/* 图形状态圆点 */}
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white border border-slate-300 mb-2">
                        {isDone ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                            <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : isCurr ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300" />
                        )}
                      </div>

                      <div className="font-sans text-xs font-medium text-slate-800">
                        {de ? s.stufeDE : s.stufeZH}
                      </div>
                      <div className="font-mono text-[10px] text-slate-400 mt-0.5">
                        &ge; {s.minNP} NP
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 当前选中年级特权清单 */}
            <div className="pt-2 border-t border-slate-100 text-xs space-y-1.5">
              <div className="font-mono text-[10px] text-slate-400 uppercase">
                {de ? "Freigeschaltete Kompetenzen:" : "段位特权与能力清单:"}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(de ? currentStufe.unlockedPerksDE : currentStufe.unlockedPerksZH).map((perk, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] px-2.5 py-0.5 rounded-md border border-slate-200 bg-slate-50 text-slate-700"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 右侧辅助 (5 / 12)：战力诊断室 ===================== */}
        <section className="lg:col-span-5 space-y-5">
          <div className="rounded-xl border border-slate-200/80 bg-white p-5 space-y-4">
            {/* 诊断室头部 */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
                  {de ? "Diagnose" : "战力诊断"}
                </div>
                <h3 className="font-serif text-base text-slate-900 font-medium">
                  {de ? "Klausur-Kompetenznetz" : "核心失分点几何雷达图"}
                </h3>
              </div>

              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200/60">
                <button
                  type="button"
                  onClick={() => {
                    setRadarTrack("gewi");
                    setActiveMetricCode("D2");
                  }}
                  className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all cursor-pointer ${
                    radarTrack === "gewi"
                      ? "bg-white text-slate-900 font-semibold border border-slate-200/80"
                      : "text-slate-500 hover:text-slate-900"
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
                  className={`px-2.5 py-1 text-[10px] font-mono rounded-md transition-all cursor-pointer ${
                    radarTrack === "mint"
                      ? "bg-white text-slate-900 font-semibold border border-slate-200/80"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {de ? "MINT BE-Exaktheit" : "理科 BE 采分步进雷达"}
                </button>
              </div>
            </div>

            {/* SVG 几何雷达画布 */}
            <div className="flex flex-col items-center justify-center p-3 rounded-xl border border-slate-100 bg-slate-50/50 transition-all">
              <svg
                width="170"
                height="170"
                viewBox="0 0 170 170"
                className="overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="academicRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1E293B" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* 同心环刻度标尺 */}
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

                {/* 经线射线 */}
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

                {/* 纸墨多边形 */}
                <polygon
                  points={polygonPointsString}
                  fill="url(#academicRadarGrad)"
                  stroke="#1E293B"
                  strokeWidth="1.5"
                  className="transition-all duration-500 ease-out"
                />

                {/* 雷达交互节点 */}
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
                          isSelected ? "fill-slate-900 font-bold" : "fill-slate-500"
                        }`}
                      >
                        {pt.m.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 3. 右侧诊断与弱项列表：带轻微分割线的无边框列表 + 薄弱项淡红底色 (bg-rose-50/border-rose-100) */}
            <div className="divide-y divide-slate-100">
              {activeMetricList.map((item) => {
                const isSelected = item.code === activeMetricCode;
                const ratio = Math.min(1, Math.max(0, item.score / item.max));
                const pct = Math.round(ratio * 100);

                return (
                  <div
                    key={item.code}
                    onClick={() => setActiveMetricCode(item.code)}
                    className={`flex items-center justify-between py-2.5 px-2.5 rounded-lg transition-all duration-150 cursor-pointer ${
                      item.isWeak
                        ? "bg-rose-50/80 border border-rose-100"
                        : isSelected
                        ? "bg-slate-50"
                        : "hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`font-mono text-[10px] px-1.5 py-0.5 rounded font-semibold shrink-0 ${
                          item.isWeak
                            ? "bg-rose-100 text-rose-700 border border-rose-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200/60"
                        }`}
                      >
                        {item.code}
                      </span>
                      <span className="font-sans text-xs text-slate-800 truncate">
                        {de ? item.nameDE : item.nameZH}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      {/* 标准进度槽位 */}
                      <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden hidden sm:block">
                        <div
                          className={`h-full rounded-full transition-all duration-300 ${
                            item.isWeak ? "bg-rose-500" : "bg-slate-700"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <span
                        className={`font-mono text-[11px] tabular-nums ${
                          item.isWeak ? "text-rose-700 font-bold" : "text-slate-500"
                        }`}
                      >
                        {item.score}/{item.max}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 可折叠的考点细则与答题法则 */}
            <div className="border border-slate-200/80 rounded-xl bg-slate-50/50 p-3 text-xs space-y-2">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedDetail(!expandedDetail)}
              >
                <div className="font-mono text-[11px] font-bold text-slate-800">
                  {de ? "Klausur-Diagnose:" : "当前考点细则:"} [{activeMetric.code}]
                </div>
                <button type="button" className="font-mono text-[10px] text-slate-500 underline">
                  {expandedDetail ? (de ? "Einklappen" : "收起细则") : (de ? "Details" : "展开细则")}
                </button>
              </div>

              {expandedDetail && (
                <div className="pt-2 border-t border-slate-200/60 space-y-1.5">
                  <p className="font-sans text-xs text-slate-700">
                    {de ? activeMetric.descDE : activeMetric.descZH}
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-slate-500">
                    <span className="font-bold text-slate-800">{de ? "Fix: " : "化解法则: "}</span>
                    {de ? activeMetric.fixGuideDE : activeMetric.fixGuideZH}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 右下侧补强：薄弱学科监测 TOP 3 */}
          <div className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2.5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400">
                {de ? "Defizit-Frühwarnung (Top 3)" : "薄弱学科监测 (TOP 3 预警)"}
              </span>
              <MascotFox state="deficit" size={16} animate={false} />
            </div>

            <div className="space-y-2 text-xs">
              {[
                { fach: "SoWi", np: 10, target: 13, issueDE: "D2 Begründungstiefe", issueZH: "D2 论证穿透度不足" },
                { fach: "Physik", np: 10, target: 12, issueDE: "BE-Genauigkeit", issueZH: "有效数字中间舍入误差" },
                { fach: "Englisch", np: 11, target: 13, issueDE: "D3 Textverknüpfung", issueZH: "连接词学术层次欠缺" },
              ].map((w) => (
                <div
                  key={w.fach}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 bg-slate-50/60"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-800">{w.fach}</span>
                      <span className="font-mono text-[10px] text-rose-600 font-semibold">
                        {w.np} NP &lt; {w.target} NP
                      </span>
                    </div>
                    <div className="font-sans text-[11px] text-slate-500">
                      {de ? w.issueDE : w.issueZH}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onNavigateToTab?.("reise", { fach: w.fach })}
                    className="font-mono text-[11px] px-2.5 py-1 rounded-lg border border-slate-200 hover:border-slate-400 bg-white transition-all cursor-pointer text-slate-700"
                  >
                    {de ? "Üben" : "特训"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* 4. 底部极简学科穿梭码头 */}
      <section className="rounded-xl border border-slate-200/80 bg-white p-4 space-y-2">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="font-mono text-[10px] text-slate-400 uppercase tracking-wider">
            {de ? "Fächer-Schnellzugriff" : "学科考点码头"}
          </span>
          <button
            type="button"
            onClick={() => onNavigateToTab?.("lernbaum")}
            className="font-mono text-xs text-slate-500 hover:text-slate-900 underline cursor-pointer"
          >
            {de ? "Alle Fächer" : "学科树全貌"}
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2 pt-1">
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
              className="p-2.5 rounded-xl border border-slate-200/80 bg-slate-50/60 hover:bg-slate-100 text-left transition-all cursor-pointer"
            >
              <div className="font-mono text-xs font-bold text-slate-800">{item.fach}</div>
              <div className="font-serif text-xs text-slate-500 mt-0.5">{item.np} NP</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardCockpit;
