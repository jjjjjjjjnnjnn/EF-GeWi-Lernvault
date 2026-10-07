import { useEffect, useState } from "react";
import type { Lang } from "../i18n";

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
    fixGuideDE: "Ersetze Alltagsverben durch Fachtermini (z. B. 'manifestiert' statt 'zeigt').",
    fixGuideZH: "背诵每科核心学术高频动词，杜绝口语化表述。",
  },
  {
    code: "D5",
    nameDE: "Satzverknüpfung",
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
    titleDE: "SoWi IF 1: «Drei-Ebenen-Trennung: Deskription vs. Deutung»",
    titleZH: "攻克 1 门微课: SoWi «三态分流：客观描述 vs 机制分析 vs 价值评价»",
    tag: "Lernreise · D2",
    xpReward: 80,
    estMinutes: 8,
    targetTab: "reise",
    targetContext: { fach: "SoWi" },
    difficultyDE: "8 Min · Kernmodul",
    difficultyZH: "8 分钟 · 核心专攻",
  },
  {
    id: "m3",
    type: "klausursim",
    fach: "Mathe",
    afb: "AFB II",
    titleDE: "10-Minuten-Aufgabe: Extremwert-Randwertvergleich (BE-Genauigkeit)",
    titleZH: "限时 10 分钟冲刺: 数学极值闭区间端点检验题 (BE-Genauigkeit 专项)",
    tag: "Klausur · MINT-BE",
    xpReward: 100,
    estMinutes: 10,
    targetTab: "klausursim",
    targetContext: { fach: "Mathe" },
    difficultyDE: "10 Min · Klausur",
    difficultyZH: "10 分钟 · 会考真题",
  },
];

// SVG 多边形几何雷达图生成函数
function generateRadarPoints(metrics: RadarMetric[], radius: number, center: number) {
  const total = metrics.length;
  return metrics.map((m, i) => {
    const angle = (Math.PI * 2 / total) * i - Math.PI / 2;
    const ratio = Math.max(0.2, m.score / m.max);
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
  const [completedMissions, setCompletedMissions] = useState<Record<string, boolean>>({});
  const [currentXP, setCurrentXP] = useState<number>(680);
  const targetXP = 1000;

  // 交互状态：当前选中的天梯节点（展开段位学术详情）
  const [selectedStufeId, setSelectedStufeId] = useState<string>("q1_vertiefung");
  // 交互状态：双轨雷达当前查看的指标（展开学术评测细则与纠错指引）
  const [activeMetricCode, setActiveMetricCode] = useState<string>("D2");
  // 交互状态：雷达视角切换（文科 D1-D5 vs 理科 BE）
  const [radarTrack, setRadarTrack] = useState<"gewi" | "mint">("gewi");
  // 交互状态：鼠标悬停的雷达节点 (动态指引悬停)
  const [hoveredMetricCode, setHoveredMetricCode] = useState<string | null>(null);
  // 交互状态：是否展开答题细则抽屉 (Accordion)
  const [expandedDetail, setExpandedDetail] = useState<boolean>(false);
  // 挂载平滑补间动画状态
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const toggleMission = (id: string, xp: number) => {
    setCompletedMissions((prev) => {
      const next = !prev[id];
      if (next) {
        setCurrentXP((x) => Math.min(targetXP, x + xp));
      } else {
        setCurrentXP((x) => Math.max(0, x - xp));
      }
      return { ...prev, [id]: next };
    });
  };

  const completedCount = Object.values(completedMissions).filter(Boolean).length;
  const isAllCompleted = completedCount === DEMO_MISSIONS.length;

  const currentStufe = DEMO_STUFEN.find((s) => s.id === selectedStufeId) || DEMO_STUFEN[1];
  const activeMetricList = radarTrack === "gewi" ? DEMO_D_RADAR : DEMO_BE_METRICS;
  const activeMetric =
    activeMetricList.find((m) => m.code === activeMetricCode) || activeMetricList[0];

  // SVG 雷达参数 (精简紧凑版)
  const radarCenter = 85;
  const radarRadius = 62;
  const radarPoints = generateRadarPoints(activeMetricList, radarRadius, radarCenter);
  const polygonPointsString = radarPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");

  return (
    <div className="mx-auto max-w-6xl space-y-6 pb-16 transition-all duration-300">
      {/* 1. 顶部刊头与极简工具栏 (MASTHEAD & TOOLS) */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[var(--line)] gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--accent)] font-bold font-mono text-sm">
            LV
          </div>
          <div>
            <h1 className="font-serif text-2xl font-normal text-[var(--ink)] tracking-tight">
              {de ? "Klausur-Leistungszentrale" : "会考战力与升阶总台"}
            </h1>
            <p className="font-sans text-xs text-[var(--gray)]">
              {de ? "Qualifikationsphase Q1/Q2 · Fokus-Dashboard" : "Gymnasium Oberstufe · 今日冲刺与考纲战力"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* 连续打卡动量徽章 (Streak Momentum - German Precision) */}
          <div className="flex items-center gap-2 border border-[var(--accent)]/30 bg-[var(--paper-subtle)] px-2.5 py-1 rounded select-none">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]" />
            </span>
            <span className="font-mono text-xs font-bold text-[var(--ink)] tabular-nums">
              18 {de ? "Tage Streak" : "天连胜"}
            </span>
          </div>

          {/* 主题切换器 (暗黑精锐 / 极简学术) */}
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
            className="text-xs font-mono text-[var(--gray)] hover:text-[var(--accent)] border border-[var(--line)] px-2.5 py-1 rounded bg-[var(--surface)] hover:bg-[var(--paper)] transition-all active:scale-95 cursor-pointer"
            title={de ? "Theme wechseln (Cyber / Academic)" : "切换主题 (暗黑精锐 / 极简学术)"}
          >
            {de ? "Theme" : "暗黑/浅色"}
          </button>

          {onSwitchToLegacy && (
            <button
              type="button"
              onClick={onSwitchToLegacy}
              className="text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] border border-[var(--line)] px-2.5 py-1 rounded bg-[var(--surface)] hover:bg-[var(--paper)] transition-all active:scale-95 cursor-pointer"
              title={de ? "Zur klassischen Übersicht" : "返回旧版概览"}
            >
              {de ? "Klassik" : "经典版"}
            </button>
          )}
        </div>
      </header>

      {/* 2. 减负聚合区：极简 HERO 战力卡片 + 主行动号召 (PRIMARY HERO) */}
      <section className="stagger-1 academic-card p-5 transition-all relative overflow-hidden">
        {/* 背景微环境柔光 (Academic Focus Glow) */}
        <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[var(--accent)]/5 pointer-events-none blur-2xl" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 relative z-10">
          {/* 左侧：战力徽章与经验池 (German Abitur 1-15 Notenpunkte System) */}
          <div className="flex items-center gap-4">
            {/* 精致学术盾牌/质感印章徽标 */}
            <div className="flex items-center justify-center w-14 h-14 rounded border border-[var(--accent)]/30 bg-[var(--paper-subtle)] shrink-0 select-none transition-transform hover:scale-105 duration-200">
              <div className="text-center">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-[var(--gray)] font-semibold">
                  LEVEL
                </span>
                <span className="block font-serif text-2xl font-bold text-[var(--ink)] leading-none tabular-nums">
                  11
                </span>
                <span className="block font-mono text-[8px] text-[var(--accent)] font-bold tracking-tight">
                  NP
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-serif text-xl font-medium text-[var(--ink)]">
                  11 Notenpunkte
                </span>
                <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-[var(--accent)] text-[var(--paper)] font-bold tracking-wide">
                  {de ? "Stufe II · Q1-Niveau" : "第二阶 · Q1 进阶期"}
                </span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--gray)] font-medium">
                  {de ? "Note 2 (Gut)" : "2分档 · 良好 (Gut)"}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--gray)] tabular-nums">
                <span className="text-[var(--ink)] font-semibold">{currentXP} / {targetXP} XP</span>
                <span>·</span>
                <span>{de ? `noch ${targetXP - currentXP} XP bis Sprung auf 13 NP (Note 1- Sehr gut)` : `还差 ${targetXP - currentXP} XP 跃升 13 NP (1分档·优秀)`}</span>
              </div>
            </div>
          </div>

          {/* 右侧：唯一的超级主行动 CTA 按钮 (学术暗黑金属质感 + 微光波扫过) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onNavigateToTab?.("flashcards")}
              className="academic-hero-button w-full md:w-auto flex items-center justify-center gap-2.5 px-6 py-3 rounded border border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-sans text-sm font-medium hover:bg-[var(--accent)] hover:border-[var(--accent)] cursor-pointer select-none group"
            >
              <div className="academic-shimmer" />
              <span>{de ? "Heute lernen (15 Min. starten)" : "开始今日冲刺 (15分钟)"}</span>
              <span className="font-mono font-bold transition-transform duration-150 group-hover:translate-x-1">
                {"->"}
              </span>
            </button>
          </div>
        </div>

        {/* 经验进度条 (平滑补间动画与德国 Oberstufe 档位刻度) */}
        <div className="mt-4 pt-3 border-t border-[var(--line)]/50 space-y-1.5">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--gray)] tabular-nums px-0.5">
            <span>10 NP (Defizit-Grenze)</span>
            <span className="text-[var(--accent)] font-semibold">11 NP (Aktuell)</span>
            <span>13 NP (Sehr Gut Ziel)</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[var(--paper-subtle)] overflow-hidden">
            <div
              className="h-full bg-[var(--accent)] rounded-full transition-all duration-700 ease-out"
              style={{ width: mounted ? `${(currentXP / targetXP) * 100}%` : "0%" }}
            />
          </div>
        </div>
      </section>

      {/* 3. 二分屏核心动线：左侧 60% 今日战场 (Actionable) vs 右侧 40% 战力与弱项诊断 (Analytical) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ===================== 左侧主体 (7 / 12 约 58%)：今日战场 ===================== */}
        <section className="lg:col-span-7 space-y-4 stagger-2">
          {/* 今日任务卡片容器 */}
          <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-3">
              <div>
                <div className="font-mono text-[10px] text-[var(--gray)] uppercase tracking-wider">
                  {de ? "Aktionsplan · Heute fällig" : "今日战场 · 靶向处方"}
                </div>
                <h2 className="font-serif text-lg text-[var(--ink)]">
                  {de ? "Tages-Rezeptur (15 Minuten)" : "靶向弱项消除处方"}
                </h2>
              </div>
              <span className="font-mono text-xs text-[var(--gray)] border border-[var(--line)] px-2 py-0.5 rounded bg-[var(--paper-subtle)] font-medium">
                {completedCount} / {DEMO_MISSIONS.length} {de ? "erledigt" : "已完成"}
              </span>
            </div>

            {isAllCompleted ? (
              <div className="p-5 rounded border border-[var(--line)] bg-[var(--paper)] text-center space-y-2 tab-enter">
                <div className="font-serif text-base text-[var(--ink)]">
                  {de ? "[OK] Tagespensum erfolgreich absolviert!" : "[OK] 今日任务已全部通关！"}
                </div>
                <p className="font-sans text-xs text-[var(--gray)] max-w-sm mx-auto">
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
                      className={`group flex items-start justify-between p-3.5 rounded border transition-all duration-200 gap-3 ${
                        done
                          ? "border-[var(--line)] bg-[var(--paper-subtle)]/40 opacity-60"
                          : "border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)] hover:-translate-y-0.5"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <button
                          type="button"
                          onClick={() => toggleMission(m.id, m.xpReward)}
                          className="mt-0.5 w-4 h-4 rounded border border-[var(--line)] bg-[var(--surface)] flex items-center justify-center text-xs font-mono cursor-pointer hover:border-[var(--accent)] active:scale-90 transition-all shrink-0"
                          title={de ? "Als erledigt markieren" : "勾选标记完成"}
                        >
                          {done ? "x" : ""}
                        </button>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            {/* 德国高中学科微标签 */}
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded border border-[var(--accent)]/30 bg-[var(--paper-subtle)] text-[var(--ink)] font-semibold">
                              [{m.fach}]
                            </span>
                            {/* 认知层级 AFB I-III 规范徽章 */}
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] font-medium">
                              {m.afb}
                            </span>
                            <span className="font-mono text-[9px] uppercase px-1.5 py-0.2 rounded border border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] font-medium">
                              {m.tag}
                            </span>
                            <span className="font-mono text-xs text-[var(--accent)] font-bold tabular-nums">
                              +{m.xpReward} XP
                            </span>
                            <span className="font-mono text-[10px] text-[var(--gray)] tabular-nums">
                              · {de ? m.difficultyDE : m.difficultyZH}
                            </span>
                          </div>
                          <div
                            className={`font-sans text-xs font-medium transition-colors ${
                              done ? "line-through text-[var(--gray)]" : "text-[var(--ink)]"
                            }`}
                          >
                            {de ? m.titleDE : m.titleZH}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onNavigateToTab?.(m.targetTab, m.targetContext)}
                        className="shrink-0 font-mono text-xs text-[var(--ink)] border border-[var(--line)] hover:border-[var(--accent)] hover:text-[var(--accent)] px-2.5 py-1 rounded bg-[var(--surface)] active:scale-95 transition-all cursor-pointer font-medium flex items-center gap-1 group-hover:border-[var(--accent)]"
                      >
                        <span>{de ? "Start ->" : "去执行 ->"}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* 年级战役通关路线 (带柔和激活焦点环与阻尼过渡) */}
          <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-[var(--line)]/50 pb-2">
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)]">
                {de ? "Abitur-Stufenleiter" : "年级战役路线"}
              </span>
              <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                {currentStufe.id.toUpperCase()}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {DEMO_STUFEN.map((s, idx) => {
                const isDone = s.status === "completed";
                const isCurr = s.status === "current";
                const isSelected = s.id === selectedStufeId;

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedStufeId(s.id)}
                    className={`p-2.5 rounded border text-left transition-all duration-150 cursor-pointer ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--paper)] -translate-y-0.5"
                        : "border-[var(--line)] bg-[var(--paper)]/60 hover:bg-[var(--paper)] hover:border-[var(--line)]/80"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="font-bold text-[var(--ink)]">0{idx + 1}</span>
                      <span className={`font-semibold ${isDone ? "text-[var(--success)]" : isCurr ? "text-[var(--accent)]" : "text-[var(--gray)]"}`}>
                        {isDone ? "[OK]" : isCurr ? "[*]" : "[ ]"}
                      </span>
                    </div>
                    <div className="font-sans text-xs font-medium text-[var(--ink)] truncate mt-1">
                      {de ? s.stufeDE : s.stufeZH}
                    </div>
                    <div className="font-mono text-[10px] text-[var(--gray)] mt-1">
                      &gt;= {s.minNP} NP
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 当前选中年级特权展示 */}
            <div className="pt-2 border-t border-[var(--line)]/50 text-xs space-y-1">
              <div className="font-mono text-[10px] text-[var(--gray)] uppercase">
                {de ? "Freigeschaltete Kompetenzen:" : "段位特权与能力清单:"}
              </div>
              <div className="flex flex-wrap gap-1.5 pt-0.5">
                {(de ? currentStufe.unlockedPerksDE : currentStufe.unlockedPerksZH).map((perk, i) => (
                  <span
                    key={i}
                    className="font-mono text-[10px] px-2 py-0.5 rounded border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)]"
                  >
                    {perk}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ===================== 右侧辅助 (5 / 12 约 42%)：战力诊断室 ===================== */}
        <section className="lg:col-span-5 space-y-4 stagger-3">
          <div className="rounded border border-[var(--line)] bg-[var(--surface)] p-5 space-y-4">
            {/* 诊断室头部与轨道微切换 */}
            <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-3">
              <div>
                <div className="font-mono text-[10px] text-[var(--gray)] uppercase tracking-wider">
                  {de ? "Diagnose" : "战力诊断"}
                </div>
                <h3 className="font-serif text-base text-[var(--ink)]">
                  {de ? "Klausur-Kompetenznetz" : "核心失分点几何雷达图"}
                </h3>
              </div>

              <div className="flex items-center gap-1 bg-[var(--paper-subtle)] p-0.5 rounded border border-[var(--line)]">
                <button
                  type="button"
                  onClick={() => {
                    setRadarTrack("gewi");
                    setActiveMetricCode("D2");
                  }}
                  className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all cursor-pointer ${
                    radarTrack === "gewi"
                      ? "bg-[var(--surface)] text-[var(--ink)] font-bold border border-[var(--line)] shadow-none"
                      : "text-[var(--gray)] hover:text-[var(--ink)]"
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
                  className={`px-2 py-0.5 text-[10px] font-mono rounded transition-all cursor-pointer ${
                    radarTrack === "mint"
                      ? "bg-[var(--surface)] text-[var(--ink)] font-bold border border-[var(--line)] shadow-none"
                      : "text-[var(--gray)] hover:text-[var(--ink)]"
                  }`}
                >
                  {de ? "MINT BE-Exaktheit" : "理科 BE 采分步进雷达"}
                </button>
              </div>
            </div>

            {/* 紧凑版 SVG 几何雷达画布 */}
            <div className="flex flex-col items-center justify-center p-3 rounded border border-[var(--line)] bg-[var(--paper)] transition-all">
              <svg
                width="170"
                height="170"
                viewBox="0 0 170 170"
                className="overflow-visible select-none"
              >
                <defs>
                  <linearGradient id="academicRadarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--ink)" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.12" />
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
                    stroke="var(--line)"
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
                    stroke="var(--line)"
                    strokeWidth="1"
                  />
                ))}

                {/* 纸墨渐变多边形 */}
                <polygon
                  points={polygonPointsString}
                  fill="url(#academicRadarGrad)"
                  stroke="var(--accent)"
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
                        fill={pt.m.isWeak ? "var(--warning)" : "var(--ink)"}
                        stroke="var(--surface)"
                        strokeWidth="1.5"
                        className="transition-all duration-200"
                      />
                      <text
                        x={pt.x + (pt.x > radarCenter ? 6 : -6)}
                        y={pt.y + (pt.y > radarCenter ? 8 : -5)}
                        textAnchor={pt.x > radarCenter ? "start" : "end"}
                        className={`font-mono text-[9px] select-none ${
                          isSelected ? "fill-[var(--accent)] font-bold" : "fill-[var(--gray)]"
                        }`}
                      >
                        {pt.m.code}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 失分点列表：默认精简收拢为微徽章 + 进度 */}
            <div className="space-y-1.5">
              {activeMetricList.map((item) => {
                const isSelected = item.code === activeMetricCode;
                return (
                  <div
                    key={item.code}
                    onClick={() => setActiveMetricCode(item.code)}
                    className={`flex items-center justify-between p-2.5 rounded border text-xs cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? "border-[var(--accent)] bg-[var(--paper)] -translate-x-0.5"
                        : "border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--paper-subtle)]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-semibold text-[var(--ink)]">
                        [{item.code}]
                      </span>
                      <span className="font-sans text-xs text-[var(--ink)]">
                        {de ? item.nameDE : item.nameZH}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] px-2 py-0.5 rounded border font-medium ${
                          item.isWeak
                            ? "border-[var(--warning)]/40 text-[var(--warning)] bg-[var(--warning)]/5 font-bold"
                            : "border-[var(--line)] text-[var(--gray)] bg-[var(--paper-subtle)]"
                        }`}
                      >
                        {item.isWeak && "[!] "}
                        {de ? item.statusTextDE : item.statusTextZH}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 可折叠的考点细则与答题法则 (Accordion 避免满屏塞爆) */}
            <div className="border border-[var(--line)] rounded bg-[var(--paper)] p-3 text-xs space-y-2">
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedDetail(!expandedDetail)}
              >
                <div className="font-mono text-[11px] font-bold text-[var(--ink)]">
                  {de ? "Klausur-Diagnose:" : "当前考点细则:"} [{activeMetric.code}]
                </div>
                <button type="button" className="font-mono text-[10px] text-[var(--gray)] underline">
                  {expandedDetail ? (de ? "Einklappen ▲" : "收起细则 ▲") : (de ? "Details ▼" : "展开细则 ▼")}
                </button>
              </div>

              {expandedDetail && (
                <div className="pt-2 border-t border-[var(--line)]/50 space-y-1.5 tab-enter">
                  <p className="font-sans text-xs text-[var(--ink)]">
                    {de ? activeMetric.descDE : activeMetric.descZH}
                  </p>
                  <div className="pt-1 text-[11px] font-mono text-[var(--gray)]">
                    <span className="font-bold text-[var(--ink)]">{de ? "Fix: " : "化解法则: "}</span>
                    {de ? activeMetric.fixGuideDE : activeMetric.fixGuideZH}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* 4. 底部极简学科穿梭码头 */}
      <section className="rounded border border-[var(--line)] bg-[var(--surface)] p-4 space-y-2">
        <div className="flex items-center justify-between border-b border-[var(--line)]/60 pb-2">
          <span className="font-mono text-[10px] text-[var(--gray)] uppercase tracking-wider">
            {de ? "Fächer-Schnellzugriff" : "学科考点码头"}
          </span>
          <button
            type="button"
            onClick={() => onNavigateToTab?.("lernbaum")}
            className="font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)] underline cursor-pointer"
          >
            {de ? "Alle Fächer ->" : "学科树全貌 ->"}
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
              className="p-2 rounded border border-[var(--line)] bg-[var(--paper)] hover:border-[var(--accent)] text-left transition-all cursor-pointer"
            >
              <div className="font-mono text-xs font-bold text-[var(--ink)]">{item.fach}</div>
              <div className="font-serif text-xs text-[var(--gray)] mt-0.5">{item.np} NP</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export default DashboardCockpit;
