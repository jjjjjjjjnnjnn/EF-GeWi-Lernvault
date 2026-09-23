// CC-Switch 风格多端点管理与配置核心 (Clean-Room 原生实现)
// 支持多端点独立配置、延迟探测、连通状态监控与活跃路由切换
// 零外部代码依赖，严格遵守项目规范与 MIT/Apache 署名契约

import { resolveAiRequestUrl } from "./providers";

export interface EndpointTestResult {
  ok: boolean;
  latencyMs: number;
  replyText?: string;
  modelDetected?: string;
  errorType?: "cors" | "refused" | "auth" | "model_unloaded" | "timeout" | "messages_error" | "rate_limit" | "unknown";
  errorMessage?: string;
  remedyTip?: string;
}

export type AuthFieldType = "Bearer" | "x-api-key" | "ANTHROPIC_AUTH_TOKEN" | "custom";

export interface AiEndpoint {
  id: string;
  name: string;
  providerId: string; // e.g. "lmstudio" | "ollama" | "deepseek" | "openrouter" | "siliconflow" | "sensenova" | "custom"
  baseUrl: string;
  apiKey: string;
  model: string;
  enabled: boolean;
  isPreset?: boolean;
  status?: "online" | "offline" | "untested" | "checking";
  latencyMs?: number | null;
  lastChecked?: number;
  description?: string;
  lastTestResult?: EndpointTestResult;
  upstreamFormat?: "openai" | "anthropic" | "custom";
  authHeaderType?: AuthFieldType;
  customAuthHeader?: string;
  customPort?: number | string;
  isFullUrl?: boolean;
  modelFast?: string;
  modelDeep?: string;
  websiteUrl?: string;
  recommendedModels?: string[];
}

export const PRESET_ENDPOINTS: AiEndpoint[] = [
  {
    id: "ep-lmstudio",
    name: "LM Studio (本地 1234)",
    providerId: "ollama",
    baseUrl: "http://localhost:1234/v1",
    apiKey: "",
    model: "llama-3-sauerkrautlm-8b-instruct",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "本地独立显卡/CPU 推理，免填 Key，100% 隐私",
    websiteUrl: "https://lmstudio.ai",
    upstreamFormat: "openai",
    recommendedModels: [
      "llama-3-sauerkrautlm-8b-instruct",
      "qwen2.5:7b",
      "mistral-7b-instruct",
      "gemma-2-9b-it",
    ],
  },
  {
    id: "ep-ollama",
    name: "Ollama (本地 11434)",
    providerId: "ollama",
    baseUrl: "http://localhost:11434/v1",
    apiKey: "",
    model: "qwen2.5:7b",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "本地轻量级 Ollama 守护进程，免填 Key",
    websiteUrl: "https://ollama.com",
    upstreamFormat: "openai",
    recommendedModels: ["qwen2.5:7b", "llama3:8b", "mistral:latest"],
  },
  {
    id: "ep-deepseek",
    name: "DeepSeek (官方 API)",
    providerId: "deepseek",
    baseUrl: "https://api.deepseek.com/v1",
    apiKey: "",
    model: "deepseek-chat",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "高性价比、超强中文与逻辑理解，需填 Key",
    websiteUrl: "https://platform.deepseek.com",
    upstreamFormat: "openai",
    recommendedModels: ["deepseek-chat", "deepseek-reasoner"],
  },
  {
    id: "ep-openrouter",
    name: "OpenRouter (免费池 & 聚合)",
    providerId: "openrouter",
    baseUrl: "https://openrouter.ai/api/v1",
    apiKey: "",
    model: "openai/gpt-oss-20b:free",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "汇聚数十款免费与商业大模型",
    websiteUrl: "https://openrouter.ai",
    upstreamFormat: "openai",
    recommendedModels: [
      "openai/gpt-oss-20b:free",
      "meta-llama/llama-3.1-8b-instruct:free",
      "google/gemini-2.0-flash-exp:free",
    ],
  },
  {
    id: "ep-siliconflow",
    name: "SiliconFlow (硅基流动)",
    providerId: "siliconflow",
    baseUrl: "https://api.siliconflow.cn/v1",
    apiKey: "",
    model: "Qwen/Qwen3-8B",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "Qwen3-8B 永久免费极速体验",
    websiteUrl: "https://cloud.siliconflow.cn",
    upstreamFormat: "openai",
    recommendedModels: [
      "Qwen/Qwen3-8B",
      "deepseek-ai/DeepSeek-V3",
      "deepseek-ai/DeepSeek-R1",
    ],
  },
  {
    id: "ep-sensenova",
    name: "SenseNova (商汤)",
    providerId: "sensenova",
    baseUrl: "https://token.sensenova.cn",
    apiKey: "",
    model: "sensenova-6.8-flash-lite",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "国内大模型，兼容 Claude Messages 原生协议",
    websiteUrl: "https://platform.sensenova.cn",
    upstreamFormat: "anthropic",
    authHeaderType: "ANTHROPIC_AUTH_TOKEN",
    recommendedModels: [
      "sensenova-6.8-flash-lite",
      "SenseChat-5",
      "deepseek-v4-flash",
      "SenseChat-5-Cantonese",
    ],
  },
];

const ENDPOINTS_STORAGE_KEY = "eflernvault:endpoints:v1";
const ACTIVE_ENDPOINT_KEY = "eflernvault:active_endpoint:v1";
const FALLBACK_ENDPOINT_KEY = "eflernvault:fallback_endpoint:v1";

/**
 * 加载所有配置端点（包含内置预设与用户自定义端点，并自动迁移旧配置）
 */
export function loadEndpoints(): AiEndpoint[] {
  try {
    const raw = localStorage.getItem(ENDPOINTS_STORAGE_KEY);
    if (!raw) {
      // 首次加载初始化预设
      saveEndpoints(PRESET_ENDPOINTS);
      return PRESET_ENDPOINTS;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      saveEndpoints(PRESET_ENDPOINTS);
      return PRESET_ENDPOINTS;
    }

    // 确保内置预设存在（如新增预设则合并，并丰富元数据）
    const merged: AiEndpoint[] = parsed.map((e: AiEndpoint) => {
      const preset = PRESET_ENDPOINTS.find((p) => p.id === e.id);
      if (preset) {
        return {
          ...preset,
          ...e,
          websiteUrl: e.websiteUrl || preset.websiteUrl,
          recommendedModels: e.recommendedModels || preset.recommendedModels,
          upstreamFormat: e.upstreamFormat || preset.upstreamFormat,
        };
      }
      return e;
    });
    for (const preset of PRESET_ENDPOINTS) {
      if (!merged.some((e) => e.id === preset.id)) {
        merged.push(preset);
      }
    }
    return merged;
  } catch {
    return PRESET_ENDPOINTS;
  }
}

/**
 * 保存端点列表至 localStorage
 */
export function saveEndpoints(endpoints: AiEndpoint[]): void {
  try {
    localStorage.setItem(ENDPOINTS_STORAGE_KEY, JSON.stringify(endpoints));
  } catch {
    // 忽略异常
  }
}

/**
 * 获取当前活跃的主端点 ID
 */
export function getActiveEndpointId(): string {
  try {
    const active = localStorage.getItem(ACTIVE_ENDPOINT_KEY);
    if (active) return active;
  } catch {
    // 忽略异常
  }
  return "ep-lmstudio";
}

/**
 * 设置活跃主端点
 */
export function setActiveEndpointId(id: string): void {
  try {
    localStorage.setItem(ACTIVE_ENDPOINT_KEY, id);
  } catch {
    // 忽略异常
  }
}

/**
 * 获取备用端点 ID（故障自动转移时使用）
 */
export function getFallbackEndpointId(): string | null {
  try {
    return localStorage.getItem(FALLBACK_ENDPOINT_KEY);
  } catch {
    return null;
  }
}

/**
 * 设置备用端点 ID
 */
export function setFallbackEndpointId(id: string | null): void {
  try {
    if (!id) {
      localStorage.removeItem(FALLBACK_ENDPOINT_KEY);
    } else {
      localStorage.setItem(FALLBACK_ENDPOINT_KEY, id);
    }
  } catch {
    // 忽略异常
  }
}

/**
 * 获取当前活跃端点对象（若未找到则安全降级回第一个可用预设）
 */
export function getActiveEndpoint(): AiEndpoint {
  const all = loadEndpoints();
  const activeId = getActiveEndpointId();
  const found = all.find((e) => e.id === activeId);
  if (found) return found;
  return all[0] || PRESET_ENDPOINTS[0];
}

/**
 * 添加新的自定义端点
 */
export function addEndpoint(endpoint: Omit<AiEndpoint, "id"> & { id?: string }): AiEndpoint {
  const all = loadEndpoints();
  const id = endpoint.id || `ep-custom-${Date.now()}`;
  const newEp: AiEndpoint = {
    ...endpoint,
    id,
    enabled: true,
    isPreset: false,
    status: "untested",
  };
  const updated = [...all, newEp];
  saveEndpoints(updated);
  return newEp;
}

/**
 * 更新指定端点配置
 */
export function updateEndpoint(id: string, patch: Partial<AiEndpoint>): AiEndpoint | null {
  const all = loadEndpoints();
  let updatedEp: AiEndpoint | null = null;
  const next = all.map((ep) => {
    if (ep.id === id) {
      updatedEp = { ...ep, ...patch };
      return updatedEp;
    }
    return ep;
  });
  if (updatedEp) {
    saveEndpoints(next);
  }
  return updatedEp;
}

/**
 * 删除自定义端点（内置预设不可删除，仅可禁用）
 */
export function deleteEndpoint(id: string): boolean {
  const all = loadEndpoints();
  const target = all.find((e) => e.id === id);
  if (!target || target.isPreset) return false;

  const next = all.filter((e) => e.id !== id);
  saveEndpoints(next);

  // 若删除的是活跃端点，回退至默认端点
  if (getActiveEndpointId() === id) {
    setActiveEndpointId(next[0]?.id || "ep-lmstudio");
  }
  if (getFallbackEndpointId() === id) {
    setFallbackEndpointId(null);
  }
  return true;
}

/**
 * 构造统一请求头，严格支持认证字段类型（Bearer / x-api-key / ANTHROPIC_AUTH_TOKEN / 自定义Header）
 */
export function buildEndpointHeaders(endpoint: AiEndpoint): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const key = endpoint.apiKey.trim();
  if (!key) return headers;

  const authType =
    endpoint.authHeaderType ||
    (endpoint.upstreamFormat === "anthropic" ? "ANTHROPIC_AUTH_TOKEN" : "Bearer");

  if (authType === "ANTHROPIC_AUTH_TOKEN") {
    headers["x-api-key"] = key;
    headers["anthropic-version"] = "2023-06-01";
    headers["Authorization"] = `Bearer ${key}`;
  } else if (authType === "x-api-key") {
    headers["x-api-key"] = key;
    headers["anthropic-version"] = "2023-06-01";
  } else if (authType === "custom" && endpoint.customAuthHeader?.trim()) {
    headers[endpoint.customAuthHeader.trim()] = key;
    headers["Authorization"] = `Bearer ${key}`;
  } else {
    // "Bearer" default
    headers["Authorization"] = `Bearer ${key}`;
    if (endpoint.upstreamFormat === "anthropic") {
      headers["x-api-key"] = key;
      headers["anthropic-version"] = "2023-06-01";
    }
  }
  return headers;
}

/**
 * 构造请求端点 URL，支持完整 URL 开关、自定义端口绑定与上游协议格式自动适配
 */
export function buildEndpointUrl(endpoint: AiEndpoint, pathType: "chat" | "models"): string {
  let base = endpoint.baseUrl.trim();
  if (endpoint.customPort && !base.includes(`:${endpoint.customPort}`)) {
    try {
      const u = new URL(base);
      u.port = String(endpoint.customPort);
      base = u.toString().replace(/\/$/, "");
    } catch {
      // 非标准 URL 结构保持原样
    }
  }
  base = base.replace(/\/+$/, "");

  // 1. 若开启了“完整 URL”开关，直接使用用户指定的地址
  if (endpoint.isFullUrl) {
    return base;
  }

  // 2. 模型拉取路径
  if (pathType === "models") {
    return base.endsWith("/v1") ? `${base}/models` : `${base}/v1/models`;
  }

  // 3. 对话聊天路径
  if (endpoint.upstreamFormat === "anthropic") {
    // Anthropic Messages 协议
    return base.endsWith("/v1") ? `${base}/messages` : `${base}/v1/messages`;
  }

  // OpenAI Chat Completions 协议
  return base.endsWith("/v1") ? `${base}/chat/completions` : `${base}/v1/chat/completions`;
}

/**
 * 单个端点测速与连通性探针 (Ping)
 */
export async function pingEndpoint(
  endpoint: AiEndpoint,
  timeoutMs = 5000
): Promise<{ status: "online" | "offline"; latencyMs: number; error?: string }> {
  const start = performance.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers = buildEndpointHeaders(endpoint);
  const isAnthropic = endpoint.upstreamFormat === "anthropic";
  const isPostOnly = isAnthropic || endpoint.providerId === "sensenova" || endpoint.baseUrl.includes("sensenova");
  const targetUrl = isPostOnly
    ? buildEndpointUrl(endpoint, "chat")
    : buildEndpointUrl(endpoint, "models");
  const fetchUrl = resolveAiRequestUrl(targetUrl);

  try {
    const res = await fetch(fetchUrl, {
      method: isPostOnly ? "POST" : "GET",
      headers,
      signal: controller.signal,
      body: isPostOnly
        ? JSON.stringify(
            isAnthropic
              ? {
                  model: endpoint.model.trim() || "sensenova-6.8-flash-lite",
                  messages: [{ role: "user", content: "ping" }],
                  max_tokens: 1,
                }
              : {
                  model: endpoint.model.trim() || "default",
                  messages: [{ role: "user", content: "ping" }],
                  max_tokens: 1,
                }
          )
        : undefined,
    });
    clearTimeout(timer);
    const latency = Math.round(performance.now() - start);

    if (res.ok || res.status === 401 || res.status === 403 || res.status === 400) {
      // 401/403/400 说明服务器在线且响应，仅凭据需校验或模型正常通信
      return { status: "online", latencyMs: latency };
    }
    return { status: "offline", latencyMs: latency, error: `HTTP ${res.status}` };
  } catch (err) {
    clearTimeout(timer);
    const latency = Math.round(performance.now() - start);
    const msg = err instanceof DOMException && err.name === "AbortError" ? "Timeout" : "Connection Failed";
    return { status: "offline", latencyMs: latency, error: msg };
  }
}

/**
 * 针对指定端点进行深度应用内连通与对话测试 (Chat Probe)
 * 1. 严格确保请求体包含合法的 messages 数组，防止 LM Studio 等报 400 'messages' field is required
 * 2. 检查 CORS、端口拒连 (Connection Refused)、401 未授权、模型未加载等典型场景
 * 3. 自动适配 OpenAI 与 Anthropic Messages 原生请求与回复格式
 * 4. 返回真实模型回复与智能自愈排查指引 (Remedy Tip)，用户在 App 内部闭环解决
 */
export async function testEndpointChat(
  endpoint: AiEndpoint,
  prompt = "Hallo! Bitte bestätige kurz deine Bereitschaft.",
  timeoutMs = 8000,
  maxRetries = 3
): Promise<EndpointTestResult> {
  const headers = buildEndpointHeaders(endpoint);
  const targetUrl = buildEndpointUrl(endpoint, "chat");
  const fetchUrl = resolveAiRequestUrl(targetUrl);
  const isAnthropic = endpoint.upstreamFormat === "anthropic";

  const requestBody = isAnthropic
    ? {
        model: endpoint.model.trim() || "sensenova-6.8-flash-lite",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 120,
      }
    : {
        model: endpoint.model.trim() || "default",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 120,
      };

  let attempt = 0;
  let lastStatus = 0;
  let lastErrorBody = "";
  let lastLatencyMs = 0;

  while (attempt <= maxRetries) {
    attempt++;
    const start = performance.now();
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const res = await fetch(fetchUrl, {
        method: "POST",
        headers,
        signal: controller.signal,
        body: JSON.stringify(requestBody),
      });
      clearTimeout(timer);
      const latencyMs = Math.round(performance.now() - start);
      lastLatencyMs = latencyMs;

      if (res.ok) {
        const data = await res.json().catch(() => null);
        const reply =
          data?.content?.[0]?.text?.trim() ||
          data?.choices?.[0]?.message?.content?.trim() ||
          "";
        const model = data?.model || endpoint.model;
        const retryNote = attempt > 1 ? `(触发限速经 ${attempt - 1} 次重试后成功) ` : "";
        return {
          ok: true,
          latencyMs,
          replyText: (retryNote + (reply || "✓ 连通成功 (模型返回了空响应体)")).trim(),
          modelDetected: model,
        };
      }

      lastStatus = res.status;
      lastErrorBody = await res.text().catch(() => "");

      // 针对 HTTP 429 限速错误进行自动退避重试，直至达到测试上限
      if (res.status === 429) {
        if (attempt <= maxRetries) {
          const backoffMs = attempt * 1500;
          await new Promise((r) => setTimeout(r, backoffMs));
          continue;
        }
        return {
          ok: false,
          latencyMs,
          errorType: "rate_limit",
          errorMessage: `HTTP 429: 服务商接口限速 (已自动重试 ${maxRetries} 次达到上限)`,
          remedyTip: `服务商并发或速率达到上限。系统已完成 ${maxRetries} 次退避重试并达到测试上限。请稍候片刻再试，或切换至备用模型。`,
        };
      }

      if (res.status === 401 || res.status === 403) {
        return {
          ok: false,
          latencyMs,
          errorType: "auth",
          errorMessage: `HTTP ${res.status} 未授权`,
          remedyTip: "请检查 API Key 是否正确填入，或核对认证字段（ANTHROPIC_AUTH_TOKEN / Bearer / x-api-key）。",
        };
      }

      if (lastErrorBody.includes("messages' field is required") || lastErrorBody.includes("messages field is required")) {
        return {
          ok: false,
          latencyMs,
          errorType: "messages_error",
          errorMessage: "请求体缺少有效 messages 字段",
          remedyTip: "已在客户端规整，请重试。",
        };
      }

      if (res.status === 404) {
        return {
          ok: false,
          latencyMs,
          errorType: "unknown",
          errorMessage: "HTTP 404 接口未找到",
          remedyTip: `请核对请求地址（当前为 ${targetUrl}）。若是 Claude/商汤原生协议请选 Anthropic 格式。`,
        };
      }

      return {
        ok: false,
        latencyMs,
        errorType: "model_unloaded",
        errorMessage: `HTTP ${res.status}: ${lastErrorBody.slice(0, 100) || "服务端错误"}`,
        remedyTip: endpoint.providerId === "ollama"
          ? "请确认 LM Studio / Ollama 已加载对应模型，且处于运行状态。"
          : "服务端报错，请核对模型名是否支持或配置项是否有误。",
      };
    } catch (err) {
      clearTimeout(timer);
      const latencyMs = Math.round(performance.now() - start);
      lastLatencyMs = latencyMs;
      const isCors = err instanceof TypeError && err.message.includes("Failed to fetch");

      if (isCors) {
        return {
          ok: false,
          latencyMs,
          errorType: "cors",
          errorMessage: "CORS 跨域错误或连接被拒绝 (Failed to fetch)",
          remedyTip: endpoint.baseUrl.includes("1234")
            ? "LM Studio 用户：请确认 Local Server 已启动（端口 1234），且已勾选「Enable CORS」！"
            : "无法连接到该服务。请核对地址与端口是否正确。",
        };
      }

      const isTimeout = err instanceof DOMException && err.name === "AbortError";
      if (isTimeout) {
        if (attempt <= maxRetries) {
          continue;
        }
        return {
          ok: false,
          latencyMs,
          errorType: "timeout",
          errorMessage: `请求超时 (${timeoutMs}ms)`,
          remedyTip: "服务端响应缓慢，请核对本地显卡/CPU负载或网络状态。",
        };
      }

      return {
        ok: false,
        latencyMs,
        errorType: "unknown",
        errorMessage: err instanceof Error ? err.message : "未知错误",
        remedyTip: "网络连接失败，请确认端点服务是否已正常启动。",
      };
    }
  }

  return {
    ok: false,
    latencyMs: lastLatencyMs,
    errorMessage: `HTTP ${lastStatus}: 达到测试重试上限`,
    remedyTip: "多次重试后仍然无法连通，请检查端点配置或网络连接。",
  };
}


