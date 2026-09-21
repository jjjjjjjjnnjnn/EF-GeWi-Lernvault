import { mindmapNodes } from "../data";

export default function Mindmap() {
  const root = mindmapNodes[0];
  return (
    <div className="rounded-xl bg-white p-4 shadow">
      <svg viewBox="0 0 800 340" className="w-full">
        {mindmapNodes.slice(1).map((n) => (
          <line key={n.label} x1={root.x} y1={root.y + 20} x2={n.x} y2={n.y} stroke="#c7d2fe" strokeWidth={2} />
        ))}
        {mindmapNodes.map((n) => (
          <g key={n.label}>
            <rect x={n.x - 90} y={n.y} width={180} height={40} rx={12} fill={n.root ? "#4f46e5" : "#eef2ff"} stroke="#4f46e5" />
            <text x={n.x} y={n.y + 25} textAnchor="middle" fontSize={13} fill={n.root ? "#fff" : "#1e1b4b"}>{n.label}</text>
          </g>
        ))}
      </svg>
      <p className="mt-2 text-sm text-slate-500">Auto-Mindmap aus Notiz-Struktur（原型：按标题层级+frontmatter生成；P4 接真实解析器）。</p>
    </div>
  );
}
