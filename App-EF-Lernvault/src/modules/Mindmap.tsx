import { useMemo, useState } from "react";
import { notes as mockNotes } from "../data";
import { getFach } from "../fach";
import { VaultGraph } from "../engine/vaultGraph";
import { getCurriculumTreeForFach, CURRICULUM_TREES } from "../engine/curriculumTree";
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
  const [showCurriculumMap, setShowCurriculumMap] = useState<boolean>(true);
  const currentCurriculum = selectedFach && selectedFach !== "alle" ? getCurriculumTreeForFach(selectedFach) : null;

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

  const layout = useMemo<DiagramLayout>(() => {
    const subjects = Array.from(filteredGrouped.entries());
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
          {filteredGrouped.size} {lang === "de" ? "Fächer" : "学科"} · {notesList.length}{" "}
          {lang === "de" ? "Themen" : "主题"}
        </div>
      </div>

      {onSubjectChange && (
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-3">
          <div className="flex flex-wrap items-center gap-1">
            {["alle", "Deutsch", "Englisch", "Mathe", "Physik", "Chemie", "Bio", "Philosophie", "SoWi", "Musik", "Sport"].map((f) => {
              const active = (selectedFach || "alle") === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => onSubjectChange(f)}
                  className={`rounded-[var(--radius)] px-2 py-0.5 font-sans text-xs transition-colors cursor-pointer ${
                    active
                      ? "bg-[var(--ink)] text-[var(--paper)] font-medium"
                      : "border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--surface-hover)]"
                  }`}
                >
                  {f === "alle" ? (lang === "de" ? "Alle" : "全部") : f}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setShowCurriculumMap(!showCurriculumMap)}
            className="flex items-center gap-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] px-2.5 py-0.5 font-sans text-xs text-[var(--ink)] hover:bg-[var(--surface-hover)] transition-colors cursor-pointer"
          >
            <span className="font-mono text-xs text-[var(--gray)] font-semibold">
              {showCurriculumMap ? "[-]" : "[+]"}
            </span>
            <span>
              {lang === "de"
                ? (selectedFach === "alle" ? "10 Fächer Lernbäume" : `${selectedFach}-Lernbaum`)
                : (selectedFach === "alle" ? "10门学科大纲学习树" : `${selectedFach} 课程学习树`)}
            </span>
          </button>
        </div>
      )}

      {showCurriculumMap && (
        <div className="space-y-4">
          {currentCurriculum ? (
            <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--line)] pb-2.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-[var(--radius)] bg-[var(--paper)] px-1.5 py-0.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--ink)] border border-[var(--line)]">
                      {currentCurriculum.domain.toUpperCase()}
                    </span>
                    <span className="font-mono text-xs text-[var(--gray)]">
                      {currentCurriculum.klpReferenz}
                    </span>
                  </div>
                  <h3 className="mt-1 font-serif text-base font-semibold text-[var(--ink)]">
                    {lang === "de" ? currentCurriculum.nameDE : currentCurriculum.nameZH} · {lang === "de" ? "Kompetenz-Lernlandkarte" : "课程学习树与知识能力地图"}
                  </h3>
                </div>
                <div className="font-mono text-xs text-[var(--gray)]">
                  {currentCurriculum.inhaltsfelder.length} {lang === "de" ? "Inhaltsfelder" : "内容领域"}
                </div>
              </div>

              <div className="text-xs text-[var(--ink)] bg-[var(--paper)] p-2.5 rounded-[var(--radius)] border border-[var(--line)]">
                <span className="font-mono font-semibold text-[var(--gray)] block mb-0.5">
                  {lang === "de" ? "Klausur-Schwerpunkt:" : "考试题型与考查重点："}
                </span>
                <p className="font-sans text-[var(--ink)]">
                  {lang === "de" ? currentCurriculum.klausurFokusDE : currentCurriculum.klausurFokusZH}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                {currentCurriculum.inhaltsfelder.map((field) => (
                  <div
                    key={field.code}
                    className="flex flex-col rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3"
                  >
                    <div className="border-b border-[var(--line)] pb-2">
                      <div className="flex items-center justify-between">
                        <span className="rounded-[var(--radius)] bg-[var(--paper-subtle)] px-1.5 py-0.5 font-mono text-xs font-semibold text-[var(--ink)] border border-[var(--line)]">
                          {field.code}
                        </span>
                        <span className="font-mono text-xs text-[var(--gray)]">
                          {field.milestones.length} {lang === "de" ? "Stufen" : "阶段"}
                        </span>
                      </div>
                      <h4 className="mt-1 font-serif text-xs font-semibold text-[var(--ink)]">
                        {lang === "de" ? field.titleDE : field.titleZH}
                      </h4>
                      <p className="mt-0.5 font-sans text-xs text-[var(--gray)] line-clamp-2">
                        {lang === "de" ? field.leitgedankeDE : field.leitgedankeZH}
                      </p>
                    </div>

                    <div className="mt-2.5 flex-1 space-y-2">
                      {field.milestones.map((ms) => {
                        const matched = notesList.filter(
                          (n) =>
                            n.fach.toLowerCase() === (selectedFach ?? "").toLowerCase() &&
                            ms.noteKeywords.some(
                              (kw) =>
                                n.thema.toLowerCase().includes(kw) ||
                                n.id.toLowerCase().includes(kw) ||
                                n.content.toLowerCase().includes(kw)
                            )
                        );
                        return (
                          <div
                            key={ms.stufe}
                            className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-2 text-xs"
                          >
                            <div className="flex items-center justify-between text-xs font-mono text-[var(--gray)]">
                              <span>{lang === "de" ? ms.stufeLabelDE : ms.stufeLabelZH}</span>
                              <span className="text-[var(--ink)]">{ms.operatoren.slice(0, 2).join(" · ")}</span>
                            </div>
                            <div className="mt-0.5 font-sans text-xs font-medium text-[var(--ink)]">
                              {lang === "de" ? ms.titleDE : ms.titleZH}
                            </div>
                            <div className="mt-0.5 font-sans text-xs text-[var(--gray)]">
                              {lang === "de" ? ms.leitfrageDE : ms.leitfrageZH}
                            </div>

                            {matched.length > 0 && (
                              <div className="mt-1.5 flex flex-wrap gap-1 border-t border-[var(--line)] pt-1.5">
                                {matched.map((n) => (
                                  <button
                                    key={n.id}
                                    type="button"
                                    onClick={() => onJumpToLibrary?.(n.thema, n.fach, n.id)}
                                    className="group inline-flex items-center gap-1 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] px-1.5 py-0.5 text-left font-sans text-xs text-[var(--ink)] hover:border-[var(--ink)] transition-colors cursor-pointer"
                                  >
                                    <span className="truncate max-w-[150px]">{n.thema}</span>
                                    <span className="font-mono text-xs text-[var(--gray)] group-hover:text-[var(--ink)]">{"->"}</span>
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                <span className="font-serif text-sm font-semibold text-[var(--ink)]">
                  {lang === "de" ? "Gymnasium EF · 10 Fächer Curriculum-Lernbäume" : "高中阶段 (EF) · 10门学科大纲学习树总览"}
                </span>
                <span className="font-mono text-xs text-[var(--gray)]">
                  {lang === "de" ? "Fach anklicken für Detail-Lernbaum" : "点击学科卡片可直达专属学习地图"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
                {Object.values(CURRICULUM_TREES).map((tree) => {
                  const count = notesList.filter(
                    (n) => n.fach.toLowerCase() === tree.fach.toLowerCase()
                  ).length;
                  return (
                    <button
                      key={tree.fach}
                      type="button"
                      onClick={() => onSubjectChange?.(tree.fach)}
                      className="group flex flex-col text-left rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 transition-all hover:border-[var(--ink)] cursor-pointer"
                    >
                      <div className="flex items-center justify-between border-b border-[var(--line)] pb-1.5">
                        <span className="font-mono text-xs uppercase font-semibold text-[var(--accent)]">
                          {tree.domain.toUpperCase()}
                        </span>
                        <span className="font-mono text-xs text-[var(--gray)]">
                          {count} {lang === "de" ? "Notizen" : "笔记"}
                        </span>
                      </div>
                      <h4 className="mt-1.5 font-serif text-xs font-semibold text-[var(--ink)] group-hover:underline">
                        {lang === "de" ? tree.nameDE : tree.nameZH}
                      </h4>
                      <p className="mt-1 font-sans text-xs text-[var(--gray)] line-clamp-2">
                        {lang === "de" ? tree.klausurFokusDE : tree.klausurFokusZH}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1 border-t border-[var(--line)] pt-1.5 text-xs font-mono text-[var(--gray)]">
                        {tree.inhaltsfelder.map((field) => (
                          <span
                            key={field.code}
                            className="rounded-[var(--radius)] bg-[var(--paper-subtle)] px-1 py-0.5 border border-[var(--line)]"
                          >
                            {field.code}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

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
                className="rounded-[var(--radius)] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--accent)]"
                onClick={() =>
                  onJumpToLibrary?.(
                    node.query,
                    node.note?.fach ?? (node.kind === "subject" ? node.query : undefined),
                    node.note?.id
                  )
                }
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
