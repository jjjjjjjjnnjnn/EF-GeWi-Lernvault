import { mindmapNodes } from "../data";

export default function Mindmap() {
  const root = mindmapNodes[0];
  const dimensionen = mindmapNodes[1];

  return (
    <div className="mx-auto max-w-4xl border border-[#E5E1D8] bg-white p-6 rounded-sm">
      {/* Blueprint-style SVG diagram: 1px hairline links and ink line nodes */}
      <svg viewBox="-40 15 840 305" className="w-full select-none">
        {/* Connection lines: refined hairline */}
        {mindmapNodes.slice(1).map((n) => {
          // Level 2 connects to root, level 3 (y > 200) connects to Dimensionen
          const parent = n.y > 200 ? dimensionen : root;
          return (
            <line
              key={`line-${n.label}`}
              x1={parent.x}
              y1={parent.y + 18}
              x2={n.x}
              y2={n.y + 18}
              stroke="#D1CDC7"
              strokeWidth={1}
            />
          );
        })}

        {/* Node boxes */}
        {mindmapNodes.map((n) => {
          const isRoot = n.root;
          const width = isRoot ? 220 : Math.max(100, n.label.length * 9.2);
          const height = isRoot ? 38 : 34;

          return (
            <g key={n.label} className="cursor-default">
              <rect
                x={n.x - width / 2}
                y={n.y}
                width={width}
                height={height}
                rx={2}
                fill={isRoot ? "#1C1B17" : "#FFFFFF"}
                stroke="#1C1B17"
                strokeWidth={1}
              />
              <text
                x={n.x}
                y={n.y + (isRoot ? 23 : 21)}
                textAnchor="middle"
                fontSize={isRoot ? 12 : 11.5}
                fontFamily={isRoot ? "Georgia, serif" : "system-ui, sans-serif"}
                fill={isRoot ? "#FAFAF7" : "#1C1B17"}
                className="select-none"
              >
                {n.label}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Footnote metadata in archival monospace */}
      <div className="mt-4 flex items-center justify-between border-t border-[#E5E1D8] pt-3 text-xs font-mono text-[#6B675C]">
        <span>
          Auto-Mindmap aus Notiz-Struktur（原型：按标题层级 + frontmatter 生成）
        </span>
        <span className="text-[10px] uppercase tracking-wider text-[#6B675C]">
          Phase 4 Parser
        </span>
      </div>
    </div>
  );
}
