// CC-Switch 风格多端点管理与配置核心 (Clean-Room 原生实现)
// 支持多端点独立配置、延迟探测、连通状态监控与活跃路由切换
// 零外部代码依赖，严格遵守项目规范与 MIT/Apache 署名契约

import { resolveAiRequestUrl } from "./providers";

export interface EndpointTestResult {
  ok: boolean;
  latencyMs: number;
  replyText?: string;
  modelDetected?: string;
  errorType?: "cors" | "refused" | "auth" | "model_unloaded" | "timeout" | "messages_error" | "unknown";
  errorMessage?: string;
  remedyTip?: string;
}

export interface AiEndpoint {
  id: string;
  name: string;
  providerId: string; // e.g. "lmstudio" | "ollama" | "deepseek" | "openrouter" | "siliconflow" | "custom"
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
    name: "SenseNova (商汤日日新)",
    providerId: "sensenova",
    baseUrl: "https://token.sensenova.cn/v1",
    apiKey: "",
    model: "SenseChat-5",
    enabled: true,
    isPreset: true,
    status: "untested",
    description: "国内商用大模型，支持支付宝支付",
    websiteUrl: "https://platform.sensenova.cn",
    upstreamFormat: "openai",
    recommendedModels: [
      "SenseChat-5",
      "SenseChat-5-Cantonese",
      "SenseChat-Turbo",
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
 * 单个端点测速与连通性探针 (Ping)
 */
export async function pingEndpoint(
  endpoint: AiEndpoint,
  timeoutMs = 5000
): Promise<{ status: "online" | "offline"; latencyMs: number; error?: string }> {
  const start = performance.now();
  const base = endpoint.baseUrl.trim().replace(/\/$/, "");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = {};
  if (endpoint.apiKey.trim()) {
    headers.Authorization = `Bearer ${endpoint.apiKey.trim()}`;
  }

  // 针对 SenseNova 等无 /models 接口或仅支持 POST 的端点，自动探测 /chat/completions
  const isPostOnly = endpoint.providerId === "sensenova" || base.includes("sensenova");
  const targetUrl = isPostOnly ? `${base}/chat/completions` : `${base}/models`;
  const fetchUrl = resolveAiRequestUrl(targetUrl);

  try {
    const res = await fetch(fetchUrl, {
      method: isPostOnly ? "POST" : "GET",
      headers: {
        ...headers,
        ...(isPostOnly ? { "Content-Type": "application/json" } : {}),
      },
      signal: controller.signal,
      body: isPostOnly
        ? JSON.stringify({
            model: endpoint.model.trim() || "default",
            messages: [{ role: "user", content: "ping" }],
            max_tokens: 1,
          })
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
 * 3. 返回真实模型回复与智能自愈排查指引 (Remedy Tip)，用户在 App 内部闭环解决
 */
export async function testEndpointChat(
  endpoint: AiEndpoint,
  prompt = "Hallo! Bitte bestätige kurz deine Bereitschaft.",
  timeoutMs = 8000
): Promise<EndpointTestResult> {
  const start = performance.now();
  const base = endpoint.baseUrl.trim().replace(/\/$/, "");
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (endpoint.apiKey.trim()) {
    headers.Authorization = `Bearer ${endpoint.apiKey.trim()}`;
  }

  // 严格确保 messages 字段非空且为规范数组，杜绝 'messages' field is required
  const messages = [{ role: "user", content: prompt }];
  const fetchUrl = resolveAiRequestUrl(`${base}/chat/completions`);

  try {
    const res = await fetch(fetchUrl, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        model: endpoint.model.trim() || "default",
        messages,
        temperature: 0.3,
        max_tokens: 120,
      }),
    });
    clearTimeout(timer);
    const latencyMs = Math.round(performance.now() - start);

    if (res.ok) {
      const data = await res.json().catch(() => null);
      const reply = data?.choices?.[0]?.message?.content?.trim() || "";
      const model = data?.model || endpoint.model;
      return {
        ok: true,
        latencyMs,
        replyText: reply || "✓ 连通成功 (模型返回了空响应体)",
        modelDetected: model,
      };
    }

    const errorBody = await res.text().catch(() => "");

    if (res.status === 401 || res.status === 403) {
      return {
        ok: false,
        latencyMs,
        errorType: "auth",
        errorMessage: `HTTP ${res.status} 未授权`,
        remedyTip: "请检查 API Key 是否正确填入，或密钥是否已欠费/过期。",
      };
    }

    if (errorBody.includes("messages' field is required") || errorBody.includes("messages field is required")) {
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
        remedyTip: `请核对 Base-URL（当前为 ${base}）。LM Studio 通常需后缀 /v1。`,
      };
    }

    return {
      ok: false,
      latencyMs,
      errorType: "model_unloaded",
      errorMessage: `HTTP ${res.status}: ${errorBody.slice(0, 100) || "服务端错误"}`,
      remedyTip: endpoint.providerId === "ollama"
        ? "请确认 LM Studio / Ollama 已加载对应模型，且处于运行状态。"
        : "服务端报错，请核对模型名是否支持或配置项是否有误。",
    };
  } catch (err) {
    clearTimeout(timer);
    const latencyMs = Math.round(performance.now() - start);

    if (err instanceof DOMException && err.name === "AbortError") {
      return {
        ok: false,
        latencyMs,
        errorType: "timeout",
        errorMessage: `连接超时 (> ${timeoutMs}ms)`,
        remedyTip: "服务器未能在规定时间内响应，请确认本地服务未挂起或网络是否通畅。",
      };
    }

    const isCors = err instanceof TypeError && (err.message.includes("Failed to fetch") || err.message.includes("NetworkError"));
    if (isCors) {
      return {
        ok: false,
        latencyMs,
        errorType: "cors",
        errorMessage: "网络连接失败 / CORS 跨域拦截",
        remedyTip: endpoint.baseUrl.includes("1234")
          ? "LM Studio 用户：请确认 Local Server 已启动（Port 1234），且已勾选「Enable CORS」！"
          : "无法连接到该端口或域名，请确认服务已启动且未被系统防火墙拦截。",
      };
    }

    return {
      ok: false,
      latencyMs,
      errorType: "unknown",
      errorMessage: err instanceof Error ? err.message : String(err),
      remedyTip: "请检查网络连接及服务端口状态。",
    };
  }
}

