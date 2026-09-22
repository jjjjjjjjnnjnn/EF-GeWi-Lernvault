// LLM-diagramme (D1b): prompt-bau + svg-sanitizer + sitzungscache.
// Unerlaubtes/fehlerhaftes svg -> null (aufrufer zeigt ascii-pre).
import type { ChatMsg } from "../ai/engine";

export const DIAGRAM_SYSTEM = `Du erzeugst EINE Inline-SVG-Grafik für eine EF-Klausur-Lernkarte (SoWi/Philo/Naturwiss.).
REGELN:
- Antworte NUR mit dem <svg …>…</svg>-Code, kein Markdown, keine Erklärung.
- Erlaubt: svg, g, defs, marker, rect, circle, ellipse, line, polyline, polygon, path, text, tspan, title, desc.
- VERBOTEN: script, foreignObject, image, animation, event-attribute (onclick …), externe refs.
- Farben: nur #1C1B17 (Linien/Text), #6B675C (sekundär), #4338CA (Akzent), #E5E1D8 (Rahmen), transparent/white Füllung.
- Max. 12 kurze Labels (deutsch + knapp chinesisch ok), viewBox="0 0 400 260", font-family="serif,sans-serif", font-size 11-14.
- Lesereihenfolge: Titel oben, dann Haupt-Boxen, dann Pfeile/Beschriftung unten.`;

export function buildDiagramPrompt(spec: string, thema: string, fach: string): ChatMsg[] {
  return [
    { role: "system", content: DIAGRAM_SYSTEM },
    {
      role: "user",
      content: `Thema: ${thema} (${fach}). ASCII-Vorlage (Struktur übernehmen, NICHT 1:1 kopieren):\n${spec.slice(0, 1200)}`,
    },
  ];
}

const ALLOWED_TAGS = new Set([
  "svg", "g", "defs", "marker", "rect", "circle", "ellipse", "line",
  "polyline", "polygon", "path", "text", "tspan", "title", "desc",
]);

const MAX_SVG_LEN = 20000;

export function sanitizeSvg(raw: string): string | null {
  if (!raw || raw.length > MAX_SVG_LEN * 2) return null;
  const start = raw.indexOf("<svg");
  const end = raw.lastIndexOf("</svg>");
  if (start < 0 || end <= start) return null;
  let svg = raw.slice(start, end + 6);
  if (svg.length > MAX_SVG_LEN) return null;
  // event-handler + js-uris + style-url() raus
  svg = svg.replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, "");
  if (/javascript\s*:/i.test(svg)) return null;
  if (/url\s*\(/i.test(svg)) return null;
  // nur erlaubte tags
  const tags = svg.match(/<\/?([a-zA-Z]+)/g) ?? [];
  for (const t of tags) {
    const name = t.replace(/<\/?/, "").toLowerCase();
    if (!ALLOWED_TAGS.has(name)) return null;
  }
  if (!svg.includes("viewBox")) return null;
  return svg;
}

// sitzungscache: kurs#step#index -> svg (kein re-brennen pro klick)
const svgCache = new Map<string, string>();

export function diagramCacheKey(courseId: string, step: number, index: number): string {
  return `${courseId}#${step}#${index}`;
}

export function getCachedSvg(key: string): string | undefined {
  return svgCache.get(key);
}

export function setCachedSvg(key: string, svg: string): void {
  if (svgCache.size > 50) svgCache.clear();
  svgCache.set(key, svg);
}

export function clearDiagramCache(): void {
  svgCache.clear();
}
