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

/**
 * Führt eine gezielte Ping-Prüfung gegen die konfigurierte Engine durch.
 * Timeout: 2000ms (verhindert Hänger).
 */
export async function probeAiConnection(fetchFn: typeof fetch = fetch): Promise<ProbeResult> {
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
  const timer = setTimeout(() => controller.abort(), 2000);
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
