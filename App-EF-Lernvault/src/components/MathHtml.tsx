import { useEffect, useRef, useState } from "react";

// KaTeX-lazy: erster paint zeigt SOFORT rohtext (kein bundle-block),
// formel hydriert async + modul-cache (re-render gratis).
// Grund: statischer `import katex` zog ~270KB in den erst-chunk.

const htmlCache = new Map<string, string>();
let katexPromise: Promise<typeof import("katex")> | null = null;

function loadKatex(): Promise<typeof import("katex")> {
  if (!katexPromise) katexPromise = import("katex");
  return katexPromise;
}

export function prefetchKatex(): void {
  // fire-and-forget: nach idle, damit spaetere formeln instant aus cache kommen
  try {
    const idle = (window as unknown as { requestIdleCallback?: (fn: () => void) => void }).requestIdleCallback;
    if (idle) idle(() => void loadKatex().catch(() => {}));
    else void loadKatex().catch(() => {});
  } catch {
    /* offline/alt-browser: rohtext bleibt stehen */
  }
}

export default function MathHtml({
  code,
  display,
  cacheKey,
}: {
  code: string;
  display: boolean;
  cacheKey: string;
}) {
  const [html, setHtml] = useState<string | null>(() => htmlCache.get(cacheKey) ?? null);
  const alive = useRef(true);

  useEffect(() => {
    alive.current = true;
    const cached = htmlCache.get(cacheKey);
    if (cached !== undefined) {
      setHtml(cached);
      return;
    }
    let cancelled = false;
    void loadKatex()
      .then((katex) => {
        if (cancelled || !alive.current) return;
        try {
          const out = katex.default.renderToString(code, { displayMode: display, throwOnError: false });
          htmlCache.set(cacheKey, out);
          setHtml(out);
        } catch {
          htmlCache.set(cacheKey, "");
          setHtml("");
        }
      })
      .catch(() => {
        if (!cancelled && alive.current) setHtml("");
      });
    return () => {
      cancelled = true;
    };
  }, [cacheKey, code, display]);

  useEffect(() => {
    prefetchKatex();
    return () => {
      alive.current = false;
    };
  }, []);

  if (html === null) {
    // sofort-paint: rohtext im ziel-stil (layout-shift minimal)
    return display ? (
      <div className="my-2 overflow-x-auto text-center font-mono text-sm text-[var(--ink)]">{code}</div>
    ) : (
      <span className="font-mono text-sm text-[var(--ink)]">{code}</span>
    );
  }
  if (html === "") {
    // katex fehlt/kaputt -> rohtext als code (nie leer)
    return display ? (
      <code className="mb-2 block text-center font-mono text-sm text-[var(--ink)]">{code}</code>
    ) : (
      <code className="font-mono text-xs text-[var(--ink)]">{code}</code>
    );
  }
  return display ? (
    <div
      className="my-2 overflow-x-auto text-center font-serif text-[var(--ink)]"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  ) : (
    <span className="font-serif text-[var(--ink)]" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
