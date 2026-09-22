// Einheitlicher KI-Streaming-Client für Tutor, Quiz und Lernreise.
// Unterstützt SSE (Server-Sent Events) für API-Provider (LM Studio, Ollama, OpenRouter etc.)
// sowie asynchrone Generatoren für lokales WebLLM.
// Inklusive AbortSignal für Abbrüche und robuster Fehlerbehandlung.

import { loadAiConfig, effectiveBaseUrl, getProvider } from "./providers";
import {
  type ChatMsg,
  EngineOffError,
  NeedsKeyError,
  ensureLocalEngine,
} from "./engine";

export interface StreamChunk {
  delta: string;
  accumulated: string;
}

export type AiStatus = "idle" | "connecting" | "streaming" | "done" | "error";

export interface StreamOptions {
  temperature?: number;
  maxTokens?: number;
  signal?: AbortSignal;
  onChunk?: (chunk: StreamChunk) => void;
  onStatusChange?: (status: AiStatus) => void;
  onLocalProgress?: (pct: number, text: string) => void;
}

/**
 * Parst einen SSE-Textpuffer (Server-Sent Events) und ruft für jedes Token die Callback-Funktion auf.
 */
export function parseSseStream(
  textBuffer: string,
  onDelta: (delta: string) => void
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
        const delta =
          json.choices?.[0]?.delta?.content ??
          json.choices?.[0]?.text ??
          "";
        if (delta) {
          onDelta(delta);
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
    throw new EngineOffError("KI-Engine ist ausgeschaltet");
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
      return accumulated;
    } catch (err) {
      opts?.onStatusChange?.("error");
      throw err;
    }
  }

  // 2. API-Modus (OpenAI-kompatibel: LM Studio, Ollama, Groq, OpenRouter etc.)
  const preset = getProvider(cfg.providerId);
  const base = effectiveBaseUrl(cfg);
  if (!base) {
    opts?.onStatusChange?.("error");
    throw new NeedsKeyError("Base-URL fehlt");
  }
  if (preset.needsKey && !cfg.apiKey.trim()) {
    opts?.onStatusChange?.("error");
    throw new NeedsKeyError("API-Key fehlt");
  }

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cfg.apiKey.trim()) headers.Authorization = `Bearer ${cfg.apiKey.trim()}`;

  let res: Response;
  try {
    res = await fetch(`${base.replace(/\/$/, "")}/chat/completions`, {
      method: "POST",
      headers,
      signal: opts?.signal,
      body: JSON.stringify({
        model: cfg.model.trim() || preset.defaultModel,
        messages,
        temperature: opts?.temperature ?? 0.3,
        max_tokens: opts?.maxTokens ?? 700,
        stream: true,
      }),
    });
  } catch (err) {
    opts?.onStatusChange?.("error");
    throw err;
  }

  if (!res.ok) {
    opts?.onStatusChange?.("error");
    throw new Error(`HTTP ${res.status} (${preset.name})`);
  }

  opts?.onStatusChange?.("streaming");
  let accumulated = "";

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
        const { remainingBuffer, isDone } = parseSseStream(buffer, (delta) => {
          accumulated += delta;
          opts?.onChunk?.({ delta, accumulated });
        });
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
  }

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
