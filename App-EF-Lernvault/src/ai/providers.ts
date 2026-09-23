// Einheitliche KI-Anbindung: API-direkt (OpenAI-kompatibel) oder lokal (WebLLM).
// Der Key liegt nur in localStorage, nie im Repo. Kein Request ohne Engine-Wahl.
import type { Lang } from "../i18n";
import { AI_CONFIG_STORAGE_KEY } from "../engine/storageKeys";

export type AiEngine = "api" | "local" | "off";

export class NeedsKeyError extends Error {}

export interface ProviderPreset {
  id: string;
  name: string;
  baseUrl: string;
  needsKey: boolean;
  defaultModel: string;
  keyUrl: string;
  free: string; // Kurznotiz Free-Tier (Stand Sept 2026, Details in AI-SETUP.md)
}

// Voreinstellungen: nur Startwerte + Key-Bezugsquellen. Modellnamen als
// editierbares Textfeld — Roster ändern sich, die Doku (AI-SETUP.md) führt.
export const PROVIDERS: ProviderPreset[] = [
  {
    id: "openrouter",
    name: "OpenRouter",
    baseUrl: "https://openrouter.ai/api/v1",
    needsKey: true,
    defaultModel: "openai/gpt-oss-20b:free",
    keyUrl: "https://openrouter.ai/keys",
    free: "20+ Free-Modelle, 50/Tag (ohne Karte)",
  },
  {
    id: "groq",
    name: "Groq",
    baseUrl: "https://api.groq.com/openai/v1",
    needsKey: true,
    defaultModel: "openai/gpt-oss-20b",
    keyUrl: "https://console.groq.com/keys",
    free: "1000 Req/Tag, sehr schnell (LPU)",
  },
  {
    id: "gemini",
    name: "Google AI Studio",
    baseUrl: "https://generativelanguage.googleapis.com/v1beta/openai/",
    needsKey: true,
    defaultModel: "gemini-2.5-flash",
    keyUrl: "https://aistudio.google.com/apikey",
    free: "Großzügig, bis 1M Kontext",
  },
  {
    id: "mistral",
    name: "Mistral",
    baseUrl: "https://api.mistral.ai/v1",
    needsKey: true,
    defaultModel: "mistral-small-latest",
    keyUrl: "https://console.mistral.ai/api-keys",
    free: "$10/Monat Free-Modus",
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    baseUrl: "https://api.deepseek.com/v1",
    needsKey: true,
    defaultModel: "deepseek-chat",
    keyUrl: "https://platform.deepseek.com/api_keys",
    free: "Sehr günstig, 1M Kontext",
  },
  {
    id: "siliconflow",
    name: "SiliconFlow",
    baseUrl: "https://api.siliconflow.cn/v1",
    needsKey: true,
    defaultModel: "Qwen/Qwen3-8B",
    keyUrl: "https://cloud.siliconflow.cn/account/ak",
    free: "Qwen3-8B dauerhaft frei",
  },
  {
    id: "ollama",
    name: "Lokal (Ollama / LM Studio)",
    baseUrl: "http://localhost:11434/v1",
    needsKey: false,
    defaultModel: "qwen3:8b",
    keyUrl: "",
    free: "Eigener Rechner, kein Key (LM Studio: Port 1234)",
  },
  {
    id: "opencode-zen",
    name: "OpenCode Zen",
    baseUrl: "https://opencode.ai/zen/v1",
    needsKey: true,
    defaultModel: "claude-sonnet-4-5",
    keyUrl: "https://opencode.ai",
    free: "Abo ($20/Monat) inkl. Nutzung, viele Modelle",
  },
  {
    id: "sensenova",
    name: "SenseNova (商汤)",
    baseUrl: "https://token.sensenova.cn/v1",
    needsKey: true,
    defaultModel: "SenseChat-5",
    keyUrl: "https://platform.sensenova.cn",
    free: "Chinesisch, Alipay, OpenAI-kompatibel",
  },
  { id: "custom", name: "Eigen (Base-URL)", baseUrl: "", needsKey: true, defaultModel: "", keyUrl: "", free: "" },
];

export type VectorMode = "auto" | "on" | "off";

export interface AiConfig {
  version: 1;
  engine: AiEngine;
  providerId: string;
  apiKey: string;
  model: string;
  baseUrl: string; // nur bei custom genutzt
  embedModel: string; // L2-vektor: leer = aus (hybrid faellt auf L1/L0)
  vectorMode: VectorMode; // auto = L1 nur wenn bereit (nie still laden), on = laden erlaubt, off = nie
  hfMirror: string; // leer = offizieller hub; z.b. https://hf-mirror.com
}

export const AI_KEY = AI_CONFIG_STORAGE_KEY;

export const DEFAULT_AI: AiConfig = {
  version: 1,
  engine: "off",
  providerId: "openrouter",
  apiKey: "",
  model: "openai/gpt-oss-20b:free",
  baseUrl: "",
  embedModel: "",
  vectorMode: "auto",
  hfMirror: "",
};

export function getProvider(id: string): ProviderPreset {
  return PROVIDERS.find((p) => p.id === id) ?? PROVIDERS[PROVIDERS.length - 1];
}

export function effectiveBaseUrl(cfg: AiConfig): string {
  if (cfg.providerId === "custom") return cfg.baseUrl.trim();
  // Override: leeres feld = preset-default; befuellt = freie endpoint-wahl
  // (relays wie R4Qodes/command-code etc. ohne eigenes preset nutzbar).
  return cfg.baseUrl.trim() || getProvider(cfg.providerId).baseUrl;
}

export function loadAiConfig(): AiConfig {
  try {
    const raw = localStorage.getItem(AI_KEY);
    if (!raw) return { ...DEFAULT_AI };
    const p = JSON.parse(raw);
    if (p?.version !== 1) return { ...DEFAULT_AI };
    return { ...DEFAULT_AI, ...p };
  } catch {
    return { ...DEFAULT_AI };
  }
}

export function saveAiConfig(cfg: AiConfig) {
  try {
    localStorage.setItem(AI_KEY, JSON.stringify({ ...cfg, version: 1 }));
  } catch {
    // ignorieren
  }
}

export function engineLabel(e: AiEngine, lang: Lang): string {
  if (e === "api") return lang === "de" ? "API-direkt" : "API直连";
  if (e === "local") return lang === "de" ? "Lokal (WebLLM)" : "本地模型";
  return lang === "de" ? "Aus (Vorlagen)" : "关闭(仅模板)";
}

/**
 * 解析并适配 AI 请求的目标地址。
 * 当应用在浏览器环境运行（如 Vite 开发服务器 http://localhost:1420），
 * 且目标地址为远程外部 HTTPS 域名（如 https://token.sensenova.cn, https://api.deepseek.com 等），
 * 浏览器会强制执行 CORS preflight (OPTIONS)，若外部服务商不支持 preflight 将直接被浏览器拦截报错。
 * 此时自动转由 Vite 开发服务器的同源代理 /__ai_proxy 转发（Node.js 端无 CORS 限制）。
 * 本地服务（LM Studio 1234, Ollama 11434）保留直连。
 */
export function resolveAiRequestUrl(rawUrl: string): string {
  if (typeof location === "undefined") return rawUrl;
  const origin = location.origin;
  if (!origin || !origin.startsWith("http")) return rawUrl;

  // 本地服务（localhost、127.0.0.1、0.0.0.0 如 LM Studio、Ollama）保持直连
  const isLocalHost = /^https?:\/\/(localhost|127\.0\.0\.1|0\.0\.0\.0)(:\d+)?/i.test(rawUrl);
  if (isLocalHost) {
    return rawUrl;
  }

  // 网页端访问远程 https 接口走同源代理
  if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
    if (/^https:\/\//i.test(rawUrl)) {
      return `${origin}/__ai_proxy?target=${encodeURIComponent(rawUrl)}`;
    }
  }
  return rawUrl;
}
