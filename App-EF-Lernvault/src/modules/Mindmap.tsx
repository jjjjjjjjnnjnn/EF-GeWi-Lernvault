import { useMemo, useState } from "react";
import { notes as mockNotes } from "../data";
import { getFach, FAECHER } from "../fach";
import { VaultGraph } from "../engine/vaultGraph";
import type { VaultNote } from "../vault/parser";
import type { Lang } from "../i18n";

interface MindmapNote {
  id: string;
  fach: string;
  thema: string;
  sub: string;
  operatoren: string[];
  content: string;
  tags: string[];
}

interface LayoutNode {
  key: string;
  kind: "root" | "subject" | "topic";
  label: string;
  sub: string;
  query: string;
  x: number;
  y: number;
  width: number;
  height: number;
  note?: MindmapNote;
  isHub?: boolean;
  degree?: number;
}

interface LayoutEdge {
  from: string;
  to: string;
  isCrossLink?: boolean;
}

interface DiagramLayout {
  width: number;
  height: number;
  nodes: LayoutNode[];
  edges: LayoutEdge[];
}

export default function Mindmap({
  lang = "zh",
  vaultNotes = null,
  selectedFach = "alle",
  onSubjectChange,
  onJumpToLibrary,
}: {
  lang?: Lang;
  vaultNotes?: VaultNote[] | null;
  selectedFach?: string;
  onSubjectChange?: (fach: string) => void;
  onJumpToLibrary?: (query: string, fach?: string, noteId?: string) => void;
}) {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1.0);
  const [layoutMode, setLayoutMode] = useState<"nebula" | "radial">("nebula");

  const notesList = useMemo<MindmapNote[]>(() => {
    if (vaultNotes && vaultNotes.length > 0) {
      return vaultNotes.map((note) => ({
        id: note.id,
        fach: note.fach,
        thema: note.thema,
        sub: note.path,
        operatoren: note.operatoren,
        content: note.blocks.map((block) => block.text).join("\n"),
        tags: note.tags,
      }));
    }
    return mockNotes.map((note) => ({
      id: note.id,
      fach: note.fach,
      thema: note.thema,
      sub: note.zh,
      operatoren: note.operatoren,
      content: [...note.bodyDE, ...note.bodyZH].join("\n"),
      tags: [],
    }));
  }, [vaultNotes]);

  const graph = useMemo(() => {
    const vaultGraph = new VaultGraph();
    vaultGraph.build(
      notesList.map((note) => ({
        id: note.id,
        thema: note.thema,
        fach: note.fach,
        content: note.content,
        tags: note.tags,
      }))
    );
    return vaultGraph;
  }, [notesList]);

  const graphData = useMemo(() => graph.exportFullGraph(), [graph]);

  const grouped = useMemo(() => {
    const map = new Map<string, MindmapNote[]>();
    for (const note of notesList) {
      const list = map.get(note.fach) ?? [];
      list.push(note);
      map.set(note.fach, list);
    }
    return map;
  }, [notesList]);

  const degreeById = useMemo(() => {
    const degrees = new Map<string, number>();
    for (const edge of graphData.edges) {
      degrees.set(edge.source, (degrees.get(edge.source) ?? 0) + 1);
      degrees.set(edge.target, (degrees.get(edge.target) ?? 0) + 1);
    }
    return degrees;
  }, [graphData.edges]);

  const hubIds = useMemo(
    () =>
      new Set(
        graph
          .getHubNodes(3)
          .filter((entry) => entry.degree > 0)
          .map((entry) => entry.node.id)
      ),
    [graph]
  );

  const filteredGrouped = useMemo(() => {
    if (!selectedFach || selectedFach === "alle") return grouped;
    const map = new Map<string, MindmapNote[]>();
    const list = grouped.get(selectedFach);
    if (list) map.set(selectedFach, list);
    return map;
  }, [grouped, selectedFach]);

  // Multicentric Radial Constellation Graph Algorithm (发散性星系图谱算法)
  const layout = useMemo<DiagramLayout>(() => {
    const isAll = !selectedFach || selectedFach === "alle";
    const width = 1100;
    const height = 900;
    const cx = width / 2;
    const cy = height / 2;

    const nodes: LayoutNode[] = [];
    const edges: LayoutEdge[] = [];
    const topicNodes = new Map<string, LayoutNode>();

    const rootLabel = lang === "de" ? "Wissensnetzwerk" : "知识星系网络";

    if (isAll) {
      // 1. Central Core Node
      nodes.push({
        key: "root",
        kind: "root",
        label: rootLabel,
        sub: lang === "de" ? "10 Fächer Vernetzung" : "全学科发散图谱",
        query: "",
        x: cx,
        y: cy,
        width: 140,
        height: 48,
      });

      // 2. 10 Subject Hubs radiating in inner orbit (R = 210px)
      const subjects = Array.from(filteredGrouped.entries());
      const subCount = Math.max(1, subjects.length);
      const rSubj = layoutMode === "radial" ? 180 : 210;

      subjects.forEach(([fachName, subjectNotes], idx) => {
        const info = getFach(fachName);
        const kurz = info?.kurz ?? fachName.slice(0, 2).toUpperCase();
        const label = lang === "de" ? info?.nameDE ?? fachName : info?.nameZH ?? fachName;

        const theta = (2 * Math.PI * idx) / subCount - Math.PI / 2;
        const sx = cx + rSubj * Math.cos(theta);
        const sy = cy + rSubj * Math.sin(theta);

        const subjectNode: LayoutNode = {
          key: `subject:${fachName}`,
          kind: "subject",
          label,
          sub: `${kurz} · ${subjectNotes.length}`,
          query: fachName,
          x: sx,
          y: sy,
          width: 110,
          height: 38,
        };
        nodes.push(subjectNode);
        edges.push({ from: "root", to: subjectNode.key });

        // 3. Subject topics radiating outward into outer space
        const nTopics = subjectNotes.length;
        if (nTopics > 0) {
          const maxSpread = layoutMode === "radial" ? 0.35 : 0.48;
          const rBase = layoutMode === "radial" ? 310 : 340;
          const rStep = layoutMode === "radial" ? 55 : 65;

          subjectNotes.forEach((note, j) => {
            const spreadOffset =
              nTopics === 1 ? 0 : ((j - (nTopics - 1) / 2) / Math.max(1, nTopics - 1)) * maxSpread;
            const topicAngle = theta + spreadOffset;
            const tier = j % 3;
            const rTopic = rBase + tier * rStep;

            const tx = cx + rTopic * Math.cos(topicAngle);
            const ty = cy + rTopic * Math.sin(topicAngle);

            const isHub = hubIds.has(note.id);
            const degree = degreeById.get(note.id) ?? 0;

            const topicNode: LayoutNode = {
              key: `topic:${note.id}`,
              kind: "topic",
              label: note.thema,
              sub: note.sub,
              query: note.thema,
              x: tx,
              y: ty,
              width: 130,
              height: 52,
              note,
              isHub,
              degree,
            };

            nodes.push(topicNode);
            topicNodes.set(note.id, topicNode);
            edges.push({ from: subjectNode.key, to: topicNode.key });
          });
        }
      });
    } else {
      // Single Subject Focused Solar System View
      const subjectNotes = filteredGrouped.get(selectedFach) ?? [];
      const info = getFach(selectedFach);
      const kurz = info?.kurz ?? selectedFach.slice(0, 2).toUpperCase();
      const label = lang === "de" ? info?.nameDE ?? selectedFach : info?.nameZH ?? selectedFach;

      // 1. Root & Subject placed at Center
      nodes.push({
        key: "root",
        kind: "root",
        label: `${label} · ${rootLabel}`,
        sub: `${kurz} · ${subjectNotes.length} ${lang === "de" ? "Themen" : "个发散主题"}`,
        query: selectedFach,
        x: cx,
        y: cy,
        width: 170,
        height: 54,
      });

      const subjectNode: LayoutNode = {
        key: `subject:${selectedFach}`,
        kind: "subject",
        label,
        sub: `${kurz} Hub`,
        query: selectedFach,
        x: cx,
        y: cy - 4,
        width: 170,
        height: 54,
      };
      nodes.push(subjectNode);
      edges.push({ from: "root", to: subjectNode.key });

      // 2. Concentric Orbit Radiation: 3 rings (R = 180, 295, 410)
      const nTopics = subjectNotes.length;
      if (nTopics > 0) {
        subjectNotes.forEach((note, j) => {
          const ringIndex = j % 3;
          const ringRadii = [180, 295, 410];
          const ringRadius = ringRadii[ringIndex];

          const countInRing = Math.ceil(nTopics / 3);
          const posInRing = Math.floor(j / 3);
          const baseOffset = ringIndex * 0.35;
          const phi = (2 * Math.PI * posInRing) / Math.max(1, countInRing) + baseOffset - Math.PI / 2;

          const tx = cx + ringRadius * Math.cos(phi);
          const ty = cy + ringRadius * Math.sin(phi);

          const isHub = hubIds.has(note.id);
          const degree = degreeById.get(note.id) ?? 0;

          const topicNode: LayoutNode = {
            key: `topic:${note.id}`,
            kind: "topic",
            label: note.thema,
            sub: note.sub,
            query: note.thema,
            x: tx,
            y: ty,
            width: 140,
            height: 54,
            note,
            isHub,
            degree,
          };

          nodes.push(topicNode);
          topicNodes.set(note.id, topicNode);
          edges.push({ from: subjectNode.key, to: topicNode.key });
        });
      }
    }

    // Cross-disciplinary and intra-disciplinary link edges (Vernetzung)
    for (const edge of graphData.edges) {
      const source = topicNodes.get(edge.source);
      const target = topicNodes.get(edge.target);
      if (source && target) {
        edges.push({ from: source.key, to: target.key, isCrossLink: true });
      }
    }

    return { width, height, nodes, edges };
  }, [filteredGrouped, selectedFach, layoutMode, graphData.edges, hubIds, degreeById, lang]);

  const nodeByKey = useMemo(() => {
    return new Map(layout.nodes.map((node) => [node.key, node]));
  }, [layout.nodes]);

  // Compute connected nodes for spotlight hover effect
  const connectedKeys = useMemo(() => {
    if (!hoveredKey) return null;
    const set = new Set<string>([hoveredKey]);
    for (const edge of layout.edges) {
      if (edge.from === hoveredKey) set.add(edge.to);
      if (edge.to === hoveredKey) set.add(edge.from);
    }
    return set;
  }, [hoveredKey, layout.edges]);

  if (notesList.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center font-sans text-sm text-[var(--gray)]">
        {lang === "de"
          ? "Keine Themen gefunden — oben „Vault öffnen“"
          : "暂无知识网络节点 — 点顶部“打开知识库”"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-4">
      {/* Header Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--line)] pb-3">
        <div>
          <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
            {lang === "de" ? "Wissensnetzwerk · Sternkarte" : "学科知识网络 · 发散星系图谱"}
          </h2>
          <p className="mt-0.5 font-sans text-xs text-[var(--gray)]">
            {lang === "de"
              ? "Radial divergierendes Wissensnetzwerk mit interdisziplinären Querverbindungen."
              : "以学科与核心概念为枢纽的发散性星系图谱，放射呈现跨学科知识交织。"}
          </p>
        </div>

        {/* Controls: Layout mode, Zoom, and Subject filter */}
        <div className="flex items-center gap-2">
          {/* Layout Mode Toggle */}
          <div className="flex items-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setLayoutMode("nebula")}
              className={`px-2 py-0.5 rounded-[var(--radius)] transition-colors cursor-pointer ${
                layoutMode === "nebula"
                  ? "bg-[var(--paper)] text-[var(--ink)] font-bold border border-[var(--line)]"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title="Galaktisch divergierende Ansicht"
            >
              {lang === "de" ? "Nebula" : "星系发散"}
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode("radial")}
              className={`px-2 py-0.5 rounded-[var(--radius)] transition-colors cursor-pointer ${
                layoutMode === "radial"
                  ? "bg-[var(--paper)] text-[var(--ink)] font-bold border border-[var(--line)]"
                  : "text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
              title="Kompakter Radial-Orbit"
            >
              {lang === "de" ? "Orbit" : "紧凑环轨"}
            </button>
          </div>

          {/* Zoom Buttons */}
          <div className="flex items-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-0.5 text-xs font-mono">
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.max(0.65, z - 0.1))}
              className="px-2 py-0.5 text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
              title="Verkleinern"
            >
              -
            </button>
            <span className="px-1 text-xs text-[var(--ink)] select-none">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => setZoomScale((z) => Math.min(1.4, z + 0.1))}
              className="px-2 py-0.5 text-[var(--gray)] hover:text-[var(--ink)] cursor-pointer"
              title="Vergrößern"
            >
              +
            </button>
            <button
              type="button"
              onClick={() => setZoomScale(1.0)}
              className="px-1.5 py-0.5 text-xs text-[var(--gray)] hover:text-[var(--ink)] border-l border-[var(--line)] cursor-pointer"
              title="Zurücksetzen"
            >
              1:1
            </button>
          </div>
        </div>
      </div>

      {/* Subject Filter Bar */}
      <div className="flex flex-wrap items-center gap-1 border-b border-[var(--line)] pb-2.5">
        <button
          type="button"
          onClick={() => onSubjectChange?.("alle")}
          className={`px-2 py-1 text-xs font-mono rounded-[var(--radius)] transition-all cursor-pointer ${
            selectedFach === "alle"
              ? "font-medium text-[var(--accent)] border-b-2 border-[var(--accent)] bg-[var(--paper-subtle)]/40"
              : "text-[var(--gray)] hover:text-[var(--ink)]"
          }`}
        >
          {lang === "de" ? "Alle Fächer" : "全部学科"} ({notesList.length})
        </button>
        {FAECHER.map((f) => {
          const isSelected = selectedFach === f.id;
          const count = notesList.filter((n) => n.fach === f.id).length;
          return (
            <button
              type="button"
              key={f.id}
              onClick={() => onSubjectChange?.(isSelected ? "alle" : f.id)}
              className={`px-1.5 py-0.5 text-xs font-mono rounded-[var(--radius)] transition-all cursor-pointer border ${
                isSelected
                  ? "font-medium text-[var(--accent)] border-[var(--accent)] bg-[var(--paper-subtle)]/40"
                  : "border-[var(--line)] text-[var(--gray)] hover:text-[var(--ink)]"
              }`}
            >
              {f.kurz} <span className="text-xs opacity-75">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Radial Galaxy Canvas Viewport */}
      <div className="relative overflow-hidden rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2">
        <div className="overflow-auto max-h-[760px] cursor-grab active:cursor-grabbing">
          <div
            style={{
              position: "relative",
              width: `${layout.width}px`,
              height: `${layout.height}px`,
              margin: "0 auto",
              transform: `scale(${zoomScale})`,
              transformOrigin: "center center",
              transition: "transform 0.15s ease-out",
            }}
          >
            {/* SVG Relationship & Constellation Edges */}
            <svg
              data-relationship-diagram="true"
              aria-hidden="true"
              fill="none"
              stroke="currentColor"
              className="text-[var(--line)]"
              viewBox={`0 0 ${layout.width} ${layout.height}`}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              {/* Background Concentric Orbital Rings */}
              <circle
                cx={layout.width / 2}
                cy={layout.height / 2}
                r="190"
                stroke="var(--line)"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.45"
              />
              <circle
                cx={layout.width / 2}
                cy={layout.height / 2}
                r="310"
                stroke="var(--line)"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.3"
              />
              <circle
                cx={layout.width / 2}
                cy={layout.height / 2}
                r="420"
                stroke="var(--line)"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.2"
              />

              {/* Edge Render Loop: ALL edges are SVG lines for test and rendering contract */}
              {layout.edges.map((edge, index) => {
                const source = nodeByKey.get(edge.from);
                const target = nodeByKey.get(edge.to);
                if (!source || !target) return null;

                const isConnectedToHover =
                  hoveredKey !== null && (edge.from === hoveredKey || edge.to === hoveredKey);
                const isFaded = hoveredKey !== null && !isConnectedToHover;

                return (
                  <line
                    key={`line-${edge.from}-${edge.to}-${index}`}
                    x1={source.x}
                    y1={source.y}
                    x2={target.x}
                    y2={target.y}
                    stroke={
                      edge.isCrossLink
                        ? isConnectedToHover
                          ? "var(--accent)"
                          : "var(--gray)"
                        : isConnectedToHover
                        ? "var(--accent)"
                        : "var(--line)"
                    }
                    strokeWidth={isConnectedToHover ? "2" : "1"}
                    strokeDasharray={edge.isCrossLink ? "4 3" : "none"}
                    strokeOpacity={isFaded ? "0.1" : isConnectedToHover ? "0.9" : "0.75"}
                  />
                );
              })}
            </svg>

            {/* Nodes Render Loop */}
            {layout.nodes.map((node) => {
              const isRoot = node.kind === "root";
              const isSubject = node.kind === "subject";
              const isTopic = node.kind === "topic";
              const isHovered = hoveredKey === node.key;
              const isConnected = connectedKeys ? connectedKeys.has(node.key) : true;
              const opacity = connectedKeys && !isConnected ? "0.2" : "1.0";

              return (
                <button
                  key={node.key}
                  type="button"
                  data-node-kind={node.kind}
                  data-node-id={node.note?.id ?? node.key}
                  aria-label={`${node.label}${node.sub ? ` · ${node.sub}` : ""}`}
                  title={node.sub ? `${node.label} · ${node.sub}` : node.label}
                  onMouseEnter={() => setHoveredKey(node.key)}
                  onMouseLeave={() => setHoveredKey(null)}
                  onClick={() =>
                    onJumpToLibrary?.(
                      node.query,
                      node.note?.fach ?? (node.kind === "subject" ? node.query : undefined),
                      node.note?.id
                    )
                  }
                  className="rounded-[var(--radius)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--accent)] transition-all duration-150 cursor-pointer"
                  style={{
                    position: "absolute",
                    left: `${node.x}px`,
                    top: `${node.y}px`,
                    transform: "translate(-50%, -50%)",
                    width: `${node.width}px`,
                    minHeight: `${node.height}px`,
                    padding: isRoot ? "8px 12px" : isSubject ? "6px 8px" : "5px 7px",
                    border: isHovered
                      ? "2px solid var(--accent)"
                      : isRoot
                      ? "2px solid var(--ink)"
                      : node.isHub
                      ? "1.5px solid var(--accent)"
                      : "1px solid var(--line)",
                    backgroundColor: isRoot
                      ? "var(--ink)"
                      : isSubject
                      ? "var(--paper-subtle)"
                      : "var(--paper)",
                    color: isRoot ? "var(--paper)" : "var(--ink)",
                    textAlign: "center",
                    zIndex: isHovered ? 20 : isRoot ? 10 : isSubject ? 5 : 2,
                    fontFamily: isRoot ? "var(--font-mono)" : "var(--font-de)",
                    lineHeight: 1.15,
                    opacity,
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      fontSize: isRoot ? "13px" : isSubject ? "12px" : "12px",
                      fontWeight: isRoot || node.isHub || isSubject ? 600 : 400,
                    }}
                  >
                    {node.label}
                  </span>
                  {node.sub && (
                    <span
                      style={{
                        display: "block",
                        marginTop: "2px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        color: isRoot ? "var(--line)" : "var(--gray)",
                        fontFamily: "var(--font-zh)",
                        fontSize: "var(--text-meta)",
                      }}
                    >
                      {node.sub}
                    </span>
                  )}
                  {isTopic && node.note && (
                    <>
                      {node.note.operatoren.length > 0 && (
                        <span
                          style={{
                            display: "block",
                            marginTop: "4px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "var(--gray)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-meta)",
                          }}
                        >
                          {node.note.operatoren.slice(0, 2).join(" · ")}
                        </span>
                      )}
                      {node.degree && node.degree > 0 ? (
                        <span
                          style={{
                            display: "block",
                            marginTop: "2px",
                            color: "var(--gray)",
                            fontFamily: "var(--font-mono)",
                            fontSize: "var(--text-meta)",
                          }}
                        >
                          {node.isHub ? `${lang === "de" ? "Hub" : "枢纽"} · ` : ""}
                          {node.degree} {lang === "de" ? "Links" : "链接"}
                        </span>
                      ) : null}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-2.5 font-mono text-xs text-[var(--gray)]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[var(--ink)]" />
            <span>{lang === "de" ? "Zentraler Kern" : "核心枢纽"}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)]" />
            <span>{lang === "de" ? "Fach-Hub" : "学科轨道"}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-2.5 h-2.5 rounded-[var(--radius)] border border-[var(--accent)] bg-[var(--paper)]" />
            <span>{lang === "de" ? "Thema" : "主题卫星"}</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block w-4 h-0.5 border-t border-dashed border-[var(--gray)]" />
            <span>{lang === "de" ? "Interdisziplinär" : "跨学科飞线"}</span>
          </span>
        </div>
        <span>
          {lang === "de"
            ? "Maus über Knoten bewegen zum Fokussieren · Klick öffnet Bibliothek"
            : "鼠标悬停聚焦高亮关联链路 · 点击节点直达笔记"}
        </span>
      </div>
    </div>
  );
}
