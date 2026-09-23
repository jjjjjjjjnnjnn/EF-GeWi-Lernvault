// Intelligente automatische Modell- und Lastverteilung (Auto-Dispatch) & Denkintensitäts-Steuerung.
// Garantiert 100% lokale Antwortfähigkeit, selbst wenn LM Studio offline ist oder kein Modell geladen hat.
// Unterstützt: 3 Denkintensitäts-Stufen (Schnell / Ausgewogen / Tiefgründig) und Ein-Klick-Profile.

import { loadAiConfig, saveAiConfig, type AiConfig } from "./providers";
import type { StreamOptions } from "./streamClient";
import type { ChatMsg } from "./engine";
import type { VaultNote } from "../vault/parser";
import type { TextChunk } from "../engine/rag";

export type ThinkingIntensity = "fast" | "balanced" | "deep";

export interface IntensityConfig {
  temperature: number;
  maxTokens: number;
  topKChunks: number;
  labelDE: string;
  labelZH: string;
  systemModifierDE: string;
}

export const INTENSITY_PRESETS: Record<ThinkingIntensity, IntensityConfig> = {
  fast: {
    temperature: 0.2,
    maxTokens: 450,
    topKChunks: 4,
    labelDE: "⚡ Schnell",
    labelZH: "⚡ 极速",
    systemModifierDE: "Antworte extrem präzise, stichpunktartig und fokussiere dich sofort auf den Klausur-Merksatz.",
  },
  balanced: {
    temperature: 0.3,
    maxTokens: 750,
    topKChunks: 8,
    labelDE: "⚖️ Ausgewogen",
    labelZH: "⚖️ 均衡",
    systemModifierDE: "Gib eine sokratische Erklärung mit Fachbegriffen und genauen [Pfad#Zeile]-Belegen.",
  },
  deep: {
    temperature: 0.4,
    maxTokens: 1300,
    topKChunks: 12,
    labelDE: "🧠 Tiefgründig",
    labelZH: "🧠 深度思考",
    systemModifierDE: "Führe eine ausführliche Mehrperspektiven-Analyse durch: Pro/Contra, historischer Kontext, Operatoren-Check und Transfer.",
  },
};

const INTENSITY_KEY = "eflernvault:thinking_intensity:v1";

export function loadThinkingIntensity(): ThinkingIntensity {
  try {
    const val = localStorage.getItem(INTENSITY_KEY);
    if (val === "fast" || val === "balanced" || val === "deep") return val;
    return "balanced";
  } catch {
    return "balanced";
  }
}

export function saveThinkingIntensity(intensity: ThinkingIntensity): void {
  try {
    localStorage.setItem(INTENSITY_KEY, intensity);
  } catch {
    // Ignorieren
  }
}

/**
 * Ein-Klick-Schnellkonfigurationen
 */
export function applyQuickPreset(preset: "local-fast" | "deep-study" | "cloud-free-fast"): AiConfig {
  const current = loadAiConfig();
  let updated: AiConfig = { ...current };

  if (preset === "local-fast") {
    updated = {
      ...current,
      engine: "api",
      providerId: "ollama", // oder LM Studio Port 1234
      model: "qwen3:8b",
      baseUrl: "http://localhost:1234/v1",
    };
    saveThinkingIntensity("fast");
  } else if (preset === "deep-study") {
    saveThinkingIntensity("deep");
  } else if (preset === "cloud-free-fast") {
    updated = {
      ...current,
      engine: "api",
      providerId: "siliconflow",
      model: "Qwen/Qwen3-8B",
    };
    saveThinkingIntensity("balanced");
  }

  saveAiConfig(updated);
  return updated;
}

import { executeChatWithRouting } from "./router";

export interface AutoDispatchResult {
  reply: string;
  source: "llm" | "vault-autofallback";
  badge?: string;
}

/**
 * Führt den Chat mit automatischer Fehlerumleitung (Auto-Dispatch) & Routing aus.
 * Nutzt das CC-Switch-artige Routing-System (Active Endpoint -> Fallback -> Vault).
 */
export async function autoDispatchChat(
  messages: ChatMsg[],
  userQuery: string,
  vaultNotes: VaultNote[],
  chunks: TextChunk[],
  opts?: StreamOptions & { intensity?: ThinkingIntensity; savedTokensCCR?: number }
): Promise<AutoDispatchResult> {
  const intensity = opts?.intensity ?? loadThinkingIntensity();
  const intensityParams = INTENSITY_PRESETS[intensity];

  const routed = await executeChatWithRouting(messages, userQuery, vaultNotes, chunks, {
    ...opts,
    temperature: intensityParams.temperature,
    maxTokens: intensityParams.maxTokens,
    savedTokensCCR: opts?.savedTokensCCR,
  });

  return {
    reply: routed.reply,
    source: routed.source === "vault-autofallback" ? "vault-autofallback" : "llm",
    badge: routed.badge,
  };
}
