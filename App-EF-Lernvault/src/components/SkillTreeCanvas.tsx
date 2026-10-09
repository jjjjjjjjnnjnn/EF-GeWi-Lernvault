import { useState, useMemo, useCallback, useRef } from "react";
import type { Lang } from "../i18n";
import {
  graphRegistry,
  computeGraphUnlockStates,
  calculateSubjectProgress,
  insertKnowledgeNode,
  removeKnowledgeNode,
  updateKnowledgeNode,
  addNodeTag,
  removeNodeTag,
  attachExternalResource,
  computePlanetaryRadialLayout,
  type SubjectKey,
  type KnowledgeNode,
  type SubjectKnowledgeGraph,
  type SkillNodeStatus,
  type CognitiveLevel,
  type LearningStage,
  type CurriculumTier,
  type ExternalResourceSlot,
} from "../engine/skillTree";

export interface SkillTreeCanvasProps {
  readonly lang?: Lang;
  readonly initialFach?: SubjectKey;
  readonly onSubjectChange?: (fach: SubjectKey) => void;
  readonly onStartCourse?: (reiseId: string) => void;
  readonly onOpenNote?: (noteId: string) => void;
  readonly onOpenTool?: (toolId: string) => void;
  readonly className?: string;
}

// 阶梯树/科技树模式常量 (Laned Tech Tree: 5 纵深阶段 x 领域分类横向泳道)
const TREE_BOX_WIDTH = 210;
const TREE_BOX_HEIGHT = 80;
const LANE_HEADER_WIDTH = 190;
const TECH_COL_WIDTH = 270;
const TIER_COLUMNS: readonly CurriculumTier[] = ["Sek_I", "EF", "Q1", "Q2", "Uni_Prep"];
const TIER_LABELS: Record<CurriculumTier, { de: string; zh: string }> = {
  Sek_I: { de: "SEK I · FUNDAMENT", zh: "SEK I · 基础认知 (AFB I)" },
  EF: { de: "EF · KERNMODELLE", zh: "EF · 核心奠基 (AFB II)" },
  Q1: { de: "Q1 · VERTIEFUNG", zh: "Q1 · 进阶机制 (AFB II)" },
  Q2: { de: "Q2 · SYNTHESE", zh: "Q2 · 会考综合 (AFB III)" },
  Uni_Prep: { de: "UNI · DISKURS", zh: "UNI · 先修拓展 (AFB III)" },
};

function getNodeTierIndex(node: KnowledgeNode): number {
  const t = (node.curriculumTier || "").toLowerCase().replace(/[\s_-]/g, "");
  if (t.includes("seki") || t.includes("sek1")) return 0;
  if (t.includes("ef")) return 1;
  if (t.includes("q1")) return 2;
  if (t.includes("q2")) return 3;
  if (t.includes("uni")) return 4;
  switch (node.stage) {
    case "einfuehrung": return 0;
    case "grundlagen": return 1;
    case "vertiefung": return 2;
    case "synthese": return 3;
    case "klausur_praxis": return 4;
    default: {
      const lvl = node.level ?? 2;
      return Math.min(4, Math.max(0, lvl === 1 ? 0 : lvl === 2 ? 1 : 3));
    }
  }
}

// 行星引力图模式常量
const PLANETARY_CENTER_X = 580;
const PLANETARY_CENTER_Y = 520;
const ORBIT_RADII = [180, 310, 440, 570, 700] as const;
const ORBIT_LABELS = [
  "ORBIT I · SEK I · FUNDAMENTAL (AFB I)",
  "ORBIT II · EF · KERNMODELLE (AFB II)",
  "ORBIT III · Q1 · VERTIEFUNG (AFB II)",
  "ORBIT IV · Q2 · ABITUR-SYNTHESE (AFB III)",
  "ORBIT V · UNI-PREP · DISKURS (AFB III)",
] as const;

// Tufte 纯黑白手绘 16x16 细线 SVG 图标契约
const iconProps = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

export function SkillTreeCanvas({
  lang = "zh",
  initialFach = "SoWi",
  onSubjectChange,
  onStartCourse,
  onOpenNote,
  onOpenTool,
  className = "",
}: SkillTreeCanvasProps) {
  const de = lang === "de";

  // 1. 学科与视图模式状态
  const [selectedFach, setSelectedFach] = useState<SubjectKey>(initialFach);
  const [activeGraph, setActiveGraph] = useState<SubjectKnowledgeGraph>(() => {
    return graphRegistry.get(initialFach) ?? graphRegistry.getAll()[0];
  });
  const [viewMode, setViewMode] = useState<"planetary" | "tree">("planetary");

  // 2. 筛选与检索过滤状态
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedTag, setSelectedTag] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // 3. 掌握状态集合 (本地持久化演示)
  const [masteredIds, setMasteredIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(`skill_tree_mastered_${initialFach}`);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  // 4. 选中知识点 (右侧研习抽屉展开)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // 4.1 用户自定义移动节点坐标记录 (nodeId -> { x, y })
  const [customNodePositions, setCustomNodePositions] = useState<Map<string, { x: number; y: number }>>(() => new Map());

  // 4.2 学科顶栏分页状态
  const [subjectPage, setSubjectPage] = useState<number>(() => {
    const allSubs = graphRegistry.listSubjects();
    const sIndex = allSubs.findIndex((s) => s.fach.toLowerCase() === (initialFach || "sowi").toLowerCase());
    return sIndex >= 0 ? Math.floor(sIndex / 5) : 0;
  });

  // 4.3 鼠标悬停聚焦节点 ID (用于因果链聚焦与全局压暗降噪)
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);

  // 5. 画布平移缩放视口
  const [zoom, setZoom] = useState<number>(0.95);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 20, y: 10 });
  const isDraggingRef = useRef<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // 6. 弹窗状态
  const [isNodeModalOpen, setIsNodeModalOpen] = useState<boolean>(false);
  const [nodeModalMode, setNodeModalMode] = useState<"add" | "edit">("add");
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState<boolean>(false);
  const [isJsonModalOpen, setIsJsonModalOpen] = useState<boolean>(false);
  const [isAttachResourceOpen, setIsAttachResourceOpen] = useState<boolean>(false);

  // 7. 表单状态：拼插/编辑知识点
  const [formNodeId, setFormNodeId] = useState<string>("");
  const [formTitleZH, setFormTitleZH] = useState<string>("");
  const [formTitleDE, setFormTitleDE] = useState<string>("");
  const [formCategory, setFormCategory] = useState<string>("");
  const [formCurriculumTier, setFormCurriculumTier] = useState<CurriculumTier>("EF");
  const [formStage, setFormStage] = useState<LearningStage>("grundlagen");
  const [formLevel, setFormLevel] = useState<CognitiveLevel>(2);
  const [formPrereqId, setFormPrereqId] = useState<string>("");
  const [formKeyFormula, setFormKeyFormula] = useState<string>("");
  const [formCommonFallacy, setFormCommonFallacy] = useState<string>("");
  const [formTagsStr, setFormTagsStr] = useState<string>("");

  // 8. 抽屉内快捷添加标签输入
  const [inlineNewTag, setInlineNewTag] = useState<string>("");

  // 9. JSON 导入导出弹窗状态
  const [jsonText, setJsonText] = useState<string>("");
  const [jsonFeedback, setJsonFeedback] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // 10. 表单状态：新增学科
  const [newSubjectId, setNewSubjectId] = useState<string>("");
  const [newSubjectNameDE, setNewSubjectNameDE] = useState<string>("");
  const [newSubjectNameZH, setNewSubjectNameZH] = useState<string>("");

  // 11. 表单状态：挂载外部资源
  const [resTitle, setResTitle] = useState<string>("");
  const [resUrl, setResUrl] = useState<string>("");
  const [resSummary, setResSummary] = useState<string>("");

  // 切换学科
  const handleSelectFach = useCallback(
    (fach: SubjectKey) => {
      setSelectedFach(fach);
      onSubjectChange?.(fach);
      setSelectedNodeId(null);
      setSelectedCategory("ALL");
      setSelectedTag("ALL");
      setCustomNodePositions(new Map());
      const allSubs = graphRegistry.listSubjects();
      const sIndex = allSubs.findIndex((s) => s.fach.toLowerCase() === fach.toLowerCase());
      if (sIndex >= 0) {
        setSubjectPage(Math.floor(sIndex / 5));
      }
      const graph = graphRegistry.get(fach);
      if (graph) {
        setActiveGraph(graph);
      }
      try {
        const saved = localStorage.getItem(`skill_tree_mastered_${fach}`);
        setMasteredIds(saved ? new Set(JSON.parse(saved)) : new Set<string>());
      } catch {
        setMasteredIds(new Set<string>());
      }
    },
    [onSubjectChange]
  );

  // 切换掌握状态
  const toggleMastered = useCallback(
    (nodeId: string) => {
      setMasteredIds((prev) => {
        const next = new Set(prev);
        if (next.has(nodeId)) {
          next.delete(nodeId);
        } else {
          next.add(nodeId);
        }
        try {
          localStorage.setItem(
            `skill_tree_mastered_${selectedFach}`,
            JSON.stringify(Array.from(next))
          );
        } catch {
          // 忽略存储失败
        }
        return next;
      });
    },
    [selectedFach]
  );

  // 计算实时全图状态
  const unlockStates = useMemo(() => {
    return computeGraphUnlockStates(activeGraph, masteredIds);
  }, [activeGraph, masteredIds]);

  // 计算学科宏观进度
  const progressSummary = useMemo(() => {
    return calculateSubjectProgress(activeGraph, masteredIds);
  }, [activeGraph, masteredIds]);

  // 提取学科包含的所有分类与标签
  const categoriesList = useMemo(() => {
    const set = new Set<string>();
    for (const n of activeGraph.nodes) {
      if (n.category) set.add(n.category);
    }
    return Array.from(set);
  }, [activeGraph.nodes]);

  const tagsList = useMemo(() => {
    const set = new Set<string>();
    for (const n of activeGraph.nodes) {
      if (n.tags) {
        n.tags.forEach((t) => set.add(t));
      }
    }
    return Array.from(set);
  }, [activeGraph.nodes]);

  // 计算行星引力坐标与扇区分区
  const planetaryGraph = useMemo(() => {
    return computePlanetaryRadialLayout(activeGraph, {
      center: { x: PLANETARY_CENTER_X, y: PLANETARY_CENTER_Y },
    });
  }, [activeGraph]);

  // 根据当前视图模式计算渲染节点
  const layoutedNodes = useMemo(() => {
    if (viewMode === "planetary") {
      const baseNodes = planetaryGraph.nodes.map((n) => ({
        ...n,
        x: n.coordinates?.x ?? PLANETARY_CENTER_X,
        y: n.coordinates?.y ?? PLANETARY_CENTER_Y,
      }));
      return baseNodes.map((n) => {
        const custom = customNodePositions.get(n.id);
        if (custom) {
          return { ...n, x: custom.x, y: custom.y };
        }
        return n;
      });
    }

    // 阶梯树/科技树网格模式 (Laned Tech Tree: 5 纵深阶段 x 领域分类横向泳道)
    const lanes = categoriesList.length > 0 ? categoriesList : ["Allgemein"];
    const laneNodeMap = new Map<string, KnowledgeNode[]>();
    for (const lane of lanes) {
      laneNodeMap.set(lane, []);
    }
    for (const node of activeGraph.nodes) {
      const cat = node.category && laneNodeMap.has(node.category) ? node.category : lanes[0];
      laneNodeMap.get(cat)!.push(node);
    }

    const result: (KnowledgeNode & { x: number; y: number })[] = [];
    let currentLaneY = 80;

    for (const lane of lanes) {
      const nodesInLane = laneNodeMap.get(lane) || [];
      const colBuckets: KnowledgeNode[][] = [[], [], [], [], []];
      for (const node of nodesInLane) {
        const colIdx = getNodeTierIndex(node);
        colBuckets[colIdx].push(node);
      }

      for (let c = 0; c < 5; c++) {
        colBuckets[c].sort((a, b) => a.level - b.level || a.id.localeCompare(b.id));
      }

      const maxInCol = Math.max(1, ...colBuckets.map((b) => b.length));
      const laneH = maxInCol * 96 + 32;

      for (let c = 0; c < 5; c++) {
        colBuckets[c].forEach((node, subRow) => {
          const x = LANE_HEADER_WIDTH + 24 + c * TECH_COL_WIDTH;
          const y = currentLaneY + 20 + subRow * 96;
          result.push({ ...node, x, y });
        });
      }

      currentLaneY += laneH + 20;
    }

    return result.map((n) => {
      const custom = customNodePositions.get(n.id);
      if (custom) {
        return { ...n, x: custom.x, y: custom.y };
      }
      return n;
    });
  }, [viewMode, activeGraph, planetaryGraph, customNodePositions, categoriesList]);

  // 科技树模式横向泳道背景与标牌元数据
  const lanesMeta = useMemo(() => {
    if (viewMode !== "tree") return [];
    const lanes = categoriesList.length > 0 ? categoriesList : ["Allgemein"];
    const laneNodeMap = new Map<string, KnowledgeNode[]>();
    for (const lane of lanes) {
      laneNodeMap.set(lane, []);
    }
    for (const node of activeGraph.nodes) {
      const cat = node.category && laneNodeMap.has(node.category) ? node.category : lanes[0];
      laneNodeMap.get(cat)!.push(node);
    }

    let currentLaneY = 80;
    const metaList: Array<{
      name: string;
      y: number;
      height: number;
      totalCount: number;
      masteredCount: number;
    }> = [];

    for (const lane of lanes) {
      const nodesInLane = laneNodeMap.get(lane) || [];
      const colBuckets: KnowledgeNode[][] = [[], [], [], [], []];
      for (const node of nodesInLane) {
        const colIdx = getNodeTierIndex(node);
        colBuckets[colIdx].push(node);
      }
      const maxInCol = Math.max(1, ...colBuckets.map((b) => b.length));
      const laneH = maxInCol * 96 + 32;
      const masteredCount = nodesInLane.filter((n) => masteredIds.has(n.id)).length;

      metaList.push({
        name: lane,
        y: currentLaneY,
        height: laneH,
        totalCount: nodesInLane.length,
        masteredCount,
      });

      currentLaneY += laneH + 20;
    }

    return metaList;
  }, [viewMode, categoriesList, activeGraph.nodes, masteredIds]);

  const nodeMap = useMemo(() => {
    return new Map(layoutedNodes.map((n) => [n.id, n]));
  }, [layoutedNodes]);

  // 判定节点是否满足当前筛选高亮条件
  const isNodeMatchingFilter = useCallback(
    (node: KnowledgeNode): boolean => {
      if (selectedCategory !== "ALL" && node.category !== selectedCategory) {
        return false;
      }
      if (selectedTag !== "ALL" && (!node.tags || !node.tags.includes(selectedTag))) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const inZh = node.titleZH.toLowerCase().includes(q);
        const inDe = node.titleDE.toLowerCase().includes(q);
        const inFormula = node.keyFormulaOrSentence?.toLowerCase().includes(q) ?? false;
        const inFallacy = node.commonFallacy?.toLowerCase().includes(q) ?? false;
        const inTags = node.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        if (!inZh && !inDe && !inFormula && !inFallacy && !inTags) {
          return false;
        }
      }
      return true;
    },
    [selectedCategory, selectedTag, searchQuery]
  );

  const focalNodeId = hoveredNodeId || selectedNodeId;

  // 因果链拓扑分析：递归计算焦点节点的直接/间接前置、后续解锁节点、距离衰减梯度与关联边
  const causalAnalysis = useMemo(() => {
    if (!focalNodeId) return null;
    const directPrereqs = new Set<string>();
    const allPrereqs = new Set<string>();
    const directSuccessors = new Set<string>();
    const allSuccessors = new Set<string>();
    const causalEdgeIds = new Set<string>();

    const incomingEdges = new Map<string, Array<{ from: string; edgeId: string }>>();
    const outgoingEdges = new Map<string, Array<{ to: string; edgeId: string }>>();

    for (const edge of activeGraph.edges) {
      if (!incomingEdges.has(edge.to)) incomingEdges.set(edge.to, []);
      incomingEdges.get(edge.to)!.push({ from: edge.from, edgeId: edge.id });

      if (!outgoingEdges.has(edge.from)) outgoingEdges.set(edge.from, []);
      outgoingEdges.get(edge.from)!.push({ to: edge.to, edgeId: edge.id });
    }

    const nodeDistances = new Map<string, number>();
    const edgeDistances = new Map<string, number>();
    nodeDistances.set(focalNodeId, 0);

    // 向上递归探索前置依赖并记录拓扑距离 (Ancestors / Prerequisites)
    const upQueue: Array<{ id: string; dist: number }> = [{ id: focalNodeId, dist: 0 }];
    while (upQueue.length > 0) {
      const { id: curr, dist } = upQueue.shift()!;
      const inEdges = incomingEdges.get(curr) || [];
      for (const e of inEdges) {
        causalEdgeIds.add(e.edgeId);
        const prevEdgeDist = edgeDistances.get(e.edgeId);
        if (prevEdgeDist === undefined || dist + 1 < prevEdgeDist) {
          edgeDistances.set(e.edgeId, dist + 1);
        }
        if (curr === focalNodeId) {
          directPrereqs.add(e.from);
        }
        if (e.from !== focalNodeId) {
          allPrereqs.add(e.from);
          const existingDist = nodeDistances.get(e.from);
          if (existingDist === undefined || dist + 1 < existingDist) {
            nodeDistances.set(e.from, dist + 1);
            upQueue.push({ id: e.from, dist: dist + 1 });
          }
        }
      }
    }

    // 向下递归探索后继解锁并记录拓扑距离 (Successors / Dependents)
    const downQueue: Array<{ id: string; dist: number }> = [{ id: focalNodeId, dist: 0 }];
    while (downQueue.length > 0) {
      const { id: curr, dist } = downQueue.shift()!;
      const outEdges = outgoingEdges.get(curr) || [];
      for (const e of outEdges) {
        causalEdgeIds.add(e.edgeId);
        const prevEdgeDist = edgeDistances.get(e.edgeId);
        if (prevEdgeDist === undefined || dist + 1 < prevEdgeDist) {
          edgeDistances.set(e.edgeId, dist + 1);
        }
        if (curr === focalNodeId) {
          directSuccessors.add(e.to);
        }
        if (e.to !== focalNodeId) {
          allSuccessors.add(e.to);
          const existingDist = nodeDistances.get(e.to);
          if (existingDist === undefined || dist + 1 < existingDist) {
            nodeDistances.set(e.to, dist + 1);
            downQueue.push({ id: e.to, dist: dist + 1 });
          }
        }
      }
    }

    const allConnectedNodeIds = new Set<string>([
      focalNodeId,
      ...allPrereqs,
      ...allSuccessors,
    ]);

    // 统计当前因果链跨越的星区分区 (用于扇区空间高亮与宏观定位)
    const activeCategories = new Set<string>();
    for (const id of allConnectedNodeIds) {
      const n = nodeMap.get(id);
      if (n?.category) activeCategories.add(n.category);
    }

    // 构建线性学习推进清单步骤流 (Causal Progression Sequence)
    const prereqList = Array.from(allPrereqs)
      .map((id) => ({ id, node: nodeMap.get(id), dist: nodeDistances.get(id) ?? 1, role: "prereq" as const }))
      .sort((a, b) => b.dist - a.dist);

    const focalEntry = {
      id: focalNodeId,
      node: nodeMap.get(focalNodeId),
      dist: 0,
      role: "focal" as const,
    };

    const successorList = Array.from(allSuccessors)
      .map((id) => ({ id, node: nodeMap.get(id), dist: nodeDistances.get(id) ?? 1, role: "successor" as const }))
      .sort((a, b) => a.dist - b.dist);

    const progressionSteps = [...prereqList, focalEntry, ...successorList];

    return {
      focalNodeId,
      directPrereqs,
      allPrereqs,
      directSuccessors,
      allSuccessors,
      causalEdgeIds,
      allConnectedNodeIds,
      nodeDistances,
      edgeDistances,
      activeCategories,
      progressionSteps,
    };
  }, [focalNodeId, activeGraph.edges, nodeMap]);

  // 连线平滑路径计算 (行星模式 vs 树模式)
  const renderedEdges = useMemo(() => {
    return activeGraph.edges.map((edge) => {
      const fromNode = nodeMap.get(edge.from);
      const toNode = nodeMap.get(edge.to);
      if (!fromNode || !toNode) return null;

      const fromMastered = masteredIds.has(edge.from);
      const toUnlocked = unlockStates.get(edge.to) !== "locked";
      const isPathActive = fromMastered && toUnlocked;

      let pathData = "";
      if (viewMode === "planetary") {
        // 行星引力曲线：三次贝塞尔自中心向外平滑弧线
        const x1 = fromNode.x;
        const y1 = fromNode.y;
        const x2 = toNode.x;
        const y2 = toNode.y;

        // 弧度控制点
        const mx = (x1 + x2) / 2;
        const my = (y1 + y2) / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const normalX = -dy * 0.15;
        const normalY = dx * 0.15;

        pathData = `M ${x1} ${y1} Q ${mx + normalX} ${my + normalY}, ${x2} ${y2}`;
      } else {
        // 科技树模式：平滑横向贝塞尔曲线从左前置到右后继
        const x1 = fromNode.x + TREE_BOX_WIDTH;
        const y1 = fromNode.y + TREE_BOX_HEIGHT / 2;
        const x2 = toNode.x;
        const y2 = toNode.y + TREE_BOX_HEIGHT / 2;

        const dx = Math.max(32, Math.abs(x2 - x1) * 0.45);
        pathData = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
      }

      // 因果链悬停聚焦与降噪规则 (距离越远颜色越淡渐变衰减)
      const isCausalFocus = causalAnalysis !== null;
      const isEdgeInCausalChain = isCausalFocus && causalAnalysis.causalEdgeIds.has(edge.id);

      let strokeColor = "var(--line)";
      let strokeWidth = 1.0;
      let opacity = 0.16;
      let strokeDash = edge.type === "synergy" ? "3 3" : "none";
      let markerEnd = undefined;

      if (isCausalFocus) {
        if (isEdgeInCausalChain) {
          const dist = causalAnalysis.edgeDistances.get(edge.id) ?? 1;
          strokeColor = "var(--ink)";
          if (dist === 1) {
            strokeWidth = 2.4;
            opacity = 1.0;
          } else if (dist === 2) {
            strokeWidth = 1.6;
            opacity = 0.72;
          } else {
            strokeWidth = 1.1;
            opacity = 0.48;
          }
          strokeDash = "none";
          markerEnd = "url(#grav-arrow-active)";
        } else {
          // 非焦点链路保留微弱发丝（0.05），避免完全隐形产生断层感
          strokeColor = "var(--line)";
          strokeWidth = 0.6;
          opacity = 0.05;
          strokeDash = "none";
        }
      } else {
        // 默认状态：轻柔细微发丝线，杜绝蜘蛛网干扰
        if (isPathActive) {
          strokeColor = "var(--ink)";
          strokeWidth = 1.3;
          opacity = 0.28;
          markerEnd = "url(#grav-arrow-active)";
        } else {
          strokeColor = "var(--line)";
          strokeWidth = 0.8;
          opacity = 0.12;
          strokeDash = edge.type === "synergy" ? "3 3" : "4 4";
          markerEnd = "url(#grav-arrow-muted)";
        }
      }

      return {
        id: edge.id,
        pathData,
        isPathActive,
        type: edge.type,
        strokeColor,
        strokeWidth,
        opacity,
        strokeDash,
        markerEnd,
      };
    }).filter(Boolean) as {
      id: string;
      pathData: string;
      isPathActive: boolean;
      type: string;
      strokeColor: string;
      strokeWidth: number;
      opacity: number;
      strokeDash: string;
      markerEnd?: string;
    }[];
  }, [activeGraph.edges, nodeMap, masteredIds, unlockStates, viewMode, causalAnalysis]);

  // 节点拖拽引用
  const draggingNodeRef = useRef<{
    nodeId: string;
    pointerId: number;
    startX: number;
    startY: number;
    origX: number;
    origY: number;
    hasMoved: boolean;
  } | null>(null);

  // 记录最近一次是否为移动拖拽，避免拖拽抬起时误触发 onClick 展开抽屉
  const justDraggedRef = useRef<boolean>(false);

  const handleNodePointerDown = (
    e: React.PointerEvent<SVGGElement>,
    node: KnowledgeNode & { x: number; y: number }
  ) => {
    e.stopPropagation();
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // 兼容不支持 setPointerCapture 的测试环境
    }
    draggingNodeRef.current = {
      nodeId: node.id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      origX: node.x,
      origY: node.y,
      hasMoved: false,
    };
  };

  const handleNodePointerMove = (e: React.PointerEvent<SVGGElement>) => {
    if (!draggingNodeRef.current) return;
    const { nodeId, startX, startY, origX, origY, hasMoved } = draggingNodeRef.current;
    const dx = (e.clientX - startX) / zoom;
    const dy = (e.clientY - startY) / zoom;
    if (!hasMoved && Math.hypot(dx, dy) > 3) {
      draggingNodeRef.current.hasMoved = true;
    }
    if (draggingNodeRef.current.hasMoved) {
      setCustomNodePositions((prev) => {
        const next = new Map(prev);
        next.set(nodeId, {
          x: Math.round(origX + dx),
          y: Math.round(origY + dy),
        });
        return next;
      });
    }
  };

  const handleNodePointerUp = (
    e: React.PointerEvent<SVGGElement>,
    nodeId: string
  ) => {
    if (!draggingNodeRef.current) return;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // 忽略
    }
    const wasMoved = draggingNodeRef.current.hasMoved;
    draggingNodeRef.current = null;
    if (wasMoved) {
      justDraggedRef.current = true;
    } else {
      justDraggedRef.current = false;
      setSelectedNodeId(nodeId);
    }
  };

  // 画布多指触摸点映射
  const activeTouchPointsRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchStartRef = useRef<{ dist: number; zoom: number } | null>(null);

  // 画布视口平移拖拽与多点触摸手势
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if ((e.target as HTMLElement).closest("[data-clickable-node]")) return;
    activeTouchPointsRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    // 触控双指手势初始化
    if (activeTouchPointsRef.current.size === 2) {
      isDraggingRef.current = false;
      const pts = Array.from(activeTouchPointsRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      pinchStartRef.current = { dist, zoom };
      return;
    }

    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (activeTouchPointsRef.current.has(e.pointerId)) {
      activeTouchPointsRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    }

    // 双指手势缩放
    if (activeTouchPointsRef.current.size === 2 && pinchStartRef.current) {
      const pts = Array.from(activeTouchPointsRef.current.values());
      const newDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const scale = newDist / Math.max(1, pinchStartRef.current.dist);
      const nextZoom = Math.max(0.25, Math.min(3.0, +(pinchStartRef.current.zoom * scale).toFixed(3)));
      setZoom(nextZoom);
      return;
    }

    // 如果正在拖拽知识节点，优先驱动节点移动（防止鼠标移出节点过快）
    if (draggingNodeRef.current) {
      const { nodeId, startX, startY, origX, origY, hasMoved } = draggingNodeRef.current;
      const dx = (e.clientX - startX) / zoom;
      const dy = (e.clientY - startY) / zoom;
      if (!hasMoved && Math.hypot(dx, dy) > 3) {
        draggingNodeRef.current.hasMoved = true;
      }
      if (draggingNodeRef.current.hasMoved) {
        setCustomNodePositions((prev) => {
          const next = new Map(prev);
          next.set(nodeId, {
            x: Math.round(origX + dx),
            y: Math.round(origY + dy),
          });
          return next;
        });
      }
      return;
    }

    // 底板平移
    if (!isDraggingRef.current) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<SVGSVGElement>) => {
    activeTouchPointsRef.current.delete(e.pointerId);
    if (activeTouchPointsRef.current.size < 2) {
      pinchStartRef.current = null;
    }
    isDraggingRef.current = false;
    if (draggingNodeRef.current) {
      if (draggingNodeRef.current.hasMoved) {
        justDraggedRef.current = true;
      }
      draggingNodeRef.current = null;
    }
  };

  // 鼠标滚轮平滑焦点缩放
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const factor = e.deltaY < 0 ? 1.08 : 0.92;
    const nextZoom = Math.max(0.25, Math.min(3.0, +(zoom * factor).toFixed(3)));

    const worldX = (mouseX - pan.x) / zoom;
    const worldY = (mouseY - pan.y) / zoom;

    const newPanX = Math.round(mouseX - worldX * nextZoom);
    const newPanY = Math.round(mouseY - worldY * nextZoom);

    setZoom(nextZoom);
    setPan({ x: newPanX, y: newPanY });
  };

  // 一键重新引力排布 (同时复位用户自定义位置)
  const handleAutoPlanetaryLayout = () => {
    setCustomNodePositions(new Map());
    const updated = computePlanetaryRadialLayout(activeGraph, {
      center: { x: PLANETARY_CENTER_X, y: PLANETARY_CENTER_Y },
    });
    graphRegistry.register(updated);
    setActiveGraph(updated);
    setPan({ x: 20, y: 10 });
    setZoom(0.95);
  };

  // 打开拼插或编辑节点弹窗
  const openAddNodeModal = () => {
    setNodeModalMode("add");
    setFormNodeId("");
    setFormTitleZH("");
    setFormTitleDE("");
    setFormCategory(categoriesList[0] || "Grundlagen");
    setFormCurriculumTier("EF");
    setFormStage("grundlagen");
    setFormLevel(2);
    setFormPrereqId("");
    setFormKeyFormula("");
    setFormCommonFallacy("");
    setFormTagsStr("");
    setIsNodeModalOpen(true);
  };

  const openEditNodeModal = (node: KnowledgeNode) => {
    setNodeModalMode("edit");
    setFormNodeId(node.id);
    setFormTitleZH(node.titleZH);
    setFormTitleDE(node.titleDE);
    setFormCategory(node.category || "");
    setFormCurriculumTier((node.curriculumTier as CurriculumTier) || "EF");
    setFormStage(node.stage);
    setFormLevel(node.level);
    setFormPrereqId(node.prerequisites[0] || "");
    setFormKeyFormula(node.keyFormulaOrSentence || "");
    setFormCommonFallacy(node.commonFallacy || "");
    setFormTagsStr((node.tags || []).join(", "));
    setIsNodeModalOpen(true);
  };

  // 提交拼插或编辑节点
  const handleSaveNodeSubmit = () => {
    if (!formTitleZH.trim() || !formTitleDE.trim()) return;

    const parsedTags = formTagsStr
      .split(/[,，\s]+/)
      .map((t) => t.trim())
      .filter(Boolean);

    if (nodeModalMode === "add") {
      const cleanId = `${selectedFach.toLowerCase()}-${Date.now().toString(36)}`;
      const prereqs = formPrereqId ? [formPrereqId] : [];

      const nodeToAdd: KnowledgeNode = {
        id: cleanId,
        fach: selectedFach,
        titleDE: formTitleDE.trim(),
        titleZH: formTitleZH.trim(),
        summaryDE: "Benutzerdefinierter Wissensbaustein",
        summaryZH: "用户自定义拼插知识点",
        category: formCategory.trim() || "Allgemein",
        curriculumTier: formCurriculumTier,
        stage: formStage,
        level: formLevel,
        xpReward: 80,
        estimatedMinutes: 10,
        prerequisites: prereqs,
        keyFormulaOrSentence: formKeyFormula.trim() || undefined,
        commonFallacy: formCommonFallacy.trim() || undefined,
        tags: parsedTags,
        isCustom: true,
      };

      let updated = insertKnowledgeNode(activeGraph, nodeToAdd);
      updated = computePlanetaryRadialLayout(updated, {
        center: { x: PLANETARY_CENTER_X, y: PLANETARY_CENTER_Y },
      });
      graphRegistry.register(updated);
      setActiveGraph(updated);
    } else {
      let updated = updateKnowledgeNode(activeGraph, formNodeId, {
        titleZH: formTitleZH.trim(),
        titleDE: formTitleDE.trim(),
        category: formCategory.trim() || "Allgemein",
        curriculumTier: formCurriculumTier,
        stage: formStage,
        level: formLevel,
        prerequisites: formPrereqId ? [formPrereqId] : [],
        keyFormulaOrSentence: formKeyFormula.trim() || undefined,
        commonFallacy: formCommonFallacy.trim() || undefined,
        tags: parsedTags,
      });
      updated = computePlanetaryRadialLayout(updated, {
        center: { x: PLANETARY_CENTER_X, y: PLANETARY_CENTER_Y },
      });
      graphRegistry.register(updated);
      setActiveGraph(updated);
    }

    setIsNodeModalOpen(false);
  };

  // 删除当前选中的知识点
  const handleDeleteSelectedNode = () => {
    if (!selectedNodeId) return;
    const updated = removeKnowledgeNode(activeGraph, selectedNodeId);
    graphRegistry.register(updated);
    setActiveGraph(updated);
    setSelectedNodeId(null);
  };

  // 抽屉内为节点动态增删标签
  const handleAddInlineTag = () => {
    if (!selectedNodeId || !inlineNewTag.trim()) return;
    const updated = addNodeTag(activeGraph, selectedNodeId, inlineNewTag.trim());
    graphRegistry.register(updated);
    setActiveGraph(updated);
    setInlineNewTag("");
  };

  const handleRemoveInlineTag = (tagToRemove: string) => {
    if (!selectedNodeId) return;
    const updated = removeNodeTag(activeGraph, selectedNodeId, tagToRemove);
    graphRegistry.register(updated);
    setActiveGraph(updated);
  };

  // 新增学科板块提交
  const handleAddSubjectSubmit = () => {
    if (!newSubjectId.trim() || !newSubjectNameZH.trim()) return;
    const cleanId = newSubjectId.trim();
    graphRegistry.createCustomSubject(
      cleanId,
      newSubjectNameDE.trim() || cleanId,
      newSubjectNameZH.trim()
    );
    handleSelectFach(cleanId);
    setIsAddSubjectOpen(false);
    setNewSubjectId("");
    setNewSubjectNameDE("");
    setNewSubjectNameZH("");
  };

  // 挂载外部资源提交
  const handleAttachResourceSubmit = () => {
    if (!selectedNodeId || !resTitle.trim()) return;
    const newRes: ExternalResourceSlot = {
      id: `ext-${Date.now().toString(36)}`,
      type: "web_page",
      title: resTitle.trim(),
      urlOrPath: resUrl.trim() || undefined,
      summaryZH: resSummary.trim() || undefined,
      addedAt: new Date().toISOString(),
    };
    const updated = attachExternalResource(activeGraph, selectedNodeId, newRes);
    graphRegistry.register(updated);
    setActiveGraph(updated);
    setIsAttachResourceOpen(false);
    setResTitle("");
    setResUrl("");
    setResSummary("");
  };

  // 打开 JSON 导入导出弹窗
  const openJsonModal = () => {
    setJsonText(graphRegistry.exportGraphJSON(selectedFach));
    setJsonFeedback(null);
    setIsJsonModalOpen(true);
  };

  // 执行 JSON 校验并导入
  const handleImportJson = () => {
    if (!jsonText.trim()) return;
    const res = graphRegistry.importGraphJSON(jsonText);
    if (!res.success || !res.graph) {
      setJsonFeedback({
        type: "error",
        text: res.error || "导入校验失败，请检查 JSON 格式与依赖关系。",
      });
      return;
    }
    setActiveGraph(res.graph);
    setSelectedFach(res.graph.fach);
    setJsonFeedback({
      type: "success",
      text: `成功导入学科【${res.graph.nameZH}】，包含 ${res.graph.nodes.length} 个知识点并已完成引力排布！`,
    });
  };

  const activeNode = selectedNodeId ? nodeMap.get(selectedNodeId) : null;
  const activeNodeStatus = selectedNodeId ? unlockStates.get(selectedNodeId) : "locked";

  return (
    <div
      className={`relative flex flex-col w-full h-full bg-[var(--surface)] text-[var(--ink)] overflow-hidden ${className}`}
      data-testid="skill-tree-canvas-container"
    >
      {/* 顶部主控制栏：学科选择、翻页/总录展开、进度、模式切换与操作 (强制单行不折行) */}
      <div className="relative flex items-center justify-between border-b border-[var(--line)] px-4 py-2 bg-[var(--surface)] shrink-0 gap-3 z-30 overflow-x-auto no-scrollbar flex-nowrap">
        <div className="flex items-center gap-2 shrink-0 flex-nowrap">
          <span className="font-mono text-xs text-[var(--gray)] font-medium shrink-0">
            {de ? "Fach:" : "学科:"}
          </span>

          {/* 翻页与当前页单行学科按钮 */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setSubjectPage((p) => Math.max(0, p - 1))}
              disabled={subjectPage === 0}
              className="w-6 h-7 flex items-center justify-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-xs font-mono text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--paper-subtle)] cursor-pointer"
              title={de ? "Vorherige Fächer-Seite" : "上一页学科"}
            >
              ‹
            </button>

            <div className="flex items-center gap-1 flex-nowrap">
              {graphRegistry.listSubjects().slice(subjectPage * 5, (subjectPage + 1) * 5).map((sub) => {
                const isSelected = selectedFach.toLowerCase() === sub.fach.toLowerCase();
                return (
                  <button
                    key={sub.fach}
                    type="button"
                    onClick={() => handleSelectFach(sub.fach)}
                    aria-pressed={isSelected}
                    className={`h-7 px-2.5 rounded-[var(--radius)] text-xs font-mono font-medium whitespace-nowrap shrink-0 transition-all cursor-pointer flex items-center ${
                      isSelected
                        ? "bg-[var(--ink)] text-[var(--surface)] font-bold shadow-none"
                        : "bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                    }`}
                  >
                    {de ? sub.nameDE : sub.nameZH}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setSubjectPage((p) => Math.min(Math.ceil(graphRegistry.listSubjects().length / 5) - 1, p + 1))}
              disabled={subjectPage >= Math.ceil(graphRegistry.listSubjects().length / 5) - 1}
              className="w-6 h-7 flex items-center justify-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] text-xs font-mono text-[var(--ink)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--paper-subtle)] cursor-pointer"
              title={de ? "Nächste Fächer-Seite" : "下一页学科"}
            >
              ›
            </button>
            <span className="font-mono text-[10px] text-[var(--gray)] tabular-nums shrink-0 ml-0.5">
              {subjectPage + 1}/{Math.max(1, Math.ceil(graphRegistry.listSubjects().length / 5))}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsAddSubjectOpen(true)}
            className="flex items-center gap-1 h-7 px-2 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] transition-colors cursor-pointer whitespace-nowrap"
            title={de ? "Neues Fach anlegen" : "新增学科板块"}
          >
            <svg {...iconProps}>
              <path d="M8 3.5v9M3.5 8h9" />
            </svg>
            <span>{de ? "+ Fach" : "+ 学科"}</span>
          </button>
        </div>

        {/* 右侧：模式切换、进度与操作动作 (单行不折叠) */}
        <div className="flex items-center gap-2.5 text-xs font-mono shrink-0 flex-nowrap ml-auto">
          {/* 自定义拖拽复位按钮 (当有节点被移动时高亮呈现) */}
          {customNodePositions.size > 0 && (
            <button
              type="button"
              onClick={() => setCustomNodePositions(new Map())}
              className="flex items-center gap-1 h-7 px-2 rounded-[var(--radius)] bg-[var(--ink)] text-[var(--surface)] text-xs font-mono font-bold hover:opacity-90 transition-all cursor-pointer shadow-none whitespace-nowrap shrink-0"
              title={de ? `Positionen zurücksetzen (${customNodePositions.size})` : `复位所有已移动节点到默认位置 (${customNodePositions.size})`}
            >
              <svg {...iconProps} className="w-3.5 h-3.5">
                <path d="M2.5 8a5.5 5.5 0 1 0 1.6-3.9L2 6.5M2 2.5v4h4" />
              </svg>
              <span>{de ? `Reset (${customNodePositions.size})` : `复位 (${customNodePositions.size})`}</span>
            </button>
          )}

          {/* 视图模式切换：引力星系 vs 科技树网格 */}
          <div className="flex items-center border border-[var(--line)] rounded-[var(--radius)] overflow-hidden h-7">
            <button
              type="button"
              onClick={() => setViewMode("planetary")}
              aria-pressed={viewMode === "planetary"}
              className={`flex items-center gap-1.5 px-2.5 h-full text-xs cursor-pointer transition-colors ${
                viewMode === "planetary"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor">
                <circle cx="7" cy="7" r="5.5" strokeWidth="1.2" strokeDasharray="2 2" />
                <circle cx="7" cy="7" r="2" fill="currentColor" />
                <circle cx="11.5" cy="7" r="1.2" fill="currentColor" />
              </svg>
              <span>{de ? "Planeten-Orbit" : "行星引力星系"}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("tree")}
              aria-pressed={viewMode === "tree"}
              className={`flex items-center gap-1.5 px-2.5 h-full text-xs cursor-pointer transition-colors border-l border-[var(--line)] ${
                viewMode === "tree"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor">
                <path d="M2 3h4v8H2M6 7h6M12 4v6" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="2" cy="7" r="1" fill="currentColor" />
                <circle cx="12" cy="4" r="1" fill="currentColor" />
                <circle cx="12" cy="10" r="1" fill="currentColor" />
              </svg>
              <span>{de ? "Stufenbaum" : "认知阶梯树"}</span>
            </button>
          </div>

          {/* 宏观学习进度前置状态胶囊 */}
          <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] text-xs font-mono">
            <span className="font-bold tabular-nums text-[var(--ink)]">
              {progressSummary.masteredNodes}/{progressSummary.totalNodes} ({progressSummary.progressPercent}%)
            </span>
            <span className="text-[var(--gray)] text-[10px]">
              · {progressSummary.totalNodes - progressSummary.masteredNodes} {de ? "gesperrt" : "待攻坚"}
            </span>
            <div className="w-12 h-1.5 bg-[var(--line)] rounded-full overflow-hidden ml-0.5">
              <div
                className="h-full bg-[var(--ink)] transition-all duration-300"
                style={{ width: `${progressSummary.progressPercent}%` }}
              />
            </div>
          </div>

          {/* 操作按钮组 */}
          <div className="flex items-center gap-1.5 border-l border-[var(--line)] pl-3">
            <button
              type="button"
              onClick={openAddNodeModal}
              className="flex items-center gap-1 h-7 px-2.5 rounded-[var(--radius)] bg-[var(--ink)] text-[var(--surface)] text-xs font-mono hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
            >
              <svg {...iconProps}>
                <path d="M8 3.5v9M3.5 8h9" />
              </svg>
              <span>{de ? "Knoten anfügen" : "拼插知识点"}</span>
            </button>

            {viewMode === "planetary" && (
              <button
                type="button"
                onClick={handleAutoPlanetaryLayout}
                className="h-7 px-2 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] text-xs text-[var(--ink)] hover:bg-[var(--paper-subtle)] cursor-pointer whitespace-nowrap"
                title={de ? "Planeten automatisch anordnen" : "一键引力自动排布"}
              >
                {de ? "Auto-Layout" : "一键引力排布"}
              </button>
            )}

            <button
              type="button"
              onClick={openJsonModal}
              className="h-7 px-2 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] text-xs text-[var(--ink)] hover:bg-[var(--paper-subtle)] cursor-pointer"
              title={de ? "JSON Import / Export" : "导入或导出 JSON"}
            >
              JSON
            </button>

            {/* 缩放控制器 */}
            <div className="flex items-center border border-[var(--line)] rounded-[var(--radius)] overflow-hidden h-7">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(3.0, +(z + 0.15).toFixed(2)))}
                className="px-2 h-full text-xs hover:bg-[var(--paper-subtle)] border-r border-[var(--line)] cursor-pointer"
                title={de ? "Vergrößern" : "放大"}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.25, +(z - 0.15).toFixed(2)))}
                className="px-2 h-full text-xs hover:bg-[var(--paper-subtle)] border-r border-[var(--line)] cursor-pointer"
                title={de ? "Verkleinern" : "缩小"}
              >
                -
              </button>
              <button
                type="button"
                onClick={() => {
                  setZoom(viewMode === "planetary" ? 0.95 : 1.0);
                  setPan({ x: 20, y: 10 });
                }}
                className="px-2 h-full text-[11px] hover:bg-[var(--paper-subtle)] cursor-pointer"
                title={de ? "Zurücksetzen" : "重置"}
              >
                1:1
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 二级筛选栏：分类星区 Chips、多维标签 Filter 与全文快速检索 (整行单行对齐无折叠) */}
      <div className="flex items-center justify-between border-b border-[var(--line)] px-4 py-1.5 bg-[var(--paper-subtle)] text-xs font-mono gap-2 z-10 shrink-0 min-h-[40px] overflow-x-auto no-scrollbar flex-nowrap">
        {/* 分类星区筛选 Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar flex-nowrap py-0.5">
          <span className="text-[var(--gray)] font-medium shrink-0">
            {de ? "Bereich:" : "星区分类:"}
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`h-7 px-2.5 rounded-[var(--radius)] text-xs font-mono whitespace-nowrap shrink-0 cursor-pointer transition-colors flex items-center ${
              selectedCategory === "ALL"
                ? "bg-[var(--ink)] text-[var(--surface)] font-bold shadow-none"
                : "border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--paper-subtle)]"
            }`}
          >
            {de ? "Alle" : "全部分类"}
          </button>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-7 px-2.5 rounded-[var(--radius)] text-xs font-mono whitespace-nowrap shrink-0 cursor-pointer transition-colors flex items-center ${
                selectedCategory === cat
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold shadow-none"
                  : "border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:border-[var(--ink)] hover:bg-[var(--paper-subtle)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 标签过滤与搜索 */}
        <div className="flex items-center gap-2 shrink-0 ml-auto">
          {tagsList.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[var(--gray)] text-xs shrink-0">
                {de ? "Tag:" : "标签:"}
              </span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="h-7 px-2 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] text-xs text-[var(--ink)] font-mono cursor-pointer"
              >
                <option value="ALL">{de ? "Alle Tags" : "全部标签"}</option>
                {tagsList.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={de ? "Suchen (Titel, Formel...)" : "搜索知识点/公式/考点..."}
              className="h-7 pl-2.5 pr-6 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] text-xs font-mono text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] w-48"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer flex items-center justify-center"
                title={de ? "Löschen" : "清空"}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor">
                  <path d="M2 2l6 6M8 2l-6 6" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SVG 主画布 */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden touch-none bg-[var(--paper)]">
        {/* 自定义拖拽复位悬浮标牌 */}
        {customNodePositions.size > 0 && (
          <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--ink)] text-xs font-mono text-[var(--ink)] select-none animate-fade-in">
            <span>
              {de
                ? `${customNodePositions.size} Knoten verschoben`
                : `已自定义移动 ${customNodePositions.size} 个节点位置`}
            </span>
            <button
              type="button"
              onClick={() => setCustomNodePositions(new Map())}
              className="px-2 py-0.5 rounded bg-[var(--ink)] text-[var(--surface)] text-[11px] font-bold hover:opacity-90 cursor-pointer"
            >
              {de ? "Zurücksetzen" : "复位默认"}
            </button>
          </div>
        )}

        <svg
          className="w-full h-full"
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          data-testid="skill-tree-svg"
        >
          {/* 背景精细方格纸与引力流向定义 */}
          <defs>
            <pattern
              id="skilltree-grid"
              width="24"
              height="24"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 24 0 L 0 0 0 24"
                fill="none"
                stroke="var(--line)"
                strokeWidth="0.6"
                strokeOpacity="0.4"
              />
            </pattern>

            {/* 引力流向箭头 (已激活高亮) */}
            <marker
              id="grav-arrow-active"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--ink)" />
            </marker>

            {/* 引力流向箭头 (未解锁/弱) */}
            <marker
              id="grav-arrow-muted"
              viewBox="0 0 10 10"
              refX="22"
              refY="5"
              markerWidth="5"
              markerHeight="5"
              orient="auto"
            >
              <path d="M 0 2 L 6 5 L 0 8 z" fill="var(--line)" />
            </marker>
          </defs>

          {/* 背景色板 */}
          <rect
            width="100%"
            height="100%"
            fill={viewMode === "tree" ? "url(#skilltree-grid)" : "var(--surface)"}
          />

          {/* 可平移缩放层 */}
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            {/* 1. 若为行星模式，渲染文艺复兴星盘测天仪式背景 (Astrolabe Celestial Atlas Layer) */}
            {viewMode === "planetary" && (
              <g className="planetary-background-layer" aria-hidden="true">
                {/* 1.1 星盘外缘刻度环 (Astrolabe Limbus: r=746, 754) */}
                <circle
                  cx={PLANETARY_CENTER_X}
                  cy={PLANETARY_CENTER_Y}
                  r="746"
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="1.2"
                  opacity="0.8"
                />
                <circle
                  cx={PLANETARY_CENTER_X}
                  cy={PLANETARY_CENTER_Y}
                  r="754"
                  fill="none"
                  stroke="var(--line)"
                  strokeWidth="0.6"
                  opacity="0.4"
                />

                {/* 外缘 360 度赤道/黄道星盘细分刻度 (每 5° 一齿，每 15° 一长齿) */}
                {Array.from({ length: 72 }).map((_, i) => {
                  const deg = i * 5;
                  const rad = (deg * Math.PI) / 180;
                  const isMajor = deg % 15 === 0;
                  const isCardinal = deg % 90 === 0;
                  const tickLen = isCardinal ? 12 : isMajor ? 8 : 4;
                  const r1 = 746;
                  const r2 = 746 - tickLen;
                  return (
                    <line
                      key={`limbus-tick-${deg}`}
                      x1={PLANETARY_CENTER_X + r1 * Math.cos(rad)}
                      y1={PLANETARY_CENTER_Y + r1 * Math.sin(rad)}
                      x2={PLANETARY_CENTER_X + r2 * Math.cos(rad)}
                      y2={PLANETARY_CENTER_Y + r2 * Math.sin(rad)}
                      stroke={isMajor ? "var(--ink)" : "var(--line)"}
                      strokeWidth={isMajor ? 0.9 : 0.5}
                      opacity={isMajor ? 0.7 : 0.4}
                    />
                  );
                })}

                {/* 1.2 二十四时角经度射线 (24 Radial Meridians at 15° intervals) */}
                {Array.from({ length: 24 }).map((_, i) => {
                  const deg = i * 15;
                  const rad = (deg * Math.PI) / 180;
                  const isHourLine = deg % 30 === 0;
                  const isCardinal = deg % 90 === 0;
                  const rInner = 60;
                  const rOuter = 734;

                  return (
                    <g key={`meridian-${deg}`}>
                      <line
                        x1={PLANETARY_CENTER_X + rInner * Math.cos(rad)}
                        y1={PLANETARY_CENTER_Y + rInner * Math.sin(rad)}
                        x2={PLANETARY_CENTER_X + rOuter * Math.cos(rad)}
                        y2={PLANETARY_CENTER_Y + rOuter * Math.sin(rad)}
                        stroke="var(--line)"
                        strokeWidth={isCardinal ? 0.9 : isHourLine ? 0.6 : 0.4}
                        strokeDasharray={isCardinal ? "none" : isHourLine ? "3 5" : "1 6"}
                        opacity={isCardinal ? 0.6 : 0.35}
                      />
                      {/* 每 30° 标注赤经方位度数 */}
                      {isHourLine && (
                        <text
                          x={PLANETARY_CENTER_X + 764 * Math.cos(rad)}
                          y={PLANETARY_CENTER_Y + 764 * Math.sin(rad)}
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontFamily="monospace"
                          fontSize="7"
                          fill="var(--gray)"
                          opacity="0.8"
                        >
                          {`${deg.toString().padStart(3, "0")}°`}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* 1.3 辅助赤纬导引环 (Sub-declination guide rings) */}
                {[120, 245, 375, 505, 635].map((rSub) => (
                  <circle
                    key={`sub-ring-${rSub}`}
                    cx={PLANETARY_CENTER_X}
                    cy={PLANETARY_CENTER_Y}
                    r={rSub}
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="0.5"
                    strokeDasharray="1 5"
                    opacity="0.3"
                  />
                ))}

                {/* 1.4 五大教学进阶引力同心主轨道 (Curriculum Tier Gravitational Orbits) */}
                {ORBIT_RADII.map((radius, idx) => (
                  <g key={`orbit-${radius}`}>
                    <circle
                      cx={PLANETARY_CENTER_X}
                      cy={PLANETARY_CENTER_Y}
                      r={radius}
                      fill="none"
                      stroke="var(--line)"
                      strokeWidth="1.0"
                      opacity="0.85"
                    />
                    <circle
                      cx={PLANETARY_CENTER_X}
                      cy={PLANETARY_CENTER_Y}
                      r={radius + 3}
                      fill="none"
                      stroke="var(--line)"
                      strokeWidth="0.5"
                      strokeDasharray="2 6"
                      opacity="0.35"
                    />

                    {/* 轨道学段文字标牌 (Milestone Plaque at Apex) */}
                    <g transform={`translate(${PLANETARY_CENTER_X}, ${PLANETARY_CENTER_Y - radius})`}>
                      <rect
                        x={-110}
                        y={-9}
                        width={220}
                        height={18}
                        rx="3"
                        fill="var(--surface)"
                        stroke="var(--line)"
                        strokeWidth="0.8"
                      />
                      <text
                        y="0"
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontFamily="monospace"
                        fontSize="8"
                        fill="var(--gray)"
                        letterSpacing="0.06em"
                        fontWeight="bold"
                      >
                        {ORBIT_LABELS[idx]}
                      </text>
                    </g>
                  </g>
                ))}

                {/* 1.5 分类星区微透空间底衬、分界射线与外缘星域标题 (Constellation Sectors) */}
                {categoriesList.map((cat, idx) => {
                  const sectorSpan = 360 / Math.max(1, categoriesList.length);
                  const angleDeg = idx * sectorSpan;
                  const rad = (angleDeg * Math.PI) / 180;
                  const maxR = 730;
                  const minR = 60;
                  const rayX = PLANETARY_CENTER_X + maxR * Math.cos(rad);
                  const rayY = PLANETARY_CENTER_Y + maxR * Math.sin(rad);

                  // 扇形几何多边形/弧线底衬 (Sector Constellation Wedge Mesh)
                  const startRad = (angleDeg * Math.PI) / 180;
                  const endRad = ((angleDeg + sectorSpan) * Math.PI) / 180;
                  const x1 = PLANETARY_CENTER_X + minR * Math.cos(startRad);
                  const y1 = PLANETARY_CENTER_Y + minR * Math.sin(startRad);
                  const x2 = PLANETARY_CENTER_X + maxR * Math.cos(startRad);
                  const y2 = PLANETARY_CENTER_Y + maxR * Math.sin(startRad);
                  const x3 = PLANETARY_CENTER_X + maxR * Math.cos(endRad);
                  const y3 = PLANETARY_CENTER_Y + maxR * Math.sin(endRad);
                  const x4 = PLANETARY_CENTER_X + minR * Math.cos(endRad);
                  const y4 = PLANETARY_CENTER_Y + minR * Math.sin(endRad);
                  const isLargeArc = sectorSpan > 180 ? 1 : 0;
                  const sectorPath = `M ${x1} ${y1} L ${x2} ${y2} A ${maxR} ${maxR} 0 ${isLargeArc} 1 ${x3} ${y3} L ${x4} ${y4} A ${minR} ${minR} 0 ${isLargeArc} 0 ${x1} ${y1} Z`;

                  const isSectorActive = causalAnalysis?.activeCategories.has(cat) ?? false;

                  // 扇区标题位置 (在扇形中央外缘)
                  const midAngleDeg = angleDeg + sectorSpan / 2;
                  const midRad = (midAngleDeg * Math.PI) / 180;
                  const labelR = 705;
                  const labelX = PLANETARY_CENTER_X + labelR * Math.cos(midRad);
                  const labelY = PLANETARY_CENTER_Y + labelR * Math.sin(midRad);

                  return (
                    <g key={`sector-${cat}`}>
                      {/* 扇区空间底衬几何层 (Sector Spatial Mesh: 激活高亮 vs 交替浅纸底) */}
                      <path
                        d={sectorPath}
                        fill={isSectorActive ? "var(--paper-subtle)" : idx % 2 === 0 ? "var(--paper-subtle)" : "transparent"}
                        opacity={isSectorActive ? 0.75 : 0.25}
                        stroke={isSectorActive ? "var(--ink)" : "none"}
                        strokeWidth={isSectorActive ? 0.8 : 0}
                        strokeDasharray={isSectorActive ? "2 4" : "none"}
                        className="transition-all duration-300 pointer-events-none"
                      />

                      <line
                        x1={PLANETARY_CENTER_X}
                        y1={PLANETARY_CENTER_Y}
                        x2={rayX}
                        y2={rayY}
                        stroke={isSectorActive ? "var(--ink)" : "var(--line)"}
                        strokeWidth={isSectorActive ? 1.2 : 0.8}
                        strokeDasharray={isSectorActive ? "none" : "4 4"}
                        opacity={isSectorActive ? 0.8 : 0.45}
                      />
                      <g transform={`translate(${labelX}, ${labelY})`}>
                        <rect
                          x={-68}
                          y={-13}
                          width={136}
                          height={26}
                          rx="13"
                          fill="var(--surface)"
                          stroke={isSectorActive ? "var(--ink)" : "var(--line)"}
                          strokeWidth={isSectorActive ? 1.8 : 1.0}
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontFamily="serif"
                          fontSize="11"
                          fontWeight={isSectorActive ? "bold" : "normal"}
                          fill="var(--ink)"
                        >
                          {`[ ${cat} ]`}
                        </text>
                      </g>
                    </g>
                  );
                })}

                {/* 1.6 学科核心太阳 (Subject Sun Nucleus / Astrolabe Sol) */}
                <g transform={`translate(${PLANETARY_CENTER_X}, ${PLANETARY_CENTER_Y})`}>
                  {/* 24 齿星盘擒纵 Corona Ticks */}
                  {Array.from({ length: 24 }).map((_, i) => {
                    const deg = (i * 360) / 24;
                    const rad = (deg * Math.PI) / 180;
                    return (
                      <line
                        key={`corona-${i}`}
                        x1={52 * Math.cos(rad)}
                        y1={52 * Math.sin(rad)}
                        x2={57 * Math.cos(rad)}
                        y2={57 * Math.sin(rad)}
                        stroke="var(--line)"
                        strokeWidth="1.0"
                      />
                    );
                  })}

                  {/* 刻度底环 */}
                  <circle
                    r="50"
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="0.8"
                  />

                  {/* 动态精通圆弧进度槽 (Circular Mastery Arc) */}
                  <circle
                    r="46"
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="2.5"
                    opacity="0.25"
                  />
                  <circle
                    r="46"
                    fill="none"
                    stroke="var(--ink)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${(progressSummary.progressPercent / 100) * (2 * Math.PI * 46)} ${2 * Math.PI * 46}`}
                    transform="rotate(-90)"
                    className="transition-all duration-500"
                  />

                  {/* 太阳核球主体 */}
                  <circle
                    r="42"
                    fill="var(--surface)"
                    stroke="var(--ink)"
                    strokeWidth="1.8"
                  />
                  <circle
                    r="37"
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="0.8"
                    strokeDasharray="2 3"
                  />

                  {/* 核心标示与标题 */}
                  <text
                    y="-15"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="7"
                    fill="var(--gray)"
                    letterSpacing="0.12em"
                  >
                    SOL · GRAVITAS
                  </text>
                  <text
                    y="3"
                    textAnchor="middle"
                    fontFamily="serif"
                    fontSize="13"
                    fontWeight="bold"
                    fill="var(--ink)"
                  >
                    {activeGraph.nameZH}
                  </text>
                  <text
                    y="18"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="8.5"
                    fill="var(--gray)"
                  >
                    {`${progressSummary.masteredNodes}/${progressSummary.totalNodes} 精通`}
                  </text>
                </g>
              </g>
            )}

            {/* 1.1 若为认知科技树模式，渲染 5 纵深阶段里程碑标题卡与领域分类横向泳道 (Laned Tech Tree Layer) */}
            {viewMode === "tree" && (
              <g className="tech-tree-background-layer" aria-hidden="true">
                {/* 顶部纵深阶段里程碑标题卡 (Tier Milestone Plaque Headers) */}
                {TIER_COLUMNS.map((tierKey, colIdx) => {
                  const colX = LANE_HEADER_WIDTH + 24 + colIdx * TECH_COL_WIDTH;
                  const label = TIER_LABELS[tierKey][de ? "de" : "zh"];
                  const hasNext = colIdx < 4;
                  return (
                    <g key={`tier-header-${tierKey}`}>
                      <rect
                        x={colX}
                        y={20}
                        width={TREE_BOX_WIDTH}
                        height={32}
                        rx="3"
                        fill="var(--surface)"
                        stroke="var(--ink)"
                        strokeWidth="1.2"
                      />
                      <text
                        x={colX + TREE_BOX_WIDTH / 2}
                        y={36}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fontFamily="monospace"
                        fontSize="9"
                        fontWeight="bold"
                        letterSpacing="0.05em"
                        fill="var(--ink)"
                      >
                        {label}
                      </text>

                      {/* 阶段演进向右流向连接符 */}
                      {hasNext && (
                        <g stroke="var(--line)" strokeWidth="1.2" fill="none">
                          <line
                            x1={colX + TREE_BOX_WIDTH + 6}
                            y1={36}
                            x2={colX + TECH_COL_WIDTH - 6}
                            y2={36}
                            strokeDasharray="2 3"
                          />
                          <path
                            d={`M ${colX + TECH_COL_WIDTH - 10} 33 L ${colX + TECH_COL_WIDTH - 6} 36 L ${colX + TECH_COL_WIDTH - 10} 39`}
                            stroke="var(--ink)"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      )}
                    </g>
                  );
                })}

                {/* 领域分类横向泳道 (Category Horizontal Lanes) */}
                {lanesMeta.map((lane) => {
                  const percent =
                    lane.totalCount > 0 ? Math.round((lane.masteredCount / lane.totalCount) * 100) : 0;
                  return (
                    <g key={`lane-bg-${lane.name}`}>
                      {/* 左侧泳道标题卡片 */}
                      <rect
                        x={16}
                        y={lane.y}
                        width={LANE_HEADER_WIDTH - 4}
                        height={lane.height}
                        rx="4"
                        fill="var(--paper-subtle)"
                        stroke="var(--line)"
                        strokeWidth="0.9"
                      />
                      <g transform={`translate(26, ${lane.y + 24})`}>
                        <text
                          x="0"
                          y="0"
                          fontFamily="serif"
                          fontSize="12.5"
                          fontWeight="bold"
                          fill="var(--ink)"
                        >
                          {lane.name}
                        </text>
                        <text
                          x="0"
                          y="17"
                          fontFamily="monospace"
                          fontSize="8.5"
                          fill="var(--gray)"
                        >
                          {`${lane.masteredCount}/${lane.totalCount} ${de ? "gemeistert" : "已掌握"} (${percent}%)`}
                        </text>
                        {/* 泳道迷你进度条 */}
                        <rect
                          x="0"
                          y="26"
                          width={LANE_HEADER_WIDTH - 28}
                          height="2.5"
                          rx="1.2"
                          fill="var(--line)"
                        />
                        <rect
                          x="0"
                          y="26"
                          width={Math.round(((LANE_HEADER_WIDTH - 28) * percent) / 100)}
                          height="2.5"
                          rx="1.2"
                          fill="var(--ink)"
                        />
                      </g>

                      {/* 横向轨道虚线分隔线 */}
                      <line
                        x1={16}
                        y1={lane.y + lane.height + 10}
                        x2={LANE_HEADER_WIDTH + 24 + 5 * TECH_COL_WIDTH}
                        y2={lane.y + lane.height + 10}
                        stroke="var(--line)"
                        strokeWidth="0.8"
                        strokeDasharray="4 4"
                        opacity="0.5"
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* 2. 渲染引力与拓扑连线 (Edges: 支持因果聚焦高亮与全局降噪) */}
            {renderedEdges.map((edge) => (
              <path
                key={edge.id}
                d={edge.pathData}
                fill="none"
                stroke={edge.strokeColor}
                strokeWidth={edge.strokeWidth}
                opacity={edge.opacity}
                strokeDasharray={edge.strokeDash}
                markerEnd={edge.markerEnd}
                className="transition-all duration-200"
              />
            ))}

            {/* 3. 渲染知识点卡片/行星节点 (高对比三态编码 + 因果链聚焦) */}
            {layoutedNodes.map((node) => {
              const status: SkillNodeStatus = unlockStates.get(node.id) ?? "locked";
              const isSelected = selectedNodeId === node.id;
              const isMastered = status === "mastered";
              const isAvailable = status === "available";
              const isLocked = status === "locked";
              const isMatched = isNodeMatchingFilter(node);

              const isFocal = causalAnalysis?.focalNodeId === node.id;
              const isPrereq = causalAnalysis?.allPrereqs.has(node.id) ?? false;
              const isSuccessor = causalAnalysis?.allSuccessors.has(node.id) ?? false;
              const nodeDist = causalAnalysis?.nodeDistances.get(node.id);

              // 拓扑距离衰减与宏观背景保留 (Topological Distance Decay & Macro Forest Context)
              let nodeOpacity = isMatched ? 1.0 : 0.22;
              if (causalAnalysis) {
                if (isFocal) {
                  nodeOpacity = 1.0;
                } else if (nodeDist !== undefined) {
                  // 距离核心节点越远，透明度梯度衰减：d=1 -> 0.95, d=2 -> 0.78, d>=3 -> 0.60
                  nodeOpacity = nodeDist === 1 ? 0.95 : nodeDist === 2 ? 0.78 : 0.60;
                } else {
                  // 保留宏观森林定位感：未激活背景节点保持 0.30 (若匹配分类为 0.35)
                  nodeOpacity = isMatched ? 0.30 : 0.16;
                }
              } else if (isLocked) {
                nodeOpacity = isMatched ? 0.45 : 0.20;
              }

              const tierText = node.curriculumTier === "Uni_Prep" ? "Uni" : (node.curriculumTier ?? "EF");
              const afbText = `AFB ${node.level === 1 ? "I" : node.level === 2 ? "II" : "III"}`;
              const minutesText = `~${node.estimatedMinutes || 15}m`;

              const displayTitleZH =
                node.titleZH.length > 15 ? `${node.titleZH.slice(0, 14)}…` : node.titleZH;
              const displayTitleDE =
                node.titleDE.length > 21 ? `${node.titleDE.slice(0, 20)}…` : node.titleDE;

              if (viewMode === "planetary") {
                const cx = node.x;
                const cy = node.y;

                // 判定知识点位于星盘左侧或右侧（外向辐射排布）
                const isLeft = cx < PLANETARY_CENTER_X - 10;
                const cardW = 196;
                const cardH = 58;
                const cardX = isLeft ? -24 - cardW : 24;
                const cardY = -cardH / 2;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${cx}, ${cy})`}
                    data-clickable-node="true"
                    data-testid={`skill-node-${node.id}`}
                    onPointerEnter={() => setHoveredNodeId(node.id)}
                    onPointerLeave={() => setHoveredNodeId(null)}
                    onPointerDown={(e) => handleNodePointerDown(e, node)}
                    onPointerMove={handleNodePointerMove}
                    onPointerUp={(e) => handleNodePointerUp(e, node.id)}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (justDraggedRef.current) {
                        justDraggedRef.current = false;
                        return;
                      }
                      setSelectedNodeId(node.id);
                    }}
                    className="cursor-move group transition-opacity duration-200"
                    style={{
                      transformOrigin: `${cx}px ${cy}px`,
                      transformBox: "view-box",
                      opacity: nodeOpacity,
                    }}
                  >
                    {/* A. 知识点星体核心 (Planetary Body Orb) */}
                    <g className="planetary-orb">
                      {/* 大气层星晕光环 (Atmospheric Halo) */}
                      <circle
                        r="21"
                        fill="none"
                        stroke={
                          isFocal || isSelected
                            ? "var(--ink)"
                            : isMastered
                            ? "var(--ink)"
                            : isAvailable
                            ? "var(--ink)"
                            : "var(--line)"
                        }
                        strokeWidth={isFocal || isSelected ? 2.0 : isMastered ? 1.4 : isAvailable ? 1.6 : 0.8}
                        strokeDasharray={isAvailable ? "3 2" : isLocked ? "2 3" : "none"}
                        opacity={isLocked ? 0.4 : 0.85}
                      />

                      {/* 精通状态下的四向星芒微刻线 */}
                      {isMastered && (
                        <g stroke="var(--ink)" strokeWidth="1.2">
                          <line x1="0" y1="-21" x2="0" y2="-24" />
                          <line x1="0" y1="21" x2="0" y2="24" />
                          <line x1="-21" y1="0" x2="-24" y2="0" />
                          <line x1="21" y1="0" x2="24" y2="0" />
                        </g>
                      )}

                      {/* 高阶综合点 (AFB III / Q2 / Uni) 赋予土星型吸积光环 */}
                      {(node.level === 3 || node.curriculumTier === "Q2" || node.curriculumTier === "Uni_Prep") && (
                        <ellipse
                          rx="24"
                          ry="7"
                          transform="rotate(-24)"
                          fill="none"
                          stroke={isMastered ? "var(--ink)" : "var(--gray)"}
                          strokeWidth="1.0"
                          opacity="0.75"
                        />
                      )}

                      {/* 核心球体 (Core Sphere) */}
                      <circle
                        r="15"
                        fill={isMastered ? "var(--ink)" : isAvailable ? "var(--surface)" : "var(--paper-subtle)"}
                        stroke={
                          isFocal || isSelected
                            ? "var(--ink)"
                            : isMastered
                            ? "var(--ink)"
                            : isAvailable
                            ? "var(--ink)"
                            : "var(--line)"
                        }
                        strokeWidth={isFocal || isSelected ? 2.2 : isAvailable ? 2.0 : 1.0}
                        className="transition-all duration-150 group-hover:stroke-[var(--ink)]"
                      />

                      {/* 星核状态微标 (严格手绘纯矢量，严禁 Emoji) */}
                      {isMastered && (
                        <path
                          d="M-4.5 0 L-1.5 3.5 L5 -3.5"
                          fill="none"
                          stroke="var(--surface)"
                          strokeWidth="2.0"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      )}
                      {isAvailable && (
                        <circle cx="0" cy="0" r="4.5" fill="var(--ink)" />
                      )}
                      {isLocked && (
                        <g transform="translate(0, 0)">
                          <rect
                            x="-3.5"
                            y="-1"
                            width="7"
                            height="5.5"
                            rx="1"
                            fill="none"
                            stroke="var(--gray)"
                            strokeWidth="1.1"
                          />
                          <path
                            d="M-2 -1 V-3.2 A2 2 0 0 1 2 -3.2 V-1"
                            fill="none"
                            stroke="var(--gray)"
                            strokeWidth="1.1"
                          />
                        </g>
                      )}
                    </g>

                    {/* B. 星球与标牌连接引力桥梁 (Tether Bridge) */}
                    <line
                      x1={isLeft ? -15 : 15}
                      y1="0"
                      x2={isLeft ? -24 : 24}
                      y2="0"
                      stroke={isAvailable || isMastered ? "var(--ink)" : "var(--line)"}
                      strokeWidth="1.0"
                      strokeDasharray="1 2"
                    />

                    {/* C. 学术名牌标牌 (Academic Data Cartouche) */}
                    <g className="planetary-cartouche">
                      {/* 标牌底板：纯白卡片，脱颖于背景纸面 */}
                      <rect
                        x={cardX}
                        y={cardY}
                        width={cardW}
                        height={cardH}
                        rx="4"
                        fill={isMastered ? "var(--paper-subtle)" : "var(--surface)"}
                        stroke={
                          isFocal || isSelected
                            ? "var(--ink)"
                            : isAvailable
                            ? "var(--ink)"
                            : isMastered
                            ? "var(--ink)"
                            : "var(--line)"
                        }
                        strokeWidth={isFocal || isSelected ? 2.2 : isAvailable ? 1.8 : isMastered ? 1.2 : 0.9}
                        strokeDasharray={isLocked ? "3 2" : "none"}
                        className="transition-all duration-150 group-hover:stroke-[var(--ink)]"
                      />

                      {/* 标牌内缘细微蚀刻线 (Tufte 学术双发丝内框，增强纸张层次感) */}
                      <rect
                        x={cardX + 1.5}
                        y={cardY + 1.5}
                        width={cardW - 3}
                        height={cardH - 3}
                        rx="3"
                        fill="none"
                        stroke={isAvailable ? "var(--ink)" : "var(--paper-subtle)"}
                        strokeWidth="0.8"
                        strokeOpacity={isAvailable ? 0.3 : 1}
                        pointerEvents="none"
                      />

                      {/* 顶部学术状态标饰线 (Top Ink Status Header Bar) */}
                      <rect
                        x={cardX}
                        y={cardY}
                        width={cardW}
                        height={2.8}
                        rx="1.4"
                        fill="var(--ink)"
                        opacity={isFocal || isSelected ? 1.0 : isMastered ? 0.9 : isAvailable ? 0.6 : 0.2}
                      />

                      {/* 选中态星盘十字准星定位线 (Reticle Corner Brackets) */}
                      {(isFocal || isSelected) && (
                        <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
                          <path d={`M ${cardX + 2} ${cardY + 8} L ${cardX + 2} ${cardY + 2} L ${cardX + 8} ${cardY + 2}`} />
                          <path d={`M ${cardX + cardW - 8} ${cardY + 2} L ${cardX + cardW - 2} ${cardY + 2} L ${cardX + cardW - 2} ${cardY + 8}`} />
                          <path d={`M ${cardX + 2} ${cardY + cardH - 8} L ${cardX + 2} ${cardY + cardH - 2} L ${cardX + 8} ${cardY + cardH - 2}`} />
                          <path d={`M ${cardX + cardW - 8} ${cardY + cardH - 2} L ${cardX + cardW - 2} ${cardY + cardH - 2} L ${cardX + cardW - 2} ${cardY + cardH - 8}`} />
                        </g>
                      )}

                      {/* 第一行：学段难度 Pill 标牌、状态徽记与预计耗时 */}
                      <rect
                        x={cardX + 7}
                        y={cardY + 6.5}
                        width={28}
                        height={12.5}
                        rx="2"
                        fill="var(--paper-subtle)"
                        stroke="var(--line)"
                        strokeWidth="0.6"
                      />
                      <text
                        x={cardX + 21}
                        y={cardY + 15.5}
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontSize="7.5"
                        fontWeight="bold"
                        fill="var(--ink)"
                      >
                        {tierText}
                      </text>
                      <text
                        x={cardX + 40}
                        y={cardY + 15.5}
                        fontFamily="monospace"
                        fontSize="8"
                        fill="var(--gray)"
                        className="select-none"
                      >
                        {afbText}
                      </text>

                      {/* 因果链指示角标 或 状态指示徽记 */}
                      {isFocal ? (
                        <g>
                          <rect
                            x={cardX + cardW - 86}
                            y={cardY + 6.5}
                            width={46}
                            height={12.5}
                            rx="2"
                            fill="var(--ink)"
                          />
                          <text
                            x={cardX + cardW - 63}
                            y={cardY + 15.5}
                            textAnchor="middle"
                            fontFamily="monospace"
                            fontSize="8"
                            fontWeight="bold"
                            fill="var(--surface)"
                          >
                            {de ? "Fokus" : "核心焦点"}
                          </text>
                        </g>
                      ) : isPrereq ? (
                        <g>
                          <rect
                            x={cardX + cardW - 86}
                            y={cardY + 6.5}
                            width={46}
                            height={12.5}
                            rx="2"
                            fill="var(--paper-subtle)"
                            stroke="var(--ink)"
                            strokeWidth={nodeDist === 1 ? 1.2 : 0.8}
                          />
                          <text
                            x={cardX + cardW - 63}
                            y={cardY + 15.5}
                            textAnchor="middle"
                            fontFamily="monospace"
                            fontSize="8"
                            fontWeight="bold"
                            fill="var(--ink)"
                          >
                            {nodeDist && nodeDist > 1
                              ? de ? `← Voraus.${nodeDist}` : "← 前置 (远)"
                              : de ? "← Voraus." : "← 前置"}
                          </text>
                        </g>
                      ) : isSuccessor ? (
                        <g>
                          <rect
                            x={cardX + cardW - 86}
                            y={cardY + 6.5}
                            width={46}
                            height={12.5}
                            rx="2"
                            fill="var(--paper-subtle)"
                            stroke="var(--ink)"
                            strokeWidth={nodeDist === 1 ? 1.2 : 0.8}
                          />
                          <text
                            x={cardX + cardW - 63}
                            y={cardY + 15.5}
                            textAnchor="middle"
                            fontFamily="monospace"
                            fontSize="8"
                            fontWeight="bold"
                            fill="var(--ink)"
                          >
                            {nodeDist && nodeDist > 1
                              ? de ? `→ Entsp.${nodeDist}` : "→ 进阶解锁"
                              : de ? "→ Entsperrt" : "→ 直接解锁"}
                          </text>
                        </g>
                      ) : (
                        <g>
                          {isMastered ? (
                            <>
                              <rect
                                x={cardX + cardW - 74}
                                y={cardY + 6.5}
                                width={34}
                                height={12.5}
                                rx="2"
                                fill="var(--ink)"
                              />
                              <text
                                x={cardX + cardW - 57}
                                y={cardY + 15.5}
                                textAnchor="middle"
                                fontFamily="monospace"
                                fontSize="8"
                                fontWeight="bold"
                                fill="var(--surface)"
                              >
                                {de ? "Gekonnt" : "已掌握"}
                              </text>
                            </>
                          ) : isAvailable ? (
                            <>
                              <rect
                                x={cardX + cardW - 74}
                                y={cardY + 6.5}
                                width={34}
                                height={12.5}
                                rx="2"
                                fill="var(--surface)"
                                stroke="var(--ink)"
                                strokeWidth="1.2"
                              />
                              <text
                                x={cardX + cardW - 57}
                                y={cardY + 15.5}
                                textAnchor="middle"
                                fontFamily="monospace"
                                fontSize="8"
                                fontWeight="bold"
                                fill="var(--ink)"
                              >
                                {de ? "Bereit" : "可攻坚"}
                              </text>
                            </>
                          ) : (
                            <>
                              <rect
                                x={cardX + cardW - 74}
                                y={cardY + 6.5}
                                width={34}
                                height={12.5}
                                rx="2"
                                fill="var(--paper-subtle)"
                                stroke="var(--line)"
                                strokeWidth="0.6"
                              />
                              <text
                                x={cardX + cardW - 57}
                                y={cardY + 15.5}
                                textAnchor="middle"
                                fontFamily="monospace"
                                fontSize="8"
                                fill="var(--gray)"
                              >
                                {de ? "Gesperrt" : "前置锁定"}
                              </text>
                            </>
                          )}
                        </g>
                      )}

                      <text
                        x={cardX + cardW - 7}
                        y={cardY + 15.5}
                        textAnchor="end"
                        fontFamily="monospace"
                        fontSize="8"
                        fill="var(--gray)"
                        className="select-none"
                      >
                        {minutesText}
                      </text>

                      {/* 第二行：中文典范知识点名称 */}
                      <text
                        x={cardX + 8}
                        y={cardY + 33}
                        fontFamily="serif"
                        fontSize="11"
                        fontWeight="bold"
                        fill="var(--ink)"
                        className="select-none"
                      >
                        {displayTitleZH}
                      </text>

                      {/* 第三行：德语学术微缩术语 */}
                      <text
                        x={cardX + 8}
                        y={cardY + 48}
                        fontFamily="monospace"
                        fontSize="8.5"
                        fill="var(--gray)"
                        className="select-none"
                      >
                        {displayTitleDE}
                      </text>
                    </g>
                  </g>
                );
              }

              // 认知科技树模式卡片 (Laned Tech Tree Node Card: 210x80)
              const cx = node.x + TREE_BOX_WIDTH / 2;
              const cy = node.y + TREE_BOX_HEIGHT / 2;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  data-clickable-node="true"
                  data-testid={`skill-node-${node.id}`}
                  onPointerEnter={() => setHoveredNodeId(node.id)}
                  onPointerLeave={() => setHoveredNodeId(null)}
                  onPointerDown={(e) => handleNodePointerDown(e, node)}
                  onPointerMove={handleNodePointerMove}
                  onPointerUp={(e) => handleNodePointerUp(e, node.id)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (justDraggedRef.current) {
                      justDraggedRef.current = false;
                      return;
                    }
                    setSelectedNodeId(node.id);
                  }}
                  className="cursor-move group transition-opacity duration-200"
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                    transformBox: "view-box",
                    opacity: nodeOpacity,
                  }}
                >
                  <rect
                    width={TREE_BOX_WIDTH}
                    height={TREE_BOX_HEIGHT}
                    rx="4"
                    fill={isMastered ? "var(--paper-subtle)" : "var(--surface)"}
                    stroke={
                      isFocal || isSelected
                        ? "var(--ink)"
                        : isAvailable
                        ? "var(--ink)"
                        : isMastered
                        ? "var(--ink)"
                        : "var(--line)"
                    }
                    strokeWidth={isFocal || isSelected ? 2.2 : isAvailable ? 1.8 : isMastered ? 1.2 : 0.9}
                    strokeDasharray={isLocked ? "3,3" : "none"}
                    className="transition-all duration-150 group-hover:stroke-[var(--ink)]"
                  />
                  {/* 双层发丝内线 */}
                  <rect
                    x="1.5"
                    y="1.5"
                    width={TREE_BOX_WIDTH - 3}
                    height={TREE_BOX_HEIGHT - 3}
                    rx="3"
                    fill="none"
                    stroke={isAvailable ? "var(--ink)" : "var(--paper-subtle)"}
                    strokeWidth="0.8"
                    strokeOpacity={isAvailable ? 0.3 : 1}
                    pointerEvents="none"
                  />
                  {/* 顶部学术状态标饰条 */}
                  <rect
                    x="0"
                    y="0"
                    width={TREE_BOX_WIDTH}
                    height="3"
                    rx="1.5"
                    fill="var(--ink)"
                    opacity={isFocal || isSelected ? 1.0 : isMastered ? 0.9 : isAvailable ? 0.6 : 0.2}
                  />

                  {/* 第一行：状态图标、学段与状态胶囊 */}
                  <g transform="translate(10, 16)">
                    {isMastered && (
                      <path
                        d="M0 4 L3.5 7.5 L9 1"
                        fill="none"
                        stroke="var(--ink)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    )}
                    {isAvailable && (
                      <circle cx="4.5" cy="4.5" r="3.5" fill="var(--ink)" />
                    )}
                    {isLocked && (
                      <g transform="translate(0, -1)">
                        <rect x="1" y="4" width="7" height="5" rx="1" fill="none" stroke="var(--gray)" strokeWidth="1.1" />
                        <path d="M2.5 4V2.5a2 2 0 0 1 4 0V4" fill="none" stroke="var(--gray)" strokeWidth="1.1" />
                      </g>
                    )}

                    <text
                      x="16"
                      y="7.5"
                      fontFamily="monospace"
                      fontSize="8.5"
                      fill="var(--gray)"
                      fontWeight="bold"
                    >
                      {`${tierText} · ${afbText}`}
                    </text>

                    {/* 因果链指示角标 或 状态指示徽记 */}
                    {isFocal ? (
                      <g transform="translate(86, -2)">
                        <rect
                          width="46"
                          height="13"
                          rx="2"
                          fill="var(--ink)"
                        />
                        <text
                          x="23"
                          y="9.5"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontSize="8"
                          fontWeight="bold"
                          fill="var(--surface)"
                        >
                          {de ? "Fokus" : "核心焦点"}
                        </text>
                      </g>
                    ) : isPrereq ? (
                      <g transform="translate(86, -2)">
                        <rect
                          width="46"
                          height="13"
                          rx="2"
                          fill="var(--paper-subtle)"
                          stroke="var(--ink)"
                          strokeWidth={nodeDist === 1 ? 1.2 : 0.8}
                        />
                        <text
                          x="23"
                          y="9.5"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontSize="8"
                          fontWeight="bold"
                          fill="var(--ink)"
                        >
                          {nodeDist && nodeDist > 1
                            ? de ? `← Voraus.${nodeDist}` : "← 前置 (远)"
                            : de ? "← Voraus." : "← 前置"}
                        </text>
                      </g>
                    ) : isSuccessor ? (
                      <g transform="translate(86, -2)">
                        <rect
                          width="46"
                          height="13"
                          rx="2"
                          fill="var(--paper-subtle)"
                          stroke="var(--ink)"
                          strokeWidth={nodeDist === 1 ? 1.2 : 0.8}
                        />
                        <text
                          x="23"
                          y="9.5"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontSize="8"
                          fontWeight="bold"
                          fill="var(--ink)"
                        >
                          {nodeDist && nodeDist > 1
                            ? de ? `→ Entsp.${nodeDist}` : "→ 进阶解锁"
                            : de ? "→ Entsperrt" : "→ 直接解锁"}
                        </text>
                      </g>
                    ) : (
                      <g transform="translate(94, -2)">
                        {isMastered ? (
                          <>
                            <rect width="36" height="13" rx="2" fill="var(--ink)" />
                            <text
                              x="18"
                              y="9.5"
                              textAnchor="middle"
                              fontFamily="monospace"
                              fontSize="8"
                              fontWeight="bold"
                              fill="var(--surface)"
                            >
                              {de ? "Gekonnt" : "已掌握"}
                            </text>
                          </>
                        ) : isAvailable ? (
                          <>
                            <rect width="36" height="13" rx="2" fill="var(--surface)" stroke="var(--ink)" strokeWidth="1.2" />
                            <text
                              x="18"
                              y="9.5"
                              textAnchor="middle"
                              fontFamily="monospace"
                              fontSize="8"
                              fontWeight="bold"
                              fill="var(--ink)"
                            >
                              {de ? "Bereit" : "可攻坚"}
                            </text>
                          </>
                        ) : (
                          <>
                            <rect width="36" height="13" rx="2" fill="var(--paper-subtle)" stroke="var(--line)" strokeWidth="0.6" />
                            <text
                              x="18"
                              y="9.5"
                              textAnchor="middle"
                              fontFamily="monospace"
                              fontSize="8"
                              fill="var(--gray)"
                            >
                              {de ? "Gesperrt" : "前置锁定"}
                            </text>
                          </>
                        )}
                      </g>
                    )}

                    <text
                      x={TREE_BOX_WIDTH - 28}
                      y="7.5"
                      textAnchor="end"
                      fontFamily="monospace"
                      fontSize="8.5"
                      fill="var(--gray)"
                    >
                      {minutesText}
                    </text>
                  </g>

                  <text
                    x="10"
                    y="44"
                    fontFamily="serif"
                    fontSize="12.5"
                    fontWeight="bold"
                    fill="var(--ink)"
                    className="select-none"
                  >
                    {displayTitleZH}
                  </text>

                  <text
                    x="10"
                    y="63"
                    fontFamily="monospace"
                    fontSize="9"
                    fill="var(--gray)"
                    className="select-none"
                  >
                    {displayTitleDE}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* 右侧：知识点研习抽屉 (Drawer) */}
      {activeNode && (
        <aside
          className="absolute right-0 top-0 bottom-0 w-80 md:w-96 bg-[var(--surface)] border-l border-[var(--line)] p-4 flex flex-col gap-4 shadow-none z-20 overflow-y-auto"
          data-testid="skill-tree-node-drawer"
        >
          {/* 抽屉顶栏 */}
          <div className="flex items-start justify-between border-b border-[var(--line)] pb-3">
            <div>
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 border border-[var(--line)] bg-[var(--paper-subtle)] text-[var(--ink)] rounded-[var(--radius)]">
                  {`AFB ${activeNode.level === 1 ? "I" : activeNode.level === 2 ? "II" : "III"}`}
                </span>
                {activeNode.category && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] rounded-[var(--radius)]">
                    {activeNode.category}
                  </span>
                )}
                {activeNode.curriculumTier && (
                  <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-[var(--gray)] rounded-[var(--radius)]">
                    {activeNode.curriculumTier}
                  </span>
                )}
                <span
                  className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded-[var(--radius)] ${
                    activeNodeStatus === "mastered"
                      ? "bg-[var(--ink)] text-[var(--surface)]"
                      : activeNodeStatus === "available"
                      ? "border border-[var(--ink)] text-[var(--ink)]"
                      : "border border-[var(--line)] text-[var(--gray)]"
                  }`}
                >
                  {activeNodeStatus === "mastered"
                    ? de ? "Gekonnt" : "已精通掌握"
                    : activeNodeStatus === "available"
                    ? de ? "Verfügbar" : "可立即攻坚"
                    : de ? "Gesperrt" : "前置未解锁"}
                </span>
              </div>
              <h2 className="font-serif text-base font-bold mt-1 text-[var(--ink)]">
                {activeNode.titleZH}
              </h2>
              <div className="font-mono text-xs text-[var(--gray)]">
                {activeNode.titleDE}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedNodeId(null)}
              className="p-1 rounded-[var(--radius)] hover:bg-[var(--paper-subtle)] text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
              aria-label={de ? "Schließen" : "关闭"}
            >
              <svg {...iconProps}>
                <path d="M4 4l8 8M12 4L4 12" />
              </svg>
            </button>
          </div>

          {/* 核心内容区 */}
          <div className="space-y-3 text-xs leading-relaxed">
            {/* 因果推进学习路径 (Causal Progression Chain / 线性步骤流) */}
            {causalAnalysis && causalAnalysis.progressionSteps.length > 1 && (
              <div className="space-y-2 p-2.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-[var(--radius)]">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-[var(--ink)] flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="8" cy="8" r="6" />
                      <path d="M8 4v4l3 2" />
                    </svg>
                    <span>{de ? "Kausal-Lernpfad (Linear)" : "因果推进学习清单 (全链路)"}</span>
                  </div>
                  <span className="font-mono text-[9px] text-[var(--gray)]">
                    {`${causalAnalysis.progressionSteps.length} ${de ? "Schritte" : "步进节点"}`}
                  </span>
                </div>
                <div className="space-y-1.5">
                  {causalAnalysis.progressionSteps.map((step, idx) => {
                    const isThisFocal = step.role === "focal";
                    const stepStatus = unlockStates.get(step.id) ?? "locked";
                    const isStepMastered = stepStatus === "mastered";
                    const isStepAvailable = stepStatus === "available";
                    const stepTitleZH = step.node?.titleZH || step.id;
                    const stepTitleDE = step.node?.titleDE || "";

                    return (
                      <div
                        key={step.id}
                        onClick={() => setSelectedNodeId(step.id)}
                        className={`p-2 rounded-[var(--radius)] border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                          isThisFocal
                            ? "bg-[var(--surface)] border-[var(--ink)] shadow-none"
                            : "bg-[var(--surface)] border-[var(--line)] hover:border-[var(--ink)] hover:bg-[var(--paper)]"
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          {/* 步骤标号 */}
                          <div
                            className={`w-5 h-5 rounded-full flex items-center justify-center font-mono text-[10px] font-bold shrink-0 ${
                              isThisFocal
                                ? "bg-[var(--ink)] text-[var(--surface)]"
                                : isStepMastered
                                ? "bg-[var(--paper-subtle)] text-[var(--ink)] border border-[var(--ink)]"
                                : "bg-[var(--paper-subtle)] text-[var(--gray)] border border-[var(--line)]"
                            }`}
                          >
                            {idx + 1}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`font-mono text-[8.5px] px-1 py-0.5 rounded-[var(--radius)] font-bold ${
                                  step.role === "focal"
                                    ? "bg-[var(--ink)] text-[var(--surface)]"
                                    : step.role === "prereq"
                                    ? "bg-[var(--paper-subtle)] text-[var(--ink)] border border-[var(--line)]"
                                    : "bg-[var(--surface)] text-[var(--gray)] border border-[var(--line)]"
                                }`}
                              >
                                {step.role === "focal"
                                  ? de ? "Fokus" : "当前攻坚"
                                  : step.role === "prereq"
                                  ? de ? `Voraus. (d=${step.dist})` : `前置基石 (d=${step.dist})`
                                  : de ? `Folge (d=${step.dist})` : `解锁进阶 (d=${step.dist})`}
                              </span>
                              <span className="font-serif text-[11px] font-bold text-[var(--ink)] truncate max-w-[150px]">
                                {stepTitleZH}
                              </span>
                            </div>
                            {stepTitleDE && (
                              <div
                                className="font-mono text-[8.5px] text-[var(--gray)] truncate max-w-[200px]"
                                title={stepTitleDE}
                              >
                                {`DE · ${stepTitleDE}`}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* 状态徽标 */}
                        <div className="shrink-0 flex items-center">
                          {isStepMastered ? (
                            <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded-[var(--radius)] font-mono text-[8px] bg-[var(--ink)] text-[var(--surface)]">
                              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                                <path d="M2 5l2.5 2.5 4-5" stroke="currentColor" strokeWidth="1.4" />
                              </svg>
                              <span>{de ? "Gekonnt" : "已掌握"}</span>
                            </span>
                          ) : isStepAvailable ? (
                            <span className="inline-flex items-center px-1 py-0.5 rounded-[var(--radius)] font-mono text-[8px] border border-[var(--ink)] text-[var(--ink)]">
                              {de ? "Bereit" : "可学"}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-0.5 px-1 py-0.5 rounded-[var(--radius)] font-mono text-[8px] border border-[var(--line)] text-[var(--gray)]">
                              <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                                <rect x="2" y="4" width="6" height="5" rx="1" stroke="currentColor" strokeWidth="1.1" />
                                <path d="M3.5 4V2.5a1.5 1.5 0 0 1 3 0V4" stroke="currentColor" strokeWidth="1.1" />
                              </svg>
                              <span>{de ? "Gesperrt" : "锁定"}</span>
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 核心概念因果推演 */}
            {(activeNode.summaryZH || activeNode.summaryDE) && (
              <div className="space-y-1">
                <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--gray)] font-semibold">
                  {de ? "Konzept & Kausalität" : "核心概念与因果推演"}
                </div>
                {activeNode.summaryZH && (
                  <p className="text-[var(--ink)]">{activeNode.summaryZH}</p>
                )}
                {activeNode.summaryDE && (
                  <p className="text-[var(--gray)] font-mono text-[11px]">{activeNode.summaryDE}</p>
                )}
              </div>
            )}

            {/* 15 Notenpunkte 得分核心句 */}
            {activeNode.keyFormulaOrSentence && (
              <div className="p-2.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-[var(--radius)] space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider font-bold text-[var(--ink)]">
                  {de ? "15 NP Klausursatz / Formel" : "15 NP 会考得分核心句 / 公式"}
                </div>
                <div className="font-mono text-[11px] text-[var(--ink)] select-all">
                  {activeNode.keyFormulaOrSentence}
                </div>
              </div>
            )}

            {/* 典型易错误区 */}
            {activeNode.commonFallacy && (
              <div className="p-2.5 border border-dashed border-[var(--line)] rounded-[var(--radius)] space-y-1">
                <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--gray)] font-bold">
                  {de ? "Typische Fehlvorstellung" : "典型易错误区 (Fehlvorstellung)"}
                </div>
                <p className="text-[11px] text-[var(--gray)]">
                  {activeNode.commonFallacy}
                </p>
              </div>
            )}

            {/* 多维标签与管理 */}
            <div className="space-y-1.5 pt-2 border-t border-[var(--line)]">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--gray)] font-semibold">
                {de ? "Tags & Markierungen" : "多维标记与标签"}
              </div>
              <div className="flex flex-wrap items-center gap-1">
                {activeNode.tags && activeNode.tags.length > 0 ? (
                  activeNode.tags.map((t) => (
                    <span
                      key={t}
                      className="inline-flex items-center gap-1 px-1.5 py-0.5 border border-[var(--line)] bg-[var(--surface)] text-[10px] font-mono text-[var(--ink)] rounded-[var(--radius)]"
                    >
                      {t}
                      <button
                        type="button"
                        onClick={() => handleRemoveInlineTag(t)}
                        className="text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                        title="删除标签"
                      >
                        x
                      </button>
                    </span>
                  ))
                ) : (
                  <span className="text-[11px] text-[var(--gray)] font-mono">
                    {de ? "Keine Tags vergeben." : "暂无标签"}
                  </span>
                )}
              </div>
              {/* 快捷增添标签输入框 */}
              <div className="flex items-center gap-1 mt-1">
                <input
                  type="text"
                  value={inlineNewTag}
                  onChange={(e) => setInlineNewTag(e.target.value)}
                  placeholder={de ? "Neuer Tag..." : "新标签名称..."}
                  className="flex-1 p-1 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] text-[11px] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddInlineTag();
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddInlineTag}
                  disabled={!inlineNewTag.trim()}
                  className="px-2 py-1 bg-[var(--ink)] text-[var(--surface)] rounded-[var(--radius)] text-[11px] font-mono hover:opacity-90 disabled:opacity-40 cursor-pointer"
                >
                  +
                </button>
              </div>
            </div>

            {/* 学习动作与原生资源直达 */}
            <div className="space-y-2 pt-2 border-t border-[var(--line)]">
              <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--gray)] font-semibold">
                {de ? "Lernressourcen & Aktionen" : "学习资源与直达动作"}
              </div>

              <div className="grid grid-cols-1 gap-1.5">
                <button
                  type="button"
                  onClick={() => toggleMastered(activeNode.id)}
                  className={`w-full py-1.5 px-3 rounded-[var(--radius)] font-mono text-xs font-bold transition-all cursor-pointer ${
                    activeNodeStatus === "mastered"
                      ? "border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--paper-subtle)]"
                      : "bg-[var(--ink)] text-[var(--surface)] hover:opacity-90"
                  }`}
                >
                  {activeNodeStatus === "mastered"
                    ? de ? "Status: Gekonnt (Zurücksetzen)" : "已掌握 (点击撤销)"
                    : de ? "Als 'Gekonnt' markieren" : "标记已掌握"}
                </button>

                {activeNode.linkedReiseId && (
                  <button
                    type="button"
                    onClick={() => onStartCourse?.(activeNode.linkedReiseId!)}
                    className="w-full py-1.5 px-3 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] font-mono text-xs flex items-center justify-between hover:bg-[var(--paper-subtle)] transition-colors cursor-pointer"
                  >
                    <span>{de ? "Lernreise starten" : "启动探究式微课"}</span>
                    <span className="text-[var(--gray)] text-[10px] font-mono">
                      {activeNode.linkedReiseId}
                    </span>
                  </button>
                )}

                {activeNode.linkedNoteId && (
                  <button
                    type="button"
                    onClick={() => onOpenNote?.(activeNode.linkedNoteId!)}
                    className="w-full py-1.5 px-3 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] font-mono text-xs flex items-center justify-between hover:bg-[var(--paper-subtle)] transition-colors cursor-pointer"
                  >
                    <span>{de ? "Wissensnotiz öffnen" : "研读八段式笔记"}</span>
                    <span className="text-[var(--gray)] text-[10px] font-mono truncate max-w-[150px]">
                      {activeNode.linkedNoteId.split("/").pop()}
                    </span>
                  </button>
                )}

                {activeNode.linkedToolId && (
                  <button
                    type="button"
                    onClick={() => onOpenTool?.(activeNode.linkedToolId!)}
                    className="w-full py-1.5 px-3 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)] font-mono text-xs flex items-center justify-between hover:bg-[var(--paper-subtle)] transition-colors cursor-pointer"
                  >
                    <span>{de ? "Laborwerkzeug öffnen" : "启动仿真实验室"}</span>
                    <span className="text-[var(--gray)] text-[10px] font-mono">
                      {activeNode.linkedToolId}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* 节点高级管理：编辑与删除 */}
            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-xs font-mono">
              <button
                type="button"
                onClick={() => openEditNodeModal(activeNode)}
                className="text-[var(--gray)] hover:text-[var(--ink)] underline cursor-pointer"
              >
                {de ? "Knoten bearbeiten" : "编辑此节点属性"}
              </button>
              <button
                type="button"
                onClick={handleDeleteSelectedNode}
                className="text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
              >
                {de ? "Löschen" : "删除节点"}
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* 弹窗：拼插 / 编辑知识点 Modal */}
      {isNodeModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] border border-[var(--line)] p-5 rounded-[var(--radius)] max-w-lg w-full space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
              <h3 className="font-serif text-base font-bold text-[var(--ink)]">
                {nodeModalMode === "add"
                  ? de ? "Neuen Wissensknoten anfügen" : "拼插新知识点 (Hot-Pluggable Node)"
                  : de ? "Wissensknoten bearbeiten" : "编辑知识点属性"}
              </h3>
              <button
                type="button"
                onClick={() => setIsNodeModalOpen(false)}
                className="font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                aria-label={de ? "Schließen" : "关闭"}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--gray)] mb-1">
                    {de ? "Chinesischer Titel:" : "知识点中文名称 (必填):"}
                  </label>
                  <input
                    type="text"
                    value={formTitleZH}
                    onChange={(e) => setFormTitleZH(e.target.value)}
                    placeholder="例如: 货币传导机制与凯恩斯陷阱"
                    className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--gray)] mb-1">
                    {de ? "Deutscher Fachbegriff:" : "德语考纲规范术语 (必填):"}
                  </label>
                  <input
                    type="text"
                    value={formTitleDE}
                    onChange={(e) => setFormTitleDE(e.target.value)}
                    placeholder="z.B. Transmissionsmechanismus"
                    className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--gray)] mb-1">
                    {de ? "Kategorie / Bereich:" : "核心分类星区:"}
                  </label>
                  <input
                    type="text"
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    placeholder="例如: Mikrooekonomie / Analysis"
                    className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                  />
                </div>
                <div>
                  <label className="block text-[var(--gray)] mb-1">
                    {de ? "Schulstufe (Tier):" : "学段分级 (Tier):"}
                  </label>
                  <select
                    value={formCurriculumTier}
                    onChange={(e) => setFormCurriculumTier(e.target.value as CurriculumTier)}
                    className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                  >
                    <option value="Sek_I">Sek I (初中基础)</option>
                    <option value="EF">EF (高一导入)</option>
                    <option value="Q1">Q1 (高二核心)</option>
                    <option value="Q2">Q2 (高三冲刺/会考)</option>
                    <option value="Uni_Prep">Uni_Prep (大学先修)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[var(--gray)] mb-1">
                    {de ? "AFB-Stufe:" : "AFB 认知难度:"}
                  </label>
                  <select
                    value={formLevel}
                    onChange={(e) => setFormLevel(Number(e.target.value) as CognitiveLevel)}
                    className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                  >
                    <option value={1}>AFB I (基础识记)</option>
                    <option value={2}>AFB II (机制分析)</option>
                    <option value={3}>AFB III (会考评价)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[var(--gray)] mb-1">
                    {de ? "Lernphase:" : "流程进阶阶段:"}
                  </label>
                  <select
                    value={formStage}
                    onChange={(e) => setFormStage(e.target.value as LearningStage)}
                    className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                  >
                    <option value="einfuehrung">Einführung (导入)</option>
                    <option value="grundlagen">Grundlagen (基础)</option>
                    <option value="vertiefung">Vertiefung (深化)</option>
                    <option value="klausur_praxis">Klausur (实战)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "Voraussetzung (Optional):" : "选择前置依赖知识点 (可选):"}
                </label>
                <select
                  value={formPrereqId}
                  onChange={(e) => setFormPrereqId(e.target.value)}
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                >
                  <option value="">{de ? "Keine (Wurzelknoten)" : "无前置依赖 (作为起始根节点)"}</option>
                  {activeGraph.nodes.map((n) => (
                    <option key={n.id} value={n.id}>
                      {`${n.titleZH} (${n.titleDE})`}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "15 NP Klausursatz / Formel:" : "15 NP 会考得分核心句 / 公式 (可选):"}
                </label>
                <input
                  type="text"
                  value={formKeyFormula}
                  onChange={(e) => setFormKeyFormula(e.target.value)}
                  placeholder="可在试卷中直接引用的德语答卷句式或数学公式"
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                />
              </div>

              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "Typische Fehlvorstellung:" : "典型易错误区 (Fehlvorstellung) (可选):"}
                </label>
                <input
                  type="text"
                  value={formCommonFallacy}
                  onChange={(e) => setFormCommonFallacy(e.target.value)}
                  placeholder="学生最容易混淆的失分陷阱"
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                />
              </div>

              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "Tags (kommagetrennt):" : "自定义多维标签 (逗号分隔):"}
                </label>
                <input
                  type="text"
                  value={formTagsStr}
                  onChange={(e) => setFormTagsStr(e.target.value)}
                  placeholder="例如: Inflation, EZB, Abitur-2026, Uni-Prep"
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => setIsNodeModalOpen(false)}
                className="px-3 py-1.5 border border-[var(--line)] rounded-[var(--radius)] text-xs font-mono hover:bg-[var(--paper-subtle)] cursor-pointer"
              >
                {de ? "Abbrechen" : "取消"}
              </button>
              <button
                type="button"
                onClick={handleSaveNodeSubmit}
                disabled={!formTitleZH.trim() || !formTitleDE.trim()}
                className="px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-[var(--radius)] text-xs font-mono font-bold hover:opacity-90 disabled:opacity-40 cursor-pointer"
              >
                {nodeModalMode === "add" ? (de ? "Einfügen" : "确认拼插") : (de ? "Speichern" : "保存修改")}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 弹窗：开辟新增自定义学科板块 */}
      {isAddSubjectOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] border border-[var(--line)] p-5 rounded-[var(--radius)] max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
              <h3 className="font-serif text-base font-bold text-[var(--ink)]">
                {de ? "Neues Fachgebiet anlegen" : "开辟新学科板块 (Fach-Erweiterung)"}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddSubjectOpen(false)}
                className="font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                aria-label={de ? "Schließen" : "关闭"}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "Fach-ID (z.B. Informatik):" : "学科英文唯一代码 (如 Informatik):"}
                </label>
                <input
                  type="text"
                  value={newSubjectId}
                  onChange={(e) => setNewSubjectId(e.target.value)}
                  placeholder="z.B. Informatik"
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                />
              </div>

              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "Deutscher Name:" : "德语学科名称:"}
                </label>
                <input
                  type="text"
                  value={newSubjectNameDE}
                  onChange={(e) => setNewSubjectNameDE(e.target.value)}
                  placeholder="Informatik"
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                />
              </div>

              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "Chinesischer Name:" : "中文学科名称:"}
                </label>
                <input
                  type="text"
                  value={newSubjectNameZH}
                  onChange={(e) => setNewSubjectNameZH(e.target.value)}
                  placeholder="计算机科学"
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => setIsAddSubjectOpen(false)}
                className="px-3 py-1.5 border border-[var(--line)] rounded-[var(--radius)] text-xs font-mono hover:bg-[var(--paper-subtle)] cursor-pointer"
              >
                {de ? "Abbrechen" : "取消"}
              </button>
              <button
                type="button"
                onClick={handleAddSubjectSubmit}
                disabled={!newSubjectId.trim() || !newSubjectNameZH.trim()}
                className="px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-[var(--radius)] text-xs font-mono font-bold hover:opacity-90 disabled:opacity-40 cursor-pointer"
              >
                {de ? "Fach anlegen" : "创建学科"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 弹窗：JSON 导入与导出 Modal */}
      {isJsonModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] border border-[var(--line)] p-5 rounded-[var(--radius)] max-w-2xl w-full space-y-4 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2 shrink-0">
              <h3 className="font-serif text-base font-bold text-[var(--ink)]">
                {de ? "Wissensgraph JSON Importer / Exporter" : "知识图谱与技能树 JSON 导入与导出中心"}
              </h3>
              <button
                type="button"
                onClick={() => setIsJsonModalOpen(false)}
                className="font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                aria-label={de ? "Schließen" : "关闭"}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>

            <p className="text-xs text-[var(--gray)] font-mono shrink-0">
              {de
                ? "Kopieren Sie das JSON für externe KI-Agenten oder fügen Sie generierte Daten ein."
                : "可将当前学科导出复制给外部 AI，或直接将外部大模型批量生成的图谱 JSON 粘贴至下方进行自动质量校验与导入。"}
            </p>

            <div className="flex-1 min-h-[260px] flex flex-col">
              <textarea
                value={jsonText}
                onChange={(e) => {
                  setJsonText(e.target.value);
                  setJsonFeedback(null);
                }}
                placeholder="在此粘贴符合契约规范的 JSON 数据..."
                className="w-full flex-1 p-3 border border-[var(--line)] bg-[var(--paper-subtle)] rounded-[var(--radius)] font-mono text-[11px] text-[var(--ink)] resize-none focus:outline-none focus:border-[var(--ink)] select-all"
              />
            </div>

            {jsonFeedback && (
              <div
                className={`p-2.5 rounded-[var(--radius)] text-xs font-mono border ${
                  jsonFeedback.type === "success"
                    ? "border-[var(--ink)] bg-[var(--surface)] text-[var(--ink)]"
                    : "border-red-500 bg-red-50 text-red-900"
                }`}
              >
                {jsonFeedback.text}
              </div>
            )}

            <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] shrink-0">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(jsonText);
                  setJsonFeedback({ type: "success", text: "已复制当前 JSON 到剪贴板！" });
                }}
                className="px-3 py-1.5 border border-[var(--line)] rounded-[var(--radius)] text-xs font-mono hover:bg-[var(--paper-subtle)] cursor-pointer"
              >
                {de ? "In Zwischenablage kopieren" : "复制当前 JSON"}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsJsonModalOpen(false)}
                  className="px-3 py-1.5 border border-[var(--line)] rounded-[var(--radius)] text-xs font-mono hover:bg-[var(--paper-subtle)] cursor-pointer"
                >
                  {de ? "Schließen" : "关闭"}
                </button>
                <button
                  type="button"
                  onClick={handleImportJson}
                  className="px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-[var(--radius)] text-xs font-mono font-bold hover:opacity-90 cursor-pointer"
                >
                  {de ? "Prüfen & Importieren" : "校验并导入图谱"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 弹窗：挂载外部资源 (拆书/网页抓取预留) */}
      {isAttachResourceOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-[var(--surface)] border border-[var(--line)] p-5 rounded-[var(--radius)] max-w-sm w-full space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
              <h3 className="font-serif text-base font-bold text-[var(--ink)]">
                {de ? "Externe Ressource anheften" : "挂载外部资料 / 拆书信息"}
              </h3>
              <button
                type="button"
                onClick={() => setIsAttachResourceOpen(false)}
                className="font-mono text-xs text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
                aria-label={de ? "Schließen" : "关闭"}
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 3l10 10M13 3L3 13" />
                </svg>
              </button>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "Titel der Quelle:" : "资料标题 / 章节名称 (必填):"}
                </label>
                <input
                  type="text"
                  value={resTitle}
                  onChange={(e) => setResTitle(e.target.value)}
                  placeholder="例如: bpb 专题分析 / 教材第4章"
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                />
              </div>

              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "URL oder Pfad:" : "网页 URL 或本地文件相对路径:"}
                </label>
                <input
                  type="text"
                  value={resUrl}
                  onChange={(e) => setResUrl(e.target.value)}
                  placeholder="https://... 或 _Downloads/..."
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)]"
                />
              </div>

              <div>
                <label className="block text-[var(--gray)] mb-1">
                  {de ? "Kurzbeschreibung:" : "要点总结说明:"}
                </label>
                <textarea
                  value={resSummary}
                  onChange={(e) => setResSummary(e.target.value)}
                  placeholder="核心观点或章节对应内容摘要"
                  rows={3}
                  className="w-full p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[var(--radius)] text-xs text-[var(--ink)] resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => setIsAttachResourceOpen(false)}
                className="px-3 py-1.5 border border-[var(--line)] rounded-[var(--radius)] text-xs font-mono hover:bg-[var(--paper-subtle)] cursor-pointer"
              >
                {de ? "Abbrechen" : "取消"}
              </button>
              <button
                type="button"
                onClick={handleAttachResourceSubmit}
                disabled={!resTitle.trim()}
                className="px-3 py-1.5 bg-[var(--ink)] text-[var(--surface)] rounded-[var(--radius)] text-xs font-mono font-bold hover:opacity-90 disabled:opacity-40 cursor-pointer"
              >
                {de ? "Verknüpfen" : "确认挂载"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
