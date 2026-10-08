/**
 * EF-GeWi-Lernvault - Extensible Subject Knowledge Graph & Pluggable Skill Tree Engine
 * 
 * 核心架构特征：
 * 1. 学科解耦与动态扩展：支持 10 门标准考纲学科，亦支持随时创建与插拔自定义新学科 (FachRegistry 兼容)；
 * 2. 节点即知识点 (Knowledge Points)：以单个学科核心知识点及其学习推进流程为中枢；
 * 3. 灵活热插拔机制 (Hot-Pluggable DAG)：知识点与连线可自由增删、重连，内置拓扑排序与防死锁检测；
 * 4. 丰富内置挂载槽：原生支持关联微课 (linkedReiseId)、考纲笔记 (linkedNoteId)、仿真教具 (linkedToolId)；
 * 5. 外部资源与拆书提取预留架构：定义标准的 ExternalResourceSlot 与 ExtractionMetadata 插槽，支持未来自动拆书与网页信息抓取。
 */

import type { FachId } from "../fach";
// 由 scripts/export-vault-data.py 从 00_META/presets/*-graph.json 编译而成（勿手改）。
// 生成物内部只用 `import type` 反向引用本文件，故不会形成运行时循环依赖。
import { GENERATED_SUBJECT_GRAPHS } from "../generatedGraphs";

// ---------------------------------------------------------------------------
// 1. 类型定义体系 (Type Definitions)
// ---------------------------------------------------------------------------

export type SubjectKey = FachId | string;

/** 认知深度层级：对齐德国高中官方 AFB (Anforderungsbereiche) I-III */
export type CognitiveLevel = 1 | 2 | 3;

/** 学习流程推进阶段 */
export type LearningStage =
  | "einfuehrung"     // 概念引入与直观感知 (Schritt 1-2)
  | "grundlagen"      // 核心原理与模型建构 (Schritt 3-4)
  | "vertiefung"      // 双向辨析与机制深化 (Schritt 5-6)
  | "synthese"        // 跨领域迁移与结构整合 (Schritt 7)
  | "klausur_praxis"; // 会考实战与终极评价 (Schritt 8 / AFB III)

/** 知识点通关状态机 */
export type SkillNodeStatus = "locked" | "available" | "in_progress" | "mastered";

/** 前置依赖解锁逻辑门 */
export type UnlockLogic = "AND" | "OR";

/** 学段层级 (支持从初中基础、高中文理会考到大学先修全维度无上限扩充) */
export type CurriculumTier = "Sek_I" | "EF" | "Q1" | "Q2" | "Uni_Prep";

/** 外部信息源类型定义 (预留扩展) */
export type ExternalResourceType =
  | "book_chapter"      // 教材/专著章节
  | "web_page"          // 权威参考网页 (如 bpb, Serlo, LEIFI)
  | "video_clip"        // 视频精讲微课片段
  | "academic_paper"    // 学术论文/原始文献
  | "pdf_document";     // 官方考纲 PDF 或习题集

/** 外部挂载信息插槽 (为后期拆书和网页抓取预留) */
export interface ExternalResourceSlot {
  readonly id: string;
  readonly type: ExternalResourceType;
  readonly title: string;
  readonly urlOrPath?: string;
  readonly summaryZH?: string;
  readonly summaryDE?: string;
  readonly timestampOrPage?: string;
  readonly addedAt: string;
  readonly isAutoExtracted?: boolean;
}

/** 自动提取元数据契约 (预留拆书提取管线) */
export interface ExtractionMetadata {
  readonly sourceTitle?: string;
  readonly sourceBookIsbn?: string;
  readonly extractorEngine?: "ai_pipeline" | "rule_parser" | "crawler" | "manual";
  readonly confidenceScore?: number; // 0.0 - 1.0
  readonly extractedAt?: string;
  readonly originalSnippet?: string;
}

/** 单个知识点核心定义 (Knowledge Node) */
export interface KnowledgeNode {
  readonly id: string;                               // 唯一标识 (kebab-case，如 "sowi-preismechanismus")
  readonly fach: SubjectKey;                         // 所属学科
  readonly titleDE: string;                          // 德语考纲规范术语
  readonly titleZH: string;                          // 中文通俗理解
  readonly summaryDE?: string;                       // 德语文论核心机理简述
  readonly summaryZH?: string;                       // 中文因果推演简述
  readonly category?: string;                        // 所属核心分类/星区 (如 "Mikrooekonomie", "Analysis")
  readonly subdiscipline?: string;                   // 二级子学科/研习专题
  readonly curriculumTier?: CurriculumTier | string; // 学段分级 (Sek_I / EF / Q1 / Q2 / Uni_Prep)
  readonly stage: LearningStage;                     // 学习流程进阶阶段
  readonly level: CognitiveLevel;                    // AFB 认知难度 (1, 2, 3)
  readonly xpReward: number;                         // 通关奖励 XP
  readonly estimatedMinutes: number;                 // 建议专注耗时 (分钟)
  readonly prerequisites: readonly string[];          // 前置依赖知识点 ID 列表
  readonly unlockLogic?: UnlockLogic;                // 默认 "AND"
  readonly keyFormulaOrSentence?: string;            // 会考得分核心句或数学公式
  readonly commonFallacy?: string;                   // 典型易错误区 (Fehlvorstellung)
  readonly klausurTip?: string;                      // 审题与作答策略
  
  // 原生学习系统连接槽位
  readonly linkedReiseId?: string;                   // 关联探究式微课 ID (Lernreise)
  readonly linkedNoteId?: string;                    // 关联八段式考纲笔记路径
  readonly linkedToolId?: string;                    // 关联仿真教具 ID
  readonly linkedCardIds?: readonly string[];        // 关联 Anki 词卡 ID 列表
  
  // 可扩展外部信息挂载槽位 (预留)
  readonly externalResources?: readonly ExternalResourceSlot[];
  readonly extractionMeta?: ExtractionMetadata;
  
  // 画布与排布元数据
  readonly coordinates?: { readonly x: number; readonly y: number };
  readonly radialPosition?: { readonly orbitRadius: number; readonly angleDeg: number }; // 行星引力极坐标
  readonly layerIndex?: number;                      // 流程层级 (0, 1, 2...)
  readonly isCustom?: boolean;                       // 是否为自定义拼插节点
  readonly tags?: readonly string[];                 // 多维标记
}

/** 知识点之间的连接流向 (Knowledge Edge) */
export type KnowledgeEdgeType =
  | "prerequisite"       // 严格前置依赖 (必须先学)
  | "synergy"            // 概念协同与启发关联 (推荐组合)
  | "cross_disciplinary"; // 跨学科辐射 (跨学科互通)

export interface KnowledgeEdge {
  readonly id: string;
  readonly from: string;                             // 源知识点 ID (前置/上游)
  readonly to: string;                               // 目标知识点 ID (后继/下游)
  readonly type: KnowledgeEdgeType;
  readonly descriptionDE?: string;
  readonly descriptionZH?: string;
}

/** 单个学科全景知识图谱定义 (Subject Knowledge Graph) */
export interface SubjectKnowledgeGraph {
  readonly schemaVersion: 1;
  readonly fach: SubjectKey;
  readonly nameDE: string;
  readonly nameZH: string;
  readonly descriptionDE?: string;
  readonly descriptionZH?: string;
  readonly isCustomSubject?: boolean;                // 是否为自定义新增学科
  readonly categories?: readonly string[];           // 核心分类星区列表
  readonly availableTags?: readonly string[];        // 常用多维标记列表
  readonly nodes: readonly KnowledgeNode[];
  readonly edges: readonly KnowledgeEdge[];
  readonly metadata?: {
    readonly version?: string;
    readonly author?: string;
    readonly updatedAt?: string;
    readonly sourceBook?: string;
  };
}

/** 学科图谱全局状态与统计指标 */
export interface SubjectGraphStatusSummary {
  readonly fach: SubjectKey;
  readonly totalNodes: number;
  readonly masteredNodes: number;
  readonly availableNodes: number;
  readonly lockedNodes: number;
  readonly progressPercent: number;                  // 0 - 100
  readonly categoriesCount?: number;
  readonly tagsCount?: number;
  readonly recommendedNextNodeId?: string;           // 推荐当前最先攻克的知识点
}

// ---------------------------------------------------------------------------
// 2. 状态机与依赖演算算法 (State Machine & Graph Algorithms)
// ---------------------------------------------------------------------------

/**
 * 计算全图节点的实时解锁状态
 * @param graph 学科图谱
 * @param masteredNodeIds 用户已通关的知识点 ID 集合
 */
export function computeGraphUnlockStates(
  graph: SubjectKnowledgeGraph,
  masteredNodeIds: Set<string>
): Map<string, SkillNodeStatus> {
  const statusMap = new Map<string, SkillNodeStatus>();

  for (const node of graph.nodes) {
    if (masteredNodeIds.has(node.id)) {
      statusMap.set(node.id, "mastered");
      continue;
    }

    const prereqs = node.prerequisites;
    if (!prereqs || prereqs.length === 0) {
      statusMap.set(node.id, "available");
      continue;
    }

    const logic = node.unlockLogic ?? "AND";
    if (logic === "OR") {
      const anyPrereqMastered = prereqs.some((pid) => masteredNodeIds.has(pid));
      statusMap.set(node.id, anyPrereqMastered ? "available" : "locked");
    } else {
      const allPrereqsMastered = prereqs.every((pid) => masteredNodeIds.has(pid));
      statusMap.set(node.id, allPrereqsMastered ? "available" : "locked");
    }
  }

  return statusMap;
}

/**
 * 环路检测 (Cycle Detection / 防死锁环检测)
 * 基于 DFS 三色标记法：0=未访问, 1=当前递归栈中, 2=已完成
 * @returns 若存在死锁环路则返回环上节点路径，否则返回 null
 */
export function detectGraphCycles(graph: SubjectKnowledgeGraph): string[] | null {
  const adj = new Map<string, string[]>();
  for (const node of graph.nodes) {
    adj.set(node.id, []);
  }

  // 构建前置到后继的单向有向图
  for (const node of graph.nodes) {
    for (const preId of node.prerequisites) {
      if (adj.has(preId)) {
        adj.get(preId)!.push(node.id);
      }
    }
  }
  for (const edge of graph.edges) {
    if (edge.type === "prerequisite" && adj.has(edge.from)) {
      const list = adj.get(edge.from)!;
      if (!list.includes(edge.to)) {
        list.push(edge.to);
      }
    }
  }

  const state = new Map<string, 0 | 1 | 2>();
  for (const node of graph.nodes) {
    state.set(node.id, 0);
  }

  const path: string[] = [];

  function dfs(curr: string): string[] | null {
    state.set(curr, 1);
    path.push(curr);

    const neighbors = adj.get(curr) || [];
    for (const next of neighbors) {
      const nextState = state.get(next) ?? 0;
      if (nextState === 1) {
        // 发现返祖边，截取环路
        const cycleStartIndex = path.indexOf(next);
        return [...path.slice(cycleStartIndex), next];
      }
      if (nextState === 0) {
        const cycle = dfs(next);
        if (cycle) return cycle;
      }
    }

    path.pop();
    state.set(curr, 2);
    return null;
  }

  for (const node of graph.nodes) {
    if (state.get(node.id) === 0) {
      const cycle = dfs(node.id);
      if (cycle) return cycle;
    }
  }

  return null;
}

/**
 * 拓扑排序：计算顺畅的学习流程序列 (Learning Progression Flow)
 */
export function topologicalSort(graph: SubjectKnowledgeGraph): {
  success: boolean;
  sortedNodeIds: string[];
  cycleNodes?: string[];
} {
  const inDegree = new Map<string, number>();
  const adj = new Map<string, string[]>();

  for (const node of graph.nodes) {
    inDegree.set(node.id, 0);
    adj.set(node.id, []);
  }

  // 统计入度与正向邻接
  for (const node of graph.nodes) {
    const uniquePrereqs = new Set(node.prerequisites);
    inDegree.set(node.id, uniquePrereqs.size);
    for (const preId of uniquePrereqs) {
      if (!adj.has(preId)) {
        adj.set(preId, []);
      }
      adj.get(preId)!.push(node.id);
    }
  }

  const queue: string[] = [];
  for (const [id, deg] of inDegree.entries()) {
    if (deg === 0) {
      queue.push(id);
    }
  }

  const sorted: string[] = [];
  while (queue.length > 0) {
    const curr = queue.shift()!;
    sorted.push(curr);

    const neighbors = adj.get(curr) || [];
    for (const next of neighbors) {
      const newDeg = (inDegree.get(next) || 1) - 1;
      inDegree.set(next, newDeg);
      if (newDeg === 0) {
        queue.push(next);
      }
    }
  }

  if (sorted.length !== graph.nodes.length) {
    const cycle = detectGraphCycles(graph);
    return {
      success: false,
      sortedNodeIds: sorted,
      cycleNodes: cycle ?? undefined,
    };
  }

  return { success: true, sortedNodeIds: sorted };
}

/**
 * 获取指定目标知识点的完整前置溯源链路 (Prerequisite Dependency Chain)
 * 用于当学生想要学习某个高阶知识点时，一键倒推必须掌握的完整路径
 */
export function getPrerequisiteChain(
  graph: SubjectKnowledgeGraph,
  targetNodeId: string
): string[] {
  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n]));
  const visited = new Set<string>();
  const chain: string[] = [];

  function traverse(id: string) {
    if (visited.has(id)) return;
    visited.add(id);

    const node = nodeMap.get(id);
    if (!node) return;

    for (const preId of node.prerequisites) {
      traverse(preId);
    }
    chain.push(id);
  }

  traverse(targetNodeId);
  return chain;
}

/**
 * 汇总当前学科的学习进度统计
 */
export function calculateSubjectProgress(
  graph: SubjectKnowledgeGraph,
  masteredNodeIds: Set<string>
): SubjectGraphStatusSummary {
  const states = computeGraphUnlockStates(graph, masteredNodeIds);
  let masteredCount = 0;
  let availableCount = 0;
  let lockedCount = 0;

  for (const status of states.values()) {
    if (status === "mastered") masteredCount++;
    else if (status === "available") availableCount++;
    else if (status === "locked") lockedCount++;
  }

  const total = graph.nodes.length;
  const progressPercent = total === 0 ? 0 : Math.round((masteredCount / total) * 100);

  // 寻找推荐的下一个攻关节点：在 available 节点中，按学习流程拓扑序列选第一个未通关者
  const topo = topologicalSort(graph);
  let recommendedNextNodeId: string | undefined = undefined;

  for (const nodeId of topo.sortedNodeIds) {
    if (states.get(nodeId) === "available") {
      recommendedNextNodeId = nodeId;
      break;
    }
  }

  return {
    fach: graph.fach,
    totalNodes: total,
    masteredNodes: masteredCount,
    availableNodes: availableCount,
    lockedNodes: lockedCount,
    progressPercent,
    recommendedNextNodeId,
  };
}

// ---------------------------------------------------------------------------
// 3. 节点与图谱可插拔操作原语 (Hot-Pluggable Operators)
// ---------------------------------------------------------------------------

/**
 * 插入或更新知识点节点 (不可变纯函数)
 */
export function insertKnowledgeNode(
  graph: SubjectKnowledgeGraph,
  node: KnowledgeNode
): SubjectKnowledgeGraph {
  const existingIndex = graph.nodes.findIndex((n) => n.id === node.id);
  let newNodes: KnowledgeNode[];

  if (existingIndex >= 0) {
    newNodes = [...graph.nodes];
    newNodes[existingIndex] = node;
  } else {
    newNodes = [...graph.nodes, node];
  }

  // 自动同步连线：如果节点包含 prerequisites，补充对应的 prerequisite 边
  const edgeSet = new Set(graph.edges.map((e) => `${e.from}->${e.to}`));
  const newEdges: KnowledgeEdge[] = [...graph.edges];

  for (const preId of node.prerequisites) {
    const key = `${preId}->${node.id}`;
    if (!edgeSet.has(key)) {
      newEdges.push({
        id: `edge-${preId}-${node.id}`,
        from: preId,
        to: node.id,
        type: "prerequisite",
      });
      edgeSet.add(key);
    }
  }

  return {
    ...graph,
    nodes: newNodes,
    edges: newEdges,
  };
}

/**
 * 删除知识点节点 (并自动清理相关连线与级联依赖引用)
 */
export function removeKnowledgeNode(
  graph: SubjectKnowledgeGraph,
  nodeId: string
): SubjectKnowledgeGraph {
  const newNodes = graph.nodes
    .filter((n) => n.id !== nodeId)
    .map((n) => {
      if (n.prerequisites.includes(nodeId)) {
        return {
          ...n,
          prerequisites: n.prerequisites.filter((id) => id !== nodeId),
        };
      }
      return n;
    });

  const newEdges = graph.edges.filter(
    (e) => e.from !== nodeId && e.to !== nodeId
  );

  return {
    ...graph,
    nodes: newNodes,
    edges: newEdges,
  };
}

/**
 * 动态建立两个知识点之间的学习流连接
 */
export function connectKnowledgeNodes(
  graph: SubjectKnowledgeGraph,
  fromId: string,
  toId: string,
  options?: {
    type?: KnowledgeEdgeType;
    descriptionDE?: string;
    descriptionZH?: string;
  }
): { success: boolean; graph: SubjectKnowledgeGraph; error?: string } {
  if (fromId === toId) {
    return { success: false, graph, error: "Ein Knoten kann nicht auf sich selbst verweisen." };
  }

  const fromNode = graph.nodes.find((n) => n.id === fromId);
  const toNode = graph.nodes.find((n) => n.id === toId);

  if (!fromNode || !toNode) {
    return { success: false, graph, error: "Start- oder Zielknoten existiert nicht." };
  }

  const edgeType = options?.type ?? "prerequisite";
  const edgeId = `edge-${fromId}-${toId}`;

  // 如果已经存在该连接则直接返回
  if (graph.edges.some((e) => e.from === fromId && e.to === toId)) {
    return { success: true, graph };
  }

  const updatedNodes = graph.nodes.map((n) => {
    if (n.id === toId && edgeType === "prerequisite") {
      if (!n.prerequisites.includes(fromId)) {
        return { ...n, prerequisites: [...n.prerequisites, fromId] };
      }
    }
    return n;
  });

  const updatedEdges: KnowledgeEdge[] = [
    ...graph.edges,
    {
      id: edgeId,
      from: fromId,
      to: toId,
      type: edgeType,
      descriptionDE: options?.descriptionDE,
      descriptionZH: options?.descriptionZH,
    },
  ];

  const candidateGraph: SubjectKnowledgeGraph = {
    ...graph,
    nodes: updatedNodes,
    edges: updatedEdges,
  };

  // 环路检测，若出现环则回滚阻止建立
  const cycle = detectGraphCycles(candidateGraph);
  if (cycle) {
    return {
      success: false,
      graph,
      error: `Zyklische Abhängigkeit erkannt: ${cycle.join(" -> ")}`,
    };
  }

  return { success: true, graph: candidateGraph };
}

/**
 * 动态解绑两个知识点之间的连接
 */
export function disconnectKnowledgeNodes(
  graph: SubjectKnowledgeGraph,
  fromId: string,
  toId: string
): SubjectKnowledgeGraph {
  const newEdges = graph.edges.filter(
    (e) => !(e.from === fromId && e.to === toId)
  );

  const newNodes = graph.nodes.map((n) => {
    if (n.id === toId && n.prerequisites.includes(fromId)) {
      return {
        ...n,
        prerequisites: n.prerequisites.filter((id) => id !== fromId),
      };
    }
    return n;
  });

  return {
    ...graph,
    nodes: newNodes,
    edges: newEdges,
  };
}

/**
 * 为知识点挂载外部资源信息 (预留扩展)
 */
export function attachExternalResource(
  graph: SubjectKnowledgeGraph,
  nodeId: string,
  resource: ExternalResourceSlot
): SubjectKnowledgeGraph {
  const newNodes = graph.nodes.map((node) => {
    if (node.id === nodeId) {
      const existing = node.externalResources || [];
      return {
        ...node,
        externalResources: [...existing, resource],
      };
    }
    return node;
  });

  return {
    ...graph,
    nodes: newNodes,
  };
}

/**
 * 动态更新指定知识点的属性 (字段更新、分类变更、编辑公式与考点)
 */
export function updateKnowledgeNode(
  graph: SubjectKnowledgeGraph,
  nodeId: string,
  updater: Partial<KnowledgeNode> | ((prev: KnowledgeNode) => KnowledgeNode)
): SubjectKnowledgeGraph {
  const newNodes = graph.nodes.map((node) => {
    if (node.id !== nodeId) return node;
    return typeof updater === "function" ? updater(node) : { ...node, ...updater };
  });

  return {
    ...graph,
    nodes: newNodes,
  };
}

/**
 * 为指定知识点动态添加多维标签 (Tag)
 */
export function addNodeTag(
  graph: SubjectKnowledgeGraph,
  nodeId: string,
  tag: string
): SubjectKnowledgeGraph {
  const cleanTag = tag.trim();
  if (!cleanTag) return graph;
  return updateKnowledgeNode(graph, nodeId, (node) => {
    const existing = node.tags ?? [];
    if (existing.includes(cleanTag)) return node;
    return { ...node, tags: [...existing, cleanTag] };
  });
}

/**
 * 动态移除指定知识点的标签 (Tag)
 */
export function removeNodeTag(
  graph: SubjectKnowledgeGraph,
  nodeId: string,
  tag: string
): SubjectKnowledgeGraph {
  return updateKnowledgeNode(graph, nodeId, (node) => {
    const existing = node.tags ?? [];
    return { ...node, tags: existing.filter((t) => t !== tag) };
  });
}

// ---------------------------------------------------------------------------
// 行星引力与径向发散布局引擎 (Planetary Gravitational Radial Layout)
// ---------------------------------------------------------------------------

export interface PlanetaryLayoutOptions {
  readonly center?: { readonly x: number; readonly y: number };
  readonly startRadius?: number;
  readonly orbitStep?: number;
  readonly sectorPaddingDeg?: number;
}

/**
 * 行星引力图自动排布核心算法：
 * - 核心太阳 (Nucleus)：学科核心坐标 (cx, cy)
 * - 扇区分区 (Constellation Sectors)：每个大类 (category) 均分 360 度圆周扇形
 * - 同心引力轨道 (Gravitational Orbits)：按学段/难度向外同心延展 (Sek I -> EF -> Q1 -> Q2 -> Uni-Prep)
 * - 极坐标向笛卡尔坐标平滑映射并注入精准中心与半径
 */
export function computePlanetaryRadialLayout(
  graph: SubjectKnowledgeGraph,
  options?: PlanetaryLayoutOptions
): SubjectKnowledgeGraph {
  const cx = options?.center?.x ?? 560;
  const cy = options?.center?.y ?? 500;
  const startRadius = options?.startRadius ?? 180;
  const orbitStep = options?.orbitStep ?? 130;
  const sectorPaddingDeg = options?.sectorPaddingDeg ?? 8;

  // 1. 抽取所有分类
  const categorySet = new Set<string>();
  for (const node of graph.nodes) {
    categorySet.add(node.category || "Allgemein");
  }
  const categories = Array.from(categorySet);
  if (categories.length === 0) categories.push("Allgemein");

  // 2. 为每个分类划分星区角度 (Sector)
  const numCategories = categories.length;
  const sectorSpan = 360 / numCategories;
  const categorySectorMap = new Map<string, { startAngle: number; span: number }>();
  categories.forEach((cat, idx) => {
    categorySectorMap.set(cat, {
      startAngle: idx * sectorSpan + sectorPaddingDeg / 2,
      span: sectorSpan - sectorPaddingDeg,
    });
  });

  // 3. 将学段或难度映射到同心引力轨道 (Orbit 1..5)
  const getOrbitIndex = (node: KnowledgeNode): number => {
    if (node.curriculumTier === "Sek_I") return 1;
    if (node.curriculumTier === "EF") return 2;
    if (node.curriculumTier === "Q1") return 3;
    if (node.curriculumTier === "Q2") return 4;
    if (node.curriculumTier === "Uni_Prep") return 5;
    // 回退到 stage / level
    if (node.stage === "einfuehrung") return 1;
    if (node.stage === "grundlagen") return 2;
    if (node.stage === "vertiefung") return 3;
    if (node.stage === "synthese" || node.stage === "klausur_praxis") return 4;
    return node.level;
  };

  // 4. 按 (category, orbitIndex) 分桶
  const bins = new Map<string, KnowledgeNode[]>();
  for (const node of graph.nodes) {
    const cat = node.category || "Allgemein";
    const orbit = getOrbitIndex(node);
    const key = `${cat}___${orbit}`;
    const list = bins.get(key) || [];
    list.push(node);
    bins.set(key, list);
  }

  // 5. 在每个扇区及轨道上等角辐射排布
  const updatedNodes = graph.nodes.map((node) => {
    const cat = node.category || "Allgemein";
    const orbit = getOrbitIndex(node);
    const sector = categorySectorMap.get(cat) || { startAngle: 0, span: 360 };
    const radius = startRadius + (orbit - 1) * orbitStep;

    const binNodes = bins.get(`${cat}___${orbit}`) || [node];
    const indexInBin = binNodes.findIndex((n) => n.id === node.id);
    const countInBin = binNodes.length;

    // 计算角度
    const angleStep = sector.span / Math.max(1, countInBin);
    const angleDeg = sector.startAngle + (indexInBin + 0.5) * angleStep;
    const rad = (angleDeg * Math.PI) / 180;

    const x = Math.round(cx + radius * Math.cos(rad));
    const y = Math.round(cy + radius * Math.sin(rad));

    return {
      ...node,
      coordinates: { x, y },
      radialPosition: {
        orbitRadius: radius,
        angleDeg: Math.round(angleDeg * 10) / 10,
      },
    };
  });

  return {
    ...graph,
    categories,
    nodes: updatedNodes,
  };
}

// ---------------------------------------------------------------------------
// 多维过滤与检索引擎 (Filtering & Query)
// ---------------------------------------------------------------------------

export interface GraphFilterCriteria {
  readonly category?: string;
  readonly tag?: string;
  readonly tier?: string;
  readonly level?: CognitiveLevel;
  readonly status?: SkillNodeStatus;
  readonly searchQuery?: string;
}

export function filterKnowledgeGraph(
  nodes: readonly KnowledgeNode[],
  criteria: GraphFilterCriteria,
  unlockStates?: Map<string, SkillNodeStatus>
): readonly KnowledgeNode[] {
  return nodes.filter((node) => {
    if (criteria.category && criteria.category !== "ALL" && node.category !== criteria.category) {
      return false;
    }
    if (criteria.tag && criteria.tag !== "ALL" && !node.tags?.includes(criteria.tag)) {
      return false;
    }
    if (criteria.tier && criteria.tier !== "ALL" && node.curriculumTier !== criteria.tier) {
      return false;
    }
    if (criteria.level && node.level !== criteria.level) {
      return false;
    }
    if (criteria.status && unlockStates && unlockStates.get(node.id) !== criteria.status) {
      return false;
    }
    if (criteria.searchQuery && criteria.searchQuery.trim()) {
      const q = criteria.searchQuery.trim().toLowerCase();
      const inTitleZH = node.titleZH.toLowerCase().includes(q);
      const inTitleDE = node.titleDE.toLowerCase().includes(q);
      const inSummaryZH = node.summaryZH?.toLowerCase().includes(q) ?? false;
      const inSummaryDE = node.summaryDE?.toLowerCase().includes(q) ?? false;
      const inFormula = node.keyFormulaOrSentence?.toLowerCase().includes(q) ?? false;
      const inFallacy = node.commonFallacy?.toLowerCase().includes(q) ?? false;
      const inTags = node.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
      if (!inTitleZH && !inTitleDE && !inSummaryZH && !inSummaryDE && !inFormula && !inFallacy && !inTags) {
        return false;
      }
    }
    return true;
  });
}

// ---------------------------------------------------------------------------
// 质量门禁与死锁检验机 (Quality Gate & Validation)
// ---------------------------------------------------------------------------

export interface GraphValidationResult {
  readonly valid: boolean;
  readonly errors: readonly string[];
  readonly warnings: readonly string[];
  readonly stats: {
    readonly totalNodes: number;
    readonly totalEdges: number;
    readonly categoriesCount: number;
    readonly tagsCount: number;
    readonly scoringSentencesCount: number;
    readonly commonFallaciesCount: number;
  };
}

export function validateKnowledgeGraph(raw: unknown): GraphValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!raw || typeof raw !== "object") {
    return {
      valid: false,
      errors: ["数据必须为合法的 JSON 对象。"],
      warnings: [],
      stats: { totalNodes: 0, totalEdges: 0, categoriesCount: 0, tagsCount: 0, scoringSentencesCount: 0, commonFallaciesCount: 0 },
    };
  }

  const graph = raw as SubjectKnowledgeGraph;
  if (graph.schemaVersion !== 1) {
    errors.push("schemaVersion 必须为 1。");
  }
  if (!graph.fach) {
    errors.push("缺少必须的 'fach' 学科标识字段。");
  }
  if (!Array.isArray(graph.nodes) || graph.nodes.length === 0) {
    errors.push("图谱必须包含非空的 'nodes' 知识点数组。");
    return {
      valid: false,
      errors,
      warnings,
      stats: { totalNodes: 0, totalEdges: 0, categoriesCount: 0, tagsCount: 0, scoringSentencesCount: 0, commonFallaciesCount: 0 },
    };
  }

  const nodeIds = new Set<string>();
  const categories = new Set<string>();
  const tags = new Set<string>();
  let scoringSentences = 0;
  let fallacies = 0;

  for (const node of graph.nodes) {
    if (!node.id || typeof node.id !== "string") {
      errors.push("存在缺少有效 'id' 的节点。");
      continue;
    }
    if (nodeIds.has(node.id)) {
      errors.push(`检测到重复的节点 ID: '${node.id}'。`);
    }
    nodeIds.add(node.id);

    if (!node.titleDE || !node.titleZH) {
      errors.push(`节点 '${node.id}' 必须同时提供 'titleDE' 与 'titleZH'。`);
    }

    if (node.category) {
      categories.add(node.category);
    } else {
      warnings.push(`节点 '${node.id}' 未配置 'category' 分类。`);
    }

    if (node.tags && Array.isArray(node.tags)) {
      node.tags.forEach((t: string) => tags.add(t));
    }

    if (node.keyFormulaOrSentence) scoringSentences++;
    else warnings.push(`节点 '${node.id}' 缺失 15 NP 得分核心句或公式。`);

    if (node.commonFallacy) fallacies++;
    else warnings.push(`节点 '${node.id}' 缺失典型易错误区分析。`);
  }

  // 依赖合法性校验
  for (const node of graph.nodes) {
    for (const prereq of node.prerequisites || []) {
      if (!nodeIds.has(prereq)) {
        errors.push(`节点 '${node.id}' 引用了不存在的前置节点: '${prereq}'。`);
      }
    }
  }

  // 死锁闭环检测
  const cycle = detectGraphCycles(graph);
  if (cycle) {
    errors.push(`发现致命依赖死锁循环: ${cycle.join(" -> ")}`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    stats: {
      totalNodes: graph.nodes.length,
      totalEdges: (graph.edges || []).length,
      categoriesCount: categories.size,
      tagsCount: tags.size,
      scoringSentencesCount: scoringSentences,
      commonFallaciesCount: fallacies,
    },
  };
}

// ---------------------------------------------------------------------------
// 4. 学科图谱管理中心 (Subject Knowledge Graph Registry)
// ---------------------------------------------------------------------------

class SubjectGraphRegistryImpl {
  private readonly graphs = new Map<string, SubjectKnowledgeGraph>();
  /** 待排布学科键：首次 get() 时才执行引力极坐标布局，避免启动期一次性排布全部学科。 */
  private readonly pendingLayout = new Set<string>();

  constructor() {
    this.registerBuiltinGraphs();
  }

  public register(graph: SubjectKnowledgeGraph): void {
    const key = graph.fach.toLowerCase();
    this.graphs.set(key, graph);
    this.pendingLayout.delete(key);
  }

  /**
   * 延迟排布注册：仅记录原始图谱，等首次 get() 再套 computePlanetaryRadialLayout。
   * 十科编译期图谱合计数百节点，若在模块初始化时全部排布，会让每个测试工作线程都付出
   * 一次全量布局开销（实测使 vitest 全量耗时翻倍）。渲染只读取当前学科的图谱，
   * 因此按需排布即可，且语义与 register() 完全一致。
   */
  private registerLazy(graph: SubjectKnowledgeGraph): void {
    const key = graph.fach.toLowerCase();
    this.graphs.set(key, graph);
    this.pendingLayout.add(key);
  }

  public get(fach: SubjectKey): SubjectKnowledgeGraph | undefined {
    const key = fach.toLowerCase();
    const graph = this.graphs.get(key);
    if (!graph) return undefined;
    if (this.pendingLayout.has(key)) {
      const layouted = computePlanetaryRadialLayout(graph);
      this.graphs.set(key, layouted);
      this.pendingLayout.delete(key);
      return layouted;
    }
    return graph;
  }

  public getAll(): SubjectKnowledgeGraph[] {
    return Array.from(this.graphs.keys()).map((key) => this.get(key) as SubjectKnowledgeGraph);
  }

  public listSubjects(): { fach: SubjectKey; nameDE: string; nameZH: string; isCustom?: boolean }[] {
    return Array.from(this.graphs.values()).map((g) => ({
      fach: g.fach,
      nameDE: g.nameDE,
      nameZH: g.nameZH,
      isCustom: g.isCustomSubject,
    }));
  }

  /**
   * 导入外部 JSON 字符串，经严格格式与死锁校验后注册进图谱中心
   */
  public importGraphJSON(jsonStr: string): { success: boolean; graph?: SubjectKnowledgeGraph; error?: string } {
    try {
      const parsed = JSON.parse(jsonStr);
      const validation = validateKnowledgeGraph(parsed);
      if (!validation.valid) {
        return { success: false, error: validation.errors.join("; ") };
      }
      const rawGraph = parsed as SubjectKnowledgeGraph;
      // 自动补齐行星引力排布
      const layouted = computePlanetaryRadialLayout(rawGraph);
      this.register(layouted);
      return { success: true, graph: layouted };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, error: `JSON 解析失败: ${msg}` };
    }
  }

  /**
   * 导出指定学科的完整 JSON 数据
   */
  public exportGraphJSON(fach: SubjectKey): string {
    const graph = this.get(fach);
    if (!graph) return "{}";
    return JSON.stringify(graph, null, 2);
  }

  /**
   * 动态创建并注册全新的自定义学科板块
   */
  public createCustomSubject(
    fachId: string,
    nameDE: string,
    nameZH: string,
    descriptionZH?: string
  ): SubjectKnowledgeGraph {
    const cleanId = fachId.trim();
    const newGraph: SubjectKnowledgeGraph = {
      schemaVersion: 1,
      fach: cleanId,
      nameDE,
      nameZH,
      descriptionDE: `Benutzerdefiniertes Fach: ${nameDE}`,
      descriptionZH: descriptionZH ?? `自定义扩展学科：${nameZH}`,
      isCustomSubject: true,
      nodes: [],
      edges: [],
      metadata: {
        updatedAt: new Date().toISOString(),
      },
    };

    this.register(newGraph);
    return newGraph;
  }

  private registerBuiltinGraphs(): void {
    // 注册标杆学科兜底数据，并预先注入引力径向排布
    this.register(computePlanetaryRadialLayout(BUILTIN_SOWI_GRAPH));
    this.register(computePlanetaryRadialLayout(BUILTIN_MATHE_GRAPH));
    this.register(computePlanetaryRadialLayout(BUILTIN_PHILO_GRAPH));

    // 编译期图谱（00_META/presets/*-graph.json）：按 fach 覆盖同名兜底图谱。
    // 生成物为空时静默保留上面的兜底数据，保证降级可用、无数据丢失
    // （用户进度按 skill_tree_mastered_<fach> 存节点 ID，与图谱来源无关）。
    // 走延迟排布：仅在真正打开该学科时才计算极坐标，避免启动期全量布局。
    for (const graph of GENERATED_SUBJECT_GRAPHS) {
      this.registerLazy(graph);
    }
  }
}

// ---------------------------------------------------------------------------
// 5. 标杆学科开箱即用高质量知识点拓扑数据 (Builtin Presets)
// ---------------------------------------------------------------------------

export const BUILTIN_SOWI_GRAPH: SubjectKnowledgeGraph = {
  schemaVersion: 1,
  fach: "SoWi",
  nameDE: "Sozialwissenschaften",
  nameZH: "社会科学 (SoWi)",
  descriptionDE: "Wirtschaftspolitik, Soziale Marktwirtschaft und Ungleichheit (NRW Kernlehrplan Oberstufe)",
  descriptionZH: "经济政策、社会市场经济机制、分配不平等与现代博弈论 (全景引力星系图谱)",
  isCustomSubject: false,
  categories: ["Mikrooekonomie", "Makrooekonomie", "Ordnungspolitik", "Sozialstruktur"],
  availableTags: ["Markt", "EZB", "Inflation", "Gini", "Sozialstaat", "Dilemma", "Uni-Prep"],
  nodes: [
    // 根节点：稀缺性与经济人假说 (Layer 0 / EF)
    {
      id: "sowi-beduerfnis-knappheit",
      fach: "SoWi",
      titleDE: "Knappheit & Homo Oeconomicus",
      titleZH: "稀缺性公理与经济人假说批判",
      summaryDE: "Unendliche Bedürfnisse treffen auf begrenzte Güter. Modell des rationalen Nutzensmaximierers.",
      summaryZH: "无限欲望与有限资源的矛盾；理性自利人模型的解释力与边界局限。",
      category: "Mikrooekonomie",
      curriculumTier: "EF",
      stage: "einfuehrung",
      level: 1,
      xpReward: 60,
      estimatedMinutes: 8,
      prerequisites: [],
      keyFormulaOrSentence: "Das ökonomische Prinzip verlangt rationalen Mitteleinsatz (Maximal- oder Minimalprinzip).",
      commonFallacy: "Verwechslung von Maximalprinzip (gegebener Einsatz -> maximaler Ertrag) und Minimalprinzip (gegebenes Ziel -> minimaler Einsatz).",
      klausurTip: "Immer explizit abgrenzen, welches Prinzip im Szenario vorliegt.",
      layerIndex: 0,
      coordinates: { x: 80, y: 220 },
      tags: ["Basis", "Knappheit", "Homo-Oeconomicus"],
    },

    // 支线 A (上路)：微观市场价格机制与市场失灵
    {
      id: "sowi-preismechanismus",
      fach: "SoWi",
      titleDE: "Preismechanismus & Marktgleichgewicht",
      titleZH: "价格形成机制与市场均衡十字",
      summaryDE: "Zusammenspiel von Angebot und Nachfrage bestimmt Gleichgewichtspreis und -menge.",
      summaryZH: "供求双曲线交汇于均衡价格与均衡数量；价格发挥信号、调节与分配三大功能。",
      category: "Mikrooekonomie",
      curriculumTier: "EF",
      stage: "grundlagen",
      level: 2,
      xpReward: 100,
      estimatedMinutes: 10,
      prerequisites: ["sowi-beduerfnis-knappheit"],
      linkedReiseId: "Sowi-Preismechanismus-Markt-L1",
      linkedNoteId: "08_SoWi/Texte-Analyse/Preismechanismus-und-Marktformen.md",
      linkedToolId: "markt-sim",
      keyFormulaOrSentence: "Der Gleichgewichtspreis erfüllt Signalfunktion, Ausgleichsfunktion und Lenkungsfunktion.",
      commonFallacy: "Annahme, dass Höchstpreise das Angebot ausweiten (erzeugt in Wahrheit Nachfrageüberhang / Mangel).",
      layerIndex: 1,
      coordinates: { x: 300, y: 100 },
      tags: ["Markt", "Gleichgewicht", "Preise"],
    },
    {
      id: "sowi-marktversagen",
      fach: "SoWi",
      titleDE: "Marktversagen & Externe Effekte",
      titleZH: "市场失灵与负外部性困境",
      summaryDE: "Negative externe Effekte, Monopole und asymmetrische Information erfordern staatliche Rahmenordnung.",
      summaryZH: "负外部效应、自然垄断与信息不对称阻碍帕累托最优，构成国家介入的前提。",
      category: "Mikrooekonomie",
      curriculumTier: "EF",
      stage: "vertiefung",
      level: 2,
      xpReward: 110,
      estimatedMinutes: 12,
      prerequisites: ["sowi-preismechanismus"],
      keyFormulaOrSentence: "Negative externe Effekte führen zur Überproduktion auf Kosten Dritter (Internalisierung nötig).",
      commonFallacy: "Glaube, dass der Markt Umweltzerstörung von selbst internalisiert (Tragödie der Allmende).",
      layerIndex: 2,
      coordinates: { x: 540, y: 80 },
      tags: ["Externe-Effekte", "Marktversagen", "Allmende"],
    },
    {
      id: "sowi-marktformen-monopol",
      fach: "SoWi",
      titleDE: "Marktformen & Kartellaufsicht",
      titleZH: "市场形态、垄断寡头与卡特尔监管",
      summaryDE: "Polypol, Oligopol und Monopol. Preissetzungsmacht und staatlicher Schutz durch das Bundeskartellamt.",
      summaryZH: "完全竞争、寡头垄断与完全垄断的价格形成权柄；德国联邦卡特尔局对市场势力的监管。",
      category: "Mikrooekonomie",
      curriculumTier: "Q1",
      stage: "vertiefung",
      level: 2,
      xpReward: 115,
      estimatedMinutes: 12,
      prerequisites: ["sowi-marktversagen"],
      linkedToolId: "orderbuch-simulator",
      keyFormulaOrSentence: "Monopolistische Preissetzung mindert die Konsumentenrente und erzeugt Wohlfahrtsverluste.",
      layerIndex: 3,
      coordinates: { x: 760, y: 80 },
      tags: ["Monopol", "Oligopol", "Kartellamt"],
    },
    {
      id: "sowi-spieltheorie-nash",
      fach: "SoWi",
      titleDE: "Spieltheorie & Nash-Gleichgewicht",
      titleZH: "博弈论与纳什均衡 (大学先修)",
      summaryDE: "Strategische Interaktion im Oligopol: Gefangenendilemma und dominante Strategien.",
      summaryZH: "寡头市场战略互动；囚徒困境与占优策略；非合作博弈在卡特尔合谋稳定性中的应用。",
      category: "Mikrooekonomie",
      curriculumTier: "Uni_Prep",
      stage: "vertiefung",
      level: 2,
      xpReward: 150,
      estimatedMinutes: 20,
      prerequisites: ["sowi-marktformen-monopol"],
      keyFormulaOrSentence: "Im Nash-Gleichgewicht hat kein Spieler einen einseitigen Anreiz, von seiner gewählten Strategie abzuweichen.",
      commonFallacy: "Glaube, dass das Nash-Gleichgewicht stets die gesellschaftlich beste Lösung (Pareto-Optimum) darstellt.",
      klausurTip: "Auszahlungsmatrix präzise aufstellen und Beste-Antworten unterstreichen.",
      layerIndex: 4,
      coordinates: { x: 980, y: 80 },
      tags: ["Spieltheorie", "Nash-Gleichgewicht", "Uni-Prep"],
    },

    // 支线 B (中路)：秩序自由主义与宏观调控
    {
      id: "sowi-soziale-marktwirtschaft",
      fach: "SoWi",
      titleDE: "Soziale Marktwirtschaft & Ordoliberalismus",
      titleZH: "社会市场经济与秩序自由主义",
      summaryDE: "Verbindung von freier Marktinitiative und sozialem Ausgleich nach Müller-Armack und Erhard.",
      summaryZH: "市场自由竞争与社会平衡的制度统一；国家作为守门人维护竞争规则反对垄断。",
      category: "Ordnungspolitik",
      curriculumTier: "EF",
      stage: "grundlagen",
      level: 2,
      xpReward: 120,
      estimatedMinutes: 12,
      prerequisites: ["sowi-beduerfnis-knappheit"],
      linkedReiseId: "Sowi-Soziale-Marktwirtschaft-L1",
      linkedNoteId: "08_SoWi/Texte-Analyse/Soziale-Marktwirtschaft.md",
      keyFormulaOrSentence: "Wohlstand für alle entsteht durch funktionierenden Wettbewerb, flankiert durch soziale Absicherung.",
      layerIndex: 1,
      coordinates: { x: 300, y: 240 },
      tags: ["Ordoliberalismus", "Soziale-Marktwirtschaft", "Wettbewerb"],
    },
    {
      id: "sowi-magisches-viereck",
      fach: "SoWi",
      titleDE: "Magisches Viereck (StabG 1967)",
      titleZH: "宏观经济魔术四角与目标冲突",
      summaryDE: "Vier Staatsziele: Preisniveaustabilität, hoher Beschäftigungsstand, stetiges Wachstum, außenwirtschaftliches Gleichgewicht.",
      summaryZH: "1967稳定法§1四大目标：物价稳定、充分就业、适度增长、外贸平衡；目标不可同时实现。",
      category: "Makrooekonomie",
      curriculumTier: "Q1",
      stage: "vertiefung",
      level: 2,
      xpReward: 140,
      estimatedMinutes: 15,
      prerequisites: ["sowi-marktversagen", "sowi-soziale-marktwirtschaft"],
      linkedToolId: "magisches-viereck",
      keyFormulaOrSentence: "Zwischen Preisniveaustabilität und hohem Beschäftigungsstand besteht kurzfristig ein Phillips-Zielkonflikt.",
      commonFallacy: "Glaube, dass alle vier Ziele simultan zu 100% maximiert werden können.",
      layerIndex: 2,
      coordinates: { x: 540, y: 240 },
      tags: ["StabG", "Magisches-Viereck", "Phillips-Kurve"],
    },
    {
      id: "sowi-ezb-geldpolitik",
      fach: "SoWi",
      titleDE: "EZB Geldpolitik & Inflation",
      titleZH: "欧洲央行利率政策与通胀治理",
      summaryDE: "Leitzinsinstrumente, Mindestreserve und quantitative Lockerung zur Wahrung der Preisniveaustabilität.",
      summaryZH: "三大基准利率、公开市场操作与量化宽松；以 2% 对称通胀为法定义务的货币传导机制。",
      category: "Makrooekonomie",
      curriculumTier: "Q1",
      stage: "vertiefung",
      level: 2,
      xpReward: 130,
      estimatedMinutes: 15,
      prerequisites: ["sowi-magisches-viereck"],
      linkedToolId: "ezb-geldpolitik-sim",
      keyFormulaOrSentence: "Eine Leitzinserhöhung dämpft die Kreditnachfrage, hemmt Investitionen und bremst die Inflation.",
      layerIndex: 3,
      coordinates: { x: 760, y: 220 },
      tags: ["EZB", "Inflation", "Leitzins"],
    },
    {
      id: "sowi-keynes-vs-friedman",
      fach: "SoWi",
      titleDE: "Keynesianismus vs. Monetarismus",
      titleZH: "凯恩斯需求论 vs 货币主义 (大学先修)",
      summaryDE: "Paradigmenstreit: Fiskalische Nachfragesteuerung (Deficit Spending) versus geldmengenorientierte Angebotspolitik.",
      summaryZH: "经济哲学范式之争：国家逆周期赤字扩张刺激需求 vs 弗里德曼以控制货币供应量与改善供给条件为核心的货币主义。",
      category: "Makrooekonomie",
      curriculumTier: "Uni_Prep",
      stage: "vertiefung",
      level: 3,
      xpReward: 160,
      estimatedMinutes: 20,
      prerequisites: ["sowi-ezb-geldpolitik"],
      keyFormulaOrSentence: "Keynes betont die kurzfristige Instabilität privater Nachfrage, während Monetaristen staatliche Intervention als Hauptursache von Zyklen sehen.",
      commonFallacy: "Annahme, dass Deficit Spending ohne inflationäre Folgerisiken unbegrenzt möglich sei.",
      klausurTip: "Beide Schulen strukturiert gegenüberstellen (Annahme, Diagnose, Therapie).",
      layerIndex: 4,
      coordinates: { x: 980, y: 220 },
      tags: ["Keynes", "Monetarismus", "Makro-Theorie", "Uni-Prep"],
    },

    // 支线 C (下路)：社会结构分层与初次/再次分配
    {
      id: "sowi-soziale-schichtung",
      fach: "SoWi",
      titleDE: "Soziale Schichtung & Mobilität",
      titleZH: "社会阶层分化与代际流动壁垒",
      summaryDE: "Modelle sozialer Ungleichheit (Dahrendorf, Geißler). Vertikale und horizontale Mobilitätshemmnisse.",
      summaryZH: "达伦多夫与盖斯勒阶层结构模型；教育传承壁垒与社会阶层流动性停滞。",
      category: "Sozialstruktur",
      curriculumTier: "EF",
      stage: "grundlagen",
      level: 1,
      xpReward: 90,
      estimatedMinutes: 10,
      prerequisites: ["sowi-beduerfnis-knappheit"],
      keyFormulaOrSentence: "Bildungsherkunft bestimmt in Deutschland überproportional den sozioökonomischen Status.",
      layerIndex: 1,
      coordinates: { x: 300, y: 400 },
      tags: ["Schichtung", "Mobilitaet", "Geissler"],
    },
    {
      id: "sowi-buergergeld-transfer",
      fach: "SoWi",
      titleDE: "Bürgergeld & Sozialstaatstransfer",
      titleZH: "公民金与社会国二次转移支付",
      summaryDE: "Staatliche Umverteilung zur Sicherung des Existenzminimums nach Art. 20 Abs. 1 GG.",
      summaryZH: "基本法第20条第1款社会国原则；基础生活保障与工作激励效应的权衡。",
      category: "Sozialstruktur",
      curriculumTier: "Q1",
      stage: "vertiefung",
      level: 2,
      xpReward: 120,
      estimatedMinutes: 12,
      prerequisites: ["sowi-soziale-schichtung"],
      keyFormulaOrSentence: "Das Lohnabstandsgebot verlangt, dass Erwerbsarbeit finanziell spürbar attraktiver bleibt als Transferleistungen.",
      layerIndex: 2,
      coordinates: { x: 540, y: 400 },
      tags: ["Buergergeld", "Sozialstaat", "Art-20-GG"],
    },

    // 终极大题汇聚点 (Convergence, AFB III): 汇聚三大支线
    {
      id: "sowi-soziale-ungleichheit",
      fach: "SoWi",
      titleDE: "Soziale Ungleichheit & Umverteilung (AFB III)",
      titleZH: "社会不平等、基尼系数与再分配终极评析",
      summaryDE: "Einkommens- und Vermögensverteilung, Lorenz-Kurve, Gini-Koeffizient und staatliche Transferleistungen.",
      summaryZH: "洛伦兹曲线与基尼系数测算；汇聚市场竞争、宏观通胀与社会转移支付的终极会考大题。",
      category: "Sozialstruktur",
      curriculumTier: "Q2",
      stage: "klausur_praxis",
      level: 3,
      xpReward: 160,
      estimatedMinutes: 18,
      prerequisites: ["sowi-magisches-viereck", "sowi-buergergeld-transfer"],
      linkedNoteId: "08_SoWi/Texte-Analyse/Soziale-Ungleichheit.md",
      keyFormulaOrSentence: "Ein steigender Gini-Koeffizient signalisiert wachsende Disparitäten zwischen Primär- und Sekundärverteilung.",
      commonFallacy: "Vermögensungleichheit mit Einkommensungleichheit gleichsetzen (Vermögen ist in DE deutlich ungleicher verteilt).",
      klausurTip: "In AFB III immer die Dualität aus Anreizfunktion der Leistung und sozialem Frieden abwägen.",
      layerIndex: 4,
      coordinates: { x: 980, y: 350 },
      tags: ["Gini", "Lorenz-Kurve", "AFB-III", "Synthese"],
    },
  ],
  edges: [
    // 支线 A
    { id: "e1", from: "sowi-beduerfnis-knappheit", to: "sowi-preismechanismus", type: "prerequisite" },
    { id: "e2", from: "sowi-preismechanismus", to: "sowi-marktversagen", type: "prerequisite" },
    { id: "e3", from: "sowi-marktversagen", to: "sowi-marktformen-monopol", type: "prerequisite" },
    { id: "e-uni-1", from: "sowi-marktformen-monopol", to: "sowi-spieltheorie-nash", type: "prerequisite" },

    // 支线 B
    { id: "e4", from: "sowi-beduerfnis-knappheit", to: "sowi-soziale-marktwirtschaft", type: "prerequisite" },
    { id: "e5", from: "sowi-marktversagen", to: "sowi-magisches-viereck", type: "prerequisite" },
    { id: "e6", from: "sowi-soziale-marktwirtschaft", to: "sowi-magisches-viereck", type: "prerequisite" },
    { id: "e7", from: "sowi-magisches-viereck", to: "sowi-ezb-geldpolitik", type: "prerequisite" },
    { id: "e-uni-2", from: "sowi-ezb-geldpolitik", to: "sowi-keynes-vs-friedman", type: "prerequisite" },

    // 支线 C
    { id: "e8", from: "sowi-beduerfnis-knappheit", to: "sowi-soziale-schichtung", type: "prerequisite" },
    { id: "e9", from: "sowi-soziale-schichtung", to: "sowi-buergergeld-transfer", type: "prerequisite" },

    // 跨支线概念协同 (Synergy 虚线)
    { id: "syn1", from: "sowi-marktformen-monopol", to: "sowi-soziale-marktwirtschaft", type: "synergy", descriptionZH: "有效竞争保护是社会市场经济的基石" },
    { id: "syn2", from: "sowi-ezb-geldpolitik", to: "sowi-buergergeld-transfer", type: "synergy", descriptionZH: "通货膨胀直接侵蚀底层低收入群体的实际购买力" },

    // 终极汇聚 (Convergence)
    { id: "e10", from: "sowi-magisches-viereck", to: "sowi-soziale-ungleichheit", type: "prerequisite" },
    { id: "e11", from: "sowi-buergergeld-transfer", to: "sowi-soziale-ungleichheit", type: "prerequisite" },
  ],
};

export const BUILTIN_MATHE_GRAPH: SubjectKnowledgeGraph = {
  schemaVersion: 1,
  fach: "Mathe",
  nameDE: "Mathematik",
  nameZH: "数学 (Mathe)",
  descriptionDE: "Analysis: Differentialrechnung von der Sekante zur Optimierung (NRW Oberstufe)",
  descriptionZH: "微积分基础：从割线斜率逼近到导数、极值优化建模与大学导引 (引力星系图谱)",
  isCustomSubject: false,
  categories: ["Analysis", "Kurvendiskussion", "Optimierungsmodell"],
  availableTags: ["Ableitung", "Extrempunkte", "Optimierung", "Modellierung"],
  nodes: [
    {
      id: "mathe-aenderungsrate-sekante",
      fach: "Mathe",
      titleDE: "Mittlere Änderungsrate (Differenzenquotient)",
      titleZH: "平均变化率与割线斜率",
      summaryDE: "Steigung der Sekante durch zwei Punkte: m = (f(x0+h) - f(x0)) / h.",
      summaryZH: "割线两点代数斜率差商公式；宏观离散区间的平均速度或平均产出增长。",
      category: "Analysis",
      curriculumTier: "EF",
      stage: "einfuehrung",
      level: 1,
      xpReward: 60,
      estimatedMinutes: 8,
      prerequisites: [],
      linkedReiseId: "Mathe-Sekante-zu-Tangente-L1",
      linkedNoteId: "03_Mathe/Sekante-zu-Tangente-Lokale-Aenderungsrate.md",
      keyFormulaOrSentence: "m_{Sekante} = \\frac{f(x_0+h) - f(x_0)}{h}",
      layerIndex: 0,
      coordinates: { x: 80, y: 150 },
      tags: ["Sekante", "Differenzenquotient", "Basis"],
    },
    {
      id: "mathe-lokale-ableitung-grenzwert",
      fach: "Mathe",
      titleDE: "Lokale Änderungsrate & Ableitung",
      titleZH: "瞬时导数定义与切线极限逼近",
      summaryDE: "Grenzwert des Differenzenquotienten für h -> 0 liefert die Tangentensteigung f'(x0).",
      summaryZH: "差商在 h 趋于 0 时的极限；几何表现为割线绕切点旋转重合为切线。",
      category: "Analysis",
      curriculumTier: "EF",
      stage: "grundlagen",
      level: 2,
      xpReward: 110,
      estimatedMinutes: 12,
      prerequisites: ["mathe-aenderungsrate-sekante"],
      linkedToolId: "tangent-slider",
      keyFormulaOrSentence: "f'(x_0) = \\lim_{h \\to 0} \\frac{f(x_0+h) - f(x_0)}{h}",
      commonFallacy: "h einfach als 0 einsetzen, bevor gekürzt wurde (führt zu Division durch 0).",
      layerIndex: 1,
      coordinates: { x: 280, y: 150 },
      tags: ["Ableitung", "Grenzwert", "Tangente"],
    },
    {
      id: "mathe-ableitungsregeln-polynom",
      fach: "Mathe",
      titleDE: "Ableitungsregeln (Potenz- & Summenregel)",
      titleZH: "多项式导数运算法则",
      summaryDE: "Potenzregel: (x^n)' = n*x^(n-1). Faktor- und Summenregel für ganzrationale Funktionen.",
      summaryZH: "幂函数法则、常数倍法则与和差法则；告别繁琐极限直接代数求导。",
      category: "Analysis",
      curriculumTier: "EF",
      stage: "grundlagen",
      level: 1,
      xpReward: 80,
      estimatedMinutes: 10,
      prerequisites: ["mathe-lokale-ableitung-grenzwert"],
      keyFormulaOrSentence: "f(x) = a x^n \\implies f'(x) = a n x^{n-1}",
      layerIndex: 2,
      coordinates: { x: 480, y: 150 },
      tags: ["Potenzregel", "Summenregel", "Regeln"],
    },
    {
      id: "mathe-kurvendiskussion-kriterien",
      fach: "Mathe",
      titleDE: "Kurvendiskussion & Extrempunkte",
      titleZH: "函数性质判别：驻点、极值与拐点",
      summaryDE: "Notwendige Bedingung f'(x) = 0. Hinreichende Bedingung f''(x) != 0 oder Vorzeichenwechsel (VZW).",
      summaryZH: "一阶导零点结合二阶导或变号法则判定极大值与极小值；拐点判别。",
      category: "Kurvendiskussion",
      curriculumTier: "Q1",
      stage: "vertiefung",
      level: 2,
      xpReward: 140,
      estimatedMinutes: 15,
      prerequisites: ["mathe-ableitungsregeln-polynom"],
      linkedNoteId: "03_Mathe/Ganzrationale-Funktionen-Kurvendiskussion.md",
      keyFormulaOrSentence: "Notwendig: f'(x_E) = 0; Hinreichend: f''(x_E) < 0 (Hochpunkt) bzw. f''(x_E) > 0 (Tiefpunkt).",
      commonFallacy: "Vergessen der hinreichenden Bedingung (Sattelpunkt f'(x)=0 ohne Extremum).",
      layerIndex: 3,
      coordinates: { x: 680, y: 150 },
      tags: ["Extrempunkte", "Notwendige-Bedingung", "Kurvendiskussion"],
    },
    {
      id: "mathe-extremwert-optimierung",
      fach: "Mathe",
      titleDE: "Extremwertprobleme mit Nebenbedingung",
      titleZH: "实际几何与经济最优化建模",
      summaryDE: "Zielfunktion aufstellen, Nebenbedingung einsetzen, auf Randextrema und Definitionsbereich achten.",
      summaryZH: "目标函数构建、约束条件消元、一阶求导驻点与闭区间端点值比对 (AFB III)。",
      category: "Optimierungsmodell",
      curriculumTier: "Q2",
      stage: "klausur_praxis",
      level: 3,
      xpReward: 160,
      estimatedMinutes: 20,
      prerequisites: ["mathe-kurvendiskussion-kriterien"],
      linkedToolId: "box-optimizer",
      linkedNoteId: "03_Mathe/Klausur-Training/Mathe-Operatoren-Check.md",
      keyFormulaOrSentence: "Antwortsatz im Sachkontext inklusive Überprüfung der Randwerte ist obligatorisch.",
      klausurTip: "Immer physikalischen oder ökonomischen Antwortsatz mit SI-Einheiten formulieren (+1 BE).",
      layerIndex: 4,
      coordinates: { x: 880, y: 150 },
      tags: ["Optimierung", "AFB-III", "Modellierung"],
    },
  ],
  edges: [
    { id: "me1", from: "mathe-aenderungsrate-sekante", to: "mathe-lokale-ableitung-grenzwert", type: "prerequisite" },
    { id: "me2", from: "mathe-lokale-ableitung-grenzwert", to: "mathe-ableitungsregeln-polynom", type: "prerequisite" },
    { id: "me3", from: "mathe-ableitungsregeln-polynom", to: "mathe-kurvendiskussion-kriterien", type: "prerequisite" },
    { id: "me4", from: "mathe-kurvendiskussion-kriterien", to: "mathe-extremwert-optimierung", type: "prerequisite" },
  ],
};

export const BUILTIN_PHILO_GRAPH: SubjectKnowledgeGraph = {
  schemaVersion: 1,
  fach: "Philosophie",
  nameDE: "Philosophie",
  nameZH: "哲学 (Philosophie)",
  descriptionDE: "Praktische Philosophie: Von Bentham und Kant zur Urteilskompetenz (NRW Oberstufe)",
  descriptionZH: "实践哲学：功利论、定言命令与现代伦理困境评价 (引力星系图谱)",
  isCustomSubject: false,
  categories: ["Utilitarismus", "Deontologie", "Angewandte-Ethik"],
  availableTags: ["Bentham", "Kant", "Ethik-Waage", "Dilemma", "AFB-III"],
  nodes: [
    {
      id: "philo-hedonismus-bentham",
      fach: "Philosophie",
      titleDE: "Klassischer Utilitarismus (Bentham)",
      titleZH: "边沁量化算盘与古典功利主义",
      summaryDE: "Das größte Glück der größten Zahl. Hedonistisches Kalkül bewertet Handlungsfolgen rein quantitativ.",
      summaryZH: "最大多数人的最大快乐；7维快乐算盘量化衡量行为后果，目的证成手段。",
      category: "Utilitarismus",
      curriculumTier: "EF",
      stage: "einfuehrung",
      level: 1,
      xpReward: 70,
      estimatedMinutes: 10,
      prerequisites: [],
      linkedToolId: "ethik-waage",
      keyFormulaOrSentence: "Eine Handlung ist moralisch geboten, wenn sie die Bilanz von Lust über Unlust maximiert.",
      layerIndex: 0,
      coordinates: { x: 100, y: 150 },
      tags: ["Bentham", "Hedonismus", "Quantitativ"],
    },
    {
      id: "philo-utilitarismus-mill",
      fach: "Philosophie",
      titleDE: "Qualitativer Hedonismus (Mill)",
      titleZH: "密尔高阶快乐与质的功利主义",
      summaryDE: "Differenzierung zwischen geistig-moralischen und rein sinnlichen Lüsten (Besser Sokrates unzufrieden).",
      summaryZH: "区分精神快乐与感官快乐；胜任裁判官论证；宁做不满足的苏格拉底不做满足的蠢猪。",
      category: "Utilitarismus",
      curriculumTier: "Q1",
      stage: "grundlagen",
      level: 2,
      xpReward: 100,
      estimatedMinutes: 12,
      prerequisites: ["philo-hedonismus-bentham"],
      linkedNoteId: "07_Philosophie/Texte-Analyse/Mill-Utilitarismus-Qualitativer-Hedonismus.md",
      keyFormulaOrSentence: "Geistige Freuden besitzen höhere Qualität und wiegen quantitative sinnliche Genüsse auf.",
      layerIndex: 1,
      coordinates: { x: 320, y: 150 },
      tags: ["Mill", "Qualitativ", "Regelutilitarismus"],
    },
    {
      id: "philo-kant-kategorischer-imperativ",
      fach: "Philosophie",
      titleDE: "Kategorischer Imperativ (Kant)",
      titleZH: "康德定言命令与先验自律义务论",
      summaryDE: "Deontologische Ethik: Pflichtgemäßes Handeln aus Pflicht. Grundformel und Menschheits-Zweck-Formel.",
      summaryZH: "义务论断言：准则普遍化检验无思维或意志矛盾；人永远作为目的而非单纯工具。",
      category: "Deontologie",
      curriculumTier: "Q1",
      stage: "vertiefung",
      level: 2,
      xpReward: 130,
      estimatedMinutes: 15,
      prerequisites: ["philo-utilitarismus-mill"],
      linkedReiseId: "Philo-Utilitarismus-Kant-L2",
      linkedNoteId: "07_Philosophie/Kant-Kategorischer-Imperativ-und-Maximenpruefung.md",
      linkedToolId: "ethik-waage",
      keyFormulaOrSentence: "Handle nur nach derjenigen Maxime, durch die du zugleich wollen kannst, dass sie ein allgemeines Gesetz werde.",
      commonFallacy: "Kategorischen Imperativ mit der Goldenen Regel (Was du nicht willst...) verwechseln.",
      layerIndex: 2,
      coordinates: { x: 540, y: 150 },
      tags: ["Kant", "Pflichtethik", "Imperativ"],
    },
    {
      id: "philo-dilemma-diskurs",
      fach: "Philosophie",
      titleDE: "Ethische Dilemmata & Klausur-Urteil",
      titleZH: "道德两难案例与哲学评价 (AFB III)",
      summaryDE: "Konfrontation von Konsequentialismus und Deontologie bei Triage, Weichesteller und autonomem Fahren.",
      summaryZH: "电车难题、ICU医疗分配与自动驾驶伦理中功利论与义务论的正面对撞与权衡辩护。",
      category: "Angewandte-Ethik",
      curriculumTier: "Q2",
      stage: "klausur_praxis",
      level: 3,
      xpReward: 160,
      estimatedMinutes: 18,
      prerequisites: ["philo-kant-kategorischer-imperativ"],
      linkedNoteId: "07_Philosophie/Texte-Analyse/Ethische-Dilemmata-Sammlung.md",
      keyFormulaOrSentence: "In AFB III müssen Kantische Menschenwürde und utilitaristische Schadensminimierung diskursiv gewürdigt werden.",
      klausurTip: "Kein fauler Kompromiss! Eindeutige Begründungswahl treffen und Gegenargumente gezielt entkräften.",
      layerIndex: 3,
      coordinates: { x: 760, y: 150 },
      tags: ["Dilemma", "Triage", "AFB-III"],
    },
  ],
  edges: [
    { id: "pe1", from: "philo-hedonismus-bentham", to: "philo-utilitarismus-mill", type: "prerequisite" },
    { id: "pe2", from: "philo-utilitarismus-mill", to: "philo-kant-kategorischer-imperativ", type: "prerequisite" },
    { id: "pe3", from: "philo-kant-kategorischer-imperativ", to: "philo-dilemma-diskurs", type: "prerequisite" },
  ],
};

/** 全局单例学科图谱注册表 */
export const graphRegistry = new SubjectGraphRegistryImpl();
