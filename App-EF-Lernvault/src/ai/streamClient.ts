// Einheitlicher KI-Streaming-Client für Tutor, Quiz und Lernreise.
// Unterstützt SSE (Server-Sent Events) für API-Provider (LM Studio, Ollama, OpenRouter etc.)
// sowie asynchrone Generatoren für lokales WebLLM.
// Inklusive AbortSignal für Abbrüche, Token-Usage-Erfassung und robuster Fehlerbehandlung.

import { loadAiConfig, effectiveBaseUrl, getProvider } from "./providers";
import {
  type ChatMsg,
  EngineOffError,
  NeedsKeyError,
  ensureLocalEngine,
} from "./engine";
import { type AiEndpoint, getActiveEndpoint } from "./endpoints";
import { estimateTokens } from "../engine/context";

export interface StreamChunk {
  delta: string;
  accumulated: string;
}

export type AiStatus = "idle" | "connecting" | "streaming" | "done" | "error";

export interface TokenUsageReport {
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
}

export interface StreamOptions {
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
  endpoint?: AiEndpoint;
  onChunk?: (chunk: StreamChunk) => void;
  onStatusChange?: (status: AiStatus) => void;
  onLocalProgress?: (pct: number, text: string) => void;
  onUsage?: (usage: TokenUsageReport) => void;
}

/**
 * Parst einen SSE-Textpuffer (Server-Sent Events) und ruft für jedes Token die Callback-Funktion auf.
 * Extrahiert optional Token-Verbrauchsdaten aus stream_options (OpenAI-Standard).
 */
export function parseSseStream(
  textBuffer: string,
  onDelta: (delta: string) => void,
  onUsage?: (usage: TokenUsageReport) => void
): { remainingBuffer: string; isDone: boolean } {
  const lines = textBuffer.split(/\r?\n/);
  let isDone = false;
  // Die letzte Zeile könnte unvollständig sein, daher aufbewahren
  const remainingBuffer = lines.pop() ?? "";

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith(":")) continue; // Leere Zeile oder SSE-Kommentar

    if (trimmed === "data: [DONE]") {
      isDone = true;
      break;
    }

    if (trimmed.startsWith("data:")) {
      const dataStr = trimmed.slice(5).trim();
      try {
        const json = JSON.parse(dataStr);

        // 1. Text-Delta extrahieren
        const delta =
          json.choices?.[0]?.delta?.content ??
          json.choices?.[0]?.text ??
          "";
        if (delta) {
          onDelta(delta);
        }

        // 2. Token-Verbrauch extrahieren (wenn stream_options: { include_usage: true } gesendet wurde)
        if (json.usage && onUsage) {
          onUsage({
            promptTokens: json.usage.prompt_tokens ?? 0,
            completionTokens: json.usage.completion_tokens ?? 0,
            totalTokens: json.usage.total_tokens ?? 0,
          });
        }
      } catch {
        // Unvollständige oder nicht-JSON Zeile im Stream tolerieren
      }
    }
  }

  return { remainingBuffer, isDone };
}

/**
 * Führt einen Chat-Aufruf im Streaming-Modus durch.
 * Gibt den vollständig akkumulierten Text zurück.
 */
export async function chatStream(
  messages: ChatMsg[],
  opts?: StreamOptions
): Promise<string> {
  const cfg = loadAiConfig();
  opts?.onStatusChange?.("connecting");

  if (cfg.engine === "off") {
    opts?.onStatusChange?.("error");
    throw new EngineOffError("KI-Engine ist ausgeschaltet / AI 引擎已关闭");
  }

  // 1. Lokales WebLLM im Browser
  if (cfg.engine === "local") {
    try {
      await ensureLocalEngine(opts?.onLocalProgress);
      if (opts?.signal?.aborted) throw new DOMException("Aborted", "AbortError");

      opts?.onStatusChange?.("streaming");

      // WebLLM Chat completions
      const { chat } = await import("./engine");
      const full = await chat(messages, {
        temperature: opts?.temperature,
        maxTokens: opts?.maxTokens,
        onLocalProgress: opts?.onLocalProgress,
      });

      const accumulated = full;
      opts?.onChunk?.({ delta: full, accumulated });
      opts?.onStatusChange?.("done");

      // Lokale Token-Schätzung
      const pTok = estimateTokens(messages.map((m) => m.content).join("\n"));
      const cTok = estimateTokens(accumulated);
      opts?.onUsage?.({
        promptTokens: pTok,
        completionTokens: cTok,
        totalTokens: pTok + cTok,
      });

      return accumulated;
    } catch (err) {
      opts?.onStatusChange?.("error");
      throw err;
    }
  }

  // 2. API-Modus (OpenAI-kompatibel): Bevorzuge opts.endpoint, falle auf activeEndpoint oder Legacy zurück
  let base: string;
  let apiKey: string;
  let model: string;
  let endpointName: string;

  if (opts?.endpoint) {
    base = opts.endpoint.baseUrl.trim();
    apiKey = opts.endpoint.apiKey.trim();
    model = opts.endpoint.model.trim();
    endpointName = opts.endpoint.name;
  } else {
    const activeEp = getActiveEndpoint();
    if (activeEp && activeEp.baseUrl) {
      base = activeEp.baseUrl.trim();
      apiKey = activeEp.apiKey.trim();
      model = activeEp.model.trim();
      endpointName = activeEp.name;
    } else {
      const preset = getProvider(cfg.providerId);
      base = effectiveBaseUrl(cfg);
      apiKey = cfg.apiKey.trim();
      model = cfg.model.trim() || preset.defaultModel;
      endpointName = preset.name;
    }
  }

  if (!base) {
    opts?.onStatusChange?.("error");
    throw new NeedsKeyError("Base-URL fehlt / 端点 Base-URL 为空");
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

  let res: Response;
  try {
    res = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers,
      signal: opts?.signal,
      body: JSON.stringify({
        model,
        messages,
        temperature: opts?.temperature ?? 0.3,
        max_tokens: opts?.maxTokens ?? 700,
        stream: true,
        stream_options: { include_usage: true },
      }),
    });
  } catch (err) {
    opts?.onStatusChange?.("error");
    const isCors = err instanceof TypeError && err.message.includes("Failed to fetch");
    if (isCors) {
      throw new Error(`CORS 跨域拦截或网络不可达 (${endpointName})。本地模型请确认已开启 CORS。`);
    }
    throw err;
  }

  if (!res.ok) {
    opts?.onStatusChange?.("error");
    if (res.status === 401 || res.status === 403) {
      throw new NeedsKeyError(`HTTP ${res.status}: API Key 无效或未授权 (${endpointName})`);
    }
    if (res.status === 429) {
      throw new Error(`HTTP 429: 请求过于频繁 (Rate Limit) (${endpointName})`);
    }
    throw new Error(`HTTP ${res.status} (${endpointName})`);
  }

  opts?.onStatusChange?.("streaming");
  let accumulated = "";
  let capturedUsage: TokenUsageReport | null = null;

  // Wenn der Server SSE-Stream liefert (ReadableStream vorhanden)
  if (res.body && typeof res.body.getReader === "function") {
    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");
    let buffer = "";

    try {
      while (true) {
        if (opts?.signal?.aborted) {
          await reader.cancel();
          throw new DOMException("Aborted", "AbortError");
        }

        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const { remainingBuffer, isDone } = parseSseStream(
          buffer,
          (delta) => {
            accumulated += delta;
            opts?.onChunk?.({ delta, accumulated });
          },
          (usage) => {
            capturedUsage = usage;
          }
        );
        buffer = remainingBuffer;
        if (isDone) break;
      }
    } finally {
      reader.releaseLock();
    }
  } else {
    // Fallback falls der Server kein Streaming unterstützt
    const data = await res.json();
    accumulated = data?.choices?.[0]?.message?.content?.trim() || "";
    opts?.onChunk?.({ delta: accumulated, accumulated });
    if (data?.usage) {
      capturedUsage = {
        promptTokens: data.usage.prompt_tokens ?? 0,
        completionTokens: data.usage.completion_tokens ?? 0,
        totalTokens: data.usage.total_tokens ?? 0,
      };
    }
  }

  // Falls der Server keine Verbrauchsdaten geliefert hat, Token schätzen
  if (!capturedUsage) {
    const pTok = estimateTokens(messages.map((m) => m.content).join("\n"));
    const cTok = estimateTokens(accumulated);
    capturedUsage = {
      promptTokens: pTok,
      completionTokens: cTok,
      totalTokens: pTok + cTok,
    };
  }

  opts?.onUsage?.(capturedUsage);
  opts?.onStatusChange?.("done");
  return accumulated;
}

/**
 * Führt einen Chat-Aufruf aus und parst das Ergebnis strukturiert.
 */
export async function chatJson<T>(
  messages: ChatMsg[],
  parser: (raw: string) => T,
  opts?: StreamOptions
): Promise<T> {
  const raw = await chatStream(messages, opts);
  return parser(raw);
}
