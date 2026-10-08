import { useState, useMemo, useCallback, useRef } from "react";
import type { Lang } from "../i18n";
import {
  graphRegistry,
  computeGraphUnlockStates,
  topologicalSort,
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

// 阶梯树模式常量
const TREE_BOX_WIDTH = 190;
const TREE_BOX_HEIGHT = 76;
const TREE_LAYER_STEP_X = 250;
const TREE_LAYER_STEP_Y = 130;

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
      return planetaryGraph.nodes.map((n) => ({
        ...n,
        x: n.coordinates?.x ?? PLANETARY_CENTER_X,
        y: n.coordinates?.y ?? PLANETARY_CENTER_Y,
      }));
    }

    // 阶梯树模式 (Tree View)
    const topo = topologicalSort(activeGraph);
    const orderMap = new Map<string, number>();
    topo.sortedNodeIds.forEach((id, idx) => orderMap.set(id, idx));

    const layerMap = new Map<string, number>();
    for (const node of activeGraph.nodes) {
      if (node.coordinates && !node.radialPosition) {
        continue;
      }
      let maxPreLayer = -1;
      for (const preId of node.prerequisites) {
        const pLayer = layerMap.get(preId) ?? 0;
        if (pLayer > maxPreLayer) maxPreLayer = pLayer;
      }
      layerMap.set(node.id, maxPreLayer + 1);
    }

    const layerGroups = new Map<number, KnowledgeNode[]>();
    for (const node of activeGraph.nodes) {
      const layer = node.layerIndex ?? layerMap.get(node.id) ?? 0;
      const group = layerGroups.get(layer) ?? [];
      group.push(node);
      layerGroups.set(layer, group);
    }

    const result: (KnowledgeNode & { x: number; y: number })[] = [];
    layerGroups.forEach((nodesInLayer, layer) => {
      nodesInLayer.forEach((node, idx) => {
        const x = node.coordinates && !node.radialPosition ? node.coordinates.x : 80 + layer * TREE_LAYER_STEP_X;
        const y = node.coordinates && !node.radialPosition ? node.coordinates.y : 80 + idx * TREE_LAYER_STEP_Y;
        result.push({ ...node, x, y });
      });
    });

    return result;
  }, [viewMode, activeGraph, planetaryGraph]);

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

  // 连线平滑路径计算 (行星模式 vs 树模式)
  const renderedEdges = useMemo(() => {
    return activeGraph.edges.map((edge) => {
      const fromNode = nodeMap.get(edge.from);
      const toNode = nodeMap.get(edge.to);
      if (!fromNode || !toNode) return null;

      const fromMastered = masteredIds.has(edge.from);
      const toUnlocked = unlockStates.get(edge.to) !== "locked";
      const isPathActive = fromMastered && toUnlocked;

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

        const pathData = `M ${x1} ${y1} Q ${mx + normalX} ${my + normalY}, ${x2} ${y2}`;

        return {
          id: edge.id,
          pathData,
          isPathActive,
          type: edge.type,
        };
      }

      // 树形模式
      const x1 = fromNode.x + TREE_BOX_WIDTH;
      const y1 = fromNode.y + TREE_BOX_HEIGHT / 2;
      const x2 = toNode.x;
      const y2 = toNode.y + TREE_BOX_HEIGHT / 2;

      const dx = Math.max(40, (x2 - x1) * 0.5);
      const cx1 = x1 + dx;
      const cy1 = y1;
      const cx2 = x2 - dx;
      const cy2 = y2;

      const pathData = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

      return {
        id: edge.id,
        pathData,
        isPathActive,
        type: edge.type,
      };
    }).filter(Boolean) as { id: string; pathData: string; isPathActive: boolean; type: string }[];
  }, [activeGraph.edges, nodeMap, masteredIds, unlockStates, viewMode]);

  // 画布视口拖拽
  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if ((e.target as HTMLElement).closest("[data-clickable-node]")) return;
    isDraggingRef.current = true;
    dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDraggingRef.current) return;
    setPan({
      x: e.clientX - dragStartRef.current.x,
      y: e.clientY - dragStartRef.current.y,
    });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // 一键重新引力排布
  const handleAutoPlanetaryLayout = () => {
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
    const created = graphRegistry.createCustomSubject(
      cleanId,
      newSubjectNameDE.trim() || cleanId,
      newSubjectNameZH.trim()
    );
    setSelectedFach(cleanId);
    setActiveGraph(created);
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
      {/* 顶部主控制栏：学科选择、进度、模式切换与操作 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--line)] px-4 py-2 bg-[var(--surface)] shrink-0 gap-2 z-10">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs text-[var(--gray)] font-medium">
            {de ? "Fach:" : "学科:"}
          </span>
          <div className="flex items-center gap-1 overflow-x-auto max-w-[420px] no-scrollbar">
            {graphRegistry.listSubjects().map((sub) => {
              const isSelected = selectedFach.toLowerCase() === sub.fach.toLowerCase();
              return (
                <button
                  key={sub.fach}
                  type="button"
                  onClick={() => handleSelectFach(sub.fach)}
                  aria-pressed={isSelected}
                  className={`px-2.5 py-1 rounded-[var(--radius)] text-xs font-mono transition-all cursor-pointer ${
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
            onClick={() => setIsAddSubjectOpen(true)}
            className="flex items-center gap-1 px-2 py-1 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] text-xs font-mono text-[var(--gray)] hover:text-[var(--ink)] transition-colors cursor-pointer"
            title={de ? "Neues Fach anlegen" : "新增学科板块"}
          >
            <svg {...iconProps}>
              <path d="M8 3.5v9M3.5 8h9" />
            </svg>
            <span>{de ? "+ Fach" : "+ 学科"}</span>
          </button>
        </div>

        {/* 右侧：模式切换、进度与操作动作 */}
        <div className="flex items-center gap-3 text-xs font-mono">
          {/* 视图模式切换 */}
          <div className="flex items-center border border-[var(--line)] rounded-[var(--radius)] overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode("planetary")}
              aria-pressed={viewMode === "planetary"}
              className={`px-2.5 py-1 text-xs cursor-pointer transition-colors ${
                viewMode === "planetary"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              {de ? "Planeten-Orbit" : "行星引力星系"}
            </button>
            <button
              type="button"
              onClick={() => setViewMode("tree")}
              aria-pressed={viewMode === "tree"}
              className={`px-2.5 py-1 text-xs cursor-pointer transition-colors border-l border-[var(--line)] ${
                viewMode === "tree"
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "bg-[var(--surface)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              {de ? "Stufenbaum" : "认知阶梯树"}
            </button>
          </div>

          {/* 学习进度 */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-bold tabular-nums">
              {progressSummary.masteredNodes}/{progressSummary.totalNodes} ({progressSummary.progressPercent}%)
            </span>
            <div className="w-14 h-1.5 bg-[var(--line)] rounded-full overflow-hidden">
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
              className="flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius)] bg-[var(--ink)] text-[var(--surface)] text-xs font-mono hover:opacity-90 transition-opacity cursor-pointer"
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
                className="px-2 py-1 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] text-xs text-[var(--ink)] hover:bg-[var(--paper-subtle)] cursor-pointer"
                title={de ? "Planeten automatisch anordnen" : "一键引力自动排布"}
              >
                {de ? "Auto-Layout" : "一键引力排布"}
              </button>
            )}

            <button
              type="button"
              onClick={openJsonModal}
              className="px-2 py-1 rounded-[var(--radius)] border border-[var(--line)] hover:border-[var(--ink)] text-xs text-[var(--ink)] hover:bg-[var(--paper-subtle)] cursor-pointer"
              title={de ? "JSON Import / Export" : "导入或导出 JSON"}
            >
              JSON
            </button>

            {/* 缩放控制器 */}
            <div className="flex items-center border border-[var(--line)] rounded-[var(--radius)] overflow-hidden">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(2.0, +(z + 0.15).toFixed(2)))}
                className="px-2 py-1 text-xs hover:bg-[var(--paper-subtle)] border-r border-[var(--line)] cursor-pointer"
                title={de ? "Vergrößern" : "放大"}
              >
                +
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.5, +(z - 0.15).toFixed(2)))}
                className="px-2 py-1 text-xs hover:bg-[var(--paper-subtle)] border-r border-[var(--line)] cursor-pointer"
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
                className="px-2 py-1 text-[11px] hover:bg-[var(--paper-subtle)] cursor-pointer"
                title={de ? "Zurücksetzen" : "重置"}
              >
                1:1
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 二级筛选栏：分类星区 Chips、多维标签 Filter 与全文快速检索 */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--line)] px-4 py-1.5 bg-[var(--paper-subtle)] text-xs font-mono gap-2 z-10 shrink-0">
        {/* 分类星区筛选 Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-[620px] no-scrollbar">
          <span className="text-[var(--gray)] font-medium shrink-0">
            {de ? "Bereich:" : "星区分类:"}
          </span>
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`px-2 py-0.5 rounded-[var(--radius)] text-[11px] cursor-pointer transition-colors ${
              selectedCategory === "ALL"
                ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                : "border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink)]"
            }`}
          >
            {de ? "Alle" : "全部分类"}
          </button>
          {categoriesList.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-2 py-0.5 rounded-[var(--radius)] text-[11px] cursor-pointer transition-colors ${
                selectedCategory === cat
                  ? "bg-[var(--ink)] text-[var(--surface)] font-bold"
                  : "border border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 标签过滤与搜索 */}
        <div className="flex items-center gap-2">
          {tagsList.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-[var(--gray)] text-[11px] shrink-0">
                {de ? "Tag:" : "标签:"}
              </span>
              <select
                value={selectedTag}
                onChange={(e) => setSelectedTag(e.target.value)}
                className="p-1 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] text-[11px] text-[var(--ink)]"
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

          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={de ? "Suchen (Titel, Formel...)" : "搜索知识点/公式/考点..."}
              className="pl-2 pr-6 py-0.5 border border-[var(--line)] rounded-[var(--radius)] bg-[var(--surface)] text-[11px] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)] w-40"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[10px] text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
              >
                x
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SVG 主画布 */}
      <div className="relative flex-1 w-full h-full cursor-grab active:cursor-grabbing select-none overflow-hidden">
        <svg
          className="w-full h-full"
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

                {/* 1.5 分类星区分界射线与外缘星域标题 (Constellation Sectors) */}
                {categoriesList.map((cat, idx) => {
                  const sectorSpan = 360 / Math.max(1, categoriesList.length);
                  const angleDeg = idx * sectorSpan;
                  const rad = (angleDeg * Math.PI) / 180;
                  const maxR = 730;
                  const rayX = PLANETARY_CENTER_X + maxR * Math.cos(rad);
                  const rayY = PLANETARY_CENTER_Y + maxR * Math.sin(rad);

                  // 扇区标题位置 (在扇形中央外缘)
                  const midAngleDeg = angleDeg + sectorSpan / 2;
                  const midRad = (midAngleDeg * Math.PI) / 180;
                  const labelR = 705;
                  const labelX = PLANETARY_CENTER_X + labelR * Math.cos(midRad);
                  const labelY = PLANETARY_CENTER_Y + labelR * Math.sin(midRad);

                  return (
                    <g key={`sector-${cat}`}>
                      <line
                        x1={PLANETARY_CENTER_X}
                        y1={PLANETARY_CENTER_Y}
                        x2={rayX}
                        y2={rayY}
                        stroke="var(--ink)"
                        strokeWidth="0.9"
                        strokeDasharray="4 4"
                        opacity="0.6"
                      />
                      <g transform={`translate(${labelX}, ${labelY})`}>
                        <rect
                          x={-64}
                          y={-12}
                          width={128}
                          height={24}
                          rx="12"
                          fill="var(--surface)"
                          stroke="var(--ink)"
                          strokeWidth="1.2"
                        />
                        <text
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontFamily="serif"
                          fontSize="11"
                          fontWeight="bold"
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

            {/* 2. 渲染引力与拓扑连线 (Edges) */}
            {renderedEdges.map((edge) => (
              <path
                key={edge.id}
                d={edge.pathData}
                fill="none"
                stroke={edge.isPathActive ? "var(--ink)" : "var(--line)"}
                strokeWidth={edge.isPathActive ? 1.8 : 1.1}
                strokeDasharray={
                  edge.type === "synergy"
                    ? "3,3"
                    : edge.isPathActive
                    ? "none"
                    : "4,4"
                }
                markerEnd={
                  viewMode === "planetary"
                    ? edge.isPathActive
                      ? "url(#grav-arrow-active)"
                      : "url(#grav-arrow-muted)"
                    : undefined
                }
                className="transition-colors duration-300"
              />
            ))}

            {/* 3. 渲染知识点卡片/行星节点 */}
            {layoutedNodes.map((node) => {
              const status: SkillNodeStatus = unlockStates.get(node.id) ?? "locked";
              const isSelected = selectedNodeId === node.id;
              const isMastered = status === "mastered";
              const isAvailable = status === "available";
              const isLocked = status === "locked";
              const isMatched = isNodeMatchingFilter(node);

              if (viewMode === "planetary") {
                const cx = node.x;
                const cy = node.y;

                // 判定知识点位于星盘左侧或右侧（外向辐射排布）
                const isLeft = cx < PLANETARY_CENTER_X - 10;
                const cardW = 168;
                const cardH = 50;
                const cardX = isLeft ? -24 - cardW : 24;
                const cardY = -cardH / 2;

                const displayTitleZH =
                  node.titleZH.length > 15 ? `${node.titleZH.slice(0, 14)}…` : node.titleZH;
                const displayTitleDE =
                  node.titleDE.length > 21 ? `${node.titleDE.slice(0, 20)}…` : node.titleDE;

                return (
                  <g
                    key={node.id}
                    transform={`translate(${cx}, ${cy})`}
                    data-clickable-node="true"
                    data-testid={`skill-node-${node.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNodeId(node.id);
                    }}
                    className="cursor-pointer group transition-opacity duration-200"
                    style={{
                      transformOrigin: `${cx}px ${cy}px`,
                      transformBox: "view-box",
                      opacity: isMatched ? 1.0 : 0.22,
                    }}
                  >
                    {/* A. 知识点星体核心 (Planetary Body Orb) */}
                    <g className="planetary-orb">
                      {/* 大气层星晕光环 (Atmospheric Halo) */}
                      <circle
                        r="21"
                        fill="none"
                        stroke={
                          isSelected
                            ? "var(--ink)"
                            : isMastered
                            ? "var(--ink)"
                            : isAvailable
                            ? "var(--ink)"
                            : "var(--line)"
                        }
                        strokeWidth={isSelected ? 1.5 : isMastered ? 1.2 : isAvailable ? 1.4 : 0.8}
                        strokeDasharray={isAvailable ? "3 2" : isLocked ? "2 3" : "none"}
                        opacity={isLocked ? 0.5 : 0.85}
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
                        fill={isMastered ? "var(--ink)" : "var(--surface)"}
                        stroke={
                          isSelected
                            ? "var(--ink)"
                            : isMastered
                            ? "var(--ink)"
                            : isAvailable
                            ? "var(--ink)"
                            : "var(--line)"
                        }
                        strokeWidth={isSelected ? 2.2 : isAvailable ? 1.8 : 1.0}
                        className="transition-all duration-150 group-hover:stroke-[var(--ink)]"
                      />

                      {/* 星核状态微标 */}
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
                      {/* 标牌底板 */}
                      <rect
                        x={cardX}
                        y={cardY}
                        width={cardW}
                        height={cardH}
                        rx="5"
                        fill="var(--surface)"
                        stroke={
                          isSelected
                            ? "var(--ink)"
                            : isAvailable
                            ? "var(--ink)"
                            : isMastered
                            ? "var(--ink)"
                            : "var(--line)"
                        }
                        strokeWidth={isSelected ? 2.0 : isAvailable ? 1.4 : 1.0}
                        strokeDasharray={isLocked ? "3 2" : "none"}
                        className="transition-all duration-150 group-hover:stroke-[var(--ink)]"
                      />

                      {/* 选中态星盘十字准星定位线 (Reticle Corner Brackets) */}
                      {isSelected && (
                        <g stroke="var(--ink)" strokeWidth="1.5" fill="none">
                          <path d={`M ${cardX + 2} ${cardY + 8} L ${cardX + 2} ${cardY + 2} L ${cardX + 8} ${cardY + 2}`} />
                          <path d={`M ${cardX + cardW - 8} ${cardY + 2} L ${cardX + cardW - 2} ${cardY + 2} L ${cardX + cardW - 2} ${cardY + 8}`} />
                          <path d={`M ${cardX + 2} ${cardY + cardH - 8} L ${cardX + 2} ${cardY + cardH - 2} L ${cardX + 8} ${cardY + cardH - 2}`} />
                          <path d={`M ${cardX + cardW - 8} ${cardY + cardH - 2} L ${cardX + cardW - 2} ${cardY + cardH - 2} L ${cardX + cardW - 2} ${cardY + cardH - 8}`} />
                        </g>
                      )}

                      {/* 第一行：学段难度 Pill 标牌与预计耗时 */}
                      <rect
                        x={cardX + 8}
                        y={cardY + 6}
                        width={60}
                        height={13}
                        rx="2"
                        fill="var(--paper-subtle)"
                        stroke="var(--line)"
                        strokeWidth="0.6"
                      />
                      <text
                        x={cardX + 38}
                        y={cardY + 15}
                        textAnchor="middle"
                        fontFamily="monospace"
                        fontSize="8"
                        fontWeight="bold"
                        fill="var(--ink)"
                      >
                        {`${node.curriculumTier ?? "EF"} · AFB ${node.level === 1 ? "I" : node.level === 2 ? "II" : "III"}`}
                      </text>
                      <text
                        x={cardX + cardW - 8}
                        y={cardY + 15}
                        textAnchor="end"
                        fontFamily="monospace"
                        fontSize="8"
                        fill="var(--gray)"
                      >
                        {`~${node.estimatedMinutes}m`}
                      </text>

                      {/* 第二行：中文典范知识点名称 */}
                      <text
                        x={cardX + 8}
                        y={cardY + 30.5}
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
                        y={cardY + 43}
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

              // 树形模式卡片
              const cx = node.x + TREE_BOX_WIDTH / 2;
              const cy = node.y + TREE_BOX_HEIGHT / 2;

              return (
                <g
                  key={node.id}
                  transform={`translate(${node.x}, ${node.y})`}
                  data-clickable-node="true"
                  data-testid={`skill-node-${node.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedNodeId(node.id);
                  }}
                  className="cursor-pointer group transition-opacity duration-200"
                  style={{
                    transformOrigin: `${cx}px ${cy}px`,
                    transformBox: "view-box",
                    opacity: isMatched ? 1.0 : 0.25,
                  }}
                >
                  <rect
                    width={TREE_BOX_WIDTH}
                    height={TREE_BOX_HEIGHT}
                    rx="4"
                    fill="var(--surface)"
                    stroke={
                      isSelected
                        ? "var(--ink)"
                        : isAvailable
                        ? "var(--ink)"
                        : isMastered
                        ? "var(--ink)"
                        : "var(--line)"
                    }
                    strokeWidth={isSelected ? 2.2 : isAvailable ? 1.6 : 1.0}
                    strokeDasharray={isLocked ? "3,3" : "none"}
                    className="transition-all duration-150 group-hover:stroke-[var(--ink)]"
                  />

                  <g transform="translate(10, 16)">
                    {isMastered && (
                      <path
                        d="M0 4 L3.5 7.5 L9 1"
                        fill="none"
                        stroke="var(--ink)"
                        strokeWidth="1.6"
                      />
                    )}
                    {isAvailable && (
                      <circle cx="4" cy="4" r="3" fill="var(--ink)" />
                    )}
                    {isLocked && (
                      <g transform="translate(0, -1)">
                        <rect x="1" y="4" width="7" height="5" rx="1" fill="none" stroke="var(--gray)" strokeWidth="1.2" />
                        <path d="M2.5 4V2.5a2 2 0 0 1 4 0V4" fill="none" stroke="var(--gray)" strokeWidth="1.2" />
                      </g>
                    )}

                    <text
                      x="18"
                      y="7"
                      fontFamily="monospace"
                      fontSize="9"
                      fill="var(--gray)"
                      fontWeight="bold"
                    >
                      {`${node.curriculumTier ?? "EF"} · AFB ${node.level === 1 ? "I" : node.level === 2 ? "II" : "III"}`}
                    </text>

                    <text
                      x={TREE_BOX_WIDTH - 28}
                      y="7"
                      textAnchor="end"
                      fontFamily="monospace"
                      fontSize="9"
                      fill="var(--gray)"
                    >
                      {`~${node.estimatedMinutes}m`}
                    </text>
                  </g>

                  <text
                    x="10"
                    y="42"
                    fontFamily="serif"
                    fontSize="13"
                    fontWeight="bold"
                    fill="var(--ink)"
                    className="select-none"
                  >
                    {node.titleZH.length > 13 ? `${node.titleZH.slice(0, 12)}…` : node.titleZH}
                  </text>

                  <text
                    x="10"
                    y="60"
                    fontFamily="monospace"
                    fontSize="9.5"
                    fill="var(--gray)"
                    className="select-none"
                  >
                    {node.titleDE.length > 22 ? `${node.titleDE.slice(0, 21)}…` : node.titleDE}
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
