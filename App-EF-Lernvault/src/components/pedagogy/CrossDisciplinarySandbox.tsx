import { useState, useMemo } from "react";
import type { Lang } from "../../i18n";
import {
  getAllVernetzungsClusters,
  type VernetzungsCluster,
  type VernetzungsClusterNode,
} from "../../engine/vernetzung";

export interface CrossDisciplinarySandboxProps {
  lang?: Lang;
  initialClusterId?: string;
  onJumpToSubject?: (fach: string, nodeId?: string) => void;
  onJumpToLibrary?: (query: string, fach?: string, notePath?: string) => void;
}

export function CrossDisciplinarySandbox({
  lang = "zh",
  initialClusterId,
  onJumpToSubject,
  onJumpToLibrary,
}: CrossDisciplinarySandboxProps) {
  const clusters = useMemo(() => getAllVernetzungsClusters(), []);
  const [activeClusterId, setActiveClusterId] = useState<string>(
    initialClusterId || (clusters[0]?.id ?? "cluster_alienation_labor")
  );
  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [hoveredNodeIndex, setHoveredNodeIndex] = useState<number | null>(null);

  const activeCluster = useMemo<VernetzungsCluster>(() => {
    return (
      clusters.find((c) => c.id === activeClusterId) ??
      clusters[0] ?? {
        id: "empty",
        dimension: "alienation_labor_capital",
        titleDE: "",
        titleZH: "",
        summaryDE: "",
        summaryZH: "",
        nodes: [],
        klausurSynthesisDE: "",
        klausurSynthesisZH: "",
      }
    );
  }, [clusters, activeClusterId]);

  const selectedNode = useMemo<VernetzungsClusterNode | null>(() => {
    return activeCluster.nodes[selectedNodeIndex] ?? activeCluster.nodes[0] ?? null;
  }, [activeCluster, selectedNodeIndex]);

  // SVG Geometry Calculation (Center = 240, 200, Radius = 130)
  const svgWidth = 480;
  const svgHeight = 400;
  const cx = svgWidth / 2;
  const cy = svgHeight / 2;
  const radius = 135;

  const nodePositions = useMemo(() => {
    const total = activeCluster.nodes.length;
    return activeCluster.nodes.map((_, idx) => {
      const angle = (2 * Math.PI * idx) / total - Math.PI / 2;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
        angle,
      };
    });
  }, [activeCluster.nodes, cx, cy, radius]);

  return (
    <div
      data-testid="cross-disciplinary-sandbox"
      className="space-y-4 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--surface)] p-4 text-[var(--ink)]"
    >
      {/* Header & Cluster Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--line)] pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-[var(--radius)] border border-[var(--ink)] bg-[var(--ink)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--paper)]">
              AFB III · TOPOLOGIE
            </span>
            <h3 className="font-serif text-lg font-normal text-[var(--ink)]">
              {lang === "de"
                ? "Interdisziplinäres Wissens-Radar"
                : "跨学科联动树形图与考点全景沙盘"}
            </h3>
          </div>
          <p className="mt-1 font-sans text-xs text-[var(--gray)]">
            {lang === "de"
              ? "Verschränkung von Kernkonzepten quer durch GeWi & MINT für Höchstnoten (15 NP)."
              : "文理通识拓扑联结：将文学异化、哲学伦理与社科不平等融会贯通，直达会考最高评价阶（AFB III）。"}
          </p>
        </div>

        {/* Cluster Tabs */}
        <div className="flex flex-wrap items-center gap-1">
          {clusters.map((c) => {
            const isActive = c.id === activeClusterId;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setActiveClusterId(c.id);
                  setSelectedNodeIndex(0);
                  setHoveredNodeIndex(null);
                }}
                className={`rounded-[var(--radius)] px-2.5 py-1 font-mono text-xs transition-colors cursor-pointer border ${
                  isActive
                    ? "border-[var(--ink)] bg-[var(--ink)] text-[var(--paper)] font-medium"
                    : "border-[var(--line)] bg-[var(--paper)] text-[var(--ink)] hover:border-[var(--accent)]"
                }`}
              >
                {c.dimension === "alienation_labor_capital"
                  ? lang === "de"
                    ? "Entfremdung & Kapital"
                    : "异化劳动与资本"
                  : c.dimension === "justice_welfare"
                  ? lang === "de"
                    ? "Gerechtigkeit & Staat"
                    : "正义论与福利国家"
                  : c.dimension === "rate_of_change"
                  ? lang === "de"
                    ? "Änderungsraten"
                    : "变化率与守恒"
                  : lang === "de"
                  ? "Rhetorik & Mediation"
                  : "论辩修辞与中继"}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Sand Table Area: Left SVG Canvas, Right Detail Panel */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Left SVG Chord/Topology Canvas */}
        <div className="flex flex-col items-center justify-center rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-3 lg:col-span-6">
          <div className="mb-2 w-full flex items-center justify-between text-xs font-mono text-[var(--gray)]">
            <span>
              {lang === "de" ? "Topologisches Geflecht" : "拓扑联系网"} (
              {activeCluster.nodes.length} {lang === "de" ? "Fächer" : "学科锚点"})
            </span>
            <span>
              {lang === "de"
                ? "Klick = Fokus · Hover = Verbindung"
                : "点击选择焦点 · 悬停高亮通路"}
            </span>
          </div>

          <div className="relative w-full flex justify-center overflow-hidden">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="max-h-[360px] w-full select-none"
              style={{ overflow: "visible" }}
            >
              {/* Background Concentric Circle Guides */}
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="var(--line)"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
              />
              <circle
                cx={cx}
                cy={cy}
                r={radius * 0.45}
                fill="none"
                stroke="var(--line)"
                strokeWidth="1"
                opacity="0.3"
              />

              {/* Center Nexus Node */}
              <circle
                cx={cx}
                cy={cy}
                r="30"
                fill="var(--paper-subtle)"
                stroke="var(--line)"
                strokeWidth="1"
              />
              <text
                x={cx}
                y={cy - 4}
                textAnchor="middle"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fontWeight="600"
                fill="var(--ink)"
              >
                VERNETZUNG
              </text>
              <text
                x={cx}
                y={cy + 10}
                textAnchor="middle"
                fontSize="9"
                fontFamily="var(--font-zh)"
                fill="var(--gray)"
              >
                {lang === "de" ? "Synergie" : "核心共鸣"}
              </text>

              {/* All Cross-Subject Interconnect Chords */}
              {activeCluster.nodes.map((_, i) => {
                const posI = nodePositions[i];
                if (!posI) return null;
                return activeCluster.nodes.map((_, j) => {
                  if (j <= i) return null;
                  const posJ = nodePositions[j];
                  if (!posJ) return null;

                  const isConnectedToActive =
                    selectedNodeIndex === i ||
                    selectedNodeIndex === j ||
                    hoveredNodeIndex === i ||
                    hoveredNodeIndex === j;

                  return (
                    <line
                      key={`chord-${i}-${j}`}
                      x1={posI.x}
                      y1={posI.y}
                      x2={posJ.x}
                      y2={posJ.y}
                      stroke={
                        isConnectedToActive ? "var(--ink)" : "var(--line)"
                      }
                      strokeWidth={isConnectedToActive ? "2" : "1"}
                      strokeDasharray={isConnectedToActive ? "none" : "3 3"}
                      strokeOpacity={isConnectedToActive ? "0.9" : "0.4"}
                    />
                  );
                });
              })}

              {/* Interactive Subject Satellite Nodes */}
              {activeCluster.nodes.map((node, idx) => {
                const pos = nodePositions[idx];
                if (!pos) return null;
                const isSelected = selectedNodeIndex === idx;
                const isHovered = hoveredNodeIndex === idx;

                return (
                  <g
                    key={`node-${node.fach}-${idx}`}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredNodeIndex(idx)}
                    onMouseLeave={() => setHoveredNodeIndex(null)}
                    onClick={() => setSelectedNodeIndex(idx)}
                    style={{
                      transformOrigin: `${pos.x}px ${pos.y}px`,
                      transformBox: "view-box",
                      transition: "transform 0.15s ease",
                      transform: isSelected || isHovered ? "scale(1.08)" : "scale(1)",
                    }}
                  >
                    {/* Radial Ray to Center */}
                    <line
                      x1={cx}
                      y1={cy}
                      x2={pos.x}
                      y2={pos.y}
                      stroke="var(--line)"
                      strokeWidth="1"
                      strokeDasharray="2 2"
                      opacity="0.5"
                    />

                    {/* Node Bubble */}
                    <rect
                      x={pos.x - 56}
                      y={pos.y - 24}
                      width="112"
                      height="48"
                      rx="4"
                      fill={
                        isSelected
                          ? "var(--ink)"
                          : isHovered
                          ? "var(--paper-subtle)"
                          : "var(--paper)"
                      }
                      stroke={
                        isSelected
                          ? "var(--ink)"
                          : isHovered
                          ? "var(--accent)"
                          : "var(--line)"
                      }
                      strokeWidth={isSelected || isHovered ? "2" : "1"}
                    />

                    {/* Subject Badge */}
                    <text
                      x={pos.x}
                      y={pos.y - 6}
                      textAnchor="middle"
                      fontSize="10"
                      fontFamily="var(--font-mono)"
                      fontWeight="bold"
                      fill={isSelected ? "var(--paper)" : "var(--ink)"}
                    >
                      [{node.fach}]
                    </text>

                    {/* Topic Short Text */}
                    <text
                      x={pos.x}
                      y={pos.y + 11}
                      textAnchor="middle"
                      fontSize="9"
                      fontFamily="var(--font-serif)"
                      fill={isSelected ? "var(--paper)" : "var(--gray)"}
                    >
                      {node.thema.length > 14
                        ? `${node.thema.slice(0, 13)}…`
                        : node.thema}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Detail & Transit Panel */}
        <div className="flex flex-col justify-between space-y-3 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] p-4 lg:col-span-6">
          {selectedNode ? (
            <div className="space-y-3">
              {/* Selected Node Header */}
              <div className="flex items-center justify-between border-b border-[var(--line)] pb-2">
                <div className="flex items-center gap-2">
                  <span className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] px-2 py-0.5 font-mono text-xs font-semibold text-[var(--ink)]">
                    {selectedNode.fach}
                  </span>
                  <span className="font-serif text-sm font-semibold text-[var(--ink)]">
                    {selectedNode.thema}
                  </span>
                </div>
                <span className="font-mono text-xs text-[var(--gray)]">
                  Node {selectedNodeIndex + 1}/{activeCluster.nodes.length}
                </span>
              </div>

              {/* Role in Topology */}
              <div>
                <p className="font-mono text-xs text-[var(--gray)]">
                  {lang === "de"
                    ? "Rolle im Vernetzungs-Nexus:"
                    : "跨学科联动角色定位："}
                </p>
                <p className="mt-1 font-serif text-sm text-[var(--ink)]">
                  {selectedNode.roleDE}
                </p>
                <p className="mt-0.5 font-sans text-xs text-[var(--gray)]">
                  {selectedNode.roleZH}
                </p>
              </div>

              {/* 1-Click Interdisciplinary Transit Actions */}
              <div className="rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper-subtle)] p-3">
                <p className="font-mono text-xs text-[var(--ink)] font-medium">
                  {lang === "de" ? "1-Klick-Transit & Sprung" : "一键考点穿梭直达"}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedNode.nodeId && onJumpToSubject && (
                    <button
                      type="button"
                      onClick={() =>
                        onJumpToSubject(selectedNode.fach, selectedNode.nodeId)
                      }
                      className="flex items-center gap-1.5 rounded-[var(--radius)] bg-[var(--ink)] px-2.5 py-1.5 font-mono text-xs font-medium text-[var(--paper)] hover:bg-[var(--accent)] cursor-pointer"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M4 8h8M9 5l3 3-3 3" />
                      </svg>
                      <span>
                        {lang === "de"
                          ? `Zu [${selectedNode.fach}] im Lernbaum`
                          : `直达【${selectedNode.fach}】知识树`}
                      </span>
                    </button>
                  )}

                  {selectedNode.notePath && onJumpToLibrary && (
                    <button
                      type="button"
                      onClick={() =>
                        onJumpToLibrary(
                          selectedNode.thema,
                          selectedNode.fach,
                          selectedNode.notePath
                        )
                      }
                      className="flex items-center gap-1.5 rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)] px-2.5 py-1.5 font-mono text-xs text-[var(--ink)] hover:border-[var(--accent)] cursor-pointer"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        aria-hidden="true"
                      >
                        <path d="M3 3h10v10H3zM6 6h4M6 9h4" />
                      </svg>
                      <span>
                        {lang === "de" ? "Notiz öffnen" : "查阅研习笔记"}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {/* Klausur Synthesis Callout */}
          <div className="border-t border-[var(--line)] pt-3">
            <div className="flex items-center gap-1.5 font-mono text-xs font-medium text-[var(--ink)]">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <polygon points="8 2 10 6 14 7 11 10 12 14 8 12 4 14 5 10 2 7 6 6 8 2" />
              </svg>
              <span>
                {lang === "de"
                  ? "Klausur-Synthese (15 Notenpunkte · AFB III)"
                  : "会考评价阶融通论述（15分满分话术破题）"}
              </span>
            </div>
            <p className="mt-1 font-serif text-xs italic text-[var(--ink)]">
              {activeCluster.klausurSynthesisDE}
            </p>
            <p className="mt-0.5 font-sans text-xs text-[var(--gray)]">
              {activeCluster.klausurSynthesisZH}
            </p>
          </div>
        </div>
      </div>

      {/* Cluster Comparative Matrix (Tufte Tabular Comparison) */}
      <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--line)] bg-[var(--paper)]">
        <table className="w-full text-left font-sans text-xs">
          <thead className="border-b border-[var(--line)] bg-[var(--paper-subtle)] font-mono text-[var(--gray)]">
            <tr>
              <th className="py-2 px-3">{lang === "de" ? "Fach" : "学科"}</th>
              <th className="py-2 px-3">{lang === "de" ? "Thema & Anker" : "核心议题与锚点"}</th>
              <th className="py-2 px-3">{lang === "de" ? "Epistemische Funktion" : "学科认知与会考功能"}</th>
              <th className="py-2 px-3 text-right">{lang === "de" ? "Aktion" : "穿梭操作"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)] font-serif text-[var(--ink)]">
            {activeCluster.nodes.map((node, i) => (
              <tr
                key={`row-${node.fach}-${i}`}
                className={`transition-colors cursor-pointer ${
                  selectedNodeIndex === i ? "bg-[var(--paper-subtle)] font-medium" : "hover:bg-[var(--paper-subtle)]/50"
                }`}
                onClick={() => setSelectedNodeIndex(i)}
              >
                <td className="py-2 px-3 font-mono text-xs">
                  <span className="rounded border border-[var(--line)] px-1.5 py-0.5">
                    {node.fach}
                  </span>
                </td>
                <td className="py-2 px-3 font-sans text-xs font-medium">
                  {node.thema}
                </td>
                <td className="py-2 px-3 font-sans text-xs text-[var(--gray)]">
                  {lang === "de" ? node.roleDE : node.roleZH}
                </td>
                <td className="py-2 px-3 text-right font-mono text-xs">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (node.nodeId && onJumpToSubject) {
                        onJumpToSubject(node.fach, node.nodeId);
                      } else if (node.notePath && onJumpToLibrary) {
                        onJumpToLibrary(node.thema, node.fach, node.notePath);
                      }
                    }}
                    className="rounded border border-[var(--line)] px-2 py-0.5 hover:border-[var(--accent)] hover:bg-[var(--paper)] cursor-pointer"
                  >
                    {lang === "de" ? "Sprung →" : "穿梭 →"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
