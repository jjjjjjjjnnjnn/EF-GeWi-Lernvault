// Einheitliche KI-Anbindung: API-direkt (OpenAI-kompatibel) oder lokal (WebLLM).
// Der Key liegt nur in localStorage, nie im Repo. Kein Request ohne Engine-Wahl.
import type { Lang } from "../i18n";

export type AiEngine = "api" | "local" | "off";

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
  { id: "custom", name: "Eigen (Base-URL)", baseUrl: "", needsKey: true, defaultModel: "", keyUrl: "", free: "" },
];

export interface AiConfig {
  version: 1;
  engine: AiEngine;
  providerId: string;
  apiKey: string;
  model: string;
  baseUrl: string; // nur bei custom genutzt
  embedModel: string; // L2-vektor: leer = aus (hybrid faellt auf L1/L0)
}

export const AI_KEY = "eflernvault:ai:v1";

export const DEFAULT_AI: AiConfig = {
  version: 1,
  engine: "off",
  providerId: "openrouter",
  apiKey: "",
  model: "openai/gpt-oss-20b:free",
  baseUrl: "",
  embedModel: "",
};

export function getProvider(id: string): ProviderPreset {
  return PROVIDERS.find((p) => p.id === id) ?? PROVIDERS[PROVIDERS.length - 1];
}

export function effectiveBaseUrl(cfg: AiConfig): string {
  if (cfg.providerId === "custom") return cfg.baseUrl.trim();
  return getProvider(cfg.providerId).baseUrl;
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
