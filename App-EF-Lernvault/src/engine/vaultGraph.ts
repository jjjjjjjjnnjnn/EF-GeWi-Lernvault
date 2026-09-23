// Vault 双向知识图谱与概念依赖网络
// 解析 [[Wiki-Links]] 与 Markdown 超链接，计算入链 (Backlinks)、出链 (ForwardLinks)、中心节点与概念邻域

export interface GraphNode {
  id: string;          // 规范化笔记唯一 ID 或路径
  thema: string;       // 德语主题名
  fach: string;        // 学科分类
  tags: string[];      // 标签
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;      // 关系标注 (如 "setzt voraus", "vergleicht mit")
}

export interface VaultGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface NoteLinkContext {
  id: string;
  thema: string;
  fach: string;
  content: string;     // 全文文本 (含 frontmatter 与正文)
  tags?: string[];
}

/** 规范化笔记标题与文件名，用于跨链接精确对齐 */
export function normalizeLinkTarget(rawTarget: string): string {
  if (!rawTarget) return "";
  let clean = rawTarget.trim();
  // 移除可能存在的锚点 #heading
  const hashIdx = clean.indexOf("#");
  if (hashIdx >= 0) clean = clean.slice(0, hashIdx).trim();
  // 移除 .md 后缀
  clean = clean.replace(/\.md$/i, "");
  // 提取路径中的文件名 (如 "08_SoWi/Soziale-Mobilitaet" -> "Soziale-Mobilitaet")
  const slashIdx = clean.lastIndexOf("/");
  if (slashIdx >= 0) clean = clean.slice(slashIdx + 1);
  return clean.toLowerCase();
}

/** 提取文本中的所有维基链接 [[Target]] 与 Markdown 链接 [Text](Path) */
export function extractLinks(text: string): { target: string; alias?: string }[] {
  const links: { target: string; alias?: string }[] = [];
  if (!text) return links;

  // 1. 匹配 [[Target]] 或 [[Target|Alias]]
  const wikiRegex = /\[\[([^[\]]+)\]\]/g;
  let match: RegExpExecArray | null;
  while ((match = wikiRegex.exec(text)) !== null) {
    const inner = match[1].trim();
    if (!inner) continue;
    const pipeIdx = inner.indexOf("|");
    if (pipeIdx >= 0) {
      const target = inner.slice(0, pipeIdx).trim();
      const alias = inner.slice(pipeIdx + 1).trim();
      links.push({ target, alias });
    } else {
      links.push({ target: inner });
    }
  }

  // 2. 匹配 Markdown 相对链接 [Alias](Target.md) 或 [Alias](path/Target.md)
  const mdLinkRegex = /\[([^\]]+)\]\(([^)]+\.md(?:#[^)]*)?)\)/g;
  while ((match = mdLinkRegex.exec(text)) !== null) {
    const alias = match[1].trim();
    const rawTarget = match[2].trim();
    links.push({ target: rawTarget, alias });
  }

  return links;
}

export class VaultGraph {
  private nodes = new Map<string, GraphNode>();
  private targetToNodeId = new Map<string, string>(); // 规范化目标名 -> nodeId
  private forwardEdges = new Map<string, Set<string>>(); // source -> targets
  private backwardEdges = new Map<string, Set<string>>(); // target -> sources

  /** 从笔记列表构建完整图谱 */
  public build(notes: NoteLinkContext[]): void {
    this.nodes.clear();
    this.targetToNodeId.clear();
    this.forwardEdges.clear();
    this.backwardEdges.clear();

    // 1. 注册所有节点与索引别名
    for (const note of notes) {
      const node: GraphNode = {
        id: note.id,
        thema: note.thema,
        fach: note.fach,
        tags: note.tags ?? [],
      };
      this.nodes.set(note.id, node);
      this.forwardEdges.set(note.id, new Set());
      this.backwardEdges.set(note.id, new Set());

      // 注册标准规范名、主题名以及文件名
      const normId = normalizeLinkTarget(note.id);
      const normThema = normalizeLinkTarget(note.thema);
      if (normId) this.targetToNodeId.set(normId, note.id);
      if (normThema) this.targetToNodeId.set(normThema, note.id);
    }

    // 2. 解析链接并建立双向边
    for (const note of notes) {
      const links = extractLinks(note.content);
      for (const link of links) {
        const normTarget = normalizeLinkTarget(link.target);
        const targetNodeId = this.targetToNodeId.get(normTarget);
        if (targetNodeId && targetNodeId !== note.id) {
          this.forwardEdges.get(note.id)?.add(targetNodeId);
          this.backwardEdges.get(targetNodeId)?.add(note.id);
        }
      }
    }
  }

  /** 获取某个笔记的出链 (它引用的笔记) */
  public getForwardLinks(nodeId: string): GraphNode[] {
    const targets = this.forwardEdges.get(nodeId);
    if (!targets) return [];
    return Array.from(targets)
      .map((id) => this.nodes.get(id))
      .filter((n): n is GraphNode => !!n);
  }

  /** 获取某个笔记的反向链接 (谁引用了它，Backlinks) */
  public getBacklinks(nodeId: string): GraphNode[] {
    const sources = this.backwardEdges.get(nodeId);
    if (!sources) return [];
    return Array.from(sources)
      .map((id) => this.nodes.get(id))
      .filter((n): n is GraphNode => !!n);
  }

  /** 获取孤岛笔记 (无入链且无出链的未连接概念) */
  public getOrphanNodes(): GraphNode[] {
    const orphans: GraphNode[] = [];
    for (const [id, node] of this.nodes.entries()) {
      const outCount = this.forwardEdges.get(id)?.size ?? 0;
      const inCount = this.backwardEdges.get(id)?.size ?? 0;
      if (outCount === 0 && inCount === 0) {
        orphans.push(node);
      }
    }
    return orphans;
  }

  /** 获取核心枢纽节点 (按总连接度排序) */
  public getHubNodes(topK = 5): { node: GraphNode; degree: number }[] {
    const list: { node: GraphNode; degree: number }[] = [];
    for (const [id, node] of this.nodes.entries()) {
      const outCount = this.forwardEdges.get(id)?.size ?? 0;
      const inCount = this.backwardEdges.get(id)?.size ?? 0;
      list.push({ node, degree: outCount + inCount });
    }
    return list.sort((a, b) => b.degree - a.degree).slice(0, topK);
  }

  /**
   * 获取围绕某个节点的邻域子图 (广度优先遍历至 maxDepth)
   */
  public getNeighborhood(nodeId: string, maxDepth = 1): VaultGraphData {
    if (!this.nodes.has(nodeId)) {
      return { nodes: [], edges: [] };
    }

    const visitedNodes = new Set<string>([nodeId]);
    const edges: GraphEdge[] = [];
    let currentLevel = new Set<string>([nodeId]);

    for (let depth = 0; depth < maxDepth; depth++) {
      const nextLevel = new Set<string>();

      for (const curr of currentLevel) {
        // 出边
        const targets = this.forwardEdges.get(curr) ?? new Set();
        for (const t of targets) {
          edges.push({ source: curr, target: t });
          if (!visitedNodes.has(t)) {
            visitedNodes.add(t);
            nextLevel.add(t);
          }
        }

        // 入边
        const sources = this.backwardEdges.get(curr) ?? new Set();
        for (const s of sources) {
          edges.push({ source: s, target: curr });
          if (!visitedNodes.has(s)) {
            visitedNodes.add(s);
            nextLevel.add(s);
          }
        }
      }

      currentLevel = nextLevel;
      if (currentLevel.size === 0) break;
    }

    const nodes = Array.from(visitedNodes)
      .map((id) => this.nodes.get(id))
      .filter((n): n is GraphNode => !!n);

    return { nodes, edges };
  }

  /** 导出全图数据供可视化模块使用 */
  public exportFullGraph(): VaultGraphData {
    const nodes = Array.from(this.nodes.values());
    const edges: GraphEdge[] = [];
    for (const [source, targets] of this.forwardEdges.entries()) {
      for (const target of targets) {
        edges.push({ source, target });
      }
    }
    return { nodes, edges };
  }
}
