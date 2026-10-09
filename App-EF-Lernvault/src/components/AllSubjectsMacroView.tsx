import React, { useState, useMemo, useRef } from "react";
import {
  graphRegistry,
  type KnowledgeNode,
  type SubjectKnowledgeGraph,
  type SubjectKey,
} from "../engine/skillTree";
import type { Lang, NodeLanguageMode } from "../i18n/types";
import { resolveNodeLanguage } from "../i18n/nodeLocalization";
import { truncateTextToVisualWidth } from "../utils/svgTypography";

export interface CrossSubjectSynergyTrack {
  readonly id: string;
  readonly titleDE: string;
  readonly titleZH: string;
  readonly descriptionDE: string;
  readonly descriptionZH: string;
  readonly subjectIds: readonly string[];
  readonly nodeIds: readonly string[];
}

/**
 * 跨学科黄金融通战役预设清单 (Gymnasium Oberstufe Interdisciplinary Synergies)
 */
export const CROSS_SUBJECT_SYNERGY_TRACKS: readonly CrossSubjectSynergyTrack[] = [
  {
    id: "mint-analysis-kinetik",
    titleDE: "MINT-Kinetik & Infinitesimalrechnung",
    titleZH: "数理融通 · 微积分极限定理到牛顿动力学方程",
    descriptionDE: "Von der Sekantensteigung zum Differentialquotienten und dessen physikalischer Anwendung in gleichmäßig beschleunigten Bewegungen sowie Energieerhaltungssätzen.",
    descriptionZH: "从割线斜率逼近切线导数，直通物理运动学瞬时速率与机械能守恒定律，完成数理两大学科底层方法论贯通。",
    subjectIds: ["Mathe", "Physik"],
    nodeIds: [
      "mathe-ableitung-grenzwert",
      "physik-gleichfoermig-beschleunigt",
      "physik-newton-gesetze",
      "physik-energieerhaltung",
    ],
  },
  {
    id: "gewi-rationalitaet-gerechtigkeit",
    titleDE: "GeWi-Rationalismus & Gerechtigkeitsethik",
    titleZH: "社哲辨析 · 经济理性人假设与正义分配伦理",
    descriptionDE: "Spannungsfeld zwischen ökonomischem Knappheitsprinzip, Marktpreismechanismus und philosophischen Theorien der Verteilungsgerechtigkeit (Utilitarismus, Kant, Rawls).",
    descriptionZH: "从微观经济稀缺性与市场价格机制，跨越至功利主义最大福祉、康德绝对命令与罗尔斯无知之幕分配正义的宏观社会伦理辩证。",
    subjectIds: ["SoWi", "Philosophie"],
    nodeIds: [
      "sowi-beduerfnis-knappheit",
      "sowi-preismechanismus",
      "philo-utilitarismus-bentham",
      "philo-kant-kategorischer-imperativ",
      "philo-rawls-schleier-des-nichtwissens",
    ],
  },
  {
    id: "bio-chem-membran-transport",
    titleDE: "Bio-Chem-Grenzfläche & Membrantransport",
    titleZH: "微观生化 · 分子间作用力与跨膜物质流转运",
    descriptionDE: "Zusammenwirken von zwischenmolekularen Kräften (Dipol, Wasserstoffbrücken) mit dem Flüssig-Mosaik-Modell biologischer Membranen und aktivem Ionentransport.",
    descriptionZH: "从化学键极性、偶极与氢键特异性，深入生物磷脂双分子层流动镶嵌结构与跨膜浓度梯度主动运输机理。",
    subjectIds: ["Chemie", "Bio"],
    nodeIds: [
      "chemie-zwischenmolekulare-kraefte",
      "bio-biomembran-aufbau",
      "bio-passiver-aktiver-transport",
      "bio-enzymkinetik-michaelis-menten",
    ],
  },
  {
    id: "kultur-rhetorik-epistemologie",
    titleDE: "Kultur & Kritik: Rhetorik & Erkenntnistheorie",
    titleZH: "德哲思辨 · 论说修辞结构与认识论批判标准",
    descriptionDE: "Analyse argumentativer Sachtexte, rhetorische Stilmittel und die philosophische Hinterfragung von Geltungsansprüchen, Dogmen und Urteilen.",
    descriptionZH: "从德语学术论述文的三段论结构与古典修辞格说服力，贯通至哲学笛卡尔怀疑主义、休谟归纳问题与认识论真理评判。",
    subjectIds: ["Deutsch", "Philosophie"],
    nodeIds: [
      "deutsch-sachtextanalyse-argumentation",
      "deutsch-rhetorische-mittel",
      "philo-erkenntnistheorie-skeptizismus",
      "philo-sprachphilosophie-bedeutung",
    ],
  },
];

export interface AllSubjectsMacroViewProps {
  readonly lang: Lang;
  readonly nodeLangMode: NodeLanguageMode;
  readonly onSelectSubject: (fach: SubjectKey) => void;
  readonly onSelectNode: (node: KnowledgeNode) => void;
  readonly onDeselectNode?: () => void;
  readonly selectedNodeId?: string | null;
  readonly masteredIds: Set<string>;
  readonly onToggleMastered?: (nodeId: string, fach: string) => void;
  readonly className?: string;
}

type MacroTab = "astrolabe" | "matrix" | "synergies";

export function AllSubjectsMacroView({
  lang,
  nodeLangMode,
  onSelectSubject,
  onSelectNode,
  onDeselectNode,
  selectedNodeId,
  masteredIds,
  className = "",
}: AllSubjectsMacroViewProps) {
  const de = lang === "de";

  // 当前子视图 Tab: 宏观星盘 (astrolabe) | 十科阵列 (matrix) | 跨学科战役 (synergies)
  const [activeTab, setActiveTab] = useState<MacroTab>("astrolabe");

  // 跨学科战役高亮选择
  const [selectedSynergyId, setSelectedSynergyId] = useState<string | null>(null);

  // 全科考点即时检索关键字
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 悬停学科或考点
  const [hoveredSubject, setHoveredSubject] = useState<string | null>(null);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // 星盘画布平移与缩放
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1.0);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 汇总所有已注册学科图谱与知识点
  const allGraphs = useMemo<SubjectKnowledgeGraph[]>(() => {
    return graphRegistry.getAll();
  }, []);

  const allSubjectsMeta = useMemo(() => {
    return graphRegistry.listSubjects();
  }, []);

  // 扁平化全科考点池 (700+ 节点)
  const allNodes = useMemo<KnowledgeNode[]>(() => {
    const list: KnowledgeNode[] = [];
    for (const g of allGraphs) {
      for (const n of g.nodes) {
        list.push(n);
      }
    }
    return list;
  }, [allGraphs]);

  const nodeMap = useMemo(() => {
    return new Map(allNodes.map((n) => [n.id, n]));
  }, [allNodes]);

  // 全科全局宏观指标 (KPI)
  const globalStats = useMemo(() => {
    const total = allNodes.length;
    const mastered = allNodes.filter((n) => masteredIds.has(n.id)).length;
    const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;

    // 文理平衡分布：MINT (理科) vs GeWi (文科/社科)
    const mintSubs = new Set(["mathe", "physik", "chemie", "bio", "informatik"]);
    let mintTotal = 0;
    let mintMastered = 0;
    let gewiTotal = 0;
    let gewiMastered = 0;

    for (const n of allNodes) {
      const f = String(n.fach).toLowerCase();
      if (mintSubs.has(f)) {
        mintTotal++;
        if (masteredIds.has(n.id)) mintMastered++;
      } else {
        gewiTotal++;
        if (masteredIds.has(n.id)) gewiMastered++;
      }
    }

    const mintPercent = mintTotal > 0 ? Math.round((mintMastered / mintTotal) * 100) : 0;
    const gewiPercent = gewiTotal > 0 ? Math.round((gewiMastered / gewiTotal) * 100) : 0;

    return {
      total,
      mastered,
      percent,
      mintTotal,
      mintMastered,
      mintPercent,
      gewiTotal,
      gewiMastered,
      gewiPercent,
    };
  }, [allNodes, masteredIds]);

  // 全科即时搜索过滤结果 (按中德术语、分类与标签实时匹配)
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return allNodes
      .filter((n) => {
        return (
          n.titleZH.toLowerCase().includes(q) ||
          n.titleDE.toLowerCase().includes(q) ||
          (n.category && n.category.toLowerCase().includes(q)) ||
          (n.tags && n.tags.some((t) => t.toLowerCase().includes(q)))
        );
      })
      .slice(0, 16);
  }, [searchQuery, allNodes]);

  // 计算 10 门主修学科在星盘环周的极坐标布局 (Astrolabe Orbital Planetary Layout)
  const ASTROLABE_CX = 560;
  const ASTROLABE_CY = 440;
  const ASTROLABE_ORBIT_R = 270;

  const subjectPlacements = useMemo(() => {
    const subs = allSubjectsMeta;
    const count = subs.length;
    if (count === 0) return [];

    return subs.map((sub, idx) => {
      // 均分 360 度，从 -90 度 (正上方 12 点钟位置) 开始顺时针排列
      const angleDeg = -90 + (idx * 360) / count;
      const angleRad = (angleDeg * Math.PI) / 180;
      const cx = ASTROLABE_CX + ASTROLABE_ORBIT_R * Math.cos(angleRad);
      const cy = ASTROLABE_CY + ASTROLABE_ORBIT_R * Math.sin(angleRad);

      const graph = allGraphs.find((g) => g.fach.toLowerCase() === sub.fach.toLowerCase());
      const nodes = graph ? graph.nodes : [];
      const total = nodes.length;
      const mastered = nodes.filter((n) => masteredIds.has(n.id)).length;
      const percent = total > 0 ? Math.round((mastered / total) * 100) : 0;

      // 提取该学科代表性锚定知识点 (AFB I, II, III 各选 1 个)
      const anchorNodes: KnowledgeNode[] = [];
      const afb1 = nodes.find((n) => n.level === 1);
      const afb2 = nodes.find((n) => n.level === 2 && n.id !== afb1?.id);
      const afb3 = nodes.find((n) => n.level === 3 && n.id !== afb1?.id && n.id !== afb2?.id);
      if (afb1) anchorNodes.push(afb1);
      if (afb2) anchorNodes.push(afb2);
      if (afb3) anchorNodes.push(afb3);

      return {
        fach: sub.fach,
        nameDE: sub.nameDE,
        nameZH: sub.nameZH,
        cx,
        cy,
        angleDeg,
        total,
        mastered,
        percent,
        anchorNodes,
      };
    });
  }, [allSubjectsMeta, allGraphs, masteredIds]);

  // 跨学科连线渲染数据 (Interdisciplinary Link Vectors)
  const crossSubjectLinks = useMemo(() => {
    const links: Array<{
      id: string;
      fromSubject: string;
      toSubject: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      titleZH: string;
      titleDE: string;
      isActive: boolean;
    }> = [];

    const placementMap = new Map(subjectPlacements.map((p) => [p.fach.toLowerCase(), p]));

    for (const track of CROSS_SUBJECT_SYNERGY_TRACKS) {
      if (track.subjectIds.length >= 2) {
        const p1 = placementMap.get(track.subjectIds[0].toLowerCase());
        const p2 = placementMap.get(track.subjectIds[1].toLowerCase());
        if (p1 && p2) {
          const isActive = selectedSynergyId === track.id ||
            hoveredSubject === p1.fach.toLowerCase() ||
            hoveredSubject === p2.fach.toLowerCase();

          links.push({
            id: track.id,
            fromSubject: p1.fach,
            toSubject: p2.fach,
            x1: p1.cx,
            y1: p1.cy,
            x2: p2.cx,
            y2: p2.cy,
            titleZH: track.titleZH,
            titleDE: track.titleDE,
            isActive,
          });
        }
      }
    }

    return links;
  }, [subjectPlacements, selectedSynergyId, hoveredSubject]);

  const canvasPointerDownPosRef = useRef<{ x: number; y: number } | null>(null);
  const canvasHasMovedRef = useRef<boolean>(false);

  // 画布鼠标拖拽平移与点击空白取消选中支持
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if ((e.target as HTMLElement).closest("[data-clickable='true']")) return;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // 兼容不支持 setPointerCapture 的测试环境
    }
    canvasPointerDownPosRef.current = { x: e.clientX, y: e.clientY };
    canvasHasMovedRef.current = false;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    if (canvasPointerDownPosRef.current) {
      const dist = Math.hypot(
        e.clientX - canvasPointerDownPosRef.current.x,
        e.clientY - canvasPointerDownPosRef.current.y
      );
      if (dist > 8) {
        canvasHasMovedRef.current = true;
      }
    }
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // 兼容不支持 pointerCapture 的环境
    }
    const startPos = canvasPointerDownPosRef.current;
    canvasPointerDownPosRef.current = null;
    isDraggingRef.current = false;

    const dist = startPos ? Math.hypot(e.clientX - startPos.x, e.clientY - startPos.y) : 999;
    if (startPos && !canvasHasMovedRef.current && dist <= 8) {
      onDeselectNode?.();
    }
  };

  const handleCanvasBgClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if ((e.target as HTMLElement).closest("[data-clickable='true']")) return;
    if (canvasHasMovedRef.current) {
      canvasHasMovedRef.current = false;
      return;
    }
    onDeselectNode?.();
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((z) => Math.min(2.5, Math.max(0.65, +(z * factor).toFixed(3))));
  };

  return (
    <div
      className={`relative flex flex-col w-full h-full bg-[var(--surface)] text-[var(--ink)] overflow-hidden select-none ${className}`}
      data-testid="all-subjects-macro-view"
    >
      {/* 顶部微型全科导航栏与 KPI 控制台 */}
      <div className="flex items-center justify-between border-b border-[var(--line)] px-3 py-1.5 bg-[var(--paper-subtle)] text-xs font-mono shrink-0 gap-3 z-10 flex-wrap min-h-[40px]">
        {/* 左侧：Tab 视图切换 */}
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[var(--gray)] font-bold uppercase tracking-wider text-[11px] mr-1">
            {de ? "Gesamt-Kosmos:" : "全科学业总台:"}
          </span>
          <div className="flex items-center border border-[var(--line)] rounded-[var(--radius)] overflow-hidden h-7 bg-[var(--surface)]">
            <button
              type="button"
              onClick={() => setActiveTab("astrolabe")}
              aria-pressed={activeTab === "astrolabe"}
              className={`px-2.5 h-full flex items-center gap-1.5 cursor-pointer transition-colors ${
                activeTab === "astrolabe"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title={de ? "Interdisziplinäres Astrolabium" : "全科学术引力星盘"}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <circle cx="8" cy="8" r="6" strokeDasharray="2 2" />
                <circle cx="8" cy="8" r="2.5" fill="currentColor" />
              </svg>
              <span>{de ? "Kosmos-Astrolabium" : "全科引力星盘"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("matrix")}
              aria-pressed={activeTab === "matrix"}
              className={`px-2.5 h-full flex items-center gap-1.5 cursor-pointer transition-colors border-l border-[var(--line)] ${
                activeTab === "matrix"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title={de ? "Fächer-Curriculum-Matrix" : "十科学阶阵列矩阵"}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <rect x="2" y="2" width="5" height="5" rx="1" />
                <rect x="9" y="2" width="5" height="5" rx="1" />
                <rect x="2" y="9" width="5" height="5" rx="1" />
                <rect x="9" y="9" width="5" height="5" rx="1" />
              </svg>
              <span>{de ? "Fächer-Matrix" : "学阶矩阵阵列"}</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("synergies")}
              aria-pressed={activeTab === "synergies"}
              className={`px-2.5 h-full flex items-center gap-1.5 cursor-pointer transition-colors border-l border-[var(--line)] ${
                activeTab === "synergies"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title={de ? "Interdisziplinäre Vernetzungspfade" : "跨学科融通战役"}
            >
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 8h10M8 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{de ? "Vernetzungs-Pfade" : "跨学科融通战役"}</span>
            </button>
          </div>
        </div>

        {/* 中间：全科全域即时搜索输入框 */}
        <div className="relative flex-1 max-w-xs shrink-0">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={de ? "Alle 700+ Knoten durchsuchen…" : "全科 700+ 考点闪电穿梭检索…"}
            className="w-full h-7 pl-7 pr-2 text-xs font-mono bg-[var(--surface)] border border-[var(--line)] rounded-[var(--radius)] text-[var(--ink)] placeholder:text-[var(--gray)] focus:border-[var(--ink)] focus:outline-none"
            data-testid="all-subjects-search-input"
          />
          <svg
            className="absolute left-2 top-2 w-3.5 h-3.5 text-[var(--gray)] pointer-events-none"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <circle cx="7" cy="7" r="4.5" />
            <path d="M10.5 10.5L14 14" strokeLinecap="round" />
          </svg>

          {/* 搜索结果即时浮层 */}
          {searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-8 bg-[var(--surface)] border border-[var(--ink)] shadow-xl rounded-[var(--radius)] max-h-72 overflow-y-auto z-40 p-1 space-y-1">
              <div className="px-2 py-1 text-[10px] text-[var(--gray)] border-b border-[var(--line)] flex justify-between">
                <span>{de ? "Gefundene Knoten" : "匹配考点清单"} ({searchResults.length})</span>
                <span className="cursor-pointer hover:text-[var(--ink)]" onClick={() => setSearchQuery("")}>✕</span>
              </div>
              {searchResults.map((node) => {
                const loc = resolveNodeLanguage(node, nodeLangMode, lang);
                const isMastered = masteredIds.has(node.id);
                return (
                  <div
                    key={node.id}
                    data-testid={`search-result-${node.id}`}
                    onClick={() => {
                      onSelectNode(node);
                      setSearchQuery("");
                    }}
                    className="p-1.5 rounded-[var(--radius)] hover:bg-[var(--paper-subtle)] cursor-pointer flex items-center justify-between text-xs transition-colors"
                  >
                    <div className="min-w-0 flex items-center gap-1.5">
                      <span className="font-mono text-[9px] uppercase px-1 py-0.5 border border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] rounded shrink-0">
                        {node.fach}
                      </span>
                      <span className="font-serif font-bold truncate text-[var(--ink)]">
                        {loc.primaryTitle}
                      </span>
                      <span className="font-mono text-[10px] text-[var(--gray)] truncate hidden sm:inline">
                        {loc.secondaryTitle}
                      </span>
                    </div>
                    <div className="shrink-0 flex items-center gap-1.5 ml-2">
                      <span className="font-mono text-[9px] text-[var(--gray)]">
                        AFB {node.level === 1 ? "I" : node.level === 2 ? "II" : "III"}
                      </span>
                      {isMastered ? (
                        <span className="font-mono text-[8px] px-1 py-0.5 bg-[var(--ink)] text-[var(--surface)] rounded">
                          {de ? "Gekonnt" : "已精通"}
                        </span>
                      ) : (
                        <span className="font-mono text-[8px] px-1 py-0.5 border border-[var(--line)] text-[var(--gray)] rounded">
                          {de ? "Offen" : "待学"}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 右侧：全科宏观学习总进度胶囊 */}
        <div className="flex items-center gap-2.5 ml-auto shrink-0">
          <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-[11px] font-mono">
            <span className="text-[var(--gray)]">{de ? "Gesamt:" : "全科总进度:"}</span>
            <span className="font-bold tabular-nums text-[var(--ink)]">
              {globalStats.mastered}/{globalStats.total} ({globalStats.percent}%)
            </span>
            <div className="w-14 h-1.5 bg-[var(--line)] rounded-full overflow-hidden ml-0.5">
              <div
                className="h-full bg-[var(--ink)] transition-all duration-300"
                style={{ width: `${globalStats.percent}%` }}
              />
            </div>
          </div>

          {/* 文理平衡分布比 (MINT vs GeWi) */}
          <div className="hidden lg:flex items-center gap-2 px-2 py-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-[10px] font-mono">
            <span className="text-[var(--gray)]">MINT {globalStats.mintPercent}%</span>
            <span className="text-[var(--line)]">|</span>
            <span className="text-[var(--gray)]">GeWi {globalStats.gewiPercent}%</span>
          </div>

          {/* 缩放控制器 */}
          <div className="flex items-center border border-[var(--line)] rounded-[var(--radius)] overflow-hidden h-7 bg-[var(--surface)]">
            <button
              type="button"
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.15).toFixed(2)))}
              className="px-2 h-full text-xs hover:bg-[var(--paper-subtle)] cursor-pointer"
              title={de ? "Vergrößern" : "放大"}
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setZoom((z) => Math.max(0.65, +(z - 0.15).toFixed(2)))}
              className="px-2 h-full text-xs hover:bg-[var(--paper-subtle)] cursor-pointer border-l border-[var(--line)]"
              title={de ? "Verkleinern" : "缩小"}
            >
              -
            </button>
            <button
              type="button"
              onClick={() => {
                setZoom(1.0);
                setPan({ x: 0, y: 0 });
              }}
              className="px-2 h-full text-[11px] hover:bg-[var(--paper-subtle)] cursor-pointer border-l border-[var(--line)]"
              title={de ? "Zurücksetzen" : "重置"}
            >
              1:1
            </button>
          </div>
        </div>
      </div>

      {/* 主体画布展示区 */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[var(--surface)]">
        {/* TAB 1: 🌌 全科学术引力星盘 (Astrolabe Multi-Cosmos) */}
        {activeTab === "astrolabe" && (
          <svg
            className="w-full h-full cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onClick={handleCanvasBgClick}
            onWheel={handleWheel}
            data-testid="all-subjects-astrolabe"
          >
            {/* 毫米方格学术工程底纹图纸 (Millimeter Grid Paper Mesh) */}
            <defs>
              <pattern id="macro-grid-subtle" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="var(--line)" strokeWidth="0.5" opacity="0.45" />
              </pattern>
              <pattern id="macro-grid-major" width="140" height="140" patternUnits="userSpaceOnUse">
                <rect width="140" height="140" fill="url(#macro-grid-subtle)" />
                <path d="M 140 0 L 0 0 0 140" fill="none" stroke="var(--line)" strokeWidth="0.9" opacity="0.75" />
              </pattern>
            </defs>
            <rect
              width="100%"
              height="100%"
              fill="url(#macro-grid-major)"
              onClick={handleCanvasBgClick}
              data-testid="all-subjects-astrolabe-bg"
            />

            <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
              {/* 1. 星盘同心天球轨道环层 (Concentric Celestial Latitude Rings) */}
              <circle
                cx={ASTROLABE_CX}
                cy={ASTROLABE_CY}
                r={ASTROLABE_ORBIT_R}
                fill="none"
                stroke="var(--line)"
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />
              <circle
                cx={ASTROLABE_CX}
                cy={ASTROLABE_CY}
                r={ASTROLABE_ORBIT_R + 65}
                fill="none"
                stroke="var(--line)"
                strokeWidth="0.7"
                strokeDasharray="2 6"
                opacity="0.6"
              />
              <circle
                cx={ASTROLABE_CX}
                cy={ASTROLABE_CY}
                r={ASTROLABE_ORBIT_R - 95}
                fill="none"
                stroke="var(--line)"
                strokeWidth="0.8"
                strokeDasharray="3 3"
                opacity="0.5"
              />

              {/* 2. 跨学科引力连线网络 (Interdisciplinary Synergy Web) */}
              <g className="cross-subject-links">
                {crossSubjectLinks.map((link) => (
                  <g key={link.id} className="transition-all duration-300">
                    <line
                      x1={link.x1}
                      y1={link.y1}
                      x2={link.x2}
                      y2={link.y2}
                      stroke={link.isActive ? "var(--ink)" : "var(--line)"}
                      strokeWidth={link.isActive ? 2.0 : 0.8}
                      strokeDasharray={link.isActive ? "none" : "3 4"}
                      opacity={link.isActive ? 1.0 : 0.4}
                    />
                    {link.isActive && (
                      <g
                        transform={`translate(${(link.x1 + link.x2) / 2}, ${(link.y1 + link.y2) / 2})`}
                      >
                        <defs>
                          <clipPath id={`macro-link-clip-${link.id}`}>
                            <rect x="-63" y="-9" width="126" height="18" rx="2.5" />
                          </clipPath>
                        </defs>
                        <rect
                          x="-65"
                          y="-10"
                          width="130"
                          height="20"
                          rx="3"
                          fill="var(--surface)"
                          stroke="var(--ink)"
                          strokeWidth="1.2"
                        />
                        <g clipPath={`url(#macro-link-clip-${link.id})`}>
                          <text
                            textAnchor="middle"
                            dominantBaseline="central"
                            fontFamily="serif"
                            fontSize="9"
                            fontWeight="bold"
                            fill="var(--ink)"
                          >
                            {truncateTextToVisualWidth(de ? link.titleDE : link.titleZH, 116, 9, true)}
                          </text>
                        </g>
                      </g>
                    )}
                  </g>
                ))}
              </g>

              {/* 3. 星盘中枢核心：全科学业会考中枢 (Abitur 2027 Universal Nucleus) */}
              <g transform={`translate(${ASTROLABE_CX}, ${ASTROLABE_CY})`} className="select-none">
                {/* 擒纵轮外周刻度 */}
                {Array.from({ length: 36 }).map((_, i) => {
                  const rad = (i * 10 * Math.PI) / 180;
                  return (
                    <line
                      key={i}
                      x1={54 * Math.cos(rad)}
                      y1={54 * Math.sin(rad)}
                      x2={60 * Math.cos(rad)}
                      y2={60 * Math.sin(rad)}
                      stroke="var(--line)"
                      strokeWidth="1.0"
                    />
                  );
                })}
                <circle
                  r="52"
                  fill="var(--surface)"
                  stroke="var(--ink)"
                  strokeWidth="2.2"
                />
                <circle
                  r="48"
                  fill="none"
                  stroke="var(--ink)"
                  strokeWidth="0.8"
                  strokeOpacity="0.3"
                />
                <text
                  y="-14"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontSize="8.5"
                  fontWeight="bold"
                  letterSpacing="1.5"
                  fill="var(--gray)"
                >
                  GYMNASIUM NRW
                </text>
                <text
                  y="4"
                  textAnchor="middle"
                  fontFamily="serif"
                  fontSize="13"
                  fontWeight="bold"
                  fill="var(--ink)"
                >
                  ABITUR 2027
                </text>
                <text
                  y="20"
                  textAnchor="middle"
                  fontFamily="monospace"
                  fontSize="9"
                  fill="var(--gray)"
                >
                  {`${allSubjectsMeta.length} FÄCHER · ${globalStats.total} KNOTEN`}
                </text>
              </g>

              {/* 4. 十大学科星系核与支柱锚点 (Subject Planetary Cores & Anchor Satellites) */}
              {subjectPlacements.map((sub) => {
                const isHovered = hoveredSubject === sub.fach.toLowerCase();
                return (
                  <g
                    key={sub.fach}
                    transform={`translate(${sub.cx}, ${sub.cy})`}
                    className="group"
                    onPointerEnter={() => setHoveredSubject(sub.fach.toLowerCase())}
                    onPointerLeave={() => setHoveredSubject(null)}
                    style={{
                      transformOrigin: `${sub.cx}px ${sub.cy}px`,
                      transformBox: "view-box",
                    }}
                  >
                    {/* A. 学科微型卫星轨道环 */}
                    <circle
                      r="48"
                      fill="none"
                      stroke={isHovered ? "var(--ink)" : "var(--line)"}
                      strokeWidth="0.8"
                      strokeDasharray="2 3"
                    />

                    {/* B. 学科支柱锚定节点 (3 个 AFB 卫星点) */}
                    {sub.anchorNodes.map((node, nodeIdx) => {
                      const satAngle = (nodeIdx * 120 * Math.PI) / 180;
                      const satX = 48 * Math.cos(satAngle);
                      const satY = 48 * Math.sin(satAngle);
                      const isNodeMastered = masteredIds.has(node.id);
                      const isNodeSelected = selectedNodeId === node.id;
                      const isNodeHovered = hoveredNodeId === node.id;
                      const loc = resolveNodeLanguage(node, nodeLangMode, lang);

                      return (
                        <g
                          key={node.id}
                          transform={`translate(${satX}, ${satY})`}
                          data-clickable="true"
                          className="cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectNode(node);
                          }}
                          onPointerEnter={() => setHoveredNodeId(node.id)}
                          onPointerLeave={() => setHoveredNodeId(null)}
                        >
                          <circle
                            r={isNodeSelected || isNodeHovered ? "8.5" : "6.5"}
                            fill={isNodeMastered ? "var(--ink)" : "var(--surface)"}
                            stroke="var(--ink)"
                            strokeWidth={isNodeSelected ? "2.0" : "1.2"}
                            className="transition-all duration-150"
                          />
                          {isNodeMastered && (
                            <path
                              d="M-2.5 0 L-0.8 1.8 L2.5 -1.5"
                              fill="none"
                              stroke="var(--surface)"
                              strokeWidth="1.2"
                              strokeLinecap="round"
                            />
                          )}
                          {/* 悬停展示微型气泡名牌 */}
                          {(isNodeHovered || isNodeSelected) && (
                            <g transform="translate(0, -14)" className="pointer-events-none">
                              <defs>
                                <clipPath id={`macro-node-clip-${node.id}`}>
                                  <rect x="-48" y="-9" width="96" height="18" rx="2.5" />
                                </clipPath>
                              </defs>
                              <rect
                                x="-50"
                                y="-10"
                                width="100"
                                height="18"
                                rx="3"
                                fill="var(--surface)"
                                stroke="var(--ink)"
                                strokeWidth="1.2"
                              />
                              <g clipPath={`url(#macro-node-clip-${node.id})`}>
                                <text
                                  textAnchor="middle"
                                  dominantBaseline="central"
                                  fontFamily="serif"
                                  fontSize="8.5"
                                  fontWeight="bold"
                                  fill="var(--ink)"
                                >
                                  {truncateTextToVisualWidth(loc.primaryTitle, 86, 8.5, true)}
                                </text>
                              </g>
                            </g>
                          )}
                        </g>
                      );
                    })}

                    {/* C. 学科核心实体球 (Subject Sun Nucleus) */}
                    <g
                      data-clickable="true"
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSubject(sub.fach);
                      }}
                    >
                      <circle
                        r="27"
                        fill="var(--surface)"
                        stroke="var(--ink)"
                        strokeWidth={isHovered ? "2.4" : "1.8"}
                        className="transition-all duration-150"
                      />
                      <circle
                        r="23"
                        fill="none"
                        stroke="var(--line)"
                        strokeWidth="0.8"
                      />
                      {/* 学科缩写代码 */}
                      <text
                        y="-4"
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontSize="9.5"
                        fontWeight="bold"
                        fill="var(--ink)"
                      >
                        {String(sub.fach).toUpperCase()}
                      </text>
                      {/* 掌握度百分比 */}
                      <text
                        y="9"
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontSize="8.5"
                        fill="var(--gray)"
                      >
                        {`${sub.percent}%`}
                      </text>
                    </g>

                    {/* D. 学科名称标牌与快速穿梭链接 */}
                    <g transform="translate(0, 36)" className="select-none">
                      <text
                        textAnchor="middle"
                        fontFamily="serif"
                        fontSize="11"
                        fontWeight="bold"
                        fill="var(--ink)"
                      >
                        {de ? sub.nameDE : sub.nameZH}
                      </text>
                      <g
                        data-clickable="true"
                        className="cursor-pointer hover:opacity-80"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectSubject(sub.fach);
                        }}
                      >
                        <text
                          y="13"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontSize="8.5"
                          fill="var(--gray)"
                          textDecoration="underline"
                        >
                          {de ? "→ Zum Fach" : "→ 深入该科图谱"}
                        </text>
                      </g>
                    </g>
                  </g>
                );
              })}
            </g>
          </svg>
        )}

        {/* TAB 2: 🧭 跨学科融通战役 (Synergy Tracks Flow) */}
        {activeTab === "synergies" && (
          <div
            className="w-full h-full overflow-y-auto p-4 md:p-6 space-y-6"
            data-testid="all-subjects-synergy-tracks"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onDeselectNode?.();
              }
            }}
          >
            <div className="border-b border-[var(--line)] pb-3">
              <h2 className="font-serif text-lg font-bold text-[var(--ink)]">
                {de ? "Interdisziplinäre Vernetzungspfade (Oberstufe)" : "跨学科融通专题战役 (高中全科核心因果链)"}
              </h2>
              <p className="text-xs text-[var(--gray)] mt-1 font-mono">
                {de
                  ? "Verknüpft methodische und inhaltliche Brücken über Fächergrenzen hinweg (MINT ↔ GeWi)."
                  : "打通数理化生 (MINT) 与社哲文史 (GeWi) 跨学科方法论与核心因果链路，直通综合高阶会考题型。"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CROSS_SUBJECT_SYNERGY_TRACKS.map((track) => {
                const isSelected = selectedSynergyId === track.id;
                return (
                  <div
                    key={track.id}
                    onClick={() => setSelectedSynergyId(isSelected ? null : track.id)}
                    className={`p-4 rounded-[var(--radius)] border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                      isSelected
                        ? "bg-[var(--surface)] border-[var(--ink)] shadow-md"
                        : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {track.subjectIds.map((s) => (
                          <span
                            key={s}
                            className="font-mono text-[9.5px] uppercase font-bold px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] rounded"
                          >
                            {s}
                          </span>
                        ))}
                        <span className="font-mono text-[9px] text-[var(--gray)] ml-auto">
                          {`${track.nodeIds.length} ${de ? "Stationen" : "节点序列"}`}
                        </span>
                      </div>
                      <h3 className="font-serif text-sm font-bold text-[var(--ink)] mt-2">
                        {de ? track.titleDE : track.titleZH}
                      </h3>
                      <p className="text-xs text-[var(--gray)] mt-1.5 leading-relaxed">
                        {de ? track.descriptionDE : track.descriptionZH}
                      </p>
                    </div>

                    {/* 包含的知识点序列胶囊 */}
                    <div className="space-y-1.5 pt-2 border-t border-[var(--line)]">
                      <div className="font-mono text-[10px] text-[var(--gray)] font-bold">
                        {de ? "Pfad-Progression:" : "推进关卡链:"}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {track.nodeIds.map((nid, idx) => {
                          const n = nodeMap.get(nid);
                          const isMastered = masteredIds.has(nid);
                          const title = n ? (nodeLangMode === "de" ? n.titleDE : n.titleZH) : nid;
                          return (
                            <button
                              key={nid}
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (n) onSelectNode(n);
                              }}
                              className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                                isMastered
                                  ? "bg-[var(--ink)] text-[var(--surface)] border-[var(--ink)]"
                                  : "bg-[var(--surface)] border-[var(--line)] text-[var(--ink)] hover:border-[var(--ink)]"
                              }`}
                              title={n ? `${n.fach}: ${n.titleDE}` : nid}
                            >
                              <span className="text-[8px] opacity-70">{idx + 1}.</span>
                              <span className="font-serif truncate max-w-[120px]">{title}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: 📊 十科学阶阵列矩阵 (Curriculum Matrix & Balance KPI) */}
        {activeTab === "matrix" && (
          <div
            className="w-full h-full overflow-y-auto p-4 md:p-6 space-y-6"
            data-testid="all-subjects-matrix"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                onDeselectNode?.();
              }
            }}
          >
            <div className="border-b border-[var(--line)] pb-3">
              <h2 className="font-serif text-lg font-bold text-[var(--ink)]">
                {de ? "Fächer-Curriculum-Matrix & Fortschritts-Radar" : "全学科考阶阵列矩阵与备考总台"}
              </h2>
              <p className="text-xs text-[var(--gray)] mt-1 font-mono">
                {de
                  ? "Gesamtübersicht aller 10 Kernfächer mit direktem Einstieg in die Fachspezifische Detailebene."
                  : "全量 10 大会考学科完整矩阵看板，支持一键穿梭直达单科精细图谱。"}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {subjectPlacements.map((sub) => {
                return (
                  <div
                    key={sub.fach}
                    className="p-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink)] transition-all flex flex-col justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded text-[var(--ink)]">
                          {sub.fach}
                        </span>
                        <span className="font-mono text-xs font-bold text-[var(--ink)] tabular-nums">
                          {sub.mastered}/{sub.total} ({sub.percent}%)
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-bold text-[var(--ink)] mt-2">
                        {de ? sub.nameDE : sub.nameZH}
                      </h3>
                      <div className="w-full h-2 bg-[var(--line)] rounded-full overflow-hidden mt-3">
                        <div
                          className="h-full bg-[var(--ink)] transition-all duration-300"
                          style={{ width: `${sub.percent}%` }}
                        />
                      </div>
                    </div>

                    {/* 代表性核心支柱考点快捷试读 */}
                    <div className="space-y-1.5 pt-2 border-t border-[var(--line)] text-xs">
                      <div className="font-mono text-[10px] text-[var(--gray)]">
                        {de ? "Kern-Schwerpunkte:" : "核心支柱考点:"}
                      </div>
                      <div className="space-y-1">
                        {sub.anchorNodes.map((n) => {
                          const isM = masteredIds.has(n.id);
                          const loc = resolveNodeLanguage(n, nodeLangMode, lang);
                          return (
                            <div
                              key={n.id}
                              onClick={() => onSelectNode(n)}
                              className="p-1 rounded hover:bg-[var(--paper-subtle)] cursor-pointer flex items-center justify-between font-serif text-[11px]"
                            >
                              <span className="truncate max-w-[180px] text-[var(--ink)]">
                                · {loc.primaryTitle}
                              </span>
                              <span className="font-mono text-[9px] text-[var(--gray)]">
                                {isM ? "✓" : `AFB ${n.level}`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectSubject(sub.fach)}
                      className="w-full h-8 rounded-[var(--radius)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--paper-subtle)] font-mono text-xs font-bold text-[var(--ink)] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                      data-testid={`jump-to-fach-${sub.fach}`}
                    >
                      <span>{de ? `In ${sub.nameDE} eintauchen` : `深入【${sub.nameZH}】精细图谱`}</span>
                      <span>➔</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
