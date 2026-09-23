// Einheitlicher Chat-Einstieg für Tutor + Quiz.
// engine "api": OpenAI-kompatibler fetch (Key aus localStorage).
// engine "local": WebLLM im Browser (lazy import, kein Bundle-Ballast).
// engine "off": wirft EngineOffError — Aufrufer zeigen Vorlagen-Modus.
import {
  loadAiConfig,
  effectiveBaseUrl,
  getProvider,
  resolveAiRequestUrl,
  NeedsKeyError,
} from "./providers";

export { NeedsKeyError } from "./providers";

export interface ChatMsg {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * 校验并规范化 ChatMsg 数组，确保 100% 满足 OpenAI 与 LM Studio / Ollama 的严格请求约束：
 * 1. 数组非空（若为空自动填充默认打招呼消息）
 * 2. 过滤 content 为空字符串或 undefined/null 的消息
 * 3. 确保至少包含 1 条 role 为 "user" 的消息（防止服务端因仅有 system 消息报 400）
 */
export function sanitizeChatMessages(messages: ChatMsg[]): ChatMsg[] {
  if (!Array.isArray(messages) || messages.length === 0) {
    return [{ role: "user", content: "Hallo" }];
  }
  const cleaned: ChatMsg[] = [];
  for (const m of messages) {
    if (!m) continue;
    const content = typeof m.content === "string" ? m.content.trim() : "";
    if (content.length > 0) {
      cleaned.push({
        role: m.role || "user",
        content,
      });
    }
  }

  if (cleaned.length === 0) {
    return [{ role: "user", content: "Hallo" }];
  }

  // 严苛对齐 Anthropic Messages 协议与对话规范：首条非 system 消息绝不可为 assistant
  const firstNonSysIdx = cleaned.findIndex((m) => m.role !== "system");
  if (firstNonSysIdx !== -1 && cleaned[firstNonSysIdx].role === "assistant") {
    cleaned.splice(firstNonSysIdx, 0, { role: "user", content: "Hallo" });
  }

  const hasUser = cleaned.some((m) => m.role === "user");
  if (!hasUser) {
    cleaned.push({ role: "user", content: "Bitte beginnen." });
  }

  return cleaned;
}

export class EngineOffError extends Error {}
export class LocalLoadError extends Error {}

export function isWebGpuAvailable(): boolean {
  return typeof navigator !== "undefined" && "gpu" in navigator;
}

// Vorauswahl Deutsch-tauglicher WebLLM-Modelle (klein → groß).
// Zur Laufzeit gegen die Prebuilt-Liste geprüft, erste Treffer gewinnt.
const LOCAL_PREFS = [
  "Qwen3-1.7B-Instruct-q4f16_1-MLC",
  "Qwen3-0.6B-Instruct-q4f16_1-MLC",
  "Llama-3.2-3B-Instruct-q4f16_1-MLC",
  "Llama-3.2-1B-Instruct-q4f16_1-MLC",
  "Phi-3.5-mini-instruct-q4f16_1-MLC",
];

type WebLLMEngine = { chat: { completions: { create: (o: unknown) => Promise<{ choices?: { message?: { content?: string } }[] }> } } };

let localEngine: WebLLMEngine | null = null;
let localModelId: string | null = null;
let localLoading: Promise<string> | null = null;

export async function ensureLocalEngine(onProgress?: (pct: number, text: string) => void): Promise<string> {
  if (localEngine && localModelId) return localModelId;
  if (localLoading) return localLoading;
  if (!isWebGpuAvailable()) throw new LocalLoadError("WebGPU fehlt (Chrome/Edge 113+)");
  localLoading = (async () => {
    const webllm = await import("@mlc-ai/web-llm");
    const listed: string[] = (webllm.prebuiltAppConfig?.model_list ?? []).map((m: { model_id: string }) => m.model_id);
    const pick = LOCAL_PREFS.find((id) => listed.includes(id)) ?? LOCAL_PREFS[0];
    const engine = (await webllm.CreateMLCEngine(pick, {
      initProgressCallback: (p: { progress: number; text: string }) => onProgress?.(p.progress, p.text),
    })) as unknown as WebLLMEngine;
    localEngine = engine;
    localModelId = pick;
    return pick;
  })();
  try {
    return await localLoading;
  } finally {
    localLoading = null;
  }
}

export function resetLocalEngine() {
  localEngine = null;
  localModelId = null;
}

export function localModelName(): string | null {
  return localModelId;
}

export async function chat(
  messages: ChatMsg[],
  opts?: { temperature?: number; maxTokens?: number; onLocalProgress?: (pct: number, text: string) => void }
): Promise<string> {
  const cfg = loadAiConfig();

  if (cfg.engine === "off") throw new EngineOffError("KI-Engine ist ausgeschaltet");

  if (cfg.engine === "local") {
    const modelId = await ensureLocalEngine(opts?.onLocalProgress);
    if (!localEngine) throw new LocalLoadError("Lokales Modell nicht bereit");
    const res = await localEngine.chat.completions.create({
      messages,
      temperature: opts?.temperature ?? 0.3,
      max_tokens: opts?.maxTokens ?? 600,
    });
    const text = res?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new LocalLoadError(`Modell ${modelId} gab keine Antwort`);
    return text;
  }

  // engine "api"
  const preset = getProvider(cfg.providerId);
  const base = effectiveBaseUrl(cfg);
  if (!base) throw new NeedsKeyError("Base-URL fehlt (Eigen-Anbieter prüfen)");
  if (preset.needsKey && !cfg.apiKey.trim()) throw new NeedsKeyError("API-Key fehlt (in den KI-Einstellungen eintragen)");
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (cfg.apiKey.trim()) headers.Authorization = `Bearer ${cfg.apiKey.trim()}`;
  const sanitized = sanitizeChatMessages(messages);
  const fetchUrl = resolveAiRequestUrl(`${base.replace(/\/$/, "")}/chat/completions`);
  const res = await fetch(fetchUrl, {
    method: "POST",
    headers,
    body: JSON.stringify({
      model: cfg.model.trim() || preset.defaultModel,
      messages: sanitized,
      temperature: opts?.temperature ?? 0.3,
      max_tokens: opts?.maxTokens ?? 600,
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} (${preset.name})`);
  const data = await res.json();
  const text = data?.choices?.[0]?.message?.content?.trim();
  if (!text) throw new Error("Leere Antwort vom Anbieter");
  return text;
}

export function describeActiveEngine(): string {
  const cfg = loadAiConfig();
  if (cfg.engine === "off") return "off";
  if (cfg.engine === "local") return `local:${localModelId ?? "…"}`;
  return `api:${cfg.providerId}:${cfg.model || getProvider(cfg.providerId).defaultModel}`;
}
