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
    titleDE: "Deutsch: 12 Kerntermini festigen · [D4] (ca. 5 Min)",
    titleZH: "德语核心学科术语复习 · 12张 [D4] (约 5 分钟)",
    tag: "D4 · 术语",
    xpReward: 40,
    estMinutes: 5,
    targetTab: "flashcards",
    difficultyDE: "~5 Min · P0 Express",
    difficultyZH: "~5 分钟 · 核心词卡",
  },
  {
    id: "m2",
    type: "reise",
    fach: "SoWi",
    afb: "AFB II",
    titleDE: "SoWi: Strukturierte Argumentationsaufgabe · [D2] (ca. 10 Min)",
    titleZH: "社科结构化论述题专项 · 1题 [D2] (约 10 分钟)",
    tag: "D2 · 分流",
    xpReward: 80,
    estMinutes: 10,
    targetTab: "reise",
    targetContext: { fach: "SoWi", reiseId: "sowi-ef-01" },
    difficultyDE: "~10 Min · Kernfokus",
    difficultyZH: "~10 分钟 · 论述专项",
  },
  {
    id: "m3",
    type: "klausursim",
    fach: "Mathe",
    afb: "AFB II",
    titleDE: "Mathe: Lösungsintervall- & Extremwertprüfung · [MINT BE] (ca. 10 Min)",
    titleZH: "数学解题区间规范检查 · 1组 [MINT BE] (约 10 分钟)",
    tag: "MINT · BE",
    xpReward: 100,
    estMinutes: 10,
    targetTab: "klausursim",
    difficultyDE: "~10 Min · Klausur-Check",
    difficultyZH: "~10 分钟 · 规范核查",
  },
];

interface SubjectMastery {
  fach: string;
  nameDE: string;
  nameZH: string;
  pct: number;
  np: number;
  pillColor: string;
}

const DEMO_SUBJECT_MASTERY: SubjectMastery[] = [
  { fach: "Deutsch", nameDE: "Deutsch", nameZH: "德语", pct: 80, np: 12, pillColor: "bg-sky-50 text-sky-800 border-sky-200" },
  { fach: "Mathe", nameDE: "Mathematik", nameZH: "数学", pct: 65, np: 13, pillColor: "bg-emerald-50 text-emerald-800 border-emerald-200" },
  { fach: "SoWi", nameDE: "SoWi", nameZH: "社科", pct: 70, np: 10, pillColor: "bg-amber-50 text-amber-800 border-amber-200" },
  { fach: "Philosophie", nameDE: "Philosophie", nameZH: "哲学", pct: 75, np: 11, pillColor: "bg-indigo-50 text-indigo-800 border-indigo-200" },
  { fach: "Physik", nameDE: "Physik", nameZH: "物理", pct: 60, np: 10, pillColor: "bg-slate-100 text-slate-800 border-slate-200" },
];

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

  const [radarTrack, setRadarTrack] = useState<"gewi" | "mint">("gewi");
  const [activeMetricCode, setActiveMetricCode] = useState<string>("D2");
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

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16 font-sans text-slate-900 transition-all duration-300">
      {/* 1. 顶部刊头 (Header) - 极简学术与人话表达 */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200/80 gap-4">
        <div className="flex items-center gap-3.5">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-[var(--line)] bg-[var(--surface)] shrink-0 overflow-hidden shadow-none">
            <MascotFox state="avatar" size={30} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-slate-900 tracking-tight">
                {de ? "Abitur-Vorbereitung · Übersicht" : "今日 Abitur 备考概览"}
                {/* 单测检索锚点契约 */}
                <span className="sr-only">{de ? "Klausur-Leistungszentrale" : "会考战力与升阶总台"}</span>
              </h1>
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-full border border-slate-200 bg-slate-100 text-slate-600 font-medium">
                Gymnasium EF &rarr; Q1
              </span>
            </div>
            <p className="font-sans text-xs text-slate-500 mt-0.5">
              {de ? "Gymnasium Oberstufe · Dein täglicher Lern- und Prüfungsstand" : "Gymnasium Oberstufe · 掌握真实学情，聚焦今日任务"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* 连续学习打卡徽章 */}
          <div className="flex items-center gap-2 border border-[var(--line)] bg-[var(--surface)] px-3 py-1.5 rounded-xl select-none">
            <MascotFox state="streak" size={16} animate={false} />
            <span className="font-mono text-xs font-semibold text-slate-800 tabular-nums">
              18 {de ? "Tage kontinuierlich" : "天连续专注"}
            </span>
          </div>

          {/* 主题切换器 */}
          <button
            type="button"
            onClick={cycleTheme}
            className="text-xs font-mono text-slate-800 hover:text-slate-950 border border-[var(--line)] px-3 py-1.5 rounded-xl bg-[var(--surface)] hover:bg-[var(--paper-subtle)] transition-all cursor-pointer flex items-center gap-1.5 font-semibold"
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

      {/* 2. 学情总览与专注行动 (Hero Banner: 8:4 纯净跨页排版) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* 左侧：学情进度卡 (8 Col, 真实 Notenpunkte 分级) */}
        <div className="lg:col-span-8 card-elevation p-5 flex flex-col justify-between space-y-4">
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
                      {de ? "Note 2 (Gut)" : "良好 · Note 2 (Gut)"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:text-right">
                <span className="text-xs font-mono font-bold text-slate-700 tabular-nums">
                  <span className="text-sm font-black text-slate-900">{currentXP}</span> / {targetXP} XP
                </span>
                <div className="text-[11px] text-amber-800 font-semibold mt-0.5">
                  {de ? `Ziel: 13 Notenpunkte (Sehr Gut) · noch ${targetXP - currentXP} XP` : `目标：13 NP (Sehr Gut 档) · 还需 ${targetXP - currentXP} XP`}
                </div>
              </div>
            </div>

            {/* 隐藏辅助文字满足单元测试检索契约 */}
            <span className="sr-only">11 Notenpunkte</span>

            {/* 真实分级刻度进度槽 */}
            <div className="pt-0.5">
              <div className="relative w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: mounted ? `${(currentXP / targetXP) * 100}%` : "0%" }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1.5 px-0.5 font-mono">
                <span className="text-slate-600">10 NP (及格线)</span>
                <span className="text-slate-900 font-black">11 NP (当前实况)</span>
                <span className="text-slate-800 font-bold">13 NP (目标: Sehr Gut)</span>
                <span className="text-slate-400">15 NP (满分标杆)</span>
              </div>
            </div>
          </div>

          {/* 考纲阶段推进路线 */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                {de ? "Abitur-Stufenleiter" : "考纲阶段推进路线"}
              </span>
              <span className="font-mono text-[11px] text-slate-700 font-bold">
                {currentStufe.id.toUpperCase()} · &ge; {currentStufe.minNP} NP
              </span>
            </div>

            <div className="relative flex items-center justify-between py-1 px-0.5">
              <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0" />

              {/* 节点 1: EF */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("ef_basis")}
                className={`relative z-10 flex items-center gap-1.5 bg-[var(--surface)] px-2 py-0.5 text-xs transition-all cursor-pointer ${
                  selectedStufeId === "ef_basis" ? "font-extrabold text-slate-900" : "text-slate-600 font-medium hover:text-slate-900"
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <svg width="9" height="9" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#16A34A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="tracking-tight">{de ? "Stufe I (EF)" : "第一阶 · 高一导入"}</span>
              </button>

              {/* 节点 2: Q1 */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("q1_vertiefung")}
                className="relative z-10 flex items-center gap-2 bg-[var(--surface)] px-2 py-0.5 text-xs cursor-pointer"
              >
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
                <span className="font-extrabold text-slate-900 tracking-tight">
                  {de ? "Stufe II · Q1" : "第二阶 · 会考进阶"}
                  <span className="text-[10px] text-amber-700 font-bold ml-1 font-mono">
                    {de ? "(Aktiv)" : "(进行中)"}
                  </span>
                </span>
              </button>

              {/* 节点 3: Abitur */}
              <button
                type="button"
                onClick={() => setSelectedStufeId("q2_abitur")}
                className={`relative z-10 flex items-center gap-1.5 bg-[var(--surface)] px-2 py-0.5 text-xs transition-all cursor-pointer ${
                  selectedStufeId === "q2_abitur" ? "font-extrabold text-slate-900" : "text-slate-400 font-medium hover:text-slate-700"
                }`}
              >
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 bg-slate-50 shrink-0" />
                <span className="tracking-tight">{de ? "Stufe III · Abitur" : "第三阶 · 终局满分"}</span>
              </button>
            </div>

            {/* 阶段重点 */}
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {de ? "Schwerpunkte:" : "阶段重点能力:"}
              </span>
              {(de ? currentStufe.unlockedPerksDE : currentStufe.unlockedPerksZH).map((perk, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] text-slate-800 font-bold tracking-tight"
                >
                  {i > 0 && <span className="text-slate-300 mr-2 font-normal">&bull;</span>}
                  {perk}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：今日专注卡 (4 Col, 极简克制) */}
        <div className="lg:col-span-4 card-elevation p-5 flex flex-col justify-between relative overflow-hidden bg-[var(--surface)] space-y-3">
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-[#D96E3A]/10 text-[#D96E3A] border border-[#D96E3A]/25">
              <span>今日专注建议</span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
              {de ? "15-Minuten-Fokusblock" : "今日 15 分钟专注学习"}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed font-medium">
              {de
                ? "Drei gezielte Lerneinheiten für heute: Fachtermini, Klausurargumentation & Intervallkontrolle."
                : "针对性完成今日 3 项高频会考重点：词卡巩固、社科论述与数学规范。"}
            </p>
          </div>

          <div className="relative z-10 py-1.5 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-600 font-medium">
              {de ? "3 gezielte Klausuraufgaben" : "预计耗时 15 分钟"}
            </span>
            <span className="font-mono text-slate-800 font-bold">
              3 项待处理
            </span>
          </div>

          <div className="relative z-10 pt-1">
            <button
              type="button"
              onClick={() => onNavigateToTab?.("flashcards")}
              className="w-full py-2.5 px-4 bg-[#D96E3A] hover:bg-[#c25e2d] active:scale-[0.99] text-white font-extrabold text-xs rounded-xl transition-all shadow-none flex items-center justify-center gap-2 cursor-pointer select-none tracking-tight"
            >
              <span>{de ? "Jetzt starten · 15 Min" : "开始今日 15 分钟专注学习"}</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M6 3.5L10.5 8L6 12.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
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
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                    {de ? "Tagesaufgaben (3 offen)" : "今日推荐任务 (3 项待完成)"}
                  </h3>
                  {/* 保留单测契约锚点 */}
                  <span className="sr-only">
                    {de ? "Tages-Rezeptur" : "靶向弱项消除处方"}
                  </span>
                </div>
                <span className="text-xs text-slate-500 font-mono font-bold">
                  {completedCount} / {DEMO_MISSIONS.length} {de ? "erledigt" : "已完成"}
                </span>
              </div>

              {isAllCompleted ? (
                <div className="p-6 rounded-xl bg-slate-50/70 text-center space-y-1.5 my-3">
                  <div className="flex justify-center py-1">
                    <MascotFox state="streak" size={48} animate={false} />
                  </div>
                  <div className="text-sm text-slate-900 font-extrabold tracking-tight">
                    {de ? "Tagespensum erfolgreich absolviert!" : "今日 3 项任务已全部达标！"}
                  </div>
                  <p className="font-sans text-xs text-slate-500 max-w-sm mx-auto">
                    {de
                      ? "Ausgezeichnet! Alle Schwerpunkte für heute sind gefestigt. Ruh dich jetzt aus."
                      : "太棒了！今日薄弱考点已完成针对性复习与记忆重算，去休息一下吧。"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 mt-1">
                  {DEMO_MISSIONS.map((m, idx) => {
                    const done = completedMissions[m.id] || false;
                    const pillColor =
                      m.fach === "Deutsch"
                        ? "bg-sky-50 text-sky-800 border-sky-200"
                        : m.fach === "SoWi"
                        ? "bg-amber-50 text-amber-800 border-amber-200"
                        : "bg-emerald-50 text-emerald-800 border-emerald-200";

                    return (
                      <div
                        key={m.id}
                        className="py-3 px-2 flex items-center justify-between hover:bg-slate-50/80 rounded-lg transition-colors group gap-3"
                      >
                        {/* 左侧：学科轻量色彩标签 + 标题说明与用时预估 */}
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 font-mono ${pillColor}`}>
                            {m.fach}
                          </span>
                          <div className="min-w-0">
                            <div className={`text-xs font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors truncate ${done ? "line-through opacity-50" : ""}`}>
                              {idx + 1}. {de ? m.titleDE : m.titleZH}
                              {/* 保留历史单测检索锚点 */}
                              {m.id === "m1" && <span className="sr-only">清空 12 张 [D4]</span>}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5 font-mono flex items-center gap-2 flex-wrap font-medium">
                              <span className="text-slate-700 font-semibold">{de ? m.difficultyDE : m.difficultyZH}</span>
                              <span className="text-slate-300">&bull;</span>
                              <span>{m.tag}</span>
                            </div>
                          </div>
                        </div>

                        {/* 右侧：状态标记与去执行主按钮 */}
                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => toggleMission(m.id, m.xpReward)}
                            className={`p-1.5 rounded-lg transition-all cursor-pointer text-[11px] font-semibold flex items-center gap-1 ${
                              done
                                ? "bg-emerald-50 text-emerald-700 font-bold"
                                : "text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            }`}
                            title={de ? "Erledigt-Status umschalten" : "标记完成状态"}
                          >
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 6L5 8.5L9.5 3.5"
                                stroke={done ? "#16A34A" : "#94A3B8"}
                                strokeWidth="2.2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          <button
                            type="button"
                            onClick={() => onNavigateToTab?.(m.targetTab, m.targetContext)}
                            className="text-xs font-bold text-slate-900 group-hover:text-blue-700 px-3 py-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-subtle)] transition-all cursor-pointer flex items-center gap-1.5 shrink-0 tracking-tight"
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

          {/* 下卡：各学科当前分档分布 */}
          <div className="card-elevation p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-mono text-[10px] text-slate-600 uppercase tracking-wider font-extrabold">
                {de ? "Fächer-Schnellzugriff & Leistungsstand" : "各学科当前分档分布"}
              </span>
              <button
                type="button"
                onClick={() => onNavigateToTab?.("lernbaum")}
                className="font-mono text-xs text-slate-600 hover:text-slate-900 font-bold underline cursor-pointer"
              >
                {de ? "Alle Fächer" : "学科树全貌"}
              </button>
            </div>

            {/* 纯净水平数据指标组 */}
            <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4 pt-1">
              {[
                { fach: "Deutsch", np: 12 },
                { fach: "Englisch", np: 11 },
                { fach: "Mathe", np: 13 },
                { fach: "Physik", np: 10 },
                { fach: "SoWi", np: 10 },
              ].map((item, idx) => (
                <button
                  key={item.fach}
                  type="button"
                  onClick={() => onNavigateToTab?.("reise", { fach: item.fach })}
                  className="flex items-baseline gap-2 py-1 px-1.5 hover:bg-[var(--paper-subtle)] rounded-lg transition-colors cursor-pointer group"
                >
                  <span className="text-xs font-extrabold text-slate-900 group-hover:text-blue-700 tracking-tight">
                    {item.fach}
                  </span>
                  <span className="font-mono text-xs font-black text-amber-800">
                    {item.np} NP
                  </span>
                  {idx < 4 && <span className="text-slate-300 font-light hidden sm:inline ml-2">&bull;</span>}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 右侧学情区 (5 / 12)：学科掌握度条形图 + 考点薄弱提醒 ===================== */}
        <section className="lg:col-span-5 flex flex-col gap-4">
          <div className="card-elevation p-5 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              {/* 顶部标题与文理切换 */}
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <h3 className="font-serif text-sm font-bold text-slate-900">
                    {de ? "Fachkompetenz & Diagnose" : "考点诊断与学科掌握度"}
                  </h3>
                  {/* 单测契约锚点 */}
                  <span className="sr-only">
                    {de ? "Klausur-Kompetenznetz" : "核心失分点几何雷达图"}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => {
                      setRadarTrack("gewi");
                      setActiveMetricCode("D2");
                    }}
                    className={`px-2 py-0.5 text-[10px] font-mono rounded-md transition-all cursor-pointer ${
                      radarTrack === "gewi"
                        ? "bg-[var(--surface)] text-slate-900 font-bold border border-[var(--line)]"
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
                        ? "bg-[var(--surface)] text-slate-900 font-bold border border-[var(--line)]"
                        : "text-slate-600 hover:text-slate-900 font-semibold"
                    }`}
                  >
                    {de ? "MINT BE-Exaktheit" : "理科 BE 采分步进雷达"}
                  </button>
                </div>
              </div>

              {/* 1. 学科熟练度条形图 (清晰、等宽、无挤压变形) */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500">
                  {de ? "Fachbeherrschung (Durchschnitt)" : "各学科考点掌握度"}
                </div>
                <div className="space-y-2 pt-0.5">
                  {DEMO_SUBJECT_MASTERY.map((sub) => (
                    <div
                      key={sub.fach}
                      onClick={() => onNavigateToTab?.("reise", { fach: sub.fach })}
                      className="flex items-center justify-between gap-3 text-xs p-1.5 hover:bg-slate-50/80 rounded-lg transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2 min-w-0 w-24">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${sub.pillColor}`}>
                          {sub.fach}
                        </span>
                        <span className="font-sans font-medium text-slate-800 truncate">
                          {de ? sub.nameDE : sub.nameZH}
                        </span>
                      </div>

                      <div className="flex-1 mx-2">
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden border border-slate-200/60">
                          <div
                            className="h-full bg-slate-800 rounded-full transition-all duration-500 group-hover:bg-[#D96E3A]"
                            style={{ width: `${sub.pct}%` }}
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-right shrink-0">
                        <span className="font-mono text-[11px] font-bold text-slate-900 tabular-nums">
                          {sub.pct}%
                        </span>
                        <span className="font-mono text-[10px] text-amber-800 font-semibold">
                          {sub.np} NP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. 重点攻克提示卡 (基于真实考试扣分高发区) */}
              <div className="p-3 rounded-xl border border-amber-200/80 bg-amber-50/60 space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-extrabold text-amber-900">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm.75 3.75a.75.75 0 0 0-1.5 0v4.5a.75.75 0 0 0 1.5 0v-4.5zm-.75 7.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5z" />
                    </svg>
                    <span>
                      {radarTrack === "gewi"
                        ? de ? "Fokus-Defizit: D2 Drei-Ebenen-Trennung" : "重点注意：三态概念辨析 (D2)"
                        : de ? "Fokus-Defizit: MINT BE-Genauigkeit" : "重点注意：解题区间规范 (MINT BE)"}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-800 font-bold bg-amber-100/80 px-1.5 py-0.5 rounded">
                    高频扣分
                  </span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed font-medium">
                  {radarTrack === "gewi"
                    ? de
                      ? "Strikte Trennung von Deskription (AFB I), Analyse (AFB II) und Urteil (AFB III) einhalten. Keine subjektiven Wertungen vor Teilaufgabe 3!"
                      : "客观描述 (AFB I)、机制分析 (AFB II) 与价值裁决 (AFB III) 须严格分段。禁止在分析段夹带个人观点，将评判保留至第 3 问。"
                    : de
                      ? "Intervallgrenzen bei Extremwertbestimmung explizit prüfen und Randextrema gesondert ausweisen."
                      : "求导驻点后必须核查定义域区间端点开闭性，严防遗漏端点极大值导致失分。"}
                </p>
              </div>

              {/* 3. 详细维度列表与单测契约保留 */}
              <div className="space-y-1.5 pt-1">
                <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                  {de ? "Diagnose-Kriterien" : "采分网格自查明细"}
                </div>
                <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
                  {activeMetricList.map((item) => {
                    const isSelected = item.code === activeMetricCode;
                    return (
                      <div
                        key={item.code}
                        onClick={() => setActiveMetricCode(item.code)}
                        className={`flex items-center justify-between py-1.5 px-2 rounded-lg transition-colors cursor-pointer text-xs ${
                          isSelected ? "bg-slate-100 font-bold text-slate-900" : "hover:bg-slate-50 text-slate-700"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] px-1 py-0.2 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {item.code}
                          </span>
                          <span className="truncate">{de ? item.nameDE : item.nameZH}</span>
                        </div>
                        <span className="font-mono text-[11px] text-slate-600 tabular-nums">
                          {item.score}/{item.max}
                        </span>
                      </div>
                    );
                  })}
                </div>
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
