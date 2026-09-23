export interface GraphNode {
  id: string;
  thema: string;
  fach: string;
  tags: string[];
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
}

export interface VaultGraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export interface NoteLinkContext {
  id: string;
  thema: string;
  fach: string;
  content: string;
  tags?: string[];
}

function cleanPath(value: string): string {
  return value
    .trim()
    .replace(/\\/g, "/")
    .replace(/\/{2,}/g, "/")
    .replace(/^\.\/+/, "")
    .replace(/\/+$/, "");
}

export function normalizeLinkTarget(rawTarget: string): string {
  if (!rawTarget) return "";
  let clean = rawTarget.trim();
  const hashIndex = clean.indexOf("#");
  if (hashIndex >= 0) clean = clean.slice(0, hashIndex).trim();
  clean = clean.replace(/\.md$/i, "");
  return cleanPath(clean).toLowerCase();
}

function basenameTarget(rawTarget: string): string {
  const normalized = normalizeLinkTarget(rawTarget);
  const slashIndex = normalized.lastIndexOf("/");
  return slashIndex >= 0 ? normalized.slice(slashIndex + 1) : normalized;
}

function resolveRelativePath(baseDirectory: string, target: string): string {
  if (target.startsWith("/")) return target.replace(/^\/+/, "");
  const parts = `${baseDirectory}/${target}`.split("/");
  const resolved: string[] = [];
  for (const part of parts) {
    if (!part || part === ".") continue;
    if (part === "..") {
      resolved.pop();
      continue;
    }
    resolved.push(part);
  }
  return resolved.join("/");
}

function addToSet(index: Map<string, Set<string>>, key: string, value: string): void {
  if (!key) return;
  const values = index.get(key) ?? new Set<string>();
  values.add(value);
  index.set(key, values);
}

export function extractLinks(text: string): { target: string; alias?: string }[] {
  const links: { target: string; alias?: string }[] = [];
  if (!text) return links;

  const wikiRegex = /\[\[([^[\]]+)\]\]/g;
  let match: RegExpExecArray | null;
  while ((match = wikiRegex.exec(text)) !== null) {
    const inner = match[1].trim();
    if (!inner) continue;
    const pipeIndex = inner.indexOf("|");
    if (pipeIndex >= 0) {
      const target = inner.slice(0, pipeIndex).trim();
      const alias = inner.slice(pipeIndex + 1).trim();
      if (target) links.push({ target, alias });
    } else {
      links.push({ target: inner });
    }
  }

  const markdownLinkRegex = /\[([^\]]+)\]\(([^)]+\.md(?:#[^)]*)?)\)/g;
  while ((match = markdownLinkRegex.exec(text)) !== null) {
    const alias = match[1].trim();
    const target = match[2].trim();
    if (target) links.push({ target, alias });
  }

  return links;
}

export class VaultGraph {
  private nodes = new Map<string, GraphNode>();
  private exactTargets = new Map<string, string>();
  private basenameTargets = new Map<string, Set<string>>();
  private topicTargets = new Map<string, Set<string>>();
  private forwardEdges = new Map<string, Set<string>>();
  private backwardEdges = new Map<string, Set<string>>();

  private registerExact(key: string, nodeId: string): void {
    if (key && !this.exactTargets.has(key)) this.exactTargets.set(key, nodeId);
  }

  public build(notes: NoteLinkContext[]): void {
    this.nodes.clear();
    this.exactTargets.clear();
    this.basenameTargets.clear();
    this.topicTargets.clear();
    this.forwardEdges.clear();
    this.backwardEdges.clear();

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
      this.registerExact(normalizeLinkTarget(note.id), note.id);
      addToSet(this.basenameTargets, basenameTarget(note.id), note.id);
    }

    for (const note of notes) {
      const topic = normalizeLinkTarget(note.thema);
      if (!topic) continue;
      if (topic.includes("/")) this.registerExact(topic, note.id);
      addToSet(this.topicTargets, topic, note.id);
    }

    for (const note of notes) {
      for (const link of extractLinks(note.content)) {
        const targetNodeId = this.resolveTarget(note.id, link.target);
        if (targetNodeId && targetNodeId !== note.id) {
          this.forwardEdges.get(note.id)?.add(targetNodeId);
          this.backwardEdges.get(targetNodeId)?.add(note.id);
        }
      }
    }
  }

  private resolveTarget(sourceId: string, rawTarget: string): string | undefined {
    const normalized = normalizeLinkTarget(rawTarget);
    if (!normalized) return undefined;

    const exact = this.exactTargets.get(normalized);
    if (exact) return exact;

    const sourcePath = normalizeLinkTarget(sourceId);
    const sourceSlash = sourcePath.lastIndexOf("/");
    const sourceDirectory = sourceSlash >= 0 ? sourcePath.slice(0, sourceSlash) : "";
    const relative = resolveRelativePath(sourceDirectory, normalized);
    const relativeExact = this.exactTargets.get(relative);
    if (relativeExact) return relativeExact;

    const exactTopic = this.topicTargets.get(normalized);
    if (exactTopic?.size === 1) return exactTopic.values().next().value as string;

    const basename = basenameTarget(normalized);
    const byId = this.basenameTargets.get(basename);
    if (byId?.size === 1) return byId.values().next().value as string;

    const byTopic = this.topicTargets.get(basename);
    if (byTopic?.size === 1) return byTopic.values().next().value as string;
    return undefined;
  }

  public getForwardLinks(nodeId: string): GraphNode[] {
    const targets = this.forwardEdges.get(nodeId);
    if (!targets) return [];
    return Array.from(targets)
      .map((id) => this.nodes.get(id))
      .filter((node): node is GraphNode => !!node);
  }

  public getBacklinks(nodeId: string): GraphNode[] {
    const sources = this.backwardEdges.get(nodeId);
    if (!sources) return [];
    return Array.from(sources)
      .map((id) => this.nodes.get(id))
      .filter((node): node is GraphNode => !!node);
  }

  public getOrphanNodes(): GraphNode[] {
    const orphans: GraphNode[] = [];
    for (const [id, node] of this.nodes.entries()) {
      const outCount = this.forwardEdges.get(id)?.size ?? 0;
      const inCount = this.backwardEdges.get(id)?.size ?? 0;
      if (outCount === 0 && inCount === 0) orphans.push(node);
    }
    return orphans;
  }

  public getHubNodes(topK = 5): { node: GraphNode; degree: number }[] {
    const list: { node: GraphNode; degree: number }[] = [];
    for (const [id, node] of this.nodes.entries()) {
      const outCount = this.forwardEdges.get(id)?.size ?? 0;
      const inCount = this.backwardEdges.get(id)?.size ?? 0;
      list.push({ node, degree: outCount + inCount });
    }
    return list.sort((a, b) => b.degree - a.degree).slice(0, topK);
  }

  public getNeighborhood(nodeId: string, maxDepth = 1): VaultGraphData {
    if (!this.nodes.has(nodeId)) return { nodes: [], edges: [] };

    const visitedNodes = new Set<string>([nodeId]);
    const edges: GraphEdge[] = [];
    let currentLevel = new Set<string>([nodeId]);

    for (let depth = 0; depth < maxDepth; depth++) {
      const nextLevel = new Set<string>();
      for (const current of currentLevel) {
        const targets = this.forwardEdges.get(current) ?? new Set();
        for (const target of targets) {
          edges.push({ source: current, target });
          if (!visitedNodes.has(target)) {
            visitedNodes.add(target);
            nextLevel.add(target);
          }
        }
        const sources = this.backwardEdges.get(current) ?? new Set();
        for (const source of sources) {
          edges.push({ source, target: current });
          if (!visitedNodes.has(source)) {
            visitedNodes.add(source);
            nextLevel.add(source);
          }
        }
      }
      currentLevel = nextLevel;
      if (currentLevel.size === 0) break;
    }

    const nodes = Array.from(visitedNodes)
      .map((id) => this.nodes.get(id))
      .filter((node): node is GraphNode => !!node);
    return { nodes, edges };
  }

  public exportFullGraph(): VaultGraphData {
    const nodes = Array.from(this.nodes.values());
    const edges: GraphEdge[] = [];
    for (const [source, targets] of this.forwardEdges.entries()) {
      for (const target of targets) edges.push({ source, target });
    }
    return { nodes, edges };
  }
}
