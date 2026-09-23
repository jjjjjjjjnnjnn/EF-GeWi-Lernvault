// CC-Switch 风格智能路由与级联故障转移 (Clean-Room 原生实现)
// 逻辑：活跃主路由 (Active Endpoint) -> 备用路由 (Fallback Endpoint) -> 离线考纲知识库 (Vault Native)
// 全自动 Token 审计入账，答题 100% 不白屏、不抛未捕获网络崩溃

import {
  type AiEndpoint,
  getActiveEndpoint,
  getFallbackEndpointId,
  loadEndpoints,
} from "./endpoints";
import { chatStream, type StreamOptions, type TokenUsageReport } from "./streamClient";
import type { ChatMsg } from "./engine";
import type { VaultNote } from "../vault/parser";
import type { TextChunk } from "../engine/rag";
import { findMatchingVaultNote } from "../engine/instantGrounding";
import { recordTokenUsage } from "./tokenLedger";
import { loadAiConfig, saveAiConfig } from "./providers";

export interface RouteExecutionResult {
  reply: string;
  source: "primary" | "fallback" | "vault-autofallback";
  endpointUsed?: AiEndpoint;
  badge: string;
  tokens?: TokenUsageReport;
}

export interface RouterOptions extends StreamOptions {
  savedTokensCCR?: number;
  onFailover?: (fromName: string, toName: string, reason: string) => void;
}

/**
 * 执行带多端点路由与级联容灾的聊天调用
 */
export async function executeChatWithRouting(
  messages: ChatMsg[],
  userQuery: string,
  vaultNotes: VaultNote[],
  chunks: TextChunk[],
  opts?: RouterOptions
): Promise<RouteExecutionResult> {
  const primaryEp = getActiveEndpoint();
  let capturedTokens: TokenUsageReport | null = null;

  // Auto-Fix: Wenn ein gueltiger Endpoint aktiv ist, aber engine noch "off",
  // automatisch auf "api" umstellen, damit UI und Dispatch synchron bleiben.
  const cfg = loadAiConfig();
  if (cfg.engine === "off" && primaryEp && primaryEp.baseUrl) {
    saveAiConfig({
      ...cfg,
      engine: "api",
      providerId: primaryEp.providerId,
      baseUrl: primaryEp.baseUrl,
      apiKey: primaryEp.apiKey,
      model: primaryEp.model,
    });
  }

  const usageTracker = (u: TokenUsageReport) => {
    capturedTokens = u;
    opts?.onUsage?.(u);
  };

  // 1. 尝试主端点 (Active Route)
  try {
    const reply = await chatStream(messages, {
      ...opts,
      endpoint: primaryEp,
      onUsage: usageTracker,
    });

    const finalTokens = capturedTokens as TokenUsageReport | null;
    if (finalTokens) {
      recordTokenUsage({
        endpointId: primaryEp.id,
        model: primaryEp.model,
        promptTokens: finalTokens.promptTokens,
        completionTokens: finalTokens.completionTokens,
        totalTokens: finalTokens.totalTokens,
        savedTokensCCR: opts?.savedTokensCCR ?? 0,
      });
    }

    return {
      reply,
      source: "primary",
      endpointUsed: primaryEp,
      badge: `${primaryEp.name} · ${primaryEp.model.split("/").pop()}`,
      tokens: capturedTokens ?? undefined,
    };
  } catch (primaryErr) {
    const primaryErrMsg = primaryErr instanceof Error ? primaryErr.message : String(primaryErr);

    // 2. 尝试备用端点 (Fallback Route)
    const fallbackId = getFallbackEndpointId();
    if (fallbackId && fallbackId !== primaryEp.id) {
      const all = loadEndpoints();
      const fallbackEp = all.find((e) => e.id === fallbackId && e.enabled);

      if (fallbackEp) {
        opts?.onFailover?.(primaryEp.name, fallbackEp.name, primaryErrMsg);

        try {
          const fallbackReply = await chatStream(messages, {
            ...opts,
            endpoint: fallbackEp,
            onUsage: usageTracker,
          });

          const finalFallbackTokens = capturedTokens as TokenUsageReport | null;
          if (finalFallbackTokens) {
            recordTokenUsage({
              endpointId: fallbackEp.id,
              model: fallbackEp.model,
              promptTokens: finalFallbackTokens.promptTokens,
              completionTokens: finalFallbackTokens.completionTokens,
              totalTokens: finalFallbackTokens.totalTokens,
              savedTokensCCR: opts?.savedTokensCCR ?? 0,
            });
          }

          return {
            reply: fallbackReply,
            source: "fallback",
            endpointUsed: fallbackEp,
            badge: `故障转移: ${fallbackEp.name}`,
            tokens: capturedTokens ?? undefined,
          };
        } catch {
          // 备用端点亦异常，继续落入保底考纲
        }
      }
    }

    // 3. 终极兜底：Vault 离线考纲原生合成
    const match = findMatchingVaultNote(vaultNotes, userQuery);
    let fallbackText = "";

    if (match) {
      let pathRef = match.path || `${match.fach}/${match.thema}.md`;
      if (!pathRef.includes("#")) pathRef = `${pathRef}#1`;
      const lead = match.blocks[0]?.text || "Kernkonzept aus dem Vault.";
      const klausurSatz =
        match.blocks.find((b) => b.kind === "p" && b.text.includes("."))?.text || lead;

      fallbackText =
        `**[${pathRef}] ${match.thema} (${match.fach})**\n\n` +
        `• **Definition / 定义**: ${lead}\n\n` +
        `• **Klausur-Satz / 考点规范句**: ${klausurSatz}\n\n` +
        `*(提示：路由端点未连通 [${primaryEp.name}]，已自动切换为 EF 知识库原生考点答复。)*`;
    } else {
      const topChunk = chunks[0];
      if (topChunk) {
        fallbackText =
          `**[${topChunk.id}] ${topChunk.thema} (${topChunk.fach})**\n\n` +
          `${topChunk.text}\n\n` +
          `*(提示：路由端点未连通 [${primaryEp.name}]，已自动提取最邻近知识库原稿。)*`;
      } else {
        fallbackText =
          `问题: „${userQuery}“\n\n` +
          `当前配置的端点 [${primaryEp.name}] 离线，且知识库中暂未收录相关笔记。请检查端点连通性或在 Lehrplan 中查阅。`;
      }
    }

    opts?.onChunk?.({ delta: fallbackText, accumulated: fallbackText });
    opts?.onStatusChange?.("done");

    return {
      reply: fallbackText,
      source: "vault-autofallback",
      badge: "Auto-Dispatch · 考纲离线兜底",
    };
  }
}
