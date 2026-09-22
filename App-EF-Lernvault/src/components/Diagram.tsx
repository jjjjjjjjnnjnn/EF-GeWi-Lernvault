import { useEffect, useState } from "react";
import { chat, describeActiveEngine } from "../ai/engine";
import {
  buildDiagramPrompt,
  diagramCacheKey,
  getCachedSvg,
  sanitizeSvg,
  setCachedSvg,
} from "../engine/diagram";
import type { Lang } from "../i18n";

// LLM-figur mit statischem ascii-fallback (offline/engine-aus -> immer noch ein bild).
export default function DiagramFig({
  spec,
  courseId,
  step,
  index,
  thema,
  fach,
  lang,
}: {
  spec: string;
  courseId: string;
  step: number;
  index: number;
  thema: string;
  fach: string;
  lang: Lang;
}) {
  const key = diagramCacheKey(courseId, step, index);
  const [svg, setSvg] = useState<string | null>(() => getCachedSvg(key) ?? null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (svg) return;
    if (describeActiveEngine() === "off") return; // still: ascii-pre
    let alive = true;
    setLoading(true);
    chat(buildDiagramPrompt(spec, thema, fach), { temperature: 0.4, maxTokens: 1200 })
      .then((raw) => {
        if (!alive) return;
        const clean = sanitizeSvg(raw);
        if (clean) {
          setCachedSvg(key, clean);
          setSvg(clean);
        }
      })
      .catch(() => {
        // still: ascii-pre
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return (
    <figure className="my-2 overflow-x-auto rounded-sm border border-[#E5E1D8] bg-white p-3">
      {svg ? (
        <div
          className="mx-auto max-w-[420px] [&_svg]:h-auto [&_svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      ) : (
        <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-[#1C1B17]">
          {spec}
        </pre>
      )}
      <figcaption className="mt-1 font-mono text-[10px] text-[#6B675C]">
        {loading
          ? lang === "de"
            ? "KI zeichnet …"
            : "AI正在画图…"
          : svg
            ? lang === "de"
              ? "KI-Grafik · Vorlage unten im Vault"
              : "AI图解·原稿在知识库"
            : lang === "de"
              ? "Vorlage (KI aus/offline)"
              : "原稿（AI关闭/离线）"}
      </figcaption>
    </figure>
  );
}
