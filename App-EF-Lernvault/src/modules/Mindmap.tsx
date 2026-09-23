import { useMemo } from "react";
import { notes as mockNotes } from "../data";
import { getFach } from "../fach";
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
}

interface LayoutEdge {
  from: string;
  to: string;
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
  onJumpToLibrary,
}: {
  lang?: Lang;
  vaultNotes?: VaultNote[] | null;
  onJumpToLibrary?: (query: string) => void;
}) {
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

  const layout = useMemo<DiagramLayout>(() => {
    const subjects = Array.from(grouped.entries());
    const columnWidth = Math.max(180, 1000 / Math.max(1, subjects.length));
    const width = Math.max(1000, columnWidth * subjects.length);
    const maxTopicCount = Math.max(0, ...subjects.map(([, notes]) => notes.length));
    const height = Math.max(520, 340 + maxTopicCount * 112);
    const rootLabel = lang === "de" ? "Wissensnetzwerk" : "知识网络";
    const nodes: LayoutNode[] = [
      {
        key: "root",
        kind: "root",
        label: rootLabel,
        sub: lang === "de" ? "Gymnasium EF · vernetzt" : "高中阶段 (EF) · 关联",
        query: "",
        x: width / 2,
        y: 54,
        width: 260,
        height: 52,
      },
    ];
    const edges: LayoutEdge[] = [];
    const topicNodes = new Map<string, LayoutNode>();

    subjects.forEach(([fachName, subjectNotes], subjectIndex) => {
      const info = getFach(fachName);
      const kurz = info?.kurz ?? fachName.slice(0, 2).toUpperCase();
      const label = lang === "de" ? info?.nameDE ?? fachName : info?.nameZH ?? fachName;
      const x = subjectIndex * columnWidth + columnWidth / 2;
      const subjectNode: LayoutNode = {
        key: `subject:${fachName}`,
        kind: "subject",
        label,
        sub: `${kurz} · ${subjectNotes.length} ${lang === "de" ? "Notizen" : "笔记"}`,
        query: fachName,
        x,
        y: 174,
        width: Math.min(170, columnWidth - 16),
        height: 50,
      };
      nodes.push(subjectNode);
      edges.push({ from: "root", to: subjectNode.key });

      const topicWidth = Math.min(220, Math.max(140, columnWidth - 24));
      subjectNotes.forEach((note, topicIndex) => {
        const topicNode: LayoutNode = {
          key: `topic:${note.id}`,
          kind: "topic",
          label: note.thema,
          sub: note.sub,
          query: note.thema,
          x,
          y: 304 + topicIndex * 112,
          width: topicWidth,
          height: 78,
          note,
        };
        nodes.push(topicNode);
        topicNodes.set(note.id, topicNode);
        edges.push({ from: subjectNode.key, to: topicNode.key });
      });
    });

    for (const edge of graphData.edges) {
      const source = topicNodes.get(edge.source);
      const target = topicNodes.get(edge.target);
      if (source && target) edges.push({ from: source.key, to: target.key });
    }

    return { width, height, nodes, edges };
  }, [graphData.edges, grouped, lang]);

  if (notesList.length === 0) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center font-sans text-sm text-[var(--gray)]">
        Keine Themen gefunden / 暂无知识树节点 — oben „Vault öffnen“ / 点顶部“打开知识库”
      </div>
    );
  }

  const nodeByKey = new Map(layout.nodes.map((node) => [node.key, node]));

  return (
    <div className="mx-auto max-w-6xl space-y-5">
      <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-3">
        <div>
          <h2 className="font-serif text-xl font-normal text-[var(--ink)]">
            {lang === "de" ? "Wissensnetzwerk · Gymnasium EF" : "学科知识网络 · 高中阶段 (EF)"}
          </h2>
          <p className="mt-0.5 font-sans text-xs text-[var(--gray)]">
            {lang === "de"
              ? "Verbindungen folgen internen Notizlinks. Ein Klick öffnet die Bibliothekssuche."
              : "连线来自笔记内部链接。点击节点即可打开笔记库搜索。"}
          </p>
        </div>
        <div className="shrink-0 font-mono text-xs text-[var(--gray)]">
          {grouped.size} {lang === "de" ? "Fächer" : "学科"} · {notesList.length}{" "}
          {lang === "de" ? "Themen" : "主题"}
        </div>
      </div>

      <div className="overflow-x-auto">
        <div
          style={{
            position: "relative",
            minWidth: `${layout.width}px`,
            height: `${layout.height}px`,
            margin: "0 auto",
          }}
        >
          <svg
            data-relationship-diagram="true"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            className="text-[var(--line)]"
            viewBox={`0 0 ${layout.width} ${layout.height}`}
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {layout.edges.map((edge, index) => {
              const source = nodeByKey.get(edge.from);
              const target = nodeByKey.get(edge.to);
              if (!source || !target) return null;
              return (
                <line
                  key={`${edge.from}-${edge.to}-${index}`}
                  x1={source.x}
                  y1={source.y}
                  x2={target.x}
                  y2={target.y}
                  strokeWidth="1"
                />
              );
            })}
          </svg>

          {layout.nodes.map((node) => {
            const degree = node.note ? degreeById.get(node.note.id) ?? 0 : 0;
            const isHub = node.note ? hubIds.has(node.note.id) : false;
            const rootStyle = node.kind === "root";
            return (
              <button
                key={node.key}
                type="button"
                data-node-kind={node.kind}
                data-node-id={node.note?.id ?? node.key}
                aria-label={`${node.label}${node.sub ? ` · ${node.sub}` : ""}`}
                title={node.sub ? `${node.label} · ${node.sub}` : node.label}
                onClick={() => onJumpToLibrary?.(node.query)}
                className="rounded-[var(--radius)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--accent)]"
                style={{
                  position: "absolute",
                  left: `${(node.x / layout.width) * 100}%`,
                  top: `${node.y}px`,
                  transform: "translate(-50%, -50%)",
                  width: `${(node.width / layout.width) * 100}%`,
                  minWidth: rootStyle ? "150px" : "105px",
                  minHeight: `${node.height}px`,
                  padding: rootStyle ? "10px 14px" : "8px 9px",
                  border: "1px solid var(--ink)",
                  backgroundColor: rootStyle ? "var(--ink)" : "var(--paper)",
                  color: rootStyle ? "var(--paper)" : "var(--ink)",
                  textAlign: "center",
                  cursor: "pointer",
                  zIndex: 1,
                  fontFamily: rootStyle ? "var(--font-mono)" : "var(--font-de)",
                  lineHeight: 1.2,
                }}
              >
                <span
                  style={{
                    display: "block",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    fontSize: rootStyle ? "14px" : node.kind === "subject" ? "13px" : "12px",
                    fontWeight: rootStyle || isHub ? 600 : 400,
                  }}
                >
                  {node.label}
                </span>
                {node.sub && (
                  <span
                    style={{
                      display: "block",
                      marginTop: "4px",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      color: rootStyle ? "var(--line)" : "var(--gray)",
                      fontFamily: "var(--font-zh)",
                      fontSize: "var(--text-meta)",
                    }}
                  >
                    {node.sub}
                  </span>
                )}
                {node.kind === "topic" && node.note && (
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
                    {degree > 0 && (
                      <span
                        style={{
                          display: "block",
                          marginTop: "3px",
                          color: "var(--gray)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-meta)",
                        }}
                      >
                        {isHub ? `${lang === "de" ? "Hub" : "枢纽"} · ` : ""}
                        {degree} {lang === "de" ? "Links" : "链接"}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3 font-mono text-xs text-[var(--gray)]">
        <span>
          {lang === "de"
            ? "Struktur: Netzwerk (Wurzel) → Fach → Thema"
            : "结构：网络（根）→ 学科 → 主题"}
        </span>
        <span>
          {lang === "de"
            ? "Hubs zeigen die Anzahl der Verbindungen"
            : "枢纽显示连接数量"}
        </span>
      </div>
    </div>
  );
}
