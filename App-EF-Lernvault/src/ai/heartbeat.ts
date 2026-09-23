// Leichtgewichtiger Heartbeat- & Verbindungstester für lokale und entfernte KI-Engines (Phase 4).
// Überprüft automatisch LM Studio (Port 1234), Ollama (Port 11434) oder API-Endpunkte.
// Bietet Statusanzeige (online/offline/checking), Latenzmessung in ms und Modellabfrage.

import { loadAiConfig, effectiveBaseUrl } from "./providers";

export type ProbeStatus = "online" | "offline" | "checking" | "disabled";

export interface ProbeResult {
  status: ProbeStatus;
  latencyMs: number;
  providerId: string;
  url: string;
  detectedModels: string[];
  error?: string;
}

let lastResult: ProbeResult = {
  status: "disabled",
  latencyMs: 0,
  providerId: "off",
  url: "",
  detectedModels: [],
};

const listeners = new Set<(res: ProbeResult) => void>();

export function subscribeHeartbeat(fn: (res: ProbeResult) => void): () => void {
  listeners.add(fn);
  fn(lastResult);
  return () => listeners.delete(fn);
}

function notify(res: ProbeResult) {
  lastResult = res;
  for (const fn of listeners) {
    try {
      fn(res);
    } catch {
      // Listener-Fehler ignorieren
    }
  }
}

export function getLastProbe(): ProbeResult {
  return lastResult;
}

// ---- ccswitch-stil modell-pull: dev-proxy zuerst (kein CORS), direkt als fallback ----

export interface ModelPullResult {
  models: string[];
  error?: string;
  via: "proxy" | "direct" | "none";
  status?: number;
}

/** Browser wirft bei CORS-block nur TypeError("Failed to fetch") — als solches melden. */
export function isCorsLikeError(err: unknown): boolean {
  if (err instanceof DOMException && err.name === "AbortError") return false;
  const m = err instanceof Error ? err.message : String(err);
  return /failed to fetch|networkerror|network error|load failed|fetch failed|blocked by cors|cors/i.test(m);
}

function idsFromModelsJson(data: unknown): string[] {
  if (typeof data !== "object" || data === null) return [];
  const d = (data as { data?: unknown }).data;
  if (!Array.isArray(d)) return [];
  return d.map((m) => (typeof m === "object" && m !== null ? String((m as { id?: unknown }).id ?? "") : "")).filter(Boolean);
}

/**
 * Modellliste holen: 1) same-origin dev-proxy `/__models` (node-seitig, CORS-frei),
 * 2) direkter browser-fetch. Fehler klassifiziert (HTTP-Status / CORS_BLOCK / Timeout).
 */
export async function pullModelList(
  baseUrl: string,
  apiKey: string,
  timeoutMs = 8000,
  fetchFn: typeof fetch = fetch
): Promise<ModelPullResult> {
  const base = baseUrl.trim().replace(/\/$/, "");
  if (!base) return { models: [], error: "Keine Base-URL hinterlegt", via: "none" };

  // 1) dev-proxy (nur wenn same-origin http(s))
  try {
    const origin = typeof location !== "undefined" ? location.origin : "";
    if (origin.startsWith("http")) {
      const ctl = new AbortController();
      const t = setTimeout(() => ctl.abort(), 2500);
      try {
        const headers: Record<string, string> = {};
        if (apiKey.trim()) headers["x-proxy-auth"] = `Bearer ${apiKey.trim()}`; // nur header, nie URL
        const r = await fetchFn(`${origin}/__models?target=${encodeURIComponent(base)}`, {
          headers,
          signal: ctl.signal,
        });
        const env = (await r.json()) as { ok: boolean; status: number; body?: string; error?: string };
        if (env && typeof env === "object" && typeof env.status === "number") {
          if (env.ok) {
            try {
              return { models: idsFromModelsJson(JSON.parse(env.body ?? "{}")), via: "proxy", status: env.status };
            } catch {
              return { models: [], error: "/models antwortet kein JSON", via: "proxy", status: env.status };
            }
          }
          return { models: [], error: `HTTP ${env.status}`, via: "proxy", status: env.status };
        }
        // kein envelope -> kein proxy (produktion): weiter zu direkt
      } finally {
        clearTimeout(t);
      }
    }
  } catch {
    // proxy down/alt-server -> direkt versuchen
  }

  // 2) direkt
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), Math.max(1000, timeoutMs));
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (apiKey.trim()) headers.Authorization = `Bearer ${apiKey.trim()}`;
      const r = await fetchFn(`${base}/models`, { method: "GET", headers, signal: ctl.signal });
      if (!r.ok) return { models: [], error: `HTTP ${r.status}`, via: "direct", status: r.status };
      return { models: idsFromModelsJson(await r.json()), via: "direct", status: r.status };
    } finally {
      clearTimeout(t);
    }
  } catch (err) {
    if (err instanceof DOMException && err.name === "AbortError")
      return { models: [], error: `Timeout nach ${Math.max(1000, timeoutMs)}ms`, via: "direct" };
    if (isCorsLikeError(err)) return { models: [], error: "CORS_BLOCK", via: "direct" };
    return { models: [], error: err instanceof Error ? err.message : "Verbindung fehlgeschlagen", via: "direct" };
  }
}

/**
 * Führt eine gezielte Ping-Prüfung gegen die konfigurierte Engine durch.
 * Timeout default 2000ms (verhindert Hänger); manueller Modell-Pull darf
 * laenger (z.B. 8000ms, CN-Relays).
 */
export async function probeAiConnection(fetchFn: typeof fetch = fetch, timeoutMs = 2000): Promise<ProbeResult> {
  const cfg = loadAiConfig();

  if (cfg.engine === "off") {
    const res: ProbeResult = {
      status: "disabled",
      latencyMs: 0,
      providerId: "off",
      url: "",
      detectedModels: [],
    };
    notify(res);
    return res;
  }

  if (cfg.engine === "local") {
    // WebLLM läuft im Browser via WebGPU
    const gpuOk = typeof navigator !== "undefined" && "gpu" in navigator;
    const res: ProbeResult = {
      status: gpuOk ? "online" : "offline",
      latencyMs: 0,
      providerId: "local",
      url: "WebGPU",
      detectedModels: ["Qwen3-1.7B-MLC", "Llama-3.2-1B-MLC"],
      error: gpuOk ? undefined : "WebGPU nicht unterstützt",
    };
    notify(res);
    return res;
  }

  // API-Modus (LM Studio, Ollama, OpenRouter etc.)
  const baseUrl = effectiveBaseUrl(cfg).replace(/\/$/, "");
  if (!baseUrl) {
    const res: ProbeResult = {
      status: "offline",
      latencyMs: 0,
      providerId: cfg.providerId,
      url: "",
      detectedModels: [],
      error: "Keine Base-URL hinterlegt",
    };
    notify(res);
    return res;
  }

  notify({ ...lastResult, status: "checking", url: baseUrl });

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), Math.max(500, timeoutMs));
  const startTime = Date.now();

  try {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (cfg.apiKey.trim()) headers.Authorization = `Bearer ${cfg.apiKey.trim()}`;

    // Standard OpenAI endpoint: /models
    const res = await fetchFn(`${baseUrl}/models`, {
      method: "GET",
      headers,
      signal: controller.signal,
    });

    clearTimeout(timer);
    const latencyMs = Date.now() - startTime;

    if (res.ok) {
      const data = await res.json();
      const detectedModels: string[] = Array.isArray(data?.data)
        ? data.data.map((m: { id?: string }) => m.id || "").filter(Boolean)
        : [];

      const result: ProbeResult = {
        status: "online",
        latencyMs,
        providerId: cfg.providerId,
        url: baseUrl,
        detectedModels,
      };
      notify(result);
      return result;
    } else {
      const result: ProbeResult = {
        status: "offline",
        latencyMs,
        providerId: cfg.providerId,
        url: baseUrl,
        detectedModels: [],
        error: `HTTP ${res.status}`,
      };
      notify(result);
      return result;
    }
  } catch (err) {
    clearTimeout(timer);
    const result: ProbeResult = {
      status: "offline",
      latencyMs: Date.now() - startTime,
      providerId: cfg.providerId,
      url: baseUrl,
      detectedModels: [],
      error: err instanceof Error ? err.message : "Verbindung fehlgeschlagen",
    };
    notify(result);
    return result;
  }
}
